/** Bộ sinh số giả ngẫu nhiên có hạt giống (mulberry32) — cùng seed luôn cho cùng nội dung. */
export class Rng {
  private s: number;

  constructor(seed: number) {
    this.s = seed >>> 0 || 1;
  }

  next(): number {
    this.s = (this.s + 0x6d2b79f5) >>> 0;
    let t = this.s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** Số nguyên trong [a; b]. */
  int(a: number, b: number): number {
    return a + Math.floor(this.next() * (b - a + 1));
  }

  pick<T>(arr: readonly T[]): T {
    return arr[this.int(0, arr.length - 1)];
  }

  /** Chọn ngẫu nhiên k phần tử khác nhau. */
  sample<T>(arr: readonly T[], k: number): T[] {
    const copy = [...arr];
    const out: T[] = [];
    for (let i = 0; i < k && copy.length; i++) {
      out.push(copy.splice(this.int(0, copy.length - 1), 1)[0]);
    }
    return out;
  }

  shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = this.int(0, i);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  bool(): boolean {
    return this.next() < 0.5;
  }
}

/** Băm chuỗi thành số nguyên 32-bit — dùng để tạo seed ổn định từ mã phiếu. */
export function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export const lcm = (a: number, b: number): number => Math.abs(a * b) / gcd(a, b);

/** Luỹ thừa modulo, tránh tràn số. */
export function modPow(base: number, exp: number, mod: number): number {
  let result = 1;
  let b = ((base % mod) + mod) % mod;
  let e = exp;
  while (e > 0) {
    if (e & 1) result = (result * b) % mod;
    b = (b * b) % mod;
    e >>= 1;
  }
  return result;
}

/** Số ước dương của n. */
export function divisorCount(n: number): number {
  const m = Math.abs(n);
  if (m === 0) return 0;
  let count = 0;
  for (let i = 1; i * i <= m; i++) {
    if (m % i === 0) count += i * i === m ? 1 : 2;
  }
  return count;
}

/* ------------ Hiển thị số ------------ */

/** Dấu trừ toán học (U+2212) thay cho hyphen. */
export const neg = (n: number): string => (n < 0 ? `−${Math.abs(n)}` : `${n}`);

/** " + 3" hoặc " − 3", dùng khi nối hạng tử. */
export const term = (n: number): string => (n < 0 ? ` − ${Math.abs(n)}` : ` + ${n}`);

/** Hạng tử có biến: "3x", "−x", "" (khi hệ số 0). */
export function coefTerm(c: number, v: string, leading = false): string {
  if (c === 0) return '';
  const abs = Math.abs(c);
  const body = abs === 1 ? v : `${abs}${v}`;
  if (leading) return c < 0 ? `−${body}` : body;
  return c < 0 ? ` − ${body}` : ` + ${body}`;
}

/** Phân số rút gọn dạng chuỗi. */
export function frac(n: number, d: number): string {
  if (d === 0) return '∞';
  let sign = n * d < 0 ? '−' : '';
  let a = Math.abs(n);
  const b = Math.abs(d);
  const g = gcd(a, b) || 1;
  a /= g;
  const bb = b / g;
  if (bb === 1) return `${sign}${a}`;
  if (a === 0) {
    sign = '';
    return '0';
  }
  return `${sign}${a}/${bb}`;
}

/** Số thập phân kiểu Việt Nam (dấu phẩy). */
export function vnNum(x: number, digits = 2): string {
  const r = Number(x.toFixed(digits));
  return String(r).replace('.', ',');
}
