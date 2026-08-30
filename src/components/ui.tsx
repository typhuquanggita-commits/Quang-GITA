import React from 'react';
import { renderMath } from '@/lib/mathText';
import type { Level } from '@/types';

/* ---------------- Kết xuất công thức ---------------- */
export const M: React.FC<{ t: string; className?: string }> = ({ t, className }) => (
  <span className={className}>{renderMath(t)}</span>
);
export const MBlock: React.FC<{ t: string; className?: string }> = ({ t, className }) => (
  <div className={className}>{renderMath(t)}</div>
);

/* ---------------- Nhãn mức độ ---------------- */
export const LEVEL_TEXT: Record<Level, string> = { NB: 'Nhận biết', TH: 'Thông hiểu', VD: 'Vận dụng', VDC: 'Vận dụng cao' };
export const LevelBadge: React.FC<{ level: Level; short?: boolean }> = ({ level, short }) => (
  <span className={`badge badge-${level.toLowerCase()}`}>{short ? level : LEVEL_TEXT[level]}</span>
);

/* ---------------- Thẻ nội dung ---------------- */
export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void; style?: React.CSSProperties }> = ({ children, className = '', onClick, style }) => (
  <div className={`card ${className}`} onClick={onClick} style={style}>{children}</div>
);

export const Note: React.FC<{ title?: string; tone?: 'brand' | 'gold' | 'ok' | 'bad' | 'violet'; children: React.ReactNode }> = ({ title, tone = 'brand', children }) => (
  <div className={`note ${tone === 'brand' ? '' : tone}`}>
    {title && <div className="note-title">{title}</div>}
    {children}
  </div>
);

export const Bar: React.FC<{ value: number; tone?: string; thick?: boolean }> = ({ value, tone, thick }) => (
  <div className={`bar${thick ? ' thick' : ''}`}>
    <i className={tone} style={{ width: `${Math.max(0, Math.min(100, value * 100))}%` }} />
  </div>
);

export const Stat: React.FC<{ k: string; v: React.ReactNode; sub?: string; tone?: string }> = ({ k, v, sub, tone }) => (
  <div className="stat">
    <div className="stat-k">{k}</div>
    <div className={`stat-v ${tone ?? ''}`}>{v}</div>
    {sub && <div className="faint">{sub}</div>}
  </div>
);

export const Empty: React.FC<{ icon?: string; title: string; hint?: string; action?: React.ReactNode }> = ({ icon = '📚', title, hint, action }) => (
  <div className="empty">
    <div className="empty-icon">{icon}</div>
    <div className="bold" style={{ fontSize: 'var(--fs-lg)', color: 'var(--text)' }}>{title}</div>
    {hint && <p className="mt2">{hint}</p>}
    {action && <div className="mt4">{action}</div>}
  </div>
);

export const Modal: React.FC<{ onClose: () => void; title: string; children: React.ReactNode; wide?: boolean }> = ({ onClose, title, children, wide }) => (
  <div className="modal-back" onClick={onClose}>
    <div className="modal" style={wide ? { maxWidth: 860 } : undefined} onClick={(e) => e.stopPropagation()}>
      <div className="between mb4">
        <h3 style={{ margin: 0 }}>{title}</h3>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
      </div>
      {children}
    </div>
  </div>
);

/* ---------------- Khoá nội dung ---------------- */
export const LockedBox: React.FC<{ reason: string; children?: React.ReactNode }> = ({ reason, children }) => (
  <Card className="tc">
    <div style={{ fontSize: 34, marginBottom: 8 }}>🔒</div>
    <div className="bold mb2">Nội dung dành cho học sinh GITA</div>
    <p className="muted small">{reason}</p>
    {children}
    <div className="mt4">
      <a className="btn btn-accent" href="#/bang-gia">Xem gói học GITA</a>
    </div>
  </Card>
);

/* ---------------- Danh sách có đánh dấu ---------------- */
export const Bullets: React.FC<{ items: string[]; icon?: string }> = ({ items, icon }) => (
  <ul style={icon ? { listStyle: 'none', paddingLeft: 0 } : undefined}>
    {items.map((s, i) => (
      <li key={i}>{icon && <span style={{ marginRight: 8 }}>{icon}</span>}<M t={s} /></li>
    ))}
  </ul>
);

export const Steps: React.FC<{ items: string[] }> = ({ items }) => (
  <ol className="steps">{items.map((s, i) => <li key={i}><M t={s} /></li>)}</ol>
);

/* ---------------- Sơ đồ tư duy & đọc vị ---------------- */
import type { DecodeRule, MindMap } from '@/types';

export const MindMapView: React.FC<{ map: MindMap }> = ({ map }) => (
  <div className="mindmap">
    <div className="mm-root"><M t={map.root} /></div>
    <div className="mm-branches">
      {map.branches.map((b, i) => (
        <div className="mm-branch" key={i}>
          <h5><M t={b.title} /></h5>
          <ul>{b.items.map((it, j) => <li key={j}><M t={it} /></li>)}</ul>
        </div>
      ))}
    </div>
  </div>
);

export const DecodeView: React.FC<{ rules: DecodeRule[] }> = ({ rules }) => (
  <div className="decode">
    {rules.map((d, i) => (
      <div className="decode-row" key={i}>
        <div className="decode-cell sig">
          <span className="decode-k">Dấu hiệu trong đề</span>
          <M t={d.signal} />
        </div>
        <div className="decode-arrow">→</div>
        <div className="decode-cell act">
          <span className="decode-k">Hành động giải</span>
          <M t={d.action} />
          {d.why && <div className="faint mt2"><strong>Vì sao:</strong> <M t={d.why} /></div>}
        </div>
      </div>
    ))}
  </div>
);
