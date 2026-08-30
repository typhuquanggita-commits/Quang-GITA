/**
 * Routing.
 *
 * A hash-based router, deliberately: the app must run from a static host or
 * straight off the filesystem, and history-API routing needs a server that
 * rewrites unknown paths. Routes are a discriminated union so a navigation
 * that forgets a parameter fails to compile rather than at runtime.
 */

import type { Permission } from '../../auth/roles.ts';

export type Route =
  | { name: 'dashboard' }
  | { name: 'today' }
  | { name: 'practice' }
  | { name: 'practice-session'; sessionId: string }
  | { name: 'vocab' }
  | { name: 'lessons' }
  | { name: 'lesson'; skill: string }
  | { name: 'topics' }
  | { name: 'curriculum' }
  | { name: 'tactics' }
  | { name: 'papers' }
  | { name: 'paper'; paperId: string }
  | { name: 'packet'; skill: string }
  | { name: 'plan' }
  | { name: 'gita' }
  | { name: 'tests' }
  | { name: 'exam'; attemptId: string }
  | { name: 'result'; attemptId: string }
  | { name: 'attempt-review'; attemptId: string }
  | { name: 'attempt-analysis'; attemptId: string }
  | { name: 'dossier' }
  | { name: 'certificate' }
  | { name: 'guardian-report' }
  | { name: 'review' }
  | { name: 'analytics' }
  | { name: 'console' }
  | { name: 'student'; accountId: string }
  | { name: 'calibration' }
  | { name: 'metrics' }
  | { name: 'brand' }
  | { name: 'shortcuts' }
  | { name: 'settings' };

export type RouteName = Route['name'];

/** The permission a route requires, if any. */
export const ROUTE_PERMISSION: Partial<Record<RouteName, Permission>> = {
  today: 'practice.run',
  practice: 'practice.run',
  'practice-session': 'practice.run',
  vocab: 'vocab.own',
  lessons: 'practice.run',
  lesson: 'practice.run',
  topics: 'practice.run',
  curriculum: 'practice.run',
  tactics: 'practice.run',
  papers: 'test.take',
  paper: 'test.take',
  packet: 'practice.run',
  plan: 'plan.own',
  gita: 'plan.own',
  tests: 'test.take',
  exam: 'test.take',
  review: 'review.own',
  'attempt-review': 'review.own',
  'attempt-analysis': 'analytics.own',
  dossier: 'analytics.own',
  certificate: 'analytics.own',
  'guardian-report': 'analytics.own',
  analytics: 'analytics.own',
  console: 'roster.view',
  student: 'student.analytics.view',
  calibration: 'bank.publish',
  metrics: 'metrics.aggregate',
};

export function routeToHash(route: Route): string {
  switch (route.name) {
    case 'practice-session':
      return `#/practice/${route.sessionId}`;
    case 'exam':
      return `#/exam/${route.attemptId}`;
    case 'lesson':
      return `#/lesson/${route.skill}`;
    case 'packet':
      return `#/packet/${route.skill}`;
    case 'paper':
      return `#/paper/${route.paperId}`;
    case 'student':
      return `#/student/${route.accountId}`;
    case 'attempt-review':
      return `#/solutions/${route.attemptId}`;
    case 'attempt-analysis':
      return `#/analysis/${route.attemptId}`;
    case 'result':
      return `#/result/${route.attemptId}`;
    default:
      return `#/${route.name}`;
  }
}

export function hashToRoute(hash: string): Route {
  const path = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const [head, param] = path;

  switch (head) {
    case 'practice':
      return param ? { name: 'practice-session', sessionId: param } : { name: 'practice' };
    case 'exam':
      return param ? { name: 'exam', attemptId: param } : { name: 'tests' };
    case 'result':
      return param ? { name: 'result', attemptId: param } : { name: 'dashboard' };
    case 'today':
      return { name: 'today' };
    case 'vocab':
      return { name: 'vocab' };
    case 'lessons':
      return { name: 'lessons' };
    case 'lesson':
      return param ? { name: 'lesson', skill: param } : { name: 'lessons' };
    case 'topics':
      return { name: 'topics' };
    case 'curriculum':
      return { name: 'curriculum' };
    case 'certificate':
      return { name: 'certificate' };
    case 'tactics':
      return { name: 'tactics' };
    case 'papers':
      return { name: 'papers' };
    case 'paper':
      return param ? { name: 'paper', paperId: param } : { name: 'papers' };
    case 'packet':
      return param ? { name: 'packet', skill: param } : { name: 'topics' };
    case 'plan':
      return { name: 'plan' };
    case 'gita':
      return { name: 'gita' };
    case 'tests':
      return { name: 'tests' };
    case 'review':
      return { name: 'review' };
    case 'solutions':
      return param ? { name: 'attempt-review', attemptId: param } : { name: 'tests' };
    case 'analysis':
      return param ? { name: 'attempt-analysis', attemptId: param } : { name: 'analytics' };
    case 'dossier':
      return { name: 'dossier' };
    case 'analytics':
      return { name: 'analytics' };
    case 'console':
      return { name: 'console' };
    case 'student':
      return param ? { name: 'student', accountId: param } : { name: 'console' };
    case 'calibration':
      return { name: 'calibration' };
    case 'metrics':
      return { name: 'metrics' };
    case 'brand':
      return { name: 'brand' };
    case 'shortcuts':
      return { name: 'shortcuts' };
    case 'guardian-report':
      return { name: 'guardian-report' };
    case 'settings':
      return { name: 'settings' };
    default:
      return { name: 'dashboard' };
  }
}
