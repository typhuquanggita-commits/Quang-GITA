import React, { useState } from 'react';
import { useAuth, ROLE_LABEL } from '@/lib/auth';
import { useRouter } from '@/lib/router';
import { Card, Note, Stat } from '@/components/ui';
import { getAttempts, getClasses, getUsers, resetAll, upsertUser } from '@/lib/store';
import { ALL_TOPICS, FORMULAS, HSG_TOPICS } from '@/content';
import { ALL_TEMPLATES } from '@/bank';
import { examsOfGrade } from '@/lib/exams';
import type { Grade, Role, User } from '@/types';

const YEAR = 365 * 24 * 3600 * 1000;
const dt = (t?: number) => (t ? new Date(t).toLocaleDateString('vi-VN') : '—');

export const Admin: React.FC = () => {
  const { user, perms, refresh } = useAuth();
  const { go } = useRouter();
  const [nonce, setNonce] = useState(0);
  if (!user || !perms.canManageUsers) { go('/'); return null; }

  const users = getUsers();
  const attempts = getAttempts();
  const classes = getClasses();
  void nonce;

  const update = (u: User, patch: Partial<User>) => {
    upsertUser({ ...u, ...patch });
    setNonce((n) => n + 1);
    refresh();
  };

  const examTotal = ([6, 7, 8, 9] as Grade[]).reduce((s, g) => s + examsOfGrade(g).length, 0);

  return (
    <div className="wrap page">
      <h1>Quản trị hệ thống MATHGITA</h1>

      <div className="grid g4 mb6">
        <Stat k="Tài khoản" v={users.length} />
        <Stat k="Lớp học" v={classes.length} />
        <Stat k="Lượt làm bài" v={attempts.length} />
        <Stat k="Đề trong ngân hàng" v={examTotal} tone="gold" />
      </div>

      <div className="grid g4 mb6">
        <Stat k="Chuyên đề" v={ALL_TOPICS.length} />
        <Stat k="Khuôn câu hỏi" v={ALL_TEMPLATES.length} />
        <Stat k="Thẻ công thức" v={FORMULAS.length} />
        <Stat k="Chuyên đề HSG" v={HSG_TOPICS.length} />
      </div>

      <Card className="rule-top mb6">
        <h3>Quản lý tài khoản &amp; gói học phí</h3>
        <p className="faint">Nâng cấp học sinh lên gói GITA để mở toàn bộ học liệu; hạ cấp khi hết hạn đóng phí.</p>
        <div className="table-scroll">
          <table className="table">
            <thead><tr><th>Họ tên</th><th>Email</th><th>Vai trò</th><th className="tc">Lớp</th><th>Hạn gói</th><th className="tr">Thao tác</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="bold">{u.name}</td>
                  <td className="small">{u.email}</td>
                  <td>
                    <select className="select" style={{ padding: '4px 8px', fontSize: 12 }} value={u.role}
                            onChange={(e) => update(u, { role: e.target.value as Role, paidUntil: e.target.value === 'student_gita' ? Date.now() + YEAR : undefined })}>
                      {(['student_free', 'student_gita', 'teacher', 'admin'] as Role[]).map((r) => (
                        <option key={r} value={r}>{ROLE_LABEL[r]}</option>
                      ))}
                    </select>
                  </td>
                  <td className="tc">{u.grade}</td>
                  <td className="small">{dt(u.paidUntil)}</td>
                  <td className="tr">
                    <div className="btn-group">
                      <button className="btn btn-sm" onClick={() => update(u, { role: 'student_gita', paidUntil: Date.now() + YEAR })}>Gia hạn 1 năm</button>
                      <button className="btn btn-sm" onClick={() => update(u, { paidUntil: Date.now() - 1 })}>Hết hạn</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="rule-top mb6">
        <h3>Lớp học</h3>
        <div className="table-scroll">
          <table className="table">
            <thead><tr><th>Mã lớp</th><th>Tên lớp</th><th className="tc">Khối</th><th className="tc">Sĩ số</th><th>Giáo viên</th></tr></thead>
            <tbody>
              {classes.map((c) => (
                <tr key={c.id}>
                  <td><code>{c.id}</code></td>
                  <td className="bold">{c.name}</td>
                  <td className="tc">{c.grade}</td>
                  <td className="tc">{c.studentIds.length}</td>
                  <td>{users.find((u) => u.id === c.teacherId)?.name ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Note title="⚠ Vùng nguy hiểm" tone="bad">
        <p>Xoá toàn bộ dữ liệu cục bộ (tài khoản, bài làm, nhiệm vụ, tiến độ) và khởi tạo lại dữ liệu mẫu.</p>
        <button className="btn btn-danger" onClick={() => {
          if (confirm('Xoá toàn bộ dữ liệu học tập trên trình duyệt này? Thao tác không thể hoàn tác.')) {
            resetAll(); window.location.hash = '/'; window.location.reload();
          }
        }}>Xoá toàn bộ dữ liệu</button>
      </Note>

      <Note title="ℹ️ Về lưu trữ dữ liệu">
        <p className="mb0">
          Bản này lưu toàn bộ dữ liệu học tập trên trình duyệt (localStorage) để hệ thống chạy độc lập, không cần máy chủ.
          Lớp <code>src/lib/store.ts</code> đóng vai trò kho dữ liệu: khi triển khai máy chủ thật, chỉ cần thay phần thân
          các hàm trong tệp này bằng lời gọi API tương ứng, toàn bộ giao diện giữ nguyên.
        </p>
      </Note>
    </div>
  );
};
