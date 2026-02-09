/* ═══════════════════════════════════════════════════════════
   GET /api/collection
   Returns user's MohnSter collection (all creatures)
   ═══════════════════════════════════════════════════════════ */

import { NextRequest } from 'next/server';
import { collections } from '@/lib/firebase-admin';
import { authenticateRequest, successResponse, errorResponse } from '@/lib/auth-middleware';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authResult = await authenticateRequest(request);
  if ('error' in authResult) return authResult.error;

  const { uid } = authResult.user;

  try {
    const url = new URL(request.url);
    const element = url.searchParams.get('element');
    const rarity = url.searchParams.get('rarity');
    const limit = parseInt(url.searchParams.get('limit') || '50');

    let query: any = collections.mohnsters.where('ownerId', '==', uid);

    if (element) {
      query = query.where('element', '==', element);
    }
    if (rarity) {
      query = query.where('rarity', '==', rarity);
    }

    const snapshot = await query.orderBy('createdAt', 'desc').limit(limit).get();

    const creatures = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));

    // Stats breakdown
    const rarityCount: Record<string, number> = {};
    const elementCount: Record<string, number> = {};

    creatures.forEach((c: any) => {
      rarityCount[c.rarity] = (rarityCount[c.rarity] || 0) + 1;
      elementCount[c.element] = (elementCount[c.element] || 0) + 1;
    });

    return successResponse({
      creatures,
      count: creatures.length,
      breakdown: { byRarity: rarityCount, byElement: elementCount },
    });
  } catch (error: any) {
    console.error('Collection error:', error);
    return errorResponse(error.message || 'Failed to fetch collection', 500);
  }
}
