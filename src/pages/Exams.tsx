import React, { useMemo, useState } from 'react';
import { Link, useRouter } from '@/lib/router';
import { useAuth, lockReason } from '@/lib/auth';
import { Card, Note } from '@/components/ui';
import { EXAM_KIND_LABEL, TRACK_LABEL, examsOfGrade } from '@/lib/exams';
import { GRADES } from '@/content';
import { getUserAttempts } from '@/lib/store';
import type { ExamKind, Grade } from '@/types';

const GROUPS: { k: ExamKind | 'ALL'; label: string }[] = [
  { k: 'ALL', label: 'Tất cả' },
  { k: 'LUYEN_DE', label: 'Bộ 100 đề luyện thi' },
  { k: 'GIUA_KY', label: 'Đề cương giữa kỳ' },
  { k: 'CUOI_KY', label: 'Đề cương cuối kỳ' },
  { k: 'CA_NAM', label: 'Đề cương cả năm' },
  { k: 'ON_HE', label: 'Đề cương ôn hè' },
  { k: 'HSG', label: 'Đề thi HSG' },
];

export const Exams: React.FC = () => {
  const { route, go } = useRouter();
  const { user, perms } = useAuth();
  const [grade, setGrade] = useState<Grade>((Number(route.query.get('khoi')) || user?.grade || 6) as Grade);
  const [kind, setKind] = useState<ExamKind | 'ALL'>('ALL');
  const [page, setPage] = useState(0);
  const PER = 24;

  const attempts = user ? getUserAttempts(user.id) : [];
  const best = useMemo(() => {
    const m = new Map<string, number>();
    for (const a of attempts) m.set(a.examId, Math.max(m.get(a.examId) ?? 0, a.score10));
    return m;
  }, [attempts]);

  const all = examsOfGrade(grade);
  const list = all.filter((e) => kind === 'ALL' || e.kind === kind);
  const pages = Math.ceil(list.length / PER);
  const view = list.slice(page * PER, page * PER + PER);

  return (
    <div className="wrap page">
      <div className="section-head">
        <div>
          <h1 style={{ marginBottom: 4 }}>Ngân hàng đề — Toán {grade}</h1>
          <p className="muted mb0">
            {all.length} đề: bộ 100 đề luyện thi, đề cương giữa kỳ – cuối kỳ – cả năm – ôn hè và đề thi học sinh giỏi.
            Mỗi mã đề có bộ câu hỏi riêng, chấm điểm tự động và lời giải chi tiết ngay sau khi nộp.
          </p>
        </div>
      </div>

      <Card className="tight mb4">
        <div className="row-wrap">
          <span className="label" style={{ margin: 0 }}>Khối:</span>
          <div className="chip-row">
            {GRADES.map((g) => (
              <button key={g} className={`chip${g === grade ? ' on' : ''}`} onClick={() => { setGrade(g); setPage(0); }}>Lớp {g}</button>
            ))}
          </div>
          <span className="spacer" />
          <div className="chip-row">
            {GROUPS.map((g) => (
              <button key={g.k} className={`chip${kind === g.k ? ' on' : ''}`} onClick={() => { setKind(g.k); setPage(0); }}>{g.label}</button>
            ))}
          </div>
        </div>
      </Card>

      {!perms.isPaid && (
        <Note title="🔓 Học sinh ngoài được mở 3 đề đầu tiên mỗi khối" tone="gold">
          <p className="mb0">{lockReason(perms)} Toàn bộ đề cương, đề HSG và 97 đề còn lại dành cho học sinh đang học tại GITA.</p>
        </Note>
      )}

      <div className="grid g3 mt4">
        {view.map((e) => {
          const locked = e.premium && !perms.isPaid;
          const b = best.get(e.id);
          return (
            <Card key={e.id} className={`card-hover tight${locked ? ' lock-overlay' : ''}`}>
              <div className="row-wrap mb2">
                <span className="badge badge-brand">{e.code}</span>
                <span className={`badge ${e.track === 'CHUYEN_CLC' ? 'badge-vdc' : e.track === 'NANG_CAO' ? 'badge-vd' : e.track === 'HSG' ? 'badge-gold' : 'badge-nb'}`}>
                  {TRACK_LABEL[e.track]}
                </span>
                {locked && <span className="badge badge-lock">🔒</span>}
              </div>
              <div className="bold" style={{ minHeight: 44 }}>{e.title}</div>
              <div className="faint mb3">
                {EXAM_KIND_LABEL[e.kind]} · {e.minutes} phút · {e.blueprint.reduce((s, r) => s + r.count, 0)} câu · {e.totalPoints} điểm
              </div>
              {b !== undefined && (
                <div className="row-wrap mb2">
                  <span className={`badge ${b >= 9 ? 'badge-gold' : b >= 8 ? 'badge-ok' : 'badge-vd'}`}>Điểm cao nhất: {b.toFixed(2)}</span>
                </div>
              )}
              {locked ? (
                <Link to="/bang-gia" className="btn btn-outline btn-block" style={{ position: 'relative', zIndex: 2 }}>Mở khoá với gói GITA</Link>
              ) : (
                <button className="btn btn-primary btn-block" onClick={() => go(`/lam-bai/${e.id}`)}>
                  {b !== undefined ? 'Làm lại' : 'Vào làm bài'}
                </button>
              )}
            </Card>
          );
        })}
      </div>

      {pages > 1 && (
        <div className="row-wrap mt6" style={{ justifyContent: 'center' }}>
          <button className="btn btn-sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>← Trước</button>
          <span className="muted small">Trang {page + 1}/{pages}</span>
          <button className="btn btn-sm" disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)}>Sau →</button>
        </div>
      )}
    </div>
  );
};
