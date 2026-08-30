import React, { useState } from 'react';
import { Link, useRouter } from '@/lib/router';
import { useAuth } from '@/lib/auth';
import { Card, M, Note, Stat } from '@/components/ui';
import { GITA_SLOGAN, GRADES, TERM_LABEL, chaptersOfGrade, getTopic } from '@/content';
import type { Grade } from '@/types';

/* =====================================================================
   GIÁO ÁN THEO BUỔI — số hoá bộ giáo án gốc của GITA
   CHƯƠNG → BUỔI (S1, S2…) → PHIẾU CƠ BẢN + PHIẾU NÂNG CAO
   ===================================================================== */

export const Curriculum: React.FC = () => {
  const { route, go } = useRouter();
  const { user, perms } = useAuth();
  const [grade, setGrade] = useState<Grade>((Number(route.query.get('khoi')) || user?.grade || 6) as Grade);
  const [open, setOpen] = useState<string | null>(null);
  const [track, setTrack] = useState<'CB' | 'NC'>(perms.isPaid ? 'NC' : 'CB');

  const chapters = chaptersOfGrade(grade);
  const totalLessons = chapters.reduce((s, c) => s + c.lessons.length, 0);
  const totalSheets = totalLessons * 2;

  return (
    <div className="wrap page">
      <div className="section-head">
        <div>
          <h1 style={{ marginBottom: 4 }}>Giáo án GITA — Toán {grade}</h1>
          <p className="muted mb0">
            Toàn bộ chương trình được tổ chức theo đúng cách GITA đang dạy:
            <strong> Chương → Buổi học → Phiếu cơ bản &amp; Phiếu nâng cao</strong>.
            Mỗi buổi liên kết trực tiếp tới chuyên đề tương ứng để em học lý thuyết và luyện tập ngay.
          </p>
        </div>
        <button className="btn btn-outline btn-sm no-print" onClick={() => window.print()}>🖨 In giáo án</button>
      </div>

      <Card className="tight mb6 no-print">
        <div className="row-wrap">
          <span className="label" style={{ margin: 0 }}>Khối:</span>
          <div className="chip-row">
            {GRADES.map((g) => (
              <button key={g} className={`chip${g === grade ? ' on' : ''}`} onClick={() => { setGrade(g); setOpen(null); }}>Lớp {g}</button>
            ))}
          </div>
          <span className="spacer" />
          <span className="label" style={{ margin: 0 }}>Xem phiếu:</span>
          <div className="chip-row">
            <button className={`chip${track === 'CB' ? ' on' : ''}`} onClick={() => setTrack('CB')}>Cơ bản (lớp {grade}CB)</button>
            <button className={`chip${track === 'NC' ? ' on' : ''}`} onClick={() => setTrack('NC')}>Nâng cao (lớp {grade}NC)</button>
          </div>
        </div>
      </Card>

      <div className="grid g4 mb6">
        <Stat k="Chương" v={chapters.length} />
        <Stat k="Buổi học" v={totalLessons} sub="theo giáo án gốc" />
        <Stat k="Phiếu bài tập" v={totalSheets} tone="gold" sub="cơ bản + nâng cao" />
        <Stat k="Buổi ôn tập chương" v={chapters.reduce((s, c) => s + (c.review?.length ?? 0), 0)} tone="ok" />
      </div>

      <div className="stack" style={{ gap: 'var(--sp-4)' }}>
        {chapters.map((c) => {
          const isOpen = open === c.id;
          return (
            <Card key={c.id} className="rule-top">
              <div className="between" style={{ cursor: 'pointer' }} onClick={() => setOpen(isOpen ? null : c.id)}>
                <div>
                  <div className="row-wrap mb2">
                    <span className="badge badge-brand">CHƯƠNG {c.roman}</span>
                    <span className="badge">{TERM_LABEL[c.term]}</span>
                    <span className="badge">{c.lessons.length} buổi</span>
                    {c.review && <span className="badge badge-gold">{c.review.length} buổi ôn tập</span>}
                  </div>
                  <h3 style={{ margin: 0 }}>{c.name}</h3>
                </div>
                <button className="btn btn-sm no-print">{isOpen ? 'Thu gọn ▲' : 'Xem chi tiết ▼'}</button>
              </div>

              {(isOpen || typeof window !== 'undefined' && window.matchMedia?.('print').matches) && (
                <div className="mt4">
                  {c.lessons.map((l) => {
                    const topic = getTopic(l.topicId);
                    return (
                      <div key={l.code} className="mm-branch mb3">
                        <div className="between mb2">
                          <div className="row-wrap">
                            <span className="badge badge-gold">{l.code}</span>
                            <strong style={{ fontSize: 'var(--fs-md)' }}><M t={l.title} /></strong>
                          </div>
                          {topic && (
                            <div className="btn-group no-print">
                              <Link to={`/chuyen-de/${topic.id}`} className="btn btn-sm btn-outline">📘 Lý thuyết</Link>
                              <button className="btn btn-sm btn-accent"
                                      onClick={() => go(`/luyen-tap?khoi=${grade}&cd=${topic.id}`)}>🎯 Luyện</button>
                            </div>
                          )}
                        </div>

                        <div className="label">Mục tiêu buổi học</div>
                        <ul className="small">{l.goals.map((g, i) => <li key={i}><M t={g} /></li>)}</ul>

                        <div className="grid g2 mt3">
                          <div className={track === 'CB' ? '' : 'lock-fade'} style={{ opacity: track === 'CB' ? 1 : 0.55 }}>
                            <div className="note ok">
                              <div className="note-title">📄 Phiếu cơ bản — lớp {grade}CB</div>
                              <ul className="mb0 small">{l.basic.map((b, i) => <li key={i}><M t={b} /></li>)}</ul>
                            </div>
                          </div>
                          <div style={{ opacity: track === 'NC' ? 1 : 0.55 }}>
                            <div className="note violet">
                              <div className="note-title">🚀 Phiếu nâng cao — lớp {grade}NC</div>
                              <ul className="mb0 small">{l.advanced.map((b, i) => <li key={i}><M t={b} /></li>)}</ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {c.review && (
                    <Note title="🔁 Buổi ôn tập chương" tone="gold">
                      <ul className="mb0">{c.review.map((r, i) => <li key={i}>{r}</li>)}</ul>
                    </Note>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Note title="🧭 Cách dùng giáo án này" tone="gold">
        <ol className="mb0">
          <li><strong>Giáo viên:</strong> mở đúng buổi đang dạy, in phiếu cơ bản cho lớp CB và phiếu nâng cao cho lớp NC ở mục Thư viện.</li>
          <li><strong>Học sinh:</strong> trước buổi học đọc phần Lý thuyết của chuyên đề; sau buổi học vào chế độ Luyện tập của đúng buổi đó.</li>
          <li><strong>Phụ huynh:</strong> theo dõi con đang học buổi nào và kết quả luyện tập ở mục Báo cáo.</li>
        </ol>
      </Note>

      <div className="tc mt8 bold" style={{ letterSpacing: '.5px', color: 'var(--gita-navy-800)' }}>
        “{GITA_SLOGAN}”
      </div>
    </div>
  );
};
