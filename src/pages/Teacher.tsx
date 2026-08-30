import React, { useMemo, useState } from 'react';
import { Link, useRouter } from '@/lib/router';
import { useAuth } from '@/lib/auth';
import { Bar, Card, Empty, M, Modal, Note, Stat } from '@/components/ui';
import { getAssignments, getAttempts, getClasses, getUsers, removeAssignment, uid, upsertAssignment } from '@/lib/store';
import { examsOfGrade } from '@/lib/exams';
import { topicsOfGrade } from '@/content';
import type { Assignment, AssignmentReport, Grade } from '@/types';

const dt = (t: number) => new Date(t).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

export const Teacher: React.FC = () => {
  const { user, perms } = useAuth();
  const { go } = useRouter();
  const [tab, setTab] = useState<'lop' | 'giao-bai' | 'bao-cao'>('lop');
  const [open, setOpen] = useState(false);
  const [nonce, setNonce] = useState(0);

  if (!user || !perms.canAssign) { go('/'); return null; }

  const classes = getClasses();
  const users = getUsers();
  const assignments = useMemo(() => getAssignments().sort((a, b) => b.assignedAt - a.assignedAt), [nonce]);
  const attempts = useMemo(() => getAttempts(), [nonce]);

  const reportOf = (a: Assignment): AssignmentReport[] => {
    const cls = classes.find((c) => c.id === a.classId);
    const ids = cls ? cls.studentIds : users.filter((u) => u.grade === a.grade && u.role.startsWith('student')).map((u) => u.id);
    return ids.map((id) => {
      const u = users.find((x) => x.id === id);
      const mine = attempts.filter((x) => x.userId === id && x.assignmentId === a.id);
      const bestScore = mine.length ? Math.max(...mine.map((x) => x.score10)) : null;
      const lastSubmittedAt = mine.length ? Math.max(...mine.map((x) => x.submittedAt)) : null;
      const status: AssignmentReport['status'] =
        !mine.length ? 'CHUA_LAM'
          : bestScore! >= a.requiredScore ? (lastSubmittedAt! > a.dueAt ? 'TRE_HAN' : 'DAT')
            : 'CHUA_DAT';
      return { assignmentId: a.id, userId: id, userName: u?.name ?? id, attempts: mine.length, bestScore, lastSubmittedAt, status };
    });
  };

  return (
    <div className="wrap page">
      <div className="section-head">
        <div>
          <h1 style={{ marginBottom: 4 }}>Bảng điều khiển Giáo viên</h1>
          <p className="muted mb0">Giao nhiệm vụ về nhà, theo dõi tiến độ và chất lượng học tập của từng lớp.</p>
        </div>
        <button className="btn btn-accent" onClick={() => setOpen(true)}>+ Giao nhiệm vụ mới</button>
      </div>

      <div className="tabs">
        <button className={`tab${tab === 'lop' ? ' on' : ''}`} onClick={() => setTab('lop')}>Lớp phụ trách</button>
        <button className={`tab${tab === 'giao-bai' ? ' on' : ''}`} onClick={() => setTab('giao-bai')}>Nhiệm vụ đã giao</button>
        <button className={`tab${tab === 'bao-cao' ? ' on' : ''}`} onClick={() => setTab('bao-cao')}>Báo cáo chất lượng</button>
      </div>

      {tab === 'lop' && (
        <div className="grid g2">
          {classes.map((c) => {
            const students = users.filter((u) => c.studentIds.includes(u.id));
            const scores = attempts.filter((a) => c.studentIds.includes(a.userId));
            const avg = scores.length ? scores.reduce((s, a) => s + a.score10, 0) / scores.length : 0;
            return (
              <Card key={c.id} className="rule-top">
                <div className="between mb2">
                  <h3 style={{ margin: 0 }}>{c.name}</h3>
                  <span className="badge badge-brand">Lớp {c.grade}</span>
                </div>
                <div className="grid g3 mb4">
                  <Stat k="Sĩ số" v={students.length} />
                  <Stat k="Điểm TB lớp" v={avg ? avg.toFixed(2) : '—'} tone={avg >= 8 ? 'ok' : ''} />
                  <Stat k="Lượt làm bài" v={scores.length} />
                </div>
                <div className="table-scroll">
                  <table className="table">
                    <thead><tr><th>Học sinh</th><th className="tc">Bài đã làm</th><th className="tc">Điểm TB</th><th>Tiến độ</th></tr></thead>
                    <tbody>
                      {students.map((s) => {
                        const mine = attempts.filter((a) => a.userId === s.id);
                        const av = mine.length ? mine.reduce((x, a) => x + a.score10, 0) / mine.length : 0;
                        return (
                          <tr key={s.id}>
                            <td>{s.name}</td>
                            <td className="tc">{mine.length}</td>
                            <td className="tc bold">{av ? av.toFixed(2) : '—'}</td>
                            <td style={{ width: 140 }}><Bar value={av / 10} tone={av >= 9 ? 'gold' : av >= 8 ? 'ok' : av >= 6.5 ? 'warn' : 'bad'} /></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            );
          })}
          {classes.length === 0 && <Empty icon="🏫" title="Chưa có lớp nào" hint="Quản trị viên khởi tạo lớp trong trang Quản trị." />}
        </div>
      )}

      {tab === 'giao-bai' && (
        assignments.length === 0
          ? <Empty icon="📋" title="Chưa giao nhiệm vụ nào" action={<button className="btn btn-primary" onClick={() => setOpen(true)}>Giao nhiệm vụ đầu tiên</button>} />
          : (
            <div className="stack" style={{ gap: 'var(--sp-4)' }}>
              {assignments.map((a) => {
                const rep = reportOf(a);
                const done = rep.filter((r) => r.status === 'DAT').length;
                return (
                  <Card key={a.id}>
                    <div className="between mb3">
                      <div>
                        <div className="row-wrap mb2">
                          <span className="badge badge-brand">{a.examCode}</span>
                          <span className="badge">Hạn {dt(a.dueAt)}</span>
                          <span className="badge badge-gold">Sàn {a.requiredScore}</span>
                        </div>
                        <h3 style={{ marginBottom: 2 }}>{a.title}</h3>
                        <div className="faint">{a.note}</div>
                      </div>
                      <div className="tr">
                        <div className="stat-k">Đã đạt</div>
                        <div className="stat-v" style={{ fontSize: 26 }}>{done}/{rep.length}</div>
                        <button className="btn btn-sm btn-danger mt2" onClick={() => { removeAssignment(a.id); setNonce((n) => n + 1); }}>Xoá</button>
                      </div>
                    </div>
                    <div className="table-scroll">
                      <table className="table">
                        <thead><tr><th>Học sinh</th><th className="tc">Số lượt</th><th className="tc">Điểm cao nhất</th><th>Trạng thái</th><th>Nộp lúc</th></tr></thead>
                        <tbody>
                          {rep.map((r) => (
                            <tr key={r.userId}>
                              <td>{r.userName}</td>
                              <td className="tc">{r.attempts}</td>
                              <td className="tc bold">{r.bestScore !== null ? r.bestScore.toFixed(2) : '—'}</td>
                              <td>
                                <span className={`badge ${r.status === 'DAT' ? 'badge-ok' : r.status === 'CHUA_LAM' ? 'badge-lock' : r.status === 'TRE_HAN' ? 'badge-vd' : 'badge-bad'}`}>
                                  {r.status === 'DAT' ? 'Đạt' : r.status === 'CHUA_LAM' ? 'Chưa làm' : r.status === 'TRE_HAN' ? 'Đạt (trễ hạn)' : 'Chưa đạt'}
                                </span>
                              </td>
                              <td className="small">{r.lastSubmittedAt ? dt(r.lastSubmittedAt) : '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                );
              })}
            </div>
          )
      )}

      {tab === 'bao-cao' && (
        <div className="stack" style={{ gap: 'var(--sp-4)' }}>
          {([6, 7, 8, 9] as Grade[]).map((g) => {
            const ats = attempts.filter((a) => a.grade === g);
            if (!ats.length) return null;
            const tops = topicsOfGrade(g);
            const agg = new Map<string, { c: number; t: number }>();
            for (const a of ats) for (const r of a.results) {
              const cur = agg.get(r.topicId) ?? { c: 0, t: 0 };
              cur.c += r.partial; cur.t += 1; agg.set(r.topicId, cur);
            }
            return (
              <Card key={g} className="rule-top">
                <h3>Chất lượng theo chuyên đề — khối {g}</h3>
                <p className="faint">Dựa trên {ats.length} lượt làm bài. Chuyên đề dưới 70% là nội dung cần dạy lại cho cả lớp.</p>
                {tops.map((t) => {
                  const v = agg.get(t.id);
                  if (!v) return null;
                  const rate = v.c / v.t;
                  return (
                    <div key={t.id} className="mb3">
                      <div className="between small">
                        <Link to={`/chuyen-de/${t.id}`}><M t={t.name} /></Link>
                        <span className="muted">{Math.round(rate * 100)}% · {v.t} lượt</span>
                      </div>
                      <Bar value={rate} tone={rate >= 0.85 ? 'ok' : rate >= 0.7 ? 'warn' : 'bad'} />
                    </div>
                  );
                })}
              </Card>
            );
          })}
          {attempts.length === 0 && <Empty icon="📊" title="Chưa có dữ liệu bài làm của học sinh" />}
        </div>
      )}

      {open && <AssignModal onClose={() => setOpen(false)} onSaved={() => { setOpen(false); setNonce((n) => n + 1); setTab('giao-bai'); }} teacherId={user.id} />}

      <Note title="💡 Gợi ý sư phạm từ GITA" tone="gold">
        <ul className="mb0">
          <li>Giao mỗi tuần 1 đề tổng hợp + 1 bộ luyện chuyên đề đúng phần đang dạy.</li>
          <li>Đặt điểm sàn 8,0 cho đề cơ bản và 7,0 cho đề nâng cao; cho phép làm lại 2 lượt.</li>
          <li>Đầu buổi học sau, chữa đúng những dạng bài mà báo cáo chất lượng chỉ ra dưới 70%.</li>
        </ul>
      </Note>
    </div>
  );
};

const AssignModal: React.FC<{ onClose: () => void; onSaved: () => void; teacherId: string }> = ({ onClose, onSaved, teacherId }) => {
  const classes = getClasses();
  const [classId, setClassId] = useState(classes[0]?.id ?? '');
  const cls = classes.find((c) => c.id === classId);
  const grade = (cls?.grade ?? 6) as Grade;
  const exams = examsOfGrade(grade);
  const [examId, setExamId] = useState(exams[0]?.id ?? '');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [days, setDays] = useState(7);
  const [required, setRequired] = useState(8);
  const [maxAttempts, setMaxAttempts] = useState(2);

  const exam = exams.find((e) => e.id === examId);

  const save = () => {
    if (!exam || !cls) return;
    upsertAssignment({
      id: uid('as'), title: title || exam.title, note, classId, teacherId,
      examId: exam.id, examCode: exam.code, grade,
      assignedAt: Date.now(), dueAt: Date.now() + days * 86400000,
      requiredScore: required, maxAttempts,
    });
    onSaved();
  };

  return (
    <Modal title="Giao nhiệm vụ về nhà" onClose={onClose} wide>
      <div className="grid g2">
        <div className="field">
          <label className="label">Lớp</label>
          <select className="select" value={classId} onChange={(e) => setClassId(e.target.value)}>
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name} (lớp {c.grade})</option>)}
          </select>
        </div>
        <div className="field">
          <label className="label">Chọn đề</label>
          <select className="select" value={examId} onChange={(e) => setExamId(e.target.value)}>
            {exams.map((e) => <option key={e.id} value={e.id}>{e.code} — {e.title}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label className="label">Tiêu đề nhiệm vụ</label>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={exam?.title} />
      </div>
      <div className="field">
        <label className="label">Lời dặn của thầy cô</label>
        <textarea className="textarea" value={note} onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Làm nghiêm túc, bấm giờ. Sau khi nộp phải đọc kỹ phần lời giải chi tiết và ghi lại lỗi sai vào Sổ tay." />
      </div>
      <div className="grid g3">
        <div className="field">
          <label className="label">Hạn nộp (số ngày)</label>
          <input className="input" type="number" min={1} max={60} value={days} onChange={(e) => setDays(Number(e.target.value))} />
        </div>
        <div className="field">
          <label className="label">Điểm sàn yêu cầu</label>
          <input className="input" type="number" min={0} max={10} step={0.5} value={required} onChange={(e) => setRequired(Number(e.target.value))} />
        </div>
        <div className="field">
          <label className="label">Số lượt làm tối đa</label>
          <input className="input" type="number" min={1} max={10} value={maxAttempts} onChange={(e) => setMaxAttempts(Number(e.target.value))} />
        </div>
      </div>
      <div className="btn-group">
        <button className="btn btn-primary" onClick={save} disabled={!exam || !cls}>Giao nhiệm vụ</button>
        <button className="btn" onClick={onClose}>Huỷ</button>
      </div>
    </Modal>
  );
};
