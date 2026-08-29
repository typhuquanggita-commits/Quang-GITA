/**
 * Reading and Writing item bank — Craft and Structure.
 */

import type { Question } from '../types.ts';

export const RW_BANK_2: Question[] = [
  /* ---------- Words in Context ---------- */
  {
    id: 'rw_wc_001',
    section: 'rw',
    domain: 'craft-structure',
    skill: 'words-in-context',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.0, b: -1.0 },
    targetSeconds: 55,
    stimulus: {
      text: 'Choreographer Bill T. Jones rarely settles on a movement phrase in a single session. He will set a sequence on his dancers, watch it, then ______ it over weeks — trimming a gesture here, extending a pause there — until the phrase carries the weight he intends.',
    },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'refine' },
      { id: 'B', text: 'abandon' },
      { id: 'C', text: 'transcribe' },
      { id: 'D', text: 'rehearse' },
    ],
    answer: 'A',
    explanation:
      'The dashes define the word for you: "trimming a gesture here, extending a pause there" is a description of small improving adjustments, which is exactly what "refine" means.',
    distractorNotes: {
      B: 'He continues working on the phrase rather than giving it up.',
      C: 'Transcribing is recording something as it stands, which involves no change.',
      D: 'Rehearsing is repeating for performance; the passage stresses altering the material, not practising it.',
    },
  },
  {
    id: 'rw_wc_002',
    section: 'rw',
    domain: 'craft-structure',
    skill: 'words-in-context',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.15 },
    targetSeconds: 60,
    stimulus: {
      text: 'For decades the fossil record of early birds was so sparse that any new specimen could overturn the consensus. The discovery of hundreds of feathered dinosaur fossils in Liaoning Province has made the field far more ______: a single find now rarely changes the overall picture, because it must be weighed against a large body of comparable evidence.',
    },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'contentious' },
      { id: 'B', text: 'robust' },
      { id: 'C', text: 'obscure' },
      { id: 'D', text: 'speculative' },
    ],
    answer: 'B',
    explanation:
      'The colon explains the blank: a single find "rarely changes the overall picture" because there is now a large body of evidence. A field that resists being overturned by one datum is robust.',
    distractorNotes: {
      A: 'Contentious means marked by dispute; the passage describes stabilised consensus, not more argument.',
      C: 'Hundreds of new fossils make the field better documented, not more obscure.',
      D: 'Speculative describes the earlier state, when any specimen could overturn the consensus.',
    },
  },
  {
    id: 'rw_wc_003',
    section: 'rw',
    domain: 'craft-structure',
    skill: 'words-in-context',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.3, b: 1.25 },
    targetSeconds: 65,
    stimulus: {
      text: 'Critics initially read Zora Neale Hurston\'s use of dialect as a concession to a white readership\'s appetite for local colour. Later scholarship has largely ______ that assessment, arguing that Hurston\'s transcriptions were the product of rigorous ethnographic fieldwork and were designed to assert, not to entertain.',
    },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'corroborated' },
      { id: 'B', text: 'reiterated' },
      { id: 'C', text: 'supplanted' },
      { id: 'D', text: 'anticipated' },
    ],
    answer: 'C',
    explanation:
      'Later scholarship argues the opposite of the initial reading, so the verb must express replacement. "Supplanted" — displaced and took the place of — fits; the "not to entertain" at the end confirms the reversal.',
    distractorNotes: {
      A: 'Corroborated means confirmed, the reverse of what the second sentence does.',
      B: 'Reiterated means repeated, which again preserves rather than overturns the earlier claim.',
      D: 'Anticipated would place the later scholarship before the initial reading, contradicting "initially" and "later."',
    },
  },
  {
    id: 'rw_wc_004',
    section: 'rw',
    domain: 'craft-structure',
    skill: 'words-in-context',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.1, b: -0.2 },
    targetSeconds: 60,
    stimulus: {
      text: 'The city\'s new flood plan is notably ______: rather than proposing a single seawall, it layers marsh restoration, permeable pavement, elevated roadbeds, and revised zoning, on the reasoning that no one measure will hold under every storm.',
    },
    prompt: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: [
      { id: 'A', text: 'multifaceted' },
      { id: 'B', text: 'provisional' },
      { id: 'C', text: 'economical' },
      { id: 'D', text: 'conventional' },
    ],
    answer: 'A',
    explanation:
      'The colon lists four distinct measures deployed together instead of one. A plan built from many coordinated parts is multifaceted.',
    distractorNotes: {
      B: 'Nothing suggests the plan is temporary or pending replacement.',
      C: 'Cost is never mentioned, and layering four systems does not read as economical.',
      D: 'The plan is contrasted with the conventional single seawall.',
    },
  },

  /* ---------- Text Structure and Purpose ---------- */
  {
    id: 'rw_ts_001',
    section: 'rw',
    domain: 'craft-structure',
    skill: 'text-structure-purpose',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.0 },
    targetSeconds: 75,
    stimulus: {
      text: 'It is often said that the printing press caused the Reformation. The claim has an obvious appeal: Luther\'s theses spread across Germany in weeks, a speed unthinkable a century earlier. But presses had been operating in Europe for sixty years before 1517 without producing any comparable upheaval, and they were operating in Spain and Italy throughout the Reformation without producing one there. The press was the channel. It was not the current.',
    },
    prompt: 'Which choice best describes the overall structure of the text?',
    choices: [
      { id: 'A', text: 'It presents a widely held claim, concedes its appeal, supplies evidence limiting it, and then restates the claim in narrower terms.' },
      { id: 'B', text: 'It describes a historical event and then traces its consequences across several countries.' },
      { id: 'C', text: 'It compares two competing explanations and concludes that the evidence favours neither.' },
      { id: 'D', text: 'It defines a technical term and then illustrates the term with an extended example.' },
    ],
    answer: 'A',
    explanation:
      'Follow the moves: claim ("the press caused the Reformation"), concession ("has an obvious appeal"), counter-evidence (sixty prior years; Spain and Italy), and a narrowed restatement ("the channel… not the current"). That is A exactly.',
    distractorNotes: {
      B: 'The passage argues about causation; it does not narrate consequences.',
      C: 'Only one explanation is on the table, and the passage does reach a conclusion about it.',
      D: 'No term is defined.',
    },
  },
  {
    id: 'rw_ts_002',
    section: 'rw',
    domain: 'craft-structure',
    skill: 'text-structure-purpose',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.25, b: 1.1 },
    targetSeconds: 80,
    stimulus: {
      text: 'The following is adapted from a novel. Miriam has returned to the house where she grew up, now sold and emptied.\n\nShe had expected the rooms to be smaller. Everyone said so — that the house of childhood shrinks when you come back to it as an adult. But the hallway ran on exactly as far as it always had, and the kitchen ceiling stayed as high above her as ever. It was not the house that had failed to change.',
    },
    prompt: 'Which choice best describes the function of the last sentence in the text as a whole?',
    choices: [
      { id: 'A', text: 'It redirects the passage from the physical dimensions of the house toward a realisation about Miriam herself.' },
      { id: 'B', text: 'It confirms the common observation Miriam had heard about returning to a childhood home.' },
      { id: 'C', text: 'It introduces a factual dispute about the actual measurements of the rooms.' },
      { id: 'D', text: 'It explains why the house was sold and emptied before Miriam\'s return.' },
    ],
    answer: 'A',
    explanation:
      'The passage builds an expectation about the house shrinking, then refutes it with measurements that held. The final sentence turns the negative — if the house did not fail to change, something else did, and the only other subject present is Miriam.',
    distractorNotes: {
      B: 'It overturns that observation; the hallway and ceiling were unchanged.',
      C: 'The measurements are settled in the passage, not disputed.',
      D: 'The sale is background given before the excerpt begins and is never explained.',
    },
  },

  /* ---------- Cross-Text Connections ---------- */
  {
    id: 'rw_ct_001',
    section: 'rw',
    domain: 'craft-structure',
    skill: 'cross-text-connections',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.2, b: 0.35 },
    targetSeconds: 95,
    stimulus: {
      text: 'Text 1\nUrban rewilding projects — letting mown parkland revert to meadow and scrub — have been promoted mainly as a way to raise insect abundance. Surveys of converted parks in three European cities do show substantial gains in pollinator counts within two seasons, and those gains persist.\n\nText 2\nRewilding advocates cite pollinator counts, but abundance is the easier metric, not the more meaningful one. In the same converted parks, the added individuals belong overwhelmingly to a handful of generalist species already common in the surrounding city. The specialists whose decline drove the concern in the first place have not returned.',
    },
    prompt:
      'Based on the texts, how would the author of Text 2 most likely respond to the evidence presented in Text 1?',
    choices: [
      { id: 'A', text: 'By arguing that the surveys reported gains that later reversed once the meadows matured.' },
      { id: 'B', text: 'By accepting that pollinator counts rose while denying that this shows the projects met the concern that motivated them.' },
      { id: 'C', text: 'By claiming that the three cities studied are unrepresentative of European urban parkland generally.' },
      { id: 'D', text: 'By proposing that mown parkland supports specialist pollinators better than meadow does.' },
    ],
    answer: 'B',
    explanation:
      'Text 2 does not dispute the counts — it says "the added individuals" are generalists. It disputes what the counts mean, since the specialists "whose decline drove the concern" are absent. That is agreement on the data with disagreement about its significance.',
    distractorNotes: {
      A: 'Text 1 states the gains persist and Text 2 never contests that.',
      C: 'Text 2 works from "the same converted parks," so it accepts rather than challenges the sample.',
      D: 'Text 2 argues meadow conversion is insufficient, not that mowing is superior.',
    },
  },
  {
    id: 'rw_ct_002',
    section: 'rw',
    domain: 'craft-structure',
    skill: 'cross-text-connections',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.3, b: 1.3 },
    targetSeconds: 100,
    stimulus: {
      text: 'Text 1\nThe conservator\'s first obligation is to the object as it survives. A painting that has darkened over three centuries has acquired that darkening as part of its history; stripping the varnish to recover the original palette destroys evidence that can never be replaced, in pursuit of a state no living person has seen.\n\nText 2\nEvery decision in conservation is an intervention, including the decision to do nothing. Aged varnish is not neutral history — it is a coating applied by a previous restorer, itself an alteration, and one that continues to yellow. To leave it is not to preserve the object as the artist made it; it is to preserve someone else\'s edit.',
    },
    prompt: 'Which choice best describes the disagreement between the two texts?',
    choices: [
      { id: 'A', text: 'They disagree about whether removing varnish is technically possible without damaging the paint beneath.' },
      { id: 'B', text: 'They disagree about whether leaving an aged surface untouched constitutes preserving the object or merely preserving a prior alteration.' },
      { id: 'C', text: 'They disagree about whether the original palette of a three-century-old painting can be determined at all.' },
      { id: 'D', text: 'They disagree about whether conservators should be permitted to work on paintings of significant historical value.' },
    ],
    answer: 'B',
    explanation:
      'Text 1 treats the darkened surface as accumulated history worth protecting. Text 2 reclassifies that surface as a previous restorer\'s coating, so non-intervention preserves an edit rather than the object. The dispute is over what the aged surface is.',
    distractorNotes: {
      A: 'Neither text raises technical feasibility.',
      C: 'Text 1 concedes the original palette could be recovered — that is precisely its objection.',
      D: 'Both texts assume conservators work on such paintings; they argue about how.',
    },
  },
];
