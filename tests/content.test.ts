import { describe, expect, it } from 'vitest';
import { ALL_QUESTIONS, questionsOfTopic } from '../src/data/questions';
import { PASSAGE_BY_ID } from '../src/data/passages';
import { TOPIC_BY_ID, TOPICS } from '../src/data/topics';
import { normalizeFillAnswer } from '../src/lib/format';
import { SECTIONS } from '../src/config';

/**
 * Kiem tra tinh toan ven cua ngan hang cau hoi.
 * Trong mot san pham giao duc, mot cau hoi sai dap an gay hai hon moi loi
 * ky thuat khac — nen no phai duoc chan ngay o tang test.
 */
describe('ngân hàng câu hỏi', () => {
  it('không có mã câu hỏi trùng nhau', () => {
    const ids = ALL_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('câu trắc nghiệm có đúng 4 phương án và đáp án nằm trong số đó', () => {
    for (const question of ALL_QUESTIONS) {
      if (question.format !== 'mcq') continue;
      expect(question.choices, question.id).toBeDefined();
      expect(question.choices?.length, question.id).toBe(4);
      expect(
        question.choices?.some((c) => c.id === question.answer),
        `${question.id}: đáp án "${question.answer}" không khớp phương án nào`,
      ).toBe(true);
    }
  });

  it('phương án không được trùng nội dung nhau', () => {
    for (const question of ALL_QUESTIONS) {
      if (!question.choices) continue;
      const texts = question.choices.map((c) => c.text.trim().toLowerCase());
      expect(new Set(texts).size, question.id).toBe(texts.length);
    }
  });

  it('câu điền có đáp án chuẩn hóa được và không rỗng', () => {
    for (const question of ALL_QUESTIONS) {
      if (question.format !== 'fill') continue;
      expect(question.choices, `${question.id} là câu điền, không được có phương án`).toBeUndefined();
      expect(normalizeFillAnswer(question.answer).length, question.id).toBeGreaterThan(0);
    }
  });

  it('mọi câu đều có lời giải đủ dài để thực sự giải thích', () => {
    for (const question of ALL_QUESTIONS) {
      expect(question.explanation.trim().length, question.id).toBeGreaterThan(30);
    }
  });

  it('mọi bẫy được chú thích đều trỏ tới một phương án có thật và không phải đáp án đúng', () => {
    for (const question of ALL_QUESTIONS) {
      for (const choiceId of Object.keys(question.traps ?? {})) {
        expect(question.choices?.some((c) => c.id === choiceId), `${question.id} → ${choiceId}`).toBe(true);
        expect(choiceId, `${question.id}: không thể chú thích bẫy cho đáp án đúng`).not.toBe(question.answer);
      }
    }
  });

  it('mọi câu thuộc về một chuyên đề có thật và đúng phần thi', () => {
    for (const question of ALL_QUESTIONS) {
      const topic = TOPIC_BY_ID.get(question.topicId);
      expect(topic, `${question.id} → ${question.topicId}`).toBeDefined();
      expect(topic?.section).toBe(question.section);
      if (question.section === 'science') {
        expect(question.subject, question.id).toBeDefined();
        expect(topic?.subject).toBe(question.subject);
      }
    }
  });

  it('mọi chuyên đề đều có đủ câu khó và câu phân loại cho mục tiêu điểm tuyệt đối', () => {
    /*
     * Nguoi nham 150 diem phai lam dung CA cau phan loai, nen ho can cho de
     * luyen dung nhung cau do. Mot kho lech han ve phia de — nhu kho nay tung
     * lech, chi 4 cau phan loai trong 572 — thi dung de dua nguoi hoc len muc
     * 120, nhung khong the dua ai len 150: ho khong co gi de luyen o dung cho
     * quyet dinh.
     *
     * Nguong: moi chuyen de it nhat 4 cau van dung cao va 2 cau phan loai.
     */
    for (const topic of TOPICS) {
      const questions = questionsOfTopic(topic.id);
      const hard = questions.filter((q) => q.difficulty >= 4).length;
      const hardest = questions.filter((q) => q.difficulty === 5).length;
      expect(hard, `${topic.id}: câu vận dụng cao`).toBeGreaterThanOrEqual(4);
      expect(hardest, `${topic.id}: câu phân loại`).toBeGreaterThanOrEqual(2);
    }
  });

  it('phân bố độ khó toàn kho không lệch quá xa phân bố của đề chuẩn', () => {
    // De chuan co 24% cau o muc 4-5. Kho lech han ve phia de thi nguoi hoc
    // luyen mai van khong gap dang cau quyet diem so.
    const hard = ALL_QUESTIONS.filter((q) => q.difficulty >= 4).length;
    expect(hard / ALL_QUESTIONS.length).toBeGreaterThanOrEqual(0.2);
  });

  it('mọi ngữ liệu được tham chiếu đều tồn tại', () => {
    for (const question of ALL_QUESTIONS) {
      if (!question.passageId) continue;
      expect(PASSAGE_BY_ID.get(question.passageId), question.id).toBeDefined();
    }
  });

  it('mọi chuyên đề đều có ít nhất một câu hỏi', () => {
    for (const topic of TOPICS) {
      expect(questionsOfTopic(topic.id).length, topic.id).toBeGreaterThan(0);
    }
  });

  it('mọi chuyên đề đều đủ câu cho phiếu dài nhất', () => {
    // Phieu cap 6 dung 15 cau. Duoi nguong nay thi phieu phai muon cau
    // khac chuyen de hoac bi rut ngan — nguoi hoc mat dung trong tam.
    for (const topic of TOPICS) {
      expect(questionsOfTopic(topic.id).length, topic.id).toBeGreaterThanOrEqual(15);
    }
  });

  it('trọng số chuyên đề cộng lại đúng bằng 1 trong mỗi nhóm', () => {
    const groups = new Map<string, number>();
    for (const topic of TOPICS) {
      const key = topic.subject ?? topic.section;
      groups.set(key, (groups.get(key) ?? 0) + topic.weight);
    }
    for (const [key, sum] of groups) {
      expect(sum, `nhóm ${key}`).toBeCloseTo(1, 5);
    }
  });

  it('mỗi phần thi đều có câu hỏi để dựng đề', () => {
    for (const section of SECTIONS) {
      expect(ALL_QUESTIONS.filter((q) => q.section === section.id).length, section.id).toBeGreaterThan(0);
    }
  });

  it('thời gian mục tiêu tăng theo độ khó một cách hợp lý', () => {
    for (const question of ALL_QUESTIONS) {
      expect(question.estimatedSeconds, question.id).toBeGreaterThanOrEqual(30);
      expect(question.estimatedSeconds, question.id).toBeLessThanOrEqual(240);
    }
  });
});
