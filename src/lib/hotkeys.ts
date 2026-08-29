import { useEffect } from 'react';

export type HotkeyHandler = (event: KeyboardEvent) => void;

/**
 * Dang ky phim tat toan cuc.
 *
 * Luon bo qua khi con tro dang o o nhap lieu: nguoi hoc go dap an dang dien
 * "4" khong duoc phep bi hieu thanh "chon phuong an D".
 */
export function useHotkeys(map: Record<string, HotkeyHandler>, enabled = true): void {
  useEffect(() => {
    if (!enabled) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable) {
          // Ngoai le: Escape va tô hop co Ctrl/Cmd van phai chay duoc.
          if (event.key !== 'Escape' && !event.metaKey && !event.ctrlKey) return;
        }
      }

      const combo = [
        event.ctrlKey || event.metaKey ? 'mod' : '',
        event.shiftKey ? 'shift' : '',
        event.key.length === 1 ? event.key.toLowerCase() : event.key,
      ]
        .filter(Boolean)
        .join('+');

      const handler = map[combo] ?? map[event.key];
      if (handler) handler(event);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [map, enabled]);
}
