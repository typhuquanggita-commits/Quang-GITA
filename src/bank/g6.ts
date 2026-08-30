import type { Template } from '@/types';
import { distractInt, factorize, frac, gcd, lcm, mcOptions, reduce } from '@/lib/rng';

/* =====================================================================
   MATHGITA — NGÂN HÀNG CÂU HỎI KHỐI 6 (tham số hoá)
   Mỗi khuôn sinh vô hạn biến thể có đáp án và lời giải từng bước.
   ===================================================================== */

export const BANK_G6: Template[] = [
  {
    id: 'g6.tap-hop', topicId: 'g6-t1', grade: 6, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Tập hợp — liệt kê phần tử',
    build: (r) => {
      const a = r.int(3, 12), n = r.int(4, 8), b = a + n;
      const count = n; // a <= x < b  ->  b - a phần tử
      const [options, answer] = mcOptions(r, String(count), distractInt(r, count, 2).map(String));
      return {
        stem: `Cho tập hợp $A=\\{x\\in\\N\\mid ${a}\\le x<${b}\\}$. Tập hợp $A$ có bao nhiêu phần tử?`,
        options, answer,
        thinking: [
          `Dấu $\\le$ ở bên trái nên **lấy** số ${a}; dấu $<$ ở bên phải nên **không lấy** số ${b}.`,
          `Các phần tử chạy từ ${a} đến ${b - 1}.`,
        ],
        solution: [
          `$A=\\{${Array.from({ length: n }, (_, i) => a + i).join(';')}\\}$.`,
          `Số phần tử $=${b}-${a}=${count}$.`,
        ],
        pitfall: 'Nhầm “nhỏ hơn” với “không vượt quá” là lỗi làm lệch một phần tử.',
      };
    },
  },
  {
    id: 'g6.tinh-nhanh', topicId: 'g6-t1', grade: 6, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tính nhanh bằng nhân tử chung',
    build: (r) => {
      const k = r.pick([25, 4, 8, 125, 50]);
      const a = r.int(11, 89), b = 100 - a;
      const val = k * 100;
      return {
        stem: `Tính hợp lí: $${k}\\cdot${a}+${k}\\cdot${b}$.`,
        answer: String(val),
        thinking: [`Hai hạng tử có thừa số chung ${k}.`, `Phần trong ngoặc: $${a}+${b}=100$ — số tròn trăm.`],
        solution: [
          `$${k}\\cdot${a}+${k}\\cdot${b}=${k}(${a}+${b})$`,
          `$=${k}\\cdot100=${val}$.`,
        ],
        pitfall: 'Nhân thẳng từng tích rồi cộng vừa lâu vừa dễ sai — luôn tìm nhân tử chung trước.',
      };
    },
  },
  {
    id: 'g6.luy-thua', topicId: 'g6-t1', grade: 6, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Nhân, chia lũy thừa cùng cơ số',
    build: (r) => {
      const base = r.pick([2, 3, 5, 7]);
      const m = r.int(4, 9), n = r.int(2, 5), p = r.int(1, 3);
      const e = m + n - p;
      const correct = `${base}^{${e}}`;
      const [options, answer] = mcOptions(r, correct, [
        `${base}^{${m * n - p}}`, `${base}^{${m + n + p}}`, `${base}^{${e + 1}}`,
      ]);
      return {
        stem: `Kết quả của phép tính $${base}^{${m}}\\cdot${base}^{${n}}:${base}^{${p}}$ là:`,
        options, answer,
        thinking: ['Cùng cơ số nên chỉ làm việc với số mũ: nhân thì cộng số mũ, chia thì trừ số mũ.'],
        solution: [
          `$${base}^{${m}}\\cdot${base}^{${n}}=${base}^{${m}+${n}}=${base}^{${m + n}}$.`,
          `$${base}^{${m + n}}:${base}^{${p}}=${base}^{${m + n}-${p}}=${base}^{${e}}$.`,
        ],
        pitfall: 'Nhân hai lũy thừa cùng cơ số thì CỘNG số mũ, không nhân số mũ.',
      };
    },
  },
  {
    id: 'g6.thu-tu-phep-tinh', topicId: 'g6-t1', grade: 6, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Thứ tự thực hiện phép tính',
    build: (r) => {
      const a = r.int(2, 5), b = r.int(2, 4);       // a^b
      const c = r.pick([2, 3, 4, 5]);
      const d = c * r.int(2, 9);                     // d chia hết cho c
      const e = r.int(3, 9);
      const val = a ** b + d / c - e;
      return {
        stem: `Tính giá trị của biểu thức $A=${a}^{${b}}+${d}:${c}-${e}$.`,
        answer: String(val),
        thinking: ['Không có ngoặc: ưu tiên lũy thừa, sau đó nhân chia, cuối cùng cộng trừ từ trái sang phải.'],
        solution: [
          `Lũy thừa: $${a}^{${b}}=${a ** b}$.`,
          `Phép chia: $${d}:${c}=${d / c}$.`,
          `$A=${a ** b}+${d / c}-${e}=${val}$.`,
        ],
        pitfall: `Tính $${d}:${c}$ sau khi đã cộng là sai thứ tự — nhân chia luôn làm trước cộng trừ.`,
      };
    },
  },
  {
    id: 'g6.tim-x', topicId: 'g6-t1', grade: 6, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm x có lũy thừa',
    build: (r) => {
      const base = r.pick([2, 3, 5]);
      const x = r.int(2, 4);
      const k = r.int(2, 5), c = r.int(3, 12);
      const d = k * (base ** x + c);
      return {
        stem: `Tìm số tự nhiên $x$, biết $${k}\\cdot(${base}^{x}+${c})=${d}$.`,
        answer: String(x),
        thinking: [
          `$x$ nằm ở lớp trong cùng; bên ngoài lần lượt là “$+${c}$” rồi “nhân ${k}”.`,
          'Gỡ ngược từ ngoài vào: chia trước, trừ sau, cuối cùng so sánh lũy thừa cùng cơ số.',
        ],
        solution: [
          `$${base}^{x}+${c}=${d}:${k}=${d / k}$.`,
          `$${base}^{x}=${d / k}-${c}=${base ** x}$.`,
          `Mà $${base ** x}=${base}^{${x}}$ nên $x=${x}$.`,
          `Thử lại: $${k}(${base}^{${x}}+${c})=${k}\\cdot${base ** x + c}=${d}$ (đúng).`,
        ],
      };
    },
  },
  {
    id: 'g6.chia-het', topicId: 'g6-t2', grade: 6, level: 'NB', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Tính chất chia hết của tổng',
    build: (r) => {
      const m = r.pick([2, 3, 5, 9]);
      const a = m * r.int(4, 20), b = m * r.int(4, 20), c = m * r.int(2, 15) + r.int(1, m - 1);
      const opts = [
        `$${a}$ chia hết cho $${m}$`,
        `$${a}+${b}$ chia hết cho $${m}$`,
        `$${a}+${c}$ chia hết cho $${m}$`,
        `$${b}-${a}$ chia hết cho $${m}$`,
      ];
      const key = [true, true, false, true];
      return {
        stem: `Cho $m=${m}$. Xét tính đúng – sai của mỗi khẳng định sau:`,
        options: opts, answer: key,
        thinking: [`Xét từng số với số chia ${m}, rồi áp dụng tính chất chia hết của tổng và hiệu.`],
        solution: [
          `$${a}=${m}\\cdot${a / m}$ nên $${a}\;\\vdots\;${m}$.`,
          `$${b}=${m}\\cdot${b / m}$ nên $${b}\;\\vdots\;${m}$; do đó tổng và hiệu của chúng đều chia hết cho ${m}$.`,
          `$${c}$ chia ${m} dư ${c % m}$ nên $${a}+${c}$ **không** chia hết cho ${m}$.`,
        ],
        pitfall: 'Một số chia hết cộng một số không chia hết thì tổng KHÔNG chia hết.',
      };
    },
  },
  {
    id: 'g6.dau-hieu', topicId: 'g6-t2', grade: 6, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Dấu hiệu chia hết — tìm chữ số',
    build: (r) => {
      const d1 = r.int(1, 9), d3 = r.int(0, 9), d4 = r.int(0, 9);
      const base = d1 + d3 + d4;
      // tìm a in [0..9] sao cho (base + a) chia hết 9
      let a = (9 - (base % 9)) % 9;
      const total = base + a;
      return {
        stem: `Tìm chữ số $a$ để số $\\ov{${d1}a${d3}${d4}}$ chia hết cho 9.`,
        answer: String(a),
        accept: a === 0 ? ['0', '9'] : undefined,
        thinking: ['Chia hết cho 9 thì xét TỔNG các chữ số.', `Tổng các chữ số là $${d1}+a+${d3}+${d4}=a+${base}$.`],
        solution: [
          `Số đã cho chia hết cho 9 $\\Leftrightarrow (a+${base})\;\\vdots\;9$.`,
          `Vì $0\\le a\\le9$ nên $${base}\\le a+${base}\\le${base + 9}$.`,
          `Trong khoảng đó, bội của 9 phù hợp là $${total}$, suy ra $a=${a}$.`,
        ],
        pitfall: 'Phải chặn miền giá trị của tổng để không bỏ sót hoặc thừa nghiệm.',
      };
    },
  },
  {
    id: 'g6.nguyen-to', topicId: 'g6-t2', grade: 6, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Phân tích thừa số nguyên tố — đếm ước',
    build: (r) => {
      const n = r.pick([120, 180, 240, 360, 252, 300, 168, 200, 216, 400]);
      const f = factorize(n);
      const cnt = f.reduce((s, [, e]) => s * (e + 1), 1);
      const [options, answer] = mcOptions(r, String(cnt), distractInt(r, cnt, 3).map(String));
      return {
        stem: `Số $${n}$ có bao nhiêu ước tự nhiên?`,
        options, answer,
        thinking: ['Phân tích ra thừa số nguyên tố rồi nhân các (số mũ + 1).'],
        solution: [
          `$${n}=${f.map(([p, e]) => (e === 1 ? `${p}` : `${p}^{${e}}`)).join('\\cdot')}$.`,
          `Số ước $=${f.map(([, e]) => `(${e}+1)`).join('')}=${cnt}$.`,
        ],
        pitfall: 'Quên cộng 1 vào mỗi số mũ.',
      };
    },
  },
  {
    id: 'g6.ucln', topicId: 'g6-t2', grade: 6, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Bài toán thực tế ƯCLN',
    build: (r) => {
      const g = r.pick([6, 8, 12, 15, 18]);
      const p = r.shuffle([2, 3, 5, 7, 11]).slice(0, 3);
      const a = g * p[0], b = g * p[1], c = g * p[2];
      const item = r.pick([
        { x: 'quyển vở', y: 'chiếc bút', z: 'cục tẩy' },
        { x: 'cái kẹo', y: 'cái bánh', z: 'quả cam' },
        { x: 'quyển truyện', y: 'chiếc thước', z: 'hộp màu' },
      ]);
      return {
        stem: `Cô giáo có $${a}$ ${item.x}, $${b}$ ${item.y} và $${c}$ ${item.z}. Cô muốn chia đều tất cả vào các phần quà sao cho số phần quà là nhiều nhất. Hỏi chia được nhiều nhất bao nhiêu phần quà?`,
        answer: String(g),
        thinking: [
          '“Chia đều” cho cả ba loại → số phần quà là **ước chung** của ba số.',
          '“Nhiều nhất” → lấy ƯCLN.',
        ],
        solution: [
          `Gọi $n$ là số phần quà ($n\\in\\Nstar$). Vì chia đều nên $n$ là ước chung của $${a}$, $${b}$, $${c}$.`,
          `Yêu cầu nhiều nhất nên $n=$ ƯCLN$(${a};${b};${c})=${g}$.`,
          `Vậy chia được nhiều nhất **${g} phần quà**; mỗi phần có ${a / g} ${item.x}, ${b / g} ${item.y} và ${c / g} ${item.z}.`,
        ],
        pitfall: 'Từ khoá “nhiều nhất / lớn nhất” → ƯCLN; “ít nhất / cùng lúc” → BCNN.',
      };
    },
  },
  {
    id: 'g6.bcnn', topicId: 'g6-t2', grade: 6, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Bài toán thực tế BCNN (có dư)',
    build: (r) => {
      const trio = r.pick([[12, 15, 18], [8, 12, 20], [10, 12, 15], [6, 9, 12], [12, 16, 20]]);
      const L = trio.reduce((x, y) => lcm(x, y));
      const dư = r.int(1, Math.min(5, trio[0] - 1));
      const k = r.int(2, 3);
      const n = L * k + dư;
      const lo = L * k - Math.floor(L / 2), hi = L * k + Math.floor(L / 2) + dư;
      return {
        stem: `Số học sinh khối 6 của một trường khi xếp thành hàng $${trio[0]}$, hàng $${trio[1]}$, hàng $${trio[2]}$ thì đều thừa $${dư}$ em. Biết số học sinh trong khoảng từ $${lo}$ đến $${hi}$. Tính số học sinh khối 6.`,
        answer: String(n),
        thinking: [
          `“Đều thừa ${dư}” nghĩa là nếu bớt đi ${dư} em thì chia hết cho cả ba số.`,
          'Đặt $n$ là số học sinh, khi đó $n-' + dư + '$ là bội chung của ba số.',
        ],
        solution: [
          `Gọi $n$ là số học sinh khối 6 ($n\\in\\Nstar$, $${lo}\\le n\\le${hi}$).`,
          `Theo đề: $(n-${dư})$ chia hết cho $${trio[0]}$, $${trio[1]}$, $${trio[2]}$ nên $n-${dư}\\in$ BC$(${trio.join(';')})$.`,
          `BCNN$(${trio.join(';')})=${L}$, do đó $n-${dư}\\in\\{0;${L};${L * 2};${L * 3};\\dots\\}$.`,
          `Suy ra $n\\in\\{${dư};${L + dư};${L * 2 + dư};${L * 3 + dư};\\dots\\}$.`,
          `Đối chiếu điều kiện $${lo}\\le n\\le${hi}$ ta được $n=${n}$.`,
          `Vậy khối 6 có **${n} học sinh**.`,
        ],
        pitfall: 'Quên cộng lại phần dư sau khi tìm BCNN.',
      };
    },
  },
  {
    id: 'g6.so-nguyen-ss', topicId: 'g6-t3', grade: 6, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'So sánh số nguyên',
    build: (r) => {
      const nums = r.shuffle([-r.int(5, 20), -r.int(1, 4), 0, r.int(1, 15)]);
      const min = Math.min(...nums);
      const [options, answer] = mcOptions(r, String(min), nums.filter((x) => x !== min).map(String));
      return {
        stem: `Trong các số $${nums.join(';\\ ')}$, số nhỏ nhất là:`,
        options, answer,
        thinking: ['Mọi số nguyên âm đều nhỏ hơn 0 và nhỏ hơn mọi số nguyên dương.', 'Trong hai số âm, số nào có giá trị tuyệt đối lớn hơn thì nhỏ hơn.'],
        solution: [`Sắp xếp tăng dần: $${nums.slice().sort((a, b) => a - b).join('<')}$.`, `Vậy số nhỏ nhất là $${min}$.`],
        pitfall: 'So sánh hai số âm theo độ lớn giá trị tuyệt đối là lỗi phổ biến nhất.',
      };
    },
  },
  {
    id: 'g6.so-nguyen-tinh', topicId: 'g6-t3', grade: 6, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tính hợp lí với số nguyên',
    build: (r) => {
      const a = r.int(100, 300), b = r.int(50, 200);
      const c = r.int(20, 90), d = 100 - c;
      const val = -(a + b) + 100;
      return {
        stem: `Tính hợp lí: $A=(-${a})+${c}+(-${b})+${d}$.`,
        answer: String(val),
        thinking: [`Nhóm hai số âm lại; hai số dương $${c}+${d}=100$ tròn trăm.`],
        solution: [
          `$A=[(-${a})+(-${b})]+(${c}+${d})$`,
          `$A=(-${a + b})+100=${val}$.`,
        ],
      };
    },
  },
  {
    id: 'g6.so-nguyen-timx', topicId: 'g6-t3', grade: 6, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm x với số nguyên',
    build: (r) => {
      const x = r.int(-12, 12) || 5;
      const a = r.int(2, 6), b = r.int(1, 5);
      const c = r.int(-15, 15);
      // a*x + c = b*x + d  ->  d = (a-b)*x + c
      const d = (a - b) * x + c;
      return {
        stem: `Tìm số nguyên $x$, biết $${a}x${c >= 0 ? '+' : '-'}${Math.abs(c)}=${b}x${d >= 0 ? '+' : '-'}${Math.abs(d)}$.`,
        answer: String(x),
        thinking: ['Chuyển các hạng tử chứa $x$ về vế trái, hằng số về vế phải; nhớ đổi dấu khi chuyển vế.'],
        solution: [
          `$${a}x-${b}x=${d}-(${c})$`,
          `$${a - b}x=${d - c}$`,
          `$x=${d - c}:${a - b}=${x}$.`,
          `Thử lại: $${a}\\cdot${x}${c >= 0 ? '+' : '-'}${Math.abs(c)}=${a * x + c}$ và $${b}\\cdot${x}${d >= 0 ? '+' : '-'}${Math.abs(d)}=${b * x + d}$ (bằng nhau).`,
        ],
        pitfall: 'Chuyển vế mà quên đổi dấu.',
      };
    },
  },
  {
    id: 'g6.phan-so-rutgon', topicId: 'g6-t4', grade: 6, level: 'NB', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Rút gọn phân số',
    build: (r) => {
      const k = r.int(3, 12);
      const [n0, d0] = [r.int(2, 9), r.int(2, 11)];
      const g = gcd(n0, d0);
      const n = n0 / g, d = d0 / g;
      if (d === 1) return { stem: 'Rút gọn phân số $\\f{12}{18}$.', answer: '2/3', solution: ['$\\f{12}{18}=\\f{12:6}{18:6}=\\f{2}{3}$.'] };
      return {
        stem: `Rút gọn phân số $\\f{${n * k}}{${d * k}}$ về dạng tối giản (nhập theo dạng a/b).`,
        answer: `${n}/${d}`,
        thinking: [`Tìm ƯCLN của tử và mẫu: ƯCLN$(${n * k};${d * k})=${k}$.`],
        solution: [`$\\f{${n * k}}{${d * k}}=\\f{${n * k}:${k}}{${d * k}:${k}}=\\f{${n}}{${d}}$.`],
      };
    },
  },
  {
    id: 'g6.phan-so-tinh', topicId: 'g6-t4', grade: 6, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Cộng, trừ phân số khác mẫu',
    build: (r) => {
      const b = r.int(3, 9), d = r.int(3, 12);
      const a = r.int(1, b - 1), c = r.int(1, d - 1);
      const num = a * d + c * b, den = b * d;
      const [rn, rd] = reduce(num, den);
      return {
        stem: `Tính $\\f{${a}}{${b}}+\\f{${c}}{${d}}$ (nhập kết quả tối giản dạng a/b).`,
        answer: rd === 1 ? String(rn) : `${rn}/${rd}`,
        thinking: [`Mẫu chung là BCNN$(${b};${d})=${lcm(b, d)}$; ở đây ta dùng $${b}\\cdot${d}=${den}$ rồi rút gọn.`],
        solution: [
          `$\\f{${a}}{${b}}+\\f{${c}}{${d}}=\\f{${a}\\cdot${d}+${c}\\cdot${b}}{${den}}=\\f{${num}}{${den}}$`,
          `$=${frac(num, den)}$.`,
        ],
      };
    },
  },
  {
    id: 'g6.phan-so-bt', topicId: 'g6-t4', grade: 6, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Bài toán về phân số — bẫy “phần còn lại”',
    build: (r) => {
      const b1 = r.pick([3, 4, 5]);        // ngày đầu đọc a1/b1
      const a1 = r.int(1, b1 - 1);
      const b2 = r.pick([2, 3, 4]);        // ngày hai đọc 1/b2 phần còn lại
      // phần còn lại sau ngày 1: 1 - a1/b1 = (b1-a1)/b1
      const remN = b1 - a1, remD = b1;
      // ngày 2 đọc: (1/b2) * rem = remN/(b2*remD)
      const d2N = remN, d2D = b2 * remD;
      // ngày 3 = rem - ngày2 = remN/remD - remN/(b2 remD) = remN(b2-1)/(b2 remD)
      const d3N = remN * (b2 - 1), d3D = b2 * remD;
      const [pn, pd] = reduce(d3N, d3D);
      const unit = r.int(4, 20) * pn;      // số trang ngày 3, chia hết cho pn
      const total = (unit / pn) * pd;
      return {
        stem: `Một quyển sách, ngày đầu An đọc $\\f{${a1}}{${b1}}$ số trang, ngày thứ hai đọc $\\f{1}{${b2}}$ số trang **còn lại**, ngày thứ ba đọc nốt $${unit}$ trang thì hết quyển sách. Hỏi quyển sách có bao nhiêu trang?`,
        answer: String(total),
        thinking: [
          'Chú ý cụm “số trang còn lại”: mốc so sánh của ngày hai là phần chưa đọc, không phải cả quyển.',
          'Quy mọi phân số về cùng một mốc là **cả quyển sách**, rồi đi ngược từ số trang ngày ba.',
        ],
        solution: [
          `Sau ngày đầu, phần còn lại là $1-\\f{${a1}}{${b1}}=${frac(remN, remD)}$ quyển sách.`,
          `Ngày thứ hai đọc $\\f{1}{${b2}}$ của phần còn lại, tức $\\f{1}{${b2}}\\cdot${frac(remN, remD)}=${frac(d2N, d2D)}$ quyển sách.`,
          `Ngày thứ ba đọc: $${frac(remN, remD)}-${frac(d2N, d2D)}=${frac(pn, pd)}$ quyển sách, ứng với $${unit}$ trang.`,
          `Số trang quyển sách: $${unit}:${frac(pn, pd)}=${unit}\\cdot\\f{${pd}}{${pn}}=${total}$ (trang).`,
          `Vậy quyển sách có **${total} trang**.`,
        ],
        pitfall: 'Bẫy “phần còn lại” — nếu lấy $\\f{1}{b}$ của cả quyển là sai ngay từ dòng đầu.',
      };
    },
  },
  {
    id: 'g6.phan-so-day', topicId: 'g6-t4', grade: 6, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tổng dãy phân số có quy luật',
    build: (r) => {
      // S = 1/(a(a+1)) + ... + 1/(b(b+1)) = 1/a - 1/(b+1)
      const a = r.int(2, 5), b = r.int(20, 60);
      const num = (b + 1) - a, den = a * (b + 1);
      const [rn, rd] = reduce(num, den);
      return {
        stem: `Tính tổng $S=\\f{1}{${a}\\cdot${a + 1}}+\\f{1}{${a + 1}\\cdot${a + 2}}+\\dots+\\f{1}{${b}\\cdot${b + 1}}$ (nhập kết quả tối giản dạng a/b).`,
        answer: `${rn}/${rd}`,
        thinking: [
          'Mẫu có dạng $n(n+1)$ → dùng công thức sai phân $\\f{1}{n(n+1)}=\\f{1}{n}-\\f{1}{n+1}$.',
          'Sau khi tách, các số hạng giữa triệt tiêu từng đôi một.',
        ],
        solution: [
          `$S=\\left(\\f{1}{${a}}-\\f{1}{${a + 1}}\\right)+\\left(\\f{1}{${a + 1}}-\\f{1}{${a + 2}}\\right)+\\dots+\\left(\\f{1}{${b}}-\\f{1}{${b + 1}}\\right)$`,
          `Các số hạng ở giữa triệt tiêu, còn lại $S=\\f{1}{${a}}-\\f{1}{${b + 1}}$.`,
          `$S=\\f{${b + 1}-${a}}{${den}}=${frac(num, den)}$.`,
        ],
      };
    },
  },
  {
    id: 'g6.phan-tram', topicId: 'g6-t5', grade: 6, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tỉ số phần trăm',
    build: (r) => {
      const total = r.pick([40, 50, 25, 80, 20, 200]);
      const part = Math.round(total * r.pick([0.15, 0.2, 0.25, 0.35, 0.4, 0.6]));
      const pct = (part / total) * 100;
      return {
        stem: `Lớp 6A có $${total}$ học sinh, trong đó có $${part}$ học sinh giỏi. Hỏi học sinh giỏi chiếm bao nhiêu phần trăm số học sinh cả lớp? (Nhập số, không kèm dấu %.)`,
        answer: String(Math.round(pct * 100) / 100),
        thinking: ['Toàn thể là số học sinh cả lớp; phần là số học sinh giỏi → lấy phần chia toàn thể rồi nhân 100%.'],
        solution: [`Tỉ số phần trăm $=\\f{${part}}{${total}}\\cdot100\\percent=${Math.round(pct * 100) / 100}\\percent$.`],
      };
    },
  },
  {
    id: 'g6.giam-gia', topicId: 'g6-t5', grade: 6, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Bài toán giảm giá liên tiếp',
    build: (r) => {
      const price = r.pick([500000, 800000, 600000, 1200000, 400000]);
      const m = r.pick([10, 20, 25]), n = r.pick([5, 10, 20]);
      const p1 = price * (1 - m / 100);
      const p2 = p1 * (1 - n / 100);
      return {
        stem: `Một chiếc áo có giá niêm yết $${price.toLocaleString('vi-VN')}$ đồng, được giảm $${m}\\percent$. Sau đó cửa hàng giảm thêm $${n}\\percent$ trên giá đã giảm. Tính giá cuối cùng của chiếc áo (đơn vị: đồng).`,
        answer: String(Math.round(p2)),
        thinking: [
          'Hai lần giảm liên tiếp → nhân hai hệ số, KHÔNG cộng dồn hai phần trăm.',
          'Lần giảm thứ hai tính trên giá đã giảm, không phải giá gốc.',
        ],
        solution: [
          `Giá sau lần giảm thứ nhất: $${price.toLocaleString('vi-VN')}\\cdot(1-\\f{${m}}{100})=${p1.toLocaleString('vi-VN')}$ (đồng).`,
          `Giá sau lần giảm thứ hai: $${p1.toLocaleString('vi-VN')}\\cdot(1-\\f{${n}}{100})=${Math.round(p2).toLocaleString('vi-VN')}$ (đồng).`,
          `Lưu ý: tổng mức giảm là $100\\percent-${Math.round((p2 / price) * 100)}\\percent=${100 - Math.round((p2 / price) * 100)}\\percent$, **không** phải $${m + n}\\percent$.`,
        ],
        pitfall: `Giảm ${m}% rồi giảm tiếp ${n}% không bằng giảm ${m + n}%.`,
      };
    },
  },
  {
    id: 'g6.chu-vi-dien-tich', topicId: 'g6-t6', grade: 6, level: 'TH', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Chu vi — diện tích hình cơ bản',
    build: (r) => {
      const a = r.int(8, 30), num = r.int(1, 3), den = num + r.int(1, 2);
      const b = Math.round((a * num) / den) || 5;
      const kind = r.pick(['S', 'C'] as const);
      const S = a * b, C = 2 * (a + b);
      return {
        stem: `Một mảnh vườn hình chữ nhật có chiều dài $${a}\\,m$ và chiều rộng $${b}\\,m$. Tính ${kind === 'S' ? 'diện tích' : 'chu vi'} mảnh vườn (đơn vị: ${kind === 'S' ? 'm²' : 'm'}).`,
        answer: String(kind === 'S' ? S : C),
        thinking: ['Xác định đúng công thức: $S=ab$ và $C=2(a+b)$.'],
        solution: kind === 'S'
          ? [`$S=${a}\\cdot${b}=${S}\\ (m^{2})$.`]
          : [`$C=2(${a}+${b})=2\\cdot${a + b}=${C}\\ (m)$.`],
      };
    },
  },
  {
    id: 'g6.hinh-thuc-te', topicId: 'g6-t6', grade: 6, level: 'VD', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Bài toán lát gạch — bẫy đổi đơn vị',
    build: (r) => {
      const side = r.pick([20, 25, 30, 40, 50]); // cm
      const s = side / 100;
      const k1 = r.int(4, 12), k2 = r.int(3, 10);
      const L = k1 * s * r.int(1, 3), W = k2 * s * r.int(1, 3);
      const n = Math.round((L * W) / (s * s));
      return {
        stem: `Nền một căn phòng hình chữ nhật có chiều dài $${L}\\,m$, chiều rộng $${W}\\,m$. Người ta lát nền bằng những viên gạch hình vuông cạnh $${side}\\,cm$. Hỏi cần bao nhiêu viên gạch (coi mạch vữa không đáng kể)?`,
        answer: String(n),
        thinking: [
          'Đơn vị khác nhau: phòng tính bằng mét, gạch tính bằng xăng-ti-mét → phải đổi trước.',
          'Số viên gạch = diện tích nền chia diện tích một viên.',
        ],
        solution: [
          `Đổi $${side}\\,cm=${s}\\,m$.`,
          `Diện tích nền: $${L}\\cdot${W}=${Math.round(L * W * 10000) / 10000}\\ (m^{2})$.`,
          `Diện tích một viên gạch: $${s}\\cdot${s}=${Math.round(s * s * 10000) / 10000}\\ (m^{2})$.`,
          `Số viên gạch: $${Math.round(L * W * 10000) / 10000}:${Math.round(s * s * 10000) / 10000}=${n}$ (viên).`,
        ],
        pitfall: 'Không đổi đơn vị trước khi chia — bẫy kinh điển của lớp 6.',
      };
    },
  },
  {
    id: 'g6.doan-thang', topicId: 'g6-t7', grade: 6, level: 'TH', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Tính độ dài đoạn thẳng',
    build: (r) => {
      const oa = r.int(2, 8), ab = r.int(2, 8), ob = oa + ab;
      return {
        stem: `Trên tia $Ox$ lấy hai điểm $A$ và $B$ sao cho $OA=${oa}\\,cm$, $OB=${ob}\\,cm$. Tính độ dài đoạn thẳng $AB$ (đơn vị: cm).`,
        answer: String(ab),
        thinking: ['Hai điểm cùng thuộc tia $Ox$; điểm nào gần gốc hơn thì nằm giữa.'],
        solution: [
          `Vì $A$, $B$ cùng thuộc tia $Ox$ và $OA<OB$ ($${oa}<${ob}$) nên điểm $A$ nằm giữa $O$ và $B$.`,
          `Do đó $OA+AB=OB$.`,
          `$AB=OB-OA=${ob}-${oa}=${ab}\\ (cm)$.`,
        ],
        pitfall: 'Phải lập luận “điểm nằm giữa” trước khi dùng hệ thức cộng đoạn thẳng.',
      };
    },
  },
  {
    id: 'g6.goc', topicId: 'g6-t7', grade: 6, level: 'TH', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Tính số đo góc',
    build: (r) => {
      const xOz = r.int(80, 170), xOy = r.int(25, xOz - 20);
      return {
        stem: `Cho $\\angle xOz=${xOz}\\deg$, tia $Oy$ nằm giữa hai tia $Ox$ và $Oz$, biết $\\angle xOy=${xOy}\\deg$. Tính số đo góc $\\angle yOz$ (nhập số đo theo độ).`,
        answer: String(xOz - xOy),
        thinking: ['Tia $Oy$ nằm giữa → dùng hệ thức cộng góc.'],
        solution: [
          `Vì tia $Oy$ nằm giữa hai tia $Ox$, $Oz$ nên $\\angle xOy+\\angle yOz=\\angle xOz$.`,
          `$\\angle yOz=${xOz}\\deg-${xOy}\\deg=${xOz - xOy}\\deg$.`,
        ],
      };
    },
  },
  {
    id: 'g6.xac-suat', topicId: 'g6-t8', grade: 6, level: 'TH', kind: 'SHORT',
    strand: 'THONG_KE_XS', tag: 'Xác suất thực nghiệm',
    build: (r) => {
      const total = r.pick([20, 25, 40, 50, 100]);
      const hit = r.int(3, Math.floor(total / 2));
      const [n, d] = reduce(hit, total);
      return {
        stem: `Gieo một con xúc xắc $${total}$ lần thì mặt 6 chấm xuất hiện $${hit}$ lần. Tính xác suất thực nghiệm của sự kiện “gieo được mặt 6 chấm” (nhập dạng a/b tối giản).`,
        answer: d === 1 ? String(n) : `${n}/${d}`,
        accept: [String(Math.round((hit / total) * 10000) / 10000)],
        thinking: ['Áp dụng trực tiếp định nghĩa: số lần xảy ra chia tổng số lần thực hiện.'],
        solution: [`Xác suất thực nghiệm $=\\f{${hit}}{${total}}=${frac(hit, total)}$.`],
      };
    },
  },
  {
    id: 'g6.thong-ke', topicId: 'g6-t8', grade: 6, level: 'NB', kind: 'MC',
    strand: 'THONG_KE_XS', tag: 'Đọc biểu đồ cột',
    build: (r) => {
      const sports = ['Bóng đá', 'Cầu lông', 'Bóng rổ', 'Bơi lội'];
      const vals = sports.map(() => r.int(4, 20));
      const mx = Math.max(...vals);
      const best = sports[vals.indexOf(mx)];
      const [options, answer] = mcOptions(r, best, sports.filter((s) => s !== best));
      return {
        stem: `Biểu đồ cột ghi lại số học sinh yêu thích các môn thể thao của lớp 6A: ${sports.map((s, i) => `${s}: ${vals[i]}`).join('; ')}. Môn thể thao nào được nhiều học sinh yêu thích nhất?`,
        options, answer,
        thinking: ['Tìm cột có số liệu lớn nhất.'],
        solution: [`Số liệu lớn nhất là $${mx}$, ứng với môn **${best}**.`, `Tổng số học sinh cả lớp: $${vals.join('+')}=${vals.reduce((a, b) => a + b, 0)}$.`],
      };
    },
  },
  {
    id: 'g6.tu-luan-1', topicId: 'g6-t2', grade: 6, level: 'VD', kind: 'ESSAY',
    strand: 'SO_DAI_SO', tag: 'Tự luận — bài toán ƯCLN/BCNN',
    build: (r) => {
      const trio = r.pick([[24, 36], [18, 30], [40, 60], [45, 75]]);
      const g = gcd(trio[0], trio[1]);
      const L = lcm(trio[0], trio[1]);
      return {
        stem: `a) Tìm ƯCLN$(${trio[0]};${trio[1]})$ và BCNN$(${trio[0]};${trio[1]})$.\n\nb) Kiểm tra lại kết quả bằng hệ thức ƯCLN$\\cdot$BCNN$=$ tích hai số.`,
        answer: '',
        rubric: [
          { criterion: `Phân tích đúng $${trio[0]}$ và $${trio[1]}$ ra thừa số nguyên tố`, points: 1 },
          { criterion: `Tính đúng ƯCLN $=${g}$ (chung, mũ nhỏ nhất)`, points: 1 },
          { criterion: `Tính đúng BCNN $=${L}$ (chung và riêng, mũ lớn nhất)`, points: 1 },
          { criterion: `Kiểm tra đúng: $${g}\\cdot${L}=${trio[0]}\\cdot${trio[1]}=${trio[0] * trio[1]}$`, points: 1 },
        ],
        thinking: ['Phân tích ra thừa số nguyên tố là bước bắt buộc; sau đó chỉ việc chọn thừa số theo quy tắc.'],
        solution: [
          `$${trio[0]}=${factorize(trio[0]).map(([p, e]) => (e === 1 ? `${p}` : `${p}^{${e}}`)).join('\\cdot')}$ ; $${trio[1]}=${factorize(trio[1]).map(([p, e]) => (e === 1 ? `${p}` : `${p}^{${e}}`)).join('\\cdot')}$.`,
          `ƯCLN: chọn thừa số nguyên tố **chung** với số mũ **nhỏ nhất** → ƯCLN$=${g}$.`,
          `BCNN: chọn thừa số nguyên tố **chung và riêng** với số mũ **lớn nhất** → BCNN$=${L}$.`,
          `Kiểm tra: $${g}\\cdot${L}=${g * L}$ và $${trio[0]}\\cdot${trio[1]}=${trio[0] * trio[1]}$ — bằng nhau, kết quả đúng.`,
        ],
      };
    },
  },
];
