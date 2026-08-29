/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {RESOURCES} from '../../data';
import {Card, Chip, SectionHeader, Filters, Field} from './ui';

const KIND_LABEL: Record<string, string> = {
  book: 'Sách',
  app: 'Ứng dụng',
  channel: 'Kênh video',
  podcast: 'Podcast',
  website: 'Website',
  exam: 'Đề thi',
  series: 'Bộ sách',
  tool: 'Công cụ',
};

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

const TIER_LABEL: Record<string, string> = {
  core: 'Xương sống',
  support: 'Hỗ trợ',
  optional: 'Tuỳ chọn',
};

export const Resources: React.FC = () => {
  const [tier, setTier] = useState('all');
  const order = {core: 0, support: 1, optional: 2} as Record<string, number>;
  const shown = RESOURCES.filter((r) => tier === 'all' || r.tier === tier).sort(
    (a, b) => order[a.tier] - order[b.tier],
  );

  return (
    <div>
      <SectionHeader
        eyebrow="Thư viện tài liệu"
        title={`${RESOURCES.length} tài liệu đã sàng lọc, mỗi thứ có vị trí rõ ràng trong lộ trình`}
        lead="Vấn đề của người tự học không phải thiếu tài liệu mà là thừa. Danh sách này không liệt kê “mọi thứ hay” — nó chỉ giữ lại những gì có chỗ đứng cụ thể: dùng ở tháng nào, để làm gì, và dùng như thế nào. Phần lớn là miễn phí."
      />

      <Filters
        options={[
          {id: 'all', label: `Tất cả (${RESOURCES.length})`},
          ...Object.entries(TIER_LABEL).map(([id, label]) => ({
            id,
            label: `${label} (${RESOURCES.filter((r) => r.tier === id).length})`,
          })),
        ]}
        value={tier}
        onChange={setTier}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {shown.map((r) => (
          <Card
            key={r.id}
            className={
              r.tier === 'core' ? 'border-l-2 border-l-sky-500/60' : undefined
            }>
            <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-base font-bold leading-snug text-slate-100">
                {r.name}
              </h3>
              <span className="flex shrink-0 gap-1.5">
                <Chip tone={r.free ? 'emerald' : 'amber'}>
                  {r.free ? 'Miễn phí' : 'Trả phí'}
                </Chip>
                <Chip tone={r.tier === 'core' ? 'sky' : 'slate'}>
                  {TIER_LABEL[r.tier]}
                </Chip>
              </span>
            </div>
            <p className="mb-3 text-xs text-slate-500">
              {KIND_LABEL[r.kind]} · {r.author}
            </p>

            <Field label="Vì sao chọn nó">
              <p className="text-slate-400">{r.why}</p>
            </Field>
            <Field label="Dùng như thế nào">
              <p className="text-slate-300">{r.howToUse}</p>
            </Field>

            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-800 pt-3">
              {r.skills.map((s) => (
                <Chip key={s} tone="violet">
                  {SKILL_LABEL[s] ?? s}
                </Chip>
              ))}
              {r.level.map((l) => (
                <Chip key={l} tone="slate">
                  {l}
                </Chip>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
