import type { Template } from '@/types';
import { distractInt, frac, mcOptions, reduce } from '@/lib/rng';

/* MATHGITA — NGÂN HÀNG CÂU HỎI KHỐI 7 */

export const BANK_G7: Template[] = [
  {
    id: 'g7.so-huu-ti', topicId: 'g7-t1', grade: 7, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tính hợp lí số hữu tỉ',
    build: (r) => {
      const b = r.int(3, 11), a = r.int(1, b - 1);
      const d = r.int(3, 13), c = r.int(1, d - 1), e = d - c;
      // A = a/b * c/d + a/b * e/d = a/b * 1
      return {
        stem: `Tính hợp lí: $A=\\f{${a}}{${b}}\\cdot\\f{${c}}{${d}}+\\f{${a}}{${b}}\\cdot\\f{${e}}{${d}}$ (nhập kết quả tối giản dạng a/b).`,
        answer: `${a}/${b}`,
        thinking: [`Hai hạng tử đều chứa $\\f{${a}}{${b}}$ → đặt làm nhân tử chung.`, `Trong ngoặc: $\\f{${c}}{${d}}+\\f{${e}}{${d}}=\\f{${d}}{${d}}=1$.`],
        solution: [
          `$A=\\f{${a}}{${b}}\\left(\\f{${c}}{${d}}+\\f{${e}}{${d}}\\right)$`,
          `$A=\\f{${a}}{${b}}\\cdot1=\\f{${a}}{${b}}$.`,
        ],
      };
    },
  },
  {
    id: 'g7.luy-thua', topicId: 'g7-t1', grade: 7, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Lũy thừa — đưa về cùng cơ số',
    build: (r) => {
      const p = r.pick([2, 3, 5]);
      const m = r.int(2, 4), k = r.int(2, 4);       // (p^m)^k = p^(mk)
      const q = r.int(3, 9);
      const e = m * k + q;
      const correct = `${p}^{${e}}`;
      const [options, answer] = mcOptions(r, correct, [`${p}^{${m + k + q}}`, `${p}^{${m * k * q}}`, `${p}^{${e - 1}}`]);
      return {
        stem: `Rút gọn $\\left(${p}^{${m}}\\right)^{${k}}\\cdot${p}^{${q}}$ ta được:`,
        options, answer,
        thinking: ['Lũy thừa của lũy thừa thì NHÂN số mũ; nhân hai lũy thừa cùng cơ số thì CỘNG số mũ.'],
        solution: [
          `$\\left(${p}^{${m}}\\right)^{${k}}=${p}^{${m}\\cdot${k}}=${p}^{${m * k}}$.`,
          `$${p}^{${m * k}}\\cdot${p}^{${q}}=${p}^{${m * k}+${q}}=${p}^{${e}}$.`,
        ],
        pitfall: `Nhầm $(x^{m})^{n}=x^{mn}$ với $x^{m}\\cdot x^{n}=x^{m+n}$.`,
      };
    },
  },
  {
    id: 'g7.gttd', topicId: 'g7-t1', grade: 7, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Phương trình chứa giá trị tuyệt đối',
    build: (r) => {
      const a = r.int(2, 5), b = r.int(1, 9);
      const k = r.int(2, 4), c = r.int(1, 12);
      const v = r.int(2, 9);                 // |ax - b| = v
      const rhs = k * v + c;                 // k|ax-b| - c = k v - c ... dùng: k|ax-b| + c
      const x1 = (v + b) / a, x2 = (b - v) / a;
      const f = (x: number) => (Number.isInteger(x) ? String(x) : `${reduce(x * a, a)[0]}/${a}`);
      const s1 = Number.isInteger(x1) ? String(x1) : `${v + b}/${a}`;
      const s2 = Number.isInteger(x2) ? String(x2) : `${b - v}/${a}`;
      void f;
      return {
        stem: `Tìm $x$, biết $${k}\\abs{${a}x-${b}}-${c}=${rhs - 2 * c}$. (Nếu có nhiều giá trị, nhập cách nhau bởi dấu phẩy.)`,
        answer: `${s1},${s2}`,
        accept: [`${s2},${s1}`],
        thinking: [
          'Bước 1: cô lập dấu giá trị tuyệt đối về một vế.',
          'Bước 2: kiểm tra vế phải không âm.',
          'Bước 3: tách hai trường hợp — đây là nơi rất nhiều bạn quên nhánh âm.',
        ],
        solution: [
          `$${k}\\abs{${a}x-${b}}=${rhs - 2 * c}+${c}=${rhs - c}$.`,
          `$\\abs{${a}x-${b}}=${(rhs - c) / k}=${v}$.`,
          `TH1: $${a}x-${b}=${v}\\Rightarrow ${a}x=${v + b}\\Rightarrow x=${s1}$.`,
          `TH2: $${a}x-${b}=-${v}\\Rightarrow ${a}x=${b - v}\\Rightarrow x=${s2}$.`,
          `Vậy $x\\in\\{${s1};${s2}\\}$.`,
        ],
        pitfall: 'Quên nhánh âm là mất một nửa số điểm.',
      };
    },
  },
  {
    id: 'g7.can-bac-hai', topicId: 'g7-t1', grade: 7, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Căn bậc hai số học',
    build: (r) => {
      const n = r.int(4, 20);
      const sq = n * n;
      const [options, answer] = mcOptions(r, String(n), [String(-n), `${n}$ và $${-n}`, String(sq / 2)]);
      return {
        stem: `Căn bậc hai số học của $${sq}$ là:`,
        options, answer,
        thinking: ['Căn bậc hai **số học** chỉ lấy giá trị không âm.'],
        solution: [`$\\s{${sq}}=${n}$ vì $${n}\\ge0$ và $${n}^{2}=${sq}$.`],
        pitfall: `$\\s{${sq}}=${n}$ (chỉ một giá trị), nhưng $x^{2}=${sq}$ thì $x=\\pm${n}$ (hai giá trị).`,
      };
    },
  },
  {
    id: 'g7.ti-le-thuc', topicId: 'g7-t2', grade: 7, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tỉ lệ thức — tìm x, y theo tổng',
    build: (r) => {
      const m = r.int(2, 7), n = r.int(2, 9);
      const t = r.int(3, 12);
      const sum = (m + n) * t;
      return {
        stem: `Tìm hai số $x$, $y$ biết $\\f{x}{${m}}=\\f{y}{${n}}$ và $x+y=${sum}$. (Nhập theo dạng x,y.)`,
        answer: `${m * t},${n * t}`,
        thinking: ['Có TỔNG → dùng ngay tính chất dãy tỉ số bằng nhau: cộng tử, cộng mẫu.'],
        solution: [
          `$\\f{x}{${m}}=\\f{y}{${n}}=\\f{x+y}{${m}+${n}}=\\f{${sum}}{${m + n}}=${t}$.`,
          `$x=${m}\\cdot${t}=${m * t}$ ; $y=${n}\\cdot${t}=${n * t}$.`,
        ],
      };
    },
  },
  {
    id: 'g7.day-ti-so', topicId: 'g7-t2', grade: 7, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Bài toán chia tỉ lệ (theo hiệu)',
    build: (r) => {
      const [p, q, s] = r.shuffle([3, 4, 5, 6, 7]).slice(0, 3).sort((a, b) => a - b);
      const t = r.int(4, 15);
      const diff = (s - p) * t;
      const obj = r.pick(['trồng cây', 'quyên góp sách', 'thu gom giấy vụn']);
      return {
        stem: `Ba lớp 7A, 7B, 7C cùng ${obj}. Số lượng của ba lớp lần lượt tỉ lệ với $${p};${q};${s}$. Biết lớp 7C nhiều hơn lớp 7A là $${diff}$. Tính số lượng của mỗi lớp. (Nhập theo dạng a,b,c.)`,
        answer: `${p * t},${q * t},${s * t}`,
        thinking: [
          '“Tỉ lệ với” → dựng dãy tỉ số bằng nhau.',
          'Dữ kiện là HIỆU → dùng tính chất dãy tỉ số bằng nhau với phép trừ.',
        ],
        solution: [
          `Gọi số lượng của ba lớp lần lượt là $a$, $b$, $c$ ($a,b,c\\in\\Nstar$).`,
          `Theo đề: $\\f{a}{${p}}=\\f{b}{${q}}=\\f{c}{${s}}$ và $c-a=${diff}$.`,
          `$\\f{a}{${p}}=\\f{b}{${q}}=\\f{c}{${s}}=\\f{c-a}{${s}-${p}}=\\f{${diff}}{${s - p}}=${t}$.`,
          `$a=${p * t}$ ; $b=${q * t}$ ; $c=${s * t}$.`,
        ],
      };
    },
  },
  {
    id: 'g7.ti-le-nghich', topicId: 'g7-t2', grade: 7, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Đại lượng tỉ lệ nghịch',
    build: (r) => {
      const v1 = r.pick([40, 45, 50, 60]);
      const t1 = r.pick([2, 3, 4, 6]);
      const s = v1 * t1;
      const v2 = r.pick([30, 60, 75, 80, 90]).valueOf();
      const v2ok = s % v2 === 0 ? v2 : (s % 40 === 0 ? 40 : v1);
      const t2 = s / v2ok;
      return {
        stem: `Một ô tô đi từ A đến B với vận tốc $${v1}\\,km/h$ thì hết $${t1}$ giờ. Hỏi nếu đi với vận tốc $${v2ok}\\,km/h$ thì hết bao nhiêu giờ? (Quãng đường không đổi.)`,
        answer: String(Math.round(t2 * 100) / 100),
        thinking: [
          'Quãng đường không đổi → vận tốc và thời gian là hai đại lượng TỈ LỆ NGHỊCH.',
          'Dùng $v_1t_1=v_2t_2$.',
        ],
        solution: [
          `Quãng đường AB: $s=${v1}\\cdot${t1}=${s}$ (km).`,
          `Vì $s$ không đổi nên $v$ và $t$ tỉ lệ nghịch: $${v1}\\cdot${t1}=${v2ok}\\cdot t_2$.`,
          `$t_2=\\f{${s}}{${v2ok}}=${Math.round(t2 * 100) / 100}$ (giờ).`,
        ],
        pitfall: 'Vận tốc tăng thì thời gian giảm — nếu ra kết quả ngược chiều là đã nhầm sang tỉ lệ thuận.',
      };
    },
  },
  {
    id: 'g7.da-thuc-thugon', topicId: 'g7-t3', grade: 7, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Thu gọn đa thức, xác định bậc',
    build: (r) => {
      const c3 = r.int(-5, 5) || 2;
      const a = r.int(1, 6), b = r.int(1, 6);
      const c1 = r.int(-7, 7), c0 = r.int(-9, 9);
      const deg = 3;
      const [options, answer] = mcOptions(r, String(deg), ['2', '4', '5']);
      return {
        stem: `Cho đa thức $P(x)=${a}x^{2}${c3 >= 0 ? '+' : '-'}${Math.abs(c3)}x^{3}+${b}x^{2}${c1 >= 0 ? '+' : '-'}${Math.abs(c1)}x${c0 >= 0 ? '+' : '-'}${Math.abs(c0)}$. Sau khi thu gọn, bậc của $P(x)$ là:`,
        options, answer,
        thinking: ['Phải THU GỌN trước rồi mới xác định bậc.'],
        solution: [
          `Thu gọn: $P(x)=${c3}x^{3}+${a + b}x^{2}${c1 >= 0 ? '+' : '-'}${Math.abs(c1)}x${c0 >= 0 ? '+' : '-'}${Math.abs(c0)}$.`,
          `Hạng tử có bậc cao nhất là $${c3}x^{3}$ nên bậc của $P(x)$ là 3.`,
        ],
      };
    },
  },
  {
    id: 'g7.da-thuc-tinh', topicId: 'g7-t3', grade: 7, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tính giá trị đa thức',
    build: (r) => {
      const a = r.int(1, 5), b = r.int(-6, 6), c = r.int(-9, 9);
      const x = r.int(-4, 4);
      const val = a * x * x + b * x + c;
      return {
        stem: `Cho $P(x)=${a}x^{2}${b >= 0 ? '+' : '-'}${Math.abs(b)}x${c >= 0 ? '+' : '-'}${Math.abs(c)}$. Tính $P(${x})$.`,
        answer: String(val),
        thinking: ['Thay giá trị của $x$ vào, chú ý dấu ngoặc khi $x$ âm.'],
        solution: [
          `$P(${x})=${a}\\cdot(${x})^{2}${b >= 0 ? '+' : '-'}${Math.abs(b)}\\cdot(${x})${c >= 0 ? '+' : '-'}${Math.abs(c)}$`,
          `$=${a * x * x}${b * x >= 0 ? '+' : '-'}${Math.abs(b * x)}${c >= 0 ? '+' : '-'}${Math.abs(c)}=${val}$.`,
        ],
        pitfall: `Khi $x$ âm phải viết $(${x})^{2}$ có ngoặc, nếu không sẽ sai dấu.`,
      };
    },
  },
  {
    id: 'g7.nghiem-da-thuc', topicId: 'g7-t3', grade: 7, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm tham số để x = a là nghiệm',
    build: (r) => {
      const x0 = r.int(-3, 3) || 2;
      const c = r.int(-10, 10);
      // P(x) = x^2 - (m+1)x + c, P(x0) = 0  ->  x0^2 - (m+1)x0 + c = 0 -> m+1 = (x0^2+c)/x0
      const k = x0 * x0 + c;
      const m = k % x0 === 0 ? k / x0 - 1 : null;
      if (m === null) {
        return {
          stem: `Tìm $m$ để đa thức $P(x)=x^{2}-(m+1)x+6$ nhận $x=2$ làm nghiệm.`,
          answer: '4',
          thinking: ['$x=2$ là nghiệm nghĩa là $P(2)=0$ — thay vào rồi giải phương trình bậc nhất theo $m$.'],
          solution: ['$P(2)=4-2(m+1)+6=0\\Rightarrow 8-2m=0\\Rightarrow m=4$.'],
        };
      }
      return {
        stem: `Tìm $m$ để đa thức $P(x)=x^{2}-(m+1)x${c >= 0 ? '+' : '-'}${Math.abs(c)}$ nhận $x=${x0}$ làm nghiệm.`,
        answer: String(m),
        thinking: [`$x=${x0}$ là nghiệm nghĩa là $P(${x0})=0$ — thay vào rồi giải theo $m$.`],
        solution: [
          `$P(${x0})=(${x0})^{2}-(m+1)\\cdot(${x0})${c >= 0 ? '+' : '-'}${Math.abs(c)}=0$`,
          `$${x0 * x0}-${x0}(m+1)${c >= 0 ? '+' : '-'}${Math.abs(c)}=0$`,
          `$${x0}(m+1)=${k}\\Rightarrow m+1=${k / x0}\\Rightarrow m=${m}$.`,
        ],
      };
    },
  },
  {
    id: 'g7.goc-song-song', topicId: 'g7-t4', grade: 7, level: 'TH', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Góc tạo bởi hai đường thẳng song song',
    build: (r) => {
      const a = r.int(35, 145);
      return {
        stem: `Cho hai đường thẳng $a\\para b$ bị cắt bởi đường thẳng $c$. Biết một góc tạo thành có số đo $${a}\\deg$. Tính số đo góc **trong cùng phía** với góc đó (nhập số đo theo độ).`,
        answer: String(180 - a),
        thinking: ['Hai đường song song → hai góc trong cùng phía bù nhau (tổng bằng $180\\deg$).'],
        solution: [
          `Vì $a\\para b$ nên hai góc trong cùng phía bù nhau.`,
          `Số đo góc cần tìm $=180\\deg-${a}\\deg=${180 - a}\\deg$.`,
        ],
        pitfall: 'So le trong và đồng vị thì BẰNG nhau; trong cùng phía thì BÙ nhau.',
      };
    },
  },
  {
    id: 'g7.cm-song-song', topicId: 'g7-t4', grade: 7, level: 'VD', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Dấu hiệu nhận biết hai đường thẳng song song',
    build: (r) => {
      const correct = 'Hai góc so le trong bằng nhau';
      const [options, answer] = mcOptions(r, correct, [
        'Hai góc so le trong bù nhau',
        'Hai góc đồng vị bù nhau',
        'Hai góc trong cùng phía bằng nhau',
      ]);
      void r;
      return {
        stem: 'Để chứng minh hai đường thẳng song song, ta có thể chỉ ra điều kiện nào sau đây?',
        options, answer,
        thinking: ['Nhớ chính xác dấu hiệu: so le trong BẰNG nhau, đồng vị BẰNG nhau, trong cùng phía BÙ nhau.'],
        solution: [
          'Dấu hiệu nhận biết: nếu hai đường thẳng bị cắt bởi một cát tuyến tạo thành một cặp góc **so le trong bằng nhau** (hoặc **đồng vị bằng nhau**, hoặc **trong cùng phía bù nhau**) thì hai đường thẳng đó song song.',
          'Vậy đáp án đúng là “Hai góc so le trong bằng nhau”.',
        ],
      };
    },
  },
  {
    id: 'g7.tam-giac-goc', topicId: 'g7-t5', grade: 7, level: 'NB', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Tổng ba góc trong tam giác',
    build: (r) => {
      const A = r.int(30, 100), B = r.int(25, 170 - A);
      return {
        stem: `Tam giác $ABC$ có $\\angle A=${A}\\deg$, $\\angle B=${B}\\deg$. Tính số đo góc ngoài tại đỉnh $C$ (nhập số đo theo độ).`,
        answer: String(A + B),
        thinking: ['Góc ngoài tại một đỉnh bằng TỔNG hai góc trong không kề với nó.'],
        solution: [
          `$\\angle C=180\\deg-${A}\\deg-${B}\\deg=${180 - A - B}\\deg$.`,
          `Góc ngoài tại $C$ $=180\\deg-${180 - A - B}\\deg=${A + B}\\deg$ (cũng bằng $\\angle A+\\angle B$).`,
        ],
      };
    },
  },
  {
    id: 'g7.bdt-tam-giac', topicId: 'g7-t5', grade: 7, level: 'TH', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Bất đẳng thức tam giác',
    build: (r) => {
      const b = r.int(4, 9), c = r.int(b + 2, b + 8);
      const lo = c - b, hi = c + b;
      const cnt = hi - lo - 1;
      const [options, answer] = mcOptions(r, String(cnt), distractInt(r, cnt, 2).map(String));
      return {
        stem: `Tam giác $ABC$ có $AB=${b}\\,cm$, $AC=${c}\\,cm$ và độ dài $BC$ là một số nguyên (đơn vị cm). Có bao nhiêu giá trị có thể của $BC$?`,
        options, answer,
        thinking: ['Dùng bất đẳng thức tam giác để chặn hai đầu: $\\abs{b-c}<a<b+c$.'],
        solution: [
          `$\\abs{${c}-${b}}<BC<${c}+${b}$, tức $${lo}<BC<${hi}$.`,
          `$BC$ nguyên nên $BC\\in\\{${lo + 1};${lo + 2};\\dots;${hi - 1}\\}$ — có $${cnt}$ giá trị.`,
        ],
        pitfall: 'Hai đầu mút đều là dấu $<$ (không lấy bằng), nếu lấy bằng sẽ thừa 2 giá trị.',
      };
    },
  },
  {
    id: 'g7.tam-giac-can', topicId: 'g7-t5', grade: 7, level: 'TH', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Tam giác cân — tính góc',
    build: (r) => {
      const apex = r.int(20, 140);
      const base = (180 - apex) / 2;
      return {
        stem: `Tam giác $ABC$ cân tại $A$ có $\\angle A=${apex}\\deg$. Tính số đo góc $\\angle B$ (nhập số đo theo độ).`,
        answer: String(Math.round(base * 100) / 100),
        thinking: ['Tam giác cân tại $A$ thì hai góc ở đáy $\\angle B=\\angle C$.'],
        solution: [
          `Vì $\\tri ABC$ cân tại $A$ nên $\\angle B=\\angle C$.`,
          `$\\angle B+\\angle C=180\\deg-${apex}\\deg=${180 - apex}\\deg$.`,
          `$\\angle B=\\f{${180 - apex}\\deg}{2}=${Math.round(base * 100) / 100}\\deg$.`,
        ],
      };
    },
  },
  {
    id: 'g7.tam-giac-bang-nhau', topicId: 'g7-t5', grade: 7, level: 'VD', kind: 'TF',
    strand: 'HINH_HOC', tag: 'Các trường hợp bằng nhau của tam giác',
    build: (r) => {
      void r;
      return {
        stem: 'Cho tam giác $ABC$ có $AB=AC$, $M$ là trung điểm của $BC$. Xét tính đúng – sai của mỗi khẳng định:',
        options: [
          '$\\tri ABM=\\tri ACM$ theo trường hợp c.c.c',
          '$AM$ là tia phân giác của góc $\\angle BAC$',
          '$AM\\perp BC$',
          'Nếu chỉ biết $AB=AC$ và $\\angle B=\\angle C$ thì đã đủ kết luận $\\tri ABM=\\tri ACM$',
        ],
        answer: [true, true, true, false],
        thinking: ['Ba yếu tố $AB=AC$, $MB=MC$, $AM$ chung cho ngay trường hợp c.c.c; từ đó suy ra các hệ quả.'],
        solution: [
          'Xét $\\tri ABM$ và $\\tri ACM$: $AB=AC$ (gt); $MB=MC$ ($M$ là trung điểm); $AM$ chung → bằng nhau theo **c.c.c**. (a đúng)',
          'Suy ra $\\angle BAM=\\angle CAM$ nên $AM$ là phân giác góc $A$. (b đúng)',
          'Suy ra $\\angle AMB=\\angle AMC$; mà chúng kề bù nên mỗi góc bằng $90\\deg$, do đó $AM\\perp BC$. (c đúng)',
          'Ý (d) sai: $AB=AC$ và $\\angle B=\\angle C$ chỉ là hai yếu tố lặp (tam giác cân), chưa đủ ba yếu tố cho hai tam giác nhỏ.',
        ],
      };
    },
  },
  {
    id: 'g7.hinh-khoi', topicId: 'g7-t6', grade: 7, level: 'TH', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Thể tích hình hộp chữ nhật — đổi đơn vị lít',
    build: (r) => {
      const a = r.pick([60, 80, 100, 120]), b = r.pick([40, 50, 60]), h = r.pick([30, 40, 45, 50]);
      const liters = (a * b * h) / 1000;
      return {
        stem: `Một bể cá dạng hình hộp chữ nhật có chiều dài $${a}\\,cm$, chiều rộng $${b}\\,cm$. Người ta đổ nước vào bể đến khi mực nước cao $${h}\\,cm$. Tính thể tích nước trong bể theo lít.`,
        answer: String(Math.round(liters * 1000) / 1000),
        thinking: [
          'Dùng chiều cao **cột nước**, không dùng chiều cao bể.',
          'Đổi $1000\\,cm^{3}=1\\,dm^{3}=1$ lít.',
        ],
        solution: [
          `$V=${a}\\cdot${b}\\cdot${h}=${a * b * h}\\ (cm^{3})$.`,
          `$${a * b * h}\\,cm^{3}=${Math.round(liters * 1000) / 1000}\\,dm^{3}=${Math.round(liters * 1000) / 1000}$ lít.`,
        ],
        pitfall: 'Quên đổi $cm^{3}$ sang lít.',
      };
    },
  },
  {
    id: 'g7.thong-ke', topicId: 'g7-t7', grade: 7, level: 'TH', kind: 'SHORT',
    strand: 'THONG_KE_XS', tag: 'Đọc biểu đồ hình quạt tròn',
    build: (r) => {
      const total = r.pick([120, 200, 250, 400, 500]);
      const p1 = r.pick([25, 30, 35, 40]), p2 = r.pick([15, 20, 25]), p3 = r.pick([10, 15, 20]);
      const rest = 100 - p1 - p2 - p3;
      const n = Math.round((total * rest) / 100);
      return {
        stem: `Biểu đồ hình quạt tròn mô tả sở thích môn học của $${total}$ học sinh: Toán $${p1}\\percent$, Văn $${p2}\\percent$, Tiếng Anh $${p3}\\percent$, còn lại là các môn khác. Tính số học sinh thích các môn khác.`,
        answer: String(n),
        thinking: ['Tổng các phần trong biểu đồ quạt tròn luôn bằng $100\\percent$.'],
        solution: [
          `Tỉ lệ môn khác: $100\\percent-${p1}\\percent-${p2}\\percent-${p3}\\percent=${rest}\\percent$.`,
          `Số học sinh: $${total}\\cdot${rest}\\percent=${n}$ (học sinh).`,
        ],
      };
    },
  },
  {
    id: 'g7.xac-suat', topicId: 'g7-t7', grade: 7, level: 'TH', kind: 'SHORT',
    strand: 'THONG_KE_XS', tag: 'Xác suất của biến cố đồng khả năng',
    build: (r) => {
      const n = r.pick([12, 15, 18, 20, 24, 30]);
      const k = r.pick([2, 3, 4, 5]);
      const cnt = Math.floor(n / k);
      const [rn, rd] = reduce(cnt, n);
      return {
        stem: `Một hộp có $${n}$ tấm thẻ được đánh số từ 1 đến $${n}$. Rút ngẫu nhiên một thẻ. Tính xác suất rút được thẻ ghi số chia hết cho $${k}$ (nhập dạng a/b tối giản).`,
        answer: rd === 1 ? String(rn) : `${rn}/${rd}`,
        thinking: ['Đếm số bội của $k$ trong khoảng từ 1 đến $n$, rồi chia cho $n$.'],
        solution: [
          `Các thẻ chia hết cho $${k}$: $${k};${2 * k};\\dots;${cnt * k}$ — có $${cnt}$ thẻ.`,
          `$P=\\f{${cnt}}{${n}}=${frac(cnt, n)}$.`,
        ],
      };
    },
  },
  {
    id: 'g7.tu-luan-1', topicId: 'g7-t2', grade: 7, level: 'VD', kind: 'ESSAY',
    strand: 'SO_DAI_SO', tag: 'Tự luận — bài toán chia tỉ lệ',
    build: (r) => {
      const [p, q, s] = [3, 4, 5];
      const t = r.int(5, 20);
      const sum = (p + q + s) * t;
      return {
        stem: `Ba lớp 7A, 7B, 7C được giao trồng tổng cộng $${sum}$ cây xanh. Số cây của ba lớp lần lượt tỉ lệ với $${p};${q};${s}$.\n\na) Tính số cây mỗi lớp phải trồng.\n\nb) Biết mỗi cây trồng được cộng 2 điểm thi đua, tính số điểm thi đua của lớp 7C.`,
        answer: '',
        rubric: [
          { criterion: 'Gọi ẩn đúng, có đơn vị và điều kiện', points: 0.5 },
          { criterion: `Lập đúng dãy tỉ số $\\f{a}{${p}}=\\f{b}{${q}}=\\f{c}{${s}}$ và $a+b+c=${sum}$`, points: 1 },
          { criterion: `Áp dụng tính chất dãy tỉ số bằng nhau, tìm được giá trị chung $=${t}$`, points: 1 },
          { criterion: `Tính đúng ba số: $${p * t}$; $${q * t}$; $${s * t}$ và kết luận`, points: 1 },
          { criterion: `Ý b: tính đúng $${s * t}\\cdot2=${s * t * 2}$ điểm`, points: 0.5 },
        ],
        thinking: ['Đề cho TỔNG → dùng ngay tính chất dãy tỉ số bằng nhau.'],
        solution: [
          `Gọi số cây của ba lớp 7A, 7B, 7C lần lượt là $a$, $b$, $c$ (cây; $a,b,c\\in\\Nstar$).`,
          `Theo đề: $\\f{a}{${p}}=\\f{b}{${q}}=\\f{c}{${s}}$ và $a+b+c=${sum}$.`,
          `Áp dụng tính chất dãy tỉ số bằng nhau: $\\f{a}{${p}}=\\f{b}{${q}}=\\f{c}{${s}}=\\f{a+b+c}{${p}+${q}+${s}}=\\f{${sum}}{${p + q + s}}=${t}$.`,
          `Suy ra $a=${p * t}$; $b=${q * t}$; $c=${s * t}$ (đều thoả điều kiện).`,
          `Vậy ba lớp trồng lần lượt $${p * t}$, $${q * t}$ và $${s * t}$ cây.`,
          `b) Điểm thi đua của lớp 7C: $${s * t}\\cdot2=${s * t * 2}$ (điểm).`,
        ],
      };
    },
  },
];

