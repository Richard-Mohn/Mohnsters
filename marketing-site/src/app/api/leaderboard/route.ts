/* ═══════════════════════════════════════════════════════════
   GET /api/leaderboard
   Returns top players by wins, $MOHN earned, and level
   ═══════════════════════════════════════════════════════════ */

import { NextRequest, NextResponse } from 'next/server';
import { collections } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category') || 'wins';
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '25'), 100);

    let orderField = 'totalWins';
    if (category === 'level') orderField = 'level';
    else if (category === 'scans') orderField = 'totalScans';
    else if (category === 'battles') orderField = 'totalBattles';

    const snapshot = await collections.users
      .orderBy(orderField, 'desc')
      .limit(limit)
      .get();

    const leaderboard = snapshot.docs.map((doc, index) => {
      const data = doc.data();
      return {
        rank: index + 1,
        displayName: data.displayName || 'Anonymous',
        avatar: data.avatar || '🐉',
        level: data.level || 1,
        totalWins: data.totalWins || 0,
        totalBattles: data.totalBattles || 0,
        totalScans: data.totalScans || 0,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        category,
        leaderboard,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
