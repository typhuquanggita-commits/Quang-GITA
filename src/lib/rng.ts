/**
 * Sinh so ngau nhien co hat giong (mulberry32).
 *
 * Vi sao khong dung Math.random: de thi phai tai lap duoc. Cung mot hat giong
 * phai cho ra dung mot de — de nguoi hoc chia se de voi ban, de test on dinh,
 * va de khoi phuc dung de sau khi tai lai trang.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Bam chuoi thanh so 32-bit (FNV-1a) de dung lam hat giong on dinh. */
export function hashSeed(input: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Fisher-Yates, khong sua mang goc. */
export function shuffle<T>(items: readonly T[], rand: () => number): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    const a = out[i] as T;
    const b = out[j] as T;
    out[i] = b;
    out[j] = a;
  }
  return out;
}

/** Lay ngau nhien k phan tu khong lap. */
export function sample<T>(items: readonly T[], k: number, rand: () => number): T[] {
  return shuffle(items, rand).slice(0, Math.max(0, Math.min(k, items.length)));
}
