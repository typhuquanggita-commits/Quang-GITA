import { useMemo } from 'react';
import { SECTION_BY_ID } from '../../config';
import { KINDS } from '../../data/curriculum';
import { PILLAR_BY_ID } from '../../data/gita';
import {
  SEASON_WEEKS,
  SYLLABUS,
  SYLLABUS_PHASES,
  currentWeek,
  weeksOfStage,
  type SyllabusWeek,
} from '../../data/syllabus';
import { cn } from '../../lib/cn';
import { buildDailyPlan } from '../../lib/plan';
import { useAppState } from '../../store/AppStore';
import { DocumentShell } from '../../components/DocumentShell';
import { Badge, Button, Card, CardHeader } from '../../components/ui/primitives';

/**
 * DE CUONG TRON MUA
 *
 * Lo trinh theo ngay tra loi "hom nay lam gi". Man hinh nay tra loi cau khac
 * han: ca chang duong trong nhu the nao. Thieu cau thu hai thi nguoi hoc song
 * trong mot chuoi viec vat khong co hinh dang — trang thai khien nguoi ta bo
 * cuoc du van dang tien bo.
 *
 * Va day cung la thu GIA DINH doc duoc. Mot phu huynh khong doc noi bang nang
 * luc Rasch nhung doc duoc mot bang 32 tuan, va do la thu ho can de tin rang
 * co mot ke hoach that.
 */
export function SyllabusPage() {
  const state = useAppState();
  const plan = useMemo(() => buildDailyPlan({ state, dueCardCount: 0 }), [state]);
  const week = currentWeek(plan.daysLeft);

  return (
    <div className="space-y-6">
      <Card className="no-print">
        <CardHeader
          title="Đề cương trọn mùa thi"
          subtitle={
            week === null
              ? 'Chưa đặt ngày thi. Đặt ngày thi trong Cài đặt để hệ thống chỉ ra bạn đang ở tuần thứ mấy.'
              : `Bạn đang ở tuần ${week}/${SEASON_WEEKS} · còn ${plan.daysLeft} ngày đến ngày thi.`
          }
          action={<Button onClick={() => window.print()}>In đề cương</Button>}
        />
        <p className="text-sm text-fg-muted">
          Lộ trình hằng ngày trả lời "hôm nay làm gì". Đề cương trả lời câu khác hẳn:{' '}
          <strong className="text-fg">cả chặng đường trông như thế nào</strong>. Thiếu câu thứ hai,
          người học sống trong một chuỗi việc vặt không có hình dáng — trạng thái khiến người ta bỏ
          cuộc dù vẫn đang tiến bộ.
        </p>
      </Card>

      <DocumentShell
        kind="HD"
        code="DC-HSA365-32T"
        title="Đề cương 32 tuần"
        subtitle="Ba giai đoạn · 7 cột mốc · từ ngày bắt đầu tới ngày thi"
        meta={
          week === null ? (
            <>Chưa đặt ngày thi</>
          ) : (
            <>
              Tuần {week}/{SEASON_WEEKS}
              <br />
              Còn {plan.daysLeft} ngày
            </>
          )
        }
      >
        {SYLLABUS_PHASES.map((phase, i) => (
          <section key={phase.stage} className={cn('space-y-4', i > 0 && 'doc-break')}>
            <header className="doc-block border-l-4 border-l-brand pl-4">
              <h2 className="text-base font-semibold text-fg">
                Giai đoạn {phase.stage} — {phase.name}
              </h2>
              <p className="text-xs text-fg-subtle">
                Tuần {phase.weeks[0]}–{phase.weeks[1]} · {weeksOfStage(phase.stage).length} tuần
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{phase.purpose}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <p className="rounded-lg border border-bad/40 bg-bad-soft p-3 text-xs leading-relaxed text-fg-muted">
                  <strong className="text-bad">Cái bẫy của giai đoạn:</strong> {phase.trap}
                </p>
                <p className="rounded-lg border border-ok/40 bg-ok-soft p-3 text-xs leading-relaxed text-fg-muted">
                  <strong className="text-ok">Dấu hiệu sẵn sàng đi tiếp:</strong> {phase.exit}
                </p>
              </div>
            </header>

            <ol className="space-y-2">
              {weeksOfStage(phase.stage).map((entry) => (
                <WeekRow key={entry.week} entry={entry} current={entry.week === week} />
              ))}
            </ol>
          </section>
        ))}

        <section className="doc-block">
          <h2 className="text-base font-semibold text-fg">Bảy cột mốc của mùa</h2>
          <ol className="mt-2 space-y-1.5">
            {SYLLABUS.filter((w) => w.milestone).map((w) => (
              <li key={w.week} className="flex gap-3 text-sm">
                <span className="shrink-0 tabular-nums text-fg-subtle">Tuần {w.week}</span>
                <span className="text-fg-muted">{w.milestone}</span>
              </li>
            ))}
          </ol>
        </section>
      </DocumentShell>
    </div>
  );
}

function WeekRow({ entry, current }: { entry: SyllabusWeek; current: boolean }) {
  const pillar = PILLAR_BY_ID.get(entry.pillar);

  return (
    <li
      className={cn(
        'doc-block rounded-xl border p-3',
        current ? 'border-brand bg-brand-soft' : 'border-line bg-surface-2',
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-medium text-fg">
          <span className="tabular-nums text-fg-subtle">Tuần {entry.week}</span> · {entry.title}
        </h3>
        <div className="flex flex-wrap items-center gap-1.5">
          {current && <Badge tone="brand">Bạn đang ở đây</Badge>}
          {pillar && <Badge>{pillar.letter} — {pillar.name}</Badge>}
        </div>
      </div>

      <p className="mt-1.5 text-sm text-fg-muted">{entry.goal}</p>

      <p className="mt-2 text-xs text-fg-subtle">
        Phần thi: {entry.focus.map((f) => SECTION_BY_ID[f].shortName).join(' · ')} — Phiếu:{' '}
        {entry.kinds.map((k) => KINDS.find((x) => x.kind === k)?.name ?? k).join(' · ')}
      </p>

      <p className="mt-2 rounded-lg bg-surface p-2 text-xs text-fg-muted">
        <strong className="text-fg">Tự kiểm cuối tuần:</strong> {entry.checkpoint}
      </p>

      {entry.milestone && (
        <p className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <Badge tone="ok">Cột mốc</Badge>
          <span className="text-fg-muted">{entry.milestone}</span>
        </p>
      )}
    </li>
  );
}
