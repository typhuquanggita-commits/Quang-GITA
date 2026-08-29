/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useMemo, useState} from 'react';
import {
  ASSESS_CREED,
  BATTERIES,
  INTEGRITY_RULES,
  REWARD_TIERS,
  AI_PROTOCOL,
  SOLUTION_CREED,
  SYMPTOMS,
  solutions,
  LEVELS,
} from '../../data';
import {SectionHeader, Card, Chip, Stat, Bullets, Filters, Accordion} from './ui';

const SKILL_LABEL: Record<string, string> = {
  listening: 'Nghe',
  speaking: 'Nói',
  reading: 'Đọc',
  writing: 'Viết',
  vocabulary: 'Từ vựng',
  grammar: 'Ngữ pháp',
  pronunciation: 'Phát âm',
  mindset: 'Tư duy',
};

const SCORER_TONE: Record<string, 'sky' | 'violet' | 'amber'> = {
  'máy': 'sky',
  'người': 'violet',
  'máy + người': 'amber',
};

const VIEWS = [
  {id: 'bo-de', label: 'Bốn bộ đề'},
  {id: 'liem-chinh', label: 'Chống học giả'},
  {id: 'thuong', label: 'Phần thưởng'},
  {id: 'ai', label: 'Trợ lý AI'},
  {id: 'kho', label: 'Kho 1.000 giải pháp'},
];

/* ------------------------------ BỐN BỘ ĐỀ ------------------------------- */

const BoDe: React.FC = () => (
  <div className="space-y-5">
    {BATTERIES.map((b) => (
      <Accordion
        key={b.id}
        title={b.name}
        subtitle={`${b.when} · ${b.totalMinutes} phút`}
        right={<Chip tone="sky">{b.cadence}</Chip>}
        defaultOpen={b.cadence === 'tuần'}>
        <p className="mb-4 text-xs leading-relaxed text-slate-400">{b.purpose}</p>

        <div className="space-y-3">
          {b.items.map((it) => (
            <div
              key={it.no}
              className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-slate-200">
                  {it.no}. {it.name}
                </span>
                <Chip>{it.minutes}′</Chip>
                <Chip tone={SCORER_TONE[it.scoredBy]}>{it.scoredBy} chấm</Chip>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                {it.what}
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-violet-300/80">
                Bằng chứng: {it.evidence}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-emerald-300/80">
                Đạt khi: {it.passMark}
              </p>
            </div>
          ))}
        </div>

        <h4 className="mt-5 text-[11px] font-bold uppercase tracking-widest text-amber-300">
          Kết quả rơi vào dải nào thì làm gì
        </h4>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[560px] text-[11px]">
            <thead>
              <tr className="border-b border-slate-800 text-left text-slate-400">
                <th className="py-1.5 pr-3 font-medium">Dải</th>
                <th className="py-1.5 pr-3 font-medium">Kết luận</th>
                <th className="py-1.5 font-medium">Làm gì tiếp</th>
              </tr>
            </thead>
            <tbody>
              {b.decision.map((d) => (
                <tr key={d.band} className="border-b border-slate-900 align-top">
                  <td className="py-2 pr-3 font-semibold text-slate-300">{d.band}</td>
                  <td className="py-2 pr-3 text-slate-400">{d.verdict}</td>
                  <td className="py-2 text-slate-400">{d.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Accordion>
    ))}
  </div>
);

/* ------------------------------ LIÊM CHÍNH ------------------------------ */

const LiemChinh: React.FC = () => (
  <div className="grid gap-4 lg:grid-cols-2">
    {INTEGRITY_RULES.map((r) => (
      <Card key={r.id} className="flex h-full flex-col">
        <h4 className="text-sm font-bold text-rose-200">{r.risk}</h4>
        <dl className="mt-3 space-y-2 text-[11px] leading-relaxed">
          <div>
            <dt className="font-semibold text-slate-300">Dấu hiệu</dt>
            <dd className="text-slate-400">{r.signal}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-300">Cách kiểm</dt>
            <dd className="text-slate-400">{r.check}</dd>
          </div>
          <div>
            <dt className="font-semibold text-emerald-300">Xử lý</dt>
            <dd className="text-slate-400">{r.response}</dd>
          </div>
        </dl>
      </Card>
    ))}
  </div>
);

/* -------------------------------- THƯỞNG -------------------------------- */

const Thuong: React.FC = () => (
  <div className="grid gap-4 lg:grid-cols-2">
    {REWARD_TIERS.map((r) => (
      <Card key={r.id} className="flex h-full flex-col border-amber-500/20">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-400">
          Khi nào được
        </p>
        <p className="mt-1 text-xs leading-relaxed text-slate-300">{r.trigger}</p>
        <p className="mt-3 text-sm font-bold text-amber-200">{r.reward}</p>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-400">{r.why}</p>
        <p className="mt-auto pt-3 text-[11px] leading-relaxed text-emerald-300/80">
          Không đi tắt được: {r.cannotFake}
        </p>
      </Card>
    ))}
  </div>
);

/* ------------------------------- TRỢ LÝ AI ------------------------------ */

const TroLyAi: React.FC = () => (
  <div className="space-y-3">
    {AI_PROTOCOL.map((s) => (
      <Card key={s.no} className="flex flex-col gap-3 md:flex-row">
        <div className="shrink-0 md:w-28">
          <span className="text-2xl font-black text-sky-500/60">
            {String(s.no).padStart(2, '0')}
          </span>
          <p className="text-sm font-bold text-slate-100">{s.name}</p>
        </div>
        <div className="min-w-0 flex-1 space-y-2 text-[11px] leading-relaxed">
          <p className="text-slate-400">
            <span className="font-semibold text-slate-300">Nhận vào: </span>
            {s.input}
          </p>
          <p className="text-slate-400">
            <span className="font-semibold text-slate-300">Làm gì: </span>
            {s.does}
          </p>
          <p className="text-slate-400">
            <span className="font-semibold text-slate-300">Đưa ra: </span>
            {s.output}
          </p>
          <p className="rounded bg-violet-500/10 px-2 py-1.5 text-violet-200">
            <span className="font-semibold">Người phải quyết: </span>
            {s.humanGate}
          </p>
          <p className="rounded bg-rose-500/10 px-2 py-1.5 text-rose-200">
            <span className="font-semibold">AI không được: </span>
            {s.limit}
          </p>
        </div>
      </Card>
    ))}
  </div>
);

/* --------------------------- KHO GIẢI PHÁP ------------------------------ */

const Kho: React.FC = () => {
  const all = useMemo(() => solutions(), []);
  const [skill, setSkill] = useState('all');
  const [symptomId, setSymptomId] = useState(SYMPTOMS[0].id);
  const [levelId, setLevelId] = useState(LEVELS[0].id);

  const shown = useMemo(
    () => (skill === 'all' ? SYMPTOMS : SYMPTOMS.filter((s) => s.skill === skill)),
    [skill],
  );
  const symptom =
    SYMPTOMS.find((s) => s.id === symptomId) ?? SYMPTOMS[0];
  const level = LEVELS.find((l) => l.id === levelId) ?? LEVELS[0];
  const don = all.find(
    (x) => x.symptomId === symptom.id && x.levelId === level.id,
  );

  return (
    <div>
      <Card className="mb-6 border-sky-500/25 bg-sky-500/[0.03]">
        <h3 className="text-sm font-bold text-sky-200">{SOLUTION_CREED.name}</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-300">
          {SOLUTION_CREED.claim}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-amber-300/90">
          {SOLUTION_CREED.rule}
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
          {SOLUTION_CREED.limit}
        </p>
      </Card>

      <Filters
        options={[
          {id: 'all', label: `Tất cả · ${SYMPTOMS.length}`},
          ...Object.entries(SKILL_LABEL).map(([id, label]) => ({
            id,
            label: `${label} · ${SYMPTOMS.filter((s) => s.skill === id).length}`,
          })),
        ]}
        value={skill}
        onChange={(v) => {
          setSkill(v);
          const first = v === 'all' ? SYMPTOMS[0] : SYMPTOMS.find((s) => s.skill === v);
          if (first) setSymptomId(first.id);
        }}
      />

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="sy-pick"
            className="text-xs font-medium text-slate-400">
            Triệu chứng
          </label>
          <select
            id="sy-pick"
            value={symptomId}
            onChange={(e) => setSymptomId(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-200 focus:border-sky-500 focus:outline-none">
            {shown.map((s) => (
              <option key={s.id} value={s.id}>
                {SKILL_LABEL[s.skill]} — {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lv-pick" className="text-xs font-medium text-slate-400">
            Cấp độ hiện tại
          </label>
          <select
            id="lv-pick"
            value={levelId}
            onChange={(e) => setLevelId(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-200 focus:border-sky-500 focus:outline-none">
            {LEVELS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.id} — {l.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Card className="mb-4 border-slate-700">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          Học viên thường nói thế này
        </p>
        <p className="mt-1.5 text-sm italic leading-relaxed text-slate-300">
          “{symptom.saidAs}”
        </p>
      </Card>

      {don && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-rose-500/25">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-rose-300">
              Chẩn đoán
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              {don.diagnose}
            </p>
          </Card>
          <Card className="border-sky-500/25">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-sky-300">
              Làm ngay hôm nay
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{don.today}</p>
          </Card>
          <Card className="border-violet-500/25">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-violet-300">
              Bài luyện bảy ngày
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              {don.sevenDay}
            </p>
          </Card>
          <Card className="border-emerald-500/25">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
              Đo lại thế nào
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              {don.remeasure}
            </p>
          </Card>
          <Card className="border-amber-500/25 lg:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
              Khi nào phải gọi người thật
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              {don.escalate}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

/* --------------------------------- TAB ---------------------------------- */

export const Assess: React.FC = () => {
  const [view, setView] = useState('bo-de');
  const soDon = useMemo(() => solutions().length, []);

  return (
    <div>
      <SectionHeader
        eyebrow="Đánh giá định kỳ"
        title={ASSESS_CREED.name}
        lead={ASSESS_CREED.claim}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value="4" label="Bộ đề" sub="Tuần · 21 ngày · 90 ngày · hành trình" />
        <Stat value={String(INTEGRITY_RULES.length)} label="Luật chống học giả" sub="Mỗi luật có cách kiểm cụ thể" />
        <Stat value={String(REWARD_TIERS.length)} label="Bậc thưởng" sub="Đều gắn với bằng chứng khó làm giả" />
        <Stat value={soDon.toLocaleString('vi-VN')} label="Đơn kê trong kho" sub="40 triệu chứng × 25 cấp độ" />
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="text-sm font-bold text-slate-100">Ba nhịp, ba câu hỏi khác nhau</h3>
          <div className="mt-2">
            <Bullets items={ASSESS_CREED.threeQuestions} />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            {ASSESS_CREED.why}
          </p>
        </Card>
        <Card className="border-amber-500/25 bg-amber-500/[0.03]">
          <h3 className="text-sm font-bold text-amber-200">Nói thẳng hai điều</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {ASSESS_CREED.hardTruth}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            {ASSESS_CREED.noSelfReport}
          </p>
        </Card>
      </div>

      <Filters options={VIEWS} value={view} onChange={setView} />

      {view === 'bo-de' && <BoDe />}
      {view === 'liem-chinh' && <LiemChinh />}
      {view === 'thuong' && <Thuong />}
      {view === 'ai' && <TroLyAi />}
      {view === 'kho' && <Kho />}
    </div>
  );
};
