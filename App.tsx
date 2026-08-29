/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {NORTH_STAR} from './data';
import {Charter} from './components/engwill/Charter';
import {Overview} from './components/engwill/Overview';
import {Roadmap} from './components/engwill/Roadmap';
import {Methods} from './components/engwill/Methods';
import {Drills} from './components/engwill/Drills';
import {Lectures} from './components/engwill/Lectures';
import {Playbooks} from './components/engwill/Playbooks';
import {Habits} from './components/engwill/Habits';
import {Mindset} from './components/engwill/Mindset';
import {Clubs} from './components/engwill/Clubs';
import {Resources} from './components/engwill/Resources';

interface Nav {
  id: string;
  icon: string;
  label: string;
  hint: string;
  render: () => React.ReactNode;
}

const NAV: Nav[] = [
  {
    id: 'charter',
    icon: '🧿',
    label: 'La Bàn',
    hint: 'Hiến chương cá nhân',
    render: () => <Charter />,
  },
  {
    id: 'overview',
    icon: '◎',
    label: 'Tổng quan',
    hint: 'Hiến chương & quỹ đạo',
    render: () => <Overview />,
  },
  {
    id: 'roadmap',
    icon: '⛰',
    label: 'Lộ trình',
    hint: '12 cột mốc / 36 tháng',
    render: () => <Roadmap />,
  },
  {
    id: 'methods',
    icon: '🧪',
    label: 'Phương pháp',
    hint: '28 phương pháp thế giới',
    render: () => <Methods />,
  },
  {
    id: 'drills',
    icon: '🏋',
    label: 'Luyện tập',
    hint: '31 bài luyện chuẩn hoá',
    render: () => <Drills />,
  },
  {
    id: 'lectures',
    icon: '🎬',
    label: 'Bài giảng',
    hint: '10 chuỗi · 268 bài',
    render: () => <Lectures />,
  },
  {
    id: 'playbooks',
    icon: '🗝',
    label: 'Bí kíp',
    hint: '24 chiến thuật',
    render: () => <Playbooks />,
  },
  {
    id: 'habits',
    icon: '⚙',
    label: 'Thói quen',
    hint: '12 thói quen · 6 nghi thức',
    render: () => <Habits />,
  },
  {
    id: 'mindset',
    icon: '🧭',
    label: 'Tư duy',
    hint: '10 mô-đun lập trình',
    render: () => <Mindset />,
  },
  {
    id: 'clubs',
    icon: '🤝',
    label: 'Club',
    hint: '7 CLB · 12 cổng kiểm định',
    render: () => <Clubs />,
  },
  {
    id: 'resources',
    icon: '📚',
    label: 'Tài liệu',
    hint: '37 nguồn đã sàng lọc',
    render: () => <Resources />,
  },
];

export const App: React.FC = () => {
  const [tab, setTab] = useState('charter');
  const [menuOpen, setMenuOpen] = useState(false);
  const active = NAV.find((n) => n.id === tab)!;

  const NavList = (
    <nav className="space-y-1">
      {NAV.map((n) => (
        <button
          key={n.id}
          onClick={() => {
            setTab(n.id);
            setMenuOpen(false);
            window.scrollTo({top: 0});
          }}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
            tab === n.id
              ? 'bg-sky-500/10 text-sky-300 ring-1 ring-inset ring-sky-500/30'
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
          }`}>
          <span className="w-5 shrink-0 text-center text-base">{n.icon}</span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">{n.label}</span>
            <span className="block truncate text-[11px] text-slate-600">
              {n.hint}
            </span>
          </span>
        </button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 antialiased">
      <div className="mx-auto flex max-w-[1400px]">
        {/* Sidebar — desktop */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-800 p-5 lg:flex">
          <div className="mb-6">
            <p className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-xl font-black tracking-tight text-transparent">
              ENGWILL365
            </p>
            <p className="mt-1 text-[11px] leading-snug text-slate-500">
              0 → IELTS 8.0 trong 1.095 ngày
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">{NavList}</div>
          <p className="mt-4 border-t border-slate-800 pt-4 text-[10px] leading-relaxed text-slate-600">
            {NORTH_STAR.bigBet}
          </p>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Mobile header */}
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-3 backdrop-blur lg:hidden">
            <p className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-lg font-black tracking-tight text-transparent">
              ENGWILL365
            </p>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300">
              {menuOpen ? '✕' : '☰'} {active.label}
            </button>
          </header>
          {menuOpen && (
            <div className="border-b border-slate-800 bg-slate-900 p-4 lg:hidden">
              {NavList}
            </div>
          )}

          <main className="px-4 py-8 md:px-8 lg:px-10 lg:py-10">
            {active.render()}
            <footer className="mt-16 border-t border-slate-800 pt-6 text-xs leading-relaxed text-slate-600">
              <p className="font-semibold text-slate-500">
                ENGWILL365 — {NORTH_STAR.meaning}
              </p>
              <p className="mt-2 max-w-3xl">
                Hệ thống này là một bản thiết kế, không phải một lời hứa. Nó chỉ
                tạo ra kết quả khi được vận hành mỗi ngày. Nếu bạn chỉ đọc nó
                một lần rồi đóng lại, nó không khác gì 100 bài viết “bí quyết
                IELTS” bạn đã đọc trước đây. Hãy bắt đầu ở tab{' '}
                <span className="font-medium text-slate-400">La Bàn</span> — viết
                cho xong mục 01 và mục 11 bằng câu trả lời thật của bạn. Sau đó
                sang tab{' '}
                <span className="font-medium text-slate-400">Lộ trình</span>, mở
                cột mốc Y1Q1, và làm đúng buổi học của ngày mai.
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};
