import { describe, expect, it } from 'vitest';
import { KINDS } from '../src/data/curriculum';
import { TOPICS } from '../src/data/topics';
import { getWorksheets, guideCodeOf, solutionCodeOf } from '../src/data/worksheets';
import { buildTopicGuide } from '../src/lib/topicGuide';
import { createInitialState } from '../src/lib/storage';
import { reducer } from '../src/store/reducer';
import { findQuestion } from '../src/data/questions';
import type { PersistedState, Response, Worksheet } from '../src/types';

function submit(state: PersistedState, sheet: Worksheet, ratio: number): PersistedState {
  const ids = sheet.parts.flatMap((p) => p.questionIds);
  const correctCount = Math.round(ids.length * ratio);
  const responses: Record<string, Response> = {};
  ids.forEach((id, i) => {
    const q = findQuestion(id);
    responses[id] = {
      questionId: id,
      value: i < correctCount ? (q?.answer ?? null) : '__sai__',
      flagged: false,
      timeSpentMs: (q?.estimatedSeconds ?? 60) * 800,
      visits: 1,
      changes: 0,
    };
  });
  return reducer(state, { type: 'worksheet/submit', worksheetId: sheet.id, responses, now: Date.now() });
}

describe('mã tài liệu đi kèm', () => {
  it('mỗi phiếu luyện có đúng một phiếu lời giải cùng số hiệu', () => {
    expect(solutionCodeOf('PL-TOA-ARI-L1-001')).toBe('LG-TOA-ARI-L1-001');
  });

  it('mỗi chuyên đề có đúng một mã phiếu hướng dẫn, không trùng nhau', () => {
    const codes = TOPICS.map((t) => guideCodeOf(t.id));
    expect(new Set(codes).size).toBe(TOPICS.length);
    expect(codes.every((c) => c.startsWith('HD-'))).toBe(true);
  });
});

describe('phiếu hướng dẫn ôn chắc chuyên đề', () => {
  it('dựng được cho mọi chuyên đề', () => {
    const state = createInitialState();
    for (const topic of TOPICS) {
      const guide = buildTopicGuide(state, topic.id);
      expect(guide, topic.id).not.toBeNull();
      expect(guide?.knowledge, topic.id).toBeDefined();
    }
  });

  it('trả về null với chuyên đề không tồn tại', () => {
    expect(buildTopicGuide(createInitialState(), 'khong.co.that')).toBeNull();
  });

  it('lộ trình gồm đủ sáu cấp, mỗi cấp có đủ sáu loại phiếu', () => {
    const guide = buildTopicGuide(createInitialState(), 'quantitative.algebra');
    expect(guide?.ladder).toHaveLength(6);
    for (const row of guide?.ladder ?? []) {
      const kinds = new Set(row.sheets.map((s) => s.sheet.kind));
      for (const kind of KINDS) {
        expect(kinds.has(kind.kind), `cấp ${row.level} thiếu ${kind.kind}`).toBe(true);
      }
    }
  });

  it('người mới chưa đạt tiêu chí phiếu nào và kế hoạch bắt đầu từ phiếu lý thuyết', () => {
    const guide = buildTopicGuide(createInitialState(), 'quantitative.algebra');
    // Sáu tiêu chí gắn với sáu loại phiếu đều chưa đạt vì chưa làm phiếu nào.
    expect(guide?.criteria.filter((c) => c.id.startsWith('kind.')).every((c) => !c.met)).toBe(true);
    // Người mới chưa có câu quá hạn nên tiêu chí độ bền được tính là đạt.
    expect(guide?.criteria.find((c) => c.id === 'retention')?.met).toBe(true);
    expect(guide?.plan[0]?.title).toContain('lý thuyết');
  });

  it('làm tốt phiếu lý thuyết thì tiêu chí đó đạt và biến mất khỏi kế hoạch', () => {
    let state = createInitialState();
    const theory = getWorksheets().find(
      (s) => s.topicId === 'quantitative.algebra' && s.level === 1 && s.kind === 'theory',
    ) as Worksheet;
    state = submit(state, theory, 1);

    const guide = buildTopicGuide(state, 'quantitative.algebra');
    expect(guide?.criteria.find((c) => c.id === 'kind.theory')?.met).toBe(true);
    expect(guide?.plan.some((d) => d.title.includes('Chốt lý thuyết'))).toBe(false);
  });

  it('kế hoạch không bao giờ vượt bảy ngày và luôn kết thúc bằng bước tự kiểm', () => {
    const guide = buildTopicGuide(createInitialState(), 'qualitative.reading');
    expect(guide?.plan.length).toBeLessThanOrEqual(7);
    expect(guide?.plan[guide.plan.length - 1]?.title).toContain('Tự kiểm');
  });

  it('gộp đúng số liệu cá nhân của riêng chuyên đề đó', () => {
    let state = createInitialState();
    const sheet = getWorksheets().find(
      (s) => s.topicId === 'quantitative.statistics' && s.level === 1,
    ) as Worksheet;
    state = submit(state, sheet, 0);

    const guide = buildTopicGuide(state, 'quantitative.statistics');
    expect(guide?.attempted).toBeGreaterThan(0);
    expect(guide?.correct).toBe(0);

    // Chuyên đề khác không bị lẫn số liệu.
    const other = buildTopicGuide(state, 'science.english.reading');
    expect(other?.attempted).toBe(0);
  });

  it('mọi tiêu chí đều có nhãn và mô tả đủ nghĩa', () => {
    const guide = buildTopicGuide(createInitialState(), 'science.physics.mechanics');
    expect(guide?.criteria).toHaveLength(8);
    for (const criterion of guide?.criteria ?? []) {
      expect(criterion.label.length).toBeGreaterThan(5);
      expect(criterion.detail.length).toBeGreaterThan(20);
      expect(criterion.progress).toBeGreaterThanOrEqual(0);
      expect(criterion.progress).toBeLessThanOrEqual(1);
    }
  });
});

describe('sáu loại phiếu', () => {
  it('mỗi loại có mã, mục tiêu, ràng buộc và tiêu chí đạt riêng', () => {
    expect(KINDS).toHaveLength(6);
    const codes = KINDS.map((k) => k.code);
    expect(new Set(codes).size).toBe(6);
    for (const kind of KINDS) {
      expect(kind.goal.length, kind.kind).toBeGreaterThan(40);
      expect(kind.whenToUse.length, kind.kind).toBeGreaterThan(20);
      expect(kind.constraint.length, kind.kind).toBeGreaterThan(20);
      expect(kind.masteryCue.length, kind.kind).toBeGreaterThan(20);
      expect(kind.parts).toHaveLength(3);
      for (const part of kind.parts) {
        expect(part.name.length, `${kind.kind}/${part.name}`).toBeGreaterThan(5);
        expect(part.goal.length, `${kind.kind}/${part.name}`).toBeGreaterThan(20);
      }
    }
  });

  it('phiếu thi siết thời gian nhất, phiếu lý thuyết rộng rãi nhất', () => {
    const test = KINDS.find((k) => k.kind === 'test');
    const theory = KINDS.find((k) => k.kind === 'theory');
    expect(test?.timeFactor).toBeLessThan(theory?.timeFactor ?? 0);
  });
});
