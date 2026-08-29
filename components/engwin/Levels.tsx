/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {LEVELS, PYRAMID, CYCLE_STEPS} from '../../data';
import {Card, Chip, Field, Bullets, SectionHeader} from './ui';

export const Levels: React.FC = () => {
  const [active, setActive] = useState('L1-1');
  const lv = LEVELS.find((l) => l.id === active)!;
  const tier = PYRAMID.find((t) => t.id === lv.tierId)!;
  const idx = LEVELS.findIndex((l) => l.id === active);

  return (
    <div>
      <SectionHeader
        eyebrow="Bậc thang chinh phục"
        title="25 cấp độ — 5 tầng × 5 cấp"
        lead="Mỗi cấp là một ĐỘNG TỪ mà học viên vừa làm được, không phải một danh hiệu trừu tượng — người ta tự hào vì việc mình làm được, không tự hào vì cái nhãn được dán. Mỗi cấp chạy trọn vòng 11 bước và kết thúc bằng một bài về đích thật, có huy hiệu và có quyền mở cấp tiếp theo."
      />

      {/* Bậc thang */}
      <div className="mb-8 space-y-3">
        {PYRAMID.map((t) => (
          <div key={t.id}>
            <div className="mb-2 flex items-center gap-2.5">
              <span className={`h-1 w-8 rounded-full bg-gradient-to-r ${t.color}`} />
              <span className="text-xs font-black tracking-wider text-slate-300">
                TẦNG {t.no} · {t.code}
              </span>
              <span className="text-[11px] text-slate-600">{t.name}</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {LEVELS.filter((l) => l.tierId === t.id).map((l) => (
                <button
                  key={l.id}
                  onClick={() => setActive(l.id)}
                  className={`rounded-xl border p-3 text-left transition ${
                    active === l.id
                      ? 'border-emerald-500/60 bg-emerald-500/10'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}>
                  <p className="text-[10px] font-medium text-slate-600">
                    {l.id} · Cấp {l.no}
                  </p>
                  <p className="mt-0.5 text-sm font-black tracking-wide text-slate-100">
                    {l.name}
                  </p>
                  <p className="mt-1 text-[10px] leading-snug text-slate-500">
                    {l.epithet}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Chi tiết */}
      <div className="mb-5 border-b border-slate-800 pb-4">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-xs font-medium text-slate-500">
            Cấp {idx + 1}/25 · {tier.code}
          </span>
          <h3 className="text-2xl font-black tracking-wide text-slate-100">
            {lv.name}
          </h3>
        </div>
        <p className="mt-1 text-sm italic text-emerald-300">{lv.epithet}</p>
      </div>

      <div className="space-y-4">
        <Card className={`border-0 bg-gradient-to-br ${tier.color} p-[1px]`}>
          <div className="rounded-[11px] bg-slate-950 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Nhiệm vụ của cấp độ
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              {lv.mission}
            </p>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <Field label="Điều kiện vào">
              <p className="text-slate-400">{lv.entry}</p>
            </Field>
            <Field label="Thử thách">
              <p className="text-slate-300">{lv.challenge}</p>
            </Field>
          </Card>
          <Card className="border-emerald-500/20">
            <Field label="✓ Tiêu chí đạt — phải đủ cả ba mới lên cấp">
              <Bullets items={lv.passCriteria} marker="✓" />
            </Field>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-amber-500/25 bg-gradient-to-br from-amber-500/10 to-transparent">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              🏅 Phần thưởng
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
              {lv.reward}
            </p>
          </Card>
          <Card className="border-sky-500/25">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
              🔓 Mở khoá
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
              {lv.unlocks}
            </p>
          </Card>
        </div>

        <Card>
          <Field label="Vòng 11 bước áp cho cấp độ này">
            <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
              {CYCLE_STEPS.map((s) => (
                <div
                  key={s.no}
                  className="flex items-start gap-2.5 rounded-lg bg-slate-800/30 px-3 py-2">
                  <span className="text-[11px] font-bold text-slate-500">
                    {String(s.no).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium leading-snug text-slate-200">
                      {s.name}
                    </span>
                    <span className="text-[10px] text-slate-600">{s.phase}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-slate-600">
              Chi tiết từng bước — kèm lời thoại mẫu cho cố vấn — ở tab{' '}
              <span className="font-medium text-slate-400">Học viện</span>, mục 04.
            </p>
          </Field>
        </Card>
      </div>
    </div>
  );
};
