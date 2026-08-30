import type { PageId } from '@/lib/routes';

/**
 * BẢN ĐỒ TỪ KHOÁ THEO Ý ĐỊNH TÌM KIẾM
 *
 * Nguyên tắc: mỗi ý định tìm kiếm được phục vụ bởi đúng một trang. Hai trang
 * cùng nhắm một từ khoá sẽ tự cạnh tranh nhau và cả hai cùng tụt hạng.
 *
 * Bốn nhóm ý định:
 *   — thong-tin: người tìm muốn biết một điều gì đó (“cấu trúc đề thi vào 10 gồm mấy bài”).
 *   — tai-lieu:  người tìm muốn lấy về một thứ dùng được (“đề thi thử có lời giải”).
 *   — huong-dan: người tìm muốn biết cách làm (“cách rút gọn biểu thức chứa căn”).
 *   — thuong-hieu: người tìm đã biết tên và tìm đúng nơi đó.
 *
 * Số liệu lượng tìm kiếm KHÔNG được ghi ở đây, vì không có nguồn đo thật.
 * Cột “mức độ ưu tiên” là đánh giá nội bộ dựa trên mức phù hợp giữa nội dung
 * đang có và ý định tìm kiếm, không phải dự báo thứ hạng.
 */

export type Intent = 'thong-tin' | 'tai-lieu' | 'huong-dan' | 'thuong-hieu';

export const INTENT_META: Record<Intent, { label: string; color: string; note: string }> = {
  'thong-tin': {
    label: 'Tìm thông tin',
    color: '#1B4F9C',
    note: 'Cần câu trả lời thẳng ngay đoạn đầu, có số liệu, và nêu rõ nguồn.',
  },
  'tai-lieu': {
    label: 'Tìm tài liệu',
    color: '#0F766E',
    note: 'Cần thứ dùng được ngay trên trang, không bắt đăng ký trước khi cho xem.',
  },
  'huong-dan': {
    label: 'Tìm cách làm',
    color: '#F0A21B',
    note: 'Cần quy trình theo bước, ví dụ có lời giải, và cảnh báo lỗi hay mắc.',
  },
  'thuong-hieu': {
    label: 'Tìm theo tên',
    color: '#E01B24',
    note: 'Cần trang chủ rõ ràng, thông tin tổ chức minh bạch, không gây nghi ngờ.',
  },
};

export interface KeywordTarget {
  keyword: string;
  intent: Intent;
  /** Trang duy nhất chịu trách nhiệm phục vụ từ khoá này. */
  page: PageId;
  /** Câu hỏi ẩn sau từ khoá — thứ người tìm thật sự muốn biết. */
  behind: string;
  /** Nội dung đang có đáp ứng ý định đó ở mức nào (1–5), đánh giá nội bộ. */
  fit: 1 | 2 | 3 | 4 | 5;
}

export const KEYWORDS: KeywordTarget[] = [
  /* --- Cấu trúc đề thi --- */
  { keyword: 'cấu trúc đề thi toán vào 10 hà nội', intent: 'thong-tin', page: 'cau-truc-de-thi', behind: 'Đề gồm mấy bài, mỗi bài mấy điểm, thời gian bao lâu.', fit: 5 },
  { keyword: 'ma trận đề thi toán vào lớp 10', intent: 'thong-tin', page: 'cau-truc-de-thi', behind: 'Phân bố điểm theo mạch kiến thức để biết học gì trước.', fit: 5 },
  { keyword: 'cấu trúc đề thi chuyên toán khtn', intent: 'thong-tin', page: 'cau-truc-de-thi', behind: 'Vòng 1 và vòng 2 khác nhau thế nào, thi những mảng nào.', fit: 5 },
  { keyword: 'đề thi tốt nghiệp thpt môn toán 3 phần tính điểm', intent: 'thong-tin', page: 'cau-truc-de-thi', behind: 'Cơ chế điểm luỹ tiến phần đúng/sai hoạt động ra sao.', fit: 5 },
  { keyword: 'điểm chuẩn chuyên toán ams chu văn an', intent: 'thong-tin', page: 'cau-truc-de-thi', behind: 'Cần bao nhiêu điểm thì an toàn.', fit: 3 },

  /* --- Đề thi thử --- */
  { keyword: 'đề thi thử toán vào 10 có lời giải chi tiết', intent: 'tai-lieu', page: 'de-thi', behind: 'Muốn một đề trọn vẹn kèm lời giải để tự làm và tự chấm.', fit: 5 },
  { keyword: 'đề thi thử toán chuyên có đáp án', intent: 'tai-lieu', page: 'de-thi', behind: 'Đề đúng độ khó chuyên, không phải đề vào 10 thường.', fit: 5 },
  { keyword: 'barem chấm điểm toán vào 10', intent: 'tai-lieu', page: 'de-thi', behind: 'Mỗi 0,25 điểm gắn với bước nào trên bài làm.', fit: 5 },
  { keyword: 'đề thi thử tốt nghiệp thpt môn toán có lời giải', intent: 'tai-lieu', page: 'de-thi', behind: 'Đề đúng định dạng ba phần mới.', fit: 5 },

  /* --- Chuyên đề và cách làm --- */
  { keyword: 'cách rút gọn biểu thức chứa căn bậc hai', intent: 'huong-dan', page: 'chuyen-de-detail', behind: 'Quy trình từng bước và lỗi hay mắc khi quy đồng.', fit: 5 },
  { keyword: 'định lý viète bài tập có lời giải', intent: 'huong-dan', page: 'chuyen-de-detail', behind: 'Các hệ thức đối xứng và cách xử lý bài tham số.', fit: 5 },
  { keyword: 'cách chứng minh tứ giác nội tiếp', intent: 'huong-dan', page: 'chuyen-de-detail', behind: 'Bốn dấu hiệu và cách chọn dấu hiệu phù hợp với hình.', fit: 5 },
  { keyword: 'phương trình nghiệm nguyên lớp 9', intent: 'huong-dan', page: 'chuyen-de-detail', behind: 'Kỹ thuật đưa về tích và xét ước.', fit: 5 },
  { keyword: 'nguyên lý dirichlet bài tập', intent: 'huong-dan', page: 'chuyen-de-detail', behind: 'Cách xây chuồng và đếm thỏ trong bài toán tồn tại.', fit: 5 },
  { keyword: 'chuyên đề toán ôn thi vào 10', intent: 'tai-lieu', page: 'chuyen-de', behind: 'Danh sách chuyên đề cần học và thứ tự học.', fit: 5 },

  /* --- Công thức --- */
  { keyword: 'công thức toán lớp 9 thi vào 10', intent: 'tai-lieu', page: 'cong-thuc', behind: 'Bảng công thức đủ và gọn để in ra học.', fit: 5 },
  { keyword: 'công thức hình trụ hình nón hình cầu', intent: 'tai-lieu', page: 'cong-thuc', behind: 'Sáu công thức và cách tránh nhầm đường kính với bán kính.', fit: 5 },
  { keyword: 'bảng công thức nguyên hàm tích phân', intent: 'tai-lieu', page: 'cong-thuc', behind: 'Bảng tra kèm điều kiện và lỗi dấu hay gặp.', fit: 5 },
  { keyword: 'công thức xác suất có điều kiện', intent: 'thong-tin', page: 'cong-thuc', behind: 'Phân biệt P(A|B) với P(B|A) và khi nào dùng cái nào.', fit: 5 },
  { keyword: 'hệ thức lượng trong tam giác vuông', intent: 'tai-lieu', page: 'cong-thuc', behind: 'Bốn hệ thức và cách nhận ra hình chiếu nào ứng với cạnh nào.', fit: 5 },

  /* --- Phương pháp học --- */
  { keyword: 'bí kíp học toán và thói quen luyện thi', intent: 'huong-dan', page: 'bi-kip', behind: 'Cách học chứ không phải kỹ thuật giải toán.', fit: 5 },
  { keyword: 'cách học toán không bị quên', intent: 'huong-dan', page: 'bi-kip', behind: 'Cơ chế ôn lại theo mốc thời gian.', fit: 5 },
  { keyword: 'lộ trình ôn thi toán vào 10 từ đầu năm', intent: 'huong-dan', page: 'lo-trinh', behind: 'Chia giai đoạn theo số ngày còn lại tới kỳ thi.', fit: 5 },
  { keyword: 'mỗi ngày nên học toán bao nhiêu tiếng', intent: 'thong-tin', page: 'lo-trinh', behind: 'Con số cụ thể và cách chia trong tuần.', fit: 4 },
  { keyword: 'cách phân bổ thời gian làm bài thi toán', intent: 'huong-dan', page: 'de-thi', behind: 'Mỗi bài bao nhiêu phút, khi nào thì bỏ qua.', fit: 5 },

  /* --- Giáo viên và phụ huynh --- */
  { keyword: 'giáo án dạy toán ôn thi vào 10', intent: 'tai-lieu', page: 'hoc-vien', behind: 'Khung buổi dạy chia theo thời gian, dùng được ngay.', fit: 5 },
  { keyword: 'cách nhận xét học sinh học toán', intent: 'huong-dan', page: 'hoc-vien', behind: 'Nói gì trong từng tình huống cụ thể.', fit: 4 },
  { keyword: 'nguồn tài liệu và phương pháp biên soạn', intent: 'thong-tin', page: 'nguon-phuong-phap', behind: 'Nội dung lấy từ đâu, ai chịu trách nhiệm, sai thì sửa ra sao.', fit: 5 },
  { keyword: 'phụ huynh đồng hành cùng con ôn thi', intent: 'huong-dan', page: 'nguon-phuong-phap', behind: 'Làm gì được mà không cần biết Toán.', fit: 4 },
  { keyword: 'kho tài liệu toán ôn thi theo tầng', intent: 'tai-lieu', page: 'kho-tai-lieu', behind: 'Lấy tài liệu nào ở giai đoạn nào.', fit: 4 },
  { keyword: 'mô thức huấn luyện gita', intent: 'thuong-hieu', page: 'mo-thuc-gita', behind: 'GITA là gì và vận hành thế nào.', fit: 5 },
  { keyword: 'bộ nhận diện gita365', intent: 'thuong-hieu', page: 'nhan-dien', behind: 'Logo, màu, quy chuẩn tài liệu chính thức.', fit: 5 },
  { keyword: 'phân quyền học viên và giáo viên', intent: 'thong-tin', page: 'phan-quyen', behind: 'Mỗi vai trò làm được gì trong hệ thống.', fit: 4 },

  /* --- Luồng vào lớp 6 trường chất lượng cao --- */
  { keyword: 'ôn thi vào lớp 6 môn toán', intent: 'huong-dan', page: 'lo-trinh', behind: 'Phụ huynh muốn biết lộ trình ôn từ đâu tới đâu.', fit: 5 },
  { keyword: 'đề thi vào lớp 6 trường chất lượng cao có đáp án', intent: 'tai-lieu', page: 'de-thi', behind: 'Cần đề đúng định dạng đánh giá năng lực, có lời giải.', fit: 5 },
  { keyword: 'cấu trúc bài đánh giá năng lực vào lớp 6', intent: 'thong-tin', page: 'cau-truc-de-thi', behind: 'Muốn biết đề gồm mấy phần, bao nhiêu phút, thang điểm nào.', fit: 4 },
  { keyword: 'các dạng toán thi vào lớp 6', intent: 'thong-tin', page: 'chuyen-de', behind: 'Muốn danh sách dạng bài để biết phải ôn những gì.', fit: 5 },
  { keyword: 'công thức toán tiểu học lớp 5', intent: 'tai-lieu', page: 'cong-thuc', behind: 'Cần bảng công thức gọn để tra khi làm bài.', fit: 5 },
  { keyword: 'toán chuyển động lớp 5', intent: 'huong-dan', page: 'bi-kip', behind: 'Muốn cách phân biệt gặp nhau, đuổi kịp và dòng nước.', fit: 5 },
  { keyword: 'toán suy luận logic lớp 5', intent: 'huong-dan', page: 'bi-kip', behind: 'Muốn phương pháp làm bài bảng đúng/sai.', fit: 4 },

  /* --- Thương hiệu --- */
  { keyword: 'math365', intent: 'thuong-hieu', page: 'home', behind: 'Tìm đúng nền tảng đã nghe tên.', fit: 5 },
  { keyword: 'gita365', intent: 'thuong-hieu', page: 'home', behind: 'Tìm tổ chức đứng sau sản phẩm.', fit: 5 },
  { keyword: 'math365 gita365 luyện thi toán', intent: 'thuong-hieu', page: 'home', behind: 'Xác nhận đây là nơi chính thức.', fit: 5 },
];

export const keywordsFor = (page: PageId) => KEYWORDS.filter((k) => k.page === page);

export const keywordStats = () => {
  const byIntent = new Map<Intent, number>();
  for (const k of KEYWORDS) byIntent.set(k.intent, (byIntent.get(k.intent) ?? 0) + 1);
  const pages = new Set(KEYWORDS.map((k) => k.page));
  /* Một từ khoá chỉ được gán cho đúng một trang — nếu trùng thì hai trang tự cạnh tranh nhau. */
  const dup = KEYWORDS.length - new Set(KEYWORDS.map((k) => k.keyword)).size;
  return {
    total: KEYWORDS.length,
    pages: pages.size,
    duplicates: dup,
    byIntent: [...byIntent.entries()].sort((a, b) => b[1] - a[1]),
    avgFit: Math.round((KEYWORDS.reduce((s, k) => s + k.fit, 0) / KEYWORDS.length) * 10) / 10,
  };
};
