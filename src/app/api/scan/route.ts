/* ═══════════════════════════════════════════════════════════
   POST /api/scan
   Records a card scan and rewards $MOHN
   GET  /api/scan — returns scan history for the user
   ═══════════════════════════════════════════════════════════ */

import { NextRequest } from 'next/server';
import { collections } from '@/lib/firebase-admin';
import { authenticateRequest, successResponse, errorResponse } from '@/lib/auth-middleware';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

/* ─── Scan reward tiers based on estimated card value ─── */
function calculateMohnReward(estimatedValue: number): number {
  if (estimatedValue >= 500) return 100;
  if (estimatedValue >= 100) return 75;
  if (estimatedValue >= 50) return 50;
  if (estimatedValue >= 10) return 25;
  return 10;
}

export async function POST(request: NextRequest) {
  const authResult = await authenticateRequest(request);
  if ('error' in authResult) return authResult.error;

  const { uid } = authResult.user;

  try {
    const body = await request.json();
    const { name, set, game, estimatedValue, condition, imageUrl } = body;

    if (!name || !game) {
      return errorResponse('Missing required fields: name, game');
    }

    const mohnReward = calculateMohnReward(estimatedValue || 0);

    const cardData = {
      ownerId: uid,
      name,
      set: set || 'Unknown',
      game, // pokemon, yugioh, mtg, sports
      estimatedValue: estimatedValue || 0,
      condition: condition || 'Unknown',
      imageUrl: imageUrl || null,
      vaulted: false,
      mohnEarned: mohnReward,
      createdAt: FieldValue.serverTimestamp(),
    };

    const cardRef = await collections.cards.add(cardData);

    // Update user stats
    await collections.users.doc(uid).update({
      totalScans: FieldValue.increment(1),
      mohnBalance: FieldValue.increment(mohnReward),
      xp: FieldValue.increment(10),
      updatedAt: FieldValue.serverTimestamp(),
    });

    // Record transaction
    await collections.transactions.add({
      userId: uid,
      type: 'earn',
      amount: mohnReward,
      description: `Scanned: ${name} (${game})`,
      metadata: { cardId: cardRef.id, game },
      createdAt: FieldValue.serverTimestamp(),
    });

    return successResponse({
      cardId: cardRef.id,
      mohnEarned: mohnReward,
      message: `Scanned ${name}! Earned ${mohnReward} $MOHN`,
    });
  } catch (error: any) {
    console.error('Scan error:', error);
    return errorResponse(error.message || 'Scan failed', 500);
  }
}

export async function GET(request: NextRequest) {
  const authResult = await authenticateRequest(request);
  if ('error' in authResult) return authResult.error;

  const { uid } = authResult.user;

  try {
    const snapshot = await collections.cards
      .where('ownerId', '==', uid)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    const cards = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return successResponse({ cards, count: cards.length });
  } catch (error: any) {
    console.error('Fetch scans error:', error);
    return errorResponse(error.message || 'Failed to fetch scans', 500);
  }
}
