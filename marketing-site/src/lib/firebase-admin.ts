/* ═══════════════════════════════════════════════════════════
   Firebase Configuration for MohnSters
   ═══════════════════════════════════════════════════════════ */

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin (server-side)
function getFirebaseAdmin() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // In production, use service account
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    return initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });
  }

  // In development, use default credentials
  return initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || 'mohnsters-dev',
  });
}

const app = getFirebaseAdmin();

export const db = getFirestore(app);
export const auth = getAuth(app);

/* ─── Collection References ─── */
export const collections = {
  users: db.collection('users'),
  cards: db.collection('cards'),
  mohnsters: db.collection('mohnsters'),
  battles: db.collection('battles'),
  vaultCards: db.collection('vault_cards'),
  transactions: db.collection('transactions'),
  packs: db.collection('packs'),
  leaderboard: db.collection('leaderboard'),
};

/* ─── User Model ─── */
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'player' | 'admin';
  mohnBalance: number;
  level: number;
  xp: number;
  totalScans: number;
  totalBattles: number;
  totalWins: number;
  packsPurchased: number;
  vaultedCardsCount: number;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  stripeCustomerId?: string;
  avatar?: string;
  kidSafeMode?: boolean;
}

/* ─── MohnSter Model ─── */
export interface MohnSter {
  id: string;
  ownerId: string;
  name: string;
  element: 'fire' | 'water' | 'earth' | 'lightning' | 'shadow' | 'crystal';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythic';
  level: number;
  xp: number;
  hp: number;
  atk: number;
  def: number;
  spd: number;
  special: number;
  vaultBoosted: boolean;
  linkedCardId?: string;
  createdAt: FirebaseFirestore.Timestamp;
}

/* ─── Card Scan Model ─── */
export interface ScannedCard {
  id: string;
  ownerId: string;
  name: string;
  set: string;
  game: string; // pokemon, yugioh, mtg, sports
  estimatedValue: number;
  condition: string;
  imageUrl?: string;
  vaulted: boolean;
  vaultedAt?: FirebaseFirestore.Timestamp;
  mohnEarned: number;
  createdAt: FirebaseFirestore.Timestamp;
}

/* ─── Vault Card Model ─── */
export interface VaultCard {
  id: string;
  ownerId: string;
  cardId: string;
  cardName: string;
  marketValue: number;
  yieldRate: number; // percentage per month
  totalYieldEarned: number;
  linkedMohnsterId?: string;
  status: 'pending_shipment' | 'in_transit' | 'grading' | 'stored' | 'withdrawal_requested' | 'returned';
  gradedCondition?: string;
  vaultedAt: FirebaseFirestore.Timestamp;
  lastYieldAt?: FirebaseFirestore.Timestamp;
}

/* ─── Transaction Model ─── */
export interface Transaction {
  id: string;
  userId: string;
  type: 'earn' | 'spend' | 'purchase' | 'vault_yield' | 'vault_withdrawal' | 'trade_fee';
  amount: number;
  description: string;
  metadata?: Record<string, any>;
  createdAt: FirebaseFirestore.Timestamp;
}
