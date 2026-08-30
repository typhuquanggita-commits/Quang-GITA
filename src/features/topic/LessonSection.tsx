import { lessonFor } from '../../data/lessons';
import { Badge, Card, CardHeader } from '../../components/ui/primitives';

/**
 * BAI GIANG CUA CHUYEN DE
 *
 * Dat giua phieu kien thuc va kho bi kip, dung theo mach su pham: hoc y →
 * tu kiem → xem lam mau → xem mot loi giai sai bi mo ra.
 *
 * Phan "loi giai sai" duoc de o cuoi va co the mo ra dong lai. Ly do: neu
 * hien san, nguoi hoc doc no nhu mot phan kien thuc va co the nho nham loi
 * giai sai thanh loi giai dung. Phai bam de mo thi ho biet ro minh dang doc
 * mot thu SAI.
 */
export function LessonSection({ topicId }: { topicId: string }) {
  const lesson = lessonFor(topicId);
  if (!lesson) return null;

  return (
    <Card>
      <CardHeader
        title="Bài giảng chuyên đề"
        subtitle={lesson.hook}
        action={<Badge tone="brand">{lesson.minutes} phút</Badge>}
      />

      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-fg">Mạch kiến thức — tự kiểm từng bước</h3>
        <ol className="space-y-3">
          {lesson.build.map((block, i) => (
            <li key={block.idea} className="rounded-xl border border-line bg-surface-2 p-3.5">
              <p className="text-sm font-medium text-fg">
                {i + 1}. {block.idea}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{block.explain}</p>
              <details className="mt-2.5">
                <summary className="cursor-pointer text-sm text-brand">Tự kiểm: {block.check}</summary>
                <p className="mt-1.5 text-sm text-fg-muted">{block.checkAnswer}</p>
              </details>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6 space-y-3">
        <h3 className="text-sm font-semibold text-fg">
          Ví dụ mẫu giải từng bước
          <span className="ml-2 font-normal text-fg-subtle">({lesson.examples.length} bài)</span>
        </h3>
        {lesson.examples.map((example) => (
          <article key={example.id} className="rounded-xl border border-line bg-surface-2 p-4">
            <h4 className="text-sm font-semibold text-fg">{example.title}</h4>
            <p className="mt-2 rounded-lg bg-surface p-3 text-sm leading-relaxed text-fg">{example.problem}</p>

            <ol className="mt-3 space-y-2.5">
              {example.steps.map((step, i) => (
                <li key={step.do} className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm text-fg">{step.do}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-fg-muted">Vì sao: {step.why}</p>
                    {step.result ? (
                      <p className="mt-1 rounded bg-surface px-2 py-1 font-mono text-xs text-fg">{step.result}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-3 rounded-lg border-l-4 border-l-ok bg-ok-soft p-3 text-sm text-fg">
              <strong>Đáp án:</strong> {example.answer}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              <strong className="text-fg">Rút ra:</strong> {example.takeaway}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6">
        <h3 className="text-sm font-semibold text-fg">Một lời giải SAI, mổ tận nơi</h3>
        <p className="mt-1.5 text-sm text-fg-muted">
          Phần dưới đây trình bày một lời giải sai đầy đủ như thật, rồi chỉ ra đúng bước nó rẽ nhầm. Nhận ra lỗi
          của mình trong một lời giải cụ thể hiệu quả hơn nhiều so với đọc một cảnh báo chung chung.
        </p>

        <div className="mt-3 rounded-xl border border-warn bg-warn-soft p-4">
          <p className="text-sm leading-relaxed text-fg">{lesson.wrongTurn.problem}</p>

          <ol className="mt-3 space-y-1.5">
            {lesson.wrongTurn.attempt.map((line, i) => {
              const broken = i + 1 === lesson.wrongTurn.brokeAtStep;
              return (
                <li
                  key={line}
                  className={
                    'rounded-lg px-3 py-2 text-sm ' +
                    (broken ? 'bg-bad-soft font-medium text-fg ring-1 ring-bad' : 'bg-surface text-fg-muted')
                  }
                >
                  {i + 1}. {line}
                  {broken ? <span className="ml-2 text-xs font-semibold text-bad">← sai từ đây</span> : null}
                </li>
              );
            })}
          </ol>

          <details className="mt-3">
            <summary className="cursor-pointer text-sm font-medium text-brand">
              Sai ở đâu và vì sao dễ mắc?
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-fg">{lesson.wrongTurn.diagnosis}</p>
            <p className="mt-2.5 rounded-lg border-l-4 border-l-ok bg-ok-soft p-3 text-sm leading-relaxed text-fg">
              <strong>Sửa lại:</strong> {lesson.wrongTurn.fix}
            </p>
          </details>
        </div>
      </section>
    </Card>
  );
}
