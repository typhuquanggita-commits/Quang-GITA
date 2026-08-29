/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
// Nạp thẳng, không qua thùng chung. Xem ghi chú cuối data/index.ts.
import {STUDIO_RULES, PRODUCTION_SPECS, ROLLOUT} from '../../data/production';
import {Card, Chip, Field, Bullets, SectionHeader, Accordion} from './ui';

export const Studio: React.FC = () => {
  const kindTone: Record<string, 'sky' | 'violet' | 'emerald' | 'amber' | 'rose'> = {
    video: 'rose',
    audio: 'violet',
    'tài liệu': 'emerald',
    'bộ ảnh': 'amber',
    'công cụ': 'sky',
  };

  return (
    <div>
      <SectionHeader
        eyebrow="Xưởng học liệu"
        title={`${PRODUCTION_SPECS.length} bản thiết kế sản xuất — đưa cho ê-kíp là quay được`}
        lead="Đây là bản vẽ kỹ thuật, không phải file media. Mỗi hạng mục có cấu trúc từng phút, thông số quay dựng cụ thể, và phần tài sản tái sử dụng để không phải làm lại từ đầu cho từng cấp độ."
      />

      <Card className="mb-10 border-amber-500/25">
        <Field label={STUDIO_RULES.title}>
          <div className="space-y-3">
            {STUDIO_RULES.rules.map((r) => (
              <div key={r.no} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-[11px] font-bold text-amber-400">
                  {r.no}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-100">{r.rule}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                    {r.why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Field>
      </Card>

      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Danh mục sản xuất
      </h3>
      <div className="mb-12 space-y-2.5">
        {PRODUCTION_SPECS.map((p) => (
          <Accordion
            key={p.id}
            title={p.name}
            subtitle={p.purpose}
            right={
              <span className="flex flex-wrap justify-end gap-1.5">
                <Chip tone={kindTone[p.kind]}>{p.kind}</Chip>
                <Chip tone="slate">{p.duration}</Chip>
              </span>
            }>
            <div className="mb-4 grid gap-3 md:grid-cols-2">
              <Field label="Số lượng">
                <p className="text-slate-300">{p.quantity}</p>
              </Field>
              <Field label="Dùng ở đâu">
                <p className="text-slate-300">{p.tier}</p>
              </Field>
            </div>

            <Field label="Cấu trúc chi tiết">
              <div className="space-y-1.5">
                {p.structure.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg bg-slate-800/30 px-3 py-2">
                    <span className="w-24 shrink-0 font-mono text-[11px] font-medium text-sky-400">
                      {s.t}
                    </span>
                    <span className="min-w-0 flex-1 text-xs leading-relaxed text-slate-300">
                      {s.content}
                    </span>
                  </div>
                ))}
              </div>
            </Field>

            <Field label="Thông số kỹ thuật">
              <Bullets items={p.specs} marker="•" />
            </Field>

            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                ♻ Tài sản tái sử dụng
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                {p.reusableAssets}
              </p>
            </div>
          </Accordion>
        ))}
      </div>

      <SectionHeader
        eyebrow="Triển khai"
        title={ROLLOUT.title}
        lead={ROLLOUT.note}
      />
      <div className="grid gap-3 md:grid-cols-3">
        {ROLLOUT.phases.map((f) => (
          <Card key={f.phase}>
            <p className="text-sm font-bold text-slate-100">{f.phase}</p>
            <p className="mt-1 text-xs leading-relaxed text-sky-300/80">{f.goal}</p>
            <div className="mt-4">
              <Bullets items={f.items} marker="□" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
