# MohnSters Game Plan V3 — Full Ecosystem Integration

> **Last Updated:** July 2026  
> **Status:** Phase 3 (ESP32 Arena + Egg System + AI Pipeline) in development  
> **Founder:** Richard Mohn · richard@mohnmint.com

---

## 1. Vision Statement

MohnSters is not just a card scanning game — it's the gamification layer for the entire Mohn Empire. Every real-world action across all 9 platforms feeds back into the game, rewarding users with points, character upgrades, evolution paths, and eventually $MOHN tokens. The game drives engagement across the ecosystem, and the ecosystem drives value in the game.

**Core Loop:** Scan Cards → Collect MohnSters → Battle → Earn Points → Use Platforms → Evolve Characters → Repeat

---

## 2. Card Scanning System

### How It Works
1. User opens camera/scanner in the web app or mobile app
2. AI identifies the card (Pokémon, Yu-Gi-Oh!, MTG, sports cards, etc.)
3. Card is added to the user's **portfolio** (collection tracker)
4. A unique **MohnSter character** is generated from the card data
5. Character gets base stats determined by card type, rarity, and element

### Deduplication Algorithm (Anti-Farm)
- **One character per card type per account** — scanning the same Pikachu 50 times only yields ONE MohnSter
- Users CAN add multiple copies of the same card to their portfolio (they might own 5 Pikachus) but the game character is generated only once
- **AI fingerprinting** detects the same card image from different angles/lighting
- **Scan frequency limits** — cooldown between scans to prevent bot abuse
- **Account-level dedup** — server-side validation ensures no duplicate characters exist

### Portfolio vs. Game Characters
| Feature | Card Portfolio | MohnSter Character |
|---------|---------------|-------------------|
| Purpose | Track physical card collection | Game creature for battles |
| Duplicates | Unlimited (own 20 Pikachus) | One per card type per account |
| Value | Card grading & market value | Battle stats & evolution |
| Display | Card image + grade + value | AI-generated creature art |

---

## 3. Character Generation

### From Card → MohnSter
When a card is scanned, the AI generates a MohnSter based on:
- **Card type** → determines element (Fire, Water, Earth, Lightning, Shadow, Crystal)
- **Card rarity** → influences base stat range (Common → Mythic)
- **Card art/theme** → influences creature visual design via AI generation
- **Random seed** → ensures some variation even for same card types

### Base Stats
Every MohnSter has 5 core stats:
- **ATK** — Damage output
- **DEF** — Damage reduction  
- **SPD** — Turn order priority
- **HP** — Health points
- **SP** — Special ability power

### Rarity Tiers
| Tier | Chance | Stat Range | Special |
|------|--------|-----------|---------|
| Common | 50% | 40-60 per stat | — |
| Uncommon | 25% | 55-75 | 1 ability slot |
| Rare | 15% | 70-90 | 2 ability slots |
| Epic | 7% | 85-105 | 2 abilities + passive |
| Legendary | 2.5% | 100-120 | 3 abilities + passive |
| Mythic | 0.5% | 115-140 | 3 abilities + 2 passives |

### Fair Start
Two players scan the exact same card → they get the same base creature with the same base stats. The differentiation comes from:
1. **Leveling** — XP from battles and quests
2. **Evolution** — triggered by real-world Empire activity
3. **Abilities** — unlocked through achievements
4. **Equipment** — earned from packs and milestones

---

## 4. Cross-Platform Evolution System

This is the killer feature. Characters don't just level up from battling — they evolve based on what the user does in real life across the Mohn Empire.

### Evolution Triggers
| Platform | Action | Game Reward |
|----------|--------|------------|
| **MohnMenu** | Order $50+ in food in a week | Character XP boost + rare item drop chance |
| **MohnMenu** | $300+ monthly spend | Chance at rare character variant evolution |
| **NeighborTechs** | Complete an IT repair job | Unlock Tech-type abilities for character |
| **NeighborTechs** | 10+ jobs completed | Achievement: "The Fixer" + stat boost |
| **MohnServe** | Complete a legal serve | Justice achievement + 50 bonus points |
| **MohnServe** | Become a registered agent | Exclusive character badge |
| **MohnPay** | Run an ESP32 mining node | Passive point generation |
| **MohnPay** | Process 100+ transactions | "Grid Master" title + evolution unlock |
| **Flaming Social** | Post daily for 7 days | Social streak multiplier (1.5x XP) |
| **Flaming Social** | 30-day engagement streak | Legendary ability unlock |
| **MohnMatrix** | Complete background check | Trust badge on profile |
| **MohnMove** | Complete delivery | Speed stat boost for character |
| **GPS Check-In** | 30 consecutive days at a location | Legendary evolution path unlocked |
| **GPS Check-In** | Church attendance streak | Special "Faithful" variant drop |

### Evolution Mechanics
1. **Standard Evolution** — Max level (50) → evolves into next form via battle XP
2. **Activity Evolution** — Triggered by cross-platform milestones (e.g., $500 spent on MohnMenu)
3. **DNA Evolution** — Combine two max-level MohnSters → AI generates a completely new hybrid creature
4. **Streak Evolution** — 30/60/90 day activity streaks unlock rare transformation paths

### Character Value
- Characters accumulate value through:
  - Battle stats (higher = more valuable)
  - Rarity of evolution form
  - Achievement badges from ecosystem activity
  - Win/loss record
  - Age (OG characters worth more over time)
- Characters can be **converted back to points** (platform takes a small cut)
- Eventually characters will be tradeable for **$MOHN tokens**

---

## 5. Points & Token Economy

### Phase 1: Points System (Pre-Token)
Points are the in-game currency before $MOHN launches:
- **Earned by:** Scanning cards, winning battles, completing quests, using Empire platforms
- **Spent on:** Opening packs, leveling up MohnSters, buying abilities, unlocking evolution paths
- **Cannot be:** Purchased with real money (earned only)

### Phase 2: $MOHN Token Integration
When the token launches:
- Points convert to $MOHN at a fixed rate
- Characters gain real monetary value
- Marketplace opens for creature trading
- Staking earns additional rewards
- 5% burn on every transaction (deflationary)

### Earning Points
| Action | Points |
|--------|--------|
| Scan a card (first time) | 10-100 |
| Win Quick Battle | 5-20 |
| Win Ranked Battle | 20-100 |
| Tournament 1st Place | 10,000 |
| Daily Login | 5-50 (streak multiplier) |
| Complete Daily Quest | 30-120 |
| Use MohnMenu | 1 point per $1 spent |
| Complete IT Job (NeighborTechs) | 50-200 |
| Complete Legal Serve (MohnServe) | 100 |
| 30-Day GPS Streak | 500 |
| Refer a Friend | 100 |

---

## 6. Web App Dashboard

### Logged-In User Views
When a user logs into the MohnSters web app, they see:

1. **Collection Tab** — Grid of collected cards + MohnSter characters
   - Click a card → modal shows card image + MohnSter character + battle stats
   - Filter by element, rarity, recently scanned
   - Sort by level, power, date acquired

2. **Characters Tab** — Full MohnSter roster
   - Click character → detailed view with:
     - AI-generated creature art
     - Battle stats (ATK/DEF/SPD/HP/SP)
     - Level progress & XP bar
     - Abilities list
     - Achievements earned
     - Evolution progress
     - Ecosystem activity feeding into this character
   - Equip items, assign abilities, manage team

3. **Arena Tab** — Battle section
   - Quick Battle (casual matchmaking)
   - Ranked (competitive seasons)
   - Tournaments (weekly brackets)
   - Battle history & replays
   - *Shows "Coming Soon" until Phase 3*

4. **Points Tab** — Economy dashboard
   - Current point balance
   - Earning history
   - Spending history
   - Conversion rate to $MOHN (when available)
   - Leaderboard (top earners)

5. **Profile Tab** — User settings
   - Avatar & display name
   - Linked social media accounts (Facebook, Instagram, X, TikTok)
   - Linked Mohn Empire platforms
   - GPS check-in history
   - Achievements & badges
   - Privacy settings

---

## 7. Youth & Family Features

### Youth Profiles (Under 18)
- Parent-linked accounts with parental controls
- Age-appropriate content filters
- Spending limits on points
- Social features restricted (no DMs, curated chat)
- **Work permit integration** — If state allows (e.g., Virginia), minors with uploaded work permits can:
  - Participate in MohnMenu delivery (with restrictions)
  - Earn points through verified work activities
  - Build a profile with legitimate earnings
  - Link parent-approved social media

### Kid-Safe Mode
- No token/crypto references (points only)
- Simplified battle interface
- No marketplace trading
- Parental spending controls
- Activity reports sent to parents

### Community Empowerment
- Incentivize positive behavior (church attendance, community service)
- GPS streaks at positive locations earn bonus points
- Encourage real-world activity over screen time
- Youth can earn through legitimate work → game rewards → motivation to stay engaged

---

## 8. Social Media & Marketing Roadmap

### Platforms Needing Pages/Profiles
- [ ] Facebook pages for all 9 Mohn Empire platforms
- [ ] Instagram accounts for all 9 platforms
- [ ] X (Twitter) accounts for all 9 platforms
- [ ] TikTok accounts for game content
- [ ] YouTube channel for tutorials, battles, reveals
- [ ] Discord server for community

### Developer API Integrations
- [ ] Facebook Login + Page linking
- [ ] Instagram Basic Display API
- [ ] X OAuth for profile linking
- [ ] TikTok for Developers
- [ ] Google OAuth (already done)

### Branding
- **The 9-Dot System**: Each platform represented by a dot in the "M" logo
- Consistent color palette across all platforms:
  - NeighborTechs: Indigo/Emerald
  - MohnMint: Purple/Gold
  - MohnMatrix: Dark Blue/Cyan
  - Flaming Social: Red/Orange
  - MohnSters: Purple/Violet
  - MohnMenu: Orange/Red
  - MohnServe: Amber/Justice Gold
  - MohnPay: Cyan/Teal
  - MohnMove: Green/Lime
- **"M" brand**: The letter M is branded across everything — clean, recognizable

### Marketing Materials Needed
- [ ] Logo pack for each platform (SVG, PNG, ICO)
- [ ] Social media banner templates
- [ ] Pitch deck graphics
- [ ] App Store screenshots (when apps launch)
- [ ] Video trailer for MohnSters game
- [ ] Infographic: "How the Mohn Empire Works"

---

## 9. Technical Architecture

### Card Scanner
- **Frontend**: Camera API → capture frame → send to backend
- **Backend**: AI model for card identification (image classification)
- **Database**: Firestore — `scanned_cards` collection with user ID, card fingerprint, timestamp
- **Dedup**: Hash of card type + user ID → check for existing character before generating

### Character Generation
- **Model**: AI generative model takes card data → produces creature stats + visual
- **Storage**: Firestore — `mohnsters` collection with character data, stats, evolution state
- **Images**: Generated creature art stored in Firebase Storage / CDN

### Battle Engine
- **Type**: Turn-based, server-authoritative
- **Matchmaking**: Queue system with ELO-based pairing
- **Validation**: All battle actions validated server-side to prevent cheating
- **Rewards**: Automatic point distribution on battle completion

### Cross-Platform Tracking
- **Unified User ID**: @mohn/empire auth package (already built)
- **Activity Events**: Each platform fires events to a central `user_activity` collection
- **Evolution Engine**: Cloud Function monitors activity events → triggers evolution checks
- **GPS Tracking**: Client-side with consent → check-in validation via server

---

## 10. Priority Roadmap

### Immediate (Next 2 Weeks)
1. ✅ Marketing site with mega-menu navigation
2. ✅ Roadmap page with all phases
3. 🔄 Card scanner beta — get camera working, test AI identification
4. 🔄 Character generation from scan data
5. 🔄 Basic collection/portfolio view

### Short-Term (1-2 Months)
1. Character detail screens with stats
2. Points system (earn from scanning)
3. Daily quests & login streaks
4. Social auth (Facebook, Instagram linking)
5. Youth profile system

### Medium-Term (3-6 Months)
1. Battle engine (Phase 3)
2. Ranked seasons
3. Tournament system
4. Cross-platform activity tracking
5. Evolution triggers from ecosystem

### Long-Term (6-12 Months)
1. DNA Evolution (AI fusion)
2. $MOHN token launch
3. Creature marketplace
4. Full ecosystem integration
5. Mobile app (Flutter)

---

## 11. Competitive Advantages

1. **Real-World Integration** — No other creature game connects to 9 real business platforms
2. **Fair by Design** — One card = one character, no pay-to-win farming
3. **Ecosystem Moat** — The more platforms you use, the stronger your game
4. **Youth Empowerment** — Incentivizes positive behavior, work ethic, community engagement
5. **Token Utility** — Points convert to $MOHN with real cross-platform value
6. **Physical → Digital** — Bridges $35.9B physical card market into digital gaming
7. **DNA Evolution** — AI-generated unique creatures nobody else has
8. **Community-Driven** — GPS streaks, church rewards, social engagement mechanics

---

*This document is the source of truth for MohnSters game design. All development should reference this plan.*

---

## 12. ESP32 MohnNode — Hardware-Powered Gaming

### Overview
The MohnNode is an ESP32 microcontroller that bridges physical hardware and the digital game. Characters "live" inside the node, fighting autonomously, generating eggs, and earning XP 24/7. This is the MohnSters killer feature — no other creature game has real hardware integration.

**Cost to enter:** ~$5 (ESP32 dev board) + USB cable + power adapter.

### Node Capabilities
| Feature | Description |
|---------|-------------|
| **Heartbeat Mining** | Node sends heartbeat every 10 minutes. Each heartbeat = 1 XP for linked character. |
| **AI Arena Battles** | Node ticks every 5 seconds in Arena mode. Server resolves auto-battles. |
| **Passive Egg Generation** | 144 consecutive heartbeats (24h uptime) = 1 new Node-Generated egg. |
| **Supercharge Characters** | Linked MohnSters get 25%–100% stat boost depending on package tier. |
| **GPS Location Bonuses** | Optional GPS module enables location-based creature discovery. |
| **OTA Firmware Updates** | New features pushed automatically over WiFi. |

### Node Modes
| Mode | LED Pattern | Behavior |
|------|-------------|----------|
| **Hibernation** | Slow blue pulse | Passive XP gain (1/heartbeat), egg progress, safe from battles |
| **Arena** | Fast red pulse | AI auto-battle every 5 sec, high risk/reward |
| **Provisioning** | Blue blink | BLE pairing with app/desktop/web |

### The Disconnect Rule (Critical Game Mechanic)
When a node loses WiFi during an Arena battle:
1. Character **digitizes into small particles** (particle scatter animation)
2. Particles swirl and get **sucked back into an orb**
3. Opponent **absorbs the orb** → earns bonus XP + points
4. Disconnected player must wait **5-minute cooldown** to re-enter
5. Reconnecting character has **10% temporary stat reduction** for next battle

This mechanic creates real stakes. Players must maintain stable WiFi to protect their characters. It also prevents abuse (unplug-to-dodge-losses).

### Supercharge Packages
| Package | Cost | Stat Boost | Perks |
|---------|------|-----------|-------|
| **Basic** | 500 pts | +25% all stats | AI auto-battle, passive XP |
| **Advanced** | 2,000 pts | +50% all stats | AI learns from battles, extra ability slot, priority matchmaking |
| **Ultimate** | 10,000 pts | +100% all stats | Adaptive AI, +2 ability slots, unique aura, double XP, legendary ability unlock |

### 7-Step Provisioning Flow
1. Power on ESP32 → LED pulses blue (provisioning mode)
2. Open MohnSters app / desktop node / web dashboard → Nodes → Add New
3. BLE scan discovers nearby MohnNodes
4. Enter WiFi credentials (encrypted, stored in NVS)
5. Authenticate with Mohn Empire account (UID linked permanently)
6. Assign a MohnSter from collection → choose Hibernation or Arena mode
7. LED turns solid green → node is live, character is supercharged

### Technical Specs
- **MCU:** ESP32-WROOM-32
- **WiFi:** 802.11 b/g/n (2.4 GHz)
- **BLE:** 4.2 (provisioning only)
- **GPS:** Optional TinyGPS+ module
- **Storage:** NVS (4KB) for game state, WiFi creds, node ID
- **Protocol:** HTTPS + JSON to Firebase Cloud Functions
- **Framework:** Arduino (PlatformIO)
- **OTA:** Yes, automatic firmware updates

### Node Economy
- Heartbeat = 1 point (capped at 50/day to prevent idle farming abuse)
- Arena wins = 20-100 points depending on opponent level
- Egg generation = free (passive from 24h uptime)
- Supercharge packages = purchased with earned points (not real money)

---

## 13. Egg System — 7 Egg Types

### Egg Types & Rarity Tables
| Egg Type | Source | Steps to Hatch | Mythic Chance |
|----------|--------|----------------|---------------|
| **Card Scan** | Scan a physical trading card | 120 (~20h) | 0.5% |
| **Node-Generated** | 24h consecutive ESP32 uptime | 144 (24h) | 1% |
| **DNA Fusion** | Fuse 2 existing MohnSters | 200 (~33h) | 3% |
| **Ecosystem** | Use other Mohn Empire platforms | 100 (~17h) | 1% |
| **Streak** | Daily login streaks (7/30/90 days) | 72 (12h) | 1% |
| **Tournament** | Win tournament battles | 288 (48h) | 5% |
| **Mystery** | Random drops from activities | 150 (25h) | 3% |

### Hatching Mechanics
- Each "step" = 1 ESP32 heartbeat (10 min) or 1 daily check-in or 1 gameplay action
- ESP32 nodes provide passive step accumulation (1 per heartbeat)
- Fully incubated eggs can be hatched to reveal a MohnSter with element, rarity, and stats determined by the egg type's probability table
- Every hatched creature is 100% unique — AI-generated name, stats, and (eventually) 3D model

### DNA Fusion
- **Cost:** 5,000 points per fusion
- **Parents NOT consumed** — they just go on 24h cooldown
- Offspring inherits traits from both parents: elements, abilities, stat distributions
- Higher rarity parents increase Legendary/Mythic offspring chances
- Creates the deepest collection strategy — breed combinations, discover new forms

---

## 14. AI Character Generation Pipeline

### Multi-Stage Pipeline
The "next gen super AI workflow" that converts card scans into unique, IP-safe 3D characters:

```
Card Scan (Camera/OCR) 
    → Stage 1: IP-Safe Abstraction (strip ALL copyrighted content)
    → Stage 2: Prompt Engineering (build AI generation prompt)
    → Stage 3: 2D Generation (Leonardo.ai — unique character art)
    → Stage 4: 3D Conversion (Meshy.ai — game-ready GLB model)
    → Stage 5: Asset Storage (Firebase Storage + CDN)
    → Stage 6: Collection Add (Firestore)
```

### IP Safety — Critical Legal Requirement
- **ALL franchise names stripped**: Pokémon, MTG, Yu-Gi-Oh, Digimon, Nintendo, Konami, WotC — all blocked
- Card data is **abstracted** to generic attributes: type → element, body → silhouette, rarity → tier
- AI prompt includes comprehensive **negative prompt** blocking all franchise art styles
- Generated creature is **impossible to trace** back to any specific IP
- **Fingerprint dedup**: Same card → same abstraction → same creature stats (but unique visual)

### Cost Per Character
| Stage | Service | Est. Cost |
|-------|---------|-----------|
| 2D Art | Leonardo.ai (4 images) | ~$0.016 |
| 3D Model | Meshy.ai (Image-to-3D) | ~$0.10 |
| Storage | Firebase Storage | ~$0.002 |
| **Total** | | **~$0.12/character** |

### Three.js Viewer Integration
- 3D models rendered in-browser using Three.js (GLB format)
- Auto-rotating turntable with element-colored glow effects
- Neon Dungeon dark environment (bg #0B0E14, fog, rim lighting)
- Embedded in web app, desktop node, and Flutter via WebView

---

## 15. Multi-Platform Deployment

### Platform Matrix
| Platform | Tech Stack | Status | Features |
|----------|-----------|--------|----------|
| **Android APK** | Flutter (Dart 3.5+) | 🔄 In Progress | Full game: scan, collect, eggs, nodes, arena, social |
| **Web App** | Next.js 16 (React 19) | 🔄 In Progress | Marketing + game viewer: arena, eggs, nodes, characters |
| **Desktop Node** | Next.js (MohnCoin webapp) | 🔄 In Progress | Game tab: collection, nodes, eggs, arena |
| **ESP32 Firmware** | Arduino (PlatformIO) | ✅ Built | Heartbeat, arena tick, egg gen, supercharge |
| **Cloud Functions** | Firebase Functions v2 | 🔄 In Progress | AI pipeline, battle resolution, node API |

### Flutter App Structure
```
app/lib/
├── core/
│   ├── models/mohnster.dart          # Freezed creature model
│   └── engine/
│       ├── battle_engine.dart         # Auto-battler AI
│       ├── egg_system.dart            # 7 egg types + hatching
│       ├── node_integration.dart      # ESP32 game state
│       ├── evolution_system.dart      # Cross-empire evolution
│       ├── points_economy.dart        # Earn/spend economy
│       └── card_abstraction.dart      # IP-safe data extraction
├── features/
│   ├── egg_incubator_screen.dart      # Egg UI with animations
│   ├── node_manager_screen.dart       # ESP32 management
│   └── character_detail_screen.dart   # Full character view
└── main.dart                          # 6-tab: Collection, Scan, Eggs, Arena, Nodes, Social
```

---

## 16. Storyline & Lore

### The MohnSter Origin Story
In a world where digital energy seeps through the cracks of everyday technology, a new form of life has emerged — **MohnSters**. Born from the electromagnetic signatures of physical trading cards, these digital creatures exist in the space between the physical and virtual worlds.

**Richard Mohn**, a process server and tech entrepreneur from Virginia, discovered that certain ESP32 microcontrollers could act as **dimensional anchors** — tiny portals that allow MohnSters to stabilize in our world. By linking a creature to a MohnNode, it becomes "supercharged" — drawing power from the physical hardware to grow stronger.

But there's a catch: **connectivity is life**. A MohnSter linked to a node that loses its internet connection will "digitize" — scatter into particles and fade. The creature's energy is absorbed by whoever it was battling. This is the fundamental law of the MohnSter world: **stay connected, or lose everything**.

### The Mohn Empire Connection
The 9 platforms of the Mohn Empire aren't just businesses — they're **energy sources**. Every food delivery (MohnMenu), every tech repair (NeighborTechs), every legal serve (MohnServe), every transaction (MohnPay), every social post (Flaming Social) generates **digital energy** that feeds the MohnSter ecosystem.

This is why MohnSters evolved alongside the Empire. They're not separate from daily life — they ARE daily life, gamified.

### Faction System (Future)
- **The Anchored**: Players who prioritize node stability and long-term hibernation. Their creatures are patient, tanky, and gain steady power over time.
- **The Disconnected**: Rogue players who thrive on the chaos of arena battles. High risk, high reward. Their creatures are aggressive and quick.
- **The Architects**: Players who focus on the ecosystem. They evolve through platform activity rather than battles. Their creatures have rare abilities tied to specific Empire platforms.

### World Events (Future)
- **Node Storms**: Periods when all arena battles yield 2x rewards but disconnect risk increases
- **Migration Events**: New creature types appear in specific GPS regions for limited time
- **Empire Surges**: When a specific Mohn Empire platform hits a milestone, all characters of a certain element get temporary boosts

---

## 17. Market Research & Competitive Positioning

### Industry Context (2026)
- **Creature Collecting Games**: $8.2B market (Pokémon GO alone: $6B+ lifetime revenue)
- **Physical Trading Cards**: $35.9B market globally
- **IoT Gaming**: Virtually untapped — Tamagotchi was the last hardware-creature game ($900M lifetime)
- **Play-to-Earn**: $3.2B market, mostly stagnant — MohnSters offers REAL utility (food, tech, payments)

### Why MohnSters Wins
| Feature | Pokémon GO | Axie Infinity | MohnSters |
|---------|-----------|--------------|-----------|
| Real-world integration | GPS only | None | 9 business platforms |
| Hardware | Phone | None | ESP32 nodes ($5) |
| Physical cards | No | No | YES — bridges $35.9B market |
| Pay-to-win | Yes (raids, incubators) | Yes (Axie marketplace) | No — earn only |
| Token utility | No | Speculative only | Real utility (food, tech, payments) |
| AI-generated | No | No | YES — every creature unique |
| Disconnect mechanic | No | No | YES — creates real stakes |
| Youth-friendly | Yes | No | YES — work permits + parental controls |

### Target Audience
1. **Card collectors** (12-35) — Already own physical cards, want digital integration
2. **Pokémon GO veterans** (18-40) — Want something new with hardware integration
3. **Mohn Empire users** — Already using MohnMenu/NeighborTechs/MohnPay, game is a natural extension
4. **Hardware hobbyists** (ESP32/Arduino community) — Love building things, now there's a game for their hardware
5. **Youth** (13-17) — Gamification of work ethic, positive behavior, community engagement

### Revenue Model
1. **Supercharge packages** (in-game points, not real money)
2. **$MOHN token transaction fees** (5% burn)
3. **ESP32 hardware sales** (optional pre-built nodes at margin)
4. **Cross-platform ecosystem revenue** (game drives engagement → other platforms earn)
5. **Tournament entry fees** (future, token-denominated)

---

*This document is the source of truth for MohnSters game design. All development should reference this plan.*

*© 2026 Mohn Empire · NeighborTechs LLC*
