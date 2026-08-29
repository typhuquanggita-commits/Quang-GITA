/**
 * Today.
 *
 * The whole automated system reduced to one screen: what to do, in order,
 * with the questions already chosen. A learner should be able to open this
 * and start working without deciding anything.
 *
 * Everything else the platform offers is still there for someone who wants to
 * steer. This is for the far more common case where they do not.
 */

import React, { useMemo, useState } from 'react';
import { useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { useAutopilot } from '../../engine/useAutopilot.ts';
import { assignmentsForStudent } from '../../auth/model.ts';
import { blockSectionLabel, type DailyProgramme, type SessionBlock } from '../../engine/autopilot.ts';
import type { LoadBand } from '../../engine/interventions.ts';
import { skillLabel } from '../../data/blueprint.ts';
import { Button, Card, Empty, Ring } from '../../components/ui/primitives.tsx';
import {
  IconAlert,
  IconCards,
  IconCheck,
  IconChevronRight,
  IconClipboard,
  IconInfo,
  IconLightning,
  IconRefresh,
  IconSparkle,
  IconTarget,
} from '../../components/ui/icons.tsx';
import { formatDuration, isoDate } from '../../lib/util.ts';
import type { Route } from '../shell/routes.ts';
import { DecisionLog } from './DecisionLog.tsx';

const LOAD_LABEL: Record<LoadBand, { vi: string; en: string }> = {
  recovery: { vi: 'Phục hồi', en: 'Recovery' },
  standard: { vi: 'Tiêu chuẩn', en: 'Standard' },
  push: { vi: 'Tăng tốc', en: 'Push' },
  taper: { vi: 'Giảm tải', en: 'Taper' },
};

const BLOCK_META: Record<
  SessionBlock['kind'],
  { vi: string; en: string; color: string; icon: React.ReactNode }
> = {
  reflect: { vi: 'Viết ra vì sao', en: 'Write down why', color: 'var(--accent)', icon: <IconSparkle size={18} /> },
  diagnostic: { vi: 'Bài chẩn đoán', en: 'Diagnostic', color: 'var(--info)', icon: <IconTarget size={18} /> },
  'full-test': { vi: 'Thi thử full-length', en: 'Full-length test', color: 'var(--rw)', icon: <IconTarget size={18} /> },
  assignment: { vi: 'Bài giáo viên giao', en: 'Set by your teacher', color: 'var(--danger)', icon: <IconClipboard size={18} /> },
  review: { vi: 'Ôn lỗi sai', en: 'Review', color: 'var(--math)', icon: <IconRefresh size={18} /> },
  drill: { vi: 'Luyện tập', en: 'Drill', color: 'var(--primary)', icon: <IconLightning size={18} /> },
  vocab: { vi: 'Từ vựng', en: 'Vocabulary', color: 'var(--success)', icon: <IconCards size={18} /> },
  rest: { vi: 'Nghỉ', en: 'Rest', color: 'var(--text-muted)', icon: <IconCheck size={18} /> },
};

export function TodayView({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, dispatch } = useStore();
  const { programme, dailyMinutes } = useAutopilot();
  const [showLog, setShowLog] = useState(false);

  const today = isoDate();
  const doneIds = useMemo(
    () => new Set(state.autopilot.completedBlocks[today] ?? []),
    [state.autopilot.completedBlocks, today],
  );

  /** Titles for assignment blocks, so set work is named rather than generic. */
  const assignmentTitles = useMemo(() => {
    const map = new Map<string, string>();
    for (const assignment of assignmentsForStudent(state.org, state.org.currentAccountId)) {
      map.set(assignment.id, assignment.title);
    }
    return map;
  }, [state.org]);

  const doneMinutes = programme.blocks
    .filter((b) => doneIds.has(b.id) || doneIds.has(blockKey(b)))
    .reduce((acc, b) => acc + b.minutes, 0);

  const progress = programme.totalMinutes === 0 ? 1 : doneMinutes / programme.totalMinutes;

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <h1 className="page-title">{locale === 'vi' ? 'Hôm nay' : 'Today'}</h1>
        <p className="page-sub">
          {locale === 'vi'
            ? 'Hệ thống đã đọc toàn bộ dữ liệu của bạn và xếp sẵn buổi học. Bạn không phải quyết định gì — chỉ cần bắt đầu.'
            : 'The system has read everything it knows about you and laid out the session. You do not have to decide anything — just start.'}
        </p>
      </header>

      {/* ---- Hero ---- */}
      <div className="today-hero">
        <div className="between wrap gap-6">
          <div style={{ minWidth: 260, maxWidth: '58ch' }}>
            <div className="row gap-2 wrap" style={{ marginBottom: 'var(--space-3)' }}>
              <span className="load-pill">{LOAD_LABEL[programme.load][locale]}</span>
              <span className="load-pill">
                {formatDuration(programme.totalMinutes * 60, locale)}
              </span>
              {programme.provisional && (
                <span className="load-pill">
                  {locale === 'vi' ? 'Tạm thời' : 'Provisional'}
                </span>
              )}
            </div>

            <h2>{headline(programme, locale)}</h2>
            <p style={{ marginTop: 'var(--space-2)' }}>
              {programme.decisions[0]
                ? locale === 'vi'
                  ? programme.decisions[0].actionVi
                  : programme.decisions[0].action
                : locale === 'vi'
                  ? 'Không có việc nào cần làm hôm nay.'
                  : 'Nothing scheduled today.'}
            </p>

            <div className="row gap-3 wrap" style={{ marginTop: 'var(--space-5)' }}>
              {firstActionable(programme, doneIds) && (
                <Button
                  variant="primary"
                  onClick={() => startBlock(firstActionable(programme, doneIds)!)}
                >
                  <IconLightning size={16} />
                  {locale === 'vi' ? 'Bắt đầu' : 'Start'}
                </Button>
              )}
              <Button variant="secondary" onClick={() => setShowLog((v) => !v)}>
                {locale === 'vi' ? 'Vì sao lại là những việc này?' : 'Why these?'}
              </Button>
            </div>
          </div>

          <Ring
            value={progress}
            size={140}
            stroke={12}
            color="#fff"
            label={<span style={{ color: '#fff' }}>{Math.round(progress * 100)}%</span>}
            sublabel={
              <span style={{ color: 'rgb(255 255 255 / 0.75)' }}>
                {formatDuration(doneMinutes * 60, locale)} / {formatDuration(programme.totalMinutes * 60, locale)}
              </span>
            }
          />
        </div>
      </div>

      {/* ---- Escalations ---- */}
      {programme.escalations.length > 0 && (
        <div className="stack gap-3">
          {programme.escalations.map((escalation) => (
            <div className="escalation" data-severity={escalation.severity} key={escalation.code}>
              {escalation.severity === 'info' ? (
                <IconInfo size={20} style={{ flex: 'none', marginTop: 2 }} />
              ) : (
                <IconAlert size={20} style={{ flex: 'none', marginTop: 2 }} />
              )}
              <div>
                <div className="semibold">
                  {locale === 'vi' ? 'Cần một người xem việc này' : 'A person should look at this'}
                </div>
                <p className="text-sm" style={{ marginTop: 4 }}>
                  {locale === 'vi' ? escalation.messageVi : escalation.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---- Provisional warning ---- */}
      {programme.provisional && (
        <Card>
          <div className="row gap-3">
            <IconInfo size={20} style={{ color: 'var(--info)', flex: 'none' }} />
            <p className="text-sm secondary">
              {locale === 'vi'
                ? 'Hệ thống chưa có đủ dữ liệu để tự tin về buổi học này. Nó sẽ chính xác dần sau vài buổi — và nó sẽ nói rõ khi đã đủ.'
                : 'There is not yet enough data for this session to be more than a reasonable guess. It sharpens over the next few sessions, and it will say so when it does.'}
            </p>
          </div>
        </Card>
      )}

      {/* ---- The programme ---- */}
      {programme.blocks.length === 0 ? (
        <Empty
          icon={<IconCheck size={32} />}
          title={locale === 'vi' ? 'Hôm nay nghỉ' : 'Rest today'}
          body={
            locale === 'vi'
              ? 'Ngày nghỉ được xếp có chủ đích. Nghỉ ngơi bảo vệ khả năng ghi nhớ và giữ cho kế hoạch theo được.'
              : 'This rest is scheduled on purpose. It protects retention and keeps the plan followable.'
          }
        />
      ) : (
        <div className="block-list">
          {programme.blocks.map((block, index) => {
            const meta = BLOCK_META[block.kind];
            const done = doneIds.has(block.id) || doneIds.has(blockKey(block));
            const decision = programme.decisions.find((d) => d.ruleId === block.ruleId);
            const section = blockSectionLabel(block.section, locale);

            return (
              <div className="block" key={block.id} data-done={done || undefined} style={{ ['--block' as string]: meta.color }}>
                <span className="block-icon" aria-hidden="true">
                  {done ? <IconCheck size={18} /> : meta.icon}
                </span>

                <div style={{ minWidth: 0 }}>
                  <div className="block-title">
                    {index + 1}.{' '}
                    {block.assignmentId
                      ? (assignmentTitles.get(block.assignmentId) ?? meta[locale])
                      : meta[locale]}
                    {section && <span className="muted"> · {section}</span>}
                    {block.skills && block.skills.length > 0 && (
                      <span className="muted">
                        {' · '}
                        {block.skills.map((s) => skillLabel(s, locale)).join(', ')}
                      </span>
                    )}
                  </div>
                  <div className="block-why">
                    {formatDuration(block.minutes * 60, locale)}
                    {block.questionIds.length > 0 && ` · ${block.questionIds.length} ${t('common.questions')}`}
                    {decision && ` · ${locale === 'vi' ? decision.summaryVi : decision.summary}`}
                  </div>
                </div>

                <div className="row gap-2">
                  {!done && block.kind !== 'rest' && (
                    <Button size="sm" variant="primary" onClick={() => startBlock(block)}>
                      {locale === 'vi' ? 'Làm' : 'Start'}
                      <IconChevronRight size={14} />
                    </Button>
                  )}
                  {block.kind !== 'rest' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      aria-pressed={done}
                      onClick={() => {
                        dispatch({ type: 'autopilot/toggleBlock', date: today, blockId: blockKey(block) });
                        // Clearing set work is also the act of submitting it,
                        // so the teacher's roster reflects it without a second
                        // step the learner would forget.
                        if (block.assignmentId && !done) {
                          dispatch({
                            type: 'org/submitAssignment',
                            assignmentId: block.assignmentId,
                            accountId: state.org.currentAccountId,
                          });
                        }
                      }}
                    >
                      {done ? (locale === 'vi' ? 'Bỏ đánh dấu' : 'Undo') : (locale === 'vi' ? 'Đã xong' : 'Done')}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---- Why ---- */}
      {showLog && <DecisionLog programme={programme} />}

      <Card>
        <div className="between wrap gap-3">
          <div className="text-sm secondary">
            {locale === 'vi'
              ? `Ngân sách hôm nay: ${programme.budgetMinutes} phút, tính từ cam kết ${dailyMinutes} phút/ngày và mức tải ${LOAD_LABEL[programme.load].vi.toLowerCase()}.`
              : `Today's budget: ${programme.budgetMinutes} minutes, from your ${dailyMinutes}-minute daily commitment at ${LOAD_LABEL[programme.load].en.toLowerCase()} load.`}
          </div>
          <Button size="sm" variant="ghost" onClick={() => navigate({ name: 'plan' })}>
            {locale === 'vi' ? 'Đổi cam kết' : 'Change commitment'}
          </Button>
        </div>
      </Card>
    </div>
  );

  /** Routes a block to the surface that runs it. */
  function startBlock(block: SessionBlock): void {
    switch (block.kind) {
      case 'review':
        navigate({ name: 'review' });
        break;
      case 'vocab':
        navigate({ name: 'vocab' });
        break;
      case 'diagnostic':
      case 'full-test':
        navigate({ name: 'tests' });
        break;
      case 'reflect':
        navigate({ name: 'gita' });
        break;
      case 'assignment':
      case 'drill':
      default:
        // A drill carries its own items, so practice opens with exactly the
        // set the coach chose rather than re-deriving one.
        dispatch({ type: 'autopilot/queue', questionIds: block.questionIds, blockId: blockKey(block) });
        navigate({ name: 'practice' });
        break;
    }
  }
}

/**
 * A stable identity for a block across rebuilds.
 *
 * Block ids are freshly generated every time the programme is computed, so
 * completion has to key on something derived from the block's content —
 * otherwise a tick would clear itself on the next render.
 */
export function blockKey(block: SessionBlock): string {
  return `${block.kind}:${block.ruleId}:${block.minutes}`;
}

function firstActionable(programme: DailyProgramme, done: ReadonlySet<string>): SessionBlock | null {
  return (
    programme.blocks.find((b) => b.kind !== 'rest' && !done.has(b.id) && !done.has(blockKey(b))) ?? null
  );
}

function headline(programme: DailyProgramme, locale: 'vi' | 'en'): string {
  if (programme.blocks.length === 0) {
    return locale === 'vi' ? 'Hôm nay nghỉ.' : 'Rest today.';
  }
  const first = programme.decisions[0];
  if (!first) return locale === 'vi' ? 'Buổi học hôm nay' : "Today's session";
  return locale === 'vi' ? first.summaryVi : first.summary;
}
