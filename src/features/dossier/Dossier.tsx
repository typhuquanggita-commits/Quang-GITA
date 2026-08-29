/**
 * The learner's dossier.
 *
 * Everything the platform knows about one person in one document, and the
 * route it recommends with the evidence for each step attached.
 *
 * The evidence is not decoration. A personalised pathway is only as
 * trustworthy as a reader's ability to check it, and a recommendation shown
 * without the observation behind it is asking to be believed rather than
 * examined. So every step here says *because*, and any step whose evidence is
 * missing is not shown at all.
 *
 * Which is why a brand-new learner sees a short document that says what has
 * not been measured yet, rather than a complete-looking one about somebody who
 * does not exist. That is the same rule the GITA profile and the coach already
 * hold: absence of evidence is never scored as success.
 */

import React, { useMemo } from 'react';
import { QUESTION_BY_ID } from '../../data/bank.ts';
import { skillLabel, sectionLabel } from '../../data/blueprint.ts';
import { LESSONS, lessonFor } from '../../data/lesson-index.ts';
import { packetProgress, type SheetKind } from '../../engine/packets.ts';
import {
  buildDossier,
  gapToTarget,
  scoreMovement,
  type PathwayStep,
  type ScorePoint,
  type StepKind,
} from '../../engine/dossier.ts';
import { ERROR_LABEL } from '../solutions/AttemptAnalysis.tsx';
import { useGitaProfile } from '../../gita/useGitaProfile.ts';
import { nextMove } from '../../gita/assessment.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty } from '../../components/ui/primitives.tsx';
import { LineChart, MasteryBars } from '../../components/charts/charts.tsx';
import {
  IconAlert,
  IconBook,
  IconCalendar,
  IconChart,
  IconClock,
  IconDownload,
  IconFire,
  IconPrint,
  IconTarget,
} from '../../components/ui/icons.tsx';
import { download, formatDate, isoDate, pct } from '../../lib/util.ts';
import { DocumentFrame } from '../../brand/DocumentFrame.tsx';
import type { Route } from '../shell/routes.ts';

/** Days of activity behind the attendance figure the route reads. */
const ACTIVITY_WINDOW = 28;

export function Dossier({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const vi = locale === 'vi';
  const { state } = useStore();
  const gita = useGitaProfile();

  const activeDays28 = useMemo(() => {
    const today = Date.parse(`${isoDate()}T00:00:00`);
    return Object.entries(state.activity).filter(([date, seconds]) => {
      if (seconds <= 0) return false;
      const age = Math.floor((today - Date.parse(`${date}T00:00:00`)) / 86400000);
      return age >= 0 && age < ACTIVITY_WINDOW;
    }).length;
  }, [state.activity]);

  const dossier = useMemo(
    () =>
      buildDossier({
        attempts: state.attempts,
        questions: QUESTION_BY_ID,
        targetTotal: state.profile.targetScore,
        testDate: state.profile.testDate ?? null,
        activity: state.activity,
        activeDays28,
        lessonsRead: Object.keys(state.lessons),
        lessonsTotal: LESSONS.length,
        teachableSkills: new Set(LESSONS.map((l) => l.skill)),
        packetsStarted: Object.keys(state.packets),
        packetsConsolidated: Object.entries(state.packets)
          .filter(([, record]) => packetProgress(record.done as SheetKind[]).next === null)
          .map(([skill]) => skill),
      }),
    [
      state.attempts,
      state.profile.targetScore,
      state.profile.testDate,
      state.activity,
      activeDays28,
      state.lessons,
      state.packets,
    ],
  );

  const gap = gapToTarget(dossier);
  const movement = scoreMovement(dossier);
  const cue = gita.profile ? nextMove(gita.profile) : null;

  const exportDossier = () => {
    download(
      `sat365-ho-so-${dossier.generatedAt}.json`,
      JSON.stringify({ learner: state.profile.name, ...dossier }, null, 2),
    );
  };

  return (
    <div className="page stack gap-6">
      <header className="page-head no-print">
        <div className="between wrap gap-4">
          <div>
            <h1 className="page-title">{vi ? 'Hồ sơ học viên' : 'Learner dossier'}</h1>
            <p className="page-sub">
              {state.profile.name || (vi ? 'Học viên' : 'Learner')} ·{' '}
              {vi ? 'lập ngày' : 'as of'} {formatDate(dossier.generatedAt, locale)}
            </p>
          </div>
          <div className="row gap-2 no-print">
            <Button onClick={() => window.print()}>
              <IconPrint size={16} /> {vi ? 'In' : 'Print'}
            </Button>
            <Button onClick={exportDossier}>
              <IconDownload size={16} /> {vi ? 'Xuất hồ sơ' : 'Export'}
            </Button>
          </div>
        </div>
      </header>

      <DocumentFrame
        kind={vi ? 'Hồ sơ học viên' : 'Learner dossier'}
        title={state.profile.name || (vi ? 'Học viên' : 'Learner')}
        pillar="goal"
        date={formatDate(dossier.generatedAt, locale)}
        reference={`DOS-${dossier.generatedAt}`}
        locale={locale}
        limits={
          vi
            ? 'Hồ sơ tổng hợp từ dữ liệu trên thiết bị này. Mỗi bước lộ trình đều kèm bằng chứng đã dẫn tới nó; bước nào không có bằng chứng thì không được tạo ra. Tham số IRT là ước lượng của người soạn, chưa hiệu chuẩn — dùng để định hướng học tập, không dùng làm căn cứ tuyển sinh hay đánh giá chính thức.'
            : 'Compiled from the records held on this device. Every step of the route carries the evidence that produced it, and a step with no evidence is not generated. IRT parameters are author estimates rather than calibrations — this supports study decisions, not admissions or formal assessment.'
        }
      >
      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Điểm gần nhất' : 'Latest score'}</div>
          <div className="kpi-value">{dossier.latestTotal ?? '—'}</div>
          <div className="kpi-foot">
            {movement === null
              ? vi
                ? 'Cần hai bài để thấy xu hướng'
                : 'Two tests are needed for a trend'
              : `${movement >= 0 ? '+' : ''}${movement} ${vi ? 'so với bài đầu' : 'since the first'}`}
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Cách mục tiêu' : 'Gap to target'}</div>
          <div className="kpi-value">
            {gap === null ? '—' : gap <= 0 ? (vi ? 'Đạt' : 'Met') : `+${gap}`}
          </div>
          <div className="kpi-foot">
            {vi ? 'Mục tiêu' : 'Target'} {dossier.targetTotal}
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Còn lại' : 'Days to test'}</div>
          <div className="kpi-value">{dossier.daysToTest ?? '—'}</div>
          <div className="kpi-foot">
            {dossier.testDate ? formatDate(dossier.testDate, locale) : vi ? 'Chưa đặt ngày thi' : 'No date set'}
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Chuỗi ngày học' : 'Streak'}</div>
          <div className="kpi-value">
            <IconFire size={20} /> {dossier.streak}
          </div>
          <div className="kpi-foot">
            {dossier.activeDays28}/{ACTIVITY_WINDOW} {vi ? 'ngày gần đây' : 'recent days'}
          </div>
        </div>
      </div>

      {/*
        What is missing comes before what is known. A reader who does not know
        the limits of a document will read past them.
      */}
      {dossier.unmeasured.length > 0 && (
        <Card title={vi ? 'Những gì chưa đo được' : 'What has not been measured'}>
          <ul className="stack gap-3" style={{ listStyle: 'none', padding: 0 }}>
            {(vi ? dossier.unmeasuredVi : dossier.unmeasured).map((missing) => (
              <li key={missing} className="escalation" data-severity="info">
                <IconAlert size={18} />
                <div>{missing}</div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card
        title={vi ? 'Lộ trình cá nhân hoá' : 'Personalised pathway'}
        subtitle={
          vi
            ? 'Mỗi bước kèm bằng chứng đã dẫn tới nó. Bước nào không có bằng chứng thì không được tạo ra.'
            : 'Every step carries the evidence that produced it. A step with no evidence is not generated.'
        }
      >
        {dossier.pathway.length === 0 ? (
          <Empty
            icon={<IconTarget size={30} />}
            title={vi ? 'Chưa đủ bằng chứng để vạch lộ trình' : 'Not enough evidence for a route'}
            body={
              vi
                ? 'Làm một bài thi thử full-length trước; mọi bước sau đó đều được nhắm bằng một phép đo.'
                : 'Sit a full-length test first: every step after that is aimed by a measurement.'
            }
            action={<Button onClick={() => navigate({ name: 'tests' })}>{t('nav.tests')}</Button>}
          />
        ) : (
          <ol className="pathway">
            {dossier.pathway.map((step, index) => (
              <PathwayItem
                key={`${step.kind}-${step.order}`}
                step={step}
                index={index}
                navigate={navigate}
                locale={locale}
              />
            ))}
          </ol>
        )}
      </Card>

      {dossier.scores.length > 0 && (
        <Card
          title={vi ? 'Lịch sử điểm' : 'Score history'}
          subtitle={
            vi
              ? 'Mỗi điểm kèm dải sai số ±1: một con số đơn lẻ không bao giờ là tuyệt đối.'
              : 'Each score with its ±1 standard-error band: a single number is never exact.'
          }
        >
          <div className="stack gap-4">
            {dossier.scores.length >= 2 && (
              <LineChart
                height={200}
                yMin={Math.max(400, Math.min(...dossier.scores.map((s) => s.total)) - 100)}
                yMax={Math.min(1600, Math.max(dossier.targetTotal, ...dossier.scores.map((s) => s.total)) + 60)}
                formatX={(v) => formatDate(isoDate(new Date(v)), locale)}
                series={[
                  {
                    name: vi ? 'Tổng điểm' : 'Total',
                    points: dossier.scores.map((s) => [Date.parse(`${s.date}T00:00:00`), s.total]),
                  },
                  {
                    name: vi ? 'Mục tiêu' : 'Target',
                    color: 'var(--text-muted)',
                    points: [
                      [Date.parse(`${dossier.scores[0].date}T00:00:00`), dossier.targetTotal],
                      [
                        Date.parse(`${dossier.scores[dossier.scores.length - 1].date}T00:00:00`),
                        dossier.targetTotal,
                      ],
                    ],
                  },
                ]}
                description={
                  vi
                    ? `Điểm tổng qua ${dossier.scores.length} bài thi thử, so với mục tiêu ${dossier.targetTotal}.`
                    : `Total across ${dossier.scores.length} tests, against a target of ${dossier.targetTotal}.`
                }
              />
            )}
            <div className="scroll-x">
              <table className="table">
                <thead>
                  <tr>
                    <th>{vi ? 'Bài' : 'Test'}</th>
                    <th>{vi ? 'Ngày' : 'Date'}</th>
                    <th>{vi ? 'Tổng' : 'Total'}</th>
                    <th>{vi ? 'Dải sai số' : 'Band'}</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {[...dossier.scores].reverse().map((score) => (
                    <ScoreRow key={score.attemptId} score={score} navigate={navigate} locale={locale} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      )}

      {dossier.skills.length > 0 && (
        <Card
          title={vi ? 'Kỹ năng' : 'Skills'}
          subtitle={
            vi
              ? `Chỉ hiện kỹ năng đã có đủ dữ liệu. ${dossier.lessonsRead}/${dossier.lessonsTotal} bài giảng đã đọc · ${dossier.packetsConsolidated}/${dossier.packetsStarted} bộ phiếu đã ôn chắc trên số đã bắt đầu.`
              : `Only skills with enough data are shown. ${dossier.lessonsRead} of ${dossier.lessonsTotal} lessons read · ${dossier.packetsConsolidated} of ${dossier.packetsStarted} started packets consolidated.`
          }
        >
          <MasteryBars
            rows={dossier.skills.map((s) => ({
              label: skillLabel(s.skill, locale),
              value: s.mastery,
              meta: `${sectionLabel(s.section, locale)} · ${s.attempted} ${vi ? 'câu' : 'responses'} · ${
                s.taught ? (vi ? 'đã đọc bài giảng' : 'lesson read') : vi ? 'chưa đọc bài giảng' : 'lesson unread'
              }`,
            }))}
          />
        </Card>
      )}

      {Object.values(dossier.errors).some((n) => n > 0) && (
        <Card
          title={vi ? 'Hồ sơ lỗi' : 'Error profile'}
          subtitle={
            vi
              ? 'Bốn loại lỗi cần bốn cách xử lý khác nhau, nên chúng không được gộp làm một.'
              : 'Four kinds of mistake need four different responses, so they are never merged into one.'
          }
        >
          <div className="row gap-3 wrap">
            {(Object.entries(dossier.errors) as Array<[keyof typeof dossier.errors, number]>)
              .filter(([, count]) => count > 0)
              .sort((a, b) => b[1] - a[1])
              .map(([kind, count]) => (
                <Badge key={kind} tone={kind === 'careless' ? 'warning' : 'danger'}>
                  {vi ? ERROR_LABEL[kind].vi : ERROR_LABEL[kind].en} · {count}
                </Badge>
              ))}
          </div>
        </Card>
      )}

      {gita.profile && cue && (
        <Card
          title={vi ? 'GITA — trụ đang giới hạn' : 'GITA — the limiting pillar'}
          subtitle={
            vi
              ? `Độ tin cậy của hồ sơ: ${pct(gita.profile.confidence)}. Tầng hấp thu ${gita.profile.tier}.`
              : `Profile confidence ${pct(gita.profile.confidence)}. Absorption tier ${gita.profile.tier}.`
          }
          action={
            <Button variant="ghost" onClick={() => navigate({ name: 'gita' })}>
              {t('nav.gita')}
            </Button>
          }
        >
          <div className="stack gap-3">
            <p>{vi ? cue.observationVi : cue.observation}</p>
            <p className="semibold">{vi ? cue.moveVi : cue.move}</p>
            {gita.profile.confidence < 0.5 && (
              <p className="text-sm muted">
                {vi
                  ? 'Hồ sơ này dựa trên ít hành vi quan sát được, nên hãy đọc như một giả thuyết chứ không phải một kết luận.'
                  : 'This profile rests on little observed behaviour; read it as a hypothesis, not a conclusion.'}
              </p>
            )}
          </div>
        </Card>
      )}
      </DocumentFrame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rows — module scope, per the standing rule                          */
/* ------------------------------------------------------------------ */

const STEP_ICON: Record<StepKind, React.ReactNode> = {
  measure: <IconTarget size={18} />,
  learn: <IconBook size={18} />,
  drill: <IconChart size={18} />,
  pace: <IconClock size={18} />,
  habit: <IconFire size={18} />,
  review: <IconCalendar size={18} />,
  consolidate: <IconTarget size={18} />,
};

function PathwayItem({
  step,
  index,
  navigate,
  locale,
}: {
  step: PathwayStep;
  index: number;
  navigate(route: Route): void;
  locale: 'vi' | 'en';
}): React.ReactElement {
  const vi = locale === 'vi';
  const lesson = step.skill ? lessonFor(step.skill) : undefined;

  // The engine writes the skill id into its own sentences so the strings stay
  // testable without a label table; the display name is substituted here.
  const name = lesson ? (vi ? lesson.titleVi : lesson.title) : step.skill;
  const substitute = (text: string) => (step.skill && name ? text.replace(step.skill, name) : text);

  return (
    <li className="pathway-step">
      <span className="pathway-marker" aria-hidden="true">
        {STEP_ICON[step.kind]}
      </span>
      <div className="stack gap-2">
        <div className="row gap-3 wrap">
          <span className="pathway-index">{index + 1}</span>
          <span className="semibold">{substitute(vi ? step.titleVi : step.title)}</span>
        </div>
        <p className="text-sm muted">
          <em>{vi ? 'Vì' : 'Because'}:</em> {substitute(vi ? step.becauseVi : step.because)}
        </p>
        {step.kind === 'learn' && step.skill && (
          <div>
            <Button variant="secondary" size="sm" onClick={() => navigate({ name: 'lesson', skill: step.skill! })}>
              <IconBook size={14} /> {vi ? 'Mở bài giảng' : 'Open the lesson'}
            </Button>
          </div>
        )}
        {step.kind === 'measure' && (
          <div>
            <Button variant="secondary" size="sm" onClick={() => navigate({ name: 'tests' })}>
              {vi ? 'Chọn bài thi' : 'Choose a test'}
            </Button>
          </div>
        )}
      </div>
    </li>
  );
}

function ScoreRow({
  score,
  navigate,
  locale,
}: {
  score: ScorePoint;
  navigate(route: Route): void;
  locale: 'vi' | 'en';
}): React.ReactElement {
  const vi = locale === 'vi';
  return (
    <tr>
      <td className="semibold">{score.label}</td>
      <td>{formatDate(score.date, locale)}</td>
      <td className="semibold">{score.total}</td>
      <td className="muted">
        {score.band[0]}–{score.band[1]}
      </td>
      <td style={{ textAlign: 'right' }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ name: 'attempt-review', attemptId: score.attemptId })}
        >
          {vi ? 'Đáp án' : 'Answers'}
        </Button>
      </td>
    </tr>
  );
}
