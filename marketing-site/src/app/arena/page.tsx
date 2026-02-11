import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Arena — Live MohnSter Battles Powered by ESP32 Nodes',
  description:
    'Watch AI-powered MohnSter battles in real-time. Supercharge your character with ESP32 hardware for live arena combat. Earn $MOHN from victories.',
};

const elementColors: Record<string, string> = {
  flame: '#FF6B35',
  aqua: '#00B4D8',
  nature: '#40916C',
  thunder: '#FFD60A',
  shadow: '#9D4EDD',
  crystal: '#E9ECEF',
};

// Demo battle data
const liveBattles = [
  {
    id: 'battle_001',
    fighter1: { name: 'Pyrelord', element: 'flame', level: 34, hp: 85, maxHp: 100, nodeId: 'mohn_a1b2c3' },
    fighter2: { name: 'Tidefang', element: 'aqua', level: 31, hp: 62, maxHp: 95, nodeId: 'mohn_d4e5f6' },
    status: 'fighting',
    viewers: 12,
    lastAction: 'Pyrelord uses Inferno Rush on Tidefang for 23 damage! Super effective!',
  },
  {
    id: 'battle_002',
    fighter1: { name: 'Voltapex', element: 'thunder', level: 42, hp: 110, maxHp: 120, nodeId: 'mohn_g7h8i9' },
    fighter2: { name: 'Shadewraith', element: 'shadow', level: 39, hp: 45, maxHp: 105, nodeId: 'mohn_j0k1l2' },
    status: 'fighting',
    viewers: 8,
    lastAction: 'Shadewraith lands a critical Shadow Pulse! 41 damage!',
  },
];

const recentResults = [
  { winner: 'Bloomstrike', loser: 'Arcpup', xp: 50, points: 20, wasDisconnect: false },
  { winner: 'Frostguard', loser: 'Emberclaw', xp: 75, points: 30, wasDisconnect: true },
  { winner: 'Prismtitan', loser: 'Duskfury', xp: 60, points: 20, wasDisconnect: false },
];

export default function ArenaPage() {
  return (
    <main className="min-h-screen bg-[#0B0E14] text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-full px-4 py-1 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-sm font-semibold">LIVE ARENA</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
            AI Battle Arena
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            MohnSters linked to ESP32 nodes fight autonomously using AI combat logic.
            Watch live battles, earn points from victories, and supercharge your characters
            with real hardware.
          </p>
        </div>
      </section>

      {/* Live Battles */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          Live Battles
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {liveBattles.map((battle) => (
            <div
              key={battle.id}
              className="bg-[#1A1D27] rounded-2xl border border-gray-800 overflow-hidden hover:border-purple-500/50 transition-all"
            >
              {/* Battle header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#12151E]">
                <span className="text-sm text-gray-400">Battle #{battle.id.slice(-3)}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">👁 {battle.viewers} watching</span>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
              </div>

              {/* Fighters */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  {/* Fighter 1 */}
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl font-bold"
                      style={{
                        background: `linear-gradient(135deg, ${elementColors[battle.fighter1.element]}, ${elementColors[battle.fighter1.element]}80)`,
                        boxShadow: `0 0 20px ${elementColors[battle.fighter1.element]}40`,
                      }}
                    >
                      {battle.fighter1.name[0]}
                    </div>
                    <p className="font-bold text-sm">{battle.fighter1.name}</p>
                    <p className="text-xs text-gray-500">Lv.{battle.fighter1.level}</p>
                    <p className="text-xs font-mono text-gray-600">{battle.fighter1.nodeId}</p>
                  </div>

                  {/* VS */}
                  <div className="text-3xl font-bold text-purple-500 animate-pulse">⚔️</div>

                  {/* Fighter 2 */}
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl font-bold"
                      style={{
                        background: `linear-gradient(135deg, ${elementColors[battle.fighter2.element]}, ${elementColors[battle.fighter2.element]}80)`,
                        boxShadow: `0 0 20px ${elementColors[battle.fighter2.element]}40`,
                      }}
                    >
                      {battle.fighter2.name[0]}
                    </div>
                    <p className="font-bold text-sm">{battle.fighter2.name}</p>
                    <p className="text-xs text-gray-500">Lv.{battle.fighter2.level}</p>
                    <p className="text-xs font-mono text-gray-600">{battle.fighter2.nodeId}</p>
                  </div>
                </div>

                {/* HP Bars */}
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: elementColors[battle.fighter1.element] }}>{battle.fighter1.name}</span>
                      <span>{battle.fighter1.hp}/{battle.fighter1.maxHp}</span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(battle.fighter1.hp / battle.fighter1.maxHp) * 100}%`,
                          background: elementColors[battle.fighter1.element],
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: elementColors[battle.fighter2.element] }}>{battle.fighter2.name}</span>
                      <span>{battle.fighter2.hp}/{battle.fighter2.maxHp}</span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(battle.fighter2.hp / battle.fighter2.maxHp) * 100}%`,
                          background: elementColors[battle.fighter2.element],
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Last Action */}
                <div className="bg-[#0B0E14] rounded-lg p-3 text-sm text-gray-300 font-mono">
                  &gt; {battle.lastAction}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">How ESP32 Arena Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Get ESP32 Node',
                desc: 'Purchase or build your own MohnNode with an ESP32 microcontroller.',
                icon: '🔧',
              },
              {
                step: '2',
                title: 'Supercharge Character',
                desc: 'Link your MohnSter to the node. Choose Arena mode for AI battles.',
                icon: '⚡',
              },
              {
                step: '3',
                title: 'AI Fights Autonomously',
                desc: 'Your character battles other online MohnSters using AI combat logic. Every punch, every dodge — powered by your ESP32.',
                icon: '🤖',
              },
              {
                step: '4',
                title: 'Earn or Lose',
                desc: 'Win = absorb opponent\'s orb + earn points. Lose WiFi = character digitizes into particles and disappears.',
                icon: '💰',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-[#1A1D27] rounded-2xl p-6 border border-gray-800 hover:border-purple-500/40 transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-purple-400 text-sm font-bold mb-2">Step {item.step}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Supercharge Packages */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Supercharge Packages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Basic Supercharge',
                cost: '500 Points',
                color: '#6366F1',
                perks: ['+25% all stats', 'AI auto-battle', 'Passive XP generation'],
              },
              {
                name: 'Advanced Supercharge',
                cost: '2,000 Points',
                color: '#8B5CF6',
                perks: ['+50% all stats', 'AI learns from battles', 'Extra ability slot', 'Priority matchmaking', 'Node uptime bonus'],
                popular: true,
              },
              {
                name: 'Ultimate Supercharge',
                cost: '10,000 Points',
                color: '#F59E0B',
                perks: ['+100% all stats', 'Adaptive AI strategy', '+2 ability slots', 'Unique aura effect', 'Double XP', 'Legendary ability unlock', 'Exclusive tournaments'],
              },
            ].map((pkg) => (
              <div
                key={pkg.name}
                className={`bg-[#1A1D27] rounded-2xl p-6 border ${pkg.popular ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-gray-800'} relative`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2" style={{ color: pkg.color }}>
                  {pkg.name}
                </h3>
                <p className="text-2xl font-bold mb-4">{pkg.cost}</p>
                <ul className="space-y-2">
                  {pkg.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-green-400">✓</span> {perk}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full mt-6 py-3 rounded-xl font-bold text-white transition-all hover:brightness-110"
                  style={{ background: pkg.color }}
                >
                  Supercharge
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Disconnect Mechanic */}
        <div className="mb-16 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-2xl border border-red-800/30 p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span>⚠️</span> The Disconnect Rule
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-red-400 mb-3">When Your Node Loses Connection</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">→</span>
                  <span>Your character <strong>digitizes into small particles</strong> and disappears from the arena</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">→</span>
                  <span>The particles swirl, get <strong>sucked back into an orb</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">→</span>
                  <span>Your <strong>opponent absorbs the orb</strong> and gets bonus points</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">→</span>
                  <span>You need to <strong>reconnect</strong> to re-enter the arena (5 min cooldown)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-400 mb-3">When You Win a Battle</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Opponent&apos;s particles form an <strong>energy orb</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Your character <strong>absorbs the orb</strong> — gains XP + points</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Points can be used across the <strong>entire Mohn Empire</strong> — order food, hire a tech, get stuff moved</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Results */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Battle Results</h2>
          <div className="bg-[#1A1D27] rounded-2xl border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-800">
                  <th className="px-6 py-3">Winner</th>
                  <th className="px-6 py-3">Defeated</th>
                  <th className="px-6 py-3">XP Earned</th>
                  <th className="px-6 py-3">Points</th>
                  <th className="px-6 py-3">Type</th>
                </tr>
              </thead>
              <tbody>
                {recentResults.map((result, i) => (
                  <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="px-6 py-4 text-green-400 font-bold">{result.winner}</td>
                    <td className="px-6 py-4 text-red-400">{result.loser}</td>
                    <td className="px-6 py-4">+{result.xp} XP</td>
                    <td className="px-6 py-4 text-amber-400">+{result.points}</td>
                    <td className="px-6 py-4">
                      {result.wasDisconnect ? (
                        <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">Disconnect</span>
                      ) : (
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Battle</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
