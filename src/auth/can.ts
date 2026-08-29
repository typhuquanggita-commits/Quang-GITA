/**
 * Hàm quyết định phân quyền GITA 365.
 * Thuật toán: docs/an-toan-va-phan-quyen/01-mo-hinh-phan-quyen.md §7
 *
 * BA NGUYÊN TẮC:
 *   1. Mặc định TỪ CHỐI — không có quy tắc cho phép thì từ chối.
 *   2. TỪ CHỐI THẮNG cho phép — chỉ cần một bước từ chối là kết quả cuối là từ chối.
 *   3. Lý do từ chối KHÔNG tiết lộ thông tin — mã lý do chỉ dùng cho nhật ký nội bộ.
 */
import {
  LEVEL_GATES,
  P3_ALLOWLIST,
  POLICY,
  SERVICE_GATES,
  tierAtLeast,
} from './policy.ts';
import type {
  Action,
  Decision,
  DecisionContext,
  Resource,
  Scope,
  Subject,
} from './types.ts';
import {buildAuditEntry, UnconfiguredAuditSink} from './audit.ts';
import type {AuditSink} from './audit.ts';

/** Tuổi từ đó học viên được quyền riêng tư với nhật ký phản tư. Bất biến BB-04. */
export const PRIVACY_AGE = 12;

/** Hành động bị chặn khi hồ sơ đang bị lưu giữ pháp lý. */
const LEGAL_HOLD_BLOCKED: Action[] = ['delete', 'export'];

/** Vai trò nhân sự — phải ký cam kết bảo mật mới được truy cập. */
const STAFF_ROLES = new Set([
  'TEACHER',
  'COACH',
  'HEAD_COACH',
  'ADVISOR',
  'COUNSELOR',
  'SPECIALIST',
  'CSO',
  'PRODUCT_ADMIN',
  'SYSTEM_ADMIN',
  'SUPER_ADMIN',
  'EXEC_DIRECTOR',
]);

function isActive(rel: {validFrom: string; validTo?: string}, now: Date): boolean {
  const from = new Date(rel.validFrom).getTime();
  if (Number.isNaN(from) || from > now.getTime()) return false;
  if (!rel.validTo) return true;
  const to = new Date(rel.validTo).getTime();
  return !Number.isNaN(to) && to > now.getTime();
}

/**
 * Phạm vi quan hệ mà chủ thể thực sự có với hồ sơ này, tại thời điểm now.
 * Quan hệ hết hiệu lực KHÔNG sinh ra phạm vi — đây là cơ chế thực thi việc
 * thu hồi quyền tự động (biện pháp A6).
 */
export function resolveScopes(
  subject: Subject,
  resource: Resource,
  now: Date,
): Set<Scope> {
  const scopes = new Set<Scope>();

  if (resource.ownerId && resource.ownerId === subject.id) scopes.add('own');
  // Tài nguyên cấp tổ chức: ai cũng "sở hữu" hồ sơ tài khoản của chính mình.
  if (!resource.ownerId && resource.type === 'user_account' && resource.id === subject.id) {
    scopes.add('own');
  }

  for (const rel of subject.relationships) {
    if (!isActive(rel, now)) continue;
    if (rel.kind === 'org') {
      scopes.add('org');
      continue;
    }
    // Phạm vi 'agg' CHỈ áp dụng cho dữ liệu tổng hợp không gắn với cá nhân nào.
    // Hồ sơ cá nhân không bao giờ thoả 'agg' — bất biến BB-07.
    if (rel.kind === 'agg') {
      if (!resource.ownerId) scopes.add('agg');
      continue;
    }
    if (rel.kind === 'class') {
      if (resource.classId && rel.targetId === resource.classId) scopes.add('class');
      continue;
    }
    if (resource.ownerId && rel.targetId === resource.ownerId) scopes.add(rel.kind);
  }
  return scopes;
}

function findBreakGlass(subject: Subject, resource: Resource, now: Date) {
  return (subject.breakGlass ?? []).find(
    (g) =>
      g.resourceType === resource.type &&
      g.resourceId === resource.id &&
      // Không tự phê duyệt cho chính mình.
      g.approvedBy !== g.requestedBy &&
      g.requestedBy === subject.id &&
      new Date(g.expiresAt).getTime() > now.getTime(),
  );
}

function deny(reason: string): Decision {
  return {allow: false, reason, audit: false};
}

export interface CanOptions {
  auditSink?: AuditSink;
}

const defaultSink = new UnconfiguredAuditSink();

/** Quyết định chính. Trả về {allow, reason, audit}. */
export function can(
  subject: Subject,
  action: Action,
  resource: Resource,
  ctx: DecisionContext,
  options: CanOptions = {},
): Decision {
  const decision = evaluate(subject, action, resource, ctx);

  // Bất biến BB-08 — ghi nhật ký mọi truy cập P2/P3, kể cả bị từ chối.
  const mustAudit = resource.sensitivity === 'P2' || resource.sensitivity === 'P3';
  if (mustAudit) {
    const sink = options.auditSink ?? defaultSink;
    sink.write(buildAuditEntry(subject, action, resource, decision, ctx.now));
    decision.audit = true;
  }
  return decision;
}

function evaluate(
  subject: Subject,
  action: Action,
  resource: Resource,
  ctx: DecisionContext,
): Decision {
  const now = ctx.now;

  // Nội dung gắn cờ an toàn tự động nâng lên P3 (TL 03 §2).
  const sensitivity = resource.flaggedSafety ? 'P3' : resource.sensitivity;

  // 1. Trạng thái tài khoản.
  if (subject.status !== 'active') return deny('ACCOUNT_NOT_ACTIVE');
  const isStaff = subject.roles.some((r) => STAFF_ROLES.has(r));
  if (isStaff && !subject.confidentialityAgreementSigned) {
    return deny('CONFIDENTIALITY_AGREEMENT_MISSING');
  }

  // 2. Đồng ý theo mục đích.
  if (ctx.purpose && ctx.consent && ctx.consent[ctx.purpose] === false) {
    return deny('CONSENT_WITHDRAWN');
  }

  // 3. Lưu giữ pháp lý.
  if (resource.legalHold && LEGAL_HOLD_BLOCKED.includes(action)) {
    return deny('LEGAL_HOLD');
  }

  // 9 (kiểm sớm). Break-glass: đường riêng, bỏ qua bước 4–8 nhưng vẫn ghi nhật ký.
  const grant = findBreakGlass(subject, resource, now);
  if (grant && action === 'read') {
    return {allow: true, reason: 'BREAK_GLASS', audit: true, viaBreakGlass: true};
  }

  // 4. Ma trận vai trò.
  const resourcePolicy = POLICY[resource.type];
  if (!resourcePolicy) return deny('NO_POLICY_FOR_RESOURCE');

  const scopes = resolveScopes(subject, resource, now);
  let matched = false;
  let scopeOk = false;

  for (const role of subject.roles) {
    const g = resourcePolicy[role];
    if (!g || !g.actions.includes(action)) continue;
    matched = true;

    // 5. Phạm vi quan hệ.
    if (!g.scopes.some((s) => scopes.has(s))) continue;
    scopeOk = true;

    // 6. Mức nhạy cảm — danh sách trắng P3.
    if (sensitivity === 'P3') {
      const allow = P3_ALLOWLIST[resource.type];
      if (!allow || !allow.includes(role)) return deny('P3_ROLE_NOT_ALLOWLISTED');
    }

    // 6b. Quyền riêng tư nhật ký phản tư — bất biến BB-04.
    if (
      resource.type === 'reflection' &&
      resource.privateToStudent === true &&
      (resource.ownerAgeYears ?? 0) >= PRIVACY_AGE &&
      role !== 'STUDENT' &&
      role !== 'COUNSELOR'
    ) {
      return deny('REFLECTION_PRIVATE');
    }

    // 7. Cổng cấp độ năng lực học viên.
    if (role === 'STUDENT') {
      const gate = LEVEL_GATES.find(
        (x) => x.resource === resource.type && x.actions.includes(action),
      );
      if (gate && (subject.studentLevel ?? 1) < gate.minLevel) {
        return deny('STUDENT_LEVEL_TOO_LOW');
      }
    }

    // 8. Cổng gói dịch vụ.
    const required = SERVICE_GATES[resource.type];
    if (required && resource.servicePackage && !tierAtLeast(resource.servicePackage, required)) {
      return deny('SERVICE_TIER_TOO_LOW');
    }

    return {allow: true, reason: 'ALLOWED_BY_POLICY', audit: false};
  }

  if (!matched) return deny('ROLE_HAS_NO_GRANT');
  if (!scopeOk) return deny('OUT_OF_SCOPE');
  return deny('DENIED');
}

/**
 * Bộ lọc dùng cho truy vấn danh sách. KHÔNG BAO GIỜ lấy hết rồi lọc ở giao diện —
 * dữ liệu đã rời máy chủ là đã rò rỉ.
 */
export function filterReadable<T extends Resource>(
  subject: Subject,
  resources: T[],
  ctx: DecisionContext,
  options: CanOptions = {},
): T[] {
  return resources.filter((r) => can(subject, 'read', r, ctx, options).allow);
}
