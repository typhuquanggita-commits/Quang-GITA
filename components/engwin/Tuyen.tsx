/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {
  TUYEN_CREED,
  TUYEN,
  TUYEN_BY_ID,
  LOI_CHUNG,
  PHAN_KY,
  NHAM_LAN,
  CANH_BAO_QUY_DOI,
  TUYEN_SO,
  tinhTuy,
  tongPhut,
  loiNgayChuyen,
  tabsCuaTuyen,
  BANDS,
} from '../../data';
import type {TuyenId} from '../../types';
import {SectionHeader, Card, Chip, Stat, Bullets, Filters} from './ui';

const VIEWS = [
  {id: 'sosanh', label: 'Hai tuyến khác nhau ở đâu'},
  {id: 'chung', label: 'Phần dùng chung'},
  {id: 'lan', label: 'Lẫn tuyến — cái giá phải trả'},
  {id: 'tinh', label: 'Phần tinh tuý'},
];

const TONE: Record<TuyenId, 'sky' | 'amber'> = {ielts: 'sky', chuyen: 'amber'};

/* --------------------------- SO SÁNH HAI TUYẾN --------------------------- */

const SoSanh: React.FC = () => (
  <div className="space-y-8">
    <div className="grid gap-4 md:grid-cols-2">
      {TUYEN.map((t) => (
        <div
          key={t.id}
          className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
          <div className={`bg-gradient-to-r ${t.mau} px-5 py-4`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-950/70">
              {t.icon} {t.soThang} tháng · đo {t.kieuDo}
            </p>
            <p className="mt-1 text-lg font-black tracking-tight text-slate-950">
              {t.ten}
            </p>
            <p className="text-xs font-medium text-slate-950/80">{t.phuDe}</p>
          </div>
          <dl className="divide-y divide-slate-800">
            {[
              ['Đích', t.dich],
              ['Ai đi tuyến này', t.doiTuong],
              ['Bắt đầu khi nào', t.batDau],
              ['Nhịp mỗi ngày', t.nhipNgay],
              ['Đo bằng gì', t.heDo],
              ['Kỳ thi', t.kyThi],
              ['Thi lại được không', t.thiLai],
              ['Bậc thang', t.bacThang],
            ].map(([k, v]) => (
              <div key={k} className="px-5 py-3">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  {k}
                </dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-slate-300">
                  {v}
                </dd>
              </div>
            ))}
            <div className="px-5 py-3">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                Mục trong app phục vụ tuyến này
              </dt>
              <dd className="mt-1 text-[13px] text-slate-300">
                {tabsCuaTuyen(t.id).length} mục
              </dd>
            </div>
          </dl>
        </div>
      ))}
    </div>

    <Card className="border-violet-500/30 bg-violet-500/5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
        Khác biệt sâu nhất
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-200">
        {TUYEN_CREED.deepest}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        {TUYEN_CREED.consequence}
      </p>
    </Card>

    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
        Mười trục phân kỳ
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] uppercase tracking-[0.15em] text-slate-400">
              <th className="w-32 py-2 pr-3 font-semibold">Trục</th>
              <th className="py-2 pr-3 font-semibold text-sky-400">IELTS 8.0</th>
              <th className="py-2 pr-3 font-semibold text-amber-400">Chuyên Anh</th>
              <th className="py-2 font-semibold">Hệ quả</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {PHAN_KY.map((p) => (
              <tr key={p.truc} className="align-top">
                <td className="py-3 pr-3 font-semibold text-slate-200">{p.truc}</td>
                <td className="py-3 pr-3 leading-relaxed text-slate-400">{p.ielts}</td>
                <td className="py-3 pr-3 leading-relaxed text-slate-400">{p.chuyen}</td>
                <td className="py-3 leading-relaxed text-slate-300">{p.heQua}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <Card className="border-emerald-500/30 bg-emerald-500/5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
        Chọn tuyến thế nào
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-200">
        {TUYEN_CREED.oneRule}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        {TUYEN_CREED.reversible}
      </p>
    </Card>
  </div>
);

/* --------------------------- PHẦN DÙNG CHUNG ----------------------------- */

const Chung: React.FC = () => (
  <div className="space-y-6">
    <Card className="border-slate-700 bg-slate-900/80">
      <p className="text-sm leading-relaxed text-slate-300">
        {TUYEN_CREED.claim} Bảy phần dưới đây hai tuyến làm{' '}
        <span className="font-semibold text-slate-100">giống hệt nhau</span>. Đây
        là lý do đổi tuyến ở tháng 12 không mất năm đầu.
      </p>
    </Card>
    <div className="space-y-3">
      {LOI_CHUNG.map((l) => (
        <div
          key={l.no}
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-baseline gap-3">
            <span className="text-lg font-black tabular-nums text-slate-400">
              {String(l.no).padStart(2, '0')}
            </span>
            <h3 className="font-semibold text-slate-100">{l.ten}</h3>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{l.vi}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {l.drillIds.map((d) => (
              <Chip key={d} tone="emerald">
                {d}
              </Chip>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ------------------------------- LẪN TUYẾN ------------------------------- */

const Lan: React.FC = () => (
  <div className="space-y-6">
    <Card className="border-rose-500/40 bg-rose-500/5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">
        {CANH_BAO_QUY_DOI.title}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
        {CANH_BAO_QUY_DOI.body}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
        {CANH_BAO_QUY_DOI.them}
      </p>
    </Card>
    <div className="space-y-3">
      {NHAM_LAN.map((n, i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone={TONE[n.ai]}>{TUYEN_BY_ID[n.ai].ten}</Chip>
            <span className="text-[11px] text-slate-400">mắc lỗi này</span>
          </div>
          <h3 className="mt-2 font-semibold text-rose-200">✕ {n.sai}</h3>
          <dl className="mt-3 space-y-2 text-[13px] leading-relaxed">
            <div>
              <dt className="inline font-semibold text-slate-400">Vì sao dễ mắc — </dt>
              <dd className="inline text-slate-400">{n.vi}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-rose-400">Cái giá — </dt>
              <dd className="inline text-slate-300">{n.gia}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-emerald-400">Làm đúng — </dt>
              <dd className="inline text-slate-300">{n.dung}</dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  </div>
);

/* ------------------------------ TINH TUÝ --------------------------------- */

const Tinh: React.FC<{tuyen: TuyenId; onTuyen: (t: TuyenId) => void}> = ({
  tuyen,
  onTuyen,
}) => {
  const tt = tinhTuy(tuyen);
  const t = TUYEN_BY_ID[tuyen];
  const sanPhut = tongPhut(tt.loiNgay);
  return (
    <div className="space-y-8">
      <Filters
        options={TUYEN.map((x) => ({id: x.id, label: `${x.icon} ${x.ten}`}))}
        value={tuyen}
        onChange={(v) => onTuyen(v as TuyenId)}
      />

      <Card className={`border-slate-700 bg-gradient-to-br ${t.mau} bg-opacity-5`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-950/70">
          Cả hệ thống gói trong một đoạn
        </p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-slate-950">
          {tt.motTrang}
        </p>
      </Card>

      <div>
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
          Lõi ngày — {sanPhut} phút không được cắt
        </h3>
        <p className="mb-3 text-[13px] leading-relaxed text-slate-400">
          {tt.vongNgoai}
        </p>
        <div className="space-y-2">
          {tt.loiNgay.map((k) => (
            <div
              key={k.khoi}
              className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <span className="w-14 shrink-0 text-right text-lg font-black tabular-nums text-slate-300">
                {k.phut}
                <span className="text-[11px] font-medium text-slate-400">ph</span>
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-slate-100">{k.khoi}</span>
                <span className="mt-0.5 block text-[13px] leading-relaxed text-slate-400">
                  {k.lam}
                </span>
                {k.drillId && (
                  <span className="mt-1.5 inline-block">
                    <Chip tone="emerald">{k.drillId}</Chip>
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
        {tuyen === 'chuyen' && (
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {BANDS.map((b) => (
              <div
                key={b.id}
                className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
                <p className="text-[11px] font-semibold text-slate-300">{b.name}</p>
                <p className="mt-1 text-lg font-black tabular-nums text-amber-300">
                  {tongPhut(loiNgayChuyen(b.id))}
                  <span className="text-[11px] font-medium text-slate-400"> phút/ngày</span>
                </p>
                <p className="mt-1 text-[11px] leading-snug text-slate-400">
                  Khối theo giai đoạn {loiNgayChuyen(b.id)[2].phut} phút
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-1 text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
          {tt.donBay.length} đòn bẩy — xếp theo thời gian tới khi có hiệu lực
        </h3>
        <p className="mb-3 text-[13px] text-slate-400">
          {tuyen === 'chuyen'
            ? 'Lấy nguyên chín phác đồ nâng cấp trong hệ thống và sắp theo số tuần tăng dần. Còn ít thời gian thì làm từ trên xuống.'
            : 'Lọc từ tần suất xuất hiện qua mười hai mùa, cộng thêm hai việc chỉ làm một lần nhưng không bù được về sau.'}
        </p>
        <div className="space-y-3">
          {tt.donBay.map((d, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-semibold text-slate-100">{d.ten}</h4>
                <Chip tone={TONE[tuyen]}>{d.tuan} tuần</Chip>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
                <span className="font-semibold text-slate-400">Làm — </span>
                {d.lam}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
                <span className="font-semibold text-slate-400">Vì — </span>
                {d.vi}
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <p className="rounded-lg bg-emerald-500/5 p-3 text-[12px] leading-relaxed text-emerald-200 ring-1 ring-inset ring-emerald-500/20">
                  <span className="font-semibold">Được — </span>
                  {d.duoc}
                </p>
                <p className="rounded-lg bg-rose-500/5 p-3 text-[12px] leading-relaxed text-rose-200 ring-1 ring-inset ring-rose-500/20">
                  <span className="font-semibold">Bỏ thì — </span>
                  {d.bo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
            Cắt bỏ — {tt.catBo.length} việc trông năng suất mà không phải
          </h3>
          <div className="space-y-2">
            {tt.catBo.map((c, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="font-medium text-rose-200">✕ {c.viec}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-400">
                  {c.vi}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
            Chặn đường — {tt.chanDuong.length} lần phải dừng lại trả lời thật
          </h3>
          <div className="space-y-2">
            {tt.chanDuong.map((c, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <Chip tone={TONE[tuyen]}>{c.khi}</Chip>
                <p className="mt-2 font-medium text-slate-100">{c.hoi}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-400">
                  {c.neuKhong}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------- TAB ------------------------------------ */

export const Tuyen: React.FC<{
  tuyen: TuyenId | 'ca-hai';
  onTuyen: (t: TuyenId | 'ca-hai') => void;
}> = ({tuyen, onTuyen}) => {
  const [view, setView] = useState('sosanh');
  const chon: TuyenId = tuyen === 'ca-hai' ? 'ielts' : tuyen;
  return (
    <div>
      <SectionHeader
        eyebrow="Hai tuyến, một động cơ"
        title="Tách lộ trình IELTS 8.0 khỏi lộ trình chuyên Anh vào 10"
        lead={TUYEN_CREED.claim}
      />
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={String(TUYEN_SO.soLoiChung)} label="phần lõi dùng chung" sub="hai tuyến làm giống hệt" />
        <Stat value={String(TUYEN_SO.soPhanKy)} label="trục phân kỳ" sub="chỗ hai tuyến rẽ khác nhau" />
        <Stat value={String(TUYEN_SO.soNhamLan)} label="kiểu lẫn tuyến" sub="đều có cái giá tính được" />
        <Stat
          value={`${TUYEN_SO.soThangIelts}/${TUYEN_SO.soThangChuyen}`}
          label="tháng — IELTS / chuyên"
          sub={`đề chuyên ${TUYEN_SO.soCauDeChuyen} câu, ${TUYEN_SO.soPhanDeChuyen} phần`}
        />
      </div>
      <Filters options={VIEWS} value={view} onChange={setView} />
      {view === 'sosanh' && <SoSanh />}
      {view === 'chung' && <Chung />}
      {view === 'lan' && <Lan />}
      {view === 'tinh' && <Tinh tuyen={chon} onTuyen={onTuyen} />}
    </div>
  );
};
