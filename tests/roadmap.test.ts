import { describe, expect, it } from 'vitest';
import { MAX_TOTAL_SCORE } from '../src/config';
import { TOPICS } from '../src/data/topics';
import {
  AMBITIOUS_TARGET,
  HORIZONS,
  MASTERY_CEILING,
  buildRoadmap,
  horizonFor,
  masteryAfterHours,
  weeklyHoursFromGoal,
} from '../src/lib/roadmap';
import { estimateProjectedFromMastery } from '../src/lib/analytics';
import { topicsInScope } from '../src/lib/section3';
import { createInitialState } from '../src/lib/storage';
import type { PersistedState } from '../src/types';

function stateWith(overrides: Partial<PersistedState['settings']> = {}): PersistedState {
  const base = createInitialState();
  return { ...base, settings: { ...base.settings, ...overrides } };
}

describe('đường học tập', () => {
  it('tiến bộ nhanh lúc đầu và chậm dần khi gần trần', () => {
    // Loi ich giam dan la ly do vi sao dan deu nhieu chuyen de yeu cho nhieu
    // diem hon dồn het gio vao mot chuyen de.
    const first = masteryAfterHours(0.5, 10) - 0.5;
    const second = masteryAfterHours(0.5, 20) - masteryAfterHours(0.5, 10);
    expect(second).toBeLessThan(first);
  });

  it('không bao giờ vượt trần thành thạo, kể cả với số giờ vô lý', () => {
    expect(masteryAfterHours(0.5, 100_000)).toBeLessThanOrEqual(MASTERY_CEILING);
    expect(masteryAfterHours(0.99, 0)).toBeLessThanOrEqual(MASTERY_CEILING);
  });

  it('không giờ nào thì không tiến bộ', () => {
    expect(masteryAfterHours(0.62, 0)).toBeCloseTo(0.62, 6);
  });
});

describe('quỹ thời gian', () => {
  it('chưa đặt ngày thi thì lấy nhịp chuẩn 8 tháng', () => {
    expect(horizonFor(null).id).toBe('8m');
  });

  it('suy đúng quỹ từ số ngày còn lại', () => {
    expect(horizonFor(7 * 20).id).toBe('6m');
    expect(horizonFor(7 * 30).id).toBe('8m');
    expect(horizonFor(7 * 45).id).toBe('12m');
    // Xa hon moi quy deu quy ve quy dai nhat, khong tra ve undefined.
    expect(horizonFor(7 * 200).id).toBe('12m');
  });

  it('quỹ giờ mỗi tuần tính cả thời gian chữa bài, không chỉ thời gian làm', () => {
    // Lam 30 cau theo nhip de that mat khoang 39 phut; chua bai mat chung ay
    // nua. Bo qua phan chua bai la cach uoc luong sai pho bien nhat.
    const hours = weeklyHoursFromGoal(30);
    expect(hours).toBeGreaterThan((30 * 78 * 7) / 3600);
    expect(hours).toBeLessThan((30 * 78 * 7 * 3) / 3600);
  });
});

describe('lộ trình cá nhân hóa', () => {
  it('phân bổ đúng số giờ của quỹ và không bỏ trắng chuyên đề nào có lợi', () => {
    const plan = buildRoadmap({ state: stateWith(), horizonId: '8m' });
    const allocated = plan.allocations.reduce((n, a) => n + a.hours, 0);
    expect(allocated).toBeLessThanOrEqual(plan.totalHours);
    expect(plan.allocations.length).toBeGreaterThan(0);
    for (const item of plan.allocations) {
      expect(item.hours).toBeGreaterThan(0);
      expect(item.masteryAfter).toBeGreaterThan(item.masteryNow);
    }
  });

  it('chỉ phân bổ cho chuyên đề nằm trong chương trình của người học', () => {
    const state = stateWith({ section3: { mode: 'science', subjects: ['physics', 'chemistry', 'biology'] } });
    const allowed = new Set(topicsInScope(state.settings.section3, TOPICS).map((t) => t.id));
    const plan = buildRoadmap({ state, horizonId: '8m' });
    for (const item of plan.allocations) {
      expect(allowed.has(item.topicId), item.topicId).toBe(true);
    }
  });

  it('quỹ dài hơn thì điểm chạm được cao hơn', () => {
    const short = buildRoadmap({ state: stateWith(), horizonId: '6m' });
    const long = buildRoadmap({ state: stateWith(), horizonId: '12m' });
    expect(long.scoreProjected).toBeGreaterThan(short.scoreProjected);
  });

  it('nhịp cao hơn thì điểm chạm được cao hơn', () => {
    const slow = buildRoadmap({ state: stateWith({ dailyGoal: 20 }), horizonId: '8m' });
    const fast = buildRoadmap({ state: stateWith({ dailyGoal: 60 }), horizonId: '8m' });
    expect(fast.scoreProjected).toBeGreaterThan(slow.scoreProjected);
  });

  it('nói thẳng khi mục tiêu ngoài tầm với thay vì hứa một con số đẹp', () => {
    const plan = buildRoadmap({ state: stateWith({ targetScore: 150 }), horizonId: '6m' });
    expect(plan.feasible).toBe(false);
    expect(plan.requiredWeeklyHours).toBeNull();
    expect(plan.ceilingScore).toBeLessThan(150);
  });

  it('mục tiêu vừa tầm thì trả về đúng nhịp cần có', () => {
    const plan = buildRoadmap({ state: stateWith({ targetScore: 110, dailyGoal: 10 }), horizonId: '8m' });
    expect(plan.requiredWeeklyHours).not.toBeNull();
    expect(plan.requiredWeeklyHours ?? 0).toBeGreaterThan(0);
  });

  it('trần không bao giờ thấp hơn điểm dự báo của chính nhịp đó', () => {
    // Neu tran thap hon du bao, he thong tu mau thuan: bao "khong kha thi"
    // ngay ca khi con so noi la dat duoc.
    for (const horizon of HORIZONS) {
      for (const dailyGoal of [10, 30, 60, 100]) {
        const plan = buildRoadmap({ state: stateWith({ dailyGoal }), horizonId: horizon.id });
        expect(plan.ceilingScore, `${horizon.id}/${dailyGoal}`).toBeGreaterThanOrEqual(
          plan.scoreProjected - 1e-6,
        );
      }
    }
  });

  it('mốc kiểm tra tăng dần và kết thúc đúng ở điểm dự báo cuối lộ trình', () => {
    const plan = buildRoadmap({ state: stateWith(), horizonId: '8m' });
    expect(plan.checkpoints.length).toBeGreaterThanOrEqual(4);
    const last = plan.checkpoints[plan.checkpoints.length - 1];
    expect(last?.expectedScore).toBeCloseTo(plan.scoreProjected, 6);
    for (let i = 1; i < plan.checkpoints.length; i += 1) {
      const prev = plan.checkpoints[i - 1];
      const cur = plan.checkpoints[i];
      expect(cur?.week ?? 0).toBeGreaterThanOrEqual(prev?.week ?? 0);
      expect(cur?.expectedScore ?? 0).toBeGreaterThanOrEqual(prev?.expectedScore ?? 0);
    }
  });

  it('ba giai đoạn phủ kín quỹ tuần, không chồng lấn và không hở', () => {
    for (const horizon of HORIZONS) {
      const plan = buildRoadmap({ state: stateWith(), horizonId: horizon.id });
      expect(plan.phases[0]?.weeks[0]).toBe(1);
      expect(plan.phases[plan.phases.length - 1]?.weeks[1]).toBe(horizon.weeks);
      for (let i = 1; i < plan.phases.length; i += 1) {
        expect(plan.phases[i]?.weeks[0]).toBe((plan.phases[i - 1]?.weeks[1] ?? 0) + 1);
      }
    }
  });

  it('điểm luôn nằm trong thang 150 và không giảm đi sau khi học', () => {
    const plan = buildRoadmap({ state: stateWith(), horizonId: '12m' });
    expect(plan.scoreNow).toBeGreaterThan(0);
    expect(plan.scoreProjected).toBeGreaterThanOrEqual(plan.scoreNow);
    expect(plan.scoreProjected).toBeLessThanOrEqual(MAX_TOTAL_SCORE);
    expect(plan.ceilingScore).toBeLessThanOrEqual(MAX_TOTAL_SCORE);
  });

  it('ngưỡng mục tiêu tham vọng nằm dưới thang điểm tối đa', () => {
    // Neu nguong nay bang thang toi da thi canh bao khong bao gio hien ra.
    expect(AMBITIOUS_TARGET).toBeLessThan(MAX_TOTAL_SCORE);
    expect(AMBITIOUS_TARGET).toBeGreaterThan(MAX_TOTAL_SCORE * 0.7);
  });

  it('điểm hiện tại khớp với điểm dự báo của bảng tổng quan', () => {
    /*
     * Hai man hinh cung noi ve mot nguoi hoc thi phai cho ra cung mot con so.
     * Truoc day bang tong quan nhan thang do thanh thao voi 50 con lo trinh di
     * qua chuoi Rasch, nen chenh nhau gan 9 diem — va nguoi hoc khong co cach
     * nao biet con so nao la that.
     */
    for (const dailyGoal of [10, 30, 60]) {
      const state = stateWith({ dailyGoal });
      const plan = buildRoadmap({ state, horizonId: '8m' });
      expect(plan.scoreNow).toBeCloseTo(estimateProjectedFromMastery(state), 6);
    }
  });

  it('người đã thành thạo cao thì được phân bổ ít giờ hơn người mới', () => {
    const strong = createInitialState();
    for (const topic of TOPICS) {
      strong.mastery[topic.id] = {
        topicId: topic.id,
        mastery: 0.9,
        attempts: 20,
        correct: 18,
        timeMs: 0,
      };
    }
    const strongPlan = buildRoadmap({ state: strong, horizonId: '8m' });
    const freshPlan = buildRoadmap({ state: stateWith(), horizonId: '8m' });
    expect(strongPlan.scoreNow).toBeGreaterThan(freshPlan.scoreNow);
    // Nguoi da manh thi moi gio cho it diem hon — loi ich giam dan.
    const strongGain = strongPlan.scoreProjected - strongPlan.scoreNow;
    const freshGain = freshPlan.scoreProjected - freshPlan.scoreNow;
    expect(strongGain).toBeLessThan(freshGain);
  });
});
