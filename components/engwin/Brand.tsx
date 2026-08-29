/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import {
  BRAND_IDEA,
  COLORS,
  TIER_COLORS,
  COLOR_RULES,
  TYPE,
  TYPE_SCALE,
  TYPE_RULES,
  SPACING,
  LOGO_RULES,
  ASSET_KINDS,
  PHOTO_DIRECTION,
} from '../../data';
import {Card, Chip, Field, Bullets, SectionHeader} from './ui';

/** Dấu hiệu dựng bằng React — cùng hình học với tools/make-brand.mjs. */
const Monogram: React.FC<{size?: number; id?: string}> = ({
  size = 120,
  id = 'm',
}) => {
  const c = size / 2;
  const r = size * 0.42;
  const a0 = (-100 * Math.PI) / 180;
  const a1 = (220 * Math.PI) / 180;
  const p = (a: number) =>
    `${(c + r * Math.cos(a)).toFixed(2)} ${(c + r * Math.sin(a)).toFixed(2)}`;
  const bw = size * 0.072;
  const gap = size * 0.038;
  const x0 = c - (5 * bw + 4 * gap) / 2;
  const baseY = c + size * 0.155;
  const hs = [0.11, 0.165, 0.22, 0.275, 0.33].map((h) => h * size);

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <defs>
        {TIER_COLORS.map((t, i) => (
          <linearGradient key={i} id={`${id}t${i}`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={t.from} />
            <stop offset="1" stopColor={t.to} />
          </linearGradient>
        ))}
        <linearGradient id={`${id}ring`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={TIER_COLORS[0].from} />
          <stop offset="0.5" stopColor={TIER_COLORS[2].to} />
          <stop offset="1" stopColor={TIER_COLORS[4].to} />
        </linearGradient>
      </defs>
      <path
        d={`M ${p(a0)} A ${r} ${r} 0 1 1 ${p(a1)}`}
        fill="none"
        stroke={`url(#${id}ring)`}
        strokeWidth={size * 0.075}
        strokeLinecap="round"
      />
      {hs.map((h, i) => (
        <rect
          key={i}
          x={x0 + i * (bw + gap)}
          y={baseY - h}
          width={bw}
          height={h}
          rx={bw / 2}
          fill={`url(#${id}t${i})`}
        />
      ))}
    </svg>
  );
};

export const Brand: React.FC = () => (
  <div>
    <SectionHeader
      eyebrow="Hệ thống nhận diện"
      title={`${BRAND_IDEA.name} — ${BRAND_IDEA.meaning}`}
      lead={BRAND_IDEA.positioning}
    />

    {/* Ý tưởng lõi */}
    <Card className="mb-10 border-0 bg-gradient-to-br from-sky-500 via-violet-500 to-fuchsia-500 p-[1px]">
      <div className="rounded-[11px] bg-slate-950 p-6 md:p-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-10">
          <div className="shrink-0">
            <Monogram size={168} id="hero" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400">
              Ý tưởng lõi
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              {BRAND_IDEA.bigIdea}
            </p>
            <p className="mt-4 border-t border-slate-800 pt-4 text-sm leading-relaxed text-slate-400">
              {BRAND_IDEA.insideTheRing}
            </p>
          </div>
        </div>
      </div>
    </Card>

    {/* Logo */}
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
      Bốn biến thể logo
    </h3>
    <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {LOGO_RULES.variants.map((v, i) => (
        <Card key={v.id} className="flex flex-col items-center text-center">
          <div className="flex h-24 items-center justify-center">
            {v.id === 'wordmark' ? (
              <span className="text-2xl font-black tracking-tight text-slate-100">
                ENGWIN
                <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
                  365
                </span>
              </span>
            ) : v.id === 'horizontal' ? (
              <span className="flex items-center gap-2">
                <Monogram size={44} id={`v${i}`} />
                <span className="text-lg font-black tracking-tight text-slate-100">
                  ENGWIN
                  <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
                    365
                  </span>
                </span>
              </span>
            ) : v.id === 'stacked' ? (
              <span className="flex flex-col items-center gap-1">
                <Monogram size={52} id={`v${i}`} />
                <span className="text-sm font-black tracking-tight text-slate-100">
                  ENGWIN
                  <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
                    365
                  </span>
                </span>
              </span>
            ) : (
              <Monogram size={76} id={`v${i}`} />
            )}
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-100">{v.name}</p>
          <p className="mt-1 text-[11px] leading-snug text-slate-500">{v.use}</p>
        </Card>
      ))}
    </div>
    <div className="mb-10 grid gap-3 md:grid-cols-2">
      <Card>
        <Field label="Khoảng trống & cỡ nhỏ nhất">
          <p className="text-slate-300">{LOGO_RULES.clearSpace}</p>
          <p className="mt-2 text-slate-400">{LOGO_RULES.minSize}</p>
        </Field>
      </Card>
      <Card className="border-rose-500/20">
        <Field label="✕ Tuyệt đối không">
          <Bullets items={LOGO_RULES.donts} marker="✕" />
        </Field>
      </Card>
    </div>

    {/* Màu */}
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
      Bảng màu
    </h3>
    <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {Object.entries(COLORS).map(([k, c]) => (
        <div
          key={k}
          className="overflow-hidden rounded-xl border border-slate-800">
          <div className="h-16" style={{background: c.hex}} />
          <div className="p-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-semibold text-slate-100">
                {c.name}
              </span>
              <code className="font-mono text-[10px] text-slate-500">
                {c.hex}
              </code>
            </div>
            <p className="mt-1 text-[11px] leading-snug text-slate-500">
              {c.use}
            </p>
          </div>
        </div>
      ))}
    </div>

    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
      Dải màu năm tầng — chỉ dùng để chỉ tầng, không dùng trang trí
    </h4>
    <div className="mb-4 grid gap-2 sm:grid-cols-5">
      {TIER_COLORS.map((t) => (
        <div key={t.tier} className="overflow-hidden rounded-xl border border-slate-800">
          <div
            className="h-14"
            style={{background: `linear-gradient(90deg, ${t.from}, ${t.to})`}}
          />
          <div className="p-2.5">
            <p className="text-[11px] font-bold text-slate-200">
              {t.tier} · {t.code}
            </p>
            <code className="mt-0.5 block font-mono text-[9px] text-slate-600">
              {t.from} → {t.to}
            </code>
          </div>
        </div>
      ))}
    </div>
    <Card className="mb-10">
      <Field label="Luật màu">
        <Bullets items={COLOR_RULES} marker="→" />
      </Field>
    </Card>

    {/* Chữ */}
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
      Chữ
    </h3>
    <div className="mb-4 grid gap-3 md:grid-cols-3">
      {Object.entries(TYPE).map(([k, t]) => (
        <Card key={k}>
          <p className="text-lg font-bold text-slate-100">{t.family}</p>
          <p className="mt-1 text-xs text-sky-400">{t.weights}</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">{t.use}</p>
        </Card>
      ))}
    </div>
    <Card className="mb-4">
      <Field label="Thang cỡ chữ">
        <div className="space-y-2">
          {TYPE_SCALE.map((s) => (
            <div
              key={s.name}
              className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-slate-800 pb-2 last:border-0">
              <span className="w-24 shrink-0 text-sm font-semibold text-slate-200">
                {s.name}
              </span>
              <code className="w-20 shrink-0 font-mono text-[11px] text-sky-400">
                {s.size}
              </code>
              <code className="w-10 shrink-0 font-mono text-[11px] text-slate-600">
                {s.weight}
              </code>
              <span className="min-w-0 flex-1 text-[11px] text-slate-500">
                {s.use}
              </span>
            </div>
          ))}
        </div>
      </Field>
    </Card>
    <Card className="mb-10">
      <Field label="Luật chữ">
        <Bullets items={TYPE_RULES} marker="→" />
      </Field>
    </Card>

    {/* Không gian */}
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
      Khoảng cách & bo góc
    </h3>
    <Card className="mb-10">
      <div className="mb-4 flex flex-wrap items-end gap-2">
        {SPACING.scale.map((n) => (
          <div key={n} className="text-center">
            <div
              className="rounded bg-sky-500/30"
              style={{width: n, height: n, minWidth: 4}}
            />
            <span className="mt-1 block font-mono text-[10px] text-slate-600">
              {n}
            </span>
          </div>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-3">
        {Object.entries(SPACING.radius).map(([k, v]) => (
          <div key={k} className="text-center">
            <div
              className="h-14 w-14 border border-slate-700 bg-slate-800/50"
              style={{borderRadius: v}}
            />
            <span className="mt-1 block font-mono text-[10px] text-slate-600">
              {k} · {v}
            </span>
          </div>
        ))}
      </div>
      <p className="text-sm leading-relaxed text-slate-400">{SPACING.rule}</p>
    </Card>

    {/* Bộ ấn phẩm */}
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
      Bộ ấn phẩm — sinh tự động từ dữ liệu
    </h3>
    <Card className="mb-4 border-emerald-500/25">
      <Field label="Dựng lại toàn bộ">
        <div className="space-y-1.5">
          {[
            ['apt-get install -y librsvg2-bin fonts-inter', 'Cài công cụ xuất ảnh và font — một lần'],
            ['node tools/make-brand.mjs', 'Dựng tất cả: 59 SVG + 59 PNG'],
            ['node tools/make-brand.mjs --only level', 'Chỉ dựng lại huy hiệu cấp độ'],
            ['node tools/make-brand.mjs --svg-only', 'Chỉ sinh SVG, bỏ bước xuất PNG'],
          ].map(([cmd, desc]) => (
            <div
              key={cmd}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg bg-slate-950 px-3 py-2">
              <code className="font-mono text-[11px] text-emerald-300">
                {cmd}
              </code>
              <span className="text-[11px] text-slate-500">{desc}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          Không ấn phẩm nào vẽ tay. Thêm một cấp độ trong{' '}
          <code className="font-mono text-slate-400">data/levels.ts</code> là có
          thêm một huy hiệu; đổi một mã màu trong{' '}
          <code className="font-mono text-slate-400">data/brand.ts</code> là toàn
          bộ bộ ấn phẩm đổi theo.
        </p>
      </Field>
    </Card>
    <div className="mb-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {ASSET_KINDS.map((a) => (
        <Card key={a.id}>
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-bold text-slate-100">{a.name}</h4>
            <Chip tone="sky">{a.count}</Chip>
          </div>
          <code className="text-[10px] text-slate-600">{a.format}</code>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">{a.note}</p>
        </Card>
      ))}
    </div>

    {/* Nhiếp ảnh */}
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
      {PHOTO_DIRECTION.title}
    </h3>
    <Card className="mb-4 border-amber-500/25 bg-amber-500/5">
      <p className="text-sm leading-relaxed text-amber-200/90">
        {PHOTO_DIRECTION.note}
      </p>
    </Card>
    <div className="grid gap-3 md:grid-cols-2">
      <Card>
        <Field label="Luật chụp">
          <Bullets items={PHOTO_DIRECTION.rules} marker="→" />
        </Field>
      </Card>
      <Card>
        <Field label="Danh sách cảnh cần chụp">
          <div className="space-y-2">
            {PHOTO_DIRECTION.shotList.map((s) => (
              <div key={s.scene} className="rounded-lg bg-slate-800/40 p-2.5">
                <p className="text-xs font-semibold text-slate-200">{s.scene}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                  {s.shots}
                </p>
              </div>
            ))}
          </div>
        </Field>
      </Card>
    </div>

    {/* Giọng nói */}
    <Card className="mt-10">
      <Field label="Giọng thương hiệu">
        <Bullets items={BRAND_IDEA.voice} marker="→" />
      </Field>
    </Card>
  </div>
);
