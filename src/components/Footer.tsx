import React from 'react';
import Link from 'next/link';
import { Coins, MapPin, Mail, Globe, Shield } from 'lucide-react';

const EMPIRE_LINKS = [
  { name: 'NeighborTechs', href: 'https://neighbortechs.com' },
  { name: 'MohnMint', href: 'https://MohnMint.com' },
  { name: 'MohnMatrix', href: 'https://mohnmatrix.com' },
  { name: 'Flaming Social', href: 'https://flamingsocialmedia.com' },
  { name: 'MohnMove', href: 'https://mohnmove.com' },
  { name: 'MohnMenu', href: 'https://MohnMenu.com' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#030305]">
      {/* Main footer */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">

          {/* Brand — spans 2 cols */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <span className="text-white font-black text-sm">M</span>
              </div>
              <span className="text-xl font-black">
                Mohn<span className="gradient-text-purple">Sters</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed mb-4 max-w-xs">
              The AI-powered collectible creature ecosystem. Scan physical trading cards, hatch unique MohnSters, battle friends, and earn $MOHN across the Mohn Empire.
            </p>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 w-fit">
              <Coins className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-400">Powered by $MOHN</span>
            </div>
          </div>

          {/* Game */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest">Game</h4>
            <div className="space-y-2.5">
              <Link href="/how-it-works" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">How It Works</Link>
              <Link href="/packs" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">Pack Store</Link>
              <Link href="/battle" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">Battle Arena</Link>
              <Link href="/vault" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">The Vault</Link>
            </div>
          </div>

          {/* Economy */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest">Economy</h4>
            <div className="space-y-2.5">
              <Link href="/tokenomics" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">$MOHN Tokenomics</Link>
              <Link href="/empire" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">The Mohn Empire</Link>
              <Link href="/investors" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">Investor Relations</Link>
            </div>
          </div>

          {/* Empire */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest">Empire</h4>
            <div className="space-y-2.5">
              {EMPIRE_LINKS.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="block text-sm text-zinc-500 hover:text-yellow-400 transition-colors">
                  {link.name} <span className="text-zinc-700">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest">Company</h4>
            <div className="space-y-2.5">
              <Link href="/privacy" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">Terms of Service</Link>
              <Link href="/support" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate info bar */}
      <div className="border-t border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                <span>23 Shore Street, Petersburg, Virginia 23803</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <Mail className="w-3.5 h-3.5 text-zinc-600" />
                <a href="mailto:hello@mohnsters.com" className="hover:text-purple-400 transition-colors">hello@mohnsters.com</a>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <Shield className="w-3.5 h-3.5 text-zinc-600" />
                <a href="mailto:investors@mohnsters.com" className="hover:text-yellow-400 transition-colors">investors@mohnsters.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-zinc-700">
            &copy; {new Date().getFullYear()} Mohn Empire. All rights reserved. MohnSters is a Mohn Empire company.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-zinc-700">
            <span>$MOHN is a utility token and not a security.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
