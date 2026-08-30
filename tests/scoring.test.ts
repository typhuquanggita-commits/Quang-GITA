import { describe, expect, it } from 'vitest';
import { isCorrect, gradeAttempt, projectFullExamScore, scoreBand } from '../src/lib/scoring';
import { normalizeFillAnswer } from '../src/lib/format';
import { buildAttempt } from '../src/lib/exam';
import { findQuestion } from '../src/data/questions';
import type { Question, Response } from '../src/types';

const fill: Question = {
  id: 'x.1',
  section: 'quantitative',
  topicId: 'quantitative.arithmetic',
  format: 'fill',
  stem: 'Test',
  answer: '0,5',
  acceptedAnswers: ['1/2'],
  explanation: '',
  difficulty: 2,
  estimatedSeconds: 60,
  skills: [],
};

const mcq: Question = { ...fill, id: 'x.2', format: 'mcq', answer: 'B', choices: [
  { id: 'A', text: 'a' },
  { id: 'B', text: 'b' },
  { id: 'C', text: 'c' },
  { id: 'D', text: 'd' },
] };

describe('chuẩn hóa đáp án điền', () => {
  it('chấp nhận cả dấu phẩy và dấu chấm thập phân', () => {
    expect(normalizeFillAnswer('0,5')).toBe(normalizeFillAnswer('0.5'));
  });

  it('bỏ khoảng trắng thừa và số 0 vô nghĩa', () => {
    expect(normalizeFillAnswer('  10.50 ')).toBe('10.5');
    expect(normalizeFillAnswer('007')).toBe('7');
    expect(normalizeFillAnswer('4.0')).toBe('4');
  });

  it('giữ nguyên dấu âm', () => {
    expect(normalizeFillAnswer('-0,25')).toBe('-0.25');
  });
});

describe('chấm câu', () => {
  it('câu điền chấp nhận mọi biến thể được khai báo', () => {
    expect(isCorrect(fill, '0.5')).toBe(true);
    expect(isCorrect(fill, '0,50')).toBe(true);
    expect(isCorrect(fill, '1/2')).toBe(true);
    expect(isCorrect(fill, '0,6')).toBe(false);
  });

  it('bỏ trống luôn là sai, kể cả chuỗi rỗng', () => {
    expect(isCorrect(fill, null)).toBe(false);
    expect(isCorrect(fill, '')).toBe(false);
    expect(isCorrect(fill, '   ')).toBe(false);
  });

  it('câu trắc nghiệm so khớp đúng mã phương án', () => {
    expect(isCorrect(mcq, 'B')).toBe(true);
    expect(isCorrect(mcq, 'b')).toBe(false);
  });
});

describe('điểm dự báo', () => {
  it('phần chưa làm được coi là trung tính, không phải 0 điểm', () => {
    const projected = projectFullExamScore([]);
    expect(projected).toBeGreaterThan(70);
    expect(projected).toBeLessThan(80);
  });

  it('làm đúng câu khó cho điểm dự báo cao hơn làm đúng câu dễ', () => {
    const hard = projectFullExamScore([
      { section: 'quantitative', correct: 5, total: 5, answered: 5, score: 50, ability: 2.5, secondsPerQuestion: 60, luckyCorrect: 0, confidentWrong: 0 },
    ]);
    const easy = projectFullExamScore([
      { section: 'quantitative', correct: 5, total: 5, answered: 5, score: 50, ability: 0.5, secondsPerQuestion: 60, luckyCorrect: 0, confidentWrong: 0 },
    ]);
    expect(hard).toBeGreaterThan(easy);
  });

  it('xếp loại theo phổ điểm thực tế', () => {
    expect(scoreBand(135).tone).toBe('elite');
    expect(scoreBand(60).tone).toBe('low');
  });
});

describe('chấm cả bài thi', () => {
  it('quy đổi đúng về thang 50 mỗi phần dù đề ngắn hơn 50 câu', () => {
    const attempt = buildAttempt({
      mode: 'section',
      label: 'Thử',
      section3: { mode: 'english' },
      sections: ['quantitative'],
      questionsPerSection: 10,
      seed: 'test-seed',
    });
    const run = attempt.sections[0];
    expect(run).toBeDefined();

    const responses: Record<string, Response> = {};
    for (const id of run?.questionIds ?? []) {
      const question = findQuestion(id);
      responses[id] = {
        questionId: id,
        value: question?.answer ?? null,
        flagged: false,
        timeSpentMs: 1000,
        visits: 1,
        changes: 0,
      };
    }

    const result = gradeAttempt({ ...attempt, responses }, findQuestion);
    expect(result.sections[0]?.score).toBeCloseTo(50, 5);
  });
});

describe('dựng đề', () => {
  it('cùng hạt giống cho ra cùng một đề', () => {
    const a = buildAttempt({ mode: 'full', label: 'A', section3: { mode: 'english' }, seed: 'seed-1' });
    const b = buildAttempt({ mode: 'full', label: 'B', section3: { mode: 'english' }, seed: 'seed-1' });
    expect(a.sections.map((s) => s.questionIds)).toEqual(b.sections.map((s) => s.questionIds));
  });

  it('thời gian được chia theo tỉ lệ số câu thực tế', () => {
    const attempt = buildAttempt({
      mode: 'section',
      label: 'A',
      section3: { mode: 'english' },
      sections: ['qualitative'],
      questionsPerSection: 25,
      seed: 's',
    });
    const run = attempt.sections[0];
    // Phần 2 đủ 50 câu là 60 phút; 25 câu thì còn 30 phút.
    expect(run?.allowedSeconds).toBe(Math.round((60 * 60 * (run?.questionIds.length ?? 0)) / 50));
  });

  it('chỉ lấy câu của đúng ba chủ đề phần 3 đã chọn', () => {
    const chosen = ['physics', 'chemistry', 'biology'] as const;
    const attempt = buildAttempt({
      mode: 'full',
      label: 'A',
      section3: { mode: 'science', subjects: chosen },
      seed: 's',
    });
    const science = attempt.sections.find((s) => s.section === 'science');
    const seen = new Set<string>();
    for (const id of science?.questionIds ?? []) {
      const subject = findQuestion(id)?.subject;
      expect(subject).toBeDefined();
      expect(chosen).toContain(subject);
      if (subject) seen.add(subject);
    }
    // Ca ba chu de deu phai xuat hien: mot de bo qua han mot chu de la de sai.
    expect(seen.size).toBe(chosen.length);
  });
});
