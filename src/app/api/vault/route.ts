/* ═══════════════════════════════════════════════════════════
   POST /api/vault/deposit   — Submit a card for vault storage
   POST /api/vault/withdraw  — Request card withdrawal (10% fee)
   GET  /api/vault           — List vaulted cards
   ═══════════════════════════════════════════════════════════ */

import { NextRequest } from 'next/server';
import { collections } from '@/lib/firebase-admin';
import { authenticateRequest, successResponse, errorResponse } from '@/lib/auth-middleware';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

/* ─── Yield rate tiers ─── */
function getYieldRate(marketValue: number): number {
  if (marketValue >= 1000) return 0.02; // 2% monthly
  if (marketValue >= 500) return 0.015; // 1.5% monthly
  if (marketValue >= 50) return 0.01; // 1% monthly
  return 0.005; // 0.5% monthly
}

export async function POST(request: NextRequest) {
  const authResult = await authenticateRequest(request);
  if ('error' in authResult) return authResult.error;

  const { uid } = authResult.user;
  const url = new URL(request.url);
  const action = url.searchParams.get('action') || 'deposit';

  try {
    const body = await request.json();

    if (action === 'deposit') {
      return await depositCard(uid, body);
    } else if (action === 'withdraw') {
      return await withdrawCard(uid, body);
    }

    return errorResponse('Invalid action. Use ?action=deposit or ?action=withdraw');
  } catch (error: any) {
    console.error('Vault error:', error);
    return errorResponse(error.message || 'Vault operation failed', 500);
  }
}

export async function GET(request: NextRequest) {
  const authResult = await authenticateRequest(request);
  if ('error' in authResult) return authResult.error;

  const { uid } = authResult.user;

  try {
    const snapshot = await collections.vaultCards
      .where('ownerId', '==', uid)
      .orderBy('vaultedAt', 'desc')
      .get();

    const vaultCards = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const totalValue = vaultCards.reduce((sum: number, card: any) => sum + (card.marketValue || 0), 0);
    const monthlyYield = vaultCards.reduce(
      (sum: number, card: any) => sum + (card.marketValue || 0) * (card.yieldRate || 0),
      0
    );

    return successResponse({
      vaultCards,
      count: vaultCards.length,
      totalValue: Math.round(totalValue * 100) / 100,
      monthlyYield: Math.round(monthlyYield * 100) / 100,
    });
  } catch (error: any) {
    console.error('Fetch vault error:', error);
    return errorResponse(error.message || 'Failed to fetch vault', 500);
  }
}

/* ─── Deposit Card to Vault ─── */
async function depositCard(
  uid: string,
  body: { cardId: string; linkedMohnsterId?: string }
) {
  const { cardId, linkedMohnsterId } = body;

  if (!cardId) {
    return errorResponse('Missing cardId');
  }

  // Verify card ownership
  const cardDoc = await collections.cards.doc(cardId).get();
  if (!cardDoc.exists) {
    return errorResponse('Card not found', 404);
  }

  const cardData = cardDoc.data()!;
  if (cardData.ownerId !== uid) {
    return errorResponse('Not your card', 403);
  }
  if (cardData.vaulted) {
    return errorResponse('Card is already vaulted');
  }

  const yieldRate = getYieldRate(cardData.estimatedValue || 0);

  const batch = collections.users.firestore.batch();

  // Create vault record
  const vaultRef = collections.vaultCards.doc();
  batch.set(vaultRef, {
    id: vaultRef.id,
    ownerId: uid,
    cardId,
    cardName: cardData.name,
    marketValue: cardData.estimatedValue || 0,
    yieldRate,
    totalYieldEarned: 0,
    linkedMohnsterId: linkedMohnsterId || null,
    status: 'pending_shipment',
    vaultedAt: FieldValue.serverTimestamp(),
  });

  // Mark card as vaulted
  batch.update(collections.cards.doc(cardId), {
    vaulted: true,
    vaultedAt: FieldValue.serverTimestamp(),
  });

  // Update user stats
  batch.update(collections.users.doc(uid), {
    vaultedCardsCount: FieldValue.increment(1),
    updatedAt: FieldValue.serverTimestamp(),
  });

  // If linking to a MohnSter, boost it
  if (linkedMohnsterId) {
    batch.update(collections.mohnsters.doc(linkedMohnsterId), {
      vaultBoosted: true,
      linkedCardId: cardId,
    });
  }

  await batch.commit();

  return successResponse({
    vaultId: vaultRef.id,
    yieldRate,
    monthlyYield: Math.round((cardData.estimatedValue || 0) * yieldRate * 100) / 100,
    status: 'pending_shipment',
    message: `Card "${cardData.name}" submitted to vault! Ship to our grading facility.`,
  });
}

/* ─── Withdraw Card from Vault ─── */
async function withdrawCard(uid: string, body: { vaultId: string }) {
  const { vaultId } = body;

  if (!vaultId) {
    return errorResponse('Missing vaultId');
  }

  const vaultDoc = await collections.vaultCards.doc(vaultId).get();
  if (!vaultDoc.exists) {
    return errorResponse('Vault card not found', 404);
  }

  const vaultData = vaultDoc.data()!;
  if (vaultData.ownerId !== uid) {
    return errorResponse('Not your vaulted card', 403);
  }
  if (vaultData.status === 'withdrawal_requested' || vaultData.status === 'returned') {
    return errorResponse('Withdrawal already requested');
  }

  // 10% withdrawal fee in $MOHN equivalent
  const withdrawalFee = Math.round(vaultData.marketValue * 0.1);

  // Check if user has enough $MOHN for the fee
  const userDoc = await collections.users.doc(uid).get();
  const userData = userDoc.data()!;

  if (userData.mohnBalance < withdrawalFee) {
    return errorResponse(
      `Insufficient $MOHN for withdrawal fee. Need ${withdrawalFee}, have ${userData.mohnBalance}`
    );
  }

  const batch = collections.users.firestore.batch();

  // Update vault status
  batch.update(collections.vaultCards.doc(vaultId), {
    status: 'withdrawal_requested',
  });

  // Debit withdrawal fee
  batch.update(collections.users.doc(uid), {
    mohnBalance: FieldValue.increment(-withdrawalFee),
    vaultedCardsCount: FieldValue.increment(-1),
    updatedAt: FieldValue.serverTimestamp(),
  });

  // Un-vault the card
  if (vaultData.cardId) {
    batch.update(collections.cards.doc(vaultData.cardId), {
      vaulted: false,
    });
  }

  // Remove MohnSter vault boost
  if (vaultData.linkedMohnsterId) {
    batch.update(collections.mohnsters.doc(vaultData.linkedMohnsterId), {
      vaultBoosted: false,
      linkedCardId: null,
    });
  }

  // Record fee transaction
  const txRef = collections.transactions.doc();
  batch.set(txRef, {
    userId: uid,
    type: 'vault_withdrawal',
    amount: -withdrawalFee,
    description: `Vault withdrawal fee for "${vaultData.cardName}"`,
    metadata: { vaultId, cardName: vaultData.cardName },
    createdAt: FieldValue.serverTimestamp(),
  });

  await batch.commit();

  return successResponse({
    vaultId,
    fee: withdrawalFee,
    totalYieldEarned: vaultData.totalYieldEarned,
    message: `Withdrawal requested for "${vaultData.cardName}". Fee: ${withdrawalFee} $MOHN. Card will be shipped back within 5-7 days.`,
  });
}
