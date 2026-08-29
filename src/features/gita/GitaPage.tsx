import { useMemo, useState } from 'react';
import {
  ABSORPTION_TIERS,
  ACTION_LEVELS,
  ENVIRONMENTS,
  GITA_CADENCES,
  GITA_PILLARS,
  HABITS,
  PRACTITIONER_LEVELS,
  TEAM_PLAYBOOK,
} from '../../data/gita';
import { PERMISSION_BY_ID } from '../../data/roles';
import { cn } from '../../lib/cn';
import { formatPercent } from '../../lib/format';
import {
  actionLevelOf,
  gitaIndex,
  habitCompletionToday,
  habitStatus,
  habitsForTier,
  paretoFocus,
  pillarScores,
  practitionerLevelOf,
  practitionersFor,
  tierStatus,
  weakestPillar,
} from '../../lib/gita';
import { useAppState, useDispatch } from '../../store/AppStore';
import type { AbsorptionTierId, GitaCadence, GitaEnvironment, GitaPillarId } from '../../types';
import { Badge, Card, CardHeader, Progress, Segmented, Stat } from '../../components/ui/primitives';
import { ScoreGauge, vizColor } from '../../components/charts';
import { IconCheck, IconSpark } from '../../components/layout/icons';

/**
 * MO THUC GITA
 *
 * Man hinh nay khong phai mot trang gioi thieu. No la BANG DIEU KHIEN cua mo
 * thuc: chi ra tru cot nao dang bi bo trong, tang hap thu hien tai va con thieu
 * gi de len tang, vung 20/80 nen don suc vao, cap do hanh dong, thoi quen nao
 * dang giu duoc, va giao an cho gia dinh — truong hoc — xa hoi.
 *
 * Toan bo noi dung duoc in ra tu src/data/gita.ts — cung mot nguon voi tai lieu
 * trong docs/GITA/, nen tai lieu va san pham khong bao gio lech nhau.
 */
export function GitaPage() {
  const state = useAppState();
  const status = tierStatus(state);
  const scores = pillarScores(state);
  const index = gitaIndex(state);
  const weakest = weakestPillar(state);
  const habits = habitCompletionToday(state, status.tier.id);
  const practitionerId = practitionerLevelOf(state.profile.role, state.profile.rank);
  const action = actionLevelOf(state);

  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <Badge tone="brand">
          <IconSpark className="size-3.5" />
          Mô thức huấn luyện GITA
        </Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Bốn trụ cột, ba nhịp, năm tầng</h1>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">
          GITA không phải khẩu hiệu dán lên sản phẩm. Đó là bốn trụ cột nâng đỡ lẫn nhau —{' '}
          <strong className="text-fg">Goal</strong> hệ thống mục tiêu,{' '}
          <strong className="text-fg">Inspirits</strong> nội lực và bản lĩnh,{' '}
          <strong className="text-fg">Talent</strong> tài năng và thế mạnh,{' '}
          <strong className="text-fg">Action</strong> hành động theo quy tắc 20/80. Thiếu bất kỳ trụ nào thì ba
          trụ còn lại đều sụp. Trang này làm cho chỗ đang trống hiện ra thành con số.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[auto_1fr]">
        <Card className="flex flex-col items-center justify-center">
          <ScoreGauge
            value={index}
            max={100}
            size={168}
            caption={
              <>
                Chỉ số GITA
                <br />
                <span className="text-fg-subtle">Trung bình bốn trụ cột, không ưu ái trụ nào</span>
              </>
            }
          />
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Stat
            label="Tầng hấp thu"
            value={`${status.tier.id} — ${status.tier.name}`}
            tone="brand"
            hint={status.next ? `Tiếp theo: ${status.next.id} ${status.next.name}` : 'Tầng cao nhất'}
          />
          <Stat
            label="Trụ cột đang yếu nhất"
            value={GITA_PILLARS.find((p) => p.id === weakest.pillar)?.name ?? '—'}
            tone="warn"
            hint="một giờ bỏ vào đây tạo khác biệt lớn nhất"
          />
          <Stat
            label="Cấp độ hành động"
            value={`${action.id} — ${action.name}`}
            hint="theo quy tắc 20/80"
          />
          <Stat
            label="Thói quen hôm nay"
            value={`${habits.done}/${habits.total}`}
            tone={habits.total > 0 && habits.done === habits.total ? 'ok' : 'neutral'}
            hint={
              practitionerId
                ? `Cấp chuyên môn ${practitionerId} · ${PRACTITIONER_LEVELS.find((p) => p.id === practitionerId)?.name}`
                : 'thói quen hằng ngày đã mở ở tầng của bạn'
            }
          />
        </div>
      </div>

      <PillarBoard scores={scores} />
      <ParetoPanel />
      <ActionLadder currentId={action.id} />
      <CadenceGuide />
      <TierLadder />
      <HabitBoard tier={status.tier.id} />
      <TeamSection />
      <PractitionerLadder currentId={practitionerId} />
      <EnvironmentPlaybooks />
      <DocumentIndex />
    </div>
  );
}

/* ── Bốn trụ cột ───────────────────────────────────────────────────────── */

function PillarBoard({ scores }: { scores: ReturnType<typeof pillarScores> }) {
  const byId = new Map(scores.map((s) => [s.pillar, s]));

  return (
    <Card>
      <CardHeader
        title="Bốn trụ cột"
        subtitle="Mỗi trụ cột có một câu hỏi riêng, một sản phẩm hữu hình riêng, và một kiểu sụp đổ riêng. Trụ nào không có sản phẩm hữu hình thì trụ đó mới chỉ là ý định."
      />
      <ol className="grid gap-4 lg:grid-cols-2">
        {GITA_PILLARS.map((pillar) => {
          const score = byId.get(pillar.id);
          const value = score?.value ?? 0;
          return (
            <li key={pillar.id} className="rounded-xl border border-line bg-surface-2 p-5">
              <div className="flex items-start gap-4">
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-xl text-lg font-bold text-white"
                  style={{ backgroundColor: vizColor(pillar.colorIndex) }}
                  aria-hidden="true"
                >
                  {pillar.letter}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-fg">
                    {pillar.name} <span className="font-normal text-fg-subtle">· {pillar.englishName}</span>
                  </h3>
                  <p className="mt-1 text-sm italic text-fg-muted">{pillar.question}</p>
                </div>
                <span className="shrink-0 text-sm font-semibold tabular-nums text-fg">
                  {formatPercent(value, 0)}
                </span>
              </div>

              <Progress
                value={value * 100}
                tone={value >= 0.75 ? 'ok' : value >= 0.4 ? 'brand' : 'warn'}
                className="mt-3"
                label={`Mức xây dựng trụ cột ${pillar.name}`}
              />

              <p className="mt-3 flex flex-wrap gap-1.5">
                {pillar.keywords.map((keyword) => (
                  <Badge key={keyword} tone="neutral">
                    {keyword}
                  </Badge>
                ))}
              </p>

              {score && (
                <ul className="mt-4 space-y-1.5">
                  {score.parts.map((part) => (
                    <li key={part.label} className="flex items-center gap-3 text-xs">
                      <span className="min-w-0 flex-1 truncate text-fg-muted">{part.label}</span>
                      <div className="h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-canvas-2">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${part.value * 100}%`,
                            backgroundColor: vizColor(pillar.colorIndex),
                          }}
                        />
                      </div>
                      <span className="w-9 shrink-0 text-right tabular-nums text-fg">
                        {formatPercent(part.value, 0)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <dl className="mt-4 space-y-2.5 text-sm">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-fg-subtle">Mục đích</dt>
                  <dd className="mt-0.5 leading-relaxed text-fg-muted">{pillar.purpose}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-fg-subtle">Sản phẩm hữu hình</dt>
                  <dd className="mt-0.5 leading-relaxed text-fg">{pillar.artifact}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-bad">Khi trụ này bị bỏ trống</dt>
                  <dd className="mt-0.5 leading-relaxed text-fg-muted">{pillar.failureMode}</dd>
                </div>
              </dl>

              {score && (
                <p className="mt-3 rounded-lg bg-surface p-3 text-sm leading-relaxed text-fg-muted">{score.note}</p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                {pillar.screens.map((screen) => (
                  <a
                    key={screen.href}
                    href={screen.href}
                    className="rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-fg-muted transition hover:border-line-strong hover:text-fg"
                  >
                    {screen.label}
                  </a>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

/* ── Vùng 20/80 ────────────────────────────────────────────────────────── */

function ParetoPanel() {
  const state = useAppState();
  const pareto = useMemo(() => paretoFocus(state), [state]);

  return (
    <Card>
      <CardHeader
        title="Vùng 20/80 của bạn"
        subtitle="Quy tắc 20/80 chỉ hữu ích khi trả lời được câu hỏi cụ thể: 20% nào. Danh sách dưới đây là tập chuyên đề nhỏ nhất đang chiếm khoảng 80% số điểm bạn có thể lấy lại."
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <Stat
          label="Số chuyên đề trọng điểm"
          value={String(pareto.topics.length)}
          tone="brand"
          hint={`chiếm ${formatPercent(pareto.concentration, 0)} tổng số chuyên đề`}
        />
        <Stat
          label="Công sức đang rơi đúng chỗ"
          value={formatPercent(pareto.focusRatio, 0)}
          tone={pareto.focusRatio >= 0.6 ? 'ok' : pareto.focusRatio >= 0.35 ? 'warn' : 'bad'}
          hint="tính trên 14 ngày gần nhất"
        />
        <Stat
          label="Nguyên tắc"
          value="80/20"
          hint="dồn 80% thời gian vào nhóm chuyên đề này"
        />
      </div>

      <ol className="space-y-2">
        {pareto.topics.map((topic, index) => (
          <li
            key={topic.topicId}
            className="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-surface-2 px-3 py-2.5"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-soft text-sm font-semibold text-brand">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm text-fg">{topic.name}</span>
            <span className="shrink-0 text-xs tabular-nums text-fg-muted">
              thành thạo {formatPercent(topic.mastery, 0)}
            </span>
            <span className="shrink-0 text-xs font-medium tabular-nums text-brand">
              {formatPercent(topic.share, 0)} điểm có thể lấy lại
            </span>
            <a
              href={`#/practice?topic=${encodeURIComponent(topic.topicId)}`}
              className="shrink-0 text-sm font-medium text-brand underline underline-offset-2"
            >
              Luyện
            </a>
          </li>
        ))}
      </ol>

      {pareto.focusRatio < 0.5 && (
        <p className="mt-4 rounded-lg border-l-4 border-l-warn bg-warn-soft p-3.5 text-sm leading-relaxed text-warn">
          Công sức của bạn đang bị rải mỏng ra ngoài vùng trọng điểm. Tuần tới, hãy dành ít nhất bảy trong mười
          phiếu luyện cho nhóm chuyên đề ở trên.
        </p>
      )}
    </Card>
  );
}

/* ── Cấp độ hành động ──────────────────────────────────────────────────── */

function ActionLadder({ currentId }: { currentId: string }) {
  return (
    <Card>
      <CardHeader
        title="Năm cấp độ hành động"
        subtitle="Câu trả lời cho câu hỏi 20/80 đổi theo từng cấp. Đây là lý do một người dùng mãi một chiến lược sẽ chững lại."
      />
      <ol className="space-y-3">
        {ACTION_LEVELS.map((level) => {
          const isCurrent = level.id === currentId;
          const passed = level.id < currentId;
          return (
            <li
              key={level.id}
              className={cn(
                'rounded-xl border p-5',
                isCurrent ? 'border-brand-line bg-brand-soft' : passed ? 'border-ok/30 bg-ok-soft' : 'border-line bg-surface-2',
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-fg">
                  <span className="tabular-nums">{level.id}</span> · {level.name}
                </h3>
                {isCurrent && <Badge tone="brand">Bạn ở đây</Badge>}
                {passed && (
                  <Badge tone="ok">
                    <IconCheck className="size-3.5" />
                    Đã qua
                  </Badge>
                )}
              </div>

              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-surface p-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-ok">
                    20% việc tạo 80% kết quả
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-fg">{level.vitalFew}</dd>
                </div>
                <div className="rounded-lg bg-surface p-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-bad">Việc cần cắt ở cấp này</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-fg-muted">{level.trivialMany}</dd>
                </div>
              </dl>

              <p className="mt-3 text-sm text-fg-muted">
                <strong className="text-fg">Dấu hiệu:</strong> {level.signal}
              </p>
              <p className="mt-1 text-sm text-fg-muted">
                <strong className="text-fg">Điều kiện lên cấp:</strong> {level.unlock}
              </p>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

/* ── Ba nhịp ───────────────────────────────────────────────────────────── */

function CadenceGuide() {
  const [cadence, setCadence] = useState<GitaCadence>('micro');
  const spec = GITA_CADENCES.find((c) => c.id === cadence) ?? GITA_CADENCES[0];
  if (!spec) return null;

  return (
    <Card>
      <CardHeader
        title="Ba nhịp áp dụng"
        subtitle="Cùng bốn trụ cột, chạy ở ba độ dài khác nhau. Bỏ nhịp nào thì hỏng ở nhịp đó."
        action={
          <Segmented
            label="Chọn nhịp"
            value={cadence}
            onChange={setCadence}
            options={GITA_CADENCES.map((c) => ({ value: c.id, label: c.name.replace('Nhịp ', '') }))}
          />
        }
      />
      <p className="mb-4 text-sm text-fg-muted">
        <strong className="text-fg">{spec.name}</strong> · {spec.window}
      </p>
      <ol className="space-y-3">
        {GITA_PILLARS.map((pillar) => (
          <li key={pillar.id} className="flex gap-3">
            <span
              className="grid size-7 shrink-0 place-items-center rounded-lg text-sm font-bold text-white"
              style={{ backgroundColor: vizColor(pillar.colorIndex) }}
              aria-hidden="true"
            >
              {pillar.letter}
            </span>
            <p className="pt-0.5 text-sm leading-relaxed text-fg-muted">{spec.steps[pillar.id]}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 rounded-lg border-l-4 border-l-brand bg-surface-2 p-3.5 text-sm text-fg">
        <strong>Nghi thức chốt nhịp:</strong> {spec.closing}
      </p>
    </Card>
  );
}

/* ── Bậc thang tầng hấp thu ────────────────────────────────────────────── */

function TierLadder() {
  const state = useAppState();
  const status = tierStatus(state);

  return (
    <Card>
      <CardHeader
        title="Năm tầng hấp thu"
        subtitle="Tầng được suy ra từ hành vi thật, không phải do tự khai. Mỗi tầng cần một cách phục vụ khác nhau — dùng nhầm cách là lý do phổ biến khiến người học mắc kẹt."
      />
      <ol className="space-y-3">
        {ABSORPTION_TIERS.map((tier) => {
          const isCurrent = tier.id === status.tier.id;
          const passed = tier.order < status.tier.order;
          const pillar = GITA_PILLARS.find((p) => p.id === tier.keyPillar);
          return (
            <li
              key={tier.id}
              className={cn(
                'rounded-xl border p-5',
                isCurrent ? 'border-brand-line bg-brand-soft' : passed ? 'border-ok/30 bg-ok-soft' : 'border-line bg-surface-2',
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-fg">
                    <span className="tabular-nums">{tier.id}</span> · {tier.name}{' '}
                    <span className="font-normal text-fg-subtle">({tier.englishName})</span>
                  </h3>
                  <p className="mt-1 text-sm italic text-fg-muted">{tier.selfDescription}</p>
                </div>
                <div className="flex items-center gap-2">
                  {pillar && (
                    <Badge tone="neutral">
                      Trụ cột chính: {pillar.letter} — {pillar.name}
                    </Badge>
                  )}
                  {isCurrent && <Badge tone="brand">Bạn ở đây</Badge>}
                  {passed && (
                    <Badge tone="ok">
                      <IconCheck className="size-3.5" />
                      Đã qua
                    </Badge>
                  )}
                </div>
              </div>

              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-fg-subtle">Nhu cầu thật</dt>
                  <dd className="mt-0.5 text-sm leading-relaxed text-fg-muted">{tier.realNeed}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-fg-subtle">Hệ thống đáp ứng</dt>
                  <dd className="mt-0.5 text-sm leading-relaxed text-fg-muted">{tier.systemResponse}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-bad">Bẫy giữ chân ở tầng này</dt>
                  <dd className="mt-0.5 text-sm leading-relaxed text-fg-muted">{tier.trap}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-fg-subtle">Điều kiện lên tầng</dt>
                  <dd className="mt-0.5 text-sm leading-relaxed text-fg-muted">{tier.exitCriteria}</dd>
                </div>
              </dl>

              {isCurrent && status.criteria.length > 0 && (
                <div className="mt-4 rounded-lg bg-surface p-4">
                  <p className="text-sm font-medium text-fg">
                    Còn thiếu gì để lên {status.next?.id} — {status.next?.name}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {status.criteria.map((criterion) => (
                      <li key={criterion.label}>
                        <div className="flex items-baseline justify-between gap-3 text-sm">
                          <span className={criterion.met ? 'text-ok' : 'text-fg-muted'}>
                            {criterion.met ? '✓ ' : ''}
                            {criterion.label}
                          </span>
                          <span className="tabular-nums text-fg">
                            {criterion.current}/{criterion.required}
                          </span>
                        </div>
                        <Progress
                          value={Math.min(100, (criterion.current / Math.max(1, criterion.required)) * 100)}
                          tone={criterion.met ? 'ok' : 'brand'}
                          className="mt-1"
                          label={criterion.label}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-fg-subtle">Tài liệu bổ trợ:</span>
                {tier.documents.map((doc) => (
                  <Badge key={doc} tone="neutral">
                    {doc}
                  </Badge>
                ))}
                <span className="ml-2 text-fg-subtle">
                  Người kèm phù hợp: {practitionersFor(tier.id).map((p) => p.id).join(', ')}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

/* ── Bảng thói quen ────────────────────────────────────────────────────── */

function HabitBoard({ tier }: { tier: AbsorptionTierId }) {
  const state = useAppState();
  const dispatch = useDispatch();
  const [pillarFilter, setPillarFilter] = useState<GitaPillarId | 'all'>('all');

  const unlocked = useMemo(() => new Set(habitsForTier(tier).map((h) => h.id)), [tier]);
  const list = HABITS.filter((h) => pillarFilter === 'all' || h.pillar === pillarFilter);

  return (
    <Card>
      <CardHeader
        title="Lộ trình rèn luyện theo thói quen thành công"
        subtitle="Mười hai thói quen nền tảng, mỗi trụ cột ba thói quen. Chọn ít và giữ lâu còn hơn chọn nhiều rồi bỏ — mỗi thói quen có một mỏ neo cụ thể, vì ý chí là nguồn lực cạn kiệt còn mỏ neo thì không."
        action={
          <Segmented
            label="Lọc theo trụ cột"
            value={pillarFilter}
            onChange={setPillarFilter}
            options={[
              { value: 'all', label: 'Tất cả' },
              ...GITA_PILLARS.map((p) => ({ value: p.id, label: p.letter })),
            ]}
          />
        }
      />
      <ul className="grid gap-3 lg:grid-cols-2">
        {list.map((habit) => {
          const status = habitStatus(state, habit, tier);
          const open = unlocked.has(habit.id);
          const pillar = GITA_PILLARS.find((p) => p.id === habit.pillar);
          return (
            <li
              key={habit.id}
              className={cn(
                'rounded-xl border p-4',
                status.doneToday ? 'border-ok/40 bg-ok-soft' : 'border-line bg-surface-2',
                !open && 'opacity-60',
              )}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  disabled={!open}
                  aria-pressed={status.doneToday}
                  aria-label={`Đánh dấu đã làm: ${habit.name}`}
                  onClick={() => dispatch({ type: 'habit/toggle', habitId: habit.id })}
                  className={cn(
                    'mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border transition',
                    status.doneToday
                      ? 'border-transparent bg-ok text-white'
                      : 'border-line-strong text-transparent hover:border-brand',
                    !open && 'cursor-not-allowed',
                  )}
                >
                  <IconCheck className="size-4" />
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-fg">{habit.name}</h3>
                    {pillar && (
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white"
                        style={{ backgroundColor: vizColor(pillar.colorIndex) }}
                      >
                        {pillar.letter}
                      </span>
                    )}
                    <Badge tone="neutral">{habit.cadence === 'daily' ? 'Hằng ngày' : 'Hằng tuần'}</Badge>
                  </div>
                  <p className="mt-1.5 text-xs text-fg-subtle">
                    <strong className="text-fg-muted">Mỏ neo:</strong> {habit.cue}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{habit.routine}</p>
                  <p className="mt-1.5 text-xs italic leading-relaxed text-fg-subtle">{habit.why}</p>

                  <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs tabular-nums text-fg-subtle">
                    <span>Chuỗi {status.streak}</span>
                    <span>·</span>
                    <span>28 ngày qua: {formatPercent(status.rate28, 0)}</span>
                    {!open && (
                      <>
                        <span>·</span>
                        <span>Mở từ tầng {habit.fromTier}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

/* ── Nhóm bạn xuất sắc ─────────────────────────────────────────────────── */

function TeamSection() {
  return (
    <Card>
      <CardHeader
        title="Nhóm bạn xuất sắc & môi trường thi đua"
        subtitle={`Quy mô khuyến nghị: ${TEAM_PLAYBOOK.size}`}
      />
      <p className="rounded-lg border-l-4 border-l-brand bg-surface-2 p-4 text-sm leading-relaxed text-fg">
        {TEAM_PLAYBOOK.premise}
      </p>

      <h3 className="mt-6 text-sm font-semibold text-fg">Bốn vai trong đội — luân phiên hằng tuần</h3>
      <ul className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM_PLAYBOOK.roles.map((role) => (
          <li key={role.name} className="rounded-xl border border-line bg-surface-2 p-4">
            <p className="text-sm font-medium text-fg">{role.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-fg-muted">{role.duty}</p>
            {role.rotates && <p className="mt-2 text-xs text-fg-subtle">Luân phiên</p>}
          </li>
        ))}
      </ul>

      <h3 className="mt-6 text-sm font-semibold text-fg">Nghi thức</h3>
      <ul className="mt-2 grid gap-3 sm:grid-cols-3">
        {TEAM_PLAYBOOK.rituals.map((ritual) => (
          <li key={ritual.name} className="rounded-xl border border-line bg-surface-2 p-4">
            <p className="text-sm font-medium text-fg">{ritual.name}</p>
            <p className="mt-0.5 text-xs text-fg-subtle">{ritual.cadence}</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{ritual.detail}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold text-fg">Nguyên tắc thi đua</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-fg-muted">
            {TEAM_PLAYBOOK.competitionRules.map((rule) => (
              <li key={rule} className="flex gap-2">
                <span aria-hidden="true">·</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-bad">Dấu hiệu nhóm đang hỏng</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-fg-muted">
            {TEAM_PLAYBOOK.antiPatterns.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-fg">Đo bằng gì</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-fg-muted">
            {TEAM_PLAYBOOK.metrics.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

/* ── Bậc thang chuyên môn ──────────────────────────────────────────────── */

function PractitionerLadder({ currentId }: { currentId: string | null }) {
  return (
    <Card>
      <CardHeader
        title="Năm cấp chuyên môn"
        subtitle="Trục dành cho tư vấn viên, giáo viên và coach. Mỗi cấp chịu trách nhiệm chính về một trụ cột, gắn với quyền thật trong hệ thống, và chỉ được công nhận khi có bằng chứng — không phải theo thâm niên."
      />
      <ol className="space-y-3">
        {PRACTITIONER_LEVELS.map((level) => {
          const pillar = GITA_PILLARS.find((p) => p.id === level.ownsPillar);
          return (
            <li
              key={level.id}
              className={cn(
                'rounded-xl border p-5',
                level.id === currentId ? 'border-brand-line bg-brand-soft' : 'border-line bg-surface-2',
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-fg">
                  <span className="tabular-nums">{level.id}</span> · {level.name}{' '}
                  <span className="font-normal text-fg-subtle">({level.englishName})</span>
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  {pillar && (
                    <Badge tone="neutral">
                      Giữ trụ {pillar.letter} — {pillar.name}
                    </Badge>
                  )}
                  {level.id === currentId && <Badge tone="brand">Bạn ở đây</Badge>}
                  <Badge tone="neutral">Phục vụ {level.serves.join(', ')}</Badge>
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-wide text-fg-subtle">Năng lực</h4>
                  <ul className="mt-1.5 space-y-1 text-sm text-fg-muted">
                    {level.competencies.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-wide text-fg-subtle">Bằng chứng công nhận</h4>
                  <ul className="mt-1.5 space-y-1 text-sm text-fg-muted">
                    {level.evidence.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-wide text-fg-subtle">Bộ công cụ sở hữu</h4>
                  <ul className="mt-1.5 space-y-1 text-sm text-fg-muted">
                    {level.toolkit.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-fg-subtle">Quyền được cấp thêm:</span>
                {level.authority.map((permission) => (
                  <Badge key={permission} tone="neutral">
                    {PERMISSION_BY_ID.get(permission)?.name ?? permission}
                  </Badge>
                ))}
              </p>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-xs text-fg-subtle">
        Ánh xạ sang vai trò trong hệ thống được định nghĩa ở{' '}
        <code className="rounded bg-surface-2 px-1">practitionerLevelOf()</code> trong{' '}
        <code className="rounded bg-surface-2 px-1">src/lib/gita.ts</code>. Xem thêm{' '}
        <a href="#/roles" className="font-medium text-brand underline underline-offset-2">
          màn hình Phân quyền
        </a>
        .
      </p>
    </Card>
  );
}

/* ── Giáo án ba môi trường ─────────────────────────────────────────────── */

function EnvironmentPlaybooks() {
  const [env, setEnv] = useState<GitaEnvironment>('family');
  const playbook = ENVIRONMENTS.find((e) => e.id === env) ?? ENVIRONMENTS[0];
  if (!playbook) return null;

  return (
    <Card>
      <CardHeader
        title="GITA hóa ba môi trường"
        subtitle="Mô thức không dừng ở màn hình ứng dụng. Nó chỉ thành nếp khi được cài vào gia đình, lớp học và đời sống."
        action={
          <Segmented
            label="Chọn môi trường"
            value={env}
            onChange={setEnv}
            options={[
              { value: 'family', label: 'Gia đình' },
              { value: 'school', label: 'Trường học' },
              { value: 'society', label: 'Xã hội' },
            ]}
          />
        }
      />

      <p className="rounded-lg border-l-4 border-l-brand bg-surface-2 p-4 text-sm leading-relaxed text-fg">
        {playbook.premise}
      </p>

      <h3 className="mt-6 text-sm font-semibold text-fg">Việc theo từng trụ cột</h3>
      <ol className="mt-2 space-y-2">
        {GITA_PILLARS.map((pillar) => (
          <li key={pillar.id} className="flex gap-3">
            <span
              className="grid size-6 shrink-0 place-items-center rounded text-xs font-bold text-white"
              style={{ backgroundColor: vizColor(pillar.colorIndex) }}
              aria-hidden="true"
            >
              {pillar.letter}
            </span>
            <p className="text-sm leading-relaxed text-fg-muted">{playbook.practices[pillar.id]}</p>
          </li>
        ))}
      </ol>

      <h3 className="mt-6 text-sm font-semibold text-fg">Nghi thức lặp lại</h3>
      <ul className="mt-2 grid gap-3 sm:grid-cols-3">
        {playbook.rituals.map((ritual) => (
          <li key={ritual.name} className="rounded-xl border border-line bg-surface-2 p-4">
            <p className="text-sm font-medium text-fg">{ritual.name}</p>
            <p className="mt-0.5 text-xs text-fg-subtle">{ritual.cadence}</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{ritual.detail}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-bad">Dấu hiệu đang phản tác dụng</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-fg-muted">
            {playbook.antiPatterns.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-fg">Đo bằng gì</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-fg-muted">
            {playbook.metrics.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

/* ── Chỉ mục tài liệu ──────────────────────────────────────────────────── */

const DOCUMENTS: ReadonlyArray<{ path: string; title: string; audience: string; summary: string }> = [
  {
    path: 'docs/GITA/00-KHUNG-GITA.md',
    title: 'Khung mô thức GITA',
    audience: 'Mọi vai trò',
    summary: 'Bốn trụ cột, ba nhịp, hai trục phân tầng, ba môi trường. Tài liệu gốc mà mọi thứ khác tham chiếu về.',
  },
  {
    path: 'docs/GITA/01-TANG-HAP-THU.md',
    title: 'Năm tầng hấp thu của người học',
    audience: 'Giáo viên, coach, phụ huynh',
    summary: 'Nhận diện tầng, phục vụ đúng cách, và điều kiện định lượng để lên tầng.',
  },
  {
    path: 'docs/GITA/02-CAP-DO-CHUYEN-MON.md',
    title: 'Năm cấp chuyên môn',
    audience: 'Đội ngũ chuyên môn',
    summary: 'Năng lực, quyền hạn, bằng chứng công nhận và bộ công cụ của từng cấp.',
  },
  {
    path: 'docs/GITA/03-GITA-GIA-DINH.md',
    title: 'GITA trong gia đình',
    audience: 'Phụ huynh',
    summary: 'Nghi thức, cách đặt câu hỏi, và những điều tuyệt đối nên tránh.',
  },
  {
    path: 'docs/GITA/04-GITA-TRUONG-HOC.md',
    title: 'GITA trong trường học',
    audience: 'Giáo viên, tổ chuyên môn',
    summary: 'Dạy chung, luyện riêng, đo bằng một hệ quy chiếu. Giáo án tuần và buổi rà giai đoạn.',
  },
  {
    path: 'docs/GITA/05-GITA-XA-HOI.md',
    title: 'GITA ngoài xã hội',
    audience: 'Người học trưởng thành',
    summary: 'Áp dụng bốn trụ cột cho dự án, kỹ năng và thay đổi trong đời sống.',
  },
  {
    path: 'docs/GITA/06-THOI-QUEN.md',
    title: 'Lộ trình thói quen thành công',
    audience: 'Người học, phụ huynh',
    summary: 'Mười hai thói quen: mỏ neo — hành vi — lý do, kèm cách cài đặt và cách khôi phục khi đứt chuỗi.',
  },
  {
    path: 'docs/GITA/07-QUY-TRINH.md',
    title: 'Quy trình vận hành chuẩn',
    audience: 'Đội ngũ chuyên môn',
    summary: 'Bảy quy trình: tiếp nhận, định vị, giao nhiệm vụ, rà tuần, can thiệp, tổng kết giai đoạn, chuyển giao.',
  },
  {
    path: 'docs/GITA/08-NHAN-DIEN.md',
    title: 'Nhận diện HSA365',
    audience: 'Mọi vai trò',
    summary: 'Điều làm nên khác biệt, nguyên tắc thiết kế, giọng nói, và những gì HSA365 từ chối làm.',
  },
  {
    path: 'docs/GITA/09-TIEU-CHUAN.md',
    title: 'Bộ tiêu chuẩn chất lượng',
    audience: 'Kiến trúc sư chương trình, kỹ thuật',
    summary: 'Chuẩn nội dung, chuẩn sư phạm, chuẩn kỹ thuật và khả năng truy cập, kèm cách kiểm chứng.',
  },
  {
    path: 'docs/GITA/10-DOI-NHOM.md',
    title: 'Nhóm bạn xuất sắc',
    audience: 'Người học, coach',
    summary: 'Cách lập đội 3–5 người, bốn vai luân phiên, nghi thức và nguyên tắc thi đua lành mạnh.',
  },
];

function DocumentIndex() {
  return (
    <Card>
      <CardHeader
        title="Hệ thống tài liệu bổ trợ"
        subtitle="Mười một tài liệu, phân theo vai trò và tầng. Tất cả nằm trong kho mã nguồn nên luôn đi cùng phiên bản sản phẩm."
      />
      <ul className="divide-y divide-line">
        {DOCUMENTS.map((doc) => (
          <li key={doc.path} className="flex flex-wrap items-start justify-between gap-3 py-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-fg">{doc.title}</p>
              <p className="mt-0.5 text-sm text-fg-muted">{doc.summary}</p>
              <code className="mt-1 inline-block rounded bg-surface-2 px-1.5 py-0.5 text-xs text-fg-subtle">
                {doc.path}
              </code>
            </div>
            <Badge tone="neutral">{doc.audience}</Badge>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-fg-subtle">
        Nguyên tắc: tài liệu và sản phẩm dùng chung một nguồn dữ liệu (
        <code className="rounded bg-surface-2 px-1">src/data/gita.ts</code>), nên không bao giờ có chuyện tài liệu
        nói một đằng, phần mềm chạy một nẻo.
      </p>
    </Card>
  );
}
