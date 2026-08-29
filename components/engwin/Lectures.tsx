/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {LECTURE_SERIES, TOTAL_LESSONS, DRILL_BY_ID} from '../../data';
import {Card, Chip, SectionHeader, Filters, Stat} from './ui';

export const Lectures: React.FC = () => {
  const [active, setActive] = useState(LECTURE_SERIES[0].id);
  const s = LECTURE_SERIES.find((x) => x.id === active)!;
  const totalMinutes = s.lessons.reduce((a, l) => a + l.minutes, 0);

  return (
    <div>
      <SectionHeader
        eyebrow="Chuỗi bài giảng"
        title={`${LECTURE_SERIES.length} chuỗi · ${TOTAL_LESSONS} bài giảng phủ trọn 36 tháng`}
        lead="Định dạng chuẩn mỗi bài: 4 phút khái niệm → 8 phút minh hoạ → 6 phút làm cùng → 2 phút giao bài. Không bài nào dài quá 20 phút và không bài nào thiếu bài tập — vì một bài giảng không có bài tập chỉ là giải trí có kiến thức."
      />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat value={String(TOTAL_LESSONS)} label="Tổng bài giảng" />
        <Stat
          value={`${Math.round(
            LECTURE_SERIES.reduce(
              (a, x) => a + x.lessons.reduce((b, l) => b + l.minutes, 0),
              0,
            ) / 60,
          )}h`}
          label="Tổng thời lượng"
        />
        <Stat value={String(LECTURE_SERIES.length)} label="Chuỗi" />
        <Stat value="5" label="Tuyến học" sub="Foundation → IELTS" />
      </div>

      <Filters
        options={LECTURE_SERIES.map((l) => ({
          id: l.id,
          label: l.name.split(' — ')[0],
        }))}
        value={active}
        onChange={setActive}
      />

      <Card className="mb-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Chip tone="violet">{s.track}</Chip>
          <Chip tone="sky">{s.season}</Chip>
          <Chip tone="emerald">{s.totalLessons} bài</Chip>
          <Chip tone="amber">{s.cadence}</Chip>
          <Chip tone="slate">{Math.round(totalMinutes / 60)} giờ</Chip>
        </div>
        <h3 className="text-lg font-bold text-slate-100">{s.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.promise}</p>
        <p className="mt-3 border-t border-slate-800 pt-3 text-xs text-slate-500">
          <span className="font-semibold text-slate-400">Định dạng: </span>
          {s.format}
        </p>
      </Card>

      <div className="overflow-hidden rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-xs text-slate-500">
            <tr>
              <th className="w-12 px-4 py-2.5 font-medium">#</th>
              <th className="px-4 py-2.5 font-medium">Bài giảng</th>
              <th className="hidden px-4 py-2.5 font-medium md:table-cell">
                Kết quả đầu ra
              </th>
              <th className="w-16 px-4 py-2.5 text-right font-medium">Phút</th>
            </tr>
          </thead>
          <tbody>
            {s.lessons.map((l) => (
              <tr
                key={l.no}
                className="border-t border-slate-800/70 transition hover:bg-slate-800/30">
                <td className="px-4 py-2.5 text-xs font-semibold text-slate-600">
                  {String(l.no).padStart(2, '0')}
                </td>
                <td className="px-4 py-2.5">
                  <p className="font-medium text-slate-200">{l.title}</p>
                  {l.drillId && (
                    <p className="mt-1 text-[11px] text-sky-400">
                      ▸ Bài tập: {DRILL_BY_ID[l.drillId]?.name ?? l.drillId}
                    </p>
                  )}
                  {l.trap && (
                    <p className="mt-1 text-[11px] leading-relaxed text-amber-400/85">
                      ⚠ Bẫy: {l.trap}
                      {l.remedyCode && (
                        <span className="ml-1 rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium text-amber-300">
                          {l.remedyCode}
                        </span>
                      )}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-slate-500 md:hidden">
                    {l.outcome}
                  </p>
                </td>
                <td className="hidden px-4 py-2.5 text-xs text-slate-500 md:table-cell">
                  {l.outcome}
                </td>
                <td className="px-4 py-2.5 text-right text-xs text-slate-500">
                  {l.minutes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
