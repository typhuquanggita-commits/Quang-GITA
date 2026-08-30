import type { Topic } from '@/types';

/* MATHGITA — CHUYÊN ĐỀ TOÁN 7 (Chương trình GDPT 2018) */

export const G7_TOPICS: Topic[] = [
  {
    id: 'g7-t1', grade: 7, term: 'HK1', strand: 'SO_DAI_SO', order: 1,
    name: 'Số hữu tỉ — Số thực',
    summary: 'Tập hợp $\\Q$ và $\\R$, các phép tính, lũy thừa, giá trị tuyệt đối, căn bậc hai số học và làm tròn.',
    outcomes: [
      'Nhận biết số hữu tỉ, số vô tỉ, số thực; biểu diễn và so sánh trên trục số.',
      'Thực hiện thành thạo các phép tính với số hữu tỉ, tính hợp lí.',
      'Vận dụng các quy tắc lũy thừa với số mũ tự nhiên của số hữu tỉ.',
      'Tính căn bậc hai số học, làm tròn và ước lượng.',
    ],
    theory: [
      {
        heading: '1. Tập hợp số hữu tỉ và số thực',
        body: ['Số hữu tỉ là số viết được dưới dạng $\\f{a}{b}$ với $a,b\\in\\Z$, $b\\ne0$. Số vô tỉ là số thập phân vô hạn không tuần hoàn.'],
        formulas: [
          '$\\N\\subset\\Z\\subset\\Q\\subset\\R$',
          'Số vô tỉ: $\\s{2}$, $\\s{3}$, $\\pi$, $1{,}010010001\\dots$',
          '$\\abs{x}=x$ nếu $x\\ge0$ ; $\\abs{x}=-x$ nếu $x<0$',
        ],
        caution: ['$\\s{9}=3$ (căn bậc hai **số học** chỉ lấy giá trị không âm), nhưng $x^{2}=9\\Rightarrow x=\\pm3$.'],
      },
      {
        heading: '2. Lũy thừa của số hữu tỉ',
        body: [],
        formulas: [
          '$x^{m}\\cdot x^{n}=x^{m+n}$ ; $x^{m}:x^{n}=x^{m-n}$ ($x\\ne0$, $m\\ge n$)',
          '$(x^{m})^{n}=x^{mn}$',
          '$(xy)^{n}=x^{n}y^{n}$ ; $\\left(\\f{x}{y}\\right)^{n}=\\f{x^{n}}{y^{n}}$ ($y\\ne0$)',
          '$x^{0}=1$ ($x\\ne0$)',
        ],
        caution: ['$(x^{m})^{n}=x^{mn}$ — **nhân** số mũ; còn $x^{m}\\cdot x^{n}=x^{m+n}$ — **cộng** số mũ. Đây là cặp dễ nhầm nhất.'],
      },
      {
        heading: '3. Giá trị tuyệt đối và căn bậc hai số học',
        body: [],
        formulas: [
          '$\\abs{x}\\ge0$ với mọi $x$ ; $\\abs{x}=0\\Leftrightarrow x=0$',
          '$\\abs{x}=a$ ($a>0$) $\\Leftrightarrow x=a$ hoặc $x=-a$',
          '$\\s{a}=b\\Leftrightarrow b\\ge0$ và $b^{2}=a$ (với $a\\ge0$)',
          '$\\s{a^{2}}=\\abs{a}$',
        ],
      },
    ],
    decode: [
      { signal: 'Biểu thức có nhiều phân số cùng mẫu hoặc có thừa số chung', action: 'Nhóm và đặt nhân tử chung trước khi quy đồng.', why: 'Giảm mẫu số lớn, hạn chế sai số học.' },
      { signal: 'Xuất hiện $\\abs{A}$ trong phương trình', action: 'Chia hai trường hợp $A\\ge0$ và $A<0$, hoặc dùng $\\abs{A}=a\\Rightarrow A=\\pm a$.', why: 'Giá trị tuyệt đối luôn sinh hai nhánh nghiệm.' },
      { signal: 'Tổng các biểu thức không âm bằng 0', action: 'Cho từng biểu thức bằng 0.', why: 'Tổng các số không âm bằng 0 khi và chỉ khi mọi số hạng bằng 0 — kỹ thuật kinh điển tìm giá trị nhỏ nhất.' },
      { signal: 'Lũy thừa cùng cơ số hoặc cùng số mũ', action: 'Đưa về cùng cơ số/số mũ rồi so sánh hoặc rút gọn.', why: 'Chỉ khi đồng dạng mới so sánh được trực tiếp.' },
      { signal: 'Yêu cầu tìm GTNN của biểu thức chứa $\\abs{\\ }$ hoặc bình phương', action: 'Dùng $\\abs{A}\\ge0$, $A^{2}\\ge0$ để chặn dưới, dấu bằng khi $A=0$.', why: 'Chặn – chỉ ra dấu bằng là quy trình chuẩn của bài cực trị lớp 7.' },
    ],
    mindmap: {
      root: 'SỐ HỮU TỈ — SỐ THỰC',
      branches: [
        { title: 'Tập hợp số', items: ['$\\N\\subset\\Z\\subset\\Q\\subset\\R$', 'Số vô tỉ', 'Trục số thực', 'Số đối, nghịch đảo'] },
        { title: 'Phép tính', items: ['Cộng, trừ, nhân, chia', 'Tính hợp lí', 'Thứ tự thực hiện'] },
        { title: 'Lũy thừa', items: ['$x^{m}x^{n}=x^{m+n}$', '$(x^{m})^{n}=x^{mn}$', '$(xy)^{n}=x^{n}y^{n}$'] },
        { title: 'Giá trị tuyệt đối', items: ['Định nghĩa 2 nhánh', '$\\abs{x}\\ge0$', 'Phương trình chứa dấu $\\abs{\\ }$'] },
        { title: 'Căn bậc hai', items: ['$\\s{a}\\ge0$', '$\\s{a^{2}}=\\abs{a}$', 'Làm tròn, ước lượng'] },
      ],
    },
    practiceSkills: [
      { title: 'Kỹ năng tính hợp lí số hữu tỉ', detail: ['Nhóm các số có tổng tròn.', 'Đặt nhân tử chung.', 'Rút gọn trước khi nhân, không nhân bung ra rồi mới rút.'] },
      { title: 'Kỹ năng chặn để tìm cực trị', detail: ['Viết biểu thức về dạng $A^{2}+m$ hoặc $\\abs{A}+m$.', 'Chỉ ra $A^{2}\\ge0$ nên biểu thức $\\ge m$.', 'Tìm điều kiện dấu bằng và kết luận.'] },
    ],
    types: [
      {
        id: 'g7-t1-d1', name: 'Dạng 1. Thực hiện phép tính, tính hợp lí', level: 'TH',
        method: ['Quan sát tìm nhân tử chung / mẫu chung nhỏ.', 'Nhóm hạng tử.', 'Rút gọn triệt để.'],
        worked: [{
          prompt: 'Tính hợp lí: $A=\\f{5}{7}\\cdot\\f{3}{11}+\\f{5}{7}\\cdot\\f{8}{11}-\\f{5}{7}$.',
          thinking: ['Cả ba hạng tử đều chứa $\\f{5}{7}$.'],
          solution: [
            '$A=\\f{5}{7}\\left(\\f{3}{11}+\\f{8}{11}-1\\right)$',
            '$A=\\f{5}{7}(1-1)=\\f{5}{7}\\cdot0=0$.',
          ],
        }],
      },
      {
        id: 'g7-t1-d2', name: 'Dạng 2. Lũy thừa — rút gọn và so sánh', level: 'TH',
        method: ['Đưa về cùng cơ số nguyên tố.', 'Áp dụng công thức lũy thừa.', 'So sánh khi đã đồng dạng.'],
        pitfalls: ['Nhầm $(x^{m})^{n}$ với $x^{m}\\cdot x^{n}$.'],
        worked: [{
          prompt: 'Rút gọn $B=\\f{4^{5}\\cdot9^{4}}{2^{10}\\cdot3^{8}}$.',
          thinking: ['Đưa 4 và 9 về cơ số nguyên tố: $4=2^{2}$, $9=3^{2}$.'],
          solution: [
            '$4^{5}=(2^{2})^{5}=2^{10}$; $9^{4}=(3^{2})^{4}=3^{8}$.',
            '$B=\\f{2^{10}\\cdot3^{8}}{2^{10}\\cdot3^{8}}=1$.',
          ],
        }],
      },
      {
        id: 'g7-t1-d3', name: 'Dạng 3. Tìm x có chứa giá trị tuyệt đối', level: 'VD',
        method: ['Cô lập $\\abs{A}$ về một vế.', 'Kiểm tra vế phải: nếu âm thì vô nghiệm.', 'Chia hai trường hợp $A=a$ và $A=-a$.'],
        pitfalls: ['Quên nhánh âm.', 'Không kiểm tra điều kiện vế phải không âm.'],
        worked: [{
          prompt: 'Tìm $x$, biết $3\\abs{2x-1}-5=7$.',
          thinking: ['Cô lập dấu giá trị tuyệt đối trước, sau đó tách hai nhánh.'],
          solution: [
            '$3\\abs{2x-1}=12\\Rightarrow\\abs{2x-1}=4$.',
            'TH1: $2x-1=4\\Rightarrow x=\\f{5}{2}$.',
            'TH2: $2x-1=-4\\Rightarrow x=-\\f{3}{2}$.',
            'Vậy $x\\in\\left\\{\\f{5}{2};-\\f{3}{2}\\right\\}$.',
          ],
        }],
      },
      {
        id: 'g7-t1-d4', name: 'Dạng 4. Vận dụng cao — giá trị lớn nhất, nhỏ nhất', level: 'VDC',
        method: ['Đưa về dạng chứa $A^{2}$ hoặc $\\abs{A}$.', 'Chặn: $A^{2}\\ge0$, $\\abs{A}\\ge0$.', 'Tìm dấu bằng, kết luận.'],
        worked: [{
          prompt: 'Tìm giá trị nhỏ nhất của $P=\\abs{x-3}+\\abs{x+2}$.',
          thinking: [
            'Dùng bất đẳng thức $\\abs{a}+\\abs{b}\\ge\\abs{a+b}$ với cách ghép khéo: viết $\\abs{x+2}=\\abs{-(x+2)}$… hoặc dùng ý nghĩa khoảng cách trên trục số.',
            'Ý nghĩa hình học: $P$ là tổng khoảng cách từ $x$ tới hai điểm $3$ và $-2$; nhỏ nhất khi $x$ nằm giữa.',
          ],
          solution: [
            '$P=\\abs{x-3}+\\abs{x+2}=\\abs{3-x}+\\abs{x+2}\\ge\\abs{(3-x)+(x+2)}=5$.',
            'Dấu “=” xảy ra khi $(3-x)$ và $(x+2)$ cùng dấu (hoặc bằng 0), tức $-2\\le x\\le3$.',
            'Vậy $P_{\\min}=5$ khi $-2\\le x\\le3$.',
          ],
          remark: 'Nhớ bất đẳng thức $\\abs{a}+\\abs{b}\\ge\\abs{a+b}$ và điều kiện dấu bằng “cùng dấu” — chìa khoá của mọi bài cực trị chứa dấu giá trị tuyệt đối.',
        }],
      },
    ],
    bank: ['g7.so-huu-ti', 'g7.luy-thua', 'g7.gttd', 'g7.can-bac-hai'],
  },

  {
    id: 'g7-t2', grade: 7, term: 'HK2', strand: 'SO_DAI_SO', order: 2,
    name: 'Tỉ lệ thức — Dãy tỉ số bằng nhau — Đại lượng tỉ lệ',
    summary: 'Tỉ lệ thức, tính chất dãy tỉ số bằng nhau, đại lượng tỉ lệ thuận và tỉ lệ nghịch, bài toán chia tỉ lệ.',
    outcomes: [
      'Nhận biết tỉ lệ thức, vận dụng tính chất của tỉ lệ thức.',
      'Vận dụng tính chất dãy tỉ số bằng nhau để giải bài toán chia phần.',
      'Nhận biết và giải bài toán về đại lượng tỉ lệ thuận, tỉ lệ nghịch.',
    ],
    theory: [
      {
        heading: '1. Tỉ lệ thức và tính chất',
        body: [],
        formulas: [
          '$\\f{a}{b}=\\f{c}{d}\\Leftrightarrow ad=bc$ (tích chéo)',
          'Từ $ad=bc$ suy ra được 4 tỉ lệ thức: $\\f{a}{b}=\\f{c}{d}$; $\\f{a}{c}=\\f{b}{d}$; $\\f{d}{b}=\\f{c}{a}$; $\\f{d}{c}=\\f{b}{a}$',
        ],
      },
      {
        heading: '2. Tính chất dãy tỉ số bằng nhau',
        body: ['Đây là công cụ mạnh nhất của chuyên đề, dùng để giải mọi bài toán chia phần.'],
        formulas: [
          '$\\f{a}{b}=\\f{c}{d}=\\f{a+c}{b+d}=\\f{a-c}{b-d}$ (với $b+d\\ne0$, $b-d\\ne0$)',
          '$\\f{a}{b}=\\f{c}{d}=\\f{e}{f}=\\f{a+c+e}{b+d+f}$',
          'Có hệ số: $\\f{a}{b}=\\f{c}{d}=\\f{ma+nc}{mb+nd}$',
        ],
        caution: ['Khi đề cho **tích** $ab=k$ thay vì tổng, phải đặt $\\f{a}{2}=\\f{b}{3}=t$ rồi thay vào, không dùng trực tiếp tính chất cộng.'],
      },
      {
        heading: '3. Đại lượng tỉ lệ thuận — tỉ lệ nghịch',
        body: [],
        formulas: [
          'Tỉ lệ thuận: $y=kx$ ($k\\ne0$) ; $\\f{y_1}{x_1}=\\f{y_2}{x_2}=k$',
          'Tỉ lệ nghịch: $y=\\f{a}{x}$ ($a\\ne0$) ; $x_1y_1=x_2y_2=a$',
          'Chia tỉ lệ thuận với $m;n;p$: $\\f{x}{m}=\\f{y}{n}=\\f{z}{p}$',
          'Chia tỉ lệ nghịch với $m;n;p$: $mx=ny=pz$, tức $\\f{x}{\\f{1}{m}}=\\f{y}{\\f{1}{n}}=\\f{z}{\\f{1}{p}}$',
        ],
        caution: ['Chia tỉ lệ **nghịch** với $m;n;p$ nghĩa là chia tỉ lệ **thuận** với $\\f{1}{m};\\f{1}{n};\\f{1}{p}$.'],
      },
    ],
    decode: [
      { signal: 'Đề cho “tỉ lệ với 2; 3; 5” và tổng', action: 'Đặt $\\f{x}{2}=\\f{y}{3}=\\f{z}{5}$ rồi dùng tính chất dãy tỉ số bằng nhau.', why: 'Đây là mô hình chuẩn của bài toán chia phần.' },
      { signal: 'Đề cho tích $xy$ hoặc $x\\cdot y\\cdot z$', action: 'Đặt tỉ số chung bằng $t$, biểu diễn từng ẩn theo $t$ rồi thay vào tích.', why: 'Tính chất dãy tỉ số bằng nhau chỉ áp dụng cho tổng/hiệu, không cho tích.' },
      { signal: '“Càng nhiều người, càng ít thời gian”', action: 'Hai đại lượng tỉ lệ nghịch: dùng $x_1y_1=x_2y_2$.', why: 'Tổng khối lượng công việc là hằng số.' },
      { signal: '“Cùng vận tốc, quãng đường tỉ lệ với thời gian”', action: 'Tỉ lệ thuận: $\\f{s_1}{t_1}=\\f{s_2}{t_2}$.', why: 'Hệ số tỉ lệ chính là vận tốc.' },
      { signal: 'Đề cho hiệu hai đại lượng', action: 'Dùng $\\f{a-c}{b-d}$ thay cho $\\f{a+c}{b+d}$.', why: 'Tính chất dãy tỉ số bằng nhau đúng cho cả hiệu.' },
    ],
    mindmap: {
      root: 'TỈ LỆ THỨC — ĐẠI LƯỢNG TỈ LỆ',
      branches: [
        { title: 'Tỉ lệ thức', items: ['$\\f{a}{b}=\\f{c}{d}$', 'Tích chéo $ad=bc$', 'Bốn tỉ lệ thức từ một đẳng thức'] },
        { title: 'Dãy tỉ số bằng nhau', items: ['Cộng tử, cộng mẫu', 'Trừ tử, trừ mẫu', 'Nhân hệ số $\\f{ma+nc}{mb+nd}$'] },
        { title: 'Tỉ lệ thuận', items: ['$y=kx$', 'Chia tỉ lệ thuận', 'Bài toán năng suất'] },
        { title: 'Tỉ lệ nghịch', items: ['$y=\\f{a}{x}$', '$x_1y_1=x_2y_2$', 'Bài toán người – việc – thời gian'] },
        { title: 'Ứng dụng', items: ['Chia lợi nhuận', 'Chia phần thưởng', 'Bài toán chuyển động'] },
      ],
    },
    practiceSkills: [
      { title: 'Kỹ năng đặt ẩn và dựng dãy tỉ số', detail: ['Gọi ẩn kèm đơn vị và điều kiện.', 'Dịch “tỉ lệ với” thành dãy tỉ số.', 'Dịch dữ kiện còn lại thành tổng/hiệu.', 'Áp tính chất, tính từng ẩn, đối chiếu điều kiện.'] },
      { title: 'Kỹ năng phân biệt thuận – nghịch', detail: ['Hỏi: đại lượng này tăng thì đại lượng kia tăng hay giảm?', 'Tăng cùng chiều → thuận; ngược chiều → nghịch.', 'Kiểm tra bằng cách thử một cặp giá trị.'] },
    ],
    types: [
      {
        id: 'g7-t2-d1', name: 'Dạng 1. Tìm x, y từ tỉ lệ thức', level: 'TH',
        method: ['Dùng tích chéo hoặc dãy tỉ số bằng nhau.', 'Thay ngược để kiểm tra.'],
        worked: [{
          prompt: 'Tìm $x,y$ biết $\\f{x}{3}=\\f{y}{5}$ và $x+y=32$.',
          thinking: ['Có tổng → dùng ngay tính chất dãy tỉ số bằng nhau.'],
          solution: [
            '$\\f{x}{3}=\\f{y}{5}=\\f{x+y}{3+5}=\\f{32}{8}=4$.',
            '$x=3\\cdot4=12$; $y=5\\cdot4=20$.',
          ],
        }],
      },
      {
        id: 'g7-t2-d2', name: 'Dạng 2. Bài toán chia tỉ lệ thực tế', level: 'VD',
        method: ['Gọi ẩn kèm đơn vị, điều kiện.', 'Lập dãy tỉ số theo dữ kiện “tỉ lệ với”.', 'Dùng tổng/hiệu để tìm giá trị chung.', 'Kết luận đầy đủ.'],
        worked: [{
          prompt: 'Ba lớp 7A, 7B, 7C trồng cây, số cây tỉ lệ với 4; 5; 6. Biết lớp 7C trồng nhiều hơn lớp 7A là 18 cây. Tính số cây mỗi lớp trồng.',
          thinking: ['Có hiệu (7C hơn 7A) → dùng tính chất dãy tỉ số bằng nhau với phép trừ.'],
          solution: [
            'Gọi số cây ba lớp lần lượt là $a,b,c$ ($a,b,c\\in\\Nstar$).',
            'Theo đề: $\\f{a}{4}=\\f{b}{5}=\\f{c}{6}$ và $c-a=18$.',
            '$\\f{a}{4}=\\f{b}{5}=\\f{c}{6}=\\f{c-a}{6-4}=\\f{18}{2}=9$.',
            '$a=36$; $b=45$; $c=54$.',
            'Vậy ba lớp trồng lần lượt 36, 45 và 54 cây.',
          ],
        }],
      },
      {
        id: 'g7-t2-d3', name: 'Dạng 3. Bài toán tỉ lệ nghịch', level: 'VD',
        method: ['Xác định tích không đổi.', 'Lập phương trình $x_1y_1=x_2y_2$.', 'Với chia tỉ lệ nghịch: chuyển thành chia tỉ lệ thuận với nghịch đảo.'],
        worked: [{
          prompt: 'Ba đội máy cày cùng cày xong ba cánh đồng có diện tích bằng nhau. Đội một hoàn thành trong 4 ngày, đội hai trong 6 ngày, đội ba trong 8 ngày. Biết đội một có nhiều hơn đội hai 2 máy và năng suất mỗi máy như nhau. Tính số máy mỗi đội.',
          thinking: [
            'Cùng khối lượng công việc → số máy và số ngày tỉ lệ **nghịch**.',
            'Vậy số máy tỉ lệ thuận với $\\f{1}{4};\\f{1}{6};\\f{1}{8}$.',
          ],
          solution: [
            'Gọi số máy ba đội là $x,y,z$ ($x,y,z\\in\\Nstar$).',
            'Vì cùng diện tích, số máy tỉ lệ nghịch với số ngày: $4x=6y=8z$.',
            'Suy ra $\\f{x}{\\f{1}{4}}=\\f{y}{\\f{1}{6}}=\\f{z}{\\f{1}{8}}$ và $x-y=2$.',
            '$\\f{x}{\\f{1}{4}}=\\f{y}{\\f{1}{6}}=\\f{x-y}{\\f{1}{4}-\\f{1}{6}}=\\f{2}{\\f{1}{12}}=24$.',
            '$x=24\\cdot\\f{1}{4}=6$; $y=24\\cdot\\f{1}{6}=4$; $z=24\\cdot\\f{1}{8}=3$.',
            'Vậy ba đội có lần lượt 6, 4 và 3 máy.',
          ],
          remark: 'Quy tắc vàng: “tỉ lệ nghịch với $m;n;p$” = “tỉ lệ thuận với $\\f{1}{m};\\f{1}{n};\\f{1}{p}$”.',
        }],
      },
      {
        id: 'g7-t2-d4', name: 'Dạng 4. Vận dụng cao — dãy tỉ số kèm tích', level: 'VDC',
        method: ['Đặt tỉ số chung bằng $t$.', 'Biểu diễn các ẩn theo $t$.', 'Thay vào điều kiện tích, giải phương trình theo $t$.', 'Xét đủ hai giá trị $t$ khi bậc chẵn.'],
        worked: [{
          prompt: 'Tìm $x,y$ biết $\\f{x}{2}=\\f{y}{5}$ và $xy=90$.',
          thinking: ['Điều kiện là **tích**, không dùng được tính chất cộng → đặt tham số $t$.'],
          solution: [
            'Đặt $\\f{x}{2}=\\f{y}{5}=t\\Rightarrow x=2t$, $y=5t$.',
            '$xy=2t\\cdot5t=10t^{2}=90\\Rightarrow t^{2}=9\\Rightarrow t=\\pm3$.',
            'Với $t=3$: $x=6$, $y=15$. Với $t=-3$: $x=-6$, $y=-15$.',
            'Vậy $(x;y)\\in\\{(6;15);(-6;-15)\\}$.',
          ],
          remark: 'Rất nhiều bạn quên nghiệm âm — mất một nửa số điểm ở câu này.',
        }],
      },
    ],
    bank: ['g7.ti-le-thuc', 'g7.day-ti-so', 'g7.ti-le-thuan', 'g7.ti-le-nghich'],
  },

  {
    id: 'g7-t3', grade: 7, term: 'HK2', strand: 'SO_DAI_SO', order: 3,
    name: 'Biểu thức đại số và Đa thức một biến',
    summary: 'Biểu thức đại số, đơn thức, đa thức một biến, cộng trừ nhân chia đa thức, nghiệm của đa thức.',
    outcomes: [
      'Tính giá trị biểu thức đại số tại giá trị cho trước của biến.',
      'Thu gọn, sắp xếp, xác định bậc, hệ số của đa thức một biến.',
      'Cộng, trừ, nhân, chia đa thức một biến.',
      'Xác định nghiệm của đa thức một biến.',
    ],
    theory: [
      {
        heading: '1. Đa thức một biến',
        body: ['Đa thức một biến là tổng của những đơn thức cùng một biến.'],
        formulas: [
          'Dạng thu gọn: $P(x)=a_nx^{n}+a_{n-1}x^{n-1}+\\dots+a_1x+a_0$ với $a_n\\ne0$',
          'Bậc của $P(x)$ là $n$ ; $a_n$ là hệ số cao nhất ; $a_0$ là hệ số tự do',
        ],
        caution: ['Phải **thu gọn** trước khi xác định bậc.', 'Đa thức 0 không có bậc.'],
      },
      {
        heading: '2. Phép tính với đa thức một biến',
        body: [],
        formulas: [
          'Cộng/trừ: cộng trừ các hệ số của những hạng tử **đồng dạng**.',
          'Nhân: nhân từng hạng tử rồi thu gọn; $ax^{m}\\cdot bx^{n}=abx^{m+n}$',
          'Chia hết: $A(x)=B(x)\\cdot Q(x)$',
          'Chia có dư: $A(x)=B(x)\\cdot Q(x)+R(x)$ với bậc $R<$ bậc $B$',
        ],
      },
      {
        heading: '3. Nghiệm của đa thức',
        body: [],
        formulas: [
          '$x=a$ là nghiệm của $P(x)$ $\\Leftrightarrow P(a)=0$',
          'Đa thức bậc $n$ có **không quá** $n$ nghiệm.',
          'Nếu $P(x)$ chia hết cho $(x-a)$ thì $x=a$ là nghiệm của $P(x)$ (và ngược lại).',
        ],
      },
    ],
    decode: [
      { signal: 'Đề hỏi “tìm nghiệm của đa thức”', action: 'Cho $P(x)=0$ rồi giải; nếu bậc cao thì phân tích thành nhân tử.', why: 'Nghiệm là giá trị làm đa thức triệt tiêu.' },
      { signal: 'Đề hỏi “tìm $m$ để $x=2$ là nghiệm”', action: 'Thay $x=2$ vào, cho biểu thức bằng 0, giải theo $m$.', why: 'Điều kiện nghiệm biến bài toán về phương trình bậc nhất theo tham số.' },
      { signal: 'Đề yêu cầu “tính $P(x)+Q(x)$”', action: 'Sắp xếp cùng thứ tự giảm dần của bậc rồi cộng theo cột.', why: 'Cộng theo cột hạn chế sót hạng tử.' },
      { signal: 'Đề nói “$A(x)$ chia hết cho $x-a$”', action: 'Dùng $A(a)=0$ thay vì thực hiện phép chia.', why: 'Định lí Bézout rút ngắn bài toán rất nhiều.' },
    ],
    mindmap: {
      root: 'BIỂU THỨC ĐẠI SỐ — ĐA THỨC MỘT BIẾN',
      branches: [
        { title: 'Biểu thức', items: ['Giá trị của biểu thức', 'Đơn thức, hệ số, bậc', 'Đơn thức đồng dạng'] },
        { title: 'Đa thức', items: ['Thu gọn', 'Sắp xếp', 'Bậc, hệ số cao nhất, hệ số tự do'] },
        { title: 'Phép tính', items: ['Cộng, trừ theo cột', 'Nhân', 'Chia hết, chia có dư'] },
        { title: 'Nghiệm', items: ['$P(a)=0$', 'Số nghiệm tối đa', 'Tìm tham số $m$'] },
      ],
    },
    types: [
      {
        id: 'g7-t3-d1', name: 'Dạng 1. Thu gọn, sắp xếp, xác định bậc', level: 'NB',
        method: ['Cộng các hạng tử đồng dạng.', 'Sắp xếp theo lũy thừa giảm dần.', 'Đọc bậc, hệ số.'],
        worked: [{
          prompt: 'Thu gọn và sắp xếp $P(x)=3x^{2}-5x+7x^{2}+2-4x^{3}+x$.',
          thinking: ['Gom các hạng tử cùng bậc.'],
          solution: [
            '$P(x)=-4x^{3}+(3x^{2}+7x^{2})+(-5x+x)+2$',
            '$P(x)=-4x^{3}+10x^{2}-4x+2$.',
            'Bậc 3; hệ số cao nhất $-4$; hệ số tự do $2$.',
          ],
        }],
      },
      {
        id: 'g7-t3-d2', name: 'Dạng 2. Cộng, trừ, nhân đa thức', level: 'TH',
        method: ['Sắp xếp cùng thứ tự.', 'Đặt phép tính theo cột.', 'Thu gọn kết quả.'],
        worked: [{
          prompt: 'Cho $P(x)=2x^{3}-x+5$, $Q(x)=x^{3}+3x^{2}-4$. Tính $P(x)-Q(x)$.',
          thinking: ['Trừ tức là đổi dấu toàn bộ $Q(x)$ rồi cộng.'],
          solution: [
            '$P(x)-Q(x)=(2x^{3}-x+5)-(x^{3}+3x^{2}-4)$',
            '$=2x^{3}-x+5-x^{3}-3x^{2}+4$',
            '$=x^{3}-3x^{2}-x+9$.',
          ],
        }],
      },
      {
        id: 'g7-t3-d3', name: 'Dạng 3. Nghiệm của đa thức, tìm tham số', level: 'VD',
        method: ['Cho $P(x)=0$.', 'Phân tích thành nhân tử nếu bậc $\\ge2$.', 'Với tham số: thay nghiệm đã cho vào rồi giải.'],
        worked: [{
          prompt: 'Tìm $m$ để đa thức $P(x)=x^{2}-(m+1)x+6$ nhận $x=2$ làm nghiệm.',
          thinking: ['$x=2$ là nghiệm nghĩa là $P(2)=0$.'],
          solution: [
            '$P(2)=4-2(m+1)+6=0$',
            '$4-2m-2+6=0\\Rightarrow 8-2m=0\\Rightarrow m=4$.',
            'Vậy $m=4$.',
          ],
        }],
      },
      {
        id: 'g7-t3-d4', name: 'Dạng 4. Vận dụng cao — xác định đa thức, chia có dư', level: 'VDC',
        method: ['Dùng $A(a)=0$ với điều kiện chia hết.', 'Với chia dư $r$: $A(a)=r$.', 'Lập hệ theo các tham số.'],
        worked: [{
          prompt: 'Tìm $a,b$ để đa thức $P(x)=x^{3}+ax^{2}+bx-6$ chia hết cho cả $(x-1)$ và $(x-2)$.',
          thinking: ['Chia hết cho $(x-1)$ và $(x-2)$ nghĩa là $P(1)=0$ và $P(2)=0$ → hệ hai phương trình.'],
          solution: [
            '$P(1)=1+a+b-6=0\\Rightarrow a+b=5$. (1)',
            '$P(2)=8+4a+2b-6=0\\Rightarrow 4a+2b=-2\\Rightarrow 2a+b=-1$. (2)',
            'Lấy (2) trừ (1): $a=-6$; thay lại (1): $b=11$.',
            'Vậy $a=-6$, $b=11$.',
          ],
        }],
      },
    ],
    bank: ['g7.da-thuc-thugon', 'g7.da-thuc-tinh', 'g7.nghiem-da-thuc'],
  },

  {
    id: 'g7-t4', grade: 7, term: 'HK1', strand: 'HINH_HOC', order: 4,
    name: 'Góc và Đường thẳng song song',
    summary: 'Hai góc kề bù, hai góc đối đỉnh, tia phân giác, hai đường thẳng song song, tiên đề Euclid, định lí.',
    outcomes: [
      'Nhận biết hai góc kề bù, hai góc đối đỉnh và tính chất của chúng.',
      'Nhận biết dấu hiệu hai đường thẳng song song và tính chất của hai đường thẳng song song.',
      'Vận dụng tiên đề Euclid; hiểu cấu trúc giả thiết – kết luận của một định lí.',
    ],
    theory: [
      {
        heading: '1. Các cặp góc cơ bản',
        body: [],
        formulas: [
          'Hai góc kề bù: có tổng bằng $180\\deg$',
          'Hai góc đối đỉnh thì **bằng nhau**',
          'Tia phân giác chia góc thành hai góc bằng nhau, mỗi góc bằng nửa góc đã cho',
        ],
      },
      {
        heading: '2. Dấu hiệu và tính chất hai đường thẳng song song',
        body: ['Với hai đường thẳng bị cắt bởi một cát tuyến:'],
        formulas: [
          '**Dấu hiệu** (chứng minh song song): có một cặp góc so le trong bằng nhau, hoặc một cặp góc đồng vị bằng nhau, hoặc một cặp góc trong cùng phía bù nhau.',
          '**Tính chất** (đã có song song, suy ra góc): hai góc so le trong bằng nhau; hai góc đồng vị bằng nhau; hai góc trong cùng phía bù nhau.',
          'Tiên đề Euclid: qua một điểm ở ngoài một đường thẳng, có **duy nhất** một đường thẳng song song với đường thẳng đó.',
          'Nếu $a\\perp c$ và $b\\perp c$ thì $a\\para b$.',
          'Nếu $a\\para b$ và $c\\perp a$ thì $c\\perp b$.',
        ],
        caution: ['Phân biệt rõ chiều dùng: từ **góc bằng nhau** suy ra **song song** (dấu hiệu) hay từ **song song** suy ra **góc bằng nhau** (tính chất).'],
      },
    ],
    decode: [
      { signal: 'Đề cho hai đường thẳng song song và một cát tuyến', action: 'Truy ngay ba cặp góc: so le trong, đồng vị, trong cùng phía.', why: 'Song song là “máy phát” sinh ra quan hệ giữa các góc.' },
      { signal: 'Đề yêu cầu chứng minh hai đường thẳng song song', action: 'Đi tìm một cặp góc so le trong (hoặc đồng vị) bằng nhau.', why: 'Đó là dấu hiệu nhận biết duy nhất ở lớp 7.' },
      { signal: 'Hình có đường thẳng cắt hai đường không cùng vị trí', action: 'Kẻ thêm đường song song đi qua điểm gãy.', why: 'Đường phụ tạo ra cặp góc so le trong để tách góc lớn thành hai góc dễ tính.' },
      { signal: 'Đề nhắc “cùng vuông góc với một đường thẳng”', action: 'Kết luận hai đường đó song song.', why: 'Quan hệ vuông góc – song song.' },
    ],
    mindmap: {
      root: 'GÓC — ĐƯỜNG THẲNG SONG SONG',
      branches: [
        { title: 'Cặp góc', items: ['Kề bù $=180\\deg$', 'Đối đỉnh bằng nhau', 'Tia phân giác'] },
        { title: 'Song song', items: ['Dấu hiệu: so le trong, đồng vị', 'Trong cùng phía bù nhau', 'Tiên đề Euclid'] },
        { title: 'Vuông góc', items: ['$a\\perp c$, $b\\perp c$ ⟹ $a\\para b$', '$a\\para b$, $c\\perp a$ ⟹ $c\\perp b$', 'Đường trung trực'] },
        { title: 'Định lí', items: ['Giả thiết – Kết luận', 'Cách viết GT/KL', 'Chứng minh định lí'] },
      ],
    },
    types: [
      {
        id: 'g7-t4-d1', name: 'Dạng 1. Tính số đo góc tạo bởi hai đường song song', level: 'TH',
        method: ['Xác định cặp góc thuộc loại nào.', 'Áp dụng tính chất tương ứng.', 'Trình bày có căn cứ.'],
        worked: [{
          prompt: 'Cho $a\\para b$, đường thẳng $c$ cắt $a$ tại $A$, cắt $b$ tại $B$. Biết $\\angle A_1=65\\deg$. Tính góc $\\angle B_1$ so le trong với $\\angle A_1$ và góc $\\angle B_2$ trong cùng phía với $\\angle A_1$.',
          thinking: ['Có sẵn song song → dùng tính chất.'],
          solution: [
            'Vì $a\\para b$ nên $\\angle B_1=\\angle A_1=65\\deg$ (hai góc so le trong).',
            'Cũng vì $a\\para b$ nên $\\angle A_1+\\angle B_2=180\\deg$ (hai góc trong cùng phía).',
            '$\\angle B_2=180\\deg-65\\deg=115\\deg$.',
          ],
        }],
      },
      {
        id: 'g7-t4-d2', name: 'Dạng 2. Chứng minh hai đường thẳng song song', level: 'VD',
        method: ['Tính hoặc chỉ ra một cặp góc so le trong / đồng vị bằng nhau.', 'Kết luận theo dấu hiệu nhận biết.'],
        worked: [{
          prompt: 'Cho hình có $\\angle xAB=70\\deg$ và $\\angle ABy=70\\deg$, hai góc này ở vị trí so le trong đối với hai tia $Ax$, $By$ và cát tuyến $AB$. Chứng minh $Ax\\para By$.',
          thinking: ['Có sẵn cặp góc so le trong bằng nhau → dùng dấu hiệu.'],
          solution: [
            '$\\angle xAB$ và $\\angle ABy$ là hai góc so le trong tạo bởi $Ax$, $By$ và cát tuyến $AB$.',
            'Mà $\\angle xAB=\\angle ABy=70\\deg$.',
            'Vậy $Ax\\para By$ (dấu hiệu nhận biết hai đường thẳng song song).',
          ],
        }],
      },
      {
        id: 'g7-t4-d3', name: 'Dạng 3. Vận dụng — kẻ đường phụ song song', level: 'VDC',
        method: ['Qua điểm “gãy”, kẻ đường thẳng song song với hai đường đã cho.', 'Tách góc lớn thành hai góc so le trong.', 'Cộng lại để tìm kết quả.'],
        worked: [{
          prompt: 'Cho $Ax\\para By$, điểm $C$ nằm giữa hai đường sao cho $\\angle xAC=40\\deg$, $\\angle yBC=35\\deg$. Tính $\\angle ACB$.',
          thinking: [
            'Góc $\\angle ACB$ nằm giữa hai đường song song, không so sánh trực tiếp được.',
            'Kẻ $Cz\\para Ax$ (do đó cũng $\\para By$) để tách $\\angle ACB$ thành hai góc.',
          ],
          solution: [
            'Qua $C$ kẻ tia $Cz\\para Ax$. Vì $Ax\\para By$ nên $Cz\\para By$.',
            'Do $Cz\\para Ax$: $\\angle ACz=\\angle xAC=40\\deg$ (so le trong).',
            'Do $Cz\\para By$: $\\angle zCB=\\angle yBC=35\\deg$ (so le trong).',
            'Vì tia $Cz$ nằm giữa hai tia $CA$, $CB$ nên $\\angle ACB=\\angle ACz+\\angle zCB=40\\deg+35\\deg=75\\deg$.',
          ],
          remark: 'Kẻ đường phụ song song là kỹ thuật “mở khoá” số 1 cho mọi bài góc giữa hai đường song song.',
        }],
      },
    ],
    bank: ['g7.goc-song-song', 'g7.cm-song-song'],
  },

  {
    id: 'g7-t5', grade: 7, term: 'HK2', strand: 'HINH_HOC', order: 5,
    name: 'Tam giác — Các trường hợp bằng nhau và quan hệ trong tam giác',
    summary: 'Tổng ba góc, các trường hợp bằng nhau của tam giác (thường và vuông), tam giác cân, đường trung trực, bất đẳng thức tam giác, các đường đồng quy.',
    outcomes: [
      'Vận dụng định lí tổng ba góc, góc ngoài của tam giác.',
      'Chứng minh hai tam giác bằng nhau theo các trường hợp c.c.c, c.g.c, g.c.g và các trường hợp của tam giác vuông.',
      'Vận dụng tính chất tam giác cân, tam giác đều, đường trung trực.',
      'Vận dụng quan hệ giữa góc và cạnh đối diện, bất đẳng thức tam giác, các đường đồng quy.',
    ],
    theory: [
      {
        heading: '1. Tổng ba góc và góc ngoài',
        body: [],
        formulas: [
          'Tổng ba góc trong một tam giác bằng $180\\deg$',
          'Góc ngoài của tam giác bằng **tổng hai góc trong không kề** với nó',
          'Tam giác vuông: hai góc nhọn phụ nhau ($=90\\deg$)',
        ],
      },
      {
        heading: '2. Các trường hợp bằng nhau của hai tam giác',
        body: [],
        formulas: [
          'Tam giác thường: **c.c.c** ; **c.g.c** ; **g.c.g**',
          'Tam giác vuông: hai cạnh góc vuông ; cạnh góc vuông – góc nhọn kề ; cạnh huyền – góc nhọn ; **cạnh huyền – cạnh góc vuông**',
          'Hai tam giác bằng nhau ⟹ các cạnh tương ứng bằng nhau, các góc tương ứng bằng nhau.',
        ],
        caution: ['Trong c.g.c, góc phải là góc **xen giữa** hai cạnh; “c.c.g” với góc không xen giữa là **sai**.'],
      },
      {
        heading: '3. Tam giác cân, tam giác đều, đường trung trực',
        body: [],
        formulas: [
          'Tam giác cân: hai cạnh bên bằng nhau $\\Leftrightarrow$ hai góc ở đáy bằng nhau',
          'Trong tam giác cân, đường trung tuyến ứng với cạnh đáy đồng thời là đường cao, đường phân giác, đường trung trực',
          'Tam giác đều: ba cạnh bằng nhau $\\Leftrightarrow$ ba góc bằng $60\\deg$',
          'Điểm thuộc đường trung trực của đoạn thẳng thì cách đều hai đầu mút của đoạn thẳng đó (và ngược lại)',
        ],
      },
      {
        heading: '4. Quan hệ trong tam giác và các đường đồng quy',
        body: [],
        formulas: [
          'Góc lớn hơn đối diện với cạnh lớn hơn (và ngược lại)',
          'Bất đẳng thức tam giác: $\\abs{b-c}<a<b+c$',
          'Ba đường trung tuyến đồng quy tại **trọng tâm** $G$, với $AG=\\f{2}{3}AM$',
          'Ba đường phân giác đồng quy tại tâm đường tròn **nội tiếp**',
          'Ba đường trung trực đồng quy tại tâm đường tròn **ngoại tiếp**',
          'Ba đường cao đồng quy tại **trực tâm**',
        ],
      },
    ],
    decode: [
      { signal: 'Đề cho hai đoạn thẳng bằng nhau và một góc chung', action: 'Nghĩ ngay tới trường hợp c.g.c.', why: 'Góc chung/góc đối đỉnh thường là “góc xen giữa” mà đề cài sẵn.' },
      { signal: 'Đề cho trung điểm', action: 'Sinh ra hai đoạn bằng nhau — vật liệu cho c.g.c hoặc tính chất trung tuyến.', why: 'Trung điểm là nguồn dữ kiện bằng nhau miễn phí.' },
      { signal: 'Đề cho tia phân giác', action: 'Sinh ra hai góc bằng nhau, hoặc dùng tính chất điểm cách đều hai cạnh.', why: 'Phân giác vừa cho góc bằng nhau, vừa cho khoảng cách bằng nhau.' },
      { signal: 'Yêu cầu chứng minh hai đoạn thẳng bằng nhau', action: 'Ghép chúng vào hai tam giác rồi chứng minh hai tam giác bằng nhau.', why: 'Đây là con đường chuẩn: bằng nhau của tam giác kéo theo bằng nhau của cạnh.' },
      { signal: 'Đề cho ba độ dài và hỏi “có là tam giác không”', action: 'Kiểm tra bất đẳng thức tam giác với cạnh lớn nhất.', why: 'Chỉ cần kiểm tra tổng hai cạnh nhỏ so với cạnh lớn nhất.' },
      { signal: 'Xuất hiện trọng tâm hoặc trung tuyến', action: 'Dùng tỉ số $\\f{2}{3}$ và $\\f{1}{3}$.', why: 'Trọng tâm chia trung tuyến theo tỉ lệ cố định.' },
    ],
    mindmap: {
      root: 'TAM GIÁC',
      branches: [
        { title: 'Góc', items: ['Tổng ba góc $=180\\deg$', 'Góc ngoài', 'Tam giác vuông: hai góc phụ nhau'] },
        { title: 'Bằng nhau', items: ['c.c.c', 'c.g.c', 'g.c.g', 'Tam giác vuông: ch–gn, ch–cgv'] },
        { title: 'Tam giác đặc biệt', items: ['Cân: 2 cạnh bên, 2 góc đáy', 'Đều: $60\\deg$', 'Vuông cân'] },
        { title: 'Quan hệ', items: ['Góc – cạnh đối diện', 'Bất đẳng thức tam giác', 'Đường vuông góc – đường xiên'] },
        { title: 'Đồng quy', items: ['Trung tuyến → trọng tâm', 'Phân giác → tâm nội tiếp', 'Trung trực → tâm ngoại tiếp', 'Đường cao → trực tâm'] },
      ],
    },
    practiceSkills: [
      {
        title: 'Quy trình 4 bước chứng minh hai tam giác bằng nhau',
        detail: [
          'Bước 1: Gọi tên hai tam giác theo đúng thứ tự đỉnh tương ứng.',
          'Bước 2: Liệt kê ba yếu tố, mỗi yếu tố kèm lý do (giả thiết / góc chung / đối đỉnh…).',
          'Bước 3: Kết luận trường hợp bằng nhau (c.c.c, c.g.c, g.c.g).',
          'Bước 4: Suy ra điều phải chứng minh từ các cặp tương ứng.',
        ],
      },
      {
        title: 'Kỹ năng đọc hình',
        detail: [
          'Ghi tất cả dữ kiện lên hình bằng ký hiệu (gạch cạnh bằng nhau, cung góc bằng nhau).',
          'Tô đậm hai tam giác định chứng minh.',
          'Truy ngược từ kết luận: muốn có điều này thì cần hai tam giác nào bằng nhau?',
        ],
      },
    ],
    types: [
      {
        id: 'g7-t5-d1', name: 'Dạng 1. Tính số đo góc trong tam giác', level: 'NB',
        method: ['Áp dụng tổng ba góc bằng $180\\deg$.', 'Dùng góc ngoài khi thuận tiện.'],
        worked: [{
          prompt: 'Tam giác $ABC$ có $\\angle A=70\\deg$, $\\angle B=50\\deg$. Tính $\\angle C$ và góc ngoài tại đỉnh $C$.',
          thinking: ['Tổng ba góc bằng $180\\deg$; góc ngoài kề bù với góc trong.'],
          solution: [
            '$\\angle C=180\\deg-70\\deg-50\\deg=60\\deg$.',
            'Góc ngoài tại $C$ $=180\\deg-60\\deg=120\\deg$ (cũng bằng $\\angle A+\\angle B=70\\deg+50\\deg$).',
          ],
        }],
      },
      {
        id: 'g7-t5-d2', name: 'Dạng 2. Chứng minh hai tam giác bằng nhau', level: 'VD',
        method: ['Vẽ hình, ghi GT–KL.', 'Chọn hai tam giác chứa các yếu tố cần chứng minh.', 'Liệt kê ba yếu tố kèm lý do.', 'Kết luận và suy ra hệ quả.'],
        worked: [{
          prompt: 'Cho tam giác $ABC$ có $AB=AC$. Gọi $M$ là trung điểm của $BC$. Chứng minh $\\tri ABM=\\tri ACM$ và $AM\\perp BC$.',
          thinking: [
            'Có $AB=AC$ (giả thiết), $MB=MC$ (trung điểm), $AM$ chung → đủ ba cạnh → c.c.c.',
            'Từ hai tam giác bằng nhau suy ra hai góc kề bù bằng nhau, mỗi góc bằng $90\\deg$.',
          ],
          solution: [
            'Xét $\\tri ABM$ và $\\tri ACM$ có:',
            '$AB=AC$ (giả thiết); $MB=MC$ ($M$ là trung điểm $BC$); $AM$ là cạnh chung.',
            'Do đó $\\tri ABM=\\tri ACM$ (c.c.c).',
            'Suy ra $\\angle AMB=\\angle AMC$ (hai góc tương ứng).',
            'Mà $\\angle AMB+\\angle AMC=180\\deg$ (hai góc kề bù) nên $\\angle AMB=\\angle AMC=90\\deg$.',
            'Vậy $AM\\perp BC$.',
          ],
        }],
      },
      {
        id: 'g7-t5-d3', name: 'Dạng 3. Bất đẳng thức tam giác', level: 'TH',
        method: ['So sánh tổng hai cạnh nhỏ với cạnh lớn nhất.', 'Với bài tìm cạnh thứ ba: dùng $\\abs{b-c}<a<b+c$.'],
        worked: [{
          prompt: 'Tam giác $ABC$ có $AB=4\\,cm$, $AC=9\\,cm$ và $BC$ là số nguyên. Tìm tất cả giá trị có thể của $BC$.',
          thinking: ['Áp dụng bất đẳng thức tam giác để chặn hai đầu.'],
          solution: [
            '$\\abs{9-4}<BC<9+4$, tức $5<BC<13$.',
            'Vì $BC$ nguyên nên $BC\\in\\{6;7;8;9;10;11;12\\}$.',
          ],
        }],
      },
      {
        id: 'g7-t5-d4', name: 'Dạng 4. Vận dụng cao — tổng hợp tam giác cân, trung trực, đồng quy', level: 'VDC',
        method: ['Khai thác triệt để tam giác cân: 4 đường trùng nhau.', 'Dùng tính chất điểm cách đều để chứng minh thuộc trung trực.', 'Ghép nhiều bước chứng minh bằng nhau liên tiếp.'],
        worked: [{
          prompt: 'Cho tam giác $ABC$ cân tại $A$. Trên tia đối của tia $BC$ lấy $D$, trên tia đối của tia $CB$ lấy $E$ sao cho $BD=CE$. Chứng minh tam giác $ADE$ cân.',
          thinking: [
            'Muốn $\\tri ADE$ cân tại $A$ thì cần $AD=AE$.',
            'Ghép $AD$, $AE$ vào hai tam giác $ABD$ và $ACE$ rồi chứng minh bằng nhau (c.g.c).',
            'Cần góc xen giữa: $\\angle ABD$ và $\\angle ACE$ — là hai góc kề bù với hai góc đáy bằng nhau.',
          ],
          solution: [
            'Vì $\\tri ABC$ cân tại $A$ nên $AB=AC$ và $\\angle ABC=\\angle ACB$.',
            '$\\angle ABD$ kề bù với $\\angle ABC$; $\\angle ACE$ kề bù với $\\angle ACB$.',
            'Do $\\angle ABC=\\angle ACB$ nên $\\angle ABD=\\angle ACE$.',
            'Xét $\\tri ABD$ và $\\tri ACE$ có: $AB=AC$; $\\angle ABD=\\angle ACE$; $BD=CE$ (giả thiết).',
            'Do đó $\\tri ABD=\\tri ACE$ (c.g.c), suy ra $AD=AE$.',
            'Vậy tam giác $ADE$ cân tại $A$.',
          ],
          remark: 'Mẹo: khi đề cho “tia đối”, hầu như luôn phải dùng cặp góc kề bù để chuyển góc đáy ra ngoài.',
        }],
      },
    ],
    bank: ['g7.tam-giac-goc', 'g7.tam-giac-bang-nhau', 'g7.bdt-tam-giac', 'g7.tam-giac-can'],
  },

  {
    id: 'g7-t6', grade: 7, term: 'HK1', strand: 'HINH_HOC', order: 6,
    name: 'Hình học trực quan — Hình hộp, Hình lăng trụ đứng',
    summary: 'Hình hộp chữ nhật, hình lập phương, lăng trụ đứng tam giác và tứ giác: diện tích xung quanh, thể tích.',
    outcomes: [
      'Mô tả các yếu tố: đỉnh, cạnh, mặt, đường chéo.',
      'Tính diện tích xung quanh, diện tích toàn phần, thể tích.',
      'Giải bài toán thực tiễn về đồ vật dạng hình hộp, lăng trụ.',
    ],
    theory: [
      {
        heading: 'Công thức cần thuộc',
        body: [],
        formulas: [
          'Hình hộp chữ nhật $a\\times b\\times c$: $S_{xq}=2(a+b)c$ ; $S_{tp}=2(ab+bc+ca)$ ; $V=abc$',
          'Hình lập phương cạnh $a$: $S_{tp}=6a^{2}$ ; $V=a^{3}$',
          'Lăng trụ đứng: $S_{xq}=C_{\\text{đáy}}\\cdot h$ ; $S_{tp}=S_{xq}+2S_{\\text{đáy}}$ ; $V=S_{\\text{đáy}}\\cdot h$',
        ],
        caution: ['$S_{xq}$ chỉ tính các mặt bên; $S_{tp}$ mới cộng thêm hai đáy.', 'Đổi đơn vị thể tích: $1\\,dm^{3}=1$ lít $=1000\\,cm^{3}$.'],
      },
    ],
    decode: [
      { signal: 'Đề hỏi “sơn/quét xung quanh”', action: 'Dùng $S_{xq}$; nếu có nắp/đáy thì cộng thêm.', why: 'Đọc kỹ có sơn nắp hay không để cộng đúng số mặt.' },
      { signal: 'Đề hỏi “chứa được bao nhiêu lít nước”', action: 'Tính thể tích rồi đổi $1\\,dm^{3}=1$ lít.', why: 'Bẫy đơn vị thường xuyên nhất của chuyên đề này.' },
      { signal: 'Bể nước có mực nước cao $h$', action: 'Thể tích nước $=S_{\\text{đáy}}\\cdot h$, không dùng chiều cao bể.', why: 'Chiều cao dùng để tính là chiều cao cột nước.' },
    ],
    mindmap: {
      root: 'HÌNH KHỐI LỚP 7',
      branches: [
        { title: 'Hình hộp chữ nhật', items: ['8 đỉnh, 12 cạnh, 6 mặt', '$V=abc$', '$S_{xq}=2(a+b)c$'] },
        { title: 'Hình lập phương', items: ['6 mặt vuông', '$V=a^{3}$', '$S_{tp}=6a^{2}$'] },
        { title: 'Lăng trụ đứng', items: ['Hai đáy song song bằng nhau', '$S_{xq}=C\\cdot h$', '$V=S\\cdot h$'] },
        { title: 'Thực tế', items: ['Bể nước', 'Thùng carton', 'Lều trại', 'Đổi đơn vị lít'] },
      ],
    },
    types: [
      {
        id: 'g7-t6-d1', name: 'Dạng 1. Tính diện tích, thể tích', level: 'TH',
        method: ['Xác định loại hình.', 'Ghi công thức, đổi đơn vị.', 'Thay số và ghi rõ đơn vị.'],
        worked: [{
          prompt: 'Một bể cá dạng hình hộp chữ nhật dài $80\\,cm$, rộng $50\\,cm$, cao $60\\,cm$. Người ta đổ nước vào bể đến khi mực nước cao $45\\,cm$. Tính thể tích nước trong bể theo lít.',
          thinking: ['Dùng chiều cao **cột nước** $45\\,cm$, không dùng chiều cao bể.'],
          solution: [
            '$V=80\\cdot50\\cdot45=180\\,000\\ (cm^{3})$.',
            '$180\\,000\\,cm^{3}=180\\,dm^{3}=180$ lít.',
            'Vậy trong bể có 180 lít nước.',
          ],
        }],
      },
      {
        id: 'g7-t6-d2', name: 'Dạng 2. Bài toán thực tế lăng trụ đứng', level: 'VD',
        method: ['Xác định đáy là hình gì, tính $S_{\\text{đáy}}$ và chu vi đáy.', 'Áp dụng $V=S\\cdot h$, $S_{xq}=C\\cdot h$.'],
        worked: [{
          prompt: 'Một chiếc lều có dạng lăng trụ đứng tam giác, đáy là tam giác cân có cạnh đáy $2\\,m$, chiều cao ứng với cạnh đáy $1{,}5\\,m$; chiều dài lều là $4\\,m$. Tính thể tích không khí bên trong lều.',
          thinking: ['Thể tích lăng trụ = diện tích đáy tam giác × chiều dài lều.'],
          solution: [
            '$S_{\\text{đáy}}=\\f{1}{2}\\cdot2\\cdot1{,}5=1{,}5\\ (m^{2})$.',
            '$V=1{,}5\\cdot4=6\\ (m^{3})$.',
          ],
        }],
      },
    ],
    bank: ['g7.hinh-khoi'],
  },

  {
    id: 'g7-t7', grade: 7, term: 'HK1', strand: 'THONG_KE_XS', order: 7,
    name: 'Thống kê và Xác suất',
    summary: 'Thu thập, phân loại, biểu diễn dữ liệu; biểu đồ đoạn thẳng, biểu đồ hình quạt tròn; biến cố và xác suất của biến cố.',
    outcomes: [
      'Thu thập, phân loại và biểu diễn dữ liệu bằng biểu đồ phù hợp.',
      'Đọc, phân tích và nhận xét dữ liệu từ biểu đồ đoạn thẳng, biểu đồ hình quạt tròn.',
      'Nhận biết biến cố chắc chắn, không thể, ngẫu nhiên; tính xác suất của biến cố trong trường hợp đồng khả năng.',
    ],
    theory: [
      {
        heading: '1. Biểu đồ',
        body: [],
        formulas: [
          'Biểu đồ đoạn thẳng: mô tả sự **thay đổi theo thời gian**',
          'Biểu đồ hình quạt tròn: mô tả **tỉ lệ phần trăm** của các thành phần trong tổng thể',
          'Tổng các phần trong biểu đồ quạt tròn luôn bằng $100\\percent$',
        ],
      },
      {
        heading: '2. Biến cố và xác suất',
        body: [],
        formulas: [
          'Biến cố **chắc chắn**: luôn xảy ra, xác suất bằng 1',
          'Biến cố **không thể**: không bao giờ xảy ra, xác suất bằng 0',
          'Biến cố **ngẫu nhiên**: có thể xảy ra hoặc không',
          'Nếu $k$ kết quả đồng khả năng và biến cố $A$ có $m$ kết quả thuận lợi thì $P(A)=\\f{m}{k}$',
        ],
      },
    ],
    decode: [
      { signal: 'Biểu đồ hình quạt tròn cho phần trăm và một số liệu tuyệt đối', action: 'Tính tổng thể trước rồi suy ra các phần còn lại.', why: 'Có một mốc quy đổi là đủ tính toàn bộ.' },
      { signal: 'Đề hỏi “biến cố nào chắc chắn xảy ra”', action: 'Kiểm tra xem có kết quả nào không thoả không.', why: 'Chỉ cần một phản ví dụ là biến cố không còn chắc chắn.' },
      { signal: 'Rút thẻ / gieo xúc xắc, các kết quả như nhau', action: 'Dùng $P=\\f{\\text{số kết quả thuận lợi}}{\\text{tổng số kết quả}}$.', why: 'Đây là mô hình đồng khả năng.' },
    ],
    mindmap: {
      root: 'THỐNG KÊ & XÁC SUẤT LỚP 7',
      branches: [
        { title: 'Dữ liệu', items: ['Thu thập', 'Phân loại', 'Tính đại diện, hợp lí'] },
        { title: 'Biểu đồ', items: ['Đoạn thẳng: theo thời gian', 'Quạt tròn: theo tỉ lệ', 'Cột kép: so sánh'] },
        { title: 'Biến cố', items: ['Chắc chắn', 'Không thể', 'Ngẫu nhiên'] },
        { title: 'Xác suất', items: ['$P(A)=\\f{m}{k}$', '$0\\le P\\le1$', 'Kết quả đồng khả năng'] },
      ],
    },
    types: [
      {
        id: 'g7-t7-d1', name: 'Dạng 1. Đọc biểu đồ quạt tròn', level: 'TH',
        method: ['Xác định tổng thể ứng với 100%.', 'Nhân tỉ lệ với tổng thể.'],
        worked: [{
          prompt: 'Biểu đồ quạt tròn về sở thích môn học của 200 học sinh cho biết Toán chiếm 35%, Văn 25%, Anh 20%, còn lại là các môn khác. Tính số học sinh thích Toán và số học sinh thích các môn khác.',
          thinking: ['Nhân tỉ lệ với tổng 200; phần “khác” lấy 100% trừ các phần đã biết.'],
          solution: [
            'Số học sinh thích Toán: $200\\cdot35\\percent=70$ (học sinh).',
            'Tỉ lệ môn khác: $100\\percent-35\\percent-25\\percent-20\\percent=20\\percent$.',
            'Số học sinh thích môn khác: $200\\cdot20\\percent=40$ (học sinh).',
          ],
        }],
      },
      {
        id: 'g7-t7-d2', name: 'Dạng 2. Tính xác suất của biến cố', level: 'TH',
        method: ['Liệt kê tổng số kết quả có thể.', 'Đếm số kết quả thuận lợi.', 'Lập tỉ số và rút gọn.'],
        worked: [{
          prompt: 'Một hộp có 12 thẻ đánh số từ 1 đến 12. Rút ngẫu nhiên một thẻ. Tính xác suất để rút được thẻ ghi số chia hết cho 3.',
          thinking: ['Tổng số kết quả là 12; đếm bội của 3 trong khoảng 1 đến 12.'],
          solution: [
            'Các thẻ chia hết cho 3: $3;6;9;12$ — có 4 thẻ.',
            '$P=\\f{4}{12}=\\f{1}{3}$.',
          ],
        }],
      },
    ],
    bank: ['g7.thong-ke', 'g7.xac-suat'],
  },
];
