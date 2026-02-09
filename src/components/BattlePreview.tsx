'use client';

import React, { useState } from 'react';
import { Zap, Shield, Swords, Heart, Trophy, ChevronRight } from 'lucide-react';

const SAMPLE_TEAMS = {
  player: [
    { name: 'Infernak', emoji: '🐉', element: 'fire', hp: 85, maxHp: 100, atk: 78, def: 45, spd: 62, level: 15 },
    { name: 'Gloomclaw', emoji: '👾', element: 'shadow', hp: 92, maxHp: 92, atk: 65, def: 70, spd: 48, level: 12 },
    { name: 'Voltusk', emoji: '⚡', element: 'lightning', hp: 70, maxHp: 70, atk: 88, def: 35, spd: 95, level: 18 },
  ],
  opponent: [
    { name: 'Aquafang', emoji: '🦑', element: 'water', hp: 60, maxHp: 95, atk: 72, def: 60, spd: 55, level: 14 },
    { name: 'Crystara', emoji: '💎', element: 'crystal', hp: 88, maxHp: 88, atk: 80, def: 55, spd: 50, level: 16 },
    { name: 'Thornback', emoji: '🌿', element: 'earth', hp: 110, maxHp: 110, atk: 55, def: 85, spd: 30, level: 13 },
  ],
};

export function BattlePreview() {
  const [battleState, setBattleState] = useState<'ready' | 'fighting' | 'won'>('ready');
  const [activePlayerIdx] = useState(0);
  const [activeOpponentIdx] = useState(0);

  const player = SAMPLE_TEAMS.player[activePlayerIdx];
  const opponent = SAMPLE_TEAMS.opponent[activeOpponentIdx];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Battle arena */}
      <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-red-500/10 blur-3xl" />

        {/* Battle header */}
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-bold text-yellow-400">RANKED BATTLE</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
            <Swords className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-zinc-400">Season 1 • Round 42</span>
          </div>
        </div>

        {/* Battle field */}
        <div className="grid md:grid-cols-3 gap-6 items-center relative z-10">
          {/* Player side */}
          <div className="text-center">
            <div className="text-xs font-bold text-green-400 mb-2 uppercase tracking-wider">Your Team</div>
            <div className="monster-card rarity-rare p-4 mx-auto max-w-[200px]">
              <div className="text-5xl mb-2 animate-float">{player.emoji}</div>
              <div className="text-sm font-bold text-white">{player.name}</div>
              <div className="text-xs text-zinc-400">Lv.{player.level}</div>
              <div className="mt-2">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-red-400">HP</span>
                  <span className="text-zinc-400">{player.hp}/{player.maxHp}</span>
                </div>
                <div className="health-bar">
                  <div
                    className="health-bar-fill"
                    style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 mt-2 text-[10px]">
                <div className="flex items-center justify-center gap-0.5 text-orange-400">
                  <Swords className="w-3 h-3" /> {player.atk}
                </div>
                <div className="flex items-center justify-center gap-0.5 text-blue-400">
                  <Shield className="w-3 h-3" /> {player.def}
                </div>
                <div className="flex items-center justify-center gap-0.5 text-green-400">
                  <Zap className="w-3 h-3" /> {player.spd}
                </div>
              </div>
            </div>
            {/* Team bench */}
            <div className="flex justify-center gap-2 mt-3">
              {SAMPLE_TEAMS.player.map((m, i) => (
                <div
                  key={m.name}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                    i === activePlayerIdx
                      ? 'bg-purple-500/30 border border-purple-500/50'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  {m.emoji}
                </div>
              ))}
            </div>
          </div>

          {/* VS Center */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl font-black gradient-text-fire mb-2">VS</div>
            {battleState === 'ready' && (
              <button
                onClick={() => setBattleState('fighting')}
                className="btn-primary text-sm px-6 py-2 flex items-center gap-2"
              >
                <Swords className="w-4 h-4" />
                Battle!
              </button>
            )}
            {battleState === 'fighting' && (
              <div className="text-sm text-yellow-400 animate-pulse font-bold">
                ⚔️ Fighting...
              </div>
            )}
            {battleState === 'won' && (
              <div className="text-center">
                <div className="text-sm text-green-400 font-bold">VICTORY!</div>
                <div className="text-xs text-yellow-400 mt-1">+50 $MOHN</div>
              </div>
            )}
            <div className="mt-4 text-[10px] text-zinc-500 flex items-center gap-1">
              Win to earn $MOHN <ChevronRight className="w-3 h-3" />
            </div>
          </div>

          {/* Opponent side */}
          <div className="text-center">
            <div className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wider">Opponent</div>
            <div className="monster-card rarity-legendary p-4 mx-auto max-w-[200px]">
              <div className="text-5xl mb-2 animate-float-reverse">{opponent.emoji}</div>
              <div className="text-sm font-bold text-white">{opponent.name}</div>
              <div className="text-xs text-zinc-400">Lv.{opponent.level}</div>
              <div className="mt-2">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-red-400">HP</span>
                  <span className="text-zinc-400">{opponent.hp}/{opponent.maxHp}</span>
                </div>
                <div className="health-bar">
                  <div
                    className="health-bar-fill"
                    style={{ width: `${(opponent.hp / opponent.maxHp) * 100}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 mt-2 text-[10px]">
                <div className="flex items-center justify-center gap-0.5 text-orange-400">
                  <Swords className="w-3 h-3" /> {opponent.atk}
                </div>
                <div className="flex items-center justify-center gap-0.5 text-blue-400">
                  <Shield className="w-3 h-3" /> {opponent.def}
                </div>
                <div className="flex items-center justify-center gap-0.5 text-green-400">
                  <Zap className="w-3 h-3" /> {opponent.spd}
                </div>
              </div>
            </div>
            {/* Team bench */}
            <div className="flex justify-center gap-2 mt-3">
              {SAMPLE_TEAMS.opponent.map((m, i) => (
                <div
                  key={m.name}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                    i === activeOpponentIdx
                      ? 'bg-red-500/30 border border-red-500/50'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  {m.emoji}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Battle rewards bar */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500">Rewards:</span>
            <span className="text-xs font-bold text-yellow-400">💰 20-100 $MOHN</span>
            <span className="text-xs font-bold text-purple-400">⭐ +50 XP</span>
          </div>
          <div className="text-xs text-zinc-500">Element: {player.element} vs {opponent.element}</div>
        </div>
      </div>
    </div>
  );
}
