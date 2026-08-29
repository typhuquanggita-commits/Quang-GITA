/**
 * Prototype-safe lookups on plain-object records.
 *
 * `Record<string, T>` is an ordinary object, so it inherits from
 * `Object.prototype`. That makes `record['constructor']` return the `Object`
 * constructor — a truthy value with none of T's fields — and `record['toString']`
 * return a function. Any code that treats a truthy lookup as a hit then reads
 * properties off something that was never a T.
 *
 * This is reachable, not theoretical. The lesson and packet routes take a skill
 * id straight from the URL hash, so `#/lesson/constructor` returned the Object
 * constructor as a lesson and crashed the view on `lesson.method.map`. The same
 * held for topic packets and for the per-skill progress records restored from
 * storage.
 *
 * `own` is the fix, and it is deliberately the only way this codebase indexes a
 * record by a key it did not itself produce: a lookup that checks for an own
 * property cannot return an inherited one.
 */

/** The value at `key`, or undefined unless the record owns that key itself. */
export function own<T>(record: Record<string, T> | undefined | null, key: string | undefined | null): T | undefined {
  if (!record || key == null) return undefined;
  return Object.hasOwn(record, key) ? record[key] : undefined;
}

/**
 * Builds a record with no prototype, so nothing is inherited to begin with.
 *
 * Belt and braces alongside `own`: a null-prototype record is safe even when
 * indexed directly, which protects the static indexes against a future caller
 * that forgets to use `own`.
 */
export function bareRecord<T>(entries: Iterable<readonly [string, T]>): Record<string, T> {
  const out = Object.create(null) as Record<string, T>;
  for (const [key, value] of entries) out[key] = value;
  return out;
}
