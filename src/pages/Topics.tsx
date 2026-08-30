import React, { useMemo, useState } from 'react';
import { Link, useRouter } from '@/lib/router';
import { useAuth } from '@/lib/auth';
import { Card, LevelBadge, M } from '@/components/ui';
import { GRADES, STRAND_LABEL, TERM_LABEL, topicsOfGrade } from '@/content';
import { getProgress } from '@/lib/store';
import type { Grade, Term } from '@/types';

export const Topics: React.FC = () => {
  const { route } = useRouter();
  const { user } = useAuth();
  const initial = (Number(route.query.get('khoi')) || user?.grade || 6) as Grade;
  const [grade, setGrade] = useState<Grade>(initial);
  const [term, setTerm] = useState<Term | 'ALL'>('ALL');
  const [q, setQ] = useState('');

  const progress = user ? getProgress(user.id) : null;
  const topics = useMemo(() => {
    const list = topicsOfGrade(grade);
    return list.filter((t) => (term === 'ALL' || t.term === term) &&
      (!q || (t.name + t.summary).toLowerCase().includes(q.toLowerCase())));
  }, [grade, term, q]);

  return (
    <div className="wrap page">
      <div className="section-head">
        <div>
          <h1 style={{ marginBottom: 4 }}>Thư viện chuyên đề Toán {grade}</h1>
          <p className="muted mb0">Mỗi chuyên đề gồm 6 lớp học liệu: Lý thuyết · Sơ đồ đọc vị · Dạng bài · Kỹ năng &amp; phương pháp · Sơ đồ tư duy · Luyện tập chấm điểm.</p>
        </div>
      </div>

      <Card className="tight mb6">
        <div className="row-wrap">
          <span className="label" style={{ margin: 0 }}>Khối:</span>
          <div className="chip-row">
            {GRADES.map((g) => (
              <button key={g} className={`chip${g === grade ? ' on' : ''}`} onClick={() => setGrade(g)}>Lớp {g}</button>
            ))}
          </div>
          <span className="spacer" />
          <div className="chip-row">
            {(['ALL', 'HK1', 'HK2'] as const).map((t) => (
              <button key={t} className={`chip${t === term ? ' on' : ''}`} onClick={() => setTerm(t)}>
                {t === 'ALL' ? 'Cả năm' : TERM_LABEL[t]}
              </button>
            ))}
          </div>
          <input className="input" style={{ maxWidth: 240 }} placeholder="Tìm chuyên đề…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </Card>

      <div className="grid g2">
        {topics.map((t) => {
          const m = progress?.mastery[t.id];
          const studied = progress?.studiedTopics.includes(t.id);
          return (
            <Link key={t.id} to={`/chuyen-de/${t.id}`} className="card card-hover rule-top" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div className="row-wrap mb2">
                <span className="badge badge-brand">Chuyên đề {t.order}</span>
                <span className="badge">{TERM_LABEL[t.term]}</span>
                <span className="badge">{STRAND_LABEL[t.strand]}</span>
                {studied && <span className="badge badge-ok">Đã học</span>}
              </div>
              <h3 style={{ marginBottom: 6 }}><M t={t.name} /></h3>
              <p className="muted small"><M t={t.summary} /></p>
              <div className="row-wrap mt3">
                {t.types.slice(0, 4).map((d) => <LevelBadge key={d.id} level={d.level} short />)}
                <span className="faint">{t.types.length} dạng bài · {t.decode.length} quy tắc đọc vị</span>
              </div>
              {m && (
                <div className="mt3">
                  <div className="between xs muted"><span>Mức độ thành thạo</span><span>{Math.round(m.rate * 100)}%</span></div>
                  <div className="bar mt1"><i className={m.rate >= 0.85 ? 'ok' : m.rate >= 0.6 ? 'warn' : 'bad'} style={{ width: `${m.rate * 100}%` }} /></div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
      {topics.length === 0 && <Card className="tc"><M t="Không tìm thấy chuyên đề phù hợp." /></Card>}
    </div>
  );
};
