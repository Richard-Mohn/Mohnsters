'use client';

import React from 'react';

interface MonsterCardProps {
  name: string;
  element: 'fire' | 'water' | 'earth' | 'lightning' | 'shadow' | 'crystal';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythic';
  emoji: string;
  hp: number;
  atk: number;
  def: number;
  spd: number;
  level?: number;
  vaulted?: boolean;
}

const ELEMENT_COLORS = {
  fire: { bg: 'from-red-500/20 to-orange-500/10', text: 'text-red-400', icon: '🔥', badge: 'stat-fire' },
  water: { bg: 'from-blue-500/20 to-cyan-500/10', text: 'text-blue-400', icon: '💧', badge: 'stat-water' },
  earth: { bg: 'from-green-500/20 to-emerald-500/10', text: 'text-green-400', icon: '🌿', badge: 'stat-earth' },
  lightning: { bg: 'from-yellow-500/20 to-amber-500/10', text: 'text-yellow-400', icon: '⚡', badge: 'stat-lightning' },
  shadow: { bg: 'from-indigo-500/20 to-violet-500/10', text: 'text-indigo-400', icon: '🌑', badge: 'stat-shadow' },
  crystal: { bg: 'from-pink-500/20 to-fuchsia-500/10', text: 'text-pink-400', icon: '💎', badge: 'stat-crystal' },
};

const RARITY_STYLES = {
  common: { border: 'rarity-common', label: 'Common', color: 'text-gray-400' },
  uncommon: { border: 'rarity-uncommon', label: 'Uncommon', color: 'text-green-400' },
  rare: { border: 'rarity-rare', label: 'Rare', color: 'text-blue-400' },
  legendary: { border: 'rarity-legendary', label: 'Legendary', color: 'text-yellow-400' },
  mythic: { border: 'rarity-mythic', label: 'Mythic', color: 'text-pink-400' },
};

export function MonsterCard({
  name, element, rarity, emoji, hp, atk, def, spd, level = 1, vaulted = false,
}: MonsterCardProps) {
  const el = ELEMENT_COLORS[element];
  const rar = RARITY_STYLES[rarity];

  return (
    <div className={`monster-card ${rar.border} p-4 w-64 group cursor-pointer`}>
      {/* Vaulted badge */}
      {vaulted && (
        <div className="absolute top-2 right-2 z-10 bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          🔒 VAULTED
        </div>
      )}

      {/* Card header */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold uppercase tracking-wider ${rar.color}`}>
          {rar.label}
        </span>
        <span className={el.badge}>
          {el.icon} {element}
        </span>
      </div>

      {/* Monster art area */}
      <div className={`relative w-full h-40 rounded-xl bg-gradient-to-br ${el.bg} flex items-center justify-center mb-3 overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="text-7xl group-hover:scale-110 transition-transform duration-500 relative z-10 drop-shadow-2xl">
          {emoji}
        </span>
        {/* Level badge */}
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          Lv.{level}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-white mb-2 font-[var(--font-heading)]">{name}</h3>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-1 text-center">
        <div className="bg-white/5 rounded-lg p-1.5">
          <div className="text-red-400 text-xs font-bold">HP</div>
          <div className="text-white text-sm font-bold">{hp}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-1.5">
          <div className="text-orange-400 text-xs font-bold">ATK</div>
          <div className="text-white text-sm font-bold">{atk}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-1.5">
          <div className="text-blue-400 text-xs font-bold">DEF</div>
          <div className="text-white text-sm font-bold">{def}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-1.5">
          <div className="text-green-400 text-xs font-bold">SPD</div>
          <div className="text-white text-sm font-bold">{spd}</div>
        </div>
      </div>
    </div>
  );
}
