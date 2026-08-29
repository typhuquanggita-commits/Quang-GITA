/**
 * Published papers.
 *
 * The platform has always been able to assemble a full-length form on demand.
 * What it could not do was hand someone a *paper* — a fixed set of items, the
 * same for every candidate, that can be printed, sat away from a screen,
 * marked by a person, and referred to afterwards by name.
 *
 * Those are different objects and the difference is not cosmetic.
 *
 * An adaptive delivery routes each candidate to a second module chosen from
 * their own first-module performance. That is better measurement and it makes
 * the paper unprintable: there is no single second module to print, and no
 * single raw-score conversion, because raw score means different things on the
 * two pathways.
 *
 * A published paper is therefore **linear**: two modules per section at a
 * fixed, blended difficulty, identical for everyone. It measures slightly less
 * precisely than the adaptive delivery — that is the cost, and it is stated on
 * the paper — and in exchange it can be printed, invigilated in a room with no
 * computers, and marked against a single scheme.
 *
 * ## Fixed by seed, not by list
 *
 * A paper is defined by a seed rather than by an enumerated list of item ids.
 * The assembly is deterministic, so the same seed reproduces the same paper on
 * every device and every build — which is what "published" has to mean — while
 * a list of two hundred ids would rot the first time an item was revised.
 *
 * The consequence to keep in view: a paper's content changes if its items are
 * edited. `check:bank` therefore records each paper's item fingerprint, so an
 * edit that silently changes a published paper is visible in a diff rather
 * than discovered by a candidate.
 */

import type { SectionId } from '../types.ts';

export interface PublishedPaper {
  id: string;
  /** Human name, as it appears on the cover. */
  name: string;
  nameVi: string;
  /** Deterministic seed. Changing this changes the paper and must not be done casually. */
  seed: number;
  /** Publication date, so a candidate can tell two editions apart. */
  published: string;
  /** What this paper is for. */
  purpose: string;
  purposeVi: string;
  /** Sections included. A section paper is a legitimate object in its own right. */
  scope: 'full' | SectionId;
}

export const PAPERS: PublishedPaper[] = [
  {
    id: 'sat365-p1',
    name: 'SAT365 Practice Paper 1',
    nameVi: 'Đề luyện SAT365 số 1',
    seed: 20260101,
    published: '2026-01-06',
    scope: 'full',
    purpose:
      'A baseline paper of blended difficulty, intended as the first full-length sitting. Use it to establish a starting point rather than to measure progress.',
    purposeVi:
      'Đề nền, độ khó pha trộn, dùng cho lần thi thử full-length đầu tiên. Dùng để xác lập điểm xuất phát chứ không phải để đo tiến bộ.',
  },
  {
    id: 'sat365-p2',
    name: 'SAT365 Practice Paper 2',
    nameVi: 'Đề luyện SAT365 số 2',
    seed: 20260215,
    published: '2026-02-15',
    scope: 'full',
    purpose:
      'A second full-length paper drawn from a different part of the bank, for a mid-programme check. Sit it at least four weeks after Paper 1, or the result measures memory rather than ability.',
    purposeVi:
      'Đề full-length thứ hai lấy từ phần khác của ngân hàng, dùng để kiểm tra giữa lộ trình. Nên làm cách Đề 1 ít nhất bốn tuần, nếu không kết quả đo trí nhớ chứ không đo năng lực.',
  },
  {
    id: 'sat365-p3',
    name: 'SAT365 Practice Paper 3',
    nameVi: 'Đề luyện SAT365 số 3',
    seed: 20260420,
    published: '2026-04-20',
    scope: 'full',
    purpose:
      'A rehearsal paper for the final weeks. Sit it under full timing and full conditions; a rehearsal taken with interruptions rehearses the wrong thing.',
    purposeVi:
      'Đề tổng duyệt cho giai đoạn cuối. Làm đúng thời gian và đúng điều kiện thi; một buổi tổng duyệt bị ngắt quãng là tổng duyệt sai thứ cần duyệt.',
  },
  {
    id: 'sat365-rw1',
    name: 'SAT365 Reading and Writing Paper A',
    nameVi: 'Đề Đọc và Viết SAT365 — A',
    seed: 20260310,
    published: '2026-03-10',
    scope: 'rw',
    purpose:
      'A single-section paper for a shorter sitting. It produces a section score on the 200–800 scale and no total, because a total from one section would be a number about a test that was not taken.',
    purposeVi:
      'Đề một phần, dùng cho buổi làm bài ngắn. Nó cho điểm phần theo thang 200–800 và không cho tổng điểm, vì một tổng điểm từ một phần là con số nói về bài thi chưa từng được làm.',
  },
  {
    id: 'sat365-m1',
    name: 'SAT365 Math Paper A',
    nameVi: 'Đề Toán SAT365 — A',
    seed: 20260318,
    published: '2026-03-18',
    scope: 'math',
    purpose:
      'A single-section Math paper. Useful when the bottleneck is known to be Math and a full sitting would spend two hours to confirm it.',
    purposeVi:
      'Đề Toán một phần. Hữu ích khi đã biết điểm nghẽn nằm ở Toán và một buổi thi đầy đủ sẽ tốn hai tiếng chỉ để xác nhận điều đó.',
  },
];

export function paperById(id: string): PublishedPaper | undefined {
  return PAPERS.find((paper) => paper.id === id);
}
