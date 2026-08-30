import type { Grade, Term } from '@/types';

/* =====================================================================
   MATHGITA — LỘ TRÌNH HỌC TẬP CHUẨN GITA
   Ba giai đoạn: NỀN TẢNG → CHUYÊN ĐỀ NÂNG CAO → LUYỆN ĐỀ & TỔNG ÔN.
   Mục tiêu đầu ra: 9+ điểm bài kiểm tra định kỳ; khối 9 thêm mục tiêu
   trúng tuyển lớp 10 công lập / trường chuyên - CLC.
   ===================================================================== */

export type Phase = 'NEN_TANG' | 'NANG_CAO' | 'LUYEN_DE';

export const PHASE_LABEL: Record<Phase, string> = {
  NEN_TANG: 'Giai đoạn 1 · Nền tảng',
  NANG_CAO: 'Giai đoạn 2 · Chuyên đề nâng cao',
  LUYEN_DE: 'Giai đoạn 3 · Luyện đề & Tổng ôn',
};

export const PHASE_COLOR: Record<Phase, string> = {
  NEN_TANG: 'var(--gita-teal-600)',
  NANG_CAO: 'var(--gita-navy-800)',
  LUYEN_DE: 'var(--gita-gold-600)',
};

export interface Milestone {
  week: string;          // Ví dụ "Tuần 1–3"
  phase: Phase;
  title: string;
  topicIds: string[];
  goals: string[];
  output: string;        // Sản phẩm đầu ra kiểm chứng được
  minScore: number;      // Điểm sàn để được chuyển mốc
}

export interface GradeRoadmap {
  grade: Grade;
  headline: string;
  target: string;
  weeklyLoad: string;
  milestones: Milestone[];
}

const hk = (t: Term) => (t === 'HK1' ? 'Học kỳ I' : 'Học kỳ II');

export const ROADMAPS: GradeRoadmap[] = [
  {
    grade: 6,
    headline: 'Chuyển cấp vững vàng — xây lại nền số học và làm quen tư duy chứng minh.',
    target: 'Đạt 9+ bài kiểm tra định kỳ; tự trình bày trọn vẹn một bài toán có lời văn.',
    weeklyLoad: '4–5 buổi/tuần × 30 phút + 1 đề tổng hợp cuối tuần',
    milestones: [
      { week: 'Tuần 1–4', phase: 'NEN_TANG', title: `${hk('HK1')} · Tập hợp, số tự nhiên, lũy thừa`, topicIds: ['g6-t1'], goals: ['Thuộc quy tắc thứ tự thực hiện phép tính.', 'Tính nhanh bằng tính chất phân phối.', 'Thành thạo bài “Tìm x” hai lớp.'], output: '20 câu NB–TH đúng ≥ 18/20', minScore: 8 },
      { week: 'Tuần 5–8', phase: 'NEN_TANG', title: 'Tính chia hết, số nguyên tố, ƯCLN – BCNN', topicIds: ['g6-t2'], goals: ['Thuộc dấu hiệu chia hết cho 2, 3, 5, 9.', 'Phân tích ra thừa số nguyên tố trong 30 giây.', 'Phân biệt bài toán ƯCLN và BCNN qua từ khoá.'], output: 'Giải đúng 5 bài toán thực tế chia đều / gặp lại', minScore: 8 },
      { week: 'Tuần 9–12', phase: 'NANG_CAO', title: 'Số nguyên và hình học trực quan', topicIds: ['g6-t3', 'g6-t6'], goals: ['Không sai dấu trong mọi phép tính số nguyên.', 'Thuộc bảng công thức chu vi – diện tích.', 'Xử lý bẫy đổi đơn vị.'], output: 'Đề cương giữa kỳ I đạt ≥ 8,5', minScore: 8.5 },
      { week: 'Tuần 13–20', phase: 'NANG_CAO', title: `${hk('HK2')} · Phân số, số thập phân, tỉ số phần trăm`, topicIds: ['g6-t4', 'g6-t5'], goals: ['Nắm chắc hai bài toán cơ bản về phân số.', 'Không mắc bẫy “phần còn lại”.', 'Xử lý bài giảm giá liên tiếp.'], output: 'Bài kiểm tra chuyên đề phân số ≥ 9', minScore: 9 },
      { week: 'Tuần 21–26', phase: 'NANG_CAO', title: 'Hình học phẳng và Thống kê – Xác suất', topicIds: ['g6-t7', 'g6-t8'], goals: ['Trình bày đủ hai ý khi chứng minh trung điểm.', 'Đọc thành thạo mọi loại biểu đồ.'], output: 'Bài hình 3 ý đạt trọn điểm', minScore: 8.5 },
      { week: 'Tuần 27–32', phase: 'LUYEN_DE', title: 'Luyện đề & Tổng ôn cả năm', topicIds: [], goals: ['Làm 15 đề trong bộ 100 đề khối 6.', 'Rút ngắn thời gian phần NB xuống ≤ 1 phút/câu.', 'Hoàn thiện Sổ tay lỗi sai.'], output: '3 đề liên tiếp đạt ≥ 9', minScore: 9 },
    ],
  },
  {
    grade: 7,
    headline: 'Trưởng thành về tư duy đại số và bước vào chứng minh hình học có lập luận.',
    target: 'Đạt 9+ định kỳ; viết được bài chứng minh hình học đủ căn cứ.',
    weeklyLoad: '5 buổi/tuần × 35 phút + 1 đề tổng hợp cuối tuần',
    milestones: [
      { week: 'Tuần 1–5', phase: 'NEN_TANG', title: `${hk('HK1')} · Số hữu tỉ – Số thực`, topicIds: ['g7-t1'], goals: ['Tính hợp lí thành thạo với phân số.', 'Nắm quy tắc lũy thừa theo cả hai chiều.', 'Giải phương trình chứa dấu giá trị tuyệt đối.'], output: '20 câu NB–TH đúng ≥ 18/20', minScore: 8 },
      { week: 'Tuần 6–10', phase: 'NEN_TANG', title: 'Góc và đường thẳng song song', topicIds: ['g7-t4'], goals: ['Phân biệt dấu hiệu và tính chất.', 'Thành thạo kỹ thuật kẻ đường phụ song song.'], output: 'Bài hình 2 ý đạt trọn điểm', minScore: 8 },
      { week: 'Tuần 11–16', phase: 'NANG_CAO', title: `${hk('HK2')} · Tỉ lệ thức và đại lượng tỉ lệ`, topicIds: ['g7-t2'], goals: ['Dựng dãy tỉ số bằng nhau từ đề bài lời văn.', 'Phân biệt tỉ lệ thuận – nghịch.', 'Xử lý dạng có tích (đặt tham số $t$).'], output: 'Giải đúng 5 bài toán chia tỉ lệ thực tế', minScore: 8.5 },
      { week: 'Tuần 17–22', phase: 'NANG_CAO', title: 'Đa thức một biến và Tam giác', topicIds: ['g7-t3', 'g7-t5'], goals: ['Thành thạo cộng trừ đa thức theo cột.', 'Viết đủ 4 bước chứng minh hai tam giác bằng nhau.', 'Nắm các đường đồng quy.'], output: 'Đề cương cuối kỳ II đạt ≥ 8,5', minScore: 8.5 },
      { week: 'Tuần 23–28', phase: 'NANG_CAO', title: 'Hình khối và Thống kê – Xác suất', topicIds: ['g7-t6', 'g7-t7'], goals: ['Thuộc công thức lăng trụ.', 'Đọc và phân tích biểu đồ quạt tròn.'], output: 'Bài kiểm tra chuyên đề ≥ 9', minScore: 9 },
      { week: 'Tuần 29–34', phase: 'LUYEN_DE', title: 'Luyện đề & Tổng ôn cả năm', topicIds: [], goals: ['Làm 15 đề trong bộ 100 đề khối 7.', 'Luyện tốc độ và chiến thuật phân bổ thời gian.'], output: '3 đề liên tiếp đạt ≥ 9', minScore: 9 },
    ],
  },
  {
    grade: 8,
    headline: 'Năm bản lề: làm chủ hằng đẳng thức, phân thức và tam giác đồng dạng.',
    target: 'Đạt 9+ định kỳ; chuẩn bị nền cho chương trình ôn thi vào 10.',
    weeklyLoad: '5 buổi/tuần × 40 phút + 1 đề tổng hợp cuối tuần',
    milestones: [
      { week: 'Tuần 1–5', phase: 'NEN_TANG', title: `${hk('HK1')} · Hằng đẳng thức và phân tích nhân tử`, topicIds: ['g8-t1'], goals: ['Thuộc 7 hằng đẳng thức theo cả hai chiều.', 'Thành thạo quy trình 4 bước phân tích nhân tử.', 'Xử lý bài cực trị bằng hoàn thành bình phương.'], output: 'Phân tích đúng 20/20 đa thức trong 25 phút', minScore: 8.5 },
      { week: 'Tuần 6–10', phase: 'NEN_TANG', title: 'Phân thức đại số', topicIds: ['g8-t2'], goals: ['Luôn viết điều kiện xác định.', 'Rút gọn biểu thức 3 tầng phân thức.', 'Làm được câu hỏi phụ sau rút gọn.'], output: 'Bài rút gọn 4 ý đạt trọn điểm', minScore: 8.5 },
      { week: 'Tuần 11–15', phase: 'NANG_CAO', title: 'Tứ giác và Định lí Pythagore', topicIds: ['g8-t5', 'g8-t7'], goals: ['Thuộc sơ đồ quan hệ giữa các tứ giác.', 'Áp dụng chiến thuật “leo thang” khi chứng minh.'], output: 'Đề cương học kỳ I đạt ≥ 8,5', minScore: 8.5 },
      { week: 'Tuần 16–22', phase: 'NANG_CAO', title: `${hk('HK2')} · Phương trình và lập phương trình`, topicIds: ['g8-t3', 'g8-t4'], goals: ['Viết đủ 6 bước giải bài toán bằng cách lập phương trình.', 'Thành thạo ba mô hình: chuyển động, năng suất, phần trăm.'], output: 'Giải đúng 8/10 bài toán lời văn', minScore: 8.5 },
      { week: 'Tuần 23–28', phase: 'NANG_CAO', title: 'Thalès và Tam giác đồng dạng', topicIds: ['g8-t6'], goals: ['Kỹ năng truy ngược từ hệ thức cần chứng minh.', 'Thành thạo trường hợp g.g.', 'Nắm tỉ số diện tích $k^{2}$.'], output: 'Bài hình 3 ý đạt ≥ 90% số điểm', minScore: 9 },
      { week: 'Tuần 29–34', phase: 'LUYEN_DE', title: 'Luyện đề & Tổng ôn cả năm', topicIds: [], goals: ['Làm 20 đề trong bộ 100 đề khối 8.', 'Bắt đầu làm quen cấu trúc đề thi vào 10.'], output: '3 đề liên tiếp đạt ≥ 9', minScore: 9 },
    ],
  },
  {
    grade: 9,
    headline: 'Năm quyết định: hoàn thiện kiến thức và luyện chiến thuật thi tuyển sinh vào lớp 10.',
    target: 'Đạt 9+ định kỳ; đạt 8,5+ môn Toán kỳ thi tuyển sinh vào lớp 10 (mục tiêu chuyên/CLC: 9+).',
    weeklyLoad: '6 buổi/tuần × 45 phút + 2 đề tổng hợp cuối tuần',
    milestones: [
      { week: 'Tuần 1–5', phase: 'NEN_TANG', title: `${hk('HK1')} · Căn bậc hai và căn thức`, topicIds: ['g9-t2'], goals: ['Thành thạo quy trình 5 bước bài rút gọn.', 'Trục căn thức, dùng biểu thức liên hợp.', 'Làm được câu hỏi phụ (P nguyên, so sánh, cực trị).'], output: 'Bài rút gọn 3 ý đạt trọn điểm trong 15 phút', minScore: 8.5 },
      { week: 'Tuần 6–10', phase: 'NEN_TANG', title: 'Hệ phương trình và bất phương trình', topicIds: ['g9-t1', 'g9-t4'], goals: ['Chọn đúng phương pháp giải hệ.', 'Thành thạo đặt ẩn phụ.', 'Viết đủ 6 bước bài toán lập hệ.'], output: 'Giải đúng 8/10 bài toán lập hệ', minScore: 8.5 },
      { week: 'Tuần 11–16', phase: 'NANG_CAO', title: 'Hệ thức lượng và Đường tròn', topicIds: ['g9-t5', 'g9-t6'], goals: ['Thuộc 5 hệ thức lượng trong tam giác vuông.', 'Thành thạo chứng minh tứ giác nội tiếp.', 'Nắm hệ thức phương tích.'], output: 'Đề cương học kỳ I đạt ≥ 8,5', minScore: 8.5 },
      { week: 'Tuần 17–23', phase: 'NANG_CAO', title: `${hk('HK2')} · Hàm số $y=ax^{2}$, phương trình bậc hai, Viète`, topicIds: ['g9-t3'], goals: ['Thành thạo quy trình 3 bước bài toán tham số.', 'Thuộc bộ biểu thức đối xứng theo $S$, $P$.', 'Không quên bước đối chiếu điều kiện.'], output: 'Câu Viète trong đề thi thử đạt trọn điểm', minScore: 9 },
      { week: 'Tuần 24–28', phase: 'LUYEN_DE', title: 'Tổng ôn chuyên đề + Hình khối tròn xoay', topicIds: ['g9-t7', 'g9-t8'], goals: ['Hệ thống lại bằng sơ đồ tư duy toàn khối 9.', 'Bịt các lỗ hổng còn lại theo báo cáo của hệ thống.'], output: 'Toàn bộ chuyên đề đạt tỉ lệ đúng ≥ 85%', minScore: 8.5 },
      { week: 'Tuần 29–36', phase: 'LUYEN_DE', title: 'Luyện đề thi vào 10 — 30 đề bấm giờ', topicIds: [], goals: ['Làm 30 đề trong bộ 100 đề khối 9, bấm giờ nghiêm túc.', 'Chốt chiến thuật: thứ tự làm bài, thời gian cho từng câu.', 'Mỗi ngày 1 câu Vận dụng cao.'], output: '5 đề liên tiếp đạt ≥ 8,5 (mục tiêu chuyên: ≥ 9)', minScore: 8.5 },
    ],
  },
];

export const getRoadmap = (grade: Grade): GradeRoadmap =>
  ROADMAPS.find((r) => r.grade === grade) ?? ROADMAPS[0];
