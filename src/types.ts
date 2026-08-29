/**
 * Mo hinh du lieu loi cua HSA365.
 *
 * Nguyen tac: moi thu nguoi hoc tao ra (bai lam, the on tap, cai dat) deu la
 * du lieu co phien ban, tuan tu hoa duoc sang JSON va khoi phuc duoc 100%.
 */

/** Ba hop phan cua bai thi HSA. */
export type SectionId = 'quantitative' | 'qualitative' | 'science';

/** Mon tu chon cua phan 3 (thi sinh chon 1 trong 5). */
export type ScienceSubject = 'physics' | 'chemistry' | 'history' | 'geography' | 'english';

/** Dang cau hoi. `fill` = dien dap an (phan Toan co 15 cau). */
export type QuestionFormat = 'mcq' | 'fill';

/** 1 = nhan biet ... 5 = van dung cao. Anh xa sang do kho Rasch trong lib/ability.ts */
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface Choice {
  id: string;
  text: string;
}

/** Ngu lieu dung chung cho mot chum cau hoi (phan Ngon ngu - Van hoc). */
export interface Passage {
  id: string;
  title: string;
  body: string;
  source?: string;
}

export interface Question {
  id: string;
  section: SectionId;
  /** Chi co voi section === 'science'. */
  subject?: ScienceSubject;
  topicId: string;
  format: QuestionFormat;
  stem: string;
  /** Chum cau hoi dung chung ngu lieu. */
  passageId?: string;
  /** Bat buoc voi format 'mcq'. */
  choices?: Choice[];
  /**
   * MCQ: id cua lua chon dung. FILL: dap an chuan hoa.
   */
  answer: string;
  /** Cac bien the duoc chap nhan cho cau dien (vd '0,5' va '0.5'). */
  acceptedAnswers?: string[];
  explanation: string;
  difficulty: Difficulty;
  /** Thoi gian muc tieu (giay) — dung de chan doan toc do lam bai. */
  estimatedSeconds: number;
  /** Cac ky nang chi tiet, phuc vu phan tich sau hon topic. */
  skills: string[];
  /** Bay loi thuong gap: id lua chon -> ly do sai. */
  traps?: Record<string, string>;
}

export interface Topic {
  id: string;
  section: SectionId;
  subject?: ScienceSubject;
  name: string;
  /** Trong so xuat hien uoc luong trong de that (0..1 trong moi section). */
  weight: number;
  /** Cac topic can nam truoc. Dung de xep thu tu lo trinh. */
  prerequisites?: string[];
}

/** Muc do chac chan nguoi hoc tu danh gia — dau vao quan trong de phat hien "dung do may rui". */
export type Confidence = 'sure' | 'unsure' | 'guess';

export interface Response {
  questionId: string;
  /** null = chua tra loi. */
  value: string | null;
  flagged: boolean;
  timeSpentMs: number;
  /** So lan quay lai cau nay. */
  visits: number;
  /** So lan doi dap an — chi bao dao dong. */
  changes: number;
  confidence?: Confidence;
  answeredAt?: number;
}

export type AttemptMode = 'full' | 'section' | 'drill' | 'adaptive';
export type AttemptStatus = 'in_progress' | 'submitted' | 'abandoned';

export interface SectionRun {
  section: SectionId;
  questionIds: string[];
  /** Thoi gian cho phep (giay) theo dung quy che. */
  allowedSeconds: number;
  elapsedMs: number;
  startedAt?: number;
  submittedAt?: number;
}

export interface Attempt {
  id: string;
  mode: AttemptMode;
  label: string;
  scienceSubject: ScienceSubject;
  status: AttemptStatus;
  createdAt: number;
  submittedAt?: number;
  /** Chi so section dang lam. */
  cursorSection: number;
  cursorIndex: number;
  sections: SectionRun[];
  responses: Record<string, Response>;
  /** Bat buoc theo thu tu phan thi va khong cho quay lai (che do mo phong that). */
  strictMode: boolean;
}

/** Ket qua cham cho mot section. */
export interface SectionScore {
  section: SectionId;
  correct: number;
  total: number;
  answered: number;
  /** Diem thang 50. */
  score: number;
  /** Nang luc uoc luong (logit). */
  ability: number;
  /** Toc do trung binh (giay/cau). */
  secondsPerQuestion: number;
  /** So cau dung nhung tu danh gia la doan — diem "may man". */
  luckyCorrect: number;
  /** So cau sai du tu tin — lo hong nguy hiem nhat. */
  confidentWrong: number;
}

export interface AttemptResult {
  attemptId: string;
  submittedAt: number;
  sections: SectionScore[];
  /** Diem thang 150. */
  total: number;
  /** Diem du bao neu thi de chuan day du (thang 150). */
  projected: number;
  durationMs: number;
}

/** The on tap ngat quang (SM-2 hieu chinh). */
export interface SrsCard {
  questionId: string;
  ease: number;
  intervalDays: number;
  /** Epoch ms — thoi diem den han. */
  due: number;
  reps: number;
  lapses: number;
  lastReviewed?: number;
  /** Ly do vao so tay: sai, doan trung, hoac qua cham. */
  reason: 'wrong' | 'lucky' | 'slow';
  note?: string;
}

export interface TopicMastery {
  topicId: string;
  /** 0..1, trung binh truot co trong so theo do kho. */
  mastery: number;
  attempts: number;
  correct: number;
  /** Tong thoi gian (ms) da dau tu. */
  timeMs: number;
  lastPracticed?: number;
}

export interface DayLog {
  /** YYYY-MM-DD theo gio dia phuong. */
  date: string;
  questions: number;
  correct: number;
  minutes: number;
}

export interface Settings {
  /** Diem muc tieu tren thang 150. */
  targetScore: number;
  /** ISO date (YYYY-MM-DD) ngay thi. */
  examDate: string | null;
  scienceSubject: ScienceSubject;
  theme: 'system' | 'light' | 'dark';
  /** He so co chu, 0.875..1.375. */
  fontScale: number;
  reducedMotion: boolean;
  /** Muc tieu so cau moi ngay. */
  dailyGoal: number;
  soundCues: boolean;
  /** Khoa Gemini do nguoi dung tu nhap (luu cuc bo tren may). */
  aiApiKey: string;
}

/**
 * Vai tro trong he thong. Xem src/data/roles.ts de biet ma tran quyen.
 *
 * Hai nhom: nhom CHUYEN MON dung truc tiep voi nguoi hoc (hoc vien, tro giang,
 * giao vien, coach, tu van, chu nhiem) va nhom VAN HANH lo he thong (admin san
 * pham, admin he thong, giam doc dieu hanh, super admin).
 */
export type Role =
  | 'student'
  | 'mentor'
  | 'teacher'
  | 'coach'
  | 'consultant'
  | 'headTeacher'
  | 'productAdmin'
  | 'sysAdmin'
  | 'executive'
  | 'superAdmin';

/** Ma quyen. Danh muc day du nam trong src/data/roles.ts. */
export type Permission =
  | 'learn.worksheet'
  | 'learn.mock'
  | 'learn.mockFull'
  | 'learn.review'
  | 'learn.aiTutor'
  | 'learn.analytics'
  | 'learn.skipLevel'
  | 'class.view'
  | 'class.viewAll'
  | 'class.assign'
  | 'class.comment'
  | 'class.approveLevel'
  | 'class.approveStage'
  | 'class.manage'
  | 'content.author'
  | 'content.review'
  | 'content.curriculum'
  | 'content.publish'
  | 'coach.session'
  | 'coach.habit'
  | 'coach.plan'
  | 'consult.profile'
  | 'consult.roadmap'
  | 'report.org'
  | 'report.quality'
  | 'system.users'
  | 'system.roles'
  | 'system.export'
  | 'system.audit'
  | 'system.danger';

export interface Profile {
  displayName: string;
  createdAt: number;
  role: Role;
  /** Bac trong vai tro, bat dau tu 1. */
  rank: number;
  /** Ma lop duoc phan cong (rong = chua thuoc lop nao). */
  classId: string;
}

/* ── Mo thuc huan luyen GITA ────────────────────────────────────────────── */

/**
 * Bon tru cot cua mo thuc GITA. Xem src/data/gita.ts.
 *   G — Goal      he thong muc tieu, ket qua xuat sac, dich den
 *   I — Inspirits dong luc, khat khao, noi luc, niem tin, ban linh
 *   T — Talent    tai nang, diem manh, tu duy xuat sac, toc do, tap trung
 *   A — Action    hanh dong quyet doan, thoi quen thanh cong, 20/80, doi nhom
 */
export type GitaPillarId = 'goal' | 'inspirits' | 'talent' | 'action';

/** Nam cap do hanh dong theo quy tac 20/80. */
export type ActionLevelId = 'A1' | 'A2' | 'A3' | 'A4' | 'A5';

/** Ba nhip ap dung vong lap: mot buoi hoc, mot tuan, mot giai doan. */
export type GitaCadence = 'micro' | 'meso' | 'macro';

/** Ba moi truong duoc GITA hoa. */
export type GitaEnvironment = 'family' | 'school' | 'society';

/** Nam tang hap thu cua nguoi hoc, H1..H5. */
export type AbsorptionTierId = 'H1' | 'H2' | 'H3' | 'H4' | 'H5';

/** Nam cap chuyen mon cua tu van vien — giao vien — coach, P1..P5. */
export type PractitionerLevelId = 'P1' | 'P2' | 'P3' | 'P4' | 'P5';

/** Thoi quen nen tang, do nguoi hoc tich moi ngay hoac moi tuan. */
export type HabitCadence = 'daily' | 'weekly';

export interface HabitLog {
  habitId: string;
  /** Cac ngay da hoan thanh, dang YYYY-MM-DD. Giu toi da 180 ngay gan nhat. */
  done: string[];
}

/* ── He thong phieu luyen, nhiem vu va cap do ───────────────────────────── */

/** Mot chang trong phieu luyen. Hoc sinh lam lan luot tung chang. */
export interface WorksheetPart {
  /** 1..3 */
  order: number;
  name: string;
  goal: string;
  questionIds: string[];
  /** Thoi gian khuyen nghi (giay) cho ca chang. */
  seconds: number;
}

/**
 * Sau loai phieu cua moi chuyen de, theo dung thu tu su pham:
 * ly thuyet → dang bai & doc vi → ky nang & phuong phap → nang cao →
 * on thi → phieu thi.
 */
export type WorksheetKind =
  | 'theory'
  | 'patterns'
  | 'method'
  | 'advanced'
  | 'revision'
  | 'test';

/**
 * Phieu luyen — don vi tai lieu nho nhat cua chuong trinh.
 * Moi phieu la mot dac ta day du: muc tieu, cau truc 3 chang, nguong dat,
 * dieu kien mo khoa va phan thuong kinh nghiem.
 */
export interface Worksheet {
  /** Vi du 'PL-TOA-DS-L3-004'. On dinh giua cac lan build. */
  id: string;
  code: string;
  title: string;
  objective: string;
  section: SectionId;
  subject?: ScienceSubject;
  topicId: string;
  /** 1..6 */
  level: number;
  /** 1..3 */
  stage: number;
  kind: WorksheetKind;
  /** Ma viet tat cua loai phieu: LT, DB, KN, NC, OT, PT. */
  kindCode: string;
  /** Ma cua phieu loi giai + bang phan tich di kem (LG-…). */
  solutionCode: string;
  /** Ma phieu huong dan on chac chuyen de (HD-…). */
  guideCode: string;
  parts: WorksheetPart[];
  questionCount: number;
  /** Tong thoi gian khuyen nghi (giay). */
  seconds: number;
  /** Ti le dung toi thieu de duoc tinh la hoan thanh (0..1). */
  passRatio: number;
  /** Ti le dung de duoc tinh la thanh thao, du dieu kien len cap (0..1). */
  masteryRatio: number;
  xp: number;
  /** Phieu can hoan thanh truoc. */
  requires?: string;
}

/** Nhiem vu giao cho hoc sinh, gan voi dung mot phieu luyen. */
export interface Mission {
  id: string;
  code: string;
  worksheetId: string;
  title: string;
  brief: string;
  /** Rang buoc rieng cua nhiem vu, vi du gioi han thoi gian hoac so cau sai. */
  constraint: string;
  section: SectionId;
  subject?: ScienceSubject;
  topicId: string;
  level: number;
  stage: number;
  kind: WorksheetKind;
  xp: number;
}

export interface WorksheetProgress {
  worksheetId: string;
  attempts: number;
  /** Ti le dung cao nhat tung dat (0..1). */
  bestRatio: number;
  lastRatio: number;
  passed: boolean;
  mastered: boolean;
  totalTimeMs: number;
  lastAttemptAt?: number;
}

/** Tien do theo tuyen (moi chu de la mot tuyen rieng). */
export interface TrackState {
  topicId: string;
  /** 1..6 */
  level: number;
  xp: number;
  /** So phieu da thanh thao o cap hien tai. */
  masteredAtLevel: number;
}

/* ── Ho so hoc vien: luu lai tung luot lam de xem lai loi giai ─────────── */

/**
 * Ba loai loi. Phan loai dung loai quyet dinh cach chua:
 *  - knowledge: khong nam kien thuc → hoc lai roi lam phieu khoi dong
 *  - skill:     biet huong nhung sai buoc hoac qua cham → luyen lap co phan hoi
 *  - tactic:    lam duoc nhung bo trong hoac het gio → sua quy trinh lam bai
 */
export type ErrorType = 'knowledge' | 'skill' | 'tactic' | 'lucky' | 'clean';

/**
 * Mot luot lam phieu da nop, luu day du de dung lai bo giai de va bang phan
 * tich bat cu luc nao ve sau.
 */
export interface WorksheetRecord {
  id: string;
  worksheetId: string;
  submittedAt: number;
  responses: Record<string, Response>;
  correct: number;
  total: number;
  ratio: number;
  timeMs: number;
  passed: boolean;
  mastered: boolean;
  xpEarned: number;
}

/** Toan bo trang thai ben vung, co danh phien ban de di tru an toan. */
export interface PersistedState {
  version: number;
  profile: Profile;
  settings: Settings;
  attempts: Attempt[];
  results: AttemptResult[];
  srs: Record<string, SrsCard>;
  mastery: Record<string, TopicMastery>;
  days: Record<string, DayLog>;
  /** Cac cau da tra loi dung it nhat 1 lan — dung de uu tien cau moi. */
  seen: Record<string, number>;
  /** Tien do tung phieu luyen, khoa la worksheetId. */
  worksheets: Record<string, WorksheetProgress>;
  /** Cap do tung tuyen chu de, khoa la topicId. */
  tracks: Record<string, TrackState>;
  /** Giai doan hien tai cua ca chuong trinh (1..3). */
  stage: number;
  /** Tong diem kinh nghiem. */
  xp: number;
  /** Nhat ky thoi quen GITA, khoa la habitId. */
  habits: Record<string, HabitLog>;
  /**
   * Lich su tung luot lam phieu, moi nhat o cuoi. Giu toi da 300 luot gan nhat
   * de ho so khong phinh vo han tren may nguoi dung.
   */
  worksheetRuns: WorksheetRecord[];
}
