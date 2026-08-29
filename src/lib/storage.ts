/**
 * Versioned local persistence.
 *
 * All learner data lives in the browser. Reads are defensive: a corrupted or
 * out-of-date payload degrades to the default state rather than crashing the
 * app, and every write is wrapped because storage can be unavailable entirely
 * (private windows, blocked site data, quota exhaustion).
 */

const KEY = 'sat365:state';
export const SCHEMA_VERSION = 1;

export function loadRaw(): unknown {
  try {
    const text = localStorage.getItem(KEY);
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export function saveRaw(value: unknown): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function clearAll(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable — nothing to clear */
  }
}

/**
 * Applies forward migrations to a persisted payload. Each migration takes the
 * shape produced by the previous version and returns the next one, so a state
 * saved by any past release can be brought forward without data loss.
 */
type Migration = (state: Record<string, unknown>) => Record<string, unknown>;

const migrations: Record<number, Migration> = {
  // 0 -> 1: initial schema; nothing to migrate from.
};

export function migrate(raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== 'object') return null;
  let state = raw as Record<string, unknown>;
  let version = typeof state.version === 'number' ? state.version : 0;
  while (version < SCHEMA_VERSION) {
    const step = migrations[version];
    if (!step) return null; // no path forward — start clean rather than guess
    state = step(state);
    version += 1;
    state.version = version;
  }
  return state;
}

export interface DebouncedSaver {
  (value: unknown): void;
  /** Writes any pending value immediately. */
  flush(): void;
}

/**
 * Debounced writer, so rapid state churn — a running exam clock, most of all
 * — does not write on every tick.
 *
 * The debounce introduces a window in which an action is on screen but not
 * yet on disk, so the saver also exposes `flush`. The provider calls it when
 * the page is hidden or unloaded, which is when that window would otherwise
 * cost the learner their last action.
 */
export function makeDebouncedSaver(delayMs = 400): DebouncedSaver {
  let handle: ReturnType<typeof setTimeout> | null = null;
  let pending: unknown = null;
  let dirty = false;

  const save: DebouncedSaver = ((value: unknown) => {
    pending = value;
    dirty = true;
    if (handle) clearTimeout(handle);
    handle = setTimeout(() => {
      saveRaw(pending);
      dirty = false;
      handle = null;
    }, delayMs);
  }) as DebouncedSaver;

  save.flush = () => {
    if (handle) {
      clearTimeout(handle);
      handle = null;
    }
    if (dirty) {
      saveRaw(pending);
      dirty = false;
    }
  };

  return save;
}
