import { describe, expect, it } from 'vitest';
import { SECTIONS } from '../src/config';
import { findQuestion } from '../src/data/questions';
import { TOPICS } from '../src/data/topics';
import {
  ITEMS_PER_SECTION,
  MAX_PLACEMENT_LEVEL,
  PLACEMENT_TOTAL,
  blendMastery,
  buildPlacement,
  levelForMastery,
  nextQuestion,
  sectionAt,
  stageForLevels,
  type PlacementAnswer,
} from '../src/lib/placement';
import { topicsInScope } from '../src/lib/section3';
import { createInitialState } from '../src/lib/storage';
import type { Section3Choice } from '../src/types';
import { reducer } from '../src/store/reducer';

/** Lam ca bai voi mot ti le dung co dinh, tra ve danh sach cau tra loi. */
const ENGLISH = { mode: 'english' } as const;

function run(accuracy: number, section3: Section3Choice = ENGLISH): PlacementAnswer[] {
  const answers: PlacementAnswer[] = [];
  for (let i = 0; i < PLACEMENT_TOTAL; i += 1) {
    const question = nextQuestion(answers, section3);
    if (!question) break;
    // Deterministic: dung `accuracy` cau dau moi nhom 10 cau.
    const correct = i % 10 < Math.round(accuracy * 10);
    answers.push({
      questionId: question.id,
      value: correct ? question.answer : 'sai',
      correct,
      timeSpentMs: 45_000,
      confidence: 'sure',
    });
  }
  return answers;
}

describe('bài kiểm tra định vị', () => {
  it('đủ 36 câu, chia đều ba phần thi, không lặp câu nào', () => {
    const answers = run(0.6);
    expect(answers).toHaveLength(PLACEMENT_TOTAL);
    expect(new Set(answers.map((a) => a.questionId)).size).toBe(PLACEMENT_TOTAL);

    for (const [i, spec] of SECTIONS.entries()) {
      const mine = answers.slice(i * ITEMS_PER_SECTION, (i + 1) * ITEMS_PER_SECTION);
      expect(mine).toHaveLength(ITEMS_PER_SECTION);
      for (const answer of mine) {
        expect(findQuestion(answer.questionId)?.section, answer.questionId).toBe(spec.id);
      }
    }
  });

  it('phủ hết chuyên đề của một phần trước khi lấy câu thứ hai của chuyên đề nào', () => {
    // Mot bai dinh vi bo qua han mot chuyen de se de lai lo hong khong ai biet.
    const answers = run(0.5);
    for (const spec of SECTIONS) {
      const topics = topicsInScope(ENGLISH, TOPICS).filter((t) => t.section === spec.id);
      const touched = new Set(
        answers
          .map((a) => findQuestion(a.questionId))
          .filter((q) => q?.section === spec.id)
          .map((q) => q?.topicId),
      );
      for (const topic of topics) expect(touched.has(topic.id), topic.id).toBe(true);
    }
  });

  it('chọn thích ứng: làm đúng nhiều thì câu sau khó lên', () => {
    const strong = run(1);
    const weak = run(0);
    const mean = (xs: PlacementAnswer[]) => {
      const later = xs.slice(6, ITEMS_PER_SECTION);
      const d: number[] = later.map((a) => findQuestion(a.questionId)?.difficulty ?? 0);
      return d.reduce((n, x) => n + x, 0) / d.length;
    };
    expect(mean(strong)).toBeGreaterThan(mean(weak));
  });

  it('cùng một chuỗi trả lời luôn cho ra cùng một đề', () => {
    expect(run(0.7).map((a) => a.questionId)).toEqual(run(0.7).map((a) => a.questionId));
  });

  it('không bao giờ xếp quá cấp 4 — 12 câu không chứng minh được cấp 5–6', () => {
    const outcome = buildPlacement(run(1), ENGLISH, 600_000);
    for (const level of Object.values(outcome.record.startingLevels)) {
      expect(level).toBeLessThanOrEqual(MAX_PLACEMENT_LEVEL);
      expect(level).toBeGreaterThanOrEqual(1);
    }
  });

  it('làm tốt thì điểm dự báo và cấp khởi điểm cao hơn hẳn làm kém', () => {
    const strong = buildPlacement(run(1), ENGLISH, 600_000);
    const weak = buildPlacement(run(0), ENGLISH, 600_000);
    expect(strong.record.projected).toBeGreaterThan(weak.record.projected);
    const avg = (o: typeof strong) => {
      const xs = Object.values(o.record.startingLevels);
      return xs.reduce((n, x) => n + x, 0) / xs.length;
    };
    expect(avg(strong)).toBeGreaterThan(avg(weak));
  });

  it('mọi câu sai đều được đưa thẳng vào sổ tay lỗi sai', () => {
    const answers = run(0.5);
    const outcome = buildPlacement(answers, ENGLISH, 600_000);
    for (const answer of answers.filter((a) => !a.correct)) {
      expect(outcome.srs[answer.questionId]?.reason, answer.questionId).toBe('wrong');
    }
  });

  it('đúng nhưng tự nhận là đoán thì vẫn vào sổ tay, đánh dấu "may"', () => {
    const answers = run(1).map((a) => ({ ...a, confidence: 'guess' as const }));
    const outcome = buildPlacement(answers, ENGLISH, 600_000);
    expect(Object.values(outcome.srs).every((c) => c.reason === 'lucky')).toBe(true);
  });

  it('trộn có co ngót: một câu sai duy nhất không kéo cả tuyến xuống đáy', () => {
    // Muc phan thi 0.8, chuyen de 0/1 → khong duoc phep ra 0.
    const blended = blendMastery(0.8, 0, 1);
    expect(blended).toBeGreaterThan(0.4);
    expect(blended).toBeLessThan(0.8);
    // Mau cang day thi anh huong cua muc phan thi cang nho.
    expect(blendMastery(0.8, 0, 8)).toBeLessThan(blended);
  });

  it('giai đoạn lấy trung vị, một tuyến mạnh không kéo cả chương trình lên', () => {
    expect(stageForLevels([1, 1, 1, 1, 6])).toBe(1);
    expect(stageForLevels([3, 3, 3])).toBe(2);
    expect(stageForLevels([])).toBe(1);
  });

  it('thang cấp độ thận trọng và đơn điệu', () => {
    let previous = 0;
    for (const m of [0, 0.3, 0.57, 0.6, 0.75, 0.9, 1]) {
      const level = levelForMastery(m);
      expect(level).toBeGreaterThanOrEqual(previous);
      previous = level;
    }
  });

  it('phần thi của từng câu đúng theo thứ tự làm bài', () => {
    expect(sectionAt(0)).toBe(SECTIONS[0]?.id);
    expect(sectionAt(ITEMS_PER_SECTION)).toBe(SECTIONS[1]?.id);
    expect(sectionAt(PLACEMENT_TOTAL - 1)).toBe(SECTIONS[2]?.id);
  });

  it('gieo điểm xuất phát nhưng không xóa tiến độ đã có', () => {
    const before = createInitialState();
    before.worksheets['PL-X'] = {
      worksheetId: 'PL-X',
      attempts: 1,
      bestRatio: 0.9,
      lastRatio: 0.9,
      passed: true,
      mastered: true,
      totalTimeMs: 600_000,
    };
    before.srs['giu-lai'] = {
      questionId: 'giu-lai',
      ease: 2.5,
      intervalDays: 7,
      due: 1,
      reps: 3,
      lapses: 0,
      reason: 'wrong',
    };

    const after = reducer(before, {
      type: 'placement/complete',
      answers: run(0.6),
      section3: ENGLISH,
      durationMs: 600_000,
      now: 1_000,
    });

    expect(after.placement).not.toBeNull();
    expect(after.worksheets['PL-X']?.mastered).toBe(true);
    // The cu phai giu nguyen lich on, khong bi bai dinh vi dat lai.
    expect(after.srs['giu-lai']?.intervalDays).toBe(7);
    expect(Object.keys(after.tracks).length).toBeGreaterThan(0);
  });
});
