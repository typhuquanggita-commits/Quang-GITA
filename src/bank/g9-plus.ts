import type { Template } from '@/types';
import { distractInt, mcOptions, reduce, simplifySqrt } from '@/lib/rng';

/* MATHGITA — NGÂN HÀNG KHỐI 9 (bổ sung): phủ kín ma trận đề thi vào 10 */

const sgn = (n: number) => (n < 0 ? `-${Math.abs(n)}` : `+${n}`);

export const BANK_G9_PLUS: Template[] = [
  /* ============================ NHẬN BIẾT ============================ */
  {
    id: 'g9.nb-can-gia-tri', topicId: 'g9-t2', grade: 9, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Tính giá trị căn bậc hai',
    build: (r) => {
      const n = r.int(2, 15);
      const sq = n * n;
      const [options, answer] = mcOptions(r, `$${n}$`, [`$-${n}$`, `$\\pm${n}$`, `$${sq / 2}$`]);
      return {
        stem: `Giá trị của $\\s{${sq}}$ bằng:`,
        options, answer,
        thinking: ['Căn bậc hai **số học** chỉ nhận giá trị không âm.'],
        solution: [`$\\s{${sq}}=${n}$ vì $${n}\\ge0$ và $${n}^{2}=${sq}$.`],
        pitfall: `$\\s{${sq}}=${n}$ (một giá trị), nhưng $x^{2}=${sq}\\Rightarrow x=\\pm${n}$ (hai giá trị).`,
      };
    },
  },
  {
    id: 'g9.nb-rut-gon-can', topicId: 'g9-t2', grade: 9, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Đưa thừa số ra ngoài dấu căn',
    build: (r) => {
      const k = r.pick([2, 3, 5, 6, 7]);
      const m = r.int(2, 6);
      const n = m * m * k;
      const correct = `$${m}\\s{${k}}$`;
      const [options, answer] = mcOptions(r, correct, [`$${m * k}\\s{${k}}$`, `$${m}\\s{${k * m}}$`, `$${m * m}\\s{${k}}$`]);
      return {
        stem: `Rút gọn $\\s{${n}}$ ta được:`,
        options, answer,
        thinking: [`Tách $${n}=${m * m}\\cdot${k}$ với $${m * m}$ là số chính phương.`],
        solution: [`$\\s{${n}}=\\s{${m * m}\\cdot${k}}=\\s{${m * m}}\\cdot\\s{${k}}=${m}\\s{${k}}$.`],
      };
    },
  },
  {
    id: 'g9.nb-delta', topicId: 'g9-t3', grade: 9, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Biệt thức và số nghiệm của phương trình bậc hai',
    build: (r) => {
      const a = r.int(1, 3), b = r.int(-9, 9), c = r.int(-9, 9);
      const D = b * b - 4 * a * c;
      const correct = D > 0 ? 'Hai nghiệm phân biệt' : D === 0 ? 'Nghiệm kép' : 'Vô nghiệm';
      const [options, answer] = mcOptions(r, correct, ['Hai nghiệm phân biệt', 'Nghiệm kép', 'Vô nghiệm'].filter((x) => x !== correct));
      return {
        stem: `Phương trình $${a === 1 ? '' : a}x^{2}${sgn(b)}x${sgn(c)}=0$ có:`,
        options, answer,
        thinking: ['Tính $\\Delta=b^{2}-4ac$ rồi kết luận: $\\Delta>0$ hai nghiệm, $\\Delta=0$ nghiệm kép, $\\Delta<0$ vô nghiệm.'],
        solution: [
          `$\\Delta=(${b})^{2}-4\\cdot${a}\\cdot(${c})=${b * b}-${4 * a * c}=${D}$.`,
          `$\\Delta${D > 0 ? '>0' : D === 0 ? '=0' : '<0'}$ nên phương trình ${correct.toLowerCase()}.`,
        ],
      };
    },
  },
  {
    id: 'g9.nb-viete-mc', topicId: 'g9-t3', grade: 9, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Hệ thức Viète — tổng và tích hai nghiệm',
    build: (r) => {
      const b = r.int(-10, 10), c = r.int(-15, 8);
      const D = b * b - 4 * c;
      const ask = r.pick(['S', 'P'] as const);
      const v = ask === 'S' ? -b : c;
      const [options, answer] = mcOptions(r, `$${v}$`, distractInt(r, v, 3).map((x) => `$${x}$`));
      return {
        stem: `Phương trình $x^{2}${sgn(b)}x${sgn(c)}=0$ có hai nghiệm $x_1$, $x_2$ (biết $\\Delta=${D}>0$). Khi đó ${ask === 'S' ? '$x_1+x_2$' : '$x_1x_2$'} bằng:`,
        options, answer,
        thinking: ['Hệ thức Viète: $S=x_1+x_2=-\\f{b}{a}$ và $P=x_1x_2=\\f{c}{a}$.'],
        solution: [
          `Với $a=1$, $b=${b}$, $c=${c}$:`,
          ask === 'S' ? `$S=-\\f{b}{a}=-\\f{${b}}{1}=${-b}$.` : `$P=\\f{c}{a}=\\f{${c}}{1}=${c}$.`,
        ],
        pitfall: 'Nhớ dấu trừ ở công thức tổng: $S=-\\f{b}{a}$.',
      };
    },
  },
  {
    id: 'g9.nb-luong-giac', topicId: 'g9-t5', grade: 9, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Tỉ số lượng giác của góc nhọn',
    build: (r) => {
      const bank = [
        { q: 'Trong tam giác vuông, $\\sin$ của một góc nhọn bằng:', a: 'Cạnh đối chia cạnh huyền', w: ['Cạnh kề chia cạnh huyền', 'Cạnh đối chia cạnh kề', 'Cạnh huyền chia cạnh đối'] },
        { q: 'Trong tam giác vuông, $\\cos$ của một góc nhọn bằng:', a: 'Cạnh kề chia cạnh huyền', w: ['Cạnh đối chia cạnh huyền', 'Cạnh đối chia cạnh kề', 'Cạnh kề chia cạnh đối'] },
        { q: 'Trong tam giác vuông, $\\tan$ của một góc nhọn bằng:', a: 'Cạnh đối chia cạnh kề', w: ['Cạnh kề chia cạnh đối', 'Cạnh đối chia cạnh huyền', 'Cạnh kề chia cạnh huyền'] },
        { q: 'Với $\\alpha$ là góc nhọn, $\\sin^{2}\\alpha+\\cos^{2}\\alpha$ bằng:', a: '$1$', w: ['$0$', '$2$', '$\\tan\\alpha$'] },
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q, options, answer,
        thinking: ['Mẹo nhớ: “Sin đi học – Cos không hư – Tang đoàn kết – Cotang kết đoàn”.'],
        solution: [`Đáp án đúng: ${it.a}.`],
      };
    },
  },
  {
    id: 'g9.nb-duong-tron-nb', topicId: 'g9-t6', grade: 9, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Tính chất cơ bản của đường tròn',
    build: (r) => {
      const bank = [
        { q: 'Góc nội tiếp chắn nửa đường tròn có số đo bằng:', a: '$90\\deg$', w: ['$45\\deg$', '$180\\deg$', '$60\\deg$'] },
        { q: 'Tiếp tuyến của đường tròn thì:', a: 'Vuông góc với bán kính tại tiếp điểm', w: ['Song song với bán kính', 'Đi qua tâm', 'Bằng đường kính'] },
        { q: 'Góc ở tâm có số đo bằng:', a: 'Số đo cung bị chắn', w: ['Nửa số đo cung bị chắn', 'Hai lần số đo cung bị chắn', '$90\\deg$'] },
        { q: 'Tứ giác nội tiếp có tổng hai góc đối bằng:', a: '$180\\deg$', w: ['$90\\deg$', '$360\\deg$', '$270\\deg$'] },
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q, options, answer,
        thinking: ['Đây là nhóm tính chất nền tảng, xuất hiện trong hầu hết câu hình thi vào 10.'],
        solution: [`Đáp án đúng: ${it.a}.`],
      };
    },
  },
  {
    id: 'g9.nb-hinh-khoi', topicId: 'g9-t7', grade: 9, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Công thức hình trụ, hình nón, hình cầu',
    build: (r) => {
      const bank = [
        { q: 'Thể tích hình trụ bán kính đáy $r$, chiều cao $h$ là:', a: '$V=\\pi r^{2}h$', w: ['$V=\\f{1}{3}\\pi r^{2}h$', '$V=2\\pi rh$', '$V=\\f{4}{3}\\pi r^{3}$'] },
        { q: 'Thể tích hình nón bán kính đáy $r$, chiều cao $h$ là:', a: '$V=\\f{1}{3}\\pi r^{2}h$', w: ['$V=\\pi r^{2}h$', '$V=\\pi rl$', '$V=\\f{4}{3}\\pi r^{3}$'] },
        { q: 'Thể tích hình cầu bán kính $R$ là:', a: '$V=\\f{4}{3}\\pi R^{3}$', w: ['$V=4\\pi R^{2}$', '$V=\\f{1}{3}\\pi R^{3}$', '$V=\\pi R^{3}$'] },
        { q: 'Diện tích mặt cầu bán kính $R$ là:', a: '$S=4\\pi R^{2}$', w: ['$S=\\f{4}{3}\\pi R^{3}$', '$S=2\\pi R^{2}$', '$S=\\pi R^{2}$'] },
        { q: 'Diện tích xung quanh hình nón bán kính đáy $r$, đường sinh $l$ là:', a: '$S_{xq}=\\pi rl$', w: ['$S_{xq}=2\\pi rl$', '$S_{xq}=\\pi r^{2}$', '$S_{xq}=\\pi rh$'] },
      ];
      const it = r.pick(bank);
      const [options, answer] = mcOptions(r, it.a, it.w);
      return {
        stem: it.q, options, answer,
        thinking: ['Nhớ hệ số $\\f{1}{3}$ của hình nón và $\\f{4}{3}$ của hình cầu.'],
        solution: [`Đáp án đúng: ${it.a}.`],
      };
    },
  },

  /* ============================ THÔNG HIỂU ============================ */
  {
    id: 'g9.th-lien-hop', topicId: 'g9-t2', grade: 9, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Trục căn thức ở mẫu',
    build: (r) => {
      const a = r.pick([2, 3, 5, 6, 7, 10]);
      const b = r.int(1, 4);
      const den = a - b * b;
      if (den === 0) return {
        stem: 'Trục căn thức ở mẫu: $\\f{1}{\\s{5}-2}$ (nhập kết quả rút gọn).',
        answer: 'sqrt5+2',
        accept: ['√5+2', '\\s{5}+2'],
        solution: ['Nhân cả tử và mẫu với biểu thức liên hợp $\\s{5}+2$.', '$\\f{1}{\\s{5}-2}=\\f{\\s{5}+2}{5-4}=\\s{5}+2$.'],
      };
      return {
        stem: `Trục căn thức ở mẫu của $\\f{1}{\\s{${a}}-${b}}$. Sau khi trục căn, **mẫu số** của biểu thức bằng bao nhiêu?`,
        answer: String(den),
        thinking: [
          `Nhân cả tử và mẫu với biểu thức **liên hợp** $\\s{${a}}+${b}$.`,
          'Mẫu trở thành hiệu hai bình phương nên hết căn.',
        ],
        solution: [
          `$\\f{1}{\\s{${a}}-${b}}=\\f{\\s{${a}}+${b}}{(\\s{${a}}-${b})(\\s{${a}}+${b})}=\\f{\\s{${a}}+${b}}{${a}-${b * b}}=\\f{\\s{${a}}+${b}}{${den}}$.`,
          `Vậy mẫu số bằng $${den}$.`,
        ],
        pitfall: 'Quên đổi dấu trong biểu thức liên hợp.',
      };
    },
  },
  {
    id: 'g9.th-nham-nghiem', topicId: 'g9-t3', grade: 9, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Nhẩm nghiệm phương trình bậc hai',
    build: (r) => {
      const a = r.int(1, 5), c = r.int(1, 12);
      const useOne = r.bool();
      const b = useOne ? -(a + c) : a + c;   // a+b+c=0 hoặc a-b+c=0
      const roots = useOne ? [1, c / a] : [-1, -c / a];
      const rs = roots.map((x) => (Number.isInteger(x) ? String(x) : `\\f{${useOne ? c : -c}}{${a}}`));
      const correct = `$x_1=${rs[0]}$; $x_2=${rs[1]}$`;
      const [options, answer] = mcOptions(r, correct, [
        `$x_1=${useOne ? '-1' : '1'}$; $x_2=${rs[1]}$`,
        `$x_1=${rs[0]}$; $x_2=${a}$`,
        'Phương trình vô nghiệm',
      ]);
      return {
        stem: `Nghiệm của phương trình $${a === 1 ? '' : a}x^{2}${sgn(b)}x${sgn(c)}=0$ là:`,
        options, answer,
        thinking: [
          useOne
            ? `Kiểm tra $a+b+c=${a}${sgn(b)}${sgn(c)}=0$ → nhẩm ngay $x_1=1$, $x_2=\\f{c}{a}$.`
            : `Kiểm tra $a-b+c=${a}${sgn(-b)}${sgn(c)}=0$ → nhẩm ngay $x_1=-1$, $x_2=-\\f{c}{a}$.`,
        ],
        solution: [
          useOne
            ? `Vì $a+b+c=${a}+(${b})+${c}=0$ nên $x_1=1$ và $x_2=\\f{c}{a}=\\f{${c}}{${a}}$.`
            : `Vì $a-b+c=${a}-(${b})+${c}=0$ nên $x_1=-1$ và $x_2=-\\f{c}{a}=-\\f{${c}}{${a}}$.`,
        ],
        pitfall: 'Nhẩm nghiệm tiết kiệm rất nhiều thời gian — luôn thử tổng hệ số trước khi tính $\\Delta$.',
      };
    },
  },
  {
    id: 'g9.th-tuong-giao', topicId: 'g9-t3', grade: 9, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tương giao parabol và đường thẳng',
    build: (r) => {
      const a = r.pick([1, 2, -1, -2]);
      const x1 = r.int(-4, 4), x2 = r.int(-4, 4);
      if (x1 === x2) return {
        stem: 'Tìm hoành độ giao điểm của $(P): y=x^{2}$ và $(d): y=2x+3$. (Nhập cách nhau bởi dấu phẩy.)',
        answer: '-1,3',
        accept: ['3,-1'],
        thinking: ['Hoành độ giao điểm là nghiệm của **phương trình hoành độ giao điểm**: cho hai vế bằng nhau.'],
        solution: ['$x^{2}=2x+3\\Leftrightarrow x^{2}-2x-3=0$.', '$\\Delta\'=1+3=4>0$, nghiệm $x=-1$ và $x=3$.'],
      };
      // a x^2 = m x + n  ->  a x^2 - m x - n = 0 có nghiệm x1, x2
      const m = a * (x1 + x2), n = -a * x1 * x2;
      const roots = [x1, x2].sort((p, q) => p - q);
      return {
        stem: `Tìm hoành độ giao điểm của parabol $(P): y=${a === 1 ? '' : a === -1 ? '-' : a}x^{2}$ và đường thẳng $(d): y=${m}x${sgn(n)}$. (Nhập các giá trị cách nhau bởi dấu phẩy.)`,
        answer: roots.join(','),
        accept: [roots.slice().reverse().join(',')],
        thinking: [
          'Hoành độ giao điểm là nghiệm của **phương trình hoành độ giao điểm**: cho hai vế bằng nhau.',
        ],
        solution: [
          `Phương trình hoành độ giao điểm: $${a === 1 ? '' : a === -1 ? '-' : a}x^{2}=${m}x${sgn(n)}$.`,
          `$\\Leftrightarrow ${a === 1 ? '' : a === -1 ? '-' : a}x^{2}-${m}x${sgn(-n)}=0$.`,
          `Giải ra được $x_1=${roots[0]}$, $x_2=${roots[1]}$.`,
        ],
      };
    },
  },
  {
    id: 'g9.th-he-thuc-luong-2', topicId: 'g9-t5', grade: 9, level: 'TH', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Hệ thức lượng — tính cạnh góc vuông',
    build: (r) => {
      const bh = r.pick([1, 4, 9, 16, 2, 3]);
      const ch = r.pick([4, 9, 16, 25, 12]);
      const bc = bh + ch;
      const ab2 = bh * bc;
      const correct = `$\\s{${ab2}}$`;
      const [options, answer] = mcOptions(r, correct, [`$\\s{${ch * bc}}$`, `$\\s{${bh * ch}}$`, `$${bh + ch}$`]);
      return {
        stem: `Tam giác $ABC$ vuông tại $A$, đường cao $AH$. Biết $BH=${bh}$, $CH=${ch}$. Độ dài $AB$ bằng:`,
        options, answer,
        thinking: ['Hệ thức $c^{2}=ac\'$: bình phương cạnh góc vuông bằng cạnh huyền nhân hình chiếu của nó.'],
        solution: [
          `$BC=BH+CH=${bh}+${ch}=${bc}$.`,
          `$AB^{2}=BH\\cdot BC=${bh}\\cdot${bc}=${ab2}$, suy ra $AB=\\s{${ab2}}${Number.isInteger(Math.sqrt(ab2)) ? `=${Math.sqrt(ab2)}` : `=${simplifySqrt(ab2)}`}$.`,
        ],
        pitfall: 'Nhầm hình chiếu của cạnh này với cạnh kia.',
      };
    },
  },
  {
    id: 'g9.th-tf-can', topicId: 'g9-t2', grade: 9, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — căn thức bậc hai',
    build: (r) => {
      const a = r.int(2, 9);
      return {
        stem: 'Xét tính đúng – sai của mỗi khẳng định sau:',
        options: [
          `$\\s{(-${a})^{2}}=${a}$`,
          `$\\s{A^{2}}=A$ với mọi số thực $A$`,
          `$\\s{${a}}\\cdot\\s{${a}}=${a}$`,
          `$\\s{x-${a}}$ xác định khi $x\\ge${a}$`,
        ],
        answer: [true, false, true, true],
        thinking: ['Nhớ $\\s{A^{2}}=\\abs{A}$, không phải $A$.'],
        solution: [
          `a) Đúng: $\\s{(-${a})^{2}}=\\s{${a * a}}=${a}=\\abs{-${a}}$.`,
          'b) Sai: đúng phải là $\\s{A^{2}}=\\abs{A}$; nếu $A<0$ thì $\\s{A^{2}}=-A\\ne A$.',
          `c) Đúng: $\\s{${a}}\\cdot\\s{${a}}=(\\s{${a}})^{2}=${a}$.`,
          `d) Đúng: căn có nghĩa khi biểu thức dưới căn không âm.`,
        ],
      };
    },
  },
  {
    id: 'g9.th-tf-viete', topicId: 'g9-t3', grade: 9, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — phương trình bậc hai và Viète',
    build: (r) => {
      void r;
      return {
        stem: 'Cho phương trình $ax^{2}+bx+c=0$ ($a\\ne0$) có hai nghiệm $x_1$, $x_2$. Xét tính đúng – sai:',
        options: [
          '$x_1+x_2=-\\f{b}{a}$',
          '$x_1x_2=-\\f{c}{a}$',
          '$x_1^{2}+x_2^{2}=S^{2}-2P$ với $S=x_1+x_2$, $P=x_1x_2$',
          'Hai nghiệm trái dấu khi và chỉ khi $P<0$',
        ],
        answer: [true, false, true, true],
        thinking: ['Kiểm tra kỹ dấu trong hai công thức Viète — đây là chỗ nhầm phổ biến.'],
        solution: [
          'a) Đúng — công thức tổng có dấu trừ.',
          'b) Sai — tích là $x_1x_2=\\f{c}{a}$, **không** có dấu trừ.',
          'c) Đúng — $x_1^{2}+x_2^{2}=(x_1+x_2)^{2}-2x_1x_2$.',
          'd) Đúng — khi $P<0$ thì $\\Delta=b^{2}-4ac>0$ tự động, và hai nghiệm trái dấu.',
        ],
      };
    },
  },

  /* ============================ VẬN DỤNG ============================ */
  {
    id: 'g9.vd-viete-hieu', topicId: 'g9-t3', grade: 9, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Biểu thức đối xứng nâng cao của hai nghiệm',
    build: (r) => {
      const b = r.int(-10, 10), c = r.int(-20, 5);
      const D = b * b - 4 * c;
      if (D <= 0) return {
        stem: 'Cho phương trình $x^{2}-5x+2=0$ có hai nghiệm $x_1$, $x_2$. Tính $A=(x_1-x_2)^{2}$.',
        answer: '17',
        thinking: ['$(x_1-x_2)^{2}=(x_1+x_2)^{2}-4x_1x_2=S^{2}-4P$ — đưa về $S$, $P$ rồi dùng Viète.'],
        solution: ['$S=5$; $P=2$.', '$(x_1-x_2)^{2}=S^{2}-4P=25-8=17$.'],
      };
      const S = -b, P = c;
      const which = r.pick(['diff', 'cube', 'inv'] as const);
      const val = which === 'diff' ? S * S - 4 * P
        : which === 'cube' ? S * S * S - 3 * P * S
          : null;
      if (which === 'inv' && P === 0) {
        return {
          stem: `Cho phương trình $x^{2}${sgn(b)}x${sgn(c)}=0$ có hai nghiệm $x_1$, $x_2$. Tính $A=(x_1-x_2)^{2}$.`,
          answer: String(S * S - 4 * P),
          thinking: ['$(x_1-x_2)^{2}=S^{2}-4P$ — biểu thức đối xứng nên quy về $S$, $P$.'],
          solution: [`$S=${S}$; $P=${P}$.`, `$(x_1-x_2)^{2}=S^{2}-4P=${S * S}-${4 * P}=${S * S - 4 * P}$.`],
        };
      }
      if (which === 'inv') {
        const [n, d] = reduce(S, P);
        return {
          stem: `Cho phương trình $x^{2}${sgn(b)}x${sgn(c)}=0$ có hai nghiệm $x_1$, $x_2$. Tính $A=\\f{1}{x_1}+\\f{1}{x_2}$ (nhập dạng a/b tối giản).`,
          answer: d === 1 ? String(n) : `${n}/${d}`,
          thinking: ['Quy đồng: $\\f{1}{x_1}+\\f{1}{x_2}=\\f{x_1+x_2}{x_1x_2}=\\f{S}{P}$.'],
          solution: [
            `$\\Delta=${D}>0$ nên phương trình có hai nghiệm phân biệt.`,
            `Viète: $S=${S}$ ; $P=${P}$.`,
            `$A=\\f{S}{P}=\\f{${S}}{${P}}=\\f{${n}}{${d}}$.`,
          ],
        };
      }
      return {
        stem: `Cho phương trình $x^{2}${sgn(b)}x${sgn(c)}=0$ có hai nghiệm $x_1$, $x_2$. Tính $A=${which === 'diff' ? '(x_1-x_2)^{2}' : 'x_1^{3}+x_2^{3}'}$.`,
        answer: String(val),
        thinking: [
          'Biểu thức đối xứng → biểu diễn qua $S$ và $P$, không cần giải phương trình.',
          which === 'diff' ? '$(x_1-x_2)^{2}=S^{2}-4P$.' : '$x_1^{3}+x_2^{3}=S^{3}-3PS$.',
        ],
        solution: [
          `$\\Delta=(${b})^{2}-4\\cdot1\\cdot(${c})=${D}>0$ nên phương trình có hai nghiệm phân biệt.`,
          `Theo Viète: $S=${S}$ ; $P=${P}$.`,
          which === 'diff'
            ? `$A=S^{2}-4P=${S * S}-${4 * P}=${val}$.`
            : `$A=S^{3}-3PS=${S ** 3}-3\\cdot${P}\\cdot${S}=${val}$.`,
        ],
        pitfall: 'Nhớ phân biệt $S^{2}-2P$ (tổng bình phương) với $S^{2}-4P$ (bình phương hiệu).',
      };
    },
  },
  {
    id: 'g9.vd-lap-he-chuyen-dong', topicId: 'g9-t1', grade: 9, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Lập hệ phương trình — chuyển động',
    build: (r) => {
      const v = r.pick([10, 12, 15, 18, 20]);      // vận tốc ca nô
      const w = r.pick([2, 3, 4, 5]);              // vận tốc dòng nước
      const s = (v + w) * (v - w) * r.int(1, 2);   // quãng đường chia hết đẹp
      const tx = s / (v + w), tn = s / (v - w);
      return {
        stem: `Một ca nô đi xuôi dòng quãng sông dài $${s}\\,km$ hết $${Math.round(tx * 100) / 100}$ giờ và đi ngược dòng chính quãng sông đó hết $${Math.round(tn * 100) / 100}$ giờ. Tính vận tốc thực của ca nô (km/h).`,
        answer: String(v),
        thinking: [
          'Vận tốc xuôi dòng $=v+w$; vận tốc ngược dòng $=v-w$ (với $w$ là vận tốc dòng nước).',
          'Hai đại lượng chưa biết → lập hệ hai phương trình.',
        ],
        solution: [
          `Gọi vận tốc thực của ca nô là $x$ (km/h) và vận tốc dòng nước là $y$ (km/h), $x>y>0$.`,
          `Xuôi dòng: $(x+y)\\cdot${Math.round(tx * 100) / 100}=${s}\\Rightarrow x+y=${v + w}$.`,
          `Ngược dòng: $(x-y)\\cdot${Math.round(tn * 100) / 100}=${s}\\Rightarrow x-y=${v - w}$.`,
          `Cộng hai phương trình: $2x=${2 * v}\\Rightarrow x=${v}$; suy ra $y=${w}$ (thoả điều kiện).`,
          `Vậy vận tốc thực của ca nô là **${v} km/h**.`,
        ],
      };
    },
  },
  {
    id: 'g9.vd-tu-giac-noi-tiep-goc', topicId: 'g9-t6', grade: 9, level: 'VD', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Tính góc trong tứ giác nội tiếp',
    build: (r) => {
      const A = r.int(50, 130);
      const B = r.int(50, 130);
      return {
        stem: `Tứ giác $ABCD$ nội tiếp đường tròn $(O)$, biết $\\angle A=${A}\\deg$ và $\\angle B=${B}\\deg$. Tính $\\angle C+\\angle D$ (nhập theo độ).`,
        answer: String(360 - A - B),
        thinking: [
          'Tứ giác nội tiếp: tổng hai góc **đối** bằng $180\\deg$, nên $\\angle A+\\angle C=180\\deg$ và $\\angle B+\\angle D=180\\deg$.',
        ],
        solution: [
          `$\\angle C=180\\deg-\\angle A=180\\deg-${A}\\deg=${180 - A}\\deg$.`,
          `$\\angle D=180\\deg-\\angle B=180\\deg-${B}\\deg=${180 - B}\\deg$.`,
          `$\\angle C+\\angle D=${180 - A}\\deg+${180 - B}\\deg=${360 - A - B}\\deg$.`,
          `(Kiểm tra: tổng bốn góc của tứ giác bằng $360\\deg$ ✓)`,
        ],
      };
    },
  },
  {
    id: 'g9.vd-hinh-tru-thuc-te', topicId: 'g9-t7', grade: 9, level: 'VD', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Bài toán thực tế hình trụ',
    build: (r) => {
      const rad = r.pick([5, 10, 20, 25, 30]);
      const h = r.pick([20, 30, 40, 50, 60]);
      const V = Math.PI * rad * rad * h;
      const liters = V / 1000;
      return {
        stem: `Một thùng chứa nước dạng hình trụ có bán kính đáy $${rad}\\,cm$ và chiều cao $${h}\\,cm$. Tính thể tích thùng theo lít (lấy $\\pi\\approx3{,}14$, làm tròn 2 chữ số thập phân).`,
        answer: String(Math.round((3.14 * rad * rad * h) / 1000 * 100) / 100),
        accept: [String(Math.round(liters * 100) / 100)],
        thinking: [
          '$V=\\pi r^{2}h$; sau đó đổi $1000\\,cm^{3}=1$ lít.',
        ],
        solution: [
          `$V=\\pi r^{2}h\\approx3{,}14\\cdot${rad}^{2}\\cdot${h}=3{,}14\\cdot${rad * rad}\\cdot${h}\\approx${Math.round(3.14 * rad * rad * h * 100) / 100}\\ (cm^{3})$.`,
          `Đổi ra lít: $${Math.round(3.14 * rad * rad * h * 100) / 100}:1000\\approx${Math.round((3.14 * rad * rad * h) / 1000 * 100) / 100}$ lít.`,
        ],
        pitfall: 'Quên đổi đơn vị $cm^{3}$ sang lít.',
      };
    },
  },

  /* ========================== VẬN DỤNG CAO ========================== */
  {
    id: 'g9.vdc-can-cuc-tri', topicId: 'g9-t2', grade: 9, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Cực trị biểu thức chứa căn (Cô-si)',
    build: (r) => {
      const k = r.pick([1, 4, 9, 16, 25]);
      const s = Math.sqrt(k);
      return {
        stem: `Cho $x>0$. Tìm giá trị nhỏ nhất của $A=x+\\f{${k}}{x}$.`,
        answer: String(2 * s),
        thinking: [
          'Hai hạng tử dương có tích là hằng số $x\\cdot\\f{${k}}{x}=${k}$ → dùng bất đẳng thức Cô-si.',
          'Cô-si cho hai số dương: $a+b\\ge2\\s{ab}$, dấu bằng khi $a=b$.',
        ],
        solution: [
          `Vì $x>0$ nên $\\f{${k}}{x}>0$. Áp dụng bất đẳng thức Cô-si:`,
          `$A=x+\\f{${k}}{x}\\ge2\\s{x\\cdot\\f{${k}}{x}}=2\\s{${k}}=${2 * s}$.`,
          `Dấu “=” xảy ra khi $x=\\f{${k}}{x}\\Leftrightarrow x^{2}=${k}\\Leftrightarrow x=${s}$ (vì $x>0$).`,
          `Vậy $A_{\\min}=${2 * s}$ khi $x=${s}$.`,
        ],
        pitfall: 'Phải nêu điều kiện $x>0$ trước khi áp dụng Cô-si.',
      };
    },
  },
  {
    id: 'g9.vdc-viete-dieu-kien', topicId: 'g9-t3', grade: 9, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm tham số theo điều kiện về nghiệm',
    build: (r) => {
      const m = r.int(2, 9);
      // x^2 - 2mx + m^2 - 1 = 0 luôn có 2 nghiệm; x1^2 + x2^2 = 2m^2 + 2
      const target = 2 * m * m + 2;
      return {
        stem: `Cho phương trình $x^{2}-2mx+m^{2}-1=0$ ($m$ là tham số). Tìm giá trị dương của $m$ để hai nghiệm $x_1$, $x_2$ thoả mãn $x_1^{2}+x_2^{2}=${target}$.`,
        answer: String(m),
        thinking: [
          'Bước 1: kiểm tra điều kiện có nghiệm bằng $\\Delta\'$.',
          'Bước 2: viết Viète.',
          'Bước 3: đưa hệ thức đề cho về $S$, $P$ rồi giải theo $m$, cuối cùng đối chiếu điều kiện.',
        ],
        solution: [
          `$\\Delta'=m^{2}-(m^{2}-1)=1>0$ với mọi $m$, nên phương trình luôn có hai nghiệm phân biệt.`,
          `Theo Viète: $S=x_1+x_2=2m$ ; $P=x_1x_2=m^{2}-1$.`,
          `$x_1^{2}+x_2^{2}=S^{2}-2P=4m^{2}-2(m^{2}-1)=2m^{2}+2$.`,
          `Theo đề: $2m^{2}+2=${target}\\Rightarrow m^{2}=${m * m}\\Rightarrow m=\\pm${m}$.`,
          `Lấy giá trị dương: $m=${m}$.`,
        ],
        pitfall: 'Quên bước đối chiếu điều kiện là nơi phân loại học sinh 8 điểm và 9+ điểm.',
      };
    },
  },
  {
    id: 'g9.vdc-hinh-hoc-tinh', topicId: 'g9-t6', grade: 9, level: 'VDC', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Phương tích — hệ thức trong đường tròn',
    build: (r) => {
      const mt = r.pick([6, 8, 10, 12, 15]);
      const mc = r.pick([2, 3, 4, 5, 6]);
      const md = (mt * mt) / mc;
      if (!Number.isInteger(md)) {
        return {
          stem: 'Từ điểm $M$ ngoài đường tròn $(O)$ kẻ tiếp tuyến $MT$ và cát tuyến $MCD$. Biết $MT=6$, $MC=4$. Tính $MD$.',
          answer: '9',
          thinking: ['Tiếp tuyến + cát tuyến từ một điểm → nghĩ ngay tới hệ thức $MT^{2}=MC\\cdot MD$.'],
          solution: ['$MT^{2}=MC\\cdot MD$ (phương tích).', '$36=4\\cdot MD\\Rightarrow MD=9$.'],
        };
      }
      return {
        stem: `Từ điểm $M$ nằm ngoài đường tròn $(O)$, kẻ tiếp tuyến $MT$ ($T$ là tiếp điểm) và cát tuyến $MCD$ ($C$ nằm giữa $M$ và $D$). Biết $MT=${mt}$ và $MC=${mc}$. Tính $MD$.`,
        answer: String(md),
        thinking: [
          'Hệ thức phương tích: $MT^{2}=MC\\cdot MD$.',
          'Nguồn gốc: $\\tri MTC\\sim\\tri MDT$ (góc $M$ chung, góc tiếp tuyến – dây bằng góc nội tiếp).',
        ],
        solution: [
          `Xét $\\tri MTC$ và $\\tri MDT$: $\\angle M$ chung; $\\angle MTC=\\angle MDT$ (góc tạo bởi tiếp tuyến và dây bằng góc nội tiếp cùng chắn cung $TC$).`,
          `Do đó $\\tri MTC\\sim\\tri MDT$ (g.g), suy ra $\\f{MT}{MD}=\\f{MC}{MT}$, tức $MT^{2}=MC\\cdot MD$.`,
          `$${mt}^{2}=${mc}\\cdot MD\\Rightarrow MD=\\f{${mt * mt}}{${mc}}=${md}$.`,
        ],
      };
    },
  },

  /* ============================= TỰ LUẬN ============================= */
  {
    id: 'g9.tl-rut-gon-can', topicId: 'g9-t2', grade: 9, level: 'VD', kind: 'ESSAY',
    strand: 'SO_DAI_SO', tag: 'Tự luận — rút gọn biểu thức chứa căn (câu 1 thi vào 10)',
    build: (r) => {
      const a = r.int(2, 6);
      const a2 = a * a;
      const x0 = r.pick([0, 1, 4, 9, 16, 25]).valueOf();
      const xv = x0 === a2 ? x0 + 1 : x0;
      return {
        stem: `Cho biểu thức $P=\\f{1}{\\s{x}-${a}}-\\f{1}{\\s{x}+${a}}$ với $x\\ge0$, $x\\ne${a2}$.\n\na) Rút gọn $P$.\n\nb) Tính giá trị của $P$ khi $x=${xv}$.\n\nc) Tìm $x$ để $P>0$.`,
        answer: '',
        rubric: [
          { criterion: `Câu a: xác định đúng mẫu chung $(\\s{x}-${a})(\\s{x}+${a})=x-${a2}$`, points: 1 },
          { criterion: `Câu a: quy đồng, thu gọn tử đúng dấu và kết luận $P=\\f{${2 * a}}{x-${a2}}$`, points: 1 },
          { criterion: `Câu b: thay số và tính đúng giá trị`, points: 1 },
          { criterion: `Câu c: lập luận tử dương nên $P>0\\Leftrightarrow x-${a2}>0$`, points: 0.5 },
          { criterion: `Câu c: kết luận $x>${a2}$, kết hợp điều kiện xác định`, points: 0.5 },
        ],
        thinking: [
          'Quy trình 5 bước: điều kiện → đặt $t=\\s{x}$ → phân tích mẫu → quy đồng → thu gọn.',
          'Câu c: tử là hằng số dương nên dấu của $P$ chỉ phụ thuộc dấu của mẫu.',
        ],
        solution: [
          `a) Mẫu thức chung: $(\\s{x}-${a})(\\s{x}+${a})=x-${a2}$.`,
          `$P=\\f{(\\s{x}+${a})-(\\s{x}-${a})}{x-${a2}}=\\f{${2 * a}}{x-${a2}}$.`,
          `b) Tại $x=${xv}$ (thoả điều kiện): $P=\\f{${2 * a}}{${xv}-${a2}}=\\f{${2 * a}}{${xv - a2}}$.`,
          `c) Vì tử $${2 * a}>0$ nên $P>0\\Leftrightarrow x-${a2}>0\\Leftrightarrow x>${a2}$.`,
          `Kết hợp điều kiện $x\\ge0$, $x\\ne${a2}$: đáp số $x>${a2}$.`,
        ],
      };
    },
  },
  {
    id: 'g9.tl-lap-he', topicId: 'g9-t1', grade: 9, level: 'VD', kind: 'ESSAY',
    strand: 'SO_DAI_SO', tag: 'Tự luận — giải bài toán bằng cách lập hệ phương trình',
    build: (r) => {
      const x = r.int(20, 60), y = r.int(15, 50);
      const t1 = r.int(2, 5), t2 = r.int(2, 5);
      const s1 = t1 * x + t2 * y;
      const s2 = t2 * x + t1 * y;
      if (t1 === t2) {
        return {
          stem: 'Hai xưởng may cùng sản xuất. Trong 3 ngày xưởng I may được 90 áo, xưởng II may được 60 áo. Hỏi mỗi ngày mỗi xưởng may được bao nhiêu áo?',
          answer: '',
          rubric: [
            { criterion: 'Gọi ẩn có đơn vị và điều kiện', points: 1 },
            { criterion: 'Lập đúng phương trình', points: 1 },
            { criterion: 'Giải đúng', points: 1 },
            { criterion: 'Đối chiếu điều kiện và kết luận', points: 1 },
          ],
          thinking: ['Năng suất mỗi ngày = tổng sản phẩm : số ngày — bài toán quy về hai phép chia độc lập.'],
          solution: ['Xưởng I: $90:3=30$ áo/ngày. Xưởng II: $60:3=20$ áo/ngày.'],
        };
      }
      return {
        stem: `Hai tổ sản xuất của một xưởng may cùng may khẩu trang, mỗi tổ có năng suất không đổi trong mỗi ngày.\n\nBiết rằng nếu tổ I làm trong $${t1}$ ngày và tổ II làm trong $${t2}$ ngày thì cả hai tổ may được $${s1}$ chiếc; còn nếu tổ I làm trong $${t2}$ ngày và tổ II làm trong $${t1}$ ngày thì cả hai tổ may được $${s2}$ chiếc.\n\nHỏi mỗi ngày mỗi tổ may được bao nhiêu chiếc khẩu trang?`,
        answer: '',
        rubric: [
          { criterion: 'Gọi ẩn đúng, có đơn vị và điều kiện ($x,y>0$)', points: 0.5 },
          { criterion: `Lập đúng phương trình thứ nhất: $${t1}x+${t2}y=${s1}$`, points: 1 },
          { criterion: `Lập đúng phương trình thứ hai: $${t2}x+${t1}y=${s2}$`, points: 1 },
          { criterion: 'Giải hệ đúng', points: 1 },
          { criterion: `Đối chiếu điều kiện và kết luận: tổ I ${x} chiếc/ngày, tổ II ${y} chiếc/ngày`, points: 0.5 },
        ],
        thinking: [
          'Hai đại lượng chưa biết (năng suất mỗi tổ) → hai ẩn → cần hai phương trình.',
          'Mỗi tình huống trong đề cho một phương trình.',
        ],
        solution: [
          `Gọi số khẩu trang mỗi ngày tổ I và tổ II may được lần lượt là $x$, $y$ (chiếc; $x,y>0$).`,
          `Tình huống 1: $${t1}x+${t2}y=${s1}$. (1)`,
          `Tình huống 2: $${t2}x+${t1}y=${s2}$. (2)`,
          `Giải hệ (1), (2) bằng phương pháp cộng đại số ta được $x=${x}$; $y=${y}$.`,
          `Cả hai giá trị đều dương nên thoả điều kiện.`,
          `Vậy mỗi ngày tổ I may được **${x} chiếc**, tổ II may được **${y} chiếc**.`,
        ],
      };
    },
  },
];
