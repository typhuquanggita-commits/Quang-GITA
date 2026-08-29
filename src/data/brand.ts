/** Bộ nhận diện thương hiệu GITA365 — nguồn chân lý duy nhất cho màu, chữ và giọng điệu. */

export const BRAND = {
  org: 'GITA365',
  product: 'MATH365',
  fullName: 'MATH365 · Hệ sinh thái luyện Toán GITA365',
  tagline: 'Học đúng lộ trình — Đo bằng KPI — Lên cấp bằng kết quả',
  promise:
    'Ba luồng, một hệ thống: Toán chuyên vào 10, Toán vào 10 mục tiêu 9–10, và Toán THPT 10–12 hướng tới 9+ thi đại học cùng Top 1 tổng kết.',
  domainHint: 'gita365.vn',
};

export const BRAND_COLORS = [
  { name: 'Indigo GITA', hex: '#4338CA', role: 'Màu chủ đạo — nút chính, tiêu đề, biểu đồ nền.' },
  { name: 'Indigo sáng', hex: '#6366F1', role: 'Trạng thái hover, nhấn phụ, đường biểu đồ.' },
  { name: 'Vàng 365', hex: '#F59E0B', role: 'Màu nhấn — thành tích, huy hiệu, mốc thăng cấp.' },
  { name: 'Xanh mục tiêu', hex: '#0F766E', role: 'Luồng Vào 10 và các trạng thái đạt KPI.' },
  { name: 'Lam học thuật', hex: '#1D4ED8', role: 'Luồng THPT 10–12 và kỳ thi tốt nghiệp.' },
  { name: 'Đỏ cảnh báo', hex: '#BE123C', role: 'Cảnh báo, lỗi sai lặp lại, nhiệm vụ quá hạn.' },
  { name: 'Mực', hex: '#0F172A', role: 'Chữ chính.' },
  { name: 'Nền', hex: '#F6F7FB', role: 'Nền trang.' },
];

export const BRAND_TYPO = [
  { role: 'Tiêu đề & giao diện', font: 'Be Vietnam Pro', note: 'Hỗ trợ dấu tiếng Việt tốt, chữ số rõ ràng, đủ 5 độ đậm.' },
  { role: 'Trích dẫn & đề bài', font: 'Lora', note: 'Chữ có chân, tạo cảm giác học thuật cho phần đề và lời giải.' },
  { role: 'Số liệu', font: 'Be Vietnam Pro — tabular numerals', note: 'Cột số thẳng hàng trong bảng KPI và bảng điểm.' },
];

export const BRAND_VOICE = {
  do: [
    'Nói thẳng vào việc: học sinh cần biết làm gì tiếp theo sau mỗi phiếu.',
    'Dùng số liệu cụ thể (KPI %, số câu đúng, số phút) thay vì lời khen chung chung.',
    'Chỉ rõ lỗi và cách sửa — nhận xét phải hành động được.',
    'Tôn trọng học sinh: không nói xuống, không đe doạ bằng điểm số.',
  ],
  dont: [
    'Hứa hẹn “đỗ chắc chắn”, “cam kết 10 điểm” — không ai cam kết được điều đó.',
    'Dùng từ mơ hồ: “khá tốt”, “cần cố gắng hơn” mà không kèm hành động cụ thể.',
    'So sánh học sinh này với học sinh khác trong nhận xét cá nhân.',
    'Nhồi thuật ngữ tiếng Anh khi đã có từ tiếng Việt tương đương.',
  ],
};

/** Ý nghĩa của logo, dùng cho trang nhận diện. */
export const BRAND_LOGO_NOTES = [
  'Dấu ∑ (tổng) tượng trưng cho việc tích luỹ: mỗi phiếu luyện là một số hạng, kết quả là tổng của cả quá trình.',
  'Ô vuông bo góc gợi hình quyển vở và ô ly — chất liệu gần gũi với học sinh Việt Nam.',
  'Số 365 nói về nhịp học đều mỗi ngày, không phải học dồn.',
  'Vùng an toàn quanh logo tối thiểu bằng một nửa chiều cao dấu ∑.',
];

export const BRAND_TRACK_STYLE: Record<string, { label: string; color: string; icon: string; goal: string }> = {
  chuyen: {
    label: 'Luồng 1 · Chuyên Toán',
    color: '#4338CA',
    icon: '◆',
    goal: 'Đỗ chuyên Toán KHTN · Ams · Chu Văn An · Nguyễn Tất Thành',
  },
  thpt: {
    label: 'Luồng 2 · Vào 10 · 9–10 điểm',
    color: '#0F766E',
    icon: '●',
    goal: 'Toán vào 10 Hà Nội đạt 9 đến 10 điểm',
  },
  'thpt-qg': {
    label: 'Luồng 3 · THPT 10–12',
    color: '#1D4ED8',
    icon: '▲',
    goal: 'Top 1 tổng kết lớp 10–11–12 và trên 9 điểm Toán thi đại học',
  },
};
