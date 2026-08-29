/**
 * SAT365 — core domain model.
 *
 * The vocabulary here mirrors the College Board's Digital SAT Suite
 * specification (assessment framework, 2024 onward) so that content authored
 * for SAT365 can be mapped onto official blueprints without translation.
 */

/* ------------------------------------------------------------------ */
/* Test structure                                                      */
/* ------------------------------------------------------------------ */

/** The two scored sections of the Digital SAT. */
export type SectionId = 'rw' | 'math';

/** Content domains, as named in the official assessment framework. */
export type DomainId =
  // Reading and Writing
  | 'information-ideas'
  | 'craft-structure'
  | 'expression-of-ideas'
  | 'standard-english-conventions'
  // Math
  | 'algebra'
  | 'advanced-math'
  | 'problem-solving-data'
  | 'geometry-trigonometry';

/** Skill/knowledge testing points beneath each domain. */
export type SkillId = string;

export interface Skill {
  id: SkillId;
  domain: DomainId;
  /** English label — the canonical College Board wording. */
  label: string;
  /** Vietnamese label for the localised UI. */
  labelVi: string;
}

export interface Domain {
  id: DomainId;
  section: SectionId;
  label: string;
  labelVi: string;
  /** Share of operational items drawn from this domain, as a fraction. */
  weight: number;
  skills: Skill[];
}

/* ------------------------------------------------------------------ */
/* Items                                                               */
/* ------------------------------------------------------------------ */

export type QuestionFormat =
  /** Four-option multiple choice. */
  | 'mcq'
  /** Student-produced response (grid-in); Math only. */
  | 'spr';

/**
 * Item response theory parameters under the two-parameter logistic model.
 * `a` is discrimination, `b` is difficulty on the theta scale.
 */
export interface IrtParams {
  a: number;
  b: number;
}

export type DifficultyBand = 'easy' | 'medium' | 'hard';

export interface Stimulus {
  /** Passage, prompt text, or scenario shown above the question. */
  text: string;
  /** Optional attribution line rendered in small caps beneath the text. */
  source?: string;
  /** Optional table rendered as an accessible <table>. */
  table?: { caption?: string; headers: string[]; rows: string[][] };
  /** Optional inline figure, expressed as a self-describing spec. */
  figure?: FigureSpec;
}

/**
 * Figures are described declaratively rather than shipped as images so they
 * stay crisp, theme-aware, and screen-reader accessible.
 */
export type FigureSpec =
  | { kind: 'scatter'; alt: string; xLabel: string; yLabel: string; points: Array<[number, number]>; line?: { slope: number; intercept: number } }
  | { kind: 'bar'; alt: string; xLabel: string; yLabel: string; categories: string[]; values: number[] }
  | { kind: 'line'; alt: string; xLabel: string; yLabel: string; series: Array<{ name: string; points: Array<[number, number]> }> }
  | { kind: 'triangle'; alt: string; labels: { a: string; b: string; c: string }; right?: boolean }
  | { kind: 'circle'; alt: string; radiusLabel: string; annotations?: string[] };

export interface Choice {
  /** 'A' | 'B' | 'C' | 'D' */
  id: string;
  text: string;
}

export interface Question {
  id: string;
  section: SectionId;
  domain: DomainId;
  skill: SkillId;
  format: QuestionFormat;
  band: DifficultyBand;
  irt: IrtParams;
  stimulus?: Stimulus;
  prompt: string;
  /** Present for `mcq`. */
  choices?: Choice[];
  /**
   * Correct answer. For `mcq` this is a choice id. For `spr` it is a list of
   * accepted canonical forms (e.g. ['3/4', '0.75', '.75']).
   */
  answer: string | string[];
  /** Worked explanation shown in review. */
  explanation: string;
  /** Common-trap analysis keyed by choice id, shown in review for MCQ. */
  distractorNotes?: Record<string, string>;
  /** Whether a calculator is expected to be useful (Math only, informational). */
  calculatorUseful?: boolean;
  /** Median seconds a well-prepared student needs; drives pacing analytics. */
  targetSeconds: number;
  /** Provenance so every item is traceable to its author and review status. */
  provenance?: {
    author: string;
    reviewed: boolean;
    /** ISO date the item entered the bank. */
    added: string;
  };
}

/* ------------------------------------------------------------------ */
/* Delivery: modules, forms, attempts                                  */
/* ------------------------------------------------------------------ */

export type ModulePathway = 'routing' | 'upper' | 'lower';

export interface TestModule {
  id: string;
  section: SectionId;
  /** 1 = routing module, 2 = adaptive second-stage module. */
  stage: 1 | 2;
  pathway: ModulePathway;
  /** Allotted time in seconds, before accommodations are applied. */
  durationSeconds: number;
  questionIds: string[];
  /** Ids within `questionIds` that are pretest (unscored) items. */
  pretestIds: string[];
}

/** A fully assembled, deliverable test form. */
export interface TestForm {
  id: string;
  label: string;
  createdAt: number;
  /** Modules in delivery order; stage-2 modules are chosen at runtime. */
  modules: TestModule[];
  /** Seconds of break between the RW and Math sections. */
  breakSeconds: number;
}

export type ResponseFlagState = boolean;

export interface Response {
  questionId: string;
  /** Choice id for MCQ, raw typed string for SPR, null if omitted. */
  value: string | null;
  correct: boolean | null;
  flagged: ResponseFlagState;
  /** Milliseconds of active time spent with this question on screen. */
  msSpent: number;
  /** Choice ids the student struck through with the answer eliminator. */
  eliminated: string[];
  /** Number of times the student revisited the question. */
  visits: number;
  /** Order in which the answer was last changed, for behavioural analytics. */
  lastChangedAt: number | null;
}

export type AttemptMode = 'full-test' | 'section-test' | 'practice' | 'diagnostic';

export type AttemptStatus = 'in-progress' | 'submitted' | 'abandoned';

export interface Annotation {
  id: string;
  questionId: string;
  /** Character offsets into the stimulus text. */
  start: number;
  end: number;
  color: 'yellow' | 'blue' | 'pink' | 'green';
  note?: string;
}

/** A single logged integrity event during a proctored delivery. */
export interface IntegrityEvent {
  at: number;
  kind:
    | 'blur'
    | 'focus'
    | 'fullscreen-exit'
    | 'fullscreen-enter'
    | 'copy-blocked'
    | 'paste-blocked'
    | 'context-menu-blocked'
    | 'resize'
    | 'resume';
  detail?: string;
}

export interface Attempt {
  id: string;
  mode: AttemptMode;
  formId: string;
  label: string;
  startedAt: number;
  submittedAt: number | null;
  status: AttemptStatus;
  /** Modules actually delivered, in order, after adaptive routing. */
  deliveredModuleIds: string[];
  /** Index into `deliveredModuleIds`. */
  currentModuleIndex: number;
  currentQuestionIndex: number;
  /** Unix ms at which the current module's clock expires. */
  moduleDeadline: number | null;
  responses: Record<string, Response>;
  annotations: Annotation[];
  integrity: IntegrityEvent[];
  /** Extended-time multiplier granted as an accommodation (1, 1.5, or 2). */
  timeMultiplier: number;
  /** Set once the attempt is scored. */
  score?: ScoreReport;
  /** True while the 10-minute inter-section break is running. */
  onBreak?: boolean;
  breakDeadline?: number | null;
}

/* ------------------------------------------------------------------ */
/* Scoring                                                             */
/* ------------------------------------------------------------------ */

export interface SkillPerformance {
  skill: SkillId;
  domain: DomainId;
  attempted: number;
  correct: number;
  /** Mean seconds per attempted item. */
  meanSeconds: number;
  /** 0–1 mastery estimate blended from accuracy and item difficulty. */
  mastery: number;
}

export interface SectionScore {
  section: SectionId;
  /** Scaled score, 200–800, rounded to the nearest 10. */
  scaled: number;
  /** Standard error of measurement on the scaled metric. */
  sem: number;
  /** Ability estimate on the logit scale. */
  theta: number;
  rawCorrect: number;
  rawAttempted: number;
  operationalCount: number;
  /** Which stage-2 module the student routed into. */
  pathway: ModulePathway;
  domains: Array<{ domain: DomainId; attempted: number; correct: number; mastery: number }>;
  skills: SkillPerformance[];
}

export interface ScoreReport {
  attemptId: string;
  scoredAt: number;
  total: number;
  /** ±1 SEM band on the total score. */
  totalBand: [number, number];
  sections: SectionScore[];
  /** Percentile against the reference distribution. */
  percentile: number;
  /** Whether each section met the SAT college-readiness benchmark. */
  benchmarks: Array<{ section: SectionId; benchmark: number; met: boolean }>;
  pacing: {
    section: SectionId;
    medianSeconds: number;
    targetSeconds: number;
    rushedCount: number;
    overrunCount: number;
  }[];
}

/* ------------------------------------------------------------------ */
/* Learner state                                                       */
/* ------------------------------------------------------------------ */

/** SM-2 style scheduling record for one reviewable object. */
export interface SrsCard {
  id: string;
  /** 'q:<questionId>' or 'v:<wordId>' */
  ref: string;
  easiness: number;
  intervalDays: number;
  repetitions: number;
  dueAt: number;
  lapses: number;
  lastGrade: number | null;
}

export interface VocabWord {
  id: string;
  word: string;
  pos: string;
  definition: string;
  definitionVi: string;
  example: string;
  synonyms: string[];
  /** SAT tier: 1 = high-frequency academic, 2 = mid, 3 = low-frequency. */
  tier: 1 | 2 | 3;
}

export interface AbilityEstimate {
  theta: number;
  /** Standard error of the estimate. */
  se: number;
  /** Number of responses folded into this estimate. */
  n: number;
  updatedAt: number;
}

export interface StudyPlanTask {
  id: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  kind: 'practice' | 'review' | 'vocab' | 'full-test' | 'rest';
  section?: SectionId;
  skill?: SkillId;
  minutes: number;
  title: string;
  done: boolean;
}

export interface StudyPlan {
  createdAt: number;
  testDate: string;
  targetScore: number;
  baselineScore: number | null;
  hoursPerWeek: number;
  tasks: StudyPlanTask[];
}

/**
 * Learner-side state for the GITA training model.
 *
 * Deliberately holds only what cannot be derived. Pillar scores and the
 * absorption tier are recomputed from evidence on every read, so they can
 * never drift away from what the learner has actually done.
 */
export interface GitaState {
  /** Habit ids the learner has currently taken on. */
  activeHabitIds: string[];
  /** One entry per habit occurrence, kept as a flat log. */
  habitLog: import('./gita/habits.ts').HabitEntry[];
  /** Self-ratings, 1-5, keyed by dimension id. */
  selfReport: Record<string, 1 | 2 | 3 | 4 | 5>;
  /** Transfer indicator ids a coach or learner has marked as observed. */
  observedIndicators: string[];
  /** Practitioner level, when this account delivers the model to others. */
  practitionerLevel: import('./gita/framework.ts').PractitionerLevel | null;
  /** A tier set manually by a coach, overriding the evidence-based placement. */
  tierOverride: import('./gita/framework.ts').AbsorptionTier | null;
}

/**
 * State for the automated coach.
 *
 * The programme itself is never stored — it is derived from evidence on every
 * read, so it cannot go stale against what the learner has since done. Only
 * the two things that are genuinely new information live here: which blocks
 * have been cleared, and the item set a drill handed to the practice surface.
 */
export interface AutopilotState {
  /** Cleared block keys, by ISO date. Trimmed to a recent window. */
  completedBlocks: Record<string, string[]>;
  /** Items a block queued for the practice surface to run next. */
  queue: { blockId: string; questionIds: string[] } | null;
}

export type ThemeMode = 'light' | 'dark' | 'system' | 'high-contrast';
export type Locale = 'vi' | 'en';

export interface Preferences {
  locale: Locale;
  theme: ThemeMode;
  /** Root font scale, 1 = 100%. */
  fontScale: number;
  dyslexicFont: boolean;
  reduceMotion: boolean;
  /** Time-and-a-half etc. applied to every timed delivery. */
  timeMultiplier: number;
  /** Proctoring level for full-length deliveries. */
  proctoring: 'off' | 'monitor' | 'strict';
  showTimerByDefault: boolean;
  soundCues: boolean;
}

export interface Profile {
  name: string;
  email: string;
  targetScore: number;
  testDate: string | null;
  createdAt: number;
  onboarded: boolean;
}

export interface AppState {
  /** Schema version, for forward-compatible migrations. */
  version: number;
  /** Accounts, classes, assignments, and the audit log. */
  org: import('./auth/model.ts').OrgState;
  /** The GITA training layer: habits, self-report, and transfer evidence. */
  gita: GitaState;
  /** What the automated coach has queued and what the learner has cleared. */
  autopilot: AutopilotState;
  profile: Profile;
  preferences: Preferences;
  /** Per-skill ability estimates driving the adaptive practice engine. */
  ability: Record<SkillId, AbilityEstimate>;
  /** Section-level ability, used to seed forms and predict scores. */
  sectionAbility: Record<SectionId, AbilityEstimate>;
  attempts: Attempt[];
  forms: TestForm[];
  srs: Record<string, SrsCard>;
  plan: StudyPlan | null;
  /** Ids of questions the learner bookmarked outside of an attempt. */
  bookmarks: string[];
  /** Aggregate seconds studied per ISO date, for the streak/heatmap. */
  activity: Record<string, number>;
  /** Which skill lessons have been read, keyed by skill id. */
  lessons: Record<SkillId, LessonProgress>;
}

/**
 * A learner's history with one lesson.
 *
 * Kept because instruction and practice are different acts: knowing that a
 * learner has drilled Transitions forty times says nothing about whether
 * anyone ever explained Transitions to them, and the coach needs to be able
 * to tell those apart before it prescribes a fifth round of the same drill.
 */
export interface LessonProgress {
  /** Local calendar date the lesson was first read to the end. */
  firstReadAt: string;
  lastReadAt: string;
  reads: number;
}
