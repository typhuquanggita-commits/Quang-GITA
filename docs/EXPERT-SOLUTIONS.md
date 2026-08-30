# Expert solutions

## Why the lesson library was not enough

The lesson library gives one worked example per skill, at the band where the
method is clearest. Thirty examples, averaging 3.4 steps.

That is the right shape for learning a method and the wrong shape for the last
two hundred points, because at the top **the method is already known** and what
separates candidates is the decision the method does not make for them.

31 expert walkthroughs now cover all 30 measurable skills, 30 of them at the
hard band.

## The four fields, and what each is for

### The read

What an expert notices **before looking at the options**.

Most published solutions begin after this step, which is exactly the step a
learner cannot reconstruct: they see a confident first move and no account of
why *that* move and not another.

> "Three sentences: a standard practice, a finding that cuts against it, and a
> claim about what the practice actually measures. The last sentence is doing
> the arguing, and in an argument paragraph the main idea is the claim, not the
> evidence for it."

### Reasoning, not operations

Every step says what to do **and why that**. A step whose justification is
"because that is the method" has not been explained; it has been asserted, and
`check:bank` rejects one shorter than 40 characters.

### The wrong turn

**The field this library exists for**, and the one almost no published solution
contains.

The plausible path an able student takes, stated sympathetically, followed far
enough to show exactly where it breaks. A learner shown only the right path
learns a route; a learner shown the attractive wrong path and its failure
learns to recognise the fork — and on hard items **the fork is the item**.

> *C is factually impeccable. The glass did introduce a systematic error, it
> was from one supplier, and the dating is right… It breaks because "nothing
> wrong with it" is not the test. C is the old reading with the cause
> corrected. Checking options for truth rather than for role is the single most
> expensive habit at this band.*

A test rejects any wrong turn that reaches for "careless", "rushed", "silly
mistake", "bất cẩn" or "cẩu thả". **"They were careless" explains nothing and
teaches nothing.** If a solution reaches for it, the analysis has not been done.

### Transfer

What generalises. Without it, thirty-one solutions are thirty-one facts.

> "When options use 'necessary' and 'sufficient', the passage will contain a
> one-directional exception somewhere and it will not be in the sentence that
> states the pattern. Find it before choosing."

## Timing is part of the solution

Every walkthrough states the seconds an expert takes — mean 68. **A correct
solution that takes three minutes is a wrong answer somewhere else on the
paper**, and a test fails the library if the mean exceeds 90 seconds, because a
library that models an unholdable pace is teaching the wrong thing.

## What the Maths half adds

The wrong turn in Maths is usually **not an arithmetic slip**. It is a correct
procedure applied to a question that did not ask for it:

- solving for `x` when the question wanted `6x + 5`
- reading `r² = 36` off the completed square when the question wanted `r`
- taking the reciprocal of −3/4 and forgetting that "perpendicular" is *two*
  operations
- answering `cos(A)` because the question contains "cos" and "A", when it asked
  for `cos(90° − A)`

Each is a candidate who did every line correctly and still lost the item. The
distractors are built from intermediate values in the correct working, which is
why they are chosen — they are real numbers from the real solution, not random
wrong answers.

## The reveal

The answer sits behind a button. A solution read with the answer already
visible is read backwards, and the reasoning stops being reasoning and becomes
justification. The browser suite checks both states.

## Invariants

`check:bank` and `tests/solutions.test.ts` hold, independently:

- every measurable skill has a solution — a skill without one is a skill where
  the platform can say what to do and not how an expert decides
- the read is over 80 characters, bilingual
- every step is justified, both languages
- the wrong turn is over 80 characters and its break over 100, both languages
- no wrong turn is dismissed as carelessness
- the key is among the options; ids are unique
- the skill lookup is prototype-safe, because the key arrives from a hash route
- at least 80% of solutions are at the hard band
- both sections have at least ten

## Known limits

- One solution per skill for most skills. Two or three would let a learner see
  the same decision in different clothing, which is what makes a pattern
  visible.
- The items are authored for the walkthrough rather than drawn from the bank,
  so a learner cannot go from a question they got wrong to the expert solution
  for *that exact item*. They can now go to the solutions for that item's
  skill: every wrong row in `#/solutions/<attempt>` links to
  `#/expert-solutions/<skill>`, which opens the library narrowed to that skill
  and says why it is narrowed. Item-level solutions remain the better answer.
- No solution shows an expert getting it wrong and recovering, which is what
  actually happens under time pressure and would be worth one entry per skill.
