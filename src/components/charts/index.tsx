import { useId, useMemo, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { formatNumber, formatScore } from '../../lib/format';

/**
 * Bieu do ve tay bang SVG.
 *
 * Vi sao khong dung thu vien: cac bieu do o day it va don gian, trong khi mot
 * thu vien se keo theo hang tram KB, ap dat bang mau rieng va kho kiem soat
 * kha nang truy cap. Tu ve giup giu dung bo token mau da duoc kiem dinh cho
 * ca hai che do sang/toi va cho nguoi mu mau.
 *
 * Quy uoc chung:
 *  - Net du lieu 2px, dau mut bo tron 4px, diem danh dau >= 8px.
 *  - Luoi va truc lui ve sau (mau --c-grid), khong bao gio at noi du lieu.
 *  - Mau khong bao gio la kenh thong tin duy nhat: luon co nhan hoac bang so.
 */

const VIZ = ['var(--c-viz-1)', 'var(--c-viz-2)', 'var(--c-viz-3)'] as const;

export function vizColor(index: number): string {
  return VIZ[index % VIZ.length] as string;
}

/* ── Vòng điểm số ──────────────────────────────────────────────────────── */

export function ScoreGauge({
  value,
  max,
  target,
  caption,
  size = 168,
}: {
  value: number;
  max: number;
  target?: number;
  caption?: ReactNode;
  size?: number;
}) {
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  // Cung ho 270 do: khoang trong o duoi la cho dat chu thich.
  const arc = 0.75;
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const targetRatio = target && max > 0 ? Math.min(1, target / max) : null;

  return (
    <figure className="m-0 flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={`Điểm dự báo ${formatScore(value)} trên ${max}`}
          className="-rotate-[225deg]"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--c-grid)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference * arc} ${circumference}`}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--c-brand)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference * arc * ratio} ${circumference}`}
            className="transition-[stroke-dasharray] duration-700"
          />
          {targetRatio !== null && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--c-fg)"
              strokeWidth={stroke + 4}
              strokeDasharray={`2 ${circumference}`}
              strokeDashoffset={-circumference * arc * targetRatio}
              opacity={0.55}
            />
          )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-semibold tabular-nums tracking-tight">{formatScore(value)}</span>
          <span className="text-xs text-fg-subtle">/ {max} điểm</span>
        </div>
      </div>
      {caption && <figcaption className="text-center text-xs text-fg-muted">{caption}</figcaption>}
    </figure>
  );
}

/* ── Cột ngang có nhãn trực tiếp ───────────────────────────────────────── */

export interface BarDatum {
  label: string;
  value: number;
  /** Khe màu; bỏ trống thì dùng một màu duy nhất (chuỗi đơn). */
  colorIndex?: number;
  hint?: string;
}

export function BarList({
  data,
  max,
  format = (v) => formatNumber(Math.round(v)),
  className,
}: {
  data: readonly BarDatum[];
  max: number;
  format?: (value: number) => string;
  className?: string;
}) {
  return (
    <ul className={cn('flex flex-col gap-3', className)}>
      {data.map((d) => {
        const ratio = max > 0 ? Math.min(1, Math.max(0, d.value / max)) : 0;
        const color = d.colorIndex === undefined ? 'var(--c-brand)' : vizColor(d.colorIndex);
        return (
          <li key={d.label} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
            <span className="truncate text-sm text-fg" title={d.label}>
              {d.label}
            </span>
            {/* Nhãn trực tiếp: bắt buộc, vì màu không được là kênh thông tin duy nhất. */}
            <span className="text-sm font-medium tabular-nums text-fg">{format(d.value)}</span>
            <div className="col-span-2 h-2 overflow-hidden rounded-full bg-canvas-2">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{ width: `${ratio * 100}%`, backgroundColor: color }}
              />
            </div>
            {d.hint && <span className="col-span-2 -mt-0.5 text-xs text-fg-subtle">{d.hint}</span>}
          </li>
        );
      })}
    </ul>
  );
}

/* ── Đường xu hướng ────────────────────────────────────────────────────── */

export interface TrendPoint {
  label: string;
  value: number;
}

export function TrendLine({
  points,
  max,
  target,
  height = 200,
}: {
  points: readonly TrendPoint[];
  max: number;
  target?: number;
  height?: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const clipId = useId();
  const width = 640;
  const pad = { top: 16, right: 16, bottom: 28, left: 36 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;

  const coords = useMemo(
    () =>
      points.map((p, i) => ({
        ...p,
        x: pad.left + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW),
        y: pad.top + innerH - (Math.min(max, Math.max(0, p.value)) / max) * innerH,
      })),
    [points, max, innerH, innerW, pad.left, pad.top],
  );

  if (points.length === 0) return null;

  const path = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
  const ticks = [0, 0.25, 0.5, 0.75, 1];
  const active = hover !== null ? coords[hover] : undefined;

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label={`Xu hướng điểm qua ${points.length} lần thi thử`}
        onMouseLeave={() => setHover(null)}
      >
        <clipPath id={clipId}>
          <rect x={pad.left} y={pad.top} width={innerW} height={innerH} />
        </clipPath>

        {ticks.map((t) => {
          const y = pad.top + innerH - t * innerH;
          return (
            <g key={t}>
              <line x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke="var(--c-grid)" strokeWidth={1} />
              <text x={pad.left - 8} y={y + 4} textAnchor="end" className="fill-[var(--c-fg-subtle)] text-[10px]">
                {Math.round(t * max)}
              </text>
            </g>
          );
        })}

        {target !== undefined && target <= max && (
          <g>
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={pad.top + innerH - (target / max) * innerH}
              y2={pad.top + innerH - (target / max) * innerH}
              stroke="var(--c-fg-muted)"
              strokeWidth={1.5}
              strokeDasharray="5 4"
            />
            <text
              x={width - pad.right}
              y={pad.top + innerH - (target / max) * innerH - 6}
              textAnchor="end"
              className="fill-[var(--c-fg-muted)] text-[10px]"
            >
              Mục tiêu {target}
            </text>
          </g>
        )}

        <path
          d={path}
          fill="none"
          stroke="var(--c-brand)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          clipPath={`url(#${clipId})`}
        />

        {coords.map((c, i) => (
          <g key={`${c.label}-${i}`}>
            {/* Vùng bắt chuột rộng hơn dấu chấm để dễ trỏ trúng. */}
            <rect
              x={c.x - innerW / Math.max(1, coords.length) / 2}
              y={pad.top}
              width={innerW / Math.max(1, coords.length)}
              height={innerH}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
            />
            <circle
              cx={c.x}
              cy={c.y}
              r={hover === i ? 6 : 4.5}
              fill="var(--c-brand)"
              stroke="var(--c-surface)"
              strokeWidth={2}
            />
          </g>
        ))}

        {active && (
          <g pointerEvents="none">
            <line
              x1={active.x}
              x2={active.x}
              y1={pad.top}
              y2={pad.top + innerH}
              stroke="var(--c-line-strong)"
              strokeWidth={1}
            />
            <g transform={`translate(${Math.min(Math.max(active.x, pad.left + 60), width - pad.right - 60)}, ${pad.top + 12})`}>
              <rect x={-58} y={-14} width={116} height={30} rx={6} fill="var(--c-surface)" stroke="var(--c-line)" />
              <text textAnchor="middle" y={-1} className="fill-[var(--c-fg-muted)] text-[10px]">
                {active.label}
              </text>
              <text textAnchor="middle" y={11} className="fill-[var(--c-fg)] text-[11px] font-semibold">
                {formatScore(active.value)} điểm
              </text>
            </g>
          </g>
        )}
      </svg>
    </figure>
  );
}

/* ── Biểu đồ radar ─────────────────────────────────────────────────────── */

export interface RadarSeries {
  name: string;
  colorIndex: number;
  /** Giá trị 0..1 theo đúng thứ tự `axes`. */
  values: readonly number[];
}

export function RadarChart({
  axes,
  series,
  size = 320,
}: {
  axes: readonly string[];
  series: readonly RadarSeries[];
  size?: number;
}) {
  const center = size / 2;
  const radius = center - 56;
  const step = (Math.PI * 2) / Math.max(1, axes.length);

  const point = (index: number, value: number) => {
    const angle = index * step - Math.PI / 2;
    const r = radius * Math.min(1, Math.max(0, value));
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)] as const;
  };

  return (
    <figure className="m-0 flex flex-col items-center gap-3">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-sm"
        role="img"
        aria-label={`Mức độ thành thạo theo ${axes.length} nhóm chuyên đề`}
      >
        {[0.25, 0.5, 0.75, 1].map((ring) => (
          <polygon
            key={ring}
            points={axes.map((_, i) => point(i, ring).join(',')).join(' ')}
            fill="none"
            stroke="var(--c-grid)"
            strokeWidth={1}
          />
        ))}
        {axes.map((axis, i) => {
          const [x, y] = point(i, 1);
          const [lx, ly] = point(i, 1.2);
          return (
            <g key={axis}>
              <line x1={center} y1={center} x2={x} y2={y} stroke="var(--c-grid)" strokeWidth={1} />
              <text
                x={lx}
                y={ly}
                textAnchor={lx > center + 4 ? 'start' : lx < center - 4 ? 'end' : 'middle'}
                dominantBaseline="middle"
                className="fill-[var(--c-fg-muted)] text-[10px]"
              >
                {axis}
              </text>
            </g>
          );
        })}
        {series.map((s) => (
          <g key={s.name}>
            <polygon
              points={s.values.map((v, i) => point(i, v).join(',')).join(' ')}
              fill={vizColor(s.colorIndex)}
              fillOpacity={0.16}
              stroke={vizColor(s.colorIndex)}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {s.values.map((v, i) => {
              const [x, y] = point(i, v);
              return (
                <circle
                  key={`${s.name}-${i}`}
                  cx={x}
                  cy={y}
                  r={4}
                  fill={vizColor(s.colorIndex)}
                  stroke="var(--c-surface)"
                  strokeWidth={2}
                />
              );
            })}
          </g>
        ))}
      </svg>
      {series.length > 1 && (
        <figcaption className="flex flex-wrap justify-center gap-4">
          {series.map((s) => (
            <span key={s.name} className="inline-flex items-center gap-2 text-xs text-fg-muted">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: vizColor(s.colorIndex) }} />
              {s.name}
            </span>
          ))}
        </figcaption>
      )}
    </figure>
  );
}

/* ── Bản đồ nhiệt lịch học ─────────────────────────────────────────────── */

export interface HeatCell {
  date: string;
  value: number;
  label: string;
}

const RAMP = [
  'var(--c-ramp-0)',
  'var(--c-ramp-1)',
  'var(--c-ramp-2)',
  'var(--c-ramp-3)',
  'var(--c-ramp-4)',
  'var(--c-ramp-5)',
];

export function CalendarHeatmap({ cells, weeks = 18 }: { cells: readonly HeatCell[]; weeks?: number }) {
  const [hover, setHover] = useState<HeatCell | null>(null);
  const maxValue = Math.max(1, ...cells.map((c) => c.value));

  const columns: HeatCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) columns.push(cells.slice(i, i + 7));

  return (
    <figure className="m-0">
      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {columns.slice(-weeks).map((column, ci) => (
          <div key={ci} className="flex flex-col gap-[3px]">
            {column.map((cell) => {
              const level = cell.value === 0 ? 0 : Math.min(5, 1 + Math.floor((cell.value / maxValue) * 4));
              return (
                <button
                  key={cell.date}
                  type="button"
                  aria-label={cell.label}
                  title={cell.label}
                  onMouseEnter={() => setHover(cell)}
                  onFocus={() => setHover(cell)}
                  onMouseLeave={() => setHover(null)}
                  onBlur={() => setHover(null)}
                  className="size-3.5 rounded-[3px] transition-transform hover:scale-125"
                  style={{ backgroundColor: RAMP[level] }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <figcaption className="mt-2 flex items-center justify-between text-xs text-fg-subtle">
        <span aria-live="polite">{hover ? hover.label : 'Mỗi ô là một ngày'}</span>
        <span className="flex items-center gap-1">
          Ít
          {RAMP.map((color) => (
            <span key={color} className="size-3 rounded-[3px]" style={{ backgroundColor: color }} />
          ))}
          Nhiều
        </span>
      </figcaption>
    </figure>
  );
}

/* ── Bảng số liệu kèm theo ─────────────────────────────────────────────── */

export function DataTable({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: readonly string[];
  rows: ReadonlyArray<readonly ReactNode[]>;
}) {
  return (
    <details className="mt-3 text-sm">
      <summary className="cursor-pointer text-xs text-fg-muted hover:text-fg">Xem dạng bảng</summary>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only-focusable mb-2 text-xs text-fg-muted">{caption}</caption>
          <thead>
            <tr className="border-b border-line">
              {head.map((h) => (
                <th key={h} scope="col" className="px-2 py-1.5 text-xs font-medium text-fg-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-line/60 last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className="px-2 py-1.5 tabular-nums">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
