import { useMemo, useState } from 'react';
import { useApp, go } from '@/state';
import {
  buildWorksheet,
  missionByWorksheet,
  stageById,
  worksheetById,
  MISSION_KIND_META,
} from '@/data/catalog';
import { strandById } from '@/data/schools';
import { sheetSpec, COMPANION_SHEETS } from '@/data/sheets';
import { analysisFor } from '@/data/analysis';
import { topicById } from '@/data/topics';
import { can } from '@/lib/auth';
import { ItemAnalysis } from '@/components/ItemAnalysis';
import { Card, SectionTitle, Badge, LevelDots, MathText, Empty, Callout } from '@/components/ui';

export default function Solution({ worksheetId, variant }: { worksheetId: string; variant?: string }) {
  const { state } = useApp();
  const meta = worksheetById(worksheetId);
  const v = Number(variant ?? 0) || 0;
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [showAll, setShowAll] = useState(false);

  const worksheet = useMemo(() => (meta ? buildWorksheet(meta, v) : null), [meta, v]);

  if (!meta || !worksheet) {
    return (
      <Empty
        title="Không tìm thấy phiếu luyện"
        desc="Mã phiếu không hợp lệ. Mã phiếu có dạng PL-0001."
        action={
          <button className="btn-primary" onClick={() => go('/missions')}>
            Về danh sách nhiệm vụ
          </button>
        }
      />
    );
  }

  const mission = missionByWorksheet(meta.id);
  const stage = stageById(meta.stageId);
  const allowed = can(state, 'solution.full');
  const allItems = worksheet.parts.flatMap((p) =>
    p.items.map((it, i) => ({ ...it, partOrder: p.order, partName: p.name, index: i })),
  );

  // Bảng phân tích: ma trận câu hỏi của phiếu
  const matrix = allItems.map((it, i) => ({
    no: i + 1,
    part: it.partOrder,
    name: it.name,
    strand: it.strand,
    skill: it.skill,
    topic: topicById(it.topicId)?.name ?? '—',
  }));

  const strandCount = new Map<string, number>();
  allItems.forEach((i) => strandCount.set(i.strand, (strandCount.get(i.strand) ?? 0) + 1));

  const attemptsOnThis = state.attempts.filter((a) => a.worksheetId === meta.id);

  return (
    <div className="space-y-5">
      <div className="no-print flex flex-wrap items-center gap-3">
        <button className="text-[13px] font-semibold text-brand-700" onClick={() => go('/missions')}>
          ← Danh sách nhiệm vụ
        </button>
        {mission && (
          <button
            className="text-[13px] font-semibold text-brand-700"
            onClick={() => go(`/mission/${mission.id}`)}
          >
            Làm phiếu này →
          </button>
        )}
        <button
          className="text-[13px] font-semibold text-brand-700"
          onClick={() => go(`/guide/${meta.topicId}`)}
        >
          Phiếu hướng dẫn ôn chắc chuyên đề →
        </button>
      </div>

      <SectionTitle
        eyebrow={`Phiếu lời giải & phân tích chuyên sâu · ${meta.id}-LG`}
        title={`${meta.id} · ${meta.title}`}
        desc={`${sheetSpec(meta.sheetType).name} · ${stage.name} · Level ${meta.level} · ${meta.totalItems} câu · thời lượng đề xuất ${meta.minutes} phút. Toàn bộ đề, đáp án và phân tích được xem trực tuyến, không cần tải tệp.`}
        right={
          <div className="no-print flex gap-2">
            <button className="btn-ghost py-2 text-[12.5px]" onClick={() => window.print()}>
              In / lưu PDF
            </button>
            <button
              className="btn-primary py-2 text-[12.5px]"
              onClick={() => setShowAll((s) => !s)}
            >
              {showAll ? 'Thu gọn tất cả' : 'Mở tất cả lời giải'}
            </button>
          </div>
        }
      />

      {!allowed && (
        <Callout tone="amber" title="Vai trò hiện tại chưa mở lời giải chi tiết">
          Tài khoản Trải nghiệm chỉ xem được đề và đáp án, chưa xem được lời giải từng bước. Hoàn thành
          bài test xếp lộ trình để nâng lên Học viên Chuẩn.
        </Callout>
      )}

      {/* Thông tin phiếu */}
      <Card className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          {mission && (
            <Badge
              style={{
                background: `${MISSION_KIND_META[mission.kind].color}14`,
                color: MISSION_KIND_META[mission.kind].color,
              }}
            >
              {MISSION_KIND_META[mission.kind].label}
            </Badge>
          )}
          {mission && <Badge>{mission.id}</Badge>}
          <Badge>{meta.id}</Badge>
          <LevelDots level={meta.level} />
          {v > 0 && <Badge tone="amber">Bản đề số {v + 1}</Badge>}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Giai đoạn', stage.name],
            ['Chuyên đề trọng tâm', topicById(meta.topicId)?.name ?? '—'],
            ['Số câu', `${meta.totalItems} câu / ${worksheet.parts.length} phần`],
            ['Đã làm', attemptsOnThis.length ? `${attemptsOnThis.length} lượt` : 'Chưa làm'],
          ].map(([l, val]) => (
            <div key={l} className="rounded-xl bg-slate-50 p-3">
              <div className="text-[10.5px] font-bold uppercase tracking-wide text-slate-400">{l}</div>
              <div className="mt-0.5 text-[13px] font-bold leading-snug text-slate-800">{val}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-slate-50 p-4">
          <div className="text-[11.5px] font-bold uppercase tracking-wide text-brand-700">
            Phiếu này dùng để làm gì
          </div>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-700">
            {sheetSpec(meta.sheetType).purpose}
          </p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-emerald-800">
            <b>Đạt phiếu khi:</b> {sheetSpec(meta.sheetType).outcome}
          </p>
        </div>

        <Callout tone="brand" title="Về các bản đề khác nhau">
          Mỗi lần làm lại, hệ thống sinh một bản đề mới cùng dạng và cùng mức độ. Trang này đang hiển thị{' '}
          <b>bản đề số {v + 1}</b>. Muốn xem bản khác, đổi số ở cuối địa chỉ:{' '}
          <code className="rounded bg-white px-1">#/solution/{meta.id}/1</code>,{' '}
          <code className="rounded bg-white px-1">/2</code>, …
        </Callout>
      </Card>

      {/* Bảng phân tích ma trận đề */}
      <Card className="p-5">
        <h2 className="text-[16px] font-extrabold text-slate-900">Bảng phân tích phiếu</h2>
        <p className="mt-1 text-[12.5px] text-slate-500">
          Ma trận câu hỏi: mỗi câu thuộc dạng bài nào, mạch kiến thức nào và rèn kỹ năng gì.
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {[...strandCount.entries()].map(([sid, n]) => {
            const s = strandById(sid);
            return (
              <Badge key={sid} style={{ background: `${s.color}14`, color: s.color }}>
                {s.name}: {n} câu
              </Badge>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ['Số dạng bài khác nhau', String(new Set(allItems.map((i) => i.generatorId)).size)],
            ['Số kỹ năng được rèn', String(new Set(allItems.map((i) => i.skill)).size)],
            ['Thời gian trung bình mỗi câu', `${Math.round((meta.minutes * 60) / meta.totalItems)} giây`],
          ].map(([l, v]) => (
            <div key={l} className="rounded-xl bg-slate-50 p-3">
              <div className="text-[10.5px] font-bold uppercase tracking-wide text-slate-400">{l}</div>
              <div className="mt-0.5 text-[15px] font-extrabold text-slate-800">{v}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-[12.5px]">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wide text-slate-400">
                <th className="py-2 pr-2">Câu</th>
                <th className="py-2 pr-2">Phần</th>
                <th className="py-2 pr-2">Dạng bài</th>
                <th className="py-2 pr-2">Mạch</th>
                <th className="py-2 pr-2">Kỹ năng rèn</th>
                <th className="py-2">Chuyên đề</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((r) => {
                const s = strandById(r.strand);
                return (
                  <tr key={r.no} className="border-b border-slate-100 last:border-0">
                    <td className="py-2 pr-2 font-bold tabular-nums text-slate-700">{r.no}</td>
                    <td className="py-2 pr-2 tabular-nums text-slate-500">{r.part}</td>
                    <td className="py-2 pr-2 text-slate-800">{r.name}</td>
                    <td className="py-2 pr-2">
                      <span className="font-semibold" style={{ color: s.color }}>
                        {s.short}
                      </span>
                    </td>
                    <td className="py-2 pr-2 text-slate-600">{r.skill}</td>
                    <td className="py-2 text-slate-600">{r.topic}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Đề, đáp án và phân tích từng câu */}
      {worksheet.parts.map((part) => (
        <Card key={part.order} className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[16px] font-extrabold text-slate-900">{part.name}</h2>
            <Badge>{part.items.length} câu</Badge>
          </div>
          <p className="mt-1 text-[12.5px] text-slate-500">{part.purpose}</p>

          <div className="mt-4 space-y-3">
            {part.items.map((item, ii) => {
              const key = `${part.order}-${ii}`;
              const isOpen = showAll || open[key];
              const a = analysisFor(item.generatorId);
              const s = strandById(item.strand);
              return (
                <div key={key} className="rounded-2xl border border-slate-200 p-4">
                  <div className="mb-2 flex flex-wrap items-center gap-1.5">
                    <Badge tone="brand">Câu {ii + 1}</Badge>
                    <Badge style={{ background: `${s.color}14`, color: s.color }}>{item.name}</Badge>
                    <Badge>{item.skill}</Badge>
                  </div>

                  <p className="prose-math font-medium text-slate-800">
                    <MathText>{item.prompt}</MathText>
                  </p>

                  <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
                    {item.choices.map((c, ci) => (
                      <div
                        key={ci}
                        className={`rounded-lg border px-3 py-2 text-[13px] ${
                          ci === item.correct
                            ? 'border-emerald-300 bg-emerald-50 font-semibold text-emerald-900'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        <span className="mr-2 font-bold text-slate-400">{'ABCD'[ci]}.</span>
                        <MathText>{c}</MathText>
                        {ci === item.correct && <span className="ml-2 text-emerald-600">✓</span>}
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn-ghost no-print mt-3 py-1.5 text-[12.5px]"
                    onClick={() => setOpen((o) => ({ ...o, [key]: !o[key] }))}
                  >
                    {isOpen ? 'Ẩn lời giải & phân tích' : 'Xem lời giải & phân tích'}
                  </button>

                  {isOpen && (
                    <div className="mt-3">
                      <ItemAnalysis
                        item={{
                          generatorId: item.generatorId,
                          topicId: item.topicId,
                          skill: item.skill,
                          steps: item.steps,
                          choices: item.choices,
                          correct: item.correct,
                        }}
                        track={meta.track}
                        showSolution={allowed}
                      />
                    </div>
                  )}

                  {!isOpen && a && (
                    <p className="mt-2 text-[12px] italic leading-relaxed text-slate-500">
                      Gợi ý nhận dạng: {a.recognize}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      ))}

      <Card className="p-5">
        <h2 className="text-[16px] font-extrabold text-slate-900">Phiếu này nằm trong bộ phiếu nào</h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
          Mỗi chuyên đề có một bộ phiếu gồm sáu phiếu luyện theo thứ tự sư phạm. Mỗi phiếu luyện đều có
          một phiếu lời giải &amp; phân tích chuyên sâu đi kèm (chính là trang bạn đang xem), và cả
          chuyên đề có thêm một phiếu hướng dẫn ôn chắc.
        </p>
        <div className="mt-3 space-y-2">
          {COMPANION_SHEETS.map((c) => (
            <div key={c.code} className="rounded-xl border border-slate-200 p-3.5">
              <div className="text-[13.5px] font-extrabold text-slate-900">
                {c.name} <span className="text-slate-400">· mã …-{c.code}</span>
              </div>
              <div className="text-[12px] font-semibold text-slate-500">{c.scope}</div>
              <ul className="mt-1.5 space-y-0.5">
                {c.contains.map((x) => (
                  <li key={x} className="text-[12.5px] leading-relaxed text-slate-700">
                    ❐ {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button
          className="btn-soft no-print mt-3 py-1.5 text-[12.5px]"
          onClick={() => go(`/guide/${meta.topicId}`)}
        >
          Mở phiếu hướng dẫn ôn chắc chuyên đề →
        </button>
      </Card>
    </div>
  );
}
