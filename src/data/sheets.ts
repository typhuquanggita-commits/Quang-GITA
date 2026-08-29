/**
 * BỘ PHIẾU THEO CHUYÊN ĐỀ.
 *
 * Mỗi chuyên đề có một "bộ phiếu" gồm 6 phiếu luyện đi theo đúng thứ tự sư phạm,
 * cộng thêm hai phiếu đi kèm không tính vào số phiếu luyện:
 *   • Phiếu lời giải & phân tích chuyên sâu — đi kèm TỪNG phiếu (mã …-LG)
 *   • Phiếu hướng dẫn ôn chắc chuyên đề — một phiếu cho cả chuyên đề (mã …-HD)
 */

export type SheetType = 'ly-thuyet' | 'dang-bai' | 'ky-nang' | 'nang-cao' | 'on-thi' | 'thi';

export interface SheetSpec {
  id: SheetType;
  order: number;
  name: string;
  short: string;
  code: string;
  purpose: string;
  /** Việc học viên phải làm được sau khi hoàn thành phiếu này. */
  outcome: string;
  items: number;
  /** Chênh lệch mức độ so với mức của chuyên đề. */
  levelDelta: number;
  minutes: number;
  kpiTarget: number;
  color: string;
  /** Có mở rộng ra các dạng khác cùng mạch hay chỉ bám một chuyên đề. */
  mixed: boolean;
  hint: string;
}

export const SHEET_TYPES: SheetSpec[] = [
  {
    id: 'ly-thuyet',
    order: 1,
    name: 'Phiếu 1 · Lý thuyết nền',
    short: 'Lý thuyết',
    code: 'LT',
    purpose:
      'Chốt lại định nghĩa, công thức và điều kiện áp dụng trước khi đụng tới bài tập. Phiếu có phần đọc tóm tắt rồi mới tới câu hỏi.',
    outcome: 'Viết lại được toàn bộ công thức cốt lõi của chuyên đề mà không nhìn tài liệu.',
    items: 6,
    levelDelta: -1,
    minutes: 15,
    kpiTarget: 90,
    color: '#0891B2',
    mixed: false,
    hint: 'Đọc kỹ phần tóm tắt trước. Sai ở phiếu này nghĩa là chưa thuộc, không phải chưa hiểu.',
  },
  {
    id: 'dang-bai',
    order: 2,
    name: 'Phiếu 2 · Dạng bài & Đọc vị đề',
    short: 'Đọc vị',
    code: 'DB',
    purpose:
      'Rèn kỹ năng nhìn đề là biết ngay thuộc dạng nào và phải đi hướng nào. Đây là kỹ năng quyết định tốc độ trong phòng thi.',
    outcome: 'Nhận dạng đúng dạng bài và chọn đúng hướng giải trong dưới 20 giây.',
    items: 8,
    levelDelta: 0,
    minutes: 20,
    kpiTarget: 90,
    color: '#4338CA',
    mixed: false,
    hint: 'Phiếu này hỏi "nhận ra gì" và "đi hướng nào", không bắt bạn tính tới đáp số.',
  },
  {
    id: 'ky-nang',
    order: 3,
    name: 'Phiếu 3 · Kỹ năng & Phương pháp',
    short: 'Kỹ năng',
    code: 'KN',
    purpose:
      'Đi từng bước của quy trình giải chuẩn: bước nào trước, bước nào sau, bước nào bắt buộc không được bỏ.',
    outcome: 'Thực hiện đúng và đủ quy trình giải chuẩn, không nhảy bước.',
    items: 8,
    levelDelta: 0,
    minutes: 22,
    kpiTarget: 90,
    color: '#B45309',
    mixed: false,
    hint: 'Chú ý các câu hỏi về thứ tự bước — đó chính là chỗ mất điểm trình bày trong bài thi thật.',
  },
  {
    id: 'nang-cao',
    order: 4,
    name: 'Phiếu 4 · Luyện nâng cao',
    short: 'Nâng cao',
    code: 'NC',
    purpose:
      'Đẩy mức độ lên một bậc và thêm biến thể lạ, để kiểm tra bạn hiểu bản chất hay chỉ nhớ khuôn.',
    outcome: 'Xử lý được biến thể chưa từng gặp của cùng một chuyên đề.',
    items: 8,
    levelDelta: 1,
    minutes: 28,
    kpiTarget: 80,
    color: '#BE123C',
    mixed: false,
    hint: 'Sai ở đây là bình thường. Điều quan trọng là đọc kỹ phân tích sau khi nộp.',
  },
  {
    id: 'on-thi',
    order: 5,
    name: 'Phiếu 5 · Ôn thi tổng hợp',
    short: 'Ôn thi',
    code: 'OT',
    purpose:
      'Trộn chuyên đề này với các chuyên đề cùng mạch, mô phỏng việc đề thi không báo trước dạng bài.',
    outcome: 'Giữ được độ chính xác khi các dạng bài xuất hiện xen kẽ, không theo thứ tự.',
    items: 10,
    levelDelta: 0,
    minutes: 30,
    kpiTarget: 90,
    color: '#047857',
    mixed: true,
    hint: 'Làm liền mạch, không dừng tra cứu. Đây là bước tập dượt trước phiếu thi.',
  },
  {
    id: 'thi',
    order: 6,
    name: 'Phiếu 6 · Phiếu thi',
    short: 'Phiếu thi',
    code: 'TH',
    purpose:
      'Mô phỏng điều kiện phòng thi: tính giờ, độ khó cao nhất của bộ phiếu, không gợi ý giữa chừng.',
    outcome: 'Đạt chuẩn KPI trong đúng thời gian quy định — dấu hiệu đã làm chủ chuyên đề.',
    items: 10,
    levelDelta: 1,
    minutes: 35,
    kpiTarget: 90,
    color: '#0F172A',
    mixed: true,
    hint: 'Chỉ nên làm sau khi đã đạt chuẩn ở năm phiếu trước. Kết quả phiếu này quyết định việc lên mức.',
  },
];

export const sheetSpec = (id: SheetType) => SHEET_TYPES.find((s) => s.id === id)!;

/** Hai phiếu đi kèm, không tính vào số phiếu luyện. */
export const COMPANION_SHEETS = [
  {
    code: 'LG',
    name: 'Phiếu lời giải & phân tích chuyên sâu',
    scope: 'Đi kèm từng phiếu luyện',
    contains: [
      'Toàn văn đề của đúng bản đề đã làm',
      'Đáp án và lời giải từng bước cho mọi câu',
      'Bảng ma trận phiếu: câu nào thuộc dạng nào, mạch nào, rèn kỹ năng gì',
      'Phân tích chuyên sâu từng dạng: dấu hiệu nhận dạng, quy trình chuẩn, bẫy hay mắc',
      'Liên hệ với đề thi thật và dấu hiệu đã thành thạo',
    ],
  },
  {
    code: 'HD',
    name: 'Phiếu hướng dẫn ôn chắc chuyên đề',
    scope: 'Một phiếu cho cả chuyên đề',
    contains: [
      'Thứ tự học sáu phiếu và tiêu chí đạt của từng phiếu',
      'Lộ trình năm tầng hấp thu cho riêng chuyên đề',
      'Checklist "ôn chắc" trước khi coi như đã xong chuyên đề',
      'Danh mục công thức, kỹ thuật cốt lõi và lỗi thường gặp',
      'Kế hoạch ôn lại theo nhịp 1 – 3 – 7 – 21 ngày',
    ],
  },
];
