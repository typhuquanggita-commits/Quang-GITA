import React from 'react';
import { Link, useRouter } from '@/lib/router';
import { useAuth } from '@/lib/auth';
import { Card, Empty, Note } from '@/components/ui';
import { getAssignments, getUserAttempts } from '@/lib/store';

const dt = (t: number) => new Date(t).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export const Homework: React.FC = () => {
  const { user } = useAuth();
  const { go } = useRouter();
  if (!user) { go('/dang-nhap'); return null; }

  const attempts = getUserAttempts(user.id);
  const list = getAssignments()
    .filter((a) => (user.classId ? a.classId === user.classId : a.grade === user.grade))
    .sort((a, b) => a.dueAt - b.dueAt);

  return (
    <div className="wrap page">
      <h1>Nhiệm vụ về nhà</h1>
      <p className="muted">Bài tập do thầy cô GITA giao. Làm bài trực tiếp trên hệ thống, kết quả được báo cáo tự động về lớp.</p>

      {list.length === 0 ? (
        <Empty icon="🏠" title="Chưa có nhiệm vụ nào được giao"
               hint="Khi thầy cô giao bài, nhiệm vụ sẽ xuất hiện tại đây kèm hạn nộp và điểm sàn yêu cầu."
               action={<Link to="/bo-de" className="btn btn-primary">Tự luyện đề trong lúc chờ</Link>} />
      ) : (
        <div className="stack" style={{ gap: 'var(--sp-4)' }}>
          {list.map((a) => {
            const mine = attempts.filter((x) => x.assignmentId === a.id);
            const best = mine.length ? Math.max(...mine.map((x) => x.score10)) : null;
            const passed = best !== null && best >= a.requiredScore;
            const late = Date.now() > a.dueAt;
            const canRetry = mine.length < a.maxAttempts;
            return (
              <Card key={a.id} className="rule-top">
                <div className="between">
                  <div>
                    <div className="row-wrap mb2">
                      <span className="badge badge-brand">{a.examCode}</span>
                      <span className="badge">Hạn: {dt(a.dueAt)}</span>
                      <span className="badge badge-gold">Điểm sàn: {a.requiredScore}</span>
                      <span className="badge">Tối đa {a.maxAttempts} lượt</span>
                      {passed
                        ? <span className="badge badge-ok">✓ Đã đạt</span>
                        : late ? <span className="badge badge-bad">Quá hạn</span>
                        : <span className="badge badge-vd">Chưa hoàn thành</span>}
                    </div>
                    <h3 style={{ marginBottom: 4 }}>{a.title}</h3>
                    {a.note && <p className="muted small mb0">{a.note}</p>}
                  </div>
                  <div className="tr">
                    {best !== null && (
                      <div className="mb2">
                        <div className="stat-k">Điểm cao nhất</div>
                        <div className="stat-v" style={{ fontSize: 28 }}>{best.toFixed(2)}</div>
                      </div>
                    )}
                    {(!passed && canRetry) || (passed && canRetry)
                      ? <button className="btn btn-primary" onClick={() => go(`/lam-bai/${a.examId}?nv=${a.id}`)}>
                          {mine.length ? 'Làm lại' : 'Làm bài'}
                        </button>
                      : <span className="badge badge-lock">Hết lượt làm</span>}
                  </div>
                </div>
                {mine.length > 0 && (
                  <div className="table-scroll mt4">
                    <table className="table">
                      <thead><tr><th>Lượt</th><th>Thời điểm nộp</th><th className="tc">Điểm</th><th className="tr">Chi tiết</th></tr></thead>
                      <tbody>
                        {mine.map((x, i) => (
                          <tr key={x.id}>
                            <td>#{mine.length - i}</td>
                            <td>{dt(x.submittedAt)}</td>
                            <td className="tc bold" style={{ color: x.score10 >= a.requiredScore ? 'var(--ok)' : 'var(--bad)' }}>{x.score10.toFixed(2)}</td>
                            <td className="tr"><Link to={`/ket-qua/${x.id}`}>Xem lời giải →</Link></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      <Note title="📌 Quy định nộp bài của GITA" tone="gold">
        <ul className="mb0">
          <li>Bài nộp sau hạn vẫn được chấm nhưng ghi nhận “Quá hạn” trong báo cáo lớp.</li>
          <li>Chỉ lượt làm có điểm cao nhất được tính vào kết quả cuối cùng.</li>
          <li>Sau mỗi lượt, em phải đọc kỹ phần Lời giải chi tiết và Định hướng cải thiện trước khi làm lại.</li>
        </ul>
      </Note>
    </div>
  );
};
