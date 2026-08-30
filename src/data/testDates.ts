/**
 * The SAT administration calendar.
 *
 * The platform has always let a learner set a test date, and has never known
 * whether the SAT actually runs that day. A learner who types a Tuesday in
 * February gets a study plan, a countdown, a sprint-course placement and a
 * guardian report — all built around a morning on which no test is
 * administered. Nothing in the system objected, because nothing in the system
 * knew.
 *
 * ## Where these dates come from, and what that costs
 *
 * College Board publishes the authoritative calendar. This build environment
 * cannot reach it, so the dates below are assembled from public reporting and
 * every one of them carries its provenance:
 *
 *   `confirmed` — the field was reported by a source and matched
 *   `derived`   — the field was computed from the published pattern
 *
 * The pattern is well established and, on the two administrations where every
 * field was independently reported, it holds exactly:
 *
 *   regular registration   test date − 15 days
 *   late registration      test date − 11 days
 *   scores released        test date + 13 days
 *
 * August 22 2026 was reported as 7 August / 11 August / 4 September, and
 * September 12 2026 as 28 August / — / 25 September. Both match the rule to
 * the day, which is the reason deriving the rest is defensible rather than a
 * guess. It is still a derivation, it is still labelled as one on every
 * surface that shows it, and every screen carries the instruction to confirm
 * against College Board before relying on it. A registration deadline missed
 * because software was confidently wrong is not a recoverable error.
 *
 * ## Vietnam
 *
 * International candidates sit the same weekend dates as US candidates, at an
 * added regional fee. Deadlines are stated in US Eastern Time and expire at
 * 23:59 ET, which is late morning the following day in Việt Nam — the single
 * most common way a Vietnamese candidate misses a deadline they thought they
 * had until midnight.
 */

import { addDays, daysBetween, isoDate } from '../lib/util.ts';

export type Provenance = 'confirmed' | 'derived';

export interface Administration {
  /** The test date, ISO, and the identifier. */
  id: string;
  testDate: string;
  registrationDeadline: string;
  lateRegistrationDeadline: string;
  scoreRelease: string;
  /** Per-field provenance, so a screen can label exactly what was derived. */
  provenance: {
    testDate: Provenance;
    registrationDeadline: Provenance;
    lateRegistrationDeadline: Provenance;
    scoreRelease: Provenance;
  };
  note?: string;
  noteVi?: string;
}

/** Offsets from the test date, in days. Verified against two administrations. */
export const OFFSETS = {
  registration: -15,
  lateRegistration: -11,
  scoreRelease: 13,
} as const;

/**
 * Deadlines are 23:59 US Eastern. Việt Nam is UTC+7; Eastern is UTC−4 in
 * daylight time and UTC−5 in standard time, so a deadline lands at 10:59 or
 * 11:59 the following morning in Hà Nội. Stated as a range rather than as a
 * single figure because the US changes clocks in November and the SAT
 * calendar spans that change.
 */
export const VIETNAM_DEADLINE_NOTE = {
  en: 'Registration deadlines expire at 23:59 US Eastern Time — late morning the next day in Việt Nam (about 10:59–11:59, depending on US daylight saving). Treating local midnight as the deadline is the most common way a place is lost.',
  vi: 'Hạn đăng ký hết vào 23:59 giờ Miền Đông nước Mỹ — tức khoảng 10:59–11:59 sáng hôm sau theo giờ Việt Nam (tuỳ Mỹ đang ở giờ mùa hè hay mùa đông). Coi nửa đêm giờ Việt Nam là hạn chót chính là cách phổ biến nhất để mất chỗ thi.',
};

function derived(testDate: string, overrides: Partial<Administration> = {}): Administration {
  const base: Administration = {
    id: testDate,
    testDate,
    registrationDeadline: addDays(testDate, OFFSETS.registration),
    lateRegistrationDeadline: addDays(testDate, OFFSETS.lateRegistration),
    scoreRelease: addDays(testDate, OFFSETS.scoreRelease),
    provenance: {
      testDate: 'confirmed',
      registrationDeadline: 'derived',
      lateRegistrationDeadline: 'derived',
      scoreRelease: 'derived',
    },
  };
  return {
    ...base,
    ...overrides,
    provenance: { ...base.provenance, ...(overrides.provenance ?? {}) },
  };
}

export const ADMINISTRATIONS: Administration[] = [
  derived('2026-08-22', {
    // Every field independently reported; this is the administration the
    // derivation rule was checked against.
    registrationDeadline: '2026-08-07',
    lateRegistrationDeadline: '2026-08-11',
    scoreRelease: '2026-09-04',
    provenance: {
      testDate: 'confirmed',
      registrationDeadline: 'confirmed',
      lateRegistrationDeadline: 'confirmed',
      scoreRelease: 'confirmed',
    },
  }),
  derived('2026-09-12', {
    registrationDeadline: '2026-08-28',
    scoreRelease: '2026-09-25',
    provenance: {
      testDate: 'confirmed',
      registrationDeadline: 'confirmed',
      lateRegistrationDeadline: 'derived',
      scoreRelease: 'confirmed',
    },
  }),
  derived('2026-10-03'),
  derived('2026-11-07'),
  derived('2026-12-05'),
  derived('2027-03-13', {
    note: 'The 2027 dates are the published pattern of one Saturday per month in March, May and June. Confirm the exact Saturday against College Board before booking travel.',
    noteVi: 'Các ngày năm 2027 theo quy luật đã công bố: mỗi tháng Ba, Năm và Sáu có một thứ Bảy thi. Hãy đối chiếu đúng ngày với College Board trước khi đặt vé hay lịch đi lại.',
    provenance: {
      testDate: 'derived',
      registrationDeadline: 'derived',
      lateRegistrationDeadline: 'derived',
      scoreRelease: 'derived',
    },
  }),
  derived('2027-05-01', {
    provenance: {
      testDate: 'derived',
      registrationDeadline: 'derived',
      lateRegistrationDeadline: 'derived',
      scoreRelease: 'derived',
    },
  }),
  derived('2027-06-05', {
    provenance: {
      testDate: 'derived',
      registrationDeadline: 'derived',
      lateRegistrationDeadline: 'derived',
      scoreRelease: 'derived',
    },
  }),
];

/* ------------------------------------------------------------------ */

export type RegistrationStatus =
  | 'open'
  /** Past the regular deadline; the late window costs extra. */
  | 'late-only'
  /** Both windows closed, test not yet sat. */
  | 'closed'
  /** The test has been sat; scores may or may not be out. */
  | 'sat'
  | 'scores-out';

export function statusOf(admin: Administration, today = isoDate()): RegistrationStatus {
  if (today > admin.scoreRelease) return 'scores-out';
  if (today > admin.testDate) return 'sat';
  if (today > admin.lateRegistrationDeadline) return 'closed';
  if (today > admin.registrationDeadline) return 'late-only';
  return 'open';
}

export function upcoming(today = isoDate()): Administration[] {
  return ADMINISTRATIONS.filter((a) => a.testDate >= today);
}

export function nextAdministration(today = isoDate()): Administration | null {
  return upcoming(today)[0] ?? null;
}

/** The next administration a candidate can still register for without a late fee. */
export function nextOpenAdministration(today = isoDate()): Administration | null {
  return upcoming(today).find((a) => statusOf(a, today) === 'open') ?? null;
}

export function administrationOn(date: string): Administration | null {
  return ADMINISTRATIONS.find((a) => a.testDate === date) ?? null;
}

/**
 * Whether a date a learner has entered is an actual administration.
 *
 * The reason this exists: a plan built around a day the test does not run is
 * wrong in every number it produces, and silently. The check returns the
 * nearest real dates so the answer is a correction rather than a complaint.
 */
export interface DateCheck {
  ok: boolean;
  administration: Administration | null;
  /** Real administrations either side, when the entered date is not one. */
  nearest: Administration[];
  message: { en: string; vi: string } | null;
}

export function checkTestDate(date: string | null, today = isoDate()): DateCheck {
  if (!date) {
    return { ok: false, administration: null, nearest: upcoming(today).slice(0, 3), message: null };
  }

  const exact = administrationOn(date);
  if (exact) return { ok: true, administration: exact, nearest: [], message: null };

  const sorted = [...ADMINISTRATIONS].sort(
    (a, b) => Math.abs(daysBetween(date, a.testDate)) - Math.abs(daysBetween(date, b.testDate)),
  );
  const nearest = sorted.slice(0, 2).sort((a, b) => a.testDate.localeCompare(b.testDate));

  return {
    ok: false,
    administration: null,
    nearest,
    message: {
      en: `No SAT is administered on ${date}. Every countdown, study plan and course placement in this platform is built from that date, so they are all measuring towards a morning with no test on it.`,
      vi: `Không có kỳ thi SAT nào vào ngày ${date}. Mọi đồng hồ đếm ngược, kế hoạch học và việc xếp khoá trong hệ thống đều dựng từ ngày này — nghĩa là tất cả đang đếm tới một buổi sáng không có kỳ thi nào.`,
    },
  };
}

/**
 * When to register, as distinct from when registration closes.
 *
 * Test centres in Hà Nội and Hồ Chí Minh City fill well before the deadline,
 * and a candidate registered on the last day may find the nearest seat is in
 * another city. The advice is five weeks, which is a real constraint rather
 * than a deadline.
 */
export function registerBy(admin: Administration): string {
  return addDays(admin.testDate, -35);
}

export interface Countdown {
  administration: Administration;
  daysToTest: number;
  daysToRegistrationDeadline: number;
  daysToAdvisedRegistration: number;
  status: RegistrationStatus;
}

export function countdown(admin: Administration, today = isoDate()): Countdown {
  return {
    administration: admin,
    daysToTest: daysBetween(today, admin.testDate),
    daysToRegistrationDeadline: daysBetween(today, admin.registrationDeadline),
    daysToAdvisedRegistration: daysBetween(today, registerBy(admin)),
    status: statusOf(admin, today),
  };
}

/** True when any field of this administration was derived rather than sourced. */
export function hasDerivedFields(admin: Administration): boolean {
  return Object.values(admin.provenance).some((p) => p === 'derived');
}

export const VERIFY_NOTE = {
  en: 'Dates marked as derived were computed from College Board’s published pattern, not read from its calendar. Confirm any date you are about to act on at satsuite.collegeboard.org — a registration deadline missed because software was confidently wrong is not recoverable.',
  vi: 'Những mốc đánh dấu "suy ra" được tính từ quy luật College Board đã công bố, không phải đọc trực tiếp từ lịch của họ. Hãy đối chiếu bất kỳ mốc nào bạn sắp hành động theo tại satsuite.collegeboard.org — lỡ hạn đăng ký vì phần mềm sai một cách tự tin là lỗi không cứu được.',
};
