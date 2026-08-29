/**
 * The calibration worker.
 *
 * Deliberately thin: it validates nothing and decides nothing. Everything it
 * does is in `src/engine/calibration.ts`, which is where the psychometrics is
 * tested. A worker that started interpreting results would put logic somewhere
 * the test suite cannot reach it.
 */

import { calibrate, screenDif, type DifResult } from '../../engine/calibration.ts';
import type { WorkerRequest, WorkerResponse } from './protocol.ts';

const post = (message: WorkerResponse) => self.postMessage(message);

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const request = event.data;
  if (request.kind !== 'calibrate') return;

  try {
    post({ kind: 'phase', phase: 'calibrating' });

    const result = calibrate(request.matrix, {
      onIteration: ({ iteration, delta, maxIterations }) =>
        post({ kind: 'progress', iteration, maxIterations, delta }),
    });

    /*
     * DIF is screened only when the import carries group labels. Inventing
     * them — splitting on median ability, say — would produce a fairness
     * report about a distinction nobody made, which is worse than none.
     */
    let dif: DifResult[] = [];
    if (request.groups && request.groups.length === request.matrix.rows.length) {
      post({ kind: 'phase', phase: 'screening-dif' });
      dif = request.matrix.itemIds.map((_, index) =>
        screenDif(request.matrix, request.groups!, index),
      );
    }

    post({ kind: 'done', result, dif });
  } catch (error) {
    post({ kind: 'error', message: error instanceof Error ? error.message : String(error) });
  }
};
