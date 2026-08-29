# The GITA training model

## Why it exists

SAT365 measures what a student can do on a test. That is a narrow thing to
measure, and a platform that only did that would produce good scores and
unchanged people.

GITA is the layer that decides who someone becomes on the way to the score. It
is the reason this is not another question bank.

## The four pillars

| | Pillar | What it is | What its absence looks like |
| --- | --- | --- | --- |
| **G** | Goal | The destination: a target, standards of excellence, and what "done well" means | Effort scatters; nothing compounds |
| **I** | Inspirits | The fuel: drive, desire, belief, nerve, inner strength | A strong start, silence by week three |
| **T** | Talent | The edge: strengths, excellent thinking, speed, focus | Time spread evenly; nothing becomes excellent |
| **A** | Action | The road: decisive, persistent, careful work built as habits | Understanding without accumulation |

Each pillar has four named dimensions, so a coach can point at something
specific rather than at a mood. See [PILLARS.md](PILLARS.md).

The pillars are not independent and are never read alone. A student with a
strong Goal and no Inspirits stalls in week three. One with Talent and no
Action never converts it. The profile engine reads all four together and names
**one** limiting pillar, because a coach handed four priorities has none.

## How a profile is produced

Scored from behaviour the platform already holds — attendance, pacing under
time, whether errors get closed, whether practice sits at the edge of ability
— not from a questionnaire. Self-report is used only for the dimensions no
behaviour can stand in for: belief, desire, standards, commitment.

Two properties matter:

**Unmeasured signals are dropped, not defaulted.** A learner the platform has
never observed scores low, not average and certainly not high. An early
version defaulted pacing to "on pace" and composure to "unaffected", which
handed a brand-new learner a Talent score of 42 from no data whatsoever. Now a
driver with no evidence behind it does not appear at all. There are tests that
hold this line.

**Every pillar carries a confidence figure**, and the interface shows a
warning below 35%. A pillar scored from three data points must not look like
one scored from three hundred.

## Absorption tiers

Five tiers, describing how much of the model a person can take on right now.

**A tier is not a ranking of people and must never be presented as one.** It
answers a delivery question. Give someone tier-5 material at tier 1 and they
abandon the whole thing.

| Tier | Name | Installing |
| --- | --- | --- |
| 1 | Contact | Showing up at all |
| 2 | Rhythm | A habit that survives a bad week |
| 3 | Method | Effort aimed by evidence, not by feel |
| 4 | Transfer | The method leaving the study room |
| 5 | Autonomy | Running the system yourself, and raising others |

Tiers are placed from evidence and the gates are evaluated bottom-up, so
strength in one narrow area cannot skip an earlier gate. A coach can override
the placement when they know something the data does not; the override is
visible, and it suspends evidence-based placement until cleared.

See [TIERS.md](TIERS.md).

## The three arenas

The claim that GITA becomes part of a person is only honest if it is checked
outside the study room.

| Arena | Purpose | Opens |
| --- | --- | --- |
| Family | Turn the home from a place that monitors studying into one that makes it easy | Tier 2 |
| School | Convert class hours into deliberate practice; use peers as an engine, not a comparison | Tier 3 |
| Society | Prove the method holds outside its origin, and turn ability into contribution | Tier 4 |

Each carries rituals with numbered steps, the mistake that most often kills
each ritual, and observable indicators phrased so they can be answered yes or
no. See [ARENAS.md](ARENAS.md).

## Habits

Habits are the mechanism. Each carries a leverage rating on the 20/80 rule,
and the active set is capped at five — a learner running eleven habits is
running none of them.

Adherence is measured against the cadence the habit asks for, over 28 days,
capped at 1. Four sessions in a month is full adherence for a weekly habit and
poor adherence for a daily one, and the cap stops one enthusiastic week from
disguising a month of misses.

Streaks are shown too, but adherence is the honest number.

## Practitioners

Four levels — advisor, instructor, coach, master coach — governing what
someone is *qualified to deliver*. Kept deliberately separate from platform
permissions, which govern what data someone can *see*. A new teacher may hold
wide data access and still not be ready to work inside a family.

Each level names what it must escalate rather than handle. See
[PRACTITIONERS.md](PRACTITIONERS.md).

## Where it lives in the code

```
src/gita/framework.ts    Pillars, dimensions, tiers, practitioner ladder
src/gita/habits.ts       Habit library, leverage, adherence, streaks
src/gita/arenas.ts       Family, school, society: rituals and indicators
src/gita/assessment.ts   Profile scoring, tier placement, next move
src/gita/useGitaProfile.ts  Draws behavioural evidence from platform data
src/features/gita/       The workspace: profile, habits, transfer, playbook
```
