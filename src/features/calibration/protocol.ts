/**
 * The message contract between the calibration console and its worker.
 *
 * Calibration is not a fast operation: MMLE-EM over 166 items and 400
 * examinees takes about twenty seconds in this implementation. Run on the main
 * thread that is not a slow screen, it is a frozen browser — no scrolling, no
 * cancel, no clock. So the estimator runs in a worker and reports progress
 * every EM iteration, and the console stays answerable the whole time.
 *
 * The types live here rather than beside the worker so both ends compile
 * against the same contract; a message shape that drifts is a class of bug
 * that never surfaces until it is in front of someone.
 */

import type { CalibrationResult, DifResult, ResponseMatrix } from '../../engine/calibration.ts';

export interface CalibrateRequest {
  kind: 'calibrate';
  matrix: ResponseMatrix;
  /** Optional group labels, one per examinee, enabling the DIF screen. */
  groups?: Array<0 | 1>;
}

export type WorkerRequest = CalibrateRequest;

export type WorkerResponse =
  | { kind: 'progress'; iteration: number; maxIterations: number; delta: number }
  | { kind: 'phase'; phase: 'calibrating' | 'screening-dif' }
  | { kind: 'done'; result: CalibrationResult; dif: DifResult[] }
  | { kind: 'error'; message: string };
