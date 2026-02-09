/* ═══════════════════════════════════════════════════════════
   POST /api/auth/register
   Creates a user profile in Firestore after Firebase Auth signup
   ═══════════════════════════════════════════════════════════ */

import { NextRequest } from 'next/server';
import { collections } from '@/lib/firebase-admin';
import { authenticateRequest, successResponse, errorResponse } from '@/lib/auth-middleware';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const authResult = await authenticateRequest(request);
  if ('error' in authResult) return authResult.error;

  const { uid, email } = authResult.user;

  try {
    const body = await request.json();
    const { displayName, avatar, kidSafeMode } = body;

    // Check if user already exists
    const existing = await collections.users.doc(uid).get();
    if (existing.exists) {
      return successResponse({ message: 'User already exists', user: existing.data() });
    }

    const userProfile = {
      uid,
      email,
      displayName: displayName || email.split('@')[0],
      role: 'player' as const,
      mohnBalance: 100, // Welcome bonus
      level: 1,
      xp: 0,
      totalScans: 0,
      totalBattles: 0,
      totalWins: 0,
      packsPurchased: 0,
      vaultedCardsCount: 0,
      avatar: avatar || '🐉',
      kidSafeMode: kidSafeMode || false,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await collections.users.doc(uid).set(userProfile);

    // Record welcome bonus transaction
    await collections.transactions.add({
      userId: uid,
      type: 'earn',
      amount: 100,
      description: 'Welcome bonus! Start your MohnSter journey!',
      createdAt: FieldValue.serverTimestamp(),
    });

    return successResponse({ message: 'User created', user: userProfile });
  } catch (error: any) {
    console.error('Registration error:', error);
    return errorResponse(error.message || 'Registration failed', 500);
  }
}
