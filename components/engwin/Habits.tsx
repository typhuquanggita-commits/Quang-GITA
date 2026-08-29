/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import {HABITS, RITUALS} from '../../data';
import {Card, Chip, SectionHeader, Field, NumberedSteps} from './ui';

const SCOPE_LABEL: Record<string, string> = {
  day: 'Mỗi ngày',
  week: 'Mỗi tuần',
  month: 'Mỗi tháng',
  quarter: 'Mỗi quý',
};

export const Habits: React.FC = () => (
  <div>
    <SectionHeader
      eyebrow="Kiến trúc thói quen"
      title={`${HABITS.length} thói quen + ${RITUALS.length} nghi thức — cài theo thứ tự, không cài cùng lúc`}
      lead="Ý chí là nguồn lực cạn kiệt; hệ thống thì không. Mỗi quý chỉ cài 1–2 thói quen mới — tham hơn là hỏng cả hệ. Mỗi thói quen có phiên bản 2 phút cho ngày bận nhất, vì mục tiêu của ngày đó không phải tiến bộ mà là giữ chuỗi."
    />

    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
      Nhịp sinh hoạt
    </h3>
    <div className="mb-10 grid gap-4 lg:grid-cols-2">
      {RITUALS.map((r) => (
        <Card key={r.id}>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-semibold text-slate-100">{r.name}</h4>
            <span className="flex gap-1.5">
              <Chip tone="violet">{SCOPE_LABEL[r.scope]}</Chip>
              <Chip tone="slate">{r.minutes}'</Chip>
            </span>
          </div>
          <p className="mb-3 text-xs text-sky-400">{r.when}</p>
          <div className="text-sm leading-relaxed text-slate-300">
            <NumberedSteps items={r.steps} />
          </div>
          <p className="mt-4 border-t border-slate-800 pt-3 text-xs leading-relaxed text-slate-400">
            <span className="font-semibold text-slate-400">Vì sao: </span>
            {r.why}
          </p>
        </Card>
      ))}
    </div>

    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
      12 thói quen — theo đúng thứ tự cài đặt
    </h3>
    <div className="grid gap-4 lg:grid-cols-2">
      {HABITS.map((h, i) => (
        <Card key={h.id}>
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex items-baseline gap-2.5">
              <span className="text-sm font-bold text-slate-400">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className="font-semibold text-slate-100">{h.name}</h4>
            </div>
            <Chip tone="emerald">{h.installWeek}</Chip>
          </div>

          <div className="mb-4 space-y-1.5 rounded-lg bg-slate-800/30 p-3 text-sm">
            <p className="text-slate-300">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
                Tín hiệu ·{' '}
              </span>
              {h.cue}
            </p>
            <p className="text-slate-300">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-400">
                Hành vi ·{' '}
              </span>
              {h.routine}
            </p>
            <p className="text-slate-300">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                Phần thưởng ·{' '}
              </span>
              {h.reward}
            </p>
          </div>

          <Field label="Phiên bản 2 phút (cho ngày bận nhất)">
            <p className="text-emerald-300/90">{h.twoMinuteVersion}</p>
          </Field>
          <Field label="Bản sắc">
            <p className="italic text-slate-400">“{h.identity}”</p>
          </Field>
          <Field label="Đo bằng">
            <p className="text-slate-400">{h.metric}</p>
          </Field>
        </Card>
      ))}
    </div>
  </div>
);
