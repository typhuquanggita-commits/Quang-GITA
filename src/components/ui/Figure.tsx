/**
 * Renders a `FigureSpec` as inline SVG.
 *
 * Figures are declared as data rather than shipped as images so they stay
 * sharp at any zoom, follow the theme, and carry a real text alternative —
 * a student using a screen reader gets the same information as one looking
 * at the plot.
 */

import React from 'react';
import type { FigureSpec } from '../../types.ts';

export function Figure({ spec }: { spec: FigureSpec }): React.ReactElement {
  switch (spec.kind) {
    case 'scatter':
      return <ScatterFigure spec={spec} />;
    case 'bar':
      return <BarFigure spec={spec} />;
    case 'line':
      return <LineFigure spec={spec} />;
    case 'triangle':
      return <TriangleFigure spec={spec} />;
    case 'circle':
      return <CircleFigure spec={spec} />;
    default:
      return <></>;
  }
}

const W = 420;
const H = 260;
const PAD = { top: 14, right: 16, bottom: 40, left: 46 };

function axes(xs: number[], ys: number[]) {
  const x0 = Math.min(0, ...xs);
  const x1 = Math.max(...xs) * 1.08;
  const y0 = Math.min(0, ...ys);
  const y1 = Math.max(...ys) * 1.12;
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  return {
    x0, x1, y0, y1, plotW, plotH,
    sx: (x: number) => PAD.left + ((x - x0) / (x1 - x0 || 1)) * plotW,
    sy: (y: number) => PAD.top + plotH - ((y - y0) / (y1 - y0 || 1)) * plotH,
  };
}

function Frame({
  alt,
  xLabel,
  yLabel,
  children,
}: {
  alt: string;
  xLabel?: string;
  yLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="fig">
      <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={alt}>
        {children}
        {xLabel && (
          <text x={W / 2} y={H - 6} textAnchor="middle" style={{ fill: 'var(--text-secondary)' }}>
            {xLabel}
          </text>
        )}
        {yLabel && (
          <text
            x={12}
            y={PAD.top + (H - PAD.top - PAD.bottom) / 2}
            textAnchor="middle"
            transform={`rotate(-90 12 ${PAD.top + (H - PAD.top - PAD.bottom) / 2})`}
            style={{ fill: 'var(--text-secondary)' }}
          >
            {yLabel}
          </text>
        )}
      </svg>
      <figcaption>{alt}</figcaption>
    </figure>
  );
}

function ScatterFigure({ spec }: { spec: Extract<FigureSpec, { kind: 'scatter' }> }) {
  const xs = spec.points.map((p) => p[0]);
  const ys = spec.points.map((p) => p[1]);
  const a = axes(xs, ys);
  const tickCount = 5;

  return (
    <Frame alt={spec.alt} xLabel={spec.xLabel} yLabel={spec.yLabel}>
      {Array.from({ length: tickCount }, (_, i) => {
        const value = a.y0 + ((a.y1 - a.y0) * i) / (tickCount - 1);
        const y = a.sy(value);
        return (
          <g key={i}>
            <line className="grid-line" x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} />
            <text x={PAD.left - 7} y={y + 3.5} textAnchor="end">{Math.round(value)}</text>
          </g>
        );
      })}
      {Array.from({ length: tickCount }, (_, i) => {
        const value = a.x0 + ((a.x1 - a.x0) * i) / (tickCount - 1);
        return (
          <text key={i} x={a.sx(value)} y={H - PAD.bottom + 16} textAnchor="middle">
            {Math.round(value)}
          </text>
        );
      })}

      {spec.line && (
        <line
          x1={a.sx(a.x0)}
          y1={a.sy(spec.line.intercept + spec.line.slope * a.x0)}
          x2={a.sx(a.x1)}
          y2={a.sy(spec.line.intercept + spec.line.slope * a.x1)}
          stroke="var(--accent)"
          strokeWidth={2}
        />
      )}

      {spec.points.map((point, i) => (
        <circle key={i} cx={a.sx(point[0])} cy={a.sy(point[1])} r={4} fill="var(--primary)" />
      ))}

      <line className="axis-line" x1={PAD.left} x2={W - PAD.right} y1={a.sy(a.y0)} y2={a.sy(a.y0)} />
      <line className="axis-line" x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={a.sy(a.y0)} />
    </Frame>
  );
}

function BarFigure({ spec }: { spec: Extract<FigureSpec, { kind: 'bar' }> }) {
  const a = axes([0, spec.categories.length], spec.values);
  const band = a.plotW / Math.max(1, spec.categories.length);
  const barWidth = Math.min(48, band * 0.6);

  return (
    <Frame alt={spec.alt} xLabel={spec.xLabel} yLabel={spec.yLabel}>
      {Array.from({ length: 5 }, (_, i) => {
        const value = (a.y1 * i) / 4;
        const y = a.sy(value);
        return (
          <g key={i}>
            <line className="grid-line" x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} />
            <text x={PAD.left - 7} y={y + 3.5} textAnchor="end">{Math.round(value)}</text>
          </g>
        );
      })}
      {spec.categories.map((category, i) => {
        const x = PAD.left + i * band + (band - barWidth) / 2;
        const y = a.sy(spec.values[i]);
        return (
          <g key={category}>
            <rect x={x} y={y} width={barWidth} height={a.sy(0) - y} rx={3} fill="var(--primary)" />
            <text x={x + barWidth / 2} y={H - PAD.bottom + 16} textAnchor="middle">{category}</text>
          </g>
        );
      })}
      <line className="axis-line" x1={PAD.left} x2={W - PAD.right} y1={a.sy(0)} y2={a.sy(0)} />
    </Frame>
  );
}

function LineFigure({ spec }: { spec: Extract<FigureSpec, { kind: 'line' }> }) {
  const all = spec.series.flatMap((s) => s.points);
  const a = axes(all.map((p) => p[0]), all.map((p) => p[1]));
  const colors = ['var(--primary)', 'var(--accent)', 'var(--success)'];

  return (
    <Frame alt={spec.alt} xLabel={spec.xLabel} yLabel={spec.yLabel}>
      {Array.from({ length: 5 }, (_, i) => {
        const value = a.y0 + ((a.y1 - a.y0) * i) / 4;
        const y = a.sy(value);
        return (
          <g key={i}>
            <line className="grid-line" x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} />
            <text x={PAD.left - 7} y={y + 3.5} textAnchor="end">{Math.round(value)}</text>
          </g>
        );
      })}
      {spec.series.map((s, index) => (
        <path
          key={s.name}
          className="series-line"
          stroke={colors[index % colors.length]}
          d={s.points.map((p, i) => `${i === 0 ? 'M' : 'L'}${a.sx(p[0])},${a.sy(p[1])}`).join(' ')}
        />
      ))}
      <line className="axis-line" x1={PAD.left} x2={W - PAD.right} y1={a.sy(a.y0)} y2={a.sy(a.y0)} />
    </Frame>
  );
}

function TriangleFigure({ spec }: { spec: Extract<FigureSpec, { kind: 'triangle' }> }) {
  return (
    <figure className="fig">
      <svg className="chart" viewBox="0 0 300 200" role="img" aria-label={spec.alt} style={{ maxWidth: 300, margin: '0 auto' }}>
        <polygon points="40,160 250,160 40,40" fill="var(--primary-soft)" stroke="var(--text)" strokeWidth={2} />
        {spec.right && <path d="M40 145 L55 145 L55 160" fill="none" stroke="var(--text)" strokeWidth={1.75} />}
        <text x={30} y={100} textAnchor="end" style={{ fill: 'var(--text)', fontSize: 13 }}>{spec.labels.a}</text>
        <text x={145} y={178} textAnchor="middle" style={{ fill: 'var(--text)', fontSize: 13 }}>{spec.labels.b}</text>
        <text x={155} y={92} textAnchor="middle" style={{ fill: 'var(--text)', fontSize: 13 }}>{spec.labels.c}</text>
      </svg>
      <figcaption>{spec.alt}</figcaption>
    </figure>
  );
}

function CircleFigure({ spec }: { spec: Extract<FigureSpec, { kind: 'circle' }> }) {
  return (
    <figure className="fig">
      <svg className="chart" viewBox="0 0 240 220" role="img" aria-label={spec.alt} style={{ maxWidth: 240, margin: '0 auto' }}>
        <circle cx={120} cy={110} r={78} fill="var(--primary-soft)" stroke="var(--text)" strokeWidth={2} />
        <line x1={120} y1={110} x2={198} y2={110} stroke="var(--text)" strokeWidth={1.75} />
        <circle cx={120} cy={110} r={3} fill="var(--text)" />
        <text x={159} y={102} textAnchor="middle" style={{ fill: 'var(--text)', fontSize: 13 }}>{spec.radiusLabel}</text>
        {spec.annotations?.map((note, i) => (
          <text key={note} x={120} y={200 + i * 14} textAnchor="middle" style={{ fill: 'var(--text-secondary)', fontSize: 11 }}>
            {note}
          </text>
        ))}
      </svg>
      <figcaption>{spec.alt}</figcaption>
    </figure>
  );
}
