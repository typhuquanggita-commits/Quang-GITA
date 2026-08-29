import type { ExamPaper, PaperItem } from '@/types';

/** Rút gọn khai báo cho 12 câu trắc nghiệm nhiều lựa chọn của Phần I. */
function mcq(
  n: number,
  o: Omit<PaperItem, 'id' | 'label' | 'points' | 'minutes' | 'format'> & { minutes?: number },
): PaperItem {
  const { minutes = 2, ...rest } = o;
  return { id: `tn01-p1-c${n}`, label: `Câu ${n}`, points: 0.25, minutes, format: 'trac-nghiem', ...rest };
}

/**
 * ĐỀ MẪU 04 — Toán kỳ thi tốt nghiệp THPT, định dạng từ 2025.
 * Bám sát ma trận bp-tn-thpt: 3 phần · 22 câu · 90 phút · thang 10, có điểm luỹ tiến ở Phần II.
 */
export const PAPER_TN_THPT_01: ExamPaper = {
  id: 'dm-tn-thpt-01',
  code: 'M365-QG-DM04',
  blueprintId: 'bp-tn-thpt',
  schoolId: 'tn-thpt',
  track: 'thpt-qg',
  title: 'Đề mẫu 04 · Toán tốt nghiệp THPT',
  subtitle: 'Định dạng 3 phần · 22 câu · 90 phút — mục tiêu 9+',
  minutes: 90,
  totalPoints: 10,
  fidelity: [
    'Phần I — đúng 12 câu trắc nghiệm nhiều lựa chọn, mỗi câu 0,25đ, tổng 3,0đ; phần lớn ở mức nhận biết – thông hiểu.',
    'Phần II — đúng 4 câu trắc nghiệm đúng/sai, mỗi câu 4 ý, tổng 4,0đ, tính điểm luỹ tiến 0,10 – 0,25 – 0,50 – 1,00.',
    'Phần III — đúng 6 câu trả lời ngắn, mỗi câu 0,5đ, tổng 3,0đ, phần lớn gắn với tình huống thực tế cần mô hình hoá.',
    'Phủ đúng bốn mảng trọng tâm ma trận nêu: đạo hàm và ứng dụng, nguyên hàm – tích phân, toạ độ Oxyz, thống kê – xác suất; có thêm cấp số cộng, mũ – lôgarit và hình học không gian.',
    'Thời lượng gợi ý 22 + 33 + 28 + 7 phút = 90 phút, khớp cột “minutes” của ma trận.',
    'Mỗi câu đều kèm lời giải từng bước, barem theo thang điểm của phần tương ứng, và bảng phân tích dạng bài.',
  ],
  parts: [
    {
      label: 'Phần I · Trắc nghiệm nhiều lựa chọn',
      points: 3,
      note: '12 câu · mỗi câu 0,25 điểm · chọn một phương án đúng. Đây là 3,0 điểm phải lấy trọn.',
      items: [
        mcq(1, {
          strand: 'giai-tich',
          level: 1,
          topicIds: ['q12-khao-sat-ham-so'],
          statement: 'Hàm số y = x³ − 3x² + 2 nghịch biến trên khoảng nào dưới đây?',
          choices: ['(−∞; 0)', '(0; 2)', '(2; +∞)', '(−∞; 2)'],
          correctIndex: 1,
          answer: '(0; 2)',
          solution: [
            "y′ = 3x² − 6x = 3x(x − 2).",
            "y′ < 0 ⟺ 3x(x − 2) < 0 ⟺ 0 < x < 2.",
            'Vậy hàm số nghịch biến trên khoảng (0; 2).',
          ],
          barem: [{ item: 'Chọn đúng phương án B', point: 0.25 }],
          analysis: {
            dang: 'Xét tính đơn điệu của hàm đa thức bậc ba',
            knowledge: [
              'Hàm số nghịch biến trên khoảng mà đạo hàm âm trên khoảng đó.',
              'Đạo hàm của xⁿ là n·xⁿ⁻¹.',
              'Xét dấu tam thức bậc hai: trong khoảng hai nghiệm thì trái dấu hệ số a.',
            ],
            docVi: [
              'Từ khoá “nghịch biến/đồng biến” + hàm đa thức cho sẵn → tính đạo hàm và xét dấu, không cần lập bảng biến thiên đầy đủ.',
              'Bốn phương án đều là khoảng có đầu mút 0 và 2 → đó chính là hai nghiệm của y′.',
            ],
            method: [
              'Bước 1: tính y′.',
              'Bước 2: phân tích y′ thành nhân tử để tìm nghiệm.',
              'Bước 3: xét dấu y′ theo quy tắc “trong trái ngoài cùng”.',
              'Bước 4: đọc đúng khoảng mà y′ < 0.',
            ],
            traps: [
              'Nhầm chiều: chọn khoảng y′ > 0 (đồng biến).',
              'Chọn (−∞; 2) vì nghĩ hàm nghịch biến từ đầu tới 2.',
              'Đạo hàm sai hệ số: viết y′ = 3x² − 3x.',
            ],
            tips: [
              'Hệ số a > 0 nên y′ là parabol quay lên: âm giữa hai nghiệm. Nhớ một câu này là xong mọi bài bậc ba.',
              'Mục tiêu dưới 90 giây cho câu này.',
            ],
            transfer: 'Biến thể: hỏi số điểm cực trị, hỏi khoảng đồng biến, hỏi giá trị cực đại — cùng một bước tính y′.',
          },
        }),
        mcq(2, {
          strand: 'giai-tich',
          level: 1,
          topicIds: ['q11-day-so'],
          statement: 'Cho cấp số cộng (uₙ) có số hạng đầu u₁ = 3 và công sai d = 2. Giá trị của u₁₀ bằng',
          choices: ['19', '21', '23', '30'],
          correctIndex: 1,
          answer: '21',
          solution: ['Công thức số hạng tổng quát: uₙ = u₁ + (n − 1)d.', 'u₁₀ = 3 + (10 − 1)·2 = 3 + 18 = 21.'],
          barem: [{ item: 'Chọn đúng phương án B', point: 0.25 }],
          analysis: {
            dang: 'Số hạng tổng quát của cấp số cộng',
            knowledge: [
              'Cấp số cộng: uₙ = u₁ + (n − 1)d.',
              'Tổng n số hạng đầu: Sₙ = n(u₁ + uₙ)/2.',
              'Cấp số nhân: uₙ = u₁·qⁿ⁻¹.',
            ],
            docVi: [
              'Đề cho u₁ và d, hỏi một số hạng cụ thể → thay thẳng vào công thức, không có bẫy khái niệm.',
              'Phương án 23 chính là kết quả nếu dùng nhầm n thay cho n − 1 — đó là bẫy được cài sẵn.',
            ],
            method: ['Bước 1: viết công thức uₙ = u₁ + (n − 1)d.', 'Bước 2: thay n = 10, u₁ = 3, d = 2.', 'Bước 3: tính và đối chiếu phương án.'],
            traps: [
              'Dùng u₁ + n·d = 3 + 20 = 23 — bẫy phổ biến nhất.',
              'Nhầm sang công thức cấp số nhân.',
              'Nhầm d với tỉ số q.',
            ],
            tips: ['Viết ra “(n − 1)” trước rồi mới thay số — thói quen này loại bỏ hoàn toàn bẫy trên.', 'Dưới 60 giây.'],
            transfer: 'Biến thể: cho u₃ và u₇ tìm d; tính tổng 20 số hạng đầu; nhận biết dãy có phải cấp số cộng hay không.',
          },
        }),
        mcq(3, {
          strand: 'giai-tich',
          level: 1,
          topicIds: ['q12-khao-sat-ham-so'],
          statement: 'Tiệm cận ngang của đồ thị hàm số y = (2x − 1)/(x + 3) là đường thẳng',
          choices: ['x = −3', 'y = 2', 'y = −1/3', 'y = −3'],
          correctIndex: 1,
          answer: 'y = 2',
          solution: [
            'Với hàm phân thức bậc nhất trên bậc nhất y = (ax + b)/(cx + d), tiệm cận ngang là y = a/c.',
            'Ở đây a = 2, c = 1 nên tiệm cận ngang là y = 2.',
            'Kiểm chứng: lim khi x → ±∞ của (2x − 1)/(x + 3) = 2.',
          ],
          barem: [{ item: 'Chọn đúng phương án B', point: 0.25 }],
          analysis: {
            dang: 'Tiệm cận của đồ thị hàm phân thức bậc nhất trên bậc nhất',
            knowledge: [
              'Tiệm cận ngang: y = a/c. Tiệm cận đứng: x = −d/c.',
              'Giao với trục tung: y = b/d. Giao với trục hoành: x = −b/a.',
            ],
            docVi: [
              'Hàm phân thức bậc nhất trên bậc nhất → có đúng một tiệm cận ngang và một tiệm cận đứng.',
              'Phương án x = −3 là tiệm cận đứng — bẫy dành cho người đọc lướt chữ “ngang”.',
              'Phương án y = −1/3 là giao điểm với trục tung.',
            ],
            method: ['Bước 1: xác định đề hỏi tiệm cận ngang hay đứng.', 'Bước 2: lấy tỉ số hai hệ số của x.', 'Bước 3: đối chiếu phương án.'],
            traps: ['Chọn tiệm cận đứng x = −3.', 'Lấy tỉ số hệ số tự do (−1/3).', 'Đảo ngược tỉ số thành y = 1/2.'],
            tips: ['Gạch chân chữ “ngang” hoặc “đứng” trong đề ngay khi đọc.', 'Dưới 45 giây.'],
            transfer: 'Biến thể: đếm số tiệm cận của hàm có căn hoặc hàm phân thức bậc hai trên bậc nhất (khi đó có tiệm cận xiên).',
          },
        }),
        mcq(4, {
          strand: 'giai-tich',
          level: 2,
          topicIds: ['q12-nguyen-ham-tich-phan'],
          statement:
            'Cho ∫ từ 0 đến 1 của f(x)dx = 3 và ∫ từ 0 đến 1 của g(x)dx = −2. Giá trị của ∫ từ 0 đến 1 của [f(x) + 2g(x)]dx bằng',
          choices: ['−1', '1', '7', '−7'],
          correctIndex: 0,
          answer: '−1',
          solution: [
            'Tích phân có tính chất tuyến tính: ∫[f + 2g] = ∫f + 2∫g.',
            '= 3 + 2·(−2) = 3 − 4 = −1.',
          ],
          barem: [{ item: 'Chọn đúng phương án A', point: 0.25 }],
          analysis: {
            dang: 'Tính chất tuyến tính của tích phân',
            knowledge: [
              '∫[αf(x) + βg(x)]dx = α∫f(x)dx + β∫g(x)dx trên cùng một đoạn.',
              'Tính cộng theo đoạn: ∫ từ a đến c = ∫ từ a đến b + ∫ từ b đến c.',
              'Đổi cận đổi dấu: ∫ từ a đến b = −∫ từ b đến a.',
            ],
            docVi: [
              'Đề cho sẵn giá trị hai tích phân trên cùng một đoạn và hỏi tích phân của tổ hợp tuyến tính → chỉ cần thay số.',
              'Không có hàm cụ thể nào được cho → chắc chắn không phải bài tính tích phân, mà là bài dùng tính chất.',
            ],
            method: ['Bước 1: tách tích phân theo tính chất tuyến tính.', 'Bước 2: đưa hệ số ra ngoài.', 'Bước 3: thay số và tính.'],
            traps: [
              'Quên nhân hệ số 2 vào ∫g, tính 3 − 2 = 1.',
              'Nhầm dấu của ∫g, tính 3 + 4 = 7.',
              'Nhân hệ số 2 vào cả hai tích phân.',
            ],
            tips: ['Viết hẳn dòng “= ∫f + 2∫g” trước khi thay số — hai giây đó loại bỏ mọi bẫy dấu.', 'Dưới 60 giây.'],
            transfer: 'Biến thể: cho ∫ trên [0;2] và [0;1], hỏi ∫ trên [1;2]; cho ∫f và hỏi ∫f(2x) sau khi đổi biến.',
          },
        }),
        mcq(5, {
          strand: 'toa-do',
          level: 2,
          topicIds: ['q12-oxyz'],
          statement:
            'Trong không gian Oxyz, mặt cầu (S): x² + y² + z² − 2x + 4y − 6z − 2 = 0 có bán kính bằng',
          choices: ['2', '4', '√14', '16'],
          correctIndex: 1,
          answer: '4',
          solution: [
            'Phương trình mặt cầu dạng x² + y² + z² − 2ax − 2by − 2cz + d = 0 có tâm I(a; b; c) và R = √(a² + b² + c² − d).',
            'Ở đây −2a = −2 nên a = 1; −2b = 4 nên b = −2; −2c = −6 nên c = 3; d = −2.',
            'R = √(1² + (−2)² + 3² − (−2)) = √(1 + 4 + 9 + 2) = √16 = 4.',
          ],
          barem: [{ item: 'Chọn đúng phương án B', point: 0.25 }],
          analysis: {
            dang: 'Xác định tâm và bán kính mặt cầu từ phương trình tổng quát',
            knowledge: [
              'Mặt cầu tâm I(a; b; c), bán kính R: (x − a)² + (y − b)² + (z − c)² = R².',
              'Dạng khai triển: x² + y² + z² − 2ax − 2by − 2cz + d = 0 với R = √(a² + b² + c² − d).',
              'Điều kiện để là mặt cầu: a² + b² + c² − d > 0.',
            ],
            docVi: [
              'Phương trình có đủ x², y², z² hệ số 1 và các số hạng bậc nhất → dạng khai triển của mặt cầu.',
              'Phương án √14 chính là kết quả nếu quên đổi dấu d — bẫy chính của câu.',
            ],
            method: [
              'Bước 1: đọc a, b, c bằng cách chia đôi và đổi dấu hệ số bậc nhất.',
              'Bước 2: đọc d là số hạng tự do, giữ nguyên dấu.',
              'Bước 3: thay vào công thức R = √(a² + b² + c² − d).',
              'Bước 4: rút gọn căn.',
            ],
            traps: [
              'Quên dấu trừ trước d: tính √(1 + 4 + 9 − 2) = √12.',
              'Nhầm dấu của tâm: lấy I(−1; 2; −3).',
              'Trả lời 16 (đó là R², không phải R).',
            ],
            tips: [
              'Viết ba dòng a = 1, b = −2, c = 3, d = −2 tách bạch rồi mới thay — đây là câu mất điểm vì cẩu thả chứ không vì khó.',
              'Kiểm tra nhanh: R phải là số dương; nếu ra căn của số âm thì đã sai dấu ở đâu đó.',
            ],
            transfer: 'Biến thể: tìm m để phương trình là mặt cầu; viết phương trình mặt cầu qua bốn điểm; tính khoảng cách từ tâm tới mặt phẳng.',
          },
        }),
        mcq(6, {
          strand: 'giai-tich',
          level: 1,
          topicIds: ['q12-nguyen-ham-tich-phan'],
          statement: 'Họ nguyên hàm của hàm số f(x) = e^{2x} là',
          choices: ['e^{2x} + C', '2e^{2x} + C', '(1/2)e^{2x} + C', 'e^{2x}/(2x) + C'],
          correctIndex: 2,
          answer: '(1/2)e^{2x} + C',
          solution: [
            'Công thức: ∫e^{ax}dx = (1/a)e^{ax} + C với a ≠ 0.',
            'Với a = 2: ∫e^{2x}dx = (1/2)e^{2x} + C.',
            'Kiểm chứng bằng đạo hàm: [(1/2)e^{2x}]′ = (1/2)·2·e^{2x} = e^{2x} ✓.',
          ],
          barem: [{ item: 'Chọn đúng phương án C', point: 0.25 }],
          analysis: {
            dang: 'Nguyên hàm của hàm hợp dạng mũ',
            knowledge: [
              '∫e^{ax}dx = (1/a)e^{ax} + C; ∫a^x dx = a^x/ln a + C.',
              '∫sin(ax)dx = −(1/a)cos(ax) + C; ∫1/(ax + b)dx = (1/a)ln|ax + b| + C.',
              'Nguyên hàm luôn phải có hằng số C.',
            ],
            docVi: [
              'Hàm hợp với phần trong là ax → hệ số 1/a xuất hiện ở nguyên hàm (ngược với đạo hàm nhân thêm a).',
              'Phương án 2e^{2x} là kết quả nếu nhầm chiều đạo hàm – nguyên hàm.',
            ],
            method: ['Bước 1: nhận dạng hàm hợp e^{ax}.', 'Bước 2: áp dụng công thức, chia cho a.', 'Bước 3: kiểm chứng bằng cách lấy đạo hàm ngược lại.'],
            traps: ['Nhân với 2 thay vì chia cho 2.', 'Quên hằng số C.', 'Áp dụng nhầm công thức của x^n.'],
            tips: [
              'Luật chung: đạo hàm thì nhân hệ số trong, nguyên hàm thì chia hệ số trong. Một câu nhớ cho cả họ công thức.',
              'Luôn thử ngược bằng đạo hàm — mất 10 giây và loại bỏ hoàn toàn khả năng sai.',
            ],
            transfer: 'Biến thể: ∫e^{3x+1}dx, ∫cos(2x)dx, ∫1/(2x + 1)dx — cùng một luật chia hệ số trong.',
          },
        }),
        mcq(7, {
          strand: 'hinh-khong-gian',
          level: 2,
          topicIds: ['q11-hinh-khong-gian'],
          statement:
            'Cho hình chóp S.ABCD có đáy ABCD là hình vuông cạnh a, SA vuông góc với mặt phẳng đáy và SA = a√6. Góc giữa đường thẳng SC và mặt phẳng (ABCD) bằng',
          choices: ['30°', '45°', '60°', '90°'],
          correctIndex: 2,
          answer: '60°',
          solution: [
            'Vì SA ⊥ (ABCD) nên A là hình chiếu vuông góc của S lên mặt phẳng đáy.',
            'Do đó AC là hình chiếu của SC lên (ABCD), và góc giữa SC và (ABCD) là góc ∠SCA.',
            'Hình vuông cạnh a có đường chéo AC = a√2.',
            'Tam giác SAC vuông tại A nên tan∠SCA = SA/AC = a√6/(a√2) = √3.',
            'Suy ra ∠SCA = 60°.',
          ],
          barem: [{ item: 'Chọn đúng phương án C', point: 0.25 }],
          analysis: {
            dang: 'Góc giữa đường thẳng và mặt phẳng trong hình chóp có cạnh bên vuông góc đáy',
            knowledge: [
              'Góc giữa đường thẳng và mặt phẳng là góc giữa đường thẳng đó và hình chiếu của nó lên mặt phẳng.',
              'Nếu SA ⊥ (P) thì A là hình chiếu của S; hình chiếu của SM là AM với mọi M thuộc (P).',
              'Đường chéo hình vuông cạnh a bằng a√2.',
              'Tỉ số lượng giác trong tam giác vuông.',
            ],
            docVi: [
              'Giả thiết “SA ⊥ (ABCD)” là chìa khoá: mọi góc giữa cạnh bên và đáy đều quy về tam giác vuông tại A.',
              'Đề hỏi góc giữa SC và đáy → hình chiếu của C là chính nó, hình chiếu của S là A, nên góc cần tìm là ∠SCA.',
              'Số liệu a√6 và a√2 cho tỉ số √3 — được thiết kế để ra góc đẹp 60°.',
            ],
            method: [
              'Bước 1: xác định hình chiếu của điểm đầu mút không nằm trên mặt phẳng.',
              'Bước 2: gọi tên góc cần tìm theo đúng ba đỉnh.',
              'Bước 3: tính hai cạnh của tam giác vuông chứa góc đó.',
              'Bước 4: dùng tan (hoặc sin, cos) rồi tra góc.',
            ],
            traps: [
              'Lấy nhầm góc ∠SCB hoặc ∠SCD thay vì ∠SCA.',
              'Dùng cạnh AB = a thay vì đường chéo AC = a√2.',
              'Tính tan = AC/SA (đảo ngược) ra 30°.',
            ],
            tips: [
              'Quy tắc một dòng: “Góc giữa cạnh bên và đáy = góc tại chân cạnh bên trong tam giác vuông chứa đường cao.”',
              'Vẽ riêng tam giác SAC ra bên cạnh, ghi hai cạnh — nhìn hình phẳng bao giờ cũng chắc hơn nhìn hình không gian.',
            ],
            transfer: 'Biến thể: góc giữa SB và đáy (dùng AB), góc giữa SC và mặt (SAB), khoảng cách từ A đến (SBC), thể tích khối chóp.',
          },
        }),
        mcq(8, {
          strand: 'giai-tich',
          level: 2,
          topicIds: ['q11-mu-logarit'],
          statement: 'Tập nghiệm của bất phương trình log₂(x − 1) < 3 là',
          choices: ['(−∞; 9)', '(1; 9)', '(1; 8)', '(1; +∞)'],
          correctIndex: 1,
          answer: '(1; 9)',
          solution: [
            'Điều kiện: x − 1 > 0 ⟺ x > 1.',
            'Vì cơ số 2 > 1 nên hàm lôgarit đồng biến: log₂(x − 1) < 3 ⟺ x − 1 < 2³ = 8.',
            'Suy ra x < 9.',
            'Kết hợp với điều kiện: 1 < x < 9.',
            'Vậy tập nghiệm là khoảng (1; 9).',
          ],
          barem: [{ item: 'Chọn đúng phương án B', point: 0.25 }],
          analysis: {
            dang: 'Bất phương trình lôgarit cơ bản',
            knowledge: [
              'Điều kiện xác định của log_a(u) là u > 0 (và 0 < a ≠ 1).',
              'Cơ số a > 1: log_a u < b ⟺ 0 < u < a^b (giữ chiều).',
              'Cơ số 0 < a < 1: đổi chiều bất đẳng thức.',
            ],
            docVi: [
              'Cơ số là 2 > 1 → giữ nguyên chiều bất đẳng thức khi bỏ lôgarit.',
              'Phương án (−∞; 9) là bẫy dành cho người quên điều kiện xác định.',
              'Phương án (1; 8) là bẫy dành cho người quên cộng 1 khi trả biến.',
            ],
            method: [
              'Bước 1: viết điều kiện xác định trước tiên.',
              'Bước 2: kiểm tra cơ số lớn hơn hay nhỏ hơn 1 để quyết định chiều.',
              'Bước 3: mũ hoá hai vế, giải bất phương trình đại số.',
              'Bước 4: giao với điều kiện và viết tập nghiệm.',
            ],
            traps: [
              'Quên điều kiện x > 1.',
              'Giải ra x − 1 < 8 rồi kết luận luôn x < 8.',
              'Đổi chiều bất đẳng thức dù cơ số lớn hơn 1.',
            ],
            tips: [
              'Luôn viết điều kiện xác định thành một dòng riêng trước khi biến đổi. Với bất phương trình lôgarit, đó là nơi mất điểm số một.',
              'Thử một giá trị trong tập nghiệm: x = 5 cho log₂4 = 2 < 3 ✓.',
            ],
            transfer: 'Biến thể: cơ số 0 < a < 1 (đổi chiều); log₂(x−1) + log₂(x+1) < 3 (thêm điều kiện và dùng công thức tổng); bất phương trình mũ.',
          },
        }),
        mcq(9, {
          strand: 'xac-suat',
          level: 2,
          topicIds: ['q11-xac-suat'],
          statement:
            'Một hộp có 5 viên bi đỏ và 4 viên bi xanh, các viên bi đôi một khác nhau. Lấy ngẫu nhiên đồng thời 2 viên bi. Xác suất để lấy được 2 viên bi cùng màu bằng',
          choices: ['5/9', '4/9', '1/2', '5/18'],
          correctIndex: 1,
          answer: '4/9',
          solution: [
            'Số phần tử của không gian mẫu: C(9; 2) = 36.',
            'Số cách lấy 2 bi đỏ: C(5; 2) = 10. Số cách lấy 2 bi xanh: C(4; 2) = 6.',
            'Số cách lấy 2 bi cùng màu: 10 + 6 = 16.',
            'Xác suất: 16/36 = 4/9.',
          ],
          barem: [{ item: 'Chọn đúng phương án B', point: 0.25 }],
          analysis: {
            dang: 'Xác suất cổ điển với biến cố “cùng loại”',
            knowledge: [
              'Xác suất cổ điển: P(A) = n(A)/n(Ω).',
              'Tổ hợp chập k của n: C(n; k) = n!/[k!(n − k)!]; dùng khi lấy đồng thời, không xét thứ tự.',
              'Quy tắc cộng cho các trường hợp rời nhau.',
            ],
            docVi: [
              'Cụm “lấy ngẫu nhiên đồng thời” → dùng tổ hợp, không dùng chỉnh hợp.',
              'Biến cố “cùng màu” tách được thành hai trường hợp rời nhau → quy tắc cộng.',
              'Phương án 5/9 chính là xác suất “khác màu” (20/36) — bẫy dành cho người tính nhầm biến cố đối.',
            ],
            method: [
              'Bước 1: tính n(Ω) bằng tổ hợp.',
              'Bước 2: chia biến cố thành các trường hợp rời nhau.',
              'Bước 3: đếm từng trường hợp rồi cộng lại.',
              'Bước 4: rút gọn phân số.',
            ],
            traps: [
              'Dùng chỉnh hợp A(9; 2) = 72 vì tưởng có thứ tự.',
              'Nhân hai trường hợp thay vì cộng.',
              'Tính C(5; 2) = 20 (nhầm với chỉnh hợp).',
            ],
            tips: [
              'Kiểm tra chéo bằng biến cố đối: khác màu có 5 · 4 = 20 cách, 20/36 = 5/9, và 4/9 + 5/9 = 1 ✓. Cách kiểm tra này gần như luôn dùng được.',
              'Ghi rõ n(Ω) và n(A) thành hai dòng — đề trắc nghiệm vẫn nên viết ra nháp có tổ chức.',
            ],
            transfer: 'Biến thể: lấy 3 viên, lấy lần lượt có hoàn lại, hỏi xác suất có ít nhất một viên đỏ (dùng biến cố đối).',
          },
        }),
        mcq(10, {
          strand: 'toa-do',
          level: 1,
          topicIds: ['q12-oxyz'],
          statement:
            'Trong không gian Oxyz, cho hai điểm A(1; 2; −1) và B(3; 0; 3). Toạ độ trung điểm I của đoạn thẳng AB là',
          choices: ['I(2; 1; 1)', 'I(4; 2; 2)', 'I(2; −2; 4)', 'I(1; −1; 2)'],
          correctIndex: 0,
          answer: 'I(2; 1; 1)',
          solution: [
            'Trung điểm I của AB có toạ độ là trung bình cộng toạ độ hai đầu mút.',
            'x_I = (1 + 3)/2 = 2; y_I = (2 + 0)/2 = 1; z_I = (−1 + 3)/2 = 1.',
            'Vậy I(2; 1; 1).',
          ],
          barem: [{ item: 'Chọn đúng phương án A', point: 0.25 }],
          analysis: {
            dang: 'Trung điểm đoạn thẳng trong không gian toạ độ',
            knowledge: [
              'Trung điểm: I((x_A + x_B)/2; (y_A + y_B)/2; (z_A + z_B)/2).',
              'Vectơ AB = (x_B − x_A; y_B − y_A; z_B − z_A).',
              'Trọng tâm tam giác: trung bình cộng toạ độ ba đỉnh.',
            ],
            docVi: [
              'Phương án I(4; 2; 2) là tổng toạ độ chưa chia 2 — bẫy cho người làm vội.',
              'Phương án I(1; −1; 2) chính là nửa vectơ AB — bẫy cho người nhầm trung điểm với vectơ.',
            ],
            method: ['Bước 1: viết công thức trung điểm.', 'Bước 2: cộng từng thành phần rồi chia 2.', 'Bước 3: đối chiếu phương án.'],
            traps: ['Trừ thay vì cộng (nhầm sang công thức vectơ).', 'Quên chia 2.', 'Sai dấu ở thành phần z (−1 + 3 = 2, không phải 4).'],
            tips: ['Câu cho điểm — dưới 40 giây. Nhưng vẫn phải viết ra nháp ba phép tính, đừng nhẩm hết trong đầu.'],
            transfer: 'Biến thể: tìm điểm đối xứng của A qua B; tìm trọng tâm tam giác; tìm điểm chia đoạn theo tỉ số cho trước.',
          },
        }),
        mcq(11, {
          strand: 'xac-suat',
          level: 2,
          topicIds: ['q12-thong-ke'],
          statement:
            'Khảo sát thời gian tự học trong ngày (đơn vị: phút) của 50 học sinh, thu được mẫu số liệu ghép nhóm sau:\n[0; 10): 5 học sinh — [10; 20): 12 học sinh — [20; 30): 18 học sinh — [30; 40): 10 học sinh — [40; 50): 5 học sinh.\nNhóm chứa trung vị của mẫu số liệu trên là',
          choices: ['[10; 20)', '[20; 30)', '[30; 40)', '[0; 10)'],
          correctIndex: 1,
          answer: '[20; 30)',
          minutes: 3,
          solution: [
            'Cỡ mẫu n = 5 + 12 + 18 + 10 + 5 = 50, do đó n/2 = 25.',
            'Lập tần số tích luỹ: đến hết [0; 10) là 5; đến hết [10; 20) là 17; đến hết [20; 30) là 35.',
            'Giá trị 25 nằm giữa 17 và 35, nên nhóm chứa trung vị là nhóm [20; 30).',
          ],
          barem: [{ item: 'Chọn đúng phương án B', point: 0.25 }],
          analysis: {
            dang: 'Xác định nhóm chứa trung vị của mẫu số liệu ghép nhóm',
            knowledge: [
              'Nhóm chứa trung vị là nhóm đầu tiên có tần số tích luỹ ≥ n/2.',
              'Công thức trung vị ghép nhóm: Me = a_m + [(n/2 − cf)/f_m]·h.',
              'Nhóm chứa mốt là nhóm có tần số lớn nhất.',
            ],
            docVi: [
              'Đề chỉ hỏi “nhóm chứa trung vị” chứ không hỏi giá trị trung vị → chỉ cần tần số tích luỹ, không cần công thức.',
              'Nhóm [20; 30) đồng thời cũng là nhóm có tần số lớn nhất (nhóm chứa mốt) — hai khái niệm khác nhau nhưng ở đề này trùng nhau, đừng vì thế mà lẫn lộn.',
            ],
            method: [
              'Bước 1: tính cỡ mẫu n.',
              'Bước 2: tính n/2.',
              'Bước 3: cộng dồn tần số theo thứ tự nhóm.',
              'Bước 4: chọn nhóm đầu tiên có tần số tích luỹ đạt hoặc vượt n/2.',
            ],
            traps: [
              'Chọn nhóm có tần số lớn nhất mà không kiểm tra tần số tích luỹ — đúng ở đề này nhưng sai ở phần lớn đề khác.',
              'Cộng dồn nhầm: 5 + 12 = 17 chứ không phải 12.',
              'Dùng (n + 1)/2 như với mẫu số liệu không ghép nhóm.',
            ],
            tips: [
              'Kẻ thêm một cột “tần số tích luỹ” ngay bên cạnh bảng — thao tác 20 giây này phục vụ cả câu trung vị, tứ phân vị lẫn phần trăm.',
              'Thống kê ghép nhóm là nội dung mới và xuất hiện chắc chắn trong đề; đừng bỏ qua vì tưởng dễ.',
            ],
            transfer: 'Biến thể: tính giá trị trung vị, tứ phân vị thứ nhất, mốt, số trung bình, phương sai của mẫu ghép nhóm.',
          },
        }),
        mcq(12, {
          strand: 'giai-tich',
          level: 2,
          topicIds: ['q12-khao-sat-ham-so'],
          statement: 'Giá trị lớn nhất của hàm số f(x) = x³ − 3x + 1 trên đoạn [0; 2] bằng',
          choices: ['1', '−1', '3', '2'],
          correctIndex: 2,
          answer: '3',
          minutes: 3,
          solution: [
            "f′(x) = 3x² − 3 = 3(x − 1)(x + 1).",
            "f′(x) = 0 ⟺ x = 1 hoặc x = −1; chỉ có x = 1 thuộc đoạn [0; 2].",
            'Tính giá trị tại các điểm: f(0) = 1; f(1) = 1 − 3 + 1 = −1; f(2) = 8 − 6 + 1 = 3.',
            'So sánh ba giá trị: lớn nhất là 3.',
            'Vậy giá trị lớn nhất của f trên [0; 2] bằng 3, đạt tại x = 2.',
          ],
          barem: [{ item: 'Chọn đúng phương án C', point: 0.25 }],
          analysis: {
            dang: 'Giá trị lớn nhất – nhỏ nhất của hàm số trên một đoạn',
            knowledge: [
              'Trên đoạn [a; b], giá trị lớn nhất/nhỏ nhất của hàm liên tục đạt tại điểm tới hạn trong đoạn hoặc tại hai đầu mút.',
              'Điểm tới hạn: nơi f′ = 0 hoặc f′ không xác định.',
              'Phải loại các nghiệm của f′ nằm ngoài đoạn đang xét.',
            ],
            docVi: [
              'Có chữ “trên đoạn [a; b]” → dùng quy trình ba bước: giải f′ = 0, lọc nghiệm trong đoạn, so sánh giá trị tại các điểm và hai đầu mút.',
              'Phương án −1 là giá trị nhỏ nhất — bẫy dành cho người đọc lướt “lớn nhất”.',
              'Phương án 1 là f(0), bẫy cho người quên tính f(2).',
            ],
            method: [
              'Bước 1: tính f′ và giải f′ = 0.',
              'Bước 2: loại các nghiệm không thuộc đoạn.',
              'Bước 3: tính giá trị hàm tại các nghiệm còn lại và tại hai đầu mút.',
              'Bước 4: so sánh và kết luận.',
            ],
            traps: [
              'Quên loại x = −1 rồi tính f(−1) = 3 và vô tình vẫn ra 3 — đúng số nhưng sai lập luận, ở câu tự luận sẽ mất điểm.',
              'Chỉ tính tại điểm tới hạn mà quên hai đầu mút.',
              'Trả lời giá trị nhỏ nhất.',
            ],
            tips: [
              'Luôn lập bảng ba dòng: x | thuộc đoạn? | f(x). Bảng này khiến việc quên đầu mút gần như không thể xảy ra.',
              'Gạch chân chữ “lớn nhất” hoặc “nhỏ nhất” trong đề.',
            ],
            transfer: 'Biến thể: tìm m để giá trị lớn nhất bằng một số cho trước; bài toán tối ưu thực tế (tìm kích thước để chi phí nhỏ nhất).',
          },
        }),
      ],
    },
    {
      label: 'Phần II · Trắc nghiệm đúng/sai',
      points: 4,
      note:
        '4 câu · mỗi câu 4 ý · điểm luỹ tiến trong từng câu: đúng 1 ý được 0,10 — 2 ý được 0,25 — 3 ý được 0,50 — 4 ý được 1,00.',
      items: [
        {
          id: 'tn01-p2-c1',
          label: 'Phần II · Câu 1',
          points: 1,
          minutes: 8,
          strand: 'giai-tich',
          level: 3,
          format: 'dung-sai',
          topicIds: ['q12-khao-sat-ham-so'],
          statement: 'Cho hàm số f(x) = x³ − 3x² + 1 có đồ thị (C).',
          claims: [
            {
              text: "f′(x) = 3x² − 6x.",
              value: true,
              why: "Đạo hàm từng hạng tử: (x³)′ = 3x², (−3x²)′ = −6x, (1)′ = 0. Vậy f′(x) = 3x² − 6x.",
            },
            {
              text: 'Hàm số đạt cực đại tại x = 0.',
              value: true,
              why:
                "f′(x) = 3x(x − 2) đổi dấu từ dương sang âm khi x đi qua 0 (với x < 0 thì f′ > 0, với 0 < x < 2 thì f′ < 0), nên x = 0 là điểm cực đại.",
            },
            {
              text: 'Giá trị cực tiểu của hàm số bằng −3.',
              value: true,
              why:
                'Điểm cực tiểu là x = 2 (f′ đổi dấu từ âm sang dương). Giá trị cực tiểu là f(2) = 8 − 12 + 1 = −3.',
            },
            {
              text: 'Đồ thị (C) cắt trục hoành tại đúng hai điểm.',
              value: false,
              why:
                'Giá trị cực đại f(0) = 1 > 0 và giá trị cực tiểu f(2) = −3 < 0, tích của chúng âm nên phương trình f(x) = 0 có đúng ba nghiệm phân biệt. Vậy (C) cắt trục hoành tại ba điểm, không phải hai.',
            },
          ],
          answer: 'a) Đúng — b) Đúng — c) Đúng — d) Sai',
          solution: [
            "Tính đạo hàm: f′(x) = 3x² − 6x = 3x(x − 2). Vậy ý a) đúng.",
            "f′(x) = 0 ⟺ x = 0 hoặc x = 2.",
            'Xét dấu f′: với x < 0 thì f′ > 0; với 0 < x < 2 thì f′ < 0; với x > 2 thì f′ > 0.',
            'Do f′ đổi dấu từ dương sang âm tại x = 0 nên đây là điểm cực đại. Ý b) đúng.',
            'Do f′ đổi dấu từ âm sang dương tại x = 2 nên đây là điểm cực tiểu, với f(2) = 8 − 12 + 1 = −3. Ý c) đúng.',
            'Số giao điểm với trục hoành: hàm bậc ba có hai cực trị, và f(0)·f(2) = 1·(−3) = −3 < 0 nên phương trình f(x) = 0 có ba nghiệm phân biệt.',
            'Kiểm chứng bằng đổi dấu: f(−1) = −3 < 0, f(0) = 1 > 0, f(1) = −1 < 0, f(3) = 1 > 0 — có ba lần đổi dấu, tức ba nghiệm.',
            'Vậy ý d) sai.',
          ],
          barem: [
            { item: 'Đúng 1 ý', point: 0.1 },
            { item: 'Đúng 2 ý', point: 0.25 },
            { item: 'Đúng 3 ý', point: 0.5 },
            { item: 'Đúng cả 4 ý', point: 1 },
          ],
          analysis: {
            dang: 'Khảo sát hàm bậc ba: đạo hàm, cực trị, số giao điểm với trục hoành',
            knowledge: [
              'Quy tắc tính đạo hàm của đa thức.',
              'Điểm cực đại: f′ đổi dấu từ + sang −. Điểm cực tiểu: f′ đổi dấu từ − sang +.',
              'Phân biệt “điểm cực trị” (giá trị của x) với “giá trị cực trị” (giá trị của y).',
              'Số nghiệm của hàm bậc ba: ba nghiệm phân biệt ⟺ f_CĐ · f_CT < 0.',
            ],
            docVi: [
              'Bốn ý được sắp theo độ khó tăng dần: đạo hàm → cực trị → giá trị cực trị → số giao điểm. Đây là kết cấu chuẩn của Phần II.',
              'Ý d thường là ý “đắt” nhất — cũng là ý hay bị đánh sai nhất, vì cần một bước suy luận thêm.',
              'Bước từ 3 ý lên 4 ý đáng 0,50 điểm, gấp đôi bước từ 2 lên 3 — nếu đã chắc ba ý, hãy dành thêm một phút cho ý còn lại.',
            ],
            method: [
              'Bước 1: tính f′ một lần, dùng cho cả bốn ý.',
              'Bước 2: lập bảng biến thiên đầy đủ ra nháp.',
              'Bước 3: đọc từng ý và đối chiếu với bảng biến thiên, không suy luận rời rạc.',
              'Bước 4: với ý về số giao điểm, dùng tích hai giá trị cực trị.',
            ],
            traps: [
              'Nhầm điểm cực trị với giá trị cực trị: trả lời “giá trị cực tiểu bằng 2”.',
              'Kết luận cực đại/cực tiểu bằng cách nhìn hệ số a mà không xét dấu f′.',
              'Ý d: đếm số giao điểm bằng cảm tính. Hãy dùng tiêu chuẩn f_CĐ · f_CT < 0 hoặc thử bốn giá trị để đếm số lần đổi dấu.',
              'Bỏ trống một ý — mỗi ý là một mệnh đề độc lập, bỏ trống chắc chắn mất điểm, đánh thì còn 50% cơ hội.',
            ],
            tips: [
              'Lập bảng biến thiên một lần rồi trả lời cả bốn ý — nhanh hơn nhiều so với xử lí từng ý riêng lẻ.',
              'Không bao giờ bỏ trống ý nào ở Phần II.',
              'Đọc kỹ phần dẫn chung ở đầu câu; nhiều ý sai chỉ vì đọc lướt hàm số.',
            ],
            transfer:
              'Biến thể: cho bảng biến thiên và hỏi bốn mệnh đề; cho đồ thị và hỏi khoảng đồng biến, số nghiệm của f(x) = m; hàm trùng phương.',
          },
        },
        {
          id: 'tn01-p2-c2',
          label: 'Phần II · Câu 2',
          points: 1,
          minutes: 8,
          strand: 'toa-do',
          level: 3,
          format: 'dung-sai',
          topicIds: ['q12-oxyz'],
          statement:
            'Trong không gian Oxyz, cho hai điểm A(1; 0; 2), B(3; 2; 0) và mặt phẳng (P): x + y + z − 4 = 0.',
          claims: [
            { text: 'Vectơ AB có toạ độ (2; 2; −2).', value: true, why: 'AB = (3 − 1; 2 − 0; 0 − 2) = (2; 2; −2).' },
            {
              text: 'Đường thẳng AB vuông góc với mặt phẳng (P).',
              value: false,
              why:
                'Vectơ pháp tuyến của (P) là n = (1; 1; 1). Đường thẳng AB vuông góc với (P) khi AB cùng phương với n, tức 2/1 = 2/1 = −2/1 — điều này sai ở thành phần thứ ba. Vậy AB không vuông góc với (P).',
            },
            {
              text: 'Điểm A thuộc mặt phẳng (P).',
              value: false,
              why: 'Thay A vào vế trái: 1 + 0 + 2 − 4 = −1 ≠ 0, nên A không thuộc (P).',
            },
            {
              text: 'Khoảng cách từ điểm B đến mặt phẳng (P) bằng √3/3.',
              value: true,
              why:
                'd(B, (P)) = |3 + 2 + 0 − 4|/√(1² + 1² + 1²) = 1/√3 = √3/3.',
            },
          ],
          answer: 'a) Đúng — b) Sai — c) Sai — d) Đúng',
          solution: [
            'Ý a: AB = (3 − 1; 2 − 0; 0 − 2) = (2; 2; −2). Đúng.',
            'Ý b: vectơ pháp tuyến của (P) là n = (1; 1; 1). Nếu AB ⊥ (P) thì AB phải cùng phương với n.',
            'Xét tỉ số: 2/1 = 2, 2/1 = 2 nhưng −2/1 = −2 ≠ 2, nên AB không cùng phương với n. Sai.',
            'Ý c: thay toạ độ A(1; 0; 2) vào vế trái phương trình (P): 1 + 0 + 2 − 4 = −1 ≠ 0. Vậy A không thuộc (P). Sai.',
            'Ý d: d(B, (P)) = |3 + 2 + 0 − 4| / √(1² + 1² + 1²) = 1/√3.',
            'Trục căn thức ở mẫu: 1/√3 = √3/3. Đúng.',
          ],
          barem: [
            { item: 'Đúng 1 ý', point: 0.1 },
            { item: 'Đúng 2 ý', point: 0.25 },
            { item: 'Đúng 3 ý', point: 0.5 },
            { item: 'Đúng cả 4 ý', point: 1 },
          ],
          analysis: {
            dang: 'Tổng hợp toạ độ trong không gian: vectơ, quan hệ vuông góc, thuộc mặt phẳng, khoảng cách',
            knowledge: [
              'Vectơ AB = (x_B − x_A; y_B − y_A; z_B − z_A).',
              'Mặt phẳng Ax + By + Cz + D = 0 có vectơ pháp tuyến n = (A; B; C).',
              'Đường thẳng ⊥ mặt phẳng ⟺ vectơ chỉ phương cùng phương với vectơ pháp tuyến.',
              'Điểm thuộc mặt phẳng ⟺ thay toạ độ vào vế trái được 0.',
              'Khoảng cách: d(M, (P)) = |Ax₀ + By₀ + Cz₀ + D|/√(A² + B² + C²).',
            ],
            docVi: [
              'Một câu Phần II thường gom bốn kỹ năng khác nhau của cùng một chủ đề — ở đây là bốn kỹ năng cơ bản nhất của Oxyz.',
              'Mỗi ý chỉ cần một phép tính ngắn; điều quyết định là làm cẩn thận, không phải làm khó.',
              'Ý d cố tình cho đáp án ở dạng đã trục căn (√3/3) — nếu tính ra 1/√3 mà vội kết luận “sai” là mất điểm oan.',
            ],
            method: [
              'Bước 1: đọc phần dẫn chung, ghi ra nháp toạ độ A, B và vectơ pháp tuyến n.',
              'Bước 2: tính AB một lần.',
              'Bước 3: xử lí từng ý bằng đúng một công thức, ghi kết quả trung gian ra nháp.',
              'Bước 4: với các ý so sánh giá trị, quy về cùng dạng (trục căn thức) trước khi so sánh.',
            ],
            traps: [
              'Tính AB ngược chiều: (−2; −2; 2).',
              'Nhầm “vuông góc” với “song song”: AB ∥ (P) khi AB · n = 0, còn AB ⊥ (P) khi AB cùng phương n. Ở đây AB · n = 2 + 2 − 2 = 2 ≠ 0 nên AB cũng không song song với (P).',
              'Quên lấy giá trị tuyệt đối ở tử của công thức khoảng cách.',
              'Kết luận 1/√3 ≠ √3/3 do không trục căn thức.',
            ],
            tips: [
              'Ghi vectơ pháp tuyến n = (1; 1; 1) ra lề ngay khi đọc phần dẫn — ba trong bốn ý đều dùng tới nó.',
              'Với mọi kết quả chứa căn ở mẫu, hãy trục căn ngay để so sánh được với phương án.',
              'Phần II là 4,0 điểm — phần nặng nhất của đề. Dành đúng 8 phút mỗi câu và không bỏ trống ý nào.',
            ],
            transfer:
              'Biến thể: viết phương trình mặt phẳng qua A và vuông góc AB; tìm hình chiếu của A lên (P); tìm điểm đối xứng của B qua (P); viết phương trình mặt cầu tâm B tiếp xúc (P).',
          },
        },
        {
          id: 'tn01-p2-c3',
          label: 'Phần II · Câu 3',
          points: 1,
          minutes: 8,
          strand: 'giai-tich',
          level: 3,
          format: 'dung-sai',
          topicIds: ['q12-nguyen-ham-tich-phan', 'q11-dao-ham'],
          statement:
            'Một vật chuyển động thẳng với vận tốc v(t) = 3t² + 2t (m/s), trong đó t là thời gian tính bằng giây kể từ lúc bắt đầu chuyển động (t ≥ 0).',
          claims: [
            {
              text: 'Gia tốc của vật tại thời điểm t = 1 giây bằng 8 m/s².',
              value: true,
              why: "a(t) = v′(t) = 6t + 2, do đó a(1) = 6 + 2 = 8 (m/s²).",
            },
            {
              text: 'Quãng đường vật đi được trong 2 giây đầu bằng 12 m.',
              value: true,
              why:
                'Quãng đường bằng tích phân của vận tốc: ∫ từ 0 đến 2 của (3t² + 2t)dt = [t³ + t²] từ 0 đến 2 = 8 + 4 = 12 (m).',
            },
            {
              text: 'Vận tốc của vật tại thời điểm t = 3 giây bằng 30 m/s.',
              value: false,
              why: 'v(3) = 3·9 + 2·3 = 27 + 6 = 33 (m/s), không phải 30 m/s.',
            },
            {
              text: 'Quãng đường vật đi được từ giây thứ 2 đến giây thứ 4 bằng 68 m.',
              value: true,
              why:
                '∫ từ 2 đến 4 của (3t² + 2t)dt = [t³ + t²] từ 2 đến 4 = (64 + 16) − (8 + 4) = 80 − 12 = 68 (m).',
            },
          ],
          answer: 'a) Đúng — b) Đúng — c) Sai — d) Đúng',
          solution: [
            "Ý a: gia tốc là đạo hàm của vận tốc, a(t) = v′(t) = 6t + 2. Tại t = 1: a(1) = 8 m/s². Đúng.",
            'Ý b: quãng đường là tích phân của vận tốc (vì v(t) ≥ 0 với mọi t ≥ 0).',
            'Nguyên hàm của 3t² + 2t là t³ + t².',
            'S = [t³ + t²] từ 0 đến 2 = (8 + 4) − 0 = 12 m. Đúng.',
            'Ý c: v(3) = 3·3² + 2·3 = 27 + 6 = 33 m/s ≠ 30 m/s. Sai.',
            'Ý d: S = [t³ + t²] từ 2 đến 4 = (4³ + 4²) − (2³ + 2²) = (64 + 16) − (8 + 4) = 68 m. Đúng.',
          ],
          barem: [
            { item: 'Đúng 1 ý', point: 0.1 },
            { item: 'Đúng 2 ý', point: 0.25 },
            { item: 'Đúng 3 ý', point: 0.5 },
            { item: 'Đúng cả 4 ý', point: 1 },
          ],
          analysis: {
            dang: 'Ứng dụng đạo hàm – tích phân vào chuyển động thẳng',
            knowledge: [
              'Quan hệ ba đại lượng: s(t) → v(t) = s′(t) → a(t) = v′(t); ngược lại v = ∫a dt, s = ∫v dt.',
              'Quãng đường đi được từ t₁ đến t₂ bằng ∫|v(t)|dt; khi v(t) ≥ 0 thì bằng ∫v(t)dt.',
              'Công thức Newton–Leibniz: ∫ từ a đến b của f = F(b) − F(a).',
            ],
            docVi: [
              'Cụm “vận tốc v(t)” + hỏi gia tốc → đạo hàm. Cụm “vận tốc v(t)” + hỏi quãng đường → tích phân. Đây là hai chiều ngược nhau, đừng lẫn.',
              '“Trong 2 giây đầu” nghĩa là từ 0 đến 2; “từ giây thứ 2 đến giây thứ 4” nghĩa là từ 2 đến 4 — hai cận khác nhau.',
              'v(t) = 3t² + 2t ≥ 0 với mọi t ≥ 0 nên không cần xét dấu để lấy trị tuyệt đối.',
            ],
            method: [
              'Bước 1: xác định mỗi ý hỏi đạo hàm hay tích phân.',
              'Bước 2: tính một lần v′(t) và một lần nguyên hàm của v(t), dùng lại cho mọi ý.',
              'Bước 3: đọc kỹ cận thời gian trong từng ý.',
              'Bước 4: thay số cẩn thận, ghi đơn vị.',
            ],
            traps: [
              'Nhầm chiều: lấy tích phân để tính gia tốc.',
              'Hiểu “từ giây thứ 2 đến giây thứ 4” thành từ 0 đến 4.',
              'Tính v(3) nhầm thành 3·3 + 2·3 = 15 (quên bình phương).',
              'Quên thay cận dưới khi dùng công thức Newton–Leibniz.',
            ],
            tips: [
              'Viết một sơ đồ nhỏ ra nháp: s ←∫— v ←∫— a và s —′→ v —′→ a. Nhìn sơ đồ là không bao giờ nhầm chiều.',
              'Tính sẵn nguyên hàm F(t) = t³ + t² rồi lập bảng F(0), F(2), F(4) — trả lời cả hai ý tích phân trong 30 giây.',
            ],
            transfer:
              'Biến thể: cho gia tốc tìm vận tốc và quãng đường; bài toán vật chuyển động rồi hãm phanh (v đổi dấu, phải lấy trị tuyệt đối); bài toán lượng nước chảy vào bể.',
          },
        },
        {
          id: 'tn01-p2-c4',
          label: 'Phần II · Câu 4',
          points: 1,
          minutes: 9,
          strand: 'xac-suat',
          level: 3,
          format: 'dung-sai',
          topicIds: ['q12-xac-suat-co-dieu-kien', 'q11-xac-suat'],
          statement:
            'Một lớp có 30 học sinh, trong đó có 18 học sinh thích môn Toán, 15 học sinh thích môn Vật lí và 8 học sinh thích cả hai môn. Chọn ngẫu nhiên một học sinh của lớp.',
          claims: [
            {
              text: 'Số học sinh thích ít nhất một trong hai môn là 25.',
              value: true,
              why: 'Theo công thức bao hàm – loại trừ: 18 + 15 − 8 = 25 học sinh.',
            },
            {
              text: 'Xác suất chọn được học sinh thích môn Toán bằng 0,6.',
              value: true,
              why: 'P(Toán) = 18/30 = 0,6.',
            },
            {
              text: 'Xác suất chọn được học sinh không thích cả hai môn bằng 1/6.',
              value: true,
              why: 'Số học sinh không thích môn nào là 30 − 25 = 5, nên xác suất bằng 5/30 = 1/6.',
            },
            {
              text: 'Biết học sinh được chọn thích môn Toán, xác suất học sinh đó cũng thích môn Vật lí bằng 8/15.',
              value: false,
              why:
                'Đây là xác suất có điều kiện: P(Lí | Toán) = P(Lí ∩ Toán)/P(Toán) = (8/30)/(18/30) = 8/18 = 4/9, không phải 8/15. Giá trị 8/15 là P(Toán | Lí).',
            },
          ],
          answer: 'a) Đúng — b) Đúng — c) Đúng — d) Sai',
          solution: [
            'Gọi T là biến cố “thích môn Toán”, L là biến cố “thích môn Vật lí”.',
            'Ý a: số học sinh thích ít nhất một môn = |T| + |L| − |T ∩ L| = 18 + 15 − 8 = 25. Đúng.',
            'Ý b: P(T) = 18/30 = 3/5 = 0,6. Đúng.',
            'Ý c: số học sinh không thích môn nào = 30 − 25 = 5, nên xác suất bằng 5/30 = 1/6. Đúng.',
            'Ý d: xác suất có điều kiện P(L | T) = P(L ∩ T)/P(T).',
            'P(L ∩ T) = 8/30 và P(T) = 18/30, do đó P(L | T) = 8/18 = 4/9.',
            'Giá trị 8/15 chính là P(T | L) — đảo ngược điều kiện. Vậy ý d sai.',
          ],
          barem: [
            { item: 'Đúng 1 ý', point: 0.1 },
            { item: 'Đúng 2 ý', point: 0.25 },
            { item: 'Đúng 3 ý', point: 0.5 },
            { item: 'Đúng cả 4 ý', point: 1 },
          ],
          analysis: {
            dang: 'Xác suất có điều kiện và công thức bao hàm – loại trừ',
            knowledge: [
              'Công thức bao hàm – loại trừ: |A ∪ B| = |A| + |B| − |A ∩ B|.',
              'Xác suất có điều kiện: P(A | B) = P(A ∩ B)/P(B), với P(B) > 0.',
              'P(A | B) và P(B | A) nói chung khác nhau.',
              'Xác suất biến cố đối: P(Ā) = 1 − P(A).',
            ],
            docVi: [
              'Cụm “Biết rằng … , xác suất …” là dấu hiệu tuyệt đối của xác suất có điều kiện.',
              'Điều kiện nằm sau chữ “biết” chính là mẫu số của phân số. Ở đây “biết thích Toán” nên mẫu là 18.',
              'Đề cố tình đưa 8/15 làm phương án — đó là kết quả khi đảo ngược điều kiện, bẫy phổ biến nhất của nội dung này.',
            ],
            method: [
              'Bước 1: đặt tên biến cố và vẽ biểu đồ Ven với ba miền: chỉ T (10), cả hai (8), chỉ L (7), ngoài (5).',
              'Bước 2: điền số vào biểu đồ trước, mọi ý sau đó chỉ là đọc số.',
              'Bước 3: với ý có điều kiện, xác định mẫu số là nhóm được “biết trước”.',
              'Bước 4: rút gọn phân số và so với phương án.',
            ],
            traps: [
              'Cộng 18 + 15 = 33 rồi kết luận có 33 học sinh thích ít nhất một môn — quên trừ phần giao (và 33 > 30 là vô lí).',
              'Đảo ngược xác suất có điều kiện.',
              'Lấy 8/30 làm P(L | T) — nhầm xác suất giao với xác suất có điều kiện.',
              'Tính số học sinh chỉ thích Toán là 18 thay vì 18 − 8 = 10.',
            ],
            tips: [
              'Vẽ biểu đồ Ven và điền đủ bốn miền (10 | 8 | 7 | 5, tổng 30) ngay sau khi đọc phần dẫn. Bốn con số này trả lời được mọi ý.',
              'Câu tự kiểm cho xác suất có điều kiện: “Mẫu số là nhóm nào?” — nhóm nằm sau chữ “biết”.',
              'Xác suất có điều kiện là nội dung mới của chương trình lớp 12 và xuất hiện chắc chắn trong đề — đừng bỏ qua.',
            ],
            transfer:
              'Biến thể: công thức xác suất toàn phần, công thức Bayes, sơ đồ hình cây với hai giai đoạn, bài toán xét nghiệm y tế.',
          },
        },
      ],
    },
    {
      label: 'Phần III · Trả lời ngắn',
      points: 3,
      note:
        '6 câu · mỗi câu 0,5 điểm · tự tính và điền đáp số, không có phương án lựa chọn. Rủi ro cao nhất toàn đề: sai là mất trọn 0,5đ.',
      items: [
        {
          id: 'tn01-p3-c1',
          label: 'Phần III · Câu 1',
          points: 0.5,
          minutes: 4,
          strand: 'giai-tich',
          level: 2,
          format: 'tra-loi-ngan',
          topicIds: ['q12-khao-sat-ham-so'],
          statement:
            'Cho hàm số f(x) = x³ − 6x² + 9x. Gọi x₁, x₂ là hai điểm cực trị của hàm số. Tính x₁ + x₂.',
          answer: '4',
          solution: [
            "f′(x) = 3x² − 12x + 9 = 3(x² − 4x + 3) = 3(x − 1)(x − 3).",
            "f′(x) = 0 ⟺ x = 1 hoặc x = 3; f′ đổi dấu tại cả hai điểm nên đây đúng là hai điểm cực trị.",
            'x₁ + x₂ = 1 + 3 = 4.',
            'Cách nhanh: theo Viète, tổng hai nghiệm của 3x² − 12x + 9 = 0 bằng 12/3 = 4.',
          ],
          barem: [{ item: 'Điền đúng đáp số 4', point: 0.5 }],
          analysis: {
            dang: 'Điểm cực trị của hàm bậc ba — dùng Viète cho phương trình đạo hàm',
            knowledge: [
              'Điểm cực trị của hàm bậc ba là nghiệm của f′(x) = 0 (khi f′ đổi dấu).',
              'Viète: tổng hai nghiệm của ax² + bx + c = 0 bằng −b/a.',
              'Hàm bậc ba có hai cực trị ⟺ f′ = 0 có hai nghiệm phân biệt ⟺ Δ > 0.',
            ],
            docVi: [
              'Đề hỏi tổng (hoặc tích) hai điểm cực trị chứ không hỏi từng điểm → dùng Viète, không cần giải nghiệm.',
              'Từ “điểm cực trị” chỉ giá trị của x; nếu đề hỏi “giá trị cực trị” thì phải tính f(x₁), f(x₂).',
            ],
            method: [
              'Bước 1: tính f′.',
              'Bước 2: nếu chỉ cần tổng/tích, áp dụng Viète ngay trên f′ = 0.',
              'Bước 3: kiểm tra Δ > 0 để chắc chắn có hai cực trị.',
              'Bước 4: điền đáp số đúng định dạng (số nguyên, không đơn vị).',
            ],
            traps: [
              'Trả lời tổng hai giá trị cực trị f(1) + f(3) = 4 + 0 = 4 — tình cờ trùng ở đề này nhưng sai bản chất.',
              'Quên chia hệ số a = 3 khi dùng Viète, trả lời 12.',
              'Nhầm f′ = 3x² − 12x + 9 thành 3x² − 6x + 9.',
            ],
            tips: [
              'Phần III không có phương án để loại trừ — hãy tính lại bằng cách thứ hai (ở đây: giải nghiệm cụ thể) trước khi điền.',
              'Định dạng đáp số: số nguyên thì viết 4, không viết 4,0.',
            ],
            transfer: 'Biến thể: tính x₁·x₂, tính |x₁ − x₂|, tìm m để hàm có hai cực trị thoả một hệ thức.',
          },
        },
        {
          id: 'tn01-p3-c2',
          label: 'Phần III · Câu 2',
          points: 0.5,
          minutes: 4,
          strand: 'giai-tich',
          level: 2,
          format: 'tra-loi-ngan',
          topicIds: ['q12-nguyen-ham-tich-phan'],
          statement:
            'Tính giá trị của tích phân I = ∫ từ 1 đến 2 của (2x + 1/x)dx (làm tròn kết quả đến hàng phần trăm).',
          answer: '3,69',
          solution: [
            'Nguyên hàm: ∫(2x + 1/x)dx = x² + ln|x| + C.',
            'Trên đoạn [1; 2] ta có x > 0 nên bỏ được dấu giá trị tuyệt đối.',
            'I = [x² + ln x] từ 1 đến 2 = (4 + ln 2) − (1 + ln 1) = 3 + ln 2.',
            'ln 2 ≈ 0,6931, nên I ≈ 3,6931.',
            'Làm tròn đến hàng phần trăm: I ≈ 3,69.',
          ],
          barem: [{ item: 'Điền đúng đáp số 3,69', point: 0.5 }],
          analysis: {
            dang: 'Tích phân hàm hữu tỉ đơn giản có chứa 1/x',
            knowledge: [
              '∫x dx = x²/2 + C, do đó ∫2x dx = x² + C.',
              '∫(1/x)dx = ln|x| + C.',
              'Công thức Newton–Leibniz và ln 1 = 0.',
              'Quy tắc làm tròn đến hàng phần trăm: giữ hai chữ số sau dấu phẩy.',
            ],
            docVi: [
              'Xuất hiện 1/x trong dấu tích phân → chắc chắn có ln trong kết quả, và đáp số sẽ là số vô tỉ cần làm tròn.',
              'Đề yêu cầu làm tròn → phải bấm máy ở bước cuối, nhưng nên giữ dạng chính xác 3 + ln 2 tới lúc đó.',
              'Cận đều dương nên không cần bàn về dấu giá trị tuyệt đối trong ln.',
            ],
            method: [
              'Bước 1: tìm nguyên hàm của từng hạng tử.',
              'Bước 2: áp dụng Newton–Leibniz, giữ kết quả ở dạng chính xác.',
              'Bước 3: chỉ thay giá trị gần đúng ở bước cuối cùng.',
              'Bước 4: làm tròn đúng yêu cầu và kiểm tra định dạng đáp số.',
            ],
            traps: [
              'Nguyên hàm của 2x viết nhầm thành 2x²/2 = x² — đúng, nhưng nhiều bạn viết thành 2x².',
              'Quên ln 1 = 0 nên trừ nhầm.',
              'Làm tròn sớm: lấy ln 2 ≈ 0,69 rồi ra 3,69 — ở đây may mắn đúng, nhưng thói quen này gây sai ở bài khác.',
              'Điền 3.69 với dấu chấm thay vì dấu phẩy, hoặc điền 3,693.',
            ],
            tips: [
              'Bấm máy trực tiếp tích phân để đối chiếu — mọi máy tính cầm tay đều làm được, và đây là cách kiểm tra tốt nhất cho Phần III.',
              'Giữ dạng chính xác (3 + ln 2) đến bước cuối rồi mới làm tròn.',
            ],
            transfer: 'Biến thể: tích phân có e^x, tích phân đổi biến, tích phân từng phần, diện tích hình phẳng giới hạn bởi hai đường.',
          },
        },
        {
          id: 'tn01-p3-c3',
          label: 'Phần III · Câu 3',
          points: 0.5,
          minutes: 5,
          strand: 'thuc-te',
          level: 3,
          format: 'tra-loi-ngan',
          topicIds: ['q12-khao-sat-ham-so', 'q12-ky-nang-de-moi'],
          statement:
            'Một người muốn rào một mảnh vườn hình chữ nhật có diện tích 200 m². Một cạnh của mảnh vườn dựa vào bức tường có sẵn nên không phải rào. Hỏi chiều dài nhỏ nhất của hàng rào cần dùng là bao nhiêu mét?',
          answer: '40',
          solution: [
            'Gọi x (m) là cạnh song song với bức tường và y (m) là cạnh vuông góc với bức tường, x > 0, y > 0.',
            'Diện tích: xy = 200, suy ra x = 200/y.',
            'Hàng rào gồm một cạnh x và hai cạnh y, nên chiều dài hàng rào là L = x + 2y = 200/y + 2y.',
            'Áp dụng bất đẳng thức AM–GM cho hai số dương: 200/y + 2y ≥ 2√(200/y · 2y) = 2√400 = 40.',
            'Dấu bằng xảy ra khi 200/y = 2y ⟺ y² = 100 ⟺ y = 10 (m), khi đó x = 20 (m).',
            'Vậy chiều dài nhỏ nhất của hàng rào là 40 m.',
          ],
          barem: [{ item: 'Điền đúng đáp số 40', point: 0.5 }],
          analysis: {
            dang: 'Bài toán tối ưu thực tế — cực trị của hàm một biến có ràng buộc',
            knowledge: [
              'AM–GM hai số dương: a + b ≥ 2√(ab), dấu bằng khi a = b.',
              'Hoặc dùng đạo hàm: L′(y) = −200/y² + 2 = 0 ⟺ y = 10.',
              'Kỹ năng mô hình hoá: đặt ẩn, viết ràng buộc, viết hàm mục tiêu.',
            ],
            docVi: [
              'Cụm “một cạnh dựa vào tường nên không phải rào” là chi tiết quyết định: hàng rào chỉ gồm ba cạnh, không phải bốn.',
              'Có ràng buộc (diện tích cố định) và có đại lượng cần tối ưu (chu vi rào) → bài toán cực trị một biến.',
              'Con số 200 được chọn để 2·√400 = 40 tròn — dấu hiệu bài toán có đáp số đẹp.',
            ],
            method: [
              'Bước 1: vẽ hình phác, đánh dấu cạnh nào phải rào.',
              'Bước 2: đặt ẩn cho hai kích thước, ghi điều kiện dương.',
              'Bước 3: viết ràng buộc, rút một ẩn theo ẩn kia.',
              'Bước 4: viết hàm mục tiêu một biến.',
              'Bước 5: tìm cực trị bằng AM–GM hoặc đạo hàm; kiểm tra dấu bằng.',
            ],
            traps: [
              'Rào cả bốn cạnh: L = 2x + 2y, ra đáp số khác hẳn.',
              'Rào nhầm hai cạnh song song với tường: L = 2x + y.',
              'Dùng AM–GM cho x + 2y mà quên rằng ràng buộc là xy = 200 chứ không phải x + y.',
              'Trả lời kích thước (10 hoặc 20) thay vì chiều dài hàng rào.',
            ],
            tips: [
              'Luôn vẽ hình và tô đậm những cạnh thực sự phải rào — 90% lỗi của dạng này nằm ở bước này.',
              'Đọc lại câu hỏi cuối cùng trước khi điền: đề hỏi chiều dài hàng rào, không hỏi kích thước mảnh vườn.',
              'Kiểm tra bằng số: y = 10, x = 20 cho L = 20 + 20 = 40 và diện tích 200 ✓.',
            ],
            transfer:
              'Biến thể: hộp không nắp có thể tích cho trước, tìm kích thước để tốn ít vật liệu nhất; bể nước hình trụ; bài toán chi phí vận chuyển.',
          },
        },
        {
          id: 'tn01-p3-c4',
          label: 'Phần III · Câu 4',
          points: 0.5,
          minutes: 5,
          strand: 'toa-do',
          level: 3,
          format: 'tra-loi-ngan',
          topicIds: ['q12-oxyz'],
          statement:
            'Trong không gian Oxyz, cho ba điểm A(2; 0; 0), B(0; 3; 0), C(0; 0; 4). Tính khoảng cách từ gốc toạ độ O đến mặt phẳng (ABC) (làm tròn kết quả đến hàng phần trăm).',
          answer: '1,54',
          solution: [
            'Vì A, B, C lần lượt nằm trên ba trục toạ độ nên (ABC) có phương trình theo đoạn chắn: x/2 + y/3 + z/4 = 1.',
            'Nhân hai vế với 12: 6x + 4y + 3z = 12, tức 6x + 4y + 3z − 12 = 0.',
            'Khoảng cách từ O(0; 0; 0): d = |6·0 + 4·0 + 3·0 − 12| / √(6² + 4² + 3²) = 12/√61.',
            '√61 ≈ 7,8102, nên d ≈ 12/7,8102 ≈ 1,5365.',
            'Làm tròn đến hàng phần trăm: d ≈ 1,54.',
          ],
          barem: [{ item: 'Điền đúng đáp số 1,54', point: 0.5 }],
          analysis: {
            dang: 'Phương trình mặt phẳng theo đoạn chắn và khoảng cách từ một điểm',
            knowledge: [
              'Phương trình mặt phẳng theo đoạn chắn: x/a + y/b + z/c = 1 khi mặt phẳng cắt ba trục tại (a; 0; 0), (0; b; 0), (0; 0; c) với a, b, c ≠ 0.',
              'Khoảng cách: d(M, (P)) = |Ax₀ + By₀ + Cz₀ + D|/√(A² + B² + C²).',
              'Cách khác: dùng thể tích tứ diện, d = 3V/S_ABC.',
            ],
            docVi: [
              'Ba điểm nằm đúng trên ba trục toạ độ → dùng ngay phương trình theo đoạn chắn, không cần tính tích có hướng.',
              'Nhận ra dấu hiệu này tiết kiệm khoảng 3 phút so với cách viết phương trình mặt phẳng qua ba điểm thông thường.',
              'Đề yêu cầu làm tròn → đáp số là số vô tỉ, phải bấm máy ở bước cuối.',
            ],
            method: [
              'Bước 1: kiểm tra ba điểm có nằm trên ba trục không.',
              'Bước 2: viết phương trình theo đoạn chắn rồi quy đồng về dạng tổng quát.',
              'Bước 3: áp dụng công thức khoảng cách.',
              'Bước 4: giữ dạng chính xác 12/√61 rồi mới bấm máy và làm tròn.',
            ],
            traps: [
              'Quy đồng sai: nhân 12 vào x/2 phải ra 6x, không phải 24x.',
              'Quên chuyển vế số 1 sang, để phương trình là 6x + 4y + 3z = 12 rồi lấy D = 12 (dấu sai không ảnh hưởng vì có trị tuyệt đối, nhưng dễ kéo theo lỗi khác).',
              'Tính √61 nhầm thành √(6 + 4 + 3).',
              'Làm tròn thành 1,53 (do cắt bớt thay vì làm tròn).',
            ],
            tips: [
              'Kiểm tra chéo bằng thể tích: V(OABC) = (1/6)·2·3·4 = 4; S_ABC tính được từ tích có hướng, và d = 3V/S — nếu hai cách cho cùng kết quả thì yên tâm điền.',
              'Giữ dạng 12/√61 tới bước cuối; bấm máy một lần duy nhất.',
            ],
            transfer:
              'Biến thể: tính thể tích tứ diện OABC; viết phương trình mặt cầu tâm O tiếp xúc (ABC); tìm hình chiếu của O lên (ABC); tính góc giữa (ABC) và mặt phẳng toạ độ.',
          },
        },
        {
          id: 'tn01-p3-c5',
          label: 'Phần III · Câu 5',
          points: 0.5,
          minutes: 5,
          strand: 'xac-suat',
          level: 3,
          format: 'tra-loi-ngan',
          topicIds: ['q11-xac-suat'],
          statement:
            'Một hộp có 10 tấm thẻ được đánh số từ 1 đến 10. Rút ngẫu nhiên đồng thời 3 tấm thẻ. Tính xác suất để tích ba số ghi trên ba tấm thẻ đó là số chẵn (làm tròn kết quả đến hàng phần trăm).',
          answer: '0,92',
          solution: [
            'Số phần tử của không gian mẫu: C(10; 3) = 120.',
            'Xét biến cố đối: tích ba số là số lẻ ⟺ cả ba số đều lẻ.',
            'Trong 10 số từ 1 đến 10 có 5 số lẻ (1, 3, 5, 7, 9).',
            'Số cách chọn 3 thẻ đều lẻ: C(5; 3) = 10.',
            'Xác suất tích lẻ: 10/120 = 1/12.',
            'Xác suất tích chẵn: 1 − 1/12 = 11/12 ≈ 0,9167.',
            'Làm tròn đến hàng phần trăm: 0,92.',
          ],
          barem: [{ item: 'Điền đúng đáp số 0,92', point: 0.5 }],
          analysis: {
            dang: 'Xác suất của biến cố “có ít nhất một” — dùng biến cố đối',
            knowledge: [
              'P(A) = 1 − P(Ā).',
              'Tích của các số nguyên là số lẻ ⟺ mọi thừa số đều lẻ.',
              'Tổ hợp C(n; k) khi rút đồng thời.',
            ],
            docVi: [
              'Biến cố “tích chẵn” tương đương “có ít nhất một số chẵn” — hễ thấy “ít nhất một” là nghĩ ngay tới biến cố đối.',
              'Đếm trực tiếp phải chia ba trường hợp (1, 2 hoặc 3 số chẵn); đếm biến cố đối chỉ có một trường hợp.',
              'Đề yêu cầu làm tròn → đáp số là số thập phân vô hạn tuần hoàn, phải làm tròn cẩn thận.',
            ],
            method: [
              'Bước 1: tính n(Ω).',
              'Bước 2: phát biểu biến cố đối bằng lời cho thật rõ.',
              'Bước 3: đếm số phần tử của biến cố đối.',
              'Bước 4: lấy 1 trừ đi rồi làm tròn.',
            ],
            traps: [
              'Đếm trực tiếp và sót một trường hợp.',
              'Nhầm biến cố đối thành “cả ba số đều chẵn”.',
              'Tính C(5; 3) = 60 (nhầm chỉnh hợp).',
              'Làm tròn 0,9167 thành 0,91.',
            ],
            tips: [
              'Câu tự kiểm: “Điều ngược lại của điều đề hỏi là gì?” Nếu điều ngược lại chỉ có một trường hợp, hãy đếm nó.',
              'Kiểm tra chéo bằng cách đếm trực tiếp: 1 chẵn (5·C(5;2) = 50) + 2 chẵn (C(5;2)·5 = 50) + 3 chẵn (C(5;3) = 10) = 110, và 110/120 = 11/12 ✓.',
              'Chú ý định dạng: đề nói “làm tròn đến hàng phần trăm” nên phải điền 0,92 chứ không phải 11/12.',
            ],
            transfer:
              'Biến thể: xác suất tổng ba số là số lẻ; xác suất có ít nhất một số chia hết cho 3; xác suất ba số lập thành cấp số cộng.',
          },
        },
        {
          id: 'tn01-p3-c6',
          label: 'Phần III · Câu 6',
          points: 0.5,
          minutes: 5,
          strand: 'thuc-te',
          level: 3,
          format: 'tra-loi-ngan',
          topicIds: ['q11-mu-logarit', 'q12-ky-nang-de-moi'],
          statement:
            'Một người gửi 100 triệu đồng vào ngân hàng theo thể thức lãi kép với lãi suất 6%/năm, lãi được nhập vào gốc sau mỗi năm. Hỏi sau ít nhất bao nhiêu năm thì số tiền người đó nhận được vượt quá 150 triệu đồng? (Giả sử lãi suất không đổi và người đó không rút tiền trong suốt thời gian gửi.)',
          answer: '7',
          solution: [
            'Công thức lãi kép: T = A(1 + r)ⁿ với A = 100 (triệu đồng), r = 0,06.',
            'Yêu cầu: 100·(1,06)ⁿ > 150 ⟺ (1,06)ⁿ > 1,5.',
            'Lấy lôgarit hai vế (cơ số lớn hơn 1 nên giữ chiều): n·ln(1,06) > ln(1,5).',
            'n > ln(1,5)/ln(1,06) ≈ 0,405465/0,058269 ≈ 6,958.',
            'Vì n là số nguyên dương nên n nhỏ nhất là 7.',
            'Kiểm tra: 100·(1,06)⁶ ≈ 141,85 triệu (chưa vượt 150); 100·(1,06)⁷ ≈ 150,36 triệu (đã vượt 150) ✓.',
            'Vậy sau ít nhất 7 năm.',
          ],
          barem: [{ item: 'Điền đúng đáp số 7', point: 0.5 }],
          analysis: {
            dang: 'Bài toán lãi kép — giải bất phương trình mũ bằng lôgarit',
            knowledge: [
              'Lãi kép: T = A(1 + r)ⁿ.',
              'Lãi đơn: T = A(1 + nr) — khác hoàn toàn, đừng nhầm.',
              'Giải a^n > b bằng cách lấy lôgarit hai vế; với a > 1 thì giữ nguyên chiều.',
              'Khi n phải nguyên, lấy số nguyên nhỏ nhất lớn hơn giá trị tìm được.',
            ],
            docVi: [
              'Cụm “lãi nhập gốc” hoặc “lãi kép” → dùng công thức luỹ thừa, không dùng lãi đơn.',
              'Cụm “ít nhất bao nhiêu năm” → giải bất phương trình rồi làm tròn lên, không làm tròn thông thường.',
              'Đáp số là số nguyên → không cần làm tròn thập phân, nhưng phải làm tròn đúng chiều.',
            ],
            method: [
              'Bước 1: viết công thức lãi kép với đúng các đại lượng đề cho.',
              'Bước 2: lập bất phương trình theo yêu cầu.',
              'Bước 3: chia hai vế cho số tiền gốc để rút gọn.',
              'Bước 4: lấy lôgarit hai vế và giải theo n.',
              'Bước 5: làm tròn lên và kiểm chứng bằng hai giá trị n liền kề.',
            ],
            traps: [
              'Dùng lãi đơn: 100(1 + 0,06n) > 150 cho n > 8,33 rồi trả lời 9 — sai công thức.',
              'Làm tròn 6,958 xuống thành 6 vì thói quen làm tròn thông thường.',
              'Viết lãi suất là 6 thay vì 0,06.',
              'Nhầm chiều bất đẳng thức khi chia cho ln(1,06) — lưu ý ln(1,06) > 0 nên giữ chiều.',
            ],
            tips: [
              'Với câu “ít nhất bao nhiêu”, luôn kiểm chứng bằng hai giá trị liền kề (ở đây n = 6 và n = 7). Đây là cách chắc chắn nhất và chỉ mất 30 giây.',
              'Bấm máy trực tiếp 1,06^6 và 1,06^7 nhanh hơn cả việc lấy lôgarit — với đáp số nguyên nhỏ, thử trực tiếp là chiến thuật tốt.',
              'Phần III không có phương án để loại trừ, nên bước kiểm chứng là bắt buộc.',
            ],
            transfer:
              'Biến thể: lãi kép theo tháng/quý; gửi thêm đều đặn mỗi tháng (cấp số nhân có tổng); bài toán tăng trưởng dân số; bài toán phân rã phóng xạ.',
          },
        },
      ],
    },
  ],
  gradingNotes: [
    'Phần I: mỗi câu 0,25 điểm, không có điểm thành phần.',
    'Phần II: tính điểm luỹ tiến trong từng câu — 1 ý đúng 0,10; 2 ý 0,25; 3 ý 0,50; 4 ý 1,00. Không trừ điểm khi trả lời sai, nên không được bỏ trống ý nào.',
    'Phần III: mỗi câu 0,5 điểm, chỉ chấm đáp số. Sai định dạng (làm tròn không đúng yêu cầu, sai dấu phẩy thập phân, thừa đơn vị) đều tính là sai.',
    'Đáp số Phần III của đề này: 4 — 3,69 — 40 — 1,54 — 0,92 — 7.',
    'Giáo viên nên chấm Phần II theo bảng bốn cột (a, b, c, d) để đếm số ý đúng trước khi quy ra điểm.',
  ],
  timePlan: [
    { phase: 'Phần I', minutes: '0–22', action: 'Làm nhanh và chắc 12 câu, trung bình dưới 2 phút mỗi câu; đánh dấu câu cần quay lại.' },
    { phase: 'Phần II', minutes: '22–55', action: 'Mỗi câu khoảng 8 phút. Lập bảng biến thiên / biểu đồ Ven một lần rồi trả lời cả bốn ý.' },
    { phase: 'Phần III', minutes: '55–83', action: 'Mỗi câu 4–5 phút. Bắt buộc tính lại bằng cách thứ hai trước khi điền.' },
    { phase: 'Soát', minutes: '83–90', action: 'Quay lại câu đã đánh dấu; kiểm tra tô đáp án và định dạng đáp số Phần III.' },
  ],
  scoreBands: [
    {
      band: '9,5 – 10',
      meaning: 'Trọn Phần I và Phần III, Phần II đạt từ 3,5/4. Đây là mức an toàn cho mọi tổ hợp xét tuyển.',
      next: 'Giữ nhịp mỗi tuần một đề tính giờ; tập trung vào tốc độ Phần I để dư thời gian cho Phần II.',
    },
    {
      band: '9,0 – 9,25',
      meaning: 'Đạt mục tiêu 9+ nhưng còn hụt ở một ý Phần II hoặc một câu Phần III.',
      next: 'Rà lại đúng dạng đã sai bằng bộ phiếu chuyên đề tương ứng; luyện riêng kỹ năng kiểm chứng đáp số Phần III.',
    },
    {
      band: '8,0 – 8,75',
      meaning: 'Nền vững nhưng mất điểm ở phần phân hoá: thường là ý thứ tư của các câu Phần II.',
      next: 'Làm bộ phiếu NC của Khảo sát hàm số, Oxyz và Xác suất có điều kiện; mục tiêu nâng Phần II từ 2,5 lên 3,5.',
    },
    {
      band: 'Dưới 8,0',
      meaning: 'Còn mất điểm ở Phần I — nghĩa là hổng kiến thức nền, không phải vấn đề tốc độ.',
      next: 'Tạm dừng làm đề. Quay lại bộ phiếu LT → DB → KN của những chuyên đề đã sai, đạt KPI 90% rồi mới làm đề tiếp.',
    },
  ],
};
