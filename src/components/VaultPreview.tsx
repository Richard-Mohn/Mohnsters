'use client';

import React from 'react';
import { Lock, TrendingUp, ArrowDownRight, Shield, DollarSign } from 'lucide-react';

const VAULT_CARDS = [
  { name: 'Charizard VMAX', set: 'Shining Fates', value: 250, yield: 1.5, daysVaulted: 45, emoji: '🐉', growth: '+12%' },
  { name: 'Black Lotus', set: 'Alpha Edition', value: 8500, yield: 2.0, daysVaulted: 120, emoji: '🌸', growth: '+28%' },
  { name: 'Michael Jordan RC', set: '1986 Fleer', value: 3200, yield: 1.8, daysVaulted: 90, emoji: '🏀', growth: '+15%' },
];

export function VaultPreview() {
  const totalValue = VAULT_CARDS.reduce((sum, c) => sum + c.value, 0);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-yellow-500/5 blur-3xl" />

        {/* Header stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-bold text-white">Your Vault</h3>
            </div>
            <p className="text-sm text-zinc-500">Cards stored securely, earning yield</p>
          </div>
          <div className="flex gap-6">
            <div className="text-right">
              <div className="text-xs text-zinc-500 mb-0.5">Total Value</div>
              <div className="text-xl font-black gradient-text-gold">${totalValue.toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-zinc-500 mb-0.5">Monthly Yield</div>
              <div className="text-xl font-black text-green-400 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                ${Math.round(totalValue * 0.015).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Vault cards list */}
        <div className="space-y-3 relative z-10">
          {VAULT_CARDS.map((card) => (
            <div
              key={card.name}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/20 transition-all group cursor-pointer"
            >
              {/* Card art */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500/20 to-amber-600/10 flex items-center justify-center text-2xl shrink-0">
                {card.emoji}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white truncate">{card.name}</h4>
                  <span className="text-[10px] text-yellow-400/60 bg-yellow-400/10 px-1.5 py-0.5 rounded font-bold">
                    🔒 VAULTED
                  </span>
                </div>
                <div className="text-xs text-zinc-500">{card.set} • {card.daysVaulted} days vaulted</div>
              </div>

              {/* Value */}
              <div className="text-right shrink-0">
                <div className="text-sm font-bold text-white">${card.value.toLocaleString()}</div>
                <div className="flex items-center gap-1 justify-end">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-xs font-bold text-green-400">{card.growth}</span>
                </div>
              </div>

              {/* Yield */}
              <div className="text-right shrink-0 hidden sm:block">
                <div className="text-xs text-zinc-500">Yield</div>
                <div className="text-sm font-bold text-yellow-400">{card.yield}%/mo</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom info */}
        <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-3 gap-4 relative z-10">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Insured & climate-controlled</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <DollarSign className="w-4 h-4 text-yellow-400" />
            <span>Withdraw anytime (10% fee)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span>+20% battle stats when vaulted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
