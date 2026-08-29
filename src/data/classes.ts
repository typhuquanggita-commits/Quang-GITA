import type { GroupId, TrackId } from '@/types';
import { Rng, hashSeed } from '@/lib/rng';

export interface StudentRow {
  id: string;
  name: string;
  track: TrackId;
  groupId: GroupId;
  stage: number;
  level: number;
  missionsDone: number;
  avgKpi: number;
  lastActiveDays: number;
  roleId: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  track: TrackId;
  teacher: string;
  assistant: string;
  targetSchool: string;
  students: StudentRow[];
}

const HO = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Ngô', 'Dương', 'Lý'];
const DEM = ['Minh', 'Thu', 'Quang', 'Hải', 'Gia', 'Bảo', 'Khánh', 'Nhật', 'Thanh', 'Phương', 'Tuấn', 'Anh'];
const TEN = ['An', 'Bình', 'Chi', 'Dũng', 'Giang', 'Hà', 'Khoa', 'Lâm', 'Mai', 'Nam', 'Oanh', 'Phúc', 'Quân', 'Sơn', 'Trang', 'Uyên', 'Vy', 'Xuân', 'Yến', 'Đức'];

function makeStudents(seedKey: string, n: number, track: TrackId): StudentRow[] {
  const r = new Rng(hashSeed(seedKey));
  const groups: GroupId[] =
    track === 'chuyen' ? ['chuyen-sau', 'dinh-cao'] : ['nen-tang', 'vung-chac', 'but-pha'];
  const rows: StudentRow[] = [];
  for (let i = 0; i < n; i++) {
    const name = `${r.pick(HO)} ${r.pick(DEM)} ${r.pick(TEN)}`;
    const stage = r.int(1, 5);
    const level = Math.min(5, Math.max(1, stage - 1 + r.int(0, 1)));
    const avgKpi = r.int(52, 100);
    const missionsDone = stage * r.int(12, 30);
    rows.push({
      id: `${seedKey}-${i + 1}`,
      name,
      track,
      groupId: groups[Math.min(groups.length - 1, Math.floor((avgKpi - 50) / 18))],
      stage,
      level,
      missionsDone,
      avgKpi,
      lastActiveDays: r.int(0, 12),
      roleId:
        avgKpi >= 92 && stage >= 4 ? 'hs-doi-tuyen' : avgKpi >= 88 ? 'hs-nang-cao' : 'hs-chuan',
    });
  }
  return rows.sort((a, b) => b.avgKpi - a.avgKpi);
}

export const CLASSES: ClassRoom[] = [
  {
    id: 'lop-chuyen-a1',
    name: 'Chuyên Toán A1 — Mục tiêu KHTN / Ams',
    track: 'chuyen',
    teacher: 'Thầy Nguyễn Quang Huy',
    assistant: 'Cô Trần Thu Hà',
    targetSchool: 'Chuyên KHTN, Chuyên Ams',
    students: makeStudents('lop-chuyen-a1', 24, 'chuyen'),
  },
  {
    id: 'lop-chuyen-b1',
    name: 'Chuyên Toán B1 — Mục tiêu Chu Văn An / Nguyễn Tất Thành',
    track: 'chuyen',
    teacher: 'Cô Phạm Thanh Mai',
    assistant: 'Thầy Lê Gia Bảo',
    targetSchool: 'Chuyên Chu Văn An, Nguyễn Tất Thành',
    students: makeStudents('lop-chuyen-b1', 26, 'chuyen'),
  },
  {
    id: 'lop-10-c1',
    name: 'Vào 10 C1 — Mục tiêu 9 đến 10 điểm',
    track: 'thpt',
    teacher: 'Thầy Hoàng Minh Đức',
    assistant: 'Cô Vũ Khánh Chi',
    targetSchool: 'THPT công lập top Hà Nội',
    students: makeStudents('lop-10-c1', 32, 'thpt'),
  },
  {
    id: 'lop-10-c2',
    name: 'Vào 10 C2 — Củng cố nền tảng',
    track: 'thpt',
    teacher: 'Cô Đỗ Phương Linh',
    assistant: 'Thầy Bùi Nhật Nam',
    targetSchool: 'THPT công lập Hà Nội',
    students: makeStudents('lop-10-c2', 30, 'thpt'),
  },
];

export const classById = (id: string) => CLASSES.find((c) => c.id === id);

export function classSummary(c: ClassRoom) {
  const n = c.students.length;
  const avg = Math.round(c.students.reduce((s, x) => s + x.avgKpi, 0) / n);
  const onTarget = c.students.filter((s) => s.avgKpi >= 90).length;
  const atRisk = c.students.filter((s) => s.avgKpi < 70 || s.lastActiveDays >= 7).length;
  const missions = c.students.reduce((s, x) => s + x.missionsDone, 0);
  return { n, avg, onTarget, atRisk, missions };
}
