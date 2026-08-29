/**
 * Reading and Writing item bank — Information and Ideas, Craft and Structure.
 *
 * Passages are original, written to Digital SAT specification: 25–150 words,
 * single paragraph, drawn from literature, history/social studies, humanities,
 * and science in roughly equal measure.
 *
 * IRT parameters are provisional values assigned by the item author from the
 * difficulty band and reviewed against pilot data. See docs/PSYCHOMETRICS.md
 * for the calibration procedure a production bank must follow.
 */

import type { Question } from '../types.ts';

export const RW_BANK_1: Question[] = [
  /* ---------- Central Ideas and Details ---------- */
  {
    id: 'rw_ci_001',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.05, b: -1.1 },
    targetSeconds: 65,
    stimulus: {
      text: 'When the Hubble Space Telescope pointed at what astronomers believed was an empty patch of sky in 1995, it collected light for ten consecutive days. The resulting image, the Hubble Deep Field, was not empty at all: it held roughly three thousand galaxies, most of them never before catalogued. The observation cost telescope time that many researchers had argued would be wasted, and it reshaped estimates of how many galaxies the observable universe contains.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'A telescope observation that many researchers considered wasteful instead revealed thousands of unknown galaxies.' },
      { id: 'B', text: 'The Hubble Space Telescope required ten days of continuous operation to produce any usable image.' },
      { id: 'C', text: 'Astronomers in 1995 had catalogued nearly every galaxy in the observable universe.' },
      { id: 'D', text: 'Telescope time is allocated through a competitive process that favours established researchers.' },
    ],
    answer: 'A',
    explanation:
      'The text sets up a contrast: researchers argued the time would be wasted, yet the image "held roughly three thousand galaxies, most of them never before catalogued" and "reshaped estimates." Choice A captures both halves of that contrast, which is what a main-idea answer must do.',
    distractorNotes: {
      B: 'The ten-day exposure is a supporting detail, not the point the passage is organised around.',
      C: 'The passage says the opposite — most of the galaxies had never been catalogued.',
      D: 'Allocation of telescope time is alluded to but never explained; this is outside the text.',
    },
  },
  {
    id: 'rw_ci_002',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.05 },
    targetSeconds: 75,
    stimulus: {
      text: 'Archaeologist Sarah Parcak uses satellite imagery to locate buried structures invisible from ground level. Subsurface walls alter the moisture content of the soil above them, and that difference registers in infrared bands that the human eye cannot perceive. Parcak\'s teams then excavate only the flagged coordinates. The method does not replace the trowel; it decides where the trowel goes, and in doing so it turns a survey that once took a decade into one that takes a season.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'Satellite imagery has made traditional excavation techniques obsolete in modern archaeology.' },
      { id: 'B', text: 'Infrared sensors detect moisture differences that are invisible to the human eye.' },
      { id: 'C', text: 'Satellite survey does not replace excavation but directs it, sharply reducing how long a survey takes.' },
      { id: 'D', text: 'Parcak\'s teams excavate a greater number of sites than earlier archaeologists could.' },
    ],
    answer: 'C',
    explanation:
      'The last sentence states the passage\'s claim outright: the method "does not replace the trowel; it decides where the trowel goes," compressing a decade into a season. C restates exactly that relationship.',
    distractorNotes: {
      A: 'Directly contradicted — the text insists the method does not replace excavation.',
      B: 'True and stated, but it is the mechanism supporting the idea, not the idea.',
      D: 'The passage claims faster surveys, not a larger number of excavated sites.',
    },
  },
  {
    id: 'rw_ci_003',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.3, b: 1.15 },
    targetSeconds: 85,
    stimulus: {
      text: 'Literary critic Saidiya Hartman confronts a problem intrinsic to archives of the transatlantic slave trade: the enslaved appear in them almost exclusively as entries in ledgers, described by the people who bought and sold them. To narrate such a life conventionally is to reproduce that framing. Hartman therefore developed what she calls critical fabulation, a method that combines archival research with speculative narration, marking its own uncertainty rather than smoothing it over. The aim is not to invent facts but to make legible the shape of what the record deliberately omitted.',
      source: 'Adapted from a discussion of contemporary historiographical method.',
    },
    prompt: 'Which choice best describes the main idea of the text?',
    choices: [
      { id: 'A', text: 'Hartman argues that archives of the slave trade contain more information than historians have recognised.' },
      { id: 'B', text: 'Hartman developed a method that acknowledges its own speculation in order to represent lives the archive records only through their oppressors.' },
      { id: 'C', text: 'Hartman rejects archival research in favour of fiction as a means of understanding the transatlantic slave trade.' },
      { id: 'D', text: 'Conventional historical narration is inappropriate for any subject whose documentary record is incomplete.' },
    ],
    answer: 'B',
    explanation:
      'The passage identifies a problem (the enslaved appear only as ledger entries framed by traders), then presents Hartman\'s response (critical fabulation, which "mark[s] its own uncertainty"). B holds both the problem and the response together.',
    distractorNotes: {
      A: 'The passage says the archive is impoverished and deliberately omissive, not richer than recognised.',
      C: 'Critical fabulation "combines archival research with speculative narration" — it does not reject the archive.',
      D: 'The passage makes a claim about this archive and its specific violence, not a universal rule about incomplete records.',
    },
  },

  /* ---------- Command of Evidence: Textual ---------- */
  {
    id: 'rw_ev_001',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'command-evidence-textual',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.2, b: 0.1 },
    targetSeconds: 80,
    stimulus: {
      text: 'Ecologists have long assumed that a forest\'s trees compete for light and nutrients as independent individuals. Researcher Suzanne Simard proposed instead that trees connected by underground fungal networks transfer carbon between one another, and that older trees preferentially support seedlings of their own species. A student wants to test whether the transfer Simard describes is directed rather than incidental diffusion.',
    },
    prompt:
      'Which finding, if true, would most directly support the claim that the transfer is directed rather than incidental?',
    choices: [
      { id: 'A', text: 'Carbon labelled in mature trees appears in nearby seedlings of the same species at higher rates than in equally close seedlings of other species.' },
      { id: 'B', text: 'Fungal networks are found in every forest type the researchers surveyed, across three continents.' },
      { id: 'C', text: 'Seedlings growing near mature trees are on average taller than seedlings growing in clearings.' },
      { id: 'D', text: 'Mature trees contain substantially more stored carbon than seedlings do.' },
    ],
    answer: 'A',
    explanation:
      'Incidental diffusion would not distinguish between recipients: it would reach same-species and other-species seedlings at similar rates given similar distance. A holds distance constant and finds a species-specific difference, which is precisely the signature of direction.',
    distractorNotes: {
      B: 'Establishes that networks are widespread, which says nothing about whether transfer through them is targeted.',
      C: 'Height near mature trees has many explanations — shelter, soil, water — so it cannot isolate directed transfer.',
      D: 'A concentration gradient would drive incidental diffusion, so this supports the rival explanation rather than Simard\'s.',
    },
  },
  {
    id: 'rw_ev_002',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'command-evidence-textual',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.25, b: 1.05 },
    targetSeconds: 90,
    stimulus: {
      text: 'In her 1861 narrative, Harriet Jacobs describes seven years spent concealed in a crawlspace above her grandmother\'s storeroom, a space too low to stand in. Scholars have debated how to read her account of that confinement. One reading treats the crawlspace primarily as an emblem of the powerlessness slavery imposed. A competing reading holds that Jacobs presents the space as something she chose and controlled — a deliberate act of resistance conducted from within captivity.',
    },
    prompt:
      'Which quotation from Jacobs\'s narrative, if authentic, would most directly support the second reading?',
    choices: [
      { id: 'A', text: '"The air was stifling; the darkness total. For weeks I could not turn my body without striking the beams above me."' },
      { id: 'B', text: '"I had my nook, and from it I watched him pass, and knew that so long as I remained there he could not find what he had lost."' },
      { id: 'C', text: '"My grandmother brought me food each night, and without her constancy I could not have survived a single season."' },
      { id: 'D', text: '"Others in my condition had fled north, and I often wondered whether their road had been the wiser one."' },
    ],
    answer: 'B',
    explanation:
      'The second reading requires evidence of agency and control. In B, Jacobs claims the space ("my nook"), observes her pursuer rather than merely hiding from him, and frames her staying as the thing that defeats him — resistance conducted from inside confinement.',
    distractorNotes: {
      A: 'Vivid evidence of suffering, which supports the first reading (powerlessness), not the second.',
      C: 'Establishes dependence on her grandmother — again closer to constraint than to chosen control.',
      D: 'Expresses doubt about her own decision, which weakens rather than supports a reading built on deliberate resistance.',
    },
  },

  /* ---------- Command of Evidence: Quantitative ---------- */
  {
    id: 'rw_eq_001',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'command-evidence-quantitative',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.1, b: -0.05 },
    targetSeconds: 85,
    stimulus: {
      text: 'A materials scientist tested four coating formulations for solar panel glass, measuring the percentage of incident light transmitted after 500 hours of simulated weathering. She concluded that adding silica improved durability but that the benefit levelled off past a moderate concentration.',
      table: {
        caption: 'Light transmission after 500 hours of simulated weathering',
        headers: ['Coating', 'Silica content (%)', 'Transmission retained (%)'],
        rows: [
          ['W', '0', '71'],
          ['X', '5', '84'],
          ['Y', '10', '91'],
          ['Z', '20', '92'],
        ],
      },
    },
    prompt: 'Which choice most effectively uses data from the table to support the scientist\'s conclusion?',
    choices: [
      { id: 'A', text: 'Transmission retained rose from 71% with no silica to 91% at 10% silica, but only to 92% when silica was doubled to 20%.' },
      { id: 'B', text: 'Coating Z retained the highest transmission of the four formulations tested, at 92%.' },
      { id: 'C', text: 'Coating W, which contained no silica, retained 71% of transmission after weathering.' },
      { id: 'D', text: 'Every coating containing silica retained more than 80% of transmission after weathering.' },
    ],
    answer: 'A',
    explanation:
      'The conclusion has two parts — silica helps, and the help levels off. A gives the large gain (71 to 91) and then the negligible gain from doubling the concentration (91 to 92), so it supports both parts at once.',
    distractorNotes: {
      B: 'Reports the maximum only; a reader could not tell from it that returns diminish.',
      C: 'Supplies the baseline but no comparison, so it supports neither half of the conclusion.',
      D: 'True of the table, but it establishes a floor rather than the shape of the trend.',
    },
  },
  {
    id: 'rw_eq_002',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'command-evidence-quantitative',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.2, b: 0.95 },
    targetSeconds: 90,
    stimulus: {
      text: 'Urban planners studied whether protected bicycle lanes change the share of short trips made by bicycle. They surveyed four districts before installation and again two years afterward. They hypothesised that the effect would be largest where the pre-existing share was lowest, because those districts had the most room to grow.',
      table: {
        caption: 'Share of trips under 3 km made by bicycle',
        headers: ['District', 'Before (%)', 'After (%)'],
        rows: [
          ['Northgate', '4', '13'],
          ['Riverside', '9', '19'],
          ['Old Town', '17', '24'],
          ['Hillcrest', '22', '26'],
        ],
      },
    },
    prompt: 'Which choice best describes data from the table that weaken the planners\' hypothesis?',
    choices: [
      { id: 'A', text: 'Northgate, with the lowest starting share at 4%, rose by 9 percentage points, while Riverside, starting higher at 9%, rose by more — 10 percentage points.' },
      { id: 'B', text: 'Hillcrest had both the highest starting share, 22%, and the highest ending share, 26%.' },
      { id: 'C', text: 'Every district surveyed showed an increase in the share of short trips made by bicycle.' },
      { id: 'D', text: 'Old Town\'s share rose from 17% to 24%, an increase of 7 percentage points.' },
    ],
    answer: 'A',
    explanation:
      'The hypothesis predicts that the lowest starting share yields the largest gain. Northgate had the lowest start yet gained 9 points, while Riverside started higher and gained 10 — an ordering the hypothesis forbids, so this weakens it.',
    distractorNotes: {
      B: 'Consistent with the hypothesis rather than against it: Hillcrest started highest and gained least (4 points).',
      C: 'The hypothesis is about the size of the gains, not whether gains occurred.',
      D: 'A single district in isolation cannot contradict a claim about how gains vary across districts.',
    },
  },

  /* ---------- Inferences ---------- */
  {
    id: 'rw_in_001',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'inferences',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.0, b: -0.85 },
    targetSeconds: 70,
    stimulus: {
      text: 'The Antikythera mechanism, recovered from a Roman-era shipwreck, contains at least thirty interlocking bronze gears cut to tolerances that would not be matched again in surviving European artifacts for well over a thousand years. No comparable device from antiquity has ever been found. Historians therefore suspect that the mechanism was ______',
    },
    prompt: 'Which choice most logically completes the text?',
    choices: [
      { id: 'A', text: 'the product of a tradition of precision gearing whose other output has not survived.' },
      { id: 'B', text: 'assembled from parts manufactured many centuries after the shipwreck occurred.' },
      { id: 'C', text: 'the only geared device ever constructed in the ancient Mediterranean world.' },
      { id: 'D', text: 'less sophisticated than historians initially estimated from its appearance.' },
    ],
    answer: 'A',
    explanation:
      'A device this refined is unlikely to be a first attempt, yet nothing comparable survives. The inference that resolves both facts is that a tradition existed whose other products were lost — which is what A says.',
    distractorNotes: {
      B: 'Contradicts the archaeological context; the mechanism was recovered from a Roman-era wreck.',
      C: 'Absence of surviving comparisons is not evidence that none existed — this overreads the gap in the record.',
      D: 'The passage emphasises tolerances unmatched for a millennium, so it points to greater, not lesser, sophistication.',
    },
  },
  {
    id: 'rw_in_002',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'inferences',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.2 },
    targetSeconds: 75,
    stimulus: {
      text: 'Researchers studying the desert-dwelling Namib beetle found that its wing covers carry alternating hydrophilic bumps and hydrophobic troughs. Fog droplets condense on the bumps and, once heavy enough, roll down the water-repelling channels to the beetle\'s mouth. Engineers designing passive water-harvesting surfaces have noted that the beetle achieves this without any moving parts or external energy, which suggests that the key requirement for such a surface is ______',
    },
    prompt: 'Which choice most logically completes the text?',
    choices: [
      { id: 'A', text: 'a supply of energy sufficient to drive condensation at low humidity.' },
      { id: 'B', text: 'a patterned arrangement of regions that differ in how strongly they attract water.' },
      { id: 'C', text: 'a mechanical channel capable of redirecting droplets on demand.' },
      { id: 'D', text: 'a surface temperature held permanently below the surrounding dew point.' },
    ],
    answer: 'B',
    explanation:
      'The passage attributes the beetle\'s performance to the alternation of hydrophilic bumps and hydrophobic troughs, and stresses that no energy or moving parts are involved. The requirement that follows is the patterning of differing water affinities.',
    distractorNotes: {
      A: 'The text explicitly says the beetle uses no external energy.',
      C: '"Without any moving parts" rules out a mechanical channel.',
      D: 'Temperature is never discussed; this imports a mechanism the passage does not mention.',
    },
  },
  {
    id: 'rw_in_003',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'inferences',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.3, b: 1.2 },
    targetSeconds: 85,
    stimulus: {
      text: 'Economists assessing minimum wage effects usually compare employment in a state that raised its wage against employment in a neighbouring state that did not. The comparison assumes the two states would have followed parallel employment paths absent the policy. Critics note that legislatures rarely raise wages at random: they tend to act when local labour markets are already tightening. If that tendency holds, then studies using this design would systematically ______',
    },
    prompt: 'Which choice most logically completes the text?',
    choices: [
      { id: 'A', text: 'overstate any negative employment effect of raising the minimum wage.' },
      { id: 'B', text: 'understate any negative employment effect of raising the minimum wage.' },
      { id: 'C', text: 'find no measurable employment effect in either direction.' },
      { id: 'D', text: 'produce estimates that vary unpredictably from one state pair to another.' },
    ],
    answer: 'B',
    explanation:
      'If legislatures raise wages when the labour market is already tightening, the treated state was on a stronger employment path than its neighbour to begin with. That upward bias gets attributed to the policy, so a true negative effect would be partly masked — the estimate understates the harm.',
    distractorNotes: {
      A: 'Reverses the direction: the selection described favours the treated state, biasing estimates upward, not downward.',
      C: 'The bias shifts the estimate; it does not guarantee a null result.',
      D: 'The critics describe a systematic tendency, and the prompt asks what follows "systematically" — unpredictable variation is the opposite of systematic.',
    },
  },
];
