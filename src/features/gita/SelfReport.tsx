/**
 * Self-report on the dimensions no behaviour can stand in for.
 *
 * The platform can see whether someone showed up; it cannot see whether they
 * believe they can do this. Only those dimensions are asked about here, and
 * an unanswered one contributes nothing to the score rather than counting as
 * a zero — so leaving a question blank is honest, not punished.
 */

import React from 'react';
import { useStore } from '../../state/store.tsx';
import { useLocale } from '../../i18n/index.ts';
import { DIMENSION_BY_ID, PILLARS } from '../../gita/framework.ts';
import { Card } from '../../components/ui/primitives.tsx';

/** Dimensions with no behavioural proxy in the platform's data. */
const SELF_REPORT_DIMENSIONS = [
  'goal-standard',
  'goal-commitment',
  'inspirits-desire',
  'inspirits-belief',
] as const;

const SCALE: Array<1 | 2 | 3 | 4 | 5> = [1, 2, 3, 4, 5];

export function SelfReport(): React.ReactElement {
  const locale = useLocale();
  const { state, dispatch } = useStore();

  return (
    <Card
      title={locale === 'vi' ? 'Tự đánh giá' : 'Self-report'}
      subtitle={
        locale === 'vi'
          ? 'Chỉ hỏi những điều nền tảng không quan sát được. Bỏ trống cũng được — câu chưa trả lời không bị tính là điểm 0.'
          : 'Only what the platform cannot observe. Leaving one blank is fine — an unanswered question is not counted as a zero.'
      }
    >
      <div className="stack gap-5">
        {SELF_REPORT_DIMENSIONS.map((id) => {
          const dimension = DIMENSION_BY_ID.get(id);
          if (!dimension) return null;
          const current = state.gita.selfReport[id];
          const pillar = PILLARS[dimension.pillar];

          return (
            <div key={id} className="stack gap-2">
              <div className="row gap-3">
                <span
                  className="pillar-letter"
                  style={{ background: pillar.color, width: 24, height: 24, fontSize: 'var(--text-xs)' }}
                >
                  {pillar.letter}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div className="semibold text-sm">
                    {locale === 'vi' ? dimension.labelVi : dimension.label}
                  </div>
                  <div className="text-xs muted">
                    {locale === 'vi' ? dimension.probeVi : dimension.probe}
                  </div>
                </div>
              </div>

              <div className="row gap-3 wrap" style={{ paddingLeft: 'calc(24px + var(--space-3))' }}>
                <div className="likert" role="group" aria-label={locale === 'vi' ? dimension.labelVi : dimension.label}>
                  {SCALE.map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={current === value}
                      onClick={() => dispatch({ type: 'gita/selfReport', dimensionId: id, value })}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <span className="text-xs muted">
                  {current === undefined
                    ? locale === 'vi'
                      ? 'Chưa trả lời'
                      : 'Not answered'
                    : locale === 'vi'
                      ? ['Chưa đúng với tôi', 'Hiếm khi', 'Đôi khi', 'Thường xuyên', 'Rất đúng với tôi'][current - 1]
                      : ['Not yet true', 'Rarely', 'Sometimes', 'Often', 'Very true'][current - 1]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
