/**
 * Application shell — navigation, theme application, and route rendering.
 *
 * Navigation is filtered by permission rather than merely disabled: a route a
 * principal cannot reach is not shown and, if reached by URL, is refused by
 * the same check. The sidebar is a view of the policy, never the policy.
 */

import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { useStore } from '../../state/store.tsx';
import { LocaleContext, useLocale, useT } from '../../i18n/index.ts';
import { can, type Principal } from '../../auth/roles.ts';
import { accountById } from '../../auth/model.ts';
import { hashToRoute, routeToHash, ROUTE_PERMISSION, type Route, type RouteName } from './routes.ts';
import { Badge, Button, Empty } from '../../components/ui/primitives.tsx';
import {
  IconAlert,
  IconCards,
  IconCalendar,
  IconChart,
  IconChevronLeft,
  IconChevronRight,
  IconClipboard,
  IconHome,
  IconLightning,
  IconMenu,
  IconRefresh,
  IconSettings,
  IconTarget,
} from '../../components/ui/icons.tsx';
import { Dashboard } from '../dashboard/Dashboard.tsx';
import { TestCenter } from '../exam/TestCenter.tsx';
import { Onboarding } from '../onboarding/Onboarding.tsx';

/*
 * Everything below the dashboard loads on demand. The exam player alone pulls
 * in the graphing calculator and the reference sheet, which a learner opening
 * the dashboard has no use for yet.
 */
const PracticeSession = lazy(() =>
  import('../practice/PracticeSession.tsx').then((m) => ({ default: m.PracticeSession })),
);
const VocabTrainer = lazy(() =>
  import('../vocab/VocabTrainer.tsx').then((m) => ({ default: m.VocabTrainer })),
);
const StudyPlanView = lazy(() =>
  import('../plan/StudyPlanView.tsx').then((m) => ({ default: m.StudyPlanView })),
);
const ExamPlayer = lazy(() =>
  import('../exam/ExamPlayer.tsx').then((m) => ({ default: m.ExamPlayer })),
);
const ScoreReport = lazy(() =>
  import('../results/ScoreReport.tsx').then((m) => ({ default: m.ScoreReport })),
);
const ReviewCentre = lazy(() =>
  import('../review/ReviewCentre.tsx').then((m) => ({ default: m.ReviewCentre })),
);
const Analytics = lazy(() =>
  import('../analytics/Analytics.tsx').then((m) => ({ default: m.Analytics })),
);
const TeacherConsole = lazy(() =>
  import('../console/TeacherConsole.tsx').then((m) => ({ default: m.TeacherConsole })),
);
const Settings = lazy(() =>
  import('../settings/Settings.tsx').then((m) => ({ default: m.Settings })),
);

function Loading(): React.ReactElement {
  return (
    <div className="page center" style={{ minHeight: '40vh' }}>
      <p className="muted">…</p>
    </div>
  );
}
import { dueCards } from '../../engine/srs.ts';

export function AppShell(): React.ReactElement {
  const { state } = useStore();
  const locale = state.preferences.locale;

  return (
    <LocaleContext.Provider value={locale}>
      <Shell />
    </LocaleContext.Provider>
  );
}

function Shell(): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, principal } = useStore();
  const [route, setRoute] = useState<Route>(() => hashToRoute(window.location.hash));
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* ---- Theme, font scale, and motion applied to the document root ---- */
  useEffect(() => {
    const root = document.documentElement;
    const { theme, fontScale, dyslexicFont, reduceMotion, locale: lang } = state.preferences;

    if (theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);

    root.style.setProperty('--font-scale', String(fontScale));
    root.setAttribute('data-dyslexic', String(dyslexicFont));
    root.setAttribute('data-reduce-motion', String(reduceMotion));
    root.lang = lang;
  }, [state.preferences]);

  /* ---- Hash routing ---- */
  useEffect(() => {
    const onHashChange = () => setRoute(hashToRoute(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) window.location.hash = '#/dashboard';
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useMemo(
    () => (next: Route) => {
      window.location.hash = routeToHash(next);
      setRoute(next);
      setDrawerOpen(false);
    },
    [],
  );

  const due = useMemo(() => dueCards(state.srs).length, [state.srs]);
  const account = accountById(state.org, state.org.currentAccountId);

  if (!state.profile.onboarded) {
    return <Onboarding />;
  }

  /* ---- The exam player owns the whole viewport ---- */
  if (route.name === 'exam') {
    const attempt = state.attempts.find((a) => a.id === route.attemptId);
    const form = attempt ? state.forms.find((f) => f.id === attempt.formId) : undefined;

    if (attempt && form && attempt.status === 'in-progress') {
      return (
        <Suspense fallback={<Loading />}>
          <ExamPlayer
            attempt={attempt}
            form={form}
            onExit={() => navigate({ name: 'tests' })}
            onFinished={(attemptId) => navigate({ name: 'result', attemptId })}
          />
        </Suspense>
      );
    }
    // A finished or missing attempt should not sit on the exam route.
    if (attempt?.status === 'submitted') {
      return <Redirect to={{ name: 'result', attemptId: attempt.id }} navigate={navigate} />;
    }
    return <Redirect to={{ name: 'tests' }} navigate={navigate} />;
  }

  const groups: Array<{ label: string; items: NavItem[] }> = [
    {
      label: t('nav.study'),
      items: [
        { route: { name: 'dashboard' }, label: t('nav.dashboard'), icon: <IconHome size={18} /> },
        { route: { name: 'practice' }, label: t('nav.practice'), icon: <IconLightning size={18} /> },
        { route: { name: 'vocab' }, label: t('nav.vocab'), icon: <IconCards size={18} /> },
        { route: { name: 'plan' }, label: t('nav.plan'), icon: <IconCalendar size={18} /> },
      ],
    },
    {
      label: t('nav.assess'),
      items: [
        { route: { name: 'tests' }, label: t('nav.tests'), icon: <IconTarget size={18} /> },
        {
          route: { name: 'review' },
          label: t('nav.review'),
          icon: <IconRefresh size={18} />,
          badge: due > 0 ? due : undefined,
        },
        { route: { name: 'analytics' }, label: t('nav.analytics'), icon: <IconChart size={18} /> },
      ],
    },
    {
      label: t('nav.system'),
      items: [
        {
          route: { name: 'console' },
          label: locale === 'vi' ? 'Giảng dạy' : 'Teaching',
          icon: <IconClipboard size={18} />,
        },
        { route: { name: 'settings' }, label: t('nav.settings'), icon: <IconSettings size={18} /> },
      ],
    },
  ];

  const visibleGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const permission = ROUTE_PERMISSION[item.route.name];
        return !permission || can(principal, permission);
      }),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="shell" data-collapsed={collapsed || undefined}>
      <a className="skip-link" href="#main">{t('app.skipToContent')}</a>

      <nav className="sidebar" data-open={drawerOpen || undefined} aria-label={t('nav.menu')}>
        <a
          className="brand"
          href="#/dashboard"
          onClick={(e) => {
            e.preventDefault();
            navigate({ name: 'dashboard' });
          }}
        >
          <span className="brand-mark" aria-hidden="true">365</span>
          <span className="brand-text">
            <span className="brand-name">{t('app.name')}</span>
            <br />
            <span className="brand-tag">{t('app.tagline')}</span>
          </span>
        </a>

        {visibleGroups.map((group) => (
          <div key={group.label}>
            <div className="nav-group-label">{group.label}</div>
            {group.items.map((item) => (
              <button
                key={item.route.name}
                type="button"
                className="nav-item"
                aria-current={route.name === item.route.name ? 'page' : undefined}
                onClick={() => navigate(item.route)}
                title={collapsed ? item.label : undefined}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="nav-badge">
                    <Badge tone="danger">{item.badge}</Badge>
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}

        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-4)' }}>
          <button
            type="button"
            className="nav-item"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? t('nav.expand') : t('nav.collapse')}
          >
            {collapsed ? <IconChevronRight size={18} /> : <IconChevronLeft size={18} />}
            <span>{t('nav.collapse')}</span>
          </button>
        </div>
      </nav>

      <div className="main">
        <header className="topbar no-print">
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            className="mobile-only"
            aria-label={t('nav.menu')}
            onClick={() => setDrawerOpen((v) => !v)}
            style={{ display: 'none' }}
          >
            <IconMenu size={18} />
          </Button>

          <div className="grow" />

          <div className="row gap-3">
            {account && (
              <>
                <span className="text-sm semibold">{account.name || '—'}</span>
                <Badge tone={account.role === 'student' ? 'primary' : 'info'}>
                  {account.role === 'teacher' && account.rank
                    ? `${account.role} · ${account.rank}`
                    : account.role}
                </Badge>
              </>
            )}
          </div>
        </header>

        <main id="main" tabIndex={-1}>
          <Suspense fallback={<Loading />}>
            <RouteView
              route={route}
              navigate={navigate}
              principal={principal}
              locale={locale}
              dashboardLabel={t('nav.dashboard')}
            />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

/**
 * Route rendering, defined at module scope.
 *
 * Defining this inside `Shell` would give it a new component identity on
 * every render, and React would unmount and remount the whole page each time
 * the store changed — silently discarding any state a page was holding, such
 * as a practice session in progress.
 */
function RouteView({
  route,
  navigate,
  principal,
  locale,
  dashboardLabel,
}: {
  route: Route;
  navigate(r: Route): void;
  principal: Principal;
  locale: 'vi' | 'en';
  dashboardLabel: string;
}): React.ReactElement {
  const permission = ROUTE_PERMISSION[route.name as RouteName];
  if (permission && !can(principal, permission)) {
    return (
      <div className="page">
        <Empty
          icon={<IconAlert size={30} />}
          title={locale === 'vi' ? 'Không đủ quyền' : 'Not permitted'}
          body={
            locale === 'vi'
              ? 'Vai trò hiện tại của bạn không có quyền truy cập mục này.'
              : 'Your current role does not grant access to this area.'
          }
          action={<Button onClick={() => navigate({ name: 'dashboard' })}>{dashboardLabel}</Button>}
        />
      </div>
    );
  }

  switch (route.name) {
    case 'dashboard':
      return <Dashboard navigate={navigate} />;
    case 'practice':
    case 'practice-session':
      return <PracticeSession />;
    case 'vocab':
      return <VocabTrainer />;
    case 'plan':
      return <StudyPlanView />;
    case 'tests':
      return <TestCenter navigate={navigate} />;
    case 'result':
      return <ScoreReport attemptId={route.attemptId} navigate={navigate} />;
    case 'review':
      return <ReviewCentre />;
    case 'analytics':
      return <Analytics />;
    case 'console':
      return <TeacherConsole />;
    case 'settings':
      return <Settings />;
    default:
      return <Dashboard navigate={navigate} />;
  }
}

interface NavItem {
  route: Route;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

function Redirect({ to, navigate }: { to: Route; navigate(r: Route): void }): React.ReactElement {
  useEffect(() => {
    navigate(to);
  }, [to, navigate]);
  return <div className="page center"><p className="muted">…</p></div>;
}
