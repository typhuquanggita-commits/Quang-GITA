import { useMemo, useState } from 'react';
import { go } from '@/state';
import {
  BANK_GRADES,
  BANK_SET_LABEL,
  bankExamById,
  bankByGrade,
  buildBankExam,
  gradeBankExam,
  bankStats,
  type BankExam,
  type BankGrade,
  type BankItem,
} from '@/data/exam-bank';
import { href } from '@/lib/routes';
import { Card, SectionTitle, Badge, Callout, Empty, LevelDots } from '@/components/ui';
import { Faq } from '@/components/Faq';
import { faqFor } from '@/data/faq';

/* ============================================================
   DANH SÁCH BỘ ĐỀ
   ============================================================ */

export function ExamBankList() {
  const st = bankStats();
  const [grade, setGrade] = useState<BankGrade>(9);
  const list = useMemo(() => bankByGrade(grade), [grade]);

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Luyện tập"
        title="Bộ đề luyện thi Toán theo khối"
        desc="Mỗi khối 100 đề, chia theo năm đợt ôn của năm học. Làm trực tiếp trên trang, chấm điểm ngay khi nộp và xem lời giải từng bước cho mọi câu."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: 'Tổng số đề', v: String(st.total) },
          { k: 'Đề mỗi khối', v: String(st.perGrade) },
          { k: 'Khối lớp', v: `${st.grades[0]} – ${st.grades[st.grades.length - 1]}` },
          { k: 'Đợt ôn mỗi khối', v: String(st.sets) },
        ].map((x) => (
          <Card key={x.k} className="p-4">
            <div className="text-[12px] font-semibold uppercase tracking-wide text-slate-500">{x.k}</div>
            <div className="mt-1 text-2xl font-extrabold text-slate-900">{x.v}</div>
          </Card>
        ))}
      </div>

      <Callout tone="amber" title="Đây là đề luyện tập, không phải đề thi thật">
        Đề trong kho này được dựng tự động từ ngân hàng bộ sinh đề đã kiểm chứng, đúng cấu trúc và
        đúng thang điểm, có lời giải từng bước cho mọi câu. Nhưng đề tự động <strong>không có</strong>{' '}
        barem chi tiết và bảng phân tích cho từng câu như 10 đề mẫu biên soạn tay ở mục{' '}
        <button className="underline" onClick={() => go(href('de-thi'))}>
          Đề thi thử có lời giải
        </button>
        . Dùng kho này để luyện đều và luyện tốc độ; dùng đề mẫu để học cách trình bày.
      </Callout>

      <div className="flex flex-wrap gap-2">
        {BANK_GRADES.map((g) => (
          <button
            key={g}
            onClick={() => setGrade(g)}
            className={`rounded-full px-4 py-1.5 text-[13px] font-bold transition ${
              g === grade ? 'bg-brand text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Lớp {g}
          </button>
        ))}
      </div>

      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {list.map((x) => (
          <Card key={x.id} className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                style={{ background: BANK_SET_LABEL[x.set].color }}
              >
                {BANK_SET_LABEL[x.set].short}
              </span>
              <span className="font-mono text-[11.5px] font-bold text-slate-500">{x.id}</span>
            </div>
            <div className="mt-1.5 text-[14px] font-extrabold text-slate-900">{x.title}</div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] text-slate-500">
              <span>{x.minutes} phút</span>
              <span>·</span>
              <span>thang {x.totalPoints}</span>
              <span>·</span>
              <span>{x.format === 'ba-phan' ? '3 phần như đề tốt nghiệp' : 'trắc nghiệm + tự luận'}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <LevelDots level={x.level} />
              <button
                className="btn btn-primary text-[12.5px]"
                onClick={() => go(href('bo-de-lam', { id: x.id }))}
              >
                Làm đề
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Faq items={faqFor('bo-de')} />
    </div>
  );
}

/* ============================================================
   LÀM ĐỀ VÀ CHẤM ĐIỂM
   ============================================================ */

function ItemView({
  item,
  value,
  onChange,
  submitted,
  earned,
}: {
  item: BankItem;
  value: string;
  onChange: (v: string) => void;
  submitted: boolean;
  earned: number;
}) {
  const ok = submitted && earned >= item.points - 1e-9;
  return (
    <Card className={`p-5 ${submitted ? (ok ? 'ring-1 ring-emerald-300' : 'ring-1 ring-rose-300') : ''}`}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="brand">{item.label}</Badge>
        <Badge tone="slate">{item.points} điểm</Badge>
        {submitted && (
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-bold text-white ${
              ok ? 'bg-emerald-600' : 'bg-rose-600'
            }`}
          >
            {earned} / {item.points} điểm
          </span>
        )}
      </div>
      <div className="mt-2 whitespace-pre-wrap text-[13.5px] leading-relaxed text-slate-800">
        {item.statement}
      </div>

      {item.format === 'trac-nghiem' && item.choices && (
        <div className="mt-3 grid gap-1.5">
          {item.choices.map((c, i) => {
            const picked = value === String(i);
            const isRight = submitted && i === item.correctIndex;
            return (
              <button
                key={c}
                disabled={submitted}
                onClick={() => onChange(String(i))}
                className={`rounded-lg border px-3 py-2 text-left text-[13px] transition ${
                  isRight
                    ? 'border-emerald-400 bg-emerald-50 font-semibold text-emerald-900'
                    : picked
                      ? 'border-brand bg-brand/5 font-semibold text-slate-900'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {String.fromCharCode(65 + i)}. {c}
              </button>
            );
          })}
        </div>
      )}

      {item.format === 'dung-sai' && item.claims && (
        <div className="mt-3 space-y-1.5">
          {item.claims.map((c, i) => {
            const mark = value[i] ?? '';
            return (
              <div key={c.text} className="rounded-lg border border-slate-200 px-3 py-2">
                <div className="flex flex-wrap items-start gap-2">
                  <div className="flex-1 text-[13px] leading-relaxed text-slate-800">
                    {String.fromCharCode(97 + i)}) {c.text}
                  </div>
                  <div className="flex shrink-0 gap-1">
                    {(['d', 's'] as const).map((m) => (
                      <button
                        key={m}
                        disabled={submitted}
                        onClick={() => {
                          const arr = value.padEnd(4, ' ').split('');
                          arr[i] = m;
                          onChange(arr.join('').trimEnd());
                        }}
                        className={`rounded px-2 py-0.5 text-[12px] font-bold transition ${
                          mark === m ? 'bg-brand text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {m === 'd' ? 'Đúng' : 'Sai'}
                      </button>
                    ))}
                  </div>
                </div>
                {submitted && (
                  <div
                    className={`mt-1 text-[12px] leading-relaxed ${
                      c.value ? 'text-emerald-800' : 'text-slate-600'
                    }`}
                  >
                    {c.why}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {(item.format === 'tra-loi-ngan' || item.format === 'tu-luan') && (
        <div className="mt-3">
          <input
            disabled={submitted}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={item.format === 'tra-loi-ngan' ? 'Điền đáp số…' : 'Điền đáp số cuối cùng…'}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-[13px] outline-none focus:border-brand"
          />
          {item.format === 'tu-luan' && !submitted && (
            <div className="mt-1 text-[12px] text-slate-500">
              Trình bày lời giải ra vở; ô này chỉ để nhập đáp số cho hệ thống chấm.
            </div>
          )}
        </div>
      )}

      {submitted && (
        <div className="mt-3 rounded-lg bg-slate-50 p-3">
          <div className="text-[12px] font-bold uppercase tracking-wide text-slate-500">
            Lời giải từng bước
          </div>
          <ol className="mt-1 space-y-1">
            {item.solution.map((s, i) => (
              <li key={s} className="text-[12.5px] leading-relaxed text-slate-700">
                {i + 1}. {s}
              </li>
            ))}
          </ol>
          <div className="mt-2 text-[12.5px] font-bold text-slate-900">Đáp án: {item.answer}</div>
        </div>
      )}
    </Card>
  );
}

export function ExamBankRun({ id }: { id: string }) {
  const meta = bankExamById(id);
  const exam: BankExam | undefined = useMemo(() => (meta ? buildBankExam(meta) : undefined), [meta]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(
    () => (exam && submitted ? gradeBankExam(exam, answers) : undefined),
    [exam, submitted, answers],
  );

  if (!meta || !exam) {
    return (
      <Empty
        title="Không tìm thấy đề luyện"
        desc="Mã đề này có thể đã đổi."
        action={
          <button className="btn btn-primary text-sm" onClick={() => go(href('bo-de'))}>
            Về kho bộ đề
          </button>
        }
      />
    );
  }

  const allItems = exam.parts.flatMap((p) => p.items);
  const answered = allItems.filter((i) => (answers[i.id] ?? '').trim()).length;

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow={`${exam.code} · ${BANK_SET_LABEL[exam.set].label}`}
        title={exam.title}
        desc={`${exam.minutes} phút · thang ${exam.totalPoints} điểm · ${allItems.length} câu. Nộp bài để được chấm ngay và xem lời giải từng bước.`}
      />

      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-[13px] text-slate-600">
            Đã trả lời <span className="font-extrabold text-slate-900">{answered}</span> / {allItems.length} câu
          </div>
          {result ? (
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-[15px] font-extrabold text-brand">
                Điểm: {result.earned} / {result.total}
              </div>
              <button
                className="btn btn-ghost text-[12.5px]"
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
              >
                Làm lại
              </button>
            </div>
          ) : (
            <button className="btn btn-primary text-sm" onClick={() => setSubmitted(true)}>
              Nộp bài và chấm điểm
            </button>
          )}
        </div>
      </Card>

      {result && (
        <Callout tone={result.earned >= 9 ? 'green' : result.earned >= 7 ? 'brand' : 'amber'} title="Đọc điểm">
          {result.earned >= 9
            ? 'Trên 9,0 — đang ở nhóm mục tiêu Top 1. Việc còn lại là giữ độ chính xác và tốc độ: xem lại những câu mất điểm và ghi vào sổ tay lỗi.'
            : result.earned >= 7
              ? 'Từ 7,0 đến 9,0 — nền đã chắc, khoảng cách nằm ở nhóm câu vận dụng. Xem lời giải các câu sai, rồi làm một đề cùng đợt ôn để kiểm chứng.'
              : 'Dưới 7,0 — nên quay lại chuyên đề trước khi luyện thêm đề. Xem các câu sai thuộc chuyên đề nào rồi vào đúng bộ phiếu của chuyên đề đó.'}
        </Callout>
      )}

      {exam.parts.map((part) => (
        <section key={part.label}>
          <h2 className="mb-1 text-[17px] font-extrabold text-slate-900">
            {part.label} — {part.points} điểm
          </h2>
          <div className="mb-3 text-[12.5px] text-slate-600">{part.note}</div>
          <div className="space-y-3">
            {part.items.map((it) => (
              <ItemView
                key={it.id}
                item={it}
                value={answers[it.id] ?? ''}
                onChange={(v) => setAnswers((a) => ({ ...a, [it.id]: v }))}
                submitted={submitted}
                earned={result?.perItem[it.id] ?? 0}
              />
            ))}
          </div>
        </section>
      ))}

      <div className="flex flex-wrap gap-2">
        {!submitted && (
          <button className="btn btn-primary text-sm" onClick={() => setSubmitted(true)}>
            Nộp bài và chấm điểm
          </button>
        )}
        <button className="btn btn-ghost text-sm" onClick={() => go(href('bo-de'))}>
          Về kho bộ đề
        </button>
        <button className="btn btn-ghost text-sm" onClick={() => go(href('de-cuong'))}>
          Xem đề cương ôn tập
        </button>
      </div>
    </div>
  );
}
