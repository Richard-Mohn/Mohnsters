import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MohnNode — ESP32 Hardware That Powers Your MohnSters',
  description:
    'Get an ESP32 MohnNode to supercharge characters, generate eggs passively, host AI arena battles, and earn points 24/7. The physical backbone of the MohnSters game.',
};

const nodeFeatures = [
  {
    title: 'Heartbeat Mining',
    icon: '💓',
    description:
      'Your node sends a heartbeat every 10 minutes. Each heartbeat earns XP for hibernating MohnSters and progress toward hatching eggs. 144 heartbeats = 1 new egg.',
  },
  {
    title: 'AI Arena Hosting',
    icon: '⚔️',
    description:
      'Switch to Arena mode and your character fights other online MohnSters autonomously. Battles tick every 5 seconds. Win = absorb opponent\'s orb. Lose WiFi = digitize.',
  },
  {
    title: 'Passive Egg Generation',
    icon: '🥚',
    description:
      '24 hours of consecutive uptime generates a Node-Generated egg. Leave it running and your incubator fills itself. Mythic rarity chance: 1%.',
  },
  {
    title: 'Supercharge Characters',
    icon: '⚡',
    description:
      'Link a MohnSter to your node. All stats get boosted (25%-100% depending on package). The character literally lives inside your hardware.',
  },
  {
    title: 'GPS Location Bonuses',
    icon: '📍',
    description:
      'Nodes with GPS modules earn location-based bonuses. Unique MohnSters spawn near specific coordinates. Explore the real world to discover them.',
  },
  {
    title: 'OTA Updates',
    icon: '🔄',
    description:
      'Firmware updates are pushed over-the-air. New game features, battle mechanics, and performance improvements — all automatic.',
  },
];

const provisioningSteps = [
  { step: 1, title: 'Power On', description: 'Connect your ESP32 to USB power. The LED will pulse blue to indicate provisioning mode.' },
  { step: 2, title: 'Open App', description: 'Open MohnSters app (or desktop node, or web dashboard). Navigate to Nodes → Add New Node.' },
  { step: 3, title: 'BLE Scan', description: 'Your device scans for nearby MohnNodes via Bluetooth Low Energy. Tap your node when it appears.' },
  { step: 4, title: 'WiFi Setup', description: 'Enter your WiFi credentials. These are encrypted and stored on the node\'s NVS (Non-Volatile Storage).' },
  { step: 5, title: 'Link Account', description: 'Authenticate with your Mohn Empire account. The node is permanently linked to your UID.' },
  { step: 6, title: 'Assign Character', description: 'Pick a MohnSter from your collection to link. Choose Hibernation mode (passive XP) or Arena mode (active battles).' },
  { step: 7, title: 'Live!', description: 'LED turns solid green. Your node is online, your character is supercharged, and you\'re earning points.' },
];

const specs = [
  { label: 'Microcontroller', value: 'ESP32-WROOM-32' },
  { label: 'WiFi', value: '802.11 b/g/n (2.4 GHz)' },
  { label: 'Bluetooth', value: 'BLE 4.2 (provisioning)' },
  { label: 'GPS', value: 'Optional TinyGPS+ module' },
  { label: 'Heartbeat Interval', value: '10 minutes' },
  { label: 'Arena Tick Rate', value: '5 seconds' },
  { label: 'Egg Generation', value: '144 heartbeats (24 hrs)' },
  { label: 'Power', value: 'USB 5V (< 500mA avg)' },
  { label: 'Storage', value: 'NVS (4KB) for game state' },
  { label: 'OTA Updates', value: 'Yes, automatic' },
  { label: 'Framework', value: 'Arduino (PlatformIO)' },
  { label: 'Protocol', value: 'HTTPS + JSON' },
];

export default function NodesPage() {
  return (
    <main className="min-h-screen bg-[#0B0E14] text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/15 to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full px-4 py-1 mb-6">
            <span className="text-emerald-400 text-sm font-semibold">HARDWARE-POWERED GAMING</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            MohnNode
          </h1>
          <p className="text-xl text-gray-400 mb-4 max-w-2xl mx-auto">
            An ESP32 microcontroller that supercharges your MohnSters. 
            Generate eggs, host AI battles, and earn points — all from a $5 chip running 24/7.
          </p>
          <p className="text-sm text-gray-500">
            Bridges the physical and digital worlds. Your character literally lives in hardware.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-8">What Your Node Does</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {nodeFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#1A1D27] rounded-2xl p-6 border border-gray-800 hover:border-emerald-500/40 transition-all"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Provisioning Flow */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Setup in 7 Steps</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-blue-500 hidden md:block" />

            <div className="space-y-6">
              {provisioningSteps.map((s) => (
                <div key={s.step} className="flex items-start gap-6 relative">
                  {/* Step number */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-lg font-bold flex-shrink-0 z-10">
                    {s.step}
                  </div>
                  {/* Content */}
                  <div className="bg-[#1A1D27] rounded-2xl p-6 border border-gray-800 flex-1">
                    <h3 className="font-bold mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-400">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Node Modes */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl border border-blue-800/30 p-8">
            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
              😴 Hibernation Mode
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>Character sleeps on the node, passively gaining XP (1 per heartbeat)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>Safe mode — no risk of losing battles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>Contributes to egg generation countdown</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>LED pattern: slow blue pulse</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>Best for: leveling up weaker characters safely</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl border border-red-800/30 p-8">
            <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
              ⚔️ Arena Mode
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Character fights other online MohnSters in real-time AI battles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Battles tick every 5 seconds — server resolves the combat</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Win = absorb opponent&apos;s energy orb, earn bonus points + XP</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Disconnect during battle = character digitizes (particle scatter animation)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>LED pattern: fast red pulse during battle, rapid flash on win</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span>Best for: high-level characters with strong stats</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Technical Specifications</h2>
          <div className="bg-[#1A1D27] rounded-2xl border border-gray-800 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`p-4 ${i < specs.length - (specs.length % 4 || 4) ? 'border-b' : ''} border-r border-gray-800/50`}
                >
                  <p className="text-xs text-gray-500 mb-1">{spec.label}</p>
                  <p className="text-sm font-bold">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Build Your Own */}
        <div className="bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 rounded-2xl border border-emerald-800/30 p-8">
          <h2 className="text-2xl font-bold mb-4">Build Your Own Node</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-4">
                MohnNodes are open-source. Grab an ESP32 dev board for $5, flash our firmware,
                and you&apos;re in the game. No proprietary hardware required.
              </p>
              <h3 className="font-bold mb-2 text-emerald-400">Parts List (~$8 total)</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• ESP32-WROOM-32 dev board — $5</li>
                <li>• USB cable — $1</li>
                <li>• USB power adapter — $2</li>
                <li>• (Optional) GPS module — $4</li>
                <li>• (Optional) NeoPixel LED — $0.50</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-cyan-400">Flash Instructions</h3>
              <div className="bg-[#0B0E14] rounded-lg p-4 font-mono text-sm text-gray-300 space-y-1">
                <p className="text-gray-500"># Install PlatformIO</p>
                <p>$ pip install platformio</p>
                <p className="text-gray-500 mt-2"># Clone firmware</p>
                <p>$ git clone https://github.com/mohn/esp32-firmware</p>
                <p className="text-gray-500 mt-2"># Build &amp; flash</p>
                <p>$ cd esp32-firmware</p>
                <p>$ pio run -t upload</p>
                <p className="text-gray-500 mt-2"># Done! Open MohnSters app to provision.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
