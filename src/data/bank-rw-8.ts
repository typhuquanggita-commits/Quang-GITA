/**
 * Reading and Writing item bank — Command of Evidence: Textual.
 *
 * The whole skill turns on one discipline: name what the claim requires before
 * reading any quotation. Every item here therefore includes a distractor that
 * is squarely on topic and does not bear on the claim — the option a student
 * picks when they matched subject matter instead of testing the proposition.
 *
 * The "weaken" items carry a second trap: an option that supports the claim.
 * That one is chosen by students who hunt directly for a weakening option
 * rather than negating the claim first, and it is the reason the method sheet
 * insists on the negation step.
 */

import type { Question } from '../types.ts';

export const RW_BANK_8: Question[] = [
  /* ================= Easy ================= */
  {
    id: 'rw_cet_101', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'easy', irt: { a: 1.02, b: -1.12 }, targetSeconds: 66,
    stimulus: { text: 'In her 1928 travel account, the writer Ella Maillart repeatedly praises the efficiency of local guides while giving almost no detail about the terrain they crossed. A scholar claims that Maillart wrote for readers who wanted to hear about people rather than landscape.' },
    prompt: 'Which quotation from Maillart’s account, if true, would most directly support the scholar’s claim?',
    choices: [
      { id: 'A', text: '"My publisher wrote to say the chapters on the villagers had been the ones her readers wrote in about."' },
      { id: 'B', text: '"The pass we crossed that morning rises well above four thousand metres."' },
      { id: 'C', text: '"I had trained for two years before attempting the journey at all."' },
      { id: 'D', text: '"The guides accepted less payment than I had been told to expect."' },
    ],
    answer: 'A',
    explanation: 'The claim is about whom Maillart wrote *for* and what those readers wanted. Only the publisher’s report about which chapters drew responses speaks to the audience’s appetite, which is what the claim requires.',
    distractorNotes: {
      B: 'Landscape detail, which the claim says is scarce — a fact about the book’s content, not about its intended readership.',
      C: 'On topic and irrelevant: her preparation says nothing about what her readers wanted.',
      D: 'About the guides, and therefore tempting, but payment bears on economics rather than on readership.',
    },
  },
  {
    id: 'rw_cet_102', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'easy', irt: { a: 1.0, b: -1.0 }, targetSeconds: 66,
    stimulus: { text: 'A researcher argues that the sculptor Camille Claudel worked out her compositions in wax before committing them to stone, contrary to the common account that she carved directly.' },
    prompt: 'Which finding, if true, would most directly support the researcher’s argument?',
    choices: [
      { id: 'A', text: 'Wax studies matching the final proportions of several marbles survive in her studio inventory.' },
      { id: 'B', text: 'Claudel is recorded as having purchased large quantities of marble in the same years.' },
      { id: 'C', text: 'Her contemporaries frequently described her as working at great speed.' },
      { id: 'D', text: 'Several of her marbles show tool marks characteristic of direct carving.' },
    ],
    answer: 'A',
    explanation: 'The claim is that wax preceded stone. Surviving wax studies whose proportions match the finished marbles is exactly the evidence that a preparatory stage existed and fed the final work.',
    distractorNotes: {
      B: 'Marble purchases show she carved, which nobody disputes; the question is what came before the carving.',
      C: 'Speed is compatible with either method and settles nothing.',
      D: 'Supports the common account the researcher is arguing against, so it weakens rather than supports.',
    },
  },
  {
    id: 'rw_cet_103', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'easy', irt: { a: 1.05, b: -0.9 }, targetSeconds: 67,
    stimulus: { text: 'Biologists have proposed that the elaborate nests built by male bowerbirds function as a display of building skill rather than as shelter, since no eggs are ever laid in them.' },
    prompt: 'Which observation, if true, would most directly support this proposal?',
    choices: [
      { id: 'A', text: 'Females inspect several bowers in succession and mate with the male whose bower is most precisely constructed.' },
      { id: 'B', text: 'Bowers are built in locations sheltered from prevailing wind.' },
      { id: 'C', text: 'Males rebuild their bowers each year rather than repairing the previous one.' },
      { id: 'D', text: 'Bowerbirds are found across a wide range of habitats in Australia and New Guinea.' },
    ],
    answer: 'A',
    explanation: 'A display functions by being assessed. Females inspecting several and choosing on construction quality is precisely the assessment the proposal requires, and it ties the structure to mating rather than to shelter.',
    distractorNotes: {
      B: 'Points toward shelter — the function the proposal rejects.',
      C: 'Annual rebuilding is consistent with either function and shows nothing about assessment.',
      D: 'Range is on topic and bears on nothing in the claim.',
    },
  },
  {
    id: 'rw_cet_104', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'easy', irt: { a: 1.0, b: -0.82 }, targetSeconds: 67,
    stimulus: { text: 'A historian claims that the printing press spread through the Holy Roman Empire along trade routes rather than through university towns, as had long been assumed.' },
    prompt: 'Which finding, if true, would most directly support the historian’s claim?',
    choices: [
      { id: 'A', text: 'The earliest presses appear in market towns on major routes, some of which had no university at all.' },
      { id: 'B', text: 'Printed books were more expensive than manuscripts for the first two decades.' },
      { id: 'C', text: 'Several universities acquired presses within thirty years of their invention.' },
      { id: 'D', text: 'Printers frequently moved between cities in search of commissions.' },
    ],
    answer: 'A',
    explanation: 'The claim contrasts two diffusion channels. Earliest presses in route towns, some without universities, is the finding that separates the two — it puts presses where the historian says the mechanism was and where the old account cannot explain them.',
    distractorNotes: {
      B: 'Price bears on adoption in general, not on which of the two channels carried the technology.',
      C: 'Consistent with the assumption the historian is arguing against, and "within thirty years" does not establish precedence.',
      D: 'Printer mobility is on topic but does not distinguish routes from universities as the channel.',
    },
  },
  {
    id: 'rw_cet_105', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'easy', irt: { a: 1.05, b: -0.75 }, targetSeconds: 68,
    stimulus: { text: 'A critic argues that the recurring image of an unopened letter in Yasunari Kawabata’s fiction represents not failed communication but a deliberate refusal to communicate.' },
    prompt: 'Which detail from the fiction, if present, would most directly support the critic’s argument?',
    choices: [
      { id: 'A', text: 'A character sets a letter aside unopened and later says she knew what it would ask of her.' },
      { id: 'B', text: 'Letters in the novels are frequently delayed by unreliable postal services.' },
      { id: 'C', text: 'Kawabata’s characters rarely speak at length to one another.' },
      { id: 'D', text: 'Several of the novels were serialised before appearing as books.' },
    ],
    answer: 'A',
    explanation: 'Refusal requires knowing and declining. A character who sets a letter aside *and* says she knew what it would ask supplies both halves; failure would require not knowing.',
    distractorNotes: {
      B: 'Delay is a failure of the channel — the reading the critic rejects.',
      C: 'Reticence in dialogue is on topic and does not establish that the unopened letter is chosen rather than missed.',
      D: 'Publication history bears on nothing in the claim.',
    },
  },
  {
    id: 'rw_cet_106', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'easy', irt: { a: 1.0, b: -0.68 }, targetSeconds: 68,
    stimulus: { text: 'Researchers propose that a particular species of desert ant navigates by counting its own steps rather than by landmarks.' },
    prompt: 'Which experimental result, if obtained, would most directly support the researchers’ proposal?',
    choices: [
      { id: 'A', text: 'Ants fitted with stilts that lengthen their stride overshoot the nest by a proportional distance.' },
      { id: 'B', text: 'Ants deprived of light still return to the nest successfully.' },
      { id: 'C', text: 'Ants follow the same outbound route on successive foraging trips.' },
      { id: 'D', text: 'Ants travel more slowly when carrying food than when unburdened.' },
    ],
    answer: 'A',
    explanation: 'Step counting predicts that changing stride length while leaving the count intact will produce a proportional error. Lengthened strides causing proportional overshoot is that prediction confirmed, and no landmark account explains it.',
    distractorNotes: {
      B: 'Rules out vision generally but is equally consistent with several non-visual mechanisms, so it does not single out step counting.',
      C: 'Route fidelity is if anything suggestive of landmarks, the alternative being tested against.',
      D: 'Speed under load is on topic and bears on nothing in the proposal.',
    },
  },
  {
    id: 'rw_cet_107', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'easy', irt: { a: 1.05, b: -0.6 }, targetSeconds: 68,
    stimulus: { text: 'An archaeologist argues that a group of Bronze Age burials belonged to people who had travelled from far outside the region, rather than to a local elite.' },
    prompt: 'Which finding, if true, would most directly support the archaeologist’s argument?',
    choices: [
      { id: 'A', text: 'Isotope ratios in the teeth match water sources hundreds of kilometres away.' },
      { id: 'B', text: 'The graves contain more metalwork than others at the same site.' },
      { id: 'C', text: 'The burials are aligned differently from the rest of the cemetery.' },
      { id: 'D', text: 'The site was occupied continuously for several centuries.' },
    ],
    answer: 'A',
    explanation: 'Origin is what the claim asserts, and tooth isotopes record the water someone drank in childhood. A match to distant sources is direct evidence of where these people grew up.',
    distractorNotes: {
      B: 'Abundant metalwork supports the local-elite reading the argument is set against.',
      C: 'Different alignment shows difference of some kind — the classic on-topic option that does not distinguish origin from status.',
      D: 'Site duration bears on the settlement, not on where these individuals came from.',
    },
  },
  {
    id: 'rw_cet_108', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'easy', irt: { a: 1.02, b: -0.55 }, targetSeconds: 69,
    stimulus: { text: 'A musicologist claims that a set of anonymous eighteenth-century keyboard pieces was written by a composer trained in Italy, not in the German tradition to which they have been attributed.' },
    prompt: 'Which finding, if true, would most directly support the musicologist’s claim?',
    choices: [
      { id: 'A', text: 'The pieces use a cadence formula that appears in Italian sources decades before it appears in German ones.' },
      { id: 'B', text: 'The manuscript paper was manufactured in a German-speaking city.' },
      { id: 'C', text: 'The pieces are technically demanding for the instruments of the period.' },
      { id: 'D', text: 'Several German composers of the period had travelled in Italy.' },
    ],
    answer: 'A',
    explanation: 'Training is the claim, and a compositional habit datable to one tradition before the other is the evidence that speaks to where the writer learned. The cadence formula is a fingerprint of schooling.',
    distractorNotes: {
      B: 'Paper origin locates the manuscript, not the composer’s training — a common confusion of object with author.',
      C: 'Difficulty is on topic and carries no national signature.',
      D: 'Would explain Italian traits in a German-trained composer, so it weakens the claim rather than supporting it.',
    },
  },

  /* ================= Medium ================= */
  {
    id: 'rw_cet_109', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'medium', irt: { a: 1.15, b: -0.05 }, targetSeconds: 76,
    stimulus: { text: 'A team argues that the decline of a songbird in farmland is driven by the loss of winter stubble, which the birds feed on, rather than by pesticide use during the breeding season.' },
    prompt: 'Which finding, if true, would most directly *weaken* the team’s argument?',
    choices: [
      { id: 'A', text: 'On farms that retained winter stubble but sprayed heavily in spring, the decline was as steep as elsewhere.' },
      { id: 'B', text: 'The area of winter stubble across the region fell by two-thirds over the study period.' },
      { id: 'C', text: 'The birds are known to feed on seeds found in stubble fields.' },
      { id: 'D', text: 'Pesticide use has fallen slightly in the last decade.' },
    ],
    answer: 'A',
    explanation: 'Negate the claim first: if stubble were not the driver, the decline would persist where stubble remained. That is exactly what choice A reports, and it isolates the alternative cause the team dismissed.',
    distractorNotes: {
      B: 'Supports the team by establishing that the proposed cause was present at scale — the reversed answer this item is built to catch.',
      C: 'Also supportive: it supplies the mechanism the team relies on.',
      D: 'A slight fall in the alternative cause does not bear on whether stubble is the driver.',
    },
  },
  {
    id: 'rw_cet_110', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'medium', irt: { a: 1.18, b: 0.05 }, targetSeconds: 76,
    stimulus: { text: 'A scholar argues that the Roman aqueducts were built less to supply drinking water, which local wells already provided, than to feed the public baths that anchored civic life.' },
    prompt: 'Which finding, if true, would most directly support the scholar’s argument?',
    choices: [
      { id: 'A', text: 'In several cities the aqueduct terminates at the bath complex, with domestic supply drawn from an overflow.' },
      { id: 'B', text: 'Aqueducts required continuous maintenance by dedicated crews.' },
      { id: 'C', text: 'Roman engineers achieved gradients of a few centimetres per kilometre.' },
      { id: 'D', text: 'Wells in Roman cities were often contaminated by the second century.' },
    ],
    answer: 'A',
    explanation: 'The claim is about purpose, and the order of delivery is the strongest available signal of it. An aqueduct that reaches the baths first and supplies homes from the overflow has its priority built into its plumbing.',
    distractorNotes: {
      B: 'Maintenance shows the system mattered without saying what it was for.',
      C: 'Engineering skill is impressive and silent on purpose.',
      D: 'Contaminated wells argue for drinking water as the motive, weakening the claim.',
    },
  },
  {
    id: 'rw_cet_111', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'medium', irt: { a: 1.15, b: 0.14 }, targetSeconds: 77,
    stimulus: { text: 'A literary historian argues that the epistolary novel declined in the nineteenth century not because readers tired of it but because the postal reforms of the 1840s made letters too ordinary to carry narrative weight.' },
    prompt: 'Which finding, if true, would most directly support the historian’s argument?',
    choices: [
      { id: 'A', text: 'Novels published after the reforms use letters for routine business and reserve crises for face-to-face scenes.' },
      { id: 'B', text: 'Sales of epistolary novels fell steadily from 1820 onward.' },
      { id: 'C', text: 'Reviewers in the 1850s described the form as exhausted.' },
      { id: 'D', text: 'Postal volumes in Britain increased more than tenfold after the reforms.' },
    ],
    answer: 'A',
    explanation: 'The claim is that letters lost narrative weight because they became ordinary. A change in what novelists *use* letters for — routine business rather than crisis — is the literary consequence that claim predicts.',
    distractorNotes: {
      B: 'A decline beginning two decades before the reforms cuts against the proposed cause.',
      C: 'Reviewers calling the form exhausted is the reader-fatigue explanation the historian rejects.',
      D: 'Establishes that letters became common but not that their narrative function changed — the near-miss that stops one step short.',
    },
  },
  {
    id: 'rw_cet_112', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'medium', irt: { a: 1.2, b: 0.22 }, targetSeconds: 77,
    stimulus: { text: 'Researchers propose that a coastal fish species uses sound rather than sight to locate reefs, since larvae reach reefs reliably in turbid water where visibility is under a metre.' },
    prompt: 'Which experimental result, if obtained, would most directly *weaken* the researchers’ proposal?',
    choices: [
      { id: 'A', text: 'Larvae reached reefs at the same rate whether reef sound was played or masked by broadband noise.' },
      { id: 'B', text: 'Larvae reared in silence oriented toward speakers playing recorded reef sound.' },
      { id: 'C', text: 'Reef sound carries further underwater than light penetrates in turbid conditions.' },
      { id: 'D', text: 'Larvae possess well-developed inner-ear structures from an early stage.' },
    ],
    answer: 'A',
    explanation: 'Negating the proposal gives: reef sound is not what they use. If masking the sound leaves arrival rates unchanged, the cue is doing no work — the cleanest available refutation.',
    distractorNotes: {
      B: 'Direct support: orientation toward played sound is the behaviour the proposal predicts.',
      C: 'Supports by supplying the physical reason sound would be the usable cue.',
      D: 'Supports by establishing the sensory capacity.',
    },
  },
  {
    id: 'rw_cet_113', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'medium', irt: { a: 1.15, b: 0.3 }, targetSeconds: 78,
    stimulus: { text: 'An economist argues that a city’s minimum-wage increase did not reduce employment in affected businesses, contrary to the prediction of a standard model.' },
    prompt: 'Which finding, if true, would most directly support the economist’s argument?',
    choices: [
      { id: 'A', text: 'Employment in comparable businesses just across the city boundary followed the same path over the same period.' },
      { id: 'B', text: 'Wages in affected businesses rose by the full amount of the increase.' },
      { id: 'C', text: 'Prices in affected businesses rose by about two percent.' },
      { id: 'D', text: 'The increase was announced eighteen months before it took effect.' },
    ],
    answer: 'A',
    explanation: 'The claim is that the policy did not cause a fall. A comparison group outside the policy following the same path shows there was nothing for the policy to have caused — it supplies the counterfactual the argument needs.',
    distractorNotes: {
      B: 'Confirms the policy bit, which is a premise rather than evidence about employment.',
      C: 'Price adjustment is a different margin and does not speak to employment levels.',
      D: 'Advance notice explains how businesses adapted but establishes nothing about the outcome.',
    },
  },
  {
    id: 'rw_cet_114', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'medium', irt: { a: 1.18, b: 0.36 }, targetSeconds: 78,
    stimulus: { text: 'A curator argues that a group of ceramics long catalogued as ritual vessels were in fact everyday cooking pots.' },
    prompt: 'Which finding, if true, would most directly support the curator’s argument?',
    choices: [
      { id: 'A', text: 'The interiors carry carbonised residue and repeated repair marks consistent with heavy use.' },
      { id: 'B', text: 'The vessels were found buried together beneath the floor of a large building.' },
      { id: 'C', text: 'Their decoration resembles that of vessels known to be ritual.' },
      { id: 'D', text: 'They were produced over a span of at least two centuries.' },
    ],
    answer: 'A',
    explanation: 'Cooking leaves traces, and repair implies a vessel too useful to discard. Residue plus repair is the physical signature of daily use, which is what the reattribution requires.',
    distractorNotes: {
      B: 'Deliberate burial beneath a floor points toward the ritual reading the curator is arguing against.',
      C: 'Also supports the original catalogue entry.',
      D: 'Longevity of production is on topic and bears on neither function.',
    },
  },
  {
    id: 'rw_cet_115', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'medium', irt: { a: 1.15, b: 0.42 }, targetSeconds: 79,
    stimulus: { text: 'A team hypothesises that a fungus found in the roots of a drought-tolerant grass is responsible for the grass’s tolerance, rather than the plant’s own physiology.' },
    prompt: 'Which experimental result, if obtained, would most directly support the team’s hypothesis?',
    choices: [
      { id: 'A', text: 'Grass grown from the same seed without the fungus wilted at moisture levels the colonised plants tolerated.' },
      { id: 'B', text: 'The fungus was present in every colonised plant sampled from the wild.' },
      { id: 'C', text: 'Colonised plants had deeper root systems than uncolonised ones.' },
      { id: 'D', text: 'The fungus can be cultured on its own in the laboratory.' },
    ],
    answer: 'A',
    explanation: 'Attributing the trait to the fungus requires removing the fungus and seeing the trait go. Same seed, no fungus, wilting earlier does exactly that, holding the plant’s own physiology constant.',
    distractorNotes: {
      B: 'Universal association is consistent with the fungus being a passenger rather than a cause.',
      C: 'A tempting near-miss: deeper roots is a correlated difference, and without the removal experiment it cannot say which is cause and which effect.',
      D: 'Culturability is a technique, not evidence about the trait.',
    },
  },
  {
    id: 'rw_cet_116', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'medium', irt: { a: 1.2, b: 0.48 }, targetSeconds: 79,
    stimulus: { text: 'A historian of science argues that Rosalind Franklin’s unpublished notes show she had reached the helical interpretation of her own data before the structure was published by others.' },
    prompt: 'Which feature of the notes, if present, would most directly support the historian’s argument?',
    choices: [
      { id: 'A', text: 'A dated entry, prior to the publication, deriving a helical parameter from her measurements.' },
      { id: 'B', text: 'Repeated references to the quality of the diffraction images she had obtained.' },
      { id: 'C', text: 'Correspondence showing she was in regular contact with other laboratories.' },
      { id: 'D', text: 'Evidence that her images were shown to others without her knowledge.' },
    ],
    answer: 'A',
    explanation: 'Two things must be shown: the interpretation and its date. Only a dated derivation of a helical parameter carries both, and the derivation is what makes it an interpretation rather than a possession of data.',
    distractorNotes: {
      B: 'Image quality establishes that she had good data, not that she had read it.',
      C: 'Contact bears on transmission, not on what she herself concluded.',
      D: 'Speaks to how others obtained the data — a real and separate question the claim does not make.',
    },
  },
  {
    id: 'rw_cet_117', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'medium', irt: { a: 1.18, b: 0.54 }, targetSeconds: 79,
    stimulus: { text: 'A planner argues that a new tram line increased retail activity along its route, and not merely that shops opened where activity was already rising.' },
    prompt: 'Which finding, if true, would most directly support the planner’s argument?',
    choices: [
      { id: 'A', text: 'Retail activity along the route was flat for five years before construction and rose only after opening.' },
      { id: 'B', text: 'Retail activity along the route is now higher than in the rest of the city.' },
      { id: 'C', text: 'The route was chosen to serve neighbourhoods with growing populations.' },
      { id: 'D', text: 'Tram ridership exceeded the forecasts made before construction.' },
    ],
    answer: 'A',
    explanation: 'The rival explanation is that the tram followed activity rather than causing it. A flat pre-construction trend that turns upward only at opening is what separates the two, because a pre-existing rise is precisely what it rules out.',
    distractorNotes: {
      B: 'A level comparison, which the rival explanation predicts just as well.',
      C: 'Actively supports the rival explanation: the route went where growth already was.',
      D: 'Ridership shows the line is used, not that retail responded to it.',
    },
  },

  /* ================= Hard ================= */
  {
    id: 'rw_cet_118', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'hard', irt: { a: 1.28, b: 0.98 }, targetSeconds: 88,
    stimulus: { text: 'A team claims that a widely used reading intervention works by increasing the time children spend reading, not by teaching the strategies it names. If they are right, an intervention that increased reading time without teaching any strategy should produce comparable gains.' },
    prompt: 'Which result, if obtained, would most directly *weaken* the team’s claim?',
    choices: [
      { id: 'A', text: 'A time-matched programme with no strategy instruction produced markedly smaller gains.' },
      { id: 'B', text: 'Children in the original intervention read for substantially longer than controls.' },
      { id: 'C', text: 'Teachers reported that the named strategies were difficult to deliver as written.' },
      { id: 'D', text: 'Gains from the original intervention faded within a year.' },
    ],
    answer: 'A',
    explanation: 'The passage states the claim’s own prediction, which makes the test explicit: match the time, drop the strategies, and gains should hold. Markedly smaller gains falsify that prediction directly.',
    distractorNotes: {
      B: 'Supports the claim by confirming its proposed mechanism was present.',
      C: 'Delivery difficulty argues that the strategies were not really taught, which favours the time explanation.',
      D: 'Fading concerns durability and is silent on which ingredient produced the gain.',
    },
  },
  {
    id: 'rw_cet_119', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'hard', irt: { a: 1.3, b: 1.06 }, targetSeconds: 88,
    stimulus: { text: 'A scholar contends that a medieval chronicle usually read as an eyewitness account was compiled decades later from earlier sources, and that its vividness is a literary effect rather than a mark of presence.' },
    prompt: 'Which feature of the chronicle, if established, would most directly support the scholar’s contention?',
    choices: [
      { id: 'A', text: 'Its account of a battle reproduces, in the same order, the phrasing of a chronicle written elsewhere years earlier.' },
      { id: 'B', text: 'It describes weather conditions that match independent records for the days in question.' },
      { id: 'C', text: 'It contains vivid detail about the appearance of individual participants.' },
      { id: 'D', text: 'Its author is named in a later manuscript as having held a post at court.' },
    ],
    answer: 'A',
    explanation: 'Reproduced phrasing in the same order is textual descent: it shows the account came through a document rather than through a pair of eyes, which is the compilation half of the contention.',
    distractorNotes: {
      B: 'Accurate weather supports eyewitness presence, the reading being argued against.',
      C: 'Vividness is exactly what the scholar says is a literary effect, so pointing at it begs the question rather than settling it.',
      D: 'A court post places the author near events, which cuts the other way.',
    },
  },
  {
    id: 'rw_cet_120', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'hard', irt: { a: 1.28, b: 1.14 }, targetSeconds: 89,
    stimulus: { text: 'A group argues that an observed association between a gut bacterium and lower anxiety in mice reflects the bacterium acting on the animal, rather than anxious animals providing an environment the bacterium tolerates poorly.' },
    prompt: 'Which result, if obtained, would most directly support the group’s argument?',
    choices: [
      { id: 'A', text: 'Germ-free mice given the bacterium showed reduced anxiety behaviours within weeks.' },
      { id: 'B', text: 'Anxious mice carried the bacterium at consistently lower levels.' },
      { id: 'C', text: 'The bacterium grows poorly in media containing stress hormones.' },
      { id: 'D', text: 'Mice from the same litter varied widely in their bacterial composition.' },
    ],
    answer: 'A',
    explanation: 'The two hypotheses differ in direction. Introducing the bacterium into animals that had none and observing behaviour change puts the bacterium first in time, which only the causal reading predicts.',
    distractorNotes: {
      B: 'The original association, which both hypotheses explain equally well.',
      C: 'Directly supports the rival reading — the animal’s state shaping the bacterium.',
      D: 'Within-litter variation speaks to how composition is determined, not to direction of effect.',
    },
  },
  {
    id: 'rw_cet_121', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'hard', irt: { a: 1.3, b: 1.2 }, targetSeconds: 90,
    stimulus: { text: 'An analyst claims that a firm’s policy of promoting from within explains its unusually low staff turnover. A colleague objects that the firm also pays above the market rate, and that either policy alone would predict the same turnover figure.' },
    prompt: 'Which finding, if true, would most directly answer the colleague’s objection in the analyst’s favour?',
    choices: [
      { id: 'A', text: 'Among firms paying comparably, those promoting from within retain staff longer.' },
      { id: 'B', text: 'The firm’s turnover has been low for as long as records exist.' },
      { id: 'C', text: 'Staff at the firm report high satisfaction with their pay.' },
      { id: 'D', text: 'The firm promoted internally more often after raising its pay rates.' },
    ],
    answer: 'A',
    explanation: 'The objection is that two explanations are confounded. Holding pay constant and varying the promotion policy separates them, and that is what a comparison among comparably paying firms does.',
    distractorNotes: {
      B: 'Duration does not disentangle two policies that may both have been in place throughout.',
      C: 'Satisfaction with pay supports the rival explanation.',
      D: 'Ties the two together more tightly rather than separating them.',
    },
  },
  {
    id: 'rw_cet_122', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-textual',
    format: 'mcq', band: 'hard', irt: { a: 1.32, b: 1.26 }, targetSeconds: 90,
    stimulus: { text: 'A researcher proposes that the tonal system of a language family arose from the loss of final consonants, whose voicing had conditioned the pitch of the preceding vowel. On this account tone is a residue of a distinction that has otherwise disappeared.' },
    prompt: 'Which finding, if true, would most directly support the researcher’s proposal?',
    choices: [
      { id: 'A', text: 'A related language that retains the final consonants has no tonal contrasts.' },
      { id: 'B', text: 'Tonal contrasts in the family are perceptible to speakers of non-tonal languages.' },
      { id: 'C', text: 'Neighbouring unrelated languages in the region are also tonal.' },
      { id: 'D', text: 'Early written records of the family do not mark tone.' },
    ],
    answer: 'A',
    explanation: 'The proposal makes tone and the final consonants alternatives: one replaces the other. A related language that kept the consonants and never developed tone is the complementary distribution that prediction requires.',
    distractorNotes: {
      B: 'Cross-linguistic perceptibility is about hearing, not about historical origin.',
      C: 'Regional tone suggests contact as an alternative explanation, weakening the account.',
      D: 'Absence from early records is ambiguous: orthographies routinely omit tone even where it exists.',
    },
  },
];
