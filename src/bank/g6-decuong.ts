import type { Template } from '@/types';
import { gcd, lcm, mcOptions } from '@/lib/rng';

/* =====================================================================
   MATHGITA — KHUÔN CÂU HỎI BIÊN SOẠN TỪ ĐỀ CƯƠNG GỐC (khối 6)
   Nguồn: bộ đề cương học kỳ của trung tâm — phần "Một số dạng toán khác",
   là nhóm dạng phân loại học sinh khá – giỏi.
   ===================================================================== */

export const BANK_G6_DECUONG: Template[] = [
  {
    id: 'g6.tong-luy-thua-chia-het', topicId: 'g6-t1', grade: 6, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Chứng minh tổng lũy thừa chia hết',
    build: (r) => {
      const a = r.pick([2, 3, 5]);
      const k = r.pick([2, 3, 4]);                 // số hạng mỗi nhóm
      const n = k * r.int(4, 9) - 1;               // A = 1 + a + ... + a^n, tổng (n+1) số hạng
      let f = 0;
      for (let i = 0; i < k; i++) f += a ** i;     // thừa số 1 + a + ... + a^(k-1)
      return {
        stem: `Cho $A=1+${a}+${a}^{2}+${a}^{3}+\\dots+${a}^{${n}}$. Chứng tỏ rằng $A$ chia hết cho $${f}$. (Nhập giá trị của thừa số chung thu được sau khi nhóm.)`,
        answer: String(f),
        thinking: [
          `Tổng có $${n + 1}$ số hạng, chia hết cho $${k}$ → nhóm **${k} số hạng liên tiếp** thành một nhóm.`,
          `Mỗi nhóm đều đặt được thừa số chung, phần trong ngoặc luôn là $1+${a}+\\dots+${a}^{${k - 1}}=${f}$.`,
        ],
        solution: [
          `$A$ có $${n + 1}$ số hạng. Vì $${n + 1}$ chia hết cho $${k}$ nên ta nhóm $${k}$ số hạng liên tiếp thành một nhóm:`,
          `$A=(1+${a}+\\dots+${a}^{${k - 1}})+${a}^{${k}}(1+${a}+\\dots+${a}^{${k - 1}})+\\dots$`,
          `$A=(1+${a}+\\dots+${a}^{${k - 1}})\\cdot(1+${a}^{${k}}+${a}^{${2 * k}}+\\dots)$`,
          `Mà $1+${a}+\\dots+${a}^{${k - 1}}=${f}$, nên $A$ chia hết cho $${f}$.`,
        ],
        pitfall: 'Phải kiểm tra số số hạng chia hết cho số phần tử mỗi nhóm thì mới nhóm được trọn vẹn.',
      };
    },
  },
  {
    id: 'g6.chu-so-tan-cung', topicId: 'g6-t1', grade: 6, level: 'VDC', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Tìm chữ số tận cùng của lũy thừa',
    build: (r) => {
      const a = r.pick([2, 3, 7, 8]);
      const n = r.int(15, 120);
      const cyc: Record<number, number[]> = { 2: [2, 4, 8, 6], 3: [3, 9, 7, 1], 7: [7, 9, 3, 1], 8: [8, 4, 2, 6] };
      const last = cyc[a][(n - 1) % 4];
      const others = cyc[a].filter((x) => x !== last).map(String);
      const [options, answer] = mcOptions(r, String(last), others);
      return {
        stem: `Chữ số tận cùng của $${a}^{${n}}$ là:`,
        options, answer,
        thinking: [
          `Chữ số tận cùng của lũy thừa cơ số $${a}$ lặp lại theo chu kỳ 4: $${cyc[a].join('; ')}$.`,
          `Lấy số mũ chia cho 4 để biết vị trí trong chu kỳ.`,
        ],
        solution: [
          `Chu kỳ chữ số tận cùng của $${a}^{n}$ là $${cyc[a].join('; ')}$ (lặp lại sau mỗi 4 bước).`,
          `$${n}=4\\cdot${Math.floor((n - 1) / 4)}+${((n - 1) % 4) + 1}$, tức $${n}$ ứng với vị trí thứ $${((n - 1) % 4) + 1}$ trong chu kỳ.`,
          `Vậy chữ số tận cùng là $${last}$.`,
        ],
        pitfall: 'Chia số mũ cho 4 lấy **số dư**; dư 0 thì ứng với vị trí cuối cùng của chu kỳ.',
      };
    },
  },
  {
    id: 'g6.ucln-bcnn-nguoc', topicId: 'g6-t2', grade: 6, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm hai số biết ƯCLN và BCNN',
    build: (r) => {
      const d = r.pick([3, 4, 5, 6, 8]);
      const pairs = [[1, 5], [1, 7], [2, 3], [3, 4], [1, 11], [2, 5], [3, 5]];
      const [m, n] = r.pick(pairs);
      const a = d * m, b = d * n;
      const L = lcm(a, b);
      return {
        stem: `Tìm hai số tự nhiên $a$, $b$ (với $a<b$) biết ƯCLN$(a;b)=${d}$ và BCNN$(a;b)=${L}$. (Nhập theo dạng a,b.)`,
        answer: `${a},${b}`,
        thinking: [
          `Đặt $a=${d}m$, $b=${d}n$ với $m$, $n$ nguyên tố cùng nhau và $m<n$.`,
          `Khi đó BCNN$(a;b)=${d}mn$, từ đó tìm được $mn$.`,
        ],
        solution: [
          `Vì ƯCLN$(a;b)=${d}$ nên đặt $a=${d}m$, $b=${d}n$ với ƯCLN$(m;n)=1$ và $m<n$.`,
          `BCNN$(a;b)=${d}mn=${L}\\Rightarrow mn=${L / d}$.`,
          `Cặp $(m;n)$ nguyên tố cùng nhau, $m<n$, tích bằng $${L / d}$: chọn $(m;n)=(${m};${n})$.`,
          `Vậy $a=${d}\\cdot${m}=${a}$ và $b=${d}\\cdot${n}=${b}$.`,
          `Kiểm tra: ƯCLN$(${a};${b})=${gcd(a, b)}$ ✓ và BCNN$(${a};${b})=${L}$ ✓`,
        ],
        pitfall: 'Điều kiện $m$, $n$ **nguyên tố cùng nhau** là bắt buộc — bỏ qua sẽ ra nghiệm sai.',
      };
    },
  },
  {
    id: 'g6.bcnn-thieu', topicId: 'g6-t2', grade: 6, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Bài toán BCNN dạng “đều thiếu”',
    build: (r) => {
      const trio = r.pick([[4, 5, 6], [4, 6, 7], [5, 6, 8], [4, 5, 7], [6, 8, 9]]);
      const L = trio.reduce((x, y) => lcm(x, y));
      const t = r.int(1, Math.min(3, trio[0] - 1));   // thiếu t em
      const k = r.int(2, 4);
      const n = L * k - t;
      const lo = n - Math.floor(L / 3), hi = n + Math.floor(L / 3);
      return {
        stem: `Số học sinh của một trường khi xếp hàng $${trio[0]}$, hàng $${trio[1]}$, hàng $${trio[2]}$ thì **đều thiếu $${t}$ em** mới đủ hàng. Biết số học sinh trong khoảng từ $${lo}$ đến $${hi}$. Tính số học sinh của trường.`,
        answer: String(n),
        thinking: [
          `“Thiếu $${t}$ em” nghĩa là nếu **thêm** $${t}$ em nữa thì xếp vừa đủ mọi hàng.`,
          `Vậy $n+${t}$ chia hết cho cả ba số — đây là bài toán BCNN, khác với dạng “đều thừa” (lấy $n-r$).`,
        ],
        solution: [
          `Gọi $n$ là số học sinh ($n\\in\\Nstar$, $${lo}\\le n\\le${hi}$).`,
          `Theo đề, $(n+${t})$ chia hết cho $${trio.join('$, $')}$, nên $n+${t}\\in$ BC$(${trio.join(';')})$.`,
          `BCNN$(${trio.join(';')})=${L}$, do đó $n+${t}\\in\\{${L};${2 * L};${3 * L};${4 * L};\\dots\\}$.`,
          `Suy ra $n\\in\\{${L - t};${2 * L - t};${3 * L - t};${4 * L - t};\\dots\\}$.`,
          `Đối chiếu điều kiện $${lo}\\le n\\le${hi}$ ta được $n=${n}$.`,
          `Vậy trường đó có **${n} học sinh**.`,
        ],
        pitfall: 'Dạng “đều thừa $r$” thì xét $n-r$; dạng “đều thiếu $t$” thì xét $n+t$ — nhầm dấu là sai hoàn toàn.',
      };
    },
  },
  {
    id: 'g6.tim-x-day-so', topicId: 'g6-t3', grade: 6, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm x trong tổng dãy số',
    build: (r) => {
      const d = 2;
      const first = r.pick([1, 3, 5]);
      const cnt = r.int(20, 50);
      const last = first + (cnt - 1) * d;
      const S = ((first + last) * cnt) / 2;         // tổng các hằng số
      // cnt·x + S = 0  →  x = -S/cnt
      const x = -S / cnt;
      if (!Number.isInteger(x)) {
        return {
          stem: 'Tìm số nguyên $x$, biết $(x+1)+(x+3)+(x+5)+\\dots+(x+99)=0$.',
          answer: '-50',
          thinking: ['Đếm số số hạng, tách phần chứa $x$ và phần hằng số.'],
          solution: [
            'Các hằng số $1;3;5;\\dots;99$ là dãy cách đều 2, có $(99-1):2+1=50$ số hạng.',
            'Vậy vế trái $=50x+(1+3+\\dots+99)=50x+\\f{(1+99)\\cdot50}{2}=50x+2500$.',
            '$50x+2500=0\\Rightarrow x=-50$.',
          ],
        };
      }
      return {
        stem: `Tìm số nguyên $x$, biết $(x+${first})+(x+${first + d})+(x+${first + 2 * d})+\\dots+(x+${last})=0$.`,
        answer: String(x),
        thinking: [
          'Tách vế trái thành: (số số hạng) $\\times x$ + (tổng các hằng số).',
          'Đếm số số hạng của dãy cách đều rồi tính tổng bằng công thức đầu – cuối.',
        ],
        solution: [
          `Các hằng số $${first};${first + d};\\dots;${last}$ là dãy cách đều $${d}$, có $(${last}-${first}):${d}+1=${cnt}$ số hạng.`,
          `Tổng các hằng số: $\\f{(${first}+${last})\\cdot${cnt}}{2}=${S}$.`,
          `Vế trái $=${cnt}x+${S}=0\\Rightarrow ${cnt}x=${-S}\\Rightarrow x=${x}$.`,
        ],
        pitfall: 'Đếm sai số số hạng là lỗi phổ biến — nhớ công thức $(\\text{cuối}-\\text{đầu}):d+1$.',
      };
    },
  },
  {
    id: 'g6.tich-hai-thua-so', topicId: 'g6-t3', grade: 6, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm cặp số tự nhiên từ tích cho trước',
    build: (r) => {
      const k = r.pick([12, 18, 20, 24, 30]);
      const c = r.int(1, 4);
      // (2x+1)(y-c) = k, 2x+1 là ước LẺ của k
      const odd: number[] = [];
      for (let i = 1; i <= k; i++) if (k % i === 0 && i % 2 === 1) odd.push(i);
      const sols = odd.map((o) => ({ x: (o - 1) / 2, y: k / o + c })).filter((s) => Number.isInteger(s.x) && s.y > c);
      return {
        stem: `Tìm số cặp số tự nhiên $(x;y)$ thoả mãn $(2x+1)(y-${c})=${k}$.`,
        answer: String(sols.length),
        thinking: [
          '$2x+1$ luôn là số **lẻ** — đây là chìa khoá thu hẹp số trường hợp.',
          `Vậy $2x+1$ phải là **ước lẻ** của $${k}$.`,
        ],
        solution: [
          `Vì $x\\in\\N$ nên $2x+1$ là số lẻ và $2x+1\\ge1$.`,
          `Do đó $2x+1$ là ước lẻ của $${k}$: Ư lẻ$(${k})=\\{${odd.join(';')}\\}$.`,
          ...sols.map((s) => `Với $2x+1=${2 * s.x + 1}$: $x=${s.x}$ và $y-${c}=${k / (2 * s.x + 1)}$ nên $y=${s.y}$.`),
          `Vậy có $${sols.length}$ cặp $(x;y)$: $${sols.map((s) => `(${s.x};${s.y})`).join('$, $')}$.`,
        ],
        pitfall: 'Không lọc theo tính lẻ của $2x+1$ sẽ xét thừa rất nhiều trường hợp và dễ sót.',
      };
    },
  },
  {
    id: 'g6.n-chia-het', topicId: 'g6-t3', grade: 6, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm n để biểu thức chia hết',
    build: (r) => {
      const c = r.int(1, 6);
      const k = r.int(5, 20);
      // (n + c + k) chia hết cho (n + c)  ⟺  (n + c) là ước của k
      const divs: number[] = [];
      for (let i = 1; i <= k; i++) if (k % i === 0) divs.push(i);
      const ns = divs.map((d) => d - c).filter((n) => n >= 0);
      return {
        stem: `Tìm số tự nhiên $n$ để $(n+${c + k})$ chia hết cho $(n+${c})$. (Nhập các giá trị cách nhau bởi dấu phẩy; nếu không có thì nhập 0 giá trị.)`,
        answer: ns.length ? ns.sort((a, b) => a - b).join(',') : 'khong co',
        accept: ns.length ? [ns.slice().reverse().join(',')] : ['không có', '0'],
        thinking: [
          'Tách tử theo mẫu: viết $n+' + (c + k) + ' = (n+' + c + ') + ' + k + '$.',
          `Khi đó điều kiện chia hết quy về: $(n+${c})$ là **ước** của $${k}$.`,
        ],
        solution: [
          `$n+${c + k}=(n+${c})+${k}$.`,
          `Vì $(n+${c})$ chia hết cho chính nó nên $(n+${c + k})\;\\vdots\;(n+${c})\\Leftrightarrow ${k}\;\\vdots\;(n+${c})$.`,
          `Do đó $(n+${c})\\in$ Ư$(${k})=\\{${divs.join(';')}\\}$.`,
          ns.length
            ? `Với $n\\in\\N$ nên $n+${c}\\ge${c}$, ta được $n\\in\\{${ns.sort((a, b) => a - b).join(';')}\\}$.`
            : `Không có giá trị $n\\in\\N$ nào thoả mãn.`,
        ],
        remark: 'Kỹ thuật “tách tử theo mẫu” dùng lại rất nhiều ở lớp 8, lớp 9 khi rút gọn phân thức.',
      };
    },
  },
  {
    id: 'g6.chung-minh-chia-het-tohop', topicId: 'g6-t2', grade: 6, level: 'VDC', kind: 'ESSAY',
    strand: 'SO_DAI_SO', tag: 'Tự luận — chứng minh chia hết bằng tổ hợp tuyến tính',
    build: (r) => {
      const m = r.pick([17, 13, 19, 23]);
      const p = r.int(2, 6);
      // a - p·b ⋮ m  ⟹  chứng minh (q·a + b) ⋮ m với q chọn sao cho được
      // Ta có m | a - p b. Xét K·a + b. Muốn K a + b ≡ 0: a ≡ p b (mod m) ⟹ K p b + b = b(Kp+1) ≡ 0 ⟹ cần m | Kp+1
      let K = 1;
      while ((K * p + 1) % m !== 0 && K < m) K++;
      const ok = (K * p + 1) % m === 0;
      if (!ok) {
        return {
          stem: 'Cho $a-5b$ chia hết cho $17$ ($a,b\\in\\N$). Chứng tỏ rằng $10a+b$ cũng chia hết cho $17$.',
          answer: '',
          rubric: [
            { criterion: 'Nhận ra cần tạo tổ hợp tuyến tính của $a-5b$', points: 1 },
            { criterion: 'Viết đúng $10a+b=10(a-5b)+51b$', points: 1.5 },
            { criterion: 'Chỉ ra $51b$ chia hết cho 17', points: 1 },
            { criterion: 'Kết luận đầy đủ', points: 0.5 },
          ],
          thinking: [
            'Muốn chứng minh $10a+b$ chia hết cho 17, ta tìm cách viết nó thành **tổng của bội của $(a-5b)$ và một bội của 17**.',
            'Nhân $(a-5b)$ với 10 để hệ số của $a$ khớp: $10(a-5b)=10a-50b$. Phần còn thiếu là $b-(-50b)=51b$.',
          ],
          solution: [
            'Ta có $10a+b=10a-50b+51b=10(a-5b)+51b$.',
            'Theo giả thiết $(a-5b)\;\\vdots\;17$ nên $10(a-5b)\;\\vdots\;17$.',
            'Mặt khác $51=17\\cdot3$ nên $51b\;\\vdots\;17$.',
            'Tổng của hai số cùng chia hết cho 17 thì chia hết cho 17.',
            'Vậy $(10a+b)\;\\vdots\;17$. (điều phải chứng minh)',
          ],
        };
      }
      const rest = (K * p + 1);
      return {
        stem: `Cho $a-${p}b$ chia hết cho $${m}$ (với $a$, $b$ là số tự nhiên). Chứng tỏ rằng $${K}a+b$ cũng chia hết cho $${m}$.`,
        answer: '',
        rubric: [
          { criterion: 'Nhận ra cần tạo tổ hợp tuyến tính của $a-' + p + 'b$', points: 1 },
          { criterion: `Viết đúng $${K}a+b=${K}(a-${p}b)+${rest}b$`, points: 1.5 },
          { criterion: `Chỉ ra $${rest}b$ chia hết cho $${m}$`, points: 1 },
          { criterion: 'Kết luận đầy đủ', points: 0.5 },
        ],
        thinking: [
          `Muốn chứng minh $${K}a+b$ chia hết cho $${m}$, hãy viết nó thành **bội của $(a-${p}b)$ cộng một bội của $${m}$**.`,
          `Nhân $(a-${p}b)$ với $${K}$ để hệ số của $a$ khớp, rồi bù phần thiếu ở hạng tử chứa $b$.`,
        ],
        solution: [
          `$${K}a+b=${K}a-${K * p}b+${rest}b=${K}(a-${p}b)+${rest}b$.`,
          `Theo giả thiết $(a-${p}b)\;\\vdots\;${m}$ nên $${K}(a-${p}b)\;\\vdots\;${m}$.`,
          `Mặt khác $${rest}=${m}\\cdot${rest / m}$ nên $${rest}b\;\\vdots\;${m}$.`,
          `Tổng của hai số cùng chia hết cho $${m}$ thì chia hết cho $${m}$.`,
          `Vậy $(${K}a+b)\;\\vdots\;${m}$. (điều phải chứng minh)`,
        ],
      };
    },
  },
  {
    id: 'g6.hinh-thoi-trong-hcn', topicId: 'g6-t6', grade: 6, level: 'VD', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Hình thoi nối trung điểm hình chữ nhật',
    build: (r) => {
      const a = r.int(10, 40) * 2, b = r.int(8, 30) * 2;
      const S = (a * b) / 2;
      return {
        stem: `Mảnh vườn hình chữ nhật $MNPQ$ có $MN=${a}\\,m$, $MQ=${b}\\,m$. Gọi $A$, $B$, $C$, $D$ lần lượt là trung điểm của $MQ$, $MN$, $NP$, $PQ$. Phần bên trong hình thoi $ABCD$ dùng để trồng rau. Tính diện tích phần trồng rau (đơn vị: m²).`,
        answer: String(S),
        thinking: [
          'Hai đường chéo của hình thoi $ABCD$ chính là hai đoạn nối trung điểm hai cặp cạnh đối của hình chữ nhật.',
          `Do đó $AC=MN=${a}\\,m$ và $BD=MQ=${b}\\,m$.`,
        ],
        solution: [
          `Đường chéo $AC$ nối trung điểm hai cạnh $MQ$ và $NP$ nên $AC=MN=${a}\\ (m)$.`,
          `Đường chéo $BD$ nối trung điểm hai cạnh $MN$ và $PQ$ nên $BD=MQ=${b}\\ (m)$.`,
          `$S_{ABCD}=\\f{1}{2}\\cdot AC\\cdot BD=\\f{1}{2}\\cdot${a}\\cdot${b}=${S}\\ (m^{2})$.`,
          `Nhận xét: diện tích hình thoi luôn bằng **một nửa** diện tích hình chữ nhật ban đầu ($${a * b}:2=${S}$).`,
        ],
        remark: 'Kết quả “một nửa” đúng với mọi hình chữ nhật — nhớ để kiểm tra nhanh kết quả.',
      };
    },
  },
  {
    id: 'g6.chi-phi-thuc-te', topicId: 'g6-t6', grade: 6, level: 'VD', kind: 'SHORT',
    strand: 'HINH_HOC', tag: 'Bài toán chi phí theo diện tích',
    build: (r) => {
      const a = r.int(8, 25), b = r.int(6, 20);
      const w = r.int(1, 3);                       // bề rộng lối đi
      const price = r.pick([60000, 85000, 120000, 170000]);
      const Sv = a * b;
      const Sl = w * b;
      const Sr = Sv - Sl;
      const cost = Sr * price;
      return {
        stem: `Mảnh vườn hình chữ nhật có chiều dài $${a}\\,m$, chiều rộng $${b}\\,m$. Người ta dành một lối đi hình chữ nhật rộng $${w}\\,m$ chạy suốt chiều rộng mảnh vườn. Phần còn lại trải thảm cỏ với giá $${price.toLocaleString('vi-VN')}$ đồng/m². Tính số tiền phải trả để trải thảm cỏ (đơn vị: đồng).`,
        answer: String(cost),
        thinking: [
          'Bài toán ba bước: diện tích cả vườn → diện tích lối đi → diện tích còn lại → nhân đơn giá.',
          'Lối đi chạy suốt chiều rộng nên diện tích lối đi = bề rộng lối đi × chiều rộng vườn.',
        ],
        solution: [
          `Diện tích mảnh vườn: $${a}\\cdot${b}=${Sv}\\ (m^{2})$.`,
          `Diện tích lối đi: $${w}\\cdot${b}=${Sl}\\ (m^{2})$.`,
          `Diện tích trải thảm cỏ: $${Sv}-${Sl}=${Sr}\\ (m^{2})$.`,
          `Số tiền phải trả: $${Sr}\\cdot${price.toLocaleString('vi-VN')}=${cost.toLocaleString('vi-VN')}$ (đồng).`,
        ],
        pitfall: 'Đọc kỹ lối đi chạy theo chiều nào — nhầm chiều là sai diện tích lối đi.',
      };
    },
  },
];
