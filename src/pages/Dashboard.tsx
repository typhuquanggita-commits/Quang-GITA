import { useApp, go } from '@/state';
import { progressOverview, stageStats } from '@/lib/engine';
import { stagesByTrack, missionById, MISSION_KIND_META } from '@/data/catalog';
import { STRANDS, strandById } from '@/data/schools';
import { TOPICS } from '@/data/topics';
import { groupById } from '@/data/groups';
import { BRAND_TRACK_STYLE } from '@/data/brand';
import { TIERS } from '@/data/gita';
import { Card, SectionTitle, Stat, Badge, Progress, RadarChart, BarChart, Empty } from '@/components/ui';
import type { StrandId } from '@/types';

export default function Dashboard() {
  const { state } = useApp();
  const profile = state.profile;

  if (!profile) {
    return (
      <Empty
        title="Chưa có hồ sơ học tập"
        desc="Hãy làm bài test xếp lộ trình để hệ thống dựng bảng tiến độ và lộ trình cá nhân hoá cho bạn."
        action={
          <button className="btn-primary" onClick={() => go('/onboarding')}>
            Làm bài xếp lộ trình
          </button>
        }
      />
    );
  }

  const track = profile.track;
  const ov = progressOverview(state, track);
  const stages = stagesByTrack(track);
  const recent = [...state.attempts].reverse().slice(0, 12);
  const trackStrands = [...new Set(TOPICS.filter((t) => t.tracks.includes(track)).map((t) => t.strand))];

  // Bản đồ năng lực: bắt đầu từ điểm khảo sát, điều chỉnh theo tỉ lệ đúng thực tế
  const strandScore = (sid: StrandId): number => {
    const rel = state.attempts.filter((a) =>
      a.wrongTopics.some((t) => TOPICS.find((x) => x.id === t)?.strand === sid),
    );
    const base = profile.strandScores?.[sid] ?? 50;
    if (!state.attempts.length) return base;
    const penalty = Math.min(35, rel.length * 4);
    const bonus = Math.min(25, Math.round(ov.avgKpi / 5));
    return Math.max(5, Math.min(100, base + bonus - penalty));
  };

  const radar = trackStrands.map((sid) => ({
    label: strandById(sid).short,
    value: strandScore(sid),
    color: strandById(sid).color,
  }));

  const kpiSeries = state.attempts.slice(-10).map((a, i) => ({
    label: `#${state.attempts.length - Math.min(10, state.attempts.length) + i + 1}`,
    value: a.kpi,
    color: a.passed ? '#047857' : a.kpi >= 75 ? '#4f46e5' : '#be123c',
  }));

  const skillErrors = new Map<string, number>();
  state.attempts.forEach((a) => a.wrongSkills.forEach((s) => skillErrors.set(s, (skillErrors.get(s) ?? 0) + 1)));
  const topErrors = [...skillErrors.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);

  const streak = (() => {
    const days = Object.keys(state.studyLog).sort().reverse();
    let n = 0;
    const cur = new Date();
    for (const d of days) {
      const key = cur.toISOString().slice(0, 10);
      if (d === key) {
        n += 1;
        cur.setDate(cur.getDate() - 1);
      } else break;
    }
    return n;
  })();

  const tierNow = TIERS[Math.min(4, Math.max(0, ov.level - 1))];

  return (
    <div className="space-y-7">
      <SectionTitle
        eyebrow={BRAND_TRACK_STYLE[track].label}
        title={`Bảng tiến độ của ${profile.name}`}
        desc={`${groupById(profile.groupId).name} · mục tiêu: ${groupById(profile.groupId).target}`}
        right={
          <button className="btn-ghost" onClick={() => go('/missions')}>
            Vào luyện tập →
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="KPI trung bình (10 lượt gần nhất)" value={`${ov.avgKpi}%`} tone={ov.avgKpi >= 90 ? '#047857' : '#4f46e5'} sub={`Chuẩn thăng cấp: 90%`} />
        <Stat label="Nhiệm vụ đạt chuẩn" value={ov.passedMissions} sub={`trong ${ov.attempts} lượt làm`} />
        <Stat label="Level hiện tại" value={`${ov.level}/5`} tone="#b45309" sub={tierNow.name} />
        <Stat label="Chuỗi ngày luyện" value={streak} tone="#be123c" sub={`Tổng ${ov.minutes} phút đã luyện`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="p-5 lg:col-span-2">
          <h3 className="text-[15px] font-extrabold text-slate-900">Bản đồ năng lực theo mạch</h3>
          <p className="mt-1 text-[12px] text-slate-500">
            Kết hợp điểm khảo sát đầu vào với kết quả luyện tập thực tế.
          </p>
          <div className="mt-2 flex justify-center">
            <RadarChart data={radar} size={260} />
          </div>
        </Card>

        <Card className="p-5 lg:col-span-3">
          <h3 className="text-[15px] font-extrabold text-slate-900">Diễn biến KPI</h3>
          <p className="mt-1 text-[12px] text-slate-500">
            Đường xanh lá là các lượt đạt chuẩn. Nhìn xu hướng, đừng bị dao động bởi một lượt đơn lẻ.
          </p>
          {kpiSeries.length ? (
            <div className="mt-3">
              <BarChart data={kpiSeries} height={180} />
            </div>
          ) : (
            <p className="mt-6 text-center text-[13px] text-slate-400">
              Chưa có dữ liệu — hãy hoàn thành nhiệm vụ đầu tiên.
            </p>
          )}
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="text-[15px] font-extrabold text-slate-900">Tiến độ theo giai đoạn</h3>
          <div className="mt-4 space-y-4">
            {stages.map((s) => {
              const st = stageStats(state, s.id);
              const unlocked = s.order <= ov.stage;
              return (
                <div key={s.id}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[13px] font-bold text-slate-800">
                      {unlocked ? '' : '🔒 '}
                      {s.name}
                    </span>
                    <span className="text-[11.5px] tabular-nums text-slate-500">
                      {st.passedMissions}/15 nhiệm vụ chuẩn
                    </span>
                  </div>
                  <Progress
                    value={(st.passedMissions / 15) * 100}
                    tone={unlocked ? '#4f46e5' : '#cbd5e1'}
                    height={6}
                  />
                  <div className="mt-1 text-[11.5px] text-slate-500">{s.goal}</div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-[15px] font-extrabold text-slate-900">Kỹ năng sai nhiều nhất</h3>
          <p className="mt-1 text-[12px] text-slate-500">
            Đây chính là danh sách việc cần làm — xử lý từ trên xuống.
          </p>
          {topErrors.length ? (
            <ul className="mt-4 space-y-2.5">
              {topErrors.map(([skill, n]) => (
                <li key={skill} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-[12px] font-extrabold text-rose-600">
                    {n}
                  </span>
                  <span className="text-[13px] text-slate-700">{skill}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-center text-[13px] text-slate-400">
              Chưa ghi nhận lỗi nào. Hãy luyện thêm để hệ thống chẩn đoán chính xác hơn.
            </p>
          )}
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="text-[15px] font-extrabold text-slate-900">Lượt làm gần đây</h3>
        {recent.length === 0 ? (
          <p className="mt-4 text-[13px] text-slate-400">Chưa có lượt làm nào.</p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-400">
                  <th className="py-2">Nhiệm vụ</th>
                  <th className="py-2">Loại</th>
                  <th className="py-2 text-right">Đúng</th>
                  <th className="py-2 text-right">KPI</th>
                  <th className="py-2 text-right">Thời gian</th>
                  <th className="py-2 text-right">Kết quả</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((a) => {
                  const m = missionById(a.missionId);
                  return (
                    <tr key={a.id} className="border-b border-slate-100 last:border-0">
                      <td className="py-2.5">
                        <button
                          className="font-semibold text-brand-700 hover:underline"
                          onClick={() => go(`/mission/${a.missionId}`)}
                        >
                          {a.missionId}
                        </button>
                        <div className="text-[11.5px] text-slate-500">{m?.title.slice(0, 46)}…</div>
                      </td>
                      <td className="py-2.5">
                        {m && (
                          <Badge
                            style={{
                              background: `${MISSION_KIND_META[m.kind].color}14`,
                              color: MISSION_KIND_META[m.kind].color,
                            }}
                          >
                            {MISSION_KIND_META[m.kind].label}
                          </Badge>
                        )}
                      </td>
                      <td className="py-2.5 text-right tabular-nums">
                        {a.correct}/{a.total}
                      </td>
                      <td className="py-2.5 text-right font-bold tabular-nums">{a.kpi}%</td>
                      <td className="py-2.5 text-right tabular-nums text-slate-500">
                        {Math.floor(a.seconds / 60)}p
                      </td>
                      <td className="py-2.5 text-right">
                        {a.passed ? (
                          <Badge tone="green">Đạt</Badge>
                        ) : (
                          <Badge tone="rose">Chưa đạt</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card className="p-5">
        <h3 className="text-[15px] font-extrabold text-slate-900">Chú giải mạch kiến thức</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STRANDS.filter((s) => trackStrands.includes(s.id)).map((s) => (
            <div key={s.id} className="rounded-xl border border-slate-200 p-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-[13px] font-bold text-slate-800">{s.name}</span>
              </div>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-600">{s.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
