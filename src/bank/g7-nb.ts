import type { Template } from '@/types';
import { mcFrom, tfFrom, type Claim, type McItem } from './kit';

/* MATHGITA — KHỐI 7: LỚP NHẬN BIẾT & THÔNG HIỂU MỞ RỘNG
 * Bổ sung ngân hàng mệnh đề theo chương trình KNTT lớp 7 để mỗi mã đề có
 * phần nhận biết thực sự khác nhau về nội dung, không chỉ khác con số. */

const MC_SO_THUC: McItem[] = [
  {
    q: 'Số nào sau đây là **số vô tỉ**?',
    a: '$\\s{7}$', w: ['$\\s{16}$', '$\\f{22}{7}$', '$0{,}(3)$'],
    why: '$7$ không phải số chính phương nên $\\s{7}$ là số thập phân vô hạn **không tuần hoàn**.',
    trap: '$\\f{22}{7}$ và $0{,}(3)$ là số hữu tỉ; $\\s{16}=4$ cũng hữu tỉ.',
  },
  {
    q: 'Căn bậc hai số học của $49$ là:',
    a: '$7$', w: ['$-7$', '$\\pm7$', '$24{,}5$'],
    why: 'Căn bậc hai **số học** chỉ lấy giá trị **không âm**.',
    trap: '$49$ có hai căn bậc hai là $7$ và $-7$, nhưng căn bậc hai *số học* chỉ là $7$.',
  },
  {
    q: 'Khẳng định nào sau đây **đúng**?',
    a: '$\\N\\subset\\Z\\subset\\Q\\subset\\R$', w: ['$\\R\\subset\\Q$', '$\\Q\\subset\\Z$', '$\\Z\\subset\\N$'],
    why: 'Quan hệ bao hàm mở rộng dần từ số tự nhiên tới số thực.',
  },
  {
    q: 'Giá trị tuyệt đối $|-2{,}5|$ bằng:',
    a: '$2{,}5$', w: ['$-2{,}5$', '$0$', '$5$'],
    why: 'Giá trị tuyệt đối là khoảng cách tới $0$ nên luôn **không âm**.',
  },
  {
    q: 'Phân số nào sau đây viết được dưới dạng số thập phân **hữu hạn**?',
    a: '$\\f{7}{40}$', w: ['$\\f{5}{12}$', '$\\f{2}{7}$', '$\\f{4}{15}$'],
    why: '$40=2^{3}\\cdot5$ chỉ chứa thừa số nguyên tố $2$ và $5$.',
    trap: 'Phải xét mẫu của phân số **tối giản**, và chỉ chấp nhận ước nguyên tố $2$ và $5$.',
  },
  {
    q: 'Kết quả của $(-2)^{3}$ là:',
    a: '$-8$', w: ['$8$', '$-6$', '$6$'],
    why: 'Số mũ **lẻ** giữ nguyên dấu âm: $(-2)^{3}=-8$.',
    trap: 'Nhầm $(-2)^{3}$ với $(-2)\\cdot3=-6$, hoặc cho rằng luỹ thừa luôn ra số dương.',
  },
  {
    q: 'Số $0{,}(6)$ viết dưới dạng phân số tối giản là:',
    a: '$\\f{2}{3}$', w: ['$\\f{6}{10}$', '$\\f{3}{5}$', '$\\f{6}{9}$'],
    why: '$0,(6)=\\f{6}{9}=\\f{2}{3}$ — cần rút gọn về **tối giản**.',
  },
  {
    q: 'Làm tròn $3{,}147$ đến hàng phần trăm được:',
    a: '$3{,}15$', w: ['$3{,}14$', '$3{,}1$', '$3{,}2$'],
    why: 'Chữ số sau hàng phần trăm là $7\\ge5$ nên tăng chữ số hàng phần trăm thêm $1$.',
  },
];

const MC_TI_LE: McItem[] = [
  {
    q: 'Từ tỉ lệ thức $\\f{a}{b}=\\f{c}{d}$ suy ra:',
    a: '$ad=bc$', w: ['$ab=cd$', '$ac=bd$', '$a+d=b+c$'],
    why: 'Tính chất cơ bản của tỉ lệ thức: **tích trung tỉ bằng tích ngoại tỉ**.',
  },
  {
    q: 'Nếu $y$ tỉ lệ **thuận** với $x$ theo hệ số $k$ thì:',
    a: '$y=kx$', w: ['$y=\\f{k}{x}$', '$xy=k$', '$y=x+k$'],
    why: 'Tỉ lệ thuận: $y=kx$, tỉ số $\\f{y}{x}=k$ không đổi.',
    trap: '$xy=k$ và $y=\\f{k}{x}$ là công thức của tỉ lệ **nghịch**.',
  },
  {
    q: 'Nếu $y$ tỉ lệ **nghịch** với $x$ theo hệ số $a$ thì:',
    a: '$xy=a$', w: ['$y=ax$', '$\\f{y}{x}=a$', '$y=x-a$'],
    why: 'Tỉ lệ nghịch: tích $xy=a$ không đổi.',
  },
  {
    q: 'Cho $\\f{x}{3}=\\f{y}{5}$ và $x+y=32$. Giá trị của $x$ là:',
    a: '$12$', w: ['$20$', '$16$', '$8$'],
    why: 'Theo dãy tỉ số bằng nhau: $\\f{x}{3}=\\f{y}{5}=\\f{x+y}{3+5}=\\f{32}{8}=4$, nên $x=12$.',
  },
  {
    q: 'Tính chất dãy tỉ số bằng nhau cho biết $\\f{a}{b}=\\f{c}{d}$ bằng:',
    a: '$\\f{a+c}{b+d}$ (với $b+d\\ne0$)', w: ['$\\f{a+c}{b\\cdot d}$', '$\\f{a\\cdot c}{b+d}$', '$\\f{a-c}{b+d}$'],
    why: 'Cộng tử với tử, mẫu với mẫu — điều kiện mẫu tổng khác $0$.',
  },
];

const MC_HINH_7: McItem[] = [
  {
    q: 'Hai góc đối đỉnh thì:',
    a: 'bằng nhau', w: ['bù nhau', 'phụ nhau', 'kề bù'],
    why: 'Hai góc đối đỉnh luôn có số đo bằng nhau.',
  },
  {
    q: 'Tổng ba góc trong một tam giác bằng:',
    a: '$180\\deg$', w: ['$360\\deg$', '$90\\deg$', '$270\\deg$'],
    why: 'Định lí tổng ba góc trong tam giác.',
  },
  {
    q: 'Trong tam giác, góc ngoài tại một đỉnh bằng:',
    a: 'tổng hai góc trong không kề với nó', w: ['góc trong kề với nó', 'nửa tổng ba góc trong', 'hiệu hai góc trong còn lại'],
    why: 'Định lí góc ngoài của tam giác.',
    trap: 'Nhầm thành "bằng góc trong kề với nó" — hai góc đó thực ra **kề bù**.',
  },
  {
    q: 'Ba đường **trung tuyến** của tam giác cùng đi qua:',
    a: 'trọng tâm', w: ['trực tâm', 'tâm đường tròn nội tiếp', 'tâm đường tròn ngoại tiếp'],
    why: 'Ba trung tuyến đồng quy tại trọng tâm, cách đỉnh $\\f{2}{3}$ độ dài trung tuyến.',
  },
  {
    q: 'Ba đường **phân giác** của tam giác cùng đi qua:',
    a: 'tâm đường tròn nội tiếp', w: ['trọng tâm', 'trực tâm', 'tâm đường tròn ngoại tiếp'],
    why: 'Giao ba phân giác cách đều ba cạnh nên là tâm đường tròn nội tiếp.',
  },
  {
    q: 'Ba đường **trung trực** của tam giác cùng đi qua:',
    a: 'tâm đường tròn ngoại tiếp', w: ['trọng tâm', 'trực tâm', 'tâm đường tròn nội tiếp'],
    why: 'Giao ba trung trực cách đều ba đỉnh nên là tâm đường tròn ngoại tiếp.',
  },
  {
    q: 'Bộ ba đoạn thẳng nào sau đây **không** tạo thành tam giác?',
    a: '$2$ cm, $3$ cm, $6$ cm', w: ['$3$ cm, $4$ cm, $5$ cm', '$5$ cm, $5$ cm, $8$ cm', '$6$ cm, $7$ cm, $10$ cm'],
    why: '$2+3=5<6$ — vi phạm bất đẳng thức tam giác.',
    trap: 'Chỉ cần kiểm tra tổng **hai cạnh nhỏ nhất** so với cạnh lớn nhất là đủ.',
  },
  {
    q: 'Trong một tam giác, đối diện với cạnh lớn hơn là:',
    a: 'góc lớn hơn', w: ['góc nhỏ hơn', 'góc vuông', 'góc bằng nhau'],
    why: 'Quan hệ giữa góc và cạnh đối diện trong tam giác.',
  },
];

export const BANK_G7_NB: Template[] = [
  {
    id: 'g7.nb-so-thuc-mo-rong', topicId: 'g7-t1', grade: 7, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Số hữu tỉ, số vô tỉ, căn bậc hai và làm tròn',
    build: (r) => mcFrom(r, MC_SO_THUC, {
      thinking: [
        'Số hữu tỉ viết được dạng $\\f{a}{b}$ (thập phân hữu hạn hoặc vô hạn **tuần hoàn**); số vô tỉ là thập phân vô hạn **không tuần hoàn**.',
        'Căn bậc hai **số học** luôn không âm — đây là chi tiết bị mất điểm nhiều nhất.',
      ],
    }),
  },
  {
    id: 'g7.nb-ti-le-mo-rong', topicId: 'g7-t2', grade: 7, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Tỉ lệ thức và hai đại lượng tỉ lệ',
    build: (r) => mcFrom(r, MC_TI_LE, {
      thinking: [
        'Tỉ lệ **thuận**: $y=kx$, **tỉ số** không đổi. Tỉ lệ **nghịch**: $xy=a$, **tích** không đổi.',
        'Dãy tỉ số bằng nhau cho phép cộng tử với tử, mẫu với mẫu — công cụ mạnh nhất của chuyên đề này.',
      ],
    }),
  },
  {
    id: 'g7.nb-hinh-mo-rong', topicId: 'g7-t5', grade: 7, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Góc, tam giác và các đường đồng quy',
    build: (r) => mcFrom(r, MC_HINH_7, {
      thinking: [
        'Nhớ bốn điểm đặc biệt theo cặp: trung tuyến → **trọng tâm**; đường cao → **trực tâm**; phân giác → tâm **nội** tiếp; trung trực → tâm **ngoại** tiếp.',
        'Bất đẳng thức tam giác: chỉ cần kiểm tra tổng hai cạnh nhỏ có lớn hơn cạnh lớn nhất hay không.',
      ],
    }),
  },
  {
    id: 'g7.tf-so-huu-ti', topicId: 'g7-t1', grade: 7, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — số hữu tỉ, số thực và căn bậc hai',
    build: (r) => {
      const a = r.pick([4, 9, 16, 25, 36, 49, 64, 81, 100]);
      const sa = Math.round(Math.sqrt(a));
      const pool: Claim[] = [
        { t: `$\\s{${a}}=${sa}$`, ok: true, why: `$${sa}^{2}=${a}$ và $${sa}>0$ nên đây là căn bậc hai số học.` },
        { t: `$\\s{${a}}=\\pm${sa}$`, ok: false, why: `căn bậc hai **số học** chỉ lấy giá trị không âm: $\\s{${a}}=${sa}$.` },
        { t: `$${a}$ có hai căn bậc hai là $${sa}$ và $-${sa}$`, ok: true, why: 'mỗi số dương có đúng hai căn bậc hai đối nhau.' },
        { t: 'Mọi số hữu tỉ đều là số thực', ok: true, why: '$\\Q\\subset\\R$.' },
        { t: 'Mọi số thực đều là số hữu tỉ', ok: false, why: 'các số như $\\s{2}$, $\\pi$ là số thực nhưng không hữu tỉ.' },
        { t: '$\\pi$ là số hữu tỉ', ok: false, why: '$\\pi$ là số vô tỉ — thập phân vô hạn không tuần hoàn.' },
        { t: 'Số $0$ vừa là số hữu tỉ vừa là số nguyên', ok: true, why: '$0=\\f{0}{1}$ nên hữu tỉ, và $0\\in\\Z$.' },
        { t: 'Có số hữu tỉ nhỏ nhất lớn hơn $0$', ok: false, why: 'giữa $0$ và bất kỳ số dương nào cũng còn vô số số hữu tỉ khác.' },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Phân biệt "**căn bậc hai**" (có hai giá trị đối nhau) với "**căn bậc hai số học**" (chỉ lấy giá trị không âm).',
          'Ghi nhớ chuỗi bao hàm $\\N\\subset\\Z\\subset\\Q\\subset\\R$ để xét nhanh các mệnh đề về tập hợp số.',
        ],
        pitfall: 'Viết $\\s{a}=\\pm\\s{a}$ — ký hiệu $\\s{\\;}$ luôn chỉ giá trị **không âm**.',
      });
    },
  },
  {
    id: 'g7.tf-da-thuc', topicId: 'g7-t3', grade: 7, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — đa thức một biến',
    build: (r) => {
      const a = r.int(2, 6), b = r.int(1, 9);
      const pool: Claim[] = [
        { t: `Đa thức $P(x)=${a}x^{3}-${b}x+1$ có bậc $3$`, ok: true, why: 'bậc của đa thức là số mũ **cao nhất** của biến.' },
        { t: `Đa thức $P(x)=${a}x^{3}-${b}x+1$ có hệ số cao nhất là $${a}$`, ok: true, why: 'hệ số cao nhất là hệ số của hạng tử có bậc lớn nhất.' },
        { t: `Đa thức $P(x)=${a}x^{3}-${b}x+1$ có hệ số tự do là $${a}$`, ok: false, why: 'hệ số tự do là hạng tử không chứa biến, ở đây bằng $1$.' },
        { t: `$x=\\f{${b}}{${a}}$ là nghiệm của $Q(x)=${a}x-${b}$`, ok: true, why: `$Q\\left(\\f{${b}}{${a}}\\right)=${b}-${b}=0$.` },
        { t: 'Mọi đa thức bậc nhất một biến đều có đúng một nghiệm', ok: true, why: '$ax+b=0$ với $a\\ne0$ luôn cho $x=-\\f{b}{a}$ duy nhất.' },
        { t: 'Đa thức $x^{2}+1$ có nghiệm thực', ok: false, why: '$x^{2}\\ge0$ nên $x^{2}+1\\ge1>0$ với mọi $x$.' },
        { t: 'Bậc của tổng hai đa thức luôn bằng bậc lớn hơn trong hai đa thức', ok: false, why: 'khi hai hạng tử bậc cao triệt tiêu nhau, bậc của tổng sẽ **giảm** (ví dụ $x^{2}+1$ cộng $-x^{2}+x$).' },
        { t: 'Số $0$ được coi là đa thức không, không có bậc xác định', ok: true, why: 'theo quy ước của sách giáo khoa.' },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Trước khi xét bậc hay hệ số, phải **thu gọn** đa thức và **sắp xếp** theo luỹ thừa giảm dần.',
          'Muốn kiểm tra $x=a$ có là nghiệm không, chỉ cần thay vào và xem kết quả có bằng $0$ hay không.',
        ],
        pitfall: 'Nhầm hệ số cao nhất với hệ số tự do, hoặc quên thu gọn trước khi xác định bậc.',
      });
    },
  },
  {
    id: 'g7.tf-tam-giac-bang-nhau', topicId: 'g7-t5', grade: 7, level: 'TH', kind: 'TF',
    strand: 'HINH_HOC', tag: 'Đúng/Sai — các trường hợp bằng nhau của tam giác',
    build: (r) => {
      const pool: Claim[] = [
        { t: 'Hai tam giác có ba cạnh tương ứng bằng nhau thì bằng nhau', ok: true, why: 'đó là trường hợp **c.c.c**.' },
        { t: 'Hai tam giác có ba góc tương ứng bằng nhau thì bằng nhau', ok: false, why: 'ba góc bằng nhau chỉ cho hai tam giác **đồng dạng**, kích thước có thể khác nhau.' },
        { t: 'Hai tam giác vuông có cạnh huyền và một góc nhọn bằng nhau thì bằng nhau', ok: true, why: 'trường hợp **cạnh huyền – góc nhọn**.' },
        { t: 'Hai tam giác vuông có hai cạnh góc vuông bằng nhau thì bằng nhau', ok: true, why: 'đây chính là trường hợp c.g.c với góc xen giữa là góc vuông.' },
        { t: 'Hai tam giác có hai cạnh và một góc bằng nhau thì luôn bằng nhau', ok: false, why: 'góc phải là góc **xen giữa** hai cạnh đó; nếu không, kết luận có thể sai.' },
        { t: 'Trong tam giác cân, hai góc ở đáy bằng nhau', ok: true, why: 'tính chất của tam giác cân.' },
        { t: 'Tam giác đều là tam giác cân tại cả ba đỉnh', ok: true, why: 'ba cạnh bằng nhau nên cân tại mọi đỉnh; mỗi góc bằng $60\\deg$.' },
        { t: 'Điểm nằm trên đường trung trực của một đoạn thẳng thì cách đều hai đầu đoạn thẳng đó', ok: true, why: 'tính chất đặc trưng của đường trung trực.' },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Ba trường hợp bằng nhau: **c.c.c**, **c.g.c** (góc phải **xen giữa**), **g.c.g** (cạnh phải **kề** hai góc).',
          'Với tam giác vuông có thêm: cạnh huyền – góc nhọn, cạnh huyền – cạnh góc vuông.',
        ],
        pitfall: 'Dùng "hai cạnh và một góc" mà góc không xen giữa — đây không phải trường hợp bằng nhau.',
      });
    },
  },
  {
    id: 'g7.tf-thong-ke-xs', topicId: 'g7-t7', grade: 7, level: 'TH', kind: 'TF',
    strand: 'THONG_KE_XS', tag: 'Đúng/Sai — thống kê và xác suất',
    build: (r) => {
      const n = r.int(4, 12);
      const pool: Claim[] = [
        { t: 'Tổng các tỉ lệ phần trăm trong một biểu đồ hình quạt tròn bằng $100\\%$', ok: true, why: 'cả hình tròn ứng với toàn bộ dữ liệu.' },
        { t: 'Tổng các góc ở tâm trong một biểu đồ hình quạt tròn bằng $180\\deg$', ok: false, why: 'phải bằng $360\\deg$ — đó là số đo cả đường tròn.' },
        { t: 'Biểu đồ đoạn thẳng thích hợp để biểu diễn **sự thay đổi theo thời gian**', ok: true, why: 'trục hoành là mốc thời gian, độ dốc cho thấy xu hướng tăng giảm.' },
        { t: 'Xác suất của một biến cố luôn nằm trong đoạn từ $0$ đến $1$', ok: true, why: 'xác suất là tỉ số giữa số kết quả thuận lợi và tổng số kết quả.' },
        { t: 'Biến cố chắc chắn có xác suất bằng $0$', ok: false, why: 'biến cố **chắc chắn** có xác suất bằng $1$; biến cố **không thể** mới có xác suất $0$.' },
        { t: `Gieo một con xúc xắc cân đối, xác suất xuất hiện mặt $${Math.min(n, 6)}$ chấm là $\\f{1}{6}$`, ok: Math.min(n, 6) <= 6, why: 'sáu mặt đồng khả năng nên mỗi mặt có xác suất $\\f{1}{6}$.' },
        { t: 'Xác suất thực nghiệm luôn bằng đúng xác suất lí thuyết', ok: false, why: 'xác suất thực nghiệm chỉ **xấp xỉ** và càng gần khi số lần thử càng lớn.' },
        { t: 'Trong một dãy số liệu, mốt là giá trị xuất hiện nhiều nhất', ok: true, why: 'đó là định nghĩa của mốt.' },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Hai mốc phải nhớ: cả hình quạt tròn ứng với $360\\deg$ và với $100\\%$.',
          'Xác suất luôn thuộc $[0;1]$: biến cố không thể $=0$, biến cố chắc chắn $=1$.',
        ],
        pitfall: 'Lẫn lộn xác suất **lí thuyết** (tính bằng công thức) với xác suất **thực nghiệm** (đếm từ số liệu thật).',
      });
    },
  },
];
