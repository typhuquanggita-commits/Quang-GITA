# The automated coach

## What it does

Reads everything the platform knows about a learner and produces the
programme for today: concrete blocks, in order, with the questions already
selected. A learner opens the Today screen and starts working without
deciding anything.

## What it will not do

Three refusals define it more than any feature:

**It will not prescribe past what it knows.** Below roughly forty logged
responses the programme is marked provisional and the interface says so. A
confident plan built on four data points is worse than an honest small one.

**It will not silently keep issuing homework to a learner in trouble.**
Disengagement, decline under sustained effort, an unreachable target, and
repeated departures from a proctored test all raise an escalation aimed at a
named practitioner level.

**It will not make a decision it cannot explain.** Every block traces to a
rule; every rule firing records the evidence that triggered it and the
reasoning behind the rule itself. The decision log is not a debugging feature
— it is the thing that makes the system arguable, and a system nobody can
argue with should not be trusted for long.

## How a day is built

1. **Context.** `buildContext` assembles roughly thirty figures from platform
   state: attendance, adherence over two windows, accuracy across two adjacent
   windows of fifty responses, review debt, domain coverage, error mix, GITA
   pillars and tier, assignments owed, integrity events.

2. **Rules fire in priority order.** Safety rules run first, then calendar,
   then measurement, then review debt, then set work, then prescription, then
   load. An **exclusive** rule settles the day and stops the rest: a taper, a
   rest day, and a disengaged learner are not one input among several.

3. **Load band.** The last rule to set one wins: `recovery`, `standard`,
   `push`, or `taper`. Each carries a factor applied to the learner's own
   daily commitment, producing a minute budget.

4. **Blocks are materialised into the budget.** They are ordered by kind, not
   by which rule produced them — a `lesson` always precedes the `drill` it
   explains, since instruction that arrives after the practice teaches
   nothing the practice has not already guessed at. Divisible blocks are
   shortened to fit; a full-length rehearsal and a rest day are
   all-or-nothing. A drill with nothing left to serve is dropped rather than
   sent as an empty session.

5. **Items are selected.** Drills arrive with their questions already chosen
   by the same maximum-information selector the practice surface uses, with
   difficulty expressed as an offset from the learner's own ability — so
   "harder" means harder *for them*.

## The rule catalogue

Rules live in `src/engine/interventions.ts`, one per condition, each with a
rationale written for a human reader.

| Priority | Rule | Fires when |
| --- | --- | --- |
| 0 | `r-disengaged` | A previously active learner has stopped entirely |
| 1 | `r-declining-under-effort` | Accuracy falling while adherence holds |
| 2 | `r-integrity-anomaly` | Repeated window departures in a proctored test |
| 10 | `r-taper` | Three days or fewer to the test |
| 11 | `r-post-test-recovery` | A full-length test was completed today |
| 12 | `r-schedule-rehearsal` | Weekend, tier 3+, and a rehearsal is overdue |
| 13 | `r-weekly-rest` | Sunday, after a week with real work in it |
| 20 | `r-need-baseline` | No diagnostic and almost no responses |
| 21 | `r-tier-one-contact` | Absorption tier 1 |
| 30 | `r-review-debt` | Fifteen or more cards more than three days overdue |
| 31 | `r-review-daily` | Any cards due |
| 40 | `r-assignment-due` | Set work due within two days |
| 50 | `r-careless-dominant` | Careless errors are the largest share |
| 51 | `r-pacing-dominant` | Rushed and omitted answers are the largest share |
| 51.5 | `r-untaught-weak-skill` | The weakest measured skill has a lesson that was never read |
| 52 | `r-weak-skill-drill` | The default: work the weakest measured skills |
| 53 | `r-coverage-gap` | A domain has almost no responses |
| 60 | `r-adherence-slide` | Adherence has fallen sharply in the last week |
| 61 | `r-behind-volume` | Late in the week and well behind the commitment |
| 62 | `r-target-out-of-reach` | The target exceeds what the hours support |
| 70 | `r-inspirits-limiting` | Inspirits is limiting, with evidence to act on |
| 71 | `r-vocab-maintenance` | Tier 2+, not tapering |

## Decisions worth defending

**Why rules rather than a model.** A learned policy would optimise a metric
and could not tell a coach why it told a student to rest. The failure mode is
specific and bad: a system that produces confident, unexplainable homework
gets followed until it is wrong once, and then gets abandoned entirely. Rules
are auditable, editable by a practitioner, and wrong in ways someone can see.

**Why one exclusive rule can end the day.** A learner who has stopped
entirely does not need a better plan, and one three days from the test does
not need new material. Blending those cases with routine prescription
produces a plan that is technically balanced and practically harmful.

**Why the budget is a budget.** A plan that asks ninety minutes of someone
who has fifteen is not ambitious; it teaches them that plans are ignorable.
The programme is trimmed to what the load band allows, and the interface shows
the arithmetic.

**Why a rule that throws is skipped, not fatal.** A broken rule degrades the
plan. A broken rule that crashes the builder removes the plan entirely, on the
day it happens to break. The builder catches and continues.

## Auditing a decision

Open Today, choose *Why these?*, and expand any entry. Each shows:

- **The evidence read** — the actual values, not a summary
- **Why the rule exists** — the reasoning, in plain language
- **The rule id** — for locating it in `src/engine/interventions.ts`
- **How many blocks it contributed** to today's session

If a decision is wrong, the rule is wrong, and the rule is a small piece of
readable code with tests around it.

## Escalations

An escalation names the lowest practitioner level equipped to handle it, so it
routes rather than merely alarms.

| Code | Severity | Handled by |
| --- | --- | --- |
| `disengaged` | urgent | Coach |
| `declining-under-effort` | attention | Coach |
| `target-unreachable` | attention | Instructor |
| `integrity-anomaly` | info | Instructor |

The integrity escalation is deliberately `info` and its wording says
"observation, not a finding". An interruption at home produces the same record
as anything else.

## Tests

`tests/autopilot.test.ts`, 40 tests. The ones that matter most:

- *a disengaged learner gets an urgent escalation and no homework*
- *a learner declining under sustained effort is not told to work harder*
- *the three days before a test are a taper with no new material*
- *the programme never exceeds the budget its load band allows*
- *no item appears in two blocks on the same day*
- *an easier block draws easier items than a harder one*
- *no rule throws on a context with every optional signal missing*

## Extending it

A new rule is a single object in `RULES`:

1. Pick a priority band from the table above.
2. Write `rationale` for a human, in both languages. If you cannot state why
   the rule should exist, it should not.
3. Return `null` unless the condition genuinely holds — a rule that fires on
   every learner adds noise and pushes better rules out of the budget.
4. Record evidence with actual values. This is what makes the log worth
   reading.
5. Set `exclusive` only if the rule should settle the whole day.
6. Add a test that it fires when it should **and one that it stays silent when
   it should not**. The second is the one that catches over-eager rules.
