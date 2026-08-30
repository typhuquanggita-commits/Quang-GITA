import React, { useState } from 'react';
import { Link } from '@/lib/router';
import { useAuth } from '@/lib/auth';
import { Bar, Card, M, Note } from '@/components/ui';
import { GRADES, PHASE_COLOR, PHASE_LABEL, getRoadmap, getTopic } from '@/content';
import { getProgress } from '@/lib/store';
import type { Grade } from '@/types';

export const Roadmap: React.FC = () => {
  const { user } = useAuth();
  const [grade, setGrade] = useState<Grade>(user?.grade ?? 6);
  const rm = getRoadmap(grade);
  const progress = user ? getProgress(user.id) : null;

  const doneOf = (ids: string[]) => {
    if (!progress || ids.length === 0) return null;
    const rates = ids.map((id) => progress.mastery[id]?.rate ?? 0);
    return rates.reduce((a, b) => a + b, 0) / rates.length;
  };

  return (
    <div className="wrap page">
      <div className="section-head">
        <div>
          <h1 style={{ marginBottom: 4 }}>Lộ trình học tập GITA — Toán {grade}</h1>
          <p className="muted mb0">{rm.headline}</p>
        </div>
        <div className="chip-row">
          {GRADES.map((g) => <button key={g} className={`chip${g === grade ? ' on' : ''}`} onClick={() => setGrade(g)}>Lớp {g}</button>)}
        </div>
      </div>

      <div className="grid g3 mb6">
        <Card className="rule-top"><div className="stat-k">Mục tiêu đầu ra</div><p className="mb0 mt2 bold">{rm.target}</p></Card>
        <Card className="rule-top"><div className="stat-k">Nhịp học khuyến nghị</div><p className="mb0 mt2 bold">{rm.weeklyLoad}</p></Card>
        <Card className="rule-top"><div className="stat-k">Số mốc kiểm tra</div><p className="mb0 mt2 bold">{rm.milestones.length} mốc, mỗi mốc có ngưỡng điểm để được chuyển giai đoạn</p></Card>
      </div>

      <Note title="🧱 Nguyên tắc của lộ trình GITA" tone="gold">
        <p className="mb0">
          Không chuyển mốc khi chưa đạt ngưỡng điểm. Học sinh học vượt mà nền chưa chắc sẽ mất điểm ở đúng
          phần dễ nhất — đó là lý do khiến rất nhiều em dừng lại ở mức 7–8 điểm. Hệ thống chỉ mở mốc sau
          khi kết quả luyện tập của em đạt ngưỡng.
        </p>
      </Note>

      <div className="stack mt6" style={{ gap: 'var(--sp-4)' }}>
        {rm.milestones.map((m, i) => {
          const rate = doneOf(m.topicIds);
          const passed = rate !== null && rate * 10 >= m.minScore;
          return (
            <Card key={i} style={{ borderLeft: `5px solid ${PHASE_COLOR[m.phase]}` }}>
              <div className="between mb2">
                <div className="row-wrap">
                  <span className="badge" style={{ background: PHASE_COLOR[m.phase], color: '#fff' }}>{PHASE_LABEL[m.phase]}</span>
                  <span className="badge">{m.week}</span>
                  {passed && <span className="badge badge-ok">✓ Đã đạt ngưỡng</span>}
                </div>
                <span className="badge badge-gold">Ngưỡng chuyển mốc: {m.minScore}</span>
              </div>
              <h3 style={{ marginBottom: 8 }}>{m.title}</h3>
              <div className="grid g2">
                <div>
                  <div className="label">Mục tiêu của mốc</div>
                  <ul className="small">{m.goals.map((g, j) => <li key={j}><M t={g} /></li>)}</ul>
                </div>
                <div>
                  <div className="label">Sản phẩm đầu ra (kiểm chứng được)</div>
                  <div className="note ok"><p className="mb0 small">{m.output}</p></div>
                  {m.topicIds.length > 0 && (
                    <>
                      <div className="label mt3">Chuyên đề của mốc</div>
                      <div className="chip-row">
                        {m.topicIds.map((id) => {
                          const t = getTopic(id);
                          return t ? <Link key={id} to={`/chuyen-de/${id}`} className="chip"><M t={t.name} /></Link> : null;
                        })}
                      </div>
                    </>
                  )}
                  {rate !== null && (
                    <div className="mt3">
                      <div className="between xs muted"><span>Mức thành thạo hiện tại</span><span>{Math.round(rate * 100)}%</span></div>
                      <Bar value={rate} tone={passed ? 'ok' : rate >= 0.6 ? 'warn' : 'bad'} />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
