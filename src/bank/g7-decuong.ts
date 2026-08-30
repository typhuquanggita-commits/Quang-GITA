import type { Template } from '@/types';
import { mcOptions, reduce } from '@/lib/rng';

/* MATHGITA — NGÂN HÀNG KHỐI 7 (đề cương gốc)
 * Biên soạn bám sát "Đề cương học kì I – Toán 7" của hệ thống giáo dục Archimedes
 * và "Đề cương giữa kì 1 Toán 7 – KNTT" trong kho tư liệu GITA:
 * số thập phân hữu hạn / vô hạn tuần hoàn, tìm x chứa căn và giá trị tuyệt đối,
 * phương trình tích, cực trị biểu thức chứa giá trị tuyệt đối, đọc – vẽ biểu đồ. */

const sgn = (n: number) => (n >= 0 ? `+${n}` : `${n}`);

export const BANK_G7_DECUONG: Template[] = [
  /* ----------- 1. Số thập phân vô hạn tuần hoàn -> phân số ----------- */
  {
    id: 'g7.stp-tuan-hoan', topicId: 'g7-t1', grade: 7, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Số thập phân vô hạn tuần hoàn → phân số',
    build: (r) => {
      const nguyen = r.int(0, 3);
      const d = r.pick([1, 2, 3, 4, 5, 6, 7, 8]);
      // 0,(d) = d/9  ->  nguyen,(d) = (9*nguyen + d)/9
      const [n, m] = reduce(9 * nguyen + d, 9);
      const viet = `${nguyen},(${d})`;
      return {
        stem: `Viết số thập phân vô hạn tuần hoàn $${viet}$ dưới dạng phân số tối giản (nhập theo dạng a/b).`,
        answer: m === 1 ? String(n) : `${n}/${m}`,
        thinking: [
          'Chu kì gồm **1 chữ số** thì đặt $x$ bằng số đó rồi nhân $10$: hiệu $10x-x=9x$ khử được phần tuần hoàn.',
          'Ghi nhớ nhanh: $0,(d)=\\f{d}{9}$ ; $0,(dd)=\\f{\\ov{dd}}{99}$.',
        ],
        solution: [
          `Đặt $x=${viet}$ thì $10x=${nguyen * 10 + d},(${d})$.`,
          `Trừ theo vế: $10x-x=${nguyen * 10 + d}-${nguyen}$, tức $9x=${9 * nguyen + d}$.`,
          `$x=\\f{${9 * nguyen + d}}{9}=\\f{${n}}{${m}}$.`,
        ],
        pitfall: 'Nhầm $0,(3)=\\f{3}{10}$. Đúng phải là $\\f{3}{9}=\\f{1}{3}$ — phần tuần hoàn kéo dài vô hạn.',
      };
    },
  },

  /* ----------- 2. Phân số viết được dạng thập phân hữu hạn ----------- */
  {
    id: 'g7.stp-huu-han', topicId: 'g7-t1', grade: 7, level: 'TH', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Nhận biết phân số viết được dạng thập phân hữu hạn',
    build: (r) => {
      const huuHan = [
        { f: '\\f{7}{20}', d: 20 }, { f: '\\f{3}{8}', d: 8 }, { f: '\\f{9}{25}', d: 25 },
        { f: '\\f{11}{40}', d: 40 }, { f: '\\f{13}{50}', d: 50 }, { f: '\\f{1}{16}', d: 16 },
      ];
      const voHan = [
        { f: '\\f{5}{12}', d: 12 }, { f: '\\f{2}{7}', d: 7 }, { f: '\\f{4}{15}', d: 15 },
        { f: '\\f{7}{30}', d: 30 }, { f: '\\f{5}{6}', d: 6 }, { f: '\\f{8}{11}', d: 11 },
      ];
      const ok = r.pick(huuHan);
      const sai = r.shuffle(voHan.slice()).slice(0, 3);
      const [options, answer] = mcOptions(r, `$${ok.f}$`, sai.map((x) => `$${x.f}$`));
      return {
        stem: 'Trong các phân số **tối giản** sau, phân số nào viết được dưới dạng **số thập phân hữu hạn**?',
        options, answer,
        thinking: [
          'Dấu hiệu: phân số tối giản viết được dạng thập phân **hữu hạn** khi và chỉ khi mẫu **chỉ có ước nguyên tố $2$ và $5$**.',
          'Vậy hãy phân tích mẫu ra thừa số nguyên tố trước, đừng bấm máy chia thử.',
        ],
        solution: [
          `Mẫu $${ok.d}$ chỉ chứa thừa số nguyên tố $2$ và $5$ nên $${ok.f}$ viết được dạng thập phân hữu hạn.`,
          `Các mẫu còn lại ($${sai.map((x) => x.d).join('$; $')}$) đều có ước nguyên tố khác $2$ và $5$ nên cho số thập phân vô hạn tuần hoàn.`,
        ],
        pitfall: 'Phải rút gọn về **tối giản** rồi mới xét mẫu; $\\f{6}{15}=\\f{2}{5}$ vẫn là thập phân hữu hạn.',
      };
    },
  },

  /* ----------- 3. Tìm x chứa căn bậc hai số học ----------- */
  {
    id: 'g7.timx-can', topicId: 'g7-t1', grade: 7, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm x trong biểu thức chứa căn bậc hai',
    build: (r) => {
      const root = r.int(2, 9);          // \s{x} = root  ->  x = root^2
      const b = r.int(2, 6);
      const a = r.int(5, 40);
      const c = a - b * root;            // a - b*\s{x} = c
      return {
        stem: `Tìm $x\\ge0$, biết $${a}-${b}\\s{x}=${c}$.`,
        answer: String(root * root),
        thinking: [
          'Coi $\\s{x}$ như **một ẩn phụ**: chuyển vế để tách $\\s{x}$ đứng riêng một bên.',
          'Có $\\s{x}=k$ (với $k\\ge0$) thì bình phương hai vế: $x=k^{2}$.',
        ],
        solution: [
          `$${a}-${b}\\s{x}=${c}\\Rightarrow ${b}\\s{x}=${a}-(${c})=${a - c}$.`,
          `$\\s{x}=\\f{${a - c}}{${b}}=${root}$.`,
          `Vì $${root}\\ge0$ nên $x=${root}^{2}=${root * root}$.`,
          `Thử lại: $${a}-${b}\\cdot${root}=${c}$ (đúng). Vậy $x=${root * root}$.`,
        ],
        pitfall: 'Bình phương khi vế phải **âm** sẽ cho nghiệm ngoại lai — luôn kiểm tra $\\s{x}\\ge0$ trước.',
      };
    },
  },

  /* ----------- 4. Phương trình tích chứa căn / giá trị tuyệt đối ----------- */
  {
    id: 'g7.pt-tich-can', topicId: 'g7-t1', grade: 7, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Phương trình tích chứa căn bậc hai',
    build: (r) => {
      const k = r.int(2, 9);             // \s{x} = k  ->  x = k^2
      const a = r.int(2, 6);
      const b = r.int(1, 20);            // a*x - b = 0 -> x = b/a  (chọn b chia hết cho a)
      const b2 = b * a;
      const x2 = b2 / a;
      const roots = [k * k, x2].filter((v, i, arr) => arr.indexOf(v) === i).sort((p, q) => p - q);
      return {
        stem: `Tìm $x\\ge0$, biết $(\\s{x}-${k})(${a}x-${b2})=0$. (Nếu có nhiều giá trị, nhập từ nhỏ đến lớn, cách nhau bởi dấu phẩy.)`,
        answer: roots.join(','),
        accept: roots.length > 1 ? [roots.slice().reverse().join(',')] : undefined,
        thinking: [
          'Tích bằng $0$ khi và chỉ khi **ít nhất một thừa số bằng $0$** — tách ra hai phương trình con.',
          'Nhánh chứa căn cần thêm điều kiện $x\\ge0$ và vế phải không âm.',
        ],
        solution: [
          `$(\\s{x}-${k})(${a}x-${b2})=0\\Leftrightarrow \\cb{\\s{x}-${k}=0\\\\${a}x-${b2}=0}$`,
          `• $\\s{x}=${k}\\Rightarrow x=${k}^{2}=${k * k}$ (thoả $x\\ge0$).`,
          `• $${a}x=${b2}\\Rightarrow x=${x2}$ (thoả $x\\ge0$).`,
          `Vậy $x\\in\\{${roots.join(';')}\\}$.`,
        ],
        pitfall: 'Chỉ giải một nhánh rồi kết luận là **mất nửa số điểm**.',
      };
    },
  },

  /* ----------- 5. |ax+b| = |cx+d| ----------- */
  {
    id: 'g7.gttd-hai-ve', topicId: 'g7-t1', grade: 7, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Phương trình hai vế cùng chứa giá trị tuyệt đối',
    build: (r) => {
      // |a x + b| = |a x + d| với b != d  ->  nghiệm duy nhất x = -(b+d)/(2a)
      const a = r.pick([1, 2, 3, 4]);
      let b = r.int(-9, 9), d = r.int(-9, 9);
      if (b === d) d = b + 2;
      const num = -(b + d), den = 2 * a;
      const [n0, d0] = reduce(num, den);
      const ans = d0 === 1 ? String(n0) : `${n0}/${d0}`;
      return {
        stem: `Tìm $x$, biết $|${a === 1 ? '' : a}x${sgn(b)}|=|${a === 1 ? '' : a}x${sgn(d)}|$. (Nhập dạng a/b tối giản nếu là phân số.)`,
        answer: ans,
        thinking: [
          '$|A|=|B|\\Leftrightarrow A=B$ **hoặc** $A=-B$ — luôn xét đủ hai trường hợp.',
          `Ở đây hệ số của $x$ hai vế bằng nhau nên trường hợp $A=B$ vô nghiệm, chỉ còn $A=-B$.`,
        ],
        solution: [
          `**TH1:** $${a === 1 ? '' : a}x${sgn(b)}=${a === 1 ? '' : a}x${sgn(d)}\\Rightarrow ${b}=${d}$ (vô lí) → loại.`,
          `**TH2:** $${a === 1 ? '' : a}x${sgn(b)}=-(${a === 1 ? '' : a}x${sgn(d)})$`,
          `$\\Leftrightarrow ${a}x${sgn(b)}=-${a}x${sgn(-d)}\\Leftrightarrow ${2 * a}x=${-(b + d)}$.`,
          `$x=\\f{${num}}{${den}}=${d0 === 1 ? String(n0) : n0 < 0 ? `-\\f{${-n0}}{${d0}}` : `\\f{${n0}}{${d0}}`}$.`,
        ],
        pitfall: 'Bỏ quên trường hợp $A=-B$ (hoặc ngược lại) là lỗi phổ biến nhất của dạng này.',
      };
    },
  },

  /* ----------- 6. GTLN của phân thức chứa |x - a| ----------- */
  {
    id: 'g7.gtln-gttd', topicId: 'g7-t1', grade: 7, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Giá trị lớn nhất của phân thức chứa giá trị tuyệt đối',
    build: (r) => {
      const a = r.int(1, 9) * r.sign();
      const m = r.int(1, 6);
      const k = r.int(2, 12) * m;        // chọn k chia hết cho m để đáp án đẹp
      const maxV = k / m;
      return {
        stem: `Tìm giá trị lớn nhất của biểu thức $P=\\f{${k}}{|x${sgn(-a)}|+${m}}$ với $x$ là số thực.`,
        answer: String(maxV),
        thinking: [
          'Tử là hằng số dương ⇒ $P$ **lớn nhất khi mẫu nhỏ nhất**.',
          `Mà $|x${sgn(-a)}|\\ge0$ với mọi $x$, nên mẫu $\\ge${m}$ — dấu bằng xảy ra khi biểu thức trong dấu giá trị tuyệt đối bằng $0$.`,
        ],
        solution: [
          `Với mọi $x$: $|x${sgn(-a)}|\\ge0\\Rightarrow |x${sgn(-a)}|+${m}\\ge${m}>0$.`,
          `Do đó $P=\\f{${k}}{|x${sgn(-a)}|+${m}}\\le\\f{${k}}{${m}}=${maxV}$.`,
          `Dấu "$=$" xảy ra $\\Leftrightarrow x${sgn(-a)}=0\\Leftrightarrow x=${a}$.`,
          `Vậy $P_{\\max}=${maxV}$ khi $x=${a}$.`,
        ],
        pitfall: 'Với phân thức dương, mẫu **càng nhỏ giá trị càng lớn** — nhiều bạn làm ngược chiều bất đẳng thức.',
      };
    },
  },

  /* ----------- 7. Tìm x, y nguyên với |x - a| + b·y = c ----------- */
  {
    id: 'g7.xy-nguyen-gttd', topicId: 'g7-t1', grade: 7, level: 'VDC', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tìm cặp số nguyên thoả đẳng thức chứa giá trị tuyệt đối',
    build: (r) => {
      const a = r.int(1, 9);
      const b = r.pick([2, 3]);
      const y = r.int(1, 5);
      const t = r.int(1, 4) * b;         // |x-a| = t, cần t chia hết cho b? không, t tuỳ ý
      const c = t + b * y;
      // Số cặp (x;y) nguyên: với mỗi k = |x-a| >= 0 sao cho (c-k) chia hết cho b và (c-k)/b nguyên
      let count = 0;
      for (let k = 0; k <= c; k++) {
        if ((c - k) % b !== 0) continue;
        count += k === 0 ? 1 : 2;        // k = 0 cho 1 giá trị x, k > 0 cho 2 giá trị x
      }
      return {
        stem: `Tìm số cặp số nguyên $(x;y)$ thoả mãn $|x-${a}|+${b}y=${c}$ với $y$ là số nguyên **không âm**.`,
        answer: String(count),
        thinking: [
          `Đặt $k=|x-${a}|$ thì $k$ là số nguyên **không âm** và $${b}y=${c}-k$.`,
          `Điều kiện: $${c}-k$ chia hết cho $${b}$ và $${c}-k\\ge0$, tức $0\\le k\\le${c}$.`,
          `Với mỗi $k>0$ có **hai** giá trị $x=${a}\\pm k$; riêng $k=0$ chỉ có **một** giá trị $x=${a}$.`,
        ],
        solution: [
          `Đặt $k=|x-${a}|\\ge0$, ta được $${b}y=${c}-k$ nên $k\\equiv${c}\\ (\\text{mod }${b})$ và $0\\le k\\le${c}$.`,
          `Các giá trị $k$ hợp lệ là $k\\in\\{${(() => { const l: number[] = []; for (let k = 0; k <= c; k++) if ((c - k) % b === 0) l.push(k); return l.join(';'); })()}\\}$.`,
          `Đếm nghiệm: $k=0$ cho $1$ cặp; mỗi $k>0$ cho $2$ cặp.`,
          `Vậy có tất cả $${count}$ cặp $(x;y)$.`,
        ],
        pitfall: 'Quên rằng $k=0$ chỉ ứng với **một** giá trị $x$ nên đếm thừa một cặp.',
      };
    },
  },

  /* ----------- 8. Biểu đồ hình quạt tròn — tính góc ở tâm ----------- */
  {
    id: 'g7.quat-tron-goc', topicId: 'g7-t7', grade: 7, level: 'TH', kind: 'SHORT',
    strand: 'THONG_KE_XS', tag: 'Biểu đồ hình quạt tròn — góc ở tâm',
    build: (r) => {
      const nhan = ['Tivi', 'Laptop', 'Máy giặt', 'Tủ lạnh'];
      // Chọn tổng là ước của 360 để mọi góc ở tâm đều là số nguyên độ.
      const tong = r.pick([24, 30, 36, 40, 45, 60, 72, 90, 120]);
      const buoc = tong / 12;
      const p = [r.int(1, 4), r.int(1, 4), r.int(1, 4)];
      const p4 = 12 - p[0] - p[1] - p[2];
      const phan = [...p, p4].map((x) => x * buoc);
      const idx = r.int(0, 3);
      const goc = (phan[idx] / tong) * 360;
      const heSo = r.pick([1, 5, 10]);
      const so = phan.map((x) => x * heSo);
      const tongSo = tong * heSo;
      return {
        stem: `Doanh số bốn dòng sản phẩm của một cửa hàng điện máy trong tháng (đơn vị: triệu đồng) lần lượt là ${nhan.map((n, i) => `**${n}**: $${so[i]}$`).join('; ')}.\n\nKhi vẽ biểu đồ hình quạt tròn, hình quạt biểu diễn **${nhan[idx]}** có góc ở tâm bằng bao nhiêu độ?`,
        answer: String(goc),
        thinking: [
          'Cả hình tròn ứng với $360\\deg$ và ứng với **tổng** tất cả số liệu.',
          'Góc ở tâm của một phần $=\\f{\\text{số liệu phần đó}}{\\text{tổng}}\\cdot360\\deg$.',
        ],
        solution: [
          `Tổng doanh số: $${so.join('+')}=${tongSo}$ (triệu đồng).`,
          `Tỉ lệ của ${nhan[idx]}: $\\f{${so[idx]}}{${tongSo}}$.`,
          `Góc ở tâm: $\\f{${so[idx]}}{${tongSo}}\\cdot360\\deg=${goc}\\deg$.`,
        ],
        pitfall: `Nhầm góc ở tâm với **tỉ lệ phần trăm** (chia cho $100$ thay vì nhân $360\\deg$). Ở đây tỉ lệ là ${Math.round((phan[idx] / tong) * 1000) / 10}%.`,
      };
    },
  },

  /* ----------- 9. Biểu đồ đoạn thẳng — trung bình và mức tăng ----------- */
  {
    id: 'g7.bieu-do-doan-thang', topicId: 'g7-t7', grade: 7, level: 'TH', kind: 'SHORT',
    strand: 'THONG_KE_XS', tag: 'Biểu đồ đoạn thẳng — trung bình và mức tăng',
    build: (r) => {
      const days = ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Chủ nhật'];
      const base = r.int(4, 10) * 5;
      const vals = days.map(() => base + r.int(-3, 6) * 5);
      const tong = vals.reduce((s, x) => s + x, 0);
      const hoi = r.pick(['tb', 'tang'] as const);
      if (hoi === 'tb') {
        const tb = Math.round((tong / 7) * 100) / 100;
        return {
          stem: `Bảng thống kê số ly trà sữa bán ra trong một tuần của cửa hàng:\n\n${days.map((d, i) => `Thứ ${d}: $${vals[i]}$`).join(' · ')}\n\nTrung bình mỗi ngày cửa hàng bán được bao nhiêu ly? (Làm tròn đến hàng phần trăm.)`,
          answer: String(tb),
          thinking: ['Trung bình cộng $=\\f{\\text{tổng tất cả giá trị}}{\\text{số ngày}}$.'],
          solution: [
            `Tổng số ly cả tuần: $${vals.join('+')}=${tong}$.`,
            `Trung bình mỗi ngày: $${tong}:7\\approx${tb}$ (ly).`,
          ],
          pitfall: 'Chia cho số ngày **có bán** chứ không phải số loại sản phẩm.',
        };
      }
      const cuoi = vals[5] + vals[6];
      const ti = Math.round((cuoi / tong) * 10000) / 100;
      return {
        stem: `Bảng thống kê số ly trà sữa bán ra trong một tuần của cửa hàng:\n\n${days.map((d, i) => `Thứ ${d}: $${vals[i]}$`).join(' · ')}\n\nTính tỉ lệ phần trăm số ly bán được trong hai ngày cuối tuần (thứ Bảy và Chủ nhật) so với cả tuần. (Nhập số phần trăm, làm tròn đến hàng phần trăm.)`,
        answer: String(ti),
        thinking: [
          'Tỉ lệ phần trăm $=\\f{\\text{phần cần tính}}{\\text{toàn bộ}}\\cdot100\\%$.',
          'Xác định rõ đâu là "phần" và đâu là "toàn bộ" trước khi bấm máy.',
        ],
        solution: [
          `Hai ngày cuối tuần: $${vals[5]}+${vals[6]}=${cuoi}$ (ly).`,
          `Cả tuần: $${tong}$ ly.`,
          `Tỉ lệ: $\\f{${cuoi}}{${tong}}\\cdot100\\%\\approx${ti}\\%$.`,
        ],
        pitfall: 'Lấy hai ngày cuối tuần chia cho **năm ngày còn lại** thay vì chia cho cả tuần.',
      };
    },
  },

  /* ----------- 10. Tính hợp lí bằng tính chất phân phối ----------- */
  {
    id: 'g7.tinh-hop-li-phan-phoi', topicId: 'g7-t1', grade: 7, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Tính hợp lí bằng tính chất phân phối',
    build: (r) => {
      const m = r.int(2, 9);
      const d = r.pick([7, 9, 11, 13, 17, 19, 23]);
      const p = r.int(1, d - 1);
      const q = d - p;                    // p/d + q/d = 1
      // A = m/… : biểu thức  (m)·(p/d) + (m)·(q/d) = m
      return {
        stem: `Tính hợp lí: $A=${m}\\cdot\\f{${p}}{${d}}+${m}\\cdot\\f{${q}}{${d}}$.`,
        answer: String(m),
        thinking: [
          'Thấy **thừa số chung** $' + m + '$ ở cả hai hạng tử → đặt ra ngoài (tính chất phân phối).',
          'Sau khi đặt nhân tử chung, phần trong ngoặc thường gọn thành số đẹp.',
        ],
        solution: [
          `$A=${m}\\left(\\f{${p}}{${d}}+\\f{${q}}{${d}}\\right)$`,
          `$=${m}\\cdot\\f{${p}+${q}}{${d}}=${m}\\cdot\\f{${d}}{${d}}=${m}\\cdot1=${m}$.`,
        ],
        pitfall: 'Quy đồng và nhân bung ra sẽ mất nhiều thời gian và dễ sai số — hãy tìm nhân tử chung trước.',
      };
    },
  },

  /* ----------- 11. Phép tính hỗn hợp: căn + lũy thừa + số mũ 0 ----------- */
  {
    id: 'g7.tinh-can-luy-thua', topicId: 'g7-t1', grade: 7, level: 'TH', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Phép tính hỗn hợp căn bậc hai và lũy thừa',
    build: (r) => {
      const a = r.pick([4, 9, 16, 25, 36, 49, 64, 81, 100]);
      const sa = Math.round(Math.sqrt(a));
      const h = r.int(2, 5);
      const nam = r.pick([2024, 2025, 2026]);
      const b = r.int(2, 6);
      const val = h * sa - b * b + 1;     // h·√a − b² + nam⁰
      return {
        stem: `Thực hiện phép tính: $B=${h}\\s{${a}}-${b}^{2}+${nam}^{0}$.`,
        answer: String(val),
        thinking: [
          'Thứ tự thực hiện: **lũy thừa và căn trước**, rồi mới nhân chia, cuối cùng cộng trừ.',
          `Nhớ quy ước: mọi số khác $0$ nâng lên mũ $0$ đều bằng $1$, nên $${nam}^{0}=1$.`,
        ],
        solution: [
          `$\\s{${a}}=${sa}$ ; $${b}^{2}=${b * b}$ ; $${nam}^{0}=1$.`,
          `$B=${h}\\cdot${sa}-${b * b}+1=${h * sa}-${b * b}+1=${val}$.`,
        ],
        pitfall: `Viết $${nam}^{0}=0$ là sai — chỉ $0^{0}$ mới không xác định.`,
      };
    },
  },

  /* ----------- 12. Làm tròn và ước lượng ----------- */
  {
    id: 'g7.lam-tron', topicId: 'g7-t1', grade: 7, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Làm tròn số thập phân',
    build: (r) => {
      const nguyen = r.int(1, 99);
      const d1 = r.int(0, 9), d2 = r.int(0, 9), d3 = r.int(0, 9);
      const so = Number(`${nguyen}.${d1}${d2}${d3}`);
      const den = r.pick(['phần mười', 'phần trăm'] as const);
      const k = den === 'phần mười' ? 1 : 2;
      const dung = Number(so.toFixed(k));
      const sai = [
        Number((Math.trunc(so * 10 ** k) / 10 ** k).toFixed(k)),
        Number((dung + 10 ** -k).toFixed(k)),
        Number(so.toFixed(k === 1 ? 2 : 1)),
      ].filter((v) => v !== dung);
      while (sai.length < 3) sai.push(Number((dung + sai.length * 10 ** -k + 10 ** -k).toFixed(k)));
      const uniq: number[] = [];
      for (const v of sai) if (v !== dung && !uniq.includes(v)) uniq.push(v);
      while (uniq.length < 3) {
        const v = Number((dung + (uniq.length + 2) * 10 ** -k).toFixed(k));
        if (v !== dung && !uniq.includes(v)) uniq.push(v);
      }
      const [options, answer] = mcOptions(r, `$${String(dung).replace('.', '{,}')}$`, uniq.slice(0, 3).map((v) => `$${String(v).replace('.', '{,}')}$`));
      return {
        stem: `Làm tròn số $${String(so).replace('.', '{,}')}$ đến hàng **${den}**, ta được:`,
        options, answer,
        thinking: [
          'Xác định **chữ số hàng làm tròn**, rồi nhìn chữ số ngay sau nó.',
          'Chữ số sau $\\ge5$ thì tăng chữ số làm tròn thêm $1$; nhỏ hơn $5$ thì giữ nguyên.',
        ],
        solution: [
          `Hàng ${den} ứng với chữ số thứ ${k} sau dấu phẩy.`,
          `Chữ số đứng ngay sau là $${k === 1 ? d2 : d3}$ nên ta ${(k === 1 ? d2 : d3) >= 5 ? '**tăng thêm 1**' : '**giữ nguyên**'}.`,
          `Kết quả: $${String(dung).replace('.', '{,}')}$.`,
        ],
        pitfall: 'Cắt bỏ đuôi (chặt) không phải là làm tròn — phải nhìn chữ số kế tiếp.',
      };
    },
  },

  /* ----------- 13. Dãy tỉ số bằng nhau với hệ số ----------- */
  {
    id: 'g7.day-ti-so-he-so', topicId: 'g7-t2', grade: 7, level: 'VD', kind: 'SHORT',
    strand: 'SO_DAI_SO', tag: 'Dãy tỉ số bằng nhau có hệ số ở tử',
    build: (r) => {
      const k = r.int(2, 9);
      const p = r.int(2, 6), q = r.int(2, 6), s = r.int(2, 6);
      const x = p * k, y = q * k, z = s * k;
      const u = r.int(1, 4), v = r.int(1, 4);
      const tong = u * x + v * y;         // u·x + v·y = tong
      return {
        stem: `Cho $\\f{x}{${p}}=\\f{y}{${q}}=\\f{z}{${s}}$ và $${u === 1 ? '' : u}x+${v === 1 ? '' : v}y=${tong}$. Tính $z$.`,
        answer: String(z),
        thinking: [
          'Có hệ số kèm theo ở điều kiện thì **nhân cả tử và mẫu** của từng tỉ số với đúng hệ số đó rồi mới dùng dãy tỉ số bằng nhau.',
          `$\\f{x}{${p}}=\\f{${u === 1 ? '' : u}x}{${u * p}}$ và $\\f{y}{${q}}=\\f{${v === 1 ? '' : v}y}{${v * q}}$.`,
        ],
        solution: [
          `$\\f{x}{${p}}=\\f{${u === 1 ? '' : u}x}{${u * p}}$ ; $\\f{y}{${q}}=\\f{${v === 1 ? '' : v}y}{${v * q}}$.`,
          `Theo tính chất dãy tỉ số bằng nhau: $\\f{${u === 1 ? '' : u}x+${v === 1 ? '' : v}y}{${u * p}+${v * q}}=\\f{${tong}}{${u * p + v * q}}=${k}$.`,
          `Vậy tỉ số chung bằng $${k}$, suy ra $z=${s}\\cdot${k}=${z}$.`,
          `(Kiểm tra: $x=${x}$, $y=${y}$ và $${u === 1 ? '' : u}\\cdot${x}+${v === 1 ? '' : v}\\cdot${y}=${tong}$ — đúng.)`,
        ],
        pitfall: 'Cộng thẳng $\\f{x+y}{' + p + '+' + q + '}$ khi điều kiện có hệ số là **sai** — phải nhân hệ số vào tử và mẫu trước.',
      };
    },
  },

  /* ----------- 14. Tự luận: rút gọn và tìm x (đề cương) ----------- */
  {
    id: 'g7.tl-de-cuong-timx', topicId: 'g7-t1', grade: 7, level: 'VD', kind: 'ESSAY',
    strand: 'SO_DAI_SO', tag: 'Tự luận — tìm x tổng hợp (đề cương học kì)',
    build: (r) => {
      const a = r.pick([4, 9, 16, 25, 36]);
      const sa = Math.round(Math.sqrt(a));
      const b = r.int(2, 5);
      const c = r.int(1, 9);
      const k = r.int(2, 6);
      const x1 = k * k;                   // \s{x} = k
      return {
        stem: `Tìm $x$, biết:\n\na) $${b}x-\\s{${a}}=${c}$.\n\nb) $|${b}x-${c}|=${b * 2 + c}$.\n\nc) $(\\s{x}-${k})\\left(x^{2}-${c * c}\\right)=0$ với $x\\ge0$.`,
        answer: '',
        rubric: [
          { criterion: `a) Tính $\\s{${a}}=${sa}$ và chuyển vế đúng`, points: 0.5 },
          { criterion: `a) Kết luận $x=\\f{${c + sa}}{${b}}$`, points: 0.5 },
          { criterion: 'b) Xét đủ **hai** trường hợp của dấu giá trị tuyệt đối', points: 1 },
          { criterion: 'b) Giải và kết luận đúng cả hai nghiệm', points: 1 },
          { criterion: 'c) Đưa về phương trình tích và xét từng thừa số', points: 1 },
          { criterion: `c) Đối chiếu điều kiện $x\\ge0$, kết luận $x\\in\\{${[k * k, c].sort((p, q) => p - q).join(';')}\\}$`, points: 1 },
        ],
        thinking: [
          'Ba câu ứng với ba kĩ thuật lõi: **chuyển vế**, **phá dấu giá trị tuyệt đối theo hai trường hợp**, **đưa về phương trình tích**.',
          'Câu nào có căn hoặc giá trị tuyệt đối đều phải kèm **điều kiện** và **đối chiếu** ở cuối.',
        ],
        solution: [
          `**a)** $${b}x-${sa}=${c}\\Rightarrow ${b}x=${c + sa}\\Rightarrow x=\\f{${c + sa}}{${b}}$.`,
          `**b)** $|${b}x-${c}|=${b * 2 + c}$ nên $${b}x-${c}=${b * 2 + c}$ hoặc $${b}x-${c}=-${b * 2 + c}$.`,
          `• $${b}x=${b * 2 + 2 * c}\\Rightarrow x=\\f{${b * 2 + 2 * c}}{${b}}$.`,
          `• $${b}x=${-(b * 2)}\\Rightarrow x=${-2}$.`,
          `**c)** $(\\s{x}-${k})(x-${c})(x+${c})=0$ với $x\\ge0$.`,
          `• $\\s{x}=${k}\\Rightarrow x=${x1}$. • $x=${c}$ (nhận). • $x=-${c}$ (loại vì $x\\ge0$).`,
          `Vậy $x\\in\\{${[k * k, c].sort((p, q) => p - q).join(';')}\\}$.`,
        ],
      };
    },
  },
];
