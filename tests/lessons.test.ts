import { describe, expect, it } from 'vitest';
import { LESSONS, LESSON_BY_TOPIC, countWorkedExamples, lessonFor } from '../src/data/lessons';
import { PLAYBOOK_BY_TOPIC } from '../src/data/playbook';
import { TOPICS } from '../src/data/topics';

/**
 * He bai giang la tang giua BIET va LAM DUOC. Cac bai test o day khong kiem
 * tra "co du tep khong" ma kiem tra tung dieu kien lam nen gia tri su pham:
 * co vi du giai tung buoc that, moi buoc noi duoc ly do, va co mot loi giai
 * SAI duoc mo ra tan noi.
 */
describe('hệ bài giảng', () => {
  it('phủ hết mọi chuyên đề, không thiếu không thừa', () => {
    expect(LESSONS).toHaveLength(TOPICS.length);
    for (const topic of TOPICS) {
      expect(lessonFor(topic.id), topic.id).toBeDefined();
      expect(lessonFor(topic.id)?.section, topic.id).toBe(topic.section);
    }
    for (const lesson of LESSONS) {
      expect(TOPICS.some((t) => t.id === lesson.topicId), lesson.topicId).toBe(true);
    }
  });

  it('mã bài giảng và mã ví dụ không trùng nhau trong toàn hệ thống', () => {
    expect(new Set(LESSONS.map((l) => l.topicId)).size).toBe(LESSONS.length);
    const ids = LESSONS.flatMap((l) => l.examples.map((e) => e.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('mở đầu nói được vì sao chuyên đề này đáng học, không phải lời động viên suông', () => {
    for (const lesson of LESSONS) {
      expect(lesson.hook.length, lesson.topicId).toBeGreaterThan(120);
      expect(lesson.minutes, lesson.topicId).toBeGreaterThanOrEqual(15);
      expect(lesson.minutes, lesson.topicId).toBeLessThanOrEqual(60);
    }
  });

  it('mạch kiến thức có ít nhất ba bước, mỗi bước tự kiểm được ngay', () => {
    // Mot mach kien thuc khong tu kiem duoc thi hoc sinh chi biet minh hong o
    // dau sau khi da lam sai mot de — tuc la muon.
    for (const lesson of LESSONS) {
      expect(lesson.build.length, lesson.topicId).toBeGreaterThanOrEqual(3);
      for (const block of lesson.build) {
        expect(block.idea.length, `${lesson.topicId} · ý`).toBeGreaterThan(25);
        expect(block.explain.length, `${lesson.topicId} · "${block.idea}"`).toBeGreaterThan(60);
        expect(block.check.length, `${lesson.topicId} · "${block.idea}"`).toBeGreaterThan(15);
        expect(block.checkAnswer.length, `${lesson.topicId} · "${block.check}"`).toBeGreaterThan(5);
      }
    }
  });

  it('mỗi bài giảng có ít nhất hai ví dụ mẫu giải từng bước', () => {
    for (const lesson of LESSONS) {
      expect(lesson.examples.length, lesson.topicId).toBeGreaterThanOrEqual(2);
    }
    expect(countWorkedExamples()).toBeGreaterThanOrEqual(TOPICS.length * 2);
  });

  it('mọi bước giải đều nói được nó để làm gì, không chỉ nêu phép tính', () => {
    for (const lesson of LESSONS) {
      for (const example of lesson.examples) {
        expect(example.problem.length, example.id).toBeGreaterThan(50);
        expect(example.steps.length, example.id).toBeGreaterThanOrEqual(3);
        expect(example.answer.length, example.id).toBeGreaterThan(10);
        expect(example.takeaway.length, example.id).toBeGreaterThan(50);
        for (const step of example.steps) {
          expect(step.do.length, `${example.id} · việc làm`).toBeGreaterThan(15);
          expect(step.why.length, `${example.id} · "${step.do}"`).toBeGreaterThan(30);
        }
      }
    }
  });

  it('ví dụ có gắn mã dạng bài thì mã đó phải có thật trong kho bí kíp', () => {
    for (const lesson of LESSONS) {
      const playbook = PLAYBOOK_BY_TOPIC.get(lesson.topicId);
      for (const example of lesson.examples) {
        if (!example.patternId) continue;
        expect(
          playbook?.patterns.some((p) => p.id === example.patternId),
          `${example.id} → ${example.patternId}`,
        ).toBe(true);
      }
    }
  });

  it('mỗi bài giảng mở một lời giải SAI ra tận nơi', () => {
    // Day la phan hiem gap nhat trong tai lieu luyen thi: hoc sinh nhan ra loi
    // cua chinh minh trong mot loi giai cu the, thay vi nghe canh bao truu tuong.
    for (const lesson of LESSONS) {
      const turn = lesson.wrongTurn;
      expect(turn.problem.length, lesson.topicId).toBeGreaterThan(40);
      expect(turn.attempt.length, lesson.topicId).toBeGreaterThanOrEqual(3);
      expect(turn.brokeAtStep, lesson.topicId).toBeGreaterThanOrEqual(1);
      expect(turn.brokeAtStep, lesson.topicId).toBeLessThanOrEqual(turn.attempt.length);
      expect(turn.diagnosis.length, lesson.topicId).toBeGreaterThan(100);
      expect(turn.fix.length, lesson.topicId).toBeGreaterThan(40);
    }
  });

  it('tra cứu được bài giảng theo mã chuyên đề', () => {
    const first = LESSONS[0];
    expect(first).toBeDefined();
    expect(LESSON_BY_TOPIC.get(first?.topicId ?? '')).toBe(first);
    expect(lessonFor('khong-ton-tai')).toBeUndefined();
  });
});
