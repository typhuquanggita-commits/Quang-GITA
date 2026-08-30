import type { Template } from '@/types';
import { distractInt, frac, mcOptions, reduce } from '@/lib/rng';

/* MATHGITA — NGÂN HÀNG KHỐI 7 (bổ sung): phủ kín ma trận đề ở mọi mức độ */

export const BANK_G7_PLUS: Template[] = [
  /* ============================ NHẬN BIẾT ============================ */
  {
    id: 'g7.nb-tap-hop-so', topicId: 'g7-t1', grade: 7, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Nhận biết tập hợp số',
    build: (r) => {
      const bank = [
        { q: 'Số nào sau đây là **số vô tỉ**?', a: '$\\s{2}$', w: ['$\\f{1}{3}$', '$-5$', '$0{,}25$'] },
        { q: 'Số nào sau đây **không** là số hữu tỉ?', a: '$\\pi$', w: ['$\\f{7}{2}$', '$-3$', '$1{,}5$'] },
        { q: 'Khẳng định nào sau đây **đúng**?', a: '$\\N\\subset\\Z\\subset\\Q\\subset\\R$', w: ['$\\R\\subset\\Q$', '$\\Q\\subset\\Z$', '$\\Z\\subset\\N$'] },
        { q: 'Căn bậc hai số học của $16$ là:', a: '$4$', w: ['$-4$', '$\\pm4$', '$8$'] },
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q, options, answer,
        thinking: ['Số hữu tỉ viết được dưới dạng $\\f{a}{b}$; số vô tỉ là số thập phân vô hạn không tuần hoàn.'],
        solution: [`Đáp án đúng: ${it.a}.`],
        pitfall: 'Căn bậc hai **số học** chỉ lấy giá trị không âm.',
      };
    },
  },
  {
    id: 'g7.nb-luy-thua-mc', topicId: 'g7-t1', grade: 7, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Quy tắc lũy thừa',
    build: (r) => {
      const bank = [
        { q: '$x^{m}\\cdot x^{n}$ bằng:', a: '$x^{m+n}$', w: ['$x^{mn}$', '$x^{m-n}$', '$2x^{m+n}$'] },
        { q: '$(x^{m})^{n}$ bằng:', a: '$x^{mn}$', w: ['$x^{m+n}$', '$x^{m-n}$', '$(2x)^{mn}$'] },
        { q: '$(xy)^{n}$ bằng:', a: '$x^{n}y^{n}$', w: ['$x^{n}+y^{n}$', '$(xy)^{2n}$', '$xy^{n}$'] },
        { q: 'Với $x\\ne0$, $x^{0}$ bằng:', a: '$1$', w: ['$0$', '$x$', 'không xác định'] },
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q, options, answer,
        thinking: ['Nhân cùng cơ số thì CỘNG số mũ; lũy thừa của lũy thừa thì NHÂN số mũ.'],
        solution: [`Đáp án đúng: ${it.a}.`],
      };
    },
  },
  {
    id: 'g7.nb-goc-doi-dinh', topicId: 'g7-t4', grade: 7, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Góc đối đỉnh — góc kề bù',
    build: (r) => {
      const a = r.int(20, 160);
      const ask = r.pick(['doi', 'bu'] as const);
      const v = ask === 'doi' ? a : 180 - a;
      const [options, answer] = mcOptions(r, `$${v}\\deg$`, distractInt(r, v, 10).map((x) => `$${x}\\deg$`));
      return {
        stem: ask === 'doi'
          ? `Hai đường thẳng cắt nhau tạo thành một góc có số đo $${a}\\deg$. Góc đối đỉnh với nó có số đo là:`
          : `Hai góc kề bù, một góc có số đo $${a}\\deg$. Góc còn lại có số đo là:`,
        options, answer,
        thinking: ask === 'doi' ? ['Hai góc đối đỉnh thì bằng nhau.'] : ['Hai góc kề bù có tổng bằng $180\\deg$.'],
        solution: ask === 'doi'
          ? [`Hai góc đối đỉnh bằng nhau nên góc cần tìm bằng $${a}\\deg$.`]
          : [`Góc cần tìm $=180\\deg-${a}\\deg=${180 - a}\\deg$.`],
      };
    },
  },
  {
    id: 'g7.nb-tam-giac-nb', topicId: 'g7-t5', grade: 7, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Tính góc còn lại của tam giác',
    build: (r) => {
      const A = r.int(30, 100), B = r.int(25, 175 - A);
      const C = 180 - A - B;
      const [options, answer] = mcOptions(r, `$${C}\\deg$`, distractInt(r, C, 15).map((x) => `$${x}\\deg$`));
      return {
        stem: `Tam giác $ABC$ có $\\angle A=${A}\\deg$, $\\angle B=${B}\\deg$. Số đo $\\angle C$ bằng:`,
        options, answer,
        thinking: ['Tổng ba góc trong một tam giác bằng $180\\deg$.'],
        solution: [`$\\angle C=180\\deg-${A}\\deg-${B}\\deg=${C}\\deg$.`],
      };
    },
  },
  {
    id: 'g7.nb-dong-quy', topicId: 'g7-t5', grade: 7, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Các đường đồng quy trong tam giác',
    build: (r) => {
      const bank = [
        { q: 'Ba đường trung tuyến của tam giác đồng quy tại:', a: 'Trọng tâm', w: ['Trực tâm', 'Tâm đường tròn nội tiếp', 'Tâm đường tròn ngoại tiếp'] },
        { q: 'Ba đường cao của tam giác đồng quy tại:', a: 'Trực tâm', w: ['Trọng tâm', 'Tâm đường tròn nội tiếp', 'Tâm đường tròn ngoại tiếp'] },
        { q: 'Ba đường phân giác trong của tam giác đồng quy tại:', a: 'Tâm đường tròn nội tiếp', w: ['Trọng tâm', 'Trực tâm', 'Tâm đường tròn ngoại tiếp'] },
        { q: 'Ba đường trung trực của tam giác đồng quy tại:', a: 'Tâm đường tròn ngoại tiếp', w: ['Trọng tâm', 'Trực tâm', 'Tâm đường tròn nội tiếp'] },
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q, options, answer,
        thinking: ['Mẹo nhớ: trung tuyến → trọng tâm; cao → trực tâm; phân giác → nội tiếp; trung trực → ngoại tiếp.'],
        solution: [`Đáp án đúng: **${it.a}**.`],
      };
    },
  },
  {
    id: 'g7.nb-bien-co', topicId: 'g7-t7', grade: 7, level: 'NB', kind: 'MC',
    strand: 'THONG_KE_XS', tag: 'Nhận biết loại biến cố',
    build: (r) => {
      const bank = [
        { q: 'Gieo một con xúc xắc, biến cố “Số chấm xuất hiện nhỏ hơn 7” là biến cố gì?', a: 'Biến cố chắc chắn', w: ['Biến cố không thể', 'Biến cố ngẫu nhiên', 'Không xác định'] },
        { q: 'Gieo một con xúc xắc, biến cố “Số chấm xuất hiện bằng 8” là biến cố gì?', a: 'Biến cố không thể', w: ['Biến cố chắc chắn', 'Biến cố ngẫu nhiên', 'Không xác định'] },
        { q: 'Tung một đồng xu, biến cố “Xuất hiện mặt ngửa” là biến cố gì?', a: 'Biến cố ngẫu nhiên', w: ['Biến cố chắc chắn', 'Biến cố không thể', 'Không xác định'] },
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q, options, answer,
        thinking: ['Chắc chắn: luôn xảy ra (P = 1). Không thể: không bao giờ xảy ra (P = 0). Ngẫu nhiên: có thể xảy ra hoặc không.'],
        solution: [`Đáp án đúng: **${it.a}**.`],
      };
    },
  },

  /* ============================ THÔNG HIỂU ============================ */
  {
    id: 'g7.th-thu-tu-huu-ti', topicId: 'g7-t1', grade: 7, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'So sánh số hữu tỉ',
    build: (r) => {
      const b = r.int(3, 9), d = r.int(3, 11);
      const a = r.int(1, b - 1), c = r.int(1, d - 1);
      const v1 = a / b, v2 = c / d;
      const bigger = v1 > v2 ? `\\f{${a}}{${b}}` : v1 < v2 ? `\\f{${c}}{${d}}` : 'hai phân số bằng nhau';
      const [options, answer] = mcOptions(r, `$${bigger}$`, [
        v1 > v2 ? `$\\f{${c}}{${d}}$` : `$\\f{${a}}{${b}}$`, '$0$', '$1$',
      ]);
      return {
        stem: `Trong hai số $\\f{${a}}{${b}}$ và $\\f{${c}}{${d}}$, số lớn hơn là:`,
        options, answer,
        thinking: [`Quy đồng mẫu để so sánh: mẫu chung $${b}\\cdot${d}=${b * d}$.`],
        solution: [
          `$\\f{${a}}{${b}}=\\f{${a * d}}{${b * d}}$ ; $\\f{${c}}{${d}}=\\f{${c * b}}{${b * d}}$.`,
          `So sánh tử: $${a * d}$ và $${c * b}$ → số lớn hơn là $${bigger}$.`,
        ],
      };
    },
  },
  {
    id: 'g7.th-ti-le-thuan', topicId: 'g7-t2', grade: 7, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Hệ số tỉ lệ của đại lượng tỉ lệ thuận',
    build: (r) => {
      const k = r.int(2, 9) * r.sign();
      const x = r.int(2, 9);
      const y = k * x;
      const [options, answer] = mcOptions(r, String(k), distractInt(r, k, 2).map(String));
      return {
        stem: `Cho $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $k$. Biết khi $x=${x}$ thì $y=${y}$. Giá trị của $k$ là:`,
        options, answer,
        thinking: ['Tỉ lệ thuận: $y=kx$, do đó $k=\\f{y}{x}$.'],
        solution: [`$k=\\f{y}{x}=\\f{${y}}{${x}}=${k}$.`],
      };
    },
  },
  {
    id: 'g7.th-nghiem-da-thuc-mc', topicId: 'g7-t3', grade: 7, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Nghiệm của đa thức bậc nhất',
    build: (r) => {
      const a = r.int(2, 8) * r.sign(), b = r.int(-15, 15);
      const num = -b, den = a;
      const [n, d] = reduce(num, den);
      const correct = d === 1 ? `$${n}$` : `$\\f{${n}}{${d}}$`;
      const [options, answer] = mcOptions(r, correct, [`$${a}$`, `$${b}$`, d === 1 ? `$${-n}$` : `$\\f{${-n}}{${d}}$`]);
      return {
        stem: `Nghiệm của đa thức $P(x)=${a}x${b >= 0 ? '+' : '-'}${Math.abs(b)}$ là:`,
        options, answer,
        thinking: ['Nghiệm là giá trị làm đa thức bằng 0: giải $P(x)=0$.'],
        solution: [`$${a}x${b >= 0 ? '+' : '-'}${Math.abs(b)}=0\\Rightarrow ${a}x=${-b}\\Rightarrow x=${frac(num, den)}$.`],
      };
    },
  },
  {
    id: 'g7.th-lang-tru', topicId: 'g7-t6', grade: 7, level: 'TH', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Thể tích lăng trụ đứng',
    build: (r) => {
      const a = r.int(3, 12), h = r.int(2, 10), L = r.int(4, 15);
      const S = (a * h) / 2;
      const V = S * L;
      const [options, answer] = mcOptions(r, String(V), distractInt(r, V, Math.round(V / 3) || 5).map(String));
      return {
        stem: `Một lăng trụ đứng tam giác có đáy là tam giác với cạnh đáy $${a}\\,cm$, chiều cao ứng với cạnh đáy $${h}\\,cm$; chiều cao lăng trụ $${L}\\,cm$. Thể tích lăng trụ (cm³) bằng:`,
        options, answer,
        thinking: ['$V=S_{\\text{đáy}}\\cdot h$; diện tích tam giác $=\\f{1}{2}$ đáy × chiều cao.'],
        solution: [
          `$S_{\\text{đáy}}=\\f{1}{2}\\cdot${a}\\cdot${h}=${S}\\ (cm^{2})$.`,
          `$V=${S}\\cdot${L}=${V}\\ (cm^{3})$.`,
        ],
      };
    },
  },
  {
    id: 'g7.th-tf-song-song', topicId: 'g7-t4', grade: 7, level: 'TH', kind: 'TF',
    strand: 'HINH_HOC', tag: 'Đúng/Sai — hai đường thẳng song song',
    build: (r) => {
      // Loại a = 90: khi đó góc trong cùng phía cũng bằng 90 độ, hai ý c và d trùng nhau
      // và khẳng định c trở thành đúng — đề sẽ tự mâu thuẫn.
      let a = r.int(35, 145);
      if (a === 90) a = 85;
      return {
        stem: `Cho $a\\para b$ bị cắt bởi cát tuyến $c$, tạo thành một góc có số đo $${a}\\deg$. Xét tính đúng – sai:`,
        options: [
          `Góc so le trong với nó có số đo $${a}\\deg$`,
          `Góc đồng vị với nó có số đo $${a}\\deg$`,
          `Góc trong cùng phía với nó có số đo $${a}\\deg$`,
          `Góc trong cùng phía với nó có số đo $${180 - a}\\deg$`,
        ],
        answer: [true, true, false, true],
        thinking: ['So le trong và đồng vị thì BẰNG nhau; trong cùng phía thì BÙ nhau.'],
        solution: [
          `a) Đúng — hai góc so le trong bằng nhau khi $a\\para b$.`,
          `b) Đúng — hai góc đồng vị bằng nhau khi $a\\para b$.`,
          `c) Sai — hai góc trong cùng phía bù nhau, không bằng nhau (trừ khi cùng bằng $90\\deg$).`,
          `d) Đúng — $180\\deg-${a}\\deg=${180 - a}\\deg$.`,
        ],
      };
    },
  },
  {
    id: 'g7.th-tf-tam-giac', topicId: 'g7-t5', grade: 7, level: 'TH', kind: 'TF',
    strand: 'HINH_HOC', tag: 'Đúng/Sai — quan hệ trong tam giác',
    build: (r) => {
      void r;
      return {
        stem: 'Xét tính đúng – sai của mỗi khẳng định về tam giác:',
        options: [
          'Trong một tam giác, cạnh đối diện với góc lớn hơn thì lớn hơn',
          'Ba độ dài $3\\,cm$, $4\\,cm$, $8\\,cm$ lập thành một tam giác',
          'Trọng tâm chia mỗi trung tuyến theo tỉ số $\\f{2}{3}$ tính từ đỉnh',
          'Tam giác đều là tam giác cân',
        ],
        answer: [true, false, true, true],
        thinking: ['Kiểm tra bất đẳng thức tam giác với cạnh lớn nhất; nhớ tỉ số trọng tâm $\\f{2}{3}$.'],
        solution: [
          'a) Đúng — quan hệ giữa góc và cạnh đối diện.',
          'b) Sai — $3+4=7<8$, vi phạm bất đẳng thức tam giác.',
          'c) Đúng — $AG=\\f{2}{3}AM$.',
          'd) Đúng — tam giác đều có ba cạnh bằng nhau nên cân tại mọi đỉnh.',
        ],
      };
    },
  },

  /* ============================ VẬN DỤNG ============================ */
  {
    id: 'g7.vd-day-ti-so-3', topicId: 'g7-t2', grade: 7, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Dãy tỉ số bằng nhau — ba đại lượng',
    build: (r) => {
      const [p, q, s] = r.shuffle([2, 3, 4, 5, 6, 7]).slice(0, 3);
      const t = r.int(3, 14);
      const sum = (p + q + s) * t;
      return {
        stem: `Tìm ba số $x$, $y$, $z$ biết $\\f{x}{${p}}=\\f{y}{${q}}=\\f{z}{${s}}$ và $x+y+z=${sum}$. (Nhập theo dạng x,y,z.)`,
        answer: `${p * t},${q * t},${s * t}`,
        thinking: ['Có TỔNG ba số → áp dụng ngay tính chất dãy tỉ số bằng nhau mở rộng cho ba tỉ số.'],
        solution: [
          `$\\f{x}{${p}}=\\f{y}{${q}}=\\f{z}{${s}}=\\f{x+y+z}{${p}+${q}+${s}}=\\f{${sum}}{${p + q + s}}=${t}$.`,
          `$x=${p * t}$ ; $y=${q * t}$ ; $z=${s * t}$.`,
        ],
      };
    },
  },
  {
    id: 'g7.vd-gttd-min', topicId: 'g7-t1', grade: 7, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Giá trị nhỏ nhất của biểu thức chứa giá trị tuyệt đối',
    build: (r) => {
      const a = r.int(1, 12), c = r.int(1, 20);
      return {
        stem: `Tìm giá trị nhỏ nhất của biểu thức $A=\\abs{x-${a}}+${c}$.`,
        answer: String(c),
        thinking: [
          '$\\abs{A}\\ge0$ với mọi giá trị của biến — đây là điểm tựa để chặn dưới.',
          'Chặn xong phải chỉ ra dấu bằng xảy ra khi nào mới kết luận được.',
        ],
        solution: [
          `Vì $\\abs{x-${a}}\\ge0$ với mọi $x$ nên $A=\\abs{x-${a}}+${c}\\ge${c}$.`,
          `Dấu “=” xảy ra khi $x-${a}=0\\Leftrightarrow x=${a}$.`,
          `Vậy $A_{\\min}=${c}$ khi $x=${a}$.`,
        ],
        pitfall: 'Thiếu bước chỉ ra dấu bằng là chưa kết luận được giá trị nhỏ nhất.',
      };
    },
  },
  {
    id: 'g7.vd-da-thuc-cong', topicId: 'g7-t3', grade: 7, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Cộng, trừ đa thức một biến',
    build: (r) => {
      const p = [r.int(1, 5), r.int(-6, 6), r.int(-9, 9)];
      const q = [r.int(1, 5), r.int(-6, 6), r.int(-9, 9)];
      const x = r.int(-3, 3);
      const val = (p[0] - q[0]) * x * x + (p[1] - q[1]) * x + (p[2] - q[2]);
      const f = (c: number[], v = 'x') =>
        `${c[0]}${v}^{2}${c[1] >= 0 ? '+' : '-'}${Math.abs(c[1])}${v}${c[2] >= 0 ? '+' : '-'}${Math.abs(c[2])}`;
      return {
        stem: `Cho $P(x)=${f(p)}$ và $Q(x)=${f(q)}$. Tính giá trị của $P(x)-Q(x)$ tại $x=${x}$.`,
        answer: String(val),
        thinking: [
          'Trừ hai đa thức: đổi dấu toàn bộ $Q(x)$ rồi cộng các hạng tử đồng dạng.',
          'Nên thu gọn trước rồi mới thay số — nhanh hơn và ít sai hơn.',
        ],
        solution: [
          `$P(x)-Q(x)=${p[0] - q[0]}x^{2}${p[1] - q[1] >= 0 ? '+' : '-'}${Math.abs(p[1] - q[1])}x${p[2] - q[2] >= 0 ? '+' : '-'}${Math.abs(p[2] - q[2])}$.`,
          `Thay $x=${x}$: $${p[0] - q[0]}\\cdot(${x})^{2}${p[1] - q[1] >= 0 ? '+' : '-'}${Math.abs(p[1] - q[1])}\\cdot(${x})${p[2] - q[2] >= 0 ? '+' : '-'}${Math.abs(p[2] - q[2])}=${val}$.`,
        ],
      };
    },
  },
  {
    id: 'g7.vd-goc-ke-them', topicId: 'g7-t4', grade: 7, level: 'VD', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Kẻ đường phụ song song để tính góc',
    build: (r) => {
      const a = r.int(20, 70), b = r.int(20, 70);
      return {
        stem: `Cho $Ax\\para By$, điểm $C$ nằm giữa hai đường thẳng sao cho $\\angle xAC=${a}\\deg$ và $\\angle yBC=${b}\\deg$. Tính số đo $\\angle ACB$ (nhập theo độ).`,
        answer: String(a + b),
        thinking: [
          'Góc $\\angle ACB$ không so sánh trực tiếp được với hai góc đã cho.',
          'Kẻ qua $C$ một tia song song với $Ax$ để tách $\\angle ACB$ thành hai góc so le trong.',
        ],
        solution: [
          `Qua $C$ kẻ tia $Cz\\para Ax$. Vì $Ax\\para By$ nên $Cz\\para By$.`,
          `$Cz\\para Ax\\Rightarrow\\angle ACz=\\angle xAC=${a}\\deg$ (hai góc so le trong).`,
          `$Cz\\para By\\Rightarrow\\angle zCB=\\angle yBC=${b}\\deg$ (hai góc so le trong).`,
          `Tia $Cz$ nằm giữa hai tia $CA$, $CB$ nên $\\angle ACB=${a}\\deg+${b}\\deg=${a + b}\\deg$.`,
        ],
      };
    },
  },

  /* ========================== VẬN DỤNG CAO ========================== */
  {
    id: 'g7.vdc-ti-so-tich', topicId: 'g7-t2', grade: 7, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Dãy tỉ số bằng nhau kèm điều kiện tích',
    build: (r) => {
      const p = r.int(2, 6), q = r.int(2, 7);
      const t = r.int(2, 6);
      const prod = p * q * t * t;
      return {
        stem: `Tìm $x$, $y$ biết $\\f{x}{${p}}=\\f{y}{${q}}$ và $xy=${prod}$, với $x>0$. (Nhập theo dạng x,y.)`,
        answer: `${p * t},${q * t}`,
        thinking: [
          'Điều kiện là **tích**, không dùng được tính chất cộng của dãy tỉ số bằng nhau.',
          'Phải đặt tỉ số chung bằng tham số $t$ rồi thay vào.',
        ],
        solution: [
          `Đặt $\\f{x}{${p}}=\\f{y}{${q}}=t\\Rightarrow x=${p}t$, $y=${q}t$.`,
          `$xy=${p}t\\cdot${q}t=${p * q}t^{2}=${prod}\\Rightarrow t^{2}=${t * t}\\Rightarrow t=\\pm${t}$.`,
          `Vì $x>0$ nên $t=${t}$, suy ra $x=${p * t}$, $y=${q * t}$.`,
          `(Nếu đề không có điều kiện $x>0$ thì còn nghiệm $x=${-p * t}$, $y=${-q * t}$.)`,
        ],
        pitfall: 'Quên nghiệm âm khi bậc của $t$ là chẵn.',
      };
    },
  },
  {
    id: 'g7.vdc-bdt-tam-giac', topicId: 'g7-t5', grade: 7, level: 'VDC', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Chu vi tam giác cân — bất đẳng thức tam giác',
    build: (r) => {
      const a = r.int(3, 9);            // cạnh nhỏ
      const b = a * 2 + r.int(1, 5);    // cạnh lớn, bảo đảm a + a < b không thành tam giác
      const P = b + b + a;
      return {
        stem: `Một tam giác cân có hai cạnh dài $${a}\\,cm$ và $${b}\\,cm$. Tính chu vi tam giác đó (đơn vị: cm).`,
        answer: String(P),
        thinking: [
          'Tam giác cân có hai cạnh bằng nhau — nhưng phải xét xem cạnh nào là cạnh bên.',
          'Dùng bất đẳng thức tam giác để loại trường hợp không hợp lệ.',
        ],
        solution: [
          `TH1: cạnh bên là $${a}\\,cm$, cạnh đáy $${b}\\,cm$. Khi đó $${a}+${a}=${2 * a}$ và $${2 * a}<${b}$ nên **không thoả** bất đẳng thức tam giác → loại.`,
          `TH2: cạnh bên là $${b}\\,cm$, cạnh đáy $${a}\\,cm$. Kiểm tra: $${b}+${a}>${b}$ và $${b}+${b}=${2 * b}>${a}$ → thoả mãn.`,
          `Chu vi: $P=${b}+${b}+${a}=${P}\\ (cm)$.`,
        ],
        pitfall: 'Không xét đủ hai trường hợp, hoặc quên kiểm tra bất đẳng thức tam giác.',
      };
    },
  },

  /* ============================= TỰ LUẬN ============================= */
  {
    id: 'g7.tl-so-huu-ti', topicId: 'g7-t1', grade: 7, level: 'VD', kind: 'ESSAY',
    strand: 'SO_DAI_SO', tag: 'Tự luận — tính hợp lí và tìm x',
    build: (r) => {
      const b = r.int(3, 9), a = r.int(1, b - 1);
      const d = r.int(3, 11), c = r.int(1, d - 1), e = d - c;
      const k = r.int(2, 5), m = r.int(1, 9), v = r.int(2, 9);
      return {
        stem: `a) Tính hợp lí: $A=\\f{${a}}{${b}}\\cdot\\f{${c}}{${d}}+\\f{${a}}{${b}}\\cdot\\f{${e}}{${d}}$.\n\nb) Tìm $x$, biết $${k}\\abs{x-${m}}=${k * v}$.\n\nc) Tìm giá trị nhỏ nhất của $B=\\abs{x-${m}}+${v}$.`,
        answer: '',
        rubric: [
          { criterion: `Câu a: đặt được nhân tử chung $\\f{${a}}{${b}}$`, points: 0.75 },
          { criterion: `Câu a: tính đúng $A=\\f{${a}}{${b}}$`, points: 0.75 },
          { criterion: `Câu b: cô lập được $\\abs{x-${m}}=${v}$`, points: 0.5 },
          { criterion: `Câu b: xét đủ hai trường hợp, ra $x=${m + v}$ và $x=${m - v}$`, points: 1 },
          { criterion: `Câu c: chặn $B\\ge${v}$ và chỉ ra dấu bằng khi $x=${m}$`, points: 1 },
        ],
        thinking: [
          'Câu a: nhìn thấy thừa số chung là chìa khoá tính nhanh.',
          'Câu b: cô lập dấu giá trị tuyệt đối rồi tách hai nhánh.',
          'Câu c: dùng $\\abs{A}\\ge0$ để chặn dưới.',
        ],
        solution: [
          `a) $A=\\f{${a}}{${b}}\\left(\\f{${c}}{${d}}+\\f{${e}}{${d}}\\right)=\\f{${a}}{${b}}\\cdot1=\\f{${a}}{${b}}$.`,
          `b) $\\abs{x-${m}}=\\f{${k * v}}{${k}}=${v}$.`,
          `TH1: $x-${m}=${v}\\Rightarrow x=${m + v}$. TH2: $x-${m}=-${v}\\Rightarrow x=${m - v}$.`,
          `Vậy $x\\in\\{${m + v};${m - v}\\}$.`,
          `c) Vì $\\abs{x-${m}}\\ge0$ nên $B\\ge${v}$; dấu “=” khi $x=${m}$. Vậy $B_{\\min}=${v}$ khi $x=${m}$.`,
        ],
      };
    },
  },
  {
    id: 'g7.tl-tam-giac', topicId: 'g7-t5', grade: 7, level: 'VDC', kind: 'ESSAY',
    strand: 'HINH_HOC', tag: 'Tự luận hình học — chứng minh hai tam giác bằng nhau',
    build: (r) => {
      void r;
      return {
        stem: 'Cho tam giác $ABC$ cân tại $A$. Gọi $M$ là trung điểm của cạnh $BC$.\n\na) Chứng minh $\\tri ABM=\\tri ACM$.\n\nb) Chứng minh $AM\\perp BC$ và $AM$ là tia phân giác của góc $\\angle BAC$.\n\nc) Trên tia đối của tia $MA$ lấy điểm $D$ sao cho $MD=MA$. Chứng minh $AB=CD$.',
        answer: '',
        rubric: [
          { criterion: 'Vẽ hình đúng, ghi giả thiết – kết luận', points: 0.5 },
          { criterion: 'Câu a: liệt kê đủ ba yếu tố ($AB=AC$, $MB=MC$, $AM$ chung) và kết luận c.c.c', points: 1 },
          { criterion: 'Câu b: suy ra $\\angle AMB=\\angle AMC$, dùng hai góc kề bù để có $90\\deg$', points: 1 },
          { criterion: 'Câu b: suy ra $\\angle BAM=\\angle CAM$ nên $AM$ là phân giác', points: 0.5 },
          { criterion: 'Câu c: chứng minh $\\tri ABM=\\tri DCM$ (c.g.c, dùng hai góc đối đỉnh)', points: 1 },
        ],
        thinking: [
          'Trung điểm cho ngay hai đoạn bằng nhau — vật liệu miễn phí cho trường hợp c.c.c.',
          'Ý c: hai đoạn cần chứng minh bằng nhau nằm ở hai tam giác khác nhau → ghép vào hai tam giác rồi chứng minh bằng nhau; góc xen giữa là cặp góc đối đỉnh tại $M$.',
        ],
        solution: [
          'a) Xét $\\tri ABM$ và $\\tri ACM$ có: $AB=AC$ (vì $\\tri ABC$ cân tại $A$); $MB=MC$ ($M$ là trung điểm $BC$); $AM$ là cạnh chung.',
          'Do đó $\\tri ABM=\\tri ACM$ (c.c.c).',
          'b) Từ đó $\\angle AMB=\\angle AMC$ (hai góc tương ứng). Mà $\\angle AMB+\\angle AMC=180\\deg$ (hai góc kề bù) nên $\\angle AMB=\\angle AMC=90\\deg$, suy ra $AM\\perp BC$.',
          'Cũng từ hai tam giác bằng nhau: $\\angle BAM=\\angle CAM$, nên $AM$ là tia phân giác của $\\angle BAC$.',
          'c) Xét $\\tri ABM$ và $\\tri DCM$ có: $MB=MC$ (gt); $\\angle AMB=\\angle DMC$ (hai góc đối đỉnh); $MA=MD$ (gt).',
          'Do đó $\\tri ABM=\\tri DCM$ (c.g.c), suy ra $AB=DC$ (hai cạnh tương ứng).',
        ],
      };
    },
  },
];
