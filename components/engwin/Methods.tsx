/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {METHODS} from '../../data';
import {Accordion, Chip, SectionHeader, Field, NumberedSteps, Filters} from './ui';

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

export const Methods: React.FC = () => {
  const [skill, setSkill] = useState('all');
  const shown = METHODS.filter(
    (m) => skill === 'all' || m.bestFor.includes(skill as never),
  ).sort((a, b) => b.power - a.power);

  return (
    <div>
      <SectionHeader
        eyebrow="Thư viện phương pháp"
        title={`${METHODS.length} phương pháp mạnh nhất thế giới, đã sàng lọc cho người Việt`}
        lead="Tiêu chí đưa vào: (1) có cơ sở nghiên cứu, (2) người Việt tự làm được không cần lớp học, (3) cho kết quả đo lường được trong vòng 8 tuần. Mỗi phương pháp đều kèm cái bẫy thường gặp — vì làm sai một phương pháp tốt còn tệ hơn không làm."
      />

      <Filters
        options={[
          {id: 'all', label: 'Tất cả'},
          ...Object.entries(SKILL_LABEL).map(([id, label]) => ({id, label})),
        ]}
        value={skill}
        onChange={setSkill}
      />

      <div className="space-y-2.5">
        {shown.map((m) => (
          <Accordion
            key={m.id}
            title={
              <span className="flex flex-wrap items-baseline gap-2">
                <span>{m.vnName}</span>
                <span className="text-xs font-normal text-slate-400">
                  {m.name}
                </span>
              </span>
            }
            subtitle={m.what}
            right={
              <span className="flex items-center gap-2">
                <span className="text-[11px] text-amber-400">
                  {'★'.repeat(m.power)}
                </span>
                {m.costMinutes > 0 && (
                  <Chip tone="slate">{m.costMinutes}'/ngày</Chip>
                )}
              </span>
            }>
            <Field label="Nguồn gốc & cơ sở">
              <p className="text-slate-400">
                <span className="font-medium text-slate-300">{m.origin}</span> —{' '}
                {m.evidence}
              </p>
            </Field>
            <Field label="Cách làm">
              <NumberedSteps items={m.how} />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Phù hợp cho">
                <div className="flex flex-wrap gap-1.5">
                  {m.bestFor.map((s) => (
                    <Chip key={s} tone="sky">
                      {SKILL_LABEL[s] ?? s}
                    </Chip>
                  ))}
                </div>
              </Field>
              <Field label="Dùng ở cột mốc">
                <div className="flex flex-wrap gap-1.5">
                  {m.phases.map((p) => (
                    <Chip key={p} tone="violet">
                      {p}
                    </Chip>
                  ))}
                </div>
              </Field>
            </div>
            <div className="mt-2 rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-400">
                ⚠ Cái bẫy
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                {m.pitfall}
              </p>
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
