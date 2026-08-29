/**
 * Lesson library invariants.
 *
 * The structural checks — one lesson per blueprint skill, no orphans — live
 * in `check:bank`, because they are content invariants. What is tested here
 * is the shape that makes a lesson usable: a method a learner can follow, a
 * worked example that actually applies it, and traps that say why they are
 * tempting rather than merely that they exist.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { LESSONS, LESSON_BY_SKILL, lessonFor, lessonsForSection, totalMinutes } from '../src/data/lesson-index.ts';
import { DOMAINS } from '../src/data/blueprint.ts';

const skillIds = new Set(DOMAINS.flatMap((d) => d.skills.map((s) => s.id)));

test('every blueprint skill has exactly one lesson', () => {
  assert.equal(LESSONS.length, skillIds.size);
  for (const skill of skillIds) {
    assert.ok(LESSON_BY_SKILL[skill], `no lesson for ${skill}`);
  }
});

test('a lesson sits in the section its skill belongs to', () => {
  for (const domain of DOMAINS) {
    for (const skill of domain.skills) {
      assert.equal(
        LESSON_BY_SKILL[skill.id].section,
        domain.section,
        `${skill.id} is taught under the wrong section`,
      );
    }
  }
});

test('every lesson is bilingual, key for key', () => {
  for (const lesson of LESSONS) {
    for (const [en, vi] of [
      [lesson.title, lesson.titleVi],
      [lesson.idea, lesson.ideaVi],
      [lesson.worked.prompt, lesson.worked.promptVi],
      [lesson.worked.answer, lesson.worked.answerVi],
    ]) {
      assert.ok(en.trim().length > 0, `${lesson.skill}: empty English text`);
      assert.ok(vi.trim().length > 0, `${lesson.skill}: empty Vietnamese text`);
    }
    assert.equal(
      lesson.method.length,
      lesson.methodVi.length,
      `${lesson.skill}: the two languages prescribe different numbers of steps`,
    );
    assert.equal(
      lesson.worked.steps.length,
      lesson.worked.stepsVi.length,
      `${lesson.skill}: the worked example differs between languages`,
    );
  }
});

test('a method has enough steps to be a method and few enough to be followed', () => {
  for (const lesson of LESSONS) {
    // One step is an assertion, not a procedure; more than seven will not
    // survive contact with a timed section.
    assert.ok(lesson.method.length >= 3, `${lesson.skill}: ${lesson.method.length} steps`);
    assert.ok(lesson.method.length <= 7, `${lesson.skill}: ${lesson.method.length} steps`);
    for (const step of lesson.method) {
      assert.ok(step.trim().length > 0, `${lesson.skill}: empty step`);
    }
  }
});

test('the worked example is solved, not merely posed', () => {
  for (const lesson of LESSONS) {
    assert.ok(
      lesson.worked.steps.length >= 2,
      `${lesson.skill}: the worked example asserts an answer instead of deriving it`,
    );
    assert.ok(lesson.worked.answer.trim().length > 0, `${lesson.skill}: no answer`);
  }
});

test('every trap explains why it is tempting', () => {
  for (const lesson of LESSONS) {
    assert.ok(lesson.traps.length >= 2, `${lesson.skill}: ${lesson.traps.length} traps`);
    for (const trap of lesson.traps) {
      assert.ok(trap.name.trim().length > 0, `${lesson.skill}: unnamed trap`);
      assert.ok(trap.nameVi.trim().length > 0, `${lesson.skill}: unnamed trap (vi)`);
      // A warning without a reason does not transfer: the student recognises
      // the sentence, not the situation.
      assert.ok(
        trap.why.trim().length >= 30,
        `${lesson.skill}/${trap.name}: the reason is too thin to teach anything`,
      );
      assert.ok(trap.whyVi.trim().length >= 20, `${lesson.skill}/${trap.name}: no reason (vi)`);
    }
  }
});

test('reading time is stated and plausible', () => {
  for (const lesson of LESSONS) {
    assert.ok(
      lesson.minutes >= 3 && lesson.minutes <= 15,
      `${lesson.skill}: ${lesson.minutes} minutes`,
    );
  }
  // The whole library has to be readable inside a preparation window; a
  // learner who cannot finish it will not start it.
  assert.ok(totalMinutes() <= 300, `${totalMinutes()} minutes to read everything`);
});

test('lookups are exact and a missing skill returns nothing rather than a default', () => {
  assert.equal(lessonFor(undefined), undefined);
  assert.equal(lessonFor('not-a-skill'), undefined);
  assert.equal(lessonFor('transitions')?.skill, 'transitions');

  const rw = lessonsForSection('rw');
  const math = lessonsForSection('math');
  assert.equal(rw.length + math.length, LESSONS.length);
  assert.ok(rw.every((l) => l.section === 'rw'));
  assert.ok(math.every((l) => l.section === 'math'));
});
