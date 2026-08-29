import { useState } from 'react';
import { useApp, go } from '@/state';
import { SCHOOLS, strandById } from '@/data/schools';
import { BLUEPRINTS, blueprintsBySchool } from '@/data/blueprints';
import { RESOURCES, RESOURCE_TYPE_LABEL } from '@/data/resources';
import { papersByBlueprint } from '@/data/papers';
import { BRAND_TRACK_STYLE } from '@/data/brand';
import { Card, SectionTitle, Badge, Progress, Callout } from '@/components/ui';
import type { TrackId } from '@/types';

const GATE_LABEL: Record<string, { label: string; tone: 'green' | 'amber' | 'rose' }> = {
  'bat-buoc': { label: 'Bắt buộc lấy trọn', tone: 'green' },
  'phan-hoa': { label: 'Vùng phân hoá', tone: 'amber' },
  'lay-diem-toi-da': { label: 'Vùng điểm tối đa', tone: 'rose' },
};

export default function Exams() {
  const { state } = useApp();
  const initial: TrackId = state.profile?.track ?? 'thpt';
  const [track, setTrack] = useState<TrackId>(initial);
  const schools = SCHOOLS.filter((s) => s.track === track);
  const [schoolId, setSchoolId] = useState(schools[0]?.id ?? 'hanoi-chung');
  const school = SCHOOLS.find((s) => s.id === schoolId) ?? schools[0];
  const blueprints = blueprintsBySchool(school.id);
  const [bpIndex, setBpIndex] = useState(0);
  const bp = blueprints[Math.min(bpIndex, blueprints.length - 1)];
  const resources = RESOURCES.filter((r) => r.tracks.includes(track));

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Bản đồ kỳ thi"
        title="Kỳ thi & Cấu trúc đề"
        desc="Biết chính xác đề hỏi gì, chấm thế nào và ngưỡng điểm ra sao — đây là điều kiện tiên quyết trước khi bắt đầu ôn."
      />

      <Callout tone="amber" title="Luôn đối chiếu nguồn chính thức">
        Cấu trúc đề dưới đây được tổng hợp từ đề thi chính thức và đề tham khảo các năm gần đây. Quy chế
        và định dạng đề có thể thay đổi giữa các mùa thi — hãy kiểm tra công bố của Bộ GD&amp;ĐT, Sở
        GD&amp;ĐT Hà Nội hoặc chính trường bạn dự thi trước khi chốt kế hoạch ôn.
      </Callout>

      <div className="flex flex-wrap gap-2">
        {(['chuyen', 'thpt', 'thpt-qg'] as TrackId[]).map((t) => {
          const st = BRAND_TRACK_STYLE[t];
          return (
            <button
              key={t}
              className="chip"
              style={
                track === t
                  ? { background: st.color, color: '#fff' }
                  : { background: `${st.color}14`, color: st.color }
              }
              onClick={() => {
                setTrack(t);
                const first = SCHOOLS.find((s) => s.track === t)!;
                setSchoolId(first.id);
                setBpIndex(0);
              }}
            >
              {st.icon} {st.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {schools.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setSchoolId(s.id);
              setBpIndex(0);
            }}
            className={`card p-4 text-left transition ${
              schoolId === s.id ? 'ring-2' : 'hover:border-slate-300'
            }`}
            style={schoolId === s.id ? { boxShadow: `0 0 0 2px ${s.color}` } : undefined}
          >
            <div className="text-[14px] font-extrabold leading-snug text-slate-900">{s.shortName}</div>
            <div className="mt-0.5 text-[11.5px] text-slate-500">{s.org}</div>
            <div className="mt-2 flex gap-0.5" aria-label={`Mức cạnh tranh ${s.competitiveness}/5`}>
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className="h-1.5 w-5 rounded-full"
                  style={{ background: i < s.competitiveness ? s.color : '#e2e8f0' }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-extrabold text-slate-900">{school.name}</h2>
        <p className="mt-1 text-[12.5px] font-semibold text-slate-500">{school.org}</p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-slate-700">{school.admissionNote}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {school.styleTags.map((t) => (
            <Badge key={t} style={{ background: `${school.color}14`, color: school.color }}>
              {t}
            </Badge>
          ))}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {school.mathPapers.map((p) => (
            <div key={p.name} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-extrabold text-slate-900">{p.name}</span>
                <Badge tone="brand">{p.minutes} phút</Badge>
              </div>
              <div className="mt-1 text-[12px] font-semibold text-slate-500">Thang: {p.scale}</div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">{p.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div>
            <h3 className="text-[13.5px] font-extrabold text-slate-900">Dấu hiệu nhận biết “gu” đề</h3>
            <ul className="mt-2 space-y-1.5">
              {school.signature.map((s) => (
                <li key={s} className="flex gap-2 text-[13px] leading-relaxed text-slate-700">
                  <span className="mt-0.5 text-brand-600">▸</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[13.5px] font-extrabold text-slate-900">Ngưỡng tham khảo</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-700">{school.benchmark}</p>
            <a
              className="mt-3 inline-block text-[12.5px] font-semibold text-brand-700 hover:underline"
              href={school.officialUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Nguồn chính thức: {school.officialUrl} ↗
            </a>
          </div>
        </div>
      </Card>

      {blueprints.length > 0 && bp && (
        <Card className="p-6">
          {blueprints.length > 1 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {blueprints.map((b, i) => (
                <button
                  key={b.id}
                  className={`chip ${
                    i === bpIndex ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                  onClick={() => setBpIndex(i)}
                >
                  {b.title.split('–')[0].trim()}
                </button>
              ))}
            </div>
          )}

          <h2 className="text-[17px] font-extrabold text-slate-900">{bp.title}</h2>
          <p className="mt-1 text-[12.5px] font-semibold text-slate-500">
            {bp.format} · {bp.minutes} phút
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{bp.updatedNote}</p>

          {(() => {
            const papers = papersByBlueprint(bp.id);
            if (!papers.length) {
              return (
                <div className="mt-4 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-[12.5px] text-slate-500">
                  Ma trận này chưa có đề mẫu trọn vẹn. Xem{' '}
                  <button className="font-semibold text-brand-700 underline" onClick={() => go('/papers')}>
                    kho đề mẫu
                  </button>{' '}
                  để luyện với các cấu trúc đã có đề.
                </div>
              );
            }
            return (
              <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3">
                <div className="text-[12.5px] font-bold text-brand-800">
                  Đề mẫu trọn vẹn theo đúng ma trận này
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {papers.map((pp) => (
                    <button
                      key={pp.id}
                      className="btn btn-primary px-3 py-1.5 text-[12.5px]"
                      onClick={() => go(`/paper/${pp.id}`)}
                    >
                      {pp.code} · Mở đề, lời giải &amp; barem
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          <div className="mt-5 space-y-3">
            {bp.parts.map((p) => {
              const gate = GATE_LABEL[p.gate];
              const s = strandById(p.strand);
              return (
                <div key={p.label} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[15px] font-extrabold text-slate-900">{p.label}</span>
                    <Badge tone="brand">{p.points} điểm</Badge>
                    <Badge>~{p.minutes} phút</Badge>
                    <Badge style={{ background: `${s.color}14`, color: s.color }}>{s.short}</Badge>
                    <Badge tone={gate.tone}>{gate.label}</Badge>
                  </div>
                  <div className="mt-1.5 text-[13.5px] font-semibold text-slate-700">{p.content}</div>

                  <div className="mt-3">
                    <Progress value={(p.points / bp.totalPoints) * 100} height={5} tone={s.color} />
                    <div className="mt-1 text-[11px] text-slate-400">
                      Chiếm {Math.round((p.points / bp.totalPoints) * 100)}% tổng điểm
                    </div>
                  </div>

                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div>
                      <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                        Yêu cầu
                      </div>
                      <ul className="mt-1 space-y-1">
                        {p.requirements.map((r) => (
                          <li key={r} className="text-[12.5px] leading-relaxed text-slate-600">
                            • {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                        Chiến thuật
                      </div>
                      <ul className="mt-1 space-y-1">
                        {p.tips.map((t) => (
                          <li key={t} className="text-[12.5px] leading-relaxed text-slate-600">
                            ▸ {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div>
              <h3 className="text-[14px] font-extrabold text-slate-900">Phân bổ thời gian phòng thi</h3>
              <div className="mt-2 space-y-2">
                {bp.timeStrategy.map((t) => (
                  <div key={t.phase} className="flex gap-3 rounded-xl bg-slate-50 p-3">
                    <span className="w-16 shrink-0 text-[12px] font-extrabold tabular-nums text-brand-700">
                      {t.minutes}′
                    </span>
                    <div>
                      <div className="text-[13px] font-bold text-slate-800">{t.phase}</div>
                      <div className="text-[12.5px] leading-relaxed text-slate-600">{t.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[14px] font-extrabold text-slate-900">Mục tiêu điểm theo nhóm</h3>
              <div className="mt-2 space-y-2">
                {bp.scoreTargets.map((t) => (
                  <div key={t.group} className="rounded-xl border border-slate-200 p-3">
                    <div className="text-[13px] font-extrabold text-slate-900">{t.group}</div>
                    <div className="mt-1 text-[12.5px] text-emerald-700">
                      <b>Phải lấy:</b> {t.target}
                    </div>
                    <div className="text-[12.5px] text-slate-500">
                      <b>Được phép bỏ:</b> {t.giveUp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <h2 className="text-[16px] font-extrabold text-slate-900">
          Nguồn tài liệu cho luồng này ({resources.length})
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {resources.map((r) => (
            <div key={r.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                <Badge tone={r.official ? 'green' : 'brand'}>{RESOURCE_TYPE_LABEL[r.type]}</Badge>
                {r.official && <Badge tone="green">Chính thức</Badge>}
                <Badge>Mức {r.level}</Badge>
              </div>
              <h3 className="text-[14px] font-extrabold leading-snug text-slate-900">{r.title}</h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{r.description}</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-slate-700">
                <b className="text-slate-900">Dùng thế nào:</b> {r.usage}
              </p>
              {r.url && (
                <a
                  className="mt-2 inline-block text-[12px] font-semibold text-brand-700 hover:underline"
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {r.url} ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </Card>

      <p className="text-[12px] text-slate-400">
        Hệ thống đang lưu {BLUEPRINTS.length} ma trận đề của {SCHOOLS.length} kỳ thi / trường.
      </p>
    </div>
  );
}
