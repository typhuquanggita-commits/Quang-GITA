import React from 'react';

/* ---------------- Toán học: render ^{...} và _{...} ---------------- */

export function MathText({ children, className = '' }: { children: string; className?: string }) {
  const nodes: React.ReactNode[] = [];
  const re = /([\^_])\{([^}]*)\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(children))) {
    if (m.index > last) nodes.push(children.slice(last, m.index));
    const Tag = m[1] === '^' ? 'sup' : 'sub';
    nodes.push(
      React.createElement(Tag, { key: `m${k++}`, className: 'text-[0.72em]' }, m[2]),
    );
    last = m.index + m[0].length;
  }
  if (last < children.length) nodes.push(children.slice(last));
  return <span className={className}>{nodes}</span>;
}

/* ---------------- Khối cơ bản ---------------- */

export function Card({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
}) {
  return <Tag className={`card ${className}`}>{children}</Tag>;
}

export function SectionTitle({
  eyebrow,
  title,
  desc,
  right,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div className="max-w-3xl">
        {eyebrow && (
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-600">
            {eyebrow}
          </div>
        )}
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
        {desc && <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{desc}</p>}
      </div>
      {right}
    </div>
  );
}

export function Badge({
  children,
  tone = 'slate',
  style,
}: {
  children: React.ReactNode;
  tone?: 'slate' | 'brand' | 'green' | 'amber' | 'rose' | 'teal';
  style?: React.CSSProperties;
}) {
  const tones: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-700',
    brand: 'bg-brand-50 text-brand-800',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-800',
    rose: 'bg-rose-50 text-rose-700',
    teal: 'bg-teal-50 text-teal-800',
  };
  return (
    <span className={`chip ${tones[tone]}`} style={style}>
      {children}
    </span>
  );
}

export function Progress({
  value,
  tone = '#4f46e5',
  height = 8,
  label,
}: {
  value: number;
  tone?: string;
  height?: number;
  label?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div>
      {label && (
        <div className="mb-1 flex justify-between text-xs font-semibold text-slate-500">
          <span>{label}</span>
          <span>{Math.round(v)}%</span>
        </div>
      )}
      <div
        className="w-full overflow-hidden rounded-full"
        style={{ height, background: '#eef1f6' }}
        role="progressbar"
        aria-valuenow={Math.round(v)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${v}%`, background: tone }}
        />
      </div>
    </div>
  );
}

export function Stat({
  label,
  value,
  sub,
  tone = '#4f46e5',
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  tone?: string;
}) {
  return (
    <div className="card p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-extrabold tabular-nums" style={{ color: tone }}>
        {value}
      </div>
      {sub && <div className="mt-0.5 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}

export function LevelDots({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`Mức độ ${level}/${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className="h-1.5 w-4 rounded-full"
          style={{ background: i < level ? '#4f46e5' : '#e2e8f0' }}
        />
      ))}
    </span>
  );
}

export function Empty({ title, desc, action }: { title: string; desc: string; action?: React.ReactNode }) {
  return (
    <Card className="p-10 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-2xl">
        ✦
      </div>
      <h3 className="text-base font-bold text-slate-800">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">{desc}</p>
      {action && <div className="mt-4">{action}</div>}
    </Card>
  );
}

export function Callout({
  tone = 'brand',
  title,
  children,
}: {
  tone?: 'brand' | 'amber' | 'rose' | 'green';
  title: string;
  children: React.ReactNode;
}) {
  const map = {
    brand: ['#eef2ff', '#4338ca', '#c7d2fe'],
    amber: ['#fffbeb', '#b45309', '#fde68a'],
    rose: ['#fff1f2', '#be123c', '#fecdd3'],
    green: ['#ecfdf5', '#047857', '#a7f3d0'],
  }[tone];
  return (
    <div className="rounded-2xl border p-4" style={{ background: map[0], borderColor: map[2] }}>
      <div className="mb-1 text-sm font-bold" style={{ color: map[1] }}>
        {title}
      </div>
      <div className="prose-math text-[13.5px]">{children}</div>
    </div>
  );
}

/* ---------------- Biểu đồ SVG tự vẽ ---------------- */

export function BarChart({
  data,
  height = 160,
}: {
  data: { label: string; value: number; color?: string }[];
  height?: number;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-3 overflow-x-auto pb-1" style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex min-w-14 flex-1 flex-col items-center justify-end gap-2">
          <div className="text-xs font-bold tabular-nums text-slate-700">{d.value}</div>
          <div
            className="w-full rounded-t-lg transition-all"
            style={{
              height: `${(d.value / max) * (height - 48)}px`,
              background: d.color ?? '#6366f1',
              minHeight: 3,
            }}
          />
          <div className="text-center text-[10.5px] leading-tight text-slate-500">{d.label}</div>
        </div>
      ))}
    </div>
  );
}

export function RadarChart({
  data,
  size = 240,
}: {
  data: { label: string; value: number; color: string }[];
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2 - 34;
  const n = data.length;
  if (!n) return null;
  const pt = (i: number, ratio: number) => {
    const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + Math.cos(ang) * R * ratio, cy + Math.sin(ang) * R * ratio];
  };
  const poly = data.map((d, i) => pt(i, Math.max(0.04, d.value / 100)).join(',')).join(' ');
  return (
    <svg width={size} height={size} role="img" aria-label="Bản đồ năng lực theo mạch kiến thức">
      {[0.25, 0.5, 0.75, 1].map((r) => (
        <polygon
          key={r}
          points={data.map((_, i) => pt(i, r).join(',')).join(' ')}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={1}
        />
      ))}
      {data.map((_, i) => {
        const [x, y] = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e2e8f0" strokeWidth={1} />;
      })}
      <polygon points={poly} fill="rgba(79,70,229,0.18)" stroke="#4f46e5" strokeWidth={2} />
      {data.map((d, i) => {
        const [x, y] = pt(i, Math.max(0.04, d.value / 100));
        return <circle key={d.label} cx={x} cy={y} r={3.5} fill={d.color} />;
      })}
      {data.map((d, i) => {
        const [x, y] = pt(i, 1.19);
        return (
          <text
            key={`t${d.label}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={10}
            fontWeight={600}
            fill="#475569"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

export function Donut({ value, size = 120, tone = '#4f46e5', label }: { value: number; size?: number; tone?: string; label?: string }) {
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eef1f6" strokeWidth={10} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={`${(c * v) / 100} ${c}`}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-xl font-extrabold tabular-nums" style={{ color: tone }}>
          {Math.round(v)}%
        </div>
        {label && <div className="text-[10px] font-semibold text-slate-500">{label}</div>}
      </div>
    </div>
  );
}
