# The course syllabus — bộ đề cương

## What was missing

The platform had a lesson for every skill, a seven-sheet packet for every
topic, five published papers and two thousand items — and no document saying in
what order any of it should be met. A teacher opening it for the first time had
a library, not a course.

`src/data/curriculum.ts` closes that. Four courses, 52 sessions, 114 class
hours, covering **30 of 30** measurable skills.

## Authored where judgement lives, derived where it does not

The teaching judgement in a syllabus is the **order** and the **reason**: why
Boundaries comes before Transitions, why the first full paper is sat in week
eight rather than week one, what a unit is meant to change about how a learner
reads. That is written by hand, in prose, in the `purpose` and `rationale`
fields of every unit.

Everything mechanical is **derived** by `src/engine/curriculum.ts` — which
lesson, which sheets, how many minutes, which objectives.

The reason is a failure mode specific to syllabus documents. A dead reference
in code throws. A dead reference in a syllabus produces a session with nothing
in it, and nothing complains; the first person to find out is a teacher
standing in front of a class. A course plan naming sixty sessions against seven
sheet references each would be quietly wrong within a month of the first
content change. So a unit names its skills, the lesson and topic data supplies
the rest, and `check:bank` refuses a skill that does not exist.

Objectives are derived from the lesson's own `idea` and the topic's question
types, for the same reason: an objective written separately from the lesson
drifts from it, and then the syllabus promises one thing while the material
teaches another.

## The four courses

Entry is a **score condition**, never a level name, so nobody is placed by
impression. The ranges are tested to be non-overlapping and to leave no total
between 400 and 1600 unplaced.

| Course | Entry | Sessions | Exit |
| --- | --- | --- | --- |
| **Nền tảng** / Foundation | below 1100, or no diagnostic | 6 units | every question type met once |
| **Chuẩn** / Core | 1100–1340 | 4 units | two papers four weeks apart, second above 1350 |
| **Tăng tốc** / Advance | 1350+ on a full-length paper | 3 units | certification sitting at Distinction |
| **Nước rút** / Sprint | inside four weeks of a booked test | 2 units | no target score, by design |

A learner at 950 and a learner at 1400 do not need the same course in different
amounts; they need different courses. At 950 the binding constraint is usually
that half the question types have never been recognised at all, and the fix is
coverage. At 1400 coverage is complete and the constraint is the last hard item
per module plus the clock, and the fix is precision under time. One course
stretched across both bores one learner and drowns the other.

The Sprint course teaches nothing new **on purpose**. A learner who meets a new
method in the final week carries an unrehearsed method into the exam hall.

## Placement

`placeByDiagnostic(total, daysToTest)` returns **no course** when there is no
diagnostic, rather than a guess. This is the platform's standing rule — nothing
unmeasured is scored as anything — applied to placement.

A booked test date inside four weeks overrides the score entirely: a 1400
learner three weeks out does not need Advance, because there is no time for
anything new to become automatic.

## The invariant that matters

```
curriculum: no course teaches "X", which the platform measures
```

A platform that can tell a learner Transitions is their weakest skill, and
whose courses never teach Transitions, has sold them a diagnosis with no
treatment. `check:bank` fails on a non-empty `untaught`, and
`tests/curriculum.test.ts` holds the same line independently.

Other invariants, each covering a way a syllabus rots:

- Every session teaches something and states what it is for, bilingually.
- A lesson is read the **first** time a course meets a skill, not every time —
  a course that sends a learner back to the same lesson three times is one
  nobody follows.
- Each unit's checkpoint sits on its **last** session and nowhere else.
- Homework load is derived from the sheets actually set and must land between
  0.5 and 8 hours a week. A course that claims two hours and sets five is a
  course learners stop doing the homework for.
- Every course is deliverable inside a term.

## Known limits

- Sessions are equal-length by course. A real timetable has a long first
  session and short ones near the exam, and the model cannot express that.
- The syllabus is not yet joined to a learner's progress: it says what a course
  covers, not which session a given learner is on. That connection is the next
  obvious thing to build, and it is what would let the guardian report say
  "session 9 of 13" rather than only reporting activity.
- Checkpoints define a bar but nothing enforces it. A teacher can carry a
  learner past a failed unit, and the platform will not object.
- Pairing two skills into one session is authored and currently unused; every
  session teaches one skill.
