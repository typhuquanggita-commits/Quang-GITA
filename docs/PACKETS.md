# Topic packets

## Why seven sheets

A learner working a topic properly needs more than a lesson and a pile of
questions. Each sheet does a job the others cannot, and the two that look
optional are the two that decide whether the practice lands.

| # | Sheet | What it is for |
| --- | --- | --- |
| 1 | Phiếu lý thuyết — theory | The one thing that has to be understood before any question in the topic makes sense |
| 2 | Phiếu dạng bài + đọc vị — recognition | The forms the questions take, and the signal that identifies each |
| 3 | Phiếu kỹ năng, phương pháp — method | The steps in order, one example solved by those steps, and the traps |
| 4 | Phiếu luyện nâng cao — advanced | Hard items first: this sheet finds the edge, it does not reassure |
| 5 | Phiếu ôn thi — revision | Mixed difficulty, untimed, because revision is retrieval and a clock suppresses it |
| 6 | Phiếu thi — exam | Test conditions: the same mix and the same pace as the real thing |
| 7 | Phiếu hướng dẫn ôn chắc — consolidation | What has to be true before the topic is finished |

**Sheet 2 is the one most preparation skips.** A student who knows every method
and cannot tell which question is in front of them will pick the wrong method
quickly and confidently, which is worse than picking slowly. In Reading and
Writing the type is usually announced by the stem; in Math it is disguised — a
linear-systems question arrives as a story about tickets — so the Math cues in
`src/data/topics-math.ts` are structural rather than verbal.

**Sheet 7 states criteria, not feelings.** "I understand transitions" is not a
claim anyone can check, including the person making it. Each criterion is
something a learner can verify about themselves today: *you state the
relationship in your own words before reading any option*. Each topic also
names how it decays, so a revisit checks one thing rather than re-reading
everything.

## Assembled, not authored twice

Everything is built from assets that already exist and are already tested: the
lesson (idea, method, worked example, traps), the topic data (question types
with cues, consolidation criteria, the regression note), and the item bank.
A packet that duplicated its lesson would drift from it within a month.

Thirty topics, one per blueprint skill, with 83 question types between them.
`npm run check:bank` fails if a skill has no topic data or topic data names a
skill the blueprint does not have.

## Two honesty properties

**No item appears twice in one packet.** A learner who meets the same question
on the advanced sheet and again on the exam sheet has been given a memory test,
and their score on the second sitting means nothing.

**Every practice sheet reports how it was filled.** The bank holds between one
and thirteen items per skill. On-skill items are used first and exhausted
before the domain is opened; then the sheet says exactly how many were on
topic, how many were borrowed from the same domain, and how many it asked for
and could not get. A sheet that cannot be filled at all is left empty rather
than padded — practising the wrong topic while believing otherwise is worse
than not practising.

The topic list flags a packet as *thin on-topic supply* before it is opened.

## The solution sheet

Behind a toggle, never beside the questions: a solution visible while the
question is being attempted is not a solution, it is the answer.

Two parts, deliberately separate. The key and worked explanation answer *what
was the answer*. The deep-analysis table answers *what was this question for* —
the skill, the band, the difficulty and discrimination parameters, and the time
it was written to take. A learner who reads only the first part learns ten
answers; one who reads the second learns the topic. The table states that the
IRT parameters are author estimates rather than calibrations.

## Working a packet

The sheets are a sequence, not a menu. A packet always points at the first
*unfinished* sheet rather than the one after the last one finished, so a
learner who skipped recognition is sent back to it.

Every practice sheet can be worked online — it queues its exact items into the
practice surface — or printed. Both, because a learner revising away from a
screen is still revising.

Completion is recorded per sheet in `state.packets`, held as a set so finishing
the same sheet twice is a revisit rather than a second completion.

## Into the route

The dossier reads packet progress, and it changes what the route recommends.
A skill that is still weak *after its whole packet has been worked* is neither
a teaching gap nor a practice gap: it is escalated to a person, because sending
the learner back through the same seven sheets would repeat what has already
failed. Held by *a skill still weak after the whole packet is escalated, not
repeated* in `tests/dossier.test.ts`.

Engine in `src/engine/packets.ts`, tested in `tests/packets.test.ts`.
