import type { StrandId, TrackId } from '@/types';

/**
 * SỔ TAY CÔNG THỨC MATH365
 *
 * Không phải danh sách công thức chép từ sách giáo khoa. Mỗi mục trả lời ba câu:
 *   — Công thức là gì (viết đúng, kèm điều kiện áp dụng).
 *   — Dùng khi nào (dấu hiệu trong đề để biết phải rút công thức này ra).
 *   — Sai ở đâu (lỗi điển hình khiến học sinh mất điểm dù nhớ đúng công thức).
 *
 * Mục có dấu sao là công thức bắt buộc thuộc lòng: viết được ra giấy trong 5 giây,
 * không cần nghĩ. Đây là danh sách tối thiểu để vào phòng thi.
 */

export interface FormulaItem {
  name: string;
  expr: string;
  /** Điều kiện áp dụng — bỏ qua điều kiện là nguyên nhân mất điểm số một. */
  condition?: string;
  /** Dấu hiệu trong đề cho biết phải dùng công thức này. */
  use: string;
  /** Lỗi điển hình. */
  trap?: string;
  /** Bắt buộc thuộc lòng. */
  star?: boolean;
}

export interface FormulaGroup {
  id: string;
  name: string;
  strand: StrandId;
  /** 'tieu-hoc' cho luồng vào 6; 'thcs' cho luồng vào 10 và chuyên; 10/11/12 cho luồng THPT. */
  grade: 'tieu-hoc' | 6 | 7 | 8 | 'thcs' | 10 | 11 | 12 | 'diem-10';
  tracks: TrackId[];
  topicIds: string[];
  intro: string;
  items: FormulaItem[];
}

export const FORMULA_GROUPS: FormulaGroup[] = [
  /* ==================== TIỂU HỌC — LUỒNG VÀO LỚP 6 ==================== */
  {
    id: 'f-l6-so-hoc',
    name: 'Phân số, số thập phân & tỉ số phần trăm',
    strand: 'so-hoc',
    grade: 'tieu-hoc',
    tracks: ['lop6'],
    topicIds: ['l6-phan-so-thap-phan', 'l6-ti-so-phan-tram'],
    intro:
      'Bộ công cụ nền của mọi câu trong đề vào 6. Không có công thức nào khó, nhưng sai một bước ở đây thì cả câu mất điểm dù cách làm hoàn toàn đúng.',
    items: [
      { name: 'Cộng, trừ phân số khác mẫu', expr: 'a/b ± c/d = (a·d ± c·b)/(b·d), rồi rút gọn', use: 'Mọi phép cộng trừ phân số không cùng mẫu.', trap: 'Cộng tử với tử và mẫu với mẫu — lỗi kinh điển.', star: true },
      { name: 'Nhân, chia phân số', expr: 'a/b × c/d = (a·c)/(b·d);  a/b : c/d = a/b × d/c', use: 'Rút gọn chéo trước khi nhân để tránh số lớn.', trap: 'Đảo ngược số bị chia thay vì số chia.', star: true },
      { name: 'Tìm phân số của một số', expr: 'm/n của A = A × m : n', use: 'Bài "đã dùng 2/5 số gạo", "bán được 3/4 số vở".', trap: 'Lấy phân số của tổng trong khi đề nói "của số còn lại".', star: true },
      { name: 'Tìm một số khi biết phân số của nó', expr: 'Nếu m/n của A bằng B thì A = B : m × n', use: 'Bài cho phần và hỏi tổng.', star: true },
      { name: 'Tỉ số phần trăm của a so với b', expr: 'a : b × 100%', use: 'Bài hỏi "chiếm bao nhiêu phần trăm".', trap: 'Đảo thứ tự a và b.', star: true },
      { name: 'Tìm giá trị phần trăm', expr: 'p% của A = A × p : 100', use: 'Giảm giá, tiền lãi, tỉ lệ học sinh.', trap: 'Trả lời phần đã giảm trong khi đề hỏi phần còn lại.', star: true },
      { name: 'Tìm số khi biết p% của nó', expr: 'Nếu p% của A bằng m thì A = m : p × 100', use: 'Bài cho phần trăm và giá trị tương ứng, hỏi tổng.', star: true },
      { name: 'Tăng a% rồi giảm b%', expr: 'Giá cuối = gốc × (100 + a) : 100 × (100 − b) : 100', use: 'Bài có hai lần thay đổi giá liên tiếp.', trap: 'Cộng trừ trực tiếp hai số phần trăm — sai vì chúng tính trên hai số khác nhau.', star: true },
      { name: 'Trung bình cộng', expr: 'Trung bình = tổng các số : số các số', use: 'Bài đọc bảng số liệu, bài "trung bình mỗi ngày".', trap: 'Chia sai số phần vì đếm sót một cột.', star: true },
    ],
  },
  {
    id: 'f-l6-chuyen-dong',
    name: 'Chuyển động & các bài toán điển hình',
    strand: 'thuc-te',
    grade: 'tieu-hoc',
    tracks: ['lop6'],
    topicIds: ['l6-toan-chuyen-dong', 'l6-toan-tinh-nguoc'],
    intro:
      'Ba mô hình chuyển động chuẩn và bốn bài toán điển hình. Nhớ theo sơ đồ mũi tên và sơ đồ đoạn thẳng thì không bao giờ nhầm cộng với trừ.',
    items: [
      { name: 'Quan hệ quãng đường – vận tốc – thời gian', expr: 's = v × t;  v = s : t;  t = s : v', condition: 'Mọi đại lượng phải cùng hệ đơn vị', use: 'Nền của mọi bài chuyển động.', trap: 'Để lẫn phút với giờ trong cùng một phép chia.', star: true },
      { name: 'Ngược chiều gặp nhau', expr: 't = s : (v₁ + v₂)', use: 'Hai vật đi về phía nhau, đề cho khoảng cách ban đầu.', trap: 'Trừ vận tốc vì nhớ nhầm sang dạng đuổi kịp.', star: true },
      { name: 'Cùng chiều đuổi kịp', expr: 't = (khoảng cách đầu) : (v₁ − v₂)', condition: 'Vật đuổi phải nhanh hơn', use: 'Một vật xuất phát trước hoặc đã đi được một đoạn.', trap: 'Cộng vận tốc, hoặc quên đổi thời gian đi trước thành quãng đường.', star: true },
      { name: 'Chuyển động trên dòng nước', expr: 'v xuôi = v thực + v dòng;  v ngược = v thực − v dòng', use: 'Ca nô, thuyền, bè trên sông.', trap: 'Lấy tổng chia đôi rồi trả lời là vận tốc dòng nước.', star: true },
      { name: 'Hai công thức hệ quả của dòng nước', expr: 'v dòng = (v xuôi − v ngược) : 2;  v thực = (v xuôi + v ngược) : 2', use: 'Đề cho hai vận tốc, hỏi một thành phần.', star: true },
      { name: 'Tổng – hiệu', expr: 'Số lớn = (tổng + hiệu) : 2;  Số bé = (tổng − hiệu) : 2', use: 'Đề cho tổng và hiệu của hai số.', star: true },
      { name: 'Tổng – tỉ', expr: 'Giá trị một phần = tổng : (số phần lớn + số phần bé)', use: 'Đề cho tổng và tỉ số.', trap: 'Trả lời giá trị một phần thay vì giá trị đại lượng đề hỏi.', star: true },
      { name: 'Hiệu – tỉ', expr: 'Giá trị một phần = hiệu : (số phần lớn − số phần bé)', use: 'Đề cho hiệu và tỉ số.', trap: 'Dùng nhầm mẫu số của bài tổng – tỉ.', star: true },
      { name: 'Tính ngược', expr: 'Đi từ kết quả về đầu, mỗi bước làm phép tính ngược lại', use: 'Đề mô tả chuỗi phép tính rồi cho kết quả cuối.', trap: 'Đi ngược nhưng vẫn dùng đúng phép tính trong đề.', star: true },
    ],
  },
  {
    id: 'f-l6-hinh-quy-luat',
    name: 'Hình học tiểu học, dãy số & đếm hình',
    strand: 'hinh-hoc',
    grade: 'tieu-hoc',
    tracks: ['lop6'],
    topicIds: ['l6-hinh-hoc-tieu-hoc', 'l6-day-so-quy-luat', 'l6-suy-luan-logic'],
    intro:
      'Nhóm công thức dễ nhớ nhất nhưng mất điểm nhiều nhất, vì điểm rơi luôn nằm ở chi tiết đề (không nắp, hình ghép, quên cộng 1) chứ không nằm ở công thức.',
    items: [
      { name: 'Diện tích tam giác', expr: 'S = a × h : 2', use: 'Mọi tam giác, với h là chiều cao ứng với cạnh a.', trap: 'Quên chia 2; hoặc dùng chiều cao của hình khác trong hình ghép.', star: true },
      { name: 'Diện tích hình thang', expr: 'S = (a + b) × h : 2', use: 'Hình thang và các hình ghép có một cạnh xiên.', trap: 'Quên chia 2.', star: true },
      { name: 'Hình tròn', expr: 'C = d × 3,14 = r × 2 × 3,14;  S = r × r × 3,14', use: 'Bài bánh xe, mặt bàn tròn, đường chạy.', trap: 'Dùng đường kính thay bán kính trong công thức diện tích.', star: true },
      { name: 'Hình hộp chữ nhật', expr: 'S xq = chu vi đáy × chiều cao;  S tp = S xq + 2 × S đáy;  V = a × b × c', use: 'Bể nước, thùng hàng, hộp quà.', trap: 'Tính cả nắp cho bể không nắp.', star: true },
      { name: 'Hình lập phương', expr: 'S xq = a × a × 4;  S tp = a × a × 6;  V = a × a × a', use: 'Khối rubik, viên xúc xắc, thùng vuông.', star: true },
      { name: 'Đổi đơn vị thể tích và dung tích', expr: '1 dm³ = 1 lít;  1 m³ = 1000 dm³;  1 dm³ = 1000 cm³', use: 'Bài hỏi bể chứa được bao nhiêu lít nước.', trap: 'Nhân chia sai 1000 lần vì đổi thiếu một bậc.', star: true },
      { name: 'Thay đổi kích thước', expr: 'Nhân đôi cạnh: diện tích gấp 4, thể tích gấp 8', use: 'Bài "nếu tăng gấp đôi chiều dài thì diện tích thay đổi thế nào".', trap: 'Nghĩ diện tích cũng gấp đôi.' },
      { name: 'Số số hạng của dãy cách đều', expr: '(số cuối − số đầu) : khoảng cách + 1', use: 'Mọi bài đếm số hạng, đếm cây trồng dọc đường.', trap: 'Quên cộng 1.', star: true },
      { name: 'Số hạng thứ n', expr: 'số đầu + (n − 1) × khoảng cách', use: 'Bài hỏi số hạng ở vị trí xa.', trap: 'Quên trừ 1.', star: true },
      { name: 'Tổng dãy cách đều', expr: '(số đầu + số cuối) × số số hạng : 2', use: 'Bài tính tổng một dãy dài.', trap: 'Quên chia 2 sau khi nhân.', star: true },
      { name: 'Đếm hình chữ nhật trong lưới', expr: 'Số cách chọn 2 trong (m+1) đường ngang × số cách chọn 2 trong (n+1) đường dọc, với số cách chọn 2 trong k đường = k × (k − 1) : 2', use: 'Hình chia lưới ô vuông, hỏi tổng số hình chữ nhật.', trap: 'Chỉ đếm các ô nhỏ, bỏ sót hình ghép.' },
      { name: 'Cân đĩa tìm vật khác biệt', expr: 'n lần cân phân biệt được tối đa 3ⁿ vật', use: 'Bài cân thăng bằng không dùng quả cân.', trap: 'Chia đôi theo phản xạ thay vì chia ba.' },
    ],
  },
  /* ==================== CHÍNH KHOÁ LỚP 6 – 8 ==================== */
  {
    id: 'f-ck6',
    name: 'Toán 6 — số tự nhiên, số nguyên, phân số và hình trực quan',
    strand: 'so-hoc',
    grade: 6,
    tracks: ['chinh-khoa'],
    topicIds: ['ck6-so-tu-nhien', 'ck6-so-nguyen', 'ck6-phan-so', 'ck6-hinh-truc-quan'],
    intro:
      'Toàn bộ công thức và quy tắc của Toán 6. Ba nhóm đầu quyết định thói quen tính toán cho cả bốn năm THCS; sai quy tắc dấu ở đây sẽ kéo dài hậu quả tới tận lớp 9.',
    items: [
      { name: 'Thứ tự thực hiện phép tính', expr: 'Luỹ thừa → nhân chia → cộng trừ; có ngoặc thì trong ngoặc trước', use: 'Mọi biểu thức nhiều phép tính.', trap: 'Tính tuần tự từ trái sang phải, bỏ qua ưu tiên của luỹ thừa.', star: true },
      { name: 'Nhân chia hai luỹ thừa cùng cơ số', expr: 'aᵐ · aⁿ = aᵐ⁺ⁿ;  aᵐ : aⁿ = aᵐ⁻ⁿ', condition: 'm ≥ n và a ≠ 0 với phép chia', use: 'Rút gọn biểu thức có luỹ thừa trước khi tính ra số.', star: true },
      { name: 'Dấu hiệu chia hết', expr: 'Cho 2: chữ số tận cùng chẵn. Cho 5: tận cùng 0 hoặc 5. Cho 3 (hoặc 9): tổng các chữ số chia hết cho 3 (hoặc 9)', use: 'Bài tìm chữ số, bài rút gọn phân số nhanh.', star: true },
      { name: 'ƯCLN và BCNN', expr: 'ƯCLN: thừa số nguyên tố chung, mũ nhỏ nhất. BCNN: thừa số chung và riêng, mũ lớn nhất', use: '"Chia đều, nhiều nhất" là ƯCLN; "cùng lặp lại, xếp hàng vừa đủ" là BCNN.', trap: 'Nhầm hai bài toán thực tế nghe rất giống nhau.', star: true },
      { name: 'Quan hệ ƯCLN và BCNN', expr: 'ƯCLN(a, b) × BCNN(a, b) = a × b', use: 'Biết một trong hai, tính nhanh cái còn lại.' },
      { name: 'Bỏ ngoặc có dấu trừ', expr: 'a − (b + c) = a − b − c;  a − (b − c) = a − b + c', use: 'Mọi biểu thức có dấu trừ trước ngoặc.', trap: 'Chỉ đổi dấu số hạng đầu tiên — lỗi phổ biến nhất của chương số nguyên.', star: true },
      { name: 'Quy tắc dấu khi nhân chia', expr: '(−a)(−b) = ab;  (−a)b = −(ab)', use: 'Mọi phép nhân chia có số âm.', trap: 'Nhầm −a² với (−a)²: số đầu âm, số sau dương.', star: true },
      { name: 'Cộng, trừ phân số', expr: 'a/b ± c/d = (a·d ± c·b)/(b·d), rồi rút gọn', use: 'Quy đồng bằng bội chung nhỏ nhất để số không bị lớn.', trap: 'Cộng tử với tử và mẫu với mẫu.', star: true },
      { name: 'Nhân, chia phân số', expr: 'a/b × c/d = (ac)/(bd);  a/b : c/d = a/b × d/c', use: 'Rút gọn chéo trước khi nhân.', star: true },
      { name: 'Tìm phân số của một số và ngược lại', expr: 'm/n của A = A × m : n;  A = giá trị : m × n', use: 'Bài toán phân số nhiều bước.', trap: 'Làm ngược chiều: nhân trong khi phải chia.', star: true },
      { name: 'Ba bài toán phần trăm', expr: 'p% của A = A × p : 100;  A = m : p × 100;  tỉ số phần trăm của a so với b = a : b × 100%', use: 'Giảm giá, lãi lỗ, tỉ lệ học sinh.', star: true },
      { name: 'Diện tích hình bình hành và hình thoi', expr: 'S hình bình hành = a × h;  S hình thoi = (d₁ × d₂) : 2', use: 'Bài tính diện tích hình ghép.', trap: 'Quên chia 2 ở công thức hình thoi.', star: true },
      { name: 'Xác suất thực nghiệm', expr: 'Số lần sự kiện xảy ra : tổng số lần thực hiện', use: 'Bài tung đồng xu, gieo xúc xắc, rút thẻ.', star: true },
    ],
  },
  {
    id: 'f-ck7',
    name: 'Toán 7 — số hữu tỉ, tỉ lệ thức, đa thức và tam giác',
    strand: 'so-hoc',
    grade: 7,
    tracks: ['chinh-khoa'],
    topicIds: ['ck7-so-huu-ti-so-thuc', 'ck7-ti-le-thuc', 'ck7-bieu-thuc-da-thuc', 'ck7-tam-giac-bang-nhau'],
    intro:
      'Lớp 7 là năm bước từ số sang chữ và từ nhận biết sang chứng minh. Hai nhóm quan trọng nhất là tỉ lệ thức (ứng dụng nhiều nhất) và tam giác bằng nhau (định hình cách trình bày cho ba năm còn lại).',
    items: [
      { name: 'Luỹ thừa của số hữu tỉ', expr: '(aᵐ)ⁿ = aᵐⁿ;  aᵐ · aⁿ = aᵐ⁺ⁿ;  (ab)ⁿ = aⁿbⁿ', use: 'Rút gọn biểu thức luỹ thừa.', trap: 'Nhầm (aᵐ)ⁿ thành aᵐ⁺ⁿ.', star: true },
      { name: 'Căn bậc hai số học', expr: '√(a²) = |a|;  √(ab) = √a · √b', condition: 'a, b ≥ 0', use: 'Rút gọn biểu thức chứa căn.', trap: 'Viết √(a²) = a mà quên dấu giá trị tuyệt đối.', star: true },
      { name: 'Phương trình chứa giá trị tuyệt đối', expr: '|x| = a (a ≥ 0) ⟺ x = a hoặc x = −a', use: 'Bài tìm x có dấu giá trị tuyệt đối.', trap: 'Chỉ lấy một nghiệm.', star: true },
      { name: 'Tính chất tỉ lệ thức', expr: 'a/b = c/d ⟺ a·d = b·c', use: 'Bài tìm x trong tỉ lệ thức.', star: true },
      { name: 'Dãy tỉ số bằng nhau', expr: 'a/x = b/y = c/z = (a + b + c)/(x + y + z)', condition: 'x + y + z ≠ 0', use: 'Chia một số thành các phần tỉ lệ.', trap: 'Áp dụng khi mẫu có thể triệt tiêu nhau.', star: true },
      { name: 'Đại lượng tỉ lệ thuận và tỉ lệ nghịch', expr: 'Tỉ lệ thuận: y = kx (thương không đổi). Tỉ lệ nghịch: x·y = a (tích không đổi)', use: 'Bài năng suất, số công nhân, vận tốc.', trap: 'Dùng tỉ lệ thuận cho bài tỉ lệ nghịch.', star: true },
      { name: 'Bậc và nghiệm của đa thức', expr: 'Bậc là bậc cao nhất SAU KHI thu gọn; x = a là nghiệm ⟺ P(a) = 0', use: 'Bài thu gọn đa thức và tìm nghiệm.', trap: 'Xác định bậc trước khi thu gọn.', star: true },
      { name: 'Tổng ba góc và góc ngoài tam giác', expr: 'Tổng ba góc trong = 180°; góc ngoài = tổng hai góc trong không kề', use: 'Bài tính số đo góc.', star: true },
      { name: 'Ba trường hợp bằng nhau của tam giác', expr: 'c–c–c, c–g–c, g–c–g (thêm cạnh huyền – cạnh góc vuông và cạnh huyền – góc nhọn cho tam giác vuông)', use: 'Mọi bài chứng minh hình học lớp 7.', trap: 'Viết trường hợp cạnh – cạnh – góc; trường hợp này KHÔNG tồn tại.', star: true },
      { name: 'Bất đẳng thức tam giác', expr: '|b − c| < a < b + c', use: 'Kiểm tra ba số có là ba cạnh tam giác không.', trap: 'Chỉ viết một vế của bất đẳng thức.', star: true },
      { name: 'Trọng tâm tam giác', expr: 'Ba trung tuyến đồng quy tại G; GA = (2/3)·AM với M là trung điểm BC', use: 'Bài về đường trung tuyến.', star: true },
      { name: 'Xác suất của biến cố đồng khả năng', expr: 'P = số kết quả thuận lợi : tổng số kết quả;  0 ≤ P ≤ 1', use: 'Bài rút thẻ, gieo xúc xắc.', star: true },
    ],
  },
  {
    id: 'f-ck8',
    name: 'Toán 8 — hằng đẳng thức, phân thức, phương trình và đồng dạng',
    strand: 'dai-so',
    grade: 8,
    tracks: ['chinh-khoa'],
    topicIds: ['ck8-hang-dang-thuc', 'ck8-phan-thuc', 'ck8-pt-ham-so', 'ck8-thales-dong-dang', 'ck8-hinh-chop-xac-suat'],
    intro:
      'Lớp 8 là năm cung cấp bốn công cụ mà đề vào 10 dùng gần như toàn bộ: hằng đẳng thức, phân thức, phương trình – hàm số bậc nhất, và tam giác đồng dạng. Học chắc lớp 8 thì lớp 9 nhẹ đi một nửa.',
    items: [
      { name: 'Bình phương một tổng, một hiệu', expr: '(a ± b)² = a² ± 2ab + b²', use: 'Khai triển và nhận dạng để viết ngược thành bình phương.', star: true },
      { name: 'Hiệu hai bình phương', expr: 'a² − b² = (a − b)(a + b)', use: 'Phân tích nhân tử, tính nhanh, trục căn thức.', star: true },
      { name: 'Lập phương một tổng, một hiệu', expr: '(a ± b)³ = a³ ± 3a²b + 3ab² ± b³', use: 'Khai triển và rút gọn biểu thức bậc ba.', star: true },
      { name: 'Tổng và hiệu hai lập phương', expr: 'a³ + b³ = (a + b)(a² − ab + b²);  a³ − b³ = (a − b)(a² + ab + b²)', use: 'Phân tích nhân tử.', trap: 'Nhớ nhầm dấu ở giữa của thừa số thứ hai.', star: true },
      { name: 'Bốn phương pháp phân tích nhân tử', expr: 'Đặt nhân tử chung → dùng hằng đẳng thức → nhóm hạng tử → tách hạng tử', use: 'Luôn thử đặt nhân tử chung trước tiên.', trap: 'Phân tích chưa triệt để, còn nhân tử tiếp tục phân tích được.', star: true },
      { name: 'Điều kiện xác định của phân thức', expr: 'Mẫu thức khác 0, lấy từ mẫu BAN ĐẦU', use: 'Dòng đầu tiên của mọi bài phân thức.', trap: 'Lấy điều kiện từ mẫu sau khi đã rút gọn.', star: true },
      { name: 'Bốn phép tính với phân thức', expr: 'A/B ± C/D = (AD ± CB)/(BD);  A/B × C/D = AC/BD;  A/B : C/D = A/B × D/C', condition: 'B, D ≠ 0 và C ≠ 0 với phép chia', use: 'Rút gọn biểu thức tổng hợp.', star: true },
      { name: 'Phương trình bậc nhất một ẩn', expr: 'ax + b = 0 (a ≠ 0) ⟺ x = −b/a', use: 'Bài giải phương trình và bài lập phương trình.', trap: 'Chia hai vế cho biểu thức chứa ẩn mà chưa xét nó khác 0.', star: true },
      { name: 'Hàm số bậc nhất và vị trí tương đối', expr: 'y = ax + b; song song ⟺ a = a′ và b ≠ b′; cắt nhau ⟺ a ≠ a′', use: 'Bài tham số về hai đường thẳng.', trap: 'Quên điều kiện b ≠ b′ nên nhận cả trường hợp trùng nhau.', star: true },
      { name: 'Định lí Thalès', expr: 'MN ∥ BC ⟹ AM/AB = AN/AC = MN/BC', use: 'Tính độ dài đoạn thẳng trong tam giác có đường song song.', star: true },
      { name: 'Ba trường hợp đồng dạng', expr: 'g–g, c–g–c, c–c–c', use: 'Chứng minh đồng dạng rồi suy ra hệ thức tích.', trap: 'Viết tên hai tam giác sai thứ tự đỉnh tương ứng.', star: true },
      { name: 'Tỉ số diện tích hai tam giác đồng dạng', expr: 'S₁/S₂ = k² với k là tỉ số đồng dạng', use: 'Bài tính diện tích qua đồng dạng.', trap: 'Quên bình phương, dùng luôn k.', star: true },
      { name: 'Định lí Pythagore và định lí đảo', expr: 'a² + b² = c² với c là cạnh huyền', use: 'Tính độ dài và chứng minh tam giác vuông.', star: true },
      { name: 'Hình chóp đều', expr: 'S xq = (nửa chu vi đáy) × trung đoạn;  V = (1/3) × S đáy × chiều cao', use: 'Bài hình chóp tam giác đều và tứ giác đều.', trap: 'Dùng chiều cao hình chóp thay cho trung đoạn khi tính diện tích xung quanh.', star: true },
    ],
  },
  {
    id: 'f-diem-10-thcs',
    name: 'Cẩm nang điểm 10 — THCS: nhóm công thức quyết định 0,5 điểm cuối',
    strand: 'bat-dang-thuc',
    grade: 'diem-10',
    tracks: ['thpt', 'chuyen', 'chinh-khoa'],
    topicIds: ['ds-viete', 'hh-duong-tron-co-ban', 'bdt-co-ban', 'ds-can-thuc'],
    intro:
      'Ở đề vào 10 và đề kiểm tra lớp 9, khoảng cách giữa 9,0 và 10 gần như luôn nằm ở đúng một nhóm nhỏ: câu bất đẳng thức cuối đề, ý cuối bài hình học, và câu hỏi phụ của bài rút gọn. Đây là danh sách tối thiểu cho nhóm đó.',
    items: [
      { name: 'Biểu thức đối xứng theo S và P', expr: 'x₁² + x₂² = S² − 2P;  (x₁ − x₂)² = S² − 4P;  x₁³ + x₂³ = S³ − 3PS;  1/x₁ + 1/x₂ = S/P', condition: 'P ≠ 0 với biểu thức nghịch đảo', use: 'Ý cuối bài Viète — nhận ra hệ thức đối xứng thì viết được ngay theo S và P.', star: true },
      { name: 'Hạ bậc bằng chính phương trình', expr: 'x₁ là nghiệm của x² − bx + c = 0 ⟹ x₁² = bx₁ − c', use: 'Hệ thức KHÔNG đối xứng chứa luỹ thừa bậc cao của một nghiệm.', trap: 'Sai dấu khi chuyển vế.', star: true },
      { name: 'AM–GM cho hai số dương', expr: 'a + b ≥ 2√(ab), dấu bằng khi a = b', use: 'Bài V bất đẳng thức của đề vào 10; tích không đổi thì tổng nhỏ nhất.', trap: 'Áp dụng khi tích của hai số không phải hằng số.', star: true },
      { name: 'Hệ quả của AM–GM', expr: 'ab ≤ ((a + b)/2)²; tổng không đổi thì tích lớn nhất khi hai số bằng nhau', use: 'Bài diện tích lớn nhất với chu vi cho trước.', star: true },
      { name: 'Bất đẳng thức Cauchy–Schwarz dạng phân thức', expr: 'a²/x + b²/y ≥ (a + b)²/(x + y)', condition: 'x, y > 0', use: 'Bất đẳng thức có mẫu, dạng hay gặp ở đề chuyên và Bài V khó.', star: true },
      { name: 'Phương tích của một điểm', expr: 'Từ A ngoài (O), cát tuyến ADE và tiếp tuyến AB: AB² = AD · AE', use: 'Ý 2 và ý 3 của bài hình học đề vào 10.', star: true },
      { name: 'Hệ thức lượng trong tam giác vuông', expr: 'b² = a·b′;  h² = b′·c′;  a·h = b·c;  1/h² = 1/b² + 1/c²', use: 'Ghép với phương tích để chứng minh bốn điểm đồng viên.', trap: 'Ghép nhầm cạnh góc vuông với hình chiếu.', star: true },
      { name: 'Ba dấu hiệu tứ giác nội tiếp', expr: 'Tổng hai góc đối bằng 180°; hai đỉnh kề cùng nhìn một cạnh dưới góc bằng nhau; góc ngoài bằng góc trong đối diện', use: 'Ý chốt của bài hình học.', trap: 'Cộng hai góc KHÔNG đối nhau.', star: true },
      { name: 'Tách phần nguyên để xét tính nguyên', expr: '(ax + b)/(cx + d) = k + m/(cx + d)', use: 'Câu hỏi phụ "tìm x nguyên để biểu thức nguyên" của Bài I.', star: true },
    ],
  },
  {
    id: 'f-diem-10-thpt',
    name: 'Cẩm nang điểm 10 — THPT: nhóm công thức quyết định câu vận dụng cao',
    strand: 'giai-tich',
    grade: 'diem-10',
    tracks: ['thpt-qg', 'chinh-khoa'],
    topicIds: ['q12-khao-sat-ham-so', 'q12-nguyen-ham-tich-phan', 'q12-oxyz', 'q12-xac-suat-co-dieu-kien'],
    intro:
      'Ở đề tốt nghiệp và đề kiểm tra lớp 10 – 12, phần trả lời ngắn và nhóm câu vận dụng cao là chỗ tách 9,0 khỏi 10. Đây là danh sách tối thiểu cho nhóm đó — không phải toàn bộ công thức, mà là những công thức có tần suất xuất hiện cao nhất ở đúng nhóm câu này.',
    items: [
      { name: 'Điều kiện hàm bậc ba có hai cực trị', expr: "y' = 3ax² + 2bx + c có Δ > 0 (và a ≠ 0)", use: 'Bài tham số về số điểm cực trị.', trap: 'Quên xét riêng trường hợp a = 0 khi a chứa tham số.', star: true },
      { name: 'Đơn điệu của hàm phân thức bậc nhất', expr: "y = (ax + b)/(cx + d) có y' = (ad − bc)/(cx + d)²", use: 'Đồng biến ⟺ ad − bc > 0 trên từng khoảng xác định.', trap: 'Kết luận đồng biến trên toàn tập xác định thay vì trên từng khoảng.', star: true },
      { name: 'Số nghiệm của f(u(x)) = m', expr: 'Đặt t = u(x): đếm số nghiệm t trước, rồi với mỗi t đếm số x tương ứng', use: 'Câu vận dụng cao dạng hàm hợp.', trap: 'Dừng ở số nghiệm t mà quên đếm ngược ra số nghiệm x.', star: true },
      { name: 'Tích phân đổi biến và đổi cận', expr: 'Đặt t = u(x) ⟹ dt = u′(x) dx, đổi cận NGAY tại dòng đặt', use: 'Đa số câu tích phân của đề tốt nghiệp.', trap: 'Quên đổi cận — lỗi mất điểm số một của chương tích phân.', star: true },
      { name: 'Thứ tự ưu tiên chọn u khi tính từng phần', expr: 'Logarit → Đa thức → Lượng giác → Mũ', use: 'Tích phân của tích hai loại hàm khác nhau.', star: true },
      { name: 'Diện tích hình phẳng giữa hai đồ thị', expr: 'S = ∫|f(x) − g(x)| dx trên đoạn giao', use: 'Nhóm câu ứng dụng tích phân.', trap: 'Bỏ dấu giá trị tuyệt đối khi hai đồ thị cắt nhau giữa đoạn.', star: true },
      { name: 'Ba loại tích trong Oxyz', expr: 'Vô hướng u·v = x₁x₂ + y₁y₂ + z₁z₂; có hướng [u, v] ⊥ cả hai; hỗn tạp [u, v]·w', use: 'Diện tích tam giác = (1/2)|[AB, AC]|; thể tích tứ diện = (1/6)|[AB, AC]·AD|.', trap: 'Quên hệ số 1/2 hoặc 1/6, hoặc quên lấy trị tuyệt đối.', star: true },
      { name: 'Khoảng cách trong Oxyz', expr: 'd(M, (P)) = |Ax₀ + By₀ + Cz₀ + D| / √(A² + B² + C²)', use: 'Bài mặt cầu tiếp xúc, bài cực trị trong Oxyz.', star: true },
      { name: 'Bán kính đường tròn giao tuyến', expr: 'r = √(R² − d²) với d là khoảng cách từ tâm mặt cầu tới mặt phẳng', use: 'Bài mặt phẳng cắt mặt cầu.', star: true },
      { name: 'Xác suất toàn phần và công thức Bayes', expr: 'P(B) = ΣP(Aᵢ)P(B|Aᵢ);  P(Aᵢ|B) = P(Aᵢ)P(B|Aᵢ)/P(B)', use: 'Câu xác suất có điều kiện, thường ra ở phần đúng/sai.', trap: 'Nhầm P(A|B) với P(B|A).', star: true },
      { name: 'Phương sai mẫu ghép nhóm', expr: 's² = Σfᵢxᵢ²/n − x̄², với xᵢ là TRUNG ĐIỂM nhóm', use: 'Câu thống kê của chương trình 2018.', trap: 'Dùng đầu mút nhóm thay vì trung điểm.', star: true },
      { name: 'Quy tắc kiểm tra chéo cho phần trả lời ngắn', expr: 'Mọi đáp số phải được tính lại bằng một cách thứ hai trước khi điền', use: 'Phần III đề tốt nghiệp — không có phương án để loại trừ, sai là mất trọn điểm.', star: true },
    ],
  },
  /* ==================== THCS — ĐẠI SỐ ==================== */
  {
    id: 'f-hang-dang-thuc',
    name: 'Bảy hằng đẳng thức và các phân tích hay dùng',
    strand: 'dai-so',
    grade: 'thcs',
    tracks: ['thpt', 'chuyen'],
    topicIds: ['ds-can-thuc', 'ds-da-thuc'],
    intro:
      'Đây là bộ công cụ nền của toàn bộ Đại số THCS. Không thuộc bảy hằng đẳng thức thì mọi bài rút gọn, phân tích nhân tử và bất đẳng thức đều tắc ngay ở dòng đầu.',
    items: [
      { name: 'Bình phương một tổng', expr: '(a + b)² = a² + 2ab + b²', use: 'Khai triển, hoặc nhận ra dạng để viết ngược thành bình phương.', star: true },
      { name: 'Bình phương một hiệu', expr: '(a − b)² = a² − 2ab + b²', use: 'Chứng minh bất đẳng thức: mọi bình phương đều không âm.', trap: 'Quên dấu trừ ở giữa khi khai triển ngược.', star: true },
      { name: 'Hiệu hai bình phương', expr: 'a² − b² = (a − b)(a + b)', use: 'Phân tích nhân tử, trục căn thức, phương trình nghiệm nguyên dạng x² − y² = n.', star: true },
      { name: 'Lập phương một tổng', expr: '(a + b)³ = a³ + 3a²b + 3ab² + b³', use: 'Khai triển; cũng viết được thành a³ + b³ + 3ab(a + b).', star: true },
      { name: 'Lập phương một hiệu', expr: '(a − b)³ = a³ − 3a²b + 3ab² − b³', use: 'Tương tự, viết được thành a³ − b³ − 3ab(a − b).', star: true },
      { name: 'Tổng hai lập phương', expr: 'a³ + b³ = (a + b)(a² − ab + b²)', use: 'Phân tích nhân tử khi thấy tổng hai luỹ thừa bậc ba.', trap: 'Nhớ nhầm thành (a + b)(a² + ab + b²).', star: true },
      { name: 'Hiệu hai lập phương', expr: 'a³ − b³ = (a − b)(a² + ab + b²)', use: 'Trục căn bậc ba, phân tích nhân tử.', star: true },
      { name: 'Bình phương ba số', expr: '(a + b + c)² = a² + b² + c² + 2(ab + bc + ca)', use: 'Chuyển qua lại giữa tổng bình phương và tổng tích đôi một — dùng liên tục trong bất đẳng thức.', star: true },
      { name: 'Đồng nhất thức ba lập phương', expr: 'a³ + b³ + c³ − 3abc = (a + b + c)(a² + b² + c² − ab − bc − ca)', use: 'Bài toán chia hết, phân tích nhân tử ở đề chuyên. Hệ quả: nếu a + b + c = 0 thì a³ + b³ + c³ = 3abc.' },
      { name: 'Sophie Germain', expr: 'a⁴ + 4b⁴ = (a² + 2b² + 2ab)(a² + 2b² − 2ab)', use: 'Bài “tìm n để n⁴ + 4 là số nguyên tố” và các biến thể.', trap: 'Chỉ áp dụng khi hệ số của b⁴ đúng bằng 4.' },
      { name: 'Đa thức bậc bốn quen thuộc', expr: 'a⁴ + a² + 1 = (a² + a + 1)(a² − a + 1)', use: 'Thêm bớt a² để tạo hiệu hai bình phương.' },
      { name: 'Tam thức bậc hai', expr: 'ax² + bx + c = a(x − x₁)(x − x₂) khi có hai nghiệm x₁, x₂', condition: 'a ≠ 0 và Δ ≥ 0', use: 'Phân tích nhân tử nhanh sau khi nhẩm được hai nghiệm.', star: true },
    ],
  },
  {
    id: 'f-can-thuc',
    name: 'Căn bậc hai — biến đổi và trục căn thức',
    strand: 'dai-so',
    grade: 'thcs',
    tracks: ['thpt', 'chuyen'],
    topicIds: ['ds-can-thuc'],
    intro:
      'Bài I của đề vào 10 Hà Nội và Bài 1 của nhiều đề chuyên đều nằm gọn trong nhóm này. Điều kiện xác định phải viết ở dòng đầu tiên, luôn luôn.',
    items: [
      { name: 'Điều kiện xác định', expr: '√A có nghĩa ⟺ A ≥ 0', use: 'Viết ngay dòng đầu mọi bài có căn.', trap: 'Với A/√B còn phải thêm B > 0 chứ không phải B ≥ 0.', star: true },
      { name: 'Căn của bình phương', expr: '√(A²) = |A|', use: 'Rút gọn biểu thức có căn của một bình phương; phải xét dấu A rồi mới bỏ trị tuyệt đối.', trap: 'Viết thẳng √(A²) = A khi chưa biết dấu của A — lỗi kinh điển.', star: true },
      { name: 'Nhân, chia căn', expr: '√A · √B = √(AB);  √A / √B = √(A/B)', condition: 'A ≥ 0, B > 0 (với phép chia)', use: 'Gom hoặc tách căn khi rút gọn.', star: true },
      { name: 'Đưa thừa số ra ngoài dấu căn', expr: '√(A²B) = |A|·√B', condition: 'B ≥ 0', use: 'Rút gọn √50, √12, √(x²y).', star: true },
      { name: 'Trục căn thức ở mẫu — dạng đơn', expr: 'a/√b = a√b / b', condition: 'b > 0', use: 'Chuẩn hoá kết quả cuối, so sánh với đáp án.', star: true },
      { name: 'Trục căn thức — biểu thức liên hợp', expr: 'a/(√m ± √n) = a(√m ∓ √n)/(m − n)', condition: 'm ≠ n, m, n ≥ 0', use: 'Trục căn ở mẫu và cũng chính là kỹ thuật nhân liên hợp trong phương trình vô tỉ.', star: true },
      { name: 'Nhân liên hợp cho hiệu hai căn', expr: '√A − √B = (A − B)/(√A + √B)', condition: '√A + √B > 0', use: 'Phương trình vô tỉ có hai căn mà phần dưới căn chênh nhau một hằng số.', star: true },
      { name: 'Căn thức kép', expr: '√(a ± 2√b) = √x ± √y nếu x + y = a và xy = b', use: 'Gặp số dạng 7 − 4√3 = (2 − √3)², 4 + 2√3 = (1 + √3)².', trap: 'Phải kiểm tra dấu để chọn đúng √x ± √y.' },
      { name: 'So sánh hai căn', expr: 'Với A, B ≥ 0: √A < √B ⟺ A < B', use: 'So sánh không cần bấm máy; cũng dùng để chặn miền giá trị.', star: true },
    ],
  },
  {
    id: 'f-pt-bac-hai',
    name: 'Phương trình bậc hai và định lí Viète',
    strand: 'dai-so',
    grade: 'thcs',
    tracks: ['thpt', 'chuyen'],
    topicIds: ['ds-pt-hpt', 'ds-viete'],
    intro:
      'Bài III đề vào 10 và bài tham số của mọi đề chuyên đều xoay quanh nhóm này. Quy tắc bất di bất dịch: có Viète thì phải có điều kiện Δ.',
    items: [
      { name: 'Công thức nghiệm', expr: 'x = (−b ± √Δ) / (2a),  Δ = b² − 4ac', condition: 'a ≠ 0, Δ ≥ 0', use: 'Giải trực tiếp khi không nhẩm được nghiệm.', star: true },
      { name: 'Công thức nghiệm thu gọn', expr: "x = (−b′ ± √Δ′) / a,  Δ′ = b′² − ac,  b′ = b/2", condition: 'b chẵn', use: 'Hệ số của x chẵn thì dùng Δ′ — ít sai số hơn hẳn.', star: true },
      { name: 'Số nghiệm theo Δ', expr: 'Δ > 0: hai nghiệm phân biệt · Δ = 0: nghiệm kép · Δ < 0: vô nghiệm', use: 'Mọi bài tham số đều bắt đầu bằng dòng này.', trap: '“Hai điểm phân biệt” là Δ > 0, không phải Δ ≥ 0.', star: true },
      { name: 'Định lí Viète', expr: 'S = x₁ + x₂ = −b/a;  P = x₁x₂ = c/a', condition: 'Phương trình có nghiệm (Δ ≥ 0)', use: 'Mọi hệ thức đối xứng giữa hai nghiệm.', trap: 'Quên dấu trừ ở S.', star: true },
      { name: 'Tổng bình phương hai nghiệm', expr: 'x₁² + x₂² = S² − 2P', use: 'Hệ thức đối xứng bậc hai.', trap: 'Nhớ nhầm thành S² + 2P.', star: true },
      { name: 'Bình phương hiệu hai nghiệm', expr: '(x₁ − x₂)² = S² − 4P', use: 'Đề cho |x₁ − x₂| = k thì bình phương hai vế rồi dùng công thức này.', star: true },
      { name: 'Tổng lập phương hai nghiệm', expr: 'x₁³ + x₂³ = S³ − 3PS', use: 'Hệ thức đối xứng bậc ba.' },
      { name: 'Tổng nghịch đảo', expr: '1/x₁ + 1/x₂ = S/P', condition: 'P ≠ 0', use: 'Hệ thức có mẫu là nghiệm.' },
      { name: 'Hai nghiệm trái dấu', expr: 'P < 0', use: 'Chỉ cần P < 0 là đủ, không cần thêm Δ > 0 (vì P < 0 đã kéo theo Δ > 0).', star: true },
      { name: 'Hai nghiệm cùng dương', expr: 'Δ ≥ 0, S > 0 và P > 0', use: 'Bài yêu cầu nghiệm là độ dài, thời gian, số lượng.', star: true },
      { name: 'Viète đảo', expr: 'Hai số có tổng S, tích P là nghiệm của t² − St + P = 0', condition: 'S² − 4P ≥ 0', use: 'Giải hệ đối xứng loại I sau khi đã tìm được S và P.', trap: 'Bỏ điều kiện S² ≥ 4P nên nhận cả cặp (S; P) không tồn tại.', star: true },
      { name: 'Phương trình hoành độ giao điểm', expr: '(P): y = ax² và (d): y = mx + n cắt nhau ⟺ ax² − mx − n = 0 có nghiệm', use: 'Bài tương giao parabol – đường thẳng.', star: true },
    ],
  },
  {
    id: 'f-bat-dang-thuc-thcs',
    name: 'Bất đẳng thức và cực trị — bộ công cụ tối thiểu',
    strand: 'bat-dang-thuc',
    grade: 'thcs',
    tracks: ['thpt', 'chuyen'],
    topicIds: ['bdt-co-ban', 'bdt-nang-cao'],
    intro:
      'Bài V đề Hà Nội và câu chốt đề chuyên đều giải được bằng bốn công cụ dưới đây. Quy trình luôn là: dò điểm rơi trước, chọn kỹ thuật sau.',
    items: [
      { name: 'AM–GM hai số', expr: 'a + b ≥ 2√(ab)', condition: 'a, b ≥ 0; dấu bằng khi a = b', use: 'Công cụ dùng nhiều nhất. Nhận ra khi có tổng và tích cùng xuất hiện.', star: true },
      { name: 'AM–GM ba số', expr: 'a + b + c ≥ 3·∛(abc)', condition: 'a, b, c ≥ 0; dấu bằng khi a = b = c', use: 'Bất đẳng thức ba biến có ràng buộc tổng hoặc tích.', star: true },
      { name: 'Hệ quả AM–GM', expr: 'xy ≤ (x + y)²/4  và  x + 1/x ≥ 2 với x > 0', use: 'Chặn tích khi biết tổng; chặn biểu thức có dạng biến cộng nghịch đảo.', star: true },
      { name: 'Cauchy–Schwarz dạng cộng mẫu (Engel)', expr: 'a²/m + b²/n ≥ (a + b)²/(m + n)', condition: 'm, n > 0; dấu bằng khi a/m = b/n', use: 'Tổng các phân thức có mẫu dương. Tử phải là bình phương — nếu chưa phải thì nhân tử và mẫu với tử.', star: true },
      { name: 'Bất đẳng thức tam giác của bình phương', expr: '(a + b + c)² ≥ 3(ab + bc + ca)', condition: 'Đúng với mọi số thực; dấu bằng khi a = b = c', use: 'Chặn tổng tích đôi một khi biết tổng.', star: true },
      { name: 'Bất đẳng thức cơ sở', expr: '(a − b)² ≥ 0, tức a² + b² ≥ 2ab', use: 'Mọi bất đẳng thức đối xứng hai biến đều quy được về đây.', star: true },
      { name: 'Bốn số dương', expr: '1/(x + y) ≤ (1/4)(1/x + 1/y)', condition: 'x, y > 0; dấu bằng khi x = y', use: 'Bài có mẫu là tổng hai cụm — kỹ thuật tách mẫu.' },
      { name: 'Bất đẳng thức Nesbitt', expr: 'a/(b + c) + b/(c + a) + c/(a + b) ≥ 3/2', condition: 'a, b, c > 0', use: 'Kết quả kinh điển, nên thuộc để tiết kiệm thời gian.' },
      { name: 'Bunhiacopxki hai bộ số', expr: '(ax + by)² ≤ (a² + b²)(x² + y²)', condition: 'Dấu bằng khi a/x = b/y', use: 'Chặn trên của một tổng tích; bài có căn thức cộng lại.' },
    ],
  },
  /* ==================== THCS — HÌNH HỌC ==================== */
  {
    id: 'f-he-thuc-luong',
    name: 'Hệ thức lượng trong tam giác vuông',
    strand: 'hinh-hoc',
    grade: 'thcs',
    tracks: ['thpt', 'chuyen'],
    topicIds: ['hh-duong-tron-co-ban', 'hh-phuong-tich'],
    intro:
      'Bốn hệ thức dưới đây xuất hiện trong hầu hết bài hình có tiếp tuyến hoặc đường cao. Viết cả bốn ra góc nháp ngay khi phát đề.',
    items: [
      { name: 'Pythagore', expr: 'a² = b² + c²', condition: 'Tam giác vuông, a là cạnh huyền', use: 'Tính cạnh còn lại; đảo lại dùng để chứng minh vuông.', star: true },
      { name: 'Cạnh góc vuông và hình chiếu', expr: 'b² = a·b′  và  c² = a·c′', condition: 'b′, c′ là hình chiếu của b, c trên cạnh huyền a', use: 'Cấu hình tiếp tuyến: CD² = CH·CO. Cấu hình đường cao trong tam giác vuông.', star: true },
      { name: 'Đường cao', expr: 'h² = b′·c′', use: 'Tính đường cao khi biết hai hình chiếu; chứng minh DH² = HA·HB.', star: true },
      { name: 'Tích hai cạnh góc vuông', expr: 'a·h = b·c', use: 'Tính đường cao nhanh nhất khi biết ba cạnh.', star: true },
      { name: 'Nghịch đảo bình phương đường cao', expr: '1/h² = 1/b² + 1/c²', use: 'Bài cho hai cạnh góc vuông, hỏi đường cao.' },
      { name: 'Tỉ số lượng giác', expr: 'sin = đối/huyền · cos = kề/huyền · tan = đối/kề · cot = kề/đối', use: 'Tính góc và cạnh; bài toán thực tế đo chiều cao.', star: true },
      { name: 'Quan hệ hai góc phụ nhau', expr: 'sin α = cos(90° − α), tan α = cot(90° − α)', use: 'Rút gọn biểu thức lượng giác.', star: true },
      { name: 'Hằng đẳng thức lượng giác', expr: 'sin²α + cos²α = 1;  tan α · cot α = 1', use: 'Tính giá trị lượng giác còn lại khi biết một giá trị.', star: true },
    ],
  },
  {
    id: 'f-duong-tron',
    name: 'Đường tròn — góc, dây và tiếp tuyến',
    strand: 'hinh-hoc',
    grade: 'thcs',
    tracks: ['thpt', 'chuyen'],
    topicIds: ['hh-duong-tron-co-ban', 'hh-phuong-tich', 'hh-mo-hinh-chuan'],
    intro:
      'Bài IV đề vào 10 và Bài hình đề chuyên gần như luôn nằm trong nhóm này. Nắm chắc bốn dấu hiệu nội tiếp là nắm được ý 1 của mọi đề.',
    items: [
      { name: 'Góc nội tiếp', expr: 'Góc nội tiếp = ½ góc ở tâm cùng chắn một cung', use: 'So sánh góc; chuyển góc từ vị trí này sang vị trí khác.', star: true },
      { name: 'Góc nội tiếp cùng chắn một cung', expr: 'Hai góc nội tiếp cùng chắn một cung thì bằng nhau', use: 'Công cụ chuyển góc dùng nhiều nhất trong bài hình.', star: true },
      { name: 'Góc nội tiếp chắn nửa đường tròn', expr: 'Bằng 90°', use: 'Hễ thấy đường kính là có ngay một góc vuông.', star: true },
      { name: 'Góc tạo bởi tiếp tuyến và dây', expr: 'Bằng góc nội tiếp cùng chắn cung đó', use: 'Cấu hình tiếp tuyến – cát tuyến; chứng minh đồng dạng.', trap: 'Chọn nhầm cung bị chắn — góc “nhìn” vào cung nằm bên trong nó.', star: true },
      { name: 'Góc có đỉnh bên trong đường tròn', expr: '= ½ (cung bị chắn + cung đối đỉnh)', use: 'Hai dây cắt nhau trong đường tròn.' },
      { name: 'Góc có đỉnh bên ngoài đường tròn', expr: '= ½ (cung lớn − cung nhỏ)', use: 'Hai cát tuyến, hoặc tiếp tuyến và cát tuyến cắt nhau ngoài đường tròn.' },
      { name: 'Bốn dấu hiệu tứ giác nội tiếp', expr: '① Tổng hai góc đối = 180°  ② Góc ngoài = góc trong đối  ③ Hai đỉnh kề cùng nhìn một cạnh dưới hai góc bằng nhau  ④ Bốn đỉnh cách đều một điểm', use: 'Ý 1 của mọi bài hình. Quét lần lượt bốn dấu hiệu là ra.', star: true },
      { name: 'Tiếp tuyến', expr: 'Tiếp tuyến ⊥ bán kính tại tiếp điểm', use: 'Có tiếp tuyến là có góc vuông.', star: true },
      { name: 'Hai tiếp tuyến cắt nhau', expr: 'MA = MB; MO là phân giác góc AMB và là phân giác góc AOB; MO là trung trực của AB', condition: 'MA, MB là hai tiếp tuyến từ M', use: 'Cấu hình xuất hiện dày đặc trong đề Hà Nội và đề chuyên.', star: true },
      { name: 'Phương tích của một điểm', expr: 'Với M ngoài (O): MA·MB = MT² = MO² − R² (MAB là cát tuyến, MT là tiếp tuyến)', use: 'Chứng minh hệ thức tích; chứng minh bốn điểm cùng thuộc một đường tròn (đảo lại).', star: true },
      { name: 'Phương tích — điểm trong', expr: 'Với M trong (O): MA·MB = MC·MD với hai dây AB, CD qua M', use: 'Hai dây cắt nhau trong đường tròn.' },
      { name: 'Quan hệ dây và cung', expr: 'Hai cung bằng nhau ⟺ hai dây bằng nhau; đường kính vuông góc với dây thì đi qua trung điểm dây', use: 'Bài về điểm chính giữa cung, trung trực của dây.', star: true },
      { name: 'Độ dài cung và diện tích quạt', expr: 'l = πRn/180;  S_quạt = πR²n/360 = lR/2', condition: 'n là số đo cung tính bằng độ', use: 'Bài tính toán cuối phần hình học.', star: true },
      { name: 'Chu vi và diện tích hình tròn', expr: 'C = 2πR;  S = πR²', use: 'Bài thực tế và bài tính diện tích phần còn lại.', star: true },
    ],
  },
  {
    id: 'f-mo-hinh-hinh-hoc',
    name: 'Năm bổ đề hình học phải thuộc (đề chuyên)',
    strand: 'hinh-hoc',
    grade: 'thcs',
    tracks: ['chuyen'],
    topicIds: ['hh-mo-hinh-chuan', 'hh-ti-so-dong-quy', 'hh-phuong-tich'],
    intro:
      'Đề hình chuyên thưởng cho người thuộc mô hình. Năm bổ đề dưới đây phủ phần lớn ý b và ý c của các đề KHTN, Sư phạm và chuyên Sở.',
    items: [
      { name: 'Đối xứng trực tâm', expr: 'Điểm đối xứng của trực tâm H qua cạnh BC nằm trên đường tròn ngoại tiếp (O)', use: 'Đề có “giao điểm thứ hai của AH với (O)”.', star: true },
      { name: 'Hình bình hành trực tâm', expr: 'Với D là điểm đối xứng của A qua O thì BHCD là hình bình hành', use: 'Đề có “điểm đối xứng của A qua O”. Hệ quả: M trung điểm BC cũng là trung điểm HD.', star: true },
      { name: 'Khoảng cách trực tâm', expr: 'AH = 2·OM, với M là trung điểm BC', use: 'Bài tính độ dài, bài chứng minh song song và bài dùng trục đẳng phương.', star: true },
      { name: 'Điểm chính giữa cung và tâm nội tiếp', expr: 'Nếu M là điểm chính giữa cung BC thì MI = MB = MC, với I là tâm đường tròn nội tiếp', use: 'Đề có phân giác góc A cắt (O) tại M và nhắc tới tâm nội tiếp. Hệ quả: M là tâm đường tròn ngoại tiếp tam giác BIC.', star: true },
      { name: 'Trục đẳng phương', expr: 'Tập hợp các điểm có phương tích bằng nhau với hai đường tròn là một đường thẳng vuông góc với đường nối tâm', use: 'Chứng minh vuông góc, thẳng hàng, đồng quy ở ý khó nhất. Ba trục đẳng phương của ba đường tròn đồng quy tại tâm đẳng phương.', star: true },
      { name: 'Đường tròn Euler', expr: 'Chín điểm gồm ba chân đường cao, ba trung điểm cạnh và ba trung điểm của HA, HB, HC cùng thuộc một đường tròn bán kính R/2', use: 'Bài nâng cao về cấu hình trực tâm.' },
      { name: 'Định lí Ptolemy', expr: 'Tứ giác ABCD nội tiếp ⟹ AC·BD = AB·CD + AD·BC', use: 'Chứng minh hệ thức độ dài trong tứ giác nội tiếp.' },
      { name: 'Đường trung tuyến', expr: 'm_a² = (2b² + 2c² − a²)/4', use: 'Tính độ dài trung tuyến khi biết ba cạnh.' },
      { name: 'Tính chất đường phân giác', expr: 'AD là phân giác góc A ⟹ DB/DC = AB/AC', use: 'Bài về tỉ số đoạn thẳng.', star: true },
      { name: 'Định lí Menelaus', expr: 'Ba điểm M, N, P trên ba cạnh (hoặc phần kéo dài) của tam giác ABC thẳng hàng ⟺ (MB/MC)·(NC/NA)·(PA/PB) = 1', use: 'Chứng minh thẳng hàng ở đề chuyên.' },
      { name: 'Định lí Ceva', expr: 'Ba đường AM, BN, CP đồng quy ⟺ (MB/MC)·(NC/NA)·(PA/PB) = 1', use: 'Chứng minh đồng quy.' },
    ],
  },
  {
    id: 'f-hinh-khong-gian-thcs',
    name: 'Hình trụ – hình nón – hình cầu',
    strand: 'thuc-te',
    grade: 'thcs',
    tracks: ['thpt', 'chuyen'],
    topicIds: ['tt-hinh-khong-gian'],
    intro:
      'Sáu công thức này đáng đúng 0,5 điểm trong đề vào 10 — điểm chắc nhất toàn bài. Viết cả sáu ra góc nháp ngay khi phát đề.',
    items: [
      { name: 'Hình trụ — xung quanh', expr: 'S_xq = 2πrh', use: 'Bài tính diện tích nhãn dán, tôn cuốn quanh.', star: true },
      { name: 'Hình trụ — toàn phần', expr: 'S_tp = 2πrh + 2πr²', use: 'Bài tính vật liệu làm cả hộp kín.', star: true },
      { name: 'Hình trụ — thể tích', expr: 'V = πr²h', use: 'Bài tính dung tích lon, bể nước.', trap: 'Đề cho đường kính thì phải chia đôi.', star: true },
      { name: 'Hình nón — xung quanh', expr: 'S_xq = πrl (l là đường sinh)', condition: 'l = √(r² + h²)', use: 'Bài tính giấy làm nón, phễu.', star: true },
      { name: 'Hình nón — thể tích', expr: 'V = (1/3)πr²h', use: 'Bài tính dung tích phễu, đống cát.', trap: 'Quên hệ số 1/3.', star: true },
      { name: 'Hình cầu', expr: 'S = 4πR²;  V = (4/3)πR³', use: 'Bài về quả bóng, viên bi, mái vòm.', star: true },
    ],
  },
  /* ==================== THCS — SỐ HỌC & TỔ HỢP ==================== */
  {
    id: 'f-so-hoc',
    name: 'Số học — chia hết, đồng dư và số chính phương',
    strand: 'so-hoc',
    grade: 'thcs',
    tracks: ['chuyen'],
    topicIds: ['sh-chia-het', 'sh-dong-du', 'sh-so-nguyen-to', 'sh-nghiem-nguyen'],
    intro:
      'Bảng số dư dưới đây giải quyết phần lớn bài số học nhập môn chuyên. Học thuộc ba dòng đầu tiên là đủ cho 80% đề.',
    items: [
      { name: 'Số dư của số chính phương', expr: 'n² chia 3 dư 0 hoặc 1 · chia 4 dư 0 hoặc 1 · chia 5 dư 0, 1 hoặc 4 · chia 8 dư 0, 1 hoặc 4', use: 'Chứng minh một biểu thức không phải số chính phương; chứng minh phương trình nghiệm nguyên vô nghiệm.', star: true },
      { name: 'Bình phương số lẻ', expr: 'n lẻ ⟹ n² chia 8 dư 1', use: 'Bài về tổng các bình phương lẻ.', star: true },
      { name: 'Tích các số liên tiếp', expr: 'Tích k số nguyên liên tiếp luôn chia hết cho k!', use: 'Chứng minh n(n+1) chia hết 2, n(n+1)(n+2) chia hết 6.', star: true },
      { name: 'Chia hết cho hợp số', expr: 'A ⋮ m, A ⋮ n và (m; n) = 1 ⟹ A ⋮ mn', use: 'Tách bài toán chia hết cho 6, 12, 24, 30 thành các thừa số nguyên tố cùng nhau.', trap: 'Bỏ điều kiện nguyên tố cùng nhau: chia hết cho 4 và 6 không suy ra chia hết cho 24.', star: true },
      { name: 'Đồng dư — phép toán', expr: 'a ≡ b, c ≡ d (mod m) ⟹ a + c ≡ b + d và ac ≡ bd (mod m)', use: 'Tính số dư của luỹ thừa lớn.', star: true },
      { name: 'Định lí Fermat nhỏ', expr: 'p nguyên tố, (a; p) = 1 ⟹ a^(p−1) ≡ 1 (mod p)', use: 'Tính số dư của luỹ thừa rất lớn ở đề chuyên nâng cao.' },
      { name: 'Số nguyên tố lớn hơn 3', expr: 'Luôn có dạng 6k ± 1', use: 'Bài về số nguyên tố sinh đôi, ba số nguyên tố liên tiếp.', star: true },
      { name: 'Đưa về dạng tích', expr: 'xy + ax + by = c ⟺ (x + b)(y + a) = c + ab', use: 'Phương trình nghiệm nguyên có đủ ba hạng tử xy, x, y.', star: true },
      { name: 'Hiệu hai bình phương nguyên', expr: 'x² − y² = n có nghiệm nguyên ⟺ n lẻ hoặc n ⋮ 4', use: 'Loại ngay bài có n ≡ 2 (mod 4).', star: true },
      { name: 'Kẹp giữa hai số chính phương', expr: 'Nếu k² < N < (k+1)² thì N không phải số chính phương', use: 'Bài tìm n để biểu thức bậc hai là số chính phương.', star: true },
      { name: 'Số ước của một số', expr: 'n = p₁^a₁·p₂^a₂·…·p_k^a_k ⟹ số ước = (a₁+1)(a₂+1)…(a_k+1)', use: 'Đếm số cặp ước khi giải phương trình dạng tích — biết trước số cặp thì không liệt kê sót.', star: true },
    ],
  },
  {
    id: 'f-to-hop-thcs',
    name: 'Tổ hợp rời rạc — bốn nguyên lí',
    strand: 'to-hop',
    grade: 'thcs',
    tracks: ['chuyen'],
    topicIds: ['th-dirichlet', 'th-bat-bien', 'th-dem', 'th-cuc-han'],
    intro:
      'Câu chốt của đề KHTN và đề chuyên Sở. Không có công thức để áp — chỉ có bốn nguyên lí, và việc nhận ra dùng nguyên lí nào.',
    items: [
      { name: 'Nguyên lí Dirichlet', expr: 'Nhốt n + 1 con thỏ vào n chuồng thì có một chuồng chứa từ hai con trở lên', use: 'Bài dạng “luôn tồn tại hai đối tượng có tính chất …”. Xây chuồng trước, thỏ sau.', star: true },
      { name: 'Dirichlet mở rộng', expr: 'Nhốt kn + 1 con thỏ vào n chuồng thì có một chuồng chứa từ k + 1 con trở lên', use: 'Bài đòi hỏi ba đối tượng trở lên cùng một nhóm.' },
      { name: 'Tổng luỹ tích', expr: 'Trong n số bất kì luôn có một số hoặc vài số liên tiếp có tổng chia hết cho n', use: 'Kết hợp Dirichlet với dãy S₁, S₂, …, Sₙ. Nhớ tách riêng trường hợp có S_k chia hết cho n.', star: true },
      { name: 'Bất biến', expr: 'Đại lượng không đổi qua mọi phép biến đổi cho phép', use: 'Bài dạng “chứng minh không thể …”. Ba bất biến hay dùng: tính chẵn lẻ của tổng, tổng theo một modulo, số phần tử mang một tính chất.', star: true },
      { name: 'Đơn biến', expr: 'Đại lượng luôn tăng (hoặc luôn giảm) qua mỗi bước', use: 'Chứng minh quá trình phải dừng sau hữu hạn bước.' },
      { name: 'Cực hạn', expr: 'Xét phần tử lớn nhất hoặc nhỏ nhất của một tập hữu hạn', use: 'Bài chứng minh tồn tại; bài lùi vô hạn trong số học.' },
      { name: 'Đếm bằng hai cách', expr: 'Đếm cùng một đại lượng theo hai cách rồi cho hai kết quả bằng nhau', use: 'Bài chứng minh đẳng thức tổ hợp, bài về bảng và đồ thị.' },
      { name: 'Nguyên lí bao hàm – loại trừ', expr: '|A ∪ B| = |A| + |B| − |A ∩ B|', use: 'Bài đếm có phần chung.', star: true },
    ],
  },
  /* ==================== LỚP 10 ==================== */
  {
    id: 'f-q10-tam-thuc',
    name: 'Lớp 10 — Hàm số bậc hai và dấu tam thức',
    strand: 'giai-tich',
    grade: 10,
    tracks: ['thpt-qg'],
    topicIds: ['q10-ham-so-bac-hai', 'q10-bpt-tam-thuc'],
    intro: 'Nền của toàn bộ chương trình THPT: xét dấu, giải bất phương trình, tìm điều kiện tham số.',
    items: [
      { name: 'Đỉnh parabol', expr: 'I(−b/(2a); −Δ/(4a))', use: 'Tìm giá trị lớn nhất/nhỏ nhất của hàm bậc hai.', star: true },
      { name: 'Trục đối xứng', expr: 'x = −b/(2a)', use: 'Vẽ đồ thị; so sánh giá trị hàm tại hai điểm.', star: true },
      { name: 'Chiều biến thiên', expr: 'a > 0: nghịch biến trên (−∞; −b/2a), đồng biến trên (−b/2a; +∞)', use: 'Tìm cực trị trên một đoạn.', star: true },
      { name: 'Dấu tam thức', expr: 'Δ < 0: cùng dấu a với mọi x · Δ = 0: cùng dấu a trừ tại nghiệm kép · Δ > 0: trái dấu a giữa hai nghiệm, cùng dấu a ngoài hai nghiệm', use: 'Giải bất phương trình bậc hai. Nhớ câu “trong trái ngoài cùng”.', star: true },
      { name: 'Tam thức luôn dương', expr: 'ax² + bx + c > 0 với mọi x ⟺ a > 0 và Δ < 0', use: 'Bài tìm điều kiện tham số.', trap: 'Quên xét riêng trường hợp a = 0.', star: true },
      { name: 'So sánh nghiệm với một số', expr: 'x₁ < α < x₂ ⟺ a·f(α) < 0', use: 'Bài tham số về vị trí nghiệm.' },
    ],
  },
  {
    id: 'f-q10-he-thuc-luong',
    name: 'Lớp 10 — Hệ thức lượng trong tam giác',
    strand: 'hinh-hoc',
    grade: 10,
    tracks: ['thpt-qg'],
    topicIds: ['q10-he-thuc-luong'],
    intro: 'Bộ công thức giải tam giác, dùng cả trong hình phẳng lẫn hình không gian.',
    items: [
      { name: 'Định lí côsin', expr: 'a² = b² + c² − 2bc·cos A', use: 'Biết hai cạnh và góc xen giữa; hoặc biết ba cạnh tìm góc.', star: true },
      { name: 'Định lí sin', expr: 'a/sin A = b/sin B = c/sin C = 2R', use: 'Biết một cạnh và các góc; tính bán kính đường tròn ngoại tiếp.', star: true },
      { name: 'Diện tích tam giác', expr: 'S = ½ab·sin C = abc/(4R) = pr = √(p(p−a)(p−b)(p−c))', condition: 'p là nửa chu vi, r là bán kính nội tiếp', use: 'Chọn công thức theo dữ kiện đề cho.', star: true },
      { name: 'Trung tuyến', expr: 'm_a² = (2b² + 2c² − a²)/4', use: 'Bài về trung tuyến, trọng tâm.' },
    ],
  },
  {
    id: 'f-q10-toa-do',
    name: 'Lớp 10 — Vectơ và toạ độ trong mặt phẳng',
    strand: 'toa-do',
    grade: 10,
    tracks: ['thpt-qg'],
    topicIds: ['q10-vecto', 'q10-toa-do-phang'],
    intro: 'Cầu nối giữa hình học và đại số; là nền trực tiếp cho Oxyz lớp 12.',
    items: [
      { name: 'Tích vô hướng', expr: 'u·v = |u||v|cos(u, v) = x₁x₂ + y₁y₂', use: 'Tính góc; chứng minh vuông góc (tích vô hướng bằng 0).', star: true },
      { name: 'Độ dài vectơ', expr: '|u| = √(x² + y²)', use: 'Tính khoảng cách hai điểm.', star: true },
      { name: 'Phương trình tổng quát đường thẳng', expr: 'ax + by + c = 0, vectơ pháp tuyến n = (a; b)', use: 'Viết phương trình đường thẳng khi biết một điểm và pháp tuyến.', star: true },
      { name: 'Phương trình tham số', expr: 'x = x₀ + at, y = y₀ + bt, vectơ chỉ phương u = (a; b)', use: 'Khi biết một điểm và chỉ phương.', star: true },
      { name: 'Khoảng cách từ điểm đến đường thẳng', expr: 'd(M, Δ) = |ax₀ + by₀ + c| / √(a² + b²)', use: 'Bài tính khoảng cách, bài tiếp xúc.', trap: 'Quên giá trị tuyệt đối ở tử.', star: true },
      { name: 'Phương trình đường tròn', expr: '(x − a)² + (y − b)² = R², hoặc x² + y² − 2ax − 2by + c = 0 với R = √(a² + b² − c)', use: 'Xác định tâm và bán kính.', star: true },
    ],
  },
  {
    id: 'f-q10-to-hop',
    name: 'Lớp 10 — Tổ hợp và nhị thức Newton',
    strand: 'xac-suat',
    grade: 10,
    tracks: ['thpt-qg'],
    topicIds: ['q10-to-hop-newton'],
    intro: 'Nền của toàn bộ phần xác suất lớp 11 và lớp 12.',
    items: [
      { name: 'Hoán vị', expr: 'Pₙ = n!', use: 'Sắp xếp n phần tử khác nhau vào n vị trí.', star: true },
      { name: 'Chỉnh hợp', expr: 'A(n; k) = n!/(n − k)!', use: 'Chọn k phần tử từ n và có phân biệt thứ tự.', star: true },
      { name: 'Tổ hợp', expr: 'C(n; k) = n!/[k!(n − k)!]', use: 'Chọn k phần tử từ n, không phân biệt thứ tự. Dấu hiệu: “lấy đồng thời”, “chọn ra một nhóm”.', trap: 'Dùng chỉnh hợp khi đề nói “lấy đồng thời”.', star: true },
      { name: 'Tính chất tổ hợp', expr: 'C(n; k) = C(n; n − k);  C(n; k) + C(n; k+1) = C(n+1; k+1)', use: 'Rút gọn biểu thức tổ hợp.' },
      { name: 'Nhị thức Newton', expr: '(a + b)ⁿ = Σ C(n; k)·a^(n−k)·b^k, k = 0 → n', use: 'Tìm hệ số của một số hạng; tính tổng tổ hợp.', star: true },
      { name: 'Số hạng tổng quát', expr: 'T_(k+1) = C(n; k)·a^(n−k)·b^k', use: 'Tìm số hạng chứa x^m: giải phương trình mũ theo k.', star: true },
    ],
  },
  /* ==================== LỚP 11 ==================== */
  {
    id: 'f-q11-luong-giac',
    name: 'Lớp 11 — Lượng giác',
    strand: 'giai-tich',
    grade: 11,
    tracks: ['thpt-qg'],
    topicIds: ['q11-luong-giac'],
    intro: 'Nhóm công thức dài nhất chương trình. Ưu tiên thuộc nhóm có dấu sao trước.',
    items: [
      { name: 'Hằng đẳng thức cơ bản', expr: 'sin²x + cos²x = 1;  1 + tan²x = 1/cos²x;  1 + cot²x = 1/sin²x', use: 'Rút gọn, chứng minh đẳng thức.', star: true },
      { name: 'Công thức cộng', expr: 'sin(a ± b) = sin a·cos b ± cos a·sin b;  cos(a ± b) = cos a·cos b ∓ sin a·sin b', use: 'Biến đổi, giải phương trình lượng giác.', trap: 'Dấu ở công thức cos ngược với dấu trong ngoặc.', star: true },
      { name: 'Công thức nhân đôi', expr: 'sin 2a = 2sin a·cos a;  cos 2a = cos²a − sin²a = 2cos²a − 1 = 1 − 2sin²a', use: 'Hạ bậc, giải phương trình.', star: true },
      { name: 'Công thức hạ bậc', expr: 'sin²a = (1 − cos 2a)/2;  cos²a = (1 + cos 2a)/2', use: 'Tích phân hàm lượng giác bậc chẵn (lớp 12).', star: true },
      { name: 'Biến tích thành tổng', expr: 'cos a·cos b = ½[cos(a−b) + cos(a+b)]', use: 'Tích phân tích hai hàm lượng giác.' },
      { name: 'Biến tổng thành tích', expr: 'sin a + sin b = 2sin((a+b)/2)·cos((a−b)/2)', use: 'Đưa phương trình về dạng tích.' },
      { name: 'Phương trình cơ bản', expr: 'sin x = sin α ⟺ x = α + k2π hoặc x = π − α + k2π', use: 'Giải phương trình lượng giác.', trap: 'Quên nghiệm thứ hai của phương trình sin.', star: true },
      { name: 'Phương trình cos', expr: 'cos x = cos α ⟺ x = ±α + k2π', star: true, use: 'Giải phương trình lượng giác.' },
      { name: 'Phương trình bậc nhất theo sin và cos', expr: 'a·sin x + b·cos x = c có nghiệm ⟺ a² + b² ≥ c²', use: 'Điều kiện có nghiệm; tìm giá trị lớn nhất, nhỏ nhất.', star: true },
    ],
  },
  {
    id: 'f-q11-day-so-gioi-han',
    name: 'Lớp 11 — Dãy số, cấp số và giới hạn',
    strand: 'giai-tich',
    grade: 11,
    tracks: ['thpt-qg'],
    topicIds: ['q11-day-so', 'q11-gioi-han'],
    intro: 'Cấp số cộng và cấp số nhân xuất hiện đều đặn trong đề tốt nghiệp, thường ở mức nhận biết.',
    items: [
      { name: 'Cấp số cộng — số hạng tổng quát', expr: 'uₙ = u₁ + (n − 1)d', use: 'Tính một số hạng bất kì.', trap: 'Dùng nhầm n thay cho n − 1.', star: true },
      { name: 'Cấp số cộng — tổng', expr: 'Sₙ = n(u₁ + uₙ)/2 = n[2u₁ + (n−1)d]/2', use: 'Tính tổng n số hạng đầu.', star: true },
      { name: 'Cấp số nhân — số hạng tổng quát', expr: 'uₙ = u₁·q^(n−1)', use: 'Bài lãi kép, tăng trưởng.', star: true },
      { name: 'Cấp số nhân — tổng', expr: 'Sₙ = u₁(1 − qⁿ)/(1 − q)', condition: 'q ≠ 1', use: 'Tổng n số hạng đầu.', star: true },
      { name: 'Cấp số nhân lùi vô hạn', expr: 'S = u₁/(1 − q)', condition: '|q| < 1', use: 'Tổng vô hạn; bài toán hình học có dãy hình lồng nhau.' },
      { name: 'Giới hạn cơ bản', expr: 'lim 1/n = 0;  lim qⁿ = 0 khi |q| < 1', use: 'Tính giới hạn dãy số.', star: true },
      { name: 'Giới hạn hàm số dạng 0/0', expr: 'Phân tích thành nhân tử rồi giản ước, hoặc nhân liên hợp nếu có căn', use: 'Dạng vô định hay gặp nhất.', star: true },
    ],
  },
  {
    id: 'f-q11-dao-ham',
    name: 'Lớp 11 — Đạo hàm',
    strand: 'giai-tich',
    grade: 11,
    tracks: ['thpt-qg'],
    topicIds: ['q11-dao-ham'],
    intro: 'Bảng đạo hàm là công cụ dùng nhiều nhất của lớp 12. Phải viết ra được trong 30 giây.',
    items: [
      { name: 'Luỹ thừa', expr: "(xⁿ)′ = n·x^(n−1)", use: 'Đạo hàm đa thức.', star: true },
      { name: 'Căn thức', expr: "(√x)′ = 1/(2√x)", condition: 'x > 0', use: 'Hàm có căn.', star: true },
      { name: 'Phân thức', expr: "(1/x)′ = −1/x²", use: 'Hàm phân thức đơn giản.', star: true },
      { name: 'Tích và thương', expr: "(uv)′ = u′v + uv′;  (u/v)′ = (u′v − uv′)/v²", use: 'Đạo hàm hàm hợp phức tạp.', trap: 'Đảo thứ tự tử của công thức thương.', star: true },
      { name: 'Hàm hợp', expr: "[f(u)]′ = f′(u)·u′", use: 'Mọi hàm có biểu thức bên trong.', star: true },
      { name: 'Lượng giác', expr: "(sin x)′ = cos x;  (cos x)′ = −sin x;  (tan x)′ = 1/cos²x", use: 'Đạo hàm hàm lượng giác.', star: true },
      { name: 'Mũ và lôgarit', expr: "(eˣ)′ = eˣ;  (aˣ)′ = aˣ·ln a;  (ln x)′ = 1/x;  (log_a x)′ = 1/(x·ln a)", use: 'Đạo hàm hàm mũ – lôgarit.', star: true },
      { name: 'Tiếp tuyến', expr: "y = f′(x₀)(x − x₀) + f(x₀)", use: 'Viết phương trình tiếp tuyến tại một điểm.', star: true },
    ],
  },
  {
    id: 'f-q11-mu-logarit',
    name: 'Lớp 11 — Mũ và lôgarit',
    strand: 'giai-tich',
    grade: 11,
    tracks: ['thpt-qg'],
    topicIds: ['q11-mu-logarit'],
    intro: 'Xuất hiện chắc chắn trong đề tốt nghiệp, thường ở dạng phương trình – bất phương trình cơ bản và bài toán lãi kép.',
    items: [
      { name: 'Định nghĩa lôgarit', expr: 'log_a b = c ⟺ a^c = b', condition: '0 < a ≠ 1, b > 0', use: 'Chuyển qua lại giữa dạng mũ và dạng lôgarit.', star: true },
      { name: 'Phép toán lôgarit', expr: 'log_a(xy) = log_a x + log_a y;  log_a(x/y) = log_a x − log_a y;  log_a(x^n) = n·log_a x', condition: 'x, y > 0', use: 'Rút gọn, giải phương trình.', trap: 'Áp dụng khi chưa có điều kiện x, y > 0.', star: true },
      { name: 'Đổi cơ số', expr: 'log_a b = log_c b / log_c a = 1 / log_b a', use: 'Đưa mọi lôgarit về cùng một cơ số.', star: true },
      { name: 'Bất phương trình mũ', expr: 'a > 1: a^u > a^v ⟺ u > v · 0 < a < 1: đổi chiều', use: 'Giải bất phương trình mũ.', trap: 'Quên đổi chiều khi cơ số nhỏ hơn 1.', star: true },
      { name: 'Bất phương trình lôgarit', expr: 'a > 1: log_a u < b ⟺ 0 < u < a^b · 0 < a < 1: đổi chiều', use: 'Giải bất phương trình lôgarit. Điều kiện xác định phải viết trước.', star: true },
      { name: 'Lãi kép', expr: 'T = A(1 + r)ⁿ', use: 'Bài toán thực tế về tiền gửi, tăng trưởng dân số. Câu “sau ít nhất bao nhiêu năm” thì làm tròn lên.', star: true },
    ],
  },
  {
    id: 'f-q11-hkg-xacsuat',
    name: 'Lớp 11 — Hình học không gian và xác suất',
    strand: 'hinh-khong-gian',
    grade: 11,
    tracks: ['thpt-qg'],
    topicIds: ['q11-hinh-khong-gian', 'q11-xac-suat'],
    intro: 'Hai mảng cùng xuất hiện trong đề tốt nghiệp, đều thiên về quy trình hơn là công thức.',
    items: [
      { name: 'Góc giữa đường thẳng và mặt phẳng', expr: 'Là góc giữa đường thẳng đó và hình chiếu của nó trên mặt phẳng', use: 'Xác định hình chiếu trước, rồi đưa về tam giác vuông.', star: true },
      { name: 'Góc giữa hai mặt phẳng', expr: 'Là góc giữa hai đường thẳng lần lượt vuông góc với giao tuyến trong mỗi mặt', use: 'Dựng đoạn vuông góc với giao tuyến.', star: true },
      { name: 'Thể tích khối chóp', expr: 'V = (1/3)·S_đáy·h', use: 'Bài tính thể tích.', trap: 'Quên hệ số 1/3.', star: true },
      { name: 'Thể tích khối lăng trụ', expr: 'V = S_đáy·h', use: 'Bài tính thể tích lăng trụ, hộp.', star: true },
      { name: 'Khoảng cách từ điểm đến mặt phẳng', expr: 'Dùng thể tích: d = 3V/S_đáy', use: 'Cách nhanh nhất khi dựng hình chiếu khó.', star: true },
      { name: 'Xác suất cổ điển', expr: 'P(A) = n(A)/n(Ω)', use: 'Mọi bài xác suất cơ bản.', star: true },
      { name: 'Biến cố đối', expr: 'P(Ā) = 1 − P(A)', use: 'Bài có cụm “ít nhất một”.', star: true },
      { name: 'Quy tắc cộng và nhân', expr: 'A, B xung khắc: P(A ∪ B) = P(A) + P(B) · A, B độc lập: P(A ∩ B) = P(A)·P(B)', use: 'Ghép nhiều biến cố.', star: true },
    ],
  },
  /* ==================== LỚP 12 ==================== */
  {
    id: 'f-q12-khao-sat',
    name: 'Lớp 12 — Ứng dụng đạo hàm và khảo sát hàm số',
    strand: 'giai-tich',
    grade: 12,
    tracks: ['thpt-qg'],
    topicIds: ['q12-khao-sat-ham-so'],
    intro: 'Mảng chiếm tỉ trọng lớn nhất trong đề tốt nghiệp, có mặt ở cả ba phần của đề.',
    items: [
      { name: 'Đơn điệu', expr: "f′(x) > 0 trên K ⟹ f đồng biến trên K; f′(x) < 0 ⟹ nghịch biến", use: 'Câu hỏi về khoảng đồng biến, nghịch biến.', star: true },
      { name: 'Cực trị', expr: "f′ đổi dấu từ + sang − tại x₀ ⟹ x₀ là điểm cực đại; từ − sang + ⟹ cực tiểu", use: 'Đọc bảng biến thiên.', trap: 'Nhầm “điểm cực trị” (giá trị x) với “giá trị cực trị” (giá trị y).', star: true },
      { name: 'Giá trị lớn nhất – nhỏ nhất trên đoạn', expr: "So sánh f tại các nghiệm của f′ = 0 thuộc đoạn và tại hai đầu mút", use: 'Bài có cụm “trên đoạn [a; b]”.', trap: 'Quên hai đầu mút; quên loại nghiệm ngoài đoạn.', star: true },
      { name: 'Tiệm cận của hàm bậc nhất trên bậc nhất', expr: 'y = (ax + b)/(cx + d): tiệm cận ngang y = a/c, tiệm cận đứng x = −d/c', condition: 'ad − bc ≠ 0', use: 'Câu nhận biết trong đề.', star: true },
      { name: 'Số nghiệm của hàm bậc ba', expr: 'Ba nghiệm phân biệt ⟺ hàm có hai cực trị và f_CĐ · f_CT < 0', use: 'Câu về số giao điểm với trục hoành.', star: true },
      { name: 'Điều kiện có hai cực trị (bậc ba)', expr: "y = ax³ + bx² + cx + d có hai cực trị ⟺ y′ = 0 có hai nghiệm phân biệt ⟺ b² − 3ac > 0", use: 'Bài tham số.', star: true },
    ],
  },
  {
    id: 'f-q12-tich-phan',
    name: 'Lớp 12 — Nguyên hàm và tích phân',
    strand: 'giai-tich',
    grade: 12,
    tracks: ['thpt-qg'],
    topicIds: ['q12-nguyen-ham-tich-phan'],
    intro: 'Bảng nguyên hàm là mặt đối xứng của bảng đạo hàm. Luật chung: đạo hàm thì nhân hệ số trong, nguyên hàm thì chia hệ số trong.',
    items: [
      { name: 'Luỹ thừa', expr: '∫xⁿ dx = x^(n+1)/(n+1) + C', condition: 'n ≠ −1', use: 'Nguyên hàm đa thức.', star: true },
      { name: 'Nghịch đảo', expr: '∫(1/x) dx = ln|x| + C', use: 'Xuất hiện ln trong kết quả.', trap: 'Quên dấu giá trị tuyệt đối.', star: true },
      { name: 'Hàm mũ', expr: '∫eˣ dx = eˣ + C;  ∫e^(ax) dx = (1/a)e^(ax) + C', use: 'Chia cho hệ số trong.', trap: 'Nhân thay vì chia.', star: true },
      { name: 'Lượng giác', expr: '∫sin x dx = −cos x + C;  ∫cos x dx = sin x + C', use: 'Chú ý dấu trừ ở nguyên hàm của sin.', star: true },
      { name: 'Hàm hợp bậc nhất', expr: '∫f(ax + b) dx = (1/a)·F(ax + b) + C', use: 'Mọi nguyên hàm có biểu thức bậc nhất bên trong.', star: true },
      { name: 'Newton – Leibniz', expr: '∫ từ a đến b của f(x)dx = F(b) − F(a)', use: 'Tính tích phân xác định.', star: true },
      { name: 'Tích phân từng phần', expr: '∫u dv = uv − ∫v du', use: 'Tích của đa thức với hàm mũ, lôgarit hoặc lượng giác. Ưu tiên đặt u theo thứ tự: lôgarit → đa thức → lượng giác → mũ.', star: true },
      { name: 'Diện tích hình phẳng', expr: 'S = ∫ từ a đến b của |f(x) − g(x)|dx', use: 'Bài tính diện tích giữa hai đường.', star: true },
      { name: 'Thể tích khối tròn xoay', expr: 'V = π∫ từ a đến b của f²(x)dx', use: 'Quay quanh trục hoành.', star: true },
      { name: 'Quãng đường theo vận tốc', expr: 's = ∫ từ t₁ đến t₂ của |v(t)|dt', use: 'Bài chuyển động. Nếu v đổi dấu thì phải tách đoạn.', star: true },
    ],
  },
  {
    id: 'f-q12-oxyz',
    name: 'Lớp 12 — Toạ độ trong không gian Oxyz',
    strand: 'toa-do',
    grade: 12,
    tracks: ['thpt-qg'],
    topicIds: ['q12-oxyz'],
    intro: 'Mảng cho điểm ổn định nhất của đề tốt nghiệp: công thức rõ ràng, ít bẫy tư duy, chỉ cần cẩn thận về dấu.',
    items: [
      { name: 'Vectơ và độ dài', expr: 'AB = (x_B − x_A; y_B − y_A; z_B − z_A);  |u| = √(x² + y² + z²)', use: 'Mọi bài toạ độ.', trap: 'Trừ ngược chiều.', star: true },
      { name: 'Trung điểm và trọng tâm', expr: 'I = trung bình cộng toạ độ hai đầu mút; G = trung bình cộng toạ độ ba đỉnh', use: 'Câu nhận biết.', star: true },
      { name: 'Tích vô hướng', expr: 'u·v = x₁x₂ + y₁y₂ + z₁z₂', use: 'Tính góc; chứng minh vuông góc.', star: true },
      { name: 'Tích có hướng', expr: '[u, v] = (y₁z₂ − y₂z₁; z₁x₂ − z₂x₁; x₁y₂ − x₂y₁)', use: 'Tìm vectơ pháp tuyến của mặt phẳng qua ba điểm; tính diện tích và thể tích.', star: true },
      { name: 'Phương trình mặt phẳng', expr: 'A(x − x₀) + B(y − y₀) + C(z − z₀) = 0, pháp tuyến n = (A; B; C)', use: 'Viết phương trình mặt phẳng.', star: true },
      { name: 'Phương trình theo đoạn chắn', expr: 'x/a + y/b + z/c = 1', condition: 'Mặt phẳng cắt ba trục tại (a;0;0), (0;b;0), (0;0;c)', use: 'Ba điểm nằm trên ba trục toạ độ — nhanh hơn tích có hướng rất nhiều.', star: true },
      { name: 'Khoảng cách điểm – mặt phẳng', expr: 'd = |Ax₀ + By₀ + Cz₀ + D| / √(A² + B² + C²)', use: 'Bài khoảng cách, bài tiếp xúc.', trap: 'Quên giá trị tuyệt đối ở tử.', star: true },
      { name: 'Phương trình mặt cầu', expr: '(x−a)² + (y−b)² + (z−c)² = R², hoặc x² + y² + z² − 2ax − 2by − 2cz + d = 0 với R = √(a² + b² + c² − d)', use: 'Xác định tâm và bán kính.', trap: 'Quên dấu trừ trước d.', star: true },
      { name: 'Phương trình đường thẳng', expr: 'x = x₀ + at, y = y₀ + bt, z = z₀ + ct, chỉ phương u = (a; b; c)', use: 'Viết phương trình đường thẳng.', star: true },
      { name: 'Thể tích tứ diện', expr: 'V = (1/6)|[AB, AC]·AD|', use: 'Tính thể tích khi biết bốn đỉnh.' },
    ],
  },
  {
    id: 'f-q12-thong-ke',
    name: 'Lớp 12 — Thống kê ghép nhóm và xác suất có điều kiện',
    strand: 'xac-suat',
    grade: 12,
    tracks: ['thpt-qg'],
    topicIds: ['q12-thong-ke', 'q12-xac-suat-co-dieu-kien'],
    intro:
      'Hai nội dung mới của chương trình, xuất hiện chắc chắn trong đề tốt nghiệp định dạng từ 2025. Đừng bỏ qua vì tưởng dễ.',
    items: [
      { name: 'Số trung bình ghép nhóm', expr: 'x̄ = Σ(nᵢ·cᵢ)/n, với cᵢ là giá trị đại diện (trung điểm) của nhóm', use: 'Câu tính trung bình.', star: true },
      { name: 'Nhóm chứa trung vị', expr: 'Nhóm đầu tiên có tần số tích luỹ ≥ n/2', use: 'Kẻ thêm cột tần số tích luỹ là ra ngay.', trap: 'Chọn nhóm có tần số lớn nhất (đó là nhóm chứa mốt).', star: true },
      { name: 'Trung vị ghép nhóm', expr: 'Me = a_m + [(n/2 − cf)/f_m]·h', condition: 'a_m là đầu mút trái nhóm chứa trung vị, cf là tần số tích luỹ trước nhóm đó, f_m tần số nhóm, h độ dài nhóm', use: 'Câu tính giá trị trung vị.', star: true },
      { name: 'Tứ phân vị', expr: 'Q₁ tại vị trí n/4, Q₃ tại vị trí 3n/4, dùng cùng công thức nội suy như trung vị', use: 'Câu về độ phân tán.' },
      { name: 'Mốt ghép nhóm', expr: 'Mo = a_m + [(f_m − f_(m−1)) / (2f_m − f_(m−1) − f_(m+1))]·h', use: 'Câu tính mốt.' },
      { name: 'Xác suất có điều kiện', expr: 'P(A|B) = P(A ∩ B)/P(B)', condition: 'P(B) > 0', use: 'Đề có cụm “biết rằng …”. Mẫu số là nhóm nằm sau chữ “biết”.', trap: 'Đảo ngược điều kiện: P(A|B) khác P(B|A).', star: true },
      { name: 'Công thức nhân xác suất', expr: 'P(A ∩ B) = P(B)·P(A|B)', use: 'Bài hai giai đoạn, sơ đồ hình cây.', star: true },
      { name: 'Xác suất toàn phần', expr: 'P(A) = P(B)·P(A|B) + P(B̄)·P(A|B̄)', use: 'Bài chia trường hợp theo một biến cố trung gian.', star: true },
      { name: 'Công thức Bayes', expr: 'P(B|A) = P(B)·P(A|B) / P(A)', use: 'Bài “biết kết quả, hỏi ngược nguyên nhân”: xét nghiệm y tế, kiểm tra chất lượng.', star: true },
    ],
  },
];

/* ---------------- Tiện ích tra cứu ---------------- */

export const ALL_FORMULAS = FORMULA_GROUPS.flatMap((g) =>
  g.items.map((it) => ({ ...it, groupId: g.id, groupName: g.name, strand: g.strand, grade: g.grade, tracks: g.tracks })),
);

export const formulaStats = () => ({
  groups: FORMULA_GROUPS.length,
  items: ALL_FORMULAS.length,
  starred: ALL_FORMULAS.filter((f) => f.star).length,
  withTrap: ALL_FORMULAS.filter((f) => f.trap).length,
});

export const formulaGroupsForTrack = (track: TrackId) =>
  FORMULA_GROUPS.filter((g) => g.tracks.includes(track));

export const formulaGroupsForTopic = (topicId: string) =>
  FORMULA_GROUPS.filter((g) => g.topicIds.includes(topicId));

/** Tìm kiếm không dấu, không phân biệt hoa thường. */
export const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();

export function searchFormulas(q: string, track?: TrackId) {
  const needle = normalize(q.trim());
  if (!needle) return [];
  return ALL_FORMULAS.filter((f) => {
    if (track && !f.tracks.includes(track)) return false;
    return normalize(`${f.name} ${f.expr} ${f.use} ${f.trap ?? ''} ${f.groupName}`).includes(needle);
  });
}
