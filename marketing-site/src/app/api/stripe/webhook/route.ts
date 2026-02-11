/* ═══════════════════════════════════════════════════════════
   POST /api/stripe/webhook
   Handles Stripe webhook events for payment fulfillment
   ═══════════════════════════════════════════════════════════ */

import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PACK_PRODUCTS, MOHN_BUNDLES } from '@/lib/stripe';
import { db, collections } from '@/lib/firebase-admin';
import { generatePack } from '@/lib/game-engine';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const { userId, type, tier, cards, mohnAmount } = session.metadata || {};

        if (!userId || userId === 'anonymous') {
          console.warn('Webhook: No userId in metadata, skipping fulfillment');
          break;
        }

        if (type === 'pack') {
          await fulfillPackPurchase(userId, tier, parseInt(cards || '3'));
        } else if (type === 'mohn') {
          await fulfillMohnPurchase(userId, parseInt(mohnAmount || '0'));
        } else if (type === 'subscription') {
          await fulfillSubscription(userId, session.subscription);
        }

        // Record transaction
        await collections.transactions.add({
          userId,
          type: 'purchase',
          amount: session.amount_total / 100,
          description: `${type} purchase: ${tier}`,
          metadata: { stripeSessionId: session.id, tier },
          createdAt: FieldValue.serverTimestamp(),
        });

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        // Handle subscription cancellation
        console.log('Subscription cancelled:', subscription.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

/* ─── Fulfillment Functions ─── */

async function fulfillPackPurchase(userId: string, tier: string, cardCount: number) {
  const creatures = generatePack(tier, cardCount);

  const batch = db.batch();

  for (const creature of creatures) {
    const ref = collections.mohnsters.doc();
    batch.set(ref, {
      ...creature,
      id: ref.id,
      ownerId: userId,
      level: 1,
      xp: 0,
      vaultBoosted: false,
      createdAt: FieldValue.serverTimestamp(),
    });
  }

  // Update user stats
  const userRef = collections.users.doc(userId);
  batch.update(userRef, {
    packsPurchased: FieldValue.increment(1),
    updatedAt: FieldValue.serverTimestamp(),
  });

  // Record the pack opening
  const packRef = collections.packs.doc();
  batch.set(packRef, {
    id: packRef.id,
    userId,
    tier,
    creatures: creatures.map((c) => ({ name: c.name, rarity: c.rarity, element: c.element })),
    openedAt: FieldValue.serverTimestamp(),
  });

  await batch.commit();
  console.log(`Pack fulfilled for ${userId}: ${creatures.length} creatures (${tier} tier)`);
}

async function fulfillMohnPurchase(userId: string, amount: number) {
  const userRef = collections.users.doc(userId);
  await userRef.update({
    mohnBalance: FieldValue.increment(amount),
    updatedAt: FieldValue.serverTimestamp(),
  });

  await collections.transactions.add({
    userId,
    type: 'earn',
    amount,
    description: `Purchased ${amount} $MOHN`,
    createdAt: FieldValue.serverTimestamp(),
  });

  console.log(`$MOHN fulfilled for ${userId}: +${amount}`);
}

async function fulfillSubscription(userId: string, subscriptionId: string) {
  const userRef = collections.users.doc(userId);
  await userRef.update({
    'subscription.active': true,
    'subscription.stripeSubscriptionId': subscriptionId,
    'subscription.startedAt': FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  console.log(`Subscription activated for ${userId}: ${subscriptionId}`);
}
