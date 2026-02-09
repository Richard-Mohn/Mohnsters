/* ═══════════════════════════════════════════════════════════
   Stripe Configuration for MohnSters
   ═══════════════════════════════════════════════════════════ */

import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY not set — configure .env.local');
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-01-27.acacia' as any,
      typescript: true,
    });
  }
  return _stripe;
}

// Re-export for backward compat
export const stripe = {
  get checkout() { return getStripe().checkout; },
  get webhooks() { return getStripe().webhooks; },
  get customers() { return getStripe().customers; },
  get subscriptions() { return getStripe().subscriptions; },
};

/* ─── Product Definitions ─── */

export const PACK_PRODUCTS = {
  common: {
    name: 'Common MohnSter Pack',
    description: '3 MohnSter creatures (60% Common, 30% Uncommon, 10% Rare)',
    priceUsd: 99, // in cents
    mohnPrice: 50,
    cards: 3,
    stripePriceId: process.env.STRIPE_PRICE_COMMON || '',
  },
  rare: {
    name: 'Rare MohnSter Pack',
    description: '5 MohnSter creatures (40% Uncommon, 40% Rare, 15% Legendary, 5% Mythic)',
    priceUsd: 499,
    mohnPrice: 200,
    cards: 5,
    stripePriceId: process.env.STRIPE_PRICE_RARE || '',
  },
  legendary: {
    name: 'Legendary MohnSter Pack',
    description: '5 MohnSter creatures (30% Rare, 50% Legendary, 20% Mythic)',
    priceUsd: 999,
    mohnPrice: 1000,
    cards: 5,
    stripePriceId: process.env.STRIPE_PRICE_LEGENDARY || '',
  },
  mythic: {
    name: 'Mythic MohnSter Pack',
    description: '5 MohnSter creatures (50% Legendary, 50% Mythic + 1 Guaranteed Mythic)',
    priceUsd: 4999,
    mohnPrice: 5000,
    cards: 5,
    stripePriceId: process.env.STRIPE_PRICE_MYTHIC || '',
  },
};

export const MOHN_BUNDLES = {
  small: {
    name: '500 $MOHN Bundle',
    description: '500 $MOHN tokens',
    priceUsd: 499,
    mohnAmount: 500,
    stripePriceId: process.env.STRIPE_PRICE_MOHN_500 || '',
  },
  medium: {
    name: '2,500 $MOHN Bundle',
    description: '2,500 $MOHN tokens (Save 20%)',
    priceUsd: 1999,
    mohnAmount: 2500,
    stripePriceId: process.env.STRIPE_PRICE_MOHN_2500 || '',
  },
  large: {
    name: '10,000 $MOHN Bundle',
    description: '10,000 $MOHN tokens (Save 30%)',
    priceUsd: 6999,
    mohnAmount: 10000,
    stripePriceId: process.env.STRIPE_PRICE_MOHN_10000 || '',
  },
};

export const SUBSCRIPTION_PRODUCTS = {
  pass: {
    name: 'MohnSters Pass',
    description: 'Monthly subscription: daily free pack, 2x XP, exclusive drops',
    priceUsd: 499,
    stripePriceId: process.env.STRIPE_PRICE_PASS || '',
  },
};
