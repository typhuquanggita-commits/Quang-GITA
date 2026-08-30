import type { AppState } from '@/types';

const KEY = 'math365-state-v1';

export const emptyState = (): AppState => ({
  version: 1,
  account: { displayName: 'Học viên MATH365', roleId: 'hs-thu', auditLog: [] },
  profile: null,
  attempts: [],
  missionStatus: {},
  mistakes: [],
  levelUnlocked: { thpt: 1, chuyen: 1, 'thpt-qg': 1 },
  stageUnlocked: { thpt: 1, chuyen: 1, 'thpt-qg': 1 },
  xp: 0,
  errors: [],
  bookmarks: [],
  doneTasks: {},
  studyLog: {},
  feedback: [],
});

export function loadState(): AppState {
  if (typeof window === 'undefined') return emptyState();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return { ...emptyState(), ...parsed };
  } catch {
    return emptyState();
  }
}

export function saveState(state: AppState): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* bộ nhớ đầy hoặc bị chặn — bỏ qua, ứng dụng vẫn chạy bình thường */
  }
}

export function resetState(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* bỏ qua */
  }
}

export const todayKey = () => new Date().toISOString().slice(0, 10);
