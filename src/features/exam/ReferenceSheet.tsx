/**
 * Math reference sheet.
 *
 * Reproduces the reference information supplied inside the operational test,
 * so a student practises with the same material available and does not build
 * a habit of memorising what will be provided.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/ui/primitives.tsx';
import { IconX } from '../../components/ui/icons.tsx';

interface RefItem {
  formula: string;
  caption: string;
  svg: React.ReactNode;
}

const stroke = { fill: 'var(--primary-soft)', stroke: 'var(--text)', strokeWidth: 1.5 };

const ITEMS: RefItem[] = [
  {
    formula: 'A = πr²   C = 2πr',
    caption: 'Đường tròn',
    svg: (
      <svg width="80" height="60" viewBox="0 0 80 60" aria-hidden="true">
        <circle cx="40" cy="30" r="24" {...stroke} />
        <line x1="40" y1="30" x2="64" y2="30" stroke="var(--text)" strokeWidth="1.5" />
        <text x="50" y="26" fontSize="10" fill="var(--text)">r</text>
      </svg>
    ),
  },
  {
    formula: 'A = lw',
    caption: 'Hình chữ nhật',
    svg: (
      <svg width="80" height="60" viewBox="0 0 80 60" aria-hidden="true">
        <rect x="14" y="14" width="52" height="32" {...stroke} />
        <text x="40" y="55" fontSize="10" fill="var(--text)" textAnchor="middle">l</text>
        <text x="8" y="34" fontSize="10" fill="var(--text)">w</text>
      </svg>
    ),
  },
  {
    formula: 'A = ½bh',
    caption: 'Tam giác',
    svg: (
      <svg width="80" height="60" viewBox="0 0 80 60" aria-hidden="true">
        <polygon points="14,46 66,46 34,12" {...stroke} />
        <line x1="34" y1="12" x2="34" y2="46" stroke="var(--text)" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x="40" y="56" fontSize="10" fill="var(--text)" textAnchor="middle">b</text>
        <text x="37" y="32" fontSize="10" fill="var(--text)">h</text>
      </svg>
    ),
  },
  {
    formula: 'c² = a² + b²',
    caption: 'Định lý Pythagoras',
    svg: (
      <svg width="80" height="60" viewBox="0 0 80 60" aria-hidden="true">
        <polygon points="16,46 62,46 16,14" {...stroke} />
        <path d="M16 40 h6 v6" fill="none" stroke="var(--text)" strokeWidth="1.2" />
        <text x="38" y="56" fontSize="10" fill="var(--text)" textAnchor="middle">b</text>
        <text x="9" y="32" fontSize="10" fill="var(--text)">a</text>
        <text x="42" y="26" fontSize="10" fill="var(--text)">c</text>
      </svg>
    ),
  },
  {
    formula: 'Đặc biệt 30-60-90: x, x√3, 2x',
    caption: 'Tam giác đặc biệt',
    svg: (
      <svg width="80" height="60" viewBox="0 0 80 60" aria-hidden="true">
        <polygon points="16,46 60,46 16,16" {...stroke} />
        <text x="30" y="56" fontSize="9" fill="var(--text)">x√3</text>
        <text x="6" y="34" fontSize="9" fill="var(--text)">x</text>
        <text x="40" y="28" fontSize="9" fill="var(--text)">2x</text>
      </svg>
    ),
  },
  {
    formula: 'Đặc biệt 45-45-90: x, x, x√2',
    caption: 'Tam giác vuông cân',
    svg: (
      <svg width="80" height="60" viewBox="0 0 80 60" aria-hidden="true">
        <polygon points="18,44 58,44 18,14" {...stroke} />
        <text x="36" y="55" fontSize="9" fill="var(--text)">x</text>
        <text x="9" y="32" fontSize="9" fill="var(--text)">x</text>
        <text x="40" y="26" fontSize="9" fill="var(--text)">x√2</text>
      </svg>
    ),
  },
  {
    formula: 'V = lwh',
    caption: 'Hình hộp chữ nhật',
    svg: (
      <svg width="80" height="60" viewBox="0 0 80 60" aria-hidden="true">
        <rect x="16" y="20" width="38" height="26" {...stroke} />
        <path d="M16 20 L28 10 L66 10 L54 20 M54 46 L66 36 L66 10" fill="none" stroke="var(--text)" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    formula: 'V = πr²h',
    caption: 'Hình trụ',
    svg: (
      <svg width="80" height="60" viewBox="0 0 80 60" aria-hidden="true">
        <ellipse cx="40" cy="16" rx="20" ry="7" {...stroke} />
        <path d="M20 16 V44 a20 7 0 0 0 40 0 V16" fill="var(--primary-soft)" stroke="var(--text)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    formula: 'V = (4/3)πr³',
    caption: 'Hình cầu',
    svg: (
      <svg width="80" height="60" viewBox="0 0 80 60" aria-hidden="true">
        <circle cx="40" cy="30" r="22" {...stroke} />
        <ellipse cx="40" cy="30" rx="22" ry="8" fill="none" stroke="var(--text)" strokeWidth="1.1" strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    formula: 'V = (1/3)πr²h',
    caption: 'Hình nón',
    svg: (
      <svg width="80" height="60" viewBox="0 0 80 60" aria-hidden="true">
        <path d="M40 8 L62 46 a22 7 0 0 1-44 0 Z" {...stroke} />
      </svg>
    ),
  },
  {
    formula: 'V = (1/3)lwh',
    caption: 'Hình chóp',
    svg: (
      <svg width="80" height="60" viewBox="0 0 80 60" aria-hidden="true">
        <polygon points="40,10 66,44 14,44" {...stroke} />
        <path d="M14 44 L28 50 L66 44 M40 10 L28 50" fill="none" stroke="var(--text)" strokeWidth="1.1" strokeDasharray="3 2" />
      </svg>
    ),
  },
];

const FACTS = [
  'Số đo cung tròn của một đường tròn là 360°.',
  'Số radian của một đường tròn là 2π.',
  'Tổng số đo các góc trong một tam giác là 180°.',
];

export function ReferenceSheet({ onClose }: { onClose(): void }): React.ReactElement {
  const [position, setPosition] = useState({ x: 480, y: 92 });
  const dragRef = useRef<{ dx: number; dy: number } | null>(null);

  useEffect(() => {
    function onMove(event: MouseEvent) {
      if (!dragRef.current) return;
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 240, event.clientX - dragRef.current.dx)),
        y: Math.max(0, Math.min(window.innerHeight - 80, event.clientY - dragRef.current.dy)),
      });
    }
    function onUp() {
      dragRef.current = null;
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <div
      className="tool-panel"
      style={{ left: position.x, top: position.y, width: 'min(500px, calc(100vw - 2rem))' }}
      role="dialog"
      aria-label="Reference sheet"
    >
      <div
        className="tool-head"
        onMouseDown={(event) => {
          const rect = (event.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
          dragRef.current = { dx: event.clientX - rect.left, dy: event.clientY - rect.top };
        }}
      >
        <span>Bảng công thức tham chiếu</span>
        <Button variant="ghost" size="sm" iconOnly aria-label="Close reference sheet" onClick={onClose}>
          <IconX size={15} />
        </Button>
      </div>

      <div className="tool-body stack gap-4">
        <div className="ref-grid">
          {ITEMS.map((item) => (
            <div className="ref-card" key={item.caption}>
              {item.svg}
              <div className="ref-formula">{item.formula}</div>
              <div className="muted text-2xs" style={{ marginTop: 2 }}>{item.caption}</div>
            </div>
          ))}
        </div>
        <ul className="stack gap-2 text-sm secondary" style={{ paddingLeft: '1.1rem', listStyle: 'disc' }}>
          {FACTS.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
