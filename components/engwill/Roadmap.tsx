/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {MILESTONES, METHOD_BY_ID, DRILL_BY_ID, RESOURCE_BY_ID} from '../../data';
import {Card, Chip, SectionHeader, Field, Bullets, Filters} from './ui';
import {Milestone} from '../../types';

const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const MilestoneDetail: React.FC<{m: Milestone}> = ({m}) => (
  <div className="space-y-6">
    <Card className={`border-0 bg-gradient-to-br ${m.color} p-[1px]`}>
      <div className="rounded-[11px] bg-slate-950 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Ý tưởng lớn của cột mốc
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-200">{m.bigIdea}</p>
      </div>
    </Card>

    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <Field label="Trọng tâm quý này">
          <Bullets items={m.focus} marker="→" />
        </Field>
      </Card>
      <Card>
        <Field label="Chỉ số phải đạt (KPI)">
          <div className="space-y-2.5">
            {m.kpis.map((k) => (
              <div key={k.label} className="rounded-lg bg-slate-800/40 p-2.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-slate-200">
                    {k.label}
                  </span>
                  <span className="text-sm font-semibold text-emerald-400">
                    {k.target}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-slate-500">Đo bằng: {k.how}</p>
              </div>
            ))}
          </div>
        </Field>
      </Card>
    </div>

    <Card>
      <Field label="Nhịp tuần chuẩn">
        <div className="overflow-x-auto">
          <div className="grid min-w-[860px] grid-cols-7 gap-2">
            {DAYS.map((d) => (
              <div key={d}>
                <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {d}
                </p>
                <div className="space-y-1.5">
                  {m.weeklyPlan
                    .filter((w) => w.day === d)
                    .map((w, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-slate-800 bg-slate-800/30 p-2">
                        <p className="text-[10px] text-slate-500">{w.slot}</p>
                        <p className="mt-0.5 text-[11px] font-medium leading-tight text-slate-200">
                          {DRILL_BY_ID[w.drillId]?.name ?? w.drillId}
                        </p>
                        <p className="mt-1 text-[10px] font-semibold text-sky-400">
                          {w.minutes} phút
                        </p>
                        {w.note && (
                          <p className="mt-1 text-[10px] leading-tight text-slate-500">
                            {w.note}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-[11px] text-slate-600">
          Tổng thời lượng tuần:{' '}
          <span className="font-semibold text-slate-400">
            {Math.round(
              m.weeklyPlan.reduce((s, w) => s + w.minutes, 0) / 60,
            )}{' '}
            giờ
          </span>
          {' · '}Trung bình{' '}
          <span className="font-semibold text-slate-400">
            {Math.round(m.weeklyPlan.reduce((s, w) => s + w.minutes, 0) / 7)} phút/ngày
          </span>
        </p>
      </Field>
    </Card>

    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-emerald-500/20">
        <Field label="✓ Cổng thoát — phải đạt mới được đi tiếp">
          <Bullets items={m.exitCriteria} marker="✓" />
        </Field>
      </Card>
      <Card className="border-rose-500/20">
        <Field label="⚠ Bẫy — nơi phần lớn người học gãy ở giai đoạn này">
          <Bullets items={m.traps} marker="⚠" />
        </Field>
      </Card>
    </div>

    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <Field label="Phương pháp áp dụng">
          <div className="flex flex-wrap gap-1.5">
            {m.methodIds.map((id) => (
              <Chip key={id} tone="violet">
                {METHOD_BY_ID[id]?.vnName ?? id}
              </Chip>
            ))}
          </div>
        </Field>
      </Card>
      <Card>
        <Field label="Bài luyện chính">
          <div className="flex flex-wrap gap-1.5">
            {m.drillIds.map((id) => (
              <Chip key={id} tone="sky">
                {DRILL_BY_ID[id]?.name ?? id}
              </Chip>
            ))}
          </div>
        </Field>
      </Card>
      <Card>
        <Field label="Tài liệu cần dùng">
          <div className="flex flex-wrap gap-1.5">
            {m.resourceIds.map((id) => (
              <Chip key={id} tone="amber">
                {RESOURCE_BY_ID[id]?.name ?? id}
              </Chip>
            ))}
          </div>
        </Field>
      </Card>
    </div>
  </div>
);

export const Roadmap: React.FC = () => {
  const [active, setActive] = useState(MILESTONES[0].id);
  const [year, setYear] = useState('all');
  const shown = MILESTONES.filter(
    (m) => year === 'all' || String(m.year) === year,
  );
  const m = MILESTONES.find((x) => x.id === active)!;

  return (
    <div>
      <SectionHeader
        eyebrow="Hành trình 36 tháng"
        title="12 cột mốc từ số 0 đến IELTS 8.0"
        lead="Mỗi cột mốc là một mùa 13 tuần có tên riêng, một ý tưởng lớn duy nhất, một nhịp tuần cụ thể và một cổng thoát. Không đạt cổng thoát thì lặp lại 4 tuần — đi tiếp khi nền chưa vững chính là lý do khiến người học mắc kẹt ở Band 6.0 suốt nhiều năm."
      />

      <Filters
        options={[
          {id: 'all', label: 'Cả 3 năm'},
          {id: '1', label: 'Năm 1 — Xây nền'},
          {id: '2', label: 'Năm 2 — Mở rộng'},
          {id: '3', label: 'Năm 3 — Chinh phục'},
        ]}
        value={year}
        onChange={setYear}
      />

      <div className="mb-8 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((ms) => (
          <button
            key={ms.id}
            onClick={() => setActive(ms.id)}
            className={`rounded-xl border p-3.5 text-left transition ${
              active === ms.id
                ? 'border-sky-500/60 bg-sky-500/10'
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
            }`}>
            <div className={`mb-2.5 h-1 w-10 rounded-full bg-gradient-to-r ${ms.color}`} />
            <p className="text-[10px] font-medium text-slate-500">
              {ms.id} · {ms.months}
            </p>
            <p className="mt-0.5 text-sm font-bold tracking-wide text-slate-100">
              {ms.codename}
            </p>
            <p className="mt-1.5 text-[11px] leading-snug text-slate-500">
              {ms.tagline}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <Chip tone="emerald">
                {ms.cefrFrom} → {ms.cefrTo}
              </Chip>
              <Chip tone="sky">
                {ms.bandFrom.toFixed(1)} → {ms.bandTo.toFixed(1)}
              </Chip>
            </div>
            <p className="mt-2 text-[10px] text-slate-600">
              {ms.dailyMinutes[0]}–{ms.dailyMinutes[1]} phút/ngày ·{' '}
              {ms.vocabTarget.toLocaleString('vi-VN')} từ · {ms.inputHours}h input
            </p>
          </button>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap items-baseline gap-3 border-b border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-slate-100">
          {m.id} · {m.codename}
        </h3>
        <span className="text-sm text-slate-500">{m.months}</span>
        <span className="text-sm italic text-sky-300/70">“{m.tagline}”</span>
      </div>

      <MilestoneDetail m={m} />
    </div>
  );
};
