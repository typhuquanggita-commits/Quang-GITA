import React, { useMemo, useState } from 'react';
import { Link, useRouter } from '@/lib/router';
import { useAuth } from '@/lib/auth';
import { Bar, Card, Empty, M, Note } from '@/components/ui';
import { QuestionCard } from '@/components/QuestionCard';
import { getUserAttempts } from '@/lib/store';
import { findExam, generateExam } from '@/lib/exams';
import { getTopic } from '@/content';
import { LEVEL_LABEL } from '@/lib/analytics';
import type { Level, Question, QuestionResult } from '@/types';

/* =====================================================================
   SỔ TAY LỖI SAI — tập hợp toàn bộ câu đã làm sai, nhóm theo dạng bài,
   kèm lời giải và nút luyện lại đúng dạng đó.
   Đây là công cụ có sức nặng nhất trong việc kéo điểm từ 7–8 lên 9+.
   ===================================================================== */

interface WrongItem { result: QuestionResult; question: Question; attemptId: string; at: number; examCode: string }

export const Notebook: React.FC = () => {
  const { user } = useAuth();
  const { go } = useRouter();
  const [openTag, setOpenTag] = useState<string | null>(null);
  const [filter, setFilter] = useState<Level | 'ALL'>('ALL');

  const items = useMemo<WrongItem[]>(() => {
    if (!user) return [];
    const out: WrongItem[] = [];
    for (const a of getUserAttempts(user.id)) {
      const spec = findExam(a.examId);
      if (!spec) continue;
      const qs = generateExam(spec);
      const byId = new Map(qs.map((q) => [q.id, q]));
      for (const r of a.results) {
        if (r.correct) continue;
        const q = byId.get(r.questionId);
        if (q) out.push({ result: r, question: q, attemptId: a.id, at: a.submittedAt, examCode: a.examCode });
      }
    }
    return out;
  }, [user]);

  if (!user) { go('/dang-nhap'); return null; }

  const shown = items.filter((i) => filter === 'ALL' || i.result.level === filter);

  /* Nhóm theo dạng bài, sắp xếp theo số lần sai giảm dần */
  const groups = useMemo(() => {
    const m = new Map<string, WrongItem[]>();
    for (const i of shown) {
      const k = i.result.tag;
      m.set(k, [...(m.get(k) ?? []), i]);
    }
    return Array.from(m.entries())
      .map(([tag, list]) => ({ tag, list, topicId: list[0].result.topicId, level: list[0].result.level }))
      .sort((a, b) => b.list.length - a.list.length);
  }, [shown]);

  const worst = groups[0];

  return (
    <div className="wrap page">
      <div className="section-head">
        <div>
          <h1 style={{ marginBottom: 4 }}>Sổ tay lỗi sai</h1>
          <p className="muted mb0">
            Toàn bộ câu em đã làm sai, gom theo <strong>dạng bài</strong> — vì lỗi sai lặp lại theo dạng chứ không theo từng câu riêng lẻ.
            Chữa dứt điểm dạng đứng đầu danh sách là cách kéo điểm nhanh nhất.
          </p>
        </div>
        {items.length > 0 && <button className="btn btn-outline btn-sm no-print" onClick={() => window.print()}>🖨 In sổ tay</button>}
      </div>

      {items.length === 0 ? (
        <Empty icon="📓" title="Sổ tay còn trống"
               hint="Khi em làm bài và có câu sai, hệ thống sẽ tự động ghi vào đây kèm lời giải chi tiết để em chữa lại."
               action={<Link to="/bo-de" className="btn btn-primary">Làm một đề để bắt đầu</Link>} />
      ) : (
        <>
          {worst && (
            <Note title={`🔴 Dạng bài cần chữa gấp: “${worst.tag}”`} tone="bad">
              <p>Em đã sai <strong>{worst.list.length} lần</strong> ở dạng này (mức {LEVEL_LABEL[worst.level]}). Đây là khoản điểm đang mất đều đặn trong mọi bài kiểm tra.</p>
              <div className="btn-group mb0">
                {getTopic(worst.topicId) && (
                  <>
                    <Link to={`/chuyen-de/${worst.topicId}`} className="btn btn-sm btn-primary">📘 Đọc lại Sơ đồ đọc vị bài</Link>
                    <Link to={`/luyen-tap?khoi=${getTopic(worst.topicId)!.grade}&cd=${worst.topicId}`} className="btn btn-sm btn-accent">🎯 Luyện lại dạng này</Link>
                  </>
                )}
              </div>
            </Note>
          )}

          <Card className="tight mb4 no-print">
            <div className="row-wrap">
              <span className="label" style={{ margin: 0 }}>Lọc theo mức độ:</span>
              <div className="chip-row">
                {(['ALL', 'NB', 'TH', 'VD', 'VDC'] as const).map((l) => (
                  <button key={l} className={`chip${filter === l ? ' on' : ''}`} onClick={() => setFilter(l)}>
                    {l === 'ALL' ? `Tất cả (${items.length})` : `${LEVEL_LABEL[l]} (${items.filter((i) => i.result.level === l).length})`}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <div className="stack" style={{ gap: 'var(--sp-4)' }}>
            {groups.map((g) => {
              const topic = getTopic(g.topicId);
              const open = openTag === g.tag;
              return (
                <Card key={g.tag} className="rule-top">
                  <div className="between">
                    <div>
                      <div className="row-wrap mb2">
                        <span className={`badge badge-${g.level.toLowerCase()}`}>{LEVEL_LABEL[g.level]}</span>
                        <span className="badge badge-bad">Sai {g.list.length} lần</span>
                        {topic && <Link to={`/chuyen-de/${topic.id}`} className="badge">{topic.name}</Link>}
                      </div>
                      <h3 style={{ margin: 0 }}>{g.tag}</h3>
                    </div>
                    <div className="btn-group">
                      {topic && <Link to={`/luyen-tap?khoi=${topic.grade}&cd=${topic.id}`} className="btn btn-sm btn-accent">Luyện lại</Link>}
                      <button className="btn btn-sm" onClick={() => setOpenTag(open ? null : g.tag)}>
                        {open ? 'Thu gọn' : `Xem ${g.list.length} câu đã sai`}
                      </button>
                    </div>
                  </div>

                  <div className="mt3">
                    <div className="between xs muted"><span>Tần suất sai trong sổ tay</span><span>{Math.round((g.list.length / items.length) * 100)}%</span></div>
                    <Bar value={g.list.length / items.length} tone="bad" />
                  </div>

                  {open && (
                    <div className="mt4">
                      {g.list.map((i, k) => (
                        <div key={`${i.attemptId}-${k}`}>
                          <div className="faint mb2">
                            Đề {i.examCode} · {new Date(i.at).toLocaleDateString('vi-VN')} ·{' '}
                            <Link to={`/ket-qua/${i.attemptId}`}>xem lại toàn bài →</Link>
                          </div>
                          <QuestionCard q={i.question} index={k} value={i.result.given} onChange={() => { }} reveal readOnly />
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <Note title="📝 Cách dùng Sổ tay lỗi sai đúng phương pháp GITA" tone="gold">
            <ol className="mb0">
              <li><strong>Đọc lại lời giải</strong> của câu sai, xác định rõ sai ở bước nào: đọc đề, chọn công cụ, hay tính toán.</li>
              <li><strong>Chép lại câu đó ra vở</strong> và tự trình bày một lần từ đầu, che lời giải.</li>
              <li><strong>Luyện 10 câu cùng dạng</strong> ở chế độ Luyện tập bằng nút “Luyện lại” ở trên.</li>
              <li><strong>Sau 24 giờ quay lại</strong> làm 5 câu nữa để kiểm tra độ bền kiến thức — nhớ lâu hay không nằm ở bước này.</li>
            </ol>
          </Note>
        </>
      )}
      <div className="mt6"><M t="*Mỗi lỗi sai được chữa dứt điểm là một khoản điểm được giữ lại vĩnh viễn.*" /></div>
    </div>
  );
};
