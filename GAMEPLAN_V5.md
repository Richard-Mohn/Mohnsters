# MohnSters Game Plan V5 — Node Commerce, Phone Provisioning & Tiered Subscriptions

> **Last Updated:** February 11, 2026
> **Status:** Phase 5 (Node Commerce + OTA Provisioning + Subscription Tiers)
> **Founder:** Richard Mohn · richard@mohnmint.com
> **Previous Versions:** V1 (concept), V2 (production), V3 (ESP32 + eggs), V4 (life loop + arena)

---

## What's New in V5

V4 defined the living ecosystem loop, arena battles, and cross-platform deployment. V5 introduces the **commercial infrastructure** that turns MohnSters from a game into a **hardware-subscription business**:

1. **Two-Tier Subscription Model** — Free players vs. Titan subscribers ($9.99/month)
2. **Physical Node Drop-Shipping** — ESP32 devices shipped directly to paying subscribers
3. **Phone-Based Node Provisioning** — Activate and configure your node via USB-C or BLE from the web app
4. **Guided Onboarding Tutorial** — Egg hatching period doubles as interactive gameplay tutorial
5. **Universal Firmware** — One binary auto-detects ESP32 board/screen and adapts
6. **Web App First, App Store Later** — Initial access through mohnsters.com web app
7. **Multi-Device Graphics Scaling** — Display engine that auto-scales to any screen size/resolution
8. **Professional Boot Animation** — Signature falling coins/eggs/monsters trademark animation

---

## 1. Subscription Tiers

### Free Tier — "Trainer"
**Cost:** $0
**What You Get:**
- Full access to the MohnSters web app and mobile app
- One starter MohnSter character (randomly generated)
- Card scanning and portfolio tracking
- Arena battles (limited to 5/day)
- Point earning through ecosystem actions (MohnMenu, NeighborTechs, etc.)
- Basic creature evolution (up to Adult stage)
- Leaderboard visibility
- Social features (friend list, messaging, trades)

**Limitations:**
- No physical ESP32 node (no passive mining)
- No Titan-class creatures
- No priority matchmaking
- No early access to new features
- 5 arena battles per day cap
- Standard XP earn rate (1x)

### Titan Tier — "Node Operator"
**Cost:** $9.99/month (auto-renewing)
**What You Get:**
- **Everything in Free Tier** (unlimited arena battles)
- **Physical ESP32 Node** — Drop-shipped on first subscription
  - Heltec Vision Master T190 (or equivalent current-gen board)
  - Pre-loaded with MohnSter Node firmware
  - USB-C cable included
  - Quick-start activation card with QR code
- **Titan Monster Class** — Exclusive creature tier beyond Evolved
  - Titan creatures have 1.5x base stats
  - Unique Titan evolution paths not available to free players
  - Special Titan-only abilities
  - Exclusive Titan visual design (aura effects, larger sprites)
- **Passive Mining** — Node earns points 24/7 while online
  - 1 point per heartbeat (every 15 seconds)
  - ~5,760 points/day while connected
  - Points convert to $MOHN tokens
- **2x XP Multiplier** — All ecosystem actions earn double
- **Priority Arena Matchmaking** — Shorter queue times
- **Early Access** — New features, creatures, and events 2 weeks early
- **Exclusive Monthly Drops** — Limited edition creatures, items, cosmetics
- **OTA Firmware Updates** — Node receives updates automatically

### Revenue Projections
| Subscribers | Monthly Revenue | Annual Revenue |
|-------------|----------------|----------------|
| 100         | $999           | $11,988        |
| 1,000       | $9,990         | $119,880       |
| 10,000      | $99,900        | $1,198,800     |
| 50,000      | $499,500       | $5,994,000     |

**Hardware Cost Per Node (estimated):**
- Heltec T190 board: ~$15-20 wholesale
- USB-C cable: ~$1
- Packaging + quick-start card: ~$3
- Shipping (USPS First Class): ~$4
- **Total COGS per node: ~$25**
- **Payback period: 2.5 months** per subscriber

---

## 2. Node Drop-Shipping Pipeline

### Order Fulfillment Flow
```
User signs up for Titan ($9.99/month)
    ↓
Payment processes (Stripe)
    ↓
Order created in fulfillment system
    ↓
ESP32 node picked from inventory (pre-flashed with latest firmware)
    ↓
QR activation card printed with unique device pairing code
    ↓
Packaged + shipped (USPS First Class, 3-5 business days)
    ↓
User receives → Scans QR → Activates via web app → Egg starts incubating
```

### Inventory Management
- **Phase 1 (0-500 subs):** Manual fulfillment from home inventory
  - Buy T190 boards in bulk (10-50 at a time from AliExpress/Heltec direct)
  - Flash firmware batch with PlatformIO CLI script
  - Manual packaging and USPS drop-off
- **Phase 2 (500-5,000 subs):** Semi-automated
  - Partner with local fulfillment center
  - Automated firmware flashing station (USB hub + script)
  - Integration with ShipStation or Pirate Ship for label generation
- **Phase 3 (5,000+ subs):** Full drop-ship
  - Contract with electronics fulfillment partner (or Heltec direct)
  - Firmware OTA on first boot (no pre-flashing needed)
  - Automated inventory reorder triggers

### Pre-Flashing Script
```bash
#!/bin/bash
# Flash batch of ESP32 nodes for fulfillment
# Connect up to 8 boards via USB hub

for port in /dev/ttyUSB*; do
  echo "Flashing $port..."
  pio run -t upload --upload-port $port -d firmware/mohnster-node &
done
wait
echo "All boards flashed!"
```

---

## 3. Phone-Based Node Provisioning

### Two Provisioning Methods

#### Method A: USB-C Direct (Primary — Android)
1. User plugs ESP32 into phone via USB-C to USB-C cable
2. Opens mohnsters.com web app in Chrome
3. Clicks "Activate My Node"
4. Web Serial API connects to the ESP32 over USB
5. Firmware reads device ID, app sends WiFi credentials + auth token
6. ESP32 reboots, connects to WiFi, starts heartbeating
7. Egg appears in app, incubation begins

**Technical Requirements:**
- Chrome 89+ on Android (Web Serial API)
- USB-C OTG support (standard on all modern Android phones)
- Firmware implements a serial command interface for provisioning

#### Method B: BLE Provisioning (Fallback — iOS + Android)
1. User powers on ESP32 (it starts in pairing mode if unconfigured)
2. Opens mohnsters.com web app
3. Clicks "Activate My Node"
4. Web Bluetooth API connects to ESP32's BLE service
5. App sends WiFi credentials + auth token over BLE
6. ESP32 reboots, connects to WiFi, starts heartbeating

**Technical Requirements:**
- Chrome/Safari with Web Bluetooth API
- ESP32 BLE provisioning service (already built into ESP-IDF)

### Serial Command Protocol (USB Provisioning)
```
ESP32 Side (listening on Serial):
  → Receives: {"cmd":"provision","ssid":"...","pass":"...","token":"...","userId":"..."}
  → Responds: {"status":"ok","deviceId":"mohn-XXXXXXXXXXXX","ip":"192.168.x.x"}
  → Reboots into normal operation mode

  → Receives: {"cmd":"status"}
  → Responds: {"deviceId":"...","wifi":true,"heartbeats":42,"points":42}

  → Receives: {"cmd":"reset"}
  → Factory resets WiFi credentials, returns to pairing mode
```

### Provisioning States
```
UNPROVISIIONED (factory default)
    ↓ User connects + sends credentials
PROVISIONING (connecting to WiFi)
    ↓ WiFi connected + first heartbeat sent
ACTIVE (normal operation — mining points)
    ↓ User sends reset command
UNPROVISIONED (back to start)
```

---

## 4. Guided Onboarding (Egg Tutorial)

### The Hatch-as-Tutorial Design
The egg incubation period (36 heartbeats = ~9 minutes) serves as an interactive tutorial. While waiting for their egg to hatch, players learn the game through guided prompts.

### Tutorial Flow
```
Step 1: "Your MohnSter Egg is Incubating!"
  → Explain: Your ESP32 node sends heartbeats. Each heartbeat brings your egg closer to hatching.
  → Show: Live heartbeat counter on screen (both node display + app)
  → Progress: 0/36 heartbeats

Step 2: "While You Wait — Explore Your Wallet" (at 6 heartbeats)
  → Tutorial arrow points to Wallet tab
  → Explain: This is where your points and $MOHN tokens live
  → Explain: Every heartbeat = 1 point
  → Mini-task: Tap wallet to view balance

Step 3: "Meet the Arena" (at 12 heartbeats)
  → Tutorial arrow points to Arena tab
  → Explain: Once hatched, your MohnSter battles other players here
  → Show: Preview of arena with ghost/demo battle
  → Explain: Win battles to earn more points + evolve faster

Step 4: "The Mohn Ecosystem" (at 18 heartbeats)
  → Tutorial: Show ecosystem wheel (MohnMenu, NeighborTechs, etc.)
  → Explain: Every real-world action powers up your monster
  → Explain: Order food → monster gets fed, complete a repair → monster learns tech

Step 5: "Your Node is Your Engine" (at 24 heartbeats)
  → Tutorial arrow points to System tab on node
  → Explain: Keep your node online for passive point mining
  → Explain: WiFi health matters — strong connection = reliable heartbeats
  → Show: Daily point projection (5,760/day)

Step 6: "Almost There..." (at 30 heartbeats)
  → Show egg with heavy cracks
  → Explain: Evolution system preview (Hatchling → Juvenile → Adult → Evolved → Titan)
  → Build excitement with countdown

Step 7: "IT'S HATCHING!" (at 36 heartbeats)
  → Full-screen hatch animation on both node and app
  → Monster reveals with stats
  → Celebration confetti/particles
  → "Your MohnSter is ready! Battle your first opponent?"
  → CTA: Enter your first arena match
```

### Key Design Principles
- **Never force waiting** — tutorial steps appear proactively, not as gates
- **Always show progress** — heartbeat counter is always visible
- **Connect node to app** — visual sync between ESP32 display and phone app
- **Reward attention** — bonus points for completing each tutorial step
- **Skip option** — experienced users can skip (but miss tutorial bonus points)

---

## 5. Universal Firmware Architecture

### Multi-Device Support Strategy
One firmware binary that auto-detects the ESP32 board variant and adapts its display, pins, and features.

### Supported Boards (Phase 1)
| Board | MCU | Display | Resolution | Price | Notes |
|-------|-----|---------|------------|-------|-------|
| **Heltec Vision Master T190** | ESP32-S3 | ST7789 TFT | 320×170 | ~$20 | Current dev board, LoRa optional |
| **LilyGO T-Display S3** | ESP32-S3 | ST7789 TFT | 320×170 | ~$15 | Popular, cheaper, same screen |
| **LilyGO T-Display S3 AMOLED** | ESP32-S3 | AMOLED | 536×240 | ~$22 | Gorgeous AMOLED, higher res |
| **Waveshare ESP32-S3 Touch** | ESP32-S3 | ILI9341 | 320×240 | ~$18 | Touch screen, larger display |
| **CYD (Cheap Yellow Display)** | ESP32 | ILI9341 | 320×240 | ~$8 | Budget option, very popular |
| **Heltec WiFi Kit 32 V3** | ESP32-S3 | SSD1306 OLED | 128×64 | ~$12 | Small OLED, basic but cheap |

### Auto-Detection Strategy
```cpp
// On first boot, firmware detects hardware:
// 1. Check for PSRAM (S3 boards have it, original ESP32 may not)
// 2. Probe SPI for display controller ID
// 3. Read EFUSE chip revision
// 4. Test known GPIO configurations
// 5. Store detected profile in NVS for future boots

enum BoardProfile {
  BOARD_HELTEC_T190,      // ST7789 320x170, GPIO 48/38/39/47/40
  BOARD_LILYGO_TDISPLAY,  // ST7789 320x170, GPIO 35/36/5/16/17
  BOARD_LILYGO_AMOLED,    // RM67162 536x240, QSPI
  BOARD_CYD_28,           // ILI9341 320x240, GPIO varies
  BOARD_HELTEC_OLED,      // SSD1306 128x64, I2C
  BOARD_UNKNOWN           // Fallback — minimal text-only mode
};
```

### Graphics Scaling Engine
```
Resolution Detection → Layout Selection → Asset Scaling

320×170  → Layout A (landscape, compact) — T190, T-Display
536×240  → Layout B (landscape, spacious) — AMOLED
320×240  → Layout C (portrait/landscape, taller) — CYD, Waveshare
128×64   → Layout D (minimal, text-only) — OLED boards

Each layout defines:
- Header height
- Font sizes
- Content area bounds
- Creature sprite scale factor
- Animation complexity (simpler on slow boards)
- Progress bar dimensions
```

### Graphics Library Strategy (2026 Best Practices)
**Current:** Adafruit GFX (simple, works, but slow + flicker-prone)
**Target:** LovyanGFX or TFT_eSPI with DMA sprite rendering

**Why sprites eliminate flicker:**
- Draw everything to an off-screen buffer (in PSRAM)
- Push entire buffer to display in one SPI DMA transaction
- Display never shows partial/intermediate state
- CPU is free during DMA transfer

**Migration path:**
1. Phase 1 (NOW): Adafruit GFX with careful partial updates (no fillScreen on data refresh)
2. Phase 2: Migrate to TFT_eSPI with sprite-based rendering
3. Phase 3: LVGL widget framework for professional UI components

---

## 6. Trademark Boot Animation

### The MohnSters Signature Boot Sequence
Every MohnSter Node boots with the same recognizable animation — this becomes our **brand signature** (like the PlayStation startup or Game Boy chime).

### Animation Storyboard
```
Frame 1-40 (2 seconds): "THE RAIN"
  - Tiny pixel-art coins (gold), eggs (white), and monster faces (green)
    fall from the top of the screen at varying speeds
  - Items accumulate at the bottom, stacking up
  - Screen gradually fills from bottom to top with fallen items
  - Each item type has a unique mini-sprite (5×5 to 8×8 pixels)
  - Sound: (future) subtle chiptune coin-drop sounds

Frame 41-60 (1 second): "THE REVEAL"
  - All accumulated items start dissolving from the edges inward
  - Behind them, the "MohnSters" logo is revealed in large text
  - Logo uses gradient effect: indigo → emerald left to right
  - "M" and "S" are capitalized and slightly larger

Frame 61-80 (1 second): "THE GLOW"
  - Logo pulses once with a bright white flash
  - Subtitle "NODE" appears below in emerald
  - Version number fades in beneath

Frame 81-100 (1 second): "THE ICONS"
  - $MOHN coin icon slides to left of center
  - Points gem icon slides to right of center
  - Labels appear: "$MOHN" and "POINTS"
  - Decorative line draws across screen

Frame 101+: "THE BOOT"
  - Progress bar appears at bottom
  - Status messages cycle: "Hardware OK" → "Loading state" → "WiFi..." → "Ready!"
  - Restored state info displayed (beats, points, $MOHN balance)
  - Fade transition to main Stats screen
```

### Mini-Sprite Definitions (for falling items)
```
COIN (6×6):        EGG (5×7):         MONSTER (7×7):
  .XX.            ..X..               .XXXXX.
  XXXX            .XXX.               X.X.X.X
  XMMX            XXXXX               XXXXXXX
  XXXX            XXXXX               XX.X.XX
  .XX.            XXXXX               .XXXXX.
                  .XXX.               .XX.XX.
                  ..X..               .X...X.
```

---

## 7. Web App Activation Flow

### mohnsters.com Web App Architecture
**Framework:** Next.js (or Flutter Web — same codebase as mobile)
**Authentication:** Firebase Auth (Google, email, phone)
**Database:** Firestore (user accounts, node registrations, game state)
**Payments:** Stripe (subscription billing)

### User Journey
```
1. User arrives at mohnsters.com
2. "Play Free" or "Get Titan ($9.99/mo)" CTA
3. Sign up / Sign in (Firebase Auth)
4. FREE PATH:
   → Enters game, gets starter monster, plays limited arena
5. TITAN PATH:
   → Stripe checkout for $9.99/month
   → "Your MohnSter Node is on its way! (3-5 days)"
   → Can play free features while waiting
   → Node arrives → Opens web app → "Activate My Node"
   → USB-C or BLE provisioning flow
   → Egg starts incubating → Tutorial begins
   → Monster hatches → Full game unlocked
```

### Web App as Install Alternative
- No App Store approval needed initially
- PWA (Progressive Web App) with install prompt
- Works on any device with Chrome/Safari
- Full-screen mode on mobile (feels like native app)
- Push notifications via service worker
- Eventually publish to Play Store + App Store once established

---

## 8. Cross-Platform Communication

### How Everything Talks Together

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐
│  ESP32 Node  │────→│ Cloud Server │←────│  Web/Mobile   │
│  (firmware)  │     │  (Firebase)  │     │    App        │
└─────────────┘     └──────────────┘     └───────────────┘
       │                    │                     │
   Heartbeats          Game State            UI / Battles
   via HTTP POST       Firestore             Flutter / Next.js
       │                    │                     │
       │            ┌──────────────┐              │
       └───────────→│  Desktop App │←─────────────┘
                    │  (Electron)  │
                    └──────────────┘
                    Local dev/monitoring
```

### Communication Protocols
| Source | Destination | Protocol | Data |
|--------|-------------|----------|------|
| ESP32 Node | Cloud Server | HTTPS POST | Heartbeats, device status, points |
| ESP32 Node | Desktop App | HTTP POST (local) | Dev monitoring, debug |
| Web App | Cloud Server | Firestore SDK | Game state, user data, battles |
| Mobile App | Cloud Server | Firestore SDK | Same as web app |
| Desktop App | Cloud Server | Firestore SDK | Node monitoring dashboard |
| Phone → ESP32 | USB Serial / BLE | JSON commands | Provisioning, WiFi config |
| Cloud → ESP32 | OTA (HTTP pull) | Binary firmware | Firmware updates |

### Cloud Heartbeat Endpoint
**Production:** Firebase Cloud Function or Cloud Run service
```
POST https://api.mohnsters.com/heartbeat
Authorization: Bearer <device-jwt>
Content-Type: application/json

{
  "deviceId": "mohn-XXXXXXXXXXXX",
  "userId": "firebase-uid",
  "heartbeatNumber": 42,
  "firmwareVersion": "1.2.0",
  "growthStage": "Hatchling",
  "totalPoints": 42,
  "batteryPercent": 85,
  "wifiRssi": -45,
  "uptimeMs": 630000
}

Response:
{
  "status": "ok",
  "pointsAwarded": 1,
  "totalPoints": 43,
  "mohnBalance": 0.43,
  "serverTime": 1739318400,
  "pendingOTA": null
}
```

### Security Model
- **Device Authentication:** Each ESP32 gets a JWT on provisioning, signed with the user's Firebase UID
- **Heartbeat Validation:** Server checks:
  - JWT validity and expiration
  - Device ID matches registered device for user
  - Heartbeat interval is reasonable (not faster than 10s)
  - IP address geo-consistency (optional, anti-fraud)
- **Balance Protection:**
  - Points/balance are **server-authoritative** — node displays what server tells it
  - No client-side balance modification possible
  - Heartbeat response includes authoritative point count
  - Node display shows cached value, updated on each heartbeat response
- **Firmware Integrity:**
  - Signed OTA updates only (ESP32 secure boot)
  - Version pinning — server rejects heartbeats from ancient firmware
  - Remote disable capability for compromised devices

---

## 9. Emulator & Development Tools

### ESP32 Emulators for Faster Development
| Tool | Type | Display Sim | Cost | Best For |
|------|------|-------------|------|----------|
| **Wokwi** | Browser emulator | Yes (ST7789, ILI9341, OLED) | Free/Pro | Fastest iteration, no hardware needed |
| **QEMU ESP32** | System emulator | No (serial only) | Free | Logic testing, CI/CD |
| **PlatformIO + Serial Monitor** | Real hardware | Yes (actual screen) | Board cost | Final validation |
| **ESP-IDF VSCode Simulator** | Hybrid | Limited | Free | ESP-IDF projects |

### Recommended Dev Workflow
1. **Design & iterate** in Wokwi (browser) — see display output in real-time
2. **Test logic** with QEMU in CI pipeline
3. **Flash real hardware** for final validation
4. **Production flash** via batch script for fulfillment

### Wokwi Integration
- Embed `wokwi.toml` in firmware project
- Define virtual board with ST7789 display
- Run `pio run` builds directly in Wokwi simulator
- See display output in browser — no hardware needed
- Share simulation links for debugging

---

## 10. Roadmap & Milestones

### Q1 2026 (NOW → March)
- [x] ESP32 T190 firmware with 4-screen UI
- [x] Persistent state (NVS flash storage)
- [x] Signature boot animation
- [ ] Fix all display flicker (sprite-based rendering)
- [ ] USB Serial provisioning protocol
- [ ] Web app: activation flow (Web Serial API)
- [ ] Cloud heartbeat endpoint (Firebase Cloud Function)
- [ ] Stripe subscription integration

### Q2 2026 (April → June)
- [ ] BLE provisioning (iOS support)
- [ ] Multi-board firmware support (T190 + T-Display S3 + CYD)
- [ ] OTA firmware update mechanism
- [ ] Arena battle MVP (web app)
- [ ] Tutorial system during egg hatch
- [ ] Drop-shipping pipeline (manual, 0-100 subs)
- [ ] Play Store listing (PWA wrapper)

### Q3 2026 (July → September)
- [ ] AMOLED support (LilyGO T-Display S3 AMOLED)
- [ ] LVGL migration for professional UI
- [ ] Titan creature tier implementation
- [ ] Monthly exclusive drops system
- [ ] Semi-automated fulfillment (500+ subs)
- [ ] App Store listing (iOS)

### Q4 2026 (October → December)
- [ ] Mesh networking between nodes (LoRa)
- [ ] USB-C team battles
- [ ] Education rewards module
- [ ] Full drop-ship partner integration
- [ ] $MOHN token launch (Solana SPL)
- [ ] 10,000 subscriber target

---

## 11. Key Technical Decisions

### Why Web App First (Not App Store)
1. **No approval delays** — Deploy instantly, iterate daily
2. **Universal access** — Works on any phone, tablet, PC with a browser
3. **Web Serial + Web Bluetooth** — Browser APIs for device provisioning
4. **PWA install** — Users can "install" from browser, feels native
5. **SEO benefit** — mohnsters.com ranks in Google, app stores don't
6. **Cost** — $0 vs. $99/year Apple + $25 Google developer fees

### Why $9.99/Month (Not Weekly)
- Industry standard for game passes (Fortnite Crew, Roblox Premium, etc.)
- Monthly billing reduces churn vs. weekly decision fatigue
- High enough to cover hardware COGS within 3 months
- Low enough for impulse purchase — "less than lunch"
- Competitive with other creature/pet games with physical components

### Why ESP32-S3 (Not Raspberry Pi, Not STM32)
- **WiFi built-in** — no external module needed
- **BLE built-in** — phone provisioning without adapters
- **PSRAM** — 8MB for sprite framebuffers and complex animations
- **USB-C native** — phone connectivity without adapters
- **$15-20 per unit** — affordable at scale
- **Massive community** — Arduino/PlatformIO/ESP-IDF, millions of developers
- **LoRa optional** — mesh networking for future features (Heltec boards)
- **Display ecosystem** — dozens of boards with built-in screens

---

*"Every pocket has a phone. Every phone has USB-C. Every USB-C can connect to a MohnSter Node. That's 4 billion potential trainers."*

— Richard Mohn, February 2026
