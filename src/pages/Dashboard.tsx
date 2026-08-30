import React from 'react';
import { Link, useRouter } from '@/lib/router';
import { useAuth, ROLE_LABEL } from '@/lib/auth';
import { Bar, Card, Empty, M, Note, Stat } from '@/components/ui';
import { getAssignments, getProgress, getUserAttempts } from '@/lib/store';
import { getRoadmap, getTopic, topicsOfGrade } from '@/content';
import { BAND_LABEL } from '@/lib/grading';

const dateVN = (t: number) => new Date(t).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

export const Dashboard: React.FC = () => {
  const { user, perms } = useAuth();
  const { go } = useRouter();
  if (!user) { go('/dang-nhap'); return null; }

  const attempts = getUserAttempts(user.id);
  const progress = getProgress(user.id);
  const topics = topicsOfGrade(user.grade);
  const rm = getRoadmap(user.grade);

  const avg = attempts.length ? attempts.reduce((s, a) => s + a.score10, 0) / attempts.length : 0;
  const last5 = attempts.slice(0, 5);
  const bestScore = attempts.reduce((m, a) => Math.max(m, a.score10), 0);

  const weak = topics
    .map((t) => ({ t, m: progress.mastery[t.id] }))
    .filter((x) => x.m && x.m.rate < 0.75)
    .sort((a, b) => (a.m!.rate - b.m!.rate))
    .slice(0, 4);

  const myAssignments = getAssignments()
    .filter((a) => a.classId === user.classId && a.grade === user.grade)
    .sort((a, b) => a.dueAt - b.dueAt);
  const pending = myAssignments.filter((a) => !attempts.some((x) => x.assignmentId === a.id && x.score10 >= a.requiredScore));

  return (
    <div className="wrap page">
      <Card className="rule-top mb6">
        <div className="between">
          <div>
            <div className="row-wrap mb2">
              <span className="badge badge-brand">{ROLE_LABEL[user.role]}</span>
              <span className="badge">Lớp {user.grade}</span>
              {perms.isPaid && <span className="badge badge-gold">Gói GITA · hạn {user.paidUntil ? dateVN(user.paidUntil) : '—'}</span>}
            </div>
            <h1 style={{ marginBottom: 4 }}>Chào {user.name.split(' ').slice(-1)[0]} 👋</h1>
            <p className="muted mb0">{rm.headline}</p>
          </div>
          <div className="btn-group">
            <Link to="/chuyen-de" className="btn btn-primary">Học chuyên đề</Link>
            <Link to="/luyen-tap" className="btn">Luyện tập</Link>
            <Link to="/bo-de" className="btn btn-accent">Luyện đề</Link>
            <Link to="/so-tay" className="btn btn-outline">📓 Sổ tay lỗi sai</Link>
          </div>
        </div>
      </Card>

      <div className="grid g4 mb6">
        <Stat k="Bài đã làm" v={attempts.length} sub={`${progress.totalMinutes} phút luyện tập`} />
        <Stat k="Điểm trung bình" v={avg ? avg.toFixed(2) : '—'} tone={avg >= 9 ? 'gold' : avg >= 8 ? 'ok' : ''} sub={attempts.length ? BAND_LABEL[attempts[0].review.band] : 'Chưa có dữ liệu'} />
        <Stat k="Điểm cao nhất" v={bestScore ? bestScore.toFixed(2) : '—'} tone="gold" />
        <Stat k="Chuỗi ngày học" v={`${progress.streakDays} ngày`} tone="ok" sub="Giữ đều mỗi ngày để tiến bộ nhanh" />
      </div>

      {pending.length > 0 && (
        <Note title={`📌 Em có ${pending.length} nhiệm vụ về nhà chưa hoàn thành`} tone="bad">
          <div className="stack" style={{ gap: 8 }}>
            {pending.slice(0, 3).map((a) => (
              <div key={a.id} className="between">
                <span><strong>{a.title}</strong> — hạn {dateVN(a.dueAt)} · yêu cầu ≥ {a.requiredScore} điểm</span>
                <button className="btn btn-sm btn-primary" onClick={() => go(`/lam-bai/${a.examId}?nv=${a.id}`)}>Làm ngay</button>
              </div>
            ))}
          </div>
          <div className="mt3"><Link to="/nhiem-vu" className="btn btn-sm btn-outline">Xem tất cả nhiệm vụ →</Link></div>
        </Note>
      )}

      <div className="grid g2 mb6">
        <Card>
          <div className="section-head"><h3 style={{ margin: 0 }}>Kết quả gần đây</h3><Link to="/bao-cao" className="small">Xem báo cáo đầy đủ →</Link></div>
          {last5.length === 0 ? (
            <Empty icon="📝" title="Em chưa làm bài nào" hint="Bắt đầu bằng một đề luyện tập theo chuyên đề để hệ thống đánh giá năng lực hiện tại."
                   action={<Link to="/bo-de" className="btn btn-primary">Chọn đề đầu tiên</Link>} />
          ) : (
            <div className="table-scroll">
              <table className="table">
                <thead><tr><th>Đề</th><th>Ngày</th><th className="tr">Điểm</th></tr></thead>
                <tbody>
                  {last5.map((a) => (
                    <tr key={a.id} style={{ cursor: 'pointer' }} onClick={() => go(`/ket-qua/${a.id}`)}>
                      <td><strong>{a.examCode}</strong><div className="faint">{a.examTitle}</div></td>
                      <td className="small">{dateVN(a.submittedAt)}</td>
                      <td className="tr bold" style={{ color: a.score10 >= 9 ? 'var(--gita-gold-600)' : a.score10 >= 8 ? 'var(--ok)' : a.score10 >= 6.5 ? 'var(--brand)' : 'var(--bad)' }}>
                        {a.score10.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card>
          <div className="section-head"><h3 style={{ margin: 0 }}>Chuyên đề cần ưu tiên ôn</h3></div>
          {weak.length === 0 ? (
            <Empty icon="✅" title="Chưa phát hiện lỗ hổng" hint="Hãy làm thêm bài để hệ thống có đủ dữ liệu phân tích năng lực của em." />
          ) : (
            <div className="stack" style={{ gap: 'var(--sp-3)' }}>
              {weak.map(({ t, m }) => (
                <div key={t.id}>
                  <div className="between small">
                    <Link to={`/chuyen-de/${t.id}`} className="bold"><M t={t.name} /></Link>
                    <span className="muted">{Math.round(m!.rate * 100)}%</span>
                  </div>
                  <Bar value={m!.rate} tone={m!.rate >= 0.6 ? 'warn' : 'bad'} />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card className="rule-top">
        <div className="section-head">
          <h3 style={{ margin: 0 }}>Mốc tiếp theo trong lộ trình</h3>
          <Link to="/lo-trinh" className="btn btn-sm btn-outline">Xem toàn bộ lộ trình →</Link>
        </div>
        {(() => {
          const next = rm.milestones.find((m) => {
            if (!m.topicIds.length) return false;
            const rates = m.topicIds.map((id) => progress.mastery[id]?.rate ?? 0);
            return rates.reduce((a, b) => a + b, 0) / rates.length * 10 < m.minScore;
          }) ?? rm.milestones[rm.milestones.length - 1];
          return (
            <div>
              <div className="row-wrap mb2">
                <span className="badge badge-brand">{next.week}</span>
                <span className="badge badge-gold">Ngưỡng: {next.minScore}</span>
              </div>
              <h4>{next.title}</h4>
              <ul className="small">{next.goals.map((g, i) => <li key={i}>{g}</li>)}</ul>
              <div className="chip-row mt3">
                {next.topicIds.map((id) => {
                  const t = getTopic(id);
                  return t ? <Link key={id} to={`/chuyen-de/${id}`} className="chip"><M t={t.name} /></Link> : null;
                })}
              </div>
            </div>
          );
        })()}
      </Card>
    </div>
  );
};
