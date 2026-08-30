import React, { useMemo, useState } from 'react';
import { useAuth, lockReason } from '@/lib/auth';
import { Card, LockedBox, M, Note } from '@/components/ui';
import { FORMULAS, GITA_FULL_NAME, GITA_SLOGAN, GRADES, TERM_LABEL, getRoadmap, getTermMindMap, lessonsOfTopic, topicsOfGrade } from '@/content';
import { generateDrill } from '@/lib/exams';
import { Logo } from '@/components/Logo';
import type { Grade, Level, Question } from '@/types';

type Doc = 'phieu' | 'so-do' | 'cong-thuc' | 'de-cuong';

const DOCS: { k: Doc; icon: string; name: string; desc: string }[] = [
  { k: 'phieu', icon: '📄', name: 'Phiếu bài tập theo chuyên đề', desc: 'Sinh phiếu bài tập in được, kèm đáp án và lời giải ở trang cuối.' },
  { k: 'so-do', icon: '🗺', name: 'Sơ đồ tư duy tổng hợp', desc: 'Sơ đồ tư duy toàn chuyên đề / học kỳ, in khổ A4 dán góc học tập.' },
  { k: 'cong-thuc', icon: '📐', name: 'Bảng công thức điểm 10', desc: 'Bảng công thức trọng tâm theo khối, kèm điều kiện và bẫy thường gặp.' },
  { k: 'de-cuong', icon: '📚', name: 'Đề cương ôn tập', desc: 'Đề cương giữa kỳ, cuối kỳ, cả năm và ôn hè theo cấu trúc chuẩn.' },
];

export const Library: React.FC = () => {
  const { user, perms } = useAuth();
  const [grade, setGrade] = useState<Grade>(user?.grade ?? 6);
  const [doc, setDoc] = useState<Doc>('phieu');
  const topics = topicsOfGrade(grade);
  const [topicId, setTopicId] = useState(topics[0]?.id ?? '');
  const [levels, setLevels] = useState<Level[]>(['NB', 'TH', 'VD']);
  const [count, setCount] = useState(10);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e6));
  const [showKey, setShowKey] = useState(true);
  const [sheet, setSheet] = useState<'CB' | 'NC'>('CB');

  const topic = topics.find((t) => t.id === topicId) ?? topics[0];
  const questions: Question[] = useMemo(
    () => (topic ? generateDrill(topic.id, levels, count, seed, { kinds: ['MC', 'TF', 'SHORT'] }) : []),
    [topic, levels, count, seed]
  );
  /* Phần VỀ ĐÍCH: 3 thử thách tổng hợp ở mức cao hơn một bậc */
  const finishLine: Question[] = useMemo(
    () => (topic ? generateDrill(topic.id, sheet === 'CB' ? ['TH', 'VD'] : ['VD', 'VDC'], 3, seed + 7777, { kinds: ['MC', 'SHORT', 'ESSAY'] }) : []),
    [topic, seed, sheet]
  );

  const toggle = (l: Level) => setLevels((ls) => (ls.includes(l) ? ls.filter((x) => x !== l) : [...ls, l]));

  return (
    <div className="wrap page">
      <div className="section-head no-print">
        <div>
          <h1 style={{ marginBottom: 4 }}>Kho tài liệu chuẩn GITA</h1>
          <p className="muted mb0">Toàn bộ tài liệu dùng chung một bộ nhận diện: khổ A4, tiêu đề GITA, đánh số câu, thang điểm và trang đáp án.</p>
        </div>
      </div>

      <div className="grid g4 mb6 no-print">
        {DOCS.map((d) => (
          <Card key={d.k} className={`card-hover tight${doc === d.k ? ' rule-top' : ''}`} onClick={() => setDoc(d.k)}>
            <div style={{ fontSize: 24 }}>{d.icon}</div>
            <div className="bold mt2">{d.name}</div>
            <div className="faint">{d.desc}</div>
          </Card>
        ))}
      </div>

      <Card className="tight mb6 no-print">
        <div className="row-wrap">
          <span className="label" style={{ margin: 0 }}>Khối:</span>
          <div className="chip-row">
            {GRADES.map((g) => (
              <button key={g} className={`chip${g === grade ? ' on' : ''}`}
                      onClick={() => { setGrade(g); const t = topicsOfGrade(g)[0]; if (t) setTopicId(t.id); }}>Lớp {g}</button>
            ))}
          </div>
          {doc === 'phieu' && (
            <>
              <span className="spacer" />
              <select className="select" style={{ maxWidth: 320 }} value={topicId} onChange={(e) => setTopicId(e.target.value)}>
                {topics.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </>
          )}
        </div>
        {doc === 'phieu' && (
          <div className="row-wrap mt3">
            <span className="label" style={{ margin: 0 }}>Mức độ:</span>
            <div className="chip-row">
              {(['NB', 'TH', 'VD', 'VDC'] as Level[]).map((l) => (
                <button key={l} className={`chip${levels.includes(l) ? ' on' : ''}`} onClick={() => toggle(l)}>{l}</button>
              ))}
            </div>
            <span className="label" style={{ margin: 0 }}>Số câu:</span>
            <input className="input" style={{ width: 90 }} type="number" min={5} max={30} value={count} onChange={(e) => setCount(Number(e.target.value))} />
            <span className="label" style={{ margin: 0 }}>Loại phiếu:</span>
            <div className="chip-row">
              <button className={`chip${sheet === 'CB' ? ' on' : ''}`} onClick={() => { setSheet('CB'); setLevels(['NB', 'TH']); }}>Cơ bản</button>
              <button className={`chip${sheet === 'NC' ? ' on' : ''}`} onClick={() => { setSheet('NC'); setLevels(['TH', 'VD', 'VDC']); }}>Nâng cao</button>
            </div>
            <label className="row" style={{ gap: 6 }}>
              <input type="checkbox" checked={showKey} onChange={() => setShowKey((s) => !s)} /> <span className="small">Kèm đáp án &amp; lời giải</span>
            </label>
            <span className="spacer" />
            <button className="btn btn-sm" onClick={() => setSeed(Math.floor(Math.random() * 1e6))}>🔄 Sinh phiếu khác</button>
            <button className="btn btn-sm btn-primary" onClick={() => window.print()}>🖨 In / Lưu PDF</button>
          </div>
        )}
        {doc !== 'phieu' && (
          <div className="row-wrap mt3">
            <span className="spacer" />
            <button className="btn btn-sm btn-primary" onClick={() => window.print()}>🖨 In / Lưu PDF</button>
          </div>
        )}
      </Card>

      {/* --------- KHUNG TÀI LIỆU IN --------- */}
      <Card>
        {doc !== 'phieu' && (
          <div className="between mb4" style={{ borderBottom: '3px solid var(--brand)', paddingBottom: 12 }}>
            <Logo onLight sub="Tài liệu học tập" />
            <div className="tr small">
              <div className="bold">TRUNG TÂM GITA</div>
              <div className="faint">Chương trình MATH365 · CHUYÊN · CLC</div>
            </div>
          </div>
        )}

        {doc === 'phieu' && topic && (
          <>
            {/* ---- Đầu phiếu theo đúng mẫu GITA ---- */}
            <div className="gita-sheet-head">
              <div className="gita-academy">{GITA_FULL_NAME}</div>
              <div className="grid g2 mt3 small">
                <div>Giáo viên: ......................................................</div>
                <div className="tr">Ngày: ......../......../20......</div>
              </div>
              <div className="small mt2">Họ và tên học sinh: ................................................................ Lớp: {grade}{sheet}</div>
              <div className="small mt2">Mục tiêu: ..................................................................................................................</div>
            </div>

            <div className="gita-sheet-title">
              <div>{sheet === 'CB' ? 'PHIẾU CƠ BẢN' : 'PHIẾU NÂNG CAO'}: <M t={topic.name.toUpperCase()} /></div>
              <div className="gita-sheet-year">Năm học: 2025 – 2026</div>
            </div>

            {/* ---- Tóm tắt lý thuyết ---- */}
            <div className="mt6">
              <div className="gita-section">TÓM TẮT LÝ THUYẾT</div>
              {topic.theory.map((b, i) => (
                <div key={i} className="mb4" style={{ breakInside: 'avoid' }}>
                  <div className="bold">{b.heading}</div>
                  {b.formulas?.map((f, j) => <div key={j} className="mq-blk" style={{ margin: '6px 0' }}><M t={f} /></div>)}
                  {b.caution && b.caution.length > 0 && (
                    <div className="small" style={{ color: 'var(--bad)' }}>
                      ⚠ {b.caution.map((c, j) => <span key={j}><M t={c} />{j < b.caution!.length - 1 ? ' · ' : ''}</span>)}
                    </div>
                  )}
                </div>
              ))}
              {lessonsOfTopic(topic.id).length > 0 && (
                <div className="small muted">
                  Buổi học tương ứng trong giáo án GITA:{' '}
                  {lessonsOfTopic(topic.id).map((x, i) => (
                    <span key={i}><strong>{x.lesson.code}</strong> — {x.lesson.title}{i < lessonsOfTopic(topic.id).length - 1 ? ' · ' : ''}</span>
                  ))}
                </div>
              )}
            </div>

            {/* ---- Thử thách ---- */}
            <div className="mt6">
              {questions.map((q, i) => (
                <div key={q.id} style={{ marginBottom: 18, breakInside: 'avoid' }}>
                  <div className="bold">
                    <span style={{ color: 'var(--gita-navy-800)' }}>THỬ THÁCH {i + 1}:</span> <M t={q.stem} />
                  </div>
                  {q.options && (
                    <div className="grid g2 mt2" style={{ gap: 6 }}>
                      {q.options.map((o, j) => (
                        <div key={j} className="small"><strong>{q.kind === 'TF' ? `${'abcd'[j]}.` : `${'ABCD'[j]}.`}</strong> <M t={o} /></div>
                      ))}
                    </div>
                  )}
                  {q.kind === 'SHORT' && <div className="faint mt2">Trả lời: ..................................................</div>}
                  {q.kind === 'ESSAY' && <div className="mt2" style={{ height: 90, borderBottom: '1px dashed var(--border-strong)' }} />}
                </div>
              ))}
            </div>

            {/* ---- Về đích ---- */}
            <div className="gita-section mt8">VỀ ĐÍCH</div>
            <p className="small muted">Phần thử thách tổng hợp — làm sau khi đã hoàn thành các thử thách ở trên.</p>
            {finishLine.map((q, i) => (
              <div key={q.id} style={{ marginBottom: 18, breakInside: 'avoid' }}>
                <div className="bold">
                  <span style={{ color: 'var(--gita-gold-700)' }}>THỬ THÁCH {i + 1}:</span> <M t={q.stem} />
                </div>
                {q.options && (
                  <div className="grid g2 mt2" style={{ gap: 6 }}>
                    {q.options.map((o, j) => <div key={j} className="small"><strong>{'ABCD'[j]}.</strong> <M t={o} /></div>)}
                  </div>
                )}
                {q.kind !== 'MC' && <div className="faint mt2">Trả lời: ..................................................</div>}
              </div>
            ))}

            {/* ---- Đáp án ---- */}
            {showKey && (
              <div style={{ breakBefore: 'page', borderTop: '3px solid var(--gita-gold-600)', paddingTop: 16, marginTop: 24 }}>
                <div className="gita-section">ĐÁP ÁN &amp; LỜI GIẢI CHI TIẾT</div>
                {[...questions, ...finishLine].map((q, i) => (
                  <div key={q.id} className="mb4" style={{ breakInside: 'avoid' }}>
                    <div className="bold">
                      {i < questions.length ? `Thử thách ${i + 1}` : `Về đích — Thử thách ${i - questions.length + 1}`}. Đáp án: {
                        q.kind === 'MC' ? 'ABCD'[q.answer as number]
                          : q.kind === 'TF' ? (q.answer as boolean[]).map((b, j) => `${'abcd'[j]}-${b ? 'Đ' : 'S'}`).join('; ')
                            : q.kind === 'SHORT' ? <M t={String(q.answer)} /> : 'Theo thang điểm'
                      }
                    </div>
                    <ol className="small">{q.solution.map((s2, j) => <li key={j}><M t={s2} /></li>)}</ol>
                    {q.pitfall && <div className="small" style={{ color: 'var(--bad)' }}>⚠ Bẫy: <M t={q.pitfall} /></div>}
                  </div>
                ))}
              </div>
            )}

            <div className="gita-slogan">‘‘{GITA_SLOGAN}’’</div>
          </>
        )}

        {doc === 'so-do' && (
          <>
            <div className="tc mb6">
              <h2 style={{ marginBottom: 4 }}>SƠ ĐỒ TƯ DUY TỔNG HỢP — TOÁN {grade}</h2>
              <div className="faint">Hệ thống hoá toàn bộ chương trình theo chuyên đề và học kỳ</div>
            </div>
            {(['HK1', 'HK2'] as const).map((term) => {
              const mm = getTermMindMap(grade, term);
              return mm ? (
                <div key={term} className="mb8" style={{ breakInside: 'avoid' }}>
                  <div className="row-wrap mb2"><span className="badge badge-gold">Tổng hợp {TERM_LABEL[term]}</span></div>
                  <div className="mindmap">
                    <div className="mm-root"><M t={mm.root} /></div>
                    <div className="mm-branches">
                      {mm.branches.map((b, i) => (
                        <div className="mm-branch" key={i}>
                          <h5><M t={b.title} /></h5>
                          <ul>{b.items.map((it, j) => <li key={j}><M t={it} /></li>)}</ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null;
            })}
            {topics.map((t) => (
              <div key={t.id} className="mb6" style={{ breakInside: 'avoid' }}>
                <div className="row-wrap mb2">
                  <span className="badge badge-brand">Chuyên đề {t.order}</span>
                  <span className="badge">{TERM_LABEL[t.term]}</span>
                </div>
                <div className="mindmap">
                  <div className="mm-root"><M t={t.mindmap.root} /></div>
                  <div className="mm-branches">
                    {t.mindmap.branches.map((b, i) => (
                      <div className="mm-branch" key={i}>
                        <h5><M t={b.title} /></h5>
                        <ul>{b.items.map((it, j) => <li key={j}><M t={it} /></li>)}</ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {doc === 'cong-thuc' && (
          perms.canFullFormula ? (
            <>
              <div className="tc mb6">
                <h2 style={{ marginBottom: 4 }}>BẢNG CÔNG THỨC ĐIỂM 10 — TOÁN {grade}</h2>
                <div className="faint">Công thức · Điều kiện · Dùng khi nào · Bẫy thường gặp</div>
              </div>
              <div className="table-scroll">
                <table className="table">
                  <thead><tr><th>Chủ đề</th><th>Công thức</th><th>Dùng khi</th><th>Bẫy</th></tr></thead>
                  <tbody>
                    {topicsOfGrade(grade).length > 0 && (
                      <FormulaRows grade={grade} />
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : <LockedBox reason={lockReason(perms)} />
        )}

        {doc === 'de-cuong' && (
          perms.canDeCuong ? (
            <>
              <div className="tc mb6">
                <h2 style={{ marginBottom: 4 }}>ĐỀ CƯƠNG ÔN TẬP — TOÁN {grade}</h2>
                <div className="faint">Cấu trúc theo chuẩn ma trận đề của Bộ GD&amp;ĐT</div>
              </div>
              <Note title="🎯 Mục tiêu của khối" tone="gold"><p className="mb0">{getRoadmap(grade).target}</p></Note>
              {(['HK1', 'HK2'] as const).map((term) => (
                <div key={term} className="mb6">
                  <h3>{TERM_LABEL[term]}</h3>
                  {topics.filter((t) => t.term === term).map((t) => (
                    <div key={t.id} className="mb4" style={{ breakInside: 'avoid' }}>
                      <div className="bold">Chuyên đề {t.order}. <M t={t.name} /></div>
                      <div className="small muted"><M t={t.summary} /></div>
                      <div className="label mt2">Yêu cầu cần đạt</div>
                      <ul className="small">{t.outcomes.map((o, i) => <li key={i}><M t={o} /></li>)}</ul>
                      <div className="label">Các dạng bài phải thành thạo</div>
                      <ul className="small">{t.types.map((d) => <li key={d.id}><strong>[{d.level}]</strong> {d.name}</li>)}</ul>
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ breakBefore: 'page' }}>
                <h3>Cấu trúc đề kiểm tra chuẩn</h3>
                <div className="table-scroll">
                  <table className="table">
                    <thead><tr><th>Phần</th><th className="tc">Số câu</th><th className="tc">Điểm/câu</th><th className="tc">Tổng</th></tr></thead>
                    <tbody>
                      <tr><td>Trắc nghiệm nhiều lựa chọn — Nhận biết</td><td className="tc">6</td><td className="tc">1,0</td><td className="tc">6,0</td></tr>
                      <tr><td>Trắc nghiệm nhiều lựa chọn — Thông hiểu</td><td className="tc">4</td><td className="tc">1,0</td><td className="tc">4,0</td></tr>
                      <tr><td>Trắc nghiệm đúng/sai (4 ý)</td><td className="tc">1</td><td className="tc">2,0</td><td className="tc">2,0</td></tr>
                      <tr><td>Trả lời ngắn — Thông hiểu &amp; Vận dụng</td><td className="tc">6</td><td className="tc">1,5</td><td className="tc">9,0</td></tr>
                      <tr><td>Tự luận — Vận dụng</td><td className="tc">1</td><td className="tc">4,0</td><td className="tc">4,0</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="faint mt2">Điểm bài kiểm tra được quy về thang 10. Câu đúng/sai chấm theo tỉ lệ 10% – 25% – 50% – 100% ứng với số ý đúng.</p>
              </div>
            </>
          ) : <LockedBox reason={lockReason(perms)} />
        )}

        <div className="mt8 tc faint" style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
          MATHGITA — Hệ thống luyện Toán THCS của Trung tâm GITA · Mục tiêu 9+ điểm
        </div>
      </Card>
    </div>
  );
};

const FormulaRows: React.FC<{ grade: Grade }> = ({ grade }) => {
  return (
    <>
      {FORMULAS.filter((f) => f.grade === grade).map((f) => (
        <tr key={f.id}>
          <td className="bold">{f.topic}</td>
          <td><M t={f.formula} />{f.condition && <div className="faint xs"><M t={f.condition} /></div>}</td>
          <td className="small"><M t={f.usage} /></td>
          <td className="small" style={{ color: 'var(--bad)' }}>{f.trap ? <M t={f.trap} /> : '—'}</td>
        </tr>
      ))}
    </>
  );
};
