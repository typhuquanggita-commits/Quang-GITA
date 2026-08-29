/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import {MINDSET_MODULES} from '../../data';
import {Card, SectionHeader, Field, Bullets} from './ui';

export const Mindset: React.FC = () => (
  <div>
    <SectionHeader
      eyebrow="Lập trình tư duy"
      title={`${MINDSET_MODULES.length} mô-đun gỡ và cài lại phần mềm bên trong`}
      lead="Đây là phần quyết định bạn có đi hết 1.095 ngày hay không. Kỹ thuật học thì ai cũng tìm được trên mạng — thứ hiếm là hệ điều hành tinh thần để không bỏ cuộc ở tháng thứ 4, tháng thứ 14 và tháng thứ 20. Mỗi mô-đun chỉ ra câu chuyện cũ đang giữ bạn lại, và câu chuyện mới thay thế nó."
    />

    <div className="space-y-4">
      {MINDSET_MODULES.map((m, i) => (
        <Card key={m.id}>
          <div className="mb-3 flex items-baseline gap-3">
            <span className="text-sm font-bold text-slate-600">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-base font-bold text-slate-100">{m.name}</h3>
          </div>

          <p className="mb-4 border-l-2 border-sky-500/50 pl-3 text-sm font-medium leading-relaxed text-slate-200">
            {m.principle}
          </p>

          <Field label="Cơ sở khoa học">
            <p className="text-slate-400">{m.science}</p>
          </Field>

          <div className="my-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-400">
                ✕ Câu chuyện cũ
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                {m.oldStory}
              </p>
            </div>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                ✓ Câu chuyện mới
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                {m.newStory}
              </p>
            </div>
          </div>

          <Field label="Nghi thức thực hành">
            <Bullets items={m.ritual} marker="→" />
          </Field>

          <p className="mt-4 rounded-lg bg-gradient-to-r from-violet-500/10 to-transparent p-3 text-sm font-medium italic leading-relaxed text-violet-200">
            “{m.affirmation}”
          </p>
        </Card>
      ))}
    </div>
  </div>
);
