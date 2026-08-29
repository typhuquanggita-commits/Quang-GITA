# Vocabulary

## What the section actually asks

The Digital SAT retired the sentence-completion item that made older SAT
vocabulary lists what they were: long, rare, and learnable by rote. What
replaced it is harder. Words-in-Context items take a word the learner already
knows and use it in its academic sense — `qualify` meaning to limit rather
than to be eligible, `sound` meaning valid rather than audible, `arrest`
meaning to halt rather than to detain.

That produces a failure with no symptom. A learner who holds only the everyday
sense does not stop at the word, because the sentence still seems to parse.
They answer with confidence, get it wrong, and cannot afterwards say where it
went astray. A normal review does not catch it either: they *did* know the
word.

So this deck is built around that failure rather than around word frequency.

## What is in it

397 entries in six sets, composed in `src/data/vocabulary.ts`.

| Set | Entries | What it answers |
| --- | --- | --- |
| `vocabulary.ts` core | 58 | general academic vocabulary |
| `vocab-academic.ts` | 64 | the connective verbs of every passage |
| `vocab-sense.ts` | 55 | common words in their academic second meaning |
| `vocab-argument.ts` | 52 | the language the question stems are written in |
| `vocab-tone.ts` | 58 | author stance, where every option is one adjective |
| `vocab-science.ts` | 55 | the register of half the passages |
| `vocab-history.ts` | 55 | the register of the other half |

Three fields carry the weight:

**`satSense`** — 56 entries. The meaning the test uses, shown *above* the
everyday one on the card, because the everyday one is the meaning that
misleads. `sanction` and `table` are worth reading twice: both can mean their
own opposite.

**`trap`** — 99 entries, bilingual. The confusion the word reliably causes,
stated as the confusion rather than as advice. Several are specific to
Vietnamese speakers, where a dictionary gloss maps onto a Vietnamese word with
a different range: `disinterested` is not "không quan tâm", `bemused` is not
"amused", `exploit` in a science passage carries no criticism at all.

**`collocations`** — 55 entries. The company the word keeps. A learner who has
memorised "mitigate = làm giảm nhẹ" still cannot say whether one mitigates a
risk or mitigates a rise.

## Two things the deck says out loud

**Extreme tone words are rarely correct.** Published passages are edited
academic prose. Their authors are far more often *measured*, *guarded*, or
*qualified* than *contemptuous* or *effusive*. When two options both fit the
direction of the passage, the milder one usually wins — not as a trick, but
because that is how the prose is written. This is stated in the header of
`vocab-tone.ts` and shown in the deck.

**Strength words decide Command-of-Evidence items.** `suggest` and `establish`
are not the same claim; `consistent with` is not `evidence for`; `does not
prove` is not `disproves`. `vocab-argument.ts` is built around those
distinctions.

## How it is kept honest

`npm run check:bank` holds four invariants, and each exists because of a way
this kind of file rots:

- **No word appears twice** across the six sets. The deck is assembled by
  concatenation, so nothing else would catch a repeat, and the stated size
  would quietly become a lie.
- **Every entry carries its Vietnamese.** A missing gloss is invisible in an
  English-language review and makes the entry useless to the learner it is for.
- **Every example sentence uses the word it teaches.** This is the quiet one.
  It reads perfectly, it is easy to introduce when an entry is edited, and it
  teaches nothing. The check allows real inflection — including consonant
  doubling and the irregular verbs in the deck — so that a correct example is
  never rejected and an author is never pushed into writing a worse sentence
  to satisfy it.
- **A second sense is a second sense.** `tests/vocabulary.test.ts` rejects a
  `satSense` that restates the everyday gloss in other words, by measuring the
  overlap in content words. Without it an entry can look complete and teach
  nothing.

The check found seven real defects the first time it ran: three examples that
used only an inflected or negated form of their word (`calibrate` was
illustrated entirely by "uncalibrated"), two glosses too thin to help, and two
gaps in the matcher's own morphology. The matcher gaps were fixed in the
matcher; the content flaws were fixed in the content.

## Known limits

- Frequency tiers are editorial judgement, not counts from a corpus of
  released material. Tier 1 means "meets this constantly"; it is not a
  measured rank.
- The deck is not tied to the item bank. A learner practising
  Words-in-Context items is not automatically served the entries those items
  turn on, and closing that loop would make both better.
- Pronunciation is not covered at all. The test is written, so this is a
  deliberate omission rather than an oversight — but a learner who cannot say
  a word remembers it less well.
