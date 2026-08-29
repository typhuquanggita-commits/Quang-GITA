/**
 * Dashboard.
 *
 * Answers four questions in order of what a learner actually asks: where do I
 * stand, how far is the target, what should I do right now, and what is
 * holding me back.
 */

import React, { useMemo } from 'react';
import { useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { QUESTION_BY_ID } from '../../data/bank.ts';
import { skillLabel } from '../../data/blueprint.ts';
import {
  activityHeatmap,
  collectResponses,
  currentStreak,
  skillStats,
  strongestSkills,
  weakestSkills,
} from '../../engine/analytics.ts';
import { predictTotal } from '../../engine/scoring.ts';
import { dueCards } from '../../engine/srs.ts';
import { taskLabel, tasksForDate } from '../../engine/studyPlan.ts';
import { selectScoredAttempts } from '../../state/store.tsx';
import { StudentLevelCard } from '../console/StudentLevelCard.tsx';
import { GitaCard } from '../gita/GitaCard.tsx';
import { Badge, Button, Card, Empty, Ring } from '../../components/ui/primitives.tsx';
import { LineChart, MasteryBars } from '../../components/charts/charts.tsx';
import {
  IconChart,
  IconFire,
  IconLightning,
  IconPlay,
  IconSparkle,
} from '../../components/ui/icons.tsx';
import { daysBetween, formatDate, formatDuration, isoDate, sum } from '../../lib/util.ts';
import type { Route } from '../shell/routes.ts';

export function Dashboard({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, dispatch } = useStore();

  const records = useMemo(
    () => collectResponses(state.attempts, QUESTION_BY_ID),
    [state.attempts],
  );
  const stats = useMemo(() => skillStats(records), [records]);
  const weakest = useMemo(() => weakestSkills(stats, 5), [stats]);
  const strongest = useMemo(() => strongestSkills(stats, 3), [stats]);
  const scored = useMemo(() => selectScoredAttempts(state), [state]);

  const predicted = predictTotal(state.sectionAbility.rw.theta, state.sectionAbility.math.theta);
  const hasEvidence = state.sectionAbility.rw.n + state.sectionAbility.math.n >= 8;
  const latestTotal = scored[0]?.score?.total ?? null;
  const headline = latestTotal ?? (hasEvidence ? predicted : null);

  const target = state.profile.targetScore;
  const gap = headline === null ? null : Math.max(0, target - headline);
  const daysLeft = state.profile.testDate ? Math.max(0, daysBetween(isoDate(), state.profile.testDate)) : null;

  const streak = useMemo(() => currentStreak(state.activity), [state.activity]);
  const heatmap = useMemo(() => activityHeatmap(state.activity, 91), [state.activity]);
  const weekSeconds = useMemo(
    () => sum(heatmap.slice(-7).map((day) => day.seconds)),
    [heatmap],
  );

  const due = useMemo(() => dueCards(state.srs), [state.srs]);
  const todayTasks = useMemo(() => tasksForDate(state.plan, isoDate()), [state.plan]);

  const trend = useMemo(() => {
    const points = scored
      .filter((a) => a.score)
      .map((a) => [a.submittedAt ?? a.startedAt, a.score!.total] as [number, number])
      .sort((a, b) => a[0] - b[0]);
    return points;
  }, [scored]);

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <h1 className="page-title">
          {t('dash.greeting', { name: state.profile.name || (locale === 'vi' ? 'bạn' : 'there') })}
        </h1>
        <p className="page-sub">{t('dash.subtitle')}</p>
      </header>

      {/* ---- Hero ---- */}
      <div className="hero">
        <div className="between wrap gap-6">
          <div style={{ minWidth: 260 }}>
            <h2>{t('dash.heroTitle')}</h2>
            <p>{t('dash.heroBody')}</p>
            <div className="row gap-3 wrap" style={{ marginTop: 'var(--space-5)' }}>
              <Button variant="primary" onClick={() => navigate({ name: 'practice' })}>
                <IconLightning size={16} />
                {t('dash.startPractice')}
              </Button>
              <Button variant="secondary" onClick={() => navigate({ name: 'tests' })}>
                <IconPlay size={16} />
                {t('dash.takeTest')}
              </Button>
            </div>
          </div>

          <Ring
            value={headline === null ? 0 : Math.min(1, (headline - 400) / 1200)}
            size={140}
            stroke={12}
            color="#fff"
            label={<span style={{ color: '#fff' }}>{headline ?? '—'}</span>}
            sublabel={<span style={{ color: 'rgb(255 255 255 / 0.75)' }}>{t('result.scale')}</span>}
          />
        </div>
      </div>

      {/* ---- KPIs ---- */}
      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-label">{latestTotal !== null ? t('result.total') : t('dash.predicted')}</div>
          <div className="kpi-value">{headline ?? '—'}</div>
          <div className="kpi-foot">
            {headline === null
              ? t('dash.noTests')
              : latestTotal !== null
                ? formatDate(isoDate(new Date(scored[0].submittedAt ?? Date.now())), locale)
                : locale === 'vi'
                  ? 'Ước lượng từ dữ liệu luyện tập'
                  : 'Estimated from practice data'}
          </div>
        </div>

        <div className="kpi">
          <div className="kpi-label">{t('dash.target')}</div>
          <div className="kpi-value">{target}</div>
          <div className="kpi-foot">
            {gap === null ? '—' : gap === 0 ? (locale === 'vi' ? 'Đã đạt mục tiêu' : 'Target met') : `${t('dash.gap')}: ${gap}`}
          </div>
        </div>

        <div className="kpi">
          <div className="kpi-label">{t('dash.daysLeft')}</div>
          <div className="kpi-value">{daysLeft ?? '—'}</div>
          <div className="kpi-foot">
            {state.profile.testDate ? formatDate(state.profile.testDate, locale) : t('dash.setupPlan')}
          </div>
        </div>

        <div className="kpi">
          <div className="kpi-label">{t('dash.streak')}</div>
          <div className="kpi-value">
            {streak} <IconFire size={22} style={{ display: 'inline', verticalAlign: 'baseline', color: 'var(--accent)' }} />
          </div>
          <div className="kpi-foot">
            {t('dash.studyTime')}: {formatDuration(weekSeconds, locale)}
          </div>
        </div>
      </div>

      {/* ---- Today ---- */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        <Card
          title={t('dash.todayPlan')}
          action={
            <Button size="sm" variant="ghost" onClick={() => navigate({ name: 'plan' })}>
              {t('nav.plan')}
            </Button>
          }
        >
          {todayTasks.length === 0 ? (
            <Empty
              title={t('plan.noPlan')}
              action={
                <Button variant="primary" size="sm" onClick={() => navigate({ name: 'plan' })}>
                  {t('dash.setupPlan')}
                </Button>
              }
            />
          ) : (
            <ul className="stack gap-2" style={{ listStyle: 'none' }}>
              {todayTasks.map((task) => (
                <li key={task.id} className="between">
                  <label className="row gap-3" style={{ cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => dispatch({ type: 'plan/toggleTask', taskId: task.id })}
                    />
                    <span style={task.done ? { textDecoration: 'line-through', color: 'var(--text-muted)' } : undefined}>
                      {taskLabel(task, locale)}
                    </span>
                  </label>
                  <Badge>{task.minutes} {t('common.minutes')}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card
          title={t('dash.dueReview')}
          action={
            <Button size="sm" variant="ghost" onClick={() => navigate({ name: 'review' })}>
              {t('review.startReview')}
            </Button>
          }
        >
          {due.length === 0 ? (
            <p className="muted">{t('review.nothingDue')}</p>
          ) : (
            <div className="ring-wrap">
              <Ring value={Math.min(1, due.length / 30)} size={90} stroke={9} label={due.length} />
              <div>
                <p className="semibold">{t('dash.dueCards', { n: due.length })}</p>
                <p className="text-sm muted" style={{ marginTop: 'var(--space-1)' }}>
                  {locale === 'vi'
                    ? 'Ôn ngay hôm nay để giữ lại những gì đã học.'
                    : 'Clear them today to hold on to what you have learned.'}
                </p>
              </div>
            </div>
          )}
        </Card>

        <StudentLevelCard total={headline} />

        <GitaCard navigate={navigate} />
      </div>

      {/* ---- Trend and skills ---- */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
        <Card title={t('dash.scoreTrend')}>
          {trend.length < 2 ? (
            <Empty icon={<IconChart size={28} />} title={t('dash.noTests')} />
          ) : (
            <LineChart
              description={t('a11y.chart', { desc: t('dash.scoreTrend') })}
              yMin={400}
              yMax={1600}
              series={[{ name: t('result.total'), points: trend }]}
              formatX={(v) => formatDate(isoDate(new Date(v)), locale)}
            />
          )}
        </Card>

        <Card title={t('dash.weakest')} subtitle={locale === 'vi' ? 'Xếp theo mức thành thạo ước lượng' : 'Ranked by estimated mastery'}>
          {weakest.length === 0 ? (
            <Empty icon={<IconSparkle size={28} />} title={t('analytics.needsData')} />
          ) : (
            <MasteryBars
              rows={weakest.map((skill) => ({
                label: skillLabel(skill.skill, locale),
                value: skill.mastery,
                meta: `${skill.correct}/${skill.attempted} ${t('common.correct').toLowerCase()}`,
              }))}
            />
          )}
        </Card>
      </div>

      {strongest.length > 0 && (
        <Card title={t('dash.strongest')}>
          <MasteryBars
            rows={strongest.map((skill) => ({
              label: skillLabel(skill.skill, locale),
              value: skill.mastery,
              meta: `${skill.correct}/${skill.attempted}`,
              color: 'var(--success)',
            }))}
          />
        </Card>
      )}

      {/* ---- Activity heatmap ---- */}
      <Card
        title={locale === 'vi' ? 'Hoạt động 13 tuần gần nhất' : 'Last 13 weeks'}
        subtitle={locale === 'vi' ? 'Mỗi ô là một ngày; càng đậm càng học nhiều.' : 'One square per day; darker means more study.'}
      >
        <div className="scroll-x">
          <div className="heatmap" role="img" aria-label={locale === 'vi' ? 'Bản đồ nhiệt hoạt động học tập' : 'Study activity heatmap'}>
            {heatmap.map((day) => (
              <i key={day.date} data-level={day.level} title={`${day.date}: ${formatDuration(day.seconds, locale)}`} />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
