import type { Difficulty, WorksheetKind } from '../types';

/**
 * KHUNG CHUONG TRINH HSA365
 *
 * Chuong trinh chia lam 3 giai doan, moi giai doan 2 cap do — tong 6 cap.
 * Moi chu de la mot "tuyen" rieng: hoc sinh len cap tren tung tuyen, nen mot
 * ban manh Toan yeu Van se hoc o hai toc do khac nhau thay vi bi keo ve cung
 * mot nhip.
 *
 * Quy tac tien do (dung xuyen suot he thong):
 *  - Hoan thanh phieu:        >= PASS_RATIO       (70%)
 *  - Thanh thao phieu:        >= MASTERY_RATIO    (85%)
 *  - Len cap trong tuyen:     thanh thao >= MASTERED_TO_LEVEL_UP phieu o cap do
 *  - Xet nang giai doan:      KPI toan giai doan >= STAGE_PROMOTION_KPI (90%)
 */

export const PASS_RATIO = 0.7;
export const MASTERY_RATIO = 0.85;
export const STAGE_PROMOTION_KPI = 0.9;
export const MASTERED_TO_LEVEL_UP = 3;

export interface LevelSpec {
  level: number;
  stage: number;
  name: string;
  motto: string;
  questionCount: number;
  /** Giay cho moi cau — quyet dinh ap luc thoi gian cua cap do. */
  secondsPerQuestion: number;
  /** Khoang do kho duoc phep xuat hien o cap nay. */
  difficultyRange: readonly [Difficulty, Difficulty];
  xp: number;
}

export const LEVELS: readonly LevelSpec[] = [
  {
    level: 1,
    stage: 1,
    name: 'Khởi động',
    motto: 'Nhận diện dạng bài và nhớ lại công thức nền.',
    questionCount: 8,
    secondsPerQuestion: 60,
    difficultyRange: [1, 2],
    xp: 40,
  },
  {
    level: 2,
    stage: 1,
    name: 'Cơ bản',
    motto: 'Làm đúng dạng chuẩn mà không cần nhìn gợi ý.',
    questionCount: 10,
    secondsPerQuestion: 70,
    difficultyRange: [1, 3],
    xp: 60,
  },
  {
    level: 3,
    stage: 2,
    name: 'Vận dụng',
    motto: 'Ghép nhiều bước và tránh các bẫy quen thuộc.',
    questionCount: 12,
    secondsPerQuestion: 75,
    difficultyRange: [2, 3],
    xp: 90,
  },
  {
    level: 4,
    stage: 2,
    name: 'Thành thạo',
    motto: 'Giữ độ chính xác khi thời gian bắt đầu siết lại.',
    questionCount: 12,
    secondsPerQuestion: 65,
    difficultyRange: [2, 4],
    xp: 120,
  },
  {
    level: 5,
    stage: 3,
    name: 'Nâng cao',
    motto: 'Xử lý câu phân loại mà không mất nhịp.',
    questionCount: 14,
    secondsPerQuestion: 70,
    difficultyRange: [3, 5],
    xp: 160,
  },
  {
    level: 6,
    stage: 3,
    name: 'Đỉnh cao',
    motto: 'Tốc độ và độ chính xác của nhóm dẫn đầu phổ điểm.',
    questionCount: 15,
    secondsPerQuestion: 60,
    difficultyRange: [4, 5],
    xp: 220,
  },
];

export const LEVEL_BY_ID = new Map(LEVELS.map((l) => [l.level, l]));
export const MAX_LEVEL = LEVELS.length;

export interface StageSpec {
  stage: number;
  name: string;
  purpose: string;
  levels: readonly number[];
}

export const STAGES: readonly StageSpec[] = [
  {
    stage: 1,
    name: 'Giai đoạn 1 — Nền tảng',
    purpose: 'Phủ kín kiến thức và bịt lỗ hổng. Ưu tiên hiểu đúng hơn làm nhanh.',
    levels: [1, 2],
  },
  {
    stage: 2,
    name: 'Giai đoạn 2 — Tăng tốc',
    purpose: 'Luyện chuyên đề cường độ cao và làm quen áp lực thời gian.',
    levels: [3, 4],
  },
  {
    stage: 3,
    name: 'Giai đoạn 3 — Bứt phá',
    purpose: 'Câu phân loại, đề tổng hợp và giữ phong độ trước ngày thi.',
    levels: [5, 6],
  },
];

export const STAGE_BY_ID = new Map(STAGES.map((s) => [s.stage, s]));

/** Ti trong so phieu phan bo cho tung cap do (tong = 1). */
export const LEVEL_SHARE: Record<number, number> = {
  1: 0.14,
  2: 0.18,
  3: 0.2,
  4: 0.2,
  5: 0.16,
  6: 0.12,
};

export interface KindPart {
  name: string;
  goal: string;
}

export interface KindSpec {
  kind: WorksheetKind;
  /** Ten day du nhu tren tai lieu in. */
  name: string;
  /** Ma viet tat dung trong ma phieu, vi du LT, DB, KN. */
  code: string;
  /** Muc tieu su pham cua loai phieu nay. */
  goal: string;
  /** Nguoi hoc nen o dau trong chuyen de khi lam phieu nay. */
  whenToUse: string;
  /** Rang buoc rieng khi giao thanh nhiem vu. */
  constraint: string;
  /** Tieu chi coi la da nam duoc loai phieu nay. */
  masteryCue: string;
  /** He so thoi gian so voi muc chuan. */
  timeFactor: number;
  /** Dich do kho so voi cap do: -1 de hon, +1 kho hon. */
  difficultyShift: number;
  xpFactor: number;
  /** Ten va muc tieu ba chang, rieng cho tung loai phieu. */
  parts: readonly [KindPart, KindPart, KindPart];
}

/**
 * SAU LOAI PHIEU CUA MOI CHUYEN DE
 *
 * Day khong phai sau bien the cua cung mot thu. Moi loai phieu tra loi mot cau
 * hoi khac nhau, va thu tu giua chung la thu tu su pham chu khong phai thu tu
 * tuy y:
 *
 *   1. Ly thuyet          — Toi co nam dung khai niem va cong thuc khong?
 *   2. Dang bai & doc vi  — Nhin de la biet ngay day la dang gi chua?
 *   3. Ky nang & phuong phap — Toi co lam gon va dung quy trinh khong?
 *   4. Luyen nang cao     — Toi xu ly duoc cau nhieu buoc va co bay khong?
 *   5. On thi             — Tron moi dang, toi con nhan ra duoc khong?
 *   6. Phieu thi          — Duoi ap luc thoi gian that, toi duoc bao nhieu?
 *
 * Bo qua buoc 2 la ly do pho bien nhat khien nguoi hoc "hieu bai ma khong lam
 * duoc": ho biet cach giai nhung khong nhan ra khi nao thi dung cach nao.
 *
 * Moi phieu deu di kem hai tai lieu rieng:
 *   - Phieu loi giai + bang phan tich chuyen sau (ma LG-…), sinh tu chinh bo cau
 *   - Phieu huong dan on chac chuyen de (ma HD-…), mot phieu cho moi chuyen de
 */
export const KINDS: readonly KindSpec[] = [
  {
    kind: 'theory',
    name: 'Phiếu lý thuyết',
    code: 'LT',
    goal: 'Kiểm tra và chốt lại phần nền: định nghĩa, công thức, điều kiện áp dụng. Không phải để làm khó, mà để không còn chỗ hổng nào ở tầng dưới cùng.',
    whenToUse: 'Mở đầu chuyên đề, hoặc khi bảng phân tích cho thấy lỗi kiến thức chiếm ưu thế.',
    constraint: 'Không giới hạn thời gian. Sai câu nào thì đọc ngay phần lý thuyết của câu đó trước khi đi tiếp.',
    masteryCue: 'Viết lại được công thức và nêu được điều kiện áp dụng mà không cần nhìn tài liệu.',
    timeFactor: 1.3,
    difficultyShift: -1,
    xpFactor: 0.8,
    parts: [
      { name: 'Chặng 1 — Khái niệm', goal: 'Nhận diện đúng khái niệm và thuật ngữ của chuyên đề.' },
      { name: 'Chặng 2 — Công thức', goal: 'Áp dụng trực tiếp công thức vào tình huống đơn giản nhất.' },
      { name: 'Chặng 3 — Điều kiện & ngoại lệ', goal: 'Nhận ra khi nào công thức KHÔNG dùng được — chỗ mất điểm phổ biến nhất.' },
    ],
  },
  {
    kind: 'patterns',
    name: 'Phiếu dạng bài & đọc vị',
    code: 'DB',
    goal: 'Rèn phản xạ nhìn đề là biết dạng. Đây là mắt xích bị bỏ qua nhiều nhất: người học biết cách giải nhưng không nhận ra khi nào thì dùng cách nào.',
    whenToUse: 'Ngay sau phiếu lý thuyết, trước khi luyện số lượng.',
    constraint: 'Với mỗi câu, gọi tên dạng bài trong đầu TRƯỚC khi tính. Nếu không gọi được tên, đó là câu cần đánh dấu.',
    masteryCue: 'Đọc xong đề trong 10 giây là nói được đây là dạng gì và sẽ đi theo hướng nào.',
    timeFactor: 1.15,
    difficultyShift: -1,
    xpFactor: 1,
    parts: [
      { name: 'Chặng 1 — Dấu hiệu nhận biết', goal: 'Bắt đúng từ khóa và cấu trúc đề báo hiệu dạng bài.' },
      { name: 'Chặng 2 — Phân loại dạng', goal: 'Xếp đúng câu vào dạng và chọn hướng giải tương ứng.' },
      { name: 'Chặng 3 — Dạng lai & dễ nhầm', goal: 'Phân biệt các dạng trông giống nhau nhưng giải khác nhau.' },
    ],
  },
  {
    kind: 'method',
    name: 'Phiếu kỹ năng & phương pháp',
    code: 'KN',
    goal: 'Chuẩn hóa quy trình giải: đi đúng thứ tự bước, không bỏ bước, và rút gọn được thao tác thừa.',
    whenToUse: 'Khi đã nhận ra dạng nhưng còn sai bước hoặc còn chậm.',
    constraint: 'Làm đủ ba chặng trong một lượt. Ghi ra quy trình từng bước ở chặng 1 rồi bám theo đúng quy trình đó.',
    masteryCue: 'Làm được trong thời gian mục tiêu mà không phải nghĩ xem bước tiếp theo là gì.',
    timeFactor: 1,
    difficultyShift: 0,
    xpFactor: 1.1,
    parts: [
      { name: 'Chặng 1 — Quy trình chuẩn', goal: 'Đi đúng thứ tự các bước, chưa cần nhanh.' },
      { name: 'Chặng 2 — Luyện thành thạo', goal: 'Lặp lại quy trình trên các biến thể của cùng một dạng.' },
      { name: 'Chặng 3 — Rút gọn thao tác', goal: 'Bỏ bước thừa, dùng mẹo tính nhanh phù hợp áp lực phòng thi.' },
    ],
  },
  {
    kind: 'advanced',
    name: 'Phiếu luyện nâng cao',
    code: 'NC',
    goal: 'Xử lý câu nhiều bước, có bẫy và có yếu tố phân loại — nhóm câu quyết định khoảng cách giữa điểm khá và điểm dẫn đầu.',
    whenToUse: 'Khi phiếu kỹ năng đã đạt mức thành thạo.',
    constraint: 'Đạt từ 85% mới tính là vượt. Mỗi câu sai bắt buộc đọc phần bẫy trong phiếu lời giải.',
    masteryCue: 'Nhận ra bẫy trước khi mắc, thay vì nhận ra sau khi xem đáp án.',
    timeFactor: 1,
    difficultyShift: 1,
    xpFactor: 1.4,
    parts: [
      { name: 'Chặng 1 — Khởi động', goal: 'Lấy nhịp bằng câu đúng mức của cấp hiện tại.' },
      { name: 'Chặng 2 — Nhiều bước', goal: 'Ghép nhiều kỹ thuật trong cùng một câu.' },
      { name: 'Chặng 3 — Câu phân loại', goal: 'Câu khó nhất của chuyên đề ở cấp này.' },
    ],
  },
  {
    kind: 'revision',
    name: 'Phiếu ôn thi',
    code: 'OT',
    goal: 'Trộn mọi dạng của chuyên đề theo đúng phân bố của đề thật, để kiểm tra phản xạ nhận diện khi không biết trước dạng bài.',
    whenToUse: 'Cuối mỗi cấp độ, trước khi vào phiếu thi.',
    constraint: 'Không xem lại lý thuyết trong lúc làm. Sai ở đâu thì đó chính là chỗ chưa chắc thật.',
    masteryCue: 'Kết quả ở phiếu ôn thi không thấp hơn phiếu kỹ năng — nghĩa là bạn nhận dạng được, không chỉ giải được.',
    timeFactor: 0.95,
    difficultyShift: 0,
    xpFactor: 1.2,
    parts: [
      { name: 'Chặng 1 — Rà kiến thức', goal: 'Quét nhanh các công thức và điều kiện đã học.' },
      { name: 'Chặng 2 — Trộn dạng', goal: 'Các dạng xuất hiện xen kẽ, không báo trước.' },
      { name: 'Chặng 3 — Mô phỏng đề', goal: 'Phân bố độ khó giống một lát cắt của đề thật.' },
    ],
  },
  {
    kind: 'test',
    name: 'Phiếu thi',
    code: 'PT',
    goal: 'Bài kiểm tra chốt chuyên đề ở cấp độ này, làm trong điều kiện thời gian như phòng thi.',
    whenToUse: 'Khi đã qua năm loại phiếu trước của cùng cấp độ.',
    constraint: 'Phải đạt từ 90% để mở khóa cấp độ tiếp theo của tuyến này. Không tạm dừng giữa chừng.',
    masteryCue: 'Đạt 90% trong đúng thời gian quy định, không cần đến phút bù.',
    timeFactor: 0.85,
    difficultyShift: 1,
    xpFactor: 1.8,
    parts: [
      { name: 'Chặng 1 — Phần dễ ăn điểm', goal: 'Lấy trọn điểm nhóm câu cơ bản, nhanh và chắc.' },
      { name: 'Chặng 2 — Phần lõi', goal: 'Nhóm câu quyết định điểm số của chuyên đề.' },
      { name: 'Chặng 3 — Phần phân loại', goal: 'Nhóm câu tách nhóm dẫn đầu khỏi phần còn lại.' },
    ],
  },
];

export const KIND_BY_ID = new Map(KINDS.map((k) => [k.kind, k]));

/** Thu tu su pham cua nam loai phieu dau; phieu thi luon dat o cuoi moi cap do. */
export const KIND_SEQUENCE: readonly WorksheetKind[] = [
  'theory',
  'patterns',
  'method',
  'advanced',
  'revision',
];

/** Ba chang co dinh trong moi phieu luyen. */
export const PART_TEMPLATE = [
  { name: 'Chặng 1 — Khởi động', goal: 'Lấy nhịp và kiểm tra nền tảng của chuyên đề.', share: 0.3, shift: -1 },
  { name: 'Chặng 2 — Rèn luyện', goal: 'Phần lõi: đúng mức độ của cấp hiện tại.', share: 0.45, shift: 0 },
  { name: 'Chặng 3 — Bứt tốc', goal: 'Câu khó hơn để kéo trần năng lực lên.', share: 0.25, shift: 1 },
] as const;
