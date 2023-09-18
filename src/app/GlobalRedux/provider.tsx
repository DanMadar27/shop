'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { SessionProvider } from 'next-auth/react';
import { removeLogs } from '@/utils/logs';

export function GlobalProvider({ children }: { children: any }) {
  // Remove logs in production on client side
  if (process.env.NODE_ENV !== 'development' && typeof window !== 'undefined') {
    removeLogs();
  }

  return (
    <Provider store={store}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </Provider>
  )
}