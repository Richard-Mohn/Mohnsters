'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu, X, Swords, Package, Lock, ScanLine,
  BookOpen, Coins, BarChart3, Trophy, ChevronDown,
  Globe, Shield, Mail, Download,
  Cpu, Gamepad2, Crown, Sparkles,
  Building2, CircuitBoard,
  Truck, UtensilsCrossed, Flame, Search,
  Smartphone, Monitor, Wrench,
  FileText, ExternalLink
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   Mega-Menu Data Structure
   ═══════════════════════════════════════════════════════════ */

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  desc?: string;
  badge?: string;
  external?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface NavDropdown {
  label: string;
  icon?: React.ElementType;
  groups: NavGroup[];
  featured?: {
    title: string;
    desc: string;
    href: string;
    gradient: string;
    icon: React.ElementType;
  };
}

const DROPDOWNS: NavDropdown[] = [
  {
    label: 'Game',
    icon: Gamepad2,
    featured: {
      title: 'Start Playing Now',
      desc: 'Scan your first card free and hatch your starter MohnSter.',
      href: '/scanner',
      gradient: 'from-purple-600 to-violet-700',
      icon: Sparkles,
    },
    groups: [
      {
        label: 'Core Gameplay',
        items: [
          { label: 'How It Works', href: '/how-it-works', icon: BookOpen, desc: 'Learn the complete game loop' },
          { label: 'Card Scanner', href: '/scanner', icon: ScanLine, desc: 'AI-powered instant card ID' },
          { label: 'Pack Store', href: '/packs', icon: Package, desc: 'Open packs, hatch MohnSters' },
          { label: 'Battle Arena', href: '/battle', icon: Swords, desc: 'Tactical creature combat' },
        ],
      },
      {
        label: 'Advanced',
        items: [
          { label: 'The Vault', href: '/vault', icon: Lock, desc: 'Insured card storage + yield' },
          { label: '$MOHN Tokenomics', href: '/tokenomics', icon: Coins, desc: 'Supply, burns, and staking' },
        ],
      },
    ],
  },
  {
    label: 'Ecosystem',
    icon: Globe,
    featured: {
      title: 'The Mohn Empire',
      desc: '9 platforms. One token. Real businesses generating real revenue.',
      href: '/empire',
      gradient: 'from-yellow-600 to-amber-700',
      icon: Crown,
    },
    groups: [
      {
        label: 'Live Platforms',
        items: [
          { label: 'NeighborTechs', href: 'https://neighbortechs.com', icon: Wrench, desc: 'IT repair marketplace', badge: 'Live', external: true },
          { label: 'MohnMatrix', href: 'https://mohnmatrix.com', icon: Search, desc: 'Background checks & data', badge: 'Live', external: true },
          { label: 'Flaming Social', href: 'https://flamingsocialmedia.com', icon: Flame, desc: 'Social media marketing', badge: 'Live', external: true },
        ],
      },
      {
        label: 'In Development',
        items: [
          { label: 'MohnMint', href: 'https://mohnmint.com', icon: Coins, desc: '$MOHN token hub & wallet', badge: 'Building', external: true },
          { label: 'MohnSters', href: '/', icon: Gamepad2, desc: 'You are here — creature game', badge: 'Building' },
          { label: 'MohnMenu', href: '#', icon: UtensilsCrossed, desc: 'Commission-free food ordering', badge: 'Building' },
        ],
      },
      {
        label: 'Project Codenames',
        items: [
          { label: 'Project Enforcer', href: '#', icon: Shield, desc: 'Legal SaaS platform', badge: 'Beta' },
          { label: 'Project Grid', href: '#', icon: CircuitBoard, desc: 'IoT payment & access control', badge: 'Beta' },
          { label: 'Project Velocity', href: '#', icon: Truck, desc: 'P2P delivery & moving', badge: 'Planned' },
        ],
      },
    ],
  },
  {
    label: 'Downloads',
    icon: Download,
    groups: [
      {
        label: 'Applications',
        items: [
          { label: 'Web App', href: '#', icon: Monitor, desc: 'Play in your browser — no install needed', badge: 'Coming Soon' },
          { label: 'Android APK', href: '#', icon: Smartphone, desc: 'Direct download — sideload on Android', badge: 'Coming Soon' },
          { label: 'Desktop App', href: '#', icon: Monitor, desc: 'Windows/Mac/Linux — built with Flutter', badge: 'Coming Soon' },
        ],
      },
      {
        label: 'Hardware & Mining',
        items: [
          { label: 'ESP32 Miner Setup', href: '#', icon: Cpu, desc: 'Proof-of-Presence node provisioning', badge: 'Coming Soon' },
          { label: 'Hardware Scanner Kit', href: '#', icon: ScanLine, desc: 'Auto-scan card feeder station', badge: 'Planned' },
        ],
      },
    ],
  },
  {
    label: 'Investors',
    icon: Trophy,
    featured: {
      title: 'Invest in the Mohn Empire',
      desc: 'Real platforms. Real revenue. Talk directly to the founder.',
      href: '/investors',
      gradient: 'from-emerald-600 to-green-700',
      icon: BarChart3,
    },
    groups: [
      {
        label: 'Investor Resources',
        items: [
          { label: 'Investor Relations', href: '/investors', icon: Trophy, desc: 'Pitch deck & valuation' },
          { label: 'Empire Overview', href: '/empire', icon: Building2, desc: 'Full portfolio breakdown' },
          { label: 'Tokenomics', href: '/tokenomics', icon: Coins, desc: 'Supply model & economics' },
        ],
      },
      {
        label: 'Company',
        items: [
          { label: 'Contact Founder', href: 'mailto:richard@mohnmint.com', icon: Mail, desc: 'Talk to Richard directly', external: true },
          { label: 'Privacy Policy', href: '/privacy', icon: FileText, desc: 'How we handle your data' },
          { label: 'Terms of Service', href: '/terms', icon: FileText, desc: 'Usage terms & conditions' },
        ],
      },
    ],
  },
];

const MOBILE_LINKS = [
  { href: '/how-it-works', label: 'How It Works', icon: BookOpen },
  { href: '/scanner', label: 'Scanner', icon: ScanLine },
  { href: '/packs', label: 'Packs', icon: Package },
  { href: '/battle', label: 'Battle', icon: Swords },
  { href: '/vault', label: 'Vault', icon: Lock },
  { href: '/tokenomics', label: '$MOHN', icon: Coins },
  { href: '/empire', label: 'Empire', icon: Globe },
  { href: '/investors', label: 'Investors', icon: Trophy },
];

/* ═══════════════════════════════════════════════════════════
   Desktop Dropdown Component
   ═══════════════════════════════════════════════════════════ */

function DesktopDropdown({ dropdown }: { dropdown: NavDropdown }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Trigger */}
      <button
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all ${
          open
            ? 'text-white bg-white/5'
            : 'text-zinc-400 hover:text-white hover:bg-white/5'
        }`}
        onClick={() => setOpen(!open)}
      >
        {dropdown.icon && <dropdown.icon className="w-4 h-4" />}
        {dropdown.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Panel */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 transition-all duration-200 ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="min-w-[560px] max-w-[680px] rounded-2xl bg-[#0c0c14] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden">
          <div className="flex">
            {/* Main content */}
            <div className="flex-1 p-5">
              <div className={`grid ${dropdown.groups.length > 2 ? 'grid-cols-2 gap-x-6' : 'grid-cols-1'} gap-y-5`}>
                {dropdown.groups.map((group) => (
                  <div key={group.label}>
                    <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-2">{group.label}</h4>
                    <div className="space-y-0.5">
                      {group.items.map((item) => {
                        const Comp = item.external ? 'a' : Link;
                        const extraProps = item.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {};
                        return (
                          <Comp
                            key={item.label}
                            href={item.href}
                            {...(extraProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                            className="group/item flex items-start gap-3 px-2 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors"
                            onClick={() => setOpen(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-purple-500/20 transition-colors">
                              <item.icon className="w-4 h-4 text-purple-400" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-zinc-200 group-hover/item:text-white transition-colors">{item.label}</span>
                                {item.badge && (
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                    item.badge === 'Live' ? 'bg-emerald-500/15 text-emerald-400' :
                                    item.badge === 'Beta' ? 'bg-yellow-500/15 text-yellow-400' :
                                    item.badge === 'Building' ? 'bg-blue-500/15 text-blue-400' :
                                    item.badge === 'Planned' ? 'bg-zinc-500/15 text-zinc-400' :
                                    'bg-zinc-500/15 text-zinc-500'
                                  }`}>
                                    {item.badge}
                                  </span>
                                )}
                                {item.external && <ExternalLink className="w-3 h-3 text-zinc-600" />}
                              </div>
                              {item.desc && (
                                <p className="text-xs text-zinc-500 leading-snug mt-0.5">{item.desc}</p>
                              )}
                            </div>
                          </Comp>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured sidebar */}
            {dropdown.featured && (
              <div className="w-52 bg-white/[0.02] border-l border-white/5 p-5 flex flex-col">
                <div className={`flex-1 rounded-xl bg-gradient-to-br ${dropdown.featured.gradient} p-4 flex flex-col justify-between`}>
                  <div>
                    <dropdown.featured.icon className="w-8 h-8 text-white/80 mb-3" />
                    <h4 className="text-sm font-bold text-white mb-1">{dropdown.featured.title}</h4>
                    <p className="text-xs text-white/70 leading-relaxed">{dropdown.featured.desc}</p>
                  </div>
                  <Link
                    href={dropdown.featured.href}
                    className="mt-4 text-xs font-bold text-white flex items-center gap-1 hover:gap-2 transition-all"
                    onClick={() => setOpen(false)}
                  >
                    Learn more <ChevronDown className="w-3 h-3 -rotate-90" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Navbar
   ═══════════════════════════════════════════════════════════ */

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-header">
      <nav className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
            <span className="text-white font-black text-sm">M</span>
          </div>
          <span className="text-xl font-black tracking-tight">
            Mohn<span className="gradient-text-purple">Sters</span>
          </span>
        </Link>

        {/* Desktop Nav — Mega Menus */}
        <div className="hidden lg:flex items-center gap-0.5">
          {DROPDOWNS.map((d) => (
            <DesktopDropdown key={d.label} dropdown={d} />
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
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
          className="lg:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
          {/* Panel */}
          <div className="fixed inset-y-0 right-0 w-72 bg-[#0a0a0f] border-l border-white/10 z-50 lg:hidden overflow-y-auto">
            <div className="p-5 pt-20">
              <div className="space-y-1">
                {MOBILE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    <link.icon className="w-5 h-5 text-purple-400" />
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Ecosystem links */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-3 px-4">Ecosystem</h4>
                <div className="space-y-1">
                  {[
                    { name: 'NeighborTechs', href: 'https://neighbortechs.com', badge: 'Live' },
                    { name: 'MohnMint', href: 'https://mohnmint.com', badge: 'Building' },
                    { name: 'MohnMatrix', href: 'https://mohnmatrix.com', badge: 'Live' },
                    { name: 'Flaming Social', href: 'https://flamingsocialmedia.com', badge: 'Live' },
                  ].map(p => (
                    <a
                      key={p.name}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                      onClick={() => setMenuOpen(false)}
                    >
                      {p.name}
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        p.badge === 'Live' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-blue-500/15 text-blue-400'
                      }`}>
                        {p.badge}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Download section */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-3 px-4">Downloads</h4>
                <div className="space-y-1">
                  <div className="px-4 py-2.5 text-sm text-zinc-500 flex items-center gap-2">
                    <Monitor className="w-4 h-4" /> Web App <span className="text-[10px] bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded-full ml-auto">Soon</span>
                  </div>
                  <div className="px-4 py-2.5 text-sm text-zinc-500 flex items-center gap-2">
                    <Smartphone className="w-4 h-4" /> Android APK <span className="text-[10px] bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded-full ml-auto">Soon</span>
                  </div>
                  <div className="px-4 py-2.5 text-sm text-zinc-500 flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> ESP32 Miner <span className="text-[10px] bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded-full ml-auto">Soon</span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                <a
                  href="mailto:richard@mohnmint.com"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Mail className="w-4 h-4 text-purple-400" />
                  Contact Founder
                </a>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <button className="btn-primary w-full text-sm py-3">
                  Play Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
