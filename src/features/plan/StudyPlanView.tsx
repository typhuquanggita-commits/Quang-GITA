/**
 * Study plan.
 *
 * The plan is regenerated from evidence rather than edited by hand: change
 * the test date, the target, or the hours available and the schedule
 * rebuilds around the skills the response log currently says are weakest.
 */

import React, { useMemo, useState } from 'react';
import { QUESTION_BY_ID } from '../../data/bank.ts';
import { collectResponses, skillStats, weakestSkills } from '../../engine/analytics.ts';
import { assessFeasibility, generatePlan, planProgress, taskLabel } from '../../engine/studyPlan.ts';
import { forecast } from '../../engine/autopilot.ts';
import { selectScoredAttempts, useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty, Field, Ring } from '../../components/ui/primitives.tsx';
import { LineChart } from '../../components/charts/charts.tsx';
import { IconAlert, IconCalendar, IconCheck } from '../../components/ui/icons.tsx';
import { addDays, daysBetween, formatDate, isoDate } from '../../lib/util.ts';

export function StudyPlanView(): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, dispatch } = useStore();

  const [testDate, setTestDate] = useState(state.profile.testDate ?? addDays(isoDate(), 60));
  const [target, setTarget] = useState(state.profile.targetScore);
  const [hours, setHours] = useState(state.plan?.hoursPerWeek ?? 8);
  const [weekOffset, setWeekOffset] = useState(0);

  const records = useMemo(() => collectResponses(state.attempts, QUESTION_BY_ID), [state.attempts]);
  const weak = useMemo(() => weakestSkills(skillStats(records), 8), [records]);
  const baseline = useMemo(() => selectScoredAttempts(state)[0]?.score?.total ?? null, [state]);

  const feasibility = useMemo(
    () =>
      assessFeasibility({
        testDate,
        targetScore: target,
        baselineScore: baseline,
        hoursPerWeek: hours,
        weakSkills: weak,
        locale,
      }),
    [testDate, target, baseline, hours, weak, locale],
  );

  const progress = useMemo(() => planProgress(state.plan), [state.plan]);

  function build() {
    const plan = generatePlan({
      testDate,
      targetScore: target,
      baselineScore: baseline,
      hoursPerWeek: hours,
      weakSkills: weak,
      locale,
    });
    dispatch({ type: 'plan/set', plan });
    dispatch({ type: 'profile/update', patch: { testDate, targetScore: target } });
  }

  const weekStart = useMemo(() => {
    const today = new Date(`${isoDate()}T00:00:00`);
    // Monday-first week.
    const offset = (today.getDay() + 6) % 7;
    today.setDate(today.getDate() - offset + weekOffset * 7);
    return isoDate(today);
  }, [weekOffset]);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <h1 className="page-title">{t('plan.title')}</h1>
        <p className="page-sub">{t('plan.subtitle')}</p>
      </header>

      <Card title={state.plan ? t('plan.regenerate') : t('plan.generate')}>
        <div className="stack gap-5">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <Field label={t('plan.testDate')}>
              {(id) => (
                <input
                  id={id}
                  className="input"
                  type="date"
                  min={isoDate()}
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                />
              )}
            </Field>
            <Field label={t('plan.targetScore')}>
              {(id) => (
                <input
                  id={id}
                  className="input"
                  type="number"
                  min={400}
                  max={1600}
                  step={10}
                  value={target}
                  onChange={(e) => setTarget(Number(e.target.value))}
                />
              )}
            </Field>
            <Field label={t('plan.hoursPerWeek')}>
              {(id) => (
                <input
                  id={id}
                  className="input"
                  type="number"
                  min={1}
                  max={40}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                />
              )}
            </Field>
          </div>

          <div
            className="row gap-3"
            style={{
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              background: feasibility.feasible ? 'var(--success-soft)' : 'var(--warning-soft)',
              color: feasibility.feasible ? 'var(--success)' : 'var(--warning)',
            }}
          >
            {feasibility.feasible ? <IconCheck size={18} /> : <IconAlert size={18} />}
            <div className="text-sm">
              <div className="semibold">{feasibility.feasible ? t('plan.feasible') : t('plan.tight')}</div>
              <div style={{ marginTop: 2, opacity: 0.9 }}>
                {locale === 'vi'
                  ? `Quỹ thời gian: ${feasibility.availableHours} giờ · Cần khoảng ${feasibility.requiredHours} giờ · Dự báo ${feasibility.projectedScore}`
                  : `Available: ${feasibility.availableHours}h · Needed: about ${feasibility.requiredHours}h · Projected ${feasibility.projectedScore}`}
              </div>
            </div>
          </div>

          <Button variant="primary" onClick={build} style={{ alignSelf: 'flex-start' }}>
            <IconCalendar size={16} />
            {state.plan ? t('plan.regenerate') : t('plan.generate')}
          </Button>
        </div>
      </Card>

      {!state.plan ? (
        <Empty icon={<IconCalendar size={30} />} title={t('plan.noPlan')} />
      ) : (
        <>
          <Card>
            <div className="ring-wrap wrap">
              <Ring
                value={progress.total === 0 ? 0 : progress.done / progress.total}
                size={120}
                label={`${Math.round(progress.total === 0 ? 0 : (progress.done / progress.total) * 100)}%`}
                sublabel={t('plan.progress')}
              />
              <div className="stack gap-3 grow">
                <div className="between">
                  <span className="muted">{locale === 'vi' ? 'Đã hoàn thành' : 'Completed'}</span>
                  <span className="semibold">{progress.done}/{progress.total}</span>
                </div>
                <div className="between">
                  <span className="muted">{locale === 'vi' ? 'Quá hạn' : 'Overdue'}</span>
                  <span className="semibold" style={{ color: progress.overdue > 0 ? 'var(--danger)' : undefined }}>
                    {progress.overdue}
                  </span>
                </div>
                <div className="between">
                  <span className="muted">{t('dash.daysLeft')}</span>
                  <span className="semibold">{Math.max(0, daysBetween(isoDate(), state.plan.testDate))}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            title={t('plan.thisWeek')}
            action={
              <div className="row gap-2">
                <Button size="sm" onClick={() => setWeekOffset((v) => v - 1)}>←</Button>
                <Button size="sm" onClick={() => setWeekOffset(0)} disabled={weekOffset === 0}>
                  {t('common.today')}
                </Button>
                <Button size="sm" onClick={() => setWeekOffset((v) => v + 1)}>→</Button>
              </div>
            }
          >
            <div className="plan-week">
              {weekDays.map((date) => {
                const tasks = state.plan!.tasks.filter((task) => task.date === date);
                return (
                  <div key={date} className="plan-day" data-today={date === isoDate() || undefined}>
                    <div className="plan-day-num">{formatDate(date, locale)}</div>
                    {tasks.map((task) => (
                      <button
                        key={task.id}
                        type="button"
                        className="plan-task"
                        data-done={task.done || undefined}
                        data-kind={task.kind}
                        onClick={() => dispatch({ type: 'plan/toggleTask', taskId: task.id })}
                        title={`${taskLabel(task, locale)} · ${task.minutes} ${t('common.minutes')}`}
                      >
                        {taskLabel(task, locale)}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </Card>

          <ForecastCard
            from={state.plan.baselineScore}
            targetTotal={state.plan.targetScore}
            testDate={state.plan.testDate}
            weeklyHours={state.plan.hoursPerWeek}
            locale={locale}
          />

          <Card title={locale === 'vi' ? 'Kỹ năng được ưu tiên' : 'Prioritised skills'}>
            {weak.length === 0 ? (
              <p className="muted text-sm">{t('analytics.needsData')}</p>
            ) : (
              <div className="row gap-2 wrap">
                {weak.map((skill) => (
                  <Badge key={skill.skill} tone="warning">
                    {skill.skill} · {Math.round(skill.mastery * 100)}%
                  </Badge>
                ))}
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Forecast                                                            */
/*                                                                     */
/* Module scope, per the standing rule: nested, every task tick would   */
/* remount the chart and lose the week the learner was looking at.      */
/* ------------------------------------------------------------------ */

function ForecastCard({
  from,
  targetTotal,
  testDate,
  weeklyHours,
  locale,
}: {
  from: number | null;
  targetTotal: number;
  testDate: string;
  weeklyHours: number;
  locale: 'vi' | 'en';
}): React.ReactElement {
  const vi = locale === 'vi';
  const points = useMemo(
    () => forecast({ from, targetTotal, testDate, weeklyHours }),
    [from, targetTotal, testDate, weeklyHours],
  );

  /*
   * No baseline means no forecast. Projecting from an assumed starting score
   * would draw a confident curve out of nothing — exactly the failure this
   * codebase refuses elsewhere, where an unmeasured signal is dropped rather
   * than defaulted to something plausible.
   */
  if (from === null || points.length < 2) {
    return (
      <Card title={vi ? 'Dự báo điểm' : 'Score forecast'}>
        <p className="muted text-sm" style={{ maxWidth: '58ch' }}>
          {vi
            ? 'Chưa có bài thi thử nào được chấm, nên chưa có điểm xuất phát để dự báo. Làm một bài full-length trước — dự báo từ một con số giả định thì chỉ là một đường cong tự tin vẽ từ hư không.'
            : 'No full-length test has been scored, so there is no starting point to project from. Sit one first: a forecast from an assumed baseline is a confident curve drawn out of nothing.'}
        </p>
      </Card>
    );
  }

  const arrival = points[points.length - 1].projected;
  const meets = arrival >= targetTotal;
  const t0 = Date.parse(`${points[0].date}T00:00:00`);

  return (
    <Card
      title={vi ? 'Dự báo điểm' : 'Score forecast'}
      subtitle={
        vi
          ? `Từ ${from} với ${weeklyHours} giờ/tuần đến ngày thi`
          : `From ${from} at ${weeklyHours} hours a week to test day`
      }
      action={
        <Badge tone={meets ? 'success' : 'warning'}>
          {vi ? `Tới ngày thi: ~${arrival}` : `By test day: ~${arrival}`}
        </Badge>
      }
    >
      <div className="stack gap-4">
        <LineChart
          height={200}
          yMin={Math.max(400, Math.min(from, targetTotal) - 100)}
          yMax={Math.min(1600, Math.max(arrival, targetTotal) + 100)}
          formatX={(v) => formatDate(isoDate(new Date(v)), locale)}
          series={[
            {
              name: vi ? 'Dự báo' : 'Projected',
              points: points.map((p) => [Date.parse(`${p.date}T00:00:00`), p.projected]),
            },
            {
              name: vi ? 'Mục tiêu' : 'Target',
              points: [
                [t0, targetTotal],
                [Date.parse(`${points[points.length - 1].date}T00:00:00`), targetTotal],
              ],
              color: 'var(--text-muted)',
            },
          ]}
          description={
            vi
              ? `Dự báo từ ${from} lên khoảng ${arrival} vào ngày thi, so với mục tiêu ${targetTotal}.`
              : `Projected from ${from} to about ${arrival} by test day, against a target of ${targetTotal}.`
          }
        />

        {/*
          The caveat belongs beside the curve, not in a document nobody opens.
          A learner who reads this line as a promise and then misses it by
          forty points has been failed by the interface, not by themselves.
        */}
        <p className="text-sm muted" style={{ maxWidth: '62ch' }}>
          {vi
            ? 'Đây là dự báo từ số giờ đã cam kết, không phải dự đoán điểm thi. Mô hình cố ý thận trọng và nén mạnh trên 1300 — mức tăng không tiếp tục tuyến tính. Học đúng cách quan trọng hơn số giờ, và đường này không biết bạn học thế nào.'
            : 'This projects committed hours, it does not predict a score. The model is deliberately conservative and compresses hard above 1300, because gains do not continue linearly. How the hours are spent matters more than how many there are, and this curve knows nothing about that.'}
        </p>
      </div>
    </Card>
  );
}
