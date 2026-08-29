# Absorption tiers

## What a tier is

How much of the model a person can take on **right now**.

It is not a ranking of people, it is not a judgement of potential, and it must
never be presented to a learner as either. Someone at tier 1 is not worse than
someone at tier 4; they are earlier, and handing them tier-4 material is the
fastest way to lose them entirely.

## Why gating matters

The most common failure in a coaching programme is delivering the right
material at the wrong time. A learner whose study habit is still failing,
handed a family intervention and a second-domain project, does not get four
times the benefit. They get overwhelmed and quit — and the model gets blamed
for it.

Tiers exist so the programme meets someone where they are and opens the next
level when the evidence says they are ready.

---

## Tier 1 — Contact

**Installing:** showing up at all. Nothing else matters until attendance is
real.

**Daily budget:** 15 minutes.

**Practices**
- One short session on a fixed day and time
- Name the target score out loud once
- Log the session, even a bad one

**Habits:** same time same place; log every session.

**Gate to tier 2:** four sessions in two weeks, unprompted.

**Coaching note.** Resist teaching method here. A learner at tier 1 who
receives a study-technique lecture hears that this is complicated, and
complicated things get postponed. The only job is that they sit down.

---

## Tier 2 — Rhythm

**Installing:** a habit that survives a bad week without a coach holding it up.

**Daily budget:** 30 minutes.

**Practices**
- A fixed weekly volume, not a fixed mood
- Review every wrong answer the same day
- One diagnostic to replace opinion with data

**Habits:** same time same place; same-day error review; hold the weekly
volume.

**Gate to tier 3:** three consecutive weeks at target volume, and a baseline
score on record.

**Coaching note.** Weekly volume rather than a daily streak, deliberately. A
daily streak breaks on the first disrupted day and takes motivation with it.
A weekly total absorbs a bad Tuesday.

**Family arena opens here.**

---

## Tier 3 — Method

**Installing:** stop working hard on the wrong things. Aim effort by evidence.

**Daily budget:** 45 minutes.

**Practices**
- Weekly review of the skill map before choosing what to drill
- Deliberate practice at the edge, not in the comfortable middle
- Separate careless errors from concept gaps and treat them differently

**Habits:** read the skill map first; practise at the edge; triage your
errors; same-day error review.

**Gate to tier 4:** two weeks where the drilled skills are the ones the data
named.

**Coaching note.** This is where most of the score comes from, and where most
learners stall. The gate is deliberately about *whether* effort was aimed, not
about whether the score moved — because the score moves later.

**School arena opens here.**

---

## Tier 4 — Transfer

**Installing:** carrying the method out of the study room into family, school,
and life.

**Daily budget:** 60 minutes.

**Practices**
- Apply one GITA habit to a non-SAT commitment and track it
- Teach one concept to someone else each week
- Run a full-length rehearsal under real conditions

**Habits:** teach it to someone; run the method somewhere else; rehearse under
real conditions; read the skill map first.

**Gate to tier 5:** a habit sustained for a month in an arena outside study.

**Coaching note.** The second domain should be something the learner has
previously *failed* to sustain. Choosing something easy proves nothing.

**Society arena opens here.**

---

## Tier 5 — Autonomy

**Installing:** running the whole system yourself, and raising the standard
for others.

**Daily budget:** 75 minutes.

**Practices**
- Set and revise your own weekly plan from your own data
- Mentor a peer at a lower tier
- Hold a standard higher than what is being asked of you

**Habits:** write your own week; mentor someone behind you; practise at the
edge; run the method somewhere else.

**Gate:** none. This tier is the point of the model.

**Coaching note.** The coach's job here is to become unnecessary. A learner at
tier 5 who still needs weekly direction has not reached tier 5.

---

## How placement works

Gates are evaluated bottom-up and stop at the first unmet one. Strength in one
narrow area cannot skip an earlier gate — a learner with tier-5 accuracy and
two study days in a month is at tier 1, because attendance is the gate that
comes first.

An unmeasured signal **blocks** a gate rather than passing it. Absence of
evidence never opens a tier.

Tested in `tests/gita.test.ts` under *tier placement walks the gates from the
bottom up*, *strong evidence in one area cannot skip an earlier gate*, and *an
unmeasured signal never opens a tier*.

## Overriding placement

A coach can pin the tier when they know something the data does not — a
learner returning after illness, or one whose home situation has changed.

The override is visible in the interface, and it suspends evidence-based
placement until it is cleared. Use it deliberately, and clear it when the
reason passes.
