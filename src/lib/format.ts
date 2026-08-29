/** Cac ham dinh dang dung chung, chuan hoa theo tieng Viet. */

const NUMBER_VI = new Intl.NumberFormat('vi-VN');

export function formatNumber(value: number): string {
  return NUMBER_VI.format(value);
}

/** 1 chu so thap phan, dung dau phay theo chuan Viet Nam. */
export function formatScore(value: number): string {
  return value.toFixed(1).replace('.', ',');
}

export function formatPercent(ratio: number, digits = 0): string {
  if (!Number.isFinite(ratio)) return '—';
  return `${(ratio * 100).toFixed(digits).replace('.', ',')}%`;
}

/** mm:ss hoac h:mm:ss khi vuot 1 gio. */
export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(sec).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function formatDuration(ms: number): string {
  const minutes = Math.round(ms / 60000);
  if (minutes < 60) return `${minutes} phut`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} gio` : `${h} gio ${m} phut`;
}

/** Khoa ngay theo lich dia phuong (khong dung toISOString de tranh lech mui gio). */
export function dayKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseDayKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/** So ngay tron (theo lich) tu hom nay den ngay dich. */
export function daysUntil(isoDate: string, from: Date = new Date()): number {
  const target = parseDayKey(isoDate);
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime();
  const b = new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();
  return Math.round((b - a) / 86400000);
}

export function formatDate(isoDate: string): string {
  const d = parseDayKey(isoDate);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function formatDateTime(ms: number): string {
  return new Date(ms).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const VI_WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
export function weekdayShort(date: Date): string {
  return VI_WEEKDAYS[date.getDay()] ?? '';
}

/**
 * Chuan hoa dap an dang dien de so sanh cong bang:
 * bo khoang trang, ha chu thuong, chap nhan ca dau phay va dau cham thap phan,
 * bo so 0 thua o dau va cuoi phan thap phan.
 */
export function normalizeFillAnswer(raw: string): string {
  let v = raw
    .trim()
    .toLowerCase()
    .replace(/[\s\u00a0\u200b]+/g, '')
    .replace(/^\+/, '')
    .replace(/(\d),(?=\d)/g, '$1.');

  if (/^-?\d+\.\d+$/.test(v)) {
    v = v.replace(/0+$/, '').replace(/\.$/, '');
  }
  if (/^-?0\d+/.test(v)) {
    v = v.replace(/^(-?)0+(?=\d)/, '$1');
  }
  return v;
}
