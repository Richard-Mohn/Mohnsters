'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Menu, X, Swords, Package, Lock, ScanLine,
  BookOpen, Coins, BarChart3, Trophy, ChevronDown,
  Globe, Shield, Mail, Download, Wallet,
  Cpu, Gamepad2, Crown, Sparkles, Rocket,
  Building2, CircuitBoard,
  Truck, UtensilsCrossed, Flame, Search,
  Smartphone, Monitor, Wrench,
  FileText, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

// --- DATA STRUCTURES (copied from original) ---
interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  desc?: string;
  badge?: string;
  external?: boolean;
  ticker?: string;
  brandColor?: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface NavDropdown {
  id: number;
  label: string;
  icon?: React.ElementType;
  groups: NavGroup[];
  gridMode?: boolean;
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
    id: 1,
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
          { label: 'Roadmap', href: '/roadmap', icon: Rocket, desc: 'Game development phases' },
        ],
      },
    ],
  },
  {
    id: 2,
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
    id: 3,
    label: 'Crypto',
    icon: Coins,
    gridMode: true,
    groups: [
       {
        label: 'Mohn Empire',
        items: [
          { label: '$MOHN', href: '/tokenomics', icon: Coins, ticker: 'M', brandColor: '#8B5CF6', desc: 'MOHN · Utility Token' },
        ],
      },
      {
        label: 'Major Cryptocurrencies',
        items: [
          { label: 'Bitcoin', href: '#', icon: Coins, ticker: '₿', brandColor: '#F7931A', desc: 'BTC · Digital Gold' },
          { label: 'Ethereum', href: '#', icon: Coins, ticker: 'Ξ', brandColor: '#627EEA', desc: 'ETH · Smart Contracts' },
          { label: 'Solana', href: '#', icon: Coins, ticker: 'S', brandColor: '#14F195', desc: 'SOL · High-Speed DeFi' },
          { label: 'Dogecoin', href: '#', icon: Coins, ticker: 'Ð', brandColor: '#C3A634', desc: 'DOGE · Community Currency' },
          { label: 'XRP', href: '#', icon: Coins, ticker: 'X', brandColor: '#23292F', desc: 'XRP · Cross-Border' },
          { label: 'Cardano', href: '#', icon: Coins, ticker: '₳', brandColor: '#0033AD', desc: 'ADA · Proof of Stake' },
        ],
      },
    ],
  },
    {
    id: 4,
    label: 'Downloads',
    icon: Download,
    groups: [
      {
        label: 'Applications',
        items: [
          { label: 'Web App', href: '#', icon: Monitor, desc: 'Play in your browser', badge: 'Coming Soon' },
          { label: 'Android APK', href: '#', icon: Smartphone, desc: 'Direct download for Android', badge: 'Coming Soon' },
          { label: 'Desktop App', href: '#', icon: Monitor, desc: 'Windows/Mac/Linux app', badge: 'Coming Soon' },
        ],
      },
      {
        label: 'Hardware & Mining',
        items: [
          { label: 'ESP32 Miner Setup', href: '#', icon: Cpu, desc: 'Proof-of-Presence node' },
          { label: 'Hardware Scanner Kit', href: '#', icon: ScanLine, desc: 'Auto-scan card feeder' },
        ],
      },
    ],
  },
  {
    id: 5,
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


const VenomGoo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute w-0 h-0">
        <defs>
            <filter id="venom-goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
        </defs>
    </svg>
);


function NavItemContent({ item }: { item: NavItem }) {
  const Comp = item.external ? 'a' : Link;
  const extraProps = item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <Comp
      href={item.href}
      {...(extraProps as any)}
      className="group/item flex items-start gap-3 px-2 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-purple-500/20 transition-colors">
        <item.icon className="w-5 h-5 text-purple-400" />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-zinc-200 group-hover/item:text-white transition-colors">{item.label}</span>
          {item.badge && (
            <span className={clsx(
              "text-[11px] font-bold px-1.5 py-0.5 rounded-full",
              item.badge === 'Live' && 'bg-emerald-500/15 text-emerald-400',
              item.badge === 'Beta' && 'bg-yellow-500/15 text-yellow-400',
              item.badge === 'Building' && 'bg-blue-500/15 text-blue-400',
              item.badge === 'Planned' && 'bg-zinc-500/15 text-zinc-400',
            )}>
              {item.badge}
            </span>
          )}
          {item.external && <ExternalLink className="w-3 h-3 text-zinc-600" />}
        </div>
        {item.desc && <p className="text-[11px] text-zinc-400 leading-relaxed mt-0.5">{item.desc}</p>}
      </div>
    </Comp>
  );
}

function GridItemContent({ item }: { item: NavItem }) {
    const isHighlight = item.href.includes('mohn');
    const Comp = item.external ? 'a' : Link;
    const extraProps = item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
     <Comp
        href={item.href}
        {...(extraProps as any)}
        className={clsx(
            "flex items-center gap-2.5 px-3 py-3 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20",
            isHighlight
              ? 'bg-gradient-to-r from-purple-500/10 to-violet-500/5 border-purple-500/20 hover:border-purple-500/40'
              : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.06] hover:border-white/10'
        )}
    >
        <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-base shrink-0"
            style={{
                backgroundColor: (item.brandColor || '#8B5CF6') + '18',
                color: item.brandColor || '#8B5CF6',
                textShadow: `0 0 12px ${item.brandColor || '#8B5CF6'}40`,
            }}
        >
            {item.ticker || item.label[0]}
        </div>
        <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-zinc-200 truncate">{item.label}</div>
            {item.desc && <div className="text-[11px] text-zinc-500 leading-relaxed truncate">{item.desc}</div>}
        </div>
        {item.external && <ExternalLink className="w-3 h-3 text-zinc-600 shrink-0" />}
    </Comp>
  )
}

function DropdownContent({ dropdown }: { dropdown: NavDropdown }) {
    if (dropdown.gridMode) {
        return (
             <div className="w-[700px] p-5">
                {dropdown.groups.map((group) => (
                    <div key={group.label} className="mb-5 last:mb-0">
                    <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-3 px-1">{group.label}</h4>
                    <div className="grid grid-cols-3 gap-2">
                        {group.items.map((item) => <GridItemContent key={item.label} item={item} />)}
                    </div>
                    </div>
                ))}
            </div>
        )
    }

  return (
    <div className="flex w-[850px]">
      <div className="flex-1 p-5">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          {dropdown.groups.map((group) => (
            <div key={group.label}>
              <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-2">{group.label}</h4>
              <div className="space-y-0.5">
                {group.items.map((item) => <NavItemContent key={item.label} item={item} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
      {dropdown.featured && (
        <div className="w-64 bg-white/[0.02] border-l border-white/5 p-5 flex flex-col">
          <div className={`flex-1 rounded-xl bg-gradient-to-br ${dropdown.featured.gradient} p-4 flex flex-col justify-between`}>
            <div>
              <dropdown.featured.icon className="w-8 h-8 text-white/80 mb-3" />
              <h4 className="text-sm font-bold text-white mb-1">{dropdown.featured.title}</h4>
              <p className="text-xs text-white/70 leading-relaxed">{dropdown.featured.desc}</p>
            </div>
            <Link
              href={dropdown.featured.href}
              className="mt-4 text-xs font-bold text-white flex items-center gap-1 hover:gap-2 transition-all"
            >
              Learn more <ChevronDown className="w-3 h-3 -rotate-90" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export function VenomHeader() {
  const [activeTab, setActiveTab] = useState<NavDropdown | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const handleMouseLeave = (event: React.MouseEvent) => {
    if (!navRef.current?.contains(event.relatedTarget as Node)) {
        setActiveTab(null);
    }
  }

  return (
    <>
      <VenomGoo />
      <header
        className="fixed top-0 inset-x-0 z-50"
        onMouseLeave={handleMouseLeave}
        ref={navRef}
      >
        <nav className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between" style={{ filter: 'url(#venom-goo)' }}>
          {/* Logo and Pills Container */}
          <div className="flex items-center gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0 mr-2">
                <motion.div
                    layoutId="nav-logo"
                    className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow"
                >
                    <span className="text-white font-black text-base">M</span>
                </motion.div>
                <span className="text-2xl font-black tracking-tight">
                    Mohn<span className="gradient-text-purple">Sters</span>
                </span>
            </Link>

            {/* Desktop Nav Pills */}
            <div className="hidden lg:flex items-center gap-1 bg-zinc-900/80 border border-zinc-800 rounded-full h-[46px] px-2 backdrop-blur-xl">
              {DROPDOWNS.map((d) => (
                <div
                  key={d.id}
                  onMouseEnter={() => setActiveTab(d)}
                  className="relative"
                >
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    {d.icon && <d.icon className={clsx("w-4 h-4", activeTab?.id === d.id ? "text-white" : "text-zinc-400")} />}
                    <span className={clsx(activeTab?.id === d.id ? "text-white" : "text-zinc-300")}>{d.label}</span>
                    <ChevronDown className={clsx("w-4 h-4 transition-transform", activeTab?.id === d.id ? "rotate-180 text-white" : "text-zinc-400")} />
                  </button>
                  {activeTab?.id === d.id && (
                    <motion.div
                      layoutId="nav-pill-glow"
                      className="absolute inset-0 bg-purple-500/30 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 140, damping: 20, mass: 1.1 }}
                    />
                  )}
                </div>
              ))}
            </div>
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
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>

        {/* Dropdown Panel */}
        <AnimatePresence>
            {activeTab && (
                <motion.div
                    initial={{ opacity: 0, y: -15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-[calc(100%-10px)] left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        layoutId="nav-dropdown-container"
                        className="rounded-2xl bg-[#0c0c14]/95 border border-white/10 shadow-2xl shadow-black/60 overflow-hidden backdrop-blur-[100px]"
                        transition={{ type: 'spring', stiffness: 140, damping: 20, mass: 1.1 }}
                    >
                        <DropdownContent dropdown={activeTab} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
      </header>
    </>
  );
}
