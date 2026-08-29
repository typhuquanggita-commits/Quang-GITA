/**
 * A published paper: the question paper, the solutions, and the mark scheme.
 *
 * Three documents that belong together and must never be handed out together.
 * The tab arrangement is the point — a candidate opens the paper, an
 * invigilator holds the scheme, and the solutions come out afterwards. Printing
 * them as one document would defeat all three.
 *
 * The mark scheme is the part that did not exist before. The platform scores by
 * estimating ability from the response pattern, which a person marking on paper
 * cannot do; so the scheme inverts the form's own characteristic curve to give
 * a raw-to-scaled table that agrees with the engine by construction rather than
 * by coincidence.
 */

import React, { useMemo, useState } from 'react';
import type { Question, SectionId, TestModule } from '../../types.ts';
import { BANK, QUESTION_BY_ID } from '../../data/bank.ts';
import { PAPERS, paperById } from '../../data/papers.ts';
import { domainLabel, sectionLabel, skillLabel } from '../../data/blueprint.ts';
import { assembleLinearForm } from '../../engine/adaptive.ts';
import { formComposition, markScheme } from '../../engine/markScheme.ts';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty, Tabs } from '../../components/ui/primitives.tsx';
import { AnswerArea, Explanation, StimulusView } from '../../components/ui/QuestionView.tsx';
import { IconAlert, IconClipboard, IconPrint } from '../../components/ui/icons.tsx';
import { formatDate, formatClock } from '../../lib/util.ts';
import { DocumentFrame } from '../../brand/DocumentFrame.tsx';
import type { Route } from '../shell/routes.ts';

type Tab = 'paper' | 'solutions' | 'scheme' | 'spec';

export function PaperView({
  paperId,
  navigate,
}: {
  paperId: string;
  navigate(route: Route): void;
}): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const vi = locale === 'vi';
  const [tab, setTab] = useState<Tab>('paper');

  const paper = paperById(paperId);

  /*
   * Rebuilt from the seed rather than stored. Deterministic assembly means the
   * same seed is the same paper on every device and every build, which is what
   * "published" has to mean.
   */
  const form = useMemo(
    () =>
      paper
        ? assembleLinearForm({ scope: paper.scope, bank: BANK, label: paper.name, seed: paper.seed })
        : null,
    [paper],
  );

  const sections = useMemo(() => {
    if (!form) return [];
    const bySection = new Map<SectionId, TestModule[]>();
    for (const module of form.modules) {
      const list = bySection.get(module.section) ?? [];
      list.push(module);
      bySection.set(module.section, list);
    }
    return [...bySection].map(([section, modules]) => {
      const questions = modules.flatMap((m) =>
        m.questionIds.map((id) => QUESTION_BY_ID.get(id)).filter((q): q is Question => Boolean(q)),
      );
      const pretest = new Set(modules.flatMap((m) => m.pretestIds));
      const operational = questions.filter((q) => !pretest.has(q.id));
      return { section, modules, questions, operational, pretest };
    });
  }, [form]);

  if (!paper || !form) {
    return (
      <div className="page">
        <Empty
          title={vi ? 'Không có đề này' : 'No such paper'}
          action={<Button onClick={() => navigate({ name: 'papers' })}>{vi ? 'Quay lại' : 'Back'}</Button>}
        />
      </div>
    );
  }

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: 'paper', label: vi ? 'Đề thi' : 'Question paper' },
    { id: 'solutions', label: vi ? 'Lời giải' : 'Solutions' },
    { id: 'scheme', label: vi ? 'Barem' : 'Mark scheme' },
    { id: 'spec', label: vi ? 'Ma trận đề' : 'Specification' },
  ];

  return (
    <div className="page stack gap-6">
      <header className="page-head no-print">
        <Button variant="ghost" onClick={() => navigate({ name: 'papers' })}>
          ← {vi ? 'Bộ đề công bố' : 'Published papers'}
        </Button>
        <div className="between wrap gap-4">
          <div>
            <h1 className="page-title">{vi ? paper.nameVi : paper.name}</h1>
            <p className="page-sub">
              {vi ? 'Công bố' : 'Published'} {formatDate(paper.published, locale)} ·{' '}
              {vi ? 'mã' : 'ref'} {paper.id}
            </p>
          </div>
          <Button onClick={() => window.print()}>
            <IconPrint size={16} /> {vi ? 'In phần đang xem' : 'Print this tab'}
          </Button>
        </div>
      </header>

      {/*
        Said once, prominently, and repeated on the printed scheme: these three
        documents must not travel together.
      */}
      <div className="escalation no-print" data-severity="attention">
        <IconAlert size={20} />
        <div>
          <strong>{vi ? 'Ba tài liệu, không phát cùng nhau' : 'Three documents, not handed out together'}</strong>
          <p>
            {vi
              ? 'Thí sinh nhận đề. Người coi thi giữ barem. Lời giải phát sau khi đã thu bài. In từng phần riêng — in cả ba thành một tập là hỏng cả ba.'
              : 'The candidate gets the paper. The invigilator holds the scheme. The solutions come out after the papers are collected. Print each tab separately: printing all three as one document defeats all three.'}
          </p>
        </div>
      </div>

      <Tabs<Tab> tabs={tabs} value={tab} onChange={setTab} ariaLabel={vi ? 'Phần của đề' : 'Paper sections'} />

      {tab === 'paper' && <QuestionPaper paper={paper} sections={sections} locale={locale} />}
      {tab === 'solutions' && <Solutions paper={paper} sections={sections} locale={locale} t={t} />}
      {tab === 'scheme' && <Scheme paper={paper} form={form} sections={sections} locale={locale} />}
      {tab === 'spec' && <Specification paper={paper} sections={sections} locale={locale} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The four documents — module scope, per the standing rule            */
/* ------------------------------------------------------------------ */

interface SectionSet {
  section: SectionId;
  modules: TestModule[];
  questions: Question[];
  operational: Question[];
  pretest: Set<string>;
}

type Paper = (typeof PAPERS)[number];

function QuestionPaper({
  paper,
  sections,
  locale,
}: {
  paper: Paper;
  sections: SectionSet[];
  locale: 'vi' | 'en';
}): React.ReactElement {
  const vi = locale === 'vi';
  let number = 0;

  return (
    <DocumentFrame
      kind={vi ? 'Đề thi' : 'Question paper'}
      title={vi ? paper.nameVi : paper.name}
      pillar="goal"
      date={formatDate(paper.published, locale)}
      reference={paper.id}
      locale={locale}
      limits={
        vi
          ? 'Đề tuyến tính: mọi thí sinh nhận cùng một bộ câu hỏi, nên đề in được và chấm tay được. Nó đo kém chính xác hơn một chút so với bản thi thích ứng trên máy — đó là cái giá phải trả để đề có thể in ra. Tham số độ khó là ước lượng của người soạn, chưa hiệu chuẩn.'
          : 'A linear paper: every candidate receives the same items, which is what makes it printable and hand-markable. It measures slightly less precisely than the adaptive delivery on screen — that is the cost of being printable. Difficulty parameters are author estimates, not calibrations.'
      }
    >
      {sections.map((set) => (
        <section key={set.section} className="stack gap-4">
          <h2 className="paper-section-head">
            {sectionLabel(set.section, locale)}
            <span className="muted text-sm">
              {' · '}
              {set.modules.length} {vi ? 'phần' : 'modules'} ·{' '}
              {formatClock(set.modules.reduce((n, m) => n + m.durationSeconds, 0))}
            </span>
          </h2>
          <ol className="sheet-questions">
            {set.questions.map((question) => {
              number += 1;
              return (
                <li key={question.id} className="sheet-question">
                  <div className="row gap-3 wrap" style={{ alignItems: 'flex-start' }}>
                    <span className="solution-number">{number}</span>
                    <div className="stack gap-3 grow">
                      {question.stimulus && (
                        <StimulusView stimulus={question.stimulus} questionId={question.id} />
                      )}
                      <p className="solution-prompt">{question.prompt}</p>
                      <AnswerArea question={question} value={null} onChange={() => undefined} disabled />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </DocumentFrame>
  );
}

function Solutions({
  paper,
  sections,
  locale,
  t,
}: {
  paper: Paper;
  sections: SectionSet[];
  locale: 'vi' | 'en';
  t: ReturnType<typeof useT>;
}): React.ReactElement {
  const vi = locale === 'vi';
  let number = 0;

  return (
    <DocumentFrame
      kind={vi ? 'Lời giải' : 'Solutions'}
      title={vi ? paper.nameVi : paper.name}
      pillar="talent"
      date={formatDate(paper.published, locale)}
      reference={`${paper.id}-sol`}
      locale={locale}
      limits={
        vi
          ? 'Phát sau khi đã thu bài. Mỗi câu có đáp án, lời giải, và vì sao từng phương án nhiễu hấp dẫn — phần cuối mới là phần đáng đọc, vì biết đáp án là biết một câu, còn biết vì sao mình bị dụ là biết cả một dạng.'
          : 'Released after papers are collected. Each item carries its key, its working, and why each distractor is tempting — that last part is the one worth reading, because knowing the answer teaches one question and knowing why you were drawn elsewhere teaches a type.'
      }
    >
      {sections.map((set) => (
        <section key={set.section} className="stack gap-5">
          <h2 className="paper-section-head">{sectionLabel(set.section, locale)}</h2>
          {set.questions.map((question) => {
            number += 1;
            const isPretest = set.pretest.has(question.id);
            return (
              <div key={question.id} className="stack gap-3 sheet-question">
                <div className="row gap-3 wrap">
                  <span className="solution-number">{number}</span>
                  <Badge tone="success">
                    {vi ? 'Đáp án' : 'Answer'}:{' '}
                    {Array.isArray(question.answer) ? question.answer.join(' / ') : question.answer}
                  </Badge>
                  <Badge>{skillLabel(question.skill, locale)}</Badge>
                  <Badge>{question.band}</Badge>
                  {isPretest && (
                    <Badge tone="warning">{vi ? 'Câu thử nghiệm — không tính điểm' : 'Field-test — unscored'}</Badge>
                  )}
                </div>
                <Explanation
                  question={question}
                  chosen={null}
                  labels={{ explanation: t('practice.explanation'), whyWrong: t('practice.whyWrong') }}
                />
              </div>
            );
          })}
        </section>
      ))}
    </DocumentFrame>
  );
}

function Scheme({
  paper,
  form,
  sections,
  locale,
}: {
  paper: Paper;
  form: { id: string };
  sections: SectionSet[];
  locale: 'vi' | 'en';
}): React.ReactElement {
  const vi = locale === 'vi';
  const schemes = sections.map((set) => ({
    section: set.section,
    scheme: markScheme(form.id, set.section, set.operational),
  }));

  return (
    <DocumentFrame
      kind={vi ? 'Barem chấm' : 'Mark scheme'}
      title={vi ? paper.nameVi : paper.name}
      pillar="action"
      date={formatDate(paper.published, locale)}
      reference={`${paper.id}-ms`}
      locale={locale}
      limits={
        vi
          ? `Barem này thuộc về riêng đề ${paper.id} và không dùng cho đề khác — nó được tính từ chính các câu của đề này. Hai hàng đầu và cuối là chặn chứ không phải giá trị: điểm thô tuyệt đối hoặc bằng 0 không xác định được năng lực. Tham số câu hỏi là ước lượng của người soạn.`
          : `This scheme belongs to paper ${paper.id} and to no other — it is computed from this paper's own items. The first and last rows are bounds rather than points: a perfect or zero raw score does not identify an ability. Item parameters are author estimates.`
      }
    >
      <div className="escalation" data-severity="info">
        <IconClipboard size={18} />
        <div>
          <strong>{vi ? 'Cách chấm' : 'How to mark'}</strong>
          <p>
            {vi
              ? 'Đếm số câu đúng trong các câu tính điểm của từng phần (bỏ qua câu thử nghiệm đã đánh dấu trong lời giải). Tra số đó ở bảng của phần tương ứng để ra điểm thang 200–800. Cộng hai phần được tổng 400–1600. Không trừ điểm câu sai, nên bỏ trống không có lợi gì hơn đoán.'
              : 'Count the correct answers among each section’s scored items, ignoring the field-test items flagged in the solutions. Look that count up in the section’s table for a 200–800 score. Add the two sections for the 400–1600 total. There is no penalty for a wrong answer, so a blank is never better than a guess.'}
          </p>
        </div>
      </div>

      {schemes.map(({ section, scheme }) => (
        <Card
          key={section}
          title={`${sectionLabel(section, locale)} — ${vi ? 'quy đổi điểm thô' : 'raw to scaled'}`}
          subtitle={
            vi
              ? `${scheme.operationalCount} câu tính điểm. Bảng dựng bằng cách nghịch đảo đường đặc trưng của chính đề này.`
              : `${scheme.operationalCount} scored items. Derived by inverting this paper’s own characteristic curve.`
          }
        >
          <div className="scroll-x">
            <table className="table scheme-table">
              <thead>
                <tr>
                  <th>{vi ? 'Số câu đúng' : 'Raw'}</th>
                  <th>{vi ? 'Điểm phần' : 'Section score'}</th>
                  <th>θ</th>
                </tr>
              </thead>
              <tbody>
                {scheme.rows.map((row) => (
                  <tr key={row.raw} data-bounded={row.bounded || undefined}>
                    <td className="semibold">{row.raw}</td>
                    <td className="semibold">
                      {row.bounded && row.raw > 0 ? `${row.scaled}+` : row.bounded ? `≤ ${row.scaled}` : row.scaled}
                    </td>
                    <td className="muted">{row.theta.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ))}
    </DocumentFrame>
  );
}

function Specification({
  paper,
  sections,
  locale,
}: {
  paper: Paper;
  sections: SectionSet[];
  locale: 'vi' | 'en';
}): React.ReactElement {
  const vi = locale === 'vi';

  return (
    <DocumentFrame
      kind={vi ? 'Ma trận đề' : 'Specification'}
      title={vi ? paper.nameVi : paper.name}
      pillar="inspirits"
      date={formatDate(paper.published, locale)}
      reference={`${paper.id}-spec`}
      locale={locale}
      limits={
        vi
          ? 'Ma trận cho biết đề này gồm những gì. Nó không nói đề dễ hay khó so với một kỳ thi thật — điều đó cần dữ liệu hiệu chuẩn mà hệ thống chưa có.'
          : 'The specification says what this paper contains. It does not say how it compares in difficulty with a live administration; that needs calibration data the system does not yet have.'
      }
    >
      <p className="muted">{vi ? paper.purposeVi : paper.purpose}</p>
      {sections.map((set) => {
        const composition = formComposition(set.operational);
        return (
          <Card key={set.section} title={sectionLabel(set.section, locale)}>
            <div className="row gap-3 wrap" style={{ marginBottom: 'var(--space-4)' }}>
              <Badge>
                {set.operational.length} {vi ? 'câu tính điểm' : 'scored'}
              </Badge>
              <Badge>
                {set.pretest.size} {vi ? 'câu thử nghiệm' : 'field-test'}
              </Badge>
              <Badge tone="info">
                {vi ? 'Độ khó trung bình' : 'Mean difficulty'} b = {composition.meanDifficulty.toFixed(2)}
              </Badge>
            </div>
            <div className="row gap-3 wrap">
              {(['easy', 'medium', 'hard'] as const).map((band) => (
                <Badge key={band}>
                  {band}: {composition.byBand[band]}
                </Badge>
              ))}
            </div>
            <div className="scroll-x" style={{ marginTop: 'var(--space-4)' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>{vi ? 'Miền kiến thức' : 'Domain'}</th>
                    <th>{vi ? 'Số câu' : 'Items'}</th>
                  </tr>
                </thead>
                <tbody>
                  {composition.byDomain.map((row) => (
                    <tr key={row.domain}>
                      <td>{domainLabel(row.domain as never, locale)}</td>
                      <td className="semibold">{row.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        );
      })}
    </DocumentFrame>
  );
}
