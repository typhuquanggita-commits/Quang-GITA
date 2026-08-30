import { describe, expect, it } from 'vitest';
import { STAGES } from '../src/data/curriculum';
import { KINDS } from '../src/data/curriculum';
import { GITA_PILLARS } from '../src/data/gita';
import { SECTIONS } from '../src/config';
import {
  SEASON_WEEKS,
  SYLLABUS,
  SYLLABUS_BY_WEEK,
  SYLLABUS_PHASES,
  currentWeek,
  stageName,
  weeksOfStage,
} from '../src/data/syllabus';
import {
  CERT_DISCLAIMER,
  CERT_LEVELS,
  CERT_MAX_SCORE,
  EXAM_RULES,
  certificateCode,
  gradeCertification,
  sectionMax,
} from '../src/data/certification';

describe('đề cương trọn mùa', () => {
  it('đủ 32 tuần, đánh số liên tục, không thiếu không trùng', () => {
    expect(SYLLABUS).toHaveLength(SEASON_WEEKS);
    expect(SYLLABUS.map((w) => w.week)).toEqual(
      Array.from({ length: SEASON_WEEKS }, (_, i) => i + 1),
    );
  });

  it('ba giai đoạn phủ kín 32 tuần, không chồng lấn', () => {
    const covered = new Set<number>();
    for (const phase of SYLLABUS_PHASES) {
      for (let w = phase.weeks[0]; w <= phase.weeks[1]; w += 1) {
        expect(covered.has(w), `tuần ${w} bị phủ hai lần`).toBe(false);
        covered.add(w);
        expect(SYLLABUS_BY_WEEK.get(w)?.stage, `tuần ${w}`).toBe(phase.stage);
      }
    }
    expect(covered.size).toBe(SEASON_WEEKS);
  });

  it('mỗi giai đoạn khớp với một giai đoạn có thật trong khung chương trình', () => {
    for (const phase of SYLLABUS_PHASES) {
      expect(STAGES.some((s) => s.stage === phase.stage), `giai đoạn ${phase.stage}`).toBe(true);
      expect(stageName(phase.stage).length).toBeGreaterThan(3);
    }
  });

  it('mỗi giai đoạn nêu được cái bẫy đặc trưng và dấu hiệu sẵn sàng đi tiếp', () => {
    for (const phase of SYLLABUS_PHASES) {
      expect(phase.trap.length, `giai đoạn ${phase.stage}`).toBeGreaterThan(80);
      expect(phase.exit.length, `giai đoạn ${phase.stage}`).toBeGreaterThan(40);
      expect(phase.purpose.length).toBeGreaterThan(80);
    }
  });

  it('mọi tuần đều có cách tự kiểm là một VIỆC LÀM ĐƯỢC, không phải cảm giác', () => {
    for (const week of SYLLABUS) {
      expect(week.checkpoint.length, `tuần ${week.week}`).toBeGreaterThan(30);
      expect(week.goal.length, `tuần ${week.week}`).toBeGreaterThan(40);
      // Khong duoc phep la mot cam giac chung chung.
      expect(week.checkpoint).not.toMatch(/^cảm thấy|^tự tin hơn/i);
    }
  });

  it('mọi tham chiếu phần thi, loại phiếu và trụ cột đều có thật', () => {
    for (const week of SYLLABUS) {
      expect(week.focus.length, `tuần ${week.week}`).toBeGreaterThan(0);
      for (const section of week.focus) {
        expect(SECTIONS.some((s) => s.id === section), section).toBe(true);
      }
      for (const kind of week.kinds) {
        expect(KINDS.some((k) => k.kind === kind), kind).toBe(true);
      }
      expect(GITA_PILLARS.some((p) => p.id === week.pillar), week.pillar).toBe(true);
    }
  });

  it('có cột mốc ở cuối mỗi giai đoạn và ở tuần thi chứng chỉ', () => {
    const milestones = SYLLABUS.filter((w) => w.milestone);
    expect(milestones.length).toBeGreaterThanOrEqual(5);
    expect(SYLLABUS_BY_WEEK.get(1)?.milestone).toContain('định vị');
    expect(SYLLABUS_BY_WEEK.get(29)?.milestone).toContain('chứng chỉ');
    // Tuan cuoi khong duoc phep co cot moc nap kien thuc moi.
    expect(SYLLABUS_BY_WEEK.get(32)?.goal).toContain('Không học kiến thức mới');
  });

  it('tuần hiện tại suy đúng từ số ngày còn lại', () => {
    expect(currentWeek(null)).toBeNull();
    expect(currentWeek(SEASON_WEEKS * 7)).toBe(1);
    expect(currentWeek(0)).toBe(SEASON_WEEKS);
    expect(currentWeek(7)).toBe(SEASON_WEEKS);
    // Ngoai khoang van phai tra ve mot tuan hop le.
    expect(currentWeek(9999)).toBe(1);
  });

  it('số tuần mỗi giai đoạn khớp giữa hai cách đếm', () => {
    for (const phase of SYLLABUS_PHASES) {
      expect(weeksOfStage(phase.stage).length).toBe(phase.weeks[1] - phase.weeks[0] + 1);
    }
  });
});

describe('kỳ thi cấp chứng chỉ', () => {
  const full = (n: number) => SECTIONS.map((s) => ({ section: s.id, score: n }));

  it('bốn bậc xếp giảm dần, không bậc nào trùng ngưỡng', () => {
    for (let i = 1; i < CERT_LEVELS.length; i += 1) {
      expect(CERT_LEVELS[i]?.minScore ?? 0).toBeLessThan(CERT_LEVELS[i - 1]?.minScore ?? 0);
      expect(CERT_LEVELS[i]?.minPerSection ?? 0).toBeLessThan(
        CERT_LEVELS[i - 1]?.minPerSection ?? 0,
      );
    }
  });

  it('không cho bù trừ giữa các phần dù tổng điểm đã đủ', () => {
    // 45 + 45 + 18 = 108, du tong cho bac Vang (100) nhung phan thu ba chi 18
    // — duoi diem san 30. De that khong cho bo qua mot phan, nen chung chi
    // cung khong duoc phep.
    const lopsided = [
      { section: 'quantitative' as const, score: 45 },
      { section: 'qualitative' as const, score: 45 },
      { section: 'science' as const, score: 18 },
    ];
    const result = gradeCertification(lopsided);
    expect(result.total).toBe(108);
    expect(result.level?.id).not.toBe('vang');
    expect(result.level?.id).not.toBe('kim-cuong');
  });

  it('chỉ ra đúng phần đang kéo kết quả xuống', () => {
    // "Ban thieu 5 diem" la thong tin vo dung; "phan Van dang keo ket qua
    // xuong" thi dung duoc ngay.
    const result = gradeCertification([
      { section: 'quantitative', score: 45 },
      { section: 'qualitative', score: 20 },
      { section: 'science', score: 45 },
    ]);
    expect(result.blockingSection).toBe('qualitative');
  });

  it('điểm cao và đều thì đạt bậc cao nhất', () => {
    const result = gradeCertification(full(45));
    expect(result.total).toBe(135);
    expect(result.level?.id).toBe('kim-cuong');
    expect(result.next).toBeNull();
    expect(result.pointsToNext).toBe(0);
  });

  it('điểm quá thấp thì chưa đạt bậc nào, nhưng vẫn chỉ ra bậc kế tiếp', () => {
    const result = gradeCertification(full(10));
    expect(result.level).toBeNull();
    expect(result.next?.id).toBe('dong');
    expect(result.pointsToNext).toBeGreaterThan(0);
  });

  it('mã tra cứu ổn định, đọc được qua điện thoại, không có ký tự dễ nhầm', () => {
    const at = Date.parse('2026-04-15T00:00:00Z');
    const a = certificateCode('Nguyễn Văn A', 120, at);
    const b = certificateCode('Nguyễn Văn A', 120, at);
    expect(a).toBe(b);
    expect(a).toMatch(/^HSA365-\d{6}-[2-9A-HJ-NP-Z]{6}$/);
    // Khong duoc chua 0, O, 1, I — bon ky tu nguoi ta doc nham qua dien thoai.
    expect(a.split('-')[2]).not.toMatch(/[01OI]/);
    expect(certificateCode('Trần Thị B', 120, at)).not.toBe(a);
  });

  it('chứng chỉ luôn mang dòng tuyên bố giới hạn, không phóng đại', () => {
    // Mot to giay noi qua ve chinh no se lam hong niem tin vao moi thu con lai.
    expect(CERT_DISCLAIMER).toContain('không phải chứng chỉ của Đại học Quốc gia Hà Nội');
    expect(CERT_DISCLAIMER).toContain('không có giá trị xét tuyển');
  });

  it('mỗi bậc nêu được ý nghĩa và việc tiếp theo cụ thể', () => {
    for (const level of CERT_LEVELS) {
      expect(level.meaning.length, level.id).toBeGreaterThan(60);
      expect(level.nextStep.length, level.id).toBeGreaterThan(60);
      expect(level.minScore).toBeLessThanOrEqual(CERT_MAX_SCORE);
      expect(level.minPerSection * SECTIONS.length).toBeLessThanOrEqual(level.minScore + 20);
    }
  });

  it('quy chế nêu rõ lý do của từng điều', () => {
    expect(EXAM_RULES.length).toBeGreaterThanOrEqual(4);
    for (const rule of EXAM_RULES) {
      expect(rule.why.length, rule.rule).toBeGreaterThan(70);
    }
  });

  it('điểm tối đa mỗi phần lấy từ cấu trúc đề thật', () => {
    for (const spec of SECTIONS) {
      expect(sectionMax(spec.id)).toBe(spec.questionCount);
    }
    const sum = SECTIONS.reduce((n, s) => n + sectionMax(s.id), 0);
    expect(sum).toBe(CERT_MAX_SCORE);
  });
});
