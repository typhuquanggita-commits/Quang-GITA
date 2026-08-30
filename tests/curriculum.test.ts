/**
 * The course syllabus.
 *
 * A syllabus fails differently from code. A dead reference does not throw; it
 * produces a session with nothing in it, and the first person to find out is
 * a teacher standing in front of a class. So these tests are mostly about
 * references staying alive and the derived timetable staying deliverable.
 *
 * The one that matters most is coverage: a platform that can tell a learner
 * which skill is their weakest, and whose courses never teach that skill, has
 * sold them a diagnosis with no treatment.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { COURSES, COURSE_BY_ID } from '../src/data/curriculum.ts';
import {
  allCoursePlans,
  buildCoursePlan,
  coverage,
  curriculumProblems,
  placeByDiagnostic,
} from '../src/engine/curriculum.ts';
import { DOMAINS } from '../src/data/blueprint.ts';
import { PAPERS } from '../src/data/papers.ts';
import { lessonFor, topicFor } from '../src/data/lesson-index.ts';

const skillIds = DOMAINS.flatMap((d) => d.skills.map((s) => s.id));

test('every measurable skill is taught by some course', () => {
  const { untaught } = coverage(skillIds);
  assert.deepEqual(untaught, [], `diagnosed but never taught: ${untaught.join(', ')}`);
});

test('the syllabus has no structural problems', () => {
  assert.deepEqual(curriculumProblems(skillIds), []);
});

test('every skill a course names has a lesson and a topic behind it', () => {
  for (const course of COURSES) {
    for (const unit of course.units) {
      for (const skill of unit.skills) {
        assert.ok(lessonFor(skill), `${course.id}/${unit.id}: no lesson for ${skill}`);
        assert.ok(topicFor(skill), `${course.id}/${unit.id}: no topic for ${skill}`);
      }
    }
  }
});

test('every paper checkpoint names a paper that exists', () => {
  const ids = new Set(PAPERS.map((p) => p.id));
  for (const course of COURSES) {
    for (const unit of course.units) {
      if (unit.checkpoint.kind !== 'paper') continue;
      assert.ok(unit.checkpoint.paperId, `${course.id}/${unit.id}: paper checkpoint names no paper`);
      assert.ok(ids.has(unit.checkpoint.paperId!), `${course.id}/${unit.id}: unknown paper`);
    }
  }
});

test('sessions are numbered once, continuously, across the whole course', () => {
  for (const plan of allCoursePlans()) {
    const indices = plan.sessions.map((s) => s.index);
    assert.deepEqual(
      indices,
      indices.map((_, i) => i + 1),
      `${plan.course.id}: session numbering is not continuous`,
    );
  }
});

test('every session teaches something and states what it is for', () => {
  for (const plan of allCoursePlans()) {
    for (const session of plan.sessions) {
      assert.ok(session.materials.length > 0, `${plan.course.id}/${session.index}: no materials`);
      assert.ok(session.objectives.length > 0, `${plan.course.id}/${session.index}: no objectives`);
      for (const objective of session.objectives) {
        assert.ok(objective.text.trim().length > 25, `${plan.course.id}/${session.index}: thin objective`);
        assert.ok(objective.textVi.trim().length > 20, `${plan.course.id}/${session.index}: objective not bilingual`);
      }
    }
  }
});

test('a lesson is read the first time a course meets a skill, not every time', () => {
  // The Advance course revisits skills the Core course taught, and within a
  // course a skill can appear in two units. Sending a learner back to the same
  // lesson each time is how a syllabus becomes something nobody follows.
  for (const plan of allCoursePlans()) {
    const seen = new Set<string>();
    for (const session of plan.sessions) {
      for (const material of session.materials) {
        if (seen.has(material.skill)) {
          assert.equal(
            material.lesson,
            false,
            `${plan.course.id}: re-reads the lesson for ${material.skill}`,
          );
        } else {
          assert.equal(material.lesson, true, `${plan.course.id}: never reads the lesson for ${material.skill}`);
        }
        seen.add(material.skill);
      }
    }
  }
});

test('each unit ends on its checkpoint and nothing else carries one', () => {
  for (const plan of allCoursePlans()) {
    for (const unit of plan.course.units) {
      const sessions = plan.sessions.filter((s) => s.unitId === unit.id);
      assert.ok(sessions.length > 0, `${plan.course.id}/${unit.id}: no sessions`);
      sessions.forEach((session, i) => {
        const last = i === sessions.length - 1;
        assert.equal(
          session.checkpoint !== null,
          last,
          `${plan.course.id}/${unit.id}: checkpoint is not on the last session`,
        );
      });
    }
  }
});

test('the homework load is derived from the sheets set, and is survivable', () => {
  for (const plan of allCoursePlans()) {
    const perWeek = (plan.homeworkHours / plan.weeks);
    assert.ok(
      perWeek > 0.5 && perWeek < 8,
      `${plan.course.id}: ${perWeek.toFixed(1)} homework hours a week is not a real course`,
    );
  }
});

test('every course is deliverable in a term', () => {
  for (const plan of allCoursePlans()) {
    assert.ok(plan.totalSessions >= 4, `${plan.course.id}: ${plan.totalSessions} sessions is not a course`);
    assert.ok(plan.weeks <= 20, `${plan.course.id}: ${plan.weeks} weeks is longer than a term`);
    assert.ok(plan.classHours > 0);
  }
});

test('entry ranges do not overlap and leave no score unplaced', () => {
  const graded = COURSES.filter((c) => c.id !== 'sprint');
  for (let total = 400; total <= 1600; total += 10) {
    const matches = graded.filter(
      (c) =>
        (c.entry.minScore === null || total >= c.entry.minScore) &&
        (c.entry.maxScore === null || total <= c.entry.maxScore),
    );
    assert.equal(matches.length, 1, `${total} matches ${matches.length} courses`);
  }
});

/* ---------------- Placement ---------------- */

test('placement waits for a diagnostic rather than guessing', () => {
  const placement = placeByDiagnostic(null, 90);
  assert.equal(placement.course, null);
  assert.ok(placement.reason.includes('No diagnostic'));
  assert.ok(placement.reasonVi.includes('đầu vào'));
});

test('a booked test inside four weeks overrides the score-based placement', () => {
  // A 1400 learner three weeks out does not need the Advance course; they need
  // rehearsal, and there is no time for anything else to become automatic.
  const placement = placeByDiagnostic(1400, 20);
  assert.equal(placement.course?.id, 'sprint');
});

test('each band places into the course written for it', () => {
  assert.equal(placeByDiagnostic(980, 120).course?.id, 'foundation');
  assert.equal(placeByDiagnostic(1200, 120).course?.id, 'core');
  assert.equal(placeByDiagnostic(1450, 120).course?.id, 'advance');
});

test('every course plan can be built, and an unknown one returns nothing', () => {
  for (const course of COURSES) {
    assert.ok(buildCoursePlan(course.id), `${course.id} does not build`);
    assert.ok(COURSE_BY_ID.get(course.id));
  }
  // @ts-expect-error — deliberately unknown id
  assert.equal(buildCoursePlan('does-not-exist'), null);
});

test('every unit says why it sits where it does, in both languages', () => {
  for (const course of COURSES) {
    for (const unit of course.units) {
      assert.ok(unit.rationale.trim().length > 60, `${course.id}/${unit.id}: rationale too thin`);
      assert.ok(unit.rationaleVi.trim().length > 40, `${course.id}/${unit.id}: rationale not bilingual`);
      assert.ok(unit.purpose.trim().length > 60, `${course.id}/${unit.id}: purpose too thin`);
      assert.ok(unit.purposeVi.trim().length > 40, `${course.id}/${unit.id}: purpose not bilingual`);
    }
  }
});
