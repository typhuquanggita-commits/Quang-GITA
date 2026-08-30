import { describe, expect, it } from 'vitest';
import { ERROR_CLASSES } from '../src/data/perfect';
import {
  QUESTIONS_FOR_KPI,
  executionStats,
  executionStatsOf,
  questionsAnswered,
  recentErrors,
} from '../src/lib/executionLog';
import { maxErrorRateFor } from '../src/lib/perfect';
import { createInitialState, migrate } from '../src/lib/storage';
import { reducer } from '../src/store/reducer';
import type { ExecutionError, PersistedState } from '../src/types';

function errorAt(at: number, classId = 'misread'): ExecutionError {
  return { id: `e${at}`, at, classId, section: 'quantitative', note: 'ghi chú thử' };
}

describe('sổ lỗi thực thi', () => {
  it('ghi được một lỗi kèm phân nhóm và cắt ghi chú quá dài', () => {
    const before = createInitialState();
    const after = reducer(before, {
      type: 'execError/log',
      classId: 'rush',
      section: 'quantitative',
      note: 'x'.repeat(1000),
      now: 1000,
    });
    expect(after.executionErrors).toHaveLength(1);
    expect(after.executionErrors[0]?.classId).toBe('rush');
    expect(after.executionErrors[0]?.note.length).toBeLessThanOrEqual(400);
  });

  it('xóa được một lỗi đã ghi', () => {
    let state = createInitialState();
    state = reducer(state, { type: 'execError/log', classId: 'rush', section: 'science', note: 'a', now: 1 });
    const id = state.executionErrors[0]?.id ?? '';
    state = reducer(state, { type: 'execError/remove', id });
    expect(state.executionErrors).toHaveLength(0);
  });

  it('giữ tối đa 500 mục gần nhất để không phình bộ nhớ sau cả mùa thi', () => {
    let state = createInitialState();
    for (let i = 0; i < 520; i += 1) {
      state = reducer(state, {
        type: 'execError/log',
        classId: 'mismark',
        section: 'qualitative',
        note: `lỗi ${i}`,
        now: i,
      });
    }
    expect(state.executionErrors).toHaveLength(500);
    // Muc bi cat phai la muc CU nhat, khong phai muc moi nhat.
    expect(state.executionErrors[state.executionErrors.length - 1]?.note).toBe('lỗi 519');
  });

  it('dữ liệu cũ nâng cấp lên phiên bản mới mà không mất tiến độ', () => {
    const legacy = { ...createInitialState(), version: 7 } as Record<string, unknown>;
    delete legacy['executionErrors'];
    const migrated = migrate(legacy);
    expect(migrated.executionErrors).toEqual([]);
  });
});

describe('thống kê lỗi thực thi', () => {
  it('chỉ tính các lỗi trong cửa sổ thời gian đang xét', () => {
    const now = 100 * 86_400_000;
    const errors = [errorAt(now - 60 * 86_400_000), errorAt(now - 5 * 86_400_000)];
    expect(recentErrors(errors, 28, now)).toHaveLength(1);
  });

  it('chưa đủ số câu thì trả về null thay vì một tỉ lệ bịa', () => {
    // Mot ti le tinh tren vai chuc cau dao dong qua manh de ket luan dieu gi.
    const stats = executionStats([errorAt(1)], 50);
    expect(stats.rate).toBeNull();
    expect(stats.chance).toBeNull();
    expect(stats.withinBudget).toBeNull();
    expect(stats.total).toBe(1);
  });

  it('tính đúng tỉ lệ và xác suất đạt điểm tuyệt đối khi đủ dữ liệu', () => {
    const errors = Array.from({ length: 3 }, (_, i) => errorAt(i + 1));
    const stats = executionStats(errors, 1500);
    expect(stats.rate).toBeCloseTo(0.002, 6);
    expect(stats.oneErrorPer).toBe(500);
    expect(stats.chance ?? 0).toBeGreaterThan(0.7);
    expect(stats.withinBudget).toBe(true);
  });

  it('báo vượt ngưỡng khi tỉ lệ sai cao hơn biên lỗi cho phép', () => {
    const errors = Array.from({ length: 30 }, (_, i) => errorAt(i + 1));
    const stats = executionStats(errors, 1500);
    expect(stats.rate).toBeCloseTo(0.02, 6);
    expect(stats.withinBudget).toBe(false);
    expect(stats.chance ?? 1).toBeLessThan(0.1);
  });

  it('biên lỗi khớp với ngưỡng 50% cơ hội của giao thức', () => {
    const stats = executionStats([], 1500);
    expect(stats.budget).toBeCloseTo(maxErrorRateFor(0.5), 9);
    // Giao thuc phat bieu KPI la "khong qua 7 loi trong 10 de gan nhat".
    expect(stats.budgetPerTenPapers).toBe(6);
    expect(QUESTIONS_FOR_KPI).toBe(1500);
  });

  it('đếm theo nhóm lỗi và chỉ ra nhóm chiếm nhiều nhất', () => {
    // Phan loai duoc thi chong duoc: nhom chiem nhieu nhat la cho dat quy tac
    // chong cho tuan sau.
    const errors = [
      errorAt(1, 'misread'),
      errorAt(2, 'misread'),
      errorAt(3, 'misread'),
      errorAt(4, 'rush'),
    ];
    const stats = executionStats(errors, 1500);
    expect(stats.dominant?.classId).toBe('misread');
    expect(stats.dominant?.count).toBe(3);
    expect(stats.dominant?.share).toBeCloseTo(0.75, 6);
    // Moi nhom loi trong giao thuc deu co mat, ke ca nhom chua co loi nao.
    expect(stats.byClass).toHaveLength(ERROR_CLASSES.length);
  });

  it('đếm được lỗi theo từng phần thi', () => {
    const errors: ExecutionError[] = [
      { ...errorAt(1), section: 'quantitative' },
      { ...errorAt(2), section: 'science' },
      { ...errorAt(3), section: 'science' },
    ];
    const stats = executionStats(errors, 1500);
    expect(stats.bySection.science).toBe(2);
    expect(stats.bySection.quantitative).toBe(1);
    expect(stats.bySection.qualitative).toBe(0);
  });
});

describe('số câu đã làm trong cửa sổ', () => {
  function stateWithDays(days: Record<string, number>): PersistedState {
    const state = createInitialState();
    for (const [date, questions] of Object.entries(days)) {
      state.days[date] = { date, questions, correct: questions, minutes: 10 };
    }
    return state;
  }

  it('chỉ cộng các ngày nằm trong cửa sổ', () => {
    const now = new Date('2026-03-01T12:00:00');
    const state = stateWithDays({ '2026-02-25': 50, '2026-02-20': 30, '2025-12-01': 999 });
    expect(questionsAnswered(state, 28, now)).toBe(80);
  });

  it('nối được với thống kê để cho ra chỉ số hoàn chỉnh', () => {
    const now = new Date('2026-03-01T12:00:00');
    const state = stateWithDays({ '2026-02-25': 1500 });
    state.executionErrors = [errorAt(new Date('2026-02-25T00:00:00').getTime())];
    const stats = executionStatsOf(state, 28, now);
    expect(stats.questions).toBe(1500);
    expect(stats.total).toBe(1);
    expect(stats.withinBudget).toBe(true);
  });
});
