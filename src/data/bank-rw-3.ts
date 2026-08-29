/**
 * Reading and Writing item bank — Expression of Ideas, Standard English Conventions.
 */

import type { Question } from '../types.ts';

export const RW_BANK_3: Question[] = [
  /* ---------- Transitions ---------- */
  {
    id: 'rw_tr_001',
    section: 'rw',
    domain: 'expression-of-ideas',
    skill: 'transitions',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.0, b: -0.95 },
    targetSeconds: 55,
    stimulus: {
      text: 'Sea otters eat enormous quantities of sea urchins, which in turn graze on kelp. Where otter populations collapsed in the twentieth century, urchins multiplied and kelp forests were stripped to bare rock. ______ protecting a single predator species turned out to protect an entire underwater habitat.',
    },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'Thus,' },
      { id: 'B', text: 'Nevertheless,' },
      { id: 'C', text: 'For example,' },
      { id: 'D', text: 'Meanwhile,' },
    ],
    answer: 'A',
    explanation:
      'The first two sentences establish a causal chain — otters check urchins, urchins eat kelp — and the last sentence draws the conclusion that follows from it. A conclusion demands a resultative transition.',
    distractorNotes: {
      B: 'Signals contrast, but the final sentence agrees with what precedes it.',
      C: 'The final sentence generalises from the chain rather than illustrating it.',
      D: 'Signals simultaneity, and no second timeline is in play.',
    },
  },
  {
    id: 'rw_tr_002',
    section: 'rw',
    domain: 'expression-of-ideas',
    skill: 'transitions',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.1 },
    targetSeconds: 60,
    stimulus: {
      text: 'Standard economic models long assumed that people discount future rewards at a constant rate. Experimental work has repeatedly found otherwise: subjects discount steeply over the next few days and far more gently over longer horizons. ______ the models remain in wide use, in part because their mathematics is tractable and the alternatives are not.',
    },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'Consequently,' },
      { id: 'B', text: 'Still,' },
      { id: 'C', text: 'Likewise,' },
      { id: 'D', text: 'In other words,' },
    ],
    answer: 'B',
    explanation:
      'The evidence undercuts the models, yet they remain in use. The final sentence runs against what the evidence would lead you to expect, so it needs a concessive transition.',
    distractorNotes: {
      A: 'Would claim the models persist because they were contradicted, which inverts the logic.',
      C: 'Signals similarity, but the sentences are in tension.',
      D: 'Signals restatement; the final sentence introduces new information about why the models survive.',
    },
  },
  {
    id: 'rw_tr_003',
    section: 'rw',
    domain: 'expression-of-ideas',
    skill: 'transitions',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.25, b: 1.0 },
    targetSeconds: 60,
    stimulus: {
      text: 'The manuscript\'s parchment was radiocarbon dated to the early fifteenth century, which establishes when the animal died and the skin was prepared. It does not establish when the text was written: blank parchment was expensive and was routinely stored, traded, and used decades after preparation. ______ the date supplies an earliest possible moment of composition rather than an actual one.',
    },
    prompt: 'Which choice completes the text with the most logical transition?',
    choices: [
      { id: 'A', text: 'By contrast,' },
      { id: 'B', text: 'Admittedly,' },
      { id: 'C', text: 'Accordingly,' },
      { id: 'D', text: 'Alternatively,' },
    ],
    answer: 'C',
    explanation:
      'The middle sentence explains why the date bounds composition only from below; the final sentence states that conclusion. The relationship is inference from what precedes.',
    distractorNotes: {
      A: 'The final sentence follows from the preceding reasoning rather than opposing it.',
      B: 'Concedes a point against the argument, but this sentence is the argument\'s conclusion.',
      D: 'Introduces a competing option, and none is offered here.',
    },
  },

  /* ---------- Rhetorical Synthesis ---------- */
  {
    id: 'rw_rs_001',
    section: 'rw',
    domain: 'expression-of-ideas',
    skill: 'rhetorical-synthesis',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.2, b: 0.2 },
    targetSeconds: 85,
    stimulus: {
      text: 'While researching a topic, a student has taken the following notes:\n\n• Vaquita porpoises live only in the northern Gulf of California.\n• Fewer than fifteen individuals were estimated to remain in 2023.\n• Nearly all vaquita deaths are caused by entanglement in gillnets set illegally for totoaba fish.\n• Totoaba swim bladders sell for high prices in an overseas market.\n• A 2017 attempt to capture vaquitas for a protected breeding programme was abandoned after a captured animal died.',
    },
    prompt:
      'The student wants to explain why captive breeding has not been pursued as a solution. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      { id: 'A', text: 'Vaquita porpoises, found only in the northern Gulf of California, numbered fewer than fifteen individuals in 2023.' },
      { id: 'B', text: 'Captive breeding has not been pursued because a 2017 capture attempt was abandoned after one of the captured vaquitas died.' },
      { id: 'C', text: 'Nearly all vaquita deaths result from entanglement in gillnets set illegally for totoaba, whose swim bladders sell for high prices overseas.' },
      { id: 'D', text: 'Because fewer than fifteen vaquitas remained in 2023, illegal gillnet fishing for totoaba continues in the northern Gulf of California.' },
    ],
    answer: 'B',
    explanation:
      'The goal names one thing to explain: why captive breeding was not pursued. Only the fifth note bears on captive breeding, and B uses it directly and completely.',
    distractorNotes: {
      A: 'Accurate but addresses range and population, not the breeding programme.',
      C: 'Explains the cause of the decline, which is a different question from the one asked.',
      D: 'Invents a causal link the notes do not support — scarcity does not cause the fishing.',
    },
  },
  {
    id: 'rw_rs_002',
    section: 'rw',
    domain: 'expression-of-ideas',
    skill: 'rhetorical-synthesis',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.25, b: 1.05 },
    targetSeconds: 90,
    stimulus: {
      text: 'While researching a topic, a student has taken the following notes:\n\n• The Voynich manuscript is written in an undeciphered script.\n• Its parchment dates to 1404–1438.\n• Statistical analyses show word-frequency patterns resembling those of natural languages.\n• Other analyses show the script lacks the corrections and revisions typical of natural writing.\n• No repeated word pair appears in the manuscript with the frequency expected of a natural language.',
    },
    prompt:
      'The student wants to present the evidence that complicates the view that the manuscript records a natural language. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      { id: 'A', text: 'Although statistical analyses reveal word-frequency patterns like those of natural languages, the script lacks the corrections typical of natural writing, and no word pair repeats as often as a natural language would predict.' },
      { id: 'B', text: 'The Voynich manuscript, written on parchment dated to 1404–1438, is composed in a script that remains undeciphered.' },
      { id: 'C', text: 'Statistical analyses show that the manuscript\'s word-frequency patterns resemble those found in natural languages.' },
      { id: 'D', text: 'Because the parchment dates to the early fifteenth century, the manuscript\'s script must record a language spoken at that time.' },
    ],
    answer: 'A',
    explanation:
      'The goal asks for what complicates the natural-language view. A states that view\'s support in a subordinate clause, then delivers both counter-findings — missing corrections and absent word-pair repetition — as the main assertion.',
    distractorNotes: {
      B: 'Background only; it neither supports nor complicates the claim.',
      C: 'Presents evidence for the view rather than against it.',
      D: 'Draws an inference the notes do not license, and supports rather than complicates.',
    },
  },

  /* ---------- Boundaries ---------- */
  {
    id: 'rw_bd_001',
    section: 'rw',
    domain: 'standard-english-conventions',
    skill: 'boundaries',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.05, b: -1.05 },
    targetSeconds: 45,
    stimulus: {
      text: 'The Great Barrier Reef stretches more than 2,300 kilometres along the Queensland coast ______ it is the only living structure visible from low Earth orbit.',
    },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'coast;' },
      { id: 'B', text: 'coast,' },
      { id: 'C', text: 'coast' },
      { id: 'D', text: 'coast and' },
    ],
    answer: 'A',
    explanation:
      'Both halves are independent clauses. A semicolon joins two independent clauses correctly; the sentence as written offers no coordinating conjunction, so a comma alone would splice them.',
    distractorNotes: {
      B: 'Comma splice — a comma cannot join two independent clauses by itself.',
      C: 'Run-on: no punctuation at all between complete sentences.',
      D: 'A coordinating conjunction joining two independent clauses needs a comma before it; "coast and it is" omits that comma.',
    },
  },
  {
    id: 'rw_bd_002',
    section: 'rw',
    domain: 'standard-english-conventions',
    skill: 'boundaries',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.2, b: 0.05 },
    targetSeconds: 50,
    stimulus: {
      text: 'Mathematician Emmy Noether, whose 1918 theorem linked every continuous symmetry in a physical system to a conserved ______ was denied a salaried position at Göttingen for years because of university rules barring women from the faculty.',
    },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'quantity' },
      { id: 'B', text: 'quantity,' },
      { id: 'C', text: 'quantity;' },
      { id: 'D', text: 'quantity:' },
    ],
    answer: 'B',
    explanation:
      'The clause beginning "whose 1918 theorem" is a nonessential modifier opened by a comma after "Noether". A paired comma must close it before the main verb "was denied".',
    distractorNotes: {
      A: 'Leaves the nonessential clause unclosed, so the subject runs into its verb without the required second comma.',
      C: 'A semicolon needs an independent clause on each side; "Mathematician Emmy Noether, whose…quantity" is not one.',
      D: 'A colon must follow an independent clause, and what precedes it here is a fragment.',
    },
  },
  {
    id: 'rw_bd_003',
    section: 'rw',
    domain: 'standard-english-conventions',
    skill: 'boundaries',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.3, b: 1.15 },
    targetSeconds: 55,
    stimulus: {
      text: 'The expedition carried three chronometers rather than one for a practical ______ if a single instrument drifted, there would be no way to know which reading to trust.',
    },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'reason,' },
      { id: 'B', text: 'reason:' },
      { id: 'C', text: 'reason' },
      { id: 'D', text: 'reason, which' },
    ],
    answer: 'B',
    explanation:
      'What precedes the blank is a complete sentence, and what follows explains "a practical reason". A colon after an independent clause is the standard way to introduce that explanation.',
    distractorNotes: {
      A: 'Comma splice between two independent clauses.',
      C: 'Run-on.',
      D: '"Which" would need a noun antecedent to modify, and it cannot take the following independent clause as its complement.',
    },
  },

  /* ---------- Form, Structure, and Sense ---------- */
  {
    id: 'rw_fs_001',
    section: 'rw',
    domain: 'standard-english-conventions',
    skill: 'form-structure-sense',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.05, b: -0.9 },
    targetSeconds: 45,
    stimulus: {
      text: 'The collection of letters that the museum acquired last spring ______ never been exhibited publicly.',
    },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'has' },
      { id: 'B', text: 'have' },
      { id: 'C', text: 'having' },
      { id: 'D', text: 'were' },
    ],
    answer: 'A',
    explanation:
      'The subject is "collection", a singular noun. "Of letters" is a prepositional phrase, and a prepositional phrase never supplies the subject, so the verb stays singular.',
    distractorNotes: {
      B: 'Agrees with "letters", which sits inside a prepositional phrase and cannot govern the verb.',
      C: 'A participle leaves the sentence without a finite verb.',
      D: 'Plural, and it also breaks the "never been exhibited" construction.',
    },
  },
  {
    id: 'rw_fs_002',
    section: 'rw',
    domain: 'standard-english-conventions',
    skill: 'form-structure-sense',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.2, b: 0.15 },
    targetSeconds: 50,
    stimulus: {
      text: 'Trained as a botanist rather than a physician, ______',
    },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'the plant compounds Percy Julian isolated became the basis of modern steroid medicine.' },
      { id: 'B', text: 'it was Percy Julian whose isolated plant compounds became the basis of modern steroid medicine.' },
      { id: 'C', text: 'Percy Julian isolated plant compounds that became the basis of modern steroid medicine.' },
      { id: 'D', text: 'modern steroid medicine rests on plant compounds isolated by Percy Julian.' },
    ],
    answer: 'C',
    explanation:
      'An opening participial phrase modifies whatever noun follows the comma. Only a person can be "trained as a botanist", so "Percy Julian" must be the subject.',
    distractorNotes: {
      A: 'Makes "the plant compounds" the trained botanist — a dangling modifier.',
      B: '"It" cannot be trained as a botanist, so the modifier still dangles.',
      D: 'Makes "modern steroid medicine" the trained botanist.',
    },
  },
  {
    id: 'rw_fs_003',
    section: 'rw',
    domain: 'standard-english-conventions',
    skill: 'form-structure-sense',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.3, b: 1.1 },
    targetSeconds: 55,
    stimulus: {
      text: 'By the time the survey team reached the summit ridge, the storm front ______ the valley below them, cutting off the route they had planned to descend.',
    },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'had already filled' },
      { id: 'B', text: 'has already filled' },
      { id: 'C', text: 'already fills' },
      { id: 'D', text: 'is already filling' },
    ],
    answer: 'A',
    explanation:
      '"By the time" plus a simple-past clause sets a past reference point, and the storm\'s arrival precedes it. An action completed before a past moment takes the past perfect.',
    distractorNotes: {
      B: 'Present perfect connects to now, not to the past moment "reached" establishes.',
      C: 'Simple present clashes with the past narrative frame.',
      D: 'Present progressive has the same tense clash.',
    },
  },
  {
    id: 'rw_fs_004',
    section: 'rw',
    domain: 'standard-english-conventions',
    skill: 'form-structure-sense',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.3 },
    targetSeconds: 50,
    stimulus: {
      text: 'Neither the field notebooks nor the specimen catalogue ______ any record of where the holotype was collected.',
    },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'contain' },
      { id: 'B', text: 'contains' },
      { id: 'C', text: 'have contained' },
      { id: 'D', text: 'were containing' },
    ],
    answer: 'B',
    explanation:
      'With "neither…nor", the verb agrees with the nearer subject. "Catalogue" is singular, so the verb is singular.',
    distractorNotes: {
      A: 'Agrees with "notebooks", the farther subject.',
      C: 'Plural and shifts the aspect without cause.',
      D: 'Past progressive is both plural and wrong for a standing state of the record.',
    },
  },
];
