import { useState } from 'react';
import { go, useApp } from '@/state';
import { EXAM_PAPERS, paperById, paperItems, paperStats, paperMatrix } from '@/data/papers';
import { blueprintById } from '@/data/blueprints';
import { SCHOOLS, strandById } from '@/data/schools';
import { BRAND_TRACK_STYLE, DOC_SHEET_IDENTITY } from '@/data/brand';
import { topicById } from '@/data/topics';
import { Card, SectionTitle, Badge, Callout, MathText, LevelDots } from '@/components/ui';
import { GitaLogo } from '@/components/Logo';
import type { ExamPaper, PaperItem, TrackId } from '@/types';

const DM = DOC_SHEET_IDENTITY.find((s) => s.code === 'DM')!;

const FORMAT_LABEL: Record<string, string> = {
  'tu-luan': 'Tự luận',
  'trac-nghiem': 'Trắc nghiệm 4 phương án',
  'dung-sai': 'Đúng / Sai — 4 ý',
  'tra-loi-ngan': 'Trả lời ngắn',
};

/* =============================== Danh sách đề =============================== */

export function PaperList() {
  const { state } = useApp();
  const initial: TrackId = state.profile?.track ?? 'thpt';
  const [track, setTrack] = useState<TrackId | 'all'>(initial);
  const list = track === 'all' ? EXAM_PAPERS : EXAM_PAPERS.filter((p) => p.track === track);

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Kho đề mẫu"
        title="Đề mẫu chuẩn cấu trúc"
        desc="Mỗi đề dưới đây là một đề trọn vẹn, dựng đúng theo ma trận của kỳ thi tương ứng — đủ số bài, đúng thang điểm, đúng thời gian, kèm lời giải từng bước, barem chấm và bảng phân tích chi tiết cho từng câu."
      />

      <Callout tone="amber" title="Đề mẫu, không phải đề thi thật">
        Đây là đề do MATH365 biên soạn theo cấu trúc thống kê của các mùa thi gần đây, dùng để luyện
        tập và tự đánh giá. Cấu trúc đề chính thức có thể thay đổi giữa các mùa — luôn đối chiếu với
        công bố mới nhất ở trang <button className="font-semibold underline" onClick={() => go('/exams')}>Kỳ thi &amp; Cấu trúc đề</button>.
      </Callout>

      <div className="flex flex-wrap gap-2">
        {(['all', 'chuyen', 'thpt', 'thpt-qg'] as const).map((t) => {
          const st = t === 'all' ? null : BRAND_TRACK_STYLE[t];
          const on = track === t;
          return (
            <button
              key={t}
              className="chip"
              style={
                on
                  ? { background: st?.color ?? '#0F172A', color: '#fff' }
                  : { background: '#eef1f6', color: '#334155' }
              }
              onClick={() => setTrack(t)}
            >
              {st ? `${st.icon} ${st.label}` : `Tất cả (${EXAM_PAPERS.length})`}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {list.map((p) => {
          const st = paperStats(p);
          const style = BRAND_TRACK_STYLE[p.track];
          const school = SCHOOLS.find((s) => s.id === p.schoolId);
          return (
            <Card key={p.id} className="overflow-hidden">
              <div className="h-1.5" style={{ background: style.color }} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: style.color }}>
                      {DM.glyph} {p.code}
                    </div>
                    <div className="mt-1 text-[16px] font-extrabold leading-tight text-slate-900">
                      {p.title}
                    </div>
                    <div className="mt-0.5 text-[12.5px] text-slate-600">{p.subtitle}</div>
                  </div>
                  <GitaLogo size={26} variant="mark" />
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Badge tone="brand">{p.minutes} phút</Badge>
                  <Badge tone="slate">Thang {p.totalPoints}</Badge>
                  <Badge tone="slate">{st.items} câu</Badge>
                  {st.claims > 0 && <Badge tone="slate">{st.claims} ý đúng/sai</Badge>}
                  <Badge tone="green">{st.steps} bước giải</Badge>
                  <Badge tone="amber">{st.baremRows} dòng barem</Badge>
                </div>

                <div className="mt-3 text-[12.5px] leading-relaxed text-slate-600">
                  {school?.name} · {st.strands.length} mạch kiến thức · {st.topics.length} chuyên đề liên quan
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="btn btn-primary text-sm" onClick={() => go(`/paper/${p.id}`)}>
                    Mở đề
                  </button>
                  <button className="btn btn-ghost text-sm" onClick={() => go('/exams')}>
                    Xem ma trận
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* =============================== Chi tiết một đề =============================== */

type Tab = 'de' | 'giai' | 'phan-tich' | 'ma-tran';

const TABS: { id: Tab; label: string; hint: string }[] = [
  { id: 'de', label: 'Đề thi', hint: 'Làm bài trước — tính giờ đúng như thi thật.' },
  { id: 'giai', label: 'Lời giải & Barem', hint: 'Đáp án, lời giải từng bước và thang chấm từng 0,25đ.' },
  { id: 'phan-tich', label: 'Bảng phân tích', hint: 'Dạng bài · đọc vị · phương pháp · bẫy · bí kíp.' },
  { id: 'ma-tran', label: 'Ma trận & Chiến thuật', hint: 'Đối chiếu với cấu trúc thật, kế hoạch thời gian, đọc điểm.' },
];

export function PaperView({ id }: { id: string }) {
  const paper = paperById(id);
  const [tab, setTab] = useState<Tab>('de');
  const [openAll, setOpenAll] = useState(false);

  if (!paper) {
    return (
      <Card className="p-8 text-center">
        <div className="text-sm font-bold text-slate-900">Không tìm thấy đề mẫu này</div>
        <button className="btn btn-primary mt-4 text-sm" onClick={() => go('/papers')}>
          Về kho đề mẫu
        </button>
      </Card>
    );
  }

  const style = BRAND_TRACK_STYLE[paper.track];
  const bp = blueprintById(paper.blueprintId);
  const st = paperStats(paper);

  return (
    <div className="space-y-5">
      <PaperHeader paper={paper} />

      <div className="no-print flex flex-wrap items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            className="chip"
            style={
              tab === t.id
                ? { background: style.color, color: '#fff' }
                : { background: '#eef1f6', color: '#334155' }
            }
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
        <span className="ml-auto text-[12px] text-slate-500">
          {TABS.find((t) => t.id === tab)?.hint}
        </span>
      </div>

      {tab === 'de' && (
        <>
          <Callout tone="brand" title="Cách dùng đề này cho đúng">
            Làm trọn đề trong {paper.minutes} phút, không mở tab lời giải. Chấm xong mới sang tab
            “Lời giải &amp; Barem”, rồi bắt buộc đọc tab “Bảng phân tích” cho những câu đã sai — đó là
            nơi chứa dấu hiệu đọc vị và bí kíp của từng dạng.
          </Callout>
          {paper.parts.map((part) => (
            <Card key={part.label} className="overflow-hidden">
              <PartHeader label={part.label} points={part.points} note={part.note} color={style.color} />
              <div className="divide-y divide-slate-100">
                {part.items.map((it) => (
                  <QuestionBlock key={it.id} item={it} color={style.color} />
                ))}
              </div>
            </Card>
          ))}
        </>
      )}

      {tab === 'giai' && (
        <>
          <div className="no-print flex items-center justify-between gap-3">
            <Callout tone="green" title="Đọc lời giải đúng cách">
              Đừng đọc lời giải như đọc đáp án. Với mỗi câu sai, hãy dừng ở dòng đầu tiên mà em không
              tự nghĩ ra được — đó chính là chỗ hổng cần vá, và bảng phân tích ở tab bên cạnh nói rõ
              cách vá.
            </Callout>
          </div>
          <button
            className="btn btn-ghost no-print text-sm"
            onClick={() => setOpenAll((v) => !v)}
          >
            {openAll ? 'Thu gọn tất cả' : 'Mở tất cả lời giải'}
          </button>
          {paper.parts.map((part) => (
            <Card key={part.label} className="overflow-hidden">
              <PartHeader label={part.label} points={part.points} note={part.note} color={style.color} />
              <div className="divide-y divide-slate-100">
                {part.items.map((it) => (
                  <SolutionBlock key={it.id} item={it} color={style.color} forceOpen={openAll} />
                ))}
              </div>
            </Card>
          ))}
          <Card className="p-5">
            <div className="text-sm font-bold text-slate-900">Lưu ý chấm bài</div>
            <ul className="mt-2.5 space-y-1.5">
              {paper.gradingNotes.map((g, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}

      {tab === 'phan-tich' && (
        <>
          <Callout tone="brand" title="Bảng phân tích là phần đáng giá nhất của bộ đề">
            Lời giải chỉ giúp em qua được một câu. Bảng phân tích giúp em qua được cả một dạng: nhận ra
            dạng từ dấu hiệu trong đề, đi theo quy trình chuẩn, tránh đúng những bẫy mà người ra đề
            cài sẵn.
          </Callout>
          {paperItems(paper).map((it) => (
            <AnalysisBlock key={it.id} item={it} color={style.color} />
          ))}
        </>
      )}

      {tab === 'ma-tran' && (
        <>
          <Card className="p-5">
            <div className="text-sm font-bold text-slate-900">Đề này bám cấu trúc thật ở chỗ nào</div>
            <ul className="mt-2.5 space-y-1.5">
              {paper.fidelity.map((f, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: style.color }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="text-sm font-bold text-slate-900">Ma trận dựng ngược từ chính đề</div>
              {bp && (
                <button className="text-[12.5px] font-semibold text-brand-700 underline" onClick={() => go('/exams')}>
                  Đối chiếu ma trận gốc: {bp.title}
                </button>
              )}
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-[13px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
                    <th className="py-2 pr-3">Phần</th>
                    <th className="py-2 pr-3">Điểm</th>
                    <th className="py-2 pr-3">Số câu</th>
                    <th className="py-2 pr-3">Phút</th>
                    <th className="py-2 pr-3">Mạch kiến thức</th>
                    <th className="py-2">Mức độ</th>
                  </tr>
                </thead>
                <tbody>
                  {paperMatrix(paper).map((row) => (
                    <tr key={row.label} className="border-b border-slate-100 last:border-0 align-top">
                      <td className="py-2 pr-3 font-semibold text-slate-800">{row.label}</td>
                      <td className="py-2 pr-3 tabular-nums font-bold" style={{ color: style.color }}>
                        {row.points.toLocaleString('vi-VN')}
                      </td>
                      <td className="py-2 pr-3 tabular-nums text-slate-600">{row.count}</td>
                      <td className="py-2 pr-3 tabular-nums text-slate-600">{row.minutes}</td>
                      <td className="py-2 pr-3">
                        <div className="flex flex-wrap gap-1">
                          {row.strands.map((s) => (
                            <Badge key={s} tone="slate">
                              {strandById(s)?.short ?? s}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-2 text-slate-600">{row.levels.join(' · ')}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-slate-200">
                    <td className="py-2 pr-3 font-extrabold text-slate-900">Tổng</td>
                    <td className="py-2 pr-3 tabular-nums font-extrabold" style={{ color: style.color }}>
                      {st.points.toLocaleString('vi-VN')}
                    </td>
                    <td className="py-2 pr-3 tabular-nums font-bold text-slate-700">{st.items}</td>
                    <td className="py-2 pr-3 tabular-nums font-bold text-slate-700">{st.minutes}</td>
                    <td className="py-2 pr-3 text-slate-500">{st.strands.length} mạch</td>
                    <td className="py-2 text-slate-500">{st.topics.length} chuyên đề</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-bold text-slate-900">Kế hoạch thời gian trong phòng thi</div>
            <div className="mt-3 space-y-2">
              {paper.timePlan.map((t) => (
                <div key={t.phase} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg border border-slate-200 px-3 py-2">
                  <span className="text-[13px] font-bold text-slate-800">{t.phase}</span>
                  <span className="font-mono text-[11.5px] font-semibold" style={{ color: style.color }}>
                    phút {t.minutes}
                  </span>
                  <span className="w-full text-[12.5px] leading-relaxed text-slate-600 sm:w-auto sm:flex-1">
                    {t.action}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-bold text-slate-900">Đọc điểm của mình rồi làm gì tiếp</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {paper.scoreBands.map((b) => (
                <div key={b.band} className="rounded-xl border border-slate-200 p-4">
                  <div className="text-[15px] font-extrabold" style={{ color: style.color }}>
                    {b.band}
                  </div>
                  <div className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{b.meaning}</div>
                  <div className="mt-2 rounded-lg bg-brand-50 px-3 py-2 text-[12.5px] font-semibold leading-relaxed text-brand-800">
                    ➜ {b.next}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-bold text-slate-900">Chuyên đề liên quan trong đề này</div>
            <p className="mt-1 text-[12.5px] text-slate-600">
              Sai ở câu nào thì quay lại đúng bộ phiếu của chuyên đề đó — đó là đường ngắn nhất để
              không sai lại lần sau.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {st.topics.map((tid) => {
                const t = topicById(tid);
                if (!t) return null;
                return (
                  <button
                    key={tid}
                    className="chip bg-slate-100 text-slate-700 hover:bg-slate-200"
                    onClick={() => go(`/topics/${tid}`)}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

/* =============================== Khối dùng chung =============================== */

function PaperHeader({ paper }: { paper: ExamPaper }) {
  const style = BRAND_TRACK_STYLE[paper.track];
  const school = SCHOOLS.find((s) => s.id === paper.schoolId);
  const st = paperStats(paper);
  return (
    <Card className="overflow-hidden">
      <div className="h-1.5" style={{ background: style.color }} />
      <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 px-5 py-4" style={{ borderColor: style.color }}>
        <div className="flex items-center gap-3">
          <GitaLogo size={34} variant="mark" />
          <div className="leading-tight">
            <div className="text-[15px] font-extrabold tracking-tight text-brand-800">MATH365</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">GITA365</div>
          </div>
        </div>
        <div className="min-w-0 flex-1 text-center">
          <div className="text-[17px] font-extrabold leading-tight text-slate-900 sm:text-xl">
            {paper.title}
          </div>
          <div className="mt-0.5 text-[12.5px] text-slate-600">{paper.subtitle}</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: style.color }}>
            {paper.code}
          </div>
          <div className="text-[11px] font-semibold text-slate-500">Thời gian {paper.minutes} phút</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px bg-slate-100 text-center sm:grid-cols-4">
        {[
          { k: 'Kỳ thi', v: school?.shortName ?? '—' },
          { k: 'Thang điểm', v: String(paper.totalPoints) },
          { k: 'Số câu', v: `${st.items}${st.claims ? ` (+${st.claims} ý)` : ''}` },
          { k: 'Số phần', v: String(paper.parts.length) },
        ].map((c) => (
          <div key={c.k} className="bg-white px-2 py-2.5">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{c.k}</div>
            <div className="text-[14px] font-extrabold text-slate-900">{c.v}</div>
          </div>
        ))}
      </div>
      <div className="px-5 py-3" style={{ background: `${style.color}0D` }}>
        <div className="text-[12.5px] font-semibold" style={{ color: style.color }}>
          ◎ Mục tiêu của đề: làm được trọn vẹn trong {paper.minutes} phút, và với mỗi câu sai gọi
          đúng tên dạng bài của nó.
        </div>
      </div>
    </Card>
  );
}

function PartHeader({
  label,
  points,
  note,
  color,
}: {
  label: string;
  points: number;
  note: string;
  color: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-slate-200 bg-slate-50/70 px-5 py-3">
      <span className="text-[15px] font-extrabold" style={{ color }}>
        {label}
      </span>
      <span className="chip bg-white text-slate-700 ring-1 ring-slate-200">
        {points.toLocaleString('vi-VN')} điểm
      </span>
      <span className="w-full text-[12.5px] leading-relaxed text-slate-600 sm:w-auto sm:flex-1">{note}</span>
    </div>
  );
}

function ItemMeta({ item }: { item: PaperItem }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      <Badge tone="slate">{FORMAT_LABEL[item.format]}</Badge>
      <Badge tone="slate">{strandById(item.strand)?.short ?? item.strand}</Badge>
      <Badge tone="slate">{item.minutes} phút</Badge>
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
        Mức <LevelDots level={item.level} />
      </span>
    </div>
  );
}

function Statement({ text }: { text: string }) {
  return (
    <div className="prose-math font-serif">
      {text.split('\n').map((line, i) =>
        line.trim() === '' ? (
          <div key={i} className="h-2" />
        ) : (
          <p key={i} className="mt-1">
            <MathText>{line}</MathText>
          </p>
        ),
      )}
    </div>
  );
}

function QuestionBlock({ item, color }: { item: PaperItem; color: string }) {
  return (
    <div className="px-5 py-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-[14px] font-extrabold text-slate-900">{item.label}</span>
        <span className="chip" style={{ background: `${color}14`, color }}>
          {item.points.toLocaleString('vi-VN')} điểm
        </span>
      </div>
      <div className="mt-2">
        <Statement text={item.statement} />
      </div>

      {item.choices && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {item.choices.map((c, i) => (
            <div key={i} className="rounded-lg border border-slate-200 px-3 py-2 text-[13.5px] text-slate-700">
              <span className="mr-1.5 font-bold text-slate-500">{'ABCD'[i]}.</span>
              <MathText>{c}</MathText>
            </div>
          ))}
        </div>
      )}

      {item.claims && (
        <div className="mt-3 space-y-2">
          {item.claims.map((c, i) => (
            <div key={i} className="flex gap-2 rounded-lg border border-slate-200 px-3 py-2">
              <span className="font-bold text-slate-500">{'abcd'[i]})</span>
              <span className="flex-1 text-[13.5px] text-slate-700">
                <MathText>{c.text}</MathText>
              </span>
              <span className="shrink-0 text-[11px] font-semibold text-slate-400">Đ / S</span>
            </div>
          ))}
        </div>
      )}

      {item.format === 'tra-loi-ngan' && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[12.5px] font-semibold text-slate-500">Đáp số:</span>
          <span className="inline-block min-w-[140px] rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-slate-400">
            …
          </span>
        </div>
      )}

      <ItemMeta item={item} />
    </div>
  );
}

function SolutionBlock({
  item,
  color,
  forceOpen,
}: {
  item: PaperItem;
  color: string;
  forceOpen: boolean;
}) {
  const [open, setOpen] = useState(false);
  const show = open || forceOpen;
  return (
    <div className="px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-[14px] font-extrabold text-slate-900">{item.label}</span>
          <span className="chip" style={{ background: `${color}14`, color }}>
            {item.points.toLocaleString('vi-VN')} điểm
          </span>
        </div>
        <button className="btn btn-ghost no-print px-3 py-1.5 text-[12.5px]" onClick={() => setOpen((v) => !v)}>
          {show ? 'Ẩn lời giải' : 'Xem lời giải'}
        </button>
      </div>

      <div className="mt-2 rounded-lg bg-emerald-50 px-3 py-2">
        <span className="text-[12px] font-bold uppercase tracking-wider text-emerald-700">Đáp án</span>
        <div className="mt-0.5 text-[14px] font-bold text-emerald-900">
          <MathText>{item.answer}</MathText>
        </div>
      </div>

      {show && (
        <div className="mt-3 space-y-4 animate-fade">
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
              Lời giải từng bước
            </div>
            <ol className="mt-1.5 space-y-1.5">
              {item.solution.map((s, i) => (
                <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-slate-700">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10.5px] font-bold text-white"
                    style={{ background: color }}
                  >
                    {i + 1}
                  </span>
                  <span className="font-serif">
                    <MathText>{s}</MathText>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {item.claims && (
            <div>
              <div className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
                Đúng / Sai từng ý
              </div>
              <div className="mt-1.5 space-y-2">
                {item.claims.map((c, i) => (
                  <div
                    key={i}
                    className={`rounded-lg border px-3 py-2 ${
                      c.value ? 'border-emerald-200 bg-emerald-50/60' : 'border-rose-200 bg-rose-50/60'
                    }`}
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-slate-500">{'abcd'[i]})</span>
                      <span
                        className={`chip ${c.value ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}
                      >
                        {c.value ? 'ĐÚNG' : 'SAI'}
                      </span>
                    </div>
                    <div className="mt-1.5 text-[13px] leading-relaxed text-slate-700">
                      <MathText>{c.why}</MathText>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
              Barem chấm
            </div>
            <table className="mt-1.5 w-full text-left text-[13px]">
              <tbody>
                {item.barem.map((b, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0">
                    <td className="py-1.5 pr-3 text-slate-700">{b.item}</td>
                    <td className="w-20 py-1.5 text-right tabular-nums font-bold" style={{ color }}>
                      {b.point.toLocaleString('vi-VN')}đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function AnalysisBlock({ item, color }: { item: PaperItem; color: string }) {
  const a = item.analysis;
  const blocks: { title: string; body: string[]; tone: string }[] = [
    { title: 'Kiến thức liên quan', body: a.knowledge, tone: '#2E6FBF' },
    { title: 'Đọc vị đề — dấu hiệu nhận dạng', body: a.docVi, tone: '#1B4F9C' },
    { title: 'Phương pháp làm — các bước giải', body: a.method, tone: '#0F766E' },
    { title: 'Bẫy hay mắc & mẹo xử lí', body: a.traps, tone: '#E01B24' },
    { title: 'Kho bí kíp', body: a.tips, tone: '#F0A21B' },
  ];
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50/70 px-5 py-3">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-[14px] font-extrabold text-slate-900">{item.label}</span>
          <span className="chip" style={{ background: `${color}14`, color }}>
            {a.dang}
          </span>
        </div>
        <ItemMeta item={item} />
      </div>
      <div className="grid gap-px bg-slate-100 sm:grid-cols-2">
        {blocks.map((b) => (
          <div key={b.title} className="bg-white p-4">
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-1 rounded-full" style={{ background: b.tone }} />
              <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: b.tone }}>
                {b.title}
              </span>
            </div>
            <ul className="mt-2 space-y-1.5">
              {b.body.map((x, i) => (
                <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-slate-600">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: b.tone }} />
                  <span>
                    <MathText>{x}</MathText>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="bg-white p-4">
          <div className="flex items-center gap-2">
            <span className="h-3.5 w-1 rounded-full bg-slate-400" />
            <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
              Liên hệ đề thật & biến thể
            </span>
          </div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">
            <MathText>{a.transfer}</MathText>
          </p>
          {item.topicIds.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.topicIds.map((tid) => {
                const t = topicById(tid);
                if (!t) return null;
                return (
                  <button
                    key={tid}
                    className="chip bg-slate-100 text-slate-700 hover:bg-slate-200"
                    onClick={() => go(`/topics/${tid}`)}
                  >
                    Bộ phiếu: {t.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
