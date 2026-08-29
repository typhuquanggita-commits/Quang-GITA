/**
 * Entry point.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from './state/store.tsx';
import { AppShell } from './features/shell/AppShell.tsx';
import './styles/index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root container missing');

createRoot(container).render(
  <React.StrictMode>
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  </React.StrictMode>,
);

// Offline support: the app must keep working on an unreliable connection,
// which is the condition a lot of study actually happens under.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      // A failed registration costs offline support and nothing else.
    });
  });
}
