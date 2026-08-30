import type { Question } from '@/types';

/**
 * BÀI MẪU CÓ LỜI GIẢI — bổ sung cho các chuyên đề THCS chưa có bài mẫu:
 * hệ thức lượng, Viète không đối xứng, cực trị thực tế, thống kê – xác suất,
 * phần nguyên, nguyên lí cực hạn.
 */
export const QUESTIONS_THCS2: Question[] = [
  /* ---------------- HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG ---------------- */
  {
    id: 'q-htl-01',
    topicId: 'hh-he-thuc-luong',
    track: 'thpt',
    difficulty: 2,
    source: 'Dạng ý a Bài IV — đề vào 10 Hà Nội',
    statement:
      'Cho tam giác ABC vuông tại A, đường cao AH. Biết AB = 15 cm, AC = 20 cm. Tính BC, AH, BH và CH.',
    hint: 'Tính cạnh huyền trước bằng Pythagoras, rồi lần lượt dùng ba hệ thức lượng cơ bản.',
    solution: [
      'Tam giác ABC vuông tại A nên BC² = AB² + AC² = 15² + 20² = 225 + 400 = 625, suy ra BC = 25 (cm).',
      'Hệ thức tích hai cạnh góc vuông: AB · AC = BC · AH, nên AH = AB · AC / BC = 15 · 20 / 25 = 12 (cm).',
      'Hệ thức hình chiếu: AB² = BC · BH, nên BH = AB² / BC = 225 / 25 = 9 (cm).',
      'Tương tự AC² = BC · CH, nên CH = AC² / BC = 400 / 25 = 16 (cm).',
      'Kiểm tra: BH + CH = 9 + 16 = 25 = BC ✓, và AH² = BH · CH = 9 · 16 = 144 = 12² ✓.',
    ],
    answer: 'BC = 25 cm; AH = 12 cm; BH = 9 cm; CH = 16 cm',
    barem: [
      'Tính đúng BC = 25 cm: 0,25đ',
      'Tính đúng AH = 12 cm: 0,25đ',
      'Tính đúng BH và CH: 0,25đ',
      'Kiểm tra lại bằng BH + CH = BC hoặc AH² = BH · CH: 0,25đ',
    ],
  },
  {
    id: 'q-htl-02',
    topicId: 'hh-he-thuc-luong',
    track: 'thpt',
    difficulty: 3,
    source: 'Dạng bài toán thực tế đo đạc — Bài III đề vào 10',
    statement:
      'Một người đứng cách chân một toà tháp 24 m, nhìn lên đỉnh tháp với góc nâng 60°. Biết mắt người đó cách mặt đất 1,6 m. Tính chiều cao của toà tháp, làm tròn đến hàng phần mười (lấy √3 ≈ 1,732).',
    hint: 'Dựng tam giác vuông có cạnh ngang là khoảng cách, cạnh đứng là phần tháp cao hơn tầm mắt.',
    solution: [
      'Gọi phần tháp nằm cao hơn tầm mắt là x (m). Trong tam giác vuông có cạnh kề 24 m và góc nhọn 60°, cạnh đối là x.',
      'Ta có tan 60° = x / 24, suy ra x = 24 · tan 60° = 24√3 ≈ 24 · 1,732 = 41,568 (m).',
      'Chiều cao toà tháp bằng phần trên cộng chiều cao tầm mắt: 41,568 + 1,6 = 43,168 (m).',
      'Làm tròn đến hàng phần mười: khoảng 43,2 m.',
      'Lưu ý: bỏ quên bước cộng 1,6 m sẽ ra 41,6 m — đây là lỗi mất điểm phổ biến nhất của dạng này.',
    ],
    answer: 'Chiều cao toà tháp khoảng 43,2 m',
    barem: [
      'Dựng đúng tam giác vuông và chỉ ra tỉ số tang: 0,25đ',
      'Tính đúng x = 24√3 ≈ 41,6 m: 0,25đ',
      'Cộng chiều cao tầm mắt: 0,25đ',
      'Làm tròn đúng và ghi đơn vị: 0,25đ',
    ],
  },

  /* ---------------- VIÈTE VỚI BIỂU THỨC KHÔNG ĐỐI XỨNG ---------------- */
  {
    id: 'q-vkdx-01',
    topicId: 'ds-viete-khong-doi-xung',
    track: 'thpt',
    difficulty: 3,
    source: 'Dạng ý 2 Bài II — đề vào 10 Hà Nội',
    statement:
      'Cho phương trình x² − 6x + m = 0. Tìm m để phương trình có hai nghiệm x₁, x₂ thoả mãn x₁ = 2x₂.',
    hint: 'Hệ thức x₁ = 2x₂ là không đối xứng, nên hãy thế nó vào TỔNG trước, chứ đừng thế vào tích.',
    solution: [
      'Điều kiện có hai nghiệm: Δ = 36 − 4m ≥ 0, tức m ≤ 9.',
      'Theo định lí Viète: x₁ + x₂ = 6 và x₁x₂ = m.',
      'Thế x₁ = 2x₂ vào tổng: 2x₂ + x₂ = 6 ⇒ 3x₂ = 6 ⇒ x₂ = 2, suy ra x₁ = 4.',
      'Thay vào tích: m = x₁x₂ = 4 · 2 = 8.',
      'Đối chiếu điều kiện: m = 8 ≤ 9 nên Δ = 36 − 32 = 4 > 0, phương trình có hai nghiệm phân biệt ✓.',
      'Vậy m = 8.',
    ],
    answer: 'm = 8',
    barem: [
      'Nêu điều kiện Δ ≥ 0: 0,25đ',
      'Viết đúng hệ thức Viète: 0,25đ',
      'Thế vào tổng và tìm được hai nghiệm cụ thể: 0,25đ',
      'Tính m và đối chiếu điều kiện: 0,25đ',
    ],
  },
  {
    id: 'q-vkdx-02',
    topicId: 'ds-viete-khong-doi-xung',
    track: 'chuyen',
    difficulty: 4,
    source: 'Dạng hạ bậc bằng chính phương trình — đề chuyên Sở',
    statement:
      'Cho x₁ là một nghiệm của phương trình x² − 5x + 3 = 0. Tính giá trị của biểu thức P = x₁³ − 4x₁² − 2x₁ + 7.',
    hint: 'Không giải phương trình ra nghiệm chứa căn. Hãy dùng chính phương trình để hạ bậc.',
    solution: [
      'Vì x₁ là nghiệm nên x₁² − 5x₁ + 3 = 0, suy ra công thức hạ bậc: x₁² = 5x₁ − 3.',
      'Tính x₁³ = x₁ · x₁² = x₁(5x₁ − 3) = 5x₁² − 3x₁ = 5(5x₁ − 3) − 3x₁ = 25x₁ − 15 − 3x₁ = 22x₁ − 15.',
      'Thay vào P: P = (22x₁ − 15) − 4(5x₁ − 3) − 2x₁ + 7.',
      'Khai triển: P = 22x₁ − 15 − 20x₁ + 12 − 2x₁ + 7.',
      'Thu gọn phần chứa x₁: 22x₁ − 20x₁ − 2x₁ = 0. Phần hằng số: −15 + 12 + 7 = 4.',
      'Vậy P = 4, không phụ thuộc vào việc x₁ là nghiệm nào trong hai nghiệm.',
    ],
    answer: 'P = 4',
    barem: [
      'Viết đúng công thức hạ bậc x₁² = 5x₁ − 3: 0,25đ',
      'Hạ bậc đúng x₁³ = 22x₁ − 15: 0,25đ',
      'Thay và khai triển đúng: 0,25đ',
      'Thu gọn ra P = 4 và nhận xét kết quả không phụ thuộc nghiệm nào: 0,25đ',
    ],
  },

  /* ---------------- CỰC TRỊ THỰC TẾ ---------------- */
  {
    id: 'q-ctt-01',
    topicId: 'tt-cuc-tri-thuc-te',
    track: 'thpt',
    difficulty: 3,
    source: 'Dạng bài toán tối ưu — Bài V đề vào 10',
    statement:
      'Người ta muốn rào một mảnh vườn hình chữ nhật có diện tích 800 m², trong đó một cạnh dựa vào bức tường có sẵn nên không phải rào. Hỏi cần dùng ít nhất bao nhiêu mét hàng rào, và khi đó mảnh vườn có kích thước bằng bao nhiêu?',
    hint: 'Đặt ẩn theo hình vẽ, rút về một biến, rồi dùng bất đẳng thức AM–GM cho hai số có tích không đổi.',
    solution: [
      'Gọi x (m) là cạnh song song với tường và y (m) là cạnh vuông góc với tường, x > 0, y > 0.',
      'Ràng buộc diện tích: xy = 800, suy ra x = 800/y.',
      'Hàng rào gồm một cạnh x và hai cạnh y, nên tổng chiều dài là L = x + 2y = 800/y + 2y.',
      'Hai số hạng 800/y và 2y đều dương và có tích không đổi: (800/y)(2y) = 1600.',
      'Theo bất đẳng thức AM–GM: L = 800/y + 2y ≥ 2√1600 = 2 · 40 = 80.',
      'Dấu bằng xảy ra khi 800/y = 2y ⇔ y² = 400 ⇔ y = 20 (m), khi đó x = 800/20 = 40 (m).',
      'Vậy chiều dài hàng rào nhỏ nhất là 80 m, đạt được khi mảnh vườn có kích thước 40 m × 20 m.',
    ],
    answer: 'Ít nhất 80 m hàng rào, khi mảnh vườn là 40 m × 20 m',
    barem: [
      'Đặt ẩn đúng theo hình và nêu điều kiện dương: 0,25đ',
      'Lập đúng biểu thức L = 800/y + 2y: 0,25đ',
      'Áp dụng AM–GM và chỉ ra tích không đổi: 0,25đ',
      'Tìm dấu bằng và kết luận đủ hai phần (giá trị nhỏ nhất và kích thước): 0,25đ',
    ],
  },
  {
    id: 'q-ctt-02',
    topicId: 'tt-cuc-tri-thuc-te',
    track: 'thpt',
    difficulty: 4,
    source: 'Dạng đọc vị chi tiết đề — Bài V đề vào 10',
    statement:
      'Từ một tấm tôn hình vuông cạnh 60 cm, người ta cắt bỏ bốn hình vuông bằng nhau ở bốn góc rồi gấp lên để được một chiếc hộp không nắp. Biết cạnh hình vuông bị cắt là 10 cm. Tính thể tích chiếc hộp và diện tích tôn thực sự được dùng làm hộp.',
    hint: 'Chiều cao hộp chính bằng cạnh hình vuông bị cắt; cạnh đáy bằng cạnh tấm tôn trừ đi hai lần cạnh đó.',
    solution: [
      'Cắt bỏ ở mỗi góc một hình vuông cạnh 10 cm rồi gấp lên, chiều cao của hộp là 10 cm.',
      'Cạnh đáy của hộp là: 60 − 2 · 10 = 40 (cm).',
      'Thể tích hộp là: 40 · 40 · 10 = 16 000 (cm³).',
      'Diện tích tôn dùng làm hộp gồm một mặt đáy và bốn mặt bên (hộp không nắp).',
      'Diện tích đáy: 40 · 40 = 1 600 (cm²). Diện tích bốn mặt bên: 4 · (40 · 10) = 1 600 (cm²).',
      'Tổng diện tích tôn được dùng: 1 600 + 1 600 = 3 200 (cm²).',
      'Kiểm tra: tấm tôn ban đầu có diện tích 3 600 cm², phần cắt bỏ là 4 · 10 · 10 = 400 cm², còn lại đúng 3 200 cm² ✓.',
    ],
    answer: 'Thể tích 16 000 cm³; diện tích tôn dùng làm hộp 3 200 cm²',
    barem: [
      'Xác định đúng chiều cao 10 cm và cạnh đáy 40 cm: 0,25đ',
      'Tính đúng thể tích 16 000 cm³: 0,25đ',
      'Đếm đúng số mặt của hộp không nắp và tính diện tích: 0,25đ',
      'Kiểm tra lại bằng diện tích tấm tôn ban đầu trừ phần cắt bỏ: 0,25đ',
    ],
  },

  /* ---------------- THỐNG KÊ & XÁC SUẤT ---------------- */
  {
    id: 'q-tkxs-01',
    topicId: 'tt-thong-ke-xac-suat',
    track: 'thpt',
    difficulty: 2,
    source: 'Dạng câu thống kê — Chương trình GDPT 2018',
    statement:
      'Điểm kiểm tra môn Toán của 10 học sinh lần lượt là: 5; 6; 6; 7; 7; 7; 8; 8; 9; 10. Tính số trung bình, trung vị và mốt của mẫu số liệu này.',
    hint: 'Mẫu đã được sắp xếp sẵn; với 10 giá trị thì trung vị là trung bình cộng của hai giá trị ở giữa.',
    solution: [
      'Tổng các giá trị: 5 + 6 + 6 + 7 + 7 + 7 + 8 + 8 + 9 + 10 = 73.',
      'Số trung bình: 73 : 10 = 7,3.',
      'Mẫu có 10 giá trị đã sắp xếp tăng dần, hai giá trị ở giữa là giá trị thứ 5 và thứ 6, đều bằng 7.',
      'Trung vị: (7 + 7) : 2 = 7.',
      'Giá trị 7 xuất hiện 3 lần, nhiều hơn mọi giá trị khác, nên mốt là 7.',
      'Vậy số trung bình là 7,3; trung vị là 7; mốt là 7.',
    ],
    answer: 'Số trung bình 7,3; trung vị 7; mốt 7',
    barem: [
      'Tính đúng tổng và số trung bình: 0,25đ',
      'Xác định đúng vị trí hai giá trị giữa: 0,25đ',
      'Tính đúng trung vị: 0,25đ',
      'Xác định đúng mốt: 0,25đ',
    ],
  },
  {
    id: 'q-tkxs-02',
    topicId: 'tt-thong-ke-xac-suat',
    track: 'thpt',
    difficulty: 3,
    source: 'Dạng câu xác suất — Chương trình GDPT 2018',
    statement:
      'Một hộp có 5 viên bi đỏ và 3 viên bi xanh, các viên bi cùng kích thước. Lấy ngẫu nhiên đồng thời 2 viên bi. Tính xác suất để hai viên lấy ra khác màu.',
    hint: 'Đếm số cách lấy 2 viên bất kì, rồi đếm số cách lấy được một đỏ một xanh.',
    solution: [
      'Hộp có tất cả 5 + 3 = 8 viên bi.',
      'Số cách lấy đồng thời 2 viên bất kì từ 8 viên: 8 · 7 : 2 = 28 (cách).',
      'Số cách lấy được một viên đỏ và một viên xanh: 5 · 3 = 15 (cách).',
      'Xác suất cần tìm: 15 / 28.',
      'Kiểm tra hợp lý: 15/28 ≈ 0,54, nằm trong khoảng từ 0 đến 1 và lớn hơn 0,5 vì hai màu khá cân bằng ✓.',
    ],
    answer: '15/28',
    barem: [
      'Đếm đúng số cách lấy 2 viên bất kì là 28: 0,25đ',
      'Đếm đúng số cách lấy hai viên khác màu là 15: 0,25đ',
      'Lập đúng tỉ số xác suất: 0,25đ',
      'Kết luận và kiểm tra tính hợp lý: 0,25đ',
    ],
  },

  /* ---------------- PHẦN NGUYÊN ---------------- */
  {
    id: 'q-pn-01',
    topicId: 'sh-phan-nguyen',
    track: 'chuyen',
    difficulty: 4,
    source: 'Dạng đếm bội bằng phần nguyên — đề chuyên',
    statement:
      'Tính số các số nguyên dương không vượt quá 1000 mà chia hết cho 3 hoặc chia hết cho 5.',
    hint: 'Dùng phần nguyên để đếm bội, rồi dùng nguyên lí bù trừ để không đếm trùng bội chung.',
    solution: [
      'Số các số không vượt quá 1000 chia hết cho 3 là ⌊1000/3⌋ = 333.',
      'Số các số không vượt quá 1000 chia hết cho 5 là ⌊1000/5⌋ = 200.',
      'Những số chia hết cho cả 3 và 5 thì chia hết cho 15, và có ⌊1000/15⌋ = 66 số như vậy. Chúng đã bị đếm hai lần.',
      'Theo nguyên lí bù trừ, số cần tìm là 333 + 200 − 66 = 467.',
      'Vậy có 467 số thoả mãn.',
    ],
    answer: '467 số',
    barem: [
      'Đếm đúng bội của 3 bằng phần nguyên: 0,25đ',
      'Đếm đúng bội của 5: 0,25đ',
      'Nhận ra phải trừ bội của 15 và đếm đúng: 0,25đ',
      'Áp dụng nguyên lí bù trừ và kết luận: 0,25đ',
    ],
  },
  {
    id: 'q-pn-02',
    topicId: 'sh-phan-nguyen',
    track: 'chuyen',
    difficulty: 4,
    source: 'Dạng giải phương trình chứa phần nguyên — đề chuyên',
    statement: 'Tìm tất cả các số thực x thoả mãn ⌊x⌋ = 3 và {x} = 2/5, trong đó {x} là phần lẻ của x.',
    hint: 'Mọi số thực đều viết được duy nhất dưới dạng x = ⌊x⌋ + {x} với 0 ≤ {x} < 1.',
    solution: [
      'Theo định nghĩa, mọi số thực x viết được duy nhất thành x = ⌊x⌋ + {x}, trong đó ⌊x⌋ là số nguyên và 0 ≤ {x} < 1.',
      'Ở đây ⌊x⌋ = 3 và {x} = 2/5, và ta kiểm tra 0 ≤ 2/5 < 1 nên giá trị này hợp lệ.',
      'Do đó x = 3 + 2/5 = 17/5 = 3,4.',
      'Thử lại: ⌊3,4⌋ = 3 ✓ và {3,4} = 3,4 − 3 = 0,4 = 2/5 ✓.',
      'Vậy x = 17/5 là số duy nhất thoả mãn.',
    ],
    answer: 'x = 17/5 = 3,4',
    barem: [
      'Nêu đúng phân tích x = ⌊x⌋ + {x}: 0,25đ',
      'Kiểm tra điều kiện 0 ≤ {x} < 1: 0,25đ',
      'Tính đúng x = 17/5: 0,25đ',
      'Thử lại và khẳng định tính duy nhất: 0,25đ',
    ],
  },

  /* ---------------- NGUYÊN LÍ CỰC HẠN & PHẢN CHỨNG ---------------- */
  {
    id: 'q-ch-01',
    topicId: 'th-cuc-han',
    track: 'chuyen',
    difficulty: 5,
    source: 'Dạng dùng phần tử lớn nhất — đề chuyên vòng 2',
    statement:
      'Trên một mặt phẳng cho một số hữu hạn điểm, không có ba điểm nào thẳng hàng. Chứng minh rằng tồn tại một đường tròn đi qua ba trong số các điểm đó sao cho không có điểm nào của tập hợp nằm bên trong đường tròn ấy.',
    hint: 'Xét cặp điểm có khoảng cách nhỏ nhất, hoặc xét điểm nhìn một đoạn dưới góc lớn nhất — đây là ý tưởng cực hạn.',
    solution: [
      'Tập hợp điểm là hữu hạn nên số cặp điểm cũng hữu hạn. Chọn hai điểm A, B có khoảng cách AB nhỏ nhất trong tất cả các cặp.',
      'Trong các điểm còn lại, xét góc AMB với M chạy khắp tập hợp. Vì số điểm hữu hạn nên tồn tại điểm C sao cho góc ACB là lớn nhất.',
      'Dựng đường tròn (T) đi qua ba điểm A, B, C. Đường tròn này tồn tại và duy nhất vì ba điểm không thẳng hàng.',
      'Giả sử phản chứng rằng có một điểm D của tập hợp nằm bên trong (T).',
      'Nếu D nằm cùng phía với C so với đường thẳng AB thì D nằm trong (T) kéo theo góc ADB > góc ACB (góc nội tiếp nhìn cùng một cung, điểm bên trong nhìn dưới góc lớn hơn). Điều này mâu thuẫn với cách chọn C là điểm nhìn AB dưới góc lớn nhất.',
      'Nếu D nằm khác phía với C so với AB, ta thay vai trò của C bởi D và lặp lại lập luận trên với nửa mặt phẳng chứa D; vì số điểm hữu hạn nên quá trình này phải dừng, và khi dừng ta thu được đường tròn không chứa điểm nào bên trong.',
      'Vậy tồn tại đường tròn đi qua ba điểm của tập hợp mà không chứa điểm nào của tập hợp bên trong. Điều phải chứng minh.',
    ],
    answer: 'Đường tròn ngoại tiếp tam giác ABC, với AB nhỏ nhất và C nhìn AB dưới góc lớn nhất',
    barem: [
      'Dùng tính hữu hạn để chọn được cặp điểm và điểm cực trị: 0,5đ',
      'Dựng đường tròn qua ba điểm và nêu giả thiết phản chứng: 0,5đ',
      'Chỉ ra mâu thuẫn với tính lớn nhất của góc: 0,5đ',
      'Xử lý trường hợp còn lại và kết luận: 0,5đ',
    ],
  },
  {
    id: 'q-ch-02',
    topicId: 'th-cuc-han',
    track: 'chuyen',
    difficulty: 4,
    source: 'Dạng phản chứng cổ điển — đề chuyên vòng 2',
    statement:
      'Chứng minh rằng không tồn tại số hữu tỉ nào có bình phương bằng 2, tức √2 là số vô tỉ.',
    hint: 'Giả sử ngược lại và chọn cách viết phân số tối giản — chính điều kiện tối giản tạo ra mâu thuẫn.',
    solution: [
      'Giả sử phản chứng rằng √2 là số hữu tỉ, tức √2 = p/q với p, q là các số nguyên dương và phân số p/q đã tối giản, nghĩa là ƯCLN(p, q) = 1.',
      'Bình phương hai vế: 2 = p²/q², suy ra p² = 2q².',
      'Vế phải chia hết cho 2 nên p² chẵn, kéo theo p chẵn (vì bình phương của số lẻ luôn lẻ). Đặt p = 2k với k nguyên dương.',
      'Thay vào: (2k)² = 2q² ⇔ 4k² = 2q² ⇔ q² = 2k².',
      'Lập luận tương tự, q² chẵn nên q chẵn.',
      'Như vậy p và q cùng chia hết cho 2, mâu thuẫn với giả thiết ƯCLN(p, q) = 1.',
      'Mâu thuẫn này chứng tỏ điều giả sử là sai. Vậy √2 là số vô tỉ.',
    ],
    answer: '√2 là số vô tỉ (chứng minh bằng phản chứng)',
    barem: [
      'Nêu đúng giả thiết phản chứng với phân số tối giản: 0,25đ',
      'Suy ra p² = 2q² và p chẵn: 0,25đ',
      'Suy ra q chẵn: 0,25đ',
      'Chỉ ra mâu thuẫn với điều kiện tối giản và kết luận: 0,25đ',
    ],
  },
];
