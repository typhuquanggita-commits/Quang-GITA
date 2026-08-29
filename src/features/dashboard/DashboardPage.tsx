import { useMemo } from 'react';
import { MAX_TOTAL_SCORE, SECTION_BY_ID } from '../../config';
import { STAGES } from '../../data/curriculum';
import { topicName } from '../../data/topics';
import { buildInsights, summarize, type Insight } from '../../lib/analytics';
import { addDays, dayKey, formatNumber, formatPercent, formatScore, weekdayShort } from '../../lib/format';
import { buildDailyPlan, rankWeakTopics } from '../../lib/plan';
import { scoreBand } from '../../lib/scoring';
import { navigate } from '../../lib/router';
import { useAppState } from '../../store/AppStore';
import {
  blanksInLatest,
  dueNow,
  readinessOf,
  scoreHistory,
  sectionProgress,
  streakOf,
} from '../../store/selectors';
import { recommendedWorksheets, trackStatus } from '../../lib/progression';
import { GITA_PILLARS } from '../../data/gita';
import { actionLevelOf, gitaIndex, habitCompletionToday, pillarScores, tierStatus, weakestPillar } from '../../lib/gita';
import { vizColor } from '../../components/charts';
import { BarList, CalendarHeatmap, DataTable, ScoreGauge, TrendLine } from '../../components/charts';
import { Badge, Button, Card, CardHeader, Progress, Stat } from '../../components/ui/primitives';
import { IconCheck, IconClock, IconSpark, IconTarget } from '../../components/layout/icons';

/**
 * MAN HINH TONG QUAN
 *
 * Cau hoi ma man hinh nay phai tra loi trong 5 giay dau tien:
 *  1. Toi dang o dau so voi muc tieu?
 *  2. Hom nay toi phai lam gi?
 *  3. Cai gi dang keo toi xuong?
 */
export function DashboardPage() {
  const state = useAppState();
  const summary = summarize(state);
  const readiness = readinessOf(state);
  const due = dueNow(state);
  const plan = buildDailyPlan({ state, dueCardCount: due.length });
  const history = scoreHistory(state);
  const band = scoreBand(summary.projected);
  const weak = rankWeakTopics(state.mastery, 5);
  const recommended = recommendedWorksheets(state, state.settings.scienceSubject, 3);

  const insights = useMemo<Insight[]>(
    () =>
      buildInsights({
        latest: state.results[state.results.length - 1],
        history: state.results,
        overdueCards: due.length,
        streak: streakOf(state),
        targetScore: state.settings.targetScore,
        examDate: state.settings.examDate,
        weakTopics: weak.map((w) => ({ name: w.name, mastery: w.mastery })),
        blankAnswers: blanksInLatest(state),
      }),
    [state, due.length, weak],
  );

  const heat = useMemo(() => {
    const cells = [];
    // 18 tuần gần nhất, bắt đầu từ Chủ nhật để cột thẳng hàng như lịch.
    const today = new Date();
    const start = addDays(today, -(17 * 7 + today.getDay()));
    for (let i = 0; i <= 17 * 7 + today.getDay(); i += 1) {
      const date = addDays(start, i);
      const key = dayKey(date);
      const log = state.days[key];
      cells.push({
        date: key,
        value: log?.questions ?? 0,
        label: `${weekdayShort(date)} ${date.getDate()}/${date.getMonth() + 1}: ${log?.questions ?? 0} câu`,
      });
    }
    return cells;
  }, [state.days]);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Chào {state.profile.displayName}
          </h1>
          <p className="mt-1.5 text-sm text-fg-muted">
            {plan.daysLeft === null
              ? 'Đặt ngày thi trong Cài đặt để hệ thống dựng lộ trình theo tuần.'
              : plan.daysLeft >= 0
                ? `Còn ${plan.daysLeft} ngày đến ngày thi · ${plan.phase.name}`
                : 'Ngày thi đã qua — cập nhật ngày thi mới trong Cài đặt.'}
          </p>
        </div>
        <Badge tone="brand">{STAGES.find((s) => s.stage === state.stage)?.name}</Badge>
      </header>

      <div className="grid gap-5 lg:grid-cols-[auto_1fr]">
        <Card className="flex flex-col items-center justify-center">
          <ScoreGauge
            value={summary.projected}
            max={MAX_TOTAL_SCORE}
            target={state.settings.targetScore}
            caption={
              <>
                Điểm dự báo · {band.label}
                <br />
                <span className="text-fg-subtle">Vạch đậm là mục tiêu {state.settings.targetScore}</span>
              </>
            }
          />
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Stat
            label="Chỉ số sẵn sàng"
            value={`${readiness.score}/100`}
            tone={readiness.score >= 80 ? 'ok' : readiness.score >= 60 ? 'brand' : 'warn'}
            hint="tổng hợp từ 5 trụ cột bên dưới"
            icon={<IconTarget className="size-3.5" />}
          />
          <Stat
            label="Còn thiếu để đạt mục tiêu"
            value={summary.gapToTarget > 0 ? formatScore(summary.gapToTarget) : 'Đã đạt'}
            tone={summary.gapToTarget > 0 ? 'warn' : 'ok'}
            hint={`mục tiêu ${state.settings.targetScore}/${MAX_TOTAL_SCORE}`}
          />
          <Stat
            label="Chuỗi ngày học"
            value={`${summary.streak} ngày`}
            hint={`hôm nay đã làm ${summary.todayQuestions}/${state.settings.dailyGoal} câu`}
            icon={<IconCheck className="size-3.5" />}
          />
          <Stat
            label="Câu chờ ôn tập"
            value={formatNumber(due.length)}
            tone={due.length > 20 ? 'bad' : due.length > 0 ? 'warn' : 'ok'}
            hint="đến hạn theo lịch ngắt quãng"
            icon={<IconClock className="size-3.5" />}
          />
        </div>
      </div>

      <GitaStrip />

      {/* Kế hoạch hôm nay */}
      <Card>
        <CardHeader
          title="Việc của hôm nay"
          subtitle={`${plan.phase.focus} Tổng khoảng ${plan.totalMinutes} phút.`}
          action={<Badge tone="neutral">{plan.phase.name}</Badge>}
        />
        {plan.tasks.length === 0 ? (
          <p className="text-sm text-fg-muted">
            Không có việc bắt buộc hôm nay. Chọn một phiếu luyện ở tuyến yếu nhất để giữ nhịp.
          </p>
        ) : (
          <ol className="space-y-3">
            {plan.tasks.map((task) => (
              <li key={task.id} className="flex items-start gap-3 rounded-xl border border-line bg-surface-2 p-4">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-sm font-semibold text-brand">
                  {task.minutes}′
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-fg">{task.title}</p>
                  <p className="mt-0.5 text-sm text-fg-muted">{task.detail}</p>
                </div>
                <Button size="sm" onClick={() => navigate(task.href.replace(/^#/, ''))}>
                  Làm ngay
                </Button>
              </li>
            ))}
          </ol>
        )}
      </Card>

      {/* Nhận xét có thể hành động */}
      {insights.length > 0 && (
        <Card>
          <CardHeader title="Điều đáng chú ý" subtitle="Mỗi mục đều kèm việc cụ thể để xử lý ngay." />
          <ul className="space-y-3">
            {insights.slice(0, 4).map((insight) => (
              <li
                key={insight.id}
                className={
                  'rounded-xl border-l-4 bg-surface-2 p-4 ' +
                  (insight.tone === 'critical'
                    ? 'border-l-bad'
                    : insight.tone === 'warning'
                      ? 'border-l-warn'
                      : insight.tone === 'positive'
                        ? 'border-l-ok'
                        : 'border-l-brand')
                }
              >
                <p className="text-sm font-medium text-fg">{insight.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">{insight.detail}</p>
                {insight.action && (
                  <a
                    href={insight.action.href}
                    className="mt-2 inline-block text-sm font-medium text-brand underline underline-offset-2"
                  >
                    {insight.action.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Năng lực theo phần thi" subtitle="Ước lượng trên thang 50 điểm của từng phần." />
          <BarList
            max={50}
            format={(v) => `${formatScore(v)}/50`}
            data={sectionProgress(state).map((entry, index) => ({
              label: entry.spec.name,
              value: entry.mastery * 50,
              colorIndex: index,
              hint: `${entry.practiced}/${entry.topics} chuyên đề đã luyện`,
            }))}
          />
          <DataTable
            caption="Năng lực ước lượng theo từng phần thi"
            head={['Phần thi', 'Điểm ước lượng', 'Chuyên đề đã luyện']}
            rows={sectionProgress(state).map((entry) => [
              entry.spec.name,
              `${formatScore(entry.mastery * 50)}/50`,
              `${entry.practiced}/${entry.topics}`,
            ])}
          />
        </Card>

        <Card>
          <CardHeader
            title="Năm trụ cột của chỉ số sẵn sàng"
            subtitle="Nhìn ra ngay trụ cột nào đang kéo bạn xuống."
          />
          <div className="space-y-3">
            {[
              { label: 'Kết quả so với mục tiêu', value: readiness.performance, weight: '40%' },
              { label: 'Độ phủ chuyên đề', value: readiness.coverage, weight: '20%' },
              { label: 'Đều đặn 14 ngày qua', value: readiness.consistency, weight: '15%' },
              { label: 'Tốc độ làm bài', value: readiness.pace, weight: '15%' },
              { label: 'Độ bền kiến thức', value: readiness.retention, weight: '10%' },
            ].map((pillar) => (
              <div key={pillar.label}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-fg">
                    {pillar.label} <span className="text-fg-subtle">({pillar.weight})</span>
                  </span>
                  <span className="tabular-nums text-fg-muted">{pillar.value}%</span>
                </div>
                <Progress
                  value={pillar.value}
                  tone={pillar.value >= 75 ? 'ok' : pillar.value >= 50 ? 'brand' : 'warn'}
                  className="mt-1"
                  label={pillar.label}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {history.length >= 2 && (
        <Card>
          <CardHeader title="Xu hướng điểm thi thử" subtitle="Đường nét đứt là mục tiêu của bạn." />
          <TrendLine
            points={history.map((h, i) => ({ label: `Lần ${i + 1}`, value: h.total }))}
            max={MAX_TOTAL_SCORE}
            target={state.settings.targetScore}
          />
          <DataTable
            caption="Điểm từng lần thi thử"
            head={['Lần', 'Bài thi', 'Điểm']}
            rows={history.map((h, i) => [i + 1, h.label, formatScore(h.total)])}
          />
        </Card>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Nhịp học 18 tuần" subtitle="Đều đặn quan trọng hơn bùng nổ." />
          <CalendarHeatmap cells={heat} />
        </Card>

        <Card>
          <CardHeader
            title="Chuyên đề mất nhiều điểm nhất"
            subtitle="Xếp theo số điểm có thể lấy lại, không phải theo tỉ lệ sai."
          />
          <BarList
            max={1}
            format={(v) => formatPercent(v, 0)}
            data={weak.map((w) => ({
              label: w.name,
              value: w.mastery,
              hint: `Cấp ${trackStatus(state, w.topicId).level} · ${SECTION_BY_ID[sectionOf(w.topicId)].shortName}`,
            }))}
          />
        </Card>
      </div>

      {recommended.length > 0 && (
        <Card>
          <CardHeader
            title="Phiếu luyện nên làm tiếp"
            subtitle="Chọn theo tuyến yếu nhất và đúng cấp độ hiện tại của bạn."
            action={
              <Button size="sm" onClick={() => navigate('/practice')}>
                Xem tất cả
              </Button>
            }
          />
          <ul className="grid gap-3 sm:grid-cols-3">
            {recommended.map((sheet) => (
              <li key={sheet.id} className="rounded-xl border border-line bg-surface-2 p-4">
                <p className="text-xs tabular-nums text-fg-subtle">{sheet.code}</p>
                <p className="mt-1 text-sm font-medium text-fg">{topicName(sheet.topicId)}</p>
                <p className="mt-0.5 text-xs text-fg-muted">
                  Cấp {sheet.level} · {sheet.questionCount} câu · +{sheet.xp} XP
                </p>
                <Button
                  size="sm"
                  variant="primary"
                  className="mt-3 w-full"
                  onClick={() => navigate(`/worksheet?id=${encodeURIComponent(sheet.id)}`)}
                >
                  <IconSpark className="size-4" />
                  Bắt đầu
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

/**
 * Dai GITA tren man hinh chinh.
 *
 * Muc dich: moi lan mo app, nguoi hoc nhin thay ngay pha nao cua vong lap dang
 * bi bo qua — thu ma bang diem so thong thuong khong bao gio noi cho ho biet.
 */
function GitaStrip() {
  const state = useAppState();
  const status = tierStatus(state);
  const scores = pillarScores(state);
  const weakest = weakestPillar(state);
  const action = actionLevelOf(state);
  const habits = habitCompletionToday(state, status.tier.id);
  const index = gitaIndex(state);

  return (
    <Card>
      <CardHeader
        title="Bốn trụ cột GITA của bạn"
        subtitle={`Tầng hấp thu ${status.tier.id} — ${status.tier.name} · Cấp hành động ${action.id} ${action.name} · Chỉ số GITA ${index}/100.`}
        action={
          <Button size="sm" onClick={() => navigate('/gita')}>
            Mở mô thức
          </Button>
        }
      />
      <ol className="grid gap-3 sm:grid-cols-4">
        {GITA_PILLARS.map((pillar) => {
          const score = scores.find((s) => s.pillar === pillar.id);
          const value = score?.value ?? 0;
          const isWeakest = pillar.id === weakest.pillar;
          return (
            <li
              key={pillar.id}
              className={
                'rounded-xl border p-4 ' +
                (isWeakest ? 'border-warn/50 bg-warn-soft' : 'border-line bg-surface-2')
              }
            >
              <div className="flex items-center gap-2">
                <span
                  className="grid size-7 shrink-0 place-items-center rounded-lg text-sm font-bold text-white"
                  style={{ backgroundColor: vizColor(pillar.colorIndex) }}
                  aria-hidden="true"
                >
                  {pillar.letter}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-fg">{pillar.name}</span>
                <span className="text-sm font-semibold tabular-nums text-fg">{formatPercent(value, 0)}</span>
              </div>
              <Progress
                value={value * 100}
                tone={value >= 0.75 ? 'ok' : value >= 0.4 ? 'brand' : 'warn'}
                className="mt-2.5"
                label={`Mức xây dựng trụ cột ${pillar.name}`}
              />
              {isWeakest && <p className="mt-2 text-xs font-medium text-warn">Đang yếu nhất — ưu tiên trụ cột này</p>}
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-sm leading-relaxed text-fg-muted">{weakest.note}</p>
      <p className="mt-2 text-xs text-fg-subtle tabular-nums">
        Thói quen hằng ngày hôm nay: {habits.done}/{habits.total}
      </p>
    </Card>
  );
}

function sectionOf(topicId: string): 'quantitative' | 'qualitative' | 'science' {
  const prefix = topicId.split('.')[0];
  if (prefix === 'quantitative' || prefix === 'qualitative') return prefix;
  return 'science';
}
