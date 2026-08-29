/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import type {KetQua, MucTim} from '../../data/timkiem';

/* ==========================================================================
   Ô TÌM KIẾM TOÀN HỆ THỐNG

   Chỉ mục được nạp bằng import động ngay lần mở đầu tiên, không nạp lúc khởi
   động app. Nó kéo theo cả 365 ngày hồ sơ và 300 bài định hướng, nên nạp sẵn
   là bắt mọi người học trả giá cho một tính năng chỉ một phần trong số họ mở.
   ========================================================================== */

interface Api {
  xayIndex: () => MucTim[];
  tim: (cau: string, idx: MucTim[], gioiHan?: number) => KetQua[];
}

export const TimKiem: React.FC<{
  onDong: () => void;
  onChon: (tab: string) => void;
}> = ({onDong, onChon}) => {
  const [api, setApi] = useState<Api | null>(null);
  const [idx, setIdx] = useState<MucTim[] | null>(null);
  const [cau, setCau] = useState('');
  const [chon, setChon] = useState(0);
  const oNhap = useRef<HTMLInputElement>(null);
  const khung = useRef<HTMLDivElement>(null);

  // Nạp chỉ mục lần đầu mở.
  useEffect(() => {
    if (api) return;
    let huy = false;
    import('../../data/timkiem').then((m) => {
      if (huy) return;
      setApi({xayIndex: m.xayIndex, tim: m.tim});
      setIdx(m.xayIndex());
    });
    return () => {
      huy = true;
    };
  }, [api]);

  useEffect(() => {
    oNhap.current?.focus();
  }, []);

  const ketQua = useMemo(
    () => (api && idx ? api.tim(cau, idx, 40) : []),
    [api, idx, cau],
  );

  useEffect(() => setChon(0), [cau]);

  // Giữ dòng đang chọn trong tầm nhìn khi đi bằng bàn phím.
  useEffect(() => {
    khung.current
      ?.querySelector<HTMLElement>(`[data-hang="${chon}"]`)
      ?.scrollIntoView({block: 'nearest'});
  }, [chon]);

  const phim = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') return onDong();
    if (!ketQua.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setChon((c) => (c + 1) % ketQua.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setChon((c) => (c - 1 + ketQua.length) % ketQua.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      onChon(ketQua[chon].tab);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/80 p-4 pt-[8vh] backdrop-blur-sm"
      onClick={onDong}
      role="presentation">
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Tìm trong toàn hệ thống">
        <div className="flex items-center gap-3 border-b border-slate-800 px-4">
          <span aria-hidden="true" className="text-slate-400">
            ⌕
          </span>
          <input
            ref={oNhap}
            value={cau}
            onChange={(e) => setCau(e.target.value)}
            onKeyDown={phim}
            placeholder="Tìm bài luyện, cột mốc, triệu chứng, ngày trong hồ sơ…"
            aria-label="Từ khoá tìm kiếm"
            className="w-full bg-transparent py-4 text-[15px] text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onDong}
            aria-label="Đóng ô tìm kiếm"
            className="rounded border border-slate-700 px-2 py-0.5 text-[11px] font-medium text-slate-400 hover:text-slate-200">
            Esc
          </button>
        </div>

        <div ref={khung} className="max-h-[60vh] overflow-y-auto">
          {!idx && (
            <p className="px-4 py-8 text-center text-sm text-slate-400">
              Đang dựng chỉ mục…
            </p>
          )}
          {idx && cau.trim().length < 2 && (
            <div className="px-4 py-6 text-sm leading-relaxed text-slate-400">
              <p>
                Gõ từ hai ký tự trở lên. Tìm được trong{' '}
                <span className="font-semibold text-slate-200">
                  {idx.length.toLocaleString('vi-VN')}
                </span>{' '}
                mẩu nội dung của cả 29 mục.
              </p>
              <p className="mt-2">
                Không cần bỏ dấu — gõ <code className="text-slate-200">phat am</code>{' '}
                cũng ra <span className="text-slate-200">phát âm</span>.
              </p>
            </div>
          )}
          {idx && cau.trim().length >= 2 && !ketQua.length && (
            <p className="px-4 py-8 text-center text-sm text-slate-400">
              Không có kết quả cho “{cau}”.
            </p>
          )}
          {ketQua.map((r, i) => (
            <button
              key={`${r.tab}-${r.nhom}-${r.tieuDe}-${i}`}
              data-hang={i}
              onMouseEnter={() => setChon(i)}
              onClick={() => onChon(r.tab)}
              className={`flex w-full items-start gap-3 border-b border-slate-800/70 px-4 py-3 text-left transition ${
                i === chon ? 'bg-slate-800' : 'hover:bg-slate-800/50'
              }`}>
              <span className="mt-0.5 shrink-0 rounded bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-300 ring-1 ring-inset ring-slate-700">
                {r.nhom}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-slate-100">
                  {r.tieuDe}
                </span>
                {r.phu && (
                  <span className="mt-0.5 block truncate text-[12px] text-slate-400">
                    {r.phu}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>

        <p className="border-t border-slate-800 px-4 py-2 text-[11px] text-slate-400">
          ↑ ↓ chọn · Enter mở mục chứa nội dung đó · Esc đóng
        </p>
      </div>
    </div>
  );
};
