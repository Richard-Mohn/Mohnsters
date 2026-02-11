import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Swords, Trophy, Zap, Shield, Target, Users,
  ChevronRight, Star, Crown, ArrowRight, Coins
} from 'lucide-react';
import { BattlePreview } from '@/components/BattlePreview';

export const metadata: Metadata = {
  title: 'Battle Arena',
  description: 'Build your MohnSter team and battle other players for $MOHN rewards. Ranked seasons, tournaments, and boss raids.',
};

const ELEMENTS = [
  { name: 'Fire', emoji: '🔥', color: 'text-red-400 bg-red-500/10 border-red-500/20', strong: 'Earth', weak: 'Water' },
  { name: 'Water', emoji: '💧', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', strong: 'Fire', weak: 'Lightning' },
  { name: 'Earth', emoji: '🌿', color: 'text-green-400 bg-green-500/10 border-green-500/20', strong: 'Lightning', weak: 'Fire' },
  { name: 'Lightning', emoji: '⚡', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', strong: 'Water', weak: 'Earth' },
  { name: 'Shadow', emoji: '🌑', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20', strong: 'Crystal', weak: 'Crystal' },
  { name: 'Crystal', emoji: '💎', color: 'text-pink-400 bg-pink-500/10 border-pink-500/20', strong: 'Shadow', weak: 'Shadow' },
];

const LEADERBOARD = [
  { rank: 1, name: 'DragonKing99', rating: 2847, wins: 342, mohnEarned: '45,200', avatar: '🐉' },
  { rank: 2, name: 'CrystalMage', rating: 2791, wins: 298, mohnEarned: '38,900', avatar: '💎' },
  { rank: 3, name: 'ShadowReaper', rating: 2756, wins: 311, mohnEarned: '41,100', avatar: '👾' },
  { rank: 4, name: 'VoltMaster', rating: 2688, wins: 267, mohnEarned: '34,500', avatar: '⚡' },
  { rank: 5, name: 'InfernoBeast', rating: 2654, wins: 289, mohnEarned: '36,200', avatar: '🔥' },
];

const RANK_ICONS = ['👑', '🥈', '🥉', '4️⃣', '5️⃣'];

export default function BattlePage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-red-500/8 blur-[120px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
            <Swords className="w-4 h-4 text-red-400" />
            <span className="text-sm font-bold text-red-300">Turn-based strategy meets real rewards</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-[var(--font-heading)]">
            Battle <span className="gradient-text-fire">Arena</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Build your team of 3 MohnSters. Master element advantages. Climb the ranked ladder. Win $MOHN.
          </p>
        </div>
      </section>

      {/* Battle Preview */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <BattlePreview />
        </div>
      </section>

      <div className="section-divider" />

      {/* Element System */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
              Master the <span className="gradient-text-purple">Elements</span>
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Each MohnSter belongs to one of 6 elements. Knowing matchups is the key to victory.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {ELEMENTS.map((el) => (
              <div key={el.name} className={`glass-card rounded-xl p-4 text-center border ${el.color}`}>
                <span className="text-3xl block mb-2">{el.emoji}</span>
                <h4 className="text-sm font-bold text-white mb-2">{el.name}</h4>
                <div className="text-[10px] space-y-1">
                  <div className="text-green-400">Beats: {el.strong}</div>
                  <div className="text-red-400">Weak to: {el.weak}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Element wheel visual */}
          <div className="text-center mt-8">
            <p className="text-xs text-zinc-600">
              🔥 Fire &gt; 🌿 Earth &gt; ⚡ Lightning &gt; 💧 Water &gt; 🔥 Fire &nbsp;|&nbsp; 🌑 Shadow ⟷ 💎 Crystal
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Battle Modes */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
              Choose Your <span className="gradient-text-fire">Mode</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Quick Battle',
                icon: '⚔️',
                desc: 'Jump into a casual 1v1 match instantly. No stakes, just fun. Great for testing new teams.',
                reward: '5-20 $MOHN',
                cooldown: 'No cooldown',
                color: 'from-zinc-500/20 to-zinc-600/10',
              },
              {
                title: 'Ranked',
                icon: '🏆',
                desc: 'Competitive matches with ELO ratings. 90-day seasons with rewards at every tier. This is where legends are made.',
                reward: '20-100 $MOHN',
                cooldown: '3 min matchmaking',
                color: 'from-purple-500/20 to-violet-600/10',
              },
              {
                title: 'Tournament',
                icon: '🥇',
                desc: 'Weekly tournaments with massive $MOHN prize pools. 16-player brackets, single elimination, all glory.',
                reward: 'Up to 10,000 $MOHN',
                cooldown: 'Weekends only',
                color: 'from-yellow-500/20 to-amber-600/10',
              },
            ].map((mode) => (
              <div key={mode.title} className="glass-card rounded-2xl p-6 text-center">
                <div className={`w-full h-24 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center mb-4`}>
                  <span className="text-5xl">{mode.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{mode.title}</h3>
                <p className="text-sm text-zinc-500 mb-4 leading-relaxed">{mode.desc}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-yellow-400 font-bold">{mode.reward}</span>
                  <span className="text-zinc-600">{mode.cooldown}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Leaderboard */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-[var(--font-heading)]">
              Season 1 <span className="gradient-text-gold">Leaderboard</span>
            </h2>
            <p className="text-zinc-500">Top players earn bonus $MOHN at season end</p>
          </div>

          <div className="max-w-3xl mx-auto glass-card rounded-2xl overflow-hidden">
            <div className="grid grid-cols-12 gap-2 p-4 border-b border-white/5 text-xs text-zinc-500 font-bold">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Player</div>
              <div className="col-span-2 text-right">Rating</div>
              <div className="col-span-2 text-right">Wins</div>
              <div className="col-span-3 text-right">$MOHN Earned</div>
            </div>
            {LEADERBOARD.map((player) => (
              <div
                key={player.rank}
                className="grid grid-cols-12 gap-2 p-4 items-center border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <div className="col-span-1 text-lg">{RANK_ICONS[player.rank - 1]}</div>
                <div className="col-span-4 flex items-center gap-2">
                  <span className="text-xl">{player.avatar}</span>
                  <span className="text-sm font-bold text-white">{player.name}</span>
                </div>
                <div className="col-span-2 text-right text-sm font-bold text-purple-400">{player.rating}</div>
                <div className="col-span-2 text-right text-sm text-zinc-400">{player.wins}</div>
                <div className="col-span-3 text-right text-sm font-bold text-yellow-400">{player.mohnEarned}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Think You Can Compete?
          </h2>
          <button className="btn-primary text-lg px-10 py-4 flex items-center gap-2 mx-auto">
            <Swords className="w-5 h-5" />
            Enter the Arena
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
