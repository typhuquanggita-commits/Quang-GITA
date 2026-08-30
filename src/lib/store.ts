import type { Assignment, Attempt, ClassRoom, Progress, User } from '@/types';

/* =====================================================================
   MATHGITA — LỚP LƯU TRỮ
   Toàn bộ dữ liệu học tập được lưu trên trình duyệt (localStorage) để
   hệ thống chạy được độc lập, không cần máy chủ. Cấu trúc hàm ở đây
   đóng vai trò "kho dữ liệu": khi triển khai máy chủ thật, chỉ cần thay
   phần thân hàm bằng lời gọi API tương ứng.
   ===================================================================== */

const NS = 'mathgita.v1';
const key = (k: string) => `${NS}.${k}`;

function read<T>(k: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key(k));
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}
function write<T>(k: string, v: T): void {
  try { localStorage.setItem(key(k), JSON.stringify(v)); } catch { /* hết dung lượng */ }
}

export const uid = (p = 'id'): string => `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

/** Băm mật khẩu (SHA-256 + muối cố định). Bản triển khai máy chủ phải
 *  dùng bcrypt/argon2 phía server — đây là bản mô phỏng phía trình duyệt. */
export async function hashPass(pass: string): Promise<string> {
  const data = new TextEncoder().encode(`mathgita::${pass}`);
  if (globalThis.crypto?.subtle) {
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  let h = 0;
  for (const b of data) h = (Math.imul(h, 31) + b) | 0;
  return `fallback${(h >>> 0).toString(16)}`;
}

/* ------------------------------- USERS ------------------------------- */
export const getUsers = (): User[] => read<User[]>('users', []);
export const saveUsers = (u: User[]): void => write('users', u);
export const findUserByEmail = (email: string): User | undefined =>
  getUsers().find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
export const getUser = (id: string): User | undefined => getUsers().find((u) => u.id === id);

export function upsertUser(u: User): void {
  const all = getUsers();
  const i = all.findIndex((x) => x.id === u.id);
  if (i >= 0) all[i] = u; else all.push(u);
  saveUsers(all);
}

export const getSessionUserId = (): string | null => read<string | null>('session', null);
export const setSessionUserId = (id: string | null): void => write('session', id);

/* ------------------------------ CLASSES ------------------------------ */
export const getClasses = (): ClassRoom[] => read<ClassRoom[]>('classes', []);
export const saveClasses = (c: ClassRoom[]): void => write('classes', c);
export function upsertClass(c: ClassRoom): void {
  const all = getClasses();
  const i = all.findIndex((x) => x.id === c.id);
  if (i >= 0) all[i] = c; else all.push(c);
  saveClasses(all);
}

/* ------------------------------ ATTEMPTS ----------------------------- */
export const getAttempts = (): Attempt[] => read<Attempt[]>('attempts', []);
export const getUserAttempts = (userId: string): Attempt[] =>
  getAttempts().filter((a) => a.userId === userId).sort((a, b) => b.submittedAt - a.submittedAt);
export function addAttempt(a: Attempt): void {
  const all = getAttempts();
  all.push(a);
  // Giữ tối đa 400 bài gần nhất để không vượt hạn mức lưu trữ.
  write('attempts', all.slice(-400));
}
export const getAttempt = (id: string): Attempt | undefined => getAttempts().find((a) => a.id === id);

/* ---------------------------- ASSIGNMENTS ---------------------------- */
export const getAssignments = (): Assignment[] => read<Assignment[]>('assignments', []);
export const saveAssignments = (a: Assignment[]): void => write('assignments', a);
export function upsertAssignment(a: Assignment): void {
  const all = getAssignments();
  const i = all.findIndex((x) => x.id === a.id);
  if (i >= 0) all[i] = a; else all.push(a);
  saveAssignments(all);
}
export const removeAssignment = (id: string): void =>
  saveAssignments(getAssignments().filter((a) => a.id !== id));

/* ------------------------------ PROGRESS ----------------------------- */
export const getProgress = (userId: string): Progress =>
  read<Progress>(`progress.${userId}`, {
    userId, mastery: {}, streakDays: 0, lastStudyDay: '', totalMinutes: 0, studiedTopics: [],
  });
export const saveProgress = (p: Progress): void => write(`progress.${p.userId}`, p);

export const todayKey = (d = new Date()): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/** Cập nhật chuỗi ngày học liên tiếp. */
export function touchStreak(p: Progress): Progress {
  const today = todayKey();
  if (p.lastStudyDay === today) return p;
  const y = new Date(); y.setDate(y.getDate() - 1);
  p.streakDays = p.lastStudyDay === todayKey(y) ? p.streakDays + 1 : 1;
  p.lastStudyDay = today;
  return p;
}

/** Ghi nhận một chuyên đề đã học (mở lý thuyết/dạng bài). */
export function markStudied(userId: string, topicId: string): void {
  const p = getProgress(userId);
  if (!p.studiedTopics.includes(topicId)) p.studiedTopics.push(topicId);
  saveProgress(touchStreak(p));
}

/* ------------------------- ĐÁNH DẤU BÀI ĐANG LÀM ------------------------- */
export interface DraftState {
  examId: string; seed: number; startedAt: number;
  answers: Record<string, unknown>; flags: string[];
}
export const getDraft = (userId: string, examId: string): DraftState | null =>
  read<DraftState | null>(`draft.${userId}.${examId}`, null);
export const saveDraft = (userId: string, d: DraftState): void => write(`draft.${userId}.${d.examId}`, d);
export const clearDraft = (userId: string, examId: string): void => {
  try { localStorage.removeItem(key(`draft.${userId}.${examId}`)); } catch { /* noop */ }
};

/* ------------------------------ GIAO DIỆN ---------------------------- */
export const getTheme = (): 'light' | 'dark' => read<'light' | 'dark'>('theme', 'light');
export const setTheme = (t: 'light' | 'dark'): void => {
  write('theme', t);
  document.documentElement.setAttribute('data-theme', t);
};

/** Bookmark chuyên đề / công thức yêu thích */
export const getBookmarks = (userId: string): string[] => read<string[]>(`bm.${userId}`, []);
export function toggleBookmark(userId: string, id: string): string[] {
  const cur = getBookmarks(userId);
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
  write(`bm.${userId}`, next);
  return next;
}

/** Xoá toàn bộ dữ liệu cục bộ (dùng ở trang Quản trị). */
export function resetAll(): void {
  const del: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(NS)) del.push(k);
  }
  del.forEach((k) => localStorage.removeItem(k));
}
