import React, { useMemo } from 'react';
import { Link, useRouter } from '@/lib/router';
import { useAuth } from '@/lib/auth';
import { Bar, Card, Empty, M, Note, Stat } from '@/components/ui';
import { getProgress, getUserAttempts } from '@/lib/store';
import { topicsOfGrade } from '@/content';
import { LEVEL_LABEL, LEVEL_ORDER } from '@/lib/analytics';
import { BAND_COLOR, BAND_LABEL } from '@/lib/grading';
import type { Level } from '@/types';

const dateVN = (t: number) => new Date(t).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });

export const Reports: React.FC = () => {
  const { user } = useAuth();
  const { go } = useRouter();
  if (!user) { go('/dang-nhap'); return null; }

  const attempts = getUserAttempts(user.id);
  const progress = getProgress(user.id);
  const topics = topicsOfGrade(user.grade);

  const byLevel = useMemo(() => {
    const acc: Record<string, { c: number; t: number }> = {};
    for (const a of attempts) for (const r of a.results) {
      acc[r.level] = acc[r.level] ?? { c: 0, t: 0 };
      acc[r.level].c += r.partial; acc[r.level].t += 1;
    }
    return LEVEL_ORDER.map((l) => ({ l, ...(acc[l] ?? { c: 0, t: 0 }) }));
  }, [attempts]);

  const byTag = useMemo(() => {
    const acc = new Map<string, { c: number; t: number }>();
    for (const a of attempts) for (const r of a.results) {
      const cur = acc.get(r.tag) ?? { c: 0, t: 0 };
      cur.c += r.partial; cur.t += 1; acc.set(r.tag, cur);
    }
    return Array.from(acc.entries()).map(([k, v]) => ({ tag: k, rate: v.t ? v.c / v.t : 0, total: v.t }))
      .sort((a, b) => a.rate - b.rate);
  }, [attempts]);

  if (attempts.length === 0) {
    return (
      <div className="wrap page">
        <h1>Báo cáo học tập</h1>
        <Empty icon="📊" title="Chưa có dữ liệu để phân tích"
               hint="Hệ thống cần ít nhất một bài làm để đánh giá năng lực và đề xuất lộ trình cải thiện."
               action={<Link to="/bo-de" className="btn btn-primary">Làm bài đầu tiên</Link>} />
      </div>
    );
  }

  const avg = attempts.reduce((s, a) => s + a.score10, 0) / attempts.length;
  const recent = attempts.slice(0, 10).reverse();
  const trend = recent.length >= 2 ? recent[recent.length - 1].score10 - recent[0].score10 : 0;
  const latest = attempts[0];

  return (
    <div className="wrap page">
      <div className="section-head">
        <div>
          <h1 style={{ marginBottom: 4 }}>Báo cáo học tập — {user.name}</h1>
          <p className="muted mb0">Toán {user.grade} · {attempts.length} bài đã làm · {progress.totalMinutes} phút luyện tập</p>
        </div>
        <button className="btn btn-outline btn-sm no-print" onClick={() => window.print()}>🖨 In báo cáo gửi phụ huynh</button>
      </div>

      <div className="grid g4 mb6">
        <Stat k="Điểm trung bình" v={avg.toFixed(2)} tone={avg >= 9 ? 'gold' : avg >= 8 ? 'ok' : ''} />
        <Stat k="Xu hướng" v={`${trend >= 0 ? '+' : ''}${trend.toFixed(2)}`} tone={trend >= 0 ? 'ok' : 'bad'} sub="So với bài gần nhất trước đó" />
        <Stat k="Xếp loại hiện tại" v={BAND_LABEL[latest.review.band]} tone={latest.score10 >= 8 ? 'ok' : ''} />
        <Stat k="Chuỗi ngày học" v={`${progress.streakDays}`} tone="gold" sub="ngày liên tiếp" />
      </div>

      <Card className="mb6">
        <h3>Biểu đồ tiến bộ — 10 bài gần nhất</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 190, padding: '12px 0', borderBottom: '2px solid var(--border)' }}>
          {recent.map((a) => (
            <div key={a.id} style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }} onClick={() => go(`/ket-qua/${a.id}`)} title={`${a.examCode} — ${a.score10.toFixed(2)}`}>
              <div className="xs bold" style={{ color: BAND_COLOR[a.review.band] }}>{a.score10.toFixed(1)}</div>
              <div style={{
                height: `${(a.score10 / 10) * 140}px`, background: BAND_COLOR[a.review.band],
                borderRadius: '5px 5px 0 0', minHeight: 4, transition: 'height .4s',
              }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {recent.map((a) => <div key={a.id} className="xs muted" style={{ flex: 1, textAlign: 'center' }}>{dateVN(a.submittedAt)}</div>)}
        </div>
        <div className="row-wrap mt3 faint">
          <span>Mốc mục tiêu GITA: <strong style={{ color: 'var(--gita-gold-600)' }}>9,0 điểm</strong></span>
          <span>· Ngưỡng an toàn: 8,0</span>
        </div>
      </Card>

      <div className="grid g2 mb6">
        <Card>
          <h3>Năng lực theo mức độ nhận thức</h3>
          {byLevel.map((l) => (
            <div key={l.l} className="mb3">
              <div className="between small">
                <span className="bold">{LEVEL_LABEL[l.l as Level]}</span>
                <span className="muted">{l.t ? `${Math.round((l.c / l.t) * 100)}% · ${l.t} câu` : 'chưa có dữ liệu'}</span>
              </div>
              <Bar value={l.t ? l.c / l.t : 0} tone={l.t && l.c / l.t >= 0.85 ? 'ok' : l.t && l.c / l.t >= 0.6 ? 'warn' : 'bad'} />
            </div>
          ))}
          <Note title="🎯 Ngưỡng để đạt 9+" tone="gold">
            <p className="mb0 small">Nhận biết ≥ 95% · Thông hiểu ≥ 90% · Vận dụng ≥ 75% · Vận dụng cao ≥ 50%.</p>
          </Note>
        </Card>

        <Card>
          <h3>Mức thành thạo theo chuyên đề</h3>
          <div className="stack" style={{ gap: 'var(--sp-3)', maxHeight: 420, overflowY: 'auto' }}>
            {topics.map((t) => {
              const m = progress.mastery[t.id];
              return (
                <div key={t.id}>
                  <div className="between small">
                    <Link to={`/chuyen-de/${t.id}`}><M t={t.name} /></Link>
                    <span className="muted">{m ? `${Math.round(m.rate * 100)}%` : '—'}</span>
                  </div>
                  <Bar value={m?.rate ?? 0} tone={!m ? '' : m.rate >= 0.85 ? 'ok' : m.rate >= 0.6 ? 'warn' : 'bad'} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="rule-top mb6">
        <h3>Bảng dạng bài — xếp từ yếu nhất</h3>
        <p className="faint">Đây chính là danh sách việc cần làm của em. Mỗi dòng đỏ là một khoản điểm đang bị mất đều đặn.</p>
        <div className="table-scroll">
          <table className="table">
            <thead><tr><th>Dạng bài</th><th className="tc">Số câu</th><th className="tc">Tỉ lệ đúng</th><th>Đánh giá</th></tr></thead>
            <tbody>
              {byTag.slice(0, 15).map((x) => (
                <tr key={x.tag}>
                  <td>{x.tag}</td>
                  <td className="tc">{x.total}</td>
                  <td className="tc bold">{Math.round(x.rate * 100)}%</td>
                  <td style={{ width: 200 }}>
                    <Bar value={x.rate} tone={x.rate >= 0.85 ? 'ok' : x.rate >= 0.6 ? 'warn' : 'bad'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="rule-top">
        <h3>Định hướng cải thiện mới nhất</h3>
        <p className="muted small">Trích từ bài <strong>{latest.examCode}</strong> ngày {new Date(latest.submittedAt).toLocaleDateString('vi-VN')}.</p>
        {latest.review.plan.map((s, i) => (
          <div key={i} className="mm-branch mb3">
            <div className="row-wrap mb2">
              <span className={`badge ${s.priority === 1 ? 'badge-bad' : s.priority === 2 ? 'badge-vd' : 'badge-th'}`}>Ưu tiên {s.priority}</span>
              <strong>{s.title}</strong>
            </div>
            <ul className="small mb0">{s.actions.map((a, j) => <li key={j}>{a}</li>)}</ul>
          </div>
        ))}
      </Card>
    </div>
  );
};
