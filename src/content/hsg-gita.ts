import type { HsgTopic } from './hsg';

/* =====================================================================
   MATHGITA — CHUYÊN ĐỀ BỒI DƯỠNG HSG THEO BỘ GIÁO ÁN GỐC CỦA GITA
   Số hoá từ tài liệu "9 chuyên đề bồi dưỡng học sinh giỏi Toán 7" của
   HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA. Mỗi chuyên đề giữ nguyên
   hệ kỹ thuật lõi của bản gốc, bổ sung phần phân tích tư duy từng bước
   theo chuẩn biên soạn MATHGITA.
   ===================================================================== */

export const HSG_TOPICS_GITA: HsgTopic[] = [
  /* ---------------------------------------------------------------- */
  {
    id: 'hsg-7-3', grade: 7,
    name: 'Dãy tỉ số bằng nhau — Kỹ thuật của bộ HSG GITA',
    summary: 'Bốn kỹ thuật chuẩn: nhân hệ số vào tử–mẫu, đặt tham số t, tạo tổng/hiệu theo đề, và xử lý điều kiện mẫu bằng 0.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Nhân hệ số vào cả tử và mẫu',
        detail: [
          'Điều kiện có hệ số ($mx+ny=k$) thì phải nhân hệ số vào **cả tử và mẫu** của tỉ số tương ứng.',
          '$\\f{x}{a}=\\f{mx}{ma}$ — sau đó mới được cộng tử với tử, mẫu với mẫu.',
          'Sai lầm kinh điển: cộng thẳng $\\f{x+y}{a+b}$ khi đề cho $mx+ny$.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Đặt tham số $t$',
        detail: [
          'Đặt $\\f{x}{a}=\\f{y}{b}=\\f{z}{c}=t$ rồi viết $x=at$, $y=bt$, $z=ct$.',
          'Thay vào điều kiện còn lại để tìm $t$ — cách này **luôn dùng được**, kể cả khi điều kiện là tích hoặc bậc hai.',
          'Khi điều kiện chứa tích ($xy=k$ hay $x^{2}+y^{2}=k$) thì đây là cách duy nhất gọn gàng.',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Tạo tổng hoặc hiệu đúng như đề',
        detail: [
          'Từ $\\f{a}{b}=\\f{c}{d}$ suy ra $\\f{a}{b}=\\f{c}{d}=\\f{a\\pm c}{b\\pm d}=\\f{ma+nc}{mb+nd}$.',
          'Nhìn vào biểu thức đề hỏi để chọn $m$, $n$ cho khớp — đây là bước "đọc vị" của dạng này.',
        ],
      },
      {
        title: 'Kỹ thuật 4 — Kiểm tra mẫu khác 0',
        detail: [
          'Tính chất $\\f{a+c}{b+d}$ chỉ dùng được khi $b+d\\ne0$.',
          'Với bài dạng $\\f{x}{y+z}=\\f{y}{z+x}=\\f{z}{x+y}$, phải xét riêng hai trường hợp $x+y+z=0$ và $x+y+z\\ne0$.',
        ],
      },
    ],
    mindmap: {
      root: 'DÃY TỈ SỐ BẰNG NHAU (HSG 7)',
      branches: [
        { title: 'Vào bài', items: ['Điều kiện dạng tổng → cộng tử mẫu', 'Điều kiện dạng tích → đặt $t$', 'Có hệ số → nhân vào tử mẫu'] },
        { title: 'Chứng minh đẳng thức', items: ['Đặt $t$ rồi thay hai vế', 'Biến đổi tương đương', 'Dùng tính chất tỉ lệ thức $ad=bc$'] },
        { title: 'Bẫy', items: ['Quên xét mẫu $=0$', 'Cộng thẳng khi có hệ số', 'Quên trường hợp $x+y+z=0$'] },
      ],
    },
    examples: [
      {
        prompt: 'Cho $\\f{x}{y+z}=\\f{y}{z+x}=\\f{z}{x+y}$ với $x$, $y$, $z$ khác $0$. Tính giá trị của $M=\\f{x}{y+z}$.',
        thinking: [
          'Thấy dãy tỉ số bằng nhau, phản xạ đầu tiên là cộng tử với tử, mẫu với mẫu.',
          'Nhưng phải cẩn thận: mẫu tổng là $2(x+y+z)$, chỉ dùng được khi $x+y+z\\ne0$.',
          'Vậy bắt buộc chia **hai trường hợp** — đây chính là điểm phân loại của bài này.',
        ],
        solution: [
          '**Trường hợp 1:** $x+y+z\\ne0$.',
          'Áp dụng tính chất dãy tỉ số bằng nhau: $\\f{x}{y+z}=\\f{y}{z+x}=\\f{z}{x+y}=\\f{x+y+z}{2(x+y+z)}=\\f{1}{2}$.',
          'Vậy $M=\\f{1}{2}$.',
          '**Trường hợp 2:** $x+y+z=0$.',
          'Khi đó $y+z=-x$, nên $M=\\f{x}{y+z}=\\f{x}{-x}=-1$ (vì $x\\ne0$).',
          'Vậy $M=\\f{1}{2}$ hoặc $M=-1$.',
        ],
        remark: 'Bỏ quên trường hợp $x+y+z=0$ là lỗi mất điểm phổ biến nhất của dạng này ở kỳ thi HSG.',
      },
      {
        prompt: 'Tìm $x$, $y$ biết $\\f{x}{3}=\\f{y}{5}$ và $2x^{2}-y^{2}=-7$.',
        thinking: [
          'Điều kiện thứ hai chứa **bình phương**, không cộng tử mẫu được — phải đặt tham số.',
          'Đặt tỉ số chung bằng $t$ rồi biểu diễn $x$, $y$ qua $t$, thay vào điều kiện là ra phương trình một ẩn.',
        ],
        solution: [
          'Đặt $\\f{x}{3}=\\f{y}{5}=t$, suy ra $x=3t$ và $y=5t$.',
          'Thay vào: $2(3t)^{2}-(5t)^{2}=-7\\Leftrightarrow 18t^{2}-25t^{2}=-7\\Leftrightarrow -7t^{2}=-7$.',
          '$t^{2}=1\\Rightarrow t=1$ hoặc $t=-1$.',
          'Với $t=1$: $x=3$, $y=5$. Với $t=-1$: $x=-3$, $y=-5$.',
          'Vậy $(x;y)\\in\\{(3;5);(-3;-5)\\}$.',
        ],
        remark: 'Hễ điều kiện chứa tích hoặc luỹ thừa, hãy đặt tham số $t$ ngay — đừng cố cộng tử mẫu.',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'hsg-7-4', grade: 7,
    name: 'Giá trị nguyên của biến và của biểu thức',
    summary: 'Tách phần nguyên, đưa về bài toán ước số, phương trình nghiệm nguyên dạng tích, và chặn miền giá trị.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Tách phần nguyên rồi xét ước',
        detail: [
          'Với $A=\\f{f(x)}{g(x)}$, chia $f$ cho $g$ để viết $A=q(x)+\\f{r}{g(x)}$ với $r$ là **hằng số**.',
          '$A$ nguyên $\\Leftrightarrow g(x)$ là ước của $r$ — bài toán chuyển thành lập bảng ước.',
          'Nếu chia mà phần dư vẫn chứa biến thì hãy nhân thêm hệ số cho tử trước khi chia.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Đưa về phương trình dạng tích',
        detail: [
          'Với phương trình nghiệm nguyên hai ẩn, nhóm lại thành $(\\text{biểu thức}_1)(\\text{biểu thức}_2)=k$.',
          'Ví dụ $xy+3x-y=6\\Leftrightarrow(x-1)(y+3)=3$.',
          'Sau đó lập bảng các cặp ước của $k$ (nhớ cả **ước âm**).',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Chặn miền giá trị',
        detail: [
          'Dùng tính không âm của bình phương và giá trị tuyệt đối để chặn biến vào một khoảng hữu hạn.',
          'Ví dụ từ $7(x-2004)^{2}=23-y^{2}$ suy ra $y^{2}\\le23$, tức $y\\in\\{0;1;2;3;4\\}$ — chỉ còn vài trường hợp để thử.',
        ],
      },
      {
        title: 'Kỹ thuật 4 — Dùng tính chất số nguyên tố',
        detail: [
          'Nếu $p$ nguyên tố và $p\\;|\\;ab$ thì $p\\;|\\;a$ hoặc $p\\;|\\;b$.',
          'Với bài "tìm số nguyên tố", hãy xét riêng $p=2$ (số nguyên tố chẵn duy nhất) rồi xét $p$ lẻ.',
        ],
      },
    ],
    mindmap: {
      root: 'GIÁ TRỊ NGUYÊN (HSG 7)',
      branches: [
        { title: 'Phân thức nguyên', items: ['Tách phần nguyên', 'Lập bảng ước', 'Đối chiếu điều kiện'] },
        { title: 'Nghiệm nguyên', items: ['Đưa về dạng tích', 'Chặn miền giá trị', 'Xét theo số dư'] },
        { title: 'Số nguyên tố', items: ['Tách $p=2$ và $p$ lẻ', 'Tính chất $p\\;|\\;ab$', 'Chặn rồi thử'] },
      ],
    },
    examples: [
      {
        prompt: 'Tìm các số nguyên $x$, $y$ thoả mãn $xy+3x-y=6$.',
        thinking: [
          'Một phương trình, hai ẩn nguyên → phải đưa về **dạng tích** rồi xét ước.',
          'Nhóm $x$ ra: $x(y+3)-y=6$. Muốn ngoặc thứ hai cũng chứa $(y+3)$ thì cộng thêm $3$ vào hai vế.',
          'Sau khi có tích bằng hằng số, nhớ liệt kê **cả ước âm**.',
        ],
        solution: [
          '$xy+3x-y=6\\Leftrightarrow x(y+3)-(y+3)=6-3$',
          '$\\Leftrightarrow (x-1)(y+3)=3$.',
          'Vì $x$, $y$ nguyên nên $x-1$ và $y+3$ là các ước nguyên của $3$: $\\{1;3;-1;-3\\}$.',
          '• $x-1=1$, $y+3=3\\Rightarrow x=2$, $y=0$.',
          '• $x-1=3$, $y+3=1\\Rightarrow x=4$, $y=-2$.',
          '• $x-1=-1$, $y+3=-3\\Rightarrow x=0$, $y=-6$.',
          '• $x-1=-3$, $y+3=-1\\Rightarrow x=-2$, $y=-4$.',
          'Vậy $(x;y)\\in\\{(2;0);(4;-2);(0;-6);(-2;-4)\\}$.',
        ],
        remark: 'Chỉ liệt kê ước dương là mất một nửa số nghiệm — đây là bẫy được cài trong hầu hết đề HSG.',
      },
      {
        prompt: 'Tìm số nguyên $m$ để giá trị của biểu thức $m-1$ chia hết cho giá trị của biểu thức $2m+1$.',
        thinking: [
          'Muốn so sánh $m-1$ với $2m+1$, hãy **nhân đôi** $m-1$ để hai biểu thức cùng bậc theo $m$.',
          'Khi đó hiệu của chúng là hằng số — bài toán quy về xét ước của hằng số ấy.',
        ],
        solution: [
          'Ta có $(m-1)\\;\\vdots\\;(2m+1)\\Rightarrow 2(m-1)\\;\\vdots\\;(2m+1)$.',
          '$2(m-1)=2m-2=(2m+1)-3$.',
          'Vì $(2m+1)\\;\\vdots\\;(2m+1)$ nên suy ra $3\\;\\vdots\\;(2m+1)$.',
          'Do đó $2m+1\\in\\text{Ư}(3)=\\{1;-1;3;-3\\}$.',
          '$2m+1=1\\Rightarrow m=0$ · $2m+1=-1\\Rightarrow m=-1$ · $2m+1=3\\Rightarrow m=1$ · $2m+1=-3\\Rightarrow m=-2$.',
          'Thử lại cả bốn giá trị đều thoả. Vậy $m\\in\\{-2;-1;0;1\\}$.',
        ],
        remark: 'Mẹo "nhân hệ số cho cùng bậc rồi trừ" là chìa khoá của mọi bài chia hết chứa tham số.',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'hsg-7-5', grade: 7,
    name: 'Cực trị của biểu thức — Kỹ thuật hoàn chỉnh bình phương',
    summary: 'Đưa về tổng bình phương, dùng bất đẳng thức giá trị tuyệt đối, và kỹ thuật với phân thức có tử hằng số.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Hoàn chỉnh bình phương',
        detail: [
          '$ax^{2}+bx+c=a\\left(x+\\f{b}{2a}\\right)^{2}+\\f{4ac-b^{2}}{4a}$.',
          '$a>0$: biểu thức có **giá trị nhỏ nhất** $\\f{4ac-b^{2}}{4a}$ khi $x=-\\f{b}{2a}$.',
          '$a<0$: biểu thức có **giá trị lớn nhất** cũng tại $x=-\\f{b}{2a}$.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Bất đẳng thức giá trị tuyệt đối',
        detail: [
          '$|A|+|B|\\ge|A+B|$, dấu bằng khi $A\\cdot B\\ge0$.',
          '$|A|-|B|\\le|A-B|$, dấu bằng khi $A$, $B$ cùng dấu và $|A|\\ge|B|$.',
          'Mẹo tìm GTNN của $|x-a|+|x-b|$: kết quả là $|a-b|$, đạt được khi $x$ nằm **giữa** $a$ và $b$.',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Phân thức có tử là hằng số',
        detail: [
          'Với $P=\\f{k}{f(x)}$ và $k>0$: $P$ lớn nhất khi $f(x)$ **nhỏ nhất và dương**.',
          'Thường gặp $f(x)=|x-a|+m$, nhỏ nhất bằng $m$ khi $x=a$.',
        ],
      },
      {
        title: 'Kỹ thuật 4 — Ba bước bắt buộc của lời giải cực trị',
        detail: [
          'Bước 1: chứng minh bất đẳng thức $A\\ge m$ (hoặc $A\\le M$) đúng với **mọi** giá trị của biến.',
          'Bước 2: chỉ ra giá trị cụ thể của biến làm dấu bằng xảy ra.',
          'Bước 3: kết luận. **Thiếu bước 2 thì chưa được tính điểm** dù bất đẳng thức đúng.',
        ],
      },
    ],
    mindmap: {
      root: 'CỰC TRỊ BIỂU THỨC (HSG 7)',
      branches: [
        { title: 'Công cụ', items: ['$A^{2}\\ge0$', '$|A|\\ge0$', '$|A|+|B|\\ge|A+B|$'] },
        { title: 'Đa thức bậc hai', items: ['Hoàn chỉnh bình phương', 'Xét dấu hệ số $a$', 'Điểm rơi $x=-\\f{b}{2a}$'] },
        { title: 'Chứa trị tuyệt đối', items: ['$|x-a|+|x-b|$', 'Nhóm cặp đối nhau', 'Xét khoảng'] },
        { title: 'Phân thức', items: ['Tử dương → mẫu nhỏ nhất', 'Tử âm → mẫu lớn nhất', 'Luôn kiểm tra mẫu $\\ne0$'] },
      ],
    },
    examples: [
      {
        prompt: 'Tìm giá trị nhỏ nhất của biểu thức $A=|x-3|+|x-7|$.',
        thinking: [
          'Tổng hai giá trị tuyệt đối có dạng $|x-a|+|x-b|$ — mô hình quen thuộc, kết quả là $|a-b|$.',
          'Chứng minh bằng bất đẳng thức $|M|+|N|\\ge|M+N|$; muốn tổng bên trong ra hằng số thì phải **đổi dấu một hạng tử**.',
          'Viết $|x-7|=|7-x|$ rồi cộng với $|x-3|$: bên trong triệt tiêu $x$, chỉ còn $4$.',
        ],
        solution: [
          'Ta có $A=|x-3|+|x-7|=|x-3|+|7-x|$.',
          'Áp dụng $|M|+|N|\\ge|M+N|$ với $M=x-3$, $N=7-x$:',
          '$A\\ge|(x-3)+(7-x)|=|4|=4$.',
          'Dấu "$=$" xảy ra khi $(x-3)(7-x)\\ge0$, tức $3\\le x\\le7$.',
          'Vậy $A_{\\min}=4$, đạt được với mọi $x$ thoả $3\\le x\\le7$.',
        ],
        remark: 'Kết quả tổng quát đáng nhớ: $|x-a|+|x-b|$ nhỏ nhất bằng $|a-b|$ khi $x$ nằm giữa $a$ và $b$.',
      },
      {
        prompt: 'Tìm giá trị lớn nhất của biểu thức $B=-a^{2}+3a+4$.',
        thinking: [
          'Hệ số của $a^{2}$ là $-1<0$ nên biểu thức có **giá trị lớn nhất**.',
          'Đưa về dạng $-(\\text{bình phương})+\\text{hằng số}$ bằng cách hoàn chỉnh bình phương.',
          'Nhớ: khi rút $-1$ ra ngoài thì **mọi dấu bên trong đều đổi**.',
        ],
        solution: [
          '$B=-a^{2}+3a+4=-\\left(a^{2}-3a\\right)+4$',
          '$=-\\left(a^{2}-2\\cdot a\\cdot\\f{3}{2}+\\f{9}{4}\\right)+4+\\f{9}{4}$',
          '$=-\\left(a-\\f{3}{2}\\right)^{2}+\\f{25}{4}$.',
          'Vì $\\left(a-\\f{3}{2}\\right)^{2}\\ge0$ với mọi $a$ nên $-\\left(a-\\f{3}{2}\\right)^{2}\\le0$, do đó $B\\le\\f{25}{4}$.',
          'Dấu "$=$" xảy ra khi $a=\\f{3}{2}$.',
          'Vậy $B_{\\max}=\\f{25}{4}$ khi $a=\\f{3}{2}$.',
        ],
        remark: 'Khi thêm $\\f{9}{4}$ vào trong ngoặc có dấu trừ đằng trước, phải **cộng bù** $\\f{9}{4}$ ra ngoài — đây là chỗ sai dấu nhiều nhất.',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'hsg-7-6', grade: 7,
    name: 'Chứng minh chia hết bậc THCS',
    summary: 'Nhóm theo luỹ thừa chung, khai triển nhị thức dạng $(k+1)^{n}$, xét theo số dư và chữ số tận cùng theo chu kỳ.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Đặt luỹ thừa chung',
        detail: [
          'Với biểu thức chứa $a^{n+k}$, hãy viết $a^{n+k}=a^{n}\\cdot a^{k}$ rồi đặt $a^{n}$ làm nhân tử chung.',
          'Ví dụ $3^{n+2}-2^{n+2}+3^{n}-2^{n}=3^{n}(3^{2}+1)-2^{n}(2^{2}+1)=3^{n}\\cdot10-2^{n}\\cdot5$.',
          'Sau khi nhóm, tìm nhân tử chung bằng số để kết luận chia hết.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Viết cơ số thành $k+1$ rồi khai triển',
        detail: [
          '$10^{n}=(9+1)^{n}=9A+1$ — mọi luỹ thừa của $10$ chia $9$ đều dư $1$.',
          'Tổng quát $(k+1)^{n}=kA+1$, rất mạnh khi cần xét số dư khi chia cho $k$.',
          'Ví dụ: $2^{3k}=8^{k}=(7+1)^{k}=7A+1$ nên $2^{3k}-1$ chia hết cho $7$.',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Xét theo lớp số dư',
        detail: [
          'Muốn chứng minh mệnh đề đúng với mọi $n$, hãy viết $n=qk+r$ với $r\\in\\{0;1;\\dots;k-1\\}$.',
          'Xét lần lượt từng lớp số dư — số trường hợp hữu hạn nên luôn kiểm tra hết được.',
        ],
      },
      {
        title: 'Kỹ thuật 4 — Tổng luỹ thừa',
        detail: [
          '$S=1+a+a^{2}+\\dots+a^{n}$ thì $aS-S=a^{n+1}-1$, suy ra $S=\\f{a^{n+1}-1}{a-1}$.',
          'Hoặc nhóm $k$ số hạng liên tiếp để tạo nhân tử chung — cách này gọn hơn khi cần chứng minh chia hết.',
        ],
      },
    ],
    mindmap: {
      root: 'CHỨNG MINH CHIA HẾT (HSG 7)',
      branches: [
        { title: 'Biến đổi', items: ['Đặt luỹ thừa chung', 'Nhóm $k$ số hạng', 'Tổng luỹ thừa'] },
        { title: 'Số dư', items: ['$(k+1)^{n}=kA+1$', 'Xét lớp số dư của $n$', 'Chu kỳ chữ số tận cùng'] },
        { title: 'Tính chất', items: ['Chia hết của tổng, hiệu', 'Tích liên tiếp', '$p$ nguyên tố và $p\\;|\\;ab$'] },
      ],
    },
    examples: [
      {
        prompt: 'Chứng minh rằng với mọi số nguyên dương $n$: $3^{n+2}-2^{n+2}+3^{n}-2^{n}$ chia hết cho $10$.',
        thinking: [
          'Có bốn hạng tử nhưng chỉ hai cơ số là $3$ và $2$ — hãy **nhóm theo cơ số**.',
          'Mỗi nhóm đặt $3^{n}$ và $2^{n}$ làm nhân tử chung, phần còn lại là hằng số.',
          'Đích đến là làm xuất hiện thừa số $10$ ở cả hai nhóm.',
        ],
        solution: [
          'Nhóm theo cơ số: $\\left(3^{n+2}+3^{n}\\right)-\\left(2^{n+2}+2^{n}\\right)$.',
          '$=3^{n}\\left(3^{2}+1\\right)-2^{n}\\left(2^{2}+1\\right)=3^{n}\\cdot10-2^{n}\\cdot5$.',
          'Với $n\\ge1$: $2^{n}=2\\cdot2^{n-1}$ nên $2^{n}\\cdot5=2^{n-1}\\cdot10$.',
          'Do đó biểu thức $=3^{n}\\cdot10-2^{n-1}\\cdot10=10\\left(3^{n}-2^{n-1}\\right)$.',
          'Vì $3^{n}-2^{n-1}$ là số nguyên nên biểu thức chia hết cho $10$. (điều phải chứng minh)',
        ],
        remark: 'Bước "biến $5$ thành $10$ nhờ mượn một thừa số $2$ từ $2^{n}$" là mấu chốt của bài.',
      },
      {
        prompt: 'Tìm tất cả các số nguyên dương $n$ sao cho $2^{n}-1$ chia hết cho $7$.',
        thinking: [
          'Luỹ thừa của $2$ khi chia cho $7$ có **chu kỳ**: $2^{1}=2$, $2^{2}=4$, $2^{3}=8\\equiv1$ — chu kỳ $3$.',
          'Vậy hãy viết $n$ theo ba lớp số dư $3k$, $3k+1$, $3k+2$ rồi xét từng lớp.',
          'Công cụ để xét: $8^{k}=(7+1)^{k}=7A+1$.',
        ],
        solution: [
          'Xét ba trường hợp theo số dư của $n$ khi chia cho $3$.',
          '• $n=3k$: $2^{n}-1=8^{k}-1=(7+1)^{k}-1=(7A+1)-1=7A\\;\\vdots\\;7$ ✓',
          '• $n=3k+1$: $2^{n}-1=2\\cdot8^{k}-1=2(7A+1)-1=14A+1$, chia $7$ dư $1$ — không thoả.',
          '• $n=3k+2$: $2^{n}-1=4\\cdot8^{k}-1=4(7A+1)-1=28A+3$, chia $7$ dư $3$ — không thoả.',
          'Vậy $2^{n}-1$ chia hết cho $7$ khi và chỉ khi $n$ là **bội của $3$**.',
        ],
        remark: 'Hễ gặp "luỹ thừa chia hết cho một số", hãy tìm chu kỳ trước — chu kỳ có bao nhiêu bước thì chia $n$ thành bấy nhiêu lớp.',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'hsg-7-7', grade: 7,
    name: 'Bất đẳng thức và kỹ thuật làm trội',
    summary: 'Bất đẳng thức Cô-si, kỹ thuật làm trội để chặn tổng, và chứng minh một biểu thức không nguyên.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Bất đẳng thức Cô-si',
        detail: [
          '$a+b\\ge2\\s{ab}$ với $a,b\\ge0$; dấu bằng khi $a=b$.',
          'Hệ quả rất hay dùng: $(a+b)\\left(\\f{1}{a}+\\f{1}{b}\\right)\\ge4$ và $(a+b+c)\\left(\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\right)\\ge9$.',
          'Chứng minh gốc: mọi bất đẳng thức trên đều quy về $(a-b)^{2}\\ge0$.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Làm trội, làm giảm',
        detail: [
          'Thay mỗi mẫu số bằng một mẫu **lớn hơn** (để làm giảm) hoặc **nhỏ hơn** (để làm trội) mà vẫn tính được tổng.',
          '$\\f{1}{a(a+1)}<\\f{1}{a^{2}}<\\f{1}{a(a-1)}$ — kẹp giữa hai tổng sai phân tính được.',
          'Sai phân: $\\f{1}{a(a+1)}=\\f{1}{a}-\\f{1}{a+1}$, cộng lại thì các hạng tử triệt tiêu dây chuyền.',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Chặn hai đầu để chứng minh không nguyên',
        detail: [
          'Muốn chứng minh $M$ không nguyên, hãy chặn $k<M<k+1$ với $k$ nguyên.',
          'Mẹo chặn trên: viết $M=n-N$ với $N$ đã chặn dưới được.',
          'Ví dụ với $M=\\f{a}{a+b}+\\f{b}{b+c}+\\f{c}{c+a}$: chặn được $1<M<2$.',
        ],
      },
    ],
    mindmap: {
      root: 'BẤT ĐẲNG THỨC (HSG 7)',
      branches: [
        { title: 'Công cụ nền', items: ['$(a-b)^{2}\\ge0$', 'Cô-si hai số, ba số', '$|A|\\ge A$'] },
        { title: 'Làm trội', items: ['So sánh từng mẫu', 'Sai phân triệt tiêu', 'Kẹp giữa hai tổng'] },
        { title: 'Ứng dụng', items: ['Chứng minh không nguyên', 'Chặn tổng dãy', 'Tìm cực trị'] },
      ],
    },
    examples: [
      {
        prompt: 'Cho $a$, $b$, $c$ là các số dương. Chứng minh rằng $(a+b+c)\\left(\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\right)\\ge9$.',
        thinking: [
          'Vế trái là tích của một tổng với tổng các nghịch đảo — đúng mô hình áp dụng Cô-si hai lần.',
          'Cô-si cho ba số: $a+b+c\\ge3\\cb{abc}$ và $\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\ge3\\cb{\\f{1}{abc}}$.',
          'Nhân hai bất đẳng thức cùng chiều (hai vế đều dương) thì phần căn triệt tiêu, còn lại đúng $9$.',
        ],
        solution: [
          'Vì $a$, $b$, $c$ dương nên áp dụng bất đẳng thức Cô-si cho ba số:',
          '$a+b+c\\ge3\\cb{abc}>0$. (1)',
          '$\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\ge3\\cb{\\f{1}{abc}}>0$. (2)',
          'Nhân (1) với (2) theo vế (được phép vì cả bốn vế đều dương):',
          '$(a+b+c)\\left(\\f{1}{a}+\\f{1}{b}+\\f{1}{c}\\right)\\ge9\\cb{abc}\\cdot\\cb{\\f{1}{abc}}=9$.',
          'Dấu "$=$" xảy ra khi $a=b=c$. (điều phải chứng minh)',
        ],
        remark: 'Chỉ được nhân hai bất đẳng thức theo vế khi **tất cả các vế đều dương** — luôn ghi rõ điều kiện này.',
      },
      {
        prompt: 'Cho $a$, $b$, $c>0$. Chứng minh rằng $M=\\f{a}{a+b}+\\f{b}{b+c}+\\f{c}{c+a}$ không phải là số nguyên.',
        thinking: [
          'Không tính được giá trị cụ thể, vậy hướng đi là **chặn hai đầu**: chỉ ra $1<M<2$ thì $M$ không thể nguyên.',
          'Chặn dưới: thay mỗi mẫu bằng mẫu **lớn hơn** $a+b+c$ để mỗi phân số **nhỏ đi**, tổng ba phân số mới bằng đúng $1$.',
          'Chặn trên: xét biểu thức "bù" $N=\\f{b}{a+b}+\\f{c}{b+c}+\\f{a}{c+a}$ thì $M+N=3$; mà $N>1$ theo cách trên, nên $M<2$.',
        ],
        solution: [
          '**Chặn dưới.** Vì $a,b,c>0$ nên $a+b<a+b+c$, do đó $\\f{a}{a+b}>\\f{a}{a+b+c}$.',
          'Tương tự $\\f{b}{b+c}>\\f{b}{a+b+c}$ và $\\f{c}{c+a}>\\f{c}{a+b+c}$.',
          'Cộng ba bất đẳng thức: $M>\\f{a+b+c}{a+b+c}=1$.',
          '**Chặn trên.** Đặt $N=\\f{b}{a+b}+\\f{c}{b+c}+\\f{a}{c+a}$.',
          'Ta có $M+N=\\f{a+b}{a+b}+\\f{b+c}{b+c}+\\f{c+a}{c+a}=3$.',
          'Lập luận hoàn toàn tương tự phần trên cho $N$, ta được $N>1$, suy ra $M=3-N<2$.',
          'Vậy $1<M<2$. Giữa $1$ và $2$ không có số nguyên nào, nên $M$ không phải số nguyên. (điều phải chứng minh)',
        ],
        remark: 'Kỹ thuật "tạo biểu thức bù để chặn đầu còn lại" dùng được cho rất nhiều bài chặn tổng phân thức.',
      },
    ],
  },
];
