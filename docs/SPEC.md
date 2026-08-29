# What SAT365 replicates, and where it differs

## Scope of the claim

SAT365 delivers a test built to the published structure of the Digital SAT
Suite: the same section layout, module sizes, timing, domain weights, adaptive
routing, item formats, and reporting scale. A student who prepares here should
find the operational test structurally familiar rather than merely similar.

It is not the SAT. It is not affiliated with the College Board, it does not
deliver retired operational items, and a score it reports is an estimate from
this platform's own bank — not a College Board score. Every place that
distinction matters is stated where a user will see it, not buried here.

## Structure

| Property | Digital SAT | SAT365 |
| --- | --- | --- |
| Sections | Reading and Writing; Math | Same |
| Modules per section | 2, adaptive | Same |
| Reading and Writing | 27 items × 32 min per module | Same |
| Math | 22 items × 35 min per module | Same |
| Total items | 98 (including field-test items) | Same |
| Total time | 2 h 14 min plus a 10-minute break | Same |
| Field-test items | 2 per module, unscored | Same, spread through the module |
| Math response formats | ~75% multiple choice, ~25% grid-in | Same mix |
| Calculator | Built in, available throughout Math | Built in, available throughout Math |
| Reference sheet | Provided | Provided |
| Reporting | 200–800 per section, 400–1600 total, in tens | Same |

Implemented in `src/data/blueprint.ts`, and asserted in `tests/engine.test.ts`
under *a full-length form matches the published structure exactly*.

## Content domains

Reading and Writing:

| Domain | Weight |
| --- | --- |
| Craft and Structure | 28% |
| Information and Ideas | 26% |
| Standard English Conventions | 26% |
| Expression of Ideas | 20% |

Math:

| Domain | Weight |
| --- | --- |
| Algebra | 35% |
| Advanced Math | 35% |
| Problem-Solving and Data Analysis | 15% |
| Geometry and Trigonometry | 15% |

Skill names use the official knowledge-and-skills testing-point wording so
content authored here maps onto the operational framework without translation.

## Adaptive delivery

The first module of each section is the routing module and spans the
difficulty range. Ability is estimated from it, and the second module is drawn
from either the upper or the lower pool.

Two consequences follow, and both are modelled rather than papered over:

1. **Raw score is not comparable across pathways.** Twenty correct on the
   upper module and twenty on the lower represent different proficiencies, so
   SAT365 scores from the ability estimate, never from a raw-score table.
2. **The lower pathway caps the reportable score.** Its items cannot
   demonstrate top-band proficiency, so the section score is capped. This is a
   property of adaptive delivery, not a penalty the platform adds.

## Where SAT365 deliberately differs

**Form assembly happens at delivery time.** The operational test uses
pre-assembled, pre-equated forms. SAT365 assembles each form on the fly from
the calibrated bank under blueprint constraints. This is a real technique
(linear-on-the-fly testing) and it is the right choice for a practice platform,
where form variety matters more than exact cross-form equating.

**Every item carries its worked explanation and a per-distractor analysis.**
The operational test explains nothing, on purpose. A practice platform that
copied that would be useless.

**Scores are reported with their measurement error.** The operational test
reports a score band too; SAT365 shows it prominently rather than in a
footnote, because a practice score from a small bank deserves more visible
uncertainty, not less.

**The GITA training model sits alongside the assessment.** Nothing in the
operational test corresponds to it. See [gita/README.md](gita/README.md).

## What a production deployment still needs

Stated plainly, because a reader deciding whether to rely on this deserves to
know where the edges are:

- **A calibrated bank.** The IRT parameters shipped here are author-assigned
  provisional values, not estimates from response data. See
  [PSYCHOMETRICS.md](PSYCHOMETRICS.md) for the procedure that replaces them.
- **A larger bank.** 166 items support a full-length delivery. Operational
  practice needs several hundred per section to control exposure and to keep
  repeat testers from re-meeting items.
- **Server-side enforcement.** Authorisation and test integrity are
  client-side here. See [SECURITY.md](SECURITY.md).
- **Content review by subject specialists**, including bias and sensitivity
  review. See [CONTENT.md](CONTENT.md).
