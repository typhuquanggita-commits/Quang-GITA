import type { Template } from '@/types';
import { mcFrom, tfFrom, type Claim, type McItem } from './kit';

/* MATHGITA — KHỐI 8: LỚP NHẬN BIẾT & THÔNG HIỂU MỞ RỘNG
 * Ngân hàng mệnh đề theo chương trình KNTT lớp 8, dùng cho phần nhận biết
 * và đúng/sai của 100 mã đề mỗi khối. */

const MC_DA_THUC: McItem[] = [
  {
    q: 'Khai triển $(a-b)^{2}$ ta được:',
    a: '$a^{2}-2ab+b^{2}$', w: ['$a^{2}-b^{2}$', '$a^{2}+2ab+b^{2}$', '$a^{2}-ab+b^{2}$'],
    why: 'Bình phương của một hiệu: bình phương số thứ nhất, trừ hai lần tích, cộng bình phương số thứ hai.',
    trap: 'Nhầm $(a-b)^{2}$ với $a^{2}-b^{2}$ — đó là hằng đẳng thức **hiệu hai bình phương**.',
  },
  {
    q: 'Biểu thức $a^{3}-b^{3}$ phân tích thành:',
    a: '$(a-b)(a^{2}+ab+b^{2})$', w: ['$(a-b)^{3}$', '$(a-b)(a^{2}-ab+b^{2})$', '$(a+b)(a^{2}-ab+b^{2})$'],
    why: 'Hiệu hai lập phương: dấu trong ngoặc nhỏ là $-$, dấu giữa các hạng tử trong ngoặc lớn là $+$.',
    trap: 'Quy tắc nhớ: "hiệu – tổng, tổng – hiệu" cho dấu của hạng tử $ab$.',
  },
  {
    q: 'Phân tích $x^{2}-6x+9$ thành nhân tử được:',
    a: '$(x-3)^{2}$', w: ['$(x+3)^{2}$', '$(x-3)(x+3)$', '$(x-9)(x+1)$'],
    why: '$x^{2}-6x+9=x^{2}-2\\cdot3x+3^{2}=(x-3)^{2}$.',
  },
  {
    q: 'Phân thức $\\f{x+1}{x-2}$ xác định khi:',
    a: '$x\\ne2$', w: ['$x\\ne-1$', '$x\\ne0$', '$x\\ne\\pm2$'],
    why: 'Phân thức xác định khi **mẫu khác $0$**: $x-2\\ne0$.',
    trap: 'Nhiều bạn cho điều kiện ở **tử** — chỉ mẫu mới cần khác $0$.',
  },
  {
    q: 'Rút gọn $\\f{x^{2}-4}{x+2}$ (với $x\\ne-2$) được:',
    a: '$x-2$', w: ['$x+2$', '$x^{2}-2$', '$\\f{x-2}{2}$'],
    why: '$\\f{(x-2)(x+2)}{x+2}=x-2$.',
  },
  {
    q: 'Muốn chia hai phân thức $\\f{A}{B}:\\f{C}{D}$ ta:',
    a: 'nhân $\\f{A}{B}$ với $\\f{D}{C}$', w: ['nhân $\\f{A}{B}$ với $\\f{C}{D}$', 'chia tử cho tử, mẫu cho mẫu', 'quy đồng rồi trừ'],
    why: 'Chia cho một phân thức bằng nhân với **nghịch đảo** của nó (với $C\\ne0$).',
  },
];

const MC_PT_HAM: McItem[] = [
  {
    q: 'Phương trình nào sau đây là **phương trình bậc nhất một ẩn**?',
    a: '$\\f{1}{2}x-1=0$', w: ['$(x-1)^{2}=9$', '$2x^{2}+1=0$', '$0{,}3x-4y=0$'],
    why: 'Phương trình bậc nhất một ẩn có dạng $ax+b=0$ với $a\\ne0$ và chỉ một ẩn.',
    trap: '$0{,}3x-4y=0$ có **hai** ẩn; hai phương án còn lại chứa $x^{2}$.',
  },
  {
    q: 'Nghiệm của phương trình $2x-3=12-3x$ là:',
    a: '$x=3$', w: ['$x=-3$', '$x=\\f{9}{5}$', 'vô nghiệm'],
    why: '$2x+3x=12+3\\Rightarrow5x=15\\Rightarrow x=3$.',
  },
  {
    q: 'Phương trình $0\\cdot x=5$ có:',
    a: 'vô nghiệm', w: ['một nghiệm', 'hai nghiệm', 'vô số nghiệm'],
    why: 'Không có giá trị $x$ nào để $0=5$.',
    trap: 'Nếu là $0\\cdot x=0$ thì lại có **vô số** nghiệm — phải phân biệt hai trường hợp.',
  },
  {
    q: 'Hàm số $y=ax+b$ là hàm số bậc nhất khi:',
    a: '$a\\ne0$', w: ['$b\\ne0$', '$a=0$', '$a\\ne0$ và $b\\ne0$'],
    why: 'Chỉ cần hệ số góc $a$ khác $0$; $b$ có thể bằng $0$ (đồ thị qua gốc toạ độ).',
  },
  {
    q: 'Đồ thị hàm số $y=2x-3$ cắt trục tung tại điểm có tung độ:',
    a: '$-3$', w: ['$3$', '$2$', '$\\f{3}{2}$'],
    why: 'Cho $x=0$ được $y=-3$; tung độ gốc chính là hệ số $b$.',
    trap: 'Nhầm với giao điểm trục **hoành** (cho $y=0$, được $x=\\f{3}{2}$).',
  },
  {
    q: 'Hai đường thẳng $y=ax+b$ và $y=a\'x+b\'$ **song song** khi:',
    a: '$a=a\'$ và $b\\ne b\'$', w: ['$a=a\'$ và $b=b\'$', '$a\\ne a\'$', '$a\\cdot a\'=-1$'],
    why: 'Cùng hệ số góc thì cùng độ dốc; khác tung độ gốc thì không trùng nhau.',
  },
];

const MC_HINH_8: McItem[] = [
  {
    q: 'Tứ giác có hai đường chéo cắt nhau tại trung điểm mỗi đường là:',
    a: 'hình bình hành', w: ['hình thang', 'hình thang cân', 'tứ giác bất kỳ'],
    why: 'Đó là một dấu hiệu nhận biết hình bình hành.',
  },
  {
    q: 'Hình bình hành có hai đường chéo **bằng nhau** là:',
    a: 'hình chữ nhật', w: ['hình thoi', 'hình vuông', 'hình thang cân'],
    why: 'Hình bình hành + hai đường chéo bằng nhau ⟹ hình chữ nhật.',
    trap: 'Muốn ra hình vuông cần **thêm** điều kiện hai đường chéo vuông góc.',
  },
  {
    q: 'Hình bình hành có hai đường chéo **vuông góc** là:',
    a: 'hình thoi', w: ['hình chữ nhật', 'hình vuông', 'hình thang'],
    why: 'Hình bình hành + hai đường chéo vuông góc ⟹ hình thoi.',
  },
  {
    q: 'Đường trung bình của tam giác thì:',
    a: 'song song với cạnh thứ ba và bằng nửa cạnh ấy', w: ['bằng cạnh thứ ba', 'vuông góc với cạnh thứ ba', 'bằng nửa chu vi tam giác'],
    why: 'Định lí đường trung bình của tam giác.',
  },
  {
    q: 'Trong tam giác vuông, trung tuyến ứng với cạnh huyền bằng:',
    a: 'nửa cạnh huyền', w: ['cạnh huyền', 'nửa cạnh góc vuông', 'đường cao ứng với cạnh huyền'],
    why: 'Trung điểm cạnh huyền cách đều ba đỉnh — chính là tâm đường tròn ngoại tiếp.',
  },
  {
    q: 'Nếu $\\tri ABC\\sim\\tri A\'B\'C\'$ theo tỉ số $k$ thì tỉ số **diện tích** của chúng bằng:',
    a: '$k^{2}$', w: ['$k$', '$\\f{1}{k}$', '$2k$'],
    why: 'Diện tích là đại lượng hai chiều nên tỉ số bằng bình phương tỉ số đồng dạng.',
    trap: 'Chu vi, trung tuyến, đường cao thì tỉ số bằng $k$; chỉ **diện tích** mới là $k^{2}$.',
  },
  {
    q: 'Định lí Thalès trong tam giác phát biểu rằng đường thẳng song song với một cạnh sẽ:',
    a: 'định ra trên hai cạnh còn lại những đoạn thẳng tương ứng tỉ lệ', w: ['chia đôi hai cạnh còn lại', 'vuông góc với hai cạnh còn lại', 'đi qua trọng tâm'],
    why: 'Đó là nội dung định lí Thalès thuận.',
  },
  {
    q: 'Thể tích hình chóp có diện tích đáy $S$ và chiều cao $h$ là:',
    a: '$\\f{1}{3}Sh$', w: ['$Sh$', '$\\f{1}{2}Sh$', '$3Sh$'],
    why: 'Thể tích hình chóp bằng **một phần ba** thể tích hình lăng trụ cùng đáy, cùng chiều cao.',
  },
];

export const BANK_G8_NB: Template[] = [
  {
    id: 'g8.nb-da-thuc-mo-rong', topicId: 'g8-t1', grade: 8, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Hằng đẳng thức, nhân tử và phân thức',
    build: (r) => mcFrom(r, MC_DA_THUC, {
      thinking: [
        'Bảy hằng đẳng thức phải thuộc lòng — đặc biệt phân biệt $(a-b)^{2}$ với $a^{2}-b^{2}$.',
        'Phân thức luôn phải đặt **điều kiện mẫu khác $0$** trước khi rút gọn.',
      ],
    }),
  },
  {
    id: 'g8.nb-pt-ham-mo-rong', topicId: 'g8-t4', grade: 8, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Phương trình bậc nhất và hàm số bậc nhất',
    build: (r) => mcFrom(r, MC_PT_HAM, {
      thinking: [
        'Phương trình bậc nhất một ẩn: dạng $ax+b=0$ với $a\\ne0$ — chú ý cả điều kiện "một ẩn" và "bậc nhất".',
        'Với $ax+b=0$: $a\\ne0$ → một nghiệm; $a=0$, $b\\ne0$ → vô nghiệm; $a=b=0$ → vô số nghiệm.',
      ],
    }),
  },
  {
    id: 'g8.nb-hinh-mo-rong', topicId: 'g8-t5', grade: 8, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Tứ giác đặc biệt, Thalès và đồng dạng',
    build: (r) => mcFrom(r, MC_HINH_8, {
      thinking: [
        'Sơ đồ nhận biết: hình bình hành **+ hai đường chéo bằng nhau** → hình chữ nhật; **+ hai đường chéo vuông góc** → hình thoi; có cả hai → hình vuông.',
        'Tỉ số các đại lượng **độ dài** bằng $k$, riêng tỉ số **diện tích** bằng $k^{2}$.',
      ],
    }),
  },
  {
    id: 'g8.tf-hang-dang-thuc-2', topicId: 'g8-t1', grade: 8, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — hằng đẳng thức và phân tích nhân tử',
    build: (r) => {
      const a = r.int(2, 9);
      const pool: Claim[] = [
        { t: `$(x+${a})^{2}=x^{2}+${2 * a}x+${a * a}$`, ok: true, why: 'bình phương của một tổng.' },
        { t: `$(x-${a})^{2}=x^{2}-${a * a}$`, ok: false, why: `đúng phải là $x^{2}-${2 * a}x+${a * a}$; $x^{2}-${a * a}$ là **hiệu hai bình phương**.` },
        { t: `$x^{2}-${a * a}=(x-${a})(x+${a})$`, ok: true, why: 'hiệu hai bình phương.' },
        { t: `$x^{2}+${a * a}$ phân tích được thành nhân tử trên $\\R$`, ok: false, why: 'tổng hai bình phương luôn dương, không phân tích được trên tập số thực.' },
        { t: `$x^{3}-${a ** 3}=(x-${a})(x^{2}+${a}x+${a * a})$`, ok: true, why: 'hiệu hai lập phương.' },
        { t: `$(x+${a})^{3}=x^{3}+${a ** 3}$`, ok: false, why: `còn thiếu hai hạng tử giữa: $(x+${a})^{3}=x^{3}+${3 * a}x^{2}+${3 * a * a}x+${a ** 3}$.` },
        { t: 'Phân tích đa thức thành nhân tử là viết nó thành tích của những đa thức khác', ok: true, why: 'đúng theo định nghĩa.' },
        { t: `$${a}x^{2}+${a}x=${a}x(x+1)$`, ok: true, why: `đặt nhân tử chung $${a}x$.` },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Trước khi khai triển, hãy nhận dạng: có bình phương? có hiệu/tổng hai lập phương? có nhân tử chung?',
          'Ba hằng đẳng thức hay bị nhầm nhất: $(a\\pm b)^{2}$, $a^{2}-b^{2}$ và $(a\\pm b)^{3}$.',
        ],
        pitfall: 'Viết $(x-a)^{2}=x^{2}-a^{2}$ hoặc $(x+a)^{3}=x^{3}+a^{3}$ — quên các hạng tử ở giữa.',
      });
    },
  },
  {
    id: 'g8.tf-phuong-trinh', topicId: 'g8-t3', grade: 8, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — phương trình bậc nhất một ẩn',
    build: (r) => {
      const a = r.int(2, 8), b = r.int(1, 20);
      const pool: Claim[] = [
        { t: `$x=\\f{${b}}{${a}}$ là nghiệm của phương trình $${a}x-${b}=0$`, ok: true, why: `thay vào được $${b}-${b}=0$.` },
        { t: `Phương trình $${a}x-${b}=0$ có vô số nghiệm`, ok: false, why: `hệ số $${a}\\ne0$ nên phương trình có **đúng một** nghiệm.` },
        { t: 'Phương trình $0x=0$ có vô số nghiệm', ok: true, why: 'mọi giá trị của $x$ đều thoả mãn.' },
        { t: 'Phương trình $0x=3$ có một nghiệm', ok: false, why: 'không có $x$ nào để $0=3$, nên phương trình **vô nghiệm**.' },
        { t: 'Hai phương trình gọi là tương đương khi chúng có cùng tập nghiệm', ok: true, why: 'đúng theo định nghĩa.' },
        { t: 'Nhân hai vế của một phương trình với $0$ ta được phương trình tương đương', ok: false, why: 'nhân với $0$ biến mọi phương trình thành $0=0$, làm **mất** thông tin về nghiệm.' },
        { t: 'Chuyển một hạng tử từ vế này sang vế kia phải **đổi dấu** hạng tử đó', ok: true, why: 'quy tắc chuyển vế.' },
        { t: `Phương trình $(x-${a})(x+${b})=0$ có hai nghiệm là $x=${a}$ và $x=-${b}$`, ok: true, why: 'tích bằng $0$ khi ít nhất một thừa số bằng $0$.' },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Với $ax+b=0$: $a\\ne0$ → một nghiệm duy nhất; $a=0$ và $b\\ne0$ → vô nghiệm; $a=b=0$ → vô số nghiệm.',
          'Hai phép biến đổi tương đương được phép: chuyển vế (đổi dấu) và nhân/chia hai vế cho số **khác $0$**.',
        ],
        pitfall: 'Nhân hoặc chia hai vế cho một biểu thức có thể bằng $0$ — sẽ làm mất hoặc thêm nghiệm.',
      });
    },
  },
  {
    id: 'g8.tf-dong-dang', topicId: 'g8-t6', grade: 8, level: 'TH', kind: 'TF',
    strand: 'HINH_HOC', tag: 'Đúng/Sai — Thalès và tam giác đồng dạng',
    build: (r) => {
      const k = r.int(2, 5);
      const pool: Claim[] = [
        { t: 'Hai tam giác bằng nhau thì đồng dạng với nhau', ok: true, why: 'đó là trường hợp đồng dạng với tỉ số $k=1$.' },
        { t: 'Hai tam giác đồng dạng thì bằng nhau', ok: false, why: 'chỉ bằng nhau khi tỉ số đồng dạng $k=1$.' },
        { t: 'Hai tam giác có hai góc tương ứng bằng nhau thì đồng dạng', ok: true, why: 'trường hợp **g.g** — góc thứ ba tự khắc bằng nhau.' },
        { t: `Nếu $\\tri ABC\\sim\\tri A'B'C'$ theo tỉ số $${k}$ thì tỉ số chu vi bằng $${k}$`, ok: true, why: 'chu vi là đại lượng độ dài nên tỉ lệ theo đúng $k$.' },
        { t: `Nếu $\\tri ABC\\sim\\tri A'B'C'$ theo tỉ số $${k}$ thì tỉ số diện tích bằng $${k}$`, ok: false, why: `tỉ số diện tích bằng $k^{2}=${k * k}$.` },
        { t: 'Đường thẳng song song với một cạnh của tam giác định ra hai đoạn thẳng tương ứng tỉ lệ trên hai cạnh còn lại', ok: true, why: 'định lí Thalès thuận.' },
        { t: 'Đường phân giác trong của tam giác chia cạnh đối diện thành hai đoạn tỉ lệ với hai cạnh kề', ok: true, why: 'tính chất đường phân giác trong tam giác.' },
        { t: 'Hai tam giác vuông luôn đồng dạng với nhau', ok: false, why: 'mới chỉ có một cặp góc bằng nhau (góc vuông), cần thêm một cặp góc nhọn nữa.' },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Đồng dạng chỉ cần **hình dạng** giống nhau; bằng nhau đòi hỏi cả hình dạng lẫn **kích thước**.',
          'Với hai tam giác vuông, chỉ một góc vuông là chưa đủ — phải có thêm một cặp góc nhọn hoặc cặp cạnh tỉ lệ.',
        ],
        pitfall: 'Áp tỉ số $k$ cho diện tích thay vì $k^{2}$ — lỗi sai bản chất, mất trọn điểm câu hỏi.',
      });
    },
  },
  {
    id: 'g8.tf-phan-thuc', topicId: 'g8-t2', grade: 8, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — phân thức đại số',
    build: (r) => {
      const a = r.int(2, 9);
      const pool: Claim[] = [
        { t: `Phân thức $\\f{1}{x-${a}}$ xác định khi $x\\ne${a}$`, ok: true, why: 'mẫu phải khác $0$.' },
        { t: `Phân thức $\\f{x-${a}}{x^{2}+1}$ xác định với mọi $x$`, ok: true, why: '$x^{2}+1\\ge1>0$ nên mẫu không bao giờ bằng $0$.' },
        { t: `Phân thức $\\f{1}{x^{2}-${a * a}}$ xác định khi $x\\ne${a}$`, ok: false, why: `còn thiếu điều kiện $x\\ne-${a}$ vì $x^{2}-${a * a}=(x-${a})(x+${a})$.` },
        { t: 'Rút gọn phân thức là chia cả tử và mẫu cho nhân tử chung của chúng', ok: true, why: 'đúng theo quy tắc rút gọn.' },
        { t: `$\\f{x+${a}}{x}=1+${a}$`, ok: false, why: `chỉ được rút gọn **nhân tử chung**, không được rút từng hạng tử: đúng là $1+\\f{${a}}{x}$.` },
        { t: 'Muốn cộng hai phân thức khác mẫu, ta quy đồng mẫu rồi cộng các tử', ok: true, why: 'giống hệt quy tắc cộng phân số.' },
        { t: 'Phân thức đối của $\\f{A}{B}$ là $\\f{B}{A}$', ok: false, why: 'đó là phân thức **nghịch đảo**; phân thức đối là $-\\f{A}{B}=\\f{-A}{B}$.' },
        { t: 'Mọi đa thức đều là một phân thức', ok: true, why: 'đa thức $A$ viết được thành $\\f{A}{1}$.' },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Điều kiện xác định phải xét **toàn bộ mẫu**: phân tích mẫu thành nhân tử rồi cho từng nhân tử khác $0$.',
          'Chỉ được rút gọn **nhân tử chung** (nhân với nhau), tuyệt đối không rút từng hạng tử của một tổng.',
        ],
        pitfall: 'Với mẫu $x^{2}-a^{2}$ chỉ ghi một điều kiện $x\\ne a$ mà quên $x\\ne-a$.',
      });
    },
  },
];
