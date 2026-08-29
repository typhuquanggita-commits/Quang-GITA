/**
 * Reading and Writing item bank — Form, Structure, and Sense; Words in Context.
 *
 * Form, Structure, and Sense items are decided by finding the word the rule
 * actually attaches to. Agreement attaches to the subject, not to the nearest
 * noun; a participle attaches to the noun after the comma, not to the one the
 * writer had in mind; a tense attaches to the reference point the sentence
 * establishes, not to the order the clauses happen to appear in. So every item
 * here puts a plausible wrong attachment closer to the blank than the right
 * one — a plural inside a prepositional phrase, a noun the modifier could
 * almost describe, a second past event that is not the reference point.
 *
 * Words in Context items are decided by a constraint in the sentence, never by
 * the general feel of the word. Each item names that constraint in its
 * explanation, and each distractor is a word a strong reader might reach for:
 * right register, right part of speech, wrong on one specific requirement the
 * sentence sets. A student who can say what the sentence demands before
 * looking at the options answers these quickly; a student who tries the four
 * words in the gap in turn does not.
 */

import type { Question } from '../types.ts';

export const RW_BANK_13: Question[] = [
  /* ============ Form, structure, and sense: easy ============ */
  {
    id: 'rw_fs_101', section: 'rw', domain: 'standard-english-conventions', skill: 'form-structure-sense',
    format: 'mcq', band: 'easy', irt: { a: 1.05, b: -1.1 }, targetSeconds: 45,
    stimulus: { text: 'The archive of letters that the two families donated to the university ______ scheduled to be digitised next year.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'is' },
      { id: 'B', text: 'are' },
      { id: 'C', text: 'being' },
      { id: 'D', text: 'were' },
    ],
    answer: 'A',
    explanation: 'The subject is the singular noun "archive". "Of letters" is a prepositional phrase and "that the two families donated" is a relative clause; neither can supply the subject of the main verb.',
    distractorNotes: {
      B: 'Agrees with "letters" or "families", both of which sit inside modifiers of the subject.',
      C: 'A participle leaves the sentence with no finite verb.',
      D: 'Plural, and it also shifts the sentence into the past against "next year".',
    },
  },
  {
    id: 'rw_fs_102', section: 'rw', domain: 'standard-english-conventions', skill: 'form-structure-sense',
    format: 'mcq', band: 'easy', irt: { a: 1.02, b: -1.0 }, targetSeconds: 45,
    stimulus: { text: 'The colony rebuilds ______ nest each spring from wood fibre the workers chew into pulp.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'its' },
      { id: 'B', text: "it's" },
      { id: 'C', text: 'their' },
      { id: 'D', text: "its'" },
    ],
    answer: 'A',
    explanation: 'A possessive determiner is needed before "nest", and the antecedent "colony" is singular. The possessive form of "it" is "its", with no apostrophe.',
    distractorNotes: {
      B: 'Means "it is", which cannot stand before a noun as a possessive.',
      C: 'Plural, but the antecedent "colony" is a singular noun here.',
      D: 'Not a word in Standard English.',
    },
  },
  {
    id: 'rw_fs_103', section: 'rw', domain: 'standard-english-conventions', skill: 'form-structure-sense',
    format: 'mcq', band: 'easy', irt: { a: 1.0, b: -0.9 }, targetSeconds: 45,
    stimulus: { text: 'Each of the four telescopes on the ridge feeds ______ signal into a single correlator, which combines them into one image.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'its' },
      { id: 'B', text: 'their' },
      { id: 'C', text: 'its own individual' },
      { id: 'D', text: "it's" },
    ],
    answer: 'A',
    explanation: '"Each" is singular and governs the pronoun, so the possessive is singular even though four telescopes are involved.',
    distractorNotes: {
      B: 'Agrees with "telescopes" rather than with the subject "Each".',
      C: 'Singular and grammatical, but "own" and "individual" repeat what "its" already says.',
      D: 'A contraction of "it is", not a possessive.',
    },
  },
  {
    id: 'rw_fs_104', section: 'rw', domain: 'standard-english-conventions', skill: 'form-structure-sense',
    format: 'mcq', band: 'easy', irt: { a: 1.06, b: -0.85 }, targetSeconds: 45,
    stimulus: { text: 'The three ______ notebooks were catalogued together because all of them describe the same expedition.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'naturalists’' },
      { id: 'B', text: 'naturalist’s' },
      { id: 'C', text: 'naturalists' },
      { id: 'D', text: 'naturalists’s' },
    ],
    answer: 'A',
    explanation: 'The notebooks belong to three naturalists, so the noun is plural and possessive: the apostrophe follows the plural -s.',
    distractorNotes: {
      B: 'Singular possessive, which contradicts "three".',
      C: 'Plural but not possessive, leaving "three naturalists notebooks".',
      D: 'A regular plural already ending in -s does not take an extra -s after the apostrophe.',
    },
  },
  {
    id: 'rw_fs_105', section: 'rw', domain: 'standard-english-conventions', skill: 'form-structure-sense',
    format: 'mcq', band: 'easy', irt: { a: 1.04, b: -0.75 }, targetSeconds: 45,
    stimulus: { text: 'In 1887, after two years of measurements in a basement in Cleveland, Michelson and Morley ______ no difference in the speed of light along the two arms of their interferometer.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'found' },
      { id: 'B', text: 'find' },
      { id: 'C', text: 'have found' },
      { id: 'D', text: 'will have found' },
    ],
    answer: 'A',
    explanation: 'The sentence fixes a completed past date, "In 1887", so the verb takes the simple past.',
    distractorNotes: {
      B: 'Present tense against an explicit past date.',
      C: 'The present perfect connects an action to the present and cannot take a fixed past date.',
      D: 'Future perfect, which places the event ahead of now.',
    },
  },

  /* ============ Form, structure, and sense: medium ============ */
  {
    id: 'rw_fs_106', section: 'rw', domain: 'standard-english-conventions', skill: 'form-structure-sense',
    format: 'mcq', band: 'medium', irt: { a: 1.2, b: 0.08 }, targetSeconds: 52,
    stimulus: { text: 'Kalinga is one of the few languages in the region that ______ a distinct verb form for information the speaker has not personally witnessed.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'retain' },
      { id: 'B', text: 'retains' },
      { id: 'C', text: 'is retaining' },
      { id: 'D', text: 'has retained' },
    ],
    answer: 'A',
    explanation: 'In "one of the few languages that…", the relative pronoun refers to "languages", the group being described, not to "one". The verb inside the relative clause is therefore plural.',
    distractorNotes: {
      B: 'Agrees with "one", which is not what "that" refers to here — the clause describes the few languages, and Kalinga is one of them.',
      C: 'Singular and also makes a standing property sound temporary.',
      D: 'Singular, and the present perfect suggests a recent change rather than a stable feature.',
    },
  },
  {
    id: 'rw_fs_107', section: 'rw', domain: 'standard-english-conventions', skill: 'form-structure-sense',
    format: 'mcq', band: 'medium', irt: { a: 1.22, b: 0.15 }, targetSeconds: 52,
    stimulus: { text: 'Having spent four winters recording wolf howls in the Białowieża Forest, ______' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'the biologist could identify individual animals by ear.' },
      { id: 'B', text: 'individual animals could be identified by ear.' },
      { id: 'C', text: 'it became possible to identify individual animals by ear.' },
      { id: 'D', text: 'identifying individual animals by ear became possible.' },
    ],
    answer: 'A',
    explanation: 'An opening participial phrase modifies the noun that follows the comma. Only a person can have spent four winters recording howls, so the subject must name that person.',
    distractorNotes: {
      B: 'Makes the wolves the ones who spent four winters recording.',
      C: '"It" cannot spend four winters in a forest, so the modifier still dangles.',
      D: 'Makes "identifying individual animals" the thing that spent four winters recording.',
    },
  },
  {
    id: 'rw_fs_108', section: 'rw', domain: 'standard-english-conventions', skill: 'form-structure-sense',
    format: 'mcq', band: 'medium', irt: { a: 1.18, b: 0.2 }, targetSeconds: 52,
    stimulus: { text: 'The restoration team stabilised the foundations, replaced the corroded ties, and ______ the west facade stone by stone.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'rebuilt' },
      { id: 'B', text: 'rebuilding' },
      { id: 'C', text: 'had rebuilt' },
      { id: 'D', text: 'were rebuilding' },
    ],
    answer: 'A',
    explanation: 'The three items in the series share the subject "The restoration team", and the first two are simple past verbs. Parallel structure requires the third to take the same form.',
    distractorNotes: {
      B: 'A participle breaks the series of finite verbs.',
      C: 'Past perfect would place this action before the other two, which the sentence does not claim.',
      D: 'Shifts aspect mid-series without any reason in the sentence.',
    },
  },
  {
    id: 'rw_fs_109', section: 'rw', domain: 'standard-english-conventions', skill: 'form-structure-sense',
    format: 'mcq', band: 'medium', irt: { a: 1.2, b: 0.26 }, targetSeconds: 52,
    stimulus: { text: 'Behind the false wall of the chapel ______ a sealed staircase and a room the parish records never mention.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'were' },
      { id: 'B', text: 'was' },
      { id: 'C', text: 'is' },
      { id: 'D', text: 'has been' },
    ],
    answer: 'A',
    explanation: 'The sentence is inverted: the subject is the compound "a sealed staircase and a room", which is plural and follows the verb. A verb agrees with its subject wherever the subject sits.',
    distractorNotes: {
      B: 'Singular, agreeing with "chapel" or with "staircase" alone rather than with the compound subject.',
      C: 'Singular, and it also breaks the past-tense frame of the discovery.',
      D: 'Singular present perfect, wrong on both number and tense.',
    },
  },
  {
    id: 'rw_fs_110', section: 'rw', domain: 'standard-english-conventions', skill: 'form-structure-sense',
    format: 'mcq', band: 'medium', irt: { a: 1.24, b: 0.3 }, targetSeconds: 52,
    stimulus: { text: 'The editors asked that every contributor ______ a short statement of method with the manuscript.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'submit' },
      { id: 'B', text: 'submits' },
      { id: 'C', text: 'submitted' },
      { id: 'D', text: 'is submitting' },
    ],
    answer: 'A',
    explanation: 'A "that" clause after a verb of requesting takes the subjunctive, which is the bare form of the verb regardless of the subject’s number.',
    distractorNotes: {
      B: 'The ordinary present-tense form, which reports a fact rather than a requirement.',
      C: 'Past tense, which turns the request into a report of what contributors did.',
      D: 'Present progressive, which describes an action under way rather than one being required.',
    },
  },
  {
    id: 'rw_fs_111', section: 'rw', domain: 'standard-english-conventions', skill: 'form-structure-sense',
    format: 'mcq', band: 'medium', irt: { a: 1.16, b: 0.36 }, targetSeconds: 52,
    stimulus: { text: 'Neither the two field assistants nor the principal investigator ______ the specimen numbers into the second notebook before the flood.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'had copied' },
      { id: 'B', text: 'have copied' },
      { id: 'C', text: 'were copying' },
      { id: 'D', text: 'copy' },
    ],
    answer: 'A',
    explanation: 'With "neither…nor", the verb agrees with the nearer subject, the singular "principal investigator"; "before the flood" places the action before a past event, so the past perfect is right.',
    distractorNotes: {
      B: 'Plural, agreeing with "assistants" rather than with the nearer subject.',
      C: 'Plural, and progressive aspect does not express completion before a past point.',
      D: 'Present tense against a past frame.',
    },
  },

  /* ============ Form, structure, and sense: hard ============ */
  {
    id: 'rw_fs_112', section: 'rw', domain: 'standard-english-conventions', skill: 'form-structure-sense',
    format: 'mcq', band: 'hard', irt: { a: 1.34, b: 1.05 }, targetSeconds: 58,
    stimulus: { text: 'When the auditors finally opened the ledger in 1931, they realised that the bank ______ the same collateral to four different lenders over the preceding decade.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'had pledged' },
      { id: 'B', text: 'pledged' },
      { id: 'C', text: 'has pledged' },
      { id: 'D', text: 'would pledge' },
    ],
    answer: 'A',
    explanation: 'Opening the ledger in 1931 fixes the past reference point, and the pledging happened "over the preceding decade", before it. An action completed before a past point takes the past perfect.',
    distractorNotes: {
      B: 'Simple past puts the pledging alongside the audit rather than before it, losing the sequence "preceding decade" requires.',
      C: 'Present perfect ties the action to now, not to 1931.',
      D: '"Would pledge" places the action after the audit.',
    },
  },
  {
    id: 'rw_fs_113', section: 'rw', domain: 'standard-english-conventions', skill: 'form-structure-sense',
    format: 'mcq', band: 'hard', irt: { a: 1.3, b: 1.15 }, targetSeconds: 58,
    stimulus: { text: 'The steering committee, along with the two subcommittees that drafted the original proposals, ______ scheduled to review the revised text in October.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'is' },
      { id: 'B', text: 'are' },
      { id: 'C', text: 'have been' },
      { id: 'D', text: 'were' },
    ],
    answer: 'A',
    explanation: '"Along with" introduces a supplement, not a second subject. Unlike "and", it does not make the subject compound, so the verb agrees with the singular "committee".',
    distractorNotes: {
      B: 'Treats "along with the two subcommittees" as though it were "and the two subcommittees".',
      C: 'Plural, and the present perfect clashes with a review still to come in October.',
      D: 'Plural and past, against a future arrangement.',
    },
  },
  {
    id: 'rw_fs_114', section: 'rw', domain: 'standard-english-conventions', skill: 'form-structure-sense',
    format: 'mcq', band: 'hard', irt: { a: 1.32, b: 1.25 }, targetSeconds: 58,
    stimulus: { text: 'The success of the second trial depended less on the new compound than on ______ the dosing schedule to the patients’ own sleep cycles, a change the first trial had not attempted.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'matching' },
      { id: 'B', text: 'matched' },
      { id: 'C', text: 'they matched' },
      { id: 'D', text: 'to match' },
    ],
    answer: 'A',
    explanation: 'The comparison is "less on X than on Y", and X is the noun phrase "the new compound". Y must also be a noun phrase after "on", which makes the gerund the only fitting form.',
    distractorNotes: {
      B: 'A past participle cannot serve as the object of the preposition "on" here.',
      C: 'A finite clause cannot follow "on" in this construction, and it breaks the parallel with "the new compound".',
      D: 'An infinitive cannot be the object of "on".',
    },
  },
  {
    id: 'rw_fs_115', section: 'rw', domain: 'standard-english-conventions', skill: 'form-structure-sense',
    format: 'mcq', band: 'hard', irt: { a: 1.28, b: 1.35 }, targetSeconds: 58,
    stimulus: { text: 'If the census of 1841 ______ the same questions as the census of 1851, historians would be able to compare the two directly instead of reconstructing the earlier figures from parish returns.' },
    prompt: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      { id: 'A', text: 'had asked' },
      { id: 'B', text: 'asked' },
      { id: 'C', text: 'would ask' },
      { id: 'D', text: 'has asked' },
    ],
    answer: 'A',
    explanation: 'The sentence imagines a past that did not happen, so the "if" clause takes the past perfect. The main clause is in the present because the consequence — comparing them now — belongs to the present.',
    distractorNotes: {
      B: 'The simple past would state a fact about 1841, and the sentence is counterfactual.',
      C: '"Would" belongs in the consequence clause, not in the "if" clause.',
      D: 'Present perfect cannot express a condition contrary to past fact.',
    },
  },

  /* ============ Words in context: easy ============ */
  {
    id: 'rw_wc_101', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'easy', irt: { a: 1.02, b: -1.15 }, targetSeconds: 48,
    stimulus: { text: 'Plastic fragments smaller than five millimetres are now ______ in the ocean: they have been recovered from Arctic sea ice, from the deepest trench yet sampled, and from the guts of animals on every continental shelf.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'ubiquitous' },
      { id: 'B', text: 'conspicuous' },
      { id: 'C', text: 'hazardous' },
      { id: 'D', text: 'abundant' },
    ],
    answer: 'A',
    explanation: 'The colon lists places at the extremes of the ocean, so the word must mean present everywhere. That is what "ubiquitous" says.',
    distractorNotes: {
      B: 'Means easy to notice; fragments under five millimetres are the opposite, and the list is about range, not visibility.',
      C: 'Means dangerous, a claim the list of locations does not make.',
      D: 'Means present in large quantity, which is about how many, not about how widely spread.',
    },
  },
  {
    id: 'rw_wc_102', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'easy', irt: { a: 1.0, b: -1.05 }, targetSeconds: 48,
    stimulus: { text: 'The dating is ______: it rests on a single radiocarbon sample, and the team has said it will revise the figure once the remaining charcoal is processed.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'provisional' },
      { id: 'B', text: 'erroneous' },
      { id: 'C', text: 'obsolete' },
      { id: 'D', text: 'arbitrary' },
    ],
    answer: 'A',
    explanation: 'The date is being used now but is expected to be revised. A figure held only until better evidence arrives is provisional.',
    distractorNotes: {
      B: 'Means already wrong, which is stronger than the text says — the team expects revision, not error.',
      C: 'Means superseded, but nothing has replaced this date yet.',
      D: 'Means chosen without reason, and the date rests on a radiocarbon sample.',
    },
  },
  {
    id: 'rw_wc_103', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'easy', irt: { a: 1.04, b: -0.95 }, targetSeconds: 48,
    stimulus: { text: 'Ellen Ochoa’s notebooks are ______: each entry gives the time to the second, the instrument setting, and the ambient temperature, even for runs that were later discarded.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'meticulous' },
      { id: 'B', text: 'voluminous' },
      { id: 'C', text: 'legible' },
      { id: 'D', text: 'candid' },
    ],
    answer: 'A',
    explanation: 'The colon describes care with small details recorded even when they turned out not to matter. "Meticulous" names exactly that care.',
    distractorNotes: {
      B: 'Means large in bulk; the evidence is about precision per entry, not total length.',
      C: 'Means readable, and nothing in the sentence concerns handwriting.',
      D: 'Means frank, which would need evidence about what she was willing to admit.',
    },
  },
  {
    id: 'rw_wc_104', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'easy', irt: { a: 1.06, b: -0.85 }, targetSeconds: 48,
    stimulus: { text: 'The new berthing fee did not end cruise traffic in the harbour, but it did ______ it: arrivals fell by about a third in the first season.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'curtail' },
      { id: 'B', text: 'eliminate' },
      { id: 'C', text: 'transform' },
      { id: 'D', text: 'obscure' },
    ],
    answer: 'A',
    explanation: 'The sentence contrasts ending traffic with what the fee actually did: cut it substantially but not entirely. "Curtail" is reduction short of elimination.',
    distractorNotes: {
      B: 'Means end completely, which the first half of the sentence explicitly rules out.',
      C: 'Means change in kind; the evidence is a change in quantity.',
      D: 'Means hide from view, and the arrivals are being counted, not concealed.',
    },
  },
  {
    id: 'rw_wc_105', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'easy', irt: { a: 1.0, b: -0.75 }, targetSeconds: 48,
    stimulus: { text: 'Because the canyon walls are near-vertical and the rock is dense, they ______ any sound made on the river: a spoken word carries to the far bend.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'amplify' },
      { id: 'B', text: 'distort' },
      { id: 'C', text: 'absorb' },
      { id: 'D', text: 'imitate' },
    ],
    answer: 'A',
    explanation: 'The example shows a quiet sound reaching a great distance, so the walls make sound stronger. "Amplify" is the word for increasing it.',
    distractorNotes: {
      B: 'Means change the character of the sound, and the example is about how far it carries.',
      C: 'Means take the sound in and damp it, the opposite of what the example shows.',
      D: 'Means reproduce, which would describe an echo of a different kind than the sentence gives.',
    },
  },
  {
    id: 'rw_wc_106', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'easy', irt: { a: 1.02, b: -0.7 }, targetSeconds: 48,
    stimulus: { text: 'The moth’s markings are ______ to a bird but unmistakable to another moth, whose eyes register the ultraviolet band in which the pattern is written.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'invisible' },
      { id: 'B', text: 'unappealing' },
      { id: 'C', text: 'familiar' },
      { id: 'D', text: 'threatening' },
    ],
    answer: 'A',
    explanation: '"Unmistakable" to the moth is set against the bird, and the reason given is that the pattern sits in a band only the moth can see. The contrast is about being seen at all.',
    distractorNotes: {
      B: 'Concerns preference, not perception, and birds are not choosing here.',
      C: 'Would make the bird able to see the markings, which the ultraviolet explanation rules out.',
      D: 'Would also require the bird to see them.',
    },
  },

  /* ============ Words in context: medium ============ */
  {
    id: 'rw_wc_107', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'medium', irt: { a: 1.2, b: 0.05 }, targetSeconds: 55,
    stimulus: { text: 'The first portable computers deserved the adjective only in a legal sense: at eleven kilograms, with a handle riveted to a steel case, the machine was ______ enough that most owners moved it twice and then left it where it stood.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'unwieldy' },
      { id: 'B', text: 'fragile' },
      { id: 'C', text: 'obsolete' },
      { id: 'D', text: 'expensive' },
    ],
    answer: 'A',
    explanation: 'Weight and an awkward steel case are reasons a thing is hard to move, and the consequence given is that owners stopped moving it. "Unwieldy" names difficulty of handling.',
    distractorNotes: {
      B: 'A steel case argues against fragility, and fragility is not what stops someone lifting a machine.',
      C: 'Means out of date; the evidence given is physical, not chronological.',
      D: 'Cost would not explain why the machine stayed where it stood.',
    },
  },
  {
    id: 'rw_wc_108', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'medium', irt: { a: 1.22, b: 0.12 }, targetSeconds: 55,
    stimulus: { text: 'Wegener died three decades before the seafloor-spreading data arrived, so he never saw the evidence that would ______ the hypothesis his contemporaries had dismissed as fantasy.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'vindicate' },
      { id: 'B', text: 'complicate' },
      { id: 'C', text: 'popularise' },
      { id: 'D', text: 'supersede' },
    ],
    answer: 'A',
    explanation: 'The hypothesis had been dismissed, and the later evidence shows it was right after all. "Vindicate" is to justify a claim against the criticism it received.',
    distractorNotes: {
      B: 'Means make more difficult, which does not answer a charge of fantasy.',
      C: 'Concerns how widely the idea was liked, not whether it was shown to be correct.',
      D: 'Means replace, which would make the evidence displace his hypothesis rather than support it.',
    },
  },
  {
    id: 'rw_wc_109', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'medium', irt: { a: 1.24, b: 0.2 }, targetSeconds: 55,
    stimulus: { text: 'Each layer of sediment ______ the signal a little further, so a marker that is sharp at two metres is barely detectable at ten and gone by twenty.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'attenuates' },
      { id: 'B', text: 'obliterates' },
      { id: 'C', text: 'distorts' },
      { id: 'D', text: 'conceals' },
    ],
    answer: 'A',
    explanation: 'The signal weakens by degrees with depth rather than disappearing at once. "Attenuate" is exactly gradual weakening.',
    distractorNotes: {
      B: 'Means destroy completely, which each single layer does not do — the loss is cumulative.',
      C: 'Means change the shape of the signal; the sentence describes loss of strength.',
      D: 'Means hide something still intact, and the marker is genuinely being lost.',
    },
  },
  {
    id: 'rw_wc_110', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'medium', irt: { a: 1.18, b: 0.28 }, targetSeconds: 55,
    stimulus: { text: 'The stated purpose of the expedition was botanical collection, but its ______ aim, recorded only in the sponsor’s private correspondence, was to chart a harbour for a naval station.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'actual' },
      { id: 'B', text: 'ostensible' },
      { id: 'C', text: 'incidental' },
      { id: 'D', text: 'ultimate' },
    ],
    answer: 'A',
    explanation: 'The sentence sets the "stated purpose" against a hidden one found in private letters. The blank must name the real aim behind the stated one.',
    distractorNotes: {
      B: 'Means apparent or professed — that is what "stated purpose" already covers, so this reverses the contrast.',
      C: 'Means arising by chance alongside, but charting the harbour was the point of the voyage.',
      D: 'Names the last aim in a sequence, not the concealed one the contrast calls for.',
    },
  },
  {
    id: 'rw_wc_111', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'medium', irt: { a: 1.2, b: 0.34 }, targetSeconds: 55,
    stimulus: { text: 'Within twenty years the mechanical loom had ______ the handloom in the region’s cotton trade: by 1841 the census records fewer than three hundred handloom weavers where there had been eleven thousand.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'supplanted' },
      { id: 'B', text: 'surpassed' },
      { id: 'C', text: 'supplemented' },
      { id: 'D', text: 'anticipated' },
    ],
    answer: 'A',
    explanation: 'The handloom did not merely fall behind; it was driven out, from eleven thousand weavers to three hundred. "Supplant" is to take the place of something, displacing it.',
    distractorNotes: {
      B: 'Means merely to exceed, which would leave the handloom in business behind it.',
      C: 'Means to add to, and the census shows replacement rather than addition.',
      D: 'Means to come before or foresee, which reverses the order of events.',
    },
  },
  {
    id: 'rw_wc_112', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'medium', irt: { a: 1.22, b: 0.4 }, targetSeconds: 55,
    stimulus: { text: 'The two accounts of the meeting are hard to ______: one has the treaty signed before the delegation arrived, the other has the delegation drafting it.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'reconcile' },
      { id: 'B', text: 'authenticate' },
      { id: 'C', text: 'summarise' },
      { id: 'D', text: 'translate' },
    ],
    answer: 'A',
    explanation: 'The colon gives two accounts that cannot both be true. The difficulty is in making them fit together, which is what "reconcile" names.',
    distractorNotes: {
      B: 'Concerns whether each document is genuine, a separate question from their disagreeing.',
      C: 'Nothing in the evidence makes either account hard to summarise.',
      D: 'No language barrier is mentioned.',
    },
  },

  /* ============ Words in context: hard ============ */
  {
    id: 'rw_wc_113', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'hard', irt: { a: 1.34, b: 1.0 }, targetSeconds: 62,
    stimulus: { text: 'The trial’s result was ______ rather than negative: the confidence interval was wide enough to contain both a clinically useful benefit and no benefit at all, so it licensed neither conclusion.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'equivocal' },
      { id: 'B', text: 'preliminary' },
      { id: 'C', text: 'anomalous' },
      { id: 'D', text: 'negligible' },
    ],
    answer: 'A',
    explanation: 'An interval consistent with two opposite readings supports neither. "Equivocal" is precisely a result open to more than one interpretation.',
    distractorNotes: {
      B: 'Concerns the stage of the work; a preliminary result can still point one way, and this one points both.',
      C: 'Means departing from the expected pattern, which the sentence does not claim.',
      D: 'Means so small as not to matter, which would be a negative result — the reading the sentence rules out.',
    },
  },
  {
    id: 'rw_wc_114', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'hard', irt: { a: 1.3, b: 1.12 }, targetSeconds: 62,
    stimulus: { text: 'Rapid promotion on the strength of a single metric is ______ to the long apprenticeship the craft requires: the people who would have taught the next generation are moved out of the workshop before they have finished learning it themselves.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'inimical' },
      { id: 'B', text: 'indifferent' },
      { id: 'C', text: 'incidental' },
      { id: 'D', text: 'analogous' },
    ],
    answer: 'A',
    explanation: 'The colon shows the promotion practice actively destroying the apprenticeship, not merely coexisting with it. "Inimical to" means harmful or hostile to.',
    distractorNotes: {
      B: 'Means unconcerned with, which is too weak: the practice does damage, not nothing.',
      C: 'Means minor or incidental to, which again drops the harm the colon documents.',
      D: 'Means similar to, and the two are set in opposition.',
    },
  },
  {
    id: 'rw_wc_115', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'hard', irt: { a: 1.36, b: 1.22 }, targetSeconds: 62,
    stimulus: { text: 'The ease of Bishop’s finished lines ______ the labour behind them: the drafts show one poem revised over sixteen years, with a single stanza rewritten more than forty times.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'belies' },
      { id: 'B', text: 'reveals' },
      { id: 'C', text: 'justifies' },
      { id: 'D', text: 'exceeds' },
    ],
    answer: 'A',
    explanation: 'The finished poems look effortless while the drafts record enormous effort, so the surface gives a false impression of what lies beneath. "Belie" is to misrepresent in exactly that way.',
    distractorNotes: {
      B: 'Reverses the relation: the ease conceals the labour, and only the drafts reveal it.',
      C: 'Would make the ease a reason for the labour rather than a disguise of it.',
      D: 'Compares two quantities, and the sentence contrasts an appearance with a fact.',
    },
  },
  {
    id: 'rw_wc_116', section: 'rw', domain: 'craft-structure', skill: 'words-in-context',
    format: 'mcq', band: 'hard', irt: { a: 1.32, b: 1.3 }, targetSeconds: 62,
    stimulus: { text: 'The new assay ______ the need for a second blood draw: a single sample now yields both the antibody titre and the viral load that previously required separate visits.' },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'obviates' },
      { id: 'B', text: 'alleviates' },
      { id: 'C', text: 'complicates' },
      { id: 'D', text: 'postpones' },
    ],
    answer: 'A',
    explanation: 'One sample now does the work of two visits, so the second draw is not merely easier but unnecessary. "Obviate" is to make a requirement unnecessary.',
    distractorNotes: {
      B: 'Means to lessen the severity of something that remains, but the second draw is gone entirely.',
      C: 'Means make harder, the opposite of what the colon reports.',
      D: 'Means delay, which would leave the second draw still to come.',
    },
  },
];
