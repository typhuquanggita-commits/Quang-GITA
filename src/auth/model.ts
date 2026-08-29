/**
 * Organisation model: accounts, classes, memberships, assignments, audit.
 *
 * The shape here is deliberately the shape a server would store, so moving
 * enforcement server-side later is a transport change rather than a rewrite.
 */

import type { SectionId, SkillId } from '../types.ts';
import type { RoleId, StudentLevel, TeacherRank, Permission } from './roles.ts';

export interface Account {
  id: string;
  name: string;
  email: string;
  role: RoleId;
  /** Present for teachers. */
  rank?: TeacherRank;
  createdAt: number;
  /** Set when an administrator suspends the account. */
  suspendedAt?: number | null;
  /** Last computed level, cached so a roster does not re-score every attempt. */
  level?: StudentLevel;
  /** Most recent total score, 400–1600, or null if never tested. */
  lastTotal?: number | null;
}

export interface ClassRoom {
  id: string;
  name: string;
  /** Free-form cohort label, e.g. "SAT Aug 2026". */
  term: string;
  /** Account ids of teachers assigned to this class. */
  teacherIds: string[];
  /** Account ids of enrolled students. */
  studentIds: string[];
  createdAt: number;
  archivedAt?: number | null;
  /** Target the class as a whole is working toward. */
  targetScore: number;
}

export type AssignmentKind = 'practice' | 'section-test' | 'full-test' | 'vocab' | 'review';

export interface Assignment {
  id: string;
  classId: string;
  createdBy: string;
  createdAt: number;
  title: string;
  kind: AssignmentKind;
  /** ISO date the work is due. */
  dueDate: string;
  section?: SectionId;
  skills?: SkillId[];
  questionCount?: number;
  /** Account ids that have submitted. */
  submittedBy: string[];
  notes?: string;
}

/**
 * An immutable record of privileged actions.
 *
 * Anything that touches another person's data or changes what someone may do
 * is logged. That is the difference between a permission system and a
 * permission system you can actually trust — without a record, a policy is
 * only a claim about the past.
 */
export interface AuditEntry {
  id: string;
  at: number;
  actorId: string;
  actorRole: RoleId;
  action:
    | 'class.created'
    | 'class.edited'
    | 'class.archived'
    | 'student.enrolled'
    | 'student.removed'
    | 'student.record.viewed'
    | 'assignment.created'
    | 'assignment.graded'
    | 'teacher.invited'
    | 'teacher.rank.changed'
    | 'report.exported'
    | 'permission.denied'
    | 'role.switched';
  /** What was acted on — a class id, an account id, an assignment id. */
  targetId?: string;
  detail?: string;
}

export interface OrgState {
  /** The account currently signed in on this device. */
  currentAccountId: string;
  accounts: Account[];
  classes: ClassRoom[];
  assignments: Assignment[];
  audit: AuditEntry[];
}

/* ------------------------------------------------------------------ */
/* Queries                                                             */
/* ------------------------------------------------------------------ */

export function accountById(org: OrgState, id: string): Account | undefined {
  return org.accounts.find((a) => a.id === id);
}

export function currentAccount(org: OrgState): Account | undefined {
  return accountById(org, org.currentAccountId);
}

/** Classes a teacher is assigned to; every roster permission is scoped to these. */
export function classesForTeacher(org: OrgState, teacherId: string): ClassRoom[] {
  return org.classes.filter((c) => !c.archivedAt && c.teacherIds.includes(teacherId));
}

export function classesForStudent(org: OrgState, studentId: string): ClassRoom[] {
  return org.classes.filter((c) => !c.archivedAt && c.studentIds.includes(studentId));
}

export function studentsInClass(org: OrgState, classId: string): Account[] {
  const room = org.classes.find((c) => c.id === classId);
  if (!room) return [];
  return room.studentIds
    .map((id) => accountById(org, id))
    .filter((a): a is Account => Boolean(a));
}

/** Every student a teacher may see, deduplicated across their classes. */
export function visibleStudents(org: OrgState, teacherId: string): Account[] {
  const seen = new Set<string>();
  const out: Account[] = [];
  for (const room of classesForTeacher(org, teacherId)) {
    for (const studentId of room.studentIds) {
      if (seen.has(studentId)) continue;
      seen.add(studentId);
      const account = accountById(org, studentId);
      if (account) out.push(account);
    }
  }
  return out;
}

export function assignmentsForClass(org: OrgState, classId: string): Assignment[] {
  return org.assignments
    .filter((a) => a.classId === classId)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

export function assignmentsForStudent(org: OrgState, studentId: string): Assignment[] {
  const classIds = new Set(classesForStudent(org, studentId).map((c) => c.id));
  return org.assignments
    .filter((a) => classIds.has(a.classId))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

/* ------------------------------------------------------------------ */
/* Seed                                                                */
/* ------------------------------------------------------------------ */

/**
 * A new install is a single student account. Teacher and admin accounts come
 * into existence only when someone deliberately creates them, so the default
 * install grants the least authority rather than the most.
 */
export function seedOrg(name: string, email: string, now = Date.now()): OrgState {
  const id = 'acc_self';
  return {
    currentAccountId: id,
    accounts: [
      {
        id,
        name: name || 'Học sinh',
        email,
        role: 'student',
        createdAt: now,
        suspendedAt: null,
        level: 'foundation',
        lastTotal: null,
      },
    ],
    classes: [],
    assignments: [],
    audit: [],
  };
}

/** Permissions that must be logged whenever they are exercised. */
export const AUDITED_PERMISSIONS: Permission[] = [
  'student.responses.view',
  'student.analytics.view',
  'teacher.promote',
  'teacher.invite',
  'class.archive',
  'report.export',
  'org.settings',
];
