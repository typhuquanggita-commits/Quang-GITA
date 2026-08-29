/**
 * The learner's own level card.
 *
 * Lives apart from the teaching console so the dashboard can render it
 * without pulling the whole console — and the console stays lazily loaded for
 * the majority of accounts that will never open it.
 */

import React from 'react';
import { useLocale } from '../../i18n/index.ts';
import {
  levelForScore,
  studentLevelLabel,
  STUDENT_LEVELS,
  STUDENT_LEVEL_SPECS,
} from '../../auth/roles.ts';
import { Badge, Card } from '../../components/ui/primitives.tsx';
import { IconSparkle } from '../../components/ui/icons.tsx';

/** Shown on a student's own dashboard: what their level is and what is next. */
export function StudentLevelCard({ total }: { total: number | null }): React.ReactElement {
  const locale = useLocale();
  const level = levelForScore(total ?? 400);
  const spec = STUDENT_LEVEL_SPECS[level];
  const index = STUDENT_LEVELS.indexOf(level);
  const next = index < STUDENT_LEVELS.length - 1 ? STUDENT_LEVELS[index + 1] : null;
  const needed = next && total !== null ? STUDENT_LEVEL_SPECS[next].minTotal - total : null;

  return (
    <Card
      title={locale === 'vi' ? 'Cấp độ học tập' : 'Study level'}
      action={<Badge tone="primary">{studentLevelLabel(level, locale)}</Badge>}
    >
      <div className="stack gap-3">
        <p className="text-sm secondary">
          {locale === 'vi'
            ? 'Cấp độ được tính từ điểm thi thử gần nhất và mở khoá nội dung phù hợp — không phải đặc quyền quản trị.'
            : 'Your level comes from your most recent test score and unlocks study material — not administrative access.'}
        </p>
        <ul className="stack gap-2 text-sm" style={{ paddingLeft: '1.1rem', listStyle: 'disc' }}>
          {(locale === 'vi' ? spec.unlocksVi : spec.unlocks).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {next && needed !== null && needed > 0 && (
          <p className="text-sm" style={{ color: 'var(--primary)' }}>
            <IconSparkle size={14} />{' '}
            {locale === 'vi'
              ? `Còn ${needed} điểm nữa để lên ${studentLevelLabel(next, locale)}.`
              : `${needed} points to reach ${studentLevelLabel(next, locale)}.`}
          </p>
        )}
      </div>
    </Card>
  );
}
