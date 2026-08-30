import { describe, expect, it } from 'vitest';
import {
  COMMITMENT,
  MARKET_REFERENCE,
  MAX_EXAM_ATTEMPTS_PER_YEAR,
  OFFICIAL_EXAM_FEE,
  PLANS,
  PLAN_BY_ID,
  PRICING_PRINCIPLES,
  PRICING_STATUS,
  SEASON_MONTHS,
  formatVnd,
  totalSeasonCost,
} from '../src/data/pricing';

describe('học phí', () => {
  it('mã gói không trùng và có đúng một gói mặc định', () => {
    const ids = PLANS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    // Goi mac dinh phai la goi GIUA, khong phai goi re nhat: goi re nhat chi
    // hop voi nguoi da co ky luat tu hoc, va do la thieu so.
    const featured = PLANS.filter((p) => p.featured);
    expect(featured).toHaveLength(1);
    expect(featured[0]?.id).toBe('co-kem');
  });

  it('giá tăng dần theo mức con người tham gia', () => {
    const ladder = ['tu-hoc', 'co-kem', 'coach'] as const;
    for (let i = 1; i < ladder.length; i += 1) {
      const lower = PLAN_BY_ID.get(ladder[i - 1] as (typeof ladder)[number]);
      const upper = PLAN_BY_ID.get(ladder[i] as (typeof ladder)[number]);
      expect(upper?.price ?? 0).toBeGreaterThan(lower?.price ?? 0);
    }
  });

  it('mọi gói đều nói rõ ai KHÔNG nên mua nó', () => {
    // Ban goi sai cho mot nguoi la mat nguoi do vinh vien, cong them nhung
    // nguoi ho ke lai. Day la rang buoc san pham, khong phai loi khuyen.
    for (const plan of PLANS) {
      expect(plan.notFor.length, plan.id).toBeGreaterThan(60);
      expect(plan.bestFor.length, plan.id).toBeGreaterThan(60);
      expect(plan.includes.length, plan.id).toBeGreaterThanOrEqual(4);
    }
  });

  it('gói cao hơn không cắt bớt nội dung của gói thấp hơn', () => {
    // Cat noi dung de ban goi cao hon la ban su thieu thon, khong phai ban
    // gia tri. Moi goi tinh phi deu phai bao ham goi duoi no.
    const paid = PLANS.filter((p) => p.id === 'co-kem' || p.id === 'coach');
    for (const plan of paid) {
      expect(plan.includes.some((i) => i.startsWith('Toàn bộ gói')), plan.id).toBe(true);
    }
  });

  it('giá nằm trong dải thị trường thật, không dưới sàn và không chạm giá neo', () => {
    // Bien duoi: khong re hon gia ban thuc re nhat cua phan khuc co giao vien
    // — di duoi do la tu xep minh vao nhom khoa video.
    // Bien tren: khong cham gia NIEM YET cua thi truong — vi gia niem yet la
    // gia neo, khong phai gia giao dich, va bam theo no la choi cung tro do.
    const guided = PLAN_BY_ID.get('co-kem')?.price ?? 0;
    const actuals = MARKET_REFERENCE.filter((r) => r.listed !== null).map((r) => r.actual);
    const listeds = MARKET_REFERENCE.map((r) => r.listed).filter((x): x is number => x !== null);

    expect(guided).toBeGreaterThanOrEqual(Math.min(...actuals));
    expect(guided).toBeLessThan(Math.min(...listeds));
  });

  it('bảng giá tạm thời được đánh dấu rõ là tạm thời', () => {
    // Mot bang gia tam thoi ma khong ai nho la tam thoi se tro thanh bang gia
    // chinh thuc sau ba thang.
    expect(['tam-thoi', 'da-chot']).toContain(PRICING_STATUS.state);
    expect(PRICING_STATUS.note.length).toBeGreaterThan(20);
    expect(PRICING_STATUS.decision.length).toBeGreaterThan(60);
  });

  it('bảng tham chiếu thị trường luôn ghi nguồn và lời giải thích', () => {
    expect(MARKET_REFERENCE.length).toBeGreaterThanOrEqual(3);
    for (const ref of MARKET_REFERENCE) {
      expect(ref.source.length, ref.segment).toBeGreaterThan(10);
      expect(ref.note.length, ref.segment).toBeGreaterThan(40);
      expect(ref.actual).toBeGreaterThan(0);
      if (ref.listed !== null) expect(ref.listed).toBeGreaterThan(ref.actual);
    }
  });

  it('quy đổi theo tháng khớp với giá trọn mùa', () => {
    for (const plan of PLANS) {
      if (plan.perMonth === null) continue;
      expect(plan.perMonth).toBe(Math.round(plan.price / SEASON_MONTHS));
    }
  });

  it('tổng chi phí cả mùa gồm cả lệ phí thi', () => {
    const plan = PLAN_BY_ID.get('tu-hoc');
    expect(totalSeasonCost('tu-hoc', 2)).toBe(
      (plan?.price ?? 0) + OFFICIAL_EXAM_FEE * MAX_EXAM_ATTEMPTS_PER_YEAR,
    );
    expect(totalSeasonCost('tu-hoc', 0)).toBe(plan?.price ?? 0);
    // Khong the tinh nhieu hon so luot toi da cho phep trong nam.
    expect(totalSeasonCost('tu-hoc', 99)).toBe(totalSeasonCost('tu-hoc', MAX_EXAM_ATTEMPTS_PER_YEAR));
    expect(totalSeasonCost('khong-ton-tai' as never)).toBe(0);
  });

  it('cam kết nêu rõ điều kiện và lý do, không để mơ hồ', () => {
    // Mot cam ket co dieu kien mo ho se bi tranh cai, va mot tranh cai voi phu
    // huynh dat hon nhieu lan so tien hoan lai.
    expect(COMMITMENT.conditions.length).toBeGreaterThanOrEqual(3);
    for (const condition of COMMITMENT.conditions) {
      expect(condition.length).toBeGreaterThan(20);
    }
    expect(COMMITMENT.why.length).toBeGreaterThan(120);
    // Cam ket MUC TANG, khong cam ket diem tuyet doi.
    expect(COMMITMENT.promise).toContain('tăng');
  });

  it('mọi nguyên tắc định giá đều giải thích được lý do', () => {
    expect(PRICING_PRINCIPLES.length).toBeGreaterThanOrEqual(4);
    for (const p of PRICING_PRINCIPLES) {
      expect(p.why.length, p.rule).toBeGreaterThan(80);
    }
  });

  it('định dạng tiền theo cách người Việt đọc', () => {
    expect(formatVnd(990_000)).toContain('990.000');
    expect(formatVnd(4_900_000)).toContain('4.900.000');
    expect(formatVnd(0)).toContain('0');
  });
});
