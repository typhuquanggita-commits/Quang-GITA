import { useEffect, useMemo, useRef, useState } from 'react';
import { useApp, go } from '@/state';
import {
  MISSION_KIND_META,
  buildWorksheet,
  missionById,
  stageById,
  worksheetById,
} from '@/data/catalog';
import { strandById } from '@/data/schools';
import { topicById } from '@/data/topics';
import {
  applyResult,
  diagnose,
  gradeWorksheet,
  isMissionUnlocked,
  missionLockReason,
  planNext,
  type GradeResult,
  type ApplyOutcome,
} from '@/lib/engine';
import { can } from '@/lib/auth';
import { Card, Badge, Progress, Donut, MathText, Callout, LevelDots, Empty } from '@/components/ui';

type Phase = 'intro' | 'doing' | 'result';

export default function MissionRun({ missionId }: { missionId: string }) {
  const { state, update } = useApp();
  const mission = missionById(missionId);
  const meta = mission ? worksheetById(mission.worksheetId) : undefined;

  const [variant, setVariant] = useState(0);
  const [phase, setPhase] = useState<Phase>('intro');
  const [partIndex, setPartIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[][]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [outcome, setOutcome] = useState<ApplyOutcome | null>(null);
  const startedAt = useRef<number>(0);

  const worksheet = useMemo(
    () => (meta ? buildWorksheet(meta, variant) : null),
    [meta, variant],
  );

  useEffect(() => {
    if (phase !== 'doing') return;
    const t = window.setInterval(() => setElapsed(Math.round((Date.now() - startedAt.current) / 1000)), 1000);
    return () => window.clearInterval(t);
  }, [phase]);

  if (!mission || !meta || !worksheet) {
    return <Empty title="Không tìm thấy nhiệm vụ" desc="Mã nhiệm vụ không hợp lệ." action={<button className="btn-primary" onClick={() => go('/missions')}>Về danh sách</button>} />;
  }

  const stage = stageById(mission.stageId);
  const kindMeta = MISSION_KIND_META[mission.kind];
  const unlocked = isMissionUnlocked(state, mission);

  const start = () => {
    setAnswers(worksheet.parts.map((p) => p.items.map(() => null)));
    setPartIndex(0);
    setElapsed(0);
    setResult(null);
    setOutcome(null);
    startedAt.current = Date.now();
    setPhase('doing');
  };

  const retry = (nextVariant: boolean) => {
    if (nextVariant) setVariant((v) => v + 1);
    setPhase('intro');
    setResult(null);
    setOutcome(null);
    window.scrollTo({ top: 0 });
  };

  const choose = (pi: number, ii: number, ci: number) =>
    setAnswers((prev) => prev.map((row, r) => (r === pi ? row.map((v, c) => (c === ii ? ci : v)) : row)));

  const submit = () => {
    const seconds = Math.round((Date.now() - startedAt.current) / 1000);
    const g = gradeWorksheet(worksheet, answers, seconds, mission.kpiTarget);
    setResult(g);
    const out = applyResult(state, mission, worksheet, g, variant);
    setOutcome(out);
    update(() => out.state);
    setPhase('result');
    window.scrollTo({ top: 0 });
  };

  /* ------------------------- MÀN GIỚI THIỆU ------------------------- */
  if (phase === 'intro') {
    const status = state.missionStatus[mission.id];
    return (
      <div className="space-y-5">
        <button className="text-[13px] font-semibold text-brand-700" onClick={() => go('/missions')}>
          ← Danh sách nhiệm vụ
        </button>

        <Card className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge style={{ background: `${kindMeta.color}14`, color: kindMeta.color }}>
              {kindMeta.label}
            </Badge>
            <Badge>{mission.id}</Badge>
            <Badge>{mission.worksheetId}</Badge>
            <Badge style={{ background: `${strandById(mission.strand).color}14`, color: strandById(mission.strand).color }}>
              {strandById(mission.strand).name}
            </Badge>
            <LevelDots level={mission.level} />
          </div>

          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
            {mission.title}
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-700">{mission.objective}</p>
          <p className="mt-1.5 text-[12.5px] text-slate-500">{kindMeta.hint}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            {[
              ['Số câu', `${meta.totalItems} câu / 3 phần`],
              ['Thời lượng đề xuất', `${meta.minutes} phút`],
              ['KPI mục tiêu', `${mission.kpiTarget}%`],
              ['Phần thưởng', `+${mission.xp} XP`],
            ].map(([l, v]) => (
              <div key={l} className="rounded-xl bg-slate-50 p-3">
                <div className="text-[10.5px] font-bold uppercase tracking-wide text-slate-400">{l}</div>
                <div className="mt-0.5 text-[14px] font-extrabold text-slate-800">{v}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2">
            {worksheet.parts.map((p) => (
              <div key={p.order} className="flex gap-3 rounded-xl border border-slate-200 p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-xs font-extrabold text-white">
                  {p.order}
                </span>
                <div>
                  <div className="text-[13.5px] font-bold text-slate-900">{p.name}</div>
                  <div className="text-[12.5px] text-slate-600">
                    {p.purpose} · {p.items.length} câu
                  </div>
                </div>
              </div>
            ))}
          </div>

          {status && (
            <Callout tone="amber" title={`Bạn đã làm ${status.tries} lần, cao nhất ${status.bestKpi}%`}>
              Lần này hệ thống sẽ sinh <b>đề mới hoàn toàn</b> cùng dạng và cùng mức độ — không phải
              đề cũ, nên không thể học thuộc đáp án.
            </Callout>
          )}

          {!unlocked ? (
            <Callout tone="rose" title="Nhiệm vụ chưa mở khoá">
              {missionLockReason(state, mission)}
            </Callout>
          ) : (
            <button className="btn-primary mt-5" onClick={start}>
              Bắt đầu làm bài →
            </button>
          )}
        </Card>

        <Card className="p-5">
          <h3 className="text-[14px] font-extrabold text-slate-900">Nhiệm vụ này nằm ở đâu</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
            <b>{stage.name}</b> — {stage.goal}
          </p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">{stage.description}</p>
        </Card>
      </div>
    );
  }

  /* ------------------------- MÀN LÀM BÀI ------------------------- */
  if (phase === 'doing') {
    const part = worksheet.parts[partIndex];
    const partAnswers = answers[partIndex] ?? [];
    const allAnswered = partAnswers.every((a) => a !== null);
    const isLast = partIndex === worksheet.parts.length - 1;
    const totalAnswered = answers.flat().filter((a) => a !== null).length;

    return (
      <div className="space-y-4">
        <div className="sticky top-[57px] z-10 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wide text-brand-600">
                {mission.id} · {kindMeta.label}
              </div>
              <div className="text-[15px] font-extrabold text-slate-900">{part.name}</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10.5px] font-bold uppercase tracking-wide text-slate-400">
                  Thời gian
                </div>
                <div className="text-[15px] font-extrabold tabular-nums text-slate-800">
                  {String(Math.floor(elapsed / 60)).padStart(2, '0')}:
                  {String(elapsed % 60).padStart(2, '0')}
                  <span className="ml-1 text-[11px] font-semibold text-slate-400">
                    / {meta.minutes}:00
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10.5px] font-bold uppercase tracking-wide text-slate-400">
                  Đã trả lời
                </div>
                <div className="text-[15px] font-extrabold tabular-nums text-slate-800">
                  {totalAnswered}/{meta.totalItems}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex gap-1.5">
            {worksheet.parts.map((p, i) => (
              <div key={p.order} className="flex-1">
                <Progress
                  value={
                    i < partIndex
                      ? 100
                      : i === partIndex
                        ? (partAnswers.filter((a) => a !== null).length / part.items.length) * 100
                        : 0
                  }
                  height={5}
                  tone={i <= partIndex ? '#4f46e5' : '#e2e8f0'}
                />
              </div>
            ))}
          </div>
        </div>

        <p className="text-[12.5px] leading-relaxed text-slate-500">{part.purpose}</p>

        {part.items.map((item, ii) => (
          <Card key={ii} className="p-5">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge tone="brand">Câu {ii + 1}</Badge>
              <Badge
                style={{
                  background: `${strandById(item.strand).color}14`,
                  color: strandById(item.strand).color,
                }}
              >
                {item.name}
              </Badge>
            </div>
            <p className="prose-math font-medium text-slate-800">
              <MathText>{item.prompt}</MathText>
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {item.choices.map((c, ci) => {
                const on = partAnswers[ii] === ci;
                return (
                  <button
                    key={ci}
                    onClick={() => choose(partIndex, ii, ci)}
                    className={`rounded-xl border px-3 py-2.5 text-left text-[13.5px] transition ${
                      on
                        ? 'border-brand-600 bg-brand-50 font-semibold text-brand-900'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="mr-2 font-bold text-slate-400">{'ABCD'[ci]}.</span>
                    <MathText>{c}</MathText>
                  </button>
                );
              })}
            </div>
          </Card>
        ))}

        <div className="flex flex-wrap items-center gap-3">
          {partIndex > 0 && (
            <button className="btn-ghost" onClick={() => setPartIndex((i) => i - 1)}>
              ← Phần trước
            </button>
          )}
          {!isLast ? (
            <button
              className="btn-primary"
              disabled={!allAnswered}
              onClick={() => {
                setPartIndex((i) => i + 1);
                window.scrollTo({ top: 0 });
              }}
            >
              Sang phần tiếp theo →
            </button>
          ) : (
            <button className="btn-primary" disabled={!allAnswered} onClick={submit}>
              Nộp bài & chấm kết quả
            </button>
          )}
          {!allAnswered && (
            <span className="text-[12.5px] text-slate-500">
              Hãy trả lời hết {part.items.length} câu của phần này trước khi đi tiếp.
            </span>
          )}
        </div>
      </div>
    );
  }

  /* ------------------------- MÀN KẾT QUẢ ------------------------- */
  const g = result!;
  const diag = diagnose(g, worksheet, mission);
  const actions = planNext(state, mission, g);
  const showSolutions = can(state, 'solution.full');
  const toneColor = {
    excellent: '#047857',
    good: '#4338ca',
    warn: '#b45309',
    critical: '#be123c',
  }[diag.tone];

  return (
    <div className="space-y-5">
      {/* Thăng cấp */}
      {outcome?.stageUp && outcome.newStage && (
        <Callout tone="green" title={`🎉 Mở khoá ${outcome.newStage.name}`}>
          Bạn đã đạt chuẩn ở đủ số nhiệm vụ của {stage.name} với KPI trung bình đạt yêu cầu.
          Giai đoạn mới đã sẵn sàng: {outcome.newStage.goal}
        </Callout>
      )}
      {outcome?.levelUp && (
        <Callout tone="green" title={`⬆ Nâng lên Level ${outcome.newLevel}`}>
          Bạn đã đạt KPI ≥ 90% ở hai phiếu Level {mission.level}. Các nhiệm vụ mức cao hơn đã được mở.
        </Callout>
      )}

      {/* Báo kết quả */}
      <Card className="p-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <Donut value={g.kpi} size={140} tone={toneColor} label="KPI" />
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Kết quả · {mission.id}
            </div>
            <h1 className="mt-1 text-xl font-extrabold leading-snug" style={{ color: toneColor }}>
              {diag.headline}
            </h1>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ['Đúng', `${g.correct}/${g.total}`],
                ['Thời gian', `${Math.floor(g.seconds / 60)}p ${g.seconds % 60}s`],
                ['Chuẩn KPI', `${mission.kpiTarget}%`],
                ['XP nhận được', `+${outcome?.xpGained ?? 0}`],
              ].map(([l, v]) => (
                <div key={l}>
                  <div className="text-[10.5px] font-bold uppercase tracking-wide text-slate-400">{l}</div>
                  <div className="text-[15px] font-extrabold tabular-nums text-slate-800">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {g.parts.map((p) => (
            <Progress
              key={p.order}
              value={p.kpi}
              label={`${p.name} — ${p.correct}/${p.total}`}
              tone={p.kpi >= 90 ? '#047857' : p.kpi >= 70 ? '#4f46e5' : '#be123c'}
            />
          ))}
        </div>
      </Card>

      {/* Nhận xét tình hình */}
      <Card className="p-6">
        <h2 className="text-[16px] font-extrabold text-slate-900">Nhận xét tình hình</h2>
        {diag.observations.length === 0 ? (
          <p className="mt-2 text-[13.5px] text-slate-600">
            Không có điểm bất thường nào trong lượt làm này.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {diag.observations.map((o, i) => (
              <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-slate-700">
                <span className="mt-0.5 shrink-0 text-slate-400">◆</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Giải pháp tối ưu */}
      <Card className="p-6">
        <h2 className="text-[16px] font-extrabold text-slate-900">Giải pháp tối ưu</h2>
        <ul className="mt-3 space-y-2">
          {diag.solutions.map((s, i) => (
            <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-slate-700">
              <span className="mt-0.5 shrink-0 text-emerald-600">✔</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
        {diag.focusTopicIds.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {diag.focusTopicIds.map((tid) => {
              const t = topicById(tid);
              if (!t) return null;
              return (
                <button
                  key={tid}
                  className="btn-soft py-1.5 text-[12.5px]"
                  onClick={() => go(`/topics/${tid}`)}
                >
                  Học lại: {t.name} →
                </button>
              );
            })}
          </div>
        )}
      </Card>

      {/* Định hướng bước kế tiếp */}
      <Card className="p-6">
        <h2 className="text-[16px] font-extrabold text-slate-900">Bước tiếp theo</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {actions.map((a) => (
            <button
              key={a.kind + a.label}
              onClick={() => {
                if (a.kind === 'lam-lai' || a.kind === 'thu-thach') retry(true);
                else if (a.missionId) go(`/mission/${a.missionId}`);
                else if (a.kind === 'cung-co') go(`/topics/${diag.focusTopicIds[0] ?? ''}`);
                else go('/missions');
              }}
              className={`rounded-2xl border p-4 text-left transition ${
                a.primary
                  ? 'border-brand-600 bg-brand-50 hover:bg-brand-100'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className={`text-[14px] font-extrabold ${a.primary ? 'text-brand-800' : 'text-slate-900'}`}>
                {a.label}
              </div>
              <div className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{a.detail}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Chữa bài */}
      <Card className="p-6">
        <h2 className="text-[16px] font-extrabold text-slate-900">Chữa từng câu</h2>
        {!showSolutions && (
          <Callout tone="amber" title="Vai trò hiện tại chỉ xem được gợi ý">
            Tài khoản Trải nghiệm không mở lời giải chi tiết. Hoàn thành bài test xếp lộ trình để nâng
            lên Học viên Chuẩn và mở toàn bộ lời giải từng bước.
          </Callout>
        )}
        <div className="mt-4 space-y-3">
          {g.items.map((it, i) => (
            <details
              key={i}
              className="rounded-xl border p-4"
              style={{ borderColor: it.isCorrect ? '#d1fae5' : '#fecdd3' }}
              open={!it.isCorrect}
            >
              <summary className="cursor-pointer">
                <span className={`text-[13px] font-extrabold ${it.isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {it.isCorrect ? '✓' : '✕'} Phần {it.partOrder} · Câu {it.itemIndex + 1}
                </span>
                <span className="ml-2 text-[12px] text-slate-500">{it.skill}</span>
              </summary>
              <p className="prose-math mt-3">
                <MathText>{it.prompt}</MathText>
              </p>
              <div className="mt-2 space-y-1 text-[13px]">
                <div className="text-emerald-700">
                  <b>Đáp án đúng:</b> <MathText>{it.choices[it.correct]}</MathText>
                </div>
                {!it.isCorrect && it.chosen !== null && (
                  <div className="text-rose-700">
                    <b>Bạn chọn:</b> <MathText>{it.choices[it.chosen]}</MathText>
                  </div>
                )}
              </div>
              {showSolutions ? (
                <ol className="mt-3 space-y-1.5 border-l-2 border-slate-200 pl-4">
                  {it.steps.map((s, si) => (
                    <li key={si} className="prose-math text-[13px]">
                      <MathText>{s}</MathText>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-3 text-[12.5px] italic text-slate-500">
                  Gợi ý: {it.steps[0]}
                </p>
              )}
            </details>
          ))}
        </div>
      </Card>

      <div className="flex flex-wrap gap-3">
        <button className="btn-ghost" onClick={() => go('/missions')}>
          ← Danh sách nhiệm vụ
        </button>
        <button className="btn-ghost" onClick={() => go('/dashboard')}>
          Xem bảng tiến độ
        </button>
      </div>
    </div>
  );
}
