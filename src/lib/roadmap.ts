import type { GroupId, Profile, RoadmapPhase, RoadmapTask, RoadmapWeek, TrackId } from '@/types';
import { MISSIONS, stagesByTrack, type Stage } from '@/data/catalog';
import { topicsByTrack } from '@/data/topics';
import { groupById } from '@/data/groups';

export function weeksUntil(dateStr: string): number {
  const target = new Date(dateStr).getTime();
  const now = Date.now();
  const diff = Math.ceil((target - now) / (7 * 24 * 3600 * 1000));
  return Math.max(1, Math.min(80, diff));
}

/** Tỉ lệ quỹ thời gian dành cho từng giai đoạn, thay đổi theo nhóm học sinh. */
const SHARES: Record<GroupId, number[]> = {
  'nen-tang': [0.34, 0.28, 0.18, 0.08, 0.12],
  'vung-chac': [0.2, 0.28, 0.24, 0.14, 0.14],
  'but-pha': [0.1, 0.2, 0.26, 0.28, 0.16],
  'chuyen-sau': [0.26, 0.26, 0.2, 0.14, 0.14],
  'dinh-cao': [0.12, 0.22, 0.24, 0.26, 0.16],
  'qg-nen-tang': [0.32, 0.28, 0.2, 0.08, 0.12],
  'qg-vung-chac': [0.2, 0.26, 0.24, 0.16, 0.14],
  'qg-toi-uu': [0.12, 0.2, 0.24, 0.28, 0.16],
  /* Luồng vào 6 chỉ có bốn giai đoạn nên mảng cũng chỉ có bốn phần. */
  'l6-lam-quen': [0.38, 0.3, 0.18, 0.14],
  'l6-vung-chac': [0.24, 0.32, 0.24, 0.2],
  'l6-but-pha': [0.14, 0.26, 0.32, 0.28],
};

function allocateWeeks(total: number, shares: number[]): number[] {
  const raw = shares.map((s) => s * total);
  const out = raw.map((x) => Math.max(1, Math.floor(x)));
  let used = out.reduce((a, b) => a + b, 0);
  let i = 0;
  while (used < total) {
    out[i % out.length] += 1;
    used += 1;
    i += 1;
  }
  while (used > total) {
    const idx = out.findIndex((v, k) => v > 1 && k === out.length - 1 - (used % out.length));
    const j = idx >= 0 ? idx : out.findIndex((v) => v > 1);
    if (j < 0) break;
    out[j] -= 1;
    used -= 1;
  }
  return out;
}

function taskMinutes(hoursPerWeek: number, share: number): number {
  return Math.max(20, Math.round(((hoursPerWeek * 60) / 60) * 60 * share));
}

function buildWeek(
  index: number,
  stage: Stage,
  topicIds: string[],
  missionSlice: { from: string; to: string; count: number },
  hoursPerWeek: number,
  isLast: boolean,
): RoadmapWeek {
  const tasks: RoadmapTask[] = [
    {
      id: `w${index}-lt`,
      title: `Học & tóm tắt chuyên đề: ${topicIds.length ? topicIds.join(', ') : stage.name}`,
      kind: 'ly-thuyet',
      topicIds,
      minutes: taskMinutes(hoursPerWeek, 0.25),
      detail:
        'Đọc phần Kỹ thuật cốt lõi và Lỗi thường gặp, tự viết lại sơ đồ tư duy của chuyên đề vào vở (không chép nguyên).',
    },
    {
      id: `w${index}-lt2`,
      title: `Luyện phiếu ${missionSlice.from} → ${missionSlice.to} (${missionSlice.count} nhiệm vụ)`,
      kind: 'luyen-tap',
      topicIds,
      minutes: taskMinutes(hoursPerWeek, 0.45),
      detail: `Làm tuần tự, mỗi phiếu phải đạt KPI ≥ ${stage.kpi}% mới chuyển nhiệm vụ. Phiếu chưa đạt thì làm lại với đề mới.`,
    },
    {
      id: `w${index}-loi`,
      title: 'Chữa lỗi sai & cập nhật sổ tay',
      kind: 'ra-soat',
      topicIds,
      minutes: taskMinutes(hoursPerWeek, 0.15),
      detail:
        'Mỗi lỗi ghi 3 dòng: sai ở đâu — nguyên nhân — cách phòng tránh. Sau đó làm lại 3 bài cùng dạng để "khoá" lỗi.',
    },
    {
      id: `w${index}-de`,
      title: isLast ? 'Đề tổng duyệt tính giờ' : 'Bài kiểm tra cuối tuần (tính giờ)',
      kind: 'de-thi',
      topicIds,
      minutes: taskMinutes(hoursPerWeek, 0.15),
      detail: isLast
        ? 'Làm nguyên một đề theo đúng thời gian thi thật, chấm theo barem, ghi lại thời gian từng bài.'
        : 'Một phiếu Kiểm tra hoặc Tổng duyệt, làm liền mạch không xem gợi ý.',
    },
  ];

  return {
    index,
    focus: stage.goal,
    tasks,
    milestone: isLast ? `Kết thúc ${stage.name}: ${stage.goal}` : undefined,
  };
}

export function buildRoadmap(profile: Profile): {
  track: TrackId;
  totalWeeks: number;
  phases: RoadmapPhase[];
} {
  const track = profile.track;
  const totalWeeks = weeksUntil(profile.examDate);
  const stages = stagesByTrack(track);
  const shares = SHARES[profile.groupId] ?? SHARES['vung-chac'];
  const alloc = allocateWeeks(totalWeeks, shares);

  const topics = topicsByTrack(track).sort(
    (a, b) => b.frequency - a.frequency || a.level - b.level,
  );

  let weekCounter = 0;
  const phases: RoadmapPhase[] = stages.map((stage, si) => {
    const stageMissions = MISSIONS.filter((m) => m.stageId === stage.id);
    const nWeeks = alloc[si] ?? 1;
    const perWeek = Math.max(1, Math.floor(stageMissions.length / nWeeks));
    const stageTopics = topics.filter(
      (t) => t.level >= Math.min(...stage.levels) - 1 && t.level <= Math.max(...stage.levels) + 1,
    );

    const weeks: RoadmapWeek[] = [];
    for (let w = 0; w < nWeeks; w++) {
      weekCounter += 1;
      const from = stageMissions[w * perWeek];
      const to = stageMissions[Math.min(stageMissions.length - 1, (w + 1) * perWeek - 1)];
      const picked = stageTopics
        .slice((w * 2) % Math.max(1, stageTopics.length), ((w * 2) % Math.max(1, stageTopics.length)) + 2)
        .map((t) => t.name);
      weeks.push(
        buildWeek(
          weekCounter,
          stage,
          picked,
          {
            from: from?.id ?? '—',
            to: to?.id ?? '—',
            count: from && to ? Math.max(1, perWeek) : 0,
          },
          profile.hoursPerWeek,
          w === nWeeks - 1,
        ),
      );
    }

    return {
      id: stage.id,
      name: stage.name,
      goal: stage.goal,
      shareOfTime: Math.round((nWeeks / totalWeeks) * 100),
      weeks,
      exitCriteria: [
        `Đạt KPI ≥ ${stage.kpi}% ở ít nhất 15 nhiệm vụ của giai đoạn.`,
        `KPI trung bình 5 lượt gần nhất ≥ ${stage.kpi}%.`,
        stage.goal,
      ],
    };
  });

  return { track, totalWeeks, phases };
}

/** Gợi ý nhóm học sinh từ điểm bài test xếp lộ trình. */
export function suggestGroup(track: TrackId, scorePercent: number): GroupId {
  if (track === 'chuyen') return scorePercent >= 75 ? 'dinh-cao' : 'chuyen-sau';
  if (track === 'thpt-qg') {
    if (scorePercent >= 78) return 'qg-toi-uu';
    if (scorePercent >= 58) return 'qg-vung-chac';
    return 'qg-nen-tang';
  }
  if (scorePercent >= 75) return 'but-pha';
  if (scorePercent >= 55) return 'vung-chac';
  return 'nen-tang';
}

export const groupLabel = (id: GroupId) => groupById(id).name;
