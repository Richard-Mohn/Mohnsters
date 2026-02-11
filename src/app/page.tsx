'use client';

import React from 'react';
import Link from 'next/link';
import {
  ScanLine, Package, Swords, Lock, Coins, Trophy, Sparkles,
  ChevronRight, Star, TrendingUp, Shield, Zap, Users, Target,
  ArrowRight, Play, Gamepad2, Crown, Eye, Heart, Rocket,
  Globe, Clock, BookOpen, Award
} from 'lucide-react';
import { Creature3D } from '@/components/Creature3D';
import { PackStore } from '@/components/PackStore';
import { BattlePreview } from '@/components/BattlePreview';
import { VaultPreview } from '@/components/VaultPreview';


/* ─── Data ─── */

const HERO_CREATURES = [
  { name: 'Infernak', element: 'fire' as const },
  { name: 'Aquafang', element: 'water' as const },
  { name: 'Thornback', element: 'earth' as const },
  { name: 'Voltusk', element: 'lightning' as const },
  { name: 'Gloomclaw', element: 'shadow' as const },
  { name: 'Crystara', element: 'crystal' as const },
];

const STATS = [
  { value: '100M', label: 'Fixed $MOHN Supply', icon: Coins },
  { value: '6', label: 'Elements to Master', icon: Zap },
  { value: '500+', label: 'Unique MohnSters', icon: Target },
  { value: '∞', label: 'Cards Scannable', icon: ScanLine },
];

const HOW_IT_WORKS = [
  {
    step: 1, icon: ScanLine,
    title: 'Scan Your Cards',
    description: 'Use your camera to scan any physical trading card — Pokémon, Yu-Gi-Oh!, MTG, sports cards. Our AI identifies, grades, and values it instantly.',
    reward: 'Earn 10-100 $MOHN per scan',
    color: 'from-purple-500 to-violet-600',
  },
  {
    step: 2, icon: Package,
    title: 'Open MohnSter Packs',
    description: 'Spend $MOHN or USD to open packs containing unique AI-generated MohnSter creatures with randomized stats, elements, and abilities.',
    reward: '3-5 MohnSters per pack',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    step: 3, icon: Swords,
    title: 'Battle & Level Up',
    description: 'Build a team of 3 MohnSters, master element advantages, and climb the ranked leaderboard. Evolve your creatures at max level.',
    reward: 'Win 20-100 $MOHN per battle',
    color: 'from-red-500 to-orange-600',
  },
  {
    step: 4, icon: Lock,
    title: 'Vault Your Cards',
    description: 'Send physical cards to our insured vault. They earn passive $MOHN yield, appreciate in value, and power up your digital MohnSters.',
    reward: '0.5-2% monthly yield',
    color: 'from-yellow-500 to-amber-600',
  },
];

const PLATFORM_FEATURES = [
  { icon: ScanLine, title: 'AI Card Scanner', desc: 'Instant identification, grading, and valuation for Pokémon, MTG, Yu-Gi-Oh!, and sports cards using advanced computer vision.', color: 'from-purple-500 to-violet-600' },
  { icon: Gamepad2, title: 'Creature Battles', desc: 'Turn-based tactical combat with 6 elements, type advantages, team composition strategy, and ranked competitive seasons.', color: 'from-red-500 to-orange-600' },
  { icon: Lock, title: 'Secure Card Vault', desc: 'Climate-controlled, insured storage with professional grading. Your cards earn passive yield while safely stored.', color: 'from-yellow-500 to-amber-600' },
  { icon: Package, title: 'Pack System', desc: 'Four tiers of randomized packs from Common to Mythic. Transparent odds, pity system, and guaranteed rares at higher tiers.', color: 'from-blue-500 to-indigo-600' },
  { icon: TrendingUp, title: 'Level & Evolve', desc: 'Your MohnSters gain XP from battles, quests, and vault boosts. Max-level creatures can evolve into powerful new forms.', color: 'from-green-500 to-emerald-600' },
  { icon: Crown, title: 'Season Pass', desc: 'Free and premium reward tracks with 50 tiers of exclusive MohnSters, cosmetics, packs, and $MOHN over 90-day seasons.', color: 'from-pink-500 to-rose-600' },
  { icon: Target, title: 'Daily Quests', desc: 'Three refreshing daily objectives that reward $MOHN and XP. Complete all three for a streak bonus that multiplies rewards.', color: 'from-cyan-500 to-teal-600' },
  { icon: Trophy, title: 'Tournaments', desc: 'Weekly 16-player brackets with massive $MOHN prize pools. Single elimination format with spectator mode and replays.', color: 'from-amber-500 to-orange-600' },
];

const EARN_METHODS = [
  { action: 'Scan a card', amount: '10-100', icon: '📸' },
  { action: 'Win Quick Battle', amount: '5-20', icon: '⚔️' },
  { action: 'Win Ranked Battle', amount: '20-100', icon: '🏆' },
  { action: 'Daily Login Streak', amount: '5-50', icon: '📅' },
  { action: 'Complete Quests', amount: '30-120', icon: '🎯' },
  { action: 'Tournament Prize', amount: '500-10K', icon: '🥇' },
  { action: 'Vault Yield (monthly)', amount: '0.5-2%', icon: '🔒' },
  { action: 'Referral Bonus', amount: '100', icon: '👥' },
];

const AUDIENCE_CARDS = [
  {
    title: 'For Collectors',
    icon: Eye,
    desc: 'Scan your physical cards to reveal hidden value, track your portfolio, and earn crypto rewards just for owning them.',
    features: ['AI card identification', 'Portfolio tracking', 'Vault for appreciating assets'],
    color: 'from-purple-500 to-violet-600',
  },
  {
    title: 'For Gamers',
    icon: Gamepad2,
    desc: 'Build the ultimate creature team, compete in ranked seasons, and earn real rewards from your gaming skills.',
    features: ['Strategic team building', 'Ranked competitive play', 'Weekly tournaments'],
    color: 'from-red-500 to-orange-600',
  },
  {
    title: 'For Families',
    icon: Heart,
    desc: 'A safe, fun experience for all ages with kid-safe mode, parental controls, and educational content about collecting.',
    features: ['Kid-safe mode', 'Parental spending controls', 'Fun for ages 8+'],
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'For Investors',
    icon: TrendingUp,
    desc: 'Vault high-value cards, earn passive yield, and build a diversified collectibles portfolio that grows over time.',
    features: ['0.5-2% monthly yield', 'Professional grading', 'Insurance included'],
    color: 'from-yellow-500 to-amber-600',
  },
];

const TRUST_ITEMS = [
  { icon: Shield, label: 'Insured Vault', desc: 'Up to $100K coverage' },
  { icon: Lock, label: 'Bank-Level Security', desc: '256-bit encryption' },
  { icon: Users, label: 'Kid-Safe Mode', desc: 'Parental controls built in' },
  { icon: Globe, label: 'Cross-Platform', desc: 'Web, iOS, Android' },
  { icon: Clock, label: '24/7 Support', desc: 'Real humans, always' },
  { icon: Award, label: '$MOHN Backed', desc: 'Real utility token' },
];

export default function Home() {
  return (
    <div className="relative">

      {/* ═══════════════════════════════════════════
          HERO SECTION — 3D Creatures
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">


        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center py-24">
          {/* Top badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-purple-300">Part of the Mohn Empire &bull; Powered by $MOHN</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] mb-6 font-[var(--font-heading)]">
            <span className="text-white">M</span>
            <span className="gradient-text-purple">o</span>
            <span className="text-white">hn</span>
            <span className="gradient-text-fire">St</span>
            <span className="gradient-text-purple">e</span>
            <span className="text-white">rs</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-zinc-400 font-light max-w-3xl mx-auto mb-4">
            Scan Cards. Hatch Creatures. Battle &amp; Earn.
          </p>
          <p className="text-base md:text-lg text-zinc-500 max-w-2xl mx-auto mb-12">
            The ultimate collectible card game ecosystem. Scan physical trading cards to generate AI-powered creatures, battle friends, vault cards as appreciating assets, and earn <span className="text-yellow-400 font-bold">$MOHN</span> tokens across the Mohn Empire.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="btn-primary text-lg px-10 py-4 flex items-center gap-2 group">
              <Play className="w-5 h-5" />
              Start Playing Free
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link href="/how-it-works" className="btn-outline text-lg px-8 py-4 flex items-center gap-2">
              How It Works
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* 3D Creature Showcase — 6 creatures in a balanced row */}
          <div className="flex flex-wrap items-end justify-center gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {HERO_CREATURES.map((creature, i) => (
              <div
                key={creature.name}
                className="flex flex-col items-center"
                style={{
                  transform: `translateY(${i % 2 === 0 ? '-36px' : '-48px'})`,
                }}
              >
                <Creature3D
                  name={creature.name}
                  element={creature.element}
                  size={i === 2 || i === 3 ? 'lg' : 'md'}
                  autoAnimate
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════ */}
      <section className="relative z-10 py-8 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-black gradient-text-purple">{stat.value}</div>
                <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS — 4 Steps (balanced grid)
      ═══════════════════════════════════════════ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="section-label bg-purple-500/10 border border-purple-500/20 text-purple-300 mx-auto w-fit mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              Getting Started
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              How It <span className="gradient-text-purple">Works</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Four simple steps from your card binder to earning real crypto rewards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="glass-card rounded-2xl p-6 relative group">
                <div className="absolute -top-3 -left-1 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-purple-500/30">
                  {step.step}
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-500 mb-4 leading-relaxed">{step.description}</p>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 w-fit">
                  <Coins className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-400">{step.reward}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          PLATFORM FEATURES — 8 items, 4-col grid
      ═══════════════════════════════════════════ */}
      <section className="relative py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-label bg-blue-500/10 border border-blue-500/20 text-blue-300 mx-auto w-fit mb-4">
              <Rocket className="w-3.5 h-3.5" />
              Platform Features
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Everything You Need to <span className="gradient-text-purple">Dominate</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              A complete ecosystem built for collectors, gamers, and investors alike
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {PLATFORM_FEATURES.map((feature) => (
              <div key={feature.title} className="glass-card rounded-2xl p-6 group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          3D CREATURES SHOWCASE STRIP
      ═══════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Meet the <span className="gradient-text-rainbow">MohnSters</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Six elements. Hundreds of unique creatures. Each one living, breathing, and ready for battle.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {HERO_CREATURES.map((creature) => (
              <div key={`showcase-${creature.name}`} className="flex flex-col items-center group">
                <Creature3D name={creature.name} element={creature.element} size="lg" autoAnimate />
                <div className="mt-2 text-center">
                  <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">{creature.name}</div>
                  <div className="text-[10px] text-zinc-600 capitalize">{creature.element}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          PACK STORE PREVIEW
      ═══════════════════════════════════════════ */}
      <section className="relative py-24">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-label bg-blue-500/10 border border-blue-500/20 text-blue-300 mx-auto w-fit mb-4">
              <Package className="w-3.5 h-3.5" />
              Pack Store
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Open <span className="gradient-text-purple">Packs</span>, Discover MohnSters
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Spend $MOHN or USD to open packs with randomized creatures. Higher tier packs mean rarer MohnSters with better stats.
            </p>
          </div>
          <PackStore />
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          BATTLE SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative py-24">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-red-500/5 blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-label bg-red-500/10 border border-red-500/20 text-red-300 mx-auto w-fit mb-4">
              <Swords className="w-3.5 h-3.5" />
              Battle Arena
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Build Your Team. <span className="gradient-text-fire">Dominate.</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Pick 3 MohnSters, master element advantages, and climb the ranked leaderboard. Win battles, earn $MOHN, and prove your dominance.
            </p>
          </div>

          <BattlePreview />

          {/* Battle modes — 3 items, balanced */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
            {[
              { name: 'Quick Battle', desc: 'Casual 1v1, instant matchmaking', icon: '⚔️', reward: '5-20 $MOHN' },
              { name: 'Ranked', desc: 'Competitive seasons, ELO rating', icon: '🏆', reward: '20-100 $MOHN' },
              { name: 'Tournaments', desc: 'Weekly events, massive prize pools', icon: '🥇', reward: 'Up to 10K $MOHN' },
            ].map((mode) => (
              <div key={mode.name} className="glass-card rounded-xl p-4 text-center">
                <span className="text-2xl mb-2 block">{mode.icon}</span>
                <h4 className="text-sm font-bold text-white mb-1">{mode.name}</h4>
                <p className="text-xs text-zinc-500 mb-2">{mode.desc}</p>
                <span className="text-xs font-bold text-yellow-400">{mode.reward}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          VAULT SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative py-24">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-yellow-500/5 blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-label bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 mx-auto w-fit mb-4">
              <Lock className="w-3.5 h-3.5" />
              The Vault
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Your Cards. <span className="gradient-text-gold">Growing Value.</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Send physical cards to our insured, climate-controlled vault. They earn passive $MOHN yield and power up your digital MohnSters.
            </p>
          </div>

          <VaultPreview />

          {/* Vault steps — 4 items, balanced grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto">
            {[
              { emoji: '📦', title: 'Ship Your Card', desc: 'Mail your card to our vault. We provide prepaid labels and tracking.' },
              { emoji: '🔍', title: 'Grade & Store', desc: 'We professionally grade, photograph, and store your card securely.' },
              { emoji: '📈', title: 'Earn Yield', desc: 'Your card generates 0.5-2% monthly $MOHN yield while appreciating.' },
              { emoji: '🔄', title: 'Withdraw Anytime', desc: 'Pay a 10% $MOHN fee and we ship it back insured in 5-7 days.' },
            ].map((step) => (
              <div key={step.title} className="glass-card rounded-xl p-5 text-center">
                <div className="text-3xl mb-3">{step.emoji}</div>
                <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
                <p className="text-xs text-zinc-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          WHO IT'S FOR — 4 audience cards, balanced
      ═══════════════════════════════════════════ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-label bg-green-500/10 border border-green-500/20 text-green-300 mx-auto w-fit mb-4">
              <Users className="w-3.5 h-3.5" />
              For Everyone
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Built for <span className="gradient-text-purple">Everyone</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Whether you&apos;re 8 or 80, casual or competitive — MohnSters has something for you
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {AUDIENCE_CARDS.map((card) => (
              <div key={card.title} className="glass-card rounded-2xl p-6 group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-zinc-500 mb-4 leading-relaxed">{card.desc}</p>
                <ul className="space-y-1.5">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          $MOHN ECONOMY — 8 earn methods, balanced
      ═══════════════════════════════════════════ */}
      <section className="relative py-24">
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-yellow-500/5 blur-[100px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-label bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 mx-auto w-fit mb-4">
              <Coins className="w-3.5 h-3.5" />
              $MOHN Economy
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Earn <span className="gradient-text-gold">$MOHN</span> Everywhere
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              $MOHN is the utility token powering the entire Mohn ecosystem. Earn it in MohnSters, spend it across 9 platforms.
            </p>
          </div>

          {/* 8 items = 4+4 balanced grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
            {EARN_METHODS.map((method) => (
              <div key={method.action} className="flex items-center gap-3 glass-card rounded-xl p-4">
                <span className="text-2xl shrink-0">{method.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{method.action}</div>
                  <div className="text-xs text-zinc-500">Earn $MOHN</div>
                </div>
                <div className="text-sm font-black gradient-text-gold shrink-0">{method.amount}</div>
              </div>
            ))}
          </div>

          {/* Mohn Empire callout */}
          <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto text-center glow-gold">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-2xl font-black text-white mb-2">Part of the Mohn Empire</h3>
            <p className="text-sm text-zinc-400 mb-6 max-w-xl mx-auto">
              $MOHN earned in MohnSters works across all Mohn platforms — NeighborTechs, MohnMatrix, Flaming Social, MohnMint, MohnMenu, MohnServe, MohnPay, and MohnMove. One token, infinite possibilities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/empire"
                className="btn-gold text-sm px-6 py-3 inline-flex items-center gap-2"
              >
                <Coins className="w-4 h-4" />
                Explore the Empire
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/investors"
                className="btn-outline text-sm px-6 py-3 inline-flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Investor Overview
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          EMPIRE REWARDS — Cross-Platform Bonuses
      ═══════════════════════════════════════════ */}
      <section className="relative py-24">
        <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-label bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 mx-auto w-fit mb-4">
              <Crown className="w-3.5 h-3.5" />
              Empire Rewards
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Play the Game. <span className="gradient-text-gold">Live the Empire.</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Your MohnSters grow stronger when you use any Mohn platform. Real-world actions unlock rare abilities, evolution paths, and bonus rewards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-12">
            {[
              { platform: 'MohnMenu', action: 'Order $50+ in food', reward: 'Character XP boost + rare item drop', icon: '🍔', color: 'from-orange-500 to-red-600' },
              { platform: 'NeighborTechs', action: 'Complete an IT job', reward: 'Unlock Tech-type abilities', icon: '🔧', color: 'from-indigo-500 to-blue-600' },
              { platform: 'MohnServe', action: 'Complete a legal serve', reward: 'Justice achievement + 50 bonus $MOHN', icon: '⚖️', color: 'from-amber-500 to-yellow-600' },
              { platform: 'MohnPay', action: 'Run a mining node', reward: 'Passive $MOHN generation', icon: '⚡', color: 'from-cyan-500 to-teal-600' },
              { platform: 'Flaming Social', action: 'Post & engage daily', reward: 'Social streak multiplier', icon: '🔥', color: 'from-red-500 to-pink-600' },
              { platform: 'GPS Check-In', action: '30-day streak at a location', reward: 'Legendary evolution unlock', icon: '📍', color: 'from-green-500 to-emerald-600' },
            ].map((item) => (
              <div key={item.platform} className="glass-card rounded-2xl p-5 group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-xl`}>
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">{item.platform}</div>
                <h4 className="text-sm font-bold text-white mb-1">{item.action}</h4>
                <p className="text-xs text-zinc-500">{item.reward}</p>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-6 max-w-3xl mx-auto text-center">
            <div className="text-3xl mb-3">🧬</div>
            <h3 className="text-xl font-black text-white mb-2">Cross-Platform Evolution</h3>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto mb-4">
              Characters evolve based on your activity across the Mohn Empire. The more platforms you use, the stronger and rarer your MohnSters become. Two players scan the same card — but the one who orders food, completes jobs, and stays active gets the evolved, powered-up version.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400" /> Activity-Based</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-400" /> Fair for Everyone</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400" /> Points → Tokens</span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          GAMIFICATION — 3 items, balanced row
      ═══════════════════════════════════════════ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-label bg-pink-500/10 border border-pink-500/20 text-pink-300 mx-auto w-fit mb-4">
              <Star className="w-3.5 h-3.5" />
              Gamification
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              More Than a Game. <span className="gradient-text-rainbow">An Obsession.</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Daily quests, achievements, season passes, and leaderboards keep you coming back
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Daily Quests */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Daily Quests</h3>
              </div>
              <div className="space-y-3">
                {[
                  { quest: 'Scan 3 cards', reward: '30 $MOHN', progress: 67 },
                  { quest: 'Win 2 battles', reward: '40 $MOHN', progress: 50 },
                  { quest: 'Login streak (Day 7)', reward: '50 $MOHN', progress: 100 },
                ].map((q) => (
                  <div key={q.quest} className="bg-white/[0.02] rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-zinc-300">{q.quest}</span>
                      <span className="text-xs font-bold text-yellow-400">{q.reward}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                        style={{ width: `${q.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Achievements</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: '🏆', name: 'First Win', unlocked: true },
                  { icon: '📸', name: 'Card Scanner', unlocked: true },
                  { icon: '⚔️', name: '10 Win Streak', unlocked: false },
                  { icon: '🔒', name: 'Vault Master', unlocked: false },
                  { icon: '💰', name: '1K $MOHN', unlocked: true },
                  { icon: '🌟', name: 'Mythic Pull', unlocked: false },
                ].map((a) => (
                  <div
                    key={a.name}
                    className={`text-center p-2 rounded-lg ${
                      a.unlocked ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-white/[0.02] border border-white/5 opacity-50'
                    }`}
                  >
                    <span className="text-xl block mb-1">{a.icon}</span>
                    <span className="text-[10px] text-zinc-400">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Season Pass */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Season Pass</h3>
              </div>
              <div className="text-center py-3">
                <div className="text-xs text-purple-400 font-bold uppercase mb-2">Season 1 &bull; 90 Days</div>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[1,2,3,4,5].map((tier) => (
                    <div
                      key={tier}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                        tier <= 3
                          ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300'
                          : 'bg-white/5 border border-white/10 text-zinc-600'
                      }`}
                    >
                      {tier <= 3 ? '✓' : tier}
                    </div>
                  ))}
                  <span className="text-xs text-zinc-500 ml-2">...50</span>
                </div>
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-green-400">FREE</span>
                    <span className="text-zinc-400">$MOHN, Common Packs</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-yellow-400 font-bold">PREMIUM</span>
                    <span className="text-zinc-400">Exclusive MohnSters, Rare Packs</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-xs text-zinc-500">Premium: $9.99/season</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          TRUST & SECURITY — 6 items, balanced
      ═══════════════════════════════════════════ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Trusted &amp; <span className="gradient-text-purple">Secure</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Built with enterprise-grade security and transparency at every layer
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {TRUST_ITEMS.map((item) => (
              <div key={item.label} className="glass-card rounded-xl p-4 text-center">
                <item.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-xs font-bold text-white mb-0.5">{item.label}</div>
                <div className="text-[10px] text-zinc-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          GROWTH ANALYSIS + INVESTOR TEASER
      ═══════════════════════════════════════════ */}
      <section className="relative py-24">
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-green-500/5 blur-[100px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
            {/* Left — Growth analysis */}
            <div>
              <div className="section-label bg-green-500/10 border border-green-500/20 text-green-300 w-fit mb-4">
                <TrendingUp className="w-3.5 h-3.5" />
                Growth Analysis
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
                Why Your MohnSters Could <span className="gradient-text-gold">Grow in Value</span>
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                We don&apos;t make promises — but we&apos;re transparent about the mechanics. As the Mohn Empire grows across 9 platforms, more users compete for a fixed, deflationary $MOHN supply. Every transaction burns 5%. More platforms live = more demand, less supply. Your creatures and tokens sit at the center of this ecosystem.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  'Fixed 100M supply — no new tokens can ever be minted',
                  '5% deflationary burn on every $MOHN transaction',
                  'Backed by real businesses generating real revenue',
                  '9 platforms driving organic token demand',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2 text-sm text-zinc-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
              <Link
                href="/empire"
                className="btn-primary text-sm px-6 py-3 inline-flex items-center gap-2 group"
              >
                Read the Full Analysis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right — Investor card */}
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">For Investors &amp; Partners</h3>
                  <p className="text-xs text-zinc-500">Institutional-grade overview</p>
                </div>
              </div>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                The Mohn Empire sits at the intersection of a $35.9B trading card market, $16.8B play-to-earn gaming sector, and $455B gig economy. We welcome conversations with investors and strategic partners.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: 'Market Opp.', value: '$35.9B+' },
                  { label: 'Revenue Streams', value: '45+' },
                  { label: 'Platforms', value: '9' },
                  { label: 'Token Model', value: 'Deflationary' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/[0.02] rounded-lg p-3 text-center">
                    <div className="text-lg font-black gradient-text-purple">{stat.value}</div>
                    <div className="text-[10px] text-zinc-500">{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link
                href="/investors"
                className="btn-gold w-full text-sm py-3 flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Investor Relations
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════ */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          {/* Floating creatures around CTA */}
          <div className="flex justify-center gap-8 mb-8 opacity-60">
            <Creature3D name="" element="fire" size="sm" autoAnimate />
            <Creature3D name="" element="shadow" size="sm" autoAnimate />
            <Creature3D name="" element="crystal" size="sm" autoAnimate />
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 font-[var(--font-heading)]">
            Ready to <span className="gradient-text-purple">Catch</span> &apos;Em All?
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Join thousands of collectors earning $MOHN while building the ultimate MohnSter collection. Free to start, rewarding to master.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button className="btn-primary text-lg px-12 py-5 flex items-center gap-3 group">
              <Swords className="w-6 h-6" />
              Start Playing Free
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-gold text-lg px-10 py-5 flex items-center gap-2">
              <Coins className="w-5 h-5" />
              Buy $MOHN Packs
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600">
            <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Insured Vault</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Kid-Safe Mode</span>
            <span className="flex items-center gap-1"><Coins className="w-4 h-4" /> $MOHN Powered</span>
            <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> Cross-Platform</span>
          </div>
        </div>
      </section>
    </div>
  );
}
