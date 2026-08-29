import { useEffect, useMemo, useRef, useState } from 'react';
import { SECTIONS } from '../../config';
import { TOPICS } from '../../data/topics';
import { cn } from '../../lib/cn';
import { navigate } from '../../lib/router';
import { useAppState } from '../../store/AppStore';
import { IconSearch } from './icons';

interface Command {
  id: string;
  title: string;
  group: string;
  href: string;
  keywords?: string;
}

/**
 * Bang lenh (Ctrl/Cmd + K).
 *
 * Voi mot ung dung co nhieu chuyen de, dieu huong bang chuot la nut that.
 * Bang lenh cho phep di thang den bat ky chuyen de nao trong hai giay —
 * dieu tao ra khac biet lon khi nguoi hoc dung app hang ngay trong nhieu thang.
 */
export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const state = useAppState();
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(() => {
    const base: Command[] = [
      { id: 'go.home', title: 'Tổng quan', group: 'Điều hướng', href: '#/' },
      { id: 'go.exam', title: 'Thi thử', group: 'Điều hướng', href: '#/exam' },
      { id: 'go.practice', title: 'Luyện tập theo chuyên đề', group: 'Điều hướng', href: '#/practice' },
      { id: 'go.review', title: 'Sổ tay lỗi sai & ôn tập', group: 'Điều hướng', href: '#/review' },
      { id: 'go.analytics', title: 'Phân tích năng lực', group: 'Điều hướng', href: '#/analytics' },
      {
        id: 'go.profile',
        title: 'Hồ sơ học viên',
        group: 'Điều hướng',
        href: '#/profile',
        keywords: 'lich su dap an phan tich lo trinh ca nhan hoa',
      },
      { id: 'go.roadmap', title: 'Lộ trình', group: 'Điều hướng', href: '#/roadmap' },
      { id: 'go.gita', title: 'Mô thức huấn luyện GITA', group: 'Điều hướng', href: '#/gita', keywords: 'goal input train apply tang hap thu thoi quen' },
      { id: 'go.roles', title: 'Phân quyền hệ thống', group: 'Điều hướng', href: '#/roles' },
      { id: 'go.settings', title: 'Cài đặt', group: 'Điều hướng', href: '#/settings' },
      ...SECTIONS.map((s) => ({
        id: `mock.${s.id}`,
        title: `Thi thử phần ${s.shortName} (${s.minutes} phút)`,
        group: 'Bắt đầu nhanh',
        href: `#/exam?start=${s.id}`,
        keywords: s.name,
      })),
      { id: 'mock.full', title: 'Thi thử full 3 phần (195 phút)', group: 'Bắt đầu nhanh', href: '#/exam?start=full' },
    ];

    const topics = TOPICS.filter(
      (t) => t.section !== 'science' || t.subject === state.settings.scienceSubject,
    ).map((t) => ({
      id: `topic.${t.id}`,
      title: t.name,
      group: 'Luyện chuyên đề',
      href: `#/practice?topic=${encodeURIComponent(t.id)}`,
    }));

    return [...base, ...topics];
  }, [state.settings.scienceSubject]);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return commands.slice(0, 12);
    return commands
      .filter((c) => normalize(`${c.title} ${c.group} ${c.keywords ?? ''}`).includes(q))
      .slice(0, 20);
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
      window.setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  if (!open) return null;

  const run = (command: Command | undefined) => {
    if (!command) return;
    onClose();
    navigate(command.href);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Bảng lệnh"
        className="card animate-in relative w-full max-w-xl overflow-hidden p-0 shadow-[var(--shadow-pop)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <IconSearch className="size-4 text-fg-subtle" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setCursor((c) => Math.min(results.length - 1, c + 1));
              } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setCursor((c) => Math.max(0, c - 1));
              } else if (event.key === 'Enter') {
                event.preventDefault();
                run(results[cursor]);
              } else if (event.key === 'Escape') {
                onClose();
              }
            }}
            placeholder="Tìm chuyên đề, màn hình hoặc bắt đầu một đề thi thử…"
            aria-label="Tìm kiếm lệnh"
            className="h-14 w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
          />
          <kbd className="hidden rounded border border-line px-1.5 py-0.5 text-[10px] text-fg-subtle sm:block">
            Esc
          </kbd>
        </div>

        <ul ref={listRef} className="max-h-80 overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-fg-muted">Không tìm thấy kết quả phù hợp.</li>
          )}
          {results.map((command, index) => (
            <li key={command.id}>
              <button
                type="button"
                data-active={index === cursor}
                onMouseEnter={() => setCursor(index)}
                onClick={() => run(command)}
                className={cn(
                  'flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-sm transition',
                  index === cursor ? 'bg-brand-soft text-fg' : 'text-fg-muted hover:bg-surface-2',
                )}
              >
                <span className="truncate text-fg">{command.title}</span>
                <span className="shrink-0 text-xs text-fg-subtle">{command.group}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Bo dau tieng Viet de tim kiem khong dau van ra ket qua. */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}
