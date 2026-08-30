import type { Template } from '@/types';
import { gcd, mcOptions } from '@/lib/rng';

/* =====================================================================
   MATHGITA — KHUÔN CÂU HỎI BIÊN SOẠN TỪ PHIẾU GỐC GITA (khối 6)
   Các dạng lấy trực tiếp từ bộ phiếu "Cơ bản / Nâng cao" của trung tâm.
   ===================================================================== */

const ROMAN: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];
const toRoman = (n: number): string => {
  let out = '', x = n;
  for (const [v, s] of ROMAN) while (x >= v) { out += s; x -= v; }
  return out;
};

export const BANK_G6_GITA: Template[] = [
  {
    id: 'g6.so-la-ma', topicId: 'g6-t1', grade: 6, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Số La Mã',
    build: (r) => {
      const n = r.int(4, 39);
      const ask = r.pick(['doc', 'viet'] as const);
      const rom = toRoman(n);
      if (ask === 'doc') {
        const [options, answer] = mcOptions(r, String(n), [String(n + 1), String(n - 1), String(n + 5)]);
        return {
          stem: `Số La Mã $${rom}$ có giá trị bằng bao nhiêu?`,
          options, answer,
          thinking: [
            'Ký hiệu bé đứng **bên trái** ký hiệu lớn thì lấy lớn **trừ** bé (ví dụ $IV=5-1=4$).',
            'Ký hiệu bé đứng **bên phải** ký hiệu lớn thì lấy lớn **cộng** bé (ví dụ $VI=5+1=6$).',
          ],
          solution: [`Bảng giá trị: $I=1$; $V=5$; $X=10$; $L=50$.`, `$${rom}=${n}$.`],
          pitfall: 'Đọc trái sang phải và xét từng cặp ký hiệu liền nhau — bỏ qua quy tắc trừ là sai ngay.',
        };
      }
      const [options, answer] = mcOptions(r, `$${rom}$`, [`$${toRoman(n + 1)}$`, `$${toRoman(n - 1)}$`, `$${toRoman(n + 10)}$`]);
      return {
        stem: `Số $${n}$ được viết bằng số La Mã là:`,
        options, answer,
        thinking: ['Tách số theo hàng chục và hàng đơn vị rồi ghép ký hiệu tương ứng.'],
        solution: [`$${n}$ viết thành $${rom}$.`],
      };
    },
  },
  {
    id: 'g6.cau-tao-so', topicId: 'g6-t1', grade: 6, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Cấu tạo số — viết số theo điều kiện chữ số',
    build: (r) => {
      const d = r.int(1, 7);           // hiệu giữa chữ số hàng chục và hàng đơn vị
      const list: number[] = [];
      for (let a = 1; a <= 9; a++) {
        const b = a - d;
        if (b >= 0) list.push(10 * a + b);
      }
      return {
        stem: `Viết tập hợp các số tự nhiên có hai chữ số, trong đó chữ số hàng chục lớn hơn chữ số hàng đơn vị $${d}$ đơn vị. Tập hợp đó có bao nhiêu phần tử?`,
        answer: String(list.length),
        thinking: [
          `Gọi số cần tìm là $\\ov{ab}$ với $1\\le a\\le9$, $0\\le b\\le9$ và $a-b=${d}$.`,
          `Cho $a$ chạy từ nhỏ đến lớn, mỗi giá trị $a$ cho đúng một giá trị $b=a-${d}$ (nếu $b\\ge0$).`,
        ],
        solution: [
          `Điều kiện: $a-b=${d}$, tức $b=a-${d}\\ge0$ nên $a\\ge${d}$.`,
          `$a$ nhận các giá trị từ $${Math.max(1, d)}$ đến $9$.`,
          `Tập hợp: $\\{${list.join(';')}\\}$ — có $${list.length}$ phần tử.`,
        ],
        pitfall: 'Quên điều kiện chữ số hàng chục khác 0 hoặc quên $b\\ge0$.',
      };
    },
  },
  {
    id: 'g6.ucln-co-du', topicId: 'g6-t2', grade: 6, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm số chia từ hai phép chia có dư',
    build: (r) => {
      const a = r.pick([12, 14, 15, 16, 18, 20, 21, 24]);
      const r1 = r.int(1, Math.min(9, a - 1));
      const r2 = r.int(1, Math.min(9, a - 1));
      const n1 = a * r.int(6, 14) + r1;
      const n2 = a * r.int(6, 14) + r2;
      const g = gcd(n1 - r1, n2 - r2);
      // Số chia lớn nhất là ƯCLN của hai hiệu, với điều kiện lớn hơn số dư lớn nhất
      return {
        stem: `Tìm số tự nhiên $a$ lớn nhất, biết rằng $${n1}$ chia cho $a$ dư $${r1}$ và $${n2}$ chia cho $a$ dư $${r2}$.`,
        answer: String(g),
        thinking: [
          `“$${n1}$ chia $a$ dư $${r1}$” nghĩa là $${n1}-${r1}=${n1 - r1}$ chia hết cho $a$.`,
          `Tương tự $${n2}-${r2}=${n2 - r2}$ cũng chia hết cho $a$.`,
          `Vậy $a$ là ước chung của hai hiệu; muốn lớn nhất thì lấy ƯCLN. Nhớ điều kiện $a$ phải **lớn hơn số dư lớn nhất**.`,
        ],
        solution: [
          `Từ giả thiết: $(${n1}-${r1})\;\\vdots\;a$ và $(${n2}-${r2})\;\\vdots\;a$, tức $${n1 - r1}\;\\vdots\;a$ và $${n2 - r2}\;\\vdots\;a$.`,
          `Do đó $a\\in$ ƯC$(${n1 - r1};${n2 - r2})$.`,
          `ƯCLN$(${n1 - r1};${n2 - r2})=${g}$.`,
          `Điều kiện: $a>${Math.max(r1, r2)}$ (số chia phải lớn hơn số dư) — giá trị $a=${g}$ thoả mãn.`,
          `Vậy $a=${g}$.`,
        ],
        pitfall: 'Quên điều kiện “số chia lớn hơn số dư” là lỗi mất điểm phổ biến của dạng này.',
      };
    },
  },
  {
    id: 'g6.uc-bieu-thuc', topicId: 'g6-t2', grade: 6, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Ước chung của hai biểu thức chứa n',
    build: (r) => {
      // d | (a1 n + b1) và d | (a2 n + b2) → d | (a2 b1 - a1 b2)
      const a1 = r.int(1, 3), b1 = r.int(1, 6);
      const a2 = a1 + r.int(1, 3), b2 = r.int(1, 8);
      const k = Math.abs(a2 * b1 - a1 * b2);
      const divs: number[] = [];
      for (let i = 1; i <= (k || 1); i++) if (k % i === 0) divs.push(i);
      if (k === 0) {
        return {
          stem: 'Tìm ước chung lớn nhất của hai số $2n+3$ và $3n+4$ với $n$ là số tự nhiên.',
          answer: '1',
          thinking: ['Đặt $d$ là ước chung, khử $n$ bằng tổ hợp tuyến tính.'],
          solution: [
            'Gọi $d$ là ước chung của $2n+3$ và $3n+4$.',
            '$3(2n+3)-2(3n+4)=9-8=1$ nên $1\;\\vdots\;d\\Rightarrow d=1$.',
            'Vậy ƯCLN bằng 1, hai số nguyên tố cùng nhau.',
          ],
        };
      }
      return {
        stem: `Tìm ước chung lớn nhất có thể của hai số $${a1 === 1 ? '' : a1}n+${b1}$ và $${a2 === 1 ? '' : a2}n+${b2}$ (với $n$ là số tự nhiên).`,
        answer: String(k),
        thinking: [
          'Đặt $d$ là ước chung của hai biểu thức, rồi **khử $n$** bằng tổ hợp tuyến tính.',
          `Nhân biểu thức thứ nhất với $${a2}$ và biểu thức thứ hai với $${a1}$ để hệ số của $n$ bằng nhau.`,
        ],
        solution: [
          `Gọi $d$ là ước chung của $${a1 === 1 ? '' : a1}n+${b1}$ và $${a2 === 1 ? '' : a2}n+${b2}$.`,
          `Khi đó $${a2}(${a1 === 1 ? '' : a1}n+${b1})\;\\vdots\;d$ và $${a1}(${a2 === 1 ? '' : a2}n+${b2})\;\\vdots\;d$.`,
          `Trừ theo vế: $${a2 * b1}-${a1 * b2}=${a2 * b1 - a1 * b2}$ chia hết cho $d$.`,
          `Suy ra $d$ là ước của $${k}$; ước lớn nhất có thể là $d=${k}$.`,
          `Ư$(${k})=\\{${divs.join(';')}\\}$ — đây là tập các giá trị $d$ có thể nhận.`,
        ],
        remark: 'Kỹ thuật khử ẩn bằng tổ hợp tuyến tính là mẫu chuẩn cho mọi bài ƯC của biểu thức chứa $n$.',
      };
    },
  },
  {
    id: 'g6.lap-so', topicId: 'g6-t2', grade: 6, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Lập số theo dấu hiệu chia hết',
    build: (r) => {
      const d = r.pick([2, 5, 3, 9]);
      const digits = r.shuffle([0, r.int(1, 4), r.int(5, 9)]).slice(0, 3);
      const uniq = Array.from(new Set(digits));
      while (uniq.length < 3) uniq.push(uniq.length + 3);
      // đếm số có 3 chữ số khác nhau lập từ uniq và chia hết cho d
      const perms: number[] = [];
      for (const a of uniq) for (const b of uniq) for (const c of uniq) {
        if (a === b || b === c || a === c) continue;
        if (a === 0) continue;
        perms.push(100 * a + 10 * b + c);
      }
      const ok = perms.filter((x) => x % d === 0);
      return {
        stem: `Từ ba chữ số $${uniq.join('$; $')}$, có thể lập được bao nhiêu số tự nhiên có ba chữ số **khác nhau** và chia hết cho $${d}$?`,
        answer: String(ok.length),
        thinking: [
          'Liệt kê có hệ thống: chọn chữ số hàng trăm trước (khác 0), rồi hàng chục, rồi hàng đơn vị.',
          d === 2 || d === 5
            ? `Chia hết cho ${d} nên **chữ số tận cùng** phải thoả điều kiện — bắt đầu từ ràng buộc này để lọc nhanh.`
            : `Chia hết cho ${d} thì xét **tổng các chữ số**; tổng của ba chữ số đã cho là cố định nên hoặc tất cả các số đều thoả, hoặc không số nào thoả.`,
        ],
        solution: [
          `Các số có ba chữ số khác nhau lập được: $${perms.sort((a, b) => a - b).join('$; $')}$.`,
          ok.length
            ? `Trong đó chia hết cho $${d}$: $${ok.sort((a, b) => a - b).join('$; $')}$ — có $${ok.length}$ số.`
            : `Không có số nào chia hết cho $${d}$, vậy đáp số là $0$.`,
        ],
        pitfall: 'Quên loại các số có chữ số hàng trăm bằng 0.',
      };
    },
  },
  {
    id: 'g6.chia-nhom', topicId: 'g6-t2', grade: 6, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Đếm số cách chia đều thành nhóm',
    build: (r) => {
      const g = r.pick([4, 6, 8, 12]);
      const p = r.shuffle([2, 3, 5, 7]).slice(0, 2);
      const nam = g * p[0], nu = g * p[1];
      const divs: number[] = [];
      for (let i = 1; i <= g; i++) if (g % i === 0) divs.push(i);
      return {
        stem: `Có $${nam}$ học sinh nam và $${nu}$ học sinh nữ. Người ta muốn chia đều số học sinh nam và số học sinh nữ vào các nhóm. Hỏi có bao nhiêu **cách chia** như vậy?`,
        answer: String(divs.length),
        thinking: [
          'Số nhóm phải là **ước chung** của số nam và số nữ (để chia đều được cả hai).',
          'Số cách chia bằng số ước chung, tức số ước của ƯCLN.',
        ],
        solution: [
          `Gọi $n$ là số nhóm. Vì chia đều cả nam và nữ nên $n\\in$ ƯC$(${nam};${nu})$.`,
          `ƯCLN$(${nam};${nu})=${g}$, do đó ƯC$(${nam};${nu})=$ Ư$(${g})=\\{${divs.join(';')}\\}$.`,
          `Vậy có $${divs.length}$ cách chia.`,
        ],
        pitfall: 'Đề hỏi “bao nhiêu cách chia” (đếm số ước chung), khác với “chia nhiều nhất bao nhiêu nhóm” (lấy ƯCLN).',
      };
    },
  },
];
