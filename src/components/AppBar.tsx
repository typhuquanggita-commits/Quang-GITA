import React, { useState } from 'react';
import { Logo } from './Logo';
import { useAuth, ROLE_LABEL } from '@/lib/auth';
import { Link, useRouter } from '@/lib/router';
import { getTheme, setTheme } from '@/lib/store';

const NAV = [
  { to: '/', label: 'Trang chủ' },
  { to: '/lo-trinh', label: 'Lộ trình' },
  { to: '/chuyen-de', label: 'Chuyên đề' },
  { to: '/luyen-tap', label: 'Luyện tập' },
  { to: '/bo-de', label: 'Bộ đề' },
  { to: '/cam-nang', label: 'Cẩm nang điểm 10' },
  { to: '/hsg', label: 'HSG' },
  { to: '/thu-vien', label: 'Thư viện' },
];

export const AppBar: React.FC = () => {
  const { user, perms, logout } = useAuth();
  const { route, go } = useRouter();
  const [dark, setDark] = useState(getTheme() === 'dark');
  const [menu, setMenu] = useState(false);

  const nav = [...NAV];
  if (user) nav.push({ to: '/nhiem-vu', label: 'Nhiệm vụ' }, { to: '/so-tay', label: 'Sổ tay lỗi sai' }, { to: '/bao-cao', label: 'Báo cáo' });
  if (perms.isStaff) nav.push({ to: '/giao-vien', label: 'Giáo viên' });
  if (perms.canManageUsers) nav.push({ to: '/quan-tri', label: 'Quản trị' });

  const active = (to: string) => (to === '/' ? route.path === '/' : route.path.startsWith(to));

  return (
    <header className="appbar no-print">
      <div className="wrap">
        <Logo />
        <nav className="navlinks">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className={`navlink${active(n.to) ? ' active' : ''}`}>{n.label}</Link>
          ))}
        </nav>
        <button
          className="btn btn-sm" style={{ background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.24)', color: '#fff' }}
          title="Đổi giao diện sáng/tối"
          onClick={() => { const t = dark ? 'light' : 'dark'; setTheme(t); setDark(!dark); }}
        >{dark ? '☀' : '☾'}</button>
        {user ? (
          <div style={{ position: 'relative' }}>
            <button className="btn btn-sm" style={{ background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.24)', color: '#fff' }}
                    onClick={() => setMenu((m) => !m)}>
              <span style={{
                width: 20, height: 20, borderRadius: '50%', background: user.avatarColor,
                display: 'inline-grid', placeItems: 'center', fontSize: 11, fontWeight: 800, color: '#fff',
              }}>{user.name.charAt(0)}</span>
              <span className="nowrap">{user.name.split(' ').slice(-1)[0]}</span>
            </button>
            {menu && (
              <div className="card tight" style={{ position: 'absolute', right: 0, top: 40, width: 250, zIndex: 60 }}
                   onMouseLeave={() => setMenu(false)}>
                <div className="bold">{user.name}</div>
                <div className="faint">{user.email}</div>
                <div className="mt2 row-wrap">
                  <span className="badge badge-brand">{ROLE_LABEL[user.role]}</span>
                  <span className="badge">Lớp {user.grade}</span>
                  {perms.isPaid && <span className="badge badge-gold">Đang học tại GITA</span>}
                </div>
                <hr style={{ margin: '12px 0' }} />
                <div className="sidenav">
                  <button onClick={() => { setMenu(false); go('/bao-cao'); }}>📈 Báo cáo học tập</button>
                  <button onClick={() => { setMenu(false); go('/nhiem-vu'); }}>📝 Nhiệm vụ về nhà</button>
                  <button onClick={() => { setMenu(false); go('/so-tay'); }}>📓 Sổ tay lỗi sai</button>
                  <button onClick={() => { setMenu(false); logout(); go('/'); }}>↩ Đăng xuất</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/dang-nhap" className="btn btn-accent btn-sm">Đăng nhập</Link>
        )}
      </div>
    </header>
  );
};
