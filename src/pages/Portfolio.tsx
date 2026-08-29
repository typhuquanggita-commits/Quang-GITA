import { useMemo, useRef, useState } from 'react';
import { useApp, go } from '@/state';
import { buildOptimizedPlan, progressOverview, resolveMistake } from '@/lib/engine';
import { missionById, stageById, MISSION_KIND_META } from '@/data/catalog';
import { strandById, schoolById } from '@/data/schools';
import { topicById } from '@/data/topics';
import { groupById } from '@/data/groups';
import { BRAND, BRAND_TRACK_STYLE } from '@/data/brand';
import { TIERS } from '@/data/gita';
import { emptyState } from '@/lib/storage';
import { ItemAnalysis } from '@/components/ItemAnalysis';
import {
  Card,
  SectionTitle,
  Badge,
  Stat,
  Progress,
  BarChart,
  RadarChart,
  Empty,
  Callout,
  MathText,
} from '@/components/ui';
import type { AppState } from '@/types';

type Tab = 'tong-quan' | 'lo-trinh' | 'loi-sai' | 'nhat-ky';

export default function Portfolio() {
  const { state, update } = useApp();
  const [tab, setTab] = useState<Tab>('tong-quan');
  const [mistakeFilter, setMistakeFilter] = useState<'all' | 'open' | 'resolved'>('open');
  const [topicFilter, setTopicFilter] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const profile = state.profile;
  const track = profile?.track ?? 'thpt';
  const plan = useMemo(() => buildOptimizedPlan(state, track), [state, track]);
  const ov = progressOverview(state, track);

  if (!profile) {
    return (
      <Empty
        title="Chưa có hồ sơ học viên"
        desc="Hồ sơ được mở sau khi bạn làm bài test xếp lộ trình. Từ đó, mọi phiếu đã làm, mọi câu sai và mọi phân tích đều được lưu lại tại đây."
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
  const mistakes = state.mistakes
    .filter((m) => (mistakeFilter === 'all' ? true : mistakeFilter === 'open' ? !m.resolved : m.resolved))
    .filter((m) => !topicFilter || m.topicId === topicFilter);
  const openCount = state.mistakes.filter((m) => !m.resolved).length;
  const mistakeTopics = [...new Set(state.mistakes.map((m) => m.topicId))];

  const exportProfile = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ho-so-math365-${profile.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importProfile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Partial<AppState>;
        update(() => ({ ...emptyState(), ...parsed }));
        window.alert('Đã nạp hồ sơ thành công.');
      } catch {
        window.alert('Tệp không hợp lệ. Hãy chọn đúng tệp hồ sơ đã xuất từ MATH365.');
      }
    };
    reader.readAsText(file);
  };

  const kpiSeries = state.attempts.slice(-12).map((a, i) => ({
    label: `#${state.attempts.length - Math.min(12, state.attempts.length) + i + 1}`,
    value: a.kpi,
    color: a.passed ? '#047857' : a.kpi >= 75 ? '#4f46e5' : '#be123c',
  }));

  const strandErr = new Map<string, number>();
  state.mistakes.forEach((m) => strandErr.set(m.strand, (strandErr.get(m.strand) ?? 0) + 1));
  const radar = [...new Set(plan.items.map((i) => i.strand))].map((sid) => {
    const errs = strandErr.get(sid) ?? 0;
    const base = profile.strandScores?.[sid] ?? 50;
    return {
      label: strandById(sid).short,
      value: Math.max(5, Math.min(100, base + Math.min(25, ov.avgKpi / 5) - Math.min(35, errs * 4))),
      color: strandById(sid).color,
    };
  });

  const TABS: { id: Tab; label: string; badge?: string }[] = [
    { id: 'tong-quan', label: 'Tổng quan hồ sơ' },
    { id: 'lo-trinh', label: 'Lộ trình tối ưu' },
    { id: 'loi-sai', label: 'Ngân hàng lỗi sai', badge: openCount ? String(openCount) : undefined },
    { id: 'nhat-ky', label: 'Nhật ký làm bài', badge: String(state.attempts.length) },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow={`${BRAND.product} · Hồ sơ học viên`}
        title={profile.name}
        desc={`${BRAND_TRACK_STYLE[track].label} · ${group.name} · mục tiêu ${school.shortName}. Toàn bộ đề đã làm, đáp án, lời giải và phân tích đều được lưu tại đây và dùng để tính lộ trình tối ưu.`}
        right={
          <div className="no-print flex flex-wrap gap-2">
            <button className="btn-ghost py-2 text-[12.5px]" onClick={() => window.print()}>
              In hồ sơ
            </button>
            <button className="btn-ghost py-2 text-[12.5px]" onClick={exportProfile}>
              Xuất tệp
            </button>
            <button className="btn-ghost py-2 text-[12.5px]" onClick={() => fileRef.current?.click()}>
              Nạp tệp
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && importProfile(e.target.files[0])}
            />
          </div>
        }
      />

      <div className="no-print flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`chip ${tab === t.id ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600'}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.badge && (
              <span
                className={`ml-1 rounded-full px-1.5 text-[10px] ${
                  tab === t.id ? 'bg-white/20' : 'bg-white'
                }`}
              >
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ---------------- TỔNG QUAN ---------------- */}
      {tab === 'tong-quan' && (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              label="KPI trung bình"
              value={`${ov.avgKpi}%`}
              tone={ov.avgKpi >= 90 ? '#047857' : '#4f46e5'}
              sub="10 lượt gần nhất"
            />
            <Stat label="Nhiệm vụ đạt chuẩn" value={ov.passedMissions} sub={`${ov.attempts} lượt đã làm`} />
            <Stat label="Lỗi chưa xử lý" value={openCount} tone="#be123c" sub={`${state.mistakes.length} lỗi đã ghi nhận`} />
            <Stat
              label="Level / Giai đoạn"
              value={`${ov.level} / ${ov.stage}`}
              tone="#b45309"
              sub={TIERS[Math.min(4, Math.max(0, ov.level - 1))].name}
            />
          </div>

          <Card className="p-5">
            <h2 className="text-[16px] font-extrabold text-slate-900">Thông tin hồ sơ</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['Lớp', profile.grade],
                ['Luồng', BRAND_TRACK_STYLE[track].label],
                ['Nhóm năng lực', group.name],
                ['Kỳ thi đích', school.shortName],
                ['Ngày thi', new Date(profile.examDate).toLocaleDateString('vi-VN')],
                ['Quỹ thời gian', `${profile.hoursPerWeek} giờ/tuần`],
                ['Điểm khảo sát đầu vào', profile.placementScore ? `${profile.placementScore}%` : '—'],
                ['Mở hồ sơ', new Date(profile.createdAt).toLocaleDateString('vi-VN')],
              ].map(([l, v]) => (
                <div key={l} className="rounded-xl bg-slate-50 p-3">
                  <div className="text-[10.5px] font-bold uppercase tracking-wide text-slate-400">{l}</div>
                  <div className="mt-0.5 text-[13px] font-bold leading-snug text-slate-800">{v}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
              <b className="text-slate-800">Mục tiêu của nhóm:</b> {group.target}
            </p>
          </Card>

          <div className="grid gap-4 lg:grid-cols-5">
            <Card className="p-5 lg:col-span-2">
              <h3 className="text-[15px] font-extrabold text-slate-900">Bản đồ năng lực</h3>
              <p className="mt-1 text-[12px] text-slate-500">
                Điểm khảo sát đầu vào, điều chỉnh theo KPI và số lỗi thực tế của từng mạch.
              </p>
              <div className="mt-2 flex justify-center">
                <RadarChart data={radar} size={260} />
              </div>
            </Card>
            <Card className="p-5 lg:col-span-3">
              <h3 className="text-[15px] font-extrabold text-slate-900">Diễn biến KPI</h3>
              {kpiSeries.length ? (
                <div className="mt-3">
                  <BarChart data={kpiSeries} height={190} />
                </div>
              ) : (
                <p className="mt-6 text-center text-[13px] text-slate-400">
                  Chưa có lượt làm nào. Hãy hoàn thành nhiệm vụ đầu tiên để hồ sơ bắt đầu có dữ liệu.
                </p>
              )}
            </Card>
          </div>

          <Callout tone="brand" title="Hồ sơ này được dùng để làm gì">
            Mỗi câu bạn làm sai được lưu kèm đề, đáp án, lời giải và phân tích dạng bài. Hệ thống dùng
            chính dữ liệu đó — cùng với tần suất ra đề của từng chuyên đề — để xếp lại thứ tự ưu tiên
            trong tab <b>Lộ trình tối ưu</b>. Càng làm nhiều, lộ trình càng bám sát bạn.
          </Callout>
        </div>
      )}

      {/* ---------------- LỘ TRÌNH TỐI ƯU ---------------- */}
      {tab === 'lo-trinh' && (
        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="text-[16px] font-extrabold text-slate-900">Lộ trình tối ưu hiện tại</h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
              Xếp hạng theo công thức: <b>tần suất ra đề × mật độ lỗi × độ mới của lỗi × độ phù hợp mức
              độ</b>. Tính trên {plan.basedOn.attempts} lượt làm và {plan.basedOn.mistakes} lỗi đã ghi
              nhận{plan.basedOn.days ? ` trong ${plan.basedOn.days} ngày` : ''}.
            </p>

            {plan.weeklyFocus.length > 0 && (
              <div className="mt-4 rounded-2xl bg-brand-50 p-4">
                <div className="text-[11.5px] font-bold uppercase tracking-wide text-brand-700">
                  Trọng tâm tuần này — làm ba việc này trước
                </div>
                <ol className="mt-2 space-y-1">
                  {plan.weeklyFocus.map((f, i) => (
                    <li key={f} className="text-[13.5px] font-semibold text-brand-900">
                      {i + 1}. {f}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge tone="amber">
                Nhóm 20/80: {plan.paretoCoverage} chuyên đề chiếm ~80% tần suất ra đề
              </Badge>
              <Badge>Cập nhật {new Date(plan.generatedAt).toLocaleString('vi-VN')}</Badge>
            </div>
          </Card>

          {plan.cautions.map((c) => (
            <Callout key={c} tone="amber" title="Cảnh báo từ dữ liệu hồ sơ">
              {c}
            </Callout>
          ))}

          <div className="space-y-2.5">
            {plan.items.slice(0, 14).map((it, idx) => {
              const s = strandById(it.strand);
              return (
                <Card key={it.topicId} className="p-4">
                  <div className="flex flex-wrap items-start gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-white"
                      style={{ background: idx < 3 ? '#4338ca' : '#94a3b8' }}
                    >
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h3 className="text-[14.5px] font-extrabold text-slate-900">{it.topicName}</h3>
                        <Badge style={{ background: `${s.color}14`, color: s.color }}>{s.short}</Badge>
                        {it.inPareto && <Badge tone="amber">20/80</Badge>}
                        {it.errors > 0 && <Badge tone="rose">{it.errors} lỗi</Badge>}
                        <Badge>Ưu tiên {it.priority}</Badge>
                      </div>

                      {it.reasons.length > 0 && (
                        <ul className="mt-2 space-y-0.5">
                          {it.reasons.map((r) => (
                            <li key={r} className="text-[12.5px] leading-relaxed text-slate-600">
                              ▸ {r}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11.5px] font-semibold text-slate-400">
                          Ước tính {it.estimatedMinutes} phút ·
                        </span>
                        {it.missionIds.length ? (
                          it.missionIds.map((mid) => (
                            <button
                              key={mid}
                              className="chip bg-brand-50 text-brand-800 hover:bg-brand-100"
                              onClick={() => go(`/mission/${mid}`)}
                            >
                              Làm {mid}
                            </button>
                          ))
                        ) : it.emptyReason === 'da-dat-chuan' ? (
                          <span className="text-[12px] text-emerald-700">
                            Đã đạt chuẩn ở mọi nhiệm vụ trong tầm — có thể nâng mức độ.
                          </span>
                        ) : it.emptyReason === 'chua-mo-muc-do' ? (
                          <span className="text-[12px] text-amber-700">
                            Nhiệm vụ của chuyên đề này ở mức cao hơn — cần nâng Level để mở.
                          </span>
                        ) : (
                          <span className="text-[12px] text-slate-500">
                            Chuyên đề học lý thuyết, chưa có phiếu luyện riêng.
                          </span>
                        )}
                        <button
                          className="chip bg-slate-100 text-slate-600 hover:bg-slate-200"
                          onClick={() => go(`/topics/${it.topicId}`)}
                        >
                          Học lại chuyên đề
                        </button>
                      </div>
                    </div>
                    <div className="w-24 shrink-0">
                      <Progress value={it.frequency} height={5} tone={s.color} />
                      <div className="mt-1 text-[10.5px] text-slate-400">Tần suất {it.frequency}%</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------- NGÂN HÀNG LỖI SAI ---------------- */}
      {tab === 'loi-sai' && (
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex gap-1.5">
                {(['open', 'resolved', 'all'] as const).map((f) => (
                  <button
                    key={f}
                    className={`chip ${
                      mistakeFilter === f ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                    onClick={() => setMistakeFilter(f)}
                  >
                    {f === 'open' ? 'Chưa xử lý' : f === 'resolved' ? 'Đã xử lý' : 'Tất cả'}
                  </button>
                ))}
              </div>
              <label>
                <span className="text-[11.5px] font-bold text-slate-600">Chuyên đề</span>
                <select
                  className="mt-1 block rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px]"
                  value={topicFilter}
                  onChange={(e) => setTopicFilter(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  {mistakeTopics.map((t) => (
                    <option key={t} value={t}>
                      {topicById(t)?.name ?? t}
                    </option>
                  ))}
                </select>
              </label>
              <span className="pb-2 text-[12.5px] text-slate-500">
                Hiển thị {mistakes.length} lỗi
              </span>
            </div>
          </Card>

          {state.mistakes.length === 0 ? (
            <Empty
              title="Chưa có lỗi nào được ghi nhận"
              desc="Mỗi câu bạn làm sai sẽ được lưu vào đây kèm đề, đáp án, lời giải và phân tích dạng bài — để bạn xem lại bất cứ lúc nào."
              action={
                <button className="btn-primary" onClick={() => go('/missions')}>
                  Vào luyện tập
                </button>
              }
            />
          ) : (
            <div className="space-y-3">
              {mistakes.map((m) => {
                const s = strandById(m.strand);
                const mission = missionById(m.missionId);
                return (
                  <Card key={m.id} className="p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-1.5">
                      <Badge style={{ background: `${s.color}14`, color: s.color }}>{s.short}</Badge>
                      <Badge>{topicById(m.topicId)?.name ?? m.topicId}</Badge>
                      <Badge>{m.skill}</Badge>
                      <Badge>{m.missionId}</Badge>
                      {m.resolved ? (
                        <Badge tone="green">Đã xử lý</Badge>
                      ) : (
                        <Badge tone="rose">Chưa xử lý</Badge>
                      )}
                      <span className="text-[11.5px] text-slate-400">
                        {new Date(m.at).toLocaleString('vi-VN')}
                      </span>
                    </div>

                    <p className="prose-math font-medium text-slate-800">
                      <MathText>{m.prompt}</MathText>
                    </p>

                    <div className="mt-3">
                      <ItemAnalysis
                        item={{
                          generatorId: m.generatorId,
                          topicId: m.topicId,
                          skill: m.skill,
                          steps: m.steps,
                          choices: m.choices,
                          correct: m.correct,
                          chosen: m.chosen,
                        }}
                        track={track}
                      />
                    </div>

                    <div className="no-print mt-3 flex flex-wrap gap-2">
                      {!m.resolved && (
                        <button
                          className="btn-primary py-1.5 text-[12.5px]"
                          onClick={() => update((st) => resolveMistake(st, m.id))}
                        >
                          Đánh dấu đã xử lý
                        </button>
                      )}
                      {mission && (
                        <button
                          className="btn-ghost py-1.5 text-[12.5px]"
                          onClick={() => go(`/mission/${mission.id}`)}
                        >
                          Làm lại dạng này
                        </button>
                      )}
                      <button
                        className="btn-ghost py-1.5 text-[12.5px]"
                        onClick={() => go(`/solution/${m.worksheetId}`)}
                      >
                        Mở bộ giải đề của phiếu
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ---------------- NHẬT KÝ ---------------- */}
      {tab === 'nhat-ky' && (
        <Card className="p-5">
          <h2 className="text-[16px] font-extrabold text-slate-900">
            Toàn bộ lượt làm ({state.attempts.length})
          </h2>
          <p className="mt-1 text-[12.5px] text-slate-500">
            Mỗi dòng mở được đúng bản đề đã làm kèm đáp án và phân tích.
          </p>
          {state.attempts.length === 0 ? (
            <p className="mt-4 text-[13px] text-slate-400">Chưa có lượt làm nào.</p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-400">
                    <th className="py-2 pr-2">Thời điểm</th>
                    <th className="py-2 pr-2">Nhiệm vụ</th>
                    <th className="py-2 pr-2">Loại</th>
                    <th className="py-2 pr-2">Giai đoạn</th>
                    <th className="py-2 pr-2 text-center">Level</th>
                    <th className="py-2 pr-2 text-right">Đúng</th>
                    <th className="py-2 pr-2 text-right">KPI</th>
                    <th className="py-2 pr-2 text-right">Phút</th>
                    <th className="py-2 text-right">Bộ giải đề</th>
                  </tr>
                </thead>
                <tbody>
                  {[...state.attempts].reverse().map((a) => {
                    const m = missionById(a.missionId);
                    return (
                      <tr key={a.id} className="border-b border-slate-100 last:border-0">
                        <td className="py-2 pr-2 text-slate-500">
                          {new Date(a.at).toLocaleString('vi-VN')}
                        </td>
                        <td className="py-2 pr-2 font-semibold text-slate-800">{a.missionId}</td>
                        <td className="py-2 pr-2">
                          {m && (
                            <span style={{ color: MISSION_KIND_META[m.kind].color }}>
                              {MISSION_KIND_META[m.kind].label}
                            </span>
                          )}
                        </td>
                        <td className="py-2 pr-2 text-slate-600">{stageById(a.stageId).name}</td>
                        <td className="py-2 pr-2 text-center tabular-nums">{a.level}</td>
                        <td className="py-2 pr-2 text-right tabular-nums">
                          {a.correct}/{a.total}
                        </td>
                        <td
                          className="py-2 pr-2 text-right font-bold tabular-nums"
                          style={{ color: a.passed ? '#047857' : '#be123c' }}
                        >
                          {a.kpi}%
                        </td>
                        <td className="py-2 pr-2 text-right tabular-nums text-slate-500">
                          {Math.round(a.seconds / 60)}
                        </td>
                        <td className="py-2 text-right">
                          <button
                            className="rounded-lg border border-slate-200 px-2 py-1 text-[11.5px] font-semibold text-brand-700 hover:bg-brand-50"
                            onClick={() => go(`/solution/${a.worksheetId}/${a.variant}`)}
                          >
                            Xem
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
