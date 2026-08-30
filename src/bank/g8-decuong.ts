import type { Template } from '@/types';
import { distractInt, mcOptions, reduce, round } from '@/lib/rng';

/* MATHGITA — NGÂN HÀNG KHỐI 8 (đề cương gốc)
 * Biên soạn bám sát "Đề cương ôn tập cuối kì II – Toán 8 (KNTT)" và
 * "Đề cương giữa kì II – Toán 8" trong kho tư liệu GITA:
 * phương trình chứa mẫu, giải bài toán bằng cách lập phương trình
 * (chuyển động dòng nước, giảm giá, chu vi, chia tổ), hàm số bậc nhất và
 * hệ số góc, xác suất thực nghiệm, hình chóp tam giác đều, tỉ số đồng dạng. */

const sgn = (n: number) => (n >= 0 ? `+${n}` : `${n}`);
/** Hiển thị số thập phân theo chuẩn Việt Nam: dấu phẩy thập phân. */
const vn = (x: number) => String(x).replace('.', '{,}');
/** Hệ số đứng trước ẩn: 1 và -1 thì không viết số. */
const co = (k: number) => (k === 1 ? '' : k === -1 ? '-' : String(k));

export const BANK_G8_DECUONG: Template[] = [
  /* ----------- 1. Phương trình chứa mẫu số ----------- */
  {
    id: 'g8.pt-chua-mau', topicId: 'g8-t3', grade: 8, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Giải phương trình có mẫu số',
    build: (r) => {
      // Dựng ngược từ nghiệm x0: (a x + b)/m - (c x + d)/n = e
      const m = r.pick([2, 3, 4, 6]);
      const n = r.pick([2, 3, 4, 5, 6]);
      const a = r.int(1, 5), c = r.int(1, 5);
      const x0 = r.int(-5, 7);
      const e = r.int(-4, 6);
      const k = r.int(-2, 3);
      const d = n * k - c * x0;
      const b = m * e - a * x0 + m * k;
      const L = m * n;
      const heSo = n * a - m * c;
      if (heSo === 0 || Math.abs(b) > 60 || Math.abs(d) > 60) {
        return {
          stem: 'Giải phương trình $\\f{2x-1}{3}-\\f{x+2}{4}=1$.',
          answer: '22/5',
          thinking: [
            'Bước 1: tìm **BCNN của các mẫu**, nhân hai vế với số đó để khử mẫu.',
            'Bước 2: bỏ ngoặc (dấu trừ trước ngoặc đổi dấu tất cả các hạng tử), chuyển vế, thu gọn.',
          ],
          solution: [
            'BCNN$(3;4)=12$. Nhân hai vế với $12$: $4(2x-1)-3(x+2)=12$.',
            '$8x-4-3x-6=12\\Leftrightarrow 5x=22\\Leftrightarrow x=\\f{22}{5}$.',
          ],
          pitfall: 'Nhân mẫu vào vế trái mà quên nhân vào vế phải là lỗi mất điểm phổ biến.',
        };
      }
      const veSau = L * e - (n * b - m * d);
      return {
        stem: `Giải phương trình $\\f{${co(a)}x${sgn(b)}}{${m}}-\\f{${co(c)}x${sgn(d)}}{${n}}=${e}$.`,
        answer: String(x0),
        thinking: [
          'Bước 1: tìm **BCNN của các mẫu**, nhân hai vế với số đó để khử mẫu.',
          'Bước 2: bỏ ngoặc — dấu trừ trước ngoặc đổi dấu **tất cả** các hạng tử bên trong.',
          'Bước 3: chuyển các hạng tử chứa $x$ về một vế, hằng số về vế còn lại rồi thu gọn.',
        ],
        solution: [
          `BCNN của $${m}$ và $${n}$ là $${L}$. Nhân hai vế với $${L}$:`,
          `$${n}(${co(a)}x${sgn(b)})-${m}(${co(c)}x${sgn(d)})=${L * e}$.`,
          `$${co(n * a)}x${sgn(n * b)}-${co(m * c)}x${sgn(-m * d)}=${L * e}$.`,
          `$${co(heSo)}x=${veSau}\\Rightarrow x=${x0}$.`,
          `Thử lại với $x=${x0}$: $\\f{${a * x0 + b}}{${m}}-\\f{${c * x0 + d}}{${n}}=${(a * x0 + b) / m}-(${(c * x0 + d) / n})=${e}$ ✓`,
        ],
        pitfall: 'Dấu trừ đứng trước phân thức phải đổi dấu **cả tử**, không chỉ hạng tử đầu.',
      };
    },
  },

  /* ----------- 2. Lập phương trình — bài toán giảm giá ----------- */
  {
    id: 'g8.lap-pt-giam-gia', topicId: 'g8-t3', grade: 8, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Lập phương trình — bài toán giảm giá phần trăm',
    build: (r) => {
      const gA = r.int(8, 25);            // giá niêm yết tivi (triệu)
      const gB = r.int(5, 20);            // giá niêm yết tủ lạnh (triệu)
      const pA = r.pick([10, 15, 20, 25, 30]);
      let pB = r.pick([10, 15, 20, 25]);
      if (pB === pA) pB = pA === 10 ? 20 : 10;
      const tong = gA + gB;
      const traRaw = gA * (100 - pA) / 100 + gB * (100 - pB) / 100;
      const tra = Math.round(traRaw * 1000) / 1000;
      return {
        stem: `Tổng giá niêm yết của một chiếc tivi loại A và một chiếc tủ lạnh loại B là $${tong}$ triệu đồng. Trong đợt khuyến mãi, tivi loại A được giảm $${pA}\\%$ và tủ lạnh loại B được giảm $${pB}\\%$, nên bác Cường mua cả hai với tổng số tiền $${vn(tra)}$ triệu đồng.\n\nHỏi giá niêm yết của chiếc **tivi loại A** là bao nhiêu triệu đồng?`,
        answer: String(gA),
        thinking: [
          'Gọi $x$ là giá niêm yết của tivi thì giá niêm yết của tủ lạnh là $' + tong + '-x$ — một ẩn là đủ.',
          `Giảm $${pA}\\%$ nghĩa là chỉ phải trả $${100 - pA}\\%$ giá gốc, tức nhân với $${vn((100 - pA) / 100)}$.`,
          'Phương trình lập từ **tổng số tiền thực trả**.',
        ],
        solution: [
          `Gọi giá niêm yết của tivi loại A là $x$ (triệu đồng; $0<x<${tong}$).`,
          `Giá niêm yết của tủ lạnh loại B là $${tong}-x$ (triệu đồng).`,
          `Số tiền thực trả: $${vn((100 - pA) / 100)}x+${vn((100 - pB) / 100)}(${tong}-x)=${vn(tra)}$.`,
          `$\\Leftrightarrow ${vn((100 - pA) / 100)}x+${vn(Number(round(((100 - pB) / 100) * tong, 3)))}-${vn((100 - pB) / 100)}x=${vn(tra)}$`,
          `$\\Leftrightarrow ${vn(Number(round((pB - pA) / 100, 3)))}x=${vn(Number(round(tra - ((100 - pB) / 100) * tong, 3)))}\\Rightarrow x=${gA}$.`,
          `Vậy giá niêm yết của tivi loại A là $${gA}$ triệu đồng (tủ lạnh: $${gB}$ triệu đồng).`,
        ],
        pitfall: `Nhân với $${pA}\\%$ (phần được giảm) thay vì $${100 - pA}\\%$ (phần phải trả) là lỗi sai bản chất.`,
      };
    },
  },

  /* ----------- 3. Lập phương trình — ca nô xuôi ngược dòng ----------- */
  {
    id: 'g8.lap-pt-cano', topicId: 'g8-t3', grade: 8, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Lập phương trình — ca nô xuôi dòng, ngược dòng',
    build: (r) => {
      const t1 = r.int(2, 5);             // giờ xuôi
      const t2 = t1 + r.int(1, 3);        // giờ ngược (lâu hơn)
      const vn = r.pick([2, 3, 4, 5, 10]); // vận tốc dòng nước
      // S = (v + vn) t1 = (v - vn) t2  ->  v (t1 - t2) = -vn(t1 + t2) -> v = vn(t1+t2)/(t2-t1)
      const num = vn * (t1 + t2), den = t2 - t1;
      if (num % den !== 0) {
        return {
          stem: 'Một ca nô xuôi dòng từ bến $A$ đến bến $B$ mất $4$ giờ và ngược dòng từ $B$ về $A$ mất $5$ giờ. Vận tốc dòng nước là $10$ km/h. Tính khoảng cách $AB$ (km).',
          answer: '360',
          thinking: ['Gọi vận tốc riêng của ca nô là $x$; quãng đường xuôi và ngược là **như nhau** — đó là phương trình.'],
          solution: [
            'Gọi vận tốc riêng của ca nô là $x$ (km/h; $x>10$).',
            'Vận tốc xuôi $=x+10$, vận tốc ngược $=x-10$.',
            'Quãng đường bằng nhau: $4(x+10)=5(x-10)\\Rightarrow 4x+40=5x-50\\Rightarrow x=90$.',
            'Vậy $AB=4(90+10)=360$ km.',
          ],
          pitfall: 'Quên rằng vận tốc riêng phải lớn hơn vận tốc dòng nước thì ca nô mới ngược dòng được.',
        };
      }
      const v = num / den;
      const S = (v + vn) * t1;
      return {
        stem: `Một ca nô xuôi dòng từ bến $A$ đến bến $B$ mất $${t1}$ giờ và ngược dòng từ bến $B$ về bến $A$ mất $${t2}$ giờ. Biết vận tốc của dòng nước là $${vn}$ km/h. Tính khoảng cách giữa hai bến $A$ và $B$ (km).`,
        answer: String(S),
        thinking: [
          'Gọi $x$ là **vận tốc riêng** của ca nô (khi nước lặng), điều kiện $x>' + vn + '$.',
          `Xuôi dòng thì cộng vận tốc nước: $x+${vn}$; ngược dòng thì trừ: $x-${vn}$.`,
          'Phương trình đến từ chỗ **quãng đường đi và về bằng nhau**.',
        ],
        solution: [
          `Gọi vận tốc riêng của ca nô là $x$ (km/h; $x>${vn}$).`,
          `Vận tốc xuôi dòng: $x+${vn}$ (km/h); vận tốc ngược dòng: $x-${vn}$ (km/h).`,
          `Quãng đường $AB$ không đổi nên $${t1}(x+${vn})=${t2}(x-${vn})$.`,
          `$\\Leftrightarrow ${t1}x+${t1 * vn}=${t2}x-${t2 * vn}\\Leftrightarrow ${den === 1 ? `x=${v}` : `${den}x=${num}\\Rightarrow x=${v}`}$ (thoả điều kiện).`,
          `Vậy $AB=${t1}\\cdot(${v}+${vn})=${S}$ km.`,
        ],
        pitfall: 'Lấy vận tốc trung bình của xuôi và ngược để tính quãng đường là **sai** — thời gian hai chiều khác nhau.',
      };
    },
  },

  /* ----------- 4. Lập phương trình — chu vi hình chữ nhật không đổi ----------- */
  {
    id: 'g8.lap-pt-chu-vi', topicId: 'g8-t3', grade: 8, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Lập phương trình — kích thước hình chữ nhật',
    build: (r) => {
      // Giảm dài đi 1/p dài cũ, tăng rộng thêm 1/q rộng cũ, chu vi không đổi
      // => d/p = r/q  => d*q = r*p
      const p = r.pick([4, 5, 6]);
      const q = r.pick([3, 4, 5]);
      const k = r.int(2, 12);
      const dai = p * k, rong = q * k;    // d/p = k = r/q ✓
      if (dai <= rong) {
        return {
          stem: 'Một khu vườn hình chữ nhật có chu vi $450$ m. Nếu giảm chiều dài đi $\\f{1}{5}$ chiều dài cũ và tăng chiều rộng thêm $\\f{1}{4}$ chiều rộng cũ thì chu vi không đổi. Tính chiều dài khu vườn (m).',
          answer: '125',
          thinking: ['Chu vi không đổi ⇔ tổng dài + rộng không đổi ⇔ phần giảm của chiều dài **bằng đúng** phần tăng của chiều rộng.'],
          solution: [
            'Gọi chiều dài là $x$ (m), chiều rộng là $225-x$ (m) (vì nửa chu vi $=225$).',
            'Chu vi không đổi nên $\\f{x}{5}=\\f{225-x}{4}\\Rightarrow 4x=1125-5x\\Rightarrow 9x=1125\\Rightarrow x=125$.',
            'Vậy chiều dài là $125$ m, chiều rộng $100$ m.',
          ],
        };
      }
      const nua = dai + rong;
      const chuVi = 2 * nua;
      return {
        stem: `Một khu vườn hình chữ nhật có chu vi $${chuVi}$ m. Nếu giảm chiều dài đi $\\f{1}{${p}}$ chiều dài cũ và tăng chiều rộng thêm $\\f{1}{${q}}$ chiều rộng cũ thì chu vi hình chữ nhật **không đổi**. Tính chiều dài khu vườn (m).`,
        answer: String(dai),
        thinking: [
          `Chu vi $=2(\\text{dài}+\\text{rộng})$, nên chu vi không đổi $\\Leftrightarrow$ **tổng** dài và rộng không đổi.`,
          `Vậy phần giảm đi của chiều dài phải bằng đúng phần tăng thêm của chiều rộng: $\\f{\\text{dài}}{${p}}=\\f{\\text{rộng}}{${q}}$.`,
        ],
        solution: [
          `Nửa chu vi: $${chuVi}:2=${nua}$ (m).`,
          `Gọi chiều dài là $x$ (m; $0<x<${nua}$) thì chiều rộng là $${nua}-x$ (m).`,
          `Chu vi không đổi nên phần giảm bằng phần tăng: $\\f{x}{${p}}=\\f{${nua}-x}{${q}}$.`,
          `$\\Leftrightarrow ${q}x=${p}(${nua}-x)\\Leftrightarrow ${q}x+${p}x=${p * nua}\\Leftrightarrow ${p + q}x=${p * nua}$.`,
          `$x=${dai}$ (thoả điều kiện). Vậy chiều dài là $${dai}$ m, chiều rộng $${rong}$ m.`,
        ],
        pitfall: 'Nhầm "chu vi không đổi" thành "diện tích không đổi" — hai điều kiện cho hai phương trình hoàn toàn khác nhau.',
      };
    },
  },

  /* ----------- 5. Hàm số bậc nhất — hệ số góc và điểm đi qua ----------- */
  {
    id: 'g8.he-so-goc', topicId: 'g8-t4', grade: 8, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Xác định đường thẳng theo hệ số góc và điểm đi qua',
    build: (r) => {
      const a = r.int(-5, 5) || 3;
      const x0 = r.int(-4, 5), y0Base = r.int(-6, 6);
      const b = y0Base;
      const y0 = a * x0 + b;
      return {
        stem: `Xác định đường thẳng $(d): y=ax+b$ đi qua điểm $M(${x0};${y0})$ và có hệ số góc bằng $${a}$. Tính giá trị của $b$.`,
        answer: String(b),
        thinking: [
          '**Hệ số góc** chính là hệ số $a$ đứng trước $x$ — đề cho hệ số góc là cho luôn $a$.',
          'Đường thẳng đi qua một điểm nghĩa là **thay toạ độ điểm đó vào** thì được đẳng thức đúng.',
        ],
        solution: [
          `Hệ số góc bằng $${a}$ nên $a=${a}$, đường thẳng có dạng $y=${a}x+b$.`,
          `$(d)$ đi qua $M(${x0};${y0})$ nên $${y0}=${a}\\cdot(${x0})+b$.`,
          `$\\Rightarrow b=${y0}-(${a * x0})=${b}$.`,
          `Vậy $(d): y=${a}x${sgn(b)}$.`,
        ],
        pitfall: 'Thay nhầm thứ tự hoành độ và tung độ khi thế điểm $M(x_0;y_0)$.',
      };
    },
  },

  /* ----------- 6. Giao điểm của hai đường thẳng ----------- */
  {
    id: 'g8.giao-diem-hai-duong', topicId: 'g8-t4', grade: 8, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Toạ độ giao điểm của hai đường thẳng',
    build: (r) => {
      const x = r.int(-5, 6), y = r.int(-6, 8);
      let a1 = r.int(-4, 4) || 2, a2 = r.int(-4, 4) || -1;
      if (a1 === a2) a2 = a1 + 1;
      const b1 = y - a1 * x, b2 = y - a2 * x;
      return {
        stem: `Cho hai đường thẳng $(d_1): y=${a1}x${sgn(b1)}$ và $(d_2): y=${a2}x${sgn(b2)}$. Tìm toạ độ giao điểm của chúng. (Nhập theo dạng x,y.)`,
        answer: `${x},${y}`,
        thinking: [
          `Hai đường thẳng cắt nhau khi hệ số góc khác nhau: $${a1}\\ne${a2}$ ✓.`,
          'Toạ độ giao điểm là nghiệm của **phương trình hoành độ giao điểm**: cho hai vế phải bằng nhau.',
        ],
        solution: [
          `Vì $${a1}\\ne${a2}$ nên $(d_1)$ và $(d_2)$ cắt nhau tại đúng một điểm.`,
          `Phương trình hoành độ giao điểm: $${a1}x${sgn(b1)}=${a2}x${sgn(b2)}$.`,
          `$\\Leftrightarrow ${a1 - a2}x=${b2 - b1}\\Rightarrow x=${x}$.`,
          `Thay vào $(d_1)$: $y=${a1}\\cdot(${x})${sgn(b1)}=${y}$.`,
          `Vậy giao điểm là $A(${x};${y})$.`,
        ],
        pitfall: 'Tìm được $x$ rồi quên thay lại để tính $y$ — đề hỏi **toạ độ**, phải đủ hai số.',
      };
    },
  },

  /* ----------- 7. Xác suất thực nghiệm từ bảng tần số ----------- */
  {
    id: 'g8.xac-suat-thuc-nghiem-bang', topicId: 'g8-t8', grade: 8, level: 'TH', kind: 'SHORT',
    strand: 'THONG_KE_XS', tag: 'Xác suất thực nghiệm từ bảng thống kê',
    build: (r) => {
      const nhan = [2, 3, 4, 5, 6, 7];
      const f = nhan.map(() => r.int(2, 8));
      const tren7 = r.int(2, 6);
      const N = f.reduce((s, x) => s + x, 0) + tren7;
      const hoi = r.pick(['tren7', 'duoi5'] as const);
      const so = hoi === 'tren7' ? tren7 : f[0] + f[1] + f[2];
      const [n0, d0] = reduce(so, N);
      return {
        stem: `Một cửa hàng bán xe đạp điện thống kê số ngày theo lượng xe bán ra:\n\n${nhan.map((v, i) => `**${v} chiếc**: $${f[i]}$ ngày`).join(' · ')} · **trên 7 chiếc**: $${tren7}$ ngày. (Tổng $N=${N}$ ngày.)\n\nTính xác suất thực nghiệm của biến cố ${hoi === 'tren7' ? '$G$: "Ngày bán được **nhiều hơn 7** chiếc xe"' : '$H$: "Ngày bán được **dưới 5** chiếc xe"'}. (Nhập dạng a/b tối giản.)`,
        answer: d0 === 1 ? String(n0) : `${n0}/${d0}`,
        thinking: [
          'Xác suất thực nghiệm $=\\f{\\text{số lần biến cố xảy ra}}{\\text{tổng số lần thực hiện}}$.',
          hoi === 'tren7'
            ? 'Chú ý "nhiều hơn 7" chỉ lấy đúng cột "trên 7", **không** gồm cột $7$.'
            : '"Dưới 5" gồm các cột $2$, $3$, $4$ — **không** gồm cột $5$.',
        ],
        solution: [
          hoi === 'tren7'
            ? `Số ngày bán nhiều hơn $7$ chiếc: $${tren7}$.`
            : `Số ngày bán dưới $5$ chiếc: $${f[0]}+${f[1]}+${f[2]}=${so}$.`,
          `Tổng số ngày: $N=${N}$.`,
          `Xác suất thực nghiệm: $\\f{${so}}{${N}}=\\f{${n0}}{${d0}}$.`,
        ],
        pitfall: 'Ranh giới "dưới"/"nhiều hơn" là **không** bao gồm giá trị mốc; "không quá"/"ít nhất" thì mới bao gồm.',
      };
    },
  },

  /* ----------- 8. Hình chóp tam giác đều ----------- */
  {
    id: 'g8.chop-tam-giac-deu', topicId: 'g8-t7', grade: 8, level: 'TH', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Diện tích xung quanh hình chóp tam giác đều',
    build: (r) => {
      const c = r.pick([4, 5, 6, 8, 10, 12]);
      const d = r.pick([6, 8, 10, 12, 15, 20]);
      const sxq = (3 * c * d) / 2;
      const [options, answer] = mcOptions(r, `$${sxq}\\;cm^{2}$`, distractInt(r, sxq, Math.max(4, Math.round(sxq / 8))).map((v) => `$${v}\\;cm^{2}$`));
      return {
        stem: `Một hình chóp tam giác đều có độ dài cạnh đáy là $${c}$ cm và độ dài trung đoạn là $${d}$ cm. Diện tích xung quanh của hình chóp đó là:`,
        options, answer,
        thinking: [
          'Diện tích xung quanh hình chóp đều $=\\f{1}{2}\\cdot$ (chu vi đáy) $\\cdot$ (trung đoạn).',
          'Đáy là tam giác đều cạnh $' + c + '$ nên chu vi đáy $=3\\cdot' + c + '=' + 3 * c + '$ cm.',
        ],
        solution: [
          `Chu vi đáy: $C=3\\cdot${c}=${3 * c}$ (cm).`,
          `$S_{xq}=\\f{1}{2}\\cdot C\\cdot d=\\f{1}{2}\\cdot${3 * c}\\cdot${d}=${sxq}$ (cm$^{2}$).`,
        ],
        pitfall: 'Nhầm **trung đoạn** (đường cao mặt bên) với **chiều cao hình chóp** — trung đoạn dùng cho $S_{xq}$, chiều cao dùng cho thể tích.',
      };
    },
  },

  /* ----------- 9. Thể tích hình chóp ----------- */
  {
    id: 'g8.the-tich-chop', topicId: 'g8-t7', grade: 8, level: 'TH', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Thể tích hình chóp đều',
    build: (r) => {
      const S = r.pick([120, 150, 180, 240, 300, 360, 1560]);
      const h = r.pick([9, 12, 15, 18, 24, 30, 90]);
      const V = (S * h) / 3;
      return {
        stem: `Một chóp inox có dạng hình chóp tam giác đều với diện tích đáy khoảng $${S}$ cm$^{2}$ và chiều cao khoảng $${h}$ cm. Tính thể tích của chóp inox đó (cm$^{3}$).`,
        answer: String(V),
        thinking: [
          'Thể tích hình chóp $=\\f{1}{3}\\cdot S_{\\text{đáy}}\\cdot h$ — nhớ **hệ số $\\f{1}{3}$** để phân biệt với hình lăng trụ.',
          'Chiều cao ở đây là khoảng cách từ đỉnh tới mặt đáy, không phải trung đoạn.',
        ],
        solution: [
          `$V=\\f{1}{3}\\cdot S\\cdot h=\\f{1}{3}\\cdot${S}\\cdot${h}=${V}$ (cm$^{3}$).`,
        ],
        pitfall: `Quên hệ số $\\f{1}{3}$ sẽ cho kết quả gấp ba lần ($${S * h}$ cm$^{3}$) — đây là bẫy phổ biến nhất.`,
      };
    },
  },

  /* ----------- 10. Tỉ số đồng dạng — trung tuyến, chu vi, diện tích ----------- */
  {
    id: 'g8.dong-dang-ti-so-yeu-to', topicId: 'g8-t6', grade: 8, level: 'TH', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Tỉ số các yếu tố tương ứng của hai tam giác đồng dạng',
    build: (r) => {
      const yeuTo = r.pick(['trung tuyến', 'đường cao', 'phân giác', 'chu vi', 'diện tích'] as const);
      const laDienTich = yeuTo === 'diện tích';
      const dung = laDienTich ? '$k^{2}$' : '$k$';
      const sai = laDienTich ? ['$k$', '$\\f{1}{k}$', '$2k$'] : ['$k^{2}$', '$\\f{1}{k}$', '$\\f{k}{2}$'];
      const [options, answer] = mcOptions(r, dung, sai);
      return {
        stem: `Cho $\\tri MNP\\sim\\tri EFH$ theo tỉ số $k$. Tỉ số **${yeuTo}** của $\\tri MNP$ và $\\tri EFH$ (hai yếu tố tương ứng) bằng:`,
        options, answer,
        thinking: [
          'Mọi yếu tố **độ dài** tương ứng (cạnh, đường cao, trung tuyến, phân giác, chu vi) đều tỉ lệ theo đúng tỉ số đồng dạng $k$.',
          'Riêng **diện tích** tỉ lệ theo $k^{2}$ vì diện tích là đại lượng hai chiều.',
        ],
        solution: [
          laDienTich
            ? `Diện tích là đại lượng hai chiều nên $\\f{S_{MNP}}{S_{EFH}}=k^{2}$.`
            : `${yeuTo.charAt(0).toUpperCase() + yeuTo.slice(1)} là đại lượng độ dài nên tỉ số của chúng bằng đúng tỉ số đồng dạng $k$.`,
        ],
        pitfall: 'Áp $k^{2}$ cho chu vi (sai) hoặc $k$ cho diện tích (sai) — nhớ theo "số chiều" của đại lượng.',
      };
    },
  },

  /* ----------- 11. Ứng dụng đồng dạng — cọc và mắt người ----------- */
  {
    id: 'g8.do-cay-bang-coc', topicId: 'g8-t6', grade: 8, level: 'VD', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Ứng dụng đồng dạng — đo chiều cao cây bằng cọc',
    build: (r) => {
      const mat = r.pick([1.5, 1.6, 1.65, 1.7]);        // khoảng cách chân → mắt
      const coc = mat + r.pick([0.6, 0.75, 0.8, 1.0]);  // cọc cao hơn mắt
      const d1 = r.pick([0.5, 0.64, 0.8, 1.0]);          // người lùi xa cọc
      const d2 = r.pick([1.2, 1.36, 1.6, 2.0]);          // cọc cách cây
      // (coc - mat)/d1 = (cay - mat)/(d1 + d2)
      const cay = mat + ((coc - mat) * (d1 + d2)) / d1;
      const kq = Math.round(cay * 100) / 100;
      return {
        stem: `Một người đo chiều cao của cây nhờ một chiếc cọc chôn xuống đất. Cọc cao $${vn(coc)}$ m và đặt cách cây $${vn(d2)}$ m. Người ấy lùi ra xa, cách cọc $${vn(d1)}$ m thì nhìn thấy đỉnh cọc và đỉnh cây cùng nằm trên một đường thẳng. Biết khoảng cách từ chân đến mắt người ấy là $${vn(mat)}$ m.\n\nTính chiều cao của cây (m, làm tròn đến hàng phần trăm).`,
        answer: String(kq),
        thinking: [
          'Vẽ tia nhìn từ **mắt** qua **đỉnh cọc** tới **ngọn cây**. Trừ đi chiều cao mắt ở cả cọc và cây để có hai tam giác vuông đồng dạng có chung góc tại mắt.',
          'Hai tam giác đồng dạng theo trường hợp g.g (chung góc nhọn tại mắt, hai góc vuông).',
          'Tỉ lệ: $\\f{\\text{cọc}-\\text{mắt}}{\\text{mắt}\\to\\text{cọc}}=\\f{\\text{cây}-\\text{mắt}}{\\text{mắt}\\to\\text{cây}}$.',
        ],
        solution: [
          `Phần cọc cao hơn tầm mắt: $${vn(coc)}-${vn(mat)}=${vn(Number(round(coc - mat, 2)))}$ (m).`,
          `Khoảng cách từ mắt tới cọc theo phương ngang: $${vn(d1)}$ m; tới cây: $${vn(d1)}+${vn(d2)}=${vn(Number(round(d1 + d2, 2)))}$ m.`,
          `Hai tam giác vuông tạo bởi tia nhìn đồng dạng (g.g), nên $\\f{${vn(Number(round(coc - mat, 2)))}}{${vn(d1)}}=\\f{h-${vn(mat)}}{${vn(Number(round(d1 + d2, 2)))}}$.`,
          `$h-${vn(mat)}=\\f{${vn(Number(round(coc - mat, 2)))}\\cdot${vn(Number(round(d1 + d2, 2)))}}{${vn(d1)}}=${vn(Number(round(((coc - mat) * (d1 + d2)) / d1, 2)))}$.`,
          `$h\\approx${vn(kq)}$ m.`,
        ],
        pitfall: 'Quên **cộng lại chiều cao của mắt** ở bước cuối — kết quả sẽ thiếu đúng $' + vn(mat) + '$ m.',
      };
    },
  },

  /* ----------- 12. Phương trình bậc nhất có tham số ----------- */
  {
    id: 'g8.pt-tham-so', topicId: 'g8-t3', grade: 8, level: 'VDC', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Biện luận phương trình bậc nhất có tham số',
    build: (r) => {
      const a = r.pick([2, 3, 4]);
      const m0 = r.int(1, 6);           // hệ số triệt tiêu tại m = m0
      const c = r.int(1, 6);
      // pt: a(m - m0) x + (c - m) = 0
      const hoi = r.pick(['bac-nhat', 'vo-nghiem'] as const);
      if (hoi === 'bac-nhat') {
        const [options, answer] = mcOptions(r, `$m\\ne${m0}$`, [`$m=${m0}$`, `$m>${m0}$`, 'mọi $m$']);
        return {
          stem: `Cho phương trình $${a}(m-${m0})x+${c}-m=0$ (với $m$ là tham số). Phương trình là **phương trình bậc nhất một ẩn $x$** khi:`,
          options, answer,
          thinking: [
            'Phương trình $Ax+B=0$ là **bậc nhất một ẩn** khi và chỉ khi hệ số $A\\ne0$.',
            `Ở đây $A=${a}(m-${m0})$, mà $${a}\\ne0$ nên chỉ cần $m-${m0}\\ne0$.`,
          ],
          solution: [
            `Hệ số của $x$ là $A=${a}(m-${m0})$.`,
            `Phương trình bậc nhất $\\Leftrightarrow A\\ne0\\Leftrightarrow ${a}(m-${m0})\\ne0\\Leftrightarrow m\\ne${m0}$.`,
          ],
          pitfall: 'Chỉ nhìn vào hạng tử tự do mà quên điều kiện then chốt là hệ số của $x$ khác $0$.',
        };
      }
      const [options, answer] = mcOptions(r, `$m=${m0}$`, [`$m\\ne${m0}$`, `$m=${c}$`, 'không có $m$ nào']);
      return {
        stem: `Cho phương trình $${a}(m-${m0})x+${c}-m=0$ (với $m$ là tham số và $${c}\\ne${m0}$). Phương trình **vô nghiệm** khi:`,
        options, answer,
        thinking: [
          'Phương trình $Ax+B=0$ **vô nghiệm** khi $A=0$ và $B\\ne0$ (dạng "$0\\cdot x=$ số khác $0$").',
          `Ở đây $A=${a}(m-${m0})$ và $B=${c}-m$.`,
        ],
        solution: [
          `$A=0\\Leftrightarrow ${a}(m-${m0})=0\\Leftrightarrow m=${m0}$.`,
          `Khi đó $B=${c}-${m0}=${c - m0}\\ne0$ (theo giả thiết $${c}\\ne${m0}$).`,
          `Phương trình trở thành $0\\cdot x=${m0 - c}$ — vô lí, nên phương trình vô nghiệm khi $m=${m0}$.`,
        ],
        pitfall: 'Nếu cả $A=0$ **và** $B=0$ thì phương trình có **vô số nghiệm**, không phải vô nghiệm — phải kiểm tra $B$.',
      };
    },
  },

  /* ----------- 13. Rút gọn biểu thức và tìm x nguyên (câu 1 tự luận) ----------- */
  {
    id: 'g8.tl-rut-gon-nguyen', topicId: 'g8-t2', grade: 8, level: 'VD', kind: 'ESSAY',
    strand: 'SO_DAI_SO', tag: 'Tự luận — rút gọn phân thức và tìm x nguyên',
    build: (r) => {
      const a = r.pick([2, 3, 4, 5]);
      const b = r.int(1, 6);
      const xv = r.pick([-4, -3, 3, 5, 6, 7]).valueOf();
      const xTest = xv === a || xv === -a ? xv + 1 : xv;
      return {
        stem: `Cho biểu thức $A=\\left(\\f{x}{x^{2}-${a * a}}+\\f{1}{x+${a}}\\right):\\f{${b}}{x-${a}}$.\n\na) Tìm điều kiện xác định của $A$ và rút gọn $A$.\n\nb) Tính giá trị của $A$ khi $x=${xTest}$.\n\nc) Tìm các giá trị nguyên của $x$ để $A$ nhận giá trị nguyên.`,
        answer: '',
        rubric: [
          { criterion: `a) Nêu đúng điều kiện xác định $x\\ne\\pm${a}$`, points: 0.5 },
          { criterion: 'a) Quy đồng, cộng hai phân thức trong ngoặc', points: 1 },
          { criterion: `a) Thực hiện phép chia, rút gọn được $A=\\f{2x-${a}}{${b}(x+${a})}$`, points: 1 },
          { criterion: `b) Đối chiếu điều kiện rồi thay $x=${xTest}$ và tính đúng`, points: 1 },
          { criterion: 'c) Tách phần nguyên, đưa về dạng ước của một số', points: 1 },
          { criterion: 'c) Liệt kê đủ nghiệm và loại các giá trị vi phạm điều kiện', points: 0.5 },
        ],
        thinking: [
          'Bước bắt buộc đầu tiên: **điều kiện xác định** — mọi mẫu phải khác $0$, kể cả mẫu của phân thức chia.',
          `$x^{2}-${a * a}=(x-${a})(x+${a})$ chính là mẫu chung — nhận ra hằng đẳng thức là xong nửa bài.`,
          'Chia cho một phân thức = nhân với **nghịch đảo** của nó.',
          'Ý c: tách $\\f{\\text{tử}}{\\text{mẫu}}$ thành "phần nguyên + phần dư" rồi cho mẫu là **ước** của tử số dư.',
        ],
        solution: [
          `**a)** ĐKXĐ: $x^{2}-${a * a}\\ne0$ và $x+${a}\\ne0$ và $x-${a}\\ne0$, tức $x\\ne${a}$ và $x\\ne-${a}$.`,
          `$\\f{x}{x^{2}-${a * a}}+\\f{1}{x+${a}}=\\f{x}{(x-${a})(x+${a})}+\\f{x-${a}}{(x-${a})(x+${a})}=\\f{2x-${a}}{(x-${a})(x+${a})}$.`,
          `$A=\\f{2x-${a}}{(x-${a})(x+${a})}\\cdot\\f{x-${a}}{${b}}=\\f{2x-${a}}{${b}(x+${a})}$.`,
          `**b)** $x=${xTest}$ thoả ĐKXĐ. Thay vào: $A=\\f{2\\cdot${xTest}-${a}}{${b}(${xTest}+${a})}=\\f{${2 * xTest - a}}{${b * (xTest + a)}}$.`,
          `**c)** Viết lại $${b}A=\\f{2x-${a}}{x+${a}}=2-\\f{${3 * a}}{x+${a}}$.`,
          `Để $A$ nguyên thì trước hết $\\f{${3 * a}}{x+${a}}$ phải nguyên, tức $x+${a}$ là ước của $${3 * a}$.`,
          `Lập bảng các ước của $${3 * a}$, tìm $x$ tương ứng, rồi **loại** các giá trị $x=\\pm${a}$ và kiểm tra lại điều kiện $A$ nguyên (chứ không chỉ $${b}A$ nguyên).`,
        ],
      };
    },
  },
];
