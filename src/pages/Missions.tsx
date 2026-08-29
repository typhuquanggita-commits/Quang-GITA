import { useMemo, useState } from 'react';
import { useApp, go } from '@/state';
import {
  MISSION_KIND_META,
  missionsFiltered,
  missionByWorksheet,
  packedTopics,
  sheetsOfTopic,
  stagesByTrack,
  worksheetById,
  type MissionKind,
} from '@/data/catalog';
import { SHEET_TYPES, sheetSpec } from '@/data/sheets';
import { BRAND_TRACK_STYLE } from '@/data/brand';
import { strandById } from '@/data/schools';
import { isMissionUnlocked, missionLockReason } from '@/lib/engine';
import { Card, SectionTitle, Badge, LevelDots, Progress, Empty } from '@/components/ui';
import type { StrandId, TrackId } from '@/types';

const PAGE = 20;

export default function Missions() {
  const { state } = useApp();
  const track: TrackId = state.profile?.track ?? 'thpt';
  const stages = stagesByTrack(track);

  const [stageId, setStageId] = useState<string>('');
  const [level, setLevel] = useState<number>(0);
  const [kind, setKind] = useState<MissionKind | ''>('');
  const [strand, setStrand] = useState<StrandId | ''>('');
  const [search, setSearch] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [view, setView] = useState<'chuyen-de' | 'danh-sach'>('chuyen-de');
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  const list = useMemo(() => {
    const base = missionsFiltered({
      track,
      stageId: stageId || undefined,
      level: level || undefined,
      kind: kind || undefined,
      strand: strand || undefined,
      search: search || undefined,
    });
    return onlyOpen ? base.filter((m) => isMissionUnlocked(state, m)) : base;
  }, [track, stageId, level, kind, strand, search, onlyOpen, state]);

  const shown = list.slice(0, (page + 1) * PAGE);
  const strandsOfTrack = [...new Set(missionsFiltered({ track }).map((m) => m.strand))];

  const doneCount = list.filter((m) => state.missionStatus[m.id]?.passed).length;

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow={BRAND_TRACK_STYLE[track].label}
        title="Nhiệm vụ & Phiếu luyện"
        desc="Phiếu được soạn theo chuyên đề: mỗi chuyên đề có một bộ 6 phiếu đi theo thứ tự sư phạm, kèm phiếu lời giải và phiếu hướng dẫn ôn chắc. Nội dung sinh lại mỗi lần làm nên làm lại không trùng đề cũ."
        right={
          <div className="text-right">
            <div className="text-2xl font-extrabold tabular-nums text-brand-700">
              {doneCount}/{list.length}
            </div>
            <div className="text-[11.5px] font-semibold text-slate-500">nhiệm vụ đã đạt chuẩn</div>
          </div>
        }
      />

      <div className="flex flex-wrap gap-1.5">
        {(
          [
            ['chuyen-de', 'Xem theo chuyên đề'],
            ['danh-sach', 'Danh sách nhiệm vụ'],
          ] as const
        ).map(([v, label]) => (
          <button
            key={v}
            className={`chip ${view === v ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600'}`}
            onClick={() => setView(v)}
          >
            {label}
          </button>
        ))}
      </div>

      {view === 'chuyen-de' && (
        <div className="space-y-3">
          <Card className="p-4">
            <p className="text-[13px] leading-relaxed text-slate-700">
              Mỗi chuyên đề có một <b>bộ phiếu</b> gồm {SHEET_TYPES.length} phiếu theo đúng thứ tự sư
              phạm: {SHEET_TYPES.map((x) => x.short).join(' → ')}. Mỗi phiếu luyện đều có{' '}
              <b>phiếu lời giải &amp; phân tích chuyên sâu</b> đi kèm, và cả chuyên đề có thêm{' '}
              <b>phiếu hướng dẫn ôn chắc</b>.
            </p>
          </Card>

          {packedTopics(track).map((t) => {
            const packs = sheetsOfTopic(track, t.id);
            const all = packs.flatMap((p) => p.sheets);
            const passed = all.filter((w) => {
              const m = missionByWorksheet(w.id);
              return m && state.missionStatus[m.id]?.passed;
            }).length;
            const st = strandById(t.strand);
            const expanded = openTopic === t.id;
            const shownPacks = expanded ? packs : packs.slice(0, 1);
            return (
              <Card key={t.id} className="p-4">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h3 className="text-[14.5px] font-extrabold text-slate-900">{t.name}</h3>
                      <Badge style={{ background: `${st.color}14`, color: st.color }}>{st.short}</Badge>
                      {t.grade && <Badge tone="brand">Lớp {t.grade}</Badge>}
                      <LevelDots level={t.level} />
                      <Badge>{packs.length} đợt · {all.length} phiếu</Badge>
                    </div>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{t.summary}</p>
                  </div>
                  <div className="w-40 shrink-0">
                    <Progress
                      value={(passed / Math.max(1, all.length)) * 100}
                      height={5}
                      tone="#047857"
                      label={`${passed}/${all.length} đạt chuẩn`}
                    />
                  </div>
                </div>

                <div className="mt-3 space-y-1.5">
                  {shownPacks.map((p) => (
                    <div key={p.pack} className="flex flex-wrap items-center gap-1.5">
                      <span className="mr-1 w-14 text-[11.5px] font-extrabold text-slate-400">
                        Đợt {p.pack}
                      </span>
                      {p.sheets.map((w) => {
                        const m = missionByWorksheet(w.id);
                        const done = m && state.missionStatus[m.id]?.passed;
                        const spec = sheetSpec(w.sheetType);
                        return (
                          <button
                            key={w.id}
                            className="chip"
                            style={{
                              background: done ? '#d1fae5' : `${spec.color}14`,
                              color: done ? '#047857' : spec.color,
                            }}
                            title={`${spec.name} — ${w.id}`}
                            onClick={() => m && go(`/mission/${m.id}`)}
                          >
                            {done ? '✓ ' : ''}
                            {spec.order}. {spec.short}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    className="btn-soft py-1.5 text-[12px]"
                    onClick={() => go(`/guide/${t.id}`)}
                  >
                    Phiếu hướng dẫn ôn chắc →
                  </button>
                  <button
                    className="btn-ghost py-1.5 text-[12px]"
                    onClick={() => go(`/topics/${t.id}`)}
                  >
                    Trang chuyên đề
                  </button>
                  {packs.length > 1 && (
                    <button
                      className="btn-ghost py-1.5 text-[12px]"
                      onClick={() => setOpenTopic(expanded ? null : t.id)}
                    >
                      {expanded ? 'Thu gọn các đợt' : `Xem đủ ${packs.length} đợt`}
                    </button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {view === 'danh-sach' && (
        <>
      {/* Giai đoạn */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stages.map((s) => {
          const missionsOfStage = missionsFiltered({ track, stageId: s.id });
          const passed = missionsOfStage.filter((m) => state.missionStatus[m.id]?.passed).length;
          const unlocked = s.order <= (state.stageUnlocked[track] ?? 1);
          const on = stageId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => {
                setStageId(on ? '' : s.id);
                setPage(0);
              }}
              className={`card p-4 text-left transition ${on ? 'ring-2 ring-brand-500' : 'hover:border-slate-300'} ${
                unlocked ? '' : 'opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] font-extrabold text-slate-900">{s.name}</span>
                {!unlocked && <span className="text-slate-400">🔒</span>}
              </div>
              <div className="mt-1 text-[11px] leading-snug text-slate-500">{s.duration}</div>
              <div className="mt-2">
                <Progress
                  value={(passed / Math.max(1, missionsOfStage.length)) * 100}
                  height={5}
                  tone={unlocked ? '#4f46e5' : '#cbd5e1'}
                />
              </div>
              <div className="mt-1.5 text-[11px] tabular-nums text-slate-500">
                {passed}/{missionsOfStage.length} đạt chuẩn
              </div>
            </button>
          );
        })}
      </div>

      {/* Bộ lọc */}
      <Card className="flex flex-wrap items-end gap-3 p-4">
        <label className="min-w-[150px] flex-1">
          <span className="text-[11.5px] font-bold text-slate-600">Tìm theo mã hoặc tên</span>
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-[13px]"
            placeholder="NV-0042, PL-0042, Viète…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
          />
        </label>
        <label>
          <span className="text-[11.5px] font-bold text-slate-600">Mức độ</span>
          <select
            className="mt-1 block rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px]"
            value={level}
            onChange={(e) => {
              setLevel(Number(e.target.value));
              setPage(0);
            }}
          >
            <option value={0}>Tất cả</option>
            {[1, 2, 3, 4, 5].map((l) => (
              <option key={l} value={l}>
                Level {l}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="text-[11.5px] font-bold text-slate-600">Loại nhiệm vụ</span>
          <select
            className="mt-1 block rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px]"
            value={kind}
            onChange={(e) => {
              setKind(e.target.value as MissionKind | '');
              setPage(0);
            }}
          >
            <option value="">Tất cả</option>
            {Object.entries(MISSION_KIND_META).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="text-[11.5px] font-bold text-slate-600">Mạch kiến thức</span>
          <select
            className="mt-1 block rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px]"
            value={strand}
            onChange={(e) => {
              setStrand(e.target.value as StrandId | '');
              setPage(0);
            }}
          >
            <option value="">Tất cả</option>
            {strandsOfTrack.map((sid) => (
              <option key={sid} value={sid}>
                {strandById(sid).name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 pb-2 text-[12.5px] font-semibold text-slate-600">
          <input
            type="checkbox"
            className="accent-brand-600"
            checked={onlyOpen}
            onChange={(e) => {
              setOnlyOpen(e.target.checked);
              setPage(0);
            }}
          />
          Chỉ hiện nhiệm vụ đã mở khoá
        </label>
      </Card>

      {/* Danh sách */}
      {shown.length === 0 ? (
        <Empty
          title="Không có nhiệm vụ nào khớp bộ lọc"
          desc="Thử bỏ bớt điều kiện lọc, hoặc bỏ chọn “chỉ hiện nhiệm vụ đã mở khoá”."
        />
      ) : (
        <div className="space-y-2.5">
          {shown.map((m) => {
            const meta = MISSION_KIND_META[m.kind];
            const st = state.missionStatus[m.id];
            const unlocked = isMissionUnlocked(state, m);
            const reason = missionLockReason(state, m);
            const ws = worksheetById(m.worksheetId);
            return (
              <Card key={m.id} className="p-4">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                      <Badge style={{ background: `${meta.color}14`, color: meta.color }}>
                        {meta.label}
                      </Badge>
                      <Badge>{m.id}</Badge>
                      <Badge>{m.worksheetId}</Badge>
                      <Badge
                        style={{
                          background: `${strandById(m.strand).color}14`,
                          color: strandById(m.strand).color,
                        }}
                      >
                        {strandById(m.strand).short}
                      </Badge>
                      <LevelDots level={m.level} />
                      {st?.passed && <Badge tone="green">✓ Đạt {st.bestKpi}%</Badge>}
                      {st && !st.passed && <Badge tone="amber">Cao nhất {st.bestKpi}%</Badge>}
                    </div>
                    <h3 className="text-[14.5px] font-bold leading-snug text-slate-900">
                      {m.title}
                    </h3>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
                      {m.objective}
                    </p>
                    <div className="mt-1.5 text-[11.5px] text-slate-500">
                      {ws?.totalItems} câu · {ws?.minutes} phút · KPI mục tiêu {m.kpiTarget}% · +{m.xp} XP
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2">
                    {unlocked ? (
                      <>
                        <button className="btn-primary" onClick={() => go(`/mission/${m.id}`)}>
                          {st ? 'Làm lại' : 'Bắt đầu'}
                        </button>
                        <button
                          className="btn-ghost py-1.5 text-[12px]"
                          onClick={() => go(`/solution/${m.worksheetId}`)}
                        >
                          Bộ giải đề
                        </button>
                      </>
                    ) : (
                      <div className="max-w-[240px] rounded-xl bg-slate-50 p-2.5 text-[11.5px] leading-relaxed text-slate-500">
                        🔒 {reason}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}

          {shown.length < list.length && (
            <button className="btn-ghost w-full" onClick={() => setPage((p) => p + 1)}>
              Xem thêm ({list.length - shown.length} nhiệm vụ còn lại)
            </button>
          )}
        </div>
      )}
        </>
      )}
    </div>
  );
}
