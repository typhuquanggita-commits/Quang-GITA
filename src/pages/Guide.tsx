import { useApp, go } from '@/state';
import { topicById } from '@/data/topics';
import { strandById } from '@/data/schools';
import { sheetsOfTopic, generatorsOfTopic, missionByWorksheet, stageForTopic } from '@/data/catalog';
import { SHEET_TYPES, COMPANION_SHEETS, sheetSpec } from '@/data/sheets';
import { DRILL_ANALYSIS } from '@/data/analysis';
import { TIERS } from '@/data/gita';
import { questionsByTopic } from '@/data/questions';
import { BRAND_TRACK_STYLE } from '@/data/brand';
import { Card, SectionTitle, Badge, Progress, MathText, Empty, Callout, LevelDots } from '@/components/ui';
import type { TrackId } from '@/types';

/** Phiếu hướng dẫn ôn chắc chuyên đề — mã …-HD. */
export default function Guide({ topicId }: { topicId: string }) {
  const { state } = useApp();
  const topic = topicById(topicId);
  const track: TrackId = (topic?.tracks.includes(state.profile?.track ?? 'thpt')
    ? (state.profile?.track ?? 'thpt')
    : topic?.tracks[0]) as TrackId;

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
  const packs = sheetsOfTopic(track, topic.id);
  const gens = generatorsOfTopic(track, topic.id);
  const stage = stageForTopic(track, topic.level, topic.grade);
  const samples = questionsByTopic(topic.id);

  const masteryChecklist = [
    ...topic.outcomes.map((o) => ({ text: o, src: 'Chuẩn đầu ra' })),
    ...gens
      .map((g) => DRILL_ANALYSIS[g.id])
      .filter(Boolean)
      .map((a) => ({ text: a.mastery, src: 'Dấu hiệu thành thạo dạng bài' })),
  ];

  const totalSheets = packs.reduce((n, p) => n + p.sheets.length, 0);
  const passedSheets = packs
    .flatMap((p) => p.sheets)
    .filter((w) => {
      const m = missionByWorksheet(w.id);
      return m && state.missionStatus[m.id]?.passed;
    }).length;

  return (
    <div className="space-y-5">
      <div className="no-print flex flex-wrap gap-3">
        <button className="text-[13px] font-semibold text-brand-700" onClick={() => go('/topics')}>
          ← Cây chuyên đề
        </button>
        <button
          className="text-[13px] font-semibold text-brand-700"
          onClick={() => go(`/topics/${topic.id}`)}
        >
          Trang chuyên đề →
        </button>
      </div>

      <SectionTitle
        eyebrow={`Phiếu hướng dẫn · ${BRAND_TRACK_STYLE[track].label}`}
        title={`Ôn chắc chuyên đề: ${topic.name}`}
        desc="Phiếu này trả lời đúng một câu hỏi: học chuyên đề này theo thứ tự nào, và làm sao biết mình đã ôn chắc thật sự."
        right={
          <button className="btn-ghost no-print py-2 text-[12.5px]" onClick={() => window.print()}>
            In phiếu hướng dẫn
          </button>
        }
      />

      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge style={{ background: `${s.color}14`, color: s.color }}>{s.name}</Badge>
          {topic.grade && <Badge tone="brand">Lớp {topic.grade}</Badge>}
          <LevelDots level={topic.level} />
          <Badge>{topic.hours} giờ học đề xuất</Badge>
          <Badge>{stage.name}</Badge>
        </div>
        <p className="mt-3 text-[14px] leading-relaxed text-slate-700">{topic.summary}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <Progress value={topic.frequency} tone={s.color} label="Tần suất xuất hiện trong đề" />
          </div>
          <div>
            <Progress
              value={(passedSheets / Math.max(1, totalSheets)) * 100}
              label={`Đã đạt chuẩn ${passedSheets}/${totalSheets} phiếu`}
              tone="#047857"
            />
          </div>
          <div className="text-[12.5px] leading-relaxed text-slate-600">
            Bộ phiếu gồm <b>{packs.length} đợt</b>, mỗi đợt <b>{SHEET_TYPES.length} phiếu</b> theo đúng
            thứ tự sư phạm.
          </div>
        </div>
      </Card>

      {/* Thứ tự học */}
      <Card className="p-5">
        <h2 className="text-[16px] font-extrabold text-slate-900">Thứ tự học sáu phiếu</h2>
        <p className="mt-1 text-[12.5px] text-slate-500">
          Không nhảy cóc. Mỗi phiếu chỉ mở khoá giá trị của nó khi phiếu trước đã đạt chuẩn.
        </p>
        <div className="mt-4 space-y-2.5">
          {SHEET_TYPES.map((spec) => {
            const sheet = packs[0]?.sheets.find((w) => w.sheetType === spec.id);
            const mission = sheet ? missionByWorksheet(sheet.id) : undefined;
            const passed = mission ? state.missionStatus[mission.id]?.passed : false;
            return (
              <div key={spec.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-sm font-extrabold text-white"
                    style={{ background: spec.color }}
                  >
                    {spec.order}
                  </span>
                  <h3 className="text-[14.5px] font-extrabold text-slate-900">{spec.name}</h3>
                  <Badge>{spec.items} câu · {spec.minutes} phút</Badge>
                  <Badge tone="brand">KPI ≥ {spec.kpiTarget}%</Badge>
                  {passed && <Badge tone="green">✓ Đã đạt</Badge>}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-700">{spec.purpose}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-emerald-800">
                  <b>Đạt phiếu này khi:</b> {spec.outcome}
                </p>
                <div className="no-print mt-2 flex flex-wrap gap-2">
                  {mission && (
                    <button
                      className="chip bg-brand-50 text-brand-800 hover:bg-brand-100"
                      onClick={() => go(`/mission/${mission.id}`)}
                    >
                      Làm {mission.id}
                    </button>
                  )}
                  {sheet && (
                    <button
                      className="chip bg-slate-100 text-slate-700 hover:bg-slate-200"
                      onClick={() => go(`/solution/${sheet.id}`)}
                    >
                      Phiếu lời giải {sheet.id}-LG
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Lộ trình 5 tầng */}
      <Card className="p-5">
        <h2 className="text-[16px] font-extrabold text-slate-900">
          Lộ trình năm tầng cho riêng chuyên đề này
        </h2>
        <div className="mt-3 space-y-2">
          {TIERS.map((t, i) => (
            <div key={t.id} className="flex gap-3 rounded-xl bg-slate-50 p-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[12px] font-extrabold text-white"
                style={{ background: t.color }}
              >
                {t.id}
              </span>
              <div className="min-w-0">
                <div className="text-[13px] font-extrabold text-slate-900">
                  {t.name} — {SHEET_TYPES[Math.min(i, SHEET_TYPES.length - 1)].short}
                </div>
                <div className="text-[12.5px] leading-relaxed text-slate-600">{t.descriptor}</div>
                <div className="mt-0.5 text-[12px] leading-relaxed text-brand-800">
                  Lên tầng khi: {t.exitCriteria}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Checklist ôn chắc */}
      <Card className="p-5">
        <h2 className="text-[16px] font-extrabold text-slate-900">Checklist “ôn chắc”</h2>
        <p className="mt-1 text-[12.5px] text-slate-500">
          Chỉ coi là xong chuyên đề khi tự đánh dấu được toàn bộ các mục dưới đây.
        </p>
        <ul className="mt-3 space-y-2">
          {masteryChecklist.map((c, i) => (
            <li key={i} className="flex gap-2.5 rounded-xl border border-slate-200 p-3">
              <span className="mt-0.5 text-slate-300">☐</span>
              <div className="min-w-0">
                <div className="text-[13px] leading-relaxed text-slate-800">
                  <MathText>{c.text}</MathText>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  {c.src}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Kiến thức lõi */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="text-[15px] font-extrabold text-slate-900">Kỹ thuật cốt lõi</h3>
          <ul className="mt-3 space-y-2">
            {topic.techniques.map((t) => (
              <li key={t} className="text-[13px] leading-relaxed text-slate-700">
                ▸ <MathText>{t}</MathText>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-5">
          <h3 className="text-[15px] font-extrabold text-slate-900">Lỗi thường gặp</h3>
          <ul className="mt-3 space-y-2">
            {topic.pitfalls.map((t) => (
              <li key={t} className="text-[13px] leading-relaxed text-slate-700">
                ✕ <MathText>{t}</MathText>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {topic.keyFormulas && (
        <Card className="p-5">
          <h3 className="text-[15px] font-extrabold text-slate-900">Công thức phải thuộc</h3>
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

      {/* Các dạng bài của chuyên đề */}
      <Card className="p-5">
        <h2 className="text-[16px] font-extrabold text-slate-900">
          Các dạng bài của chuyên đề ({gens.length})
        </h2>
        <div className="mt-3 space-y-2.5">
          {gens.map((g) => {
            const a = DRILL_ANALYSIS[g.id];
            return (
              <div key={g.id} className="rounded-xl border border-slate-200 p-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[13.5px] font-extrabold text-slate-900">{g.name}</span>
                  <LevelDots level={g.level} />
                  <Badge>{g.skill}</Badge>
                </div>
                {a && (
                  <>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">
                      <b className="text-slate-800">Nhận dạng:</b> {a.recognize}
                    </p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-rose-700">
                      <b>Bẫy chính:</b> {a.traps[0]}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Lịch ôn lại */}
      <Card className="p-5">
        <h2 className="text-[16px] font-extrabold text-slate-900">Lịch ôn lại 1 – 3 – 7 – 21</h2>
        <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
          Học xong chuyên đề chưa phải là nhớ chuyên đề. Đặt bốn mốc ôn lại sau đây, mỗi lần chỉ 10–15
          phút, hiệu quả hơn nhiều so với ôn dồn trước kỳ thi.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-4">
          {[
            ['Sau 1 ngày', 'Gấp vở, viết lại công thức và quy trình từ trí nhớ.'],
            ['Sau 3 ngày', 'Làm lại 3 câu đã sai ở phiếu Dạng bài và Kỹ năng.'],
            ['Sau 7 ngày', 'Làm lại phiếu Ôn thi với bản đề mới.'],
            ['Sau 21 ngày', 'Làm phiếu Thi tính giờ; đạt chuẩn thì coi như đã ôn chắc.'],
          ].map(([when, what]) => (
            <div key={when} className="rounded-xl bg-slate-50 p-3">
              <div className="text-[12px] font-extrabold text-brand-700">{when}</div>
              <div className="mt-1 text-[12.5px] leading-relaxed text-slate-700">{what}</div>
            </div>
          ))}
        </div>
      </Card>

      {samples.length > 0 && (
        <Card className="p-5">
          <h2 className="text-[16px] font-extrabold text-slate-900">
            Bài mẫu có lời giải mẫu mực ({samples.length})
          </h2>
          <div className="mt-3 space-y-3">
            {samples.map((q) => (
              <details key={q.id} className="rounded-xl border border-slate-200 p-4">
                <summary className="cursor-pointer">
                  <span className="text-[12px] font-bold text-brand-700">{q.source}</span>
                  <p className="prose-math mt-1.5 font-medium text-slate-800">
                    <MathText>{q.statement}</MathText>
                  </p>
                </summary>
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
              </details>
            ))}
          </div>
        </Card>
      )}

      <Callout tone="brand" title="Hai phiếu đi kèm của bộ phiếu chuyên đề">
        <div className="mt-1 space-y-2">
          {COMPANION_SHEETS.map((c) => (
            <div key={c.code}>
              <b>
                {c.name} (mã …-{c.code})
              </b>{' '}
              — {c.scope}. Gồm: {c.contains.join('; ')}.
            </div>
          ))}
        </div>
      </Callout>

      {packs.length > 1 && (
        <Card className="p-5">
          <h2 className="text-[16px] font-extrabold text-slate-900">
            Toàn bộ {packs.length} đợt của bộ phiếu
          </h2>
          <p className="mt-1 text-[12.5px] text-slate-500">
            Mỗi đợt là một bộ sáu phiếu độc lập với nội dung khác nhau — dùng để ôn lại theo lịch
            1–3–7–21 mà không lặp lại đề cũ.
          </p>
          <div className="mt-3 space-y-2">
            {packs.map((p) => (
              <div key={p.pack} className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-50 p-3">
                <span className="mr-1 text-[12.5px] font-extrabold text-slate-700">Đợt {p.pack}</span>
                {p.sheets.map((w) => {
                  const m = missionByWorksheet(w.id);
                  const done = m && state.missionStatus[m.id]?.passed;
                  return (
                    <button
                      key={w.id}
                      className="chip"
                      style={{
                        background: done ? '#d1fae5' : `${sheetSpec(w.sheetType).color}14`,
                        color: done ? '#047857' : sheetSpec(w.sheetType).color,
                      }}
                      onClick={() => m && go(`/mission/${m.id}`)}
                    >
                      {done ? '✓ ' : ''}
                      {sheetSpec(w.sheetType).code} · {w.id}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
