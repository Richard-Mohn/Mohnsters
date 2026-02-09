/* ═══════════════════════════════════════════════════════════
   POST /api/stripe/checkout
   Creates a Stripe Checkout session for packs or $MOHN bundles
   ═══════════════════════════════════════════════════════════ */

import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PACK_PRODUCTS, MOHN_BUNDLES, SUBSCRIPTION_PRODUCTS } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, tier, userId, email } = body;

    if (!type || !tier) {
      return NextResponse.json({ error: 'Missing type or tier' }, { status: 400 });
    }

    let lineItems: any[] = [];
    let mode: 'payment' | 'subscription' = 'payment';
    let metadata: Record<string, string> = {
      userId: userId || 'anonymous',
      type,
      tier,
    };

    if (type === 'pack') {
      const pack = PACK_PRODUCTS[tier as keyof typeof PACK_PRODUCTS];
      if (!pack) {
        return NextResponse.json({ error: 'Invalid pack tier' }, { status: 400 });
      }

      if (pack.stripePriceId) {
        lineItems = [{ price: pack.stripePriceId, quantity: 1 }];
      } else {
        // Dynamic price (for dev/testing without Stripe Dashboard setup)
        lineItems = [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: pack.name,
                description: pack.description,
                images: ['https://mohnsters.com/packs/pack-' + tier + '.png'],
              },
              unit_amount: pack.priceUsd,
            },
            quantity: 1,
          },
        ];
      }
      metadata.cards = String(pack.cards);
    } else if (type === 'mohn') {
      const bundle = MOHN_BUNDLES[tier as keyof typeof MOHN_BUNDLES];
      if (!bundle) {
        return NextResponse.json({ error: 'Invalid $MOHN bundle' }, { status: 400 });
      }

      if (bundle.stripePriceId) {
        lineItems = [{ price: bundle.stripePriceId, quantity: 1 }];
      } else {
        lineItems = [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: bundle.name,
                description: bundle.description,
              },
              unit_amount: bundle.priceUsd,
            },
            quantity: 1,
          },
        ];
      }
      metadata.mohnAmount = String(bundle.mohnAmount);
    } else if (type === 'subscription') {
      const sub = SUBSCRIPTION_PRODUCTS[tier as keyof typeof SUBSCRIPTION_PRODUCTS];
      if (!sub) {
        return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 });
      }
      mode = 'subscription';

      if (sub.stripePriceId) {
        lineItems = [{ price: sub.stripePriceId, quantity: 1 }];
      } else {
        lineItems = [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: sub.name,
                description: sub.description,
              },
              unit_amount: sub.priceUsd,
              recurring: { interval: 'month' as const },
            },
            quantity: 1,
          },
        ];
      }
    } else {
      return NextResponse.json({ error: 'Invalid purchase type' }, { status: 400 });
    }

    const session = await getStripe().checkout.sessions.create({
      line_items: lineItems,
      mode,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mohnsters.com'}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mohnsters.com'}/packs`,
      customer_email: email || undefined,
      metadata,
      allow_promotion_codes: true,
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
