import React from 'react';

export const Logo: React.FC<{ onLight?: boolean; sub?: string }> = ({ onLight, sub = 'Toán THCS 6–9' }) => (
  <a className={`logo${onLight ? ' on-light' : ''}`} href="#/">
    <span className="logo-mark">G</span>
    <span className="logo-text">
      <span className="logo-name">MATHGITA</span>
      <span className="logo-sub">{sub}</span>
    </span>
  </a>
);
