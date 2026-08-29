/**
 * Topic packets.
 *
 * Two properties matter more than the rest, and both are about honesty rather
 * than correctness. A packet must not reuse an item across its own sheets — a
 * learner who meets the same question on the advanced sheet and again on the
 * exam sheet has been given a memory test. And it must not pad a thin topic
 * without saying so, because practising a domain while believing you are
 * practising a topic is a silent misreading of your own progress.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildPacket,
  packetIsThin,
  packetMinutes,
  packetProgress,
  PRACTICE_SHEETS,
  SHEET_ORDER,
  type SheetKind,
} from '../src/engine/packets.ts';
import { LESSONS, TOPICS } from '../src/data/lesson-index.ts';
import { BANK } from '../src/data/bank.ts';
import { DOMAINS } from '../src/data/blueprint.ts';

const skillIds = DOMAINS.flatMap((d) => d.skills.map((s) => s.id));

test('every blueprint skill has a packet, and it has all seven sheets', () => {
  for (const skill of skillIds) {
    const packet = buildPacket(skill, BANK);
    assert.ok(packet, `no packet for ${skill}`);
    for (const kind of SHEET_ORDER) {
      assert.ok(packet!.sheets[kind], `${skill}: missing sheet ${kind}`);
    }
    assert.equal(Object.keys(packet!.sheets).length, 7);
  }
});

test('a packet never repeats an item across its own sheets', () => {
  for (const skill of skillIds) {
    const packet = buildPacket(skill, BANK)!;
    const seen = new Set<string>();
    for (const kind of PRACTICE_SHEETS) {
      for (const question of packet.sheets[kind].questions) {
        assert.ok(
          !seen.has(question.id),
          `${skill}: ${question.id} appears on more than one sheet — the second sitting would be a memory test`,
        );
        seen.add(question.id);
      }
    }
  }
});

test('on-skill items are used before the domain is opened', () => {
  for (const skill of skillIds) {
    const packet = buildPacket(skill, BANK)!;
    const available = BANK.filter((q) => q.skill === skill).length;
    const usedOnSkill = PRACTICE_SHEETS.reduce(
      (n, kind) => n + packet.sheets[kind].provenance.onSkill,
      0,
    );
    const borrowed = PRACTICE_SHEETS.reduce(
      (n, kind) => n + packet.sheets[kind].provenance.fromDomain,
      0,
    );

    assert.ok(usedOnSkill <= available, `${skill}: used more on-skill items than exist`);
    if (borrowed > 0) {
      assert.equal(
        usedOnSkill,
        available,
        `${skill}: borrowed from the domain while on-skill items were still unused`,
      );
    }
  }
});

test('a sheet reports how it was filled rather than hiding it', () => {
  for (const skill of skillIds) {
    const packet = buildPacket(skill, BANK)!;
    for (const kind of PRACTICE_SHEETS) {
      const sheet = packet.sheets[kind];
      const { onSkill, fromDomain, short } = sheet.provenance;
      assert.equal(
        onSkill + fromDomain,
        sheet.questions.length,
        `${skill}/${kind}: provenance does not account for every question`,
      );
      assert.ok(short >= 0);
      // A shortfall means the bank ran out, never that the sheet quietly shrank
      // its own target.
      if (short > 0) {
        assert.ok(sheet.questions.length < 10, `${skill}/${kind}: reported short while full`);
      }
    }
  }
});

test('every question on a sheet belongs to the topic’s own section', () => {
  for (const skill of skillIds) {
    const packet = buildPacket(skill, BANK)!;
    for (const kind of PRACTICE_SHEETS) {
      for (const question of packet.sheets[kind].questions) {
        assert.equal(
          question.section,
          packet.section,
          `${skill}/${kind}: a ${question.section} item on a ${packet.section} sheet`,
        );
      }
    }
  }
});

test('the advanced sheet is harder than the revision sheet where the bank allows', () => {
  // Measured across the whole bank rather than asserted per topic: with one to
  // thirteen items per skill, an individual topic can have no hard items at all.
  const weight = { easy: 0, medium: 1, hard: 2 } as const;
  let advanced = 0;
  let revision = 0;
  let advancedCount = 0;
  let revisionCount = 0;

  for (const skill of skillIds) {
    const packet = buildPacket(skill, BANK)!;
    for (const q of packet.sheets.advanced.questions) {
      advanced += weight[q.band];
      advancedCount += 1;
    }
    for (const q of packet.sheets.revision.questions) {
      revision += weight[q.band];
      revisionCount += 1;
    }
  }

  assert.ok(advancedCount > 0 && revisionCount > 0);
  assert.ok(
    advanced / advancedCount > revision / revisionCount,
    'the advanced sheet must skew harder than revision',
  );
});

test('reading sheets carry no questions and practice sheets carry no reading', () => {
  const packet = buildPacket('transitions', BANK)!;
  for (const kind of SHEET_ORDER) {
    const sheet = packet.sheets[kind];
    if (PRACTICE_SHEETS.includes(kind)) {
      assert.ok(sheet.minutes > 0);
    } else {
      assert.equal(sheet.questions.length, 0, `${kind} must not carry questions`);
      assert.ok(sheet.minutes > 0, `${kind} must still state a reading time`);
    }
  }
  assert.equal(packet.sheets.exam.timed, true, 'the exam sheet is the one under a clock');
  assert.equal(packet.sheets.revision.timed, false, 'a clock suppresses retrieval');
});

test('progress points at the first unfinished sheet, not the one after the last done', () => {
  // A learner who skipped recognition is sent back to it. Carrying them past it
  // is what produces someone who knows a method and cannot tell when it applies.
  const skipped: SheetKind[] = ['theory', 'method', 'advanced'];
  const progress = packetProgress(skipped);

  assert.equal(progress.next, 'recognition');
  assert.deepEqual(progress.done, ['theory', 'method', 'advanced']);
  assert.ok(Math.abs(progress.share - 3 / 7) < 1e-9);
});

test('a finished packet has no next sheet', () => {
  const progress = packetProgress(SHEET_ORDER);
  assert.equal(progress.next, null);
  assert.equal(progress.share, 1);
});

test('finishing the same sheet twice does not inflate progress', () => {
  const progress = packetProgress(['theory', 'theory', 'theory'] as SheetKind[]);
  assert.deepEqual(progress.done, ['theory']);
  assert.ok(Math.abs(progress.share - 1 / 7) < 1e-9);
});

test('progress is reported in delivery order regardless of completion order', () => {
  const progress = packetProgress(['exam', 'theory', 'method'] as SheetKind[]);
  assert.deepEqual(progress.done, ['theory', 'method', 'exam']);
});

test('a thin topic is flagged rather than presented as complete', () => {
  /*
   * Held against a bank starved on purpose rather than against whichever
   * skill happens to be thinnest today. The shipped bank used to supply that
   * case by accident, and when authoring filled the last thin skill the test
   * started asserting that a well-stocked topic is thin. A property about
   * honest reporting should not depend on the bank staying poor.
   */
  const starved = 'transitions';
  const onSkill = BANK.filter((q) => q.skill === starved);
  assert.ok(onSkill.length > 1, 'fixture needs a skill with items to remove');

  const thinBank = BANK.filter((q) => q.skill !== starved || q.id === onSkill[0].id);
  const packet = buildPacket(starved, thinBank)!;
  assert.ok(packetIsThin(packet), 'a packet built on one on-topic item was not flagged');
});

test('no shipped topic is thin enough to need the warning', () => {
  /*
   * The other half of the same property. Every skill now holds enough items
   * to fill its own practice sheets, so a learner working a packet is
   * working that topic and not its domain. If authoring ever falls behind a
   * blueprint change, this fails before a padded packet reaches anyone.
   */
  const thin = skillIds.filter((skill) => packetIsThin(buildPacket(skill, BANK)!));
  assert.deepEqual(thin, [], `padded packets: ${thin.join(', ')}`);
});

test('every packet states a realistic total working time', () => {
  for (const skill of skillIds) {
    const minutes = packetMinutes(buildPacket(skill, BANK)!);
    assert.ok(minutes >= 60 && minutes <= 180, `${skill}: ${minutes} minutes`);
  }
});

test('topic data covers every lesson, bilingually, with cues that identify', () => {
  assert.equal(TOPICS.length, LESSONS.length);
  for (const topic of TOPICS) {
    assert.ok(topic.types.length >= 2, `${topic.skill}: ${topic.types.length} question types`);
    for (const type of topic.types) {
      for (const [en, vi] of [
        [type.name, type.nameVi],
        [type.cue, type.cueVi],
        [type.move, type.moveVi],
      ]) {
        assert.ok(en.trim().length > 0, `${topic.skill}: empty English field`);
        assert.ok(vi.trim().length > 0, `${topic.skill}: empty Vietnamese field`);
      }
    }
    assert.ok(topic.secure.length >= 3, `${topic.skill}: too few consolidation criteria`);
    assert.equal(
      topic.secure.length,
      topic.secureVi.length,
      `${topic.skill}: the two languages list different criteria`,
    );
    assert.ok(topic.regression.trim().length >= 40, `${topic.skill}: regression note too thin`);
    assert.ok(topic.regressionVi.trim().length >= 20, `${topic.skill}: no regression note (vi)`);
  }
});

test('an unknown skill yields no packet rather than an empty one', () => {
  assert.equal(buildPacket('not-a-skill', BANK), null);
});
