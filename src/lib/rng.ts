import type { Rng } from '@/types';

/** Bộ sinh số giả ngẫu nhiên có hạt giống (mulberry32) —
 *  bảo đảm cùng một mã đề luôn sinh ra đúng cùng một bộ câu hỏi. */
export function makeRng(seed: number): Rng {
  let s = (seed >>> 0) || 1;
  const next = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (min: number, max: number) => min + Math.floor(next() * (max - min + 1));
  return {
    next,
    int,
    pick: <T,>(arr: readonly T[]) => arr[int(0, arr.length - 1)],
    bool: () => next() < 0.5,
    sign: () => (next() < 0.5 ? -1 : 1),
    shuffle: <T,>(arr: T[]) => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = int(0, i);
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
  };
}

/** Hash chuỗi thành số nguyên — dùng làm hạt giống ổn định từ mã đề. */
export function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/* ---------------- Tiện ích số học dùng chung cho ngân hàng đề ---------------- */

export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export const lcm = (a: number, b: number): number => Math.abs(a * b) / gcd(a, b);

export function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}

export function primesUpTo(n: number): number[] {
  const out: number[] = [];
  for (let i = 2; i <= n; i++) if (isPrime(i)) out.push(i);
  return out;
}

/** Phân tích ra thừa số nguyên tố: 60 -> [[2,2],[3,1],[5,1]] */
export function factorize(n: number): [number, number][] {
  const out: [number, number][] = [];
  let m = Math.abs(n);
  for (let p = 2; p * p <= m; p++) {
    let e = 0;
    while (m % p === 0) { m /= p; e++; }
    if (e) out.push([p, e]);
  }
  if (m > 1) out.push([m, 1]);
  return out;
}

/** Rút gọn phân số, luôn đưa dấu âm lên tử. */
export function reduce(a: number, b: number): [number, number] {
  if (b === 0) return [a, 0];
  const g = gcd(a, b) || 1;
  let n = a / g, d = b / g;
  if (d < 0) { n = -n; d = -d; }
  return [n, d];
}

/** Định dạng phân số theo cú pháp toán của MATHGITA. */
export function frac(a: number, b: number): string {
  const [n, d] = reduce(a, b);
  if (d === 1) return `${n}`;
  if (n === 0) return '0';
  return n < 0 ? `-\\f{${-n}}{${d}}` : `\\f{${n}}{${d}}`;
}

/** Rút gọn căn bậc hai: 72 -> "6\\s{2}" */
export function simplifySqrt(n: number): string {
  let out = 1, inn = n;
  for (let i = 2; i * i <= inn; i++) {
    while (inn % (i * i) === 0) { out *= i; inn /= i * i; }
  }
  if (inn === 1) return `${out}`;
  return out === 1 ? `\\s{${inn}}` : `${out}\\s{${inn}}`;
}

/** Viết đơn thức có hệ số: (3, 'x') -> "3x"; (-1,'x') -> "-x"; (1,'x') -> "x" */
export function term(coef: number, v: string, first = false): string {
  if (coef === 0) return '';
  const sign = coef < 0 ? '-' : first ? '' : '+';
  const a = Math.abs(coef);
  const body = v === '' ? `${a}` : a === 1 ? v : `${a}${v}`;
  return `${sign}${body}`;
}

/** Viết đa thức từ mảng hệ số bậc giảm dần: [1,-3,2] -> "x^{2}-3x+2" */
export function poly(coefs: number[], v = 'x'): string {
  const n = coefs.length - 1;
  let s = '';
  coefs.forEach((c, i) => {
    const p = n - i;
    if (c === 0) return;
    const vv = p === 0 ? '' : p === 1 ? v : `${v}^{${p}}`;
    s += term(c, vv, s === '');
  });
  return s || '0';
}

/** Làm tròn tới k chữ số thập phân, bỏ số 0 thừa. */
export function round(x: number, k = 2): string {
  const r = Math.round(x * 10 ** k) / 10 ** k;
  return String(r);
}

/** Sinh 3 phương án nhiễu quanh đáp án đúng (số nguyên). */
export function distractInt(r: Rng, correct: number, spread = 5): number[] {
  const set = new Set<number>([correct]);
  const cand = [correct + 1, correct - 1, -correct, correct * 2, correct + spread, correct - spread, correct + 2, correct - 2];
  const pool = r.shuffle(cand.filter((x) => x !== correct));
  for (const c of pool) { if (set.size >= 4) break; set.add(c); }
  let k = 1;
  while (set.size < 4) { set.add(correct + spread + k); k++; }
  return Array.from(set).filter((x) => x !== correct).slice(0, 3);
}

/** Tạo bộ 4 phương án đã trộn, trả về [options, chỉ số đáp án đúng]. */
export function mcOptions(r: Rng, correct: string, wrong: string[]): [string[], number] {
  const uniq = Array.from(new Set(wrong.filter((w) => w !== correct))).slice(0, 3);
  while (uniq.length < 3) uniq.push(`${correct} + ${uniq.length + 1}`);
  const all = r.shuffle([correct, ...uniq]);
  return [all, all.indexOf(correct)];
}
