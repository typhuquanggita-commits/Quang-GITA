import { useMemo, useState } from 'react';
import { useApp, go } from '@/state';
import { buildRoadmap, weeksUntil } from '@/lib/roadmap';
import { GROUPS, groupById } from '@/data/groups';
import { BRAND_TRACK_STYLE } from '@/data/brand';
import { schoolById } from '@/data/schools';
import { Faq } from '@/components/Faq';
import { faqFor } from '@/data/faq';
import { Card, SectionTitle, Badge, Progress, Empty, Callout } from '@/components/ui';
import type { GroupId } from '@/types';

const KIND_LABEL: Record<string, { label: string; color: string }> = {
  'ly-thuyet': { label: 'Lý thuyết', color: '#4338ca' },
  'luyen-tap': { label: 'Luyện tập', color: '#0f766e' },
  'de-thi': { label: 'Đề thi', color: '#be123c' },
  'ra-soat': { label: 'Rà soát', color: '#b45309' },
  'ky-nang': { label: 'Kỹ năng', color: '#7c3aed' },
};

export default function Roadmap() {
  const { state, update } = useApp();
  const profile = state.profile;
  const [openPhase, setOpenPhase] = useState<string | null>(null);

  const roadmap = useMemo(() => (profile ? buildRoadmap(profile) : null), [profile]);

  if (!profile || !roadmap) {
    return (
      <Empty
        title="Chưa có lộ trình"
        desc="Lộ trình được sinh ra từ bốn dữ kiện: luồng, nhóm năng lực, ngày thi và quỹ thời gian mỗi tuần."
        action={
          <button className="btn-primary" onClick={() => go('/onboarding')}>
            Làm bài xếp lộ trình
          </button>
        }
      />
    );
  }

  const group = groupById(profile.groupId);
  const school = schoolById(profile.targetSchool);
  const weeksLeft = weeksUntil(profile.examDate);
  const doneTasks = Object.values(state.doneTasks).filter(Boolean).length;
  const totalTasks = roadmap.phases.reduce((s, p) => s + p.weeks.length * 4, 0);

  const toggle = (id: string) =>
    update((s) => ({ ...s, doneTasks: { ...s.doneTasks, [id]: !s.doneTasks[id] } }));

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow={BRAND_TRACK_STYLE[profile.track].label}
        title="Lộ trình cá nhân hoá"
        desc={`${weeksLeft} tuần tới ngày thi · ${profile.hoursPerWeek} giờ mỗi tuần · tổng quỹ khoảng ${weeksLeft * profile.hoursPerWeek} giờ.`}
      />

      <Card className="p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Nhóm năng lực', group.name],
            ['Mục tiêu', group.target],
            ['Kỳ thi đích', school.shortName],
            ['Ngày thi', new Date(profile.examDate).toLocaleDateString('vi-VN')],
          ].map(([l, v]) => (
            <div key={l}>
              <div className="text-[10.5px] font-bold uppercase tracking-wide text-slate-400">{l}</div>
              <div className="mt-0.5 text-[13.5px] font-bold leading-snug text-slate-800">{v}</div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <Progress
            value={(doneTasks / Math.max(1, totalTasks)) * 100}
            label={`Đã hoàn thành ${doneTasks}/${totalTasks} đầu việc trong lộ trình`}
          />
        </div>

        <div className="mt-5 flex flex-wrap items-end gap-3 border-t border-slate-100 pt-5">
          <label>
            <span className="text-[11.5px] font-bold text-slate-600">Đổi nhóm năng lực</span>
            <select
              className="mt-1 block rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px]"
              value={profile.groupId}
              onChange={(e) =>
                update((s) => ({
                  ...s,
                  profile: s.profile ? { ...s.profile, groupId: e.target.value as GroupId } : null,
                }))
              }
            >
              {GROUPS.filter((g) => g.track === profile.track).map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="text-[11.5px] font-bold text-slate-600">Giờ/tuần</span>
            <input
              type="number"
              min={4}
              max={30}
              className="mt-1 block w-24 rounded-lg border border-slate-200 px-3 py-2 text-[13px]"
              value={profile.hoursPerWeek}
              onChange={(e) =>
                update((s) => ({
                  ...s,
                  profile: s.profile
                    ? { ...s.profile, hoursPerWeek: Math.max(4, Number(e.target.value) || 4) }
                    : null,
                }))
              }
            />
          </label>
          <label>
            <span className="text-[11.5px] font-bold text-slate-600">Ngày thi</span>
            <input
              type="date"
              className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-[13px]"
              value={profile.examDate}
              onChange={(e) =>
                update((s) => ({
                  ...s,
                  profile: s.profile ? { ...s.profile, examDate: e.target.value } : null,
                }))
              }
            />
          </label>
          <span className="pb-2 text-[11.5px] text-slate-500">
            Lộ trình được tính lại ngay khi bạn thay đổi các tham số này.
          </span>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="text-[15px] font-extrabold text-slate-900">Ưu tiên của nhóm {group.name}</h3>
          <ul className="mt-3 space-y-2">
            {group.priorities.map((p) => (
              <li key={p} className="flex gap-2 text-[13px] leading-relaxed text-slate-700">
                <span className="mt-0.5 text-brand-600">▸</span>
                {p}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-5">
          <h3 className="text-[15px] font-extrabold text-slate-900">Cạm bẫy cần tránh</h3>
          <ul className="mt-3 space-y-2">
            {group.redFlags.map((p) => (
              <li key={p} className="flex gap-2 text-[13px] leading-relaxed text-slate-700">
                <span className="mt-0.5 text-rose-500">✕</span>
                {p}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {weeksLeft < 8 && (
        <Callout tone="amber" title="Quỹ thời gian đang rất ngắn">
          Còn {weeksLeft} tuần. Hãy ưu tiên tuyệt đối các chuyên đề tần suất cao và bỏ qua phần trang
          trí. Với quỹ thời gian này, mục tiêu thực tế là giữ chắc phần điểm nền, không phải mở rộng
          thêm dạng mới.
        </Callout>
      )}

      <div className="space-y-3">
        {roadmap.phases.map((phase) => {
          const open = openPhase === phase.id;
          const phaseTaskIds = phase.weeks.flatMap((w) => w.tasks.map((t) => `${phase.id}-${t.id}`));
          const done = phaseTaskIds.filter((id) => state.doneTasks[id]).length;
          return (
            <Card key={phase.id} className="overflow-hidden">
              <button
                className="flex w-full items-center gap-4 p-5 text-left"
                onClick={() => setOpenPhase(open ? null : phase.id)}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[15.5px] font-extrabold text-slate-900">{phase.name}</h3>
                    <Badge tone="brand">{phase.weeks.length} tuần</Badge>
                    <Badge>{phase.shareOfTime}% quỹ thời gian</Badge>
                  </div>
                  <p className="mt-1 text-[13px] text-slate-600">{phase.goal}</p>
                  <div className="mt-2 max-w-md">
                    <Progress value={(done / Math.max(1, phaseTaskIds.length)) * 100} height={5} />
                  </div>
                </div>
                <span className="text-slate-400">{open ? '▲' : '▼'}</span>
              </button>

              {open && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-5">
                  <div className="mb-4 rounded-xl border border-slate-200 bg-white p-3">
                    <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                      Điều kiện kết thúc giai đoạn
                    </div>
                    <ul className="mt-1.5 space-y-1">
                      {phase.exitCriteria.map((c) => (
                        <li key={c} className="text-[12.5px] text-slate-700">
                          • {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    {phase.weeks.map((w) => (
                      <div key={w.index} className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-[13.5px] font-extrabold text-slate-900">
                            Tuần {w.index}
                          </h4>
                          {w.milestone && <Badge tone="green">🏁 {w.milestone}</Badge>}
                        </div>
                        <p className="mt-0.5 text-[12px] text-slate-500">{w.focus}</p>
                        <ul className="mt-3 space-y-2">
                          {w.tasks.map((t) => {
                            const id = `${phase.id}-${t.id}`;
                            const checked = !!state.doneTasks[id];
                            const kind = KIND_LABEL[t.kind];
                            return (
                              <li key={id} className="flex gap-3">
                                <input
                                  type="checkbox"
                                  className="mt-1 h-4 w-4 shrink-0 accent-brand-600"
                                  checked={checked}
                                  onChange={() => toggle(id)}
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <Badge style={{ background: `${kind.color}14`, color: kind.color }}>
                                      {kind.label}
                                    </Badge>
                                    <span
                                      className={`text-[13px] font-semibold ${
                                        checked ? 'text-slate-400 line-through' : 'text-slate-800'
                                      }`}
                                    >
                                      {t.title}
                                    </span>
                                    <span className="text-[11.5px] text-slate-400">
                                      ~{t.minutes} phút
                                    </span>
                                  </div>
                                  <p className="mt-0.5 text-[12px] leading-relaxed text-slate-600">
                                    {t.detail}
                                  </p>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      <Faq items={faqFor('lo-trinh')} />
    </div>
  );
}
