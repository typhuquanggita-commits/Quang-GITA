import { useEffect } from 'react';
import { AppShell } from './components/layout/AppShell';
import { useRoute } from './lib/router';
import { useAppState } from './store/AppStore';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { ExamPage } from './features/exam/ExamPage';
import { PracticePage } from './features/practice/PracticePage';
import { WorksheetPage } from './features/practice/WorksheetPage';
import { ReviewPage } from './features/review/ReviewPage';
import { AnalyticsPage } from './features/analytics/AnalyticsPage';
import { RoadmapPage } from './features/roadmap/RoadmapPage';
import { SettingsPage } from './features/settings/SettingsPage';
import { RolesPage } from './features/roles/RolesPage';
import { GitaPage } from './features/gita/GitaPage';
import { SolutionsPage } from './features/solutions/SolutionsPage';
import { ProfilePage } from './features/profile/ProfilePage';

export function App() {
  const route = useRoute();
  useThemeEffect();

  // Bài làm chiếm toàn màn hình: mọi thứ không phải câu hỏi đều là nhiễu.
  if (route.path === '/worksheet') return <WorksheetPage />;

  return (
    <AppShell>
      <Routes path={route.path} />
    </AppShell>
  );
}

function Routes({ path }: { path: string }) {
  switch (path) {
    case '/':
      return <DashboardPage />;
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
    case '/profile':
      return <ProfilePage />;
    case '/solutions':
      return <SolutionsPage />;
    case '/gita':
      return <GitaPage />;
    case '/roles':
      return <RolesPage />;
    case '/settings':
      return <SettingsPage />;
    default:
      return <NotFound path={path} />;
  }
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
