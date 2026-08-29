/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {
  CASTING_NOTE,
  VIETNAMESE_TTS_LIMIT,
  VOICE_ROSTER,
  MC_DELIVERY,
  ACCENT_STANDARD,
  ACCENT_CONTRASTS,
} from '../../data';
import {Card, Chip, Field, Bullets, SectionHeader, Filters} from './ui';

export const Casting: React.FC = () => {
  const [g, setG] = useState('all');
  const shown = VOICE_ROSTER.filter((v) => g === 'all' || v.gender === g);

  return (
    <div>
      <SectionHeader
        eyebrow="Dàn giọng"
        title="10 giọng học viên chọn được"
        lead="Tuyển từ 904 giọng bằng bộ sàng lọc âm học, rồi mới nghe để chốt. Học viên chọn giọng nào thì toàn bộ nội dung phát bằng giọng đó — người nghe hai mươi phút mỗi ngày trong ba tháng cần một giọng hợp tai mình."
      />

      <Card className="mb-6 border-rose-500/40 bg-rose-500/[0.04]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-lg">⚠</span>
          <h3 className="text-sm font-bold text-rose-200">
            Giọng Việt ngoại tuyến KHÔNG có thanh điệu
          </h3>
        </div>
        <p className="mt-2 text-xs font-semibold leading-relaxed text-rose-100">
          {VIETNAMESE_TTS_LIMIT.finding}
        </p>
        <dl className="mt-3 space-y-2 text-[11px] leading-relaxed">
          <div>
            <dt className="font-semibold text-slate-300">Vì sao</dt>
            <dd className="text-slate-400">{VIETNAMESE_TTS_LIMIT.why}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-300">Bằng chứng</dt>
            <dd className="text-slate-400">{VIETNAMESE_TTS_LIMIT.evidence}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-300">Không sửa được bằng hậu kỳ</dt>
            <dd className="text-slate-400">{VIETNAMESE_TTS_LIMIT.notFixable}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-300">Vấn đề thứ hai</dt>
            <dd className="text-slate-400">{VIETNAMESE_TTS_LIMIT.secondIssue}</dd>
          </div>
          <div>
            <dt className="font-semibold text-emerald-300">Lối ra</dt>
            <dd className="text-slate-300">{VIETNAMESE_TTS_LIMIT.fix}</dd>
          </div>
        </dl>
        <code className="mt-3 block rounded-lg bg-slate-950 px-3 py-2 font-mono text-[11px] text-emerald-300">
          {VIETNAMESE_TTS_LIMIT.verify}
        </code>
      </Card>

      <Card className="mb-8 border-emerald-500/25">
        <Field label="Tuyển bằng số đo trước, bằng tai sau">
          <p className="mb-3 text-slate-300">{CASTING_NOTE.how}</p>
          <Bullets items={CASTING_NOTE.criteria} marker="→" />
          <code className="mt-3 block rounded-lg bg-slate-950 px-3 py-2 font-mono text-[11px] text-emerald-300">
            {CASTING_NOTE.command}
          </code>
          <p className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs leading-relaxed text-amber-200/90">
            {CASTING_NOTE.caveat}
          </p>
        </Field>
      </Card>

      <Filters
        options={[
          {id: 'all', label: `Cả dàn (${VOICE_ROSTER.length})`},
          {id: 'nam', label: `Nam (${VOICE_ROSTER.filter((v) => v.gender === 'nam').length})`},
          {id: 'nữ', label: `Nữ (${VOICE_ROSTER.filter((v) => v.gender === 'nữ').length})`},
        ]}
        value={g}
        onChange={setG}
      />

      <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((v) => (
          <Card key={v.id}>
            <div className="mb-2 flex items-baseline gap-2.5">
              <span className="text-2xl font-black text-slate-700">
                {String(v.no).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p className="text-base font-black tracking-wide text-slate-100">
                  {v.stageName}
                </p>
                <p className="text-[11px] text-slate-500">
                  {v.gender} · {v.age} tuổi · {v.accent}
                </p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              {v.character}
            </p>
            <Field label="Hợp nhất với">
              <p className="text-slate-400">{v.bestFor}</p>
            </Field>
            {v.measured && (
              <div className="flex flex-wrap gap-1.5 border-t border-slate-800 pt-3">
                <Chip tone="sky">F0 {v.measured.f0}Hz</Chip>
                <Chip tone="violet">sáng {v.measured.centroid}Hz</Chip>
                <Chip tone="slate">biến thiên {v.measured.variation}</Chip>
              </div>
            )}
            <code className="mt-2 block font-mono text-[10px] text-slate-700">
              {v.model} · giọng {v.speaker}
            </code>
          </Card>
        ))}
      </div>

      {/* Chất giọng MC */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Chuẩn chất giọng — theo lối MC bản tin truyền hình
      </h3>
      <div className="mb-10 space-y-2.5">
        {MC_DELIVERY.map((d) => (
          <Card key={d.id}>
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="shrink-0 md:w-40">
                <p className="text-sm font-bold text-slate-100">{d.aspect}</p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-relaxed text-emerald-300">
                  {d.target}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                  {d.why}
                </p>
                <p className="mt-2 rounded-lg bg-slate-800/40 p-2.5 text-xs leading-relaxed text-sky-200/90">
                  <span className="font-semibold">Chỉ đạo: </span>
                  {d.howToDirect}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Hai chuẩn */}
      <SectionHeader
        eyebrow="Chuẩn phát âm"
        title={ACCENT_STANDARD.title}
        lead={ACCENT_STANDARD.why}
      />
      <div className="mb-6 grid gap-3 md:grid-cols-2">
        <Card className="border-sky-500/25 bg-sky-500/5">
          <p className="text-sm font-semibold leading-relaxed text-sky-100">
            {ACCENT_STANDARD.rule}
          </p>
        </Card>
        <Card>
          <p className="text-sm leading-relaxed text-slate-400">
            {ACCENT_STANDARD.marking}
          </p>
        </Card>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-xs text-slate-500">
            <tr>
              <th className="px-4 py-2.5 font-medium">Đặc điểm</th>
              <th className="px-4 py-2.5 font-medium text-rose-400">Anh–Anh</th>
              <th className="px-4 py-2.5 font-medium text-sky-400">Anh–Mỹ</th>
              <th className="hidden px-4 py-2.5 font-medium lg:table-cell">
                Dạy ở đâu
              </th>
            </tr>
          </thead>
          <tbody>
            {ACCENT_CONTRASTS.map((a) => (
              <tr key={a.id} className="border-t border-slate-800/70 align-top">
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-200">{a.feature}</p>
                  <p className="mt-1 font-mono text-[10px] text-slate-600">
                    {a.example}
                  </p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
                    {a.matters}
                  </p>
                </td>
                <td className="px-4 py-3 text-xs leading-relaxed text-slate-300">
                  {a.gb}
                </td>
                <td className="px-4 py-3 text-xs leading-relaxed text-slate-300">
                  {a.us}
                </td>
                <td className="hidden px-4 py-3 lg:table-cell">
                  <Chip tone="violet">{a.teachAt}</Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
