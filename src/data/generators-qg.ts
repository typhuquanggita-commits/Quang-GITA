import { coefTerm, frac, gcd, neg, term } from '@/lib/rng';
import type { ItemGenerator } from './generators';

/** Bảng bộ ba (b, c, a) thoả định lí cosin với góc A = 60°: a² = b² + c² − bc. */
const COS60: [number, number, number][] = [
  [3, 8, 7],
  [8, 3, 7],
  [5, 8, 7],
  [8, 15, 13],
  [7, 15, 13],
  [5, 21, 19],
];
/** Với góc A = 120°: a² = b² + c² + bc. */
const COS120: [number, number, number][] = [
  [3, 5, 7],
  [5, 3, 7],
  [7, 8, 13],
  [5, 16, 19],
];

const TRIG: { rhs: string; sol: string }[] = [
  { rhs: 'sin x = 1/2', sol: 'x = π/6 + k2π hoặc x = 5π/6 + k2π (k ∈ ℤ)' },
  { rhs: 'sin x = √2/2', sol: 'x = π/4 + k2π hoặc x = 3π/4 + k2π (k ∈ ℤ)' },
  { rhs: 'sin x = √3/2', sol: 'x = π/3 + k2π hoặc x = 2π/3 + k2π (k ∈ ℤ)' },
  { rhs: 'cos x = 1/2', sol: 'x = ±π/3 + k2π (k ∈ ℤ)' },
  { rhs: 'cos x = √2/2', sol: 'x = ±π/4 + k2π (k ∈ ℤ)' },
  { rhs: 'cos x = √3/2', sol: 'x = ±π/6 + k2π (k ∈ ℤ)' },
  { rhs: 'tan x = 1', sol: 'x = π/4 + kπ (k ∈ ℤ)' },
  { rhs: 'tan x = √3', sol: 'x = π/3 + kπ (k ∈ ℤ)' },
];

/** Bộ ba số nguyên (a, b, c) với a² + b² + c² là số chính phương. */
const NORM3: [number, number, number, number][] = [
  [2, -1, 2, 3],
  [1, 2, 2, 3],
  [1, 2, -2, 3],
  [2, 3, 6, 7],
  [6, -2, 3, 7],
  [2, -6, 3, 7],
  [1, 4, 8, 9],
  [4, 4, 7, 9],
];

const comb = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  let res = 1;
  for (let i = 1; i <= k; i++) res = (res * (n - k + i)) / i;
  return Math.round(res);
};
const perm = (n: number, k: number): number => {
  let res = 1;
  for (let i = 0; i < k; i++) res *= n - i;
  return res;
};

/** Điểm Phần II của đề thi tốt nghiệp theo số ý đúng trong một câu. */
const PART2_SCORE = [0, 0.1, 0.25, 0.5, 1.0];

export const GENERATORS_QG: ItemGenerator[] = [
  /* ================= LỚP 10 ================= */
  {
    id: 'gq-tap-hop',
    name: 'Phép toán trên tập hợp số',
    topicId: 'q10-menh-de-tap-hop',
    strand: 'dai-so',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 1,
    skill: 'Lấy giao – hợp của các khoảng trên trục số',
    build: (r) => {
      const a = r.int(-6, 0);
      const c = r.int(a + 1, a + 4);
      const b = r.int(c + 1, c + 5);
      return {
        prompt: `Cho A = [${neg(a)}; ${neg(b)}] và B = (${neg(c)}; +∞). Xác định tập hợp A ∩ B.`,
        correct: `(${neg(c)}; ${neg(b)}]`,
        wrongs: [`[${neg(c)}; ${neg(b)}]`, `(${neg(c)}; ${neg(b)})`, `[${neg(a)}; ${neg(c)})`],
        steps: [
          `Vẽ trục số và biểu diễn A = [${neg(a)}; ${neg(b)}], B = (${neg(c)}; +∞).`,
          `Phần chung của hai tập bắt đầu sau ${neg(c)} (không lấy ${neg(c)} vì B mở tại đó) và kết thúc tại ${neg(b)} (lấy ${neg(b)} vì A đóng tại đó).`,
          `Vậy A ∩ B = (${neg(c)}; ${neg(b)}].`,
        ],
      };
    },
  },
  {
    id: 'gq-dau-tam-thuc',
    name: 'Xét dấu tam thức bậc hai',
    topicId: 'q10-bpt-tam-thuc',
    strand: 'dai-so',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 2,
    skill: 'Quy tắc trong trái ngoài cùng',
    build: (r) => {
      let p = r.int(-6, 4);
      let q = p + r.int(1, 6);
      if (p > q) [p, q] = [q, p];
      const b = -(p + q);
      const c = p * q;
      return {
        prompt: `Giải bất phương trình x²${coefTerm(b, 'x')}${c === 0 ? '' : term(c)} < 0.`,
        correct: `x ∈ (${neg(p)}; ${neg(q)})`,
        wrongs: [
          `x ∈ [${neg(p)}; ${neg(q)}]`,
          `x ∈ (−∞; ${neg(p)}) ∪ (${neg(q)}; +∞)`,
          `x ∈ (${neg(-q)}; ${neg(-p)})`,
        ],
        steps: [
          `Tam thức có hai nghiệm x = ${neg(p)} và x = ${neg(q)} (nhẩm theo Viète: tổng ${neg(-b)}, tích ${neg(c)}).`,
          `Hệ số a = 1 > 0 nên tam thức mang dấu âm ở khoảng giữa hai nghiệm (“trong trái, ngoài cùng”).`,
          `Vậy tập nghiệm là (${neg(p)}; ${neg(q)}).`,
        ],
      };
    },
  },
  {
    id: 'gq-tam-thuc-tham-so',
    name: 'Tam thức luôn dương với mọi x',
    topicId: 'q10-bpt-tam-thuc',
    strand: 'dai-so',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 3,
    skill: 'Điều kiện a > 0 và Δ < 0',
    build: (r) => {
      const n = r.int(1, 5);
      const k = n * (n + 1);
      return {
        prompt: `Tìm tất cả các giá trị của tham số m để f(x) = x² − 2mx + m + ${k} > 0 với mọi x ∈ ℝ.`,
        correct: `m ∈ (−${n}; ${n + 1})`,
        wrongs: [
          `m ∈ [−${n}; ${n + 1}]`,
          `m ∈ (−∞; −${n}) ∪ (${n + 1}; +∞)`,
          `m ∈ (−${n + 1}; ${n})`,
        ],
        steps: [
          `Hệ số a = 1 > 0, nên f(x) > 0 với mọi x ⇔ Δ′ < 0.`,
          `Δ′ = m² − (m + ${k}) = m² − m − ${k}.`,
          `m² − m − ${k} < 0 ⇔ (m + ${n})(m − ${n + 1}) < 0 ⇔ −${n} < m < ${n + 1}.`,
          `Vậy m ∈ (−${n}; ${n + 1}).`,
        ],
      };
    },
  },
  {
    id: 'gq-dinh-parabol',
    name: 'Toạ độ đỉnh của parabol',
    topicId: 'q10-ham-so-bac-hai',
    strand: 'giai-tich',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 2,
    skill: 'Xác định đỉnh và trục đối xứng',
    build: (r) => {
      const a = r.pick([1, 2, -1, -2]);
      const x0 = r.int(-4, 4);
      const y0 = r.int(-6, 6);
      const b = -2 * a * x0;
      const c = a * x0 * x0 + y0;
      return {
        prompt: `Tìm toạ độ đỉnh của parabol (P): y = ${coefTerm(a, 'x²', true)}${coefTerm(b, 'x')}${c === 0 ? '' : term(c)}.`,
        correct: `I(${neg(x0)}; ${neg(y0)})`,
        wrongs: [`I(${neg(-x0)}; ${neg(y0)})`, `I(${neg(y0)}; ${neg(x0)})`, `I(${neg(x0)}; ${neg(-y0)})`],
        steps: [
          `Hoành độ đỉnh: x_I = −b/(2a) = −(${neg(b)})/(2·${neg(a)}) = ${neg(x0)}.`,
          `Tung độ đỉnh: y_I = f(${neg(x0)}) = ${neg(y0)}.`,
          `Vậy đỉnh là I(${neg(x0)}; ${neg(y0)}), trục đối xứng x = ${neg(x0)}.`,
        ],
      };
    },
  },
  {
    id: 'gq-dinh-li-cosin',
    name: 'Định lí cosin trong tam giác',
    topicId: 'q10-he-thuc-luong',
    strand: 'hinh-hoc',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 2,
    skill: 'Áp dụng định lí cosin',
    build: (r) => {
      const use60 = r.bool();
      const [b, c, a] = r.pick(use60 ? COS60 : COS120);
      const ang = use60 ? 60 : 120;
      const sign = use60 ? '−' : '+';
      return {
        prompt: `Cho tam giác ABC có AC = b = ${b}, AB = c = ${c} và góc A = ${ang}°. Tính độ dài cạnh BC.`,
        correct: `${a}`,
        wrongs: [`${a + 1}`, `${b + c}`, `${Math.abs(b - c) || 1}`],
        steps: [
          `Định lí cosin: a² = b² + c² − 2bc·cos A.`,
          `cos ${ang}° = ${use60 ? '1/2' : '−1/2'}, do đó a² = b² + c² ${sign} bc.`,
          `a² = ${b}² + ${c}² ${sign} ${b}·${c} = ${a * a}.`,
          `Vậy BC = a = ${a}.`,
        ],
      };
    },
  },
  {
    id: 'gq-tich-vo-huong',
    name: 'Tích vô hướng & điều kiện vuông góc',
    topicId: 'q10-vecto',
    strand: 'toa-do',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 2,
    skill: 'Dùng tích vô hướng bằng 0',
    build: (r) => {
      const a = r.int(1, 6);
      const b = r.pick([1, 2, 3]);
      const c = b * r.int(1, 4);
      const m = -(a * c) / b;
      return {
        prompt: `Cho hai vectơ u⃗ = (${a}; ${b}) và v⃗ = (${c}; m). Tìm m để u⃗ ⊥ v⃗.`,
        correct: `m = ${neg(m)}`,
        wrongs: [`m = ${neg(-m)}`, `m = ${neg(a * c)}`, `m = 0`],
        steps: [
          `u⃗ ⊥ v⃗ ⇔ u⃗ · v⃗ = 0.`,
          `u⃗ · v⃗ = ${a}·${c} + ${b}·m = ${a * c} + ${b}m.`,
          `${a * c} + ${b}m = 0 ⇔ m = ${neg(m)}.`,
        ],
      };
    },
  },
  {
    id: 'gq-khoang-cach-oxy',
    name: 'Khoảng cách từ điểm đến đường thẳng',
    topicId: 'q10-toa-do-phang',
    strand: 'toa-do',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 3,
    skill: 'Công thức khoảng cách trong mặt phẳng',
    build: (r) => {
      const x0 = r.int(-5, 5);
      const y0 = r.int(-5, 5);
      const d = r.int(-10, 10);
      const num = Math.abs(3 * x0 + 4 * y0 + d);
      return {
        prompt: `Tính khoảng cách từ điểm M(${neg(x0)}; ${neg(y0)}) đến đường thẳng Δ: 3x + 4y${term(d)} = 0.`,
        correct: frac(num, 5),
        wrongs: [frac(num, 7), frac(num, 25), `${num}`],
        steps: [
          `Công thức: d(M, Δ) = |ax₀ + by₀ + c| / √(a² + b²).`,
          `Tử số: |3·(${neg(x0)}) + 4·(${neg(y0)})${term(d)}| = ${num}.`,
          `Mẫu số: √(3² + 4²) = √25 = 5.`,
          `Vậy d(M, Δ) = ${frac(num, 5)}.`,
        ],
      };
    },
  },
  {
    id: 'gq-duong-tron-oxy',
    name: 'Tâm và bán kính đường tròn',
    topicId: 'q10-toa-do-phang',
    strand: 'toa-do',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 2,
    skill: 'Đưa phương trình đường tròn về dạng chính tắc',
    build: (r) => {
      const a = r.int(-5, 5);
      const b = r.int(-5, 5);
      const R = r.int(1, 7);
      const c = a * a + b * b - R * R;
      return {
        prompt: `Cho đường tròn (C): x² + y²${coefTerm(-2 * a, 'x')}${coefTerm(-2 * b, 'y')}${c === 0 ? '' : term(c)} = 0. Xác định tâm I và bán kính R của (C).`,
        correct: `I(${neg(a)}; ${neg(b)}), R = ${R}`,
        wrongs: [
          `I(${neg(-a)}; ${neg(-b)}), R = ${R}`,
          `I(${neg(a)}; ${neg(b)}), R = ${R * R}`,
          `I(${neg(2 * a)}; ${neg(2 * b)}), R = ${R}`,
        ],
        steps: [
          `Dạng tổng quát x² + y² − 2ax − 2by + c = 0 có tâm I(a; b) và R = √(a² + b² − c).`,
          `Đối chiếu hệ số: a = ${neg(a)}, b = ${neg(b)}, c = ${neg(c)}.`,
          `R = √(${a * a} + ${b * b} − (${neg(c)})) = √${R * R} = ${R}.`,
        ],
      };
    },
  },
  {
    id: 'gq-to-hop',
    name: 'Hoán vị – chỉnh hợp – tổ hợp',
    topicId: 'q10-to-hop-newton',
    strand: 'xac-suat',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 2,
    skill: 'Phân biệt có thứ tự và không thứ tự',
    build: (r) => {
      const n = r.int(5, 10);
      const k = r.int(2, Math.min(4, n - 1));
      const askC = r.bool();
      const C = comb(n, k);
      const A = perm(n, k);
      return {
        prompt: askC
          ? `Một tổ có ${n} học sinh. Có bao nhiêu cách chọn ra ${k} học sinh đi trực nhật (không phân biệt vai trò)?`
          : `Một tổ có ${n} học sinh. Có bao nhiêu cách chọn ${k} học sinh và xếp các bạn đó vào ${k} vị trí khác nhau?`,
        correct: `${askC ? C : A}`,
        wrongs: [`${askC ? A : C}`, `${n * k}`, `${Math.pow(n, k)}`],
        steps: [
          askC
            ? `Việc chọn không phân biệt thứ tự ⇒ dùng tổ hợp C(${n}, ${k}).`
            : `Việc chọn có phân biệt thứ tự ⇒ dùng chỉnh hợp A(${n}, ${k}).`,
          askC
            ? `C(${n}, ${k}) = ${n}! / (${k}!·${n - k}!) = ${C}.`
            : `A(${n}, ${k}) = ${n}! / ${n - k}! = ${A}.`,
          `Ghi nhớ: A(n, k) = C(n, k) × k! — đây là chỗ hay nhầm nhất.`,
        ],
      };
    },
  },
  {
    id: 'gq-newton',
    name: 'Hệ số trong khai triển nhị thức Newton',
    topicId: 'q10-to-hop-newton',
    strand: 'xac-suat',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 3,
    skill: 'Số hạng tổng quát của khai triển',
    build: (r) => {
      const n = r.int(5, 8);
      const a = r.int(1, 3);
      const k = r.int(1, n - 1);
      const i = n - k;
      const coef = comb(n, i) * Math.pow(a, i);
      return {
        prompt: `Tìm hệ số của số hạng chứa x^{${k}} trong khai triển (x + ${a})^{${n}}.`,
        correct: `${coef}`,
        wrongs: [`${comb(n, k)}`, `${comb(n, i)}`, `${coef * a}`],
        steps: [
          `Số hạng tổng quát: C(${n}, i)·x^{${n}−i}·${a}^{i}.`,
          `Cần ${n} − i = ${k} ⇒ i = ${i}.`,
          `Hệ số = C(${n}, ${i})·${a}^{${i}} = ${comb(n, i)} × ${Math.pow(a, i)} = ${coef}.`,
        ],
      };
    },
  },

  /* ================= LỚP 11 ================= */
  {
    id: 'gq-pt-luong-giac',
    name: 'Phương trình lượng giác cơ bản',
    topicId: 'q11-luong-giac',
    strand: 'giai-tich',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 3,
    skill: 'Viết đúng và đủ họ nghiệm',
    build: (r) => {
      const t = r.pick(TRIG);
      const others = TRIG.filter((x) => x.sol !== t.sol);
      return {
        prompt: `Giải phương trình ${t.rhs}.`,
        correct: t.sol,
        wrongs: [
          t.sol.includes('hoặc') ? t.sol.split(' hoặc ')[0] + ' (k ∈ ℤ)' : others[0].sol,
          others[1].sol,
          others[2].sol,
        ],
        steps: [
          `Đây là phương trình lượng giác cơ bản.`,
          `Nhắc lại: sin u = sin v ⇔ u = v + k2π hoặc u = π − v + k2π; cos u = cos v ⇔ u = ±v + k2π; tan u = tan v ⇔ u = v + kπ.`,
          `Áp dụng cho ${t.rhs}, ta được ${t.sol}.`,
          `Lưu ý: với phương trình sin phải ghi ĐỦ hai họ nghiệm — thiếu một họ là mất điểm.`,
        ],
      };
    },
  },
  {
    id: 'gq-cap-so',
    name: 'Cấp số cộng & cấp số nhân',
    topicId: 'q11-day-so',
    strand: 'giai-tich',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 2,
    skill: 'Công thức số hạng tổng quát và tổng',
    build: (r) => {
      const csc = r.bool();
      const u1 = r.int(1, 9);
      const n = r.int(5, 15);
      if (csc) {
        const d = r.int(2, 9);
        const un = u1 + (n - 1) * d;
        const Sn = (n * (u1 + un)) / 2;
        const askS = r.bool();
        return {
          prompt: askS
            ? `Cho cấp số cộng (uₙ) với u₁ = ${u1} và công sai d = ${d}. Tính tổng S_{${n}} của ${n} số hạng đầu tiên.`
            : `Cho cấp số cộng (uₙ) với u₁ = ${u1} và công sai d = ${d}. Tính u_{${n}}.`,
          correct: `${askS ? Sn : un}`,
          wrongs: askS
            ? [`${n * un}`, `${(n * (u1 + un + d)) / 2}`, `${un}`]
            : [`${u1 + n * d}`, `${Sn}`, `${u1 * d * n}`],
          steps: [
            `uₙ = u₁ + (n − 1)d = ${u1} + (${n} − 1)·${d} = ${un}.`,
            askS
              ? `Sₙ = n(u₁ + uₙ)/2 = ${n}·(${u1} + ${un})/2 = ${Sn}.`
              : `Chú ý là (n − 1)d chứ không phải nd — đây là lỗi nhầm phổ biến nhất.`,
          ],
        };
      }
      const q = r.pick([2, 3]);
      const m = r.int(4, 8);
      const um = u1 * Math.pow(q, m - 1);
      return {
        prompt: `Cho cấp số nhân (uₙ) với u₁ = ${u1} và công bội q = ${q}. Tính u_{${m}}.`,
        correct: `${um}`,
        wrongs: [`${u1 * Math.pow(q, m)}`, `${u1 * q * m}`, `${u1 + (m - 1) * q}`],
        steps: [
          `uₙ = u₁·qⁿ⁻¹.`,
          `u_{${m}} = ${u1}·${q}^{${m - 1}} = ${u1} × ${Math.pow(q, m - 1)} = ${um}.`,
        ],
      };
    },
  },
  {
    id: 'gq-gioi-han',
    name: 'Giới hạn dạng vô định 0/0',
    topicId: 'q11-gioi-han',
    strand: 'giai-tich',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 3,
    skill: 'Phân tích thành nhân tử để khử dạng vô định',
    build: (r) => {
      const p = r.int(-5, 5);
      let q = r.int(-5, 5);
      if (q === p) q = p + 3;
      const b = -(p + q);
      const c = p * q;
      const value = p - q;
      return {
        prompt: `Tính giới hạn lim(x → ${neg(p)}) [x²${coefTerm(b, 'x')}${c === 0 ? '' : term(c)}] / (x ${p >= 0 ? `− ${p}` : `+ ${-p}`}).`,
        correct: `${neg(value)}`,
        wrongs: [`${neg(-value)}`, '0', 'Không tồn tại'],
        steps: [
          `Thay trực tiếp x = ${neg(p)} ta được dạng vô định 0/0, nên phải phân tích thành nhân tử.`,
          `x²${coefTerm(b, 'x')}${c === 0 ? '' : term(c)} = (x − ${neg(p)})(x − ${neg(q)}).`,
          `Rút gọn với mẫu: giới hạn = lim(x → ${neg(p)}) (x − ${neg(q)}) = ${neg(p)} − ${neg(q)} = ${neg(value)}.`,
        ],
      };
    },
  },
  {
    id: 'gq-mu-logarit',
    name: 'Phương trình mũ đưa về cùng cơ số',
    topicId: 'q11-mu-logarit',
    strand: 'giai-tich',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 3,
    skill: 'Đưa hai vế về cùng cơ số',
    build: (r) => {
      const base = r.pick([2, 3]);
      const e1 = r.int(1, 3);
      const e2 = r.int(1, 3);
      const b = r.int(-4, 4);
      const c = r.int(-4, 4);
      // base^(e1*x + b) = base^(e2*x + c)  ⇔ e1x + b = e2x + c
      if (e1 === e2) return buildFallbackMu(base);
      const num = c - b;
      const den = e1 - e2;
      return {
        prompt: `Giải phương trình ${Math.pow(base, e1)}^{x}·${base}^{${b}} = ${Math.pow(base, e2)}^{x}·${base}^{${c}}.`,
        correct: `x = ${frac(num, den)}`,
        wrongs: [`x = ${frac(-num, den)}`, `x = ${frac(num + den, den)}`, 'Vô nghiệm'],
        steps: [
          `Đưa về cùng cơ số ${base}: vế trái là ${base}^{${e1}x ${b >= 0 ? '+' : '−'} ${Math.abs(b)}}, vế phải là ${base}^{${e2}x ${c >= 0 ? '+' : '−'} ${Math.abs(c)}}.`,
          `Hàm mũ đơn ánh nên ${e1}x ${b >= 0 ? '+' : '−'} ${Math.abs(b)} = ${e2}x ${c >= 0 ? '+' : '−'} ${Math.abs(c)}.`,
          `Giải ra x = ${frac(num, den)}.`,
        ],
      };
    },
  },
  {
    id: 'gq-logarit-tinh',
    name: 'Tính giá trị biểu thức logarit',
    topicId: 'q11-mu-logarit',
    strand: 'giai-tich',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 2,
    skill: 'Vận dụng công thức logarit',
    build: (r) => {
      const a = r.pick([2, 3, 5]);
      const k = r.int(2, 6);
      const m = r.int(1, 4);
      const value = k + m;
      return {
        prompt: `Tính giá trị của biểu thức P = log_{${a}}(${Math.pow(a, k)}) + log_{${a}}(${Math.pow(a, m)}).`,
        correct: `${value}`,
        wrongs: [`${k * m}`, `${Math.pow(a, value)}`, `${k - m}`],
        steps: [
          `log_a(aⁿ) = n, do đó log_{${a}}(${Math.pow(a, k)}) = ${k} và log_{${a}}(${Math.pow(a, m)}) = ${m}.`,
          `P = ${k} + ${m} = ${value}.`,
          `Cách khác: log_a x + log_a y = log_a(xy) = log_{${a}}(${Math.pow(a, value)}) = ${value}.`,
        ],
      };
    },
  },
  {
    id: 'gq-dao-ham',
    name: 'Tính đạo hàm tại một điểm',
    topicId: 'q11-dao-ham',
    strand: 'giai-tich',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 2,
    skill: 'Quy tắc đạo hàm của đa thức',
    build: (r) => {
      const a = r.int(1, 4);
      const b = r.int(-5, 5);
      const c = r.int(-6, 6);
      const x0 = r.int(-3, 3);
      const val = 3 * a * x0 * x0 + 2 * b * x0 + c;
      return {
        prompt: `Cho hàm số y = ${coefTerm(a, 'x³', true)}${coefTerm(b, 'x²')}${coefTerm(c, 'x')}. Tính y′(${neg(x0)}).`,
        correct: `${neg(val)}`,
        wrongs: [`${neg(-val)}`, `${neg(a * x0 ** 3 + b * x0 ** 2 + c * x0)}`, `${neg(val + 1)}`],
        steps: [
          `Đạo hàm từng hạng tử: y′ = ${3 * a}x²${coefTerm(2 * b, 'x')}${c === 0 ? '' : term(c)}.`,
          `Thay x = ${neg(x0)}: y′ = ${3 * a}·(${neg(x0)})² ${2 * b >= 0 ? '+' : '−'} ${Math.abs(2 * b)}·(${neg(x0)}) ${c >= 0 ? '+' : '−'} ${Math.abs(c)}.`,
          `Tính ra y′(${neg(x0)}) = ${neg(val)}.`,
        ],
      };
    },
  },
  {
    id: 'gq-tiep-tuyen',
    name: 'Phương trình tiếp tuyến của đồ thị',
    topicId: 'q11-dao-ham',
    strand: 'giai-tich',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 3,
    skill: 'Viết tiếp tuyến tại điểm có hoành độ cho trước',
    build: (r) => {
      const k = r.int(-4, 4);
      const x0 = r.int(-2, 2);
      const y0 = x0 ** 3 - 3 * x0 + k;
      const slope = 3 * x0 * x0 - 3;
      const inter = y0 - slope * x0;
      return {
        prompt: `Cho hàm số y = x³ − 3x${k === 0 ? '' : term(k)}. Viết phương trình tiếp tuyến của đồ thị tại điểm có hoành độ x₀ = ${neg(x0)}.`,
        correct: `y = ${coefTerm(slope, 'x', true) || '0'}${inter === 0 ? '' : term(inter)}`,
        wrongs: [
          `y = ${coefTerm(-slope, 'x', true) || '0'}${inter === 0 ? '' : term(inter)}`,
          `y = ${coefTerm(slope, 'x', true) || '0'}${term(-inter)}`,
          `y = ${coefTerm(y0, 'x', true) || '0'}${term(inter)}`,
        ],
        steps: [
          `y′ = 3x² − 3, nên hệ số góc k = y′(${neg(x0)}) = ${neg(slope)}.`,
          `Tung độ tiếp điểm: y₀ = f(${neg(x0)}) = ${neg(y0)}.`,
          `Tiếp tuyến: y = k(x − x₀) + y₀ = ${neg(slope)}(x − ${neg(x0)}) + ${neg(y0)}.`,
          `Rút gọn: y = ${coefTerm(slope, 'x', true) || '0'}${inter === 0 ? '' : term(inter)}.`,
        ],
      };
    },
  },
  {
    id: 'gq-xac-suat-hop',
    name: 'Xác suất của biến cố hợp',
    topicId: 'q11-xac-suat',
    strand: 'xac-suat',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 3,
    skill: 'Công thức cộng xác suất',
    build: (r) => {
      const den = r.pick([10, 20, 25]);
      const a = r.int(2, Math.floor(den / 2));
      const b = r.int(2, Math.floor(den / 2));
      const ab = r.int(1, Math.min(a, b) - 1 || 1);
      const un = a + b - ab;
      return {
        prompt: `Cho hai biến cố A và B với P(A) = ${frac(a, den)}, P(B) = ${frac(b, den)} và P(A ∩ B) = ${frac(ab, den)}. Tính P(A ∪ B).`,
        correct: frac(un, den),
        wrongs: [frac(a + b, den), frac(a + b + ab, den), frac(Math.abs(a - b), den)],
        steps: [
          `Công thức cộng xác suất: P(A ∪ B) = P(A) + P(B) − P(A ∩ B).`,
          `P(A ∪ B) = ${frac(a, den)} + ${frac(b, den)} − ${frac(ab, den)} = ${frac(un, den)}.`,
          `Nếu quên trừ phần giao sẽ ra ${frac(a + b, den)} — đó là lỗi thường gặp.`,
        ],
      };
    },
  },

  /* ================= LỚP 12 ================= */
  {
    id: 'gq-cuc-tri-ham-bac-ba',
    name: 'Điểm cực trị của hàm bậc ba',
    topicId: 'q12-khao-sat-ham-so',
    strand: 'giai-tich',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 3,
    skill: 'Xét dấu đạo hàm để tìm cực trị',
    build: (r) => {
      const m = r.int(1, 6);
      const askMax = r.bool();
      return {
        prompt: `Cho hàm số y = x³ − ${3 * m * m}x. Tìm điểm cực ${askMax ? 'đại' : 'tiểu'} của hàm số.`,
        correct: `x = ${askMax ? `−${m}` : `${m}`}`,
        wrongs: [
          `x = ${askMax ? `${m}` : `−${m}`}`,
          'x = 0',
          `x = ${askMax ? `−${m * m}` : `${m * m}`}`,
        ],
        steps: [
          `y′ = 3x² − ${3 * m * m} = 3(x − ${m})(x + ${m}).`,
          `y′ = 0 ⇔ x = ±${m}.`,
          `Bảng xét dấu: y′ > 0 trên (−∞; −${m}), y′ < 0 trên (−${m}; ${m}), y′ > 0 trên (${m}; +∞).`,
          `Vậy hàm đạt cực đại tại x = −${m} và cực tiểu tại x = ${m}.`,
        ],
      };
    },
  },
  {
    id: 'gq-tiem-can',
    name: 'Tiệm cận của hàm phân thức bậc nhất',
    topicId: 'q12-khao-sat-ham-so',
    strand: 'giai-tich',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 2,
    skill: 'Xác định tiệm cận đứng và tiệm cận ngang',
    build: (r) => {
      const a = r.int(1, 5);
      const b = r.int(-6, 6);
      const c = r.int(1, 4);
      const d = r.int(-6, 6);
      const vd = frac(-d, c);
      const hz = frac(a, c);
      return {
        prompt: `Tìm phương trình các đường tiệm cận của đồ thị hàm số y = (${coefTerm(a, 'x', true)}${term(b)}) / (${coefTerm(c, 'x', true)}${term(d)}).`,
        correct: `Tiệm cận đứng x = ${vd}; tiệm cận ngang y = ${hz}`,
        wrongs: [
          `Tiệm cận đứng x = ${hz}; tiệm cận ngang y = ${vd}`,
          `Tiệm cận đứng x = ${frac(d, c)}; tiệm cận ngang y = ${hz}`,
          `Chỉ có tiệm cận ngang y = ${hz}`,
        ],
        steps: [
          `Tiệm cận đứng: nghiệm của mẫu, ${coefTerm(c, 'x', true)}${term(d)} = 0 ⇔ x = ${vd}.`,
          `Tiệm cận ngang: lim khi x → ±∞ của tỉ số hai hệ số bậc nhất, y = ${a}/${c} = ${hz}.`,
          `(Cần kiểm tra tử không triệt tiêu tại x = ${vd} thì tiệm cận đứng mới tồn tại.)`,
        ],
      };
    },
  },
  {
    id: 'gq-tich-phan',
    name: 'Tính tích phân của đa thức',
    topicId: 'q12-nguyen-ham-tich-phan',
    strand: 'giai-tich',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 3,
    skill: 'Áp dụng công thức Newton–Leibniz',
    build: (r) => {
      const p = r.int(1, 4);
      const q = r.int(-4, 4);
      const s = r.int(-5, 5);
      const a = r.int(0, 2);
      const b = a + r.int(1, 3);
      const num =
        2 * p * (b ** 3 - a ** 3) + 3 * q * (b ** 2 - a ** 2) + 6 * s * (b - a);
      const g = gcd(Math.abs(num), 6) || 1;
      return {
        prompt: `Tính tích phân I = ∫ từ ${a} đến ${b} của (${coefTerm(p, 'x²', true)}${coefTerm(q, 'x')}${s === 0 ? '' : term(s)}) dx.`,
        correct: frac(num, 6),
        wrongs: [frac(num + 6, 6), frac(-num, 6), `${Math.round(num / 6)}`],
        steps: [
          `Nguyên hàm: F(x) = ${frac(p, 3)}x³ + ${frac(q, 2)}x² ${s >= 0 ? '+' : '−'} ${Math.abs(s)}x.`,
          `I = F(${b}) − F(${a}).`,
          `Quy đồng theo mẫu 6: I = [2·${p}·(${b}³ − ${a}³) + 3·(${neg(q)})·(${b}² − ${a}²) + 6·(${neg(s)})·(${b} − ${a})] / 6.`,
          `I = ${num}/6 = ${frac(num, 6)}${g === 6 ? '' : ' (đã rút gọn)'}.`,
        ],
      };
    },
  },
  {
    id: 'gq-oxyz-khoang-cach',
    name: 'Khoảng cách từ điểm đến mặt phẳng',
    topicId: 'q12-oxyz',
    strand: 'toa-do',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 3,
    skill: 'Công thức khoảng cách trong Oxyz',
    build: (r) => {
      const [a, b, c, n] = r.pick(NORM3);
      const x0 = r.int(-4, 4);
      const y0 = r.int(-4, 4);
      const z0 = r.int(-4, 4);
      const d = r.int(-8, 8);
      const num = Math.abs(a * x0 + b * y0 + c * z0 + d);
      return {
        prompt: `Tính khoảng cách từ điểm M(${neg(x0)}; ${neg(y0)}; ${neg(z0)}) đến mặt phẳng (P): ${coefTerm(a, 'x', true)}${coefTerm(b, 'y')}${coefTerm(c, 'z')}${term(d)} = 0.`,
        correct: frac(num, n),
        wrongs: [frac(num, n * n), `${num}`, frac(num, n + 1)],
        steps: [
          `d(M, (P)) = |ax₀ + by₀ + cz₀ + d| / √(a² + b² + c²).`,
          `Tử số = |${a}·(${neg(x0)}) ${b >= 0 ? '+' : '−'} ${Math.abs(b)}·(${neg(y0)}) ${c >= 0 ? '+' : '−'} ${Math.abs(c)}·(${neg(z0)})${term(d)}| = ${num}.`,
          `Mẫu số = √(${a * a} + ${b * b} + ${c * c}) = √${a * a + b * b + c * c} = ${n}.`,
          `Vậy d = ${frac(num, n)}.`,
        ],
      };
    },
  },
  {
    id: 'gq-oxyz-mat-cau',
    name: 'Tâm và bán kính mặt cầu',
    topicId: 'q12-oxyz',
    strand: 'toa-do',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 2,
    skill: 'Chuẩn hoá phương trình mặt cầu',
    build: (r) => {
      const a = r.int(-4, 4);
      const b = r.int(-4, 4);
      const c = r.int(-4, 4);
      const R = r.int(1, 6);
      const d = a * a + b * b + c * c - R * R;
      return {
        prompt: `Cho mặt cầu (S): x² + y² + z²${coefTerm(-2 * a, 'x')}${coefTerm(-2 * b, 'y')}${coefTerm(-2 * c, 'z')}${d === 0 ? '' : term(d)} = 0. Xác định tâm I và bán kính R.`,
        correct: `I(${neg(a)}; ${neg(b)}; ${neg(c)}), R = ${R}`,
        wrongs: [
          `I(${neg(-a)}; ${neg(-b)}; ${neg(-c)}), R = ${R}`,
          `I(${neg(a)}; ${neg(b)}; ${neg(c)}), R = ${R * R}`,
          `I(${neg(2 * a)}; ${neg(2 * b)}; ${neg(2 * c)}), R = ${R}`,
        ],
        steps: [
          `Dạng x² + y² + z² − 2ax − 2by − 2cz + d = 0 có tâm I(a; b; c), R = √(a² + b² + c² − d).`,
          `Đọc hệ số: a = ${neg(a)}, b = ${neg(b)}, c = ${neg(c)}, d = ${neg(d)}.`,
          `R = √(${a * a} + ${b * b} + ${c * c} − (${neg(d)})) = √${R * R} = ${R}.`,
        ],
      };
    },
  },
  {
    id: 'gq-phuong-sai',
    name: 'Phương sai & độ lệch chuẩn',
    topicId: 'q12-thong-ke',
    strand: 'xac-suat',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 2,
    skill: 'Tính đặc trưng đo độ phân tán',
    build: (r) => {
      const mean = r.int(5, 9);
      const dev = r.pick([1, 2]);
      const vals = [mean - dev, mean, mean, mean + dev, mean];
      const shuffled = r.shuffle(vals);
      const varNum = 2 * dev * dev;
      return {
        prompt: `Cho mẫu số liệu: ${shuffled.join('; ')}. Tính phương sai của mẫu.`,
        correct: frac(varNum, 5),
        wrongs: [frac(varNum, 4), `${mean}`, frac(varNum * 5, 5)],
        steps: [
          `Số trung bình: x̄ = (${shuffled.join(' + ')}) / 5 = ${mean}.`,
          `Tổng bình phương độ lệch: Σ(xᵢ − x̄)² = ${dev}² + ${dev}² = ${varNum}.`,
          `Phương sai: s² = ${varNum}/5 = ${frac(varNum, 5)}.`,
          `(Độ lệch chuẩn là s = √(s²) — đừng nhầm hai đại lượng này.)`,
        ],
      };
    },
  },
  {
    id: 'gq-xac-suat-dieu-kien',
    name: 'Xác suất toàn phần & xác suất có điều kiện',
    topicId: 'q12-xac-suat-co-dieu-kien',
    strand: 'xac-suat',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 4,
    skill: 'Sơ đồ cây và công thức xác suất toàn phần',
    build: (r) => {
      const a = r.int(2, 6);
      const b = r.int(2, 6);
      const c = r.int(2, 6);
      const d = r.int(2, 6);
      // P(đỏ) = 1/2 · a/(a+b) + 1/2 · c/(c+d)
      const n1 = a + b;
      const n2 = c + d;
      const num = a * n2 + c * n1;
      const den = 2 * n1 * n2;
      return {
        prompt: `Hộp I có ${a} viên bi đỏ và ${b} viên bi xanh. Hộp II có ${c} viên bi đỏ và ${d} viên bi xanh. Chọn ngẫu nhiên một hộp (khả năng như nhau) rồi lấy ngẫu nhiên một viên bi từ hộp đó. Tính xác suất lấy được bi đỏ.`,
        correct: frac(num, den),
        wrongs: [frac(a + c, n1 + n2), frac(a, n1), frac(num, den / 2)],
        steps: [
          `Gọi H₁, H₂ là biến cố chọn hộp I, hộp II: P(H₁) = P(H₂) = 1/2.`,
          `P(đỏ | H₁) = ${frac(a, n1)}; P(đỏ | H₂) = ${frac(c, n2)}.`,
          `Công thức xác suất toàn phần: P(đỏ) = P(H₁)·P(đỏ|H₁) + P(H₂)·P(đỏ|H₂).`,
          `P(đỏ) = ½·${frac(a, n1)} + ½·${frac(c, n2)} = ${frac(num, den)}.`,
        ],
      };
    },
  },
  {
    id: 'gq-diem-phan-ii',
    name: 'Cách tính điểm Phần II đề thi tốt nghiệp',
    topicId: 'q12-ky-nang-de-moi',
    strand: 'giai-tich',
    tracks: ['thpt-qg', 'chinh-khoa'],
    level: 3,
    skill: 'Hiểu cơ chế tính điểm luỹ tiến',
    build: (r) => {
      const k = [r.int(0, 4), r.int(0, 4), r.int(0, 4), r.int(0, 4)];
      const total = k.reduce((s, x) => s + PART2_SCORE[x], 0);
      const fmt = (x: number) => x.toFixed(2).replace('.', ',').replace(/,?0+$/, (m) => (m === ',00' ? '' : m));
      const shown = total.toFixed(2).replace('.', ',');
      return {
        prompt: `Ở Phần II của đề thi tốt nghiệp THPT môn Toán, mỗi câu có 4 ý đúng/sai; trả lời đúng 1 ý được 0,10 điểm, 2 ý được 0,25 điểm, 3 ý được 0,50 điểm và 4 ý được 1,00 điểm. Một thí sinh trả lời đúng lần lượt ${k.join('; ')} ý ở bốn câu. Tổng điểm Phần II của thí sinh đó là bao nhiêu?`,
        correct: `${shown} điểm`,
        wrongs: [
          `${(total + 0.25).toFixed(2).replace('.', ',')} điểm`,
          `${((k.reduce((s, x) => s + x, 0) * 0.25)).toFixed(2).replace('.', ',')} điểm`,
          `${Math.max(0, total - 0.5).toFixed(2).replace('.', ',')} điểm`,
        ],
        steps: [
          `Tra bảng điểm luỹ tiến cho từng câu: ${k.map((x) => `${x} ý → ${fmt(PART2_SCORE[x])} điểm`).join('; ')}.`,
          `Cộng lại: ${k.map((x) => fmt(PART2_SCORE[x])).join(' + ')} = ${shown} điểm.`,
          `Nhận xét chiến thuật: bước từ 3 ý lên 4 ý đáng giá 0,50 điểm — gấp đôi bước từ 2 lên 3. Vì vậy ở câu đã chắc 3 ý, hãy dồn sức xử lý nốt ý thứ tư.`,
        ],
      };
    },
  },
];

/** Trường hợp dự phòng hiếm gặp khi hai số mũ trùng nhau. */
function buildFallbackMu(base: number) {
  return {
    prompt: `Giải phương trình ${base}^{x} = ${base * base * base}.`,
    correct: 'x = 3',
    wrongs: ['x = 2', `x = ${base * base * base}`, 'Vô nghiệm'],
    steps: [
      `Viết vế phải theo cơ số ${base}: ${base * base * base} = ${base}³.`,
      `${base}^{x} = ${base}³ ⇔ x = 3.`,
    ],
  };
}
