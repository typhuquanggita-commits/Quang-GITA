import type { Grade, MindMap, WorkedExample } from '@/types';

/* =====================================================================
   MATHGITA — CHUYÊN ĐỀ BỒI DƯỠNG HỌC SINH GIỎI TOÁN THCS
   ===================================================================== */

export interface HsgTopic {
  id: string;
  grade: Grade;
  name: string;
  summary: string;
  /** Các kỹ thuật lõi cần nắm */
  techniques: { title: string; detail: string[] }[];
  mindmap: MindMap;
  examples: WorkedExample[];
}

export const HSG_TOPICS: HsgTopic[] = [
  {
    id: 'hsg-6-1', grade: 6,
    name: 'Số học nâng cao lớp 6 — Chia hết và Nguyên tố cùng nhau',
    summary: 'Kỹ thuật tổ hợp tuyến tính, nguyên lý Dirichlet cơ bản, chữ số tận cùng, tổng lũy thừa.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Khử ẩn bằng tổ hợp tuyến tính',
        detail: [
          'Đặt $d$ là ước chung của hai biểu thức chứa $n$.',
          'Nhân chéo hệ số để triệt tiêu $n$, thu được hằng số chia hết cho $d$.',
          'Chặn $d$ theo ước của hằng số đó.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Tổng lũy thừa bằng nhân cơ số rồi trừ',
        detail: [
          'Với $S=1+a+a^{2}+\\dots+a^{n}$, xét $aS$ rồi lấy $aS-S$.',
          'Kết quả: $S=\\f{a^{n+1}-1}{a-1}$.',
          'Ứng dụng: chứng minh $S$ chia hết cho một số, so sánh hai tổng.',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Chữ số tận cùng theo chu kỳ',
        detail: [
          'Chữ số tận cùng của $a^{n}$ lặp lại theo chu kỳ (thường là 4).',
          '$2$: chu kỳ $2;4;8;6$ — $3$: chu kỳ $3;9;7;1$ — $7$: chu kỳ $7;9;3;1$.',
          'Lấy $n$ chia 4 để xác định vị trí trong chu kỳ.',
        ],
      },
      {
        title: 'Kỹ thuật 4 — Nguyên lý Dirichlet (ngăn kéo)',
        detail: [
          'Nhốt $n+1$ con thỏ vào $n$ cái lồng thì có ít nhất một lồng chứa từ 2 con trở lên.',
          'Bước khó nhất là **thiết kế lồng**: thường là các lớp số dư khi chia cho $m$.',
        ],
      },
    ],
    mindmap: {
      root: 'SỐ HỌC NÂNG CAO LỚP 6',
      branches: [
        { title: 'Chia hết', items: ['Tổ hợp tuyến tính', 'Ba số liên tiếp', 'Đồng dư cơ bản'] },
        { title: 'Nguyên tố', items: ['Nguyên tố cùng nhau', 'Phân tích thừa số', 'Số ước, tổng ước'] },
        { title: 'Dãy số', items: ['Tổng lũy thừa', 'Tổng sai phân', 'Quy nạp'] },
        { title: 'Dirichlet', items: ['Thiết kế lồng theo số dư', 'Bài toán chọn số', 'Bài toán hình học rời rạc'] },
      ],
    },
    examples: [
      {
        prompt: 'Chứng minh rằng trong 6 số nguyên bất kỳ, luôn tồn tại hai số có hiệu chia hết cho 5.',
        thinking: [
          'Bài toán “tồn tại hai số có hiệu chia hết cho 5” gợi ngay Dirichlet.',
          'Hiệu chia hết cho 5 nghĩa là hai số có **cùng số dư** khi chia cho 5.',
          'Số dư khi chia cho 5 chỉ có 5 khả năng: 0, 1, 2, 3, 4 — đó chính là 5 cái lồng.',
        ],
        solution: [
          'Khi chia một số nguyên cho 5, số dư chỉ có thể là 0, 1, 2, 3 hoặc 4 — có 5 khả năng.',
          'Ta có 6 số nguyên (6 “con thỏ”) xếp vào 5 lớp số dư (5 “cái lồng”).',
          'Theo nguyên lý Dirichlet, tồn tại ít nhất hai số cùng thuộc một lớp số dư.',
          'Hai số đó có cùng số dư khi chia cho 5, nên hiệu của chúng chia hết cho 5.',
        ],
        remark: 'Mấu chốt là dịch “hiệu chia hết cho 5” thành “cùng số dư khi chia cho 5”.',
      },
    ],
  },
  {
    id: 'hsg-7-1', grade: 7,
    name: 'Đại số nâng cao lớp 7 — Cực trị và Tỉ lệ thức',
    summary: 'Kỹ thuật chặn, bất đẳng thức giá trị tuyệt đối, dãy tỉ số bằng nhau nâng cao.',
    techniques: [
      {
        title: 'Kỹ thuật chặn hai đầu',
        detail: [
          'Muốn chứng minh $A\\ge m$: biến đổi $A-m$ về tổng các bình phương hoặc giá trị tuyệt đối.',
          'Luôn kèm điều kiện dấu bằng, nếu không thì chưa kết luận được cực trị.',
        ],
      },
      {
        title: 'Dãy tỉ số bằng nhau có hệ số',
        detail: [
          '$\\f{a}{b}=\\f{c}{d}=\\f{ma+nc}{mb+nd}$ — chọn $m$, $n$ khéo để tạo ra tử/mẫu mà đề cho.',
          'Khi đề cho tích, đặt tỉ số chung bằng $t$ rồi thay vào.',
        ],
      },
    ],
    mindmap: {
      root: 'ĐẠI SỐ NÂNG CAO LỚP 7',
      branches: [
        { title: 'Cực trị', items: ['$A^{2}\\ge0$', '$\\abs{A}\\ge0$', '$\\abs{a}+\\abs{b}\\ge\\abs{a+b}$'] },
        { title: 'Tỉ lệ thức', items: ['Dãy tỉ số có hệ số', 'Đặt tham số $t$', 'Bài toán chia phần nhiều tầng'] },
        { title: 'Đa thức', items: ['Xác định đa thức', 'Nghiệm nguyên', 'Định lí Bézout'] },
      ],
    },
    examples: [
      {
        prompt: 'Cho $\\f{a}{b}=\\f{c}{d}$. Chứng minh $\\f{a+b}{a-b}=\\f{c+d}{c-d}$ (giả thiết các mẫu khác 0).',
        thinking: [
          'Đặt tỉ số chung bằng $t$ để biểu diễn $a$, $c$ theo $b$, $d$.',
          'Sau đó rút gọn cả hai vế và so sánh.',
        ],
        solution: [
          'Đặt $\\f{a}{b}=\\f{c}{d}=t\\Rightarrow a=bt$, $c=dt$.',
          '$\\f{a+b}{a-b}=\\f{bt+b}{bt-b}=\\f{b(t+1)}{b(t-1)}=\\f{t+1}{t-1}$.',
          '$\\f{c+d}{c-d}=\\f{dt+d}{dt-d}=\\f{d(t+1)}{d(t-1)}=\\f{t+1}{t-1}$.',
          'Vậy $\\f{a+b}{a-b}=\\f{c+d}{c-d}$.',
        ],
      },
    ],
  },
  {
    id: 'hsg-8-1', grade: 8,
    name: 'Đại số nâng cao lớp 8 — Phân tích nhân tử và Bất đẳng thức',
    summary: 'Thêm bớt hạng tử, hệ số bất định, bất đẳng thức Cô-si, chứng minh chia hết bằng phân tích.',
    techniques: [
      {
        title: 'Thêm bớt hạng tử',
        detail: [
          'Thêm và bớt cùng một hạng tử để tạo hằng đẳng thức.',
          'Ví dụ: $x^{4}+4=x^{4}+4x^{2}+4-4x^{2}=(x^{2}+2)^{2}-(2x)^{2}=(x^{2}-2x+2)(x^{2}+2x+2)$.',
        ],
      },
      {
        title: 'Bất đẳng thức Cô-si (AM–GM) cho hai số',
        detail: [
          '$a+b\\ge2\\s{ab}$ với $a,b\\ge0$; dấu “=” khi $a=b$.',
          'Hệ quả rất hay dùng: $x+\\f{1}{x}\\ge2$ với $x>0$.',
          'Luôn kiểm tra điều kiện không âm trước khi áp dụng.',
        ],
      },
      {
        title: 'Chứng minh chia hết bằng phân tích nhân tử',
        detail: [
          'Tách biểu thức thành tích chứa thừa số cần chia hết.',
          'Dùng “tích $k$ số nguyên liên tiếp chia hết cho $k!$”.',
        ],
      },
    ],
    mindmap: {
      root: 'ĐẠI SỐ NÂNG CAO LỚP 8',
      branches: [
        { title: 'Nhân tử', items: ['Thêm bớt hạng tử', 'Tách hạng tử', 'Hệ số bất định', 'Đặt ẩn phụ'] },
        { title: 'Bất đẳng thức', items: ['Cô-si hai số', '$A^{2}\\ge0$', '$x+\\f{1}{x}\\ge2$'] },
        { title: 'Chia hết', items: ['Số nguyên liên tiếp', 'Đồng dư', 'Quy nạp'] },
        { title: 'Phân thức', items: ['Rút gọn biểu thức lớn', 'Giá trị nguyên', 'Cực trị phân thức'] },
      ],
    },
    examples: [
      {
        prompt: 'Cho $x>0$. Tìm giá trị nhỏ nhất của $A=x+\\f{9}{x}$.',
        thinking: [
          'Hai hạng tử dương, tích của chúng là hằng số $x\\cdot\\f{9}{x}=9$ → dùng Cô-si.',
        ],
        solution: [
          'Vì $x>0$ nên $\\f{9}{x}>0$. Áp dụng bất đẳng thức Cô-si cho hai số dương:',
          '$A=x+\\f{9}{x}\\ge2\\s{x\\cdot\\f{9}{x}}=2\\s{9}=6$.',
          'Dấu “=” xảy ra khi $x=\\f{9}{x}\\Leftrightarrow x^{2}=9\\Leftrightarrow x=3$ (vì $x>0$).',
          'Vậy $A_{\\min}=6$ khi $x=3$.',
        ],
      },
    ],
  },
  {
    id: 'hsg-9-1', grade: 9,
    name: 'Chuyên đề HSG lớp 9 — Viète nâng cao, Bất đẳng thức và Hình học',
    summary: 'Ứng dụng Viète cho bài toán tham số khó, bất đẳng thức Cô-si nhiều biến, hình học phương tích và quỹ tích.',
    techniques: [
      {
        title: 'Viète nâng cao',
        detail: [
          'Hệ thức không đối xứng ($x_1=kx_2$, $x_1-x_2=m$…): kết hợp với $S$, $P$ thành hệ.',
          'Tìm hệ thức độc lập với tham số: khử $m$ giữa hai biểu thức $S$ và $P$.',
          'Bài toán về dấu, về khoảng chứa nghiệm: dùng $af(\\alpha)$ và $S$.',
        ],
      },
      {
        title: 'Bất đẳng thức Cô-si ba số',
        detail: [
          '$a+b+c\\ge3\\cb{abc}$ với $a,b,c\\ge0$; dấu “=” khi $a=b=c$.',
          'Kỹ thuật tách – ghép để tạo tích hằng số.',
          'Kỹ thuật “điểm rơi”: đoán trước giá trị dấu bằng rồi chia hệ số cho khớp.',
        ],
      },
      {
        title: 'Hình học: phương tích và điểm cố định',
        detail: [
          '$MA\\cdot MB=MC\\cdot MD=MT^{2}$ (phương tích của điểm $M$).',
          'Bài toán điểm cố định: thử hai vị trí đặc biệt để dự đoán, rồi chứng minh.',
          'Bài toán cực trị hình học: quy về một biến rồi dùng Cô-si.',
        ],
      },
    ],
    mindmap: {
      root: 'HSG TOÁN 9',
      branches: [
        { title: 'Viète nâng cao', items: ['Hệ thức không đối xứng', 'Hệ thức độc lập với $m$', 'Dấu và vị trí nghiệm'] },
        { title: 'Bất đẳng thức', items: ['Cô-si 2, 3 số', 'Kỹ thuật điểm rơi', 'Bunhiacopxki cơ bản'] },
        { title: 'Phương trình', items: ['Vô tỉ', 'Đặt ẩn phụ', 'Hệ đối xứng'] },
        { title: 'Hình học', items: ['Phương tích', 'Tứ giác nội tiếp', 'Điểm cố định – quỹ tích', 'Cực trị hình học'] },
      ],
    },
    examples: [
      {
        prompt: 'Cho phương trình $x^{2}-2mx+m-2=0$. Chứng minh phương trình luôn có hai nghiệm phân biệt với mọi $m$, và tìm hệ thức liên hệ giữa $x_1$, $x_2$ không phụ thuộc $m$.',
        thinking: [
          'Chứng minh $\\Delta\'>0$ với mọi $m$ bằng cách đưa về tổng bình phương cộng số dương.',
          'Hệ thức độc lập với $m$: viết $S$ và $P$ theo $m$ rồi khử $m$.',
        ],
        solution: [
          '$\\Delta\'=m^{2}-(m-2)=m^{2}-m+2=\\left(m-\\f{1}{2}\\right)^{2}+\\f{7}{4}>0$ với mọi $m$.',
          'Vậy phương trình luôn có hai nghiệm phân biệt.',
          'Theo Viète: $S=x_1+x_2=2m$ và $P=x_1x_2=m-2$.',
          'Từ $S=2m$ suy ra $m=\\f{S}{2}$; thay vào $P$: $P=\\f{S}{2}-2$.',
          'Do đó $2P=S-4$, tức $2x_1x_2=x_1+x_2-4$, hay $x_1+x_2-2x_1x_2-4=0$.',
          'Đây là hệ thức liên hệ giữa hai nghiệm không phụ thuộc $m$.',
        ],
        remark: 'Dạng “hệ thức độc lập với tham số” gần như năm nào cũng xuất hiện trong đề HSG và đề chuyên.',
      },
    ],
  },
];
