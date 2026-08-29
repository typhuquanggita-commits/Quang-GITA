import { MAX_LEVEL } from '../data/curriculum';
import { PERMISSIONS, ROLE_BY_ID, ROLES, STUDENT_LEVEL_GRANTS } from '../data/roles';
import type { PersistedState, Permission, Profile, Role } from '../types';

/**
 * Kiem tra quyen.
 *
 * Nguyen tac: TOAN BO cau tra loi "duoc hay khong" deu di qua ham `can` o day.
 * Khong noi nao trong giao dien duoc tu suy luan bang cach so sanh vai tro —
 * lam vay se tao ra hang chuc ban sao cua cung mot luat, va den luc doi luat
 * thi chac chan bo sot mot cho.
 */

export interface Actor {
  role: Role;
  rank: number;
  /** Cap do hoc cao nhat dat duoc, dung de mo dan tinh nang cho hoc vien. */
  level: number;
}

export function actorOf(state: PersistedState): Actor {
  return {
    role: state.profile.role,
    rank: state.profile.rank,
    level: highestLevel(state),
  };
}

/** Cap do cao nhat ma nguoi hoc dat duoc tren bat ky tuyen nao. */
export function highestLevel(state: PersistedState): number {
  const levels = Object.values(state.tracks).map((t) => t.level);
  return levels.length === 0 ? 1 : Math.min(MAX_LEVEL, Math.max(...levels));
}

/** Toan bo quyen cua mot chu the, da cong don theo bac va cap do. */
export function permissionsOf(actor: Actor): Set<Permission> {
  const spec = ROLE_BY_ID.get(actor.role);
  if (!spec) return new Set();

  const granted = new Set<Permission>(spec.base);

  // Quyen cong don: moi bac tu 1 den bac hien tai deu duoc ap dung.
  for (const rank of spec.ranks) {
    if (rank.rank <= actor.rank) for (const permission of rank.grants) granted.add(permission);
  }

  // Rieng hoc vien: mot so tinh nang chi mo khi da len du cap do.
  if (actor.role === 'student') {
    for (const gate of STUDENT_LEVEL_GRANTS) {
      if (actor.level >= gate.level) for (const permission of gate.grants) granted.add(permission);
    }
  }

  return granted;
}

export function can(actor: Actor, permission: Permission): boolean {
  return permissionsOf(actor).has(permission);
}

/**
 * Vi sao mot quyen dang bi khoa. Thong bao "ban khong co quyen" ma khong noi
 * ly do la mot trong nhung trai nghiem gay buc boi nhat trong phan mem —
 * ham nay bao dam moi cho khoa deu giai thich duoc cach mo.
 */
export function lockReason(actor: Actor, permission: Permission): string | null {
  if (can(actor, permission)) return null;

  if (actor.role === 'student') {
    const gate = STUDENT_LEVEL_GRANTS.find((g) => g.grants.includes(permission));
    if (gate) {
      return `Mở khóa khi bạn đạt cấp ${gate.level} ở ít nhất một tuyến chuyên đề (hiện tại: cấp ${actor.level}).`;
    }
  }

  const spec = ROLE_BY_ID.get(actor.role);
  const higherRank = spec?.ranks.find((r) => r.rank > actor.rank && r.grants.includes(permission));
  if (higherRank) {
    return `Cần bậc "${higherRank.name}" trở lên trong vai trò ${spec?.name ?? ''}.`;
  }

  const owners = ROLES.filter((role) =>
    can({ role: role.id, rank: role.ranks.length, level: MAX_LEVEL }, permission),
  ).map((role) => role.name);

  return owners.length > 0
    ? `Chỉ các vai trò sau có quyền này: ${owners.join(', ')}.`
    : 'Quyền này chưa được cấp cho vai trò nào.';
}

export function rankName(role: Role, rank: number): string {
  const spec = ROLE_BY_ID.get(role);
  const found = spec?.ranks.find((r) => r.rank === rank) ?? spec?.ranks[0];
  return found?.name ?? spec?.name ?? 'Không xác định';
}

export function maxRank(role: Role): number {
  return ROLE_BY_ID.get(role)?.ranks.length ?? 1;
}

/**
 * Bac tuong ung voi giai doan hoc — dung de tu dong nang bac hoc vien theo tien
 * do thay vi bat giao vien chinh tay tung nguoi.
 */
export function studentRankForLevel(level: number): number {
  if (level >= 5) return 3;
  if (level >= 3) return 2;
  return 1;
}

/** Ho so hop le hoa: chan bac trong khoang cho phep cua vai tro. */
export function normalizeProfile(profile: Profile): Profile {
  const limit = maxRank(profile.role);
  return { ...profile, rank: Math.min(limit, Math.max(1, Math.round(profile.rank) || 1)) };
}

/** Ma tran quyen day du — dung cho man hinh tai lieu phan quyen. */
export function permissionMatrix() {
  return PERMISSIONS.map((permission) => ({
    permission,
    roles: ROLES.map((role) => ({
      role,
      /** Bac thap nhat cua vai tro nay duoc cap quyen; null la khong bao gio. */
      fromRank:
        role.ranks.find((rank) =>
          can({ role: role.id, rank: rank.rank, level: MAX_LEVEL }, permission.id),
        )?.rank ?? null,
    })),
  }));
}
