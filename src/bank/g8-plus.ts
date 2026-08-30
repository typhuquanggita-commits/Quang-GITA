import type { Template } from '@/types';
import { distractInt, mcOptions, poly, reduce } from '@/lib/rng';

/* MATHGITA — NGÂN HÀNG KHỐI 8 (bổ sung): phủ kín ma trận đề ở mọi mức độ */

const sgn = (n: number) => (n < 0 ? `-${Math.abs(n)}` : `+${n}`);

export const BANK_G8_PLUS: Template[] = [
  /* ============================ NHẬN BIẾT ============================ */
  {
    id: 'g8.nb-hang-dang-thuc', topicId: 'g8-t1', grade: 8, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Nhận biết bảy hằng đẳng thức',
    build: (r) => {
      const bank = [
        { q: '$(A+B)^{2}$ bằng:', a: '$A^{2}+2AB+B^{2}$', w: ['$A^{2}+B^{2}$', '$A^{2}-2AB+B^{2}$', '$A^{2}+AB+B^{2}$'] },
        { q: '$A^{2}-B^{2}$ bằng:', a: '$(A-B)(A+B)$', w: ['$(A-B)^{2}$', '$(A+B)^{2}$', '$A^{2}+B^{2}$'] },
        { q: '$A^{3}-B^{3}$ bằng:', a: '$(A-B)(A^{2}+AB+B^{2})$', w: ['$(A-B)^{3}$', '$(A-B)(A^{2}-AB+B^{2})$', '$(A+B)(A^{2}-AB+B^{2})$'] },
        { q: '$A^{3}+B^{3}$ bằng:', a: '$(A+B)(A^{2}-AB+B^{2})$', w: ['$(A+B)^{3}$', '$(A+B)(A^{2}+AB+B^{2})$', '$(A-B)(A^{2}+AB+B^{2})$'] },
        { q: '$(A-B)^{3}$ bằng:', a: '$A^{3}-3A^{2}B+3AB^{2}-B^{3}$', w: ['$A^{3}-B^{3}$', '$A^{3}+3A^{2}B+3AB^{2}+B^{3}$', '$A^{3}-3AB+B^{3}$'] },
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q, options, answer,
        thinking: ['Bảy hằng đẳng thức phải thuộc theo cả hai chiều — đây là bộ công cụ dùng suốt THCS và THPT.'],
        solution: [`Đáp án đúng: ${it.a}.`],
        pitfall: 'Bình phương **thiếu** $A^{2}\\pm AB+B^{2}$ khác bình phương của một hiệu $A^{2}-2AB+B^{2}$.',
      };
    },
  },
  {
    id: 'g8.nb-khai-trien', topicId: 'g8-t1', grade: 8, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Khai triển hằng đẳng thức',
    build: (r) => {
      const a = r.int(1, 6), b = r.int(1, 9);
      const correct = `$${a * a === 1 ? '' : a * a}x^{2}${sgn(2 * a * b)}x+${b * b}$`;
      const [options, answer] = mcOptions(r, correct, [
        `$${a * a}x^{2}+${b * b}$`,
        `$${a * a}x^{2}${sgn(a * b)}x+${b * b}$`,
        `$${a * a}x^{2}${sgn(-2 * a * b)}x+${b * b}$`,
      ]);
      return {
        stem: `Khai triển $(${a === 1 ? '' : a}x+${b})^{2}$ ta được:`,
        options, answer,
        thinking: [`Áp dụng $(A+B)^{2}=A^{2}+2AB+B^{2}$ với $A=${a === 1 ? '' : a}x$, $B=${b}$.`],
        solution: [
          `$A^{2}=${a * a}x^{2}$ ; $2AB=2\\cdot${a}x\\cdot${b}=${2 * a * b}x$ ; $B^{2}=${b * b}$.`,
          `Vậy $(${a === 1 ? '' : a}x+${b})^{2}=${a * a}x^{2}+${2 * a * b}x+${b * b}$.`,
        ],
        pitfall: 'Quên hạng tử giữa $2AB$ là lỗi phổ biến nhất.',
      };
    },
  },
  {
    id: 'g8.nb-dkxd-phan-thuc', topicId: 'g8-t2', grade: 8, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Điều kiện xác định của phân thức',
    build: (r) => {
      const a = r.int(2, 9);
      const correct = `$x\\ne${a}$`;
      const [options, answer] = mcOptions(r, correct, [`$x\\ne-${a}$`, `$x\\ne0$`, `$x>${a}$`]);
      return {
        stem: `Phân thức $\\f{2x+1}{x-${a}}$ xác định khi và chỉ khi:`,
        options, answer,
        thinking: ['Phân thức xác định khi mẫu thức khác 0.'],
        solution: [`$x-${a}\\ne0\\Leftrightarrow x\\ne${a}$.`],
      };
    },
  },
  {
    id: 'g8.nb-pt-bac-nhat', topicId: 'g8-t3', grade: 8, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Nghiệm của phương trình bậc nhất',
    build: (r) => {
      const a = r.int(2, 9) * r.sign(), x = r.int(-8, 8);
      const b = -a * x;
      const [n, d] = reduce(-b, a);
      const correct = d === 1 ? `$${n}$` : `$\\f{${n}}{${d}}$`;
      const [options, answer] = mcOptions(r, correct, [`$${-x}$`, `$${a}$`, `$${b}$`]);
      return {
        stem: `Nghiệm của phương trình $${a}x${sgn(b)}=0$ là:`,
        options, answer,
        thinking: ['Chuyển vế rồi chia cho hệ số của $x$.'],
        solution: [`$${a}x=${-b}\\Rightarrow x=\\f{${-b}}{${a}}=${x}$.`],
      };
    },
  },
  {
    id: 'g8.nb-ham-so', topicId: 'g8-t4', grade: 8, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Tính chất hàm số bậc nhất',
    build: (r) => {
      const a = r.int(1, 9) * r.sign(), b = r.int(-9, 9);
      const ask = r.pick(['bien', 'tung'] as const);
      const correct = ask === 'bien'
        ? (a > 0 ? 'Đồng biến trên $\\R$' : 'Nghịch biến trên $\\R$')
        : `$(0;${b})$`;
      const wrong = ask === 'bien'
        ? [a > 0 ? 'Nghịch biến trên $\\R$' : 'Đồng biến trên $\\R$', 'Không đổi', 'Không xác định được']
        : [`$(${b};0)$`, `$(0;${a})$`, `$(${a};${b})$`];
      const [options, answer] = mcOptions(r, correct, wrong);
      return {
        stem: ask === 'bien'
          ? `Hàm số $y=${a}x${sgn(b)}$ là hàm số:`
          : `Đồ thị hàm số $y=${a}x${sgn(b)}$ cắt trục tung tại điểm:`,
        options, answer,
        thinking: ask === 'bien'
          ? ['Hệ số góc $a>0$ thì đồng biến (đồ thị đi lên); $a<0$ thì nghịch biến.']
          : ['Giao với trục tung là điểm có hoành độ bằng 0, tung độ bằng $b$.'],
        solution: ask === 'bien'
          ? [`Hệ số góc $a=${a}${a > 0 ? '>0' : '<0'}$ nên hàm số ${a > 0 ? 'đồng biến' : 'nghịch biến'} trên $\\R$.`]
          : [`Cho $x=0$: $y=${b}$. Vậy đồ thị cắt trục tung tại $(0;${b})$.`],
      };
    },
  },
  {
    id: 'g8.nb-pythagore-mc', topicId: 'g8-t7', grade: 8, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Nhận biết tam giác vuông (Pythagore đảo)',
    build: (r) => {
      const trip = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25]]);
      const ok = `$${trip[0]}\\,cm$; $${trip[1]}\\,cm$; $${trip[2]}\\,cm$`;
      const bad = [
        `$${trip[0]}\\,cm$; $${trip[1]}\\,cm$; $${trip[2] + 1}\\,cm$`,
        `$${trip[0] + 1}\\,cm$; $${trip[1]}\\,cm$; $${trip[2]}\\,cm$`,
        `$${trip[0]}\\,cm$; $${trip[1] + 2}\\,cm$; $${trip[2]}\\,cm$`,
      ];
      const [options, answer] = mcOptions(r, ok, bad);
      return {
        stem: 'Bộ ba độ dài nào sau đây là ba cạnh của một **tam giác vuông**?',
        options, answer,
        thinking: ['Dùng định lí Pythagore đảo: kiểm tra bình phương cạnh lớn nhất với tổng bình phương hai cạnh còn lại.'],
        solution: [
          `$${trip[0]}^{2}+${trip[1]}^{2}=${trip[0] ** 2}+${trip[1] ** 2}=${trip[2] ** 2}=${trip[2]}^{2}$.`,
          'Vậy bộ ba này là ba cạnh của một tam giác vuông.',
        ],
      };
    },
  },
  {
    id: 'g8.nb-duong-trung-binh', topicId: 'g8-t6', grade: 8, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Đường trung bình của tam giác',
    build: (r) => {
      const bc = r.int(4, 30) * 2;
      const [options, answer] = mcOptions(r, `$${bc / 2}\\,cm$`, distractInt(r, bc / 2, 4).map((x) => `$${x}\\,cm$`));
      return {
        stem: `Tam giác $ABC$ có $M$, $N$ lần lượt là trung điểm của $AB$, $AC$ và $BC=${bc}\\,cm$. Độ dài $MN$ bằng:`,
        options, answer,
        thinking: ['Đường trung bình song song với cạnh thứ ba và bằng NỬA cạnh ấy.'],
        solution: [`$MN=\\f{BC}{2}=\\f{${bc}}{2}=${bc / 2}\\ (cm)$.`],
      };
    },
  },

  /* ============================ THÔNG HIỂU ============================ */
  {
    id: 'g8.th-nhan-tu-nhom', topicId: 'g8-t1', grade: 8, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Phân tích nhân tử bằng nhóm hạng tử',
    build: (r) => {
      const a = r.int(2, 7), b = r.int(2, 8);
      // x^2 + ax + bx + ab = (x+a)(x+b)
      const correct = `$(x+${a})(x+${b})$`;
      const [options, answer] = mcOptions(r, correct, [
        `$(x-${a})(x-${b})$`, `$(x+${a})(x-${b})$`, `$(x+${a + b})(x+1)$`,
      ]);
      return {
        stem: `Phân tích $x^{2}+${a}x+${b}x+${a * b}$ thành nhân tử ta được:`,
        options, answer,
        thinking: ['Bốn hạng tử → nhóm 2–2, sau đó đặt nhân tử chung.'],
        solution: [
          `$x^{2}+${a}x+${b}x+${a * b}=(x^{2}+${a}x)+(${b}x+${a * b})$`,
          `$=x(x+${a})+${b}(x+${a})=(x+${a})(x+${b})$.`,
        ],
      };
    },
  },
  {
    id: 'g8.th-rut-gon-phan-thuc-2', topicId: 'g8-t2', grade: 8, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tính giá trị phân thức sau khi rút gọn',
    build: (r) => {
      const a = r.int(2, 8);
      const x = r.int(2, 12);
      if (x === a || x === -a || x === 0) return {
        stem: `Cho $P=\\f{x^{2}-4}{x^{2}+2x}$. Tính giá trị của $P$ tại $x=3$.`,
        answer: '1/3',
        solution: ['$P=\\f{(x-2)(x+2)}{x(x+2)}=\\f{x-2}{x}$.', 'Tại $x=3$: $P=\\f{1}{3}$.'],
      };
      const [n, d] = reduce(x - a, x);
      return {
        stem: `Cho $P=\\f{x^{2}-${a * a}}{x^{2}+${a}x}$ (với $x\\ne0$, $x\\ne-${a}$). Tính giá trị của $P$ tại $x=${x}$ (nhập dạng a/b tối giản).`,
        answer: d === 1 ? String(n) : `${n}/${d}`,
        thinking: ['Rút gọn trước rồi mới thay số — nhanh hơn và tránh số lớn.'],
        solution: [
          `$P=\\f{(x-${a})(x+${a})}{x(x+${a})}=\\f{x-${a}}{x}$.`,
          `Tại $x=${x}$: $P=\\f{${x}-${a}}{${x}}=\\f{${x - a}}{${x}}=\\f{${n}}{${d}}$.`,
        ],
        pitfall: 'Thay số vào biểu thức chưa rút gọn sẽ ra số rất lớn và dễ sai.',
      };
    },
  },
  {
    id: 'g8.th-pt-tich', topicId: 'g8-t3', grade: 8, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Phương trình tích',
    build: (r) => {
      const a = r.int(1, 9), b = r.int(1, 9);
      const roots = Array.from(new Set([a, -b])).sort((p, q) => p - q);
      return {
        stem: `Giải phương trình $(x-${a})(x+${b})=0$. (Nếu có nhiều nghiệm, nhập cách nhau bởi dấu phẩy.)`,
        answer: roots.join(','),
        accept: [roots.slice().reverse().join(',')],
        thinking: ['Tích bằng 0 khi và chỉ khi ít nhất một thừa số bằng 0.'],
        solution: [
          `$(x-${a})(x+${b})=0\\Leftrightarrow x-${a}=0$ hoặc $x+${b}=0$.`,
          `$x=${a}$ hoặc $x=${-b}$.`,
        ],
      };
    },
  },
  {
    id: 'g8.th-do-thi-diem', topicId: 'g8-t4', grade: 8, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Điểm thuộc đồ thị hàm số bậc nhất',
    build: (r) => {
      const a = r.int(1, 5) * r.sign(), b = r.int(-8, 8);
      const x = r.int(-4, 4);
      const y = a * x + b;
      const [options, answer] = mcOptions(r, `$(${x};${y})$`, [`$(${x};${y + 1})$`, `$(${y};${x})$`, `$(${x};${-y})$`]);
      return {
        stem: `Điểm nào sau đây **thuộc** đồ thị hàm số $y=${a}x${sgn(b)}$?`,
        options, answer,
        thinking: ['Điểm $(x_0;y_0)$ thuộc đồ thị khi thay vào công thức được đẳng thức đúng.'],
        solution: [`Thay $x=${x}$: $y=${a}\\cdot(${x})${sgn(b)}=${y}$. Vậy điểm $(${x};${y})$ thuộc đồ thị.`],
      };
    },
  },
  {
    id: 'g8.th-tf-hang-dang-thuc', topicId: 'g8-t1', grade: 8, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — hằng đẳng thức và nhân tử',
    build: (r) => {
      const a = r.int(2, 8);
      return {
        stem: 'Xét tính đúng – sai của mỗi khẳng định sau:',
        options: [
          `$x^{2}-${a * a}=(x-${a})(x+${a})$`,
          `$x^{2}+${a * a}=(x+${a})^{2}$`,
          `$x^{2}+${2 * a}x+${a * a}=(x+${a})^{2}$`,
          `$x^{2}+${a * a}$ phân tích được thành nhân tử trên tập số thực`,
        ],
        answer: [true, false, true, false],
        thinking: ['Nhớ rõ: hiệu hai bình phương phân tích được, TỔNG hai bình phương thì không.'],
        solution: [
          'a) Đúng — hiệu hai bình phương.',
          `b) Sai — $(x+${a})^{2}=x^{2}+${2 * a}x+${a * a}$, có thêm hạng tử giữa.`,
          'c) Đúng — bình phương của một tổng.',
          'd) Sai — tổng hai bình phương không phân tích được thành nhân tử trên $\\R$.',
        ],
      };
    },
  },
  {
    id: 'g8.th-tf-tu-giac', topicId: 'g8-t5', grade: 8, level: 'TH', kind: 'TF',
    strand: 'HINH_HOC', tag: 'Đúng/Sai — tứ giác đặc biệt',
    build: (r) => {
      void r;
      return {
        stem: 'Xét tính đúng – sai của mỗi khẳng định về tứ giác:',
        options: [
          'Hình vuông vừa là hình chữ nhật vừa là hình thoi',
          'Hình thoi có hai đường chéo bằng nhau',
          'Hình bình hành có một góc vuông là hình chữ nhật',
          'Hình chữ nhật có hai đường chéo bằng nhau và cắt nhau tại trung điểm mỗi đường',
        ],
        answer: [true, false, true, true],
        thinking: ['Dựa vào sơ đồ quan hệ giữa các tứ giác đặc biệt.'],
        solution: [
          'a) Đúng — hình vuông thoả mọi tính chất của cả hình chữ nhật lẫn hình thoi.',
          'b) Sai — hình thoi có hai đường chéo **vuông góc**; bằng nhau chỉ khi nó là hình vuông.',
          'c) Đúng — đây là một dấu hiệu nhận biết hình chữ nhật.',
          'd) Đúng — tính chất của hình chữ nhật.',
        ],
      };
    },
  },
  {
    id: 'g8.th-phan-giac', topicId: 'g8-t6', grade: 8, level: 'TH', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Tính chất đường phân giác trong tam giác',
    build: (r) => {
      const ab = r.int(3, 12), ac = r.int(3, 14);
      const bc = r.int(Math.abs(ab - ac) + 2, ab + ac - 1);
      const db = (bc * ab) / (ab + ac);
      return {
        stem: `Tam giác $ABC$ có $AB=${ab}$, $AC=${ac}$, $BC=${bc}$. $AD$ là đường phân giác trong ($D\\in BC$). Tính $DB$ (làm tròn 2 chữ số thập phân).`,
        answer: String(Math.round(db * 100) / 100),
        thinking: [
          'Tính chất đường phân giác: $\\f{DB}{DC}=\\f{AB}{AC}$.',
          'Kết hợp với $DB+DC=BC$ để tìm từng đoạn.',
        ],
        solution: [
          `$\\f{DB}{DC}=\\f{AB}{AC}=\\f{${ab}}{${ac}}$.`,
          `Áp dụng tính chất dãy tỉ số bằng nhau: $\\f{DB}{${ab}}=\\f{DC}{${ac}}=\\f{DB+DC}{${ab}+${ac}}=\\f{${bc}}{${ab + ac}}$.`,
          `$DB=${ab}\\cdot\\f{${bc}}{${ab + ac}}=${Math.round(db * 100) / 100}$.`,
        ],
      };
    },
  },

  /* ============================ VẬN DỤNG ============================ */
  {
    id: 'g8.vd-tinh-nhanh-hdt', topicId: 'g8-t1', grade: 8, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tính nhanh giá trị biểu thức nhờ hằng đẳng thức',
    build: (r) => {
      const n = r.pick([101, 99, 102, 98, 201, 199]);
      const base = Math.round(n / 100) * 100;
      const d = n - base;
      const v = n * n;
      return {
        stem: `Tính nhanh giá trị của $${n}^{2}$ bằng cách dùng hằng đẳng thức.`,
        answer: String(v),
        thinking: [
          `Viết $${n}=${base}${d >= 0 ? '+' : '-'}${Math.abs(d)}$ để đưa về bình phương của một ${d >= 0 ? 'tổng' : 'hiệu'} với số tròn trăm.`,
        ],
        solution: [
          `$${n}^{2}=(${base}${d >= 0 ? '+' : '-'}${Math.abs(d)})^{2}=${base}^{2}${d >= 0 ? '+' : '-'}2\\cdot${base}\\cdot${Math.abs(d)}+${d * d}$`,
          `$=${base * base}${d >= 0 ? '+' : '-'}${2 * base * Math.abs(d)}+${d * d}=${v}$.`,
        ],
      };
    },
  },
  {
    id: 'g8.vd-lap-pt-so', topicId: 'g8-t3', grade: 8, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Lập phương trình — bài toán số có hai chữ số',
    build: (r) => {
      const a = r.int(1, 8), b = a + r.int(1, 9 - a);
      const num = 10 * a + b;
      const sum = a + b;
      const rev = 10 * b + a;
      const diff = rev - num;
      return {
        stem: `Một số có hai chữ số, tổng hai chữ số bằng $${sum}$. Nếu đổi chỗ hai chữ số thì được số mới lớn hơn số ban đầu $${diff}$ đơn vị. Tìm số ban đầu.`,
        answer: String(num),
        thinking: [
          'Đặt số có hai chữ số là $\\ov{ab}=10a+b$ với $1\\le a\\le9$, $0\\le b\\le9$.',
          'Số đổi chỗ là $\\ov{ba}=10b+a$.',
        ],
        solution: [
          `Gọi chữ số hàng chục là $a$, hàng đơn vị là $b$ ($a,b\\in\\N$; $1\\le a\\le9$; $0\\le b\\le9$).`,
          `Số ban đầu: $10a+b$; số sau khi đổi chỗ: $10b+a$.`,
          `Theo đề: $a+b=${sum}$ (1) và $(10b+a)-(10a+b)=${diff}$, tức $9(b-a)=${diff}\\Rightarrow b-a=${(rev - num) / 9}$ (2).`,
          `Từ (1) và (2): $b=${b}$, $a=${a}$ (thoả điều kiện).`,
          `Vậy số cần tìm là **${num}**.`,
        ],
      };
    },
  },
  {
    id: 'g8.vd-thales-tinh', topicId: 'g8-t6', grade: 8, level: 'VD', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Hệ quả định lí Thalès — tính độ dài đoạn song song',
    build: (r) => {
      const am = r.int(2, 8), ab = am + r.int(2, 9);
      const bc = r.int(6, 24);
      const mn = (am * bc) / ab;
      return {
        stem: `Tam giác $ABC$ có $MN\\para BC$ ($M\\in AB$, $N\\in AC$). Biết $AM=${am}$, $AB=${ab}$, $BC=${bc}$. Tính $MN$ (làm tròn 2 chữ số thập phân).`,
        answer: String(Math.round(mn * 100) / 100),
        thinking: ['$MN\\para BC$ → dùng **hệ quả** định lí Thalès: $\\f{AM}{AB}=\\f{MN}{BC}$.'],
        solution: [
          `Vì $MN\\para BC$ nên theo hệ quả định lí Thalès: $\\f{AM}{AB}=\\f{AN}{AC}=\\f{MN}{BC}$.`,
          `$\\f{${am}}{${ab}}=\\f{MN}{${bc}}\\Rightarrow MN=\\f{${am}\\cdot${bc}}{${ab}}=${Math.round(mn * 100) / 100}$.`,
        ],
        pitfall: 'Phân biệt định lí Thalès ($\\f{AM}{MB}$) với hệ quả ($\\f{AM}{AB}$) — dùng nhầm là sai kết quả.',
      };
    },
  },

  /* ========================== VẬN DỤNG CAO ========================== */
  {
    id: 'g8.vdc-cuc-tri-2', topicId: 'g8-t1', grade: 8, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Giá trị lớn nhất của tam thức bậc hai',
    build: (r) => {
      const m = r.int(1, 8), k = r.int(1, 15);
      // P = -x^2 + 2mx + (k - m^2) = -(x-m)^2 + k  -> max = k tại x = m
      const b = 2 * m, c = k - m * m;
      return {
        stem: `Tìm giá trị lớn nhất của biểu thức $P=${poly([-1, b, c])}$.`,
        answer: String(k),
        thinking: [
          'Hệ số của $x^{2}$ âm → biểu thức có giá trị lớn nhất.',
          'Đặt dấu trừ ra ngoài rồi hoàn thành bình phương.',
        ],
        solution: [
          `$P=-(x^{2}-${b}x)${c >= 0 ? '+' : '-'}${Math.abs(c)}=-(x^{2}-${b}x+${m * m})+${m * m}${c >= 0 ? '+' : '-'}${Math.abs(c)}$`,
          `$P=-(x-${m})^{2}+${k}$.`,
          `Vì $(x-${m})^{2}\\ge0$ nên $-(x-${m})^{2}\\le0$, do đó $P\\le${k}$.`,
          `Dấu “=” xảy ra khi $x=${m}$. Vậy $P_{\\max}=${k}$ khi $x=${m}$.`,
        ],
        pitfall: 'Quên đổi dấu khi đặt dấu trừ ra ngoài ngoặc.',
      };
    },
  },
  {
    id: 'g8.vdc-chia-het', topicId: 'g8-t1', grade: 8, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Chứng minh chia hết bằng phân tích nhân tử',
    build: (r) => {
      const n = r.int(3, 20);
      const v = n * n * n - n;
      return {
        stem: `Cho biểu thức $A=n^{3}-n$ với $n$ nguyên. Tính giá trị của $A$ tại $n=${n}$ và cho biết $A$ chia hết cho số nào lớn nhất trong các số 2, 3, 6 (nhập giá trị của $A$).`,
        answer: String(v),
        thinking: [
          '$n^{3}-n=(n-1)n(n+1)$ là tích ba số nguyên liên tiếp.',
          'Trong ba số nguyên liên tiếp luôn có một bội của 2 và một bội của 3 → tích chia hết cho 6.',
        ],
        solution: [
          `$A=n^{3}-n=n(n^{2}-1)=(n-1)n(n+1)$.`,
          `Tại $n=${n}$: $A=${n - 1}\\cdot${n}\\cdot${n + 1}=${v}$.`,
          `Vì $(n-1)n(n+1)$ là tích ba số nguyên liên tiếp nên luôn chia hết cho $2$ và $3$, do đó chia hết cho $6$.`,
          `Kiểm tra: $${v}:6=${v / 6}$ ✓`,
        ],
      };
    },
  },
  {
    id: 'g8.vdc-phan-thuc-tong', topicId: 'g8-t2', grade: 8, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tổng phân thức có quy luật (sai phân)',
    build: (r) => {
      const a = r.int(1, 4), b = r.int(15, 40);
      const num = (b + 1) - a, den = a * (b + 1);
      const [n, d] = reduce(num, den);
      return {
        stem: `Tính tổng $S=\\f{1}{${a}\\cdot${a + 1}}+\\f{1}{${a + 1}\\cdot${a + 2}}+\\dots+\\f{1}{${b}\\cdot${b + 1}}$ (nhập dạng a/b tối giản).`,
        answer: d === 1 ? String(n) : `${n}/${d}`,
        thinking: ['Dùng $\\f{1}{n(n+1)}=\\f{1}{n}-\\f{1}{n+1}$ để các số hạng giữa triệt tiêu.'],
        solution: [
          `$S=\\left(\\f{1}{${a}}-\\f{1}{${a + 1}}\\right)+\\dots+\\left(\\f{1}{${b}}-\\f{1}{${b + 1}}\\right)=\\f{1}{${a}}-\\f{1}{${b + 1}}$.`,
          `$S=\\f{${b + 1}-${a}}{${den}}=\\f{${n}}{${d}}$.`,
        ],
      };
    },
  },

  /* ============================= TỰ LUẬN ============================= */
  {
    id: 'g8.tl-phan-thuc', topicId: 'g8-t2', grade: 8, level: 'VD', kind: 'ESSAY',
    strand: 'SO_DAI_SO', tag: 'Tự luận — rút gọn phân thức và bài toán phụ',
    build: (r) => {
      const a = r.int(2, 7);
      const x = r.int(2, 9);
      return {
        stem: `Cho biểu thức $P=\\f{1}{x-${a}}+\\f{1}{x+${a}}-\\f{2x}{x^{2}-${a * a}}$.\n\na) Tìm điều kiện xác định của $P$.\n\nb) Rút gọn $P$.\n\nc) Tính giá trị của $P$ tại $x=${x}$ (nếu xác định).`,
        answer: '',
        rubric: [
          { criterion: `Câu a: điều kiện $x\\ne${a}$ và $x\\ne-${a}$`, points: 1 },
          { criterion: `Câu b: phân tích $x^{2}-${a * a}=(x-${a})(x+${a})$ và tìm đúng mẫu chung`, points: 1 },
          { criterion: 'Câu b: quy đồng và thu gọn tử đúng dấu', points: 1 },
          { criterion: 'Câu b: kết luận $P=0$', points: 0.5 },
          { criterion: 'Câu c: đối chiếu điều kiện và kết luận', points: 0.5 },
        ],
        thinking: [
          'Luôn viết điều kiện xác định TRƯỚC khi rút gọn.',
          'Phân tích mẫu thành nhân tử để nhìn ra mẫu chung.',
        ],
        solution: [
          `a) $P$ xác định khi $x-${a}\\ne0$ và $x+${a}\\ne0$, tức $x\\ne${a}$ và $x\\ne-${a}$.`,
          `b) $x^{2}-${a * a}=(x-${a})(x+${a})$ nên mẫu chung là $(x-${a})(x+${a})$.`,
          `$P=\\f{(x+${a})+(x-${a})-2x}{(x-${a})(x+${a})}=\\f{2x-2x}{(x-${a})(x+${a})}=0$.`,
          `Vậy $P=0$ với mọi $x$ thoả điều kiện xác định.`,
          `c) Tại $x=${x}$ (thoả điều kiện), $P=0$.`,
        ],
      };
    },
  },
  {
    id: 'g8.tl-hinh-tu-giac', topicId: 'g8-t5', grade: 8, level: 'VDC', kind: 'ESSAY',
    strand: 'HINH_HOC', tag: 'Tự luận hình học — tứ giác đặc biệt',
    build: (r) => {
      void r;
      return {
        stem: 'Cho tam giác $ABC$ vuông tại $A$ ($AB<AC$), $M$ là trung điểm của $BC$. Gọi $D$, $E$ lần lượt là hình chiếu vuông góc của $M$ trên $AB$, $AC$.\n\na) Chứng minh tứ giác $ADME$ là hình chữ nhật.\n\nb) Chứng minh $D$ là trung điểm của $AB$ và $E$ là trung điểm của $AC$.\n\nc) Gọi $N$ là điểm đối xứng với $M$ qua $E$. Chứng minh tứ giác $AMCN$ là hình thoi.\n\nd) Tam giác $ABC$ cần thêm điều kiện gì để $AMCN$ là hình vuông?',
        answer: '',
        rubric: [
          { criterion: 'Vẽ hình đúng, ghi giả thiết – kết luận', points: 0.5 },
          { criterion: 'Câu a: chỉ ra ba góc vuông và kết luận hình chữ nhật', points: 1 },
          { criterion: 'Câu b: dùng $MD\\para AC$, $M$ là trung điểm $BC$ ⟹ $D$ là trung điểm $AB$ (đường trung bình)', points: 1 },
          { criterion: 'Câu c: chứng minh $AMCN$ là hình bình hành (hai đường chéo cắt nhau tại trung điểm)', points: 1 },
          { criterion: 'Câu c: thêm $MN\\perp AC$ ⟹ hình thoi', points: 0.5 },
          { criterion: 'Câu d: điều kiện $AB=AC$ (tam giác vuông cân tại $A$)', points: 1 },
        ],
        thinking: [
          'Ý a: “ba góc vuông” là dấu hiệu ngắn nhất cho hình chữ nhật.',
          'Ý b: $MD\\perp AB$ và $AC\\perp AB$ nên $MD\\para AC$; kết hợp $M$ là trung điểm $BC$ → đường trung bình.',
          'Ý c: đối xứng qua $E$ cho $E$ là trung điểm $MN$; mà $E$ cũng là trung điểm $AC$ → hai đường chéo cắt nhau tại trung điểm.',
          'Ý d: hình thoi thành hình vuông khi có thêm một góc vuông hoặc hai đường chéo bằng nhau.',
        ],
        solution: [
          'a) Xét tứ giác $ADME$: $\\angle DAE=90\\deg$ (vì $\\tri ABC$ vuông tại $A$); $\\angle ADM=90\\deg$ ($MD\\perp AB$); $\\angle AEM=90\\deg$ ($ME\\perp AC$).',
          'Tứ giác có ba góc vuông nên $ADME$ là hình chữ nhật.',
          'b) Vì $MD\\perp AB$ và $AC\\perp AB$ nên $MD\\para AC$. Trong tam giác $ABC$, $M$ là trung điểm $BC$ và $MD\\para AC$ nên $D$ là trung điểm $AB$.',
          'Tương tự, $ME\\para AB$ và $M$ là trung điểm $BC$ nên $E$ là trung điểm $AC$.',
          'c) Vì $N$ đối xứng với $M$ qua $E$ nên $E$ là trung điểm $MN$. Mà $E$ cũng là trung điểm $AC$.',
          'Tứ giác $AMCN$ có hai đường chéo $AC$ và $MN$ cắt nhau tại trung điểm $E$ của mỗi đường nên là hình bình hành.',
          'Lại có $MN\\perp AC$ (vì $ME\\perp AC$), tức hai đường chéo vuông góc, nên $AMCN$ là **hình thoi**.',
          'd) Hình thoi $AMCN$ là hình vuông khi có thêm một góc vuông, tức $\\angle AMC=90\\deg$, hay $AM\\perp BC$.',
          'Mà $AM$ là trung tuyến ứng với cạnh huyền; $AM\\perp BC$ khi và chỉ khi $AM$ đồng thời là đường cao, tức tam giác $ABC$ **vuông cân tại $A$** ($AB=AC$).',
        ],
      };
    },
  },
];
