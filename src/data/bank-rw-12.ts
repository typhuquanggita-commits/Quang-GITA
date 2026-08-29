/**
 * Reading and Writing item bank — Transitions and Boundaries.
 *
 * The two skills a student most often believes they already have.
 *
 * Transitions are missed by readers who pick the word that sounds right in
 * the gap instead of the word that names the relation between the two
 * sentences. So every item here offers at least one transition that reads
 * smoothly and asserts the wrong relation, and the distractor notes say which
 * relation it asserts. The fix is mechanical: read the sentence before, read
 * the sentence after, name the relation in your own words, then look at the
 * options.
 *
 * Boundaries are missed in the opposite way — by ear. A comma is heard as a
 * pause, so a long sentence attracts commas wherever the reader would breathe.
 * Every item here is decided by structure, not by pause: is each side an
 * independent clause, is the modifier essential, does the subject reach its
 * verb uninterrupted. Several items place the tempting pause exactly where the
 * punctuation must not go.
 */

import type { Question } from '../types.ts';

export const RW_BANK_12: Question[] = [
  /* ============ Transitions: easy ============ */
  {
    id: 'rw_tr_101', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'easy', irt: { a: 1.0, b: -1.1 }, targetSeconds: 50,
    stimulus: { text: 'The Icelandic parliament, the Althing, first met in the year 930 and has been convened, with one nineteenth-century interruption, ever since. ______ it is often described as the oldest surviving legislature in the world.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'For this reason,' },
      { id: 'B', text: 'On the other hand,' },
      { id: 'C', text: 'For instance,' },
      { id: 'D', text: 'Beforehand,' },
    ],
    answer: 'A',
    explanation: 'The first sentence gives the length of the record; the second states the title that record earns. The second follows from the first, so the relation is result.',
    distractorNotes: {
      B: 'Asserts contrast, but nothing in the second sentence pushes against the first.',
      C: 'Asserts exemplification, but the claim about being oldest is not an instance of meeting since 930.',
      D: 'Asserts time order, and there is no earlier event to point back to.',
    },
  },
  {
    id: 'rw_tr_102', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'easy', irt: { a: 1.02, b: -1.0 }, targetSeconds: 50,
    stimulus: { text: 'Fossilised footprints are usually treated as a poor substitute for bones, since they preserve no anatomy. ______ they record something bones cannot: how the animal actually moved.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'However,' },
      { id: 'B', text: 'Therefore,' },
      { id: 'C', text: 'Similarly,' },
      { id: 'D', text: 'In summary,' },
    ],
    answer: 'A',
    explanation: 'The first sentence records the low regard footprints are held in; the second names an advantage they hold over bones. The second cuts against the first, so the relation is contrast.',
    distractorNotes: {
      B: 'Asserts result: the advantage would follow from the disregard, which is backwards.',
      C: 'Asserts likeness between the two sentences, and they point opposite ways.',
      D: 'Announces a summary, but new information is being introduced.',
    },
  },
  {
    id: 'rw_tr_103', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'easy', irt: { a: 0.98, b: -0.95 }, targetSeconds: 50,
    stimulus: { text: 'Several everyday materials behave in ways that classical physics cannot explain without quantum mechanics. ______ the colour of gold comes from a shift in its electron energy levels that only appears when relativity is included in the calculation.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'For example,' },
      { id: 'B', text: 'Nevertheless,' },
      { id: 'C', text: 'As a result,' },
      { id: 'D', text: 'Previously,' },
    ],
    answer: 'A',
    explanation: 'The first sentence makes a general claim about several materials; the second supplies one of them. A general claim followed by one case is exemplification.',
    distractorNotes: {
      B: 'Asserts contrast; the gold case supports the general claim rather than resisting it.',
      C: 'Asserts result, but gold’s colour is not caused by the general claim — it is an instance of it.',
      D: 'Asserts time order, and no timeline is in play.',
    },
  },
  {
    id: 'rw_tr_104', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'easy', irt: { a: 1.05, b: -0.85 }, targetSeconds: 50,
    stimulus: { text: 'The restored wetland now absorbs storm runoff that used to flood the road below it. ______ it has become the county’s most reliable stopover for migrating shorebirds.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'In addition,' },
      { id: 'B', text: 'Instead,' },
      { id: 'C', text: 'In other words,' },
      { id: 'D', text: 'Until then,' },
    ],
    answer: 'A',
    explanation: 'Both sentences report benefits of the restoration, and the second is a different benefit rather than a restatement of the first. Two parallel positives call for addition.',
    distractorNotes: {
      B: 'Asserts replacement, as though the bird habitat came in place of the flood control rather than alongside it.',
      C: 'Asserts restatement, but shorebird habitat is not another way of saying storm absorption.',
      D: 'Asserts time order and points back to a moment the text never fixes.',
    },
  },
  {
    id: 'rw_tr_105', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'easy', irt: { a: 1.0, b: -0.8 }, targetSeconds: 50,
    stimulus: { text: 'In a double-blind trial neither the participants nor the staff administering the treatment know who has received the active drug. ______ nobody in the room is in a position to let an expectation leak into the result.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'That is,' },
      { id: 'B', text: 'By contrast,' },
      { id: 'C', text: 'Afterward,' },
      { id: 'D', text: 'Admittedly,' },
    ],
    answer: 'A',
    explanation: 'The second sentence restates the first in terms of its purpose: not knowing who received the drug is what leaves nobody able to leak an expectation. Restatement is the relation.',
    distractorNotes: {
      B: 'Asserts contrast between two sentences that say the same thing twice.',
      C: 'Asserts sequence, but the second sentence is not a later event.',
      D: 'Asserts concession, which would require the second sentence to grant a point against the first.',
    },
  },
  {
    id: 'rw_tr_106', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'easy', irt: { a: 1.04, b: -0.75 }, targetSeconds: 50,
    stimulus: { text: 'Chemist Rosalind Franklin produced the X-ray diffraction image known as Photo 51 in May 1952 and set it aside while she worked on the A form of DNA. ______ the image was shown to James Watson without her knowledge.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'Months later,' },
      { id: 'B', text: 'Likewise,' },
      { id: 'C', text: 'Consequently,' },
      { id: 'D', text: 'To conclude,' },
    ],
    answer: 'A',
    explanation: 'The first sentence dates an event and describes an interval; the second reports what happened after that interval. The relation is sequence in time.',
    distractorNotes: {
      B: 'Asserts likeness between two events that are consecutive, not comparable.',
      C: 'Asserts cause: setting the image aside did not bring about the unauthorised showing.',
      D: 'Announces a conclusion in the middle of a narrative.',
    },
  },

  /* ============ Transitions: medium ============ */
  {
    id: 'rw_tr_107', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'medium', irt: { a: 1.2, b: 0.0 }, targetSeconds: 58,
    stimulus: { text: 'Historians of the plague have relied for a century on parish burial registers, and the objections to them are well known: rural parishes kept records unevenly, and the poorest dead often went unentered. ______ the registers remain the only continuous count anyone has, and abandoning them would leave the period with no series at all.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'Even so,' },
      { id: 'B', text: 'Accordingly,' },
      { id: 'C', text: 'For example,' },
      { id: 'D', text: 'In particular,' },
    ],
    answer: 'A',
    explanation: 'The first sentence concedes real defects in the registers; the second keeps using them anyway. Holding a position despite an admitted objection is concession, and "Even so" is the concessive transition.',
    distractorNotes: {
      B: 'Asserts result, which would make the defects the reason to keep the registers.',
      C: 'Asserts exemplification; the second sentence is a judgement, not an instance of the defects.',
      D: 'Asserts narrowing to a specific case, and the second sentence widens instead.',
    },
  },
  {
    id: 'rw_tr_108', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'medium', irt: { a: 1.18, b: 0.1 }, targetSeconds: 58,
    stimulus: { text: 'A shrinking city can lose half its population and still owe for the water mains, school buildings, and street miles it built for the larger one. ______ per-resident costs in such cities rise even as total spending falls.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'As a result,' },
      { id: 'B', text: 'Nonetheless,' },
      { id: 'C', text: 'Similarly,' },
      { id: 'D', text: 'Meanwhile,' },
    ],
    answer: 'A',
    explanation: 'Fixed obligations divided among fewer residents is precisely what makes the per-resident figure rise. The second sentence states the arithmetic consequence of the first.',
    distractorNotes: {
      B: 'Asserts contrast. The rising per-resident cost looks surprising, which makes this tempting, but it is exactly what the first sentence predicts.',
      C: 'Asserts likeness rather than causation.',
      D: 'Asserts simultaneity, which drops the causal link the sentences actually have.',
    },
  },
  {
    id: 'rw_tr_109', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'medium', irt: { a: 1.22, b: 0.18 }, targetSeconds: 58,
    stimulus: { text: 'In Old English poetry the line is held together by alliteration rather than by rhyme, and a scribe copying into a different dialect could break the pattern without noticing. ______ in classical Chinese regulated verse the binding constraint is tone, and a copyist working after the tone categories had shifted could destroy a poem’s music while preserving every character.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'Similarly,' },
      { id: 'B', text: 'By contrast,' },
      { id: 'C', text: 'Therefore,' },
      { id: 'D', text: 'Regardless,' },
    ],
    answer: 'A',
    explanation: 'Two different traditions are described, but the point made about each is the same: the feature that binds the verse is the feature a later copyist can silently destroy. The parallel is the relation.',
    distractorNotes: {
      B: 'Asserts contrast. The traditions differ, which makes this tempting, but the sentences are built to make the same point about both.',
      C: 'Asserts result; nothing about Chinese verse follows from a fact about Old English.',
      D: 'Asserts that the second holds despite the first, which is not a relation these sentences have.',
    },
  },
  {
    id: 'rw_tr_110', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'medium', irt: { a: 1.16, b: 0.22 }, targetSeconds: 58,
    stimulus: { text: 'The team reported that their catalyst degraded under one specific condition. ______ it lost roughly forty percent of its activity within an hour whenever dissolved oxygen exceeded two parts per million.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'Specifically,' },
      { id: 'B', text: 'For example,' },
      { id: 'C', text: 'In contrast,' },
      { id: 'D', text: 'Consequently,' },
    ],
    answer: 'A',
    explanation: 'The first sentence promises one condition; the second gives that one condition in detail. Naming the single case just announced is specification, not illustration.',
    distractorNotes: {
      B: 'Asserts that this is one instance among several, but the first sentence says there is exactly one condition.',
      C: 'Asserts contrast between an announcement and its own detail.',
      D: 'Asserts result, which would make the degradation follow from the report of it.',
    },
  },
  {
    id: 'rw_tr_111', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'medium', irt: { a: 1.2, b: 0.3 }, targetSeconds: 58,
    stimulus: { text: 'Through the 1960s the northern colony grew steadily as the fishery closed and the seals were left alone. ______ the southern colony, subject to the same protections, declined every year of the decade — a divergence the protection alone cannot explain.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'Meanwhile,' },
      { id: 'B', text: 'Thus,' },
      { id: 'C', text: 'In short,' },
      { id: 'D', text: 'Afterward,' },
    ],
    answer: 'A',
    explanation: 'Two colonies are tracked over the same decade and behave differently. A transition marking simultaneous but divergent developments is what the sentences need.',
    distractorNotes: {
      B: 'Asserts result: the southern decline would follow from the northern growth, which the text denies.',
      C: 'Announces a summary, but the second sentence adds a new and conflicting fact.',
      D: 'Asserts that the southern decline came after the decade, when the text places both in the 1960s.',
    },
  },
  {
    id: 'rw_tr_112', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'medium', irt: { a: 1.24, b: 0.35 }, targetSeconds: 58,
    stimulus: { text: 'Contrary to a persistent story, the ancient Roman concrete used in harbour works did not survive because the mix was denser than modern concrete. ______ seawater reacting with volcanic ash in the mix grew new crystals inside the cracks, sealing them as they formed.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'Rather,' },
      { id: 'B', text: 'Likewise,' },
      { id: 'C', text: 'Hence,' },
      { id: 'D', text: 'Granted,' },
    ],
    answer: 'A',
    explanation: 'The first sentence rejects one explanation; the second supplies the correct one in its place. Substituting the right account for the rejected one calls for a corrective transition.',
    distractorNotes: {
      B: 'Asserts likeness, but the second sentence replaces the first rather than matching it.',
      C: 'Asserts result: the crystal growth would follow from the density claim the text has just denied.',
      D: 'Asserts concession, which would grant the density claim the sentence rejects.',
    },
  },
  {
    id: 'rw_tr_113', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'medium', irt: { a: 1.18, b: 0.4 }, targetSeconds: 58,
    stimulus: { text: 'Every additional sensor on the rover had to be carried, powered, and kept warm through the Martian night, and the mass budget was fixed before launch. ______ each instrument that flew displaced one that did not.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'In effect,' },
      { id: 'B', text: 'Otherwise,' },
      { id: 'C', text: 'For instance,' },
      { id: 'D', text: 'Previously,' },
    ],
    answer: 'A',
    explanation: 'A fixed budget with costly additions amounts to a trade-off, and the second sentence states what the first amounts to. "In effect" marks that summing-up of a consequence.',
    distractorNotes: {
      B: 'Asserts what would happen if the first sentence did not hold, and the text describes what does hold.',
      C: 'Asserts exemplification, but the second sentence generalises rather than giving a case.',
      D: 'Asserts time order and points back to nothing.',
    },
  },

  /* ============ Transitions: hard ============ */
  {
    id: 'rw_tr_114', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'hard', irt: { a: 1.34, b: 1.05 }, targetSeconds: 65,
    stimulus: { text: 'Economists testing the minimum-wage literature for publication bias have found that estimates cluster suspiciously tightly around zero, which is what one would expect if null-ish results were the ones that got written up. The clustering is not itself proof of anything: a genuinely small effect would also produce estimates near zero. ______ the density of the cluster is far higher than sampling error alone can generate, and that excess is what the bias tests are measuring.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'What is decisive is that' },
      { id: 'B', text: 'By way of illustration,' },
      { id: 'C', text: 'It follows that' },
      { id: 'D', text: 'In much the same way,' },
    ],
    answer: 'A',
    explanation: 'The middle sentence concedes that clustering alone proves nothing; the last sentence names the further fact that does settle the question. The transition must mark that the sentence supplies what the concession left missing.',
    distractorNotes: {
      B: 'Asserts illustration, but the excess density is new evidence, not an example of the concession.',
      C: 'Asserts that the last sentence is deducible from the concession, when it introduces a measurement the concession does not contain.',
      D: 'Asserts likeness, which would make the last sentence a parallel case rather than the deciding evidence.',
    },
  },
  {
    id: 'rw_tr_115', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'hard', irt: { a: 1.3, b: 1.15 }, targetSeconds: 65,
    stimulus: { text: 'The manuscript has usually been dated to the 1450s on the strength of its watermarks. The watermark evidence is weaker than it looks: the paper stock in question stayed in circulation for at least three decades after it was made. ______ two of the three watermarks in the codex have now been matched to moulds documented in use in the 1480s.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'Indeed,' },
      { id: 'B', text: 'Nevertheless,' },
      { id: 'C', text: 'In summary,' },
      { id: 'D', text: 'Conversely,' },
    ],
    answer: 'A',
    explanation: 'The second sentence weakens the 1450s dating; the third goes further in the same direction with a stronger fact. A transition that intensifies the point just made is what the sequence calls for.',
    distractorNotes: {
      B: 'Asserts contrast, but the third sentence reinforces the second instead of pushing against it.',
      C: 'Announces a summary, and the third sentence introduces evidence not yet mentioned.',
      D: 'Asserts an opposite relation, which the third sentence does not have to the second.',
    },
  },
  {
    id: 'rw_tr_116', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'hard', irt: { a: 1.36, b: 1.2 }, targetSeconds: 65,
    stimulus: { text: 'A telescope’s adaptive optics must sample the atmosphere faster than the atmosphere changes, which at this site means about a thousand corrections per second. ______ the mirror is not correcting the turbulence in front of it but the turbulence that has already passed.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'Otherwise,' },
      { id: 'B', text: 'Furthermore,' },
      { id: 'C', text: 'Accordingly,' },
      { id: 'D', text: 'To that end,' },
    ],
    answer: 'A',
    explanation: 'The second sentence states what goes wrong when the requirement in the first is not met. That negative-conditional relation — if not this, then that — is exactly what "Otherwise" marks.',
    distractorNotes: {
      B: 'Asserts addition, which would present chasing stale turbulence as a second requirement rather than a failure.',
      C: 'Asserts that correcting the wrong turbulence follows from meeting the sampling requirement, which reverses the sense.',
      D: 'Asserts purpose, as though the mismatch were the goal the fast sampling serves.',
    },
  },
  {
    id: 'rw_tr_117', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'hard', irt: { a: 1.32, b: 1.3 }, targetSeconds: 65,
    stimulus: { text: 'Both surveys report that roughly a third of respondents had changed jobs in the previous year, and both were run in the same quarter. The first, however, drew its sample from a payroll panel that only registers workers who are employed on the day of the draw. ______ the second sampled households, so it counted the people who had left work entirely — a group whose job changes the first survey cannot see.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'By comparison,' },
      { id: 'B', text: 'Consequently,' },
      { id: 'C', text: 'Equally,' },
      { id: 'D', text: 'In fact,' },
    ],
    answer: 'A',
    explanation: 'The two surveys agree on the headline number, but the sentences set their sampling frames against each other. The transition must mark the difference in method, not the agreement in result.',
    distractorNotes: {
      B: 'Asserts result: the household sampling would follow from the payroll panel’s limitation, which is not claimed.',
      C: 'Asserts sameness. The matching headline figures make this tempting, but the sentence is about how the frames differ.',
      D: 'Asserts intensification of the previous point, and the second frame is a contrast rather than a stronger version of the first.',
    },
  },
  {
    id: 'rw_tr_118', section: 'rw', domain: 'expression-of-ideas', skill: 'transitions',
    format: 'mcq', band: 'hard', irt: { a: 1.28, b: 1.4 }, targetSeconds: 65,
    stimulus: { text: 'The compiler cannot prove that the two pointers never refer to the same memory, and without that proof it must assume they might. ______ every write through one pointer forces a reload of anything read through the other, which is why the loop runs at a third of the speed the same code reaches when the pointers are marked distinct.' },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'Thus,' },
      { id: 'B', text: 'Even so,' },
      { id: 'C', text: 'Similarly,' },
      { id: 'D', text: 'Admittedly,' },
    ],
    answer: 'A',
    explanation: 'The forced reload is the direct consequence of the compiler having to assume the pointers may alias. The relation is result, and the closing clause reports its measured cost.',
    distractorNotes: {
      B: 'Asserts concession, which would make the slowdown persist despite the assumption rather than because of it.',
      C: 'Asserts likeness between an assumption and its own consequence.',
      D: 'Asserts a concession to an opposing view, and no opposing view is on the table.',
    },
  },

  /* ============ Boundaries: easy ============ */
  {
    id: 'rw_bd_101', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'easy', irt: { a: 1.05, b: -1.15 }, targetSeconds: 45,
    stimulus: { text: 'The library’s oldest map was drawn on sheepskin in ______ shows a coastline that no longer exists.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: '1544, and it' },
      { id: 'B', text: '1544, it' },
      { id: 'C', text: '1544 and it' },
      { id: 'D', text: '1544; and it' },
    ],
    answer: 'A',
    explanation: 'Two independent clauses joined by the coordinating conjunction "and" take a comma before the conjunction.',
    distractorNotes: {
      B: 'Comma splice: a comma alone cannot join two independent clauses.',
      C: 'Omits the comma required before a coordinating conjunction joining independent clauses.',
      D: 'A semicolon joins independent clauses without a conjunction; using both is redundant.',
    },
  },
  {
    id: 'rw_bd_102', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'easy', irt: { a: 1.06, b: -1.05 }, targetSeconds: 45,
    stimulus: { text: 'Because the eruption buried the town under six metres of ash within a single ______ the wooden furniture inside the houses was carbonised rather than burned.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'afternoon,' },
      { id: 'B', text: 'afternoon' },
      { id: 'C', text: 'afternoon;' },
      { id: 'D', text: 'afternoon:' },
    ],
    answer: 'A',
    explanation: 'A dependent clause opening with "Because" is closed by a comma before the main clause begins.',
    distractorNotes: {
      B: 'Runs the dependent clause into the main clause with no boundary.',
      C: 'A semicolon needs an independent clause on each side, and "Because…afternoon" is not one.',
      D: 'A colon must follow an independent clause; what precedes it here is a fragment.',
    },
  },
  {
    id: 'rw_bd_103', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'easy', irt: { a: 1.02, b: -0.95 }, targetSeconds: 45,
    stimulus: { text: 'The composer Florence ______ first Black woman to have a symphony played by a major American orchestra, wrote more than three hundred works.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'Price, the' },
      { id: 'B', text: 'Price the' },
      { id: 'C', text: 'Price; the' },
      { id: 'D', text: 'Price: the' },
    ],
    answer: 'A',
    explanation: 'The phrase "the first Black woman…orchestra" is a nonessential appositive, already closed by the comma before "wrote". It needs a matching comma to open it.',
    distractorNotes: {
      B: 'Leaves the appositive unopened, so only one of the two required commas is present.',
      C: 'A semicolon requires an independent clause on each side.',
      D: 'A colon requires an independent clause before it, and "The composer Florence Price" is not one.',
    },
  },
  {
    id: 'rw_bd_104', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'easy', irt: { a: 1.08, b: -0.9 }, targetSeconds: 45,
    stimulus: { text: 'The survival kit issued to each crew member contained exactly three ______ a signalling mirror, a litre of water, and a folded thermal blanket.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'items:' },
      { id: 'B', text: 'items,' },
      { id: 'C', text: 'items;' },
      { id: 'D', text: 'items' },
    ],
    answer: 'A',
    explanation: 'What precedes the blank is a complete sentence and what follows is the list it announces. A colon after an independent clause is the standard way to introduce a list.',
    distractorNotes: {
      B: 'A comma cannot mark the announcement of a list after a complete clause.',
      C: 'A semicolon needs an independent clause on each side, and the list is not one.',
      D: 'Leaves the list attached to "three items" with no boundary at all.',
    },
  },
  {
    id: 'rw_bd_105', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'easy', irt: { a: 1.04, b: -0.8 }, targetSeconds: 45,
    stimulus: { text: 'The city’s tram network was dismantled in ______ forty years later the same routes were rebuilt at ten times the original cost.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: '1958.' },
      { id: 'B', text: '1958,' },
      { id: 'C', text: '1958' },
      { id: 'D', text: '1958, then' },
    ],
    answer: 'A',
    explanation: 'Both halves are independent clauses with no conjunction between them, so they must be separated by a full stop or a semicolon.',
    distractorNotes: {
      B: 'Comma splice.',
      C: 'Run-on with no boundary between two complete sentences.',
      D: '"Then" is an adverb, not a coordinating conjunction, so a comma before it still splices two independent clauses.',
    },
  },
  {
    id: 'rw_bd_106', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'easy', irt: { a: 1.0, b: -0.7 }, targetSeconds: 45,
    stimulus: { text: 'Working from a single fragment of jawbone, the palaeontologist who reconstructed the ______ the animal had eaten almost nothing but grass.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'skull argued that' },
      { id: 'B', text: 'skull, argued that' },
      { id: 'C', text: 'skull; argued that' },
      { id: 'D', text: 'skull: argued that' },
    ],
    answer: 'A',
    explanation: '"Who reconstructed the skull" is an essential relative clause identifying which palaeontologist, so no punctuation separates it from the verb "argued" that follows.',
    distractorNotes: {
      B: 'A single comma between the subject and its verb, which is never correct.',
      C: 'A semicolon requires an independent clause on each side; "argued that…grass" has no subject.',
      D: 'A colon cannot stand between a subject and its verb.',
    },
  },

  /* ============ Boundaries: medium ============ */
  {
    id: 'rw_bd_107', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'medium', irt: { a: 1.2, b: 0.05 }, targetSeconds: 52,
    stimulus: { text: 'The two isotopes decay at almost the same ______ however, only one of them produces a gamma ray a detector can count.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'rate;' },
      { id: 'B', text: 'rate,' },
      { id: 'C', text: 'rate' },
      { id: 'D', text: 'rate, and' },
    ],
    answer: 'A',
    explanation: '"However" is a conjunctive adverb, not a conjunction, so it cannot join clauses. Two independent clauses around it require a semicolon or a full stop.',
    distractorNotes: {
      B: 'Comma splice: "however" does not have the joining power of a conjunction.',
      C: 'Run-on.',
      D: 'Piles a coordinating conjunction on top of "however", giving the sentence two connectors for one join.',
    },
  },
  {
    id: 'rw_bd_108', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'medium', irt: { a: 1.22, b: 0.12 }, targetSeconds: 52,
    stimulus: { text: 'Of the four bridges the engineer designed, the one ______ carries the coastal railway is the only one still standing.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'that' },
      { id: 'B', text: ', which' },
      { id: 'C', text: ', that' },
      { id: 'D', text: 'which,' },
    ],
    answer: 'A',
    explanation: 'The clause is what tells you which of the four bridges is meant, so it is essential and takes no comma. Essential clauses in this position take "that".',
    distractorNotes: {
      B: 'Marks the clause as nonessential, which would mean the bridge has already been identified — but "the one" identifies nothing on its own.',
      C: 'A comma before "that" wrongly separates an essential clause from the noun it identifies.',
      D: 'Puts a comma after "which", splitting the relative pronoun from its own clause.',
    },
  },
  {
    id: 'rw_bd_109', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'medium', irt: { a: 1.24, b: 0.2 }, targetSeconds: 52,
    stimulus: { text: 'The three surviving copies of the treaty — one in Lisbon, one in Seville, and one long thought ______ differ from one another in the boundary clause.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'lost —' },
      { id: 'B', text: 'lost,' },
      { id: 'C', text: 'lost' },
      { id: 'D', text: 'lost;' },
    ],
    answer: 'A',
    explanation: 'The supplement is opened with a dash, so it must be closed with a dash. Punctuation marks that enclose a supplement have to match.',
    distractorNotes: {
      B: 'Mixes a dash with a comma, so the pair does not match.',
      C: 'Leaves the supplement unclosed and runs it into the main verb.',
      D: 'A semicolon cannot close a dash-opened supplement, and neither side of it is an independent clause.',
    },
  },
  {
    id: 'rw_bd_110', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'medium', irt: { a: 1.2, b: 0.28 }, targetSeconds: 52,
    stimulus: { text: 'The chemist kept two notebooks for a reason that had nothing to do with ______ one recorded what she did, and the other recorded what she had expected to happen.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'tidiness:' },
      { id: 'B', text: 'tidiness,' },
      { id: 'C', text: 'tidiness' },
      { id: 'D', text: 'tidiness, which' },
    ],
    answer: 'A',
    explanation: 'A complete clause precedes the blank and what follows explains the "reason" it names. A colon is the mark that introduces an explanation after an independent clause.',
    distractorNotes: {
      B: 'Comma splice between two independent clauses.',
      C: 'Run-on.',
      D: '"Which" would attach to "tidiness" and say that tidiness recorded what she did.',
    },
  },
  {
    id: 'rw_bd_111', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'medium', irt: { a: 1.18, b: 0.32 }, targetSeconds: 52,
    stimulus: { text: 'After the flood receded and the volunteers had carried the last of the ruined books out of the ______ began the slow work of freeze-drying what could still be saved.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'basement, the conservators' },
      { id: 'B', text: 'basement the conservators' },
      { id: 'C', text: 'basement; the conservators' },
      { id: 'D', text: 'basement, the conservators,' },
    ],
    answer: 'A',
    explanation: 'A long introductory dependent clause is closed by a comma before the main clause. Length does not change the rule; it only makes the boundary easier to lose.',
    distractorNotes: {
      B: 'No boundary between the introductory clause and the main clause.',
      C: 'A semicolon needs an independent clause on each side, and the "After…" clause is dependent.',
      D: 'Adds a second comma that separates the subject "the conservators" from its verb "began".',
    },
  },
  {
    id: 'rw_bd_112', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'medium', irt: { a: 1.26, b: 0.38 }, targetSeconds: 52,
    stimulus: { text: 'The instrument measures three quantities at ______ pressure, temperature, and the concentration of dissolved carbon dioxide.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'once:' },
      { id: 'B', text: 'once, including:' },
      { id: 'C', text: 'once; namely' },
      { id: 'D', text: 'once, such as:' },
    ],
    answer: 'A',
    explanation: '"The instrument measures three quantities at once" is a complete clause, so a colon may introduce the list that follows it.',
    distractorNotes: {
      B: 'A colon never follows "including"; the phrase already introduces the list.',
      C: 'A semicolon requires an independent clause after it, and a bare list is not one.',
      D: 'Same fault as B, and "such as" also wrongly implies the three named quantities are only examples when the text says there are exactly three.',
    },
  },

  /* ============ Boundaries: hard ============ */
  {
    id: 'rw_bd_113', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'hard', irt: { a: 1.34, b: 1.0 }, targetSeconds: 58,
    stimulus: { text: 'The claim that a language with no fixed word order cannot express complex subordination ______ been contradicted by every corpus assembled since the 1970s.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'has' },
      { id: 'B', text: ', has' },
      { id: 'C', text: '; has' },
      { id: 'D', text: ' — has' },
    ],
    answer: 'A',
    explanation: 'The subject is "The claim that…subordination": the "that" clause is essential content of the claim, not a supplement. Nothing may stand between that whole subject and its verb.',
    distractorNotes: {
      B: 'A single comma between subject and verb. The long subject invites a pause here, but a pause is not a punctuation rule.',
      C: 'A semicolon needs an independent clause on each side; the subject alone is not one.',
      D: 'A lone dash here separates the subject from its verb just as the comma does.',
    },
  },
  {
    id: 'rw_bd_114', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'hard', irt: { a: 1.3, b: 1.1 }, targetSeconds: 58,
    stimulus: { text: 'The touring exhibition opens in Kyoto, ______ Lisbon, Portugal; and Valparaíso, Chile.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'Japan;' },
      { id: 'B', text: 'Japan,' },
      { id: 'C', text: 'Japan' },
      { id: 'D', text: 'Japan:' },
    ],
    answer: 'A',
    explanation: 'The list items each contain an internal comma, so the items are separated by semicolons. The sentence already uses a semicolon before "and Valparaíso", and the series must be punctuated consistently.',
    distractorNotes: {
      B: 'A comma here makes "Japan" look like a fourth item in a series otherwise divided by semicolons.',
      C: 'Leaves two list items fused with no separator.',
      D: 'A colon cannot separate items inside a series, and no independent clause precedes it.',
    },
  },
  {
    id: 'rw_bd_115', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'hard', irt: { a: 1.32, b: 1.18 }, targetSeconds: 58,
    stimulus: { text: 'A soil sample from the trench was sent to three laboratories, each of which reported the same anomaly in the ______ a spike in lead concentration at a depth the excavators had dated to the 1890s.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'profile:' },
      { id: 'B', text: 'profile,' },
      { id: 'C', text: 'profile;' },
      { id: 'D', text: 'profile' },
    ],
    answer: 'A',
    explanation: 'Everything before the blank is an independent clause, and what follows is the anomaly it has just announced without naming. A colon introduces that identification.',
    distractorNotes: {
      B: 'A comma would present the spike as one more item in a list, but there is no list; it is the anomaly itself.',
      C: 'A semicolon needs an independent clause after it, and "a spike…1890s" is a noun phrase.',
      D: 'Runs the noun phrase into "profile", producing "the profile a spike".',
    },
  },
  {
    id: 'rw_bd_116', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'hard', irt: { a: 1.36, b: 1.28 }, targetSeconds: 58,
    stimulus: { text: 'Of the many manuscripts Ada Lovelace annotated, her copy of Menabrea’s ______ carries the notes that describe a general-purpose computing machine, was rebound in the 1950s and is now unreadable at the gutter.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'memoir, which' },
      { id: 'B', text: 'memoir which' },
      { id: 'C', text: 'memoir that' },
      { id: 'D', text: 'memoir; which' },
    ],
    answer: 'A',
    explanation: 'The relative clause is already closed by the comma before "was rebound", so it is nonessential and must be opened by a matching comma. A nonessential clause takes "which".',
    distractorNotes: {
      B: 'Leaves the nonessential clause with only its closing comma.',
      C: '"That" marks an essential clause, which cannot be enclosed in commas — and the copy is already identified as hers.',
      D: 'A semicolon requires an independent clause on each side.',
    },
  },
  {
    id: 'rw_bd_117', section: 'rw', domain: 'standard-english-conventions', skill: 'boundaries',
    format: 'mcq', band: 'hard', irt: { a: 1.3, b: 1.35 }, targetSeconds: 58,
    stimulus: { text: 'For most of the twentieth century the crater was read as a volcanic ______ in the early 1960s, after shocked quartz was identified in its rim, the impact interpretation displaced that reading within a decade.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'feature;' },
      { id: 'B', text: 'feature,' },
      { id: 'C', text: 'feature' },
      { id: 'D', text: 'feature, which' },
    ],
    answer: 'A',
    explanation: 'Two independent clauses stand on either side of the blank; the long adverbial openers on the second clause disguise that it is complete. With no conjunction, they need a semicolon or a full stop.',
    distractorNotes: {
      B: 'Comma splice. The phrases "in the early 1960s" and "after shocked quartz…" make the second clause read like a continuation, but it has its own subject and verb.',
      C: 'Run-on.',
      D: '"Which" would take "feature" as its antecedent and leave the sentence without a main verb for the second clause.',
    },
  },
];
