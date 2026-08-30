import type { HsgTopic } from './hsg';

/* =====================================================================
   MATHGITA — CHUYÊN ĐỀ HSG KHỐI 6, 8, 9 THEO BỘ ĐỀ GỐC CỦA GITA
   Số hoá và hệ thống hoá từ bộ đề "HSG Lớp 6", "Đề thi HSG Toán 8" và
   "40 đề luyện thi HSG Toán 9" của HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU
   — GITA: mỗi chuyên đề gom các dạng lặp lại nhiều nhất trong bộ đề, rút
   ra hệ kỹ thuật lõi và bổ sung phân tích tư duy từng bước.
   ===================================================================== */

export const HSG_TOPICS_GITA2: HsgTopic[] = [
  /* ============================== KHỐI 6 ============================== */
  {
    id: 'hsg-6-3', grade: 6,
    name: 'Phân số tối giản, số chính phương và so sánh biểu thức',
    summary: 'Chứng minh phân số tối giản bằng tổ hợp tuyến tính, nhận dạng số chính phương, và ba kỹ thuật so sánh phân số.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Chứng minh phân số tối giản',
        detail: [
          'Gọi $d=$ ƯCLN của tử và mẫu, suy ra tử $\\;\\vdots\\;d$ và mẫu $\\;\\vdots\\;d$.',
          'Nhân chéo hệ số rồi trừ để **khử biến $n$**, thu được một hằng số chia hết cho $d$.',
          'Từ đó $d$ là ước của hằng số ấy; loại các giá trị không thoả để kết luận $d=1$.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Nhận dạng số chính phương',
        detail: [
          'Số chính phương chỉ có chữ số tận cùng là $0;1;4;5;6;9$ — tận cùng $2;3;7;8$ thì loại ngay.',
          'Số chính phương chia $3$ dư $0$ hoặc $1$; chia $4$ dư $0$ hoặc $1$ — công cụ loại trừ rất mạnh.',
          'Với $n^{2}+k$ là chính phương, đặt $n^{2}+k=m^{2}$ rồi đưa về $(m-n)(m+n)=k$ — bài toán dạng tích.',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Ba cách so sánh phân số',
        detail: [
          'Cách 1 — **phần bù**: nếu $\\f{a}{b}$ và $\\f{c}{d}$ đều gần $1$, so sánh $1-\\f{a}{b}$ với $1-\\f{c}{d}$.',
          'Cách 2 — **bắc cầu**: tìm phân số trung gian (thường là $1$ hoặc $\\f{a}{d}$) rồi so sánh qua nó.',
          'Cách 3 — với $a,b,n>0$: $\\f{a}{b}<1\\Rightarrow\\f{a}{b}<\\f{a+n}{b+n}$ và $\\f{a}{b}>1\\Rightarrow\\f{a}{b}>\\f{a+n}{b+n}$.',
        ],
      },
    ],
    mindmap: {
      root: 'PHÂN SỐ & CHÍNH PHƯƠNG (HSG 6)',
      branches: [
        { title: 'Tối giản', items: ['Đặt $d=$ ƯCLN', 'Khử biến bằng tổ hợp', 'Chặn $d$ theo ước'] },
        { title: 'Chính phương', items: ['Chữ số tận cùng', 'Số dư khi chia $3$, $4$', 'Đưa về dạng tích'] },
        { title: 'So sánh', items: ['Phần bù', 'Bắc cầu qua $1$', 'Thêm cùng một số vào tử mẫu'] },
      ],
    },
    examples: [
      {
        prompt: 'Chứng minh rằng với mọi số tự nhiên $n$, phân số $\\f{12n+1}{30n+2}$ là phân số tối giản.',
        thinking: [
          'Tối giản nghĩa là ƯCLN của tử và mẫu bằng $1$ — hãy đặt tên cho ƯCLN đó là $d$.',
          'Cả tử và mẫu đều chứa $n$; muốn khử $n$ hãy nhân tử với $5$ và mẫu với $2$ (vì $12\\cdot5=30\\cdot2=60$).',
          'Sau khi trừ, phần chứa $n$ triệt tiêu, còn lại một hằng số nhỏ — đó là chìa khoá.',
        ],
        solution: [
          'Gọi $d=\\text{ƯCLN}(12n+1;\\;30n+2)$ với $d\\in\\N^{*}$.',
          'Khi đó $(12n+1)\\;\\vdots\\;d$ và $(30n+2)\\;\\vdots\\;d$.',
          'Suy ra $5(12n+1)\\;\\vdots\\;d$ và $2(30n+2)\\;\\vdots\\;d$, tức $(60n+5)\\;\\vdots\\;d$ và $(60n+4)\\;\\vdots\\;d$.',
          'Hiệu của chúng cũng chia hết cho $d$: $(60n+5)-(60n+4)=1\\;\\vdots\\;d$.',
          'Vậy $d=1$, nghĩa là phân số $\\f{12n+1}{30n+2}$ tối giản với mọi $n\\in\\N$. (điều phải chứng minh)',
        ],
        remark: 'Chọn hệ số nhân là chìa khoá: lấy BCNN của hai hệ số của $n$ rồi chia ngược lại.',
      },
      {
        prompt: 'Tìm số tự nhiên $n$ để $n^{2}+2006$ là một số chính phương.',
        thinking: [
          'Đặt $n^{2}+2006=m^{2}$ rồi chuyển vế: $m^{2}-n^{2}=2006$ — xuất hiện **hiệu hai bình phương**.',
          'Phân tích thành $(m-n)(m+n)=2006$ để đưa về bài toán ước số.',
          'Điểm mấu chốt: $m-n$ và $m+n$ luôn **cùng tính chẵn lẻ** (vì hiệu của chúng là $2n$, một số chẵn).',
        ],
        solution: [
          'Giả sử $n^{2}+2006=m^{2}$ với $m\\in\\N$, suy ra $m^{2}-n^{2}=2006$.',
          '$\\Leftrightarrow (m-n)(m+n)=2006$.',
          'Nhận xét: $(m+n)-(m-n)=2n$ là số chẵn, nên $m-n$ và $m+n$ **cùng chẵn hoặc cùng lẻ**.',
          '• Nếu cùng lẻ thì tích $(m-n)(m+n)$ lẻ, không thể bằng $2006$ (số chẵn).',
          '• Nếu cùng chẵn thì tích chia hết cho $4$. Nhưng $2006=2\\cdot17\\cdot59$ chỉ chia hết cho $2$, không chia hết cho $4$.',
          'Cả hai trường hợp đều mâu thuẫn. Vậy **không tồn tại** số tự nhiên $n$ nào để $n^{2}+2006$ là số chính phương.',
        ],
        remark: 'Quy tắc vàng: $a^{2}-b^{2}=N$ có nghiệm nguyên khi và chỉ khi $N$ lẻ hoặc $N$ chia hết cho $4$.',
      },
    ],
  },
  {
    id: 'hsg-6-4', grade: 6,
    name: 'Nguyên lý Dirichlet và bài toán đếm',
    summary: 'Thiết kế "lồng" theo lớp số dư, bài toán tổng dãy con chia hết, và công thức đếm giao điểm — đoạn thẳng.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Thiết kế lồng theo lớp số dư',
        detail: [
          'Muốn có hai số **hiệu chia hết cho $m$**, hãy nhốt chúng theo $m$ lớp số dư khi chia cho $m$.',
          'Có $m+1$ số thì chắc chắn hai số cùng lớp, hiệu của chúng chia hết cho $m$.',
          'Bước khó là chọn đúng đối tượng làm "thỏ" — nhiều khi phải tự dựng ra dãy tổng để làm thỏ.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Dãy tổng riêng',
        detail: [
          'Cho dãy $a_1,a_2,\\dots,a_n$, lập các **tổng riêng** $S_k=a_1+a_2+\\dots+a_k$.',
          'Nếu hai tổng riêng $S_i$ và $S_j$ ($i<j$) cùng số dư khi chia $n$ thì $S_j-S_i=a_{i+1}+\\dots+a_j$ chia hết cho $n$.',
          'Đây là cách chứng minh "tồn tại một số số liên tiếp có tổng chia hết cho $n$".',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Công thức đếm cơ bản',
        detail: [
          '$n$ đường thẳng đôi một cắt nhau, không ba đường nào đồng quy: số giao điểm $=\\f{n(n-1)}{2}$.',
          '$n$ điểm phân biệt trên một đường thẳng: số đoạn thẳng $=\\f{n(n-1)}{2}$.',
          '$n$ tia chung gốc: số góc tạo thành $=\\f{n(n-1)}{2}$. Cả ba đều là "chọn 2 trong $n$".',
        ],
      },
    ],
    mindmap: {
      root: 'DIRICHLET & ĐẾM (HSG 6)',
      branches: [
        { title: 'Dirichlet', items: ['$n+1$ thỏ, $n$ lồng', 'Lồng = lớp số dư', 'Thỏ = tổng riêng'] },
        { title: 'Dạng bài', items: ['Hiệu chia hết', 'Tổng dãy con chia hết', 'Hai số cùng tính chất'] },
        { title: 'Đếm', items: ['Giao điểm $\\f{n(n-1)}{2}$', 'Đoạn thẳng', 'Góc từ tia chung gốc'] },
      ],
    },
    examples: [
      {
        prompt: 'Cho $10$ số tự nhiên bất kỳ $a_1,a_2,\\dots,a_{10}$. Chứng minh rằng luôn tồn tại một số hoặc một tổng một số số liên tiếp trong dãy chia hết cho $10$.',
        thinking: [
          'Đề nói về "tổng các số **liên tiếp**", đó chính là dấu hiệu dùng **dãy tổng riêng**.',
          'Lập $10$ tổng riêng $S_1,\\dots,S_{10}$; nếu một tổng nào chia hết cho $10$ thì xong ngay.',
          'Nếu không, cả $10$ tổng đều có số dư thuộc $\\{1;2;\\dots;9\\}$ — $10$ con thỏ, $9$ cái lồng!',
        ],
        solution: [
          'Lập các tổng riêng $S_1=a_1$, $S_2=a_1+a_2$, ..., $S_{10}=a_1+a_2+\\dots+a_{10}$.',
          '**Trường hợp 1:** có một $S_k$ chia hết cho $10$ — khi đó $a_1+\\dots+a_k$ chính là tổng cần tìm.',
          '**Trường hợp 2:** không có $S_k$ nào chia hết cho $10$.',
          'Khi đó mỗi $S_k$ có số dư khi chia $10$ thuộc tập $\\{1;2;\\dots;9\\}$ — chỉ $9$ giá trị.',
          'Ta có $10$ tổng riêng nhưng chỉ $9$ lớp số dư, theo Dirichlet tồn tại $i<j$ với $S_i$ và $S_j$ cùng số dư.',
          'Khi đó $S_j-S_i=a_{i+1}+a_{i+2}+\\dots+a_j$ chia hết cho $10$ — đó là tổng các số liên tiếp cần tìm.',
          'Cả hai trường hợp đều cho kết luận. (điều phải chứng minh)',
        ],
        remark: 'Mẹo dựng thỏ: khi đề nói "một số số liên tiếp", hãy nghĩ ngay tới hiệu của hai tổng riêng.',
      },
      {
        prompt: 'Cho $2006$ đường thẳng, trong đó bất kỳ hai đường nào cũng cắt nhau và không có ba đường nào đồng quy. Tính số giao điểm của chúng.',
        thinking: [
          'Không có ba đường đồng quy nghĩa là **mỗi giao điểm ứng với đúng một cặp** đường thẳng.',
          'Vậy số giao điểm bằng số cách chọn $2$ đường trong $2006$ đường.',
          'Cách đếm: mỗi đường cắt $2005$ đường còn lại, nhưng mỗi giao điểm bị đếm **hai lần**.',
        ],
        solution: [
          'Mỗi đường thẳng cắt $2005$ đường còn lại, tạo ra $2005$ giao điểm.',
          'Với $2006$ đường, tổng số lượt đếm là $2006\\times2005$.',
          'Mỗi giao điểm là giao của đúng một cặp đường (vì không có ba đường đồng quy) nên bị đếm **hai lần**.',
          'Số giao điểm $=\\f{2006\\times2005}{2}=1003\\times2005=2\\,011\\,015$.',
        ],
        remark: 'Nếu đề bỏ điều kiện "không ba đường đồng quy" thì kết quả chỉ còn là **giá trị lớn nhất** của số giao điểm.',
      },
    ],
  },

  /* ============================== KHỐI 8 ============================== */
  {
    id: 'hsg-8-3', grade: 8,
    name: 'Phân tích nhân tử nâng cao và chia hết đa thức',
    summary: 'Thêm bớt hạng tử, tách hạng tử giữa, đặt ẩn phụ, và định lí Bézout để chứng minh chia hết.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Tách hạng tử giữa',
        detail: [
          'Với $ax^{2}+bx+c$, tìm hai số có **tổng bằng $b$** và **tích bằng $ac$** rồi tách $bx$ thành hai phần.',
          'Sau khi tách thì nhóm hai cặp và đặt nhân tử chung.',
          'Ví dụ: $x^{2}-7x+12$ có $-3-4=-7$ và $(-3)(-4)=12$, tách thành $x^{2}-3x-4x+12$.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Thêm bớt cùng một hạng tử',
        detail: [
          'Cộng rồi trừ cùng một hạng tử để tạo ra hằng đẳng thức.',
          'Kinh điển: $x^{4}+4=x^{4}+4x^{2}+4-4x^{2}=(x^{2}+2)^{2}-(2x)^{2}=(x^{2}-2x+2)(x^{2}+2x+2)$.',
          'Mô hình chung $a^{4}+4b^{4}=(a^{2}-2ab+2b^{2})(a^{2}+2ab+2b^{2})$ — gọi là đẳng thức Sophie Germain.',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Đặt ẩn phụ',
        detail: [
          'Với biểu thức đối xứng như $(x+1)(x+2)(x+3)(x+4)+1$, ghép cặp sao cho hai tích có phần chung.',
          'Ghép $(x+1)(x+4)=x^{2}+5x+4$ và $(x+2)(x+3)=x^{2}+5x+6$, đặt $t=x^{2}+5x+4$.',
          'Biểu thức trở thành $t(t+2)+1=(t+1)^{2}$ — bình phương hoàn hảo.',
        ],
      },
      {
        title: 'Kỹ thuật 4 — Định lí Bézout',
        detail: [
          'Đa thức $f(x)$ chia hết cho $(x-a)$ khi và chỉ khi $f(a)=0$.',
          'Muốn tìm tham số để $f(x)\\;\\vdots\\;(x-a)$, chỉ cần giải $f(a)=0$ — không cần chia đa thức.',
          'Muốn chứng minh $f(x)\\;\\vdots\\;g(x)$ với $g$ bậc hai, hãy phân tích $g$ thành tích rồi kiểm tra từng nghiệm.',
        ],
      },
    ],
    mindmap: {
      root: 'NHÂN TỬ NÂNG CAO (HSG 8)',
      branches: [
        { title: 'Đa thức bậc hai', items: ['Tách hạng tử giữa', 'Tổng $b$ tích $ac$', 'Nhóm và đặt chung'] },
        { title: 'Bậc cao', items: ['Thêm bớt hạng tử', 'Sophie Germain', 'Đặt ẩn phụ đối xứng'] },
        { title: 'Chia hết', items: ['Định lí Bézout', 'Chia có dư', 'Xét theo nghiệm của ước'] },
      ],
    },
    examples: [
      {
        prompt: 'Phân tích đa thức $A=(x+1)(x+2)(x+3)(x+4)+1$ thành nhân tử.',
        thinking: [
          'Bốn thừa số bậc nhất — nếu nhân bung ra sẽ được bậc bốn, rất rối. Phải **ghép cặp khéo**.',
          'Ghép sao cho hai tích thu được có phần $x^{2}+bx$ **giống nhau**: chọn cặp có tổng hai hằng số bằng nhau.',
          '$1+4=2+3=5$, nên ghép $(x+1)(x+4)$ với $(x+2)(x+3)$.',
        ],
        solution: [
          '$A=\\left[(x+1)(x+4)\\right]\\cdot\\left[(x+2)(x+3)\\right]+1$',
          '$=\\left(x^{2}+5x+4\\right)\\left(x^{2}+5x+6\\right)+1$.',
          'Đặt $t=x^{2}+5x+4$, khi đó $A=t(t+2)+1=t^{2}+2t+1=(t+1)^{2}$.',
          'Thay lại: $A=\\left(x^{2}+5x+5\\right)^{2}$.',
          'Nhận xét thêm: vì $A$ là bình phương của một biểu thức nên $A\\ge0$ với mọi $x$.',
        ],
        remark: 'Quy tắc ghép cặp: chọn hai cặp sao cho **tổng hai hằng số trong mỗi cặp bằng nhau**.',
      },
      {
        prompt: 'Tìm $a$ và $b$ để đa thức $f(x)=x^{4}+ax^{2}+b$ chia hết cho $g(x)=x^{2}-3x+2$.',
        thinking: [
          'Không cần đặt phép chia — hãy phân tích $g(x)$ thành tích các nhân tử bậc nhất.',
          '$x^{2}-3x+2=(x-1)(x-2)$, nên $f$ chia hết cho $g$ khi $f$ chia hết cho cả $(x-1)$ và $(x-2)$.',
          'Theo Bézout, điều đó tương đương $f(1)=0$ và $f(2)=0$ — một hệ hai phương trình hai ẩn.',
        ],
        solution: [
          '$g(x)=x^{2}-3x+2=(x-1)(x-2)$.',
          '$f(x)\\;\\vdots\\;g(x)\\Leftrightarrow f(x)\\;\\vdots\\;(x-1)$ và $f(x)\\;\\vdots\\;(x-2)$.',
          'Theo định lí Bézout, điều này tương đương $f(1)=0$ và $f(2)=0$.',
          '$f(1)=1+a+b=0\\Rightarrow a+b=-1$. (1)',
          '$f(2)=16+4a+b=0\\Rightarrow 4a+b=-16$. (2)',
          'Lấy (2) trừ (1): $3a=-15\\Rightarrow a=-5$; thay vào (1) được $b=4$.',
          'Vậy $a=-5$, $b=4$, khi đó $f(x)=x^{4}-5x^{2}+4=(x^{2}-1)(x^{2}-4)=(x-1)(x+1)(x-2)(x+2)$ ✓',
        ],
        remark: 'Luôn phân tích đa thức chia thành nhân tử trước — Bézout biến bài chia đa thức thành hệ phương trình đơn giản.',
      },
    ],
  },
  {
    id: 'hsg-8-4', grade: 8,
    name: 'Bất đẳng thức và cực trị đại số lớp 8',
    summary: 'Bất đẳng thức Cô-si với kỹ thuật điểm rơi, phương pháp SOS, và cực trị của phân thức bậc hai.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Cô-si và điểm rơi',
        detail: [
          '$a+b\\ge2\\s{ab}$; dấu bằng khi $a=b$ — đây là **điểm rơi**.',
          'Khi biến bị ràng buộc (ví dụ $x\\ge2$), điểm rơi tự nhiên có thể nằm ngoài miền; khi đó phải **tách hệ số** cho điểm rơi rơi đúng vào biên.',
          'Ví dụ tìm min của $x+\\f{1}{x}$ với $x\\ge2$: tách $x+\\f{1}{x}=\\f{x}{4}+\\f{1}{x}+\\f{3x}{4}$ để điểm rơi về $x=2$.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Phương pháp SOS (tổng bình phương)',
        detail: [
          'Chuyển toàn bộ về một vế rồi biến đổi thành **tổng các bình phương**.',
          '$a^{2}+b^{2}+c^{2}\\ge ab+bc+ca$ vì hiệu bằng $\\f{1}{2}\\left[(a-b)^{2}+(b-c)^{2}+(c-a)^{2}\\right]$.',
          'Đây là cách chứng minh chắc chắn nhất — không cần điều kiện dấu của biến.',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Cực trị phân thức bậc hai',
        detail: [
          'Với $P=\\f{ax^{2}+bx+c}{dx^{2}+ex+f}$ (mẫu luôn dương), đặt $P=m$ rồi chuyển thành phương trình bậc hai theo $x$.',
          'Phương trình có nghiệm $\\Leftrightarrow \\Delta\\ge0$ — điều kiện này cho miền giá trị của $m$.',
          'Hai đầu mút của miền chính là giá trị nhỏ nhất và lớn nhất của $P$.',
        ],
      },
    ],
    mindmap: {
      root: 'BẤT ĐẲNG THỨC (HSG 8)',
      branches: [
        { title: 'Cô-si', items: ['$a+b\\ge2\\s{ab}$', 'Điểm rơi', 'Tách hệ số'] },
        { title: 'SOS', items: ['Chuyển về một vế', 'Ghép bình phương', 'Kết luận dấu bằng'] },
        { title: 'Phân thức', items: ['Đặt $P=m$', 'Điều kiện $\\Delta\\ge0$', 'Đọc miền giá trị'] },
      ],
    },
    examples: [
      {
        prompt: 'Cho $a$, $b$, $c$ là các số thực. Chứng minh rằng $a^{2}+b^{2}+c^{2}\\ge ab+bc+ca$.',
        thinking: [
          'Đề không cho điều kiện dương, nên **không dùng được Cô-si** — phải dùng SOS.',
          'Chuyển tất cả về vế trái rồi tìm cách ghép thành tổng bình phương.',
          'Mẹo: nhân hai vế với $2$ để mỗi $a^{2}$ đủ dùng cho hai bình phương khác nhau.',
        ],
        solution: [
          'Bất đẳng thức cần chứng minh tương đương với $a^{2}+b^{2}+c^{2}-ab-bc-ca\\ge0$.',
          'Nhân hai vế với $2$ (không đổi chiều vì $2>0$): $2a^{2}+2b^{2}+2c^{2}-2ab-2bc-2ca\\ge0$.',
          'Nhóm lại: $\\left(a^{2}-2ab+b^{2}\\right)+\\left(b^{2}-2bc+c^{2}\\right)+\\left(c^{2}-2ca+a^{2}\\right)\\ge0$',
          '$\\Leftrightarrow (a-b)^{2}+(b-c)^{2}+(c-a)^{2}\\ge0$.',
          'Bất đẳng thức cuối luôn đúng vì là tổng ba bình phương.',
          'Dấu "$=$" xảy ra khi $a=b=c$. (điều phải chứng minh)',
        ],
        remark: 'Nhân $2$ trước khi nhóm là bước then chốt — nếu không, mỗi $a^{2}$ chỉ đủ cho một bình phương.',
      },
      {
        prompt: 'Tìm giá trị nhỏ nhất và giá trị lớn nhất của biểu thức $P=\\f{x^{2}+x+1}{x^{2}+1}$.',
        thinking: [
          'Mẫu $x^{2}+1>0$ với mọi $x$ nên $P$ xác định trên toàn $\\R$ — không phải đặt điều kiện.',
          'Kỹ thuật chuẩn: đặt $P=m$, quy đồng rồi xem như **phương trình bậc hai theo $x$**.',
          '$P$ nhận giá trị $m$ khi và chỉ khi phương trình đó **có nghiệm**, tức $\\Delta\\ge0$.',
        ],
        solution: [
          'Đặt $P=m$, ta có $\\f{x^{2}+x+1}{x^{2}+1}=m$ với mọi $x$ (mẫu luôn dương).',
          '$\\Leftrightarrow x^{2}+x+1=m\\left(x^{2}+1\\right)\\Leftrightarrow (m-1)x^{2}-x+(m-1)=0$. (\\*)',
          '**Trường hợp $m=1$:** (\\*) thành $-x=0\\Rightarrow x=0$ — có nghiệm, nên $m=1$ nhận được.',
          '**Trường hợp $m\\ne1$:** (\\*) là phương trình bậc hai, có nghiệm $\\Leftrightarrow\\Delta\\ge0$.',
          '$\\Delta=1-4(m-1)^{2}\\ge0\\Leftrightarrow (m-1)^{2}\\le\\f{1}{4}\\Leftrightarrow -\\f{1}{2}\\le m-1\\le\\f{1}{2}$.',
          'Suy ra $\\f{1}{2}\\le m\\le\\f{3}{2}$.',
          '$P_{\\min}=\\f{1}{2}$ khi $x=-1$; $P_{\\max}=\\f{3}{2}$ khi $x=1$.',
        ],
        remark: 'Đừng quên xét riêng trường hợp hệ số bậc hai bằng $0$ — nếu bỏ qua, lời giải thiếu chặt chẽ.',
      },
    ],
  },

  /* ============================== KHỐI 9 ============================== */
  {
    id: 'hsg-9-3', grade: 9,
    name: 'Bất đẳng thức thi HSG lớp 9',
    summary: 'Cô-si ba số, bất đẳng thức Bunhiacopxki, kỹ thuật Cauchy–Schwarz dạng cộng mẫu và kỹ thuật điểm rơi.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Cô-si cho ba số',
        detail: [
          '$a+b+c\\ge3\\cb{abc}$ với $a,b,c\\ge0$; dấu bằng khi $a=b=c$.',
          'Dạng hay dùng: $\\f{a}{b}+\\f{b}{c}+\\f{c}{a}\\ge3$ với $a,b,c>0$ (tích ba số hạng bằng $1$).',
          'Muốn tách một hạng tử thành ba phần bằng nhau tại điểm rơi thì phải chọn hệ số cẩn thận.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Bunhiacopxki',
        detail: [
          '$\\left(a^{2}+b^{2}\\right)\\left(x^{2}+y^{2}\\right)\\ge(ax+by)^{2}$; dấu bằng khi $\\f{a}{x}=\\f{b}{y}$.',
          'Rất hiệu quả khi đề cho **tổng bình phương** và hỏi về **tổng bậc nhất** (hoặc ngược lại).',
          'Mở rộng cho ba số: $\\left(a^{2}+b^{2}+c^{2}\\right)\\left(x^{2}+y^{2}+z^{2}\\right)\\ge(ax+by+cz)^{2}$.',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Cauchy–Schwarz dạng cộng mẫu',
        detail: [
          '$\\f{a^{2}}{x}+\\f{b^{2}}{y}\\ge\\f{(a+b)^{2}}{x+y}$ với $x,y>0$; dấu bằng khi $\\f{a}{x}=\\f{b}{y}$.',
          'Mở rộng ba số: $\\f{a^{2}}{x}+\\f{b^{2}}{y}+\\f{c^{2}}{z}\\ge\\f{(a+b+c)^{2}}{x+y+z}$.',
          'Đây là công cụ mạnh nhất cho các bài tổng phân thức có tử là bình phương.',
        ],
      },
      {
        title: 'Kỹ thuật 4 — Dự đoán điểm rơi trước khi làm',
        detail: [
          'Bài đối xứng thì điểm rơi thường tại $a=b=c$; thay vào ràng buộc để tìm giá trị cụ thể.',
          'Biết điểm rơi rồi mới chọn cách tách hạng tử sao cho dấu bằng xảy ra đúng tại đó.',
          'Không dự đoán điểm rơi trước thì rất dễ áp Cô-si sai chỗ và bất đẳng thức không chặt.',
        ],
      },
    ],
    mindmap: {
      root: 'BẤT ĐẲNG THỨC (HSG 9)',
      branches: [
        { title: 'Công cụ', items: ['Cô-si $n$ số', 'Bunhiacopxki', 'Cauchy–Schwarz cộng mẫu'] },
        { title: 'Quy trình', items: ['Dự đoán điểm rơi', 'Chọn cách tách', 'Kiểm tra dấu bằng'] },
        { title: 'Dạng thường gặp', items: ['Tổng phân thức', 'Ràng buộc tổng bằng hằng số', 'Cực trị có điều kiện'] },
      ],
    },
    examples: [
      {
        prompt: 'Cho $a$, $b$, $c$ là các số dương thoả mãn $a+b+c=1$. Chứng minh rằng $\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\ge9$.',
        thinking: [
          'Bài đối xứng và ràng buộc là tổng bằng $1$, nên điểm rơi chắc chắn tại $a=b=c=\\f{1}{3}$.',
          'Thử tại điểm rơi: vế trái bằng $3+3+3=9$ — khớp với vế phải, vậy bất đẳng thức là **chặt**.',
          'Có hai đường: Cauchy–Schwarz dạng cộng mẫu (nhanh nhất), hoặc nhân với $a+b+c$ rồi dùng Cô-si.',
        ],
        solution: [
          'Áp dụng bất đẳng thức Cauchy–Schwarz dạng cộng mẫu với $a,b,c>0$:',
          '$\\f{1}{a}+\\f{1}{b}+\\f{1}{c}=\\f{1^{2}}{a}+\\f{1^{2}}{b}+\\f{1^{2}}{c}\\ge\\f{(1+1+1)^{2}}{a+b+c}$.',
          'Thay $a+b+c=1$: $\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\ge\\f{9}{1}=9$.',
          'Dấu "$=$" xảy ra khi $\\f{1}{a}=\\f{1}{b}=\\f{1}{c}$, tức $a=b=c=\\f{1}{3}$.',
          '(Cách 2: từ Cô-si, $(a+b+c)\\left(\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\right)\\ge9$, rồi thay $a+b+c=1$.)',
        ],
        remark: 'Luôn thử điểm rơi trước: nếu hai vế bằng nhau tại đó thì bất đẳng thức chặt và cách làm sẽ đi đúng hướng.',
      },
      {
        prompt: 'Cho $x$, $y$ là các số thực thoả mãn $x^{2}+y^{2}=1$. Tìm giá trị lớn nhất của $P=x+y$.',
        thinking: [
          'Đề cho **tổng bình phương**, hỏi về **tổng bậc nhất** — đúng mô hình của Bunhiacopxki.',
          'Áp dụng với bộ $(1;1)$ và $(x;y)$ để nối hai đại lượng đó.',
          'Nhớ rằng $P$ có thể âm, nên kết quả là $|P|\\le\\s{2}$; giá trị lớn nhất là $\\s{2}$.',
        ],
        solution: [
          'Áp dụng bất đẳng thức Bunhiacopxki cho hai bộ số $(1;1)$ và $(x;y)$:',
          '$(x+y)^{2}=(1\\cdot x+1\\cdot y)^{2}\\le\\left(1^{2}+1^{2}\\right)\\left(x^{2}+y^{2}\\right)=2\\cdot1=2$.',
          'Suy ra $|x+y|\\le\\s{2}$, tức $-\\s{2}\\le P\\le\\s{2}$.',
          'Dấu "$=$" ở vế phải xảy ra khi $\\f{x}{1}=\\f{y}{1}$ và $x+y>0$, tức $x=y=\\f{\\s{2}}{2}$.',
          'Kiểm tra: $x^{2}+y^{2}=\\f{1}{2}+\\f{1}{2}=1$ ✓ và $P=\\s{2}$.',
          'Vậy $P_{\\max}=\\s{2}$ khi $x=y=\\f{\\s{2}}{2}$.',
        ],
        remark: 'Bunhiacopxki cho $(x+y)^{2}$ nên kết quả là chặn hai phía — phải nói rõ lấy dấu nào để có giá trị lớn nhất.',
      },
    ],
  },
  {
    id: 'hsg-9-4', grade: 9,
    name: 'Phương trình vô tỉ và hệ phương trình nâng cao',
    summary: 'Đặt ẩn phụ, nhân liên hợp, đánh giá hai vế, và các hệ đối xứng loại I – loại II.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Đặt ẩn phụ',
        detail: [
          'Thấy một biểu thức lặp lại dưới nhiều dạng thì đặt nó làm ẩn phụ $t$ (nhớ kèm **điều kiện của $t$**).',
          'Với $\\s{f(x)}$ xuất hiện cùng $f(x)$, đặt $t=\\s{f(x)}\\ge0$ thì $f(x)=t^{2}$.',
          'Với hai căn $\\s{a}$, $\\s{b}$ mà $a+b$ hoặc $a-b$ là hằng số, đặt cả hai làm ẩn rồi lập hệ.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Nhân liên hợp',
        detail: [
          '$\\s{A}-\\s{B}=\\f{A-B}{\\s{A}+\\s{B}}$ — biến hiệu hai căn thành phân thức không còn căn ở tử.',
          'Dùng khi nhẩm được một nghiệm $x_0$: tách nhân tử $(x-x_0)$ ra khỏi cả hai vế.',
          'Phần còn lại sau khi tách thường vô nghiệm do đánh giá được dấu.',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Đánh giá hai vế',
        detail: [
          'Chứng minh vế trái $\\ge m$ và vế phải $\\le m$; phương trình có nghiệm khi cả hai cùng bằng $m$.',
          'Thường dùng khi một vế là tổng các căn, vế kia là đa thức bậc hai.',
          'Nghiệm tìm được phải thoả **đồng thời** cả hai điều kiện dấu bằng.',
        ],
      },
      {
        title: 'Kỹ thuật 4 — Hệ đối xứng',
        detail: [
          'Hệ **đối xứng loại I** (đổi chỗ $x$, $y$ hệ không đổi): đặt $S=x+y$, $P=xy$ rồi giải theo $S$, $P$; điều kiện $S^{2}\\ge4P$.',
          'Hệ **đối xứng loại II** (đổi chỗ $x$, $y$ thì hai phương trình hoán vị cho nhau): **trừ vế theo vế** để có nhân tử $(x-y)$.',
          'Sau khi có $(x-y)(\\dots)=0$, xét hai nhánh: $x=y$ và nhánh còn lại.',
        ],
      },
    ],
    mindmap: {
      root: 'PT VÔ TỈ & HỆ PT (HSG 9)',
      branches: [
        { title: 'Phương trình vô tỉ', items: ['Đặt ẩn phụ', 'Nhân liên hợp', 'Đánh giá hai vế', 'Bình phương có điều kiện'] },
        { title: 'Hệ đối xứng I', items: ['Đặt $S$, $P$', 'Điều kiện $S^{2}\\ge4P$', 'Viète đảo'] },
        { title: 'Hệ đối xứng II', items: ['Trừ theo vế', 'Nhân tử $(x-y)$', 'Xét hai nhánh'] },
      ],
    },
    examples: [
      {
        prompt: 'Giải phương trình $x^{2}+\\s{x+1}=1$.',
        thinking: [
          'Có $\\s{x+1}$ và cũng có $x^{2}$; nếu đặt $t=\\s{x+1}$ thì $x=t^{2}-1$ và mọi thứ quy về ẩn $t$.',
          'Điều kiện bắt buộc: $x+1\\ge0$ tức $x\\ge-1$, và $t\\ge0$.',
          'Sau khi đặt sẽ ra phương trình bậc bốn theo $t$ — nhưng nó phân tích được thành tích.',
        ],
        solution: [
          'Điều kiện: $x+1\\ge0\\Leftrightarrow x\\ge-1$.',
          'Đặt $t=\\s{x+1}\\ge0$, suy ra $x=t^{2}-1$.',
          'Phương trình thành $\\left(t^{2}-1\\right)^{2}+t=1\\Leftrightarrow t^{4}-2t^{2}+1+t=1$',
          '$\\Leftrightarrow t^{4}-2t^{2}+t=0\\Leftrightarrow t\\left(t^{3}-2t+1\\right)=0$.',
          '$t^{3}-2t+1$ có nghiệm $t=1$ nên tách được: $t^{3}-2t+1=(t-1)\\left(t^{2}+t-1\\right)$.',
          'Vậy $t\\left(t-1\\right)\\left(t^{2}+t-1\\right)=0$.',
          '• $t=0\\Rightarrow x=-1$ (thoả điều kiện).',
          '• $t=1\\Rightarrow x=0$ (thoả điều kiện).',
          '• $t^{2}+t-1=0\\Rightarrow t=\\f{-1+\\s{5}}{2}$ (lấy nghiệm không âm) $\\Rightarrow x=t^{2}-1=\\f{1-\\s{5}}{2}$.',
          'Thử lại cả ba giá trị đều thoả mãn. Vậy $x\\in\\left\\{-1;\\;0;\\;\\f{1-\\s{5}}{2}\\right\\}$.',
        ],
        remark: 'Đặt ẩn phụ phải kèm điều kiện $t\\ge0$; nếu quên, ta sẽ nhận thêm nghiệm ngoại lai từ $t^{2}+t-1=0$.',
      },
      {
        prompt: 'Giải hệ phương trình $\\sys{x^{2}=3x+2y\\\\y^{2}=3y+2x}$.',
        thinking: [
          'Đổi chỗ $x$ và $y$ thì hai phương trình hoán vị cho nhau — đây là hệ **đối xứng loại II**.',
          'Phản xạ chuẩn: **trừ vế theo vế** để tạo ra nhân tử $(x-y)$.',
          'Sau đó xét hai nhánh $x=y$ và nhánh còn lại; mỗi nhánh thay lại vào một phương trình ban đầu.',
        ],
        solution: [
          'Trừ vế theo vế: $x^{2}-y^{2}=3x+2y-3y-2x=x-y$.',
          '$\\Leftrightarrow (x-y)(x+y)=(x-y)\\Leftrightarrow (x-y)(x+y-1)=0$.',
          '**Nhánh 1:** $x=y$. Thay vào phương trình đầu: $x^{2}=3x+2x=5x\\Leftrightarrow x(x-5)=0$.',
          'Được $x=0$ hoặc $x=5$, tương ứng $(x;y)=(0;0)$ và $(5;5)$.',
          '**Nhánh 2:** $x+y=1$, tức $y=1-x$. Thay vào phương trình đầu:',
          '$x^{2}=3x+2(1-x)=x+2\\Leftrightarrow x^{2}-x-2=0\\Leftrightarrow (x-2)(x+1)=0$.',
          'Được $x=2$, $y=-1$ hoặc $x=-1$, $y=2$.',
          'Vậy hệ có bốn nghiệm: $(0;0)$, $(5;5)$, $(2;-1)$, $(-1;2)$.',
        ],
        remark: 'Sau khi trừ vế, tuyệt đối không chia cho $(x-y)$ — làm vậy sẽ **mất nghiệm** ở nhánh $x=y$.',
      },
    ],
  },
];
