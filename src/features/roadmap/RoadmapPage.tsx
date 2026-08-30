import { useMemo, useState } from 'react';
import { hrefOf } from '../../lib/router';
import { MAX_TOTAL_SCORE } from '../../config';
import { STAGES, STAGE_PROMOTION_KPI } from '../../data/curriculum';
import { summarize } from '../../lib/analytics';
import { daysUntil, formatDate, formatNumber, formatPercent, formatScore } from '../../lib/format';
import { PHASES, buildMilestones, phaseFor, rankWeakTopics } from '../../lib/plan';
import { stageKpi } from '../../lib/progression';
import { useAppState, useUpdateSettings } from '../../store/AppStore';
import { dueNow, streakOf } from '../../store/selectors';
import { Badge, Button, Card, CardHeader, Field, Input, Progress, Stat } from '../../components/ui/primitives';
import { TrendLine } from '../../components/charts';
import { CoachPanel } from '../ai/TutorPanel';
import { PlanBudget } from './PlanBudget';
import { PerfectPlan } from './PerfectPlan';
import { ExecutionLog } from './ExecutionLog';

/**
 * LO TRINH
 *
 * Tra loi cau hoi "tu day den ngay thi toi phai di qua nhung dau moc nao".
 * Duong tien do dung ham hoi lom: tien bo dau lo trinh nhanh hon, ve cuoi
 * cham lai — sat thuc te hon la chia deu, va nho vay nguoi hoc khong bi hut
 * o giai doan cuoi khi thay minh khong con tang nhanh nua.
 */
export function RoadmapPage() {
  const state = useAppState();
  const updateSettings = useUpdateSettings();
  const summary = summarize(state);
  const [draftDate, setDraftDate] = useState(state.settings.examDate ?? '');

  const daysLeft = state.settings.examDate ? daysUntil(state.settings.examDate) : null;
  const phase = phaseFor(daysLeft);
  const weak = rankWeakTopics(state.mastery, 6);

  const milestones = useMemo(
    () =>
      buildMilestones(
        summary.projected,
        state.settings.targetScore,
        state.settings.examDate,
        state.mastery,
      ),
    [summary.projected, state.settings.targetScore, state.settings.examDate, state.mastery],
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Lộ trình đến ngày thi</h1>
        <p className="mt-1.5 max-w-3xl text-sm text-fg-muted">
          Lộ trình được dựng lại mỗi khi bạn nộp bài, nên nó luôn phản ánh năng lực hiện tại chứ không phải kế
          hoạch viết một lần rồi để đó.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-4">
        <Stat
          label="Còn lại"
          value={daysLeft === null ? '—' : `${daysLeft} ngày`}
          hint={state.settings.examDate ? formatDate(state.settings.examDate) : 'chưa đặt ngày thi'}
        />
        <Stat label="Điểm dự báo" value={formatScore(summary.projected)} tone="brand" hint={`/${MAX_TOTAL_SCORE}`} />
        <Stat
          label="Cần thêm"
          value={summary.gapToTarget > 0 ? formatScore(summary.gapToTarget) : 'Đã đạt'}
          tone={summary.gapToTarget > 0 ? 'warn' : 'ok'}
        />
        <Stat label="Chuỗi ngày học" value={`${streakOf(state)} ngày`} />
      </div>

      <PlanBudget />

      <PerfectPlan />

      <ExecutionLog />

      <Card>
        <CardHeader
          title="Giai đoạn hiện tại"
          subtitle={phase.focus}
          action={<Badge tone="brand">{phase.name}</Badge>}
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {Object.values(PHASES).map((item) => (
            <div
              key={item.id}
              className={
                'rounded-xl border p-4 ' +
                (item.id === phase.id ? 'border-brand-line bg-brand-soft' : 'border-line bg-surface-2')
              }
            >
              <p className="text-sm font-semibold text-fg">{item.name}</p>
              <p className="mt-1 text-xs text-fg-muted">{item.focus}</p>
              <dl className="mt-3 space-y-1 text-xs text-fg-subtle">
                <div className="flex justify-between">
                  <dt>Học lý thuyết</dt>
                  <dd className="tabular-nums">{formatPercent(item.mix.learn, 0)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Luyện chuyên đề</dt>
                  <dd className="tabular-nums">{formatPercent(item.mix.drill, 0)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Thi thử</dt>
                  <dd className="tabular-nums">{formatPercent(item.mix.mock, 0)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Ôn tập lại</dt>
                  <dd className="tabular-nums">{formatPercent(item.mix.review, 0)}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader
          title="KPI ba giai đoạn của chương trình"
          subtitle={`Đạt KPI từ ${Math.round(STAGE_PROMOTION_KPI * 100)}% và phủ tối thiểu 60% số phiếu thì được xét lên giai đoạn mới.`}
        />
        <ul className="space-y-4">
          {STAGES.map((stage) => {
            const kpi = stageKpi(state, stage.stage);
            return (
              <li key={stage.stage}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                  <span className="font-medium text-fg">{stage.name}</span>
                  <span className="tabular-nums text-fg-muted">
                    KPI {formatPercent(kpi.kpi, 1)} · phủ {formatPercent(kpi.coverage, 0)} ·{' '}
                    {formatNumber(kpi.attempted)}/{formatNumber(kpi.total)} phiếu
                  </span>
                </div>
                <Progress
                  value={kpi.kpi * 100}
                  tone={kpi.eligible ? 'ok' : kpi.kpi >= 0.7 ? 'brand' : 'warn'}
                  className="mt-1.5"
                  label={`KPI ${stage.name}`}
                />
                {kpi.eligible && (
                  <p className="mt-1 text-xs text-ok">Đủ điều kiện xét lên giai đoạn tiếp theo.</p>
                )}
              </li>
            );
          })}
        </ul>
      </Card>

      {!state.settings.examDate && (
        <Card className="border-warn/40 bg-warn-soft">
          <CardHeader
            title="Đặt ngày thi để mở lộ trình theo tuần"
            subtitle="Không có ngày thi thì không có mốc, và không có mốc thì rất khó biết mình đang sớm hay muộn."
          />
          <div className="flex flex-wrap items-end gap-3">
            <Field label="Ngày thi dự kiến">
              {(props) => (
                <Input
                  {...props}
                  type="date"
                  value={draftDate}
                  onChange={(e) => setDraftDate(e.target.value)}
                  className="w-52"
                />
              )}
            </Field>
            <Button variant="primary" disabled={!draftDate} onClick={() => updateSettings({ examDate: draftDate })}>
              Lưu ngày thi
            </Button>
          </div>
        </Card>
      )}

      {milestones.length > 0 && (
        <Card>
          <CardHeader
            title="Mốc theo tuần"
            subtitle="Điểm mục tiêu của mỗi tuần được tính để bạn chạm đích đúng ngày thi, không sớm quá cũng không muộn."
          />
          <TrendLine
            points={milestones.map((m) => ({ label: `Tuần ${m.weekIndex}`, value: m.targetScore }))}
            max={MAX_TOTAL_SCORE}
            target={state.settings.targetScore}
          />
          <ol className="mt-6 space-y-3">
            {milestones.slice(0, 12).map((milestone) => (
              <li
                key={milestone.weekIndex}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface-2 p-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-fg">{milestone.label}</p>
                  <p className="text-xs text-fg-subtle">
                    Từ {formatDate(milestone.startDate)}
                    {milestone.focusTopics.length > 0 && ` · trọng tâm: ${milestone.focusTopics.join(', ')}`}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold tabular-nums text-brand">
                  {formatScore(milestone.targetScore)}/{MAX_TOTAL_SCORE}
                </span>
              </li>
            ))}
          </ol>
        </Card>
      )}

      <Card>
        <CardHeader
          title="Thứ tự ưu tiên chuyên đề"
          subtitle="Xếp theo số điểm có thể lấy lại được, tức là trọng số trong đề nhân với khoảng còn thiếu."
        />
        <ol className="space-y-2">
          {weak.map((topic, index) => (
            <li key={topic.topicId} className="flex items-center gap-3 rounded-lg bg-surface-2 px-3 py-2.5">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-soft text-sm font-semibold text-brand">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-fg">{topic.name}</span>
              <span className="shrink-0 text-xs tabular-nums text-fg-muted">
                thành thạo {formatPercent(topic.mastery, 0)}
              </span>
              <a
                href={hrefOf(`/practice?topic=${encodeURIComponent(topic.topicId)}`)}
                className="shrink-0 text-sm font-medium text-brand underline underline-offset-2"
              >
                Luyện
              </a>
            </li>
          ))}
        </ol>
      </Card>

      <CoachPanel
        apiKey={state.settings.aiApiKey}
        context={{
          projected: summary.projected,
          target: state.settings.targetScore,
          daysLeft,
          weakTopics: weak.slice(0, 3).map((t) => t.name),
          overdueCards: dueNow(state).length,
          streak: streakOf(state),
        }}
      />
    </div>
  );
}
