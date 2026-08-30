import { useMemo, useState } from 'react';
import { useApp, go } from '@/state';
import { PLACEMENT } from '@/data/placement';
import { BRAND_TRACK_STYLE } from '@/data/brand';
import { SCHOOLS, strandById } from '@/data/schools';
import { GROUPS, groupById } from '@/data/groups';
import { suggestGroup, weeksUntil } from '@/lib/roadmap';
import { applyRole } from '@/lib/auth';
import { Card, SectionTitle, Badge, Progress, Donut, MathText, Callout } from '@/components/ui';
import type { SchoolId, StrandId, TrackId } from '@/types';

const TRACKS: TrackId[] = ['chuyen', 'thpt', 'thpt-qg', 'lop6', 'chinh-khoa'];

export default function Onboarding() {
  const { state, update } = useApp();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(state.profile?.name ?? '');
  const [grade, setGrade] = useState(state.profile?.grade ?? 'Lớp 9');
  const [track, setTrack] = useState<TrackId>(state.profile?.track ?? 'thpt');
  const [school, setSchool] = useState<SchoolId>(state.profile?.targetSchool ?? 'hanoi-chung');
  const [examDate, setExamDate] = useState(
    state.profile?.examDate ?? new Date(Date.now() + 180 * 864e5).toISOString().slice(0, 10),
  );
  const [hours, setHours] = useState(state.profile?.hoursPerWeek ?? 10);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const quiz = useMemo(
    () => {
      /* Luồng vào 6 có bộ câu riêng ở trình độ tiểu học, không dùng chung câu 'both'. */
      if (track === 'lop6') return PLACEMENT.filter((q) => q.track === 'lop6');
      /* Luồng chính khoá trải từ lớp 6 tới lớp 12, nên phải lọc thêm theo khối lớp:
         học sinh lớp 6 không thể làm bài xếp lộ trình bằng câu ôn thi vào 10. */
      if (track === 'chinh-khoa') {
        const n = Number(grade.replace(/\D/g, '')) || 9;
        const band = n <= 7 ? 'thcs-duoi' : n <= 9 ? 'thcs-tren' : 'thpt';
        return PLACEMENT.filter((q) => q.track === 'chinh-khoa' && q.band === band);
      }
      return PLACEMENT.filter((q) => q.track === 'both' || q.track === track);
    },
    [track, grade],
  );

  const trackSchools = SCHOOLS.filter((s) => s.track === track);

  const scored = useMemo(() => {
    let correct = 0;
    let weight = 0;
    let gotWeight = 0;
    const byStrand: Record<string, { ok: number; total: number }> = {};
    quiz.forEach((q) => {
      const a = answers[q.id];
      const isOk = a === q.correct;
      if (isOk) correct += 1;
      weight += q.difficulty;
      if (isOk) gotWeight += q.difficulty;
      byStrand[q.strand] = byStrand[q.strand] ?? { ok: 0, total: 0 };
      byStrand[q.strand].total += 1;
      if (isOk) byStrand[q.strand].ok += 1;
    });
    const percent = weight ? Math.round((gotWeight / weight) * 100) : 0;
    return { correct, total: quiz.length, percent, byStrand };
  }, [answers, quiz]);

  const suggested = suggestGroup(track, scored.percent);
  const answered = quiz.filter((q) => answers[q.id] !== undefined).length;

  const save = () => {
    const strandScores: Partial<Record<StrandId, number>> = {};
    Object.entries(scored.byStrand).forEach(([k, v]) => {
      strandScores[k as StrandId] = Math.round((v.ok / v.total) * 100);
    });
    update((s) =>
      applyRole(
        {
          ...s,
          profile: {
            name: name.trim() || 'Học viên MATH365',
            grade,
            track,
            targetSchool: school,
            groupId: suggested,
            examDate,
            hoursPerWeek: hours,
            createdAt: new Date().toISOString(),
            placementScore: scored.percent,
            strandScores,
          },
          account: { ...s.account, displayName: name.trim() || 'Học viên MATH365' },
        },
        s.account.roleId === 'hs-thu' ? 'hs-chuan' : (s.account.roleId as never),
        'Hoàn thành bài test xếp lộ trình',
      ),
    );
    go('/roadmap');
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow={`Bước ${step + 1}/3`}
        title="Bài test xếp lộ trình"
        desc="Ba bước để hệ thống hiểu bạn đang ở đâu và cần đi đường nào. Kết quả quyết định nhóm năng lực, mức độ khởi điểm và toàn bộ lộ trình cá nhân hoá."
      />

      <div className="flex gap-2">
        {['Mục tiêu', 'Khảo sát năng lực', 'Kết quả & Lộ trình'].map((label, i) => (
          <div key={label} className="flex-1">
            <Progress value={i < step ? 100 : i === step ? 50 : 0} height={5} />
            <div
              className={`mt-1.5 text-[11.5px] font-semibold ${
                i <= step ? 'text-brand-700' : 'text-slate-400'
              }`}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Bước 1 */}
      {step === 0 && (
        <Card className="p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-[12.5px] font-bold text-slate-700">Họ và tên</span>
              <input
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
              />
            </label>
            <label className="block">
              <span className="text-[12.5px] font-bold text-slate-700">Đang học lớp</span>
              <select
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                {['Lớp 5', 'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6">
            <span className="text-[12.5px] font-bold text-slate-700">Chọn luồng</span>
            <div className="mt-2 grid gap-3 lg:grid-cols-3">
              {TRACKS.map((t) => {
                const st = BRAND_TRACK_STYLE[t];
                const on = track === t;
                return (
                  <button
                    key={t}
                    onClick={() => {
                      setTrack(t);
                      setSchool(SCHOOLS.find((s) => s.track === t)!.id);
                      setAnswers({});
                    }}
                    className={`rounded-2xl border p-4 text-left transition ${
                      on ? 'border-transparent ring-2' : 'border-slate-200 hover:border-slate-300'
                    }`}
                    style={on ? { boxShadow: `0 0 0 2px ${st.color}` } : undefined}
                  >
                    <div className="text-lg" style={{ color: st.color }}>
                      {st.icon}
                    </div>
                    <div className="mt-1 text-[14px] font-extrabold text-slate-900">{st.label}</div>
                    <div className="mt-1 text-[12px] leading-relaxed text-slate-600">{st.goal}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <label className="block">
              <span className="text-[12.5px] font-bold text-slate-700">Kỳ thi / mục tiêu chính</span>
              <select
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
                value={school}
                onChange={(e) => setSchool(e.target.value as SchoolId)}
              >
                {trackSchools.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.shortName}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-[12.5px] font-bold text-slate-700">Ngày thi dự kiến</span>
              <input
                type="date"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
              <span className="mt-1 block text-[11.5px] text-slate-500">
                Còn khoảng {weeksUntil(examDate)} tuần
              </span>
            </label>
            <label className="block">
              <span className="text-[12.5px] font-bold text-slate-700">
                Quỹ thời gian: {hours} giờ/tuần
              </span>
              <input
                type="range"
                min={4}
                max={24}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="mt-3 w-full accent-brand-600"
              />
              <span className="mt-1 block text-[11.5px] text-slate-500">
                Hãy chọn con số bạn thực sự giữ được, không phải con số lý tưởng.
              </span>
            </label>
          </div>

          <button className="btn-primary mt-6" onClick={() => setStep(1)}>
            Tiếp tục — làm {quiz.length} câu khảo sát →
          </button>
        </Card>
      )}

      {/* Bước 2 */}
      {step === 1 && (
        <div className="space-y-4">
          <Callout tone="brand" title="Làm nghiêm túc để kết quả có giá trị">
            Không tra cứu, không dùng máy tính. Bài này không tính điểm — nó chỉ để hệ thống xếp đúng
            mức khởi điểm cho bạn. Xếp sai mức là học sai suốt cả lộ trình.
          </Callout>

          {quiz.map((q, i) => (
            <Card key={q.id} className="p-5">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge tone="brand">Câu {i + 1}</Badge>
                <Badge style={{ background: `${strandById(q.strand).color}14`, color: strandById(q.strand).color }}>
                  {strandById(q.strand).short}
                </Badge>
                <Badge>Mức {q.difficulty}</Badge>
              </div>
              <p className="prose-math font-medium text-slate-800">
                <MathText>{q.statement}</MathText>
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.choices.map((c, ci) => (
                  <button
                    key={ci}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: ci }))}
                    className={`rounded-xl border px-3 py-2.5 text-left text-[13.5px] transition ${
                      answers[q.id] === ci
                        ? 'border-brand-600 bg-brand-50 font-semibold text-brand-900'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="mr-2 font-bold text-slate-400">{'ABCD'[ci]}.</span>
                    <MathText>{c}</MathText>
                  </button>
                ))}
              </div>
            </Card>
          ))}

          <div className="sticky bottom-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
            <div className="flex-1">
              <Progress value={(answered / quiz.length) * 100} label={`Đã trả lời ${answered}/${quiz.length}`} />
            </div>
            <button className="btn-ghost" onClick={() => setStep(0)}>
              Quay lại
            </button>
            <button
              className="btn-primary"
              disabled={answered < quiz.length}
              onClick={() => setStep(2)}
            >
              Xem kết quả
            </button>
          </div>
        </div>
      )}

      {/* Bước 3 */}
      {step === 2 && (
        <div className="space-y-5">
          <Card className="p-6">
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <Donut value={scored.percent} size={132} label="năng lực" />
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-extrabold text-slate-900">
                  {groupById(suggested).name}
                </h3>
                <p className="mt-1 text-[13px] font-semibold text-slate-500">
                  {groupById(suggested).band}
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-700">
                  {groupById(suggested).portrait}
                </p>
                <p className="mt-3 text-[13px] text-slate-600">
                  Đúng <b>{scored.correct}/{scored.total}</b> câu · điểm có trọng số theo độ khó:{' '}
                  <b>{scored.percent}%</b>
                </p>
              </div>
            </div>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-5">
              <h4 className="text-[15px] font-extrabold text-slate-900">Năng lực theo mạch</h4>
              <div className="mt-3 space-y-3">
                {Object.entries(scored.byStrand).map(([sid, v]) => {
                  const s = strandById(sid);
                  return (
                    <Progress
                      key={sid}
                      value={(v.ok / v.total) * 100}
                      tone={s.color}
                      label={`${s.name} (${v.ok}/${v.total})`}
                    />
                  );
                })}
              </div>
            </Card>

            <Card className="p-5">
              <h4 className="text-[15px] font-extrabold text-slate-900">Ưu tiên của nhóm bạn</h4>
              <ul className="mt-3 space-y-2">
                {groupById(suggested).priorities.map((p) => (
                  <li key={p} className="flex gap-2 text-[13px] leading-relaxed text-slate-700">
                    <span className="mt-0.5 text-brand-600">▸</span>
                    {p}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="p-5">
            <h4 className="text-[15px] font-extrabold text-slate-900">Cần tránh</h4>
            <ul className="mt-3 space-y-2">
              {groupById(suggested).redFlags.map((p) => (
                <li key={p} className="flex gap-2 text-[13px] leading-relaxed text-slate-700">
                  <span className="mt-0.5 text-rose-500">✕</span>
                  {p}
                </li>
              ))}
            </ul>
          </Card>

          <details className="card p-5">
            <summary className="cursor-pointer text-[14px] font-bold text-slate-800">
              Xem lời giải các câu đã làm
            </summary>
            <div className="mt-4 space-y-3">
              {quiz.map((q, i) => {
                const ok = answers[q.id] === q.correct;
                return (
                  <div key={q.id} className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-center gap-2 text-[12.5px] font-bold">
                      <span className={ok ? 'text-emerald-600' : 'text-rose-600'}>
                        {ok ? '✓' : '✕'} Câu {i + 1}
                      </span>
                      <span className="text-slate-400">
                        Đáp án đúng: {'ABCD'[q.correct]}
                      </span>
                    </div>
                    <p className="mt-1 text-[13px] text-slate-700">
                      <MathText>{q.statement}</MathText>
                    </p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
                      <MathText>{q.explain}</MathText>
                    </p>
                  </div>
                );
              })}
            </div>
          </details>

          <div className="flex flex-wrap gap-3">
            <button className="btn-primary" onClick={save}>
              Tạo lộ trình cá nhân hoá →
            </button>
            <button className="btn-ghost" onClick={() => setStep(1)}>
              Xem lại bài làm
            </button>
          </div>

          <p className="text-[12px] leading-relaxed text-slate-500">
            Hệ thống đề xuất nhóm <b>{groupById(suggested).name}</b>. Bạn hoặc giáo viên có thể đổi
            nhóm sau trong trang Lộ trình — các nhóm khác của luồng này gồm:{' '}
            {GROUPS.filter((g) => g.track === track).map((g) => g.name).join(', ')}.
          </p>
        </div>
      )}
    </div>
  );
}
