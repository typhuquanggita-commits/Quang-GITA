import React from 'react';
import type { AnswerValue, Question } from '@/types';
import { M, LevelBadge, Steps } from './ui';
import { scoreOne } from '@/lib/grading';

const KEYS = ['A', 'B', 'C', 'D'];
const TFKEYS = ['a', 'b', 'c', 'd'];

interface Props {
  q: Question;
  index: number;
  value: AnswerValue;
  onChange: (v: AnswerValue) => void;
  /** Hiển thị đáp án + lời giải (sau khi nộp bài hoặc ở chế độ luyện tập) */
  reveal?: boolean;
  flagged?: boolean;
  onFlag?: () => void;
  readOnly?: boolean;
}

export const QuestionCard: React.FC<Props> = ({ q, index, value, onChange, reveal, flagged, onFlag, readOnly }) => {
  const res = reveal ? scoreOne(q, value) : null;

  return (
    <div className={`q-card${flagged ? ' marked' : ''}`} id={`q-${q.id}`}>
      <div className="q-head">
        <span className="q-no">Câu {index + 1}.</span>
        <LevelBadge level={q.level} />
        <span className="badge">{q.tag}</span>
        <span className="badge">{q.points} điểm</span>
        {reveal && (
          <span className={`badge ${res!.partial >= 0.999 ? 'badge-ok' : res!.partial > 0 ? 'badge-vd' : 'badge-bad'}`}>
            {res!.partial >= 0.999 ? '✓ Đúng' : res!.partial > 0 ? `Đúng một phần (${Math.round(res!.partial * 100)}%)` : '✗ Chưa đúng'}
          </span>
        )}
        <span className="spacer" />
        {onFlag && !reveal && (
          <button className="btn btn-ghost btn-sm no-print" onClick={onFlag} title="Đánh dấu để xem lại">
            {flagged ? '★ Đã đánh dấu' : '☆ Đánh dấu'}
          </button>
        )}
      </div>

      <div className="q-stem">
        {q.stem.split('\n').map((line, i) => (line.trim() ? <p key={i}><M t={line} /></p> : <br key={i} />))}
      </div>

      {/* ------- TRẮC NGHIỆM NHIỀU LỰA CHỌN ------- */}
      {q.kind === 'MC' && q.options && (
        <div className="opts two">
          {q.options.map((opt, i) => {
            const sel = value === i;
            const isKey = q.answer === i;
            const cls = reveal ? (isKey ? 'correct' : sel ? 'wrong' : '') : sel ? 'sel' : '';
            return (
              <button key={i} type="button" className={`opt ${cls}`} disabled={readOnly || reveal}
                      onClick={() => onChange(i)}>
                <span className="opt-key">{KEYS[i]}</span>
                <span><M t={opt} /></span>
              </button>
            );
          })}
        </div>
      )}

      {/* ------- TRẮC NGHIỆM ĐÚNG/SAI ------- */}
      {q.kind === 'TF' && q.options && (
        <div className="opts">
          <div className="faint mb2">Chọn Đ (đúng) hoặc S (sai) cho từng ý. Thang điểm: 1 ý đúng 10% · 2 ý 25% · 3 ý 50% · 4 ý 100%.</div>
          {q.options.map((opt, i) => {
            const arr = Array.isArray(value) ? (value as boolean[]) : [];
            const key = (q.answer as boolean[])[i];
            const chosen = arr[i];
            return (
              <div key={i} className="opt" style={{ cursor: 'default' }}>
                <span className="opt-key">{TFKEYS[i]}</span>
                <span style={{ flex: 1 }}><M t={opt} /></span>
                <span className="btn-group no-print">
                  {[true, false].map((v) => (
                    <button key={String(v)} type="button" disabled={readOnly || reveal}
                            className={`btn btn-sm${chosen === v ? ' btn-primary' : ''}`}
                            style={reveal && key === v ? { borderColor: 'var(--ok)', color: 'var(--ok)' } : undefined}
                            onClick={() => { const next = [...arr]; next[i] = v; onChange(next); }}>
                      {v ? 'Đ' : 'S'}
                    </button>
                  ))}
                </span>
                {reveal && (
                  <span className={`badge ${chosen === key ? 'badge-ok' : 'badge-bad'}`}>
                    {chosen === key ? '✓' : `Đáp án: ${key ? 'Đ' : 'S'}`}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ------- TRẢ LỜI NGẮN ------- */}
      {q.kind === 'SHORT' && (
        <div>
          <input
            className="input mono" style={{ maxWidth: 340 }}
            placeholder="Nhập đáp số…"
            value={typeof value === 'string' ? value : ''}
            disabled={readOnly || reveal}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="hint">Phân số nhập dạng <code>a/b</code>; nhiều đáp số cách nhau bởi dấu phẩy; số thập phân dùng dấu chấm.</div>
          {reveal && (
            <div className="mt2">
              <span className="badge badge-ok">Đáp án đúng: <M t={String(q.answer)} /></span>
            </div>
          )}
        </div>
      )}

      {/* ------- TỰ LUẬN ------- */}
      {q.kind === 'ESSAY' && (
        <div>
          <div className="note gold">
            <div className="note-title">Cách làm câu tự luận</div>
            <p className="small mb0">Trình bày bài ra giấy như khi thi. Sau khi nộp, em đối chiếu bài làm của mình với thang điểm bên dưới và tự đánh dấu những ý đã làm được — hệ thống sẽ tính điểm theo đúng thang của Bộ GD&amp;ĐT.</p>
          </div>
          {reveal && q.rubric && (
            <div className="mt3">
              <div className="label">Tự chấm theo thang điểm</div>
              {q.rubric.map((row, i) => {
                const marks = String(value ?? '').split(',');
                const on = marks[i] === '1';
                return (
                  <label key={i} className="opt" style={{ cursor: 'pointer', marginBottom: 6 }}>
                    <input type="checkbox" checked={on} disabled={readOnly}
                           onChange={() => {
                             const next = (q.rubric ?? []).map((_, j) => (j === i ? (on ? '0' : '1') : marks[j] === '1' ? '1' : '0'));
                             onChange(next.join(','));
                           }} />
                    <span style={{ flex: 1 }}><M t={row.criterion} /></span>
                    <span className="badge">{row.points} điểm</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ------- LỜI GIẢI ------- */}
      {reveal && (
        <>
          {q.thinking && q.thinking.length > 0 && (
            <div className="note violet mt4">
              <div className="note-title">🧠 Phân tích tư duy — đọc vị đề bài</div>
              <ul className="mb0">{q.thinking.map((t, i) => <li key={i}><M t={t} /></li>)}</ul>
            </div>
          )}
          <div className="sol">
            <h5>Lời giải chi tiết</h5>
            <Steps items={q.solution} />
          </div>
          {q.pitfall && (
            <div className="note bad mt3">
              <div className="note-title">⚠ Bẫy thường gặp</div>
              <p className="mb0"><M t={q.pitfall} /></p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
