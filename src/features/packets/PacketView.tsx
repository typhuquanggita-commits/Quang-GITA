/**
 * One topic packet: seven sheets, worked in order.
 *
 * The sequence is the design. A learner who works the practice sheets and
 * skips recognition ends up knowing a method and unable to tell when it
 * applies, which is the specific failure the đọc-vị sheet exists to prevent —
 * so the packet always points at the first *unfinished* sheet rather than the
 * one after the last one finished.
 *
 * Each practice sheet has its own solution sheet: the key, the worked
 * explanation, why each distractor is tempting, and a deep-analysis row saying
 * what the item was actually testing and what its difficulty rests on. That
 * last part is what turns a solution into an explanation of the topic rather
 * than of the question.
 *
 * A sheet can be worked online — it queues its exact items into the practice
 * surface — or printed. Both, because a learner revising away from a screen is
 * still revising.
 */

import React, { useMemo, useState } from 'react';
import type { Question } from '../../types.ts';
import { BANK } from '../../data/bank.ts';
import { sectionLabel, skillLabel } from '../../data/blueprint.ts';
import {
  buildPacket,
  packetProgress,
  PRACTICE_SHEETS,
  SHEET_ORDER,
  type Packet,
  type Sheet,
  type SheetKind,
} from '../../engine/packets.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty, Tabs } from '../../components/ui/primitives.tsx';
import { AnswerArea, Explanation, StimulusView } from '../../components/ui/QuestionView.tsx';
import {
  IconAlert,
  IconBook,
  IconCheck,
  IconClock,
  IconPrint,
  IconTarget,
} from '../../components/ui/icons.tsx';
import { formatClock } from '../../lib/util.ts';
import { SHEET_META } from './sheetMeta.ts';
import type { Route } from '../shell/routes.ts';

export function PacketView({
  skill,
  navigate,
}: {
  skill: string;
  navigate(route: Route): void;
}): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';
  const { state, dispatch } = useStore();

  const packet = useMemo(() => buildPacket(skill, BANK), [skill]);
  const done = (state.packets[skill]?.done ?? []) as SheetKind[];
  const progress = packetProgress(done);
  const [sheet, setSheet] = useState<SheetKind>(() => progress.next ?? 'theory');

  if (!packet) {
    return (
      <div className="page">
        <Empty
          title={vi ? 'Không có chuyên đề này' : 'No such topic'}
          action={<Button onClick={() => navigate({ name: 'topics' })}>{vi ? 'Quay lại' : 'Back'}</Button>}
        />
      </div>
    );
  }

  const tabs = SHEET_ORDER.map((kind) => ({
    id: kind,
    label: `${done.includes(kind) ? '✓ ' : ''}${vi ? SHEET_META[kind].vi : SHEET_META[kind].en}`,
  }));

  const active = packet.sheets[sheet];

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <Button variant="ghost" onClick={() => navigate({ name: 'topics' })}>
          ← {vi ? 'Bộ phiếu theo chuyên đề' : 'Topic packets'}
        </Button>
        <div className="between wrap gap-4">
          <div>
            <h1 className="page-title">{vi ? packet.lesson.titleVi : packet.lesson.title}</h1>
            <p className="page-sub">
              {skillLabel(packet.skill, locale)} · {sectionLabel(packet.section, locale)}
            </p>
          </div>
          <div className="row gap-2 wrap no-print">
            <Badge tone={progress.next === null ? 'success' : 'info'}>
              {progress.done.length}/{SHEET_ORDER.length} {vi ? 'phiếu' : 'sheets'}
            </Badge>
            <Button onClick={() => window.print()}>
              <IconPrint size={16} /> {vi ? 'In phiếu này' : 'Print this sheet'}
            </Button>
          </div>
        </div>
      </header>

      {/*
        The sequence, made visible. A learner handed seven sheets needs to see
        that they are a route and not a menu.
      */}
      {progress.next && progress.next !== sheet && (
        <div className="escalation no-print" data-severity="info">
          <IconTarget size={18} />
          <div>
            {vi
              ? `Phiếu tiếp theo chưa hoàn thành là “${SHEET_META[progress.next].vi}”. Các phiếu là một chuỗi, không phải một thực đơn.`
              : `The next unfinished sheet is “${SHEET_META[progress.next].en}”. The sheets are a sequence, not a menu.`}{' '}
            <button type="button" className="linklike" onClick={() => setSheet(progress.next!)}>
              {vi ? 'Mở phiếu đó' : 'Open it'}
            </button>
          </div>
        </div>
      )}

      <Tabs<SheetKind>
        tabs={tabs}
        value={sheet}
        onChange={setSheet}
        ariaLabel={vi ? 'Các phiếu trong chuyên đề' : 'Sheets in this packet'}
      />

      <SheetHeader sheet={active} locale={locale} />

      {sheet === 'theory' && <TheorySheet packet={packet} locale={locale} navigate={navigate} />}
      {sheet === 'recognition' && <RecognitionSheet packet={packet} locale={locale} />}
      {sheet === 'method' && <MethodSheet packet={packet} locale={locale} />}
      {PRACTICE_SHEETS.includes(sheet) && (
        <PracticeSheet packet={packet} sheet={active} locale={locale} navigate={navigate} />
      )}
      {sheet === 'consolidation' && <ConsolidationSheet packet={packet} locale={locale} />}

      <div className="row gap-3 wrap no-print">
        <Button
          variant={done.includes(sheet) ? 'secondary' : 'primary'}
          onClick={() => dispatch({ type: 'packet/sheetDone', skill: packet.skill, sheet })}
        >
          <IconCheck size={16} />
          {done.includes(sheet)
            ? vi
              ? 'Đã hoàn thành phiếu này'
              : 'Sheet already complete'
            : vi
              ? 'Đánh dấu đã hoàn thành'
              : 'Mark this sheet complete'}
        </Button>
        {done.length > 0 && (
          <Button variant="ghost" onClick={() => dispatch({ type: 'packet/reset', skill: packet.skill })}>
            {vi ? 'Làm lại chuyên đề từ đầu' : 'Restart this topic'}
          </Button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sheets — all module scope, per the standing rule                     */
/* ------------------------------------------------------------------ */

function SheetHeader({ sheet, locale }: { sheet: Sheet; locale: 'vi' | 'en' }): React.ReactElement {
  const vi = locale === 'vi';
  const meta = SHEET_META[sheet.kind];

  return (
    <div className="sheet-head">
      <div>
        <h2 className="sheet-title">{vi ? meta.vi : meta.en}</h2>
        <p className="sheet-purpose">{vi ? meta.purposeVi : meta.purpose}</p>
      </div>
      <div className="row gap-2 wrap">
        <Badge>
          <IconClock size={12} /> {sheet.minutes} {vi ? 'phút' : 'min'}
        </Badge>
        {sheet.timed && <Badge tone="warning">{vi ? 'Có bấm giờ' : 'Timed'}</Badge>}
      </div>
    </div>
  );
}

function TheorySheet({
  packet,
  locale,
  navigate,
}: {
  packet: Packet;
  locale: 'vi' | 'en';
  navigate(route: Route): void;
}): React.ReactElement {
  const vi = locale === 'vi';
  const { lesson } = packet;

  return (
    <div className="stack gap-5">
      <Card title={vi ? 'Ý cốt lõi' : 'The core idea'}>
        <p className="lesson-idea">{vi ? lesson.ideaVi : lesson.idea}</p>
      </Card>
      <Card
        title={vi ? 'Bài giảng đầy đủ' : 'The full lesson'}
        subtitle={
          vi
            ? 'Phiếu lý thuyết là bản rút gọn. Bài giảng đầy đủ có thêm ví dụ giải mẫu và các bẫy.'
            : 'The theory sheet is the condensed form. The full lesson adds the worked example and the traps.'
        }
        action={
          <Button onClick={() => navigate({ name: 'lesson', skill: packet.skill })}>
            <IconBook size={16} /> {vi ? 'Mở bài giảng' : 'Open the lesson'}
          </Button>
        }
      >
        <ol className="lesson-method">
          {(vi ? lesson.methodVi : lesson.method).map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

function RecognitionSheet({ packet, locale }: { packet: Packet; locale: 'vi' | 'en' }): React.ReactElement {
  const vi = locale === 'vi';

  return (
    <Card
      title={vi ? 'Các dạng bài và cách đọc vị' : 'The question types and how to read them'}
      subtitle={
        vi
          ? 'Với mỗi dạng: dấu hiệu nhận ra nó, và việc phải làm ngay khi nhận ra.'
          : 'For each form: the signal that identifies it, and what to do the moment it is recognised.'
      }
    >
      <ol className="type-list">
        {packet.topic.types.map((type, i) => (
          <li key={i} className="type-card">
            <div className="type-name">{vi ? type.nameVi : type.name}</div>
            <dl className="type-detail">
              <dt>{vi ? 'Đọc vị' : 'The cue'}</dt>
              <dd>{vi ? type.cueVi : type.cue}</dd>
              <dt>{vi ? 'Làm ngay' : 'The move'}</dt>
              <dd>{vi ? type.moveVi : type.move}</dd>
            </dl>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function MethodSheet({ packet, locale }: { packet: Packet; locale: 'vi' | 'en' }): React.ReactElement {
  const vi = locale === 'vi';
  const { lesson } = packet;
  const worked = lesson.worked;

  return (
    <div className="stack gap-5">
      <Card title={vi ? 'Các bước, theo thứ tự' : 'The steps, in order'}>
        <ol className="lesson-method">
          {(vi ? lesson.methodVi : lesson.method).map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </Card>

      <Card
        title={vi ? 'Ví dụ giải mẫu' : 'Worked example'}
        subtitle={
          vi
            ? 'Giải đúng bằng các bước vừa nêu, để phương pháp được chứng minh chứ không chỉ được tuyên bố.'
            : 'Solved by the very steps above, so the method is demonstrated rather than asserted.'
        }
      >
        <p className="lesson-prompt">{vi ? worked.promptVi : worked.prompt}</p>
        <ol className="lesson-method">
          {(vi ? worked.stepsVi : worked.steps).map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        <p className="lesson-answer">
          <strong>{vi ? 'Đáp án' : 'Answer'}:</strong> {vi ? worked.answerVi : worked.answer}
        </p>
      </Card>

      <Card title={vi ? 'Bẫy thường gặp' : 'The traps'}>
        <ul className="lesson-traps">
          {lesson.traps.map((trap, i) => (
            <li key={i}>
              <span className="lesson-trap-name">{vi ? trap.nameVi : trap.name}</span>
              <span className="lesson-trap-why">
                <em>{vi ? 'Vì sao dễ mắc' : 'Why it is tempting'}:</em> {vi ? trap.whyVi : trap.why}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function PracticeSheet({
  packet,
  sheet,
  locale,
  navigate,
}: {
  packet: Packet;
  sheet: Sheet;
  locale: 'vi' | 'en';
  navigate(route: Route): void;
}): React.ReactElement {
  const vi = locale === 'vi';
  const { dispatch } = useStore();
  const [showing, setShowing] = useState(false);

  if (sheet.questions.length === 0) {
    return (
      <Empty
        icon={<IconAlert size={30} />}
        title={vi ? 'Ngân hàng chưa có câu cho phiếu này' : 'The bank cannot fill this sheet'}
        body={
          vi
            ? 'Phiếu để trống thay vì lấp bằng câu của chuyên đề khác. Luyện sai chuyên đề mà tưởng là đúng còn tệ hơn không luyện.'
            : 'The sheet is left empty rather than padded from another topic. Practising the wrong topic while believing otherwise is worse than not practising.'
        }
      />
    );
  }

  const runOnline = () => {
    dispatch({
      type: 'autopilot/queue',
      blockId: `packet:${packet.skill}:${sheet.kind}`,
      questionIds: sheet.questions.map((q) => q.id),
    });
    navigate({ name: 'practice' });
  };

  return (
    <div className="stack gap-5">
      <Provenance sheet={sheet} locale={locale} />

      <div className="row gap-3 wrap no-print">
        <Button variant="primary" onClick={runOnline}>
          <IconTarget size={16} /> {vi ? 'Làm online ngay' : 'Work it online now'}
        </Button>
        <Button variant={showing ? 'secondary' : 'ghost'} onClick={() => setShowing((v) => !v)}>
          <IconBook size={16} />
          {showing
            ? vi
              ? 'Ẩn phiếu lời giải'
              : 'Hide the solution sheet'
            : vi
              ? 'Xem phiếu lời giải và phân tích'
              : 'See the solution sheet and analysis'}
        </Button>
      </div>

      {/*
        The questions themselves, printable. The solution sheet is a separate
        toggle rather than shown alongside, because a solution visible while
        the question is being attempted is not a solution — it is the answer.
      */}
      <Card
        title={vi ? 'Đề bài' : 'The questions'}
        subtitle={
          vi
            ? `${sheet.questions.length} câu · ${sheet.minutes} phút${sheet.timed ? ' · có bấm giờ' : ''}`
            : `${sheet.questions.length} questions · ${sheet.minutes} minutes${sheet.timed ? ' · timed' : ''}`
        }
      >
        <ol className="sheet-questions">
          {sheet.questions.map((question, i) => (
            <QuestionBlock key={question.id} question={question} number={i + 1} locale={locale} />
          ))}
        </ol>
      </Card>

      {showing && <SolutionSheet sheet={sheet} locale={locale} />}
    </div>
  );
}

function Provenance({ sheet, locale }: { sheet: Sheet; locale: 'vi' | 'en' }): React.ReactElement | null {
  const vi = locale === 'vi';
  const { onSkill, fromDomain, short } = sheet.provenance;
  if (fromDomain === 0 && short === 0) return null;

  return (
    <div className="escalation" data-severity="attention">
      <IconAlert size={18} />
      <div>
        <strong>{vi ? 'Phiếu này được lắp từ đâu' : 'How this sheet was filled'}</strong>
        <p>
          {vi
            ? `${onSkill} câu đúng chuyên đề${fromDomain > 0 ? `, ${fromDomain} câu lấy từ cùng miền kiến thức để lấp` : ''}${short > 0 ? `, thiếu ${short} câu mà ngân hàng chưa có` : ''}. Nói ra chỗ này vì luyện một miền kiến thức mà tưởng đang luyện một chuyên đề là một sai lệch âm thầm.`
            : `${onSkill} on-topic${fromDomain > 0 ? `, ${fromDomain} drawn from the same domain to fill` : ''}${short > 0 ? `, ${short} short because the bank does not hold them` : ''}. Stated because practising a domain while believing you are practising a topic is a silent misreading of your own progress.`}
        </p>
      </div>
    </div>
  );
}

function QuestionBlock({
  question,
  number,
  locale,
}: {
  question: Question;
  number: number;
  locale: 'vi' | 'en';
}): React.ReactElement {
  return (
    <li className="sheet-question">
      <div className="row gap-3 wrap" style={{ alignItems: 'flex-start' }}>
        <span className="solution-number">{number}</span>
        <div className="stack gap-3 grow">
          {question.stimulus && <StimulusView stimulus={question.stimulus} questionId={question.id} />}
          <p className="solution-prompt">{question.prompt}</p>
          <AnswerArea question={question} value={null} onChange={() => undefined} disabled />
        </div>
      </div>
      <span className="sr-only">{locale === 'vi' ? `Câu ${number}` : `Question ${number}`}</span>
    </li>
  );
}

/**
 * The solution sheet.
 *
 * Two parts, deliberately separate. The key and explanation answer "what was
 * the answer"; the analysis table answers "what was this question for" — the
 * skill, the band, where its difficulty sits on the ability scale, and how
 * long it was written to take. A learner who reads only the first part learns
 * ten answers. One who reads the second learns the topic.
 */
function SolutionSheet({ sheet, locale }: { sheet: Sheet; locale: 'vi' | 'en' }): React.ReactElement {
  const t = useT();
  const vi = locale === 'vi';

  return (
    <div className="stack gap-5">
      <Card
        title={vi ? 'Phiếu lời giải' : 'Solution sheet'}
        subtitle={
          vi
            ? 'Đáp án, lời giải, và vì sao từng phương án nhiễu hấp dẫn.'
            : 'The key, the working, and why each distractor is tempting.'
        }
      >
        <ol className="stack gap-5" style={{ listStyle: 'none', padding: 0 }}>
          {sheet.questions.map((question, i) => (
            <li key={question.id} className="stack gap-3">
              <div className="row gap-3">
                <span className="solution-number">{i + 1}</span>
                <Badge tone="success">
                  {vi ? 'Đáp án' : 'Answer'}:{' '}
                  {Array.isArray(question.answer) ? question.answer.join(' / ') : question.answer}
                </Badge>
              </div>
              <Explanation
                question={question}
                chosen={null}
                labels={{ explanation: t('practice.explanation'), whyWrong: t('practice.whyWrong') }}
              />
            </li>
          ))}
        </ol>
      </Card>

      <Card
        title={vi ? 'Bảng phân tích chuyên sâu' : 'Deep analysis'}
        subtitle={
          vi
            ? 'Mỗi câu được viết ra để kiểm tra điều gì, độ khó nằm ở đâu, và bao lâu là hợp lý. Đọc bảng này mới là hiểu chuyên đề; đọc lời giải chỉ là biết mười đáp án.'
            : 'What each question was written to test, where its difficulty sits, and how long it should take. Reading this is understanding the topic; reading the solutions alone is learning ten answers.'
        }
      >
        <div className="scroll-x">
          <table className="table analysis-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{vi ? 'Kỹ năng' : 'Skill'}</th>
                <th>{vi ? 'Độ khó' : 'Band'}</th>
                <th>b</th>
                <th>a</th>
                <th>{vi ? 'Thời gian mốc' : 'Target time'}</th>
                <th>{vi ? 'Điểm mấu chốt' : 'What it turns on'}</th>
              </tr>
            </thead>
            <tbody>
              {sheet.questions.map((question, i) => (
                <tr key={question.id}>
                  <td className="semibold">{i + 1}</td>
                  <td>{skillLabel(question.skill, locale)}</td>
                  <td>{question.band}</td>
                  <td>{question.irt.b.toFixed(2)}</td>
                  <td>{question.irt.a.toFixed(2)}</td>
                  <td>{formatClock(question.targetSeconds)}</td>
                  <td className="text-xs">
                    {question.distractorNotes
                      ? Object.values(question.distractorNotes)[0]
                      : question.explanation.slice(0, 90)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm muted" style={{ marginTop: 'var(--space-4)', maxWidth: '64ch' }}>
          {vi
            ? 'b là độ khó trên thang năng lực và a là mức phân biệt. Đây là ước lượng của người soạn, chưa hiệu chuẩn trên dữ liệu thực — xem docs/PSYCHOMETRICS.md.'
            : 'b is difficulty on the ability scale and a is discrimination. These are author estimates, not calibrations — see docs/PSYCHOMETRICS.md.'}
        </p>
      </Card>
    </div>
  );
}

function ConsolidationSheet({ packet, locale }: { packet: Packet; locale: 'vi' | 'en' }): React.ReactElement {
  const vi = locale === 'vi';
  const { topic } = packet;
  const criteria = vi ? topic.secureVi : topic.secure;

  return (
    <div className="stack gap-5">
      <Card
        title={vi ? 'Khi nào coi là đã ôn chắc' : 'When the topic is secure'}
        subtitle={
          vi
            ? 'Phát biểu bằng hành vi quan sát được, không phải bằng cảm giác. "Em hiểu rồi" là điều không ai kiểm chứng được, kể cả chính em.'
            : 'Stated as observable behaviour, not as feeling. "I understand it" is not a claim anyone can check, including the person making it.'
        }
      >
        <ul className="secure-list">
          {criteria.map((criterion, i) => (
            <li key={i}>
              <IconCheck size={16} />
              <span>{criterion}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card
        title={vi ? 'Chuyên đề này suy giảm như thế nào' : 'How this topic decays'}
        subtitle={
          vi
            ? 'Biết trước điều gì mất đầu tiên thì khi quay lại chỉ cần kiểm đúng chỗ đó, không phải học lại từ đầu.'
            : 'Knowing what goes first means a revisit checks one thing rather than re-reading everything.'
        }
      >
        <p style={{ maxWidth: '68ch', lineHeight: 'var(--leading-relaxed)' }}>
          {vi ? topic.regressionVi : topic.regression}
        </p>
      </Card>

      <Card title={vi ? 'Nguồn câu hỏi cho chuyên đề này' : 'Item supply for this topic'}>
        <div className="row gap-3 wrap">
          <Badge>{vi ? 'Dễ' : 'Easy'}: {packet.supply.easy}</Badge>
          <Badge>{vi ? 'Trung bình' : 'Medium'}: {packet.supply.medium}</Badge>
          <Badge>{vi ? 'Khó' : 'Hard'}: {packet.supply.hard}</Badge>
        </div>
        <p className="text-sm muted" style={{ marginTop: 'var(--space-3)', maxWidth: '62ch' }}>
          {vi
            ? 'Số câu đúng chuyên đề hiện có trong ngân hàng. Con số nhỏ nghĩa là các phiếu luyện phải mượn từ cùng miền kiến thức, và mỗi phiếu đều nói rõ nó đã mượn bao nhiêu.'
            : 'On-topic items currently in the bank. A small number means the practice sheets borrow from the same domain, and each sheet states exactly how much it borrowed.'}
        </p>
      </Card>
    </div>
  );
}
