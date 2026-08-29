/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {FEEDBACK_CREED, FEEDBACK_SECTIONS, ERROR_REMEDIES} from '../../data';
import React, {useState} from 'react';

import {Card, Chip, Field, Bullets, NumberedSteps, SectionHeader, Filters, Accordion} from './ui';

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

export const Grading: React.FC = () => {
  const [skill, setSkill] = useState('all');
  const shown = ERROR_REMEDIES.filter((e) => skill === 'all' || e.skill === skill);
  const sevTone = {nặng: 'rose', vừa: 'amber', nhẹ: 'sky'} as const;

  return (
    <div>
      <SectionHeader
        eyebrow="Quy trình chấm bài"
        title="Bốn phần bắt buộc sau mọi bài nộp"
        lead="Chỉ ra lỗi là tám phần trăm công việc. Chín mươi hai phần trăm giá trị nằm ở phần sau đó: chiến lược, phác đồ khắc phục và bài luyện. Cố vấn nào chỉ gạch đỏ rồi cho điểm là đang làm tám phần trăm."
      />

      <div className="mb-8 grid gap-3 md:grid-cols-2">
        <Card className="border-sky-500/30 bg-sky-500/5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
            Cam kết thời gian
          </p>
          <p className="mt-1 text-lg font-bold text-slate-100">
            {FEEDBACK_CREED.sla}
          </p>
        </Card>
        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
            Luật một mục tiêu
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-200">
            {FEEDBACK_CREED.oneTarget}
          </p>
        </Card>
      </div>
      <Card className="mb-10">
        <Field label="Nguyên tắc nêu điểm mạnh">
          <p className="text-slate-300">{FEEDBACK_CREED.strengthFirst}</p>
        </Field>
        <Field label="Nguyên tắc bản làm lại">
          <p className="text-slate-300">{FEEDBACK_CREED.rework}</p>
        </Field>
      </Card>

      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Bốn phần của một bản phản hồi — mẫu dùng được ngay
      </h3>
      <div className="mb-12 space-y-3">
        {FEEDBACK_SECTIONS.map((s) => (
          <Accordion
            key={s.no}
            title={
              <span>
                <span className="mr-2.5 text-sky-400">
                  {String(s.no).padStart(2, '0')}
                </span>
                {s.name}
              </span>
            }
            subtitle={s.purpose}
            defaultOpen={s.no === 1}>
            <pre className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-[11px] leading-relaxed text-slate-300">
              {s.template}
            </pre>
            <p className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs leading-relaxed text-amber-200/90">
              <span className="font-semibold">Luật: </span>
              {s.rule}
            </p>
          </Accordion>
        ))}
      </div>

      <SectionHeader
        eyebrow="Thư viện lỗi"
        title={`${ERROR_REMEDIES.length} phác đồ khắc phục — tra mã, dán vào, cá nhân hoá`}
        lead="Mỗi phác đồ có nguyên nhân gốc (vì sao người Việt mắc lỗi này), chiến lược, các bước sửa, hai bài luyện dưới 20 phút, và tiêu chí quan sát được để biết khi nào lỗi đã đóng. Mã lỗi thống nhất toàn học viện."
      />

      <Filters
        options={[
          {id: 'all', label: `Tất cả (${ERROR_REMEDIES.length})`},
          ...Object.entries(SKILL_LABEL)
            .filter(([id]) => ERROR_REMEDIES.some((e) => e.skill === id))
            .map(([id, label]) => ({
              id,
              label: `${label} (${ERROR_REMEDIES.filter((e) => e.skill === id).length})`,
            })),
        ]}
        value={skill}
        onChange={setSkill}
      />

      <div className="space-y-2.5">
        {shown.map((e) => (
          <Accordion
            key={e.id}
            title={
              <span className="flex flex-wrap items-baseline gap-2.5">
                <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[11px] text-sky-400">
                  {e.code}
                </span>
                <span>{e.error}</span>
              </span>
            }
            subtitle={e.rootCause.slice(0, 120) + '…'}
            right={
              <span className="flex gap-1.5">
                <Chip tone={sevTone[e.severity]}>{e.severity}</Chip>
                <Chip tone="slate">{SKILL_LABEL[e.skill]}</Chip>
              </span>
            }>
            <div className="mb-4 grid gap-2.5 md:grid-cols-2">
              <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-400">
                  ✕ Sai
                </p>
                <p className="mt-1 font-mono text-xs leading-relaxed text-slate-300">
                  {e.example.wrong}
                </p>
              </div>
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                  ✓ Đúng
                </p>
                <p className="mt-1 font-mono text-xs leading-relaxed text-slate-300">
                  {e.example.right}
                </p>
              </div>
            </div>

            <Field label="Nguyên nhân gốc">
              <p className="text-slate-400">{e.rootCause}</p>
            </Field>
            <Field label="Chiến lược">
              <p className="text-sky-300/90">{e.strategy}</p>
            </Field>
            <Field label="Các bước sửa">
              <NumberedSteps items={e.fixSteps} />
            </Field>
            <Field label="Bài luyện 14 ngày">
              <div className="space-y-2">
                {e.drills.map((d) => (
                  <div key={d.name} className="rounded-lg bg-slate-800/40 p-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-200">
                        {d.name}
                      </span>
                      <span className="text-xs font-medium text-sky-400">
                        {d.minutes}′/ngày
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      {d.how}
                    </p>
                  </div>
                ))}
              </div>
            </Field>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                ✓ Nhuần nhuyễn khi
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                {e.masteredWhen}
              </p>
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
