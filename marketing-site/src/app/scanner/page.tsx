import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ScanLine, Camera, Zap, Coins, Shield, TrendingUp,
  ArrowRight, CheckCircle2, Crown, Star, Lock, Users,
  Smartphone, Monitor, Cpu, ChevronRight, BarChart3,
  Package, Eye, Gamepad2, Award, Globe, Clock
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Card Scanner — Instant Card ID, Grading & Pricing',
  description: 'The fastest AI-powered trading card scanner. Scan Pokémon, Yu-Gi-Oh!, MTG, sports cards & more. 100 free scans. Portfolio tracking, pricing, and grading in seconds.',
};

/* ─── Data ─── */

const STATS = [
  { value: '100', label: 'Free Scans', icon: Camera },
  { value: '<1s', label: 'Scan Speed', icon: Zap },
  { value: '8+', label: 'Card Categories', icon: Globe },
  { value: '$0.99', label: 'Pro Monthly', icon: Star },
];

const SUPPORTED_CATEGORIES = [
  { name: 'Pokémon TCG', icon: '⚡', cards: '15,000+', color: 'from-yellow-500 to-amber-600' },
  { name: 'Magic: The Gathering', icon: '🔮', cards: '70,000+', color: 'from-blue-500 to-indigo-600' },
  { name: "Yu-Gi-Oh!", icon: '🌀', cards: '12,000+', color: 'from-purple-500 to-violet-600' },
  { name: 'Sports Cards', icon: '⚾', cards: '50,000+', color: 'from-green-500 to-emerald-600' },
  { name: 'One Piece', icon: '🏴‍☠️', cards: '3,000+', color: 'from-red-500 to-orange-600' },
  { name: 'Dragon Ball Super', icon: '🐉', cards: '4,000+', color: 'from-orange-500 to-red-600' },
  { name: 'Coins & Currency', icon: '🪙', cards: '10,000+', color: 'from-yellow-500 to-amber-600' },
  { name: 'Comics', icon: '💥', cards: '50,000+', color: 'from-pink-500 to-rose-600' },
];

const HOW_IT_WORKS = [
  {
    step: 1, icon: Camera,
    title: 'Point & Scan',
    desc: 'Open the scanner, point your camera at any card. Our AI detects the card edge and auto-captures — no button press needed.',
  },
  {
    step: 2, icon: Zap,
    title: 'Instant Match',
    desc: 'In under 1 second, we identify the card name, set, number, rarity, and edition. See your card matched against our database image.',
  },
  {
    step: 3, icon: TrendingUp,
    title: 'See the Value',
    desc: 'Get real-time market pricing across Raw, PSA, BGS, and CGC conditions. See low, mid, and high values from recent sales.',
  },
  {
    step: 4, icon: BarChart3,
    title: 'Track in Portfolio',
    desc: 'Add to your portfolio with one tap. Track total collection value, market movers, and see which cards are hot right now.',
  },
];

const COMPARISON = [
  { feature: 'Free Scans', ours: '100', collector: '25', tcgplayer: '∞ (no pricing)', dragon: '∞ (MTG only)' },
  { feature: 'Auto-Detect', ours: '✓ Instant', collector: 'Slow', tcgplayer: 'Broken', dragon: '✗' },
  { feature: 'Multi-Category', ours: '8+ types', collector: 'TCG only', tcgplayer: 'TCG only', dragon: 'MTG only' },
  { feature: 'Portfolio Charts', ours: '5yr (Pro)', collector: 'Pro only', tcgplayer: '✗', dragon: 'Basic' },
  { feature: 'Social + Trading', ours: '✓ Built-in', collector: 'Basic', tcgplayer: '✗', dragon: '✗' },
  { feature: 'Hardware Scanner', ours: '✓ ESP32', collector: '✗', tcgplayer: '✗', dragon: '✗' },
  { feature: 'NFT Conversion', ours: '✓ Vault', collector: '✗', tcgplayer: '✗', dragon: '✗' },
  { feature: 'Creature Game', ours: '✓ Arena', collector: '✗', tcgplayer: '✗', dragon: '✗' },
  { feature: 'Pro Price', ours: '$0.99/mo', collector: '$7.99/mo', tcgplayer: 'N/A', dragon: 'N/A' },
];

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    color: 'from-zinc-600 to-zinc-700',
    features: [
      '100 free scans',
      '1 portfolio collection',
      'Basic search & browse',
      'Real-time pricing',
      '1-year value chart',
      'Community access',
    ],
    cta: 'Start Scanning Free',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$0.99',
    period: '/month',
    color: 'from-purple-500 to-violet-600',
    features: [
      'Unlimited scans',
      'Unlimited portfolios',
      'Export CSV / PDF',
      '5-year value charts',
      'P&L tracking',
      'Custom themes',
      'Priority AI matching',
      'Ad-free experience',
    ],
    cta: 'Go Pro',
    featured: true,
  },
  {
    name: 'Dealer',
    price: '$4.99',
    period: '/month',
    color: 'from-yellow-500 to-amber-600',
    features: [
      'Everything in Pro',
      'Bulk scan mode',
      'Inventory management',
      'Label printing',
      'Sales analytics',
      'Featured shop listing',
      'Priority support',
      'API access (1K/day)',
    ],
    cta: 'Start Dealing',
    featured: false,
  },
];

const CAMERA_SOURCES = [
  { icon: Smartphone, name: 'Phone Camera', desc: 'Default — use your phone\'s rear camera for instant scanning on the go.', status: 'Available' },
  { icon: Monitor, name: 'Webcam', desc: 'Use your desktop or laptop webcam for scanning at your desk.', status: 'Available' },
  { icon: Cpu, name: 'ESP32 Auto-Scanner', desc: 'Connect our open-source hardware scanner for hands-free bulk scanning.', status: 'Coming Soon' },
];

export default function ScannerPage() {
  return (
    <div className="relative">
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32">
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-purple-500/8 blur-[120px]" />
        <div className="absolute bottom-10 right-1/3 w-80 h-80 rounded-full bg-blue-500/6 blur-[100px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <ScanLine className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-purple-300">The fastest card scanner on the planet</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 font-[var(--font-heading)]">
            Scan. <span className="gradient-text">Identify.</span> Value.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-4">
            Point your camera at any trading card. Our AI identifies it in{' '}
            <span className="text-white font-semibold">under 1 second</span> — name, set, rarity, and{' '}
            <span className="text-green-400 font-bold">real-time market value</span>.
          </p>
          <p className="text-base text-zinc-500 max-w-2xl mx-auto mb-10">
            100 free scans. No credit card required. Pokémon, MTG, Yu-Gi-Oh!, sports cards, coins, comics & more.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
            {STATS.map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-4 text-center">
                <s.icon className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs text-zinc-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/purchase" className="btn-primary text-base px-8 py-4 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Launch Scanner
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#comparison" className="btn-outline text-base px-8 py-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              See How We Compare
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SCANNER PREVIEW MOCKUP ═══ */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Fake viewfinder */}
                <div className="relative aspect-[3/4] bg-black/60 rounded-2xl border-2 border-purple-500/30 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-8 border-2 border-dashed border-purple-400/40 rounded-xl" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs text-red-400 font-mono">SCANNING</span>
                  </div>
                  <div className="text-center z-10">
                    <ScanLine className="w-16 h-16 text-purple-400/60 mx-auto mb-4 animate-pulse" />
                    <p className="text-sm text-zinc-400">Position card in frame</p>
                    <p className="text-xs text-zinc-600 mt-1">Auto-captures when detected</p>
                  </div>
                  {/* Corner markers */}
                  <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-purple-400" />
                  <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-purple-400" />
                  <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-purple-400" />
                  <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-purple-400" />
                </div>
                {/* Match result */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-bold">MATCH FOUND — 99.7% confidence</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">Charizard VSTAR</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-bold">Brilliant Stars</span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold">#174/172</span>
                    <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-bold">Secret Rare</span>
                  </div>
                  <div className="glass-card rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-400">Raw</span>
                      <span className="text-lg font-black text-green-400">$45.99</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-400">PSA 10</span>
                      <span className="text-lg font-black text-blue-400">$189.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-400">BGS 9.5</span>
                      <span className="text-lg font-black text-purple-400">$165.00</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span>+12.4% last 30 days</span>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                    Add to Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="section-label bg-blue-500/10 border border-blue-500/20 text-blue-300 mx-auto w-fit mb-4">
              <Zap className="w-3.5 h-3.5" />
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Four Steps to <span className="gradient-text">Instant Value</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="glass-card rounded-2xl p-6 text-center relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-xs font-black text-white shadow-lg">
                  {step.step}
                </div>
                <step.icon className="w-10 h-10 mx-auto mb-4 text-purple-400" />
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ SUPPORTED CATEGORIES ═══ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="section-label bg-green-500/10 border border-green-500/20 text-green-300 mx-auto w-fit mb-4">
              <Globe className="w-3.5 h-3.5" />
              Universal Scanner
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Every Card. <span className="gradient-text-gold">Every Category.</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Not just trading cards. We scan coins, comics, and collectibles — all in one app.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {SUPPORTED_CATEGORIES.map((cat) => (
              <div key={cat.name} className="glass-card rounded-2xl p-5 text-center hover:scale-105 transition-transform cursor-default">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="text-sm font-bold text-white mb-1">{cat.name}</h3>
                <p className="text-xs text-zinc-500">{cat.cards} cards</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ COMPARISON TABLE ═══ */}
      <section id="comparison" className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="section-label bg-red-500/10 border border-red-500/20 text-red-300 mx-auto w-fit mb-4">
              <Award className="w-3.5 h-3.5" />
              The Competition
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Why MohnSters <span className="gradient-text">Wins</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              More free scans. Faster AI. Better pricing. And features nobody else has.
            </p>
          </div>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 text-sm text-zinc-400 font-medium border-b border-white/10">Feature</th>
                  <th className="p-4 text-sm font-bold text-purple-400 border-b border-purple-500/30 bg-purple-500/5">MohnSters</th>
                  <th className="p-4 text-sm text-zinc-500 font-medium border-b border-white/10">Collector</th>
                  <th className="p-4 text-sm text-zinc-500 font-medium border-b border-white/10">TCGplayer</th>
                  <th className="p-4 text-sm text-zinc-500 font-medium border-b border-white/10">Dragon Shield</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="hover:bg-white/[0.02]">
                    <td className="p-4 text-sm text-zinc-300 font-medium border-b border-white/5">{row.feature}</td>
                    <td className="p-4 text-sm text-center font-bold text-purple-300 border-b border-purple-500/10 bg-purple-500/5">{row.ours}</td>
                    <td className="p-4 text-sm text-center text-zinc-500 border-b border-white/5">{row.collector}</td>
                    <td className="p-4 text-sm text-center text-zinc-500 border-b border-white/5">{row.tcgplayer}</td>
                    <td className="p-4 text-sm text-center text-zinc-500 border-b border-white/5">{row.dragon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ CAMERA SOURCES ═══ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="section-label bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 mx-auto w-fit mb-4">
              <Camera className="w-3.5 h-3.5" />
              Multiple Camera Sources
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Scan Your Way
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {CAMERA_SOURCES.map((cam) => (
              <div key={cam.name} className="glass-card rounded-2xl p-6 text-center">
                <cam.icon className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                <h3 className="text-lg font-bold text-white mb-2">{cam.name}</h3>
                <p className="text-sm text-zinc-400 mb-3">{cam.desc}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${cam.status === 'Available' ? 'bg-green-500/10 border border-green-500/20 text-green-300' : 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-300'}`}>
                  {cam.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ PRICING ═══ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="section-label bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 mx-auto w-fit mb-4">
              <Coins className="w-3.5 h-3.5" />
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Priced to <span className="gradient-text-gold">Dominate</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Collector charges $7.99/mo. We charge $0.99/mo. And we give you 4x the free scans.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PRICING.map((plan) => (
              <div key={plan.name} className={`glass-card rounded-2xl p-6 relative ${plan.featured ? 'ring-2 ring-purple-500/50 bg-purple-500/5' : ''}`}>
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 text-xs font-black text-white">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-center mb-6 pt-2">
                  <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-sm text-zinc-500">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.featured ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:shadow-lg hover:shadow-purple-500/25' : 'bg-white/5 text-zinc-300 hover:bg-white/10'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ ESP32 TEASER ═══ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold mb-4">
                  <Cpu className="w-3.5 h-3.5" />
                  COMING SOON
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
                  The MohnSters <span className="text-cyan-400">Auto-Scanner</span>
                </h3>
                <p className="text-zinc-400 mb-4">
                  An open-source hardware scanning station powered by ESP32-CAM. Load a stack of cards, hit start, and watch them get scanned automatically — hands-free.
                </p>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> WiFi — connects directly to the app</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Motorized card feeder</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> OTA firmware updates via app</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> Open-source — 3D print your own</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> $15-25 bill of materials</li>
                </ul>
              </div>
              <div className="relative aspect-square bg-black/40 rounded-2xl border border-cyan-500/20 flex items-center justify-center">
                <div className="text-center">
                  <Cpu className="w-20 h-20 text-cyan-400/40 mx-auto mb-4" />
                  <p className="text-sm text-zinc-500">Hardware render coming soon</p>
                  <p className="text-xs text-zinc-600 mt-1">ESP32-CAM + card feeder stand</p>
                </div>
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ CTA ═══ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
            Ready to Scan?
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-8">
            100 free scans. No credit card. No BS. Just point your camera and go.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/purchase" className="btn-primary text-base px-8 py-4 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Launch Scanner
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/how-it-works" className="btn-outline text-base px-8 py-4 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              See Full Platform
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
