/**
 * A four-axis radar for the GITA pillars.
 *
 * Four axes is the case where a radar earns its place: the shape itself is
 * the message — a kite pulled toward one corner says something a row of bars
 * does not. The limiting pillar is marked explicitly rather than left for the
 * eye to find.
 */

import React from 'react';
import { useLocale } from '../../i18n/index.ts';
import type { PillarId } from '../../gita/framework.ts';

export interface PillarSummary {
  id: PillarId;
  label: string;
  letter: string;
  color: string;
  score: number;
  confidence: number;
  essence: string;
  failureMode: string;
}

const SIZE = 300;
const CENTRE = SIZE / 2;
const RADIUS = 104;

export function PillarRadar({
  summary,
  limiting,
}: {
  summary: PillarSummary[];
  limiting: PillarId;
}): React.ReactElement {
  const locale = useLocale();
  const count = summary.length;

  // Start at twelve o'clock and go clockwise.
  const angleFor = (index: number) => (index / count) * Math.PI * 2 - Math.PI / 2;
  const pointAt = (index: number, fraction: number) => {
    const angle = angleFor(index);
    return [
      CENTRE + Math.cos(angle) * RADIUS * fraction,
      CENTRE + Math.sin(angle) * RADIUS * fraction,
    ] as const;
  };

  const shape = summary
    .map((pillar, index) => {
      const [x, y] = pointAt(index, Math.max(0.04, pillar.score / 100));
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const description =
    locale === 'vi'
      ? `Biểu đồ radar bốn trụ GITA: ${summary.map((p) => `${p.label} ${p.score}`).join(', ')}.`
      : `Radar of the four GITA pillars: ${summary.map((p) => `${p.label} ${p.score}`).join(', ')}.`;

  return (
    <div className="stack gap-4">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="chart"
        role="img"
        aria-label={description}
        style={{ maxWidth: SIZE, margin: '0 auto' }}
      >
        {/* Reference rings at 25, 50, 75, 100. */}
        {[0.25, 0.5, 0.75, 1].map((fraction) => (
          <polygon
            key={fraction}
            points={summary
              .map((_, index) => pointAt(index, fraction).join(','))
              .join(' ')}
            fill="none"
            stroke="var(--border)"
            strokeWidth={1}
            strokeDasharray={fraction === 1 ? undefined : '3 3'}
          />
        ))}

        {/* Axes. */}
        {summary.map((pillar, index) => {
          const [x, y] = pointAt(index, 1);
          return (
            <line
              key={pillar.id}
              x1={CENTRE}
              y1={CENTRE}
              x2={x}
              y2={y}
              stroke="var(--border)"
              strokeWidth={1}
            />
          );
        })}

        {/* The profile itself. */}
        <path d={`${shape} Z`} fill="color-mix(in srgb, var(--primary) 22%, transparent)" stroke="var(--primary)" strokeWidth={2} strokeLinejoin="round" />

        {/* Vertices, coloured per pillar, with the limiting one enlarged. */}
        {summary.map((pillar, index) => {
          const [x, y] = pointAt(index, Math.max(0.04, pillar.score / 100));
          const isLimiting = pillar.id === limiting;
          return (
            <circle
              key={pillar.id}
              cx={x}
              cy={y}
              r={isLimiting ? 7 : 4.5}
              fill={isLimiting ? 'var(--warning)' : pillar.color}
              stroke="var(--surface)"
              strokeWidth={2}
            />
          );
        })}

        {/* Labels, pushed outside the outer ring. */}
        {summary.map((pillar, index) => {
          const [x, y] = pointAt(index, 1.24);
          return (
            <g key={pillar.id}>
              <text
                x={x}
                y={y - 3}
                textAnchor="middle"
                style={{ fill: pillar.color, fontSize: 13, fontWeight: 700 }}
              >
                {pillar.letter}
              </text>
              <text x={x} y={y + 11} textAnchor="middle" style={{ fill: 'var(--text-secondary)', fontSize: 10 }}>
                {pillar.score}
              </text>
            </g>
          );
        })}
      </svg>

      <ul className="stack gap-2 text-sm" style={{ listStyle: 'none' }}>
        {summary.map((pillar) => (
          <li key={pillar.id} className="row gap-3">
            <i
              style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                background: pillar.color,
                display: 'inline-block',
                flex: 'none',
              }}
            />
            <span className="grow">{pillar.label}</span>
            {pillar.id === limiting && (
              <span className="badge badge-warning">
                {locale === 'vi' ? 'Trụ giới hạn' : 'Limiting'}
              </span>
            )}
            <span className="semibold">{pillar.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
