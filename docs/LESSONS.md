# The lesson library

## The gap this closes

Until the library existed, SAT365 could measure a learner and it could drill
them. It could not teach them. A student whose analytics named Transitions as
their weakest skill had exactly one thing to do about it: more Transitions
questions. That is how a misconception gets rehearsed a hundred times and
called studying.

Instruction and practice are different acts, and the platform now records them
separately. Knowing that someone has attempted a skill forty times says
nothing about whether anyone ever explained it to them.

## What a lesson is

One lesson per skill in the blueprint — thirty of them, no more and no fewer.
`npm run check:bank` fails if a skill has no lesson, if a lesson names a skill
the blueprint does not have, or if a skill has two.

Every lesson has the same four parts, in the same order, because the shape is
what makes it usable at the moment of need. A learner who has read three of
them knows where to look for the step they have forgotten without re-reading
the whole thing.

| Part | What it must be | What it must not be |
| --- | --- | --- |
| `idea` | The one thing that, once understood, changes how the question type is read | A summary of the topic |
| `method` | Three to seven steps a student can follow under time pressure | A step requiring judgement they do not yet have |
| `worked` | One example solved by the method just stated | An answer asserted without derivation |
| `traps` | The errors this question type is built to catch, each with **why** it is tempting | A list of warnings |

The "why" on a trap is not decoration. A warning without a reason does not
transfer: the student recognises the sentence, not the situation.

Both languages carry every field. `tests/lessons.test.ts` checks that the two
prescribe the same number of steps — a method that is five steps in English
and three in Vietnamese is two different methods.

## Where lessons enter the learner's day

**From analytics.** The mastery panel names a weakest skill and now offers the
lesson for it. Naming a weakness and then offering nothing but more of the
same questions was where that screen used to stop.

**From the coach.** Rule `r-untaught-weak-skill` (priority 51.5, Talent) fires
when the weakest skill with enough evidence has a lesson the learner has never
read. It prescribes an eight-minute lesson block followed by a fifteen-minute
drill on that same skill — in that order, which `BLOCK_ORDER` enforces and
`tests/autopilot.test.ts` locks. The block links straight to the lesson rather
than to the library index.

Once the lesson is read, the rule stops firing and `r-weak-skill-drill`
(priority 52) takes over. The learner is not re-taught something they have
already been taught.

Reading an unrelated lesson does not count. There is a test for this, because
a rule that treated any lesson as coverage would quietly stop prescribing the
one the learner actually needs.

**From the library.** `#/lessons` lists all thirty, weakest skill first. A
skill with fewer than four responses is left unranked rather than sorted into
a position it has not earned — an ability estimate from two responses is noise
wearing the costume of a measurement.

## How "read" is recorded

Only when the learner says so. Opening a page is not evidence of having read
it, and a coach that treated it as such would stop prescribing instruction the
learner still needs. `state.lessons[skill]` holds `firstReadAt`, `lastReadAt`,
and a read count, on local calendar dates.

## Adding a skill

A new skill in `src/data/blueprint.ts` needs a lesson in `lessons.ts` (Reading
and Writing) or `lessons-math.ts` (Math) in the same commit. `check:bank`
will refuse the change otherwise, which is the point: a skill that can be
measured but not explained reopens the gap this library exists to close.
