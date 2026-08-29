# Published papers, tactics, and the document identity

## Published papers

The platform could always assemble a full-length form on demand. What it could
not do was hand someone a **paper** — a fixed set of items, the same for every
candidate, that can be printed, sat away from a screen, marked by a person, and
referred to afterwards by name.

### Why a paper is linear and the on-screen test is not

An adaptive delivery routes each candidate to a second module chosen from their
own first-module performance. That measures better, and it makes the test
unprintable: there is no single second module to print, and no single
raw-score conversion, because raw score means different things on the two
pathways.

So a published paper is **linear** — two modules a section at the routing
target, identical for everyone. It measures slightly less precisely, and in
exchange it is a sheet of paper.

This distinction produced a real bug, caught by a test before the papers
shipped. `assembleForm` builds *both* stage-2 pathways, since the delivery
picks one at run time. Printing that gives the candidate every module including
both pathways — and an item appearing in both is asked twice of the same
person. `assembleLinearForm` exists for exactly this reason, and *a paper never
repeats an item within itself* holds the line.

### Fixed by seed, not by list

A paper is defined by a seed. Assembly is deterministic, so the same seed is
the same paper on every device and every build — which is what "published" has
to mean — while an enumerated list of two hundred item ids would rot the first
time an item was revised.

### Four documents, never handed out together

| Document | Goes to |
| --- | --- |
| Question paper | The candidate |
| Solutions | Released after papers are collected |
| Mark scheme | The invigilator |
| Specification | Whoever is choosing which paper to set |

Printing all four as one document defeats all four, which is why they are
separate tabs and why the page says so before anything else.

## The mark scheme

`docs/PSYCHOMETRICS.md` opens by rejecting raw-score conversion, and that
rejection stands — under adaptive delivery a single table across both pathways
reports a number that does not mean what it appears to mean.

On a linear paper the objection does not apply: one item set, one relationship
between raw score and ability. So a scheme is derived, not borrowed, by
inverting that paper's own test characteristic curve:

```
E[raw | θ] = Σ P(correct | θ, item)
```

The curve is monotonic, so it inverts by bisection. For each attainable raw
score the scheme finds the θ at which that score is expected and applies the
same scale transform the engine uses — so the printed table and the on-screen
report agree by construction rather than by coincidence. *A scheme agrees with
the engine's own scale transform* holds that.

**A scheme belongs to one paper and to no other.** It is computed from that
paper's items and stamped with its identifier.

Two limits are printed on the scheme itself:

- **The extremes are bounds, not points.** A perfect raw score is consistent
  with any ability above where the curve flattens. Those rows read `800+`
  rather than `800`, because reporting them as points claims precision the
  measurement does not have.
- **The parameters are author estimates.** A conversion is only as good as the
  item parameters under it.

## Kho bí kíp — the tactics treasury

The layer above lessons and packets: the moves that transfer, which a strong
test taker reaches for without being told which skill they are in.

Every entry carries four things, and the fourth is what makes it a tactic
rather than a slogan:

| Field | Why |
| --- | --- |
| `trigger` | What on the page tells you to reach for it. A move with no trigger cannot be found under time pressure. |
| `move` | The steps, short enough to hold in working memory. |
| `demo` | One worked instance, so the move is shown rather than asserted. |
| `costs` | When it is slower than the direct route, or wrong outright. |

`check:bank` refuses a tactic whose `costs` field is thin. Most "SAT tips"
lists give the move and stop, and that is the reason they do not work: a move
without its failure case is a move a learner will apply where it costs them.

Fourteen tactics across five families — reframe, work from the options, make it
concrete, guard against an error, manage the clock. The three that pay best on
a topic also appear on that topic's method sheet, because a treasury a learner
has to remember to visit is a treasury they visit once.

## The document identity

Built from the GITA mark. See `src/brand/` and the identity page at `#/brand`,
which renders the actual components with the actual tokens — a design system
that lives only in a document drifts from the code within a release or two,
because the document has no way of being wrong.

**The rule that governs the palette:** brand colours are for marks and rules,
never for running text. The mark's lighter blue is 3.0:1 against white and its
red is 4.3:1 — fine for a shape, not for a word. Deepened variants exist for
the cases where a brand colour must carry text, and the identity page
recomputes every ratio on render.

**The four elements of the mark are paired with the four pillars**, so a
document carrying a pillar colour says which part of the model it serves before
a word is read.

**Every printable document says four things without being asked:** what it is,
who it is about, when it was made, and what it may be relied on for. The limits
line is required rather than optional — a frame that lets a document omit its
own limits is a frame that will be used to omit them, and a number arriving on
headed paper acquires an authority it has not earned.
