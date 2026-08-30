/**
 * Turning a stored or imported payload back into application state.
 *
 * Two callers restore state from something the app did not just produce:
 * `loadInitial` reads local storage, and `importState` reads a file the user
 * chose. Both were hand-merging the same slices inline, and the two copies had
 * already drifted — the import path had lost `sectionAbility`, so restoring a
 * backup on a new device silently reset both section ability estimates to
 * θ = 0 while every other estimate came back.
 *
 * That is the cheap half of the bug. The expensive half is that neither copy
 * checked shape. A blanket spread of the parsed payload means whatever the
 * file says a slice is, the slice becomes: `attempts: 4` makes the dashboard
 * throw on `.map`, and an `org` cut short by a truncated download — `accounts`
 * missing — takes down every render, because `currentAccount` runs
 * `org.accounts.find` before anything else on the page.
 *
 * So there is one merge now, in one place, and it is written key by key:
 *
 *   - a slice of the wrong runtime kind is discarded, not adopted, and the
 *     default takes its place;
 *   - keys the current schema does not name are dropped rather than carried
 *     forward forever in every subsequent save;
 *   - records restored from the payload are built with a null prototype, so a
 *     `__proto__` or `constructor` key in the file cannot come back as an
 *     inherited hit (see `src/lib/record.ts`);
 *   - `org` is normalised field by field, because its four collections are
 *     read unguarded across the auth layer.
 *
 * The limit worth stating plainly: this validates the shape of each container,
 * not every leaf inside it. A payload whose `attempts` array holds objects
 * missing required fields will still load, and may still misbehave downstream.
 * Container shape is what turns a bad file into a blank screen; leaf shape is
 * what makes one figure wrong. Only the first is defended here.
 */

import type { AppState, Preferences, Profile } from '../types.ts';
import { SCHEMA_VERSION } from '../lib/storage.ts';
import { bareRecord } from '../lib/record.ts';
import { seedOrg, type OrgState } from '../auth/model.ts';
import { TIERS } from '../gita/framework.ts';

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

export function initialState(): AppState {
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
/* Shape guards                                                        */
/* ------------------------------------------------------------------ */

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** A fixed-shape slice: the payload fills in fields, the default supplies the rest. */
function objectSlice<T extends object>(base: T, raw: unknown): T {
  return isPlainObject(raw) ? { ...base, ...(raw as Partial<T>) } : base;
}

/** An open-keyed slice, rebuilt with no prototype so nothing is inherited. */
function recordSlice<T>(base: Record<string, T>, raw: unknown): Record<string, T> {
  const entries: Array<readonly [string, T]> = Object.entries(base) as Array<readonly [string, T]>;
  if (isPlainObject(raw)) {
    for (const [key, value] of Object.entries(raw)) {
      if (value !== undefined) entries.push([key, value as T]);
    }
  }
  return bareRecord(entries);
}

/** A list slice: anything that is not an array is not a list. */
function listSlice<T>(base: T[], raw: unknown): T[] {
  return Array.isArray(raw) ? (raw as T[]) : base;
}

/**
 * `org` decides who the app thinks you are, and its four collections are read
 * without guards throughout `src/auth`. A partial or truncated payload here is
 * the difference between a restored backup and a blank page, so each field is
 * placed individually rather than spread.
 */
function orgSlice(base: OrgState, raw: unknown): OrgState {
  if (!isPlainObject(raw)) return base;
  const currentAccountId = typeof raw.currentAccountId === 'string' ? raw.currentAccountId : base.currentAccountId;
  return {
    currentAccountId,
    accounts: listSlice(base.accounts, raw.accounts),
    classes: listSlice(base.classes, raw.classes),
    assignments: listSlice(base.assignments, raw.assignments),
    audit: listSlice(base.audit, raw.audit),
  };
}

/* ------------------------------------------------------------------ */
/* The merge                                                           */
/* ------------------------------------------------------------------ */

/**
 * Builds a complete `AppState` from a migrated payload and a fresh default.
 *
 * `migrated` has already been through `migrate` in `src/lib/storage.ts`, so it
 * is at the current schema version — but it is still untrusted data, whether it
 * came from local storage or from a file someone was sent.
 */
export function hydrateState(migrated: unknown, base: AppState = initialState()): AppState {
  const raw: Record<string, unknown> = isPlainObject(migrated) ? migrated : {};

  return {
    // Always the running schema version: the payload has been migrated up to
    // it, and a version number carried over from the file would let a stale
    // one re-enter storage and re-trigger migrations that already ran.
    version: SCHEMA_VERSION,
    org: orgSlice(base.org, raw.org),
    gita: objectSlice(base.gita, raw.gita),
    autopilot: objectSlice(base.autopilot, raw.autopilot),
    profile: objectSlice(base.profile, raw.profile),
    preferences: objectSlice(base.preferences, raw.preferences),
    ability: recordSlice(base.ability, raw.ability),
    sectionAbility: objectSlice(base.sectionAbility, raw.sectionAbility),
    attempts: listSlice(base.attempts, raw.attempts),
    forms: listSlice(base.forms, raw.forms),
    srs: recordSlice(base.srs, raw.srs),
    plan: isPlainObject(raw.plan) ? (raw.plan as unknown as AppState['plan']) : base.plan,
    bookmarks: listSlice(base.bookmarks, raw.bookmarks),
    activity: recordSlice(base.activity, raw.activity),
    lessons: recordSlice(base.lessons, raw.lessons),
    packets: recordSlice(base.packets, raw.packets),
  };
}
