# Solutions, analysis, and the learner's dossier

## The gap these close

The platform could deliver a two-hour test, score it, and show a number. Every
item in the bank has always carried a worked explanation and a note on each
distractor saying what error produces it — and once an attempt was submitted,
none of it was reachable. A learner who wanted to know what they had actually
got wrong had nowhere to go.

Three surfaces, built on one calculation.

## One calculation, three views

`src/engine/attemptReview.ts` turns a finished attempt into one row per
delivered question: what the learner did, what was correct, how long it took
against the item's own target, which kind of error the mistake was, and which
lesson explains the skill it tested.

It is a pure function of the attempt. The solutions screen, the analysis table,
and the dossier all read the same rows, so they cannot disagree — three views of
one truth rather than three calculations that drift.

## `#/solutions/:attemptId` — worked solutions

Reached from the score report. Three decisions shape it.

**Delivery order, never sorted.** Questions appear as they were faced, so a
learner can see where in the module their pacing broke down. Sorting by skill
or by correctness destroys exactly that.

**The stimulus is shown again.** A solution to a passage question read without
the passage is a claim, not an explanation.

**Every item links to its lesson.** "You got Transitions wrong" is a diagnosis
with no treatment attached. The related knowledge is one click away.

Each card carries the verdict, the learner's answer marked against the key, the
time against target, the pace, the error kind, the explanation, why each
distractor is tempting, and the lesson. Filters: all, wrong, flagged, off pace.

An omission is reported as omitted, not as incorrect. Both score as wrong, but
a learner who ran out of time and one who guessed wrong need different advice.

Field-test items get a row and are labelled unscored. They are shown because a
learner who spent time on them deserves the explanation; they are excluded from
every roll-up because they never counted.

## `#/analysis/:attemptId` — the detailed analysis

Three roll-ups, each pointing at a different next step.

**By skill**, weakest first, with the error accounting for most of that skill's
mistakes and a link to its lesson. Mastery rather than percent correct: getting
easy items right is not mastery and percent-correct cannot tell the difference.

**By difficulty band.** Missing only hard items is a ceiling; missing easy ones
is a leak. The screen names which shape it is looking at, because the two call
for opposite responses and look similar on a chart.

**Question by question**, the full record, exportable as CSV with every field
quoted — a prompt or a key can contain a comma, and an export that shifts a
column silently is worse than none.

## `#/dossier` — the learner's record and route

Everything the platform knows about one person, and the pathway it recommends
with the evidence for each step attached.

**Every step says *because*.** A personalised route is only as trustworthy as a
reader's ability to check it; a recommendation shown without the observation
behind it is asking to be believed rather than examined.

**A step with no evidence is not generated.** With nothing scored, the route is
exactly one step — sit a full-length test — and the reason given is that every
later step is aimed by a measurement and there is nothing to aim with. A
brand-new learner gets a short, honest document rather than a complete-looking
one about somebody who does not exist.

The ordering encodes the same principles the coach holds:

| Order | Step | Fires when |
| --- | --- | --- |
| 0 | `measure` | Nothing scored — and it is then the *only* step |
| 1 | `habit` | Fewer than 8 study days in 28: no content plan survives a schedule that is not kept |
| 2 | `pace` | Careless slips are 40%+ of mistakes — harder practice does not recover those marks |
| 3 | `pace` | Timeouts and omissions are 40%+ — a clock problem, not a knowledge problem |
| 10+ | `learn` | A weak skill whose lesson has never been read |
| 20+ | `drill` | A weak skill whose lesson *has* been read: the gap is practice, not instruction |
| 30 | `consolidate` | Three or more skills at 80%+ and none weak |
| 40 | `review` | More than 10 days out with fewer than 3 full-length tests on record |

A skill with fewer than four responses never enters the route: naming it as a
weakness would send a learner after a problem the evidence cannot say they
have.

The dossier also carries the score history with each ±1 SEM band, the skill
mastery lines marked read/unread against the lesson library, the error profile
kept as four separate kinds, and the GITA limiting pillar with its confidence.
It prints and exports as JSON.

**What has not been measured comes before what is known**, at the top of the
document. A reader who does not know the limits of a record will read past
them.

Held by `tests/attempt-review.test.ts` and `tests/dossier.test.ts`.
