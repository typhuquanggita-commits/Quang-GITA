/**
 * Application state.
 *
 * A single reducer owns everything the learner accumulates — attempts,
 * ability estimates, review schedule, plan, preferences — and persists it to
 * local storage behind a debounce. Keeping it in one place means an exported
 * backup is the complete record, and restoring one restores the whole app.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import type {
  Annotation,
  AppState,
  Attempt,
  IntegrityEvent,
  Locale,
  Preferences,
  Profile,
  Question,
  Response,
  ScoreReport,
  SectionId,
  SkillId,
  SrsCard,
  StudyPlan,
  TestForm,
  ThemeMode,
} from '../types.ts';
import { loadRaw, makeDebouncedSaver, migrate, SCHEMA_VERSION, clearAll } from '../lib/storage.ts';
import { addDays, isoDate, uid } from '../lib/util.ts';
import { estimateAbility } from '../engine/irt.ts';
import { newCard, review as reviewCard, type Grade } from '../engine/srs.ts';
import { isCorrect } from '../engine/scoring.ts';
import { QUESTION_BY_ID } from '../data/bank.ts';
import {
  seedOrg,
  currentAccount,
  classesForTeacher,
  type Account,
  type Assignment,
  type AuditEntry,
  type ClassRoom,
  type OrgState,
} from '../auth/model.ts';
import type { HabitEntry } from '../gita/habits.ts';
import type { AbsorptionTier, PractitionerLevel } from '../gita/framework.ts';
import { TIERS } from '../gita/framework.ts';
import {
  can,
  levelForScore,
  type Permission,
  type Principal,
  type RoleId,
  type TeacherRank,
} from '../auth/roles.ts';

/* ------------------------------------------------------------------ */
/* Defaults                                                            */
/* ------------------------------------------------------------------ */

export const DEFAULT_PREFERENCES: Preferences = {
  locale: 'vi',
  theme: 'system',
  fontScale: 1,
  dyslexicFont: false,
  reduceMotion: false,
  timeMultiplier: 1,
  proctoring: 'monitor',
  showTimerByDefault: true,
  soundCues: false,
};

export const DEFAULT_PROFILE: Profile = {
  name: '',
  email: '',
  targetScore: 1500,
  testDate: null,
  createdAt: Date.now(),
  onboarded: false,
};

function initialState(): AppState {
  return {
    version: SCHEMA_VERSION,
    profile: { ...DEFAULT_PROFILE },
    preferences: { ...DEFAULT_PREFERENCES },
    ability: {},
    sectionAbility: {
      rw: { theta: 0, se: 1, n: 0, updatedAt: Date.now() },
      math: { theta: 0, se: 1, n: 0, updatedAt: Date.now() },
    },
    attempts: [],
    forms: [],
    srs: {},
    plan: null,
    bookmarks: [],
    activity: {},
    lessons: {},
    packets: {},
    org: seedOrg('', ''),
    gita: {
      // A new learner starts at tier 1, whose habits are the only two that
      // matter before attendance is real.
      activeHabitIds: [...TIERS[1].habitIds],
      habitLog: [],
      selfReport: {},
      observedIndicators: [],
      practitionerLevel: null,
      tierOverride: null,
    },
    autopilot: { completedBlocks: {}, queue: null },
  };
}

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */

export type Action =
  | { type: 'hydrate'; state: AppState }
  | { type: 'reset' }
  | { type: 'profile/update'; patch: Partial<Profile> }
  | { type: 'prefs/update'; patch: Partial<Preferences> }
  | { type: 'form/add'; form: TestForm }
  | { type: 'attempt/start'; attempt: Attempt }
  | { type: 'attempt/patch'; id: string; patch: Partial<Attempt> }
  | { type: 'attempt/respond'; attemptId: string; questionId: string; patch: Partial<Response> }
  | { type: 'attempt/annotate'; attemptId: string; annotation: Annotation }
  | { type: 'attempt/unannotate'; attemptId: string; annotationId: string }
  | { type: 'attempt/integrity'; attemptId: string; event: IntegrityEvent }
  | { type: 'attempt/score'; attemptId: string; report: ScoreReport }
  | { type: 'attempt/delete'; attemptId: string }
  | { type: 'ability/record'; section: SectionId; skill: SkillId; question: Question; correct: boolean }
  | { type: 'srs/upsert'; card: SrsCard }
  | { type: 'srs/review'; ref: string; grade: Grade }
  | { type: 'srs/remove'; ref: string }
  | { type: 'plan/set'; plan: StudyPlan | null }
  | { type: 'plan/toggleTask'; taskId: string }
  | { type: 'bookmark/toggle'; questionId: string }
  | { type: 'activity/log'; seconds: number }
  | { type: 'lesson/read'; skill: SkillId }
  | { type: 'packet/sheetDone'; skill: SkillId; sheet: string }
  | { type: 'packet/reset'; skill: SkillId }
  | { type: 'org/seed'; name: string; email: string }
  | { type: 'org/switchAccount'; accountId: string }
  | { type: 'org/upsertAccount'; account: Account }
  | { type: 'org/removeAccount'; accountId: string }
  | { type: 'org/setRank'; accountId: string; rank: TeacherRank }
  | { type: 'org/setRole'; accountId: string; role: RoleId; rank?: TeacherRank }
  | { type: 'org/upsertClass'; room: ClassRoom }
  | { type: 'org/archiveClass'; classId: string }
  | { type: 'org/enroll'; classId: string; studentId: string }
  | { type: 'org/unenroll'; classId: string; studentId: string }
  | { type: 'org/upsertAssignment'; assignment: Assignment }
  | { type: 'org/removeAssignment'; assignmentId: string }
  | { type: 'org/submitAssignment'; assignmentId: string; accountId: string }
  | { type: 'org/audit'; entry: AuditEntry }
  | { type: 'gita/logHabit'; entry: HabitEntry }
  | { type: 'gita/setActiveHabits'; habitIds: string[] }
  | { type: 'gita/toggleHabit'; habitId: string }
  | { type: 'gita/selfReport'; dimensionId: string; value: 1 | 2 | 3 | 4 | 5 }
  | { type: 'gita/toggleIndicator'; indicatorId: string }
  | { type: 'gita/setPractitionerLevel'; level: PractitionerLevel | null }
  | { type: 'gita/setTierOverride'; tier: AbsorptionTier | null }
  | { type: 'autopilot/toggleBlock'; date: string; blockId: string }
  | { type: 'autopilot/queue'; blockId: string; questionIds: string[] }
  | { type: 'autopilot/clearQueue' };

/* ------------------------------------------------------------------ */
/* Reducer                                                             */
/* ------------------------------------------------------------------ */

function updateAttempt(state: AppState, id: string, update: (a: Attempt) => Attempt): AppState {
  let touched = false;
  const attempts = state.attempts.map((attempt) => {
    if (attempt.id !== id) return attempt;
    touched = true;
    return update(attempt);
  });
  return touched ? { ...state, attempts } : state;
}

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'hydrate':
      return action.state;

    case 'reset':
      return initialState();

    case 'profile/update':
      return { ...state, profile: { ...state.profile, ...action.patch } };

    case 'prefs/update':
      return { ...state, preferences: { ...state.preferences, ...action.patch } };

    case 'form/add':
      // Forms accumulate; trim the oldest so storage cannot grow without bound.
      return { ...state, forms: [action.form, ...state.forms].slice(0, 20) };

    case 'attempt/start':
      return { ...state, attempts: [action.attempt, ...state.attempts] };

    case 'attempt/patch':
      return updateAttempt(state, action.id, (a) => ({ ...a, ...action.patch }));

    case 'attempt/respond':
      return updateAttempt(state, action.attemptId, (attempt) => {
        const existing: Response = attempt.responses[action.questionId] ?? {
          questionId: action.questionId,
          value: null,
          correct: null,
          flagged: false,
          msSpent: 0,
          eliminated: [],
          visits: 0,
          lastChangedAt: null,
        };
        return {
          ...attempt,
          responses: {
            ...attempt.responses,
            [action.questionId]: { ...existing, ...action.patch },
          },
        };
      });

    case 'attempt/annotate':
      return updateAttempt(state, action.attemptId, (a) => ({
        ...a,
        annotations: [...a.annotations, action.annotation],
      }));

    case 'attempt/unannotate':
      return updateAttempt(state, action.attemptId, (a) => ({
        ...a,
        annotations: a.annotations.filter((x) => x.id !== action.annotationId),
      }));

    case 'attempt/integrity':
      return updateAttempt(state, action.attemptId, (a) => ({
        // Cap the log so a pathological session cannot exhaust storage.
        ...a,
        integrity: [...a.integrity, action.event].slice(-500),
      }));

    case 'attempt/score':
      return updateAttempt(state, action.attemptId, (a) => ({
        ...a,
        score: action.report,
        status: 'submitted',
        submittedAt: a.submittedAt ?? Date.now(),
      }));

    case 'attempt/delete':
      return { ...state, attempts: state.attempts.filter((a) => a.id !== action.attemptId) };

    case 'ability/record': {
      // Incremental Bayesian update: treat the current estimate as the prior
      // and fold in the single new response. Cheap, and it converges to the
      // same place as re-estimating over the whole history.
      const priorSkill = state.ability[action.skill] ?? { theta: 0, se: 1, n: 0, updatedAt: 0 };
      const skillResult = estimateAbility(
        [{ item: action.question.irt, correct: action.correct }],
        { mean: priorSkill.theta, sd: Math.max(0.35, priorSkill.se) },
      );

      const priorSection = state.sectionAbility[action.section];
      const sectionResult = estimateAbility(
        [{ item: action.question.irt, correct: action.correct }],
        { mean: priorSection.theta, sd: Math.max(0.25, priorSection.se) },
      );

      return {
        ...state,
        ability: {
          ...state.ability,
          [action.skill]: {
            theta: skillResult.theta,
            se: skillResult.se,
            n: priorSkill.n + 1,
            updatedAt: Date.now(),
          },
        },
        sectionAbility: {
          ...state.sectionAbility,
          [action.section]: {
            theta: sectionResult.theta,
            se: sectionResult.se,
            n: priorSection.n + 1,
            updatedAt: Date.now(),
          },
        },
      };
    }

    case 'srs/upsert':
      return { ...state, srs: { ...state.srs, [action.card.ref]: action.card } };

    case 'srs/review': {
      const card = state.srs[action.ref] ?? newCard(action.ref);
      return { ...state, srs: { ...state.srs, [action.ref]: reviewCard(card, action.grade) } };
    }

    case 'srs/remove': {
      const next = { ...state.srs };
      delete next[action.ref];
      return { ...state, srs: next };
    }

    case 'plan/set':
      return { ...state, plan: action.plan };

    case 'plan/toggleTask': {
      if (!state.plan) return state;
      return {
        ...state,
        plan: {
          ...state.plan,
          tasks: state.plan.tasks.map((task) =>
            task.id === action.taskId ? { ...task, done: !task.done } : task,
          ),
        },
      };
    }

    case 'bookmark/toggle': {
      const has = state.bookmarks.includes(action.questionId);
      return {
        ...state,
        bookmarks: has
          ? state.bookmarks.filter((id) => id !== action.questionId)
          : [...state.bookmarks, action.questionId],
      };
    }

    case 'activity/log': {
      const today = isoDate();
      return {
        ...state,
        activity: { ...state.activity, [today]: (state.activity[today] ?? 0) + action.seconds },
      };
    }

    case 'packet/sheetDone': {
      const today = isoDate();
      const prior = state.packets[action.skill];
      // A set, not a list: finishing the same sheet twice is a revisit, not a
      // second completion, and must not inflate progress.
      const done = prior?.done.includes(action.sheet)
        ? prior.done
        : [...(prior?.done ?? []), action.sheet];
      return {
        ...state,
        packets: { ...state.packets, [action.skill]: { done, lastWorkedAt: today } },
      };
    }

    case 'packet/reset': {
      const { [action.skill]: _removed, ...rest } = state.packets;
      return { ...state, packets: rest };
    }

    case 'lesson/read': {
      const today = isoDate();
      const prior = state.lessons[action.skill];
      return {
        ...state,
        lessons: {
          ...state.lessons,
          [action.skill]: {
            firstReadAt: prior?.firstReadAt ?? today,
            lastReadAt: today,
            reads: (prior?.reads ?? 0) + 1,
          },
        },
      };
    }

    /* ---------------- Organisation ---------------- */

    case 'org/seed':
      // Replaces the organisation only. Hydrating the whole state here would
      // silently revert anything dispatched alongside it, since the caller's
      // `state` is captured before the batch is applied.
      return { ...state, org: seedOrg(action.name, action.email) };

    case 'org/switchAccount':
      return { ...state, org: { ...state.org, currentAccountId: action.accountId } };

    case 'org/upsertAccount': {
      const exists = state.org.accounts.some((a) => a.id === action.account.id);
      return {
        ...state,
        org: {
          ...state.org,
          accounts: exists
            ? state.org.accounts.map((a) => (a.id === action.account.id ? action.account : a))
            : [...state.org.accounts, action.account],
        },
      };
    }

    case 'org/removeAccount': {
      // The signed-in account cannot remove itself; that would leave the
      // device with no principal and no way back in.
      if (action.accountId === state.org.currentAccountId) return state;
      return {
        ...state,
        org: {
          ...state.org,
          accounts: state.org.accounts.filter((a) => a.id !== action.accountId),
          classes: state.org.classes.map((room) => ({
            ...room,
            teacherIds: room.teacherIds.filter((id) => id !== action.accountId),
            studentIds: room.studentIds.filter((id) => id !== action.accountId),
          })),
        },
      };
    }

    case 'org/setRank':
      return {
        ...state,
        org: {
          ...state.org,
          accounts: state.org.accounts.map((a) =>
            a.id === action.accountId ? { ...a, rank: action.rank } : a,
          ),
        },
      };

    case 'org/setRole':
      return {
        ...state,
        org: {
          ...state.org,
          accounts: state.org.accounts.map((a) =>
            a.id === action.accountId
              ? {
                  ...a,
                  role: action.role,
                  // A rank is meaningful only for a teacher; dropping it on
                  // any other role keeps the record from implying authority
                  // the account no longer has.
                  rank: action.role === 'teacher' ? (action.rank ?? a.rank ?? 'assistant') : undefined,
                }
              : a,
          ),
        },
      };

    case 'org/upsertClass': {
      const exists = state.org.classes.some((c) => c.id === action.room.id);
      return {
        ...state,
        org: {
          ...state.org,
          classes: exists
            ? state.org.classes.map((c) => (c.id === action.room.id ? action.room : c))
            : [...state.org.classes, action.room],
        },
      };
    }

    case 'org/archiveClass':
      return {
        ...state,
        org: {
          ...state.org,
          classes: state.org.classes.map((c) =>
            c.id === action.classId ? { ...c, archivedAt: Date.now() } : c,
          ),
        },
      };

    case 'org/enroll':
      return {
        ...state,
        org: {
          ...state.org,
          classes: state.org.classes.map((c) =>
            c.id === action.classId && !c.studentIds.includes(action.studentId)
              ? { ...c, studentIds: [...c.studentIds, action.studentId] }
              : c,
          ),
        },
      };

    case 'org/unenroll':
      return {
        ...state,
        org: {
          ...state.org,
          classes: state.org.classes.map((c) =>
            c.id === action.classId
              ? { ...c, studentIds: c.studentIds.filter((id) => id !== action.studentId) }
              : c,
          ),
        },
      };

    case 'org/upsertAssignment': {
      const exists = state.org.assignments.some((a) => a.id === action.assignment.id);
      return {
        ...state,
        org: {
          ...state.org,
          assignments: exists
            ? state.org.assignments.map((a) => (a.id === action.assignment.id ? action.assignment : a))
            : [...state.org.assignments, action.assignment],
        },
      };
    }

    case 'org/removeAssignment':
      return {
        ...state,
        org: {
          ...state.org,
          assignments: state.org.assignments.filter((a) => a.id !== action.assignmentId),
        },
      };

    case 'org/submitAssignment':
      return {
        ...state,
        org: {
          ...state.org,
          assignments: state.org.assignments.map((a) =>
            a.id === action.assignmentId && !a.submittedBy.includes(action.accountId)
              ? { ...a, submittedBy: [...a.submittedBy, action.accountId] }
              : a,
          ),
        },
      };

    case 'org/audit':
      // Newest first, and bounded: an append-only log still has to fit.
      return {
        ...state,
        org: { ...state.org, audit: [action.entry, ...state.org.audit].slice(0, 1000) },
      };

    /* ---------------- GITA ---------------- */

    case 'gita/logHabit': {
      // One entry per habit per day: logging the same habit twice records a
      // correction, not a second occurrence, so adherence cannot be inflated
      // by tapping the same button repeatedly.
      const rest = state.gita.habitLog.filter(
        (entry) => !(entry.habitId === action.entry.habitId && entry.date === action.entry.date),
      );
      return {
        ...state,
        gita: { ...state.gita, habitLog: [...rest, action.entry].slice(-2000) },
      };
    }

    case 'gita/setActiveHabits':
      return { ...state, gita: { ...state.gita, activeHabitIds: action.habitIds } };

    case 'gita/toggleHabit': {
      const active = state.gita.activeHabitIds;
      return {
        ...state,
        gita: {
          ...state.gita,
          activeHabitIds: active.includes(action.habitId)
            ? active.filter((id) => id !== action.habitId)
            : [...active, action.habitId],
        },
      };
    }

    case 'gita/selfReport':
      return {
        ...state,
        gita: {
          ...state.gita,
          selfReport: { ...state.gita.selfReport, [action.dimensionId]: action.value },
        },
      };

    case 'gita/toggleIndicator': {
      const observed = state.gita.observedIndicators;
      return {
        ...state,
        gita: {
          ...state.gita,
          observedIndicators: observed.includes(action.indicatorId)
            ? observed.filter((id) => id !== action.indicatorId)
            : [...observed, action.indicatorId],
        },
      };
    }

    case 'gita/setPractitionerLevel':
      return { ...state, gita: { ...state.gita, practitionerLevel: action.level } };

    case 'gita/setTierOverride':
      return { ...state, gita: { ...state.gita, tierOverride: action.tier } };

    /* ---------------- Autopilot ---------------- */

    case 'autopilot/toggleBlock': {
      const forDate = state.autopilot.completedBlocks[action.date] ?? [];
      const next = forDate.includes(action.blockId)
        ? forDate.filter((id) => id !== action.blockId)
        : [...forDate, action.blockId];

      // Keep only a recent window of days. Completion older than that answers
      // no question anyone asks, and the log would otherwise grow forever.
      const cutoff = addDays(isoDate(), -60);
      const trimmed: Record<string, string[]> = {};
      for (const [date, ids] of Object.entries({ ...state.autopilot.completedBlocks, [action.date]: next })) {
        if (date >= cutoff && ids.length > 0) trimmed[date] = ids;
      }

      return { ...state, autopilot: { ...state.autopilot, completedBlocks: trimmed } };
    }

    case 'autopilot/queue':
      return {
        ...state,
        autopilot: {
          ...state.autopilot,
          queue: { blockId: action.blockId, questionIds: action.questionIds },
        },
      };

    case 'autopilot/clearQueue':
      return { ...state, autopilot: { ...state.autopilot, queue: null } };

    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

interface StoreValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  /** Records an answer everywhere it needs to go, in one call. */
  answerQuestion(input: {
    attemptId: string;
    question: Question;
    value: string | null;
    msSpent: number;
    /** Practice records ability immediately; a timed exam waits for scoring. */
    updateAbility: boolean;
  }): boolean;
  exportState(): string;
  importState(json: string): { ok: true } | { ok: false; error: string };
  resetAll(): void;
  /** The signed-in account expressed as an authorisation principal. */
  principal: Principal;
  /** Permission check for the signed-in account. */
  allows(permission: Permission): boolean;
  /**
   * Records a privileged action. Call this at the point the action happens,
   * not where it is rendered, so the log reflects what was done rather than
   * what was displayed.
   */
  audit(entry: Omit<AuditEntry, 'id' | 'at' | 'actorId' | 'actorRole'>): void;
}

const StoreContext = createContext<StoreValue | null>(null);

function loadInitial(): AppState {
  const migrated = migrate(loadRaw());
  if (!migrated) return initialState();
  const base = initialState();
  // Merge field by field so a payload written by an older build that lacks a
  // newer key still produces a complete state object.
  return {
    ...base,
    ...(migrated as Partial<AppState>),
    profile: { ...base.profile, ...((migrated as Partial<AppState>).profile ?? {}) },
    preferences: { ...base.preferences, ...((migrated as Partial<AppState>).preferences ?? {}) },
    sectionAbility: { ...base.sectionAbility, ...((migrated as Partial<AppState>).sectionAbility ?? {}) },
    gita: { ...base.gita, ...((migrated as Partial<AppState>).gita ?? {}) },
    autopilot: { ...base.autopilot, ...((migrated as Partial<AppState>).autopilot ?? {}) },
    lessons: { ...base.lessons, ...((migrated as Partial<AppState>).lessons ?? {}) },
    packets: { ...base.packets, ...((migrated as Partial<AppState>).packets ?? {}) },
    version: SCHEMA_VERSION,
  };
}

export function StoreProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);
  const save = useRef(makeDebouncedSaver(500)).current;

  useEffect(() => {
    save(state);
  }, [state, save]);

  /**
   * Write any pending state the moment the page is hidden.
   *
   * `pagehide` and a hidden `visibilitychange` are the last reliable moments a
   * browser gives a page — `beforeunload` is not fired on mobile, and a tab
   * discarded in the background never unloads at all. Without this, an action
   * taken inside the debounce window is lost on reload, which is exactly when
   * a learner is most likely to notice.
   */
  useEffect(() => {
    const flush = () => save.flush();
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flush();
    };

    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pagehide', flush);
      document.removeEventListener('visibilitychange', onVisibility);
      flush();
    };
  }, [save]);

  const answerQuestion = useCallback<StoreValue['answerQuestion']>(
    ({ attemptId, question, value, msSpent, updateAbility }) => {
      const correct = value === null ? false : isCorrect(question, value);

      dispatch({
        type: 'attempt/respond',
        attemptId,
        questionId: question.id,
        patch: { value, correct, msSpent, lastChangedAt: Date.now() },
      });

      if (updateAbility) {
        dispatch({
          type: 'ability/record',
          section: question.section,
          skill: question.skill,
          question,
          correct,
        });
      }

      // Every miss enters the spaced-repetition schedule; a hit on a card
      // already in the schedule is graded so it can eventually retire.
      const ref = `q:${question.id}`;
      if (!correct) {
        dispatch({ type: 'srs/review', ref, grade: 1 });
      }

      return correct;
    },
    [],
  );

  const exportState = useCallback(
    () => JSON.stringify({ ...state, exportedAt: new Date().toISOString(), app: 'SAT365' }, null, 2),
    [state],
  );

  const importState = useCallback((json: string): { ok: true } | { ok: false; error: string } => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      return { ok: false, error: 'File is not valid JSON.' };
    }
    const migrated = migrate(parsed);
    if (!migrated) return { ok: false, error: 'Backup was written by an incompatible version.' };
    const base = initialState();
    dispatch({
      type: 'hydrate',
      state: {
        ...base,
        ...(migrated as Partial<AppState>),
        profile: { ...base.profile, ...((migrated as Partial<AppState>).profile ?? {}) },
        preferences: { ...base.preferences, ...((migrated as Partial<AppState>).preferences ?? {}) },
        gita: { ...base.gita, ...((migrated as Partial<AppState>).gita ?? {}) },
        autopilot: { ...base.autopilot, ...((migrated as Partial<AppState>).autopilot ?? {}) },
    lessons: { ...base.lessons, ...((migrated as Partial<AppState>).lessons ?? {}) },
    packets: { ...base.packets, ...((migrated as Partial<AppState>).packets ?? {}) },
        version: SCHEMA_VERSION,
      } as AppState,
    });
    return { ok: true };
  }, []);

  const resetAll = useCallback(() => {
    clearAll();
    dispatch({ type: 'reset' });
  }, []);

  /**
   * The principal is derived from stored state on every render rather than
   * cached: a rank change or an account switch must take effect immediately,
   * and a stale principal is exactly the bug that grants authority someone no
   * longer holds.
   */
  const principal = useMemo<Principal>(() => {
    const account = currentAccount(state.org);
    if (!account || account.suspendedAt) {
      // A missing or suspended account falls back to the least authority that
      // still lets someone study, never to a default that grants more.
      return { role: 'student' };
    }
    return {
      role: account.role,
      rank: account.rank,
      classIds: classesForTeacher(state.org, account.id).map((room) => room.id),
    };
  }, [state.org]);

  const allows = useCallback(
    (permission: Permission) => can(principal, permission),
    [principal],
  );

  const audit = useCallback<StoreValue['audit']>(
    (entry) => {
      const account = currentAccount(state.org);
      dispatch({
        type: 'org/audit',
        entry: {
          id: uid('aud'),
          at: Date.now(),
          actorId: account?.id ?? 'unknown',
          actorRole: account?.role ?? 'student',
          ...entry,
        },
      });
    },
    [state.org],
  );

  const value = useMemo<StoreValue>(
    () => ({
      state,
      dispatch,
      answerQuestion,
      exportState,
      importState,
      resetAll,
      principal,
      allows,
      audit,
    }),
    [state, answerQuestion, exportState, importState, resetAll, principal, allows, audit],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore must be used inside <StoreProvider>');
  return value;
}

export function useAppState(): AppState {
  return useStore().state;
}

export function usePreferences(): Preferences {
  return useStore().state.preferences;
}

/* ------------------------------------------------------------------ */
/* Selectors                                                           */
/* ------------------------------------------------------------------ */

export function selectAttempt(state: AppState, id: string | null): Attempt | undefined {
  return id ? state.attempts.find((a) => a.id === id) : undefined;
}

export function selectInProgressAttempt(state: AppState): Attempt | undefined {
  return state.attempts.find((a) => a.status === 'in-progress');
}

export function selectScoredAttempts(state: AppState): Attempt[] {
  return state.attempts
    .filter((a) => a.status === 'submitted' && a.score)
    .sort((a, b) => (b.submittedAt ?? 0) - (a.submittedAt ?? 0));
}

export function selectMissedQuestions(state: AppState): Question[] {
  const ids = new Set<string>();
  for (const attempt of state.attempts) {
    for (const response of Object.values(attempt.responses)) {
      if (response.correct === false) ids.add(response.questionId);
    }
  }
  return [...ids].map((id) => QUESTION_BY_ID.get(id)).filter((q): q is Question => Boolean(q));
}

/** Every question the learner has already been served, for exposure control. */
export function selectExposure(state: AppState): Record<string, number> {
  const exposure: Record<string, number> = {};
  for (const attempt of state.attempts) {
    for (const id of Object.keys(attempt.responses)) {
      exposure[id] = (exposure[id] ?? 0) + 1;
    }
  }
  return exposure;
}

/* ------------------------------------------------------------------ */
/* Authorisation hooks                                                 */
/* ------------------------------------------------------------------ */

export function usePrincipal(): Principal {
  return useStore().principal;
}

export function useCan(permission: Permission): boolean {
  return useStore().allows(permission);
}

export function useCurrentAccount(): Account | undefined {
  const { state } = useStore();
  return currentAccount(state.org);
}

export function useOrg(): OrgState {
  return useStore().state.org;
}

/**
 * The learner's earned level, recomputed from their most recent scored
 * attempt. A level is never stored as the source of truth — it is what the
 * evidence currently says, so it cannot drift away from the record.
 */
export function useStudentLevel(): { level: ReturnType<typeof levelForScore>; total: number | null } {
  const { state } = useStore();
  const scored = selectScoredAttempts(state);
  const total = scored[0]?.score?.total ?? null;
  return { level: levelForScore(total ?? 400), total };
}

export function makeAttempt(input: {
  mode: Attempt['mode'];
  form: TestForm;
  label: string;
  moduleIds: string[];
  timeMultiplier: number;
}): Attempt {
  return {
    id: uid('att'),
    mode: input.mode,
    formId: input.form.id,
    label: input.label,
    startedAt: Date.now(),
    submittedAt: null,
    status: 'in-progress',
    deliveredModuleIds: input.moduleIds,
    currentModuleIndex: 0,
    currentQuestionIndex: 0,
    moduleDeadline: null,
    responses: {},
    annotations: [],
    integrity: [],
    timeMultiplier: input.timeMultiplier,
    onBreak: false,
    breakDeadline: null,
  };
}

export type { Locale, ThemeMode };
