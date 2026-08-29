/**
 * Reading and Writing bank — Central Ideas and Details.
 *
 * Twenty-two items taking this skill from six to twenty-eight, which is what a
 * topic packet needs to fill its advanced, revision, and exam sheets without
 * any item appearing twice.
 *
 * Every passage is original and self-contained: the answer is determinable
 * from the text alone, and outside knowledge is a defect rather than an
 * advantage. Subjects are spread across literature, history and social
 * studies, the humanities, and science, matching the operational distribution.
 *
 * The distractor design is the part that matters. Three wrong options here are
 * almost always: a true supporting detail mistaken for the main idea, a claim
 * the passage contradicts, and a claim the passage never makes at all. Those
 * are the three ways a real student misses this question type, and a
 * distractor that is merely wrong teaches nothing on review.
 */

import type { Question } from '../types.ts';

export const RW_BANK_6: Question[] = [
  /* ================= Easy ================= */
  {
    id: 'rw_ci_101',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.02, b: -1.15 },
    targetSeconds: 62,
    stimulus: {
      text: 'The Icelandic word "gluggaveður" translates roughly as "window weather": a day that looks inviting from indoors and is bitter the moment you step outside. The word has no single-word equivalent in English, and Icelandic speakers use it without irony. Linguists point to such terms as evidence that vocabularies grow toward the conditions their speakers actually live in.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'A language develops specific words for the conditions its speakers regularly encounter.' },
      { id: 'B', text: 'Icelandic contains more weather-related vocabulary than English does.' },
      { id: 'C', text: 'English speakers have no way to describe deceptively pleasant weather.' },
      { id: 'D', text: 'Linguists disagree about whether untranslatable words genuinely exist.' },
    ],
    answer: 'A',
    explanation:
      'The passage introduces one word, explains what it means, and then states the general point directly: vocabularies "grow toward the conditions their speakers actually live in." The word is the example; the growth of vocabulary is the idea. Choice A states the idea rather than the example.',
    distractorNotes: {
      B: 'A comparison of vocabulary sizes is never made. The passage discusses one word, not a count.',
      C: 'English lacks a single word, which is not the same as lacking any way to describe it — and the passage says the former.',
      D: 'No disagreement appears anywhere in the text; the linguists are cited in agreement.',
    },
  },
  {
    id: 'rw_ci_102',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.0, b: -1.05 },
    targetSeconds: 62,
    stimulus: {
      text: 'Before 1884, every city kept its own time, set by the sun overhead. A traveller crossing the United States adjusted a watch dozens of times, and railway timetables listed several columns of departure times for a single train. The pressure to standardise came not from astronomers but from the railways, which could not schedule around a country where noon meant a different instant in every town.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'Standard time was adopted because railways could not operate on locally determined clocks.' },
      { id: 'B', text: 'Travellers in the nineteenth century frequently missed their trains.' },
      { id: 'C', text: 'Astronomers opposed the standardisation of time in the 1880s.' },
      { id: 'D', text: 'Railway timetables were the first printed documents to list multiple time zones.' },
    ],
    answer: 'A',
    explanation:
      'The passage describes the problem — local time everywhere — and then names its cause of change: "the pressure to standardise came not from astronomers but from the railways." Everything before that sentence exists to explain why the railways could not cope. Choice A states that relationship.',
    distractorNotes: {
      B: 'Missed trains are never mentioned. The difficulty described is scheduling, not passenger error.',
      C: 'The passage says the pressure did not come from astronomers, which is not the same as saying they opposed it.',
      D: 'A claim about firsts that the passage never makes.',
    },
  },
  {
    id: 'rw_ci_103',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.05, b: -0.95 },
    targetSeconds: 64,
    stimulus: {
      text: 'The mimic octopus of Indonesian waters does not have one defensive display but many. Observers have recorded it flattening itself and trailing its arms to resemble a flatfish, tucking six arms away to imitate a sea snake, and spreading all eight to suggest a lionfish. Which impression it produces appears to depend on which predator is nearby, a flexibility not documented in any other cephalopod.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'The mimic octopus selects among several impersonations according to the threat it faces.' },
      { id: 'B', text: 'The mimic octopus is the only cephalopod capable of changing colour.' },
      { id: 'C', text: 'Flatfish, sea snakes, and lionfish are the main predators of the mimic octopus.' },
      { id: 'D', text: 'Researchers have observed the mimic octopus only in Indonesian waters.' },
    ],
    answer: 'A',
    explanation:
      'The list of displays is the evidence; the sentence that follows supplies the point — the choice "appears to depend on which predator is nearby," a flexibility unmatched elsewhere. Choice A captures both the variety and the selection between them.',
    distractorNotes: {
      B: 'Colour change is never mentioned; the passage describes shape and posture.',
      C: 'Reverses the roles. Those three are what the octopus imitates, not what hunts it.',
      D: 'The location is scene-setting in the first sentence, not the point of the passage.',
    },
  },
  {
    id: 'rw_ci_104',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.0, b: -0.9 },
    targetSeconds: 64,
    stimulus: {
      text: 'The novelist Toni Cade Bambara spent much of the 1970s running film workshops in Atlanta rather than writing. Colleagues at the time read the pause as a loss to literature. Bambara described it differently: she said she had been learning how a story moves when it is carried by images instead of sentences, and her later fiction is noticeably more visual in its structure.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'Bambara treated a period away from writing as training that later changed how she wrote.' },
      { id: 'B', text: 'Bambara abandoned fiction in the 1970s in order to work in film.' },
      { id: 'C', text: 'Bambara’s colleagues were correct that her film work cost literature a great deal.' },
      { id: 'D', text: 'Film workshops in Atlanta were the most influential of the 1970s.' },
    ],
    answer: 'A',
    explanation:
      'The passage sets a contrast between how colleagues read the pause and how Bambara did, then supplies evidence for her reading: "her later fiction is noticeably more visual in its structure." Choice A states the resolved contrast, which is what the text is organised around.',
    distractorNotes: {
      B: 'She spent "much of the 1970s" on workshops and returned to fiction — abandonment overstates it, and the passage discusses her later fiction.',
      C: 'The passage presents the colleagues’ reading only to set Bambara’s against it, and the evidence supports hers.',
      D: 'A superlative claim about the workshops that appears nowhere in the text.',
    },
  },
  {
    id: 'rw_ci_105',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.05, b: -0.85 },
    targetSeconds: 65,
    stimulus: {
      text: 'Mangrove forests occupy less than one percent of the world’s tropical coastline yet store carbon at three to five times the rate of inland tropical forests of the same area. The difference lies below the waterline: their tangled root systems trap sediment, and the waterlogged soil that results holds organic material for centuries without decomposing.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'Mangroves store carbon at unusually high rates because their waterlogged soils prevent decomposition.' },
      { id: 'B', text: 'Mangrove forests cover less than one percent of tropical coastlines.' },
      { id: 'C', text: 'Inland tropical forests store less carbon than they did in the past.' },
      { id: 'D', text: 'Sediment trapping is the primary threat to mangrove root systems.' },
    ],
    answer: 'A',
    explanation:
      'The first sentence states the surprising fact and the second explains it: roots trap sediment, waterlogged soil resists decomposition. A main idea joins the claim to its cause, which is what choice A does.',
    distractorNotes: {
      B: 'A true detail from the first clause, offered to make the comparison striking. It is not what the passage is about.',
      C: 'A change over time that the passage never discusses; the comparison is between forest types, not across years.',
      D: 'Reverses the sediment’s role — the passage presents trapping as the mechanism, not a threat.',
    },
  },
  {
    id: 'rw_ci_106',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.0, b: -0.8 },
    targetSeconds: 65,
    stimulus: {
      text: 'When the Bauhaus school was forced to close in 1933, its faculty scattered across three continents. Historians once treated the closure as the end of the movement. More recent accounts describe it instead as a dispersal: within fifteen years, buildings recognisably shaped by Bauhaus principles stood in Tel Aviv, Chicago, and São Paulo, designed by people who had taught or studied in Dessau.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'The Bauhaus closure spread its ideas rather than ending them, as later accounts recognise.' },
      { id: 'B', text: 'The Bauhaus school was closed by political forces in 1933.' },
      { id: 'C', text: 'Tel Aviv contains more Bauhaus-influenced buildings than any other city.' },
      { id: 'D', text: 'Historians now agree that the Bauhaus movement was overrated.' },
    ],
    answer: 'A',
    explanation:
      'The passage names an older reading ("the end of the movement") and replaces it with a newer one ("a dispersal"), then gives the evidence — buildings on three continents by Bauhaus-trained designers. Choice A states the replacement, which is the point.',
    distractorNotes: {
      B: 'True and necessary background, but the passage is about what the closure did, not that it happened.',
      C: 'A comparison among the three cities is never made.',
      D: 'The revised account raises the movement’s reach; nothing suggests a lowered estimate of its worth.',
    },
  },
  {
    id: 'rw_ci_107',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.02, b: -0.75 },
    targetSeconds: 66,
    stimulus: {
      text: 'A honeybee returning from a productive patch of flowers performs a looping dance on the vertical face of the comb. The angle of the straight run encodes the direction of the food relative to the sun; the duration encodes the distance. Bees that watch the dance and then fly out arrive close enough to the source that the encoding cannot plausibly be coincidental.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'A honeybee’s dance transmits specific directional and distance information that other bees use.' },
      { id: 'B', text: 'Honeybees perform their dance on the vertical surface of the comb.' },
      { id: 'C', text: 'Bees are able to determine the position of the sun even on overcast days.' },
      { id: 'D', text: 'The honeybee dance is the most complex communication system among insects.' },
    ],
    answer: 'A',
    explanation:
      'Two sentences describe what the dance encodes; the last gives the reason to believe the encoding is real — the watching bees arrive. The idea is that information is transmitted and used, which choice A states.',
    distractorNotes: {
      B: 'A physical detail of where the dance happens. True, and not the point.',
      C: 'Overcast conditions are never mentioned. This is outside the text.',
      D: 'A superlative comparison with other insects that the passage does not make.',
    },
  },
  {
    id: 'rw_ci_108',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.05, b: -0.7 },
    targetSeconds: 66,
    stimulus: {
      text: 'The Ethiopian rock-hewn churches at Lalibela were not built up from the ground but cut downward into it: masons began at the surface of the volcanic tuff and excavated, leaving the structure standing in the pit they had made. Nothing was assembled. A misjudged cut could not be corrected by replacing a block, because there were no blocks.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'The churches were carved subtractively, a method that left no room for correcting mistakes.' },
      { id: 'B', text: 'The churches at Lalibela are made of volcanic tuff.' },
      { id: 'C', text: 'Ethiopian masons of the period worked faster than their European contemporaries.' },
      { id: 'D', text: 'The pits surrounding the churches were dug long after the buildings were finished.' },
    ],
    answer: 'A',
    explanation:
      'The passage describes the method — cutting downward, removing material — and then draws the consequence in its last two sentences: nothing assembled, so nothing replaceable. Choice A joins the method to the consequence.',
    distractorNotes: {
      B: 'The material is a detail supporting the description of the method.',
      C: 'A comparison with European masons appears nowhere in the text.',
      D: 'Contradicts the passage: the pit is what excavation produced, and the structure was left standing in it.',
    },
  },

  /* ================= Medium ================= */
  {
    id: 'rw_ci_109',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: -0.1 },
    targetSeconds: 72,
    stimulus: {
      text: 'Economists have long modelled traffic as a problem of capacity, on the assumption that adding lanes reduces congestion. Data from thirty metropolitan areas complicate this: within roughly five years of a highway widening, average travel times return to their previous levels. The additional capacity is absorbed by trips that were not previously taken — journeys that were, until the widening, not quite worth making.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'Added road capacity is consumed by newly worthwhile trips, so congestion returns.' },
      { id: 'B', text: 'Highway widenings in thirty metropolitan areas failed because of poor engineering.' },
      { id: 'C', text: 'Economists have been reluctant to collect data on urban traffic patterns.' },
      { id: 'D', text: 'Travel times in metropolitan areas have risen steadily over the past five years.' },
    ],
    answer: 'A',
    explanation:
      'The passage states a standard assumption, presents data that complicate it, and then supplies the mechanism: capacity is absorbed by trips "not quite worth making" before. A main idea for a passage shaped this way is the corrected understanding plus its cause — choice A.',
    distractorNotes: {
      B: 'The passage attributes the result to demand, not to engineering failure. The widenings worked as built.',
      C: 'The data are cited, so the reluctance described here is contradicted by the passage itself.',
      D: 'Travel times return to previous levels rather than rising steadily; the passage says the opposite of a steady rise.',
    },
  },
  {
    id: 'rw_ci_110',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.18, b: 0 },
    targetSeconds: 74,
    stimulus: {
      text: 'The poet Gwendolyn Brooks revised "We Real Cool" until the line breaks fell after the word "We" rather than before it. The effect is that each line ends on a pronoun left hanging, and the reader’s voice must carry it into the next line to complete the thought. Brooks said in interviews that the placement was meant to make the speakers sound tentative about their own assertions.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'A deliberate choice of line break produces a hesitancy that matches the poem’s intent.' },
      { id: 'B', text: 'Brooks revised "We Real Cool" more extensively than her other poems.' },
      { id: 'C', text: 'Readers of "We Real Cool" typically read it aloud rather than silently.' },
      { id: 'D', text: 'Brooks gave a large number of interviews about her poetic technique.' },
    ],
    answer: 'A',
    explanation:
      'The passage names a formal decision, describes its effect on the reader, and then reports the intent behind it. The idea is the alignment between the technique and what it was meant to convey, which is choice A.',
    distractorNotes: {
      B: 'A comparison with her other poems is never made.',
      C: 'The reader’s voice carrying the line is a description of the effect, not a claim about how people usually read the poem.',
      D: 'One interview reference is used as a source; the number of interviews is not the subject.',
    },
  },
  {
    id: 'rw_ci_111',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.05 },
    targetSeconds: 74,
    stimulus: {
      text: 'Standard accounts credit the Antikythera mechanism’s gearing to Greek astronomical theory. A 2021 reconstruction suggests the influence ran the other way as well: certain gear ratios in the device do not correspond to any ratio recorded in surviving Greek texts, and produce predictions slightly better than the theory then available. The builders appear to have been fitting gears to observation, not to doctrine.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'Evidence from the mechanism’s gearing suggests its makers worked from observation rather than existing theory.' },
      { id: 'B', text: 'The Antikythera mechanism was more accurate than any device built in the following millennium.' },
      { id: 'C', text: 'Greek astronomical texts from the period have largely been lost.' },
      { id: 'D', text: 'The 2021 reconstruction was the first attempt to model the mechanism’s gearing.' },
    ],
    answer: 'A',
    explanation:
      'The passage sets the standard account against a newer finding, gives the specific evidence — ratios absent from the texts, predictions better than the theory — and states the conclusion in the last sentence. Choice A carries the finding and its basis.',
    distractorNotes: {
      B: 'The comparison is with the theory of its own time, not with later devices.',
      C: '"Surviving Greek texts" implies some were lost, but that is a background assumption, not the point.',
      D: 'A claim about firsts the passage never makes; only one reconstruction is mentioned.',
    },
  },
  {
    id: 'rw_ci_112',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.2, b: 0.15 },
    targetSeconds: 76,
    stimulus: {
      text: 'Conservationists working on the Californian condor faced a choice in 1987 that they described at the time as unbearable: capture every remaining wild bird, ending the species in the wild, or leave twenty-two individuals to a decline the data said was irreversible. They captured all of them. The wild population today, descended entirely from those birds, exceeds three hundred.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'A decision that removed a species from the wild is what allowed it to return there.' },
      { id: 'B', text: 'Conservationists in 1987 disagreed sharply about how to manage the condor.' },
      { id: 'C', text: 'Twenty-two condors remained in the wild in 1987.' },
      { id: 'D', text: 'Captive breeding programmes usually succeed when begun early enough.' },
    ],
    answer: 'A',
    explanation:
      'The passage frames a dilemma, records the choice made, and closes with the outcome — a wild population of over three hundred, all descended from the captured birds. The idea is the paradox that the capture is what produced the recovery, which choice A states.',
    distractorNotes: {
      B: 'The passage describes the choice as unbearable, not as contested; no disagreement is reported.',
      C: 'A precise supporting detail that makes the stakes clear. It is not the point of the passage.',
      D: 'A generalisation about programmes at large from a single case, and the passage makes no such claim.',
    },
  },
  {
    id: 'rw_ci_113',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.2 },
    targetSeconds: 76,
    stimulus: {
      text: 'The 1930s Federal Writers’ Project sent interviewers to record the recollections of formerly enslaved people. Scholars have noted that most interviewers were white and that respondents, still living in the communities they described, had reason to be careful. The resulting narratives are therefore read now as double documents: evidence about slavery, and evidence about what could be said aloud in the American South in 1937.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'The interview conditions make the narratives a record of two things at once.' },
      { id: 'B', text: 'The Federal Writers’ Project narratives are unreliable as historical evidence.' },
      { id: 'C', text: 'Most interviewers employed by the Federal Writers’ Project were white.' },
      { id: 'D', text: 'Scholars have recently discovered new Federal Writers’ Project material.' },
    ],
    answer: 'A',
    explanation:
      'The passage identifies a constraint on the interviews and then draws the consequence explicitly: the narratives are "double documents," evidence about slavery and about what could be said in 1937. Choice A states that consequence.',
    distractorNotes: {
      B: 'Overstates. The passage says the narratives carry two kinds of evidence, not that they carry none — reading them as documents of constraint is a use, not a dismissal.',
      C: 'A supporting fact, given to explain why respondents were careful.',
      D: 'No discovery is described; the passage concerns how existing material is read.',
    },
  },
  {
    id: 'rw_ci_114',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.18, b: 0.25 },
    targetSeconds: 78,
    stimulus: {
      text: 'Attempts to grow crops in Martian regolith simulant have generally failed, and the usual explanation is perchlorate toxicity. A 2023 trial isolated the variable differently: after washing the perchlorates out, growth remained poor until researchers added a bacterial culture. The limiting factor, they concluded, was not what the soil contained but what it lacked — the microbial community that makes nitrogen available to roots.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'The obstacle to growing crops in Martian soil is an absence rather than a contaminant.' },
      { id: 'B', text: 'Perchlorates in Martian regolith are harmless to most crop species.' },
      { id: 'C', text: 'Crops grown in Martian simulant require more nitrogen than crops grown on Earth.' },
      { id: 'D', text: 'The 2023 trial was the first to use Martian regolith simulant.' },
    ],
    answer: 'A',
    explanation:
      'The passage names the standard explanation, describes an experiment that removes it, and reports what remained: growth stayed poor until microbes were added. The conclusion is stated outright — the problem is what the soil lacks. Choice A states it.',
    distractorNotes: {
      B: 'The trial washed the perchlorates out precisely because they matter; removing them was necessary but not sufficient.',
      C: 'A comparison of nitrogen requirements is never made. The passage concerns availability, not quantity needed.',
      D: 'A claim about firsts that the passage does not make; earlier attempts are referenced in the first sentence.',
    },
  },
  {
    id: 'rw_ci_115',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.3 },
    targetSeconds: 78,
    stimulus: {
      text: 'The sculptor Ruth Asawa described her looped-wire forms as drawings that happened to occupy space. Critics in the 1950s categorised them as craft, a designation that kept them out of several major exhibitions. Asawa did not contest the label. She continued to describe the work in the vocabulary of drawing and let the categories settle themselves, which they eventually did.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'Asawa persisted with her own account of her work rather than arguing against a limiting label.' },
      { id: 'B', text: 'Critics in the 1950s were hostile to sculpture made from unconventional materials.' },
      { id: 'C', text: 'Asawa’s work was excluded from every major exhibition of the 1950s.' },
      { id: 'D', text: 'The distinction between craft and fine art has now been abandoned entirely.' },
    ],
    answer: 'A',
    explanation:
      'The passage gives Asawa’s description, the critics’ competing one, and her response — not contesting it, continuing with her own vocabulary, letting the categories settle. Choice A states that response, which is what the passage is built around.',
    distractorNotes: {
      B: 'The passage reports a categorisation, not hostility, and says nothing about materials generally.',
      C: 'Overstates "several major exhibitions" into every one.',
      D: '"The categories settled" concerns her work’s reception, not the abolition of a distinction.',
    },
  },
  {
    id: 'rw_ci_116',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.2, b: 0.35 },
    targetSeconds: 78,
    stimulus: {
      text: 'A common assumption in urban ecology is that species richness falls as one moves toward a city centre. Surveys of bee populations across four European cities do show fewer species downtown — but the decline is not smooth. Richness drops sharply at the suburban fringe and then stabilises, suggesting that the boundary matters more than the gradient, and that what changes at the fringe is the availability of unmanaged ground.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'Bee species richness falls at a specific boundary rather than declining gradually toward the centre.' },
      { id: 'B', text: 'Cities in Europe support fewer bee species than rural areas do.' },
      { id: 'C', text: 'Unmanaged ground is the only habitat feature that affects bee populations.' },
      { id: 'D', text: 'Urban ecologists have abandoned the study of species richness gradients.' },
    ],
    answer: 'A',
    explanation:
      'The passage grants the general pattern, then makes its point with the word "but": the decline is not smooth, it drops at the fringe and stabilises, so "the boundary matters more than the gradient." Choice A states that correction.',
    distractorNotes: {
      B: 'The unsurprising half of the finding, which the passage grants in order to set up the interesting half.',
      C: 'The passage suggests unmanaged ground is what changes at the fringe, which is far short of "the only feature that affects" bees.',
      D: 'The study reported is a richness-gradient study, so abandonment is contradicted by the passage itself.',
    },
  },
  {
    id: 'rw_ci_117',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.4 },
    targetSeconds: 78,
    stimulus: {
      text: 'Translators of the Old English poem "The Seafarer" must decide what to do with words that carry two senses at once. The word "wræclast" means both the path of an exile and the hardship of exile itself — a road and a condition. English forces a choice. Most translators pick one and lose the other; a few invent a compound and lose the plainness of the original.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'Translating the poem forces a loss, and translators differ only in which loss they accept.' },
      { id: 'B', text: 'Old English contains more double-sense words than modern English does.' },
      { id: 'C', text: 'The best translations of "The Seafarer" use invented compound words.' },
      { id: 'D', text: '"Wræclast" is the most difficult word in Old English poetry to translate.' },
    ],
    answer: 'A',
    explanation:
      'The passage names the problem, gives one example in detail, and then describes both available responses — each with what it costs. Neither is presented as correct. Choice A states the shape of the problem, which is the idea.',
    distractorNotes: {
      B: 'A comparative claim about vocabularies that the passage never makes.',
      C: 'The passage says inventing a compound "loses the plainness," which is a cost, not an endorsement.',
      D: 'A superlative about all of Old English poetry, from one example.',
    },
  },
  {
    id: 'rw_ci_118',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.18, b: 0.45 },
    targetSeconds: 80,
    stimulus: {
      text: 'The Great Barrier Reef’s coral cover has been surveyed annually since 1985, and the record is often summarised as a steady decline. The survey team resists this reading. Their data show a sawtooth: sharp losses after bleaching events and cyclones, followed by recovery that has, until recently, been nearly complete. What has changed is not the rate of loss but the interval between events, which is now shorter than the recovery takes.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'The reef’s decline reflects a shortened interval between damaging events rather than heavier damage.' },
      { id: 'B', text: 'Coral cover on the Great Barrier Reef has declined steadily since 1985.' },
      { id: 'C', text: 'Bleaching events cause more damage to coral than cyclones do.' },
      { id: 'D', text: 'Annual surveys of the reef began in 1985 and have continued without interruption.' },
    ],
    answer: 'A',
    explanation:
      'The passage names a common summary, has the survey team reject it, describes what the data actually show, and states the real change in the final sentence: the interval, not the rate. Choice A carries that distinction.',
    distractorNotes: {
      B: 'The reading the passage exists to correct. It is stated only so it can be replaced.',
      C: 'The two are listed together as causes of loss; no comparison of their severity appears.',
      D: 'Background about the record, given so the sawtooth can be described.',
    },
  },

  /* ================= Hard ================= */
  {
    id: 'rw_ci_119',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.28, b: 0.95 },
    targetSeconds: 86,
    stimulus: {
      text: 'Historians of medicine once explained the fall in nineteenth-century mortality by pointing to specific interventions: vaccination, antisepsis, the isolation of pathogens. Thomas McKeown argued instead that most of the decline preceded the interventions and tracked nutrition. His critics have since shown his nutritional data to be weak. The argument nevertheless changed the field, because it forced a question that the interventionist account had never had to answer: what would count as evidence that a particular measure caused a particular decline?',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'A thesis whose own evidence proved weak was influential because of the question it forced the field to confront.' },
      { id: 'B', text: 'Nutrition, rather than medical intervention, explains most of the nineteenth-century decline in mortality.' },
      { id: 'C', text: 'McKeown’s critics established that vaccination and antisepsis were the principal causes of the decline.' },
      { id: 'D', text: 'Historians of medicine now consider nineteenth-century mortality data too unreliable to interpret.' },
    ],
    answer: 'A',
    explanation:
      'The passage grants that McKeown was probably wrong on the evidence and then says the argument "nevertheless changed the field" — with the reason stated in the final clause. A main idea here must carry both halves: wrong on its own terms, consequential for what it forced. That is choice A.',
    distractorNotes: {
      B: 'McKeown’s claim, which the passage explicitly reports as undermined by his critics.',
      C: 'The critics are said to have weakened McKeown’s data, which is not the same as establishing the original account.',
      D: 'The passage describes a methodological question being sharpened, not data being abandoned.',
    },
  },
  {
    id: 'rw_ci_120',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.3, b: 1.05 },
    targetSeconds: 88,
    stimulus: {
      text: 'Reading the Domesday Book as a tax record explains most of what it contains and almost none of its omissions. Whole categories of person — the landless, most townspeople, monastic communities in several counties — appear irregularly or not at all. Some historians treat these gaps as administrative failure. Others read them as the record’s actual argument: that the survey defined who counted as a holder of the realm, and that to be absent from it was not an oversight but a position.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'The record’s omissions admit two readings: careless gaps, or a deliberate statement about who counted.' },
      { id: 'B', text: 'The Domesday Book was compiled primarily for the purpose of assessing taxation.' },
      { id: 'C', text: 'Administrative failures made the Domesday Book unreliable as a record of landholding.' },
      { id: 'D', text: 'Monastic communities were systematically excluded from the Domesday survey.' },
    ],
    answer: 'A',
    explanation:
      'The passage sets up the omissions as the interesting problem and then presents two interpretations of them — "some historians… others" — without settling between them. A main idea for a text organised as a live disagreement is the disagreement itself, which is choice A.',
    distractorNotes: {
      B: 'The first clause grants this reading and immediately says it explains "almost none of its omissions," which is what the passage is about.',
      C: 'One of the two readings, presented as contested rather than as the passage’s conclusion.',
      D: 'The passage says such communities appear "irregularly or not at all" in several counties — systematic exclusion overstates it, and it is a detail rather than the idea.',
    },
  },
  {
    id: 'rw_ci_121',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.28, b: 1.1 },
    targetSeconds: 88,
    stimulus: {
      text: 'The standard objection to citizen-science datasets is uneven effort: volunteers observe where they live and when the weather is fine, so the record confounds the distribution of species with the distribution of observers. Recent work does not deny this. It argues that the observer distribution is itself measurable — from submission timestamps, road networks, population density — and that a bias one can model is worth more than a small unbiased sample one cannot extend.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'A known and modellable bias can make a large dataset more useful than a small clean one.' },
      { id: 'B', text: 'Citizen-science datasets are unreliable because volunteers observe close to home.' },
      { id: 'C', text: 'Researchers have found methods of eliminating observer bias from volunteer records.' },
      { id: 'D', text: 'Small unbiased samples are of little value in ecological research.' },
    ],
    answer: 'A',
    explanation:
      'The passage concedes the objection ("does not deny this") and then makes its own claim in the final sentence: the bias is measurable, and a modellable bias beats an unextendable clean sample. Choice A states the comparison the passage rests on.',
    distractorNotes: {
      B: 'The objection the passage concedes and then argues past. Stating it alone misses everything after the concession.',
      C: 'The argument is that the bias can be *modelled*, which is explicitly different from eliminating it.',
      D: 'Overstates. The passage says a small unbiased sample "one cannot extend" is worth less in this comparison, not that such samples have little value generally.',
    },
  },
  {
    id: 'rw_ci_122',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.3, b: 1.2 },
    targetSeconds: 90,
    stimulus: {
      text: 'Marianne Moore cut "Poetry" from twenty-nine lines to three, and the three retain the opening — "I, too, dislike it" — while discarding the reasons. Editors have restored the long version in most anthologies, on the grounds that the short one is unintelligible alone. Moore’s defenders reply that unintelligibility was the point: a poem that begins by disliking poetry and then refuses to explain itself enacts the suspicion it describes.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'Whether the short version fails or succeeds depends on whether its withholding is read as a defect or a method.' },
      { id: 'B', text: 'Moore’s revision of "Poetry" was a mistake that editors have justifiably corrected.' },
      { id: 'C', text: 'Anthologies generally print the earliest available version of a poem.' },
      { id: 'D', text: 'Moore disliked poetry and said so directly in the opening line of her poem.' },
    ],
    answer: 'A',
    explanation:
      'Two positions are given — editors restore the long version because the short one is unintelligible; defenders answer that the unintelligibility is the method. The passage does not settle it. The idea is that the same feature grounds both readings, which is choice A.',
    distractorNotes: {
      B: 'One side of the disagreement, stated as though the passage endorsed it. It does not.',
      C: 'A generalisation about anthology practice; the passage describes one case and one stated reason.',
      D: 'A quoted detail from the poem, taken at face value in a passage arguing about how the line functions.',
    },
  },
  {
    id: 'rw_ci_123',
    section: 'rw',
    domain: 'information-ideas',
    skill: 'central-ideas',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.32, b: 1.25 },
    targetSeconds: 90,
    stimulus: {
      text: 'Replication failures in psychology are commonly attributed to questionable analytic practice. A less comfortable possibility is structural: if an effect genuinely varies with context — the population, the decade, the room — then a failed replication is not evidence of a false original but a measurement of that variation. Distinguishing the two cases requires knowing in advance which contextual features matter, which is precisely what the original study was supposed to establish.',
    },
    prompt: 'Which choice best states the main idea of the text?',
    choices: [
      { id: 'A', text: 'Telling a false result from a context-dependent one requires knowledge that the original study was meant to supply.' },
      { id: 'B', text: 'Most replication failures in psychology are caused by questionable analytic practice.' },
      { id: 'C', text: 'Psychological effects vary so much with context that replication is not a meaningful test.' },
      { id: 'D', text: 'Researchers should specify in advance which contextual features they expect to matter.' },
    ],
    answer: 'A',
    explanation:
      'The passage raises a second explanation for replication failure, then closes on the difficulty it creates: distinguishing the two requires knowing which contextual features matter, and that is what the original study was for. The circularity is the point — choice A.',
    distractorNotes: {
      B: 'The common attribution the passage sets aside in its second sentence in order to make its own point.',
      C: 'Overstates a conditional. The passage says "if an effect genuinely varies," and never concludes that replication is meaningless.',
      D: 'A recommendation the passage does not make; it identifies the problem rather than prescribing a fix.',
    },
  },
];
