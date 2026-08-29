import type { ExamPaper, PaperItem } from '@/types';
import { PAPER_HANOI_01 } from './hanoi';
import { PAPER_KHTN_V2_01 } from './khtn';
import { PAPER_CHUYEN_SO_01 } from './chuyen-so';
import { PAPER_TN_THPT_01 } from './tn-thpt';
import { PAPER_KHTN_V1_01 } from './khtn-v1';
import { PAPER_NTT_01 } from './ntt';
import { PAPER_SU_PHAM_01 } from './su-pham';

/** Kho đề mẫu trọn vẹn — mỗi đề bám sát một ma trận đề trong BLUEPRINTS. */
export const EXAM_PAPERS: ExamPaper[] = [
  PAPER_HANOI_01,
  PAPER_NTT_01,
  PAPER_CHUYEN_SO_01,
  PAPER_KHTN_V1_01,
  PAPER_KHTN_V2_01,
  PAPER_SU_PHAM_01,
  PAPER_TN_THPT_01,
];

export const paperById = (id: string) => EXAM_PAPERS.find((p) => p.id === id);

export const papersByBlueprint = (blueprintId: string) =>
  EXAM_PAPERS.filter((p) => p.blueprintId === blueprintId);

export const papersBySchool = (schoolId: string) =>
  EXAM_PAPERS.filter((p) => p.schoolId === schoolId);

export const papersByTrack = (track: string) => EXAM_PAPERS.filter((p) => p.track === track);

/** Mọi câu của một đề, đã trải phẳng theo thứ tự phần. */
export const paperItems = (paper: ExamPaper): PaperItem[] => paper.parts.flatMap((p) => p.items);

/** Thống kê nhanh dùng cho trang danh sách đề. */
export function paperStats(paper: ExamPaper) {
  const items = paperItems(paper);
  const claims = items.reduce((s, i) => s + (i.claims?.length ?? 0), 0);
  const steps = items.reduce((s, i) => s + i.solution.length, 0);
  const baremRows = items.reduce((s, i) => s + i.barem.length, 0);
  const strands = [...new Set(items.map((i) => i.strand))];
  const topics = [...new Set(items.flatMap((i) => i.topicIds))];
  return {
    parts: paper.parts.length,
    items: items.length,
    claims,
    steps,
    baremRows,
    strands,
    topics,
    points: items.reduce((s, i) => s + i.points, 0),
    minutes: items.reduce((s, i) => s + i.minutes, 0),
  };
}

/** Ma trận đề dựng ngược từ chính các câu — dùng để đối chiếu với BLUEPRINTS. */
export function paperMatrix(paper: ExamPaper) {
  return paper.parts.map((part) => ({
    label: part.label,
    points: part.items.reduce((s, i) => s + i.points, 0),
    minutes: part.items.reduce((s, i) => s + i.minutes, 0),
    count: part.items.length,
    strands: [...new Set(part.items.map((i) => i.strand))],
    levels: [...new Set(part.items.map((i) => i.level))].sort((a, b) => a - b),
    note: part.note,
  }));
}
