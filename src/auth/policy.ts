/**
 * Ma trận chính sách phân quyền GITA 365.
 * Đặc tả: docs/an-toan-va-phan-quyen/02-ma-tran-quyen.md
 *
 * NGUYÊN TẮC: mặc định TỪ CHỐI. Không có mục nào trong bảng = không có quyền.
 */
import type {
  Action,
  LevelTier,
  ResourceType,
  RoleCode,
  Scope,
  ServiceTier,
} from './types.ts';

export interface Grant {
  actions: Action[];
  scopes: Scope[];
}

export type ResourcePolicy = Partial<Record<RoleCode, Grant>>;

const A_ALL: Action[] = ['read', 'create', 'update', 'delete'];

/**
 * Ma trận quyền. Ô trống = không có quyền.
 * Ghi chú tương ứng với phần chú thích của TL 02 §3.
 */
export const POLICY: Record<ResourceType, ResourcePolicy> = {
  // ---------- Nhóm A · Hồ sơ học viên (P2) ----------
  profile: {
    STUDENT: {actions: ['read'], scopes: ['own']},
    PARENT: {actions: ['read'], scopes: ['child']},
    TEACHER: {actions: ['read'], scopes: ['class']},
    COACH: {actions: ['read', 'update'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read'], scopes: ['team']},
    ADVISOR: {actions: ['read', 'update'], scopes: ['assigned']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
    SPECIALIST: {actions: ['read'], scopes: ['referred']},
    CSO: {actions: ['read'], scopes: ['org']},
    // Chú thích ¹ — chỉ siêu dữ liệu, nội dung chuyên môn được mã hoá tầng ứng dụng.
    SUPER_ADMIN: {actions: ['read', 'update'], scopes: ['org']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['agg']},
  },
  assessment: {
    STUDENT: {actions: ['read', 'create'], scopes: ['own']},
    PARENT: {actions: ['read'], scopes: ['child']},
    COACH: {actions: ['read'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read'], scopes: ['team']},
    ADVISOR: {actions: ['read', 'create', 'update'], scopes: ['assigned']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
    SPECIALIST: {actions: ['read'], scopes: ['referred']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['agg']},
  },
  result: {
    STUDENT: {actions: ['read'], scopes: ['own']},
    PARENT: {actions: ['read'], scopes: ['child']},
    TEACHER: {actions: ['read'], scopes: ['class']},
    COACH: {actions: ['read'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read'], scopes: ['team']},
    ADVISOR: {actions: ['read', 'update'], scopes: ['assigned']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
    SPECIALIST: {actions: ['read'], scopes: ['referred']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['agg']},
  },
  competency: {
    STUDENT: {actions: ['read'], scopes: ['own']},
    PARENT: {actions: ['read'], scopes: ['child']},
    TEACHER: {actions: ['read'], scopes: ['class']},
    COACH: {actions: ['read', 'update'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read', 'update'], scopes: ['team']},
    ADVISOR: {actions: ['read', 'update'], scopes: ['assigned']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
    SPECIALIST: {actions: ['read'], scopes: ['referred']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['agg']},
  },
  goal: {
    STUDENT: {actions: ['read', 'create', 'update'], scopes: ['own']},
    PARENT: {actions: ['read'], scopes: ['child']},
    COACH: {actions: ['read', 'update'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read'], scopes: ['team']},
    ADVISOR: {actions: ['read', 'update'], scopes: ['assigned']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['agg']},
  },
  roadmap: {
    STUDENT: {actions: ['read'], scopes: ['own']},
    PARENT: {actions: ['read'], scopes: ['child']},
    COACH: {actions: ['read', 'create', 'update'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read', 'update', 'approve'], scopes: ['team']},
    ADVISOR: {actions: ['read', 'create'], scopes: ['assigned']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
    SPECIALIST: {actions: ['read'], scopes: ['referred']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['agg']},
  },
  task: {
    STUDENT: {actions: ['read', 'update'], scopes: ['own']},
    PARENT: {actions: ['read'], scopes: ['child']},
    TEACHER: {actions: ['read', 'create'], scopes: ['class']},
    COACH: {actions: ['read', 'create', 'update'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read'], scopes: ['team']},
  },
  habit: {
    STUDENT: {actions: ['read', 'create', 'update'], scopes: ['own']},
    PARENT: {actions: ['read'], scopes: ['child']},
    COACH: {actions: ['read', 'update'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read'], scopes: ['team']},
    ADVISOR: {actions: ['read'], scopes: ['assigned']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['agg']},
  },
  evidence: {
    STUDENT: {actions: ['read', 'create'], scopes: ['own']},
    PARENT: {actions: ['read'], scopes: ['child']},
    TEACHER: {actions: ['read', 'create'], scopes: ['class']},
    COACH: {actions: ['read', 'create'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read'], scopes: ['team']},
    ADVISOR: {actions: ['read'], scopes: ['assigned']},
    SPECIALIST: {actions: ['read'], scopes: ['referred']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['agg']},
  },
  portfolio: {
    STUDENT: {actions: ['read', 'create', 'update', 'export'], scopes: ['own']},
    PARENT: {actions: ['read', 'export'], scopes: ['child']},
    COACH: {actions: ['read', 'update'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read'], scopes: ['team']},
    ADVISOR: {actions: ['read'], scopes: ['assigned']},
    SPECIALIST: {actions: ['read'], scopes: ['referred']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['agg']},
  },

  // ---------- Nhóm B · Nhật ký và phản tư ----------
  journal: {
    STUDENT: {actions: ['read', 'create', 'update'], scopes: ['own']},
    PARENT: {actions: ['read'], scopes: ['child']},
    COACH: {actions: ['read'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read'], scopes: ['team']},
    ADVISOR: {actions: ['read'], scopes: ['assigned']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['agg']},
  },
  reflection: {
    STUDENT: {actions: ['read', 'create', 'update'], scopes: ['own']},
    // Chú thích ⁷ — chặn thêm bởi quy tắc riêng tư, xem can.ts.
    PARENT: {actions: ['read'], scopes: ['child']},
    COACH: {actions: ['read'], scopes: ['assigned']},
    ADVISOR: {actions: ['read'], scopes: ['assigned']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
  },
  reflection_flagged: {
    STUDENT: {actions: ['read', 'create', 'update'], scopes: ['own']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
    CSO: {actions: ['read'], scopes: ['org']},
  },
  parent_journal: {
    // Chú thích ⁸ — học viên đọc được nhật ký cha mẹ viết về mình.
    STUDENT: {actions: ['read'], scopes: ['own']},
    PARENT: {actions: ['read', 'create', 'update'], scopes: ['child']},
    COACH: {actions: ['read'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read'], scopes: ['team']},
    ADVISOR: {actions: ['read'], scopes: ['assigned']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['agg']},
  },

  // ---------- Nhóm C · Huấn luyện và báo cáo ----------
  coaching_session: {
    STUDENT: {actions: ['read', 'create'], scopes: ['own']},
    PARENT: {actions: ['read'], scopes: ['child']},
    COACH: {actions: ['read', 'create', 'update'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read', 'update'], scopes: ['team']},
    ADVISOR: {actions: ['read'], scopes: ['assigned']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['agg']},
  },
  report: {
    STUDENT: {actions: ['read'], scopes: ['own']},
    PARENT: {actions: ['read', 'export'], scopes: ['child']},
    TEACHER: {actions: ['read'], scopes: ['class']},
    COACH: {actions: ['read', 'create', 'update'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read', 'update', 'approve'], scopes: ['team']},
    ADVISOR: {actions: ['read', 'create', 'update'], scopes: ['assigned']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
    SPECIALIST: {actions: ['read'], scopes: ['referred']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['agg']},
  },
  output_dossier: {
    STUDENT: {actions: ['read'], scopes: ['own']},
    PARENT: {actions: ['read', 'export'], scopes: ['child']},
    COACH: {actions: ['read'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read', 'approve'], scopes: ['team']},
    ADVISOR: {actions: ['read', 'create', 'update'], scopes: ['assigned']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
    SPECIALIST: {actions: ['read'], scopes: ['referred']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['agg']},
  },
  alert: {
    STUDENT: {actions: ['read'], scopes: ['own']},
    PARENT: {actions: ['read'], scopes: ['child']},
    COACH: {actions: ['read', 'update'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read', 'update'], scopes: ['team']},
    ADVISOR: {actions: ['read'], scopes: ['assigned']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
    CSO: {actions: ['read'], scopes: ['org']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['agg']},
  },

  // ---------- Nhóm D · Nhạy cảm đặc biệt (P3) ----------
  // SUPER_ADMIN và SYSTEM_ADMIN cố tình KHÔNG có mặt. Bất biến BB-01, BB-02, BB-03.
  health_record: {
    STUDENT: {actions: ['read'], scopes: ['own']},
    PARENT: {actions: ['read', 'create', 'update'], scopes: ['child']},
    COUNSELOR: {actions: ['read'], scopes: ['referred']},
    SPECIALIST: {actions: ['read'], scopes: ['referred']},
    CSO: {actions: ['read'], scopes: ['org']},
  },
  counseling_record: {
    COUNSELOR: {actions: ['read', 'create', 'update'], scopes: ['referred']},
    SPECIALIST: {actions: ['read'], scopes: ['referred']},
  },
  safeguarding_report: {
    CSO: {actions: ['read', 'create', 'update'], scopes: ['org']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['org']},
  },
  referral: {
    PARENT: {actions: ['read'], scopes: ['child']},
    COACH: {actions: ['read'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read', 'approve'], scopes: ['team']},
    ADVISOR: {actions: ['read', 'create'], scopes: ['assigned']},
    COUNSELOR: {actions: ['read', 'create'], scopes: ['referred']},
    SPECIALIST: {actions: ['read'], scopes: ['referred']},
    CSO: {actions: ['read'], scopes: ['org']},
    EXEC_DIRECTOR: {actions: ['read', 'approve'], scopes: ['org']},
  },

  // ---------- Nhóm E · Thư viện chuyên môn (P1) ----------
  problem_library: {
    TEACHER: {actions: ['read'], scopes: ['org']},
    COACH: {actions: ['read'], scopes: ['org']},
    HEAD_COACH: {actions: ['read', 'update'], scopes: ['org']},
    ADVISOR: {actions: ['read', 'update'], scopes: ['org']},
    COUNSELOR: {actions: ['read'], scopes: ['org']},
    SPECIALIST: {actions: ['read'], scopes: ['org']},
    PRODUCT_ADMIN: {actions: ['read'], scopes: ['org']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['org']},
  },
  solution_library: {
    TEACHER: {actions: ['read'], scopes: ['org']},
    COACH: {actions: ['read'], scopes: ['org']},
    HEAD_COACH: {actions: ['read', 'update'], scopes: ['org']},
    ADVISOR: {actions: ['read', 'update'], scopes: ['org']},
    COUNSELOR: {actions: ['read'], scopes: ['org']},
    SPECIALIST: {actions: ['read'], scopes: ['org']},
    PRODUCT_ADMIN: {actions: ['read'], scopes: ['org']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['org']},
  },
  activity_library: {
    TEACHER: {actions: ['read'], scopes: ['org']},
    COACH: {actions: ['read'], scopes: ['org']},
    HEAD_COACH: {actions: [...A_ALL, 'approve'], scopes: ['org']},
    ADVISOR: {actions: ['read'], scopes: ['org']},
    COUNSELOR: {actions: ['read'], scopes: ['org']},
    // Chú thích ¹² — CSO phê duyệt về mặt an toàn trẻ em.
    CSO: {actions: ['approve'], scopes: ['org']},
    PRODUCT_ADMIN: {actions: ['read'], scopes: ['org']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['org']},
  },
  lesson_plan: {
    TEACHER: {actions: ['read', 'create', 'update'], scopes: ['own']},
    HEAD_COACH: {actions: ['read', 'approve'], scopes: ['org']},
    PRODUCT_ADMIN: {actions: ['read'], scopes: ['org']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['org']},
  },
  form_template: {
    STUDENT: {actions: ['read'], scopes: ['org']},
    PARENT: {actions: ['read'], scopes: ['org']},
    TEACHER: {actions: ['read'], scopes: ['org']},
    COACH: {actions: ['read'], scopes: ['org']},
    HEAD_COACH: {actions: ['read'], scopes: ['org']},
    ADVISOR: {actions: ['read'], scopes: ['org']},
    COUNSELOR: {actions: ['read'], scopes: ['org']},
    SPECIALIST: {actions: ['read'], scopes: ['org']},
    CSO: {actions: ['read'], scopes: ['org']},
    PRODUCT_ADMIN: {actions: [...A_ALL, 'publish'], scopes: ['org']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['org']},
  },

  // ---------- Nhóm F · Quản trị ----------
  user_account: {
    STUDENT: {actions: ['read', 'update'], scopes: ['own']},
    PARENT: {actions: ['read', 'update'], scopes: ['own']},
    TEACHER: {actions: ['read', 'update'], scopes: ['own']},
    COACH: {actions: ['read', 'update'], scopes: ['own']},
    HEAD_COACH: {actions: ['read', 'update'], scopes: ['own']},
    ADVISOR: {actions: ['read', 'update'], scopes: ['own']},
    COUNSELOR: {actions: ['read', 'update'], scopes: ['own']},
    SPECIALIST: {actions: ['read', 'update'], scopes: ['own']},
    CSO: {actions: ['read', 'update'], scopes: ['own']},
    PRODUCT_ADMIN: {actions: ['read', 'update'], scopes: ['own']},
    SYSTEM_ADMIN: {actions: ['read'], scopes: ['org']},
    SUPER_ADMIN: {actions: A_ALL, scopes: ['org']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['org']},
  },
  role_assignment: {
    // Chú thích ¹⁴ — bốn mắt: Super Admin đề xuất, Giám đốc điều hành phê duyệt.
    SUPER_ADMIN: {actions: ['create', 'update'], scopes: ['org']},
    EXEC_DIRECTOR: {actions: ['approve'], scopes: ['org']},
  },
  product_config: {
    PRODUCT_ADMIN: {actions: [...A_ALL, 'publish'], scopes: ['org']},
    EXEC_DIRECTOR: {actions: ['read', 'approve'], scopes: ['org']},
  },
  billing: {
    STUDENT: {actions: ['read'], scopes: ['own']},
    PARENT: {actions: ['read', 'export'], scopes: ['own']},
    ADVISOR: {actions: ['read'], scopes: ['assigned']},
    PRODUCT_ADMIN: {actions: ['read'], scopes: ['org']},
    EXEC_DIRECTOR: {actions: ['read', 'export'], scopes: ['org']},
  },
  system_config: {
    SYSTEM_ADMIN: {actions: ['read', 'create', 'update'], scopes: ['org']},
    SUPER_ADMIN: {actions: ['read', 'create', 'update'], scopes: ['org']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['org']},
  },
  audit_log: {
    // Chú thích ¹⁶ — đọc được nhưng không sửa, không xoá.
    CSO: {actions: ['read'], scopes: ['org']},
    SYSTEM_ADMIN: {actions: ['read'], scopes: ['org']},
    SUPER_ADMIN: {actions: ['read'], scopes: ['org']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['org']},
  },
  analytics_aggregate: {
    TEACHER: {actions: ['read'], scopes: ['class']},
    COACH: {actions: ['read'], scopes: ['assigned']},
    HEAD_COACH: {actions: ['read'], scopes: ['team']},
    ADVISOR: {actions: ['read'], scopes: ['org']},
    COUNSELOR: {actions: ['read'], scopes: ['agg']},
    CSO: {actions: ['read'], scopes: ['agg']},
    PRODUCT_ADMIN: {actions: ['read'], scopes: ['agg']},
    EXEC_DIRECTOR: {actions: ['read'], scopes: ['org']},
  },
};

/**
 * Danh sách trắng cho dữ liệu P3. Vai trò không có trong danh sách này
 * KHÔNG BAO GIỜ chạm được P3, kể cả khi ma trận POLICY có cấp quyền.
 * Bất biến BB-01, BB-02, BB-03.
 */
export const P3_ALLOWLIST: Partial<Record<ResourceType, RoleCode[]>> = {
  health_record: ['STUDENT', 'PARENT', 'COUNSELOR', 'SPECIALIST', 'CSO'],
  counseling_record: ['COUNSELOR', 'SPECIALIST'],
  safeguarding_report: ['CSO', 'EXEC_DIRECTOR'],
  reflection_flagged: ['STUDENT', 'COUNSELOR', 'CSO'],
};

/**
 * Cổng cấp độ năng lực học viên: (tài nguyên, hành động) -> cấp tối thiểu.
 * Chỉ áp dụng với vai trò STUDENT trên hồ sơ của chính mình.
 */
export const LEVEL_GATES: Array<{
  resource: ResourceType;
  actions: Action[];
  minLevel: LevelTier;
}> = [
  {resource: 'task', actions: ['update'], minLevel: 2},
  {resource: 'goal', actions: ['create', 'update'], minLevel: 3},
  {resource: 'habit', actions: ['create', 'update'], minLevel: 3},
  {resource: 'evidence', actions: ['create'], minLevel: 4},
  {resource: 'coaching_session', actions: ['create'], minLevel: 4},
  {resource: 'portfolio', actions: ['create', 'update', 'export'], minLevel: 5},
];

const TIER_ORDER: ServiceTier[] = ['G1', 'G2', 'G2_5', 'G3', 'G4', 'G5'];

/** Cổng gói dịch vụ: tài nguyên -> gói tối thiểu của gia đình. */
export const SERVICE_GATES: Partial<Record<ResourceType, ServiceTier>> = {
  result: 'G2',
  competency: 'G2',
  output_dossier: 'G2',
  goal: 'G2',
  roadmap: 'G2_5',
  coaching_session: 'G2_5',
  problem_library: 'G2_5',
  solution_library: 'G2_5',
  portfolio: 'G4',
  referral: 'G4',
};

export function tierAtLeast(actual: ServiceTier, required: ServiceTier): boolean {
  return TIER_ORDER.indexOf(actual) >= TIER_ORDER.indexOf(required);
}
