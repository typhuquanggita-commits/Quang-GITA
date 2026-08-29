import { describe, expect, it } from 'vitest';
import {
  abilityForAccuracy,
  abilityStandardError,
  estimateAbility,
  expectedAccuracy,
  probabilityCorrect,
} from '../src/lib/ability';
import { readiness, updateMastery, currentStreak } from '../src/lib/analytics';
import type { Question } from '../src/types';

const question = (difficulty: 1 | 2 | 3 | 4 | 5): Question => ({
  id: `q${difficulty}`,
  section: 'quantitative',
  topicId: 'quantitative.algebra',
  format: 'mcq',
  stem: '',
  answer: 'A',
  explanation: '',
  difficulty,
  estimatedSeconds: 60,
  skills: [],
});

describe('mô hình Rasch', () => {
  it('không có dữ liệu thì trả về mức trung tính', () => {
    expect(estimateAbility([])).toBe(0);
  });

  it('làm đúng câu khó cho năng lực cao hơn làm đúng câu dễ', () => {
    const hard = estimateAbility(Array.from({ length: 10 }, () => ({ difficulty: 5, correct: true })));
    const easy = estimateAbility(Array.from({ length: 10 }, () => ({ difficulty: 1, correct: true })));
    expect(hard).toBeGreaterThan(easy);
  });

  it('không phân kỳ khi đúng hết hoặc sai hết', () => {
    const all = estimateAbility(Array.from({ length: 50 }, () => ({ difficulty: 3, correct: true })));
    const none = estimateAbility(Array.from({ length: 50 }, () => ({ difficulty: 3, correct: false })));
    expect(Number.isFinite(all)).toBe(true);
    expect(Number.isFinite(none)).toBe(true);
    expect(all).toBeLessThanOrEqual(4);
    expect(none).toBeGreaterThanOrEqual(-4);
  });

  it('càng nhiều dữ liệu thì sai số càng nhỏ', () => {
    const few = abilityStandardError(0, [{ difficulty: 3, correct: true }]);
    const many = abilityStandardError(0, Array.from({ length: 40 }, () => ({ difficulty: 3, correct: true })));
    expect(many).toBeLessThan(few);
  });

  it('xác suất đúng tăng đơn điệu theo năng lực', () => {
    expect(probabilityCorrect(-2, 0)).toBeLessThan(probabilityCorrect(0, 0));
    expect(probabilityCorrect(0, 0)).toBeLessThan(probabilityCorrect(2, 0));
  });

  it('nghịch đảo tỉ lệ đúng nhất quán với hàm xuôi', () => {
    const theta = abilityForAccuracy(0.8);
    expect(expectedAccuracy(theta)).toBeCloseTo(0.8, 2);
  });
});

describe('độ thành thạo', () => {
  it('sai câu dễ kéo xuống mạnh hơn sai câu khó', () => {
    const base = updateMastery(undefined, question(3), true, 1000);
    const wrongEasy = updateMastery(base, question(1), false, 1000);
    const wrongHard = updateMastery(base, question(5), false, 1000);
    expect(wrongEasy.mastery).toBeLessThan(wrongHard.mastery);
  });

  it('càng nhiều dữ liệu thì càng ổn định, không nhảy vọt', () => {
    let m = updateMastery(undefined, question(3), true, 1000);
    for (let i = 0; i < 30; i += 1) m = updateMastery(m, question(3), true, 1000);
    const before = m.mastery;
    const after = updateMastery(m, question(3), false, 1000).mastery;
    expect(before - after).toBeLessThan(0.1);
  });
});

describe('chỉ số sẵn sàng', () => {
  it('đạt mục tiêu và học đều thì chỉ số cao', () => {
    const value = readiness({
      projectedScore: 140,
      targetScore: 140,
      topicsPracticed: 20,
      topicsTotal: 20,
      activeDaysLast14: 14,
      paceRatio: 0.8,
      overdueCards: 0,
      totalCards: 30,
    });
    expect(value.score).toBeGreaterThan(90);
  });

  it('làm quá giờ kéo trụ cột tốc độ xuống', () => {
    const slow = readiness({
      projectedScore: 100, targetScore: 140, topicsPracticed: 10, topicsTotal: 20,
      activeDaysLast14: 5, paceRatio: 1.6, overdueCards: 0, totalCards: 0,
    });
    const onTime = readiness({
      projectedScore: 100, targetScore: 140, topicsPracticed: 10, topicsTotal: 20,
      activeDaysLast14: 5, paceRatio: 0.8, overdueCards: 0, totalCards: 0,
    });
    expect(slow.pace).toBeLessThan(onTime.pace);
    expect(slow.score).toBeLessThan(onTime.score);
  });
});

describe('chuỗi ngày học', () => {
  it('hôm nay chưa học vẫn không làm đứt chuỗi của hôm qua', () => {
    const today = new Date(2026, 4, 10);
    const days = {
      '2026-05-09': { date: '2026-05-09', questions: 10, correct: 8, minutes: 12 },
      '2026-05-08': { date: '2026-05-08', questions: 10, correct: 8, minutes: 12 },
    };
    expect(currentStreak(days, today)).toBe(2);
  });

  it('ngày trống làm đứt chuỗi', () => {
    const today = new Date(2026, 4, 10);
    const days = {
      '2026-05-09': { date: '2026-05-09', questions: 10, correct: 8, minutes: 12 },
      '2026-05-07': { date: '2026-05-07', questions: 10, correct: 8, minutes: 12 },
    };
    expect(currentStreak(days, today)).toBe(1);
  });
});
