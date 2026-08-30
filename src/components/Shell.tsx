import React, { useState } from 'react';
import { useApp, go } from '@/state';
import type { AppState, TrackId } from '@/types';
import { BRAND, BRAND_TRACK_STYLE } from '@/data/brand';
import { currentRole, isTeacher, suggestRoleUpgrade, applyRole } from '@/lib/auth';
import { ROLES } from '@/data/roles';
import { href } from '@/lib/routes';
import { Lnk } from '@/components/ui';
import { GitaLogo } from '@/components/Logo';

export interface NavItem {
  path: string;
  label: string;
  icon: string;
  group: string;
  teacherOnly?: boolean;
}

export const NAV: NavItem[] = [
  { path: href('home'), label: 'Tổng quan', icon: '◎', group: 'Học tập' },
  { path: href('hom-nay'), label: 'Hôm nay', icon: '☀', group: 'Học tập' },
  { path: href('tien-do'), label: 'Bảng tiến độ', icon: '▤', group: 'Học tập' },
  { path: href('lo-trinh'), label: 'Lộ trình của tôi', icon: '⟶', group: 'Học tập' },
  { path: href('nhiem-vu'), label: 'Nhiệm vụ & Phiếu luyện', icon: '✎', group: 'Học tập' },
  { path: href('ho-so'), label: 'Hồ sơ học viên', icon: '❖', group: 'Học tập' },
  { path: href('bao-cao'), label: 'Báo cáo gia đình', icon: '⎙', group: 'Học tập' },
  { path: href('chuyen-de'), label: 'Chuyên đề Toán', icon: '❑', group: 'Nội dung' },
  { path: href('de-cuong'), label: 'Đề cương ôn tập', icon: '▦', group: 'Nội dung' },
  { path: href('cau-truc-de-thi'), label: 'Cấu trúc đề thi', icon: '◇', group: 'Nội dung' },
  { path: href('de-thi'), label: 'Đề thi thử có lời giải', icon: '⬢', group: 'Nội dung' },
  { path: href('cong-thuc'), label: 'Sổ tay công thức', icon: '∑', group: 'Nội dung' },
  { path: href('bi-kip'), label: 'Bí kíp & Thói quen', icon: '★', group: 'Nội dung' },
  { path: href('kho-tai-lieu'), label: 'Kho tài liệu', icon: '❐', group: 'Nội dung' },
  { path: href('mo-thuc-gita'), label: 'Mô thức GITA', icon: '◈', group: 'Hệ thống' },
  { path: href('nguon-phuong-phap'), label: 'Nguồn & Phương pháp', icon: '⚖', group: 'Hệ thống' },
  { path: href('nhan-dien'), label: 'Nhận diện MATH365', icon: '◈', group: 'Hệ thống' },
  { path: href('hoc-vien'), label: 'Học viện giáo viên', icon: '⌘', group: 'Hệ thống' },
  { path: href('phan-quyen'), label: 'Phân quyền', icon: '⚿', group: 'Hệ thống' },
  { path: href('lop-hoc'), label: 'Quản lý lớp', icon: '⛁', group: 'Hệ thống', teacherOnly: true },
];

export function Shell({ children, active }: { children: React.ReactNode; active: string }) {
  const { state, update } = useApp();
  const [open, setOpen] = useState(false);
  const role = currentRole(state);
  const teacher = isTeacher(state);
  const upgrade = suggestRoleUpgrade(state);
  const track = state.profile?.track ?? 'thpt';
  const ov = miniOverview(state, track);

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
        <Lnk
          to="/"
          className="mb-6 flex w-full items-center gap-3 text-left"
          title={`${BRAND.product} — trang chủ`}
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
        </Lnk>

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
                    <Lnk
                      key={item.path}
                      to={item.path}
                      ariaCurrent={isActive}
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
                    </Lnk>
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
          <div className="min-w-0 flex-1 xl:flex-none">
            <div className="truncate text-[13px] font-bold text-slate-800">
              {state.profile?.name || 'Khách'} · {BRAND_TRACK_STYLE[track].label}
            </div>
            <div className="truncate text-[11.5px] text-slate-500">{BRAND.tagline}</div>
          </div>
          <TopSearch />
          <div className="hidden items-center gap-4 sm:flex">
            <MiniStat label="Level" value={`${ov.level}/5`} />
            <MiniStat label="Giai đoạn" value={`${ov.stage}/5`} />
            <MiniStat label="KPI gần đây" value={`${ov.avgKpi}%`} />
            <MiniStat label="XP" value={String(state.xp)} />
          </div>
        </header>
        <main className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        <SiteFooter />
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


/** Ô tìm kiếm toàn hệ thống trên thanh trên cùng. */
function TopSearch() {
  const [q, setQ] = useState('');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim();
    go(v ? `/search/${encodeURIComponent(v)}` : '/search');
    setQ('');
  };
  return (
    <form onSubmit={submit} className="hidden min-w-0 flex-1 xl:block">
      <label className="relative block">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-slate-400">
          ⌕
        </span>
        <input
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-[13px] outline-none transition focus:border-brand-400 focus:bg-white"
          placeholder="Tìm chuyên đề, công thức, đề mẫu, bí kíp…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </label>
    </form>
  );
}


/**
 * Chân trang có liên kết đi được.
 *
 * Đây không phải phần trang trí. Chân trang xuất hiện trên mọi trang, nên nó là
 * con đường ngắn nhất để công cụ tìm kiếm đi từ bất kỳ đâu tới mọi khu vực nội
 * dung chính — và cũng là chỗ đặt những tuyên bố minh bạch mà người đọc cần
 * thấy trước khi quyết định có tin hay không.
 */
function SiteFooter() {
  const cols: { title: string; links: { to: string; label: string }[] }[] = [
    {
      title: 'Nội dung học tập',
      links: [
        { to: href('chuyen-de'), label: 'Chuyên đề Toán' },
        { to: href('de-thi'), label: 'Đề thi thử có lời giải' },
        { to: href('cau-truc-de-thi'), label: 'Cấu trúc và ma trận đề thi' },
        { to: href('cong-thuc'), label: 'Sổ tay công thức Toán' },
      ],
    },
    {
      title: 'Phương pháp',
      links: [
        { to: href('lo-trinh'), label: 'Lộ trình ôn thi' },
        { to: href('bi-kip'), label: 'Bí kíp và thói quen học' },
        { to: href('mo-thuc-gita'), label: 'Mô thức huấn luyện GITA' },
        { to: href('kho-tai-lieu'), label: 'Kho tài liệu' },
      ],
    },
    {
      title: 'Về MATH365',
      links: [
        { to: href('nguon-phuong-phap'), label: 'Nguồn và phương pháp biên soạn' },
        { to: href('hoc-vien'), label: 'Học viện giáo viên' },
        { to: href('nhan-dien'), label: 'Bộ nhận diện thương hiệu' },
        { to: href('phan-quyen'), label: 'Hệ thống phân quyền' },
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <GitaLogo size={28} variant="mark" />
              <span className="text-[14px] font-extrabold text-brand-800">{BRAND.product}</span>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-slate-500">{BRAND.promise}</p>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                {c.title}
              </div>
              <ul className="mt-2 space-y-1.5">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Lnk to={l.to} className="text-[12.5px] text-slate-600 hover:text-brand-700 hover:underline">
                      {l.label}
                    </Lnk>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-7 border-t border-slate-100 pt-5 text-[11.5px] leading-relaxed text-slate-400">
          <p>
            {BRAND.fullName}. Dữ liệu học tập được lưu trên trình duyệt của bạn và không gửi đi đâu.
          </p>
          <p className="mt-1">
            Thông tin kỳ thi mang tính tham khảo — luôn đối chiếu với công bố chính thức của Bộ
            GD&amp;ĐT, Sở GD&amp;ĐT Hà Nội và từng trường trước mỗi mùa thi. Đề mẫu do MATH365 biên
            soạn theo cấu trúc thống kê, không phải đề thi thật và không nhằm dự đoán đề thật.
            Chúng tôi không cam kết kết quả thi.{' '}
            <Lnk to={href('nguon-phuong-phap')} className="font-semibold text-brand-600 hover:underline">
              Xem nguồn và phương pháp biên soạn
            </Lnk>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}


/**
 * Chỉ số tóm tắt trên thanh trên cùng.
 *
 * Cố ý không dùng hàm thống kê đầy đủ trong lớp chấm điểm, vì hàm đó cần tới cả
 * kho hai nghìn phiếu và sẽ kéo kho ấy vào gói mã khởi động của mọi trang. Mã
 * giai đoạn đã mang sẵn ký tự đầu cho biết thuộc luồng nào (T, C, Q), nên tính
 * được đầy đủ mà không cần tra kho.
 */
const STAGE_PREFIX: Record<TrackId, string> = { thpt: 'T', chuyen: 'C', 'thpt-qg': 'Q', lop6: 'L', 'chinh-khoa': 'K' };

function miniOverview(state: AppState, track: TrackId) {
  const prefix = STAGE_PREFIX[track];
  const rel = state.attempts.filter((a) => a.stageId?.startsWith(prefix));
  const last10 = rel.slice(-10);
  return {
    level: state.levelUnlocked[track] ?? 1,
    stage: state.stageUnlocked[track] ?? 1,
    avgKpi: last10.length ? Math.round(last10.reduce((s, a) => s + a.kpi, 0) / last10.length) : 0,
  };
}
