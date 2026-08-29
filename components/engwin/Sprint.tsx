/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import {
  SPRINT_CREED,
  SPRINT_CYCLES,
  CONSOLIDATION_DAYS,
  SPRINT_DAY,
  MECHANISMS,
} from '../../data';
import {Card, Chip, Field, Bullets, SectionHeader} from './ui';

export const Sprint: React.FC = () => {
  const total = SPRINT_DAY.reduce((s, d) => s + d.minutes, 0);

  return (
    <div>
      <SectionHeader
        eyebrow="Lớp tăng tốc"
        title={`${SPRINT_CREED.name} — bốn vòng 21 ngày, 90 ngày đổi bậc`}
        lead="Đây là lớp tăng tốc đặt lên trên lộ trình 36 tháng, không thay thế nó. Lộ trình dài trả lời “đi đâu”. Chu kỳ 21 ngày trả lời “ba tuần tới làm gì”."
      />

      <div className="mb-8 grid gap-3 md:grid-cols-2">
        <Card>
          <Field label="Vì sao 21 ngày">
            <p className="text-slate-300">{SPRINT_CREED.why21}</p>
          </Field>
          <Field label="Vì sao 90 ngày">
            <p className="text-slate-300">{SPRINT_CREED.why90}</p>
          </Field>
        </Card>
        <Card className="border-amber-500/25 bg-amber-500/5">
          <Field label="Siêu tốc nghĩa là gì">
            <p className="text-amber-100/90">{SPRINT_CREED.speedTruth}</p>
          </Field>
          <p className="mt-3 border-t border-slate-800 pt-3 text-sm font-semibold text-amber-200">
            {SPRINT_CREED.rule}
          </p>
        </Card>
      </div>

      {/* Bốn vòng */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Bốn vòng
      </h3>
      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SPRINT_CYCLES.map((c) => (
          <Card key={c.id} className="flex flex-col">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Chip tone="sky">{c.days}</Chip>
              <Chip tone="slate">{c.dailyMinutes}′/ngày</Chip>
            </div>
            <h4 className="text-sm font-black tracking-wide text-slate-100">
              {c.name}
            </h4>
            <p className="mt-2 text-xs font-medium leading-relaxed text-emerald-300">
              {c.promise}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              {c.focus}
            </p>
            <div className="mt-3 border-t border-slate-800 pt-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-400">
                Cơ chế
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                {c.mechanism}
              </p>
            </div>
            <div className="mt-3 rounded-lg bg-slate-800/40 p-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Cổng thoát
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
                {c.exitTest}
              </p>
            </div>
          </Card>
        ))}
      </div>
      <Card className="mb-10 border-violet-500/25">
        <Field label={CONSOLIDATION_DAYS.name}>
          <p className="mb-2 text-sm font-semibold text-violet-200">
            {CONSOLIDATION_DAYS.what}
          </p>
          <p className="mb-3 text-slate-400">{CONSOLIDATION_DAYS.why}</p>
          <Bullets items={CONSOLIDATION_DAYS.plan} marker="→" />
        </Field>
      </Card>

      {/* Một ngày */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Một ngày trong chu kỳ — {total} phút chia sáu khối
      </h3>
      <p className="mb-4 max-w-3xl text-sm leading-relaxed text-slate-500">
        Cùng một lượng tiếp xúc, chia thành sáu lần cách nhau trong ngày cho kết
        quả nhớ tốt hơn hẳn dồn một lần. Ba câu mục tiêu của ngày xuất hiện ở cả
        sáu khối, cách nhau từ hai tới tám giờ.
      </p>
      <div className="mb-10 space-y-2.5">
        {SPRINT_DAY.map((d, i) => (
          <Card key={d.slot} className="border-l-2 border-l-sky-500/50">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="shrink-0 md:w-44">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-sky-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-bold tracking-wide text-slate-100">
                    {d.slot}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">{d.clock}</p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-200">{d.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  {d.what}
                </p>
                <div className="mt-2.5 grid gap-2 md:grid-cols-2">
                  <div className="rounded-lg bg-slate-800/40 p-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-400">
                      Cơ chế
                    </p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400">
                      {d.mechanism}
                    </p>
                  </div>
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                      Trong app
                    </p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-300">
                      {d.appAction}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Cơ chế */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Năm cơ chế thật — và những gì chúng tôi không đưa vào
      </h3>
      <div className="space-y-3">
        {MECHANISMS.map((m) => {
          const warn = m.id === 'm-notreal';
          return (
            <Card
              key={m.id}
              className={warn ? 'border-rose-500/30 bg-rose-500/5' : undefined}>
              <h4
                className={`text-sm font-bold ${warn ? 'text-rose-300' : 'text-slate-100'}`}>
                {m.name}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {m.claim}
              </p>
              <Field label="Bằng chứng">
                <p className="text-slate-400">{m.evidence}</p>
              </Field>
              <Field label={warn ? 'Thay bằng gì' : 'Dùng ở đâu trong ngày'}>
                <p className="text-emerald-300/90">{m.howWeUse}</p>
              </Field>
              <div
                className={`rounded-lg border p-3 ${warn ? 'border-rose-500/30 bg-rose-500/10' : 'border-rose-500/20 bg-rose-500/5'}`}>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-400">
                  {warn ? '✕ Không đưa vào hệ thống' : '⚠ Không phải là'}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">
                  {m.notThis}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
