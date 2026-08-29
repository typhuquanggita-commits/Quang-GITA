/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import {CLUBS, CHECKPOINTS} from '../../data';
import {Card, Chip, SectionHeader, Field, Bullets, NumberedSteps} from './ui';

export const Clubs: React.FC = () => (
  <div>
    <SectionHeader
      eyebrow="Club & Kiểm định"
      title={`${CLUBS.length} câu lạc bộ + ${CHECKPOINTS.length} cổng kiểm định`}
      lead="Thuyết tự quyết nói rằng động lực bền vững cần đủ ba nhu cầu: Tự chủ, Năng lực và Kết nối. Người tự học một mình luôn thiếu vế thứ ba — và đó là lý do số một khiến họ bỏ cuộc ở tháng thứ tư. Club không phải phần thêm cho vui; nó là hạ tầng chống bỏ cuộc."
    />

    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
      Hệ thống Club — mở dần theo trình độ
    </h3>
    <div className="mb-10 space-y-4">
      {CLUBS.map((c) => (
        <Card key={c.id}>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-base font-bold text-slate-100">{c.name}</h4>
            <span className="flex flex-wrap gap-1.5">
              <Chip tone="sky">{c.frequency}</Chip>
              <Chip tone="violet">{c.size}</Chip>
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Cách vận hành">
              <NumberedSteps items={c.format} />
            </Field>
            <Field label="Luật của club">
              <Bullets items={c.rules} marker="•" />
            </Field>
          </div>

          <div className="mt-2 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                Kết quả sau 12 tuần
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                {c.outcome}
              </p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Kịch bản cho người dẫn
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                {c.hostScript}
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {c.level.map((l) => (
              <Chip key={l} tone="slate">
                {l}
              </Chip>
            ))}
          </div>
        </Card>
      ))}
    </div>

    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
      12 cổng kiểm định — không đạt thì lặp lại, không đi tiếp
    </h3>
    <div className="space-y-3">
      {CHECKPOINTS.map((cp, i) => (
        <Card key={cp.id} className="border-l-2 border-l-sky-500/50">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-bold text-slate-600">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className="font-semibold text-slate-100">{cp.name}</h4>
              <span className="text-xs text-slate-500">{cp.at}</span>
            </div>
            <Chip tone="emerald">{cp.passBand}</Chip>
          </div>
          <p className="mb-3 pl-8 text-sm leading-relaxed text-slate-300">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Bài kiểm tra ·{' '}
            </span>
            {cp.test}
          </p>
          <div className="grid gap-3 pl-8 md:grid-cols-2">
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                ✓ Nếu đạt
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                {cp.actions.ifPass}
              </p>
            </div>
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                ↻ Nếu chưa đạt
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                {cp.actions.ifFail}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);
