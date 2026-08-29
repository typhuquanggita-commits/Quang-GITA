/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {PLAYBOOKS} from '../../data';
import {Card, Chip, SectionHeader, Filters, Bullets} from './ui';

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

export const Playbooks: React.FC = () => {
  const [skill, setSkill] = useState('all');
  const shown = PLAYBOOKS.filter((p) => skill === 'all' || p.skill === skill);

  return (
    <div>
      <SectionHeader
        eyebrow="Chuỗi bí kíp"
        title={`${PLAYBOOKS.length} chiến thuật cô đọng — áp dụng được ngay hôm nay`}
        lead="Bí kíp không phải mẹo vặt. Mỗi cái ở đây là một đòn bẩy: một thay đổi nhỏ trong cách làm cho ra khác biệt lớn trong kết quả. Mỗi bí kíp gồm một bí mật, các nước đi cụ thể, bằng chứng vì sao nó hiệu quả, và phản mẫu — điều bạn phải ngừng làm."
      />

      <Filters
        options={[
          {id: 'all', label: 'Tất cả'},
          ...Object.entries(SKILL_LABEL)
            .filter(([id]) => PLAYBOOKS.some((p) => p.skill === id))
            .map(([id, label]) => ({id, label})),
        ]}
        value={skill}
        onChange={setSkill}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {shown.map((p) => (
          <Card key={p.id} className="flex flex-col">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Chip tone="sky">{SKILL_LABEL[p.skill]}</Chip>
              <Chip tone="emerald">{p.band}</Chip>
            </div>
            <h3 className="text-base font-bold leading-snug text-slate-100">
              {p.title}
            </h3>
            <div className="mt-3 rounded-lg border-l-2 border-amber-400/60 bg-amber-400/5 py-2.5 pl-3 pr-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                Bí mật
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-200">
                {p.secret}
              </p>
            </div>
            <div className="mt-4">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Nước đi
              </p>
              <div className="text-sm leading-relaxed text-slate-300">
                <Bullets items={p.moves} marker="→" />
              </div>
            </div>
            <div className="mt-4 border-t border-slate-800 pt-3">
              <p className="text-xs leading-relaxed text-emerald-300/80">
                <span className="font-semibold">Vì sao hiệu quả: </span>
                {p.proof}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-rose-300/70">
                <span className="font-semibold">Phản mẫu: </span>
                {p.antiPattern}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
