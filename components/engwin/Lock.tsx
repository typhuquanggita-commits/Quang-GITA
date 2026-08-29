/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Màn hình mã khoá — CHỈ có trên bản máy tính.
 *
 * Trên web tĩnh, một màn hình đăng nhập viết bằng JavaScript là bảo mật giả:
 * toàn bộ mã và nội dung đã nằm sẵn trong trình duyệt, ai mở công cụ nhà phát
 * triển cũng đọc được. Vì vậy màn hình này chỉ hiện khi có cầu nối máy tính,
 * nơi mã khoá thật sự dùng để giải mã tệp trên đĩa.
 */
import React, {useEffect, useState} from 'react';

type Phase = 'đang-dò' | 'tạo-mã' | 'mở-khoá' | 'xong';

const Shell: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
          GITA365
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-100">
          ENGWIN<span className="text-sky-400">365</span>
        </h1>
      </div>
      {children}
    </div>
  </div>
);

const Input: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onEnter?: () => void;
  autoFocus?: boolean;
}> = ({id, label, value, onChange, onEnter, autoFocus}) => (
  <div>
    <label htmlFor={id} className="text-xs font-medium text-slate-400">
      {label}
    </label>
    <input
      id={id}
      type="password"
      value={value}
      autoFocus={autoFocus}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
      className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
    />
  </div>
);

export const Lock: React.FC<{onUnlocked: () => void}> = ({onUnlocked}) => {
  const [phase, setPhase] = useState<Phase>('đang-dò');
  const [pass, setPass] = useState('');
  const [again, setAgain] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const bridge = window.engwin;
    if (!bridge) {
      setPhase('xong');
      return;
    }
    bridge.vault.status().then((s) => {
      if (s.unlocked) {
        setPhase('xong');
        onUnlocked();
      } else {
        setPhase(s.initialised ? 'mở-khoá' : 'tạo-mã');
      }
    });
  }, [onUnlocked]);

  const submitCreate = async () => {
    const v = window.engwin!.vault;
    setError(null);
    if (pass !== again) {
      setError('Hai lần nhập không khớp');
      return;
    }
    const check = await v.validate(pass);
    if (check.error) {
      setError(check.error);
      return;
    }
    setBusy(true);
    const r = await v.create(pass);
    setBusy(false);
    if (!r.ok) {
      setError(r.error ?? 'Không tạo được mã khoá');
      return;
    }
    setPass('');
    setAgain('');
    setPhase('xong');
    onUnlocked();
  };

  const submitUnlock = async () => {
    setError(null);
    setBusy(true);
    const r = await window.engwin!.vault.unlock(pass);
    setBusy(false);
    if (!r.ok) {
      setError(
        r.waitMs
          ? `${r.error}. Lần thử sau phải chờ ${Math.round(r.waitMs / 1000)} giây.`
          : (r.error ?? 'Mã khoá không đúng'),
      );
      return;
    }
    setPass('');
    setPhase('xong');
    onUnlocked();
  };

  if (phase === 'đang-dò') return null;
  if (phase === 'xong') return null;

  if (phase === 'tạo-mã') {
    return (
      <Shell>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-lg font-bold text-slate-100">Đặt mã khoá</h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            Mã khoá này dùng để mã hoá hồ sơ học tập của bạn trên chính máy này.
            Nó <span className="font-semibold text-amber-300">không được lưu ở
            đâu cả</span> — kể cả trong máy bạn. Mất mã khoá là mất hồ sơ, không
            có cách khôi phục. Đây là điều kiện để dữ liệu thật sự riêng tư.
          </p>
          <div className="mt-5 space-y-4">
            <Input
              id="pass-new"
              label="Mã khoá mới"
              value={pass}
              onChange={setPass}
              autoFocus
            />
            <Input
              id="pass-again"
              label="Nhập lại"
              value={again}
              onChange={setAgain}
              onEnter={submitCreate}
            />
          </div>
          <ul className="mt-4 space-y-1 text-[11px] text-slate-400">
            <li>· Từ 8 ký tự trở lên</li>
            <li>· Có ít nhất một chữ cái và một chữ số</li>
            <li>· Không dùng mã dễ đoán</li>
          </ul>
          {error && (
            <p className="mt-4 rounded-lg bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
              {error}
            </p>
          )}
          <button
            onClick={submitCreate}
            disabled={busy || !pass || !again}
            className="mt-5 w-full rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:opacity-40">
            {busy ? 'Đang tạo khoá…' : 'Tạo két và bắt đầu'}
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-lg font-bold text-slate-100">Mở khoá</h2>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">
          Nhập mã khoá để giải mã hồ sơ của bạn.
        </p>
        <div className="mt-5">
          <Input
            id="pass-unlock"
            label="Mã khoá"
            value={pass}
            onChange={setPass}
            onEnter={submitUnlock}
            autoFocus
          />
        </div>
        {error && (
          <p className="mt-4 rounded-lg bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
            {error}
          </p>
        )}
        <button
          onClick={submitUnlock}
          disabled={busy || !pass}
          className="mt-5 w-full rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:opacity-40">
          {busy ? 'Đang mở…' : 'Mở khoá'}
        </button>
        <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
          Sau ba lần nhập sai, mỗi lần thử tiếp theo sẽ phải chờ lâu dần. Đây là
          cách chặn việc dò mã bằng máy.
        </p>
      </div>
    </Shell>
  );
};
