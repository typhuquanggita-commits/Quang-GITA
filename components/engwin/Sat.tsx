/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {
  SAT_CREED, SAT_NGUON, SAT_SPEC, MODUN, NHIP_LAM_BAI, THICH_UNG,
  MIEN, DANG_SAT, soCauCuaMien, mienCuaPhan, dangCuaMien,
  LICH_SAT, LE_PHI, kyThiKeTiep, MUC_TIEU_SAT, LO_TRINH_SAT,
  BA_TUYEN, CHON_TUYEN, SAT_SO,
} from '../../data/sat';
import {SectionHeader, Card, Chip, Stat, Bullets, Filters, Accordion, Field} from './ui';

const VIEWS = [
  {id: 'cautruc', label: 'Cấu trúc và cơ chế thích ứng'},
  {id: 'mien', label: 'Tám miền và 36 dạng bài'},
  {id: 'lich', label: 'Lịch thi và mục tiêu'},
  {id: 'lotrinh', label: 'Lộ trình và chọn tuyến'},
];

const TenPhan = {'doc-viet': 'Đọc – Viết', toan: 'Toán'} as const;

/* ------------------------------ CẤU TRÚC ------------------------------- */
const CauTruc: React.FC = () => (
  <div className="space-y-8">
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Stat value={String(SAT_SPEC.tongCau)} label="câu hỏi" sub={`${SAT_SPEC.soCauDocViet} đọc–viết · ${SAT_SPEC.soCauToan} toán`} />
      <Stat value={`${SAT_SPEC.tongPhutLamBai}′`} label="phút làm bài" sub={`nghỉ giữa giờ ${SAT_SPEC.phutNghiGiua} phút`} />
      <Stat value={String(MODUN.length)} label="mô-đun" sub="hai phần, mỗi phần hai mô-đun" />
      <Stat value={`${SAT_SPEC.diemTong.min}–${SAT_SPEC.diemTong.max}`} label="thang điểm" sub={`mỗi phần ${SAT_SPEC.diemMoiPhan.min}–${SAT_SPEC.diemMoiPhan.max}`} />
    </div>

    <Card className="border-amber-500/30 bg-amber-500/5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
        Đọc trước khi dùng bất kỳ con số nào
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{SAT_NGUON.canhBao}</p>
      <p className="mt-3 text-xs text-slate-400">
        Tra cứu ngày {SAT_NGUON.ngayTraCuu} · nguồn {SAT_NGUON.nguonGoc}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">{SAT_NGUON.vinhVien}</p>
    </Card>

    <div>
      <h2 className="mb-3 text-lg font-bold text-slate-100">Bốn mô-đun và nhịp làm bài thật</h2>
      <p className="mb-4 max-w-3xl text-sm leading-relaxed text-slate-400">
        Cột cuối là con số quyết định toàn bộ chiến thuật, và hầu như không ai
        tính ra trước khi vào phòng thi.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
              <th className="py-2 pr-4">Mô-đun</th>
              <th className="py-2 pr-4">Số câu</th>
              <th className="py-2 pr-4">Phút</th>
              <th className="py-2">Giây mỗi câu</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {NHIP_LAM_BAI.map((m) => (
              <tr key={m.phan + m.soThuTu} className="border-b border-slate-800/60">
                <td className="py-2 pr-4 text-slate-200">
                  {TenPhan[m.phan]} · mô-đun {m.soThuTu}
                </td>
                <td className="py-2 pr-4 text-slate-300">{m.soCau}</td>
                <td className="py-2 pr-4 text-slate-300">{m.phut}</td>
                <td className="py-2 font-semibold text-sky-300">{m.giayMoiCau}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <Card className="border-sky-500/30 bg-sky-500/5">
      <h2 className="text-lg font-bold text-slate-100">Cơ chế thích ứng — chỗ quyết định trần điểm</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
        {([['Chạy thế nào', THICH_UNG.cachChay], ['Hậu quả', THICH_UNG.hauQua],
           ['Đảo ngược lời khuyên quen', THICH_UNG.daoNguoc],
           ['Mô-đun đóng là đóng hẳn', THICH_UNG.khongLuiDuoc],
           ['Không trừ điểm câu sai', THICH_UNG.khongDoanBua]] as const).map(([t, v]) => (
          <Field key={t} label={t}>{v}</Field>
        ))}
      </div>
    </Card>

    <Card>
      <Field label="Máy tính trong phòng thi">{SAT_SPEC.duocDungMayTinh}</Field>
    </Card>
  </div>
);

/* ------------------------------ TÁM MIỀN -------------------------------- */
const Mien: React.FC = () => {
  const [phan, setPhan] = useState<'tat-ca' | 'doc-viet' | 'toan'>('tat-ca');
  const hien = phan === 'tat-ca' ? MIEN : mienCuaPhan(phan);
  return (
    <div>
      <Filters
        options={[
          {id: 'tat-ca', label: `Cả hai phần (${MIEN.length} miền)`},
          {id: 'doc-viet', label: 'Đọc – Viết'},
          {id: 'toan', label: 'Toán'},
        ]}
        value={phan}
        onChange={(v) => setPhan(v as typeof phan)}
      />
      <div className="space-y-4">
        {hien.map((m) => {
          const ds = dangCuaMien(m.id);
          return (
            <Accordion
              key={m.id}
              title={`${m.ten} — ${m.tenAnh}`}
              subtitle={m.moTa}
              right={
                <span className="flex flex-col items-end gap-1">
                  <Chip tone={m.phan === 'toan' ? 'violet' : 'sky'}>
                    {Math.round(m.tyLe * 100)}% · ~{soCauCuaMien(m)} câu
                  </Chip>
                  <span className="text-[11px] text-slate-400">{ds.length} dạng</span>
                </span>
              }>
              <Card className="mb-4 border-rose-500/25 bg-rose-500/5">
                <Field label="Học viên Việt Nam hay hỏng ở đâu">{m.chetODau}</Field>
              </Card>
              <div className="space-y-3">
                {ds.map((d) => (
                  <div key={d.id} className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-semibold text-slate-100">{d.ten}</h3>
                      <Chip tone={d.nguongGiay <= 50 ? 'emerald' : d.nguongGiay <= 75 ? 'amber' : 'rose'}>
                        quá {d.nguongGiay}s thì bỏ
                      </Chip>
                    </div>
                    <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-300">
                      <Field label="Đọc vị">{d.docVi}</Field>
                      <Field label="Phương pháp">{d.phuongPhap}</Field>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Bước giải
                        </p>
                        <ol className="mt-1.5 space-y-1">
                          {d.buocGiai.map((b, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="shrink-0 font-mono text-xs text-sky-400">{i + 1}.</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      <Field label="Bẫy">{d.bay}</Field>
                      <p className="rounded-md border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-emerald-200">
                        <span className="font-semibold">Bí kíp: </span>{d.biKip}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------ LỊCH THI -------------------------------- */
const Lich: React.FC = () => {
  const homNay = new Date().toISOString().slice(0, 10);
  const ke = kyThiKeTiep(homNay);
  return (
    <div className="space-y-8">
      <Card className="border-emerald-500/30 bg-emerald-500/5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
          Kỳ gần nhất còn kịp đăng ký
        </p>
        {ke ? (
          <p className="mt-2 text-sm text-slate-300">
            Thi <span className="font-semibold text-slate-100">{ke.ngayThi}</span> — hạn đăng ký{' '}
            <span className="font-semibold text-slate-100">{ke.hanDangKy}</span>. Hạn hết lúc 23:59
            giờ miền Đông nước Mỹ, không phải giờ Việt Nam.
          </p>
        ) : (
          <p className="mt-2 text-sm text-slate-300">
            Mọi kỳ trong bảng đều đã qua hạn. Phải cập nhật lịch mới từ trang chính thức.
          </p>
        )}
      </Card>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[460px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
              <th className="py-2 pr-4">Ngày thi</th>
              <th className="py-2 pr-4">Hạn đăng ký</th>
              <th className="py-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {LICH_SAT.map((k) => {
              const qua = k.hanDangKy < homNay;
              return (
                <tr key={k.ngayThi} className="border-b border-slate-800/60">
                  <td className={`py-2 pr-4 ${qua ? 'text-slate-400' : 'text-slate-100'}`}>{k.ngayThi}</td>
                  <td className={`py-2 pr-4 ${qua ? 'text-slate-400' : 'text-slate-300'}`}>{k.hanDangKy}</td>
                  <td className="py-2">
                    <Chip tone={qua ? 'slate' : 'emerald'}>{qua ? 'đã qua hạn' : 'còn đăng ký được'}</Chip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Card>
        <Field label={`Lệ phí (${LE_PHI.tienTe})`}>
          Cơ bản {LE_PHI.coBan} + phụ thu ngoài Mỹ {LE_PHI.phuThuNgoaiMy} ={' '}
          <span className="font-semibold text-slate-100">{LE_PHI.tongNgoaiMy}</span>. {LE_PHI.ghiChu}
        </Field>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-bold text-slate-100">Từ điểm mục tiêu ra yêu cầu làm bài</h2>
        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-slate-400">
          Ngưỡng dưới đây phát biểu theo độ chính xác ở <span className="font-semibold text-slate-300">mô-đun 1</span>,
          là thứ học viên kiểm soát được — chứ không theo tổng số câu đúng, vì
          College Board không công bố bảng quy đổi và bảng đó còn đổi theo từng đề.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {MUC_TIEU_SAT.map((m) => (
            <Card key={m.diem}>
              <p className="text-2xl font-bold tracking-tight text-slate-100">{m.diem}</p>
              <p className="mt-0.5 text-xs font-semibold text-sky-300">{m.ten}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{m.chinhXacModun1}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{m.nghiaLa}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                <span className="font-semibold text-slate-300">Dành cho: </span>{m.danhCho}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------- LỘ TRÌNH --------------------------------- */
const LoTrinh: React.FC = () => (
  <div className="space-y-8">
    <div className="grid gap-3 sm:grid-cols-3">
      <Stat value={String(SAT_SO.soChang)} label="chặng" sub="gắn vào tầng 3, 4, 5 của hệ thống" />
      <Stat value={String(SAT_SO.tongTuan)} label="tuần" sub="nếu đi liền mạch" />
      <Stat value={String(SAT_SO.soDang)} label="dạng bài" sub={`trải ${SAT_SO.soMien} miền`} />
    </div>

    <div className="space-y-4">
      {LO_TRINH_SAT.map((c) => (
        <Card key={c.tang}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-bold text-slate-100">
              Tầng {c.tang} — {c.ten}
            </h2>
            <Chip tone="sky">{c.tuan} tuần</Chip>
          </div>
          <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-300">
            <Field label="Vào chặng khi nào">{c.vaoKhiNao}</Field>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Làm gì</p>
              <Bullets items={c.lam} />
            </div>
            <Field label="Ra chặng khi nào">{c.raKhiNao}</Field>
          </div>
        </Card>
      ))}
    </div>

    <div>
      <h2 className="mb-3 text-lg font-bold text-slate-100">Ba tuyến — chọn sai thì mất hàng trăm giờ</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
              <th className="py-2 pr-4">Tuyến</th>
              <th className="py-2 pr-4">Đo gì</th>
              <th className="py-2 pr-4">Toán</th>
              <th className="py-2 pr-4">Người chấm</th>
              <th className="py-2">Hợp với ai</th>
            </tr>
          </thead>
          <tbody>
            {BA_TUYEN.map((t) => (
              <tr key={t.tuyen} className="border-b border-slate-800/60 align-top">
                <td className="py-3 pr-4 font-semibold text-slate-100">{t.tuyen}</td>
                <td className="py-3 pr-4 text-slate-300">{t.doGi}</td>
                <td className="py-3 pr-4">
                  <Chip tone={t.coToan ? 'violet' : 'slate'}>{t.coToan ? 'có' : 'không'}</Chip>
                </td>
                <td className="py-3 pr-4">
                  <Chip tone={t.chamNguoi ? 'amber' : 'slate'}>{t.chamNguoi ? 'có' : 'máy chấm'}</Chip>
                </td>
                <td className="py-3 text-slate-300">{t.hopVoi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 space-y-3">
        <Card><Field label="Quy tắc chọn">{CHON_TUYEN.quyTac}</Field></Card>
        <Card><Field label="Học được cả hai không">{CHON_TUYEN.hocDuocCaHai}</Field></Card>
        <Card className="border-amber-500/25 bg-amber-500/5">
          <Field label="Cảnh báo">{CHON_TUYEN.canhBao}</Field>
        </Card>
      </div>
    </div>
  </div>
);

export const Sat: React.FC = () => {
  const [view, setView] = useState('cautruc');
  return (
    <div>
      <SectionHeader
        eyebrow="Tuyến thứ ba · du học Mỹ"
        title={SAT_CREED.name + ' — bài thi số hoá, thích ứng theo mô-đun'}
        lead={SAT_CREED.claim}
      />
      <Card className="mb-6 border-slate-700">
        <Field label="Tầng này KHÔNG phải cái gì">{SAT_CREED.khongPhai}</Field>
      </Card>
      <Filters options={VIEWS} value={view} onChange={setView} />
      {view === 'cautruc' && <CauTruc />}
      {view === 'mien' && <Mien />}
      {view === 'lich' && <Lich />}
      {view === 'lotrinh' && <LoTrinh />}
    </div>
  );
};
