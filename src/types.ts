/* =====================================================================
   MATHGITA — MÔ HÌNH DỮ LIỆU LÕI
   ===================================================================== */

export type Grade = 6 | 7 | 8 | 9;

/** 4 mức độ nhận thức theo ma trận đề kiểm tra của Bộ GD&ĐT */
export type Level = 'NB' | 'TH' | 'VD' | 'VDC';

/** Mạch kiến thức theo Chương trình GDPT 2018 môn Toán */
export type Strand = 'SO_DAI_SO' | 'HINH_HOC' | 'THONG_KE_XS' | 'THUC_TIEN';

/** Học kỳ */
export type Term = 'HK1' | 'HK2';

/** Vai trò tài khoản & phân quyền */
export type Role =
  | 'guest'          // Khách tham quan
  | 'student_free'   // Học sinh ngoài (miễn phí, giới hạn nội dung)
  | 'student_gita'   // Học sinh đóng phí tại GITA (toàn quyền học liệu)
  | 'teacher'        // Giáo viên GITA (giao bài, chấm, báo cáo lớp)
  | 'admin';         // Quản trị hệ thống

/** Gói học liệu */
export type Track = 'CO_BAN' | 'NANG_CAO' | 'CHUYEN_CLC' | 'HSG';

/* ------------------------------ NỘI DUNG ------------------------------ */

/** Một khối lý thuyết trong bài giảng */
export interface TheoryBlock {
  heading: string;
  /** Các đoạn văn / công thức (hỗ trợ cú pháp toán rút gọn $...$) */
  body: string[];
  /** Công thức trọng tâm cần thuộc lòng */
  formulas?: string[];
  /** Lưu ý / bẫy thường gặp */
  caution?: string[];
  /** Ví dụ minh hoạ kèm lời giải */
  examples?: { prompt: string; solve: string[] }[];
}

/** "Sơ đồ đọc vị bài": dấu hiệu nhận biết → hành động giải */
export interface DecodeRule {
  signal: string;   // Dấu hiệu trong đề
  action: string;   // Hành động / công cụ cần dùng
  why?: string;     // Vì sao (bản chất)
}

/** Nhánh sơ đồ tư duy */
export interface MindBranch {
  title: string;
  items: string[];
}

/** Sơ đồ tư duy tổng hợp theo chuyên đề hoặc học kỳ */
export interface MindMap {
  root: string;
  branches: MindBranch[];
}

/** Một "dạng bài" trong chuyên đề */
export interface ProblemType {
  id: string;
  name: string;
  level: Level;
  /** Phương pháp giải theo bước */
  method: string[];
  /** Kỹ năng cần rèn */
  skills?: string[];
  /** Lỗi sai thường gặp */
  pitfalls?: string[];
  /** Ví dụ mẫu có phân tích tư duy */
  worked?: WorkedExample[];
}

/** Ví dụ mẫu: đề - phân tích tư duy - lời giải - nhận xét */
export interface WorkedExample {
  prompt: string;
  /** Phân tích tư duy: vì sao nghĩ ra bước đó */
  thinking: string[];
  solution: string[];
  remark?: string;
}

/** Công thức trong Cẩm nang công thức điểm 10 */
export interface FormulaCard {
  id: string;
  grade: Grade;
  strand: Strand;
  topic: string;
  name: string;
  formula: string;
  condition?: string;
  usage: string;
  trap?: string;
}

/** Chuyên đề */
export interface Topic {
  id: string;
  grade: Grade;
  term: Term;
  strand: Strand;
  order: number;
  name: string;
  summary: string;
  /** Yêu cầu cần đạt theo CT GDPT 2018 */
  outcomes: string[];
  theory: TheoryBlock[];
  decode: DecodeRule[];
  mindmap: MindMap;
  types: ProblemType[];
  /** Kỹ năng & phương pháp luyện bài của chuyên đề */
  practiceSkills?: { title: string; detail: string[] }[];
  /** Chỉ dành cho học sinh đóng phí GITA */
  premium?: boolean;
  /** Mã ngân hàng câu hỏi gắn với chuyên đề */
  bank: string[];
}

/* ------------------------------ CÂU HỎI ------------------------------ */

export type QuestionKind =
  | 'MC'      // Trắc nghiệm nhiều lựa chọn (4 phương án)
  | 'TF'      // Trắc nghiệm đúng/sai (4 ý a,b,c,d)
  | 'SHORT'   // Trả lời ngắn (điền kết quả)
  | 'ESSAY';  // Tự luận (chấm theo thang rubric)

export interface RubricRow {
  criterion: string;
  points: number;
}

/** Một câu hỏi đã sinh, sẵn sàng hiển thị */
export interface Question {
  id: string;
  templateId: string;
  topicId: string;
  grade: Grade;
  level: Level;
  kind: QuestionKind;
  strand: Strand;
  /** Đề bài */
  stem: string;
  /** MC: 4 phương án; TF: 4 mệnh đề */
  options?: string[];
  /** MC: chỉ số đáp án đúng; TF: mảng boolean; SHORT: chuỗi đáp số; ESSAY: '' */
  answer: number | boolean[] | string;
  /** Các dạng viết khác được chấp nhận cho SHORT */
  accept?: string[];
  /** Lời giải chi tiết từng bước */
  solution: string[];
  /** Phân tích tư duy: "đọc vị" đề để tìm hướng giải */
  thinking?: string[];
  /** Bẫy / lỗi sai thường gặp ở câu này */
  pitfall?: string;
  /** Thang điểm chi tiết cho câu tự luận */
  rubric?: RubricRow[];
  /** Nhãn dạng bài để phân tích năng lực */
  tag: string;
  points: number;
}

/** Khuôn sinh câu hỏi tham số hoá */
export interface Template {
  id: string;
  topicId: string;
  grade: Grade;
  level: Level;
  kind: QuestionKind;
  strand: Strand;
  tag: string;
  /** Sinh 1 câu hỏi từ bộ sinh số ngẫu nhiên có hạt giống */
  build: (r: Rng) => Omit<Question, 'id' | 'templateId' | 'topicId' | 'grade' | 'level' | 'kind' | 'strand' | 'tag' | 'points'> & { points?: number };
}

export interface Rng {
  int: (min: number, max: number) => number;
  pick: <T>(arr: readonly T[]) => T;
  shuffle: <T>(arr: T[]) => T[];
  bool: () => boolean;
  sign: () => number;
  next: () => number;
}

/* ------------------------------- ĐỀ THI ------------------------------- */

export type ExamKind =
  | 'LUYEN_DE'       // Bộ 100 đề luyện thi
  | 'GIUA_KY'
  | 'CUOI_KY'
  | 'CA_NAM'
  | 'ON_HE'
  | 'HSG'
  | 'CHUYEN_DE';     // Luyện theo chuyên đề

export interface ExamBlueprintRow {
  kind: QuestionKind;
  level: Level;
  count: number;
  pointsEach: number;
}

export interface ExamSpec {
  id: string;
  code: string;          // Mã đề, ví dụ MG6-LD-001
  title: string;
  grade: Grade;
  kind: ExamKind;
  term?: Term;
  track: Track;
  minutes: number;
  totalPoints: number;
  seed: number;
  topicIds: string[];
  blueprint: ExamBlueprintRow[];
  note?: string;
  premium: boolean;
}

/* ---------------------------- BÀI LÀM & CHẤM ---------------------------- */

export type AnswerValue = number | boolean[] | string | null;

export interface QuestionResult {
  questionId: string;
  templateId: string;
  topicId: string;
  tag: string;
  level: Level;
  strand: Strand;
  kind: QuestionKind;
  given: AnswerValue;
  correct: boolean;
  partial: number;      // 0..1
  earned: number;
  points: number;
  seconds: number;
}

export interface Attempt {
  id: string;
  userId: string;
  examId: string;
  examCode: string;
  examTitle: string;
  grade: Grade;
  kind: ExamKind;
  seed: number;
  startedAt: number;
  submittedAt: number;
  durationSec: number;
  score10: number;       // Điểm quy về thang 10
  earned: number;
  total: number;
  results: QuestionResult[];
  /** Kết quả phân tích chất lượng */
  review: AttemptReview;
  /** Gắn với nhiệm vụ về nhà nào (nếu có) */
  assignmentId?: string;
}

export interface SkillScore {
  key: string;
  label: string;
  correct: number;
  total: number;
  rate: number;
}

export interface AttemptReview {
  band: 'XUAT_SAC' | 'GIOI' | 'KHA' | 'TB' | 'YEU';
  headline: string;
  byLevel: SkillScore[];
  byTopic: SkillScore[];
  byTag: SkillScore[];
  strengths: string[];
  weaknesses: string[];
  /** Định hướng giải pháp cải thiện, có thứ tự ưu tiên */
  plan: ImprovementStep[];
  paceNote: string;
  gapTo9: number;
}

export interface ImprovementStep {
  priority: 1 | 2 | 3;
  title: string;
  why: string;
  actions: string[];
  topicId?: string;
  targetTag?: string;
}

/* ------------------------------ TÀI KHOẢN ------------------------------ */

export interface User {
  id: string;
  name: string;
  email: string;
  passHash: string;
  role: Role;
  grade: Grade;
  /** Mã lớp GITA đang theo học */
  classId?: string;
  /** Hạn đóng phí (timestamp) — hết hạn sẽ hạ về student_free */
  paidUntil?: number;
  createdAt: number;
  avatarColor: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  grade: Grade;
  track: Track;
  teacherId: string;
  studentIds: string[];
}

/* --------------------------- NHIỆM VỤ VỀ NHÀ --------------------------- */

export interface Assignment {
  id: string;
  title: string;
  note?: string;
  classId: string;
  teacherId: string;
  examId: string;
  examCode: string;
  grade: Grade;
  assignedAt: number;
  dueAt: number;
  /** Điểm sàn yêu cầu (thang 10) */
  requiredScore: number;
  /** Cho phép làm lại tối đa mấy lần */
  maxAttempts: number;
}

export interface AssignmentReport {
  assignmentId: string;
  userId: string;
  userName: string;
  attempts: number;
  bestScore: number | null;
  lastSubmittedAt: number | null;
  status: 'CHUA_LAM' | 'DAT' | 'CHUA_DAT' | 'TRE_HAN';
}

/* --------------------------- TIẾN ĐỘ HỌC TẬP --------------------------- */

export interface Mastery {
  topicId: string;
  attempts: number;
  correct: number;
  total: number;
  rate: number;
  lastAt: number;
}

export interface Progress {
  userId: string;
  mastery: Record<string, Mastery>;
  streakDays: number;
  lastStudyDay: string;
  totalMinutes: number;
  studiedTopics: string[];
}
