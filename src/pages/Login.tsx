import React, { useState } from 'react';
import { useAuth, ROLE_DESC, ROLE_LABEL } from '@/lib/auth';
import { useRouter } from '@/lib/router';
import { Card } from '@/components/ui';
import { Logo } from '@/components/Logo';
import type { Grade, Role } from '@/types';

const DEMO: { role: Role; email: string }[] = [
  { role: 'student_gita', email: 'hs9@gita.edu.vn' },
  { role: 'student_free', email: 'free@gita.edu.vn' },
  { role: 'teacher', email: 'teacher@gita.edu.vn' },
  { role: 'admin', email: 'admin@gita.edu.vn' },
];

export const Login: React.FC = () => {
  const { login, register } = useAuth();
  const { go } = useRouter();
  const [tab, setTab] = useState<'login' | 'reg'>('login');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState<Grade>(6);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr(null);
    const msg = tab === 'login' ? await login(email, pass) : await register({ name, email, pass, grade });
    setBusy(false);
    if (msg) setErr(msg); else go('/bang-dieu-khien');
  };

  const quick = async (em: string) => {
    setBusy(true); setErr(null);
    const msg = await login(em, 'gita2026');
    setBusy(false);
    if (msg) setErr(msg); else go('/bang-dieu-khien');
  };

  return (
    <div className="wrap page" style={{ maxWidth: 980 }}>
      <div className="grid g2" style={{ alignItems: 'start' }}>
        <Card className="rule-top">
          <Logo onLight />
          <div className="tabs mt4">
            <button className={`tab${tab === 'login' ? ' on' : ''}`} onClick={() => setTab('login')}>Đăng nhập</button>
            <button className={`tab${tab === 'reg' ? ' on' : ''}`} onClick={() => setTab('reg')}>Đăng ký học thử</button>
          </div>
          <form onSubmit={submit}>
            {tab === 'reg' && (
              <>
                <div className="field">
                  <label className="label">Họ và tên</label>
                  <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nguyễn Văn A" />
                </div>
                <div className="field">
                  <label className="label">Đang học lớp</label>
                  <select className="select" value={grade} onChange={(e) => setGrade(Number(e.target.value) as Grade)}>
                    {[6, 7, 8, 9].map((g) => <option key={g} value={g}>Lớp {g}</option>)}
                  </select>
                </div>
              </>
            )}
            <div className="field">
              <label className="label">Email</label>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" />
            </div>
            <div className="field">
              <label className="label">Mật khẩu</label>
              <input className="input" type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Tối thiểu 6 ký tự" />
            </div>
            {err && <div className="err-text mb3">{err}</div>}
            <button className="btn btn-primary btn-block btn-lg" disabled={busy}>
              {busy ? 'Đang xử lý…' : tab === 'login' ? 'Đăng nhập' : 'Tạo tài khoản học thử'}
            </button>
          </form>
          <p className="hint mt3">
            Tài khoản đăng ký mới thuộc nhóm <strong>Học sinh ngoài</strong>: học miễn phí phần Nền tảng và 3 đề luyện mỗi khối.
            Liên hệ trung tâm GITA để kích hoạt gói học đầy đủ.
          </p>
        </Card>

        <div>
          <Card>
            <h3>Tài khoản trải nghiệm</h3>
            <p className="muted small">Mật khẩu chung cho mọi tài khoản mẫu: <code>gita2026</code></p>
            <div className="stack" style={{ gap: 10 }}>
              {DEMO.map((d) => (
                <button key={d.email} className="opt" onClick={() => quick(d.email)} disabled={busy}>
                  <span className="opt-key">{ROLE_LABEL[d.role].charAt(0)}</span>
                  <span style={{ flex: 1 }}>
                    <span className="bold">{ROLE_LABEL[d.role]}</span>
                    <div className="faint">{d.email}</div>
                    <div className="xs muted">{ROLE_DESC[d.role]}</div>
                  </span>
                </button>
              ))}
            </div>
          </Card>
          <Card className="mt4">
            <h4>Phân quyền trong hệ thống</h4>
            <div className="table-scroll">
              <table className="table">
                <thead><tr><th>Học liệu</th><th>HS ngoài</th><th>HS GITA</th></tr></thead>
                <tbody>
                  {[
                    ['Lý thuyết, sơ đồ đọc vị, sơ đồ tư duy', '✓', '✓'],
                    ['Dạng bài mức Nhận biết – Thông hiểu', '✓', '✓'],
                    ['Bài Vận dụng – Vận dụng cao', '—', '✓'],
                    ['Bộ 100 đề luyện mỗi khối', '3 đề', '✓'],
                    ['Đề cương giữa kỳ / cuối kỳ / cả năm / ôn hè', '—', '✓'],
                    ['Chuyên đề & đề thi học sinh giỏi', '—', '✓'],
                    ['Cẩm nang công thức điểm 10 (đầy đủ)', '—', '✓'],
                    ['Nhiệm vụ về nhà & báo cáo tiến bộ', '—', '✓'],
                  ].map((row) => (
                    <tr key={row[0]}>
                      <td>{row[0]}</td>
                      <td className="tc">{row[1]}</td>
                      <td className="tc bold" style={{ color: 'var(--ok)' }}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
