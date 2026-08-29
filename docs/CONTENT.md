# Authoring items

## What an item must have

Every item in the bank carries:

| Field | Requirement |
| --- | --- |
| `section`, `domain`, `skill` | Must classify into `src/data/blueprint.ts`; the skill must belong to the domain |
| `format` | `mcq` (four options) or `spr` (grid-in, Math only) |
| `band` | `easy`, `medium`, or `hard` |
| `irt` | `a` > 0, and `b` consistent with the band |
| `prompt` | Non-empty |
| `answer` | A choice id for `mcq`; a list of accepted numeric forms for `spr` |
| `explanation` | A worked explanation, not a restatement of the key |
| `distractorNotes` | For `mcq`: what error produces each wrong option |
| `targetSeconds` | Median time a well-prepared student needs |

Structural requirements are enforced by tests, not by review alone. See
*every item in the bank is structurally valid* and *every item classifies into
the published blueprint* in `tests/engine.test.ts`.

## Writing a Reading and Writing passage

- 25–150 words, one paragraph, matching the operational length.
- Original text. Never reproduce a copyrighted passage.
- Draw evenly across literature, history and social studies, humanities, and
  science.
- The answer must be determinable from the passage alone. Outside knowledge is
  a defect.

## Writing distractors

This is where item quality is won or lost.

Each wrong option must encode a **specific, nameable error** a real student
makes. "Plausible but wrong" is not good enough — if you cannot write the
`distractorNotes` entry, the distractor is not doing its job and should be
rewritten.

Common error modes worth encoding:

- Reversing a relationship the passage states
- Answering a different question than the one asked
- Over-generalising from a specific claim
- Taking a supporting detail as the main idea
- Arithmetic sign errors, or applying the right operation to the wrong base
- Reporting an intermediate value instead of the requested one

The written explanation for each distractor is not optional decoration. It is
how a learner converts a wrong answer into a corrected habit, and it is the
main thing a practice platform offers that the operational test does not.

## The trap to avoid: two correct answers

During development, one item shipped with two grammatically correct options
and was caught only on review. The lesson generalises: **for every wrong
option, state the rule it breaks.** If you cannot, either the option is
acceptable or the rule is not the one you think it is.

## Grid-in answers

List every equivalent form the five-character entry field accepts:

```ts
answer: ['3/4', '0.75', '.75']
```

The checker compares numerically with a tolerance, so a repeating decimal
rounded into five characters is accepted. It also rejects a zero denominator.

## Generated Math items

`src/data/generators.ts` produces parameterised Math items. Reading and
Writing items must be authored — a passage is a piece of writing and no
template produces a good one — but a linear-system item is a template plus a
choice of coefficients, and both the key and the distractors follow from the
arithmetic.

Every generated draw is validated before it enters the bank, and a draw that
fails is re-rolled with the next seed:

- Exactly four distinct, non-empty options
- The key is among them
- A finite numeric key for grid-ins
- An explanation of usable length

This exists because a distractor computed from an error mode sometimes
coincides with the key or with another distractor. Rather than hand-tuning
every template to make that impossible, the invalid draw is rejected. Four
such collisions were caught this way during development.

Generation is seeded, so the bank is identical on every device — a shared form
id refers to the same questions everywhere.

## Difficulty parameters

Provisional values by band:

| Band | `b` range | `a` range |
| --- | --- | --- |
| easy | −1.4 to −0.7 | 1.0–1.1 |
| medium | −0.3 to +0.5 | 1.1–1.2 |
| hard | +0.9 to +1.4 | 1.25–1.35 |

**These are author estimates, not calibrations.** See
[PSYCHOMETRICS.md](PSYCHOMETRICS.md) for the procedure that replaces them with
values estimated from response data, which is required before any score is
reported as authoritative.

## Bank depth

A two-stage adaptive form needs three distinct modules per section: the
routing module and both second-stage pathways. Below that depth, the upper and
lower pathways are forced to draw from the same remaining items and stop being
different tests — a failure that is invisible unless you check for it.

The test *the upper pathway is genuinely harder than the lower one* asserts a
mean difficulty gap of at least 0.3 logits. It caught exactly this problem
during development, when the Reading and Writing bank was too thin.

Current depth: 83 items per section. Production wants several hundred.

## Review before acceptance

1. **Correctness.** Solve it independently. Verify every distractor is wrong.
2. **Single answer.** Confirm no second option is defensible.
3. **Classification.** Confirm the domain and skill are right.
4. **Bias and sensitivity.** Review for content that advantages or distresses
   any group. This requires a reviewer who is not the author.
5. **Explanation quality.** Would a student who got it wrong now understand
   why?
6. **Timing.** Is `targetSeconds` realistic for a well-prepared student?

Items carry `provenance` recording the author, the review status, and the date
added, so every item in the bank is traceable.
