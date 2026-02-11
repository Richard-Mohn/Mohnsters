# MohnSters — The Ultimate Gameplan

> **Last Updated:** February 8, 2026
> **Status:** Phase 2 — Full Platform Build
> **Domain:** mohnsters.com
> **Token:** $MOHN (powered by MohnMint ecosystem)

---

## 1. Vision — What MohnSters Is

MohnSters is a **collectible card game meets digital creature ecosystem** — designed for adults AND kids. Think Pokémon TCG meets Tamagotchi meets crypto rewards. The core loop:

1. **Scan** a physical trading card → earn $MOHN tokens
2. **Open Packs** with $MOHN → get unique AI-generated MohnSter creatures
3. **Battle** your MohnSters against other players
4. **Vault** your physical cards → they back your digital creatures as appreciating assets
5. **Trade & Earn** — your vaulted cards grow in value, and you earn passive $MOHN income

**Key Differentiator:** Physical cards scanned into the vault become the "soul" of your MohnSter. The card is securely held by MohnSters (like a bank) but belongs to the user. If they want it back, they convert back to $MOHN with a small depreciation fee — but while vaulted, the card appreciates and generates yield.

---

## 2. Core Mechanics

### 2.1 Card Scanning
- User scans any physical trading card (Pokémon, Yu-Gi-Oh, MTG, sports cards, etc.)
- AI identifies the card, grades condition, estimates market value
- User earns **10-100 $MOHN per scan** based on card rarity/value
- Scanned cards appear in the user's **Digital Binder**

### 2.2 Pack Opening System
- Users spend $MOHN to buy digital MohnSter packs
- Pack tiers: **Common (50 $MOHN)**, **Rare (200 $MOHN)**, **Legendary (1000 $MOHN)**, **Mythic (5000 $MOHN)**
- Packs bought with Stripe (USD) also available — $0.99, $4.99, $9.99, $49.99
- Each pack contains 3-5 MohnSter creature cards with randomized stats
- Pack opening has flashy animations — holographic reveals, element effects
- **Pity System:** Guaranteed rare+ every 10 packs, legendary every 50

### 2.3 MohnSter Creatures
- AI-generated creatures with unique art, names, and abilities
- **6 Elements:** Fire 🔥, Water 💧, Earth 🌿, Lightning ⚡, Shadow 🌑, Crystal 💎
- **Rarity tiers:** Common (60%), Uncommon (25%), Rare (10%), Legendary (4%), Mythic (1%)
- Stats: HP, Attack, Defense, Speed, Special
- Creatures can be **leveled up** by battling or feeding them $MOHN
- **Evolution:** At max level, MohnSters can evolve into stronger forms

### 2.4 Battle System
- Turn-based auto-battler (think Pokémon Showdown meets idle RPG)
- Pick 3 MohnSters for your team
- Element advantages: Fire > Earth > Lightning > Water > Fire, Shadow ⟷ Crystal
- Win battles → earn $MOHN + XP for your creatures
- **Ranked Seasons** with leaderboards and prize pools
- **Arena Modes:** Quick Battle, Ranked, Tournament, Boss Raids

### 2.5 The Vault (Physical Card Custody)
- User mails physical card to MohnSters vault facility
- Card is professionally graded, photographed, and stored in climate-controlled vault
- Digital record tied to user's account — they still "own" it
- **While vaulted:**
  - Card backs a unique "Vaulted MohnSter" NFT
  - Generates passive $MOHN income (0.5-2% monthly based on card value)
  - Card value tracked via market API — appreciation reflected in $MOHN balance
  - Vaulted MohnSters get a special gold border and +20% battle stats
- **Withdrawal:** User can request card back anytime
  - Costs 10% of current card value in $MOHN (depreciation/handling fee)
  - Card shipped back insured within 5-7 business days
  - Digital MohnSter reverts to standard version

### 2.6 $MOHN Economy in MohnSters
| Action | $MOHN Flow |
|--------|-----------|
| Scan a card | **Earn** 10-100 |
| Open Common pack | **Spend** 50 |
| Open Rare pack | **Spend** 200 |
| Open Legendary pack | **Spend** 1,000 |
| Open Mythic pack | **Spend** 5,000 |
| Win Quick Battle | **Earn** 5-20 |
| Win Ranked Battle | **Earn** 20-100 |
| Tournament Prize | **Earn** 500-10,000 |
| Feed MohnSter (level up) | **Spend** 10/level |
| Evolve MohnSter | **Spend** 500 |
| Vault a card | **Earn** passive 0.5-2%/mo |
| Withdraw from vault | **Spend** 10% of card value |
| Trade a MohnSter | 5% fee burned |

---

## 3. User Roles & Accounts

### Player Roles
- **Collector** — Focused on scanning, collecting, and completing the MohnSter dex
- **Battler** — Focused on PvP battles, rankings, and tournaments
- **Investor** — Focused on vaulting cards, earning yield, and trading

### Account System
- Firebase Auth (Email, Google, Apple)
- Single wallet tied to MohnMint ecosystem
- User profile with avatar (chosen MohnSter), stats, level, achievements
- **Parental Controls:** Kid-safe mode disables trading/real money, limits chat

---

## 4. Design Language

### Theme: "Neon Dungeon" — Dark Fantasy Game UI
- **Background:** Deep black (#050507) with floating monster silhouettes & particles
- **Primary Color:** Electric Purple (#8B5CF6) — magical, fantasy, game-like
- **Secondary Color:** Toxic Green (#22C55E) — XP, earning, growth
- **Accent Color:** Gold (#EAB308) — $MOHN, premium, legendary
- **Danger Color:** Crimson (#EF4444) — fire element, warnings
- **Fonts:** Rajdhani (bold headings — angular, game-like), Inter (body text — clean readability)
- **Cards:** Glassmorphism with holographic shimmer effect on hover
- **Animations:** Floating monsters in background, particle effects, card flip animations
- **Border Radius:** 16px (cards), 12px (buttons), 999px (pills/badges)

### Visual References
- Pokémon TCG Online card reveal animations
- Genshin Impact's wish/gacha pull system
- Hearthstone's pack opening experience
- Loot.tv's gamified reward UI

---

## 5. Page Structure

### Public Pages (Marketing)
1. **/** — Hero with floating MohnSters, CTA to sign up
2. **/how-it-works** — 4-step visual flow (Scan → Collect → Battle → Earn)
3. **/packs** — Pack store with pricing, odds, featured packs
4. **/vault** — Vault explanation, yield calculator, trust badges
5. **/battle** — Arena preview, leaderboards, season info
6. **/tokenomics** — $MOHN integration, earn/spend table
7. **/[state]** — SEO pages (50 states)

### Authenticated App Pages
1. **/dashboard** — Home with MohnSter team, recent activity, $MOHN balance
2. **/scan** — Camera-based card scanner
3. **/collection** — Digital binder of all scanned cards + MohnSters
4. **/packs/open** — Pack opening experience with animations
5. **/battle/arena** — Battle lobby, matchmaking, battle view
6. **/vault/my-cards** — Vaulted cards, yield tracking, withdrawal
7. **/wallet** — $MOHN balance, transaction history, buy/sell
8. **/profile** — Avatar, stats, achievements, settings
9. **/leaderboard** — Global and seasonal rankings

### Admin Pages
1. **/admin/cards** — Card database management
2. **/admin/mohnsters** — Creature management
3. **/admin/vault** — Vault inventory, pending shipments
4. **/admin/economy** — $MOHN flow analytics

---

## 6. Technical Architecture

### Frontend: Next.js 16 (App Router)
- Tailwind CSS 4 with custom design system
- Framer Motion for animations
- Canvas / Three.js for particle effects & 3D card renders
- Stripe Elements for payments
- Firebase Auth integration

### Backend: Next.js API Routes + Firebase
- **Auth:** Firebase Auth
- **Database:** Firestore (users, cards, mohnsters, battles, vault, transactions)
- **Payments:** Stripe Checkout + Webhooks
- **Storage:** Firebase Storage (card images, creature art)
- **Functions:** Firebase Cloud Functions for battle resolution, vault processing

### Key API Routes
- `POST /api/auth/register` — Create account
- `POST /api/scan` — Process card scan
- `POST /api/packs/purchase` — Buy packs (Stripe or $MOHN)
- `POST /api/packs/open` — Open a pack, reveal creatures
- `POST /api/battle/start` — Start a battle
- `POST /api/battle/resolve` — AI resolution
- `POST /api/vault/deposit` — Initiate vault deposit
- `POST /api/vault/withdraw` — Request card back
- `GET /api/wallet/balance` — Get $MOHN balance
- `POST /api/stripe/checkout` — Create Stripe session
- `POST /api/stripe/webhook` — Handle Stripe events

---

## 7. Stripe Integration

### Products
| Product | Price (USD) | $MOHN Equivalent |
|---------|------------|-------------------|
| Common Pack x1 | $0.99 | 50 $MOHN |
| Rare Pack x1 | $4.99 | 200 $MOHN |
| Legendary Pack x1 | $9.99 | 1,000 $MOHN |
| Mythic Pack x1 | $49.99 | 5,000 $MOHN |
| $MOHN Bundle (500) | $4.99 | 500 $MOHN |
| $MOHN Bundle (2500) | $19.99 | 2,500 $MOHN |
| $MOHN Bundle (10000) | $69.99 | 10,000 $MOHN |
| Vault Service | $9.99/card | Grading + 1yr storage |
| MohnSters Pass (Monthly) | $4.99/mo | Daily packs + 2x XP |

### Webhook Events
- `checkout.session.completed` → Credit $MOHN or deliver packs
- `invoice.paid` → Renew subscription
- `charge.refunded` → Reverse $MOHN credit

---

## 8. Gamification Features

### Daily Quests
- Scan 3 cards → 30 $MOHN
- Win 2 battles → 40 $MOHN
- Log in daily → 5 $MOHN (streak bonus up to 50)

### Achievement System (Badges)
- First Scan, First Battle, First Trade
- MohnSter Dex completion milestones (10%, 25%, 50%, 100%)
- Win streak badges (5, 10, 25, 50)
- Vault milestones ($100, $500, $1000 in vaulted value)

### Season Pass
- 90-day seasons with 50 reward tiers
- Free track: basic rewards ($MOHN, common packs)
- Premium track ($9.99): Exclusive MohnSters, rare packs, cosmetics

---

## 9. Roadmap

### Phase 2A — Marketing Site Rebuild (NOW)
- [x] Complete design system (Neon Dungeon theme)
- [ ] Homepage with floating MohnSters
- [ ] How It Works page
- [ ] Pack Store preview
- [ ] Vault explanation page
- [ ] Battle arena preview
- [ ] Tokenomics page
- [ ] SEO state pages retained

### Phase 2B — Backend Foundation
- [ ] Firebase project setup
- [ ] Stripe integration (products, checkout, webhooks)
- [ ] API routes for auth, packs, wallet
- [ ] Firestore schema for users, cards, MohnSters

### Phase 2C — Core Game Loop
- [ ] Card scanning (camera + AI identification)
- [ ] Pack opening with animations
- [ ] MohnSter collection/binder
- [ ] Basic battle system

### Phase 2D — Vault & Economy
- [ ] Vault deposit/withdrawal flow
- [ ] $MOHN yield tracking
- [ ] Trading marketplace
- [ ] Leaderboards

### Phase 3 — Social & Polish
- [ ] Friend system, guilds/clans
- [ ] Chat, activity feed
- [ ] Tournament system
- [ ] Mobile app (Flutter) deep integration
