import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

/**
 * Dinh tuyen bang hash — nho gon, khong can cau hinh may chu, chay duoc ca khi
 * mo tep truc tiep tu o dia hoac deploy duoi mot thu muc con bat ky.
 * Do la dieu quan trong voi mot ung dung on thi can chay duoc ngoai tuyen.
 */

export interface Route {
  /** Vi du '/practice'. Luon bat dau bang '/'. */
  path: string;
  params: URLSearchParams;
  hash: string;
}

function readRoute(): Route {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [pathPart, queryPart] = raw.split('?');
  const path = pathPart && pathPart.startsWith('/') ? pathPart : `/${pathPart ?? ''}`;
  return {
    path: path.replace(/\/+$/, '') || '/',
    params: new URLSearchParams(queryPart ?? ''),
    hash: raw,
  };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === 'undefined' ? { path: '/', params: new URLSearchParams(), hash: '/' } : readRoute(),
  );

  useEffect(() => {
    const onChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function navigate(href: string, options: { replace?: boolean } = {}): void {
  const target = href.startsWith('#') ? href : `#${href}`;
  if (options.replace) {
    window.history.replaceState(null, '', target);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  } else {
    window.location.hash = target;
  }
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
  const href = to.startsWith('#') ? to : `#${to}`;
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        onClick?.();
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
