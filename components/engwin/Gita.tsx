/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useMemo, useState} from 'react';
import {
  GITA_CREED,
  GITA_JOURNEY,
  THINKING_CREED,
  THINKING_LANES,
  SUCCESS_PATH,
  FILTERS,
  FILTER_NOTE,
  BNI_CREED,
  STRATEGIC_THREADS,
  LESSON300_CREED,
  THEMES,
  lessons300,
} from '../../data';
import {SectionHeader, Card, Chip, Stat, Bullets, Filters, Accordion} from './ui';

const PHA_TONE: Record<string, 'sky' | 'violet' | 'amber' | 'emerald'> = {
  'HIỂU MÌNH': 'sky',
  'RÈN MÌNH': 'violet',
  'BỨT PHÁ': 'amber',
  'TRƯỞNG THÀNH': 'emerald',
};

const VIEWS = [
  {id: 'hanhtrinh', label: '12 bước hành trình'},
  {id: 'banda', label: 'Bàn đạp & phễu lọc'},
  {id: 'bni', label: '5 lối chiến lược'},
  {id: 'baihoc', label: '300 bài định hướng'},
];

/* ------------------------- 12 BƯỚC HÀNH TRÌNH --------------------------- */

const HanhTrinh: React.FC = () => (
  <div className="space-y-3">
    {GITA_JOURNEY.map((s) => (
      <Card key={s.no} className="flex flex-col gap-3 md:flex-row">
        <div className="shrink-0 md:w-44">
          <span className="text-2xl font-black text-slate-400">
            {String(s.no).padStart(2, '0')}
          </span>
          <p className="text-sm font-bold leading-snug text-slate-100">{s.name}</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <Chip tone={PHA_TONE[s.phase]}>{s.phase}</Chip>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">{s.months}</p>
        </div>
        <div className="min-w-0 flex-1">
          <Bullets items={s.points} />
          <p className="mt-3 rounded-lg border border-sky-500/20 bg-sky-500/[0.04] p-2.5 text-[11px] leading-relaxed text-sky-100/90">
            <span className="font-semibold">Tiếng Anh ở bước này: </span>
            {s.englishRole}
          </p>
        </div>
      </Card>
    ))}
  </div>
);

/* --------------------------- BÀN ĐẠP & PHỄU ----------------------------- */

const BanDap: React.FC = () => (
  <div className="space-y-6">
    <Card className="border-sky-500/25 bg-sky-500/[0.03]">
      <h3 className="text-sm font-bold text-sky-200">{THINKING_CREED.name}</h3>
      <p className="mt-2 text-xs leading-relaxed text-slate-300">
        {THINKING_CREED.from}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">
        {THINKING_CREED.start}
      </p>
      <p className="mt-2 text-xs font-medium leading-relaxed text-amber-200">
        {THINKING_CREED.end}
      </p>
    </Card>

    <div>
      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
        Ba luồng chạy song song, cùng đổ về kỷ luật
      </h3>
      <div className="grid gap-3 lg:grid-cols-3">
        {THINKING_LANES.map((l) => (
          <Card key={l.id} className="flex h-full flex-col">
            <p className="text-sm font-bold text-slate-100">{l.from}</p>
            <div className="mt-2 flex flex-wrap items-center gap-1">
              {l.chain.map((c, i) => (
                <React.Fragment key={c}>
                  <span className="rounded bg-slate-800/70 px-1.5 py-0.5 text-[11px] text-slate-300">
                    {c}
                  </span>
                  {i < l.chain.length - 1 && (
                    <span className="text-[11px] text-slate-400">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              {l.meaning}
            </p>
          </Card>
        ))}
      </div>
    </div>

    <Card>
      <h3 className="text-sm font-bold text-slate-100">{SUCCESS_PATH.name}</h3>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {SUCCESS_PATH.chain.map((c, i) => (
          <React.Fragment key={c}>
            <span className="rounded-full bg-violet-500/15 px-2.5 py-1 text-[11px] font-medium text-violet-200">
              {c}
            </span>
            {i < SUCCESS_PATH.chain.length - 1 && (
              <span className="text-slate-400">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-amber-200/90">
        {SUCCESS_PATH.order}
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Sáu vai của cố vấn
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {SUCCESS_PATH.sixRoles.map((r) => (
              <Chip key={r}>{r}</Chip>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Ba kết quả đầu ra
          </p>
          <div className="mt-1.5">
            <Bullets items={SUCCESS_PATH.threeOutcomes} />
          </div>
        </div>
      </div>
    </Card>

    <div>
      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
        Bốn phễu lọc — nơi thông điệp của cố vấn bị méo trước khi tới học viên
      </h3>
      <div className="grid gap-3 lg:grid-cols-2">
        {FILTERS.map((f) => (
          <Card key={f.no} className="flex h-full flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-rose-500/80">
                {String(f.no).padStart(2, '0')}
              </span>
              <h4 className="text-sm font-bold text-slate-100">{f.name}</h4>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
              {f.distorts}
            </p>
            <p className="mt-auto pt-3 text-[11px] leading-relaxed text-emerald-300/85">
              Cố vấn làm gì: {f.coachMove}
            </p>
          </Card>
        ))}
      </div>
      <Card className="mt-3 border-amber-500/30 bg-amber-500/[0.04]">
        <h4 className="text-sm font-bold text-amber-200">
          Hai chỗ tôi chưa đọc chắc trong tài liệu gốc
        </h4>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-300">
          {FILTER_NOTE.ambiguity}
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-300">
          {FILTER_NOTE.alsoUnclear}
        </p>
      </Card>
    </div>
  </div>
);

/* --------------------------- 5 LỐI CHIẾN LƯỢC --------------------------- */

const Bni: React.FC = () => (
  <div className="space-y-4">
    <Card className="border-violet-500/25 bg-violet-500/[0.03]">
      <h3 className="text-sm font-bold text-violet-200">{BNI_CREED.core}</h3>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">
        {BNI_CREED.whyItTransfers}
      </p>
      <p className="mt-2 text-xs font-medium leading-relaxed text-slate-300">
        {BNI_CREED.theKeyIdea}
      </p>
      <p className="mt-2 text-[11px] text-slate-400">Nguồn: {BNI_CREED.source}</p>
    </Card>

    {STRATEGIC_THREADS.map((t) => (
      <Card key={t.no}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-lg font-black text-violet-500/80">
            {String(t.no).padStart(2, '0')}
          </span>
          <h4 className="text-sm font-bold text-slate-100">{t.gita}</h4>
          <Chip>BNI: {t.bni}</Chip>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-300">{t.what}</p>
        <p className="mt-2 text-[11px] leading-relaxed text-rose-300/85">
          Hỏng khi: {t.fails}
        </p>
      </Card>
    ))}
  </div>
);

/* --------------------------- 300 BÀI ĐỊNH HƯỚNG -------------------------- */

const BaiHoc: React.FC = () => {
  const all = useMemo(() => lessons300(), []);
  const [step, setStep] = useState('1');
  const [theme, setTheme] = useState('all');

  const shown = useMemo(
    () =>
      all.filter(
        (l) =>
          String(l.step) === step && (theme === 'all' || l.theme === theme),
      ),
    [all, step, theme],
  );

  return (
    <div>
      <Card className="mb-6 border-sky-500/25 bg-sky-500/[0.03]">
        <h3 className="text-sm font-bold text-sky-200">{LESSON300_CREED.name}</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-300">
          {LESSON300_CREED.claim}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-amber-300/90">
          {LESSON300_CREED.notLessons}
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
          {LESSON300_CREED.honest}
        </p>
      </Card>

      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <div>
          <label htmlFor="g-step" className="text-xs font-medium text-slate-400">
            Bước hành trình
          </label>
          <select
            id="g-step"
            value={step}
            onChange={(e) => setStep(e.currentTarget.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-200 focus:border-sky-500 focus:outline-none">
            {GITA_JOURNEY.map((s) => (
              <option key={s.no} value={String(s.no)}>
                {String(s.no).padStart(2, '0')} — {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="g-theme" className="text-xs font-medium text-slate-400">
            Chủ đề
          </label>
          <select
            id="g-theme"
            value={theme}
            onChange={(e) => setTheme(e.currentTarget.value)}
            className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-200 focus:border-sky-500 focus:outline-none">
            <option value="all">Cả năm chủ đề · 25 bài</option>
            {THEMES.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name} — {t.question}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mb-4 text-[11px] text-slate-400">
        Đang hiện {shown.length} bài · tổng bộ {all.length} bài
      </p>

      <div className="space-y-3">
        {shown.map((l) => (
          <Accordion
            key={l.no}
            title={`Bài ${l.no} · ${l.title}`}
            subtitle={`${GITA_JOURNEY[l.step - 1].name} · ${l.months} · phễu ${l.filter}`}
            right={<Chip tone={PHA_TONE[l.phase]}>nấc {l.rung}</Chip>}>
            <p className="text-xs leading-relaxed text-slate-300">{l.why}</p>
            <ol className="mt-3 space-y-1.5">
              {l.blocks.map((b) => (
                <li
                  key={b.slot}
                  className="flex gap-3 rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2">
                  <span className="w-20 shrink-0 text-[11px] font-bold text-slate-300">
                    {b.slot}
                  </span>
                  <span className="w-8 shrink-0 text-[11px] tabular-nums text-sky-400">
                    {b.minutes}′
                  </span>
                  <span className="min-w-0 text-[11px] leading-relaxed text-slate-400">
                    {b.what}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              <p className="rounded bg-amber-500/10 px-2.5 py-2 text-[11px] leading-relaxed text-amber-200">
                <span className="font-semibold">Nộp lại: </span>
                {l.deliverable}
              </p>
              <p className="rounded bg-emerald-500/10 px-2.5 py-2 text-[11px] leading-relaxed text-emerald-200">
                <span className="font-semibold">Đạt khi: </span>
                {l.measure}
              </p>
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

/* --------------------------------- TAB ----------------------------------- */

export const Gita: React.FC = () => {
  const [view, setView] = useState('hanhtrinh');
  const so = useMemo(() => lessons300().length, []);

  return (
    <div>
      <SectionHeader
        eyebrow="Mô thức GITA"
        title={GITA_CREED.name}
        lead={GITA_CREED.promise}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value="12" label="Bước hành trình" sub="Từ tài liệu gốc học viện" />
        <Stat value="4" label="Phễu lọc" sub="Nơi thông điệp bị méo" />
        <Stat value="5" label="Lối chiến lược" sub="Chuyển từ mô hình BNI" />
        <Stat value={String(so)} label="Bài định hướng" sub="12 bước × 5 chủ đề × 5 nấc" />
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="text-sm font-bold text-slate-100">Bốn pha</h3>
          <div className="mt-2">
            <Bullets items={GITA_CREED.fourPhases} />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            {GITA_CREED.moreThanASchool}
          </p>
        </Card>
        <Card className="border-sky-500/25 bg-sky-500/[0.03]">
          <h3 className="text-sm font-bold text-sky-200">
            Tiếng Anh nằm ở đâu trong mô thức này
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-300">
            {GITA_CREED.howEnglishFits}
          </p>
        </Card>
      </div>

      <Filters options={VIEWS} value={view} onChange={setView} />

      {view === 'hanhtrinh' && <HanhTrinh />}
      {view === 'banda' && <BanDap />}
      {view === 'bni' && <Bni />}
      {view === 'baihoc' && <BaiHoc />}
    </div>
  );
};
