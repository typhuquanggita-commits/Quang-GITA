import { describe, expect, it } from 'vitest';
import {
  ABSORPTION_TIERS,
  ACTION_LEVELS,
  ENVIRONMENTS,
  GITA_CADENCES,
  GITA_PILLARS,
  HABITS,
  PILLAR_OF_KIND,
  PRACTITIONER_LEVELS,
  TEAM_PLAYBOOK,
} from '../src/data/gita';
import { KINDS } from '../src/data/curriculum';
import { PERMISSIONS } from '../src/data/roles';
import { can } from '../src/lib/permissions';
import {
  actionLevelOf,
  gitaIndex,
  habitCompletionToday,
  habitStatus,
  habitsForTier,
  paretoFocus,
  pillarScores,
  practitionerLevelOf,
  practitionersFor,
  tierStatus,
  weakestPillar,
} from '../src/lib/gita';
import { reducer } from '../src/store/reducer';
import { createInitialState } from '../src/lib/storage';
import { addDays, dayKey } from '../src/lib/format';
import type { GitaPillarId, PersistedState } from '../src/types';

describe('khung mô thức GITA', () => {
  it('có đúng bốn trụ cột G — I — T — A', () => {
    expect(GITA_PILLARS.map((p) => p.letter)).toEqual(['G', 'I', 'T', 'A']);
    expect(GITA_PILLARS.map((p) => p.englishName)).toEqual([
      'Goal',
      'Inspirits',
      'Talent',
      'Action / Academy',
    ]);
  });

  it('mỗi trụ cột có từ khóa, câu hỏi, sản phẩm hữu hình và kiểu sụp đổ riêng', () => {
    for (const pillar of GITA_PILLARS) {
      expect(pillar.keywords.length, pillar.id).toBeGreaterThanOrEqual(3);
      expect(pillar.question.endsWith('?'), pillar.id).toBe(true);
      expect(pillar.artifact.length, pillar.id).toBeGreaterThan(20);
      expect(pillar.failureMode.length, pillar.id).toBeGreaterThan(30);
      expect(pillar.indicators.length, pillar.id).toBeGreaterThanOrEqual(3);
    }
  });

  it('mỗi nhịp mô tả đủ việc cho cả bốn trụ cột', () => {
    for (const cadence of GITA_CADENCES) {
      for (const pillar of GITA_PILLARS) {
        expect(cadence.steps[pillar.id]?.length, `${cadence.id}/${pillar.id}`).toBeGreaterThan(20);
      }
      expect(cadence.closing.length).toBeGreaterThan(20);
    }
  });

  it('mọi dạng phiếu luyện đều phục vụ một trụ cột xác định', () => {
    for (const kind of KINDS) {
      expect(PILLAR_OF_KIND[kind.kind], kind.kind).toBeDefined();
    }
  });

  it('mọi môi trường đều có việc cho cả bốn trụ cột, có nghi thức và có cách đo', () => {
    for (const env of ENVIRONMENTS) {
      for (const pillar of GITA_PILLARS) {
        expect(env.practices[pillar.id]?.length, `${env.id}/${pillar.id}`).toBeGreaterThan(20);
      }
      expect(env.rituals.length).toBeGreaterThanOrEqual(3);
      expect(env.metrics.length).toBeGreaterThanOrEqual(3);
      expect(env.antiPatterns.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('mười hai thói quen phủ đều cả bốn trụ cột', () => {
    expect(HABITS).toHaveLength(12);
    const byPillar = new Map<GitaPillarId, number>();
    for (const habit of HABITS) {
      byPillar.set(habit.pillar, (byPillar.get(habit.pillar) ?? 0) + 1);
      expect(habit.cue.length, habit.id).toBeGreaterThan(10);
      expect(habit.routine.length, habit.id).toBeGreaterThan(20);
      expect(habit.why.length, habit.id).toBeGreaterThan(30);
    }
    for (const pillar of GITA_PILLARS) {
      expect(byPillar.get(pillar.id) ?? 0, pillar.id).toBeGreaterThanOrEqual(2);
    }
  });

  it('năm cấp độ hành động đều nêu rõ 20% việc quan trọng và việc cần cắt', () => {
    expect(ACTION_LEVELS).toHaveLength(5);
    for (const level of ACTION_LEVELS) {
      expect(level.vitalFew.length, level.id).toBeGreaterThan(30);
      expect(level.trivialMany.length, level.id).toBeGreaterThan(30);
      expect(level.signal.length, level.id).toBeGreaterThan(20);
      expect(level.unlock.length, level.id).toBeGreaterThan(10);
    }
  });

  it('giáo án đội nhóm có đủ vai, nghi thức, nguyên tắc thi đua và cách đo', () => {
    expect(TEAM_PLAYBOOK.roles.length).toBeGreaterThanOrEqual(4);
    expect(TEAM_PLAYBOOK.rituals.length).toBeGreaterThanOrEqual(3);
    expect(TEAM_PLAYBOOK.competitionRules.length).toBeGreaterThanOrEqual(3);
    expect(TEAM_PLAYBOOK.metrics.length).toBeGreaterThanOrEqual(3);
  });

  it('mọi quyền của cấp chuyên môn đều tồn tại và thật sự có ở vai trò tương ứng', () => {
    for (const level of PRACTITIONER_LEVELS) {
      for (const permission of level.authority) {
        expect(PERMISSIONS.some((p) => p.id === permission), `${level.id} → ${permission}`).toBe(true);
      }
      for (const role of level.roles) {
        const holds = level.authority.every((permission) => can({ role, rank: 3, level: 6 }, permission));
        expect(holds, `${level.id} ↔ ${role}`).toBe(true);
      }
    }
  });

  it('mỗi tầng hấp thu đều có trụ cột chính và ít nhất một cấp chuyên môn phục vụ', () => {
    for (const tier of ABSORPTION_TIERS) {
      expect(GITA_PILLARS.some((p) => p.id === tier.keyPillar), tier.id).toBe(true);
      expect(practitionersFor(tier.id).length, tier.id).toBeGreaterThan(0);
    }
  });
});

describe('tầng hấp thu', () => {
  it('người mới bắt đầu ở tầng H1 và biết cần gì để lên H2', () => {
    const status = tierStatus(createInitialState());
    expect(status.tier.id).toBe('H1');
    expect(status.next?.id).toBe('H2');
    expect(status.criteria.every((c) => !c.met)).toBe(true);
  });

  it('tầng được suy ra từ hành vi, không phải từ lời tự khai', () => {
    const state = createInitialState();
    state.profile.displayName = 'Người tự tin';
    expect(tierStatus(state).tier.id).toBe('H1');
  });

  it('tiến độ lên tầng phản ánh đúng số điều kiện đã đạt', () => {
    const state = createInitialState();
    const today = new Date();
    for (let i = 0; i < 8; i += 1) {
      const key = dayKey(addDays(today, -i));
      state.days[key] = { date: key, questions: 12, correct: 9, minutes: 20 };
    }
    const status = tierStatus(state, today);
    expect(status.criteria.find((c) => c.label.includes('Chuỗi'))?.met).toBe(true);
    expect(status.progress).toBeGreaterThan(0);
    expect(status.progress).toBeLessThan(1);
  });
});

describe('cấp chuyên môn', () => {
  it('học viên không nằm trên trục chuyên môn', () => {
    expect(practitionerLevelOf('student', 3)).toBeNull();
  });

  it('ánh xạ vai trò và bậc sang đúng cấp', () => {
    expect(practitionerLevelOf('mentor', 1)).toBe('P1');
    expect(practitionerLevelOf('teacher', 1)).toBe('P2');
    expect(practitionerLevelOf('teacher', 3)).toBe('P3');
    expect(practitionerLevelOf('headTeacher', 1)).toBe('P4');
    expect(practitionerLevelOf('headTeacher', 2)).toBe('P5');
    expect(practitionerLevelOf('coach', 1)).toBe('P3');
    expect(practitionerLevelOf('coach', 3)).toBe('P3');
    expect(practitionerLevelOf('consultant', 1)).toBe('P4');
    expect(practitionerLevelOf('consultant', 2)).toBe('P4');
    expect(practitionerLevelOf('productAdmin', 1)).toBe('P5');
    expect(practitionerLevelOf('superAdmin', 1)).toBe('P5');
  });

  it('vai trò vận hành thuần túy không được xếp bậc chuyên môn', () => {
    // Xep bua mot bac cho admin he thong se lam thang do nang luc mat y nghia.
    expect(practitionerLevelOf('sysAdmin', 2)).toBeNull();
    expect(practitionerLevelOf('executive', 1)).toBeNull();
  });
});

describe('chỉ số bốn trụ cột', () => {
  it('người mới có chỉ số thấp và trụ cột yếu nhất được nêu tên', () => {
    const state = createInitialState();
    expect(gitaIndex(state)).toBeLessThan(50);
    expect(GITA_PILLARS.some((p) => p.id === weakestPillar(state).pillar)).toBe(true);
  });

  it('mỗi trụ cột được tách thành các thành phần đo được', () => {
    for (const score of pillarScores(createInitialState())) {
      expect(score.parts.length, score.pillar).toBeGreaterThanOrEqual(4);
      expect(score.note.length, score.pillar).toBeGreaterThan(40);
      expect(score.value).toBeGreaterThanOrEqual(0);
      expect(score.value).toBeLessThanOrEqual(1);
    }
  });

  it('đặt ngày thi làm tăng trụ Goal', () => {
    const before = createInitialState();
    const beforeGoal = pillarScores(before).find((s) => s.pillar === 'goal')?.value ?? 0;
    const after: PersistedState = { ...before, settings: { ...before.settings, examDate: '2026-12-01' } };
    const afterGoal = pillarScores(after).find((s) => s.pillar === 'goal')?.value ?? 0;
    expect(afterGoal).toBeGreaterThan(beforeGoal);
  });

  it('giữ chuỗi ngày và thói quen làm tăng trụ Inspirits', () => {
    let state = createInitialState();
    const today = new Date();
    for (let i = 0; i < 14; i += 1) {
      const key = dayKey(addDays(today, -i));
      state.days[key] = { date: key, questions: 20, correct: 15, minutes: 30 };
    }
    const before = pillarScores(state, today).find((s) => s.pillar === 'inspirits')?.value ?? 0;

    for (const habit of HABITS.filter((h) => h.cadence === 'daily')) {
      for (let i = 0; i < 28; i += 1) {
        state = reducer(state, { type: 'habit/toggle', habitId: habit.id, date: dayKey(addDays(today, -i)) });
      }
    }
    const after = pillarScores(state, today).find((s) => s.pillar === 'inspirits')?.value ?? 0;
    expect(after).toBeGreaterThan(before);
  });

  it('luyện đều đặn làm tăng trụ Action', () => {
    const state = createInitialState();
    const today = new Date();
    for (let i = 0; i < 14; i += 1) {
      const key = dayKey(addDays(today, -i));
      state.days[key] = { date: key, questions: 30, correct: 24, minutes: 45 };
    }
    const action = pillarScores(state, today).find((s) => s.pillar === 'action')?.value ?? 0;
    expect(action).toBeGreaterThan(0.2);
  });
});

describe('quy tắc 20/80', () => {
  it('chọn ra tập chuyên đề nhỏ nhất chiếm khoảng 80% số điểm có thể lấy lại', () => {
    const pareto = paretoFocus(createInitialState());
    expect(pareto.topics.length).toBeGreaterThan(0);
    expect(pareto.concentration).toBeLessThan(1);
    const covered = pareto.topics.reduce((sum, t) => sum + t.share, 0);
    expect(covered).toBeGreaterThanOrEqual(0.8);
  });

  it('chuyên đề trọng số cao mà thành thạo thấp đứng đầu danh sách', () => {
    const state = createInitialState();
    // Làm cho một chuyên đề trọng số lớn trở nên rất yếu.
    state.mastery['qualitative.reading'] = {
      topicId: 'qualitative.reading',
      mastery: 0.05,
      attempts: 10,
      correct: 1,
      timeMs: 1000,
    };
    expect(paretoFocus(state).topics[0]?.topicId).toBe('qualitative.reading');
  });

  it('công sức rơi ngoài vùng trọng điểm thì focusRatio thấp', () => {
    const state = createInitialState();
    const now = Date.now();
    const pareto = paretoFocus(state);
    const outside = ['quantitative.arithmetic', 'quantitative.sequence'].filter(
      (id) => !pareto.topics.some((t) => t.topicId === id),
    );
    for (const id of outside) {
      state.mastery[id] = { topicId: id, mastery: 0.5, attempts: 20, correct: 10, timeMs: 1, lastPracticed: now };
    }
    expect(paretoFocus(state).focusRatio).toBeLessThan(0.5);
  });
});

describe('cấp độ hành động', () => {
  it('người mới ở cấp A1', () => {
    expect(actionLevelOf(createInitialState()).id).toBe('A1');
  });

  it('giữ chuỗi 7 ngày thì lên cấp A2', () => {
    const state = createInitialState();
    const today = new Date();
    for (let i = 0; i < 8; i += 1) {
      const key = dayKey(addDays(today, -i));
      state.days[key] = { date: key, questions: 10, correct: 8, minutes: 15 };
    }
    expect(actionLevelOf(state, today).id).toBe('A2');
  });

  it('mọi cấp đều nằm trong danh mục đã định nghĩa', () => {
    const level = actionLevelOf(createInitialState());
    expect(ACTION_LEVELS.some((l) => l.id === level.id)).toBe(true);
  });
});

describe('thói quen', () => {
  it('thói quen mở dần theo tầng hấp thu', () => {
    expect(habitsForTier('H1').length).toBeLessThan(habitsForTier('H5').length);
    expect(habitsForTier('H5').length).toBe(HABITS.length);
  });

  it('tích và bỏ tích một thói quen là thao tác đảo ngược được', () => {
    let state = createInitialState();
    const id = HABITS[0]?.id as string;
    state = reducer(state, { type: 'habit/toggle', habitId: id });
    expect(state.habits[id]?.done).toHaveLength(1);
    state = reducer(state, { type: 'habit/toggle', habitId: id });
    expect(state.habits[id]?.done).toHaveLength(0);
  });

  it('chuỗi thói quen đếm đúng số ngày liên tiếp', () => {
    let state = createInitialState();
    const habit = HABITS.find((h) => h.cadence === 'daily');
    expect(habit).toBeDefined();
    const today = new Date();
    for (let i = 0; i < 5; i += 1) {
      state = reducer(state, {
        type: 'habit/toggle',
        habitId: habit?.id ?? '',
        date: dayKey(addDays(today, -i)),
      });
    }
    const status = habitStatus(state, habit!, 'H5', today);
    expect(status.streak).toBe(5);
    expect(status.doneToday).toBe(true);
  });

  it('nhật ký thói quen không phình vô hạn', () => {
    let state = createInitialState();
    const id = HABITS[0]?.id as string;
    const today = new Date();
    for (let i = 0; i < 250; i += 1) {
      state = reducer(state, { type: 'habit/toggle', habitId: id, date: dayKey(addDays(today, -i)) });
    }
    expect(state.habits[id]?.done.length).toBeLessThanOrEqual(180);
  });

  it('đếm đúng số thói quen hằng ngày đã tích hôm nay', () => {
    let state = createInitialState();
    const daily = habitsForTier('H1').filter((h) => h.cadence === 'daily');
    state = reducer(state, { type: 'habit/toggle', habitId: daily[0]?.id ?? '' });
    const done = habitCompletionToday(state, 'H1');
    expect(done.done).toBe(1);
    expect(done.total).toBe(daily.length);
  });
});
