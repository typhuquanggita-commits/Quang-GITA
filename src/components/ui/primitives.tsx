/** Reusable UI primitives. All are accessible by default, not by opt-in. */

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { cx } from '../../lib/util.ts';
import { IconX } from './icons.tsx';

/* ---------------- Button ---------------- */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  iconOnly?: boolean;
}

export function Button({
  variant = 'secondary',
  size = 'md',
  block,
  iconOnly,
  className,
  type = 'button',
  ...rest
}: ButtonProps): React.ReactElement {
  return (
    <button
      type={type}
      className={cx(
        'btn',
        `btn-${variant}`,
        size !== 'md' && `btn-${size}`,
        block && 'btn-block',
        iconOnly && 'btn-icon',
        className,
      )}
      {...rest}
    />
  );
}

/* ---------------- Card ---------------- */

export function Card({
  title,
  subtitle,
  action,
  children,
  className,
  bodyClassName,
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}): React.ReactElement {
  return (
    <section className={cx('card', className)}>
      {(title || action) && (
        <header className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-sub">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={cx(title || action ? 'card-body' : 'card-pad', bodyClassName)}>{children}</div>
    </section>
  );
}

/* ---------------- Badge ---------------- */

export function Badge({
  tone = 'default',
  children,
}: {
  tone?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'rw' | 'math';
  children: React.ReactNode;
}): React.ReactElement {
  return <span className={cx('badge', tone !== 'default' && `badge-${tone}`)}>{children}</span>;
}

/* ---------------- Switch ---------------- */

export function Switch({
  checked,
  onChange,
  label,
  hint,
  disabled,
}: {
  checked: boolean;
  onChange(next: boolean): void;
  label: React.ReactNode;
  hint?: React.ReactNode;
  disabled?: boolean;
}): React.ReactElement {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="switch-track" aria-hidden="true">
        <span className="switch-thumb" />
      </span>
      <span>
        <span>{label}</span>
        {hint && <span className="hint" style={{ display: 'block' }}>{hint}</span>}
      </span>
    </label>
  );
}

/* ---------------- Segmented control ---------------- */

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: T;
  options: Array<{ value: T; label: React.ReactNode }>;
  onChange(next: T): void;
  ariaLabel: string;
}): React.ReactElement {
  return (
    <div className="segmented" role="group" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Field ---------------- */

export function Field({
  label,
  hint,
  children,
}: {
  label: React.ReactNode;
  hint?: React.ReactNode;
  children: (id: string) => React.ReactNode;
}): React.ReactElement {
  const id = useId();
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      {children(id)}
      {hint && <span className="hint">{hint}</span>}
    </div>
  );
}

/* ---------------- Progress bar ---------------- */

export function Bar({
  value,
  max = 1,
  color,
  label,
}: {
  value: number;
  max?: number;
  color?: string;
  label?: string;
}): React.ReactElement {
  const percent = Math.max(0, Math.min(100, (value / (max || 1)) * 100));
  return (
    <div
      className="bar"
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <i style={{ width: `${percent}%`, background: color }} />
    </div>
  );
}

/* ---------------- Progress ring ---------------- */

export function Ring({
  value,
  size = 120,
  stroke = 10,
  label,
  sublabel,
  color = 'var(--primary)',
}: {
  /** 0–1. */
  value: number;
  size?: number;
  stroke?: number;
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
  color?: string;
}): React.ReactElement {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, value));

  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
      <svg width={size} height={size} aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--surface-3)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset var(--dur-slow) var(--ease-out)' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeContent: 'center',
          textAlign: 'center',
          lineHeight: 1.15,
        }}
      >
        {label && <div style={{ fontSize: size / 4.2, fontWeight: 700, letterSpacing: '-0.03em' }}>{label}</div>}
        {sublabel && <div className="text-xs muted">{sublabel}</div>}
      </div>
    </div>
  );
}

/* ---------------- Modal ---------------- */

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  wide,
  /** A modal that must be answered does not close on Escape or backdrop click. */
  dismissible = true,
}: {
  open: boolean;
  onClose(): void;
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
  dismissible?: boolean;
}): React.ReactElement | null {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return undefined;

    const previous = document.activeElement as HTMLElement | null;
    // Move focus into the dialog so a screen reader announces it and so Tab
    // starts inside rather than behind it.
    const timer = setTimeout(() => {
      const focusable = ref.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      (focusable ?? ref.current)?.focus();
    }, 0);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && dismissible) {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !ref.current) return;

      // Trap Tab inside the dialog.
      const items = [
        ...ref.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown, true);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', onKeyDown, true);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [open, onClose, dismissible]);

  if (!open) return null;

  return (
    <div
      className="overlay"
      onMouseDown={(event) => {
        if (dismissible && event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={cx('modal', wide && 'modal-wide')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={ref}
        tabIndex={-1}
      >
        <div className="modal-head">
          <h2 id={titleId} style={{ fontSize: 'var(--text-lg)' }}>
            {title}
          </h2>
          {dismissible && (
            <Button variant="ghost" size="sm" iconOnly onClick={onClose} aria-label="Close">
              <IconX size={16} />
            </Button>
          )}
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

/* ---------------- Tabs ---------------- */

export function Tabs<T extends string>({
  value,
  onChange,
  tabs,
  ariaLabel,
}: {
  value: T;
  onChange(next: T): void;
  tabs: Array<{ id: T; label: React.ReactNode }>;
  ariaLabel: string;
}): React.ReactElement {
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const index = tabs.findIndex((t) => t.id === value);
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onChange(tabs[(index + 1) % tabs.length].id);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onChange(tabs[(index - 1 + tabs.length) % tabs.length].id);
      }
    },
    [tabs, value, onChange],
  );

  return (
    <div className="tabs" role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          type="button"
          className="tab"
          aria-selected={tab.id === value}
          tabIndex={tab.id === value ? 0 : -1}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Empty state ---------------- */

export function Empty({
  icon,
  title,
  body,
  action,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  body?: React.ReactNode;
  action?: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="empty">
      {icon}
      <h3>{title}</h3>
      {body && <p style={{ maxWidth: '46ch' }}>{body}</p>}
      {action}
    </div>
  );
}

/* ---------------- Toasts ---------------- */

export interface Toast {
  id: string;
  message: string;
  tone?: 'default' | 'success' | 'warning' | 'danger';
}

export function useToasts(): {
  toasts: Toast[];
  push(message: string, tone?: Toast['tone']): void;
  view: React.ReactElement;
} {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, tone: Toast['tone'] = 'default') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((current) => [...current, { id, message, tone }]);
    setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 4200);
  }, []);

  const view = (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={cx('toast', toast.tone && toast.tone !== 'default' && `toast-${toast.tone}`)}>
          {toast.message}
        </div>
      ))}
    </div>
  );

  return { toasts, push, view };
}
