import type { ExamPaper } from '@/types';

/**
 * ĐỀ MẪU 10 — Toán tuyển sinh lớp 10 THPT công lập Hà Nội (đề thứ hai).
 * Bám sát ma trận bp-hanoi-chung: 5 bài · 90 phút · thang 10 · 100% tự luận.
 *
 * Đề do MATH365 biên soạn, KHÔNG sao chép đề thi thật của bất kỳ năm nào.
 * Mục đích: cho học viên một lần luyện thứ hai đúng cấu trúc, với các dạng
 * biến thể khác so với Đề mẫu 01 nhưng cùng độ khó và cùng phân bố điểm.
 */
export const PAPER_HANOI_02: ExamPaper = {
  id: 'dm-hanoi-02',
  code: 'M365-HN-02',
  blueprintId: 'bp-hanoi-chung',
  schoolId: 'hanoi-chung',
  track: 'thpt',
  title: 'Đề mẫu 10 · Toán tuyển sinh lớp 10 THPT Hà Nội (đề 2)',
  subtitle: '90 phút · thang điểm 10 · 5 bài · 100% tự luận',
  minutes: 90,
  totalPoints: 10,
  fidelity: [
    'Đúng 5 bài và đúng phân bố điểm của ma trận: 2,0 – 2,0 – 2,5 – 3,0 – 0,5.',
    'Bài I rút gọn biểu thức chứa căn với ba ý tăng dần, đúng khuôn đề Hà Nội.',
    'Bài II gồm bài toán năng suất lập hệ và một ý hình không gian thực tế.',
    'Bài III gồm hệ phương trình bằng cách đặt ẩn phụ và bài tương giao parabol – đường thẳng có tham số.',
    'Bài IV hình tròn ba ý, ý cuối là chốt chặn 9 điểm; Bài V bất đẳng thức 0,5 điểm.',
    'Tổng thời gian đề nghị của các câu đúng bằng 90 phút, khớp kế hoạch phân bổ thời gian.',
    'Các dạng đều khác Đề mẫu 01 để không luyện lại đúng một khuôn hai lần.',
  ],
  parts: [
    {
      label: 'Bài I',
      points: 2,
      note: 'Rút gọn biểu thức chứa căn — 3 ý tăng dần. Đây là 2,0 điểm chắc nhất toàn đề.',
      items: [
        {
          id: 'hn2-1-1',
          label: 'Bài I.1',
          points: 0.5,
          minutes: 3,
          strand: 'dai-so',
          level: 1,
          format: 'tu-luan',
          topicIds: ['ds-can-thuc'],
          statement: 'Tính giá trị của biểu thức A = (√x + 1)/(√x − 3) khi x = 25.',
          answer: 'A = 3',
          solution: [
            'Với x = 25 thì √x = 5, thoả điều kiện x ≥ 0 và x ≠ 9.',
            'Thay vào: A = (5 + 1)/(5 − 3) = 6/2 = 3.',
            'Vậy A = 3.',
          ],
          barem: [
            { item: 'Tính đúng √25 = 5 và kiểm tra điều kiện', point: 0.25 },
            { item: 'Thay số và tính ra A = 3', point: 0.25 },
          ],
          analysis: {
            dang: 'Tính giá trị biểu thức chứa căn tại một giá trị cụ thể',
            knowledge: ['Căn bậc hai của số chính phương.', 'Điều kiện xác định của phân thức chứa căn.'],
            docVi: ['Đề cho sẵn giá trị của x và chỉ yêu cầu thay số.', 'x = 25 là số chính phương nên căn ra số nguyên.'],
            method: ['Kiểm tra x có thoả điều kiện xác định không.', 'Tính √x.', 'Thay vào biểu thức và rút gọn.'],
            traps: [
              'Bỏ qua bước kiểm tra điều kiện — barem có 0,25 điểm cho dòng này.',
              'Thay x = 25 thẳng vào chỗ √x thay vì thay √x = 5.',
            ],
            tips: ['Với ý đầu Bài I, viết luôn dòng "Với x = 25 (thoả điều kiện)" là đủ ăn mốc điểm đầu.'],
            transfer: 'Ý mở hàng của Bài I trong hầu hết các năm — mất điểm ở đây là mất oan nhất toàn đề.',
          },
        },
        {
          id: 'hn2-1-2',
          label: 'Bài I.2',
          points: 1,
          minutes: 6,
          strand: 'dai-so',
          level: 2,
          format: 'tu-luan',
          topicIds: ['ds-can-thuc'],
          statement:
            'Rút gọn biểu thức B = √x/(√x + 3) + 2√x/(√x − 3) − (3x − 9)/(x − 9), với x ≥ 0 và x ≠ 9.',
          answer: 'B = 3/(√x − 3)',
          solution: [
            'Với x ≥ 0, x ≠ 9 ta có x − 9 = (√x − 3)(√x + 3), nên mẫu chung là (√x − 3)(√x + 3).',
            'Quy đồng: B = [√x(√x − 3) + 2√x(√x + 3) − (3x − 9)] / [(√x − 3)(√x + 3)].',
            'Khai triển tử số: (x − 3√x) + (2x + 6√x) − 3x + 9 = 3√x + 9.',
            'Phân tích tử: 3√x + 9 = 3(√x + 3).',
            'Do đó B = 3(√x + 3) / [(√x − 3)(√x + 3)] = 3/(√x − 3).',
            'Vậy B = 3/(√x − 3) với x ≥ 0, x ≠ 9.',
          ],
          barem: [
            { item: 'Phân tích x − 9 và chỉ ra mẫu chung', point: 0.25 },
            { item: 'Quy đồng đúng ba phân thức', point: 0.25 },
            { item: 'Khai triển và thu gọn tử số ra 3(√x + 3)', point: 0.25 },
            { item: 'Rút gọn và kết luận B = 3/(√x − 3)', point: 0.25 },
          ],
          analysis: {
            dang: 'Rút gọn biểu thức chứa căn dạng ba phân thức',
            knowledge: [
              'Phân tích x − 9 = (√x − 3)(√x + 3).',
              'Quy đồng và cộng trừ phân thức.',
              'Đặt nhân tử chung để rút gọn.',
            ],
            docVi: [
              'Có ba phân thức, trong đó một phân thức có mẫu là hiệu hai bình phương.',
              'Mẫu của hai phân thức đầu chính là hai nhân tử của mẫu thứ ba — dấu hiệu chắc chắn của dạng này.',
            ],
            method: [
              'Phân tích mẫu lớn nhất thành tích, xác định mẫu chung.',
              'Quy đồng cả ba phân thức, chú ý dấu trừ trước phân thức cuối.',
              'Khai triển tử, thu gọn theo bậc của √x.',
              'Đặt nhân tử chung ở tử và rút gọn với mẫu.',
            ],
            traps: [
              'Quên đổi dấu cả tử của phân thức cuối khi bỏ ngoặc sau dấu trừ.',
              'Rút gọn khi chưa kiểm tra nhân tử có khác 0 không.',
              'Nhớ nhầm x − 9 = (√x − 3)² thay vì (√x − 3)(√x + 3).',
            ],
            tips: [
              'Viết riêng phần khai triển tử ra một dòng trước khi ghép lại — dễ soát dấu hơn nhiều.',
              'Nếu tử thu gọn không phân tích được thành nhân tử chứa (√x + 3) hoặc (√x − 3), gần như chắc chắn bạn đã sai dấu.',
            ],
            transfer: 'Ý trọng tâm của Bài I, chiếm 1,0 điểm và là nền cho ý 3.',
          },
        },
        {
          id: 'hn2-1-3',
          label: 'Bài I.3',
          points: 0.5,
          minutes: 3,
          strand: 'dai-so',
          level: 3,
          format: 'tu-luan',
          topicIds: ['ds-can-thuc'],
          statement: 'Với B = 3/(√x − 3) (x ≥ 0, x ≠ 9), tìm tất cả các giá trị của x để B > 1.',
          answer: '9 < x < 36',
          solution: [
            'Xét B > 1 ⇔ 3/(√x − 3) > 1.',
            'Trường hợp √x − 3 < 0 (tức 0 ≤ x < 9): vế trái âm, không thể lớn hơn 1. Loại.',
            'Trường hợp √x − 3 > 0 (tức x > 9): nhân hai vế với √x − 3 > 0, bất phương trình không đổi chiều, ta được 3 > √x − 3.',
            'Suy ra √x < 6, tức x < 36.',
            'Kết hợp với x > 9, ta được 9 < x < 36.',
            'Vậy tập giá trị cần tìm là 9 < x < 36.',
          ],
          barem: [
            { item: 'Xét dấu mẫu và loại trường hợp 0 ≤ x < 9', point: 0.25 },
            { item: 'Giải đúng trường hợp còn lại và kết luận 9 < x < 36', point: 0.25 },
          ],
          analysis: {
            dang: 'Bất phương trình chứa biểu thức đã rút gọn',
            knowledge: [
              'Quy tắc nhân hai vế bất phương trình với một số dương hoặc âm.',
              'Điều kiện xác định của biểu thức chứa căn và chứa mẫu.',
            ],
            docVi: [
              'Đề yêu cầu so sánh B với một số, và mẫu của B đổi dấu được — bắt buộc xét hai trường hợp.',
            ],
            method: [
              'Nhắc lại điều kiện xác định.',
              'Chia hai trường hợp theo dấu của mẫu.',
              'Ở mỗi trường hợp, nhân hai vế và chú ý chiều bất đẳng thức.',
              'Giao với điều kiện của từng trường hợp rồi hợp kết quả.',
            ],
            traps: [
              'Nhân chéo như với phương trình mà không xét dấu mẫu — lỗi mất trọn ý này.',
              'Ra √x < 6 rồi kết luận x < 6 thay vì x < 36.',
              'Quên loại x = 9.',
            ],
            tips: [
              'Với bất phương trình phân thức, thay vì nhân chéo có thể chuyển vế: 3/(√x − 3) − 1 > 0 rồi xét dấu.',
              'Kiểm tra bằng một giá trị cụ thể, ví dụ x = 16 cho B = 3 > 1 ✓ và x = 49 cho B = 0,75 < 1 ✓.',
            ],
            transfer: 'Ý phân loại của Bài I; học sinh nhóm Xây nền thường mất trọn 0,5 điểm ở đây vì nhân chéo.',
          },
        },
      ],
    },
    {
      label: 'Bài II',
      points: 2,
      note: 'Giải bài toán bằng cách lập hệ phương trình (1,5đ) và một ý hình không gian thực tế (0,5đ).',
      items: [
        {
          id: 'hn2-2-1',
          label: 'Bài II.1',
          points: 1.5,
          minutes: 13,
          strand: 'thuc-te',
          level: 3,
          format: 'tu-luan',
          topicIds: ['ds-toan-loi-van'],
          statement:
            'Hai tổ công nhân cùng làm chung một công việc thì sau 12 giờ hoàn thành. Nếu tổ thứ nhất làm một mình trong 4 giờ rồi tổ thứ hai làm tiếp một mình trong 6 giờ thì cả hai tổ hoàn thành được 40% công việc. Hỏi nếu làm một mình thì mỗi tổ hoàn thành công việc đó trong bao lâu?',
          answer: 'Tổ thứ nhất: 20 giờ; tổ thứ hai: 30 giờ',
          solution: [
            'Gọi thời gian tổ thứ nhất làm một mình xong công việc là x (giờ) và tổ thứ hai là y (giờ), điều kiện x > 12, y > 12.',
            'Trong 1 giờ, tổ thứ nhất làm được 1/x công việc, tổ thứ hai làm được 1/y công việc.',
            'Hai tổ làm chung xong trong 12 giờ nên: 1/x + 1/y = 1/12.  (1)',
            'Tổ một làm 4 giờ và tổ hai làm 6 giờ được 40% công việc nên: 4/x + 6/y = 2/5.  (2)',
            'Đặt a = 1/x và b = 1/y (a > 0, b > 0), hệ trở thành: a + b = 1/12 và 4a + 6b = 2/5.',
            'Từ phương trình đầu: a = 1/12 − b. Thay vào phương trình sau: 4(1/12 − b) + 6b = 2/5 ⇔ 1/3 + 2b = 2/5.',
            'Suy ra 2b = 2/5 − 1/3 = 1/15, do đó b = 1/30 và a = 1/12 − 1/30 = 1/20.',
            'Vậy x = 20 và y = 30, đều thoả điều kiện.',
            'Đáp số: tổ thứ nhất làm một mình hết 20 giờ, tổ thứ hai hết 30 giờ.',
          ],
          barem: [
            { item: 'Đặt ẩn kèm đơn vị và nêu đúng điều kiện', point: 0.25 },
            { item: 'Lập đúng phương trình (1)', point: 0.25 },
            { item: 'Lập đúng phương trình (2), đổi 40% thành 2/5', point: 0.5 },
            { item: 'Giải hệ tìm được a = 1/20, b = 1/30', point: 0.25 },
            { item: 'Đối chiếu điều kiện và kết luận đủ hai tổ', point: 0.25 },
          ],
          analysis: {
            dang: 'Bài toán năng suất chung – riêng, lập hệ hai phương trình',
            knowledge: [
              'Năng suất trong một đơn vị thời gian là nghịch đảo của tổng thời gian.',
              'Đặt ẩn phụ để đưa hệ chứa ẩn ở mẫu về hệ bậc nhất.',
              'Đổi tỉ số phần trăm sang phân số.',
            ],
            docVi: [
              'Có cụm "làm chung … thì xong" cho phương trình thứ nhất.',
              'Có hai khoảng thời gian làm riêng khác nhau cho phương trình thứ hai.',
              'Con số 40% phải đổi thành 2/5 trước khi đưa vào phương trình.',
            ],
            method: [
              'Đặt ẩn là THỜI GIAN làm riêng, kèm đơn vị và điều kiện.',
              'Viết năng suất một giờ của mỗi tổ.',
              'Lập hai phương trình theo hai tình huống đề cho.',
              'Đặt ẩn phụ a = 1/x, b = 1/y để hệ thành bậc nhất.',
              'Giải hệ, quay lại tìm x, y và đối chiếu điều kiện.',
            ],
            traps: [
              'Đặt ẩn là năng suất nhưng cuối bài quên quay lại tìm thời gian.',
              'Để nguyên 40% trong phương trình thay vì đổi thành 2/5.',
              'Không đặt ẩn phụ và loay hoay với hệ chứa ẩn ở mẫu.',
              'Điều kiện chỉ ghi x > 0 thay vì x > 12 (mỗi tổ làm riêng phải lâu hơn làm chung).',
            ],
            tips: [
              'Đặt ẩn phụ ngay từ đầu tiết kiệm được vài phút và tránh hẳn nguy cơ sai dấu.',
              'Thử lại nhanh: 4/20 + 6/30 = 0,2 + 0,2 = 0,4 = 40% ✓.',
            ],
            transfer:
              'Dạng năng suất là một trong ba dạng thường gặp nhất của Bài II (cùng với chuyển động và toán phần trăm), chiếm 1,5 điểm.',
          },
        },
        {
          id: 'hn2-2-2',
          label: 'Bài II.2',
          points: 0.5,
          minutes: 5,
          strand: 'thuc-te',
          level: 2,
          format: 'tu-luan',
          topicIds: ['tt-hinh-khong-gian'],
          statement:
            'Một hộp sữa dạng hình trụ có đường kính đáy 12 cm và chiều cao 20 cm. Người ta dán nhãn phủ kín toàn bộ mặt xung quanh của hộp. Tính diện tích phần nhãn đó (lấy π ≈ 3,14).',
          answer: '753,6 cm²',
          solution: [
            'Bán kính đáy: r = 12 : 2 = 6 (cm).',
            'Diện tích xung quanh hình trụ: S = 2πrh.',
            'S = 2 × 3,14 × 6 × 20 = 753,6 (cm²).',
            'Vậy diện tích phần nhãn là 753,6 cm².',
          ],
          barem: [
            { item: 'Tính đúng bán kính và viết đúng công thức diện tích xung quanh', point: 0.25 },
            { item: 'Tính ra 753,6 cm² kèm đơn vị', point: 0.25 },
          ],
          analysis: {
            dang: 'Diện tích xung quanh hình trụ trong tình huống thực tế',
            knowledge: ['S xung quanh hình trụ = 2πrh.', 'Quan hệ giữa đường kính và bán kính.'],
            docVi: [
              'Từ "phủ kín mặt xung quanh" cho biết chỉ tính diện tích xung quanh, không tính hai đáy.',
              'Đề cho ĐƯỜNG KÍNH chứ không cho bán kính — đây là chỗ gài.',
            ],
            method: [
              'Đổi đường kính sang bán kính.',
              'Viết công thức trước khi thay số.',
              'Thay số, ghi đơn vị cm².',
            ],
            traps: [
              'Dùng luôn 12 làm bán kính, kết quả gấp đôi.',
              'Cộng thêm diện tích hai đáy dù đề chỉ hỏi mặt xung quanh.',
              'Quên đơn vị hoặc ghi cm thay vì cm².',
            ],
            tips: [
              'Gạch chân chữ "xung quanh" và chữ "đường kính" ngay khi đọc đề.',
              'Ước lượng: chu vi đáy khoảng 37,7 cm nhân 20 cm cho khoảng 750 cm² — đủ để phát hiện sai gấp đôi.',
            ],
            transfer:
              'Ý hình không gian thực tế 0,5 điểm gần như năm nào cũng có trong Bài II; đây là điểm dễ lấy nhất của cả bài.',
          },
        },
      ],
    },
    {
      label: 'Bài III',
      points: 2.5,
      note: 'Hệ phương trình bằng cách đặt ẩn phụ (1,0đ) và bài tương giao parabol – đường thẳng có tham số (1,5đ).',
      items: [
        {
          id: 'hn2-3-1',
          label: 'Bài III.1',
          points: 1,
          minutes: 6,
          strand: 'dai-so',
          level: 2,
          format: 'tu-luan',
          topicIds: ['ds-pt-hpt'],
          statement:
            'Giải hệ phương trình: 3/(x − 2) − 2√(y + 1) = 4 và 2/(x − 2) + √(y + 1) = 5.',
          answer: 'x = 5/2 và y = 0',
          solution: [
            'Điều kiện: x ≠ 2 và y ≥ −1.',
            'Đặt a = 1/(x − 2) và b = √(y + 1) với b ≥ 0. Hệ trở thành: 3a − 2b = 4 và 2a + b = 5.',
            'Từ phương trình thứ hai: b = 5 − 2a. Thay vào phương trình thứ nhất: 3a − 2(5 − 2a) = 4 ⇔ 3a − 10 + 4a = 4 ⇔ 7a = 14 ⇔ a = 2.',
            'Suy ra b = 5 − 2 × 2 = 1, thoả b ≥ 0.',
            'Trả về ẩn ban đầu: 1/(x − 2) = 2 ⇒ x − 2 = 1/2 ⇒ x = 5/2 (thoả x ≠ 2).',
            '√(y + 1) = 1 ⇒ y + 1 = 1 ⇒ y = 0 (thoả y ≥ −1).',
            'Vậy hệ có nghiệm duy nhất (x; y) = (5/2; 0).',
          ],
          barem: [
            { item: 'Nêu đúng điều kiện x ≠ 2 và y ≥ −1', point: 0.25 },
            { item: 'Đặt ẩn phụ và viết đúng hệ bậc nhất', point: 0.25 },
            { item: 'Giải đúng hệ theo a, b', point: 0.25 },
            { item: 'Trả về ẩn ban đầu, đối chiếu điều kiện và kết luận', point: 0.25 },
          ],
          analysis: {
            dang: 'Hệ phương trình giải bằng cách đặt ẩn phụ',
            knowledge: [
              'Điều kiện xác định của phân thức và của căn bậc hai.',
              'Giải hệ hai phương trình bậc nhất hai ẩn.',
            ],
            docVi: [
              'Hai biểu thức 1/(x − 2) và √(y + 1) lặp lại y hệt ở cả hai phương trình — dấu hiệu bắt buộc đặt ẩn phụ.',
            ],
            method: [
              'Viết điều kiện xác định TRƯỚC khi đặt ẩn phụ.',
              'Đặt ẩn phụ, nhớ kèm điều kiện của ẩn phụ (b ≥ 0).',
              'Giải hệ bậc nhất bằng phương pháp thế hoặc cộng đại số.',
              'Trả về ẩn ban đầu và đối chiếu điều kiện.',
            ],
            traps: [
              'Quên điều kiện b ≥ 0 nên nhận cả nghiệm âm của b.',
              'Giải xong hệ theo a, b rồi dừng lại, không trả về x, y.',
              'Bỏ qua dòng điều kiện — barem có riêng 0,25 điểm cho dòng này.',
            ],
            tips: [
              'Đặt ẩn phụ xong nên viết lại hệ mới ra một dòng riêng cho gọn mắt.',
              'Thử lại: 3 × 2 − 2 × 1 = 4 ✓ và 2 × 2 + 1 = 5 ✓.',
            ],
            transfer: 'Ý 1 của Bài III, 1,0 điểm và thuộc nhóm điểm chắc — không được để mất.',
          },
        },
        {
          id: 'hn2-3-2a',
          label: 'Bài III.2a',
          points: 0.5,
          minutes: 4,
          strand: 'dai-so',
          level: 2,
          format: 'tu-luan',
          topicIds: ['ds-viete'],
          statement:
            'Trong mặt phẳng toạ độ Oxy, cho parabol (P): y = x² và đường thẳng (d): y = 2x + m − 1. Tìm m để (d) cắt (P) tại hai điểm phân biệt.',
          answer: 'm > 0',
          solution: [
            'Phương trình hoành độ giao điểm: x² = 2x + m − 1 ⇔ x² − 2x − (m − 1) = 0.  (*)',
            '(d) cắt (P) tại hai điểm phân biệt khi và chỉ khi (*) có hai nghiệm phân biệt, tức Δ′ > 0.',
            "Δ′ = (−1)² + (m − 1) = 1 + m − 1 = m.",
            'Do đó điều kiện là m > 0.',
            'Vậy với mọi m > 0 thì (d) cắt (P) tại hai điểm phân biệt.',
          ],
          barem: [
            { item: 'Lập đúng phương trình hoành độ giao điểm', point: 0.25 },
            { item: 'Tính đúng Δ′ = m và kết luận m > 0', point: 0.25 },
          ],
          analysis: {
            dang: 'Điều kiện để đường thẳng cắt parabol tại hai điểm phân biệt',
            knowledge: [
              'Phương trình hoành độ giao điểm.',
              'Biệt thức thu gọn Δ′ của phương trình bậc hai.',
            ],
            docVi: ['Có tham số m trong phương trình đường thẳng và yêu cầu về số giao điểm.'],
            method: [
              'Cho hai vế bằng nhau để lập phương trình hoành độ giao điểm.',
              'Chuyển hết về một vế, viết dưới dạng chuẩn ax² + bx + c = 0.',
              'Tính Δ hoặc Δ′ rồi giải bất phương trình theo m.',
            ],
            traps: [
              'Sai dấu khi chuyển (m − 1) sang vế trái.',
              'Dùng Δ ≥ 0 trong khi đề yêu cầu hai điểm PHÂN BIỆT (phải là Δ > 0).',
              'Nhầm Δ′ với Δ, quên rằng Δ′ dùng b′ = b/2.',
            ],
            tips: [
              'Hệ số của x là −2 nên dùng Δ′ nhanh hơn Δ.',
              'Kết quả Δ′ = m rất gọn, nếu bạn ra biểu thức cồng kềnh thì gần như chắc chắn sai dấu.',
            ],
            transfer: 'Ý dẫn của bài tương giao; luôn phải làm đúng vì ý sau phụ thuộc điều kiện này.',
          },
        },
        {
          id: 'hn2-3-2b',
          label: 'Bài III.2b',
          points: 1,
          minutes: 6,
          strand: 'dai-so',
          level: 3,
          format: 'tu-luan',
          topicIds: ['ds-viete'],
          statement:
            'Với điều kiện tìm được ở ý a, gọi x₁, x₂ là hoành độ hai giao điểm của (d) và (P). Tìm m để x₁² + x₂² = 10.',
          answer: 'm = 4',
          solution: [
            'Theo ý a, phương trình hoành độ giao điểm là x² − 2x − (m − 1) = 0 với điều kiện m > 0.',
            'Theo định lí Viète: x₁ + x₂ = 2 và x₁x₂ = −(m − 1) = 1 − m.',
            'Biến đổi biểu thức đối xứng: x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂ = 4 − 2(1 − m) = 4 − 2 + 2m = 2 + 2m.',
            'Yêu cầu x₁² + x₂² = 10 nên 2 + 2m = 10 ⇔ 2m = 8 ⇔ m = 4.',
            'Đối chiếu điều kiện m > 0: m = 4 thoả mãn.',
            'Vậy m = 4.',
          ],
          barem: [
            { item: 'Nhắc lại điều kiện m > 0 từ ý a', point: 0.25 },
            { item: 'Viết đúng hệ thức Viète cho phương trình có hệ số chứa tham số', point: 0.25 },
            { item: 'Biến đổi đúng x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂ và thay số', point: 0.25 },
            { item: 'Giải ra m = 4 và đối chiếu điều kiện', point: 0.25 },
          ],
          analysis: {
            dang: 'Hệ thức đối xứng giữa hai nghiệm, xử lý bằng định lí Viète',
            knowledge: [
              'Định lí Viète.',
              'Hằng đẳng thức x₁² + x₂² = S² − 2P.',
              'Điều kiện để phương trình có hai nghiệm.',
            ],
            docVi: [
              'Biểu thức x₁² + x₂² giữ nguyên khi đổi chỗ hai nghiệm — đây là hệ thức ĐỐI XỨNG, nên viết được theo S và P.',
            ],
            method: [
              'Nhắc lại điều kiện có hai nghiệm từ ý trước.',
              'Viết S và P theo tham số.',
              'Biến đổi biểu thức đối xứng về theo S và P.',
              'Giải phương trình theo m rồi đối chiếu điều kiện.',
            ],
            traps: [
              'Quên dấu trừ khi viết P = −(m − 1); rất nhiều bài mất trọn điểm vì chỗ này.',
              'Nhớ nhầm x₁² + x₂² = S² + 2P.',
              'Không đối chiếu điều kiện m > 0 ở bước cuối — barem trừ điểm dù m đúng.',
            ],
            tips: [
              'Viết riêng một dòng "S = …, P = …" trước khi biến đổi, để không lẫn dấu.',
              'Thử lại với m = 4: phương trình là x² − 2x + 3 = 0? Không — là x² − 2x − 3 = 0, có nghiệm 3 và −1, và 9 + 1 = 10 ✓.',
            ],
            transfer:
              'Ý chốt của Bài III, 1,0 điểm; đây là ranh giới giữa nhóm 8 điểm và nhóm 9 điểm.',
          },
        },
      ],
    },
    {
      label: 'Bài IV',
      points: 3,
      note: 'Hình học phẳng với đường tròn — 3 ý tăng dần, ý 3 là chốt chặn 9 điểm.',
      items: [
        {
          id: 'hn2-4-1',
          label: 'Bài IV.1',
          points: 1,
          minutes: 10,
          strand: 'hinh-hoc',
          level: 2,
          format: 'tu-luan',
          topicIds: ['hh-duong-tron-co-ban'],
          statement:
            'Cho đường tròn (O) và điểm A nằm ngoài đường tròn. Từ A kẻ hai tiếp tuyến AB, AC tới (O) (B, C là hai tiếp điểm) và một cát tuyến ADE không đi qua O (D nằm giữa A và E). Chứng minh bốn điểm A, B, O, C cùng thuộc một đường tròn.',
          answer: 'Tứ giác ABOC nội tiếp đường tròn đường kính AO',
          solution: [
            'Vẽ hình: đường tròn (O), điểm A ngoài đường tròn, hai tiếp tuyến AB và AC, cát tuyến ADE.',
            'Vì AB là tiếp tuyến của (O) tại B nên AB ⊥ OB, do đó góc ABO = 90°.',
            'Tương tự, AC là tiếp tuyến tại C nên AC ⊥ OC, do đó góc ACO = 90°.',
            'Xét tứ giác ABOC có góc ABO + góc ACO = 90° + 90° = 180°.',
            'Hai góc này ở vị trí đối nhau trong tứ giác ABOC, nên tứ giác ABOC nội tiếp một đường tròn.',
            'Hơn nữa, vì hai góc ABO và ACO đều bằng 90° nên B và C cùng nhìn đoạn AO dưới góc vuông; do đó bốn điểm A, B, O, C cùng thuộc đường tròn đường kính AO.',
          ],
          barem: [
            { item: 'Vẽ hình đúng đến ý 1', point: 0.25 },
            { item: 'Chỉ ra góc ABO = 90° có lập luận (tính chất tiếp tuyến)', point: 0.25 },
            { item: 'Chỉ ra góc ACO = 90°', point: 0.25 },
            { item: 'Kết luận tứ giác nội tiếp bằng dấu hiệu tổng hai góc đối bằng 180°', point: 0.25 },
          ],
          analysis: {
            dang: 'Chứng minh tứ giác nội tiếp bằng tổng hai góc đối',
            knowledge: [
              'Tiếp tuyến vuông góc với bán kính tại tiếp điểm.',
              'Dấu hiệu nhận biết tứ giác nội tiếp: tổng hai góc đối bằng 180°.',
              'Quỹ tích cung chứa góc 90°.',
            ],
            docVi: [
              'Đề có hai tiếp tuyến kẻ từ một điểm ngoài đường tròn — gần như chắc chắn ý đầu là chứng minh tứ giác nội tiếp.',
              'Bốn điểm cần chứng minh gồm tâm O và hai tiếp điểm.',
            ],
            method: [
              'Vẽ hình chính xác, ký hiệu đầy đủ.',
              'Dùng tính chất tiếp tuyến để có hai góc vuông.',
              'Cộng hai góc đối và kết luận theo dấu hiệu.',
              'Nêu thêm đường tròn đường kính AO — sẽ dùng lại ở ý sau.',
            ],
            traps: [
              'Nói "vì AB là tiếp tuyến nên góc ABO = 90°" mà không nêu tính chất — barem đòi lập luận.',
              'Cộng hai góc KHÔNG đối nhau rồi kết luận.',
              'Vẽ hình sai vị trí D và E trên cát tuyến, gây rối cho ý 2 và ý 3.',
            ],
            tips: [
              'Dành đúng 3 phút vẽ hình cho cả Bài IV; hình sai thì cả ba ý đều hỏng.',
              'Ghi ngay "đường tròn đường kính AO" vào hình — ý 3 sẽ cần đến nó.',
            ],
            transfer: 'Ý 1 Bài IV, 1,0 điểm, thuộc nhóm điểm bắt buộc phải có với mọi học sinh mục tiêu 8+.',
          },
        },
        {
          id: 'hn2-4-2',
          label: 'Bài IV.2',
          points: 1,
          minutes: 12,
          strand: 'hinh-hoc',
          level: 3,
          format: 'tu-luan',
          topicIds: ['hh-duong-tron-co-ban', 'hh-he-thuc-luong'],
          statement: 'Với giả thiết ở ý 1, chứng minh rằng AB² = AD · AE.',
          answer: 'AB² = AD · AE (qua hai tam giác đồng dạng ABD và AEB)',
          solution: [
            'Xét tam giác ABD và tam giác AEB.',
            'Hai tam giác có chung góc A (góc BAD và góc BAE là cùng một góc, vì D nằm giữa A và E trên cát tuyến).',
            'Góc ABD là góc tạo bởi tiếp tuyến AB và dây cung BD của đường tròn (O), nên bằng góc nội tiếp BED chắn cung BD, tức góc ABD = góc AEB.',
            'Do đó tam giác ABD đồng dạng với tam giác AEB (góc – góc).',
            'Suy ra tỉ số đồng dạng: AB/AE = AD/AB.',
            'Nhân chéo: AB² = AD · AE. Điều phải chứng minh.',
          ],
          barem: [
            { item: 'Chỉ ra hai tam giác cần xét và góc A chung', point: 0.25 },
            { item: 'Chứng minh góc ABD = góc AEB bằng tính chất góc tạo bởi tiếp tuyến và dây cung', point: 0.5 },
            { item: 'Kết luận đồng dạng, lập tỉ số và suy ra hệ thức', point: 0.25 },
          ],
          analysis: {
            dang: 'Hệ thức lượng trong đường tròn qua hai tam giác đồng dạng (phương tích của điểm)',
            knowledge: [
              'Góc tạo bởi tiếp tuyến và dây cung bằng góc nội tiếp chắn cung đó.',
              'Trường hợp đồng dạng góc – góc.',
              'Cách viết tỉ số đồng dạng theo đúng thứ tự đỉnh.',
            ],
            docVi: [
              'Đề yêu cầu chứng minh một tích hai đoạn thẳng bằng bình phương một đoạn — dấu hiệu chắc chắn của đồng dạng.',
              'Ba đoạn AB, AD, AE cùng xuất phát từ A, gợi ý ngay hai tam giác có chung góc A.',
            ],
            method: [
              'Xác định hai tam giác: đỉnh chung A, hai cạnh còn lại chứa các đoạn trong hệ thức.',
              'Tìm cặp góc bằng nhau thứ hai — thường là góc tiếp tuyến – dây cung.',
              'Viết tỉ số đồng dạng theo đúng thứ tự đỉnh tương ứng.',
              'Nhân chéo để ra hệ thức.',
            ],
            traps: [
              'Viết tam giác ABD đồng dạng với tam giác ABE (sai thứ tự đỉnh), dẫn tới tỉ số sai.',
              'Nói góc ABD = góc AEB mà không nêu vì sao — mất 0,5 điểm, tức nửa ý.',
              'Nhầm cung bị chắn, dùng cung BE thay vì cung BD.',
            ],
            tips: [
              'Mẹo viết đúng thứ tự: đỉnh chung viết trước, rồi đi theo cặp góc bằng nhau vừa chứng minh.',
              'Hệ thức AB² = AD · AE chính là phương tích của điểm A với đường tròn — nhớ tên gọi này để nhận dạng nhanh ở đề chuyên.',
            ],
            transfer:
              'Ý 2 Bài IV, 1,0 điểm; cũng là bước lót bắt buộc cho ý 3, nên không được bỏ qua kể cả khi thiếu thời gian.',
          },
        },
        {
          id: 'hn2-4-3',
          label: 'Bài IV.3',
          points: 1,
          minutes: 12,
          strand: 'hinh-hoc',
          level: 4,
          format: 'tu-luan',
          topicIds: ['hh-duong-tron-co-ban', 'hh-he-thuc-luong'],
          statement:
            'Với giả thiết ở ý 1, gọi H là giao điểm của AO và BC. Chứng minh rằng bốn điểm D, H, O, E cùng thuộc một đường tròn.',
          answer: 'Tứ giác DHOE nội tiếp (chứng minh qua AH · AO = AD · AE)',
          solution: [
            'Vì AB = AC (hai tiếp tuyến cùng xuất phát từ A) và OB = OC (bán kính) nên AO là đường trung trực của BC, do đó AO ⊥ BC tại H.',
            'Xét tam giác ABO vuông tại B (đã chứng minh ở ý 1) có BH là đường cao ứng với cạnh huyền AO.',
            'Theo hệ thức lượng trong tam giác vuông: AB² = AH · AO.',
            'Kết hợp với kết quả ý 2 là AB² = AD · AE, ta được AH · AO = AD · AE.',
            'Suy ra AH/AE = AD/AO.',
            'Xét tam giác AHD và tam giác AEO: hai tam giác có chung góc A và có AH/AE = AD/AO, nên đồng dạng theo trường hợp cạnh – góc – cạnh.',
            'Do đó góc AHD = góc AEO, tức góc AHD = góc DEO.',
            'Góc AHD là góc ngoài tại đỉnh H của tứ giác DHOE, và nó bằng góc trong tại đỉnh đối diện E. Theo dấu hiệu nhận biết, tứ giác DHOE nội tiếp.',
            'Vậy bốn điểm D, H, O, E cùng thuộc một đường tròn.',
          ],
          barem: [
            { item: 'Chứng minh AO ⊥ BC tại H', point: 0.25 },
            { item: 'Áp dụng hệ thức lượng để có AB² = AH · AO', point: 0.25 },
            { item: 'Ghép với ý 2 để có AH · AO = AD · AE và suy ra hai tam giác đồng dạng', point: 0.25 },
            { item: 'Kết luận tứ giác DHOE nội tiếp bằng dấu hiệu góc ngoài bằng góc trong đối diện', point: 0.25 },
          ],
          analysis: {
            dang: 'Chứng minh bốn điểm đồng viên bằng cách ghép hai hệ thức tích',
            knowledge: [
              'Tính chất hai tiếp tuyến cắt nhau và đường trung trực.',
              'Hệ thức lượng trong tam giác vuông: cạnh góc vuông bình phương bằng cạnh huyền nhân hình chiếu.',
              'Đồng dạng cạnh – góc – cạnh.',
              'Dấu hiệu tứ giác nội tiếp: góc ngoài tại một đỉnh bằng góc trong tại đỉnh đối diện.',
            ],
            docVi: [
              'Ý 2 đã cho một hệ thức tích; ý 3 xuất hiện thêm điểm H trên AO — dấu hiệu rất rõ rằng phải tạo hệ thức tích thứ hai rồi ghép lại.',
              'Điểm H là chân đường cao của tam giác vuông ABO, đó là lý do H xuất hiện trong đề.',
            ],
            method: [
              'Chứng minh AO ⊥ BC để có tam giác vuông và đường cao.',
              'Viết hệ thức lượng cho tam giác vuông ABO.',
              'Ghép với hệ thức của ý 2 để được đẳng thức tích.',
              'Chuyển đẳng thức tích thành tỉ số, suy ra đồng dạng.',
              'Từ cặp góc bằng nhau, kết luận tứ giác nội tiếp.',
            ],
            traps: [
              'Bỏ qua bước chứng minh AO ⊥ BC, coi như hiển nhiên — mất 0,25 điểm.',
              'Viết tỉ số sai thứ tự khi chuyển từ AH · AO = AD · AE, dẫn tới không dùng được góc A chung.',
              'Kết luận nội tiếp bằng dấu hiệu tổng hai góc đối trong khi lập luận lại đi theo góc ngoài.',
              'Vẽ hình sai làm H nằm ngoài đoạn AO.',
            ],
            tips: [
              'Chiến lược chung của ý 3 Bài IV: khi ý 2 cho một hệ thức tích, hãy đi tìm hệ thức tích thứ hai có chung một vế.',
              'Nếu hết thời gian, vẫn viết được bước AO ⊥ BC và hệ thức AB² = AH · AO là đã có 0,5 điểm.',
            ],
            transfer:
              'Ý chốt của Bài IV, 1,0 điểm — đây là ranh giới thật giữa 9 điểm và 10 điểm trong đề vào 10 Hà Nội.',
          },
        },
      ],
    },
    {
      label: 'Bài V',
      points: 0.5,
      note: 'Bất đẳng thức / cực trị — 0,5 điểm quyết định điểm 10.',
      items: [
        {
          id: 'hn2-5-1',
          label: 'Bài V',
          points: 0.5,
          minutes: 10,
          strand: 'bat-dang-thuc',
          level: 4,
          format: 'tu-luan',
          topicIds: ['bdt-co-ban'],
          statement:
            'Cho hai số dương a, b thoả mãn a + b = 2. Tìm giá trị nhỏ nhất của biểu thức P = 1/a + 1/b.',
          answer: 'P nhỏ nhất bằng 2, đạt được khi a = b = 1',
          solution: [
            'Với a > 0, b > 0 ta có P = 1/a + 1/b = (a + b)/(ab) = 2/(ab) (do a + b = 2).',
            'Theo bất đẳng thức AM–GM cho hai số dương: ab ≤ ((a + b)/2)² = (2/2)² = 1.',
            'Vì ab > 0 và ab ≤ 1 nên 2/(ab) ≥ 2/1 = 2, tức P ≥ 2.',
            'Dấu bằng xảy ra khi và chỉ khi a = b; kết hợp a + b = 2 ta được a = b = 1.',
            'Thử lại: với a = b = 1 thì P = 1 + 1 = 2 ✓.',
            'Vậy giá trị nhỏ nhất của P là 2, đạt được khi a = b = 1.',
          ],
          barem: [
            { item: 'Biến đổi P về dạng 2/(ab) và đánh giá ab ≤ 1', point: 0.25 },
            { item: 'Kết luận P ≥ 2 kèm điều kiện dấu bằng a = b = 1', point: 0.25 },
          ],
          analysis: {
            dang: 'Cực trị với ràng buộc tổng không đổi',
            knowledge: [
              'Bất đẳng thức AM–GM cho hai số dương.',
              'Hệ quả: tổng không đổi thì tích lớn nhất khi hai số bằng nhau.',
              'Quy tắc trình bày bài cực trị: đánh giá + dấu bằng + kết luận.',
            ],
            docVi: [
              'Ràng buộc là một TỔNG cố định và biểu thức cần tối ưu chứa nghịch đảo — dấu hiệu quy về tích ab.',
              'Biểu thức đối xứng theo a và b, nên dấu bằng gần như chắc chắn ở a = b.',
            ],
            method: [
              'Quy đồng P để đưa ràng buộc a + b = 2 vào tử.',
              'Đánh giá ab bằng AM–GM để chặn mẫu.',
              'Đảo chiều bất đẳng thức khi lấy nghịch đảo (chú ý ab > 0).',
              'Tìm điều kiện dấu bằng và thử lại.',
            ],
            traps: [
              'Quên đảo chiều khi lấy nghịch đảo của ab ≤ 1.',
              'Kết luận giá trị nhỏ nhất mà không chỉ ra dấu bằng xảy ra khi nào — barem trừ điểm.',
              'Áp dụng AM–GM khi chưa nêu điều kiện a, b dương.',
            ],
            tips: [
              'Với Bài V, luôn viết đủ ba dòng: đánh giá, dấu bằng, kết luận. Thiếu dòng nào mất điểm dòng đó.',
              'Nếu chỉ còn 2 phút, viết được dòng đánh giá cũng đã có 0,25 điểm.',
            ],
            transfer:
              'Bài V 0,5 điểm là câu quyết định điểm 10 của đề vào 10 Hà Nội; nhóm Bứt phá bắt buộc phải lấy trọn.',
          },
        },
      ],
    },
  ],
  gradingNotes: [
    'Thiếu điều kiện xác định ở Bài I hoặc Bài III trừ 0,25 điểm của ý tương ứng, kể cả khi kết quả đúng.',
    'Bài II bắt buộc có dòng đặt ẩn kèm đơn vị và điều kiện; thiếu trừ 0,25 điểm.',
    'Bài IV không vẽ hình hoặc vẽ hình sai bản chất thì không chấm phần chứng minh tương ứng.',
    'Bài V thiếu điều kiện dấu bằng chỉ được tối đa 0,25 điểm.',
    'Học sinh có cách giải khác đúng vẫn cho điểm tối đa theo các mốc tương ứng của barem.',
  ],
  timePlan: [
    { phase: 'Đọc đề & phân loại', minutes: '0–3', action: 'Đọc lướt cả 5 bài, đánh dấu ý dễ/khó, quyết định thứ tự làm.' },
    { phase: 'Bài I → Bài II', minutes: '3–33', action: 'Gom 4,0 điểm chắc nhất. Bài I xong trước phút 15.' },
    { phase: 'Bài III', minutes: '33–49', action: 'Hệ đặt ẩn phụ rồi tương giao; nhớ đối chiếu điều kiện m ở ý cuối.' },
    { phase: 'Bài IV', minutes: '49–83', action: 'Vẽ hình 3 phút, làm ý 1 và ý 2 cho sạch; ý 3 chỉ vào khi hai ý đầu đã xong.' },
    { phase: 'Bài V + soát', minutes: '83–90', action: 'Viết đánh giá và dấu bằng của Bài V; soát ĐKXĐ và kết luận toàn bài.' },
  ],
  scoreBands: [
    {
      band: 'Dưới 6,0',
      meaning: 'Chưa chắc Bài I và Bài II — hai bài chiếm 4,0 điểm dễ nhất của đề.',
      next: 'Quay về Giai đoạn 1: căn thức và giải bài toán bằng cách lập phương trình, cho tới khi làm đúng 10/10 bài liên tiếp.',
    },
    {
      band: '6,0 – 7,5',
      meaning: 'Bốn điểm đầu đã ổn, mất điểm ở Bài III ý cuối và ý 2 Bài IV.',
      next: 'Giai đoạn 2: Viète và tứ giác nội tiếp; mỗi tuần một đề tính giờ, chấm theo barem thật.',
    },
    {
      band: '7,5 – 9,0',
      meaning: 'Chỉ còn hụt ở ý 3 Bài IV và Bài V — đúng nhóm câu phân hoá của đề.',
      next: 'Giai đoạn 3: kỹ thuật ghép hai hệ thức tích trong hình học và các mô hình bất đẳng thức hai biến.',
    },
    {
      band: 'Trên 9,0',
      meaning: 'Đã ở nhóm mục tiêu 9–10. Khoảng cách còn lại là tốc độ và độ sạch của phần trình bày.',
      next: 'Giai đoạn 4: hai đề tính giờ mỗi tuần, đặt mục tiêu xong Bài IV trước phút 80 để có trọn 10 phút cho Bài V.',
    },
  ],
};
