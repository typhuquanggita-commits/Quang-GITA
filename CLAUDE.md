# SAT365

A Digital SAT preparation and assessment platform with an automated coaching
layer (GITA). React + TypeScript + Vite, no backend, no runtime dependencies
beyond React.

## Commands

```bash
npm run dev          # dev server on :3000
npm run typecheck    # tsc --noEmit
npm test             # 181 unit tests (node --test, native TS stripping)
npm run check:bank   # item bank invariants
npm run build        # typecheck then production build
npm run test:browser # 66 checks against the built app via Playwright
```

In this sandbox the browser test needs an explicit path:

```bash
CHROMIUM_PATH=/opt/pw-browsers/chromium npm run test:browser
```

## Layout

```
src/lib/          dates, RNG, expression parser — no dependencies
src/data/         blueprint, item bank, generators, vocabulary, lessons
src/engine/       IRT, scoring, adaptive delivery, SRS, analytics,
                  calibration, the automated coach and its rule catalogue
src/gita/         the training model: pillars, tiers, habits, arenas
src/auth/         roles, permissions, classes, audit
src/state/        one reducer, one context, versioned persistence
src/features/     one directory per surface
tests/            engine tests
scripts/          bank check, browser test
docs/             see docs/README.md
```

## Rules that are not negotiable

**Never define a component inside another component's body.** A nested
component gets a new identity on every parent render, so React unmounts and
remounts the whole subtree. With a store-wide reducer that means every
dispatch destroys the local state of whatever is on screen — a practice
session in progress, a half-typed form, a position in a review queue. Nothing
errors; state simply vanishes. This bug shipped once and took a while to find.

**Absence of evidence is never scored as success.** A signal the platform has
not measured arrives as `null` and its driver is dropped from the calculation.
Defaulting an unmeasured signal to a neutral value is how a brand-new learner
ended up with a Talent score of 42 from no data at all. There are tests
holding this line in `tests/gita.test.ts` and `tests/autopilot.test.ts`.

**Local calendar dates only.** Use `isoDate`, `addDays`, `daysBetween` from
`src/lib/util.ts`. `toISOString().slice(0,10)` shifts the day boundary for
every user east of Greenwich and silently drops entries.

**Every automated decision must be explainable.** A rule in
`src/engine/interventions.ts` records the evidence that triggered it and a
rationale written for a human. If you cannot state why a rule should exist, it
should not.

**State the limits in the interface, not only in the docs.** Uncalibrated
parameters, thin evidence, client-side authorisation — a user deciding whether
to rely on a number deserves to know before they act, not after.

## Conventions

- Relative imports carry an explicit `.ts`/`.tsx` extension. This is what lets
  `node --test --experimental-strip-types` run the tests with no build step.
- Bilingual throughout: Vietnamese and English, key for key in
  `src/i18n/strings.ts`. Feature-local strings are inline bilingual.
- Charts and figures are hand-drawn SVG using CSS custom properties, so they
  are correct in light, dark, and high-contrast without a second palette.
- Every chart carries `role="img"` and an `aria-label` stating its values.

## Where the important logic lives

| Question | File |
| --- | --- |
| How is a score produced? | `src/engine/scoring.ts`, `src/engine/irt.ts` |
| How is a test form assembled? | `src/engine/adaptive.ts` |
| How are item parameters estimated? | `src/engine/calibration.ts` |
| What does the coach decide today, and why? | `src/engine/interventions.ts` |
| How is that turned into a session? | `src/engine/autopilot.ts` |
| Who is allowed to do what? | `src/auth/roles.ts` |
| What is the GITA model? | `src/gita/framework.ts` |
| How is a skill taught, not just measured? | `src/data/lessons.ts`, `src/data/lessons-math.ts` |

## Known limits

Stated in `docs/SPEC.md` and `docs/SECURITY.md`, and worth repeating: IRT
parameters are author estimates rather than calibrations, the bank is small for
production exposure control, and authorisation is client-side. This is a
personal study tool, not an assessment of record.
