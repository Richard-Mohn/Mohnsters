# MohnSters: The Digital Collectible Ecosystem

## Phase 1: Foundation & Marketing

**Mission:** Establish the MohnSters brand, create a strong SEO foundation, and build the core application scaffolding.

### 1.1: Project Vision

MohnSters is a comprehensive platform for trading card collectors that bridges the gap between physical and digital assets. It solves the biggest pain points in the hobby—tedious scanning and lack of liquidity—through a unique ecosystem.

*   **Core Utility:** A web application with a superior, AI-powered card scanner. The ultimate goal is to pair this with a custom, open-source hardware auto-scanner (ESP32-based).
*   **Gamification:** Scanned cards are used as a "seed" to generate unique, AI-created "Mohnsters." These creatures can be battled, trained, and evolved in an integrated web game.
*   **Economy:** A native cryptocurrency, `$MOHN`, powers the ecosystem. It's earned by scanning cards and used for in-game actions, minting, and trading.
*   **Asset Bridge (The Vault):** A future-state feature where users can send their physical cards to a secure vault. In return, their digital "Mohnster" becomes a tradable NFT, backed by the real-world asset, creating true digital liquidity.
*   **Social Hub:** Integrated social features for users to share collections, trade Mohnsters, and connect with the community.

### 1.2: Technical Architecture

*   **Marketing Site:**
    *   **Framework:** Next.js 16 (App Router, ISR)
    *   **Styling:** Tailwind CSS
    *   **Deployment:** Firebase Hosting (or Vercel)
    *   **SEO Strategy:** Programmatic generation of landing pages for all 50 US states to capture local search interest (e.g., "card scanner app ohio").

*   **Web Application:**
    *   **Framework:** Flutter
    *   **State Management:** Riverpod
    *   **Deployment:** Firebase Hosting
    *   **Backend:** Firebase (Auth, Firestore, Cloud Functions)

*   **AI & Gaming:**
    *   **Image Recognition:** Google Cloud Vision API (for initial OCR).
    *   **Creature Generation:** A Stable Diffusion or Midjourney API, seeded by card data.
    *   **Game Engine (Future):** Phaser.js or React Three Fiber for a 2D/2.5D web-based auto-battler.

### 1.3: Phase 1 Roadmap

-   [x] **Project Scaffolding:** Create `MohnSters` monorepo with `marketing-site` and `app` sub-projects.
-   [x] **Blueprint Creation:** Establish this `BLUEPRINT.md` file.
-   [x] **Marketing Homepage:** Design and build a "Coming Soon" landing page.
-   [x] **Programmatic SEO:**
    -   [x] Create state data source.
    -   [x] Implement dynamic route `/[state]/page.tsx`.
    -   [x] Generate a `sitemap.xml` for all state pages.
-   [x] **Flutter App - Initial UI:**
    -   [x] Build the main navigation shell (Bottom Nav Bar).
    -   [x] Create a placeholder "Scanner" screen.
    -   [x] Create a placeholder "Portfolio" screen.
    -   [x] Create a placeholder "Mohnster Arena" screen.
    -   [x] Create a placeholder "Social" screen.

### 1.5: Phase 1.5 Roadmap - Camera Integration

-   [x] **Add `camera` package:** Add the `camera` package to `pubspec.yaml`.
-   [x] **Add `path_provider` package:** Add the `path_provider` package to `pubspec.yaml`.
-   [x] **Implement Camera Functionality in `ScannerScreen`:**
    -   [x] Change `ScannerScreen` to `StatefulWidget`.
    -   [x] Initialize `CameraController` and `List<CameraDescription>`.
    -   [x] Handle camera initialization and disposal in `initState` and `dispose`.
    -   [x] Display `CameraPreview`.
    -   [x] Add a `FloatingActionButton` to take a picture.

---

## Phase 2: Card Scanner Web App (MohnSters Scanner)

> **Status:** Building
> **Goal:** Launch the best free trading card scanner on the market. Beat Collector App on free tier (100 free scans vs their 25), speed, multi-collectible support, and pricing ($0.99 Pro vs their $7.99/mo).

### 2.1: Competitive Analysis

| Feature | Collector App | TCGplayer | Dragon Shield | **MohnSters** |
|---------|--------------|-----------|---------------|---------------|
| Free Scans | 25 | Unlimited (no value) | Unlimited (MTG only) | **100** |
| AI Image Recognition | Yes (slow) | Yes (broken) | No (set search) | **Yes (instant)** |
| Multi-Category | TCG only | TCG only | MTG only | **All collectibles** |
| Portfolio Tracking | Yes | Basic | Yes | **Yes + charts** |
| Social Features | Basic | No | No | **Full social + trading** |
| Hardware Scanner | No | No | No | **ESP32 (planned)** |
| NFT Conversion | No | No | No | **Yes (Vault)** |
| Marketplace | eBay links | Yes | No | **Built-in P2P** |
| Creature Game | No | No | No | **MohnSter Arena** |
| Pro Price | $7.99/mo | N/A | N/A | **$0.99/mo** |

**Blue Ocean Advantages:**
1. No competitor combines scanning + gaming + NFTs + social + marketplace
2. Zero hardware scanners on the market — ESP32 auto-scanner is first-mover
3. Pokémon TCG Pocket proved mobile card gaming = $90.4M/month revenue
4. Cross-collectible scanning (cards, coins, comics) — only PriceCharting does multi-category but uses barcodes, not AI vision
5. TCG market is $7.51B (2025) growing to $11.47B by 2031 at 7.3% CAGR

### 2.2: Scanner Technical Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                    MohnSters Scanner                           │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  Camera Sources:                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐                │
│  │ Phone Cam │  │ Webcam   │  │ ESP32-CAM    │                │
│  │ (default) │  │ (desktop)│  │ (auto-scan)  │                │
│  └─────┬────┘  └─────┬────┘  └──────┬───────┘                │
│        └──────────────┴──────────────┘                         │
│                       │                                        │
│  ┌────────────────────▼──────────────────────┐                │
│  │         AI Recognition Pipeline            │                │
│  │  1. Edge detection → crop card             │                │
│  │  2. OCR → extract name, set, number        │                │
│  │  3. Hash → image similarity match          │                │
│  │  4. API lookup → PokémonTCG / Scryfall     │                │
│  │  5. Price fetch → TCGplayer / eBay sold     │                │
│  └────────────────────┬──────────────────────┘                │
│                       │                                        │
│  ┌────────────────────▼──────────────────────┐                │
│  │         Match & Value Screen               │                │
│  │  • Card image (yours vs database match)    │                │
│  │  • Name, set, number, rarity               │                │
│  │  • Condition selector (Raw/PSA/BGS/CGC)    │                │
│  │  • Market value (low/mid/high)             │                │
│  │  • Variant selector (1st Ed, Holo, etc.)   │                │
│  │  • "Add to Portfolio" button               │                │
│  │  • PSA/BGS slab visualization (if graded)  │                │
│  └───────────────────────────────────────────┘                │
│                                                                │
│  Supported Categories:                                         │
│  • Pokémon TCG    • Yu-Gi-Oh!    • Magic: The Gathering       │
│  • Sports Cards   • One Piece    • Dragon Ball Super          │
│  • Coins/Currency • Comics       • Funko Pops (future)        │
└───────────────────────────────────────────────────────────────┘
```

### 2.3: Scanner App Screens (Bottom Nav: 6 Tabs)

| Tab | Screen | Description |
|-----|--------|-------------|
| 🏠 | **Home** | Portfolio overview, market movers, trending cards, articles |
| 🔍 | **Search** | Browse all products by category, manual search, favorites |
| 📷 | **Scan** | Camera viewfinder with card detection box, settings (camera source, flash) |
| 🛒 | **Shop** | P2P marketplace, auctions, "Drip" live drops, article feed |
| 💬 | **Social** | Follow users, post collection photos, DMs, hashtags, trading offers |
| 📊 | **Portfolio** | All collections, market value chart (5yr), bulk actions, export CSV |

### 2.4: Pricing Strategy

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | 100 scans, 1 portfolio, basic search, price lookup, 1yr chart |
| **Pro** | $0.99/mo | Unlimited scans, unlimited portfolios, export CSV, 5yr charts, priority scanning, custom themes, P&L tracking |
| **Dealer** | $4.99/mo | Everything in Pro + bulk scan mode, inventory management, label printing, sales analytics, featured shop listing |

### 2.5: ESP32 Hardware Auto-Scanner (Future)

**Concept:** An affordable ($15-25 BOM) open-source scanning station:
- ESP32-CAM module (OV2640 sensor, WiFi built-in)
- 3D-printed card stand + overhead camera mount
- Motorized card feeder (servo or stepper motor) — user loads stack, cards rotate under camera
- Connects to MohnSters web app via local WiFi — shows up as camera source in scan settings
- Firmware updatable via web app OTA
- **MVP Alternative:** Use phone as the camera, sell just the motorized card feeder stand ($10-15)

### 2.6: The Vault — Physical-to-Digital Bridge

```
User scans card → Card added to portfolio → User clicks "Vault This Card"
→ Shipping label generated (prepaid) → User sends card in provided maglid case
→ We receive & verify card → AI generates unique MohnSter NFT from card data
→ NFT minted to user's account → Physical card stored in insured vault
→ User can: trade NFT, sell NFT, or request card back (shipping fee)
```

**NFT Value:** The NFT is backed by a real physical card in a vault. If the card is a PSA 10 Charizard worth $5,000 — the NFT has real-world backing, not just a JPEG.

### 2.7: Phase 2 Roadmap

- [ ] **Web App Foundation (Flutter):**
  - [ ] Set up Firebase project for MohnSters
  - [ ] Auth flow (email + Google Sign-In)
  - [ ] Bottom navigation with 6 tabs
  - [ ] Camera integration (getUserMedia for web)
- [ ] **Scanner MVP:**
  - [ ] Card detection (edge detection in frame)
  - [ ] Auto-capture when card is centered
  - [ ] OCR pipeline (Google Cloud Vision or on-device TFLite)
  - [ ] PokémonTCG API integration (free, 20K req/day)
  - [ ] Scryfall API integration (MTG, free, unlimited)
  - [ ] Match results screen with variant/condition selector
  - [ ] Price lookup (TCGplayer affiliate or eBay sold listings)
- [ ] **Portfolio:**
  - [ ] Add to portfolio flow
  - [ ] Portfolio value chart (1yr free, 5yr Pro)
  - [ ] Market movers (your cards gaining/losing value)
  - [ ] Collection statistics (total cards, total value, category breakdown)
- [ ] **Marketing Site:**
  - [ ] `/scanner` page — scanner feature breakdown, comparison table, CTA
  - [ ] Live stats on homepage (total cards scanned, total value tracked)
  - [ ] Programmatic SEO: "best [category] card scanner app [state]" pages
- [ ] **Monetization:**
  - [ ] Stripe subscription (Free → Pro $0.99/mo → Dealer $4.99/mo)
  - [ ] Scan counter (100 free, then Pro gate)
  - [ ] In-app purchase for MohnSter Packs ($MOHN or USD)

---

## Phase 3: Social & Marketplace

- [ ] Social feed (follow users, post collection photos)
- [ ] Trading system (offer cards, accept/reject, shipping labels)
- [ ] P2P marketplace (list cards for sale, Stripe Connect payouts)
- [ ] Chat/DMs between users
- [ ] Reputation system (trade rating, verified seller badges)

---

## Phase 4: MohnSter Arena (Gaming)

- [ ] AI creature generation from scanned card data
- [ ] Battle system (auto-battler, elemental weaknesses)
- [ ] Leaderboards and seasons
- [ ] $MOHN rewards for wins
- [ ] Creature evolution and training

---

## Phase 5: The Vault & NFTs

- [ ] Physical card intake system (shipping labels, verification)
- [ ] NFT minting pipeline (Solana SPL)
- [ ] Vault storage and insurance
- [ ] NFT marketplace
- [ ] Card return request flow

---

## Phase 6: ESP32 Hardware Scanner

- [ ] ESP32-CAM firmware (WiFi streaming to web app)
- [ ] 3D-printed card stand + mount (open-source STL files)
- [ ] Motorized card feeder prototype
- [ ] Web app camera source selector (Phone / Webcam / ESP32)
- [ ] OTA firmware update via web app
- [ ] Hardware kit sales page on MohnSters store
