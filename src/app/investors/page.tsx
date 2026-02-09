import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Coins, TrendingUp, ArrowRight, Shield, Users, Building2,
  BarChart3, Globe, LineChart, Layers, Sparkles, ChevronRight,
  CheckCircle2, Mail, MapPin, Clock, FileText, Rocket,
  Lock, Flame, Target, Award, Handshake, BadgeCheck
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Investor Relations — The Mohn Empire',
  description: 'Institutional-grade overview of the Mohn Empire ecosystem. Tokenomics, roadmap, market opportunity, and partnership opportunities for investors.',
};

/* ─── Data ─── */

const MARKET_OPPORTUNITY = [
  { label: 'Global TCG Market', value: '$35.9B', growth: '9.2% CAGR', year: '2030' },
  { label: 'Play-to-Earn Gaming', value: '$16.8B', growth: '21.3% CAGR', year: '2030' },
  { label: 'Digital Collectibles', value: '$13.2B', growth: '18.7% CAGR', year: '2028' },
  { label: 'Gig Economy (Services)', value: '$455B', growth: '16.5% CAGR', year: '2028' },
];

const REVENUE_STREAMS = [
  { source: 'Premium Subscriptions', model: 'MohnSters Pass ($4.99/mo)', recurring: true },
  { source: 'Pack Sales', model: '$MOHN & USD purchases (5% burned)', recurring: true },
  { source: 'NFT Minting Fees', model: 'Deflationary burn mechanism', recurring: true },
  { source: 'Marketplace Commission', model: '5% on all peer trades', recurring: true },
  { source: 'Platform Service Fees', model: 'NeighborTechs, MohnMatrix, etc.', recurring: true },
  { source: 'Tournament Entry Fees', model: 'Weekly competitive events', recurring: true },
  { source: 'Vault Storage Fees', model: 'Monthly custody + insurance', recurring: true },
  { source: 'ESP32 Scanner Hardware', model: 'Physical product sales', recurring: false },
];

const MILESTONES = [
  { phase: 'Phase 1', title: 'Scanner MVP', timeframe: 'Q1-Q2 2026', status: 'In Progress', items: ['Next.js 16 web app (PWA)', 'AI card scanner (camera + OCR)', 'Abstraction layer (legal compliance)', '2D creature generation pipeline', 'Firebase auth + Firestore database'] },
  { phase: 'Phase 2', title: '3D Pipeline & Collection', timeframe: 'Q3-Q4 2026', status: 'Upcoming', items: ['Worker server fleet (Railway/AWS)', '3D model generation (Meshy.ai)', 'Three.js interactive viewer', 'Monster collection & portfolio', 'Dual currency introduction'] },
  { phase: 'Phase 3', title: 'Battle System', timeframe: 'Q1-Q2 2027', status: 'Planned', items: ['Auto-battler engine (Phaser.js)', 'Ranked matchmaking + ELO', 'Daily quests & achievements', 'Season pass system', 'Tournament infrastructure'] },
  { phase: 'Phase 4', title: '$MOHN Launch', timeframe: 'Q3-Q4 2027', status: 'Planned', items: ['Solana SPL token deployment', 'Wallet integration (Phantom)', 'Cross-platform $MOHN economy', 'NFT marketplace', 'Governance voting'] },
  { phase: 'Phase 5', title: 'Hardware & Scale', timeframe: '2028+', status: 'Vision', items: ['ESP32 physical scanner', 'Mobile native apps (iOS/Android)', 'International expansion', 'Strategic partnerships', 'Full ecosystem maturity'] },
];

const TEAM_HIGHLIGHTS = [
  { label: 'Platforms Built', value: '6+', desc: 'Across gaming, gig economy, social, fintech' },
  { label: 'Tech Stack', value: 'Enterprise', desc: 'Next.js, Flutter, Firebase, Solana, AI/ML' },
  { label: 'Revenue Model', value: 'Diversified', desc: '8+ independent revenue streams' },
  { label: 'Token Model', value: 'Deflationary', desc: 'Fixed 100M supply, 5% burn per transaction' },
];

const DISCLAIMER_TEXT = `This page is for informational purposes only and does not constitute an offer to sell or solicitation of an offer to buy any securities, tokens, or financial instruments. $MOHN is a utility token and should not be considered an investment. The information provided here may contain forward-looking statements that involve risks and uncertainties. Actual results may differ materially from those projected. The Mohn Empire and its affiliates make no representation or warranty, express or implied, regarding the accuracy or completeness of the information contained herein. Please consult with qualified legal and financial professionals before making any decisions.`;

export default function InvestorsPage() {
  return (
    <div className="relative bg-grid-pattern">

      {/* ═══════ HERO ═══════ */}
      <section className="relative py-24 md:py-32">
        <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-purple-500/8 blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Building2 className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-purple-300">Investor Relations</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-[var(--font-heading)]">
            The <span className="gradient-text-purple">Mohn Empire</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-4">
            A multi-platform technology ecosystem powered by the <span className="text-yellow-400 font-bold">$MOHN</span> utility token. Real businesses. Real users. Real revenue. One shared economy.
          </p>
          <p className="text-base text-zinc-500 max-w-2xl mx-auto mb-10">
            We&apos;re building the infrastructure for the next generation of digital ownership, gaming, and gig-economy services — all connected through a single deflationary token.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:investors@mohnsters.com" className="btn-primary text-base px-8 py-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link href="/empire" className="btn-outline text-base px-8 py-4 flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Ecosystem Overview
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ KEY METRICS ═══════ */}
      <section className="py-8 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TEAM_HIGHLIGHTS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black gradient-text-purple">{stat.value}</div>
                <div className="text-sm font-bold text-white mt-1">{stat.label}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ MARKET OPPORTUNITY ═══════ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="section-label bg-blue-500/10 border border-blue-500/20 text-blue-300 mx-auto w-fit mb-4">
              <BarChart3 className="w-3.5 h-3.5" />
              Market Opportunity
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Massive <span className="gradient-text-purple">Addressable Markets</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              The Mohn Empire sits at the intersection of four high-growth markets
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {MARKET_OPPORTUNITY.map((market) => (
              <div key={market.label} className="glass-card rounded-2xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-black gradient-text-gold mb-1">{market.value}</div>
                <div className="text-sm font-bold text-white mb-2">{market.label}</div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-[10px] font-bold text-green-400">{market.growth}</span>
                </div>
                <div className="text-[10px] text-zinc-600 mt-1">Projected by {market.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════ REVENUE MODEL ═══════ */}
      <section className="relative py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="section-label bg-green-500/10 border border-green-500/20 text-green-300 mx-auto w-fit mb-4">
              <LineChart className="w-3.5 h-3.5" />
              Revenue Model
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Diversified <span className="gradient-text-gold">Revenue Streams</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              Not reliant on token speculation. Built on sustainable, recurring revenue from real products and services.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {REVENUE_STREAMS.map((stream) => (
              <div key={stream.source} className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  {stream.recurring ? (
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">Recurring</span>
                  ) : (
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">One-time</span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{stream.source}</h4>
                <p className="text-xs text-zinc-500">{stream.model}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════ ROADMAP ═══════ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="section-label bg-purple-500/10 border border-purple-500/20 text-purple-300 mx-auto w-fit mb-4">
              <Rocket className="w-3.5 h-3.5" />
              Development Roadmap
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Execution <span className="gradient-text-purple">Roadmap</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              A phased approach to building and shipping — proving product-market fit before scaling
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {MILESTONES.map((milestone, i) => (
              <div key={milestone.phase} className="glass-card rounded-2xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="md:w-48 shrink-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm ${
                        milestone.status === 'In Progress'
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                          : milestone.status === 'Upcoming'
                          ? 'bg-gradient-to-br from-yellow-500 to-amber-600'
                          : 'bg-gradient-to-br from-zinc-600 to-zinc-700'
                      }`}>
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-purple-400">{milestone.phase}</div>
                        <div className="text-base font-bold text-white">{milestone.title}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span className="text-xs text-zinc-500">{milestone.timeframe}</span>
                    </div>
                    <span className={`mt-2 inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      milestone.status === 'In Progress'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : milestone.status === 'Upcoming'
                        ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                    }`}>
                      {milestone.status}
                    </span>
                  </div>
                  <div className="flex-1">
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {milestone.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${
                            milestone.status === 'In Progress' ? 'text-green-400' : 'text-zinc-600'
                          }`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════ COMPETITIVE MOAT ═══════ */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]">
              Competitive <span className="gradient-text-purple">Moat</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Layers, title: 'Multi-Platform Ecosystem', desc: 'No competitor connects gaming, gig economy, social media, and fintech under one token.', color: 'from-purple-500 to-violet-600' },
              { icon: Flame, title: 'Deflationary Tokenomics', desc: 'Every transaction burns 5% of $MOHN — ensuring scarcity increases with usage.', color: 'from-orange-500 to-red-600' },
              { icon: Shield, title: 'Legal Abstraction Layer', desc: 'Proprietary AI system converts any TCG card into legally original creatures.', color: 'from-blue-500 to-indigo-600' },
              { icon: Handshake, title: 'Real Business Revenue', desc: 'Revenue from actual services (IT repair, background checks) — not just token sales.', color: 'from-green-500 to-emerald-600' },
            ].map((moat) => (
              <div key={moat.title} className="glass-card rounded-2xl p-6 group">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${moat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <moat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{moat.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{moat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════ CONTACT CTA ═══════ */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="glass-card rounded-2xl p-8 md:p-12 max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
              Interested in the Mohn Empire?
            </h2>
            <p className="text-base text-zinc-400 mb-8 max-w-xl mx-auto">
              We welcome conversations with investors, partners, and strategic advisors who share our vision. Reach out to learn more about partnership opportunities.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8">
              <a href="mailto:investors@mohnsters.com" className="glass-card rounded-xl p-4 flex items-center gap-3 hover:border-purple-500/30 transition-colors">
                <Mail className="w-5 h-5 text-purple-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-zinc-500">Email</div>
                  <div className="text-sm font-bold text-white">investors@mohnsters.com</div>
                </div>
              </a>
              <div className="glass-card rounded-xl p-4 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-400 shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-zinc-500">Headquarters</div>
                  <div className="text-sm font-bold text-white">Petersburg, VA</div>
                </div>
              </div>
            </div>

            <a href="mailto:investors@mohnsters.com" className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Schedule a Conversation
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ DISCLAIMER ═══════ */}
      <section className="py-12 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Legal Disclaimer</h4>
            <p className="text-[11px] text-zinc-600 leading-relaxed">
              {DISCLAIMER_TEXT}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
