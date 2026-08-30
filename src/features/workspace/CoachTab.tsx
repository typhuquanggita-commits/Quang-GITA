import { useMemo, useState } from 'react';
import { GITA_PILLARS, PILLAR_BY_ID } from '../../data/gita';
import { habitStatus, habitsForTier, tierStatus } from '../../lib/gita';
import { formatPercent } from '../../lib/format';
import type { LearnerRow } from '../../lib/cohort';
import { useCan } from '../../components/PermissionGate';
import { Badge, Card, CardHeader, Select } from '../../components/ui/primitives';

/**
 * SO HUAN LUYEN GITA
 *
 * Coach lam viec voi PHAN CON NGUOI cua viec hoc: muc tieu, dong luc, thoi
 * quen, ky luat hanh dong. Man hinh nay khong lap lai bang lop — no tra loi
 * mot cau hoi khac han: "buoi huan luyen toi nen noi ve cai gi".
 *
 * Bo cau hoi ben duoi khong phai goi y de tham khao ma la MOT QUY TRINH, va
 * thu tu cua no quan trong: hoi truoc khi giang. Mot coach mo dau bang loi
 * khuyen se nhan duoc su dong y lich su roi khong co gi thay doi; mot coach
 * mo dau bang cau hoi se biet duoc van de that — thu gan nhu luon khac voi
 * thu hoc vien khai bao lan dau.
 */
export function CoachTab({ rows }: { rows: readonly LearnerRow[] }) {
  const canPlan = useCan('coach.plan');
  const [selected, setSelected] = useState(rows[0]?.snapshot.id ?? '');
  const row = useMemo(
    () => rows.find((r) => r.snapshot.id === selected) ?? rows[0],
    [rows, selected],
  );

  if (!row) return null;

  const tier = tierStatus(row.snapshot.state);
  const weakestHabits = habitsForTier(tier.tier.id)
    .map((habit) => habitStatus(row.snapshot.state, habit, tier.tier.id))
    .filter((status) => status.unlocked && status.rate28 < 0.5)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Sổ huấn luyện"
          subtitle="Trả lời câu hỏi: buổi huấn luyện tới nên nói về cái gì."
          action={
            rows.length > 1 ? (
              <Select value={selected} onChange={(e) => setSelected(e.target.value)} aria-label="Chọn học viên">
                {rows.map((r) => (
                  <option key={r.snapshot.id} value={r.snapshot.id}>
                    {r.snapshot.name}
                  </option>
                ))}
              </Select>
            ) : undefined
          }
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <Box label="Tầng hấp thu" value={tier.tier.name} hint={tier.tier.realNeed} />
          <Box
            label="Trụ cột yếu nhất"
            value={row.weakestPillarName}
            hint="Buổi huấn luyện nên bắt đầu từ đây, không từ điểm số."
          />
          <Box
            label="Chỉ số GITA"
            value={String(Math.round(row.gita))}
            hint={`Chuỗi ${row.streak} ngày · đúng trọng tâm ${formatPercent(row.focusRatio, 0)}`}
          />
        </div>

        <div className="mt-5 rounded-xl border border-warn/40 bg-warn-soft p-4">
          <h3 className="text-sm font-semibold text-warn">Cái bẫy của tầng này</h3>
          <p className="mt-1 text-sm leading-relaxed text-fg-muted">{tier.tier.trap}</p>
          <p className="mt-2 text-xs text-fg-subtle">
            Điều kiện lên tầng: {tier.tier.exitCriteria} — hiện đạt {formatPercent(tier.progress, 0)}.
          </p>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Bộ câu hỏi cho buổi huấn luyện"
          subtitle="Hỏi trước khi giảng. Một coach mở đầu bằng lời khuyên sẽ nhận được sự đồng ý lịch sự rồi không có gì thay đổi."
        />
        <ol className="space-y-4">
          {GITA_PILLARS.map((pillar, i) => (
            <li key={pillar.id} className="flex gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-soft text-sm font-bold text-brand">
                {pillar.letter}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-fg">{pillar.question}</p>
                <p className="mt-1 text-xs text-fg-muted">
                  {pillar.name} · nghe kỹ dấu hiệu hỏng: {pillar.failureMode}
                </p>
                {i === 0 && row.weakestPillarName === PILLAR_BY_ID.get(pillar.id)?.name && (
                  <Badge tone="warn">Bắt đầu từ đây</Badge>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Card>

      {canPlan && (
        <Card>
          <CardHeader
            title="Thói quen cần thiết kế lại"
            subtitle="Ba thói quen đang dưới 50% — đây là chỗ can thiệp cho hiệu quả cao nhất, vì thói quen hỏng làm hỏng mọi thứ đứng trên nó."
            action={<Badge tone={weakestHabits.length === 0 ? 'ok' : 'warn'}>{weakestHabits.length}</Badge>}
          />
          {weakestHabits.length === 0 ? (
            <p className="text-sm text-fg-muted">
              Chưa có thói quen nào dưới ngưỡng. Buổi này nên dùng để nâng mục tiêu chứ không để vá lỗ.
            </p>
          ) : (
            <ul className="space-y-3">
              {weakestHabits.map((status) => {
                const habit = status.habit;
                return (
                  <li key={status.habit.id} className="rounded-xl border border-line bg-surface-2 p-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-medium text-fg">{status.habit.name}</p>
                      <span className="text-xs text-fg-muted">
                        {formatPercent(status.rate28, 0)} · chuỗi {status.streak} ngày
                      </span>
                    </div>
                    {habit && <p className="mt-1 text-xs text-fg-muted">{habit.why}</p>}
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
}

function Box({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface-2 p-4">
      <p className="text-xs uppercase tracking-wide text-fg-subtle">{label}</p>
      <p className="mt-1 text-base font-semibold text-fg">{value}</p>
      <p className="mt-1 text-xs text-fg-muted">{hint}</p>
    </div>
  );
}
