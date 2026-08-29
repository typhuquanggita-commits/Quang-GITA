import type { AppState } from '@/types';
import { ROLES, roleById, type Permission, type RoleId } from '@/data/roles';

export function currentRole(state: AppState) {
  return roleById((state.account.roleId as RoleId) ?? 'hs-thu');
}

export function can(state: AppState, perm: Permission): boolean {
  return currentRole(state).permissions.includes(perm);
}

export function isTeacher(state: AppState): boolean {
  const g = currentRole(state).group;
  return g === 'giao-vien' || g === 'quan-tri';
}

export function isStudent(state: AppState): boolean {
  return currentRole(state).group === 'hoc-sinh';
}

/** Số phiếu tối đa được mở với vai trò hiện tại (∞ khi có quyền practice.all). */
export function worksheetQuota(state: AppState): number {
  return can(state, 'practice.all') ? Infinity : 20;
}

/**
 * Xét nâng cấp độ học sinh dựa trên kết quả thực tế.
 * Trả về vai trò đề xuất, hoặc null nếu chưa đủ điều kiện.
 */
export function suggestRoleUpgrade(state: AppState): { role: RoleId; reason: string } | null {
  if (!isStudent(state)) return null;
  const role = currentRole(state);
  const passed = new Set(state.attempts.filter((a) => a.passed).map((a) => a.missionId)).size;
  const stageMax = Math.max(state.stageUnlocked.thpt ?? 1, state.stageUnlocked.chuyen ?? 1);

  if (role.id === 'hs-thu' && state.profile) {
    return {
      role: 'hs-chuan',
      reason: 'Đã hoàn thành bài test xếp lộ trình và có lộ trình cá nhân hoá.',
    };
  }
  if (role.id === 'hs-chuan' && passed >= 30 && stageMax >= 3) {
    return {
      role: 'hs-nang-cao',
      reason: `Đã đạt KPI ≥ 90% ở ${passed} nhiệm vụ và mở khoá tới Giai đoạn ${stageMax}.`,
    };
  }
  if (role.id === 'hs-nang-cao' && (state.stageUnlocked.chuyen ?? 1) >= 5 && passed >= 80) {
    return {
      role: 'hs-doi-tuyen',
      reason: 'Đã mở khoá giai đoạn cuối của luồng Chuyên — đủ điều kiện đề cử vào nhóm Đội tuyển.',
    };
  }
  return null;
}

export function applyRole(state: AppState, roleId: RoleId, reason: string): AppState {
  const from = currentRole(state).name;
  return {
    ...state,
    account: {
      ...state.account,
      roleId,
      auditLog: [
        {
          at: new Date().toISOString(),
          action: 'Đổi vai trò',
          detail: `${from} → ${roleById(roleId).name}. Lý do: ${reason}`,
        },
        ...state.account.auditLog,
      ].slice(0, 50),
    },
  };
}

export function logAudit(state: AppState, action: string, detail: string): AppState {
  return {
    ...state,
    account: {
      ...state.account,
      auditLog: [{ at: new Date().toISOString(), action, detail }, ...state.account.auditLog].slice(0, 50),
    },
  };
}

export const ALL_ROLES = ROLES;
