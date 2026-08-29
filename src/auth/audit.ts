/**
 * Hợp đồng nhật ký kiểm toán.
 * Bất biến BB-08: mọi lần truy cập dữ liệu P2 và P3 đều phải ghi lại, kể cả lần hợp lệ.
 *
 * Yêu cầu triển khai thật:
 *  - Kho lưu CHỈ GHI THÊM (append-only), tách khỏi cơ sở dữ liệu nghiệp vụ.
 *  - Không vai trò nào sửa hoặc xoá được bản ghi, kể cả SUPER_ADMIN.
 *  - Lưu tối thiểu 5 năm.
 */
import type {Action, Decision, Resource, Subject} from './types.ts';

export interface AuditEntry {
  at: string;
  actorId: string;
  actorRoles: string[];
  action: Action;
  resourceType: string;
  resourceId: string;
  sensitivity: string;
  /** Chủ thể dữ liệu — dùng để trả lời "ai đã xem hồ sơ của con tôi". */
  subjectOfDataId?: string;
  allowed: boolean;
  reason: string;
  viaBreakGlass: boolean;
}

export interface AuditSink {
  write(entry: AuditEntry): void;
}

/** Bộ ghi trong bộ nhớ — CHỈ dùng cho kiểm thử. */
export class InMemoryAuditSink implements AuditSink {
  entries: AuditEntry[] = [];
  write(entry: AuditEntry): void {
    this.entries.push(entry);
  }
  clear(): void {
    this.entries = [];
  }
}

/** Bộ ghi mặc định khi chưa cấu hình — cố tình gây lỗi to để không ai quên cấu hình. */
export class UnconfiguredAuditSink implements AuditSink {
  write(): void {
    throw new Error(
      '[an ninh] Chưa cấu hình AuditSink. Không được phép truy cập dữ liệu P2/P3 khi ' +
        'nhật ký kiểm toán chưa hoạt động. Xem docs/an-toan-va-phan-quyen/04-kiem-soat-an-ninh.md §C1.',
    );
  }
}

export function buildAuditEntry(
  subject: Subject,
  action: Action,
  resource: Resource,
  decision: Decision,
  now: Date,
): AuditEntry {
  return {
    at: now.toISOString(),
    actorId: subject.id,
    actorRoles: [...subject.roles],
    action,
    resourceType: resource.type,
    resourceId: resource.id,
    sensitivity: resource.sensitivity,
    subjectOfDataId: resource.ownerId,
    allowed: decision.allow,
    reason: decision.reason,
    viaBreakGlass: decision.viaBreakGlass === true,
  };
}
