import { describe, expect, it } from 'vitest';
import { KNOWLEDGE } from '../src/data/knowledge';
import { PLAYBOOKS, PLAYBOOK_BY_TOPIC, patternOf } from '../src/data/playbook';
import { TOPICS } from '../src/data/topics';

describe('kho bí kíp', () => {
  it('phủ đúng 30 chuyên đề, không thiếu không thừa', () => {
    // Bo giai de cua ca 2000 phieu soan tu day. Thieu mot chuyen de nghia la
    // toan bo phieu cua chuyen de do nong hon han cac phieu con lai.
    expect(PLAYBOOKS).toHaveLength(TOPICS.length);
    for (const topic of TOPICS) {
      expect(PLAYBOOK_BY_TOPIC.has(topic.id), topic.id).toBe(true);
    }
    for (const playbook of PLAYBOOKS) {
      expect(TOPICS.some((t) => t.id === playbook.topicId), playbook.topicId).toBe(true);
    }
  });

  it('mã dạng bài không trùng nhau trong toàn hệ thống', () => {
    const ids = PLAYBOOKS.flatMap((p) => p.patterns.map((q) => q.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('mỗi chuyên đề có ít nhất ba dạng bài và ba bí kíp', () => {
    for (const playbook of PLAYBOOKS) {
      expect(playbook.patterns.length, playbook.topicId).toBeGreaterThanOrEqual(3);
      expect(playbook.secrets.length, playbook.topicId).toBeGreaterThanOrEqual(3);
    }
  });

  it('mỗi dạng bài đều có dấu hiệu đọc vị nhìn thấy được trên đề', () => {
    // "Co tham so m trong he so" la dau hieu. "Bai kho ve tham so" thi khong.
    for (const playbook of PLAYBOOKS) {
      for (const pattern of playbook.patterns) {
        expect(pattern.tell.length, `${playbook.topicId}/${pattern.id}`).toBeGreaterThanOrEqual(2);
        for (const tell of pattern.tell) {
          expect(tell.length, `${pattern.id}: "${tell}"`).toBeGreaterThan(20);
        }
      }
    }
  });

  it('mọi bước giải đều nói được nó để làm gì', () => {
    // Mot buoc khong giai thich duoc muc dich la mot buoc hoc thuoc — va hoc
    // thuoc thi quen ngay trong phong thi.
    for (const playbook of PLAYBOOKS) {
      for (const pattern of playbook.patterns) {
        expect(pattern.steps.length, pattern.id).toBeGreaterThanOrEqual(3);
        for (const step of pattern.steps) {
          expect(step.action.length, `${pattern.id} · hành động`).toBeGreaterThan(15);
          expect(step.why.length, `${pattern.id} · "${step.action}"`).toBeGreaterThan(25);
        }
      }
    }
  });

  it('phương pháp giải thích được vì sao là đường lối đó', () => {
    for (const playbook of PLAYBOOKS) {
      for (const pattern of playbook.patterns) {
        expect(pattern.method.length, pattern.id).toBeGreaterThan(80);
      }
    }
  });

  it('mọi bí kíp đều nói rõ lúc nào thì dùng', () => {
    // Mot bi kip khong noi ro luc dung se bi dung sai cho, va sai cho thi hai
    // hon la khong biet.
    for (const playbook of PLAYBOOKS) {
      for (const secret of playbook.secrets) {
        expect(secret.title.length, playbook.topicId).toBeGreaterThan(8);
        expect(secret.body.length, secret.title).toBeGreaterThan(60);
        expect(secret.when.length, secret.title).toBeGreaterThan(15);
      }
    }
  });

  it('câu hỏi lớn của chuyên đề là một câu hỏi thật', () => {
    for (const playbook of PLAYBOOKS) {
      expect(playbook.bigQuestion.endsWith('?'), playbook.topicId).toBe(true);
      expect(playbook.bigQuestion.length, playbook.topicId).toBeGreaterThan(30);
    }
  });

  it('kho bí kíp phủ mọi chuyên đề mà bộ kiến thức phủ', () => {
    // Hai tang phai di cung nhau: mot chuyen de co phieu kien thuc ma khong co
    // bi kip la mot chuyen de tra loi duoc "on gi" nhung khong tra loi duoc
    // "lam the nao".
    for (const sheet of KNOWLEDGE) {
      expect(PLAYBOOK_BY_TOPIC.has(sheet.topicId), sheet.topicId).toBe(true);
    }
  });

  it('tra cứu được một dạng bài cụ thể theo mã', () => {
    const found = patternOf('quantitative.arithmetic', 'ari.chain');
    expect(found?.name).toBe('Thay đổi liên tiếp nhiều lần');
    expect(patternOf('quantitative.arithmetic', 'khong-ton-tai')).toBeUndefined();
    expect(patternOf('khong-ton-tai', 'ari.chain')).toBeUndefined();
  });
});
