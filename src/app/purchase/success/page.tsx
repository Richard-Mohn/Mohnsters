/* ═══════════════════════════════════════════════════════════
   Purchase Success Page
   Shown after successful Stripe checkout
   ═══════════════════════════════════════════════════════════ */

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purchase Complete — MohnSters',
  robots: 'noindex',
};

export default function PurchaseSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass-card p-12 max-w-lg text-center">
        {/* Success Animation */}
        <div className="text-7xl mb-6 animate-bounce">🎉</div>

        <h1 className="text-3xl font-rajdhani font-bold text-white mb-4">
          Purchase <span className="gradient-text-purple">Complete!</span>
        </h1>

        <p className="text-gray-400 text-lg mb-2">
          Your MohnSters are being unleashed...
        </p>

        <div className="glass p-4 rounded-xl my-6">
          <p className="text-gray-300 text-sm">
            ✅ Payment confirmed<br />
            ✅ Items added to your account<br />
            ✅ $MOHN balance updated
          </p>
        </div>

        <p className="text-gray-500 text-sm mb-8">
          Check your collection to see your new creatures!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/packs" className="btn-primary">
            Open More Packs
          </Link>
          <Link href="/" className="btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
