import { describe, expect, it } from 'vitest';
import { PERMISSIONS, ROLES } from '../src/data/roles';
import { can, lockReason, maxRank, permissionsOf, studentRankForLevel } from '../src/lib/permissions';
import type { Permission } from '../src/types';

describe('phân quyền', () => {
  it('quyền cộng dồn theo bậc: lên bậc không bao giờ mất quyền', () => {
    for (const role of ROLES) {
      let previous = new Set<Permission>();
      for (const rank of role.ranks) {
        const current = permissionsOf({ role: role.id, rank: rank.rank, level: 1 });
        for (const permission of previous) {
          expect(current.has(permission), `${role.id} bậc ${rank.rank} mất quyền ${permission}`).toBe(true);
        }
        previous = current;
      }
    }
  });

  it('Super Admin có toàn bộ quyền', () => {
    const admin = permissionsOf({ role: 'superAdmin', rank: 1, level: 1 });
    expect(admin.size).toBe(PERMISSIONS.length);
  });

  it('không vai trò nào ngoài Super Admin giữ toàn quyền', () => {
    // Mot tai khoan bi chiem doat khong duoc phep keo theo ca he thong.
    for (const role of ROLES) {
      if (role.id === 'superAdmin') continue;
      const all = permissionsOf({ role: role.id, rank: role.ranks.length, level: 6 });
      expect(all.size, role.id).toBeLessThan(PERMISSIONS.length);
    }
  });

  it('quyền nguy hiểm chỉ thuộc về Super Admin', () => {
    const owners = ROLES.filter((role) =>
      can({ role: role.id, rank: role.ranks.length, level: 6 }, 'system.danger'),
    ).map((r) => r.id);
    expect(owners).toEqual(['superAdmin']);
  });

  it('admin hệ thống không sửa được nội dung, admin sản phẩm không tạo được tài khoản', () => {
    // Tach nhiem vu: nguoi giu chia khoa khong dong thoi la nguoi cham bai.
    const sys = { role: 'sysAdmin' as const, rank: maxRank('sysAdmin'), level: 6 };
    expect(can(sys, 'content.author')).toBe(false);
    expect(can(sys, 'content.curriculum')).toBe(false);
    expect(can(sys, 'class.approveLevel')).toBe(false);
    expect(can(sys, 'system.users')).toBe(true);

    const product = { role: 'productAdmin' as const, rank: maxRank('productAdmin'), level: 6 };
    expect(can(product, 'system.users')).toBe(false);
    expect(can(product, 'system.roles')).toBe(false);
    expect(can(product, 'content.publish')).toBe(true);
  });

  it('giám đốc điều hành chỉ đọc, không có bất kỳ quyền ghi nào', () => {
    const readOnly: readonly Permission[] = [
      'class.viewAll',
      'report.org',
      'report.quality',
      'system.audit',
      'system.export',
    ];
    const granted = permissionsOf({ role: 'executive', rank: 1, level: 6 });
    expect([...granted].sort()).toEqual([...readOnly].sort());
  });

  it('tư vấn đọc được hồ sơ nhưng không chấm bài, không sửa nội dung', () => {
    const actor = { role: 'consultant' as const, rank: maxRank('consultant'), level: 6 };
    expect(can(actor, 'consult.profile')).toBe(true);
    expect(can(actor, 'consult.roadmap')).toBe(true);
    expect(can(actor, 'class.comment')).toBe(false);
    expect(can(actor, 'content.author')).toBe(false);
  });

  it('coach giữ trục thói quen và huấn luyện, không giữ trục nội dung', () => {
    const actor = { role: 'coach' as const, rank: maxRank('coach'), level: 6 };
    expect(can(actor, 'coach.session')).toBe(true);
    expect(can(actor, 'coach.habit')).toBe(true);
    expect(can(actor, 'coach.plan')).toBe(true);
    expect(can(actor, 'content.curriculum')).toBe(false);
  });

  it('học viên mới chưa mở đề full 3 phần', () => {
    const actor = { role: 'student' as const, rank: 1, level: 1 };
    expect(can(actor, 'learn.mockFull')).toBe(false);
    expect(can(actor, 'learn.worksheet')).toBe(true);
  });

  it('học viên lên cấp thì tự mở thêm tính năng', () => {
    expect(can({ role: 'student', rank: 1, level: 3 }, 'learn.mock')).toBe(true);
    expect(can({ role: 'student', rank: 1, level: 3 }, 'learn.aiTutor')).toBe(true);
    expect(can({ role: 'student', rank: 1, level: 5 }, 'learn.mockFull')).toBe(true);
    expect(can({ role: 'student', rank: 1, level: 6 }, 'learn.skipLevel')).toBe(true);
  });

  it('cấp độ học không mở quyền quản lý lớp', () => {
    expect(can({ role: 'student', rank: 3, level: 6 }, 'class.assign')).toBe(false);
    expect(can({ role: 'student', rank: 3, level: 6 }, 'content.author')).toBe(false);
  });

  it('duyệt chuyển giai đoạn chỉ dành cho giáo viên bậc cao trở lên', () => {
    expect(can({ role: 'teacher', rank: 1, level: 1 }, 'class.approveStage')).toBe(false);
    expect(can({ role: 'teacher', rank: 3, level: 1 }, 'class.approveStage')).toBe(true);
    expect(can({ role: 'headTeacher', rank: 1, level: 1 }, 'class.approveStage')).toBe(true);
  });

  it('trợ giảng không bao giờ sửa được khung chương trình', () => {
    for (let rank = 1; rank <= maxRank('mentor'); rank += 1) {
      expect(can({ role: 'mentor', rank, level: 6 }, 'content.curriculum')).toBe(false);
    }
  });

  it('mọi quyền bị khóa đều giải thích được cách mở', () => {
    const actor = { role: 'student' as const, rank: 1, level: 1 };
    for (const permission of PERMISSIONS) {
      const reason = lockReason(actor, permission.id);
      if (can(actor, permission.id)) expect(reason).toBeNull();
      else expect(reason && reason.length > 10).toBe(true);
    }
  });

  it('bậc học viên suy ra đúng từ cấp độ', () => {
    expect(studentRankForLevel(1)).toBe(1);
    expect(studentRankForLevel(3)).toBe(2);
    expect(studentRankForLevel(6)).toBe(3);
  });

  it('mọi quyền trong danh mục đều được ít nhất một vai trò sử dụng', () => {
    for (const permission of PERMISSIONS) {
      const owners = ROLES.filter((role) =>
        can({ role: role.id, rank: role.ranks.length, level: 6 }, permission.id),
      );
      expect(owners.length, permission.id).toBeGreaterThan(0);
    }
  });
});
