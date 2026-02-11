import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Egg Incubator — Hatch Rare MohnSters from 7 Egg Types',
  description:
    'Discover 7 unique egg types in MohnSters: Card Scan, Ecosystem, DNA Fusion, Streak, Tournament, Node-Generated, and Mystery. Hatch rare creatures and build your collection.',
};

const eggTypes = [
  {
    name: 'Card Scan',
    icon: '📱',
    color: '#6366F1',
    description: 'Scan any trading card (Pokémon, MTG, Yu-Gi-Oh). Our AI strips all copyrighted content and generates a unique MohnSter inspired by the card\'s attributes.',
    rarities: { Common: '30%', Uncommon: '35%', Rare: '25%', Epic: '8%', Legendary: '1.5%', Mythic: '0.5%' },
    steps: 120,
    time: '~20 hours',
  },
  {
    name: 'Node-Generated',
    icon: '🔌',
    color: '#10B981',
    description: 'Your ESP32 node generates an egg after 144 consecutive heartbeats (~24 hours of uptime). Passive egg farming at its finest.',
    rarities: { Common: '40%', Uncommon: '30%', Rare: '20%', Epic: '7%', Legendary: '2%', Mythic: '1%' },
    steps: 144,
    time: '24 hours',
  },
  {
    name: 'DNA Fusion',
    icon: '🧬',
    color: '#EC4899',
    description: 'Fuse two existing MohnSters into one new egg. The result inherits traits from both parents. Costs 5,000 points.',
    rarities: { Common: '5%', Uncommon: '15%', Rare: '35%', Epic: '30%', Legendary: '12%', Mythic: '3%' },
    steps: 200,
    time: '~33 hours',
  },
  {
    name: 'Ecosystem',
    icon: '🌍',
    color: '#F59E0B',
    description: 'Earned by using other Mohn Empire services — order food, hire a tech, get stuff moved. The more you participate, the better the egg.',
    rarities: { Common: '25%', Uncommon: '30%', Rare: '25%', Epic: '15%', Legendary: '4%', Mythic: '1%' },
    steps: 100,
    time: '~17 hours',
  },
  {
    name: 'Streak',
    icon: '🔥',
    color: '#EF4444',
    description: 'Awarded for daily login streaks. 7-day streak = Common egg. 30-day = Rare potential. 90-day = Legendary chances.',
    rarities: { Common: '35%', Uncommon: '30%', Rare: '20%', Epic: '10%', Legendary: '4%', Mythic: '1%' },
    steps: 72,
    time: '12 hours',
  },
  {
    name: 'Tournament',
    icon: '🏆',
    color: '#8B5CF6',
    description: 'Won from tournament victories. Best rarity chances of any egg. Top 3 finishers receive tournament eggs.',
    rarities: { Common: '5%', Uncommon: '15%', Rare: '30%', Epic: '30%', Legendary: '15%', Mythic: '5%' },
    steps: 288,
    time: '48 hours',
  },
  {
    name: 'Mystery',
    icon: '❓',
    color: '#64748B',
    description: 'Random drops from various activities. Could contain anything — from common creatures to ultra-rare mythics.',
    rarities: { Common: '25%', Uncommon: '25%', Rare: '25%', Epic: '15%', Legendary: '7%', Mythic: '3%' },
    steps: 150,
    time: '25 hours',
  },
];

export default function EggsPage() {
  return (
    <main className="min-h-screen bg-[#0B0E14] text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Egg Incubator
          </h1>
          <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
            Collect 7 types of eggs. Hatch unique MohnSters. Every creature is one-of-a-kind.
          </p>
          <p className="text-sm text-gray-500">
            Eggs hatch based on steps — powered by ESP32 heartbeats, daily check-ins, and Mohn Empire activity.
          </p>
        </div>
      </section>

      {/* Egg Type Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {eggTypes.map((egg) => (
            <div
              key={egg.name}
              className="bg-[#1A1D27] rounded-2xl border border-gray-800 overflow-hidden hover:border-opacity-60 transition-all group"
              style={{ ['--egg-color' as string]: egg.color }}
            >
              {/* Egg header */}
              <div
                className="p-6 pb-4"
                style={{ borderBottom: `2px solid ${egg.color}30` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{egg.icon}</span>
                  <h3 className="text-xl font-bold" style={{ color: egg.color }}>
                    {egg.name} Egg
                  </h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{egg.description}</p>
              </div>

              {/* Stats */}
              <div className="p-6 pt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span>Hatch Steps: <strong className="text-white">{egg.steps}</strong></span>
                  <span>Est. Time: <strong className="text-white">{egg.time}</strong></span>
                </div>

                {/* Rarity bars */}
                <div className="space-y-2">
                  {Object.entries(egg.rarities).map(([rarity, chance]) => {
                    const pct = parseFloat(chance);
                    const rarityColors: Record<string, string> = {
                      Common: '#9CA3AF',
                      Uncommon: '#34D399',
                      Rare: '#60A5FA',
                      Epic: '#A78BFA',
                      Legendary: '#FBBF24',
                      Mythic: '#F472B6',
                    };
                    return (
                      <div key={rarity} className="flex items-center gap-2">
                        <span className="text-xs w-20" style={{ color: rarityColors[rarity] }}>
                          {rarity}
                        </span>
                        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${Math.max(pct * 2.5, 3)}%`,
                              background: rarityColors[rarity],
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-10 text-right">{chance}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How Hatching Works */}
        <div className="bg-[#1A1D27] rounded-2xl border border-gray-800 p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">How Hatching Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl mb-3">📥</div>
              <h3 className="font-bold mb-2">1. Get an Egg</h3>
              <p className="text-sm text-gray-400">
                Earn eggs through card scanning, ESP32 node uptime, DNA fusion,
                daily streaks, tournaments, or ecosystem activity across the Mohn Empire.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">⏳</div>
              <h3 className="font-bold mb-2">2. Incubate</h3>
              <p className="text-sm text-gray-400">
                Each egg needs a certain number of &quot;steps&quot; to hatch. Steps come from
                ESP32 heartbeats (1 per 10 min), daily check-ins, and gameplay activity.
                Keep your node online for passive incubation.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">🐣</div>
              <h3 className="font-bold mb-2">3. Hatch</h3>
              <p className="text-sm text-gray-400">
                When fully incubated, hatch your egg to reveal a unique MohnSter.
                Rarity is determined by the egg type&apos;s probability table.
                Every creature gets unique stats, abilities, and AI-generated appearance.
              </p>
            </div>
          </div>
        </div>

        {/* DNA Fusion Deep Dive */}
        <div className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 rounded-2xl border border-pink-800/30 p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            🧬 DNA Fusion
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-4">
                Fuse any two MohnSters from your collection to create a brand-new egg.
                The resulting creature inherits traits from both parents — elements,
                abilities, and stat distributions can combine in unexpected ways.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-pink-400">→</span> Costs 5,000 points per fusion
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-pink-400">→</span> Parent MohnSters are NOT consumed
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-pink-400">→</span> 24-hour cooldown per parent after fusion
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-pink-400">→</span> Higher rarity parents increase Legendary/Mythic chances
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-2xl font-bold shadow-lg shadow-red-500/20">
                  A
                </div>
                <div className="text-2xl">+</div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/20">
                  B
                </div>
                <div className="text-2xl">=</div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-2xl animate-pulse shadow-lg shadow-pink-500/20">
                  🥚
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
