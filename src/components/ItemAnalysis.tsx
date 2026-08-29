import { go } from '@/state';
import { analysisFor } from '@/data/analysis';
import { topicById } from '@/data/topics';
import { strandById } from '@/data/schools';
import { TIPS, TIP_CATEGORY, type TipCategory } from '@/data/playbook';
import { Badge, MathText } from '@/components/ui';
import type { StrandId, TrackId } from '@/types';

/** Nhóm bí kíp phù hợp nhất với từng mạch kiến thức. */
const STRAND_TIP_CATEGORY: Record<StrandId, TipCategory> = {
  'dai-so': 'tinh-nhanh',
  'giai-tich': 'tinh-nhanh',
  'so-hoc': 'tu-duy',
  'to-hop': 'tu-duy',
  'bat-dang-thuc': 'tu-duy',
  'hinh-hoc': 'trinh-bay',
  'hinh-khong-gian': 'trinh-bay',
  'toa-do': 'trinh-bay',
  'thuc-te': 'phong-thi',
  'xac-suat': 'may-tinh',
};

export interface AnalysisTarget {
  generatorId: string;
  topicId: string;
  skill: string;
  steps: string[];
  choices: string[];
  correct: number;
  chosen?: number | null;
}

export function ItemAnalysis({
  item,
  track,
  showSolution = true,
  defaultOpen = false,
}: {
  item: AnalysisTarget;
  track: TrackId;
  showSolution?: boolean;
  defaultOpen?: boolean;
}) {
  const analysis = analysisFor(item.generatorId);
  const topic = topicById(item.topicId);
  const strand = topic ? strandById(topic.strand) : null;
  const tipCat = topic ? STRAND_TIP_CATEGORY[topic.strand] : 'tu-duy';
  const tips = TIPS.filter((t) => t.tracks.includes(track) && t.category === tipCat).slice(0, 2);

  return (
    <div className="space-y-3">
      {/* Đáp án */}
      <div className="rounded-xl bg-emerald-50 px-3.5 py-2.5">
        <div className="text-[11px] font-bold uppercase tracking-wide text-emerald-700">Đáp án đúng</div>
        <div className="mt-0.5 text-[13.5px] font-semibold text-emerald-900">
          {'ABCD'[item.correct]}. <MathText>{item.choices[item.correct]}</MathText>
        </div>
      </div>

      {item.chosen !== undefined && item.chosen !== null && item.chosen !== item.correct && (
        <div className="rounded-xl bg-rose-50 px-3.5 py-2.5">
          <div className="text-[11px] font-bold uppercase tracking-wide text-rose-700">Bạn đã chọn</div>
          <div className="mt-0.5 text-[13.5px] font-semibold text-rose-900">
            {'ABCD'[item.chosen]}. <MathText>{item.choices[item.chosen]}</MathText>
          </div>
        </div>
      )}

      {/* Lời giải từng bước */}
      {showSolution && (
        <div>
          <div className="mb-1.5 text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
            Lời giải từng bước
          </div>
          <ol className="space-y-1.5 border-l-2 border-brand-200 pl-4">
            {item.steps.map((s, i) => (
              <li key={i} className="prose-math text-[13px]">
                <span className="mr-1.5 font-bold text-brand-500">{i + 1}.</span>
                <MathText>{s}</MathText>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Phân tích dạng bài */}
      {analysis && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <Badge tone="brand">Phân tích dạng bài</Badge>
            {strand && (
              <Badge style={{ background: `${strand.color}14`, color: strand.color }}>
                {strand.name}
              </Badge>
            )}
            <Badge>{item.skill}</Badge>
          </div>

          <Block label="Dấu hiệu nhận dạng">{analysis.recognize}</Block>

          <div className="mt-3">
            <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
              Quy trình giải chuẩn
            </div>
            <ol className="mt-1.5 space-y-1">
              {analysis.method.map((m, i) => (
                <li key={i} className="text-[12.5px] leading-relaxed text-slate-700">
                  <span className="mr-1.5 font-bold text-slate-400">Bước {i + 1}.</span>
                  <MathText>{m}</MathText>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-3">
            <div className="text-[11.5px] font-bold uppercase tracking-wide text-rose-500">
              Bẫy & lỗi hay mắc
            </div>
            <ul className="mt-1.5 space-y-1">
              {analysis.traps.map((t) => (
                <li key={t} className="text-[12.5px] leading-relaxed text-slate-700">
                  ✕ <MathText>{t}</MathText>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-3">
              <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                Liên hệ đề thi thật
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-700">{analysis.transfer}</p>
            </div>
            <div className="rounded-xl bg-white p-3">
              <div className="text-[11px] font-bold uppercase tracking-wide text-emerald-600">
                Dấu hiệu đã thành thạo
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-700">{analysis.mastery}</p>
            </div>
          </div>
        </div>
      )}

      {/* Kiến thức liên quan */}
      {topic && (
        <details className="rounded-2xl border border-slate-200 p-4" open={defaultOpen}>
          <summary className="cursor-pointer text-[13px] font-extrabold text-slate-800">
            Kiến thức liên quan · {topic.name}
          </summary>

          <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{topic.summary}</p>

          {topic.keyFormulas && topic.keyFormulas.length > 0 && (
            <div className="mt-3">
              <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                Công thức cần thuộc
              </div>
              <div className="mt-1.5 grid gap-1.5 sm:grid-cols-2">
                {topic.keyFormulas.map((f) => (
                  <div
                    key={f}
                    className="rounded-lg bg-slate-50 px-2.5 py-1.5 font-serif text-[13px] text-slate-800"
                  >
                    <MathText>{f}</MathText>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                Kỹ thuật cốt lõi của chuyên đề
              </div>
              <ul className="mt-1.5 space-y-1">
                {topic.techniques.slice(0, 4).map((t) => (
                  <li key={t} className="text-[12.5px] leading-relaxed text-slate-700">
                    ▸ <MathText>{t}</MathText>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                Lỗi thường gặp của chuyên đề
              </div>
              <ul className="mt-1.5 space-y-1">
                {topic.pitfalls.slice(0, 4).map((t) => (
                  <li key={t} className="text-[12.5px] leading-relaxed text-slate-700">
                    ✕ <MathText>{t}</MathText>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {tips.length > 0 && (
            <div className="mt-3">
              <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                Bí kíp cùng nhóm kỹ năng · {TIP_CATEGORY[tipCat].label}
              </div>
              <div className="mt-1.5 space-y-1.5">
                {tips.map((t) => (
                  <div key={t.id} className="rounded-lg bg-amber-50 px-3 py-2">
                    <div className="text-[12.5px] font-bold text-amber-900">{t.title}</div>
                    <div className="text-[12px] leading-relaxed text-amber-800">
                      <MathText>{t.body}</MathText>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            <button className="btn-soft py-1.5 text-[12.5px]" onClick={() => go(`/topics/${topic.id}`)}>
              Mở chuyên đề đầy đủ →
            </button>
          </div>
        </details>
      )}
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">{label}</div>
      <p className="mt-1 text-[12.5px] leading-relaxed text-slate-700">{children}</p>
    </div>
  );
}
