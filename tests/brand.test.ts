import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { GITA_PILLARS } from '../src/data/gita';
import {
  BRAND_COLORS,
  BRAND_RULES,
  DOCUMENT_KINDS,
  FONT_STACKS,
  MARK_MEANING,
  PRINT_TYPE_SCALE,
} from '../src/brand/tokens';

/** Ti le tuong phan theo WCAG 2.1. */
function contrast(a: string, b: string): number {
  const luminance = (hex: string) => {
    const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const [r, g, bl] = channels.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * (r as number) + 0.7152 * (g as number) + 0.0722 * (bl as number);
  };
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((hi as number) + 0.05) / ((lo as number) + 0.05);
}

describe('bộ nhận diện', () => {
  it('tỉ lệ tương phản ghi trong tài liệu đúng bằng tỉ lệ tính được từ mã màu', () => {
    // Con so trong sach thuong hieu phai la con so THAT. Neu ai do doi mot ma
    // mau ma quen cap nhat ti le, bai test nay do — chu khong phai doi mot
    // nguoi nao do tinh co nhin ra tren man hinh.
    for (const color of BRAND_COLORS) {
      expect(contrast(color.hex, '#ffffff'), `${color.token} trên trắng`).toBeCloseTo(color.onWhite, 1);
      expect(contrast(color.hex, '#0f172a'), `${color.token} trên nền tối`).toBeCloseTo(color.onDark, 1);
    }
  });

  it('màu thương hiệu chính đủ tương phản cho chữ thường ở cả hai chế độ màu', () => {
    const light = BRAND_COLORS.find((c) => c.token === '--gita-blue-600');
    const dark = BRAND_COLORS.find((c) => c.token === '--gita-blue-400');
    expect(light?.onWhite ?? 0).toBeGreaterThanOrEqual(4.5);
    expect(dark?.onDark ?? 0).toBeGreaterThanOrEqual(4.5);
  });

  it('mọi màu dùng cho chữ đều đạt ngưỡng AA trên nền của nó', () => {
    for (const color of BRAND_COLORS) {
      const forText = !color.role.includes('không dùng cho chữ');
      if (!forText) continue;
      const best = Math.max(color.onWhite, color.onDark);
      expect(best, color.token).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('mã màu trong styles.css khớp với bảng màu công bố', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8');
    for (const color of BRAND_COLORS) {
      const variable = color.token.replace('--gita', '--color-gita');
      expect(css, color.token).toContain(`${variable}: ${color.hex.toLowerCase()}`);
    }
  });

  it('màu thương hiệu và màu biểu đồ không bao giờ trùng mã', () => {
    // Hai bang mau tra loi hai cau hoi khac nhau: "bam duoc khong" va "day la
    // nhom nao". Trung ma thi nguoi doc se thu bam vao mot cot bieu do.
    const css = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8');
    const viz = [...css.matchAll(/--c-viz-\d: (#[0-9a-f]{6})/g)].map((m) => m[1]);
    const brand = [...css.matchAll(/--c-brand(?:-hover)?: (#[0-9a-f]{6})/g)].map((m) => m[1]);
    for (const b of brand) expect(viz, `màu thương hiệu ${b}`).not.toContain(b);
  });

  it('bốn phần tử của dấu hiệu ánh xạ đủ và đúng bốn trụ cột GITA', () => {
    expect(MARK_MEANING).toHaveLength(4);
    const mapped = MARK_MEANING.map((m) => m.pillar).sort();
    expect(mapped).toEqual(GITA_PILLARS.map((p) => p.id).sort());
    for (const item of MARK_MEANING) {
      expect(item.meaning.length, item.element).toBeGreaterThan(60);
      expect(BRAND_COLORS.some((c) => c.token === item.colorToken), item.colorToken).toBe(true);
    }
  });

  it('mọi quy tắc dùng đều nêu được lý do, không chỉ mệnh lệnh', () => {
    expect(BRAND_RULES.length).toBeGreaterThanOrEqual(5);
    for (const rule of BRAND_RULES) {
      expect(rule.why.length, rule.rule).toBeGreaterThan(60);
    }
  });

  it('mã tiền tố tài liệu không trùng nhau và khớp mã phiếu thật', () => {
    const codes = DOCUMENT_KINDS.map((d) => d.code);
    expect(new Set(codes).size).toBe(codes.length);
    for (const code of ['PL', 'LG', 'HD']) expect(codes).toContain(code);
  });

  it('hệ chữ không phụ thuộc phông tải từ Internet', () => {
    // Chinh sach bao mat cua trang chi cho phep font-src 'self', va ung dung
    // phai chay duoc khi mat mang.
    for (const stack of Object.values(FONT_STACKS)) {
      expect(stack).not.toMatch(/https?:|fonts\.googleapis|fonts\.gstatic/);
    }
    const css = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8');
    expect(css).not.toMatch(/@import url\(['"]?https?:/);
  });

  it('thang chữ in nhỏ dần và luôn có bậc chú thích', () => {
    const sizes = PRINT_TYPE_SCALE.map((s) => Number.parseFloat(s.size));
    for (let i = 1; i < sizes.length; i += 1) {
      expect(sizes[i] as number).toBeLessThan(sizes[i - 1] as number);
    }
    expect(PRINT_TYPE_SCALE.at(-1)?.name).toBe('Chú thích');
  });

  it('tệp logo xuất ra dùng đúng mã màu của bảng màu', () => {
    const svg = readFileSync(resolve(process.cwd(), 'public/logo-gita.svg'), 'utf8');
    for (const token of ['--gita-blue-500', '--gita-blue-400', '--gita-red-500', '--gita-blue-600']) {
      const hex = BRAND_COLORS.find((c) => c.token === token)?.hex ?? '';
      expect(svg.toUpperCase(), token).toContain(hex.toUpperCase());
    }
  });

  it('bản in dùng bảng màu sáng dù màn hình đang ở chế độ tối', () => {
    // In nen toi ra giay vua ton muc vua khong doc duoc.
    const css = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8');
    const print = css.slice(css.indexOf('@media print'));
    expect(print).toContain('--c-canvas: #ffffff');
    // Kho giay duoc khai bao o cap cao nhat — @page von chi ap dung khi in.
    expect(css).toContain('@page');
    expect(css).toContain('size: A4');
  });
});
