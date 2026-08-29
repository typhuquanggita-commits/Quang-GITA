# The guardian's report

## Why this document is dangerous to write

For a tutoring centre this is the sheet that justifies the fee to the person
paying it, which is exactly why it is the easiest document in the business to
write dishonestly. The temptation is uniform and it does not feel like lying:
report a number that went up, attribute it to the teaching, and leave out
everything the platform cannot see.

The cost arrives later. A family told "+20 points" in March, who then sees no
gain on the real test in June, has been misled by this document — and no amount
of good teaching afterwards repairs that. So the rules below are chosen to make
this report *less* flattering than it could be, on purpose.

## The three rules, and what each costs

### A score change is reported only when it exceeds measurement error

Two sittings differing by twenty points, on a test whose standard error is
thirty, have not established improvement. They have established that the test
has a standard error.

So the report has three states, not two:

| Verdict | Meaning |
| --- | --- |
| `up` / `down` | the change is larger than the combined error of both sittings |
| `within-error` | the change exists and is not yet distinguishable from noise |
| `insufficient` | fewer than two full sittings — one score is a position, not a direction |

The combined error is the **root of the sum of squares**, not the sum. Two
independent errors do not simply add, and using the sum would hide real gains
as readily as the sum-free version would invent fake ones.
`tests/parent-report.test.ts` pins both directions: a 20-point move against
±30 each is refused, and a 50-point move against the same errors is reported.

This costs the good months. A report that would have said "+20" now says the
change is not yet distinguishable from error. That is the point.

### Nothing unmeasured is scored as anything

A skill practised three times is not weak and not strong. It appears under
**too early to say**, and the report states explicitly that it is not being
counted as weak — the platform does not know either way.

This is the same rule that governs the GITA pillar scores, and it exists for
the same reason: a brand-new learner once scored 42 on Talent from no data at
all.

### Advice comes from a signal or it does not come

There is no fallback paragraph. Where the month is unremarkable, section 4 is
empty and says why it is empty. A page of generic encouragement is the fastest
way to teach a family to stop reading these.

The suggestions that do fire are derived from a specific signal — an uneven
distribution of study days, a careless-error majority, a run of blanks — and
each is phrased as something a guardian can do *without knowing any SAT
content*. "Ask them to explain one wrong answer to you" works whether or not
you can read the question. "Review the transitions chapter" does not.

One case was caught by its own test rather than by review. With no activity at
all, the report originally said "the longest gap this month was 30 days" —
technically true, and it reads as a complaint about discipline when what
actually happened is that nobody opened the platform. It might be a lost
password rather than a lost month. That case is now reported as its own fact.

## Where it is generated, and why there

On the **learner's own device**, from the learner's own state.

This is not an architectural accident. There is no server: response-level data
lives in the learner's browser and reaches no other device. A teacher's console
builds from what a teacher can actually see, which is far less. So the learner
produces this sheet and hands it over, the way a school report card has always
worked. Printing it writes a `report.exported` entry to the audit log, because
printing is the moment the learner's figures leave their own device.

## What is on the page

1. **The score, and what it means** — first on record, most recent with its
   error band, days to the test, and the verdict line stating plainly whether
   the change has cleared the error.
2. **How steady the work has been** — active days, total time, longest run,
   longest gap, with a note that total time and steadiness are different
   things and that steadiness is the one a household can protect.
3. **Which skills moved** — improved, worked-on-and-not-moving, and too early
   to say.
4. **What the household can do** — derived, or empty and saying so.
5. **What this report cannot tell you** — never empty.

Every string is bilingual, and a test asserts that no note can exist in only
one language. The page prints through `DocumentFrame`, so a sheet that leaves
the house carries its own masthead, subject, date, reference, and limits line
on every page.

## Known limits

- The reporting window is a fixed 30, 60, or 90 days. There is no way to
  report on a term boundary or on the period since a particular sitting.
- Movement is measured on accuracy within the window, not on ability. A
  learner who moved to harder items and held accuracy has genuinely improved,
  and this report will show them flat.
- Nothing here is tied to the coach's decisions. A guardian cannot see from
  this sheet what the platform prescribed and whether it was followed, and
  that connection is the obvious next thing to build.
- There is no guardian *role*. The report is the learner's to share; nobody
  logs in as a parent, and no permission models one.
