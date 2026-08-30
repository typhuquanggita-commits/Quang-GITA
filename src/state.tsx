import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { AppState } from '@/types';
import { emptyState, loadState, saveState, resetState } from '@/lib/storage';
import { matchRoute, legacyRedirect, type RouteMatch } from '@/lib/routes';

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

/* ---------------- Router dùng History API ---------------- */

/**
 * Ứng dụng từng chạy trên router dạng hash. Mọi thứ sau dấu # bị công cụ tìm
 * kiếm cắt bỏ, nên toàn bộ kho nội dung chỉ được nhìn thấy như một trang duy
 * nhất. Router dưới đây dùng đường dẫn thật, có chuyển hướng cho mọi liên kết
 * hash cũ để không làm hỏng thứ đã chia sẻ.
 */

const ROUTE_EVENT = 'math365:route';

/** Chuyển hướng liên kết hash cũ ngay khi tải trang. */
function resolveInitialPath(): string {
  if (typeof window === 'undefined') return '/';
  const hash = window.location.hash;
  if (hash.startsWith('#/')) {
    const target = legacyRedirect(hash.slice(1)) ?? '/';
    window.history.replaceState({}, '', target);
    return target;
  }
  return window.location.pathname || '/';
}

export function useRoute(): RouteMatch {
  const [pathname, setPathname] = useState<string>(() => resolveInitialPath());

  useEffect(() => {
    const onChange = () => setPathname(window.location.pathname || '/');
    window.addEventListener('popstate', onChange);
    window.addEventListener(ROUTE_EVENT, onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener(ROUTE_EVENT, onChange);
    };
  }, []);

  return useMemo(() => matchRoute(pathname), [pathname]);
}

/**
 * Điều hướng nội bộ, không tải lại trang.
 * Nhận cả đường dẫn cũ dạng /topics/... và tự quy về địa chỉ chuẩn, để mọi liên
 * kết trong ứng dụng lẫn liên kết đã chia sẻ ra ngoài đều dẫn tới đúng một URL.
 */
export const go = (path: string) => {
  if (typeof window === 'undefined') return;
  const raw = path.startsWith('/') ? path : `/${path}`;
  const target = legacyRedirect(raw) ?? raw;
  if (window.location.pathname !== target) {
    window.history.pushState({}, '', target);
    window.dispatchEvent(new Event(ROUTE_EVENT));
  }
  window.scrollTo({ top: 0 });
};

export const currentPath = () => (typeof window === 'undefined' ? '/' : window.location.pathname || '/');
