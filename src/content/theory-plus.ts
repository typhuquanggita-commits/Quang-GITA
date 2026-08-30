import type { TheoryBlock } from '@/types';

/* =====================================================================
   MATHGITA — KHỐI LÝ THUYẾT BỔ SUNG
   Rà soát cho thấy phần lý thuyết mới đạt trung bình 2,4 khối mỗi chuyên
   đề (26/31 chuyên đề dưới 4 khối) và toàn kho chỉ có 2 ví dụ minh hoạ
   nằm trong lý thuyết. File này bổ sung để mỗi chuyên đề có tối thiểu 4
   khối lý thuyết, và **mỗi khối đều kèm ví dụ minh hoạ có lời giải** —
   đúng chuẩn "học lý thuyết là thấy ngay bài mẫu" của GITA.
   ===================================================================== */

export const EXTRA_THEORY: Record<string, TheoryBlock[]> = {
  /* ============================== KHỐI 6 ============================== */
  'g6-t4': [
    {
      heading: '4. Hai bài toán cơ bản về phân số',
      body: ['Mọi bài toán thực tế về phân số đều quy về một trong hai dạng dưới đây. Việc đầu tiên là xác định xem **số đã biết** là "toàn bộ" hay là "một phần".'],
      formulas: [
        '**Dạng 1** — Tìm $\\f{a}{b}$ của số $x$: lấy $x\\cdot\\f{a}{b}$.',
        '**Dạng 2** — Tìm số $x$ biết $\\f{a}{b}$ của nó bằng $c$: lấy $c:\\f{a}{b}$.',
      ],
      caution: [
        'Đọc kỹ để biết đề cho "toàn bộ" (dạng 1) hay cho "một phần" (dạng 2) — hai dạng ngược nhau.',
        'Với bài nhiều bước, "phần còn lại" ở bước sau được tính trên **số còn lại**, không phải trên số ban đầu.',
      ],
      examples: [{
        prompt: 'Một lớp có $40$ học sinh. Số học sinh giỏi chiếm $\\f{1}{4}$ số học sinh cả lớp. Số học sinh khá bằng $\\f{2}{3}$ số học sinh còn lại. Tính số học sinh khá.',
        solve: [
          'Số học sinh giỏi: $40\\cdot\\f{1}{4}=10$ (học sinh) — đây là dạng 1.',
          'Số học sinh **còn lại** sau khi trừ học sinh giỏi: $40-10=30$ (học sinh).',
          'Số học sinh khá: $30\\cdot\\f{2}{3}=20$ (học sinh).',
          'Chú ý: $\\f{2}{3}$ tính trên $30$ (số còn lại), **không** phải trên $40$.',
        ],
      }],
    },
    {
      heading: '5. Tính hợp lí với phân số',
      body: ['Đề ghi "tính hợp lí" hoặc "tính nhanh" là đã cài sẵn cấu trúc đẹp — tính thẳng là rơi vào bẫy mất thời gian.'],
      formulas: [
        'Tìm **nhân tử chung** rồi đặt ra ngoài: $ab+ac=a(b+c)$.',
        'Ghép cặp cho **tổng tròn**: các phân số đối nhau triệt tiêu.',
        'Tách **sai phân**: $\\f{1}{n(n+1)}=\\f{1}{n}-\\f{1}{n+1}$.',
      ],
      caution: ['Sau khi nhóm, luôn kiểm tra lại biểu thức có còn đúng bằng ban đầu hay không.'],
      examples: [{
        prompt: 'Tính hợp lí: $A=\\f{5}{7}\\cdot\\f{3}{11}+\\f{5}{7}\\cdot\\f{8}{11}$.',
        solve: [
          'Hai hạng tử có chung thừa số $\\f{5}{7}$, đặt ra ngoài:',
          '$A=\\f{5}{7}\\left(\\f{3}{11}+\\f{8}{11}\\right)=\\f{5}{7}\\cdot\\f{11}{11}=\\f{5}{7}\\cdot1=\\f{5}{7}$.',
        ],
      }],
    },
  ],
  'g6-t5': [
    {
      heading: '4. Ba bài toán về tỉ số phần trăm',
      body: ['Tỉ số phần trăm chỉ là phân số có mẫu $100$. Ba dạng dưới đây phủ toàn bộ đề thi.'],
      formulas: [
        'Tìm $a\\%$ của $x$: lấy $x\\cdot\\f{a}{100}$.',
        'Tìm $x$ biết $a\\%$ của nó bằng $c$: lấy $c:\\f{a}{100}$.',
        'Tìm tỉ số phần trăm của $a$ so với $b$: lấy $\\f{a}{b}\\cdot100\\%$.',
      ],
      caution: ['Ở dạng 3, mẫu số là đại lượng **được so sánh với** — chọn sai mẫu là sai toàn bài.'],
      examples: [{
        prompt: 'Một cửa hàng nhập $250$ chiếc áo, đã bán được $180$ chiếc. Tính tỉ số phần trăm số áo đã bán so với số áo nhập về.',
        solve: [
          'Đại lượng "được so sánh với" là số áo nhập về ($250$) nên nó là mẫu số.',
          'Tỉ số phần trăm $=\\f{180}{250}\\cdot100\\%=72\\%$.',
          'Vậy cửa hàng đã bán được $72\\%$ số áo nhập về.',
        ],
      }],
    },
    {
      heading: '5. Bài toán tăng giá — giảm giá liên tiếp',
      body: ['Điểm mấu chốt: phần trăm ở bước sau được tính trên **giá trị mới**, nên phải **nhân** các hệ số chứ không cộng trừ.'],
      formulas: [
        'Tăng $a\\%$: nhân với $\\left(1+\\f{a}{100}\\right)$.',
        'Giảm $b\\%$: nhân với $\\left(1-\\f{b}{100}\\right)$.',
        'Tăng rồi giảm: nhân liên tiếp cả hai hệ số.',
      ],
      caution: ['Tăng $10\\%$ rồi giảm $10\\%$ **không** trở về giá ban đầu, vì mốc tính đã thay đổi.'],
      examples: [{
        prompt: 'Một chiếc áo giá $500\\,000$ đồng được tăng giá $20\\%$, sau đó giảm giá $20\\%$. Tính giá cuối cùng.',
        solve: [
          'Sau khi tăng $20\\%$: $500\\,000\\cdot1{,}2=600\\,000$ (đồng).',
          'Sau khi giảm $20\\%$ trên giá mới: $600\\,000\\cdot0{,}8=480\\,000$ (đồng).',
          'Giá cuối cùng là $480\\,000$ đồng — **thấp hơn** giá ban đầu $20\\,000$ đồng.',
          'Lý do: $20\\%$ khi giảm được tính trên $600\\,000$, lớn hơn $20\\%$ khi tăng tính trên $500\\,000$.',
        ],
      }],
    },
  ],
  'g6-t6': [
    {
      heading: '3. Diện tích hình ghép',
      body: ['Diện tích có tính **cộng được** khi các phần không chồng lên nhau. Nhờ đó mọi hình phức tạp đều tính được bằng cách chia nhỏ hoặc khoét bớt.'],
      formulas: [
        'Hình ghép vào nhau: **cộng** diện tích các phần.',
        'Hình bị khoét rỗng: lấy diện tích lớn **trừ** diện tích phần khoét.',
        'Chia hình sao cho các phần **không chồng lấn**.',
      ],
      caution: ['Chia chồng lấn sẽ tính thừa một phần diện tích — vẽ đường chia rõ ràng lên hình trước khi tính.'],
      examples: [{
        prompt: 'Một mảnh đất hình chữ nhật dài $25$ m, rộng $16$ m. Người ta xây một cái nhà hình vuông cạnh $9$ m trên mảnh đất đó. Tính diện tích phần đất còn lại.',
        solve: [
          'Diện tích mảnh đất: $25\\cdot16=400\\;(m^{2})$.',
          'Diện tích cái nhà: $9\\cdot9=81\\;(m^{2})$.',
          'Diện tích phần đất còn lại: $400-81=319\\;(m^{2})$.',
        ],
      }],
    },
    {
      heading: '4. Đổi đơn vị đo diện tích và thể tích',
      body: ['Đơn vị độ dài đổi theo bậc $1$, nhưng diện tích đổi theo **bậc 2** và thể tích theo **bậc 3**. Đây là lỗi mất điểm số một của chuyên đề.'],
      formulas: [
        'Độ dài: $1\\;m=10\\;dm=100\\;cm$.',
        'Diện tích: $1\\;m^{2}=100\\;dm^{2}=10\\,000\\;cm^{2}$.',
        'Thể tích: $1\\;m^{3}=1000\\;dm^{3}=1\\,000\\,000\\;cm^{3}$.',
        'Dung tích: $1\\;dm^{3}=1$ lít; $1\\;m^{3}=1000$ lít.',
      ],
      caution: ['Đổi diện tích theo bậc $1$ (nhân $100$ thay vì $10\\,000$) là lỗi rất phổ biến.'],
      examples: [{
        prompt: 'Nền một căn phòng có diện tích $30\\;m^{2}$. Hỏi cần bao nhiêu viên gạch hình vuông cạnh $40$ cm để lát kín nền?',
        solve: [
          'Đổi cạnh viên gạch: $40\\;cm=0{,}4\\;m$.',
          'Diện tích mỗi viên gạch: $0{,}4\\cdot0{,}4=0{,}16\\;(m^{2})$.',
          'Số viên gạch cần dùng: $30:0{,}16=187{,}5$, làm tròn lên thành $188$ viên.',
          'Phải làm tròn **lên** vì thiếu một viên thì không lát kín được nền.',
        ],
      }],
    },
  ],
  'g6-t7': [
    {
      heading: '3. Ba quan hệ cơ bản của điểm và đoạn thẳng',
      body: ['Mọi bài tính độ dài của chuyên đề đều xuất phát từ ba quan hệ dưới đây. Việc cần làm là dịch lời đề bài thành đẳng thức.'],
      formulas: [
        '$M$ nằm giữa $A$ và $B$ $\\Rightarrow AM+MB=AB$.',
        '$M$ là trung điểm của $AB$ $\\Leftrightarrow$ $M$ nằm giữa **và** $MA=MB=\\f{AB}{2}$.',
        'Trên tia $Ox$ có $OA<OB$ $\\Rightarrow$ $A$ nằm giữa $O$ và $B$.',
      ],
      caution: ['Trung điểm cần **cả hai** điều kiện; chỉ có $MA=MB$ thì $M$ có thể nằm ngoài đoạn thẳng.'],
      examples: [{
        prompt: 'Trên tia $Ox$ lấy hai điểm $A$, $B$ sao cho $OA=4$ cm, $OB=8$ cm. Chứng tỏ $A$ là trung điểm của $OB$.',
        solve: [
          '$A$, $B$ cùng thuộc tia $Ox$ và $OA=4<8=OB$ nên $A$ nằm giữa $O$ và $B$. (1)',
          'Do đó $OA+AB=OB\\Rightarrow 4+AB=8\\Rightarrow AB=4$ (cm).',
          'Vậy $OA=AB=4$ cm. (2)',
          'Từ (1) và (2) suy ra $A$ là trung điểm của đoạn $OB$.',
        ],
      }],
    },
    {
      heading: '4. Góc và tia phân giác',
      body: ['Góc được đo bằng độ; tia nằm giữa cho phép **cộng góc** giống như điểm nằm giữa cho phép cộng đoạn thẳng.'],
      formulas: [
        'Tia $Oy$ nằm giữa $Ox$ và $Oz$ $\\Rightarrow\\angle xOy+\\angle yOz=\\angle xOz$.',
        '$Ot$ là phân giác của $\\angle xOy$ $\\Rightarrow\\angle xOt=\\angle tOy=\\f{1}{2}\\angle xOy$.',
        'Hai góc kề bù có tổng bằng $180\\deg$; hai góc phụ nhau có tổng bằng $90\\deg$.',
      ],
      caution: ['Phải lập luận tia nằm giữa **trước** khi dùng hệ thức cộng góc.'],
      examples: [{
        prompt: 'Cho $\\angle xOy=120\\deg$. Vẽ tia $Ot$ là phân giác của $\\angle xOy$. Tính $\\angle xOt$ và cho biết $\\angle tOy$ bằng bao nhiêu.',
        solve: [
          '$Ot$ là phân giác của $\\angle xOy$ nên $\\angle xOt=\\angle tOy=\\f{1}{2}\\angle xOy$.',
          '$\\angle xOt=\\f{1}{2}\\cdot120\\deg=60\\deg$.',
          'Do đó $\\angle tOy=60\\deg$.',
          'Kiểm tra: $\\angle xOt+\\angle tOy=60\\deg+60\\deg=120\\deg=\\angle xOy$ ✓',
        ],
      }],
    },
  ],
  'g6-t8': [
    {
      heading: '3. Đọc và phân tích biểu đồ',
      body: ['Mỗi loại biểu đồ phục vụ một mục đích riêng. Chọn đúng loại và đọc đúng thang chia là hai kỹ năng cốt lõi.'],
      formulas: [
        'Biểu đồ **tranh**: mỗi hình tượng trưng cho một số lượng (khoá quy đổi).',
        'Biểu đồ **cột**: so sánh số lượng giữa các nhóm.',
        'Biểu đồ **quạt tròn**: thể hiện tỉ lệ so với toàn bộ, cả hình ứng với $100\\%$.',
      ],
      caution: ['Luôn đọc **khoá quy đổi** và **thang chia** trước khi lấy số liệu.'],
      examples: [{
        prompt: 'Một biểu đồ cho biết lớp 6A có $45$ học sinh, trong đó $40\\%$ thích Toán, $\\f{1}{3}$ thích Văn, còn lại thích Anh. Tính số học sinh thích môn Anh.',
        solve: [
          'Số học sinh thích Toán: $45\\cdot40\\%=45\\cdot0{,}4=18$ (học sinh).',
          'Số học sinh thích Văn: $45\\cdot\\f{1}{3}=15$ (học sinh).',
          'Số học sinh thích Anh: $45-18-15=12$ (học sinh).',
        ],
      }],
    },
    {
      heading: '4. Ba loại biến cố và xác suất thực nghiệm',
      body: ['Phân loại biến cố giúp xác định ngay khoảng giá trị của xác suất trước khi tính.'],
      formulas: [
        'Biến cố **chắc chắn**: luôn xảy ra, $P=1$.',
        'Biến cố **không thể**: không bao giờ xảy ra, $P=0$.',
        'Biến cố **ngẫu nhiên**: có thể xảy ra hoặc không, $0<P<1$.',
        'Xác suất thực nghiệm $=\\f{\\text{số lần xảy ra}}{\\text{số lần thực hiện}}$.',
      ],
      caution: ['Xác suất luôn thuộc đoạn từ $0$ đến $1$ — nếu tính ra ngoài khoảng này thì chắc chắn đã sai.'],
      examples: [{
        prompt: 'Gieo một con xúc xắc $60$ lần, thấy mặt $6$ chấm xuất hiện $12$ lần. Tính xác suất thực nghiệm của biến cố "xuất hiện mặt $6$ chấm" và so sánh với xác suất lí thuyết.',
        solve: [
          'Xác suất thực nghiệm: $\\f{12}{60}=\\f{1}{5}=0{,}2$.',
          'Xác suất lí thuyết: con xúc xắc có $6$ mặt đồng khả năng nên $P=\\f{1}{6}\\approx0{,}167$.',
          'Xác suất thực nghiệm ($0{,}2$) lớn hơn lí thuyết ($\\approx0{,}167$) một chút.',
          'Điều này bình thường; gieo càng nhiều lần thì hai giá trị càng gần nhau.',
        ],
      }],
    },
  ],

  /* ============================== KHỐI 7 ============================== */
  'g7-t1': [
    {
      heading: '4. Số thập phân hữu hạn và vô hạn tuần hoàn',
      body: ['Mọi số hữu tỉ đều viết được dưới dạng thập phân hữu hạn hoặc vô hạn **tuần hoàn**. Dấu hiệu phân biệt nằm ở mẫu của phân số tối giản.'],
      formulas: [
        'Phân số **tối giản** có mẫu chỉ chứa ước nguyên tố $2$ và $5$ $\\Rightarrow$ thập phân **hữu hạn**.',
        'Mẫu có ước nguyên tố khác $2$, $5$ $\\Rightarrow$ thập phân **vô hạn tuần hoàn**.',
        '$0,(d)=\\f{d}{9}$ ; $0,(\\ov{d_1d_2})=\\f{\\ov{d_1d_2}}{99}$.',
      ],
      caution: ['Phải rút gọn về tối giản **trước** khi xét mẫu; $\\f{6}{15}=\\f{2}{5}$ vẫn là thập phân hữu hạn.'],
      examples: [{
        prompt: 'Viết số thập phân vô hạn tuần hoàn $2,(7)$ dưới dạng phân số tối giản.',
        solve: [
          'Đặt $x=2,(7)=2{,}7777\\dots$',
          'Nhân hai vế với $10$: $10x=27{,}7777\\dots$',
          'Trừ theo vế: $10x-x=27{,}777\\dots-2{,}777\\dots=25$, tức $9x=25$.',
          '$x=\\f{25}{9}$. Phân số này đã tối giản vì $\\text{ƯCLN}(25;9)=1$.',
        ],
      }],
    },
  ],
  'g7-t2': [
    {
      heading: '4. Bài toán chia phần theo tỉ lệ',
      body: ['Dạng bài xuất hiện gần như chắc chắn trong đề học kì. Điểm phân biệt là chia **tỉ lệ thuận** hay **tỉ lệ nghịch**.'],
      formulas: [
        'Chia $M$ thành ba phần **tỉ lệ thuận** với $a$, $b$, $c$: đặt $\\f{x}{a}=\\f{y}{b}=\\f{z}{c}=\\f{M}{a+b+c}$.',
        'Chia $M$ thành ba phần **tỉ lệ nghịch** với $a$, $b$, $c$: chia tỉ lệ thuận với $\\f{1}{a}$, $\\f{1}{b}$, $\\f{1}{c}$.',
      ],
      caution: ['Nhận dạng qua ngữ cảnh: năng suất cao thì thời gian ít $\\Rightarrow$ tỉ lệ nghịch.'],
      examples: [{
        prompt: 'Chia số $650$ thành ba phần tỉ lệ thuận với $2$, $5$, $6$. Tìm ba phần đó.',
        solve: [
          'Gọi ba phần là $x$, $y$, $z$. Theo đề: $\\f{x}{2}=\\f{y}{5}=\\f{z}{6}$ và $x+y+z=650$.',
          'Theo tính chất dãy tỉ số bằng nhau: $\\f{x}{2}=\\f{y}{5}=\\f{z}{6}=\\f{x+y+z}{2+5+6}=\\f{650}{13}=50$.',
          'Suy ra $x=2\\cdot50=100$ ; $y=5\\cdot50=250$ ; $z=6\\cdot50=300$.',
          'Kiểm tra: $100+250+300=650$ ✓',
        ],
      }],
    },
  ],
  'g7-t3': [
    {
      heading: '4. Nghiệm của đa thức một biến',
      body: ['Nghiệm là giá trị của biến làm đa thức **triệt tiêu**. Đây là cầu nối giữa đa thức và phương trình.'],
      formulas: [
        '$x=a$ là nghiệm của $P(x)$ $\\Leftrightarrow P(a)=0$.',
        'Đa thức bậc nhất $ax+b$ ($a\\ne0$) có đúng **một** nghiệm $x=-\\f{b}{a}$.',
        'Đa thức bậc $n$ có **không quá** $n$ nghiệm.',
      ],
      caution: ['Đa thức dạng tổng bình phương cộng hằng số dương (như $x^{2}+1$) **vô nghiệm** trên tập số thực.'],
      examples: [{
        prompt: 'Tìm $m$ để đa thức $P(x)=x^{2}-mx+6$ nhận $x=2$ làm nghiệm.',
        solve: [
          '$x=2$ là nghiệm nghĩa là $P(2)=0$.',
          '$P(2)=2^{2}-m\\cdot2+6=4-2m+6=10-2m$.',
          'Cho $10-2m=0\\Rightarrow m=5$.',
          'Thử lại với $m=5$: $P(x)=x^{2}-5x+6$, có $P(2)=4-10+6=0$ ✓',
        ],
      }],
    },
  ],
  'g7-t4': [
    {
      heading: '3. Dấu hiệu nhận biết và tính chất hai đường thẳng song song',
      body: ['Cùng một bộ ba cặp góc dùng được theo **hai chiều**: từ góc suy ra song song (dấu hiệu), và từ song song suy ra góc (tính chất).'],
      formulas: [
        'So le trong **bằng nhau** $\\Leftrightarrow$ hai đường thẳng song song.',
        'Đồng vị **bằng nhau** $\\Leftrightarrow$ hai đường thẳng song song.',
        'Trong cùng phía **bù nhau** $\\Leftrightarrow$ hai đường thẳng song song.',
        'Hai đường cùng vuông góc (hoặc cùng song song) với đường thứ ba thì song song với nhau.',
      ],
      caution: ['Phải xác định rõ **cát tuyến** nào đang xét; dùng góc ở hai cát tuyến khác nhau là lập luận sai.'],
      examples: [{
        prompt: 'Cho hai đường thẳng $a$, $b$ bị cắt bởi cát tuyến $c$. Biết một góc so le trong bằng $65\\deg$. Tính góc trong cùng phía với nó, biết $a\\para b$.',
        solve: [
          'Vì $a\\para b$ nên góc so le trong còn lại cũng bằng $65\\deg$.',
          'Góc trong cùng phía **bù** với góc so le trong đó.',
          'Số đo góc trong cùng phía: $180\\deg-65\\deg=115\\deg$.',
        ],
      }],
    },
    {
      heading: '4. Kỹ thuật kẻ đường phụ song song',
      body: ['Khi cần tính góc tại một điểm nằm "kẹp" giữa hai đường song song, không có cặp góc nào dùng trực tiếp được. Giải pháp là tạo thêm một đường song song đi qua điểm đó.'],
      formulas: [
        'Qua điểm cần tính, kẻ tia song song với hai đường đã cho.',
        'Đường phụ tách góc lớn thành hai góc con.',
        'Mỗi góc con so le trong với một góc đã biết.',
      ],
      caution: ['Chỉ kẻ **một** đường phụ; kẻ nhiều làm hình rối và lập luận khó theo dõi.'],
      examples: [{
        prompt: 'Cho $Ax\\para By$, điểm $C$ nằm giữa hai đường. Biết $\\angle xAC=45\\deg$, $\\angle yBC=30\\deg$. Tính $\\angle ACB$.',
        solve: [
          'Qua $C$ kẻ tia $Cz\\para Ax$; vì $Ax\\para By$ nên $Cz\\para By$.',
          '$\\angle ACz=\\angle xAC=45\\deg$ (so le trong, $Cz\\para Ax$).',
          '$\\angle zCB=\\angle yBC=30\\deg$ (so le trong, $Cz\\para By$).',
          'Tia $Cz$ nằm giữa hai tia $CA$, $CB$ nên $\\angle ACB=45\\deg+30\\deg=75\\deg$.',
        ],
      }],
    },
  ],
  'g7-t6': [
    {
      heading: '4. Bài toán thực tế với hình khối',
      body: ['Hình khối gắn với đời sống qua ba câu hỏi: cần bao nhiêu vật liệu (diện tích), chứa được bao nhiêu (thể tích), và hết bao nhiêu tiền (chi phí).'],
      formulas: [
        'Bọc, dán, sơn, làm hộp $\\to$ dùng **diện tích**.',
        'Chứa nước, cát, hàng hoá $\\to$ dùng **thể tích**.',
        'Chi phí $=$ đại lượng hình học $\\times$ đơn giá — tính ở **một bước riêng**.',
      ],
      caution: ['Đọc kỹ vật có nắp hay không; đổi đơn vị trước khi tính, không đổi ở bước cuối.'],
      examples: [{
        prompt: 'Một bể nước dạng hình hộp chữ nhật dài $2$ m, rộng $1{,}5$ m, cao $1{,}2$ m. Hỏi bể chứa đầy được bao nhiêu lít nước?',
        solve: [
          'Thể tích bể: $V=2\\cdot1{,}5\\cdot1{,}2=3{,}6\\;(m^{3})$.',
          'Đổi sang lít: $1\\;m^{3}=1000$ lít nên $V=3{,}6\\cdot1000=3\\,600$ (lít).',
          'Vậy bể chứa đầy được $3\\,600$ lít nước.',
        ],
      }],
    },

    {
      heading: '2. Hình hộp chữ nhật và hình lập phương',
      body: ['Hai khối cơ bản nhất của hình học trực quan. Hình lập phương là trường hợp riêng của hình hộp chữ nhật khi ba kích thước bằng nhau.'],
      formulas: [
        'Hình hộp chữ nhật: $S_{xq}=2(a+b)\\cdot h$ ; $S_{tp}=S_{xq}+2ab$ ; $V=abh$.',
        'Hình lập phương cạnh $a$: $S_{xq}=4a^{2}$ ; $S_{tp}=6a^{2}$ ; $V=a^{3}$.',
      ],
      caution: ['Vật **không nắp** thì chỉ cộng **một** mặt đáy vào diện tích xung quanh.'],
      examples: [{
        prompt: 'Một bể cá dạng hình hộp chữ nhật không nắp, dài $80$ cm, rộng $50$ cm, cao $40$ cm. Tính diện tích kính cần dùng.',
        solve: [
          'Diện tích xung quanh: $S_{xq}=2(80+50)\\cdot40=2\\cdot130\\cdot40=10\\,400\\;(cm^{2})$.',
          'Diện tích một mặt đáy: $80\\cdot50=4\\,000\\;(cm^{2})$.',
          'Bể không nắp nên diện tích kính: $10\\,400+4\\,000=14\\,400\\;(cm^{2})$.',
        ],
      }],
    },
    {
      heading: '3. Hình lăng trụ đứng tam giác và tứ giác',
      body: ['Lăng trụ đứng có hai đáy bằng nhau và song song, các mặt bên đều là hình chữ nhật.'],
      formulas: [
        '$S_{xq}=C_{\\text{đáy}}\\cdot h$ (chu vi đáy nhân chiều cao).',
        '$S_{tp}=S_{xq}+2S_{\\text{đáy}}$.',
        '$V=S_{\\text{đáy}}\\cdot h$.',
      ],
      caution: ['Chiều cao lăng trụ là khoảng cách giữa hai đáy, **không** phải chiều cao của tam giác đáy.'],
      examples: [{
        prompt: 'Một lăng trụ đứng có đáy là tam giác vuông với hai cạnh góc vuông $3$ cm, $4$ cm; chiều cao lăng trụ là $10$ cm. Tính thể tích và diện tích xung quanh.',
        solve: [
          'Cạnh huyền của đáy: $\\s{3^{2}+4^{2}}=\\s{25}=5$ (cm).',
          'Diện tích đáy: $S=\\f{3\\cdot4}{2}=6\\;(cm^{2})$. Chu vi đáy: $C=3+4+5=12$ (cm).',
          'Thể tích: $V=6\\cdot10=60\\;(cm^{3})$.',
          'Diện tích xung quanh: $S_{xq}=12\\cdot10=120\\;(cm^{2})$.',
        ],
      }],
    },
  ],
  'g7-t7': [
    {
      heading: '3. Biểu đồ hình quạt tròn và biểu đồ đoạn thẳng',
      body: ['Mỗi loại biểu đồ trả lời một câu hỏi khác nhau: quạt tròn cho **tỉ lệ**, đoạn thẳng cho **xu hướng theo thời gian**.'],
      formulas: [
        'Quạt tròn: tỉ lệ $=\\f{\\text{phần}}{\\text{tổng}}\\cdot100\\%$ ; góc ở tâm $=\\f{\\text{phần}}{\\text{tổng}}\\cdot360\\deg$.',
        'Đoạn thẳng: độ dốc lên là tăng, dốc xuống là giảm, dốc càng đứng biến động càng mạnh.',
        'Mức tăng $=\\f{\\text{mới}-\\text{cũ}}{\\text{cũ}}\\cdot100\\%$.',
      ],
      caution: ['Tổng các tỉ lệ phải bằng $100\\%$ và tổng các góc phải bằng $360\\deg$ — luôn cộng lại để kiểm tra.'],
      examples: [{
        prompt: 'Doanh thu của một cửa hàng năm 2023 là $800$ triệu, năm 2024 là $920$ triệu. Tính mức tăng phần trăm của năm 2024 so với năm 2023.',
        solve: [
          'Phần tăng thêm: $920-800=120$ (triệu đồng).',
          'Mốc so sánh là năm **cũ** (2023) nên mẫu số là $800$.',
          'Mức tăng: $\\f{120}{800}\\cdot100\\%=15\\%$.',
        ],
      }],
    },
    {
      heading: '4. Xác suất của biến cố đồng khả năng',
      body: ['Công thức xác suất lí thuyết chỉ dùng được khi mọi kết quả có **cùng khả năng xảy ra**.'],
      formulas: [
        '$P(A)=\\f{\\text{số kết quả thuận lợi}}{\\text{tổng số kết quả đồng khả năng}}$.',
        '$0\\le P(A)\\le1$ với mọi biến cố $A$.',
        'Biến cố chắc chắn $P=1$; biến cố không thể $P=0$.',
      ],
      caution: ['Đếm sót kết quả thuận lợi là lỗi phổ biến — nên liệt kê ra giấy thay vì nhẩm.'],
      examples: [{
        prompt: 'Một hộp có $20$ thẻ đánh số từ $1$ đến $20$. Rút ngẫu nhiên một thẻ. Tính xác suất rút được thẻ ghi số chia hết cho $3$.',
        solve: [
          'Tổng số kết quả: $20$ (mỗi thẻ một kết quả, đồng khả năng).',
          'Các số từ $1$ đến $20$ chia hết cho $3$ là: $3;6;9;12;15;18$ — có $6$ số.',
          '$P=\\f{6}{20}=\\f{3}{10}=0{,}3$.',
        ],
      }],
    },
  ],

  /* ============================== KHỐI 8 ============================== */
  'g8-t1': [
    {
      heading: '4. Ứng dụng hằng đẳng thức để tính nhanh',
      body: ['Hằng đẳng thức không chỉ dùng để khai triển mà còn là công cụ tính nhẩm rất mạnh với các số gần tròn chục, tròn trăm.'],
      formulas: [
        '$99^{2}=(100-1)^{2}=10\\,000-200+1=9\\,801$.',
        '$101\\cdot99=(100+1)(100-1)=100^{2}-1=9\\,999$.',
        '$a^{2}-b^{2}=(a-b)(a+b)$ — dùng cho hiệu hai bình phương lớn.',
      ],
      caution: ['Nhận dạng đúng dạng hằng đẳng thức trước khi tách; tách sai sẽ dài hơn tính trực tiếp.'],
      examples: [{
        prompt: 'Tính nhanh giá trị của $A=2024^{2}-2023^{2}$.',
        solve: [
          'Nhận ra đây là **hiệu hai bình phương**: $A=(2024-2023)(2024+2023)$.',
          '$A=1\\cdot4047=4047$.',
          'Nếu bình phương từng số rồi trừ sẽ mất rất nhiều thời gian và dễ sai.',
        ],
      }],
    },
  ],
  'g8-t2': [
    {
      heading: '3. Điều kiện xác định và rút gọn phân thức',
      body: ['Hai bước bắt buộc mở đầu mọi bài phân thức. Bỏ qua bước điều kiện là mất điểm ngay cả khi kết quả đúng.'],
      formulas: [
        '$\\f{A}{B}$ xác định $\\Leftrightarrow B\\ne0$.',
        'Rút gọn: phân tích tử và mẫu thành nhân tử rồi chia cho **nhân tử chung**.',
        'Chỉ rút gọn được nhân tử chung, **không** rút từng hạng tử của một tổng.',
      ],
      caution: ['Phân tích mẫu thành nhân tử rồi cho **từng** nhân tử khác $0$ — mẫu $x^{2}-a^{2}$ cho **hai** điều kiện.'],
      examples: [{
        prompt: 'Tìm điều kiện xác định và rút gọn phân thức $P=\\f{x^{2}-9}{x^{2}+3x}$.',
        solve: [
          'Mẫu: $x^{2}+3x=x(x+3)$. Điều kiện xác định: $x\\ne0$ và $x\\ne-3$.',
          'Tử: $x^{2}-9=(x-3)(x+3)$.',
          '$P=\\f{(x-3)(x+3)}{x(x+3)}=\\f{x-3}{x}$ (rút gọn nhân tử chung $x+3$).',
        ],
      }],
    },
    {
      heading: '4. Bốn phép tính với phân thức',
      body: ['Quy tắc hoàn toàn giống phân số, chỉ khác là tử và mẫu nay là đa thức.'],
      formulas: [
        'Cộng, trừ: quy đồng mẫu thức rồi cộng trừ tử, giữ nguyên mẫu.',
        'Nhân: $\\f{A}{B}\\cdot\\f{C}{D}=\\f{AC}{BD}$.',
        'Chia: $\\f{A}{B}:\\f{C}{D}=\\f{A}{B}\\cdot\\f{D}{C}$ (nhân với nghịch đảo).',
      ],
      caution: ['Mẫu thức chung nên lấy **BCNN** của các mẫu, không lấy tích — tích cho biểu thức cồng kềnh.'],
      examples: [{
        prompt: 'Thực hiện phép tính $A=\\f{1}{x-2}+\\f{4}{x^{2}-4}$ (với $x\\ne\\pm2$).',
        solve: [
          'Phân tích mẫu thứ hai: $x^{2}-4=(x-2)(x+2)$ — đây là mẫu thức chung.',
          '$A=\\f{x+2}{(x-2)(x+2)}+\\f{4}{(x-2)(x+2)}=\\f{x+2+4}{(x-2)(x+2)}$.',
          '$A=\\f{x+6}{(x-2)(x+2)}=\\f{x+6}{x^{2}-4}$.',
        ],
      }],
    },
  ],
  'g8-t3': [
    {
      heading: '4. Ba bước giải bài toán bằng cách lập phương trình',
      body: ['Quy trình cố định cho mọi bài toán đố. Mất điểm ở dạng này thường không phải do tính sai mà do thiếu bước.'],
      formulas: [
        '**Bước 1**: Gọi ẩn, ghi rõ **đơn vị** và **điều kiện** của ẩn.',
        '**Bước 2**: Biểu diễn các đại lượng còn lại theo ẩn, rồi lập phương trình.',
        '**Bước 3**: Giải phương trình và **đối chiếu điều kiện**, kết luận.',
      ],
      caution: [
        'Thiếu điều kiện của ẩn hoặc thiếu bước đối chiếu đều bị trừ điểm.',
        'Bài chuyển động nên lập bảng ba cột: quãng đường – vận tốc – thời gian.',
      ],
      examples: [{
        prompt: 'Một người đi xe máy từ $A$ đến $B$ với vận tốc $40$ km/h, lúc về đi với vận tốc $50$ km/h nên thời gian về ít hơn thời gian đi $30$ phút. Tính quãng đường $AB$.',
        solve: [
          'Gọi quãng đường $AB$ là $x$ (km; $x>0$).',
          'Thời gian đi: $\\f{x}{40}$ (giờ); thời gian về: $\\f{x}{50}$ (giờ).',
          'Đổi $30$ phút $=\\f{1}{2}$ giờ. Thời gian về ít hơn nên: $\\f{x}{40}-\\f{x}{50}=\\f{1}{2}$.',
          'Nhân hai vế với $200$: $5x-4x=100\\Rightarrow x=100$.',
          '$x=100>0$ thoả điều kiện. Vậy quãng đường $AB$ dài $100$ km.',
        ],
      }],
    },
  ],
  'g8-t4': [
    {
      heading: '4. Bài toán thực tế với hàm số bậc nhất',
      body: ['Nhiều tình huống thực tế có dạng "một khoản cố định cộng một khoản thay đổi theo đơn vị" — đó chính là hàm số bậc nhất.'],
      formulas: [
        'Hằng số $b$ $=$ **giá trị ban đầu** (khoản trả ngay cả khi $x=0$).',
        'Hệ số góc $a$ $=$ **mức thay đổi trên mỗi đơn vị**.',
        'Công thức: $y=ax+b$, kèm điều kiện thực tế của $x$.',
      ],
      caution: ['Kết quả phải đối chiếu điều kiện thực tế: số giờ, số người, số sản phẩm đều nguyên và không âm.'],
      examples: [{
        prompt: 'Một hãng taxi tính $12\\,000$ đồng cho ki-lô-mét đầu tiên và $9\\,000$ đồng cho mỗi ki-lô-mét tiếp theo. Lập công thức tính số tiền $y$ khi đi $x$ km ($x\\ge1$) và tính tiền khi đi $8$ km.',
        solve: [
          'Sau ki-lô-mét đầu, còn $(x-1)$ km tính giá $9\\,000$ đồng.',
          '$y=12\\,000+9\\,000(x-1)=9\\,000x+3\\,000$ (đồng), với $x\\ge1$.',
          'Với $x=8$: $y=9\\,000\\cdot8+3\\,000=75\\,000$ (đồng).',
        ],
      }],
    },

    {
      heading: '2. Hàm số bậc nhất và đồ thị',
      body: ['Hàm số bậc nhất có dạng $y=ax+b$ với $a\\ne0$. Đồ thị là một đường thẳng, xác định bởi đúng **hai điểm**.'],
      formulas: [
        '$a$ là **hệ số góc**, quyết định độ dốc; $b$ là **tung độ gốc**.',
        '$a>0$: hàm số đồng biến (đồ thị đi lên). $a<0$: nghịch biến (đồ thị đi xuống).',
        'Giao trục tung: $(0;b)$. Giao trục hoành: $\\left(-\\f{b}{a};0\\right)$.',
      ],
      caution: ['Điều kiện $a\\ne0$ là bắt buộc; nếu $a=0$ thì $y=b$ là hàm hằng, không phải hàm bậc nhất.'],
      examples: [{
        prompt: 'Vẽ đồ thị hàm số $y=2x-4$ bằng cách xác định giao điểm với hai trục toạ độ.',
        solve: [
          'Cho $x=0$: $y=-4$, được điểm $A(0;-4)$ trên trục tung.',
          'Cho $y=0$: $2x-4=0\\Rightarrow x=2$, được điểm $B(2;0)$ trên trục hoành.',
          'Vẽ đường thẳng đi qua hai điểm $A(0;-4)$ và $B(2;0)$ — đó là đồ thị cần tìm.',
          'Vì $a=2>0$ nên hàm số đồng biến, đồ thị đi lên từ trái sang phải.',
        ],
      }],
    },
    {
      heading: '3. Vị trí tương đối của hai đường thẳng',
      body: ['So sánh cặp hệ số $(a;b)$ của hai đường thẳng là biết ngay chúng cắt nhau, song song hay trùng nhau.'],
      formulas: [
        'Cắt nhau $\\Leftrightarrow a\\ne a\'$.',
        'Song song $\\Leftrightarrow a=a\'$ **và** $b\\ne b\'$.',
        'Trùng nhau $\\Leftrightarrow a=a\'$ **và** $b=b\'$.',
        'Vuông góc $\\Leftrightarrow a\\cdot a\'=-1$.',
      ],
      caution: ['Bài "tìm $m$ để hai đường song song" phải kèm điều kiện $b\\ne b\'$; thiếu thì hai đường có thể **trùng** nhau.'],
      examples: [{
        prompt: 'Tìm $m$ để đường thẳng $(d_1): y=(m-1)x+3$ song song với $(d_2): y=2x-5$.',
        solve: [
          'Điều kiện song song: $m-1=2$ và $3\\ne-5$.',
          'Từ $m-1=2$ suy ra $m=3$.',
          'Kiểm tra tung độ gốc: $3\\ne-5$ ✓ (nếu bằng nhau thì hai đường trùng, không song song).',
          'Ngoài ra cần $m-1\\ne0$ tức $m\\ne1$ — với $m=3$ thoả mãn.',
          'Vậy $m=3$.',
        ],
      }],
    },
  ],
  'g8-t5': [
    {
      heading: '3. Sơ đồ nhận biết các tứ giác đặc biệt',
      body: ['Các hình đặc biệt xếp theo sơ đồ từ **chung tới riêng**: mỗi bước đi lên cần thêm đúng một điều kiện.'],
      formulas: [
        'Tứ giác $\\to$ **hình thang** (một cặp cạnh đối song song).',
        'Hình thang $\\to$ **hình bình hành** (thêm cặp cạnh đối còn lại song song).',
        'Hình bình hành $+$ một góc vuông (hoặc hai chéo bằng nhau) $\\to$ **hình chữ nhật**.',
        'Hình bình hành $+$ hai cạnh kề bằng nhau (hoặc hai chéo vuông góc) $\\to$ **hình thoi**.',
        'Có cả hai điều kiện trên $\\to$ **hình vuông**.',
      ],
      caution: ['Luôn chứng minh là hình bình hành **trước**, rồi mới thêm điều kiện — nhảy thẳng lên hình vuông là thiếu bước.'],
      examples: [{
        prompt: 'Cho tam giác $ABC$ vuông tại $A$, $M$ là trung điểm $BC$. Trên tia đối của tia $MA$ lấy $D$ sao cho $MD=MA$. Chứng minh $ABDC$ là hình chữ nhật.',
        solve: [
          'Tứ giác $ABDC$ có hai đường chéo $AD$ và $BC$.',
          '$M$ là trung điểm $BC$ (giả thiết) và cũng là trung điểm $AD$ (vì $MD=MA$).',
          'Hai đường chéo cắt nhau tại trung điểm mỗi đường nên $ABDC$ là **hình bình hành**.',
          'Lại có $\\angle BAC=90\\deg$, mà hình bình hành có một góc vuông là hình chữ nhật.',
          'Vậy $ABDC$ là hình chữ nhật.',
        ],
      }],
    },
    {
      heading: '4. Đường trung bình của tam giác và hình thang',
      body: ['Công cụ tạo ra quan hệ song song "từ không có gì" — chỉ cần hai trung điểm là dùng được.'],
      formulas: [
        'Tam giác: nối trung điểm hai cạnh $\\Rightarrow$ song song cạnh thứ ba và bằng **nửa** cạnh ấy.',
        'Hình thang: nối trung điểm hai cạnh bên $\\Rightarrow$ song song hai đáy và bằng **nửa tổng** hai đáy.',
        'Tam giác vuông: trung tuyến ứng với cạnh huyền bằng **nửa cạnh huyền**.',
      ],
      caution: ['Tam giác lấy nửa **một** cạnh; hình thang lấy nửa **tổng hai** đáy — hai công thức khác nhau.'],
      examples: [{
        prompt: 'Cho hình thang $ABCD$ ($AB\\para CD$) có $AB=6$ cm, đường trung bình $MN=10$ cm. Tính $CD$.',
        solve: [
          '$MN$ là đường trung bình của hình thang nên $MN=\\f{AB+CD}{2}$.',
          '$10=\\f{6+CD}{2}\\Rightarrow 6+CD=20\\Rightarrow CD=14$ (cm).',
        ],
      }],
    },
  ],
  'g8-t6': [
    {
      heading: '4. Định lí Thalès và ứng dụng đo đạc',
      body: ['Thalès là nguồn duy nhất sinh ra tỉ lệ đoạn thẳng ở chuyên đề này, và cũng là công cụ đo gián tiếp những vật không với tới được.'],
      formulas: [
        'Thuận: $MN\\para BC$ $\\Rightarrow\\f{AM}{MB}=\\f{AN}{NC}$.',
        'Hệ quả: $MN\\para BC\\Rightarrow\\f{AM}{AB}=\\f{AN}{AC}=\\f{MN}{BC}$.',
        'Đảo: nếu các đoạn tương ứng tỉ lệ thì $MN\\para BC$.',
      ],
      caution: ['Viết tỉ số phải theo đúng thứ tự đỉnh tương ứng; đảo thứ tự là sai kết quả.'],
      examples: [{
        prompt: 'Một cột đèn cao $7$ m có bóng trên mặt đất dài $4$ m. Cùng lúc đó, một toà nhà có bóng dài $80$ m. Tính chiều cao toà nhà.',
        solve: [
          'Cùng thời điểm nên tia nắng tạo với mặt đất góc như nhau, hai tam giác vuông đồng dạng.',
          'Tỉ lệ: $\\f{\\text{chiều cao cột}}{\\text{bóng cột}}=\\f{\\text{chiều cao nhà}}{\\text{bóng nhà}}$, tức $\\f{7}{4}=\\f{h}{80}$.',
          '$h=\\f{7\\cdot80}{4}=140$ (m). Vậy toà nhà cao $140$ m.',
        ],
      }],
    },

    {
      heading: '3. Ba trường hợp đồng dạng của tam giác',
      body: ['Đồng dạng nghĩa là **cùng hình dạng**, có thể khác kích thước. Ba trường hợp song song với ba trường hợp bằng nhau của lớp 7.'],
      formulas: [
        '**c.c.c**: ba cặp cạnh tương ứng tỉ lệ.',
        '**c.g.c**: hai cặp cạnh tỉ lệ và góc **xen giữa** bằng nhau.',
        '**g.g**: hai cặp góc tương ứng bằng nhau.',
        'Tỉ số đồng dạng $k$: mọi độ dài tỉ lệ theo $k$, riêng **diện tích** theo $k^{2}$.',
      ],
      caution: ['Ưu tiên trường hợp **g.g** — nhanh nhất vì góc dễ tìm hơn cạnh, nhất là khi có song song hoặc đường cao.'],
      examples: [{
        prompt: 'Cho $\\tri ABC\\sim\\tri DEF$ theo tỉ số $k=\\f{2}{3}$. Biết chu vi $\\tri ABC$ bằng $20$ cm và diện tích $\\tri DEF$ bằng $45\\;cm^{2}$. Tính chu vi $\\tri DEF$ và diện tích $\\tri ABC$.',
        solve: [
          'Chu vi là đại lượng độ dài nên tỉ lệ theo $k$: $\\f{P_{ABC}}{P_{DEF}}=k=\\f{2}{3}$.',
          '$P_{DEF}=\\f{20\\cdot3}{2}=30$ (cm).',
          'Diện tích tỉ lệ theo $k^{2}$: $\\f{S_{ABC}}{S_{DEF}}=k^{2}=\\f{4}{9}$.',
          '$S_{ABC}=45\\cdot\\f{4}{9}=20\\;(cm^{2})$.',
        ],
      }],
    },
  ],
  'g8-t7': [
    {
      heading: '4. Ứng dụng Pythagore trong thực tế',
      body: ['Hễ bài toán có yếu tố **vuông góc** (tường - đất, cột - mặt phẳng, đường chéo hình chữ nhật) là dùng được Pythagore.'],
      formulas: [
        'Đường chéo hình chữ nhật kích thước $a\\times b$: $d=\\s{a^{2}+b^{2}}$.',
        'Đường chéo hình vuông cạnh $a$: $d=a\\s{2}$.',
        'Khoảng cách theo đường chim bay khi biết hai đoạn vuông góc.',
      ],
      caution: ['Phải chỉ rõ tam giác nào vuông tại đâu trước khi áp dụng định lí.'],
      examples: [{
        prompt: 'Một mảnh vườn hình chữ nhật dài $12$ m, rộng $9$ m. Tính độ dài đường chéo của mảnh vườn.',
        solve: [
          'Đường chéo cùng hai cạnh tạo thành tam giác vuông.',
          '$d=\\s{12^{2}+9^{2}}=\\s{144+81}=\\s{225}=15$ (m).',
          'Nhận xét: đây là bộ ba $(9;12;15)$, tức bộ $(3;4;5)$ nhân ba.',
        ],
      }],
    },

    {
      heading: '2. Định lí Pythagore thuận và đảo',
      body: ['Một định lí dùng được theo hai chiều: chiều thuận để **tính cạnh**, chiều đảo để **nhận biết** tam giác vuông.'],
      formulas: [
        'Thuận: tam giác vuông tại $A$ $\\Rightarrow BC^{2}=AB^{2}+AC^{2}$.',
        'Đảo: $BC^{2}=AB^{2}+AC^{2}$ (với $BC$ lớn nhất) $\\Rightarrow$ tam giác vuông tại $A$.',
        'Bộ ba Pythagore hay gặp: $(3;4;5)$, $(6;8;10)$, $(5;12;13)$, $(8;15;17)$, $(9;12;15)$.',
      ],
      caution: ['Cạnh huyền luôn là cạnh **lớn nhất** và đối diện góc vuông — xác định sai là sai toàn bài.'],
      examples: [{
        prompt: 'Tam giác có ba cạnh $9$ cm, $12$ cm, $15$ cm. Hỏi tam giác đó có vuông không?',
        solve: [
          'Cạnh lớn nhất là $15$ cm, ta kiểm tra định lí Pythagore đảo.',
          '$9^{2}+12^{2}=81+144=225$ và $15^{2}=225$.',
          'Vì $9^{2}+12^{2}=15^{2}$ nên tam giác đó **vuông**, với cạnh huyền là cạnh $15$ cm.',
        ],
      }],
    },
    {
      heading: '3. Hình chóp tam giác đều và tứ giác đều',
      body: ['Hình chóp đều có đáy là đa giác đều, các mặt bên là tam giác cân bằng nhau. Hai đại lượng dễ nhầm là **trung đoạn** và **chiều cao**.'],
      formulas: [
        '$S_{xq}=\\f{1}{2}\\cdot C_{\\text{đáy}}\\cdot d$ với $d$ là **trung đoạn** (đường cao mặt bên).',
        '$S_{tp}=S_{xq}+S_{\\text{đáy}}$ (hình chóp chỉ có **một** đáy).',
        '$V=\\f{1}{3}\\cdot S_{\\text{đáy}}\\cdot h$ với $h$ là **chiều cao** hình chóp.',
      ],
      caution: ['Trung đoạn nằm **trên mặt bên** (dùng cho diện tích); chiều cao nằm **bên trong** hình chóp (dùng cho thể tích).'],
      examples: [{
        prompt: 'Hình chóp tứ giác đều có đáy là hình vuông cạnh $10$ cm, trung đoạn $13$ cm, chiều cao $12$ cm. Tính diện tích toàn phần và thể tích.',
        solve: [
          'Chu vi đáy: $C=4\\cdot10=40$ (cm). Diện tích đáy: $S=10\\cdot10=100\\;(cm^{2})$.',
          '$S_{xq}=\\f{1}{2}\\cdot40\\cdot13=260\\;(cm^{2})$ — dùng **trung đoạn**.',
          '$S_{tp}=260+100=360\\;(cm^{2})$.',
          '$V=\\f{1}{3}\\cdot100\\cdot12=400\\;(cm^{3})$ — dùng **chiều cao**.',
        ],
      }],
    },
  ],
  'g8-t8': [
    {
      heading: '4. Đọc và phân tích biểu đồ thống kê',
      body: ['Kỹ năng đọc biểu đồ được kiểm tra ở cả câu trắc nghiệm lẫn câu tự luận thực tế.'],
      formulas: [
        'Bước 1: đọc **tên biểu đồ**, **đơn vị** và **thang chia**.',
        'Bước 2: lập bảng thống kê từ biểu đồ trước khi tính.',
        'Bước 3: trả lời câu hỏi dựa trên bảng, không đọc trực tiếp từ hình.',
      ],
      caution: ['Đọc trực tiếp từ biểu đồ dễ sót hoặc nhầm cột — lập bảng trung gian an toàn hơn.'],
      examples: [{
        prompt: 'Biểu đồ cột cho biết số xe bán ra bốn quý: Q1 $=120$, Q2 $=150$, Q3 $=90$, Q4 $=180$. Tính số xe trung bình mỗi quý và quý nào tăng mạnh nhất so với quý trước.',
        solve: [
          'Tổng số xe cả năm: $120+150+90+180=540$ (xe).',
          'Trung bình mỗi quý: $540:4=135$ (xe).',
          'Mức thay đổi: Q2 tăng $30$; Q3 giảm $60$; Q4 tăng $90$.',
          'Vậy quý IV tăng mạnh nhất, tăng $90$ xe so với quý III.',
        ],
      }],
    },

    {
      heading: '2. Thu thập, phân loại và biểu diễn dữ liệu',
      body: ['Dữ liệu chia thành hai loại, và mỗi loại phù hợp với những biểu đồ khác nhau.'],
      formulas: [
        'Dữ liệu **định lượng** (số đo): dùng biểu đồ cột, đoạn thẳng, histogram.',
        'Dữ liệu **định tính** (loại, màu, tên): dùng biểu đồ cột, quạt tròn.',
        'Tần số: số lần xuất hiện. Tần số tương đối $=\\f{\\text{tần số}}{N}\\cdot100\\%$.',
      ],
      caution: ['Biểu đồ quạt tròn chỉ dùng khi các phần **hợp thành một toàn thể**; không dùng cho dữ liệu chồng lấn.'],
      examples: [{
        prompt: 'Khảo sát $50$ học sinh về môn thể thao yêu thích: Bóng đá $20$, Cầu lông $15$, Bơi $10$, khác $5$. Lập bảng tần số tương đối.',
        solve: [
          'Bóng đá: $\\f{20}{50}\\cdot100\\%=40\\%$.',
          'Cầu lông: $\\f{15}{50}\\cdot100\\%=30\\%$.',
          'Bơi: $\\f{10}{50}\\cdot100\\%=20\\%$. Khác: $\\f{5}{50}\\cdot100\\%=10\\%$.',
          'Kiểm tra: $40\\%+30\\%+20\\%+10\\%=100\\%$ ✓',
        ],
      }],
    },
    {
      heading: '3. Xác suất lí thuyết và xác suất thực nghiệm',
      body: ['Hai khái niệm khác nhau nhưng liên hệ chặt chẽ: khi số lần thử tăng, xác suất thực nghiệm tiến gần xác suất lí thuyết.'],
      formulas: [
        'Lí thuyết: $P=\\f{\\text{số kết quả thuận lợi}}{\\text{tổng số kết quả đồng khả năng}}$.',
        'Thực nghiệm: $P=\\f{\\text{số lần xảy ra}}{\\text{số lần thử}}$.',
        'Ước lượng số lần xảy ra trong $n$ lần thử: lấy $P\\cdot n$.',
      ],
      caution: ['Công thức lí thuyết chỉ đúng khi các kết quả **đồng khả năng**; nếu không, phải dùng thực nghiệm.'],
      examples: [{
        prompt: 'Một hộp có $6$ bi đỏ và $4$ bi xanh. Lấy ngẫu nhiên một viên. Tính xác suất lấy được bi đỏ và ước lượng số lần được bi đỏ nếu lấy $200$ lần (có hoàn lại).',
        solve: [
          'Tổng số bi: $6+4=10$, các viên đồng khả năng được chọn.',
          'Xác suất lấy được bi đỏ: $P=\\f{6}{10}=0{,}6$.',
          'Ước lượng số lần được bi đỏ trong $200$ lần: $0{,}6\\cdot200=120$ (lần).',
        ],
      }],
    },
  ],

  /* ============================== KHỐI 9 ============================== */
  'g9-t1': [
    {
      heading: '4. Bài toán có tham số về hệ phương trình',
      body: ['Dạng phân loại của chuyên đề: tìm giá trị tham số để hệ có nghiệm thoả một điều kiện cho trước.'],
      formulas: [
        'Hệ có nghiệm **duy nhất** $\\Leftrightarrow\\f{a}{a\'}\\ne\\f{b}{b\'}$.',
        'Có điều kiện phụ (như $x=y$): thay vào phương trình **không chứa tham số** trước.',
        'Cuối cùng phải kiểm tra giá trị tham số tìm được có bảo đảm hệ có nghiệm hay không.',
      ],
      caution: ['Giải hệ theo tham số trước rồi mới áp điều kiện là cách dài và dễ sai dấu.'],
      examples: [{
        prompt: 'Cho hệ $\\sys{x+y=6\\\\mx-y=3}$. Tìm $m$ để hệ có nghiệm thoả mãn $x=2y$.',
        solve: [
          'Thay $x=2y$ vào phương trình không chứa $m$: $2y+y=6\\Rightarrow y=2$, do đó $x=4$.',
          'Thay $(x;y)=(4;2)$ vào phương trình thứ hai: $4m-2=3\\Rightarrow m=\\f{5}{4}$.',
          'Kiểm tra nghiệm duy nhất: $\\f{1}{m}\\ne\\f{1}{-1}$ với $m=\\f{5}{4}$ ✓',
          'Vậy $m=\\f{5}{4}$.',
        ],
      }],
    },

    {
      heading: '3. Giải bài toán bằng cách lập hệ phương trình',
      body: ['Khi bài toán có **hai** đại lượng chưa biết và **hai** dữ kiện ràng buộc, lập hệ hai ẩn sẽ tự nhiên hơn lập phương trình một ẩn.'],
      formulas: [
        'Số ẩn phải bằng số phương trình lập được.',
        'Mỗi tình huống trong đề cho **một** phương trình.',
        'Bài chuyển động ngược dòng: $v_{\\text{xuôi}}=v+v_n$ ; $v_{\\text{ngược}}=v-v_n$.',
      ],
      caution: ['Vẫn phải đặt điều kiện cho cả hai ẩn và đối chiếu ở cuối, giống bài một ẩn.'],
      examples: [{
        prompt: 'Hai lớp 9A và 9B có tổng cộng $80$ học sinh. Nếu chuyển $5$ học sinh từ 9A sang 9B thì hai lớp bằng nhau. Tính số học sinh mỗi lớp.',
        solve: [
          'Gọi số học sinh lớp 9A là $x$, lớp 9B là $y$ ($x$, $y$ nguyên dương).',
          'Tổng số học sinh: $x+y=80$. (1)',
          'Sau khi chuyển: $x-5=y+5$, tức $x-y=10$. (2)',
          'Cộng (1) và (2): $2x=90\\Rightarrow x=45$; thay vào (1) được $y=35$.',
          'Cả hai đều nguyên dương ✓. Vậy lớp 9A có $45$ học sinh, lớp 9B có $35$ học sinh.',
        ],
      }],
    },
  ],
  'g9-t2': [
    {
      heading: '4. Rút gọn biểu thức chứa căn và bài toán phụ',
      body: ['Đây là câu 1 của hầu hết đề tuyển sinh vào 10, luôn gồm ba ý: rút gọn — tính giá trị — bài toán phụ.'],
      formulas: [
        'Bước 1: đặt **điều kiện xác định** (mọi biểu thức dưới căn $\\ge0$, mọi mẫu $\\ne0$).',
        'Bước 2: đặt $t=\\s{x}$ để đưa về phân thức quen thuộc, phân tích mẫu thành nhân tử.',
        'Bước 3: quy đồng, rút gọn, rồi trả lời từng ý.',
      ],
      caution: ['Ý "tìm $x$ để $P$ nguyên": tách phần nguyên rồi cho mẫu là ước, cuối cùng **đối chiếu điều kiện**.'],
      examples: [{
        prompt: 'Cho $P=\\f{\\s{x}}{\\s{x}-2}$ với $x>0$, $x\\ne4$. Tìm các giá trị $x$ là số chính phương để $P$ nhận giá trị nguyên.',
        solve: [
          'Tách phần nguyên: $P=\\f{(\\s{x}-2)+2}{\\s{x}-2}=1+\\f{2}{\\s{x}-2}$.',
          'Đặt $t=\\s{x}$; vì $x$ chính phương nên $t$ nguyên dương, $t\\ne2$.',
          '$P$ nguyên $\\Leftrightarrow(t-2)$ là ước của $2$, tức $t-2\\in\\{1;-1;2;-2\\}$.',
          'Suy ra $t\\in\\{3;1;4;0\\}$; loại $t=0$ vì $x>0$. Còn $t\\in\\{1;3;4\\}$.',
          'Vậy $x\\in\\{1;9;16\\}$ (đều thoả $x>0$, $x\\ne4$).',
        ],
      }],
    },
  ],
  'g9-t3': [
    {
      heading: '4. Tương giao giữa parabol và đường thẳng',
      body: ['Bài toán trọng tâm của đề vào 10. Toàn bộ quy về **phương trình hoành độ giao điểm** rồi dùng $\\Delta$ và Viète.'],
      formulas: [
        'Lập phương trình hoành độ giao điểm: cho hai vế phải bằng nhau.',
        '$\\Delta>0$: cắt tại hai điểm phân biệt · $\\Delta=0$: tiếp xúc · $\\Delta<0$: không cắt.',
        'Điều kiện về nghiệm quy về $S$ và $P$ theo Viète.',
      ],
      caution: ['Luôn khẳng định $\\Delta>0$ **trước** khi dùng Viète — thiếu bước này là mất điểm lập luận.'],
      examples: [{
        prompt: 'Cho $(P): y=x^{2}$ và $(d): y=2x+3$. Tìm toạ độ giao điểm của $(P)$ và $(d)$.',
        solve: [
          'Phương trình hoành độ giao điểm: $x^{2}=2x+3\\Leftrightarrow x^{2}-2x-3=0$.',
          '$\\Delta\'=1+3=4>0$ nên có hai nghiệm phân biệt: $x_1=-1$, $x_2=3$.',
          'Thay vào $(P)$: với $x=-1$ được $y=1$; với $x=3$ được $y=9$.',
          'Vậy hai giao điểm là $A(-1;1)$ và $B(3;9)$.',
        ],
      }],
    },
  ],
  'g9-t4': [
    {
      heading: '4. Cực trị của biểu thức',
      body: ['Ba bước bắt buộc: chứng minh chặn — chỉ ra dấu bằng — kết luận. Thiếu bước hai thì chưa chứng minh được đó là cực trị.'],
      formulas: [
        'Hoàn thành bình phương: $ax^{2}+bx+c=a\\left(x+\\f{b}{2a}\\right)^{2}+\\f{4ac-b^{2}}{4a}$.',
        'Cô-si: $a+b\\ge2\\s{ab}$ với $a,b\\ge0$; dấu $=$ khi $a=b$.',
        'Phân thức tử dương: lớn nhất khi **mẫu nhỏ nhất và dương**.',
      ],
      caution: ['Dự đoán **điểm rơi** trước khi biến đổi; áp Cô-si tuỳ tiện thì dấu bằng không xảy ra được.'],
      examples: [{
        prompt: 'Tìm giá trị nhỏ nhất của $A=x^{2}-6x+11$.',
        solve: [
          'Hoàn thành bình phương: $A=x^{2}-6x+9+2=(x-3)^{2}+2$.',
          'Vì $(x-3)^{2}\\ge0$ với mọi $x$ nên $A\\ge2$.',
          'Dấu "$=$" xảy ra khi $x-3=0$, tức $x=3$.',
          'Vậy $A_{\\min}=2$ khi $x=3$.',
        ],
      }],
    },

    {
      heading: '2. Bất phương trình bậc nhất một ẩn',
      body: ['Giải giống phương trình bậc nhất, chỉ khác một điểm sống còn: nhân hoặc chia cho số **âm** thì phải đổi chiều.'],
      formulas: [
        'Cộng, trừ cùng một số vào hai vế: **giữ nguyên** chiều.',
        'Nhân, chia hai vế cho số **dương**: giữ nguyên chiều.',
        'Nhân, chia hai vế cho số **âm**: **ĐỔI CHIỀU**.',
        'Biểu diễn tập nghiệm: dấu $>$, $<$ dùng ngoặc mở; dấu $\\ge$, $\\le$ tô đặc điểm mút.',
      ],
      caution: ['Mẫu chứa ẩn thì chưa biết dấu — không nhân chéo, phải chuyển về một vế rồi xét dấu.'],
      examples: [{
        prompt: 'Giải bất phương trình $3-2x>7$ và biểu diễn tập nghiệm trên trục số.',
        solve: [
          '$3-2x>7\\Leftrightarrow -2x>4$.',
          'Chia hai vế cho $-2$ (số **âm**) nên **đổi chiều**: $x<-2$.',
          'Tập nghiệm: $S=\\{x\\;|\\;x<-2\\}$.',
          'Trên trục số: đánh dấu $-2$ bằng ngoặc **mở**, gạch bỏ phần bên phải.',
        ],
      }],
    },
    {
      heading: '3. Chứng minh bất đẳng thức',
      body: ['Hai công cụ nền tảng: tổng bình phương (dùng được với mọi số thực) và Cô-si (chỉ dùng cho số không âm).'],
      formulas: [
        'Tổng bình phương: chuyển về một vế rồi ghép thành $(\\dots)^{2}+(\\dots)^{2}\\ge0$.',
        'Cô-si hai số: $a+b\\ge2\\s{ab}$ với $a,b\\ge0$, dấu $=$ khi $a=b$.',
        'Ba bước bắt buộc: chứng minh bất đẳng thức — chỉ ra dấu bằng xảy ra khi nào — kết luận.',
      ],
      caution: ['Đề không cho điều kiện dương thì **không dùng được Cô-si**; phải đi bằng tổng bình phương.'],
      examples: [{
        prompt: 'Chứng minh rằng $a^{2}+b^{2}\\ge2ab$ với mọi số thực $a$, $b$.',
        solve: [
          'Chuyển về một vế: cần chứng minh $a^{2}+b^{2}-2ab\\ge0$.',
          'Nhận ra hằng đẳng thức: $a^{2}-2ab+b^{2}=(a-b)^{2}$.',
          'Vì $(a-b)^{2}\\ge0$ với mọi $a$, $b$ nên bất đẳng thức đúng.',
          'Dấu "$=$" xảy ra khi $a-b=0$, tức $a=b$.',
        ],
      }],
    },
  ],
  'g9-t5': [
    {
      heading: '4. Giải tam giác vuông và ứng dụng thực tế',
      body: ['"Giải tam giác vuông" là tìm tất cả các cạnh và góc còn lại khi biết hai yếu tố (trong đó có ít nhất một cạnh).'],
      formulas: [
        'Biết **hai cạnh**: dùng Pythagore tìm cạnh thứ ba, rồi tỉ số lượng giác tìm góc.',
        'Biết **một cạnh và một góc nhọn**: dùng tỉ số lượng giác tìm hai cạnh còn lại.',
        'Góc **nâng** (nhìn lên) và góc **hạ** (nhìn xuống) đều đo so với phương ngang.',
      ],
      caution: ['Bài thực tế có người quan sát: nhớ **cộng thêm** chiều cao từ mặt đất tới mắt vào kết quả.'],
      examples: [{
        prompt: 'Một cái thang dài $6$ m dựa vào tường, tạo với mặt đất một góc $60\\deg$. Hỏi thang chạm tường ở độ cao bao nhiêu mét?',
        solve: [
          'Thang là cạnh huyền ($6$ m), độ cao cần tìm là cạnh **đối** của góc $60\\deg$.',
          'Dùng $\\sin$ vì $\\sin=\\f{\\text{đối}}{\\text{huyền}}$: $\\sin60\\deg=\\f{h}{6}$.',
          '$h=6\\cdot\\sin60\\deg=6\\cdot\\f{\\s{3}}{2}=3\\s{3}\\approx5{,}20$ (m).',
        ],
      }],
    },
  ],
  'g9-t6': [
    {
      heading: '4. Chứng minh tứ giác nội tiếp',
      body: ['Kỹ năng quan trọng nhất của câu hình thi vào 10. Hai dấu hiệu dưới đây phủ gần như toàn bộ đề thi.'],
      formulas: [
        '**Dấu hiệu 1**: tổng hai góc **đối** bằng $180\\deg$.',
        '**Dấu hiệu 2**: hai đỉnh **kề nhau** cùng nhìn một cạnh dưới hai góc bằng nhau.',
        'Trường hợp riêng rất hay dùng: hai góc vuông cùng nhìn một đoạn $\\Rightarrow$ bốn điểm thuộc đường tròn đường kính đoạn đó.',
      ],
      caution: ['Là hai góc **đối diện** chứ không phải hai góc kề — nhầm chỗ này là hỏng cả bài.'],
      examples: [{
        prompt: 'Cho tam giác $ABC$ nhọn, hai đường cao $BD$ và $CE$ cắt nhau tại $H$. Chứng minh tứ giác $BEDC$ nội tiếp.',
        solve: [
          '$BD$ là đường cao nên $BD\\perp AC$, suy ra $\\angle BDC=90\\deg$.',
          '$CE$ là đường cao nên $CE\\perp AB$, suy ra $\\angle BEC=90\\deg$.',
          'Hai đỉnh $D$ và $E$ kề nhau, cùng nhìn cạnh $BC$ dưới góc $90\\deg$.',
          'Vậy bốn điểm $B$, $E$, $D$, $C$ cùng thuộc đường tròn đường kính $BC$, tức tứ giác $BEDC$ nội tiếp.',
        ],
      }],
    },
  ],
  'g9-t7': [
    {
      heading: '4. Bài toán thực tế và khối ghép',
      body: ['Vật thể thực tế thường là ghép của nhiều khối cơ bản. Tách đúng thành các khối rồi cộng trừ là xong.'],
      formulas: [
        'Khối ghép vào nhau: **cộng** thể tích các phần.',
        'Khối bị khoét: lấy khối lớn **trừ** phần khoét.',
        'Đổi đơn vị: $1\\;dm^{3}=1$ lít; $1\\;m^{3}=1000$ lít.',
      ],
      caution: ['Xác định đúng bán kính chung của các phần khi ghép trụ với nón hoặc nửa cầu.'],
      examples: [{
        prompt: 'Một chiếc phao gồm một hình trụ bán kính $20$ cm, cao $50$ cm, ghép thêm một nửa hình cầu cùng bán kính ở phía trên. Tính thể tích chiếc phao theo $\\pi$.',
        solve: [
          'Thể tích phần hình trụ: $V_1=\\pi r^{2}h=\\pi\\cdot400\\cdot50=20\\,000\\pi\\;(cm^{3})$.',
          'Thể tích nửa hình cầu: $V_2=\\f{1}{2}\\cdot\\f{4}{3}\\pi R^{3}=\\f{2}{3}\\pi\\cdot8\\,000=\\f{16\\,000}{3}\\pi\\;(cm^{3})$.',
          'Tổng thể tích: $V=20\\,000\\pi+\\f{16\\,000}{3}\\pi=\\f{76\\,000}{3}\\pi\\;(cm^{3})$.',
        ],
      }],
    },

    {
      heading: '2. Hình trụ',
      body: ['Hình trụ sinh ra khi quay một hình chữ nhật quanh một cạnh. Trải mặt xung quanh ra được một hình chữ nhật.'],
      formulas: [
        '$S_{xq}=2\\pi rh$ (chu vi đáy nhân chiều cao).',
        '$S_{tp}=2\\pi rh+2\\pi r^{2}$.',
        '$V=\\pi r^{2}h$.',
      ],
      caution: ['Đề thường cho **đường kính** — nhớ chia đôi để lấy bán kính trước khi thay vào công thức.'],
      examples: [{
        prompt: 'Một hình trụ có đường kính đáy $10$ cm và chiều cao $15$ cm. Tính diện tích xung quanh và thể tích (lấy $\\pi\\approx3{,}14$).',
        solve: [
          'Bán kính đáy: $r=\\f{10}{2}=5$ (cm).',
          '$S_{xq}=2\\pi rh\\approx2\\cdot3{,}14\\cdot5\\cdot15=471\\;(cm^{2})$.',
          '$V=\\pi r^{2}h\\approx3{,}14\\cdot25\\cdot15=1\\,177{,}5\\;(cm^{3})$.',
        ],
      }],
    },
    {
      heading: '3. Hình nón và hình cầu',
      body: ['Hình nón sinh ra khi quay tam giác vuông quanh một cạnh góc vuông; hình cầu khi quay nửa hình tròn quanh đường kính.'],
      formulas: [
        'Nón: $l^{2}=r^{2}+h^{2}$ ; $S_{xq}=\\pi rl$ ; $V=\\f{1}{3}\\pi r^{2}h$.',
        'Cầu: $S=4\\pi R^{2}$ ; $V=\\f{4}{3}\\pi R^{3}$.',
      ],
      caution: ['Diện tích xung quanh hình nón dùng **đường sinh** $l$; thể tích dùng **chiều cao** $h$ — hai đại lượng khác nhau.'],
      examples: [{
        prompt: 'Quay tam giác $ABC$ vuông tại $A$ có $AB=3$ cm, $AC=4$ cm quanh cạnh $AB$. Tính diện tích xung quanh của hình nón thu được.',
        solve: [
          'Quay quanh $AB$ nên $AB=3$ cm là **chiều cao**, $AC=4$ cm là **bán kính đáy**.',
          'Đường sinh chính là cạnh huyền: $l=BC=\\s{3^{2}+4^{2}}=5$ (cm).',
          '$S_{xq}=\\pi rl=\\pi\\cdot4\\cdot5=20\\pi\\;(cm^{2})\\approx62{,}8\\;cm^{2}$.',
        ],
      }],
    },
  ],
  'g9-t8': [
    {
      heading: '4. Biểu đồ tần số và biểu đồ tần số tương đối',
      body: ['Tần số tương đối cho phép so sánh hai bộ dữ liệu có cỡ khác nhau — điều mà tần số thô không làm được.'],
      formulas: [
        'Biểu đồ **cột**: trục đứng là tần số hoặc tần số tương đối.',
        'Biểu đồ **quạt tròn**: góc ở tâm $=$ tần số tương đối $\\times360\\deg$.',
        'Biểu đồ **đoạn thẳng**: thể hiện xu hướng thay đổi theo thời gian.',
      ],
      caution: ['Chọn loại biểu đồ theo câu hỏi cần trả lời: so sánh dùng cột, tỉ lệ dùng quạt tròn, xu hướng dùng đoạn thẳng.'],
      examples: [{
        prompt: 'Lớp 9A có $40$ học sinh, trong đó $12$ em đăng ký thi khối A. Lớp 9B có $50$ học sinh, $14$ em đăng ký khối A. Lớp nào có tỉ lệ đăng ký cao hơn?',
        solve: [
          'Lớp 9A: $\\f{12}{40}\\cdot100\\%=30\\%$.',
          'Lớp 9B: $\\f{14}{50}\\cdot100\\%=28\\%$.',
          'Tuy 9B có nhiều em đăng ký hơn về **số lượng**, nhưng 9A có **tỉ lệ** cao hơn ($30\\%>28\\%$).',
          'Đây chính là lý do phải dùng tần số tương đối khi so sánh hai nhóm khác cỡ.',
        ],
      }],
    },

    {
      heading: '2. Bảng tần số và bảng tần số ghép nhóm',
      body: ['Khi số liệu quá nhiều giá trị khác nhau, ta ghép chúng thành nhóm để bảng gọn và dễ đọc hơn.'],
      formulas: [
        'Tần số tương đối $=\\f{\\text{tần số}}{N}\\cdot100\\%$; tổng luôn bằng $100\\%$.',
        'Với bảng ghép nhóm, **giá trị đại diện** của mỗi nhóm là trung điểm của nhóm.',
        'Số trung bình $=\\f{\\sum(\\text{đại diện}\\times\\text{tần số})}{N}$.',
      ],
      caution: ['Ghép nhóm làm mất số liệu gốc nên kết quả chỉ là **ước lượng** — đề thường yêu cầu ghi rõ điều này.'],
      examples: [{
        prompt: 'Chiều cao của $20$ học sinh (cm) được ghép nhóm: $[150;155)$ có $4$ em, $[155;160)$ có $9$ em, $[160;165)$ có $7$ em. Tính chiều cao trung bình.',
        solve: [
          'Giá trị đại diện các nhóm: $152{,}5$ ; $157{,}5$ ; $162{,}5$.',
          'Tổng chiều cao ước lượng: $152{,}5\\cdot4+157{,}5\\cdot9+162{,}5\\cdot7=610+1417{,}5+1137{,}5=3165$.',
          'Chiều cao trung bình: $\\f{3165}{20}=158{,}25$ (cm).',
        ],
      }],
    },
    {
      heading: '3. Xác suất của phép thử nhiều giai đoạn',
      body: ['Với phép thử gồm hai giai đoạn trở lên, phải liệt kê đủ không gian mẫu bằng sơ đồ cây hoặc bảng.'],
      formulas: [
        'Số kết quả của phép thử hai giai đoạn $=$ (số khả năng giai đoạn 1) $\\times$ (giai đoạn 2).',
        'Chọn **có hoàn lại**: tổng số giữ nguyên. Chọn **không hoàn lại**: tổng số giảm dần.',
        'Biến cố "ít nhất một...": tính qua biến cố đối, $P(A)=1-P(\\ov{A})$.',
      ],
      caution: ['Liệt kê nhẩm rất dễ sót trường hợp — nên vẽ sơ đồ cây ra giấy.'],
      examples: [{
        prompt: 'Tung một đồng xu ba lần. Tính xác suất của biến cố "có ít nhất một lần xuất hiện mặt ngửa".',
        solve: [
          'Mỗi lần tung có $2$ kết quả, tung ba lần cho $2^{3}=8$ kết quả đồng khả năng.',
          'Biến cố đối là "không lần nào ngửa", tức cả ba lần đều sấp — chỉ $1$ kết quả ($SSS$).',
          '$P(\\ov{A})=\\f{1}{8}$.',
          '$P(A)=1-\\f{1}{8}=\\f{7}{8}$.',
        ],
      }],
    },
  ],
};
