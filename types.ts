/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/* ==========================================================================
   ENGWIN365 — Kiểu dữ liệu lõi của hệ thống học tiếng Anh 0 → IELTS 8.0
   ========================================================================== */

export type Cefr =
  | 'Pre-A1'
  | 'A1'
  | 'A2'
  | 'A2+'
  | 'B1'
  | 'B1+'
  | 'B2'
  | 'B2+'
  | 'C1'
  | 'C1+'
  | 'C2';

export type SkillId =
  | 'listening'
  | 'speaking'
  | 'reading'
  | 'writing'
  | 'vocabulary'
  | 'grammar'
  | 'pronunciation'
  | 'mindset';

export type PillarId =
  | 'input'
  | 'output'
  | 'memory'
  | 'sound'
  | 'thinking'
  | 'habit'
  | 'community';

/** Một trụ cột nền tảng của hệ thống. */
export interface Pillar {
  id: PillarId;
  name: string;
  motto: string;
  why: string;
  law: string;
  dailyShare: string;
  icon: string;
}

/** Một phương pháp học đã được kiểm chứng trên thế giới. */
export interface Method {
  id: string;
  name: string;
  vnName: string;
  origin: string;
  evidence: string;
  what: string;
  how: string[];
  bestFor: SkillId[];
  phases: string[];
  costMinutes: number;
  power: 1 | 2 | 3 | 4 | 5;
  pitfall: string;
}

/** Một khối luyện tập cụ thể trong tuần. */
export interface WeeklyBlock {
  day: string;
  slot: string;
  minutes: number;
  drillId: string;
  note?: string;
}

export interface Kpi {
  label: string;
  target: string;
  how: string;
}

/** Một cột mốc 3 tháng trong hành trình 36 tháng. */
export interface Milestone {
  id: string;
  year: 1 | 2 | 3;
  quarter: 1 | 2 | 3 | 4;
  months: string;
  codename: string;
  tagline: string;
  cefrFrom: Cefr;
  cefrTo: Cefr;
  bandFrom: number;
  bandTo: number;
  vocabTarget: number;
  inputHours: number;
  dailyMinutes: [number, number];
  color: string;
  bigIdea: string;
  focus: string[];
  methodIds: string[];
  drillIds: string[];
  resourceIds: string[];
  lectureIds: string[];
  habitIds: string[];
  mindsetIds: string[];
  clubIds: string[];
  weeklyPlan: WeeklyBlock[];
  exitCriteria: string[];
  traps: string[];
  kpis: Kpi[];
}

/** Một bài luyện (drill) trong thư viện luyện tập. */
export interface Drill {
  id: string;
  name: string;
  skill: SkillId;
  minutes: number;
  level: Cefr[];
  goal: string;
  steps: string[];
  methodIds: string[];
  successLooksLike: string;
  progression: string;
}

/** Tài liệu: sách, app, kênh, podcast, đề thi... */
export type ResourceKind =
  | 'book'
  | 'app'
  | 'channel'
  | 'podcast'
  | 'website'
  | 'exam'
  | 'series'
  | 'tool';

export interface Resource {
  id: string;
  name: string;
  kind: ResourceKind;
  author: string;
  level: Cefr[];
  skills: SkillId[];
  why: string;
  howToUse: string;
  free: boolean;
  tier: 'core' | 'support' | 'optional';
}

/** Một bài giảng trong chuỗi bài giảng. */
export interface Lesson {
  no: number;
  title: string;
  minutes: number;
  outcome: string;
  /** Bài luyện gắn với bài giảng này. Mọi bài đều phải có — học xong phải biết làm gì. */
  drillId?: string;
  /** Lỗi hay mắc đúng ở điểm này, để người dạy biết phải canh chỗ nào. */
  trap?: string;
  /** Mã lỗi trong thư viện 20 phác đồ, khi bẫy này đã có phác đồ sẵn. */
  remedyCode?: string;
}

export interface LectureSeries {
  id: string;
  name: string;
  track: 'Foundation' | 'Fluency' | 'Academic' | 'IELTS' | 'Mindset';
  season: string;
  format: string;
  totalLessons: number;
  cadence: string;
  promise: string;
  lessons: Lesson[];
}

/** Bí kíp — chiến thuật cô đọng, áp dụng được ngay. */
export interface Playbook {
  id: string;
  title: string;
  skill: SkillId;
  band: string;
  secret: string;
  moves: string[];
  proof: string;
  antiPattern: string;
}

/** Thói quen cần cài đặt. */
export interface Habit {
  id: string;
  name: string;
  cue: string;
  routine: string;
  reward: string;
  twoMinuteVersion: string;
  identity: string;
  installWeek: string;
  metric: string;
}

/** Lập trình tư duy. */
export interface MindsetModule {
  id: string;
  name: string;
  principle: string;
  science: string;
  oldStory: string;
  newStory: string;
  ritual: string[];
  affirmation: string;
}

/** Club — cộng đồng luyện tập. */
export interface Club {
  id: string;
  name: string;
  frequency: string;
  size: string;
  level: Cefr[];
  format: string[];
  rules: string[];
  outcome: string;
  hostScript: string;
}

/** Mốc kiểm tra năng lực. */
export interface Checkpoint {
  id: string;
  at: string;
  name: string;
  test: string;
  passBand: string;
  actions: { ifPass: string; ifFail: string };
}

/** Nhịp sinh hoạt: ngày / tuần / tháng / quý. */
export interface Ritual {
  id: string;
  scope: 'day' | 'week' | 'month' | 'quarter';
  name: string;
  when: string;
  minutes: number;
  steps: string[];
  why: string;
}

/* ==========================================================================
   LA BÀN — Hiến chương cá nhân (tầng "vì sao" đặt trên tầng "làm gì")
   ========================================================================== */

/** Một tầng của câu hỏi Tại sao. */
export interface WhyLayer {
  level: string;
  question: string;
  draft: string;
  test: string;
  yours: boolean;
}

/** Một bậc của định nghĩa "xuất sắc". */
export interface ExcellenceTier {
  id: string;
  tier: string;
  name: string;
  why: string;
  targets: {label: string; value: string}[];
}

/** Một đặc tính của con người tôi muốn trở thành. */
export interface IdentityTrait {
  id: string;
  trait: string;
  notThis: string;
  proof: string;
  underPressure: string;
}

/** Một cược chiến lược. */
export interface StrategyBet {
  id: string;
  no: number;
  bet: string;
  instead: string;
  rationale: string;
  tradeoff: string;
  provesWrongIf: string;
}

/** Mẫu kế hoạch theo chu kỳ. */
export interface PlanTemplate {
  scope: 'day' | 'week' | 'month';
  name: string;
  variants: {
    label: string;
    when: string;
    minutes: number;
    blocks: {time: string; task: string; minutes: number}[];
  }[];
}

/** Một việc quan trọng trong danh sách 10. */
export interface KeyAction {
  no: number;
  action: string;
  why: string;
  minutes: string;
  nonNegotiable: boolean;
}

/** Chỉ số. */
export interface KpiSpec {
  id: string;
  name: string;
  type: 'dẫn' | 'trễ';
  cadence: string;
  target: string;
  redline: string;
  how: string;
}

/** Một nước đi tư duy trong nhóm 20%. */
export interface ParetoMove {
  id: string;
  no: number;
  move: string;
  share: string;
  from: string;
  to: string;
  trigger: string;
  script: string;
}

/** Một quy tắc thành công. */
export interface SuccessRule {
  no: number;
  rule: string;
  meaning: string;
  breach: string;
}

/** Một điểm làm khác với số đông. */
export interface Differentiator {
  id: string;
  what: string;
  mostPeople: string;
  iDo: string;
  edge: string;
}

/** Một nguyên mẫu người học — để tự định vị điểm mạnh. */
export interface Archetype {
  id: string;
  name: string;
  signs: string[];
  superpower: string;
  blindSpot: string;
  strategy: string[];
}

/* ==========================================================================
   CÁ NHÂN HOÁ — bộ câu hỏi và bộ máy suy dẫn kế hoạch riêng
   ========================================================================== */

export interface ProfileOption {
  id: string;
  label: string;
  hint?: string;
  /** Điểm cộng cho từng nguyên mẫu người học (chỉ dùng ở câu trắc nghiệm tính cách). */
  weights?: Record<string, number>;
}

export interface ProfileQuestion {
  id: string;
  section: string;
  question: string;
  help?: string;
  kind: 'single' | 'multi';
  options: ProfileOption[];
}

/** Câu trả lời của người dùng: id câu hỏi → id lựa chọn (hoặc mảng id). */
export type Profile = Record<string, string | string[]>;

export interface FeasibilityVerdict {
  status: 'du-da' | 'vua-khit' | 'cang' | 'khong-kha-thi';
  label: string;
  tone: 'emerald' | 'sky' | 'amber' | 'rose';
  message: string;
  levers: {name: string; detail: string}[];
}

export interface DerivedBlock {
  time: string;
  task: string;
  minutes: number;
  pillar: string;
}

export interface DerivedPlan {
  /* Định vị */
  entryMilestoneId: string;
  entryMilestoneName: string;
  bankedHours: number;
  targetBand: number;
  targetHours: number;
  hoursNeeded: number;
  monthsNeeded: number;
  deadlineMonths: number | null;
  feasibility: FeasibilityVerdict;

  /* Con người */
  primaryArchetypeId: string;
  secondaryArchetypeId: string | null;
  archetypeScores: {id: string; score: number}[];

  /* Ngân sách */
  dailyMinutes: number;
  /** Quỹ đã trừ 5 phút nghi thức — phần thật sự chia cho bốn trụ cột. */
  learningMinutes: number;
  /** Tổng phút nạp mỗi ngày, dùng để viết lại việc số 2 trong danh sách 10. */
  inputMinutes: number;
  commuteMinutes: number;
  effectiveMinutes: number;
  weeklyHours: number;
  allocation: {pillar: string; minutes: number; note: string}[];

  /* Nhịp */
  fullDay: DerivedBlock[];
  busyDay: DerivedBlock[];
  busyDayLabels: string[];
  clubsPerWeek: number;

  /* Nội dung */
  firstNarrowTopic: string;
  resourceIds: string[];
  excludedResourceIds: string[];
  dailyTenIds: number[];

  /* Rủi ro */
  risks: {level: 'cao' | 'trung' | 'thap'; title: string; why: string; fix: string}[];
  archetypeAdjustments: string[];
}

/* ==========================================================================
   HỌC VIỆN — tầng vận hành: triết lý, tháp học tập, cố vấn, cấp độ, chấm bài
   ========================================================================== */

export interface RootPrinciple {
  id: string;
  no: number;
  name: string;
  claim: string;
  rootQuestion: string;
  wrongWay: string;
  rightWay: string;
  consequence: string;
}

export interface PyramidTier {
  id: string;
  no: number;
  code: string;
  name: string;
  meaning: string;
  retention: string;
  mode: string;
  color: string;
  learnerDoes: string[];
  advisorDoes: string[];
  wowMoment: string;
}

export interface LevelBadge {
  id: string;
  tierId: string;
  no: number;
  name: string;
  epithet: string;
  entry: string;
  mission: string;
  challenge: string;
  passCriteria: string[];
  reward: string;
  unlocks: string;
}

/** Một bước trong vòng 11 bước chuẩn, áp cho mọi cấp độ. */
export interface CycleStep {
  no: number;
  phase: string;
  name: string;
  purpose: string;
  advisorScript: string;
  learnerAction: string;
  artifact: string;
  minutes: number;
}

export interface GitaPhase {
  letter: string;
  code: string;
  name: string;
  intent: string;
  advisorStance: string;
  moves: string[];
  nlpTools: string[];
  failureMode: string;
}

export interface NlpTechnique {
  id: string;
  name: string;
  vnName: string;
  origin: string;
  useWhen: string;
  script: string[];
  appliedTo: string;
  caution: string;
}

export interface EnvironmentLayer {
  id: string;
  layer: string;
  goal: string;
  setup: string[];
  antiPattern: string;
  check: string;
}

export interface AdvisorProtocol {
  id: string;
  situation: string;
  doNot: string;
  instead: string;
  questions: string[];
}

/** Một lỗi phổ biến kèm phác đồ khắc phục. */
export interface ErrorRemedy {
  id: string;
  code: string;
  skill: SkillId;
  error: string;
  example: {wrong: string; right: string};
  rootCause: string;
  severity: 'nặng' | 'vừa' | 'nhẹ';
  strategy: string;
  fixSteps: string[];
  drills: {name: string; minutes: number; how: string}[];
  masteredWhen: string;
}

export interface FeedbackSection {
  no: number;
  name: string;
  purpose: string;
  template: string;
  rule: string;
}

/** Bản thiết kế sản xuất một hạng mục học liệu. */
export interface ProductionSpec {
  id: string;
  kind: 'video' | 'audio' | 'tài liệu' | 'bộ ảnh' | 'công cụ';
  name: string;
  tier: string;
  quantity: string;
  duration: string;
  purpose: string;
  structure: {t: string; content: string}[];
  specs: string[];
  reusableAssets: string;
}

/* ==========================================================================
   CHU KỲ TỐC ĐỘ 21/90 NGÀY · DÀN GIỌNG · CHUẨN PHÁT ÂM ANH–ANH / ANH–MỸ
   ========================================================================== */

export interface SprintCycle {
  id: string;
  no: number;
  name: string;
  days: string;
  promise: string;
  focus: string;
  dailyMinutes: number;
  mechanism: string;
  exitTest: string;
}

export interface SprintDay {
  slot: string;
  clock: string;
  name: string;
  minutes: number;
  what: string;
  mechanism: string;
  appAction: string;
}

export interface LearningMechanism {
  id: string;
  name: string;
  claim: string;
  evidence: string;
  howWeUse: string;
  notThis: string;
}

export interface VoiceProfile {
  id: string;
  no: number;
  stageName: string;
  gender: 'nam' | 'nữ';
  accent: 'Anh–Mỹ' | 'Anh–Anh' | 'Tiếng Việt';
  age: string;
  character: string;
  bestFor: string;
  model: string;
  speaker: number;
  measured?: {f0: number; centroid: number; variation: number};
}

/**
 * Ngưỡng đo được của một tiêu chí dẫn.
 *
 * Có tiêu chí đo được bằng máy (tốc độ, cao độ, nhịp nghỉ) và có tiêu chí
 * không (thái độ, sự ấm áp). Tiêu chí nào không đo được thì để trống trường
 * này thay vì bịa ra một con số — một ngưỡng giả còn tệ hơn không có ngưỡng.
 */
export interface DeliveryBound {
  metric: string;
  min: number;
  max: number;
  unit: string;
  /** Cùng một tiêu chí có ngưỡng khác nhau cho giọng nam và giọng nữ. */
  scope?: 'nam' | 'nữ' | 'chung';
}

export interface DeliverySpec {
  id: string;
  aspect: string;
  target: string;
  why: string;
  howToDirect: string;
  bounds?: DeliveryBound[];
  /** Vì sao tiêu chí này không đo được bằng máy. */
  notMeasurable?: string;
}

export interface AccentContrast {
  id: string;
  feature: string;
  gb: string;
  us: string;
  example: string;
  teachAt: string;
  matters: string;
}

/* ==========================================================================
   HỆ KIỂM ĐỊNH & CHỨNG NHẬN — học viên và nhân sự
   ========================================================================== */

export interface Axis {
  id: string;
  no: number;
  name: string;
  what: string;
  measuredBy: string;
  failLooks: string;
}

export interface ExamTier {
  no: number;
  name: string;
  millerLevel: string;
  format: string;
  duration: string;
  scores: string;
  cannotFake: string;
}

export interface RoleLevel {
  no: number;
  name: string;
  epithet: string;
  canDo: string;
  cannotYet: string;
  passMark: number;
  tiersRequired: number[];
}

export interface RoleTrack {
  id: string;
  name: string;
  who: string;
  purpose: string;
  color: string;
  weights: {axis: string; pct: number}[];
  levels: RoleLevel[];
  cadence: string;
  recertify: string;
}

export interface GraduationExam {
  id: string;
  scope: 'vòng' | 'tầng';
  ref: string;
  name: string;
  when: string;
  duration: string;
  sections: {no: number; name: string; minutes: number; task: string; scores: string}[];
  passMark: string;
  ifFail: string;
  proctoring: string;
}

export interface TrainingModule {
  no: number;
  name: string;
  minutes: number;
  format: string;
  outcome: string;
  gate: string;
}

export interface TrainingCourse {
  id: string;
  role: string;
  level: string;
  name: string;
  totalHours: number;
  /** Số tuần của khoá. Nhịp học được SUY RA từ đây và totalHours. */
  weeks: number;
  cadence: string;
  promise: string;
  modules: TrainingModule[];
  certification: string;
  autoRemediation: string;
}

/* ==========================================================================
   HỒ SƠ 365 NGÀY
   ========================================================================== */

export interface DossierCycle {
  no: number;
  name: string;
  dayFrom: number;
  dayTo: number;
  narrowSkill: string;
  promise: string;
  mechanism: string;
  exitTest: string;
  dailyMinutes: number;
  missions: string[];
  /** Mã bài thi tốt nghiệp vòng trong data/exams.ts, nếu vòng đó đã có đề. */
  examId?: string;
}

export interface DossierQuarter {
  no: number;
  name: string;
  dayFrom: number;
  dayTo: number;
  cefrFrom: Cefr;
  cefrTo: Cefr;
  bigPromise: string;
  identityShift: string;
  cycles: DossierCycle[];
  consolidation: {name: string; dayFrom: number; dayTo: number; plan: string[]};
  graduation: {examId: string; note: string};
}

export type DossierDayKind =
  | 'luyện'
  | 'đối chiếu'
  | 'hợp nhất'
  | 'kiểm tra'
  | 'trắng';

export interface DossierBlock {
  slot: string;
  minutes: number;
  what: string;
}

export interface DossierDay {
  day: number;
  quarter: number;
  cycle: number;
  dayInCycle: number;
  week: number;
  weekday: string;
  kind: DossierDayKind;
  title: string;
  focus: string;
  targets: string;
  blocks: DossierBlock[];
  mission: string;
  measure: string;
  evidence: string;
  reviewDays: number[];
  minutes: number;
}

/* ==========================================================================
   ĐÁNH GIÁ ĐỊNH KỲ — TUẦN · 21 NGÀY · 90 NGÀY · CẢ HÀNH TRÌNH
   ========================================================================== */

export type AssessCadence = 'tuần' | '21 ngày' | '90 ngày' | 'hành trình';

export interface AssessItem {
  no: number;
  name: string;
  minutes: number;
  what: string;
  /** Ai chấm. Máy chấm được thì để máy — người chấm dành cho thứ máy không đo được. */
  scoredBy: 'máy' | 'người' | 'máy + người';
  evidence: string;
  passMark: string;
}

export interface AssessBattery {
  id: string;
  cadence: AssessCadence;
  name: string;
  when: string;
  totalMinutes: number;
  purpose: string;
  items: AssessItem[];
  /** Điểm rơi vào dải nào thì làm gì tiếp — quyết định, không phải nhận xét. */
  decision: {band: string; verdict: string; action: string}[];
}

/** Một cách gian lận, và cách hệ thống bắt được nó. */
export interface IntegrityRule {
  id: string;
  risk: string;
  signal: string;
  check: string;
  response: string;
}

export interface RewardTier {
  id: string;
  trigger: string;
  reward: string;
  why: string;
  /** Điều không thể đạt được bằng cách đi tắt. */
  cannotFake: string;
}

/** Một triệu chứng học viên gặp — mô tả theo cách họ tự nói ra. */
export interface Symptom {
  id: string;
  skill: SkillId;
  name: string;
  saidAs: string;
  rootCause: string;
  metric: string;
}

/** Một đơn kê: triệu chứng này, ở cấp độ này, làm gì. */
export interface Solution {
  id: string;
  symptomId: string;
  levelId: string;
  tier: number;
  diagnose: string;
  today: string;
  sevenDay: string;
  remeasure: string;
  escalate: string;
}

/** Một bước trong quy trình trợ lý AI. */
export interface AiStep {
  no: number;
  name: string;
  input: string;
  does: string;
  output: string;
  /** Chỗ bắt buộc con người quyết, AI không được tự quyết. */
  humanGate: string;
  limit: string;
}

/* ==========================================================================
   ĐÀO TẠO NÂNG CAO · KÈM CẶP 1-1 · THANG COACH · LỘ TRÌNH XUẤT SẮC
   ========================================================================== */

/** Một khối trong buổi kèm cặp một kèm một. */
export interface MentorBlock {
  slot: string;
  minutes: number;
  who: 'học viên nói' | 'cố vấn nói' | 'cả hai';
  what: string;
  why: string;
}

/** Nhịp kèm cặp thay đổi theo chặng — kèm dày lúc đầu, thưa dần về sau. */
export interface MentorStage {
  no: number;
  name: string;
  when: string;
  frequency: string;
  focus: string;
  handover: string;
}

/** Một bậc trên thang nghề coach. */
export interface CoachRung {
  no: number;
  name: string;
  epithet: string;
  entry: string;
  caseLoad: string;
  supervisedHours: number;
  soloHours: number;
  mustShow: string[];
  gate: string;
  canDo: string;
  cannotYet: string;
}

/** Một khoá đào tạo nâng cao cho bậc 4–5. */
export interface AdvancedCourse {
  id: string;
  role: string;
  level: string;
  name: string;
  entry: string;
  totalHours: number;
  /** Số tuần của khoá. Nhịp học được SUY RA từ đây và totalHours. */
  weeks: number;
  cadence: string;
  promise: string;
  modules: TrainingModule[];
  capstone: string;
  certification: string;
}

/** Một khác biệt của lộ trình xuất sắc so với lộ trình chuẩn. */
export interface ExcellenceShift {
  no: number;
  dimension: string;
  standard: string;
  excellence: string;
  why: string;
  cost: string;
}

/* ==========================================================================
   TRỢ LÝ AI CỦA HỌC VIỆN
   ========================================================================== */

/** Một gói khoá học — quyết định trợ lý được làm gì cho người này. */
export interface Package {
  id: string;
  name: string;
  who: string;
  humanContact: string;
  aiScope: string[];
  aiCannot: string[];
  upgradeWhen: string;
}

/** Một kho tri thức trợ lý được đọc, và giới hạn khi dùng nó. */
export interface KnowledgeSource {
  id: string;
  store: string;
  holds: string;
  usedFor: string;
  mustNot: string;
}

/** Một việc trợ lý làm được trong hội thoại. */
export interface DialogueAct {
  id: string;
  name: string;
  trigger: string;
  does: string;
  needs: string[];
  guardrail: string;
  handoff: string;
}

/** Một tín hiệu thói quen đo được. */
export interface HabitSignal {
  id: string;
  name: string;
  measures: string;
  source: string;
  healthy: string;
  warning: string;
  action: string;
}

/** Một nấc trên thang giữ chân khi học viên đang tuột. */
export interface PersistRung {
  no: number;
  trigger: string;
  name: string;
  aiDoes: string;
  tone: string;
  humanAt: string;
}

/* ==========================================================================
   MÔ THỨC GITA THẬT — lấy từ tài liệu gốc của học viện
   ========================================================================== */

/** Một bước trong hành trình 12 bước của học viên GITA. */
export interface GitaStep {
  no: number;
  phase: 'HIỂU MÌNH' | 'RÈN MÌNH' | 'BỨT PHÁ' | 'TRƯỞNG THÀNH';
  name: string;
  /** Tên một hai chữ, để tiêu đề 300 bài quét mắt được thay vì na ná nhau. */
  shortName: string;
  points: string[];
  months: string;
  englishRole: string;
}

/** Một luồng trong sơ đồ tư duy gốc: từ bàn đạp tới kỷ luật. */
export interface ThinkingLane {
  id: string;
  from: string;
  chain: string[];
  meaning: string;
}

/** Một phễu lọc — nơi thông điệp của cố vấn bị biến dạng trước khi tới học viên. */
export interface Filter {
  no: number;
  name: string;
  distorts: string;
  coachMove: string;
}

/** Một lối chiến lược rút từ mô hình BNI, chuyển sang bối cảnh học viện. */
export interface StrategicThread {
  no: number;
  bni: string;
  gita: string;
  what: string;
  fails: string;
}

/** Một bài định hướng trong bộ 300. */
export interface Lesson300 {
  no: number;
  step: number;
  phase: string;
  theme: string;
  rung: number;
  rungName: string;
  months: string;
  title: string;
  why: string;
  filter: string;
  blocks: {slot: string; minutes: number; what: string}[];
  deliverable: string;
  measure: string;
}

/* ==========================================================================
   LỘ TRÌNH LUYỆN THI CHUYÊN ANH VÀ LỚP CHẤT LƯỢNG CAO VÀO 10
   ========================================================================== */

/** Một phần của đề thi chuyên. */
export interface ExamPart {
  no: number;
  name: string;
  items: number;
  minutes: number;
  weight: number;
  whatItTests: string;
  commonLoss: string;
}

/** Một bậc năng lực sau bài test đầu vào. */
export interface Band {
  id: string;
  name: string;
  entryScore: string;
  months: number;
  feasible: string;
  focus: string[];
  dailyMinutes: number;
  honestNote: string;
}

/** Một giai đoạn của lộ trình 22 tháng. */
export interface ChuyenPhase {
  no: number;
  name: string;
  grade: string;
  months: string;
  goal: string;
  weekly: {block: string; sessions: number; minutes: number; what: string}[];
  exitGate: string;
  mock: string;
}

/** Một cấp phải vượt trên đường tới phòng thi. */
export interface ChuyenLevel {
  no: number;
  name: string;
  target: string;
  criteria: string[];
  ifStuck: string;
}

/** Một phác đồ nâng cấp cho phần đang yếu. */
export interface UpgradePlan {
  part: string;
  symptom: string;
  rootCause: string;
  drill: string;
  weeks: number;
  gain: string;
}

/* ==========================================================================
   HAI TUYẾN — tách lộ trình IELTS 8.0 khỏi lộ trình chuyên Anh vào 10
   ========================================================================== */

export type TuyenId = 'ielts' | 'chuyen';

/** Một tuyến học: đích riêng, đồng hồ riêng, hệ đo riêng. */
export interface Tuyen {
  id: TuyenId;
  icon: string;
  ten: string;
  phuDe: string;
  dich: string;
  doiTuong: string;
  batDau: string;
  soThang: number;
  nhipNgay: string;
  heDo: string;
  kyThi: string;
  /** Đo tuyệt đối (điểm không phụ thuộc thí sinh khác) hay tương đối (phải vượt điểm chuẩn). */
  kieuDo: 'tuyệt đối' | 'tương đối';
  thiLai: string;
  bacThang: string;
  mau: string;
}

/** Một trục mà hai tuyến đi khác nhau. */
export interface PhanKy {
  truc: string;
  ielts: string;
  chuyen: string;
  heQua: string;
}

/** Một phần lõi mà hai tuyến làm giống hệt nhau. */
export interface LoiChung {
  no: number;
  ten: string;
  vi: string;
  drillIds: string[];
}

/** Một kiểu lẫn tuyến, kèm cái giá phải trả. */
export interface NhamLan {
  ai: TuyenId;
  sai: string;
  vi: string;
  gia: string;
  dung: string;
}

/** Một đòn bẩy: việc nhỏ nhất tạo chênh lệch lớn nhất. */
export interface DonBay {
  ten: string;
  lam: string;
  vi: string;
  tuan: number;
  duoc: string;
  bo: string;
}

/** Một khối bắt buộc trong lõi ngày. */
export interface KhoiNgay {
  khoi: string;
  phut: number;
  lam: string;
  drillId?: string;
}

/** Một chặn đường: mốc phải dừng lại và trả lời thật. */
export interface ChanDuong {
  khi: string;
  hoi: string;
  neuKhong: string;
}

/** Phần tinh tuý đã lọc của một tuyến. */
export interface TinhTuy {
  tuyen: TuyenId;
  motTrang: string;
  loiNgay: KhoiNgay[];
  vongNgoai: string;
  donBay: DonBay[];
  catBo: {viec: string; vi: string}[];
  chanDuong: ChanDuong[];
}

/* ==========================================================================
   PHIẾU LUYỆN VÀ NHIỆM VỤ CHIA SẺ
   ========================================================================== */

/** Một phần trong phiếu. Năm phần nối nhau thành một chuỗi, không đảo được. */
export interface PhanPhieu {
  no: number;
  ma: 'KHOI' | 'MAU' | 'DAN' | 'TU' | 'CHUOI';
  ten: string;
  soCau: number;
  phut: number;
  lam: string;
  chuan: string;
  /** Phần trăm phần này đóng vào điểm phiếu. */
  trong: number;
}

/** Một phiếu luyện. */
export interface Phieu {
  id: string;
  no: number;
  skill: SkillId;
  dangId: string;
  dangTen: string;
  levelId: string;
  tier: number;
  capTrongTang: number;
  ten: string;
  mucTieu: string;
  hocLieu: string;
  phan: PhanPhieu[];
  tongCau: number;
  tongPhut: number;
  nguongDat: number;
  drillId: string;
  nhiemVuId: string;
  bayHayMac: string;
}

/** Nhiệm vụ chia sẻ đi kèm một phiếu. */
export interface NhiemVu {
  id: string;
  no: number;
  phieuId: string;
  /** Phần luyện trong hệ thống mà nhiệm vụ này được chia về. */
  phanLuyen: string;
  ten: string;
  viec: string;
  chiaSe: string;
  bangChung: string;
  phut: number;
  hanGio: string;
  diem: number;
}

/** Một bước trong luồng làm phiếu. */
export interface BuocLam {
  no: number;
  ma: string;
  ten: string;
  ai: 'học viên' | 'hệ thống' | 'trợ lý AI' | 'cố vấn';
  lam: string;
  raGi: string;
  chanNeu: string;
}

/** Kết quả chấm một phần. */
export interface DiemPhan {
  ma: string;
  ten: string;
  dung: number;
  soCau: number;
  tiLe: number;
  dat: boolean;
}

/** Kết quả chấm cả phiếu. */
export interface KetQuaPhieu {
  phieuId: string;
  tungPhan: DiemPhan[];
  tiLe: number;
  datKpi: boolean;
  phanYeuNhat: string;
  nhanXet: string;
  giaiPhap: string;
  dinhHuong: 'làm lại' | 'thử thách tiếp' | 'nâng cấp độ';
  buocKe: string;
}

/** Kết quả xét nâng giai đoạn theo KPI. */
export interface XetNangCap {
  soPhieu: number;
  trungBinh: number;
  soPhieuDat: number;
  tiLeDat: number;
  duDieuKien: boolean;
  vuongO: string;
  ketLuan: string;
}

/* ==========================================================================
   PHÂN QUYỀN
   ========================================================================== */

export type NhomQuyen =
  | 'học'
  | 'chấm'
  | 'hồ sơ'
  | 'lộ trình'
  | 'nội dung'
  | 'chứng nhận'
  | 'sản phẩm'
  | 'điều hành'
  | 'vận hành';

/** Một quyền cụ thể trong hệ thống. */
export interface Quyen {
  id: string;
  nhom: NhomQuyen;
  ten: string;
  lam: string;
  /** Vì sao quyền này phải chặn, chứ không mở cho tất cả. */
  viSaoChan: string;
  /** Cần hai người ký thì mới thực hiện được. */
  haiNguoi?: boolean;
  /** Phải ghi nhật ký kiểm toán. */
  ghiNhatKy?: boolean;
}

/** Một bậc quyền — một vai trò ở một nấc cụ thể. */
export interface BacQuyen {
  id: string;
  thang:
    | 'học viên'
    | 'giảng dạy'
    | 'gia đình'
    | 'kinh doanh'
    | 'sản phẩm'
    | 'điều hành'
    | 'vận hành';
  no: number;
  ten: string;
  ai: string;
  vao: string;
  /** Quyền được cấp thêm ở chính bậc này, ngoài những gì thừa kế từ bậc dưới. */
  themQuyen: string[];
  /** Bậc dưới liền kề trong cùng thang, nếu có. */
  keThua?: string;
  chuaDuoc: string;
}

/* ==========================================================================
   BÀI GIẢNG CHUYÊN SÂU
   ========================================================================== */

export type TruId = 'tu-duy' | 'kien-thuc' | 'ky-nang' | 'phuong-phap';

/** Một bài giảng chuyên sâu, sinh từ chủ đề × cấp độ. */
export interface BaiGiangSau {
  id: string;
  no: number;
  truId: TruId;
  truTen: string;
  chuDeId: string;
  ten: string;
  levelId: string;
  tier: number;
  /** Câu hỏi mà cả bài này tồn tại để trả lời. */
  cauHoiLoi: string;
  loi: string;
  viDu: string;
  hocLieu: string;
  phut: number;
  viecSauBai: string;
  tuKiem: string;
  bay: string;
  tuyen: ('ielts' | 'chuyen')[];
  /** 0 = bình thường, 1 = trọng yếu cho chuyên, 2 = trọng yếu cho hai trường khó nhất. */
  uuTien: 0 | 1 | 2;
  drillId: string;
  phieuDangId: string;
}

/* ==========================================================================
   GITA HOÁ — đưa mô thức vào gia đình, trường học, xã hội
   ========================================================================== */

export type SanId = 'gia-dinh' | 'truong-hoc' | 'xa-hoi';

/** Một bước GITA khi được đặt vào một sân cụ thể. */
export interface GitaHoa {
  buocNo: number;
  buocTen: string;
  phase: string;
  san: SanId;
  sanTen: string;
  bieuHien: string;
  viecNguoiLon: string;
  viecHocSinh: string;
  dangChay: string;
  dangHong: string;
}

/** Một tầng hấp thu của khách hàng. */
export interface TangHapThu {
  no: number;
  id: string;
  ten: string;
  ai: string;
  nhanGi: string;
  chieuSau: string;
  doDuoc: string;
  chuaHop: string;
}

/** Một cấp chuyên môn của người phục vụ, và độ sâu họ giao được. */
export interface CapChuyenMon {
  no: number;
  id: string;
  vaiTro: 'tư vấn' | 'giáo viên' | 'coach';
  ten: string;
  giaoDuocToiTang: number;
  lamDuoc: string[];
  chuaLamDuoc: string;
  nangCapBang: string;
}

/** Một chuẩn quốc tế mà hệ thống đối chiếu. */
export interface ChuanQuocTe {
  id: string;
  ten: string;
  nguon: string;
  noiLaGi: string;
  hethongLamGi: string;
  datToiDau: 'đạt' | 'đạt một phần' | 'chưa đạt';
  bangChung: string;
  conThieu: string;
}

/* ==========================================================================
   BỐN CHỮ CỦA MÔ THỨC GITA
   ========================================================================== */

/** Một chữ trong mô thức GITA, theo định nghĩa gốc của học viện. */
export interface ChuGita {
  chu: 'G' | 'I' | 'T' | 'A';
  tenAnh: string;
  tenViet: string;
  /** Các thành tố, giữ nguyên theo tài liệu gốc. */
  thanhTo: string[];
  laGi: string;
  viSaoCan: string;
  khiCo: string;
  khiThieu: string;
  doBang: string;
  noiVaoHeThong: string[];
}

/** Một cấp hành động theo quy tắc 20/80. */
export interface CapHanhDong {
  no: number;
  ten: string;
  moTa: string;
  phanTramCongSuc: number;
  phanTramKetQua: number;
  viDu: string;
  dauHieuSai: string;
}

/* ==========================================================================
   GIẢI ĐỀ VÀ HỒ SƠ HỌC VIÊN
   ========================================================================== */

/** Một bẫy cụ thể: học viên chọn gì, vì sao hấp dẫn, và sai chính xác ở đâu. */
export interface BayGiai {
  chon: string;
  viSaoHapDan: string;
  saiODau: string;
}

/** Bộ giải cho một dạng bài: đáp án đúng dựa trên cái gì, và sai thì sai ở đâu. */
export interface GiaiDe {
  dangId: string;
  dangTen: string;
  skill: SkillId;
  /** Những điểm kiến thức mà dạng bài này thật sự kiểm. */
  diemKienThuc: string[];
  /** Quy trình nghĩ đúng, theo từng bước, áp được cho mọi câu của dạng này. */
  cachNghi: string[];
  /** Ba lựa chọn sai hay gặp nhất. */
  bay: [BayGiai, BayGiai, BayGiai];
  /** Cách tự kiểm đáp án của mình trước khi nộp. */
  tuKiemDapAn: string;
  neuSai: string;
  baiGiangIds: string[];
  drillId: string;
}

/**
 * Một câu trong ngân hàng câu hỏi — có đáp án thật, dùng để làm trực tuyến.
 *
 * `nhanXet` có đúng bốn phần tử, cùng thứ tự với `luaChon`. Ô ứng với đáp án
 * đúng nói VÌ SAO NÓ ĐÚNG; ba ô còn lại nói chỗ lập luận gãy. Không ô nào
 * được bỏ trống — một ô trống là một chỗ học viên bấm vào mà không nhận lại
 * gì, và đó chính là thứ bài kiểm rỗng ruột phải bắt.
 */
export interface CauHoi {
  id: string;
  chuyenDeId: string;
  /** Mã loại phiếu mà câu này thuộc về: LT, DB, KN, NC, OT, TH, OC. */
  loaiMa: string;
  no: number;
  deBai: string;
  luaChon: [string, string, string, string];
  dapAn: number;
  giaiThich: string;
  nhanXet: [string, string, string, string];
  diemKienThuc: string;
  /** Bẫy số mấy của chuyên đề, nếu câu này dựng theo một bẫy có sẵn. */
  bayNo?: number;
}

/** Một lần làm phiếu đã lưu vào hồ sơ. */
export interface LanLam {
  id: string;
  phieuId: string;
  luc: string;
  dungTungPhan: number[];
  tiLe: number;
  datKpi: boolean;
  phanYeuNhat: string;
  skill: SkillId;
  levelId: string;
}

/** Phân tích tích luỹ từ toàn bộ hồ sơ. */
export interface PhanTichHoSo {
  soLan: number;
  soPhieuKhac: number;
  trungBinh: number;
  tiLeDat: number;
  xuHuong: 'đang lên' | 'đi ngang' | 'đang xuống' | 'chưa đủ dữ liệu';
  theoKyNang: {skill: SkillId; soLan: number; trungBinh: number}[];
  theoPhan: {ma: string; trungBinh: number}[];
  manhNhat: string;
  yeuNhat: string;
  chuoiNgay: number;
  canhBao: string[];
}

/** Một việc trong lộ trình cá nhân hoá sinh ra từ hồ sơ. */
export interface ViecCaNhan {
  uuTien: number;
  viec: string;
  viSao: string;
  bangChung: string;
  phieuGoiY: string;
  baiGiangGoiY: string;
  tuan: number;
}

/* ==========================================================================
   BỘ PHIẾU THEO CHUYÊN ĐỀ
   ========================================================================== */

/** Một loại phiếu trong bộ bảy của mỗi chuyên đề. */
export interface LoaiPhieu {
  no: number;
  ma: string;
  ten: string;
  mucDich: string;
  cauTruc: string[];
  phut: number;
  khiNaoLam: string;
  raGi: string;
  /** Phiếu giải đi kèm chứa những gì, riêng cho loại này. */
  giaiCo: string[];
  chanNeu: string;
}

/** Một phiếu cụ thể trong bộ chuyên đề. */
export interface PhieuChuyenDe {
  id: string;
  chuyenDeId: string;
  chuyenDeTen: string;
  skill: SkillId;
  loaiNo: number;
  loaiMa: string;
  loaiTen: string;
  ten: string;
  mucDich: string;
  cauTruc: string[];
  phut: number;
  khiNaoLam: string;
  raGi: string;
  chanNeu: string;
  giaiId: string;
}

/** Phiếu giải đi kèm một phiếu chuyên đề. */
export interface PhieuGiai {
  id: string;
  phieuId: string;
  chuyenDeId: string;
  ten: string;
  /** Bảng phân tích chuyên sâu: mỗi dòng một điểm kiến thức và độ sâu của nó. */
  bangPhanTich: {diem: string; banChat: string; hayNhamVoi: string}[];
  cachNghi: string[];
  bay: BayGiai[];
  tuKiem: string;
  neuSai: string;
  moKhiNao: string;
}
