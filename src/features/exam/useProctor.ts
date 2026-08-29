/**
 * Test-integrity monitoring.
 *
 * What is enforced here is what a browser can honestly enforce: full-screen
 * state, window focus, clipboard actions, and the context menu. A web page
 * cannot see the rest of the machine, and claiming otherwise would be worse
 * than claiming nothing — so the integrity report records observable events
 * with timestamps and leaves interpretation to whoever reads it.
 */

import { useCallback, useEffect, useRef } from 'react';
import type { IntegrityEvent, Preferences } from '../../types.ts';

export interface ProctorHandle {
  requestFullscreen(): Promise<void>;
  exitFullscreen(): Promise<void>;
  isFullscreen(): boolean;
}

export function useProctor({
  enabled,
  level,
  onEvent,
}: {
  enabled: boolean;
  level: Preferences['proctoring'];
  onEvent(event: IntegrityEvent): void;
}): ProctorHandle {
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  const record = useCallback((kind: IntegrityEvent['kind'], detail?: string) => {
    onEventRef.current({ at: Date.now(), kind, detail });
  }, []);

  useEffect(() => {
    if (!enabled || level === 'off') return undefined;

    const onBlur = () => record('blur');
    const onFocus = () => record('focus');
    const onVisibility = () => record(document.hidden ? 'blur' : 'focus', 'visibilitychange');
    const onFullscreenChange = () =>
      record(document.fullscreenElement ? 'fullscreen-enter' : 'fullscreen-exit');
    const onResize = () => record('resize', `${window.innerWidth}x${window.innerHeight}`);

    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    window.addEventListener('resize', onResize);

    const strictHandlers: Array<[keyof DocumentEventMap, (e: Event) => void]> = [];
    if (level === 'strict') {
      const blockCopy = (event: Event) => {
        event.preventDefault();
        record('copy-blocked');
      };
      const blockPaste = (event: Event) => {
        event.preventDefault();
        record('paste-blocked');
      };
      const blockMenu = (event: Event) => {
        event.preventDefault();
        record('context-menu-blocked');
      };
      strictHandlers.push(['copy', blockCopy], ['cut', blockCopy], ['paste', blockPaste], ['contextmenu', blockMenu]);
      for (const [name, handler] of strictHandlers) {
        document.addEventListener(name, handler);
      }
    }

    return () => {
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      window.removeEventListener('resize', onResize);
      for (const [name, handler] of strictHandlers) {
        document.removeEventListener(name, handler);
      }
    };
  }, [enabled, level, record]);

  return {
    async requestFullscreen() {
      try {
        await document.documentElement.requestFullscreen();
      } catch {
        // Full screen requires a user gesture and can be blocked outright.
        // The attempt failing is itself worth nothing to the log, and it must
        // never stop a student from taking the test.
      }
    },
    async exitFullscreen() {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
      } catch {
        /* already exited */
      }
    },
    isFullscreen: () => Boolean(document.fullscreenElement),
  };
}

export interface IntegritySummary {
  blurCount: number;
  fullscreenExits: number;
  blockedActions: number;
  totalAwaySeconds: number;
  events: IntegrityEvent[];
}

/** Reduces the raw event log to the figures a reviewer actually reads. */
export function summariseIntegrity(events: readonly IntegrityEvent[]): IntegritySummary {
  let blurCount = 0;
  let fullscreenExits = 0;
  let blockedActions = 0;
  let totalAwayMs = 0;
  let awaySince: number | null = null;

  for (const event of events) {
    switch (event.kind) {
      case 'blur':
        blurCount += 1;
        if (awaySince === null) awaySince = event.at;
        break;
      case 'focus':
        if (awaySince !== null) {
          totalAwayMs += event.at - awaySince;
          awaySince = null;
        }
        break;
      case 'fullscreen-exit':
        fullscreenExits += 1;
        break;
      case 'copy-blocked':
      case 'paste-blocked':
      case 'context-menu-blocked':
        blockedActions += 1;
        break;
      default:
        break;
    }
  }

  return {
    blurCount,
    fullscreenExits,
    blockedActions,
    totalAwaySeconds: Math.round(totalAwayMs / 1000),
    events: [...events],
  };
}
