# MohnSters — Production-Ready Game Plan V2

> **Last Updated:** February 2026
> **Project:** MohnSters — AI-Powered Collectible Creature Game
> **Parent:** Mohn Empire Powered LLC
> **Contact:** hello@mohnsters.com | investors@mohnsters.com

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [The Core Concept](#the-core-concept)
3. [Legal Abstraction Layer](#legal-abstraction-layer)
4. [Technical Architecture](#technical-architecture)
5. [Game Mechanics](#game-mechanics)
6. [Sustainable Tokenomics](#sustainable-tokenomics)
7. [Revenue Model](#revenue-model)
8. [Implementation Phases](#implementation-phases)
9. [What We've Already Built](#what-weve-already-built)
10. [Cross-Platform Integration](#cross-platform-integration)
11. [Risk Mitigation](#risk-mitigation)
12. [Success Metrics](#success-metrics)

---

## Executive Summary

**MohnSters** is an AI-powered collectible creature game that lets players scan any physical trading card (Pokémon, Yu-Gi-Oh!, MTG, sports cards) and generate a unique, legally original digital creature. These creatures can be leveled up, evolved, battled against other players, and backed by real physical cards stored in an insured vault.

### What Makes This Different

- **Real Card Backing:** Digital creatures can be powered up by physical cards in a vault
- **Legal AI Generation:** Proprietary abstraction layer ensures all creatures are 100% original IP
- **Multi-Platform Token:** $MOHN works across 6+ platforms in the Mohn Empire — not just this game
- **Sustainable Economy:** Revenue comes from subscriptions and services, not token speculation
- **Auto-Battler (NOT Pokémon clone):** RTS-style tactical deployment, not turn-based RPG

### The Key Insight

Games share mechanics; they differ in execution. We don't copy any IP. We extract **generic attributes** (stats, element type, body silhouette, color palette) from scanned cards and generate **completely original creatures** that have zero visual or named similarity to the source material.

---

## The Core Concept

### User Flow

```
1. Player scans a physical trading card (phone camera or ESP32 scanner)
2. AI extracts generic attributes: HP → power level, Fire type → "Flame" element, etc.
3. Abstraction layer strips ALL copyrighted terms/imagery
4. AI generates unique 2D art → optional 3D model
5. Player receives a one-of-a-kind MohnSter with randomized stats
6. Player battles, levels up, evolves, and earns $MOHN
```

### What The Player Experiences

- **Scan** → "Extracting DNA..." → "Forging body..." → "Your MohnSter is ready!"
- Every scan produces a unique creature — even scanning the same card twice yields different results
- Creatures belong to 6 elements: Flame, Aqua, Nature, Thunder, Mind/Shadow, Crystal
- Each creature has: HP, ATK, DEF, SPD, Level, Element, Abilities, Rarity

---

## Legal Abstraction Layer

### The Critical Protection System

This is the single most important technical component. It ensures legal compliance.

#### Stage 1: Card Scan → Generic Data Extraction

```
Card Input: "Charizard, 120 HP, Fire/Flying, Rare Holographic"

Abstraction Output:
{
  powerLevel: 12,        // 120 HP ÷ 10
  element: "Flame",      // "Fire" → "Flame" (generic mapping)
  bodyType: "winged-humanoid",  // Computer vision silhouette detection
  colorScheme: ["#FF6B35", "#F7931E", "#FDB827"],  // Dominant colors
  rarity: "rare",
  aggression: "aggressive"  // ATK > DEF
}
```

**The magic:** The AI never sees "Charizard." It only sees generic attributes that could describe ANY fire dragon.

#### Stage 2: Safe AI Prompt Generation

```
"A fantasy creature for a trading card game,
winged-humanoid form, Flame elemental type,
color palette: #FF6B35, #F7931E, #FDB827,
aggressive stance, power level: 12/10,
highly detailed, vibrant fantasy art style
--no pokemon, nintendo, gamefreak, pikachu, charizard"
```

#### Type Mapping (Removes All IP-Specific Terms)

| Source Term | Generic Term |
|-------------|-------------|
| Fire | Flame |
| Water | Aqua |
| Grass | Nature |
| Electric | Thunder |
| Psychic | Mind |
| Fighting | Combat |
| Dragon | Wyrm |
| Dark | Shadow |
| Fairy | Crystal |

#### Computer Vision Body Detection

- Detects silhouette features: wings, legs, horns, tail, shell, fins
- Returns generic descriptors: `winged-humanoid`, `flying-quadruped`, `aquatic-serpent`, etc.
- Never uses card name, character name, or franchise-specific terminology

---

## Technical Architecture

### Production System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    USER'S DEVICE                        │
│              (Next.js 16 Web App / PWA)                 │
└─────────────────┬───────────────────────────────────────┘
                  │ 1. Upload card image
                  ▼
┌─────────────────────────────────────────────────────────┐
│              FIREBASE CLOUD FUNCTION                    │
│               (Lightweight Trigger)                     │
│  - Receives image                                       │
│  - Runs OCR (Google Vision API)                         │
│  - Extracts card data                                   │
│  - Creates job in Firestore jobs/pending                │
│  - Returns immediately (< 5 seconds)                    │
└─────────────────┬───────────────────────────────────────┘
                  │ 2. Job queued
                  ▼
┌─────────────────────────────────────────────────────────┐
│             WORKER SERVER FLEET                         │
│          (Railway / Render / AWS Fargate)                │
│                                                         │
│  Each worker:                                           │
│  1. Watches Firestore for pending jobs                  │
│  2. Claims a job (atomic transaction)                   │
│  3. Runs 4-stage AI pipeline:                           │
│     a. Abstraction Layer (strip IP terms)               │
│     b. 2D Generation (Leonardo.ai API)                  │
│     c. 3D Generation (Meshy.ai API) [optional]          │
│     d. Post-processing (optimization)                   │
│  4. Uploads assets to Firebase Storage                  │
│  5. Updates monsters/{id} in Firestore                  │
│  6. Marks job complete                                  │
└─────────────────┬───────────────────────────────────────┘
                  │ 3. Real-time update (Firestore listener)
                  ▼
┌─────────────────────────────────────────────────────────┐
│                    USER'S DEVICE                        │
│  "Extracting DNA..." → "Forging body..." → "Ready!"    │
└─────────────────────────────────────────────────────────┘
```

### Why Worker Servers (Not Cloud Functions)

- **No timeouts:** Workers run indefinitely (Cloud Functions have 9-min max)
- **Auto-scales:** Add more workers as traffic grows
- **Cost efficient:** Only pay for active processing time
- **Resilient:** Failed jobs auto-retry with exponential backoff

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 16 (App Router) | Marketing site + game PWA |
| Mobile | React Native or Flutter | Native iOS/Android (Phase 5) |
| Auth | Firebase Auth | Email, Google, Apple Sign-In |
| Database | Firestore | Real-time game state + user data |
| Storage | Firebase Storage | Card images, creature assets, 3D models |
| Workers | Railway / AWS Fargate | AI pipeline processing |
| 2D Gen | Leonardo.ai API | Creature 2D art generation |
| 3D Gen | Meshy.ai API | Image-to-3D model conversion |
| OCR | Google Vision API | Card text/data extraction |
| CV | TensorFlow.js / Vision | Silhouette body detection |
| Token | Solana (SPL) | $MOHN utility token |
| Payments | Stripe | Fiat purchases, subscriptions |
| 3D Viewer | Three.js / React Three Fiber | In-browser 3D model display |
| Battles | Phaser.js or custom engine | Auto-battler game engine |

---

## Game Mechanics

### NOT Pokémon — "Mohn Arena Tactics"

This is an **auto-battler** (like Teamfight Tactics / Clash Royale), NOT a turn-based RPG like Pokémon.

#### Core Game Loop

```
1. Scan real cards → Generate unique MohnSters
2. Build a team (3 MohnSters max)
3. Enter arena (top-down tactical view)
4. Deploy MohnSters strategically (position matters)
5. Auto-battle (creatures use AI to fight)
6. Win → Earn Gold + XP + $MOHN (from tournaments)
```

#### What Makes It Different From Pokémon

| Feature | Pokémon | MohnSters |
|---------|---------|-----------|
| Creature Source | Catch in-game | Scan real cards |
| Battle Style | Turn-based RPG | Auto-battler RTS |
| Team Size | 6 Pokémon | 3 MohnSters |
| Economy | In-game only | Real crypto ($MOHN) |
| Physical Backing | None | Vault system |
| Card Source | Nintendo IP | AI-generated original |
| Breeding | Type-based | Fusion mechanics |

#### Element Advantage System

```
Flame > Nature > Aqua > Flame (Rock-Paper-Scissors core)
Thunder > Aqua, Thunder < Nature
Shadow > Mind, Shadow < Crystal
Crystal > Shadow, Crystal < Flame
```

#### Progression System

- **Level 1-30:** XP from battles, quests, vault boosts
- **Level 30:** Evolution unlock (costs 500 $MOHN + Gold)
- **Evolution:** Creature transforms into visually upgraded form
- **Fusion:** Combine 2 max-level creatures → new hybrid species

---

## Sustainable Tokenomics

### Dual Currency System (Fixes "Death Spiral" Problem)

Most P2E games collapse because they print unlimited tokens. MohnSters uses two currencies:

#### 🪙 Gold (Soft Currency — Unlimited)

- **Earned from:** Battles, daily quests, achievements, login streaks
- **Used for:** Basic upgrades, repairs, cosmetics, level-up costs
- **NOT tradeable, NOT cryptocurrency**
- **Purpose:** Keeps gameplay rewarding without inflating token supply

#### 💎 $MOHN (Hard Currency — Fixed Supply)

- **Earned from:** Tournaments (limited prizes), marketplace sales, vault yield
- **Used for:** Premium features, NFT minting, evolution, speed-ups, pack purchases
- **IS tradeable, IS cryptocurrency**
- **Purpose:** Scarce, deflationary, real-world value

### The Critical Rule: Burn More Than You Print

Every $MOHN transaction burns 5% permanently. The system auto-adjusts:

- If burn rate drops below 1.2x print rate → increase costs automatically
- Pack purchases, evolutions, vault fees, NFT minting — all burn $MOHN
- As ecosystem grows, supply ONLY decreases

### Token Distribution

| Allocation | Amount | % | Vesting |
|-----------|--------|---|---------|
| Community Mining Pool | 40,000,000 | 40% | 10-year halving schedule |
| Business Rewards | 20,000,000 | 20% | Released per-platform |
| Platform Treasury | 15,000,000 | 15% | Transaction fees → buybacks |
| Team & Founders | 15,000,000 | 15% | 4-year linear vest |
| Early Adopter Bonus | 10,000,000 | 10% | 200 $MOHN per signup (first 10K) |
| **Total** | **100,000,000** | **100%** | **Fixed forever** |

---

## Revenue Model

Revenue is NOT reliant on token sales. It comes from real products and services.

| Source | Description | Type |
|--------|------------|------|
| Premium Subscriptions | MohnSters Pass: $4.99/mo (unlimited scans, 2x XP, daily packs) | Recurring |
| Pack Sales | $MOHN or USD pack purchases | Recurring |
| NFT Minting Fees | Burn-based deflationary mechanism | Recurring |
| Marketplace Commission | 5% on all peer-to-peer trades | Recurring |
| Tournament Entry | Weekly competitive events | Recurring |
| Vault Storage | Monthly custody + insurance fees | Recurring |
| ESP32 Scanner Hardware | Physical product pre-orders and sales | One-time |
| Platform Services | Revenue from NeighborTechs, MohnMatrix, Flaming Social | Recurring |

### Projected Revenue (at 10,000 active users)

| Stream | Monthly | Annual |
|--------|---------|--------|
| Subscriptions | $30,000 | $360,000 |
| Pack Sales | $15,000 | $180,000 |
| Marketplace Fees | $10,000 | $120,000 |
| Fiat → $MOHN Convenience | $20,000 | $240,000 |
| Hardware Sales | $5,000 | $60,000 |
| **Total** | **$80,000** | **$960,000** |

---

## Implementation Phases

### Phase 1: Scanner MVP (Q1-Q2 2026) — IN PROGRESS

**Goal:** Prove the abstraction layer works legally. Prove users want to scan cards.

**Deliverables:**
- [x] Next.js 16 web app (marketing site with 60+ pages)
- [x] Design system ("Neon Dungeon" dark-mode theme)
- [x] 3D animated creature component (SVG with CSS 3D transforms)
- [x] API routes (Stripe checkout, auth, scan, packs, battle, vault, wallet, collection, leaderboard)
- [x] Firebase integration (Auth, Firestore, Storage)
- [ ] Camera-based card scanner (Google Vision OCR)
- [ ] Abstraction layer (generic attribute extraction)
- [ ] Leonardo.ai integration (2D creature generation)
- [ ] Worker server deployment (Railway)

**Success Metric:** 1,000 users scan cards, 0 legal complaints

### Phase 2: 3D Pipeline & Collection (Q3-Q4 2026)

**Goal:** Full creature generation pipeline with 3D models.

**Deliverables:**
- [ ] Worker server fleet (auto-scaling)
- [ ] Meshy.ai integration (image-to-3D)
- [ ] Three.js / React Three Fiber viewer
- [ ] Monster collection page + portfolio
- [ ] "Evolve to 3D" premium feature ($1 or wait 24 hours)
- [ ] Dual currency introduction (Gold + $MOHN)

**Success Metric:** 20% of users pay for 3D evolution

### Phase 3: Battle System (Q1-Q2 2027)

**Goal:** Playable competitive game with daily engagement loops.

**Deliverables:**
- [ ] Auto-battler engine (Phaser.js)
- [ ] AI-driven creature combat behavior
- [ ] Matchmaking system (Quick, Ranked, Tournament)
- [ ] Daily quests + achievement system
- [ ] Season pass (free + premium tracks, 50 tiers)
- [ ] XP, leveling, and evolution system

**Success Metric:** 30% DAU play daily battles

### Phase 4: $MOHN Token Launch (Q3-Q4 2027)

**Goal:** Full crypto integration ONLY after the game has proven product-market fit.

**Deliverables:**
- [ ] Solana SPL token deployment
- [ ] Phantom wallet integration
- [ ] Cross-platform $MOHN economy (MohnSters + NeighborTechs + MohnMatrix + etc.)
- [ ] NFT marketplace (original MohnSters only)
- [ ] Tournament system with $MOHN prize pools
- [ ] Governance voting for game features

**Success Metric:** 10% of users buy $MOHN for utility (not speculation)

### Phase 5: Hardware & Global Scale (2028+)

**Goal:** Physical products and mass-market expansion.

**Deliverables:**
- [ ] ESP32 physical card scanner (auto-scan queue)
- [ ] Native mobile apps (iOS + Android)
- [ ] International expansion (localization)
- [ ] Strategic partnerships (card shops, game stores)
- [ ] Full Mohn Empire ecosystem maturity

**Success Metric:** 500+ ESP32 pre-orders, 100K+ total users

---

## What We've Already Built

The marketing site is **fully functional** with:

| Component | Status | Details |
|-----------|--------|---------|
| Next.js 16 App | ✅ Complete | App Router, React 19, Turbopack |
| 60+ Static Pages | ✅ Complete | 50 state landing pages + feature pages |
| 10 API Routes | ✅ Complete | Stripe, auth, scan, packs, battle, vault, wallet, collection, leaderboard |
| Stripe Integration | ✅ Complete | Checkout, webhooks, payment processing |
| Firebase Backend | ✅ Complete | Auth, Firestore, Storage ready |
| 3D Creature Component | ✅ Complete | 6 animated SVG creatures with CSS 3D transforms |
| Design System | ✅ Complete | "Neon Dungeon" theme, glassmorphism, responsive |
| Pack Store UI | ✅ Complete | 4-tier pack system with pricing |
| Battle Preview UI | ✅ Complete | Element advantage display |
| Vault Preview UI | ✅ Complete | Card vault feature showcase |
| Empire Page | ✅ Complete | Full ecosystem overview + growth analysis |
| Investor Relations | ✅ Complete | Market data, roadmap, revenue model, contact |
| Professional Footer | ✅ Complete | Corporate info, address, legal, Empire links |

---

## Cross-Platform Integration

### The Mohn Empire Ecosystem

$MOHN earned in MohnSters flows across all platforms:

| Platform | Domain | Status | $MOHN Integration |
|----------|--------|--------|-------------------|
| MohnSters | mohnsters.com | Building | Earn from gameplay, spend on packs/evolution |
| NeighborTechs | neighbortechs.com | Live | Earn from IT repair jobs, spend on services |
| MohnMint | mohnmint.com | Building | Wallet, staking, bridge, governance |
| MohnMatrix | mohnmatrix.com | Live | Earn from background checks, spend on data |
| Flaming Social | flamingsocialmedia.com | Live | Earn from campaigns, spend on promotions |
| MohnMove | mohnmove.com | Planned | Earn from deliveries, spend on logistics |

### Cross-Platform Value Flow Example

```
1. A NeighborTechs technician earns 500 $MOHN from fixing a laptop
2. They spend 200 $MOHN opening a Legendary pack in MohnSters
3. They pull a Mythic MohnSter worth 2,000 $MOHN on the marketplace  
4. They sell it and use 1,000 $MOHN for MohnMatrix background check for a new gig
5. Every transaction burned 5% — supply decreased, value potential increased
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| IP infringement from card scans | Abstraction layer strips ALL IP terms; AI never sees card names |
| Token economy collapse ("death spiral") | Dual currency (Gold/free + $MOHN/scarce); burn > mint enforcement |
| Firebase timeout on AI generation | Worker server fleet with async job queue (no 9-min Cloud Function limit) |
| Regulatory scrutiny on token | $MOHN is utility token with real usage across 6+ platforms; clear disclaimers |
| Single-game dependency | $MOHN is multi-platform; game death doesn't kill token |
| Cost of AI generation | Tiered pricing: free 2D (ad-supported) → paid 3D ($1 or subscription) |
| Player retention | Daily quests, season pass, achievements, social tournaments |
| Scalability | Firestore auto-scales; worker fleet adds instances on demand |

---

## Success Metrics

### Phase 1 KPIs (Scanner MVP)

- [ ] 1,000+ unique card scans
- [ ] 0 legal/IP complaints
- [ ] < 30 second scan-to-creature time
- [ ] 50% scan completion rate
- [ ] < $0.10 cost per scan

### Phase 2 KPIs (3D Pipeline)

- [ ] 20% conversion to paid 3D evolution
- [ ] 500+ 3D models generated
- [ ] < 5 minute 3D generation time
- [ ] 5,000+ active users

### Phase 3 KPIs (Battle System)

- [ ] 30% DAU play battles
- [ ] 15-minute average session length
- [ ] 40% D7 retention rate
- [ ] 10,000+ active users

### Phase 4 KPIs ($MOHN Launch)

- [ ] 10% of users hold $MOHN
- [ ] Burn rate > 1.2x mint rate
- [ ] $50,000+ monthly revenue
- [ ] 25,000+ active users

### Phase 5 KPIs (Scale)

- [ ] 500+ ESP32 pre-orders
- [ ] 100,000+ total users
- [ ] 6+ platforms using $MOHN
- [ ] Break-even or profitable operations

---

## Contact

**Mohn Empire Powered LLC**
23 Shore Street, Petersburg, Virginia 23803

- **General:** hello@mohnsters.com
- **Investors:** investors@mohnsters.com
- **Website:** [mohnsters.com](https://mohnsters.com)

---

*This document is proprietary and confidential. It is intended for internal planning and authorized partners only. $MOHN is a utility token and this document does not constitute an offer to sell or solicitation of an offer to buy securities.*
