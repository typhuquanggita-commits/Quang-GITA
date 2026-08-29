import { describe, expect, it } from 'vitest';
import { KNOWLEDGE, knowledgeFor } from '../src/data/knowledge';
import { TOPICS } from '../src/data/topics';
import { ALL_QUESTIONS, findQuestion } from '../src/data/questions';
import { getWorksheets } from '../src/data/worksheets';
import {
  analyze,
  buildSolutionSheet,
  classifyResponse,
  findSimilarQuestions,
  knowledgeGaps,
} from '../src/lib/solutions';
import { buildDossier } from '../src/lib/dossier';
import { reducer } from '../src/store/reducer';
import { createInitialState } from '../src/lib/storage';
import type { Question, Response, Worksheet } from '../src/types';

const question = (over: Partial<Question> = {}): Question => ({
  id: 'x1',
  section: 'quantitative',
  topicId: 'quantitative.algebra',
  format: 'mcq',
  stem: 'Test',
  answer: 'A',
  choices: [
    { id: 'A', text: 'a' },
    { id: 'B', text: 'b' },
    { id: 'C', text: 'c' },
    { id: 'D', text: 'd' },
  ],
  explanation: 'Vì đây là câu kiểm thử nên lời giải chỉ mang tính minh họa cho bộ test.',
  difficulty: 3,
  estimatedSeconds: 60,
  skills: ['kỹ năng A'],
  ...over,
});

const response = (over: Partial<Response> = {}): Response => ({
  questionId: 'x1',
  value: 'A',
  flagged: false,
  timeSpentMs: 30_000,
  visits: 1,
  changes: 0,
  ...over,
});

describe('bộ kiến thức liên quan', () => {
  it('phủ hết mọi chuyên đề', () => {
    expect(KNOWLEDGE).toHaveLength(TOPICS.length);
    for (const topic of TOPICS) {
      expect(knowledgeFor(topic.id), topic.id).toBeDefined();
    }
  });

  it('mỗi phiếu kiến thức đủ năm phần và có nội dung thật', () => {
    for (const sheet of KNOWLEDGE) {
      expect(sheet.coreIdeas.length, sheet.topicId).toBeGreaterThanOrEqual(2);
      expect(sheet.formulas.length, sheet.topicId).toBeGreaterThanOrEqual(2);
      expect(sheet.patterns.length, sheet.topicId).toBeGreaterThanOrEqual(2);
      expect(sheet.traps.length, sheet.topicId).toBeGreaterThanOrEqual(2);
      expect(sheet.timing.length, sheet.topicId).toBeGreaterThan(30);
      for (const trap of sheet.traps) {
        expect(trap.fix.length, `${sheet.topicId}: ${trap.trap}`).toBeGreaterThan(10);
      }
    }
  });

  it('mọi câu hỏi đều tra được phiếu kiến thức tương ứng', () => {
    for (const q of ALL_QUESTIONS) {
      expect(knowledgeFor(q.topicId), q.id).toBeDefined();
    }
  });
});

describe('phân loại lỗi', () => {
  it('bỏ trống luôn là lỗi chiến thuật, bất kể mức tự tin', () => {
    expect(classifyResponse(question(), response({ value: null }))).toBe('tactic');
    expect(classifyResponse(question(), response({ value: '  ', confidence: 'sure' }))).toBe('tactic');
    expect(classifyResponse(question(), undefined)).toBe('tactic');
  });

  it('sai mà vẫn tin chắc là lỗi kiến thức', () => {
    expect(classifyResponse(question(), response({ value: 'B', confidence: 'sure' }))).toBe('knowledge');
  });

  it('sai và tốn quá gấp đôi thời gian là lỗi kỹ năng', () => {
    expect(
      classifyResponse(question(), response({ value: 'B', confidence: 'sure', timeSpentMs: 200_000 })),
    ).toBe('skill');
  });

  it('sai và còn phân vân là lỗi kỹ năng', () => {
    expect(classifyResponse(question(), response({ value: 'B', confidence: 'unsure' }))).toBe('skill');
  });

  it('đúng nhờ đoán không được tính là đúng vững', () => {
    expect(classifyResponse(question(), response({ confidence: 'guess' }))).toBe('lucky');
  });

  it('đúng, tự tin và kịp giờ là đúng vững', () => {
    expect(classifyResponse(question(), response({ confidence: 'sure' }))).toBe('clean');
  });

  it('đúng nhưng quá chậm vẫn là lỗi kỹ năng', () => {
    expect(classifyResponse(question(), response({ timeSpentMs: 200_000 }))).toBe('skill');
  });
});

describe('bộ giải đề', () => {
  /** Một câu thật trong ngân hàng có chú thích bẫy, để kiểm phần "vì sao sai". */
  const trapped = ALL_QUESTIONS.find(
    (q) => q.format === 'mcq' && Object.keys(q.traps ?? {}).length > 0,
  ) as Question;
  const trapChoice = Object.keys(trapped.traps ?? {})[0] as string;

  it('bỏ qua mã câu hỏi không tồn tại thay vì làm hỏng bộ giải đề', () => {
    expect(buildSolutionSheet(['khong-co-that'], {})).toHaveLength(0);
  });

  it('ghi lại phương án đã chọn, đáp án đúng và nội dung của cả hai', () => {
    const [entry] = buildSolutionSheet([trapped.id], {
      [trapped.id]: response({ questionId: trapped.id, value: trapChoice }),
    });
    expect(entry?.given).toBe(trapChoice);
    expect(entry?.correct).toBe(false);
    expect(entry?.givenText).toBe(trapped.choices?.find((c) => c.id === trapChoice)?.text);
    expect(entry?.answerText).toBe(trapped.choices?.find((c) => c.id === trapped.answer)?.text);
  });

  it('nêu lý do phương án đã chọn lại sai khi câu có chú thích bẫy', () => {
    const [entry] = buildSolutionSheet([trapped.id], {
      [trapped.id]: response({ questionId: trapped.id, value: trapChoice }),
    });
    expect(entry?.trapNote).toBe(trapped.traps?.[trapChoice]);
  });

  it('không hiện lý do sai khi người học chọn đúng', () => {
    const [entry] = buildSolutionSheet([trapped.id], {
      [trapped.id]: response({ questionId: trapped.id, value: trapped.answer }),
    });
    expect(entry?.correct).toBe(true);
    expect(entry?.trapNote).toBeNull();
  });

  it('đánh dấu câu bỏ trống và tính đúng tỉ lệ thời gian', () => {
    const [entry] = buildSolutionSheet([trapped.id], {
      [trapped.id]: response({ questionId: trapped.id, value: null, timeSpentMs: trapped.estimatedSeconds * 2000 }),
    });
    expect(entry?.blank).toBe(true);
    expect(entry?.givenText).toBeNull();
    expect(entry?.timeRatio).toBeCloseTo(2, 5);
  });

  it('gợi ý câu tương tự cùng chuyên đề và không trùng chính nó', () => {
    const target = ALL_QUESTIONS.find((x) => x.topicId === 'quantitative.statistics') as Question;
    const similar = findSimilarQuestions(target, 3);
    expect(similar.length).toBeGreaterThan(0);
    expect(similar.every((s) => s.id !== target.id)).toBe(true);
    expect(similar.every((s) => s.topicId === target.topicId)).toBe(true);
  });

  it('mọi mục đều kèm phiếu kiến thức của chuyên đề', () => {
    const ids = ALL_QUESTIONS.slice(0, 20).map((x) => x.id);
    for (const entry of buildSolutionSheet(ids, {})) {
      expect(entry.knowledge, entry.question.id).toBeDefined();
    }
  });
});

describe('bảng phân tích', () => {
  const sheet = getWorksheets()[0] as Worksheet;
  const ids = sheet.parts.flatMap((p) => p.questionIds);

  function answerAll(ratio: number, over: Partial<Response> = {}): Record<string, Response> {
    const out: Record<string, Response> = {};
    const correctCount = Math.round(ids.length * ratio);
    ids.forEach((id, i) => {
      const q = findQuestion(id);
      out[id] = response({
        questionId: id,
        value: i < correctCount ? (q?.answer ?? null) : '__sai__',
        timeSpentMs: (q?.estimatedSeconds ?? 60) * 800,
        ...over,
      });
    });
    return out;
  }

  it('tổng hợp đúng số câu và tỉ lệ', () => {
    const a = analyze(buildSolutionSheet(ids, answerAll(1)));
    expect(a.total).toBe(ids.length);
    expect(a.correct).toBe(ids.length);
    expect(a.ratio).toBe(1);
    expect(a.dominantError).toBeNull();
  });

  it('bỏ trống hết thì loại lỗi chính là chiến thuật', () => {
    const a = analyze(buildSolutionSheet(ids, answerAll(0, { value: null })));
    expect(a.dominantError).toBe('tactic');
    expect(a.errorCounts.tactic).toBe(ids.length);
    expect(a.verdict).toContain('chiến thuật');
  });

  it('sai mà tin chắc thì loại lỗi chính là kiến thức', () => {
    const a = analyze(buildSolutionSheet(ids, answerAll(0, { confidence: 'sure' })));
    expect(a.dominantError).toBe('knowledge');
    expect(a.verdict).toContain('kiến thức');
  });

  it('ba lát cắt đều có dữ liệu và chuyên đề yếu nhất đứng đầu', () => {
    const a = analyze(buildSolutionSheet(ids, answerAll(0.5)));
    expect(a.byTopic.length).toBeGreaterThan(0);
    expect(a.byDifficulty.length).toBeGreaterThan(0);
    expect(a.bySkill.length).toBeGreaterThan(0);
    for (let i = 1; i < a.byTopic.length; i += 1) {
      expect((a.byTopic[i]?.ratio ?? 0) >= (a.byTopic[i - 1]?.ratio ?? 0)).toBe(true);
    }
  });

  it('đếm đúng số câu sa lầy', () => {
    const slow = answerAll(1);
    for (const id of ids) {
      const q = findQuestion(id);
      slow[id] = response({ questionId: id, value: q?.answer ?? null, timeSpentMs: (q?.estimatedSeconds ?? 60) * 3000 });
    }
    expect(analyze(buildSolutionSheet(ids, slow)).sunkQuestions).toBe(ids.length);
  });

  it('lỗ hổng chỉ tính chuyên đề sai lặp lại từ 2 câu trở lên', () => {
    const one = buildSolutionSheet(ids.slice(0, 1), { [ids[0] as string]: response({ questionId: ids[0] as string, value: '__sai__' }) });
    expect(knowledgeGaps([one])).toHaveLength(0);

    const many = buildSolutionSheet(ids, answerAll(0));
    expect(knowledgeGaps([many]).length).toBeGreaterThan(0);
  });
});

describe('hồ sơ học viên', () => {
  const sheet = getWorksheets()[0] as Worksheet;
  const ids = sheet.parts.flatMap((p) => p.questionIds);

  function submit(state: ReturnType<typeof createInitialState>, ratio: number) {
    const responses: Record<string, Response> = {};
    const correctCount = Math.round(ids.length * ratio);
    ids.forEach((id, i) => {
      const q = findQuestion(id);
      responses[id] = response({
        questionId: id,
        value: i < correctCount ? (q?.answer ?? null) : '__sai__',
        timeSpentMs: (q?.estimatedSeconds ?? 60) * 900,
      });
    });
    return reducer(state, { type: 'worksheet/submit', worksheetId: sheet.id, responses, now: Date.now() });
  }

  it('lưu lại từng lượt làm phiếu để dựng lại bộ giải đề về sau', () => {
    let state = createInitialState();
    expect(state.worksheetRuns).toHaveLength(0);
    state = submit(state, 0.5);
    expect(state.worksheetRuns).toHaveLength(1);
    const run = state.worksheetRuns[0];
    expect(run?.worksheetId).toBe(sheet.id);
    expect(Object.keys(run?.responses ?? {}).length).toBe(ids.length);
    expect(run?.total).toBe(ids.length);
  });

  it('lịch sử lượt làm không phình vô hạn', () => {
    let state = createInitialState();
    for (let i = 0; i < 310; i += 1) state = submit(state, 0.5);
    expect(state.worksheetRuns.length).toBeLessThanOrEqual(300);
  });

  it('người mới có lộ trình khởi đầu thay vì hồ sơ trống', () => {
    const dossier = buildDossier(createInitialState());
    expect(dossier.history).toHaveLength(0);
    expect(dossier.roadmap.length).toBeGreaterThan(0);
    expect(dossier.roadmap[0]?.reason.length).toBeGreaterThan(20);
  });

  it('mỗi bước lộ trình đều nêu lý do và việc cần làm', () => {
    let state = createInitialState();
    state = submit(state, 0.3);
    const dossier = buildDossier(state);
    expect(dossier.roadmap.length).toBeGreaterThan(1);
    for (const step of dossier.roadmap) {
      expect(step.reason.length, step.id).toBeGreaterThan(20);
      expect(step.action.length, step.id).toBeGreaterThan(20);
    }
  });

  it('bỏ trống nhiều thì lộ trình ưu tiên sửa quy trình làm bài', () => {
    let state = createInitialState();
    const blanks: Record<string, Response> = {};
    for (const id of ids) blanks[id] = response({ questionId: id, value: null, timeSpentMs: 1000 });
    state = reducer(state, { type: 'worksheet/submit', worksheetId: sheet.id, responses: blanks, now: Date.now() });
    const dossier = buildDossier(state);
    expect(dossier.dominantError).toBe('tactic');
    expect(dossier.roadmap.some((s) => s.id === 'tactic')).toBe(true);
  });

  it('nhật ký học tập trỏ tới đúng đường dẫn xem đáp án', () => {
    let state = createInitialState();
    state = submit(state, 0.6);
    const dossier = buildDossier(state);
    expect(dossier.history).toHaveLength(1);
    expect(dossier.history[0]?.href).toContain('#/solutions?run=');
  });
});
