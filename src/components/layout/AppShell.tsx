import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { APP_NAME } from '../../config';
import { GitaMark } from '../../brand/Logo';
import { cn } from '../../lib/cn';
import { useHotkeys } from '../../lib/hotkeys';
import { Link, useRoute } from '../../lib/router';
import { useAppState, useUpdateSettings } from '../../store/AppStore';
import { dueNow, streakOf } from '../../store/selectors';
import { Badge, Button } from '../ui/primitives';
import { CommandPalette } from './CommandPalette';
import {
  IconBadge,
  IconBook,
  IconChart,
  IconCompass,
  IconClose,
  IconExam,
  IconHome,
  IconMenu,
  IconNotebook,
  IconProfile,
  IconRoute,
  IconSearch,
  IconSettings,
  IconShield,
  IconSpark,
  IconTarget,
} from './icons';

interface NavItem {
  href: string;
  label: string;
  icon: (props: { className?: string }) => ReactNode;
  badge?: number;
}

export function AppShell({ children }: { children: ReactNode }) {
  const state = useAppState();
  const route = useRoute();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const updateSettings = useUpdateSettings();

  const due = dueNow(state).length;
  const streak = streakOf(state);

  const nav = useMemo<NavItem[]>(
    () => [
      { href: '/', label: 'Tổng quan', icon: IconHome },
      { href: '/placement', label: 'Định vị đầu vào', icon: IconCompass },
      { href: '/exam', label: 'Thi thử', icon: IconExam },
      { href: '/practice', label: 'Luyện tập', icon: IconTarget },
      { href: '/topic', label: 'Ôn chắc chuyên đề', icon: IconBook },
      { href: '/review', label: 'Sổ tay lỗi sai', icon: IconNotebook, badge: due },
      { href: '/analytics', label: 'Phân tích', icon: IconChart },
      { href: '/profile', label: 'Hồ sơ học viên', icon: IconProfile },
      { href: '/roadmap', label: 'Lộ trình', icon: IconRoute },
      { href: '/gita', label: 'Mô thức GITA', icon: IconSpark },
      { href: '/brand', label: 'Nhận diện', icon: IconBadge },
      { href: '/roles', label: 'Phân quyền', icon: IconShield },
      { href: '/settings', label: 'Cài đặt', icon: IconSettings },
    ],
    [due],
  );

  useHotkeys(
    useMemo(
      () => ({
        'mod+k': (event: KeyboardEvent) => {
          event.preventDefault();
          setPaletteOpen((open) => !open);
        },
        '/': (event: KeyboardEvent) => {
          event.preventDefault();
          setPaletteOpen(true);
        },
      }),
      [],
    ),
  );

  useEffect(() => {
    setDrawerOpen(false);
  }, [route.path]);

  const cycleTheme = () => {
    const order = ['system', 'light', 'dark'] as const;
    const next = order[(order.indexOf(state.settings.theme) + 1) % order.length] ?? 'system';
    updateSettings({ theme: next });
  };

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[16rem_1fr]">
      <a href="#main" className="skip-link no-print">
        Bỏ qua điều hướng, đến nội dung chính
      </a>

      {/* Thanh bên — cố định trên màn hình lớn, ngăn kéo trên di động. */}
      <aside
        id="app-nav"
        className={cn(
          'no-print fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-surface transition-transform lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0',
          drawerOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Thanh bên"
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
            <GitaMark className="h-7 w-auto shrink-0" title="GITA" />
            <span>
              {APP_NAME}
              <span className="ml-1.5 align-middle text-[10px] font-medium uppercase tracking-wider text-fg-subtle">
                ĐGNL
              </span>
            </span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            aria-label="Đóng menu"
            onClick={() => setDrawerOpen(false)}
          >
            <IconClose className="size-4" />
          </Button>
        </div>

        <nav aria-label="Điều hướng chính" className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {nav.map((item) => {
            const active = item.href === '/' ? route.path === '/' : route.path.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition',
                  active
                    ? 'bg-brand-soft text-brand'
                    : 'text-fg-muted hover:bg-surface-2 hover:text-fg',
                )}
              >
                <Icon className="size-5 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge ? (
                  <Badge tone={active ? 'brand' : 'warn'} className="tabular-nums">
                    {item.badge}
                  </Badge>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-line p-3">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="flex w-full items-center gap-2 rounded-lg border border-line px-3 py-2 text-left text-sm text-fg-subtle transition hover:border-line-strong hover:text-fg"
          >
            <IconSearch className="size-4" />
            <span className="flex-1">Tìm nhanh…</span>
            <kbd className="rounded border border-line px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </button>
        </div>
      </aside>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex min-w-0 flex-col">
        <header className="no-print sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-canvas/85 px-4 backdrop-blur sm:px-6">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            aria-label="Mở menu"
            aria-expanded={drawerOpen}
            aria-controls="app-nav"
            onClick={() => setDrawerOpen(true)}
          >
            <IconMenu className="size-5" />
          </Button>

          <div className="flex-1" />

          {streak > 0 && (
            <Badge tone="warn" className="hidden sm:inline-flex">
              Chuỗi {streak} ngày
            </Badge>
          )}
          <Badge tone="brand" className="hidden tabular-nums sm:inline-flex">
            Mục tiêu {state.settings.targetScore}/150
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={cycleTheme}
            aria-label={`Chủ đề hiện tại: ${themeLabel(state.settings.theme)}. Nhấn để đổi.`}
            title={`Chủ đề: ${themeLabel(state.settings.theme)}`}
          >
            {state.settings.theme === 'dark' ? '🌙' : state.settings.theme === 'light' ? '☀️' : '🖥️'}
          </Button>
        </header>

        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>

        <footer className="no-print border-t border-line px-4 py-6 text-xs text-fg-subtle sm:px-6">
          <p>
            {APP_NAME} — dữ liệu học tập được lưu ngay trên thiết bị của bạn. Cấu trúc đề bám theo quy chế
            bài thi HSA của ĐHQGHN: 150 câu / 195 phút / thang 150 điểm.
          </p>
        </footer>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}

function themeLabel(theme: 'system' | 'light' | 'dark'): string {
  return theme === 'system' ? 'theo hệ thống' : theme === 'light' ? 'sáng' : 'tối';
}
