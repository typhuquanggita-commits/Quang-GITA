/**
 * Bộ nhận diện thương hiệu GITA365 · MATH365
 * — Nguồn chân lý duy nhất cho màu, chữ, giọng điệu và **quy chuẩn tài liệu**.
 * Toàn bộ hệ màu được rút trực tiếp từ logo GITA: vành ê-líp xanh – đỏ và chùm sao.
 */

export const BRAND = {
  org: 'GITA365',
  product: 'MATH365',
  fullName: 'MATH365 · Hệ sinh thái luyện Toán GITA365',
  tagline: 'Học đúng lộ trình — Đo bằng KPI — Lên cấp bằng kết quả',
  promise:
    'Ba luồng, một hệ thống: Toán chuyên vào 10, Toán vào 10 mục tiêu 9–10, và Toán THPT 10–12 hướng tới 9+ thi đại học cùng Top 1 tổng kết.',
  domainHint: 'gita365.vn',
  /** Câu định vị ngắn dùng ở chân mọi tài liệu in. */
  docSignature: 'GITA365 · MATH365 — Goal · Inspirits · Talent · Action',
};

/* ---------------- 1. Hệ màu lấy từ logo ---------------- */

export interface BrandColor {
  name: string;
  hex: string;
  role: string;
  /** Lấy từ chi tiết nào của logo. */
  from?: string;
  onDark?: boolean;
}

export const BRAND_COLORS: BrandColor[] = [
  { name: 'GITA Blue', hex: '#1B4F9C', from: 'Chữ GITA trong logo', role: 'Màu chủ đạo — chữ thương hiệu, tiêu đề phiếu, nút chính.', onDark: true },
  { name: 'Orbit Blue', hex: '#2E6FBF', from: 'Cung xanh của vành ê-líp', role: 'Nhấn phụ, đường biểu đồ, trạng thái hover, viền phiếu.' },
  { name: 'GITA Red', hex: '#E01B24', from: 'Cung đỏ của vành ê-líp', role: 'Màu khát vọng — mốc thăng cấp, cảnh báo lỗi lặp, dấu “đề thi”.', onDark: true },
  { name: 'Star Navy', hex: '#0E2C58', from: 'Sao xanh đậm', role: 'Chữ chính trên tài liệu in, tiêu đề mục lớn.', onDark: true },
  { name: 'Star Gold', hex: '#F0A21B', role: 'Huy hiệu thành tích, dấu 20/80, mốc KPI 90%.' },
  { name: 'Goal Teal', hex: '#0F766E', role: 'Luồng Vào 10 và trạng thái đã đạt chuẩn.', onDark: true },
  { name: 'Paper', hex: '#F6F7FB', role: 'Nền màn hình.' },
  { name: 'Ink', hex: '#0F172A', role: 'Chữ nội dung.', onDark: true },
];

/** Thang màu chủ đạo dùng trong CSS (--color-brand-*). */
export const BRAND_SCALE = [
  { step: 50, hex: '#EFF6FF' },
  { step: 100, hex: '#DBEAFE' },
  { step: 200, hex: '#BCD7F7' },
  { step: 300, hex: '#8FBCEE' },
  { step: 400, hex: '#5B98DE' },
  { step: 500, hex: '#2E6FBF' },
  { step: 600, hex: '#1F5FAE' },
  { step: 700, hex: '#1B4F9C' },
  { step: 800, hex: '#143C78' },
  { step: 900, hex: '#0E2C58' },
];

/* ---------------- 2. Chữ ---------------- */

export const BRAND_TYPO = [
  { role: 'Thương hiệu & tiêu đề', font: 'Be Vietnam Pro 800', note: 'Chữ GITA và tên phiếu; giãn chữ +1,5 để khớp logo.' },
  { role: 'Giao diện & nhãn', font: 'Be Vietnam Pro 400–700', note: 'Dấu tiếng Việt gọn, chữ số rõ, đủ 5 độ đậm.' },
  { role: 'Đề bài & lời giải', font: 'Lora', note: 'Chữ có chân, dòng 1,85 — đọc đề dài không mỏi mắt.' },
  { role: 'Số liệu & barem', font: 'Be Vietnam Pro — tabular numerals', note: 'Cột điểm và cột KPI luôn thẳng hàng.' },
];

/** Thang cỡ chữ chuẩn cho phiếu in A4. */
export const DOC_TYPE_SCALE = [
  { level: 'Tên phiếu', size: '20pt / 800', note: 'GITA Blue, một dòng, không xuống dòng giữa tên chuyên đề.' },
  { level: 'Mã phiếu', size: '10pt / 700, giãn 0,16em', note: 'Chữ hoa, màu Orbit Blue, đặt trên tên phiếu.' },
  { level: 'Tên phần', size: '13pt / 700', note: 'Có gạch dọc 3px màu của loại phiếu ở lề trái.' },
  { level: 'Đề bài', size: '11,5pt Lora / 1,7', note: 'Ink; công thức in nghiêng theo chuẩn toán học.' },
  { level: 'Lời giải từng bước', size: '11pt / 1,75', note: 'Đánh số bước, mỗi bước một hành động.' },
  { level: 'Barem', size: '10,5pt tabular', note: 'Bảng hai cột: nội dung chấm | điểm.' },
  { level: 'Chân trang', size: '8,5pt / 600', note: 'Mã phiếu · tên chuyên đề · số trang · gita365.vn.' },
];

/* ---------------- 3. Logo ---------------- */

export const BRAND_LOGO_NOTES = [
  'Vành ê-líp nghiêng gồm hai cung — xanh và đỏ — là quỹ đạo của người học: cung xanh là quá trình tích luỹ, cung đỏ là cú bứt phá. Hai cung khép kín thành vòng lặp luyện tập không đứt đoạn.',
  'Chữ GITA nằm gọn trong lòng quỹ đạo: mô thức huấn luyện là tâm, mọi hoạt động xoay quanh nó.',
  'Chùm sao ở góc trên phải là đích đến — sao lớn nhất là mục tiêu chính (Goal), các sao nhỏ là những mốc phải chạm trước đó.',
  'Hai màu xanh – đỏ giữ nguyên tinh thần chuẩn quốc tế; không thay bằng cặp màu khác, không tô gradient.',
  'Vùng an toàn quanh logo tối thiểu bằng chiều cao chữ G. Kích thước tối thiểu: 24px chiều cao trên màn hình, 10mm khi in.',
  'Bản “mark” (ê-líp + sao + chữ G) dùng cho favicon, con dấu góc phiếu và watermark; bản “full” dùng ở đầu trang và bìa.',
  'Được phép: đảo sang bản một màu trắng khi đặt trên nền GITA Blue. Không được: xoay, kéo méo, đổi thứ tự màu hai cung, đặt logo lên ảnh nhiều chi tiết.',
];

/* ---------------- 4. Nhận diện theo luồng ---------------- */

export const BRAND_TRACK_STYLE: Record<string, { label: string; color: string; icon: string; goal: string; docPrefix: string }> = {
  chuyen: {
    label: 'Luồng 1 · Chuyên Toán',
    color: '#1B4F9C',
    icon: '◆',
    goal: 'Đỗ chuyên Toán KHTN · Ams · Chu Văn An · Nguyễn Tất Thành',
    docPrefix: 'CT',
  },
  thpt: {
    label: 'Luồng 2 · Vào 10 · 9–10 điểm',
    color: '#0F766E',
    icon: '●',
    goal: 'Toán vào 10 Hà Nội đạt 9 đến 10 điểm',
    docPrefix: 'V10',
  },
  'thpt-qg': {
    label: 'Luồng 3 · THPT 10–12',
    color: '#E01B24',
    icon: '▲',
    goal: 'Top 1 tổng kết lớp 10–11–12 và trên 9 điểm Toán thi đại học',
    docPrefix: 'QG',
  },
};

/* ---------------- 5. Bộ nhận diện TÀI LIỆU MATH365 ---------------- */

/** Quy ước mã tài liệu — đọc mã là biết ngay tài liệu thuộc đâu. */
export const DOC_CODE_RULE = {
  pattern: 'M365-<LUỒNG>-<GIAI ĐOẠN>-<CHUYÊN ĐỀ>-<LOẠI><ĐỢT>',
  example: 'M365-V10-T2-CANTHUC-KN03',
  parts: [
    { token: 'M365', mean: 'Sản phẩm MATH365 thuộc hệ sinh thái GITA365.' },
    { token: 'LUỒNG', mean: 'CT · V10 · QG — ba luồng luyện thi.' },
    { token: 'GIAI ĐOẠN', mean: 'T1–T5 / C1–C5 / Q1–Q5 — giai đoạn trong lộ trình.' },
    { token: 'CHUYÊN ĐỀ', mean: 'Mã rút gọn của chuyên đề.' },
    { token: 'LOẠI', mean: 'LT · DB · KN · NC · OT · TH — sáu loại phiếu; LG lời giải; HD hướng dẫn ôn chắc; DM đề mẫu.' },
    { token: 'ĐỢT', mean: 'Số thứ tự đợt phiếu trong cùng chuyên đề.' },
  ],
  rules: [
    'Mã in ở góc trên trái mọi trang, cùng cỡ chữ, không bao giờ bị cắt khi photocopy.',
    'Phiếu lời giải giữ nguyên mã phiếu gốc và nối thêm hậu tố “-LG”; phiếu hướng dẫn ôn chắc dùng hậu tố “-HD”.',
    'Học sinh ghi mã phiếu vào sổ lỗi — mã là chìa khoá tra lại đề, lời giải và bảng phân tích.',
  ],
};

/** Màu và ký hiệu riêng của từng loại phiếu — nhìn gáy phiếu là biết đang ở bước nào. */
export const DOC_SHEET_IDENTITY = [
  { code: 'LT', name: 'Lý thuyết nền', color: '#2E6FBF', glyph: '▤', band: 'Vạch xanh nhạt', pillar: 'Goal' },
  { code: 'DB', name: 'Dạng bài & Đọc vị', color: '#1B4F9C', glyph: '◈', band: 'Vạch xanh đậm', pillar: 'Talent' },
  { code: 'KN', name: 'Kỹ năng & Phương pháp', color: '#0F766E', glyph: '⟐', band: 'Vạch xanh ngọc', pillar: 'Action' },
  { code: 'NC', name: 'Luyện nâng cao', color: '#F0A21B', glyph: '▲', band: 'Vạch vàng', pillar: 'Inspirits' },
  { code: 'OT', name: 'Ôn thi tổng hợp', color: '#7C3AED', glyph: '◍', band: 'Vạch tím', pillar: 'Action' },
  { code: 'TH', name: 'Phiếu thi', color: '#E01B24', glyph: '★', band: 'Vạch đỏ', pillar: 'Goal' },
  { code: 'LG', name: 'Lời giải & phân tích', color: '#0E2C58', glyph: '✎', band: 'Vạch navy', pillar: 'Talent' },
  { code: 'HD', name: 'Hướng dẫn ôn chắc', color: '#475569', glyph: '❖', band: 'Vạch xám', pillar: 'Action' },
  { code: 'DM', name: 'Đề mẫu chuẩn cấu trúc', color: '#E01B24', glyph: '⬢', band: 'Vạch đỏ kép', pillar: 'Goal' },
];

/** Bố cục chuẩn một trang phiếu — thứ tự cố định, không đảo. */
export const DOC_LAYOUT = [
  { zone: 'Dải đầu trang', height: '18mm', content: 'Dấu hiệu GITA bên trái · tên phiếu ở giữa · mã phiếu + KPI mục tiêu bên phải. Nền trắng, gạch chân bằng màu loại phiếu dày 2pt.' },
  { zone: 'Khối định vị', height: '14mm', content: 'Chuyên đề · mức độ (1–5) · thời gian · số câu · giai đoạn. Bốn ô ngang, viền mảnh, chữ 9pt.' },
  { zone: 'Ô GITA', height: '10mm', content: 'Một dòng duy nhất: mục tiêu của phiếu này viết theo thì hiện tại, bắt đầu bằng động từ ("Đọc được dấu hiệu…"). Đây là chữ G của phiếu.' },
  { zone: 'Thân phiếu', height: 'linh hoạt', content: 'Các phần đánh số La Mã; mỗi phần có gạch dọc màu loại phiếu ở lề trái và nhãn kỹ năng.' },
  { zone: 'Ô ghi chú lỗi', height: '22mm', content: 'Bảng ba cột trống: câu sai | nguyên nhân | việc sửa. Bắt buộc có ở mọi phiếu luyện.' },
  { zone: 'Chân trang', height: '10mm', content: 'Mã phiếu · chuyên đề · trang x/y · gita365.vn. Không quảng cáo, không khẩu hiệu.' },
];

/** Bìa bộ tài liệu và trang đầu tập phiếu. */
export const DOC_COVER = [
  'Nền trắng, logo GITA bản full đặt ở 1/3 trên, canh trái theo lề 20mm.',
  'Tên sản phẩm MATH365 cỡ 34pt màu GITA Blue; ngay dưới là tên luồng bằng màu của luồng.',
  'Một đường quỹ đạo ê-líp mảnh (0,8pt) chạy vòng phía sau khối chữ — trích từ logo, độ mờ 12%.',
  'Khối "Đích đến" ở nửa dưới: mục tiêu điểm số, thời lượng, số phiếu, mốc KPI 90%.',
  'Chân bìa: dòng ký GITA365 · MATH365 — Goal · Inspirits · Talent · Action.',
  'Không đặt ảnh học sinh, không đặt điểm thi của học sinh cụ thể lên bìa.',
];

/** Quy tắc in ấn và watermark. */
export const DOC_PRINT_RULES = [
  'Khổ A4, lề 18mm trái/phải, 15mm trên/dưới; phiếu thi in một mặt để học sinh nháp ở mặt sau.',
  'Watermark là dấu hiệu GITA bản mark, độ mờ 6%, đặt giữa trang, không xoay.',
  'Bản đen trắng: mọi màu loại phiếu quy về sắc độ xám khác nhau; giữ nguyên ký hiệu ▤ ◈ ⟐ ▲ ◍ ★ để vẫn phân biệt được.',
  'Phiếu lời giải in nền trắng tuyệt đối để photocopy không lem; barem đóng khung nét 0,5pt.',
  'Mọi trang đều tự đủ nghĩa: mã phiếu và tên chuyên đề lặp lại ở đầu và chân trang.',
];

/** Bộ mẫu nội dung nói/viết dùng lại được (template) cho mọi tài liệu. */
export const DOC_TEMPLATES = [
  { name: 'Câu mục tiêu phiếu (chữ G)', pattern: '“Sau phiếu này, em <động từ năng lực> <đối tượng cụ thể> trong <điều kiện đo được>.”', sample: 'Sau phiếu này, em đọc được dấu hiệu của 6 dạng bài rút gọn biểu thức trong vòng 30 giây mỗi đề.' },
  { name: 'Nhận xét kết quả', pattern: '<KPI> → <điều đã vững> → <điểm hỏng và nguyên nhân> → <một việc làm ngay>.', sample: 'KPI 76%. Phần rút gọn đã vững. Hỏng ở bước đối chiếu điều kiện — mất 3 câu vì quên ĐKXĐ. Việc ngay: làm lại 5 câu nhóm A, viết ĐKXĐ trước khi biến đổi.' },
  { name: 'Ghi lỗi trong sổ', pattern: '<mã phiếu> · <câu> · <dạng bài> · <nguyên nhân> · <câu chốt tự nhắc>.', sample: 'M365-V10-T2-CANTHUC-KN03 · C7 · Rút gọn có mẫu √x−a · Quên loại x=a² · “Mẫu chứa √x−a thì x≠a².”' },
  { name: 'Lời dẫn phiếu lời giải', pattern: 'Đề → Đáp án → Lời giải từng bước → Vì sao chọn hướng đó → Bẫy → Dấu hiệu đã thành thạo.', sample: 'Giữ đúng sáu khối này ở mọi phiếu -LG, không rút gọn khối “Vì sao chọn hướng đó”.' },
  { name: 'Barem chấm', pattern: 'Mỗi 0,25đ gắn với một hành động quan sát được trên bài làm.', sample: '0,25 — viết đúng ĐKXĐ; 0,50 — quy đồng và rút gọn đúng; 0,25 — kết luận và đối chiếu điều kiện.' },
];

/** Mỗi trụ cột GITA có một tín hiệu nhận diện riêng, xuất hiện xuyên suốt tài liệu. */
export const DOC_PILLAR_SIGNALS = [
  { key: 'G', name: 'Goal', color: '#1B4F9C', glyph: '◎', where: 'Ô mục tiêu đầu phiếu, mốc KPI, bảng đích đến trên bìa.' },
  { key: 'I', name: 'Inspirits', color: '#E01B24', glyph: '✦', where: 'Khối “vì sao đáng làm”, mốc thăng cấp, huy hiệu chuỗi ngày học.' },
  { key: 'T', name: 'Talent', color: '#F0A21B', glyph: '◆', where: 'Bảng đọc vị dạng bài, biểu đồ mạnh – yếu, phần phân tích chuyên sâu.' },
  { key: 'A', name: 'Action / Academy', color: '#0F766E', glyph: '➜', where: 'Danh sách việc làm ngay, lịch ôn 1–3–7–21, ô ghi chú lỗi.' },
];

/* ---------------- 6. Giọng điệu ---------------- */

export const BRAND_VOICE = {
  do: [
    'Nói thẳng vào việc: học sinh cần biết làm gì tiếp theo sau mỗi phiếu.',
    'Dùng số liệu cụ thể (KPI %, số câu đúng, số phút) thay vì lời khen chung chung.',
    'Chỉ rõ lỗi và cách sửa — nhận xét phải hành động được.',
    'Tôn trọng học sinh: không nói xuống, không đe doạ bằng điểm số.',
    'Mỗi tài liệu mở đầu bằng một câu mục tiêu đo được — đó là chữ G của GITA.',
  ],
  dont: [
    'Hứa hẹn “đỗ chắc chắn”, “cam kết 10 điểm” — không ai cam kết được điều đó.',
    'Dùng từ mơ hồ: “khá tốt”, “cần cố gắng hơn” mà không kèm hành động cụ thể.',
    'So sánh học sinh này với học sinh khác trong nhận xét cá nhân.',
    'Nhồi thuật ngữ tiếng Anh khi đã có từ tiếng Việt tương đương.',
    'Đăng điểm số hay bài làm của một học sinh cụ thể lên tài liệu phát hành.',
  ],
};
