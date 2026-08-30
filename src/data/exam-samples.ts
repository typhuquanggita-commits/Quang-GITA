import type { SchoolId } from '@/types';

/**
 * CÂU MẪU THEO ĐỊNH DẠNG — HSA, TSA và SAT
 *
 * Vì sao là "câu mẫu" chứ không phải "đề mẫu trọn vẹn": ba kỳ thi này lần lượt
 * có khoảng 50, 40 và 44 câu. Một đề tự viết đủ số câu ở mức chất lượng của kho
 * Đề thi thử sẽ mất nhiều tháng biên soạn, và nếu làm vội thì chỉ là độn số
 * lượng chứ không giúp gì cho người học.
 *
 * Điều thật sự quyết định kết quả ở ba kỳ thi này không phải kiến thức mới —
 * toàn bộ nội dung đều nằm trong chương trình phổ thông — mà là ĐỊNH DẠNG và
 * TỐC ĐỘ. Vì vậy mỗi câu dưới đây đi kèm ba thứ mà một đề luyện thông thường
 * không có: dấu hiệu đọc vị, bẫy đặc trưng của kỳ thi đó, và mẹo tốc độ với
 * thời gian mục tiêu tính bằng giây.
 *
 * Đề thi thật của cả ba kỳ đều thuộc bản quyền của đơn vị tổ chức. Các câu dưới
 * đây do MATH365 tự biên soạn theo mô tả định dạng đã được công bố.
 */

export interface FormatSample {
  id: string;
  blueprintId: string;
  schoolId: SchoolId;
  /** Nhóm câu trong ma trận đề. */
  part: string;
  label: string;
  statement: string;
  /** Nguyên văn tiếng Anh, chỉ có ở SAT — vì rào cản đầu tiên của SAT là đọc hiểu. */
  statementEn?: string;
  choices: string[];
  correctIndex: number;
  solution: string[];
  /** Dấu hiệu để nhận ra dạng ngay khi đọc lướt. */
  docVi: string[];
  /** Bẫy đặc trưng của chính kỳ thi này. */
  trap: string;
  /** Mẹo rút ngắn thời gian — thứ quyết định điểm ở các kỳ thi tốc độ cao. */
  speedTip: string;
  /** Thời gian mục tiêu, tính bằng giây. */
  seconds: number;
}

export const FORMAT_SAMPLES: FormatSample[] = [
  /* ==================== HSA — ĐHQG HÀ NỘI ==================== */
  {
    id: 'fs-hsa-01',
    blueprintId: 'bp-hsa',
    schoolId: 'hsa',
    part: 'Nhóm 1 · Đại số và hàm số',
    label: 'Câu 1',
    statement: 'Hàm số y = x³ − 3x + 1 có bao nhiêu điểm cực trị?',
    choices: ['0', '1', '2', '3'],
    correctIndex: 2,
    solution: [
      "y' = 3x² − 3 = 3(x² − 1), cho y' = 0 được x = 1 và x = −1.",
      "Đạo hàm là tam thức bậc hai có hai nghiệm phân biệt nên đổi dấu qua cả hai nghiệm.",
      'Vậy hàm số có đúng 2 điểm cực trị.',
    ],
    docVi: [
      'Hàm bậc ba, câu hỏi về SỐ điểm cực trị chứ không hỏi giá trị cực trị.',
      'Hệ số bậc ba khác 0 và không chứa tham số nên không cần xét trường hợp riêng.',
    ],
    trap: 'Nhầm số nghiệm của đạo hàm với số điểm cực trị khi đạo hàm có nghiệm kép — khi đó đạo hàm không đổi dấu và hàm không có cực trị.',
    speedTip:
      'Với hàm bậc ba, chỉ cần xét dấu Δ của đạo hàm: Δ > 0 cho hai cực trị, Δ ≤ 0 cho không có cực trị. Không cần giải ra nghiệm.',
    seconds: 45,
  },
  {
    id: 'fs-hsa-02',
    blueprintId: 'bp-hsa',
    schoolId: 'hsa',
    part: 'Nhóm 1 · Đại số và hàm số',
    label: 'Câu 2',
    statement: 'Nghiệm của phương trình log₃(x) + log₃(x − 2) = 1 là:',
    choices: ['x = 3', 'x = −1', 'x = 3 hoặc x = −1', 'x = 5'],
    correctIndex: 0,
    solution: [
      'Điều kiện xác định: x > 0 và x − 2 > 0, tức x > 2.',
      'Gộp hai logarit cùng cơ số: log₃[x(x − 2)] = 1, suy ra x(x − 2) = 3.',
      'Giải x² − 2x − 3 = 0 được x = 3 hoặc x = −1.',
      'Đối chiếu điều kiện x > 2: loại x = −1, nhận x = 3.',
    ],
    docVi: [
      'Tổng hai logarit cùng cơ số và vế phải là một số — dấu hiệu gộp logarit.',
      'Có phương án chứa cả hai nghiệm: đó chính là bẫy điều kiện xác định.',
    ],
    trap: 'Phương án "x = 3 hoặc x = −1" luôn được cài sẵn cho người quên đặt điều kiện. Ở HSA, tỉ lệ chọn phương án này rất cao vì áp lực thời gian.',
    speedTip:
      'Nhìn phương án trước: khi có một phương án là tập con của phương án khác, gần như chắc chắn bài này kiểm tra điều kiện xác định. Viết điều kiện trước cả khi giải.',
    seconds: 60,
  },
  {
    id: 'fs-hsa-03',
    blueprintId: 'bp-hsa',
    schoolId: 'hsa',
    part: 'Nhóm 1 · Đại số và hàm số',
    label: 'Câu 3',
    statement: 'Cấp số cộng có số hạng đầu u₁ = 5 và công sai d = 3. Số hạng thứ 20 của cấp số đó là:',
    choices: ['62', '65', '60', '58'],
    correctIndex: 0,
    solution: [
      'Công thức số hạng tổng quát: uₙ = u₁ + (n − 1)d.',
      'u₂₀ = 5 + (20 − 1) · 3 = 5 + 57 = 62.',
    ],
    docVi: ['Cho u₁ và d, hỏi một số hạng cụ thể — áp thẳng công thức.'],
    trap: 'Quên trừ 1 và tính thành 5 + 20 · 3 = 65 — đó chính là phương án nhiễu đứng ngay cạnh đáp án đúng.',
    speedTip:
      'Nhẩm luôn: 19 × 3 = 57, cộng 5 được 62. Câu loại này phải xong dưới 30 giây để dành thời gian cho nhóm số liệu.',
    seconds: 30,
  },
  {
    id: 'fs-hsa-04',
    blueprintId: 'bp-hsa',
    schoolId: 'hsa',
    part: 'Nhóm 2 · Hình học và đo lường',
    label: 'Câu 4',
    statement: 'Một hình nón có bán kính đáy 3 cm và chiều cao 4 cm. Diện tích xung quanh của hình nón đó là:',
    choices: ['15π cm²', '12π cm²', '24π cm²', '9π cm²'],
    correctIndex: 0,
    solution: [
      'Đường sinh: l = √(r² + h²) = √(9 + 16) = √25 = 5 (cm).',
      'Diện tích xung quanh hình nón: S = πrl = π · 3 · 5 = 15π (cm²).',
    ],
    docVi: [
      'Cho bán kính và CHIỀU CAO nhưng công thức cần ĐƯỜNG SINH — bước trung gian bắt buộc.',
      'Bộ số 3 – 4 – 5 là dấu hiệu đề đã chọn số đẹp để tính nhanh.',
    ],
    trap: 'Dùng thẳng chiều cao 4 thay cho đường sinh, ra 12π — phương án này luôn có mặt.',
    speedTip:
      'Thấy bán kính và chiều cao là bộ ba Pythagore quen thuộc (3–4–5, 6–8–10, 5–12–13) thì đọc ngay đường sinh, không cần đặt bút.',
    seconds: 45,
  },
  {
    id: 'fs-hsa-05',
    blueprintId: 'bp-hsa',
    schoolId: 'hsa',
    part: 'Nhóm 2 · Hình học và đo lường',
    label: 'Câu 5',
    statement:
      'Trong không gian Oxyz, khoảng cách giữa hai mặt phẳng song song 2x − y + 2z + 1 = 0 và 2x − y + 2z − 5 = 0 là:',
    choices: ['2', '6', '3', '4/3'],
    correctIndex: 0,
    solution: [
      'Hai mặt phẳng có cùng vectơ pháp tuyến (2; −1; 2) nên song song với nhau.',
      'Với hai mặt phẳng song song đã cùng dạng hệ số, khoảng cách bằng |D₁ − D₂| : √(A² + B² + C²).',
      'Tính: |1 − (−5)| : √(4 + 1 + 4) = 6 : 3 = 2.',
    ],
    docVi: [
      'Hai phương trình có phần hệ số x, y, z giống hệt nhau — dấu hiệu chắc chắn của hai mặt phẳng song song.',
      'Chỉ khác nhau ở hằng số tự do nên dùng được công thức rút gọn.',
    ],
    trap: 'Quên chia cho độ dài vectơ pháp tuyến và trả lời 6; hoặc lấy tổng hai hằng số thay vì hiệu.',
    speedTip:
      'Kiểm tra hệ số x, y, z có tỉ lệ với nhau không; nếu đã cùng dạng thì chỉ cần một phép trừ và một phép chia, không cần lấy điểm thuộc mặt phẳng.',
    seconds: 45,
  },
  {
    id: 'fs-hsa-06',
    blueprintId: 'bp-hsa',
    schoolId: 'hsa',
    part: 'Nhóm 3 · Xử lí số liệu, thống kê và xác suất',
    label: 'Câu 6',
    statement:
      'Doanh thu bốn quý của một cửa hàng lần lượt là 120; 150; 180; 150 (triệu đồng). Doanh thu quý III cao hơn doanh thu trung bình của cả năm bao nhiêu phần trăm?',
    choices: ['20%', '30%', '16,7%', '25%'],
    correctIndex: 0,
    solution: [
      'Doanh thu trung bình: (120 + 150 + 180 + 150) : 4 = 600 : 4 = 150 (triệu đồng).',
      'Quý III cao hơn trung bình: 180 − 150 = 30 (triệu đồng).',
      'Tỉ lệ phần trăm so với TRUNG BÌNH: 30 : 150 = 0,2 = 20%.',
    ],
    docVi: [
      'Câu hỏi có hai bước: tính trung bình trước, rồi mới so sánh.',
      'Cụm "cao hơn … bao nhiêu phần trăm" cho biết mẫu số là giá trị được so sánh với, tức trung bình.',
    ],
    trap: 'Lấy 30 chia cho 180 (giá trị của quý III) được 16,7% — đây là bẫy chọn sai mốc so sánh, và là phương án nhiễu chính.',
    speedTip:
      'Tổng 600 nhẩm được ngay vì các số đều tròn chục. Luôn tự hỏi "phần trăm của số nào" trước khi bấm máy.',
    seconds: 60,
  },
  {
    id: 'fs-hsa-07',
    blueprintId: 'bp-hsa',
    schoolId: 'hsa',
    part: 'Nhóm 3 · Xử lí số liệu, thống kê và xác suất',
    label: 'Câu 7',
    statement:
      'Một nhóm có 3 nam và 5 nữ. Chọn ngẫu nhiên 2 người. Xác suất để trong 2 người được chọn có ít nhất một nữ là:',
    choices: ['25/28', '3/28', '15/28', '5/14'],
    correctIndex: 0,
    solution: [
      'Tổng số người: 3 + 5 = 8. Số cách chọn 2 người bất kì: 8 · 7 : 2 = 28.',
      'Biến cố đối là "không có nữ nào", tức chọn cả 2 đều là nam: 3 · 2 : 2 = 3 cách.',
      'Xác suất biến cố đối: 3/28. Xác suất cần tìm: 1 − 3/28 = 25/28.',
    ],
    docVi: [
      'Cụm "ít nhất một" là dấu hiệu gần như tuyệt đối của biến cố đối.',
      'Phương án 3/28 chính là xác suất của biến cố đối, được cài sẵn.',
    ],
    trap: 'Tính đúng biến cố đối rồi quên bước lấy 1 trừ đi, chọn thẳng 3/28.',
    speedTip:
      'Gặp "ít nhất" thì viết ngay dòng "1 − P(không có)" trước khi tính bất cứ thứ gì. Thói quen này tiết kiệm nhiều thời gian nhất trong cả nhóm xác suất.',
    seconds: 60,
  },
  {
    id: 'fs-hsa-08',
    blueprintId: 'bp-hsa',
    schoolId: 'hsa',
    part: 'Nhóm 3 · Xử lí số liệu, thống kê và xác suất',
    label: 'Câu 8',
    statement: 'Giá trị của tổng S = 1/2 + 1/6 + 1/12 + 1/20 + … + 1/90 là:',
    choices: ['9/10', '1/10', '8/9', '10/9'],
    correctIndex: 0,
    solution: [
      'Nhận xét các mẫu: 2 = 1·2; 6 = 2·3; 12 = 3·4; 20 = 4·5; …; 90 = 9·10.',
      'Dùng công thức tách: 1/[n(n + 1)] = 1/n − 1/(n + 1).',
      'S = (1/1 − 1/2) + (1/2 − 1/3) + … + (1/9 − 1/10).',
      'Các số hạng trung gian khử nhau, còn lại S = 1 − 1/10 = 9/10.',
    ],
    docVi: [
      'Dãy phân số có tử bằng 1 và mẫu là tích hai số tự nhiên liên tiếp.',
      'Mẫu cuối cùng cho biết dãy dừng ở đâu: 90 = 9 · 10 nên số hạng cuối ứng với n = 9.',
    ],
    trap: 'Cộng tuần tự bằng máy tính — vừa mất hơn hai phút vừa dễ sai, trong khi cả bài chỉ được trung bình 90 giây một câu.',
    speedTip:
      'Thấy mẫu là tích hai số liên tiếp thì đáp số luôn có dạng 1 − 1/(n + 1). Chỉ cần đọc mẫu cuối để biết n.',
    seconds: 60,
  },

  /* ==================== TSA — ĐHBK HÀ NỘI ==================== */
  {
    id: 'fs-tsa-01',
    blueprintId: 'bp-tsa',
    schoolId: 'tsa',
    part: 'Phần 1 · Tư duy định lượng',
    label: 'Câu 1',
    statement:
      'Nếu 3 máy in in được 3 trang trong 3 phút thì 100 máy in cùng loại in được 100 trang trong bao lâu?',
    choices: ['3 phút', '100 phút', '1 phút', '33,3 phút'],
    correctIndex: 0,
    solution: [
      'Từ dữ kiện: 3 máy in 3 trang trong 3 phút, nghĩa là mỗi máy in được 1 trang trong 3 phút.',
      'Năng suất một máy không đổi: 1 trang / 3 phút.',
      '100 máy hoạt động song song thì in được 100 trang cũng trong đúng 3 phút.',
    ],
    docVi: [
      'Ba con số giống nhau trong đề (3 – 3 – 3) là dấu hiệu của một câu kiểm tra tư duy, không phải kiểm tra tính toán.',
      'Câu hỏi giữ nguyên tỉ lệ giữa số máy và số trang — đây là chìa khoá.',
    ],
    trap: 'Phản xạ nhân lên thành 100 phút. TSA cài rất nhiều câu mà đáp án "trông hợp lý" lại sai, vì mục tiêu của bài thi là đo tư duy chứ không đo tốc độ tính.',
    speedTip:
      'Trước khi tính, hãy quy về một đơn vị: một máy làm được bao nhiêu trong bao lâu. Bước này giải được gần hết nhóm câu năng suất của TSA.',
    seconds: 45,
  },
  {
    id: 'fs-tsa-02',
    blueprintId: 'bp-tsa',
    schoolId: 'tsa',
    part: 'Phần 1 · Tư duy định lượng',
    label: 'Câu 2',
    statement:
      'Giá một sản phẩm tăng 25%, sau đó giảm 20% so với giá mới. So với giá ban đầu, giá cuối cùng:',
    choices: ['bằng giá ban đầu', 'tăng 5%', 'giảm 5%', 'tăng 45%'],
    correctIndex: 0,
    solution: [
      'Coi giá ban đầu là 100 phần.',
      'Sau khi tăng 25%: giá mới là 125 phần.',
      'Giảm 20% so với giá mới: 125 × 80 : 100 = 100 phần.',
      'Vậy giá cuối cùng đúng bằng giá ban đầu.',
    ],
    docVi: [
      'Hai lần thay đổi phần trăm liên tiếp, và cụm "so với giá mới" xác định rõ mốc của lần thứ hai.',
      'Cặp số 25% và 20% là cặp nghịch đảo quen thuộc: 5/4 rồi 4/5.',
    ],
    trap: 'Cộng trừ trực tiếp 25% − 20% = 5% rồi chọn "tăng 5%". Đây là phương án nhiễu được thiết kế riêng cho phản xạ này.',
    speedTip:
      'Quy về hệ số nhân: 1,25 × 0,8 = 1. Nhân hai hệ số nhanh hơn và không bao giờ sai mốc so sánh.',
    seconds: 45,
  },
  {
    id: 'fs-tsa-03',
    blueprintId: 'bp-tsa',
    schoolId: 'tsa',
    part: 'Phần 1 · Tư duy định lượng',
    label: 'Câu 3',
    statement: 'Cho dãy số 2; 6; 12; 20; 30; … Số hạng thứ 10 của dãy là:',
    choices: ['110', '90', '100', '132'],
    correctIndex: 0,
    solution: [
      'Hiệu giữa các số hạng liên tiếp: 4; 6; 8; 10 — không phải hằng số nên không phải dãy cách đều.',
      'Hiệu của các hiệu đều bằng 2, cho thấy dãy có quy luật hai tầng.',
      'Viết mỗi số thành tích: 2 = 1·2; 6 = 2·3; 12 = 3·4; 20 = 4·5; 30 = 5·6.',
      'Quy luật: số hạng thứ n bằng n(n + 1). Số hạng thứ 10 là 10 · 11 = 110.',
    ],
    docVi: [
      'Hiệu tăng dần đều — dấu hiệu của dãy quy luật hai tầng, không dùng công thức cấp số cộng được.',
      'Các số đều là tích hai số tự nhiên liên tiếp.',
    ],
    trap: 'Áp công thức cấp số cộng với khoảng cách lấy từ hai số hạng đầu, ra kết quả sai hoàn toàn.',
    speedTip:
      'Với dãy lạ, luôn viết dãy hiệu trước. Hiệu đều thì là cấp số cộng; hiệu của hiệu đều thì viết mỗi số thành tích.',
    seconds: 60,
  },
  {
    id: 'fs-tsa-04',
    blueprintId: 'bp-tsa',
    schoolId: 'tsa',
    part: 'Phần 2 · Tư duy hình học và không gian',
    label: 'Câu 4',
    statement:
      'Nối trung điểm các cạnh của một tam giác ta được một tam giác mới. Tỉ số diện tích của tam giác mới so với tam giác ban đầu là:',
    choices: ['1/4', '1/2', '1/3', '2/3'],
    correctIndex: 0,
    solution: [
      'Tam giác tạo bởi ba đường trung bình đồng dạng với tam giác ban đầu.',
      'Mỗi đường trung bình bằng nửa cạnh tương ứng nên tỉ số đồng dạng k = 1/2.',
      'Tỉ số diện tích bằng bình phương tỉ số đồng dạng: k² = 1/4.',
    ],
    docVi: [
      'Bài hỏi TỈ SỐ chứ không hỏi giá trị, nên không cần số đo cụ thể.',
      'Từ "trung điểm" gợi ngay tới đường trung bình và tỉ số 1/2.',
    ],
    trap: 'Trả lời 1/2 vì lấy thẳng tỉ số đồng dạng mà quên bình phương. Đây là lỗi phổ biến nhất của mọi bài tỉ số diện tích.',
    speedTip:
      'Ghi nhớ một câu: tỉ số độ dài là k thì tỉ số diện tích là k² và tỉ số thể tích là k³. Câu này nên xong trong 20 giây.',
    seconds: 30,
  },
  {
    id: 'fs-tsa-05',
    blueprintId: 'bp-tsa',
    schoolId: 'tsa',
    part: 'Phần 2 · Tư duy hình học và không gian',
    label: 'Câu 5',
    statement:
      'Cắt một hình lập phương bằng mặt phẳng đi qua ba trung điểm của ba cạnh cùng xuất phát từ một đỉnh. Thiết diện thu được là hình gì?',
    choices: ['Tam giác đều', 'Tam giác vuông cân', 'Hình vuông', 'Tam giác cân không đều'],
    correctIndex: 0,
    solution: [
      'Gọi cạnh hình lập phương là 2a; ba trung điểm cách đỉnh chung một đoạn a trên ba cạnh đôi một vuông góc.',
      'Mỗi cạnh của thiết diện là cạnh huyền của một tam giác vuông cân có hai cạnh góc vuông bằng a.',
      'Do đó cả ba cạnh của thiết diện đều bằng a√2.',
      'Ba cạnh bằng nhau nên thiết diện là tam giác đều.',
    ],
    docVi: [
      'Ba cạnh cùng xuất phát từ một đỉnh của hình lập phương thì đôi một vuông góc — đây là dữ kiện then chốt.',
      'Câu hỏi về HÌNH DẠNG chứ không về kích thước, nên chỉ cần so sánh ba cạnh.',
    ],
    trap: 'Nhìn hình vẽ phối cảnh thấy tam giác "trông không đều" rồi chọn tam giác cân. Ở TSA, hình vẽ phối cảnh luôn làm méo cảm nhận về độ dài.',
    speedTip:
      'Gán cạnh hình lập phương bằng 2 rồi tính cụ thể ba cạnh thiết diện. Gán số cụ thể nhanh hơn nhiều so với lập luận trừu tượng.',
    seconds: 75,
  },
  {
    id: 'fs-tsa-06',
    blueprintId: 'bp-tsa',
    schoolId: 'tsa',
    part: 'Phần 3 · Tư duy dữ liệu và xác suất',
    label: 'Câu 6',
    statement:
      'Một nghiên cứu ghi nhận: ở các thành phố có nhiều tiệm kem hơn, số vụ đuối nước cũng cao hơn. Kết luận nào sau đây là hợp lý nhất từ dữ liệu đó?',
    choices: [
      'Hai đại lượng có tương quan, nhưng dữ liệu chưa cho phép kết luận cái nào gây ra cái nào',
      'Ăn kem làm tăng nguy cơ đuối nước',
      'Đuối nước làm tăng số tiệm kem',
      'Hai đại lượng hoàn toàn độc lập với nhau',
    ],
    correctIndex: 0,
    solution: [
      'Dữ liệu cho thấy hai đại lượng cùng tăng, tức là có tương quan.',
      'Tương quan không đồng nghĩa với quan hệ nhân quả: có thể tồn tại một yếu tố thứ ba tác động lên cả hai.',
      'Ở đây yếu tố thứ ba rất có thể là thời tiết nóng: trời nóng làm tăng cả lượng kem bán ra lẫn số người đi bơi.',
      'Vì vậy kết luận hợp lý nhất là có tương quan nhưng chưa đủ căn cứ để kết luận nhân quả.',
    ],
    docVi: [
      'Đề mô tả hai đại lượng cùng tăng và hỏi "kết luận nào hợp lý" — dấu hiệu của câu tương quan và nhân quả.',
      'Các phương án còn lại đều phát biểu một chiều nhân quả cụ thể.',
    ],
    trap: 'Chọn phương án nghe có vẻ khoa học và dứt khoát. TSA đánh giá cao việc nhận ra giới hạn của dữ liệu hơn là đưa ra kết luận mạnh.',
    speedTip:
      'Gặp câu suy luận dữ liệu, hãy tìm phương án THẬN TRỌNG nhất mà vẫn đúng với dữ liệu. Phương án khẳng định nhân quả từ một quan sát tương quan gần như luôn sai.',
    seconds: 60,
  },
  {
    id: 'fs-tsa-07',
    blueprintId: 'bp-tsa',
    schoolId: 'tsa',
    part: 'Phần 3 · Tư duy dữ liệu và xác suất',
    label: 'Câu 7',
    statement:
      'Xếp 5 học sinh vào 5 ghế kê thành một hàng ngang. Có bao nhiêu cách xếp sao cho hai bạn A và B ngồi cạnh nhau?',
    choices: ['48', '24', '120', '96'],
    correctIndex: 0,
    solution: [
      'Coi hai bạn A và B là một khối gắn liền; khi đó ta xếp 4 đối tượng: khối AB và 3 bạn còn lại.',
      'Số cách xếp 4 đối tượng thành hàng: 4! = 24.',
      'Trong mỗi cách, hai bạn A và B có thể đổi chỗ cho nhau: 2 cách.',
      'Tổng số cách: 24 × 2 = 48.',
    ],
    docVi: [
      'Ràng buộc "ngồi cạnh nhau" là dấu hiệu của kỹ thuật buộc thành một khối.',
      'Sau khi buộc khối, bài trở thành bài xếp hàng thông thường.',
    ],
    trap: 'Quên nhân 2 cho việc hai bạn đổi chỗ trong khối, ra 24. Hoặc trả lời 120 là số cách xếp không có ràng buộc.',
    speedTip:
      'Ràng buộc "cạnh nhau" thì buộc khối; ràng buộc "không cạnh nhau" thì lấy tổng trừ đi số cách cạnh nhau. Hai câu này luôn đi cùng nhau.',
    seconds: 60,
  },
  {
    id: 'fs-tsa-08',
    blueprintId: 'bp-tsa',
    schoolId: 'tsa',
    part: 'Phần 1 · Tư duy định lượng',
    label: 'Câu 8',
    statement:
      'Cho hàm số y = f(x) có bảng biến thiên với hai điểm cực trị: cực đại f(−1) = 3 và cực tiểu f(1) = −1, và f(x) tiến tới ±∞ ở hai đầu. Số nghiệm của phương trình f(x) = 2 là:',
    choices: ['3', '1', '2', '0'],
    correctIndex: 0,
    solution: [
      'Số nghiệm của f(x) = 2 bằng số giao điểm của đồ thị y = f(x) với đường thẳng nằm ngang y = 2.',
      'Đường thẳng y = 2 nằm giữa giá trị cực tiểu (−1) và giá trị cực đại (3).',
      'Với hàm bậc ba có hai cực trị, đường thẳng nằm giữa hai giá trị cực trị cắt đồ thị tại đúng 3 điểm.',
      'Vậy phương trình có 3 nghiệm phân biệt.',
    ],
    docVi: [
      'Đề cho bảng biến thiên và hỏi số nghiệm — không cần biết công thức của hàm số.',
      'Chỉ cần so sánh giá trị 2 với hai giá trị cực trị −1 và 3.',
    ],
    trap: 'Cố tìm công thức của hàm số rồi giải phương trình. Câu này thiết kế để giải bằng cách đọc hình, và mọi nỗ lực tính toán đều là mất thời gian.',
    speedTip:
      'Kẻ một đường ngang trên bảng biến thiên và đếm giao điểm. Ba trường hợp cần nhớ: nằm giữa hai cực trị cho 3 nghiệm, bằng đúng một cực trị cho 2 nghiệm, nằm ngoài cho 1 nghiệm.',
    seconds: 45,
  },

  /* ==================== SAT — PHẦN TOÁN ==================== */
  {
    id: 'fs-sat-01',
    blueprintId: 'bp-sat',
    schoolId: 'sat',
    part: 'Algebra',
    label: 'Question 1',
    statementEn:
      'A gym charges a one-time membership fee of $60 plus $15 for each class attended. If Maria paid $180 in total, how many classes did she attend?',
    statement:
      'Một phòng tập thu phí thành viên một lần là 60 đô-la, cộng thêm 15 đô-la cho mỗi buổi tập. Nếu Maria trả tổng cộng 180 đô-la thì cô ấy đã tham gia bao nhiêu buổi tập?',
    choices: ['8', '12', '4', '16'],
    correctIndex: 0,
    solution: [
      'Gọi số buổi tập là x. Tổng chi phí gồm phí cố định 60 và phí theo buổi 15x.',
      'Lập phương trình: 60 + 15x = 180.',
      'Suy ra 15x = 120, do đó x = 8.',
      'Thử lại: 60 + 15 × 8 = 60 + 120 = 180 ✓.',
    ],
    docVi: [
      'Cụm "one-time fee" (phí một lần) là hằng số; "for each" (mỗi) là hệ số của biến.',
      'Cấu trúc chuẩn của SAT: một phí cố định cộng một phí theo đơn vị.',
    ],
    trap: 'Chia thẳng 180 : 15 = 12 mà quên trừ phí cố định. Phương án 12 luôn có mặt trong dạng này.',
    speedTip:
      'Học thuộc ba cụm từ khoá: "one-time / flat fee" là hằng số, "per / for each" là hệ số, "in total" là vế phải. Nhận ra ba cụm này thì lập được phương trình mà không cần đọc kỹ cả câu.',
    seconds: 60,
  },
  {
    id: 'fs-sat-02',
    blueprintId: 'bp-sat',
    schoolId: 'sat',
    part: 'Algebra',
    label: 'Question 2',
    statementEn: 'If 3x + 2y = 13 and x − y = 1, what is the value of x + y?',
    statement: 'Nếu 3x + 2y = 13 và x − y = 1 thì giá trị của x + y bằng bao nhiêu?',
    choices: ['5', '4', '3', '6'],
    correctIndex: 0,
    solution: [
      'Cách 1 — giải hệ. Từ phương trình thứ hai: x = y + 1.',
      'Thay vào phương trình thứ nhất: 3(y + 1) + 2y = 13 ⟺ 5y + 3 = 13 ⟺ y = 2, suy ra x = 3.',
      'Do đó x + y = 3 + 2 = 5.',
      'Cách 2 — tổ hợp tuyến tính, nhanh hơn. Lấy phương trình thứ hai trừ đi 2 lần phương trình thứ nhất:',
      '(x − y) − 2(3x + 2y) = 1 − 2 · 13, tức −5x − 5y = −25, chia hai vế cho −5 được x + y = 5.',
      'Cách 2 cho ngay biểu thức cần tìm mà không phải giải ra từng ẩn.',
    ],
    docVi: [
      'Hệ hai phương trình bậc nhất, nhưng câu hỏi là giá trị của MỘT BIỂU THỨC, không phải của từng ẩn.',
      'Đây là dấu hiệu nên thử tổ hợp cộng trừ hai phương trình trước khi giải hệ.',
    ],
    trap: 'Giải hết hệ rồi mới cộng — vẫn đúng nhưng mất gấp đôi thời gian. Ở SAT, khi câu hỏi hỏi một biểu thức thì thường tồn tại một tổ hợp cho ngay kết quả.',
    speedTip:
      'Trước khi giải hệ, thử cộng hai phương trình và thử trừ hai phương trình. Nếu một trong hai cho thẳng biểu thức cần tìm thì xong trong 15 giây.',
    seconds: 45,
  },
  {
    id: 'fs-sat-03',
    blueprintId: 'bp-sat',
    schoolId: 'sat',
    part: 'Advanced Math',
    label: 'Question 3',
    statementEn:
      'The function f is defined by f(x) = (x − 3)² − 4. What is the minimum value of f?',
    statement: 'Hàm số f được xác định bởi f(x) = (x − 3)² − 4. Giá trị nhỏ nhất của f bằng bao nhiêu?',
    choices: ['−4', '3', '−3', '4'],
    correctIndex: 0,
    solution: [
      'Hàm số đã ở dạng đỉnh: f(x) = a(x − h)² + k với a = 1, h = 3, k = −4.',
      'Vì a = 1 > 0 nên parabol quay bề lõm lên trên và đạt giá trị nhỏ nhất tại đỉnh.',
      'Giá trị nhỏ nhất chính là tung độ đỉnh: k = −4 (đạt được khi x = 3).',
    ],
    docVi: [
      'Hàm đã viết sẵn ở dạng đỉnh — SAT chọn dạng viết theo đúng thứ đề muốn hỏi.',
      'Dạng đỉnh cho biết ngay giá trị nhỏ nhất; dạng nhân tử cho biết ngay nghiệm; dạng tổng quát cho biết ngay giao với trục tung.',
    ],
    trap: 'Trả lời 3 vì lấy hoành độ đỉnh thay vì tung độ đỉnh. Câu hỏi là "minimum value of f", tức giá trị của hàm số, không phải giá trị của x.',
    speedTip:
      'Nhớ quy tắc: SAT viết hàm bậc hai ở dạng nào là đang gợi ý bạn đọc thẳng thông tin từ dạng đó. Không cần khai triển hay đạo hàm.',
    seconds: 45,
  },
  {
    id: 'fs-sat-04',
    blueprintId: 'bp-sat',
    schoolId: 'sat',
    part: 'Advanced Math',
    label: 'Question 4',
    statementEn:
      'A population of bacteria doubles every 4 hours. If the population is 500 at time t = 0, which expression gives the population after t hours?',
    statement:
      'Một quần thể vi khuẩn tăng gấp đôi sau mỗi 4 giờ. Nếu tại thời điểm t = 0 quần thể có 500 cá thể thì biểu thức nào cho số cá thể sau t giờ?',
    choices: ['500 · 2^(t/4)', '500 · 2^(4t)', '500 · 4^t', '500 + 2^(t/4)'],
    correctIndex: 0,
    solution: [
      'Mô hình tăng trưởng theo cấp số nhân có dạng P = P₀ · rⁿ, trong đó n là SỐ CHU KỲ đã trôi qua.',
      'Ở đây hệ số tăng mỗi chu kỳ là r = 2 (gấp đôi) và mỗi chu kỳ dài 4 giờ.',
      'Sau t giờ, số chu kỳ đã trôi qua là n = t/4.',
      'Vậy P = 500 · 2^(t/4).',
      'Kiểm tra: với t = 4 ta được 500 · 2¹ = 1000, đúng là gấp đôi sau 4 giờ ✓.',
    ],
    docVi: [
      '"Doubles every 4 hours" cho cả hệ số tăng (2) lẫn độ dài chu kỳ (4 giờ).',
      'Câu hỏi cho biểu thức theo t tính bằng GIỜ, không phải theo số chu kỳ.',
    ],
    trap: 'Viết 2^(4t) tức đảo ngược chu kỳ, cho kết quả tăng nhanh gấp bội. Đây là phương án nhiễu chính của mọi câu tăng trưởng mũ trong SAT.',
    speedTip:
      'Luôn kiểm tra bằng một giá trị: thay t bằng đúng độ dài một chu kỳ và xem biểu thức có cho đúng hệ số tăng không. Mẹo này loại được ba phương án trong 10 giây.',
    seconds: 60,
  },
  {
    id: 'fs-sat-05',
    blueprintId: 'bp-sat',
    schoolId: 'sat',
    part: 'Problem-Solving and Data Analysis',
    label: 'Question 5',
    statementEn:
      'A recipe requires 3 cups of flour for every 2 cups of sugar. If a baker uses 12 cups of flour, how many cups of sugar are needed?',
    statement:
      'Một công thức làm bánh cần 3 cốc bột cho mỗi 2 cốc đường. Nếu người thợ dùng 12 cốc bột thì cần bao nhiêu cốc đường?',
    choices: ['8', '18', '6', '24'],
    correctIndex: 0,
    solution: [
      'Tỉ lệ bột : đường = 3 : 2, tức tỉ số không đổi.',
      'Lập tỉ lệ thức: 3/2 = 12/x.',
      'Nhân chéo: 3x = 24, suy ra x = 8.',
      'Kiểm tra chiều: dùng nhiều bột hơn thì cần nhiều đường hơn, và 8 > 2 ✓.',
    ],
    docVi: [
      'Cụm "for every" là dấu hiệu chắc chắn của tỉ lệ thuận.',
      'Đề cho ba số và hỏi số thứ tư — cấu trúc chuẩn của tỉ lệ thức.',
    ],
    trap: 'Lập tỉ lệ ngược thành 2/3 = 12/x cho x = 18. Bẫy này bắt được người không kiểm tra chiều của kết quả.',
    speedTip:
      'Viết tỉ lệ thức theo đúng thứ tự chữ trong đề (bột trên, đường dưới ở cả hai vế), rồi kiểm tra chiều bằng một câu: kết quả phải lớn hơn hay nhỏ hơn?',
    seconds: 45,
  },
  {
    id: 'fs-sat-06',
    blueprintId: 'bp-sat',
    schoolId: 'sat',
    part: 'Problem-Solving and Data Analysis',
    label: 'Question 6',
    statementEn:
      'In a survey of 250 students, 40% chose science as their favorite subject. Of those who chose science, 30% were in grade 12. How many surveyed students chose science and were in grade 12?',
    statement:
      'Trong một khảo sát với 250 học sinh, 40% chọn môn Khoa học là môn yêu thích. Trong số những học sinh chọn Khoa học, có 30% học lớp 12. Hỏi có bao nhiêu học sinh vừa chọn Khoa học vừa học lớp 12?',
    choices: ['30', '75', '100', '175'],
    correctIndex: 0,
    solution: [
      'Số học sinh chọn Khoa học: 250 × 40 : 100 = 100 (học sinh).',
      'Trong số 100 học sinh này, 30% học lớp 12: 100 × 30 : 100 = 30 (học sinh).',
      'Lưu ý 30% được tính trên 100 học sinh chọn Khoa học, không phải trên 250 học sinh khảo sát.',
      'Đáp số: 30 học sinh.',
    ],
    docVi: [
      'Cụm "Of those who…" (trong số những người đã…) xác định lại mốc so sánh cho phần trăm thứ hai.',
      'Bài có hai bước với hai mốc khác nhau — cấu trúc lặp lại rất nhiều trong phần dữ liệu của SAT.',
    ],
    trap: 'Lấy 30% của 250 được 75, hoặc cộng 40% + 30% = 70% của 250 được 175. Cả hai phương án đều được cài sẵn.',
    speedTip:
      'Gạch chân cụm "of those" ngay khi đọc. Đây là cụm từ quyết định nhất trong nhóm câu phần trăm nhiều bước của SAT.',
    seconds: 60,
  },
  {
    id: 'fs-sat-07',
    blueprintId: 'bp-sat',
    schoolId: 'sat',
    part: 'Geometry and Trigonometry',
    label: 'Question 7',
    statementEn:
      'A circle in the xy-plane has equation (x − 2)² + (y + 3)² = 25. What are the coordinates of its center and its radius?',
    statement:
      'Trong mặt phẳng toạ độ, một đường tròn có phương trình (x − 2)² + (y + 3)² = 25. Toạ độ tâm và bán kính của đường tròn đó là:',
    choices: [
      'Tâm (2; −3), bán kính 5',
      'Tâm (−2; 3), bán kính 5',
      'Tâm (2; −3), bán kính 25',
      'Tâm (−2; 3), bán kính 25',
    ],
    correctIndex: 0,
    solution: [
      'Phương trình chuẩn của đường tròn: (x − a)² + (y − b)² = R², với tâm I(a; b) và bán kính R.',
      'So sánh: (x − 2)² cho a = 2; (y + 3)² viết lại thành (y − (−3))² nên b = −3.',
      'Vế phải là 25 = R², nên R = 5.',
      'Vậy tâm là (2; −3) và bán kính bằng 5.',
    ],
    docVi: [
      'Phương trình đã ở dạng chuẩn, chỉ cần đọc hệ số — không cần biến đổi.',
      'Dấu cộng trong (y + 3)² là chỗ đề cài bẫy đổi dấu.',
    ],
    trap: 'Lấy thẳng dấu trong ngoặc làm toạ độ tâm, ra (−2; 3); hoặc lấy 25 làm bán kính thay vì bình phương bán kính. Hai bẫy này chiếm cả hai phương án nhiễu còn lại.',
    speedTip:
      'Đọc tâm bằng cách ĐỔI DẤU số trong ngoặc, và bán kính bằng cách LẤY CĂN vế phải. Hai thao tác này gói gọn cả dạng bài.',
    seconds: 45,
  },
  {
    id: 'fs-sat-08',
    blueprintId: 'bp-sat',
    schoolId: 'sat',
    part: 'Geometry and Trigonometry',
    label: 'Question 8',
    statementEn: 'In a right triangle, if sin(A) = 0,6, what is the value of cos(90° − A)?',
    statement: 'Trong một tam giác vuông, nếu sin(A) = 0,6 thì giá trị của cos(90° − A) bằng bao nhiêu?',
    choices: ['0,6', '0,8', '0,4', '1,4'],
    correctIndex: 0,
    solution: [
      'Hai góc A và 90° − A là hai góc phụ nhau.',
      'Với hai góc phụ nhau, ta có cos(90° − A) = sin(A).',
      'Do đó cos(90° − A) = sin(A) = 0,6.',
      'Không cần tính cos(A) — đề không hỏi đại lượng đó.',
    ],
    docVi: [
      'Xuất hiện cụm 90° − A là dấu hiệu tuyệt đối của quan hệ hai góc phụ nhau.',
      'Câu hỏi kiểm tra một hằng đẳng thức, không kiểm tra kỹ năng tính.',
    ],
    trap: 'Tính cos(A) = 0,8 rồi chọn 0,8. Phương án này luôn có mặt và bắt được người bỏ qua dấu trừ trong 90° − A.',
    speedTip:
      'Thuộc hai công thức góc phụ: sin(90° − A) = cos(A) và cos(90° − A) = sin(A). Câu này phải xong trong 15 giây, để dành thời gian cho nhóm dữ liệu.',
    seconds: 30,
  },
];

export const samplesByBlueprint = (blueprintId: string) =>
  FORMAT_SAMPLES.filter((s) => s.blueprintId === blueprintId);

export const sampleStats = () => {
  const byBlueprint = new Map<string, number>();
  for (const s of FORMAT_SAMPLES) byBlueprint.set(s.blueprintId, (byBlueprint.get(s.blueprintId) ?? 0) + 1);
  return {
    total: FORMAT_SAMPLES.length,
    exams: byBlueprint.size,
    seconds: FORMAT_SAMPLES.reduce((a, s) => a + s.seconds, 0),
  };
};
