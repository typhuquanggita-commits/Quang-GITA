import type { Question } from '@/types';

/**
 * NGÂN HÀNG BÀI MẪU CÓ LỜI GIẢI — LUỒNG 4 · TOÁN VÀO LỚP 6
 *
 * Mỗi chuyên đề có hai bài: một bài chuẩn dạng để nắm quy trình, một bài nâng
 * một bậc để thấy dạng ấy bị biến thể như thế nào trong đề thật. Lời giải viết
 * theo chuẩn trình bày tiểu học: mỗi phép tính có một câu lời giải đi kèm.
 */
export const QUESTIONS_L6: Question[] = [
  /* ---------------- PHÂN SỐ & SỐ THẬP PHÂN ---------------- */
  {
    id: 'q-l6-01',
    topicId: 'l6-phan-so-thap-phan',
    track: 'lop6',
    difficulty: 2,
    source: 'Dạng tính giá trị biểu thức — Phần I đề đánh giá năng lực',
    statement: 'Tính giá trị của biểu thức A = (3/4 + 5/6) : 19/24 + 2,5 × 0,4.',
    hint: 'Làm trong ngoặc trước; chia phân số thì nhân với phân số đảo ngược.',
    solution: [
      'Trong ngoặc: 3/4 + 5/6. Mẫu chung là 12, ta có 3/4 = 9/12 và 5/6 = 10/12, nên tổng bằng 19/12.',
      'Phép chia: 19/12 : 19/24 = 19/12 × 24/19 = 24/12 = 2.',
      'Phép nhân: 2,5 × 0,4 = 1.',
      'Vậy A = 2 + 1 = 3.',
    ],
    answer: 'A = 3',
    barem: [
      'Tính đúng tổng trong ngoặc bằng 19/12: 0,25đ',
      'Đổi phép chia thành phép nhân và rút gọn ra 2: 0,25đ',
      'Tính đúng 2,5 × 0,4 = 1: 0,25đ',
      'Kết luận A = 3: 0,25đ',
    ],
  },
  {
    id: 'q-l6-02',
    topicId: 'l6-phan-so-thap-phan',
    track: 'lop6',
    difficulty: 4,
    source: 'Dạng tính nhanh dãy phân số — Phần III đề đánh giá năng lực',
    statement: 'Tính nhanh: B = 1/2 + 1/6 + 1/12 + 1/20 + 1/30.',
    hint: 'Viết mỗi mẫu số thành tích hai số tự nhiên liên tiếp, rồi tách mỗi phân số thành hiệu.',
    solution: [
      'Nhận xét các mẫu số: 2 = 1 × 2; 6 = 2 × 3; 12 = 3 × 4; 20 = 4 × 5; 30 = 5 × 6.',
      'Với hai số tự nhiên liên tiếp, ta có 1/(n × (n + 1)) = 1/n − 1/(n + 1). Kiểm tra: 1/2 − 1/3 = 1/6 ✓.',
      'Do đó B = (1/1 − 1/2) + (1/2 − 1/3) + (1/3 − 1/4) + (1/4 − 1/5) + (1/5 − 1/6).',
      'Các số hạng trung gian khử hết nhau từng đôi một, chỉ còn B = 1 − 1/6.',
      'Vậy B = 5/6.',
    ],
    answer: 'B = 5/6',
    barem: [
      'Phân tích được mẫu số thành tích hai số liên tiếp: 0,25đ',
      'Viết đúng công thức tách 1/(n(n+1)) = 1/n − 1/(n+1): 0,25đ',
      'Khử đúng các số hạng trung gian: 0,25đ',
      'Kết luận B = 5/6: 0,25đ',
    ],
  },

  /* ---------------- TỈ SỐ & TỈ SỐ PHẦN TRĂM ---------------- */
  {
    id: 'q-l6-03',
    topicId: 'l6-ti-so-phan-tram',
    track: 'lop6',
    difficulty: 3,
    source: 'Dạng lãi lỗ — Phần II đề đánh giá năng lực',
    statement:
      'Một cửa hàng nhập một lô hàng hết 12 000 000 đồng. Cửa hàng bán 60% lô hàng với mức lãi 25% so với giá vốn, số hàng còn lại bán với mức lãi 10% so với giá vốn. Hỏi cửa hàng lãi tất cả bao nhiêu tiền?',
    hint: 'Tính giá vốn của từng phần trước, rồi tính lãi của từng phần.',
    solution: [
      'Giá vốn của 60% lô hàng là: 12 000 000 × 60 : 100 = 7 200 000 (đồng).',
      'Tiền lãi của phần này là: 7 200 000 × 25 : 100 = 1 800 000 (đồng).',
      'Giá vốn của phần còn lại là: 12 000 000 − 7 200 000 = 4 800 000 (đồng).',
      'Tiền lãi của phần còn lại là: 4 800 000 × 10 : 100 = 480 000 (đồng).',
      'Tổng tiền lãi là: 1 800 000 + 480 000 = 2 280 000 (đồng).',
      'Đáp số: 2 280 000 đồng.',
    ],
    answer: '2 280 000 đồng',
    barem: [
      'Tính đúng giá vốn của hai phần: 0,25đ',
      'Tính đúng tiền lãi phần thứ nhất: 0,25đ',
      'Tính đúng tiền lãi phần thứ hai: 0,25đ',
      'Cộng và ghi đáp số đầy đủ: 0,25đ',
    ],
  },
  {
    id: 'q-l6-04',
    topicId: 'l6-ti-so-phan-tram',
    track: 'lop6',
    difficulty: 4,
    source: 'Dạng đổi mốc so sánh — câu phân hoá',
    statement:
      'Số học sinh giỏi của một lớp bằng 25% số học sinh còn lại của lớp đó. Hỏi số học sinh giỏi chiếm bao nhiêu phần trăm số học sinh cả lớp?',
    hint: 'Chú ý 25% ở đây là so với số học sinh CÒN LẠI, không phải so với cả lớp.',
    solution: [
      'Ta có: số học sinh giỏi bằng 25% số học sinh còn lại, tức bằng 1/4 số học sinh còn lại.',
      'Coi số học sinh còn lại là 4 phần bằng nhau thì số học sinh giỏi là 1 phần.',
      'Số học sinh cả lớp gồm cả hai nhóm nên bằng 4 + 1 = 5 (phần).',
      'Số học sinh giỏi so với cả lớp là: 1 : 5 = 0,2 = 20%.',
      'Đáp số: 20%.',
    ],
    answer: '20%',
    barem: [
      'Nhận ra 25% là so với số còn lại, không phải so với cả lớp: 0,25đ',
      'Quy về sơ đồ 1 phần và 4 phần: 0,25đ',
      'Tính đúng số phần của cả lớp là 5: 0,25đ',
      'Kết luận 20%: 0,25đ',
    ],
  },

  /* ---------------- TOÁN CHUYỂN ĐỘNG ---------------- */
  {
    id: 'q-l6-05',
    topicId: 'l6-toan-chuyen-dong',
    track: 'lop6',
    difficulty: 3,
    source: 'Dạng gặp nhau có xuất phát lệch giờ — Phần II',
    statement:
      'Quãng đường AB dài 205 km. Lúc 6 giờ, một ô tô đi từ A về B với vận tốc 45 km/giờ. Lúc 7 giờ, một xe máy đi từ B về A với vận tốc 35 km/giờ. Hỏi hai xe gặp nhau lúc mấy giờ?',
    hint: 'Tính trước quãng đường ô tô đã đi được trong 1 giờ trước khi xe máy xuất phát.',
    solution: [
      'Từ 6 giờ đến 7 giờ, ô tô đi một mình trong 1 giờ và đi được: 45 × 1 = 45 (km).',
      'Lúc 7 giờ, khoảng cách còn lại giữa hai xe là: 205 − 45 = 160 (km).',
      'Từ lúc 7 giờ, hai xe đi ngược chiều nên mỗi giờ khoảng cách giảm: 45 + 35 = 80 (km).',
      'Thời gian từ lúc 7 giờ đến khi gặp nhau là: 160 : 80 = 2 (giờ).',
      'Hai xe gặp nhau lúc: 7 giờ + 2 giờ = 9 giờ.',
      'Đáp số: 9 giờ.',
    ],
    answer: 'Hai xe gặp nhau lúc 9 giờ',
    barem: [
      'Tính đúng quãng đường ô tô đi trước là 45 km: 0,25đ',
      'Tính đúng khoảng cách còn lại là 160 km: 0,25đ',
      'Tính đúng thời gian gặp nhau là 2 giờ: 0,25đ',
      'Trả lời đúng thời điểm 9 giờ (không phải "sau 2 giờ"): 0,25đ',
    ],
  },
  {
    id: 'q-l6-06',
    topicId: 'l6-toan-chuyen-dong',
    track: 'lop6',
    difficulty: 4,
    source: 'Dạng dòng nước cho thời gian — câu phân hoá',
    statement:
      'Một ca nô đi xuôi dòng từ A đến B hết 4 giờ, đi ngược dòng từ B về A hết 5 giờ. Biết vận tốc dòng nước là 2 km/giờ. Tính độ dài quãng đường AB.',
    hint: 'Biểu diễn vận tốc xuôi và vận tốc ngược theo quãng đường AB, rồi dùng quan hệ hiệu hai vận tốc bằng 2 lần vận tốc dòng nước.',
    solution: [
      'Gọi độ dài quãng đường AB là s (km).',
      'Vận tốc xuôi dòng là s : 4, vận tốc ngược dòng là s : 5.',
      'Ta có vận tốc xuôi trừ vận tốc ngược bằng 2 lần vận tốc dòng nước, tức bằng 2 × 2 = 4 (km/giờ).',
      'Mỗi giờ ca nô đi xuôi được 1/4 quãng đường, đi ngược được 1/5 quãng đường, hơn kém nhau 1/4 − 1/5 = 1/20 quãng đường.',
      'Vậy 1/20 quãng đường AB bằng 4 km, suy ra AB = 4 × 20 = 80 (km).',
      'Thử lại: vận tốc xuôi 80 : 4 = 20 km/giờ, vận tốc ngược 80 : 5 = 16 km/giờ, hiệu bằng 4 ✓.',
      'Đáp số: 80 km.',
    ],
    answer: 'AB = 80 km',
    barem: [
      'Biểu diễn đúng hai vận tốc theo quãng đường: 0,25đ',
      'Nêu đúng hiệu hai vận tốc bằng 2 lần vận tốc dòng nước: 0,25đ',
      'Tính đúng phần quãng đường ứng với 4 km là 1/20: 0,25đ',
      'Kết luận AB = 80 km và thử lại: 0,25đ',
    ],
  },

  /* ---------------- TOÁN TÍNH NGƯỢC ---------------- */
  {
    id: 'q-l6-07',
    topicId: 'l6-toan-tinh-nguoc',
    track: 'lop6',
    difficulty: 4,
    source: 'Dạng tính ngược nhiều bước — Phần III',
    statement:
      'Một người mang trứng ra chợ bán. Lần thứ nhất bán 1/3 số trứng và thêm 2 quả. Lần thứ hai bán 1/2 số trứng còn lại và thêm 3 quả. Cuối cùng người đó còn 10 quả trứng. Hỏi lúc đầu người đó mang bao nhiêu quả trứng?',
    hint: 'Đi ngược từ 10 quả về đầu; ở mỗi lần bán, xử lý số quả cụ thể trước rồi mới xử lý phân số.',
    solution: [
      'Đi ngược từ cuối. Sau lần bán thứ hai còn 10 quả.',
      'Trước khi bán thêm 3 quả ở lần hai, số trứng là: 10 + 3 = 13 (quả).',
      '13 quả này chính là nửa số trứng còn lại sau lần bán thứ nhất, nên sau lần một người đó còn: 13 × 2 = 26 (quả).',
      'Trước khi bán thêm 2 quả ở lần một, số trứng là: 26 + 2 = 28 (quả).',
      '28 quả này ứng với phần còn lại sau khi đã bán 1/3, tức bằng 2/3 số trứng ban đầu.',
      'Số trứng ban đầu là: 28 : 2 × 3 = 42 (quả).',
      'Thử lại: 42 → bán 14 + 2 = 16, còn 26 → bán 13 + 3 = 16, còn 10 ✓.',
      'Đáp số: 42 quả trứng.',
    ],
    answer: '42 quả trứng',
    barem: [
      'Đi ngược đúng bước cộng 3 quả: 0,25đ',
      'Nhân đôi đúng để ra 26 quả: 0,25đ',
      'Nhận ra 28 quả ứng với 2/3 số ban đầu: 0,25đ',
      'Kết luận 42 quả và thử lại: 0,25đ',
    ],
  },
  {
    id: 'q-l6-08',
    topicId: 'l6-toan-tinh-nguoc',
    track: 'lop6',
    difficulty: 3,
    source: 'Dạng tổng – hiệu ẩn — Phần II',
    statement:
      'Tổng của hai số là 128. Nếu chuyển 12 đơn vị từ số lớn sang số bé thì hai số bằng nhau. Tìm hai số đó.',
    hint: 'Khi chuyển 12 đơn vị mà hai số bằng nhau, hiệu ban đầu của chúng bằng bao nhiêu?',
    solution: [
      'Chuyển 12 đơn vị từ số lớn sang số bé làm số lớn giảm 12 và số bé tăng 12, nên khoảng cách giữa hai số giảm đi 12 + 12 = 24 đơn vị.',
      'Sau khi chuyển, hai số bằng nhau nghĩa là khoảng cách bằng 0, vậy hiệu hai số ban đầu là 24.',
      'Số lớn là: (128 + 24) : 2 = 76.',
      'Số bé là: 128 − 76 = 52.',
      'Thử lại: 76 − 12 = 64 và 52 + 12 = 64, hai số bằng nhau ✓.',
      'Đáp số: 76 và 52.',
    ],
    answer: 'Hai số là 76 và 52',
    barem: [
      'Lập luận được hiệu hai số ban đầu là 24: 0,25đ',
      'Áp dụng đúng công thức tổng – hiệu: 0,25đ',
      'Tính đúng cả hai số: 0,25đ',
      'Thử lại và ghi đáp số: 0,25đ',
    ],
  },

  /* ---------------- HÌNH HỌC TIỂU HỌC ---------------- */
  {
    id: 'q-l6-09',
    topicId: 'l6-hinh-hoc-tieu-hoc',
    track: 'lop6',
    difficulty: 3,
    source: 'Dạng chu vi – diện tích có lối đi — Phần II',
    statement:
      'Một mảnh vườn hình chữ nhật có chu vi 120 m, chiều dài bằng 3/2 chiều rộng. Người ta làm một lối đi rộng 1 m chạy dọc theo một cạnh chiều dài, nằm bên trong mảnh vườn. Tính diện tích phần đất còn lại để trồng rau.',
    hint: 'Từ chu vi tìm nửa chu vi, rồi dùng tỉ số để tìm hai kích thước.',
    solution: [
      'Nửa chu vi mảnh vườn là: 120 : 2 = 60 (m).',
      'Chiều dài bằng 3/2 chiều rộng nên coi chiều rộng là 2 phần, chiều dài là 3 phần; tổng là 5 phần.',
      'Giá trị một phần là: 60 : 5 = 12 (m).',
      'Chiều rộng là 12 × 2 = 24 (m); chiều dài là 12 × 3 = 36 (m).',
      'Diện tích mảnh vườn là: 36 × 24 = 864 (m²).',
      'Lối đi chạy dọc cạnh chiều dài nên là hình chữ nhật 36 m × 1 m, diện tích: 36 × 1 = 36 (m²).',
      'Diện tích phần đất trồng rau là: 864 − 36 = 828 (m²).',
      'Đáp số: 828 m².',
    ],
    answer: '828 m²',
    barem: [
      'Tính đúng nửa chu vi và hai kích thước: 0,25đ',
      'Tính đúng diện tích mảnh vườn: 0,25đ',
      'Tính đúng diện tích lối đi: 0,25đ',
      'Trừ và ghi đáp số kèm đơn vị: 0,25đ',
    ],
  },
  {
    id: 'q-l6-10',
    topicId: 'l6-hinh-hoc-tieu-hoc',
    track: 'lop6',
    difficulty: 3,
    source: 'Dạng hình thang có tỉ số hai đáy — Phần II',
    statement:
      'Một hình thang có diện tích 180 m², chiều cao 12 m và đáy bé bằng 2/3 đáy lớn. Tính độ dài mỗi đáy.',
    hint: 'Từ diện tích và chiều cao, tìm tổng hai đáy trước.',
    solution: [
      'Từ công thức S = (đáy lớn + đáy bé) × chiều cao : 2, ta có tổng hai đáy bằng: 180 × 2 : 12 = 30 (m).',
      'Đáy bé bằng 2/3 đáy lớn nên coi đáy lớn là 3 phần, đáy bé là 2 phần; tổng là 5 phần.',
      'Giá trị một phần là: 30 : 5 = 6 (m).',
      'Đáy lớn là: 6 × 3 = 18 (m). Đáy bé là: 6 × 2 = 12 (m).',
      'Thử lại: (18 + 12) × 12 : 2 = 180 m² ✓.',
      'Đáp số: đáy lớn 18 m, đáy bé 12 m.',
    ],
    answer: 'Đáy lớn 18 m, đáy bé 12 m',
    barem: [
      'Tìm đúng tổng hai đáy bằng 30 m: 0,25đ',
      'Quy đúng về sơ đồ 3 phần và 2 phần: 0,25đ',
      'Tính đúng hai đáy: 0,25đ',
      'Thử lại và ghi đáp số: 0,25đ',
    ],
  },

  /* ---------------- SUY LUẬN LOGIC ---------------- */
  {
    id: 'q-l6-11',
    topicId: 'l6-suy-luan-logic',
    track: 'lop6',
    difficulty: 4,
    source: 'Dạng bảng đúng/sai bốn đối tượng — Phần III',
    statement:
      'Bốn bạn An, Bình, Cường, Dung mỗi bạn thích đúng một môn khác nhau trong bốn môn: Toán, Văn, Anh, Lý. Biết rằng: (1) An không thích Toán và cũng không thích Văn; (2) Cường thích Văn; (3) Bình không thích Lý; (4) Dung không thích Lý và cũng không thích Toán. Hỏi mỗi bạn thích môn nào?',
    hint: 'Kẻ bảng 4 × 4. Xử lý dữ kiện khẳng định trước, sau đó tìm môn nào chỉ còn đúng một người có thể nhận.',
    solution: [
      'Kẻ bảng 4 hàng (bốn bạn) × 4 cột (bốn môn), đánh dấu bằng bút chì.',
      'Từ (2): Cường thích Văn. Đánh ✓ ô Cường – Văn, rồi loại cả hàng Cường và cả cột Văn.',
      'Xét cột Lý: Cường đã nhận Văn; theo (3) Bình không thích Lý; theo (4) Dung không thích Lý. Vậy chỉ còn An có thể thích Lý.',
      'Do đó An thích Lý. Đánh ✓ ô An – Lý, loại cả hàng An và cả cột Lý.',
      'Còn lại Bình và Dung với hai môn Toán và Anh. Theo (4), Dung không thích Toán, nên Dung thích Anh.',
      'Môn còn lại là Toán, thuộc về Bình.',
      'Kiểm tra lại toàn bộ dữ kiện: (1) An thích Lý nên không thích Toán và Văn ✓; (2) Cường thích Văn ✓; (3) Bình thích Toán nên không thích Lý ✓; (4) Dung thích Anh nên không thích Lý và Toán ✓.',
      'Kết luận: An – Lý; Bình – Toán; Cường – Văn; Dung – Anh.',
    ],
    answer: 'An – Lý; Bình – Toán; Cường – Văn; Dung – Anh',
    barem: [
      'Lập bảng và dùng đúng dữ kiện khẳng định (2): 0,25đ',
      'Lập luận theo cột Lý để suy ra An thích Lý: 0,25đ',
      'Xác định đúng Dung và Bình từ dữ kiện (4): 0,25đ',
      'Kiểm tra lại toàn bộ dữ kiện và kết luận đủ bốn bạn: 0,25đ',
    ],
  },
  {
    id: 'q-l6-12',
    topicId: 'l6-suy-luan-logic',
    track: 'lop6',
    difficulty: 5,
    source: 'Dạng cân đĩa — câu chốt của đề',
    statement:
      'Có 12 đồng xu giống hệt nhau, trong đó có đúng một đồng nhẹ hơn các đồng còn lại. Với một chiếc cân thăng bằng hai đĩa và không dùng quả cân, cần cân ít nhất bao nhiêu lần để chắc chắn tìm ra đồng xu nhẹ? Trình bày cách cân.',
    hint: 'Mỗi lần cân cho ba kết quả, nên hãy chia ba nhóm chứ đừng chia đôi.',
    solution: [
      'Mỗi lần cân cho ba kết quả: đĩa trái nhẹ hơn, đĩa phải nhẹ hơn, hoặc hai đĩa bằng nhau. Vì thế nên chia thành ba nhóm.',
      'Lần 1: chia 12 đồng thành ba nhóm, mỗi nhóm 4 đồng. Đặt nhóm A và nhóm B lên hai đĩa. Nếu một đĩa nhẹ hơn thì đồng nhẹ ở nhóm đó; nếu cân bằng thì đồng nhẹ ở nhóm C. Sau lần 1 ta còn 4 đồng nghi vấn.',
      'Lần 2: lấy 4 đồng đó, đặt 1 đồng lên mỗi đĩa và giữ lại 2 đồng. Nếu một đĩa nhẹ hơn thì tìm ra ngay đồng nhẹ, chỉ mất 2 lần. Nếu cân bằng thì đồng nhẹ nằm trong 2 đồng giữ lại.',
      'Lần 3 (trường hợp xấu nhất): đặt 2 đồng còn lại lên hai đĩa, đĩa nhẹ hơn chính là đồng cần tìm.',
      'Vậy trong trường hợp xấu nhất cần 3 lần cân.',
      'Không thể làm với 2 lần: 2 lần cân chỉ phân biệt được nhiều nhất 3 × 3 = 9 trường hợp, trong khi ở đây có 12 khả năng. Vậy 3 là số lần ít nhất.',
      'Đáp số: 3 lần cân.',
    ],
    answer: '3 lần cân',
    barem: [
      'Nêu nguyên tắc chia ba nhóm và giải thích vì sao: 0,25đ',
      'Trình bày đúng lần cân thứ nhất với đủ ba khả năng: 0,25đ',
      'Trình bày đúng hai lần cân còn lại: 0,25đ',
      'Chứng minh 2 lần là không đủ (9 < 12): 0,25đ',
    ],
  },

  /* ---------------- DÃY SỐ QUY LUẬT ---------------- */
  {
    id: 'q-l6-13',
    topicId: 'l6-day-so-quy-luat',
    track: 'lop6',
    difficulty: 3,
    source: 'Dạng tổng dãy cách đều — Phần III',
    statement: 'Tính tổng S = 2 + 4 + 6 + 8 + … + 200.',
    hint: 'Xác định số số hạng trước, đừng vội áp công thức tổng.',
    solution: [
      'Đây là dãy số cách đều với số đầu 2, số cuối 200 và khoảng cách 2.',
      'Số số hạng là: (200 − 2) : 2 + 1 = 99 + 1 = 100 (số hạng).',
      'Tổng dãy cách đều bằng (số đầu + số cuối) × số số hạng : 2.',
      'S = (2 + 200) × 100 : 2 = 202 × 50 = 10 100.',
      'Đáp số: S = 10 100.',
    ],
    answer: 'S = 10 100',
    barem: [
      'Nhận ra dãy cách đều và nêu đúng khoảng cách: 0,25đ',
      'Tính đúng số số hạng là 100 (nhớ cộng 1): 0,25đ',
      'Viết đúng công thức tổng: 0,25đ',
      'Tính ra 10 100: 0,25đ',
    ],
  },
  {
    id: 'q-l6-14',
    topicId: 'l6-day-so-quy-luat',
    track: 'lop6',
    difficulty: 4,
    source: 'Dạng quy luật hai tầng — câu phân hoá',
    statement: 'Cho dãy số 2; 6; 12; 20; 30; … Tìm số hạng thứ 15 của dãy và giải thích quy luật.',
    hint: 'Xét hiệu giữa các số hạng liên tiếp; nếu hiệu chưa đều thì thử viết mỗi số thành tích.',
    solution: [
      'Hiệu giữa các số hạng liên tiếp lần lượt là 4; 6; 8; 10 — không phải hằng số, nên đây không phải dãy cách đều.',
      'Nhưng hiệu của các hiệu đều bằng 2, cho thấy dãy có quy luật hai tầng.',
      'Thử viết mỗi số thành tích: 2 = 1 × 2; 6 = 2 × 3; 12 = 3 × 4; 20 = 4 × 5; 30 = 5 × 6.',
      'Vậy số hạng thứ n bằng n × (n + 1).',
      'Số hạng thứ 15 là: 15 × 16 = 240.',
      'Đáp số: 240.',
    ],
    answer: 'Số hạng thứ 15 là 240',
    barem: [
      'Xét hiệu và chỉ ra dãy không cách đều: 0,25đ',
      'Phát hiện hiệu của hiệu bằng 2: 0,25đ',
      'Phát biểu đúng quy luật n × (n + 1): 0,25đ',
      'Tính đúng số hạng thứ 15 là 240: 0,25đ',
    ],
  },

  /* ---------------- ĐỌC HIỂU DỮ LIỆU ---------------- */
  {
    id: 'q-l6-15',
    topicId: 'l6-doc-hieu-du-lieu',
    track: 'lop6',
    difficulty: 3,
    source: 'Dạng ba bước với hai mốc so sánh khác nhau — Phần II',
    statement:
      'Một cửa hàng bán hết 1 200 kg gạo trong ba ngày. Ngày đầu bán được 30% tổng số gạo. Ngày thứ hai bán được 5/7 số gạo còn lại sau ngày đầu. Hỏi ngày thứ ba cửa hàng bán được bao nhiêu ki-lô-gam gạo?',
    hint: 'Chú ý hai mốc so sánh khác nhau: 30% là của tổng, còn 5/7 là của số còn lại.',
    solution: [
      'Số gạo bán ngày đầu là: 1 200 × 30 : 100 = 360 (kg).',
      'Số gạo còn lại sau ngày đầu là: 1 200 − 360 = 840 (kg).',
      'Số gạo bán ngày thứ hai là 5/7 của 840 kg: 840 : 7 × 5 = 600 (kg).',
      'Số gạo bán ngày thứ ba là: 840 − 600 = 240 (kg).',
      'Thử lại: 360 + 600 + 240 = 1 200 kg ✓.',
      'Đáp số: 240 kg.',
    ],
    answer: '240 kg',
    barem: [
      'Tính đúng số gạo ngày đầu là 360 kg: 0,25đ',
      'Tính đúng số còn lại là 840 kg: 0,25đ',
      'Lấy 5/7 của 840 kg chứ không phải của 1 200 kg: 0,25đ',
      'Kết luận 240 kg và thử lại: 0,25đ',
    ],
  },
  {
    id: 'q-l6-16',
    topicId: 'l6-doc-hieu-du-lieu',
    track: 'lop6',
    difficulty: 4,
    source: 'Dạng trung bình cộng theo nhóm — câu phân hoá',
    statement:
      'Trung bình cộng của 5 số là 32. Trung bình cộng của 2 số đầu là 26. Tìm trung bình cộng của 3 số còn lại.',
    hint: 'Đưa mọi trung bình cộng về tổng trước khi làm bất kỳ phép nào khác.',
    solution: [
      'Tổng của 5 số là: 32 × 5 = 160.',
      'Tổng của 2 số đầu là: 26 × 2 = 52.',
      'Tổng của 3 số còn lại là: 160 − 52 = 108.',
      'Trung bình cộng của 3 số còn lại là: 108 : 3 = 36.',
      'Kiểm tra hợp lý: 2 số đầu có trung bình 26 thấp hơn 32, nên 3 số còn lại phải có trung bình cao hơn 32 ✓.',
      'Đáp số: 36.',
    ],
    answer: '36',
    barem: [
      'Đổi trung bình cộng thành tổng cho cả hai nhóm: 0,25đ',
      'Tính đúng tổng 3 số còn lại là 108: 0,25đ',
      'Chia đúng cho 3: 0,25đ',
      'Kiểm tra hợp lý và ghi đáp số: 0,25đ',
    ],
  },
];
