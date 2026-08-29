/**
 * The lesson library.
 *
 * The platform could already measure a learner and drill them; it could not
 * teach them. A student told that Transitions was their weakest skill had
 * nowhere to go but more Transitions questions, which is how a misconception
 * gets rehearsed a hundred times and called studying.
 *
 * The library is ordered by need rather than by curriculum: the skills the
 * learner is weakest at come first, and a skill with too little evidence to
 * rank is shown as unranked rather than sorted into a position it has not
 * earned.
 */

import React, { useMemo, useState } from 'react';
import { own } from '../../lib/record.ts';
import type { SectionId, SkillId } from '../../types.ts';
import { LESSONS, type Lesson } from '../../data/lesson-index.ts';
import { sectionLabel, skillLabel } from '../../data/blueprint.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Empty, Segmented } from '../../components/ui/primitives.tsx';
import { IconBook, IconCheck } from '../../components/ui/icons.tsx';
import { formatDate } from '../../lib/util.ts';
import type { Route } from '../shell/routes.ts';

/** Responses below this say nothing about a skill, so it is left unranked. */
const MIN_FOR_RANK = 4;

type Scope = SectionId | 'both';

export function LessonLibrary({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state } = useStore();
  const [scope, setScope] = useState<Scope>('both');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return LESSONS.filter((lesson) => scope === 'both' || lesson.section === scope)
      .filter((lesson) => {
        if (!needle) return true;
        const haystack = [
          lesson.title,
          lesson.titleVi,
          skillLabel(lesson.skill, 'vi'),
          skillLabel(lesson.skill, 'en'),
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(needle);
      })
      .map((lesson) => {
        const estimate = own(state.ability, lesson.skill);
        // An ability estimate from two responses is noise wearing the costume
        // of a measurement; it must not decide what a learner reads first.
        const theta = estimate && estimate.n >= MIN_FOR_RANK ? estimate.theta : null;
        return { lesson, theta, progress: own(state.lessons, lesson.skill) ?? null };
      })
      .sort((a, b) => {
        if (a.theta === null && b.theta === null) return 0;
        if (a.theta === null) return 1;
        if (b.theta === null) return -1;
        return a.theta - b.theta;
      });
  }, [scope, query, state.ability, state.lessons]);

  const readCount = LESSONS.filter((lesson) => own(state.lessons, lesson.skill)).length;

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <div className="between wrap gap-4">
          <div>
            <h1 className="page-title">{t('lessons.title')}</h1>
            <p className="page-sub">{t('lessons.subtitle')}</p>
          </div>
          <Badge tone="info">
            {t('lessons.count', { read: String(readCount), total: String(LESSONS.length) })}
          </Badge>
        </div>
      </header>

      <div className="between wrap gap-4">
        <Segmented<Scope>
          ariaLabel={t('practice.scope')}
          value={scope}
          onChange={setScope}
          options={[
            { value: 'both', label: t('common.all') },
            { value: 'rw', label: sectionLabel('rw', locale) },
            { value: 'math', label: sectionLabel('math', locale) },
          ]}
        />
        <label className="lesson-search">
          <span className="sr-only">{t('lessons.searchLabel')}</span>
          <input
            className="input"
            type="search"
            value={query}
            placeholder={t('lessons.searchPlaceholder')}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      {rows.length === 0 ? (
        <Empty icon={<IconBook size={32} />} title={t('lessons.none')} />
      ) : (
        <ul className="lesson-list">
          {rows.map(({ lesson, theta, progress }) => (
            <LessonRow
              key={lesson.skill}
              lesson={lesson}
              theta={theta}
              readAt={progress?.lastReadAt ?? null}
              navigate={navigate}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Row                                                                 */
/* ------------------------------------------------------------------ */

function LessonRow({
  lesson,
  theta,
  readAt,
  navigate,
}: {
  lesson: Lesson;
  theta: number | null;
  readAt: string | null;
  navigate(route: Route): void;
}): React.ReactElement {
  const t = useT();
  const locale = useLocale();

  return (
    <li>
      <button
        type="button"
        className="lesson-row"
        onClick={() => navigate({ name: 'lesson', skill: lesson.skill })}
      >
        <span className="lesson-row-main">
          <span className="lesson-row-title">{locale === 'vi' ? lesson.titleVi : lesson.title}</span>
          <span className="lesson-row-idea">{locale === 'vi' ? lesson.ideaVi : lesson.idea}</span>
        </span>
        <span className="lesson-row-meta">
          <Badge tone={lesson.section === 'rw' ? 'rw' : 'math'}>
            {sectionLabel(lesson.section, locale)}
          </Badge>
          {theta !== null && theta < -0.3 && <Badge tone="warning">{t('lessons.weakest')}</Badge>}
          <Badge>{t('lessons.minutes', { n: String(lesson.minutes) })}</Badge>
          {readAt ? (
            <span className="lesson-read">
              <IconCheck size={14} /> {t('lessons.readOn', { date: formatDate(readAt, locale) })}
            </span>
          ) : (
            <span className="lesson-unread">{t('lessons.unread')}</span>
          )}
        </span>
      </button>
    </li>
  );
}

/** Exposed so other surfaces can name the lesson a skill maps to. */
export function lessonTitle(skill: SkillId, locale: 'vi' | 'en'): string {
  const lesson = LESSONS.find((l) => l.skill === skill);
  if (!lesson) return skillLabel(skill, locale);
  return locale === 'vi' ? lesson.titleVi : lesson.title;
}
