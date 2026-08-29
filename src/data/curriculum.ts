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

export interface KindSpec {
  kind: WorksheetKind;
  name: string;
  /** Muc tieu su pham cua dang phieu nay. */
  goal: string;
  /** Rang buoc rieng khi giao thanh nhiem vu. */
  constraint: string;
  /** He so thoi gian so voi muc chuan (phieu toc do siet thoi gian lai). */
  timeFactor: number;
  /** Dich do kho so voi cap do: -1 de hon, +1 kho hon. */
  difficultyShift: number;
  xpFactor: number;
}

/**
 * Tam dang phieu. Chuoi nay lap lai trong moi tuyen — nho vay hoc sinh luon
 * luan phien giua "hieu", "nhanh", "chinh xac" va "tong hop" thay vi lam mai
 * mot kieu bai roi tuong minh da gioi.
 */
export const KINDS: readonly KindSpec[] = [
  {
    kind: 'warmup',
    name: 'Khởi động',
    goal: 'Nhắc lại công thức và nhận diện dạng bài trước khi vào phần nặng.',
    constraint: 'Không giới hạn thời gian. Mục tiêu là làm đúng, chưa cần nhanh.',
    timeFactor: 1.25,
    difficultyShift: -1,
    xpFactor: 0.7,
  },
  {
    kind: 'skill',
    name: 'Rèn kỹ năng',
    goal: 'Làm chắc một kỹ năng lõi qua các biến thể liên tiếp của cùng một dạng.',
    constraint: 'Hoàn thành đủ 3 chặng trong một lượt, không rời phiếu giữa chừng.',
    timeFactor: 1,
    difficultyShift: 0,
    xpFactor: 1,
  },
  {
    kind: 'speed',
    name: 'Tốc độ',
    goal: 'Rút ngắn thời gian trên mỗi câu mà vẫn giữ được độ chính xác.',
    constraint: 'Thời gian bị siết còn 75% mức chuẩn. Quá giờ vẫn chấm nhưng không tính thành thạo.',
    timeFactor: 0.75,
    difficultyShift: -1,
    xpFactor: 1.1,
  },
  {
    kind: 'accuracy',
    name: 'Chính xác',
    goal: 'Loại bỏ lỗi ẩu và các bẫy quen thuộc trong chuyên đề.',
    constraint: 'Sai quá 2 câu là phải làm lại phiếu trước khi đi tiếp.',
    timeFactor: 1.15,
    difficultyShift: 0,
    xpFactor: 1.1,
  },
  {
    kind: 'mixed',
    name: 'Tổng hợp',
    goal: 'Trộn nhiều dạng trong cùng chuyên đề để rèn phản xạ nhận diện.',
    constraint: 'Không được biết trước dạng bài của từng câu.',
    timeFactor: 1,
    difficultyShift: 0,
    xpFactor: 1.15,
  },
  {
    kind: 'review',
    name: 'Ôn lại',
    goal: 'Quay lại các câu từng sai để kiến thức không phai theo thời gian.',
    constraint: 'Nên làm sau buổi học chính ít nhất một ngày.',
    timeFactor: 1.1,
    difficultyShift: 0,
    xpFactor: 0.9,
  },
  {
    kind: 'challenge',
    name: 'Thử thách',
    goal: 'Đẩy lên mức khó hơn cấp hiện tại để chuẩn bị lên cấp.',
    constraint: 'Đạt từ 85% mới được tính là vượt thử thách.',
    timeFactor: 1,
    difficultyShift: 1,
    xpFactor: 1.4,
  },
  {
    kind: 'boss',
    name: 'Vượt ải',
    goal: 'Bài kiểm tra chốt cấp độ của tuyến chuyên đề.',
    constraint: 'Phải đạt từ 90% để mở khóa cấp độ tiếp theo của tuyến này.',
    timeFactor: 0.95,
    difficultyShift: 1,
    xpFactor: 1.8,
  },
];

export const KIND_BY_ID = new Map(KINDS.map((k) => [k.kind, k]));

/** Ba chang co dinh trong moi phieu luyen. */
export const PART_TEMPLATE = [
  { name: 'Chặng 1 — Khởi động', goal: 'Lấy nhịp và kiểm tra nền tảng của chuyên đề.', share: 0.3, shift: -1 },
  { name: 'Chặng 2 — Rèn luyện', goal: 'Phần lõi: đúng mức độ của cấp hiện tại.', share: 0.45, shift: 0 },
  { name: 'Chặng 3 — Bứt tốc', goal: 'Câu khó hơn để kéo trần năng lực lên.', share: 0.25, shift: 1 },
] as const;
