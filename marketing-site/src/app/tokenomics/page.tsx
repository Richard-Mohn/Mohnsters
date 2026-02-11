import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Coins, TrendingUp, Lock, Flame, ArrowRight, ChevronRight,
  BarChart3, Users, Zap, ShoppingCart, MessageSquare, Vote,
  Wallet, Gift
} from 'lucide-react';

export const metadata: Metadata = {
  title: '$MOHN Tokenomics — Earn, Spend, Stake Across MohnSters',
  description: 'Learn how $MOHN powers the MohnSters ecosystem. Fixed supply, deflationary burns, 8 utilities, and cross-platform earning.',
};

const TOKEN_STATS = [
  { label: 'Total Supply', value: '100,000,000', detail: 'Fixed forever' },
  { label: 'Initial Price', value: '$0.01', detail: 'USD equivalent' },
  { label: 'Blockchain', value: 'Solana', detail: 'SPL Token' },
  { label: 'Burn Rate', value: '5%', detail: 'On every spend' },
];

const DISTRIBUTION = [
  { name: 'Community Mining Pool', pct: 40, amount: '40,000,000', color: 'bg-green-500', desc: 'Released over 10 years via halving schedule' },
  { name: 'Business Rewards', pct: 20, amount: '20,000,000', color: 'bg-blue-500', desc: 'For platform incentives & loyalty programs' },
  { name: 'Platform Treasury', pct: 15, amount: '15,000,000', color: 'bg-purple-500', desc: 'Transaction fees → buybacks & yields' },
  { name: 'Team & Founders', pct: 15, amount: '15,000,000', color: 'bg-orange-500', desc: '4-year vesting (no dump and run)' },
  { name: 'Early Adopter Bonus', pct: 10, amount: '10,000,000', color: 'bg-yellow-500', desc: '200 $MOHN per signup, first 10K users' },
];

const UTILITIES = [
  { icon: '⛏️', title: 'Earn', desc: 'Scan cards, win battles, complete quests, vault cards — every action earns $MOHN.', color: 'from-green-500 to-emerald-600' },
  { icon: '🛍️', title: 'Spend', desc: 'Buy packs, feed MohnSters, evolve creatures, pay vault fees. 5% burned on every spend.', color: 'from-blue-500 to-indigo-600' },
  { icon: '🔒', title: 'Stake', desc: 'Lock $MOHN for 30-180 days. Earn up to 12% APY while reducing circulating supply.', color: 'from-purple-500 to-violet-600' },
  { icon: '🎫', title: 'Subscribe', desc: 'MohnSters Pass ($4.99/mo or 399 $MOHN) for daily packs, 2x XP, and exclusive drops.', color: 'from-yellow-500 to-amber-600' },
  { icon: '📢', title: 'Boost', desc: 'Boost your MohnSters visibility in the marketplace. Premium placement costs $MOHN.', color: 'from-orange-500 to-red-600' },
  { icon: '💰', title: 'Tip', desc: 'Tip other players for great battles, trades, or community contributions.', color: 'from-pink-500 to-rose-600' },
  { icon: '🗳️', title: 'Govern', desc: 'Hold $MOHN, vote on new features, elements, season themes, and battle rules.', color: 'from-cyan-500 to-teal-600' },
  { icon: '🔄', title: 'Trade', desc: 'Trade $MOHN peer-to-peer or on exchanges. Bridge across Solana, Ethereum, and Base networks.', color: 'from-indigo-500 to-blue-600' },
];

const EARN_IN_MOHNSTERS = [
  { action: 'Scan a card', amount: '10-100', icon: '📸' },
  { action: 'Open a pack', amount: 'Spend 50-5K', icon: '🎁' },
  { action: 'Win Quick Battle', amount: '5-20', icon: '⚔️' },
  { action: 'Win Ranked Battle', amount: '20-100', icon: '🏆' },
  { action: 'Tournament 1st Place', amount: '10,000', icon: '🥇' },
  { action: 'Daily Login Streak', amount: '5-50', icon: '📅' },
  { action: 'Complete Daily Quests', amount: '30-120', icon: '🎯' },
  { action: 'Vault Yield (monthly)', amount: '0.5-2%', icon: '🔒' },
  { action: 'Feed MohnSter (level)', amount: 'Spend 10/lv', icon: '🍖' },
  { action: 'Evolve MohnSter', amount: 'Spend 500', icon: '✨' },
  { action: 'Trade (fee)', amount: '5% burned', icon: '🔥' },
  { action: 'Season Pass Premium', amount: 'Spend 999', icon: '⭐' },
];

const ECOSYSTEM_PLATFORMS = [
  { name: 'MohnSters', domain: 'mohnsters.com', desc: 'Card scanning, creatures, battles', icon: '👾', active: true },
  { name: 'NeighborTechs', domain: 'neighbortechs.com', desc: 'IT repair marketplace', icon: '🔧', active: true },
  { name: 'MohnMint', domain: 'MohnMint.com', desc: 'Token hub & wallet', icon: '💰', active: true },
  { name: 'MohnMatrix', domain: 'mohnmatrix.com', desc: 'Background checks & data', icon: '🔍', active: true },
  { name: 'Flaming Social', domain: 'flamingsocialmedia.com', desc: 'Social media services', icon: '🔥', active: true },
  { name: 'MohnMove', domain: 'mohnmove.com', desc: 'Peer delivery network', icon: '🚚', active: false },
  { name: 'MohnMenu', domain: 'MohnMenu.com', desc: 'Commission-free ordering', icon: '🍜', active: false },
];

export default function TokenomicsPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-yellow-500/8 blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-bold text-yellow-300">The currency of the Mohn Empire</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-[var(--font-heading)]">
            <span className="gradient-text-gold">$MOHN</span> Tokenomics
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Fixed supply. Deflationary burns. Real utility across 6 platforms. $MOHN is earned through real activity — not mining rigs.
          </p>
        </div>
      </section>

      {/* Token Stats */}
      <section className="pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {TOKEN_STATS.map((stat) => (
              <div key={stat.label} className="glass-card rounded-xl p-5 text-center">
                <div className="text-2xl font-black gradient-text-gold mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-white mb-0.5">{stat.label}</div>
                <div className="text-xs text-zinc-500">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Distribution */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
              Token <span className="gradient-text-gold">Distribution</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Visual bar */}
            <div className="flex h-6 rounded-full overflow-hidden mb-8">
              {DISTRIBUTION.map((d) => (
                <div
                  key={d.name}
                  className={`${d.color} transition-all`}
                  style={{ width: `${d.pct}%` }}
                  title={`${d.name}: ${d.pct}%`}
                />
              ))}
            </div>

            <div className="space-y-3">
              {DISTRIBUTION.map((d) => (
                <div key={d.name} className="flex items-center gap-4 glass-card rounded-xl p-4">
                  <div className={`w-4 h-4 rounded-full ${d.color} shrink-0`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{d.name}</span>
                      <span className="text-xs text-zinc-500">({d.pct}%)</span>
                    </div>
                    <div className="text-xs text-zinc-500">{d.desc}</div>
                  </div>
                  <div className="text-sm font-bold text-yellow-400 shrink-0">{d.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 7 Utilities */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
              8 <span className="gradient-text-purple">Utilities</span> of $MOHN
            </h2>
            <p className="text-zinc-500">One token, eight ways to use it</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {UTILITIES.map((u) => (
              <div key={u.title} className="glass-card rounded-xl p-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${u.color} flex items-center justify-center text-lg mb-3`}>
                  {u.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-1">{u.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* MohnSters Economy Table */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
              $MOHN in <span className="gradient-text-purple">MohnSters</span>
            </h2>
            <p className="text-zinc-500">Every in-game action has a $MOHN value</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {EARN_IN_MOHNSTERS.map((item) => (
              <div key={item.action} className="flex items-center gap-3 glass-card rounded-lg p-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm text-zinc-300 flex-1">{item.action}</span>
                <span className={`text-sm font-bold ${item.amount.includes('Spend') ? 'text-red-400' : 'text-green-400'}`}>
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Cross-Platform Ecosystem */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
              One Token. <span className="gradient-text-gold">6 Platforms.</span>
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              $MOHN earned in MohnSters works everywhere in the Mohn ecosystem
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {ECOSYSTEM_PLATFORMS.map((p) => (
              <div key={p.name} className={`glass-card rounded-xl p-5 ${!p.active ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{p.name}</h4>
                    <div className="text-xs text-zinc-500">{p.domain}</div>
                  </div>
                </div>
                <p className="text-xs text-zinc-400">{p.desc}</p>
                {!p.active && <div className="text-[10px] text-zinc-600 mt-2">Coming Soon</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="glass-card rounded-2xl p-10 max-w-3xl mx-auto glow-gold">
            <h2 className="text-3xl font-black text-white mb-4">
              Start Earning <span className="gradient-text-gold">$MOHN</span> Today
            </h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
              Sign up free, scan your first card, and earn $MOHN instantly. Or buy bundles with USD via Stripe.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                Play Free <ChevronRight className="w-5 h-5" />
              </button>
              <a href="https://MohnMint.com" target="_blank" rel="noopener" className="btn-gold text-lg px-8 py-4 flex items-center gap-2">
                <Coins className="w-5 h-5" />
                Visit MohnMint
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
