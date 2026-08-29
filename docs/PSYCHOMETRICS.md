# How a score is produced

## The short version

A response vector goes in; an ability estimate on the theta scale comes out;
a linear transform puts that on the reported 200–800 scale. No raw-score
lookup table is involved at any point, and that is the single most important
design decision in the platform.

## Why not raw score

Under adaptive delivery, raw score is not comparable across test takers. A
student routed to the upper module faces harder items, so twenty correct there
means something different from twenty correct on the lower module. Any system
that reports a raw-score-derived scale under adaptive delivery is reporting a
number that does not mean what it appears to mean.

## The model

Two-parameter logistic (2PL):

```
P(correct | θ) = 1 / (1 + exp(−D · a · (θ − b)))      D = 1.702
```

`a` is discrimination, `b` is difficulty on the theta scale. `D = 1.702` puts
the logistic metric on the normal-ogive scale, the convention used in
published SAT technical documentation.

Implemented in `src/engine/irt.ts`.

## Ability estimation: EAP, not MLE

Ability is estimated by expected a posteriori estimation over a standard
normal prior, evaluated on a fixed 161-point quadrature grid across
θ ∈ [−4, 4].

Maximum likelihood was rejected for a specific reason: it diverges to ±∞ for
perfect and zero response patterns. Both occur constantly in short practice
sets, so an MLE-based platform must special-case them, and every such
special case is a place where a score becomes arbitrary. EAP is finite
everywhere by construction and yields a posterior standard deviation that is
an honest standard error rather than a fabricated one.

The tests hold this property directly: *ability estimate stays finite for a
perfect and a zero score* in `tests/engine.test.ts`.

Numerical care taken:

- Log-likelihoods are computed in log space and the maximum is subtracted
  before exponentiating, so the posterior does not underflow.
- Probabilities are clamped to `[1e-9, 1 − 1e-9]` inside the log likelihood.
  At extreme abilities a probability saturates to exactly 1.0 in float64; the
  clamp prevents a single item from producing `−Infinity`.

## The reporting scale

```
scaled = round_to_10( clamp( 500 + 100 · θ, 200, ceiling ) )
```

Anchors: θ = 0 → 500, θ = +3 → 800, θ = −3 → 200.

`ceiling` is 800 on the upper pathway and 620 on the lower. The lower-pathway
cap models the operational property that the easier second module cannot
demonstrate top-band proficiency.

Standard error is reported in scale points as `100 · SE(θ)`, capped at 0.6 on
the theta metric so a very short delivery cannot advertise a misleadingly wide
band as if it were meaningful.

## Reliability

`marginalReliability` reports the IRT analogue of Cronbach's alpha:

```
reliability = 1 − mean(SE²) / population variance
```

Reported so the reliability of a delivered form is visible rather than assumed.

## Domain and skill mastery

Mastery is not percent-correct. It is the modelled probability of answering a
medium item (`a = 1.0`, `b = 0.0`) correctly, given the ability estimated from
that skill's responses alone. Answering easy items correctly therefore does
not read as mastery, which percent-correct would allow.

## Calibration

**The parameters shipped in this repository are provisional values assigned by
the item author from the difficulty band. They are not calibrated.** They are
adequate for demonstrating and testing the delivery and scoring machinery.
They are not adequate for reporting a score anyone should act on.

The machinery that replaces them ships with the platform, in
`src/engine/calibration.ts`. What is missing is response data, not code.

### The estimator

Marginal maximum likelihood via the EM algorithm.

Joint maximum likelihood — estimating an ability for every examinee and then
treating those estimates as known — was rejected for a specific reason: its
item parameter estimates are *inconsistent*, meaning they do not converge on
the truth as the sample grows. That is precisely the wrong property for a bank
intended to be reused across cohorts. MMLE integrates ability out over the
population distribution instead.

- **E step.** For each examinee, form the posterior over a quadrature grid
  given the current item parameters, and accumulate expected administrations
  and expected correct responses at each node. Computed in log space with the
  maximum subtracted, so a long response vector cannot underflow.
- **M step.** Fit each item to its expected counts by Newton–Raphson on the
  2PL likelihood, with step-halving. The halving matters: the 2PL surface is
  not globally concave in the discrimination parameter, and a full Newton step
  from a poor start can land somewhere worse. Halving until the likelihood
  improves keeps each M step monotone, which is what makes the outer EM loop
  converge at all.
- **Bounds.** Discrimination and difficulty are bounded, so an item everyone
  answers correctly cannot drag difficulty toward negative infinity.

Verified by parameter recovery: `tests/calibration.test.ts` simulates
responses from known parameters and requires the estimator to return them,
including on a sparse matrix where each examinee sees only 40% of the bank —
the realistic case when items are calibrated through pretest slots.

### Fit statistics

Infit and outfit mean squares, computed against the **leave-one-out posterior
predictive** probability of a correct response.

Both corrections were necessary, and the first was found by a failing test.
Evaluating fit at a point estimate of ability that the item itself helped
produce biases the statistic downward — on simulated data that fitted the
model perfectly, outfit came back around 0.65 rather than 1.0, which would
have caused good items to be rejected as over-fitting. Subtracting the item's
own contribution from the posterior removes that bias.

The second correction is subtler: integrating a standardised residual node by
node divides by a vanishing variance at nodes far from the truth, which
inflated outfit to as much as 3.7. The fix is to form the marginal posterior
predictive probability first and standardise once against its own variance.
With both corrections, mean squares centre on 1.00 for items generated from
the model, as theory requires.

### Acceptance screen

Stated as data in `ACCEPTANCE`, so a programme can change it as policy rather
than as a code change:

| Criterion | Threshold |
| --- | --- |
| Discrimination | 0.5 – 3.0 |
| Difficulty | −3 – +3 |
| Point-biserial | ≥ 0.15 |
| Infit and outfit | 0.7 – 1.4 |
| Sample | ≥ 200 |

Point-biserial is computed against the **rest** of the test rather than the
whole, so an item is not credited for correlating with itself.

### Differential item functioning

Mantel–Haenszel, with examinees matched on their score across the other items.
The matching is the whole point: an item is not unfair because one group
scores lower overall, only because equally able members of two groups answer
it differently.

Reported on the ETS delta scale with the conventional A/B/C classification.

**A known limitation, stated because a screen whose weaknesses are undocumented
gets over-trusted:** MH over-flags when the two groups' ability distributions
are far apart, because matching on observed score cannot fully equate groups
whose true abilities differ. On simulated clean items with a 0.8 SD group
difference, several drifted into the moderate B band; none reached the C band
that triggers content review. A test holds that boundary. Where two populations
genuinely differ this much, treat B findings as inconclusive and rely on C.

### Linking

Mean–sigma linking from anchor items. Without it, a bank update silently
shifts every reported score — the failure is invisible precisely because both
sets of numbers look reasonable on their own.

`applyLinking` transforms difficulty with the ability metric and discrimination
inversely to it, because compressing the ability scale must steepen the item to
leave the logit unchanged.

### The procedure

A defensible bank requires:

1. **Field testing.** Administer each candidate item as an unscored pretest
   item inside operational deliveries. The platform already places these:
   two per module, spread through the module rather than clustered at the end.
2. **Sample size.** At least 300 responses per item for stable 2PL estimation;
   500 or more if the sample is heterogeneous.
3. **Estimation.** Marginal maximum likelihood via the EM algorithm, or a
   Bayesian equivalent. Estimate `a` and `b` jointly across the bank, not item
   by item.
4. **Fit review.** Discard items with poor fit statistics. In practice this
   means `a < 0.5` (the item barely discriminates), point-biserial below 0.15,
   or a residual pattern showing the model does not describe the item.
5. **Differential item functioning.** Screen every item for DIF across gender,
   language background, and any other group the programme serves. An item that
   functions differently for equally able groups is a fairness defect, not a
   statistical curiosity.
6. **Linking.** Place all parameters on a common scale via anchor items so
   scores are comparable across bank versions. Without this, a bank update
   silently shifts every reported score.
7. **Periodic re-calibration.** Item parameters drift as the population and
   the curriculum change. Re-estimate on a schedule, not on suspicion.

Steps 3 through 6 are implemented. Steps 1, 2, and 7 are operational: they
require administering the bank and running the pipeline on a schedule.

Until all seven are complete, any score this platform reports should be
described to users as an estimate from an uncalibrated bank. The interface
already says so on the Settings page.

## Percentiles

`percentileForTotal` interpolates between published anchor points from the SAT
nationally representative sample. It is a lookup for context, not a computed
statistic, and it is only reported when both sections were delivered.

## Benchmarks

College-readiness benchmarks are the published cut scores: 480 for Reading and
Writing, 530 for Math. They are reported per section, never as a single
pass/fail on the total.
