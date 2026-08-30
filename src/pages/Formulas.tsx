import React, { useMemo, useState } from 'react';
import { useAuth, lockReason } from '@/lib/auth';
import { Card, LockedBox, M, Note } from '@/components/ui';
import { FORMULAS, GRADES, STRAND_LABEL } from '@/content';
import type { Grade } from '@/types';

export const Formulas: React.FC = () => {
  const { user, perms } = useAuth();
  const [grade, setGrade] = useState<Grade>(user?.grade ?? 6);
  const [q, setQ] = useState('');

  const list = useMemo(
    () => FORMULAS.filter((f) => f.grade === grade &&
      (!q || (f.name + f.topic + f.usage).toLowerCase().includes(q.toLowerCase()))),
    [grade, q]
  );
  const free = list.slice(0, 4);
  const rest = list.slice(4);

  return (
    <div className="wrap page">
      <div className="section-head">
        <div>
          <h1 style={{ marginBottom: 4 }}>Cẩm nang công thức điểm 10</h1>
          <p className="muted mb0">Mỗi thẻ gồm bốn phần: <strong>công thức — điều kiện áp dụng — dùng khi nào — bẫy thường gặp</strong>. Học công thức kèm bẫy mới là học đủ.</p>
        </div>
        <button className="btn btn-outline btn-sm no-print" onClick={() => window.print()}>🖨 In cẩm nang</button>
      </div>

      <Card className="tight mb6 no-print">
        <div className="row-wrap">
          <span className="label" style={{ margin: 0 }}>Khối:</span>
          <div className="chip-row">
            {GRADES.map((g) => <button key={g} className={`chip${g === grade ? ' on' : ''}`} onClick={() => setGrade(g)}>Lớp {g}</button>)}
          </div>
          <span className="spacer" />
          <input className="input" style={{ maxWidth: 260 }} placeholder="Tìm công thức…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </Card>

      <div className="grid g2">
        {(perms.canFullFormula ? list : free).map((f) => (
          <Card key={f.id} className="rule-top">
            <div className="row-wrap mb2">
              <span className="badge badge-brand">{f.topic}</span>
              <span className="badge">{STRAND_LABEL[f.strand]}</span>
            </div>
            <div className="card-title">{f.name}</div>
            <div className="note gold">
              <div className="mq-blk" style={{ fontSize: '1.15em' }}><M t={f.formula} /></div>
            </div>
            {f.condition && <p className="small"><strong>Điều kiện:</strong> <M t={f.condition} /></p>}
            <p className="small"><strong>Dùng khi:</strong> <M t={f.usage} /></p>
            {f.trap && <div className="note bad"><p className="mb0 small"><strong>⚠ Bẫy:</strong> <M t={f.trap} /></p></div>}
          </Card>
        ))}
      </div>

      {!perms.canFullFormula && rest.length > 0 && (
        <div className="mt6">
          <LockedBox reason={lockReason(perms)}>
            <p className="small muted mt3">Còn <strong>{rest.length} công thức trọng tâm</strong> của khối {grade} trong cẩm nang đầy đủ.</p>
          </LockedBox>
        </div>
      )}

      <Note title="💡 Cách dùng cẩm nang hiệu quả" tone="gold">
        <ol className="mb0">
          <li>Mỗi ngày học thuộc 3 thẻ, đọc kỹ phần “bẫy” trước khi học phần “công thức”.</li>
          <li>Che phần công thức, đọc phần “dùng khi” và tự viết lại công thức ra nháp.</li>
          <li>Sau mỗi bài kiểm tra, đánh dấu những thẻ liên quan tới câu bị sai và học lại.</li>
        </ol>
      </Note>
    </div>
  );
};
