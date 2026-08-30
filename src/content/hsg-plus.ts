import type { HsgTopic } from './hsg';

/* MATHGITA — CHUYÊN ĐỀ HSG (bổ sung): mỗi khối thêm một chuyên đề trọng điểm */

export const HSG_TOPICS_PLUS: HsgTopic[] = [
  {
    id: 'hsg-6-2', grade: 6,
    name: 'Toán suy luận & Bài toán thực tế nâng cao lớp 6',
    summary: 'Suy luận logic, bài toán chuyển động ngược xuôi, bài toán tuổi, bài toán công việc và kỹ thuật giả thiết tạm.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Giả thiết tạm (bài toán “vừa gà vừa chó”)',
        detail: [
          'Giả sử tất cả đều thuộc một loại, tính ra kết quả tạm.',
          'So sánh với kết quả thật để tìm phần chênh lệch.',
          'Chia chênh lệch cho hiệu của hai loại để ra số lượng loại còn lại.',
          'Kiểm tra lại bằng cách thay ngược vào đề.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Sơ đồ đoạn thẳng cho bài toán tổng – hiệu – tỉ',
        detail: [
          'Vẽ mỗi đại lượng là một đoạn thẳng, chia theo số phần trong tỉ số.',
          'Đánh dấu tổng (hoặc hiệu) lên sơ đồ.',
          'Giá trị một phần $=$ tổng chia tổng số phần (hoặc hiệu chia hiệu số phần).',
          'Từ giá trị một phần suy ra từng đại lượng.',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Bài toán công việc',
        detail: [
          'Coi khối lượng công việc là 1.',
          'Năng suất mỗi giờ là nghịch đảo của thời gian làm riêng.',
          'Năng suất cộng được, thời gian thì không.',
          'Nếu có người nghỉ giữa chừng, tính riêng khối lượng từng giai đoạn.',
        ],
      },
      {
        title: 'Kỹ thuật 4 — Suy luận loại trừ với bảng',
        detail: [
          'Kẻ bảng các đối tượng theo hàng và thuộc tính theo cột.',
          'Mỗi dữ kiện đề cho là một dấu “×” (loại trừ) hoặc “✓” (khẳng định).',
          'Một hàng chỉ còn một ô trống thì ô đó là ✓, kéo theo cả cột bị loại.',
          'Lặp lại đến khi bảng đầy đủ.',
        ],
      },
    ],
    mindmap: {
      root: 'TOÁN SUY LUẬN LỚP 6',
      branches: [
        { title: 'Giả thiết tạm', items: ['Vừa gà vừa chó', 'Bài toán vé, tem', 'Bài toán đề thi có điểm trừ'] },
        { title: 'Tổng – hiệu – tỉ', items: ['Sơ đồ đoạn thẳng', 'Giá trị một phần', 'Tìm hai số'] },
        { title: 'Công việc', items: ['Khối lượng công việc $=1$', 'Cộng năng suất', 'Làm chung – làm riêng'] },
        { title: 'Suy luận logic', items: ['Bảng loại trừ', 'Phản chứng đơn giản', 'Nguyên lý Dirichlet'] },
      ],
    },
    examples: [
      {
        prompt: 'Vừa gà vừa chó, bó lại cho tròn, ba mươi sáu con, một trăm chân chẵn. Hỏi có bao nhiêu con gà, bao nhiêu con chó?',
        thinking: [
          'Giả sử tất cả 36 con đều là gà (2 chân) để tính ra số chân tạm.',
          'So với số chân thật để tìm chênh lệch; mỗi con chó có nhiều hơn gà 2 chân.',
        ],
        solution: [
          'Giả sử cả 36 con đều là gà thì số chân là $36\\cdot2=72$ (chân).',
          'Số chân thiếu so với thực tế: $100-72=28$ (chân).',
          'Mỗi con chó có nhiều hơn mỗi con gà: $4-2=2$ (chân).',
          'Số con chó: $28:2=14$ (con).',
          'Số con gà: $36-14=22$ (con).',
          'Thử lại: $22\\cdot2+14\\cdot4=44+56=100$ (chân) ✓',
        ],
        remark: 'Kỹ thuật giả thiết tạm giải được cả một họ bài toán: vé xe, tem thư, bài thi có điểm trừ khi làm sai.',
      },
    ],
  },

  {
    id: 'hsg-7-2', grade: 7,
    name: 'Hình học nâng cao lớp 7 — Kỹ thuật vẽ thêm đường phụ',
    summary: 'Bốn kỹ thuật vẽ đường phụ kinh điển: kéo dài trung tuyến, kẻ song song, dựng tam giác đều, lấy điểm đối xứng.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Kéo dài trung tuyến gấp đôi',
        detail: [
          'Khi có trung tuyến $AM$, kéo dài để $MD=MA$.',
          'Ta được hình bình hành, chuyển được các đoạn thẳng và góc sang vị trí thuận lợi.',
          'Dùng để chứng minh bất đẳng thức về trung tuyến, hoặc ghép hai đoạn rời nhau vào một tam giác.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Kẻ đường song song',
        detail: [
          'Qua một điểm “gãy”, kẻ đường song song với hai đường đã cho.',
          'Tạo ra các cặp góc so le trong, tách góc lớn thành tổng hai góc nhỏ.',
          'Dùng nhiều nhất trong các bài tính góc giữa hai đường song song.',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Lấy điểm đối xứng',
        detail: [
          'Lấy đối xứng một điểm qua đường thẳng hoặc qua một điểm.',
          'Biến hai đoạn rời rạc thành một đường gấp khúc, rồi dùng bất đẳng thức tam giác.',
          'Dùng cho bài toán cực trị: tìm vị trí để tổng khoảng cách nhỏ nhất.',
        ],
      },
      {
        title: 'Kỹ thuật 4 — Trên tia đối lấy điểm bằng đoạn cho trước',
        detail: [
          'Khi đề cho tổng hoặc hiệu hai đoạn thẳng, hãy “dời” một đoạn về nằm cạnh đoạn kia.',
          'Trên tia đối, hoặc trên chính tia đó, lấy điểm sao cho đoạn mới bằng đoạn cần ghép.',
          'Sau đó chứng minh tam giác mới tạo thành là tam giác cân hoặc bằng một tam giác đã có.',
        ],
      },
    ],
    mindmap: {
      root: 'HÌNH HỌC NÂNG CAO LỚP 7',
      branches: [
        { title: 'Vẽ đường phụ', items: ['Kéo dài trung tuyến', 'Kẻ song song', 'Lấy đối xứng', 'Dời đoạn thẳng'] },
        { title: 'Chứng minh bằng nhau', items: ['c.c.c, c.g.c, g.c.g', 'Bắc cầu qua tam giác trung gian', 'Tam giác cân, đều'] },
        { title: 'Bất đẳng thức', items: ['$\\abs{b-c}<a<b+c$', 'Đường vuông góc ngắn nhất', 'Cực trị khoảng cách'] },
        { title: 'Đồng quy - thẳng hàng', items: ['Bốn đường đồng quy', 'Trung trực, phân giác', 'Hai góc kề bù'] },
      ],
    },
    examples: [
      {
        prompt: 'Cho tam giác $ABC$, $M$ là trung điểm $BC$. Chứng minh $AM<\\f{AB+AC}{2}$.',
        thinking: [
          '$AM$ là trung tuyến; muốn so sánh với $AB+AC$ thì phải ghép $AB$ và $AC$ vào cùng một tam giác với $AM$.',
          'Kỹ thuật: kéo dài $AM$ thành $AD$ với $MD=MA$ — khi đó $2AM=AD$ và $CD=AB$.',
        ],
        solution: [
          'Trên tia đối của tia $MA$ lấy điểm $D$ sao cho $MD=MA$.',
          'Xét $\\tri ABM$ và $\\tri DCM$: $MB=MC$ ($M$ là trung điểm $BC$); $\\angle AMB=\\angle DMC$ (đối đỉnh); $MA=MD$.',
          'Do đó $\\tri ABM=\\tri DCM$ (c.g.c), suy ra $AB=DC$.',
          'Xét tam giác $ACD$, theo bất đẳng thức tam giác: $AD<AC+CD$.',
          'Mà $AD=2AM$ và $CD=AB$, nên $2AM<AC+AB$.',
          'Vậy $AM<\\f{AB+AC}{2}$.',
        ],
        remark: 'Kéo dài trung tuyến gấp đôi là kỹ thuật số 1 cho mọi bài bất đẳng thức về trung tuyến.',
      },
    ],
  },

  {
    id: 'hsg-8-2', grade: 8,
    name: 'Hình học nâng cao lớp 8 — Đồng dạng và tỉ số diện tích',
    summary: 'Kỹ thuật dùng tỉ số diện tích, định lí Thalès mở rộng, và bài toán cực trị hình học.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Tỉ số diện tích hai tam giác chung chiều cao',
        detail: [
          'Hai tam giác có chung đường cao thì tỉ số diện tích bằng tỉ số hai đáy.',
          'Hai tam giác có chung đáy thì tỉ số diện tích bằng tỉ số hai đường cao.',
          'Đây là công cụ chuyển bài toán tỉ số đoạn thẳng thành bài toán diện tích và ngược lại.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Tỉ số diện tích của hai tam giác có chung góc',
        detail: [
          'Nếu $\\tri ABC$ và $\\tri AB\'C\'$ chung góc $A$ thì $\\f{S_{ABC}}{S_{AB\'C\'}}=\\f{AB\\cdot AC}{AB\'\\cdot AC\'}$.',
          'Rất mạnh khi đề cho các điểm chia cạnh theo tỉ lệ.',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Chuỗi đồng dạng bắc cầu',
        detail: [
          'Khi hai tam giác cần so sánh không có quan hệ trực tiếp, tìm một tam giác trung gian.',
          '$\\tri A\\sim\\tri B$ và $\\tri B\\sim\\tri C$ thì $\\tri A\\sim\\tri C$.',
          'Thường dùng trong bài có nhiều đường cao hoặc nhiều đường vuông góc.',
        ],
      },
      {
        title: 'Kỹ thuật 4 — Cực trị hình học bằng bất đẳng thức Cô-si',
        detail: [
          'Đưa đại lượng cần tìm cực trị về một biến.',
          'Áp dụng $a+b\\ge2\\s{ab}$ khi tích là hằng số.',
          'Chỉ ra vị trí hình học ứng với dấu bằng.',
        ],
      },
    ],
    mindmap: {
      root: 'HÌNH HỌC NÂNG CAO LỚP 8',
      branches: [
        { title: 'Diện tích', items: ['Chung chiều cao → tỉ số đáy', 'Chung góc → tỉ số tích hai cạnh', 'Cộng - trừ diện tích'] },
        { title: 'Đồng dạng', items: ['g.g là chủ lực', 'Chuỗi bắc cầu', 'Tỉ số $k$, diện tích $k^{2}$'] },
        { title: 'Thalès', items: ['Thuận - đảo - hệ quả', 'Đường phân giác', 'Chia đoạn theo tỉ lệ'] },
        { title: 'Cực trị', items: ['Đưa về một biến', 'Bất đẳng thức Cô-si', 'Đường vuông góc ngắn nhất'] },
      ],
    },
    examples: [
      {
        prompt: 'Cho tam giác $ABC$. Trên cạnh $AB$ lấy $M$ với $AM=\\f{1}{3}AB$; trên cạnh $AC$ lấy $N$ với $AN=\\f{2}{5}AC$. Tính tỉ số $\\f{S_{AMN}}{S_{ABC}}$.',
        thinking: [
          'Hai tam giác $AMN$ và $ABC$ **chung góc $A$** → dùng ngay công thức tỉ số tích hai cạnh kề góc chung.',
        ],
        solution: [
          'Hai tam giác $AMN$ và $ABC$ có chung góc $A$.',
          '$\\f{S_{AMN}}{S_{ABC}}=\\f{AM\\cdot AN}{AB\\cdot AC}=\\f{1}{3}\\cdot\\f{2}{5}=\\f{2}{15}$.',
          'Vậy $S_{AMN}=\\f{2}{15}S_{ABC}$.',
        ],
        remark: 'Không cần biết hình dạng cụ thể của tam giác — công thức tỉ số diện tích theo góc chung xử lý gọn trong một dòng.',
      },
    ],
  },

  {
    id: 'hsg-9-2', grade: 9,
    name: 'HSG lớp 9 — Phương trình vô tỉ, hệ đối xứng và bất đẳng thức',
    summary: 'Kỹ thuật đặt ẩn phụ, đánh giá hai vế, hệ đối xứng loại I – II, và bất đẳng thức có điểm rơi.',
    techniques: [
      {
        title: 'Kỹ thuật 1 — Đặt ẩn phụ cho phương trình vô tỉ',
        detail: [
          'Nhận dạng biểu thức lặp lại dưới căn, đặt nó là $t$ với điều kiện $t\\ge0$.',
          'Đưa phương trình về bậc hai theo $t$.',
          'Giải theo $t$, loại nghiệm âm, rồi quay về $x$.',
          'Bắt buộc thử lại nghiệm vào phương trình gốc.',
        ],
      },
      {
        title: 'Kỹ thuật 2 — Đánh giá hai vế',
        detail: [
          'Khi hai vế có bản chất khác nhau, hãy chặn: vế trái $\\ge m$ và vế phải $\\le m$.',
          'Phương trình có nghiệm khi và chỉ khi cả hai vế cùng bằng $m$.',
          'Giải hệ điều kiện dấu bằng để tìm nghiệm.',
        ],
      },
      {
        title: 'Kỹ thuật 3 — Hệ đối xứng loại I',
        detail: [
          'Hệ không đổi khi hoán vị $x$ và $y$ → đặt $S=x+y$, $P=xy$.',
          'Đưa hệ về hai phương trình theo $S$, $P$.',
          'Giải xong, $x$ và $y$ là nghiệm của $X^{2}-SX+P=0$.',
          'Điều kiện tồn tại: $S^{2}-4P\\ge0$.',
        ],
      },
      {
        title: 'Kỹ thuật 4 — Bất đẳng thức có điểm rơi',
        detail: [
          'Dự đoán trước giá trị làm dấu bằng xảy ra (thường là điểm đối xứng, ví dụ $a=b=c$).',
          'Chia tách hệ số sao cho tại điểm rơi, các số hạng trong Cô-si bằng nhau.',
          'Nếu áp dụng Cô-si “thô” mà dấu bằng không đạt được thì đánh giá đó vô nghĩa.',
        ],
      },
    ],
    mindmap: {
      root: 'HSG TOÁN 9 — ĐẠI SỐ NÂNG CAO',
      branches: [
        { title: 'Phương trình vô tỉ', items: ['Điều kiện xác định', 'Đặt ẩn phụ', 'Nhân liên hợp', 'Đánh giá hai vế'] },
        { title: 'Hệ phương trình', items: ['Đối xứng loại I: $S$, $P$', 'Đối xứng loại II: trừ theo vế', 'Đặt ẩn phụ'] },
        { title: 'Bất đẳng thức', items: ['Cô-si 2, 3 số', 'Kỹ thuật điểm rơi', 'Bunhiacopxki', 'Chặn hai đầu'] },
        { title: 'Cực trị', items: ['Đưa về một biến', 'Hoàn thành bình phương', 'Dấu bằng phải đạt được'] },
      ],
    },
    examples: [
      {
        prompt: 'Giải phương trình $x^{2}+3x+\\s{x^{2}+3x+3}=9$.',
        thinking: [
          'Biểu thức $x^{2}+3x$ lặp lại cả ngoài và trong căn → đặt ẩn phụ cho phần dưới căn.',
          'Đặt $t=\\s{x^{2}+3x+3}\\ge0$, khi đó $x^{2}+3x=t^{2}-3$.',
        ],
        solution: [
          'Điều kiện: $x^{2}+3x+3=\\left(x+\\f{3}{2}\\right)^{2}+\\f{3}{4}>0$ với mọi $x$, nên phương trình xác định trên $\\R$.',
          'Đặt $t=\\s{x^{2}+3x+3}$, $t>0$. Suy ra $x^{2}+3x=t^{2}-3$.',
          'Phương trình trở thành $t^{2}-3+t=9\\Leftrightarrow t^{2}+t-12=0$.',
          '$(t-3)(t+4)=0\\Rightarrow t=3$ (nhận) hoặc $t=-4$ (loại vì $t>0$).',
          'Với $t=3$: $x^{2}+3x+3=9\\Leftrightarrow x^{2}+3x-6=0$.',
          '$\\Delta=9+24=33\\Rightarrow x=\\f{-3\\pm\\s{33}}{2}$.',
          'Thử lại: cả hai giá trị đều thoả (vì phương trình xác định trên $\\R$ và $t=3>0$).',
          'Vậy $x=\\f{-3\\pm\\s{33}}{2}$.',
        ],
        remark: 'Dấu hiệu đặt ẩn phụ: một biểu thức xuất hiện cả trong và ngoài dấu căn. Nhận ra được là bài giải xong một nửa.',
      },
      {
        prompt: 'Cho $a,b>0$ và $a+b=1$. Tìm giá trị nhỏ nhất của $P=\\f{1}{a}+\\f{1}{b}$.',
        thinking: [
          'Dự đoán điểm rơi: biểu thức đối xứng theo $a$, $b$ nên dấu bằng có thể xảy ra khi $a=b=\\f{1}{2}$.',
          'Kiểm tra: khi đó $P=2+2=4$. Vậy cần chứng minh $P\\ge4$.',
        ],
        solution: [
          '$P=\\f{1}{a}+\\f{1}{b}=\\f{a+b}{ab}=\\f{1}{ab}$ (vì $a+b=1$).',
          'Theo bất đẳng thức Cô-si: $1=a+b\\ge2\\s{ab}\\Rightarrow\\s{ab}\\le\\f{1}{2}\\Rightarrow ab\\le\\f{1}{4}$.',
          'Do đó $P=\\f{1}{ab}\\ge4$.',
          'Dấu “=” xảy ra khi $a=b$, kết hợp $a+b=1$ được $a=b=\\f{1}{2}$.',
          'Vậy $P_{\\min}=4$ khi $a=b=\\f{1}{2}$.',
        ],
        remark: 'Quy trình chuẩn: dự đoán điểm rơi → tính giá trị tại đó → chứng minh bất đẳng thức → chỉ ra dấu bằng.',
      },
    ],
  },
];
