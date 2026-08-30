import { describe, expect, it } from 'vitest';
import { MAX_TOTAL_SCORE, TOTAL_QUESTIONS } from '../src/config';
import {
  CHECK_LAYERS,
  ERROR_CLASSES,
  PERFECT_DISCLAIMER,
  PERFECT_PHASES,
  PERFECT_PILLARS,
} from '../src/data/perfect';
import {
  PERFECT_CHANCES,
  abilityForPerfectChance,
  assessPerfect,
  cleanSheetProbability,
  maxErrorRateFor,
  observedErrorRate,
  oneErrorIn,
  perfectMilestones,
  perfectProbability,
} from '../src/lib/perfect';
import { createInitialState } from '../src/lib/storage';
import { TOPICS } from '../src/data/topics';
import type { PersistedState } from '../src/types';

describe('xác suất đạt điểm tuyệt đối', () => {
  it('tăng đơn điệu theo năng lực và luôn nằm trong khoảng 0 đến 1', () => {
    let previous = -1;
    for (const theta of [0, 1, 2, 3, 4, 5, 6, 8, 10]) {
      const p = perfectProbability(theta);
      expect(p).toBeGreaterThan(previous);
      expect(p).toBeGreaterThanOrEqual(0);
      expect(p).toBeLessThanOrEqual(1);
      previous = p;
    }
  });

  it('không bao giờ đạt 1, kể cả với năng lực rất lớn', () => {
    // Day la dieu buoc he thong phai noi that: 150 diem la mot bien co, khong
    // phai mot ket qua chac chan. Neu ham nay tra ve 1 thi giao dien se hua
    // mot dieu khong the bao dam.
    expect(perfectProbability(20)).toBeLessThan(1);
  });

  it('điểm kỳ vọng ở mọi mốc đều nhỏ hơn 150', () => {
    // He qua truc tiep cua dieu tren: khong co muc nang luc nao cho diem ky
    // vong bang dung thang diem toi da.
    for (const milestone of perfectMilestones()) {
      expect(milestone.expectedScore, `${milestone.chance}`).toBeLessThan(MAX_TOTAL_SCORE);
      expect(milestone.expectedScore, `${milestone.chance}`).toBeGreaterThan(140);
    }
  });

  it('nghịch đảo trả về đúng năng lực cho xác suất mong muốn', () => {
    for (const chance of PERFECT_CHANCES) {
      const theta = abilityForPerfectChance(chance);
      expect(perfectProbability(theta)).toBeCloseTo(chance, 4);
    }
  });

  it('mốc cơ hội cao hơn đòi hỏi năng lực cao hơn và biên lỗi hẹp hơn', () => {
    const milestones = perfectMilestones();
    for (let i = 1; i < milestones.length; i += 1) {
      const prev = milestones[i - 1];
      const cur = milestones[i];
      expect(cur?.ability ?? 0).toBeGreaterThan(prev?.ability ?? 0);
      expect(cur?.maxErrorRate ?? 1).toBeLessThan(prev?.maxErrorRate ?? 1);
      expect(cur?.oneErrorPer ?? 0).toBeGreaterThan(prev?.oneErrorPer ?? 0);
    }
  });
});

describe('biên lỗi thực thi', () => {
  it('xác suất sạch lỗi giảm theo số câu — đây là lý do 150 câu khắc nghiệt hơn 50 câu', () => {
    const rate = 0.01;
    expect(cleanSheetProbability(rate, 50)).toBeGreaterThan(cleanSheetProbability(rate, 150));
  });

  it('sai 1% mỗi câu chỉ cho khoảng 22% cơ hội làm đúng cả bài', () => {
    // Con so nay la ly do ca tru cot thu hai ton tai. Neu no sai thi toan bo
    // lap luan ve do chinh xac thuc thi sup do.
    expect(cleanSheetProbability(0.01, TOTAL_QUESTIONS)).toBeCloseTo(0.221, 2);
  });

  it('biên lỗi cho 50% cơ hội là khoảng một lỗi trong hơn 200 câu', () => {
    const rate = maxErrorRateFor(0.5);
    expect(oneErrorIn(rate)).toBeGreaterThan(200);
    expect(oneErrorIn(rate)).toBeLessThan(230);
  });

  it('biên lỗi và xác suất là hai chiều của cùng một phép tính', () => {
    for (const chance of [0.25, 0.5, 0.8]) {
      expect(cleanSheetProbability(maxErrorRateFor(chance))).toBeCloseTo(chance, 6);
    }
  });

  it('tỉ lệ sai bằng 0 thì không bao giờ chia cho 0', () => {
    expect(oneErrorIn(0)).toBe(Number.POSITIVE_INFINITY);
  });
});

describe('đánh giá người học theo mục tiêu tuyệt đối', () => {
  function stateWithMastery(values: Record<string, number>): PersistedState {
    const state = createInitialState();
    for (const [topicId, mastery] of Object.entries(values)) {
      state.mastery[topicId] = { topicId, mastery, attempts: 40, correct: Math.round(40 * mastery), timeMs: 0 };
    }
    return state;
  }

  it('đo bằng chuyên đề yếu nhất chứ không đo bằng trung bình', () => {
    // Voi muc tieu 150, trung binh la chi so gay hieu nham: de that lay cau o
    // moi chuyen de, nen mot lo hong duy nhat du lam hong ca bai.
    const all = Object.fromEntries(TOPICS.map((t) => [t.id, 0.99]));
    const strong = stateWithMastery(all);
    const oneHole = stateWithMastery({ ...all, 'quantitative.algebra': 0.6 });

    expect(assessPerfect(strong).chance).toBeGreaterThan(assessPerfect(oneHole).chance);
    expect(assessPerfect(oneHole).weakestMastery).toBeCloseTo(0.6, 6);
    expect(assessPerfect(oneHole).weakestTopicId).toBe('quantitative.algebra');
  });

  it('chỉ đếm các chuyên đề nằm trong chương trình của người học', () => {
    const assessment = assessPerfect(createInitialState());
    expect(assessment.totalTopics).toBeGreaterThan(0);
    expect(assessment.totalTopics).toBeLessThan(TOPICS.length);
    expect(assessment.topicsAtStandard).toBeLessThanOrEqual(assessment.totalTopics);
  });

  it('người mới bắt đầu có xác suất gần như bằng không, và hệ thống nói đúng như vậy', () => {
    expect(assessPerfect(createInitialState()).chance).toBeLessThan(0.001);
  });

  it('tỉ lệ sai quan sát được chỉ tính trên chuyên đề đã thành thạo', () => {
    // Sai o chuyen de chua hoc la lo hong kien thuc, khong phai loi bat can —
    // gop chung hai thu se lam chi so nay vo nghia.
    const state = createInitialState();
    state.mastery['quantitative.algebra'] = {
      topicId: 'quantitative.algebra',
      mastery: 0.4,
      attempts: 100,
      correct: 40,
      timeMs: 0,
    };
    expect(observedErrorRate(state)).toBeNull();

    state.mastery['quantitative.arithmetic'] = {
      topicId: 'quantitative.arithmetic',
      mastery: 0.95,
      attempts: 100,
      correct: 98,
      timeMs: 0,
    };
    expect(observedErrorRate(state)).toBeCloseTo(0.02, 6);
  });

  it('chưa đủ dữ liệu thì trả về null thay vì một con số bịa', () => {
    const state = createInitialState();
    state.mastery['quantitative.arithmetic'] = {
      topicId: 'quantitative.arithmetic',
      mastery: 0.95,
      attempts: 5,
      correct: 5,
      timeMs: 0,
    };
    expect(observedErrorRate(state)).toBeNull();
  });
});

describe('giao thức 150 điểm', () => {
  it('ba trụ cột, mỗi trụ có chỉ số đo được và giao thức làm được', () => {
    expect(PERFECT_PILLARS).toHaveLength(3);
    for (const pillar of PERFECT_PILLARS) {
      expect(pillar.question.endsWith('?'), pillar.id).toBe(true);
      expect(pillar.why.length, pillar.id).toBeGreaterThan(150);
      expect(pillar.metric.length, pillar.id).toBeGreaterThan(60);
      expect(pillar.protocol.length, pillar.id).toBeGreaterThanOrEqual(4);
      expect(pillar.bottleneck.length, pillar.id).toBeGreaterThan(80);
      for (const step of pillar.protocol) {
        expect(step.length, `${pillar.id}: ${step}`).toBeGreaterThan(40);
      }
    }
  });

  it('ba lớp kiểm tra xếp theo thời điểm và nói rõ mỗi lớp bắt được gì', () => {
    expect(CHECK_LAYERS).toHaveLength(3);
    for (let i = 1; i < CHECK_LAYERS.length; i += 1) {
      expect(CHECK_LAYERS[i]?.seconds ?? 0).toBeGreaterThan(CHECK_LAYERS[i - 1]?.seconds ?? 0);
    }
    for (const layer of CHECK_LAYERS) {
      expect(layer.actions.length, layer.name).toBeGreaterThanOrEqual(3);
      expect(layer.catches.length, layer.name).toBeGreaterThan(80);
    }
  });

  it('mỗi nhóm lỗi có dấu hiệu nhận ra và một thao tác vật lý chống lại', () => {
    // Mot cuon so ghi "hom nay sai 3 cau" khong dan toi hanh dong nao. Phan
    // loai duoc thi moi chong duoc.
    expect(ERROR_CLASSES.length).toBeGreaterThanOrEqual(4);
    expect(new Set(ERROR_CLASSES.map((e) => e.id)).size).toBe(ERROR_CLASSES.length);
    for (const cls of ERROR_CLASSES) {
      expect(cls.tell.length, cls.id).toBeGreaterThan(60);
      expect(cls.guard.length, cls.id).toBeGreaterThan(60);
      expect(cls.common.length, cls.id).toBeGreaterThanOrEqual(1);
    }
  });

  it('bốn giai đoạn phủ trọn quỹ thời gian và hai giai đoạn cuối không dành cho kiến thức', () => {
    const total = PERFECT_PHASES.reduce((n, p) => n + p.share, 0);
    expect(total).toBeCloseTo(1, 6);
    for (const [i, phase] of PERFECT_PHASES.entries()) {
      expect(phase.order).toBe(i + 1);
      expect(phase.exit.length, phase.name).toBeGreaterThan(30);
    }
    // Day la diem khac biet cua lo trinh nay: qua nua duong thi them gio hoc
    // kien thuc khong con la thu nang diem len nua.
    expect(PERFECT_PHASES[2]?.focus).toBe('execution');
    expect(PERFECT_PHASES[3]?.focus).toBe('endurance');
  });

  it('lời nói thẳng về mục tiêu 150 có mặt và nói đúng bản chất xác suất', () => {
    expect(PERFECT_DISCLAIMER.length).toBeGreaterThan(200);
    expect(PERFECT_DISCLAIMER).toContain('biến cố');
  });
});
