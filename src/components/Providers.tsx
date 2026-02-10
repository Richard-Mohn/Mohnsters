'use client';

import { MohnEmpireProvider } from '@/lib/mohn-empire/auth-context';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MohnEmpireProvider platformId="mohnsters">
      {children}
    </MohnEmpireProvider>
  );
}
