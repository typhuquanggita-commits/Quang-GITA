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

## Calibration: what production requires

**The parameters shipped in this repository are provisional values assigned by
the item author from the difficulty band. They are not calibrated.** They are
adequate for demonstrating and testing the delivery and scoring machinery.
They are not adequate for reporting a score anyone should act on.

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

Until steps 1–7 are complete, any score this platform reports should be
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
