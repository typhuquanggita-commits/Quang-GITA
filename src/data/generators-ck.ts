import type { ItemGenerator } from './generators';
import { gcd } from '@/lib/rng';

/**
 * BỘ SINH ĐỀ — LUỒNG CHÍNH KHOÁ LỚP 6, 7, 8
 *
 * Mỗi chuyên đề chính khoá có một bộ sinh đề bám đúng dạng bài hay ra ở bài
 * kiểm tra định kỳ. Ba phương án sai đều là lỗi có thật của học sinh ở đúng
 * khối lớp đó, để phần chữa bài nói được đúng nguyên nhân.
 */

const wrongsOf = (correct: string, cands: string[], fallback: (i: number) => string): string[] => {
  const seen = new Set([correct]);
  const out: string[] = [];
  for (const c of cands) {
    if (out.length === 3) break;
    if (!seen.has(c)) {
      seen.add(c);
      out.push(c);
    }
  }
  for (let i = 0; out.length < 3 && i < 80; i++) {
    const f = fallback(i);
    if (!seen.has(f)) {
      seen.add(f);
      out.push(f);
    }
  }
  return out;
};

const frac = (p: number, q: number): string => {
  const sign = p * q < 0 ? '−' : '';
  const a = Math.abs(p);
  const b = Math.abs(q);
  const g = gcd(a, b) || 1;
  return b / g === 1 ? `${sign}${a / g}` : `${sign}${a / g}/${b / g}`;
};

/** Số nguyên có dấu trừ kiểu Việt Nam. */
const iv = (n: number) => (n < 0 ? `−${Math.abs(n)}` : String(n));

const COPRIME: [number, number][] = [
  [3, 4],
  [4, 5],
  [5, 6],
  [3, 5],
  [5, 7],
  [7, 8],
];

export const GENERATORS_CK: ItemGenerator[] = [
  /* ==================== LỚP 6 ==================== */
  {
    id: 'g-ck6-uoc-boi',
    name: 'Bài toán thực tế với ƯCLN và BCNN',
    topicId: 'ck6-so-tu-nhien',
    strand: 'so-hoc',
    tracks: ['chinh-khoa'],
    level: 2,
    skill: 'Phân biệt bài ƯCLN với bài BCNN',
    build: (r) => {
      const g = r.pick([6, 8, 12, 15, 18]);
      const [m, n] = r.pick(COPRIME);
      const a = g * m;
      const b = g * n;
      const correct = `${g} phần`;
      return {
        prompt: `Cô giáo có ${a} chiếc bút và ${b} quyển vở, muốn chia đều cả bút và vở vào các phần quà sao cho mỗi phần có số bút bằng nhau và số vở bằng nhau. Hỏi chia được nhiều nhất bao nhiêu phần quà?`,
        correct,
        wrongs: wrongsOf(
          correct,
          [`${g * m * n} phần`, `${a + b} phần`, `${b - a > 0 ? b - a : a - b} phần`],
          (i) => `${g + i + 1} phần`,
        ),
        steps: [
          'Chia đều cả hai loại vào các phần bằng nhau, hỏi NHIỀU NHẤT bao nhiêu phần — đây là bài tìm ước chung lớn nhất.',
          `Phân tích: ${a} = ${g} × ${m} và ${b} = ${g} × ${n}, trong đó ${m} và ${n} không có ước chung nào lớn hơn 1.`,
          `Do đó ƯCLN(${a}; ${b}) = ${g}.`,
          `Vậy chia được nhiều nhất ${g} phần quà, mỗi phần có ${m} chiếc bút và ${n} quyển vở.`,
          `Lưu ý phân biệt: nếu đề hỏi "cùng lặp lại sau bao lâu" hay "xếp hàng vừa đủ" thì đó mới là bài BCNN, ở đây bằng ${g * m * n}.`,
        ],
      };
    },
  },
  {
    id: 'g-ck6-so-nguyen',
    name: 'Bỏ ngoặc có dấu trừ đằng trước',
    topicId: 'ck6-so-nguyen',
    strand: 'so-hoc',
    tracks: ['chinh-khoa'],
    level: 1,
    skill: 'Đổi dấu mọi số hạng khi bỏ ngoặc sau dấu trừ',
    build: (r) => {
      const a = r.int(-20, 20);
      const b = r.int(-15, 15);
      const c = r.int(-15, 15);
      const val = a - (b - c);
      const correct = iv(val);
      return {
        prompt: `Tính giá trị của biểu thức ${iv(a)} − (${iv(b)} − ${iv(c)}).`,
        correct,
        wrongs: wrongsOf(
          correct,
          [iv(a - b - c), iv(a + b - c), iv(a + b + c)],
          (i) => iv(val + i + 1),
        ),
        steps: [
          'Bỏ ngoặc sau dấu trừ thì đổi dấu MỌI số hạng bên trong ngoặc.',
          `${iv(a)} − (${iv(b)} − ${iv(c)}) = ${iv(a)} − ${iv(b)} + ${iv(c)}.`,
          `Tính từ trái sang phải: ${iv(a)} − ${iv(b)} = ${iv(a - b)}.`,
          `Rồi ${iv(a - b)} + ${iv(c)} = ${correct}.`,
          'Lỗi hay gặp nhất là chỉ đổi dấu số hạng đầu mà giữ nguyên dấu số hạng sau.',
        ],
      };
    },
  },
  {
    id: 'g-ck6-phan-so',
    name: 'Tìm một số biết giá trị phân số của nó',
    topicId: 'ck6-phan-so',
    strand: 'so-hoc',
    tracks: ['chinh-khoa'],
    level: 2,
    skill: 'Phân biệt tìm phân số của một số với tìm số biết phân số',
    build: (r) => {
      const den = r.pick([4, 5, 6, 8]);
      const num = r.int(2, den - 1);
      const k = r.int(6, 20);
      const x = den * k;
      const val = num * k;
      const correct = String(x);
      return {
        prompt: `Biết ${num}/${den} của một số bằng ${val}. Tìm số đó.`,
        correct,
        wrongs: wrongsOf(
          correct,
          [String((val * num) / den === Math.round((val * num) / den) ? (val * num) / den : val + num), String(val), String(val + den)],
          (i) => String(x + (i + 1) * den),
        ),
        steps: [
          `Đề cho biết ${num} phần trong tổng ${den} phần bằng ${val}.`,
          `Giá trị một phần là: ${val} : ${num} = ${k}.`,
          `Cả số gồm ${den} phần nên bằng: ${k} × ${den} = ${x}.`,
          `Thử lại: ${num}/${den} của ${x} là ${x} × ${num} : ${den} = ${val} ✓.`,
          'Phân biệt: "tìm m/n của A" thì NHÂN; "tìm A biết m/n của A" thì CHIA rồi nhân.',
        ],
      };
    },
  },
  {
    id: 'g-ck6-hinh-thoi',
    name: 'Diện tích hình thoi và hình bình hành',
    topicId: 'ck6-hinh-truc-quan',
    strand: 'hinh-hoc',
    tracks: ['chinh-khoa'],
    level: 1,
    skill: 'Nhớ chia đôi ở công thức hình thoi',
    build: (r) => {
      const d1 = r.pick([8, 10, 12, 14, 16]);
      const d2 = r.pick([6, 9, 15, 18, 20]);
      const s = (d1 * d2) / 2;
      const correct = `${s} cm²`;
      return {
        prompt: `Một hình thoi có độ dài hai đường chéo lần lượt là ${d1} cm và ${d2} cm. Tính diện tích hình thoi đó.`,
        correct,
        wrongs: wrongsOf(
          correct,
          [`${d1 * d2} cm²`, `${(d1 + d2) / 2} cm²`, `${(d1 + d2) * 2} cm²`],
          (i) => `${s + (i + 1) * 3} cm²`,
        ),
        steps: [
          'Diện tích hình thoi bằng tích hai đường chéo chia cho 2.',
          `S = (${d1} × ${d2}) : 2.`,
          `${d1} × ${d2} = ${d1 * d2}, chia 2 được ${s}.`,
          `Vậy diện tích hình thoi là ${s} cm².`,
          `Nếu quên chia 2 sẽ ra ${d1 * d2} cm² — đây là lỗi phổ biến nhất của công thức này.`,
        ],
      };
    },
  },
  {
    id: 'g-ck6-xac-suat-tn',
    name: 'Xác suất thực nghiệm',
    topicId: 'ck6-du-lieu-xac-suat',
    strand: 'xac-suat',
    tracks: ['chinh-khoa'],
    level: 2,
    skill: 'Lấy số lần xảy ra chia tổng số lần thực hiện',
    build: (r) => {
      const n = r.pick([20, 25, 40, 50, 60]);
      const k = r.int(Math.round(n * 0.2), Math.round(n * 0.7));
      const correct = frac(k, n);
      return {
        prompt: `Bạn An tung một đồng xu ${n} lần và có ${k} lần xuất hiện mặt ngửa. Tính xác suất thực nghiệm của sự kiện "xuất hiện mặt ngửa".`,
        correct,
        wrongs: wrongsOf(
          correct,
          [frac(n - k, n), frac(n, k), frac(k, n - k)],
          (i) => frac(k + i + 1, n),
        ),
        steps: [
          'Xác suất thực nghiệm bằng số lần sự kiện xảy ra chia cho tổng số lần thực hiện.',
          `Số lần xuất hiện mặt ngửa là ${k}, tổng số lần tung là ${n}.`,
          `Xác suất thực nghiệm = ${k} : ${n} = ${correct}.`,
          `Kiểm tra hợp lý: kết quả phải nằm giữa 0 và 1 ✓.`,
          `Xác suất của sự kiện đối là ${frac(n - k, n)}, và hai xác suất này cộng lại bằng 1.`,
        ],
      };
    },
  },

  /* ==================== LỚP 7 ==================== */
  {
    id: 'g-ck7-gia-tri-tuyet-doi',
    name: 'Phương trình chứa giá trị tuyệt đối',
    topicId: 'ck7-so-huu-ti-so-thuc',
    strand: 'so-hoc',
    tracks: ['chinh-khoa'],
    level: 2,
    skill: 'Nhớ lấy cả hai nghiệm',
    build: (r) => {
      const a = r.int(-8, 8);
      const b = r.int(2, 12);
      const x1 = a + b;
      const x2 = a - b;
      const sum = x1 + x2;
      const correct = iv(sum);
      return {
        prompt: `Cho |x − ${iv(a)}| = ${b}. Tính tổng tất cả các giá trị của x thoả mãn.`,
        correct,
        wrongs: wrongsOf(
          correct,
          [iv(x1), iv(x2), iv(2 * b)],
          (i) => iv(sum + i + 1),
        ),
        steps: [
          `Vì ${b} > 0 nên |x − ${iv(a)}| = ${b} cho hai trường hợp.`,
          `Trường hợp 1: x − ${iv(a)} = ${b}, suy ra x = ${iv(x1)}.`,
          `Trường hợp 2: x − ${iv(a)} = −${b}, suy ra x = ${iv(x2)}.`,
          `Tổng hai giá trị: ${iv(x1)} + ${iv(x2)} = ${correct}.`,
          'Lỗi hay gặp: chỉ lấy một trường hợp. Phương trình chứa giá trị tuyệt đối luôn phải xét đủ hai.',
        ],
      };
    },
  },
  {
    id: 'g-ck7-ti-le-thuc',
    name: 'Chia một số thành các phần tỉ lệ',
    topicId: 'ck7-ti-le-thuc',
    strand: 'so-hoc',
    tracks: ['chinh-khoa'],
    level: 2,
    skill: 'Dùng dãy tỉ số bằng nhau',
    build: (r) => {
      const [p, q, s] = r.pick([
        [2, 3, 5],
        [1, 3, 4],
        [2, 5, 3],
        [3, 4, 5],
        [1, 2, 6],
      ] as [number, number, number][]);
      const unit = r.pick([6, 8, 12, 15, 20]);
      const total = (p + q + s) * unit;
      const big = Math.max(p, q, s) * unit;
      const correct = `${big} quyển`;
      return {
        prompt: `Chia ${total} quyển sách cho ba lớp tỉ lệ với ${p}; ${q}; ${s}. Hỏi lớp được nhiều sách nhất nhận bao nhiêu quyển?`,
        correct,
        wrongs: wrongsOf(
          correct,
          [`${unit} quyển`, `${Math.min(p, q, s) * unit} quyển`, `${total} quyển`],
          (i) => `${big + (i + 1) * unit} quyển`,
        ),
        steps: [
          `Gọi số sách ba lớp lần lượt tỉ lệ với ${p}; ${q}; ${s}, tức là ${p} phần, ${q} phần và ${s} phần bằng nhau.`,
          `Tổng số phần: ${p} + ${q} + ${s} = ${p + q + s} (phần).`,
          `Giá trị một phần: ${total} : ${p + q + s} = ${unit} (quyển).`,
          `Lớp nhận nhiều nhất ứng với ${Math.max(p, q, s)} phần, tức ${unit} × ${Math.max(p, q, s)} = ${big} quyển.`,
          `Thử lại: ${p * unit} + ${q * unit} + ${s * unit} = ${total} ✓.`,
        ],
      };
    },
  },
  {
    id: 'g-ck7-nghiem-da-thuc',
    name: 'Tìm nghiệm của đa thức một biến',
    topicId: 'ck7-bieu-thuc-da-thuc',
    strand: 'dai-so',
    tracks: ['chinh-khoa'],
    level: 2,
    skill: 'Cho đa thức bằng 0 rồi giải',
    build: (r) => {
      const a = r.pick([2, 3, 4, 5, -2, -3]);
      const x = r.int(-6, 6);
      const b = -a * x;
      const correct = iv(x);
      return {
        prompt: `Tìm nghiệm của đa thức P(x) = ${iv(a)}x + ${iv(b)}.`,
        correct,
        wrongs: wrongsOf(
          correct,
          [iv(-x), iv(b), iv(a + b)],
          (i) => iv(x + i + 1),
        ),
        steps: [
          'Nghiệm của đa thức là giá trị của biến làm cho đa thức bằng 0.',
          `Cho P(x) = 0: ${iv(a)}x + ${iv(b)} = 0.`,
          `Chuyển vế: ${iv(a)}x = ${iv(-b)}.`,
          `Chia hai vế cho ${iv(a)}: x = ${iv(-b)} : ${iv(a)} = ${correct}.`,
          `Thử lại: P(${correct}) = ${iv(a)} × ${correct} + ${iv(b)} = 0 ✓.`,
        ],
      };
    },
  },
  {
    id: 'g-ck7-truong-hop-bang-nhau',
    name: 'Chọn đúng trường hợp bằng nhau của hai tam giác',
    topicId: 'ck7-tam-giac-bang-nhau',
    strand: 'hinh-hoc',
    tracks: ['chinh-khoa'],
    level: 3,
    skill: 'Đọc giả thiết để chọn trường hợp',
    build: (r) => {
      const cases: { gt: string; correct: string; wrongs: string[] }[] = [
        {
          gt: 'AB = DE, AC = DF và BC = EF',
          correct: 'Cạnh – cạnh – cạnh (c–c–c)',
          wrongs: ['Cạnh – góc – cạnh (c–g–c)', 'Góc – cạnh – góc (g–c–g)', 'Không đủ dữ kiện để kết luận'],
        },
        {
          gt: 'AB = DE, góc A = góc D và AC = DF',
          correct: 'Cạnh – góc – cạnh (c–g–c)',
          wrongs: ['Cạnh – cạnh – cạnh (c–c–c)', 'Góc – cạnh – góc (g–c–g)', 'Cạnh – cạnh – góc (c–c–g)'],
        },
        {
          gt: 'góc B = góc E, BC = EF và góc C = góc F',
          correct: 'Góc – cạnh – góc (g–c–g)',
          wrongs: ['Cạnh – góc – cạnh (c–g–c)', 'Cạnh – cạnh – cạnh (c–c–c)', 'Góc – góc – góc (g–g–g)'],
        },
        {
          gt: 'AB = DE, góc A = góc D và góc C = góc F',
          correct: 'Góc – cạnh – góc (g–c–g), sau khi suy ra góc B = góc E',
          wrongs: [
            'Cạnh – góc – cạnh (c–g–c)',
            'Cạnh – cạnh – cạnh (c–c–c)',
            'Không đủ dữ kiện để kết luận',
          ],
        },
        {
          gt: 'AB = DE, BC = EF và góc C = góc F (góc không xen giữa hai cạnh)',
          correct: 'Không đủ dữ kiện để kết luận',
          wrongs: [
            'Cạnh – góc – cạnh (c–g–c)',
            'Cạnh – cạnh – góc (c–c–g)',
            'Góc – cạnh – góc (g–c–g)',
          ],
        },
      ];
      const c = r.pick(cases);
      return {
        prompt: `Cho tam giác ABC và tam giác DEF có ${c.gt}. Hai tam giác này bằng nhau theo trường hợp nào?`,
        correct: c.correct,
        wrongs: c.wrongs,
        steps: [
          'Đọc kỹ giả thiết và đánh dấu các yếu tố bằng nhau lên hình.',
          'Xác định thứ tự các yếu tố: cạnh và góc có xen kẽ nhau không, góc có nằm giữa hai cạnh không.',
          `Với giả thiết ${c.gt}, kết luận là: ${c.correct}.`,
          'Ghi nhớ: chỉ có ba trường hợp c–c–c, c–g–c, g–c–g. Không tồn tại trường hợp cạnh – cạnh – góc.',
          'Khi viết kết luận, phải ghi tên hai tam giác đúng thứ tự đỉnh tương ứng.',
        ],
      };
    },
  },
  {
    id: 'g-ck7-xac-suat-bien-co',
    name: 'Xác suất của biến cố đồng khả năng',
    topicId: 'ck7-thong-ke-xac-suat',
    strand: 'xac-suat',
    tracks: ['chinh-khoa'],
    level: 2,
    skill: 'Đếm kết quả thuận lợi và tổng số kết quả',
    build: (r) => {
      const red = r.int(3, 12);
      const blue = r.int(3, 12);
      const total = red + blue;
      const correct = frac(red, total);
      return {
        prompt: `Một hộp có ${red} viên bi đỏ và ${blue} viên bi xanh, các viên bi có kích thước như nhau. Lấy ngẫu nhiên một viên bi. Tính xác suất lấy được viên bi đỏ.`,
        correct,
        wrongs: wrongsOf(
          correct,
          [frac(blue, total), frac(red, blue), frac(total, red)],
          (i) => frac(red, total + i + 1),
        ),
        steps: [
          `Tổng số viên bi trong hộp là ${red} + ${blue} = ${total} viên, và các viên bi có khả năng được lấy như nhau.`,
          `Số kết quả thuận lợi cho biến cố "lấy được bi đỏ" là ${red}.`,
          `Xác suất cần tìm: ${red} : ${total} = ${correct}.`,
          `Kiểm tra hợp lý: xác suất nằm giữa 0 và 1 ✓.`,
          `Xác suất lấy được bi xanh là ${frac(blue, total)}, và hai xác suất cộng lại bằng 1.`,
        ],
      };
    },
  },

  /* ==================== LỚP 8 ==================== */
  {
    id: 'g-ck8-hang-dang-thuc',
    name: 'Tính nhanh bằng hiệu hai bình phương',
    topicId: 'ck8-hang-dang-thuc',
    strand: 'dai-so',
    tracks: ['chinh-khoa'],
    level: 2,
    skill: 'Nhận ra dạng a² − b² trong biểu thức số',
    build: (r) => {
      const base = r.pick([50, 60, 70, 100, 200]);
      const d = r.pick([1, 2, 3, 4, 5]);
      const a = base + d;
      const b = base - d;
      const val = (a - b) * (a + b);
      const correct = String(val);
      return {
        prompt: `Tính nhanh: ${a}² − ${b}².`,
        correct,
        wrongs: wrongsOf(
          correct,
          [String((a - b) * (a - b)), String(a * a - b), String((a + b) * (a + b))],
          (i) => String(val + (i + 1) * 10),
        ),
        steps: [
          'Nhận dạng: biểu thức có dạng a² − b², dùng hằng đẳng thức hiệu hai bình phương.',
          'a² − b² = (a − b)(a + b).',
          `Ở đây a = ${a}, b = ${b} nên a − b = ${a - b} và a + b = ${a + b}.`,
          `Do đó ${a}² − ${b}² = ${a - b} × ${a + b} = ${val}.`,
          `Tính trực tiếp hai bình phương cũng ra kết quả này nhưng mất nhiều thời gian hơn và dễ sai hơn.`,
        ],
      };
    },
  },
  {
    id: 'g-ck8-dkxd-phan-thuc',
    name: 'Điều kiện xác định của phân thức',
    topicId: 'ck8-phan-thuc',
    strand: 'dai-so',
    tracks: ['chinh-khoa'],
    level: 2,
    skill: 'Phân tích mẫu thành nhân tử rồi cho khác 0',
    build: (r) => {
      const a = r.int(1, 9);
      const correct = `x ≠ ${a} và x ≠ ${iv(-a)}`;
      return {
        prompt: `Tìm điều kiện xác định của phân thức (x + ${a + 1}) / (x² − ${a * a}).`,
        correct,
        wrongs: wrongsOf(
          correct,
          [`x ≠ ${a}`, `x ≠ ${a * a}`, `x ≠ ${iv(-(a + 1))}`],
          (i) => `x ≠ ${a + i + 1}`,
        ),
        steps: [
          'Phân thức xác định khi và chỉ khi mẫu thức khác 0.',
          `Phân tích mẫu: x² − ${a * a} = (x − ${a})(x + ${a}).`,
          `Cho mẫu khác 0: (x − ${a})(x + ${a}) ≠ 0, tức x ≠ ${a} và x ≠ ${iv(-a)}.`,
          `Vậy điều kiện xác định là ${correct}.`,
          'Lưu ý: điều kiện lấy từ mẫu BAN ĐẦU, không lấy từ mẫu sau khi đã rút gọn.',
        ],
      };
    },
  },
  {
    id: 'g-ck8-duong-thang-song-song',
    name: 'Hai đường thẳng song song trong mặt phẳng toạ độ',
    topicId: 'ck8-pt-ham-so',
    strand: 'dai-so',
    tracks: ['chinh-khoa'],
    level: 2,
    skill: 'So sánh hệ số góc và tung độ gốc',
    build: (r) => {
      const a = r.pick([2, 3, 4, 5, -2, -3]);
      const shift = r.int(1, 6);
      const m = a + shift;
      const b1 = r.int(1, 6);
      const b2 = r.int(1, 6) + b1;
      const correct = `m = ${iv(m)}`;
      return {
        prompt: `Tìm m để đường thẳng y = (m − ${shift})x + ${b1} song song với đường thẳng y = ${iv(a)}x + ${b2}.`,
        correct,
        wrongs: wrongsOf(
          correct,
          [`m = ${iv(a)}`, `m = ${iv(a - shift)}`, `m = ${iv(b2)}`],
          (i) => `m = ${iv(m + i + 1)}`,
        ),
        steps: [
          'Hai đường thẳng song song khi hệ số góc bằng nhau và tung độ gốc khác nhau.',
          `Hệ số góc bằng nhau: m − ${shift} = ${iv(a)}.`,
          `Suy ra m = ${iv(a)} + ${shift} = ${iv(m)}.`,
          `Kiểm tra tung độ gốc: ${b1} ≠ ${b2} ✓, nên hai đường thẳng song song chứ không trùng nhau.`,
          `Vậy ${correct}.`,
        ],
      };
    },
  },
  {
    id: 'g-ck8-thales',
    name: 'Định lí Thalès trong tam giác',
    topicId: 'ck8-thales-dong-dang',
    strand: 'hinh-hoc',
    tracks: ['chinh-khoa'],
    level: 3,
    skill: 'Lập đúng tỉ lệ thức từ hai đường song song',
    build: (r) => {
      const k = r.pick([2, 3, 4]);
      const am = r.pick([3, 4, 5, 6]);
      const mb = am * k;
      const an = r.pick([4, 6, 8, 9]);
      const nc = an * k;
      const correct = `${nc} cm`;
      return {
        prompt: `Cho tam giác ABC có MN song song với BC (M thuộc AB, N thuộc AC). Biết AM = ${am} cm, MB = ${mb} cm và AN = ${an} cm. Tính độ dài NC.`,
        correct,
        wrongs: wrongsOf(
          correct,
          [`${am + mb - an > 0 ? am + mb - an : an} cm`, `${an * am} cm`, `${Math.round((an * am) / mb) || 1} cm`],
          (i) => `${nc + (i + 1) * 2} cm`,
        ),
        steps: [
          'MN song song với BC nên theo định lí Thalès, đường thẳng MN chắn trên hai cạnh AB và AC những đoạn thẳng tương ứng tỉ lệ.',
          'Ta có AM/MB = AN/NC.',
          `Thay số: ${am}/${mb} = ${an}/NC.`,
          `Suy ra NC = ${an} × ${mb} : ${am} = ${an * mb} : ${am} = ${nc} cm.`,
          `Kiểm tra: AM/MB = ${am}/${mb} = 1/${k} và AN/NC = ${an}/${nc} = 1/${k} ✓.`,
        ],
      };
    },
  },
  {
    id: 'g-ck8-hinh-chop',
    name: 'Thể tích và diện tích xung quanh hình chóp tứ giác đều',
    topicId: 'ck8-hinh-chop-xac-suat',
    strand: 'hinh-hoc',
    tracks: ['chinh-khoa'],
    level: 2,
    skill: 'Phân biệt trung đoạn với chiều cao hình chóp',
    build: (r) => {
      const a = r.pick([6, 8, 9, 10, 12]);
      const h = r.pick([6, 9, 12, 15]);
      const v = (a * a * h) / 3;
      const correct = `${v} cm³`;
      return {
        prompt: `Một hình chóp tứ giác đều có cạnh đáy ${a} cm và chiều cao ${h} cm. Tính thể tích của hình chóp đó.`,
        correct,
        wrongs: wrongsOf(
          correct,
          [`${a * a * h} cm³`, `${(a * a * h) / 2} cm³`, `${a * h} cm³`],
          (i) => `${v + (i + 1) * 6} cm³`,
        ),
        steps: [
          'Đáy của hình chóp tứ giác đều là hình vuông.',
          `Diện tích đáy: ${a} × ${a} = ${a * a} cm².`,
          'Thể tích hình chóp bằng một phần ba diện tích đáy nhân chiều cao.',
          `V = (1/3) × ${a * a} × ${h} = ${v} cm³.`,
          `Nếu quên hệ số 1/3 sẽ ra ${a * a * h} cm³ — đó là thể tích của hình hộp, không phải hình chóp.`,
        ],
      };
    },
  },
];
