import type { StrandId, TrackId } from '@/types';
import { Rng, coefTerm, divisorCount, frac, gcd, lcm, modPow, neg, term } from '@/lib/rng';
import { GENERATORS_QG } from './generators-qg';
import { GENERATORS_EXTRA } from './generators-extra';
import { GENERATORS_GAP } from './generators-gap';
import { GENERATORS_L6 } from './generators-l6';
import { GENERATORS_CK } from './generators-ck';

export interface RawItem {
  prompt: string;
  correct: string;
  wrongs: string[];
  steps: string[];
}

export interface ItemGenerator {
  id: string;
  name: string;
  topicId: string;
  strand: StrandId;
  tracks: TrackId[];
  level: 1 | 2 | 3 | 4 | 5;
  skill: string;
  build: (r: Rng) => RawItem;
}

export interface GenItem {
  generatorId: string;
  name: string;
  topicId: string;
  strand: StrandId;
  skill: string;
  prompt: string;
  choices: string[];
  correct: number;
  steps: string[];
}

/** Ghép đáp án đúng với các phương án nhiễu, loại trùng, xáo trộn. */
function assemble(r: Rng, item: RawItem, gen: ItemGenerator): GenItem {
  const seen = new Set([item.correct]);
  const options: string[] = [];
  for (const w of item.wrongs) {
    if (!seen.has(w) && options.length < 3) {
      seen.add(w);
      options.push(w);
    }
  }
  let filler = 1;
  while (options.length < 3) {
    const alt = `Không có phương án đúng (${filler})`;
    if (!seen.has(alt)) {
      seen.add(alt);
      options.push(alt);
    }
    filler++;
  }
  const all = r.shuffle([item.correct, ...options]);
  return {
    generatorId: gen.id,
    name: gen.name,
    topicId: gen.topicId,
    strand: gen.strand,
    skill: gen.skill,
    prompt: item.prompt,
    choices: all,
    correct: all.indexOf(item.correct),
    steps: item.steps,
  };
}

export function generateItem(gen: ItemGenerator, r: Rng): GenItem {
  return assemble(r, gen.build(r), gen);
}

/* Đa thức bậc hai "x² + bx + c" dạng hiển thị. */
const quad = (b: number, c: number) => `x²${coefTerm(b, 'x')}${c === 0 ? '' : term(c)}`;

/* Bảng dữ liệu đã kiểm chứng cho các bài toán thực tế. */
const MOTION: [number, number, number, number][] = [
  // [quãng đường (km), vận tốc đi (km/h), tăng thêm (km/h), chênh lệch thời gian (phút)]
  [120, 40, 10, 36],
  [150, 50, 10, 30],
  [180, 60, 15, 36],
  [60, 30, 10, 30],
  [100, 50, 25, 40],
  [90, 30, 15, 60],
  [200, 50, 10, 40],
  [140, 70, 10, 15],
  [240, 60, 20, 60],
  [80, 40, 20, 40],
  [120, 30, 10, 60],
  [160, 40, 10, 48],
  [210, 70, 35, 60],
  [300, 60, 15, 60],
];

const WORKPAIRS: [number, number, number][] = [
  // [thời gian riêng người 1, thời gian riêng người 2, thời gian làm chung]
  [4, 12, 3],
  [6, 12, 4],
  [3, 6, 2],
  [10, 15, 6],
  [12, 24, 8],
  [5, 20, 4],
  [6, 30, 5],
  [8, 24, 6],
  [9, 18, 6],
  [12, 36, 9],
  [15, 30, 10],
  [20, 30, 12],
];

const TRIPLES: [number, number, number][] = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [9, 12, 15],
  [8, 15, 17],
  [12, 16, 20],
  [7, 24, 25],
  [20, 21, 29],
];

const HL_PAIRS: [number, number, number][] = [
  // [BH, CH, AH] với AH² = BH·CH
  [4, 9, 6],
  [2, 8, 4],
  [3, 12, 6],
  [1, 4, 2],
  [4, 25, 10],
  [9, 16, 12],
  [2, 18, 6],
  [5, 20, 10],
  [8, 18, 12],
  [6, 24, 12],
  [3, 27, 9],
  [16, 25, 20],
];

const GENERATORS_10: ItemGenerator[] = [
  /* ==================== ĐẠI SỐ – NỀN TẢNG ==================== */
  {
    id: 'g-dkxd',
    name: 'Tìm điều kiện xác định',
    topicId: 'ds-can-thuc',
    strand: 'dai-so',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 1,
    skill: 'Đặt điều kiện xác định',
    build: (r) => {
      const a = r.int(1, 9);
      const b = a + r.int(1, 9);
      return {
        prompt: `Tìm điều kiện xác định của biểu thức A = √(x − ${a}) / (x − ${b}).`,
        correct: `x ≥ ${a} và x ≠ ${b}`,
        wrongs: [`x ≥ ${a}`, `x > ${a} và x ≠ ${b}`, `x ≠ ${b}`],
        steps: [
          `Biểu thức có căn bậc hai nên cần x − ${a} ≥ 0 ⇔ x ≥ ${a}.`,
          `Biểu thức có mẫu nên cần x − ${b} ≠ 0 ⇔ x ≠ ${b}.`,
          `Kết hợp hai điều kiện: x ≥ ${a} và x ≠ ${b}.`,
        ],
      };
    },
  },
  {
    id: 'g-can-kep',
    name: 'Rút gọn căn thức lồng',
    topicId: 'ds-can-thuc',
    strand: 'dai-so',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 2,
    skill: 'Nhận dạng hằng đẳng thức dưới dấu căn',
    build: (r) => {
      const k = r.pick([1, 2]);
      const a = k === 1 ? r.pick([2, 3, 5, 6, 7, 10, 11]) : r.pick([5, 6, 7, 10, 11, 13]);
      const inner = a + k * k;
      const co = 2 * k;
      const rad = k === 1 ? `√${a} − 1` : `√${a} − ${k}`;
      return {
        prompt: `Rút gọn biểu thức √(${inner} − ${co}√${a}).`,
        correct: rad,
        wrongs: [`${k} − √${a}`, `√${a} + ${k}`, `√${a - k * k}`],
        steps: [
          `Ta viết ${inner} − ${co}√${a} = ${a} − 2·${k}·√${a} + ${k * k} = (√${a} − ${k})².`,
          `Do đó √(${inner} − ${co}√${a}) = |√${a} − ${k}|.`,
          `Vì ${a} > ${k * k} nên √${a} > ${k}, suy ra kết quả là ${rad}.`,
        ],
      };
    },
  },
  {
    id: 'g-pt-bac-hai',
    name: 'Giải phương trình bậc hai',
    topicId: 'ds-viete',
    strand: 'dai-so',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 1,
    skill: 'Giải phương trình bậc hai',
    build: (r) => {
      let p = r.int(-6, 6);
      let q = r.int(-6, 6);
      if (p === q) q = p + 1;
      if (p > q) [p, q] = [q, p];
      const b = -(p + q);
      const c = p * q;
      return {
        prompt: `Giải phương trình ${quad(b, c)} = 0.`,
        correct: `x = ${neg(p)} hoặc x = ${neg(q)}`,
        wrongs: [
          `x = ${neg(-p)} hoặc x = ${neg(-q)}`,
          `x = ${neg(p)} hoặc x = ${neg(-q)}`,
          'Phương trình vô nghiệm',
        ],
        steps: [
          `Δ = (${neg(b)})² − 4·1·(${neg(c)}) = ${b * b - 4 * c} > 0 nên phương trình có hai nghiệm phân biệt.`,
          `Nhẩm theo Viète: tổng hai nghiệm bằng ${neg(-b)}, tích hai nghiệm bằng ${neg(c)}.`,
          `Hai số thoả mãn là ${neg(p)} và ${neg(q)}.`,
          `Vậy x = ${neg(p)} hoặc x = ${neg(q)}.`,
        ],
      };
    },
  },
  {
    id: 'g-viete-bieu-thuc',
    name: 'Tính biểu thức đối xứng theo Viète',
    topicId: 'ds-viete',
    strand: 'dai-so',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 2,
    skill: 'Biến đổi biểu thức đối xứng về S và P',
    build: (r) => {
      const S = r.int(3, 9);
      const P = r.int(1, Math.max(1, Math.floor((S * S - 1) / 4)));
      const value = S * S - 2 * P;
      return {
        prompt: `Phương trình ${quad(-S, P)} = 0 có hai nghiệm x₁, x₂. Tính giá trị của x₁² + x₂².`,
        correct: `${value}`,
        wrongs: [`${S * S + 2 * P}`, `${S * S - P}`, `${S * S - 4 * P}`],
        steps: [
          `Δ = ${S}² − 4·${P} = ${S * S - 4 * P} > 0 nên phương trình có hai nghiệm phân biệt.`,
          `Theo định lí Viète: S = x₁ + x₂ = ${S}, P = x₁x₂ = ${P}.`,
          `x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂ = S² − 2P = ${S * S} − ${2 * P} = ${value}.`,
        ],
      };
    },
  },
  {
    id: 'g-viete-thamso',
    name: 'Viète với tham số',
    topicId: 'ds-viete',
    strand: 'dai-so',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 3,
    skill: 'Xử lý bài toán tham số bằng Viète',
    build: (r) => {
      const t = r.int(1, 6);
      const m0 = r.int(1, 4);
      const V = 2 * m0 * m0 + 2 * t;
      return {
        prompt: `Cho phương trình x² − 2mx + (m² − ${t}) = 0 (m là tham số). Tìm tất cả giá trị của m để phương trình có hai nghiệm x₁, x₂ thoả mãn x₁² + x₂² = ${V}.`,
        correct: `m = ${m0} hoặc m = −${m0}`,
        wrongs: [`m = ${m0}`, `m = ${m0 + 1} hoặc m = −${m0 + 1}`, 'Không tồn tại m'],
        steps: [
          `Δ′ = m² − (m² − ${t}) = ${t} > 0 với mọi m, nên phương trình luôn có hai nghiệm phân biệt.`,
          `Theo Viète: S = x₁ + x₂ = 2m, P = x₁x₂ = m² − ${t}.`,
          `x₁² + x₂² = S² − 2P = 4m² − 2(m² − ${t}) = 2m² + ${2 * t}.`,
          `Yêu cầu: 2m² + ${2 * t} = ${V} ⇔ m² = ${m0 * m0} ⇔ m = ±${m0}.`,
          `Cả hai giá trị đều thoả Δ′ > 0. Vậy m = ±${m0}.`,
        ],
      };
    },
  },
  {
    id: 'g-he-bac-nhat',
    name: 'Giải hệ phương trình bậc nhất hai ẩn',
    topicId: 'ds-pt-hpt',
    strand: 'dai-so',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 1,
    skill: 'Giải hệ bằng cộng đại số / thế',
    build: (r) => {
      const x0 = r.int(-5, 5);
      const y0 = r.int(-5, 5);
      const a1 = r.int(1, 4);
      const b1 = r.int(1, 4);
      let a2 = r.int(1, 4);
      let b2 = r.int(-4, -1);
      if (a1 * b2 - a2 * b1 === 0) {
        a2 += 1;
        b2 -= 1;
      }
      const c1 = a1 * x0 + b1 * y0;
      const c2 = a2 * x0 + b2 * y0;
      const f = (a: number, b: number, c: number) =>
        `${coefTerm(a, 'x', true)}${coefTerm(b, 'y')} = ${neg(c)}`;
      return {
        prompt: `Giải hệ phương trình: ${f(a1, b1, c1)} và ${f(a2, b2, c2)}.`,
        correct: `(x; y) = (${neg(x0)}; ${neg(y0)})`,
        wrongs: [
          `(x; y) = (${neg(y0)}; ${neg(x0)})`,
          `(x; y) = (${neg(-x0)}; ${neg(-y0)})`,
          `(x; y) = (${neg(x0 + 1)}; ${neg(y0 - 1)})`,
        ],
        steps: [
          `Nhân phương trình đầu với ${Math.abs(a2)} và phương trình sau với ${a1}, rồi trừ vế theo vế để khử x.`,
          `Giải ra y = ${neg(y0)}.`,
          `Thay y vào phương trình đầu: ${coefTerm(a1, 'x', true)} = ${neg(c1)} − (${neg(b1 * y0)}) ⇒ x = ${neg(x0)}.`,
          `Vậy nghiệm của hệ là (x; y) = (${neg(x0)}; ${neg(y0)}).`,
        ],
      };
    },
  },
  {
    id: 'g-he-an-phu',
    name: 'Hệ phương trình đặt ẩn phụ chứa căn',
    topicId: 'ds-pt-hpt',
    strand: 'dai-so',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 3,
    skill: 'Đặt ẩn phụ và trả biến',
    build: (r) => {
      const p = r.int(0, 5);
      const q = r.int(0, 5);
      const u0 = r.int(1, 4);
      const v0 = r.int(1, 4);
      const a1 = r.int(1, 3);
      const b1 = r.int(1, 3);
      const a2 = r.int(1, 3);
      const b2 = r.int(1, 3);
      const c1 = a1 * u0 + b1 * v0;
      const c2 = a2 * u0 - b2 * v0;
      const X = p === 0 ? '√x' : `√(x − ${p})`;
      const Y = q === 0 ? '√y' : `√(y − ${q})`;
      const x0 = p + u0 * u0;
      const y0 = q + v0 * v0;
      return {
        prompt: `Giải hệ phương trình: ${a1 === 1 ? '' : a1}${X} + ${b1 === 1 ? '' : b1}${Y} = ${neg(c1)} và ${a2 === 1 ? '' : a2}${X} − ${b2 === 1 ? '' : b2}${Y} = ${neg(c2)}.`,
        correct: `(x; y) = (${x0}; ${y0})`,
        wrongs: [
          `(x; y) = (${y0}; ${x0})`,
          `(x; y) = (${u0}; ${v0})`,
          `(x; y) = (${x0 + 1}; ${y0 + 1})`,
        ],
        steps: [
          `ĐKXĐ: x ≥ ${p}, y ≥ ${q}. Đặt u = ${X} ≥ 0, v = ${Y} ≥ 0.`,
          `Hệ trở thành ${a1}u + ${b1}v = ${neg(c1)} và ${a2}u − ${b2}v = ${neg(c2)}.`,
          `Giải hệ bậc nhất này được u = ${u0}, v = ${v0} (đều thoả điều kiện không âm).`,
          `Trả biến: ${X} = ${u0} ⇒ x = ${p} + ${u0}² = ${x0}; ${Y} = ${v0} ⇒ y = ${q} + ${v0}² = ${y0}.`,
          `Đối chiếu ĐKXĐ, nghiệm của hệ là (x; y) = (${x0}; ${y0}).`,
        ],
      };
    },
  },
  {
    id: 'g-pt-vo-ti',
    name: 'Phương trình vô tỉ cơ bản',
    topicId: 'ds-ptvt',
    strand: 'dai-so',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 3,
    skill: 'Bình phương có điều kiện & loại nghiệm ngoại lai',
    build: (r) => {
      const c = r.int(0, 4);
      const root = r.int(c + 2, c + 8);
      const b = (root - c) * (root - c) - root;
      const other = 2 * c + 1 - root;
      const lhs = b === 0 ? '√x' : b > 0 ? `√(x + ${b})` : `√(x − ${-b})`;
      const rhs = c === 0 ? 'x' : `x − ${c}`;
      return {
        prompt: `Giải phương trình ${lhs} = ${rhs}.`,
        correct: `x = ${root}`,
        wrongs: [`x = ${neg(other)}`, `x = ${root} hoặc x = ${neg(other)}`, 'Phương trình vô nghiệm'],
        steps: [
          `ĐKXĐ: ${b === 0 ? 'x ≥ 0' : `x ≥ ${neg(-b)}`} và vế phải không âm, tức x ≥ ${c}.`,
          `Bình phương hai vế: x ${b >= 0 ? `+ ${b}` : `− ${-b}`} = (${rhs})² ⇔ ${quad(-(2 * c + 1), c * c - b)} = 0.`,
          `Phương trình bậc hai này có hai nghiệm x = ${root} và x = ${neg(other)}.`,
          `Đối chiếu điều kiện x ≥ ${c}: nghiệm x = ${neg(other)} bị loại (nghiệm ngoại lai).`,
          `Vậy phương trình có nghiệm duy nhất x = ${root}.`,
        ],
      };
    },
  },
  {
    id: 'g-he-doi-xung',
    name: 'Hệ đối xứng loại I',
    topicId: 'ds-ptvt',
    strand: 'dai-so',
    tracks: ['chuyen'],
    level: 4,
    skill: 'Đặt S – P và kiểm tra S² ≥ 4P',
    build: (r) => {
      const u = r.int(1, 7);
      const v = r.int(1, 7);
      const S = u + v;
      const Q = u * u + v * v;
      const P = u * v;
      const lo = Math.min(u, v);
      const hi = Math.max(u, v);
      return {
        prompt: `Giải hệ phương trình: x + y = ${S} và x² + y² = ${Q}.`,
        correct: `(x; y) = (${lo}; ${hi}) và (${hi}; ${lo})`,
        wrongs: [
          `(x; y) = (${lo}; ${lo}) và (${hi}; ${hi})`,
          `(x; y) = (${lo + 1}; ${hi - 1})`,
          'Hệ vô nghiệm',
        ],
        steps: [
          `Đặt S = x + y = ${S}, P = xy. Ta có x² + y² = S² − 2P.`,
          `Suy ra ${Q} = ${S * S} − 2P ⇒ P = ${P}.`,
          `Kiểm tra điều kiện S² ≥ 4P: ${S * S} ≥ ${4 * P} (thoả mãn).`,
          `x, y là hai nghiệm của phương trình t² − ${S}t + ${P} = 0, tức t = ${lo} hoặc t = ${hi}.`,
          `Vậy nghiệm của hệ là (${lo}; ${hi}) và (${hi}; ${lo}).`,
        ],
      };
    },
  },
  {
    id: 'g-tuong-giao',
    name: 'Tương giao parabol và đường thẳng',
    topicId: 'ds-viete',
    strand: 'dai-so',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 2,
    skill: 'Lập phương trình hoành độ giao điểm',
    build: (r) => {
      let p = r.int(-5, 5);
      let q = r.int(-5, 5);
      if (p === q) q = p + 2;
      if (p > q) [p, q] = [q, p];
      const b = p + q;
      const c = -p * q;
      return {
        prompt: `Tìm hoành độ các giao điểm của parabol (P): y = x² và đường thẳng (d): y = ${coefTerm(b, 'x', true) || '0'}${c === 0 ? '' : term(c)}.`,
        correct: `x = ${neg(p)} và x = ${neg(q)}`,
        wrongs: [
          `x = ${neg(-p)} và x = ${neg(-q)}`,
          `x = ${neg(p)} và x = ${neg(-q)}`,
          '(d) không cắt (P)',
        ],
        steps: [
          `Phương trình hoành độ giao điểm: x² = ${coefTerm(b, 'x', true) || '0'}${c === 0 ? '' : term(c)}.`,
          `Chuyển vế: ${quad(-b, -c)} = 0.`,
          `Δ = ${b * b + 4 * c} > 0 nên (d) cắt (P) tại hai điểm phân biệt.`,
          `Giải ra x = ${neg(p)} và x = ${neg(q)}.`,
        ],
      };
    },
  },
  {
    id: 'g-da-thuc-du',
    name: 'Số dư của phép chia đa thức',
    topicId: 'ds-da-thuc',
    strand: 'dai-so',
    tracks: ['chuyen'],
    level: 3,
    skill: 'Định lí Bézout',
    build: (r) => {
      const a = r.int(-4, 4);
      const b = r.int(-6, 6);
      const c = r.int(-6, 6);
      const k = r.int(-3, 3);
      const val = k * k * k + a * k * k + b * k + c;
      const poly = `x³${coefTerm(a, 'x²')}${coefTerm(b, 'x')}${c === 0 ? '' : term(c)}`;
      const divisor = k >= 0 ? `x − ${k}` : `x + ${-k}`;
      return {
        prompt: `Tìm số dư khi chia đa thức P(x) = ${poly} cho ${divisor}.`,
        correct: `${neg(val)}`,
        wrongs: [`${neg(-val)}`, `${neg(val + 1)}`, `${neg(c)}`],
        steps: [
          `Theo định lí Bézout, số dư của phép chia P(x) cho (x − ${neg(k)}) bằng P(${neg(k)}).`,
          `P(${neg(k)}) = (${neg(k)})³ ${a >= 0 ? '+' : '−'} ${Math.abs(a)}·(${neg(k)})² ${b >= 0 ? '+' : '−'} ${Math.abs(b)}·(${neg(k)}) ${c >= 0 ? '+' : '−'} ${Math.abs(c)}.`,
          `Tính ra P(${neg(k)}) = ${neg(val)}.`,
          `Vậy số dư là ${neg(val)}.`,
        ],
      };
    },
  },

  /* ==================== TOÁN THỰC TẾ ==================== */
  {
    id: 'g-chuyen-dong',
    name: 'Toán chuyển động',
    topicId: 'ds-toan-loi-van',
    strand: 'thuc-te',
    tracks: ['thpt', 'chinh-khoa'],
    level: 2,
    skill: 'Lập phương trình từ dữ kiện chuyển động',
    build: (r) => {
      const [S, v, d, mins] = r.pick(MOTION);
      return {
        prompt: `Một ô tô đi từ A đến B với quãng đường ${S} km. Lúc về, ô tô tăng vận tốc thêm ${d} km/h nên thời gian về ít hơn thời gian đi ${mins} phút. Tính vận tốc của ô tô lúc đi.`,
        correct: `${v} km/h`,
        wrongs: [`${v + d} km/h`, `${v - 5} km/h`, `${v + 5} km/h`],
        steps: [
          `Gọi vận tốc lúc đi là x (km/h), x > 0. Thời gian đi là ${S}/x giờ, thời gian về là ${S}/(x + ${d}) giờ.`,
          `Đổi ${mins} phút = ${frac(mins, 60)} giờ.`,
          `Phương trình: ${S}/x − ${S}/(x + ${d}) = ${frac(mins, 60)}.`,
          `Quy đồng và rút gọn, ta được phương trình bậc hai theo x; giải ra x = ${v} (nhận) và một nghiệm âm (loại).`,
          `Vậy vận tốc lúc đi là ${v} km/h.`,
        ],
      };
    },
  },
  {
    id: 'g-nang-suat',
    name: 'Toán năng suất – công việc chung',
    topicId: 'ds-toan-loi-van',
    strand: 'thuc-te',
    tracks: ['thpt', 'chinh-khoa'],
    level: 2,
    skill: 'Quy về năng suất 1 đơn vị thời gian',
    build: (r) => {
      const [t1, t2, t] = r.pick(WORKPAIRS);
      const d = t2 - t1;
      return {
        prompt: `Hai vòi nước cùng chảy vào một bể cạn thì sau ${t} giờ đầy bể. Nếu chảy riêng, vòi thứ nhất chảy đầy bể nhanh hơn vòi thứ hai ${d} giờ. Hỏi mỗi vòi chảy riêng thì sau bao lâu đầy bể?`,
        correct: `${t1} giờ và ${t2} giờ`,
        wrongs: [`${t2} giờ và ${t1 + d} giờ`, `${t1 + 1} giờ và ${t2 + 1} giờ`, `${t} giờ và ${t + d} giờ`],
        steps: [
          `Gọi thời gian vòi thứ nhất chảy riêng là x giờ (x > 0); vòi thứ hai là x + ${d} giờ.`,
          `Mỗi giờ vòi 1 chảy được 1/x bể, vòi 2 chảy được 1/(x + ${d}) bể, cả hai chảy được 1/${t} bể.`,
          `Phương trình: 1/x + 1/(x + ${d}) = 1/${t}.`,
          `Quy đồng: ${t}(2x + ${d}) = x(x + ${d}) ⇔ x² ${d - 2 * t >= 0 ? '+' : '−'} ${Math.abs(d - 2 * t)}x − ${t * d} = 0.`,
          `Giải ra x = ${t1} (nhận), nghiệm còn lại âm (loại). Vậy hai vòi cần ${t1} giờ và ${t2} giờ.`,
        ],
      };
    },
  },
  {
    id: 'g-phan-tram',
    name: 'Toán phần trăm – giảm giá',
    topicId: 'ds-toan-loi-van',
    strand: 'thuc-te',
    tracks: ['thpt', 'chinh-khoa'],
    level: 1,
    skill: 'Tính toán tỉ lệ phần trăm liên tiếp',
    build: (r) => {
      const price = r.pick([200, 250, 300, 400, 500, 600, 800, 1000]);
      const a = r.pick([10, 20, 25]);
      const b = r.pick([10, 20]);
      const after1 = (price * (100 - a)) / 100;
      const final = (after1 * (100 - b)) / 100;
      return {
        prompt: `Một món hàng có giá niêm yết ${price} nghìn đồng. Cửa hàng giảm giá ${a}%, sau đó tiếp tục giảm thêm ${b}% trên giá đã giảm. Hỏi giá cuối cùng của món hàng là bao nhiêu?`,
        correct: `${final} nghìn đồng`,
        wrongs: [
          `${(price * (100 - a - b)) / 100} nghìn đồng`,
          `${after1} nghìn đồng`,
          `${price - a - b} nghìn đồng`,
        ],
        steps: [
          `Sau lần giảm thứ nhất: ${price} × (1 − ${a}/100) = ${after1} nghìn đồng.`,
          `Sau lần giảm thứ hai: ${after1} × (1 − ${b}/100) = ${final} nghìn đồng.`,
          `Lưu ý: hai lần giảm liên tiếp KHÔNG bằng một lần giảm ${a + b}% (đó là bẫy quen thuộc).`,
          `Vậy giá cuối cùng là ${final} nghìn đồng.`,
        ],
      };
    },
  },
  {
    id: 'g-hinh-tru',
    name: 'Hình trụ – diện tích và thể tích',
    topicId: 'tt-hinh-khong-gian',
    strand: 'thuc-te',
    tracks: ['thpt', 'chinh-khoa'],
    level: 1,
    skill: 'Áp dụng công thức hình trụ',
    build: (r) => {
      const rad = r.int(2, 9);
      const h = r.int(3, 12);
      const askV = r.bool();
      const V = rad * rad * h;
      const Sxq = 2 * rad * h;
      return {
        prompt: askV
          ? `Một hình trụ có bán kính đáy ${rad} cm và chiều cao ${h} cm. Tính thể tích của hình trụ.`
          : `Một hình trụ có bán kính đáy ${rad} cm và chiều cao ${h} cm. Tính diện tích xung quanh của hình trụ.`,
        correct: askV ? `${V}π cm³` : `${Sxq}π cm²`,
        wrongs: askV
          ? [`${Sxq}π cm³`, `${rad * h}π cm³`, `${2 * V}π cm³`]
          : [`${V}π cm²`, `${rad * h}π cm²`, `${2 * rad * (h + rad)}π cm²`],
        steps: askV
          ? [
              `Công thức thể tích hình trụ: V = πr²h.`,
              `Thay số: V = π · ${rad}² · ${h} = ${V}π (cm³).`,
            ]
          : [
              `Công thức diện tích xung quanh hình trụ: S_xq = 2πrh.`,
              `Thay số: S_xq = 2π · ${rad} · ${h} = ${Sxq}π (cm²).`,
            ],
      };
    },
  },
  {
    id: 'g-hinh-non',
    name: 'Hình nón – đường sinh và diện tích',
    topicId: 'tt-hinh-khong-gian',
    strand: 'thuc-te',
    tracks: ['thpt', 'chinh-khoa'],
    level: 2,
    skill: 'Liên hệ r, h, l trong hình nón',
    build: (r) => {
      const [rr, h, l] = r.pick(TRIPLES);
      const Sxq = rr * l;
      return {
        prompt: `Một hình nón có bán kính đáy ${rr} cm và chiều cao ${h} cm. Tính diện tích xung quanh của hình nón.`,
        correct: `${Sxq}π cm²`,
        wrongs: [`${rr * h}π cm²`, `${l * h}π cm²`, `${rr * rr}π cm²`],
        steps: [
          `Đường sinh: l = √(r² + h²) = √(${rr}² + ${h}²) = √${rr * rr + h * h} = ${l} (cm).`,
          `Công thức: S_xq = πrl = π · ${rr} · ${l} = ${Sxq}π (cm²).`,
        ],
      };
    },
  },
  {
    id: 'g-hinh-cau',
    name: 'Hình cầu – diện tích mặt cầu',
    topicId: 'tt-hinh-khong-gian',
    strand: 'thuc-te',
    tracks: ['thpt', 'chinh-khoa'],
    level: 1,
    skill: 'Áp dụng công thức hình cầu',
    build: (r) => {
      const R = r.int(2, 9);
      const S = 4 * R * R;
      return {
        prompt: `Một quả bóng có dạng hình cầu bán kính ${R} cm. Tính diện tích mặt cầu.`,
        correct: `${S}π cm²`,
        wrongs: [`${R * R}π cm²`, `${2 * R * R}π cm²`, `${frac(4 * R * R * R, 3)}π cm²`],
        steps: [
          `Công thức diện tích mặt cầu: S = 4πR².`,
          `Thay số: S = 4π · ${R}² = ${S}π (cm²).`,
          `(Nhắc lại: thể tích hình cầu là V = 4πR³/3 — đừng nhầm hai công thức.)`,
        ],
      };
    },
  },
  {
    id: 'g-xac-suat',
    name: 'Xác suất của biến cố đơn giản',
    topicId: 'tt-thong-ke-xac-suat',
    strand: 'thuc-te',
    tracks: ['thpt', 'chinh-khoa'],
    level: 1,
    skill: 'Đếm kết quả thuận lợi / kết quả có thể',
    build: (r) => {
      const red = r.int(2, 9);
      const blue = r.int(2, 9);
      const total = red + blue;
      return {
        prompt: `Một hộp có ${red} viên bi đỏ và ${blue} viên bi xanh, các viên bi cùng kích thước. Lấy ngẫu nhiên một viên bi. Tính xác suất lấy được bi đỏ.`,
        correct: frac(red, total),
        wrongs: [frac(blue, total), frac(red, blue), frac(red, total + 1)],
        steps: [
          `Số kết quả có thể: ${red} + ${blue} = ${total} (lấy 1 trong ${total} viên).`,
          `Số kết quả thuận lợi (lấy được bi đỏ): ${red}.`,
          `Xác suất: P = ${red}/${total} = ${frac(red, total)}.`,
        ],
      };
    },
  },
  {
    id: 'g-thong-ke',
    name: 'Số trung bình cộng của mẫu số liệu',
    topicId: 'tt-thong-ke-xac-suat',
    strand: 'thuc-te',
    tracks: ['thpt', 'chinh-khoa'],
    level: 1,
    skill: 'Tính đặc trưng của mẫu số liệu',
    build: (r) => {
      const base = r.int(4, 9);
      const vals = [base, base + r.int(0, 2), base + r.int(1, 3), base + r.int(0, 1), base + r.int(2, 4)];
      const sum = vals.reduce((a, b) => a + b, 0);
      const sorted = [...vals].sort((a, b) => a - b);
      return {
        prompt: `Điểm kiểm tra Toán của 5 học sinh lần lượt là ${vals.join('; ')}. Tính điểm trung bình của nhóm.`,
        correct: frac(sum, 5),
        wrongs: [`${sorted[2]}`, frac(sum, 4), `${sorted[4]}`],
        steps: [
          `Tổng các giá trị: ${vals.join(' + ')} = ${sum}.`,
          `Số trung bình cộng: ${sum}/5 = ${frac(sum, 5)}.`,
          `(Lưu ý phân biệt với trung vị — trung vị của mẫu này là ${sorted[2]}.)`,
        ],
      };
    },
  },

  /* ==================== HÌNH HỌC ==================== */
  {
    id: 'g-he-thuc-luong',
    name: 'Hệ thức lượng trong tam giác vuông',
    topicId: 'hh-duong-tron-co-ban',
    strand: 'hinh-hoc',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 2,
    skill: 'Áp dụng hệ thức đường cao',
    build: (r) => {
      const [bh, ch, ah] = r.pick(HL_PAIRS);
      return {
        prompt: `Cho tam giác ABC vuông tại A, đường cao AH. Biết BH = ${bh} cm và CH = ${ch} cm. Tính độ dài AH.`,
        correct: `${ah} cm`,
        wrongs: [`${bh + ch} cm`, `${bh * ch} cm`, `${Math.round(((bh + ch) / 2) * 10) / 10} cm`],
        steps: [
          `Trong tam giác vuông, đường cao ứng với cạnh huyền thoả AH² = BH · CH.`,
          `AH² = ${bh} · ${ch} = ${bh * ch}.`,
          `Suy ra AH = √${bh * ch} = ${ah} (cm).`,
        ],
      };
    },
  },
  {
    id: 'g-goc-duong-tron',
    name: 'Góc với đường tròn',
    topicId: 'hh-duong-tron-co-ban',
    strand: 'hinh-hoc',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 1,
    skill: 'Quan hệ góc nội tiếp – góc ở tâm – tứ giác nội tiếp',
    build: (r) => {
      const kind = r.int(0, 2);
      if (kind === 0) {
        const a = r.int(50, 130);
        return {
          prompt: `Cho tứ giác ABCD nội tiếp một đường tròn, biết ∠A = ${a}°. Tính số đo ∠C.`,
          correct: `${180 - a}°`,
          wrongs: [`${a}°`, `${360 - a}°`, `${90 - a > 0 ? 90 - a : a - 90}°`],
          steps: [
            `Tứ giác nội tiếp có tổng hai góc đối bằng 180°.`,
            `∠C = 180° − ∠A = 180° − ${a}° = ${180 - a}°.`,
          ],
        };
      }
      if (kind === 1) {
        const c = r.int(20, 80) * 2;
        return {
          prompt: `Cho đường tròn (O), cung nhỏ AB có số đo ${c}°. Tính số đo góc nội tiếp chắn cung AB đó.`,
          correct: `${c / 2}°`,
          wrongs: [`${c}°`, `${2 * c}°`, `${180 - c}°`],
          steps: [
            `Góc nội tiếp có số đo bằng nửa số đo cung bị chắn.`,
            `Vậy góc nội tiếp bằng ${c}° : 2 = ${c / 2}°.`,
          ],
        };
      }
      const t = r.int(20, 70);
      return {
        prompt: `Cho đường tròn (O; R), dây AB và tiếp tuyến Ax tại A. Biết góc tạo bởi tia tiếp tuyến Ax và dây AB bằng ${t}°. Tính số đo cung nhỏ AB.`,
        correct: `${2 * t}°`,
        wrongs: [`${t}°`, `${t / 2}°`, `${180 - t}°`],
        steps: [
          `Góc tạo bởi tia tiếp tuyến và dây cung có số đo bằng nửa số đo cung bị chắn.`,
          `Do đó cung nhỏ AB = 2 · ${t}° = ${2 * t}°.`,
        ],
      };
    },
  },
  {
    id: 'g-phuong-tich',
    name: 'Phương tích của một điểm',
    topicId: 'hh-phuong-tich',
    strand: 'hinh-hoc',
    tracks: ['chuyen'],
    level: 4,
    skill: 'Tính và vận dụng phương tích',
    build: (r) => {
      const [a, b, c] = r.pick(TRIPLES);
      // c là cạnh huyền: chọn R = a, OM = c ⇒ MT = b
      const R = a;
      const d = c;
      const pw = d * d - R * R;
      return {
        prompt: `Cho đường tròn (O; ${R} cm) và điểm M với OM = ${d} cm. Một đường thẳng qua M cắt đường tròn tại hai điểm A và B. Tính tích MA · MB.`,
        correct: `${pw} cm²`,
        wrongs: [`${d * d + R * R} cm²`, `${d * R} cm²`, 'Phụ thuộc vào vị trí cát tuyến'],
        steps: [
          `Phương tích của M đối với (O) là 𝒫 = OM² − R², và MA · MB = 𝒫 với mọi cát tuyến qua M.`,
          `𝒫 = ${d}² − ${R}² = ${d * d} − ${R * R} = ${pw}.`,
          `Vậy MA · MB = ${pw} cm², không phụ thuộc vào cát tuyến đã chọn (độ dài tiếp tuyến từ M là ${b} cm).`,
        ],
      };
    },
  },
  {
    id: 'g-tiep-tuyen',
    name: 'Độ dài tiếp tuyến kẻ từ một điểm',
    topicId: 'hh-mo-hinh-chuan',
    strand: 'hinh-hoc',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 2,
    skill: 'Mô hình hai tiếp tuyến cắt nhau',
    build: (r) => {
      const [a, b, c] = r.pick(TRIPLES);
      return {
        prompt: `Cho đường tròn (O; ${a} cm) và điểm M nằm ngoài đường tròn với OM = ${c} cm. Kẻ tiếp tuyến MT tới (O) (T là tiếp điểm). Tính độ dài MT.`,
        correct: `${b} cm`,
        wrongs: [`${c - a} cm`, `${a + c} cm`, `${Math.round(Math.sqrt(c * c + a * a) * 10) / 10} cm`],
        steps: [
          `MT là tiếp tuyến nên MT ⊥ OT, do đó tam giác OTM vuông tại T.`,
          `Theo định lí Pythagore: MT² = OM² − OT² = ${c}² − ${a}² = ${c * c - a * a}.`,
          `Vậy MT = ${b} cm.`,
        ],
      };
    },
  },

  /* ==================== SỐ HỌC ==================== */
  {
    id: 'g-tich-lien-tiep',
    name: 'Chia hết của tích các số nguyên liên tiếp',
    topicId: 'sh-chia-het',
    strand: 'so-hoc',
    tracks: ['chuyen'],
    level: 2,
    skill: 'Tính chất tích k số nguyên liên tiếp',
    build: (r) => {
      const k = r.int(2, 5);
      const fact = [1, 1, 2, 6, 24, 120][k];
      const expr = Array.from({ length: k }, (_, i) => (i === 0 ? 'n' : `(n + ${i})`)).join('');
      return {
        prompt: `Với mọi số nguyên n, tích ${expr} luôn chia hết cho số nào dưới đây?`,
        correct: `${fact}`,
        wrongs: [`${fact * 2}`, `${k * k}`, `${fact + 1}`],
        steps: [
          `${expr} là tích của ${k} số nguyên liên tiếp.`,
          `Trong ${k} số nguyên liên tiếp luôn có một số chia hết cho 1, cho 2, …, cho ${k}.`,
          `Do đó tích chia hết cho ${k}! = ${fact}.`,
          `(Không thể khẳng định chia hết cho ${fact * 2}: chẳng hạn với n = 1 tích bằng ${Array.from({ length: k }, (_, i) => 1 + i).reduce((a, b) => a * b, 1)}.)`,
        ],
      };
    },
  },
  {
    id: 'g-so-du-luy-thua',
    name: 'Số dư của luỹ thừa',
    topicId: 'sh-dong-du',
    strand: 'so-hoc',
    tracks: ['chuyen'],
    level: 3,
    skill: 'Tìm chu kì và dùng đồng dư',
    build: (r) => {
      const m = r.pick([5, 7, 9, 11, 13]);
      let a = r.int(2, 9);
      while (gcd(a, m) !== 1) a = r.int(2, 9);
      const n = r.int(30, 400);
      const ans = modPow(a, n, m);
      return {
        prompt: `Tìm số dư khi chia ${a}^{${n}} cho ${m}.`,
        correct: `${ans}`,
        wrongs: [`${(ans + 1) % m}`, `${(ans + 2) % m}`, `${(ans + m - 1) % m}`],
        steps: [
          `Tính các luỹ thừa của ${a} theo modulo ${m} để tìm chu kì.`,
          `Gọi d là số nhỏ nhất thoả ${a}^d ≡ 1 (mod ${m}); khi đó ${a}^{${n}} ≡ ${a}^{${n} mod d} (mod ${m}).`,
          `Thực hiện tính toán ta được ${a}^{${n}} ≡ ${ans} (mod ${m}).`,
          `Vậy số dư cần tìm là ${ans}.`,
        ],
      };
    },
  },
  {
    id: 'g-chu-so-tan-cung',
    name: 'Chữ số tận cùng của luỹ thừa',
    topicId: 'sh-dong-du',
    strand: 'so-hoc',
    tracks: ['chuyen'],
    level: 2,
    skill: 'Chu kì chữ số tận cùng',
    build: (r) => {
      const a = r.int(2, 9);
      const n = r.int(50, 600);
      const ans = modPow(a, n, 10);
      const wrongs = [0, 1, 2].map((k) => `${(ans + k + 1) % 10}`);
      return {
        prompt: `Tìm chữ số tận cùng của ${a}^{${n}}.`,
        correct: `${ans}`,
        wrongs,
        steps: [
          `Chữ số tận cùng của ${a}^n chính là số dư của ${a}^n khi chia cho 10.`,
          `Dãy chữ số tận cùng của ${a}^1, ${a}^2, ${a}^3, … lặp lại theo một chu kì.`,
          `Xác định chu kì rồi lấy ${n} chia cho độ dài chu kì, ta thu được chữ số tận cùng là ${ans}.`,
        ],
      };
    },
  },
  {
    id: 'g-nghiem-nguyen-tich',
    name: 'Phương trình nghiệm nguyên dạng tích',
    topicId: 'sh-nghiem-nguyen',
    strand: 'so-hoc',
    tracks: ['chuyen'],
    level: 3,
    skill: 'Đưa về dạng tích và xét ước',
    build: (r) => {
      const a = r.int(1, 5);
      const b = r.int(1, 5);
      const c = r.int(1, 24);
      const K = c + a * b;
      const count = 2 * divisorCount(K);
      return {
        prompt: `Hỏi phương trình xy ${a === 1 ? '+ x' : `+ ${a}x`} ${b === 1 ? '+ y' : `+ ${b}y`} = ${c} có bao nhiêu cặp nghiệm nguyên (x; y)?`,
        correct: `${count}`,
        wrongs: [`${count / 2}`, `${count + 2}`, 'Vô số'],
        steps: [
          `Nhóm lại: xy + ${a}x + ${b}y = ${c} ⇔ x(y + ${a}) + ${b}(y + ${a}) = ${c} + ${a * b}.`,
          `Do đó (x + ${b})(y + ${a}) = ${K}.`,
          `Mỗi cách chọn x + ${b} là một ước nguyên của ${K} sẽ xác định duy nhất y.`,
          `Số ước nguyên của ${K} là 2 × ${divisorCount(K)} = ${count} (kể cả ước âm).`,
          `Vậy phương trình có ${count} cặp nghiệm nguyên.`,
        ],
      };
    },
  },
  {
    id: 'g-dong-du-tim-n',
    name: 'Tìm n để biểu thức chia hết cho số nguyên tố',
    topicId: 'sh-dong-du',
    strand: 'so-hoc',
    tracks: ['chuyen'],
    level: 4,
    skill: 'Kỹ thuật nhân 4 và hoàn thành bình phương',
    build: (r) => {
      const p = r.pick([7, 11, 13]);
      const b = r.int(1, p - 1);
      const inv4 = modPow(4, p - 2, p);
      const inv2 = modPow(2, p - 2, p);
      let c = ((b * b) % p) * inv4 % p;
      if (c === 0) c = p;
      const n0 = ((p - b) * inv2) % p;
      return {
        prompt: `Tìm tất cả các số nguyên n sao cho n² + ${b}n + ${c} chia hết cho ${p}.`,
        correct: `n ≡ ${n0} (mod ${p})`,
        wrongs: [`n ≡ ${(n0 + 1) % p} (mod ${p})`, `n ≡ ${(n0 + 2) % p} (mod ${p})`, 'Không tồn tại n'],
        steps: [
          `Vì (4, ${p}) = 1 nên n² + ${b}n + ${c} ⋮ ${p} ⇔ 4(n² + ${b}n + ${c}) ⋮ ${p}.`,
          `4(n² + ${b}n + ${c}) = (2n + ${b})² + ${4 * c - b * b}.`,
          `Do ${4 * c - b * b} ⋮ ${p}, điều kiện trở thành (2n + ${b})² ⋮ ${p}.`,
          `${p} là số nguyên tố nên (2n + ${b})² ⋮ ${p} ⇔ 2n + ${b} ⋮ ${p}.`,
          `Giải ra n ≡ ${n0} (mod ${p}). Thử lại với n = ${n0}: ${n0 * n0 + b * n0 + c} = ${p} × ${(n0 * n0 + b * n0 + c) / p} (đúng).`,
        ],
      };
    },
  },
  {
    id: 'g-chinh-phuong-mod4',
    name: 'Loại nghiệm bằng modulo 4',
    topicId: 'sh-nghiem-nguyen',
    strand: 'so-hoc',
    tracks: ['chuyen'],
    level: 3,
    skill: 'Dùng số dư của số chính phương',
    build: (r) => {
      const N = 4 * r.int(100, 700) + 3;
      return {
        prompt: `Phương trình x² + y² = ${N} có bao nhiêu nghiệm nguyên (x; y)?`,
        correct: '0 (phương trình vô nghiệm)',
        wrongs: ['2', '4', 'Vô số'],
        steps: [
          `Với mọi số nguyên a: a chẵn ⇒ a² ≡ 0 (mod 4); a lẻ ⇒ a² ≡ 1 (mod 4).`,
          `Do đó x² + y² chỉ có thể đồng dư 0, 1 hoặc 2 theo modulo 4.`,
          `Mà ${N} = 4 × ${(N - 3) / 4} + 3 nên ${N} ≡ 3 (mod 4).`,
          `Vì 3 không thuộc {0; 1; 2} nên phương trình vô nghiệm.`,
        ],
      };
    },
  },
  {
    id: 'g-ucln-bcnn',
    name: 'ƯCLN và BCNN',
    topicId: 'sh-chia-het',
    strand: 'so-hoc',
    tracks: ['chuyen'],
    level: 1,
    skill: 'Thuật toán Euclid',
    build: (r) => {
      const a = r.int(12, 240);
      const b = r.int(12, 240);
      const g = gcd(a, b);
      const l = lcm(a, b);
      const askG = r.bool();
      return {
        prompt: askG
          ? `Tìm ƯCLN của ${a} và ${b}.`
          : `Tìm BCNN của ${a} và ${b}.`,
        correct: askG ? `${g}` : `${l}`,
        wrongs: askG ? [`${l}`, `${g * 2}`, '1'] : [`${g}`, `${a * b}`, `${l / 2}`],
        steps: [
          `Dùng thuật toán Euclid: ƯCLN(${a}, ${b}) = ${g}.`,
          `Áp dụng hệ thức ƯCLN(a, b) · BCNN(a, b) = a·b: BCNN = ${a} × ${b} / ${g} = ${l}.`,
          `Vậy đáp án là ${askG ? g : l}.`,
        ],
      };
    },
  },
  {
    id: 'g-chinh-phuong-4-lien-tiep',
    name: 'Tích 4 số liên tiếp cộng 1',
    topicId: 'sh-so-nguyen-to',
    strand: 'so-hoc',
    tracks: ['chuyen'],
    level: 3,
    skill: 'Đặt ẩn phụ để nhận ra số chính phương',
    build: (r) => {
      const n = r.int(1, 20);
      const root = n * n + 3 * n + 1;
      return {
        prompt: `Số A = ${n}·${n + 1}·${n + 2}·${n + 3} + 1 là bình phương của số nguyên dương nào?`,
        correct: `${root}`,
        wrongs: [`${root + 1}`, `${root - 1}`, `${(n + 1) * (n + 2)}`],
        steps: [
          `Ghép cặp: n(n + 3) = n² + 3n và (n + 1)(n + 2) = n² + 3n + 2.`,
          `Đặt t = n² + 3n, ta có A = t(t + 2) + 1 = (t + 1)².`,
          `Với n = ${n}: t + 1 = ${n}² + 3·${n} + 1 = ${root}.`,
          `Vậy A = ${root}², tức A = ${root * root}.`,
        ],
      };
    },
  },

  /* ==================== TỔ HỢP ==================== */
  {
    id: 'g-dirichlet',
    name: 'Nguyên lí Dirichlet cơ bản',
    topicId: 'th-dirichlet',
    strand: 'to-hop',
    tracks: ['chuyen'],
    level: 3,
    skill: 'Xác định thỏ và chuồng',
    build: (r) => {
      const scenarios = [
        { boxes: 12, unit: 'tháng sinh', who: 'người' },
        { boxes: 7, unit: 'ngày trong tuần', who: 'học sinh' },
        { boxes: 4, unit: 'tổ', who: 'bạn' },
        { boxes: 5, unit: 'hộp', who: 'viên bi' },
        { boxes: 6, unit: 'màu', who: 'quả bóng' },
      ];
      const s = r.pick(scenarios);
      const k = r.int(2, 5);
      const n = s.boxes * (k - 1) + r.int(1, s.boxes);
      const ans = Math.ceil(n / s.boxes);
      return {
        prompt: `Có ${n} ${s.who} được phân vào ${s.boxes} ${s.unit}. Khẳng định nào sau đây luôn đúng?`,
        correct: `Có ít nhất một ${s.unit} chứa từ ${ans} ${s.who} trở lên`,
        wrongs: [
          `Có ít nhất một ${s.unit} chứa từ ${ans + 1} ${s.who} trở lên`,
          `Mọi ${s.unit} đều chứa đúng ${Math.floor(n / s.boxes)} ${s.who}`,
          `Có ít nhất một ${s.unit} không chứa ${s.who} nào`,
        ],
        steps: [
          `Coi ${n} ${s.who} là “thỏ” và ${s.boxes} ${s.unit} là “chuồng”.`,
          `Theo nguyên lí Dirichlet dạng mạnh, tồn tại một chuồng chứa ít nhất ⌈${n}/${s.boxes}⌉ = ${ans} thỏ.`,
          `Không thể khẳng định con số lớn hơn: nếu phân bố đều nhất có thể, số lớn nhất đúng bằng ${ans}.`,
        ],
      };
    },
  },
  {
    id: 'g-dem-chu-so',
    name: 'Đếm số có các chữ số đôi một khác nhau',
    topicId: 'th-dem',
    strand: 'to-hop',
    tracks: ['chuyen'],
    level: 3,
    skill: 'Quy tắc nhân và ràng buộc chữ số đầu',
    build: (r) => {
      const s = r.pick([5, 6, 7]);
      const d = r.pick([3, 4]);
      let rest = 1;
      for (let i = 0; i < d - 1; i++) rest *= s - 1 - i;
      const ans = (s - 1) * rest;
      let all = 1;
      for (let i = 0; i < d; i++) all *= s - i;
      const digits = Array.from({ length: s }, (_, i) => i).join('; ');
      return {
        prompt: `Có bao nhiêu số tự nhiên có ${d} chữ số đôi một khác nhau được lập từ các chữ số ${digits}?`,
        correct: `${ans}`,
        wrongs: [`${all}`, `${ans + rest}`, `${Math.pow(s, d)}`],
        steps: [
          `Chữ số đầu tiên phải khác 0 nên có ${s - 1} cách chọn.`,
          `Các chữ số còn lại chọn có thứ tự từ ${s - 1} chữ số chưa dùng: ${Array.from({ length: d - 1 }, (_, i) => s - 1 - i).join(' · ')} = ${rest} cách.`,
          `Theo quy tắc nhân: ${s - 1} · ${rest} = ${ans} số.`,
          `(Nếu quên điều kiện chữ số đầu khác 0 sẽ ra ${all} — đó là bẫy thường gặp.)`,
        ],
      };
    },
  },
  {
    id: 'g-bat-bien',
    name: 'Bất biến – tính chẵn lẻ',
    topicId: 'th-bat-bien',
    strand: 'to-hop',
    tracks: ['chuyen'],
    level: 4,
    skill: 'Tìm đại lượng bất biến',
    build: (r) => {
      const n = r.pick([50, 99, 100, 101, 2023, 2024, 2025]);
      const sum = (n * (n + 1)) / 2;
      const odd = sum % 2 === 1;
      return {
        prompt: `Trên bảng viết các số 1; 2; …; ${n}. Mỗi bước, xoá hai số a, b bất kì rồi viết thêm số |a − b|. Sau ${n - 1} bước trên bảng còn đúng một số. Số đó là số chẵn hay số lẻ?`,
        correct: odd ? 'Số lẻ' : 'Số chẵn',
        wrongs: [
          odd ? 'Số chẵn' : 'Số lẻ',
          'Phụ thuộc vào thứ tự thực hiện',
          'Luôn bằng 0',
        ],
        steps: [
          `Gọi S là tổng các số trên bảng. Mỗi bước S đổi thành S − a − b + |a − b|.`,
          `Vì (a + b) và |a − b| luôn cùng tính chẵn lẻ (hiệu của chúng bằng 2·min(a, b)), tính chẵn lẻ của S không đổi — đây là bất biến.`,
          `Ban đầu S = ${n}·${n + 1}/2 = ${sum}, là số ${odd ? 'lẻ' : 'chẵn'}.`,
          `Vậy số cuối cùng còn lại là ${odd ? 'số lẻ' : 'số chẵn'}.`,
        ],
      };
    },
  },

  /* ==================== BẤT ĐẲNG THỨC ==================== */
  {
    id: 'g-amgm-min',
    name: 'AM–GM: giá trị nhỏ nhất của a + k/a',
    topicId: 'bdt-co-ban',
    strand: 'bat-dang-thuc',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 2,
    skill: 'Áp dụng AM–GM cho hai số',
    build: (r) => {
      const m = r.int(2, 9);
      const k = m * m;
      return {
        prompt: `Cho a > 0. Tìm giá trị nhỏ nhất của biểu thức P = a + ${k}/a.`,
        correct: `${2 * m}`,
        wrongs: [`${m}`, `${k}`, `${m * m + 1}`],
        steps: [
          `Vì a > 0 nên áp dụng bất đẳng thức AM–GM cho hai số dương a và ${k}/a:`,
          `P = a + ${k}/a ≥ 2√(a · ${k}/a) = 2√${k} = ${2 * m}.`,
          `Dấu “=” xảy ra khi a = ${k}/a ⇔ a² = ${k} ⇔ a = ${m} (thoả a > 0).`,
          `Vậy min P = ${2 * m}, đạt được khi a = ${m}.`,
        ],
      };
    },
  },
  {
    id: 'g-bdt-nghich-dao',
    name: 'Cực trị của 1/a + 1/b khi a + b không đổi',
    topicId: 'bdt-co-ban',
    strand: 'bat-dang-thuc',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 3,
    skill: 'Bất đẳng thức 1/a + 1/b ≥ 4/(a+b)',
    build: (r) => {
      const s = r.int(2, 12);
      return {
        prompt: `Cho a, b > 0 thoả mãn a + b = ${s}. Tìm giá trị nhỏ nhất của P = 1/a + 1/b.`,
        correct: frac(4, s),
        wrongs: [frac(2, s), frac(1, s), frac(4, s * s)],
        steps: [
          `Với a, b > 0 ta có (a + b)(1/a + 1/b) ≥ 4 (hệ quả của AM–GM).`,
          `Do a + b = ${s} nên P = 1/a + 1/b ≥ 4/${s} = ${frac(4, s)}.`,
          `Dấu “=” xảy ra khi a = b = ${frac(s, 2)}.`,
          `Vậy min P = ${frac(4, s)}.`,
        ],
      };
    },
  },
  {
    id: 'g-bdt-max-tich',
    name: 'Cực trị của tích khi tổng không đổi',
    topicId: 'bdt-co-ban',
    strand: 'bat-dang-thuc',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    level: 2,
    skill: 'AM–GM chiều ngược',
    build: (r) => {
      const s = r.int(2, 20);
      return {
        prompt: `Cho a, b > 0 thoả mãn a + b = ${s}. Tìm giá trị lớn nhất của tích ab.`,
        correct: frac(s * s, 4),
        wrongs: [frac(s * s, 2), `${s}`, frac(s, 2)],
        steps: [
          `Theo AM–GM: √(ab) ≤ (a + b)/2 = ${frac(s, 2)}.`,
          `Bình phương hai vế: ab ≤ ${frac(s * s, 4)}.`,
          `Dấu “=” xảy ra khi a = b = ${frac(s, 2)}.`,
          `Vậy max(ab) = ${frac(s * s, 4)}.`,
        ],
      };
    },
  },
  {
    id: 'g-bdt-ba-bien',
    name: 'Cực trị ab + bc + ca với tổng cho trước',
    topicId: 'bdt-nang-cao',
    strand: 'bat-dang-thuc',
    tracks: ['chuyen'],
    level: 4,
    skill: 'Đánh giá ab + bc + ca ≤ (a+b+c)²/3',
    build: (r) => {
      const s = r.pick([3, 6, 9, 12]);
      return {
        prompt: `Cho a, b, c > 0 thoả mãn a + b + c = ${s}. Tìm giá trị lớn nhất của biểu thức Q = ab + bc + ca.`,
        correct: frac(s * s, 3),
        wrongs: [frac(s * s, 4), `${s}`, frac(s * s, 9)],
        steps: [
          `Từ (a − b)² + (b − c)² + (c − a)² ≥ 0 suy ra a² + b² + c² ≥ ab + bc + ca.`,
          `Do đó (a + b + c)² = a² + b² + c² + 2(ab + bc + ca) ≥ 3(ab + bc + ca).`,
          `Suy ra Q ≤ (a + b + c)²/3 = ${s}²/3 = ${frac(s * s, 3)}.`,
          `Dấu “=” xảy ra khi a = b = c = ${frac(s, 3)}.`,
        ],
      };
    },
  },
];

export const GENERATORS: ItemGenerator[] = [...GENERATORS_10, ...GENERATORS_QG, ...GENERATORS_EXTRA, ...GENERATORS_GAP, ...GENERATORS_L6, ...GENERATORS_CK];

export const generatorById = (id: string) => GENERATORS.find((g) => g.id === id);

export const generatorsFor = (track: TrackId, level: number): ItemGenerator[] => {
  const exact = GENERATORS.filter((g) => g.tracks.includes(track) && g.level === level);
  if (exact.length >= 3) return exact;
  // Nới biên độ khi mức đó có ít dạng bài
  return GENERATORS.filter(
    (g) => g.tracks.includes(track) && Math.abs(g.level - level) <= 1,
  );
};
