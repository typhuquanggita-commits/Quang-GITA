import React, { useEffect, useState } from 'react';
import { Link, useRouter } from '@/lib/router';
import { useAuth, lockReason } from '@/lib/auth';
import { Bullets, Card, DecodeView, LevelBadge, LockedBox, M, MindMapView, Note, Steps } from '@/components/ui';
import { STRAND_LABEL, TERM_LABEL, getTermMindMap, getTopic, lessonsOfTopic } from '@/content';
import { markStudied } from '@/lib/store';
import { templatesOfTopic } from '@/bank';

type Tab = 'ly-thuyet' | 'doc-vi' | 'dang-bai' | 'ky-nang' | 'so-do' | 'luyen-tap';

const TABS: { k: Tab; label: string; icon: string }[] = [
  { k: 'ly-thuyet', label: 'Lý thuyết', icon: '📘' },
  { k: 'doc-vi', label: 'Sơ đồ đọc vị bài', icon: '🧭' },
  { k: 'dang-bai', label: 'Dạng bài & lời giải', icon: '🎯' },
  { k: 'ky-nang', label: 'Kỹ năng — phương pháp', icon: '🛠' },
  { k: 'so-do', label: 'Sơ đồ tư duy', icon: '🗺' },
  { k: 'luyen-tap', label: 'Luyện tập', icon: '📝' },
];

export const TopicDetail: React.FC<{ id: string }> = ({ id }) => {
  const topic = getTopic(id);
  const { user, perms } = useAuth();
  const { go } = useRouter();
  const [tab, setTab] = useState<Tab>('ly-thuyet');

  useEffect(() => { if (user && topic) markStudied(user.id, topic.id); }, [user, topic]);

  if (!topic) return <div className="wrap page"><Card><M t="Không tìm thấy chuyên đề." /></Card></div>;

  const advanced = topic.types.filter((d) => d.level === 'VD' || d.level === 'VDC');
  const basic = topic.types.filter((d) => d.level === 'NB' || d.level === 'TH');
  const tplCount = templatesOfTopic(topic.id).length;

  return (
    <div className="wrap page">
      <div className="row-wrap mb2">
        <Link to={`/chuyen-de?khoi=${topic.grade}`} className="btn btn-ghost btn-sm">← Toán {topic.grade}</Link>
        <span className="badge badge-brand">Chuyên đề {topic.order}</span>
        <span className="badge">{TERM_LABEL[topic.term]}</span>
        <span className="badge">{STRAND_LABEL[topic.strand]}</span>
      </div>
      <h1><M t={topic.name} /></h1>
      <p className="muted" style={{ maxWidth: 860 }}><M t={topic.summary} /></p>

      <Note title="🎯 Yêu cầu cần đạt (theo Chương trình GDPT 2018)">
        <Bullets items={topic.outcomes} />
      </Note>

      {lessonsOfTopic(topic.id).length > 0 && (
        <Note title="📅 Buổi học tương ứng trong giáo án GITA" tone="gold">
          <div className="stack" style={{ gap: 8 }}>
            {lessonsOfTopic(topic.id).map((x, i) => (
              <div key={i} className="row-wrap">
                <span className="badge badge-brand">Chương {x.chapter.roman}</span>
                <span className="badge badge-gold">{x.lesson.code}</span>
                <span><M t={x.lesson.title} /></span>
              </div>
            ))}
          </div>
          <div className="mt3"><Link to={`/giao-an?khoi=${topic.grade}`} className="btn btn-sm btn-outline">Xem toàn bộ giáo án khối {topic.grade} →</Link></div>
        </Note>
      )}

      <div className="tabs mt6">
        {TABS.map((t) => (
          <button key={t.k} className={`tab${tab === t.k ? ' on' : ''}`} onClick={() => setTab(t.k)}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {tab === 'ly-thuyet' && (
        <div className="stack" style={{ gap: 'var(--sp-4)' }}>
          {topic.theory.map((b, i) => (
            <Card key={i} className="rule-top">
              <h3>{b.heading}</h3>
              {b.body.map((p, j) => <p key={j}><M t={p} /></p>)}
              {b.formulas && b.formulas.length > 0 && (
                <div className="note gold">
                  <div className="note-title">📐 Công thức cần thuộc</div>
                  {b.formulas.map((f, j) => <div key={j} className="mq-blk"><M t={f} /></div>)}
                </div>
              )}
              {b.caution && b.caution.length > 0 && (
                <Note title="⚠ Lưu ý — bẫy thường gặp" tone="bad"><Bullets items={b.caution} /></Note>
              )}
              {b.examples?.map((ex, j) => (
                <div key={j} className="sol">
                  <h5>Ví dụ minh hoạ</h5>
                  <p className="bold"><M t={ex.prompt} /></p>
                  <Steps items={ex.solve} />
                </div>
              ))}
            </Card>
          ))}
        </div>
      )}

      {tab === 'doc-vi' && (
        <Card className="rule-top">
          <h3>Sơ đồ đọc vị bài — nhìn đề là biết phải làm gì</h3>
          <p className="muted">Đây là bảng phản xạ của chuyên đề: mỗi dấu hiệu trong đề tương ứng với một công cụ giải. Học thuộc bảng này, em sẽ không còn “đọc đề xong không biết bắt đầu từ đâu”.</p>
          <DecodeView rules={topic.decode} />
        </Card>
      )}

      {tab === 'dang-bai' && (
        <div className="stack" style={{ gap: 'var(--sp-4)' }}>
          {basic.map((d) => <TypeCard key={d.id} d={d} />)}
          {advanced.length > 0 && (
            perms.canVDC
              ? advanced.map((d) => <TypeCard key={d.id} d={d} />)
              : (
                <LockedBox reason={lockReason(perms)}>
                  <p className="small muted mt3">
                    Chuyên đề này còn <strong>{advanced.length} dạng bài mức Vận dụng &amp; Vận dụng cao</strong> kèm ví dụ mẫu có phân tích tư duy — phần quyết định để đạt 9+.
                  </p>
                </LockedBox>
              )
          )}
        </div>
      )}

      {tab === 'ky-nang' && (
        <div className="stack" style={{ gap: 'var(--sp-4)' }}>
          {(topic.practiceSkills ?? []).map((s, i) => (
            <Card key={i} className="rule-top">
              <h3>{s.title}</h3>
              <Steps items={s.detail} />
            </Card>
          ))}
          <Card>
            <h3>Bộ lỗi sai cần tránh của chuyên đề</h3>
            <ul>
              {topic.types.flatMap((d) => (d.pitfalls ?? []).map((p) => ({ d: d.name, p })))
                .map((x, i) => <li key={i}><strong>{x.d}:</strong> <M t={x.p} /></li>)}
            </ul>
            {topic.types.every((d) => !d.pitfalls?.length) && <p className="muted mb0">Xem phần Lý thuyết để nắm các lưu ý của chuyên đề.</p>}
          </Card>
        </div>
      )}

      {tab === 'so-do' && (
        <Card className="rule-top">
          <h3>Sơ đồ tư duy tổng hợp kiến thức</h3>
          <p className="muted">In ra và dán vào góc học tập. Trước mỗi bài kiểm tra, nhìn sơ đồ và tự nhắc lại nội dung từng nhánh — đó là cách ôn nhanh và chắc nhất.</p>
          <MindMapView map={topic.mindmap} />

          {getTermMindMap(topic.grade, topic.term) && (
            <>
              <hr />
              <h3>Sơ đồ tư duy tổng hợp — {TERM_LABEL[topic.term]}, Toán {topic.grade}</h3>
              <p className="muted">
                Bức tranh toàn cảnh của cả học kỳ: chuyên đề em đang học nằm ở đâu trong hệ thống,
                và nó nối với những phần nào khác. Ôn cuối kỳ hãy bắt đầu từ sơ đồ này.
              </p>
              <MindMapView map={getTermMindMap(topic.grade, topic.term)!} />
            </>
          )}

          <div className="mt4 no-print">
            <button className="btn btn-outline" onClick={() => window.print()}>🖨 In sơ đồ tư duy</button>
          </div>
        </Card>
      )}

      {tab === 'luyen-tap' && (
        <Card className="rule-top">
          <h3>Luyện tập chuyên đề — chấm điểm và xem lời giải ngay</h3>
          <p className="muted">
            Hệ thống sinh đề từ {tplCount} khuôn câu hỏi của chuyên đề này. Mỗi lần luyện là một bộ câu hỏi mới,
            có lời giải chi tiết, phân tích tư duy và cảnh báo bẫy sau khi nộp bài.
          </p>
          <div className="grid g3 mt4">
            {[1, 2, 3].map((v) => (
              <Card key={v} className="card-hover tight">
                <div className="bold">Bộ luyện tập số {v}</div>
                <div className="faint mb3">12 câu · 30 phút · NB → VD</div>
                <button className="btn btn-primary btn-block" onClick={() => go(`/lam-bai/ex-topic-${topic.id}-${v}`)}>Vào luyện</button>
              </Card>
            ))}
          </div>
          <div className="note gold mt4">
            <div className="note-title">🎯 Nên bắt đầu bằng chế độ Luyện tập</div>
            <p className="mb0 small">
              Chế độ Luyện tập không bấm giờ, chấm và hiện lời giải ngay sau mỗi câu — dùng để <strong>hiểu bài</strong>.
              Khi tỉ lệ đúng đạt trên 85%, hãy chuyển sang chế độ thi có bấm giờ ở mục Bộ đề để <strong>đo năng lực</strong>.
            </p>
          </div>
          <div className="btn-group mt4">
            <Link to={`/luyen-tap?khoi=${topic.grade}&cd=${topic.id}`} className="btn btn-accent btn-lg">Vào chế độ Luyện tập →</Link>
            <Link to={`/bo-de?khoi=${topic.grade}`} className="btn btn-outline btn-lg">Bộ 100 đề luyện thi khối {topic.grade} →</Link>
          </div>
        </Card>
      )}
    </div>
  );
};

const TypeCard: React.FC<{ d: import('@/types').ProblemType }> = ({ d }) => (
  <Card className="rule-top">
    <div className="row-wrap mb2">
      <LevelBadge level={d.level} />
      <h3 style={{ margin: 0 }}>{d.name}</h3>
    </div>
    <div className="note">
      <div className="note-title">Phương pháp giải</div>
      <Steps items={d.method} />
    </div>
    {d.pitfalls && d.pitfalls.length > 0 && (
      <Note title="⚠ Lỗi sai thường gặp" tone="bad"><Bullets items={d.pitfalls} /></Note>
    )}
    {d.worked?.map((w, i) => (
      <div key={i} className="mt4">
        <div className="bold mb2">🔍 Ví dụ mẫu {d.worked!.length > 1 ? i + 1 : ''}</div>
        <div className="q-stem"><M t={w.prompt} /></div>
        <Note title="🧠 Phân tích tư duy — vì sao nghĩ ra bước đó" tone="violet">
          <Bullets items={w.thinking} />
        </Note>
        <div className="sol">
          <h5>Lời giải trình bày</h5>
          <Steps items={w.solution} />
        </div>
        {w.remark && <Note title="💡 Nhận xét của thầy cô GITA" tone="gold"><p className="mb0"><M t={w.remark} /></p></Note>}
      </div>
    ))}
  </Card>
);
