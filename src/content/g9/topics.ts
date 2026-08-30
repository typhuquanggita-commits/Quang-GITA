import type { Topic } from '@/types';

/* MATHGITA — CHUYÊN ĐỀ TOÁN 9 (Chương trình GDPT 2018)
   Khối trọng điểm: định hướng thi tuyển sinh vào lớp 10. */

export const G9_TOPICS: Topic[] = [
  {
    id: 'g9-t1', grade: 9, term: 'HK1', strand: 'SO_DAI_SO', order: 1,
    name: 'Phương trình và Hệ hai phương trình bậc nhất hai ẩn',
    summary: 'Phương trình bậc nhất hai ẩn, hệ hai phương trình, phương pháp thế và cộng đại số, giải bài toán bằng cách lập hệ.',
    outcomes: [
      'Nhận biết nghiệm của phương trình và hệ phương trình bậc nhất hai ẩn.',
      'Giải hệ bằng phương pháp thế và phương pháp cộng đại số.',
      'Giải bài toán thực tiễn bằng cách lập hệ phương trình.',
    ],
    theory: [
      {
        heading: '1. Hệ hai phương trình bậc nhất hai ẩn',
        body: ['Hai đại lượng chưa biết cần hai phương trình. Có ba cách giải, chọn cách nào tuỳ vào hình dạng hệ số.'],
        formulas: [
          'Dạng: $\\sys{ax+by=c\\\\a\'x+b\'y=c\'}$',
          '**Phương pháp thế**: rút một ẩn từ một phương trình rồi thế vào phương trình còn lại.',
          '**Phương pháp cộng đại số**: nhân hai vế để hệ số của một ẩn đối nhau (hoặc bằng nhau) rồi cộng (trừ) theo vế.',
          'Hệ có nghiệm duy nhất khi $\\f{a}{a\'}\\ne\\f{b}{b\'}$; vô nghiệm khi $\\f{a}{a\'}=\\f{b}{b\'}\\ne\\f{c}{c\'}$; vô số nghiệm khi $\\f{a}{a\'}=\\f{b}{b\'}=\\f{c}{c\'}$.',
        ],
        caution: ['Với hệ có ẩn ở mẫu, phải **đặt ẩn phụ** $u=\\f{1}{x}$, $v=\\f{1}{y}$ và nhớ điều kiện.'],
      },
      {
        heading: '2. Giải bài toán bằng cách lập hệ phương trình',
        body: ['Quy trình giống lớp 8 nhưng dùng hai ẩn, phù hợp bài toán có hai đại lượng chưa biết.'],
        formulas: [
          '1. Gọi hai ẩn kèm đơn vị và điều kiện.',
          '2. Biểu diễn các đại lượng liên quan.',
          '3. Lập **hai** phương trình từ hai dữ kiện độc lập.',
          '4. Giải hệ.',
          '5. Đối chiếu điều kiện.',
          '6. Kết luận.',
        ],
      },
    ],
    decode: [
      { signal: 'Đề có hai đại lượng chưa biết và hai dữ kiện ràng buộc', action: 'Lập hệ hai phương trình.', why: 'Số phương trình phải bằng số ẩn.' },
      { signal: 'Hệ có phân số với ẩn ở mẫu', action: 'Đặt ẩn phụ $u=\\f{1}{x}$, $v=\\f{1}{y}$.', why: 'Đưa hệ phi tuyến về hệ bậc nhất quen thuộc.' },
      { signal: 'Hệ số của một ẩn giống nhau hoặc là bội của nhau', action: 'Dùng cộng đại số, không dùng phương pháp thế.', why: 'Cộng đại số sạch hơn, ít phân số.' },
      { signal: 'Đề hỏi “tìm $m$ để hệ có nghiệm duy nhất”', action: 'So sánh tỉ số hệ số $\\f{a}{a\'}\\ne\\f{b}{b\'}$.', why: 'Điều kiện tỉ số quyết định số nghiệm của hệ.' },
      { signal: 'Bài toán “hai vòi nước cùng chảy”', action: 'Đặt ẩn là thời gian mỗi vòi chảy riêng, lập hệ theo năng suất.', why: 'Năng suất cộng được, thời gian thì không.' },
    ],
    mindmap: {
      root: 'HỆ PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN',
      branches: [
        { title: 'Khái niệm', items: ['$ax+by=c$', 'Nghiệm $(x_0;y_0)$', 'Biểu diễn hình học'] },
        { title: 'Phương pháp giải', items: ['Thế', 'Cộng đại số', 'Đặt ẩn phụ'] },
        { title: 'Số nghiệm', items: ['Duy nhất', 'Vô nghiệm', 'Vô số nghiệm', 'Bài toán tham số $m$'] },
        { title: 'Lập hệ', items: ['Chuyển động', 'Năng suất – hai vòi nước', 'Số có hai chữ số', 'Toán phần trăm'] },
      ],
    },
    practiceSkills: [
      {
        title: 'Chọn phương pháp giải hệ cho nhanh',
        detail: [
          'Có một ẩn hệ số $\\pm1$ → dùng phương pháp thế.',
          'Hệ số của một ẩn bằng nhau hoặc đối nhau → cộng đại số ngay.',
          'Hệ số “xấu” → nhân chéo để tạo hệ số đối rồi cộng.',
          'Luôn thử lại nghiệm vào **cả hai** phương trình.',
        ],
      },
    ],
    types: [
      {
        id: 'g9-t1-d1', name: 'Dạng 1. Giải hệ phương trình', level: 'TH',
        method: ['Chọn phương pháp phù hợp.', 'Tìm một ẩn rồi thế ngược tìm ẩn còn lại.', 'Kết luận nghiệm dạng $(x;y)$.'],
        worked: [{
          prompt: 'Giải hệ $\\sys{3x+2y=7\\\\2x-2y=3}$.',
          thinking: ['Hệ số của $y$ là $2$ và $-2$ — đối nhau → cộng hai phương trình theo vế.'],
          solution: [
            'Cộng theo vế: $(3x+2y)+(2x-2y)=7+3\\Rightarrow5x=10\\Rightarrow x=2$.',
            'Thay $x=2$ vào $3x+2y=7$: $6+2y=7\\Rightarrow y=\\f{1}{2}$.',
            'Vậy hệ có nghiệm duy nhất $(x;y)=\\left(2;\\f{1}{2}\\right)$.',
          ],
        }],
      },
      {
        id: 'g9-t1-d2', name: 'Dạng 2. Hệ có ẩn ở mẫu — đặt ẩn phụ', level: 'VD',
        method: ['Đặt điều kiện.', 'Đặt $u=\\f{1}{x}$, $v=\\f{1}{y}$.', 'Giải hệ theo $u,v$ rồi quay về $x,y$.'],
        worked: [{
          prompt: 'Giải hệ $\\sys{\\f{1}{x}+\\f{1}{y}=\\f{5}{6}\\\\\\f{2}{x}-\\f{3}{y}=\\f{1}{6}}$.',
          thinking: ['Ẩn nằm ở mẫu → đặt ẩn phụ để tuyến tính hoá.'],
          solution: [
            'Điều kiện: $x\\ne0$, $y\\ne0$. Đặt $u=\\f{1}{x}$, $v=\\f{1}{y}$.',
            'Hệ trở thành $\\sys{u+v=\\f{5}{6}\\\\2u-3v=\\f{1}{6}}$',
            'Từ phương trình đầu: $u=\\f{5}{6}-v$. Thế vào: $2\\left(\\f{5}{6}-v\\right)-3v=\\f{1}{6}$.',
            '$\\f{5}{3}-5v=\\f{1}{6}\\Rightarrow5v=\\f{5}{3}-\\f{1}{6}=\\f{3}{2}\\Rightarrow v=\\f{3}{10}$.',
            '$u=\\f{5}{6}-\\f{3}{10}=\\f{25-9}{30}=\\f{16}{30}=\\f{8}{15}$.',
            '$x=\\f{1}{u}=\\f{15}{8}$; $y=\\f{1}{v}=\\f{10}{3}$ (thoả điều kiện).',
          ],
        }],
      },
      {
        id: 'g9-t1-d3', name: 'Dạng 3. Giải bài toán bằng cách lập hệ', level: 'VDC',
        method: ['Gọi hai ẩn với đơn vị và điều kiện.', 'Lập hai phương trình từ hai dữ kiện.', 'Giải, đối chiếu, kết luận.'],
        worked: [{
          prompt: 'Hai vòi nước cùng chảy vào một bể cạn thì sau 6 giờ đầy bể. Nếu vòi thứ nhất chảy trong 2 giờ rồi khoá lại, mở vòi thứ hai chảy tiếp 3 giờ thì được $\\f{2}{5}$ bể. Hỏi mỗi vòi chảy riêng thì bao lâu đầy bể?',
          thinking: [
            'Hai đại lượng chưa biết là thời gian chảy riêng của mỗi vòi → hai ẩn.',
            'Làm việc với **năng suất** (phần bể chảy được trong 1 giờ), không làm việc với thời gian.',
          ],
          solution: [
            'Gọi thời gian vòi 1 và vòi 2 chảy riêng đầy bể lần lượt là $x$, $y$ (giờ; $x,y>6$).',
            'Trong 1 giờ, vòi 1 chảy được $\\f{1}{x}$ bể, vòi 2 chảy được $\\f{1}{y}$ bể.',
            'Cùng chảy 6 giờ đầy bể: $\\f{1}{x}+\\f{1}{y}=\\f{1}{6}$. (1)',
            'Vòi 1 chảy 2 giờ, vòi 2 chảy 3 giờ được $\\f{2}{5}$ bể: $\\f{2}{x}+\\f{3}{y}=\\f{2}{5}$. (2)',
            'Đặt $u=\\f{1}{x}$, $v=\\f{1}{y}$: $\\sys{u+v=\\f{1}{6}\\\\2u+3v=\\f{2}{5}}$',
            'Từ (1): $u=\\f{1}{6}-v$; thế vào (2): $2\\left(\\f{1}{6}-v\\right)+3v=\\f{2}{5}\\Rightarrow\\f{1}{3}+v=\\f{2}{5}\\Rightarrow v=\\f{1}{15}$.',
            '$u=\\f{1}{6}-\\f{1}{15}=\\f{5-2}{30}=\\f{1}{10}$.',
            '$x=10$; $y=15$ (thoả $x,y>6$).',
            'Vậy vòi 1 chảy riêng đầy bể trong **10 giờ**, vòi 2 trong **15 giờ**.',
          ],
        }],
      },
    ],
    bank: ['g9.he-pt', 'g9.he-pt-an-phu', 'g9.lap-he-pt'],
  },

  {
    id: 'g9-t2', grade: 9, term: 'HK1', strand: 'SO_DAI_SO', order: 2,
    name: 'Căn bậc hai — Căn thức bậc hai',
    summary: 'Căn bậc hai, căn bậc ba, căn thức bậc hai, các phép biến đổi và rút gọn biểu thức chứa căn.',
    outcomes: [
      'Tìm điều kiện xác định của căn thức bậc hai.',
      'Vận dụng các phép biến đổi: đưa thừa số vào/ra ngoài dấu căn, khử mẫu, trục căn thức.',
      'Rút gọn biểu thức chứa căn và giải các bài toán phụ.',
    ],
    theory: [
      {
        heading: '1. Điều kiện xác định và hằng đẳng thức căn',
        body: ['Mọi bài căn thức mở đầu bằng điều kiện xác định. Hằng đẳng thức $\s{A^{2}}=|A|$ là nguồn của hầu hết bẫy trong chuyên đề.'],
        formulas: [
          '$\\s{A}$ xác định $\\Leftrightarrow A\\ge0$',
          '$\\s{A^{2}}=\\abs{A}$',
          '$\\s{A}\\cdot\\s{B}=\\s{AB}$ ($A,B\\ge0$)',
          '$\\f{\\s{A}}{\\s{B}}=\\s{\\f{A}{B}}$ ($A\\ge0$, $B>0$)',
        ],
        caution: ['$\\s{A^{2}}=A$ chỉ đúng khi $A\\ge0$; nói chung phải viết $\\abs{A}$.'],
      },
      {
        heading: '2. Các phép biến đổi',
        body: ['Bốn phép biến đổi cơ bản giúp đưa biểu thức chứa căn về dạng gọn nhất trước khi tính hoặc so sánh.'],
        formulas: [
          'Đưa thừa số ra ngoài: $\\s{A^{2}B}=\\abs{A}\\s{B}$',
          'Đưa thừa số vào trong: $A\\s{B}=\\s{A^{2}B}$ (khi $A\\ge0$)',
          'Khử mẫu: $\\s{\\f{A}{B}}=\\f{\\s{AB}}{\\abs{B}}$',
          'Trục căn thức: $\\f{C}{\\s{A}\\pm\\s{B}}=\\f{C(\\s{A}\\mp\\s{B})}{A-B}$',
          '$\\f{C}{\\s{A}}=\\f{C\\s{A}}{A}$',
        ],
      },
      {
        heading: '3. Kỹ thuật với biểu thức dưới căn',
        body: ['Nhận dạng hằng đẳng thức ẩn dưới dấu căn là chìa khoá của mọi bài rút gọn khó.'],
        formulas: [
          '$\\s{a\\pm2\\s{b}}$: tìm $m+n=a$, $mn=b$ để viết thành $\\s{(\\s{m}\\pm\\s{n})^{2}}$',
          'Ví dụ: $\\s{7+4\\s{3}}=\\s{(2+\\s{3})^{2}}=2+\\s{3}$',
          'Đặt $t=\\s{x}\\ (t\\ge0)$ để đưa biểu thức về đa thức theo $t$',
        ],
      },
    ],
    decode: [
      { signal: 'Bài rút gọn có nhiều mẫu chứa căn', action: 'Đặt $t=\\s{x}$, phân tích mẫu thành nhân tử theo $t$.', why: 'Biểu thức chứa căn trở thành phân thức quen thuộc.' },
      { signal: 'Có $\\s{a+b\\s{c}}$', action: 'Thử viết thành bình phương của $\\s{m}+\\s{n}$.', why: 'Đây là cách duy nhất để rút gọn căn kép.' },
      { signal: 'Mẫu là $\\s{A}-\\s{B}$', action: 'Nhân cả tử và mẫu với biểu thức liên hợp $\\s{A}+\\s{B}$.', why: 'Liên hợp biến mẫu thành hiệu hai bình phương, hết căn.' },
      { signal: 'Đề hỏi “tìm $x$ để $P$ nguyên” sau khi rút gọn', action: 'Tách phần nguyên rồi cho mẫu là ước.', why: 'Kỹ thuật tách phần nguyên, kèm điều kiện xác định.' },
      { signal: 'Đề hỏi GTNN của $P$ chứa $\\s{x}$', action: 'Đặt $t=\\s{x}\\ge0$, đưa về hàm theo $t$ rồi dùng bất đẳng thức Cô-si hoặc hoàn thành bình phương.', why: 'Đổi biến làm lộ cấu trúc bậc hai.' },
    ],
    mindmap: {
      root: 'CĂN BẬC HAI — CĂN THỨC',
      branches: [
        { title: 'Điều kiện', items: ['$\\s{A}$ có nghĩa khi $A\\ge0$', 'Mẫu $\\ne0$', 'Kết hợp nhiều điều kiện'] },
        { title: 'Biến đổi', items: ['Đưa ra/vào dấu căn', 'Khử mẫu', 'Trục căn thức', 'Liên hợp'] },
        { title: 'Rút gọn', items: ['Đặt $t=\\s{x}$', 'Phân tích nhân tử', 'Quy đồng', 'Thu gọn triệt để'] },
        { title: 'Bài toán phụ', items: ['Tính $P$ tại $x=a$', '$P$ nguyên', 'So sánh $P$ với số', 'GTNN, GTLN'] },
      ],
    },
    practiceSkills: [
      {
        title: 'Quy trình chuẩn cho bài “Rút gọn biểu thức” thi vào 10',
        detail: [
          'Bước 1: Viết điều kiện xác định (thường $x\\ge0$ và $x\\ne$ một số).',
          'Bước 2: Đặt $t=\\s{x}$, phân tích tất cả các mẫu thành nhân tử theo $t$.',
          'Bước 3: Tìm mẫu chung, quy đồng, thu gọn tử.',
          'Bước 4: Rút gọn, trả biến về $\\s{x}$.',
          'Bước 5: Làm câu hỏi phụ, luôn đối chiếu điều kiện ở bước 1.',
        ],
      },
    ],
    types: [
      {
        id: 'g9-t2-d1', name: 'Dạng 1. Điều kiện xác định và tính giá trị', level: 'NB',
        method: ['Cho biểu thức dưới căn $\\ge0$, mẫu $\\ne0$.', 'Giao các điều kiện.'],
        worked: [{
          prompt: 'Tìm điều kiện xác định của $A=\\f{\\s{x}}{\\s{x}-2}$.',
          thinking: ['Cần $x\\ge0$ để căn có nghĩa và mẫu khác 0.'],
          solution: [
            '$\\s{x}$ có nghĩa $\\Leftrightarrow x\\ge0$.',
            'Mẫu khác 0: $\\s{x}-2\\ne0\\Leftrightarrow x\\ne4$.',
            'Vậy điều kiện: $x\\ge0$ và $x\\ne4$.',
          ],
        }],
      },
      {
        id: 'g9-t2-d2', name: 'Dạng 2. Rút gọn biểu thức chứa căn', level: 'VD',
        method: ['Đặt điều kiện.', 'Phân tích mẫu thành nhân tử.', 'Quy đồng, thu gọn.'],
        worked: [{
          prompt: 'Rút gọn $P=\\f{1}{\\s{x}-1}-\\f{1}{\\s{x}+1}$ với $x\\ge0$, $x\\ne1$.',
          thinking: ['Mẫu chung là $(\\s{x}-1)(\\s{x}+1)=x-1$.'],
          solution: [
            '$P=\\f{(\\s{x}+1)-(\\s{x}-1)}{(\\s{x}-1)(\\s{x}+1)}=\\f{2}{x-1}$.',
          ],
        }],
      },
      {
        id: 'g9-t2-d3', name: 'Dạng 3. Vận dụng cao — bài toán phụ sau rút gọn', level: 'VDC',
        method: ['Rút gọn triệt để.', 'Tách phần nguyên / dùng bất đẳng thức Cô-si.', 'Đối chiếu điều kiện.'],
        worked: [{
          prompt: 'Cho $P=\\f{\\s{x}+3}{\\s{x}+1}$ với $x\\ge0$. Tìm giá trị lớn nhất của $P$.',
          thinking: ['Tách phần nguyên theo mẫu để thấy $P$ giảm khi $\\s{x}$ tăng.'],
          solution: [
            'Đặt $t=\\s{x}\\ge0$. Khi đó $P=\\f{t+3}{t+1}=\\f{(t+1)+2}{t+1}=1+\\f{2}{t+1}$.',
            'Vì $t\\ge0$ nên $t+1\\ge1$, suy ra $\\f{2}{t+1}\\le2$.',
            'Do đó $P\\le3$. Dấu “=” xảy ra khi $t=0$, tức $x=0$.',
            'Vậy $P_{\\max}=3$ khi $x=0$.',
          ],
        }],
      },
    ],
    bank: ['g9.can-dkxd', 'g9.can-rutgon', 'g9.can-vdc'],
  },

  {
    id: 'g9-t3', grade: 9, term: 'HK2', strand: 'SO_DAI_SO', order: 3,
    name: 'Hàm số y = ax² — Phương trình bậc hai — Hệ thức Viète',
    summary: 'Hàm số $y=ax^{2}$ và parabol, phương trình bậc hai một ẩn, công thức nghiệm, hệ thức Viète và ứng dụng.',
    outcomes: [
      'Vẽ đồ thị hàm số $y=ax^{2}$, xác định tính chất.',
      'Giải phương trình bậc hai bằng công thức nghiệm, xét biệt thức $\\Delta$.',
      'Vận dụng hệ thức Viète để tính biểu thức đối xứng và giải bài toán tham số.',
    ],
    theory: [
      {
        heading: '1. Hàm số $y=ax^{2}$ ($a\\ne0$)',
        body: ['Đồ thị là một parabol nhận trục $Oy$ làm trục đối xứng, đỉnh tại gốc toạ độ. Dấu của $a$ quyết định bề lõm hướng lên hay xuống.'],
        formulas: [
          'Đồ thị là parabol đỉnh $O(0;0)$, nhận trục $Oy$ làm trục đối xứng.',
          '$a>0$: đồ thị nằm phía trên $Ox$, $O$ là điểm thấp nhất.',
          '$a<0$: đồ thị nằm phía dưới $Ox$, $O$ là điểm cao nhất.',
          'Toạ độ giao điểm của $(P):y=ax^{2}$ và $(d):y=mx+n$ là nghiệm của $ax^{2}=mx+n$.',
        ],
      },
      {
        heading: '2. Phương trình bậc hai $ax^{2}+bx+c=0$ ($a\\ne0$)',
        body: ['Biệt thức $\Delta$ quyết định số nghiệm; hệ thức Viète cho tổng và tích hai nghiệm mà không cần giải.'],
        formulas: [
          '$\\Delta=b^{2}-4ac$',
          '$\\Delta>0$: hai nghiệm phân biệt $x_{1,2}=\\f{-b\\pm\\s{\\Delta}}{2a}$',
          '$\\Delta=0$: nghiệm kép $x_1=x_2=-\\f{b}{2a}$',
          '$\\Delta<0$: vô nghiệm',
          'Công thức thu gọn với $b=2b\'$: $\\Delta\'=b\'^{2}-ac$ ; $x_{1,2}=\\f{-b\'\\pm\\s{\\Delta\'}}{a}$',
          'Nhẩm nghiệm: $a+b+c=0\\Rightarrow x_1=1$, $x_2=\\f{c}{a}$ ; $a-b+c=0\\Rightarrow x_1=-1$, $x_2=-\\f{c}{a}$',
        ],
      },
      {
        heading: '3. Hệ thức Viète và ứng dụng',
        body: ['Công cụ mạnh nhất của chương, xuất hiện trong hầu hết đề thi vào 10.'],
        formulas: [
          'Nếu $x_1,x_2$ là hai nghiệm thì $S=x_1+x_2=-\\f{b}{a}$ và $P=x_1x_2=\\f{c}{a}$',
          '$x_1^{2}+x_2^{2}=S^{2}-2P$',
          '$(x_1-x_2)^{2}=S^{2}-4P$',
          '$\\f{1}{x_1}+\\f{1}{x_2}=\\f{S}{P}$ ($P\\ne0$)',
          '$x_1^{3}+x_2^{3}=S^{3}-3PS$',
          'Hai nghiệm cùng dấu $\\Leftrightarrow\\Delta\\ge0$ và $P>0$; trái dấu $\\Leftrightarrow P<0$ (khi đó luôn có $\\Delta>0$).',
          'Hai nghiệm dương $\\Leftrightarrow\\Delta\\ge0$, $S>0$, $P>0$.',
        ],
        caution: ['Trước khi dùng Viète phải khẳng định phương trình **có nghiệm** ($\\Delta\\ge0$) — bỏ bước này là mất điểm.'],
      },
    ],
    decode: [
      { signal: 'Đề hỏi biểu thức đối xứng của $x_1,x_2$', action: 'Biểu diễn qua $S$ và $P$ rồi dùng Viète, không giải phương trình.', why: 'Mọi biểu thức đối xứng đều viết được theo $S$, $P$.' },
      { signal: 'Đề hỏi “tìm $m$ để phương trình có hai nghiệm phân biệt”', action: 'Giải $\\Delta>0$, kèm điều kiện $a\\ne0$.', why: 'Bậc hai chỉ tồn tại khi hệ số bậc hai khác 0.' },
      { signal: 'Đề cho hệ thức không đối xứng như $x_1=2x_2$', action: 'Kết hợp hệ thức đó với hai công thức Viète thành hệ ba phương trình.', why: 'Ba phương trình cho ba ẩn $x_1$, $x_2$, $m$.' },
      { signal: 'Đề hỏi giao điểm của parabol và đường thẳng', action: 'Lập phương trình hoành độ giao điểm rồi xét $\\Delta$.', why: 'Số giao điểm bằng số nghiệm của phương trình hoành độ.' },
      { signal: 'Hệ số $a+b+c=0$ hoặc $a-b+c=0$', action: 'Nhẩm nghiệm ngay, không cần tính $\\Delta$.', why: 'Tiết kiệm thời gian và tránh sai số học.' },
      { signal: 'Phương trình trùng phương $ax^{4}+bx^{2}+c=0$', action: 'Đặt $t=x^{2}\\ge0$ rồi giải phương trình bậc hai theo $t$.', why: 'Nhớ điều kiện $t\\ge0$ để loại nghiệm ngoại lai.' },
    ],
    mindmap: {
      root: 'HÀM SỐ y = ax² — PHƯƠNG TRÌNH BẬC HAI',
      branches: [
        { title: 'Parabol', items: ['$y=ax^{2}$', 'Đỉnh $O$, trục $Oy$', 'Bề lõm theo dấu $a$', 'Vẽ bảng giá trị'] },
        { title: 'Phương trình bậc hai', items: ['$\\Delta=b^{2}-4ac$', 'Công thức nghiệm', 'Công thức thu gọn', 'Nhẩm nghiệm'] },
        { title: 'Viète', items: ['$S=-\\f{b}{a}$', '$P=\\f{c}{a}$', 'Biểu thức đối xứng', 'Dấu của nghiệm'] },
        { title: 'Tương giao', items: ['PT hoành độ giao điểm', 'Số giao điểm theo $\\Delta$', 'Tiếp xúc: $\\Delta=0$'] },
        { title: 'Bài toán tham số', items: ['Điều kiện có nghiệm', 'Hệ thức giữa hai nghiệm', 'Nghiệm cùng dấu / trái dấu', 'GTNN, GTLN theo $m$'] },
      ],
    },
    practiceSkills: [
      {
        title: 'Quy trình 3 bước cho bài toán tham số (câu phân loại thi vào 10)',
        detail: [
          'Bước 1: Điều kiện để phương trình có hai nghiệm ($a\\ne0$ và $\\Delta\\ge0$ hoặc $\\Delta>0$).',
          'Bước 2: Viết Viète: $S=-\\f{b}{a}$, $P=\\f{c}{a}$.',
          'Bước 3: Biến đổi hệ thức đề cho về $S$, $P$, giải theo $m$, rồi **đối chiếu điều kiện ở Bước 1**.',
          'Rất nhiều bạn làm đúng Bước 3 nhưng quên đối chiếu và mất 0,25–0,5 điểm.',
        ],
      },
    ],
    types: [
      {
        id: 'g9-t3-d1', name: 'Dạng 1. Giải phương trình bậc hai', level: 'NB',
        method: ['Xác định $a$, $b$, $c$.', 'Tính $\\Delta$ (hoặc $\\Delta\'$).', 'Kết luận nghiệm.'],
        worked: [{
          prompt: 'Giải phương trình $2x^{2}-5x+3=0$.',
          thinking: ['Thử nhẩm: $a+b+c=2-5+3=0$ → có nghiệm $x=1$.'],
          solution: [
            'Vì $a+b+c=2-5+3=0$ nên phương trình có hai nghiệm $x_1=1$ và $x_2=\\f{c}{a}=\\f{3}{2}$.',
          ],
        }],
      },
      {
        id: 'g9-t3-d2', name: 'Dạng 2. Ứng dụng hệ thức Viète', level: 'VD',
        method: ['Kiểm tra $\\Delta\\ge0$.', 'Viết $S$, $P$.', 'Biểu diễn biểu thức cần tính qua $S$, $P$.'],
        worked: [{
          prompt: 'Cho phương trình $x^{2}-6x+4=0$ có hai nghiệm $x_1,x_2$. Tính $A=x_1^{2}+x_2^{2}$.',
          thinking: ['Biểu thức đối xứng → dùng $x_1^{2}+x_2^{2}=S^{2}-2P$, không cần giải phương trình.'],
          solution: [
            '$\\Delta\'=(-3)^{2}-4=5>0$ nên phương trình có hai nghiệm phân biệt.',
            'Theo Viète: $S=x_1+x_2=6$; $P=x_1x_2=4$.',
            '$A=S^{2}-2P=36-8=28$.',
          ],
        }],
      },
      {
        id: 'g9-t3-d3', name: 'Dạng 3. Bài toán tham số (câu phân loại)', level: 'VDC',
        method: ['Điều kiện có nghiệm.', 'Viète.', 'Biến đổi hệ thức đề cho.', 'Giải theo $m$ và đối chiếu.'],
        worked: [{
          prompt: 'Cho phương trình $x^{2}-2(m+1)x+m^{2}+2=0$. Tìm $m$ để phương trình có hai nghiệm $x_1,x_2$ thoả mãn $x_1^{2}+x_2^{2}=20$.',
          thinking: [
            'Bước 1: điều kiện $\\Delta\'\\ge0$.',
            'Bước 2: Viète cho $S$ và $P$.',
            'Bước 3: viết $x_1^{2}+x_2^{2}=S^{2}-2P$ rồi giải theo $m$, cuối cùng đối chiếu.',
          ],
          solution: [
            '$\\Delta\'=(m+1)^{2}-(m^{2}+2)=2m-1$.',
            'Phương trình có hai nghiệm $\\Leftrightarrow\\Delta\'\\ge0\\Leftrightarrow m\\ge\\f{1}{2}$. (*)',
            'Theo Viète: $S=x_1+x_2=2(m+1)$; $P=x_1x_2=m^{2}+2$.',
            '$x_1^{2}+x_2^{2}=S^{2}-2P=4(m+1)^{2}-2(m^{2}+2)=4m^{2}+8m+4-2m^{2}-4=2m^{2}+8m$.',
            'Theo đề: $2m^{2}+8m=20\\Leftrightarrow m^{2}+4m-10=0$.',
            '$\\Delta_m\'=4+10=14\\Rightarrow m=-2\\pm\\s{14}$.',
            'Đối chiếu (*): $m=-2+\\s{14}\\approx1{,}74\\ge\\f{1}{2}$ (nhận); $m=-2-\\s{14}<\\f{1}{2}$ (loại).',
            'Vậy $m=-2+\\s{14}$.',
          ],
          remark: 'Bước đối chiếu điều kiện (*) chính là nơi phân loại học sinh 8 điểm và học sinh 9+.',
        }],
      },
    ],
    bank: ['g9.pt-bac-hai', 'g9.viete', 'g9.viete-tham-so', 'g9.parabol'],
  },

  {
    id: 'g9-t4', grade: 9, term: 'HK1', strand: 'SO_DAI_SO', order: 4,
    name: 'Bất đẳng thức và Bất phương trình bậc nhất một ẩn',
    summary: 'Tính chất bất đẳng thức, bất phương trình bậc nhất một ẩn và cách giải.',
    outcomes: [
      'Vận dụng tính chất của bất đẳng thức.',
      'Giải bất phương trình bậc nhất một ẩn và biểu diễn tập nghiệm.',
    ],
    theory: [
      {
        heading: 'Tính chất và quy tắc',
        body: ['Bất phương trình biến đổi giống phương trình, trừ một điểm sống còn: nhân hoặc chia cho số **âm** thì phải đổi chiều.'],
        formulas: [
          '$a<b\\Rightarrow a+c<b+c$',
          '$a<b$ và $c>0$ $\\Rightarrow ac<bc$',
          '$a<b$ và $c<0$ $\\Rightarrow ac>bc$ (**đổi chiều**)',
          '$a<b$ và $b<c\\Rightarrow a<c$',
          'Bất phương trình bậc nhất: $ax+b>0$ ($a\\ne0$)',
        ],
        caution: ['Nhân hoặc chia hai vế cho số **âm** thì phải đổi chiều bất đẳng thức — lỗi sai kinh điển.'],
      },
    ],
    decode: [
      { signal: 'Chia hai vế cho hệ số âm', action: 'Đổi chiều dấu bất đẳng thức.', why: 'Phép nhân với số âm đảo thứ tự trên trục số.' },
      { signal: 'Bất phương trình có mẫu số', action: 'Nhân hai vế với mẫu **dương** (BCNN) để khử mẫu.', why: 'Nhân với số dương giữ nguyên chiều.' },
      { signal: 'Đề hỏi “nghiệm nguyên lớn nhất/nhỏ nhất”', action: 'Giải bất phương trình rồi chọn số nguyên ở đầu mút.', why: 'Tập nghiệm là một khoảng, đầu mút quyết định đáp số.' },
    ],
    mindmap: {
      root: 'BẤT ĐẲNG THỨC — BẤT PHƯƠNG TRÌNH',
      branches: [
        { title: 'Bất đẳng thức', items: ['Cộng hai vế', 'Nhân số dương', 'Nhân số âm: đổi chiều', 'Bắc cầu'] },
        { title: 'Bất phương trình', items: ['$ax+b>0$', 'Quy tắc chuyển vế', 'Quy tắc nhân', 'Biểu diễn trên trục số'] },
        { title: 'Ứng dụng', items: ['Nghiệm nguyên', 'Bài toán thực tế có ràng buộc', 'Tìm điều kiện tham số'] },
      ],
    },
    types: [
      {
        id: 'g9-t4-d1', name: 'Dạng 1. Giải bất phương trình bậc nhất', level: 'TH',
        method: ['Khử mẫu (nhân với số dương).', 'Chuyển vế thu gọn.', 'Chia hệ số, chú ý đổi chiều nếu chia cho số âm.'],
        worked: [{
          prompt: 'Giải bất phương trình $\\f{2x-1}{3}\\le\\f{x+2}{2}$.',
          thinking: ['Nhân hai vế với 6 (số dương, giữ nguyên chiều).'],
          solution: [
            '$2(2x-1)\\le3(x+2)$',
            '$4x-2\\le3x+6$',
            '$x\\le8$.',
            'Tập nghiệm: $S=\\{x\\mid x\\le8\\}$.',
          ],
        }],
      },
    ],
    bank: ['g9.bpt'],
  },

  {
    id: 'g9-t5', grade: 9, term: 'HK1', strand: 'HINH_HOC', order: 5,
    name: 'Hệ thức lượng trong tam giác vuông — Tỉ số lượng giác',
    summary: 'Các hệ thức về cạnh và đường cao, tỉ số lượng giác của góc nhọn và ứng dụng thực tế.',
    outcomes: [
      'Vận dụng các hệ thức về cạnh và đường cao trong tam giác vuông.',
      'Tính và vận dụng tỉ số lượng giác của góc nhọn.',
      'Giải tam giác vuông và bài toán thực tiễn (đo chiều cao, khoảng cách).',
    ],
    theory: [
      {
        heading: '1. Hệ thức về cạnh và đường cao',
        body: ['Cho $\\tri ABC$ vuông tại $A$, đường cao $AH$, $BC=a$, $AC=b$, $AB=c$, $BH=c\'$, $CH=b\'$, $AH=h$.'],
        formulas: [
          '$b^{2}=ab\'$ ; $c^{2}=ac\'$',
          '$h^{2}=b\'c\'$',
          '$ah=bc$',
          '$\\f{1}{h^{2}}=\\f{1}{b^{2}}+\\f{1}{c^{2}}$',
          '$a^{2}=b^{2}+c^{2}$ (Pythagore)',
        ],
      },
      {
        heading: '2. Tỉ số lượng giác của góc nhọn',
        body: ['Mẹo nhớ: “**Sin đi học – Cos không hư – Tang đoàn kết – Cotang kết đoàn**”.'],
        formulas: [
          '$\\sin\\alpha=\\f{\\text{đối}}{\\text{huyền}}$ ; $\\cos\\alpha=\\f{\\text{kề}}{\\text{huyền}}$',
          '$\\tan\\alpha=\\f{\\text{đối}}{\\text{kề}}$ ; $\\cot\\alpha=\\f{\\text{kề}}{\\text{đối}}$',
          '$\\sin^{2}\\alpha+\\cos^{2}\\alpha=1$',
          '$\\tan\\alpha\\cdot\\cot\\alpha=1$ ; $\\tan\\alpha=\\f{\\sin\\alpha}{\\cos\\alpha}$',
          'Nếu $\\alpha+\\beta=90\\deg$ thì $\\sin\\alpha=\\cos\\beta$, $\\tan\\alpha=\\cot\\beta$',
          'Giá trị đặc biệt: $\\sin30\\deg=\\f{1}{2}$ ; $\\sin45\\deg=\\f{\\s{2}}{2}$ ; $\\sin60\\deg=\\f{\\s{3}}{2}$',
        ],
      },
      {
        heading: '3. Giải tam giác vuông',
        body: ['Giải tam giác vuông là tìm tất cả cạnh và góc còn lại khi biết hai yếu tố, trong đó có ít nhất một cạnh.'],
        formulas: [
          'Cạnh góc vuông $=$ cạnh huyền $\\times\\sin$ góc đối $=$ cạnh huyền $\\times\\cos$ góc kề',
          'Cạnh góc vuông $=$ cạnh góc vuông kia $\\times\\tan$ góc đối $=$ cạnh góc vuông kia $\\times\\cot$ góc kề',
        ],
      },
    ],
    decode: [
      { signal: 'Có đường cao trong tam giác vuông', action: 'Truy ngay 5 hệ thức lượng, chọn hệ thức chứa đủ dữ kiện.', why: 'Mỗi hệ thức liên kết đúng 3 đại lượng — chọn hệ thức có 2 đại lượng đã biết.' },
      { signal: 'Đề cho một góc nhọn và một cạnh', action: 'Dùng tỉ số lượng giác để tính cạnh còn lại.', why: 'Một góc + một cạnh là đủ để giải tam giác vuông.' },
      { signal: 'Bài toán “góc nâng”, “góc hạ”, đo chiều cao toà nhà', action: 'Vẽ tam giác vuông, dùng $\\tan$.', why: '$\\tan$ liên kết chiều cao với khoảng cách ngang.' },
      { signal: 'Cho $\\sin\\alpha$, hỏi $\\cos\\alpha$', action: 'Dùng $\\sin^{2}+\\cos^{2}=1$, lấy giá trị dương vì $\\alpha$ nhọn.', why: 'Với góc nhọn, mọi tỉ số lượng giác đều dương.' },
    ],
    mindmap: {
      root: 'HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG',
      branches: [
        { title: 'Cạnh và đường cao', items: ['$b^{2}=ab\'$', '$h^{2}=b\'c\'$', '$ah=bc$', '$\\f{1}{h^{2}}=\\f{1}{b^{2}}+\\f{1}{c^{2}}$'] },
        { title: 'Tỉ số lượng giác', items: ['sin, cos, tan, cot', 'Góc phụ nhau', '$\\sin^{2}+\\cos^{2}=1$', 'Giá trị $30\\deg,45\\deg,60\\deg$'] },
        { title: 'Giải tam giác vuông', items: ['Biết 2 cạnh', 'Biết 1 cạnh 1 góc', 'Tính đủ 3 cạnh 2 góc'] },
        { title: 'Thực tế', items: ['Đo chiều cao cây, toà nhà', 'Góc nâng, góc hạ', 'Độ dốc, đường trượt'] },
      ],
    },
    types: [
      {
        id: 'g9-t5-d1', name: 'Dạng 1. Tính cạnh, đường cao', level: 'TH',
        method: ['Vẽ hình, ghi ký hiệu.', 'Chọn hệ thức có hai đại lượng đã biết.', 'Thay số và tính.'],
        worked: [{
          prompt: 'Tam giác $ABC$ vuông tại $A$, đường cao $AH$. Biết $BH=4\\,cm$, $CH=9\\,cm$. Tính $AH$, $AB$, $AC$.',
          thinking: ['$BC=BH+CH=13$. Dùng $h^{2}=b\'c\'$ và $c^{2}=ac\'$.'],
          solution: [
            '$BC=BH+CH=4+9=13\\ (cm)$.',
            '$AH^{2}=BH\\cdot CH=4\\cdot9=36\\Rightarrow AH=6\\ (cm)$.',
            '$AB^{2}=BH\\cdot BC=4\\cdot13=52\\Rightarrow AB=2\\s{13}\\ (cm)$.',
            '$AC^{2}=CH\\cdot BC=9\\cdot13=117\\Rightarrow AC=3\\s{13}\\ (cm)$.',
          ],
        }],
      },
      {
        id: 'g9-t5-d2', name: 'Dạng 2. Bài toán thực tế với tỉ số lượng giác', level: 'VD',
        method: ['Mô hình hoá bằng tam giác vuông.', 'Xác định góc và cạnh đã biết.', 'Dùng tan/sin/cos phù hợp.'],
        worked: [{
          prompt: 'Từ một điểm cách chân toà nhà $30\\,m$, người ta nhìn đỉnh toà nhà dưới góc nâng $52\\deg$. Mắt người quan sát cao $1{,}6\\,m$. Tính chiều cao toà nhà (làm tròn đến hàng phần mười).',
          thinking: ['Chiều cao toà nhà = chiều cao tính từ tầm mắt + chiều cao mắt.'],
          solution: [
            'Gọi $h$ là chiều cao từ tầm mắt đến đỉnh toà nhà.',
            '$\\tan52\\deg=\\f{h}{30}\\Rightarrow h=30\\tan52\\deg\\approx30\\cdot1{,}2799\\approx38{,}4\\ (m)$.',
            'Chiều cao toà nhà: $38{,}4+1{,}6=40{,}0\\ (m)$.',
          ],
        }],
      },
    ],
    bank: ['g9.he-thuc-luong', 'g9.ti-so-luong-giac'],
  },

  {
    id: 'g9-t6', grade: 9, term: 'HK1', strand: 'HINH_HOC', order: 6,
    name: 'Đường tròn — Góc với đường tròn — Tứ giác nội tiếp',
    summary: 'Đường tròn, dây cung, tiếp tuyến, vị trí tương đối, góc ở tâm, góc nội tiếp, tứ giác nội tiếp.',
    outcomes: [
      'Vận dụng quan hệ giữa đường kính và dây, tính chất tiếp tuyến.',
      'Vận dụng góc ở tâm, góc nội tiếp, góc tạo bởi tiếp tuyến và dây cung.',
      'Chứng minh tứ giác nội tiếp và vận dụng.',
    ],
    theory: [
      {
        heading: '1. Đường tròn, dây và tiếp tuyến',
        body: ['Ba đối tượng cơ bản của chuyên đề. Quan hệ vuông góc giữa tiếp tuyến và bán kính là chìa khoá của phần lớn bài chứng minh.'],
        formulas: [
          'Đường kính vuông góc với một dây thì đi qua trung điểm của dây ấy (và ngược lại, với dây không đi qua tâm).',
          'Trong một đường tròn, dây lớn hơn thì gần tâm hơn.',
          'Tiếp tuyến $\\perp$ bán kính tại tiếp điểm.',
          'Hai tiếp tuyến cắt nhau tại $M$: $MA=MB$; $MO$ là phân giác $\\angle AMB$ và $\\angle AOB$; $MO\\perp AB$ tại trung điểm $AB$.',
        ],
      },
      {
        heading: '2. Góc với đường tròn',
        body: ['Mọi loại góc đều quy về **cung bị chắn**. Nắm được bảng quy đổi này là giải được phần lớn câu hình thi vào 10.'],
        formulas: [
          'Góc ở tâm bằng số đo cung bị chắn.',
          'Góc nội tiếp bằng **nửa** số đo cung bị chắn.',
          'Các góc nội tiếp cùng chắn một cung thì bằng nhau.',
          'Góc nội tiếp chắn nửa đường tròn là **góc vuông**.',
          'Góc tạo bởi tiếp tuyến và dây cung bằng nửa số đo cung bị chắn (bằng góc nội tiếp chắn cung đó).',
          'Góc có đỉnh bên trong đường tròn $=\\f{1}{2}$ (tổng hai cung bị chắn); bên ngoài $=\\f{1}{2}$ (hiệu hai cung bị chắn).',
        ],
      },
      {
        heading: '3. Tứ giác nội tiếp',
        body: ['Dấu hiệu nhận biết — đây là “vũ khí” chính của câu hình thi vào 10.'],
        formulas: [
          'Tứ giác có tổng hai góc đối bằng $180\\deg$.',
          'Tứ giác có góc ngoài tại một đỉnh bằng góc trong của đỉnh đối diện.',
          'Tứ giác có hai đỉnh kề cùng nhìn một cạnh dưới hai góc bằng nhau.',
          'Tứ giác có bốn đỉnh cách đều một điểm.',
          'Hệ quả (phương tích): $MA\\cdot MB=MC\\cdot MD$ khi $A,B,C,D$ cùng thuộc một đường tròn.',
        ],
      },
    ],
    decode: [
      { signal: 'Trong hình có hai góc vuông cùng nhìn một đoạn thẳng', action: 'Bốn điểm cùng thuộc đường tròn đường kính là đoạn thẳng đó → tứ giác nội tiếp.', why: 'Đây là dấu hiệu xuất hiện nhiều nhất trong câu hình thi vào 10.' },
      { signal: 'Đề cho đường cao / đường vuông góc trong tam giác nội tiếp', action: 'Tìm ngay tứ giác nội tiếp tạo bởi các chân đường vuông góc.', why: 'Hai góc vuông là “nam châm” của tứ giác nội tiếp.' },
      { signal: 'Đề cho hai tiếp tuyến cắt nhau', action: 'Khai thác $MA=MB$, $MO$ là trung trực $AB$, và tứ giác $MAOB$ nội tiếp (hai góc vuông đối nhau).', why: 'Một dữ kiện cho ba kết luận.' },
      { signal: 'Yêu cầu chứng minh $MA\\cdot MB=MC\\cdot MD$', action: 'Chứng minh hai tam giác đồng dạng (dùng góc nội tiếp cùng chắn cung).', why: 'Đây là hệ thức phương tích, chứng minh qua đồng dạng.' },
      { signal: 'Đề nói “đường kính $AB$, điểm $C$ trên đường tròn”', action: 'Kết luận ngay $\\angle ACB=90\\deg$.', why: 'Góc nội tiếp chắn nửa đường tròn.' },
      { signal: 'Câu cuối hỏi điểm cố định / quỹ tích', action: 'Thử vài vị trí đặc biệt để dự đoán, rồi chứng minh bằng góc không đổi hoặc khoảng cách không đổi.', why: 'Dự đoán trước rồi chứng minh sau là chiến thuật chuẩn cho câu 0,5 điểm cuối.' },
    ],
    mindmap: {
      root: 'ĐƯỜNG TRÒN — GÓC — TỨ GIÁC NỘI TIẾP',
      branches: [
        { title: 'Đường tròn, dây', items: ['Đường kính ⊥ dây', 'Dây và khoảng cách tới tâm', 'Vị trí tương đối đường thẳng – đường tròn'] },
        { title: 'Tiếp tuyến', items: ['Tiếp tuyến ⊥ bán kính', 'Hai tiếp tuyến cắt nhau', 'Tiếp tuyến chung'] },
        { title: 'Góc', items: ['Góc ở tâm', 'Góc nội tiếp $=\\f{1}{2}$ cung', 'Góc tiếp tuyến – dây', 'Góc trong / ngoài đường tròn'] },
        { title: 'Tứ giác nội tiếp', items: ['Tổng 2 góc đối $=180\\deg$', 'Hai đỉnh kề cùng nhìn 1 cạnh', 'Góc ngoài = góc trong đối diện', 'Phương tích'] },
        { title: 'Đường tròn đặc biệt', items: ['Ngoại tiếp tam giác', 'Nội tiếp tam giác', 'Đa giác đều'] },
      ],
    },
    practiceSkills: [
      {
        title: 'Chiến thuật làm câu hình thi vào 10 (3–4 ý)',
        detail: [
          'Ý a (chứng minh tứ giác nội tiếp): tìm hai góc vuông hoặc hai góc cùng nhìn một cạnh — hầu như luôn làm được, phải lấy trọn điểm.',
          'Ý b (chứng minh hệ thức / đồng dạng): dùng góc nội tiếp cùng chắn cung để có cặp góc bằng nhau, rồi g.g.',
          'Ý c (tính độ dài / diện tích): dùng hệ thức lượng, tỉ số đồng dạng hoặc công thức cung, quạt.',
          'Ý d (câu phân loại): thử vị trí đặc biệt để dự đoán, sau đó chứng minh đại lượng không đổi.',
          'Luôn vẽ hình to, rõ, ghi đủ ký hiệu vuông góc và bằng nhau lên hình.',
        ],
      },
    ],
    types: [
      {
        id: 'g9-t6-d1', name: 'Dạng 1. Tính số đo góc, độ dài cung, diện tích quạt', level: 'TH',
        method: ['Xác định loại góc.', 'Áp dụng công thức tương ứng.'],
        worked: [{
          prompt: 'Cho đường tròn $(O;R)$ và cung $AB$ có số đo $60\\deg$. Tính độ dài cung $AB$ và diện tích hình quạt tròn $OAB$ theo $R$.',
          thinking: ['Dùng công thức độ dài cung $l=\\f{\\pi Rn}{180}$ và diện tích quạt $S=\\f{\\pi R^{2}n}{360}$.'],
          solution: [
            '$l_{AB}=\\f{\\pi R\\cdot60}{180}=\\f{\\pi R}{3}$.',
            '$S_{quat}=\\f{\\pi R^{2}\\cdot60}{360}=\\f{\\pi R^{2}}{6}$.',
          ],
        }],
      },
      {
        id: 'g9-t6-d2', name: 'Dạng 2. Chứng minh tứ giác nội tiếp', level: 'VD',
        method: ['Tìm hai góc vuông cùng nhìn một cạnh, hoặc tổng hai góc đối bằng $180\\deg$.', 'Kết luận kèm tên đường tròn (nếu xác định được).'],
        worked: [{
          prompt: 'Cho tam giác $ABC$ nhọn, các đường cao $BE$ và $CF$ cắt nhau tại $H$. Chứng minh tứ giác $AEHF$ nội tiếp.',
          thinking: ['$BE\\perp AC$ và $CF\\perp AB$ cho hai góc vuông tại $E$ và $F$, đối nhau trong tứ giác $AEHF$.'],
          solution: [
            'Vì $BE$ là đường cao nên $\\angle AEH=90\\deg$.',
            'Vì $CF$ là đường cao nên $\\angle AFH=90\\deg$.',
            'Xét tứ giác $AEHF$: $\\angle AEH+\\angle AFH=90\\deg+90\\deg=180\\deg$.',
            'Hai góc này ở vị trí đối nhau nên tứ giác $AEHF$ nội tiếp đường tròn đường kính $AH$.',
          ],
        }],
      },
      {
        id: 'g9-t6-d3', name: 'Dạng 3. Chứng minh hệ thức, đẳng thức tích', level: 'VDC',
        method: ['Đưa hệ thức về tỉ lệ.', 'Tìm hai tam giác đồng dạng chứa các cạnh đó.', 'Dùng góc nội tiếp cùng chắn cung để có cặp góc bằng nhau.'],
        worked: [{
          prompt: 'Từ điểm $M$ ở ngoài đường tròn $(O)$ kẻ cát tuyến $MAB$ và tiếp tuyến $MT$ ($T$ là tiếp điểm). Chứng minh $MT^{2}=MA\\cdot MB$.',
          thinking: [
            'Đưa về tỉ lệ: $MT^{2}=MA\\cdot MB\\Leftrightarrow\\f{MT}{MA}=\\f{MB}{MT}$.',
            'Tỉ lệ này gợi hai tam giác $MTA$ và $MBT$.',
            'Cần cặp góc bằng nhau: dùng góc tạo bởi tiếp tuyến và dây cung.',
          ],
          solution: [
            'Xét $\\tri MTA$ và $\\tri MBT$ có: $\\angle M$ chung.',
            '$\\angle MTA=\\angle MBT$ (góc tạo bởi tiếp tuyến $TM$ và dây $TA$ bằng góc nội tiếp $\\angle TBA$ cùng chắn cung $TA$).',
            'Do đó $\\tri MTA\\sim\\tri MBT$ (g.g).',
            'Suy ra $\\f{MT}{MB}=\\f{MA}{MT}$, tức $MT^{2}=MA\\cdot MB$.',
          ],
          remark: 'Đây là hệ thức phương tích — công cụ rất mạnh cho ý d của câu hình thi vào 10.',
        }],
      },
    ],
    bank: ['g9.duong-tron', 'g9.goc-duong-tron', 'g9.tu-giac-noi-tiep'],
  },

  {
    id: 'g9-t7', grade: 9, term: 'HK2', strand: 'HINH_HOC', order: 7,
    name: 'Hình trụ — Hình nón — Hình cầu',
    summary: 'Diện tích xung quanh, diện tích toàn phần và thể tích của hình trụ, hình nón, hình cầu.',
    outcomes: ['Tính diện tích và thể tích các hình khối tròn xoay.', 'Giải bài toán thực tiễn liên quan.'],
    theory: [
      {
        heading: 'Công thức cần thuộc',
        body: ['Bộ công thức trọng tâm của chuyên đề. Học kèm **điều kiện áp dụng** thì mới dùng đúng chỗ.'],
        formulas: [
          'Hình trụ: $S_{xq}=2\\pi rh$ ; $S_{tp}=2\\pi rh+2\\pi r^{2}$ ; $V=\\pi r^{2}h$',
          'Hình nón: $S_{xq}=\\pi rl$ ; $S_{tp}=\\pi rl+\\pi r^{2}$ ; $V=\\f{1}{3}\\pi r^{2}h$',
          'Liên hệ trong hình nón: $l^{2}=r^{2}+h^{2}$',
          'Hình cầu: $S=4\\pi R^{2}$ ; $V=\\f{4}{3}\\pi R^{3}$',
        ],
        caution: ['Phân biệt đường sinh $l$ (mặt bên hình nón) với chiều cao $h$ (trục).'],
      },
    ],
    decode: [
      { signal: 'Đề cho bán kính và đường sinh của hình nón', action: 'Dùng $S_{xq}=\\pi rl$; muốn tính $V$ thì tìm $h=\\s{l^{2}-r^{2}}$.', why: 'Đường sinh, bán kính và chiều cao tạo thành tam giác vuông.' },
      { signal: 'Bài toán bể chứa hình trụ', action: 'Dùng $V=\\pi r^{2}h$, đổi về lít nếu cần.', why: 'Mô hình thực tế phổ biến nhất của hình trụ.' },
      { signal: 'Đề nói “quay hình chữ nhật quanh một cạnh”', action: 'Được hình trụ với bán kính là cạnh kia.', why: 'Nhận diện vật thể tròn xoay.' },
    ],
    mindmap: {
      root: 'HÌNH TRỤ — NÓN — CẦU',
      branches: [
        { title: 'Hình trụ', items: ['$S_{xq}=2\\pi rh$', '$V=\\pi r^{2}h$', 'Quay hình chữ nhật'] },
        { title: 'Hình nón', items: ['$S_{xq}=\\pi rl$', '$V=\\f{1}{3}\\pi r^{2}h$', '$l^{2}=r^{2}+h^{2}$'] },
        { title: 'Hình cầu', items: ['$S=4\\pi R^{2}$', '$V=\\f{4}{3}\\pi R^{3}$', 'Mặt cắt là hình tròn'] },
      ],
    },
    types: [
      {
        id: 'g9-t7-d1', name: 'Dạng 1. Tính diện tích, thể tích', level: 'TH',
        method: ['Xác định hình và các yếu tố.', 'Áp dụng công thức, ghi rõ đơn vị.'],
        worked: [{
          prompt: 'Một hình nón có bán kính đáy $3\\,cm$, đường sinh $5\\,cm$. Tính diện tích xung quanh và thể tích hình nón.',
          thinking: ['Cần chiều cao để tính thể tích: $h=\\s{l^{2}-r^{2}}$.'],
          solution: [
            '$S_{xq}=\\pi rl=\\pi\\cdot3\\cdot5=15\\pi\\ (cm^{2})$.',
            '$h=\\s{5^{2}-3^{2}}=\\s{16}=4\\ (cm)$.',
            '$V=\\f{1}{3}\\pi r^{2}h=\\f{1}{3}\\pi\\cdot9\\cdot4=12\\pi\\ (cm^{3})$.',
          ],
        }],
      },
    ],
    bank: ['g9.hinh-tru-non-cau'],
  },

  {
    id: 'g9-t8', grade: 9, term: 'HK1', strand: 'THONG_KE_XS', order: 8,
    name: 'Thống kê và Xác suất',
    summary: 'Bảng tần số, tần số tương đối, biểu đồ; phép thử ngẫu nhiên và xác suất của biến cố.',
    outcomes: [
      'Lập bảng tần số, tần số tương đối và vẽ biểu đồ tương ứng.',
      'Tính xác suất của biến cố trong một số mô hình đơn giản.',
    ],
    theory: [
      {
        heading: 'Tần số và xác suất',
        body: ['Tần số mô tả dữ liệu đã thu thập; xác suất dự đoán khả năng xảy ra. Tần số tương đối là cầu nối giữa hai khái niệm.'],
        formulas: [
          'Tần số $n_i$: số lần xuất hiện của giá trị $x_i$',
          'Tần số tương đối: $f_i=\\f{n_i}{N}$ (thường viết dưới dạng phần trăm)',
          'Tổng tần số tương đối bằng $100\\percent$',
          'Xác suất: $P(A)=\\f{\\text{số kết quả thuận lợi}}{\\text{số kết quả có thể}}$',
          'Phép thử hai giai đoạn: dùng sơ đồ cây để liệt kê đầy đủ kết quả.',
        ],
      },
    ],
    decode: [
      { signal: 'Đề mô tả phép thử gồm hai hành động liên tiếp', action: 'Vẽ sơ đồ cây để liệt kê đủ kết quả.', why: 'Sơ đồ cây chống bỏ sót — nguyên nhân sai số 1 của dạng này.' },
      { signal: 'Đề cho bảng tần số và hỏi tần số tương đối', action: 'Chia tần số cho tổng rồi đổi ra phần trăm.', why: 'Áp dụng trực tiếp công thức.' },
    ],
    mindmap: {
      root: 'THỐNG KÊ & XÁC SUẤT LỚP 9',
      branches: [
        { title: 'Bảng tần số', items: ['Tần số $n_i$', 'Tần số tương đối $f_i$', 'Bảng ghép nhóm'] },
        { title: 'Biểu đồ', items: ['Cột', 'Đoạn thẳng', 'Hình quạt tròn', 'Tần số tương đối ghép nhóm'] },
        { title: 'Xác suất', items: ['Phép thử', 'Không gian mẫu', 'Sơ đồ cây', '$P(A)=\\f{m}{k}$'] },
      ],
    },
    types: [
      {
        id: 'g9-t8-d1', name: 'Dạng 1. Xác suất với phép thử hai giai đoạn', level: 'VD',
        method: ['Vẽ sơ đồ cây liệt kê kết quả.', 'Đếm kết quả thuận lợi.', 'Lập tỉ số.'],
        worked: [{
          prompt: 'Tung một đồng xu hai lần. Tính xác suất để có ít nhất một lần xuất hiện mặt sấp (S).',
          thinking: ['Liệt kê 4 kết quả; “ít nhất một lần S” là phần bù của “không lần nào S”.'],
          solution: [
            'Không gian mẫu: $\\{NN;NS;SN;SS\\}$ — có 4 kết quả đồng khả năng.',
            'Kết quả không có mặt sấp: chỉ $NN$ — 1 kết quả.',
            'Số kết quả thuận lợi: $4-1=3$.',
            '$P=\\f{3}{4}$.',
          ],
        }],
      },
    ],
    bank: ['g9.thong-ke', 'g9.xac-suat'],
  },
];
