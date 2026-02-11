# MohnSters Game Plan V6 — On-Device Gaming, ESP-NOW Battles, Kiosk Distribution & MOHN Pass Ecosystem

> **Last Updated:** February 11, 2026
> **Status:** Phase 6 (Device Gaming + Micro-Delivery + Kiosk Distribution)
> **Founder:** Richard Mohn · richard@mohnmint.com
> **Previous Versions:** V1 (concept), V2 (production), V3 (ESP32 + eggs), V4 (life loop + arena), V5 (subscriptions + provisioning)

---

## What's New in V6

V5 defined the commercial infrastructure (subscriptions, drop-shipping, phone provisioning). V6 adds **three major expansions**:

1. **On-Device Mini-Game** — A real playable game directly on the ESP32 node, not just status screens
2. **ESP-NOW Auto-Battle** — Two ESP32 nodes battle each other wirelessly without WiFi infrastructure
3. **Controller Support** — Bluetooth BLE gamepads and USB-C OTG controllers for gameplay
4. **MOHN Pass Ecosystem** — A unified pass that connects micro-delivery, rides, marketplace gigs, and node ownership
5. **Kiosk Distribution** — Physical QR-code dispensers at malls, stores, and community hubs
6. **Micro-Delivery & Rides** — $3-5 hyper-local tasks integrated into the gig marketplace

---

## 1. On-Device Mini-Game (The MohnSter Arena)

### Why a Game ON the Device?
The node currently shows status screens (stats, habitat, wallet, system). That's monitoring — not gaming. People want to **play**. The T190's 170×320 ST7789 display and two GPIO buttons are enough for a compelling mini-game. Plus, if their phone dies, the device is still playable standalone.

### Game Design: "MohnSter Clash"

A real-time auto-battler played directly on the ESP32's screen. Your creature fights AI opponents or (via ESP-NOW) another player's device.

**Display Layout (170×320 portrait):**
```
┌──────────────────────────┐ ← Y=0
│  YOUR MOHNSTER  HP ████  │ ← Status bar (20px)
├──────────────────────────┤
│                          │
│     ┌───────┐            │
│     │ YOUR  │            │ ← Your creature (left side)
│     │SPRITE │            │
│     └───────┘            │
│           ⚡ 💥 ✨        │ ← Battle effects zone
│            ┌───────┐     │
│            │ ENEMY │     │ ← Enemy creature (right side)
│            │SPRITE │     │
│            └───────┘     │
│                          │
├──────────────────────────┤
│  ENEMY  HP ████████      │ ← Enemy status (20px)
├──────────────────────────┤
│  ATK: Slash   DEF: Guard │ ← Ability bar (30px)
│  [BTN0=Act]  [BTN1=Swap] │ ← Button hints
└──────────────────────────┘ ← Y=320
```

### Battle Mechanics (On-Device)

**Core Loop (runs every 500ms):**
1. Both creatures have HP, ATK, DEF, SPD stats (derived from heartbeat data + growth stage)
2. Every tick, each creature auto-attacks based on SPD (faster creature hits first)
3. Damage = ATK × (1 - DEF/100), with ±10% random variance
4. Player can press BTN_USER to activate special ability (cooldown-based)
5. Player can press BTN_NEXT to swap defense stance (reduce incoming damage 50% for 2 ticks)
6. First creature to 0 HP loses

**Stat Derivation from Node Data:**
| Growth Stage | Base HP | Base ATK | Base DEF | Base SPD |
|--|--|--|--|--|
| Egg (0-36 beats) | 20 | 5 | 3 | 2 |
| Hatchling (37-72) | 50 | 12 | 8 | 5 |
| Juvenile (73-108) | 80 | 20 | 14 | 8 |
| Adult (109-144) | 120 | 30 | 20 | 12 |
| Evolved (144+) | 180 | 45 | 30 | 18 |

**Bonus:** Every 100 heartbeats beyond 144 adds +5 HP, +2 ATK, +1 DEF, +1 SPD (soft cap at 500 beats).

**Special Abilities (one per growth stage):**
| Stage | Ability | Effect | Cooldown |
|--|--|--|--|
| Hatchling | Bite | 1.5× ATK single hit | 5 ticks |
| Juvenile | Roar | -20% enemy ATK for 3 ticks | 8 ticks |
| Adult | Charge | 2× ATK + self-damage 10% HP | 6 ticks |
| Evolved | Inferno | 3× ATK AoE (hits through DEF) | 12 ticks |

### AI Opponents (Offline Play)

When not battling another device, the node generates AI opponents based on difficulty tiers:
- **Easy:** Stats = 60% of player's stats
- **Medium:** Stats = 90% of player's stats
- **Hard:** Stats = 120% of player's stats + random ability usage
- **Boss:** Stats = 150% + 2 abilities, appears every 10 wins

Win/loss streaks modify XP rewards:
- Win: +5 XP (streak bonus: +2 per consecutive win, max +20)
- Loss: +1 XP (consolation)
- Boss kill: +25 XP

### Controller Support

**The ESP32-S3 Problem:**
The ESP32-S3 only supports BLE (Bluetooth Low Energy), NOT Bluetooth Classic (BR/EDR). Most major gamepads (PS4, PS5, Switch Pro, Xbox pre-v5) use BR/EDR. Only a few support BLE:
- Xbox Wireless (firmware v5.15+) → BLE ✓
- Xbox Adaptive Controller → BLE ✓  
- Steam Controller (with BT firmware flash) → BLE ✓
- Stadia Controller (with BT firmware flash) → BLE ✓
- Some Android controllers → BLE ✓

**Two Input Options:**

1. **BLE Gamepad (via NimBLE stack):**
   - Use the ESP32-S3's built-in BLE HID host capability
   - Support Xbox (v5+), Steam, Stadia, and generic BLE gamepads
   - Map: D-pad/stick → navigate menus, A/B → action/back, triggers → special ability
   - Library: `NimBLE-Arduino` (lightweight BLE stack, PlatformIO compatible)

2. **USB-C OTG Gamepad (via USB Host HID):**
   - ESP32-S3 has native USB-OTG support
   - **BUT**: The T190 uses USB-Serial-JTAG for programming/serial, which shares the PHY with USB-OTG
   - **Workaround**: External USB PHY chip (SP5301 or TUSB1106) OR use USB-C only when not connected to computer
   - **Simpler approach for v1**: Skip USB host for now, focus on BLE + on-device buttons
   - Future: USB-C controller support requires hardware add-on or different board

**Recommendation for v1:** Ship with two-button gameplay (BTN_USER + BTN_NEXT) as primary, add BLE gamepad as an optional upgrade feature. The two buttons are surprisingly viable — many classic games (Flappy Bird, rhythm games, fighting games) work with just 2 inputs.

**Button Mapping:**
| Button | Normal Mode | Battle Mode | Menu Mode |
|--|--|--|--|
| BTN_USER (GPIO 0) | Next screen | Attack/Ability | Select |
| BTN_NEXT (GPIO 21) | Prev screen | Guard/Swap | Back |
| Long-press USER | Enter game | Forfeit battle | Exit menu |
| Long-press NEXT | Lock screen | — | — |

---

## 2. ESP-NOW Auto-Battle (Device vs Device)

### Why ESP-NOW?
ESP-NOW is Espressif's connectionless WiFi protocol — **no router needed, no internet needed**. Two ESP32 devices discover each other and exchange data directly at 1 Mbps. Perfect for two nodes battling on a table, at a meetup, or anywhere.

### Battle Discovery Protocol

**Step 1: Broadcast Challenge**
When a user long-presses BTN_USER from the battle screen, the node broadcasts a challenge beacon via ESP-NOW:
```json
{
  "type": "challenge",
  "nodeId": "mohn-B43A45A351F8",
  "mohnsterName": "FlameHound",
  "stage": 4,
  "hp": 180,
  "wins": 42
}
```

**Step 2: Accept/Decline**
Any nearby node showing the battle screen sees the challenge popup:
```
┌─────────────────────────┐
│  ⚔️ BATTLE CHALLENGE!   │
│                         │
│  FlameHound (Evolved)   │
│  HP: 180  Wins: 42      │
│                         │
│  [BTN0] ACCEPT          │
│  [BTN1] DECLINE         │
└─────────────────────────┘
```

**Step 3: Sync & Fight**
Both devices exchange their creature stats, agree on a random seed (XOR of both device IDs + millis), and start synchronized battle ticks.

### ESP-NOW Battle Protocol

**Packet Structure (fits in ESP-NOW's 250-byte limit):**
```c
typedef struct {
  uint8_t  packetType;    // 0=challenge, 1=accept, 2=battleTick, 3=result
  uint8_t  nodeId[6];     // MAC address
  uint16_t hp;
  uint16_t atk;
  uint16_t def;
  uint8_t  spd;
  uint8_t  action;        // 0=auto-attack, 1=ability, 2=guard
  uint8_t  abilityId;
  uint16_t damage;        // Damage dealt this tick
  uint8_t  stage;         // Growth stage
  uint32_t randomSeed;    // For deterministic sync
  uint8_t  reserved[8];   // Future expansion
} BattlePacket;            // Total: ~32 bytes (well under 250 limit)
```

**Tick Synchronization:**
- Both devices run at 500ms tick rate
- Each tick, both devices:
  1. Calculate own action
  2. Send BattlePacket with action + result
  3. Receive opponent's BattlePacket
  4. Apply both actions simultaneously
  5. Render updated HP bars and effects
- If no packet received within 2 ticks (1 second), show "CONNECTION LOST"
- If no packet for 5 ticks (2.5 seconds), declare opponent forfeited

### Visual Battle Effects (Adafruit GFX)
- **Attack hit:** Flash opponent's sprite white for 100ms, draw 3 random "slash" lines
- **Ability used:** Draw expanding circle animation around user's creature
- **Guard active:** Draw shield icon over creature
- **Critical hit:** Screen border flashes red for 200ms
- **KO:** Losing creature shrinks to 1px and fades, winner bounces

### Rewards
- **Win:** +10 local XP, +5 points (synced to server on next heartbeat)
- **Loss:** +2 local XP
- **Both recorded** in NVS flash: `pvpWins`, `pvpLosses`, `pvpStreak`

---

## 3. MOHN Pass Ecosystem

### The Vision
A person walking down the street shouldn't have to walk to the convenience store when they could pay $3-5 and someone brings their stuff. A person with a walker shouldn't have to walk miles when they could pay $3-5 for a quick ride. The MOHN Pass unifies all of this.

### What is MOHN Pass?
A single subscription/membership that connects a person to the entire MOHN ecosystem:

```
┌─────────────────────────────────────────────┐
│              MOHN PASS ($4.99/month)         │
├─────────────────────────────────────────────┤
│                                             │
│  🚗 Micro-Rides ────── $3-5 per ride        │
│  📦 Micro-Delivery ─── $3-5 per delivery    │
│  💼 Gig Marketplace ── Pick up shifts        │
│  🎮 MohnSters Game ─── Mine + Battle         │
│  🔧 NeighborTechs ──── IT repairs            │
│  🍔 MohnMenu ────────── Food ordering        │
│  📊 MohnServe ────────── Business tools       │
│                                             │
│  + ESP32 Node (Titan upgrade: $9.99/month)  │
└─────────────────────────────────────────────┘
```

### Micro-Delivery Service ($3-5)
**Problem:** People walk to convenience stores, carry bags back, waste 30-60 minutes.
**Solution:** MOHN Pass members can request a delivery from any nearby store for $3-5.

**How it works:**
1. Customer opens MohnSters app → "Quick Delivery" tab
2. Selects nearby store from map (convenience store, pharmacy, etc.)
3. Enters item list (text/voice)
4. Sets tip amount ($3 minimum delivery fee)
5. Nearby gig workers see the request
6. Worker picks up items, delivers within 15-30 minutes
7. No restaurant markup — just the delivery fee

**Why it's different from Uber Eats / DoorDash:**
- **$3-5 flat fee** (not $8-15 + service fees + markup)
- **Any store** (not just partnered restaurants)
- **Community-first** (workers are your neighbors, not random contractors)
- **No food markup** (customer pays store price + delivery fee only)
- **Instant matching** (workers already nearby because they're in the ecosystem)

### Micro-Rides Service ($3-5)
**Problem:** People need short rides (1-3 miles) but Uber/Lyft charges $8-15 minimum.
**Solution:** MOHN Pass members offer/request quick rides for $3-5.

**Safety Features:**
- Driver/rider ratings and verification
- Real-time GPS tracking
- Emergency button → calls 911 + shares location
- $1M liability insurance (through MohnPay integration)
- Background checks for drivers (Level 2 verification)

**Revenue Model:**
- $3-5 per ride, MOHN takes 15% platform fee ($0.45-0.75)
- Driver keeps 85%
- Volume play: 1000 rides/day in one city = $450-750/day platform revenue

### Always-On Gig Marketplace
MOHN Pass holders can always pick up shifts across all MOHN businesses:
- **NeighborTechs:** Take IT repair jobs ($20-100/job)
- **Micro-Delivery:** Run deliveries ($3-5/delivery)
- **Micro-Rides:** Give rides ($3-5/ride)
- **MohnMenu:** Pick up food orders ($5-10/delivery)
- **Event Setup:** Help with events, moves, etc.
- **MohnServe:** Business operations tasks

**Cross-platform XP:** Every real-world gig completed earns MohnSters XP and points. Your creature literally grows stronger as you work. A NeighborTechs job completion unlocks the "Circuit Breaker" ability. A delivery streak unlocks "Speed Demon."

---

## 4. Kiosk Distribution (Node Dispensers)

### The Hub Concept
Instead of shipping ESP32 nodes, place them at physical locations where people can grab one instantly.

**Kiosk Locations:**
- Shopping malls (near phone repair kiosks, GameStop, etc.)
- Convenience stores (7-Eleven, Wawa, etc.)
- Community centers
- College campuses
- Barbershops / salons (community hubs)
- MOHN partner businesses

### How the Kiosk Works

**Simple Version (v1 — Cardboard Display):**
1. Box of pre-flashed ESP32 nodes at the counter
2. Each node has a QR code sticker
3. Customer scans QR → opens mohnsters.com → creates account
4. Plugs node into phone via USB-C
5. Web Serial API flashes their user identity to the node
6. Node activates and starts heartbeating
7. $9.99/month charged to their payment method

**Advanced Version (v2 — Vending Machine):**
1. Touch screen with MohnSters branding
2. Customer scans QR or enters phone number
3. Payment processes ($9.99 first month)
4. Machine dispenses a sealed node package
5. Customer opens, connects to phone, activates via Web Serial
6. Node shipped pre-flashed with latest firmware

**ESP32-Powered Kiosk Controller:**
- The kiosk itself runs on an ESP32
- Connects to MOHN cloud for inventory tracking
- Updates display with current stock count
- Reports sales data in real-time
- Can push firmware updates to dispensed nodes via WiFi before dispensing

### Hub Network Benefits
- **Zero shipping wait** — walk up, grab one, activate in 2 minutes
- **Impulse purchases** — see the demo screen running, get excited, buy immediately
- **Community presence** — physical brand touchpoints in neighborhoods
- **Local WiFi onboarding** — kiosk provides temporary WiFi for initial activation
- **Referral system** — each kiosk tracks referrals from the location owner

---

## 5. Technical Implementation

### Mini-Game Architecture (Firmware Addition)

The mini-game adds a 5th screen to the existing 4-screen cycle:

```c
enum Screen : uint8_t {
  SCREEN_STATS = 0,
  SCREEN_HABITAT,
  SCREEN_WALLET,
  SCREEN_SYSTEM,
  SCREEN_BATTLE,     // NEW: Mini-game battle screen
  SCREEN_COUNT
};
```

**New State Variables:**
```c
// Battle state
static bool battleActive = false;
static bool espNowBattle = false;   // true = vs another device
static int  playerHP, enemyHP;
static int  playerATK, playerDEF, playerSPD;
static int  enemyATK, enemyDEF, enemySPD;
static int  abilityCooldown = 0;
static bool guardActive = false;
static int  battleTick = 0;
static unsigned long lastBattleTick = 0;
static int  aiWins = 0, aiLosses = 0;
static int  pvpWins = 0, pvpLosses = 0;
```

**Memory Budget:**
- Current firmware: 14.2% RAM (46,408 / 327,680 bytes), 14.1% Flash (921,845 / 6,553,600 bytes)
- Battle system estimate: +~4KB RAM, +~15KB Flash
- Projected: ~15.5% RAM, ~16.5% Flash — **plenty of headroom**

### ESP-NOW Integration

ESP-NOW runs on WiFi hardware but doesn't require a WiFi connection. It CAN coexist with WiFi STA mode as long as both are on the same channel.

```c
#include <esp_now.h>
#include <esp_wifi.h>

// ESP-NOW callback
void onDataRecv(const esp_now_recv_info_t *info, const uint8_t *data, int len) {
  BattlePacket *pkt = (BattlePacket*)data;
  // Process incoming battle data
}

void initEspNow() {
  esp_now_init();
  esp_now_register_recv_cb(onDataRecv);
}
```

**Coexistence Strategy:**
- WiFi stays connected for heartbeats (STA mode, channel 1-13)
- ESP-NOW broadcasts on the same channel WiFi is using
- During ESP-NOW battle, heartbeats continue normally
- Battle data is tiny (~32 bytes per tick vs 250 byte limit)

### NVS Persistence (New Keys)
```
aiWins       → int    (AI battle wins)
aiLosses     → int    (AI battle losses)
pvpWins      → int    (PvP wins via ESP-NOW)
pvpLosses    → int    (PvP losses)
pvpStreak    → int    (current win streak)
bestStreak   → int    (all-time best streak)
totalXP      → int    (cumulative battle XP)
```

---

## 6. Research Findings — What Others Have Done on ESP32

### Games Built on ESP32
| Project | Type | Display | Controls | Notable |
|---------|------|---------|----------|---------|
| esp32-nesemu | NES Emulator | ST7789 320×240 | I2C gamepad (ATtiny861) | Full NES emulation at playable FPS |
| ESP32 Doom | Doom port | ILI9341 | Buttons | 3D rendering on ESP32 |
| Micro Python Console | Various | ST7789 | I2C keyboard | Multiple games via MicroPython |
| Odroid-Go | Full console | ILI9341 320×240 | 10 buttons + speaker | Plays GB, GBC, NES ROMs |
| ESPlay Micro | Handheld | ST7789 240×240 | D-pad + ABXY | Open source, community games |
| T-Display Flappy | Flappy Bird | ST7789 135×240 | 2 buttons | Proves 2-button games work great |

**Key Takeaway:** The ESP32-S3 with 8MB PSRAM and 170×320 display is MORE than capable of running real games. People have done NES emulation on weaker ESP32 chips.

### Controller Libraries
| Library | Protocol | ESP32-S3? | GamePad Types |
|---------|----------|-----------|---------------|
| **Bluepad32** | BR/EDR + BLE | Partial (BLE only on S3) | PS5, PS4, Xbox, Switch, 8BitDo, etc. |
| **NimBLE-Arduino** | BLE only | Yes ✓ | BLE gamepads, mice, keyboards |
| **ESP-IDF USB Host HID** | USB OTG | Yes (needs PHY setup) | Any USB HID gamepad |
| **ESP32-BLE-Gamepad** | BLE (device mode) | Yes ✓ | Makes ESP32 act as gamepad (opposite) |

**Best option for T190:** NimBLE-Arduino for BLE gamepad host. Lightweight, PlatformIO native, and works on ESP32-S3. Supports Xbox (v5+), Stadia, Steam, generic BLE gamepads.

### ESP-NOW Performance
- Latency: 1-3ms typical
- Range: 200m line of sight, 30-50m indoors
- Throughput: 1 Mbps (way more than we need for 32-byte battle packets)
- Packet loss: <1% at 10m range
- Max peers: 20 devices simultaneously
- **Perfect for real-time battle synchronization**

---

## 7. Two-Device Battle Test Plan

### Current Hardware
| Device | Board | Display | USB-C | Notes |
|--------|-------|---------|-------|-------|
| Node 1 | Heltec Vision Master T190 | ST7789 170×320 | Yes (Serial/JTAG) | Running firmware v1.3.0 |
| Node 2 | ? (user says they have a second device with screen) | ? | Yes | Need to identify board |

### Test Procedure
1. Flash both devices with battle-enabled firmware
2. Both connected to `flamingsocialmedia.comm` WiFi
3. Navigate both to BATTLE screen
4. Long-press BTN_USER on Device 1 → broadcasts ESP-NOW challenge
5. Device 2 shows challenge popup
6. Press BTN_USER on Device 2 to accept
7. Battle begins — watch both screens for synchronized combat
8. Winner gets XP, loser gets consolation

### What We Can Test NOW (Single Device)
Even with one device, we can test:
- Battle screen rendering
- AI opponent generation
- 2-button combat (attack + guard)
- HP bar animations
- Win/loss tracking in NVS
- Battle effects (slash lines, flashes)
- Screen transition to/from battle

---

## 8. Roadmap Update

### Q1 2026 (NOW → March) — SPRINT
- [x] ESP32 T190 firmware with 4-screen UI
- [x] Persistent state (NVS flash storage)
- [x] Signature boot animation (large overlapping sprites)
- [x] Zero-flicker display system
- [ ] **ON-DEVICE MINI-GAME** (AI battles with 2-button controls) ← THIS SESSION
- [ ] **ESP-NOW AUTO-BATTLE** (device vs device) ← NEXT
- [ ] USB Serial provisioning protocol
- [ ] Web app: activation flow (Web Serial API)
- [ ] Cloud heartbeat endpoint (Firebase Cloud Function)
- [ ] Stripe subscription integration
- [ ] Desktop app: persistence + creature renderer

### Q2 2026 (April → June)
- [ ] BLE gamepad support (NimBLE-Arduino)
- [ ] Multi-board firmware support (T190 + T-Display S3 + CYD)
- [ ] MOHN Pass MVP (micro-delivery + rides)
- [ ] Kiosk v1 (cardboard display at 3 test locations)
- [ ] Arena battle MVP (web app)
- [ ] Tutorial system during egg hatch
- [ ] Play Store listing (PWA wrapper)

### Q3 2026 (July → September)
- [ ] Kiosk v2 (automated dispenser prototype)
- [ ] AMOLED support (LilyGO T-Display S3 AMOLED)
- [ ] LVGL migration for professional UI
- [ ] Titan creature tier implementation
- [ ] USB-C team battles (2v2)
- [ ] Cross-platform XP (gig work → creature stats)

### Q4 2026 (October → December)
- [ ] Mesh networking between nodes (LoRa on Heltec boards)
- [ ] Multi-city MOHN Pass launch
- [ ] Education rewards module
- [ ] Full kiosk partner integration
- [ ] $MOHN token launch (Solana SPL)
- [ ] 10,000 subscriber target

---

## 9. Revenue Model Summary

| Revenue Stream | Price | MOHN Cut | Volume Target | Monthly Rev |
|--|--|--|--|--|
| MOHN Pass | $4.99/month | 100% | 5,000 members | $24,950 |
| Titan Upgrade | $9.99/month | 100% (minus COGS) | 1,000 nodes | $9,990 |
| Micro-Delivery | $3-5/delivery | 15% | 500/day | $7,500 |
| Micro-Rides | $3-5/ride | 15% | 300/day | $4,500 |
| NeighborTechs | $20-100/job | 10% | 50/day | $5,000 |
| MohnMenu | $5-10/order | 12% | 200/day | $3,600 |
| **Total** | | | | **$55,540/month** |

---

## 10. Key Technical Decisions

### Why ESP-NOW for Battles (Not WiFi/Server)
1. **Zero infrastructure** — works at a park, a bus stop, anywhere two devices are within 200m
2. **Low latency** — 1-3ms vs 50-200ms for cloud round-trip
3. **No data usage** — doesn't consume mobile data or WiFi bandwidth
4. **Coexists with WiFi** — heartbeats continue during battle
5. **Simple** — 32-byte packets, well under 250-byte limit
6. **Reliable** — <1% packet loss at typical battle range (1-5m)

### Why 2-Button Gameplay First
1. **T190 has exactly 2 buttons** — no hardware changes needed
2. **Proven pattern** — Flappy Bird, rhythm games, fighting games all work with 2 inputs
3. **Accessible** — anyone can learn Attack + Guard in 10 seconds
4. **Expandable** — BLE gamepad adds more buttons later without changing hardware
5. **Addictive** — simple controls + deep strategy = engagement (see: Clash Royale, Hearthstone)

### Why Micro-Delivery at $3-5 (Not $8-15)
1. **The walk test** — if walking to the store takes 30 min and costs $0, $3-5 is the impulse threshold
2. **No restaurant markup** — DoorDash marks up menu prices 15-30%. We don't.
3. **Worker density** — MOHN Pass members are already nearby, reducing last-mile cost
4. **Volume over margin** — low fee × high volume = more total revenue than high fee × low volume
5. **Community trust** — your neighbor delivers your stuff, not a stranger from 10 miles away

---

*"Two nodes, one table, no internet. Just MohnSters battling in the palm of your hand. That's the vision."*

— Richard Mohn, February 2026
