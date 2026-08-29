/**
 * Kiểu dữ liệu cho hệ phân quyền GITA 365.
 * Đặc tả: docs/an-toan-va-phan-quyen/01-mo-hinh-phan-quyen.md
 */

/** 13 vai trò của hệ thống. */
export type RoleCode =
  | 'STUDENT' // Học sinh
  | 'PARENT' // Phụ huynh
  | 'TEACHER' // Giáo viên
  | 'COACH' // Người huấn luyện
  | 'HEAD_COACH' // Người huấn luyện trưởng
  | 'ADVISOR' // Chuyên viên tư vấn
  | 'COUNSELOR' // Chuyên viên tham vấn tâm lý
  | 'SPECIALIST' // Chuyên gia
  | 'CSO' // Cán bộ Bảo vệ trẻ em
  | 'PRODUCT_ADMIN' // Admin sản phẩm
  | 'SYSTEM_ADMIN' // Admin hệ thống
  | 'SUPER_ADMIN' // Super Admin
  | 'EXEC_DIRECTOR'; // Giám đốc điều hành

export type Action =
  | 'read'
  | 'create'
  | 'update'
  | 'delete'
  | 'export'
  | 'share'
  | 'approve'
  | 'assign'
  | 'publish';

/** Phạm vi quan hệ giữa chủ thể và hồ sơ. */
export type Scope =
  | 'own'
  | 'child'
  | 'assigned'
  | 'team'
  | 'class'
  | 'referred'
  | 'org'
  | 'agg';

/** Mức nhạy cảm dữ liệu. */
export type Sensitivity = 'P0' | 'P1' | 'P2' | 'P3';

/** Cấp độ năng lực học viên, mở dần quyền tự phục vụ. */
export type LevelTier = 1 | 2 | 3 | 4 | 5;

/** Gói dịch vụ của gia đình. */
export type ServiceTier = 'G1' | 'G2' | 'G2_5' | 'G3' | 'G4' | 'G5';

export type ResourceType =
  // Nhóm A — hồ sơ học viên
  | 'profile'
  | 'assessment'
  | 'result'
  | 'competency'
  | 'goal'
  | 'roadmap'
  | 'task'
  | 'habit'
  | 'evidence'
  | 'portfolio'
  // Nhóm B — nhật ký và phản tư
  | 'journal'
  | 'reflection'
  | 'reflection_flagged'
  | 'parent_journal'
  // Nhóm C — huấn luyện và báo cáo
  | 'coaching_session'
  | 'report'
  | 'output_dossier'
  | 'alert'
  // Nhóm D — nhạy cảm đặc biệt
  | 'health_record'
  | 'counseling_record'
  | 'safeguarding_report'
  | 'referral'
  // Nhóm E — thư viện chuyên môn
  | 'problem_library'
  | 'solution_library'
  | 'activity_library'
  | 'lesson_plan'
  | 'form_template'
  // Nhóm F — quản trị
  | 'user_account'
  | 'role_assignment'
  | 'product_config'
  | 'billing'
  | 'system_config'
  | 'audit_log'
  | 'analytics_aggregate';

/** Quan hệ giữa một chủ thể và một học viên, có hiệu lực theo thời gian. */
export interface Relationship {
  kind: Scope;
  /** Học viên mà quan hệ này trỏ tới. Với 'class' thì là classId. */
  targetId: string;
  validFrom: string;
  /** Không có validTo = còn hiệu lực. Có validTo trong quá khứ = đã hết hiệu lực. */
  validTo?: string;
}

/** Phê duyệt truy cập khẩn cấp. */
export interface BreakGlassGrant {
  resourceType: ResourceType;
  resourceId: string;
  reason: string;
  /** Người phê duyệt. BẮT BUỘC khác người yêu cầu. */
  approvedBy: string;
  requestedBy: string;
  expiresAt: string;
}

export interface Subject {
  id: string;
  roles: RoleCode[];
  status: 'active' | 'suspended' | 'expired';
  /** Nhân sự phải ký cam kết bảo mật mới được truy cập P1 trở lên. */
  confidentialityAgreementSigned: boolean;
  /** Chỉ có với vai trò STUDENT. */
  studentLevel?: LevelTier;
  relationships: Relationship[];
  breakGlass?: BreakGlassGrant[];
}

export interface Resource {
  type: ResourceType;
  id: string;
  /** Học viên mà hồ sơ này thuộc về. Rỗng với tài nguyên cấp tổ chức. */
  ownerId?: string;
  sensitivity: Sensitivity;
  classId?: string;
  /** Học viên đã bật chế độ riêng tư cho phản tư. */
  privateToStudent?: boolean;
  /** Nội dung đã gắn cờ an toàn — tự động nâng lên P3. */
  flaggedSafety?: boolean;
  /** Hồ sơ đang bị lưu giữ pháp lý: cấm delete và export. */
  legalHold?: boolean;
  /** Gói dịch vụ của gia đình sở hữu hồ sơ. */
  servicePackage?: ServiceTier;
  ownerAgeYears?: number;
}

export interface DecisionContext {
  now: Date;
  /** Trạng thái đồng ý theo mục đích: purpose -> đã đồng ý hay chưa. */
  consent?: Record<string, boolean>;
  /** Mục đích của lần truy cập này. */
  purpose?: string;
}

export interface Decision {
  allow: boolean;
  /** Mã lý do dùng nội bộ — KHÔNG trả nguyên văn ra giao diện người dùng. */
  reason: string;
  /** Có phải ghi nhật ký kiểm toán không. */
  audit: boolean;
  /** Quyết định này dựa trên break-glass. */
  viaBreakGlass?: boolean;
}
