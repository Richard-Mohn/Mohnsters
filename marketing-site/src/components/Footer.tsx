import React from 'react';
import Link from 'next/link';
import { Coins, MapPin, Mail, Shield, Download, Cpu } from 'lucide-react';

const EMPIRE_LIVE = [
  { name: 'NeighborTechs', href: 'https://neighbortechs.com', badge: 'Live' },
  { name: 'MohnMatrix', href: 'https://mohnmatrix.com', badge: 'Live' },
  { name: 'Flaming Social', href: 'https://flamingsocialmedia.com', badge: 'Live' },
];

const EMPIRE_BUILDING = [
  { name: 'MohnMint', href: 'https://mohnmint.com', badge: 'Building' },
  { name: 'MohnMenu', href: '#', badge: 'Building' },
  { name: 'MohnServe', href: '#', badge: 'Beta' },
  { name: 'MohnPay', href: '#', badge: 'Beta' },
  { name: 'MohnMove', href: '#', badge: 'Planned' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#030305]">
      {/* Main footer */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 lg:gap-10">

          {/* Brand — spans 2 cols on mobile / lg */}
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
              <Link href="/scanner" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">Card Scanner</Link>
              <Link href="/packs" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">Pack Store</Link>
              <Link href="/battle" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">Battle Arena</Link>
              <Link href="/vault" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">The Vault</Link>
            </div>
          </div>

          {/* Economy & Investors */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest">Economy</h4>
            <div className="space-y-2.5">
              <Link href="/tokenomics" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">$MOHN Tokenomics</Link>
              <Link href="/empire" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">The Mohn Empire</Link>
              <Link href="/investors" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">Investor Relations</Link>
            </div>
            <h4 className="text-xs font-bold text-white mb-3 mt-6 uppercase tracking-widest">Downloads</h4>
            <div className="space-y-2.5">
              <span className="flex items-center gap-1.5 text-sm text-zinc-600"><Download className="w-3.5 h-3.5" /> Web App <span className="text-[9px] text-zinc-700 ml-1">Soon</span></span>
              <span className="flex items-center gap-1.5 text-sm text-zinc-600"><Download className="w-3.5 h-3.5" /> Android APK <span className="text-[9px] text-zinc-700 ml-1">Soon</span></span>
              <span className="flex items-center gap-1.5 text-sm text-zinc-600"><Cpu className="w-3.5 h-3.5" /> ESP32 Miner <span className="text-[9px] text-zinc-700 ml-1">Soon</span></span>
            </div>
          </div>

          {/* Empire — Live */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest">Empire — Live</h4>
            <div className="space-y-2.5">
              {EMPIRE_LIVE.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-yellow-400 transition-colors">
                  {link.name} <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded-full">{link.badge}</span>
                </a>
              ))}
            </div>
            <h4 className="text-xs font-bold text-white mb-3 mt-6 uppercase tracking-widest">Empire — Dev</h4>
            <div className="space-y-2.5">
              {EMPIRE_BUILDING.map((link) => (
                <span key={link.name} className="flex items-center gap-2 text-sm text-zinc-600">
                  {link.name} <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                    link.badge === 'Beta' ? 'bg-yellow-500/10 text-yellow-600' :
                    link.badge === 'Building' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-zinc-800 text-zinc-600'
                  }`}>{link.badge}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest">Company</h4>
            <div className="space-y-2.5">
              <Link href="/privacy" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">Terms of Service</Link>
              <a href="mailto:richard@mohnmint.com" className="block text-sm text-zinc-500 hover:text-purple-400 transition-colors">Contact Founder</a>
              <a href="mailto:investors@mohnsters.com" className="block text-sm text-zinc-500 hover:text-yellow-400 transition-colors">Investor Inquiries</a>
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
            <div className="text-xs text-zinc-700">
              9 platforms &middot; 1 token &middot; ∞ possibilities
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-zinc-700">
            &copy; {new Date().getFullYear()} Mohn Empire &middot; NeighborTechs LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-zinc-700">
            <span>$MOHN is a utility token and not a security.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
