import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Coins, TrendingUp, ArrowRight, Shield, Zap, Users,
  BarChart3, Globe, Building2, Rocket, Crown, ChevronRight,
  CheckCircle2, Star, Flame, Award, Target, Lock, BadgeCheck,
  LineChart, Layers, Sparkles, Handshake
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Mohn Empire — One Ecosystem. One Token. Infinite Possibilities.',
  description: 'Discover how the Mohn Empire connects 6+ platforms under one $MOHN token. Learn why MohnSters creatures grow in real monetary value as the ecosystem expands.',
};

/* ─── Data ─── */

const EMPIRE_PLATFORMS = [
  {
    name: 'MohnSters',
    domain: 'mohnsters.com',
    desc: 'AI-powered collectible creature game. Scan cards, hatch MohnSters, battle, and earn $MOHN.',
    icon: '👾',
    status: 'Building',
    color: 'from-purple-500 to-violet-600',
    users: 'Pre-launch',
  },
  {
    name: 'NeighborTechs',
    domain: 'neighbortechs.com',
    desc: 'Hyper-local IT marketplace connecting consumers with vetted technicians for affordable repairs.',
    icon: '🔧',
    status: 'Live',
    color: 'from-blue-500 to-indigo-600',
    users: 'Growing',
  },
  {
    name: 'MohnMint',
    domain: 'MohnMint.com',
    desc: 'The official $MOHN token hub. Wallet management, staking, bridge, and governance portal.',
    icon: '💰',
    status: 'Building',
    color: 'from-yellow-500 to-amber-600',
    users: 'Pre-launch',
  },
  {
    name: 'MohnMatrix',
    domain: 'mohnmatrix.com',
    desc: 'Background checks, data verification, and trust scoring for gig economy platforms.',
    icon: '🔍',
    status: 'Live',
    color: 'from-green-500 to-emerald-600',
    users: 'Growing',
  },
  {
    name: 'Flaming Social',
    domain: 'flamingsocialmedia.com',
    desc: 'Full-service social media management, marketing campaigns, and content creation.',
    icon: '🔥',
    status: 'Live',
    color: 'from-orange-500 to-red-600',
    users: 'Active',
  },
  {
    name: 'MohnMove',
    domain: 'mohnmove.com',
    desc: 'Peer-to-peer delivery and moving network. Think Uber meets TaskRabbit for logistics.',
    icon: '🚚',
    status: 'Planned',
    color: 'from-cyan-500 to-teal-600',
    users: 'Coming Soon',
  },
  {
    name: 'MohnMenu',
    domain: 'MohnMenu.com',
    desc: 'Commission-free ordering platform for local restaurants and stores. Cards, crypto, and cash.',
    icon: '🍜',
    status: 'Building',
    color: 'from-orange-500 to-red-600',
    users: 'Pre-launch',
  },
];

const COMPETITORS = [
  {
    name: 'Typical Game Tokens',
    weaknesses: [
      'Single-game utility only',
      'Token dies if game dies',
      'No real-world business backing',
      'Speculative value only',
      'No revenue-generating businesses',
    ],
  },
  {
    name: '$MOHN (Mohn Empire)',
    strengths: [
      'Utility across 6+ real platforms',
      'Backed by revenue-generating businesses',
      'Deflationary — 5% burn on every spend',
      'Real customers, real transactions daily',
      'Diverse ecosystem reduces single-point risk',
    ],
  },
];

const GROWTH_DRIVERS = [
  {
    icon: Building2,
    title: 'Real Businesses = Real Demand',
    desc: 'Unlike meme coins, $MOHN is used by real businesses with real customers. NeighborTechs processes IT repair payments, MohnMatrix runs background checks, Flaming Social manages campaigns — all generating organic token demand.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Flame,
    title: 'Deflationary by Design',
    desc: 'Every $MOHN transaction burns 5% permanently. As more platforms go live and more users transact, the circulating supply shrinks while demand increases — basic economics of scarcity.',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: Globe,
    title: 'Network Effect Acceleration',
    desc: 'Each new platform in the Mohn Empire adds users who interact with $MOHN. A NeighborTechs customer can earn $MOHN from a repair job, then spend it opening MohnSter packs. Cross-platform flow compounds value.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Lock,
    title: 'Fixed Supply, Growing Ecosystem',
    desc: '100,000,000 $MOHN. That number never changes. As 6+ platforms with thousands of users share a fixed supply, the math is straightforward — more users competing for fewer tokens.',
    color: 'from-yellow-500 to-amber-600',
  },
];

const VALUE_CHAIN = [
  { step: '1', title: 'You Play MohnSters', desc: 'Scan cards, battle, complete quests', icon: '🎮' },
  { step: '2', title: 'You Earn $MOHN', desc: 'Every action rewards real tokens', icon: '💎' },
  { step: '3', title: 'Empire Grows', desc: 'More platforms, more users, more demand', icon: '📈' },
  { step: '4', title: 'Supply Shrinks', desc: '5% burned on every transaction', icon: '🔥' },
  { step: '5', title: 'Your Assets Appreciate', desc: 'MohnSters + $MOHN grow in value', icon: '🚀' },
];

const DISCLAIMER_TEXT = `This page is for informational purposes only and does not constitute financial advice, an offer to sell securities, or a solicitation of an offer to buy securities. $MOHN is a utility token designed for use within the Mohn Empire ecosystem. The value of $MOHN and digital assets within the MohnSters platform may fluctuate. Past performance does not guarantee future results. Please conduct your own research and consult a financial advisor before making any investment decisions. The Mohn Empire makes no guarantees of profit or returns.`;

export default function EmpirePage() {
  return (
    <div className="relative bg-grid-pattern">

      {/* ═══════ HERO ═══════ */}
      <section className="relative py-24 md:py-32">
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-purple-500/8 blur-[120px]" />
        <div className="absolute bottom-10 right-1/3 w-80 h-80 rounded-full bg-yellow-500/6 blur-[100px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-bold text-yellow-300">The Mohn Ecosystem</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 font-[var(--font-heading)]">
            One Empire. <span className="gradient-text-gold">One Token.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-4">
            MohnSters isn&apos;t just a game. It&apos;s the gaming layer of a <span className="text-white font-semibold">multi-platform business ecosystem</span> where every platform drives real value to <span className="text-yellow-400 font-bold">$MOHN</span>.
          </p>
          <p className="text-base text-zinc-500 max-w-2xl mx-auto mb-10">
            Understand the mechanics of how playing MohnSters connects to a larger vision — and why that matters for the long-term value of your creatures and tokens.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/tokenomics" className="btn-gold text-base px-8 py-4 flex items-center gap-2">
              <Coins className="w-5 h-5" />
              $MOHN Tokenomics
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/investors" className="btn-outline text-base px-8 py-4 flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Investor Overview
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ WHY YOUR MOHNSTERS COULD GROW IN VALUE ═══════ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="section-label bg-green-500/10 border border-green-500/20 text-green-300 mx-auto w-fit mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              Value Thesis
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Why Your MohnSters Could <span className="gradient-text-gold">Appreciate</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-3xl mx-auto">
              We can&apos;t guarantee returns — nobody honestly can. But here&apos;s the transparent analysis of why the ecosystem is designed for long-term growth.
            </p>
          </div>

          {/* Value Chain — 5 steps */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 max-w-5xl mx-auto mb-16">
            {VALUE_CHAIN.map((item, i) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="glass-card rounded-2xl p-5 w-full mb-2">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-xs font-bold text-purple-400 mb-1">Step {item.step}</div>
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-[11px] text-zinc-500">{item.desc}</p>
                </div>
                {i < VALUE_CHAIN.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-zinc-700 rotate-90 sm:hidden mt-1" />
                )}
              </div>
            ))}
          </div>

          {/* 4 Growth Drivers — balanced grid */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {GROWTH_DRIVERS.map((driver) => (
              <div key={driver.title} className="glass-card rounded-2xl p-6 group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${driver.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <driver.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{driver.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{driver.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════ THE EMPIRE — 6 Platforms ═══════ */}
      <section className="relative py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-label bg-purple-500/10 border border-purple-500/20 text-purple-300 mx-auto w-fit mb-4">
              <Layers className="w-3.5 h-3.5" />
              The Ecosystem
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              6 Platforms. <span className="gradient-text-purple">One Token.</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-3xl mx-auto">
              Every platform in the Mohn Empire uses $MOHN. Every user on every platform drives demand. Your MohnSters live inside the fastest-growing multi-platform token ecosystem.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {EMPIRE_PLATFORMS.map((platform) => (
              <div key={platform.name} className="glass-card rounded-2xl p-6 group">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{platform.icon}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    platform.status === 'Live'
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : platform.status === 'Building'
                      ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                  }`}>
                    {platform.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1">{platform.name}</h3>
                <p className="text-xs text-zinc-500 mb-3 leading-relaxed">{platform.desc}</p>
                <span className="text-[11px] text-zinc-600">{platform.domain}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════ VS COMPETITORS ═══════ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="section-label bg-red-500/10 border border-red-500/20 text-red-300 mx-auto w-fit mb-4">
              <Target className="w-3.5 h-3.5" />
              Competitive Advantage
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Why $MOHN Is <span className="gradient-text-purple">Different</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Most game tokens exist in a vacuum. $MOHN exists in a business empire.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Typical tokens */}
            <div className="glass-card rounded-2xl p-6 border-red-500/20">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 font-black text-lg">✗</span>
                </div>
                <h3 className="text-lg font-bold text-white">{COMPETITORS[0]!.name}</h3>
              </div>
              <ul className="space-y-3">
                {COMPETITORS[0]!.weaknesses!.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-sm text-zinc-400">
                    <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            {/* $MOHN */}
            <div className="glass-card rounded-2xl p-6 border-green-500/20 glow-gold">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white">{COMPETITORS[1]!.name}</h3>
              </div>
              <ul className="space-y-3">
                {COMPETITORS[1]!.strengths!.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════ HOW VALUE FLOWS ═══════ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              The <span className="gradient-text-gold">Flywheel</span> Effect
            </h2>
            <p className="text-lg text-zinc-500 max-w-3xl mx-auto">
              As the Mohn Empire grows, multiple forces work together to create a self-reinforcing cycle of value creation.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  Supply Side
                </h3>
                <ul className="space-y-4">
                  {[
                    { label: 'Fixed at 100M tokens', detail: 'No new $MOHN can ever be created' },
                    { label: '5% burn on every spend', detail: 'Packs, evolution, vault fees — all burn $MOHN' },
                    { label: 'Staking locks supply', detail: '30-180 day locks earn yield, reduce circulation' },
                    { label: 'Halving mining schedule', detail: 'Community pool rewards decrease over 10 years' },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-white">{item.label}</div>
                        <div className="text-xs text-zinc-500">{item.detail}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Demand Side
                </h3>
                <ul className="space-y-4">
                  {[
                    { label: '6+ platforms using $MOHN', detail: 'Each new platform adds thousands of users' },
                    { label: 'Real business transactions', detail: 'IT repairs, background checks, social campaigns' },
                    { label: 'Game economy grows', detail: 'More players = more pack purchases = more burns' },
                    { label: 'Cross-platform flow', detail: 'Earned in one app, spent in another — compounding utility' },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-white">{item.label}</div>
                        <div className="text-xs text-zinc-500">{item.detail}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-sm text-zinc-400">
                <span className="text-red-400 font-bold">Shrinking supply</span>
                {' + '}
                <span className="text-green-400 font-bold">Growing demand</span>
                {' = '}
                <span className="text-yellow-400 font-bold">Potential appreciation over time</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════ CTA ═══════ */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 font-[var(--font-heading)]">
            The Best Time to Start Is <span className="gradient-text-purple">Now</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Early players accumulate the most creatures, earn the most tokens, and position themselves at the ground floor of a growing ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/" className="btn-primary text-lg px-10 py-5 flex items-center gap-2 group">
              <Sparkles className="w-5 h-5" />
              Start Playing Free
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/investors" className="btn-outline text-lg px-8 py-4 flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Investor Overview
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ DISCLAIMER ═══════ */}
      <section className="py-12 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Important Disclaimer</h4>
            <p className="text-[11px] text-zinc-600 leading-relaxed">
              {DISCLAIMER_TEXT}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
