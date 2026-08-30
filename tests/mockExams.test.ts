import { describe, expect, it } from 'vitest';
import { SECTIONS } from '../src/config';
import {
  BAREM_RULES,
  FILL_REQUIRED_SUBJECTS,
  MOCK_EXAMS,
  SCORE_BANDS,
  apportionByWeight,
  bandOf,
  buildPaper,
  fillQuotaOf,
} from '../src/data/mockExams';
import { TOPICS } from '../src/data/topics';
import { subjectsOf } from '../src/lib/section3';
import { SCIENCE_PICK } from '../src/types';

const papers = MOCK_EXAMS.map((spec) => ({ spec, paper: buildPaper(spec.code) }));

describe('đề mẫu trọn vẹn', () => {
  it('mỗi đề là một tổ hợp phần 3 riêng, mã đề không trùng', () => {
    const combos = MOCK_EXAMS.map((e) => subjectsOf(e.section3).slice().sort().join('+'));
    expect(new Set(combos).size).toBe(combos.length);
    expect(new Set(MOCK_EXAMS.map((e) => e.code)).size).toBe(MOCK_EXAMS.length);
    expect(MOCK_EXAMS.length).toBe(5);
  });

  it('mỗi đề tổ hợp khoa học chọn đúng ba chủ đề', () => {
    for (const spec of MOCK_EXAMS) {
      if (spec.section3.mode !== 'science') continue;
      expect(spec.section3.subjects, spec.code).toHaveLength(SCIENCE_PICK);
      expect(new Set(spec.section3.subjects).size, spec.code).toBe(SCIENCE_PICK);
    }
  });

  it('mọi đề đều đủ 150 câu, 150 điểm, 195 phút', () => {
    for (const { spec, paper } of papers) {
      expect(paper, spec.code).not.toBeNull();
      expect(paper?.totalQuestions, spec.code).toBe(150);
      expect(paper?.maxScore, spec.code).toBe(150);
      expect(paper?.totalMinutes, spec.code).toBe(195);
    }
  });

  it('không câu nào lặp lại trong cùng một đề', () => {
    // Mot de co hai cau giong nhau la mot de hong, va la loi khong the phat
    // hien bang mat khi doc 150 cau.
    for (const { spec, paper } of papers) {
      const ids = paper?.items.map((i) => i.question.id) ?? [];
      expect(new Set(ids).size, spec.code).toBe(ids.length);
    }
  });

  it('mỗi phần đúng số câu và đúng định dạng theo quy chế', () => {
    for (const { spec, paper } of papers) {
      for (const sectionSpec of SECTIONS) {
        const section = paper?.sections.find((s) => s.section === sectionSpec.id);
        expect(section?.items.length, `${spec.code}/${sectionSpec.id}`).toBe(sectionSpec.questionCount);

        const mcq = section?.items.filter((i) => i.question.format === 'mcq').length ?? 0;
        const fill = section?.items.filter((i) => i.question.format === 'fill').length ?? 0;
        // Phan 3 khong co so cau dien co dinh: no bang so chu de Ly/Hoa/Sinh
        // trong to hop cua de. Duong Tieng Anh thi ca phan la trac nghiem.
        const needFill = fillQuotaOf(sectionSpec.id, spec.section3);
        expect(fill, `${spec.code}/${sectionSpec.id} điền đáp án`).toBe(needFill);
        expect(mcq, `${spec.code}/${sectionSpec.id} trắc nghiệm`).toBe(sectionSpec.questionCount - needFill);
      }
    }
  });

  it('mỗi chủ đề Lý, Hóa, Sinh trong tổ hợp đều có ít nhất một câu điền', () => {
    // Quy che yeu cau dieu nay o cap CHU DE, khong phai cap ca phan — mot de
    // du ba cau dien nhung don het vao mot chu de van la de sai.
    for (const { spec, paper } of papers) {
      const science = paper?.sections.find((s) => s.section === 'science');
      for (const subject of FILL_REQUIRED_SUBJECTS) {
        if (!subjectsOf(spec.section3).includes(subject)) continue;
        const fills = science?.items.filter(
          (i) => i.question.subject === subject && i.question.format === 'fill',
        ).length;
        expect(fills, `${spec.code} · ${subject}`).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('phần 3 chỉ lấy câu thuộc tổ hợp của đề, và phủ hết tổ hợp đó', () => {
    for (const { spec, paper } of papers) {
      const wanted = subjectsOf(spec.section3);
      const science = paper?.sections.find((s) => s.section === 'science');
      const seen = new Set<string>();
      for (const item of science?.items ?? []) {
        expect(wanted, `${spec.code} · ${item.question.id}`).toContain(item.question.subject);
        if (item.question.subject) seen.add(item.question.subject);
      }
      // Bo sot mot chu de trong to hop nghia la thi sinh on ba nhung thi hai.
      expect(seen.size, spec.code).toBe(wanted.length);
    }
  });

  it('câu được đánh số liên tục từ 1 đến 150 và đúng thứ tự phần', () => {
    for (const { spec, paper } of papers) {
      const numbers = paper?.items.map((i) => i.number) ?? [];
      expect(numbers, spec.code).toEqual(Array.from({ length: 150 }, (_, i) => i + 1));
      for (const section of paper?.sections ?? []) {
        const inSection = section.items.map((i) => i.numberInSection);
        expect(inSection, `${spec.code}/${section.section}`).toEqual(
          Array.from({ length: section.items.length }, (_, i) => i + 1),
        );
      }
    }
  });

  it('trong mỗi phần, câu dễ đứng trước câu khó', () => {
    // Thi sinh gap cau de o dau de vao nhip, va khong mat thoi gian quy o cau
    // kho khi con nhieu cau de chua lam.
    for (const { spec, paper } of papers) {
      for (const section of paper?.sections ?? []) {
        const diffs = section.items.map((i) => i.question.difficulty);
        const sorted = [...diffs].sort((a, b) => a - b);
        expect(diffs, `${spec.code}/${section.section}`).toEqual(sorted);
      }
    }
  });

  it('cùng một mã đề luôn cho ra đúng một đề', () => {
    for (const spec of MOCK_EXAMS) {
      const a = buildPaper(spec.code)?.items.map((i) => i.question.id);
      const b = buildPaper(spec.code)?.items.map((i) => i.question.id);
      expect(a, spec.code).toEqual(b);
    }
  });

  it('ma trận đề cộng lại đúng bằng tổng số câu', () => {
    for (const { spec, paper } of papers) {
      const total = paper?.matrix.reduce((n, r) => n + r.total, 0) ?? 0;
      expect(total, spec.code).toBe(150);
      for (const row of paper?.matrix ?? []) {
        const byDiff = Object.values(row.byDifficulty).reduce((n, x) => n + x, 0);
        expect(byDiff, `${spec.code}/${row.topicId}`).toBe(row.total);
        expect(TOPICS.some((t) => t.id === row.topicId), row.topicId).toBe(true);
      }
    }
  });

  it('mọi câu trong đề đều có đáp án và lời giải', () => {
    for (const { spec, paper } of papers) {
      for (const item of paper?.items ?? []) {
        expect(item.question.answer.length, `${spec.code} · ${item.question.id}`).toBeGreaterThan(0);
        expect(item.question.explanation.length, `${spec.code} · ${item.question.id}`).toBeGreaterThan(30);
        expect(item.points).toBe(1);
      }
    }
  });

  it('barem nêu rõ luật chấm và giải thích hệ quả của từng luật', () => {
    expect(BAREM_RULES.length).toBeGreaterThanOrEqual(5);
    for (const rule of BAREM_RULES) {
      expect(rule.detail.length, rule.rule).toBeGreaterThan(60);
    }
    // Luat quan trong nhat: khong tru diem, nen bo trong khong bao gio loi hon doan.
    expect(BAREM_RULES.some((r) => r.rule.includes('Không trừ điểm'))).toBe(true);
  });

  it('thang xếp loại giảm dần và phủ kín mọi mức điểm', () => {
    for (let i = 1; i < SCORE_BANDS.length; i += 1) {
      expect(SCORE_BANDS[i]?.min ?? 0).toBeLessThan(SCORE_BANDS[i - 1]?.min ?? 0);
    }
    expect(SCORE_BANDS.at(-1)?.min).toBe(0);
    expect(bandOf(150).label).toBe('Xuất sắc');
    expect(bandOf(0).label).toBe('Cần xây lại nền');
    expect(bandOf(100).label).toBe('Giỏi');
  });

  it('phân bổ theo trọng số luôn cộng đúng bằng tổng', () => {
    expect(apportionByWeight([0.5, 0.3, 0.2], 50).reduce((n, x) => n + x, 0)).toBe(50);
    expect(apportionByWeight([1, 1, 1], 10).reduce((n, x) => n + x, 0)).toBe(10);
    expect(apportionByWeight([], 10)).toEqual([]);
    expect(apportionByWeight([0, 0], 10).reduce((n, x) => n + x, 0)).toBe(0);
  });

  it('mã đề lạ trả về null thay vì làm hỏng ứng dụng', () => {
    expect(buildPaper('KHONG-TON-TAI')).toBeNull();
  });
});
