/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {EXAM_CREED, GRADUATION_EXAMS} from '../../data';
import {Card, Chip, Field, SectionHeader, Filters, Accordion} from './ui';

export const Exams: React.FC = () => {
  const [scope, setScope] = useState('all');
  const shown = GRADUATION_EXAMS.filter((e) => scope === 'all' || e.scope === scope);

  return (
    <div>
      <SectionHeader
        eyebrow="Thi tốt nghiệp"
        title={`${GRADUATION_EXAMS.length} bài thi — 4 cuối vòng 21 ngày, 5 cuối tầng`}
        lead="Mọi tiêu chí đạt đều là một con số quan sát được: độ trễ tính bằng giây, độ chính xác tính bằng phần trăm, số từ đệm mỗi phút. Không có tiêu chí nào là “nói khá trôi chảy”."
      />

      <div className="mb-8 grid gap-3 md:grid-cols-3">
        <Card className="border-emerald-500/25">
          <Field label="Đo được bằng số">
            <p className="text-slate-300">{EXAM_CREED.measurable}</p>
          </Field>
        </Card>
        <Card className="border-sky-500/25">
          <Field label="Không có bất ngờ">
            <p className="text-slate-300">{EXAM_CREED.noSurprise}</p>
          </Field>
        </Card>
        <Card className="border-amber-500/25">
          <Field label="Trượt thì sao">
            <p className="text-slate-300">{EXAM_CREED.ifFail}</p>
          </Field>
        </Card>
      </div>

      <Filters
        options={[
          {id: 'all', label: `Tất cả (${GRADUATION_EXAMS.length})`},
          {id: 'vòng', label: `Cuối vòng 21 ngày (${GRADUATION_EXAMS.filter((e) => e.scope === 'vòng').length})`},
          {id: 'tầng', label: `Cuối tầng (${GRADUATION_EXAMS.filter((e) => e.scope === 'tầng').length})`},
        ]}
        value={scope}
        onChange={setScope}
      />

      <div className="space-y-2.5">
        {shown.map((e) => (
          <Accordion
            key={e.id}
            title={e.name}
            subtitle={`${e.ref} · ${e.when}`}
            right={
              <span className="flex flex-wrap justify-end gap-1.5">
                <Chip tone={e.scope === 'vòng' ? 'sky' : 'violet'}>{e.scope}</Chip>
                <Chip tone="slate">{e.duration}</Chip>
              </span>
            }>
            <Field label={`${e.sections.length} phần thi`}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="text-xs text-slate-500">
                    <tr className="border-b border-slate-800">
                      <th className="w-8 py-2 font-medium">#</th>
                      <th className="py-2 pr-3 font-medium">Phần</th>
                      <th className="py-2 pr-3 font-medium">Nội dung</th>
                      <th className="w-14 py-2 font-medium">Phút</th>
                      <th className="py-2 font-medium">Ngưỡng đạt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {e.sections.map((s) => (
                      <tr key={s.no} className="border-b border-slate-900 align-top">
                        <td className="py-2 text-xs font-bold text-slate-600">
                          {s.no}
                        </td>
                        <td className="py-2 pr-3 text-xs font-semibold text-slate-200">
                          {s.name}
                        </td>
                        <td className="py-2 pr-3 text-xs leading-relaxed text-slate-400">
                          {s.task}
                        </td>
                        <td className="py-2 text-xs text-slate-500">
                          {s.minutes || '—'}
                        </td>
                        <td className="py-2 text-xs font-medium text-emerald-300">
                          {s.scores}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Field>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                  ✓ Điều kiện đạt
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                  {e.passMark}
                </p>
              </div>
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                  ↻ Nếu chưa đạt
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                  {e.ifFail}
                </p>
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Coi thi
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                  {e.proctoring}
                </p>
              </div>
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
