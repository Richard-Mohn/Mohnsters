/* ═══════════════════════════════════════════════════════════
   POST /api/packs/open
   Opens a MohnSter pack using $MOHN balance
   ═══════════════════════════════════════════════════════════ */

import { NextRequest } from 'next/server';
import { collections } from '@/lib/firebase-admin';
import { authenticateRequest, successResponse, errorResponse } from '@/lib/auth-middleware';
import { generatePack } from '@/lib/game-engine';
import { PACK_PRODUCTS } from '@/lib/stripe';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const authResult = await authenticateRequest(request);
  if ('error' in authResult) return authResult.error;

  const { uid } = authResult.user;

  try {
    const body = await request.json();
    const { tier } = body;

    if (!tier) {
      return errorResponse('Missing tier');
    }

    const pack = PACK_PRODUCTS[tier as keyof typeof PACK_PRODUCTS];
    if (!pack) {
      return errorResponse('Invalid pack tier');
    }

    // Check user balance
    const userDoc = await collections.users.doc(uid).get();
    if (!userDoc.exists) {
      return errorResponse('User not found', 404);
    }

    const userData = userDoc.data()!;
    if (userData.mohnBalance < pack.mohnPrice) {
      return errorResponse(
        `Insufficient $MOHN. Need ${pack.mohnPrice}, have ${userData.mohnBalance}`,
        402
      );
    }

    // Generate creatures
    const creatures = generatePack(tier, pack.cards);

    // Batch write: debit balance, save creatures, record pack
    const batch = collections.users.firestore.batch();

    // Debit $MOHN
    batch.update(collections.users.doc(uid), {
      mohnBalance: FieldValue.increment(-pack.mohnPrice),
      packsPurchased: FieldValue.increment(1),
      xp: FieldValue.increment(25),
      updatedAt: FieldValue.serverTimestamp(),
    });

    // Save each creature
    const savedCreatures = [];
    for (const creature of creatures) {
      const ref = collections.mohnsters.doc();
      batch.set(ref, {
        ...creature,
        id: ref.id,
        ownerId: uid,
        xp: 0,
        vaultBoosted: false,
        createdAt: FieldValue.serverTimestamp(),
      });
      savedCreatures.push({ id: ref.id, ...creature });
    }

    // Record pack opening
    const packRef = collections.packs.doc();
    batch.set(packRef, {
      id: packRef.id,
      userId: uid,
      tier,
      method: 'mohn',
      creatures: creatures.map((c) => ({ name: c.name, rarity: c.rarity, element: c.element })),
      openedAt: FieldValue.serverTimestamp(),
    });

    // Record transaction
    const txRef = collections.transactions.doc();
    batch.set(txRef, {
      userId: uid,
      type: 'spend',
      amount: pack.mohnPrice,
      description: `Opened ${pack.name}`,
      metadata: { tier, creatures: creatures.length },
      createdAt: FieldValue.serverTimestamp(),
    });

    await batch.commit();

    return successResponse({
      creatures: savedCreatures,
      mohnSpent: pack.mohnPrice,
      newBalance: userData.mohnBalance - pack.mohnPrice,
      message: `Opened ${pack.name}! Got ${creatures.length} MohnSters!`,
    });
  } catch (error: any) {
    console.error('Pack open error:', error);
    return errorResponse(error.message || 'Failed to open pack', 500);
  }
}
