import type { Grade, MindMap, Term } from '@/types';

/* =====================================================================
   MATHGITA — KỸ NĂNG & PHƯƠNG PHÁP LUYỆN BÀI (bổ sung theo chuyên đề)
   và SƠ ĐỒ TƯ DUY TỔNG HỢP THEO HỌC KỲ.
   ===================================================================== */

export interface SkillSet { title: string; detail: string[] }

export const EXTRA_SKILLS: Record<string, SkillSet[]> = {
  /* --- Bổ sung cho các chuyên đề chưa có bộ kỹ năng luyện bài --- */
  'g6-t7': [
    {
      title: 'Kỹ năng "vẽ hình theo lời — đọc lời từ hình"',
      detail: [
        'Bước 1: đọc đề từng câu, **vẽ tới đâu ghi ký hiệu tới đó** (nét bằng nhau, góc vuông, số đo).',
        'Bước 2: vẽ đúng **thứ tự các điểm** trên tia hoặc đường thẳng — thứ tự sai làm cộng thành trừ.',
        'Bước 3: nhìn lại hình và đọc ngược ra thành lời để kiểm tra có khớp đề không.',
        'Hình vẽ đúng đã là nửa lời giải; hình sai thì mọi lập luận sau đó đều vô nghĩa.',
      ],
    },
    {
      title: 'Kỹ năng chuyển quan hệ hình học thành đẳng thức',
      detail: [
        '"$M$ nằm giữa $A$ và $B$" $\Rightarrow AM+MB=AB$.',
        '"$M$ là trung điểm của $AB$" $\Rightarrow MA=MB$ **và** $MA=\f{AB}{2}$.',
        '"Hai tia $Ox$, $Oy$ đối nhau" $\Rightarrow \angle xOy=180\deg$.',
        '"$Ot$ là phân giác của $\angle xOy$" $\Rightarrow \angle xOt=\angle tOy=\f{1}{2}\angle xOy$.',
        'Học thuộc bảng chuyển đổi này thì mọi bài tính độ dài, tính góc đều thành phương trình đơn giản.',
      ],
    },
  ],
  'g7-t4': [
    {
      title: 'Kỹ năng "gọi tên cặp góc" trước khi tính',
      detail: [
        'Bước 1: xác định rõ **hai đường thẳng** nào và **cát tuyến** nào đang xét.',
        'Bước 2: gọi tên cặp góc: so le trong · đồng vị · trong cùng phía.',
        'Bước 3: áp quy tắc — so le trong và đồng vị thì **bằng nhau**, trong cùng phía thì **bù nhau**.',
        'Gọi sai tên cặp góc là nguyên nhân của gần như mọi lỗi sai ở chuyên đề này.',
      ],
    },
    {
      title: 'Kỹ năng kẻ đường phụ',
      detail: [
        'Dấu hiệu cần kẻ: có hai đường song song và một điểm nằm "kẹp" giữa chúng.',
        'Cách kẻ: qua điểm đó kẻ một tia **song song** với hai đường đã cho.',
        'Kết quả: góc lớn bị tách thành hai góc con, mỗi góc so le trong với một góc đã biết.',
        'Chỉ kẻ **một** đường phụ — kẻ nhiều làm hình rối và lập luận khó theo dõi.',
      ],
    },
  ],
  'g9-t4': [
    {
      title: 'Kỹ năng giữ đúng chiều bất đẳng thức',
      detail: [
        'Cộng, trừ cùng một số vào hai vế: **giữ nguyên** chiều.',
        'Nhân, chia hai vế cho số **dương**: giữ nguyên chiều.',
        'Nhân, chia hai vế cho số **âm**: **ĐỔI CHIỀU**.',
        'Mẫu chứa ẩn thì chưa biết dấu — không nhân chéo, phải chuyển về một vế rồi xét dấu.',
        'Thói quen tốt: mỗi lần nhân/chia, viết ngay bên cạnh dấu của số đó.',
      ],
    },
    {
      title: 'Kỹ năng ba bước của bài chứng minh bất đẳng thức',
      detail: [
        'Bước 1: chứng minh bất đẳng thức đúng với **mọi** giá trị của biến (thường bằng tổng bình phương hoặc Cô-si).',
        'Bước 2: chỉ ra **giá trị cụ thể** của biến làm dấu bằng xảy ra.',
        'Bước 3: kết luận giá trị lớn nhất hoặc nhỏ nhất.',
        'Thiếu bước 2 thì chưa chứng minh được đó là cực trị — mất điểm dù bước 1 hoàn toàn đúng.',
      ],
    },
  ],
  'g9-t8': [
    {
      title: 'Kỹ năng liệt kê không gian mẫu không sót',
      detail: [
        'Phép thử một giai đoạn: liệt kê theo thứ tự tăng dần hoặc theo nhóm.',
        'Phép thử hai giai đoạn: dùng **sơ đồ hình cây** hoặc **bảng hai chiều** — đây là cách duy nhất bảo đảm không sót.',
        'Chọn **có hoàn lại**: tổng số giữ nguyên qua các giai đoạn. Chọn **không hoàn lại**: tổng số giảm dần.',
        'Đếm xong luôn kiểm tra: tổng số kết quả có khớp với tích số khả năng từng giai đoạn không.',
      ],
    },
    {
      title: 'Kỹ năng dùng biến cố đối',
      detail: [
        'Dấu hiệu: đề có cụm "**ít nhất một**", "**có ít nhất**", "**không phải tất cả**".',
        'Cách làm: tính $P(\ov{A})$ của biến cố đối rồi lấy $P(A)=1-P(\ov{A})$.',
        'Lý do: biến cố đối của "ít nhất một" là "không có cái nào" — thường chỉ có đúng một trường hợp.',
        'Đừng quên bước cuối lấy $1$ trừ đi — đây là lỗi hay gặp nhất khi dùng kỹ thuật này.',
      ],
    },
  ],

  /* ------------------------------ KHỐI 6 ------------------------------ */
  'g6-t3': [
    {
      title: 'Kỹ năng “tách dấu – tách độ lớn” khi tính với số nguyên',
      detail: [
        'Bước 1: xác định **dấu** của kết quả trước (đếm số thừa số âm nếu là phép nhân).',
        'Bước 2: tính với các **giá trị tuyệt đối** như số tự nhiên.',
        'Bước 3: ghép dấu vào kết quả.',
        'Tách hai việc ra làm giảm hơn một nửa số lỗi sai dấu.',
      ],
    },
  ],
  'g6-t5': [
    {
      title: 'Kỹ năng làm bài toán phần trăm bằng “hệ số nhân”',
      detail: [
        'Mọi thay đổi phần trăm đều quy về một hệ số nhân: tăng $m\\percent\\to(1+\\f{m}{100})$; giảm $m\\percent\\to(1-\\f{m}{100})$.',
        'Nhiều lần thay đổi liên tiếp thì **nhân** các hệ số, tuyệt đối không cộng phần trăm.',
        'Muốn tìm giá gốc từ giá sau thay đổi thì **chia** cho hệ số.',
        'Cuối cùng đối chiếu: mức thay đổi tổng $=1-$ tích các hệ số.',
      ],
    },
  ],
  'g6-t8': [
    {
      title: 'Kỹ năng đọc biểu đồ trong 30 giây',
      detail: [
        'Đọc **tiêu đề** trước để biết biểu đồ nói về cái gì.',
        'Đọc **chú thích và đơn vị** — với biểu đồ tranh phải xem mỗi biểu tượng ứng với bao nhiêu.',
        'Xác định giá trị lớn nhất, nhỏ nhất trước khi tính toán.',
        'Nếu câu hỏi có chữ “phần trăm” thì phải tính tổng trước.',
      ],
    },
  ],

  /* ------------------------------ KHỐI 7 ------------------------------ */
  'g7-t3': [
    {
      title: 'Kỹ năng cộng – trừ đa thức theo cột',
      detail: [
        'Thu gọn và sắp xếp cả hai đa thức theo lũy thừa **giảm dần** của biến.',
        'Viết hai đa thức thẳng cột theo bậc; bậc nào khuyết thì để trống (hoặc viết $0x^{k}$).',
        'Cộng/trừ theo từng cột — cách này gần như loại bỏ hoàn toàn lỗi sót hạng tử.',
        'Với phép trừ: đổi dấu **toàn bộ** đa thức trừ rồi mới cộng.',
      ],
    },
    {
      title: 'Kỹ năng kiểm tra kết quả bằng giá trị đặc biệt',
      detail: [
        'Sau khi tính $P(x)\\pm Q(x)$, chọn một giá trị dễ như $x=1$.',
        'Tính $P(1)$, $Q(1)$ và giá trị của kết quả tại $x=1$.',
        'Nếu ba số không khớp thì chắc chắn có lỗi — kiểm tra lại ngay.',
        'Mẹo này tốn 20 giây nhưng cứu được cả câu.',
      ],
    },
  ],
  'g7-t6': [
    {
      title: 'Kỹ năng xử lý bài toán hình khối thực tế',
      detail: [
        'Bước 1: xác định vật thể là hình gì (hộp chữ nhật, lập phương, lăng trụ).',
        'Bước 2: đọc kỹ đề hỏi diện tích xung quanh, toàn phần hay thể tích.',
        'Bước 3: đổi tất cả về **cùng một đơn vị** trước khi thay số.',
        'Bước 4: chú ý các chi tiết thực tế — bể không nắp thì bớt một mặt; mực nước thì dùng chiều cao cột nước.',
      ],
    },
  ],
  'g7-t7': [
    {
      title: 'Kỹ năng liệt kê không gian mẫu không bỏ sót',
      detail: [
        'Với phép thử một giai đoạn: liệt kê theo thứ tự tăng dần.',
        'Với phép thử hai giai đoạn: vẽ **sơ đồ cây**, mỗi nhánh là một lựa chọn.',
        'Đếm tổng số kết quả rồi mới đếm số kết quả thuận lợi.',
        'Kiểm tra: xác suất phải nằm trong đoạn từ 0 đến 1.',
      ],
    },
  ],

  /* ------------------------------ KHỐI 8 ------------------------------ */
  'g8-t2': [
    {
      title: 'Quy trình 5 bước cho bài rút gọn phân thức',
      detail: [
        'Bước 1: Viết **điều kiện xác định** (mọi mẫu khác 0) — luôn viết trước tiên.',
        'Bước 2: Phân tích **tất cả** các mẫu thành nhân tử.',
        'Bước 3: Tìm mẫu thức chung nhỏ nhất từ các nhân tử vừa có.',
        'Bước 4: Quy đồng, thu gọn tử (cẩn thận dấu khi bỏ ngoặc có dấu trừ).',
        'Bước 5: Rút gọn triệt để, rồi làm câu hỏi phụ và đối chiếu điều kiện Bước 1.',
      ],
    },
  ],
  'g8-t3': [
    {
      title: 'Kỹ năng lập bảng dữ kiện cho bài toán lời văn',
      detail: [
        'Kẻ bảng ba cột: **Đại lượng | Tình huống 1 | Tình huống 2**.',
        'Với bài chuyển động, ba dòng là: quãng đường – vận tốc – thời gian.',
        'Với bài năng suất, ba dòng là: khối lượng công việc – năng suất – thời gian.',
        'Điền ô đã biết, ô là ẩn, ô biểu diễn theo ẩn; dòng nào có dữ kiện so sánh chính là nơi lập phương trình.',
      ],
    },
    {
      title: 'Sáu bước bắt buộc khi giải bài toán bằng cách lập phương trình',
      detail: [
        '1. Gọi ẩn — kèm **đơn vị** và **điều kiện**.',
        '2. Biểu diễn các đại lượng chưa biết khác theo ẩn.',
        '3. Lập phương trình từ mối quan hệ trong đề.',
        '4. Giải phương trình.',
        '5. **Đối chiếu điều kiện**, loại nghiệm không hợp lệ.',
        '6. Kết luận có đơn vị. Thiếu bước 1, 5 hoặc 6 đều bị trừ điểm.',
      ],
    },
  ],
  'g8-t4': [
    {
      title: 'Kỹ năng vẽ nhanh đồ thị hàm số bậc nhất',
      detail: [
        'Đồ thị là đường thẳng nên chỉ cần **hai điểm**.',
        'Chọn hai điểm dễ nhất: giao với trục tung $(0;b)$ và giao với trục hoành $\\left(-\\f{b}{a};0\\right)$.',
        'Nếu $-\\f{b}{a}$ xấu, hãy chọn $x=1$ để có điểm $(1;a+b)$.',
        'Kiểm tra hướng: $a>0$ đường thẳng đi lên, $a<0$ đi xuống.',
      ],
    },
  ],
  'g8-t7': [
    {
      title: 'Kỹ năng nhận diện nhanh tam giác vuông',
      detail: [
        'Thuộc các bộ ba Pythagore: $(3;4;5)$, $(5;12;13)$, $(8;15;17)$, $(7;24;25)$, $(20;21;29)$.',
        'Mọi bội của một bộ ba cũng là bộ ba Pythagore: $(6;8;10)$, $(9;12;15)$…',
        'Khi kiểm tra Pythagore đảo, luôn lấy **cạnh lớn nhất** làm cạnh huyền.',
        'Nếu ra căn của số âm thì chắc chắn đã đặt nhầm cạnh huyền.',
      ],
    },
  ],
  'g8-t8': [
    {
      title: 'Kỹ năng phân biệt xác suất lí thuyết và thực nghiệm',
      detail: [
        'Đề mô tả **phép thử với các kết quả như nhau** → xác suất lí thuyết, đếm trực tiếp.',
        'Đề cho **bảng kết quả sau nhiều lần thử** → xác suất thực nghiệm, lấy tần số chia tổng số lần.',
        'Đề hỏi “ước lượng số lần xảy ra trong $n$ lần” → lấy $n\\times P$.',
        'Khi số lần thử càng lớn, hai loại xác suất càng gần nhau.',
      ],
    },
  ],

  /* ------------------------------ KHỐI 9 ------------------------------ */
  'g9-t1': [
    {
      title: 'Kỹ năng chọn phương pháp giải hệ cho nhanh',
      detail: [
        'Có một ẩn hệ số $\\pm1$ → dùng **phương pháp thế**.',
        'Hệ số của một ẩn bằng nhau hoặc đối nhau → dùng **cộng đại số** ngay.',
        'Hệ số “xấu” → nhân chéo hai phương trình để tạo hệ số đối, rồi cộng.',
        'Ẩn nằm ở mẫu → **đặt ẩn phụ** $u=\\f{1}{x}$, $v=\\f{1}{y}$; nhớ điều kiện và bước quay về ẩn gốc.',
        'Luôn thử lại nghiệm vào **cả hai** phương trình trước khi kết luận.',
      ],
    },
  ],
  'g9-t3': [
    {
      title: 'Bộ biểu thức đối xứng phải thuộc lòng',
      detail: [
        '$x_1^{2}+x_2^{2}=S^{2}-2P$',
        '$(x_1-x_2)^{2}=S^{2}-4P$ và $\\abs{x_1-x_2}=\\s{S^{2}-4P}$',
        '$\\f{1}{x_1}+\\f{1}{x_2}=\\f{S}{P}$ (với $P\\ne0$)',
        '$x_1^{3}+x_2^{3}=S^{3}-3PS$',
        '$x_1^{2}x_2+x_1x_2^{2}=PS$',
        'Mọi biểu thức đối xứng đều viết được theo $S$ và $P$ — không bao giờ cần giải phương trình.',
      ],
    },
  ],
  'g9-t5': [
    {
      title: 'Kỹ năng chọn đúng tỉ số lượng giác',
      detail: [
        'Ghi rõ trên hình: cạnh nào **đối**, cạnh nào **kề** với góc đang xét, cạnh nào là **huyền**.',
        'Có huyền và đối → dùng $\\sin$; có huyền và kề → dùng $\\cos$; chỉ có đối và kề → dùng $\\tan$.',
        'Sau khi tính xong, kiểm tra chéo bằng Pythagore — lệch nhiều nghĩa là chọn nhầm tỉ số.',
        'Nhớ: với góc nhọn thì $\\sin$ và $\\cos$ luôn nhỏ hơn 1.',
      ],
    },
  ],
  'g9-t6': [
    {
      title: 'Chiến thuật làm câu hình thi tuyển sinh vào 10',
      detail: [
        'Vẽ hình **to, rõ**, ghi đủ ký hiệu vuông góc và đoạn bằng nhau — hình đúng là nửa lời giải.',
        'Ý a (chứng minh tứ giác nội tiếp): “săn” hai góc vuông cùng nhìn một đoạn, hoặc hai góc đối bù nhau. Ý này phải lấy trọn điểm.',
        'Ý b (chứng minh hệ thức / đồng dạng): dùng góc nội tiếp cùng chắn một cung để có cặp góc bằng nhau, rồi kết luận g.g.',
        'Ý c (tính độ dài, diện tích): dùng hệ thức lượng trong tam giác vuông, tỉ số đồng dạng, hoặc công thức cung – quạt.',
        'Ý d (câu 0,5 điểm cuối): thử **hai vị trí đặc biệt** của điểm di động để dự đoán kết quả, rồi mới chứng minh.',
        'Nếu bí ý d, vẫn phải trình bày trọn vẹn ý a, b, c — đó đã là 2,5/3 điểm câu hình.',
      ],
    },
    {
      title: 'Bộ “vũ khí” nhận diện tứ giác nội tiếp',
      detail: [
        'Hai góc vuông cùng nhìn một đoạn thẳng → bốn điểm thuộc đường tròn đường kính đoạn đó.',
        'Tổng hai góc **đối** bằng $180\\deg$.',
        'Góc ngoài tại một đỉnh bằng góc trong của đỉnh đối diện.',
        'Hai đỉnh **kề nhau** cùng nhìn một cạnh dưới hai góc bằng nhau.',
        'Bốn điểm cách đều một điểm cố định.',
      ],
    },
  ],
  'g9-t7': [
    {
      title: 'Kỹ năng làm bài hình khối tròn xoay',
      detail: [
        'Vẽ mặt cắt qua trục — mọi bài hình nón, hình trụ đều trở nên đơn giản khi nhìn mặt cắt.',
        'Với hình nón, ba đại lượng $r$, $h$, $l$ tạo thành tam giác vuông: $l^{2}=r^{2}+h^{2}$.',
        'Đọc kỹ đề hỏi diện tích xung quanh hay toàn phần (toàn phần cộng thêm đáy).',
        'Bài “vật thể ghép” thì cộng/trừ thể tích từng phần.',
      ],
    },
  ],
};

/* ---------------- SƠ ĐỒ TƯ DUY TỔNG HỢP THEO HỌC KỲ ---------------- */

export const TERM_MINDMAPS: Record<string, MindMap> = {
  '6-HK1': {
    root: 'TOÁN 6 — HỌC KỲ I',
    branches: [
      { title: 'Tập hợp & Số tự nhiên', items: ['Ký hiệu $\\in$, $\\notin$', 'Bốn phép tính, tính nhanh', 'Lũy thừa: $a^{m}a^{n}=a^{m+n}$', 'Thứ tự thực hiện phép tính'] },
      { title: 'Tính chia hết', items: ['Dấu hiệu chia hết 2, 3, 5, 9', 'Số nguyên tố – hợp số', 'Phân tích ra thừa số nguyên tố', 'ƯCLN (chung, mũ nhỏ) – BCNN (chung & riêng, mũ lớn)'] },
      { title: 'Số nguyên', items: ['So sánh trên trục số', 'Cộng, trừ theo dấu', 'Quy tắc dấu khi nhân, chia', 'Quy tắc dấu ngoặc, chuyển vế'] },
      { title: 'Hình học trực quan', items: ['Tam giác đều, hình vuông, lục giác đều', 'Hình chữ nhật, thoi, bình hành, thang cân', 'Chu vi và diện tích', 'Bài toán thực tế, đổi đơn vị'] },
      { title: 'Dạng bài trọng tâm HK1', items: ['Tính nhanh, tìm $x$', 'Tìm chữ số theo dấu hiệu chia hết', 'Bài toán ƯCLN / BCNN', 'Tính chu vi – diện tích thực tế'] },
    ],
  },
  '6-HK2': {
    root: 'TOÁN 6 — HỌC KỲ II',
    branches: [
      { title: 'Phân số', items: ['Rút gọn, quy đồng, so sánh', 'Bốn phép tính, tính hợp lí', 'Hai bài toán cơ bản', 'Bẫy “phần còn lại”'] },
      { title: 'Số thập phân & Tỉ số %', items: ['Bốn phép tính, làm tròn', 'Tỉ số và tỉ số phần trăm', 'Ba bài toán phần trăm', 'Giảm giá liên tiếp: nhân hệ số'] },
      { title: 'Hình học phẳng', items: ['Điểm, đường thẳng, tia', '$AM+MB=AB$', 'Trung điểm: nằm giữa + cách đều', 'Góc và số đo góc'] },
      { title: 'Thống kê & Xác suất', items: ['Bảng, biểu đồ tranh, biểu đồ cột', 'Đọc và phân tích số liệu', 'Xác suất thực nghiệm'] },
      { title: 'Dạng bài trọng tâm HK2', items: ['Tính hợp lí với phân số', 'Bài toán phân số – phần trăm', 'Tính độ dài đoạn thẳng, chứng minh trung điểm', 'Tính số đo góc'] },
    ],
  },
  '7-HK1': {
    root: 'TOÁN 7 — HỌC KỲ I',
    branches: [
      { title: 'Số hữu tỉ – Số thực', items: ['$\\N\\subset\\Z\\subset\\Q\\subset\\R$', 'Lũy thừa của số hữu tỉ', 'Giá trị tuyệt đối', 'Căn bậc hai số học'] },
      { title: 'Góc & Đường thẳng song song', items: ['Góc đối đỉnh, kề bù', 'Dấu hiệu song song', 'Tính chất song song', 'Tiên đề Euclid'] },
      { title: 'Hình khối', items: ['Hình hộp chữ nhật, lập phương', 'Lăng trụ đứng', '$S_{xq}=C\\cdot h$, $V=S\\cdot h$'] },
      { title: 'Thống kê', items: ['Thu thập, phân loại dữ liệu', 'Biểu đồ đoạn thẳng', 'Biểu đồ hình quạt tròn'] },
      { title: 'Dạng bài trọng tâm HK1', items: ['Tính hợp lí số hữu tỉ', 'Tìm $x$ có dấu giá trị tuyệt đối', 'Tính góc với hai đường song song', 'Bài toán hình khối thực tế'] },
    ],
  },
  '7-HK2': {
    root: 'TOÁN 7 — HỌC KỲ II',
    branches: [
      { title: 'Tỉ lệ thức & Đại lượng tỉ lệ', items: ['Tích chéo $ad=bc$', 'Dãy tỉ số bằng nhau', 'Tỉ lệ thuận $y=kx$', 'Tỉ lệ nghịch $xy=a$'] },
      { title: 'Biểu thức & Đa thức', items: ['Thu gọn, sắp xếp, bậc', 'Cộng, trừ theo cột', 'Nghiệm của đa thức', 'Tìm tham số $m$'] },
      { title: 'Tam giác', items: ['Tổng ba góc, góc ngoài', 'c.c.c, c.g.c, g.c.g', 'Tam giác cân, đều', 'Bất đẳng thức tam giác', 'Bốn đường đồng quy'] },
      { title: 'Xác suất', items: ['Biến cố chắc chắn / không thể / ngẫu nhiên', '$P(A)=\\f{m}{k}$'] },
      { title: 'Dạng bài trọng tâm HK2', items: ['Bài toán chia tỉ lệ', 'Tính giá trị, tìm nghiệm đa thức', 'Chứng minh hai tam giác bằng nhau', 'Chứng minh trung trực, vuông góc'] },
    ],
  },
  '8-HK1': {
    root: 'TOÁN 8 — HỌC KỲ I',
    branches: [
      { title: 'Đa thức & Hằng đẳng thức', items: ['Bảy hằng đẳng thức đáng nhớ', 'Bốn phương pháp phân tích nhân tử', 'Tách hạng tử, thêm bớt', 'Hoàn thành bình phương'] },
      { title: 'Phân thức đại số', items: ['Điều kiện xác định', 'Rút gọn, quy đồng', 'Bốn phép tính', 'Bài toán phụ sau rút gọn'] },
      { title: 'Tứ giác', items: ['Sơ đồ quan hệ các tứ giác', 'Dấu hiệu nhận biết', 'Đường trung bình', 'Trung tuyến cạnh huyền'] },
      { title: 'Pythagore & Hình chóp', items: ['$a^{2}=b^{2}+c^{2}$', 'Pythagore đảo', 'Bộ ba Pythagore', '$V=\\f{1}{3}Sh$'] },
      { title: 'Dạng bài trọng tâm HK1', items: ['Phân tích nhân tử, tìm $x$', 'Rút gọn biểu thức', 'Chứng minh tứ giác đặc biệt', 'Cực trị bằng hoàn thành bình phương'] },
    ],
  },
  '8-HK2': {
    root: 'TOÁN 8 — HỌC KỲ II',
    branches: [
      { title: 'Phương trình bậc nhất', items: ['$ax+b=0$', 'Phương trình tích', 'Phương trình chứa ẩn ở mẫu', 'Sáu bước giải bài toán lời văn'] },
      { title: 'Hàm số bậc nhất', items: ['$y=ax+b$, hệ số góc', 'Đồng biến / nghịch biến', 'Vị trí tương đối hai đường thẳng'] },
      { title: 'Thalès & Đồng dạng', items: ['Thalès thuận, đảo, hệ quả', 'Tính chất đường phân giác', 'c.c.c – c.g.c – g.g', 'Tỉ số diện tích $k^{2}$'] },
      { title: 'Xác suất', items: ['Xác suất lí thuyết', 'Xác suất thực nghiệm', 'Ước lượng tần số'] },
      { title: 'Dạng bài trọng tâm HK2', items: ['Giải bài toán bằng cách lập phương trình', 'Bài toán chuyển động, năng suất', 'Chứng minh đồng dạng, hệ thức tích', 'Ứng dụng đồng dạng đo gián tiếp'] },
    ],
  },
  '9-HK1': {
    root: 'TOÁN 9 — HỌC KỲ I',
    branches: [
      { title: 'Căn thức bậc hai', items: ['$\\s{A^{2}}=\\abs{A}$', 'Đưa ra / vào dấu căn', 'Trục căn thức, liên hợp', 'Quy trình 5 bước rút gọn'] },
      { title: 'Hệ phương trình', items: ['Phương pháp thế', 'Phương pháp cộng đại số', 'Đặt ẩn phụ', 'Sáu bước lập hệ'] },
      { title: 'Bất phương trình', items: ['Tính chất bất đẳng thức', 'Nhân số âm: đổi chiều', 'Biểu diễn tập nghiệm'] },
      { title: 'Hệ thức lượng & Đường tròn', items: ['$b^{2}=ab\'$, $h^{2}=b\'c\'$, $ah=bc$', 'Tỉ số lượng giác', 'Tiếp tuyến, hai tiếp tuyến cắt nhau', 'Góc nội tiếp, tứ giác nội tiếp'] },
      { title: 'Dạng bài trọng tâm HK1', items: ['Rút gọn biểu thức + câu hỏi phụ', 'Giải bài toán bằng cách lập hệ', 'Giải tam giác vuông', 'Chứng minh tứ giác nội tiếp'] },
    ],
  },
  '9-HK2': {
    root: 'TOÁN 9 — HỌC KỲ II',
    branches: [
      { title: 'Hàm số $y=ax^{2}$', items: ['Parabol, bề lõm theo dấu $a$', 'Phương trình hoành độ giao điểm', 'Số giao điểm theo $\\Delta$'] },
      { title: 'Phương trình bậc hai', items: ['$\\Delta=b^{2}-4ac$', 'Công thức nghiệm, thu gọn', 'Nhẩm nghiệm khi $a\\pm b+c=0$', 'Phương trình trùng phương'] },
      { title: 'Hệ thức Viète', items: ['$S=-\\f{b}{a}$, $P=\\f{c}{a}$', 'Biểu thức đối xứng', 'Dấu của hai nghiệm', 'Hệ thức độc lập tham số'] },
      { title: 'Hình khối tròn xoay', items: ['Hình trụ: $V=\\pi r^{2}h$', 'Hình nón: $V=\\f{1}{3}\\pi r^{2}h$, $l^{2}=r^{2}+h^{2}$', 'Hình cầu: $S=4\\pi R^{2}$, $V=\\f{4}{3}\\pi R^{3}$'] },
      { title: 'Trọng tâm ôn thi vào 10', items: ['Câu 1: rút gọn biểu thức', 'Câu 2: lập hệ / lập phương trình', 'Câu 3: parabol – đường thẳng, Viète tham số', 'Câu 4: hình học 4 ý', 'Câu 5: bất đẳng thức, cực trị'] },
    ],
  },
};

export const getTermMindMap = (grade: Grade, term: Term): MindMap | undefined =>
  TERM_MINDMAPS[`${grade}-${term}`];
