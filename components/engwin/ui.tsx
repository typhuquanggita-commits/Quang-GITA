/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';

export const Chip: React.FC<{
  children: React.ReactNode;
  tone?: 'slate' | 'emerald' | 'amber' | 'sky' | 'violet' | 'rose';
}> = ({children, tone = 'slate'}) => {
  const tones: Record<string, string> = {
    slate: 'bg-slate-700/50 text-slate-300 ring-slate-600/50',
    emerald: 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-300 ring-amber-500/30',
    sky: 'bg-sky-500/10 text-sky-300 ring-sky-500/30',
    violet: 'bg-violet-500/10 text-violet-300 ring-violet-500/30',
    rose: 'bg-rose-500/10 text-rose-300 ring-rose-500/30',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${tones[tone]}`}>
      {children}
    </span>
  );
};

export const SectionHeader: React.FC<{
  eyebrow: string;
  title: string;
  lead: string;
}> = ({eyebrow, title, lead}) => (
  <header className="mb-8 border-b border-slate-800 pb-6">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
      {eyebrow}
    </p>
    <h2 className="mt-2 text-2xl font-bold text-slate-100 md:text-3xl">
      {title}
    </h2>
    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">
      {lead}
    </p>
  </header>
);

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({children, className = ''}) => (
  <div
    className={`rounded-xl border border-slate-800 bg-slate-900/60 p-5 ${className}`}>
    {children}
  </div>
);

export const Accordion: React.FC<{
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({title, subtitle, right, defaultOpen = false, children}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-4 p-5 text-left transition hover:bg-slate-800/40">
        <span
          className={`mt-1 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-90' : ''}`}>
          ▶
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-slate-100">{title}</span>
          {subtitle && (
            <span className="mt-1 block text-sm text-slate-400">{subtitle}</span>
          )}
        </span>
        {right && <span className="shrink-0">{right}</span>}
      </button>
      {open && (
        <div className="border-t border-slate-800 bg-slate-950/40 p-5">
          {children}
        </div>
      )}
    </div>
  );
};

export const Field: React.FC<{label: string; children: React.ReactNode}> = ({
  label,
  children,
}) => (
  <div className="mb-4 last:mb-0">
    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
      {label}
    </p>
    <div className="text-sm leading-relaxed text-slate-300">{children}</div>
  </div>
);

export const Bullets: React.FC<{items: string[]; marker?: string}> = ({
  items,
  marker = '•',
}) => (
  <ul className="space-y-1.5">
    {items.map((it, i) => (
      <li key={i} className="flex gap-2.5">
        <span className="shrink-0 select-none text-slate-400">{marker}</span>
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

export const NumberedSteps: React.FC<{items: string[]}> = ({items}) => (
  <ol className="space-y-2">
    {items.map((it, i) => (
      <li key={i} className="flex gap-3">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-[11px] font-semibold text-slate-400">
          {i + 1}
        </span>
        <span>{it}</span>
      </li>
    ))}
  </ol>
);

export const Filters: React.FC<{
  options: {id: string; label: string}[];
  value: string;
  onChange: (v: string) => void;
}> = ({options, value, onChange}) => (
  <div className="mb-6 flex flex-wrap gap-2">
    {options.map((o) => (
      <button
        key={o.id}
        onClick={() => onChange(o.id)}
        className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
          value === o.id
            ? 'bg-sky-500 text-slate-950'
            : 'bg-slate-800/70 text-slate-400 hover:bg-slate-700/70 hover:text-slate-200'
        }`}>
        {o.label}
      </button>
    ))}
  </div>
);

export const Stat: React.FC<{
  value: string;
  label: string;
  sub?: string;
}> = ({value, label, sub}) => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
    <p className="text-2xl font-bold tracking-tight text-slate-100">{value}</p>
    <p className="mt-1 text-xs font-medium text-slate-400">{label}</p>
    {sub && <p className="mt-0.5 text-[11px] text-slate-400">{sub}</p>}
  </div>
);
