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

/**
 * The eight roles, in ascending order of what they may reach.
 *
 * Three separate ladders run through this system and they must not be
 * conflated, because conflating them is how a strong student ends up reading a
 * classmate's record:
 *
 *   • **Role** — what a person is authorised to do. The ladder below.
 *   • **Teacher rank** — seniority within the teaching role. Authority over
 *     *material* is granted before authority over *people*.
 *   • **Student level** — what a learner has demonstrated. Earned from
 *     measured ability, never assigned, and it unlocks study material rather
 *     than administrative power. `permissionsFor` never reads it.
 *
 * The delivery roles (student, teacher, coach, consultant) work with learners.
 * The operating roles (product-admin, system-admin, executive, super-admin)
 * run the platform. A person in an operating role is not automatically able to
 * read a learner's record: `student.analytics.view` is granted where it is
 * needed for the job and withheld where it is not, which is why the executive
 * role sees aggregates and not individuals.
 */
export type RoleId =
  /* ---- Delivery ---- */
  | 'student'
  | 'teacher'
  | 'coach'
  | 'consultant'
  /* ---- Operating ---- */
  | 'product-admin'
  | 'system-admin'
  | 'executive'
  | 'super-admin';

/**
 * Ascending order, used for one rule only: nobody may create, promote, or
 * demote an account at or above their own position. It is not a permission
 * ladder — a higher role does not automatically contain a lower one, because
 * an executive has no business inside a classroom roster.
 */
export const ROLE_ORDER: RoleId[] = [
  'student',
  'teacher',
  'coach',
  'consultant',
  'product-admin',
  'system-admin',
  'executive',
  'super-admin',
];

export function roleAtLeast(role: RoleId, minimum: RoleId): boolean {
  return ROLE_ORDER.indexOf(role) >= ROLE_ORDER.indexOf(minimum);
}

/** Roles that work directly with learners, as opposed to running the platform. */
export const DELIVERY_ROLES: RoleId[] = ['student', 'teacher', 'coach', 'consultant'];

/** Roles that administer the platform itself. */
export const OPERATING_ROLES: RoleId[] = ['product-admin', 'system-admin', 'executive', 'super-admin'];

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
  // Coaching and consulting
  | 'coach.playbook'
  | 'coach.session.log'
  | 'coach.escalation.handle'
  | 'programme.design'
  | 'family.report'
  // Content
  | 'bank.view'
  | 'bank.author'
  | 'bank.publish'
  | 'form.assemble'
  | 'report.export'
  // Platform operation
  | 'org.settings'
  | 'audit.view'
  | 'account.manage'
  | 'role.assign'
  | 'calibration.run'
  | 'metrics.aggregate'
  | 'data.export.bulk'
  | 'data.purge'
  | 'feature.configure'
  | 'security.settings';

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
 * doing and set work; only a head may promote a colleague or read the audit
 * log.
 *
 * `bank.publish` is deliberately absent from this ladder. Publishing item
 * parameters changes the basis on which every score in the system is computed,
 * and that is a psychometric act rather than a teaching one — it belongs to
 * the product administrator, whose whole role is the bank. A head of programme
 * may author items (`bank.author`, inherited from senior); publishing them is
 * somebody else's signature.
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
    'audit.view',
  ],
};

/**
 * What each non-teaching role adds on top of the learner set.
 *
 * Stated as data rather than as branches in a function, so the policy can be
 * read, argued with, and tested as a table. Three decisions in it are worth
 * defending explicitly.
 *
 * **A coach reads learners but does not administer them.** Coaching is about
 * method and rhythm, so a coach holds the playbook, the session log, and the
 * escalation queue — and holds `student.analytics.view` because advising
 * without evidence is guessing. A coach cannot create classes, invite staff,
 * or touch the item bank.
 *
 * **A consultant designs programmes and talks to families.** They see
 * aggregate progress and may export a family report, and they hold
 * `student.analytics.view` for the learners they advise. They cannot see
 * individual responses: a consultant needs the shape of a learner's progress,
 * not a transcript of every answer.
 *
 * **An executive sees the organisation, not the individuals in it.** This is
 * the decision most likely to be questioned, so it is the one stated most
 * plainly: `metrics.aggregate` yes, `student.analytics.view` no. A director
 * who needs one learner's record can be granted a delivery role; what they
 * must not have is standing access to every learner's record by virtue of
 * seniority. Seniority is not a reason to read a child's data.
 */
const ROLE_GRANTS: Record<RoleId, Permission[]> = {
  student: [],

  // Teachers are granted by rank; see TEACHER_RANK_GRANTS.
  teacher: [],

  coach: [
    'roster.view',
    'student.analytics.view',
    'student.responses.view',
    'assignment.create',
    'assignment.grade',
    'coach.playbook',
    'coach.session.log',
    'coach.escalation.handle',
    'bank.view',
    'report.export',
  ],

  consultant: [
    'roster.view',
    'student.analytics.view',
    'programme.design',
    'family.report',
    'coach.playbook',
    'bank.view',
    'report.export',
    'metrics.aggregate',
  ],

  'product-admin': [
    'bank.view',
    'bank.author',
    'bank.publish',
    'form.assemble',
    'calibration.run',
    'feature.configure',
    'metrics.aggregate',
    'report.export',
  ],

  'system-admin': [
    'role.assign',
    'roster.view',
    'class.create',
    'class.edit',
    'class.archive',
    'account.manage',
    'teacher.invite',
    'org.settings',
    'audit.view',
    'metrics.aggregate',
    'feature.configure',
    'bank.view',
  ],

  executive: [
    'metrics.aggregate',
    'report.export',
    'audit.view',
    'bank.view',
  ],

  // Super admin is handled separately: it holds everything, by definition.
  'super-admin': [],
};

export interface Principal {
  role: RoleId;
  /** Present when `role === 'teacher'`. */
  rank?: TeacherRank;
  /** Class ids this principal teaches; scopes every roster permission. */
  classIds?: string[];
}

/**
 * Every permission in the system.
 *
 * Derived from the grant tables plus the two that belong to no role but the
 * highest. Assembling it this way used to mean a permission added to the union
 * and to no table would silently vanish from the administrator's set — the
 * feature would simply never appear, for anyone, with nothing to see in a
 * diff. `tests/security.test.ts` now transcribes the union and asserts the two
 * agree, so the drift fails a test instead of shipping.
 */
export const ALL_PERMISSIONS: Permission[] = [
  ...new Set<Permission>([
    ...LEARNER_PERMISSIONS,
    ...TEACHER_RANK_ORDER.flatMap((rank) => TEACHER_RANK_GRANTS[rank]),
    ...ROLE_ORDER.flatMap((role) => ROLE_GRANTS[role]),
    'role.assign',
    'data.export.bulk',
    'data.purge',
    'security.settings',
  ]),
];

/** The full permission set a principal holds. */
export function permissionsFor(principal: Principal): Set<Permission> {
  const granted = new Set<Permission>();

  if (principal.role === 'super-admin') {
    // The only role defined as holding everything. Every other role is a list,
    // so that what it may do can be read rather than inferred.
    for (const permission of ALL_PERMISSIONS) granted.add(permission);
    return granted;
  }

  // Everyone may study, staff included. A teacher who cannot sit a practice
  // test cannot honestly advise on one.
  for (const permission of LEARNER_PERMISSIONS) granted.add(permission);

  if (principal.role === 'teacher') {
    // Ranks are cumulative: each contains every rank below it.
    const rank = principal.rank ?? 'assistant';
    for (const level of TEACHER_RANK_ORDER) {
      for (const permission of TEACHER_RANK_GRANTS[level]) granted.add(permission);
      if (level === rank) break;
    }
    return granted;
  }

  for (const permission of ROLE_GRANTS[principal.role] ?? []) granted.add(permission);
  return granted;
}

export function can(principal: Principal, permission: Permission): boolean {
  return permissionsFor(principal).has(permission);
}

/**
 * Whether a principal may act on a particular class.
 *
 * Holding `roster.view` is not enough on its own — a teacher, coach, or
 * consultant sees the classes they are assigned to, not every class in the
 * organisation. Only the roles that administer the organisation itself are
 * unscoped, and only for permissions they actually hold: being unscoped widens
 * *which* classes a permission reaches, never *which* permissions are held.
 */
export function canForClass(principal: Principal, permission: Permission, classId: string): boolean {
  if (!can(principal, permission)) return false;
  if (isUnscoped(principal.role)) return true;
  return (principal.classIds ?? []).includes(classId);
}

/**
 * Roles whose authority is organisation-wide rather than class-scoped.
 *
 * Deliberately short. A coach and a consultant work with named learners and
 * are scoped like a teacher; a product administrator has no roster access to
 * be unscoped about. Only the two roles that exist to run the organisation,
 * plus the one defined as holding everything, sit outside class scope.
 */
export function isUnscoped(role: RoleId): boolean {
  return role === 'system-admin' || role === 'super-admin';
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
  if (!can(principal, 'student.analytics.view')) return false;
  if (isUnscoped(principal.role)) return true;
  const mine = new Set(principal.classIds ?? []);
  return input.targetClassIds.some((id) => mine.has(id));
}

/**
 * Whether one principal may set another account's role.
 *
 * Two conditions, and the second is the one that matters. Holding
 * `role.assign` is necessary. It is not sufficient: nobody may create or
 * promote an account at or above their own position, and nobody may change
 * their own role at all.
 *
 * Without that rule the permission is equivalent to super-admin, because the
 * first thing anyone holding it would do is grant themselves everything. The
 * ceiling is what makes delegation possible: a system administrator can staff
 * an organisation without being able to manufacture a peer or a superior.
 */
export function canAssignRole(
  principal: Principal,
  input: { selfId: string; targetId: string; targetCurrentRole: RoleId; nextRole: RoleId },
): boolean {
  if (!can(principal, 'role.assign')) return false;

  // Changing your own role is never an administrative act; it is an escape.
  if (input.selfId === input.targetId) return false;

  const mine = ROLE_ORDER.indexOf(principal.role);
  // A role at or above your own — either the one being granted, or the one the
  // target already holds. Demoting a peer is as much an escalation as
  // promoting one, because it removes the check they represent.
  if (ROLE_ORDER.indexOf(input.nextRole) >= mine) return false;
  if (ROLE_ORDER.indexOf(input.targetCurrentRole) >= mine) return false;

  return true;
}

/** Roles a principal may actually issue, for populating a picker honestly. */
export function assignableRoles(principal: Principal): RoleId[] {
  if (!can(principal, 'role.assign')) return [];
  return ROLE_ORDER.slice(0, ROLE_ORDER.indexOf(principal.role));
}

/**
 * Permissions that must be logged whenever they are exercised.
 *
 * Reading another person's record, changing what someone may do, and anything
 * irreversible. A permission system without a record is only a claim about the
 * past.
 */
export const AUDITED: Permission[] = [
  'student.responses.view',
  'student.analytics.view',
  'role.assign',
  'account.manage',
  'teacher.promote',
  'teacher.invite',
  'class.archive',
  'report.export',
  'data.export.bulk',
  'data.purge',
  'org.settings',
  'security.settings',
  'bank.publish',
];

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
  coach: { en: 'Coach', vi: 'Coach' },
  consultant: { en: 'Consultant', vi: 'Tư vấn' },
  'product-admin': { en: 'Product administrator', vi: 'Admin sản phẩm' },
  'system-admin': { en: 'System administrator', vi: 'Admin hệ thống' },
  executive: { en: 'Executive director', vi: 'Giám đốc điều hành' },
  'super-admin': { en: 'Super administrator', vi: 'Super Admin' },
};

/** One line on what each role is for, shown wherever a role is assigned. */
export const ROLE_PURPOSE: Record<RoleId, { en: string; vi: string }> = {
  student: {
    en: 'Studies. Sees their own work and nobody else’s.',
    vi: 'Học. Chỉ thấy bài của chính mình, không thấy của ai khác.',
  },
  teacher: {
    en: 'Teaches named classes. Authority widens by rank, and stays inside those classes.',
    vi: 'Dạy các lớp được phân công. Quyền mở rộng theo cấp, và luôn nằm trong các lớp đó.',
  },
  coach: {
    en: 'Works on method and rhythm with named learners. Reads their evidence; administers nothing.',
    vi: 'Làm việc về phương pháp và nhịp học với học sinh được phân công. Đọc bằng chứng của các em; không quản trị gì.',
  },
  consultant: {
    en: 'Designs programmes and reports to families. Sees the shape of progress, not every answer.',
    vi: 'Thiết kế lộ trình và báo cáo cho gia đình. Thấy hình dạng tiến bộ, không thấy từng câu trả lời.',
  },
  'product-admin': {
    en: 'Owns the item bank and calibration. No access to learner records.',
    vi: 'Phụ trách ngân hàng câu hỏi và hiệu chuẩn. Không truy cập hồ sơ học sinh.',
  },
  'system-admin': {
    en: 'Runs accounts, classes, and settings across the organisation.',
    vi: 'Vận hành tài khoản, lớp học và cấu hình toàn tổ chức.',
  },
  executive: {
    en: 'Sees the organisation in aggregate. Deliberately holds no access to individual learner records.',
    vi: 'Nhìn tổ chức ở mức tổng hợp. Cố ý không có quyền xem hồ sơ từng học sinh.',
  },
  'super-admin': {
    en: 'Holds every permission, including destructive ones. Should be a small number of people.',
    vi: 'Nắm mọi quyền, kể cả các quyền phá huỷ dữ liệu. Nên chỉ gồm rất ít người.',
  },
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
  'coach.playbook': { en: 'Open the coaching playbook', vi: 'Mở sổ tay coach' },
  'coach.session.log': { en: 'Record coaching sessions', vi: 'Ghi nhật ký buổi coach' },
  'coach.escalation.handle': { en: 'Handle escalations', vi: 'Xử lý cảnh báo cần can thiệp' },
  'programme.design': { en: 'Design learning programmes', vi: 'Thiết kế lộ trình đào tạo' },
  'family.report': { en: 'Issue reports to families', vi: 'Gửi báo cáo cho gia đình' },
  'account.manage': { en: 'Create and suspend accounts', vi: 'Tạo và khoá tài khoản' },
  'role.assign': { en: 'Assign roles to accounts', vi: 'Gán vai trò cho tài khoản' },
  'calibration.run': { en: 'Run item calibration', vi: 'Chạy hiệu chuẩn câu hỏi' },
  'metrics.aggregate': { en: 'View organisation-wide metrics', vi: 'Xem chỉ số toàn tổ chức' },
  'data.export.bulk': { en: 'Export data in bulk', vi: 'Xuất dữ liệu hàng loạt' },
  'data.purge': { en: 'Permanently delete data', vi: 'Xoá vĩnh viễn dữ liệu' },
  'feature.configure': { en: 'Configure product features', vi: 'Cấu hình tính năng sản phẩm' },
  'security.settings': { en: 'Change security settings', vi: 'Đổi cấu hình bảo mật' },
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

/**
 * The role-keyed tables, exposed so a test can assert none of them has drifted
 * out of step with `RoleId`. TypeScript's `Record<RoleId, …>` already enforces
 * completeness at compile time; this catches a table that was widened to
 * `Partial` or typed loosely at some later point.
 */
export const ROLE_GRANTS_FOR_TEST = [ROLE_GRANTS, ROLE_LABELS, ROLE_PURPOSE] as const;
