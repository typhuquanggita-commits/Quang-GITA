# The long roadmap, and the 1600 question

## What was missing

The platform had four courses of seven to thirteen weeks and nothing that
chained them. A learner starting at 1050 in September with a June test date
could see which course they belonged in *today*, and had no answer at all to
the question they were actually asking:

> What happens between now and June, and does it get me there?

`src/engine/roadmap.ts` answers that. **The answer is allowed to be no.**

## The science, stated plainly

### Gains compress, and the model integrates that

A hundred points at 1400 costs several times a hundred points at 1000. The
compression factors are:

| From | Factor |
| --- | --- |
| under 1150 | 1.00 |
| 1150–1299 | 0.80 |
| 1300–1399 | 0.55 |
| 1400–1499 | 0.35 |
| 1500+ | 0.20 |

`hoursToReach` **integrates** these in ten-point steps rather than applying the
starting band's factor once. That is not a refinement — for a 1000 → 1450
climb, applying the starting factor once gives 82 hours and integrating gives
121. Doing it the naive way makes a long roadmap look **47% more feasible than
it is**, and a test pins the difference.

### Feasibility has five verdicts, and three of them are bad news

| Verdict | When |
| --- | --- |
| `comfortable` | 1.5× the required hours available — room for a repeated unit, which most learners need at least once |
| `demanding` | fits with nothing spare; a missed month costs the target |
| `unlikely` | 0.6–1.0× — states the realistic outcome instead |
| `out-of-reach` | under 0.6× — says so now rather than in June |
| `noise-limited` | target ≥ 1550 |

A preparation platform has every commercial reason to say yes. The tests exist
to stop it: an eight-week 1000 → 1500 schedule must return `out-of-reach`, and
the message must point at a second sitting rather than merely refusing.

## On 1600

1600 is a perfect score: near-zero error across roughly 98 items in 2h14, and
under one candidate in a hundred reaches it.

**Above about 1550 the remaining gain is two or three items per sitting, which
is inside the variation of a single morning.** So the `noise-limited` verdict
says, in as many words:

> More study stops being the lever and more sittings becomes it: prepare to the
> highest band you can reach reliably, then sit twice. A platform that promises
> 1600 is not describing preparation, it is describing luck.

The conditions for a top score are published as **conditions, not
encouragement** — the arithmetic of a perfect score, hard-band items in every
domain with no weak one left, accuracy that survives the fourth hour, more than
one sitting, and Bluebook sat in full. A test asserts that nothing anywhere
promises 1600.

## Sittings: the part most preparation gets wrong

- **One sitting at the end** leaves no way back from a bad morning.
- **Three in three consecutive months** measure the same ability three times —
  nothing changed between them.
- **Two, at least eight weeks apart, with a phase of work between**, is the
  shape that produces top scores.

The first sitting's job is explicitly *not the score*: it is to make the second
one ordinary. A candidate whose first exam hall is the one that counts loses
points to the room rather than to the questions.

Every sitting the roadmap proposes is a **real administration** from
`testDates.ts` — a test asserts no date is invented — and every one is advised
five weeks before its deadline, because centres in Hà Nội and Hồ Chí Minh City
fill long before the deadline.

## Personalisation is from the diagnostic, and only from it

`courseChain` starts where the learner is. A 1420 learner does not sit through
Foundation or Core; a 950 learner starts at Foundation whatever they would
rather do.

**With no diagnostic there is no roadmap.** The page refuses and says what it
needs, rather than drawing a plausible plan around a guess:

> A roadmap needs a starting point. Until a full-length diagnostic has been sat
> and scored, every phase length and every projected score would be invented —
> and a plan built on an invented baseline is wrong in every figure it
> contains.

The baseline is the best **full-length** sitting. A section paper is not a
baseline: it measures half the standard, and doubling it invents the other
half.

## Known limits

- The gain model is a conservative rule of thumb, not a calibrated
  relationship. It gives the *scale* of the work; real progress depends on the
  quality of the hours, not their count.
- Phases run back to back with no allowance for school exams, Tết, or illness.
  A real year has gaps and the model has none.
- The roadmap does not update itself as evidence arrives. It is recomputed on
  each visit from the current best diagnostic, so a mid-course sitting moves it
  — but nothing records that the plan changed or why.
- Only two sittings are ever proposed. Some candidates legitimately sit three
  times, and the model has no view on when that is right.
