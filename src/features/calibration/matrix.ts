/**
 * Building a response matrix, and being honest about what is in it.
 *
 * SAT365 has no server. The responses on this device belong to one learner —
 * whoever is signed in — and one learner is not a calibration sample. MMLE
 * estimates item parameters by integrating ability out over a *population*;
 * given a single examinee there is no population to integrate over, and the
 * estimator will still return numbers. Confident, precise, meaningless
 * numbers.
 *
 * So this module does two separate jobs and never blurs them. It builds a
 * matrix from local attempts so a programme can see exactly how much evidence
 * exists, and it parses a matrix collected elsewhere so a real calibration can
 * actually be run. The readiness report is what tells a reader which of the
 * two they are looking at.
 */

import type { Attempt } from '../../types.ts';
import { BANK } from '../../data/bank.ts';
import { ACCEPTANCE, type ResponseMatrix } from '../../engine/calibration.ts';

export interface Readiness {
  examinees: number;
  /** Items with at least one response. */
  itemsWithData: number;
  /** Items that reach the acceptance sample floor. */
  itemsAtSample: number;
  totalResponses: number;
  /** Responses per item, worst first, for the items that have any. */
  thinnest: Array<{ itemId: string; n: number }>;
  /**
   * Whether a calibration run on this matrix would mean anything. Sample size
   * is necessary but not sufficient — a matrix from one examinee fails here
   * however many responses it holds.
   */
  usable: boolean;
  /** Why not, when not. Written for a programme lead, not a developer. */
  blockers: string[];
  blockersVi: string[];
}

/** The examinee floor below which MMLE has no population to integrate over. */
export const MIN_EXAMINEES = 50;

/**
 * A matrix from one device's attempts. Each *attempt* becomes a row, which is
 * the most generous reading available and still does not make one learner into
 * a sample: the rows are not independent examinees, and the readiness report
 * says so rather than letting a row count stand in for a cohort.
 */
export function matrixFromAttempts(attempts: readonly Attempt[]): ResponseMatrix {
  const itemIds = BANK.map((q) => q.id);
  const index = new Map(itemIds.map((id, i) => [id, i]));

  const rows: Array<Array<0 | 1 | null>> = [];
  for (const attempt of attempts) {
    const row: Array<0 | 1 | null> = new Array(itemIds.length).fill(null);
    let answered = 0;
    for (const response of Object.values(attempt.responses)) {
      const at = index.get(response.questionId);
      if (at === undefined) continue;
      if (response.value === null || response.value === '') continue;
      row[at] = response.correct ? 1 : 0;
      answered += 1;
    }
    if (answered > 0) rows.push(row);
  }

  return { itemIds, rows };
}

export function assess(matrix: ResponseMatrix, distinctExaminees: number): Readiness {
  const counts = matrix.itemIds.map((itemId, j) => ({
    itemId,
    n: matrix.rows.reduce((acc, row) => acc + (row[j] === null || row[j] === undefined ? 0 : 1), 0),
  }));

  const withData = counts.filter((c) => c.n > 0);
  const atSample = counts.filter((c) => c.n >= ACCEPTANCE.minSample);
  const totalResponses = counts.reduce((acc, c) => acc + c.n, 0);

  const blockers: string[] = [];
  const blockersVi: string[] = [];

  if (distinctExaminees < MIN_EXAMINEES) {
    blockers.push(
      `${distinctExaminees} examinee${distinctExaminees === 1 ? '' : 's'} — MMLE integrates ability out over a population, and there is no population here. At least ${MIN_EXAMINEES} are needed before an estimate means anything.`,
    );
    blockersVi.push(
      `${distinctExaminees} thí sinh — MMLE lấy tích phân năng lực trên một quần thể, mà ở đây không có quần thể. Cần ít nhất ${MIN_EXAMINEES} thí sinh thì ước lượng mới có nghĩa.`,
    );
  }

  if (atSample.length === 0) {
    blockers.push(
      `No item reaches the ${ACCEPTANCE.minSample}-response acceptance floor. Every parameter would be rejected on sample size alone.`,
    );
    blockersVi.push(
      `Không câu nào đạt ngưỡng ${ACCEPTANCE.minSample} lượt trả lời. Mọi tham số sẽ bị loại chỉ vì cỡ mẫu.`,
    );
  }

  if (withData.length < matrix.itemIds.length * 0.5) {
    blockers.push(
      `${withData.length} of ${matrix.itemIds.length} items have any data at all. A calibration covering half a bank leaves the rest on author estimates, and mixing the two on one scale is what linking exists to prevent.`,
    );
    blockersVi.push(
      `Chỉ ${withData.length}/${matrix.itemIds.length} câu có dữ liệu. Hiệu chuẩn nửa ngân hàng sẽ để phần còn lại ở ước lượng của người soạn, và trộn hai thang đo là đúng thứ mà liên kết thang sinh ra để ngăn.`,
    );
  }

  return {
    examinees: distinctExaminees,
    itemsWithData: withData.length,
    itemsAtSample: atSample.length,
    totalResponses,
    thinnest: withData.sort((a, b) => a.n - b.n).slice(0, 8),
    usable: blockers.length === 0,
    blockers,
    blockersVi,
  };
}

export interface ParsedImport {
  matrix: ResponseMatrix;
  groups?: Array<0 | 1>;
  /** Examinee count as the file reports it, which may differ from row count. */
  examinees: number;
}

/**
 * Parses an imported response matrix.
 *
 * Strict on purpose. A malformed row silently coerced to nulls would calibrate
 * without complaint and produce parameters that describe a file, not a cohort
 * — the kind of defect that reaches a score report before anyone notices.
 */
export function parseImport(text: string): { ok: true; value: ParsedImport } | { ok: false; error: string } {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, error: 'Not valid JSON.' };
  }

  if (!raw || typeof raw !== 'object') return { ok: false, error: 'Expected an object.' };
  const data = raw as Record<string, unknown>;

  const itemIds = data.itemIds;
  if (!Array.isArray(itemIds) || itemIds.some((id) => typeof id !== 'string')) {
    return { ok: false, error: 'itemIds must be an array of strings.' };
  }
  if (itemIds.length === 0) return { ok: false, error: 'itemIds is empty.' };
  if (new Set(itemIds).size !== itemIds.length) {
    return { ok: false, error: 'itemIds contains duplicates.' };
  }

  const rows = data.rows;
  if (!Array.isArray(rows) || rows.length === 0) {
    return { ok: false, error: 'rows must be a non-empty array.' };
  }

  const parsedRows: Array<Array<0 | 1 | null>> = [];
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    if (!Array.isArray(row)) return { ok: false, error: `Row ${i + 1} is not an array.` };
    if (row.length !== itemIds.length) {
      return {
        ok: false,
        error: `Row ${i + 1} has ${row.length} entries but there are ${itemIds.length} items.`,
      };
    }
    const clean: Array<0 | 1 | null> = [];
    for (let j = 0; j < row.length; j += 1) {
      const value = row[j];
      if (value === 0 || value === 1 || value === null) clean.push(value);
      else return { ok: false, error: `Row ${i + 1}, entry ${j + 1} is ${JSON.stringify(value)}; expected 0, 1, or null.` };
    }
    parsedRows.push(clean);
  }

  let groups: Array<0 | 1> | undefined;
  if (data.groups !== undefined) {
    const g = data.groups;
    if (!Array.isArray(g) || g.length !== parsedRows.length) {
      return { ok: false, error: `groups must have one entry per row (${parsedRows.length}).` };
    }
    if (g.some((v) => v !== 0 && v !== 1)) {
      return { ok: false, error: 'groups entries must be 0 (reference) or 1 (focal).' };
    }
    groups = g as Array<0 | 1>;
  }

  return {
    ok: true,
    value: { matrix: { itemIds, rows: parsedRows }, groups, examinees: parsedRows.length },
  };
}
