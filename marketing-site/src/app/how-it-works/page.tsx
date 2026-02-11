import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ScanLine, Package, Swords, Lock, Coins, ChevronRight,
  Camera, Sparkles, BarChart3, TrendingUp, ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how MohnSters works: scan physical cards, open packs, battle creatures, vault cards, and earn $MOHN tokens.',
};

const STEPS = [
  {
    step: 1,
    icon: ScanLine,
    title: 'Scan Any Physical Card',
    subtitle: 'Pokémon, Yu-Gi-Oh!, MTG, Sports — everything',
    description: 'Point your camera at any physical trading card. Our AI-powered scanner instantly identifies the card, grades its condition, estimates its market value, and adds it to your digital binder.',
    details: [
      'AI card recognition across all major TCGs',
      'Automatic condition grading (Near Mint to Heavily Played)',
      'Real-time market value estimation',
      'Card added to your searchable digital binder',
    ],
    reward: '10-100 $MOHN per scan (based on rarity & value)',
    color: 'from-purple-500 to-violet-600',
    bgGlow: 'bg-purple-500/10',
    visual: '📸',
  },
  {
    step: 2,
    icon: Package,
    title: 'Open MohnSter Packs',
    subtitle: 'Spend $MOHN or USD — your choice',
    description: 'Use earned $MOHN tokens (or buy with Stripe) to open digital packs. Each pack contains 3-5 unique AI-generated MohnSter creatures with randomized stats, elements, and abilities.',
    details: [
      '4 pack tiers: Common, Rare, Legendary, Mythic',
      'Holographic reveal animations for each creature',
      '6 elements: Fire 🔥 Water 💧 Earth 🌿 Lightning ⚡ Shadow 🌑 Crystal 💎',
      'Pity system: guaranteed rare every 10 packs',
    ],
    reward: '3-5 unique MohnSters per pack',
    color: 'from-blue-500 to-indigo-600',
    bgGlow: 'bg-blue-500/10',
    visual: '🎁',
  },
  {
    step: 3,
    icon: Swords,
    title: 'Battle & Level Up',
    subtitle: 'Turn-based strategy with real rewards',
    description: 'Build your team of 3 MohnSters and enter the arena. Master element advantages, level up your creatures, and evolve them into stronger forms. Every win earns $MOHN.',
    details: [
      'Quick Battle, Ranked, and Tournament modes',
      'Element advantage system (Fire > Earth > Lightning > Water > Fire)',
      'Level up with XP from battles or $MOHN feeding',
      'Evolve at max level for massive stat boosts',
    ],
    reward: '5-100 $MOHN per battle win',
    color: 'from-red-500 to-orange-600',
    bgGlow: 'bg-red-500/10',
    visual: '⚔️',
  },
  {
    step: 4,
    icon: Lock,
    title: 'Vault Your Cards',
    subtitle: 'Physical cards → appreciating digital assets',
    description: 'Send your valuable physical cards to our insured, climate-controlled vault. While vaulted, cards earn passive $MOHN yield and give your digital MohnSters a +20% stat boost.',
    details: [
      'Professional grading and secure storage',
      'Passive income: 0.5-2% monthly $MOHN yield',
      'Card value tracked with live market data',
      'Withdraw anytime (10% $MOHN fee)',
    ],
    reward: '0.5-2% monthly passive yield on card value',
    color: 'from-yellow-500 to-amber-600',
    bgGlow: 'bg-yellow-500/10',
    visual: '🏦',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute top-20 left-1/3 w-96 h-96 rounded-full bg-purple-500/8 blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-purple-300">From card binder to crypto rewards in 4 steps</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-[var(--font-heading)]">
            How <span className="gradient-text-purple">MohnSters</span> Works
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Whether you&apos;re 8 or 80, if you have a card collection, you can start earning. Here&apos;s the game loop that makes it all work.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6 space-y-24">
          {STEPS.map((step, i) => (
            <div
              key={step.step}
              className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Content side */}
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${step.color} bg-opacity-10 mb-4`}>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-black text-white">
                    {step.step}
                  </span>
                  <span className="text-sm font-bold text-white/90">{step.subtitle}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{step.title}</h2>
                <p className="text-zinc-400 mb-6 leading-relaxed">{step.description}</p>

                <ul className="space-y-3 mb-6">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="text-purple-400 mt-1">✦</span>
                      {detail}
                    </li>
                  ))}
                </ul>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-bold text-yellow-400">{step.reward}</span>
                </div>
              </div>

              {/* Visual side */}
              <div className={`relative ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className={`absolute inset-0 ${step.bgGlow} rounded-3xl blur-3xl`} />
                <div className="glass-card rounded-3xl p-12 flex items-center justify-center min-h-[300px] relative">
                  <span className="text-[120px] animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                    {step.visual}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-[var(--font-heading)]">
            Ready to Start <span className="gradient-text-gold">Earning</span>?
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-8">
            It&apos;s free to sign up and start scanning. Your first scan earns you $MOHN instantly.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="btn-primary text-lg px-10 py-4 flex items-center gap-2">
              Start Playing <ChevronRight className="w-5 h-5" />
            </button>
            <Link href="/packs" className="btn-outline text-lg px-8 py-4 flex items-center gap-2">
              View Packs <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
