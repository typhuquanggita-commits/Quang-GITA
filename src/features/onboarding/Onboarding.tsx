/**
 * First-run onboarding.
 *
 * Asks only what changes the product's behaviour — name, test date, target,
 * available hours — and nothing that could be inferred later. Every answer is
 * optional except the one the plan generator genuinely needs.
 */

import React, { useState } from 'react';
import { useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { generatePlan } from '../../engine/studyPlan.ts';
import { seedOrg } from '../../auth/model.ts';
import { Button, Card, Field, Segmented } from '../../components/ui/primitives.tsx';
import { IconSparkle } from '../../components/ui/icons.tsx';
import { addDays, isoDate } from '../../lib/util.ts';

const STEPS = 3;

export function Onboarding(): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { dispatch, state } = useStore();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [testDate, setTestDate] = useState(addDays(isoDate(), 90));
  const [target, setTarget] = useState(1500);
  const [hours, setHours] = useState(8);

  function finish() {
    dispatch({
      type: 'profile/update',
      patch: { name: name.trim(), targetScore: target, testDate, onboarded: true },
    });

    // Seed the organisation with this person as the sole student account.
    dispatch({ type: 'hydrate', state: { ...state, org: seedOrg(name.trim(), state.profile.email) } });
    dispatch({
      type: 'profile/update',
      patch: { name: name.trim(), targetScore: target, testDate, onboarded: true },
    });

    dispatch({
      type: 'plan/set',
      plan: generatePlan({
        testDate,
        targetScore: target,
        baselineScore: null,
        hoursPerWeek: hours,
        weakSkills: [],
        locale,
      }),
    });
  }

  return (
    <div className="center" style={{ minHeight: '100vh', padding: 'var(--space-6)' }}>
      <div style={{ width: 'min(560px, 100%)' }}>
        <div className="center stack gap-3" style={{ flexDirection: 'column', marginBottom: 'var(--space-8)' }}>
          <span className="brand-mark" style={{ width: 52, height: 52, fontSize: 'var(--text-md)' }} aria-hidden="true">
            365
          </span>
          <h1 style={{ fontSize: 'var(--text-2xl)' }}>{t('onboard.welcome')}</h1>
          <p className="muted" style={{ textAlign: 'center', maxWidth: '46ch' }}>{t('onboard.body')}</p>
        </div>

        <Card>
          <div className="stack gap-6">
            <div className="between">
              <span className="text-sm muted">{t('onboard.step', { n: step, total: STEPS })}</span>
              <div className="bar" style={{ width: 120 }}>
                <i style={{ width: `${(step / STEPS) * 100}%` }} />
              </div>
            </div>

            {step === 1 && (
              <Field label={t('onboard.yourName')}>
                {(id) => (
                  <input
                    id={id}
                    className="input"
                    autoFocus
                    placeholder={t('onboard.namePlaceholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && name.trim()) setStep(2);
                    }}
                  />
                )}
              </Field>
            )}

            {step === 2 && (
              <div className="stack gap-5">
                <Field label={t('onboard.whenTest')}>
                  {(id) => (
                    <input
                      id={id}
                      className="input"
                      type="date"
                      min={isoDate()}
                      value={testDate}
                      onChange={(e) => setTestDate(e.target.value)}
                    />
                  )}
                </Field>
                <Field label={t('onboard.whatTarget')}>
                  {() => (
                    <Segmented
                      ariaLabel={t('onboard.whatTarget')}
                      value={String(target)}
                      onChange={(next) => setTarget(Number(next))}
                      options={[
                        { value: '1200', label: '1200' },
                        { value: '1350', label: '1350' },
                        { value: '1500', label: '1500' },
                        { value: '1600', label: '1600' },
                      ]}
                    />
                  )}
                </Field>
              </div>
            )}

            {step === 3 && (
              <Field
                label={t('onboard.howMuchTime')}
                hint={
                  locale === 'vi'
                    ? 'Hãy chọn con số bạn thật sự giữ được — kế hoạch chỉ hữu ích khi theo được.'
                    : 'Choose a number you can actually hold to — a plan only helps if it is followed.'
                }
              >
                {() => (
                  <Segmented
                    ariaLabel={t('onboard.howMuchTime')}
                    value={String(hours)}
                    onChange={(next) => setHours(Number(next))}
                    options={[
                      { value: '4', label: '4h' },
                      { value: '8', label: '8h' },
                      { value: '12', label: '12h' },
                      { value: '20', label: '20h' },
                    ]}
                  />
                )}
              </Field>
            )}

            <div className="between">
              <Button variant="ghost" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
                {t('common.back')}
              </Button>
              {step < STEPS ? (
                <Button variant="primary" onClick={() => setStep((s) => s + 1)} disabled={step === 1 && !name.trim()}>
                  {t('common.next')}
                </Button>
              ) : (
                <Button variant="primary" onClick={finish}>
                  <IconSparkle size={16} />
                  {t('onboard.getStarted')}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
