/**
 * Security properties that must not regress.
 *
 * These are not hypotheticals. Each test below corresponds to a defect that
 * was present in this codebase and reachable, or to a boundary whose failure
 * would be silent — which is the only kind worth a permanent test.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { own, bareRecord } from '../src/lib/record.ts';
import { lessonFor, topicFor, LESSON_BY_SKILL, TOPIC_BY_SKILL } from '../src/data/lesson-index.ts';
import { buildPacket } from '../src/engine/packets.ts';
import { BANK } from '../src/data/bank.ts';
import { parseImport } from '../src/features/calibration/matrix.ts';
import { DISCLOSURE_FLOOR, disclose, organisationMetrics } from '../src/engine/orgMetrics.ts';
import { seedOrg } from '../src/auth/model.ts';
import {
  ALL_PERMISSIONS,
  permissionsFor,
  can,
  canForClass,
  canViewLearner,
  canAssignRole,
  assignableRoles,
  isUnscoped,
  levelForScore,
  ROLE_ORDER,
  ROLE_GRANTS_FOR_TEST,
  type RoleId,
} from '../src/auth/roles.ts';

/** Keys every plain object inherits, and which a naive lookup returns. */
const INHERITED = ['constructor', 'toString', '__proto__', 'valueOf', 'hasOwnProperty'];

test('a skill id from the URL cannot return an inherited object', () => {
  // `#/lesson/constructor` used to hand the view the Object constructor, which
  // is truthy, has none of a Lesson's fields, and crashed on lesson.method.map.
  for (const key of INHERITED) {
    assert.equal(lessonFor(key), undefined, `lessonFor("${key}")`);
    assert.equal(topicFor(key), undefined, `topicFor("${key}")`);
    assert.equal(buildPacket(key, BANK), null, `buildPacket("${key}")`);
  }
});

test('the static indexes carry no prototype at all', () => {
  // Belt and braces: even a caller that indexes directly cannot inherit.
  assert.equal(Object.getPrototypeOf(LESSON_BY_SKILL), null);
  assert.equal(Object.getPrototypeOf(TOPIC_BY_SKILL), null);
  for (const key of INHERITED) {
    assert.equal(LESSON_BY_SKILL[key], undefined);
    assert.equal(TOPIC_BY_SKILL[key], undefined);
  }
});

test('own() returns real entries and refuses inherited ones', () => {
  // The records restored from storage are ordinary JSON objects, so the guard
  // has to work on those and not only on the ones built with a null prototype.
  const restored = JSON.parse('{"transitions":{"done":["theory"]},"circles":{"done":[]}}');
  assert.deepEqual(own(restored, 'transitions'), { done: ['theory'] });
  for (const key of INHERITED) assert.equal(own(restored, key), undefined, key);

  assert.equal(own(restored, undefined), undefined);
  assert.equal(own(undefined, 'transitions'), undefined);
  assert.equal(own(null, 'transitions'), undefined);
});

test('bareRecord builds a record with nothing inherited', () => {
  const record = bareRecord([['a', 1] as const]);
  assert.equal(Object.getPrototypeOf(record), null);
  assert.equal(record.a, 1);
  for (const key of INHERITED) assert.equal(record[key], undefined);
});

test('an import cannot pollute Object.prototype', () => {
  const before = Object.keys(Object.prototype).length;
  const result = parseImport(
    '{"itemIds":["a","b"],"rows":[[1,0]],"__proto__":{"polluted":true},"constructor":{"prototype":{"x":1}}}',
  );
  assert.ok(result.ok, 'a payload with these keys is well-formed and should parse');
  assert.equal(({} as Record<string, unknown>).polluted, undefined, 'Object.prototype was polluted');
  assert.equal(({} as Record<string, unknown>).x, undefined, 'Object.prototype was polluted');
  assert.equal(Object.keys(Object.prototype).length, before);
});

test('every permission in the union reaches a super administrator', () => {
  /*
   * ALL_PERMISSIONS is assembled from the learner set plus the teacher rank
   * grants. A new permission added to the union but not to any rank would drop
   * out of ALL_PERMISSIONS silently — and an administrator, whose set is built
   * from it, would quietly not hold it. The failure is invisible: the feature
   * simply never appears for anyone.
   */
  const union = [
    'practice.run', 'test.take', 'review.own', 'analytics.own', 'plan.own', 'vocab.own',
    'roster.view', 'student.analytics.view', 'student.responses.view',
    'assignment.create', 'assignment.grade',
    'class.create', 'class.edit', 'class.archive',
    'teacher.invite', 'teacher.promote',
    'coach.playbook', 'coach.session.log', 'coach.escalation.handle',
    'programme.design', 'family.report',
    'bank.view', 'bank.author', 'bank.publish', 'form.assemble', 'report.export',
    'org.settings', 'audit.view', 'account.manage', 'role.assign',
    'calibration.run', 'metrics.aggregate', 'data.export.bulk', 'data.purge',
    'feature.configure', 'security.settings',
  ] as const;

  const all = new Set<string>(ALL_PERMISSIONS);
  for (const permission of union) {
    assert.ok(all.has(permission), `${permission} is missing from ALL_PERMISSIONS`);
  }
  assert.equal(all.size, union.length, 'ALL_PERMISSIONS and the Permission union have drifted apart');

  const admin = permissionsFor({ role: 'super-admin' });
  for (const permission of union) {
    assert.ok(admin.has(permission), `a super administrator does not hold ${permission}`);
  }
});

test('a student holds no permission over anyone else', () => {
  const student = permissionsFor({ role: 'student' });
  const overOthers = [
    'roster.view', 'student.analytics.view', 'student.responses.view',
    'assignment.create', 'assignment.grade', 'class.create', 'class.edit', 'class.archive',
    'teacher.invite', 'teacher.promote', 'bank.author', 'bank.publish',
    'org.settings', 'audit.view',
  ] as const;
  for (const permission of overOthers) {
    assert.ok(!student.has(permission), `a student holds ${permission}`);
  }
});

test('a demonstrated ability level never widens the permission set', () => {
  // The two ladders are deliberately separate: a level is earned from measured
  // ability and unlocks study material, never authority over another person.
  assert.equal(levelForScore(1600), 'elite');
  const plain = permissionsFor({ role: 'student' });
  assert.ok(!plain.has('student.analytics.view'));
  assert.ok(!plain.has('roster.view'));
});

test('teaching authority is scoped to the classes actually taught', () => {
  const teacher = { role: 'teacher' as const, rank: 'senior' as const, classIds: ['cls_a'] };
  assert.ok(canForClass(teacher, 'class.edit', 'cls_a'));
  assert.ok(!canForClass(teacher, 'class.edit', 'cls_b'));
  assert.ok(
    !canViewLearner(teacher, { selfId: 't1', targetId: 's1', targetClassIds: ['cls_b'] }),
    'a teacher must not read a learner they share no class with',
  );
  // Holding the permission is necessary but never sufficient on its own.
  assert.ok(can(teacher, 'class.edit'));
  assert.ok(!canForClass({ ...teacher, classIds: [] }, 'class.edit', 'cls_a'));
});

/* ------------------------------------------------------------------ */
/* The eight-role hierarchy                                            */
/* ------------------------------------------------------------------ */

test('nobody can promote anyone to their own level or above', () => {
  /*
   * Without this ceiling, `role.assign` is equivalent to super-admin: the first
   * thing anyone holding it would do is manufacture a peer, or grant it to an
   * account they control. The ceiling is what makes the permission delegable.
   */
  const sysadmin = { role: 'system-admin' as const };

  assert.ok(
    canAssignRole(sysadmin, {
      selfId: 'a', targetId: 'b', targetCurrentRole: 'student', nextRole: 'teacher',
    }),
    'a system administrator should be able to appoint a teacher',
  );

  assert.ok(
    !canAssignRole(sysadmin, {
      selfId: 'a', targetId: 'b', targetCurrentRole: 'student', nextRole: 'system-admin',
    }),
    'manufacturing a peer must be refused',
  );
  assert.ok(
    !canAssignRole(sysadmin, {
      selfId: 'a', targetId: 'b', targetCurrentRole: 'student', nextRole: 'super-admin',
    }),
    'manufacturing a superior must be refused',
  );
});

test('demoting a peer is refused, because removing a check is also an escalation', () => {
  const sysadmin = { role: 'system-admin' as const };
  assert.ok(
    !canAssignRole(sysadmin, {
      selfId: 'a', targetId: 'b', targetCurrentRole: 'system-admin', nextRole: 'student',
    }),
    'a peer must not be demotable by a peer',
  );
  assert.ok(
    !canAssignRole(sysadmin, {
      selfId: 'a', targetId: 'b', targetCurrentRole: 'super-admin', nextRole: 'student',
    }),
    'a superior must not be demotable',
  );
});

test('nobody can change their own role, whatever they hold', () => {
  for (const role of ROLE_ORDER) {
    assert.ok(
      !canAssignRole({ role }, {
        selfId: 'me', targetId: 'me', targetCurrentRole: role, nextRole: 'super-admin',
      }),
      `${role} was able to change its own role`,
    );
  }
});

test('a role without role.assign cannot assign anything', () => {
  for (const role of ['student', 'teacher', 'coach', 'consultant', 'product-admin', 'executive'] as RoleId[]) {
    assert.deepEqual(assignableRoles({ role }), [], `${role} should assign nothing`);
    assert.ok(
      !canAssignRole({ role }, {
        selfId: 'a', targetId: 'b', targetCurrentRole: 'student', nextRole: 'teacher',
      }),
      `${role} assigned a role without holding role.assign`,
    );
  }
});

test('the assignable list never contains the assigner’s own role or above', () => {
  const sysadmin = { role: 'system-admin' as const };
  const assignable = assignableRoles(sysadmin);
  assert.ok(assignable.length > 0);
  assert.ok(!assignable.includes('system-admin'));
  assert.ok(!assignable.includes('executive'));
  assert.ok(!assignable.includes('super-admin'));
  assert.ok(assignable.includes('teacher'));

  // And it agrees with the predicate, so a picker cannot offer a refused option.
  for (const role of ROLE_ORDER) {
    const offered = assignable.includes(role);
    const allowed = canAssignRole(sysadmin, {
      selfId: 'a', targetId: 'b', targetCurrentRole: 'student', nextRole: role,
    });
    assert.equal(offered, allowed, `${role}: picker and policy disagree`);
  }
});

test('an executive sees the organisation but not the learners in it', () => {
  /*
   * The decision most likely to be questioned, so it is the one held by a test.
   * Seniority is not a reason to read a child's record: a director who needs
   * one learner's data can be given a delivery role, which is auditable.
   */
  const executive = permissionsFor({ role: 'executive' });
  assert.ok(executive.has('metrics.aggregate'));
  assert.ok(executive.has('audit.view'));
  assert.ok(!executive.has('student.analytics.view'), 'an executive must not read individual records');
  assert.ok(!executive.has('student.responses.view'));
  assert.ok(!executive.has('roster.view'));
});

test('a product administrator owns the bank and reaches no learner record', () => {
  const product = permissionsFor({ role: 'product-admin' });
  assert.ok(product.has('bank.publish'));
  assert.ok(product.has('calibration.run'));
  assert.ok(!product.has('student.analytics.view'));
  assert.ok(!product.has('student.responses.view'));
  assert.ok(!product.has('roster.view'));
});

test('a coach reads its learners and administers nothing', () => {
  const coach = permissionsFor({ role: 'coach' });
  assert.ok(coach.has('student.analytics.view'), 'advising without evidence is guessing');
  assert.ok(coach.has('coach.playbook'));
  assert.ok(coach.has('coach.escalation.handle'));
  assert.ok(!coach.has('class.create'));
  assert.ok(!coach.has('account.manage'));
  assert.ok(!coach.has('role.assign'));
  assert.ok(!coach.has('bank.author'));
});

test('a consultant sees the shape of progress, not every answer', () => {
  const consultant = permissionsFor({ role: 'consultant' });
  assert.ok(consultant.has('student.analytics.view'));
  assert.ok(consultant.has('programme.design'));
  assert.ok(consultant.has('family.report'));
  assert.ok(
    !consultant.has('student.responses.view'),
    'a consultant needs the shape of progress, not a transcript of every answer',
  );
});

test('only the two organisation-running roles are unscoped', () => {
  // Being unscoped widens which classes a permission reaches. It must never
  // widen which permissions are held.
  for (const role of ROLE_ORDER) {
    const expected = role === 'system-admin' || role === 'super-admin';
    assert.equal(isUnscoped(role), expected, `${role}`);
  }

  // A coach is scoped exactly like a teacher, despite reading learner records.
  const coach = { role: 'coach' as const, classIds: ['cls_a'] };
  assert.ok(canViewLearner(coach, { selfId: 'c', targetId: 's', targetClassIds: ['cls_a'] }));
  assert.ok(!canViewLearner(coach, { selfId: 'c', targetId: 's', targetClassIds: ['cls_b'] }));

  // And unscoped does not conjure a permission the role does not hold.
  const executive = { role: 'executive' as const };
  assert.ok(!canForClass(executive, 'class.edit', 'cls_a'));
  assert.ok(
    !canViewLearner(executive, { selfId: 'e', targetId: 's', targetClassIds: ['cls_a'] }),
    'an executive holds no student.analytics.view, so no scope rule can grant it',
  );
});

test('destructive permissions belong to the super administrator alone', () => {
  for (const role of ROLE_ORDER) {
    if (role === 'super-admin') continue;
    const held = permissionsFor({ role, rank: 'head' });
    assert.ok(!held.has('data.purge'), `${role} can permanently delete data`);
    assert.ok(!held.has('security.settings'), `${role} can change security settings`);
    assert.ok(!held.has('data.export.bulk'), `${role} can bulk-export data`);
  }
  const supreme = permissionsFor({ role: 'super-admin' });
  assert.ok(supreme.has('data.purge'));
  assert.ok(supreme.has('security.settings'));
  assert.ok(supreme.has('data.export.bulk'));
});

test('every role is labelled and explained in both languages', () => {
  for (const role of ROLE_ORDER) {
    for (const table of ROLE_GRANTS_FOR_TEST) {
      assert.ok(table[role] !== undefined, `${role} missing from a role table`);
    }
  }
});

test('a small cohort is suppressed rather than reported', () => {
  /*
   * A percentage over four students is not an aggregate; it is a description
   * of named individuals wearing a percent sign. Anyone who knows one member
   * of a four-person cohort can read the other three off a "75%".
   */
  assert.ok(DISCLOSURE_FLOOR >= 5, `a floor of ${DISCLOSURE_FLOOR} is too low to hide anyone`);

  for (let n = 0; n < DISCLOSURE_FLOOR; n += 1) {
    const result = disclose(n, () => 0.75);
    assert.equal(result.reportable, false, `${n} records were reported`);
    if (!result.reportable) assert.equal(result.n, n);
  }
  const enough = disclose(DISCLOSURE_FLOOR, () => 0.75);
  assert.equal(enough.reportable, true);
});

test('suppression is distinguishable from absence of data', () => {
  // A caller handed null renders a dash, and a dash reads as "no data" when
  // the truth is "withheld to protect the people in it". Those are different
  // statements and the type keeps them apart.
  const withheld = disclose(2, () => 0.5);
  assert.equal(withheld.reportable, false);
  assert.ok('n' in withheld, 'a suppressed figure must say how many it was hiding');
  assert.ok(!('value' in withheld), 'a suppressed figure must not carry the value');
});

test('the metrics view never computes a figure it may not disclose', () => {
  // Two learners, both scored: every derived statistic must come back withheld.
  const org = seedOrg('Nguyen Minh', 'a@example.com');
  org.accounts.push(
    { id: 's1', name: 'A', email: '', role: 'student', createdAt: 0, suspendedAt: null, lastTotal: 1200 },
    { id: 's2', name: 'B', email: '', role: 'student', createdAt: 0, suspendedAt: null, lastTotal: 1400 },
  );

  const metrics = organisationMetrics(org);
  assert.equal(metrics.meanTotal.reportable, false, 'a mean over two learners identifies both');
  assert.equal(metrics.levelMix.reportable, false);
  // Counts of people are not disclosures about any one of them, so they stand.
  assert.equal(metrics.students, 3);
});

test('the roles that read aggregates and the roles that read learners are different sets', () => {
  const aggregateOnly = permissionsFor({ role: 'executive' });
  assert.ok(aggregateOnly.has('metrics.aggregate'));
  assert.ok(!aggregateOnly.has('student.analytics.view'));

  // And a role that reads learners is not thereby given the whole organisation.
  const coach = permissionsFor({ role: 'coach' });
  assert.ok(coach.has('student.analytics.view'));
  assert.ok(!coach.has('metrics.aggregate'));
});
