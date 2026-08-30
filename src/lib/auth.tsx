import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Grade, Role, User } from '@/types';
import { findUserByEmail, getSessionUserId, getUser, getUsers, hashPass, saveUsers, setSessionUserId, uid, upsertUser } from '@/lib/store';

/* =====================================================================
   MATHGITA — XÁC THỰC & PHÂN QUYỀN
   ===================================================================== */

export const ROLE_LABEL: Record<Role, string> = {
  guest: 'Khách',
  student_free: 'Học sinh ngoài',
  student_gita: 'Học sinh GITA',
  teacher: 'Giáo viên GITA',
  admin: 'Quản trị viên',
};

export const ROLE_DESC: Record<Role, string> = {
  guest: 'Xem giới thiệu và học thử một phần lý thuyết.',
  student_free: 'Học miễn phí phần Nền tảng: lý thuyết, dạng bài mức Nhận biết – Thông hiểu và 3 đề luyện mỗi khối.',
  student_gita: 'Toàn quyền học liệu GITA: vận dụng cao, 100 đề/khối, đề cương, HSG, cẩm nang điểm 10, nhiệm vụ về nhà và báo cáo tiến bộ.',
  teacher: 'Toàn quyền học liệu, giao nhiệm vụ về nhà, theo dõi và nhận xét kết quả cả lớp.',
  admin: 'Quản trị tài khoản, lớp học, gói học phí và toàn bộ hệ thống.',
};

/** Bộ quyền suy ra từ vai trò + trạng thái đóng phí. */
export interface Perms {
  role: Role;
  isStaff: boolean;          // giáo viên hoặc quản trị
  isPaid: boolean;           // học sinh GITA còn hạn / giáo viên / quản trị
  canPremiumTopic: boolean;  // chuyên đề nâng cao - chuyên - CLC
  canVDC: boolean;           // bài vận dụng cao & lời giải nâng cao
  canHSG: boolean;           // chuyên đề & đề thi học sinh giỏi
  canDeCuong: boolean;       // đề cương giữa kỳ / cuối kỳ / cả năm / ôn hè
  canFullFormula: boolean;   // toàn bộ Cẩm nang công thức điểm 10
  canAssign: boolean;        // giao nhiệm vụ về nhà
  canManageUsers: boolean;
  canClassReport: boolean;
  /** Số đề luyện tối đa được mở trong mỗi khối (Infinity = không giới hạn) */
  examQuota: number;
}

export function permsOf(u: User | null): Perms {
  const role: Role = u?.role ?? 'guest';
  const paidValid = role === 'student_gita' ? (u?.paidUntil ?? 0) > Date.now() : false;
  const isStaff = role === 'teacher' || role === 'admin';
  const isPaid = paidValid || isStaff;
  return {
    role,
    isStaff,
    isPaid,
    canPremiumTopic: isPaid,
    canVDC: isPaid,
    canHSG: isPaid,
    canDeCuong: isPaid,
    canFullFormula: isPaid,
    canAssign: isStaff,
    canManageUsers: role === 'admin',
    canClassReport: isStaff,
    examQuota: isPaid ? Number.POSITIVE_INFINITY : role === 'student_free' ? 3 : 1,
  };
}

/** Thông điệp giải thích khi nội dung bị khoá. */
export function lockReason(p: Perms): string {
  if (p.role === 'guest') return 'Đăng nhập tài khoản học sinh để mở nội dung này.';
  if (p.role === 'student_free') return 'Nội dung dành cho học sinh đang học tại GITA. Liên hệ trung tâm để kích hoạt gói học.';
  return 'Gói học của bạn đã hết hạn. Vui lòng gia hạn để tiếp tục.';
}

/* ---------------------------- CONTEXT ---------------------------- */

interface AuthCtx {
  user: User | null;
  perms: Perms;
  ready: boolean;
  login: (email: string, pass: string) => Promise<string | null>;
  register: (data: { name: string; email: string; pass: string; grade: Grade }) => Promise<string | null>;
  logout: () => void;
  refresh: () => void;
  demoLogin: (role: Role) => void;
}

const Ctx = createContext<AuthCtx | null>(null);

const AVATAR_COLORS = ['#0b3d91', '#0d8f7d', '#d99408', '#6c3fc4', '#cf2f2f', '#1552b8'];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    const id = getSessionUserId();
    setUser(id ? getUser(id) ?? null : null);
  }, []);

  useEffect(() => { refresh(); setReady(true); }, [refresh]);

  const login = useCallback(async (email: string, pass: string) => {
    const u = findUserByEmail(email);
    if (!u) return 'Không tìm thấy tài khoản với email này.';
    const h = await hashPass(pass);
    if (h !== u.passHash) return 'Mật khẩu chưa đúng. Bạn kiểm tra lại nhé.';
    setSessionUserId(u.id);
    setUser(u);
    return null;
  }, []);

  const register = useCallback(async (d: { name: string; email: string; pass: string; grade: Grade }) => {
    if (!d.name.trim()) return 'Bạn hãy nhập họ tên.';
    if (!/^\S+@\S+\.\S+$/.test(d.email)) return 'Email chưa hợp lệ.';
    if (d.pass.length < 6) return 'Mật khẩu cần tối thiểu 6 ký tự.';
    if (findUserByEmail(d.email)) return 'Email này đã được đăng ký.';
    const u: User = {
      id: uid('u'),
      name: d.name.trim(),
      email: d.email.trim().toLowerCase(),
      passHash: await hashPass(d.pass),
      role: 'student_free',
      grade: d.grade,
      createdAt: Date.now(),
      avatarColor: AVATAR_COLORS[getUsers().length % AVATAR_COLORS.length],
    };
    upsertUser(u);
    setSessionUserId(u.id);
    setUser(u);
    return null;
  }, []);

  const logout = useCallback(() => { setSessionUserId(null); setUser(null); }, []);

  const demoLogin = useCallback((role: Role) => {
    const u = getUsers().find((x) => x.role === role);
    if (u) { setSessionUserId(u.id); setUser(u); }
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({ user, perms: permsOf(user), ready, login, register, logout, refresh, demoLogin }),
    [user, ready, login, register, logout, refresh, demoLogin]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export function useAuth(): AuthCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAuth phải nằm trong <AuthProvider>');
  return c;
}

/* ------------------------ TÀI KHOẢN MẪU ------------------------ */

const YEAR = 365 * 24 * 3600 * 1000;

/** Khởi tạo dữ liệu tài khoản demo trong lần chạy đầu tiên. */
export async function seedAccounts(): Promise<void> {
  if (getUsers().length) return;
  const mk = async (name: string, email: string, role: Role, grade: Grade, i: number, classId?: string): Promise<User> => ({
    id: `u_seed_${i}`,
    name, email,
    passHash: await hashPass('gita2026'),
    role, grade, classId,
    paidUntil: role === 'student_gita' ? Date.now() + YEAR : undefined,
    createdAt: Date.now() - i * 86400000,
    avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
  });
  const users: User[] = [
    await mk('Thầy Trương Nhật Quang', 'teacher@gita.edu.vn', 'teacher', 9, 0),
    await mk('Quản trị MATHGITA', 'admin@gita.edu.vn', 'admin', 9, 1),
    await mk('Nguyễn Minh An', 'hs6@gita.edu.vn', 'student_gita', 6, 2, 'c_6clc'),
    await mk('Trần Bảo Châu', 'hs7@gita.edu.vn', 'student_gita', 7, 3, 'c_7clc'),
    await mk('Lê Gia Huy', 'hs8@gita.edu.vn', 'student_gita', 8, 4, 'c_8clc'),
    await mk('Phạm Thu Hà', 'hs9@gita.edu.vn', 'student_gita', 9, 5, 'c_9clc'),
    await mk('Học sinh trải nghiệm', 'free@gita.edu.vn', 'student_free', 6, 6),
  ];
  saveUsers(users);
}
