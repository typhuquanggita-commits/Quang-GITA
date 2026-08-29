/**
 * The GITA workspace.
 *
 * Four panels, in the order a learner needs them: where the four pillars
 * stand, which habits are running today, how far the method has travelled out
 * of the study room, and — for practitioners — how to work with someone at
 * this tier.
 */

import React, { useState } from 'react';
import { useStore } from '../../state/store.tsx';
import { useLocale } from '../../i18n/index.ts';
import { useGitaProfile } from '../../gita/useGitaProfile.ts';
import { PILLARS, PILLAR_ORDER, TIERS, TIER_ORDER, tierLabel } from '../../gita/framework.ts';
import { nextMove, pillarSummary } from '../../gita/assessment.ts';
import { Badge, Card, Ring, Tabs } from '../../components/ui/primitives.tsx';
import { MasteryBars } from '../../components/charts/charts.tsx';
import { IconAlert } from '../../components/ui/icons.tsx';
import { pct } from '../../lib/util.ts';
import { PillarRadar } from './PillarRadar.tsx';
import { SelfReport } from './SelfReport.tsx';
import { HabitBoard } from './HabitBoard.tsx';
import { TransferBoard } from './TransferBoard.tsx';
import { CoachPlaybook } from './CoachPlaybook.tsx';

type GitaTab = 'profile' | 'habits' | 'transfer' | 'playbook';

export function GitaHome(): React.ReactElement {
  const locale = useLocale();
  const { allows } = useStore();
  const [tab, setTab] = useState<GitaTab>('profile');
  const view = useGitaProfile();

  const tabs: Array<{ id: GitaTab; label: string; visible: boolean }> = [
    { id: 'profile', label: locale === 'vi' ? 'Hồ sơ GITA' : 'GITA profile', visible: true },
    { id: 'habits', label: locale === 'vi' ? 'Thói quen' : 'Habits', visible: true },
    { id: 'transfer', label: locale === 'vi' ? 'Chuyển giao' : 'Transfer', visible: true },
    {
      id: 'playbook',
      label: locale === 'vi' ? 'Sổ tay coach' : 'Coach playbook',
      visible: allows('roster.view'),
    },
  ];
  const visible = tabs.filter((x) => x.visible);
  const active = visible.some((x) => x.id === tab) ? tab : 'profile';

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <h1 className="page-title">
          {locale === 'vi' ? 'Mô thức huấn luyện GITA' : 'The GITA training model'}
        </h1>
        <p className="page-sub">
          {locale === 'vi'
            ? 'Điểm số đo bạn làm được gì. GITA quyết định bạn trở thành ai trên đường tới đó — Mục tiêu, Nội lực, Tài năng, Hành động.'
            : 'A score measures what you can do. GITA decides who you become on the way there — Goal, Inspirits, Talent, Action.'}
        </p>
      </header>

      <GitaHero />

      <Tabs<GitaTab>
        value={active}
        onChange={setTab}
        ariaLabel="GITA sections"
        tabs={visible.map((x) => ({ id: x.id, label: x.label }))}
      />

      {active === 'profile' && <ProfilePanel />}
      {active === 'habits' && <HabitBoard />}
      {active === 'transfer' && <TransferBoard />}
      {active === 'playbook' && <CoachPlaybook />}
    </div>
  );

  function GitaHero(): React.ReactElement {
    const spec = TIERS[view.tier];
    const move = nextMove(view.profile);

    return (
      <div className="gita-hero">
        <div className="center">
          <Ring
            value={view.profile.overall / 100}
            size={190}
            stroke={14}
            color="#fff"
            label={<span style={{ color: '#fff' }}>{view.profile.overall}</span>}
            sublabel={<span style={{ color: 'rgb(255 255 255 / 0.75)' }}>GITA / 100</span>}
          />
        </div>

        <div className="stack gap-4">
          <div className="row gap-2 wrap">
            <Badge tone="primary">
              {locale === 'vi' ? 'Tầng' : 'Tier'} {view.tier} · {tierLabel(view.tier, locale)}
            </Badge>
            {view.tierIsOverridden && (
              <Badge tone="warning">
                {locale === 'vi' ? 'Do coach đặt' : 'Set by coach'}
              </Badge>
            )}
            <Badge tone="info">
              {locale === 'vi' ? 'Độ tin cậy' : 'Confidence'}{' '}
              {pct(view.profile.pillars.action.confidence)}
            </Badge>
          </div>

          <div>
            <h2 style={{ fontSize: 'var(--text-xl)' }}>
              {locale === 'vi' ? spec.focusVi : spec.focus}
            </h2>
          </div>

          <div
            style={{
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              background: 'rgb(255 255 255 / 0.12)',
              border: '1px solid rgb(255 255 255 / 0.24)',
            }}
          >
            <div className="text-xs semibold" style={{ opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {locale === 'vi' ? 'Việc tiếp theo' : 'Next move'}
            </div>
            <p style={{ marginTop: 'var(--space-2)' }}>
              {locale === 'vi' ? move.observationVi : move.observation}
            </p>
            <p className="semibold" style={{ marginTop: 'var(--space-2)', color: '#fff' }}>
              {locale === 'vi' ? move.moveVi : move.move}
            </p>
          </div>
        </div>
      </div>
    );
  }

  function ProfilePanel(): React.ReactElement {
    const summary = pillarSummary(view.profile, locale);
    const confidence = view.profile.pillars.action.confidence;

    return (
      <div className="stack gap-6">
        {confidence < 0.35 && (
          <Card>
            <div className="row gap-3">
              <IconAlert size={20} style={{ color: 'var(--warning)', flex: 'none' }} />
              <p className="text-sm secondary">
                {locale === 'vi'
                  ? 'Nền tảng chưa quan sát đủ hành vi để những con số này đáng tin. Hãy coi đây là điểm khởi đầu, không phải kết luận — nó sẽ chính xác dần sau vài tuần sử dụng thật.'
                  : 'The platform has not yet seen enough behaviour for these figures to be trustworthy. Treat them as a starting point, not a verdict — they sharpen after a few weeks of real use.'}
              </p>
            </div>
          </Card>
        )}

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <Card
            title={locale === 'vi' ? 'Bốn trụ cột' : 'The four pillars'}
            subtitle={
              locale === 'vi'
                ? 'Trụ yếu nhất là nơi cần bắt đầu, không phải trụ mạnh nhất.'
                : 'The weakest pillar is where to start, not the strongest.'
            }
          >
            <PillarRadar summary={summary} limiting={view.profile.limitingPillar} />
          </Card>

          <Card title={locale === 'vi' ? 'Tầng hấp thu' : 'Absorption tier'}>
            <div className="stack gap-4">
              <div className="tier-track">
                {TIER_ORDER.map((tier) => (
                  <div
                    key={tier}
                    className="tier-step"
                    data-state={tier === view.tier ? 'current' : tier < view.tier ? 'reached' : undefined}
                  >
                    <span className="tier-step-num">{tier}</span>
                    {tierLabel(tier, locale)}
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-sm semibold">{tierLabel(view.tier, locale)}</h4>
                <ul className="stack gap-2 text-sm secondary" style={{ marginTop: 'var(--space-2)', paddingLeft: '1.1rem', listStyle: 'disc' }}>
                  {(locale === 'vi' ? TIERS[view.tier].practicesVi : TIERS[view.tier].practices).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {view.profile.nextGate && (
                <div
                  style={{
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--info-soft)',
                    color: 'var(--info)',
                  }}
                >
                  <div className="text-xs semibold" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {locale === 'vi' ? `Cổng lên tầng ${view.profile.nextGate.tier}` : `Gate to tier ${view.profile.nextGate.tier}`}
                  </div>
                  <p className="text-sm" style={{ marginTop: 4 }}>
                    {locale === 'vi' ? view.profile.nextGate.gateVi : view.profile.nextGate.gate}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="pillar-grid">
          {summary.map((pillar) => (
            <div
              key={pillar.id}
              className={pillar.id === view.profile.limitingPillar ? 'pillar-card pillar-limiting' : 'pillar-card'}
              style={{ ['--pillar' as string]: pillar.color }}
            >
              <div className="between" style={{ marginBottom: 'var(--space-3)' }}>
                <span className="pillar-letter" style={{ background: pillar.color }}>{pillar.letter}</span>
                <span className="pillar-score">{pillar.score}</span>
              </div>
              <h4 className="semibold">{pillar.label}</h4>
              <p className="text-sm secondary" style={{ marginTop: 'var(--space-2)' }}>{pillar.essence}</p>
              {pillar.id === view.profile.limitingPillar && (
                <p className="text-sm" style={{ marginTop: 'var(--space-3)', color: 'var(--warning)' }}>
                  <IconAlert size={13} /> {pillar.failureMode}
                </p>
              )}
            </div>
          ))}
        </div>

        <SelfReport />

        <Card
          title={locale === 'vi' ? 'Bằng chứng phía sau mỗi điểm số' : 'The evidence behind each score'}
          subtitle={
            locale === 'vi'
              ? 'Mỗi trụ được chấm từ hành vi đã đo được, không phải từ cảm nhận. Đây là các tín hiệu đã dùng.'
              : 'Each pillar is scored from measured behaviour, not from impressions. These are the signals used.'
          }
        >
          <div className="stack gap-6">
            {PILLAR_ORDER.map((id) => (
              <div key={id}>
                <h4 className="text-sm semibold" style={{ marginBottom: 'var(--space-3)', color: PILLARS[id].color }}>
                  {PILLARS[id].letter} · {locale === 'vi' ? PILLARS[id].labelVi : PILLARS[id].label}
                </h4>
                <MasteryBars
                  rows={view.profile.pillars[id].drivers.map((driver) => ({
                    label: locale === 'vi' ? driver.labelVi : driver.label,
                    value: driver.value / 100,
                    meta: `${locale === 'vi' ? 'trọng số' : 'weight'} ×${driver.weight}`,
                    color: PILLARS[id].color,
                  }))}
                  formatValue={(v) => String(Math.round(v * 100))}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }
}
