/**
 * Bank integrity check.
 *
 * Runs the structural invariants over the item bank and prints a summary, so
 * a content change that breaks an item fails loudly in CI rather than
 * surfacing as a strange score months later.
 */

import { BANK, bankStats } from '../src/data/bank.ts';
import { DOMAINS, SECTION_SPEC } from '../src/data/blueprint.ts';
import { sprToNumber } from '../src/engine/scoring.ts';
import { LESSONS, TOPICS } from '../src/data/lesson-index.ts';
import { TACTICS } from '../src/data/tactics.ts';
import { VOCABULARY, vocabStats } from '../src/data/vocabulary.ts';
import { allCoursePlans, coverage, curriculumProblems } from '../src/engine/curriculum.ts';
import { SOLUTIONS, solutionStats } from '../src/data/solution-index.ts';
import { MUST_KNOW, mustKnowStats } from '../src/data/mustKnow.ts';

const problems: string[] = [];
const seen = new Set<string>();
const skillIds = new Set(DOMAINS.flatMap((d) => d.skills.map((s) => s.id)));

for (const q of BANK) {
  const where = q.id;

  if (seen.has(q.id)) problems.push(`${where}: duplicate id`);
  seen.add(q.id);

  if (!q.prompt.trim()) problems.push(`${where}: empty prompt`);
  if (q.explanation.trim().length < 20) problems.push(`${where}: explanation too thin`);
  if (q.irt.a <= 0) problems.push(`${where}: non-positive discrimination`);
  if (q.targetSeconds <= 0) problems.push(`${where}: no time target`);

  const domain = DOMAINS.find((d) => d.id === q.domain);
  if (!domain) {
    problems.push(`${where}: unknown domain ${q.domain}`);
  } else {
    if (domain.section !== q.section) problems.push(`${where}: domain belongs to ${domain.section}`);
    if (!domain.skills.some((s) => s.id === q.skill)) {
      problems.push(`${where}: skill ${q.skill} is not in domain ${q.domain}`);
    }
  }
  if (!skillIds.has(q.skill)) problems.push(`${where}: unknown skill ${q.skill}`);

  if (q.format === 'mcq') {
    const ids = q.choices?.map((c) => c.id) ?? [];
    if (ids.join(',') !== 'A,B,C,D') problems.push(`${where}: choices are ${ids.join(',') || 'missing'}`);
    if (!ids.includes(String(q.answer))) problems.push(`${where}: key ${q.answer} is not a choice`);

    const texts = (q.choices ?? []).map((c) => c.text.trim());
    if (new Set(texts).size !== texts.length) problems.push(`${where}: duplicate choice text`);
    if (texts.some((t) => t.length === 0)) problems.push(`${where}: empty choice`);
  } else {
    if (q.section !== 'math') problems.push(`${where}: grid-in outside Math`);
    const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
    if (answers.length === 0) problems.push(`${where}: no accepted answer`);
    for (const answer of answers) {
      if (sprToNumber(answer) === null) problems.push(`${where}: non-numeric grid-in key "${answer}"`);
    }
  }
}

/*
 * Uniqueness: no two items may pose the same question.
 *
 * A template emitting many instances draws fresh parameters each time, but
 * nothing forces those draws to differ — two instances can land on the same
 * numbers and ship as two items that are one item. A learner who meets both in
 * a revision sheet has been given a shorter sheet than they were promised, and
 * the second answer is a memory test.
 */
{
  const seenPrompt = new Map<string, string>();
  for (const q of BANK) {
    // Normalise whitespace only: two prompts that differ by a number are two
    // questions, and must not be collapsed.
    // Choices sorted: a reshuffle of the same question is the same question.
    const key = `${q.skill}|${q.prompt.replace(/\s+/g, ' ').trim()}|${(q.choices ?? [])
      .map((c) => c.text)
      .slice()
      .sort()
      .join('|')}`;
    const prior = seenPrompt.get(key);
    if (prior) problems.push(`${q.id}: poses the same question as ${prior}`);
    else seenPrompt.set(key, q.id);
  }
}

/* Depth: a two-stage adaptive form needs a routing module plus two pathways. */
const stats = bankStats();
for (const section of ['rw', 'math'] as const) {
  const needed = SECTION_SPEC[section].questionsPerModule * 2;
  if (stats.bySection[section] < needed) {
    problems.push(
      `${section}: ${stats.bySection[section]} items, needs at least ${needed} for a full form`,
    );
  }
}

/*
 * Coverage: every skill the platform can measure must also be teachable.
 * A skill that can be drilled but not explained sends a learner told it is
 * their weakest back to the same questions with nothing new to try.
 */
const lessonSkills = new Set(LESSONS.map((lesson) => lesson.skill));
for (const skill of skillIds) {
  if (!lessonSkills.has(skill)) problems.push(`lessons: no lesson for skill "${skill}"`);
}
for (const skill of lessonSkills) {
  if (!skillIds.has(skill)) problems.push(`lessons: lesson for unknown skill "${skill}"`);
}
{
  const counts = new Map<string, number>();
  for (const lesson of LESSONS) counts.set(lesson.skill, (counts.get(lesson.skill) ?? 0) + 1);
  for (const [skill, n] of counts) {
    if (n > 1) problems.push(`lessons: ${n} lessons for skill "${skill}"`);
  }
}

/*
 * Topic coverage: a skill that can be taught must also be recognisable and
 * consolidatable. A packet missing its đọc-vị sheet is a packet that teaches a
 * method without teaching when to reach for it.
 */
const topicSkills = new Set(TOPICS.map((topic) => topic.skill));
for (const skill of skillIds) {
  if (!topicSkills.has(skill)) problems.push(`topics: no topic data for skill "${skill}"`);
}
for (const skill of topicSkills) {
  if (!skillIds.has(skill)) problems.push(`topics: topic data for unknown skill "${skill}"`);
}

/*
 * Tactics: a tactic without its cost is a slogan.
 *
 * The costs field is what separates this treasury from a list of tips, and it
 * is the field most likely to be left thin when a new entry is added in a
 * hurry. So it is checked rather than trusted.
 */
for (const tactic of TACTICS) {
  const where = `tactic ${tactic.id}`;
  if (tactic.costs.trim().length < 60) problems.push(`${where}: costs field too thin to be a real caveat`);
  if (tactic.costsVi.trim().length < 40) problems.push(`${where}: no Vietnamese costs field`);
  if (tactic.move.length < 2) problems.push(`${where}: a single step is not a method`);
  if (tactic.move.length !== tactic.moveVi.length) problems.push(`${where}: the two languages give different steps`);
  if (tactic.demo.working.length !== tactic.demo.workingVi.length) {
    problems.push(`${where}: the worked demo differs between languages`);
  }
  if (tactic.sections.length === 0) problems.push(`${where}: applies to no section`);
  for (const skill of tactic.skills) {
    if (!skillIds.has(skill)) problems.push(`${where}: names unknown skill "${skill}"`);
  }
}

/*
 * Vocabulary.
 *
 * Three invariants, in order of how much damage they prevent.
 *
 * A word appearing twice across the six sets means a learner meets it twice
 * and the deck's stated size is a lie — the deck is assembled by
 * concatenation, so nothing else would catch it.
 *
 * A missing Vietnamese gloss makes the entry useless to the learners this is
 * built for, and it is invisible in an English-language review.
 *
 * And an example sentence that does not contain the word it teaches is the
 * quiet one: it reads perfectly, it is easy to write by accident when an
 * entry is edited, and it teaches nothing at all. The check allows the usual
 * inflections, so "synthesise" is satisfied by "synthesised".
 */

/*
 * English morphology, to the extent this check needs it. A matcher that does
 * not know "deferred" is a form of "defer" is not being strict — it is being
 * wrong, and it would push an author into writing a worse example sentence to
 * satisfy it.
 */
const IRREGULAR: Record<string, string[]> = {
  uphold: ['upheld', 'upholds', 'upholding'],
  undergo: ['underwent', 'undergone', 'undergoes', 'undergoing'],
  bear: ['bore', 'borne', 'bears', 'bearing'],
  found: ['founded', 'founds', 'founding'],
  bound: ['bounded', 'bounds', 'bounding'],
  lay: ['laid', 'lays', 'laying'],
  mean: ['meant', 'means', 'meaning'],
  wield: ['wielded', 'wields', 'wielding'],
};

function exampleUsesWord(word: string, example: string): boolean {
  const text = example.toLowerCase();
  const base = word.toLowerCase();
  const stem = base.replace(/e$/, '').replace(/y$/, '');
  // A final consonant doubles before a vowel suffix: defer → deferred.
  const doubled = /[bdglmnprt]$/.test(base) ? base + base.slice(-1) : base;

  const forms = new Set([
    base,
    `${base}s`, `${base}es`, `${base}d`, `${base}ed`, `${base}ing`, `${base}ly`,
    `${stem}e`, `${stem}es`, `${stem}ed`, `${stem}ing`, `${stem}ies`, `${stem}ied`,
    `${doubled}ed`, `${doubled}ing`,
    // British/American spelling of the -ise/-ize family runs both ways.
    base.replace(/ise$/, 'ize'), base.replace(/ize$/, 'ise'),
    base.replace(/ise$/, 'ized'), base.replace(/ise$/, 'izes'),
    base.replace(/our$/, 'or'), base.replace(/or$/, 'our'),
    ...(IRREGULAR[base] ?? []),
  ]);
  return [...forms].some((form) => new RegExp(`\\b${form}\\b`).test(text));
}

{
  const seenWord = new Map<string, string>();
  const seenVocabId = new Set<string>();

  for (const entry of VOCABULARY) {
    const where = `vocab ${entry.id} (${entry.word})`;

    if (seenVocabId.has(entry.id)) problems.push(`${where}: duplicate id`);
    seenVocabId.add(entry.id);

    const prior = seenWord.get(entry.word.toLowerCase());
    if (prior) problems.push(`${where}: the word already appears as ${prior}`);
    else seenWord.set(entry.word.toLowerCase(), entry.id);

    if (entry.definition.trim().length < 12) problems.push(`${where}: definition too thin`);
    if (entry.definitionVi.trim().length < 4) problems.push(`${where}: no Vietnamese gloss`);
    if (entry.synonyms.length === 0) problems.push(`${where}: no synonyms`);
    if (entry.synonyms.some((syn) => syn.toLowerCase() === entry.word.toLowerCase())) {
      problems.push(`${where}: lists itself as a synonym`);
    }

    if (!exampleUsesWord(entry.word, entry.example)) {
      problems.push(`${where}: the example does not use the word`);
    }

    // A trap is bilingual or it is not there: a Vietnamese learner who cannot
    // read the English caveat is exactly the learner the caveat is for.
    if ((entry.trap && !entry.trapVi) || (entry.trapVi && !entry.trap)) {
      problems.push(`${where}: the trap is given in only one language`);
    }

    if (entry.satSense) {
      if (!entry.satSense.glossVi.trim()) problems.push(`${where}: second sense has no Vietnamese`);
      if (!exampleUsesWord(entry.word, entry.satSense.example)) {
        problems.push(`${where}: the second-sense example does not use the word`);
      }
      if (entry.satSense.gloss.trim().toLowerCase() === entry.definition.trim().toLowerCase()) {
        problems.push(`${where}: the "second" sense repeats the first`);
      }
    }
  }
}

/*
 * Curriculum.
 *
 * The syllabus is the one document that references almost everything else, so
 * it is the one most exposed to a rename somewhere far away. A dead reference
 * here does not throw: it produces a session with no material in it, and the
 * first person to discover that is a teacher in front of a class. So it is
 * checked, including the coverage rule — a skill the platform can diagnose
 * and no course can teach means the learner is told what is wrong and sent
 * nowhere.
 */
for (const problem of curriculumProblems([...skillIds])) problems.push(problem);

/*
 * Expert solutions.
 *
 * The field that makes this library worth having is `wrongTurn`, and it is
 * also the field an author under time pressure writes thinly — "a careless
 * error" is not a wrong turn, it is a shrug. So it is checked for substance,
 * and so is the requirement that every measurable skill has at least one:
 * a skill with no expert solution is a skill where the platform can say what
 * to do and not how an expert decides.
 */
{
  const seenSolution = new Set<string>();
  const withSolution = new Set(SOLUTIONS.map((s) => s.skill));

  for (const solution of SOLUTIONS) {
    const where = `solution ${solution.id}`;
    if (seenSolution.has(solution.id)) problems.push(`${where}: duplicate id`);
    seenSolution.add(solution.id);

    if (!skillIds.has(solution.skill)) problems.push(`${where}: unknown skill "${solution.skill}"`);
    if (solution.seconds < 20 || solution.seconds > 180) problems.push(`${where}: implausible timing`);
    if (solution.steps.length < 2) problems.push(`${where}: a single step is not a solution`);

    if (solution.read.trim().length < 80) problems.push(`${where}: the read is too thin to be a read`);
    if (solution.readVi.trim().length < 50) problems.push(`${where}: the read is not bilingual`);
    if (solution.transfer.trim().length < 60) problems.push(`${where}: nothing generalises`);
    if (solution.transferVi.trim().length < 40) problems.push(`${where}: transfer is not bilingual`);

    for (const step of solution.steps) {
      if (step.act.trim().length < 25) problems.push(`${where}: a step with no action`);
      if (step.why.trim().length < 40) problems.push(`${where}: a step asserted rather than justified`);
      if (!step.actVi.trim() || !step.whyVi.trim()) problems.push(`${where}: a step is not bilingual`);
    }

    // The wrong turn carries the value. "Careless error" is a shrug, not a path.
    if (solution.wrongTurn.path.trim().length < 80) problems.push(`${where}: the wrong turn is not a path`);
    if (solution.wrongTurn.breaks.trim().length < 100) problems.push(`${where}: the wrong turn does not say where it breaks`);
    if (!solution.wrongTurn.pathVi.trim() || !solution.wrongTurn.breaksVi.trim()) {
      problems.push(`${where}: the wrong turn is not bilingual`);
    }

    if (solution.choices) {
      const ids = solution.choices.map((c) => c.id);
      if (!ids.includes(solution.answer)) problems.push(`${where}: the key is not among the choices`);
      if (new Set(ids).size !== ids.length) problems.push(`${where}: duplicate choice id`);
    }
  }

  for (const skill of skillIds) {
    if (!withSolution.has(skill)) problems.push(`solutions: no expert solution for "${skill}"`);
  }
}

/*
 * The must-know reference.
 *
 * The `given` flag is what makes this document useful rather than another
 * formula list — it is the difference between "here is everything" and "here
 * is what the exam withholds". Marking a fact as given when it is not would
 * send a candidate into the hall expecting a formula that never arrives, so
 * the count is pinned rather than trusted.
 *
 * `cost` is the other load-bearing field: it is why a fact is on the list at
 * all, and a cost of zero would mean an entry with no reason to be memorised.
 */
{
  const seenFact = new Set<string>();
  for (const fact of MUST_KNOW) {
    const where = `must-know ${fact.id}`;
    if (seenFact.has(fact.id)) problems.push(`${where}: duplicate id`);
    seenFact.add(fact.id);

    if (fact.cost < 5) problems.push(`${where}: no cost, so no reason to memorise it`);
    if (fact.cost > 60) problems.push(`${where}: a minute of derivation is a lesson, not a fact`);
    // A bare identity is a complete statement and can be legitimately short —
    // "x⁰ = 1" needs no elaboration — so the floor is low enough not to force
    // padding, and the bilingual check below is what actually catches a
    // half-written entry.
    if (fact.fact.trim().length < 12) problems.push(`${where}: the fact is not stated`);
    if (!fact.factVi.trim() || !fact.whyVi.trim()) problems.push(`${where}: not bilingual`);
    if (fact.why.trim().length < 50) problems.push(`${where}: no reason recall beats derivation`);
    if (fact.why.toLowerCase().includes('because it is on the test')) {
      problems.push(`${where}: "it is on the test" is not a reason`);
    }
    if (!fact.drill.prompt.trim() || !fact.drill.answer.trim()) {
      problems.push(`${where}: no drill, so it cannot be self-tested`);
    }
    if (!fact.drill.promptVi.trim()) problems.push(`${where}: the drill is not bilingual`);
  }

  /*
   * The official reference sheet carries six formulas and three facts. If this
   * count drifts far from that, either the sheet has changed or an entry has
   * been mislabelled — and a candidate expecting a formula that never arrives
   * is the worse of the two failures.
   */
  const given = MUST_KNOW.filter((f) => f.given).length;
  if (given > 9) problems.push(`must-know: ${given} entries claim to be on the reference sheet, which carries nine`);
}

const tacticIds = new Set(TACTICS.map((t) => t.id));
if (tacticIds.size !== TACTICS.length) problems.push('tactics: duplicate id');

console.log(`Tactics: ${TACTICS.length} across ${new Set(TACTICS.map((t) => t.family)).size} families`);
console.log(`Lessons: ${LESSONS.length} for ${skillIds.size} skills`);
{
  const v = vocabStats();
  console.log(
    `Vocab: ${v.total} words (tier 1 ${v.byTier[1]}, tier 2 ${v.byTier[2]}, tier 3 ${v.byTier[3]}) — ` +
      `${v.withSecondSense} with a second meaning, ${v.withTrap} with a named trap`,
  );
}
console.log(`Topics:  ${TOPICS.length} with ${TOPICS.reduce((n, t) => n + t.types.length, 0)} question types`);
{
  const mk = mustKnowStats();
  console.log(
    `Must know: ${mk.total} facts — ${mk.given} on the reference sheet, ${mk.mustCarry} the candidate carries; ` +
      `${mk.costIfDerived}s per module lost by deriving instead of recalling`,
  );
}
{
  const sol = solutionStats();
  console.log(
    `Solutions: ${sol.total} expert walkthroughs over ${sol.skills} skills — ` +
      `${sol.hard} at hard band, ${sol.wrongTurns} documented wrong turns, ${sol.meanSeconds}s mean expert time`,
  );
}
{
  const plans = allCoursePlans();
  const cov = coverage([...skillIds]);
  console.log(
    `Courses: ${plans.length} — ${plans.reduce((n, p) => n + p.totalSessions, 0)} sessions, ` +
      `${plans.reduce((n, p) => n + p.classHours, 0).toFixed(0)} class hours, ` +
      `covering ${cov.taught.length}/${skillIds.size} measurable skills`,
  );
}
console.log(`Bank: ${stats.total} items (${stats.bySection.rw} R&W, ${stats.bySection.math} Math)`);
console.log(`Formats: ${stats.total - stats.sprCount} multiple choice, ${stats.sprCount} grid-in`);
console.log(`Bands: ${Object.entries(stats.byBand).map(([k, v]) => `${k} ${v}`).join(', ')}`);
console.log(`Provenance: ${stats.authored} authored, ${stats.generated} generated`);

if (problems.length > 0) {
  console.error(`\n${problems.length} problem(s):`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log('\nAll bank invariants hold.');
