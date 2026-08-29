import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { AppState } from '@/types';
import { emptyState, loadState, saveState, resetState } from '@/lib/storage';

interface Ctx {
  state: AppState;
  update: (fn: (s: AppState) => AppState) => void;
  reset: () => void;
}

const StateContext = createContext<Ctx | null>(null);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const update = useCallback((fn: (s: AppState) => AppState) => {
    setState((prev) => fn(prev));
  }, []);

  const reset = useCallback(() => {
    resetState();
    setState(emptyState());
  }, []);

  const value = useMemo(() => ({ state, update, reset }), [state, update, reset]);
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
}

export function useApp(): Ctx {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error('useApp phải được dùng bên trong StateProvider');
  return ctx;
}

/* ---------------- Router bằng hash ---------------- */

export function useHashRoute(): [string[], (path: string) => void] {
  const [hash, setHash] = useState(() => window.location.hash.slice(1) || '/');

  useEffect(() => {
    const onChange = () => setHash(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
    window.scrollTo({ top: 0 });
  }, []);

  const segments = useMemo(
    () => hash.split('/').filter(Boolean),
    [hash],
  );

  return [segments, navigate];
}

export const go = (path: string) => {
  window.location.hash = path;
  window.scrollTo({ top: 0 });
};
