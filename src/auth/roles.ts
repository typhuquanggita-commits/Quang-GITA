/**
 * Role-based access control for SAT365.
 *
 * Two ladders exist side by side and they mean different things:
 *
 *   • A **role** is what someone is allowed to do — student, teacher, admin.
 *     Roles gate features, and a teacher role carries a *rank* that widens
 *     what they may do with other people's data.
 *
 *   • A **student level** is what a learner has demonstrated. It is earned
 *     from measured ability, never assigned, and it unlocks study material
 *     rather than administrative power. Confusing the two would let a strong
 *     student read a classmate's record, so they are kept strictly separate:
 *     `permissionsFor` never consults a student level.
 *
 * A caveat stated plainly: this is client-side authorisation for a
 * local-first application. It shapes the interface and encodes the policy,
 * and it is the right model to enforce on a server — but a browser holding
 * its own data cannot enforce it against a determined owner of that browser.
 * See docs/SECURITY.md for what must move server-side in a hosted
 * deployment.
 */

import type { SectionId } from '../types.ts';

/* ------------------------------------------------------------------ */
/* Roles                                                               */
/* ------------------------------------------------------------------ */

export type RoleId = 'student' | 'teacher' | 'admin';

/** Teacher seniority. Higher ranks strictly contain lower ones. */
export type TeacherRank = 'assistant' | 'teacher' | 'senior' | 'head';

export const TEACHER_RANK_ORDER: TeacherRank[] = ['assistant', 'teacher', 'senior', 'head'];

export function rankAtLeast(rank: TeacherRank, minimum: TeacherRank): boolean {
  return TEACHER_RANK_ORDER.indexOf(rank) >= TEACHER_RANK_ORDER.indexOf(minimum);
}

/* ------------------------------------------------------------------ */
/* Permissions                                                         */
/* ------------------------------------------------------------------ */

export type Permission =
  // Learner-facing
  | 'practice.run'
  | 'test.take'
  | 'review.own'
  | 'analytics.own'
  | 'plan.own'
  | 'vocab.own'
  // Teaching
  | 'roster.view'
  | 'student.analytics.view'
  | 'student.responses.view'
  | 'assignment.create'
  | 'assignment.grade'
  | 'class.create'
  | 'class.edit'
  | 'class.archive'
  | 'teacher.invite'
  | 'teacher.promote'
  // Content and system
  | 'bank.view'
  | 'bank.author'
  | 'bank.publish'
  | 'form.assemble'
  | 'report.export'
  | 'org.settings'
  | 'audit.view';

const LEARNER_PERMISSIONS: Permission[] = [
  'practice.run',
  'test.take',
  'review.own',
  'analytics.own',
  'plan.own',
  'vocab.own',
];

/**
 * What each teacher rank adds on top of the rank below it.
 *
 * The progression encodes one principle: authority over *people* is granted
 * later than authority over *material*. An assistant may see how a class is
 * doing and set work; only a head may promote a colleague or change how the
 * organisation itself is configured.
 */
const TEACHER_RANK_GRANTS: Record<TeacherRank, Permission[]> = {
  assistant: [
    'roster.view',
    'student.analytics.view',
    'assignment.grade',
    'bank.view',
  ],
  teacher: [
    'assignment.create',
    'student.responses.view',
    'form.assemble',
    'report.export',
  ],
  senior: [
    'class.create',
    'class.edit',
    'bank.author',
  ],
  head: [
    'class.archive',
    'teacher.invite',
    'teacher.promote',
    'bank.publish',
    'audit.view',
  ],
};

export interface Principal {
  role: RoleId;
  /** Present when `role === 'teacher'`. */
  rank?: TeacherRank;
  /** Class ids this principal teaches; scopes every roster permission. */
  classIds?: string[];
}

/** The full permission set a principal holds. */
export function permissionsFor(principal: Principal): Set<Permission> {
  const granted = new Set<Permission>();

  if (principal.role === 'admin') {
    // An administrator holds every permission, learner ones included, so they
    // can walk the product exactly as a student sees it.
    for (const permission of ALL_PERMISSIONS) granted.add(permission);
    return granted;
  }

  // Everyone, teachers included, may study. A teacher who cannot sit a
  // practice test cannot honestly advise on one.
  for (const permission of LEARNER_PERMISSIONS) granted.add(permission);

  if (principal.role === 'teacher') {
    const rank = principal.rank ?? 'assistant';
    for (const level of TEACHER_RANK_ORDER) {
      for (const permission of TEACHER_RANK_GRANTS[level]) granted.add(permission);
      if (level === rank) break;
    }
  }

  return granted;
}

export const ALL_PERMISSIONS: Permission[] = [
  ...LEARNER_PERMISSIONS,
  ...TEACHER_RANK_ORDER.flatMap((rank) => TEACHER_RANK_GRANTS[rank]),
  'org.settings',
];

export function can(principal: Principal, permission: Permission): boolean {
  return permissionsFor(principal).has(permission);
}

/**
 * Whether a principal may act on a particular class.
 *
 * Holding `roster.view` is not enough on its own — a teacher sees the classes
 * they teach, not every class in the organisation. Only an administrator is
 * unscoped.
 */
export function canForClass(principal: Principal, permission: Permission, classId: string): boolean {
  if (!can(principal, permission)) return false;
  if (principal.role === 'admin') return true;
  return (principal.classIds ?? []).includes(classId);
}

/**
 * Whether a principal may read another learner's record. Reading your own
 * record needs no teaching permission; reading someone else's does, and it
 * must be scoped to a shared class.
 */
export function canViewLearner(
  principal: Principal,
  input: { selfId: string; targetId: string; targetClassIds: string[] },
): boolean {
  if (input.selfId === input.targetId) return true;
  if (principal.role === 'admin') return true;
  if (!can(principal, 'student.analytics.view')) return false;
  const mine = new Set(principal.classIds ?? []);
  return input.targetClassIds.some((id) => mine.has(id));
}

/* ------------------------------------------------------------------ */
/* Student levels                                                      */
/* ------------------------------------------------------------------ */

export type StudentLevel = 'foundation' | 'developing' | 'proficient' | 'advanced' | 'elite';

export const STUDENT_LEVELS: StudentLevel[] = [
  'foundation',
  'developing',
  'proficient',
  'advanced',
  'elite',
];

export interface StudentLevelSpec {
  id: StudentLevel;
  label: string;
  labelVi: string;
  /** Inclusive lower bound on the total score, 400–1600. */
  minTotal: number;
  /** What the level changes about the learner's experience. */
  unlocks: string[];
  unlocksVi: string[];
}

/**
 * Level thresholds are stated on the score scale rather than on theta,
 * because that is the number a learner and a teacher both already understand.
 * The boundaries sit at the points where what a student needs to work on
 * genuinely changes.
 */
export const STUDENT_LEVEL_SPECS: Record<StudentLevel, StudentLevelSpec> = {
  foundation: {
    id: 'foundation',
    label: 'Foundation',
    labelVi: 'Nền tảng',
    minTotal: 400,
    unlocks: ['Core skill drills', 'Guided explanations', 'Untimed practice'],
    unlocksVi: ['Luyện kỹ năng cốt lõi', 'Lời giải chi tiết từng bước', 'Luyện không giới hạn giờ'],
  },
  developing: {
    id: 'developing',
    label: 'Developing',
    labelVi: 'Đang phát triển',
    minTotal: 1000,
    unlocks: ['Timed drills', 'Section tests', 'Pacing analytics'],
    unlocksVi: ['Luyện có bấm giờ', 'Thi theo phần', 'Phân tích nhịp độ'],
  },
  proficient: {
    id: 'proficient',
    label: 'Proficient',
    labelVi: 'Thành thạo',
    minTotal: 1200,
    unlocks: ['Full-length adaptive tests', 'Error taxonomy', 'Upper-pathway items'],
    unlocksVi: ['Thi thử full-length thích ứng', 'Phân loại lỗi sai', 'Câu hỏi nhánh khó'],
  },
  advanced: {
    id: 'advanced',
    label: 'Advanced',
    labelVi: 'Nâng cao',
    minTotal: 1400,
    unlocks: ['Hard-band item pool', 'Time-pressure mode', 'Precision review'],
    unlocksVi: ['Kho câu hỏi độ khó cao', 'Chế độ áp lực thời gian', 'Ôn tập độ chính xác cao'],
  },
  elite: {
    id: 'elite',
    label: 'Elite',
    labelVi: 'Tinh hoa',
    minTotal: 1520,
    unlocks: ['Perfect-score drills', 'Trap-question sets', 'Sub-target pacing'],
    unlocksVi: ['Luyện mục tiêu tuyệt đối', 'Bộ câu bẫy', 'Nhịp độ dưới ngưỡng mục tiêu'],
  },
};

/** The level a total score earns. */
export function levelForScore(total: number): StudentLevel {
  let earned: StudentLevel = 'foundation';
  for (const level of STUDENT_LEVELS) {
    if (total >= STUDENT_LEVEL_SPECS[level].minTotal) earned = level;
  }
  return earned;
}

/** Points still needed to reach the next level, or null at the top. */
export function pointsToNextLevel(total: number): { next: StudentLevel; points: number } | null {
  const current = levelForScore(total);
  const index = STUDENT_LEVELS.indexOf(current);
  if (index === STUDENT_LEVELS.length - 1) return null;
  const next = STUDENT_LEVELS[index + 1];
  return { next, points: STUDENT_LEVEL_SPECS[next].minTotal - total };
}

/**
 * Per-section level, so a learner strong in Math and weak in Reading is
 * described accurately instead of being averaged into a single misleading
 * label. Section scores run 200–800, so they are doubled onto the total scale.
 */
export function levelForSection(sectionScaled: number): StudentLevel {
  return levelForScore(sectionScaled * 2);
}

export function sectionLevels(scores: Record<SectionId, number>): Record<SectionId, StudentLevel> {
  return { rw: levelForSection(scores.rw), math: levelForSection(scores.math) };
}

/* ------------------------------------------------------------------ */
/* Labels                                                              */
/* ------------------------------------------------------------------ */

export const ROLE_LABELS: Record<RoleId, { en: string; vi: string }> = {
  student: { en: 'Student', vi: 'Học sinh' },
  teacher: { en: 'Teacher', vi: 'Giáo viên' },
  admin: { en: 'Administrator', vi: 'Quản trị viên' },
};

export const RANK_LABELS: Record<TeacherRank, { en: string; vi: string }> = {
  assistant: { en: 'Teaching assistant', vi: 'Trợ giảng' },
  teacher: { en: 'Teacher', vi: 'Giáo viên' },
  senior: { en: 'Senior teacher', vi: 'Giáo viên chính' },
  head: { en: 'Head of programme', vi: 'Trưởng bộ môn' },
};

export const PERMISSION_LABELS: Record<Permission, { en: string; vi: string }> = {
  'practice.run': { en: 'Run practice sessions', vi: 'Chạy phiên luyện tập' },
  'test.take': { en: 'Take practice tests', vi: 'Làm bài thi thử' },
  'review.own': { en: 'Review own mistakes', vi: 'Ôn lỗi sai của mình' },
  'analytics.own': { en: 'View own analytics', vi: 'Xem phân tích của mình' },
  'plan.own': { en: 'Manage own study plan', vi: 'Quản lý kế hoạch học của mình' },
  'vocab.own': { en: 'Use the vocabulary deck', vi: 'Dùng bộ từ vựng' },
  'roster.view': { en: 'View class rosters', vi: 'Xem danh sách lớp' },
  'student.analytics.view': { en: 'View student analytics', vi: 'Xem phân tích của học sinh' },
  'student.responses.view': { en: 'Inspect student responses', vi: 'Xem chi tiết bài làm học sinh' },
  'assignment.create': { en: 'Create assignments', vi: 'Giao bài tập' },
  'assignment.grade': { en: 'Grade assignments', vi: 'Chấm bài tập' },
  'class.create': { en: 'Create classes', vi: 'Tạo lớp' },
  'class.edit': { en: 'Edit classes', vi: 'Sửa lớp' },
  'class.archive': { en: 'Archive classes', vi: 'Lưu trữ lớp' },
  'teacher.invite': { en: 'Invite teachers', vi: 'Mời giáo viên' },
  'teacher.promote': { en: 'Change teacher rank', vi: 'Thay đổi cấp giáo viên' },
  'bank.view': { en: 'Browse the item bank', vi: 'Duyệt ngân hàng câu hỏi' },
  'bank.author': { en: 'Author items', vi: 'Soạn câu hỏi' },
  'bank.publish': { en: 'Publish items', vi: 'Xuất bản câu hỏi' },
  'form.assemble': { en: 'Assemble test forms', vi: 'Lắp ráp đề thi' },
  'report.export': { en: 'Export score reports', vi: 'Xuất báo cáo điểm' },
  'org.settings': { en: 'Change organisation settings', vi: 'Cấu hình tổ chức' },
  'audit.view': { en: 'Read the audit log', vi: 'Xem nhật ký kiểm toán' },
};

export function roleLabel(role: RoleId, locale: 'vi' | 'en'): string {
  return ROLE_LABELS[role][locale];
}

export function rankLabel(rank: TeacherRank, locale: 'vi' | 'en'): string {
  return RANK_LABELS[rank][locale];
}

export function studentLevelLabel(level: StudentLevel, locale: 'vi' | 'en'): string {
  const spec = STUDENT_LEVEL_SPECS[level];
  return locale === 'vi' ? spec.labelVi : spec.label;
}

export function permissionLabel(permission: Permission, locale: 'vi' | 'en'): string {
  return PERMISSION_LABELS[permission][locale];
}
