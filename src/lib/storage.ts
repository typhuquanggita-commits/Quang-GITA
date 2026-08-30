import { DEFAULT_TARGET_SCORE, STORAGE_KEY, STORAGE_VERSION } from '../config';
import { STAGES } from '../data/curriculum';
import { ROLE_BY_ID } from '../data/roles';
import { sanitizeSection3 } from './section3';
import type { PersistedState, PlacementRecord, Profile, Role, Settings } from '../types';

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
  section3: { mode: 'science', subjects: ['physics', 'chemistry', 'biology'] },
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
    executionErrors: [],
    worksheetRuns: [],
    placement: null,
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
  /** v5 → v6: bo sung bai kiem tra dinh vi dau vao. */
  5: (state) => ({ ...state, version: 6, placement: null }),
  /**
   * v6 → v7: phan 3 doi tu MOT mon sang BA chu de khoa hoc (hoac Tieng Anh).
   *
   * Dang thuc chinh thuc tu 2026 cho thi sinh chon ba trong nam chu de khoa
   * hoc. Ban cu chi luu mot mon, nen o day phai doan lai: ai da chon Tieng Anh
   * thi giu Tieng Anh; ai da chon mot mon khoa hoc thi giu mon do lam chu de
   * dau tien, hai chu de con lai duoc bu theo thu tu chuan.
   */
  6: (state) => {
    const settings = (state['settings'] as Record<string, unknown> | undefined) ?? {};
    const old = settings['scienceSubject'];
    const section3 =
      old === 'english'
        ? { mode: 'english' as const }
        : sanitizeSection3({ mode: 'science', subjects: typeof old === 'string' ? [old] : [] });
    const { scienceSubject: _dropped, ...rest } = settings;
    return { ...state, version: 7, settings: { ...rest, section3 } };
  },
  /** v7 → v8: bo sung so loi thuc thi cua giao thuc diem tuyet doi. */
  7: (state) => ({ ...state, version: 8, executionErrors: [] }),
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
    profile: sanitizeProfile({ ...base.profile, ...(isRecord(candidate.profile) ? candidate.profile : {}) }),
    settings: sanitizeSettings({ ...base.settings, ...(isRecord(candidate.settings) ? candidate.settings : {}) }),
    attempts: Array.isArray(candidate.attempts) ? candidate.attempts : [],
    results: Array.isArray(candidate.results) ? candidate.results : [],
    srs: isRecord(candidate.srs) ? candidate.srs : {},
    mastery: isRecord(candidate.mastery) ? candidate.mastery : {},
    days: isRecord(candidate.days) ? candidate.days : {},
    seen: isRecord(candidate.seen) ? candidate.seen : {},
    worksheets: isRecord(candidate.worksheets) ? candidate.worksheets : {},
    tracks: isRecord(candidate.tracks) ? candidate.tracks : {},
    stage: clampInt(candidate.stage, 1, STAGES.length, 1),
    xp: clampInt(candidate.xp, 0, Number.MAX_SAFE_INTEGER, 0),
    habits: isRecord(candidate.habits) ? candidate.habits : {},
    executionErrors: Array.isArray(candidate.executionErrors) ? candidate.executionErrors : [],
    worksheetRuns: Array.isArray(candidate.worksheetRuns) ? candidate.worksheetRuns : [],
    placement: isRecord(candidate.placement) ? (candidate.placement as PlacementRecord) : null,
  };
}

function isRecord<T>(value: unknown): value is Record<string, T> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

const THEMES: readonly Settings['theme'][] = ['system', 'light', 'dark'];

/**
 * Chuan hoa cai dat.
 *
 * Moi truong duoc ep ve dung kieu va dung mien gia tri. Ly do: tep nhap vao co
 * the do nguoi dung sua tay hoac do mot phien ban khac sinh ra — mot gia tri
 * la o day se lan ra khap giao dien va rat kho lan nguoc ve nguon.
 */
export function sanitizeSettings(settings: Settings): Settings {
  return {
    targetScore: clamp(Number(settings.targetScore) || DEFAULT_TARGET_SCORE, 50, 150),
    examDate: typeof settings.examDate === 'string' && settings.examDate.length <= 32 ? settings.examDate : null,
    section3: sanitizeSection3(settings.section3),
    theme: THEMES.includes(settings.theme) ? settings.theme : 'system',
    fontScale: clamp(Number(settings.fontScale) || 1, 0.875, 1.375),
    reducedMotion: settings.reducedMotion === true,
    dailyGoal: Math.round(clamp(Number(settings.dailyGoal) || 30, 5, 300)),
    soundCues: settings.soundCues === true,
    // Khoa API chi la chuoi; cat do dai de mot tep hong khong bom day localStorage.
    aiApiKey: typeof settings.aiApiKey === 'string' ? settings.aiApiKey.trim().slice(0, 200) : '',
  };
}

/**
 * Chuan hoa ho so.
 *
 * Quan trong nhat la VAI TRO: mot vai tro khong co trong danh muc se lam
 * `permissionsOf` tra ve tap rong, tuc nguoi dung bi khoa khoi chinh du lieu
 * cua minh ma khong hieu vi sao. Gia tri la duoc dua ve `student`.
 */
export function sanitizeProfile(profile: Profile): Profile {
  const role: Role = ROLE_BY_ID.has(profile.role) ? profile.role : 'student';
  const maxRank = ROLE_BY_ID.get(role)?.ranks.length ?? 1;
  return {
    // Khong trim o day: o nhap ten la input duoc dieu khien, trim moi lan go
    // se lam nguoi dung khong danh duoc dau cach giua ten.
    displayName: text(profile.displayName, 60),
    createdAt: Number.isFinite(profile.createdAt) ? Number(profile.createdAt) : Date.now(),
    role,
    rank: clampInt(profile.rank, 1, maxRank, 1),
    classId: text(profile.classId, 40),
  };
}

/** Ten hien thi — o nhap co the de trong, nhung man hinh thi khong. */
export function displayNameOf(profile: Profile): string {
  return profile.displayName.trim() || 'Bạn';
}

function text(value: unknown, max: number): string {
  return typeof value === 'string' ? value.slice(0, max) : '';
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function clampInt(value: unknown, min: number, max: number, fallback: number): number {
  const n = Math.round(Number(value));
  return Number.isFinite(n) ? clamp(n, min, max) : fallback;
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

/**
 * Xuat du lieu hoc tap ra JSON.
 *
 * KHOA API KHONG BAO GIO DUOC XUAT. Tep nay duoc nguoi hoc sao luu, gui cho
 * giao vien, dinh kem qua chat — mot khoa Gemini nam trong do la ro ri thong
 * tin xac thuc that, va nguoi xuat gan nhu chac chan khong biet no o trong do.
 */
export function exportState(state: PersistedState): string {
  const { aiApiKey: _secret, ...settings } = state.settings;
  return JSON.stringify(
    { ...state, settings, exportedAt: new Date().toISOString() },
    null,
    2,
  );
}

export function importState(json: string): PersistedState {
  const parsed: unknown = JSON.parse(json);
  if (!isRecord(parsed)) throw new Error('Tệp không đúng định dạng HSA365.');
  return migrate(parsed as Record<string, unknown>);
}
