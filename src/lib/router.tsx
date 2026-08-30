import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/** Bộ định tuyến gọn nhẹ dùng hash — chạy được cả khi mở file tĩnh. */
export interface Route { path: string; params: Record<string, string>; query: URLSearchParams }

function parse(): Route {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [p, q] = raw.split('?');
  return { path: p || '/', params: {}, query: new URLSearchParams(q ?? '') };
}

interface Ctx { route: Route; go: (to: string) => void; back: () => void }
const RouterCtx = createContext<Ctx | null>(null);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<Route>(parse);
  useEffect(() => {
    const on = () => { setRoute(parse()); window.scrollTo({ top: 0 }); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const go = useCallback((to: string) => {
    if (to === window.location.hash.replace(/^#/, '')) return;
    window.location.hash = to;
  }, []);
  const back = useCallback(() => window.history.back(), []);
  const value = useMemo(() => ({ route, go, back }), [route, go, back]);
  return <RouterCtx.Provider value={value}>{children}</RouterCtx.Provider>;
};

export function useRouter(): Ctx {
  const c = useContext(RouterCtx);
  if (!c) throw new Error('useRouter phải nằm trong <RouterProvider>');
  return c;
}

/** So khớp mẫu kiểu "/chuyen-de/:id" với đường dẫn hiện tại. */
export function match(pattern: string, path: string): Record<string, string> | null {
  const a = pattern.split('/').filter(Boolean);
  const b = path.split('/').filter(Boolean);
  if (a.length !== b.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith(':')) params[a[i].slice(1)] = decodeURIComponent(b[i]);
    else if (a[i] !== b[i]) return null;
  }
  return params;
}

export const Link: React.FC<{ to: string; className?: string; children: React.ReactNode; title?: string; style?: React.CSSProperties }> = ({ to, className, children, title, style }) => {
  const { go } = useRouter();
  return (
    <a href={`#${to}`} className={className} title={title} style={style}
       onClick={(e) => { e.preventDefault(); go(to); }}>
      {children}
    </a>
  );
};
