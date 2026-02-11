import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MohnSter Collection — Creatures Born from AI & Hardware',
  description:
    'Browse MohnSter creature types, elements, rarities, and evolution paths. Every character is AI-generated, one-of-a-kind, and can be supercharged with ESP32 hardware.',
};

const elements = [
  { name: 'Flame', color: '#FF6B35', icon: '🔥', strong: 'Nature', weak: 'Aqua', desc: 'Raw destructive power. High ATK, lower DEF.' },
  { name: 'Aqua', color: '#00B4D8', icon: '💧', strong: 'Flame', weak: 'Thunder', desc: 'Adaptive resilience. Balanced stats, healing abilities.' },
  { name: 'Nature', color: '#40916C', icon: '🌿', strong: 'Thunder', weak: 'Flame', desc: 'Slow and steadfast. High HP, regeneration over time.' },
  { name: 'Thunder', color: '#FFD60A', icon: '⚡', strong: 'Aqua', weak: 'Nature', desc: 'Speed and precision. Highest SPD, crit bonus.' },
  { name: 'Shadow', color: '#9D4EDD', icon: '🌑', strong: 'Crystal', weak: 'Crystal', desc: 'Deception and debuffs. Evasion-based, status effects.' },
  { name: 'Crystal', color: '#E9ECEF', icon: '💎', strong: 'Shadow', weak: 'Shadow', desc: 'Pure energy. High SP (special), barrier abilities.' },
];

const rarities = [
  { name: 'Common', color: '#9CA3AF', statRange: '40–60', chance: 'Most eggs', desc: 'The everyday MohnSter. Reliable, trainable, plentiful.' },
  { name: 'Uncommon', color: '#34D399', statRange: '55–75', chance: 'Frequent', desc: 'A step above. Slightly stronger base stats and one ability slot.' },
  { name: 'Rare', color: '#60A5FA', statRange: '70–90', chance: 'Moderate', desc: 'Noticeably powerful. Good stat spread, 2 ability slots, unique color palette.' },
  { name: 'Epic', color: '#A78BFA', statRange: '85–105', chance: 'Uncommon', desc: 'Tournament-viable. Strong abilities, 3 slots, distinctive silhouette.' },
  { name: 'Legendary', color: '#FBBF24', statRange: '100–120', chance: 'Rare', desc: 'Feared in the arena. Exceptional stats, 4 ability slots, particle effects.' },
  { name: 'Mythic', color: '#F472B6', statRange: '115–135', chance: 'Ultra-rare', desc: 'One in a thousand. Maximum stat potential, unique passive, animated aura.' },
];

const sampleCreatures = [
  { name: 'Pyrelord', element: 'Flame', rarity: 'Epic', level: 34, stats: { ATK: 92, DEF: 71, SPD: 78, HP: 88, SP: 65 } },
  { name: 'Tidefang', element: 'Aqua', rarity: 'Rare', level: 28, stats: { ATK: 75, DEF: 82, SPD: 70, HP: 85, SP: 78 } },
  { name: 'Voltapex', element: 'Thunder', rarity: 'Legendary', level: 42, stats: { ATK: 88, DEF: 76, SPD: 115, HP: 95, SP: 82 } },
  { name: 'Bloomstrike', element: 'Nature', rarity: 'Uncommon', level: 19, stats: { ATK: 62, DEF: 68, SPD: 55, HP: 75, SP: 58 } },
  { name: 'Shadewraith', element: 'Shadow', rarity: 'Epic', level: 39, stats: { ATK: 85, DEF: 65, SPD: 98, HP: 78, SP: 90 } },
  { name: 'Prismtitan', element: 'Crystal', rarity: 'Mythic', level: 50, stats: { ATK: 105, DEF: 110, SPD: 88, HP: 120, SP: 130 } },
];

const elementColorMap: Record<string, string> = {
  Flame: '#FF6B35', Aqua: '#00B4D8', Nature: '#40916C', Thunder: '#FFD60A', Shadow: '#9D4EDD', Crystal: '#E9ECEF',
};

const rarityColorMap: Record<string, string> = {
  Common: '#9CA3AF', Uncommon: '#34D399', Rare: '#60A5FA', Epic: '#A78BFA', Legendary: '#FBBF24', Mythic: '#F472B6',
};

export default function CharactersPage() {
  return (
    <main className="min-h-screen bg-[#0B0E14] text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/15 to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            MohnSters
          </h1>
          <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
            AI-generated creatures born from card scans, node farming, and DNA fusion.
            Every MohnSter is unique. Every battle is autonomous.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        {/* Elements */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">6 Elements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {elements.map((el) => (
              <div
                key={el.name}
                className="bg-[#1A1D27] rounded-2xl p-5 border border-gray-800 hover:border-opacity-60 transition-all"
                style={{ borderColor: `${el.color}30` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{el.icon}</span>
                  <h3 className="text-lg font-bold" style={{ color: el.color }}>{el.name}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">{el.desc}</p>
                <div className="flex gap-4 text-xs">
                  <span className="text-green-400">Strong vs {el.strong}</span>
                  <span className="text-red-400">Weak vs {el.weak}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Element Triangle */}
          <div className="mt-6 bg-[#1A1D27] rounded-2xl p-6 border border-gray-800 text-center">
            <p className="text-sm text-gray-400 mb-2">Element Advantage Wheel</p>
            <p className="font-mono text-lg">
              <span style={{ color: '#FF6B35' }}>🔥 Flame</span>
              {' → '}
              <span style={{ color: '#40916C' }}>🌿 Nature</span>
              {' → '}
              <span style={{ color: '#FFD60A' }}>⚡ Thunder</span>
              {' → '}
              <span style={{ color: '#00B4D8' }}>💧 Aqua</span>
              {' → '}
              <span style={{ color: '#FF6B35' }}>🔥 Flame</span>
            </p>
            <p className="font-mono mt-2">
              <span style={{ color: '#9D4EDD' }}>🌑 Shadow</span>
              {' ↔ '}
              <span style={{ color: '#E9ECEF' }}>💎 Crystal</span>
              <span className="text-gray-500 text-sm"> (Mutual advantage)</span>
            </p>
          </div>
        </div>

        {/* Rarities */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">6 Rarity Tiers</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rarities.map((r) => (
              <div key={r.name} className="bg-[#1A1D27] rounded-2xl p-5 border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold" style={{ color: r.color }}>{r.name}</h3>
                  <span className="text-xs text-gray-500">{r.chance}</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{r.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Stat Range:</span>
                  <div className="h-2 flex-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${((parseInt(r.statRange.split('–')[1]) / 135) * 100)}%`,
                        background: `linear-gradient(90deg, ${r.color}60, ${r.color})`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono" style={{ color: r.color }}>{r.statRange}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Collection */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Sample Collection</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCreatures.map((creature) => (
              <div
                key={creature.name}
                className="bg-[#1A1D27] rounded-2xl border border-gray-800 overflow-hidden hover:border-purple-500/40 transition-all"
              >
                {/* Avatar */}
                <div
                  className="h-32 flex items-center justify-center relative"
                  style={{
                    background: `linear-gradient(135deg, ${elementColorMap[creature.element]}20, ${elementColorMap[creature.element]}05)`,
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black"
                    style={{
                      background: `linear-gradient(135deg, ${elementColorMap[creature.element]}, ${elementColorMap[creature.element]}80)`,
                      boxShadow: `0 0 30px ${elementColorMap[creature.element]}40`,
                    }}
                  >
                    {creature.name[0]}
                  </div>
                  <span
                    className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${rarityColorMap[creature.rarity]}20`,
                      color: rarityColorMap[creature.rarity],
                      border: `1px solid ${rarityColorMap[creature.rarity]}40`,
                    }}
                  >
                    {creature.rarity}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold">{creature.name}</h3>
                    <span className="text-sm text-gray-500">Lv.{creature.level}</span>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full mb-4 inline-block"
                    style={{
                      background: `${elementColorMap[creature.element]}20`,
                      color: elementColorMap[creature.element],
                    }}
                  >
                    {creature.element}
                  </span>

                  {/* Stats */}
                  <div className="space-y-2 mt-3">
                    {Object.entries(creature.stats).map(([stat, value]) => {
                      const maxStat = 135;
                      const statColors: Record<string, string> = {
                        ATK: '#EF4444', DEF: '#3B82F6', SPD: '#F59E0B', HP: '#10B981', SP: '#8B5CF6',
                      };
                      return (
                        <div key={stat} className="flex items-center gap-2">
                          <span className="text-xs w-8 font-mono" style={{ color: statColors[stat] }}>{stat}</span>
                          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${(value / maxStat) * 100}%`,
                                background: statColors[stat],
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8 text-right">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evolution Paths */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Cross-Empire Evolution</h2>
          <p className="text-gray-400 mb-6">
            MohnSters don&apos;t just evolve through battle — they evolve through your activity across
            the entire Mohn Empire ecosystem. Every platform contributes.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { path: 'Gastro Path', source: 'MohnMenu', icon: '🍔', req: 'Complete 10+ food deliveries', boost: '+25% HP per stage' },
              { path: 'Valor Path', source: 'NeighborTechs', icon: '🔧', req: 'Complete 5+ tech jobs', boost: '+25% ATK per stage' },
              { path: 'Service Path', source: 'MohnServe', icon: '📋', req: 'Complete 5+ legal serves', boost: '+25% SPD per stage' },
              { path: 'Commerce Path', source: 'MohnPay', icon: '💳', req: 'Process $100+ in transactions', boost: '+25% SP per stage' },
              { path: 'Social Path', source: 'Flaming Social', icon: '🔥', req: 'Reach 50+ engagement points', boost: '+25% DEF per stage' },
            ].map((evo) => (
              <div key={evo.path} className="bg-[#1A1D27] rounded-2xl p-5 border border-gray-800">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{evo.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm">{evo.path}</h3>
                    <p className="text-xs text-gray-500">via {evo.source}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-2">{evo.req}</p>
                <p className="text-xs text-emerald-400">{evo.boost}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card Scanning */}
        <div className="bg-gradient-to-r from-indigo-900/20 to-violet-900/20 rounded-2xl border border-indigo-800/30 p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            📱 Card Scanning → MohnSter Generation
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-4">
                Scan any real trading card (Pokémon, Magic, Yu-Gi-Oh, etc.) to generate a unique MohnSter.
                Our AI pipeline strips ALL copyrighted content and creates a 100% original creature.
              </p>
              <h3 className="font-bold text-indigo-400 mb-2">How It Works</h3>
              <ol className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">1.</span>
                  <span>Camera captures the card → OCR extracts text</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">2.</span>
                  <span>AI abstracts attributes: type → element, rarity → tier, body type → silhouette</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">3.</span>
                  <span>ALL franchise names, artwork, copyrighted text is REMOVED</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">4.</span>
                  <span>Generic prompt → Leonardo.ai generates unique 2D → Meshy.ai converts to 3D</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">5.</span>
                  <span>Result: A completely original creature impossible to trace to any IP</span>
                </li>
              </ol>
            </div>
            <div className="flex items-center justify-center">
              <div className="space-y-3 text-center">
                <div className="bg-[#0B0E14] rounded-xl p-4 border border-indigo-800/30">
                  <p className="text-xs text-gray-500 mb-1">Input (abstracted)</p>
                  <p className="font-mono text-xs text-indigo-300">
                    element: flame | body: winged-quadruped | rarity: epic | palette: red-orange
                  </p>
                </div>
                <div className="text-2xl">↓ AI Pipeline ↓</div>
                <div className="bg-[#0B0E14] rounded-xl p-4 border border-purple-800/30">
                  <p className="text-xs text-gray-500 mb-1">Output</p>
                  <p className="font-mono text-xs text-purple-300">
                    Unique 3D MohnSter with original design, stats, and abilities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
