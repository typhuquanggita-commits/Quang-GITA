import React, { useMemo, useState } from 'react';
import { Link, useRouter } from '@/lib/router';
import { Bar, Bullets, Card, Note, Stat, M } from '@/components/ui';
import { QuestionCard } from '@/components/QuestionCard';
import { getAttempt } from '@/lib/store';
import { findExam, generateExam } from '@/lib/exams';
import { BAND_COLOR, BAND_LABEL } from '@/lib/grading';
import { LEVEL_LABEL } from '@/lib/analytics';
import { getTopic } from '@/content';
import type { Level } from '@/types';

export const Result: React.FC<{ attemptId: string }> = ({ attemptId }) => {
  const attempt = getAttempt(attemptId);
  const { go } = useRouter();
  const spec = attempt ? findExam(attempt.examId) : undefined;
  const questions = useMemo(() => (spec ? generateExam(spec) : []), [spec]);
  const [filter, setFilter] = useState<'all' | 'wrong'>('all');

  if (!attempt) return <div className="wrap page"><Card>Không tìm thấy bài làm.</Card></div>;
  const rv = attempt.review;
  const byId = new Map(attempt.results.map((r) => [r.questionId, r]));
  const shown = questions.filter((q) => (filter === 'all' ? true : !byId.get(q.id)?.correct));

  return (
    <div className="wrap page">
      <Card className="rule-top mb6">
        <div className="between">
          <div>
            <div className="row-wrap">
              <span className="badge badge-brand">{attempt.examCode}</span>
              <span className="badge">Toán {attempt.grade}</span>
              <span className="badge">{Math.round(attempt.durationSec / 60)} phút</span>
            </div>
            <h1 className="mt2 mb0">{attempt.examTitle}</h1>
          </div>
          <div className="tc">
            <div className="stat-k">Điểm số</div>
            <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1, color: BAND_COLOR[rv.band] }}>
              {attempt.score10.toFixed(2)}
            </div>
            <div className="badge" style={{ background: BAND_COLOR[rv.band], color: '#fff' }}>{BAND_LABEL[rv.band]}</div>
          </div>
        </div>
        <Note title="📋 Nhận xét tổng quan" tone={rv.band === 'XUAT_SAC' || rv.band === 'GIOI' ? 'ok' : rv.band === 'YEU' ? 'bad' : 'gold'}>
          <p className="mb0">{rv.headline}</p>
        </Note>
      </Card>

      <div className="grid g4 mb6">
        <Stat k="Điểm đạt được" v={`${attempt.earned}/${attempt.total}`} sub="Theo thang điểm của đề" />
        <Stat k="Số câu đúng" v={`${attempt.results.filter((r) => r.correct).length}/${attempt.results.length}`} tone="ok" />
        <Stat k="Khoảng cách tới 9+" v={rv.gapTo9 === 0 ? 'Đã đạt' : `${rv.gapTo9}`} tone="gold" sub={rv.gapTo9 === 0 ? 'Giữ vững phong độ' : 'điểm nữa là chạm mục tiêu'} />
        <Stat k="Nhịp độ" v={`${Math.round(attempt.durationSec / 60)}′`} sub={`Giới hạn ${spec?.minutes ?? '—'} phút`} />
      </div>

      <div className="grid g2 mb6">
        <Card>
          <h3>Kết quả theo mức độ nhận thức</h3>
          <p className="faint">Ma trận 4 mức của Bộ GD&amp;ĐT. Ngưỡng an toàn để đạt 9+ là ≥ 90% ở NB–TH và ≥ 70% ở VD.</p>
          {rv.byLevel.map((l) => (
            <div key={l.key} className="mb3">
              <div className="between small">
                <span className="bold">{LEVEL_LABEL[l.key as Level]}</span>
                <span className="muted">{l.correct}/{l.total} — {Math.round(l.rate * 100)}%</span>
              </div>
              <Bar value={l.rate} tone={l.rate >= 0.85 ? 'ok' : l.rate >= 0.6 ? 'warn' : 'bad'} />
            </div>
          ))}
        </Card>
        <Card>
          <h3>Kết quả theo chuyên đề</h3>
          <p className="faint">Sắp xếp từ yếu nhất — đây là thứ tự nên ôn lại.</p>
          {rv.byTopic.slice(0, 6).map((t) => (
            <div key={t.key} className="mb3">
              <div className="between small">
                <Link to={`/chuyen-de/${t.key}`} className="bold"><M t={t.label} /></Link>
                <span className="muted">{Math.round(t.rate * 100)}%</span>
              </div>
              <Bar value={t.rate} tone={t.rate >= 0.85 ? 'ok' : t.rate >= 0.6 ? 'warn' : 'bad'} />
            </div>
          ))}
        </Card>
      </div>

      <div className="grid g2 mb6">
        <Card>
          <h3 style={{ color: 'var(--ok)' }}>✔ Điểm mạnh</h3>
          <Bullets items={rv.strengths} />
        </Card>
        <Card>
          <h3 style={{ color: 'var(--bad)' }}>✖ Lỗ hổng cần vá</h3>
          <Bullets items={rv.weaknesses} />
        </Card>
      </div>

      <Card className="rule-top mb6">
        <h2>🧭 Định hướng giải pháp cải thiện</h2>
        <p className="muted">Kế hoạch được xếp theo thứ tự ưu tiên. Làm dứt điểm việc số 1 trước khi chuyển sang việc tiếp theo — đó là cách tiến bộ nhanh nhất.</p>
        <Note title="⏱ Nhịp độ làm bài" tone="gold"><p className="mb0">{rv.paceNote}</p></Note>
        <div className="stack mt4" style={{ gap: 'var(--sp-4)' }}>
          {rv.plan.map((s, i) => (
            <div key={i} className="mm-branch">
              <div className="row-wrap mb2">
                <span className={`badge ${s.priority === 1 ? 'badge-bad' : s.priority === 2 ? 'badge-vd' : 'badge-th'}`}>
                  Ưu tiên {s.priority}
                </span>
                <h4 style={{ margin: 0 }}>{s.title}</h4>
              </div>
              <p className="muted small"><strong>Vì sao:</strong> {s.why}</p>
              <ol>{s.actions.map((a, j) => <li key={j}><M t={a} /></li>)}</ol>
              {s.topicId && getTopic(s.topicId) && (
                <Link to={`/chuyen-de/${s.topicId}`} className="btn btn-sm btn-outline">Mở chuyên đề {getTopic(s.topicId)!.name} →</Link>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="section-head">
        <h2>Lời giải chi tiết từng câu</h2>
        <div className="chip-row no-print">
          <button className={`chip${filter === 'all' ? ' on' : ''}`} onClick={() => setFilter('all')}>Tất cả ({questions.length})</button>
          <button className={`chip${filter === 'wrong' ? ' on' : ''}`} onClick={() => setFilter('wrong')}>
            Câu chưa đúng ({attempt.results.filter((r) => !r.correct).length})
          </button>
          <button className="chip" onClick={() => window.print()}>🖨 In bài chữa</button>
        </div>
      </div>

      {shown.map((q) => (
        <QuestionCard key={q.id} q={q} index={questions.indexOf(q)}
                      value={byId.get(q.id)?.given ?? null} onChange={() => { }} reveal readOnly />
      ))}

      <div className="btn-group mt6 no-print">
        <button className="btn btn-primary" onClick={() => go(`/lam-bai/${attempt.examId}`)}>Làm lại đề này</button>
        <Link to={`/bo-de?khoi=${attempt.grade}`} className="btn btn-outline">Chọn đề khác</Link>
        <Link to="/bao-cao" className="btn">Xem báo cáo tiến bộ</Link>
      </div>
    </div>
  );
};
