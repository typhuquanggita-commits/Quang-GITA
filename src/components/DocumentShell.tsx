import type { ReactNode } from 'react';
import { GitaMark } from '../brand/Logo';
import { DOCUMENT_KINDS } from '../brand/tokens';
import { cn } from '../lib/cn';

/**
 * KHUNG TAI LIEU
 *
 * Moi tai lieu HSA365 phat ra ngoai — phieu luyen, loi giai, huong dan, ket
 * qua dinh vi, bao cao — deu di qua khung nay. Ly do khong phai la cho dep
 * dong deu, ma la:
 *
 * MOT PHIEU ROI KHOI HE THONG LA MOT PHIEU KHONG CON NGU CANH. No nam tren
 * ban hoc, trong cap, trong tay phu huynh hoac mot giao vien khac. Neu tren
 * to giay do khong co ma tai lieu thi khong ai — ke ca chinh nguoi hoc — tim
 * lai duoc dung loi giai va dung phieu huong dan cua no.
 *
 * Vi vay ma tai lieu xuat hien HAI LAN: dau trang de nhan ra ngay, chan trang
 * de con doc duoc khi to giay bi gap doi.
 */

export interface DocumentShellProps {
  /** Ma tien to: PL, LG, HD, DV, BC. */
  kind: string;
  /** Ma day du cua tai lieu, vi du PL-TOA-ARI-L3-004. */
  code: string;
  title: string;
  subtitle?: ReactNode;
  /** Chu thich goc phai dau trang: chuyen de, cap do, ngay. */
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
}

const ACCENT_CLASS: Record<string, string> = {
  blue: '[--doc-accent:var(--color-brand)]',
  red: '[--doc-accent:var(--color-gita-red-600)]',
  slate: '[--doc-accent:var(--color-fg-muted)]',
};

export function DocumentShell({
  kind,
  code,
  title,
  subtitle,
  meta,
  children,
  className,
}: DocumentShellProps) {
  const spec = DOCUMENT_KINDS.find((d) => d.code === kind);

  return (
    <article className={cn('doc', ACCENT_CLASS[spec?.accent ?? 'slate'], className)}>
      <header className="doc-head">
        <div className="flex min-w-0 items-start gap-3">
          <GitaMark className="mt-0.5 h-7 w-auto shrink-0" />
          <div className="min-w-0">
            <p className="doc-code">
              {spec?.name ?? 'Tài liệu'} · {code}
            </p>
            <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-fg">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-fg-muted">{subtitle}</p>}
          </div>
        </div>
        {meta && <div className="shrink-0 text-right text-xs text-fg-muted">{meta}</div>}
      </header>

      <div className="mt-6 space-y-6">{children}</div>

      <footer className="doc-foot flex flex-wrap items-center justify-between gap-2">
        <span>
          HSA365 · Mô thức huấn luyện GITA — <span className="doc-code">{code}</span>
        </span>
        <span>
          Tra cứu lời giải và phiếu hướng dẫn của tài liệu này bằng chính mã ở trên.
        </span>
      </footer>
    </article>
  );
}
