/* ═══════════════════════════════════════════════════════════
   GET /api/wallet
   Returns user's $MOHN balance, transaction history, and stats
   POST /api/wallet — Transfer $MOHN (trade fees, tips, etc.)
   ═══════════════════════════════════════════════════════════ */

import { NextRequest } from 'next/server';
import { collections } from '@/lib/firebase-admin';
import { authenticateRequest, successResponse, errorResponse } from '@/lib/auth-middleware';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authResult = await authenticateRequest(request);
  if ('error' in authResult) return authResult.error;

  const { uid } = authResult.user;

  try {
    // Fetch user profile
    const userDoc = await collections.users.doc(uid).get();
    if (!userDoc.exists) {
      return errorResponse('User not found', 404);
    }

    const userData = userDoc.data()!;

    // Fetch recent transactions
    const txSnapshot = await collections.transactions
      .where('userId', '==', uid)
      .orderBy('createdAt', 'desc')
      .limit(25)
      .get();

    const transactions = txSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Calculate lifetime earnings
    const earnTxs = transactions.filter((t: any) => t.type === 'earn' || t.type === 'vault_yield');
    const spendTxs = transactions.filter((t: any) => t.type === 'spend' || t.type === 'vault_withdrawal' || t.type === 'trade_fee');

    const totalEarned = earnTxs.reduce((sum: number, t: any) => sum + (t.amount || 0), 0);
    const totalSpent = spendTxs.reduce((sum: number, t: any) => sum + Math.abs(t.amount || 0), 0);

    return successResponse({
      balance: userData.mohnBalance || 0,
      level: userData.level || 1,
      xp: userData.xp || 0,
      stats: {
        totalEarned,
        totalSpent,
        totalScans: userData.totalScans || 0,
        totalBattles: userData.totalBattles || 0,
        totalWins: userData.totalWins || 0,
        packsPurchased: userData.packsPurchased || 0,
        vaultedCards: userData.vaultedCardsCount || 0,
      },
      recentTransactions: transactions,
    });
  } catch (error: any) {
    console.error('Wallet error:', error);
    return errorResponse(error.message || 'Failed to fetch wallet', 500);
  }
}

export async function POST(request: NextRequest) {
  const authResult = await authenticateRequest(request);
  if ('error' in authResult) return authResult.error;

  const { uid } = authResult.user;

  try {
    const body = await request.json();
    const { toUserId, amount, reason } = body;

    if (!toUserId || !amount || amount <= 0) {
      return errorResponse('Missing toUserId or invalid amount');
    }

    // Check sender balance
    const senderDoc = await collections.users.doc(uid).get();
    if (!senderDoc.exists) {
      return errorResponse('Sender not found', 404);
    }

    const senderData = senderDoc.data()!;
    const tradeFee = Math.ceil(amount * 0.05); // 5% trade fee
    const totalCost = amount + tradeFee;

    if (senderData.mohnBalance < totalCost) {
      return errorResponse(
        `Insufficient $MOHN. Need ${totalCost} (${amount} + ${tradeFee} fee), have ${senderData.mohnBalance}`
      );
    }

    // Check receiver exists
    const receiverDoc = await collections.users.doc(toUserId).get();
    if (!receiverDoc.exists) {
      return errorResponse('Recipient not found', 404);
    }

    const batch = collections.users.firestore.batch();

    // Debit sender
    batch.update(collections.users.doc(uid), {
      mohnBalance: FieldValue.increment(-totalCost),
      updatedAt: FieldValue.serverTimestamp(),
    });

    // Credit receiver
    batch.update(collections.users.doc(toUserId), {
      mohnBalance: FieldValue.increment(amount),
      updatedAt: FieldValue.serverTimestamp(),
    });

    // Record sender transaction
    const senderTxRef = collections.transactions.doc();
    batch.set(senderTxRef, {
      userId: uid,
      type: 'spend',
      amount: -totalCost,
      description: `Sent ${amount} $MOHN to ${receiverDoc.data()!.displayName}${reason ? ` — ${reason}` : ''}`,
      metadata: { toUserId, tradeFee },
      createdAt: FieldValue.serverTimestamp(),
    });

    // Record receiver transaction
    const receiverTxRef = collections.transactions.doc();
    batch.set(receiverTxRef, {
      userId: toUserId,
      type: 'earn',
      amount,
      description: `Received ${amount} $MOHN from ${senderData.displayName}${reason ? ` — ${reason}` : ''}`,
      metadata: { fromUserId: uid },
      createdAt: FieldValue.serverTimestamp(),
    });

    // Record trade fee (burned)
    const feeTxRef = collections.transactions.doc();
    batch.set(feeTxRef, {
      userId: 'system',
      type: 'trade_fee',
      amount: tradeFee,
      description: `Trade fee: ${uid} → ${toUserId}`,
      metadata: { fromUserId: uid, toUserId },
      createdAt: FieldValue.serverTimestamp(),
    });

    await batch.commit();

    return successResponse({
      sent: amount,
      fee: tradeFee,
      newBalance: senderData.mohnBalance - totalCost,
      message: `Sent ${amount} $MOHN! (${tradeFee} $MOHN fee burned)`,
    });
  } catch (error: any) {
    console.error('Transfer error:', error);
    return errorResponse(error.message || 'Transfer failed', 500);
  }
}
