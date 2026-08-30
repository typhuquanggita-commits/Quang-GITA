import React, { useMemo, useState } from 'react';
import { Link, useRouter } from '@/lib/router';
import { useAuth, lockReason } from '@/lib/auth';
import { Bar, Card, Note, Stat } from '@/components/ui';
import { QuestionCard } from '@/components/QuestionCard';
import { generateDrill } from '@/lib/exams';
import { GRADES, getTopic, topicsOfGrade } from '@/content';
import { getProgress, saveProgress, touchStreak } from '@/lib/store';
import { scoreOne } from '@/lib/grading';
import type { AnswerValue, Grade, Level } from '@/types';

/* =====================================================================
   CHẾ ĐỘ LUYỆN TẬP — làm từng câu, chấm và xem lời giải ngay lập tức.
   Khác với chế độ thi: không bấm giờ, được xem lời giải sau mỗi câu,
   mục tiêu là *hiểu* chứ không phải *đo*.
   ===================================================================== */

export const Practice: React.FC = () => {
  const { route, go } = useRouter();
  const { user, perms } = useAuth();
  const grade = (Number(route.query.get('khoi')) || user?.grade || 6) as Grade;
  const topics = topicsOfGrade(grade);
  const [topicId, setTopicId] = useState(route.query.get('cd') || topics[0]?.id || '');
  const [levels, setLevels] = useState<Level[]>(['NB', 'TH']);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e6));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const questions = useMemo(() => generateDrill(topicId, levels, 12, seed), [topicId, levels, seed]);
  const q = questions[idx];
  const topic = getTopic(topicId);

  const answeredCount = Object.keys(checked).length;
  const correctCount = questions.filter((x) => checked[x.id] && scoreOne(x, answers[x.id] ?? null).partial >= 0.999).length;

  const check = () => {
    if (!q) return;
    setChecked((c) => ({ ...c, [q.id]: true }));
    if (user) {
      const p = touchStreak(getProgress(user.id));
      const m = p.mastery[q.topicId] ?? { topicId: q.topicId, attempts: 0, correct: 0, total: 0, rate: 0, lastAt: 0 };
      m.correct += scoreOne(q, answers[q.id] ?? null).partial;
      m.total += 1;
      m.rate = m.correct / m.total;
      m.lastAt = Date.now();
      p.mastery[q.topicId] = m;
      saveProgress(p);
    }
  };

  const restart = () => { setSeed(Math.floor(Math.random() * 1e6)); setIdx(0); setAnswers({}); setChecked({}); };
  const toggleLevel = (l: Level) => {
    if (!perms.canVDC && (l === 'VD' || l === 'VDC')) return;
    setLevels((ls) => (ls.includes(l) ? (ls.length > 1 ? ls.filter((x) => x !== l) : ls) : [...ls, l]));
    restart();
  };

  return (
    <div className="wrap page">
      <div className="section-head">
        <div>
          <h1 style={{ marginBottom: 4 }}>Chế độ luyện tập</h1>
          <p className="muted mb0">
            Không bấm giờ — làm xong mỗi câu là được chấm và xem lời giải ngay.
            Đây là chế độ để <strong>hiểu bài</strong>; khi đã chắc, hãy chuyển sang chế độ thi có bấm giờ ở mục Bộ đề.
          </p>
        </div>
      </div>

      <Card className="tight mb4">
        <div className="row-wrap">
          <span className="label" style={{ margin: 0 }}>Khối:</span>
          <div className="chip-row">
            {GRADES.map((g) => (
              <button key={g} className={`chip${g === grade ? ' on' : ''}`}
                      onClick={() => go(`/luyen-tap?khoi=${g}`)}>Lớp {g}</button>
            ))}
          </div>
          <span className="spacer" />
          <select className="select" style={{ maxWidth: 340 }} value={topicId}
                  onChange={(e) => { setTopicId(e.target.value); restart(); }}>
            {topics.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div className="row-wrap mt3">
          <span className="label" style={{ margin: 0 }}>Mức độ:</span>
          <div className="chip-row">
            {(['NB', 'TH', 'VD', 'VDC'] as Level[]).map((l) => {
              const locked = !perms.canVDC && (l === 'VD' || l === 'VDC');
              return (
                <button key={l} className={`chip${levels.includes(l) ? ' on' : ''}`}
                        disabled={locked} title={locked ? lockReason(perms) : undefined}
                        onClick={() => toggleLevel(l)}>
                  {l}{locked ? ' 🔒' : ''}
                </button>
              );
            })}
          </div>
          <span className="spacer" />
          <button className="btn btn-sm" onClick={restart}>🔄 Bộ câu hỏi mới</button>
        </div>
      </Card>

      {!perms.canVDC && (
        <Note title="🔓 Mức Vận dụng và Vận dụng cao dành cho học sinh GITA" tone="gold">
          <p className="mb0">{lockReason(perms)}</p>
        </Note>
      )}

      <div className="side-layout mt4">
        <aside className="sidebar">
          <Card className="tight">
            <div className="grid" style={{ gap: 10 }}>
              <Stat k="Đã làm" v={`${answeredCount}/${questions.length}`} />
              <Stat k="Đúng" v={answeredCount ? `${Math.round((correctCount / answeredCount) * 100)}%` : '—'}
                    tone={answeredCount && correctCount / answeredCount >= 0.85 ? 'ok' : ''} sub={`${correctCount} câu đúng`} />
            </div>
            <div className="mt3">
              <Bar value={answeredCount ? correctCount / answeredCount : 0}
                   tone={!answeredCount ? '' : correctCount / answeredCount >= 0.85 ? 'ok' : correctCount / answeredCount >= 0.6 ? 'warn' : 'bad'} />
            </div>
            <div className="grid-map mt4">
              {questions.map((x, i) => {
                const done = checked[x.id];
                const ok = done && scoreOne(x, answers[x.id] ?? null).partial >= 0.999;
                return (
                  <button key={x.id} className={[done ? (ok ? 'ok' : 'no') : '', i === idx ? 'cur' : ''].join(' ')}
                          onClick={() => setIdx(i)}>{i + 1}</button>
                );
              })}
            </div>
            {topic && (
              <div className="mt4">
                <Link to={`/chuyen-de/${topic.id}`} className="btn btn-outline btn-block btn-sm">📘 Mở lý thuyết chuyên đề</Link>
              </div>
            )}
          </Card>
        </aside>

        <main>
          {!q ? (
            <Card className="tc">Chuyên đề này chưa có khuôn câu hỏi ở mức độ đã chọn. Hãy chọn thêm mức độ khác.</Card>
          ) : (
            <>
              <QuestionCard
                q={q} index={idx}
                value={answers[q.id] ?? null}
                onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
                reveal={!!checked[q.id]}
                readOnly={!!checked[q.id] && q.kind !== 'ESSAY'}
              />
              <div className="row-wrap">
                <button className="btn" disabled={idx === 0} onClick={() => setIdx((i) => i - 1)}>← Câu trước</button>
                {!checked[q.id]
                  ? <button className="btn btn-accent btn-lg" onClick={check}>Kiểm tra đáp án</button>
                  : <span className="badge badge-ok">Đã chấm — đọc kỹ lời giải trước khi sang câu sau</span>}
                <span className="spacer" />
                {idx < questions.length - 1
                  ? <button className="btn btn-primary" onClick={() => setIdx((i) => i + 1)}>Câu tiếp →</button>
                  : <button className="btn btn-primary" onClick={restart}>Luyện bộ mới →</button>}
              </div>
            </>
          )}

          {answeredCount === questions.length && questions.length > 0 && (
            <Note title="🎯 Hoàn thành bộ luyện tập" tone={correctCount / questions.length >= 0.85 ? 'ok' : 'gold'}>
              <p>Kết quả: <strong>{correctCount}/{questions.length}</strong> câu đúng ({Math.round((correctCount / questions.length) * 100)}%).</p>
              {correctCount / questions.length >= 0.85
                ? <p className="mb0">Rất tốt — em đã đạt ngưỡng an toàn của chuyên đề này. Hãy bật thêm mức Vận dụng hoặc chuyển sang chế độ thi có bấm giờ.</p>
                : <p className="mb0">Chưa đạt ngưỡng 85%. Hãy đọc lại phần <strong>Sơ đồ đọc vị bài</strong> của chuyên đề, sau đó luyện thêm một bộ nữa trước khi làm đề.</p>}
              <div className="btn-group mt3">
                <button className="btn btn-primary" onClick={restart}>Luyện bộ mới</button>
                {topic && <Link to={`/chuyen-de/${topic.id}`} className="btn btn-outline">Ôn lại lý thuyết</Link>}
                <Link to={`/bo-de?khoi=${grade}`} className="btn">Chuyển sang chế độ thi</Link>
              </div>
            </Note>
          )}
        </main>
      </div>
    </div>
  );
};
