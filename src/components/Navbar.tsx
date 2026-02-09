'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu, X, Wallet, Swords, Package, Lock, ScanLine,
  BookOpen, Coins, BarChart3, Trophy
} from 'lucide-react';

const NAV_LINKS = [
  { href: '/how-it-works', label: 'How It Works', icon: BookOpen },
  { href: '/packs', label: 'Packs', icon: Package },
  { href: '/battle', label: 'Battle', icon: Swords },
  { href: '/vault', label: 'Vault', icon: Lock },
  { href: '/tokenomics', label: '$MOHN', icon: Coins },
  { href: '/empire', label: 'Empire', icon: BarChart3 },
  { href: '/investors', label: 'Investors', icon: Trophy },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-header">
      <nav className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
            <span className="text-white font-black text-sm">M</span>
          </div>
          <span className="text-xl font-black tracking-tight">
            Mohn<span className="gradient-text-purple">Sters</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
            <Coins className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs font-bold text-yellow-400">0 $MOHN</span>
          </div>
          <button className="btn-primary text-sm py-2 px-5">
            Play Now
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/5 p-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              <link.icon className="w-5 h-5 text-purple-400" />
              {link.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-white/5">
            <button className="btn-primary w-full text-sm py-3">
              Play Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
