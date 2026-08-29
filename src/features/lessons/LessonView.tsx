/**
 * One lesson.
 *
 * The four sections are always in the same order — idea, method, worked
 * example, traps — because the shape is what makes a lesson usable at the
 * moment of need. A learner who has read three of these knows where to look
 * for the step they have forgotten without reading the whole thing again.
 *
 * "Read" is recorded only when the learner says so. Opening a page is not
 * evidence of having read it, and a coach that treats it as such will stop
 * prescribing instruction the learner still needs.
 */

import React, { useMemo } from 'react';
import { own } from '../../lib/record.ts';
import type { Question } from '../../types.ts';
import { BANK } from '../../data/bank.ts';
import { lessonFor } from '../../data/lesson-index.ts';
import { sectionLabel, skillLabel } from '../../data/blueprint.ts';
import { selectPracticeItems } from '../../engine/adaptive.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty } from '../../components/ui/primitives.tsx';
import { IconBook, IconCheck, IconTarget } from '../../components/ui/icons.tsx';
import { formatDate } from '../../lib/util.ts';
import type { Route } from '../shell/routes.ts';

/** Items queued when a learner practises straight off a lesson. */
const DRILL_LENGTH = 10;

export function LessonView({
  skill,
  navigate,
}: {
  skill: string;
  navigate(route: Route): void;
}): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, dispatch } = useStore();

  const lesson = lessonFor(skill);
  // `skill` comes from the URL, so the lookup must not inherit.
  const progress = own(state.lessons, skill) ?? null;

  const drill = useMemo((): Question[] => {
    if (!lesson) return [];
    return selectPracticeItems({
      bank: BANK,
      theta: state.sectionAbility[lesson.section].theta,
      count: DRILL_LENGTH,
      section: lesson.section,
      skills: [lesson.skill],
    });
  }, [lesson, state.sectionAbility]);

  if (!lesson) {
    return (
      <div className="page">
        <Empty
          icon={<IconBook size={32} />}
          title={t('lessons.none')}
          action={<Button onClick={() => navigate({ name: 'lessons' })}>{t('common.back')}</Button>}
        />
      </div>
    );
  }

  const vi = locale === 'vi';
  const method = vi ? lesson.methodVi : lesson.method;
  const worked = lesson.worked;
  const steps = vi ? worked.stepsVi : worked.steps;

  const practise = () => {
    if (drill.length === 0) return;
    dispatch({
      type: 'autopilot/queue',
      blockId: `lesson:${lesson.skill}`,
      questionIds: drill.map((q) => q.id),
    });
    navigate({ name: 'practice' });
  };

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <Button variant="ghost" onClick={() => navigate({ name: 'lessons' })}>
          ← {t('lessons.title')}
        </Button>
        <div className="between wrap gap-4">
          <div>
            <h1 className="page-title">{vi ? lesson.titleVi : lesson.title}</h1>
            <p className="page-sub">{skillLabel(lesson.skill, locale)}</p>
          </div>
          <div className="row gap-2 wrap">
            <Badge tone={lesson.section === 'rw' ? 'rw' : 'math'}>
              {sectionLabel(lesson.section, locale)}
            </Badge>
            <Badge>{t('lessons.minutes', { n: String(lesson.minutes) })}</Badge>
            {progress && (
              <Badge tone="success">
                {t('lessons.readOn', { date: formatDate(progress.lastReadAt, locale) })}
              </Badge>
            )}
          </div>
        </div>
      </header>

      <Card title={t('lessons.idea')}>
        <p className="lesson-idea">{vi ? lesson.ideaVi : lesson.idea}</p>
      </Card>

      <Card title={t('lessons.method')}>
        <ol className="lesson-method">
          {method.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </Card>

      <Card title={t('lessons.worked')}>
        <p className="lesson-prompt">{vi ? worked.promptVi : worked.prompt}</p>
        <ol className="lesson-method">
          {steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        <p className="lesson-answer">
          <strong>{t('lessons.answer')}:</strong> {vi ? worked.answerVi : worked.answer}
        </p>
      </Card>

      <Card title={t('lessons.traps')}>
        <ul className="lesson-traps">
          {lesson.traps.map((trap, i) => (
            <li key={i}>
              <span className="lesson-trap-name">{vi ? trap.nameVi : trap.name}</span>
              <span className="lesson-trap-why">
                <em>{t('lessons.why')}:</em> {vi ? trap.whyVi : trap.why}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="row gap-3 wrap">
        <Button
          variant="secondary"
          onClick={() => dispatch({ type: 'lesson/read', skill: lesson.skill })}
        >
          <IconCheck size={16} /> {progress ? t('lessons.readAgain') : t('lessons.markRead')}
        </Button>
        <Button onClick={practise} disabled={drill.length === 0}>
          <IconTarget size={16} /> {t('lessons.practiseSkill')}
        </Button>
      </div>
    </div>
  );
}
