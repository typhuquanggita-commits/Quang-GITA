/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {
  IELTS9_CREED, SO_HOC_9, NGHE_DOC_9, TIEU_CHI_9, tieuChiCua,
  DUONG_SAI, IELTS9_SO, toHopDat, diemTong,
} from '../../data/ielts9';
import {SectionHeader, Card, Chip, Stat, Bullets, Filters, Field} from './ui';

const VIEWS = [
  {id: 'sohoc', label: 'Số học của 9.0'},
  {id: 'nghedoc', label: 'Nghe và Đọc — biên một câu'},
  {id: 'vietnoi', label: 'Viết và Nói — đổi chất'},
  {id: 'duongsai', label: 'Năm đường sai'},
];

const KY_NANG = ['Nghe', 'Đọc', 'Viết', 'Nói'];

/* --------------------------- SỐ HỌC CỦA 9.0 ---------------------------- */
const SoHoc: React.FC = () => {
  const [ban, setBan] = useState<number[]>([8.5, 8.5, 8, 8]);
  const tong = diemTong(ban);
  const toHop = toHopDat(9, 7);
  const BANDS = [7, 7.5, 8, 8.5, 9];
  return (
    <div className="space-y-8">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat value={String(SO_HOC_9.nguongTong)} label="tổng bốn kỹ năng tối thiểu" sub={`trung bình ${SO_HOC_9.nguongTrungBinh}`} />
        <Stat value={String(IELTS9_SO.soToHopDat9)} label="tổ hợp đạt 9.0" sub="với sàn 7.0 mỗi kỹ năng" />
        <Stat value={String(IELTS9_SO.bienLoi)} label="câu — biên lỗi Nghe/Đọc" sub={`cần ${IELTS9_SO.soCauDungNghe}/40`} />
      </div>

      <Card>
        <Field label="Luật làm tròn">{SO_HOC_9.luat}</Field>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{SO_HOC_9.ynghia}</p>
        <p className="mt-3 rounded-md border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-sm leading-relaxed text-emerald-200">
          <span className="font-semibold">Hệ quả: </span>{SO_HOC_9.chienThuat}
        </p>
      </Card>

      <div>
        <h2 className="mb-1 text-lg font-bold text-slate-100">Thử tổ hợp của bạn</h2>
        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-slate-400">
          Đặt điểm từng kỹ năng rồi xem điểm tổng. Đây là chính luật làm tròn
          của IELTS chạy thật, không phải bảng tra chép sẵn.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {KY_NANG.map((k, i) => (
            <Card key={k}>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{k}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {BANDS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBan(ban.map((x, j) => (j === i ? b : x)))}
                    className={`rounded-md px-2 py-1 text-xs font-medium tabular-nums transition ${
                      ban[i] === b
                        ? 'bg-sky-500 text-slate-950'
                        : 'bg-slate-800/70 text-slate-400 hover:bg-slate-700/70 hover:text-slate-200'
                    }`}>
                    {b.toFixed(1)}
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <Card className={`mt-3 ${tong >= 9 ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-700'}`}>
          <p className="text-sm text-slate-400">
            {ban.map((b) => b.toFixed(1)).join(' · ')} → trung bình{' '}
            <span className="tabular-nums">{(ban.reduce((s, b) => s + b, 0) / 4).toFixed(3)}</span>
          </p>
          <p className={`mt-1 text-3xl font-bold tabular-nums ${tong >= 9 ? 'text-emerald-300' : 'text-slate-100'}`}>
            {tong.toFixed(1)}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {tong >= 9 ? 'Tổ hợp này đạt 9.0 tổng.' : `Còn thiếu ${(SO_HOC_9.nguongTong - ban.reduce((s, b) => s + b, 0)).toFixed(1)} điểm tổng.`}
          </p>
        </Card>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-bold text-slate-100">
          Toàn bộ {toHop.length} tổ hợp đạt 9.0 tổng
        </h2>
        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-slate-400">
          Không phân biệt thứ tự kỹ năng — chọn kỹ năng nào để buông là chuyện
          của người học, và đó chính là chỗ tiết kiệm được hàng trăm giờ.
        </p>
        <div className="flex flex-wrap gap-2">
          {toHop.map((t) => (
            <span
              key={t.join('-')}
              className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 font-mono text-sm tabular-nums text-slate-200">
              {t.map((x) => x.toFixed(1)).join(' · ')}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-slate-400">
          Đáng chú ý: không tổ hợp nào có kỹ năng dưới 8.0. Ba kỹ năng 9.0 kèm
          một kỹ năng 7.5 chỉ ra 8.5 tổng — nên 8.0 là sàn thật của kỹ năng yếu nhất.
        </p>
      </div>
    </div>
  );
};

/* ---------------------------- NGHE VÀ ĐỌC ------------------------------ */
const NgheDoc: React.FC = () => (
  <div className="space-y-6">
    <Card className="border-rose-500/30 bg-rose-500/5">
      <Field label="Yêu cầu">{NGHE_DOC_9.yeuCau}</Field>
    </Card>
    <Card className="border-amber-500/25 bg-amber-500/5">
      <Field label="Giới hạn của mọi bảng quy đổi">{NGHE_DOC_9.khongCongBoDayDu}</Field>
    </Card>
    <div>
      <h2 className="mb-3 text-lg font-bold text-slate-100">Chiến thuật phải đổi so với mức 8.0</h2>
      <Bullets items={NGHE_DOC_9.doiChienThuat} />
    </div>
    <Card className="border-emerald-500/25 bg-emerald-500/5">
      <Field label="Cách luyện">{NGHE_DOC_9.luyenTap}</Field>
    </Card>
  </div>
);

/* --------------------------- VIẾT VÀ NÓI ------------------------------- */
const VietNoi: React.FC = () => {
  const [ky, setKy] = useState<'viet' | 'noi'>('viet');
  return (
    <div>
      <Filters
        options={[
          {id: 'viet', label: `Viết (${tieuChiCua('viet').length} tiêu chí)`},
          {id: 'noi', label: `Nói (${tieuChiCua('noi').length} tiêu chí)`},
        ]}
        value={ky}
        onChange={(v) => setKy(v as typeof ky)}
      />
      <div className="space-y-4">
        {tieuChiCua(ky).map((t) => (
          <Card key={t.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-bold text-slate-100">{t.ten}</h2>
              <Chip tone="slate">{t.tenAnh}</Chip>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">Band 8</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{t.band8}</p>
              </div>
              <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">Band 9</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-200">{t.band9}</p>
              </div>
            </div>
            <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-300">
              <Field label="Phải đổi việc gì">{t.doiGi}</Field>
              <Field label="Tự kiểm được bằng">{t.tuKiem}</Field>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

/* ---------------------------- ĐƯỜNG SAI -------------------------------- */
const DuongSai: React.FC = () => (
  <div className="space-y-4">
    {DUONG_SAI.map((d, i) => (
      <Card key={d.sai} className="border-rose-500/25">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-rose-400">{String(i + 1).padStart(2, '0')}</span>
          <h2 className="text-lg font-bold text-slate-100">{d.sai}</h2>
        </div>
        <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-300">
          <Field label="Vì sao đây là đường sai">{d.viSao}</Field>
          <p className="rounded-md border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-emerald-200">
            <span className="font-semibold">Thay bằng: </span>{d.thayBang}
          </p>
        </div>
      </Card>
    ))}
  </div>
);

export const Ielts9: React.FC = () => {
  const [view, setView] = useState('sohoc');
  return (
    <div>
      <SectionHeader
        eyebrow="Đoạn cuối · 8.0 → 9.0"
        title={IELTS9_CREED.name + ' — khoảng cách đo được, không phải khoảng cách cảm tính'}
        lead={IELTS9_CREED.claim}
      />
      <Card className="mb-6 border-amber-500/25 bg-amber-500/5">
        <Field label="Nói thẳng trước">{IELTS9_CREED.daiDuoc}</Field>
      </Card>
      <Filters options={VIEWS} value={view} onChange={setView} />
      {view === 'sohoc' && <SoHoc />}
      {view === 'nghedoc' && <NgheDoc />}
      {view === 'vietnoi' && <VietNoi />}
      {view === 'duongsai' && <DuongSai />}
    </div>
  );
};
