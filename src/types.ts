/** Ba luồng luyện thi của nền tảng. */
export type TrackId = 'chuyen' | 'thpt' | 'thpt-qg';

/** Nhóm năng lực học sinh (kết quả bài test xếp lộ trình). */
export type GroupId =
  | 'nen-tang'
  | 'vung-chac'
  | 'but-pha'
  | 'chuyen-sau'
  | 'dinh-cao'
  | 'qg-nen-tang'
  | 'qg-vung-chac'
  | 'qg-toi-uu';

/** Mã kỳ thi / trường. */
export type SchoolId =
  | 'hanoi-chung'
  | 'khtn'
  | 'ams'
  | 'cva'
  | 'ntt'
  | 'sp'
  | 'tn-thpt'
  | 'hsa'
  | 'tsa'
  | 'tong-ket';

/** Mạch kiến thức. */
export type StrandId =
  | 'dai-so'
  | 'so-hoc'
  | 'hinh-hoc'
  | 'to-hop'
  | 'bat-dang-thuc'
  | 'thuc-te'
  | 'giai-tich'
  | 'hinh-khong-gian'
  | 'toa-do'
  | 'xac-suat';

export interface Strand {
  id: StrandId;
  name: string;
  short: string;
  color: string; // tailwind text/bg base hex
  description: string;
}

export interface School {
  id: SchoolId;
  name: string;
  shortName: string;
  track: TrackId;
  org: string;
  admissionNote: string;
  rounds: string[];
  mathPapers: { name: string; minutes: number; scale: string; note: string }[];
  styleTags: string[];
  signature: string[];
  benchmark: string;
  competitiveness: number; // 1..5
  officialUrl: string;
  color: string;
}

export interface BlueprintPart {
  label: string;
  points: number;
  minutes: number;
  strand: StrandId;
  content: string;
  requirements: string[];
  gate: 'bat-buoc' | 'phan-hoa' | 'lay-diem-toi-da';
  tips: string[];
}

export interface Blueprint {
  id: string;
  schoolId: SchoolId;
  title: string;
  minutes: number;
  format: string;
  totalPoints: number;
  updatedNote: string;
  parts: BlueprintPart[];
  timeStrategy: { phase: string; minutes: string; action: string }[];
  scoreTargets: { group: string; target: string; giveUp: string }[];
}

export interface Topic {
  id: string;
  name: string;
  strand: StrandId;
  tracks: TrackId[];
  /** Khối lớp gắn với chuyên đề (dùng cho luồng THPT 10–12). */
  grade?: 9 | 10 | 11 | 12;
  level: 1 | 2 | 3 | 4 | 5; // 1 cơ bản → 5 đỉnh cao
  frequency: number; // % xuất hiện trong đề (ước lượng theo thống kê đề các năm)
  hours: number; // số giờ học đề xuất
  summary: string;
  outcomes: string[];
  techniques: string[];
  pitfalls: string[];
  prerequisites: string[]; // topic ids
  keyFormulas?: string[];
  questionIds: string[];
}

export interface Question {
  id: string;
  topicId: string;
  track: TrackId;
  difficulty: 1 | 2 | 3 | 4 | 5;
  source: string;
  statement: string;
  hint: string;
  solution: string[];
  answer: string;
  barem?: string[];
}

export interface PlacementQuestion {
  id: string;
  strand: StrandId;
  track: TrackId | 'both';
  difficulty: 1 | 2 | 3 | 4 | 5;
  statement: string;
  choices: string[];
  correct: number;
  explain: string;
}

export interface Group {
  id: GroupId;
  name: string;
  track: TrackId;
  band: string;
  portrait: string;
  diagnosis: string[];
  target: string;
  weeklyHours: string;
  priorities: string[];
  redFlags: string[];
  color: string;
}

export interface RoadmapTask {
  id: string;
  title: string;
  kind: 'ly-thuyet' | 'luyen-tap' | 'de-thi' | 'ra-soat' | 'ky-nang';
  topicIds: string[];
  minutes: number;
  detail: string;
}

export interface RoadmapWeek {
  index: number;
  focus: string;
  tasks: RoadmapTask[];
  milestone?: string;
}

export interface RoadmapPhase {
  id: string;
  name: string;
  goal: string;
  shareOfTime: number; // tỉ lệ % quỹ thời gian
  weeks: RoadmapWeek[];
  exitCriteria: string[];
}

export interface Roadmap {
  track: TrackId;
  groupId: GroupId;
  totalWeeks: number;
  hoursPerWeek: number;
  examDate: string;
  phases: RoadmapPhase[];
}

export interface Resource {
  id: string;
  title: string;
  author?: string;
  type: 'sach' | 'de-thi' | 'website' | 'video' | 'chuyen-de' | 'cong-cu';
  tracks: TrackId[];
  strands: StrandId[];
  level: 1 | 2 | 3 | 4 | 5;
  description: string;
  usage: string;
  url?: string;
  official?: boolean;
}

export interface ExamPaper {
  id: string;
  schoolId: SchoolId;
  title: string;
  minutes: number;
  totalPoints: number;
  note: string;
  problems: {
    label: string;
    points: number;
    strand: StrandId;
    statement: string;
    parts?: { label: string; points: number; statement: string }[];
    guide: string[];
  }[];
}

/* ---------- Trạng thái người dùng (localStorage) ---------- */

export interface Profile {
  name: string;
  grade: string;
  track: TrackId;
  targetSchool: SchoolId;
  groupId: GroupId;
  examDate: string;
  hoursPerWeek: number;
  createdAt: string;
  placementScore?: number;
  strandScores?: Partial<Record<StrandId, number>>;
}

/** Một lượt làm phiếu đã chấm xong. */
export interface MissionAttempt {
  id: string;
  missionId: string;
  worksheetId: string;
  variant: number;
  correct: number;
  total: number;
  kpi: number;
  seconds: number;
  at: string;
  level: number;
  stageId: string;
  wrongSkills: string[];
  wrongTopics: string[];
  passed: boolean;
}

/** Một câu làm sai được lưu đầy đủ vào hồ sơ học viên để xem lại và phân tích. */
export interface MistakeRecord {
  id: string;
  at: string;
  missionId: string;
  worksheetId: string;
  partOrder: number;
  itemIndex: number;
  generatorId: string;
  topicId: string;
  strand: StrandId;
  skill: string;
  prompt: string;
  choices: string[];
  correct: number;
  chosen: number | null;
  steps: string[];
  /** Học viên đã xem lại và làm lại đúng dạng này chưa. */
  resolved: boolean;
}

export interface MissionStatus {
  tries: number;
  bestKpi: number;
  passed: boolean;
  lastAt: string;
}

export interface ErrorNote {
  id: string;
  questionId?: string;
  topicId: string;
  cause: 'khong-biet-huong' | 'sai-tinh-toan' | 'thieu-truong-hop' | 'trinh-bay' | 'het-gio';
  content: string;
  fix: string;
  at: string;
  resolved: boolean;
}

export interface Account {
  displayName: string;
  roleId: string;
  classId?: string;
  /** Nhật ký thao tác quyền lực (mở khoá, đổi vai trò) — phục vụ minh bạch. */
  auditLog: { at: string; action: string; detail: string }[];
}

export interface AppState {
  version: number;
  account: Account;
  profile: Profile | null;
  attempts: MissionAttempt[];
  missionStatus: Record<string, MissionStatus>;
  /** Ngân hàng lỗi sai cá nhân — nền của hồ sơ học viên. */
  mistakes: MistakeRecord[];
  /** Mức độ cao nhất đã mở khoá của từng luồng (1..5). */
  levelUnlocked: Record<TrackId, number>;
  /** Thứ tự giai đoạn cao nhất đã mở khoá của từng luồng (1..5). */
  stageUnlocked: Record<TrackId, number>;
  xp: number;
  errors: ErrorNote[];
  bookmarks: string[];
  doneTasks: Record<string, boolean>;
  studyLog: Record<string, number>;
}
