import { go, useApp } from '@/state';
import {
  buildTodayPlan,
  dailyTargetMinutes,
  REVIEW_STEP_MEANING,
  dayKey,
  type TodayTask,
  type ReviewCard,
} from '@/lib/review';
import { BRAND_TRACK_STYLE } from '@/data/brand';
import { PILLARS } from '@/data/gita';
import { Card, SectionTitle, Badge, Progress, Empty, Callout } from '@/components/ui';
import type { TrackId } from '@/types';

const KIND_META: Record<string, { label: string; color: string; glyph: string }> = {
  'on-lai': { label: 'Ôn lại đúng hạn', color: '#2E6FBF', glyph: '↻' },
  'loi-sai': { label: 'Xử lí lỗi sai', color: '#E01B24', glyph: '⚠' },
  'nhiem-vu': { label: 'Nhiệm vụ mới', color: '#1B4F9C', glyph: '✎' },
  'thoi-quen': { label: 'Thói quen', color: '#0F766E', glyph: '➜' },
  'de-mau': { label: 'Đề mẫu tính giờ', color: '#F0A21B', glyph: '⬢' },
};

const vnDate = (day: string) => {
  const [y, m, d] = day.split('-');
  return `${d}/${m}/${y}`;
};

export default function Today() {
  const { state, update } = useApp();
  const track: TrackId = state.profile?.track ?? 'thpt';
  const today = dayKey(new Date());
  const plan = buildTodayPlan(state, track, today);
  const style = BRAND_TRACK_STYLE[track];
  const target = dailyTargetMinutes(state);
  const doneMinutes = state.studyLog[today] ?? 0;
  const cd = plan.countdown;

  const toggle = (key: string) =>
    update((s) => ({ ...s, doneTasks: { ...s.doneTasks, [key]: !s.doneTasks[key] } }));

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow={`Hôm nay · ${vnDate(today)}`}
        title="Việc của hôm nay"
        desc={plan.headline}
        right={
          <button className="btn btn-ghost text-sm" onClick={() => go('/roadmap')}>
            Xem lộ trình cả chặng
          </button>
        }
      />

      {/* Bốn chỉ số nhịp học */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
            Chuỗi ngày học
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tabular-nums" style={{ color: style.color }}>
              {plan.streak.current}
            </span>
            <span className="text-[13px] font-semibold text-slate-500">ngày liên tiếp</span>
          </div>
          <div className="mt-2 flex gap-1">
            {plan.streak.week.map((d) => (
              <div key={d.day} className="flex-1 text-center" title={`${vnDate(d.day)} · ${d.minutes} phút`}>
                <div
                  className="h-8 rounded"
                  style={{
                    background: d.minutes > 0 ? style.color : '#e8ecf3',
                    opacity: d.minutes > 0 ? Math.min(1, 0.35 + d.minutes / 60) : 1,
                  }}
                />
                <div className="mt-0.5 text-[9px] font-semibold text-slate-400">{d.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-[11.5px] text-slate-500">
            Kỷ lục {plan.streak.best} ngày · {plan.streak.activeDays30}/30 ngày có học
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
            Phút học hôm nay
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tabular-nums text-slate-900">{doneMinutes}</span>
            <span className="text-[13px] font-semibold text-slate-500">/ {target} phút</span>
          </div>
          <div className="mt-3">
            <Progress value={(doneMinutes / Math.max(1, target)) * 100} tone={style.color} />
          </div>
          <div className="mt-2 text-[11.5px] text-slate-500">
            Tuần này {plan.streak.weekMinutes} phút · mục tiêu suy ra từ cam kết{' '}
            {state.profile?.hoursPerWeek ?? 7} giờ/tuần
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
            Ôn lại đến hạn
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span
              className="text-3xl font-extrabold tabular-nums"
              style={{ color: plan.queue.due.length ? '#E01B24' : '#0F766E' }}
            >
              {plan.queue.due.length}
            </span>
            <span className="text-[13px] font-semibold text-slate-500">việc</span>
          </div>
          <div className="mt-2 text-[12px] leading-relaxed text-slate-500">
            {plan.queue.due.filter((c) => c.overdueDays > 0).length} việc quá hạn ·{' '}
            {plan.queue.upcoming.length} việc trong 7 ngày tới ·{' '}
            {plan.queue.mastered} phiếu đã qua đủ 4 mốc
          </div>
        </Card>

        <Card className="p-5">
          <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
            {cd ? cd.phaseLabel : 'Ngày thi'}
          </div>
          {cd ? (
            <>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tabular-nums text-slate-900">
                  {cd.daysLeft}
                </span>
                <span className="text-[13px] font-semibold text-slate-500">ngày nữa</span>
              </div>
              <div className="mt-2 text-[12px] leading-relaxed text-slate-500">
                {cd.weeksLeft} tuần · còn khoảng {cd.hoursLeft} giờ luyện theo cam kết hiện tại
              </div>
            </>
          ) : (
            <div className="mt-2 text-[12.5px] text-slate-500">
              Chưa có ngày thi trong hồ sơ.{' '}
              <button className="font-semibold text-brand-700 underline" onClick={() => go('/onboarding')}>
                Cập nhật hồ sơ
              </button>
            </div>
          )}
        </Card>
      </div>

      {cd && cd.message && (
        <Callout tone={cd.phase === 'nuoc-rut' ? 'rose' : 'brand'} title={`${cd.phaseLabel} — còn ${cd.daysLeft} ngày`}>
          {cd.message}
        </Callout>
      )}

      {/* Việc quan trọng nhất */}
      {plan.keystone && (
        <Card className="overflow-hidden">
          <div className="h-1.5" style={{ background: '#F0A21B' }} />
          <div className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div className="min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-700">
                ◆ Nếu hôm nay chỉ làm được một việc
              </div>
              <div className="mt-1 text-[17px] font-extrabold leading-tight text-slate-900">
                {plan.keystone.title}
              </div>
              <div className="mt-1 text-[13px] leading-relaxed text-slate-600">{plan.keystone.why}</div>
            </div>
            {plan.keystone.route && (
              <button
                className="btn btn-primary shrink-0"
                onClick={() => go(plan.keystone!.route!)}
              >
                {plan.keystone.actionLabel ?? 'Bắt đầu'} · {plan.keystone.minutes} phút
              </button>
            )}
          </div>
        </Card>
      )}

      {/* Danh sách việc */}
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 bg-slate-50/70 px-5 py-3">
          <span className="text-[15px] font-extrabold text-slate-900">
            Danh sách việc · {plan.tasks.length} việc
          </span>
          <span className="text-[12.5px] font-semibold text-slate-500">
            Tổng {plan.totalMinutes} phút
          </span>
        </div>
        {plan.tasks.length === 0 ? (
          <Empty
            title="Chưa có việc nào cho hôm nay"
            desc="Hãy hoàn tất hồ sơ để hệ thống dựng lộ trình cá nhân hoá."
            action={
              <button className="btn btn-primary text-sm" onClick={() => go('/onboarding')}>
                Làm bài xếp lộ trình
              </button>
            }
          />
        ) : (
          <ol className="divide-y divide-slate-100">
            {plan.tasks.map((t, i) => (
              <TaskRow key={t.id} task={t} index={i + 1} onToggle={toggle} />
            ))}
          </ol>
        )}
      </Card>

      {/* Lịch ôn lại */}
      <SectionTitle
        eyebrow="Chống quên"
        title="Lịch ôn lại 1 – 3 – 7 – 21"
        desc="Kiến thức không mất đi vì khó, mà vì không được gặp lại đúng lúc. Hệ thống tự xếp lịch gặp lại cho từng phiếu em đã làm."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {REVIEW_STEP_MEANING.map((s) => {
          const n = plan.queue.due.filter((c) => c.step === s.step).length;
          const up = plan.queue.upcoming.filter((c) => c.step === s.step).length;
          return (
            <Card key={s.step} className="p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-extrabold text-slate-900">{s.label}</span>
                <span
                  className="chip"
                  style={{ background: n ? '#fee2e2' : '#eef1f6', color: n ? '#9E101A' : '#475569' }}
                >
                  {n} đến hạn
                </span>
              </div>
              <div className="mt-1.5 text-[12px] leading-relaxed text-slate-600">{s.why}</div>
              <div className="mt-2 text-[11.5px] font-semibold text-slate-400">
                {up} việc sắp tới ở mốc này
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50/70 px-5 py-3 text-[14px] font-extrabold text-slate-900">
            Đến hạn · {plan.queue.due.length}
          </div>
          {plan.queue.due.length === 0 ? (
            <div className="px-5 py-8 text-center text-[13px] text-slate-500">
              Không còn việc ôn lại nào đến hạn. Đây là trạng thái tốt — hãy dùng thời gian cho phiếu mới.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {plan.queue.due.slice(0, 8).map((c) => (
                <ReviewRow key={c.id} card={c} />
              ))}
              {plan.queue.due.length > 8 && (
                <div className="px-5 py-2.5 text-[12px] text-slate-500">
                  … và {plan.queue.due.length - 8} việc nữa.
                </div>
              )}
            </div>
          )}
        </Card>

        <Card className="overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50/70 px-5 py-3 text-[14px] font-extrabold text-slate-900">
            Sắp tới 7 ngày · {plan.queue.upcoming.length}
          </div>
          {plan.queue.upcoming.length === 0 ? (
            <div className="px-5 py-8 text-center text-[13px] text-slate-500">
              Chưa có lịch ôn nào trong 7 ngày tới. Làm thêm phiếu để hệ thống xếp lịch gặp lại.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {plan.queue.upcoming.slice(0, 8).map((c) => (
                <ReviewRow key={c.id} card={c} />
              ))}
              {plan.queue.upcoming.length > 8 && (
                <div className="px-5 py-2.5 text-[12px] text-slate-500">
                  … và {plan.queue.upcoming.length - 8} việc nữa.
                </div>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Neo vào mô thức GITA */}
      <Card className="p-6">
        <div className="text-sm font-bold text-slate-900">Hôm nay trong mô thức GITA</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => {
            const line: Record<string, string> = {
              G: cd
                ? `Đích: ${cd.phaseLabel.toLowerCase()}, còn ${cd.daysLeft} ngày. Mục tiêu hôm nay là ${target} phút và ${plan.tasks.length} việc.`
                : `Mục tiêu hôm nay: ${target} phút và ${plan.tasks.length} việc.`,
              I: plan.streak.current
                ? `Chuỗi ${plan.streak.current} ngày là bằng chứng em giữ được lời hứa với chính mình. Đừng để đứt vì một ngày lười.`
                : 'Bắt đầu lại chuỗi ngày hôm nay. Một việc nhỏ hoàn thành vẫn hơn một kế hoạch lớn bỏ dở.',
              T: plan.queue.due.length
                ? `Điểm yếu đang lộ ra rõ nhất ở ${plan.queue.due[0].topicName}. Biết chỗ hổng là đã đi được nửa đường.`
                : 'Chưa có điểm hổng nào nổi lên. Hãy nâng độ khó để hệ thống tìm ra giới hạn thật của em.',
              A: `Việc chốt hôm nay: ${plan.keystone?.title ?? 'chọn một phiếu và bắt đầu'}. Làm trước khi nghĩ tiếp.`,
            };
            return (
              <div
                key={p.id}
                className="rounded-xl border border-slate-200 p-4"
                style={{ borderTopWidth: 3, borderTopColor: p.color }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-extrabold" style={{ color: p.color }}>
                    {p.letter}
                  </span>
                  <span className="text-[13px] font-bold text-slate-900">{p.nameEn}</span>
                </div>
                <div className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">{line[p.id]}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function TaskRow({
  task,
  index,
  onToggle,
}: {
  task: TodayTask;
  index: number;
  onToggle: (key: string) => void;
}) {
  const meta = KIND_META[task.kind];
  return (
    <li className="flex flex-wrap items-start gap-3 px-5 py-4">
      <span
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold text-white"
        style={{ background: meta.color }}
      >
        {task.kind === 'thoi-quen' ? meta.glyph : index}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={`text-[14px] font-bold ${task.done ? 'text-slate-400 line-through' : 'text-slate-900'}`}
          >
            {task.title}
          </span>
          <Badge tone="slate">{meta.label}</Badge>
          {task.pareto && <Badge tone="amber">20/80</Badge>}
          <span className="text-[11.5px] font-semibold text-slate-400">{task.minutes} phút</span>
        </div>
        <div className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{task.why}</div>
      </div>
      <div className="flex shrink-0 gap-2">
        {task.toggleKey && (
          <button
            className={task.done ? 'btn btn-soft px-3 py-1.5 text-[12.5px]' : 'btn btn-ghost px-3 py-1.5 text-[12.5px]'}
            onClick={() => onToggle(task.toggleKey!)}
          >
            {task.done ? '✓ Đã làm' : 'Đánh dấu đã làm'}
          </button>
        )}
        {task.route && (
          <button className="btn btn-primary px-3 py-1.5 text-[12.5px]" onClick={() => go(task.route!)}>
            {task.actionLabel ?? 'Mở'}
          </button>
        )}
      </div>
    </li>
  );
}

function ReviewRow({ card }: { card: ReviewCard }) {
  const late = card.overdueDays > 0;
  return (
    <div className="flex flex-wrap items-start gap-3 px-5 py-3">
      <span
        className="mt-0.5 shrink-0 rounded-lg px-2 py-1 text-[11px] font-bold"
        style={
          late
            ? { background: '#fee2e2', color: '#9E101A' }
            : { background: '#eef1f6', color: '#334155' }
        }
      >
        {card.kind === 'loi-sai' ? '⚠' : `${card.step}n`}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-bold text-slate-800">{card.title}</div>
        <div className="text-[11.5px] text-slate-500">
          {card.topicName} · hạn {vnDate(card.dueDay)}
          {late ? ` · quá hạn ${card.overdueDays} ngày` : ''} · {card.minutes} phút
        </div>
      </div>
      <button
        className="btn btn-ghost shrink-0 px-2.5 py-1 text-[11.5px]"
        onClick={() => go(card.route)}
      >
        {card.actionLabel}
      </button>
    </div>
  );
}
