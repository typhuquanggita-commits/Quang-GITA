import type { ProblemType } from '@/types';

/* =====================================================================
   MATHGITA — DẠNG BÀI BỔ SUNG CHO KHỐI 9
   Trọng tâm: các dạng chắc chắn xuất hiện trong đề thi tuyển sinh vào 10.
   ===================================================================== */

export const EXTRA_TYPES_G9: Record<string, ProblemType[]> = {
  /* ---------------- Hệ phương trình ---------------- */
  'g9-t1': [
    {
      id: 'g9-t1-d4', name: 'Dạng 4. Bài toán tham số về số nghiệm của hệ', level: 'VDC',
      method: [
        'Viết hệ về dạng chuẩn $\\sys{ax+by=c\\\\a\'x+b\'y=c\'}$.',
        'So sánh các tỉ số: nghiệm duy nhất $\\Leftrightarrow\\f{a}{a\'}\\ne\\f{b}{b\'}$.',
        'Vô nghiệm $\\Leftrightarrow\\f{a}{a\'}=\\f{b}{b\'}\\ne\\f{c}{c\'}$; vô số nghiệm khi cả ba tỉ số bằng nhau.',
        'Luôn xét riêng trường hợp hệ số bằng 0 trước khi lập tỉ số.',
      ],
      skills: ['Biện luận theo tỉ số hệ số', 'Xét trường hợp đặc biệt'],
      pitfalls: [
        'Lập tỉ số khi mẫu có thể bằng 0.',
        'Quên trường hợp $m$ làm hệ số triệt tiêu.',
      ],
      worked: [{
        prompt: 'Tìm $m$ để hệ $\\sys{mx+y=3\\\\4x+my=6}$ có nghiệm duy nhất.',
        thinking: [
          'Hệ bậc nhất hai ẩn có nghiệm duy nhất khi hai tỉ số hệ số của $x$ và $y$ khác nhau.',
          'Điều kiện đó tương đương với định thức $ab\'-a\'b\\ne0$ — cách viết này an toàn vì không phải chia.',
        ],
        solution: [
          'Hệ có nghiệm duy nhất $\\Leftrightarrow m\\cdot m-4\\cdot1\\ne0$.',
          '$m^{2}-4\\ne0\\Leftrightarrow m\\ne2$ và $m\\ne-2$.',
          'Vậy hệ có nghiệm duy nhất khi $m\\ne\\pm2$.',
          'Kiểm tra: với $m=2$ hệ trở thành $\\sys{2x+y=3\\\\4x+2y=6}$ — hai phương trình tỉ lệ, hệ có vô số nghiệm.',
          'Với $m=-2$: $\\sys{-2x+y=3\\\\4x-2y=6}$, tức $-2x+y=3$ và $-2x+y=-3$ — mâu thuẫn, hệ vô nghiệm.',
        ],
        remark: 'Dùng điều kiện $ab\'-a\'b\\ne0$ thay cho tỉ số giúp tránh hoàn toàn bẫy chia cho 0.',
      }],
    },
    {
      id: 'g9-t1-d5', name: 'Dạng 5. Bài toán năng suất — làm chung, làm riêng (lập hệ)', level: 'VD',
      method: [
        'Coi toàn bộ công việc là 1; gọi thời gian làm riêng của mỗi đối tượng là ẩn.',
        'Năng suất mỗi giờ (ngày) là nghịch đảo của thời gian.',
        'Lập hệ theo hai tình huống đề cho, đặt ẩn phụ $u=\\f{1}{x}$, $v=\\f{1}{y}$.',
        'Giải hệ bậc nhất theo $u,v$ rồi quay về $x,y$ và đối chiếu điều kiện.',
      ],
      pitfalls: ['Cộng thời gian thay vì cộng năng suất.', 'Quên quay về ẩn ban đầu sau khi giải theo ẩn phụ.'],
      worked: [{
        prompt: 'Hai người cùng làm chung một công việc trong 12 giờ thì xong. Nếu người thứ nhất làm 4 giờ rồi nghỉ, người thứ hai làm tiếp 15 giờ thì hoàn thành công việc. Hỏi mỗi người làm riêng thì bao lâu xong?',
        thinking: [
          'Hai đại lượng chưa biết là thời gian làm riêng của hai người → hai ẩn, cần hai phương trình.',
          'Dữ kiện 1 cho phương trình về năng suất chung; dữ kiện 2 cho phương trình về khối lượng công việc từng người làm.',
        ],
        solution: [
          'Gọi thời gian người thứ nhất và người thứ hai làm riêng xong công việc lần lượt là $x$, $y$ (giờ; $x,y>12$).',
          'Trong 1 giờ, người thứ nhất làm được $\\f{1}{x}$ công việc, người thứ hai làm được $\\f{1}{y}$ công việc.',
          'Làm chung 12 giờ xong: $12\\left(\\f{1}{x}+\\f{1}{y}\\right)=1$. (1)',
          'Người thứ nhất làm 4 giờ, người thứ hai làm 15 giờ thì xong: $\\f{4}{x}+\\f{15}{y}=1$. (2)',
          'Đặt $u=\\f{1}{x}$, $v=\\f{1}{y}$ ($u,v>0$), ta được $\\sys{12u+12v=1\\\\4u+15v=1}$.',
          'Từ (1): $u+v=\\f{1}{12}\\Rightarrow u=\\f{1}{12}-v$. Thế vào (2): $4\\left(\\f{1}{12}-v\\right)+15v=1$.',
          '$\\f{1}{3}-4v+15v=1\\Rightarrow 11v=\\f{2}{3}\\Rightarrow v=\\f{2}{33}$.',
          '$u=\\f{1}{12}-\\f{2}{33}=\\f{11-8}{132}=\\f{3}{132}=\\f{1}{44}$.',
          'Vậy $x=44$ giờ, $y=\\f{33}{2}=16{,}5$ giờ (đều lớn hơn 12, thoả điều kiện).',
          'Kết luận: người thứ nhất làm riêng mất **44 giờ**, người thứ hai mất **16,5 giờ**.',
        ],
        remark: 'Luôn kiểm tra điều kiện “thời gian làm riêng phải lớn hơn thời gian làm chung” — đây là bước đối chiếu bắt buộc.',
      }],
    },
  ],

  /* ---------------- Căn thức ---------------- */
  'g9-t2': [
    {
      id: 'g9-t2-d4', name: 'Dạng 4. Rút gọn căn kép $\\s{a\\pm2\\s{b}}$', level: 'VDC',
      method: [
        'Nhận dạng: biểu thức dưới căn có dạng $a\\pm2\\s{b}$.',
        'Tìm hai số $m$, $n$ sao cho $m+n=a$ và $mn=b$.',
        'Khi đó $a\\pm2\\s{b}=(\\s{m}\\pm\\s{n})^{2}$, suy ra $\\s{a\\pm2\\s{b}}=\\abs{\\s{m}\\pm\\s{n}}$.',
        'Kiểm tra dấu: kết quả phải không âm.',
      ],
      skills: ['Nhận dạng bình phương ẩn dưới căn', 'Giải hệ tổng – tích'],
      pitfalls: ['Bỏ dấu giá trị tuyệt đối khi $\\s{m}<\\s{n}$.', 'Quên nhân đôi: dạng chuẩn phải là $2\\s{b}$, nếu đề cho $\\s{b}$ thì phải biến đổi trước.'],
      worked: [{
        prompt: 'Rút gọn $A=\\s{7+4\\s{3}}-\\s{7-4\\s{3}}$.',
        thinking: [
          'Đưa về dạng chuẩn: $4\\s{3}=2\\cdot2\\s{3}=2\\s{12}$, nên $7+4\\s{3}=7+2\\s{12}$.',
          'Tìm $m+n=7$, $mn=12$ → $m=4$, $n=3$.',
        ],
        solution: [
          '$7+4\\s{3}=7+2\\s{12}=4+2\\cdot2\\s{3}+3=(2+\\s{3})^{2}$.',
          '$7-4\\s{3}=(2-\\s{3})^{2}$.',
          '$A=\\abs{2+\\s{3}}-\\abs{2-\\s{3}}$.',
          'Vì $\\s{3}\\approx1{,}73<2$ nên $2-\\s{3}>0$, do đó $\\abs{2-\\s{3}}=2-\\s{3}$.',
          '$A=(2+\\s{3})-(2-\\s{3})=2\\s{3}$.',
        ],
        remark: 'Bước xét dấu $2-\\s{3}>0$ là chỗ phân loại: bỏ qua nó sẽ ra $A=0$ — sai hoàn toàn.',
      }],
    },
    {
      id: 'g9-t2-d5', name: 'Dạng 5. Giải phương trình chứa căn thức', level: 'VD',
      method: [
        'Đặt điều kiện cho biểu thức dưới căn không âm (và vế phải không âm nếu bình phương hai vế).',
        'Cô lập căn thức về một vế rồi bình phương hai vế.',
        'Giải phương trình thu được.',
        '**Thử lại** nghiệm vào phương trình gốc — bước bắt buộc vì bình phương có thể sinh nghiệm ngoại lai.',
      ],
      pitfalls: ['Bình phương khi vế phải âm.', 'Quên thử lại nghiệm.'],
      worked: [{
        prompt: 'Giải phương trình $\\s{2x+3}=x$.',
        thinking: [
          'Vế trái không âm nên vế phải cũng phải không âm: điều kiện $x\\ge0$.',
          'Biểu thức dưới căn: $2x+3\\ge0\\Leftrightarrow x\\ge-\\f{3}{2}$ — điều kiện này bị $x\\ge0$ bao hàm.',
        ],
        solution: [
          'Điều kiện: $x\\ge0$ (đồng thời $2x+3\\ge0$ luôn đúng khi $x\\ge0$).',
          'Bình phương hai vế: $2x+3=x^{2}\\Leftrightarrow x^{2}-2x-3=0$.',
          '$(x-3)(x+1)=0\\Rightarrow x=3$ hoặc $x=-1$.',
          'Đối chiếu điều kiện $x\\ge0$: loại $x=-1$.',
          'Thử lại $x=3$: $\\s{2\\cdot3+3}=\\s{9}=3$ ✓.',
          'Vậy phương trình có nghiệm duy nhất $x=3$.',
        ],
      }],
    },
  ],

  /* ---------------- Phương trình bậc hai — Viète ---------------- */
  'g9-t3': [
    {
      id: 'g9-t3-d4', name: 'Dạng 4. Tương giao parabol và đường thẳng', level: 'VD',
      method: [
        'Lập **phương trình hoành độ giao điểm**: cho hai biểu thức của $y$ bằng nhau.',
        'Đưa về phương trình bậc hai rồi tính $\\Delta$.',
        'Số giao điểm bằng số nghiệm: $\\Delta>0$ cắt tại hai điểm, $\\Delta=0$ tiếp xúc, $\\Delta<0$ không cắt.',
        'Muốn tìm toạ độ giao điểm: giải ra $x$ rồi thay ngược tìm $y$.',
      ],
      skills: ['Lập phương trình hoành độ giao điểm', 'Biện luận theo $\\Delta$'],
      pitfalls: ['Quên rằng “tiếp xúc” tương ứng với $\\Delta=0$, không phải $\\Delta<0$.'],
      worked: [{
        prompt: 'Cho parabol $(P): y=x^{2}$ và đường thẳng $(d): y=2(m-1)x-m^{2}+2m$. Tìm $m$ để $(d)$ cắt $(P)$ tại hai điểm phân biệt.',
        thinking: [
          'Số giao điểm = số nghiệm của phương trình hoành độ giao điểm.',
          'Hệ số của $x$ có dạng $2b\'$ nên dùng công thức $\\Delta\'$ cho gọn.',
        ],
        solution: [
          'Phương trình hoành độ giao điểm: $x^{2}=2(m-1)x-m^{2}+2m$.',
          '$\\Leftrightarrow x^{2}-2(m-1)x+m^{2}-2m=0$. (*)',
          '$\\Delta\'=(m-1)^{2}-(m^{2}-2m)=m^{2}-2m+1-m^{2}+2m=1$.',
          '$\\Delta\'=1>0$ với mọi $m$, nên (*) luôn có hai nghiệm phân biệt.',
          'Vậy với **mọi giá trị của $m$**, đường thẳng $(d)$ luôn cắt parabol $(P)$ tại hai điểm phân biệt.',
        ],
        remark: 'Khi $\\Delta$ rút gọn thành một hằng số dương, kết luận là “với mọi $m$” — đừng cố tìm điều kiện cho $m$ nữa.',
      }],
    },
    {
      id: 'g9-t3-d5', name: 'Dạng 5. Hệ thức độc lập với tham số', level: 'VDC',
      method: [
        'Viết $S$ và $P$ theo tham số $m$.',
        'Rút $m$ từ biểu thức đơn giản hơn (thường là $S$).',
        'Thế vào biểu thức còn lại để khử $m$.',
        'Thu gọn thành một hệ thức chỉ chứa $x_1$, $x_2$.',
      ],
      skills: ['Khử tham số', 'Biến đổi tương đương'],
      pitfalls: ['Quên nêu điều kiện phương trình có nghiệm trước khi dùng Viète.'],
      worked: [{
        prompt: 'Cho phương trình $x^{2}-2(m+1)x+2m=0$. Chứng minh phương trình luôn có hai nghiệm, rồi tìm hệ thức liên hệ giữa hai nghiệm không phụ thuộc $m$.',
        thinking: [
          'Chứng minh $\\Delta\'\\ge0$ bằng cách đưa về tổng bình phương.',
          'Sau đó viết $S$, $P$ theo $m$ rồi khử $m$.',
        ],
        solution: [
          '$\\Delta\'=(m+1)^{2}-2m=m^{2}+2m+1-2m=m^{2}+1>0$ với mọi $m$.',
          'Vậy phương trình luôn có hai nghiệm phân biệt với mọi $m$.',
          'Theo Viète: $S=x_1+x_2=2(m+1)=2m+2$ và $P=x_1x_2=2m$.',
          'Từ $P=2m$ suy ra $2m=P$; thay vào $S$: $S=P+2$.',
          'Vậy $x_1+x_2-x_1x_2-2=0$ — hệ thức này đúng với mọi $m$.',
        ],
        remark: 'Mẹo: chọn khử $m$ ở biểu thức nào có $m$ đứng “trần” nhất (ở đây là $P=2m$) để phép thế gọn nhất.',
      }],
    },
    {
      id: 'g9-t3-d6', name: 'Dạng 6. Điều kiện về dấu và vị trí của hai nghiệm', level: 'VDC',
      method: [
        'Hai nghiệm **trái dấu** $\\Leftrightarrow P<0$ (khi đó $\\Delta>0$ tự động).',
        'Hai nghiệm **cùng dương** $\\Leftrightarrow\\Delta\\ge0$, $S>0$, $P>0$.',
        'Hai nghiệm **cùng âm** $\\Leftrightarrow\\Delta\\ge0$, $S<0$, $P>0$.',
        'Luôn giao tất cả các điều kiện rồi mới kết luận.',
      ],
      skills: ['Lập hệ điều kiện', 'Giao nghiệm của nhiều bất phương trình'],
      pitfalls: [
        'Thêm điều kiện $\\Delta>0$ vào trường hợp trái dấu (thừa, nhưng không sai) — chỉ sai khi **thiếu** điều kiện.',
        'Quên giao các điều kiện, chỉ lấy điều kiện cuối cùng.',
      ],
      worked: [{
        prompt: 'Cho phương trình $x^{2}-2mx+m^{2}-4=0$. Tìm $m$ để phương trình có hai nghiệm dương phân biệt.',
        thinking: [
          'Hai nghiệm dương phân biệt cần đủ ba điều kiện: $\\Delta\'>0$, $S>0$, $P>0$.',
          'Giải từng bất phương trình rồi giao lại trên trục số.',
        ],
        solution: [
          '$\\Delta\'=m^{2}-(m^{2}-4)=4>0$ với mọi $m$ → luôn có hai nghiệm phân biệt. (1)',
          'Theo Viète: $S=2m$ và $P=m^{2}-4$.',
          '$S>0\\Leftrightarrow 2m>0\\Leftrightarrow m>0$. (2)',
          '$P>0\\Leftrightarrow m^{2}-4>0\\Leftrightarrow m<-2$ hoặc $m>2$. (3)',
          'Giao (1), (2), (3): $m>2$.',
          'Vậy $m>2$ thì phương trình có hai nghiệm dương phân biệt.',
        ],
        remark: 'Vẽ trục số để giao các điều kiện — cách này gần như không bao giờ sai, còn giao “trong đầu” thì rất dễ sót.',
      }],
    },
  ],

  /* ---------------- Hệ thức lượng ---------------- */
  'g9-t5': [
    {
      id: 'g9-t5-d3', name: 'Dạng 3. Giải tam giác vuông', level: 'VD',
      method: [
        'Vẽ hình, ghi rõ yếu tố đã biết.',
        'Biết hai cạnh: dùng Pythagore tìm cạnh còn lại, dùng tỉ số lượng giác tìm góc.',
        'Biết một cạnh và một góc nhọn: dùng $\\sin$, $\\cos$, $\\tan$ để tìm các cạnh còn lại.',
        'Góc nhọn còn lại lấy $90\\deg$ trừ góc đã biết.',
      ],
      skills: ['Chọn đúng tỉ số lượng giác', 'Làm tròn theo yêu cầu'],
      pitfalls: ['Nhầm cạnh kề với cạnh đối.', 'Dùng $\\sin$ khi lẽ ra phải dùng $\\tan$.'],
      worked: [{
        prompt: 'Tam giác $ABC$ vuông tại $A$ có $AB=6\\,cm$, $\\angle B=55\\deg$. Giải tam giác $ABC$ (làm tròn độ dài đến chữ số thập phân thứ nhất).',
        thinking: [
          '“Giải tam giác” nghĩa là tìm đủ tất cả các cạnh và góc chưa biết.',
          '$AB$ là cạnh kề của góc $B$; $AC$ là cạnh đối; $BC$ là cạnh huyền.',
        ],
        solution: [
          '$\\angle C=90\\deg-\\angle B=90\\deg-55\\deg=35\\deg$.',
          '$\\tan B=\\f{AC}{AB}\\Rightarrow AC=AB\\cdot\\tan55\\deg\\approx6\\cdot1{,}428\\approx8{,}6\\ (cm)$.',
          '$\\cos B=\\f{AB}{BC}\\Rightarrow BC=\\f{AB}{\\cos55\\deg}\\approx\\f{6}{0{,}574}\\approx10{,}5\\ (cm)$.',
          'Kiểm tra bằng Pythagore: $6^{2}+8{,}6^{2}=36+73{,}96=109{,}96$ và $10{,}5^{2}=110{,}25$ — sai lệch do làm tròn, chấp nhận được.',
        ],
        remark: 'Luôn kiểm tra chéo bằng Pythagore — nếu lệch nhiều thì chắc chắn đã chọn nhầm tỉ số lượng giác.',
      }],
    },
  ],

  /* ---------------- Đường tròn ---------------- */
  'g9-t6': [
    {
      id: 'g9-t6-d4', name: 'Dạng 4. Hai tiếp tuyến cắt nhau', level: 'VD',
      method: [
        'Từ điểm $M$ ngoài $(O)$ kẻ hai tiếp tuyến $MA$, $MB$: khai thác ngay ba kết quả.',
        '$MA=MB$ (hai tiếp tuyến cùng xuất phát từ một điểm).',
        '$MO$ là tia phân giác của $\\angle AMB$, đồng thời $OM$ là phân giác $\\angle AOB$.',
        '$MO$ là đường trung trực của $AB$, do đó $MO\\perp AB$ tại trung điểm $H$ của $AB$.',
        'Ngoài ra $MAOB$ nội tiếp đường tròn đường kính $MO$ (hai góc vuông đối nhau).',
      ],
      skills: ['Khai thác triệt để một giả thiết', 'Kết hợp tiếp tuyến với hệ thức lượng'],
      pitfalls: ['Chỉ dùng $MA=MB$ mà bỏ quên ba kết quả còn lại — thường là chỗ mắc ở ý c, d.'],
      worked: [{
        prompt: 'Cho $(O;R)$ và điểm $M$ với $OM=2R$. Kẻ hai tiếp tuyến $MA$, $MB$. Tính $MA$ và $\\angle AMB$.',
        thinking: [
          'Tiếp tuyến vuông góc bán kính tại tiếp điểm → tam giác $OAM$ vuông tại $A$.',
          'Biết cạnh huyền $OM=2R$ và một cạnh góc vuông $OA=R$ → dùng Pythagore và tỉ số lượng giác.',
        ],
        solution: [
          'Vì $MA$ là tiếp tuyến tại $A$ nên $OA\\perp MA$, tam giác $OAM$ vuông tại $A$.',
          'Theo Pythagore: $MA^{2}=OM^{2}-OA^{2}=(2R)^{2}-R^{2}=3R^{2}\\Rightarrow MA=R\\s{3}$.',
          '$\\sin\\angle AMO=\\f{OA}{OM}=\\f{R}{2R}=\\f{1}{2}\\Rightarrow\\angle AMO=30\\deg$.',
          'Vì $MO$ là phân giác của $\\angle AMB$ nên $\\angle AMB=2\\cdot30\\deg=60\\deg$.',
        ],
        remark: 'Cấu hình $OM=2R$ cho tam giác đều $MAB$ — một cấu hình quen thuộc, nên nhớ để nhận ra nhanh.',
      }],
    },
    {
      id: 'g9-t6-d5', name: 'Dạng 5. Câu phân loại — chứng minh điểm cố định, ba điểm thẳng hàng', level: 'VDC',
      method: [
        'Thử với **hai vị trí đặc biệt** của điểm di động để dự đoán kết quả (ví dụ khi điểm trùng đầu mút, khi hình trở nên đối xứng).',
        'Với điểm cố định: chỉ ra một đại lượng không đổi (khoảng cách tới một điểm cho trước, hoặc giao của hai đường cố định).',
        'Với ba điểm thẳng hàng: chứng minh hai góc kề bù, hoặc dùng tính chất tâm — trung điểm — trực tâm.',
        'Với hệ thức tích: quy về phương tích hoặc hai tam giác đồng dạng.',
      ],
      skills: ['Dự đoán trước, chứng minh sau', 'Nhận diện đại lượng không đổi'],
      pitfalls: ['Lao vào chứng minh khi chưa biết kết quả cần chứng minh trông như thế nào.'],
      worked: [{
        prompt: 'Cho nửa đường tròn $(O)$ đường kính $AB$, điểm $C$ di động trên nửa đường tròn. Gọi $H$ là hình chiếu của $C$ trên $AB$. Chứng minh $CH^{2}=AH\\cdot HB$ và tìm vị trí của $C$ để $CH$ lớn nhất.',
        thinking: [
          '$C$ thuộc nửa đường tròn đường kính $AB$ nên $\\angle ACB=90\\deg$ — tam giác $ACB$ vuông tại $C$.',
          '$CH$ là đường cao ứng với cạnh huyền → dùng ngay hệ thức lượng.',
          'Để tìm giá trị lớn nhất: $CH$ chính là khoảng cách từ $C$ tới $AB$, lớn nhất khi $C$ ở “đỉnh” nửa đường tròn.',
        ],
        solution: [
          'Vì $C$ thuộc đường tròn đường kính $AB$ nên $\\angle ACB=90\\deg$ (góc nội tiếp chắn nửa đường tròn).',
          'Tam giác $ACB$ vuông tại $C$, có đường cao $CH$ ứng với cạnh huyền $AB$.',
          'Theo hệ thức lượng: $CH^{2}=AH\\cdot HB$. (điều phải chứng minh)',
          'Mặt khác, $CH$ là khoảng cách từ điểm $C$ tới đường thẳng $AB$; mà $C$ luôn nằm trên đường tròn bán kính $R=\\f{AB}{2}$ tâm $O$.',
          'Do đó $CH\\le OC=R$, dấu “=” xảy ra khi $CH$ đi qua $O$, tức $H\\equiv O$ và $C$ là điểm chính giữa của nửa đường tròn.',
          'Vậy $CH$ lớn nhất bằng $R=\\f{AB}{2}$ khi $C$ là điểm chính giữa cung $AB$.',
        ],
        remark: 'Ý “tìm vị trí để lớn nhất” gần như luôn giải bằng cách chặn một đại lượng bởi bán kính hoặc bởi một đoạn cố định.',
      }],
    },
  ],
};
