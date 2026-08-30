import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

/**
 * DINH TUYEN
 *
 * Truoc day toan bo ung dung chay bang hash (`#/practice`). Cach do gon va
 * chay duoc khi mo tep truc tiep tu o dia — nhung no CHAN DUNG SEO: doan sau
 * dau `#` khong bao gio duoc gui len may chu, nen voi Google ca hai muoi man
 * hinh chi la MOT dia chi duy nhat. Khong the xep hang mot trang khong ton tai
 * nhu mot dia chi rieng.
 *
 * Nay dung History API khi trang duoc phuc vu qua http(s), va TU DONG lui ve
 * hash khi mo bang `file://`. Nho vay giu duoc ly do ban dau (chay duoc offline,
 * mo truc tiep tu o dia) ma khong con hy sinh kha nang tim thay.
 *
 * DIEU KIEN TRIEN KHAI: may chu phai tra `index.html` cho moi duong dan khong
 * khop tep tinh (SPA fallback). Netlify, Vercel, GitHub Pages va Cloudflare
 * Pages deu lam duoc; xem docs/SEO.md. Neu host khong lam duoc, dat
 * `VITE_ROUTER=hash` de quay ve che do cu — ung dung van chay, chi mat SEO.
 */

/** Duong dan goc khi deploy duoi thu muc con, vi du '/hsa365'. */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Che do dinh tuyen.
 *
 * `file://` khong co may chu nen History API khong dung duoc — pushState se
 * doi dia chi thanh mot duong dan khong ton tai va tai lai trang la mat sach.
 */
export function routerMode(): 'history' | 'hash' {
  if (typeof window === 'undefined') return 'history';
  if (import.meta.env.VITE_ROUTER === 'hash') return 'hash';
  return window.location.protocol === 'file:' ? 'hash' : 'history';
}

/** Su kien noi bo cho dieu huong bang History API. */
const ROUTE_EVENT = 'hsa365:route';

export interface Route {
  /** Vi du '/practice'. Luon bat dau bang '/'. */
  path: string;
  params: URLSearchParams;
  hash: string;
}

function readRoute(): Route {
  const raw =
    routerMode() === 'hash'
      ? window.location.hash.replace(/^#/, '') || '/'
      : `${stripBase(window.location.pathname)}${window.location.search}`;

  const [pathPart, queryPart] = raw.split('?');
  const path = pathPart && pathPart.startsWith('/') ? pathPart : `/${pathPart ?? ''}`;
  return {
    path: path.replace(/\/+$/, '') || '/',
    params: new URLSearchParams(queryPart ?? ''),
    hash: raw,
  };
}

/** Bo tien to thu muc con de duong dan trong ung dung luon bat dau tu '/'. */
function stripBase(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) return pathname.slice(BASE.length) || '/';
  return pathname || '/';
}

/** Dia chi day du cua mot duong dan trong ung dung, dung cho the <a href>. */
export function hrefOf(to: string): string {
  const path = to.startsWith('/') ? to : `/${to}`;
  return routerMode() === 'hash' ? `#${path}` : `${BASE}${path}`;
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === 'undefined' ? { path: '/', params: new URLSearchParams(), hash: '/' } : readRoute(),
  );

  useEffect(() => {
    const onChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', onChange);
    window.addEventListener('popstate', onChange);
    window.addEventListener(ROUTE_EVENT, onChange);
    return () => {
      window.removeEventListener('hashchange', onChange);
      window.removeEventListener('popstate', onChange);
      window.removeEventListener(ROUTE_EVENT, onChange);
    };
  }, []);

  return route;
}

export function navigate(href: string, options: { replace?: boolean } = {}): void {
  const path = href.replace(/^#/, '');

  if (routerMode() === 'hash') {
    const target = `#${path}`;
    if (options.replace) {
      window.history.replaceState(null, '', target);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      window.location.hash = target;
    }
    return;
  }

  const target = hrefOf(path);
  if (options.replace) window.history.replaceState(null, '', target);
  else window.history.pushState(null, '', target);
  window.dispatchEvent(new Event(ROUTE_EVENT));
  // Ve dau trang khi doi man hinh — trinh duyet chi lam viec nay cho dieu
  // huong that, khong lam cho pushState.
  window.scrollTo({ top: 0, behavior: 'auto' });
}

export function useNavigate() {
  return useCallback((href: string, options?: { replace?: boolean }) => navigate(href, options), []);
}

export function Link({
  to,
  children,
  className,
  onClick,
  ...rest
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>) {
  const path = to.replace(/^#/, '');
  return (
    <a
      href={hrefOf(path)}
      className={className}
      onClick={(event) => {
        onClick?.();
        // Giu dieu huong trong ung dung, nhung KHONG chan cac thao tac ma
        // nguoi dung co chu dich mo o noi khac: chuot giua, Ctrl/Cmd+click.
        if (
          routerMode() === 'history' &&
          event.button === 0 &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey
        ) {
          event.preventDefault();
          navigate(path);
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Kiem tra mot muc dieu huong co dang hoat dong khong (khop tien to). */
export function useIsActive(path: string): boolean {
  const route = useRoute();
  return useMemo(
    () => route.path === path || (path !== '/' && route.path.startsWith(`${path}/`)),
    [route.path, path],
  );
}
