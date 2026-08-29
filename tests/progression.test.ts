import { describe, expect, it } from 'vitest';
import { getWorksheets, worksheetById } from '../src/data/worksheets';
import { findQuestion } from '../src/data/questions';
import { diagnose, gradeWorksheet, nextStep, prescribe, stageKpi, trackStatus } from '../src/lib/progression';
import { reducer } from '../src/store/reducer';
import { createInitialState } from '../src/lib/storage';
import type { PersistedState, Response, Worksheet } from '../src/types';

function answerAll(sheet: Worksheet, ratio: number, timeFactor = 1): Record<string, Response> {
  const ids = sheet.parts.flatMap((p) => p.questionIds);
  const correctCount = Math.round(ids.length * ratio);
  const responses: Record<string, Response> = {};
  ids.forEach((id, index) => {
    const question = findQuestion(id);
    responses[id] = {
      questionId: id,
      value: index < correctCount ? (question?.answer ?? null) : '__sai__',
      flagged: false,
      timeSpentMs: ((sheet.seconds * 1000) / Math.max(1, ids.length)) * timeFactor,
      visits: 1,
      changes: 0,
    };
  });
  return responses;
}

const sheet = getWorksheets()[0] as Worksheet;

describe('chấm phiếu luyện', () => {
  it('làm đúng hết thì vừa hoàn thành vừa thành thạo', () => {
    const outcome = gradeWorksheet(sheet, answerAll(sheet, 1));
    expect(outcome.ratio).toBe(1);
    expect(outcome.passed).toBe(true);
    expect(outcome.mastered).toBe(true);
  });

  it('dưới ngưỡng thì không được tính hoàn thành', () => {
    const outcome = gradeWorksheet(sheet, answerAll(sheet, 0.4));
    expect(outcome.passed).toBe(false);
    expect(outcome.mastered).toBe(false);
  });

  it('đúng nhiều nhưng quá giờ thì không được tính thành thạo', () => {
    const outcome = gradeWorksheet(sheet, answerAll(sheet, 1, 3));
    expect(outcome.passed).toBe(true);
    expect(outcome.mastered).toBe(false);
  });

  it('bỏ trống được đếm riêng và luôn sinh nhận xét cảnh báo', () => {
    const responses = answerAll(sheet, 1);
    const first = Object.keys(responses)[0] as string;
    const target = responses[first] as Response;
    responses[first] = { ...target, value: null };
    const outcome = gradeWorksheet(sheet, responses);
    expect(outcome.blanks).toBe(1);
    expect(diagnose(sheet, outcome).some((n) => n.id === 'blank')).toBe(true);
  });

  it('kê đơn luôn đưa ra ít nhất một việc cụ thể', () => {
    const outcome = gradeWorksheet(sheet, answerAll(sheet, 0.5));
    expect(prescribe(sheet, outcome, []).length).toBeGreaterThan(0);
  });
});

describe('dòng chảy sau khi nộp', () => {
  it('chưa đạt thì hướng làm lại chính phiếu đó', () => {
    const state = createInitialState();
    const outcome = gradeWorksheet(sheet, answerAll(sheet, 0.3));
    const step = nextStep(state, sheet, outcome);
    expect(step.kind).toBe('retry');
    expect(step.worksheetId).toBe(sheet.id);
  });

  it('thành thạo thì đẩy sang phiếu kế tiếp chứ không lặp lại', () => {
    const state = createInitialState();
    const outcome = gradeWorksheet(sheet, answerAll(sheet, 1));
    const step = nextStep(state, sheet, outcome);
    expect(step.kind === 'next' || step.kind === 'test' || step.kind === 'levelup').toBe(true);
  });
});

describe('tiến độ và KPI', () => {
  function submit(state: PersistedState, target: Worksheet, ratio: number): PersistedState {
    return reducer(state, {
      type: 'worksheet/submit',
      worksheetId: target.id,
      responses: answerAll(target, ratio),
      now: Date.now(),
    });
  }

  it('ghi nhận tiến độ và giữ lại kết quả tốt nhất', () => {
    let state = createInitialState();
    state = submit(state, sheet, 1);
    state = submit(state, sheet, 0.2);
    const progress = state.worksheets[sheet.id];
    expect(progress?.attempts).toBe(2);
    expect(progress?.bestRatio).toBe(1);
    expect(progress?.lastRatio).toBeCloseTo(0.2, 1);
    expect(progress?.mastered).toBe(true);
  });

  it('kinh nghiệm chỉ cộng khi có cải thiện, không cộng khi cày lại', () => {
    let state = createInitialState();
    state = submit(state, sheet, 1);
    const afterFirst = state.xp;
    state = submit(state, sheet, 1);
    expect(state.xp).toBe(afterFirst);
  });

  it('KPI giai đoạn phản ánh đúng độ chính xác trên các phiếu đã làm', () => {
    let state = createInitialState();
    const stageOne = getWorksheets().filter((s) => s.stage === 1 && s.section !== 'science').slice(0, 4);
    for (const item of stageOne) state = submit(state, item, 1);
    const kpi = stageKpi(state, 1);
    expect(kpi.kpi).toBe(1);
    expect(kpi.attempted).toBe(stageOne.length);
    // Mới làm vài phiếu thì chưa đủ độ phủ để xét lên giai đoạn.
    expect(kpi.eligible).toBe(false);
  });

  it('lên cấp cần vừa đủ số phiếu thành thạo vừa vượt ải', () => {
    let state = createInitialState();
    const chain = getWorksheets().filter(
      (s) => s.topicId === sheet.topicId && s.level === 1,
    );
    for (const item of chain.filter((s) => s.kind !== 'test').slice(0, 3)) {
      state = submit(state, item, 1);
    }
    expect(trackStatus(state, sheet.topicId).canLevelUp).toBe(false);

    const finalTest = chain.find((s) => s.kind === 'test');
    if (finalTest) state = submit(state, finalTest, 1);
    expect(trackStatus(state, sheet.topicId).canLevelUp).toBe(true);

    state = reducer(state, { type: 'track/levelUp', topicId: sheet.topicId });
    expect(state.tracks[sheet.topicId]?.level).toBe(2);
  });

  it('phiếu tiên quyết chặn đúng: chưa hoàn thành thì chưa mở khóa', () => {
    const state = createInitialState();
    const locked = getWorksheets().find((s) => s.requires);
    expect(locked).toBeDefined();
    const required = worksheetById(locked?.requires ?? '');
    expect(required).toBeDefined();
    expect(state.worksheets[required?.id ?? '']).toBeUndefined();
  });
});
