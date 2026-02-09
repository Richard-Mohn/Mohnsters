/* ═══════════════════════════════════════════════════════════
   Auth Middleware Helper
   Validates Firebase ID tokens for protected API routes
   ═══════════════════════════════════════════════════════════ */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase-admin';

export interface AuthenticatedRequest {
  uid: string;
  email: string;
}

export async function authenticateRequest(
  request: NextRequest
): Promise<{ user: AuthenticatedRequest } | { error: NextResponse }> {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      error: NextResponse.json(
        { error: 'Missing or invalid Authorization header' },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decoded = await auth.verifyIdToken(token);
    return {
      user: {
        uid: decoded.uid,
        email: decoded.email || '',
      },
    };
  } catch {
    return {
      error: NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      ),
    };
  }
}

export function successResponse(data: any, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}
