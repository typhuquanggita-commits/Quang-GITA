import type { Template } from '@/types';
import { distractInt, factorize, frac, gcd, lcm, mcOptions } from '@/lib/rng';

/* MATHGITA — NGÂN HÀNG KHỐI 6 (bổ sung): phủ kín ma trận đề ở mọi mức độ */

export const BANK_G6_PLUS: Template[] = [
  /* ============================ NHẬN BIẾT ============================ */
  {
    id: 'g6.nb-thu-tu', topicId: 'g6-t1', grade: 6, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Thứ tự thực hiện phép tính',
    build: (r) => {
      const a = r.int(20, 90), b = r.pick([2, 4, 5, 10]), c = b * r.int(3, 12);
      const val = a - c / b;
      const [options, answer] = mcOptions(r, String(val), [String((a - c) / b), String(a + c / b), String(a * b - c)]);
      return {
        stem: `Giá trị của biểu thức $${a}-${c}:${b}$ bằng:`,
        options, answer,
        thinking: ['Không có ngoặc: nhân chia làm trước, cộng trừ làm sau.'],
        solution: [`$${c}:${b}=${c / b}$.`, `$${a}-${c / b}=${val}$.`],
        pitfall: `Nếu trừ trước rồi mới chia sẽ ra $${(a - c) / b}$ — đây là phương án nhiễu.`,
      };
    },
  },
  {
    id: 'g6.nb-luy-thua-gt', topicId: 'g6-t1', grade: 6, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Giá trị của lũy thừa',
    build: (r) => {
      const a = r.int(2, 6), n = r.int(2, 4);
      const v = a ** n;
      const [options, answer] = mcOptions(r, String(v), [String(a * n), String(a ** (n - 1)), String(a * a * n)]);
      return {
        stem: `Giá trị của $${a}^{${n}}$ bằng:`,
        options, answer,
        thinking: [`$a^{n}$ nghĩa là nhân $n$ thừa số $a$ với nhau, không phải $a$ nhân $n$.`],
        solution: [`$${a}^{${n}}=${Array(n).fill(a).join('\\cdot')}=${v}$.`],
        pitfall: `Nhầm $${a}^{${n}}$ thành $${a}\\cdot${n}=${a * n}$.`,
      };
    },
  },
  {
    id: 'g6.nb-dau-hieu-2-5', topicId: 'g6-t2', grade: 6, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Dấu hiệu chia hết cho 2, 3, 5, 9',
    build: (r) => {
      const d = r.pick([2, 3, 5, 9]);
      const ok = d * r.int(20, 110);
      const bad = [ok + 1, ok + 2, ok + d - 1].filter((x) => x % d !== 0).slice(0, 3);
      while (bad.length < 3) bad.push(ok + bad.length + 3);
      const [options, answer] = mcOptions(r, String(ok), bad.map(String));
      return {
        stem: `Trong các số sau, số nào chia hết cho $${d}$?`,
        options, answer,
        thinking: d === 2 || d === 5
          ? [`Chia hết cho ${d} thì xét **chữ số tận cùng**.`]
          : [`Chia hết cho ${d} thì xét **tổng các chữ số**.`],
        solution: [
          `$${ok}=${d}\\cdot${ok / d}$ nên $${ok}\;\\vdots\;${d}$.`,
          d === 3 || d === 9
            ? `Kiểm tra nhanh: tổng các chữ số của $${ok}$ là $${String(ok).split('').reduce((s, c) => s + Number(c), 0)}$, chia hết cho $${d}$.`
            : `Chữ số tận cùng của $${ok}$ là $${String(ok).slice(-1)}$.`,
        ],
      };
    },
  },
  {
    id: 'g6.nb-nguyen-to', topicId: 'g6-t2', grade: 6, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Nhận biết số nguyên tố — hợp số',
    build: (r) => {
      const primes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
      const comps = [15, 21, 25, 27, 33, 35, 39, 49, 51, 55, 57];
      const p = r.pick(primes);
      const [options, answer] = mcOptions(r, String(p), r.shuffle(comps).slice(0, 3).map(String));
      return {
        stem: 'Trong các số sau, số nào là **số nguyên tố**?',
        options, answer,
        thinking: ['Số nguyên tố là số tự nhiên lớn hơn 1, chỉ có đúng hai ước là 1 và chính nó.'],
        solution: [
          `$${p}$ chỉ chia hết cho $1$ và $${p}$ nên là số nguyên tố.`,
          'Các số còn lại đều có thêm ước khác nên là hợp số.',
        ],
        pitfall: 'Số 1 không phải số nguyên tố, cũng không phải hợp số.',
      };
    },
  },
  {
    id: 'g6.nb-so-doi', topicId: 'g6-t3', grade: 6, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Số đối và giá trị tuyệt đối',
    build: (r) => {
      const a = r.int(-30, 30) || -7;
      const ask = r.pick(['doi', 'abs'] as const);
      const v = ask === 'doi' ? -a : Math.abs(a);
      const [options, answer] = mcOptions(r, String(v), distractInt(r, v, 3).map(String));
      return {
        stem: ask === 'doi' ? `Số đối của $${a}$ là:` : `Giá trị tuyệt đối $\\abs{${a}}$ bằng:`,
        options, answer,
        thinking: ask === 'doi'
          ? ['Số đối của $a$ là $-a$: đổi dấu, giữ nguyên độ lớn.']
          : ['Giá trị tuyệt đối là khoảng cách tới điểm 0, luôn không âm.'],
        solution: ask === 'doi'
          ? [`Số đối của $${a}$ là $${-a}$ vì $${a}+(${-a})=0$.`]
          : [`$\\abs{${a}}=${Math.abs(a)}$.`],
      };
    },
  },
  {
    id: 'g6.nb-phan-so-bang', topicId: 'g6-t4', grade: 6, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Phân số bằng nhau',
    build: (r) => {
      const n = r.int(1, 8), d = r.int(n + 1, 12), k = r.int(2, 6);
      const correct = `\\f{${n * k}}{${d * k}}`;
      const [options, answer] = mcOptions(r, correct, [
        `\\f{${n + k}}{${d + k}}`, `\\f{${n * k}}{${d}}`, `\\f{${d * k}}{${n * k}}`,
      ]);
      return {
        stem: `Phân số nào sau đây bằng phân số $\\f{${n}}{${d}}$?`,
        options, answer,
        thinking: ['Nhân cả tử và mẫu với cùng một số khác 0 thì được phân số bằng nó.'],
        solution: [`$\\f{${n}}{${d}}=\\f{${n}\\cdot${k}}{${d}\\cdot${k}}=\\f{${n * k}}{${d * k}}$.`],
        pitfall: 'Cộng cùng một số vào tử và mẫu KHÔNG cho phân số bằng nhau.',
      };
    },
  },
  {
    id: 'g6.nb-hinh-cong-thuc', topicId: 'g6-t6', grade: 6, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Nhận biết công thức chu vi — diện tích',
    build: (r) => {
      const bank = [
        { q: 'Diện tích hình thoi có hai đường chéo $m$ và $n$ được tính bằng công thức nào?', a: '$S=\\f{1}{2}mn$', w: ['$S=mn$', '$S=2mn$', '$S=\\f{m+n}{2}$'] },
        { q: 'Chu vi hình chữ nhật có hai kích thước $a$, $b$ được tính bằng:', a: '$C=2(a+b)$', w: ['$C=a+b$', '$C=ab$', '$C=4(a+b)$'] },
        { q: 'Diện tích hình bình hành có đáy $a$ và chiều cao $h$ là:', a: '$S=a\\cdot h$', w: ['$S=\\f{ah}{2}$', '$S=2ah$', '$S=a+h$'] },
        { q: 'Diện tích hình thang có hai đáy $a$, $b$ và chiều cao $h$ là:', a: '$S=\\f{(a+b)h}{2}$', w: ['$S=(a+b)h$', '$S=\\f{abh}{2}$', '$S=\\f{a+b}{2}+h$'] },
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q, options, answer,
        thinking: ['Đối chiếu với bảng công thức chu vi – diện tích trong Cẩm nang điểm 10.'],
        solution: [`Công thức đúng là ${it.a}.`],
      };
    },
  },
  {
    id: 'g6.nb-trung-diem', topicId: 'g6-t7', grade: 6, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Trung điểm của đoạn thẳng',
    build: (r) => {
      const ab = r.int(3, 20) * 2;
      const [options, answer] = mcOptions(r, String(ab / 2), distractInt(r, ab / 2, 3).map(String));
      return {
        stem: `Cho $M$ là trung điểm của đoạn thẳng $AB$ với $AB=${ab}\\,cm$. Độ dài $MA$ bằng bao nhiêu xăng-ti-mét?`,
        options, answer,
        thinking: ['Trung điểm chia đoạn thẳng thành hai phần bằng nhau, mỗi phần bằng nửa cả đoạn.'],
        solution: [`$MA=MB=\\f{AB}{2}=\\f{${ab}}{2}=${ab / 2}\\ (cm)$.`],
      };
    },
  },

  /* ============================ THÔNG HIỂU ============================ */
  {
    id: 'g6.th-ucln-bcnn', topicId: 'g6-t2', grade: 6, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Tìm ƯCLN và BCNN',
    build: (r) => {
      const a = r.pick([12, 18, 24, 30, 36, 40, 45]);
      const b = r.pick([16, 20, 27, 32, 42, 48, 60]);
      const ask = r.pick(['ucln', 'bcnn'] as const);
      const v = ask === 'ucln' ? gcd(a, b) : lcm(a, b);
      const wrong = ask === 'ucln' ? [lcm(a, b), gcd(a, b) * 2, Math.abs(a - b)] : [gcd(a, b), a * b, lcm(a, b) / 2];
      const [options, answer] = mcOptions(r, String(v), wrong.map(String));
      return {
        stem: `${ask === 'ucln' ? 'ƯCLN' : 'BCNN'}$(${a};${b})$ bằng:`,
        options, answer,
        thinking: [
          'Phân tích cả hai số ra thừa số nguyên tố.',
          ask === 'ucln'
            ? 'ƯCLN: chọn thừa số nguyên tố **chung**, mỗi thừa số lấy số mũ **nhỏ nhất**.'
            : 'BCNN: chọn thừa số nguyên tố **chung và riêng**, mỗi thừa số lấy số mũ **lớn nhất**.',
        ],
        solution: [
          `$${a}=${factorize(a).map(([p, e]) => (e === 1 ? `${p}` : `${p}^{${e}}`)).join('\\cdot')}$`,
          `$${b}=${factorize(b).map(([p, e]) => (e === 1 ? `${p}` : `${p}^{${e}}`)).join('\\cdot')}$`,
          `${ask === 'ucln' ? 'ƯCLN' : 'BCNN'}$(${a};${b})=${v}$.`,
          `Kiểm tra: ƯCLN$\\cdot$BCNN$=${gcd(a, b)}\\cdot${lcm(a, b)}=${a * b}=${a}\\cdot${b}$ ✓`,
        ],
      };
    },
  },
  {
    id: 'g6.th-so-nguyen-mc', topicId: 'g6-t3', grade: 6, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Phép tính với số nguyên',
    build: (r) => {
      const a = r.int(-25, 25) || -8, b = r.int(-25, 25) || 6;
      const op = r.pick(['+', '-', '·'] as const);
      const v = op === '+' ? a + b : op === '-' ? a - b : a * b;
      const [options, answer] = mcOptions(r, String(v), distractInt(r, v, Math.abs(b) || 3).map(String));
      const expr = op === '·' ? `(${a})\\cdot(${b})` : `(${a})${op}(${b})`;
      return {
        stem: `Kết quả của phép tính $${expr}$ là:`,
        options, answer,
        thinking: op === '·'
          ? ['Xác định dấu trước: tích hai số cùng dấu là dương, khác dấu là âm. Sau đó nhân hai giá trị tuyệt đối.']
          : ['Đưa phép trừ về phép cộng với số đối, rồi áp dụng quy tắc cộng hai số nguyên.'],
        solution: op === '·'
          ? [`Dấu của tích: ${(a < 0) === (b < 0) ? 'hai số cùng dấu nên tích dương' : 'hai số khác dấu nên tích âm'}.`,
             `$\\abs{${a}}\\cdot\\abs{${b}}=${Math.abs(a)}\\cdot${Math.abs(b)}=${Math.abs(a * b)}$, vậy kết quả là $${v}$.`]
          : [`$${expr}=${v}$.`],
      };
    },
  },
  {
    id: 'g6.th-hon-so', topicId: 'g6-t4', grade: 6, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Đổi hỗn số ra phân số',
    build: (r) => {
      const w = r.int(1, 6), d = r.int(3, 9), n = r.int(1, d - 1);
      const num = w * d + n;
      const correct = `\\f{${num}}{${d}}`;
      const [options, answer] = mcOptions(r, correct, [`\\f{${w * n}}{${d}}`, `\\f{${w + n}}{${d}}`, `\\f{${num + d}}{${d}}`]);
      return {
        stem: `Viết hỗn số $${w}\\f{${n}}{${d}}$ dưới dạng phân số ta được:`,
        options, answer,
        thinking: ['Phần nguyên nhân mẫu rồi cộng tử, giữ nguyên mẫu.'],
        solution: [`$${w}\\f{${n}}{${d}}=\\f{${w}\\cdot${d}+${n}}{${d}}=\\f{${num}}{${d}}$.`],
      };
    },
  },
  {
    id: 'g6.th-lam-tron', topicId: 'g6-t5', grade: 6, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Làm tròn số thập phân',
    build: (r) => {
      const whole = r.int(3, 99);
      const d1 = r.int(0, 9), d2 = r.int(0, 9);
      const x = whole + d1 / 10 + d2 / 100;
      const rounded = Math.round(x * 10) / 10;
      const [options, answer] = mcOptions(r, String(rounded), [
        String(Math.floor(x * 10) / 10), String(Math.round(x)), String(Math.round(x * 100) / 100),
      ]);
      return {
        stem: `Làm tròn số $${x.toFixed(2).replace('.', '{,}')}$ đến hàng phần mười ta được:`,
        options, answer,
        thinking: ['Làm tròn đến hàng phần mười thì xét chữ số hàng phần trăm: ≥ 5 thì tăng, < 5 thì giữ nguyên.'],
        solution: [
          `Chữ số hàng phần trăm là $${d2}$${d2 >= 5 ? ' ≥ 5 nên tăng chữ số hàng phần mười thêm 1' : ' < 5 nên giữ nguyên chữ số hàng phần mười'}.`,
          `Kết quả: $${String(rounded).replace('.', '{,}')}$.`,
        ],
      };
    },
  },
  {
    id: 'g6.th-tf-chia-het', topicId: 'g6-t2', grade: 6, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — số nguyên tố và chia hết',
    build: (r) => {
      const n = r.pick([2, 3, 5, 7]);
      void n;
      return {
        stem: 'Xét tính đúng – sai của mỗi khẳng định sau:',
        options: [
          'Số 2 là số nguyên tố chẵn duy nhất',
          'Mọi số chia hết cho 9 đều chia hết cho 3',
          'Số 1 là số nguyên tố',
          'Nếu $a\;\\vdots\;m$ và $b\;\\vdots\;m$ thì $(a+b)\;\\vdots\;m$',
        ],
        answer: [true, true, false, true],
        thinking: ['Đối chiếu từng khẳng định với định nghĩa và tính chất đã học.'],
        solution: [
          'a) Đúng: mọi số chẵn lớn hơn 2 đều chia hết cho 2 nên là hợp số.',
          'b) Đúng: nếu tổng các chữ số chia hết cho 9 thì cũng chia hết cho 3 (vì $9\;\\vdots\;3$).',
          'c) Sai: số 1 chỉ có một ước nên không phải số nguyên tố, cũng không phải hợp số.',
          'd) Đúng: đây là tính chất chia hết của một tổng.',
        ],
      };
    },
  },
  {
    id: 'g6.th-tf-phan-so', topicId: 'g6-t4', grade: 6, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — phân số và số thập phân',
    build: (r) => {
      const a = r.int(2, 8), b = a + r.int(1, 6);
      return {
        stem: `Cho hai phân số $\\f{${a}}{${b}}$ và $\\f{${a}}{${b + 2}}$. Xét tính đúng – sai:`,
        options: [
          `$\\f{${a}}{${b}}>\\f{${a}}{${b + 2}}$`,
          `$\\f{${a}}{${b}}<1$`,
          `Hai phân số trên bằng nhau`,
          `$\\f{-${a}}{${b}}$ là số đối của $\\f{${a}}{${b}}$`,
        ],
        answer: [true, true, false, true],
        thinking: ['Hai phân số dương cùng tử: mẫu càng lớn thì phân số càng bé.'],
        solution: [
          `a) Đúng: cùng tử $${a}$, mẫu $${b}<${b + 2}$ nên $\\f{${a}}{${b}}>\\f{${a}}{${b + 2}}$.`,
          `b) Đúng: tử nhỏ hơn mẫu ($${a}<${b}$) nên phân số nhỏ hơn 1.`,
          `c) Sai: khác mẫu nên hai phân số không bằng nhau.`,
          `d) Đúng: hai số đối nhau có tổng bằng 0.`,
        ],
      };
    },
  },

  /* ============================ VẬN DỤNG ============================ */
  {
    id: 'g6.vd-tim-so', topicId: 'g6-t2', grade: 6, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm số tự nhiên thoả điều kiện chia hết',
    build: (r) => {
      const g = r.pick([4, 6, 8, 9, 12]);
      const k = r.int(3, 9);
      const n = g * k;
      const lo = n - g + 1, hi = n + g - 1;
      return {
        stem: `Tìm số tự nhiên $n$ biết $n$ chia hết cho $${g}$ và $${lo}\\le n\\le${hi}$.`,
        answer: String(n),
        thinking: [
          `Liệt kê các bội của $${g}$ rồi đối chiếu với khoảng đề cho.`,
          'Vì khoảng có độ dài nhỏ hơn hai lần số chia nên chỉ có duy nhất một bội nằm trong đó.',
        ],
        solution: [
          `Các bội của $${g}$ gần khoảng đã cho: $${g * (k - 1)}$; $${n}$; $${g * (k + 1)}$.`,
          `Chỉ có $${n}$ thoả mãn $${lo}\\le n\\le${hi}$.`,
          `Vậy $n=${n}$.`,
        ],
      };
    },
  },
  {
    id: 'g6.vd-thuc-te-phan-so', topicId: 'g6-t4', grade: 6, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Bài toán thực tế về phân số',
    build: (r) => {
      const d = r.pick([3, 4, 5, 6, 8]);
      const n = r.int(1, d - 1);
      const total = d * r.int(6, 30);
      const part = (total * n) / d;
      const obj = r.pick([
        { t: 'quyển sách', v: 'đọc' }, { t: 'trang vở', v: 'viết' },
        { t: 'chiếc bánh', v: 'ăn' }, { t: 'mét vải', v: 'dùng' },
      ]);
      return {
        stem: `Một cửa hàng có $${total}$ ${obj.t}. Buổi sáng đã ${obj.v} hết $\\f{${n}}{${d}}$ số đó. Hỏi buổi sáng đã ${obj.v} bao nhiêu ${obj.t}?`,
        answer: String(part),
        thinking: [
          'Đề cho toàn thể (tổng số) và hỏi giá trị của một phân số của nó → bài toán “tìm giá trị phân số của một số” → **nhân**.',
        ],
        solution: [
          `Số ${obj.t} đã ${obj.v}: $${total}\\cdot\\f{${n}}{${d}}=${part}$ (${obj.t}).`,
          `Kiểm tra: phần còn lại là $${total}-${part}=${total - part}$ (${obj.t}), ứng với $${frac(d - n, d)}$ tổng số.`,
        ],
        pitfall: '“Của” thì nhân; “biết … bằng” thì chia. Nhầm chiều là mất trọn điểm.',
      };
    },
  },
  {
    id: 'g6.vd-tim-so-tp', topicId: 'g6-t5', grade: 6, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm một số biết giá trị phần trăm của nó',
    build: (r) => {
      const pct = r.pick([15, 20, 25, 30, 40, 60, 75]);
      const total = r.pick([200, 240, 300, 400, 500, 800]);
      const part = (total * pct) / 100;
      return {
        stem: `Số học sinh giỏi của một khối là $${part}$ em, chiếm $${pct}\\percent$ số học sinh cả khối. Hỏi khối đó có bao nhiêu học sinh?`,
        answer: String(total),
        thinking: [
          'Đề cho **giá trị của một phần trăm** và hỏi **toàn thể** → phép chia.',
        ],
        solution: [
          `Số học sinh cả khối: $${part}:\\f{${pct}}{100}=${part}\\cdot\\f{100}{${pct}}=${total}$ (học sinh).`,
          `Kiểm tra: $${total}\\cdot${pct}\\percent=${part}$ ✓`,
        ],
      };
    },
  },
  {
    id: 'g6.vd-dien-tich-ghep', topicId: 'g6-t6', grade: 6, level: 'VD', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Diện tích hình ghép — chia hình',
    build: (r) => {
      const A = r.int(8, 20), B = r.int(6, 16);
      const a = r.int(2, Math.min(A - 2, 8)), b = r.int(2, Math.min(B - 2, 8));
      const S = A * B - a * b;
      return {
        stem: `Một mảnh đất hình chữ nhật có chiều dài $${A}\\,m$, chiều rộng $${B}\\,m$. Người ta khoét ra một hồ nước hình chữ nhật có kích thước $${a}\\,m\\times${b}\\,m$. Tính diện tích phần đất còn lại (đơn vị: m²).`,
        answer: String(S),
        thinking: [
          'Diện tích có tính cộng — hình phức tạp luôn quy về hình cơ bản.',
          'Ở đây: lấy diện tích hình lớn trừ diện tích phần bị khoét.',
        ],
        solution: [
          `Diện tích mảnh đất: $${A}\\cdot${B}=${A * B}\\ (m^{2})$.`,
          `Diện tích hồ nước: $${a}\\cdot${b}=${a * b}\\ (m^{2})$.`,
          `Diện tích phần còn lại: $${A * B}-${a * b}=${S}\\ (m^{2})$.`,
        ],
      };
    },
  },

  /* ========================== VẬN DỤNG CAO ========================== */
  {
    id: 'g6.vdc-tong-day', topicId: 'g6-t1', grade: 6, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tổng dãy số cách đều',
    build: (r) => {
      const a = r.int(1, 9), d = r.pick([2, 3, 4, 5]);
      const n = r.int(15, 40);
      const last = a + (n - 1) * d;
      const S = ((a + last) * n) / 2;
      return {
        stem: `Tính tổng $S=${a}+${a + d}+${a + 2 * d}+\\dots+${last}$ (dãy số cách đều $${d}$ đơn vị).`,
        answer: String(S),
        thinking: [
          'Dãy số cách đều → dùng công thức: số số hạng, rồi tổng = (đầu + cuối) × số số hạng : 2.',
          'Ý tưởng gốc: ghép cặp đầu – cuối, mỗi cặp có tổng bằng nhau.',
        ],
        solution: [
          `Số số hạng: $(${last}-${a}):${d}+1=${n}$.`,
          `$S=\\f{(${a}+${last})\\cdot${n}}{2}=\\f{${a + last}\\cdot${n}}{2}=${S}$.`,
        ],
      };
    },
  },
  {
    id: 'g6.vdc-uoc-cua-bt', topicId: 'g6-t3', grade: 6, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm x nguyên để biểu thức nguyên',
    build: (r) => {
      const k = r.pick([3, 5, 6, 7, 10, 12]);
      const c = r.int(1, 5);
      const divs: number[] = [];
      for (let i = 1; i <= k; i++) if (k % i === 0) divs.push(i, -i);
      const xs = divs.map((d) => d - c).sort((a, b) => a - b);
      return {
        stem: `Tìm tất cả các số nguyên $x$ để $A=\\f{${k}}{x+${c}}$ nhận giá trị nguyên. (Nhập các giá trị cách nhau bởi dấu phẩy.)`,
        answer: xs.join(','),
        accept: [xs.slice().reverse().join(',')],
        thinking: [
          `$A$ nguyên khi và chỉ khi $x+${c}$ là **ước** của $${k}$.`,
          'Nhớ liệt kê cả ước âm — đây là chỗ mất điểm phổ biến nhất.',
        ],
        solution: [
          `Điều kiện: $x\\ne-${c}$.`,
          `$A\\in\\Z\\Leftrightarrow (x+${c})\\in$ Ư$(${k})=\\{${divs.sort((a, b) => a - b).join(';')}\\}$.`,
          `Suy ra $x\\in\\{${xs.join(';')}\\}$.`,
        ],
      };
    },
  },

  /* ============================= TỰ LUẬN ============================= */
  {
    id: 'g6.tl-thuc-hien', topicId: 'g6-t1', grade: 6, level: 'VD', kind: 'ESSAY',
    strand: 'SO_DAI_SO', tag: 'Tự luận — thực hiện phép tính và tìm x',
    build: (r) => {
      const a = r.int(2, 4), b = r.int(2, 3);
      const c = r.pick([2, 3, 4, 5]), d = c * r.int(3, 9);
      const A = a ** b + d / c;
      const k = r.int(2, 5), m = r.int(3, 12);
      const x = r.int(2, 15);
      const rhs = k * x + m;
      return {
        stem: `a) Thực hiện phép tính: $A=${a}^{${b}}+${d}:${c}$.\n\nb) Tìm số tự nhiên $x$, biết $${k}x+${m}=${rhs}$.\n\nc) Nêu rõ quy tắc về thứ tự thực hiện phép tính đã dùng ở câu a).`,
        answer: '',
        rubric: [
          { criterion: `Tính đúng lũy thừa $${a}^{${b}}=${a ** b}$`, points: 1 },
          { criterion: `Tính đúng phép chia $${d}:${c}=${d / c}$ và kết luận $A=${A}$`, points: 1 },
          { criterion: `Câu b: chuyển vế đúng, tìm được $${k}x=${rhs - m}$`, points: 1 },
          { criterion: `Câu b: kết luận $x=${x}$ và thử lại`, points: 0.5 },
          { criterion: 'Câu c: nêu đúng quy tắc lũy thừa → nhân chia → cộng trừ', points: 0.5 },
        ],
        thinking: ['Câu a kiểm tra thứ tự phép tính; câu b kiểm tra quy tắc tìm thành phần chưa biết.'],
        solution: [
          `a) $${a}^{${b}}=${a ** b}$ ; $${d}:${c}=${d / c}$ ; vậy $A=${a ** b}+${d / c}=${A}$.`,
          `b) $${k}x=${rhs}-${m}=${rhs - m}\\Rightarrow x=${rhs - m}:${k}=${x}$.`,
          `Thử lại: $${k}\\cdot${x}+${m}=${rhs}$ ✓`,
          'c) Trong biểu thức không có ngoặc, ta thực hiện: **lũy thừa → nhân, chia → cộng, trừ**, cùng mức ưu tiên thì làm từ trái sang phải.',
        ],
      };
    },
  },
  {
    id: 'g6.tl-hinh-hoc', topicId: 'g6-t7', grade: 6, level: 'VD', kind: 'ESSAY',
    strand: 'HINH_HOC', tag: 'Tự luận — đoạn thẳng và trung điểm',
    build: (r) => {
      const oa = r.int(2, 6), ob = oa * 2;
      return {
        stem: `Trên tia $Ox$ lấy hai điểm $A$ và $B$ sao cho $OA=${oa}\\,cm$, $OB=${ob}\\,cm$.\n\na) Trong ba điểm $O$, $A$, $B$ điểm nào nằm giữa hai điểm còn lại? Vì sao?\n\nb) Tính độ dài đoạn thẳng $AB$.\n\nc) Chứng tỏ $A$ là trung điểm của đoạn thẳng $OB$.`,
        answer: '',
        rubric: [
          { criterion: 'Vẽ hình đúng, ghi đủ số đo', points: 0.5 },
          { criterion: `Câu a: lập luận $A$, $B$ cùng thuộc tia $Ox$ và $OA<OB$ nên $A$ nằm giữa $O$ và $B$`, points: 1 },
          { criterion: `Câu b: dùng $OA+AB=OB$, tính được $AB=${ob - oa}\\,cm$`, points: 1 },
          { criterion: `Câu c: chỉ ra $OA=AB=${oa}\\,cm$`, points: 1 },
          { criterion: 'Câu c: kết luận đủ hai ý (nằm giữa + cách đều) của định nghĩa trung điểm', points: 0.5 },
        ],
        thinking: [
          'Trên cùng một tia, điểm nào gần gốc hơn thì nằm giữa — đây là căn cứ bắt buộc phải viết ra.',
          'Chứng minh trung điểm luôn phải đủ **hai ý**: nằm giữa và cách đều.',
        ],
        solution: [
          `a) Vì $A$, $B$ cùng thuộc tia $Ox$ và $OA<OB$ ($${oa}<${ob}$) nên điểm $A$ nằm giữa hai điểm $O$ và $B$.`,
          `b) Do $A$ nằm giữa $O$ và $B$ nên $OA+AB=OB$.`,
          `$AB=OB-OA=${ob}-${oa}=${ob - oa}\\ (cm)$.`,
          `c) Ta có $OA=${oa}\\,cm$ và $AB=${ob - oa}\\,cm$ nên $OA=AB$. (1)`,
          `Mặt khác $A$ nằm giữa $O$ và $B$. (2)`,
          `Từ (1) và (2) suy ra $A$ là trung điểm của đoạn thẳng $OB$.`,
        ],
      };
    },
  },
];
