'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package, Coins, Sparkles, ChevronRight, Shield,
  Star, Gift, Zap, ArrowRight, CreditCard
} from 'lucide-react';
import { PackStore } from '@/components/PackStore';

const MOHN_BUNDLES = [
  { amount: 500, price: '$4.99', perMohn: '$0.010', popular: false, savings: '' },
  { amount: 2500, price: '$19.99', perMohn: '$0.008', popular: true, savings: 'Save 20%' },
  { amount: 10000, price: '$69.99', perMohn: '$0.007', popular: false, savings: 'Save 30%' },
];

const RECENT_PULLS = [
  { user: 'DragonSlayer42', creature: 'Infernak', rarity: 'legendary', emoji: '🐉', time: '2 min ago' },
  { user: 'CrystalQueen', creature: 'Prismatic', rarity: 'mythic', emoji: '💎', time: '5 min ago' },
  { user: 'ShadowMaster', creature: 'Gloomclaw', rarity: 'rare', emoji: '👾', time: '8 min ago' },
  { user: 'VoltBoy99', creature: 'Sparkfin', rarity: 'uncommon', emoji: '⚡', time: '12 min ago' },
];

const RARITY_COLORS: Record<string, string> = {
  common: 'text-zinc-400',
  uncommon: 'text-green-400',
  rare: 'text-blue-400',
  legendary: 'text-yellow-400',
  mythic: 'text-pink-400',
};

export default function PacksPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-500/8 blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Package className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold text-blue-300">Open packs, discover MohnSters</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-[var(--font-heading)]">
            Pack <span className="gradient-text-purple">Store</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Choose your pack tier. Higher tiers = rarer MohnSters with better stats. Pay with $MOHN tokens or USD via Stripe.
          </p>
        </div>
      </section>

      {/* Pack Store */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <PackStore />
        </div>
      </section>

      <div className="section-divider" />

      {/* Buy $MOHN Bundles */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
              Buy <span className="gradient-text-gold">$MOHN</span> Tokens
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Need more $MOHN to open packs? Buy bundles with Stripe — secure, instant, no crypto wallet needed.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {MOHN_BUNDLES.map((bundle) => (
              <div
                key={bundle.amount}
                className={`glass-card rounded-2xl p-6 text-center relative ${
                  bundle.popular ? 'border-yellow-500/30 glow-gold' : ''
                }`}
              >
                {bundle.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-[10px] font-bold px-3 py-1 rounded-full">
                    BEST VALUE
                  </div>
                )}
                <div className="text-3xl mb-3">💰</div>
                <div className="text-3xl font-black gradient-text-gold mb-1">{bundle.amount.toLocaleString()}</div>
                <div className="text-xs text-yellow-500/70 mb-4">$MOHN Tokens</div>
                <div className="text-2xl font-black text-white mb-1">{bundle.price}</div>
                <div className="text-xs text-zinc-500 mb-1">{bundle.perMohn} per $MOHN</div>
                {bundle.savings && (
                  <div className="text-xs font-bold text-green-400 mb-4">{bundle.savings}</div>
                )}
                <button className="w-full btn-gold text-sm py-3 mt-2 flex items-center justify-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Recent Pulls Feed */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
              Recent <span className="gradient-text-purple">Pulls</span>
            </h2>
            <p className="text-zinc-500">See what other trainers are pulling right now</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {RECENT_PULLS.map((pull) => (
              <div key={pull.user + pull.creature} className="glass-card rounded-xl p-4 flex items-center gap-4">
                <span className="text-3xl">{pull.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{pull.user}</span>
                    <span className="text-xs text-zinc-500">pulled</span>
                    <span className={`text-sm font-bold ${RARITY_COLORS[pull.rarity]}`}>{pull.creature}</span>
                  </div>
                  <div className="text-xs text-zinc-500 capitalize">{pull.rarity} • {pull.time}</div>
                </div>
                {pull.rarity === 'mythic' && (
                  <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
                )}
                {pull.rarity === 'legendary' && (
                  <Star className="w-5 h-5 text-yellow-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pack Odds Transparency */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Pack Odds (Transparent)
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { tier: 'Common Pack', odds: 'Common 60% • Uncommon 30% • Rare 10%' },
                { tier: 'Rare Pack', odds: 'Uncommon 40% • Rare 40% • Legendary 15% • Mythic 5%' },
                { tier: 'Legendary Pack', odds: 'Rare 30% • Legendary 50% • Mythic 20%' },
                { tier: 'Mythic Pack', odds: 'Legendary 50% • Mythic 50% + 1 Guaranteed Mythic' },
              ].map((t) => (
                <div key={t.tier} className="bg-white/[0.02] rounded-lg p-4">
                  <h4 className="text-sm font-bold text-white mb-1">{t.tier}</h4>
                  <p className="text-xs text-zinc-500">{t.odds}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-600 mt-4">
              Pity System: Guaranteed Rare+ every 10 packs. Guaranteed Legendary every 50 packs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
