/**
 * The guardian's report, as a page that prints.
 *
 * It is generated on the learner's own device, and that is not an accident of
 * the architecture — it is the only honest place to generate it. There is no
 * server: response-level data lives in this browser and reaches no other. A
 * teacher's console builds its report from what a teacher can actually see,
 * which is far less. So the learner produces this sheet and hands it over,
 * the way a school report card has always worked.
 *
 * What the page refuses to do is as much of the design as what it shows.
 *
 * It will not print a score change that has not cleared measurement error. It
 * shows the change, states the error, and says plainly that the two are not
 * yet distinguishable. A guardian who is told "+20 points" in March and then
 * sees no gain in June has been misled by this document, and no amount of
 * good teaching afterwards repairs that.
 *
 * It will not describe an unpractised skill as weak. Too little evidence is
 * its own category, printed as such.
 *
 * And it will not offer advice with no signal behind it. The suggestions
 * block is empty when the month was unremarkable, because a page of generic
 * encouragement is how a family learns to stop reading these.
 */

import React, { useMemo } from 'react';
import { QUESTION_BY_ID } from '../../data/bank.ts';
import { skillLabel } from '../../data/blueprint.ts';
import { buildParentReport, type ParentReport, type SkillMovement } from '../../engine/parentReport.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale } from '../../i18n/index.ts';
import { Badge, Button, Card } from '../../components/ui/primitives.tsx';
import { DocumentFrame } from '../../brand/DocumentFrame.tsx';
import { IconAlert, IconCheck, IconPrint, IconTarget } from '../../components/ui/icons.tsx';
import { daysBetween, formatDate, isoDate, pct } from '../../lib/util.ts';

const WINDOWS = [30, 60, 90] as const;

function VerdictLine({ report, vi }: { report: ParentReport; vi: boolean }): React.ReactElement {
  const { score } = report;

  if (score.verdict === 'insufficient') {
    return (
      <p className="report-verdict" data-tone="neutral">
        {vi
          ? `Chưa đủ hai lần thi trọn vẹn để nói về xu hướng điểm (hiện có ${score.sittings}). Một lần thi cho biết vị trí, chưa cho biết chiều đi.`
          : `Fewer than two full sittings, so there is no score trend yet (${score.sittings} so far). One score is a position, not a direction.`}
      </p>
    );
  }

  if (score.verdict === 'within-error') {
    return (
      <p className="report-verdict" data-tone="neutral">
        {vi
          ? `Điểm thay đổi ${score.change! >= 0 ? '+' : ''}${score.change} , nhưng sai số đo cộng gộp của hai lần thi là ±${score.combinedError}. Mức thay đổi này CHƯA tách được khỏi sai số — chưa thể coi là tiến bộ, và cũng chưa phải đi lùi.`
          : `The total moved by ${score.change! >= 0 ? '+' : ''}${score.change}, against a combined measurement error of ±${score.combinedError} across the two sittings. That change is not yet distinguishable from error — it is neither progress nor decline.`}
      </p>
    );
  }

  return (
    <p className="report-verdict" data-tone={score.verdict === 'up' ? 'good' : 'bad'}>
      {vi
        ? `Điểm ${score.verdict === 'up' ? 'tăng' : 'giảm'} ${Math.abs(score.change!)} điểm, vượt sai số đo cộng gộp ±${score.combinedError}. Đây là chuyển động thật, không phải nhiễu đo.`
        : `The total is ${score.verdict === 'up' ? 'up' : 'down'} ${Math.abs(score.change!)} points, beyond the combined measurement error of ±${score.combinedError}. This is real movement, not measurement noise.`}
    </p>
  );
}

function MovementList({
  items,
  vi,
  locale,
  tone,
}: {
  items: SkillMovement[];
  vi: boolean;
  locale: 'vi' | 'en';
  tone: 'good' | 'bad';
}): React.ReactElement {
  return (
    <ul className="report-movement">
      {items.map((item) => (
        <li key={item.skill} data-tone={tone}>
          <span className="report-movement-skill">{skillLabel(item.skill, locale)}</span>
          <span className="report-movement-figures">
            {pct(item.before)} → {pct(item.after)}
            <span className="muted text-xs">
              {' '}
              ({item.attempted} {vi ? 'câu' : 'items'})
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function GuardianReport(): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';
  const { state, audit } = useStore();
  const [windowDays, setWindowDays] = React.useState<number>(30);

  const report = useMemo(
    () =>
      buildParentReport({
        studentName: state.profile.name,
        attempts: state.attempts,
        questions: QUESTION_BY_ID,
        activity: state.activity,
        windowDays,
      }),
    [state.profile.name, state.attempts, state.activity, windowDays],
  );

  const daysLeft = state.profile.testDate ? daysBetween(isoDate(), state.profile.testDate) : null;

  const limits = vi
    ? 'Đây là báo cáo nội bộ của SAT365, không phải điểm SAT chính thức. Tham số độ khó là ước lượng của người soạn, chưa hiệu chuẩn trên quần thể thật; hệ thống chỉ ghi nhận phần việc làm trong hệ thống. Mọi con số dưới đây đều kèm giới hạn của nó ở cuối phiếu.'
    : 'An internal SAT365 report, not an official SAT score. Difficulty parameters are author estimates rather than calibrations against a live population, and the platform records only work done inside it. Every figure below is qualified in the limits section at the end.';

  return (
    <div className="page stack gap-5">
      <div className="row gap-3 wrap between no-print">
        <div className="row gap-2 wrap">
          {WINDOWS.map((days) => (
            <Button
              key={days}
              variant={days === windowDays ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setWindowDays(days)}
            >
              {vi ? `${days} ngày qua` : `Last ${days} days`}
            </Button>
          ))}
        </div>
        <Button
          onClick={() => {
            // Printing hands the learner's own figures to someone else. The
            // existing report.exported action is the right record for that.
            audit({ action: 'report.exported', detail: `guardian report, ${windowDays} days` });
            window.print();
          }}
        >
          <IconPrint size={15} /> {vi ? 'In phiếu' : 'Print'}
        </Button>
      </div>

      <DocumentFrame
        kind={vi ? 'Phiếu báo phụ huynh' : 'Guardian report'}
        title={
          vi
            ? `${formatDate(report.from, locale)} – ${formatDate(report.to, locale)}`
            : `${formatDate(report.from, locale)} to ${formatDate(report.to, locale)}`
        }
        pillar="goal"
        subject={report.studentName}
        date={formatDate(report.to, locale)}
        reference={`gr-${report.to}-${windowDays}`}
        locale={locale}
        limits={limits}
      >
        {report.thin && (
          <div className="escalation" data-severity="attention">
            <IconAlert size={18} />
            <div>
              <strong>{vi ? 'Bằng chứng còn mỏng' : 'The evidence is thin'}</strong>
              <p>
                {vi
                  ? `Kỳ này mới có ${report.responses} câu trả lời và ${report.effort.activeDays} ngày có hoạt động. Hãy đọc phiếu này như một điểm khởi đầu, chưa phải một bản đánh giá.`
                  : `This period holds ${report.responses} answers across ${report.effort.activeDays} active days. Read this as a starting point rather than as an assessment.`}
              </p>
            </div>
          </div>
        )}

        {/* ---- Score ---- */}
        <Card level={2} title={vi ? '1. Điểm và ý nghĩa của nó' : '1. The score, and what it means'}>
          {report.score.latest ? (
            <div className="stack gap-4">
              <div className="report-scores">
                <div className="report-score">
                  <span className="report-score-label">{vi ? 'Lần đầu trong hồ sơ' : 'First on record'}</span>
                  <strong>{report.score.first!.total}</strong>
                  <span className="muted text-xs">
                    {formatDate(isoDate(new Date(report.score.first!.at)), locale)}
                  </span>
                </div>
                <div className="report-score">
                  <span className="report-score-label">{vi ? 'Lần gần nhất' : 'Most recent'}</span>
                  <strong>{report.score.latest.total}</strong>
                  <span className="muted text-xs">
                    ±{Math.round((report.score.latest.band[1] - report.score.latest.band[0]) / 2)}
                    {' · '}
                    {formatDate(isoDate(new Date(report.score.latest.at)), locale)}
                  </span>
                </div>
                {daysLeft !== null && (
                  <div className="report-score">
                    <span className="report-score-label">{vi ? 'Còn tới ngày thi' : 'Days to the test'}</span>
                    <strong>{Math.max(0, daysLeft)}</strong>
                    <span className="muted text-xs">
                      {vi ? `mục tiêu ${state.profile.targetScore}` : `target ${state.profile.targetScore}`}
                    </span>
                  </div>
                )}
              </div>
              <VerdictLine report={report} vi={vi} />
            </div>
          ) : (
            <p className="secondary">
              {vi
                ? 'Chưa có lần thi trọn vẹn nào được chấm trong hồ sơ. Bài luyện lẻ không được quy về thang 400–1600, vì làm vậy sẽ tạo ra một con số trông như điểm thi mà không phải.'
                : 'No full, scored sitting is on record yet. Practice runs are not converted to the 400–1600 scale, because doing so produces a figure that looks like a test score and is not one.'}
            </p>
          )}
        </Card>

        {/* ---- Effort ---- */}
        <Card level={2} title={vi ? '2. Mức độ đều đặn' : '2. How steady the work has been'}>
          <div className="report-effort">
            <div className="report-score">
              <span className="report-score-label">{vi ? 'Ngày có học' : 'Active days'}</span>
              <strong>
                {report.effort.activeDays}
                <span className="muted"> / {report.effort.windowDays}</span>
              </strong>
            </div>
            <div className="report-score">
              <span className="report-score-label">{vi ? 'Tổng thời gian' : 'Total time'}</span>
              <strong>
                {Math.floor(report.effort.minutes / 60)}
                <span className="muted">{vi ? ' giờ ' : ' h '}</span>
                {report.effort.minutes % 60}
                <span className="muted">{vi ? ' phút' : ' m'}</span>
              </strong>
            </div>
            <div className="report-score">
              <span className="report-score-label">{vi ? 'Chuỗi dài nhất' : 'Longest run'}</span>
              <strong>
                {report.effort.longestRun} <span className="muted">{vi ? 'ngày' : 'days'}</span>
              </strong>
            </div>
            <div className="report-score">
              <span className="report-score-label">{vi ? 'Quãng nghỉ dài nhất' : 'Longest gap'}</span>
              <strong>
                {report.effort.longestGap} <span className="muted">{vi ? 'ngày' : 'days'}</span>
              </strong>
            </div>
          </div>
          <p className="secondary" style={{ marginTop: 'var(--space-4)' }}>
            {vi
              ? 'Tổng thời gian và độ đều đặn là hai chuyện khác nhau. Mười giờ chia cho hai ngày cuối tuần và mười giờ chia cho hai mươi buổi tối cho ra kết quả học rất khác nhau — và cái thứ hai mới là thứ gia đình giữ giúp được.'
              : 'Total time and steadiness are different things. Ten hours across two weekends and ten hours across twenty evenings produce very different learning, and the second is the one a household can help protect.'}
          </p>
        </Card>

        {/* ---- Movement ---- */}
        <Card level={2} title={vi ? '3. Kỹ năng nào đã dịch chuyển' : '3. Which skills moved'}>
          <div className="stack gap-5">
            <div className="stack gap-2">
              <span className="report-heading">
                <IconCheck size={14} /> {vi ? 'Đã tiến bộ đo được' : 'Measurably improved'}
              </span>
              {report.movement.improved.length > 0 ? (
                <MovementList items={report.movement.improved} vi={vi} locale={locale} tone="good" />
              ) : (
                <p className="secondary text-sm">
                  {vi ? 'Chưa kỹ năng nào vượt ngưỡng chuyển động trong kỳ này.' : 'No skill cleared the movement threshold in this period.'}
                </p>
              )}
            </div>

            <div className="stack gap-2">
              <span className="report-heading">
                <IconTarget size={14} /> {vi ? 'Đã luyện nhưng chưa chuyển' : 'Worked on, and not moving'}
              </span>
              {report.movement.stuck.length > 0 ? (
                <MovementList items={report.movement.stuck} vi={vi} locale={locale} tone="bad" />
              ) : (
                <p className="secondary text-sm">{vi ? 'Không có.' : 'None.'}</p>
              )}
            </div>

            {report.movement.tooEarly.length > 0 && (
              <div className="stack gap-2">
                <span className="report-heading">
                  {vi ? 'Chưa đủ dữ liệu để nói' : 'Too early to say'}
                </span>
                <p className="secondary text-sm">
                  {vi
                    ? 'Những kỹ năng sau luyện quá ít trong kỳ để nói là tiến hay lùi. Chúng KHÔNG được xếp là yếu — hệ thống thực sự chưa biết:'
                    : 'These were practised too little this period for movement to mean anything. They are not counted as weak — the platform does not know either way:'}
                </p>
                <div className="row gap-2 wrap">
                  {report.movement.tooEarly.map((skill) => (
                    <Badge key={skill}>{skillLabel(skill, locale)}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* ---- What a guardian can do ---- */}
        <Card level={2} title={vi ? '4. Việc gia đình làm được' : '4. What the household can do'}>
          {report.homeActions.length > 0 ? (
            <ul className="report-actions">
              {report.homeActions.map((action) => (
                <li key={action.en}>{vi ? action.vi : action.en}</li>
              ))}
            </ul>
          ) : (
            <p className="secondary">
              {vi
                ? 'Kỳ này không có tín hiệu nào cần đến sự can thiệp ở nhà. Mục này để trống là có chủ ý: một trang động viên chung chung là cách nhanh nhất khiến gia đình thôi đọc những phiếu như thế này.'
                : 'No signal this period calls for anything at home. This section is deliberately empty when that is the case: a page of generic encouragement is the fastest way to teach a family to stop reading these.'}
            </p>
          )}
        </Card>

        {/* ---- Limits ---- */}
        <Card level={2} title={vi ? '5. Phiếu này KHÔNG nói được gì' : '5. What this report cannot tell you'}>
          <ul className="report-limits">
            {report.limits.map((limit) => (
              <li key={limit.en}>
                <IconAlert size={15} />
                <span>{vi ? limit.vi : limit.en}</span>
              </li>
            ))}
          </ul>
        </Card>
      </DocumentFrame>
    </div>
  );
}
