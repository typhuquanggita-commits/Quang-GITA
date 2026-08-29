/**
 * The habit board.
 *
 * Today's habits are checkable in one tap, and everything else on the page
 * exists to answer the only question that matters about a habit: is it
 * actually running? Adherence over 28 days is shown next to each one, because
 * a streak alone hides a month of misses that restarted yesterday.
 */

import React, { useMemo } from 'react';
import { useStore } from '../../state/store.tsx';
import { useLocale } from '../../i18n/index.ts';
import { useGitaProfile } from '../../gita/useGitaProfile.ts';
import {
  adherence,
  habitStreak,
  MAX_ACTIVE_HABITS,
  type Cadence,
  type Habit,
} from '../../gita/habits.ts';
import { PILLARS } from '../../gita/framework.ts';
import { arenaLabel } from '../../gita/arenas.ts';
import { Badge, Button, Card, Empty } from '../../components/ui/primitives.tsx';
import { IconCheck, IconFire, IconSparkle } from '../../components/ui/icons.tsx';
import { isoDate } from '../../lib/util.ts';

/**
 * Study is an arena for habits but not one of the three transfer arenas, so it
 * has no entry in `ARENAS` and needs naming here.
 */
function habitArenaLabel(habit: Habit, locale: 'vi' | 'en'): string {
  if (habit.arena === 'study') return locale === 'vi' ? 'Học tập' : 'Study';
  return arenaLabel(habit.arena, locale);
}

const CADENCE_LABEL: Record<Cadence, { vi: string; en: string }> = {
  daily: { vi: 'Hằng ngày', en: 'Daily' },
  weekday: { vi: 'Ngày trong tuần', en: 'Weekdays' },
  weekly: { vi: 'Hằng tuần', en: 'Weekly' },
  monthly: { vi: 'Hằng tháng', en: 'Monthly' },
};

export function HabitBoard(): React.ReactElement {
  const locale = useLocale();
  const { state, dispatch } = useStore();
  const view = useGitaProfile();
  const today = isoDate();

  const doneToday = useMemo(
    () => new Set(state.gita.habitLog.filter((e) => e.date === today && e.done).map((e) => e.habitId)),
    [state.gita.habitLog, today],
  );

  const atCap = view.activeHabits.length >= MAX_ACTIVE_HABITS;

  return (
    <div className="stack gap-6">
      <Card
        title={locale === 'vi' ? 'Hôm nay' : 'Today'}
        subtitle={
          locale === 'vi'
            ? 'Đánh dấu ngay khi làm xong. Một ngày không ghi là một ngày không tính.'
            : 'Check it the moment it is done. An unlogged day does not count.'
        }
        action={
          <Badge tone={doneToday.size === view.activeHabits.length && view.activeHabits.length > 0 ? 'success' : 'default'}>
            {doneToday.size}/{view.activeHabits.length}
          </Badge>
        }
      >
        {view.activeHabits.length === 0 ? (
          <Empty
            icon={<IconSparkle size={28} />}
            title={locale === 'vi' ? 'Chưa nhận thói quen nào' : 'No habits taken on yet'}
            body={
              locale === 'vi'
                ? 'Chọn từ danh sách gợi ý bên dưới. Bắt đầu bằng một hoặc hai, không nhiều hơn.'
                : 'Choose from the suggestions below. Start with one or two, no more.'
            }
          />
        ) : (
          <div>
            {view.activeHabits.map((habit) => (
              <HabitRow
                key={habit.id}
                habit={habit}
                done={doneToday.has(habit.id)}
                onToggle={() =>
                  dispatch({
                    type: 'gita/logHabit',
                    entry: { habitId: habit.id, date: today, done: !doneToday.has(habit.id) },
                  })
                }
                onDrop={() => dispatch({ type: 'gita/toggleHabit', habitId: habit.id })}
              />
            ))}
          </div>
        )}
      </Card>

      {view.suggestedHabits.length > 0 && (
        <Card
          title={locale === 'vi' ? `Gợi ý cho tầng ${view.tier}` : `Suggested at tier ${view.tier}`}
          subtitle={
            atCap
              ? locale === 'vi'
                ? `Bạn đang chạy ${MAX_ACTIVE_HABITS} thói quen — mức tối đa. Bỏ bớt một cái trước khi thêm.`
                : `You are running ${MAX_ACTIVE_HABITS} habits, the maximum. Drop one before adding another.`
              : locale === 'vi'
                ? 'Nhận từng cái một. Thói quen thứ sáu thường giết chết năm cái đầu.'
                : 'Take them one at a time. A sixth habit usually kills the first five.'
          }
        >
          <div>
            {view.suggestedHabits.map((habit) => (
              <div className="habit-row" key={habit.id}>
                <span
                  className="pillar-letter"
                  style={{ background: PILLARS[habit.pillar].color, width: 28, height: 28, fontSize: 'var(--text-sm)' }}
                >
                  {PILLARS[habit.pillar].letter}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div className="semibold">{locale === 'vi' ? habit.labelVi : habit.label}</div>
                  <div className="text-xs muted">{locale === 'vi' ? habit.actionVi : habit.action}</div>
                </div>
                <Button
                  size="sm"
                  disabled={atCap}
                  onClick={() => dispatch({ type: 'gita/toggleHabit', habitId: habit.id })}
                >
                  {locale === 'vi' ? 'Nhận' : 'Take on'}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card
        title={locale === 'vi' ? 'Mức duy trì trong 28 ngày' : 'Adherence over 28 days'}
        subtitle={
          locale === 'vi'
            ? 'Tỉ lệ so với nhịp mà thói quen đó yêu cầu — không phải số lần tuyệt đối.'
            : 'Measured against what the cadence asks for, not against a raw count.'
        }
      >
        {view.activeHabits.length === 0 ? (
          <p className="muted text-sm">{locale === 'vi' ? 'Chưa có dữ liệu.' : 'No data yet.'}</p>
        ) : (
          <div>
            {view.activeHabits.map((habit) => {
              const rate = adherence(state.gita.habitLog, habit, 28);
              const streak = habitStreak(state.gita.habitLog, habit.id, today);
              return (
                <div className="mastery-row" key={habit.id}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {locale === 'vi' ? habit.labelVi : habit.label}
                    </div>
                    <div className="text-xs muted">
                      {CADENCE_LABEL[habit.cadence][locale]}
                      {streak > 0 && (
                        <>
                          {' · '}
                          <IconFire size={11} style={{ display: 'inline', verticalAlign: '-1px', color: 'var(--accent)' }} />{' '}
                          {streak}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="bar">
                    <i
                      style={{
                        width: `${Math.max(2, rate * 100)}%`,
                        background:
                          rate >= 0.8 ? 'var(--success)' : rate >= 0.5 ? 'var(--primary)' : 'var(--warning)',
                      }}
                    />
                  </div>
                  <div className="text-sm semibold" style={{ textAlign: 'right' }}>
                    {Math.round(rate * 100)}%
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

function HabitRow({
  habit,
  done,
  onToggle,
  onDrop,
}: {
  habit: Habit;
  done: boolean;
  onToggle(): void;
  onDrop(): void;
}): React.ReactElement {
  const locale = useLocale();

  return (
    <div className="habit-row">
      <button
        type="button"
        className="habit-check"
        aria-pressed={done}
        aria-label={`${locale === 'vi' ? habit.labelVi : habit.label} — ${
          done ? (locale === 'vi' ? 'đã xong' : 'done') : (locale === 'vi' ? 'chưa xong' : 'not done')
        }`}
        onClick={onToggle}
      >
        <IconCheck size={16} />
      </button>

      <div style={{ minWidth: 0 }}>
        <div className="semibold" style={done ? { textDecoration: 'line-through', color: 'var(--text-muted)' } : undefined}>
          {locale === 'vi' ? habit.labelVi : habit.label}
        </div>
        <div className="text-xs muted">
          {locale === 'vi' ? habit.cueVi : habit.cue} · {habit.minutes}′ · {habitArenaLabel(habit, locale)}
        </div>
      </div>

      <div className="row gap-3">
        <span
          className="leverage tip"
          aria-label={`${locale === 'vi' ? 'Đòn bẩy' : 'Leverage'} ${habit.leverage}/5`}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <i key={n} data-on={n <= habit.leverage} />
          ))}
          <span role="tooltip">
            {locale === 'vi' ? habit.rationaleVi : habit.rationale}
          </span>
        </span>
        <Button variant="ghost" size="sm" onClick={onDrop}>
          {locale === 'vi' ? 'Bỏ' : 'Drop'}
        </Button>
      </div>
    </div>
  );
}
