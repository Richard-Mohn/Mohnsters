import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Lock, TrendingUp, Shield, DollarSign, Coins, ChevronRight,
  Package, Truck, Camera, BarChart3, CheckCircle2, ArrowRight
} from 'lucide-react';
import { VaultPreview } from '@/components/VaultPreview';

export const metadata: Metadata = {
  title: 'The Vault — Earn Yield on Your Physical Cards',
  description: 'Send physical trading cards to the MohnSters vault. Earn passive $MOHN yield, track card value appreciation, and power up your digital creatures.',
};

const VAULT_STEPS = [
  {
    step: 1,
    icon: Camera,
    title: 'Scan & Select',
    description: 'Scan and select which cards you want to vault. We provide a pre-paid shipping label for your convenience.',
  },
  {
    step: 2,
    icon: Truck,
    title: 'Ship Your Cards',
    description: 'Pack your cards with our provided materials and ship them to our secure facility. Fully insured in transit.',
  },
  {
    step: 3,
    icon: Shield,
    title: 'Grade & Store',
    description: 'We professionally grade your cards, photograph them in high resolution, and store them in climate-controlled vaults.',
  },
  {
    step: 4,
    icon: TrendingUp,
    title: 'Earn & Grow',
    description: 'Your vaulted cards generate passive $MOHN yield monthly. Card values are tracked in real-time via market APIs.',
  },
];

const YIELD_TIERS = [
  { value: '$0 - $50', yield: '0.5%', monthly: '$0.25', yearlyMohn: '~30', color: 'text-zinc-400' },
  { value: '$50 - $250', yield: '1.0%', monthly: '$1.50', yearlyMohn: '~180', color: 'text-green-400' },
  { value: '$250 - $1,000', yield: '1.5%', monthly: '$5.63', yearlyMohn: '~675', color: 'text-blue-400' },
  { value: '$1,000+', yield: '2.0%', monthly: '$20+', yearlyMohn: '~2,400+', color: 'text-yellow-400' },
];

const FAQS = [
  {
    q: 'Are my cards safe?',
    a: 'Absolutely. Cards are stored in professional-grade, climate-controlled vaults with 24/7 security, fire suppression, and full insurance coverage. Every card is photographed and cataloged with a unique ID.',
  },
  {
    q: 'Can I get my card back anytime?',
    a: 'Yes! Request a withdrawal anytime. There is a 10% $MOHN fee based on the current market value of the card. Your card ships back fully insured within 5-7 business days.',
  },
  {
    q: 'How is yield calculated?',
    a: 'Yield is based on your card\'s current market value, updated daily via pricing APIs. Higher value cards earn a higher yield percentage. Yield is paid monthly in $MOHN tokens.',
  },
  {
    q: 'What cards can I vault?',
    a: 'Any physical trading card: Pokémon, Yu-Gi-Oh!, Magic: The Gathering, sports cards (Topps, Panini, Upper Deck), and more. Cards must be in Good condition or better.',
  },
  {
    q: 'Do vaulted cards power up my MohnSters?',
    a: 'Yes! MohnSters linked to vaulted cards receive a special gold border and a +20% boost to all battle stats. Vaulted MohnSters also unlock exclusive abilities.',
  },
];

export default function VaultPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-yellow-500/8 blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <Lock className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-bold text-yellow-300">Physical cards → passive crypto income</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-[var(--font-heading)]">
            The <span className="gradient-text-gold">Vault</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Send your physical cards to our secure, insured vault. They earn passive $MOHN yield, appreciate in value, and power up your digital MohnSters.
          </p>
        </div>
      </section>

      {/* Live Vault Preview */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <VaultPreview />
        </div>
      </section>

      <div className="section-divider" />

      {/* How Vault Works */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
              How the <span className="gradient-text-gold">Vault</span> Works
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {VAULT_STEPS.map((step) => (
              <div key={step.step} className="glass-card rounded-2xl p-6 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-black font-black text-sm shadow-lg">
                  {step.step}
                </div>
                <step.icon className="w-8 h-8 text-yellow-400 mx-auto mb-4 mt-2" />
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Yield Calculator */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
              Yield <span className="gradient-text-gold">Calculator</span>
            </h2>
            <p className="text-zinc-500">See how much $MOHN your cards could earn</p>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden max-w-3xl mx-auto">
            <div className="grid grid-cols-5 gap-2 p-4 border-b border-white/5 text-xs text-zinc-500 font-bold">
              <div>Card Value</div>
              <div className="text-center">Yield Rate</div>
              <div className="text-center">Monthly ($)</div>
              <div className="text-center">Yearly ($MOHN)</div>
              <div className="text-right">Tier</div>
            </div>
            {YIELD_TIERS.map((tier) => (
              <div key={tier.value} className="grid grid-cols-5 gap-2 p-4 items-center border-b border-white/5 last:border-0">
                <div className="text-sm font-bold text-white">{tier.value}</div>
                <div className={`text-center text-sm font-bold ${tier.color}`}>{tier.yield}/mo</div>
                <div className="text-center text-sm text-zinc-400">{tier.monthly}</div>
                <div className="text-center text-sm font-bold text-yellow-400">{tier.yearlyMohn}</div>
                <div className="text-right">
                  <BarChart3 className={`w-4 h-4 ${tier.color} ml-auto`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
              Vault <span className="gradient-text-purple">FAQ</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="glass-card rounded-xl p-6">
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Your Cards Deserve to <span className="gradient-text-gold">Grow</span>
          </h2>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
            Stop letting your collection sit in a binder. Put it to work and earn passive $MOHN income.
          </p>
          <button className="btn-gold text-lg px-10 py-4 flex items-center gap-2 mx-auto">
            <Lock className="w-5 h-5" />
            Start Vaulting
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
