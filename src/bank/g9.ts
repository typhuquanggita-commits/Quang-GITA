import type { Template } from '@/types';
import { distractInt, mcOptions, reduce, simplifySqrt } from '@/lib/rng';

/* MATHGITA — NGÂN HÀNG CÂU HỎI KHỐI 9 (định hướng thi tuyển sinh vào 10) */

const sgn = (n: number, first = false) => (n < 0 ? `-${Math.abs(n)}` : first ? `${n}` : `+${n}`);

export const BANK_G9: Template[] = [
  {
    id: 'g9.he-pt', topicId: 'g9-t1', grade: 9, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Giải hệ phương trình bậc nhất hai ẩn',
    build: (r) => {
      const x = r.int(-6, 8), y = r.int(-6, 8);
      const a1 = r.int(1, 5), b1 = r.int(1, 5) * r.sign();
      const a2 = r.int(1, 5), b2 = r.int(1, 5) * r.sign();
      const det = a1 * b2 - a2 * b1;
      if (det === 0) {
        return {
          stem: 'Giải hệ phương trình $\\sys{3x+2y=7\\\\2x-2y=3}$. (Nhập theo dạng x,y.)',
          answer: '2,0.5',
          thinking: ['Quan sát hệ số của $y$ đã đối nhau ($2$ và $-2$) → cộng đại số ngay để khử $y$.'],
          solution: ['Cộng theo vế: $5x=10\\Rightarrow x=2$.', 'Thay vào: $6+2y=7\\Rightarrow y=0{,}5$.'],
        };
      }
      const c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y;
      return {
        stem: `Giải hệ phương trình $\\sys{${a1}x${sgn(b1)}y=${c1}\\\\${a2}x${sgn(b2)}y=${c2}}$. (Nhập theo dạng x,y.)`,
        answer: `${x},${y}`,
        thinking: [
          'Nhân hai vế để hệ số của một ẩn đối nhau rồi cộng đại số (hoặc rút một ẩn để thế).',
        ],
        solution: [
          `Nhân phương trình (1) với $${b2}$ và (2) với $${-b1}$ rồi cộng theo vế để khử $y$:`,
          `$(${a1}\\cdot${b2}-${a2}\\cdot${b1})x=${b2}\\cdot${c1}-${b1}\\cdot${c2}$, tức $${det}x=${b2 * c1 - b1 * c2}$.`,
          `$x=${x}$.`,
          `Thay $x=${x}$ vào (1): $${a1}\\cdot${x}${sgn(b1)}y=${c1}\\Rightarrow y=${y}$.`,
          `Vậy hệ có nghiệm duy nhất $(x;y)=(${x};${y})$.`,
        ],
      };
    },
  },
  {
    id: 'g9.he-pt-an-phu', topicId: 'g9-t1', grade: 9, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Hệ phương trình — đặt ẩn phụ',
    build: (r) => {
      const x = r.int(2, 9), y = r.int(2, 9);
      const u = 1 / x, v = 1 / y;
      const a1 = r.int(1, 4), b1 = r.int(1, 4);
      const a2 = r.int(1, 4), b2 = r.int(1, 4) * -1;
      const c1 = a1 * u + b1 * v, c2 = a2 * u + b2 * v;
      const f = (z: number) => {
        const [n, d] = reduce(Math.round(z * x * y), x * y);
        return d === 1 ? `${n}` : `\\f{${n}}{${d}}`;
      };
      return {
        stem: `Giải hệ phương trình $\\sys{\\f{${a1}}{x}+\\f{${b1}}{y}=${f(c1)}\\\\\\f{${a2}}{x}-\\f{${Math.abs(b2)}}{y}=${f(c2)}}$. (Nhập theo dạng x,y.)`,
        answer: `${x},${y}`,
        thinking: [
          'Ẩn nằm ở mẫu → đặt $u=\\f{1}{x}$, $v=\\f{1}{y}$ để tuyến tính hoá.',
          'Đừng quên điều kiện $x\\ne0$, $y\\ne0$ và bước quay về ẩn ban đầu.',
        ],
        solution: [
          `Điều kiện: $x\\ne0$, $y\\ne0$. Đặt $u=\\f{1}{x}$, $v=\\f{1}{y}$.`,
          `Hệ trở thành $\\sys{${a1}u+${b1}v=${f(c1)}\\\\${a2}u-${Math.abs(b2)}v=${f(c2)}}$`,
          `Giải hệ bậc nhất theo $u$, $v$ ta được $u=\\f{1}{${x}}$, $v=\\f{1}{${y}}$.`,
          `Quay về ẩn ban đầu: $x=${x}$, $y=${y}$ (thoả điều kiện).`,
        ],
      };
    },
  },
  {
    id: 'g9.lap-he-pt', topicId: 'g9-t1', grade: 9, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Giải bài toán bằng cách lập hệ — hai vòi nước',
    build: (r) => {
      const t1 = r.pick([10, 12, 15, 20, 24]);
      const t2 = r.pick([15, 20, 24, 30, 40]);
      const t = (t1 * t2) / (t1 + t2);
      const tR = Math.round(t * 100) / 100;
      return {
        stem: `Hai vòi nước cùng chảy vào một bể cạn thì sau $${tR}$ giờ đầy bể. Nếu chảy riêng thì vòi thứ nhất đầy bể trong $${t1}$ giờ. Hỏi vòi thứ hai chảy riêng thì bao lâu đầy bể?`,
        answer: String(t2),
        thinking: [
          'Bài toán công việc → làm việc với NĂNG SUẤT (phần bể chảy được trong 1 giờ).',
          'Năng suất cộng được, thời gian thì không.',
        ],
        solution: [
          `Gọi thời gian vòi thứ hai chảy riêng đầy bể là $x$ (giờ, $x>0$).`,
          `Trong 1 giờ: vòi 1 chảy được $\\f{1}{${t1}}$ bể, vòi 2 chảy được $\\f{1}{x}$ bể.`,
          `Cùng chảy đầy bể trong $${tR}$ giờ nên $\\f{1}{${t1}}+\\f{1}{x}=\\f{1}{${tR}}$.`,
          `$\\f{1}{x}=\\f{1}{${tR}}-\\f{1}{${t1}}=\\f{1}{${t2}}\\Rightarrow x=${t2}$ (thoả điều kiện).`,
          `Vậy vòi thứ hai chảy riêng đầy bể trong **${t2} giờ**.`,
        ],
      };
    },
  },
  {
    id: 'g9.can-dkxd', topicId: 'g9-t2', grade: 9, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Điều kiện xác định của căn thức',
    build: (r) => {
      const a = r.int(2, 6), b = r.int(1, 15);
      const [n, d] = reduce(b, a);
      const bound = d === 1 ? `${n}` : `\\f{${n}}{${d}}`;
      const correct = `$x\\ge${bound}$`;
      const [options, answer] = mcOptions(r, correct, [`$x\\le${bound}$`, `$x>${bound}$`, `$x\\ne${bound}$`]);
      return {
        stem: `Biểu thức $\\s{${a}x-${b}}$ xác định khi và chỉ khi:`,
        options, answer,
        thinking: ['Căn bậc hai có nghĩa khi biểu thức dưới dấu căn không âm.'],
        solution: [
          `$\\s{${a}x-${b}}$ xác định $\\Leftrightarrow ${a}x-${b}\\ge0$`,
          `$\\Leftrightarrow ${a}x\\ge${b}\\Leftrightarrow x\\ge${bound}$.`,
        ],
      };
    },
  },
  {
    id: 'g9.can-rutgon', topicId: 'g9-t2', grade: 9, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Rút gọn biểu thức chứa căn',
    build: (r) => {
      const a = r.int(1, 9);
      const correct = `\\f{${2 * a}}{x-${a * a}}`;
      const [options, answer] = mcOptions(r, correct, [
        `\\f{${2 * a}}{\\s{x}-${a}}`, `\\f{${2 * a}\\s{x}}{x-${a * a}}`, `\\f{${2 * a}}{x+${a * a}}`,
      ]);
      return {
        stem: `Rút gọn $P=\\f{1}{\\s{x}-${a}}-\\f{1}{\\s{x}+${a}}$ (với $x\\ge0$, $x\\ne${a * a}$).`,
        options, answer,
        thinking: [
          `Đặt $t=\\s{x}$; mẫu chung là $(t-${a})(t+${a})=t^{2}-${a * a}=x-${a * a}$.`,
          'Quy đồng rồi thu gọn tử — tử là hiệu của hai biểu thức, phải nhớ đổi dấu.',
        ],
        solution: [
          `Mẫu thức chung: $(\\s{x}-${a})(\\s{x}+${a})=x-${a * a}$.`,
          `$P=\\f{(\\s{x}+${a})-(\\s{x}-${a})}{x-${a * a}}$`,
          `$=\\f{\\s{x}+${a}-\\s{x}+${a}}{x-${a * a}}=\\f{${2 * a}}{x-${a * a}}$.`,
        ],
        pitfall: 'Quên đổi dấu khi bỏ ngoặc có dấu trừ phía trước ở tử số.',
      };
    },
  },
  {
    id: 'g9.can-vdc', topicId: 'g9-t2', grade: 9, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Giá trị lớn nhất của biểu thức chứa căn',
    build: (r) => {
      const k = r.int(2, 9);
      // P = (sqrt(x) + 1 + k)/(sqrt(x)+1) = 1 + k/(t+1), t = sqrt(x) >= 0 -> max = 1 + k tại x = 0
      return {
        stem: `Cho $P=\\f{\\s{x}+${k + 1}}{\\s{x}+1}$ với $x\\ge0$. Tìm giá trị lớn nhất của $P$.`,
        answer: String(k + 1),
        thinking: [
          `Đặt $t=\\s{x}\\ge0$ rồi tách phần nguyên theo mẫu để thấy $P$ giảm khi $t$ tăng.`,
        ],
        solution: [
          `Đặt $t=\\s{x}$, $t\\ge0$. Khi đó $P=\\f{t+${k + 1}}{t+1}=\\f{(t+1)+${k}}{t+1}=1+\\f{${k}}{t+1}$.`,
          `Vì $t\\ge0$ nên $t+1\\ge1$, suy ra $\\f{${k}}{t+1}\\le${k}$.`,
          `Do đó $P\\le${k + 1}$. Dấu “=” xảy ra khi $t=0$, tức $x=0$.`,
          `Vậy $P_{\\max}=${k + 1}$ khi $x=0$.`,
        ],
        pitfall: 'Thiếu bước chỉ ra dấu bằng là chưa kết luận được giá trị lớn nhất.',
      };
    },
  },
  {
    id: 'g9.pt-bac-hai', topicId: 'g9-t3', grade: 9, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Giải phương trình bậc hai',
    build: (r) => {
      const x1 = r.int(-8, 8), x2 = r.int(-8, 8);
      const a = r.int(1, 3);
      const b = -a * (x1 + x2), c = a * x1 * x2;
      const roots = Array.from(new Set([x1, x2])).sort((p, q) => p - q);
      return {
        stem: `Giải phương trình $${a === 1 ? '' : a}x^{2}${sgn(b)}x${sgn(c)}=0$. (Nếu có hai nghiệm, nhập cách nhau bởi dấu phẩy.)`,
        answer: roots.join(','),
        accept: [roots.slice().reverse().join(',')],
        thinking: [
          `Tính $\\Delta=b^{2}-4ac$ rồi dùng công thức nghiệm; thử nhẩm nghiệm trước nếu $a+b+c=0$ hoặc $a-b+c=0$.`,
        ],
        solution: [
          `$\\Delta=(${b})^{2}-4\\cdot${a}\\cdot(${c})=${b * b}-${4 * a * c}=${b * b - 4 * a * c}$.`,
          b * b - 4 * a * c > 0
            ? `$\\Delta>0$ nên phương trình có hai nghiệm phân biệt $x_1=${roots[0]}$, $x_2=${roots[roots.length - 1]}$.`
            : `$\\Delta=0$ nên phương trình có nghiệm kép $x=${roots[0]}$.`,
        ],
      };
    },
  },
  {
    id: 'g9.viete', topicId: 'g9-t3', grade: 9, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Hệ thức Viète — biểu thức đối xứng',
    build: (r) => {
      const b = r.int(-12, 12), c = r.int(-20, 12);
      const D = b * b - 4 * c;
      if (D <= 0) {
        return {
          stem: 'Cho phương trình $x^{2}-6x+4=0$ có hai nghiệm $x_1$, $x_2$. Tính $A=x_1^{2}+x_2^{2}$.',
          answer: '28',
          thinking: ['$A$ là biểu thức đối xứng → biểu diễn qua $S$ và $P$, KHÔNG cần giải phương trình.', '$x_1^{2}+x_2^{2}=(x_1+x_2)^{2}-2x_1x_2=S^{2}-2P$.'],
          solution: ['$S=6$; $P=4$.', '$A=S^{2}-2P=36-8=28$.'],
        };
      }
      const S = -b, P = c;
      const A = S * S - 2 * P;
      return {
        stem: `Cho phương trình $x^{2}${sgn(b)}x${sgn(c)}=0$ có hai nghiệm $x_1$, $x_2$. Tính $A=x_1^{2}+x_2^{2}$.`,
        answer: String(A),
        thinking: [
          'Biểu thức đối xứng → biểu diễn qua $S$ và $P$, KHÔNG cần giải phương trình.',
          'Nhớ kiểm tra $\\Delta\\ge0$ trước khi dùng Viète.',
        ],
        solution: [
          `$\\Delta=(${b})^{2}-4\\cdot1\\cdot(${c})=${D}>0$ nên phương trình có hai nghiệm phân biệt.`,
          `Theo Viète: $S=x_1+x_2=${S}$ ; $P=x_1x_2=${P}$.`,
          `$A=x_1^{2}+x_2^{2}=S^{2}-2P=${S * S}-${2 * P}=${A}$.`,
        ],
        pitfall: 'Dùng Viète mà chưa khẳng định phương trình có nghiệm là mất điểm lập luận.',
      };
    },
  },
  {
    id: 'g9.viete-tham-so', topicId: 'g9-t3', grade: 9, level: 'VDC', kind: 'ESSAY',
    strand: 'SO_DAI_SO', tag: 'Bài toán tham số với hệ thức Viète',
    build: (r) => {
      const k = r.int(1, 6);
      // x^2 - 2mx + m - k = 0 ; Δ' = m^2 - m + k > 0 luôn đúng nếu 1 - 4k < 0 tức k >= 1
      return {
        stem: `Cho phương trình $x^{2}-2mx+m-${k}=0$ ($m$ là tham số).\n\na) Chứng minh phương trình luôn có hai nghiệm phân biệt với mọi $m$.\n\nb) Tìm hệ thức liên hệ giữa hai nghiệm $x_1$, $x_2$ không phụ thuộc vào $m$.`,
        answer: '',
        rubric: [
          { criterion: `Tính đúng $\\Delta'=m^{2}-m+${k}$`, points: 1 },
          { criterion: `Biến đổi $\\Delta'=\\left(m-\\f{1}{2}\\right)^{2}+${k}-\\f{1}{4}>0$ và kết luận`, points: 1 },
          { criterion: `Viết đúng Viète: $S=2m$, $P=m-${k}$`, points: 0.5 },
          { criterion: `Khử $m$: từ $S=2m$ suy ra $m=\\f{S}{2}$, thay vào $P$`, points: 1 },
          { criterion: `Kết luận hệ thức $x_1+x_2-2x_1x_2-${2 * k}=0$`, points: 0.5 },
        ],
        thinking: [
          'Ý a: đưa $\\Delta\'$ về dạng bình phương cộng số dương.',
          'Ý b: viết $S$, $P$ theo $m$ rồi khử $m$ giữa hai biểu thức.',
        ],
        solution: [
          `a) $\\Delta'=m^{2}-(m-${k})=m^{2}-m+${k}=\\left(m-\\f{1}{2}\\right)^{2}+${k}-\\f{1}{4}$.`,
          `Vì $\\left(m-\\f{1}{2}\\right)^{2}\\ge0$ và $${k}-\\f{1}{4}>0$ nên $\\Delta'>0$ với mọi $m$.`,
          `Vậy phương trình luôn có hai nghiệm phân biệt với mọi $m$.`,
          `b) Theo Viète: $S=x_1+x_2=2m$ và $P=x_1x_2=m-${k}$.`,
          `Từ $S=2m$ suy ra $m=\\f{S}{2}$; thay vào $P$: $P=\\f{S}{2}-${k}$.`,
          `Nhân hai vế với 2: $2P=S-${2 * k}$, tức $x_1+x_2-2x_1x_2-${2 * k}=0$.`,
          `Đây là hệ thức liên hệ giữa hai nghiệm không phụ thuộc tham số $m$.`,
        ],
      };
    },
  },
  {
    id: 'g9.parabol', topicId: 'g9-t3', grade: 9, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Hàm số y = ax² và điểm thuộc đồ thị',
    build: (r) => {
      const a = r.int(1, 4) * r.sign();
      const x0 = r.int(-4, 4) || 2;
      const y0 = a * x0 * x0;
      const [options, answer] = mcOptions(r, String(y0), distractInt(r, y0, 4).map(String));
      return {
        stem: `Cho hàm số $y=${a}x^{2}$. Tung độ của điểm thuộc đồ thị có hoành độ $x=${x0}$ là:`,
        options, answer,
        thinking: ['Thay hoành độ vào công thức hàm số; chú ý bình phương của số âm là số dương.'],
        solution: [`$y=${a}\\cdot(${x0})^{2}=${a}\\cdot${x0 * x0}=${y0}$.`],
        pitfall: `Quên dấu ngoặc khi bình phương số âm.`,
      };
    },
  },
  {
    id: 'g9.bpt', topicId: 'g9-t4', grade: 9, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Bất phương trình bậc nhất một ẩn',
    build: (r) => {
      const a = -r.int(2, 7), b = r.int(-12, 12);
      // a x + b > 0 với a < 0  ->  x < -b/a
      const [n, d] = reduce(-b, a);
      const bound = d === 1 ? `${n}` : `\\f{${n}}{${d}}`;
      const correct = `$x<${bound}$`;
      const [options, answer] = mcOptions(r, correct, [`$x>${bound}$`, `$x\\le${bound}$`, `$x\\ge${bound}$`]);
      return {
        stem: `Tập nghiệm của bất phương trình $${a}x${sgn(b)}>0$ là:`,
        options, answer,
        thinking: ['Chuyển vế rồi chia hai vế cho hệ số ÂM → phải ĐỔI CHIỀU bất đẳng thức.'],
        solution: [
          `$${a}x>${-b}$`,
          `Chia hai vế cho $${a}<0$ nên đổi chiều: $x<\\f{${-b}}{${a}}=${bound}$.`,
        ],
        pitfall: 'Quên đổi chiều khi chia cho số âm — lỗi sai kinh điển.',
      };
    },
  },
  {
    id: 'g9.he-thuc-luong', topicId: 'g9-t5', grade: 9, level: 'TH', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Hệ thức về cạnh và đường cao',
    build: (r) => {
      const bh = r.pick([1, 2, 3, 4, 6, 8, 9]);
      const ch = r.pick([4, 9, 12, 16, 25, 27]);
      const h2 = bh * ch;
      const h = Math.sqrt(h2);
      const isInt = Number.isInteger(h);
      return {
        stem: `Tam giác $ABC$ vuông tại $A$, đường cao $AH$. Biết $BH=${bh}\\,cm$, $CH=${ch}\\,cm$. Tính độ dài $AH$ (đơn vị: cm; nếu là căn thì nhập dạng như 6, 2√3 → viết 2sqrt3).`,
        answer: isInt ? String(h) : simplifySqrt(h2).replace(/\\s\{(\d+)\}/, 'sqrt$1'),
        accept: [String(Math.round(h * 1000) / 1000)],
        thinking: ['Có hai hình chiếu của hai cạnh góc vuông → dùng hệ thức $h^{2}=b\'c\'$.'],
        solution: [
          `$AH^{2}=BH\\cdot CH=${bh}\\cdot${ch}=${h2}$.`,
          `$AH=\\s{${h2}}=${isInt ? h : simplifySqrt(h2)}\\ (cm)$.`,
        ],
      };
    },
  },
  {
    id: 'g9.ti-so-luong-giac', topicId: 'g9-t5', grade: 9, level: 'VD', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Tỉ số lượng giác — bài toán thực tế',
    build: (r) => {
      const d = r.pick([20, 25, 30, 40, 50]);
      const ang = r.pick([30, 35, 40, 45, 50, 55, 60]);
      const eye = r.pick([1.5, 1.6, 1.7]);
      const h = d * Math.tan((ang * Math.PI) / 180) + eye;
      return {
        stem: `Từ một điểm cách chân toà nhà $${d}\\,m$, người ta nhìn đỉnh toà nhà dưới góc nâng $${ang}\\deg$. Biết mắt người quan sát cao $${eye}\\,m$ so với mặt đất. Tính chiều cao toà nhà (làm tròn đến hàng phần mười, đơn vị: m).`,
        answer: String(Math.round(h * 10) / 10),
        thinking: [
          'Vẽ tam giác vuông: cạnh kề là khoảng cách ngang, cạnh đối là chiều cao tính từ tầm mắt.',
          'Dùng $\\tan$ vì liên hệ cạnh đối và cạnh kề. Đừng quên cộng chiều cao mắt.',
        ],
        solution: [
          `Gọi $h_1$ là chiều cao từ tầm mắt đến đỉnh toà nhà.`,
          `$\\tan${ang}\\deg=\\f{h_1}{${d}}\\Rightarrow h_1=${d}\\cdot\\tan${ang}\\deg\\approx${Math.round(d * Math.tan((ang * Math.PI) / 180) * 100) / 100}\\ (m)$.`,
          `Chiều cao toà nhà: $h=h_1+${eye}\\approx${Math.round(h * 10) / 10}\\ (m)$.`,
        ],
        pitfall: 'Quên cộng chiều cao mắt người quan sát.',
      };
    },
  },
  {
    id: 'g9.duong-tron', topicId: 'g9-t6', grade: 9, level: 'TH', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Độ dài cung và diện tích hình quạt',
    build: (r) => {
      const R = r.int(2, 12), n = r.pick([30, 45, 60, 90, 120, 150, 180]);
      const [ln, ld] = reduce(R * n, 180);
      const correct = ld === 1 ? `${ln}\\pi` : `\\f{${ln}\\pi}{${ld}}`;
      const [options, answer] = mcOptions(r, correct, [
        `${R * n}\\pi`, `\\f{${R * R * n}\\pi}{360}`, ld === 1 ? `${ln * 2}\\pi` : `\\f{${ln}\\pi}{${ld * 2}}`,
      ]);
      return {
        stem: `Cho đường tròn $(O;R)$ với $R=${R}\\,cm$. Tính độ dài cung có số đo $${n}\\deg$.`,
        options, answer,
        thinking: ['Công thức độ dài cung: $l=\\f{\\pi Rn}{180}$ (mẫu 180 cho ĐỘ DÀI, mẫu 360 cho DIỆN TÍCH quạt).'],
        solution: [
          `$l=\\f{\\pi Rn}{180}=\\f{\\pi\\cdot${R}\\cdot${n}}{180}=${correct}\\ (cm)$.`,
        ],
        pitfall: 'Nhầm mẫu 180 (độ dài cung) với 360 (diện tích quạt).',
      };
    },
  },
  {
    id: 'g9.goc-duong-tron', topicId: 'g9-t6', grade: 9, level: 'TH', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Góc nội tiếp và góc ở tâm',
    build: (r) => {
      const cung = r.int(40, 170);
      return {
        stem: `Cho đường tròn $(O)$ và cung $AB$ có số đo $${cung}\\deg$. Tính số đo góc nội tiếp chắn cung $AB$ (nhập số đo theo độ).`,
        answer: String(Math.round((cung / 2) * 100) / 100),
        thinking: ['Góc nội tiếp bằng NỬA số đo cung bị chắn; góc ở tâm bằng CẢ số đo cung.'],
        solution: [
          `Góc nội tiếp chắn cung $AB$ có số đo $=\\f{1}{2}\\cdot${cung}\\deg=${Math.round((cung / 2) * 100) / 100}\\deg$.`,
          `(Trong khi góc ở tâm $\\angle AOB=${cung}\\deg$.)`,
        ],
      };
    },
  },
  {
    id: 'g9.tu-giac-noi-tiep', topicId: 'g9-t6', grade: 9, level: 'VD', kind: 'TF',
    strand: 'HINH_HOC', tag: 'Tứ giác nội tiếp',
    build: (r) => {
      void r;
      return {
        stem: 'Cho tam giác $ABC$ nhọn, các đường cao $BE$ và $CF$ cắt nhau tại $H$. Xét tính đúng – sai:',
        options: [
          'Tứ giác $AEHF$ nội tiếp đường tròn đường kính $AH$',
          'Tứ giác $BFEC$ nội tiếp đường tròn đường kính $BC$',
          '$\\angle AEF=\\angle ABC$',
          'Tứ giác $BFHD$ (với $D$ là chân đường cao từ $A$) không nội tiếp',
        ],
        answer: [true, true, true, false],
        thinking: [
          'Mọi câu hình thi vào 10 đều bắt đầu bằng việc “săn” các góc vuông để tìm tứ giác nội tiếp.',
        ],
        solution: [
          '$\\angle AEH=\\angle AFH=90\\deg$, tổng hai góc đối bằng $180\\deg$ → $AEHF$ nội tiếp đường tròn đường kính $AH$. (a đúng)',
          '$\\angle BFC=\\angle BEC=90\\deg$: hai đỉnh $F$, $E$ kề nhau cùng nhìn cạnh $BC$ dưới góc vuông → $BFEC$ nội tiếp đường tròn đường kính $BC$. (b đúng)',
          'Từ $BFEC$ nội tiếp: $\\angle AEF=\\angle ABC$ (góc ngoài tại một đỉnh bằng góc trong của đỉnh đối diện). (c đúng)',
          '$\\angle BFH=\\angle BDH=90\\deg$ nên $BFHD$ cũng nội tiếp đường tròn đường kính $BH$. (d sai)',
        ],
      };
    },
  },
  {
    id: 'g9.hinh-tru-non-cau', topicId: 'g9-t7', grade: 9, level: 'TH', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Hình trụ — hình nón — hình cầu',
    build: (r) => {
      const trip = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]]);
      const [rad, h, l] = trip;
      const V = (rad * rad * h) / 3;
      return {
        stem: `Một hình nón có bán kính đáy $${rad}\\,cm$ và đường sinh $${l}\\,cm$. Tính thể tích hình nón (kết quả dạng $k\\pi$, chỉ nhập giá trị $k$).`,
        answer: String(Math.round(V * 100) / 100),
        thinking: [
          'Muốn tính thể tích cần chiều cao; dùng $l^{2}=r^{2}+h^{2}$ để tìm $h$.',
        ],
        solution: [
          `$h=\\s{l^{2}-r^{2}}=\\s{${l * l}-${rad * rad}}=\\s{${h * h}}=${h}\\ (cm)$.`,
          `$V=\\f{1}{3}\\pi r^{2}h=\\f{1}{3}\\pi\\cdot${rad * rad}\\cdot${h}=${Math.round(V * 100) / 100}\\pi\\ (cm^{3})$.`,
        ],
        pitfall: 'Nhầm đường sinh $l$ với chiều cao $h$.',
      };
    },
  },
  {
    id: 'g9.thong-ke', topicId: 'g9-t8', grade: 9, level: 'NB', kind: 'SHORT',
    strand: 'THONG_KE_XS', tag: 'Tần số tương đối',
    build: (r) => {
      const total = r.pick([40, 50, 80, 200, 250]);
      const n = r.int(4, Math.floor(total / 2));
      const f = (n / total) * 100;
      return {
        stem: `Trong một mẫu số liệu gồm $${total}$ giá trị, giá trị $x$ xuất hiện $${n}$ lần. Tính tần số tương đối của $x$ (đơn vị %, nhập số).`,
        answer: String(Math.round(f * 100) / 100),
        thinking: ['Tần số tương đối $=\\f{\\text{tần số}}{\\text{tổng số}}\\cdot100\\percent$.'],
        solution: [`$f=\\f{${n}}{${total}}\\cdot100\\percent=${Math.round(f * 100) / 100}\\percent$.`],
      };
    },
  },
  {
    id: 'g9.xac-suat', topicId: 'g9-t8', grade: 9, level: 'VD', kind: 'SHORT',
    strand: 'THONG_KE_XS', tag: 'Xác suất phép thử hai giai đoạn',
    build: (r) => {
      const kind = r.pick(['coin', 'dice'] as const);
      if (kind === 'coin') {
        return {
          stem: 'Tung một đồng xu cân đối hai lần. Tính xác suất để có ít nhất một lần xuất hiện mặt sấp (nhập dạng a/b tối giản).',
          answer: '3/4',
          accept: ['0.75'],
          thinking: [
            'Liệt kê đủ không gian mẫu bằng sơ đồ cây.',
            'Dùng phần bù: “ít nhất một lần S” là bù của “không lần nào S”.',
          ],
          solution: [
            'Không gian mẫu: $\\{NN;NS;SN;SS\\}$ — 4 kết quả đồng khả năng.',
            'Biến cố đối “không có mặt sấp” chỉ có 1 kết quả là $NN$.',
            '$P=1-\\f{1}{4}=\\f{3}{4}$.',
          ],
        };
      }
      const target = r.int(4, 10);
      let cnt = 0;
      for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) if (i + j === target) cnt++;
      const [rn, rd] = reduce(cnt, 36);
      return {
        stem: `Gieo hai con xúc xắc cân đối. Tính xác suất để tổng số chấm bằng $${target}$ (nhập dạng a/b tối giản).`,
        answer: rd === 1 ? String(rn) : `${rn}/${rd}`,
        thinking: ['Không gian mẫu có $6\\cdot6=36$ kết quả; liệt kê các cặp có tổng bằng yêu cầu.'],
        solution: [
          `Số kết quả có thể: $6\\cdot6=36$.`,
          `Số cặp $(i;j)$ với $i+j=${target}$: có $${cnt}$ cặp.`,
          `$P=\\f{${cnt}}{36}=\\f{${rn}}{${rd}}$.`,
        ],
      };
    },
  },
  {
    id: 'g9.hinh-tu-luan', topicId: 'g9-t6', grade: 9, level: 'VDC', kind: 'ESSAY',
    strand: 'HINH_HOC', tag: 'Tự luận hình học — câu hình thi vào 10',
    build: (r) => {
      void r;
      return {
        stem: 'Cho đường tròn $(O)$ và điểm $M$ nằm ngoài đường tròn. Từ $M$ kẻ hai tiếp tuyến $MA$, $MB$ tới $(O)$ ($A$, $B$ là các tiếp điểm) và một cát tuyến $MCD$ (với $C$ nằm giữa $M$ và $D$).\n\na) Chứng minh tứ giác $MAOB$ nội tiếp.\n\nb) Chứng minh $MA^{2}=MC\\cdot MD$.\n\nc) Gọi $H$ là giao điểm của $MO$ và $AB$. Chứng minh $MH\\cdot MO=MC\\cdot MD$.',
        answer: '',
        rubric: [
          { criterion: 'Vẽ hình đúng, ghi đủ ký hiệu', points: 0.5 },
          { criterion: 'Ý a: chỉ ra $\\angle MAO=\\angle MBO=90\\deg$ và kết luận tứ giác nội tiếp đường tròn đường kính $MO$', points: 1 },
          { criterion: 'Ý b: chứng minh $\\tri MAC\\sim\\tri MDA$ (góc $M$ chung, góc tiếp tuyến – dây bằng góc nội tiếp)', points: 1 },
          { criterion: 'Ý b: suy ra tỉ lệ và kết luận $MA^{2}=MC\\cdot MD$', points: 0.5 },
          { criterion: 'Ý c: chứng minh $MO\\perp AB$ tại $H$ và dùng hệ thức lượng $MA^{2}=MH\\cdot MO$', points: 1 },
          { criterion: 'Ý c: kết hợp hai kết quả để kết luận', points: 0.5 },
        ],
        thinking: [
          'Ý a: hai tiếp tuyến cho ngay hai góc vuông → tứ giác nội tiếp đường tròn đường kính $MO$.',
          'Ý b: hệ thức tích → đưa về tỉ lệ $\\f{MA}{MD}=\\f{MC}{MA}$ → tìm hai tam giác đồng dạng.',
          'Ý c: nối kết quả b với hệ thức lượng trong tam giác vuông $MAO$.',
        ],
        solution: [
          'a) Vì $MA$, $MB$ là tiếp tuyến của $(O)$ tại $A$, $B$ nên $MA\\perp OA$, $MB\\perp OB$.',
          'Suy ra $\\angle MAO=\\angle MBO=90\\deg$, tổng hai góc đối bằng $180\\deg$.',
          'Vậy tứ giác $MAOB$ nội tiếp đường tròn đường kính $MO$.',
          'b) Xét $\\tri MAC$ và $\\tri MDA$ có: $\\angle M$ chung;',
          '$\\angle MAC=\\angle MDA$ (góc tạo bởi tiếp tuyến $MA$ và dây $AC$ bằng góc nội tiếp $\\angle ADC$ cùng chắn cung $AC$).',
          'Do đó $\\tri MAC\\sim\\tri MDA$ (g.g), suy ra $\\f{MA}{MD}=\\f{MC}{MA}$, tức $MA^{2}=MC\\cdot MD$.',
          'c) Vì $MA=MB$ và $OA=OB$ nên $MO$ là đường trung trực của $AB$, do đó $MO\\perp AB$ tại $H$.',
          'Xét tam giác $MAO$ vuông tại $A$ có đường cao $AH$: $MA^{2}=MH\\cdot MO$ (hệ thức lượng).',
          'Kết hợp với ý b: $MH\\cdot MO=MA^{2}=MC\\cdot MD$. (điều phải chứng minh)',
        ],
      };
    },
  },
];
