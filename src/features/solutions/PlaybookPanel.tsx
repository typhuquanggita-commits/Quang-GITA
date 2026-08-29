import { useState } from 'react';
import { PLAYBOOK_BY_TOPIC, type PatternPlaybook } from '../../data/playbook';
import { Badge } from '../../components/ui/primitives';

/**
 * BANG BI KIP
 *
 * Bo kien thuc tra loi "phai on lai cai gi". Bang nay tra loi ba cau hoi kho
 * hon: DOC VI de nay thuoc dang nao, PHUONG PHAP nao, va BUOC GIAI cu the ra
 * sao — kem MEO va SAI LAM dac trung cua rieng dang do.
 *
 * Vi sao no phai o day, ngay canh loi giai cua tung cau: doc loi giai xong,
 * nguoi hoc gat gu "hieu roi" nhung hom sau gap cau tuong tu van tac. Thu ho
 * thieu khong phai phep bien doi ma la CAI NHIN dau tien — de nay thuoc dang
 * gi. Bang bi kip dat dung cai nhin ay canh loi giai.
 *
 * Mac dinh dong lai: mo san se lam nguoi hoc doc no thay vi tu nghi. No la
 * thu de doi chieu SAU khi da thu, khong phai thu de doc TRUOC khi thu.
 */
export function PlaybookPanel({ topicId, topicLabel }: { topicId: string; topicLabel: string }) {
  const playbook = PLAYBOOK_BY_TOPIC.get(topicId);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  if (!playbook) return null;
  const pattern = playbook.patterns[active] ?? playbook.patterns[0];
  if (!pattern) return null;

  return (
    <div className="mt-4 rounded-xl border border-brand-line bg-brand-soft/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="min-w-0">
          <span className="text-sm font-semibold text-fg">Kho bí kíp — {topicLabel}</span>
          <span className="mt-0.5 block truncate text-xs text-fg-muted">
            Đọc vị · phương pháp · bước giải · mẹo xử lý
          </span>
        </span>
        <span className="shrink-0 text-sm text-fg-subtle">{open ? 'Thu gọn' : 'Mở rộng'}</span>
      </button>

      {open && (
        <div className="space-y-5 border-t border-brand-line px-4 py-4">
          <p className="text-sm italic text-fg-muted">
            Câu hỏi lớn của chuyên đề này: <span className="not-italic text-fg">{playbook.bigQuestion}</span>
          </p>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Các dạng bài">
            {playbook.patterns.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={
                  i === active
                    ? 'rounded-lg border border-brand bg-brand px-3 py-1.5 text-xs font-medium text-white'
                    : 'rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-medium text-fg-muted hover:text-fg'
                }
              >
                {p.name}
              </button>
            ))}
          </div>

          <PatternDetail pattern={pattern} />

          <div>
            <h4 className="text-xs font-medium uppercase tracking-wide text-fg-subtle">
              Bí kíp của cả chuyên đề
            </h4>
            <ul className="mt-2 space-y-3">
              {playbook.secrets.map((secret) => (
                <li key={secret.title} className="rounded-lg border border-line bg-surface p-3">
                  <p className="text-sm font-medium text-fg">{secret.title}</p>
                  <p className="mt-1 text-sm text-fg-muted">{secret.body}</p>
                  <p className="mt-1.5 text-xs text-fg-subtle">Dùng khi: {secret.when}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export function PatternDetail({ pattern }: { pattern: PatternPlaybook }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-xs font-medium uppercase tracking-wide text-fg-subtle">
          Đọc vị — nhìn vào đâu là biết
        </h4>
        <ul className="mt-1.5 space-y-1 text-sm text-fg-muted">
          {pattern.tell.map((t) => (
            <li key={t} className="flex gap-2">
              <span aria-hidden="true" className="text-brand">
                ▸
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-xs font-medium uppercase tracking-wide text-fg-subtle">Phương pháp</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{pattern.method}</p>
      </div>

      <div>
        <h4 className="text-xs font-medium uppercase tracking-wide text-fg-subtle">Bước giải</h4>
        <ol className="mt-1.5 space-y-2">
          {pattern.steps.map((step, i) => (
            <li key={step.action} className="flex gap-3 text-sm">
              <span className="grid size-5 shrink-0 place-items-center rounded-md bg-brand-soft text-[0.6875rem] font-semibold text-brand">
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="text-fg">{step.action}</span>
                <span className="mt-0.5 block text-fg-muted">→ {step.why}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      {pattern.trick && (
        <p className="rounded-lg border border-ok/40 bg-ok-soft p-3 text-sm leading-relaxed text-fg-muted">
          <Badge tone="ok">Mẹo</Badge> <span className="ml-1">{pattern.trick}</span>
        </p>
      )}

      {pattern.pitfall && (
        <p className="rounded-lg border border-bad/40 bg-bad-soft p-3 text-sm leading-relaxed text-fg-muted">
          <Badge tone="bad">Sai lầm đặc trưng</Badge> <span className="ml-1">{pattern.pitfall}</span>
        </p>
      )}
    </div>
  );
}
