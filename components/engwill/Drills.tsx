/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {DRILLS, METHOD_BY_ID} from '../../data';
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

export const Drills: React.FC = () => {
  const [skill, setSkill] = useState('all');
  const shown = DRILLS.filter((d) => skill === 'all' || d.skill === skill);

  return (
    <div>
      <SectionHeader
        eyebrow="Hành trình luyện tập"
        title={`${DRILLS.length} bài luyện chuẩn hoá — đọc xong là làm được ngay`}
        lead="Không có bài luyện nào mơ hồ. Mỗi bài có mục tiêu, các bước cụ thể, dấu hiệu thành công đo được, và đường nâng cấp khi bạn giỏi lên. Đây là thứ bạn thực sự làm mỗi ngày — phần còn lại của hệ thống chỉ để quyết định hôm nay làm bài nào."
      />

      <Filters
        options={[
          {id: 'all', label: 'Tất cả'},
          ...Object.entries(SKILL_LABEL)
            .filter(([id]) => DRILLS.some((d) => d.skill === id))
            .map(([id, label]) => ({id, label})),
        ]}
        value={skill}
        onChange={setSkill}
      />

      <div className="space-y-2.5">
        {shown.map((d) => (
          <Accordion
            key={d.id}
            title={d.name}
            subtitle={d.goal}
            right={
              <span className="flex items-center gap-2">
                <Chip tone="sky">{SKILL_LABEL[d.skill]}</Chip>
                <Chip tone="slate">{d.minutes}'</Chip>
              </span>
            }>
            <Field label="Các bước">
              <NumberedSteps items={d.steps} />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                  ✓ Thành công trông như thế nào
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">
                  {d.successLooksLike}
                </p>
              </div>
              <div className="rounded-lg border border-sky-500/20 bg-sky-500/5 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
                  ↗ Đường nâng cấp
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">
                  {d.progression}
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Dựa trên phương pháp">
                <div className="flex flex-wrap gap-1.5">
                  {d.methodIds.map((id) => (
                    <Chip key={id} tone="violet">
                      {METHOD_BY_ID[id]?.vnName ?? id}
                    </Chip>
                  ))}
                </div>
              </Field>
              <Field label="Trình độ phù hợp">
                <div className="flex flex-wrap gap-1.5">
                  {d.level.map((l) => (
                    <Chip key={l} tone="emerald">
                      {l}
                    </Chip>
                  ))}
                </div>
              </Field>
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
