/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/* ==========================================================================
   ENGWILL365 — Kiểu dữ liệu lõi của hệ thống học tiếng Anh 0 → IELTS 8.0
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
  drillId?: string;
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
