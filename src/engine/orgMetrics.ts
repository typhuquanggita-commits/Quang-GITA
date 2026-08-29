/**
 * Organisation metrics, and the disclosure rule that governs them.
 *
 * Kept in the engine rather than in the view for the ordinary reason — the
 * view cannot be reached by the test runner — and for a better one: the rule
 * that decides when a cohort is too small to report is a privacy control, and
 * a privacy control that lives inside a component is a privacy control nobody
 * tests.
 *
 * The rule itself: a percentage computed over four students is not an
 * aggregate. Anyone who knows one member of a four-person cohort can read the
 * other three off a "75%". Aggregation protects people only when the group is
 * large enough for an individual to disappear into it, so every figure here is
 * either computed over at least `DISCLOSURE_FLOOR` records or reported as
 * suppressed. It is never quietly rounded, and never silently omitted — a
 * missing row and a suppressed row mean different things to a reader.
 */

import type { OrgState } from '../auth/model.ts';
import { studentsInClass } from '../auth/model.ts';
import { levelForScore, STUDENT_LEVELS, type StudentLevel } from '../auth/roles.ts';

/**
 * The smallest cohort that may be reported as a statistic.
 *
 * Five is the conventional floor in educational reporting. It is data rather
 * than a literal in a condition so a programme can raise it as a policy
 * decision rather than discover it in a function body.
 */
export const DISCLOSURE_FLOOR = 5;

/** A figure that is either reportable or explicitly withheld. */
export type Disclosed<T> = { reportable: true; value: T } | { reportable: false; n: number };

/**
 * Reports a value only when enough records stand behind it.
 *
 * Returning a tagged result rather than null is deliberate: a caller that gets
 * null will render a dash, and a dash reads as "no data" when the truth is
 * "withheld to protect the people in it". Those are different statements and a
 * reader deserves the right one.
 */
export function disclose<T>(n: number, compute: () => T): Disclosed<T> {
  if (n < DISCLOSURE_FLOOR) return { reportable: false, n };
  return { reportable: true, value: compute() };
}

export interface ClassMetric {
  id: string;
  name: string;
  size: number;
  target: number;
  /** Share meeting the class target, withheld for a small cohort. */
  meetingTarget: Disclosed<number>;
}

export interface OrgMetricsResult {
  students: number;
  scored: number;
  classes: number;
  staff: number;
  assignments: number;
  auditEntries: number;
  meanTotal: Disclosed<number>;
  levelMix: Disclosed<Array<{ level: StudentLevel; count: number; share: number }>>;
  classRows: ClassMetric[];
}

export function organisationMetrics(org: OrgState): OrgMetricsResult {
  const students = org.accounts.filter((a) => a.role === 'student' && !a.suspendedAt);
  const scored = students.filter((s) => typeof s.lastTotal === 'number');
  const classes = org.classes.filter((c) => !c.archivedAt);
  const staff = org.accounts.filter((a) => a.role !== 'student' && !a.suspendedAt);

  return {
    students: students.length,
    scored: scored.length,
    classes: classes.length,
    staff: staff.length,
    assignments: org.assignments.length,
    auditEntries: org.audit.length,

    meanTotal: disclose(scored.length, () =>
      Math.round(scored.reduce((acc, s) => acc + (s.lastTotal ?? 0), 0) / scored.length),
    ),

    levelMix: disclose(scored.length, () =>
      STUDENT_LEVELS.map((level) => {
        const count = scored.filter((s) => levelForScore(s.lastTotal!) === level).length;
        return { level, count, share: count / scored.length };
      }),
    ),

    classRows: classes.map((room) => {
      const enrolled = studentsInClass(org, room.id);
      const withScore = enrolled.filter((s) => typeof s.lastTotal === 'number');
      return {
        id: room.id,
        name: room.name,
        size: enrolled.length,
        target: room.targetScore,
        meetingTarget: disclose(
          withScore.length,
          () => withScore.filter((s) => s.lastTotal! >= room.targetScore).length / withScore.length,
        ),
      };
    }),
  };
}
