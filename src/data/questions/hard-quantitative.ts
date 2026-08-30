import { buildQuestions, type QuestionDraft } from './helpers';

/**
 * KHO CAU KHO VA CAU PHAN LOAI — PHAN TOAN
 *
 * Ly do ton tai cua tep nay: kho cau hoi truoc do lech han ve phia de. Chi
 * 12% so cau nam o muc 4-5, trong khi de chuan co 24% — va nguoi nham diem
 * tuyet doi thi phai lam dung DUNG nhung cau do.
 *
 * Mot kho lech ve phia de van dua duoc nguoi hoc len muc 120 diem, nhung
 * khong the dua ai len 150: ho khong co gi de luyen o dung cho quyet dinh.
 *
 * Nguyen tac soan cau muc 4-5, khac han cau muc 1-3:
 *  - Cau kho khong phai cau tinh dai hon, ma cau co THEM MOT BUOC SUY LUAN
 *    ma nguoi lam de bo qua.
 *  - Moi phuong an nhieu phai ung voi mot LOI SUY LUAN CU THE, khong phai
 *    mot con so ngau nhien. Nho vay chua bai la day duoc.
 */

const arithmetic: QuestionDraft[] = [
  {
    id: 'q.ari.h1',
    topicId: 'quantitative.arithmetic',
    difficulty: 4,
    stem: 'Một cửa hàng niêm yết giá một sản phẩm cao hơn giá vốn 60%. Trong đợt khuyến mãi, cửa hàng giảm 25% giá niêm yết mà vẫn lãi 90 nghìn đồng trên mỗi sản phẩm. Giá vốn của sản phẩm là bao nhiêu?',
    choices: ['450 nghìn đồng', '360 nghìn đồng', '600 nghìn đồng', '225 nghìn đồng'],
    answer: 'A',
    explanation:
      'Gọi giá vốn là x. Giá niêm yết là 1,6x, giá bán sau giảm 25% là 0,75 × 1,6x = 1,2x. Lãi là 1,2x − x = 0,2x = 90 nghìn, suy ra x = 450 nghìn đồng.',
    traps: {
      B: 'Lấy 90 chia cho 0,25 — nhầm mức giảm với tỉ lệ lãi trên giá vốn.',
      C: 'Nhầm 90 nghìn là lãi trên giá niêm yết chứ không phải trên giá vốn.',
    },
    skills: ['phần trăm', 'giá vốn giá bán'],
  },
  {
    id: 'q.ari.h2',
    topicId: 'quantitative.arithmetic',
    difficulty: 4,
    stem: 'Ba người cùng làm chung một công việc thì xong trong 4 giờ. Nếu chỉ người thứ nhất và người thứ hai làm thì mất 6 giờ. Nếu chỉ người thứ ba làm một mình thì mất bao lâu?',
    choices: ['12 giờ', '10 giờ', '8 giờ', '2 giờ'],
    answer: 'A',
    explanation:
      'Năng suất chung của ba người là 1/4 công việc mỗi giờ; của hai người đầu là 1/6. Năng suất riêng của người thứ ba là 1/4 − 1/6 = 1/12, nên người đó làm một mình mất 12 giờ.',
    traps: {
      D: 'Lấy 6 − 4 = 2 — trừ thời gian thay vì trừ năng suất. Thời gian không trừ được cho nhau.',
      C: 'Kết quả của việc trừ nhầm ở mẫu số.',
    },
    skills: ['năng suất', 'làm chung làm riêng'],
  },
  {
    id: 'q.ari.h3',
    topicId: 'quantitative.arithmetic',
    difficulty: 5,
    stem: 'Dung dịch A chứa 20% muối, dung dịch B chứa 50% muối. Cần trộn hai dung dịch theo tỉ lệ khối lượng nào để được dung dịch chứa 30% muối?',
    choices: ['2 phần A và 1 phần B', '1 phần A và 2 phần B', '1 phần A và 1 phần B', '3 phần A và 1 phần B'],
    answer: 'A',
    explanation:
      'Gọi khối lượng A là a, B là b. Lượng muối: 0,2a + 0,5b = 0,3(a + b), suy ra 0,2b = 0,1a, tức a = 2b. Vậy tỉ lệ A : B = 2 : 1. Cách kiểm nhanh bằng quy tắc đường chéo: khoảng cách từ 30 tới 20 là 10, tới 50 là 20, nên tỉ lệ là 20 : 10 = 2 : 1 nghiêng về dung dịch loãng.',
    traps: {
      B: 'Đảo ngược tỉ lệ khi dùng quy tắc đường chéo — phần lớn hơn phải thuộc về dung dịch có nồng độ XA mục tiêu hơn.',
      C: 'Trộn đều cho nồng độ 35%, không phải 30%.',
    },
    skills: ['bài toán trộn', 'quy tắc đường chéo'],
  },
  {
    id: 'q.ari.h4',
    topicId: 'quantitative.arithmetic',
    difficulty: 5,
    stem: 'Giá một mặt hàng tăng liên tiếp ba lần, mỗi lần tăng cùng một tỉ lệ phần trăm, thì giá cuối cùng bằng 1,728 lần giá ban đầu. Mỗi lần giá đã tăng bao nhiêu phần trăm?',
    choices: ['20%', '24,3%', '72,8%', '17,28%'],
    answer: 'A',
    explanation:
      'Gọi tỉ lệ tăng mỗi lần là r. Ta có (1 + r)³ = 1,728. Vì 1,2³ = 1,728 nên 1 + r = 1,2, suy ra r = 0,2 tức 20%.',
    traps: {
      C: 'Lấy 1,728 − 1 = 72,8% — đây là mức tăng tổng cộng sau cả ba lần, không phải mức tăng mỗi lần.',
      B: 'Chia 72,8% cho 3 — phần trăm liên tiếp không chia đều được vì đây là phép nhân, không phải phép cộng.',
    },
    skills: ['phần trăm liên tiếp', 'khai căn bậc ba'],
  },
];

const algebra: QuestionDraft[] = [
  {
    id: 'q.alg.h1',
    topicId: 'quantitative.algebra',
    difficulty: 4,
    stem: 'Tìm tất cả giá trị của tham số m để phương trình x² − 2(m + 1)x + m² + 3 = 0 có hai nghiệm phân biệt.',
    choices: ['m > 1', 'm ≥ 1', 'm < 1', 'm ≠ 1'],
    answer: 'A',
    explanation:
      "Phương trình bậc hai có hai nghiệm phân biệt khi Δ' > 0. Ở đây Δ' = (m + 1)² − (m² + 3) = m² + 2m + 1 − m² − 3 = 2m − 2. Điều kiện 2m − 2 > 0 cho m > 1.",
    traps: {
      B: 'Dấu bằng cho nghiệm kép, tức chỉ một nghiệm, nên phải loại.',
      C: 'Đảo chiều bất đẳng thức khi chuyển vế.',
    },
    skills: ['biệt thức', 'điều kiện có nghiệm'],
  },
  {
    id: 'q.alg.h2',
    topicId: 'quantitative.algebra',
    difficulty: 5,
    stem: 'Phương trình x² − 5x + m = 0 có hai nghiệm x₁, x₂ thỏa mãn x₁² + x₂² = 13. Giá trị của m là bao nhiêu?',
    choices: ['6', '19', '−6', '12'],
    answer: 'A',
    explanation:
      'Theo định lý Viète, x₁ + x₂ = 5 và x₁x₂ = m. Ta có x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂ = 25 − 2m = 13, suy ra m = 6. Kiểm lại: Δ = 25 − 24 = 1 > 0 nên phương trình thật sự có hai nghiệm phân biệt.',
    traps: {
      B: 'Quên hệ số 2 trong hằng đẳng thức, dùng (x₁+x₂)² − x₁x₂.',
      C: 'Sai dấu khi chuyển vế.',
    },
    skills: ['định lý Viète', 'biểu thức đối xứng'],
  },
  {
    id: 'q.alg.h3',
    topicId: 'quantitative.algebra',
    difficulty: 5,
    stem: 'Tìm số nghiệm thực của phương trình |x² − 4| = 3.',
    choices: ['4', '2', '3', '1'],
    answer: 'A',
    explanation:
      'Phương trình tách thành hai trường hợp. Với x² − 4 = 3 ta có x² = 7, cho hai nghiệm x = ±√7. Với x² − 4 = −3 ta có x² = 1, cho hai nghiệm x = ±1. Cả bốn giá trị đều thỏa mãn nên phương trình có 4 nghiệm.',
    traps: {
      B: 'Chỉ xét trường hợp biểu thức trong dấu trị tuyệt đối dương, bỏ mất nhánh âm.',
      C: 'Nhầm một nghiệm là nghiệm kép.',
    },
    skills: ['phương trình chứa trị tuyệt đối'],
  },
];

const sequence: QuestionDraft[] = [
  {
    id: 'q.seq.h1',
    topicId: 'quantitative.sequence',
    difficulty: 4,
    stem: 'Một cấp số cộng có số hạng thứ 5 bằng 17 và số hạng thứ 12 bằng 38. Tổng của 20 số hạng đầu tiên bằng bao nhiêu?',
    choices: ['670', '640', '700', '590'],
    answer: 'A',
    explanation:
      'Từ u₁₂ − u₅ = 7d = 38 − 17 = 21 suy ra d = 3. Khi đó u₁ = u₅ − 4d = 17 − 12 = 5. Số hạng thứ 20 là u₂₀ = 5 + 19 × 3 = 62. Tổng S₂₀ = 20 × (5 + 62)/2 = 10 × 67 = 670.',
    traps: {
      B: 'Tính u₁ bằng u₅ − 5d thay vì u₅ − 4d — sai một bước nhảy.',
      C: 'Dùng công thức tổng với số hạng thứ 21.',
    },
    skills: ['cấp số cộng', 'tổng n số hạng'],
  },
  {
    id: 'q.seq.h2',
    topicId: 'quantitative.sequence',
    difficulty: 5,
    stem: 'Ba số x − 1, x + 1 và 2x + 2 theo thứ tự lập thành một cấp số nhân. Giá trị của x là bao nhiêu?',
    choices: ['3', '−1', '3 hoặc −1', '2'],
    answer: 'A',
    explanation:
      'Ba số hạng liên tiếp của cấp số nhân thỏa mãn bình phương số giữa bằng tích hai số kề: (x + 1)² = (x − 1)(2x + 2) = 2(x² − 1). Khai triển: x² + 2x + 1 = 2x² − 2, đưa về x² − 2x − 3 = 0, cho x = 3 hoặc x = −1. Thử lại: x = 3 cho ba số 2, 4, 8 với công bội 2 — hợp lệ. Còn x = −1 cho ba số −2, 0, 0, mà cấp số nhân không được có số hạng bằng 0 nên phải loại. Vậy chỉ x = 3.',
    traps: {
      C: 'Dừng ở nghiệm của phương trình mà không thử lại — x = −1 làm hai số hạng bằng 0, không lập được cấp số nhân.',
      B: 'Chọn đúng nghiệm bị loại.',
    },
    skills: ['cấp số nhân', 'tính chất số hạng giữa', 'thử lại nghiệm'],
  },
  {
    id: 'q.seq.h3',
    topicId: 'quantitative.sequence',
    difficulty: 5,
    stem: 'Một quả bóng rơi từ độ cao 10 m, mỗi lần chạm đất nảy lên bằng 3/5 độ cao lần trước. Tổng quãng đường quả bóng đi được cho tới khi dừng hẳn là bao nhiêu?',
    choices: ['40 m', '25 m', '30 m', '50 m'],
    answer: 'A',
    explanation:
      'Quãng đường gồm lần rơi đầu 10 m, cộng với các đoạn nảy lên rồi rơi xuống. Tổng độ cao các lần nảy là cấp số nhân với số hạng đầu 10 × 3/5 = 6 và công bội 3/5, có tổng bằng 6/(1 − 3/5) = 15. Mỗi độ cao nảy được đi qua hai lần nên đóng góp 2 × 15 = 30 m. Tổng quãng đường là 10 + 30 = 40 m.',
    traps: {
      B: 'Chỉ tính tổng cấp số nhân 10/(1 − 3/5) = 25 mà quên rằng mỗi lần nảy đi qua quãng đường hai lượt.',
      C: 'Quên cộng lần rơi đầu tiên.',
    },
    skills: ['cấp số nhân lùi vô hạn', 'bài toán thực tế'],
  },
];

const geometry: QuestionDraft[] = [
  {
    id: 'q.geo.h1',
    topicId: 'quantitative.geometry',
    difficulty: 4,
    stem: 'Một hình nón có bán kính đáy 3 cm và chiều cao 4 cm. Diện tích toàn phần của hình nón bằng bao nhiêu?',
    choices: ['24π cm²', '15π cm²', '33π cm²', '21π cm²'],
    answer: 'A',
    explanation:
      'Đường sinh l = √(3² + 4²) = 5 cm. Diện tích xung quanh là πrl = π × 3 × 5 = 15π. Diện tích đáy là πr² = 9π. Diện tích toàn phần bằng 15π + 9π = 24π cm².',
    traps: {
      B: 'Chỉ tính diện tích xung quanh, quên cộng đáy.',
      C: 'Dùng chiều cao thay cho đường sinh trong công thức diện tích xung quanh.',
    },
    skills: ['hình nón', 'diện tích toàn phần'],
  },
  {
    id: 'q.geo.h2',
    topicId: 'quantitative.geometry',
    difficulty: 4,
    stem: 'Một hình lăng trụ đứng có đáy là tam giác đều cạnh 4 cm và chiều cao lăng trụ 6 cm. Thể tích khối lăng trụ bằng bao nhiêu?',
    choices: ['24√3 cm³', '8√3 cm³', '48√3 cm³', '12√3 cm³'],
    answer: 'A',
    explanation:
      'Diện tích đáy là tam giác đều cạnh 4: S = 4² × √3/4 = 4√3 cm². Thể tích lăng trụ bằng diện tích đáy nhân chiều cao: V = 4√3 × 6 = 24√3 cm³.',
    traps: {
      B: 'Dùng công thức thể tích chóp, chia thêm cho 3 — lăng trụ không chia.',
      C: 'Nhân đôi diện tích đáy vì nhầm lăng trụ có hai đáy.',
    },
    skills: ['lăng trụ', 'thể tích'],
  },
  {
    id: 'q.geo.h3',
    topicId: 'quantitative.geometry',
    difficulty: 5,
    stem: 'Cho hình lập phương cạnh a. Tính khoảng cách từ một đỉnh của hình lập phương tới đường chéo của khối không đi qua đỉnh đó.',
    choices: ['a√6/3', 'a√2/2', 'a√3/3', 'a√3/2'],
    answer: 'A',
    explanation:
      'Đặt hình lập phương trong hệ tọa độ với A(0;0;0) và đường chéo khối AG có vectơ chỉ phương u = (1;1;1). Xét đỉnh B(a;0;0), ta có AB = (a;0;0). Tích có hướng AB × u = (0; −a; a) có độ dài a√2, còn |u| = √3. Khoảng cách bằng a√2/√3 = a√6/3.',
    traps: {
      D: 'Nhầm với nửa đường chéo của khối lập phương là a√3/2.',
      B: 'Nhầm với nửa đường chéo của một mặt.',
    },
    skills: ['hình lập phương', 'khoảng cách từ điểm tới đường thẳng trong không gian'],
  },
  {
    id: 'q.geo.h4',
    topicId: 'quantitative.geometry',
    difficulty: 5,
    stem: 'Một hình cầu nội tiếp trong một hình lập phương cạnh 6 cm. Tỉ số giữa thể tích hình cầu và thể tích hình lập phương gần nhất với giá trị nào?',
    choices: ['0,52', '0,79', '0,26', '0,67'],
    answer: 'A',
    explanation:
      'Hình cầu nội tiếp có bán kính bằng nửa cạnh, tức 3 cm. Thể tích cầu là (4/3)π × 27 = 36π ≈ 113,1 cm³. Thể tích lập phương là 216 cm³. Tỉ số bằng 113,1/216 ≈ 0,524. Tỉ số này bằng π/6 và không phụ thuộc cạnh.',
    traps: {
      B: 'Dùng tỉ số diện tích của hình tròn nội tiếp hình vuông là π/4 ≈ 0,785 — đó là bài toán hai chiều.',
      C: 'Lấy bán kính bằng cạnh thay vì nửa cạnh rồi chia nhầm.',
    },
    skills: ['hình cầu nội tiếp', 'tỉ số thể tích'],
  },
];

const coordinate: QuestionDraft[] = [
  {
    id: 'q.coo.h1',
    topicId: 'quantitative.coordinate',
    difficulty: 4,
    stem: 'Trong mặt phẳng tọa độ, cho hai điểm A(1; 2) và B(5; 6). Phương trình đường trung trực của đoạn thẳng AB là gì?',
    choices: ['x + y − 7 = 0', 'x − y + 1 = 0', 'x + y − 3 = 0', 'x + y + 7 = 0'],
    answer: 'A',
    explanation:
      'Trung điểm AB là M(3; 4). Vectơ AB = (4; 4), và trung trực vuông góc với AB nên nhận AB làm vectơ pháp tuyến, rút gọn thành (1; 1). Phương trình: 1(x − 3) + 1(y − 4) = 0, tức x + y − 7 = 0.',
    traps: {
      B: 'Dùng AB làm vectơ chỉ phương thay vì pháp tuyến — cho ra đường thẳng AB chứ không phải trung trực.',
      C: 'Dùng nhầm điểm A thay cho trung điểm.',
    },
    skills: ['đường trung trực', 'vectơ pháp tuyến'],
  },
  {
    id: 'q.coo.h2',
    topicId: 'quantitative.coordinate',
    difficulty: 4,
    stem: 'Cho đường tròn (C): (x − 1)² + (y + 2)² = 25 và điểm M(4; 2). Vị trí của M so với đường tròn là gì?',
    choices: ['M nằm trên đường tròn', 'M nằm trong đường tròn', 'M nằm ngoài đường tròn', 'Không xác định được'],
    answer: 'A',
    explanation:
      'Tâm I(1; −2), bán kính R = 5. Khoảng cách IM = √((4−1)² + (2+2)²) = √(9 + 16) = √25 = 5 = R, nên M nằm đúng trên đường tròn.',
    traps: {
      B: 'Sai dấu khi tính hiệu tung độ, lấy 2 − 2 = 0 thay vì 2 − (−2) = 4.',
      C: 'Nhầm bán kính là 25 thay vì 5.',
    },
    skills: ['đường tròn', 'vị trí tương đối điểm và đường tròn'],
  },
  {
    id: 'q.coo.h3',
    topicId: 'quantitative.coordinate',
    difficulty: 4,
    stem: 'Trong không gian Oxyz, cho hai điểm A(1; 0; 2) và B(3; 4; 0). Tọa độ trung điểm của đoạn AB là gì?',
    choices: ['(2; 2; 1)', '(4; 4; 2)', '(1; 2; −1)', '(2; 4; 1)'],
    answer: 'A',
    explanation:
      'Trung điểm có tọa độ bằng trung bình cộng từng thành phần: ((1+3)/2; (0+4)/2; (2+0)/2) = (2; 2; 1).',
    traps: {
      B: 'Cộng tọa độ mà quên chia đôi.',
      C: 'Trừ tọa độ thay vì cộng — đó là công thức vectơ AB.',
    },
    skills: ['tọa độ không gian', 'trung điểm'],
  },
  {
    id: 'q.coo.h4',
    topicId: 'quantitative.coordinate',
    difficulty: 5,
    stem: 'Trong mặt phẳng tọa độ, đường thẳng d: 3x + 4y − 15 = 0 cắt đường tròn tâm O(0; 0) bán kính 5 tại hai điểm. Độ dài dây cung tạo thành bằng bao nhiêu?',
    choices: ['8', '6', '10', '4'],
    answer: 'A',
    explanation:
      'Khoảng cách từ tâm tới đường thẳng là d = |−15|/√(3² + 4²) = 15/5 = 3. Nửa dây cung bằng √(R² − d²) = √(25 − 9) = 4, nên dây cung dài 2 × 4 = 8.',
    traps: {
      D: 'Dừng ở nửa dây cung mà quên nhân đôi.',
      C: 'Nhầm dây cung với đường kính — chỉ đúng khi đường thẳng đi qua tâm.',
    },
    skills: ['dây cung', 'khoảng cách từ điểm tới đường thẳng'],
  },
  {
    id: 'q.coo.h5',
    topicId: 'quantitative.coordinate',
    difficulty: 5,
    stem: 'Trong không gian Oxyz, mặt phẳng (P): 2x − y + 2z − 6 = 0 cắt trục Ox tại điểm nào?',
    choices: ['(3; 0; 0)', '(0; −6; 0)', '(6; 0; 0)', '(0; 0; 3)'],
    answer: 'A',
    explanation:
      'Điểm trên trục Ox có dạng (a; 0; 0). Thay vào phương trình: 2a − 0 + 0 − 6 = 0, suy ra a = 3. Vậy giao điểm là (3; 0; 0).',
    traps: {
      C: 'Quên hệ số 2 của x, lấy thẳng a = 6.',
      D: 'Nhầm trục Ox với trục Oz.',
    },
    skills: ['mặt phẳng trong không gian', 'giao với trục tọa độ'],
  },
];

const calculus: QuestionDraft[] = [
  {
    id: 'q.cal.h1',
    topicId: 'quantitative.calculus',
    difficulty: 4,
    stem: 'Giá trị lớn nhất của hàm số y = x³ − 3x² + 1 trên đoạn [−1; 3] là bao nhiêu?',
    choices: ['1', '−3', '−1', '3'],
    answer: 'A',
    explanation:
      "y' = 3x² − 6x = 0 cho x = 0 hoặc x = 2, cả hai đều thuộc đoạn. Tính giá trị tại bốn điểm: y(−1) = −3, y(0) = 1, y(2) = −3, y(3) = 1. Giá trị lớn nhất là 1.",
    traps: {
      B: 'Nhầm giá trị nhỏ nhất với lớn nhất.',
      D: 'Lấy giá trị của x thay vì giá trị của hàm.',
    },
    skills: ['giá trị lớn nhất trên đoạn', 'khảo sát hàm số'],
  },
  {
    id: 'q.cal.h2',
    topicId: 'quantitative.calculus',
    difficulty: 5,
    stem: 'Tìm tất cả giá trị của m để hàm số y = x³ − 3mx² + 3(m² − 1)x đạt cực đại tại x = 1.',
    choices: ['m = 2', 'm = 0', 'm = 1', 'm = −2'],
    answer: 'A',
    explanation:
      "y' = 3x² − 6mx + 3(m² − 1). Điều kiện cần: y'(1) = 3 − 6m + 3m² − 3 = 3m² − 6m = 3m(m − 2) = 0, cho m = 0 hoặc m = 2. Kiểm điều kiện đủ bằng y'' = 6x − 6m: với m = 2 thì y''(1) = 6 − 12 = −6 < 0 nên đạt cực đại; với m = 0 thì y''(1) = 6 > 0 nên đạt cực tiểu. Vậy m = 2.",
    traps: {
      B: 'Dừng ở điều kiện cần mà không kiểm điều kiện đủ — m = 0 cho cực tiểu chứ không phải cực đại.',
      C: 'Thay nhầm giá trị x vào phương trình.',
    },
    skills: ['cực trị có tham số', 'điều kiện đủ'],
  },
  {
    id: 'q.cal.h3',
    topicId: 'quantitative.calculus',
    difficulty: 5,
    stem: 'Cho hàm số f có đạo hàm f′(x) = x(x − 1)²(x − 2). Hàm số f có bao nhiêu điểm cực trị?',
    choices: ['2', '3', '1', '0'],
    answer: 'A',
    explanation:
      "f′ có ba nghiệm x = 0, x = 1, x = 2. Nhưng x = 1 là nghiệm bội chẵn nên đạo hàm KHÔNG đổi dấu qua đó, không cho cực trị. Chỉ x = 0 và x = 2 là nghiệm bội lẻ, đạo hàm đổi dấu, nên hàm có đúng 2 điểm cực trị.",
    traps: {
      B: 'Đếm số nghiệm của đạo hàm thay vì đếm số lần đạo hàm đổi dấu.',
      C: 'Loại nhầm cả hai nghiệm đơn.',
    },
    skills: ['cực trị', 'nghiệm bội và dấu đạo hàm'],
  },
];

const exponential: QuestionDraft[] = [
  {
    id: 'q.exp.h1',
    topicId: 'quantitative.exponential',
    difficulty: 4,
    stem: 'Cho log₂3 = a. Biểu diễn log₁₂18 theo a.',
    choices: ['(1 + 2a)/(2 + a)', '(2 + a)/(1 + 2a)', '(1 + a)/(2 + a)', '(2a)/(2 + a)'],
    answer: 'A',
    explanation:
      'Đổi về cơ số 2: log₁₂18 = log₂18 / log₂12. Ta có log₂18 = log₂(2 × 9) = 1 + 2log₂3 = 1 + 2a, và log₂12 = log₂(4 × 3) = 2 + a. Vậy kết quả là (1 + 2a)/(2 + a).',
    traps: {
      B: 'Đảo tử và mẫu khi dùng công thức đổi cơ số.',
      C: 'Phân tích 18 = 2 × 9 nhưng quên 9 = 3² nên thiếu hệ số 2.',
    },
    skills: ['đổi cơ số logarit', 'biểu diễn theo tham số'],
  },
  {
    id: 'q.exp.h2',
    topicId: 'quantitative.exponential',
    difficulty: 4,
    stem: 'Giải phương trình 9ˣ − 4·3ˣ + 3 = 0. Tổng các nghiệm bằng bao nhiêu?',
    choices: ['1', '0', '3', '4'],
    answer: 'A',
    explanation:
      'Đặt t = 3ˣ > 0, phương trình thành t² − 4t + 3 = 0 cho t = 1 hoặc t = 3. Với t = 1 thì x = 0; với t = 3 thì x = 1. Tổng hai nghiệm là 0 + 1 = 1.',
    traps: {
      D: 'Lấy tổng các giá trị của t thay vì tổng các nghiệm x.',
      B: 'Chỉ nhận nghiệm t = 1 mà bỏ t = 3.',
    },
    skills: ['đặt ẩn phụ', 'phương trình mũ'],
  },
  {
    id: 'q.exp.h3',
    topicId: 'quantitative.exponential',
    difficulty: 5,
    stem: 'Tập nghiệm của bất phương trình log₀,₅(x − 1) > log₀,₅(3 − x) là gì?',
    choices: ['(1; 2)', '(2; 3)', '(1; 3)', '(−∞; 2)'],
    answer: 'A',
    explanation:
      'Điều kiện: x − 1 > 0 và 3 − x > 0, tức 1 < x < 3. Cơ số 0,5 nhỏ hơn 1 nên hàm nghịch biến, bỏ logarit phải ĐẢO chiều: x − 1 < 3 − x, suy ra 2x < 4, tức x < 2. Kết hợp điều kiện được tập nghiệm (1; 2).',
    traps: {
      B: 'Giữ nguyên chiều bất đẳng thức khi bỏ logarit cơ số nhỏ hơn 1.',
      D: 'Quên điều kiện xác định nên để lọt cả phần x ≤ 1.',
    },
    skills: ['bất phương trình logarit', 'cơ số nhỏ hơn 1'],
  },
  {
    id: 'q.exp.h4',
    topicId: 'quantitative.exponential',
    difficulty: 5,
    stem: 'Một chất phóng xạ có chu kỳ bán rã 5 năm. Sau bao nhiêu năm thì khối lượng chất còn lại bằng 10% khối lượng ban đầu?',
    choices: ['khoảng 16,6 năm', 'khoảng 50 năm', 'khoảng 25 năm', 'khoảng 33,2 năm'],
    answer: 'A',
    explanation:
      'Khối lượng còn lại sau t năm là m₀ × (1/2)^(t/5). Đặt bằng 0,1m₀: (1/2)^(t/5) = 0,1, lấy logarit hai vế cho (t/5)·log(0,5) = log(0,1), suy ra t/5 = log(0,1)/log(0,5) ≈ 3,32, tức t ≈ 16,6 năm.',
    traps: {
      B: 'Nhân chu kỳ với 10 vì nhầm "còn 10%" với "trải qua 10 chu kỳ".',
      C: 'Nhân chu kỳ với 5.',
    },
    skills: ['phóng xạ', 'phương trình mũ thực tế'],
  },
];

const combinatorics: QuestionDraft[] = [
  {
    id: 'q.com.h1',
    topicId: 'quantitative.combinatorics',
    difficulty: 4,
    stem: 'Có bao nhiêu cách xếp 5 học sinh vào một hàng ngang sao cho hai học sinh A và B luôn đứng cạnh nhau?',
    choices: ['48', '24', '120', '96'],
    answer: 'A',
    explanation:
      'Coi A và B là một khối duy nhất, ta có 4 đối tượng cần xếp, cho 4! = 24 cách. Trong khối, A và B có thể đổi chỗ cho nhau, cho 2 cách. Tổng cộng 24 × 2 = 48 cách.',
    traps: {
      B: 'Quên nhân 2 cho việc A và B đổi chỗ trong khối.',
      C: 'Tính 5! tức bỏ qua hoàn toàn ràng buộc.',
    },
    skills: ['hoán vị có ràng buộc', 'phương pháp buộc'],
  },
  {
    id: 'q.com.h2',
    topicId: 'quantitative.combinatorics',
    difficulty: 5,
    stem: 'Một hộp có 5 bi đỏ và 4 bi xanh. Lấy ngẫu nhiên lần lượt 2 bi không hoàn lại. Xác suất để bi thứ hai là bi đỏ bằng bao nhiêu?',
    choices: ['5/9', '4/9', '5/8', '20/72'],
    answer: 'A',
    explanation:
      'Tính theo hai trường hợp của bi thứ nhất: đỏ rồi đỏ là (5/9)(4/8) = 20/72; xanh rồi đỏ là (4/9)(5/8) = 20/72. Cộng lại được 40/72 = 5/9. Kết quả này bằng đúng xác suất bi thứ nhất là đỏ — một tính chất đẹp của phép lấy không hoàn lại.',
    traps: {
      C: 'Chỉ tính nhánh thứ nhất là đỏ rồi lấy 4/8 hoặc 5/8, bỏ mất nhánh còn lại.',
      D: 'Dừng ở một nhánh mà không cộng hai trường hợp.',
    },
    skills: ['xác suất có điều kiện', 'công thức xác suất toàn phần'],
  },
  {
    id: 'q.com.h3',
    topicId: 'quantitative.combinatorics',
    difficulty: 5,
    stem: 'Từ các chữ số 0, 1, 2, 3, 4, 5 lập được bao nhiêu số tự nhiên có 3 chữ số đôi một khác nhau và chia hết cho 5?',
    choices: ['36', '40', '20', '25'],
    answer: 'A',
    explanation:
      'Chia hai trường hợp theo chữ số tận cùng. Nếu tận cùng là 0: hai vị trí còn lại chọn từ 5 chữ số, có 5 × 4 = 20 số. Nếu tận cùng là 5: chữ số hàng trăm không được là 0 nên có 4 lựa chọn, hàng chục còn 4 lựa chọn, cho 4 × 4 = 16 số. Tổng cộng 20 + 16 = 36 số.',
    traps: {
      B: 'Không loại trường hợp chữ số 0 đứng đầu ở nhánh tận cùng bằng 5.',
      C: 'Chỉ xét một trong hai trường hợp tận cùng.',
    },
    skills: ['đếm số có điều kiện chia hết', 'ràng buộc chữ số đầu'],
  },
];

const statistics: QuestionDraft[] = [
  {
    id: 'q.sta.h1',
    topicId: 'quantitative.statistics',
    difficulty: 4,
    stem: 'Một mẫu số liệu có 5 giá trị: 2, 4, 4, 6, 9. Phương sai của mẫu bằng bao nhiêu?',
    choices: ['5,6', '5', '2,37', '28'],
    answer: 'A',
    explanation:
      'Trung bình là (2 + 4 + 4 + 6 + 9)/5 = 5. Các độ lệch so với trung bình là −3, −1, −1, 1, 4; bình phương lên được 9, 1, 1, 1, 16 với tổng bằng 28. Phương sai bằng 28/5 = 5,6.',
    traps: {
      D: 'Dừng ở tổng bình phương độ lệch, quên chia cho số phần tử.',
      C: 'Lấy độ lệch chuẩn √5,6 ≈ 2,37 thay vì phương sai.',
      B: 'Nhầm phương sai với giá trị trung bình.',
    },
    skills: ['phương sai', 'độ lệch chuẩn'],
  },
  {
    id: 'q.sta.h2',
    topicId: 'quantitative.statistics',
    difficulty: 5,
    stem: 'Điểm trung bình của một lớp 40 học sinh là 6,5. Nếu bỏ đi 5 học sinh có điểm trung bình 4,5 thì điểm trung bình của 35 học sinh còn lại là bao nhiêu?',
    choices: ['khoảng 6,79', 'khoảng 6,50', 'khoảng 7,00', 'khoảng 6,20'],
    answer: 'A',
    explanation:
      'Tổng điểm cả lớp là 40 × 6,5 = 260. Tổng điểm 5 học sinh bị bỏ là 5 × 4,5 = 22,5. Tổng còn lại là 237,5, chia cho 35 được khoảng 6,79.',
    traps: {
      B: 'Cho rằng bỏ bớt học sinh không làm đổi trung bình.',
      D: 'Trừ nhầm chiều, nghĩ bỏ học sinh yếu thì trung bình giảm.',
    },
    skills: ['trung bình có trọng số', 'bài toán tổng'],
  },
  {
    id: 'q.sta.h3',
    topicId: 'quantitative.statistics',
    difficulty: 5,
    stem: 'Một mẫu số liệu gồm 8 giá trị đã sắp xếp tăng dần. Trung vị của mẫu được xác định thế nào?',
    choices: [
      'Trung bình cộng của giá trị thứ 4 và thứ 5',
      'Giá trị thứ 4',
      'Giá trị thứ 5',
      'Trung bình cộng của tất cả các giá trị',
    ],
    answer: 'A',
    explanation:
      'Với mẫu có số phần tử chẵn, trung vị là trung bình cộng của hai giá trị ở giữa, tức giá trị thứ n/2 và thứ n/2 + 1. Với n = 8 đó là giá trị thứ 4 và thứ 5.',
    traps: {
      B: 'Lấy giá trị thứ n/2 mà không lấy trung bình với giá trị kế tiếp.',
      D: 'Nhầm trung vị với trung bình cộng — hai chỉ số khác nhau.',
    },
    skills: ['trung vị', 'mẫu có số phần tử chẵn'],
  },
];

export const HARD_QUANTITATIVE = buildQuestions('quantitative', undefined, [
  ...arithmetic,
  ...algebra,
  ...sequence,
  ...geometry,
  ...coordinate,
  ...calculus,
  ...exponential,
  ...combinatorics,
  ...statistics,
]);
