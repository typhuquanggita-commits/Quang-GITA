# Test integrity and access control

## What this document is for

To state exactly what SAT365 guarantees and what it does not, so nobody
deploys it believing it enforces something it cannot.

## The central limitation

**SAT365 has no backend.** Authorisation and test integrity run in the
browser, on the learner's own device, against data stored on that device.

A browser cannot enforce a rule against the person operating the browser.
Someone willing to open developer tools can change their role, edit their
score history, or clear the integrity log. This is not a defect to be patched;
it is a property of where the code runs.

That is an acceptable trade for a personal study tool, where the only person
who could cheat is the person being measured. It is **not** acceptable for
admissions, placement, certification, or any decision affecting someone other
than the learner.

## What proctoring actually observes

`src/features/exam/useProctor.ts` records only what a web page can honestly
see:

| Event | Meaning |
| --- | --- |
| `blur` / `focus` | The test window lost or regained focus |
| `fullscreen-enter` / `fullscreen-exit` | Full-screen state changed |
| `copy-blocked` / `paste-blocked` | A clipboard action was intercepted (strict mode) |
| `context-menu-blocked` | The context menu was suppressed (strict mode) |
| `resize` | The window was resized |

Each event carries a timestamp. The score report shows the counts and the
total time away.

**What it cannot see:** a second device, a person in the room, notes on the
desk, another monitor, a screen reader reading the page aloud to someone else,
or anything outside the browser tab. Nothing in this platform should be
described to a candidate as monitoring beyond the list above.

**Why the report is neutral.** The integrity panel presents counts and states
that they are an objective record, not a conclusion about conduct. A learner
who left the window because a parent walked in produces the same event as one
who left to search for an answer. Presenting the first as misconduct would be
both wrong and unfair.

## Proctoring levels

| Level | Behaviour |
| --- | --- |
| `off` | Nothing recorded |
| `monitor` | Events recorded; nothing blocked |
| `strict` | Events recorded; copy, paste, and context menu blocked |

Full screen is requested, never forced. A failed request — it needs a user
gesture and can be blocked outright — must not stop someone from taking a
test.

## Access control

The model is in `src/auth/roles.ts` and is the right model to enforce
server-side. It is documented in full in [ROLES.md](ROLES.md).

Two properties are worth naming here:

**A student level never grants authority.** Levels are earned from measured
scores and unlock study material. `permissionsFor` does not take a level as an
input at all, so a strong student cannot read a classmate's record. There is a
test that holds this: *a student level never grants authority*.

**Teaching permissions are class-scoped.** Holding `roster.view` is not enough
to see any roster — `canForClass` requires the class to be one the principal
teaches. Only an administrator is unscoped.

## Audit

Privileged actions are logged to an append-only list capped at 1000 entries:
class changes, enrolment, viewing a learner's record, rank changes, exports,
role switches. Each entry records the actor, their role at the time, the
target, and a timestamp.

Without a record, a permission policy is only a claim about the past.

## What a hosted deployment must change

1. **Move authorisation to the server.** Every permission check in
   `src/auth/roles.ts` must be re-run server-side on every request. The
   client-side check stays — it shapes the interface — but it stops being the
   enforcement point.
2. **Issue roles from the server.** Self-declared roles are fine on a personal
   install and unacceptable in an organisation. The Settings page says so.
3. **Store responses server-side during delivery.** A locally stored attempt
   can be edited before submission.
4. **Score on the server.** Client-side scoring means the client knows every
   answer key. The bank ships in the JavaScript bundle.
5. **Make the audit log append-only in a database**, not in browser storage
   the actor controls.
6. **Add authentication.** There is none. The current account is whichever one
   the device says it is.

Until then: personal study tool, not an assessment of record.

## Data handling

All learner data stays in `localStorage` on the device. Nothing is
transmitted. There is no analytics, no telemetry, and no network call at
runtime beyond loading the application itself.

Export produces a complete JSON backup. Import replaces state entirely after
running it through the same migration chain as stored state, so a backup from
an incompatible version is rejected rather than partially applied.

Erasing data clears storage and resets state in one action.

## Findings from the audit, and what was done

A full pass over the codebase in August 2026. Each finding below was reachable,
not hypothetical, and each now has a test.

### Prototype pollution through a URL parameter — fixed

`Record<string, T>` is an ordinary object, so `record['constructor']` returns
the `Object` constructor: a truthy value with none of T's fields. The lesson
and packet routes take a skill id straight from the URL hash, so
`#/lesson/constructor` handed the view the `Object` constructor as a lesson and
crashed it on `lesson.method.map`. `#/packet/toString` did the same, and the
per-skill progress records restored from storage had the same shape.

Fixed with `src/lib/record.ts`. `own()` returns a value only for an own
property and is now the only way this codebase indexes a record by a key it did
not itself produce; `bareRecord()` builds the static indexes with a null
prototype so nothing is inherited to begin with. Held by *a skill id from the
URL cannot return an inherited object* in `tests/security.test.ts`.

### A permission could vanish from the administrator's set — fixed

`ALL_PERMISSIONS` is assembled from the grant tables. A permission added to the
`Permission` union and to no table dropped out of it silently, and the
super-admin's set — which is built from it — quietly did not include it. The
failure is invisible: the feature simply never appears, for anyone, with
nothing to see in a diff. `tests/security.test.ts` now transcribes the union
independently and asserts the two agree.

### `role.assign` was equivalent to super-admin — fixed by design

Any permission to assign roles is, without a ceiling, the permission to become
anything: the first thing a holder would do is manufacture a peer. See the
escalation ceiling in [ROLES.md](ROLES.md). Demotion of a peer is refused for
the same reason as promotion — removing a check is an escalation.

### An over-grant on the teaching ladder — fixed

A head of programme held `bank.publish`, which changes the basis on which every
score in the system is computed. Moved to the product administrator.

### Aggregate reporting could identify individuals — fixed

A percentage over four students is not an aggregate; anyone who knows one
member of a four-person cohort reads the other three off a "75%". Organisation
metrics now suppress any figure resting on fewer than `DISCLOSURE_FLOOR` (5)
records, and suppression is a distinct state from absence: `Disclosed<T>` is a
tagged union, because a caller handed `null` renders a dash and a dash reads as
"no data" when the truth is "withheld to protect the people in it".

### Checked and found sound

- **No injection surface.** No `dangerouslySetInnerHTML`, no `innerHTML`, no
  `eval` of strings, no `document.write`, no `target="_blank"`. Item content is
  rendered as React text and therefore escaped. The `eval` identifiers in
  `src/lib/expr.ts` are the expression parser's own AST node method.
- **The calibration import cannot pollute `Object.prototype`.** `JSON.parse`
  creates own properties, and the parsed payload is never merged into an
  existing object. Held by a test.
- **One storage key, no secrets in it.** Learner data never leaves the device.

## What remains true, and is not fixable here

**Authorisation is client-side.** This is the honest headline. The policy in
`src/auth/roles.ts` is the right model to enforce on a server, and it is not
enforced by one. A person who owns the device owns the data on it and can edit
their own role in Settings — that control exists deliberately so one person can
walk the product from every vantage point, and it is audited, but it is not a
security boundary. In a hosted deployment role assignment must be a server-side
action requiring `role.assign`, and every check in this file must be re-run on
the server.

**Proctoring observes; it does not prevent.** The integrity log records window
blurs and fullscreen exits. It cannot stop a second device.

**The audit log lives beside the data it audits.** Anyone who can edit the
state can edit the log. Server-side, it must be append-only and held
separately.
