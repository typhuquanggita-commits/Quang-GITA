import { useMemo, useState } from 'react';
import { SECTIONS } from '../../config';
import { PLAYBOOK_BY_TOPIC } from '../../data/playbook';
import {
  BAREM_RULES,
  MOCK_EXAMS,
  PAPERS_PER_SERIES,
  SCORE_BANDS,
  buildPaper,
  paperCode,
  type PaperItem,
} from '../../data/mockExams';
import { PASSAGE_BY_ID } from '../../data/passages';
import { DIFFICULTY_LABEL } from '../../config';
import { cn } from '../../lib/cn';
import { formatNumber } from '../../lib/format';
import { navigate, useRoute } from '../../lib/router';
import { DocumentShell } from '../../components/DocumentShell';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  EmptyState,
  Segmented,
  Select,
} from '../../components/ui/primitives';

/**
 * DE MAU TRON VEN
 *
 * He thong da sinh duoc de thi thu tu ma tran, nhung MA TRAN khong phai DE.
 * Man hinh nay la mot VAN BAN: co ma so, thu tu cau co dinh, dap an va barem —
 * thu ma giao vien in ra phat cho ca lop va hai nguoi doc thi thay dung mot
 * noi dung.
 *
 * Bon che do xem, va thu tu cua chung co chu y:
 *   1. De thi     — khong co dap an. In ra la lam duoc.
 *   2. Ma tran    — de thay de nay do cai gi, phan bo the nao.
 *   3. Đáp án & barem — bang tra cuu nhanh kem luat cham.
 *   4. Lời giải   — day du, kem doc vi dang bai cua tung cau.
 *
 * De thi dung TRUOC dap an, vi mot tai lieu mo ra la thay dap an thi khong con
 * la de thi nua.
 */

type Mode = 'de' | 'matran' | 'dapan' | 'loigiai';

const MODES: ReadonlyArray<{ value: Mode; label: string }> = [
  { value: 'de', label: 'Đề thi' },
  { value: 'matran', label: 'Ma trận' },
  { value: 'dapan', label: 'Đáp án & barem' },
  { value: 'loigiai', label: 'Lời giải' },
];

export function PaperPage() {
  const route = useRoute();
  const requested = route.params.get('code') ?? paperCode(MOCK_EXAMS[0]?.code ?? '', 1);
  const [mode, setMode] = useState<Mode>('de');

  const paper = useMemo(() => buildPaper(requested), [requested]);

  if (!paper) {
    return (
      <EmptyState
        heading="h1"
        icon="📄"
        title="Không tìm thấy đề mẫu"
        description="Mã đề không tồn tại. Chọn một trong các đề mẫu chính thức của hệ thống."
        action={
          <Button variant="primary" onClick={() => navigate(`/paper?code=${paperCode(MOCK_EXAMS[0]?.code ?? '', 1)}`)}>
            Mở đề mẫu số 01
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="no-print">
        <CardHeader
          title="Bộ đề mẫu chính thức"
          subtitle={`Mỗi tổ hợp phần 3 có trọn ${PAPERS_PER_SERIES} đề, và hai đề bất kỳ trong cùng một bộ không dùng chung quá 40% số câu. Cùng một mã đề luôn cho ra đúng một nội dung, trên mọi máy và mọi lần mở.`}
        />
        <div className="flex flex-wrap items-end gap-4">
          <label className="flex min-w-56 flex-col gap-1.5 text-sm">
            <span className="font-medium text-fg">Mã đề</span>
            <Select value={requested} onChange={(e) => navigate(`/paper?code=${e.target.value}`)}>
              {MOCK_EXAMS.map((exam) => (
                <optgroup key={exam.code} label={exam.section3Name}>
                  {Array.from({ length: PAPERS_PER_SERIES }, (_, i) => {
                    const code = paperCode(exam.code, i + 1);
                    return (
                      <option key={code} value={code}>
                        {code} — đề số {i + 1}
                      </option>
                    );
                  })}
                </optgroup>
              ))}
            </Select>
          </label>
          <Segmented value={mode} onChange={setMode} options={MODES} label="Chế độ xem" />
          <Button onClick={() => window.print()}>In tài liệu</Button>
        </div>
      </Card>

      <DocumentShell
        kind={mode === 'de' ? 'PL' : mode === 'loigiai' ? 'LG' : 'BC'}
        code={`${paper.spec.code}${mode === 'de' ? '' : mode === 'matran' ? '-MT' : mode === 'dapan' ? '-DA' : '-LG'}`}
        title={paper.spec.name}
        subtitle={paper.spec.intro}
        meta={
          <>
            {formatNumber(paper.totalQuestions)} câu · {paper.totalMinutes} phút
            <br />
            Thang {formatNumber(paper.maxScore)} điểm
          </>
        }
      >
        {mode === 'de' && <ExamView paper={paper} />}
        {mode === 'matran' && <MatrixView paper={paper} />}
        {mode === 'dapan' && <AnswerKeyView paper={paper} />}
        {mode === 'loigiai' && <SolutionsView paper={paper} />}
      </DocumentShell>
    </div>
  );
}

type Paper = NonNullable<ReturnType<typeof buildPaper>>;

function SectionHeading({
  index,
  officialName,
  name,
  minutes,
  count,
}: {
  index: number;
  officialName: string;
  name: string;
  minutes: number;
  count: number;
}) {
  return (
    <header className={cn('doc-block border-b-2 border-brand pb-2', index > 0 && 'doc-break pt-2')}>
      <h2 className="text-base font-semibold text-fg">{officialName}</h2>
      <p className="text-sm text-fg-muted">
        {name} · {count} câu · {minutes} phút
      </p>
    </header>
  );
}

function ExamView({ paper }: { paper: Paper }) {
  return (
    <div className="space-y-8">
      <p className="rounded-lg border border-line bg-surface-2 p-3 text-sm text-fg-muted">
        <strong className="text-fg">Hướng dẫn làm bài.</strong> Ba phần thi tính giờ riêng, không cộng
        dồn: làm nhanh phần trước không cho thêm phút nào cho phần sau. Mỗi câu đúng 1 điểm, câu sai
        không bị trừ điểm — vì vậy{' '}
        <strong className="text-fg">không được để trống bất kỳ câu nào khi hết giờ</strong>.
      </p>

      {paper.sections.map((section, i) => (
        <section key={section.section} className="space-y-5">
          <SectionHeading
            index={i}
            officialName={section.officialName}
            name={section.name}
            minutes={section.minutes}
            count={section.items.length}
          />
          {section.items.map((item) => (
            <ItemView key={item.question.id} item={item} />
          ))}
        </section>
      ))}
    </div>
  );
}

function ItemView({ item }: { item: PaperItem }) {
  const passage = item.question.passageId ? PASSAGE_BY_ID.get(item.question.passageId) : undefined;
  return (
    <article className="doc-block">
      {passage && (
        <div className="mb-3 rounded-lg border border-line bg-surface-2 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">
            Ngữ liệu: {passage.title}
          </p>
          <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-fg-muted">
            {passage.body}
          </p>
        </div>
      )}
      <p className="text-sm leading-relaxed text-fg">
        <strong className="mr-1.5">Câu {item.number}.</strong>
        {item.question.stem}
      </p>
      {item.question.choices ? (
        <ol className="mt-2 grid gap-1 sm:grid-cols-2">
          {item.question.choices.map((choice) => (
            <li key={choice.id} className="text-sm text-fg-muted">
              <span className="font-medium text-fg">{choice.id}.</span> {choice.text}
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-2 text-sm text-fg-subtle">Điền đáp án: ……………………………</p>
      )}
    </article>
  );
}

function MatrixView({ paper }: { paper: Paper }) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-fg-muted">
        Ma trận cho biết đề này đo cái gì và đo bao nhiêu. Số câu mỗi chuyên đề tỉ lệ với tỉ trọng
        xuất hiện của chuyên đề đó trong đề thật, nên thời gian ôn theo ma trận này đi đúng chỗ.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-subtle">
              <th scope="col" className="px-2 py-2">Chuyên đề</th>
              <th scope="col" className="px-2 py-2">Phần</th>
              {[1, 2, 3, 4, 5].map((d) => (
                <th key={d} scope="col" className="px-2 py-2 text-center">
                  Mức {d}
                </th>
              ))}
              <th scope="col" className="px-2 py-2 text-right">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {paper.matrix.map((row) => (
              <tr key={row.topicId} className="border-b border-line/60">
                <th scope="row" className="px-2 py-2 font-normal text-fg">{row.topicName}</th>
                <td className="px-2 py-2 text-fg-muted">
                  {SECTIONS.find((s) => s.id === row.section)?.shortName}
                </td>
                {([1, 2, 3, 4, 5] as const).map((d) => (
                  <td key={d} className="px-2 py-2 text-center tabular-nums text-fg-muted">
                    {row.byDifficulty[d] || '—'}
                  </td>
                ))}
                <td className="px-2 py-2 text-right font-medium tabular-nums text-fg">{row.total}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-line">
              <th scope="row" colSpan={7} className="px-2 py-2 text-right font-medium text-fg">
                Tổng số câu
              </th>
              <td className="px-2 py-2 text-right font-semibold tabular-nums text-fg">
                {paper.totalQuestions}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

function AnswerKeyView({ paper }: { paper: Paper }) {
  return (
    <div className="space-y-6">
      <section className="doc-block">
        <h2 className="text-base font-semibold text-fg">Barem chấm</h2>
        <ol className="mt-3 space-y-3">
          {BAREM_RULES.map((rule, i) => (
            <li key={rule.rule} className="flex gap-3 text-sm">
              <span className="grid size-5 shrink-0 place-items-center rounded-md bg-brand-soft text-[0.6875rem] font-semibold text-brand">
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="font-medium text-fg">{rule.rule}</span>
                <span className="mt-0.5 block text-fg-muted">{rule.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="doc-block">
        <h2 className="text-base font-semibold text-fg">Thang xếp loại</h2>
        <table className="mt-2 w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-subtle">
              <th scope="col" className="px-2 py-2">Điểm</th>
              <th scope="col" className="px-2 py-2">Xếp loại</th>
              <th scope="col" className="px-2 py-2">Đọc con số này thế nào</th>
            </tr>
          </thead>
          <tbody>
            {SCORE_BANDS.map((band) => (
              <tr key={band.label} className="border-b border-line/60">
                <th scope="row" className="whitespace-nowrap px-2 py-2 font-normal tabular-nums text-fg">
                  {band.min > 0 ? `từ ${band.min}` : `dưới ${SCORE_BANDS.at(-2)?.min ?? 70}`}
                </th>
                <td className="px-2 py-2 font-medium text-fg">{band.label}</td>
                <td className="px-2 py-2 text-fg-muted">{band.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {paper.sections.map((section, i) => (
        <section key={section.section} className="space-y-3">
          <SectionHeading
            index={i}
            officialName={section.officialName}
            name={section.name}
            minutes={section.minutes}
            count={section.items.length}
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-subtle">
                  <th scope="col" className="px-2 py-1.5">Câu</th>
                  <th scope="col" className="px-2 py-1.5">Đáp án</th>
                  <th scope="col" className="px-2 py-1.5">Chuyên đề</th>
                  <th scope="col" className="px-2 py-1.5 text-center">Mức</th>
                  <th scope="col" className="px-2 py-1.5 text-right">Thời gian mục tiêu</th>
                  <th scope="col" className="px-2 py-1.5 text-right">Điểm</th>
                </tr>
              </thead>
              <tbody>
                {section.items.map((item) => (
                  <tr key={item.question.id} className="border-b border-line/60">
                    <th scope="row" className="px-2 py-1.5 font-normal tabular-nums text-fg">
                      {item.number}
                    </th>
                    <td className="px-2 py-1.5 font-semibold text-brand">{item.question.answer}</td>
                    <td className="px-2 py-1.5 text-fg-muted">{item.topicName}</td>
                    <td className="px-2 py-1.5 text-center tabular-nums text-fg-muted">
                      {item.question.difficulty}
                    </td>
                    <td className="px-2 py-1.5 text-right tabular-nums text-fg-muted">
                      {item.question.estimatedSeconds}s
                    </td>
                    <td className="px-2 py-1.5 text-right tabular-nums text-fg-muted">{item.points}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-line">
                  <th scope="row" colSpan={5} className="px-2 py-2 text-right font-medium text-fg">
                    Tổng điểm phần này
                  </th>
                  <td className="px-2 py-2 text-right font-semibold tabular-nums text-fg">
                    {section.maxScore}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

function SolutionsView({ paper }: { paper: Paper }) {
  return (
    <div className="space-y-8">
      <p className="rounded-lg border border-line bg-surface-2 p-3 text-sm text-fg-muted">
        Mỗi lời giải kèm <strong className="text-fg">đọc vị dạng bài</strong> — thứ quyết định bạn có
        làm được câu tương tự vào hôm sau hay không. Kho bí kíp đầy đủ của từng chuyên đề nằm ở phiếu
        hướng dẫn ôn chắc.
      </p>

      {paper.sections.map((section, i) => (
        <section key={section.section} className="space-y-5">
          <SectionHeading
            index={i}
            officialName={section.officialName}
            name={section.name}
            minutes={section.minutes}
            count={section.items.length}
          />
          {section.items.map((item) => (
            <SolutionItem key={item.question.id} item={item} />
          ))}
        </section>
      ))}
    </div>
  );
}

function SolutionItem({ item }: { item: PaperItem }) {
  const playbook = PLAYBOOK_BY_TOPIC.get(item.question.topicId);
  const trap = item.question.traps;

  return (
    <article className="doc-block rounded-lg border border-line p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-semibold text-fg">
          Câu {item.number} · Đáp án <span className="text-brand">{item.question.answer}</span>
        </p>
        <p className="text-xs text-fg-subtle">
          {item.topicName} · {DIFFICULTY_LABEL[item.question.difficulty]} ·{' '}
          {item.question.estimatedSeconds}s
        </p>
      </div>

      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{item.question.explanation}</p>

      {trap && Object.keys(trap).length > 0 && (
        <ul className="mt-2 space-y-1">
          {Object.entries(trap).map(([id, reason]) => (
            <li key={id} className="text-sm text-fg-muted">
              <Badge tone="bad">Bẫy {id}</Badge> <span className="ml-1">{reason}</span>
            </li>
          ))}
        </ul>
      )}

      {playbook && (
        <p className="mt-2 text-xs text-fg-subtle">
          <strong className="text-fg-muted">Đọc vị:</strong> {playbook.patterns[0]?.tell[0]}
          {playbook.patterns.length > 1 && ` (chuyên đề này có ${playbook.patterns.length} dạng bài)`}
        </p>
      )}
    </article>
  );
}
