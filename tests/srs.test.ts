import { describe, expect, it } from 'vitest';
import { DAY_MS, createCard, dueCards, forecast, schedule } from '../src/lib/srs';

const NOW = 1_700_000_000_000;

describe('ôn tập ngắt quãng', () => {
  it('thẻ mới đến hạn ngay', () => {
    const card = createCard('q1', 'wrong', NOW);
    expect(card.due).toBe(NOW);
    expect(dueCards([card], NOW)).toHaveLength(1);
  });

  it('giãn khoảng cách theo chuỗi 1 → 3 → 7 ngày', () => {
    let card = createCard('q1', 'wrong', NOW);
    card = schedule(card, 2, { now: NOW });
    expect(card.intervalDays).toBe(1);
    card = schedule(card, 2, { now: NOW });
    expect(card.intervalDays).toBe(3);
    card = schedule(card, 2, { now: NOW });
    expect(card.intervalDays).toBe(7);
  });

  it('quên hẳn thì học lại trong phiên, không đợi sang ngày', () => {
    let card = createCard('q1', 'wrong', NOW);
    card = schedule(card, 2, { now: NOW });
    card = schedule(card, 0, { now: NOW });
    expect(card.intervalDays).toBe(0);
    expect(card.due - NOW).toBeLessThan(DAY_MS);
    expect(card.lapses).toBe(1);
  });

  it('mức "khó" chỉ rút ngắn khoảng cách chứ không xóa sạch tiến độ', () => {
    let card = createCard('q1', 'wrong', NOW);
    for (let i = 0; i < 4; i += 1) card = schedule(card, 2, { now: NOW });
    const before = card.intervalDays;
    card = schedule(card, 1, { now: NOW });
    expect(card.intervalDays).toBeLessThan(before);
    expect(card.intervalDays).toBeGreaterThan(0);
  });

  it('không bao giờ giãn quá trần ngày thi', () => {
    let card = createCard('q1', 'wrong', NOW);
    for (let i = 0; i < 10; i += 1) card = schedule(card, 3, { now: NOW, maxIntervalDays: 10 });
    expect(card.intervalDays).toBeLessThanOrEqual(10);
  });

  it('hệ số dễ luôn nằm trong khoảng an toàn', () => {
    let card = createCard('q1', 'wrong', NOW);
    for (let i = 0; i < 30; i += 1) card = schedule(card, 0, { now: NOW });
    expect(card.ease).toBeGreaterThanOrEqual(1.3);
    for (let i = 0; i < 30; i += 1) card = schedule(card, 3, { now: NOW });
    expect(card.ease).toBeLessThanOrEqual(3.2);
  });

  it('dự báo tải ôn tập gom đúng số thẻ vào từng ngày', () => {
    const cards = [
      { ...createCard('a', 'wrong', NOW), due: NOW },
      { ...createCard('b', 'wrong', NOW), due: NOW + DAY_MS },
      { ...createCard('c', 'wrong', NOW), due: NOW + DAY_MS },
    ];
    const buckets = forecast(cards, 5, NOW);
    expect(buckets[0]).toBe(1);
    expect(buckets[1]).toBe(2);
  });
});
