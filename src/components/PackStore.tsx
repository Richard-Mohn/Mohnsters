'use client';

import React, { useState } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

const PACK_TIERS = [
  {
    name: 'Common Pack',
    price: 50,
    usd: '$0.99',
    cards: 3,
    emoji: '📦',
    color: 'from-zinc-500 to-zinc-600',
    borderColor: 'border-zinc-500/30',
    glowColor: 'rgba(161,161,170,0.2)',
    odds: '60% Common, 30% Uncommon, 10% Rare',
  },
  {
    name: 'Rare Pack',
    price: 200,
    usd: '$4.99',
    cards: 5,
    emoji: '🎁',
    color: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-500/30',
    glowColor: 'rgba(59,130,246,0.2)',
    odds: '40% Uncommon, 40% Rare, 15% Legendary, 5% Mythic',
    popular: true,
  },
  {
    name: 'Legendary Pack',
    price: 1000,
    usd: '$9.99',
    cards: 5,
    emoji: '👑',
    color: 'from-yellow-500 to-amber-600',
    borderColor: 'border-yellow-500/30',
    glowColor: 'rgba(234,179,8,0.2)',
    odds: '30% Rare, 50% Legendary, 20% Mythic',
  },
  {
    name: 'Mythic Pack',
    price: 5000,
    usd: '$49.99',
    cards: 5,
    emoji: '🌟',
    color: 'from-pink-500 to-purple-600',
    borderColor: 'border-pink-500/30',
    glowColor: 'rgba(236,72,153,0.3)',
    odds: '50% Legendary, 50% Mythic + Guaranteed 1 Mythic',
  },
];

export function PackStore() {
  const [hoveredPack, setHoveredPack] = useState<number | null>(null);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {PACK_TIERS.map((pack, i) => (
        <div
          key={pack.name}
          className={`relative glass-card rounded-2xl p-5 transition-all duration-500 cursor-pointer group ${
            hoveredPack === i ? 'scale-105' : ''
          }`}
          onMouseEnter={() => setHoveredPack(i)}
          onMouseLeave={() => setHoveredPack(null)}
          style={{
            boxShadow: hoveredPack === i ? `0 0 60px ${pack.glowColor}` : undefined,
          }}
        >
          {/* Popular badge */}
          {pack.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full z-20">
              ⭐ MOST POPULAR
            </div>
          )}

          {/* Pack art */}
          <div className={`w-full h-32 rounded-xl bg-gradient-to-br ${pack.color} flex items-center justify-center mb-4 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <span className="text-5xl relative z-10 group-hover:scale-125 transition-transform duration-500 drop-shadow-2xl">
              {pack.emoji}
            </span>
            {hoveredPack === i && (
              <div className="absolute inset-0">
                <Sparkles className="absolute top-2 right-3 w-4 h-4 text-white/60 animate-pulse" />
                <Sparkles className="absolute bottom-3 left-2 w-3 h-3 text-white/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            )}
          </div>

          {/* Pack info */}
          <h3 className="text-lg font-bold text-white mb-1">{pack.name}</h3>
          <p className="text-xs text-zinc-500 mb-3">{pack.cards} MohnSters per pack</p>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-black gradient-text-gold">{pack.price}</span>
            <span className="text-xs text-yellow-500/70">$MOHN</span>
            <span className="text-xs text-zinc-600 ml-auto">or {pack.usd}</span>
          </div>

          {/* Odds */}
          <p className="text-[10px] text-zinc-500 mb-4 leading-relaxed">{pack.odds}</p>

          {/* Buy button */}
          <button className="w-full btn-primary text-sm flex items-center justify-center gap-2 py-2.5">
            Open Pack <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
