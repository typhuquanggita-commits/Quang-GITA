/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useMemo, useState} from 'react';
import {
  DOSSIER_CREED,
  DOSSIER_QUARTERS,
  dossierYear,
  WHITE_DAYS,
  GRADUATION_EXAMS,
} from '../../data';
import {DossierDay, DossierDayKind} from '../../types';
import {SectionHeader, Card, Chip, Stat, Bullets, Filters} from './ui';

const KIND_TONE: Record<
  DossierDayKind,
  'slate' | 'emerald' | 'amber' | 'sky' | 'violet' | 'rose'
> = {
  'luyện': 'sky',
  'đối chiếu': 'violet',
  'hợp nhất': 'amber',
  'kiểm tra': 'rose',
  'trắng': 'emerald',
};

const EXAM_NAME = new Map(GRADUATION_EXAMS.map((e) => [e.id, e.name]));

const QUARTER_FILTERS = [
  {id: 'all', label: 'Cả năm'},
  ...DOSSIER_QUARTERS.map((q) => ({
    id: String(q.no),
    label: `Quý ${q.no} · ngày ${q.dayFrom}–${q.dayTo}`,
  })),
  {id: '0', label: 'Ngày trắng · 361–365'},
];

const DayCard: React.FC<{d: DossierDay}> = ({d}) => (
  <Card className="flex h-full flex-col">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-400">
          Ngày {d.day} · {d.weekday} · tuần {d.week}
        </p>
        <h4 className="mt-1 text-sm font-bold leading-snug text-slate-100">
          {d.title}
        </h4>
      </div>
      <Chip tone={KIND_TONE[d.kind]}>{d.kind}</Chip>
    </div>

    <p className="mt-3 text-xs leading-relaxed text-slate-400">{d.focus}</p>

    {d.blocks.length > 0 && (
      <ul className="mt-3 space-y-1.5 border-l-2 border-slate-800 pl-3">
        {d.blocks.map((b) => (
          <li key={b.slot} className="text-[11px] leading-relaxed">
            <span className="font-semibold text-slate-300">{b.slot}</span>
            <span className="text-slate-400"> · {b.minutes}′ · </span>
            <span className="text-slate-400">{b.what}</span>
          </li>
        ))}
      </ul>
    )}

    <dl className="mt-4 space-y-2 text-[11px] leading-relaxed">
      <div>
        <dt className="font-semibold text-amber-300">Nhiệm vụ đời thật</dt>
        <dd className="text-slate-400">{d.mission}</dd>
      </div>
      <div>
        <dt className="font-semibold text-emerald-300">Thước đo</dt>
        <dd className="text-slate-400">{d.measure}</dd>
      </div>
      <div>
        <dt className="font-semibold text-violet-300">Bằng chứng phải nộp</dt>
        <dd className="text-slate-400">{d.evidence}</dd>
      </div>
    </dl>

    <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
      <Chip>{d.minutes}′ / ngày</Chip>
      {d.reviewDays.length > 0 && (
        <span className="text-[11px] text-slate-400">
          Ôn lại ngày {d.reviewDays.join(', ')}
        </span>
      )}
    </div>
  </Card>
);

export const Dossier: React.FC = () => {
  const [quarter, setQuarter] = useState('1');
  const [jump, setJump] = useState('');
  const DOSSIER_YEAR = useMemo(() => dossierYear(), []);

  const days = useMemo(() => {
    if (quarter === 'all') return DOSSIER_YEAR;
    const q = Number(quarter);
    if (q === 0) return DOSSIER_YEAR.filter((d) => d.day >= 361);
    const meta = DOSSIER_QUARTERS.find((x) => x.no === q)!;
    return DOSSIER_YEAR.filter(
      (d) => d.day >= meta.dayFrom && d.day <= meta.dayTo,
    );
  }, [quarter]);

  const shown = useMemo(() => {
    const n = Number(jump);
    if (!jump || !Number.isInteger(n) || n < 1 || n > 365) return days;
    return DOSSIER_YEAR.filter((d) => d.day >= n && d.day <= Math.min(365, n + 6));
  }, [jump, days]);

  const totalMinutes = DOSSIER_YEAR.reduce((s, d) => s + d.minutes, 0);
  const activeQuarter = DOSSIER_QUARTERS.find((q) => q.no === Number(quarter));

  return (
    <div>
      <SectionHeader
        eyebrow="Hồ sơ 365 ngày"
        title={DOSSIER_CREED.name}
        lead={DOSSIER_CREED.claim}
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value="365" label="Ngày đã viết sẵn" sub="Không ngày nào để trống" />
        <Stat
          value={`${(totalMinutes / 60).toFixed(0)} giờ`}
          label="Tổng thời lượng năm 1"
          sub="Trung bình 47 phút mỗi ngày"
        />
        <Stat value="16" label="Bài ra vòng" sub="Bốn quý × bốn vòng 21 ngày" />
        <Stat value="360" label="Bằng chứng phải nộp" sub="Không tính 5 ngày trắng" />
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="text-sm font-bold text-slate-100">Vì sao có hồ sơ này</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {DOSSIER_CREED.why}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            {DOSSIER_CREED.structure}
          </p>
        </Card>
        <Card className="border-amber-500/25 bg-amber-500/[0.03]">
          <h3 className="text-sm font-bold text-amber-200">Nói thẳng một điều</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {DOSSIER_CREED.honesty}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            {DOSSIER_CREED.measure}
          </p>
        </Card>
      </div>

      <Filters options={QUARTER_FILTERS} value={quarter} onChange={setQuarter} />

      {activeQuarter && (
        <Card className="mb-6 border-sky-500/25 bg-sky-500/[0.03]">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-sky-200">
              {activeQuarter.name}
            </h3>
            <Chip tone="sky">
              {activeQuarter.cefrFrom} → {activeQuarter.cefrTo}
            </Chip>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-300">
            {activeQuarter.bigPromise}
          </p>
          <p className="mt-2 text-xs italic leading-relaxed text-slate-400">
            Dịch chuyển bản sắc: {activeQuarter.identityShift}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {activeQuarter.cycles.map((c) => (
              <div
                key={c.no}
                className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <p className="text-[11px] font-bold text-slate-200">{c.name}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Ngày {c.dayFrom}–{c.dayTo} · {c.dailyMinutes}′/ngày
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                  {c.promise}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-emerald-400/80">
                  Bài ra vòng: {c.exitTest}
                </p>
                {c.examId && (
                  <p className="mt-1.5 text-[11px] leading-relaxed text-rose-400/80">
                    Đề thi: {EXAM_NAME.get(c.examId)}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/[0.04] p-3">
            <p className="text-[11px] font-bold text-amber-200">
              {activeQuarter.consolidation.name} — ngày{' '}
              {activeQuarter.consolidation.dayFrom}–
              {activeQuarter.consolidation.dayTo}
            </p>
            <div className="mt-2">
              <Bullets items={activeQuarter.consolidation.plan} />
            </div>
          </div>
          <div className="mt-3 rounded-lg border border-rose-500/20 bg-rose-500/[0.04] p-3">
            <p className="text-[11px] font-bold text-rose-200">
              Đề thi tầng: {EXAM_NAME.get(activeQuarter.graduation.examId)}
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
              {activeQuarter.graduation.note}
            </p>
          </div>
        </Card>
      )}

      {quarter === '0' && (
        <Card className="mb-6 border-emerald-500/25 bg-emerald-500/[0.03]">
          <h3 className="text-sm font-bold text-emerald-200">{WHITE_DAYS.name}</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {WHITE_DAYS.why}
          </p>
        </Card>
      )}

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label
          htmlFor="dossier-jump"
          className="text-xs font-medium text-slate-400">
          Nhảy tới ngày
        </label>
        <input
          id="dossier-jump"
          type="number"
          min={1}
          max={365}
          value={jump}
          onChange={(e) => setJump(e.target.value)}
          placeholder="1–365"
          className="w-28 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
        />
        {jump && (
          <button
            onClick={() => setJump('')}
            className="text-xs text-sky-400 hover:text-sky-300">
            Xoá
          </button>
        )}
        <span className="text-[11px] text-slate-400">
          Đang hiện {shown.length} ngày
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {shown.map((d) => (
          <DayCard key={d.day} d={d} />
        ))}
      </div>
    </div>
  );
};
