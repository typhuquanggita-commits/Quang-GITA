/**
 * Charts.
 *
 * Hand-drawn SVG rather than a charting library: every mark inherits the
 * theme's CSS custom properties, so a chart is correct in light, dark, and
 * high-contrast without a second palette, and each one ships a text
 * alternative instead of being hidden from assistive technology.
 */

import React, { useId } from 'react';
import { formatClock } from '../../lib/util.ts';

const PALETTE = [
  'var(--primary)',
  'var(--rw)',
  'var(--math)',
  'var(--accent)',
  'var(--success)',
  'var(--info)',
];

export function seriesColor(index: number): string {
  return PALETTE[index % PALETTE.length];
}

function niceTicks(min: number, max: number, count = 5): number[] {
  if (min === max) return [min];
  const span = max - min;
  const rawStep = span / (count - 1);
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const normalised = rawStep / magnitude;
  const step = (normalised >= 5 ? 10 : normalised >= 2 ? 5 : normalised >= 1 ? 2 : 1) * magnitude;
  const start = Math.floor(min / step) * step;
  const ticks: number[] = [];
  for (let value = start; value <= max + step * 0.5; value += step) {
    ticks.push(Number(value.toFixed(6)));
  }
  return ticks;
}

/* ---------------- Bar chart ---------------- */

export function BarChart({
  data,
  height = 200,
  formatValue = (v: number) => String(Math.round(v)),
  description,
  colorAt,
  max: maxOverride,
}: {
  data: Array<{ label: string; value: number }>;
  height?: number;
  formatValue?(value: number): string;
  description: string;
  colorAt?(index: number): string;
  max?: number;
}): React.ReactElement {
  const width = 520;
  const padding = { top: 16, right: 12, bottom: 34, left: 42 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;
  const max = maxOverride ?? Math.max(1, ...data.map((d) => d.value));
  const ticks = niceTicks(0, max, 4);
  const scaleMax = Math.max(max, ticks[ticks.length - 1]);
  const bandWidth = plotW / Math.max(1, data.length);
  const barWidth = Math.min(46, bandWidth * 0.62);

  return (
    <figure style={{ margin: 0 }}>
      <svg
        className="chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={description}
        preserveAspectRatio="xMidYMid meet"
      >
        {ticks.map((tick) => {
          const y = padding.top + plotH - (tick / scaleMax) * plotH;
          return (
            <g key={tick}>
              <line className="grid-line" x1={padding.left} x2={width - padding.right} y1={y} y2={y} />
              <text x={padding.left - 8} y={y + 3.5} textAnchor="end">
                {formatValue(tick)}
              </text>
            </g>
          );
        })}

        {data.map((datum, index) => {
          const barHeight = Math.max(2, (datum.value / scaleMax) * plotH);
          const x = padding.left + index * bandWidth + (bandWidth - barWidth) / 2;
          const y = padding.top + plotH - barHeight;
          return (
            <g key={`${datum.label}-${index}`}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={4}
                fill={colorAt ? colorAt(index) : 'var(--primary)'}
              />
              <text x={x + barWidth / 2} y={y - 5} textAnchor="middle" style={{ fill: 'var(--text-secondary)' }}>
                {formatValue(datum.value)}
              </text>
              <text x={x + barWidth / 2} y={height - 12} textAnchor="middle">
                {datum.label}
              </text>
            </g>
          );
        })}

        <line className="axis-line" x1={padding.left} x2={width - padding.right} y1={padding.top + plotH} y2={padding.top + plotH} />
      </svg>
    </figure>
  );
}

/* ---------------- Line chart ---------------- */

export function LineChart({
  series,
  height = 220,
  yMin,
  yMax,
  formatY = (v: number) => String(Math.round(v)),
  formatX = (v: number) => String(v),
  description,
}: {
  series: Array<{ name: string; points: Array<[number, number]>; color?: string }>;
  height?: number;
  yMin?: number;
  yMax?: number;
  formatY?(value: number): string;
  formatX?(value: number): string;
  description: string;
}): React.ReactElement {
  const width = 560;
  const padding = { top: 16, right: 18, bottom: 32, left: 46 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;
  const clipId = useId();

  const allPoints = series.flatMap((s) => s.points);
  if (allPoints.length === 0) {
    return <p className="muted text-sm">{description}</p>;
  }

  const xs = allPoints.map((p) => p[0]);
  const ys = allPoints.map((p) => p[1]);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const y0 = yMin ?? Math.min(...ys);
  const y1 = yMax ?? Math.max(...ys);
  const ySpan = y1 - y0 || 1;
  const xSpan = x1 - x0 || 1;

  const sx = (x: number) => padding.left + ((x - x0) / xSpan) * plotW;
  const sy = (y: number) => padding.top + plotH - ((y - y0) / ySpan) * plotH;
  const ticks = niceTicks(y0, y1, 5);

  return (
    <figure style={{ margin: 0 }}>
      <svg
        className="chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={description}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={padding.left} y={padding.top} width={plotW} height={plotH} />
          </clipPath>
        </defs>

        {ticks.map((tick) => (
          <g key={tick}>
            <line className="grid-line" x1={padding.left} x2={width - padding.right} y1={sy(tick)} y2={sy(tick)} />
            <text x={padding.left - 8} y={sy(tick) + 3.5} textAnchor="end">
              {formatY(tick)}
            </text>
          </g>
        ))}

        <g clipPath={`url(#${clipId})`}>
          {series.map((s, index) => {
            const color = s.color ?? seriesColor(index);
            const d = s.points
              .map((point, i) => `${i === 0 ? 'M' : 'L'}${sx(point[0]).toFixed(1)},${sy(point[1]).toFixed(1)}`)
              .join(' ');
            return (
              <g key={s.name}>
                <path className="series-line" d={d} stroke={color} />
                {s.points.map((point, i) => (
                  <circle
                    key={i}
                    className="series-dot"
                    cx={sx(point[0])}
                    cy={sy(point[1])}
                    r={3.2}
                    stroke={color}
                  />
                ))}
              </g>
            );
          })}
        </g>

        <line className="axis-line" x1={padding.left} x2={width - padding.right} y1={padding.top + plotH} y2={padding.top + plotH} />
        <text x={padding.left} y={height - 10}>{formatX(x0)}</text>
        <text x={width - padding.right} y={height - 10} textAnchor="end">{formatX(x1)}</text>
      </svg>

      {series.length > 1 && (
        <div className="legend" style={{ marginTop: 'var(--space-2)' }}>
          {series.map((s, index) => (
            <span key={s.name}>
              <i style={{ background: s.color ?? seriesColor(index) }} />
              {s.name}
            </span>
          ))}
        </div>
      )}
    </figure>
  );
}

/* ---------------- Horizontal mastery bars ---------------- */

export function MasteryBars({
  rows,
  formatValue = (v: number) => `${Math.round(v * 100)}%`,
}: {
  rows: Array<{ label: string; value: number; meta?: string; color?: string }>;
  formatValue?(value: number): string;
}): React.ReactElement {
  return (
    <div>
      {rows.map((row) => (
        <div className="mastery-row" key={row.label}>
          <div style={{ minWidth: 0 }}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.label}</div>
            {row.meta && <div className="text-xs muted">{row.meta}</div>}
          </div>
          <div
            className="bar"
            role="progressbar"
            aria-valuenow={Math.round(row.value * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={row.label}
          >
            <i
              style={{
                width: `${Math.max(2, Math.min(100, row.value * 100))}%`,
                background:
                  row.color ??
                  (row.value >= 0.8 ? 'var(--success)' : row.value >= 0.55 ? 'var(--primary)' : 'var(--warning)'),
              }}
            />
          </div>
          <div className="text-sm semibold" style={{ textAlign: 'right' }}>
            {formatValue(row.value)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Donut ---------------- */

export function Donut({
  slices,
  size = 160,
  thickness = 22,
  centerLabel,
  description,
}: {
  slices: Array<{ label: string; value: number; color?: string }>;
  size?: number;
  thickness?: number;
  centerLabel?: React.ReactNode;
  description: string;
}): React.ReactElement {
  const total = slices.reduce((acc, s) => acc + s.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="row gap-5 wrap">
      <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
        <svg width={size} height={size} role="img" aria-label={description}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--surface-3)" strokeWidth={thickness} />
          {total > 0 &&
            slices.map((slice, index) => {
              const fraction = slice.value / total;
              const dash = fraction * circumference;
              const element = (
                <circle
                  key={slice.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={slice.color ?? seriesColor(index)}
                  strokeWidth={thickness}
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={-offset}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              );
              offset += dash;
              return element;
            })}
        </svg>
        {centerLabel && (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeContent: 'center', textAlign: 'center' }}>
            {centerLabel}
          </div>
        )}
      </div>
      <ul className="stack gap-2 text-sm" style={{ listStyle: 'none' }}>
        {slices.map((slice, index) => (
          <li key={slice.label} className="row gap-2">
            <i
              style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                background: slice.color ?? seriesColor(index),
                display: 'inline-block',
                flex: 'none',
              }}
            />
            <span className="grow">{slice.label}</span>
            <span className="semibold">{slice.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Pacing comparison ---------------- */

export function PacingChart({
  rows,
  description,
}: {
  rows: Array<{ label: string; actual: number; target: number }>;
  description: string;
}): React.ReactElement {
  const width = 520;
  const rowHeight = 42;
  const height = rows.length * rowHeight + 26;
  const labelW = 92;
  const plotW = width - labelW - 60;
  const max = Math.max(1, ...rows.flatMap((r) => [r.actual, r.target])) * 1.12;

  return (
    <figure style={{ margin: 0 }}>
      <svg className="chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={description}>
        {rows.map((row, index) => {
          const y = index * rowHeight + 12;
          const actualW = (row.actual / max) * plotW;
          const targetX = labelW + (row.target / max) * plotW;
          const over = row.actual > row.target * 1.15;
          return (
            <g key={row.label}>
              <text x={0} y={y + 15} style={{ fill: 'var(--text-secondary)' }}>{row.label}</text>
              <rect x={labelW} y={y + 4} width={plotW} height={16} rx={8} fill="var(--surface-3)" />
              <rect
                x={labelW}
                y={y + 4}
                width={Math.max(3, actualW)}
                height={16}
                rx={8}
                fill={over ? 'var(--warning)' : 'var(--primary)'}
              />
              <line x1={targetX} x2={targetX} y1={y} y2={y + 24} stroke="var(--text)" strokeWidth={1.75} strokeDasharray="3 2" />
              <text x={width - 4} y={y + 16} textAnchor="end" style={{ fill: 'var(--text-secondary)' }}>
                {formatClock(row.actual)}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="legend" style={{ marginTop: 'var(--space-2)' }}>
        <span><i style={{ background: 'var(--primary)' }} />Thời gian của bạn</span>
        <span><i style={{ background: 'var(--text)' }} />Mốc mục tiêu</span>
      </div>
    </figure>
  );
}
