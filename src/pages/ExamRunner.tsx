import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { AnswerValue, Attempt, Question } from '@/types';
import { findExam, generateExam } from '@/lib/exams';
import { QuestionCard } from '@/components/QuestionCard';
import { Card, Modal } from '@/components/ui';
import { useAuth } from '@/lib/auth';
import { useRouter } from '@/lib/router';
import { gradeAll } from '@/lib/grading';
import { buildReview } from '@/lib/analytics';
import { addAttempt, clearDraft, getDraft, getProgress, saveDraft, saveProgress, touchStreak, uid } from '@/lib/store';
import { topicName } from '@/content';

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export const ExamRunner: React.FC<{ examId: string }> = ({ examId }) => {
  const spec = useMemo(() => findExam(examId), [examId]);
  const questions: Question[] = useMemo(() => (spec ? generateExam(spec) : []), [spec]);
  const { user } = useAuth();
  const { go } = useRouter();

  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [flags, setFlags] = useState<string[]>([]);
  const [startedAt] = useState(() => Date.now());
  const [left, setLeft] = useState((spec?.minutes ?? 45) * 60);
  const [confirm, setConfirm] = useState(false);
  const [cur, setCur] = useState(0);
  const times = useRef<Record<string, number>>({});
  const lastTick = useRef(Date.now());
  const submitted = useRef(false);

  /* Khôi phục bài đang làm dở */
  useEffect(() => {
    if (!user || !spec) return;
    const d = getDraft(user.id, spec.id);
    if (d && Date.now() - d.startedAt < spec.minutes * 60000) {
      setAnswers(d.answers as Record<string, AnswerValue>);
      setFlags(d.flags);
      setLeft(Math.max(0, spec.minutes * 60 - Math.floor((Date.now() - d.startedAt) / 1000)));
    }
  }, [user, spec]);

  const submit = useCallback(() => {
    if (!spec || submitted.current) return;
    submitted.current = true;
    const durationSec = Math.round((Date.now() - startedAt) / 1000);
    const { results, earned, total, score10 } = gradeAll(questions, answers, times.current);
    const review = buildReview(results, score10, durationSec, spec.minutes, {
      topicName, tagName: (t) => t,
      drillHint: (t) => `Vào lại chuyên đề liên quan, đọc kỹ phần Sơ đồ đọc vị bài cho dạng “${t}”.`,
    });
    const attempt: Attempt = {
      id: uid('at'), userId: user?.id ?? 'guest', examId: spec.id, examCode: spec.code,
      examTitle: spec.title, grade: spec.grade, kind: spec.kind, seed: spec.seed,
      startedAt, submittedAt: Date.now(), durationSec, score10, earned, total, results, review,
      assignmentId: new URLSearchParams(window.location.hash.split('?')[1] ?? '').get('nv') ?? undefined,
    };
    addAttempt(attempt);
    if (user) {
      clearDraft(user.id, spec.id);
      const p = touchStreak(getProgress(user.id));
      for (const res of results) {
        const m = p.mastery[res.topicId] ?? { topicId: res.topicId, attempts: 0, correct: 0, total: 0, rate: 0, lastAt: 0 };
        m.correct += res.partial; m.total += 1; m.attempts += 1;
        m.rate = m.total ? m.correct / m.total : 0; m.lastAt = Date.now();
        p.mastery[res.topicId] = m;
      }
      p.totalMinutes += Math.round(durationSec / 60);
      saveProgress(p);
    }
    go(`/ket-qua/${attempt.id}`);
  }, [spec, questions, answers, startedAt, user, go]);

  /* Đồng hồ đếm ngược */
  useEffect(() => {
    const t = setInterval(() => {
      const q = questions[cur];
      if (q) {
        const dt = (Date.now() - lastTick.current) / 1000;
        times.current[q.id] = (times.current[q.id] ?? 0) + dt;
      }
      lastTick.current = Date.now();
      setLeft((l) => {
        if (l <= 1) { clearInterval(t); submit(); return 0; }
        return l - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [cur, questions, submit]);

  /* Tự lưu bài đang làm */
  useEffect(() => {
    if (!user || !spec) return;
    saveDraft(user.id, { examId: spec.id, seed: spec.seed, startedAt, answers, flags });
  }, [answers, flags, user, spec, startedAt]);

  if (!spec) return <div className="wrap page"><Card>Không tìm thấy đề thi.</Card></div>;

  const done = questions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '').length;

  return (
    <div className="wrap page">
      <div className="side-layout">
        <aside className="sidebar no-print">
          <Card className="tight">
            <div className="tc mb3">
              <div className="stat-k">Thời gian còn lại</div>
              <div className={`timer${left < 300 ? ' low' : ''}`}>{fmt(left)}</div>
            </div>
            <div className="between xs muted mb1"><span>Đã làm</span><span>{done}/{questions.length}</span></div>
            <div className="bar mb4"><i style={{ width: `${(done / questions.length) * 100}%` }} /></div>
            <div className="grid-map">
              {questions.map((q, i) => (
                <button key={q.id}
                        className={[answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== '' ? 'done' : '', flags.includes(q.id) ? 'flag' : '', i === cur ? 'cur' : ''].join(' ')}
                        onClick={() => { setCur(i); document.getElementById(`q-${q.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
                  {i + 1}
                </button>
              ))}
            </div>
            <button className="btn btn-accent btn-block mt4" onClick={() => setConfirm(true)}>Nộp bài</button>
            <div className="hint tc mt2">Bài làm được tự động lưu; nếu thoát giữa chừng em có thể quay lại làm tiếp.</div>
          </Card>
        </aside>

        <main>
          <Card className="tight mb4">
            <div className="between">
              <div>
                <div className="row-wrap">
                  <span className="badge badge-brand">{spec.code}</span>
                  <span className="badge">{spec.minutes} phút</span>
                  <span className="badge">{spec.totalPoints} điểm</span>
                </div>
                <h2 className="mt2 mb0">{spec.title}</h2>
              </div>
              <div className="tr faint">
                {spec.note}
              </div>
            </div>
          </Card>

          {questions.map((q, i) => (
            <QuestionCard
              key={q.id} q={q} index={i}
              value={answers[q.id] ?? null}
              onChange={(v) => { setCur(i); setAnswers((a) => ({ ...a, [q.id]: v })); }}
              flagged={flags.includes(q.id)}
              onFlag={() => setFlags((f) => (f.includes(q.id) ? f.filter((x) => x !== q.id) : [...f, q.id]))}
            />
          ))}

          <div className="tc mt6 no-print">
            <button className="btn btn-accent btn-lg" onClick={() => setConfirm(true)}>Nộp bài và xem lời giải</button>
          </div>
        </main>
      </div>

      {confirm && (
        <Modal title="Xác nhận nộp bài" onClose={() => setConfirm(false)}>
          <p>Em đã trả lời <strong>{done}/{questions.length}</strong> câu.</p>
          {done < questions.length && (
            <div className="note bad"><p className="mb0">Còn <strong>{questions.length - done}</strong> câu chưa trả lời. Câu bỏ trống được tính 0 điểm — em nên quay lại chọn thử đáp án hợp lý nhất.</p></div>
          )}
          <p className="muted small">Sau khi nộp, hệ thống sẽ chấm điểm, hiển thị lời giải chi tiết từng câu và phân tích chất lượng bài làm.</p>
          <div className="btn-group mt4">
            <button className="btn btn-accent" onClick={submit}>Nộp bài</button>
            <button className="btn" onClick={() => setConfirm(false)}>Quay lại làm tiếp</button>
          </div>
        </Modal>
      )}
    </div>
  );
};
