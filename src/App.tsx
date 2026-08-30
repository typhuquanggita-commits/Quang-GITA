import { Suspense, lazy, useEffect } from 'react';
import { AppShell } from './components/layout/AppShell';
import { useRoute } from './lib/router';
import { useAppState } from './store/AppStore';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { WorksheetPage } from './features/practice/WorksheetPage';

/**
 * Hai man hinh duoc nap SAN: Tong quan (man hinh dau tien ai cung thay) va
 * Phieu luyen (mat lam bai — khong duoc phep co mot nhip cho nao). Cac man
 * hinh con lai nap khi can, nen lan mo dau khong phai tai ca nhung trang ma
 * nguoi hoc co the khong bao gio vao.
 */
const PlacementPage = lazy(() =>
  import('./features/placement/PlacementPage').then((m) => ({ default: m.PlacementPage })),
);
const BrandPage = lazy(() =>
  import('./features/brand/BrandPage').then((m) => ({ default: m.BrandPage })),
);
const PaperPage = lazy(() =>
  import('./features/paper/PaperPage').then((m) => ({ default: m.PaperPage })),
);
const WorkspacePage = lazy(() =>
  import('./features/workspace/WorkspacePage').then((m) => ({ default: m.WorkspacePage })),
);
const ReportPage = lazy(() =>
  import('./features/report/ReportPage').then((m) => ({ default: m.ReportPage })),
);
const PricingPage = lazy(() =>
  import('./features/pricing/PricingPage').then((m) => ({ default: m.PricingPage })),
);
const ExamPage = lazy(() => import('./features/exam/ExamPage').then((m) => ({ default: m.ExamPage })));
const PracticePage = lazy(() =>
  import('./features/practice/PracticePage').then((m) => ({ default: m.PracticePage })),
);
const ReviewPage = lazy(() => import('./features/review/ReviewPage').then((m) => ({ default: m.ReviewPage })));
const AnalyticsPage = lazy(() =>
  import('./features/analytics/AnalyticsPage').then((m) => ({ default: m.AnalyticsPage })),
);
const RoadmapPage = lazy(() =>
  import('./features/roadmap/RoadmapPage').then((m) => ({ default: m.RoadmapPage })),
);
const SettingsPage = lazy(() =>
  import('./features/settings/SettingsPage').then((m) => ({ default: m.SettingsPage })),
);
const RolesPage = lazy(() => import('./features/roles/RolesPage').then((m) => ({ default: m.RolesPage })));
const GitaPage = lazy(() => import('./features/gita/GitaPage').then((m) => ({ default: m.GitaPage })));
const SolutionsPage = lazy(() =>
  import('./features/solutions/SolutionsPage').then((m) => ({ default: m.SolutionsPage })),
);
const ProfilePage = lazy(() =>
  import('./features/profile/ProfilePage').then((m) => ({ default: m.ProfilePage })),
);
const TopicGuidePage = lazy(() =>
  import('./features/topic/TopicGuidePage').then((m) => ({ default: m.TopicGuidePage })),
);

export function App() {
  const route = useRoute();
  useThemeEffect();

  // Bài làm chiếm toàn màn hình: mọi thứ không phải câu hỏi đều là nhiễu.
  if (route.path === '/worksheet') return <WorksheetPage />;

  return (
    <AppShell>
      <Suspense fallback={<RouteSkeleton />}>
        <Routes path={route.path} />
      </Suspense>
    </AppShell>
  );
}

function Routes({ path }: { path: string }) {
  switch (path) {
    case '/':
      return <DashboardPage />;
    case '/placement':
      return <PlacementPage />;
    case '/paper':
      return <PaperPage />;
    case '/exam':
      return <ExamPage />;
    case '/practice':
      return <PracticePage />;
    case '/review':
      return <ReviewPage />;
    case '/analytics':
      return <AnalyticsPage />;
    case '/roadmap':
      return <RoadmapPage />;
    case '/topic':
      return <TopicGuidePage />;
    case '/profile':
      return <ProfilePage />;
    case '/solutions':
      return <SolutionsPage />;
    case '/gita':
      return <GitaPage />;
    case '/brand':
      return <BrandPage />;
    case '/hoc-phi':
      return <PricingPage />;
    case '/workspace':
      return <WorkspacePage />;
    case '/report':
      return <ReportPage />;
    case '/roles':
      return <RolesPage />;
    case '/settings':
      return <SettingsPage />;
    default:
      return <NotFound path={path} />;
  }
}

/**
 * Khung cho trong luc nap man hinh.
 *
 * Co y KHONG dung vong xoay: mot vong xoay noi "dang ban" ma khong noi sap ra
 * cai gi. Khung xam giu dung hinh dang trang sap hien, nen mat khong bi giat
 * khi noi dung vao cho. `aria-busy` de trinh doc man hinh biet ma cho.
 */
function RouteSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Đang mở màn hình…</span>
      <div className="h-8 w-56 animate-pulse rounded-lg bg-surface-2" />
      <div className="grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-surface-2" />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-2xl bg-surface-2" />
    </div>
  );
}

function NotFound({ path }: { path: string }) {
  return (
    <div className="py-16 text-center">
      <p className="text-sm font-medium text-fg-subtle">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Không có màn hình nào ở {path}</h1>
      <p className="mt-2 text-sm text-fg-muted">
        Hãy dùng thanh điều hướng bên trái, hoặc nhấn ⌘K để tìm nhanh.
      </p>
      <a href="#/" className="mt-6 inline-block text-sm font-medium text-brand underline underline-offset-4">
        Về màn hình Tổng quan
      </a>
    </div>
  );
}

/** Đồng bộ cài đặt hiển thị xuống thẻ <html>. */
function useThemeEffect() {
  const { settings } = useAppState();

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(settings.fontScale));
  }, [settings.fontScale]);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.reducedMotion) root.setAttribute('data-motion', 'reduced');
    else root.removeAttribute('data-motion');
  }, [settings.reducedMotion]);
}
