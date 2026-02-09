/* ═══════════════════════════════════════════════════════════
   POST /api/battle/start    — Starts a new battle
   POST /api/battle/resolve  — Resolves a battle outcome
   GET  /api/battle          — Gets battle history
   ═══════════════════════════════════════════════════════════ */

import { NextRequest } from 'next/server';
import { collections } from '@/lib/firebase-admin';
import { authenticateRequest, successResponse, errorResponse } from '@/lib/auth-middleware';
import { resolveBattle } from '@/lib/game-engine';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const authResult = await authenticateRequest(request);
  if ('error' in authResult) return authResult.error;

  const { uid } = authResult.user;
  const url = new URL(request.url);
  const action = url.searchParams.get('action') || 'start';

  try {
    const body = await request.json();

    if (action === 'start') {
      return await startBattle(uid, body);
    } else if (action === 'resolve') {
      return await resolveBattleAction(uid, body);
    }

    return errorResponse('Invalid action. Use ?action=start or ?action=resolve');
  } catch (error: any) {
    console.error('Battle error:', error);
    return errorResponse(error.message || 'Battle failed', 500);
  }
}

export async function GET(request: NextRequest) {
  const authResult = await authenticateRequest(request);
  if ('error' in authResult) return authResult.error;

  const { uid } = authResult.user;

  try {
    const snapshot = await collections.battles
      .where('playerId', '==', uid)
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();

    const battles = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return successResponse({ battles, count: battles.length });
  } catch (error: any) {
    console.error('Fetch battles error:', error);
    return errorResponse(error.message || 'Failed to fetch battles', 500);
  }
}

/* ─── Start a Battle ─── */
async function startBattle(
  uid: string,
  body: { teamIds: string[]; mode: string }
) {
  const { teamIds, mode } = body;

  if (!teamIds || teamIds.length < 1 || teamIds.length > 3) {
    return errorResponse('Select 1-3 MohnSters for your team');
  }

  // Fetch player's creatures
  const playerTeam = [];
  for (const id of teamIds) {
    const doc = await collections.mohnsters.doc(id).get();
    if (!doc.exists) {
      return errorResponse(`MohnSter ${id} not found`);
    }
    const data = doc.data()!;
    if (data.ownerId !== uid) {
      return errorResponse(`MohnSter ${id} does not belong to you`);
    }
    playerTeam.push(data);
  }

  // Generate opponent team (AI for now)
  const opponentTeam = generateAITeam(playerTeam);

  // Create battle record
  const battleRef = collections.battles.doc();
  await battleRef.set({
    id: battleRef.id,
    playerId: uid,
    mode: mode || 'quick',
    playerTeam: playerTeam.map((c: any) => ({
      id: c.id,
      name: c.name,
      element: c.element,
      rarity: c.rarity,
      hp: c.hp,
      atk: c.atk,
      def: c.def,
      spd: c.spd,
    })),
    opponentTeam: opponentTeam.map((c) => ({
      name: c.name,
      element: c.element,
      hp: c.hp,
      atk: c.atk,
      def: c.def,
      spd: c.spd,
    })),
    status: 'pending',
    createdAt: FieldValue.serverTimestamp(),
  });

  return successResponse({
    battleId: battleRef.id,
    playerTeam: playerTeam.map((c: any) => ({ name: c.name, element: c.element, hp: c.hp, atk: c.atk, def: c.def, spd: c.spd })),
    opponentTeam,
    message: 'Battle started! Resolve with ?action=resolve',
  });
}

/* ─── Resolve a Battle ─── */
async function resolveBattleAction(uid: string, body: { battleId: string }) {
  const { battleId } = body;

  if (!battleId) {
    return errorResponse('Missing battleId');
  }

  const battleDoc = await collections.battles.doc(battleId).get();
  if (!battleDoc.exists) {
    return errorResponse('Battle not found', 404);
  }

  const battleData = battleDoc.data()!;
  if (battleData.playerId !== uid) {
    return errorResponse('Not your battle', 403);
  }
  if (battleData.status !== 'pending') {
    return errorResponse('Battle already resolved');
  }

  // Resolve the battle
  const result = resolveBattle(battleData.playerTeam, battleData.opponentTeam);

  const batch = collections.users.firestore.batch();

  // Update battle record
  batch.update(collections.battles.doc(battleId), {
    status: 'completed',
    winner: result.winner,
    log: result.log,
    mohnReward: result.mohnReward,
    xpReward: result.xpReward,
    resolvedAt: FieldValue.serverTimestamp(),
  });

  // Update user stats
  batch.update(collections.users.doc(uid), {
    totalBattles: FieldValue.increment(1),
    totalWins: FieldValue.increment(result.winner === 'player' ? 1 : 0),
    mohnBalance: FieldValue.increment(result.mohnReward),
    xp: FieldValue.increment(result.xpReward),
    updatedAt: FieldValue.serverTimestamp(),
  });

  // Give XP to participating MohnSters
  for (const mohnster of battleData.playerTeam) {
    if (mohnster.id) {
      batch.update(collections.mohnsters.doc(mohnster.id), {
        xp: FieldValue.increment(result.xpReward),
      });
    }
  }

  // Record transaction if earned $MOHN
  if (result.mohnReward > 0) {
    const txRef = collections.transactions.doc();
    batch.set(txRef, {
      userId: uid,
      type: 'earn',
      amount: result.mohnReward,
      description: `Battle ${result.winner === 'player' ? 'victory' : 'participation'}`,
      metadata: { battleId },
      createdAt: FieldValue.serverTimestamp(),
    });
  }

  await batch.commit();

  return successResponse({
    winner: result.winner,
    log: result.log,
    mohnReward: result.mohnReward,
    xpReward: result.xpReward,
    message: result.winner === 'player' ? 'Victory!' : 'Defeat!',
  });
}

/* ─── AI Team Generator ─── */
function generateAITeam(playerTeam: any[]) {
  const elements = ['fire', 'water', 'earth', 'lightning', 'shadow', 'crystal'] as const;
  const names: Record<string, string[]> = {
    fire: ['Wild Blazeclaw', 'Feral Pyroscale'],
    water: ['Wild Tidalcrest', 'Feral Mistfin'],
    earth: ['Wild Bouldercrush', 'Feral Rootweaver'],
    lightning: ['Wild Sparkfin', 'Feral Thunderclaw'],
    shadow: ['Wild Nightshade', 'Feral Voidwalker'],
    crystal: ['Wild Prismatic', 'Feral Gemheart'],
  };

  // Match opponent power level to player (~90-110%)
  return playerTeam.map((p: any) => {
    const el = elements[Math.floor(Math.random() * elements.length)];
    const variance = 0.9 + Math.random() * 0.2;

    return {
      name: names[el][Math.floor(Math.random() * names[el].length)],
      element: el,
      hp: Math.round((p.hp || 50) * variance),
      atk: Math.round((p.atk || 50) * variance),
      def: Math.round((p.def || 50) * variance),
      spd: Math.round((p.spd || 50) * variance),
    };
  });
}
