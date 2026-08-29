/**
 * Reading and Writing item bank — Text Structure and Purpose.
 *
 * The reliable trap in this skill is an option that summarises content
 * accurately when the question asked about function. It is chosen because it is
 * true, which is exactly what makes it worth building: a student who has
 * learned to check whether they are answering "what does it say" or "what does
 * it do" can reject it, and one who has not cannot.
 *
 * Purpose items therefore always offer at least one accurate topic statement,
 * and function items always offer at least one accurate paraphrase of the
 * marked sentence.
 */

import type { Question } from '../types.ts';

export const RW_BANK_10: Question[] = [
  /* ================= Easy ================= */
  {
    id: 'rw_tsp_101', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'easy', irt: { a: 1.02, b: -1.1 }, targetSeconds: 66,
    stimulus: { text: 'Gardeners are often told to water in the evening so that less moisture is lost to evaporation. The advice is sound as far as it goes. But foliage left wet overnight is an invitation to fungal disease, and in humid regions the disease costs more than the water saved. Morning watering trades a little evaporation for a great deal of protection.' },
    prompt: 'Which choice best describes the overall structure of the text?',
    choices: [
      { id: 'A', text: 'A piece of common advice is granted, then qualified by a cost it overlooks.' },
      { id: 'B', text: 'A widely held belief is shown to rest on a factual error.' },
      { id: 'C', text: 'Two competing gardening methods are described without preference.' },
      { id: 'D', text: 'A recommendation is made and then supported with several examples.' },
    ],
    answer: 'A',
    explanation: 'The passage concedes ("sound as far as it goes"), turns with "But", and introduces a cost the advice ignores. Concession followed by qualification is the shape.',
    distractorNotes: {
      B: 'The advice is never called mistaken — the passage explicitly grants that it is sound about evaporation.',
      C: 'A preference is expressed in the final sentence.',
      D: 'The recommendation comes last rather than first, and no examples follow it.',
    },
  },
  {
    id: 'rw_tsp_102', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'easy', irt: { a: 1.0, b: -1.0 }, targetSeconds: 66,
    stimulus: { text: 'The word "salary" descends from the Latin for salt, and it is often repeated that Roman soldiers were paid in it. No ancient source says so. What the sources describe is an allowance for purchasing salt among other goods, which is a different arrangement and a duller story.' },
    prompt: 'What is the main purpose of the text?',
    choices: [
      { id: 'A', text: 'To correct a popular claim about the origin of a word.' },
      { id: 'B', text: 'To explain how Roman soldiers were compensated for their service.' },
      { id: 'C', text: 'To describe the importance of salt in the ancient economy.' },
      { id: 'D', text: 'To argue that etymology is an unreliable guide to history.' },
    ],
    answer: 'A',
    explanation: 'A purpose is a verb. The passage states a repeated claim, denies its evidential basis, and supplies what the sources actually say — the verb is "to correct".',
    distractorNotes: {
      B: 'An accurate description of a topic the passage touches. It is the vehicle for the correction, not the point of it.',
      C: 'Salt’s economic importance is never discussed.',
      D: 'A generalisation about etymology that the passage does not make from its single case.',
    },
  },
  {
    id: 'rw_tsp_103', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'easy', irt: { a: 1.05, b: -0.92 }, targetSeconds: 67,
    stimulus: { text: 'Octopuses have no rigid skeleton, so an animal the size of a football can pass through an opening the width of its beak — the only hard part of its body. Aquarium keepers learned this expensively. A tank that holds a fish of similar mass will not hold an octopus, and the difference is not strength but geometry.' },
    prompt: 'What is the main purpose of the text?',
    choices: [
      { id: 'A', text: 'To explain why a physical feature has a practical consequence for keeping the animal.' },
      { id: 'B', text: 'To describe the anatomy of the octopus in detail.' },
      { id: 'C', text: 'To criticise aquarium keepers for failing to secure their tanks.' },
      { id: 'D', text: 'To compare the strength of octopuses with that of fish.' },
    ],
    answer: 'A',
    explanation: 'The passage moves from an anatomical fact to what follows from it for tanks, and closes by naming the mechanism as geometry. Explaining a consequence is the verb.',
    distractorNotes: {
      B: 'Only one anatomical fact appears, and it is in service of the consequence.',
      C: '"Learned this expensively" is wry rather than critical, and no blame is assigned.',
      D: 'The final sentence explicitly says the difference is not strength.',
    },
  },
  {
    id: 'rw_tsp_104', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'easy', irt: { a: 1.0, b: -0.85 }, targetSeconds: 67,
    stimulus: { text: 'Consider a bridge that has had every plank and every rope replaced over two centuries. Is it the same bridge? The question is not really about bridges. It is the form philosophers use to ask what makes anything persist through change, and the bridge is convenient because nobody has strong feelings about planks.' },
    prompt: 'Which choice best states the function of the underlined sentence "The question is not really about bridges" in the text as a whole?',
    choices: [
      { id: 'A', text: 'It redirects the reader from the example to the problem the example stands for.' },
      { id: 'B', text: 'It concedes that the bridge example is poorly chosen.' },
      { id: 'C', text: 'It introduces a second example for comparison.' },
      { id: 'D', text: 'It summarises the argument made in the preceding sentences.' },
    ],
    answer: 'A',
    explanation: 'Read the neighbours. Before it, a bridge; after it, the general philosophical problem and why the bridge suits it. The sentence is the hinge that turns one into the other.',
    distractorNotes: {
      B: 'The last sentence defends the choice as convenient, so no concession is made.',
      C: 'No second example appears anywhere.',
      D: 'The preceding sentences pose a question rather than argue, so there is nothing yet to summarise.',
    },
  },
  {
    id: 'rw_tsp_105', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'easy', irt: { a: 1.05, b: -0.78 }, targetSeconds: 68,
    stimulus: { text: 'Early photographers of the American West sold their images as documents. Yet the same photographers routinely moved objects into frame, waited weeks for weather, and printed skies from separate negatives. None of this was hidden; the techniques were described in trade journals of the period. What has changed is not the practice but our expectation of what a photograph promises.' },
    prompt: 'Which choice best describes the overall structure of the text?',
    choices: [
      { id: 'A', text: 'A tension is set up, shown not to have troubled its own period, and relocated in the present.' },
      { id: 'B', text: 'A historical practice is described and then condemned as dishonest.' },
      { id: 'C', text: 'Two schools of early photography are contrasted.' },
      { id: 'D', text: 'A technical process is explained step by step.' },
    ],
    answer: 'A',
    explanation: 'Documents versus manipulation is the tension; "None of this was hidden" defuses it for the period; the final sentence moves the problem to present-day expectations. Three moves, in that order.',
    distractorNotes: {
      B: 'The passage takes pains to say the techniques were openly described, which withholds the charge of dishonesty.',
      C: 'One group of photographers is described, not two.',
      D: 'Techniques are listed as evidence, never explained as a process.',
    },
  },
  {
    id: 'rw_tsp_106', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'easy', irt: { a: 1.0, b: -0.7 }, targetSeconds: 68,
    stimulus: { text: 'A cook who has made a dish two hundred times stops measuring. This looks like carelessness and is closer to the opposite: the measuring was always a proxy for a judgement about texture, and after two hundred repetitions the judgement can be made directly. The recipe was scaffolding, and scaffolding is meant to come down.' },
    prompt: 'Which choice best states the function of the final sentence?',
    choices: [
      { id: 'A', text: 'It supplies an image that names what the preceding explanation has described.' },
      { id: 'B', text: 'It introduces a qualification that limits the preceding claim.' },
      { id: 'C', text: 'It provides evidence for the assertion made in the first sentence.' },
      { id: 'D', text: 'It acknowledges an objection a reader might raise.' },
    ],
    answer: 'A',
    explanation: 'The scaffolding image restates, in one figure, the point the middle sentence has just argued — that the recipe was a temporary support. Naming an argument is a different function from qualifying or evidencing it.',
    distractorNotes: {
      B: 'Nothing is limited; the image extends the point rather than narrowing it.',
      C: 'A metaphor is not evidence, and the first sentence is an observation rather than an assertion needing support.',
      D: 'The objection ("carelessness") is raised and answered in the second sentence, not here.',
    },
  },
  {
    id: 'rw_tsp_107', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'easy', irt: { a: 1.02, b: -0.62 }, targetSeconds: 68,
    stimulus: { text: 'The plague of 1348 reached Norway on a ship whose crew were already dead. Contemporary accounts record the vessel drifting into harbour at Bergen with its cargo of wool intact. Historians cite the episode less for its drama than for what it shows about how the disease travelled: not with armies or pilgrims but with trade, along routes that had been profitable for a century.' },
    prompt: 'What is the main purpose of the text?',
    choices: [
      { id: 'A', text: 'To use a single episode to establish how a disease was transmitted.' },
      { id: 'B', text: 'To recount a dramatic incident from the history of Bergen.' },
      { id: 'C', text: 'To describe the wool trade of fourteenth-century Norway.' },
      { id: 'D', text: 'To argue that contemporary accounts of the plague are unreliable.' },
    ],
    answer: 'A',
    explanation: 'The last sentence says explicitly why historians cite the episode: for what it shows about transmission. The ship is the instrument; the transmission route is the purpose.',
    distractorNotes: {
      B: 'The passage names the drama and then sets it aside — "less for its drama than".',
      C: 'Wool appears as cargo, and the trade itself is never described.',
      D: 'The accounts are used as evidence rather than doubted.',
    },
  },
  {
    id: 'rw_tsp_108', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'easy', irt: { a: 1.05, b: -0.55 }, targetSeconds: 69,
    stimulus: { text: 'Most accounts of the invention of the steam engine begin with Watt. Newcomen’s engine, however, had been pumping water out of mines for half a century before Watt saw one. Watt’s contribution was a separate condenser, which cut fuel use by three quarters. That is an enormous improvement and it is not an invention.' },
    prompt: 'Which choice best states the function of the final sentence?',
    choices: [
      { id: 'A', text: 'It draws the distinction the preceding facts were assembled to support.' },
      { id: 'B', text: 'It concedes that Watt’s contribution was less significant than usually claimed.' },
      { id: 'C', text: 'It introduces a new example of technological improvement.' },
      { id: 'D', text: 'It restates the common account described in the first sentence.' },
    ],
    answer: 'A',
    explanation: 'The passage lays out Newcomen’s priority and Watt’s improvement, then the last sentence names what they add up to: a distinction between improving and inventing. That is the conclusion the facts were for.',
    distractorNotes: {
      B: '"An enormous improvement" is explicit praise; the significance is granted while the label is refused.',
      C: 'No new example appears.',
      D: 'It corrects the common account rather than repeating it.',
    },
  },

  /* ================= Medium ================= */
  {
    id: 'rw_tsp_109', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'medium', irt: { a: 1.15, b: -0.02 }, targetSeconds: 76,
    stimulus: { text: 'Aldo Leopold spent a decade advocating the removal of predators from the national forests. He describes, in an essay written years later, watching "a fierce green fire dying" in the eyes of a wolf he had shot, and dates his change of mind from that afternoon. Readers have sometimes taken the passage as sentimental. It is better read as a piece of intellectual autobiography, since what follows it in the book is not feeling but a revised account of how mountains, deer, and wolves stand in relation.' },
    prompt: 'Which choice best describes the overall structure of the text?',
    choices: [
      { id: 'A', text: 'A biographical fact is given, a reading of it is reported and rejected, and a better reading is grounded in what follows the passage.' },
      { id: 'B', text: 'An author’s early views are described and then defended against later critics.' },
      { id: 'C', text: 'Two incompatible accounts of an author’s career are weighed and left unresolved.' },
      { id: 'D', text: 'A famous passage is quoted and its literary technique analysed in detail.' },
    ],
    answer: 'A',
    explanation: 'Four moves in order: Leopold’s early position, the wolf passage, the sentimental reading named and set aside, and the alternative supported by what the book does next.',
    distractorNotes: {
      B: 'The early views are what he abandoned; nothing defends them.',
      C: 'The passage settles the question — "It is better read as" — rather than leaving it open.',
      D: 'Six words are quoted and no technique is analysed.',
    },
  },
  {
    id: 'rw_tsp_110', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'medium', irt: { a: 1.18, b: 0.06 }, targetSeconds: 76,
    stimulus: { text: 'It is often observed that pandemic influenza emerges from places where people and poultry live in close contact. The observation is correct and incomplete. Close contact is necessary but not sufficient: the reassortment that produces a novel strain also requires a host susceptible to both an avian and a mammalian virus at once, which is why pigs appear in the epidemiological account far more often than their numbers would predict.' },
    prompt: 'What is the main purpose of the text?',
    choices: [
      { id: 'A', text: 'To supply a missing condition in a widely accepted explanation.' },
      { id: 'B', text: 'To refute the claim that human–poultry contact contributes to pandemics.' },
      { id: 'C', text: 'To describe the process by which influenza viruses reassort.' },
      { id: 'D', text: 'To recommend changes in how poultry and pigs are farmed.' },
    ],
    answer: 'A',
    explanation: '"Correct and incomplete" is the passage announcing its own purpose: the observation stands, and something is added — the intermediate host. Supplying the missing condition is the verb.',
    distractorNotes: {
      B: 'The passage calls the observation correct in its second sentence.',
      C: 'Reassortment is named as a mechanism in one clause, not described.',
      D: 'No recommendation is made anywhere.',
    },
  },
  {
    id: 'rw_tsp_111', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'medium', irt: { a: 1.15, b: 0.14 }, targetSeconds: 77,
    stimulus: { text: 'In the opening chapter of "Things Fall Apart", Achebe spends four pages on a wrestling match. Nothing in the plot turns on it. The match establishes, before any European appears, that the society has its own hierarchies, its own means of settling status, and its own idea of what a man is worth — so that when the missionaries arrive in the second half, the reader already knows what is being displaced.' },
    prompt: 'Which choice best states the function of the wrestling match in the novel, as the text describes it?',
    choices: [
      { id: 'A', text: 'It supplies the reader with the world whose disruption the later chapters depend on.' },
      { id: 'B', text: 'It introduces the conflict that the rest of the novel resolves.' },
      { id: 'C', text: 'It demonstrates Achebe’s skill at writing physical action.' },
      { id: 'D', text: 'It provides an accurate description of Igbo wrestling customs.' },
    ],
    answer: 'A',
    explanation: 'The passage says the match carries no plot weight, then gives its work: establishing the society’s own order so the later displacement registers. Function, not content.',
    distractorNotes: {
      B: 'Directly contradicted — "Nothing in the plot turns on it."',
      C: 'A judgement about craft that the passage never makes.',
      D: 'An accurate content statement, and the passage is about what the scene does rather than what it depicts.',
    },
  },
  {
    id: 'rw_tsp_112', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'medium', irt: { a: 1.2, b: 0.22 }, targetSeconds: 77,
    stimulus: { text: 'Building codes are usually written after a failure. The rules governing high-rise egress in most countries can be traced to specific fires, and the widths and distances they specify are not derived from theory but from what went wrong in a particular stairwell on a particular night. This is often described as a weakness of the codes. It is more accurately their method: a code that anticipated every failure would have to be written by someone who had already imagined them all.' },
    prompt: 'What is the main purpose of the text?',
    choices: [
      { id: 'A', text: 'To reframe an apparent flaw in a practice as the practice’s way of working.' },
      { id: 'B', text: 'To trace the history of high-rise fire regulations across several countries.' },
      { id: 'C', text: 'To argue that building codes should be derived from theory instead.' },
      { id: 'D', text: 'To describe how a specific fire led to a change in the law.' },
    ],
    answer: 'A',
    explanation: 'The passage grants the description ("often described as a weakness") and replaces it: "It is more accurately their method." Reframing a flaw as a method is the purpose.',
    distractorNotes: {
      B: 'No history is traced; the codes are mentioned generically.',
      C: 'The last sentence argues the opposite, that theory could not anticipate every failure.',
      D: 'No specific fire is described — "a particular stairwell" is deliberately unnamed.',
    },
  },
  {
    id: 'rw_tsp_113', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'medium', irt: { a: 1.15, b: 0.3 }, targetSeconds: 78,
    stimulus: { text: 'A river is not a thing so much as a rate. The Mississippi that flows past Memphis this afternoon shares no water with the Mississippi that flowed past yesterday, and its bed, banks, and load of sediment are all in motion too, only more slowly. Geographers who map a river are mapping a long-exposure photograph. This is why a boundary defined by a river needs a paragraph of law that a boundary defined by a fence does not.' },
    prompt: 'Which choice best states the function of the final sentence?',
    choices: [
      { id: 'A', text: 'It shows a practical consequence of the way of seeing the text has been developing.' },
      { id: 'B', text: 'It offers an objection to the comparison made in the preceding sentence.' },
      { id: 'C', text: 'It restates the opening claim in more concrete terms.' },
      { id: 'D', text: 'It introduces a legal topic that the rest of the text explores.' },
    ],
    answer: 'A',
    explanation: 'The passage builds a view — a river as process rather than object — and the final sentence cashes it out in law. Consequence, not restatement.',
    distractorNotes: {
      B: 'The sentence follows from the photograph comparison rather than objecting to it.',
      C: 'A tempting near-miss: it is concrete, but it adds a domain rather than restating the claim.',
      D: 'Nothing follows it — the sentence is the last in the text.',
    },
  },
  {
    id: 'rw_tsp_114', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'medium', irt: { a: 1.18, b: 0.36 }, targetSeconds: 78,
    stimulus: { text: 'When a language borrows a word, it usually borrows the thing as well. But English took "robot" from a 1920 Czech play about artificial workers who rebel, at a time when no such machine existed anywhere. For thirty years the word named nothing at all, then found a referent that had been built, in part, by engineers who had grown up reading about it.' },
    prompt: 'Which choice best describes the overall structure of the text?',
    choices: [
      { id: 'A', text: 'A general rule is stated, an exception is introduced, and the exception is followed to an unexpected result.' },
      { id: 'B', text: 'A word’s etymology is traced through several successive languages.' },
      { id: 'C', text: 'A claim about language is stated and then supported with several instances.' },
      { id: 'D', text: 'Two theories of linguistic borrowing are compared.' },
    ],
    answer: 'A',
    explanation: 'Rule, "But", counterexample, and then the twist — the word helped bring its own referent into being. Three moves, and the third is what the passage is for.',
    distractorNotes: {
      B: 'Only one borrowing, from Czech to English, is described.',
      C: 'The single case is a counterexample to the rule, not support for it.',
      D: 'No second theory appears.',
    },
  },
  {
    id: 'rw_tsp_115', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'medium', irt: { a: 1.15, b: 0.42 }, targetSeconds: 79,
    stimulus: { text: 'The conventional history of jazz recording treats the three-minute limit of the 78 rpm disc as a constraint that musicians endured. Recordings from the period suggest something stranger. Solos that had run to ten choruses in performance were compressed to two, and what survives is not a shortened version of the live music but a different music, one in which every phrase has to arrive already developed. The limit did not truncate the form; it produced one.' },
    prompt: 'What is the main purpose of the text?',
    choices: [
      { id: 'A', text: 'To argue that a technical restriction shaped an art form rather than merely limiting it.' },
      { id: 'B', text: 'To describe the technical characteristics of early recording media.' },
      { id: 'C', text: 'To explain why live jazz performances were longer than recordings.' },
      { id: 'D', text: 'To criticise historians for neglecting recordings from the period.' },
    ],
    answer: 'A',
    explanation: 'The passage sets "endured" against "produced" and closes on the second. The purpose is to replace a constraint with a generative force.',
    distractorNotes: {
      B: 'The three-minute limit is a premise; no technical description follows.',
      C: 'The length difference is evidence for the argument, not the point of it.',
      D: 'The conventional history is corrected, not the historians criticised for neglect.',
    },
  },
  {
    id: 'rw_tsp_116', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'medium', irt: { a: 1.2, b: 0.48 }, targetSeconds: 79,
    stimulus: { text: 'Mycorrhizal fungi were long treated as a curiosity of soil science. Then it became clear that they connect the root systems of neighbouring trees and move carbon and nitrogen between them. Popular accounts moved quickly to describing forests as cooperative networks. Ecologists have been more cautious, pointing out that a fungus moving carbon between two trees is not obviously doing so for the trees’ benefit, and that the same connection carries pathogens.' },
    prompt: 'Which choice best describes the overall structure of the text?',
    choices: [
      { id: 'A', text: 'A discovery is described, a popular interpretation of it is reported, and a specialist reservation is set against that interpretation.' },
      { id: 'B', text: 'A hypothesis is proposed and then tested against experimental evidence.' },
      { id: 'C', text: 'A phenomenon is described and its practical applications are surveyed.' },
      { id: 'D', text: 'Two competing accounts of a discovery are shown to be compatible.' },
    ],
    answer: 'A',
    explanation: 'Three stages, marked by "Then", "Popular accounts", and "Ecologists have been more cautious". The passage ends with the reservation rather than resolving it.',
    distractorNotes: {
      B: 'No hypothesis is tested; findings are reported and interpreted.',
      C: 'No applications appear.',
      D: 'The two readings are left in tension, not reconciled.',
    },
  },
  {
    id: 'rw_tsp_117', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'medium', irt: { a: 1.18, b: 0.54 }, targetSeconds: 79,
    stimulus: { text: 'Every map projection distorts. This is not a failure of cartography but a theorem: a sphere cannot be flattened without stretching, and a projection can preserve area or angle or distance along some lines, never all three at once. Arguments about which projection is honest are therefore arguments about which distortion one is willing to accept, and they are usually conducted as though a distortion-free option were being withheld.' },
    prompt: 'Which choice best states the function of the final sentence?',
    choices: [
      { id: 'A', text: 'It identifies a misconception that the preceding explanation exposes.' },
      { id: 'B', text: 'It offers a resolution to the debate the text has described.' },
      { id: 'C', text: 'It supplies the mathematical basis for the claim made earlier.' },
      { id: 'D', text: 'It gives an example of a projection that preserves area.' },
    ],
    answer: 'A',
    explanation: 'The theorem is established first; the final sentence says how debates proceed *as though* it were not true. Its work is to name the misconception the theorem exposes.',
    distractorNotes: {
      B: 'It diagnoses the debate rather than settling it.',
      C: 'The mathematical basis is in the second sentence; this one draws a consequence for how people argue.',
      D: 'No specific projection is named anywhere in the text.',
    },
  },

  /* ================= Hard ================= */
  {
    id: 'rw_tsp_118', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'hard', irt: { a: 1.28, b: 0.96 }, targetSeconds: 88,
    stimulus: { text: 'The standard objection to an inheritance tax is that the estate has already been taxed once, as income. The objection has force, and it has a structure worth noticing: it treats the estate rather than the recipient as the taxpayer. On the other description the money is being taxed once, on arrival, exactly as wages are. Neither description is a discovery about the world. Choosing between them is the argument, and it is usually conducted as though it had already been settled.' },
    prompt: 'Which choice best describes the overall structure of the text?',
    choices: [
      { id: 'A', text: 'An objection is granted, its hidden premise is exposed, an alternative premise is offered, and the choice between them is identified as the real dispute.' },
      { id: 'B', text: 'An argument for a tax is presented and then defended against two objections.' },
      { id: 'C', text: 'A policy is described, its history summarised, and its likely effects predicted.' },
      { id: 'D', text: 'Two economists’ positions are compared and one is shown to be better supported.' },
    ],
    answer: 'A',
    explanation: 'Four moves, each signposted: the objection has force; it treats the estate as taxpayer; the recipient description is offered; neither is a discovery, so the choice is the argument.',
    distractorNotes: {
      B: 'No argument for the tax is made — the passage stays at the level of how the dispute is framed.',
      C: 'No history and no predicted effects appear.',
      D: 'No economists are named and neither description is said to be better supported.',
    },
  },
  {
    id: 'rw_tsp_119', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'hard', irt: { a: 1.3, b: 1.04 }, targetSeconds: 89,
    stimulus: { text: 'Borges begins "Pierre Menard" with a bibliography. The list is scrupulous, dated, and entirely ordinary, and it occupies a third of a story whose subject is a man who rewrote Don Quixote word for word. By the time the extraordinary claim arrives, the reader has spent several minutes in the company of a narrator whose habits of citation are impeccable. The bibliography is not preamble. It is the machinery that makes the claim survivable.' },
    prompt: 'Which choice best states the function of the bibliography, as the text describes it?',
    choices: [
      { id: 'A', text: 'It establishes a credibility that the story’s central claim then borrows.' },
      { id: 'B', text: 'It provides readers with the sources necessary to verify the story’s claims.' },
      { id: 'C', text: 'It delays the central claim in order to build suspense.' },
      { id: 'D', text: 'It demonstrates that Menard was a genuine and productive scholar.' },
    ],
    answer: 'A',
    explanation: 'The passage says the reader spends time with an impeccable citer *before* the claim, and calls the list machinery that makes the claim survivable. Credibility built and then spent is the function.',
    distractorNotes: {
      B: 'Reads the fictional bibliography as an actual apparatus, which the passage’s argument depends on it not being.',
      C: 'Delay is what it does temporally; suspense is not what the passage says it is for.',
      D: 'A content reading of the list rather than an account of its work in the story.',
    },
  },
  {
    id: 'rw_tsp_120', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'hard', irt: { a: 1.28, b: 1.12 }, targetSeconds: 89,
    stimulus: { text: 'A common defence of difficult prose is that difficult ideas require it. The defence proves less than it appears to. It establishes that some difficulty is unavoidable, which nobody denies; it does not establish that any particular sentence’s difficulty is of that kind. Since the two are indistinguishable from inside the sentence, the defence is available to any writer at any time, which is a reason to distrust it rather than a reason it is false.' },
    prompt: 'What is the main purpose of the text?',
    choices: [
      { id: 'A', text: 'To show that a defence, while not refuted, cannot do the work it is asked to do.' },
      { id: 'B', text: 'To argue that difficult prose is generally a mask for weak thinking.' },
      { id: 'C', text: 'To distinguish between two kinds of difficulty in written prose.' },
      { id: 'D', text: 'To recommend that writers of difficult ideas simplify their sentences.' },
    ],
    answer: 'A',
    explanation: 'The final clause is explicit: a reason to distrust the defence "rather than a reason it is false". The purpose is to disarm without refuting, which choice A states exactly.',
    distractorNotes: {
      B: 'Stronger than the passage, which carefully declines to say the defence is false.',
      C: 'The distinction is a step in the argument, and the passage says the two cannot be told apart in practice.',
      D: 'No recommendation to writers is made.',
    },
  },
  {
    id: 'rw_tsp_121', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'hard', irt: { a: 1.3, b: 1.2 }, targetSeconds: 90,
    stimulus: { text: 'Restoration ecologists once aimed to return a site to its condition at some reference date, usually just before European settlement. The aim has quietly been abandoned, and not because it proved expensive. It proved incoherent: the reference condition was itself a moment in a sequence, shaped by burning regimes that indigenous communities had maintained for millennia, so restoring it meant either restoring those practices or freezing a snapshot that had never been static. What replaced the aim is a set of functional targets, which are harder to picture and easier to defend.' },
    prompt: 'Which choice best states the function of the sentence beginning "It proved incoherent"?',
    choices: [
      { id: 'A', text: 'It supplies the reason for an abandonment that the preceding sentence has ruled out one explanation for.' },
      { id: 'B', text: 'It introduces a criticism of indigenous burning practices.' },
      { id: 'C', text: 'It summarises the functional targets described in the final sentence.' },
      { id: 'D', text: 'It provides an example of a successful restoration project.' },
    ],
    answer: 'A',
    explanation: 'The previous sentence says "not because it proved expensive," leaving a reason owed. This sentence pays it. Its function is set up by the negation immediately before it.',
    distractorNotes: {
      B: 'The burning regimes are presented as the thing the reference condition depended on, not as a target of criticism.',
      C: 'The functional targets come afterwards and are not summarised here.',
      D: 'No project is described, successful or otherwise.',
    },
  },
  {
    id: 'rw_tsp_122', section: 'rw', domain: 'craft-structure', skill: 'text-structure-purpose',
    format: 'mcq', band: 'hard', irt: { a: 1.32, b: 1.26 }, targetSeconds: 90,
    stimulus: { text: 'Anyone arguing that a technology is neutral will eventually reach for the knife: it cuts bread and it cuts throats, and the difference lies in the hand. The analogy does real work and it has a limit that is easy to miss. A knife affords both uses about equally; a technology that makes one action trivial and the other laborious is not neutral in the same sense, whatever its designers intended. The interesting cases are never knives.' },
    prompt: 'Which choice best describes the overall structure of the text?',
    choices: [
      { id: 'A', text: 'An analogy is described, credited, bounded by a distinction, and then set aside as unrepresentative.' },
      { id: 'B', text: 'An analogy is introduced and then shown to rest on a factual mistake.' },
      { id: 'C', text: 'A claim about technology is defended against a common objection.' },
      { id: 'D', text: 'Two views of technological neutrality are presented and left unresolved.' },
    ],
    answer: 'A',
    explanation: 'Four beats: the knife analogy, "does real work", the affordance distinction that bounds it, and the closing line that the interesting cases are not knives — which sets the analogy aside rather than refuting it.',
    distractorNotes: {
      B: 'The passage credits the analogy and never calls it factually wrong.',
      C: 'The neutrality claim is the thing being limited, not defended.',
      D: 'The passage takes a clear position in its last two sentences.',
    },
  },
];
