# MohnSters Game Plan V4 — Living Ecosystem & Real-World Fusion

> **Last Updated:** February 11, 2026
> **Status:** Phase 4 (Unified Life Loop + Arena Engine + Cross-Platform Deployment)
> **Founder:** Richard Mohn · richard@mohnmint.com
> **Previous Versions:** V1 (concept), V2 (production-ready), V3 (ESP32 + eggs + AI pipeline)

---

## What's New in V4

V3 defined the egg system, ESP32 nodes, and AI character pipeline. V4 takes everything further:

1. **Real-Life Action Loop** — Every real-world action (eating food, getting a repair, going to school, scanning a card) feeds back into the game as monster nutrition, ability unlocks, evolution fuel, and points.
2. **Clash Royale-Style Arena** — Top-down square arena with real-time combat, not turn-based RPG.
3. **USB-C Team Battles** — Two ESP32s linked physically for 2v2 team fights.
4. **Education Rewards** — Kids earn points for school attendance, homework, and achievements. School sponsorship model.
5. **Responsive Arena UX** — Mobile gets a compact arena; tablet/desktop gets an expanded view with stats panels removed from tab navigation.
6. **GPS Friend Boost** — Proximity to friends' nodes and profile addresses triggers bonus multipliers.
7. **Card Scanner + Mapbox** — GPS-tagged scans, location-aware creature generation, friend proximity detection.
8. **Desktop + Android + Linux Deployment** — One codebase (Flutter) targeting APK, Windows, macOS, Linux, and web.
9. **$MOHN Token Engineering** — Production-grade Solana SPL token with auditable, hand-tuned code.
10. **Open-Source 3D Asset Strategy** — How to source, generate, and render game-ready 3D characters across all screen sizes.

---

## 1. The Living Ecosystem Loop

### Core Principle
**Everything the user does in real life maps to something in the game.** The MohnSter isn't just a collectible — it's a living AI creature that reacts to your daily life.

### Action → Game Effect Matrix

| Real-World Action | Platform | Game Effect | Monster Reaction |
|-------------------|----------|-------------|-----------------|
| **Order food delivery** | MohnMenu | Monster gets fed → HP restored, mood boost | Monster eating animation, temporary HP regen buff |
| **Spend $20+ on food** | MohnMenu | Nutrition XP → unlocks diet-based abilities | "Well-Fed" status (1.2x ATK for 24h) |
| **Spend $50+ on food in a week** | MohnMenu | Rare food item drop for monster inventory | Chance to unlock "Feast Mode" evolution path |
| **Drink purchase tracked** | MohnMenu | Hydration bonus → SPD buff | Monster gets an energy drink animation, +10% SPD for 4h |
| **Complete an IT repair** | NeighborTechs | Tech-type ability unlock, 50-200 points | Monster learns "Circuit Breaker" or "Overclock" |
| **Receive an IT repair** | NeighborTechs | Repair XP → DEF boost | Monster gets "Patched Up" status — +15% DEF for 24h |
| **Go to school (GPS check-in)** | Education Module | 10-50 points per attendance, streak multiplier | Monster gains "Scholar" trait → +SP permanently at milestones |
| **Complete homework (verified)** | Education Module | Bonus XP + ability slot unlock | "Studious" badge on monster profile |
| **Scan a trading card** | MohnSters | New MohnSter or portfolio entry, 10-100 pts | New creature hatches with card-derived stats |
| **Complete a legal serve** | MohnServe | Justice achievement, 100 pts | Monster learns "Summon" ability (arena utility) |
| **Post on social media daily** | Flaming Social | Social streak multiplier (1.5x XP) | Monster gets "Fame" aura (visible in arena) |
| **Process a payment** | MohnPay | Transaction XP, 1 pt per $1 | "Grid Power" passive — monster recovers HP faster near nodes |
| **Run a mining node** | MohnPay/MohnCoin | Passive point generation, 1/heartbeat | Monster is "Supercharged" — stat boost while node is online |
| **Complete a delivery** | MohnMove | Speed XP, 30-100 pts | Monster gains +SPD permanently per 10 deliveries |
| **Church/community attendance** | GPS Check-In | "Faithful" bonus, 25 pts/visit | Unlock "Guardian" evolution path at 30x streak |

### Monster Needs System
MohnSters are living creatures. They have needs:

| Need | Decay Rate | How to Satisfy | Effect if Neglected |
|------|-----------|----------------|-------------------|
| **Hunger** | -5% per 6 hours | Order food (MohnMenu) OR earn 50+ pts from any activity | ATK drops 20%, monster looks sad |
| **Energy** | -3% per 8 hours | ESP32 node online + heartbeats | SPD drops 15%, monster sleeps in arena |
| **Social** | -2% per 24 hours | Battle another player, post on Flaming Social, visit friend's node | SP drops 10%, abilities cost more |
| **Knowledge** | -1% per 48 hours | School attendance, complete quests, scan cards | XP gain reduced 25% |

**Key Design Decision:** Needs NEVER force purchases. Every need can be satisfied through free gameplay. Ordering food is a SHORTCUT, not a requirement. This keeps it fun, not pay-to-win.

### Food-to-Monster Pipeline
When a user orders through MohnMenu, the system tracks:
1. **Order total** → determines nutrition value (higher spend = better food for monster)
2. **Food category** (eventually per-item tracking):
   - Protein (meat, eggs) → ATK boost
   - Vegetables/salads → HP regen
   - Energy drinks/coffee → SPD boost
   - Desserts/sweets → Mood boost (temporary XP multiplier)
   - Full meals → satisfies Hunger need completely
3. **Frequency** → ordering 3+ times per week unlocks "Regular" bonus (1.1x all stats)
4. **Discovery** → trying a new restaurant for the first time → chance at rare food item drop

This creates a natural flywheel: play game → monster hungry → order food → monster powered up → win battles → earn points → repeat.

---

## 2. Education Rewards System

### Why This Matters
Most kids have smartphones. Gamifying school attendance and achievement drives:
- Real engagement (kids WANT to go to school for monster XP)
- Parental buy-in (parents see grades improving)
- School sponsorship potential (schools pay for licensed MohnSters engagement programs)
- Positive press (gamification for education, not addiction)

### How It Works

#### School Attendance Tracking
1. **GPS geofence** around registered school address
2. Student checks in (automatic if location services enabled, manual button if not)
3. Check-in validated: must be within geofence during school hours
4. Points awarded:
   - Daily attendance: **10 points**
   - 5-day streak (full week): **75 bonus points**
   - 30-day streak (full month): **500 bonus points + Rare egg**
   - Perfect semester: **5,000 bonus points + Legendary egg + "Scholar" title**

#### Homework & Achievement Tracking
- **Phase 1:** Self-reported with parent approval (parent confirms via linked account)
- **Phase 2:** Integration with school management systems (Google Classroom API, Canvas LMS)
- **Phase 3:** Teacher verification dashboard (schools that sponsor get admin tools)

| Achievement | Points | Monster Effect |
|-------------|--------|---------------|
| Homework completed (daily) | 15 | +1 SP per 10 completions |
| Test passed (70%+) | 50 | Ability slot unlock |
| Test aced (90%+) | 100 | Rare ability drop chance |
| Honor roll | 500 | "Honor" badge + evolution path |
| Perfect attendance (month) | 500 | Rare egg + stat boost |
| Perfect attendance (semester) | 5,000 | Legendary egg |

#### School Sponsorship Model
Schools can become MohnSters partners:
- **Free tier:** Students use the app independently, school logo on check-in screen
- **Sponsored tier ($99/mo):** School gets dashboard showing engagement metrics, custom rewards, branded tournaments
- **District tier ($499/mo):** All schools in district, inter-school tournaments, API integration with LMS, attendance analytics

### Youth Safety (Carried from V3)
- Parent-linked accounts with parental controls
- No crypto/token references (points only until 18)
- Simplified battle interface option
- No marketplace trading for minors
- Activity reports sent to parents weekly
- COPPA compliant data handling

---

## 3. Arena System — Clash Royale-Style Combat

### Design Philosophy
**NOT turn-based.** Real-time, top-down, compact arena. Think Clash Royale meets Tamagotchi meets street fighter — your creature fights in a small square arena and you deploy abilities, buffs, and attacks in real-time.

### Arena Layout

#### Mobile (Phone)
```
┌──────────────────────────────┐
│  [P1 Avatar] Lv.34  HP ████ │  ← Player 1 stats bar
│  ATK 92  DEF 71  SPD 78     │
├──────────────────────────────┤
│                              │
│    ┌──────────────────┐      │
│    │                  │      │
│    │   SQUARE ARENA   │      │
│    │   (top-down view)│      │
│    │                  │      │
│    │   P1 🔵    🔴 P2 │      │
│    │                  │      │
│    └──────────────────┘      │
│                              │
├──────────────────────────────┤
│  [P2 Avatar] Lv.28  HP ████ │  ← Player 2 stats bar
│  ATK 75  DEF 82  SPD 70     │
├──────────────────────────────┤
│ [Ability 1] [Ability 2] [⚡] │  ← Action buttons
│ [Buff 1]   [Buff 2]   [🛡️]  │
└──────────────────────────────┘
```

#### Tablet / Desktop / Foldable (Large Screen)
```
┌────────────────────────────────────────────────────────────────┐
│  MohnSters Arena                                    ⚙️  ✕      │
├──────────┬──────────────────────────────────┬──────────────────┤
│          │                                  │                  │
│ P1 PANEL │                                  │ P2 PANEL         │
│          │                                  │                  │
│ [Avatar] │      EXPANDED SQUARE ARENA       │ [Avatar]         │
│ Lv.34    │        (top-down view)           │ Lv.28            │
│          │                                  │                  │
│ HP ████  │                                  │ HP ████          │
│ ATK  92  │       P1 🔵         🔴 P2        │ ATK  75          │
│ DEF  71  │                                  │ DEF  82          │
│ SPD  78  │                                  │ SPD  70          │
│ SP   65  │                                  │ SP   78          │
│          │                                  │                  │
│ ──────── │                                  │ ────────         │
│ Abilities│                                  │ Abilities        │
│ [Slash]  │                                  │ [Torrent]        │
│ [Burn]   │                                  │ [Shield]         │
│ [Dodge]  │                                  │ [Surge]          │
│          │                                  │                  │
│ Buffs    │                                  │ Buffs            │
│ [⚡ ATK] │                                  │ [🛡️ DEF]         │
│ [💨 SPD] │                                  │ [❤️ HP]           │
│          │                                  │                  │
│ Win/Loss │                                  │ Win/Loss         │
│ 42W 12L  │                                  │ 18W 9L           │
│ 77.8%    │                                  │ 66.7%            │
│          │                                  │                  │
├──────────┴──────────────────────────────────┴──────────────────┤
│ Battle Log: Pyrelord uses Slash! → 23 damage to Tidefang      │
└────────────────────────────────────────────────────────────────┘
```

**Key differences on large screens:**
- No tab navigation — everything visible at once
- Side panels show full stats, abilities, buffs, and battle history
- Arena is larger with more detail
- Battle log scrolls at the bottom in real-time
- Spectator mode available (watch friends battle)

### Combat Mechanics

#### Battle Flow
1. **Matchmaking** — Queue enters, ELO-based pairing (or challenge a friend)
2. **3-2-1 Countdown** — Both monsters appear in arena
3. **Real-Time Combat** — Players tap abilities, deploy buffs, dodge
4. **HP Depletion** — First to 0 HP loses
5. **Death Animation** — Loser digitizes into particles → particles swirl to center → form an orb → winner absorbs the orb
6. **Rewards** — Winner gets points (pre-token) or $MOHN (post-token)

#### Ability System
Each MohnSter has ability slots (determined by rarity):
- **Common:** 1 ability slot
- **Uncommon:** 2 ability slots
- **Rare:** 2 abilities + 1 passive
- **Epic:** 3 abilities + 1 passive
- **Legendary:** 3 abilities + 2 passives
- **Mythic:** 4 abilities + 2 passives

Abilities have:
- **Cooldown** (2-15 seconds)
- **Damage/Effect** (scaled by SP stat)
- **Element bonus** (same element = 1.5x damage)
- **Counter system** (elements have strengths/weaknesses)

#### Element Counter Chart
```
Flame  → strong vs Nature  → weak vs Aqua
Aqua   → strong vs Flame   → weak vs Thunder
Thunder → strong vs Aqua   → weak vs Nature
Nature  → strong vs Thunder → weak vs Flame
Shadow  → strong vs Crystal → weak vs Shadow (mirror bonus)
Crystal → strong vs Shadow  → weak vs Crystal (mirror penalty)
```

#### Buffs & Power-Ups
Buffs are consumable items earned through gameplay:
- **ATK Boost** (+20% ATK for 10 seconds)
- **DEF Shield** (+30% DEF for 8 seconds)
- **SPD Rush** (+25% SPD for 12 seconds)
- **HP Regen** (restore 15% HP over 6 seconds)
- **SP Surge** (next ability does 2x damage)
- **Element Shift** (change element for 15 seconds — counter play)

### The Death/Digitize Animation
This is the signature visual of MohnSters arena:
1. Losing monster's HP hits 0
2. Monster freezes, cracks appear (like glass breaking)
3. Body **shatters into hundreds of tiny glowing particles**
4. Particles scatter outward briefly
5. Particles reverse direction, **spiral inward toward center of arena**
6. Particles compress into a **glowing energy orb**
7. Winning monster raises hand/claw → **orb flies to winner**
8. Winner absorbs orb → **flash of light** → points awarded overlay
9. Post-game stats screen

---

## 4. USB-C Team Battles (ESP32 Link Play)

### Concept
Remember the old GameBoy link cables? This is that, but with ESP32s. Two players physically connect their MohnNodes with a USB-C to USB-C cable and battle as a team.

### How It Works
1. **Player A** has Node A with MohnSter A linked
2. **Player B** has Node B with MohnSter B linked
3. They connect via USB-C cable → serial communication established
4. Both nodes must be online (WiFi connected)
5. They enter matchmaking as a **team** — matched against another team (2 other people online) or another local team (2 other USB-C linked nodes)
6. **2v2 Arena** — same top-down arena but bigger, 4 creatures fighting

### Team Battle Arena Layout
```
┌──────────────────────────────────┐
│  TEAM A          vs.     TEAM B  │
│  P1 + P2                P3 + P4  │
├──────────────────────────────────┤
│                                  │
│    🔵A1        🔴B1              │
│                                  │
│         TEAM ARENA               │
│         (larger square)          │
│                                  │
│    🔵A2        🔴B2              │
│                                  │
├──────────────────────────────────┤
│  Combined HP:  ████  vs  ████    │
└──────────────────────────────────┘
```

### Team Synergies
- **Same Element Team:** Both monsters share element → 1.25x damage for both
- **Counter Element Team:** Elements counter each other → no bonus, but more strategic flexibility
- **Complementary Team:** One ATK-focused + one DEF-focused → "Guardian" buff (tank absorbs 30% of partner's damage)
- **Twin Link:** Both same rarity → "Resonance" buff (abilities cost 20% less cooldown)

### Technical Implementation
- **Communication:** USB-C serial (UART bridge at 115200 baud)
- **Protocol:** Simple JSON messages between nodes
  ```json
  {"type": "team_link", "nodeId": "abc123", "mohnsterId": "m1", "action": "ready"}
  {"type": "battle_tick", "hp": 85, "ability_used": "slash", "target": "B1"}
  ```
- **Server Authority:** Both nodes still communicate with the server. The USB-C link is for local coordination and display sync only. All damage calculation is server-side to prevent cheating.
- **Disconnect Handling:** If one node disconnects, partner fights alone (1v2) with a 10% stat boost ("Lone Wolf" buff).

---

## 5. GPS, Mapbox & Friend Boost System

### Mapbox Integration
The game uses Mapbox GL for:
- **Arena Discovery Map** — Find nearby players in arena mode
- **Node Map** — See where your nodes are and their status
- **Friend Map** — See friends who are online and nearby
- **Scan History Map** — Where you've scanned cards (heat map overlay)
- **Event Map** — GPS-locked events, migration zones, regional creatures
- **School Geofencing** — Education module attendance verification

### Card Scanner + GPS
When scanning a trading card:
1. Camera captures card → AI identifies it
2. **GPS coordinates recorded** at scan location
3. Location factors into creature generation:
   - **Home scan** (within 100m of profile address) → "Home Turf" bonus (+5% base stats)
   - **New location** (never scanned there before) → "Explorer" bonus (10 extra points)
   - **Near friend's node** → "Friend Boost" (see below)
   - **At a school** → "Scholar" bonus (+10 Knowledge XP)
   - **At a registered business** → sponsor credit if business is MohnMenu partner

### Friend Boost System
Proximity to friends enhances the game:

| Proximity | Condition | Boost |
|-----------|-----------|-------|
| **Near friend's node** | Within 50m of a friend's ESP32 node GPS coordinates | +15% XP for both, "Neighbor" buff |
| **Same location** | Two friends at same GPS coords (±100m) | +25% XP, enables co-op quests |
| **Home visit** | At friend's registered home address | "House Guest" buff — both monsters get +10% stats for 1h |
| **Scan party** | 3+ friends scanning cards at same location | "Scan Party" event — all scans get +1 rarity tier chance |
| **Node cluster** | 3+ nodes within 200m radius | "Node Mesh" — all linked monsters get +20% passive XP |

### Monster Generation Variables (Expanded from V3)
Creature rarity and stats are now influenced by:
1. **Streak length** (consecutive days active)
2. **GPS verification %** (how often GPS confirmed during incubation)
3. **Incubation time** (longer = better)
4. **Home proximity** (near profile address = small bonus)
5. **Friend proximity** (near friend nodes = bonus)
6. **Monster abilities** (parent MohnSter abilities can influence offspring)
7. **Active power-ups** (any active buffs during hatch)
8. **Ecosystem activity score** (cross-platform engagement in last 30 days)
9. **Node uptime %** (how reliable the hardware has been)
10. **Time of day** (dawn/dusk hatches have slightly different element distribution)

---

## 6. Card Scanner Implementation

### Architecture
```
Camera (phone/webcam/ESP32-CAM)
    → Frame capture (720p minimum)
    → Client-side pre-processing (crop, enhance, rotate)
    → POST /api/cards/scan  { image: base64, gps: {lat, lng}, userId }
    → Server:
        1. AI card identification (card type, set, rarity)
        2. IP-safe abstraction (strip all franchise content)
        3. Dedup check (user already has this card type?)
        4. If new → generate MohnSter (stats, element, name)
        5. If duplicate → add to portfolio only
        6. GPS processing (location bonuses, friend proximity)
        7. Return result to client
    → Client shows new creature reveal animation
```

### AI Card Identification
- **Model:** Fine-tuned image classifier (or cloud AI vision API)
- **Input:** Card image (any angle, any lighting)
- **Output:** `{ cardType, set, rarity, element, bodyType, artStyle }`
- **Supported card games:** Pokémon, Yu-Gi-Oh!, Magic: The Gathering, sports cards, custom
- **Edge cases:** Damaged cards, partial visibility, counterfeit detection (future)

### Mapbox in Scanner
While the scanner camera is active:
- Small Mapbox mini-map in corner showing current location
- Nearby friend indicators (dot markers)
- If near a friend's node → "Friend Boost Active!" banner
- Scan history pins appear on the mini-map

---

## 7. Cross-Platform Deployment Strategy

### The Goal
One codebase. Every platform. No compromise.

### Platform Targets

| Platform | Build Target | Distribution | Priority |
|----------|-------------|-------------|----------|
| **Android APK** | Flutter → APK | Direct download + Google Play Store | P0 (immediate) |
| **Web App** | Next.js 16 (React 19) | mohnsters.com | P0 (exists) |
| **Windows Desktop** | Flutter → MSIX/EXE | Direct download + Microsoft Store | P1 |
| **macOS Desktop** | Flutter → DMG | Direct download + Mac App Store | P2 |
| **Linux Desktop** | Flutter → AppImage/Snap/Flatpak/Deb | Direct download + Snap Store | P2 |
| **iOS** | Flutter → IPA | App Store | P2 (needs Apple Dev account) |
| **ESP32 Firmware** | PlatformIO → binary | OTA updates | ✅ Done |

### Flutter as the Universal Client
The Flutter app (`MohnSters/app/`) is the canonical client. It compiles to:
- Android (APK/AAB)
- iOS (IPA)
- Windows (EXE)
- macOS (DMG)
- Linux (AppImage)
- Web (served by Next.js or standalone)

### Desktop App Features (Not Available on Mobile)
- **Node Management Panel** — See all connected ESP32s, flash firmware, monitor heartbeats
- **Expanded Arena View** — Full side panels (see Section 3 layout)
- **Multi-Account Dashboard** — Manage family accounts from one screen
- **Local Tournament Host** — Run tournaments on your machine, LAN party support
- **Dev Tools** — For power users: node debug console, API logs, battle replay viewer

### Build Pipeline
```
Flutter Source (Dart 3.5+)
    ├── flutter build apk --release          → Android APK
    ├── flutter build appbundle              → Google Play AAB
    ├── flutter build windows --release      → Windows EXE
    ├── flutter build macos --release        → macOS DMG
    ├── flutter build linux --release        → Linux binary
    ├── flutter build web --release          → Web deployment
    └── flutter build ipa --release          → iOS IPA
```

### Linux-Specific Considerations
Many developers and power users run Linux (Debian, Ubuntu, Fedora, Arch). Support them:
- **Snap package** — Easiest cross-distro distribution
- **Flatpak** — Alternative for Flatpak-based distros
- **AppImage** — Portable, no install required
- **Deb package** — For Debian/Ubuntu direct install
- **AUR package** — For Arch users (community-maintained)

---

## 8. $MOHN Token Engineering

### Design Principles
The $MOHN token must be:
1. **Production-grade** — Audited, battle-tested code
2. **Clean architecture** — No shortcuts, no copy-paste from tutorials
3. **Complex where it matters** — Deflationary mechanics, vesting, governance
4. **Simple where it counts** — Easy to use, easy to understand for end users
5. **Industry standard** — Meet or exceed what Solana ecosystem leaders ship

### Token Specifications
| Property | Value |
|----------|-------|
| **Chain** | Solana (SPL Token) |
| **Total Supply** | 100,000,000 $MOHN (fixed, no minting after launch) |
| **Decimals** | 9 |
| **Burn Rate** | 5% on every transaction (deflationary) |
| **Staking APY** | 8-15% (variable, based on platform revenue) |
| **Governance** | 1 token = 1 vote on ecosystem proposals |
| **Vesting** | Team tokens locked 12 months, linear unlock over 24 months |

### Smart Contract Architecture
```
$MOHN Token Program (Solana SPL)
├── Token Mint (fixed supply, mint authority burned after launch)
├── Burn Mechanism (5% of every transfer auto-burned)
├── Staking Program
│   ├── Stake/Unstake logic
│   ├── Reward distribution (from platform revenue pool)
│   └── Lock periods (7/30/90/365 day tiers)
├── Vesting Program
│   ├── Team allocation (12-month cliff, 24-month linear)
│   ├── Advisor allocation (6-month cliff, 18-month linear)
│   └── Community allocation (immediate, no lock)
├── Governance Program
│   ├── Proposal creation
│   ├── Voting (token-weighted)
│   └── Execution (timelock + multisig)
└── Bridge Program (future — cross-chain to Ethereum/Polygon)
```

### Development Approach
- **Hand-written Anchor programs** — No scaffolding tools or template code
- **Full test suite** — Unit tests, integration tests, fuzzing
- **Formal verification** where possible (invariant checking)
- **Multiple audit firms** — At least 2 independent audits before mainnet
- **Testnet deployment first** — Extensive testing on Solana devnet/testnet
- **Open source** — Code published on GitHub for community review
- **Timelocked upgrades** — Any program upgrade requires 48h timelock + 3/5 multisig

### Airdrop Strategy (Early Adopters)
Users who participate before token launch get bonus allocations:
| Qualification | $MOHN Airdrop |
|---------------|---------------|
| Registered user (any platform) | 100 $MOHN |
| ESP32 node operator (30+ days) | 500 $MOHN |
| 90-day activity streak | 1,000 $MOHN |
| Top 100 point earners | 5,000 $MOHN |
| Hatched a Mythic MohnSter | 2,500 $MOHN |
| School attendance streak (semester) | 750 $MOHN |
| Referred 10+ users | 1,000 $MOHN |

---

## 9. 3D Graphics & Asset Strategy

### The Challenge
MohnSters needs game-ready 3D characters across web, mobile, desktop, and (eventually) AR. The art quality must be professional enough to compete with established games while keeping costs near zero.

### Asset Pipeline
```
Source → Generation → Optimization → Platform Delivery

1. AI Generation (Leonardo.ai / Midjourney)
   → 4 concept art views (front, side, back, action pose)
   → Cost: ~$0.016 per character

2. 3D Conversion (Meshy.ai / Tripo3D / InstantMesh)
   → Image-to-3D → GLB/GLTF model
   → Cost: ~$0.10 per character

3. Optimization
   → Reduce poly count for mobile (target: <10K triangles)
   → Bake textures (diffuse, normal, emissive)
   → Generate LOD models (high/medium/low)
   → Cost: Free (automated pipeline)

4. Delivery
   → Mobile: Low-poly model + compressed textures (ASTC/ETC2)
   → Desktop: High-poly model + full PBR textures
   → Web: Medium-poly + Draco compression (Three.js / Babylon.js)
   → ESP32 display: Sprite sheet (128x128 pixel art, auto-generated)
```

### Open Source / Free Asset Resources
These are legitimate sources for maps, environments, effects, and base models:

| Resource | What It Provides | License |
|----------|-----------------|---------|
| **Kenney.nl** | 40,000+ game assets (2D/3D), maps, UI, effects | CC0 (public domain) |
| **OpenGameArt.org** | Community-contributed game art, sprites, 3D models | CC-BY / CC0 / GPL |
| **Quaternius** | Low-poly 3D model packs (characters, environments) | CC0 |
| **Poly Haven** | HDRIs, textures, 3D models (environments, materials) | CC0 |
| **Mixamo** | Free character animations (walk, run, attack, idle) | Free for commercial use |
| **Sketchfab** | Downloadable 3D models (filter by Creative Commons) | Varies (CC-BY, CC0) |
| **itch.io Asset Packs** | Affordable tilesets, character packs, UI kits ($0-$20) | Commercial license |
| **Three.js Examples** | Arena rendering, particle systems, post-processing | MIT |
| **Babylon.js** | Alternative 3D engine, fully open source | Apache 2.0 |

### Arena Map Strategy
For the Clash Royale-style arena:
- **Environment tiles:** Use Kenney or Quaternius base tiles → customize colors/lighting
- **Arena floor:** Simple tiled grid (can be procedurally generated)
- **Arena walls:** Low-poly barriers with element-themed glow effects
- **Particle effects:** Three.js particle system for abilities, death animation, orb absorption
- **Lighting:** Dynamic, element-colored rim lights (flame arena = orange glow, aqua = blue)

### Responsive Rendering
| Device | Renderer | Poly Budget | Texture Size | Target FPS |
|--------|----------|-------------|-------------|-----------|
| Phone (<6") | WebGL (Three.js) or Flutter GPU | 5K triangles | 512x512 | 30 |
| Tablet (7-12") | WebGL or Flutter GPU | 10K triangles | 1024x1024 | 30 |
| Desktop | WebGL (Three.js) | 25K triangles | 2048x2048 | 60 |
| Foldable (unfolded) | WebGL or Flutter GPU | 10K triangles | 1024x1024 | 30 |
| ESP32 OLED | None (sprite-based) | N/A | 128x128 sprites | 10 |

### What You Can Provide (For Richard)
To accelerate 3D asset creation:
1. **Reference art** — Sketch or describe the creature's vibe (e.g., "fire lizard, spiky, aggressive")
2. **Color palettes** — Hex codes or mood boards for each element
3. **Arena theme preferences** — Dark dungeon? Floating island? Tech grid? Lava pit?
4. **Map pack purchases** — Kenney asset packs ($0-3 each), itch.io packs ($5-20)
5. **AI generation credits** — Leonardo.ai or Midjourney subscription for bulk creature generation
6. **Sound effects** — Freesound.org has thousands of free SFX (CC0/CC-BY)

---

## 10. Updated Priority Roadmap

### Phase 4A — Core Game Loop (Weeks 1-4)
| Task | Status | Priority |
|------|--------|----------|
| Card scanner MVP (camera → AI identification → MohnSter generation) | ⬜ | P0 |
| Mapbox API integration (GPS location tracking, geofencing) | ⬜ | P0 |
| Arena engine prototype (Clash Royale-style, single 1v1) | ⬜ | P0 |
| Death/digitize animation (particle scatter → orb → absorb) | ⬜ | P0 |
| Monster needs system (hunger, energy, social, knowledge) | ⬜ | P1 |
| Food-to-monster pipeline (MohnMenu → feeding) | ⬜ | P1 |
| Friend boost system (GPS proximity detection) | ⬜ | P1 |
| Responsive arena layout (mobile vs. tablet/desktop) | ⬜ | P1 |

### Phase 4B — Education & Social (Weeks 5-8)
| Task | Status | Priority |
|------|--------|----------|
| School attendance GPS geofencing | ⬜ | P0 |
| Education points system (attendance, homework, grades) | ⬜ | P0 |
| Parent-linked youth accounts (carry from V3 spec) | ⬜ | P1 |
| Homework verification system (self-report + parent confirm) | ⬜ | P1 |
| School sponsorship dashboard (admin tools for schools) | ⬜ | P2 |
| Google Classroom / Canvas LMS integration | ⬜ | P3 |

### Phase 4C — Cross-Platform Deployment (Weeks 5-10)
| Task | Status | Priority |
|------|--------|----------|
| Android APK build & test | ⬜ | P0 |
| Google Play Store listing | ⬜ | P0 |
| Windows desktop build (Flutter) | ⬜ | P1 |
| Linux build (AppImage + Snap) | ⬜ | P1 |
| macOS build | ⬜ | P2 |
| Desktop node management panel | ⬜ | P2 |
| iOS build + Apple Developer account | ⬜ | P3 |

### Phase 4D — Token & Economy (Weeks 8-16)
| Task | Status | Priority |
|------|--------|----------|
| $MOHN token smart contract (Anchor/Solana) | ⬜ | P0 |
| Token test suite (unit + integration + fuzz) | ⬜ | P0 |
| Devnet deployment & testing | ⬜ | P0 |
| Staking program | ⬜ | P1 |
| Vesting program (team/advisor/community) | ⬜ | P1 |
| Governance program (proposals + voting) | ⬜ | P2 |
| Security audit (2 independent firms) | ⬜ | P1 |
| Mainnet launch | ⬜ | P1 |
| Points → $MOHN conversion | ⬜ | P1 |
| Airdrop distribution | ⬜ | P1 |

### Phase 4E — Advanced Features (Weeks 12-20+)
| Task | Status | Priority |
|------|--------|----------|
| USB-C team battles (ESP32 link play) | ⬜ | P1 |
| 2v2 team arena | ⬜ | P1 |
| AI character 3D generation pipeline | ⬜ | P1 |
| Three.js arena renderer (web + desktop) | ⬜ | P1 |
| DNA Fusion system | ⬜ | P2 |
| Tournament system (brackets, prizes) | ⬜ | P2 |
| Creature marketplace ($MOHN trading) | ⬜ | P2 |
| Spectator mode (watch friends battle live) | ⬜ | P2 |
| AR mode (camera-based creature placement) | ⬜ | P3 |
| Cross-chain bridge (Ethereum/Polygon) | ⬜ | P3 |

---

## 11. Monster Abilities Reference

### Ability Categories
| Category | Description | Examples |
|----------|------------|---------|
| **Damage** | Direct HP reduction | Slash, Fireball, Thunder Strike, Shadow Bolt |
| **Defense** | Reduce incoming damage | Stone Wall, Aqua Shield, Crystal Barrier |
| **Buff** | Temporarily boost own stats | Overclock (+SPD), Enrage (+ATK), Fortify (+DEF) |
| **Debuff** | Temporarily reduce enemy stats | Slow (-SPD), Weaken (-ATK), Corrode (-DEF) |
| **Heal** | Restore HP | Nature's Touch, Life Drain, Crystal Regen |
| **Utility** | Special effects | Teleport (reposition), Scan (reveal hidden stats), Taunt (force target) |

### Ecosystem-Unlocked Abilities
| Platform | Ability Unlocked | Effect |
|----------|-----------------|--------|
| NeighborTechs (5 jobs) | Circuit Breaker | Thunder damage + chance to disable enemy ability for 5s |
| NeighborTechs (20 jobs) | Overclock | +40% SPD for 8s, +20% ATK, but -15% DEF |
| MohnMenu ($100 spend) | Feast | Full HP restore, 60s cooldown |
| MohnMenu ($500 spend) | Chef's Special | Random buff (ATK/DEF/SPD/HP), strength scales with lifetime food spend |
| MohnServe (10 serves) | Summon | Create a temporary decoy that absorbs 1 hit |
| Flaming Social (30-day streak) | Viral | Copy enemy's last used ability for 1 use |
| GPS (90-day streak) | Anchor | Cannot be displaced or debuffed for 6s |
| Education (semester perfect) | Scholar's Insight | See enemy cooldowns and next planned ability for 10s |

---

## 12. Updated Lore (Addition to V3)

### The Ecosystem Awakening
As the Mohn Empire grew, the MohnSters began to change. They weren't just digital creatures anymore — they were reflections of their owners' lives. A monster whose owner ate well grew strong. A monster whose owner studied hard gained wisdom. A monster whose owner connected with friends developed empathy — and empathy, it turned out, was the most powerful stat of all.

The ESP32 nodes weren't just hardware. They were **life anchors** — crystallized fragments of daily existence that gave MohnSters form. The more you lived, the stronger your creature became. And when two anchors connected — when two friends linked their nodes with a simple cable — something extraordinary happened. The creatures **resonated**. Two became stronger than the sum of their parts.

This was the fundamental truth of the MohnSter world: **connection is power.** Not just WiFi connection. Human connection.

---

## 13. Competitive Advantages (Updated)

| # | Advantage | Details |
|---|-----------|---------|
| 1 | **Real-Life Integration** | No other game makes eating food, going to school, or fixing computers part of the gameplay |
| 2 | **Education Gamification** | Schools can sponsor → positive press → built-in distribution to students |
| 3 | **Hardware Gaming** | ESP32 nodes ($5) are the cheapest "gaming console" ever made |
| 4 | **USB-C Team Play** | Physical link battles haven't existed since GameBoy — nostalgic AND novel |
| 5 | **9-Platform Ecosystem** | More platforms = more ways to power up = deeper engagement moat |
| 6 | **Living Creatures** | Monsters have needs — they eat, sleep, learn, socialize. Not just battle bots. |
| 7 | **Fair Economy** | Earn-only, no pay-to-win. Food shortcuts satisfy monster hunger but don't win battles. |
| 8 | **Real Token Utility** | $MOHN works across food delivery, IT repairs, payments, gaming — not just speculation |
| 9 | **Youth Empowerment** | Kids earn through school, homework, positive behavior. Parents love it. |
| 10 | **Cross-Platform Deploy** | One Flutter codebase → Android, Windows, Mac, Linux, iOS, Web |
| 11 | **Open-Source 3D Pipeline** | AI + free assets = professional art at $0.12/character |
| 12 | **GPS + Friend Boost** | Proximity to friends and nodes creates real-world social gaming |

---

*This document is the source of truth for MohnSters game design V4. All development should reference this plan.*

*Previous versions (V1/V2/V3) are preserved for historical context but V4 supersedes all.*

*© 2026 Mohn Empire · NeighborTechs LLC*
