import { useMemo, useState } from 'react';
import { useApp, go } from '@/state';
import { TOPICS, topicById } from '@/data/topics';
import { STRANDS, strandById } from '@/data/schools';
import { QUESTIONS, questionsByTopic } from '@/data/questions';
import { MISSIONS } from '@/data/catalog';
import { TIERS } from '@/data/gita';
import { BRAND_TRACK_STYLE } from '@/data/brand';
import { Card, SectionTitle, Badge, LevelDots, Progress, MathText, Empty, Callout } from '@/components/ui';
import type { TrackId } from '@/types';

export function TopicList() {
  const { state } = useApp();
  const track: TrackId = state.profile?.track ?? 'thpt';
  const [strand, setStrand] = useState<string>('');
  const [q, setQ] = useState('');

  const list = useMemo(
    () =>
      TOPICS.filter((t) => t.tracks.includes(track))
        .filter((t) => !strand || t.strand === strand)
        .filter((t) => !q || t.name.toLowerCase().includes(q.toLowerCase()))
        .sort((a, b) => (a.grade ?? 9) - (b.grade ?? 9) || b.frequency - a.frequency),
    [track, strand, q],
  );

  const strandsHere = [...new Set(TOPICS.filter((t) => t.tracks.includes(track)).map((t) => t.strand))];
  const totalHours = list.reduce((s, t) => s + t.hours, 0);
  const grades = [...new Set(list.map((t) => t.grade).filter(Boolean))] as number[];

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow={BRAND_TRACK_STYLE[track].label}
        title="Cây chuyên đề"
        desc={`${list.length} chuyên đề · tổng thời lượng học đề xuất khoảng ${totalHours} giờ. Cột “tần suất” là ước lượng mức độ xuất hiện trong đề — dùng để xếp thứ tự ưu tiên.`}
      />

      <Card className="flex flex-wrap items-end gap-3 p-4">
        <label className="min-w-[180px] flex-1">
          <span className="text-[11.5px] font-bold text-slate-600">Tìm chuyên đề</span>
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-[13px]"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Viète, đạo hàm, số nguyên tố…"
          />
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            className={`chip ${!strand ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600'}`}
            onClick={() => setStrand('')}
          >
            Tất cả
          </button>
          {STRANDS.filter((s) => strandsHere.includes(s.id)).map((s) => (
            <button
              key={s.id}
              className="chip"
              style={
                strand === s.id
                  ? { background: s.color, color: '#fff' }
                  : { background: `${s.color}14`, color: s.color }
              }
              onClick={() => setStrand(strand === s.id ? '' : s.id)}
            >
              {s.short}
            </button>
          ))}
        </div>
      </Card>

      {grades.length > 0 ? (
        grades.map((g) => (
          <div key={g}>
            <h3 className="mb-3 text-[13px] font-extrabold uppercase tracking-wide text-slate-400">
              Lớp {g}
            </h3>
            <TopicGrid list={list.filter((t) => t.grade === g)} />
          </div>
        ))
      ) : (
        <TopicGrid list={list} />
      )}

      {list.filter((t) => !t.grade).length > 0 && grades.length > 0 && (
        <div>
          <h3 className="mb-3 text-[13px] font-extrabold uppercase tracking-wide text-slate-400">
            Xuyên suốt
          </h3>
          <TopicGrid list={list.filter((t) => !t.grade)} />
        </div>
      )}
    </div>
  );
}

function TopicGrid({ list }: { list: typeof TOPICS }) {
  if (!list.length) return <Empty title="Không có chuyên đề nào" desc="Thử đổi bộ lọc." />;
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {list.map((t) => {
        const s = strandById(t.strand);
        return (
          <Card key={t.id} className="cursor-pointer p-5 transition hover:border-slate-300" as="article">
            <button className="w-full text-left" onClick={() => go(`/topics/${t.id}`)}>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge style={{ background: `${s.color}14`, color: s.color }}>{s.short}</Badge>
                <LevelDots level={t.level} />
                <span className="text-[11.5px] font-semibold text-slate-400">{t.hours} giờ</span>
              </div>
              <h3 className="text-[15px] font-extrabold leading-snug text-slate-900">{t.name}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{t.summary}</p>
              <div className="mt-3">
                <Progress value={t.frequency} height={5} tone={s.color} label="Tần suất trong đề" />
              </div>
            </button>
          </Card>
        );
      })}
    </div>
  );
}

export function TopicDetail({ id }: { id: string }) {
  const topic = topicById(id);
  const [tier, setTier] = useState(3);

  if (!topic) {
    return (
      <Empty
        title="Không tìm thấy chuyên đề"
        desc="Mã chuyên đề không hợp lệ."
        action={
          <button className="btn-primary" onClick={() => go('/topics')}>
            Về cây chuyên đề
          </button>
        }
      />
    );
  }

  const s = strandById(topic.strand);
  const questions = questionsByTopic(topic.id);
  const missions = MISSIONS.filter((m) => m.topicId === topic.id);
  const prereqs = topic.prerequisites.map(topicById).filter(Boolean);
  const nextTopics = TOPICS.filter((t) => t.prerequisites.includes(topic.id));
  const activeTier = TIERS.find((t) => t.id === tier)!;

  const tierMaterials: Record<number, string[]> = {
    1: [`Sơ đồ khái niệm của “${topic.name}”`, 'Bộ thẻ công thức cắt rời', 'Bảng thuật ngữ và ký hiệu'],
    2: ['Bài giảng mẫu có chú giải từng bước', 'Ví dụ kèm phản ví dụ để thấy rõ điều kiện áp dụng'],
    3: [`${missions.length} nhiệm vụ luyện gắn với chuyên đề này`, 'Bảng lỗi thường gặp', 'Bài tập tăng dần độ khó'],
    4: ['Phiếu trộn dạng và đề tính giờ', 'Ngân hàng biến thể khó & bẫy quen thuộc', 'Barem chấm theo bước'],
    5: ['Hướng dẫn tự soạn đề kèm barem', 'Khung bài giảng để giảng lại cho nhóm', 'Gợi ý dự án ứng dụng'],
  };

  return (
    <div className="space-y-5">
      <button className="text-[13px] font-semibold text-brand-700" onClick={() => go('/topics')}>
        ← Cây chuyên đề
      </button>

      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge style={{ background: `${s.color}14`, color: s.color }}>{s.name}</Badge>
          {topic.grade && <Badge tone="brand">Lớp {topic.grade}</Badge>}
          <LevelDots level={topic.level} />
          <Badge>{topic.hours} giờ học đề xuất</Badge>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">{topic.name}</h1>
        <p className="mt-2 text-[14.5px] leading-relaxed text-slate-700">{topic.summary}</p>
        <div className="mt-4 max-w-sm">
          <Progress value={topic.frequency} tone={s.color} label="Tần suất xuất hiện trong đề" />
        </div>
      </Card>

      {/* Phân tầng tài liệu */}
      <Card className="p-6">
        <h2 className="text-[16px] font-extrabold text-slate-900">Tài liệu theo tầng hấp thu</h2>
        <p className="mt-1 text-[12.5px] text-slate-500">
          Chọn tầng bạn đang ở để nhận đúng loại tài liệu — học sai tầng là nguyên nhân phổ biến khiến
          học nhiều mà không tiến bộ.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {TIERS.map((t) => (
            <button
              key={t.id}
              className="chip"
              style={
                tier === t.id
                  ? { background: t.color, color: '#fff' }
                  : { background: `${t.color}14`, color: t.color }
              }
              onClick={() => setTier(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-slate-50 p-4">
          <div className="text-[13.5px] font-bold text-slate-900">{activeTier.descriptor}</div>
          <ul className="mt-3 space-y-1.5">
            {tierMaterials[tier].map((m) => (
              <li key={m} className="flex gap-2 text-[13px] text-slate-700">
                <span className="text-slate-400">❐</span>
                {m}
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-slate-200 pt-3 text-[12.5px] leading-relaxed text-slate-600">
            <b className="text-slate-800">Giáo viên nên làm:</b> {activeTier.teacherMove}
            <br />
            <b className="text-slate-800">Tiêu chí lên tầng:</b> {activeTier.exitCriteria}
          </div>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="text-[15px] font-extrabold text-slate-900">Chuẩn đầu ra</h3>
          <ul className="mt-3 space-y-2">
            {topic.outcomes.map((o) => (
              <li key={o} className="flex gap-2 text-[13px] leading-relaxed text-slate-700">
                <span className="mt-0.5 text-emerald-600">✔</span>
                {o}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h3 className="text-[15px] font-extrabold text-slate-900">Lỗi thường gặp</h3>
          <ul className="mt-3 space-y-2">
            {topic.pitfalls.map((p) => (
              <li key={p} className="flex gap-2 text-[13px] leading-relaxed text-slate-700">
                <span className="mt-0.5 text-rose-500">✕</span>
                {p}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="text-[15px] font-extrabold text-slate-900">Kỹ thuật cốt lõi</h3>
        <ul className="mt-3 space-y-2">
          {topic.techniques.map((t) => (
            <li key={t} className="flex gap-2.5 text-[13.5px] leading-relaxed text-slate-700">
              <span className="mt-0.5 shrink-0 text-brand-600">▸</span>
              <MathText>{t}</MathText>
            </li>
          ))}
        </ul>
      </Card>

      {topic.keyFormulas && (
        <Card className="p-5">
          <h3 className="text-[15px] font-extrabold text-slate-900">Công thức cần thuộc</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {topic.keyFormulas.map((f) => (
              <div
                key={f}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-serif text-[14px] text-slate-800"
              >
                <MathText>{f}</MathText>
              </div>
            ))}
          </div>
        </Card>
      )}

      {(prereqs.length > 0 || nextTopics.length > 0) && (
        <Card className="p-5">
          <h3 className="text-[15px] font-extrabold text-slate-900">Vị trí trong cây kiến thức</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                Cần học trước
              </div>
              {prereqs.length ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {prereqs.map((p) => (
                    <button key={p!.id} className="chip bg-slate-100 text-slate-700" onClick={() => go(`/topics/${p!.id}`)}>
                      {p!.name}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-[12.5px] text-slate-500">Không có — đây là chuyên đề gốc.</p>
              )}
            </div>
            <div>
              <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                Mở ra chuyên đề
              </div>
              {nextTopics.length ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {nextTopics.map((p) => (
                    <button key={p.id} className="chip bg-brand-50 text-brand-800" onClick={() => go(`/topics/${p.id}`)}>
                      {p.name}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-[12.5px] text-slate-500">Đây là chuyên đề ngọn.</p>
              )}
            </div>
          </div>
        </Card>
      )}

      {questions.length > 0 && (
        <Card className="p-5">
          <h3 className="text-[15px] font-extrabold text-slate-900">
            Bài mẫu có lời giải chi tiết ({questions.length})
          </h3>
          <div className="mt-3 space-y-3">
            {questions.map((q) => (
              <details key={q.id} className="rounded-xl border border-slate-200 p-4">
                <summary className="cursor-pointer">
                  <span className="text-[12px] font-bold text-brand-700">{q.source}</span>
                  <p className="prose-math mt-1.5 font-medium text-slate-800">
                    <MathText>{q.statement}</MathText>
                  </p>
                </summary>
                <Callout tone="amber" title="Gợi ý">
                  <MathText>{q.hint}</MathText>
                </Callout>
                <ol className="mt-3 space-y-1.5 border-l-2 border-brand-200 pl-4">
                  {q.solution.map((line, i) => (
                    <li key={i} className="prose-math text-[13px]">
                      <MathText>{line}</MathText>
                    </li>
                  ))}
                </ol>
                <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-[13px] font-semibold text-emerald-800">
                  Đáp số: <MathText>{q.answer}</MathText>
                </div>
                {q.barem && (
                  <div className="mt-2 rounded-xl bg-slate-50 p-3">
                    <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                      Barem chấm
                    </div>
                    <ul className="mt-1 space-y-0.5">
                      {q.barem.map((b) => (
                        <li key={b} className="text-[12.5px] text-slate-600">
                          • {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </details>
            ))}
          </div>
        </Card>
      )}

      {missions.length > 0 && (
        <Card className="p-5">
          <h3 className="text-[15px] font-extrabold text-slate-900">
            {missions.length} nhiệm vụ luyện gắn với chuyên đề này
          </h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {missions.slice(0, 24).map((m) => (
              <button
                key={m.id}
                className="chip bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-800"
                onClick={() => go(`/mission/${m.id}`)}
              >
                {m.id} · L{m.level}
              </button>
            ))}
            {missions.length > 24 && (
              <span className="chip bg-slate-50 text-slate-400">+{missions.length - 24} nữa</span>
            )}
          </div>
        </Card>
      )}

      {questions.length === 0 && QUESTIONS.length > 0 && (
        <p className="text-[12.5px] text-slate-500">
          Chuyên đề này chưa có bài mẫu viết tay, nhưng đã có {missions.length} nhiệm vụ luyện với đề
          được sinh tự động kèm lời giải từng bước.
        </p>
      )}
    </div>
  );
}
