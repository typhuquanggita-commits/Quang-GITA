# What the exam does not give you

## The asymmetry

The Digital SAT hands every candidate a reference sheet with **six geometry
formulas and three facts** on it. Everything else must already be in the
candidate's head.

That asymmetry is the whole point of `src/data/mustKnow.ts`, because the
difference between a learner at 1400 and one at 1550 is very rarely that the
second knows more mathematics. It is that the second does not spend twenty
seconds reconstructing the slope formula, and so has those twenty seconds for
the item they actually find hard.

**46 facts. 2 are on the sheet. 44 the candidate carries.**

That is also the honest answer to a question Vietnamese learners ask
constantly — *how much must I memorise for the SAT* — and it is far less than
most resources imply, because most answer it with a list of every formula in
secondary mathematics.

## Automatic, not derivable

Every entry is something that must be **recalled** rather than worked out, and
the distinction is not about difficulty.

The sum of the roots of a quadratic is easy to derive. But
derivable-in-forty-seconds is the same as not known when a module gives
seventy seconds an item. So each fact carries `cost` — the seconds lost by
deriving instead of recalling — and **that number, not the difficulty, is what
earns it a place**.

`check:bank` rejects a fact costing under 5 seconds (no reason to memorise it)
or over 60 (that is a lesson, not a fact).

The computed figure: **165 seconds lost per module** by deriving instead of
recalling, counting only what recurs in *every* module. Nearly three minutes,
in a section that gives about seventy seconds an item.

## Ordered by payback, not by topic

The default view sorts by `cost × frequency`. Studying from the top is the
fastest available conversion of memorisation into seconds, and seconds are what
the last two hundred points are made of. A test asserts the ordering is
monotonic and drops nothing.

The by-area view exists for a learner working a specific weakness; it is not
the default, because topic order is how a textbook is arranged and payback
order is how a candidate should study.

## The `given` flag, and why it is pinned

Two entries are on the official sheet and are included anyway: reaching for it
costs ten seconds and a lost place, and a candidate who looks a formula up has
already lost more than the formula is worth.

Getting this flag wrong in the other direction is the serious failure — a
learner walks into the hall expecting a formula that never arrives. So:

- `check:bank` fails if more than 9 entries claim to be on the sheet
- a test additionally requires every `given` entry to be geometry or
  trigonometry, because that is all the sheet carries
- a test requires `mustCarry > given × 4`, so the asymmetry the document exists
  to show cannot quietly disappear

## The drill

Every fact carries a prompt and an answer. **A fact a learner has read is not a
fact a learner has**; the only evidence is recall with the page turned away.

Nothing is recorded. A score here would tempt a learner to optimise it rather
than be honest with themselves, and this is the one place in the platform where
that trade is clearly the wrong way round.

## Coverage

| Area | Facts |
| --- | --- |
| Algebra | 11 |
| Geometry | 7 |
| Data and statistics | 7 |
| Functions | 6 |
| Grammar | 6 |
| Punctuation | 5 |
| Trigonometry | 4 |

Reading and Writing is represented deliberately. Comma rules, the four jobs a
comma has, semicolon and colon conditions, subject–verb agreement across an
interrupting phrase, and the five transition families are as much
must-be-automatic as the quadratic formula — and a learner who reasons them out
mid-module is losing the same seconds. A test requires at least eight R&W
entries so the section cannot be quietly dropped in favour of the one with
formulas.

## The recall check

Each fact names the skills whose items call on it — `invokedBy`, authored by
hand and not inferred, because the platform uses it to say something to a
learner and a derived mapping would be a guess wearing the clothes of evidence.

`src/engine/recall.ts` turns that mapping into the panel that follows a test.
The rule it works under is worth stating on its own line:

> It reports what the items you missed **needed**. It never reports what you
> do not know.

Nothing in a response record separates a learner who could not recall
`sin²θ + cos²θ = 1` from one who recalled it instantly and misread the diagram.
Software that claims the first has invented evidence, and a learner drilled on
a fact they already hold learns to distrust everything else on the screen. So
the panel asks, and the learner's own answer to the drill is the only thing
that reaches the review schedule.

### What counts as evidence

Only a wrong or omitted item, and not all of those:

| Signal | Treatment |
| --- | --- |
| Careless error | Excluded. `classifyError` has already judged that the learner holds this material and slipped. |
| Field-test item | Excluded. Unscored, so it is not evidence about the learner. |
| Wrong **and** slow | Raises the skill's facts on its own. Deriving instead of recalling costs seconds — that is the premise of this file — so a miss that also ran long is the shape the cost model predicts. |
| Any other miss | Must happen twice in the same skill. One miss is noise. |

No qualifying evidence produces no candidates: not a short list, not a default
set of "commonly missed" facts. A clean section is reported as a clean section.

### Ranking

By payback — `cost` × the misses that raised the fact, in seconds a sitting
would give back. That ranks a cheap fact met constantly above an expensive one
met once, because the learner is choosing what to spend an evening on and
seconds recovered is the honest unit for that choice.

### The schedule

A fact enters spaced repetition under its own `mk:` namespace, alongside `q:`
for questions and `v:` for vocabulary, and only when the learner has sat its
drill. Three outcomes, not five: *could not recall it* (grade 1), *recalled but
had to think* (grade 3), *instant* (grade 5). The middle of a five-point scale
invites "sort of", which schedules nothing useful and feels like progress.
Recalled-but-slow deliberately grades below a clean hit — not automatic is the
thing being fixed.

The deck lives on the Review centre's **Must-know recall** tab, and on a fresh
profile it is empty and says why. `tests/recall.test.ts` holds all of this.

## Known limits

- `cost` is an editorial estimate of derivation time, not a measurement. It is
  a defensible ranking and not a stopwatch.
- `invokedBy` says an item of this skill *may* call on this fact, not that a
  particular item did. Item-level tagging would sharpen the panel considerably
  and is the obvious next step.
- The recall check reads one attempt at a time. Facts raised repeatedly across
  several sittings are not yet accumulated into a standing list.
