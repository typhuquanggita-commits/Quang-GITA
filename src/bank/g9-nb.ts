import type { Template } from '@/types';
import { mcFrom, tfFrom, type Claim, type McItem } from './kit';

/* MATHGITA — KHỐI 9: LỚP NHẬN BIẾT & THÔNG HIỂU MỞ RỘNG
 * Ngân hàng mệnh đề bám chương trình lớp 9 và cấu trúc đề tuyển sinh vào 10,
 * dùng cho phần nhận biết và đúng/sai của 100 mã đề. */

const MC_CAN_THUC: McItem[] = [
  {
    q: 'Biểu thức $\\s{2x-6}$ xác định khi:',
    a: '$x\\ge3$', w: ['$x>3$', '$x\\le3$', '$x\\ne3$'],
    why: 'Căn bậc hai xác định khi biểu thức dưới dấu căn **không âm**: $2x-6\\ge0$.',
    trap: 'Dùng dấu $>$ thay vì $\\ge$ — giá trị làm biểu thức dưới căn bằng $0$ vẫn hợp lệ.',
  },
  {
    q: 'Biểu thức $\\f{1}{\\s{x-2}}$ xác định khi:',
    a: '$x>2$', w: ['$x\\ge2$', '$x\\ne2$', '$x<2$'],
    why: 'Vừa cần $x-2\\ge0$ (để có căn) vừa cần mẫu khác $0$, nên $x-2>0$.',
    trap: 'Khi căn nằm ở **mẫu**, điều kiện chặt hơn: phải **lớn hơn** $0$ chứ không phải $\\ge0$.',
  },
  {
    q: 'Rút gọn $\\s{(1-\\s{2})^{2}}$ được:',
    a: '$\\s{2}-1$', w: ['$1-\\s{2}$', '$\\s{2}+1$', '$1$'],
    why: '$\\s{A^{2}}=|A|$; vì $1-\\s{2}<0$ nên $|1-\\s{2}|=\\s{2}-1$.',
    trap: 'Bỏ dấu căn mà quên dấu giá trị tuyệt đối — phải xét dấu biểu thức bên trong.',
  },
  {
    q: 'Kết quả của $\\s{12}+\\s{27}$ là:',
    a: '$5\\s{3}$', w: ['$\\s{39}$', '$6\\s{3}$', '$39$'],
    why: '$\\s{12}=2\\s{3}$ và $\\s{27}=3\\s{3}$ nên tổng bằng $5\\s{3}$.',
    trap: '$\\s{a}+\\s{b}\\ne\\s{a+b}$ — phải đưa thừa số ra ngoài dấu căn trước.',
  },
  {
    q: 'Trục căn thức ở mẫu của $\\f{2}{\\s{5}}$ ta được:',
    a: '$\\f{2\\s{5}}{5}$', w: ['$\\f{2}{5}$', '$2\\s{5}$', '$\\f{\\s{5}}{2}$'],
    why: 'Nhân cả tử và mẫu với $\\s{5}$: $\\f{2\\s{5}}{5}$.',
  },
  {
    q: 'Khẳng định nào sau đây **đúng** với mọi số thực $a$?',
    a: '$\\s{a^{2}}=|a|$', w: ['$\\s{a^{2}}=a$', '$\\s{a^{2}}=-a$', '$\\s{a^{2}}=a^{2}$'],
    why: 'Căn bậc hai số học luôn không âm nên kết quả là $|a|$.',
  },
];

const MC_PT_HAM_9: McItem[] = [
  {
    q: 'Phương trình $ax^{2}+bx+c=0$ ($a\\ne0$) có hai nghiệm phân biệt khi:',
    a: '$\\Delta>0$', w: ['$\\Delta=0$', '$\\Delta<0$', '$\\Delta\\ge0$'],
    why: '$\\Delta>0$ cho hai nghiệm phân biệt; $\\Delta=0$ cho nghiệm kép; $\\Delta<0$ thì vô nghiệm.',
  },
  {
    q: 'Theo hệ thức Viète, với $ax^{2}+bx+c=0$ có hai nghiệm $x_1$, $x_2$ thì $x_1+x_2$ bằng:',
    a: '$-\\f{b}{a}$', w: ['$\\f{b}{a}$', '$\\f{c}{a}$', '$-\\f{c}{a}$'],
    why: 'Tổng hai nghiệm $S=-\\f{b}{a}$, tích hai nghiệm $P=\\f{c}{a}$.',
    trap: 'Quên dấu trừ ở công thức tổng là lỗi sai phổ biến nhất của Viète.',
  },
  {
    q: 'Phương trình $x^{2}-5x+4=0$ có hai nghiệm là:',
    a: '$1$ và $4$', w: ['$-1$ và $-4$', '$2$ và $3$', '$1$ và $-4$'],
    why: 'Nhẩm nghiệm: $a+b+c=1-5+4=0$ nên $x_1=1$, $x_2=\\f{c}{a}=4$.',
    trap: 'Nhẩm nghiệm nhanh: $a+b+c=0\\Rightarrow x=1$; $a-b+c=0\\Rightarrow x=-1$.',
  },
  {
    q: 'Đồ thị hàm số $y=ax^{2}$ ($a\\ne0$) là:',
    a: 'một parabol có đỉnh tại gốc toạ độ', w: ['một đường thẳng', 'một đường tròn', 'hai đường thẳng cắt nhau'],
    why: 'Parabol nhận trục $Oy$ làm trục đối xứng, đỉnh tại $O(0;0)$.',
  },
  {
    q: 'Với hàm số $y=ax^{2}$, nếu $a<0$ thì đồ thị:',
    a: 'nằm phía dưới trục hoành, $O$ là điểm cao nhất', w: ['nằm phía trên trục hoành', 'đi qua điểm $(0;a)$', 'là đường thẳng dốc xuống'],
    why: 'Khi $a<0$ thì $ax^{2}\\le0$ với mọi $x$, dấu bằng chỉ tại $x=0$.',
  },
  {
    q: 'Hệ phương trình bậc nhất hai ẩn có nghiệm **duy nhất** khi hai đường thẳng biểu diễn chúng:',
    a: 'cắt nhau', w: ['song song', 'trùng nhau', 'vuông góc'],
    why: 'Cắt nhau tại đúng một điểm nên hệ có đúng một nghiệm.',
  },
];

const MC_HINH_9: McItem[] = [
  {
    q: 'Trong tam giác vuông, $\\sin$ của một góc nhọn bằng:',
    a: 'cạnh đối chia cạnh huyền', w: ['cạnh kề chia cạnh huyền', 'cạnh đối chia cạnh kề', 'cạnh huyền chia cạnh đối'],
    why: 'Ghi nhớ: **Sin – Đối/Huyền, Cos – Kề/Huyền, Tan – Đối/Kề, Cot – Kề/Đối**.',
  },
  {
    q: 'Góc nội tiếp chắn nửa đường tròn là:',
    a: 'góc vuông', w: ['góc nhọn', 'góc tù', 'góc bẹt'],
    why: 'Góc nội tiếp bằng nửa cung bị chắn; nửa đường tròn ứng với $180\\deg$ nên góc bằng $90\\deg$.',
  },
  {
    q: 'Số đo góc nội tiếp bằng:',
    a: 'nửa số đo cung bị chắn', w: ['số đo cung bị chắn', 'hai lần số đo cung bị chắn', 'nửa số đo góc ở tâm cùng chắn cung đó nhân 2'],
    why: 'Góc ở tâm bằng số đo cung; góc nội tiếp cùng chắn cung đó bằng **một nửa** góc ở tâm.',
  },
  {
    q: 'Tứ giác nội tiếp đường tròn có tính chất:',
    a: 'tổng hai góc đối bằng $180\\deg$', w: ['tổng hai góc kề bằng $180\\deg$', 'bốn góc bằng nhau', 'hai đường chéo bằng nhau'],
    why: 'Đây vừa là tính chất vừa là dấu hiệu nhận biết tứ giác nội tiếp.',
    trap: 'Nhớ là hai góc **đối diện**, không phải hai góc kề.',
  },
  {
    q: 'Tiếp tuyến của đường tròn tại một điểm thì:',
    a: 'vuông góc với bán kính đi qua tiếp điểm', w: ['song song với bán kính', 'đi qua tâm', 'bằng bán kính'],
    why: 'Đây là tính chất cơ bản nhất của tiếp tuyến.',
  },
  {
    q: 'Diện tích xung quanh của hình trụ bán kính $r$, chiều cao $h$ là:',
    a: '$2\\pi rh$', w: ['$\\pi r^{2}h$', '$\\pi rh$', '$2\\pi r^{2}$'],
    why: 'Trải mặt xung quanh ra được hình chữ nhật kích thước $2\\pi r$ và $h$.',
    trap: '$\\pi r^{2}h$ là **thể tích** hình trụ, không phải diện tích xung quanh.',
  },
  {
    q: 'Thể tích hình cầu bán kính $R$ là:',
    a: '$\\f{4}{3}\\pi R^{3}$', w: ['$4\\pi R^{2}$', '$\\f{1}{3}\\pi R^{3}$', '$\\pi R^{3}$'],
    why: '$4\\pi R^{2}$ là **diện tích mặt cầu**, còn thể tích là $\\f{4}{3}\\pi R^{3}$.',
  },
  {
    q: 'Trong tam giác vuông có đường cao ứng với cạnh huyền, hệ thức nào **đúng**?',
    a: '$h^{2}=b\'c\'$', w: ['$h^{2}=bc$', '$h=b\'+c\'$', '$h^{2}=b^{2}+c^{2}$'],
    why: 'Đường cao bình phương bằng tích **hai hình chiếu** của hai cạnh góc vuông lên cạnh huyền.',
  },
];

export const BANK_G9_NB: Template[] = [
  {
    id: 'g9.nb-can-thuc-mo-rong', topicId: 'g9-t2', grade: 9, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Căn thức bậc hai — điều kiện và biến đổi',
    build: (r) => mcFrom(r, MC_CAN_THUC, {
      thinking: [
        'Điều kiện xác định: căn đứng riêng thì $\\ge0$; căn nằm **ở mẫu** thì phải $>0$.',
        '$\\s{A^{2}}=|A|$ — luôn xét dấu $A$ trước khi bỏ dấu giá trị tuyệt đối.',
      ],
    }),
  },
  {
    id: 'g9.nb-pt-ham-mo-rong', topicId: 'g9-t3', grade: 9, level: 'NB', kind: 'MC',
    strand: 'SO_DAI_SO', tag: 'Phương trình bậc hai, Viète và hàm số y = ax²',
    build: (r) => mcFrom(r, MC_PT_HAM_9, {
      thinking: [
        'Ba mốc của $\\Delta$: $>0$ hai nghiệm phân biệt · $=0$ nghiệm kép · $<0$ vô nghiệm.',
        'Viète: $S=-\\f{b}{a}$ (nhớ **dấu trừ**), $P=\\f{c}{a}$.',
        'Nhẩm nghiệm: $a+b+c=0\\Rightarrow x_1=1,\\;x_2=\\f{c}{a}$; $a-b+c=0\\Rightarrow x_1=-1,\\;x_2=-\\f{c}{a}$.',
      ],
    }),
  },
  {
    id: 'g9.nb-hinh-mo-rong', topicId: 'g9-t6', grade: 9, level: 'NB', kind: 'MC',
    strand: 'HINH_HOC', tag: 'Tỉ số lượng giác, đường tròn và hình khối',
    build: (r) => mcFrom(r, MC_HINH_9, {
      thinking: [
        'Góc nội tiếp $=\\f{1}{2}$ cung bị chắn — đây là chìa khoá của gần như mọi câu hình về đường tròn.',
        'Phân biệt rõ **diện tích** và **thể tích** của hình trụ, hình nón, hình cầu; công thức chỉ khác nhau vài ký tự.',
      ],
    }),
  },
  {
    id: 'g9.tf-can-thuc', topicId: 'g9-t2', grade: 9, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — căn bậc hai và biến đổi căn thức',
    build: (r) => {
      const a = r.int(2, 9), b = r.pick([2, 3, 5, 6, 7]);
      const pool: Claim[] = [
        { t: `$\\s{${a * a}\\cdot${b}}=${a}\\s{${b}}$`, ok: true, why: `đưa thừa số chính phương $${a * a}$ ra ngoài dấu căn.` },
        { t: `$\\s{${a * a}+${b}}=${a}+\\s{${b}}$`, ok: false, why: 'căn của một **tổng** không tách được thành tổng các căn.' },
        { t: '$\\s{A}\\cdot\\s{B}=\\s{AB}$ với $A\\ge0$, $B\\ge0$', ok: true, why: 'quy tắc nhân hai căn bậc hai.' },
        { t: '$\\s{A^{2}}=A$ với mọi số thực $A$', ok: false, why: 'đúng phải là $\\s{A^{2}}=|A|$; nếu $A<0$ thì kết quả là $-A$.' },
        { t: `$\\f{1}{\\s{${b}}}=\\f{\\s{${b}}}{${b}}$`, ok: true, why: 'trục căn thức ở mẫu bằng cách nhân cả tử và mẫu với $\\s{' + b + '}$.' },
        { t: `Biểu thức $\\s{-${a}}$ có nghĩa`, ok: false, why: 'biểu thức dưới dấu căn bậc hai phải không âm.' },
        { t: `$\\s{${a}}$ là số vô tỉ`, ok: Math.round(Math.sqrt(a)) ** 2 !== a, why: Math.round(Math.sqrt(a)) ** 2 !== a ? `$${a}$ không phải số chính phương nên $\\s{${a}}$ vô tỉ.` : `$${a}$ là số chính phương nên $\\s{${a}}=${Math.round(Math.sqrt(a))}$ là số hữu tỉ.` },
        { t: 'Hai biểu thức liên hợp của $\\s{a}-\\s{b}$ là $\\s{a}+\\s{b}$', ok: true, why: 'nhân hai biểu thức liên hợp cho $a-b$ — hết căn ở mẫu.' },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Căn **tách được qua phép nhân và chia**, nhưng **không tách được qua phép cộng và trừ**.',
          'Nhớ hai công cụ trục căn thức: nhân với chính căn đó, hoặc nhân với **biểu thức liên hợp**.',
        ],
        pitfall: 'Viết $\\s{a+b}=\\s{a}+\\s{b}$ — sai hoàn toàn, thử với $a=b=1$ là thấy ngay.',
      });
    },
  },
  {
    id: 'g9.tf-viete-2', topicId: 'g9-t3', grade: 9, level: 'TH', kind: 'TF',
    strand: 'SO_DAI_SO', tag: 'Đúng/Sai — phương trình bậc hai và hệ thức Viète',
    build: (r) => {
      const b = r.int(-9, 9), c = r.int(-12, 12);
      const D = b * b - 4 * c;
      const pool: Claim[] = [
        { t: `Phương trình $x^{2}${b >= 0 ? '+' : ''}${b}x${c >= 0 ? '+' : ''}${c}=0$ có $\\Delta=${D}$`, ok: true, why: `$\\Delta=b^{2}-4ac=${b * b}-${4 * c}=${D}$.` },
        { t: `Phương trình $x^{2}${b >= 0 ? '+' : ''}${b}x${c >= 0 ? '+' : ''}${c}=0$ có hai nghiệm phân biệt`, ok: D > 0, why: D > 0 ? `$\\Delta=${D}>0$.` : D === 0 ? `$\\Delta=0$ nên phương trình có **nghiệm kép**.` : `$\\Delta=${D}<0$ nên phương trình **vô nghiệm**.` },
        { t: 'Tổng hai nghiệm của $ax^{2}+bx+c=0$ bằng $\\f{b}{a}$', ok: false, why: 'đúng phải là $-\\f{b}{a}$ — thiếu dấu trừ.' },
        { t: 'Tích hai nghiệm của $ax^{2}+bx+c=0$ bằng $\\f{c}{a}$', ok: true, why: 'hệ thức Viète.' },
        { t: 'Nếu $a+b+c=0$ thì phương trình có một nghiệm bằng $1$', ok: true, why: 'thay $x=1$ vào được $a+b+c=0$ đúng.' },
        { t: 'Nếu $a-b+c=0$ thì phương trình có một nghiệm bằng $1$', ok: false, why: 'khi $a-b+c=0$ thì nghiệm là $x=-1$.' },
        { t: 'Phương trình bậc hai có tích hai nghiệm âm thì hai nghiệm trái dấu', ok: true, why: '$P<0$ nghĩa là $x_1x_2<0$, hai nghiệm khác dấu.' },
        { t: 'Muốn dùng Viète, không cần kiểm tra điều kiện $\\Delta\\ge0$', ok: false, why: 'phải chắc chắn phương trình **có nghiệm** thì mới nói tới tổng và tích hai nghiệm.' },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Trình tự chuẩn của mọi bài Viète: tính $\\Delta$ → khẳng định có nghiệm → mới viết $S$ và $P$.',
          'Hai mẹo nhẩm nghiệm: $a+b+c=0\\Rightarrow x=1$; $a-b+c=0\\Rightarrow x=-1$.',
        ],
        pitfall: 'Dùng Viète mà bỏ qua bước khẳng định $\\Delta\\ge0$ — mất điểm lập luận dù kết quả đúng.',
      });
    },
  },
  {
    id: 'g9.tf-duong-tron', topicId: 'g9-t6', grade: 9, level: 'TH', kind: 'TF',
    strand: 'HINH_HOC', tag: 'Đúng/Sai — góc với đường tròn và tứ giác nội tiếp',
    build: (r) => {
      const pool: Claim[] = [
        { t: 'Góc nội tiếp chắn nửa đường tròn là góc vuông', ok: true, why: 'cung bị chắn bằng $180\\deg$ nên góc nội tiếp bằng $90\\deg$.' },
        { t: 'Hai góc nội tiếp cùng chắn một cung thì bằng nhau', ok: true, why: 'cùng bằng nửa số đo cung bị chắn.' },
        { t: 'Góc ở tâm bằng nửa số đo cung bị chắn', ok: false, why: 'góc ở tâm **bằng** số đo cung bị chắn; góc **nội tiếp** mới bằng nửa.' },
        { t: 'Tứ giác có tổng hai góc đối bằng $180\\deg$ thì nội tiếp được đường tròn', ok: true, why: 'đó là dấu hiệu nhận biết tứ giác nội tiếp.' },
        { t: 'Mọi hình bình hành đều nội tiếp được đường tròn', ok: false, why: 'chỉ hình bình hành có hai góc đối bù nhau, tức **hình chữ nhật**, mới nội tiếp được.' },
        { t: 'Mọi hình chữ nhật đều nội tiếp được đường tròn', ok: true, why: 'bốn góc vuông nên tổng hai góc đối bằng $180\\deg$; tâm là giao hai đường chéo.' },
        { t: 'Góc tạo bởi tia tiếp tuyến và dây cung bằng góc nội tiếp cùng chắn cung đó', ok: true, why: 'cả hai đều bằng nửa số đo cung bị chắn.' },
        { t: 'Trong một đường tròn, dây lớn hơn thì gần tâm hơn', ok: true, why: 'khoảng cách từ tâm tới dây càng nhỏ thì dây càng dài.' },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Quy về **cung bị chắn**: góc ở tâm $=$ cung; góc nội tiếp và góc tiếp tuyến – dây $=\\f{1}{2}$ cung.',
          'Muốn chứng minh tứ giác nội tiếp: hai góc đối bù nhau, hoặc hai đỉnh kề cùng nhìn một cạnh dưới góc bằng nhau.',
        ],
        pitfall: 'Lẫn giữa góc ở tâm (bằng cung) và góc nội tiếp (bằng nửa cung) — sai một bước là hỏng cả bài.',
      });
    },
  },
  {
    id: 'g9.tf-he-thuc-luong', topicId: 'g9-t5', grade: 9, level: 'TH', kind: 'TF',
    strand: 'HINH_HOC', tag: 'Đúng/Sai — hệ thức lượng và tỉ số lượng giác',
    build: (r) => {
      const pool: Claim[] = [
        { t: 'Trong tam giác vuông, $\\sin$ góc nhọn bằng cạnh đối chia cạnh huyền', ok: true, why: 'định nghĩa tỉ số lượng giác.' },
        { t: 'Trong tam giác vuông, $\\tan$ góc nhọn bằng cạnh kề chia cạnh đối', ok: false, why: '$\\tan$ là **đối chia kề**; kề chia đối là $\\cot$.' },
        { t: '$\\sin^{2}\\alpha+\\cos^{2}\\alpha=1$ với mọi góc nhọn $\\alpha$', ok: true, why: 'hệ quả trực tiếp của định lí Pythagore.' },
        { t: 'Nếu $\\alpha$ và $\\beta$ phụ nhau thì $\\sin\\alpha=\\cos\\beta$', ok: true, why: 'hai góc phụ nhau đổi vai trò cạnh đối và cạnh kề cho nhau.' },
        { t: 'Với góc nhọn $\\alpha$ thì $\\sin\\alpha>1$ là điều có thể xảy ra', ok: false, why: 'cạnh đối luôn nhỏ hơn cạnh huyền nên $0<\\sin\\alpha<1$.' },
        { t: 'Trong tam giác vuông, bình phương mỗi cạnh góc vuông bằng tích cạnh huyền với hình chiếu của nó lên cạnh huyền', ok: true, why: 'hệ thức $b^{2}=ab\'$, $c^{2}=ac\'$.' },
        { t: 'Đường cao ứng với cạnh huyền có bình phương bằng tích hai cạnh góc vuông', ok: false, why: 'đúng phải là tích **hai hình chiếu**: $h^{2}=b\'c\'$.' },
        { t: 'Trong tam giác vuông, $\\f{1}{h^{2}}=\\f{1}{b^{2}}+\\f{1}{c^{2}}$', ok: true, why: 'hệ thức liên hệ đường cao với hai cạnh góc vuông.' },
      ];
      return tfFrom(r, pool, {
        thinking: [
          'Ghi nhớ bằng câu: **Sin Đi Học** (Đối/Huyền) · **Cos Không Hư** (Kề/Huyền) · **Tan Đoàn Kết** (Đối/Kề) · **Cot Kết Đoàn** (Kề/Đối).',
          'Bốn hệ thức lượng trong tam giác vuông: $b^{2}=ab\'$ · $c^{2}=ac\'$ · $h^{2}=b\'c\'$ · $ah=bc$.',
        ],
        pitfall: 'Nhầm $h^{2}=b\'c\'$ (tích hai **hình chiếu**) thành tích hai cạnh góc vuông.',
      });
    },
  },
];
