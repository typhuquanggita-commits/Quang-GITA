import { useApp, go } from '@/state';
import { BRAND, BRAND_TRACK_STYLE } from '@/data/brand';
import { stagesByTrack } from '@/data/stages';
import { SCALE } from '@/data/scale';
import { SHEET_TYPES, COMPANION_SHEETS } from '@/data/sheets';
import { PILLARS, TIERS } from '@/data/gita';
import { SCHOOLS } from '@/data/schools';
import { TIPS, HABITS } from '@/data/playbook';
import { LIBRARY_TREE, countFolders, countArtifacts } from '@/data/library-tree';
import { PAPER_CARDS, TOPIC_INDEX } from '@/data/catalog-index';
import { Card, SectionTitle, Badge, Progress } from '@/components/ui';
import type { TrackId } from '@/types';

const TRACKS: TrackId[] = ['chuyen', 'thpt', 'thpt-qg'];

export default function Home() {
  const { state, update } = useApp();
  const stats = SCALE;
  const folders = countFolders(LIBRARY_TREE);
  const artifacts = countArtifacts(LIBRARY_TREE);

  const pickTrack = (t: TrackId) => {
    update((s) => ({
      ...s,
      profile: s.profile ? { ...s.profile, track: t } : s.profile,
    }));
    go(state.profile ? '/missions' : '/onboarding');
  };

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="grid-paper overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-white p-7 sm:p-10">
        <div className="animate-rise">
          <Badge tone="brand">{BRAND.org} · Hệ sinh thái luyện Toán</Badge>
          <h1 className="mt-3 max-w-3xl text-balance text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[40px]">
            {BRAND.product} — học đúng lộ trình, đo bằng KPI, lên cấp bằng kết quả
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600">
            {BRAND.promise}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn-primary" onClick={() => go('/onboarding')}>
              {state.profile ? 'Làm lại bài xếp lộ trình' : 'Bắt đầu — làm bài xếp lộ trình'}
            </button>
            <button className="btn-ghost" onClick={() => go('/gita')}>
              Tìm hiểu mô thức GITA
            </button>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ['2.000', 'phiếu luyện'],
              ['2.000', 'nhiệm vụ'],
              [stats.items.toLocaleString('vi-VN'), 'câu hỏi có lời giải & phân tích'],
              ['90%', 'KPI chuẩn thăng cấp'],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="text-2xl font-extrabold tabular-nums text-brand-700 sm:text-3xl">{v}</dt>
                <dd className="text-xs font-semibold text-slate-500">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Ba luồng */}
      <section>
        <SectionTitle
          eyebrow="Ba luồng — một hệ thống"
          title="Chọn luồng phù hợp với đích đến của bạn"
          desc="Mỗi luồng có bản đồ kỳ thi riêng, cây chuyên đề riêng và ngân hàng phiếu luyện riêng, nhưng dùng chung một mô thức huấn luyện."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {TRACKS.map((t) => {
            const style = BRAND_TRACK_STYLE[t];
            const stages = stagesByTrack(t);
            const nTopics = TOPIC_INDEX.filter((x) => x.tracks.includes(t)).length;
            const nSheets =
              t === 'thpt' ? stats.thpt : t === 'chuyen' ? stats.chuyen : stats.quocGia;
            const schools = SCHOOLS.filter((s) => s.track === t);
            return (
              <Card key={t} className="flex flex-col p-5">
                <div
                  className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl text-xl font-bold text-white"
                  style={{ background: style.color }}
                >
                  {style.icon}
                </div>
                <h3 className="text-[17px] font-extrabold leading-snug text-slate-900">
                  {style.label}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">{style.goal}</p>

                <ul className="mt-4 space-y-1.5 text-[12.5px] text-slate-600">
                  <li>
                    <b className="tabular-nums">{nSheets}</b> phiếu luyện ·{' '}
                    <b className="tabular-nums">{nTopics}</b> chuyên đề
                  </li>
                  <li>
                    <b>{stages.length}</b> giai đoạn: {stages.map((s) => s.name.split('·')[1]?.trim()).join(' → ')}
                  </li>
                  <li>Kỳ thi đích: {schools.map((s) => s.shortName).join(', ')}</li>
                </ul>

                <button
                  className="btn-soft mt-5 w-full"
                  onClick={() => pickTrack(t)}
                  style={{ background: `${style.color}14`, color: style.color }}
                >
                  Vào luồng này →
                </button>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Bộ phiếu theo chuyên đề */}
      <section>
        <SectionTitle
          eyebrow="Cấu trúc nội dung"
          title="Mỗi chuyên đề là một bộ phiếu hoàn chỉnh"
          desc={`${stats.packedTopics} bộ phiếu chuyên đề, mỗi bộ gồm ${SHEET_TYPES.length} phiếu đi theo đúng thứ tự sư phạm — cộng thêm hai phiếu đi kèm để học sinh hiểu bản chất chứ không chỉ làm cho xong.`}
          right={
            <button className="btn-ghost" onClick={() => go('/missions')}>
              Xem theo chuyên đề →
            </button>
          }
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SHEET_TYPES.map((spec) => (
            <Card key={spec.id} className="p-5">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-sm font-extrabold text-white"
                  style={{ background: spec.color }}
                >
                  {spec.order}
                </span>
                <h3 className="text-[14.5px] font-extrabold leading-snug text-slate-900">
                  {spec.name}
                </h3>
              </div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">{spec.purpose}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge>{spec.items} câu</Badge>
                <Badge>{spec.minutes} phút</Badge>
                <Badge tone="brand">KPI ≥ {spec.kpiTarget}%</Badge>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {COMPANION_SHEETS.map((c) => (
            <Card key={c.code} className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="amber">Phiếu đi kèm · mã …-{c.code}</Badge>
              </div>
              <h3 className="mt-2 text-[14.5px] font-extrabold text-slate-900">{c.name}</h3>
              <p className="mt-0.5 text-[12px] font-semibold text-slate-500">{c.scope}</p>
              <ul className="mt-2 space-y-1">
                {c.contains.map((x) => (
                  <li key={x} className="text-[12.5px] leading-relaxed text-slate-700">
                    ❐ {x}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Mô thức GITA */}
      <section>
        <SectionTitle
          eyebrow="Mô thức huấn luyện"
          title="G · I · T · A — bốn trụ cột xuyên suốt mọi tầng của hệ thống"
          desc="Từ thư mục tài liệu, quy trình, giải pháp, chiến lược đến thói quen — tất cả đều được thiết kế theo cùng một khung."
          right={
            <button className="btn-ghost" onClick={() => go('/gita')}>
              Xem đầy đủ
            </button>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <Card key={p.id} className="p-5">
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg font-extrabold text-white"
                style={{ background: p.color }}
              >
                {p.letter}
              </div>
              <h3 className="text-[15px] font-extrabold text-slate-900">{p.name}</h3>
              <p className="mt-1 text-[12.5px] font-semibold text-slate-500">{p.question}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{p.principle}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Tầng hấp thu */}
      <section>
        <SectionTitle
          eyebrow="Chiều sâu theo tầng"
          title="Năm tầng hấp thu — mỗi tầng nhận đúng loại tài liệu mình cần"
          desc="Cùng một chuyên đề nhưng học sinh ở tầng khác nhau nhận tài liệu khác nhau, và giáo viên có cách can thiệp khác nhau."
        />
        <Card className="overflow-hidden">
          {TIERS.map((tier, i) => (
            <div
              key={tier.id}
              className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-start ${
                i ? 'border-t border-slate-100' : ''
              }`}
            >
              <div className="sm:w-52 sm:shrink-0">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-extrabold text-white"
                    style={{ background: tier.color }}
                  >
                    {tier.id}
                  </span>
                  <span className="text-[14px] font-extrabold text-slate-900">{tier.name}</span>
                </div>
                <div className="mt-1 pl-9 text-[11.5px] font-semibold uppercase tracking-wide text-slate-400">
                  {tier.nameEn}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] leading-relaxed text-slate-700">{tier.descriptor}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {tier.materials.map((m) => (
                    <Badge key={m}>{m}</Badge>
                  ))}
                </div>
                <p className="mt-2 text-[12.5px] text-slate-500">
                  <b className="text-slate-700">Tiêu chí chuyển tầng:</b> {tier.exitCriteria}
                </p>
              </div>
            </div>
          ))}
        </Card>
      </section>

      {/* Quy mô hệ thống */}
      <section>
        <SectionTitle
          eyebrow="Quy mô"
          title="Hệ thống tài liệu và nội dung"
          desc="Mọi con số dưới đây đều là nội dung có thật trong ứng dụng, không phải số quảng cáo."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Phiếu luyện', value: '2.000', sub: `${stats.chuyen} chuyên · ${stats.thpt} vào 10 · ${stats.quocGia} THPT` },
            { label: 'Nhiệm vụ', value: '2.000', sub: 'mỗi nhiệm vụ có KPI và điều kiện mở khoá' },
            { label: 'Thư mục tài liệu', value: String(folders), sub: `${artifacts} đầu tài liệu bổ trợ` },
            { label: 'Dạng bài tự sinh', value: String(stats.generators), sub: 'mỗi dạng có bảng phân tích chuyên sâu riêng' },
          ].map((s) => (
            <Card key={s.label} className="p-5">
              <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                {s.label}
              </div>
              <div className="mt-1 text-3xl font-extrabold tabular-nums text-brand-700">{s.value}</div>
              <div className="mt-1 text-[12px] leading-relaxed text-slate-500">{s.sub}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Đề mẫu trọn vẹn */}
      <section>
        <SectionTitle
          eyebrow="Đề mẫu chuẩn cấu trúc"
          title="Đề trọn vẹn theo đúng ma trận từng kỳ thi"
          desc="Ngoài 2.000 phiếu luyện theo chuyên đề, hệ thống có các đề mẫu hoàn chỉnh dựng đúng cấu trúc thật — đủ số bài, đúng thang điểm, đúng thời gian — kèm lời giải từng bước, barem chấm tới từng 0,25 điểm và bảng phân tích chi tiết cho mọi câu."
          right={
            <button className="btn btn-primary text-sm" onClick={() => go('/papers')}>
              Vào kho đề mẫu
            </button>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PAPER_CARDS.map((p) => {
            const style = BRAND_TRACK_STYLE[p.track];
            return (
              <Card key={p.id} className="overflow-hidden">
                <div className="h-1.5" style={{ background: style.color }} />
                <button className="w-full p-5 text-left" onClick={() => go(`/paper/${p.id}`)}>
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em]" style={{ color: style.color }}>
                    {p.code}
                  </div>
                  <div className="mt-1 text-[14px] font-extrabold leading-tight text-slate-900">
                    {p.title.replace(/^Đề mẫu \d+ · /, '')}
                  </div>
                  <div className="mt-1.5 text-[12px] leading-relaxed text-slate-500">
                    {p.minutes} phút · thang {p.totalPoints} · {p.items} câu
                    {p.claims ? ` (+${p.claims} ý)` : ''}
                  </div>
                  <div className="mt-2 text-[12px] font-semibold" style={{ color: style.color }}>
                    Đề · Lời giải · Barem · Phân tích ➜
                  </div>
                </button>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Vòng lặp luyện tập */}
      <section>
        <SectionTitle
          eyebrow="Cách hệ thống vận hành"
          title="Vòng lặp luyện tập khép kín"
          desc="Mỗi phiếu luyện đi trọn một vòng: làm từng phần → chấm → chẩn đoán → giải pháp → định hướng bước kế tiếp."
        />
        <Card className="p-6">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['1', 'Làm từng phần', 'Mỗi phiếu chia thành các phần theo mục đích riêng. Hết phần này mới sang phần sau.'],
              ['2', 'Chấm & báo kết quả', 'Chấm tự động ngay khi nộp, báo KPI tổng và KPI từng phần.'],
              ['3', 'Nhận xét & giải pháp', 'Chỉ rõ kỹ năng nào sai, vì sao sai, và việc cụ thể cần làm để sửa.'],
              ['4', 'Định hướng bước kế', 'Làm lại đề mới, sang nhiệm vụ tiếp, hoặc nâng Level nếu đã đạt KPI 90%.'],
            ].map(([n, t, d]) => (
              <li key={n}>
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-brand-700 text-sm font-extrabold text-white">
                  {n}
                </div>
                <h4 className="text-[14px] font-bold text-slate-900">{t}</h4>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <Progress value={90} label="Ngưỡng KPI để được xét thăng cấp" tone="#4338ca" />
            <p className="mt-3 text-[12.5px] leading-relaxed text-slate-600">
              Đạt <b>KPI ≥ 90%</b> ở <b>2 phiếu</b> cùng mức độ → mở khoá Level kế tiếp.
              Đạt chuẩn ở <b>15 nhiệm vụ</b> của một giai đoạn, với KPI trung bình 5 lượt gần nhất ≥ 90% →
              được xét lên <b>giai đoạn mới</b>.
            </p>
          </div>
        </Card>
      </section>

      {/* Bí kíp & thói quen */}
      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-[16px] font-extrabold text-slate-900">
            Kho bí kíp · {TIPS.length} kỹ thuật thực chiến
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
            Mẹo tính nhanh, khai thác máy tính cầm tay, trình bày ăn điểm barem, chiến thuật phòng thi,
            kỹ thuật ghi nhớ và lối tư duy khi gặp bài lạ.
          </p>
          <button className="btn-ghost mt-4" onClick={() => go('/playbook')}>
            Mở kho bí kíp →
          </button>
        </Card>
        <Card className="p-6">
          <h3 className="text-[16px] font-extrabold text-slate-900">
            Thói quen luyện · {HABITS.length} thói quen theo nhịp
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
            Nhịp ngày – tuần – tháng được thiết kế để tạo kỷ luật bền, đồng thời rèn tám phẩm chất
            đi theo học sinh lâu dài sau kỳ thi.
          </p>
          <button className="btn-ghost mt-4" onClick={() => go('/playbook')}>
            Xem hệ thống thói quen →
          </button>
        </Card>
      </section>
    </div>
  );
}
