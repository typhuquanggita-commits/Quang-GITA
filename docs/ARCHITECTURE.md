# Architecture

## Shape

A single-page React application with no backend. Everything — the item bank,
the scoring engine, the learner's history — lives in the browser.

```
src/
  types.ts            Domain model; the vocabulary every other module speaks
  lib/                Dependency-free helpers: dates, RNG, expression parser
  data/               Blueprint, item bank, generators, vocabulary
  engine/             IRT, scoring, adaptive delivery, SRS, analytics, planning
  auth/               Roles, permissions, classes, audit
  gita/               The GITA training model
  state/              One reducer, one context, versioned persistence
  i18n/               Vietnamese and English, key-for-key
  components/         UI primitives, charts, question rendering
  features/           One directory per surface
tests/                Engine unit tests
docs/                 This documentation
```

## Decisions worth defending

**No backend.** A learner's response history is the most sensitive thing the
platform holds, and the simplest way to protect it is not to collect it. The
cost is real and stated in [SECURITY.md](SECURITY.md): authorisation cannot be
enforced against the owner of the device.

**No runtime dependencies beyond React.** No chart library, no date library,
no expression evaluator, no state manager. Each was considered and rejected in
favour of a small amount of code that does exactly what is needed:

- Charts are hand-drawn SVG, so every mark inherits the theme's CSS custom
  properties and is correct in light, dark, and high-contrast without a second
  palette.
- The calculator's expression evaluator is a hand-written recursive-descent
  parser. It evaluates strings the learner types, and a parser that only knows
  numbers and a fixed function table cannot be turned into a code-execution
  sink the way `eval` or `new Function` can.
- Date arithmetic uses local calendar dates throughout. `toISOString` is
  avoided in date maths because it shifts the day boundary for every user east
  of Greenwich.

**One reducer for all state.** An exported backup is therefore the complete
record, and importing one restores the whole application. Split stores would
make that guarantee impossible to hold.

**Hash routing.** The application must run from a static host or straight off
the filesystem. History-API routing needs a server that rewrites unknown paths.

## State and persistence

`src/state/store.tsx` holds one `AppState` behind a `useReducer`. Writes go to
`localStorage` behind a 500 ms debounce, so a running exam clock does not
thrash storage.

Persistence is versioned. `src/lib/storage.ts` carries a migration chain, and
a payload it cannot bring forward degrades to a clean default rather than
crashing or producing corrupt state. Reads and writes are wrapped, because
storage can be unavailable entirely — a private window, blocked site data, an
exhausted quota.

## Component structure

One rule matters more than the rest, and it was learned the hard way during
development: **a component is never defined inside another component's body.**

A nested function component gets a new identity on every parent render, so
React unmounts and remounts the entire subtree whenever the parent re-renders.
With a store-wide reducer, that meant every dispatch destroyed the local state
of whatever was on screen — a practice session in progress, a half-typed form,
a position in a review queue. The bug is silent: nothing errors, state simply
vanishes.

Every panel in this codebase is therefore declared at module scope and takes
what it needs as props or reads it from a hook.

## Rendering the exam

`ExamPlayer` owns the viewport when active. Three details are worth noting:

- **The clock is an absolute timestamp**, not a countdown in memory. Closing
  the tab and returning does not hand the student extra time.
- **Highlights are stored as character offsets** into the passage text, not as
  DOM ranges, so they survive a re-render and a reload.
- **Ability is not updated during delivery.** Responses are scored at
  submission. Updating the running estimate mid-test would let information
  about performance leak back into a live test.

## Build

Vite, with three chunks:

- `vendor` — React and React DOM, so a bank update does not invalidate it
- `bank` — the item bank, so the first paint does not wait on it
- per-route chunks — every surface below the dashboard loads on demand

The exam player alone pulls in the graphing calculator and the reference
sheet, which a learner opening the dashboard has no use for yet.

## Testing

- `tests/engine.test.ts` — 79 tests over IRT, scoring, adaptive assembly, the
  scheduler, analytics, planning, the parser, and authorisation
- `tests/gita.test.ts` — 30 tests over the GITA framework, habits, arenas, and
  profile scoring

Run with `npm test`. Both suites use `node --test` with native TypeScript
stripping; there is no test framework dependency.

UI behaviour is verified by a Playwright smoke test that drives the real built
application: onboarding, every route, role switching, a practice session, the
exam player with its navigator and calculator, theme and locale switching, and
persistence across a reload.
