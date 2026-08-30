import type { TrackId } from '@/types';

/**
 * ĐỀ CƯƠNG ÔN TẬP THEO KỲ — LUỒNG CHÍNH KHOÁ
 *
 * Mỗi đề cương trả lời trọn vẹn năm câu hỏi mà một học sinh nhắm 9–10 điểm cần
 * biết trước khi ngồi vào bàn ôn:
 *   1. Kỳ này thi những gì (phạm vi) và tỉ trọng ra sao (ma trận bốn mức độ).
 *   2. Bản đồ kiến thức của kỳ trông như thế nào (sơ đồ tư duy).
 *   3. Có bao nhiêu dạng bài, mỗi dạng đọc vị bằng dấu hiệu nào (sơ đồ đọc vị).
 *   4. Ôn theo trình tự nào, mỗi tuần ra sản phẩm gì (kế hoạch tuần).
 *   5. Trước hôm kiểm tra, tự kiểm bằng danh mục nào (checklist).
 *
 * Ma trận ở đây là ma trận THAM CHIẾU dựng theo Thông tư 22/2021/TT-BGDĐT và
 * mặt bằng chung của đề kiểm tra định kỳ, KHÔNG phải ma trận chính thức của
 * một trường cụ thể. Mỗi trường tự ra đề, nên hãy đối chiếu với ma trận do tổ
 * chuyên môn của trường công bố trước khi dùng làm kế hoạch ôn.
 */

export type SyllabusTerm =
  | 'giua-ky-1'
  | 'cuoi-ky-1'
  | 'giua-ky-2'
  | 'cuoi-ky-2'
  | 'ca-nam'
  | 'on-he';

export const TERM_LABEL: Record<SyllabusTerm, { label: string; short: string; color: string }> = {
  'giua-ky-1': { label: 'Đề cương giữa học kỳ I', short: 'Giữa kỳ I', color: '#0d9488' },
  'cuoi-ky-1': { label: 'Đề cương cuối học kỳ I', short: 'Cuối kỳ I', color: '#1B4F9C' },
  'giua-ky-2': { label: 'Đề cương giữa học kỳ II', short: 'Giữa kỳ II', color: '#7c3aed' },
  'cuoi-ky-2': { label: 'Đề cương cuối học kỳ II', short: 'Cuối kỳ II', color: '#E01B24' },
  'ca-nam': { label: 'Đề cương tổng ôn cả năm', short: 'Cả năm', color: '#b45309' },
  'on-he': { label: 'Đề cương ôn hè bắc cầu', short: 'Ôn hè', color: '#F0A21B' },
};

/** Một dòng ma trận: tỉ trọng điểm theo bốn mức độ nhận thức. */
export interface SyllabusRow {
  /** Tên chương hoặc chủ đề theo sách giáo khoa. */
  topic: string;
  /** Mã chuyên đề trong hệ thống, nếu có, để nối sang bộ phiếu luyện. */
  topicId?: string;
  /** Điểm dành cho từng mức, tổng bốn cột của toàn bảng bằng 10. */
  nhanBiet: number;
  thongHieu: number;
  vanDung: number;
  vanDungCao: number;
}

/** Một dạng bài trọng tâm, kèm cách đọc vị và quy trình xử lý. */
export interface SyllabusType {
  name: string;
  /** Dấu hiệu trong đề để nhận ra dạng này. */
  docVi: string[];
  /** Quy trình giải chuẩn. */
  method: string[];
  /** Bẫy mất điểm điển hình. */
  trap: string;
  /** Mức độ nhận thức mà dạng này thường rơi vào. */
  muc: 'nhan-biet' | 'thong-hieu' | 'van-dung' | 'van-dung-cao';
}

/** Một nhánh của sơ đồ tư duy tổng hợp kiến thức. */
export interface MindBranch {
  branch: string;
  nodes: string[];
  /** Câu chốt: nhánh này dùng để làm gì trong đề. */
  useFor: string;
}

export interface Syllabus {
  id: string;
  track: TrackId;
  grade: 6 | 7 | 8 | 9 | 10 | 11 | 12;
  term: SyllabusTerm;
  title: string;
  /** Thời lượng bài kiểm tra tương ứng. */
  minutes: number;
  format: string;
  /** Phạm vi kiến thức — viết theo chương của sách giáo khoa. */
  scope: string[];
  matrix: SyllabusRow[];
  /** Công thức và định lí phải thuộc lòng, không tra cứu. */
  mustKnow: string[];
  keyTypes: SyllabusType[];
  mindmap: MindBranch[];
  /** Kế hoạch ôn theo tuần, mỗi tuần có sản phẩm kiểm chứng được. */
  plan: { week: string; focus: string; output: string }[];
  /** Danh mục tự kiểm trước hôm kiểm tra. */
  selfCheck: string[];
  /** Ngưỡng điểm và việc cần làm tương ứng. */
  targets: { band: string; meaning: string; next: string }[];
}

const sumMatrix = (rows: SyllabusRow[]) =>
  rows.reduce((s, r) => s + r.nhanBiet + r.thongHieu + r.vanDung + r.vanDungCao, 0);

export const SYLLABI: Syllabus[] = [
  /* ==================== LỚP 10 ==================== */
  {
    id: 'sy-10-gk1',
    track: 'chinh-khoa',
    grade: 10,
    term: 'giua-ky-1',
    title: 'Toán 10 — Đề cương giữa học kỳ I',
    minutes: 60,
    format: 'Trắc nghiệm nhiều lựa chọn + đúng/sai + tự luận · thang 10',
    scope: [
      'Chương I — Mệnh đề và tập hợp: mệnh đề, mệnh đề chứa biến, lượng từ, mệnh đề phủ định, tập hợp và các phép toán trên tập hợp.',
      'Chương II — Bất phương trình và hệ bất phương trình bậc nhất hai ẩn: biểu diễn miền nghiệm, bài toán tối ưu đơn giản.',
      'Chương III — Hệ thức lượng trong tam giác: định lí côsin, định lí sin, các công thức diện tích, giải tam giác.',
    ],
    matrix: [
      { topic: 'Mệnh đề và tập hợp', topicId: 'q10-menh-de-tap-hop', nhanBiet: 1, thongHieu: 1, vanDung: 0.5, vanDungCao: 0 },
      { topic: 'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn', nhanBiet: 0.5, thongHieu: 1, vanDung: 1, vanDungCao: 0.5 },
      { topic: 'Hệ thức lượng trong tam giác', topicId: 'q10-he-thuc-luong', nhanBiet: 1, thongHieu: 1.5, vanDung: 1.5, vanDungCao: 0.5 },
    ],
    mustKnow: [
      'Phủ định của "∀x, P(x)" là "∃x, ¬P(x)" và ngược lại.',
      'A \\ B = {x | x ∈ A và x ∉ B}; A ∩ B, A ∪ B trên trục số.',
      'Định lí côsin: a² = b² + c² − 2bc·cos A.',
      'Định lí sin: a/sin A = b/sin B = c/sin C = 2R.',
      'Bốn công thức diện tích tam giác: (1/2)a·hₐ, (1/2)ab·sin C, abc/(4R), p·r, và công thức Heron √[p(p−a)(p−b)(p−c)].',
    ],
    keyTypes: [
      {
        name: 'Phủ định mệnh đề chứa lượng từ',
        docVi: ['Đề có ký hiệu ∀ hoặc ∃.', 'Yêu cầu "viết mệnh đề phủ định" hoặc "xét tính đúng sai".'],
        method: [
          'Đổi ∀ thành ∃ và ngược lại.',
          'Phủ định phần kết luận: > thành ≤, = thành ≠, chia hết thành không chia hết.',
          'Xét đúng sai bằng cách tìm một phản ví dụ (với ∀) hoặc một ví dụ (với ∃).',
        ],
        trap: 'Chỉ đổi lượng từ mà quên phủ định phần kết luận, hoặc ngược lại.',
        muc: 'thong-hieu',
      },
      {
        name: 'Các phép toán trên tập hợp số',
        docVi: ['Đề cho các tập dạng khoảng, đoạn, nửa khoảng.', 'Yêu cầu tìm A ∩ B, A ∪ B, A \\ B hoặc phần bù.'],
        method: [
          'Vẽ trục số, tô hai tập bằng hai màu hoặc hai nét khác nhau.',
          'Đọc kết quả trực tiếp từ hình, không suy luận trong đầu.',
          'Kiểm tra kỹ hai đầu mút: ngoặc tròn hay ngoặc vuông.',
        ],
        trap: 'Sai ở đầu mút — đây là chỗ mất điểm nhiều nhất của cả chương.',
        muc: 'thong-hieu',
      },
      {
        name: 'Bài toán tối ưu với miền nghiệm',
        docVi: ['Bài văn về sản xuất, pha trộn, phân bổ nguồn lực.', 'Có nhiều ràng buộc dạng bất phương trình bậc nhất hai ẩn.'],
        method: [
          'Đặt ẩn kèm đơn vị và điều kiện không âm.',
          'Viết hệ bất phương trình từ các ràng buộc.',
          'Vẽ miền nghiệm, xác định các đỉnh của miền.',
          'Tính giá trị hàm mục tiêu tại từng đỉnh và chọn giá trị lớn nhất hoặc nhỏ nhất.',
        ],
        trap: 'Quên điều kiện x ≥ 0, y ≥ 0 nên miền nghiệm sai và đỉnh cũng sai theo.',
        muc: 'van-dung',
      },
      {
        name: 'Giải tam giác bằng định lí côsin và định lí sin',
        docVi: [
          'Cho hai cạnh và góc xen giữa ⇒ dùng định lí côsin.',
          'Cho một cạnh và hai góc, hoặc hai cạnh và góc đối diện ⇒ dùng định lí sin.',
        ],
        method: [
          'Vẽ hình và ghi mọi dữ kiện đã biết lên hình.',
          'Chọn định lí theo bộ dữ kiện, không chọn theo thói quen.',
          'Tính đại lượng đề hỏi, rồi kiểm tra tính hợp lý (cạnh lớn đối góc lớn).',
        ],
        trap: 'Máy tính để ở chế độ radian; hoặc dùng định lí sin trong trường hợp có hai nghiệm mà chỉ lấy một.',
        muc: 'van-dung',
      },
      {
        name: 'Bài toán thực tế đo khoảng cách không tới được',
        docVi: ['Bối cảnh đo chiều cao núi, khoảng cách hai bờ sông, vị trí tàu thuyền.', 'Có góc quan sát và một đoạn đo được.'],
        method: [
          'Mô hình hoá thành tam giác, gắn tên đỉnh.',
          'Xác định bộ dữ kiện có được, chọn định lí tương ứng.',
          'Giải và làm tròn đúng yêu cầu, ghi đơn vị.',
        ],
        trap: 'Mô hình hoá sai vị trí góc, khiến toàn bộ phần tính toán phía sau vô nghĩa dù làm đúng công thức.',
        muc: 'van-dung-cao',
      },
    ],
    mindmap: [
      {
        branch: 'Ngôn ngữ toán học',
        nodes: ['Mệnh đề và mệnh đề chứa biến', 'Lượng từ ∀ và ∃', 'Phủ định', 'Điều kiện cần và đủ'],
        useFor: 'Dùng để đọc đúng đề bài ở mọi chương sau; sai ngôn ngữ là sai từ bước đọc đề.',
      },
      {
        branch: 'Tập hợp',
        nodes: ['Tập con và tập bằng nhau', 'Giao, hợp, hiệu, phần bù', 'Các tập con của ℝ trên trục số'],
        useFor: 'Dùng để viết tập nghiệm và tập xác định trong toàn bộ chương trình lớp 10 – 12.',
      },
      {
        branch: 'Bất phương trình bậc nhất hai ẩn',
        nodes: ['Miền nghiệm của một bất phương trình', 'Miền nghiệm của hệ', 'Bài toán tối ưu tại đỉnh'],
        useFor: 'Dùng cho nhóm câu vận dụng thực tế; cũng là nền của quy hoạch tuyến tính sau này.',
      },
      {
        branch: 'Hệ thức lượng trong tam giác',
        nodes: ['Định lí côsin', 'Định lí sin và bán kính R', 'Bốn công thức diện tích', 'Giải tam giác'],
        useFor: 'Chiếm tỉ trọng lớn nhất của bài giữa kỳ I và là công cụ cho hình học toạ độ ở kỳ II.',
      },
    ],
    plan: [
      { week: 'Tuần 1', focus: 'Mệnh đề, tập hợp và các phép toán trên trục số', output: 'Tự làm đúng 20/20 câu về đầu mút khoảng – đoạn, không nhìn vở.' },
      { week: 'Tuần 2', focus: 'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn', output: 'Giải trọn hai bài toán tối ưu thực tế, có vẽ miền nghiệm.' },
      { week: 'Tuần 3', focus: 'Định lí côsin, định lí sin và các công thức diện tích', output: 'Viết lại toàn bộ 5 công thức diện tích ra giấy trắng trong 2 phút.' },
      { week: 'Tuần 4', focus: 'Giải tam giác và bài toán thực tế đo đạc', output: 'Một đề tự luyện 60 phút đúng ma trận, tự chấm theo barem.' },
    ],
    selfCheck: [
      'Viết được phủ định của một mệnh đề có ∀ và một mệnh đề có ∃ mà không cần nghĩ quá 10 giây.',
      'Tìm được A ∩ B, A ∪ B, A \\ B của hai khoảng bất kỳ và trả lời đúng ngoặc ở hai đầu mút.',
      'Vẽ được miền nghiệm của một hệ bốn bất phương trình và chỉ ra đủ các đỉnh.',
      'Nêu được với bộ dữ kiện nào thì dùng định lí côsin, bộ nào thì dùng định lí sin.',
      'Viết được cả 5 công thức diện tích tam giác từ trí nhớ.',
      'Máy tính đang ở chế độ độ (DEG), đã kiểm tra trước khi vào phòng.',
    ],
    targets: [
      { band: 'Dưới 6,5', meaning: 'Hổng ở chương I hoặc chương III, thường là ở đầu mút tập hợp và chọn sai định lí.', next: 'Làm lại toàn bộ ví dụ sách giáo khoa của hai chương này trước khi động vào đề.' },
      { band: '6,5 – 8,0', meaning: 'Nắm được lý thuyết, mất điểm ở câu vận dụng thực tế.', next: 'Mỗi ngày một bài toán thực tế: một bài tối ưu hoặc một bài đo đạc.' },
      { band: '8,0 – 9,0', meaning: 'Chỉ còn hụt ở câu vận dụng cao và tốc độ.', next: 'Luyện đề tính giờ, đặt mục tiêu xong phần trắc nghiệm trong 20 phút.' },
      { band: 'Trên 9,0', meaning: 'Đã ở nhóm Top 1. Rủi ro còn lại là lỗi vặt.', next: 'Quy trình soát bài 5 phút cuối; giữ điểm hệ số 1 tuyệt đối.' },
    ],
  },
  {
    id: 'sy-10-ck1',
    track: 'chinh-khoa',
    grade: 10,
    term: 'cuoi-ky-1',
    title: 'Toán 10 — Đề cương cuối học kỳ I',
    minutes: 90,
    format: 'Trắc nghiệm nhiều lựa chọn + đúng/sai + trả lời ngắn + tự luận · thang 10',
    scope: [
      'Toàn bộ phạm vi giữa kỳ I: mệnh đề – tập hợp, bất phương trình bậc nhất hai ẩn, hệ thức lượng trong tam giác.',
      'Chương IV — Vectơ: các phép toán vectơ, tích vô hướng, ứng dụng vào chứng minh và tính toán.',
      'Chương V — Thống kê: số gần đúng và sai số, các số đặc trưng đo xu thế trung tâm (số trung bình, trung vị, tứ phân vị, mốt).',
    ],
    matrix: [
      { topic: 'Mệnh đề, tập hợp, bất phương trình hai ẩn', topicId: 'q10-menh-de-tap-hop', nhanBiet: 0.5, thongHieu: 0.5, vanDung: 0.5, vanDungCao: 0 },
      { topic: 'Hệ thức lượng trong tam giác', topicId: 'q10-he-thuc-luong', nhanBiet: 0.5, thongHieu: 1, vanDung: 0.5, vanDungCao: 0.5 },
      { topic: 'Vectơ và tích vô hướng', topicId: 'q10-vecto', nhanBiet: 1, thongHieu: 1.5, vanDung: 1, vanDungCao: 0.5 },
      { topic: 'Thống kê: số gần đúng và xu thế trung tâm', nhanBiet: 1, thongHieu: 0.5, vanDung: 0.5, vanDungCao: 0 },
    ],
    mustKnow: [
      'Quy tắc ba điểm: AB→ + BC→ = AC→; quy tắc hình bình hành; quy tắc trừ OB→ − OA→ = AB→.',
      'Điều kiện hai vectơ cùng phương: tồn tại k sao cho u→ = k·v→.',
      'Tích vô hướng: u→·v→ = |u→|·|v→|·cos(u→, v→) = x₁x₂ + y₁y₂.',
      'Hai vectơ vuông góc ⟺ tích vô hướng bằng 0.',
      'Công thức trung điểm và trọng tâm theo toạ độ.',
      'Trung vị của mẫu n giá trị: nếu n lẻ lấy giá trị chính giữa, nếu n chẵn lấy trung bình hai giá trị giữa.',
    ],
    keyTypes: [
      {
        name: 'Phân tích một vectơ theo hai vectơ không cùng phương',
        docVi: ['Đề cho một hình (tam giác, hình bình hành) và yêu cầu biểu diễn một vectơ theo hai vectơ cho trước.'],
        method: [
          'Vẽ hình và đánh dấu hai vectơ cơ sở.',
          'Dùng quy tắc ba điểm để chèn điểm trung gian, đưa dần về hai vectơ cơ sở.',
          'Thu gọn hệ số, kiểm tra bằng một trường hợp đặc biệt.',
        ],
        trap: 'Chèn điểm trung gian sai chiều, dẫn tới sai dấu hệ số.',
        muc: 'van-dung',
      },
      {
        name: 'Tích vô hướng theo toạ độ: góc, độ dài, vuông góc',
        docVi: ['Đề cho toạ độ vectơ hoặc toạ độ điểm.', 'Yêu cầu tính góc, chứng minh vuông góc, hoặc tìm tham số.'],
        method: [
          'Viết toạ độ các vectơ liên quan.',
          'Áp công thức tích vô hướng theo toạ độ.',
          'Với bài tìm tham số: cho tích vô hướng bằng 0 rồi giải.',
        ],
        trap: 'Nhầm công thức thành x₁x₂ − y₁y₂ (đó là công thức của số phức, không phải tích vô hướng).',
        muc: 'thong-hieu',
      },
      {
        name: 'Tìm số đặc trưng của mẫu số liệu',
        docVi: ['Đề cho một dãy số liệu hoặc bảng tần số.', 'Yêu cầu số trung bình, trung vị, tứ phân vị, mốt.'],
        method: [
          'Sắp xếp mẫu theo thứ tự tăng dần trước tiên — bước này bắt buộc.',
          'Xác định n, rồi tính từng số đặc trưng theo định nghĩa.',
          'Với tứ phân vị, chia mẫu thành hai nửa quanh trung vị.',
        ],
        trap: 'Tính trung vị mà quên sắp xếp mẫu — lỗi phổ biến nhất của chương thống kê.',
        muc: 'thong-hieu',
      },
      {
        name: 'Ứng dụng tích vô hướng chứng minh hệ thức hình học',
        docVi: ['Yêu cầu chứng minh một đẳng thức độ dài hoặc chứng minh vuông góc mà không có toạ độ.'],
        method: [
          'Chọn hai vectơ cơ sở, biểu diễn mọi vectơ trong bài theo chúng.',
          'Chuyển đẳng thức độ dài thành đẳng thức tích vô hướng bằng cách bình phương.',
          'Khai triển và thu gọn.',
        ],
        trap: 'Bình phương độ dài nhưng quên rằng |u→|² = u→·u→ chứ không phải u→².',
        muc: 'van-dung-cao',
      },
    ],
    mindmap: [
      {
        branch: 'Vectơ — phần đại số',
        nodes: ['Cộng, trừ vectơ', 'Nhân vectơ với một số', 'Phân tích theo hai vectơ không cùng phương', 'Toạ độ vectơ'],
        useFor: 'Công cụ nền cho toàn bộ hình học toạ độ ở học kỳ II và hình học không gian lớp 11 – 12.',
      },
      {
        branch: 'Vectơ — tích vô hướng',
        nodes: ['Định nghĩa theo góc', 'Công thức theo toạ độ', 'Điều kiện vuông góc', 'Góc giữa hai vectơ'],
        useFor: 'Dùng để tính góc, chứng minh vuông góc và tính độ dài mà không cần dựng hình phụ.',
      },
      {
        branch: 'Hệ thức lượng',
        nodes: ['Định lí côsin và sin', 'Diện tích tam giác', 'Bán kính R và r'],
        useFor: 'Nối với chương vectơ: nhiều bài cuối kỳ hỏi cùng một hình bằng cả hai công cụ.',
      },
      {
        branch: 'Thống kê mô tả',
        nodes: ['Số gần đúng và sai số', 'Số trung bình', 'Trung vị và tứ phân vị', 'Mốt'],
        useFor: 'Nhóm câu lấy điểm chắc; cũng là nền cho phương sai và độ lệch chuẩn ở lớp 11 – 12.',
      },
    ],
    plan: [
      { week: 'Tuần 1', focus: 'Ôn lại giữa kỳ I: tập hợp và hệ thức lượng', output: 'Làm lại bài kiểm tra giữa kỳ, sửa hết mọi câu đã sai.' },
      { week: 'Tuần 2', focus: 'Vectơ phần đại số: phép toán và phân tích vectơ', output: 'Phân tích đúng 10 vectơ theo hai vectơ cơ sở trong 10 hình khác nhau.' },
      { week: 'Tuần 3', focus: 'Tích vô hướng và ứng dụng', output: 'Giải trọn ba bài chứng minh hình học bằng tích vô hướng.' },
      { week: 'Tuần 4', focus: 'Thống kê và tổng duyệt', output: 'Hai đề tự luyện 90 phút đúng ma trận, tự chấm theo barem.' },
    ],
    selfCheck: [
      'Viết được quy tắc ba điểm, quy tắc hình bình hành và quy tắc trừ mà không cần mở vở.',
      'Tính được tích vô hướng theo toạ độ và giải được bài tìm tham số để hai vectơ vuông góc.',
      'Phân tích được một vectơ theo hai vectơ cơ sở trong hình bình hành và trong tam giác có trung tuyến.',
      'Tính đúng trung vị và tứ phân vị của một mẫu có số phần tử chẵn.',
      'Nhớ sắp xếp mẫu trước khi tính trung vị.',
      'Đã làm lại toàn bộ câu sai của bài giữa kỳ I.',
    ],
    targets: [
      { band: 'Dưới 6,5', meaning: 'Chương vectơ chưa vào; đây là chương chiếm nhiều điểm nhất của bài cuối kỳ I.', next: 'Quay lại phép toán vectơ cơ bản, làm hết bài tập sách giáo khoa trước khi đụng đề.' },
      { band: '6,5 – 8,0', meaning: 'Làm được phép toán nhưng lúng túng khi phải phân tích vectơ theo cơ sở.', next: 'Mỗi ngày một bài phân tích vectơ, luôn vẽ hình trước.' },
      { band: '8,0 – 9,0', meaning: 'Chỉ hụt ở câu chứng minh bằng tích vô hướng.', next: 'Học kỹ thuật bình phương độ dài để chuyển sang tích vô hướng.' },
      { band: 'Trên 9,0', meaning: 'Đủ điều kiện giữ Top 1 học kỳ I.', next: 'Bắt đầu đọc trước chương hàm số bậc hai của học kỳ II.' },
    ],
  },
  {
    id: 'sy-10-gk2',
    track: 'chinh-khoa',
    grade: 10,
    term: 'giua-ky-2',
    title: 'Toán 10 — Đề cương giữa học kỳ II',
    minutes: 60,
    format: 'Trắc nghiệm nhiều lựa chọn + đúng/sai + tự luận · thang 10',
    scope: [
      'Chương VI — Hàm số, đồ thị và ứng dụng: hàm số bậc hai, dấu của tam thức bậc hai, bất phương trình bậc hai, phương trình quy về bậc hai.',
      'Chương VII (phần đầu) — Phương pháp toạ độ trong mặt phẳng: toạ độ vectơ, phương trình đường thẳng, vị trí tương đối, góc và khoảng cách.',
    ],
    matrix: [
      { topic: 'Hàm số bậc hai và đồ thị', topicId: 'q10-ham-so-bac-hai', nhanBiet: 1, thongHieu: 1.5, vanDung: 1, vanDungCao: 0.5 },
      { topic: 'Dấu tam thức và bất phương trình bậc hai', topicId: 'q10-bpt-tam-thuc', nhanBiet: 1, thongHieu: 1, vanDung: 1, vanDungCao: 0.5 },
      { topic: 'Phương trình đường thẳng trong mặt phẳng', topicId: 'q10-toa-do-phang', nhanBiet: 0.5, thongHieu: 1, vanDung: 0.5, vanDungCao: 0.5 },
    ],
    mustKnow: [
      'Đỉnh parabol y = ax² + bx + c có hoành độ −b/(2a); trục đối xứng x = −b/(2a).',
      'Dạng đỉnh: y = a(x − x₀)² + y₀.',
      'Định lí dấu tam thức: cùng dấu a khi Δ < 0; trong khoảng hai nghiệm thì trái dấu a.',
      'Tam thức luôn dương với mọi x ⟺ a > 0 và Δ < 0.',
      'Đường thẳng qua M(x₀; y₀) có vectơ pháp tuyến (A; B): A(x − x₀) + B(y − y₀) = 0.',
      'Khoảng cách từ M(x₀; y₀) đến Ax + By + C = 0 bằng |Ax₀ + By₀ + C| / √(A² + B²).',
    ],
    keyTypes: [
      {
        name: 'Xác định parabol từ dữ kiện cho trước',
        docVi: ['Đề cho đỉnh, hoặc cho ba điểm, hoặc cho đỉnh và một điểm.'],
        method: [
          'Cho đỉnh ⇒ dùng ngay dạng đỉnh y = a(x − x₀)² + y₀, chỉ còn một ẩn a.',
          'Cho ba điểm ⇒ lập hệ ba phương trình ba ẩn a, b, c.',
          'Kiểm tra lại bằng hoành độ đỉnh −b/(2a).',
        ],
        trap: 'Cho đỉnh mà vẫn lập hệ ba ẩn — mất gấp ba thời gian và dễ sai hơn hẳn.',
        muc: 'thong-hieu',
      },
      {
        name: 'Bất phương trình bậc hai và bài toán tham số',
        docVi: ['Có tham số m và yêu cầu "nghiệm đúng với mọi x" hoặc "vô nghiệm".'],
        method: [
          'Xét riêng trường hợp hệ số bậc hai bằng 0 nếu hệ số đó chứa tham số.',
          'Với a ≠ 0: dùng định lí dấu tam thức, đưa về điều kiện về a và Δ.',
          'Giải bất phương trình theo m rồi hợp các trường hợp.',
        ],
        trap: 'Quên xét trường hợp hệ số bậc hai bằng 0 — đây là bẫy kinh điển của dạng này.',
        muc: 'van-dung',
      },
      {
        name: 'Phương trình đường thẳng và khoảng cách',
        docVi: ['Đề cho điểm và một trong: vectơ pháp tuyến, vectơ chỉ phương, hệ số góc, hoặc quan hệ song song/vuông góc với đường khác.'],
        method: [
          'Xác định một điểm thuộc đường và một vectơ pháp tuyến.',
          'Viết phương trình tổng quát, rồi chuyển sang dạng đề yêu cầu.',
          'Với bài khoảng cách: áp công thức, chú ý giá trị tuyệt đối ở tử.',
        ],
        trap: 'Nhầm vectơ pháp tuyến với vectơ chỉ phương; hai vectơ này vuông góc nhau, đảo toạ độ và đổi dấu một thành phần.',
        muc: 'thong-hieu',
      },
      {
        name: 'Phương trình quy về bậc hai (chứa căn, chứa trị tuyệt đối)',
        docVi: ['Có dấu căn bậc hai hoặc dấu giá trị tuyệt đối chứa ẩn.'],
        method: [
          'Đặt điều kiện xác định TRƯỚC.',
          'Bình phương hai vế hoặc chia trường hợp phá trị tuyệt đối.',
          'Giải phương trình bậc hai thu được.',
          'Thử lại nghiệm vào phương trình gốc — bước bắt buộc.',
        ],
        trap: 'Bình phương hai vế mà không kiểm tra dấu vế phải, sinh nghiệm ngoại lai và quên loại.',
        muc: 'van-dung-cao',
      },
    ],
    mindmap: [
      {
        branch: 'Hàm số bậc hai',
        nodes: ['Dạng tổng quát và dạng đỉnh', 'Đồ thị parabol', 'Bảng biến thiên', 'Giá trị lớn nhất, nhỏ nhất trên đoạn'],
        useFor: 'Nhóm câu chiếm nhiều điểm nhất của bài giữa kỳ II, và là nền của khảo sát hàm số lớp 12.',
      },
      {
        branch: 'Dấu tam thức',
        nodes: ['Định lí dấu', 'Bất phương trình bậc hai', 'Bài toán tham số', 'Phương trình quy về bậc hai'],
        useFor: 'Công cụ dùng lại liên tục ở lớp 11 – 12 khi xét dấu đạo hàm và giải bất phương trình.',
      },
      {
        branch: 'Toạ độ phẳng',
        nodes: ['Vectơ chỉ phương và pháp tuyến', 'Phương trình tổng quát và tham số', 'Góc và khoảng cách', 'Vị trí tương đối'],
        useFor: 'Nền trực tiếp cho phương pháp toạ độ trong không gian Oxyz ở lớp 12.',
      },
    ],
    plan: [
      { week: 'Tuần 1', focus: 'Hàm số bậc hai: đỉnh, bảng biến thiên, đồ thị', output: 'Vẽ đúng 5 parabol và đọc được giá trị lớn nhất, nhỏ nhất trên đoạn.' },
      { week: 'Tuần 2', focus: 'Dấu tam thức và bất phương trình bậc hai', output: 'Giải đúng 10 bất phương trình bậc hai, trong đó có 3 bài chứa tham số.' },
      { week: 'Tuần 3', focus: 'Phương trình đường thẳng, góc và khoảng cách', output: 'Viết được phương trình đường thẳng từ cả 4 loại dữ kiện đề hay cho.' },
      { week: 'Tuần 4', focus: 'Phương trình quy về bậc hai và tổng duyệt', output: 'Một đề tự luyện 60 phút, tự chấm theo barem, không sót bước thử lại nghiệm.' },
    ],
    selfCheck: [
      'Viết được ngay dạng đỉnh khi đề cho toạ độ đỉnh.',
      'Nêu được điều kiện để tam thức luôn dương và luôn âm với mọi x.',
      'Nhớ xét trường hợp hệ số bậc hai bằng 0 khi hệ số đó chứa tham số.',
      'Phân biệt được vectơ pháp tuyến và vectơ chỉ phương, chuyển đổi được giữa hai loại.',
      'Luôn thử lại nghiệm sau khi bình phương hai vế.',
      'Máy tính ở chế độ độ nếu bài có góc.',
    ],
    targets: [
      { band: 'Dưới 6,5', meaning: 'Chưa vững hàm số bậc hai — chương chiếm 4,0 điểm của bài.', next: 'Làm lại toàn bộ ví dụ sách giáo khoa về đỉnh và bảng biến thiên.' },
      { band: '6,5 – 8,0', meaning: 'Mất điểm ở bài tham số của tam thức.', next: 'Luyện riêng dạng tham số, mỗi bài đều phải viết dòng xét a = 0.' },
      { band: '8,0 – 9,0', meaning: 'Chỉ còn hụt ở phương trình chứa căn và câu vận dụng cao toạ độ.', next: 'Luyện 10 phương trình chứa căn, bắt buộc thử lại nghiệm.' },
      { band: 'Trên 9,0', meaning: 'Đủ điều kiện giữ Top 1 giữa kỳ II.', next: 'Đọc trước chương đường tròn và conic để đi trước lớp một nhịp.' },
    ],
  },
  {
    id: 'sy-10-ck2',
    track: 'chinh-khoa',
    grade: 10,
    term: 'cuoi-ky-2',
    title: 'Toán 10 — Đề cương cuối học kỳ II và tổng ôn cả năm',
    minutes: 90,
    format: 'Trắc nghiệm nhiều lựa chọn + đúng/sai + trả lời ngắn + tự luận · thang 10',
    scope: [
      'Toàn bộ phạm vi giữa kỳ II: hàm số bậc hai, dấu tam thức, phương trình quy về bậc hai, đường thẳng trong mặt phẳng.',
      'Chương VII (phần sau) — Đường tròn trong mặt phẳng toạ độ và ba đường conic.',
      'Chương VIII — Đại số tổ hợp: quy tắc đếm, hoán vị, chỉnh hợp, tổ hợp, nhị thức Newton.',
      'Chương IX — Xác suất: không gian mẫu, biến cố, xác suất cổ điển.',
    ],
    matrix: [
      { topic: 'Hàm số bậc hai và dấu tam thức', topicId: 'q10-ham-so-bac-hai', nhanBiet: 0.5, thongHieu: 0.5, vanDung: 0.5, vanDungCao: 0 },
      { topic: 'Toạ độ phẳng: đường thẳng, đường tròn, conic', topicId: 'q10-toa-do-phang', nhanBiet: 1, thongHieu: 1, vanDung: 1, vanDungCao: 0.5 },
      { topic: 'Đại số tổ hợp và nhị thức Newton', topicId: 'q10-to-hop-newton', nhanBiet: 1, thongHieu: 1, vanDung: 0.5, vanDungCao: 0.5 },
      { topic: 'Xác suất cổ điển', nhanBiet: 0.5, thongHieu: 1, vanDung: 0.5, vanDungCao: 0 },
    ],
    mustKnow: [
      'Đường tròn tâm I(a; b) bán kính R: (x − a)² + (y − b)² = R².',
      'Dạng khai triển x² + y² − 2ax − 2by + c = 0 với R = √(a² + b² − c), điều kiện a² + b² − c > 0.',
      'Tiếp tuyến của đường tròn tại điểm thuộc đường tròn vuông góc với bán kính tại tiếp điểm.',
      'Hoán vị Pₙ = n!; chỉnh hợp Aⁿₖ = n!/(n − k)!; tổ hợp Cⁿₖ = n!/[k!(n − k)!].',
      'Số hạng tổng quát của (a + b)ⁿ là C(n; k)·aⁿ⁻ᵏ·bᵏ.',
      'Xác suất cổ điển P(A) = n(A)/n(Ω); P(biến cố đối) = 1 − P(A).',
    ],
    keyTypes: [
      {
        name: 'Viết phương trình đường tròn',
        docVi: ['Đề cho tâm và bán kính, hoặc tâm và một điểm, hoặc ba điểm, hoặc tâm và một đường tiếp xúc.'],
        method: [
          'Xác định tâm và bán kính từ dữ kiện.',
          'Với bài tiếp xúc: bán kính bằng khoảng cách từ tâm đến đường thẳng.',
          'Với ba điểm: dùng dạng khai triển và lập hệ ba phương trình.',
        ],
        trap: 'Với dạng khai triển, quên kiểm tra điều kiện a² + b² − c > 0 nên nhận cả phương trình không phải đường tròn.',
        muc: 'thong-hieu',
      },
      {
        name: 'Phân biệt chỉnh hợp và tổ hợp',
        docVi: ['Có thứ tự (xếp hàng, chọn ban cán sự có chức vụ) ⇒ chỉnh hợp.', 'Không có thứ tự (chọn nhóm, chọn đề) ⇒ tổ hợp.'],
        method: [
          'Đọc đề và tự hỏi: đổi chỗ hai đối tượng thì kết quả có khác đi không.',
          'Khác đi ⇒ chỉnh hợp; không khác ⇒ tổ hợp.',
          'Với bài có điều kiện, chia trường hợp trước rồi mới đếm.',
        ],
        trap: 'Dùng chỉnh hợp cho bài chọn nhóm không phân biệt vai trò, kết quả lớn gấp k! lần.',
        muc: 'van-dung',
      },
      {
        name: 'Tìm hệ số trong khai triển nhị thức Newton',
        docVi: ['Yêu cầu tìm hệ số của xᵏ, hoặc số hạng không chứa x.'],
        method: [
          'Viết số hạng tổng quát C(n; k)·(…)ⁿ⁻ᵏ·(…)ᵏ.',
          'Gom số mũ của x thành một biểu thức theo k.',
          'Cho số mũ bằng giá trị đề yêu cầu, giải ra k rồi thay lại.',
        ],
        trap: 'Quên luỹ thừa của phần hệ số (ví dụ (2x)⁵ cho 2⁵ chứ không phải 2) hoặc quên dấu âm.',
        muc: 'van-dung',
      },
      {
        name: 'Tính xác suất bằng biến cố đối',
        docVi: ['Đề có cụm "ít nhất một", "có ít nhất", "không quá".'],
        method: [
          'Xác định biến cố đối và mô tả nó bằng lời.',
          'Tính n(Ω) và số phần tử của biến cố đối.',
          'Lấy 1 trừ đi xác suất của biến cố đối.',
        ],
        trap: 'Mô tả sai biến cố đối: đối của "ít nhất một" là "không có cái nào", không phải "đúng một".',
        muc: 'van-dung',
      },
    ],
    mindmap: [
      {
        branch: 'Toạ độ phẳng',
        nodes: ['Đường thẳng', 'Đường tròn', 'Elip, hypebol, parabol', 'Góc, khoảng cách, vị trí tương đối'],
        useFor: 'Chiếm tỉ trọng lớn nhất của bài cuối kỳ II và là nền trực tiếp của Oxyz lớp 12.',
      },
      {
        branch: 'Đếm',
        nodes: ['Quy tắc cộng và quy tắc nhân', 'Hoán vị', 'Chỉnh hợp', 'Tổ hợp', 'Nhị thức Newton'],
        useFor: 'Nền của toàn bộ chương xác suất lớp 10 – 12; đếm sai thì xác suất sai theo.',
      },
      {
        branch: 'Xác suất',
        nodes: ['Không gian mẫu', 'Biến cố và biến cố đối', 'Xác suất cổ điển'],
        useFor: 'Nhóm câu lấy điểm nếu đếm chắc; cũng là nền của xác suất có điều kiện lớp 12.',
      },
      {
        branch: 'Đại số kỳ II',
        nodes: ['Hàm số bậc hai', 'Dấu tam thức', 'Phương trình quy về bậc hai'],
        useFor: 'Phần được hỏi lại ở bài cuối kỳ với tỉ trọng nhỏ hơn nhưng vẫn bắt buộc phải chắc.',
      },
    ],
    plan: [
      { week: 'Tuần 1', focus: 'Đường tròn và ba đường conic', output: 'Viết được phương trình đường tròn từ cả bốn loại dữ kiện đề hay cho.' },
      { week: 'Tuần 2', focus: 'Quy tắc đếm, hoán vị, chỉnh hợp, tổ hợp', output: 'Phân loại đúng 20 bài đếm thành chỉnh hợp hay tổ hợp trước khi tính.' },
      { week: 'Tuần 3', focus: 'Nhị thức Newton và xác suất cổ điển', output: 'Tìm đúng hệ số trong 5 khai triển và giải 5 bài xác suất bằng biến cố đối.' },
      { week: 'Tuần 4', focus: 'Tổng duyệt cả năm', output: 'Hai đề 90 phút đúng ma trận cuối kỳ, tự chấm và lập bảng phân loại lỗi.' },
    ],
    selfCheck: [
      'Viết được phương trình đường tròn ở cả hai dạng và chuyển đổi được giữa chúng.',
      'Nêu được điều kiện để x² + y² − 2ax − 2by + c = 0 là phương trình đường tròn.',
      'Phân biệt chắc chỉnh hợp và tổ hợp bằng phép thử đổi chỗ.',
      'Viết được số hạng tổng quát của khai triển và tìm đúng k.',
      'Mô tả đúng biến cố đối của "ít nhất một".',
      'Đã làm lại toàn bộ câu sai của bài giữa kỳ II.',
    ],
    targets: [
      { band: 'Dưới 6,5', meaning: 'Hổng ở chương đếm hoặc chương toạ độ — hai chương chiếm 6,0 điểm.', next: 'Ưu tiên chương đếm trước vì nó còn quyết định cả chương xác suất.' },
      { band: '6,5 – 8,0', meaning: 'Đếm được nhưng hay nhầm chỉnh hợp với tổ hợp.', next: 'Mỗi bài đếm bắt buộc viết một dòng lý do chọn công thức trước khi tính.' },
      { band: '8,0 – 9,0', meaning: 'Chỉ còn hụt ở câu vận dụng cao của toạ độ phẳng.', next: 'Luyện các bài đường tròn kết hợp điều kiện tiếp xúc và khoảng cách.' },
      { band: 'Trên 9,0', meaning: 'Giữ được Top 1 cả năm lớp 10.', next: 'Chuyển sang đề cương ôn hè lớp 10 lên 11 để không mất đà.' },
    ],
  },
  {
    id: 'sy-10-he',
    track: 'chinh-khoa',
    grade: 10,
    term: 'on-he',
    title: 'Toán 10 — Đề cương ôn hè bắc cầu lên lớp 11',
    minutes: 90,
    format: 'Tự luyện theo tuần, có bài kiểm tra đầu vào lớp 11 ở cuối đợt',
    scope: [
      'Chốt lại bốn công cụ của lớp 10 sẽ dùng liên tục ở lớp 11: dấu tam thức, hệ thức lượng, vectơ và tích vô hướng, đếm và xác suất.',
      'Làm quen trước hai chương mở đầu lớp 11: hàm số lượng giác và dãy số – cấp số.',
    ],
    matrix: [
      { topic: 'Dấu tam thức và bất phương trình bậc hai', topicId: 'q10-bpt-tam-thuc', nhanBiet: 0.5, thongHieu: 1, vanDung: 1, vanDungCao: 0 },
      { topic: 'Vectơ và tích vô hướng', topicId: 'q10-vecto', nhanBiet: 0.5, thongHieu: 1, vanDung: 0.5, vanDungCao: 0 },
      { topic: 'Đếm và xác suất', topicId: 'q10-to-hop-newton', nhanBiet: 0.5, thongHieu: 1, vanDung: 0.5, vanDungCao: 0.5 },
      { topic: 'Làm quen lượng giác và dãy số lớp 11', topicId: 'q11-luong-giac', nhanBiet: 1, thongHieu: 1.5, vanDung: 0.5, vanDungCao: 0 },
    ],
    mustKnow: [
      'Bảng dấu tam thức bậc hai — sẽ dùng lại mỗi lần xét dấu đạo hàm ở lớp 11 – 12.',
      'Tích vô hướng theo toạ độ — sẽ dùng lại nguyên vẹn trong không gian Oxyz.',
      'Cₙᵏ và quy tắc nhân — nền của toàn bộ xác suất lớp 11 – 12.',
      'Bảng giá trị lượng giác của các góc đặc biệt 0°, 30°, 45°, 60°, 90°.',
      'Công thức cộng lượng giác và công thức nhân đôi (học trước để vào lớp 11 nhẹ nhàng).',
    ],
    keyTypes: [
      {
        name: 'Xét dấu một biểu thức tích hoặc thương',
        docVi: ['Biểu thức là tích hoặc thương của các nhị thức và tam thức.'],
        method: [
          'Tìm nghiệm của từng nhân tử.',
          'Lập bảng xét dấu, sắp nghiệm theo thứ tự tăng dần trên trục.',
          'Nhân dấu theo cột và đọc kết quả.',
        ],
        trap: 'Quên đổi dấu khi qua nghiệm bội chẵn, hoặc quên loại nghiệm làm mẫu bằng 0.',
        muc: 'thong-hieu',
      },
      {
        name: 'Đọc bảng giá trị lượng giác và đường tròn lượng giác',
        docVi: ['Bài yêu cầu tính giá trị lượng giác của một góc, hoặc xác định dấu theo góc phần tư.'],
        method: [
          'Vẽ đường tròn lượng giác, xác định góc phần tư.',
          'Nhớ quy tắc dấu: nhất cả, nhị sin, tam tang, tứ cos.',
          'Dùng công thức góc liên quan đặc biệt để đưa về góc nhọn.',
        ],
        trap: 'Nhớ dấu theo mẹo mà không vẽ hình, dẫn tới sai dấu ở góc phần tư thứ ba và thứ tư.',
        muc: 'thong-hieu',
      },
      {
        name: 'Bài toán đếm có điều kiện',
        docVi: ['Đề có ràng buộc: "có ít nhất một nữ", "hai người A và B không ngồi cạnh nhau".'],
        method: [
          'Chọn hướng: đếm trực tiếp theo trường hợp, hoặc đếm phần bù.',
          'Với ràng buộc "ít nhất", gần như luôn nên đếm phần bù.',
          'Kiểm tra không bỏ sót và không đếm trùng trường hợp.',
        ],
        trap: 'Chia trường hợp bị chồng lấn nên đếm trùng; luôn kiểm tra các trường hợp có rời nhau không.',
        muc: 'van-dung',
      },
    ],
    mindmap: [
      {
        branch: 'Bốn công cụ mang từ lớp 10 sang',
        nodes: ['Dấu tam thức', 'Hệ thức lượng', 'Vectơ và tích vô hướng', 'Đếm và xác suất'],
        useFor: 'Đây chính là bốn thứ mà lớp 11 mặc định bạn đã có. Hổng chỗ nào thì lớp 11 sẽ nặng ở đúng chỗ đó.',
      },
      {
        branch: 'Bắc cầu sang lượng giác lớp 11',
        nodes: ['Đường tròn lượng giác', 'Giá trị lượng giác góc đặc biệt', 'Công thức cộng', 'Công thức nhân đôi'],
        useFor: 'Học trước 4 nhóm này thì tháng đầu lớp 11 gần như không phải học thêm gì mới.',
      },
      {
        branch: 'Bắc cầu sang dãy số lớp 11',
        nodes: ['Dãy số và cách cho dãy số', 'Cấp số cộng', 'Cấp số nhân'],
        useFor: 'Chương ngắn, dễ học trước, và thường là chương lấy điểm ở bài giữa kỳ I lớp 11.',
      },
    ],
    plan: [
      { week: 'Tuần 1 – 2', focus: 'Chốt dấu tam thức và bất phương trình bậc hai', output: 'Xét dấu đúng 20 biểu thức tích – thương, không sai bảng nào.' },
      { week: 'Tuần 3 – 4', focus: 'Chốt vectơ, tích vô hướng và hệ thức lượng', output: 'Giải trọn 10 bài hình học bằng công cụ vectơ.' },
      { week: 'Tuần 5 – 6', focus: 'Chốt đếm và xác suất', output: 'Làm đúng 20 bài đếm có điều kiện, phân loại rõ chỉnh hợp hay tổ hợp.' },
      { week: 'Tuần 7 – 8', focus: 'Học trước lượng giác và dãy số lớp 11', output: 'Thuộc bảng giá trị lượng giác và giải được phương trình lượng giác cơ bản.' },
    ],
    selfCheck: [
      'Lập được bảng xét dấu của một biểu thức có ba nhân tử mà không cần nhìn mẫu.',
      'Tính được tích vô hướng và góc giữa hai vectơ theo toạ độ.',
      'Phân biệt chắc chỉnh hợp và tổ hợp.',
      'Đọc được đường tròn lượng giác và nêu đúng dấu của sin, cos, tan ở cả bốn góc phần tư.',
      'Viết được công thức số hạng tổng quát và tổng n số hạng đầu của cấp số cộng.',
      'Đã làm một đề kiểm tra đầu vào lớp 11 và đạt từ 8,0 trở lên.',
    ],
    targets: [
      { band: 'Dưới 6,5', meaning: 'Nền lớp 10 còn hổng; vào lớp 11 sẽ rất nặng.', next: 'Dành trọn hè cho bốn công cụ lớp 10, chưa cần học trước chương trình lớp 11.' },
      { band: '6,5 – 8,0', meaning: 'Nền đủ dùng nhưng chưa nhanh.', next: 'Vừa củng cố công cụ vừa học trước chương lượng giác.' },
      { band: '8,0 – 9,0', meaning: 'Nền tốt, có thể đi trước chương trình.', next: 'Học trước trọn hai chương đầu lớp 11 và làm bài tập sách giáo khoa.' },
      { band: 'Trên 9,0', meaning: 'Sẵn sàng cho mục tiêu Top 1 lớp 11.', next: 'Học trước hai chương đầu và bắt đầu làm quen định dạng đề đánh giá năng lực (HSA, TSA).' },
    ],
  },
  /* ==================== LỚP 11 ==================== */
  {
    id: 'sy-11-gk1',
    track: 'chinh-khoa',
    grade: 11,
    term: 'giua-ky-1',
    title: 'Toán 11 — Đề cương giữa học kỳ I',
    minutes: 60,
    format: 'Trắc nghiệm nhiều lựa chọn + đúng/sai + tự luận · thang 10',
    scope: [
      'Chương I — Hàm số lượng giác và phương trình lượng giác: góc lượng giác, giá trị lượng giác, công thức lượng giác, hàm số lượng giác, phương trình lượng giác cơ bản.',
      'Chương II — Dãy số, cấp số cộng và cấp số nhân.',
    ],
    matrix: [
      { topic: 'Giá trị lượng giác và công thức lượng giác', topicId: 'q11-luong-giac', nhanBiet: 1, thongHieu: 1.5, vanDung: 0.5, vanDungCao: 0 },
      { topic: 'Hàm số lượng giác và phương trình lượng giác', topicId: 'q11-luong-giac', nhanBiet: 1, thongHieu: 1, vanDung: 1, vanDungCao: 0.5 },
      { topic: 'Dãy số, cấp số cộng, cấp số nhân', topicId: 'q11-day-so', nhanBiet: 1, thongHieu: 1, vanDung: 1, vanDungCao: 0.5 },
    ],
    mustKnow: [
      'Bảng giá trị lượng giác của 0, π/6, π/4, π/3, π/2 và dấu ở bốn góc phần tư.',
      'Công thức cộng: sin(a ± b), cos(a ± b), tan(a ± b).',
      'Công thức nhân đôi và công thức hạ bậc.',
      'Nghiệm phương trình cơ bản: sin u = sin α ⇒ u = α + k2π hoặc u = π − α + k2π.',
      'cos u = cos α ⇒ u = ±α + k2π; tan u = tan α ⇒ u = α + kπ.',
      'Cấp số cộng: uₙ = u₁ + (n − 1)d; Sₙ = n(u₁ + uₙ)/2 = n[2u₁ + (n − 1)d]/2.',
      'Cấp số nhân: uₙ = u₁·qⁿ⁻¹; Sₙ = u₁(1 − qⁿ)/(1 − q) với q ≠ 1.',
    ],
    keyTypes: [
      {
        name: 'Rút gọn biểu thức lượng giác',
        docVi: ['Biểu thức chứa nhiều hàm lượng giác của các góc liên quan.', 'Yêu cầu "rút gọn" hoặc "chứng minh đẳng thức".'],
        method: [
          'Đưa mọi góc về cùng một góc bằng công thức góc liên quan đặc biệt.',
          'Dùng công thức cộng, nhân đôi hoặc biến tích thành tổng để gom nhóm.',
          'Áp hằng đẳng thức sin² + cos² = 1 ở bước cuối.',
        ],
        trap: 'Sai dấu khi dùng công thức góc bù, góc phụ và góc đối — nên vẽ đường tròn lượng giác để kiểm tra.',
        muc: 'thong-hieu',
      },
      {
        name: 'Giải phương trình lượng giác cơ bản và lọc nghiệm theo khoảng',
        docVi: ['Có sin, cos hoặc tan bằng một hằng số.', 'Đề thêm "tìm nghiệm thuộc khoảng…".'],
        method: [
          'Đưa về dạng sin u = sin α (hoặc cos, tan).',
          'Viết đủ hai họ nghiệm với sin và cos.',
          'Rút x theo k, rồi cho k chạy các giá trị nguyên và lọc theo khoảng đề cho.',
        ],
        trap: 'Chỉ viết một họ nghiệm với phương trình sin hoặc cos; hoặc lọc nghiệm mà quên xét k âm.',
        muc: 'van-dung',
      },
      {
        name: 'Nhận biết và khai thác cấp số cộng, cấp số nhân',
        docVi: ['Dãy cho bởi công thức hoặc bởi vài số hạng đầu.', 'Yêu cầu tìm u₁, d hoặc q, hoặc tính tổng.'],
        method: [
          'Kiểm tra hiệu hai số hạng liên tiếp (cấp số cộng) hoặc thương (cấp số nhân).',
          'Lập hệ hai phương trình từ hai dữ kiện đề cho.',
          'Áp công thức tổng, chú ý điều kiện q ≠ 1.',
        ],
        trap: 'Dùng công thức tổng cấp số nhân khi q = 1; khi đó Sₙ = n·u₁.',
        muc: 'van-dung',
      },
      {
        name: 'Bài toán thực tế mô hình hoá bằng cấp số',
        docVi: ['Bối cảnh lãi kép, tăng trưởng dân số, khấu hao, xếp hàng ghế theo quy luật.'],
        method: [
          'Xác định đại lượng tăng đều (cấp số cộng) hay tăng theo tỉ lệ (cấp số nhân).',
          'Viết u₁ và d hoặc q từ dữ kiện.',
          'Áp công thức số hạng tổng quát hoặc công thức tổng theo đúng câu hỏi.',
        ],
        trap: 'Nhầm số hạng thứ n với số hạng sau n chu kỳ — chênh nhau đúng một bậc luỹ thừa.',
        muc: 'van-dung-cao',
      },
    ],
    mindmap: [
      { branch: 'Lượng giác — nền', nodes: ['Đường tròn lượng giác', 'Giá trị lượng giác góc đặc biệt', 'Góc liên quan đặc biệt', 'Hằng đẳng thức lượng giác'], useFor: 'Không thuộc phần này thì mọi bài lượng giác phía sau đều tắc ngay dòng đầu.' },
      { branch: 'Lượng giác — công thức', nodes: ['Công thức cộng', 'Nhân đôi và hạ bậc', 'Biến đổi tổng thành tích', 'Biến đổi tích thành tổng'], useFor: 'Bộ công cụ để rút gọn và để đưa phương trình về dạng cơ bản.' },
      { branch: 'Phương trình lượng giác', nodes: ['Bốn phương trình cơ bản', 'Phương trình bậc hai theo một hàm lượng giác', 'Phương trình bậc nhất với sin và cos', 'Lọc nghiệm theo khoảng'], useFor: 'Nhóm câu vận dụng của bài giữa kỳ I và câu tự luận điểm cao.' },
      { branch: 'Dãy số và cấp số', nodes: ['Dãy số và tính đơn điệu', 'Cấp số cộng', 'Cấp số nhân', 'Bài toán thực tế lãi kép'], useFor: 'Chương ngắn, dễ lấy trọn điểm, và là nền của giới hạn dãy số ở phần sau.' },
    ],
    plan: [
      { week: 'Tuần 1', focus: 'Đường tròn lượng giác, giá trị góc đặc biệt, góc liên quan', output: 'Viết lại bảng giá trị lượng giác và bảng dấu bốn góc phần tư từ trí nhớ.' },
      { week: 'Tuần 2', focus: 'Công thức cộng, nhân đôi, hạ bậc và rút gọn biểu thức', output: 'Rút gọn đúng 15 biểu thức lượng giác, không nhìn bảng công thức.' },
      { week: 'Tuần 3', focus: 'Phương trình lượng giác cơ bản và lọc nghiệm', output: 'Giải và lọc nghiệm đúng 10 phương trình có ràng buộc khoảng.' },
      { week: 'Tuần 4', focus: 'Cấp số cộng, cấp số nhân và bài toán thực tế', output: 'Một đề tự luyện 60 phút đúng ma trận, tự chấm theo barem.' },
    ],
    selfCheck: [
      'Viết được bảng giá trị lượng giác của năm góc đặc biệt trong 1 phút.',
      'Nêu đúng dấu của sin, cos, tan ở cả bốn góc phần tư.',
      'Viết đủ hai họ nghiệm cho phương trình sin và cho phương trình cos.',
      'Lọc được nghiệm trong một khoảng cho trước, có xét cả k âm.',
      'Phân biệt được cấp số cộng và cấp số nhân chỉ bằng một phép kiểm tra.',
      'Nhớ trường hợp riêng q = 1 khi tính tổng cấp số nhân.',
    ],
    targets: [
      { band: 'Dưới 6,5', meaning: 'Chưa thuộc bảng giá trị lượng giác — mọi thứ phía sau đều nghẽn ở đây.', next: 'Dành trọn một tuần cho đường tròn lượng giác và bảng giá trị, học đến mức phản xạ.' },
      { band: '6,5 – 8,0', meaning: 'Thuộc công thức nhưng chậm và hay sai dấu.', next: 'Mỗi ngày 5 bài rút gọn, luôn vẽ đường tròn lượng giác để kiểm tra dấu.' },
      { band: '8,0 – 9,0', meaning: 'Chỉ còn hụt ở lọc nghiệm và bài toán thực tế cấp số.', next: 'Luyện riêng 10 bài lọc nghiệm và 5 bài lãi kép.' },
      { band: 'Trên 9,0', meaning: 'Đủ điều kiện dẫn đầu học kỳ I.', next: 'Đọc trước chương giới hạn để đi trước lớp một nhịp.' },
    ],
  },
  {
    id: 'sy-11-ck1',
    track: 'chinh-khoa',
    grade: 11,
    term: 'cuoi-ky-1',
    title: 'Toán 11 — Đề cương cuối học kỳ I',
    minutes: 90,
    format: 'Trắc nghiệm nhiều lựa chọn + đúng/sai + trả lời ngắn + tự luận · thang 10',
    scope: [
      'Toàn bộ phạm vi giữa kỳ I: lượng giác và dãy số – cấp số.',
      'Chương III — Giới hạn và hàm số liên tục: giới hạn dãy số, giới hạn hàm số, hàm số liên tục.',
      'Chương IV — Quan hệ song song trong không gian: đường thẳng và mặt phẳng song song, hai mặt phẳng song song, thiết diện.',
      'Chương V — Các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm.',
    ],
    matrix: [
      { topic: 'Lượng giác và phương trình lượng giác', topicId: 'q11-luong-giac', nhanBiet: 0.5, thongHieu: 1, vanDung: 0.5, vanDungCao: 0 },
      { topic: 'Dãy số và cấp số', topicId: 'q11-day-so', nhanBiet: 0.5, thongHieu: 0.5, vanDung: 0.5, vanDungCao: 0 },
      { topic: 'Giới hạn và hàm số liên tục', topicId: 'q11-gioi-han', nhanBiet: 1, thongHieu: 1, vanDung: 1, vanDungCao: 0.5 },
      { topic: 'Quan hệ song song trong không gian', topicId: 'q11-hinh-khong-gian', nhanBiet: 0.5, thongHieu: 1, vanDung: 0.5, vanDungCao: 0 },
      { topic: 'Phương sai và độ lệch chuẩn mẫu ghép nhóm', topicId: 'q12-thong-ke', nhanBiet: 0.5, thongHieu: 0.5, vanDung: 0, vanDungCao: 0 },
    ],
    mustKnow: [
      'Các giới hạn cơ bản: lim(1/nᵏ) = 0; lim qⁿ = 0 khi |q| < 1.',
      'Khử dạng 0/0 bằng phân tích nhân tử hoặc nhân liên hợp.',
      'Khử dạng ∞/∞ bằng cách chia cho luỹ thừa bậc cao nhất.',
      'Hàm số liên tục tại x₀ ⟺ tồn tại giới hạn tại x₀ và giới hạn đó bằng f(x₀).',
      'Đường thẳng song song mặt phẳng: d ∦ (P) khi d song song với một đường nằm trong (P) và d không nằm trong (P).',
      'Giao tuyến hai mặt phẳng lần lượt chứa hai đường song song thì song song với hai đường đó.',
      'Phương sai mẫu ghép nhóm: s² = Σfᵢxᵢ²/n − x̄², với xᵢ là giá trị đại diện của nhóm.',
    ],
    keyTypes: [
      {
        name: 'Khử dạng vô định của giới hạn hàm số',
        docVi: ['Thay trực tiếp ra 0/0, ∞/∞, ∞ − ∞ hoặc 0·∞.'],
        method: [
          'Thay giá trị để xác định đúng dạng vô định.',
          '0/0 có căn ⇒ nhân liên hợp; không căn ⇒ phân tích nhân tử.',
          '∞/∞ ⇒ chia tử và mẫu cho luỹ thừa bậc cao nhất của mẫu.',
          '∞ − ∞ có căn ⇒ nhân liên hợp để đưa về ∞/∞.',
        ],
        trap: 'Với x → −∞, quên rằng √(x²) = |x| = −x, dẫn tới sai dấu toàn bộ kết quả.',
        muc: 'van-dung',
      },
      {
        name: 'Xét tính liên tục và tìm tham số',
        docVi: ['Hàm cho bởi nhiều công thức trên nhiều khoảng.', 'Yêu cầu tìm m để hàm liên tục tại một điểm.'],
        method: [
          'Tính giới hạn trái và giới hạn phải tại điểm nối.',
          'Tính giá trị hàm tại điểm đó.',
          'Cho ba đại lượng bằng nhau rồi giải theo m.',
        ],
        trap: 'Chỉ tính một phía, hoặc quên tính giá trị f(x₀).',
        muc: 'van-dung',
      },
      {
        name: 'Tìm giao tuyến và dựng thiết diện',
        docVi: ['Đề cho hình chóp hoặc lăng trụ và một mặt phẳng qua vài điểm.'],
        method: [
          'Tìm hai điểm chung của hai mặt phẳng để có giao tuyến.',
          'Nếu chỉ tìm được một điểm chung, dùng quan hệ song song để suy ra phương của giao tuyến.',
          'Nối các giao tuyến theo thứ tự để được thiết diện, chỉ nối trong cùng một mặt.',
        ],
        trap: 'Nối hai điểm không cùng thuộc một mặt của hình — lỗi làm hỏng toàn bộ thiết diện.',
        muc: 'van-dung-cao',
      },
      {
        name: 'Tính phương sai và độ lệch chuẩn mẫu ghép nhóm',
        docVi: ['Bảng số liệu cho theo nhóm [a; b) kèm tần số.'],
        method: [
          'Lấy giá trị đại diện của mỗi nhóm là trung điểm.',
          'Tính số trung bình có trọng số.',
          'Tính Σfᵢxᵢ²/n rồi trừ đi bình phương số trung bình.',
        ],
        trap: 'Dùng đầu mút nhóm thay vì trung điểm làm giá trị đại diện.',
        muc: 'thong-hieu',
      },
    ],
    mindmap: [
      { branch: 'Giới hạn', nodes: ['Giới hạn dãy số', 'Giới hạn hàm số', 'Bốn dạng vô định', 'Hàm số liên tục'], useFor: 'Nền trực tiếp của đạo hàm ở học kỳ II và của toàn bộ giải tích lớp 12.' },
      { branch: 'Quan hệ song song', nodes: ['Đường song song đường', 'Đường song song mặt', 'Mặt song song mặt', 'Giao tuyến và thiết diện'], useFor: 'Nền của quan hệ vuông góc ở học kỳ II; cũng là nhóm câu vận dụng cao của bài cuối kỳ I.' },
      { branch: 'Thống kê phân tán', nodes: ['Khoảng biến thiên', 'Khoảng tứ phân vị', 'Phương sai', 'Độ lệch chuẩn'], useFor: 'Nhóm câu lấy điểm chắc, chỉ cần cẩn thận ở bước chọn giá trị đại diện.' },
      { branch: 'Phần ôn lại', nodes: ['Phương trình lượng giác', 'Cấp số cộng và cấp số nhân'], useFor: 'Vẫn chiếm khoảng 3,0 điểm của bài cuối kỳ, không được bỏ.' },
    ],
    plan: [
      { week: 'Tuần 1', focus: 'Ôn lại lượng giác và cấp số của giữa kỳ I', output: 'Làm lại bài giữa kỳ, sửa hết câu sai và ghi vào sổ tay lỗi.' },
      { week: 'Tuần 2', focus: 'Giới hạn dãy số và giới hạn hàm số', output: 'Khử đúng 20 giới hạn thuộc cả bốn dạng vô định.' },
      { week: 'Tuần 3', focus: 'Hàm số liên tục và quan hệ song song trong không gian', output: 'Dựng đúng 5 thiết diện và giải 5 bài tìm tham số để hàm liên tục.' },
      { week: 'Tuần 4', focus: 'Thống kê phân tán và tổng duyệt', output: 'Hai đề 90 phút đúng ma trận, tự chấm và lập bảng phân loại lỗi.' },
    ],
    selfCheck: [
      'Nhận ra ngay dạng vô định chỉ bằng phép thay giá trị.',
      'Biết khi nào nhân liên hợp, khi nào phân tích nhân tử, khi nào chia luỹ thừa.',
      'Nhớ √(x²) = −x khi x → −∞.',
      'Tìm được giao tuyến hai mặt phẳng bằng cả hai cách: hai điểm chung và quan hệ song song.',
      'Dùng trung điểm nhóm làm giá trị đại diện khi tính phương sai.',
      'Đã làm lại toàn bộ câu sai của bài giữa kỳ I.',
    ],
    targets: [
      { band: 'Dưới 6,5', meaning: 'Chương giới hạn chưa vào; đây là chương chiếm nhiều điểm nhất bài cuối kỳ.', next: 'Làm lại toàn bộ ví dụ sách giáo khoa về bốn dạng vô định.' },
      { band: '6,5 – 8,0', meaning: 'Khử được giới hạn nhưng lúng túng ở hình không gian.', next: 'Mỗi ngày một bài tìm giao tuyến, luôn vẽ hình bằng bút chì và thước.' },
      { band: '8,0 – 9,0', meaning: 'Chỉ hụt ở thiết diện và câu tham số liên tục.', next: 'Luyện 5 bài thiết diện và 5 bài liên tục có tham số.' },
      { band: 'Trên 9,0', meaning: 'Giữ được Top 1 học kỳ I lớp 11.', next: 'Đọc trước chương mũ – logarit của học kỳ II.' },
    ],
  },
  {
    id: 'sy-11-gk2',
    track: 'chinh-khoa',
    grade: 11,
    term: 'giua-ky-2',
    title: 'Toán 11 — Đề cương giữa học kỳ II',
    minutes: 60,
    format: 'Trắc nghiệm nhiều lựa chọn + đúng/sai + tự luận · thang 10',
    scope: [
      'Chương VI — Hàm số mũ và hàm số logarit: luỹ thừa với số mũ thực, logarit, hàm số mũ và logarit, phương trình và bất phương trình mũ – logarit.',
      'Chương VII (phần đầu) — Quan hệ vuông góc trong không gian: hai đường thẳng vuông góc, đường thẳng vuông góc mặt phẳng, góc giữa đường và mặt.',
    ],
    matrix: [
      { topic: 'Luỹ thừa và logarit', topicId: 'q11-mu-logarit', nhanBiet: 1, thongHieu: 1.5, vanDung: 0.5, vanDungCao: 0 },
      { topic: 'Phương trình và bất phương trình mũ – logarit', topicId: 'q11-mu-logarit', nhanBiet: 0.5, thongHieu: 1, vanDung: 1.5, vanDungCao: 0.5 },
      { topic: 'Quan hệ vuông góc trong không gian', topicId: 'q11-hinh-khong-gian', nhanBiet: 1, thongHieu: 1, vanDung: 1, vanDungCao: 0.5 },
    ],
    mustKnow: [
      'log_a(xy) = log_a x + log_a y; log_a(x/y) = log_a x − log_a y; log_a(xᵅ) = α·log_a x.',
      'Đổi cơ số: log_a b = log_c b / log_c a.',
      'Điều kiện xác định của log_a x: a > 0, a ≠ 1 và x > 0.',
      'Bất phương trình logarit đổi chiều khi cơ số nằm giữa 0 và 1.',
      'Định lí ba đường vuông góc và cách xác định góc giữa đường thẳng với mặt phẳng qua hình chiếu.',
      'Đường thẳng vuông góc mặt phẳng khi vuông góc với hai đường cắt nhau nằm trong mặt phẳng đó.',
    ],
    keyTypes: [
      {
        name: 'Rút gọn và tính biểu thức chứa logarit',
        docVi: ['Biểu thức có nhiều logarit khác cơ số.', 'Yêu cầu biểu diễn theo một logarit cho trước.'],
        method: [
          'Đưa hết về cùng một cơ số bằng công thức đổi cơ số.',
          'Dùng ba công thức tích, thương, luỹ thừa để gom.',
          'Thay giá trị đã cho ở bước cuối.',
        ],
        trap: 'Viết log(a + b) = log a + log b — công thức này SAI, chỉ đúng với tích.',
        muc: 'thong-hieu',
      },
      {
        name: 'Giải phương trình mũ và logarit',
        docVi: ['Có ẩn ở số mũ hoặc trong dấu logarit.'],
        method: [
          'Đặt điều kiện xác định trước, luôn luôn.',
          'Đưa hai vế về cùng cơ số, hoặc lấy logarit hai vế, hoặc đặt ẩn phụ.',
          'Giải phương trình thu được rồi đối chiếu điều kiện.',
        ],
        trap: 'Bỏ điều kiện xác định nên nhận nghiệm ngoại lai — lỗi mất trọn câu.',
        muc: 'van-dung',
      },
      {
        name: 'Bất phương trình mũ và logarit',
        docVi: ['Dấu bất đẳng thức kèm hàm mũ hoặc logarit.'],
        method: [
          'Đặt điều kiện xác định.',
          'Xét cơ số: lớn hơn 1 thì giữ chiều, nằm giữa 0 và 1 thì đổi chiều.',
          'Giải và giao với điều kiện.',
        ],
        trap: 'Quên đổi chiều khi cơ số nhỏ hơn 1 — bẫy được cài trong hầu hết các đề.',
        muc: 'van-dung',
      },
      {
        name: 'Chứng minh vuông góc và tính góc giữa đường với mặt',
        docVi: ['Hình chóp có một cạnh bên vuông góc với đáy.', 'Yêu cầu chứng minh vuông góc hoặc tính góc.'],
        method: [
          'Chứng minh đường vuông góc mặt bằng cách chỉ ra vuông góc với hai đường cắt nhau trong mặt.',
          'Xác định hình chiếu của đường lên mặt phẳng.',
          'Góc cần tìm là góc giữa đường và hình chiếu của nó.',
        ],
        trap: 'Xác định sai hình chiếu, dẫn tới tính nhầm một góc khác hoàn toàn.',
        muc: 'van-dung-cao',
      },
    ],
    mindmap: [
      { branch: 'Luỹ thừa và logarit', nodes: ['Luỹ thừa số mũ thực', 'Định nghĩa logarit', 'Ba công thức biến đổi', 'Đổi cơ số'], useFor: 'Bộ công cụ dùng lại nguyên vẹn ở lớp 12 khi giải phương trình mũ – logarit trong đề tốt nghiệp.' },
      { branch: 'Hàm số mũ và logarit', nodes: ['Tập xác định', 'Tính đơn điệu theo cơ số', 'Đồ thị', 'Ứng dụng lãi kép'], useFor: 'Tính đơn điệu theo cơ số chính là gốc của quy tắc đổi chiều bất phương trình.' },
      { branch: 'Quan hệ vuông góc', nodes: ['Hai đường vuông góc', 'Đường vuông góc mặt', 'Góc giữa đường và mặt', 'Định lí ba đường vuông góc'], useFor: 'Nền của khoảng cách và góc nhị diện ở cuối kỳ II, và của hình không gian lớp 12.' },
    ],
    plan: [
      { week: 'Tuần 1', focus: 'Luỹ thừa, logarit và các công thức biến đổi', output: 'Rút gọn đúng 15 biểu thức logarit, không nhìn bảng công thức.' },
      { week: 'Tuần 2', focus: 'Phương trình mũ và logarit', output: 'Giải đúng 15 phương trình, mỗi bài đều có dòng điều kiện xác định.' },
      { week: 'Tuần 3', focus: 'Bất phương trình mũ và logarit', output: 'Giải đúng 10 bất phương trình, trong đó 4 bài có cơ số nhỏ hơn 1.' },
      { week: 'Tuần 4', focus: 'Quan hệ vuông góc và tổng duyệt', output: 'Một đề 60 phút đúng ma trận, tự chấm theo barem.' },
    ],
    selfCheck: [
      'Viết được ba công thức logarit và công thức đổi cơ số từ trí nhớ.',
      'Không bao giờ viết log(a + b) = log a + log b.',
      'Luôn viết dòng điều kiện xác định trước khi giải phương trình logarit.',
      'Nhớ đổi chiều bất phương trình khi cơ số nằm giữa 0 và 1.',
      'Chứng minh được đường vuông góc mặt bằng hai đường cắt nhau.',
      'Xác định đúng hình chiếu khi tính góc giữa đường và mặt.',
    ],
    targets: [
      { band: 'Dưới 6,5', meaning: 'Công thức logarit chưa chắc.', next: 'Học thuộc và luyện riêng ba công thức biến đổi trong một tuần.' },
      { band: '6,5 – 8,0', meaning: 'Giải được phương trình nhưng hay quên điều kiện.', next: 'Quy trình bắt buộc: viết điều kiện trước, đối chiếu sau, không ngoại lệ.' },
      { band: '8,0 – 9,0', meaning: 'Chỉ hụt ở hình không gian.', next: 'Mỗi ngày một bài chứng minh vuông góc, luôn vẽ hình trước.' },
      { band: 'Trên 9,0', meaning: 'Sẵn sàng cho nhóm câu vận dụng cao.', next: 'Đọc trước chương đạo hàm và bắt đầu làm quen đề đánh giá năng lực.' },
    ],
  },
  {
    id: 'sy-11-ck2',
    track: 'chinh-khoa',
    grade: 11,
    term: 'cuoi-ky-2',
    title: 'Toán 11 — Đề cương cuối học kỳ II và tổng ôn cả năm',
    minutes: 90,
    format: 'Trắc nghiệm nhiều lựa chọn + đúng/sai + trả lời ngắn + tự luận · thang 10',
    scope: [
      'Toàn bộ phạm vi giữa kỳ II: mũ – logarit và quan hệ vuông góc.',
      'Chương VII (phần sau) — Khoảng cách trong không gian, góc nhị diện, thể tích khối lăng trụ và khối chóp.',
      'Chương VIII — Đạo hàm: định nghĩa, quy tắc tính, đạo hàm hàm hợp, đạo hàm cấp hai, ý nghĩa hình học.',
      'Chương IX — Xác suất: biến cố hợp, biến cố giao, biến cố độc lập, công thức cộng và nhân xác suất.',
    ],
    matrix: [
      { topic: 'Mũ – logarit', topicId: 'q11-mu-logarit', nhanBiet: 0.5, thongHieu: 1, vanDung: 0.5, vanDungCao: 0 },
      { topic: 'Quan hệ vuông góc, khoảng cách, thể tích', topicId: 'q11-hinh-khong-gian', nhanBiet: 0.5, thongHieu: 1, vanDung: 1, vanDungCao: 0.5 },
      { topic: 'Đạo hàm và ứng dụng', topicId: 'q11-dao-ham', nhanBiet: 1, thongHieu: 1.5, vanDung: 1, vanDungCao: 0.5 },
      { topic: 'Xác suất: biến cố hợp, giao, độc lập', topicId: 'q11-xac-suat', nhanBiet: 0.5, thongHieu: 0.5, vanDung: 0, vanDungCao: 0 },
    ],
    mustKnow: [
      "Đạo hàm cơ bản: (xⁿ)' = n·xⁿ⁻¹; (sin x)' = cos x; (cos x)' = −sin x; (eˣ)' = eˣ; (ln x)' = 1/x.",
      "Quy tắc: (uv)' = u'v + uv'; (u/v)' = (u'v − uv')/v²; đạo hàm hàm hợp (f(u))' = f'(u)·u'.",
      'Phương trình tiếp tuyến tại điểm: y = f′(x₀)(x − x₀) + f(x₀).',
      'Khoảng cách từ điểm đến mặt phẳng: dựng hình chiếu hoặc dùng công thức thể tích.',
      'Thể tích khối chóp V = (1/3)·S đáy · chiều cao; khối lăng trụ V = S đáy · chiều cao.',
      'P(A ∪ B) = P(A) + P(B) − P(A ∩ B); nếu A, B độc lập thì P(A ∩ B) = P(A)·P(B).',
    ],
    keyTypes: [
      {
        name: 'Tính đạo hàm và viết phương trình tiếp tuyến',
        docVi: ['Yêu cầu tính đạo hàm, hoặc viết tiếp tuyến tại điểm, hoặc tiếp tuyến có hệ số góc cho trước.'],
        method: [
          'Tính đạo hàm bằng quy tắc phù hợp, chú ý đạo hàm hàm hợp.',
          'Tiếp tuyến tại điểm: cần x₀, f(x₀) và f′(x₀).',
          'Tiếp tuyến biết hệ số góc k: giải f′(x₀) = k để tìm x₀.',
        ],
        trap: 'Quên nhân với đạo hàm của hàm trong khi tính đạo hàm hàm hợp.',
        muc: 'van-dung',
      },
      {
        name: 'Tính khoảng cách từ điểm đến mặt phẳng',
        docVi: ['Hình chóp có cạnh bên vuông góc đáy; yêu cầu tính khoảng cách.'],
        method: [
          'Cách 1: dựng hình chiếu vuông góc và tính trực tiếp bằng hệ thức lượng.',
          'Cách 2: dùng thể tích, d = 3V / S đáy tương ứng.',
          'Với tứ diện vuông, dùng công thức 1/d² = 1/a² + 1/b² + 1/c².',
        ],
        trap: 'Dựng hình chiếu sai chân đường vuông góc; nếu không chắc, hãy dùng cách thể tích.',
        muc: 'van-dung-cao',
      },
      {
        name: 'Xác suất của biến cố hợp và giao',
        docVi: ['Đề dùng chữ "hoặc", "và", "ít nhất một", "cả hai".'],
        method: [
          'Dịch lời văn sang ký hiệu biến cố.',
          'Kiểm tra hai biến cố có độc lập không, có xung khắc không.',
          'Áp công thức cộng hoặc nhân tương ứng; với "ít nhất một" nên dùng biến cố đối.',
        ],
        trap: 'Coi hai biến cố là xung khắc trong khi chúng chỉ độc lập, dẫn tới bỏ mất số hạng P(A ∩ B).',
        muc: 'thong-hieu',
      },
      {
        name: 'Tính thể tích khối chóp có cạnh bên vuông góc đáy',
        docVi: ['Đề nêu rõ SA ⊥ (ABCD) hoặc tương tự.'],
        method: [
          'Xác định chiều cao chính là cạnh bên vuông góc với đáy.',
          'Tính diện tích đáy bằng công thức phù hợp.',
          'Áp V = (1/3)·S đáy · chiều cao.',
        ],
        trap: 'Lấy cạnh bên bất kỳ làm chiều cao trong khi nó không vuông góc với đáy.',
        muc: 'thong-hieu',
      },
    ],
    mindmap: [
      { branch: 'Đạo hàm', nodes: ['Định nghĩa và ý nghĩa', 'Bảng đạo hàm cơ bản', 'Quy tắc tính', 'Đạo hàm hàm hợp', 'Tiếp tuyến'], useFor: 'Chương quan trọng nhất của lớp 11 xét theo mức độ dùng lại ở lớp 12 và đề tốt nghiệp.' },
      { branch: 'Hình không gian — đo lường', nodes: ['Khoảng cách điểm đến mặt', 'Góc nhị diện', 'Thể tích chóp và lăng trụ'], useFor: 'Nhóm câu vận dụng cao của bài cuối kỳ và của đề tốt nghiệp lớp 12.' },
      { branch: 'Xác suất', nodes: ['Biến cố hợp và giao', 'Biến cố độc lập', 'Công thức cộng và nhân', 'Biến cố đối'], useFor: 'Nền của xác suất có điều kiện và công thức Bayes ở lớp 12.' },
      { branch: 'Phần ôn lại', nodes: ['Mũ và logarit', 'Quan hệ vuông góc'], useFor: 'Vẫn chiếm khoảng 3,5 điểm của bài cuối kỳ.' },
    ],
    plan: [
      { week: 'Tuần 1', focus: 'Bảng đạo hàm và các quy tắc tính', output: 'Viết lại bảng đạo hàm cơ bản trong 2 phút và tính đúng 20 đạo hàm.' },
      { week: 'Tuần 2', focus: 'Đạo hàm hàm hợp và tiếp tuyến', output: 'Viết đúng 10 phương trình tiếp tuyến ở cả hai loại dữ kiện.' },
      { week: 'Tuần 3', focus: 'Khoảng cách, góc nhị diện và thể tích', output: 'Giải 5 bài khoảng cách bằng cả hai cách: dựng hình và thể tích.' },
      { week: 'Tuần 4', focus: 'Xác suất và tổng duyệt cả năm', output: 'Hai đề 90 phút đúng ma trận, tự chấm và lập bảng phân loại lỗi.' },
    ],
    selfCheck: [
      'Viết được bảng đạo hàm cơ bản và ba quy tắc tính từ trí nhớ.',
      'Không quên nhân đạo hàm của hàm trong khi lấy đạo hàm hàm hợp.',
      'Viết được tiếp tuyến từ cả hai loại dữ kiện: biết điểm và biết hệ số góc.',
      'Tính được khoảng cách từ điểm đến mặt phẳng bằng phương pháp thể tích.',
      'Phân biệt được biến cố xung khắc và biến cố độc lập.',
      'Đã làm lại toàn bộ câu sai của bài giữa kỳ II.',
    ],
    targets: [
      { band: 'Dưới 6,5', meaning: 'Chương đạo hàm chưa vào — đây là chương nặng nhất của bài cuối kỳ.', next: 'Học thuộc bảng đạo hàm rồi làm hết bài tập sách giáo khoa trước khi động vào đề.' },
      { band: '6,5 – 8,0', meaning: 'Tính được đạo hàm nhưng hụt ở hình không gian.', next: 'Luyện riêng phương pháp thể tích để tính khoảng cách.' },
      { band: '8,0 – 9,0', meaning: 'Chỉ còn hụt ở câu vận dụng cao.', next: 'Mỗi tuần 3 bài khoảng cách khó và 3 bài tiếp tuyến có tham số.' },
      { band: 'Trên 9,0', meaning: 'Giữ được Top 1 cả năm lớp 11.', next: 'Chuyển sang đề cương ôn hè lớp 11 lên 12, ưu tiên ứng dụng đạo hàm.' },
    ],
  },
  {
    id: 'sy-11-he',
    track: 'chinh-khoa',
    grade: 11,
    term: 'on-he',
    title: 'Toán 11 — Đề cương ôn hè bắc cầu lên lớp 12',
    minutes: 90,
    format: 'Tự luyện theo tuần, có bài kiểm tra đầu vào lớp 12 ở cuối đợt',
    scope: [
      'Chốt ba công cụ của lớp 11 mà lớp 12 dùng liên tục: đạo hàm, mũ – logarit, và hình không gian.',
      'Học trước chương ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số — chương mở đầu và cũng là chương nặng nhất của lớp 12.',
    ],
    matrix: [
      { topic: 'Đạo hàm và quy tắc tính', topicId: 'q11-dao-ham', nhanBiet: 0.5, thongHieu: 1, vanDung: 1, vanDungCao: 0 },
      { topic: 'Mũ và logarit', topicId: 'q11-mu-logarit', nhanBiet: 0.5, thongHieu: 1, vanDung: 0.5, vanDungCao: 0 },
      { topic: 'Hình không gian: khoảng cách và thể tích', topicId: 'q11-hinh-khong-gian', nhanBiet: 0.5, thongHieu: 0.5, vanDung: 0.5, vanDungCao: 0.5 },
      { topic: 'Học trước: ứng dụng đạo hàm khảo sát hàm số', topicId: 'q12-khao-sat-ham-so', nhanBiet: 1, thongHieu: 1.5, vanDung: 1, vanDungCao: 0 },
    ],
    mustKnow: [
      'Bảng đạo hàm cơ bản và ba quy tắc tính — nền của toàn bộ lớp 12.',
      'Dấu của đạo hàm quyết định tính đơn điệu: f′ > 0 thì đồng biến, f′ < 0 thì nghịch biến.',
      'Điểm cực trị là điểm mà đạo hàm đổi dấu, không phải chỉ là điểm mà đạo hàm bằng 0.',
      'Tiệm cận đứng tại nghiệm của mẫu không phải nghiệm của tử; tiệm cận ngang là giới hạn ở vô cực.',
      'Ba công thức logarit và quy tắc đổi chiều bất phương trình theo cơ số.',
      'Thể tích khối chóp và khối lăng trụ.',
    ],
    keyTypes: [
      {
        name: 'Lập bảng biến thiên từ đạo hàm',
        docVi: ['Yêu cầu xét tính đơn điệu, tìm cực trị, hoặc tìm giá trị lớn nhất – nhỏ nhất.'],
        method: [
          'Tìm tập xác định.',
          'Tính đạo hàm và giải phương trình đạo hàm bằng 0.',
          'Lập bảng xét dấu đạo hàm rồi suy ra bảng biến thiên.',
          'Đọc kết quả đề hỏi từ bảng biến thiên.',
        ],
        trap: 'Kết luận cực trị tại điểm mà đạo hàm bằng 0 nhưng không đổi dấu — đó không phải điểm cực trị.',
        muc: 'van-dung',
      },
      {
        name: 'Tìm giá trị lớn nhất và nhỏ nhất trên một đoạn',
        docVi: ['Đề nêu rõ đoạn [a; b].'],
        method: [
          'Tính đạo hàm và tìm các điểm tới hạn nằm trong đoạn.',
          'Tính giá trị hàm tại các điểm tới hạn và tại hai đầu mút.',
          'So sánh và kết luận.',
        ],
        trap: 'Quên tính giá trị tại hai đầu mút — lỗi phổ biến nhất của dạng này.',
        muc: 'thong-hieu',
      },
      {
        name: 'Tìm tiệm cận của đồ thị hàm phân thức',
        docVi: ['Hàm số dạng phân thức, yêu cầu tìm tiệm cận hoặc đếm số tiệm cận.'],
        method: [
          'Rút gọn phân thức trước để loại nghiệm chung của tử và mẫu.',
          'Tiệm cận đứng tại nghiệm còn lại của mẫu.',
          'Tiệm cận ngang bằng giới hạn khi x tiến ra vô cực.',
        ],
        trap: 'Không rút gọn trước, đếm thừa tiệm cận đứng tại nghiệm chung của tử và mẫu.',
        muc: 'van-dung',
      },
    ],
    mindmap: [
      { branch: 'Ba công cụ mang từ lớp 11 sang', nodes: ['Đạo hàm', 'Mũ và logarit', 'Hình không gian'], useFor: 'Lớp 12 mặc định bạn đã có ba thứ này. Hổng chỗ nào thì lớp 12 sẽ nặng ở đúng chỗ đó.' },
      { branch: 'Học trước: ứng dụng đạo hàm', nodes: ['Tính đơn điệu', 'Cực trị', 'Giá trị lớn nhất – nhỏ nhất', 'Tiệm cận', 'Đồ thị và bảng biến thiên'], useFor: 'Chương chiếm tỉ trọng lớn nhất trong đề tốt nghiệp; học trước hè thì cả năm 12 nhẹ hẳn.' },
      { branch: 'Định hướng kỳ thi', nodes: ['Đề tốt nghiệp ba phần', 'Đánh giá năng lực HSA', 'Đánh giá tư duy TSA'], useFor: 'Hè lớp 11 lên 12 là thời điểm hợp lý nhất để chọn hướng và bắt đầu luyện định dạng riêng.' },
    ],
    plan: [
      { week: 'Tuần 1 – 2', focus: 'Chốt đạo hàm và mũ – logarit', output: 'Tính đúng 40 đạo hàm và giải đúng 20 phương trình mũ – logarit.' },
      { week: 'Tuần 3 – 4', focus: 'Chốt hình không gian: khoảng cách và thể tích', output: 'Giải trọn 10 bài thể tích và khoảng cách trong hình chóp.' },
      { week: 'Tuần 5 – 6', focus: 'Học trước tính đơn điệu và cực trị', output: 'Lập đúng 15 bảng biến thiên và đọc được cực trị từ bảng.' },
      { week: 'Tuần 7 – 8', focus: 'Học trước giá trị lớn nhất – nhỏ nhất và tiệm cận', output: 'Một bài kiểm tra đầu vào lớp 12 đạt từ 8,0 trở lên.' },
    ],
    selfCheck: [
      'Viết được bảng đạo hàm cơ bản và ba quy tắc từ trí nhớ.',
      'Lập được bảng biến thiên hoàn chỉnh cho hàm bậc ba và hàm phân thức.',
      'Phân biệt được điểm mà đạo hàm bằng 0 với điểm cực trị.',
      'Nhớ tính giá trị tại hai đầu mút khi tìm giá trị lớn nhất – nhỏ nhất trên đoạn.',
      'Rút gọn phân thức trước khi đếm tiệm cận đứng.',
      'Đã chọn được hướng kỳ thi cho lớp 12 và biết định dạng đề của hướng đó.',
    ],
    targets: [
      { band: 'Dưới 6,5', meaning: 'Nền lớp 11 còn hổng, chưa nên học trước lớp 12.', next: 'Dành trọn hè cho đạo hàm và mũ – logarit.' },
      { band: '6,5 – 8,0', meaning: 'Nền đủ dùng.', next: 'Vừa củng cố vừa học trước tính đơn điệu và cực trị.' },
      { band: '8,0 – 9,0', meaning: 'Nền tốt, đi trước được.', next: 'Học trước trọn chương ứng dụng đạo hàm và làm bài tập sách giáo khoa.' },
      { band: 'Trên 9,0', meaning: 'Sẵn sàng cho mục tiêu Top 1 lớp 12 và 9+ thi tốt nghiệp.', next: 'Học trước chương ứng dụng đạo hàm và bắt đầu luyện định dạng HSA hoặc TSA nếu có dự định.' },
    ],
  },
  /* ==================== LỚP 12 ==================== */
  {
    id: 'sy-12-gk1',
    track: 'chinh-khoa',
    grade: 12,
    term: 'giua-ky-1',
    title: 'Toán 12 — Đề cương giữa học kỳ I',
    minutes: 60,
    format: 'Ba phần như đề tốt nghiệp: nhiều lựa chọn + đúng/sai + trả lời ngắn · thang 10',
    scope: [
      'Chương I — Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số: tính đơn điệu, cực trị, giá trị lớn nhất – nhỏ nhất, tiệm cận, khảo sát hàm bậc ba và hàm phân thức.',
      'Chương II (phần đầu) — Vectơ và hệ trục toạ độ trong không gian.',
    ],
    matrix: [
      { topic: 'Tính đơn điệu và cực trị', topicId: 'q12-khao-sat-ham-so', nhanBiet: 1, thongHieu: 1.5, vanDung: 1, vanDungCao: 0.5 },
      { topic: 'Giá trị lớn nhất – nhỏ nhất và tiệm cận', topicId: 'q12-khao-sat-ham-so', nhanBiet: 1, thongHieu: 1, vanDung: 1, vanDungCao: 0.5 },
      { topic: 'Vectơ trong không gian và hệ trục Oxyz', topicId: 'q12-oxyz', nhanBiet: 1, thongHieu: 1, vanDung: 0.5, vanDungCao: 0 },
    ],
    mustKnow: [
      'f′(x) > 0 trên khoảng ⇒ hàm đồng biến trên khoảng đó; f′(x) < 0 ⇒ nghịch biến.',
      'Điểm cực trị là điểm đạo hàm ĐỔI DẤU, không chỉ là điểm đạo hàm bằng 0.',
      'Hàm bậc ba có hai cực trị ⟺ y′ = 0 có hai nghiệm phân biệt ⟺ Δ > 0.',
      'Hàm phân thức bậc nhất trên bậc nhất không có cực trị và luôn đơn điệu trên từng khoảng xác định.',
      'Tiệm cận đứng tại nghiệm của mẫu sau khi đã rút gọn; tiệm cận ngang là giới hạn khi x → ±∞.',
      'Toạ độ vectơ trong không gian, tích vô hướng u→·v→ = x₁x₂ + y₁y₂ + z₁z₂.',
    ],
    keyTypes: [
      {
        name: 'Đọc bảng biến thiên hoặc đồ thị để trả lời câu hỏi',
        docVi: ['Đề cho sẵn bảng biến thiên hoặc hình đồ thị.', 'Câu hỏi về khoảng đơn điệu, số cực trị, số nghiệm phương trình.'],
        method: [
          'Đọc trực tiếp từ bảng hoặc đồ thị, không tính lại.',
          'Với câu số nghiệm của f(x) = m, kẻ đường thẳng ngang y = m và đếm giao điểm.',
          'Chú ý các giá trị đặc biệt tại đó số giao điểm thay đổi.',
        ],
        trap: 'Gộp hai khoảng đơn điệu thành một khi giữa chúng có điểm không thuộc tập xác định.',
        muc: 'thong-hieu',
      },
      {
        name: 'Tìm tham số để hàm số đơn điệu hoặc có cực trị',
        docVi: ['Hàm chứa tham số m, yêu cầu về tính đơn điệu hoặc số điểm cực trị.'],
        method: [
          'Tính đạo hàm theo x, coi m là hằng số.',
          'Với hàm bậc ba: điều kiện hai cực trị là Δ của y′ dương; đơn điệu trên ℝ là Δ ≤ 0 kèm dấu hệ số.',
          'Với hàm phân thức: điều kiện đơn điệu là tử của đạo hàm giữ nguyên dấu.',
          'Giải bất phương trình theo m và kết luận bằng tập hợp.',
        ],
        trap: 'Với hàm bậc ba, quên xét riêng trường hợp hệ số bậc ba bằng 0 khi hệ số đó chứa tham số.',
        muc: 'van-dung',
      },
      {
        name: 'Đếm số tiệm cận của đồ thị',
        docVi: ['Hàm phân thức, có thể chứa căn; câu hỏi "đồ thị có bao nhiêu đường tiệm cận".'],
        method: [
          'Tìm tập xác định trước.',
          'Rút gọn phân thức để loại nghiệm chung của tử và mẫu.',
          'Xét giới hạn một bên tại mỗi nghiệm còn lại của mẫu để xác nhận tiệm cận đứng.',
          'Xét giới hạn khi x → +∞ và x → −∞ riêng, vì có thể cho hai tiệm cận ngang khác nhau.',
        ],
        trap: 'Chỉ xét một chiều vô cực; với hàm chứa căn, hai chiều thường cho hai tiệm cận ngang khác nhau.',
        muc: 'van-dung-cao',
      },
      {
        name: 'Giá trị lớn nhất – nhỏ nhất trên đoạn và bài toán thực tế tối ưu',
        docVi: ['Đề nêu đoạn [a; b], hoặc bài toán thực tế về chi phí, thể tích, diện tích.'],
        method: [
          'Với bài thực tế: đặt ẩn kèm điều kiện, lập hàm mục tiêu một biến.',
          'Tính đạo hàm, tìm điểm tới hạn trong miền.',
          'So sánh giá trị tại điểm tới hạn và hai đầu mút.',
          'Trả lời đúng đại lượng đề hỏi, kèm đơn vị.',
        ],
        trap: 'Tìm được kích thước tối ưu rồi trả lời luôn, trong khi đề hỏi chi phí hoặc thể tích.',
        muc: 'van-dung',
      },
    ],
    mindmap: [
      { branch: 'Đạo hàm và tính đơn điệu', nodes: ['Dấu đạo hàm', 'Bảng biến thiên', 'Bài toán tham số'], useFor: 'Nhóm câu chiếm tỉ trọng lớn nhất trong cả bài kiểm tra lẫn đề tốt nghiệp.' },
      { branch: 'Cực trị', nodes: ['Điều kiện cần và đủ', 'Cực trị hàm bậc ba', 'Cực trị hàm trùng phương', 'Cực trị hàm chứa trị tuyệt đối'], useFor: 'Nguồn của phần lớn câu vận dụng cao ở phần trả lời ngắn.' },
      { branch: 'Giá trị lớn nhất – nhỏ nhất và tiệm cận', nodes: ['Trên đoạn', 'Trên khoảng', 'Tiệm cận đứng', 'Tiệm cận ngang', 'Bài toán thực tế tối ưu'], useFor: 'Nhóm câu thực tế thường xuất hiện ở phần đúng/sai.' },
      { branch: 'Oxyz — mở đầu', nodes: ['Toạ độ điểm và vectơ', 'Tích vô hướng', 'Độ dài và góc'], useFor: 'Nền của mặt phẳng, đường thẳng và mặt cầu ở học kỳ II.' },
    ],
    plan: [
      { week: 'Tuần 1', focus: 'Tính đơn điệu và bảng biến thiên', output: 'Lập đúng 20 bảng biến thiên, gồm cả hàm phân thức.' },
      { week: 'Tuần 2', focus: 'Cực trị và bài toán tham số', output: 'Giải đúng 15 bài tham số, mỗi bài đều có dòng xét hệ số bậc cao nhất.' },
      { week: 'Tuần 3', focus: 'Giá trị lớn nhất – nhỏ nhất và tiệm cận', output: 'Đếm đúng số tiệm cận của 10 hàm, trong đó có 3 hàm chứa căn.' },
      { week: 'Tuần 4', focus: 'Oxyz mở đầu và tổng duyệt', output: 'Một đề 60 phút đúng ba phần như đề tốt nghiệp, tự chấm theo barem.' },
    ],
    selfCheck: [
      'Lập được bảng biến thiên hoàn chỉnh cho hàm bậc ba, trùng phương và phân thức.',
      'Phân biệt được điểm đạo hàm bằng 0 với điểm cực trị.',
      'Nhớ xét riêng trường hợp hệ số bậc cao nhất bằng 0 khi nó chứa tham số.',
      'Rút gọn phân thức trước khi đếm tiệm cận đứng.',
      'Xét cả hai chiều vô cực khi tìm tiệm cận ngang của hàm chứa căn.',
      'Đọc lại câu hỏi trước khi ghi đáp số ở bài toán thực tế tối ưu.',
    ],
    targets: [
      { band: 'Dưới 6,5', meaning: 'Chưa đọc được bảng biến thiên — nền của toàn bộ chương.', next: 'Luyện riêng kỹ năng lập và đọc bảng biến thiên trong một tuần.' },
      { band: '6,5 – 8,0', meaning: 'Đọc được bảng nhưng hụt ở bài tham số.', next: 'Mỗi ngày một bài tham số, luôn viết dòng xét hệ số bậc cao nhất.' },
      { band: '8,0 – 9,0', meaning: 'Chỉ còn hụt ở phần trả lời ngắn và câu tiệm cận khó.', next: 'Luyện phần trả lời ngắn riêng, mỗi câu phải kiểm tra lại bằng cách thứ hai.' },
      { band: 'Trên 9,0', meaning: 'Đủ điều kiện dẫn đầu và hướng tới 9+ thi tốt nghiệp.', next: 'Bắt đầu luyện đề tốt nghiệp đầy đủ song song với chương trình trên lớp.' },
    ],
  },
  {
    id: 'sy-12-ck1',
    track: 'chinh-khoa',
    grade: 12,
    term: 'cuoi-ky-1',
    title: 'Toán 12 — Đề cương cuối học kỳ I',
    minutes: 90,
    format: 'Ba phần như đề tốt nghiệp: nhiều lựa chọn + đúng/sai + trả lời ngắn · thang 10',
    scope: [
      'Toàn bộ phạm vi giữa kỳ I: ứng dụng đạo hàm khảo sát hàm số.',
      'Chương II — Vectơ và hệ trục toạ độ trong không gian Oxyz, tích có hướng và ứng dụng.',
      'Chương III — Các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm: khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn.',
    ],
    matrix: [
      { topic: 'Ứng dụng đạo hàm khảo sát hàm số', topicId: 'q12-khao-sat-ham-so', nhanBiet: 1, thongHieu: 1.5, vanDung: 1.5, vanDungCao: 0.5 },
      { topic: 'Vectơ và toạ độ trong không gian Oxyz', topicId: 'q12-oxyz', nhanBiet: 1, thongHieu: 1.5, vanDung: 1, vanDungCao: 0.5 },
      { topic: 'Phương sai và độ lệch chuẩn mẫu ghép nhóm', topicId: 'q12-thong-ke', nhanBiet: 0.5, thongHieu: 1, vanDung: 0, vanDungCao: 0 },
    ],
    mustKnow: [
      'Toạ độ vectơ AB→ = (x_B − x_A; y_B − y_A; z_B − z_A).',
      'Tích vô hướng theo toạ độ và điều kiện vuông góc.',
      'Tích có hướng [u→, v→] vuông góc với cả hai vectơ; độ dài bằng diện tích hình bình hành dựng trên hai vectơ.',
      'Diện tích tam giác ABC = (1/2)·|[AB→, AC→]|.',
      'Thể tích tứ diện ABCD = (1/6)·|[AB→, AC→]·AD→|.',
      'Phương sai mẫu ghép nhóm s² = Σfᵢxᵢ²/n − x̄², với xᵢ là trung điểm nhóm; độ lệch chuẩn s = √(s²).',
    ],
    keyTypes: [
      {
        name: 'Tính diện tích và thể tích bằng tích có hướng',
        docVi: ['Đề cho toạ độ ba hoặc bốn điểm trong không gian.', 'Yêu cầu diện tích tam giác hoặc thể tích tứ diện.'],
        method: [
          'Viết toạ độ các vectơ xuất phát từ một đỉnh chung.',
          'Tính tích có hướng của hai vectơ.',
          'Diện tích tam giác lấy nửa độ dài tích có hướng; thể tích tứ diện lấy một phần sáu trị tuyệt đối của tích hỗn tạp.',
        ],
        trap: 'Quên hệ số 1/2 với diện tích hoặc 1/6 với thể tích; hoặc quên lấy trị tuyệt đối nên ra thể tích âm.',
        muc: 'van-dung',
      },
      {
        name: 'Chứng minh bốn điểm đồng phẳng hoặc không đồng phẳng',
        docVi: ['Đề cho bốn điểm và hỏi chúng có tạo thành tứ diện không.'],
        method: [
          'Tính ba vectơ xuất phát từ một điểm.',
          'Tính tích hỗn tạp của ba vectơ đó.',
          'Bằng 0 thì đồng phẳng, khác 0 thì không đồng phẳng và tạo thành tứ diện.',
        ],
        trap: 'Kết luận ngược: tích hỗn tạp bằng 0 nghĩa là ĐỒNG phẳng, tức KHÔNG tạo thành tứ diện.',
        muc: 'thong-hieu',
      },
      {
        name: 'Tương giao đồ thị và số nghiệm phương trình',
        docVi: ['Cho đồ thị hoặc bảng biến thiên của f(x), hỏi số nghiệm của f(x) = m hoặc f(u(x)) = m.'],
        method: [
          'Với f(x) = m: kẻ đường ngang y = m và đếm giao điểm.',
          'Với hàm hợp: đặt t = u(x), tìm số nghiệm t trước, sau đó với mỗi t đếm số x tương ứng.',
          'Cộng tổng số nghiệm x của tất cả các t.',
        ],
        trap: 'Dừng lại ở số nghiệm t mà quên đếm ngược ra số nghiệm x — lỗi mất trọn câu vận dụng cao.',
        muc: 'van-dung-cao',
      },
      {
        name: 'Tính phương sai và độ lệch chuẩn mẫu ghép nhóm',
        docVi: ['Bảng số liệu ghép nhóm dạng [a; b) kèm tần số.'],
        method: [
          'Lập cột giá trị đại diện là trung điểm mỗi nhóm.',
          'Tính số trung bình có trọng số.',
          'Tính Σfᵢxᵢ² rồi áp công thức phương sai.',
          'Lấy căn để có độ lệch chuẩn, ghi đúng đơn vị.',
        ],
        trap: 'Dùng đầu mút nhóm thay vì trung điểm; hoặc quên chia cho n ở số hạng đầu.',
        muc: 'thong-hieu',
      },
    ],
    mindmap: [
      { branch: 'Khảo sát hàm số', nodes: ['Đơn điệu', 'Cực trị', 'Giá trị lớn nhất – nhỏ nhất', 'Tiệm cận', 'Tương giao'], useFor: 'Vẫn là nhóm câu chiếm tỉ trọng lớn nhất; tương giao là chỗ ra câu vận dụng cao.' },
      { branch: 'Oxyz — công cụ vectơ', nodes: ['Toạ độ điểm và vectơ', 'Tích vô hướng', 'Tích có hướng', 'Tích hỗn tạp'], useFor: 'Ba loại tích này giải được gần hết bài hình không gian bằng toạ độ.' },
      { branch: 'Oxyz — đo lường', nodes: ['Độ dài', 'Góc', 'Diện tích tam giác', 'Thể tích tứ diện'], useFor: 'Nhóm câu lấy điểm chắc nếu thuộc công thức và cẩn thận hệ số.' },
      { branch: 'Thống kê phân tán', nodes: ['Khoảng biến thiên', 'Khoảng tứ phân vị', 'Phương sai', 'Độ lệch chuẩn'], useFor: 'Nhóm câu mới theo chương trình 2018, thường ra ở phần đúng/sai.' },
    ],
    plan: [
      { week: 'Tuần 1', focus: 'Ôn lại khảo sát hàm số của giữa kỳ I', output: 'Làm lại bài giữa kỳ và sửa hết câu sai.' },
      { week: 'Tuần 2', focus: 'Vectơ Oxyz, tích vô hướng và tích có hướng', output: 'Tính đúng 15 bài diện tích và thể tích bằng tích có hướng.' },
      { week: 'Tuần 3', focus: 'Tương giao đồ thị và hàm hợp', output: 'Giải đúng 10 bài đếm nghiệm, trong đó 4 bài là hàm hợp.' },
      { week: 'Tuần 4', focus: 'Thống kê phân tán và tổng duyệt', output: 'Hai đề 90 phút đúng ba phần, tự chấm và lập bảng phân loại lỗi.' },
    ],
    selfCheck: [
      'Viết được công thức tích có hướng và biết nó dùng để làm gì.',
      'Nhớ hệ số 1/2 cho diện tích tam giác và 1/6 cho thể tích tứ diện.',
      'Kết luận đúng chiều: tích hỗn tạp bằng 0 nghĩa là bốn điểm đồng phẳng.',
      'Với bài hàm hợp, luôn đếm ngược từ t ra x.',
      'Dùng trung điểm nhóm khi tính phương sai.',
      'Đã làm lại toàn bộ câu sai của bài giữa kỳ I.',
    ],
    targets: [
      { band: 'Dưới 6,5', meaning: 'Chưa vững Oxyz — chương chiếm 4,0 điểm của bài.', next: 'Học thuộc ba loại tích và làm hết bài tập sách giáo khoa.' },
      { band: '6,5 – 8,0', meaning: 'Tính được nhưng hay sai hệ số và dấu.', next: 'Lập bảng công thức riêng cho Oxyz, dán lên góc bàn học.' },
      { band: '8,0 – 9,0', meaning: 'Chỉ hụt ở câu tương giao hàm hợp.', next: 'Luyện riêng 10 bài hàm hợp, luôn đếm ngược từ t ra x.' },
      { band: 'Trên 9,0', meaning: 'Giữ được Top 1 học kỳ I lớp 12.', next: 'Bắt đầu luyện đề tốt nghiệp trọn vẹn mỗi tuần một đề.' },
    ],
  },
  {
    id: 'sy-12-gk2',
    track: 'chinh-khoa',
    grade: 12,
    term: 'giua-ky-2',
    title: 'Toán 12 — Đề cương giữa học kỳ II',
    minutes: 60,
    format: 'Ba phần như đề tốt nghiệp: nhiều lựa chọn + đúng/sai + trả lời ngắn · thang 10',
    scope: [
      'Chương IV — Nguyên hàm và tích phân: định nghĩa, bảng nguyên hàm, đổi biến, từng phần, ứng dụng tính diện tích và thể tích.',
      'Chương V (phần đầu) — Phương pháp toạ độ trong không gian: phương trình mặt phẳng.',
    ],
    matrix: [
      { topic: 'Nguyên hàm và bảng nguyên hàm', topicId: 'q12-nguyen-ham-tich-phan', nhanBiet: 1, thongHieu: 1, vanDung: 0.5, vanDungCao: 0 },
      { topic: 'Tích phân: đổi biến, từng phần, ứng dụng', topicId: 'q12-nguyen-ham-tich-phan', nhanBiet: 0.5, thongHieu: 1.5, vanDung: 1.5, vanDungCao: 0.5 },
      { topic: 'Phương trình mặt phẳng trong không gian', topicId: 'q12-oxyz', nhanBiet: 1, thongHieu: 1.5, vanDung: 1, vanDungCao: 0 },
    ],
    mustKnow: [
      '∫xⁿ dx = xⁿ⁺¹/(n + 1) + C với n ≠ −1; ∫(1/x) dx = ln|x| + C.',
      '∫eˣ dx = eˣ + C; ∫sin x dx = −cos x + C; ∫cos x dx = sin x + C.',
      'Đổi biến: đặt t = u(x) thì dt = u′(x) dx, và PHẢI đổi cận ngay khi đặt.',
      'Từng phần: ∫u dv = uv − ∫v du; ưu tiên đặt u theo thứ tự logarit, đa thức, lượng giác, mũ.',
      'Diện tích hình phẳng giới hạn bởi hai đồ thị: ∫|f(x) − g(x)| dx trên đoạn giao.',
      'Mặt phẳng qua M(x₀; y₀; z₀) có vectơ pháp tuyến (A; B; C): A(x − x₀) + B(y − y₀) + C(z − z₀) = 0.',
    ],
    keyTypes: [
      {
        name: 'Tích phân đổi biến',
        docVi: ['Trong tích phân xuất hiện một biểu thức và đạo hàm của nó (sai khác một hằng số).'],
        method: [
          'Đặt t bằng biểu thức bên trong, tính dt.',
          'Đổi cận NGAY tại dòng đặt biến, không để đến cuối.',
          'Viết lại tích phân hoàn toàn theo t, rồi tính.',
        ],
        trap: 'Quên đổi cận — lỗi mất điểm số một của chương tích phân.',
        muc: 'van-dung',
      },
      {
        name: 'Tích phân từng phần',
        docVi: ['Tích phân của tích hai loại hàm khác nhau: đa thức nhân mũ, đa thức nhân lượng giác, hoặc có logarit.'],
        method: [
          'Chọn u theo thứ tự ưu tiên logarit, đa thức, lượng giác, mũ.',
          'Phần còn lại là dv, tính v bằng nguyên hàm.',
          'Áp công thức, có thể phải làm từng phần lần hai.',
        ],
        trap: 'Chọn u sai thứ tự khiến tích phân mới còn khó hơn tích phân ban đầu.',
        muc: 'van-dung',
      },
      {
        name: 'Tính diện tích hình phẳng',
        docVi: ['Đề cho hai đồ thị hoặc một đồ thị với trục hoành, yêu cầu diện tích.'],
        method: [
          'Tìm hoành độ giao điểm để xác định cận.',
          'Xác định hàm nào nằm trên trong từng khoảng.',
          'Tính tích phân của hiệu, lấy hàm trên trừ hàm dưới; nếu đổi vai trò thì chia thành nhiều tích phân.',
        ],
        trap: 'Bỏ dấu giá trị tuyệt đối khi hai đồ thị cắt nhau ở giữa đoạn, dẫn tới diện tích bị trừ bớt.',
        muc: 'van-dung-cao',
      },
      {
        name: 'Viết phương trình mặt phẳng',
        docVi: ['Đề cho ba điểm, hoặc điểm và pháp tuyến, hoặc điều kiện song song và vuông góc với mặt khác.'],
        method: [
          'Tìm một điểm thuộc mặt phẳng và một vectơ pháp tuyến.',
          'Với ba điểm: pháp tuyến là tích có hướng của hai vectơ trong mặt phẳng.',
          'Với mặt song song: giữ nguyên pháp tuyến, đổi hằng số tự do.',
          'Thay điểm vào để tìm hằng số và viết phương trình.',
        ],
        trap: 'Với mặt phẳng song song, quên kiểm tra hằng số mới khác hằng số cũ; nếu bằng thì đó là chính mặt phẳng đã cho.',
        muc: 'thong-hieu',
      },
    ],
    mindmap: [
      { branch: 'Nguyên hàm', nodes: ['Bảng nguyên hàm cơ bản', 'Tính chất tuyến tính', 'Nguyên hàm của hàm hợp dạng đơn giản'], useFor: 'Không thuộc bảng thì mọi bài tích phân đều tắc ở dòng đầu.' },
      { branch: 'Kỹ thuật tính tích phân', nodes: ['Đổi biến', 'Từng phần', 'Tách phân thức', 'Tích phân hàm chứa trị tuyệt đối'], useFor: 'Bốn kỹ thuật này phủ gần hết các câu tích phân trong đề tốt nghiệp.' },
      { branch: 'Ứng dụng tích phân', nodes: ['Diện tích hình phẳng', 'Thể tích khối tròn xoay', 'Bài toán chuyển động'], useFor: 'Nhóm câu vận dụng và vận dụng cao; cũng hay ra ở phần trả lời ngắn.' },
      { branch: 'Mặt phẳng trong Oxyz', nodes: ['Vectơ pháp tuyến', 'Phương trình tổng quát', 'Mặt phẳng theo đoạn chắn', 'Khoảng cách điểm đến mặt'], useFor: 'Nền của đường thẳng và mặt cầu ở phần sau của học kỳ II.' },
    ],
    plan: [
      { week: 'Tuần 1', focus: 'Bảng nguyên hàm và nguyên hàm cơ bản', output: 'Viết lại bảng nguyên hàm trong 3 phút và tính đúng 20 nguyên hàm.' },
      { week: 'Tuần 2', focus: 'Tích phân đổi biến', output: 'Tính đúng 15 tích phân đổi biến, mỗi bài đều có dòng đổi cận.' },
      { week: 'Tuần 3', focus: 'Tích phân từng phần và ứng dụng diện tích', output: 'Tính đúng 10 tích phân từng phần và 5 bài diện tích hình phẳng.' },
      { week: 'Tuần 4', focus: 'Phương trình mặt phẳng và tổng duyệt', output: 'Một đề 60 phút đúng ba phần, tự chấm theo barem.' },
    ],
    selfCheck: [
      'Viết được bảng nguyên hàm cơ bản từ trí nhớ.',
      'Luôn đổi cận ngay tại dòng đặt biến.',
      'Nhớ thứ tự ưu tiên chọn u khi tính từng phần.',
      'Xác định đúng hàm nào nằm trên khi tính diện tích hình phẳng.',
      'Viết được phương trình mặt phẳng từ cả bốn loại dữ kiện đề hay cho.',
      'Kiểm tra hằng số tự do khi viết mặt phẳng song song.',
    ],
    targets: [
      { band: 'Dưới 6,5', meaning: 'Chưa thuộc bảng nguyên hàm.', next: 'Học thuộc bảng rồi làm 30 nguyên hàm cơ bản trước khi đụng tích phân.' },
      { band: '6,5 – 8,0', meaning: 'Tính được nhưng hay quên đổi cận.', next: 'Quy trình bắt buộc: đặt biến và đổi cận trên cùng một dòng.' },
      { band: '8,0 – 9,0', meaning: 'Chỉ hụt ở ứng dụng diện tích và thể tích.', next: 'Luyện riêng 10 bài diện tích, luôn vẽ phác đồ thị trước.' },
      { band: 'Trên 9,0', meaning: 'Sẵn sàng cho nhóm câu vận dụng cao của đề tốt nghiệp.', next: 'Mỗi tuần một đề tốt nghiệp trọn vẹn, tính giờ nghiêm túc.' },
    ],
  },
  {
    id: 'sy-12-ck2',
    track: 'chinh-khoa',
    grade: 12,
    term: 'cuoi-ky-2',
    title: 'Toán 12 — Đề cương cuối học kỳ II và tổng ôn cả năm',
    minutes: 90,
    format: 'Ba phần đúng cấu trúc đề tốt nghiệp THPT · thang 10',
    scope: [
      'Toàn bộ phạm vi giữa kỳ II: nguyên hàm, tích phân và mặt phẳng.',
      'Chương V (phần sau) — Đường thẳng trong không gian, mặt cầu, góc và khoảng cách.',
      'Chương VI — Xác suất có điều kiện và công thức Bayes.',
      'Tổng ôn cả năm theo đúng ma trận đề tốt nghiệp THPT.',
    ],
    matrix: [
      { topic: 'Ứng dụng đạo hàm khảo sát hàm số', topicId: 'q12-khao-sat-ham-so', nhanBiet: 0.5, thongHieu: 1, vanDung: 0.5, vanDungCao: 0 },
      { topic: 'Nguyên hàm và tích phân', topicId: 'q12-nguyen-ham-tich-phan', nhanBiet: 0.5, thongHieu: 1, vanDung: 1, vanDungCao: 0.5 },
      { topic: 'Toạ độ trong không gian: mặt phẳng, đường thẳng, mặt cầu', topicId: 'q12-oxyz', nhanBiet: 0.5, thongHieu: 1, vanDung: 1, vanDungCao: 0.5 },
      { topic: 'Xác suất có điều kiện và công thức Bayes', topicId: 'q12-xac-suat-co-dieu-kien', nhanBiet: 0.5, thongHieu: 1, vanDung: 0.5, vanDungCao: 0 },
    ],
    mustKnow: [
      'Đường thẳng qua M có vectơ chỉ phương u→: phương trình tham số x = x₀ + at, y = y₀ + bt, z = z₀ + ct.',
      'Mặt cầu tâm I(a; b; c) bán kính R: (x − a)² + (y − b)² + (z − c)² = R².',
      'Khoảng cách từ điểm đến mặt phẳng Ax + By + Cz + D = 0: |Ax₀ + By₀ + Cz₀ + D| / √(A² + B² + C²).',
      'Mặt phẳng tiếp xúc mặt cầu ⟺ khoảng cách từ tâm đến mặt phẳng bằng bán kính.',
      'Xác suất có điều kiện: P(A|B) = P(A ∩ B) / P(B) với P(B) > 0.',
      'Công thức xác suất toàn phần và công thức Bayes.',
    ],
    keyTypes: [
      {
        name: 'Viết phương trình đường thẳng trong không gian',
        docVi: ['Đề cho hai điểm, hoặc điểm và vectơ chỉ phương, hoặc giao tuyến hai mặt phẳng, hoặc điều kiện vuông góc.'],
        method: [
          'Tìm một điểm thuộc đường và một vectơ chỉ phương.',
          'Với giao tuyến hai mặt phẳng: vectơ chỉ phương là tích có hướng của hai pháp tuyến.',
          'Viết phương trình tham số, rồi chuyển sang chính tắc nếu đề yêu cầu.',
        ],
        trap: 'Chuyển sang dạng chính tắc khi có thành phần của vectơ chỉ phương bằng 0 — khi đó không viết được dạng chính tắc đầy đủ.',
        muc: 'van-dung',
      },
      {
        name: 'Bài toán mặt cầu và vị trí tương đối',
        docVi: ['Có mặt cầu và một mặt phẳng hoặc đường thẳng, hỏi vị trí tương đối hoặc bán kính đường tròn giao tuyến.'],
        method: [
          'Xác định tâm và bán kính mặt cầu.',
          'Tính khoảng cách từ tâm đến mặt phẳng hoặc đường thẳng.',
          'So sánh với bán kính để kết luận; bán kính đường tròn giao tuyến r = √(R² − d²).',
        ],
        trap: 'Với phương trình mặt cầu dạng khai triển, quên kiểm tra điều kiện để nó thực sự là mặt cầu.',
        muc: 'van-dung',
      },
      {
        name: 'Xác suất có điều kiện và công thức Bayes',
        docVi: ['Bài có hai giai đoạn: chọn nguồn rồi mới quan sát kết quả.', 'Câu hỏi dạng "biết rằng… tính xác suất…".'],
        method: [
          'Đặt tên biến cố cho từng nguồn và cho kết quả quan sát được.',
          'Ghi ra các xác suất đề cho, phân biệt rõ xác suất có điều kiện.',
          'Tính xác suất toàn phần của kết quả quan sát.',
          'Áp công thức Bayes để tính xác suất ngược.',
        ],
        trap: 'Nhầm P(A|B) với P(B|A) — đây là bẫy trung tâm của toàn bộ chương này.',
        muc: 'van-dung',
      },
      {
        name: 'Câu vận dụng cao dạng cực trị trong Oxyz',
        docVi: ['Yêu cầu tìm điểm M thuộc một mặt hoặc một đường sao cho một biểu thức đạt giá trị nhỏ nhất.'],
        method: [
          'Tham số hoá điểm M theo phương trình của mặt hoặc đường.',
          'Viết biểu thức cần tối ưu theo tham số.',
          'Dùng đạo hàm hoặc bất đẳng thức để tìm giá trị nhỏ nhất.',
          'Trả lại toạ độ điểm M.',
        ],
        trap: 'Tìm được tham số rồi dừng, trong khi đề hỏi toạ độ điểm hoặc giá trị của biểu thức.',
        muc: 'van-dung-cao',
      },
    ],
    mindmap: [
      { branch: 'Oxyz đầy đủ', nodes: ['Mặt phẳng', 'Đường thẳng', 'Mặt cầu', 'Góc và khoảng cách', 'Cực trị trong Oxyz'], useFor: 'Chiếm tỉ trọng lớn nhất của học kỳ II và của phần hình học trong đề tốt nghiệp.' },
      { branch: 'Tích phân', nodes: ['Đổi biến', 'Từng phần', 'Diện tích', 'Thể tích tròn xoay'], useFor: 'Nhóm câu ổn định điểm nếu thuộc kỹ thuật; hay ra ở phần trả lời ngắn.' },
      { branch: 'Xác suất có điều kiện', nodes: ['Định nghĩa', 'Sơ đồ cây', 'Xác suất toàn phần', 'Công thức Bayes'], useFor: 'Chương mới của chương trình 2018; thường ra ở phần đúng/sai với bốn mệnh đề.' },
      { branch: 'Tổng ôn cả năm', nodes: ['Khảo sát hàm số', 'Tích phân', 'Oxyz', 'Xác suất', 'Thống kê'], useFor: 'Đây chính là năm mảng của đề tốt nghiệp THPT; bài cuối kỳ II là buổi tổng duyệt.' },
    ],
    plan: [
      { week: 'Tuần 1', focus: 'Đường thẳng trong không gian và vị trí tương đối', output: 'Viết được phương trình đường thẳng từ cả bốn loại dữ kiện.' },
      { week: 'Tuần 2', focus: 'Mặt cầu, góc và khoảng cách trong Oxyz', output: 'Giải đúng 10 bài mặt cầu, gồm cả bài đường tròn giao tuyến.' },
      { week: 'Tuần 3', focus: 'Xác suất có điều kiện và công thức Bayes', output: 'Vẽ sơ đồ cây và giải đúng 10 bài Bayes.' },
      { week: 'Tuần 4', focus: 'Tổng ôn cả năm theo ma trận đề tốt nghiệp', output: 'Ba đề tốt nghiệp trọn vẹn, tính giờ, tự chấm và lập bảng phân loại lỗi.' },
    ],
    selfCheck: [
      'Viết được phương trình đường thẳng ở cả dạng tham số và chính tắc, biết khi nào không viết được chính tắc.',
      'Kiểm tra điều kiện để phương trình khai triển là mặt cầu.',
      'Tính được bán kính đường tròn giao tuyến bằng r = √(R² − d²).',
      'Phân biệt chắc P(A|B) với P(B|A).',
      'Vẽ được sơ đồ cây cho bài xác suất hai giai đoạn.',
      'Đã làm ít nhất ba đề tốt nghiệp trọn vẹn có tính giờ.',
    ],
    targets: [
      { band: 'Dưới 6,5', meaning: 'Oxyz chưa vào; đây là chương chiếm nhiều điểm nhất học kỳ II.', next: 'Ưu tiên mặt phẳng và đường thẳng trước, mặt cầu sau.' },
      { band: '6,5 – 8,0', meaning: 'Làm được câu cơ bản, mất điểm ở xác suất có điều kiện.', next: 'Luyện riêng sơ đồ cây; mỗi bài đều phải vẽ cây trước khi tính.' },
      { band: '8,0 – 9,0', meaning: 'Chỉ còn hụt ở câu cực trị Oxyz và phần trả lời ngắn.', next: 'Mỗi tuần 5 câu trả lời ngắn, bắt buộc kiểm tra lại bằng cách thứ hai.' },
      { band: 'Trên 9,0', meaning: 'Giữ Top 1 cả năm và đủ sức nhắm 9+ thi tốt nghiệp.', next: 'Chuyển sang lộ trình luyện thi: đề tốt nghiệp, và HSA hoặc TSA nếu có xét tuyển bằng đánh giá năng lực.' },
    ],
  },
  {
    id: 'sy-12-he',
    track: 'chinh-khoa',
    grade: 12,
    term: 'ca-nam',
    title: 'Toán 12 — Tổng ôn cả năm và bắc cầu sang kỳ thi',
    minutes: 90,
    format: 'Tổng ôn theo năm mảng của đề tốt nghiệp, kèm định hướng HSA – TSA – SAT',
    scope: [
      'Năm mảng của đề tốt nghiệp THPT: ứng dụng đạo hàm, nguyên hàm – tích phân, toạ độ Oxyz, xác suất, thống kê.',
      'Ba định dạng kỳ thi bổ sung: đánh giá năng lực HSA (ĐHQGHN), đánh giá tư duy TSA (ĐHBKHN), và phần Toán của SAT nếu xét tuyển bằng chứng chỉ quốc tế.',
    ],
    matrix: [
      { topic: 'Ứng dụng đạo hàm khảo sát hàm số', topicId: 'q12-khao-sat-ham-so', nhanBiet: 0.5, thongHieu: 1, vanDung: 1, vanDungCao: 0.5 },
      { topic: 'Nguyên hàm và tích phân', topicId: 'q12-nguyen-ham-tich-phan', nhanBiet: 0.5, thongHieu: 1, vanDung: 0.5, vanDungCao: 0.5 },
      { topic: 'Toạ độ trong không gian Oxyz', topicId: 'q12-oxyz', nhanBiet: 0.5, thongHieu: 1, vanDung: 0.5, vanDungCao: 0.5 },
      { topic: 'Xác suất và thống kê', topicId: 'q12-xac-suat-co-dieu-kien', nhanBiet: 0.5, thongHieu: 1, vanDung: 0.5, vanDungCao: 0 },
    ],
    mustKnow: [
      'Toàn bộ bảng đạo hàm và bảng nguyên hàm — không tra cứu, phải viết được ra giấy.',
      'Ba loại tích trong Oxyz và ý nghĩa hình học của từng loại.',
      'Công thức khoảng cách điểm đến mặt phẳng và điểm đến đường thẳng.',
      'Công thức xác suất toàn phần và công thức Bayes.',
      'Phương sai và độ lệch chuẩn của mẫu ghép nhóm.',
      'Quy tắc kiểm tra chéo cho phần trả lời ngắn: mọi đáp số phải được tính lại bằng cách thứ hai.',
    ],
    keyTypes: [
      {
        name: 'Làm phần trả lời ngắn với quy trình kiểm tra chéo',
        docVi: ['Phần III của đề tốt nghiệp, không có phương án để loại trừ.'],
        method: [
          'Giải bình thường và ghi đáp số ra nháp.',
          'Tính lại bằng một cách thứ hai: thay ngược, ước lượng, hoặc dùng công thức khác.',
          'Chỉ điền vào phiếu khi hai cách cho cùng kết quả.',
          'Kiểm tra định dạng đáp số theo yêu cầu (số nguyên hay số thập phân, mấy chữ số).',
        ],
        trap: 'Điền ngay sau lần tính đầu tiên. Phần này không có phương án để phát hiện sai, nên sai là mất trọn điểm.',
        muc: 'van-dung',
      },
      {
        name: 'Làm phần đúng/sai bốn mệnh đề',
        docVi: ['Phần II của đề tốt nghiệp: một tình huống kèm bốn mệnh đề con.'],
        method: [
          'Làm các phép tính chung một lần cho cả bốn ý.',
          'Xét từng ý dựa trên kết quả chung đó.',
          'Ý nào không chắc thì đánh dấu, quay lại sau; barem của phần này luỹ tiến nên đúng nhiều ý vẫn có điểm.',
        ],
        trap: 'Làm lại từ đầu cho từng ý, mất gấp bốn thời gian mà không thêm độ chính xác.',
        muc: 'thong-hieu',
      },
      {
        name: 'Chuyển đổi giữa các định dạng kỳ thi',
        docVi: ['Học sinh vừa thi tốt nghiệp vừa dự HSA hoặc TSA.'],
        method: [
          'Nhận diện khác biệt: đề tốt nghiệp ba phần, thang 10; HSA và TSA trắc nghiệm nhiều lựa chọn, tốc độ cao hơn, phạm vi rộng hơn.',
          'Giữ cùng một nền kiến thức, chỉ luyện riêng phần tốc độ và phần đọc hiểu dữ liệu.',
          'Với SAT, chú ý đề bằng tiếng Anh và có phần dữ liệu – thống kê nặng hơn.',
        ],
        trap: 'Học hai bộ tài liệu tách rời nhau. Nền kiến thức là một; chỉ định dạng và tốc độ là khác.',
        muc: 'van-dung-cao',
      },
    ],
    mindmap: [
      { branch: 'Năm mảng của đề tốt nghiệp', nodes: ['Ứng dụng đạo hàm', 'Tích phân', 'Oxyz', 'Xác suất', 'Thống kê'], useFor: 'Bản đồ để phân bổ thời gian ôn: mảng nào yếu nhất thì dành nhiều tuần nhất.' },
      { branch: 'Ba phần của đề', nodes: ['Nhiều lựa chọn', 'Đúng/sai bốn mệnh đề', 'Trả lời ngắn'], useFor: 'Mỗi phần có chiến thuật riêng; phần trả lời ngắn cần quy trình kiểm tra chéo.' },
      { branch: 'Các kỳ thi bổ sung', nodes: ['HSA — ĐHQGHN', 'TSA — ĐHBKHN', 'SAT phần Toán'], useFor: 'Cùng nền kiến thức, khác định dạng và tốc độ. Chọn tối đa một kỳ bổ sung để không bị dàn trải.' },
      { branch: 'Chiến thuật phòng thi', nodes: ['Phân bổ thời gian ba phần', 'Kỹ thuật bỏ qua và quay lại', 'Quy trình soát bài'], useFor: 'Phần quyết định khoảng cách giữa điểm thi thử và điểm thi thật.' },
    ],
    plan: [
      { week: 'Tuần 1 – 2', focus: 'Tổng ôn ứng dụng đạo hàm và tích phân', output: 'Hai mảng này đạt trên 85% ở đề tự luyện.' },
      { week: 'Tuần 3 – 4', focus: 'Tổng ôn Oxyz', output: 'Giải trọn phần hình học của ba đề tốt nghiệp gần nhất.' },
      { week: 'Tuần 5', focus: 'Tổng ôn xác suất và thống kê', output: 'Không còn sai ở nhóm câu xác suất có điều kiện.' },
      { week: 'Tuần 6 – 8', focus: 'Luyện đề trọn vẹn và chiến thuật phòng thi', output: 'Sáu đề tính giờ, điểm ổn định trong khoảng 1,0 điểm giữa các đề.' },
    ],
    selfCheck: [
      'Viết được bảng đạo hàm và bảng nguyên hàm từ trí nhớ trong 5 phút.',
      'Giải được phần hình học Oxyz của một đề tốt nghiệp trong 20 phút.',
      'Luôn kiểm tra chéo mọi đáp số của phần trả lời ngắn.',
      'Làm phần đúng/sai bằng một lượt tính chung cho cả bốn ý.',
      'Đã chọn xong kỳ thi bổ sung (nếu có) và biết định dạng của kỳ đó.',
      'Điểm sáu đề tự luyện gần nhất dao động không quá 1,0 điểm.',
    ],
    targets: [
      { band: 'Dưới 6,5', meaning: 'Còn hổng mảng lớn; cần xác định đúng mảng nào trước khi luyện đề.', next: 'Làm một đề chẩn đoán, xếp năm mảng theo thứ tự yếu dần, rồi ôn theo thứ tự đó.' },
      { band: '6,5 – 8,0', meaning: 'Nền đủ nhưng chưa ổn định giữa các đề.', next: 'Tăng số đề tính giờ; sau mỗi đề lập bảng phân loại lỗi theo ba nhóm nguyên nhân.' },
      { band: '8,0 – 9,0', meaning: 'Chỉ còn hụt ở phần trả lời ngắn và nhóm câu vận dụng cao.', next: 'Mỗi tuần 10 câu trả lời ngắn có kiểm tra chéo, và 5 câu vận dụng cao.' },
      { band: 'Trên 9,0', meaning: 'Đủ sức nhắm 9–10 điểm thi tốt nghiệp.', next: 'Duy trì nhịp một đề mỗi tuần; nếu dự HSA hoặc TSA thì thêm một buổi luyện tốc độ riêng.' },
    ],
  },
];

export const syllabusById = (id: string) => SYLLABI.find((s) => s.id === id);
export const syllabiByGrade = (grade: number) => SYLLABI.filter((s) => s.grade === grade);
export const syllabiByTerm = (term: SyllabusTerm) => SYLLABI.filter((s) => s.term === term);

export const syllabusStats = () => {
  const grades = [...new Set(SYLLABI.map((s) => s.grade))].sort((a, b) => a - b);
  return {
    total: SYLLABI.length,
    grades,
    types: SYLLABI.reduce((s, x) => s + x.keyTypes.length, 0),
    branches: SYLLABI.reduce((s, x) => s + x.mindmap.length, 0),
    rows: SYLLABI.reduce((s, x) => s + x.matrix.length, 0),
    weeks: SYLLABI.reduce((s, x) => s + x.plan.length, 0),
    checks: SYLLABI.reduce((s, x) => s + x.selfCheck.length, 0),
  };
};

/** Tổng điểm của một ma trận — phải bằng 10; dùng cho kiểm tra tự động. */
export const matrixTotal = (s: Syllabus) => Math.round(sumMatrix(s.matrix) * 100) / 100;
