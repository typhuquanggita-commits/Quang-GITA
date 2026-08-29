import { DEFAULT_TARGET_SCORE, STORAGE_KEY, STORAGE_VERSION } from '../config';
import type { PersistedState, Settings } from '../types';

/**
 * Luu tru cuc bo, co danh phien ban.
 *
 * Ba cam ket voi nguoi hoc:
 *  1. Du lieu nam tren may cua ho, khong gui di dau.
 *  2. Nang cap ung dung khong bao gio lam mat tien do (co ham di tru).
 *  3. Xuat/nhap duoc ra JSON — ho co the mang di noi khac hoac tu sao luu.
 */

export const DEFAULT_SETTINGS: Settings = {
  targetScore: DEFAULT_TARGET_SCORE,
  examDate: null,
  scienceSubject: 'english',
  theme: 'system',
  fontScale: 1,
  reducedMotion: false,
  dailyGoal: 30,
  soundCues: false,
  aiApiKey: '',
};

export function createInitialState(now: number = Date.now()): PersistedState {
  return {
    version: STORAGE_VERSION,
    profile: { displayName: 'Bạn', createdAt: now, role: 'student', rank: 1, classId: '' },
    settings: { ...DEFAULT_SETTINGS },
    attempts: [],
    results: [],
    srs: {},
    mastery: {},
    days: {},
    seen: {},
    worksheets: {},
    tracks: {},
    stage: 1,
    xp: 0,
    habits: {},
    worksheetRuns: [],
  };
}

type Migration = (state: Record<string, unknown>) => Record<string, unknown>;

/**
 * Cac buoc di tru, chay tuan tu tu phien ban cu len phien ban hien tai.
 * Khi doi cau truc du lieu: TANG STORAGE_VERSION va them mot buoc o day —
 * dung bao gio sua tai cho roi de nguoi dung cu vo trang trang.
 */
const MIGRATIONS: Record<number, Migration> = {
  /** v1 → v2: bo sung he thong phieu luyen, nhiem vu va cap do theo tuyen. */
  1: (state) => ({
    ...state,
    version: 2,
    worksheets: {},
    tracks: {},
    stage: 1,
    xp: 0,
  }),
  /** v2 → v3: bo sung vai tro va cap bac cho ho so nguoi dung. */
  2: (state) => ({
    ...state,
    version: 3,
    profile: {
      ...((state['profile'] as Record<string, unknown> | undefined) ?? {}),
      role: 'student',
      rank: 1,
      classId: '',
    },
  }),
  /** v3 → v4: bo sung nhat ky thoi quen cua mo thuc GITA. */
  3: (state) => ({ ...state, version: 4, habits: {} }),
  /** v4 → v5: luu lich su tung luot lam phieu de dung lai bo giai de. */
  4: (state) => ({ ...state, version: 5, worksheetRuns: [] }),
};

export function migrate(raw: Record<string, unknown>): PersistedState {
  let state = raw;
  let version = typeof state['version'] === 'number' ? (state['version'] as number) : 0;

  while (version < STORAGE_VERSION) {
    const step = MIGRATIONS[version];
    if (!step) break;
    state = step(state);
    version = typeof state['version'] === 'number' ? (state['version'] as number) : version + 1;
  }

  return reconcile(state);
}

/**
 * Hop nhat du lieu doc duoc voi cau truc mac dinh.
 * Muc dich: mot file JSON thieu truong (do phien ban cu hoac do nguoi dung sua
 * tay) van nap duoc thay vi lam hong ung dung.
 */
function reconcile(raw: Record<string, unknown>): PersistedState {
  const base = createInitialState();
  const candidate = raw as Partial<PersistedState>;

  return {
    version: STORAGE_VERSION,
    profile: { ...base.profile, ...(candidate.profile ?? {}) },
    settings: sanitizeSettings({ ...base.settings, ...(candidate.settings ?? {}) }),
    attempts: Array.isArray(candidate.attempts) ? candidate.attempts : [],
    results: Array.isArray(candidate.results) ? candidate.results : [],
    srs: isRecord(candidate.srs) ? candidate.srs : {},
    mastery: isRecord(candidate.mastery) ? candidate.mastery : {},
    days: isRecord(candidate.days) ? candidate.days : {},
    seen: isRecord(candidate.seen) ? candidate.seen : {},
    worksheets: isRecord(candidate.worksheets) ? candidate.worksheets : {},
    tracks: isRecord(candidate.tracks) ? candidate.tracks : {},
    stage: typeof candidate.stage === 'number' ? candidate.stage : 1,
    xp: typeof candidate.xp === 'number' ? candidate.xp : 0,
    habits: isRecord(candidate.habits) ? candidate.habits : {},
    worksheetRuns: Array.isArray(candidate.worksheetRuns) ? candidate.worksheetRuns : [],
  };
}

function isRecord<T>(value: unknown): value is Record<string, T> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function sanitizeSettings(settings: Settings): Settings {
  return {
    ...settings,
    targetScore: clamp(Number(settings.targetScore) || DEFAULT_TARGET_SCORE, 50, 150),
    fontScale: clamp(Number(settings.fontScale) || 1, 0.875, 1.375),
    dailyGoal: Math.round(clamp(Number(settings.dailyGoal) || 30, 5, 300)),
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function loadState(storage: Storage | undefined = safeStorage()): PersistedState {
  if (!storage) return createInitialState();
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return createInitialState();
    return migrate(parsed as Record<string, unknown>);
  } catch {
    // Du lieu hong khong duoc phep chan nguoi hoc vao app.
    return createInitialState();
  }
}

export function saveState(state: PersistedState, storage: Storage | undefined = safeStorage()): boolean {
  if (!storage) return false;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function safeStorage(): Storage | undefined {
  try {
    if (typeof window === 'undefined') return undefined;
    const probe = '__hsa365__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    // Che do rieng tu hoac bi chan cookie: app van chay, chi khong luu duoc.
    return undefined;
  }
}

export function exportState(state: PersistedState): string {
  return JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2);
}

export function importState(json: string): PersistedState {
  const parsed: unknown = JSON.parse(json);
  if (!isRecord(parsed)) throw new Error('Tệp không đúng định dạng HSA365.');
  return migrate(parsed as Record<string, unknown>);
}
