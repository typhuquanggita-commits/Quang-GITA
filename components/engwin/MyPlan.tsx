/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useEffect, useMemo, useState} from 'react';
import {
  QUESTIONS,
  derivePlan,
  loadProfile,
  saveProfile,
  clearProfile,
  ARCHETYPES,
  RESOURCE_BY_ID,
  MILESTONES,
  DAILY_TEN,
  TRAJECTORY,
} from '../../data';
import {Profile, DerivedPlan} from '../../types';
import {Card, Chip, Field, Bullets, Stat} from './ui';

/* ------------------------------ Bộ câu hỏi ------------------------------- */

const Intake: React.FC<{
  answers: Profile;
  setAnswers: (p: Profile) => void;
  onDone: () => void;
}> = ({answers, setAnswers, onDone}) => {
  const sections = Array.from(new Set(QUESTIONS.map((q) => q.section)));
  const answered = QUESTIONS.filter((q) => {
    const v = answers[q.id];
    return q.kind === 'multi' ? Array.isArray(v) && v.length > 0 : !!v;
  }).length;
  const required = QUESTIONS.filter((q) => q.id !== 'busydays');
  const ready = required.every((q) => {
    const v = answers[q.id];
    return q.kind === 'multi' ? Array.isArray(v) && v.length > 0 : !!v;
  });

  const pick = (qid: string, oid: string, multi: boolean) => {
    if (!multi) {
      setAnswers({...answers, [qid]: oid});
      return;
    }
    const cur = Array.isArray(answers[qid]) ? (answers[qid] as string[]) : [];
    setAnswers({
      ...answers,
      [qid]: cur.includes(oid) ? cur.filter((x) => x !== oid) : [...cur, oid],
    });
  };

  const isOn = (qid: string, oid: string) => {
    const v = answers[qid];
    return Array.isArray(v) ? v.includes(oid) : v === oid;
  };

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-4 mb-8 border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
        <div className="flex items-center gap-4">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500 transition-all"
              style={{width: `${(answered / QUESTIONS.length) * 100}%`}}
            />
          </div>
          <span className="shrink-0 text-xs font-medium text-slate-400">
            {answered}/{QUESTIONS.length}
          </span>
          <button
            disabled={!ready}
            onClick={onDone}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              ready
                ? 'bg-sky-500 text-slate-950 hover:bg-sky-400'
                : 'cursor-not-allowed bg-slate-800 text-slate-600'
            }`}>
            Dựng kế hoạch →
          </button>
        </div>
      </div>

      {sections.map((sec) => (
        <div key={sec} className="mb-10">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            {sec}
          </h3>
          <div className="space-y-4">
            {QUESTIONS.filter((q) => q.section === sec).map((q) => (
              <Card key={q.id}>
                <p className="text-base font-semibold text-slate-100">
                  {q.question}
                  {q.kind === 'multi' && (
                    <span className="ml-2 text-xs font-normal text-slate-500">
                      (chọn nhiều)
                    </span>
                  )}
                </p>
                {q.help && (
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {q.help}
                  </p>
                )}
                <div className="mt-3.5 grid gap-2 sm:grid-cols-2">
                  {q.options.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => pick(q.id, o.id, q.kind === 'multi')}
                      className={`rounded-lg border px-3.5 py-2.5 text-left transition ${
                        isOn(q.id, o.id)
                          ? 'border-sky-500/60 bg-sky-500/10'
                          : 'border-slate-800 bg-slate-800/30 hover:border-slate-700'
                      }`}>
                      <span
                        className={`block text-sm font-medium ${
                          isOn(q.id, o.id) ? 'text-sky-200' : 'text-slate-300'
                        }`}>
                        {isOn(q.id, o.id) ? '✓ ' : ''}
                        {o.label}
                      </span>
                      {o.hint && (
                        <span className="mt-0.5 block text-[11px] leading-snug text-slate-500">
                          {o.hint}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ------------------------------ Kết quả ---------------------------------- */

const FeasibilityCard: React.FC<{plan: DerivedPlan}> = ({plan}) => {
  const f = plan.feasibility;
  const ring: Record<string, string> = {
    emerald: 'border-emerald-500/40 bg-emerald-500/5',
    sky: 'border-sky-500/40 bg-sky-500/5',
    amber: 'border-amber-500/40 bg-amber-500/5',
    rose: 'border-rose-500/40 bg-rose-500/5',
  };
  return (
    <Card className={`mb-8 ${ring[f.tone]}`}>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Tính khả thi
        </span>
        <Chip tone={f.tone}>{f.label}</Chip>
      </div>
      <p className="text-sm leading-relaxed text-slate-200">{f.message}</p>
      {f.levers.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Ba đòn bẩy — chọn một, ngay bây giờ
          </p>
          {f.levers.map((l) => (
            <div key={l.name} className="rounded-lg bg-slate-800/40 p-3">
              <p className="text-sm font-semibold text-slate-200">{l.name}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                {l.detail}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

const DayTable: React.FC<{blocks: DerivedPlan['fullDay']; total: number}> = ({
  blocks,
  total,
}) => (
  <div>
    <div className="space-y-1.5">
      {blocks.map((b, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-lg bg-slate-800/30 px-3 py-2">
          <span className="w-24 shrink-0 text-[11px] font-medium text-sky-400">
            {b.time}
          </span>
          <span className="min-w-0 flex-1 text-xs leading-relaxed text-slate-300">
            {b.task}
          </span>
          <span className="shrink-0 text-[11px] font-semibold text-slate-400">
            {b.minutes}′
          </span>
        </div>
      ))}
    </div>
    <p className="mt-2.5 text-[11px] text-slate-600">
      Tổng: <span className="font-semibold text-slate-400">{total} phút</span>
    </p>
  </div>
);

const Result: React.FC<{plan: DerivedPlan; onEdit: () => void}> = ({
  plan,
  onEdit,
}) => {
  const primary = ARCHETYPES.find((a) => a.id === plan.primaryArchetypeId);
  const secondary = ARCHETYPES.find((a) => a.id === plan.secondaryArchetypeId);
  const entryIdx = MILESTONES.findIndex((m) => m.id === plan.entryMilestoneId);
  const fullTotal = plan.fullDay.reduce((s, b) => s + b.minutes, 0);
  const busyTotal = plan.busyDay.reduce((s, b) => s + b.minutes, 0);
  const riskTone = {cao: 'rose', trung: 'amber', thap: 'sky'} as const;
  const riskLabel = {cao: 'cao', trung: 'trung bình', thap: 'thấp'} as const;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            Kế hoạch của riêng tôi
          </p>
          <h2 className="mt-1.5 text-2xl font-bold text-slate-100">
            Lộ trình đã chỉnh theo đúng con người và hoàn cảnh của bạn
          </h2>
        </div>
        <button
          onClick={onEdit}
          className="rounded-lg border border-slate-700 px-3.5 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:text-slate-100">
          ✎ Sửa câu trả lời
        </button>
      </div>

      <FeasibilityCard plan={plan} />

      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat
          value={plan.entryMilestoneName.split(' · ')[0]}
          label="Cột mốc xuất phát"
          sub={plan.entryMilestoneName.split(' · ')[1]}
        />
        <Stat
          value={`${Math.round(plan.hoursNeeded)}h`}
          label="Giờ còn thiếu"
          sub={`Đã có ${plan.bankedHours}h · Đích ${plan.targetHours}h`}
        />
        <Stat
          value={`${Math.ceil(plan.monthsNeeded)}`}
          label="Tháng cần"
          sub={
            plan.deadlineMonths
              ? `Bạn có ${plan.deadlineMonths} tháng`
              : 'Không có hạn cứng'
          }
        />
        <Stat
          value={`${plan.weeklyHours}h`}
          label="Mỗi tuần"
          sub={`${plan.dailyMinutes}′/ngày${plan.commuteMinutes ? ` + ${plan.commuteMinutes}′ đi lại` : ''}`}
        />
      </div>

      {/* Nguyên mẫu */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Bạn học theo kiểu nào
      </h3>
      <Card className="mb-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Chip tone="violet">Chính: {primary?.name}</Chip>
          {secondary && <Chip tone="sky">Phụ: {secondary.name}</Chip>}
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
              ⚡ Siêu năng lực của bạn
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              {primary?.superpower}
            </p>
          </div>
          <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-400">
              ⚠ Điểm mù phải canh suốt 36 tháng
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              {primary?.blindSpot}
            </p>
          </div>
        </div>
        <Field label="Lộ trình đã được chỉnh thế nào cho bạn">
          <Bullets items={plan.archetypeAdjustments} marker="→" />
        </Field>
      </Card>

      {/* Rủi ro */}
      {plan.risks.length > 0 && (
        <>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Rủi ro riêng của bạn — và cách bịt
          </h3>
          <div className="mb-8 space-y-3">
            {plan.risks.map((r, i) => (
              <Card
                key={i}
                className={
                  r.level === 'cao'
                    ? 'border-l-2 border-l-rose-500/60'
                    : r.level === 'trung'
                      ? 'border-l-2 border-l-amber-500/60'
                      : 'border-l-2 border-l-sky-500/50'
                }>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Chip tone={riskTone[r.level]}>Rủi ro {riskLabel[r.level]}</Chip>
                  <h4 className="text-sm font-bold text-slate-100">{r.title}</h4>
                </div>
                <p className="text-sm leading-relaxed text-slate-400">{r.why}</p>
                <p className="mt-2.5 rounded-lg bg-slate-800/40 p-3 text-sm leading-relaxed text-emerald-200/90">
                  <span className="font-semibold">Cách bịt: </span>
                  {r.fix}
                </p>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Phân bổ + nhịp ngày */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Ngân sách {plan.dailyMinutes} phút của bạn được chia thế nào
      </h3>
      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <Card>
          <p className="mb-3 text-[11px] leading-relaxed text-slate-500">
            {plan.learningMinutes} phút chia cho bốn trụ cột, cộng 5 phút nghi
            thức (đọc câu bản sắc, nhập Sổ Lỗi, tô ô lịch) — vừa đúng{' '}
            {plan.dailyMinutes} phút bạn đã chọn.
          </p>
          <div className="space-y-3">
            {plan.allocation.map((a) => (
              <div key={a.pillar}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-medium text-slate-300">{a.pillar}</span>
                  <span className="font-semibold text-sky-400">
                    {a.minutes}′
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{
                      width: `${(a.minutes / plan.learningMinutes) * 100}%`,
                    }}
                  />
                </div>
                <p className="mt-1 text-[11px] leading-snug text-slate-500">
                  {a.note}
                </p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <Field label="Ngày Đủ — theo khung giờ đỉnh của bạn">
            <DayTable blocks={plan.fullDay} total={fullTotal} />
          </Field>
        </Card>
      </div>

      <div className="mb-8 grid gap-3 md:grid-cols-2">
        <Card>
          <Field
            label={
              plan.busyDayLabels.length
                ? `Ngày Bận — đã xếp sẵn cho ${plan.busyDayLabels.join(', ')}`
                : 'Ngày Bận — dùng khi lịch dồn'
            }>
            <DayTable blocks={plan.busyDay} total={busyTotal} />
            <p className="mt-3 rounded-lg bg-emerald-500/5 p-2.5 text-[11px] leading-relaxed text-emerald-200/80">
              Đây là mức <span className="font-semibold">HOÀN THÀNH</span> cho
              những ngày đó, không phải mức thất bại. Ngày tệ nhất thì rút còn 2
              phút: mở Anki, ôn 5 thẻ, tô ô lịch.
            </p>
          </Field>
        </Card>
        <Card>
          <Field label={`10 việc mỗi ngày — rút còn ${plan.dailyTenIds.length} việc cho quỹ ${plan.dailyMinutes} phút`}>
            <div className="space-y-1.5">
              {DAILY_TEN.filter((a) => plan.dailyTenIds.includes(a.no)).map(
                (a) => (
                  <div
                    key={a.no}
                    className="flex gap-2.5 rounded-lg bg-slate-800/30 px-3 py-2">
                    <span className="text-[11px] font-bold text-slate-500">
                      {a.no}
                    </span>
                    <span className="min-w-0 flex-1 text-xs leading-snug text-slate-300">
                      {a.no === 2
                        ? `Nạp ≥ ${plan.inputMinutes} phút input dễ hiểu (hiểu 90–98%)`
                        : a.action}
                    </span>
                  </div>
                ),
              )}
            </div>
            {plan.dailyTenIds.length < DAILY_TEN.length && (
              <p className="mt-3 text-[11px] leading-relaxed text-amber-200/70">
                {DAILY_TEN.length - plan.dailyTenIds.length} việc còn lại được
                gác lại cho tới khi quỹ thời gian của bạn tăng lên. Làm 5 việc
                đều đặn tốt hơn làm 10 việc rồi bỏ.
              </p>
            )}
          </Field>
        </Card>
      </div>

      {/* Chặng đường còn lại */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Chặng đường còn lại của bạn — {MILESTONES.length - entryIdx} cột mốc
      </h3>
      <div className="mb-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {MILESTONES.map((m, i) => {
          const done = i < entryIdx;
          const isEntry = i === entryIdx;
          const beyond = m.bandTo > plan.targetBand;
          return (
            <div
              key={m.id}
              className={`rounded-xl border p-3 ${
                done
                  ? 'border-slate-800/50 bg-slate-900/20 opacity-40'
                  : isEntry
                    ? 'border-sky-500/60 bg-sky-500/10'
                    : beyond
                      ? 'border-slate-800/50 bg-slate-900/20 opacity-50'
                      : 'border-slate-800 bg-slate-900/60'
              }`}>
              <div
                className={`mb-2 h-1 w-8 rounded-full bg-gradient-to-r ${m.color}`}
              />
              <p className="text-[10px] text-slate-500">{m.id}</p>
              <p className="text-xs font-bold text-slate-200">{m.codename}</p>
              <p className="mt-1 text-[10px] text-slate-500">
                {m.bandFrom.toFixed(1)} → {m.bandTo.toFixed(1)}
              </p>
              {done && (
                <p className="mt-1.5 text-[10px] font-medium text-slate-600">
                  ✓ Đã qua
                </p>
              )}
              {isEntry && (
                <p className="mt-1.5 text-[10px] font-semibold text-sky-400">
                  ▶ Bắt đầu ở đây
                </p>
              )}
              {beyond && !done && (
                <p className="mt-1.5 text-[10px] text-slate-600">
                  Vượt mục tiêu
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Tài liệu */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Bộ tài liệu đã lọc cho bạn — {plan.resourceIds.length} nguồn
      </h3>
      <Card className="mb-4">
        <p className="mb-3 text-xs leading-relaxed text-slate-500">
          Lọc theo trình độ, ngân sách và kiểu học của bạn. Bắt đầu bằng đúng
          những thứ này, đừng mở thư viện đầy đủ — thừa tài liệu gây tê liệt lựa
          chọn nhiều hơn thiếu tài liệu.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {plan.resourceIds.map((id) => (
            <Chip key={id} tone="emerald">
              {RESOURCE_BY_ID[id]?.name ?? id}
            </Chip>
          ))}
        </div>
        {plan.excludedResourceIds.length > 0 && (
          <div className="mt-4 border-t border-slate-800 pt-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Tạm bỏ khỏi lộ trình của bạn
            </p>
            <div className="flex flex-wrap gap-1.5">
              {plan.excludedResourceIds.map((id) => (
                <Chip key={id} tone="slate">
                  {RESOURCE_BY_ID[id]?.name ?? id}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card className="mb-8">
        <Field label="Chủ đề nạp hẹp đầu tiên của bạn">
          <p className="text-lg font-semibold text-sky-300">
            {plan.firstNarrowTopic}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
            Chọn theo lĩnh vực bạn đã có kiến thức nền — nhờ vậy bạn đoán được
            nghĩa và bớt phải tra từ. Cày sâu chủ đề này 10 ngày từ 6–8 nguồn
            khác nhau, rồi kết thúc bằng một bài viết và một bài nói không chuẩn
            bị.
          </p>
        </Field>
        <Field label="Số buổi Club mỗi tuần">
          <p className="text-lg font-semibold text-sky-300">
            {plan.clubsPerWeek} buổi
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
            Chỉnh theo câu trả lời của bạn về việc học một mình hay có người, và
            theo số lần bạn đã bỏ dở trước đây.
          </p>
        </Field>
      </Card>

      <p className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-xs leading-relaxed text-slate-500">
        Câu trả lời của bạn được lưu trong trình duyệt này (localStorage), không
        gửi đi đâu cả. Mọi con số ở trên được tính từ quỹ đạo giờ học có thật
        trong hệ thống — bạn có thể kiểm chứng ở tab{' '}
        <span className="font-medium text-slate-400">Tổng quan</span>. Nên quay
        lại sửa câu trả lời mỗi quý, vì trình độ và hoàn cảnh của bạn sẽ đổi.
      </p>
    </div>
  );
};

/* ------------------------------- Vỏ ngoài -------------------------------- */

export const MyPlan: React.FC = () => {
  const [answers, setAnswers] = useState<Profile>({});
  const [mode, setMode] = useState<'loading' | 'intake' | 'result'>('loading');

  useEffect(() => {
    const saved = loadProfile();
    if (saved) {
      setAnswers(saved);
      setMode('result');
    } else {
      setMode('intake');
    }
  }, []);

  const plan = useMemo(() => {
    try {
      return mode === 'result' ? derivePlan(answers) : null;
    } catch {
      return null;
    }
  }, [answers, mode]);

  if (mode === 'loading') return null;

  if (mode === 'result' && plan)
    return (
      <div>
        <Result
          plan={plan}
          onEdit={() => {
            setMode('intake');
            window.scrollTo({top: 0});
          }}
        />
        <div className="mt-6">
          <button
            onClick={() => {
              clearProfile();
              setAnswers({});
              setMode('intake');
              window.scrollTo({top: 0});
            }}
            className="text-xs text-slate-600 underline transition hover:text-slate-400">
            Xoá hồ sơ và làm lại từ đầu
          </button>
        </div>
      </div>
    );

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
          Cá nhân hoá
        </p>
        <h1 className="mt-2 text-3xl font-black leading-tight text-slate-100 md:text-4xl">
          Kế hoạch của riêng tôi
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400">
          Trả lời {QUESTIONS.length} câu — mất khoảng 5 phút. Hệ thống sẽ tính
          lại cột mốc xuất phát, số giờ còn thiếu, số tháng thật sự cần, nhịp
          ngày theo đúng khung giờ đỉnh của bạn, bộ tài liệu đã lọc, và những
          rủi ro riêng của hoàn cảnh bạn.
        </p>
        <div className="mt-5 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
          <p className="text-sm leading-relaxed text-amber-200/90">
            <span className="font-semibold">Trả lời thật, kể cả khi khó nghe.</span>{' '}
            Bộ máy này tính bằng phép toán giờ học, không bằng lời động viên —
            nếu mục tiêu bạn đặt ra không khả thi với quỹ thời gian bạn có, nó
            sẽ nói thẳng và đưa ra ba đòn bẩy cụ thể. Chọn trình độ hoặc quỹ
            thời gian cao hơn thực tế chỉ khiến kế hoạch sụp ở tuần thứ ba.
          </p>
        </div>
      </header>
      <Intake
        answers={answers}
        setAnswers={setAnswers}
        onDone={() => {
          saveProfile(answers);
          setMode('result');
          window.scrollTo({top: 0});
        }}
      />
    </div>
  );
};
