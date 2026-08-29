/**
 * The transfer board.
 *
 * The claim that GITA becomes part of a person is only meaningful if it is
 * checked outside the study room. Each arena lists observable indicators —
 * phrased so they can be answered yes or no — plus the rituals that produce
 * them and the mistake that most often kills each ritual.
 *
 * Arenas open by tier. Handing a learner the society arena while their study
 * habit is still failing is how a good model gets abandoned.
 */

import React, { useMemo } from 'react';
import { useStore } from '../../state/store.tsx';
import { useLocale } from '../../i18n/index.ts';
import { useGitaProfile } from '../../gita/useGitaProfile.ts';
import { ARENAS, ARENA_ORDER, arenaTransfer } from '../../gita/arenas.ts';
import { PILLARS } from '../../gita/framework.ts';
import { Badge, Card } from '../../components/ui/primitives.tsx';
import { IconAlert, IconCheck } from '../../components/ui/icons.tsx';

export function TransferBoard(): React.ReactElement {
  const locale = useLocale();
  const { state, dispatch } = useStore();
  const view = useGitaProfile();

  const observed = useMemo(
    () => new Set(state.gita.observedIndicators),
    [state.gita.observedIndicators],
  );

  return (
    <div className="stack gap-6">
      <Card
        title={locale === 'vi' ? 'Mức chuyển giao theo đấu trường' : 'Transfer by arena'}
        subtitle={
          locale === 'vi'
            ? 'Một phương pháp chỉ dùng được ở bàn học thì chưa phải phương pháp. Đây là nơi nó phải sống sót mà không có giàn giáo.'
            : 'A method that only works at the desk is not yet a method. These are the places it has to survive without scaffolding.'
        }
      >
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {ARENA_ORDER.map((id) => {
            const arena = ARENAS[id];
            const value = arenaTransfer(id, observed);
            const locked = view.tier < arena.opensAtTier;
            return (
              <div
                key={id}
                className="kpi"
                style={{ opacity: locked ? 0.55 : 1, borderTop: `3px solid ${arena.color}` }}
              >
                <div className="kpi-label">{locale === 'vi' ? arena.labelVi : arena.label}</div>
                <div className="kpi-value">{Math.round(value * 100)}%</div>
                <div className="kpi-foot">
                  {locked
                    ? locale === 'vi'
                      ? `Mở ở tầng ${arena.opensAtTier}`
                      : `Opens at tier ${arena.opensAtTier}`
                    : `${arena.indicators.filter((i) => observed.has(i.id)).length}/${arena.indicators.length} ${
                        locale === 'vi' ? 'chỉ báo' : 'indicators'
                      }`}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {ARENA_ORDER.map((id) => {
        const arena = ARENAS[id];
        const locked = view.tier < arena.opensAtTier;

        return (
          <Card
            key={id}
            title={locale === 'vi' ? arena.labelVi : arena.label}
            subtitle={locale === 'vi' ? arena.purposeVi : arena.purpose}
            action={
              locked ? (
                <Badge tone="warning">
                  {locale === 'vi' ? `Tầng ${arena.opensAtTier}` : `Tier ${arena.opensAtTier}`}
                </Badge>
              ) : (
                <Badge tone="success">{locale === 'vi' ? 'Đang mở' : 'Open'}</Badge>
              )
            }
          >
            {locked ? (
              <p className="text-sm secondary">
                {locale === 'vi'
                  ? `Đấu trường này mở ở tầng ${arena.opensAtTier}. Mở sớm hơn thường khiến người học bỏ cả mô thức — hãy để nền tảng ở tầng hiện tại vững đã.`
                  : `This arena opens at tier ${arena.opensAtTier}. Opening it early is how learners abandon the whole model — let the current tier hold first.`}
              </p>
            ) : (
              <div className="stack gap-6">
                <div>
                  <h4 className="text-sm semibold muted" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-3)' }}>
                    {locale === 'vi' ? 'Chỉ báo quan sát được' : 'Observable indicators'}
                  </h4>
                  <div className="stack gap-2">
                    {arena.indicators.map((indicator) => {
                      const on = observed.has(indicator.id);
                      return (
                        <button
                          key={indicator.id}
                          type="button"
                          className="row gap-3"
                          aria-pressed={on}
                          onClick={() => dispatch({ type: 'gita/toggleIndicator', indicatorId: indicator.id })}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: 'var(--space-3)',
                            borderRadius: 'var(--radius-md)',
                            border: `1px solid ${on ? 'var(--success)' : 'var(--border)'}`,
                            background: on ? 'var(--success-soft)' : 'var(--surface-2)',
                          }}
                        >
                          <span
                            className="habit-check"
                            aria-hidden="true"
                            style={{
                              background: on ? 'var(--success)' : 'var(--surface)',
                              borderColor: on ? 'var(--success)' : 'var(--border-strong)',
                              color: on ? '#fff' : 'transparent',
                              flex: 'none',
                            }}
                          >
                            <IconCheck size={15} />
                          </span>
                          <span style={{ minWidth: 0 }}>
                            <span className="semibold" style={{ display: 'block', color: on ? 'var(--success)' : undefined }}>
                              {locale === 'vi' ? indicator.labelVi : indicator.label}
                            </span>
                            <span className="text-sm secondary">
                              {locale === 'vi' ? indicator.observableVi : indicator.observable}
                            </span>
                          </span>
                          <span
                            className="badge"
                            style={{
                              marginLeft: 'auto',
                              background: `color-mix(in srgb, ${PILLARS[indicator.pillar].color} 18%, transparent)`,
                              color: PILLARS[indicator.pillar].color,
                              flex: 'none',
                            }}
                          >
                            {PILLARS[indicator.pillar].letter}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm semibold muted" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-3)' }}>
                    {locale === 'vi' ? 'Nghi thức' : 'Rituals'}
                  </h4>
                  <div className="stack gap-4">
                    {arena.rituals.map((ritual) => (
                      <div className="ritual" key={ritual.id}>
                        <div className="ritual-head">
                          <div className="between wrap gap-3">
                            <span className="semibold">{locale === 'vi' ? ritual.labelVi : ritual.label}</span>
                            <span className="row gap-2">
                              <Badge>{ritual.minutes}′</Badge>
                              <Badge tone="info">
                                {locale === 'vi'
                                  ? { daily: 'Hằng ngày', weekly: 'Hằng tuần', monthly: 'Hằng tháng' }[ritual.cadence]
                                  : { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly' }[ritual.cadence]}
                              </Badge>
                            </span>
                          </div>
                          <div className="text-xs muted" style={{ marginTop: 4 }}>
                            {locale === 'vi' ? ritual.participantsVi : ritual.participants}
                          </div>
                        </div>

                        <ol className="ritual-steps text-sm">
                          {(locale === 'vi' ? ritual.stepsVi : ritual.steps).map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ol>

                        <div className="ritual-pitfall">
                          <IconAlert size={16} style={{ flex: 'none', marginTop: 2 }} />
                          <span>
                            <strong>{locale === 'vi' ? 'Cái bẫy: ' : 'Pitfall: '}</strong>
                            {locale === 'vi' ? ritual.pitfallVi : ritual.pitfall}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm semibold muted" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-2)' }}>
                    {locale === 'vi' ? 'Cần ai cùng tham gia' : 'Who else has to act'}
                  </h4>
                  <div className="row gap-2 wrap">
                    {(locale === 'vi' ? arena.stakeholdersVi : arena.stakeholders).map((person) => (
                      <Badge key={person}>{person}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
