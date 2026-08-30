import type { Template } from '@/types';
import { distractInt, mcOptions, poly, reduce } from '@/lib/rng';

/* MATHGITA — NGÂN HÀNG CÂU HỎI KHỐI 8 */

const sgn = (n: number, first = false) => (n < 0 ? `-${Math.abs(n)}` : first ? `${n}` : `+${n}`);

export const BANK_G8: Template[] = [
  {
    id: 'g8.hang-dang-thuc', topicId: 'g8-t1', grade: 8, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Hằng đẳng thức — hiệu hai bình phương',
    build: (r) => {
      const a = r.int(2, 7), b = r.int(1, 9);
      // (ax+b)^2 - (ax-b)^2 = 4abx
      const k = 4 * a * b;
      const [options, answer] = mcOptions(r, `${k}x`, [`${2 * a * b}x`, `${2 * b * b}`, `${k}x^{2}`]);
      return {
        stem: `Rút gọn biểu thức $M=(${a}x+${b})^{2}-(${a}x-${b})^{2}$.`,
        options, answer,
        thinking: [
          `Nhận dạng $A^{2}-B^{2}$ với $A=${a}x+${b}$, $B=${a}x-${b}$ — dùng hiệu hai bình phương nhanh hơn khai triển.`,
        ],
        solution: [
          `$M=[(${a}x+${b})-(${a}x-${b})]\\cdot[(${a}x+${b})+(${a}x-${b})]$`,
          `$M=(${2 * b})\\cdot(${2 * a}x)=${k}x$.`,
        ],
        pitfall: 'Khai triển bung ra rồi trừ vẫn đúng nhưng dài gấp ba và dễ sai dấu.',
      };
    },
  },
  {
    id: 'g8.nhan-tu', topicId: 'g8-t1', grade: 8, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Phân tích đa thức thành nhân tử',
    build: (r) => {
      const p = r.int(1, 9), q = r.int(1, 9);
      // x^2 - (p+q)x + pq = (x-p)(x-q)
      const b = -(p + q), c = p * q;
      const correct = `(x-${p})(x-${q})`;
      const [options, answer] = mcOptions(r, correct, [
        `(x+${p})(x+${q})`, `(x-${p})(x+${q})`, `(x-${p + q})(x-1)`,
      ]);
      return {
        stem: `Phân tích đa thức $${poly([1, b, c])}$ thành nhân tử, ta được:`,
        options, answer,
        thinking: [
          'Ba hạng tử, hệ số bậc hai bằng 1 → tách hạng tử giữa.',
          `Tìm hai số có tích $${c}$ và tổng $${b}$: đó là $-${p}$ và $-${q}$.`,
        ],
        solution: [
          `$${poly([1, b, c])}=x^{2}-${p}x-${q}x+${c}$`,
          `$=x(x-${p})-${q}(x-${p})=(x-${p})(x-${q})$.`,
        ],
        pitfall: 'Kiểm tra lại bằng cách nhân ngược hai nhân tử.',
      };
    },
  },
  {
    id: 'g8.timx-nhantu', topicId: 'g8-t1', grade: 8, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm x bằng phân tích nhân tử',
    build: (r) => {
      const a = r.int(2, 9);
      const a2 = a * a;
      return {
        stem: `Tìm $x$, biết $x^{3}-${a2}x=0$. (Nếu có nhiều nghiệm, nhập cách nhau bởi dấu phẩy.)`,
        answer: `0,${a},-${a}`,
        accept: [`-${a},0,${a}`, `0,-${a},${a}`, `${a},-${a},0`],
        thinking: [
          'Tuyệt đối KHÔNG chia hai vế cho $x$ (sẽ mất nghiệm $x=0$).',
          'Phải đưa về dạng tích bằng 0.',
        ],
        solution: [
          `$x(x^{2}-${a2})=0$`,
          `$x(x-${a})(x+${a})=0$`,
          `$x=0$ hoặc $x=${a}$ hoặc $x=-${a}$.`,
          `Vậy $x\\in\\{0;${a};-${a}\\}$.`,
        ],
        pitfall: 'Chia hai vế cho biểu thức chứa ẩn là nguyên nhân mất nghiệm số 1.',
      };
    },
  },
  {
    id: 'g8.cuc-tri', topicId: 'g8-t1', grade: 8, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Cực trị bằng hoàn thành bình phương',
    build: (r) => {
      const m = r.int(1, 9), k = r.int(1, 12);
      // P = x^2 - 2mx + m^2 + k = (x-m)^2 + k  -> min = k tại x = m
      const b = -2 * m, c = m * m + k;
      return {
        stem: `Tìm giá trị nhỏ nhất của biểu thức $P=${poly([1, b, c])}$.`,
        answer: String(k),
        thinking: [
          'Hoàn thành bình phương: lấy nửa hệ số của $x$ rồi bình phương để bù trừ.',
          `Nửa hệ số của $x$ là $${-m}$, bình phương là $${m * m}$.`,
        ],
        solution: [
          `$P=x^{2}-${2 * m}x+${m * m}+${k}=(x-${m})^{2}+${k}$.`,
          `Vì $(x-${m})^{2}\\ge0$ với mọi $x$ nên $P\\ge${k}$.`,
          `Dấu “=” xảy ra khi $x-${m}=0\\Leftrightarrow x=${m}$.`,
          `Vậy $P_{\\min}=${k}$ khi $x=${m}$.`,
        ],
        pitfall: 'Phải nêu điều kiện dấu bằng, nếu không thì chưa kết luận được cực trị.',
      };
    },
  },
  {
    id: 'g8.phan-thuc-rutgon', topicId: 'g8-t2', grade: 8, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Rút gọn phân thức',
    build: (r) => {
      const a = r.int(2, 8);
      const a2 = a * a;
      const correct = `\\f{x-${a}}{x}`;
      const [options, answer] = mcOptions(r, correct, [`\\f{x+${a}}{x}`, `\\f{x-${a}}{x+${a}}`, `-${a}`]);
      return {
        stem: `Rút gọn phân thức $P=\\f{x^{2}-${a2}}{x^{2}+${a}x}$ (với $x\\ne0$, $x\\ne-${a}$).`,
        options, answer,
        thinking: ['Phân tích cả tử và mẫu thành nhân tử để lộ nhân tử chung.'],
        solution: [
          `Tử: $x^{2}-${a2}=(x-${a})(x+${a})$.`,
          `Mẫu: $x^{2}+${a}x=x(x+${a})$.`,
          `$P=\\f{(x-${a})(x+${a})}{x(x+${a})}=\\f{x-${a}}{x}$.`,
        ],
        pitfall: 'Chỉ được rút gọn theo THỪA SỐ chung, không rút theo số hạng.',
      };
    },
  },
  {
    id: 'g8.phan-thuc-tinh', topicId: 'g8-t2', grade: 8, level: 'VD', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Cộng, trừ phân thức',
    build: (r) => {
      const a = r.int(2, 7);
      const a2 = a * a;
      const correct = `\\f{2}{x+${a}}`;
      const [options, answer] = mcOptions(r, correct, [`\\f{2}{x-${a}}`, `\\f{2x}{x^{2}-${a2}}`, `\\f{4}{x+${a}}`]);
      return {
        stem: `Rút gọn $Q=\\f{1}{x-${a}}+\\f{1}{x+${a}}-\\f{${2 * a}\\cdot 2}{x^{2}-${a2}}\\cdot\\f{1}{${a}}\\cdot${a}\\cdot\\f{1}{2}$ (với $x\\ne\\pm${a}$).`,
        options, answer,
        thinking: [
          `Rút gọn hệ số của hạng tử thứ ba trước: $\\f{${4 * a}}{x^{2}-${a2}}\\cdot\\f{1}{2}=\\f{${2 * a}}{x^{2}-${a2}}$.`,
          `Mẫu chung là $x^{2}-${a2}=(x-${a})(x+${a})$.`,
        ],
        solution: [
          `Hạng tử thứ ba rút gọn thành $\\f{${2 * a}}{x^{2}-${a2}}$.`,
          `$Q=\\f{(x+${a})+(x-${a})-${2 * a}}{(x-${a})(x+${a})}=\\f{2x-${2 * a}}{(x-${a})(x+${a})}$`,
          `$=\\f{2(x-${a})}{(x-${a})(x+${a})}=\\f{2}{x+${a}}$.`,
        ],
      };
    },
  },
  {
    id: 'g8.phan-thuc-vdc', topicId: 'g8-t2', grade: 8, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm x nguyên để biểu thức nhận giá trị nguyên',
    build: (r) => {
      const k = r.pick([2, 3, 5, 6, 7]);
      const divs: number[] = [];
      for (let i = 1; i <= k; i++) if (k % i === 0) { divs.push(i, -i); }
      const xs = divs.map((d) => d).sort((a, b) => a - b);
      return {
        stem: `Cho $P=\\f{x-${k}}{x}$ với $x\\ne0$. Tìm tất cả các số nguyên $x$ để $P$ nhận giá trị nguyên. (Nhập các giá trị cách nhau bởi dấu phẩy.)`,
        answer: xs.join(','),
        accept: [xs.slice().reverse().join(',')],
        thinking: ['Tách phần nguyên để lộ điều kiện chia hết.'],
        solution: [
          `$P=\\f{x-${k}}{x}=1-\\f{${k}}{x}$.`,
          `$P\\in\\Z\\Leftrightarrow\\f{${k}}{x}\\in\\Z\\Leftrightarrow x$ là ước của $${k}$.`,
          `Ư$(${k})=\\{${xs.join(';')}\\}$ (đều thoả $x\\ne0$).`,
          `Vậy $x\\in\\{${xs.join(';')}\\}$.`,
        ],
        pitfall: 'Quên các ước âm là mất một nửa đáp số.',
      };
    },
  },
  {
    id: 'g8.pt-bac-nhat', topicId: 'g8-t3', grade: 8, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Giải phương trình đưa về bậc nhất',
    build: (r) => {
      const x = r.int(-6, 8) || 3;
      const a = r.int(2, 6), b = r.int(1, 9), c = r.int(2, 5), d = r.int(1, 9);
      // (a x + b)/3 - (c x + d)/4 = k  ->  k = (4(ax+b) - 3(cx+d))/12
      const num = 4 * (a * x + b) - 3 * (c * x + d);
      const [kn, kd] = reduce(num, 12);
      const kStr = kd === 1 ? String(kn) : `\\f{${kn}}{${kd}}`;
      return {
        stem: `Giải phương trình $\\f{${a}x${sgn(b)}}{3}-\\f{${c}x${sgn(d)}}{4}=${kStr}$.`,
        answer: String(x),
        thinking: ['Mẫu chung là 12 → nhân hai vế với 12 để khử mẫu, sau đó bỏ ngoặc và chuyển vế.'],
        solution: [
          `Nhân hai vế với 12: $4(${a}x${sgn(b)})-3(${c}x${sgn(d)})=${num}$.`,
          `$${4 * a}x${sgn(4 * b)}-${3 * c}x${sgn(-3 * d)}=${num}$`,
          `$${4 * a - 3 * c}x=${num - (4 * b - 3 * d)}$`,
          `$x=${x}$.`,
        ],
        pitfall: 'Nhân với mẫu chung mà quên nhân cả vế phải.',
      };
    },
  },
  {
    id: 'g8.lap-pt-chuyen-dong', topicId: 'g8-t3', grade: 8, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Lập phương trình — bài toán chuyển động',
    build: (r) => {
      const v1 = r.pick([40, 45, 50, 30]), v2 = v1 + r.pick([10, 15, 20]);
      const dtMin = r.pick([20, 30, 40, 45, 60]);
      const dt = dtMin / 60;
      // s/v1 - s/v2 = dt  ->  s = dt * v1*v2/(v2-v1)
      const s = (dt * v1 * v2) / (v2 - v1);
      return {
        stem: `Một ô tô đi từ A đến B với vận tốc $${v1}\\,km/h$, lúc về đi với vận tốc $${v2}\\,km/h$ nên thời gian về ít hơn thời gian đi $${dtMin}$ phút. Tính quãng đường AB (đơn vị: km).`,
        answer: String(Math.round(s * 100) / 100),
        thinking: [
          'Quãng đường là đại lượng chung của cả lượt đi và lượt về → chọn làm ẩn.',
          `Đổi $${dtMin}$ phút $=${Math.round(dt * 1000) / 1000}$ giờ.`,
        ],
        solution: [
          `Gọi quãng đường AB là $x$ (km, $x>0$).`,
          `Thời gian đi: $\\f{x}{${v1}}$ (giờ); thời gian về: $\\f{x}{${v2}}$ (giờ).`,
          `Theo đề: $\\f{x}{${v1}}-\\f{x}{${v2}}=${Math.round(dt * 1000) / 1000}$.`,
          `$x\\left(\\f{1}{${v1}}-\\f{1}{${v2}}\\right)=${Math.round(dt * 1000) / 1000}$, tức $x\\cdot\\f{${v2 - v1}}{${v1 * v2}}=${Math.round(dt * 1000) / 1000}$.`,
          `$x=${Math.round(s * 100) / 100}$ (km), thoả điều kiện $x>0$.`,
        ],
        pitfall: 'Quên đổi phút sang giờ.',
      };
    },
  },
  {
    id: 'g8.lap-pt-nang-suat', topicId: 'g8-t3', grade: 8, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Lập phương trình — bài toán năng suất',
    build: (r) => {
      const t1 = r.pick([10, 12, 15, 20, 8]);
      const t2 = r.pick([15, 20, 24, 30, 12]);
      const t = (t1 * t2) / (t1 + t2);
      const tRound = Math.round(t * 100) / 100;
      return {
        stem: `Hai người cùng làm chung một công việc thì sau $${tRound}$ giờ xong. Nếu người thứ nhất làm một mình thì mất $${t1}$ giờ. Hỏi người thứ hai làm một mình thì mất bao nhiêu giờ mới xong công việc?`,
        answer: String(t2),
        thinking: [
          'Không cộng được thời gian — phải cộng NĂNG SUẤT.',
          'Coi toàn bộ công việc là 1; năng suất mỗi giờ là $\\f{1}{\\text{thời gian}}$.',
        ],
        solution: [
          `Gọi thời gian người thứ hai làm một mình là $x$ (giờ, $x>0$).`,
          `Trong 1 giờ: người thứ nhất làm được $\\f{1}{${t1}}$ công việc, người thứ hai làm được $\\f{1}{x}$ công việc.`,
          `Làm chung trong 1 giờ được $\\f{1}{${tRound}}$ công việc, nên $\\f{1}{${t1}}+\\f{1}{x}=\\f{1}{${tRound}}$.`,
          `$\\f{1}{x}=\\f{1}{${tRound}}-\\f{1}{${t1}}=\\f{1}{${t2}}$.`,
          `$x=${t2}$ (thoả điều kiện $x>0$).`,
          `Vậy người thứ hai làm một mình mất **${t2} giờ**.`,
        ],
        pitfall: 'Cộng thời gian thay vì cộng năng suất là sai lầm chết người của dạng này.',
      };
    },
  },
  {
    id: 'g8.ham-so-bac-nhat', topicId: 'g8-t4', grade: 8, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Xác định hàm số bậc nhất qua hai điểm',
    build: (r) => {
      const a = r.int(-5, 5) || 2, b = r.int(-8, 8);
      const x1 = r.int(-4, 4), x2 = x1 + r.int(1, 5);
      const y1 = a * x1 + b, y2 = a * x2 + b;
      return {
        stem: `Xác định hàm số $y=ax+b$ biết đồ thị đi qua hai điểm $A(${x1};${y1})$ và $B(${x2};${y2})$. (Nhập theo dạng a,b.)`,
        answer: `${a},${b}`,
        thinking: ['Thay lần lượt toạ độ hai điểm vào công thức để lập hệ hai phương trình.'],
        solution: [
          `Thay $A$: $${x1}a+b=${y1}$. (1)`,
          `Thay $B$: $${x2}a+b=${y2}$. (2)`,
          `Lấy (2) trừ (1): $${x2 - x1}a=${y2 - y1}\\Rightarrow a=${a}$.`,
          `Thay vào (1): $b=${y1}-${x1}\\cdot${a}=${b}$.`,
          `Vậy $y=${a}x${sgn(b)}$.`,
        ],
      };
    },
  },
  {
    id: 'g8.do-thi', topicId: 'g8-t4', grade: 8, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Điều kiện hai đường thẳng song song',
    build: (r) => {
      const k = r.int(2, 8), c = r.int(1, 9), d = r.int(1, 9);
      const m = k + c;
      return {
        stem: `Tìm $m$ để đường thẳng $y=(m-${c})x+${d}$ song song với đường thẳng $y=${k}x-${d + 1}$.`,
        answer: String(m),
        thinking: ['Song song $\\Leftrightarrow$ hệ số góc bằng nhau VÀ tung độ gốc khác nhau.'],
        solution: [
          `Điều kiện hàm số bậc nhất: $m-${c}\\ne0\\Leftrightarrow m\\ne${c}$.`,
          `Song song: $m-${c}=${k}\\Rightarrow m=${m}$; đồng thời $${d}\\ne${-(d + 1)}$ (thoả).`,
          `Vậy $m=${m}$.`,
        ],
        pitfall: `Quên điều kiện tung độ gốc khác nhau, hoặc quên $a\\ne0$.`,
      };
    },
  },
  {
    id: 'g8.tu-giac', topicId: 'g8-t5', grade: 8, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Dấu hiệu nhận biết tứ giác đặc biệt',
    build: (r) => {
      const bank = [
        { q: 'Hình bình hành có hai đường chéo bằng nhau là hình gì?', a: 'Hình chữ nhật', w: ['Hình thoi', 'Hình vuông', 'Hình thang cân'] },
        { q: 'Hình bình hành có hai đường chéo vuông góc là hình gì?', a: 'Hình thoi', w: ['Hình chữ nhật', 'Hình vuông', 'Hình thang'] },
        { q: 'Hình chữ nhật có hai cạnh kề bằng nhau là hình gì?', a: 'Hình vuông', w: ['Hình thoi', 'Hình bình hành', 'Hình thang cân'] },
        { q: 'Tứ giác có hai đường chéo cắt nhau tại trung điểm mỗi đường là hình gì?', a: 'Hình bình hành', w: ['Hình thoi', 'Hình chữ nhật', 'Hình thang cân'] },
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q,
        options, answer,
        thinking: ['Đối chiếu với sơ đồ quan hệ: hình bình hành + 1 điều kiện = hình chữ nhật hoặc hình thoi.'],
        solution: [`Theo dấu hiệu nhận biết: **${it.a}**.`],
      };
    },
  },
  {
    id: 'g8.pythagore', topicId: 'g8-t7', grade: 8, level: 'TH', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Định lí Pythagore',
    build: (r) => {
      const trip = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [20, 21, 29]]);
      const k = r.int(1, 3);
      const [a, b, c] = trip.map((x) => x * k);
      const ask = r.pick(['leg', 'hyp'] as const);
      return {
        stem: ask === 'hyp'
          ? `Tam giác $ABC$ vuông tại $A$ có $AB=${a}\\,cm$, $AC=${b}\\,cm$. Tính độ dài cạnh $BC$ (đơn vị: cm).`
          : `Một chiếc thang dài $${c}\\,m$ dựa vào tường, chân thang cách chân tường $${a}\\,m$. Hỏi thang chạm tường ở độ cao bao nhiêu mét?`,
        answer: String(ask === 'hyp' ? c : b),
        thinking: ask === 'hyp'
          ? ['Cạnh huyền đối diện góc vuông, dùng $BC^{2}=AB^{2}+AC^{2}$.']
          : ['Thang là cạnh huyền; khoảng cách chân thang – chân tường và độ cao là hai cạnh góc vuông.'],
        solution: ask === 'hyp'
          ? [`$BC^{2}=AB^{2}+AC^{2}=${a}^{2}+${b}^{2}=${a * a}+${b * b}=${c * c}$.`, `$BC=${c}\\ (cm)$.`]
          : [`Gọi độ cao cần tìm là $h$ ($h>0$).`, `$h^{2}+${a}^{2}=${c}^{2}\\Rightarrow h^{2}=${c * c}-${a * a}=${b * b}$.`, `$h=${b}\\ (m)$.`],
        pitfall: 'Cạnh huyền luôn là cạnh LỚN NHẤT — nếu đặt nhầm sẽ ra căn của số âm.',
      };
    },
  },
  {
    id: 'g8.thales', topicId: 'g8-t6', grade: 8, level: 'TH', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Định lí Thalès — tính độ dài',
    build: (r) => {
      const am = r.int(2, 8), mb = r.int(2, 9), an = r.int(2, 10);
      const nc = (an * mb) / am;
      return {
        stem: `Tam giác $ABC$ có $MN\\para BC$ với $M\\in AB$, $N\\in AC$. Biết $AM=${am}$, $MB=${mb}$, $AN=${an}$. Tính $NC$.`,
        answer: String(Math.round(nc * 1000) / 1000),
        thinking: ['$MN\\para BC$ → áp dụng định lí Thalès, chú ý viết đúng thứ tự tương ứng.'],
        solution: [
          `Vì $MN\\para BC$ nên theo định lí Thalès: $\\f{AM}{MB}=\\f{AN}{NC}$.`,
          `$\\f{${am}}{${mb}}=\\f{${an}}{NC}\\Rightarrow NC=\\f{${an}\\cdot${mb}}{${am}}=${Math.round(nc * 1000) / 1000}$.`,
        ],
        pitfall: 'Viết lệch thứ tự tỉ số (ví dụ $\\f{AM}{AB}=\\f{AN}{NC}$) là sai ngay.',
      };
    },
  },
  {
    id: 'g8.dong-dang', topicId: 'g8-t6', grade: 8, level: 'VD', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Tỉ số đồng dạng và tỉ số diện tích',
    build: (r) => {
      const k1 = r.int(2, 5), k2 = k1 + r.int(1, 4);
      const s1 = k1 * k1, s2 = k2 * k2;
      const [rn, rd] = reduce(s1, s2);
      const correct = `\\f{${rn}}{${rd}}`;
      const [options, answer] = mcOptions(r, correct, [`\\f{${k1}}{${k2}}`, `\\f{${k2}}{${k1}}`, `\\f{${rd}}{${rn}}`]);
      return {
        stem: `Hai tam giác đồng dạng có tỉ số đồng dạng $k=\\f{${k1}}{${k2}}$. Tỉ số diện tích của chúng bằng:`,
        options, answer,
        thinking: ['Diện tích tỉ lệ với BÌNH PHƯƠNG của tỉ số đồng dạng.'],
        solution: [
          `$\\f{S_1}{S_2}=k^{2}=\\left(\\f{${k1}}{${k2}}\\right)^{2}=\\f{${s1}}{${s2}}=\\f{${rn}}{${rd}}$.`,
        ],
        pitfall: 'Dùng $k$ thay vì $k^{2}$ — lỗi rất phổ biến.',
      };
    },
  },
  {
    id: 'g8.dong-dang-vdc', topicId: 'g8-t6', grade: 8, level: 'VDC', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Ứng dụng đồng dạng — đo chiều cao gián tiếp',
    build: (r) => {
      const hp = r.pick([1.5, 1.6, 2, 1.2]);
      const sp = r.pick([0.9, 1, 1.2, 0.8]);
      const st = r.pick([6, 7.5, 9, 12]);
      const h = (hp * st) / sp;
      return {
        stem: `Một cái cây có bóng trên mặt đất dài $${st}\\,m$. Cùng thời điểm đó, một chiếc cọc cao $${hp}\\,m$ có bóng dài $${sp}\\,m$. Tính chiều cao của cây (đơn vị: m).`,
        answer: String(Math.round(h * 100) / 100),
        thinking: [
          'Tia nắng mặt trời coi như song song → hai tam giác vuông có cặp góc nhọn bằng nhau → đồng dạng (g.g).',
          'Từ đồng dạng suy ra tỉ lệ giữa chiều cao và bóng.',
        ],
        solution: [
          `Gọi chiều cao cây là $h$ (m, $h>0$).`,
          `Hai tam giác vuông (cây – bóng cây) và (cọc – bóng cọc) đồng dạng theo trường hợp g.g.`,
          `$\\f{h}{${st}}=\\f{${hp}}{${sp}}\\Rightarrow h=\\f{${hp}\\cdot${st}}{${sp}}=${Math.round(h * 100) / 100}$ (m).`,
        ],
      };
    },
  },
  {
    id: 'g8.hinh-chop', topicId: 'g8-t7', grade: 8, level: 'TH', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Hình chóp tứ giác đều',
    build: (r) => {
      const a = r.int(4, 12), h = r.int(3, 10);
      const V = (a * a * h) / 3;
      return {
        stem: `Một hình chóp tứ giác đều có cạnh đáy $${a}\\,cm$ và chiều cao $${h}\\,cm$. Tính thể tích hình chóp (đơn vị: cm³).`,
        answer: String(Math.round(V * 100) / 100),
        thinking: ['Đáy là hình vuông cạnh $a$; dùng $V=\\f{1}{3}S_{\\text{đáy}}\\cdot h$.'],
        solution: [
          `$S_{\\text{đáy}}=${a}^{2}=${a * a}\\ (cm^{2})$.`,
          `$V=\\f{1}{3}\\cdot${a * a}\\cdot${h}=${Math.round(V * 100) / 100}\\ (cm^{3})$.`,
        ],
        pitfall: 'Quên hệ số $\\f{1}{3}$ của hình chóp.',
      };
    },
  },
  {
    id: 'g8.hbh', topicId: 'g8-t5', grade: 8, level: 'VD', kind: 'TF',
    strand: 'HINH_HOC', tag: 'Chứng minh hình bình hành',
    build: (r) => {
      void r;
      return {
        stem: 'Cho tam giác $ABC$, $M$ là trung điểm $BC$. Trên tia đối của tia $MA$ lấy $D$ sao cho $MD=MA$. Xét tính đúng – sai:',
        options: [
          'Tứ giác $ABDC$ là hình bình hành',
          '$AB\\para CD$ và $AB=CD$',
          'Nếu $\\tri ABC$ vuông tại $A$ thì $ABDC$ là hình chữ nhật',
          'Nếu $\\tri ABC$ cân tại $A$ thì $ABDC$ là hình vuông',
        ],
        answer: [true, true, true, false],
        thinking: ['$M$ là trung điểm của cả hai đường chéo $AD$ và $BC$ → hình bình hành; sau đó “leo thang” thêm điều kiện.'],
        solution: [
          'Trong tứ giác $ABDC$, hai đường chéo $AD$ và $BC$ cắt nhau tại $M$ là trung điểm của mỗi đường → **hình bình hành**. (a đúng)',
          'Hình bình hành có các cạnh đối song song và bằng nhau → $AB\\para CD$, $AB=CD$. (b đúng)',
          'Hình bình hành có một góc vuông ($\\angle BAC=90\\deg$) → **hình chữ nhật**. (c đúng)',
          '$\\tri ABC$ cân tại $A$ chỉ cho $AB=AC$, tức hai cạnh **kề** của hình bình hành bằng nhau → hình thoi, chưa phải hình vuông. (d sai)',
        ],
      };
    },
  },
  {
    id: 'g8.hcn-hthoi-hvuong', topicId: 'g8-t5', grade: 8, level: 'VD', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Trung tuyến ứng với cạnh huyền',
    build: (r) => {
      const bc = r.int(6, 24) * 2;
      const am = bc / 2;
      const [options, answer] = mcOptions(r, String(am), distractInt(r, am, 3).map(String));
      return {
        stem: `Tam giác $ABC$ vuông tại $A$ có $BC=${bc}\\,cm$, $M$ là trung điểm của $BC$. Tính độ dài $AM$ (đơn vị: cm).`,
        options, answer,
        thinking: ['Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng NỬA cạnh huyền.'],
        solution: [`$AM=\\f{BC}{2}=\\f{${bc}}{2}=${am}\\ (cm)$.`],
      };
    },
  },
  {
    id: 'g8.thong-ke', topicId: 'g8-t8', grade: 8, level: 'NB', kind: 'SHORT',
    strand: 'THONG_KE_XS', tag: 'Xác suất lí thuyết',
    build: (r) => {
      const red = r.int(3, 9), blue = r.int(2, 8), yellow = r.int(1, 6);
      const total = red + blue + yellow;
      const [rn, rd] = reduce(blue + yellow, total);
      return {
        stem: `Một hộp có $${red}$ viên bi đỏ, $${blue}$ viên bi xanh và $${yellow}$ viên bi vàng. Lấy ngẫu nhiên một viên bi. Tính xác suất lấy được viên bi **không phải màu đỏ** (nhập dạng a/b tối giản).`,
        answer: rd === 1 ? String(rn) : `${rn}/${rd}`,
        thinking: ['Đếm tổng số bi và số bi không đỏ.'],
        solution: [
          `Tổng số bi: $${red}+${blue}+${yellow}=${total}$.`,
          `Số bi không đỏ: $${blue}+${yellow}=${blue + yellow}$.`,
          `$P=\\f{${blue + yellow}}{${total}}=\\f{${rn}}{${rd}}$.`,
        ],
      };
    },
  },
  {
    id: 'g8.xac-suat', topicId: 'g8-t8', grade: 8, level: 'TH', kind: 'SHORT',
    strand: 'THONG_KE_XS', tag: 'Ước lượng tần số theo xác suất',
    build: (r) => {
      const n = r.pick([200, 300, 500, 600, 1000]);
      const k = r.pick([2, 3, 4, 5, 6]);
      return {
        stem: `Gieo một con xúc xắc cân đối $${n}$ lần. Hãy ước lượng số lần xuất hiện mặt có số chấm chia hết cho $${k <= 6 ? k : 3}$.`,
        answer: String(Math.round((n * Math.floor(6 / (k <= 6 ? k : 3))) / 6)),
        thinking: [
          'Tính xác suất lí thuyết trước, sau đó nhân với số lần gieo.',
          'Số lần kỳ vọng $=n\\cdot P(A)$.',
        ],
        solution: [
          `Các mặt có số chấm chia hết cho $${k <= 6 ? k : 3}$: có $${Math.floor(6 / (k <= 6 ? k : 3))}$ mặt trong 6 mặt.`,
          `$P=\\f{${Math.floor(6 / (k <= 6 ? k : 3))}}{6}$.`,
          `Số lần ước lượng $=${n}\\cdot\\f{${Math.floor(6 / (k <= 6 ? k : 3))}}{6}=${Math.round((n * Math.floor(6 / (k <= 6 ? k : 3))) / 6)}$ (lần).`,
        ],
      };
    },
  },
  {
    id: 'g8.tu-luan-1', topicId: 'g8-t1', grade: 8, level: 'VD', kind: 'ESSAY',
    strand: 'SO_DAI_SO', tag: 'Tự luận — phân tích nhân tử và tìm x',
    build: (r) => {
      const a = r.int(2, 8), a2 = a * a;
      const p = r.int(1, 7), q = r.int(1, 7);
      return {
        stem: `a) Phân tích đa thức sau thành nhân tử: $A=x^{2}-2xy+y^{2}-${a2}$.\n\nb) Tìm $x$, biết $x^{2}-${p + q}x+${p * q}=0$.`,
        answer: '',
        rubric: [
          { criterion: `Nhóm đúng 3 hạng tử đầu thành $(x-y)^{2}$`, points: 1 },
          { criterion: `Đưa về hiệu hai bình phương và phân tích thành $(x-y-${a})(x-y+${a})$`, points: 1 },
          { criterion: `Ý b: phân tích được $(x-${p})(x-${q})=0$`, points: 1 },
          { criterion: `Kết luận đúng $x=${p}$ hoặc $x=${q}$`, points: 1 },
        ],
        thinking: [
          'Ý a: bốn hạng tử → nhóm 3–1 để tạo hằng đẳng thức, sau đó là hiệu hai bình phương.',
          'Ý b: tam thức bậc hai hệ số 1 → tách hạng tử giữa.',
        ],
        solution: [
          `a) $A=(x^{2}-2xy+y^{2})-${a2}=(x-y)^{2}-${a}^{2}=(x-y-${a})(x-y+${a})$.`,
          `b) $x^{2}-${p + q}x+${p * q}=x^{2}-${p}x-${q}x+${p * q}=x(x-${p})-${q}(x-${p})=(x-${p})(x-${q})$.`,
          `$(x-${p})(x-${q})=0\\Leftrightarrow x=${p}$ hoặc $x=${q}$.`,
        ],
      };
    },
  },
];
