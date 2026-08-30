import { describe, expect, it } from 'vitest';
import {
  attentionOrder,
  buildAssignment,
  buildFamilyReport,
  buildRow,
  familyActionsFor,
  flagsFor,
  lastActiveAt,
  loadSnapshot,
  summarizeCohort,
  type LearnerRow,
  type LearnerSnapshot,
} from '../src/lib/cohort';
import { createInitialState, exportState } from '../src/lib/storage';
import type { PersistedState } from '../src/types';

function snapshotOf(name: string, mutate: (s: PersistedState) => void = () => {}): LearnerSnapshot {
  const state = createInitialState(1_000);
  state.profile = { ...state.profile, displayName: name };
  mutate(state);
  return loadSnapshot(`${name}.json`, exportState(state));
}

const NOW = new Date('2026-03-10T08:00:00Z');

describe('bảng lớp', () => {
  it('nạp được tệp học viên và giữ đúng tên hiển thị', () => {
    const snapshot = snapshotOf('Minh');
    expect(snapshot.name).toBe('Minh');
    expect(snapshot.state.version).toBeGreaterThan(0);
  });

  it('tệp xuất không mang khóa API sang máy giáo viên', () => {
    // Giao vien nap ho so ca lop; mot khoa lot vao day la ro ri that.
    const state = createInitialState();
    state.settings.aiApiKey = 'AIzaSy-khoa-that';
    const snapshot = loadSnapshot('x.json', exportState(state));
    expect(snapshot.state.settings.aiApiKey).toBe('');
  });

  it('tệp hỏng bị từ chối chứ không làm hỏng bảng lớp', () => {
    expect(() => loadSnapshot('hong.json', 'khong-phai-json')).toThrow();
    expect(() => loadSnapshot('hong.json', '"chuỗi"')).toThrow();
  });

  it('vai trò lạ trong tệp nạp vào bị đưa về học viên', () => {
    const raw = JSON.stringify({ version: 6, profile: { displayName: 'X', role: 'superAdmin', rank: 9 } });
    const snapshot = loadSnapshot('gia-mao.json', raw);
    expect(snapshot.state.profile.role).toBe('student');
  });

  it('người chưa hoạt động lần nào bị gắn cờ đỏ kèm việc cụ thể', () => {
    const row = buildRow(snapshotOf('Mới'), NOW);
    const flag = row.flags.find((f) => f.id === 'never');
    expect(flag?.tone).toBe('bad');
    expect(flag?.action.length).toBeGreaterThan(30);
  });

  it('mọi cảnh báo đều kèm một việc cụ thể, không chỉ là nhận xét', () => {
    // Mot bang lop chi to do cac o "yeu" thi giao vien doc xong van khong biet
    // lam gi — va se ngung doc no sau vai tuan.
    const rows: LearnerRow[] = [
      buildRow(snapshotOf('A'), NOW),
      buildRow(
        snapshotOf('B', (s) => {
          s.days['2026-03-09'] = { date: '2026-03-09', questions: 10, correct: 8, minutes: 15 };
        }),
        NOW,
      ),
    ];
    for (const row of rows) {
      for (const flag of row.flags) {
        expect(flag.action.length, `${row.snapshot.name}/${flag.id}`).toBeGreaterThan(30);
        expect(flag.label.length).toBeGreaterThan(4);
      }
    }
  });

  it('xếp theo mức cần chú ý, không xếp theo điểm', () => {
    const inactive = buildRow(snapshotOf('Nghỉ lâu'), NOW);
    const active = buildRow(
      snapshotOf('Đang học', (s) => {
        s.days['2026-03-10'] = { date: '2026-03-10', questions: 20, correct: 18, minutes: 30 };
      }),
      NOW,
    );
    const ordered = attentionOrder([active, inactive]);
    expect(ordered[0]?.snapshot.name).toBe('Nghỉ lâu');
  });

  it('ngày hoạt động gần nhất suy đúng từ nhật ký ngày', () => {
    const state = createInitialState();
    expect(lastActiveAt(state)).toBeNull();
    state.days['2026-03-01'] = { date: '2026-03-01', questions: 5, correct: 4, minutes: 8 };
    state.days['2026-03-05'] = { date: '2026-03-05', questions: 5, correct: 4, minutes: 8 };
    expect(lastActiveAt(state)).toBe(Date.parse('2026-03-05'));
  });

  it('tổng hợp lớp đếm đúng người mất đà và lỗ hổng chung', () => {
    const rows = [buildRow(snapshotOf('A'), NOW), buildRow(snapshotOf('B'), NOW)];
    const summary = summarizeCohort(rows);
    expect(summary.learners).toBe(2);
    expect(summary.inactive).toBe(2);
    expect(summary.commonGaps.length).toBeLessThanOrEqual(5);
    expect(summarizeCohort([]).averageProjected).toBe(0);
  });

  it('gói nhiệm vụ luôn có hạn và một lời dặn cụ thể', () => {
    const packet = buildAssignment(buildRow(snapshotOf('C'), NOW), 5, NOW);
    expect(packet.dueDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(packet.items.length).toBeLessThanOrEqual(5);
    expect(packet.note.length).toBeGreaterThan(20);
  });

  it('cờ ưu tiên cao khi vừa nghỉ dài vừa nợ thẻ ôn tập', () => {
    const row = {
      daysSinceActive: 12,
      dueCards: 30,
      focusRatio: 0.2,
      streak: 0,
      levelUpReady: [],
      stageEligible: false,
      focusTopics: ['Đại số'],
    } as unknown as Omit<LearnerRow, 'flags'>;
    const flags = flagsFor(row);
    expect(flags.some((f) => f.id === 'inactive' && f.tone === 'bad')).toBe(true);
    expect(flags.some((f) => f.id === 'srs')).toBe(true);
  });

  it('học chăm nhưng lệch trọng tâm được nhận diện riêng', () => {
    // Day la nhom de nan nhat: co gang that ma diem khong len.
    const row = {
      daysSinceActive: 0,
      dueCards: 2,
      focusRatio: 0.2,
      streak: 9,
      levelUpReady: [],
      stageEligible: false,
      focusTopics: ['Hình học', 'Xác suất'],
    } as unknown as Omit<LearnerRow, 'flags'>;
    const flag = flagsFor(row).find((f) => f.id === 'misfocus');
    expect(flag).toBeDefined();
    expect(flag?.action).toContain('Hình học');
  });
});

describe('báo cáo gia đình', () => {
  it('trả lời đủ ba câu hỏi mà phụ huynh thật sự hỏi', () => {
    const report = buildFamilyReport(createInitialState(), NOW);
    const titles = report.sections.map((s) => s.title);
    expect(titles).toContain('Đang ở đâu');
    expect(titles).toContain('Đang tiến thế nào');
    expect(titles).toContain('Chỗ cần dồn sức');
    for (const section of report.sections) {
      expect(section.body.length, section.title).toBeGreaterThan(80);
    }
  });

  it('luôn có đúng ba việc gia đình làm được, không việc nào cần chuyên môn', () => {
    // Mot bao cao chi neu diem so se bien phu huynh thanh nguoi giam sat —
    // vai tro lam hong dong luc nhanh hon bat ky dieu gi khac.
    for (const [streak, tier, focus] of [
      [0, 'H1', 0.2],
      [10, 'H3', 0.8],
      [3, 'H5', 0.5],
    ] as const) {
      const actions = familyActionsFor(streak, tier, focus);
      expect(actions).toHaveLength(3);
      for (const action of actions) {
        expect(action.length).toBeGreaterThan(40);
        expect(action).not.toMatch(/công thức|đạo hàm|tích phân/i);
      }
    }
  });

  it('nêu rõ khoảng cách tới mục tiêu và không bao giờ âm', () => {
    const state = createInitialState();
    state.settings.targetScore = 140;
    const low = buildFamilyReport(state, NOW);
    expect(low.gapToTarget).toBeGreaterThanOrEqual(0);

    state.settings.targetScore = 50;
    const high = buildFamilyReport(state, NOW);
    expect(high.gapToTarget).toBe(0);
    expect(high.band).toBe('Đã đạt mục tiêu');
  });
});
