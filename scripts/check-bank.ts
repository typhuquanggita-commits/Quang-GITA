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

const tacticIds = new Set(TACTICS.map((t) => t.id));
if (tacticIds.size !== TACTICS.length) problems.push('tactics: duplicate id');

console.log(`Tactics: ${TACTICS.length} across ${new Set(TACTICS.map((t) => t.family)).size} families`);
console.log(`Lessons: ${LESSONS.length} for ${skillIds.size} skills`);
console.log(`Topics:  ${TOPICS.length} with ${TOPICS.reduce((n, t) => n + t.types.length, 0)} question types`);
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
