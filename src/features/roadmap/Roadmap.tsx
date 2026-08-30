/**
 * The long roadmap, from the entry diagnostic to the sitting that counts.
 *
 * The screen is arranged around the question a learner actually asks, which
 * is not "what should I do today" — the Today screen answers that — but
 * "between now and June, does this get me there?"
 *
 * So the verdict comes first, before the phases. A learner reading a
 * beautifully drawn twelve-month plan and only discovering at the bottom that
 * it falls two hundred points short has been shown the plan in the wrong
 * order. If the answer is no, that is the first thing on the page.
 *
 * With no diagnostic there is no roadmap at all. Every phase length and every
 * projected score would be invented, and a plan built on an invented baseline
 * is wrong in every figure it contains — so the page refuses and says what it
 * needs, rather than drawing a plausible plan around a guess.
 */

import React, { useMemo, useState } from 'react';
import {
  TOP_SCORE_CONDITIONS,
  TOP_SCORE_DISCLAIMER,
  buildRoadmap,
  type Feasibility,
} from '../../engine/roadmap.ts';
import { ADMINISTRATIONS } from '../../data/testDates.ts';
import { skillLabel } from '../../data/blueprint.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty } from '../../components/ui/primitives.tsx';
import { DocumentFrame } from '../../brand/DocumentFrame.tsx';
import { IconAlert, IconCheck, IconClock, IconPrint, IconTarget } from '../../components/ui/icons.tsx';
import { formatDate, isoDate } from '../../lib/util.ts';
import type { Route } from '../shell/routes.ts';

const VERDICT: Record<Feasibility, { en: string; vi: string; severity: 'info' | 'attention' | 'urgent' }> = {
  comfortable: { en: 'Reachable, with room', vi: 'Đạt được, còn dư chỗ', severity: 'info' },
  demanding: { en: 'Reachable, with nothing spare', vi: 'Đạt được, nhưng không dư gì', severity: 'attention' },
  unlikely: { en: 'Unlikely on this schedule', vi: 'Khó đạt với lịch này', severity: 'attention' },
  'out-of-reach': { en: 'Not reachable in this time', vi: 'Không đạt được trong khoảng thời gian này', severity: 'urgent' },
  'noise-limited': { en: 'Above where study is the lever', vi: 'Vượt ngưỡng mà việc học còn là đòn bẩy', severity: 'attention' },
};

export function Roadmap({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';
  const { state, dispatch } = useStore();
  const [hours, setHours] = useState(8);

  /*
   * The baseline is the best full-length sitting on record. A section paper is
   * not a baseline: it measures half the standard, and doubling it invents the
   * other half.
   */
  const baseline = useMemo(() => {
    const full = state.attempts.filter((a) => a.score && a.score.sections.length === 2);
    return full.length === 0 ? null : Math.max(...full.map((a) => a.score!.total));
  }, [state.attempts]);

  const roadmap = useMemo(
    () =>
      buildRoadmap({
        baselineScore: baseline,
        targetScore: state.profile.targetScore,
        targetDate: state.profile.testDate,
        hoursPerWeek: hours,
      }),
    [baseline, state.profile.targetScore, state.profile.testDate, hours],
  );

  if (roadmap.blocked) {
    return (
      <div className="page stack gap-5">
        <header className="page-head">
          <h1 className="page-title">{vi ? 'Lộ trình dài hạn' : 'The long roadmap'}</h1>
        </header>
        <Empty
          level={2}
          icon={<IconTarget size={32} />}
          title={vi ? 'Chưa có điểm xuất phát' : 'No starting point yet'}
          body={vi ? roadmap.blocked.vi : roadmap.blocked.en}
          action={
            <Button variant="primary" onClick={() => navigate({ name: 'tests' })}>
              {vi ? 'Làm đề đầu vào' : 'Sit the diagnostic'}
            </Button>
          }
        />
      </div>
    );
  }

  const verdict = roadmap.feasibility!;
  const label = VERDICT[verdict.verdict];
  const topTarget = state.profile.targetScore >= 1550;

  const limits = vi
    ? 'Lộ trình này dựng từ một mô hình tăng điểm thận trọng và từ chính điểm đầu vào của học viên. Mô hình cho biết ĐỘ LỚN của việc phải làm, không phải một lời hứa: tốc độ thật phụ thuộc chất lượng giờ học chứ không phải số giờ. Tham số câu hỏi trong hệ thống là ước lượng của người soạn, chưa hiệu chuẩn.'
    : 'This roadmap is built from a deliberately conservative gain model and from the learner’s own diagnostic. The model gives the scale of the work rather than a promise: real progress depends on the quality of the hours, not their count. Item parameters in this platform are author estimates, not calibrations.';

  return (
    <div className="page stack gap-5">
      <header className="page-head no-print">
        <h1 className="page-title">{vi ? 'Lộ trình dài hạn' : 'The long roadmap'}</h1>
        <p className="page-sub">
          {vi
            ? 'Từ điểm đầu vào tới kỳ thi lấy điểm: đi qua những khoá nào, trong bao lâu, thi mấy lượt — và câu trả lời trung thực cho việc mục tiêu có tới được không.'
            : 'From the diagnostic to the sitting that counts: which courses, over how long, how many sittings — and an honest answer to whether the target is reachable.'}
        </p>
      </header>

      <div className="row gap-3 wrap between no-print">
        <label className="row gap-2" style={{ alignItems: 'center' }}>
          <span className="text-sm muted">{vi ? 'Số giờ học mỗi tuần' : 'Hours a week'}</span>
          <input
            className="input"
            type="number"
            min={1}
            max={30}
            value={hours}
            onChange={(e) => setHours(Math.max(1, Math.min(30, Number(e.target.value) || 1)))}
            style={{ width: '5rem' }}
          />
        </label>
        <Button onClick={() => window.print()}>
          <IconPrint size={15} /> {vi ? 'In lộ trình' : 'Print the roadmap'}
        </Button>
      </div>

      <DocumentFrame
        kind={vi ? 'Lộ trình luyện thi' : 'Preparation roadmap'}
        title={
          vi
            ? `${roadmap.baselineScore} → mục tiêu ${roadmap.targetScore}`
            : `${roadmap.baselineScore} → target ${roadmap.targetScore}`
        }
        pillar="goal"
        subject={state.profile.name}
        date={formatDate(isoDate(), locale)}
        reference={`rm-${roadmap.targetDate}`}
        locale={locale}
        limits={limits}
      >
        {/* The verdict, before anything else. */}
        <div className="escalation" data-severity={label.severity}>
          {label.severity === 'info' ? <IconCheck size={18} /> : <IconAlert size={18} />}
          <div>
            <strong>{vi ? label.vi : label.en}</strong>
            <p>{vi ? verdict.reason.vi : verdict.reason.en}</p>
          </div>
        </div>

        <div className="syllabus-figures">
          <div className="syllabus-figure">
            <strong>{roadmap.baselineScore}</strong>
            <span>{vi ? 'điểm đầu vào (đề full-length tốt nhất)' : 'diagnostic, best full-length'}</span>
          </div>
          <div className="syllabus-figure">
            <strong>{verdict.projectedScore}</strong>
            <span>{vi ? 'mức lịch này chống đỡ được' : 'what this schedule supports'}</span>
          </div>
          <div className="syllabus-figure">
            <strong>{roadmap.weeks}</strong>
            <span>{vi ? 'tuần tới kỳ thi lấy điểm' : 'weeks to the scoring sitting'}</span>
          </div>
          <div className="syllabus-figure">
            <strong>{verdict.requiredHours}</strong>
            <span>{vi ? 'giờ mục tiêu đòi hỏi' : 'hours the target requires'}</span>
          </div>
          <div className="syllabus-figure">
            <strong>{verdict.availableHours}</strong>
            <span>{vi ? `giờ lịch này có (${hours} giờ/tuần)` : `hours available (${hours}/week)`}</span>
          </div>
        </div>

        {/* Phases. */}
        <Card level={2} title={vi ? 'Các giai đoạn' : 'The phases'}>
          <ol className="roadmap-phases">
            {roadmap.phases.map((phase) => (
              <li key={phase.index} className="roadmap-phase">
                <div className="roadmap-phase-head">
                  <span className="syllabus-index">{phase.index}</span>
                  <div className="stack gap-1 grow">
                    <span className="semibold">{vi ? phase.course.nameVi : phase.course.name}</span>
                    <span className="text-xs muted">
                      {formatDate(phase.startDate, locale)} – {formatDate(phase.endDate, locale)} ·{' '}
                      {phase.weeks} {vi ? 'tuần' : 'weeks'} · {phase.sessions} {vi ? 'buổi' : 'sessions'} ·{' '}
                      {phase.classHours} {vi ? 'giờ' : 'h'}
                    </span>
                  </div>
                  <Badge tone="info">
                    {phase.entryScore} → {phase.exitScore}
                  </Badge>
                </div>
                <p className="text-sm secondary">{vi ? phase.course.summaryVi : phase.course.summary}</p>
                <div className="row gap-2 wrap">
                  {phase.skills.slice(0, 8).map((skill) => (
                    <Badge key={skill}>{skillLabel(skill, locale)}</Badge>
                  ))}
                  {phase.skills.length > 8 && (
                    <Badge>+{phase.skills.length - 8}</Badge>
                  )}
                </div>
                <button
                  type="button"
                  className="syllabus-link no-print"
                  onClick={() => navigate({ name: 'curriculum' })}
                >
                  {vi ? 'Mở đề cương giai đoạn này' : 'Open this phase’s syllabus'}
                </button>
              </li>
            ))}
          </ol>
        </Card>

        {/* Sittings. */}
        <Card
          level={2}
          title={vi ? 'Các lượt thi, và vì sao lại là những lượt đó' : 'The sittings, and why those'}
          subtitle={
            vi
              ? 'Thi một lượt duy nhất ở cuối thì không có đường lùi nếu gặp buổi sáng xấu. Thi ba lượt liên tiếp ba tháng thì đo cùng một năng lực ba lần.'
              : 'One sitting at the end leaves no way back from a bad morning. Three in three consecutive months measure the same ability three times.'
          }
        >
          <ol className="roadmap-sittings">
            {roadmap.sittings.map((sitting) => (
              <li key={sitting.administration.id}>
                <div className="between wrap gap-3">
                  <strong>
                    {vi ? `Lượt ${sitting.ordinal}` : `Sitting ${sitting.ordinal}`} —{' '}
                    {formatDate(sitting.administration.testDate, locale)}
                  </strong>
                  <Badge tone="warning">
                    <IconClock size={12} /> {vi ? 'Đăng ký trước ' : 'Register by '}
                    {formatDate(sitting.registerBy, locale)}
                  </Badge>
                </div>
                <p className="text-sm secondary">{vi ? sitting.purpose.vi : sitting.purpose.en}</p>
              </li>
            ))}
          </ol>
          <Button
            size="sm"
            className="no-print"
            onClick={() => navigate({ name: 'test-dates' })}
            style={{ marginTop: 'var(--space-3)' }}
          >
            {vi ? 'Xem lịch thi đầy đủ' : 'See the full calendar'}
          </Button>
        </Card>

        {/* The 1600 statement, shown when it is relevant. */}
        {topTarget && (
          <Card level={2} title={vi ? 'Về mục tiêu 1550–1600' : 'On a 1550–1600 target'}>
            <div className="stack gap-4">
              <p>{vi ? TOP_SCORE_DISCLAIMER.vi : TOP_SCORE_DISCLAIMER.en}</p>
              <span className="report-heading">
                {vi ? 'Điều kiện thực tế của một điểm đỉnh' : 'What a top score actually requires'}
              </span>
              <ul className="report-limits">
                {TOP_SCORE_CONDITIONS.map((condition) => (
                  <li key={condition.en}>
                    <IconTarget size={15} />
                    <span>{vi ? condition.vi : condition.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        {/* Changing the target is a legitimate response to the verdict. */}
        {(verdict.verdict === 'out-of-reach' || verdict.verdict === 'unlikely') && (
          <Card level={2} className="no-print" title={vi ? 'Ba cách xử lý' : 'Three ways forward'}>
            <div className="row gap-3 wrap">
              <Button onClick={() => setHours(hours + 2)}>
                {vi ? `Thêm 2 giờ/tuần (thành ${hours + 2})` : `Add 2 hours a week (to ${hours + 2})`}
              </Button>
              <Button
                onClick={() =>
                  dispatch({
                    type: 'profile/update',
                    patch: { targetScore: Math.round(verdict.projectedScore / 10) * 10 },
                  })
                }
              >
                {vi
                  ? `Đặt mục tiêu ${Math.round(verdict.projectedScore / 10) * 10}`
                  : `Set the target to ${Math.round(verdict.projectedScore / 10) * 10}`}
              </Button>
              {ADMINISTRATIONS.filter((a) => a.testDate > roadmap.targetDate)
                .slice(0, 1)
                .map((admin) => (
                  <Button
                    key={admin.id}
                    onClick={() => dispatch({ type: 'profile/update', patch: { testDate: admin.testDate } })}
                  >
                    {vi ? 'Dời sang kỳ ' : 'Move to '}
                    {formatDate(admin.testDate, locale)}
                  </Button>
                ))}
            </div>
          </Card>
        )}
      </DocumentFrame>
    </div>
  );
}
