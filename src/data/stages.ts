import type { TrackId } from '@/types';

/**
 * Danh sách giai đoạn của năm luồng.
 *
 * Tách khỏi kho phiếu vì trang chủ cần dữ liệu này ngay ở lần tải đầu, trong
 * khi kho phiếu kéo theo toàn bộ bộ sinh đề. Kho phiếu nhập lại từ đây, nên chỉ
 * có một nguồn duy nhất.
 */
export interface Stage {
  id: string;
  track: TrackId;
  order: number;
  name: string;
  goal: string;
  levels: (1 | 2 | 3 | 4 | 5)[];
  kpi: number; // % KPI cần đạt để được xét lên giai đoạn sau
  duration: string;
  description: string;
}

export const STAGES: Stage[] = [
  {
    id: 'T1',
    track: 'thpt',
    order: 1,
    name: 'GĐ 1 · Xây nền',
    goal: 'Không còn mất điểm ở Bài I – II – III vì lỗi nền tảng.',
    levels: [1, 1, 2],
    kpi: 90,
    duration: '4 – 6 tuần',
    description:
      'Căn thức, phương trình – hệ phương trình, công thức hình không gian, xác suất – thống kê cơ bản. Mục tiêu là độ chính xác, chưa cần tốc độ.',
  },
  {
    id: 'T2',
    track: 'thpt',
    order: 2,
    name: 'GĐ 2 · Thành thạo dạng chuẩn',
    goal: 'Làm trọn 6,0 điểm đầu tiên của đề trong 45 phút.',
    levels: [2, 2, 3],
    kpi: 90,
    duration: '5 – 7 tuần',
    description:
      'Viète, tương giao parabol, bài toán lập phương trình, hệ thức lượng và góc với đường tròn. Bắt đầu tính giờ.',
  },
  {
    id: 'T3',
    track: 'thpt',
    order: 3,
    name: 'GĐ 3 · Phân hoá 8 → 9',
    goal: 'Trọn vẹn Bài IV ý 1–2 và xử lý được ý 3 quen thuộc.',
    levels: [3, 3, 4],
    kpi: 90,
    duration: '5 – 7 tuần',
    description:
      'Hình học đường tròn nâng cao, phương trình vô tỉ, bài toán tham số, bất đẳng thức cơ bản.',
  },
  {
    id: 'T4',
    track: 'thpt',
    order: 4,
    name: 'GĐ 4 · Chinh phục 9 → 10',
    goal: 'Ăn trọn Bài V và ý cuối Bài IV; sai số tối đa 1 ý nhỏ mỗi đề.',
    levels: [4, 4, 5],
    kpi: 90,
    duration: '4 – 6 tuần',
    description:
      'Cực trị, điểm cố định, bất đẳng thức có điều kiện, kỹ thuật chọn điểm rơi. Đây là vùng quyết định điểm 10.',
  },
  {
    id: 'T5',
    track: 'thpt',
    order: 5,
    name: 'GĐ 5 · Tổng duyệt phòng thi',
    goal: 'Ổn định 9,0+ ở mọi đề, đúng nhịp 90 phút.',
    levels: [3, 4, 5],
    kpi: 90,
    duration: '4 tuần cuối',
    description:
      'Phiếu tổng hợp trộn đủ 5 bài của đề Hà Nội, luyện tốc độ, quy trình soát bài và tâm lý phòng thi.',
  },
  {
    id: 'C1',
    track: 'chuyen',
    order: 1,
    name: 'GĐ 1 · Nhập môn chuyên',
    goal: 'Chuyển từ tư duy “làm bài” sang tư duy “chứng minh”.',
    levels: [2, 2, 3],
    kpi: 90,
    duration: '5 – 6 tuần',
    description:
      'Chia hết, ƯCLN – BCNN, chữ số tận cùng, phương trình vô tỉ, hệ nâng cao. Song song giữ nhịp đề chung.',
  },
  {
    id: 'C2',
    track: 'chuyen',
    order: 2,
    name: 'GĐ 2 · Số học & Tổ hợp nền',
    goal: 'Ăn trọn bài Số học 2,0 điểm của đề chuyên.',
    levels: [3, 3, 4],
    kpi: 90,
    duration: '6 – 8 tuần',
    description:
      'Đồng dư, số chính phương, phương trình nghiệm nguyên, Dirichlet, đếm. Đây là mạch “đinh” của đề KHTN.',
  },
  {
    id: 'C3',
    track: 'chuyen',
    order: 3,
    name: 'GĐ 3 · Hình học chuyên',
    goal: 'Làm trọn 2 ý đầu bài hình 3,0 điểm.',
    levels: [3, 4, 4],
    kpi: 90,
    duration: '6 – 8 tuần',
    description:
      'Phương tích, trục đẳng phương, mô hình chuẩn, tỉ số – thẳng hàng – đồng quy.',
  },
  {
    id: 'C4',
    track: 'chuyen',
    order: 4,
    name: 'GĐ 4 · Bài chốt & BĐT nâng cao',
    goal: 'Có điểm ở bài tổ hợp / bất đẳng thức cuối đề.',
    levels: [4, 4, 5],
    kpi: 90,
    duration: '5 – 6 tuần',
    description:
      'Bất biến, cực hạn, SOS, dồn biến, chọn điểm rơi. Mục tiêu: không bỏ trắng bài chốt.',
  },
  {
    id: 'C5',
    track: 'chuyen',
    order: 5,
    name: 'GĐ 5 · Tổng duyệt đề chuyên',
    goal: 'Ổn định 7,0+ đề chuyên trong 150 phút.',
    levels: [3, 4, 5],
    kpi: 90,
    duration: '4 tuần cuối',
    description:
      'Phiếu tổng hợp mô phỏng đề KHTN / Ams, luyện trình bày chặt và phân bổ thời gian.',
  },
  {
    id: 'Q1',
    track: 'thpt-qg',
    order: 1,
    name: 'GĐ 1 · Lớp 10 – Nền tảng',
    goal: 'Không nợ kiến thức lớp 10; điểm tổng kết lớp 10 từ 9,0 trở lên.',
    levels: [1, 2, 2],
    kpi: 90,
    duration: 'Suốt năm lớp 10',
    description:
      'Mệnh đề – tập hợp, bất phương trình và dấu tam thức, hàm số bậc hai, hệ thức lượng, vectơ, toạ độ phẳng, tổ hợp. Đây là móng nhà của cả ba năm.',
  },
  {
    id: 'Q2',
    track: 'thpt-qg',
    order: 2,
    name: 'GĐ 2 · Lớp 11 – Cốt lõi',
    goal: 'Làm chủ đạo hàm và mũ – logarit; tổng kết lớp 11 từ 9,0 trở lên.',
    levels: [2, 3, 3],
    kpi: 90,
    duration: 'Suốt năm lớp 11',
    description:
      'Lượng giác, dãy số – cấp số, giới hạn, mũ – logarit, đạo hàm, hình không gian, xác suất. Học tốt lớp 11 thì lớp 12 nhẹ đi một nửa.',
  },
  {
    id: 'Q3',
    track: 'thpt-qg',
    order: 3,
    name: 'GĐ 3 · Lớp 12 – Trọng tâm',
    goal: 'Phủ kín chương trình lớp 12 và đạt 8,0+ ở các đề thi thử đầu tiên.',
    levels: [3, 3, 4],
    kpi: 90,
    duration: 'Học kỳ I lớp 12',
    description:
      'Ứng dụng đạo hàm, nguyên hàm – tích phân, toạ độ Oxyz, thống kê và xác suất có điều kiện — bốn mạch chiếm phần lớn số câu của đề thi tốt nghiệp.',
  },
  {
    id: 'Q4',
    track: 'thpt-qg',
    order: 4,
    name: 'GĐ 4 · Luyện dạng phân hoá 9+',
    goal: 'Xử lý gọn nhóm câu vận dụng cao — vùng quyết định điểm 9 và 10.',
    levels: [4, 4, 5],
    kpi: 90,
    duration: 'Học kỳ II lớp 12',
    description:
      'Bài toán tham số, cực trị hàm hợp, tích phân nâng cao, cực trị trong Oxyz, xác suất có điều kiện phức hợp, bài toán thực tế mô hình hoá.',
  },
  {
    id: 'Q5',
    track: 'thpt-qg',
    order: 5,
    name: 'GĐ 5 · Tổng duyệt & thi thử',
    goal: 'Ổn định 9,0+ theo đúng định dạng đề 3 phần trong 90 phút.',
    levels: [3, 4, 5],
    kpi: 90,
    duration: '8 tuần cuối',
    description:
      'Đề tổng hợp mô phỏng định dạng thi tốt nghiệp, luyện chiến thuật Phần II (đúng/sai) và Phần III (trả lời ngắn), kiểm soát rủi ro tính toán.',
  },
  {
    id: 'L1',
    track: 'lop6',
    order: 1,
    name: 'GĐ 1 · Chắc bốn phép tính',
    goal: 'Không còn sai phép tính với phân số, số thập phân và tỉ số phần trăm.',
    levels: [1, 1, 2],
    kpi: 90,
    duration: '4 – 6 tuần',
    description:
      'Phân số, số thập phân, tỉ số và tỉ số phần trăm, cùng thói quen đọc đề bằng bút chì. Mục tiêu là đúng, chưa cần nhanh.',
  },
  {
    id: 'L2',
    track: 'lop6',
    order: 2,
    name: 'GĐ 2 · Thành thạo dạng có lời văn',
    goal: 'Giải được các dạng toán có lời văn chuẩn của đề vào 6 mà không cần gợi ý.',
    levels: [2, 2, 3],
    kpi: 90,
    duration: '5 – 7 tuần',
    description:
      'Toán chuyển động, toán tính ngược, toán tỉ lệ và hình học tiểu học. Bắt đầu vẽ sơ đồ đoạn thẳng như một phản xạ.',
  },
  {
    id: 'L3',
    track: 'lop6',
    order: 3,
    name: 'GĐ 3 · Suy luận và quy luật',
    goal: 'Không bỏ trống câu suy luận và câu dãy số quy luật.',
    levels: [3, 3, 4],
    kpi: 85,
    duration: '5 – 6 tuần',
    description:
      'Suy luận logic dạng bảng đúng/sai, đếm hình, dãy số quy luật, bài toán cân đĩa và chia nhóm. Đây là phần phân hoá thật của đề đánh giá năng lực.',
  },
  {
    id: 'L4',
    track: 'lop6',
    order: 4,
    name: 'GĐ 4 · Luyện đề và tâm lý phòng thi',
    goal: 'Làm trọn đề trong 45 phút và giữ được sự bình tĩnh.',
    levels: [3, 4, 4],
    kpi: 85,
    duration: '4 – 6 tuần',
    description:
      'Đề tính giờ theo đúng định dạng trường mục tiêu, quy trình phân bổ thời gian, kỹ thuật bỏ qua và quay lại, quy trình soát bài 5 phút cuối.',
  },
  {
    id: 'K1',
    track: 'chinh-khoa',
    order: 1,
    name: 'GĐ 1 · Bám sát bài trên lớp',
    goal: 'Không còn bài nào trên lớp bị bỏ lại phía sau; điểm hệ số 1 đạt tuyệt đối.',
    levels: [1, 2, 2],
    kpi: 90,
    duration: 'Từ đầu năm đến giữa kỳ I (6 – 8 tuần)',
    description:
      'Ôn trong 48 giờ sau mỗi buổi học, làm chắc bài tập sách giáo khoa, và diệt lỗi tính toán. Ở giai đoạn này điểm miệng và điểm 15 phút quyết định phần lớn khoảng cách trong bảng tổng kết.',
  },
  {
    id: 'K2',
    track: 'chinh-khoa',
    order: 2,
    name: 'GĐ 2 · Chốt giữa kỳ I và cuối kỳ I',
    goal: 'Đạt 9–10 điểm ở cả bài giữa kỳ I và bài cuối kỳ I.',
    levels: [2, 3, 3],
    kpi: 90,
    duration: 'Từ giữa kỳ I đến hết kỳ I (8 – 10 tuần)',
    description:
      'Chuyển từ làm đúng sang làm đúng và nhanh. Học theo đề cương giữa kỳ và cuối kỳ, luyện đề đúng ma trận của trường, tập trình bày theo barem.',
  },
  {
    id: 'K3',
    track: 'chinh-khoa',
    order: 3,
    name: 'GĐ 3 · Vươn lên nhóm vận dụng cao',
    goal: 'Lấy trọn nhóm câu vận dụng và bắt đầu ăn được câu vận dụng cao.',
    levels: [3, 4, 4],
    kpi: 88,
    duration: 'Học kỳ II, từ đầu kỳ đến giữa kỳ II (8 – 10 tuần)',
    description:
      'Đây là chỗ tách nhóm 8 điểm khỏi nhóm 9–10 điểm. Học kỹ thuật của nhóm câu cuối đề, và bắt đầu tích luỹ cho kỳ thi cuối cấp hoặc kỳ đánh giá năng lực.',
  },
  {
    id: 'K4',
    track: 'chinh-khoa',
    order: 4,
    name: 'GĐ 4 · Tổng duyệt cả năm và ôn hè',
    goal: 'Đạt 9–10 điểm bài cuối kỳ II, giữ Top 1 tổng kết và bắc cầu sang năm học sau.',
    levels: [4, 4, 5],
    kpi: 88,
    duration: 'Từ giữa kỳ II đến hết hè (10 – 14 tuần)',
    description:
      'Tổng duyệt theo đề cương cả năm, sau đó chuyển sang đề cương ôn hè để vào năm học mới với nền đã sẵn sàng thay vì bắt đầu lại từ đầu.',
  },
];

export const stagesByTrack = (track: TrackId) => STAGES.filter((s) => s.track === track);
export const stageById = (id: string) => STAGES.find((s) => s.id === id)!;
