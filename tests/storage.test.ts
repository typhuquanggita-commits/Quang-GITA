import { describe, expect, it } from 'vitest';
import { STORAGE_VERSION } from '../src/config';
import {
  createInitialState,
  exportState,
  importState,
  migrate,
  sanitizeProfile,
  sanitizeSettings,
} from '../src/lib/storage';
import { subjectsOf } from '../src/lib/section3';
import { SCIENCE_PICK } from '../src/types';

describe('lưu trữ có phiên bản', () => {
  it('nâng cấp dữ liệu phiên bản 1 mà không mất tiến độ đã có', () => {
    const legacy = {
      version: 1,
      profile: { displayName: 'Minh', createdAt: 1 },
      settings: { targetScore: 120, examDate: '2026-05-10', scienceSubject: 'physics' },
      attempts: [{ id: 'a1' }],
      results: [{ attemptId: 'a1', total: 100 }],
      srs: { q1: { questionId: 'q1' } },
      mastery: {},
      days: { '2026-01-01': { date: '2026-01-01', questions: 10, correct: 8, minutes: 12 } },
      seen: { q1: 2 },
    };

    const next = migrate(legacy);
    expect(next.version).toBe(STORAGE_VERSION);
    expect(next.profile.displayName).toBe('Minh');
    expect(next.settings.targetScore).toBe(120);
    expect(next.attempts).toHaveLength(1);
    expect(next.results).toHaveLength(1);
    expect(next.days['2026-01-01']?.questions).toBe(10);
    // Các trường mới của phiên bản sau phải có mặt với giá trị hợp lệ.
    expect(next.worksheets).toEqual({});
    expect(next.tracks).toEqual({});
    expect(next.stage).toBe(1);
    expect(next.profile.role).toBe('student');
    expect(next.profile.rank).toBe(1);
  });

  it('tệp thiếu trường vẫn nạp được thay vì làm hỏng ứng dụng', () => {
    const next = migrate({ version: STORAGE_VERSION, profile: { displayName: 'A' } });
    expect(next.settings.targetScore).toBeGreaterThan(0);
    expect(Array.isArray(next.attempts)).toBe(true);
  });

  it('xuất rồi nhập lại cho ra đúng trạng thái ban đầu', () => {
    const state = createInitialState(1234);
    state.settings.targetScore = 138;
    state.xp = 420;
    const restored = importState(exportState(state));
    expect(restored.settings.targetScore).toBe(138);
    expect(restored.xp).toBe(420);
  });

  it('từ chối tệp không đúng định dạng', () => {
    expect(() => importState('"chuỗi thường"')).toThrow();
  });

  it('không bao giờ xuất khóa API ra tệp', () => {
    // Tep xuat ra hay duoc gui cho giao vien hoac luu tren dam may, nen mot
    // khoa nam trong do la ro ri thong tin xac thuc that.
    const state = createInitialState();
    state.settings.aiApiKey = 'AIzaSyD-khoa-that-khong-duoc-lo';
    const json = exportState(state);
    expect(json).not.toContain('AIzaSyD-khoa-that-khong-duoc-lo');
    expect(json).not.toContain('aiApiKey');
    expect(importState(json).settings.aiApiKey).toBe('');
  });

  it('tệp nhập vào không dựng được vai trò lạ hay cấp bậc vượt khung', () => {
    const forged = migrate({
      version: STORAGE_VERSION,
      profile: { displayName: 'X', role: 'root', rank: 99 },
    });
    expect(forged.profile.role).toBe('student');
    expect(forged.profile.rank).toBe(3);

    const overRank = sanitizeProfile({ ...createInitialState().profile, role: 'executive', rank: 7 });
    expect(overRank.rank).toBe(1);
  });

  it('tệp nhập vào không đặt được giai đoạn hay điểm kinh nghiệm vô lý', () => {
    const forged = migrate({ version: STORAGE_VERSION, stage: 99, xp: -50 });
    expect(forged.stage).toBeLessThanOrEqual(3);
    expect(forged.xp).toBe(0);

    const nan = migrate({ version: STORAGE_VERSION, stage: 'ba', xp: 'nhiều' });
    expect(nan.stage).toBe(1);
    expect(nan.xp).toBe(0);
  });

  it('chặn giá trị cài đặt vô lý', () => {
    const settings = sanitizeSettings({
      ...createInitialState().settings,
      targetScore: 9999,
      fontScale: 12,
      dailyGoal: -5,
      theme: 'neon' as never,
      section3: { mode: 'science', subjects: ['astrology', 'physics'] } as never,
    });
    expect(settings.targetScore).toBe(150);
    expect(settings.fontScale).toBeLessThanOrEqual(1.375);
    expect(settings.dailyGoal).toBeGreaterThanOrEqual(5);
    expect(settings.theme).toBe('system');
    // Chu de la bi loai, va lua chon van duoc bu cho du dung ba chu de.
    expect(settings.section3.mode).toBe('science');
    expect(subjectsOf(settings.section3)).toHaveLength(SCIENCE_PICK);
    expect(subjectsOf(settings.section3)).not.toContain('astrology');
    expect(subjectsOf(settings.section3)[0]).toBe('physics');
  });
});
