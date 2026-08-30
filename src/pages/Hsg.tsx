import React, { useState } from 'react';
import { useAuth, lockReason } from '@/lib/auth';
import { Bullets, Card, LockedBox, M, MindMapView, Note, Steps } from '@/components/ui';
import { GRADES, HSG_TOPICS } from '@/content';
import { Link } from '@/lib/router';
import type { Grade } from '@/types';

export const Hsg: React.FC = () => {
  const { user, perms } = useAuth();
  const [grade, setGrade] = useState<Grade>(user?.grade ?? 6);
  const topics = HSG_TOPICS.filter((t) => t.grade === grade);

  return (
    <div className="wrap page">
      <div className="section-head">
        <div>
          <h1 style={{ marginBottom: 4 }}>Chuyên đề bồi dưỡng Học sinh giỏi</h1>
          <p className="muted mb0">Không phải “làm nhiều bài khó”, mà là nắm được <strong>kỹ thuật lõi</strong> — thứ lặp lại trong hầu hết đề HSG các năm.</p>
        </div>
        <div className="chip-row">
          {GRADES.map((g) => <button key={g} className={`chip${g === grade ? ' on' : ''}`} onClick={() => setGrade(g)}>Lớp {g}</button>)}
        </div>
      </div>

      {!perms.canHSG ? (
        <LockedBox reason={lockReason(perms)}>
          <p className="small muted mt3">Chuyên đề HSG gồm các kỹ thuật lõi (Dirichlet, tổ hợp tuyến tính, Cô-si, phương tích, hệ thức độc lập tham số…) kèm ví dụ mẫu có phân tích tư duy.</p>
        </LockedBox>
      ) : (
        <div className="stack" style={{ gap: 'var(--sp-6)' }}>
          {topics.map((t) => (
            <Card key={t.id} className="rule-top">
              <span className="ribbon">HSG · Lớp {t.grade}</span>
              <h2 className="mt3">{t.name}</h2>
              <p className="muted">{t.summary}</p>

              <h4 className="mt6">Kỹ thuật lõi</h4>
              <div className="grid g2">
                {t.techniques.map((k, i) => (
                  <div key={i} className="mm-branch">
                    <h5>{k.title}</h5>
                    <ul className="small">{k.detail.map((d, j) => <li key={j}><M t={d} /></li>)}</ul>
                  </div>
                ))}
              </div>

              <h4 className="mt6">Sơ đồ tư duy chuyên đề</h4>
              <MindMapView map={t.mindmap} />

              <h4 className="mt6">Bài mẫu có phân tích tư duy</h4>
              {t.examples.map((e, i) => (
                <div key={i} className="mt4">
                  <div className="q-stem bold"><M t={e.prompt} /></div>
                  <Note title="🧠 Phân tích tư duy" tone="violet"><Bullets items={e.thinking} /></Note>
                  <div className="sol"><h5>Lời giải</h5><Steps items={e.solution} /></div>
                  {e.remark && <Note title="💡 Nhận xét" tone="gold"><p className="mb0"><M t={e.remark} /></p></Note>}
                </div>
              ))}

              <div className="mt6">
                <Link to={`/bo-de?khoi=${grade}`} className="btn btn-primary">Làm đề thi HSG khối {grade} →</Link>
              </div>
            </Card>
          ))}
          {topics.length === 0 && <Card className="tc">Chuyên đề HSG khối này đang được biên soạn bổ sung.</Card>}
        </div>
      )}
    </div>
  );
};
