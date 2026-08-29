import { describe, expect, it } from 'vitest';
import { SECTIONS } from '../src/config';
import { TOTAL_WORKSHEETS, apportion, getWorksheets, worksheetById } from '../src/data/worksheets';
import { TOTAL_MISSIONS, getMissions, missionForWorksheet } from '../src/data/missions';
import { LEVELS, PASS_RATIO } from '../src/data/curriculum';
import { TOPICS } from '../src/data/topics';
import { findQuestion } from '../src/data/questions';

describe('phân bổ phiếu luyện', () => {
  it('cho ra đúng tổng số được yêu cầu', () => {
    const counts = apportion([0.5, 0.3, 0.2], 100);
    expect(counts.reduce((a, b) => a + b, 0)).toBe(100);
  });

  it('không để ô nào trống ngay cả khi trọng số rất nhỏ', () => {
    const counts = apportion([0.999, 0.0005, 0.0005], 10);
    expect(counts.every((c) => c >= 1)).toBe(true);
    expect(counts.reduce((a, b) => a + b, 0)).toBe(10);
  });

  it('vẫn đúng tổng khi số ô lớn hơn tổng cần chia', () => {
    const counts = apportion(new Array(10).fill(1), 4);
    expect(counts.reduce((a, b) => a + b, 0)).toBe(4);
  });
});

describe('bộ phiếu luyện', () => {
  const sheets = getWorksheets();

  it('có đúng 2000 phiếu', () => {
    expect(sheets).toHaveLength(TOTAL_WORKSHEETS);
    expect(TOTAL_WORKSHEETS).toBe(2000);
  });

  it('mọi mã phiếu là duy nhất', () => {
    expect(new Set(sheets.map((s) => s.id)).size).toBe(sheets.length);
  });

  it('phủ hết mọi chuyên đề ở cả 6 cấp độ', () => {
    for (const topic of TOPICS) {
      for (const level of LEVELS) {
        const found = sheets.filter((s) => s.topicId === topic.id && s.level === level.level);
        expect(found.length, `${topic.id} cấp ${level.level}`).toBeGreaterThan(0);
      }
    }
  });

  it('mỗi phiếu có đủ 3 chặng, không chặng nào trống', () => {
    for (const sheet of sheets) {
      expect(sheet.parts).toHaveLength(3);
      expect(sheet.parts.every((p) => p.questionIds.length > 0), sheet.id).toBe(true);
      expect(sheet.questionCount).toBeGreaterThan(0);
    }
  });

  it('không câu nào lặp lại trong cùng một phiếu', () => {
    for (const sheet of sheets) {
      const ids = sheet.parts.flatMap((p) => p.questionIds);
      expect(new Set(ids).size, `${sheet.id} có câu trùng`).toBe(ids.length);
    }
  });

  it('số câu không vượt quá định mức của cấp độ (được rút ngắn khi ngân hàng chưa đủ)', () => {
    for (const sheet of sheets) {
      const level = LEVELS.find((l) => l.level === sheet.level);
      expect(sheet.questionCount).toBeLessThanOrEqual(level?.questionCount ?? 0);
    }
  });

  it('mọi mã câu hỏi trong phiếu đều tồn tại trong ngân hàng', () => {
    for (const sheet of sheets.slice(0, 300)) {
      for (const id of sheet.parts.flatMap((p) => p.questionIds)) {
        expect(findQuestion(id), `${sheet.id} → ${id}`).toBeDefined();
      }
    }
  });

  it('ngưỡng hoàn thành luôn thấp hơn ngưỡng thành thạo', () => {
    for (const sheet of sheets) {
      expect(sheet.passRatio).toBe(PASS_RATIO);
      expect(sheet.masteryRatio).toBeGreaterThan(sheet.passRatio);
    }
  });

  it('chuỗi mở khóa hợp lệ: phiếu tiên quyết luôn tồn tại', () => {
    for (const sheet of sheets) {
      if (!sheet.requires) continue;
      expect(worksheetById(sheet.requires), sheet.id).toBeDefined();
    }
  });

  it('mỗi cấp độ của mỗi tuyến kết thúc bằng một phiếu vượt ải', () => {
    for (const topic of TOPICS) {
      for (const level of LEVELS) {
        const group = sheets.filter((s) => s.topicId === topic.id && s.level === level.level);
        expect(group[group.length - 1]?.kind).toBe('boss');
      }
    }
  });

  it('phân bổ theo phần thi bám sát tỉ trọng đề thi', () => {
    for (const section of SECTIONS) {
      const share = sheets.filter((s) => s.section === section.id).length / sheets.length;
      expect(share).toBeGreaterThan(0.28);
      expect(share).toBeLessThan(0.39);
    }
  });

  it('sinh lại cho kết quả giống hệt (không dùng ngẫu nhiên)', () => {
    const again = getWorksheets();
    expect(again[0]?.parts[0]?.questionIds).toEqual(sheets[0]?.parts[0]?.questionIds);
  });
});

describe('bộ nhiệm vụ', () => {
  it('có đúng 2000 nhiệm vụ, mỗi nhiệm vụ gắn một phiếu', () => {
    const missions = getMissions();
    expect(missions).toHaveLength(TOTAL_MISSIONS);
    expect(new Set(missions.map((m) => m.worksheetId)).size).toBe(TOTAL_WORKSHEETS);
  });

  it('tra ngược từ phiếu ra nhiệm vụ luôn có kết quả', () => {
    for (const sheet of getWorksheets().slice(0, 50)) {
      expect(missionForWorksheet(sheet.id)).toBeDefined();
    }
  });
});
