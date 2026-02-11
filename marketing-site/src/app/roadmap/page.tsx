import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ScanLine, Swords, Package, Lock, Coins, Trophy, Crown,
  ArrowRight, Target, Zap, Users, Globe, Rocket,
  Gamepad2, Star, Shield, Cpu, Sparkles, TrendingUp,
  Heart, MapPin, ChevronRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'MohnSters Roadmap — Game Development Phases',
  description: 'The complete MohnSters development roadmap. From card scanning beta to full ecosystem integration with the Mohn Empire.',
};

/* ─── Roadmap Phases ─── */

const PHASES = [
  {
    phase: 1,
    title: 'Card Scanner Beta',
    subtitle: 'Foundation',
    status: 'In Progress' as const,
    timeline: 'Q1 2026',
    color: 'from-purple-500 to-violet-600',
    icon: ScanLine,
    description: 'Launch the AI-powered card scanner. Scan any physical trading card — Pokémon, Yu-Gi-Oh!, MTG, sports cards — and build your digital portfolio.',
    milestones: [
      { label: 'AI card recognition engine', done: true },
      { label: 'Account system with Google & email auth', done: true },
      { label: 'Card portfolio dashboard', done: false },
      { label: 'One-scan-per-card deduplication', done: false },
      { label: 'Card grading & valuation estimates', done: false },
      { label: 'Public beta launch', done: false },
    ],
    highlight: 'Scan a card → collect one unique character per card. No farming, no duplicates — fair for everyone.',
  },
  {
    phase: 2,
    title: 'Character Generation',
    subtitle: 'AI-Powered Creatures',
    status: 'Up Next' as const,
    timeline: 'Q2 2026',
    color: 'from-blue-500 to-indigo-600',
    icon: Sparkles,
    description: 'Every scanned card generates a unique MohnSter creature with AI-generated stats, abilities, and visual design. Your cards come alive.',
    milestones: [
      { label: 'AI character generation from card data', done: false },
      { label: 'Stats system (ATK, DEF, SPD, HP, SP)', done: false },
      { label: '6 elemental types with advantages', done: false },
      { label: 'Rarity tiers (Common → Mythic)', done: false },
      { label: 'Character detail view with battle stats', done: false },
      { label: 'Collection gallery with filters & search', done: false },
    ],
    highlight: 'Same card, same base creature — but your version evolves based on what YOU do across the Mohn Empire.',
  },
  {
    phase: 3,
    title: 'Battle Arena',
    subtitle: 'PvP Combat',
    status: 'Planned' as const,
    timeline: 'Q3 2026',
    color: 'from-red-500 to-orange-600',
    icon: Swords,
    description: 'Build a team of 3 MohnSters and battle other players in turn-based tactical combat. Climb the ranked leaderboard and win $MOHN.',
    milestones: [
      { label: 'Turn-based battle engine', done: false },
      { label: 'Quick Battle matchmaking', done: false },
      { label: 'Ranked seasons with ELO rating', done: false },
      { label: 'Element advantage system', done: false },
      { label: 'Battle rewards ($MOHN + XP)', done: false },
      { label: 'Weekly 16-player tournaments', done: false },
    ],
    highlight: 'Win battles to earn $MOHN, gain XP, and unlock evolution paths for your creatures.',
  },
  {
    phase: 4,
    title: 'Empire Integration',
    subtitle: 'Cross-Platform Rewards',
    status: 'Planned' as const,
    timeline: 'Q4 2026',
    color: 'from-emerald-500 to-green-600',
    icon: Crown,
    description: 'Connect MohnSters to the entire Mohn Empire. Your activity across all 9 platforms — ordering food, completing IT jobs, running mining nodes — powers up your creatures.',
    milestones: [
      { label: 'Points system (earn via real-world actions)', done: false },
      { label: 'Cross-platform activity tracking', done: false },
      { label: 'Character evolution via ecosystem actions', done: false },
      { label: 'GPS check-in streaks (church, work, etc.)', done: false },
      { label: 'Spending milestones unlock rare variants', done: false },
      { label: 'Youth profiles with work permit verification', done: false },
    ],
    highlight: 'Order $300 in food this week? Your Infernak might evolve into its rare form. Go to church 30 days straight? Legendary drop incoming.',
  },
  {
    phase: 5,
    title: 'DNA Evolution',
    subtitle: 'AI Fusion System',
    status: 'Planned' as const,
    timeline: 'Q1 2027',
    color: 'from-pink-500 to-rose-600',
    icon: Zap,
    description: 'Combine two MohnSters to create an entirely new creature using AI generation. DNA Evolution produces one-of-a-kind hybrids that nobody else has.',
    milestones: [
      { label: 'AI-powered creature fusion engine', done: false },
      { label: 'Stat inheritance & mutation system', done: false },
      { label: 'Visual hybrid generation', done: false },
      { label: 'Rarity-based fusion requirements', done: false },
      { label: 'Fusion cooldowns & cost ($MOHN)', done: false },
      { label: 'Marketplace for trading fused creatures', done: false },
    ],
    highlight: 'Take two creatures, throw them in the DNA chamber, and our AI creates something entirely new. Every fusion is unique.',
  },
  {
    phase: 6,
    title: 'Token Launch',
    subtitle: '$MOHN Economy',
    status: 'Planned' as const,
    timeline: 'Q2 2027',
    color: 'from-yellow-500 to-amber-600',
    icon: Coins,
    description: 'Full $MOHN token launch. Points convert to tokens. Creatures gain real value. Trade, stake, and earn across all 9 Mohn Empire platforms.',
    milestones: [
      { label: 'Points → $MOHN token conversion', done: false },
      { label: 'Creature marketplace with $MOHN pricing', done: false },
      { label: '$MOHN staking for bonus rewards', done: false },
      { label: 'Exchange listings', done: false },
      { label: 'Cross-platform $MOHN utility live', done: false },
      { label: 'Governance voting for game features', done: false },
    ],
    highlight: 'Your characters have real value. Points become $MOHN. The ecosystem is live. 9 platforms. One token.',
  },
];

const CORE_PRINCIPLES = [
  { icon: Shield, title: 'Fair Play', desc: 'One unique character per card scan. No farming, no pay-to-win — everyone starts equal.' },
  { icon: Users, title: 'Accessible', desc: 'Free to start, rewarding to grind. Points first, tokens later. Works for all ages.' },
  { icon: Globe, title: 'Ecosystem-Driven', desc: 'Real actions across 9 platforms power up your game. Not just gaming — living.' },
  { icon: Heart, title: 'Community First', desc: 'Youth programs, church rewards, family-safe mode. Built to empower, not exploit.' },
];

export default function RoadmapPage() {
  return (
    <div className="relative bg-grid-pattern">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-pink-500/8 blur-[100px]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
            <Rocket className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-purple-300">Development Roadmap</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.9] mb-6 font-[var(--font-heading)]">
            The <span className="gradient-text-purple">Road</span> Ahead
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-4">
            From card scanner beta to a full ecosystem game with cross-platform evolution, DNA fusion, and real token economics.
          </p>
          <p className="text-base text-zinc-600 max-w-xl mx-auto">
            6 phases · 18 months · 1 unstoppable vision
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="relative z-10 py-8 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CORE_PRINCIPLES.map((p) => (
              <div key={p.title} className="text-center">
                <p.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm font-bold text-white mb-1">{p.title}</div>
                <div className="text-xs text-zinc-500">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Vertical timeline line */}
            <div className="relative">
              <div className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent" />

              <div className="space-y-12">
                {PHASES.map((phase) => (
                  <div key={phase.phase} className="relative pl-16 md:pl-20">
                    {/* Timeline node */}
                    <div className={`absolute left-0 top-1 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-lg`}>
                      <phase.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>

                    {/* Card */}
                    <div className="glass-card rounded-2xl p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Phase {phase.phase}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          phase.status === 'In Progress' ? 'bg-green-500/15 text-green-400' :
                          phase.status === 'Up Next' ? 'bg-blue-500/15 text-blue-400' :
                          'bg-zinc-500/15 text-zinc-400'
                        }`}>
                          {phase.status}
                        </span>
                        <span className="text-[11px] text-zinc-600">{phase.timeline}</span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-black text-white mb-1 font-[var(--font-heading)]">
                        {phase.title}
                      </h3>
                      <div className="text-sm text-purple-400 font-semibold mb-3">{phase.subtitle}</div>
                      <p className="text-sm text-zinc-500 leading-relaxed mb-6">{phase.description}</p>

                      {/* Milestones */}
                      <div className="grid sm:grid-cols-2 gap-2 mb-6">
                        {phase.milestones.map((m) => (
                          <div key={m.label} className="flex items-start gap-2 text-xs">
                            <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                              m.done
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-white/5 text-zinc-600'
                            }`}>
                              {m.done ? '✓' : '○'}
                            </div>
                            <span className={m.done ? 'text-zinc-300' : 'text-zinc-500'}>{m.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Highlight callout */}
                      <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl px-4 py-3">
                        <p className="text-xs text-purple-300 leading-relaxed">
                          <span className="font-bold">💡 </span>{phase.highlight}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Card Scanning Algorithm — How Dedup Works */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="section-label bg-blue-500/10 border border-blue-500/20 text-blue-300 mx-auto w-fit mb-4">
                <Shield className="w-3.5 h-3.5" />
                Fair Play System
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
                One Card. <span className="gradient-text-purple">One MohnSter.</span>
              </h2>
              <p className="text-lg text-zinc-500 max-w-xl mx-auto">
                Our card scanning algorithm ensures fairness — no duplicate farming, no unfair advantages.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '📸', title: 'Scan Any Card', desc: 'Pokémon, Yu-Gi-Oh!, MTG, sports cards — our AI identifies it instantly.' },
                { icon: '🧬', title: 'One Character Per Card', desc: 'No matter how many times you scan the same card, you only collect ONE MohnSter from it.' },
                { icon: '📋', title: 'Portfolio Tracks All', desc: 'You can add 20 Pikachu cards to your portfolio — but the MohnSter scan only registers once per account.' },
                { icon: '⚖️', title: 'Equal Starting Point', desc: 'Two players scan the same card? Same base creature. But real-world Empire activity makes the difference.' },
                { icon: '🔒', title: 'Anti-Farm Protection', desc: 'Hard limits on scan frequency, duplicate detection via AI fingerprinting, and account-level dedup.' },
                { icon: '💎', title: 'Rarity Through Action', desc: 'Rare variants come from ecosystem activity — not from scanning one card 50 times.' },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-xl p-5">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Points & Tokens System */}
      <section className="relative py-24">
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-yellow-500/5 blur-[100px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="section-label bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 mx-auto w-fit mb-4">
              <Coins className="w-3.5 h-3.5" />
              Dual Currency
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
              Points First. <span className="gradient-text-gold">Tokens Later.</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-xl mx-auto mb-12">
              Start earning points immediately. When the $MOHN token launches, convert your points at the established rate.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="glass-card rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">🎮</div>
                <h4 className="text-base font-bold text-white mb-2">Earn Points</h4>
                <p className="text-xs text-zinc-500">Scan cards, win battles, use Mohn platforms, complete daily quests, hit GPS check-in streaks.</p>
              </div>
              <div className="glass-card rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">🔄</div>
                <h4 className="text-base font-bold text-white mb-2">Spend or Convert</h4>
                <p className="text-xs text-zinc-500">Use points to open packs, level up creatures, unlock abilities — or save them for token conversion.</p>
              </div>
              <div className="glass-card rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">💰</div>
                <h4 className="text-base font-bold text-white mb-2">$MOHN Tokens</h4>
                <p className="text-xs text-zinc-500">When token launches, convert accumulated points to $MOHN. Your characters gain real, tradeable value.</p>
              </div>
            </div>

            <p className="text-xs text-zinc-600 max-w-lg mx-auto">
              Characters built up through points and activity retain their value. The more you grind, the more your portfolio is worth when tokens go live.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CTA */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 font-[var(--font-heading)]">
            Ready to <span className="gradient-text-purple">Build</span> Your Empire?
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Phase 1 is launching soon. Get in early, start scanning, and be first to hatch your MohnSter collection.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/scanner" className="btn-primary text-lg px-10 py-4 flex items-center gap-2 group">
              <ScanLine className="w-5 h-5" />
              Try the Scanner
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/empire" className="btn-outline text-lg px-8 py-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Explore the Empire
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600">
            <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Fair Play Guaranteed</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> All Ages Welcome</span>
            <span className="flex items-center gap-1"><Coins className="w-4 h-4" /> Points → $MOHN</span>
            <span className="flex items-center gap-1"><Crown className="w-4 h-4" /> 9 Platforms Connected</span>
          </div>
        </div>
      </section>
    </div>
  );
}
