import React, { useState } from 'react';
import { useApp, go } from '@/state';
import { BRAND, BRAND_TRACK_STYLE } from '@/data/brand';
import { currentRole, isTeacher, suggestRoleUpgrade, applyRole } from '@/lib/auth';
import { ROLES } from '@/data/roles';
import { progressOverview } from '@/lib/engine';
import { GitaLogo } from '@/components/Logo';

export interface NavItem {
  path: string;
  label: string;
  icon: string;
  group: string;
  teacherOnly?: boolean;
}

export const NAV: NavItem[] = [
  { path: '/', label: 'Tổng quan', icon: '◎', group: 'Học tập' },
  { path: '/dashboard', label: 'Bảng tiến độ', icon: '▤', group: 'Học tập' },
  { path: '/roadmap', label: 'Lộ trình của tôi', icon: '⟶', group: 'Học tập' },
  { path: '/missions', label: 'Nhiệm vụ & Phiếu luyện', icon: '✎', group: 'Học tập' },
  { path: '/portfolio', label: 'Hồ sơ học viên', icon: '❖', group: 'Học tập' },
  { path: '/topics', label: 'Cây chuyên đề', icon: '❑', group: 'Nội dung' },
  { path: '/exams', label: 'Kỳ thi & Cấu trúc đề', icon: '◇', group: 'Nội dung' },
  { path: '/papers', label: 'Đề mẫu & Bộ giải đề', icon: '⬢', group: 'Nội dung' },
  { path: '/playbook', label: 'Bí kíp & Thói quen', icon: '★', group: 'Nội dung' },
  { path: '/library', label: 'Kiến trúc tài liệu', icon: '❐', group: 'Nội dung' },
  { path: '/gita', label: 'Mô thức GITA', icon: '◈', group: 'Hệ thống' },
  { path: '/brand', label: 'Nhận diện MATH365', icon: '◈', group: 'Hệ thống' },
  { path: '/roles', label: 'Phân quyền', icon: '⚿', group: 'Hệ thống' },
  { path: '/classes', label: 'Quản lý lớp', icon: '⛁', group: 'Hệ thống', teacherOnly: true },
];

export function Shell({ children, active }: { children: React.ReactNode; active: string }) {
  const { state, update } = useApp();
  const [open, setOpen] = useState(false);
  const role = currentRole(state);
  const teacher = isTeacher(state);
  const upgrade = suggestRoleUpgrade(state);
  const track = state.profile?.track ?? 'thpt';
  const ov = progressOverview(state, track);

  const items = NAV.filter((n) => !n.teacherOnly || teacher);
  const groups = [...new Set(items.map((i) => i.group))];

  return (
    <div className="min-h-screen lg:flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[264px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white px-4 py-5 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          className="mb-6 flex w-full items-center gap-3 text-left"
          onClick={() => {
            go('/');
            setOpen(false);
          }}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
            <GitaLogo size={30} variant="mark" />
          </span>
          <span>
            <span className="block text-[15px] font-extrabold tracking-tight text-slate-900">
              {BRAND.product}
            </span>
            <span className="block text-[11px] font-semibold text-brand-600">
              by {BRAND.org}
            </span>
          </span>
        </button>

        {groups.map((g) => (
          <div key={g} className="mb-5">
            <div className="mb-1.5 px-3 text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
              {g}
            </div>
            <nav className="space-y-0.5">
              {items
                .filter((i) => i.group === g)
                .map((item) => {
                  const isActive =
                    active === item.path || (item.path !== '/' && active.startsWith(item.path));
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        go(item.path);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13.5px] font-semibold transition ${
                        isActive
                          ? 'bg-brand-50 text-brand-800'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className={isActive ? 'text-brand-600' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      {item.label}
                    </button>
                  );
                })}
            </nav>
          </div>
        ))}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="text-[10.5px] font-bold uppercase tracking-wide text-slate-400">
            Vai trò hiện tại
          </div>
          <div className="mt-1 text-[13px] font-bold" style={{ color: role.color }}>
            {role.name}
          </div>
          <label className="mt-2 block text-[11px] font-semibold text-slate-500">
            Chuyển vai trò (bản trình diễn)
            <select
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[12px] font-medium text-slate-700"
              value={role.id}
              onChange={(e) =>
                update((s) => applyRole(s, e.target.value as never, 'Chuyển vai trò thủ công'))
              }
            >
              {ROLES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.shortName}
                </option>
              ))}
            </select>
          </label>
          {upgrade && (
            <button
              className="mt-2 w-full rounded-lg bg-accent-500 px-2 py-1.5 text-[11.5px] font-bold text-white hover:bg-accent-600"
              onClick={() => update((s) => applyRole(s, upgrade.role, upgrade.reason))}
            >
              Đủ điều kiện nâng cấp →
            </button>
          )}
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Main */}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
          <button
            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Mở menu"
          >
            ☰
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[13px] font-bold text-slate-800">
              {state.profile?.name || 'Khách'} · {BRAND_TRACK_STYLE[track].label}
            </div>
            <div className="truncate text-[11.5px] text-slate-500">{BRAND.tagline}</div>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <MiniStat label="Level" value={`${ov.level}/5`} />
            <MiniStat label="Giai đoạn" value={`${ov.stage}/5`} />
            <MiniStat label="KPI gần đây" value={`${ov.avgKpi}%`} />
            <MiniStat label="XP" value={String(state.xp)} />
          </div>
        </header>
        <main className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        <footer className="border-t border-slate-200 px-6 py-6 text-center text-[11.5px] leading-relaxed text-slate-400">
          {BRAND.fullName} · Dữ liệu học tập được lưu trên trình duyệt của bạn.
          <br />
          Thông tin kỳ thi mang tính tham khảo — luôn đối chiếu với công bố chính thức của Bộ GD&amp;ĐT,
          Sở GD&amp;ĐT Hà Nội và từng trường trước mỗi mùa thi.
        </footer>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-right">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-[13px] font-extrabold tabular-nums text-slate-800">{value}</div>
    </div>
  );
}
