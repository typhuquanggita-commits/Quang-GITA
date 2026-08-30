/** Năm luồng của nền tảng: bốn luồng luyện thi và một luồng chính khoá. */
export type TrackId = 'chuyen' | 'thpt' | 'thpt-qg' | 'lop6' | 'chinh-khoa';

/** Nhóm năng lực học sinh (kết quả bài test xếp lộ trình). */
export type GroupId =
  | 'nen-tang'
  | 'vung-chac'
  | 'but-pha'
  | 'chuyen-sau'
  | 'dinh-cao'
  | 'qg-nen-tang'
  | 'qg-vung-chac'
  | 'qg-toi-uu'
  | 'l6-lam-quen'
  | 'l6-vung-chac'
  | 'l6-but-pha'
  | 'ck-vao-nhip'
  | 'ck-gioi'
  | 'ck-top1';

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
  | 'sat'
  | 'lop6-cau-giay'
  | 'lop6-ngoai-ngu'
  | 'ck-thpt'
  | 'ck-thcs'
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
  /** Khối lớp gắn với chuyên đề (5 cho luồng vào 6; 6–9 và 10–12 cho các luồng còn lại). */
  grade?: 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
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

/** Một lượt phản hồi của người dùng thật về một trang nội dung. */
export interface FeedbackEntry {
  id: string;
  at: string;
  /** Đường dẫn trang được đánh giá. */
  path: string;
  /** Nhãn dễ đọc của trang, để đọc lại không cần tra. */
  label: string;
  /** Số sao từ 1 đến 5. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Điều người dùng viết thêm; có thể để trống. */
  comment: string;
  /** Vai trò tự khai: học sinh, phụ huynh hay giáo viên. */
  who: 'hoc-sinh' | 'phu-huynh' | 'giao-vien' | 'khac';
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
  /** Phản hồi do chính người dùng gửi. Không bao giờ được sinh tự động. */
  feedback: FeedbackEntry[];
}

/* ---------- Đề mẫu trọn vẹn theo cấu trúc từng kỳ thi ---------- */

/** Hình thức của một câu trong đề. */
export type PaperItemFormat = 'tu-luan' | 'trac-nghiem' | 'dung-sai' | 'tra-loi-ngan';

/** Bảng phân tích chi tiết đi kèm mỗi câu của đề mẫu. */
export interface PaperItemAnalysis {
  /** Tên dạng bài — gọi đúng tên thì mới tra được kho bí kíp. */
  dang: string;
  /** Kiến thức liên quan cần có trước khi làm câu này. */
  knowledge: string[];
  /** Đọc vị đề: những dấu hiệu trong đề bài giúp nhận ra ngay dạng. */
  docVi: string[];
  /** Phương pháp làm — quy trình chuẩn theo bước. */
  method: string[];
  /** Bẫy hay mắc và mẹo xử lý. */
  traps: string[];
  /** Bí kíp phòng thi cho riêng dạng này. */
  tips: string[];
  /** Liên hệ đề thi thật và các biến thể có thể gặp. */
  transfer: string;
}

/** Một ý đúng/sai trong câu trắc nghiệm đúng/sai. */
export interface PaperClaim {
  text: string;
  value: boolean;
  why: string;
}

export interface PaperItem {
  id: string;
  /** Nhãn hiển thị: “Bài I.2”, “Câu 7”, “Phần II · Câu 3 · ý b”. */
  label: string;
  points: number;
  minutes: number;
  strand: StrandId;
  level: 1 | 2 | 3 | 4 | 5;
  format: PaperItemFormat;
  /** Mã chuyên đề liên quan, để nối câu này về bộ phiếu tương ứng. */
  topicIds: string[];
  statement: string;
  /** Trắc nghiệm nhiều lựa chọn. */
  choices?: string[];
  correctIndex?: number;
  /** Trắc nghiệm đúng/sai — bốn mệnh đề con. */
  claims?: PaperClaim[];
  /** Đáp số cuối cùng, viết gọn. */
  answer: string;
  /** Lời giải từng bước. */
  solution: string[];
  /** Barem chấm: mỗi mốc điểm gắn với một hành động quan sát được. */
  barem: { item: string; point: number }[];
  analysis: PaperItemAnalysis;
}

export interface PaperPart {
  label: string;
  points: number;
  note: string;
  items: PaperItem[];
}

export interface ExamPaper {
  id: string;
  /** Mã tài liệu theo quy ước nhận diện MATH365. */
  code: string;
  blueprintId: string;
  schoolId: SchoolId;
  track: TrackId;
  title: string;
  subtitle: string;
  minutes: number;
  totalPoints: number;
  /** Vì sao đề này bám sát cấu trúc thật — đối chiếu từng phần với ma trận. */
  fidelity: string[];
  parts: PaperPart[];
  /** Lưu ý chấm cho giáo viên. */
  gradingNotes: string[];
  timePlan: { phase: string; minutes: string; action: string }[];
  /** Đọc điểm để biết đang ở đâu và làm gì tiếp theo. */
  scoreBands: { band: string; meaning: string; next: string }[];
}
