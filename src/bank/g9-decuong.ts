import type { Template } from '@/types';
import { mcOptions, reduce, simplifySqrt } from '@/lib/rng';

/* MATHGITA — NGÂN HÀNG KHỐI 9 (đề cương gốc)
 * Biên soạn bám sát "Đề cương ôn tập học kì II — Toán 9" và bộ chuyên đề
 * ôn thi vào 10 trong kho tư liệu GITA: tìm hai số biết tổng và tích,
 * điều kiện về dấu hai nghiệm, tương giao có tham số, điểm cố định,
 * căn kép, hệ có tham số, lập phương trình năng suất — tỉ lệ phần trăm,
 * vị trí tương đối hai đường tròn, đa giác đều nội tiếp, hình nón. */

const sgn = (n: number) => (n >= 0 ? `+${n}` : `${n}`);
/** Hiển thị số thập phân theo chuẩn Việt Nam: dấu phẩy thập phân. */
const vn = (x: number) => String(x).replace('.', '{,}');
/** Hạng tử $k\cdot v$ trong đa thức: bỏ hẳn khi $k=0$, bỏ số khi $|k|=1$. */
const hang = (k: number, v: string) => (k === 0 ? '' : `${k > 0 ? '+' : '-'}${Math.abs(k) === 1 && v ? '' : Math.abs(k)}${v}`);
/** Hệ số đứng trước một nhóm ngoặc: bỏ hẳn khi $k=0$, chỉ để dấu khi $|k|=1$. */
const heso = (k: number) => (k === 0 ? '' : k === 1 ? '+' : k === -1 ? '-' : `${k > 0 ? '+' : '-'}${Math.abs(k)}`);
/** Hệ số nhân trực tiếp: bỏ số khi bằng 1. */
const co = (k: number) => (k === 1 ? '' : String(k));

export const BANK_G9_DECUONG: Template[] = [
  /* ----------- 1. Tìm hai số biết tổng và tích ----------- */
  {
    id: 'g9.tim-hai-so', topicId: 'g9-t3', grade: 9, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Tìm hai số biết tổng và tích (Viète đảo)',
    build: (r) => {
      // Dựng ngược từ hai số nguyên u, v để bài toán luôn có nghiệm thực.
      const u = r.int(-12, 12), v = r.int(-12, 12);
      const S = u + v, P = u * v;
      const dung = `$x^{2}${sgn(-S)}x${sgn(P)}=0$`;
      const sai = [
        `$x^{2}${sgn(S)}x${sgn(P)}=0$`,
        `$x^{2}${sgn(-S)}x${sgn(-P)}=0$`,
        `$x^{2}${sgn(S)}x${sgn(-P)}=0$`,
      ];
      const [options, answer] = mcOptions(r, dung, sai);
      return {
        stem: `Nếu hai số $u$ và $v$ thoả mãn $u+v=${S}$ và $u\\cdot v=${P}$ thì $u$, $v$ là hai nghiệm của phương trình nào sau đây?`,
        options, answer,
        thinking: [
          'Định lí Viète **đảo**: hai số có tổng $S$ và tích $P$ là hai nghiệm của $x^{2}-Sx+P=0$.',
          'Chú ý dấu: hệ số của $x$ là $-S$ (**đổi dấu** tổng), hạng tử tự do là $+P$ (**giữ nguyên** tích).',
        ],
        solution: [
          `Áp dụng Viète đảo với $S=${S}$ và $P=${P}$:`,
          `$x^{2}-Sx+P=0\\Leftrightarrow x^{2}${sgn(-S)}x${sgn(P)}=0$.`,
          `Kiểm tra: $\\Delta=S^{2}-4P=${S * S}-${4 * P}=${S * S - 4 * P}\\ge0$ nên hai số $u$, $v$ tồn tại (chính là $${u}$ và $${v}$).`,
        ],
        pitfall: 'Nhớ nhầm thành $x^{2}+Sx+P=0$ — hệ số của $x$ phải **đổi dấu** tổng.',
      };
    },
  },

  /* ----------- 2. Điều kiện về dấu hai nghiệm ----------- */
  {
    id: 'g9.dau-hai-nghiem', topicId: 'g9-t3', grade: 9, level: 'VD', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Điều kiện về dấu hai nghiệm của phương trình bậc hai',
    build: (r) => {
      const loai = r.pick(['traidau', 'cungduong', 'cungam'] as const);
      const dung = loai === 'traidau'
        ? '$P<0$'
        : loai === 'cungduong'
          ? '$\\Delta>0$ ; $S>0$ ; $P>0$'
          : '$\\Delta>0$ ; $S<0$ ; $P>0$';
      const kho = [
        '$P<0$',
        '$\\Delta>0$ ; $S>0$ ; $P>0$',
        '$\\Delta>0$ ; $S<0$ ; $P>0$',
        '$\\Delta>0$ ; $P<0$ ; $S>0$',
        '$S>0$ ; $P<0$',
      ];
      const sai = kho.filter((x) => x !== dung).slice(0, 3);
      const [options, answer] = mcOptions(r, dung, sai);
      const ten = loai === 'traidau' ? 'hai nghiệm **trái dấu**'
        : loai === 'cungduong' ? 'hai nghiệm **phân biệt cùng dương**'
          : 'hai nghiệm **phân biệt cùng âm**';
      return {
        stem: `Cho phương trình $ax^{2}+bx+c=0$ ($a\\ne0$) có $S=x_1+x_2$, $P=x_1x_2$. Phương trình có ${ten} khi và chỉ khi:`,
        options, answer,
        thinking: [
          'Dấu của **tích** $P$ quyết định hai nghiệm cùng dấu hay trái dấu; dấu của **tổng** $S$ mới phân biệt cùng dương hay cùng âm.',
          'Riêng trường hợp trái dấu, $P<0$ đã tự kéo theo $\\Delta>0$ nên **không cần** ghi thêm điều kiện $\\Delta$.',
        ],
        solution: [
          loai === 'traidau'
            ? 'Hai nghiệm trái dấu $\\Leftrightarrow P=x_1x_2<0$.'
            : loai === 'cungduong'
              ? 'Hai nghiệm phân biệt cùng dương $\\Leftrightarrow \\Delta>0$ (có hai nghiệm phân biệt), $P>0$ (cùng dấu) và $S>0$ (cùng dương).'
              : 'Hai nghiệm phân biệt cùng âm $\\Leftrightarrow \\Delta>0$, $P>0$ (cùng dấu) và $S<0$ (cùng âm).',
          loai === 'traidau'
            ? 'Khi $P=\\f{c}{a}<0$ thì $ac<0$, do đó $\\Delta=b^{2}-4ac>0$ tự động thoả — không phải ghi thêm.'
            : 'Nếu thiếu điều kiện $\\Delta>0$ thì phương trình có thể có nghiệm kép hoặc vô nghiệm.',
        ],
        pitfall: 'Ghi thừa $\\Delta>0$ ở trường hợp trái dấu (không sai nhưng thừa), hoặc **thiếu** $\\Delta>0$ ở hai trường hợp cùng dấu (sai).',
      };
    },
  },

  /* ----------- 3. Tương giao (P) và (d) — biểu thức đối xứng ----------- */
  {
    id: 'g9.tuong-giao-tham-so', topicId: 'g9-t3', grade: 9, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tương giao parabol – đường thẳng với điều kiện về nghiệm',
    build: (r) => {
      // (P): y = x² ; (d): y = mx + n  ->  x² - m x - n = 0, S = m, P = -n
      const m = r.int(-6, 6);
      const n = r.int(1, 12);            // n > 0 => P < 0 => luôn cắt tại hai điểm trái dấu
      const D = m * m + 4 * n;           // (x1 - x2)² = S² - 4P
      return {
        stem: `Cho parabol $(P): y=x^{2}$ và đường thẳng $(d): y=${m}x+${n}$. Biết $(d)$ cắt $(P)$ tại hai điểm phân biệt có hoành độ $x_1$, $x_2$. Tính giá trị của $(x_1-x_2)^{2}$.`,
        answer: String(D),
        thinking: [
          `Hoành độ giao điểm là nghiệm của phương trình hoành độ giao điểm $x^{2}-${m}x-${n}=0$.`,
          '$(x_1-x_2)^{2}$ là biểu thức **đối xứng** nên quy về $S$ và $P$: $(x_1-x_2)^{2}=S^{2}-4P$ — không cần giải phương trình.',
          `Vì $P=-${n}<0$ nên phương trình chắc chắn có hai nghiệm trái dấu, tức $(d)$ luôn cắt $(P)$ tại hai điểm.`,
        ],
        solution: [
          `Phương trình hoành độ giao điểm: $x^{2}=${m}x+${n}\\Leftrightarrow x^{2}-${m}x-${n}=0$.`,
          `Theo Viète: $S=x_1+x_2=${m}$ ; $P=x_1x_2=-${n}$.`,
          `Vì $P=-${n}<0$ nên $\\Delta>0$: phương trình có hai nghiệm phân biệt (trái dấu) — đúng như giả thiết.`,
          `$(x_1-x_2)^{2}=(x_1+x_2)^{2}-4x_1x_2=S^{2}-4P=${m * m}+${4 * n}=${D}$.`,
          `(Suy ra $|x_1-x_2|=${simplifySqrt(D)}$.)`,
        ],
        pitfall: 'Viết $(x_1-x_2)^{2}=S^{2}-2P$ (nhầm với công thức của $x_1^{2}+x_2^{2}$) — đúng phải là $S^{2}-4P$.',
      };
    },
  },

  /* ----------- 4. Điểm cố định của họ đường thẳng ----------- */
  {
    id: 'g9.diem-co-dinh', topicId: 'g9-t3', grade: 9, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Điểm cố định của họ đường thẳng phụ thuộc tham số',
    build: (r) => {
      // d: y = (m + a)x - m + b = m(x - 1) + (a x + b)  ->  điểm cố định (1; a + b)
      const a = r.int(-4, 4);
      const b = r.int(-6, 6);
      const x0 = 1, y0 = a + b;
      return {
        stem: `Cho đường thẳng $(d): y=(m${sgn(a)})x-m${sgn(b)}$ với $m$ là tham số. Tìm điểm cố định mà $(d)$ luôn đi qua với **mọi** giá trị của $m$. (Nhập theo dạng x,y.)`,
        answer: `${x0},${y0}`,
        thinking: [
          'Điểm cố định $(x_0;y_0)$ là điểm mà đẳng thức đúng với **mọi** $m$ — hãy nhóm biểu thức theo $m$.',
          'Đưa về dạng $m\\cdot A+B=0$ đúng với mọi $m$ thì bắt buộc $A=0$ **và** $B=0$ — đó là hệ để tìm $x_0$, $y_0$.',
        ],
        solution: [
          `Giả sử $(d)$ luôn đi qua điểm cố định $M(x_0;y_0)$, tức $y_0=(m${sgn(a)})x_0-m${sgn(b)}$ đúng với mọi $m$.`,
          `Nhóm theo $m$: $m(x_0-1)+\\left(${a}x_0${sgn(b)}-y_0\\right)=0$ đúng với mọi $m$.`,
          `Suy ra $\\cb{x_0-1=0\\\\${a}x_0${sgn(b)}-y_0=0}$`,
          `Từ đó $x_0=1$ và $y_0=${a}\\cdot1${sgn(b)}=${y0}$.`,
          `Vậy $(d)$ luôn đi qua điểm cố định $M(${x0};${y0})$.`,
        ],
        pitfall: 'Chỉ thay hai giá trị $m$ cụ thể rồi giải hệ — cách đó tìm ra điểm nhưng **chưa chứng minh** nó cố định với mọi $m$.',
      };
    },
  },

  /* ----------- 5. Căn kép — hiệu hai căn kép cho kết quả hữu tỉ ----------- */
  {
    id: 'g9.can-kep', topicId: 'g9-t2', grade: 9, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Rút gọn căn kép $\\s{a\\pm2\\s{b}}$',
    build: (r) => {
      // (√u ± √v)² = u + v ± 2√(uv) ; chọn v là số chính phương để hiệu 2√v hữu tỉ
      const v = r.pick([1, 4, 9]);
      // u phải LỚN hơn v để $\s{u}-\s{v}>0$, và u không chính phương để căn kép không tầm thường.
      const u = r.pick([2, 3, 5, 6, 7, 10, 11, 13, 15].filter((k) => k > v));
      const a = u + v, b = u * v;
      const sv = Math.round(Math.sqrt(v));
      const kq = 2 * sv;
      return {
        stem: `Rút gọn và tính giá trị của biểu thức $A=\\s{${a}+2\\s{${b}}}-\\s{${a}-2\\s{${b}}}$.`,
        answer: String(kq),
        thinking: [
          'Nhận dạng **căn kép**: $a\\pm2\\s{b}$ luôn viết lại được thành bình phương $(\\s{u}\\pm\\s{v})^{2}$ với $u+v=a$ và $uv=b$.',
          `Ở đây cần $u+v=${a}$ và $uv=${b}$, tách được $u=${u}$, $v=${v}$.`,
          `Sau khi khai căn phải bỏ dấu **giá trị tuyệt đối** đúng chiều: vì $\\s{${u}}>\\s{${v}}$ nên $\\s{${u}}-\\s{${v}}>0$.`,
        ],
        solution: [
          `$${a}+2\\s{${b}}=${u}+2\\s{${u}}\\s{${v}}+${v}=(\\s{${u}}+\\s{${v}})^{2}$.`,
          `$${a}-2\\s{${b}}=${u}-2\\s{${u}}\\s{${v}}+${v}=(\\s{${u}}-\\s{${v}})^{2}$.`,
          `Do đó $A=\\left|\\s{${u}}+\\s{${v}}\\right|-\\left|\\s{${u}}-\\s{${v}}\\right|=(\\s{${u}}+\\s{${v}})-(\\s{${u}}-\\s{${v}})$ (vì $${u}>${v}$).`,
          `$A=2\\s{${v}}=2\\cdot${sv}=${kq}$.`,
        ],
        pitfall: `Bỏ dấu căn mà quên giá trị tuyệt đối: nếu $u<v$ thì $\\s{u}-\\s{v}<0$ và phải đổi dấu, kết quả sẽ khác.`,
      };
    },
  },

  /* ----------- 6. Hệ phương trình có tham số ----------- */
  {
    id: 'g9.he-pt-tham-so', topicId: 'g9-t1', grade: 9, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Hệ phương trình bậc nhất hai ẩn có tham số',
    build: (r) => {
      // { x + 2y = c1 ; m x + y = c2 } với điều kiện thêm x = y
      const x = r.int(2, 9);
      const c1 = 3 * x;
      const heSoM = r.int(2, 6);
      const c2 = x * heSoM;
      const m = heSoM - 1;               // m·x + x = c2 => m = c2/x - 1
      return {
        stem: `Cho hệ phương trình $\\sys{x+2y=${c1}\\\\mx+y=${c2}}$. Tìm giá trị của tham số $m$ để hệ có nghiệm duy nhất $(x;y)$ thoả mãn $x=y$.`,
        answer: String(m),
        thinking: [
          'Điều kiện $x=y$ là **thêm một phương trình** — thay $y=x$ vào phương trình **không chứa tham số** trước, sẽ tìm được ngay $x$.',
          'Có $x$ (và $y$) rồi mới thay vào phương trình chứa $m$ để giải ra $m$.',
          'Cuối cùng phải kiểm tra $m$ tìm được có bảo đảm hệ **có nghiệm duy nhất** hay không.',
        ],
        solution: [
          `Thay $y=x$ vào phương trình (1): $x+2x=${c1}\\Rightarrow 3x=${c1}\\Rightarrow x=${x}$, do đó $y=${x}$.`,
          `Thay $(x;y)=(${x};${x})$ vào phương trình (2): $m\\cdot${x}+${x}=${c2}$.`,
          `$\\Rightarrow ${x}m=${c2 - x}\\Rightarrow m=${m}$.`,
          `Kiểm tra điều kiện nghiệm duy nhất: $1\\cdot1-2\\cdot${m}=${1 - 2 * m}\\ne0$ ✓`,
          `Vậy $m=${m}$.`,
        ],
        pitfall: 'Giải hệ theo $m$ trước rồi mới áp điều kiện $x=y$ — cách đó dài gấp ba lần và rất dễ sai dấu.',
      };
    },
  },

  /* ----------- 7. Lập phương trình — năng suất vượt mức ----------- */
  {
    id: 'g9.lap-pt-vuot-muc', topicId: 'g9-t1', grade: 9, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Lập phương trình — năng suất vượt mức, hoàn thành sớm',
    build: (r) => {
      const d = r.pick([5, 10]);
      const som = r.pick([1, 2, 3]);
      const x = r.pick([20, 25, 30, 40, 50, 55, 60, 100, 110]);
      // T = x(x+d)·som/d  để cả hai số ngày đều nguyên
      if ((x * (x + d) * som) % d !== 0) {
        return {
          stem: 'Một phân xưởng theo kế hoạch phải sản xuất $1100$ sản phẩm trong một số ngày quy định. Do mỗi ngày vượt mức $5$ sản phẩm nên phân xưởng hoàn thành sớm hơn quy định $2$ ngày. Hỏi theo kế hoạch mỗi ngày phân xưởng sản xuất bao nhiêu sản phẩm?',
          answer: '50',
          thinking: [
            'Gọi $x$ là **năng suất kế hoạch** (sản phẩm/ngày); số ngày $=\\f{\\text{tổng}}{\\text{năng suất}}$.',
            'Hiệu hai số ngày chính là số ngày hoàn thành sớm — đó là phương trình.',
          ],
          solution: [
            'Gọi năng suất kế hoạch là $x$ (sản phẩm/ngày; $x\\in\\N^{*}$).',
            'Số ngày kế hoạch: $\\f{1100}{x}$ ; số ngày thực tế: $\\f{1100}{x+5}$.',
            'Hoàn thành sớm $2$ ngày: $\\f{1100}{x}-\\f{1100}{x+5}=2$.',
            '$\\Leftrightarrow 1100(x+5)-1100x=2x(x+5)\\Leftrightarrow 5500=2x^{2}+10x$.',
            '$\\Leftrightarrow x^{2}+5x-2750=0\\Rightarrow x=50$ (nhận) hoặc $x=-55$ (loại).',
            'Vậy theo kế hoạch mỗi ngày sản xuất $50$ sản phẩm.',
          ],
          pitfall: 'Quên điều kiện $x>0$ và không loại nghiệm âm — mất điểm ở bước đối chiếu.',
        };
      }
      const T = (x * (x + d) * som) / d;
      const ngay = T / x, ngay2 = T / (x + d);
      return {
        stem: `Một phân xưởng theo kế hoạch cần sản xuất $${T}$ sản phẩm trong một số ngày quy định. Do mỗi ngày phân xưởng sản xuất vượt mức $${d}$ sản phẩm nên đã hoàn thành kế hoạch sớm hơn thời gian quy định $${som}$ ngày.\n\nHỏi theo kế hoạch, mỗi ngày phân xưởng sản xuất bao nhiêu sản phẩm?`,
        answer: String(x),
        thinking: [
          'Gọi $x$ là **năng suất kế hoạch** (sản phẩm/ngày), điều kiện $x$ nguyên dương.',
          'Số ngày $=\\f{\\text{tổng sản phẩm}}{\\text{năng suất}}$ — hai phân thức, hiệu của chúng là số ngày làm sớm.',
          'Phương trình có mẫu chứa ẩn: quy đồng rồi đưa về phương trình bậc hai.',
        ],
        solution: [
          `Gọi năng suất theo kế hoạch là $x$ (sản phẩm/ngày; $x\\in\\N^{*}$).`,
          `Số ngày theo kế hoạch: $\\f{${T}}{x}$ ; số ngày thực tế: $\\f{${T}}{x+${d}}$.`,
          `Vì hoàn thành sớm $${som}$ ngày nên $\\f{${T}}{x}-\\f{${T}}{x+${d}}=${som}$.`,
          `$\\Leftrightarrow ${T}(x+${d})-${T}x=${co(som)}x(x+${d})\\Leftrightarrow ${T * d}=${co(som)}x^{2}+${som * d}x$.`,
          `$\\Leftrightarrow ${co(som)}x^{2}+${som * d}x-${T * d}=0$, giải ra $x=${x}$ (nhận) hoặc $x=${-(x + d)}$ (loại vì $x>0$).`,
          `Đối chiếu: $${T}:${x}=${ngay}$ ngày và $${T}:${x + d}=${ngay2}$ ngày, sớm hơn $${som}$ ngày ✓`,
          `Vậy theo kế hoạch mỗi ngày phân xưởng sản xuất $${x}$ sản phẩm.`,
        ],
        pitfall: 'Quên điều kiện $x>0$ và không loại nghiệm âm — mất điểm ở bước đối chiếu.',
      };
    },
  },

  /* ----------- 8. Lập hệ phương trình — bài toán tỉ lệ phần trăm ----------- */
  {
    id: 'g9.lap-he-ti-le', topicId: 'g9-t1', grade: 9, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Lập hệ phương trình — bài toán tỉ lệ phần trăm',
    build: (r) => {
      const pA = r.pick([80, 85, 90]);
      let pB = r.pick([85, 90, 95]);
      if (pB === pA) pB = pA === 90 ? 95 : 90;
      const a = r.int(2, 6) * 100;
      const b = r.int(2, 6) * 100;
      const tongDo = (a * pA) / 100 + (b * pB) / 100;
      const tong = a + b;
      const tiChung = Math.round((tongDo / tong) * 10000) / 100;
      return {
        stem: `Hai trường $A$ và $B$ có tổng cộng $${tongDo}$ học sinh thi đỗ vào lớp 10, đạt tỉ lệ $${vn(tiChung)}\\%$ so với tổng số học sinh dự thi của cả hai trường. Riêng trường $A$ tỉ lệ đỗ là $${pA}\\%$, riêng trường $B$ tỉ lệ đỗ là $${pB}\\%$.\n\nTính số học sinh **dự thi** vào lớp 10 của trường $A$.`,
        answer: String(a),
        thinking: [
          'Hai đại lượng chưa biết (số dự thi mỗi trường) → **hai ẩn**, cần hai phương trình.',
          'Phương trình 1 từ **tổng số dự thi**: suy ra từ tỉ lệ đỗ chung của cả hai trường.',
          'Phương trình 2 từ **tổng số đỗ**: cộng số học sinh đỗ của từng trường.',
        ],
        solution: [
          `Gọi số học sinh dự thi của trường $A$ là $x$, của trường $B$ là $y$ ($x,y\\in\\N^{*}$).`,
          `Tỉ lệ đỗ chung: $\\f{${tongDo}}{x+y}=${vn(tiChung)}\\%$, suy ra $x+y=\\f{${tongDo}}{${vn(tiChung / 100)}}=${tong}$. (1)`,
          `Tổng số học sinh đỗ: $${vn(pA / 100)}x+${vn(pB / 100)}y=${tongDo}$. (2)`,
          `Từ (1): $y=${tong}-x$. Thay vào (2): $${vn(pA / 100)}x+${vn(pB / 100)}(${tong}-x)=${tongDo}$.`,
          `$\\Leftrightarrow ${vn((pA - pB) / 100)}x=${vn(Math.round((tongDo - (pB / 100) * tong) * 1000) / 1000)}\\Rightarrow x=${a}$.`,
          `Vậy trường $A$ có $${a}$ học sinh dự thi (trường $B$ có $${b}$ học sinh).`,
        ],
        pitfall: 'Nhầm "số học sinh **đỗ**" với "số học sinh **dự thi**" khi gọi ẩn — đọc kĩ đề trước khi lập phương trình.',
      };
    },
  },

  /* ----------- 9. Lập hệ phương trình — hình chữ nhật đổi kích thước ----------- */
  {
    id: 'g9.lap-he-hcn', topicId: 'g9-t1', grade: 9, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Lập hệ phương trình — hình chữ nhật thay đổi kích thước',
    build: (r) => {
      const rong = r.int(3, 14);
      const dai = rong + r.int(1, 10);
      const tang = dai + rong + 1;      // (x+1)(y+1) - xy
      const giam = dai + 2 * rong - 2;  // xy - (x-2)(y-1)
      return {
        stem: `Cho một hình chữ nhật. Nếu tăng độ dài mỗi cạnh của nó thêm $1$ cm thì diện tích tăng thêm $${tang}$ cm$^{2}$. Nếu giảm chiều dài đi $2$ cm và giảm chiều rộng đi $1$ cm thì diện tích giảm $${giam}$ cm$^{2}$.\n\nTính **chiều dài** của hình chữ nhật đã cho (cm).`,
        answer: String(dai),
        thinking: [
          'Gọi chiều dài $x$, chiều rộng $y$ — mỗi tình huống trong đề cho một phương trình.',
          'Khai triển $(x+1)(y+1)-xy=x+y+1$: các hạng tử $xy$ **triệt tiêu**, còn lại phương trình bậc nhất. Đây là mấu chốt.',
          'Tương tự $xy-(x-2)(y-1)=x+2y-2$ cũng bậc nhất. Vậy bài toán quy về **hệ bậc nhất hai ẩn**.',
        ],
        solution: [
          `Gọi chiều dài là $x$ cm, chiều rộng là $y$ cm ($x>y>0$).`,
          `Tăng mỗi cạnh $1$ cm: $(x+1)(y+1)-xy=${tang}\\Leftrightarrow x+y+1=${tang}\\Leftrightarrow x+y=${tang - 1}$. (1)`,
          `Giảm dài $2$ cm, rộng $1$ cm: $xy-(x-2)(y-1)=${giam}\\Leftrightarrow x+2y-2=${giam}\\Leftrightarrow x+2y=${giam + 2}$. (2)`,
          `Lấy (2) trừ (1) theo vế: $y=${giam + 2 - (tang - 1)}$; thay vào (1) được $x=${dai}$.`,
          `Đối chiếu điều kiện: $x=${dai}>y=${rong}>0$ ✓. Vậy chiều dài là $${dai}$ cm.`,
        ],
        pitfall: 'Khai triển sót hạng tử khi nhân hai nhị thức — hãy khai triển đầy đủ rồi mới rút gọn.',
      };
    },
  },

  /* ----------- 10. Vị trí tương đối của hai đường tròn ----------- */
  {
    id: 'g9.vi-tri-hai-duong-tron', topicId: 'g9-t6', grade: 9, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Vị trí tương đối của hai đường tròn',
    build: (r) => {
      const R = r.int(5, 14);
      const rr = r.int(2, R - 2);       // luôn có r < R nên |R - r| > 0
      const hieu = R - rr, tong = R + rr;
      const loai = r.pick(['catnhau', 'tiepngoai', 'tieptrong', 'ngoainhau', 'dungnhau'] as const);
      const d = loai === 'tiepngoai' ? tong
        : loai === 'tieptrong' ? hieu
          : loai === 'ngoainhau' ? tong + r.int(1, 5)
            : loai === 'dungnhau' ? r.int(0, hieu - 1)
              : r.int(hieu + 1, tong - 1);
      const ten = { catnhau: 'Cắt nhau', tiepngoai: 'Tiếp xúc ngoài', tieptrong: 'Tiếp xúc trong', ngoainhau: 'Ở ngoài nhau', dungnhau: 'Đựng nhau' } as const;
      const sai = (Object.keys(ten) as (keyof typeof ten)[]).filter((l) => l !== loai).map((l) => ten[l]).slice(0, 3);
      const [options, answer] = mcOptions(r, ten[loai], sai);
      const ketLuan = loai === 'ngoainhau' ? `Vì $d=${d}>${tong}=R+r$ nên hai đường tròn **ở ngoài nhau** (không có điểm chung).`
        : loai === 'tiepngoai' ? `Vì $d=${d}=R+r$ nên hai đường tròn **tiếp xúc ngoài** (có đúng một điểm chung).`
          : loai === 'tieptrong' ? `Vì $d=${d}=|R-r|$ nên hai đường tròn **tiếp xúc trong** (có đúng một điểm chung).`
            : loai === 'dungnhau' ? `Vì $d=${d}<${hieu}=|R-r|$ nên đường tròn lớn **đựng** đường tròn nhỏ (không có điểm chung).`
              : `Vì $${hieu}=|R-r|<d=${d}<${tong}=R+r$ nên hai đường tròn **cắt nhau** (có hai điểm chung).`;
      return {
        stem: `Cho hai đường tròn $(O;${R}\\;cm)$ và $(O';${rr}\\;cm)$ với $OO'=${d}$ cm. Xác định vị trí tương đối của hai đường tròn:`,
        options, answer,
        thinking: [
          `So sánh $d=OO'$ với hai mốc $R+r$ và $|R-r|$ — chỉ cần hai mốc này là phân loại được hết năm trường hợp.`,
          '$d>R+r$: ngoài nhau · $d=R+r$: tiếp xúc ngoài · $|R-r|<d<R+r$: cắt nhau · $d=|R-r|$: tiếp xúc trong · $d<|R-r|$: đựng nhau.',
        ],
        solution: [
          `$R+r=${R}+${rr}=${tong}$ ; $|R-r|=${hieu}$ ; $d=${d}$.`,
          ketLuan,
        ],
        pitfall: 'Quên lấy **giá trị tuyệt đối** của $R-r$ khi $r>R$ — mốc dưới luôn là $|R-r|$.',
      };
    },
  },

  /* ----------- 11. Đa giác đều nội tiếp đường tròn ----------- */
  {
    id: 'g9.da-giac-noi-tiep', topicId: 'g9-t6', grade: 9, level: 'TH', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Đa giác đều nội tiếp đường tròn',
    build: (r) => {
      const map = [
        { q: 'Chu vi của **hình vuông** nội tiếp đường tròn $(O;R)$ bằng:', a: '$4R\\s{2}$', w: ['$2R\\s{2}$', '$4R$', '$6R$'], why: 'Đường chéo hình vuông là đường kính $2R$, nên cạnh $a=\\f{2R}{\\s{2}}=R\\s{2}$; chu vi $=4a=4R\\s{2}$.' },
        { q: 'Cạnh của **hình vuông** nội tiếp đường tròn $(O;R)$ bằng:', a: '$R\\s{2}$', w: ['$R\\s{3}$', '$2R$', '$\\f{R\\s{2}}{2}$'], why: 'Đường chéo bằng đường kính: $a\\s{2}=2R\\Rightarrow a=R\\s{2}$.' },
        { q: 'Cạnh của **tam giác đều** nội tiếp đường tròn $(O;R)$ bằng:', a: '$R\\s{3}$', w: ['$R\\s{2}$', '$2R$', '$\\f{R\\s{3}}{2}$'], why: 'Cạnh đa giác đều $n$ cạnh là $a=2R\\sin\\f{180\\deg}{n}$; với $n=3$: $a=2R\\sin60\\deg=2R\\cdot\\f{\\s{3}}{2}=R\\s{3}$.' },
        { q: 'Cạnh của **lục giác đều** nội tiếp đường tròn $(O;R)$ bằng:', a: '$R$', w: ['$R\\s{2}$', '$R\\s{3}$', '$2R$'], why: 'Sáu tam giác tạo bởi tâm và các cạnh của lục giác đều là tam giác đều, nên cạnh lục giác bằng bán kính: $a=R$.' },
      ] as const;
      const it = r.pick(map);
      const [options, answer] = mcOptions(r, it.a, [...it.w]);
      return {
        stem: it.q, options, answer,
        thinking: [
          'Công thức chung: đa giác đều $n$ cạnh nội tiếp $(O;R)$ có cạnh $a=2R\\sin\\f{180\\deg}{n}$.',
          'Ba trường hợp cần thuộc lòng: $n=3\\Rightarrow a=R\\s{3}$ ; $n=4\\Rightarrow a=R\\s{2}$ ; $n=6\\Rightarrow a=R$.',
        ],
        solution: [it.why],
        pitfall: 'Nhầm cạnh tam giác đều ($R\\s{3}$) với cạnh hình vuông ($R\\s{2}$) — nhớ theo dãy $\\s{3}$, $\\s{2}$, $1$ ứng với $3$, $4$, $6$ cạnh.',
      };
    },
  },

  /* ----------- 12. Hình nón sinh bởi tam giác vuông quay ----------- */
  {
    id: 'g9.hinh-non-quay', topicId: 'g9-t6', grade: 9, level: 'VD', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Hình nón sinh bởi tam giác vuông quay quanh cạnh góc vuông',
    build: (r) => {
      const bo = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]]);
      const [p, q, l] = bo;
      const quanhAB = r.bool();           // quay quanh AB thì AB là chiều cao, AC là bán kính
      const rBan = quanhAB ? q : p;
      const cao = quanhAB ? p : q;
      const sxq = rBan * l;
      return {
        stem: `Cho tam giác $ABC$ vuông tại $A$ với $AB=${p}$ cm và $AC=${q}$ cm. Quay tam giác đó một vòng quanh cạnh $${quanhAB ? 'AB' : 'AC'}$ ta được một hình nón.\n\nDiện tích xung quanh của hình nón đó bằng $k\\pi$ (cm$^{2}$). Tính $k$.`,
        answer: String(sxq),
        thinking: [
          'Quay quanh cạnh nào thì cạnh đó là **chiều cao** $h$, cạnh góc vuông còn lại là **bán kính đáy** $r$, và **cạnh huyền** là đường sinh $l$.',
          `Ở đây quay quanh $${quanhAB ? 'AB' : 'AC'}$ nên $h=${cao}$ cm, $r=${rBan}$ cm, $l=BC$.`,
          '$S_{xq}=\\pi r l$ — dùng **đường sinh** $l$, không dùng chiều cao $h$.',
        ],
        solution: [
          `Cạnh huyền $BC=\\s{${p}^{2}+${q}^{2}}=\\s{${p * p + q * q}}=${l}$ cm — đây chính là đường sinh $l$.`,
          `Quay quanh $${quanhAB ? 'AB' : 'AC'}$ nên bán kính đáy $r=${rBan}$ cm, chiều cao $h=${cao}$ cm.`,
          `$S_{xq}=\\pi r l=\\pi\\cdot${rBan}\\cdot${l}=${sxq}\\pi$ (cm$^{2}$). Vậy $k=${sxq}$.`,
        ],
        pitfall: `Dùng chiều cao $h=${cao}$ thay cho đường sinh $l=${l}$ trong công thức $S_{xq}$ — đó là lỗi kinh điển của dạng này.`,
      };
    },
  },

  /* ----------- 13. Độ dài cung và diện tích hình quạt ----------- */
  {
    id: 'g9.cung-quat-tinh', topicId: 'g9-t6', grade: 9, level: 'TH', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Độ dài cung tròn và diện tích hình quạt',
    build: (r) => {
      const R = r.pick([3, 5, 6, 9, 10, 12, 15, 18]);
      const n = r.pick([30, 36, 45, 60, 72, 90, 120, 180]);
      const cung = r.bool();
      const [kn, kd] = cung ? reduce(R * n, 180) : reduce(R * R * n, 360);
      const k = kd === 1 ? String(kn) : `\\f{${kn}}{${kd}}`;
      if (cung) {
        return {
          stem: `Tính độ dài cung $${n}\\deg$ của đường tròn bán kính $R=${R}$ cm. Kết quả có dạng $k\\pi$ (cm); nhập giá trị của $k$ (dạng a/b tối giản nếu là phân số).`,
          answer: kd === 1 ? String(kn) : `${kn}/${kd}`,
          thinking: [
            'Độ dài cung: $\\ell=\\f{\\pi Rn}{180}$ — bản chất là **tỉ lệ $\\f{n}{360}$ của chu vi** $2\\pi R$.',
            'Kiểm tra nhanh: cung $180\\deg$ phải cho nửa chu vi, tức $\\pi R$.',
          ],
          solution: [
            `$\\ell=\\f{\\pi Rn}{180}=\\f{\\pi\\cdot${R}\\cdot${n}}{180}=\\f{${R * n}}{180}\\pi=${k}\\pi$ (cm).`,
            `Vậy $k=${k}$.`,
          ],
          pitfall: 'Nhầm mẫu số $180$ (dùng cho độ dài cung) với $360$ (dùng cho diện tích hình quạt).',
        };
      }
      return {
        stem: `Tính diện tích hình quạt tròn có bán kính $R=${R}$ cm và cung $${n}\\deg$. Kết quả có dạng $k\\pi$ (cm$^{2}$); nhập giá trị của $k$ (dạng a/b tối giản nếu là phân số).`,
        answer: kd === 1 ? String(kn) : `${kn}/${kd}`,
        thinking: [
          'Diện tích hình quạt: $S=\\f{\\pi R^{2}n}{360}$ — bản chất là **tỉ lệ $\\f{n}{360}$ của diện tích hình tròn** $\\pi R^{2}$.',
          'Cách nhớ khác: $S=\\f{\\ell R}{2}$ với $\\ell$ là độ dài cung tương ứng.',
        ],
        solution: [
          `$S=\\f{\\pi R^{2}n}{360}=\\f{\\pi\\cdot${R * R}\\cdot${n}}{360}=\\f{${R * R * n}}{360}\\pi=${k}\\pi$ (cm$^{2}$).`,
          `Vậy $k=${k}$.`,
        ],
        pitfall: 'Quên bình phương bán kính, hoặc dùng mẫu $180$ thay vì $360$.',
      };
    },
  },

  /* ----------- 14. Phương trình bậc bốn đối xứng ----------- */
  {
    id: 'g9.pt-doi-xung-bac-4', topicId: 'g9-t3', grade: 9, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Phương trình bậc bốn đối xứng — đặt ẩn phụ',
    build: (r) => {
      // x⁴ + a x³ + b x² + a x + 1 = 0 ; chia x², đặt t = x + 1/x  ->  t² + a t + (b - 2) = 0
      const t0 = r.pick([-4, -3, -2, 2, 3, 4]);
      const t1 = r.pick([-5, -1, 1, 5]);
      const a = -(t0 + t1);
      const b = t0 * t1 + 2;
      const dem = (t: number) => (Math.abs(t) > 2 ? 2 : Math.abs(t) === 2 ? 1 : 0);
      const soNghiem = dem(t0) + dem(t1);
      const noi = (t: number) => Math.abs(t) > 2
        ? `$|${t}|>2$ nên cho **2** nghiệm $x$.`
        : Math.abs(t) === 2
          ? `$|${t}|=2$ nên cho **1** nghiệm $x$ (nghiệm kép $x=${t / 2}$).`
          : `$|${t}|<2$ nên **loại** (không có $x$ thực nào).`;
      return {
        stem: `Phương trình $x^{4}${hang(a, 'x^{3}')}${hang(b, 'x^{2}')}${hang(a, 'x')}+1=0$ có bao nhiêu nghiệm thực phân biệt?`,
        answer: String(soNghiem),
        thinking: [
          'Dãy hệ số **đối xứng** ($1,\\;a,\\;b,\\;a,\\;1$) → chia hai vế cho $x^{2}$ ($x=0$ không là nghiệm vì thay vào cho $1=0$).',
          'Ghép cặp rồi đặt $t=x+\\f{1}{x}$; khi đó $x^{2}+\\f{1}{x^{2}}=t^{2}-2$, phương trình thành bậc hai theo $t$.',
          '**Điều kiện then chốt:** $t=x+\\f{1}{x}$ chỉ nhận giá trị $|t|\\ge2$. Mỗi $t$ với $|t|>2$ cho **hai** nghiệm $x$; $|t|=2$ cho **một**; $|t|<2$ bị loại.',
        ],
        solution: [
          `Nhận thấy $x=0$ không là nghiệm. Chia hai vế cho $x^{2}$:`,
          `$\\left(x^{2}+\\f{1}{x^{2}}\\right)${heso(a)}\\left(x+\\f{1}{x}\\right)${hang(b, '')}=0$.`,
          `Đặt $t=x+\\f{1}{x}$, ta có $x^{2}+\\f{1}{x^{2}}=t^{2}-2$, phương trình trở thành $t^{2}${hang(a, 't')}${hang(b - 2, '')}=0$.`,
          `Giải ra $t=${t0}$ hoặc $t=${t1}$.`,
          `• Với $t=${t0}$: ${noi(t0)}`,
          `• Với $t=${t1}$: ${noi(t1)}`,
          `Vậy phương trình có $${soNghiem}$ nghiệm thực phân biệt.`,
        ],
        pitfall: 'Bỏ qua điều kiện $|t|\\ge2$ và kết luận thừa nghiệm — đây là bẫy chính của dạng đặt ẩn phụ này.',
      };
    },
  },

  /* ----------- 15. Tự luận rút gọn biểu thức chứa căn (câu 1 vào 10) ----------- */
  {
    id: 'g9.tl-rutgon-timx', topicId: 'g9-t2', grade: 9, level: 'VD', kind: 'ESSAY',
    strand: 'SO_DAI_SO', tag: 'Tự luận — rút gọn và bài toán phụ (câu 1 thi vào 10)',
    build: (r) => {
      const a = r.pick([1, 2, 3, 4, 5]);
      const a2 = a * a;
      const xT = r.pick([9, 16, 25, 36, 49, 64]).valueOf();
      const xTest = xT === a2 ? xT + 11 : xT;
      const sx = Math.round(Math.sqrt(xTest));
      // A = (√x + a)/√x ; B = √x/(√x - a) - a√x/(x - a²) = x/(x - a²)
      // P = A·B = √x/(√x - a) = 1 + a/(√x - a)
      // P nguyên (với x chính phương, √x = t) <=> (t - a) là ước của a
      const uoc: number[] = [];
      for (let dd = 1; dd <= a; dd++) if (a % dd === 0) uoc.push(dd, -dd);
      const nghiem = uoc.map((u) => u + a).filter((t) => t > 0 && t * t !== a2).map((t) => t * t);
      const dsNghiem = [...new Set(nghiem)].sort((p, q) => p - q);
      return {
        stem: `Cho hai biểu thức $A=\\f{\\s{x}+${a}}{\\s{x}}$ và $B=\\f{\\s{x}}{\\s{x}-${a}}-\\f{${a}\\s{x}}{x-${a2}}$ với $x>0$, $x\\ne${a2}$.\n\na) Tính giá trị của $A$ khi $x=${xTest}$.\n\nb) Rút gọn biểu thức $B$.\n\nc) Đặt $P=A\\cdot B$. Tìm các giá trị $x$ là **số chính phương** để $P$ nhận giá trị nguyên.`,
        answer: '',
        rubric: [
          { criterion: `a) Tính $\\s{${xTest}}=${sx}$, thay đúng và được $A=\\f{${sx + a}}{${sx}}$`, points: 1 },
          { criterion: `b) Phân tích $x-${a2}=(\\s{x}-${a})(\\s{x}+${a})$ để tìm mẫu thức chung`, points: 1 },
          { criterion: `b) Quy đồng, rút gọn được $B=\\f{x}{x-${a2}}$`, points: 1 },
          { criterion: `c) Tính và rút gọn $P=A\\cdot B=\\f{\\s{x}}{\\s{x}-${a}}$`, points: 1 },
          { criterion: `c) Tách $P=1+\\f{${a}}{\\s{x}-${a}}$, lập bảng ước và đối chiếu điều kiện`, points: 1 },
        ],
        thinking: [
          `Bước đầu tiên của mọi bài rút gọn: **phân tích các mẫu thành nhân tử**. Ở đây $x-${a2}=(\\s{x}-${a})(\\s{x}+${a})$ — đây là mẫu thức chung.`,
          'Ý a chỉ cần **thay số**, nhưng phải đối chiếu điều kiện xác định trước khi thay.',
          `Ý c: sau khi rút gọn được $P$, hãy **tách phần nguyên**: $\\f{\\s{x}}{\\s{x}-${a}}=1+\\f{${a}}{\\s{x}-${a}}$.`,
          `$P$ nguyên $\\Leftrightarrow \\s{x}-${a}$ là **ước** của $${a}$; vì $x$ chính phương nên $\\s{x}$ là số nguyên dương, lập bảng ước là xong.`,
        ],
        solution: [
          `**a)** $x=${xTest}$ thoả điều kiện ($x>0$, $x\\ne${a2}$). Ta có $\\s{${xTest}}=${sx}$.`,
          `$A=\\f{${sx}+${a}}{${sx}}=\\f{${sx + a}}{${sx}}$.`,
          `**b)** Mẫu thức chung: $x-${a2}=(\\s{x}-${a})(\\s{x}+${a})$.`,
          `$B=\\f{\\s{x}(\\s{x}+${a})}{(\\s{x}-${a})(\\s{x}+${a})}-\\f{${a}\\s{x}}{(\\s{x}-${a})(\\s{x}+${a})}=\\f{x+${a}\\s{x}-${a}\\s{x}}{(\\s{x}-${a})(\\s{x}+${a})}$.`,
          `$B=\\f{x}{(\\s{x}-${a})(\\s{x}+${a})}=\\f{x}{x-${a2}}$.`,
          `**c)** $P=A\\cdot B=\\f{\\s{x}+${a}}{\\s{x}}\\cdot\\f{x}{(\\s{x}-${a})(\\s{x}+${a})}=\\f{x}{\\s{x}(\\s{x}-${a})}=\\f{\\s{x}}{\\s{x}-${a}}$.`,
          `Tách phần nguyên: $P=\\f{(\\s{x}-${a})+${a}}{\\s{x}-${a}}=1+\\f{${a}}{\\s{x}-${a}}$.`,
          `Đặt $t=\\s{x}$ ($t$ nguyên dương vì $x$ chính phương, $t\\ne${a}$). $P$ nguyên $\\Leftrightarrow (t-${a})\\in\\text{Ư}(${a})=\\{${uoc.sort((p, q) => p - q).join(';')}\\}$.`,
          `Suy ra $t\\in\\{${[...new Set(uoc.map((u) => u + a).filter((t) => t > 0))].sort((p, q) => p - q).join(';')}\\}$, tức $x\\in\\{${dsNghiem.join(';')}\\}$.`,
          `Đối chiếu điều kiện $x>0$, $x\\ne${a2}$: tất cả các giá trị trên đều thoả. Vậy $x\\in\\{${dsNghiem.join(';')}\\}$.`,
        ],
      };
    },
  },
];
