/**
 * The GITA summary on the dashboard.
 *
 * Shows the limiting pillar and the single next move, because that is the
 * only part of the model a learner needs before opening the full workspace.
 */

import React from 'react';
import { useLocale } from '../../i18n/index.ts';
import { useGitaProfile } from '../../gita/useGitaProfile.ts';
import { nextMove } from '../../gita/assessment.ts';
import { PILLARS, PILLAR_ORDER, tierLabel } from '../../gita/framework.ts';
import { Badge, Button, Card } from '../../components/ui/primitives.tsx';
import { IconSparkle } from '../../components/ui/icons.tsx';
import type { Route } from '../shell/routes.ts';

export function GitaCard({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const locale = useLocale();
  const view = useGitaProfile();
  const move = nextMove(view.profile);
  const limiting = PILLARS[view.profile.limitingPillar];

  return (
    <Card
      title="GITA"
      action={
        <Badge tone="primary">
          {locale === 'vi' ? 'Tầng' : 'Tier'} {view.tier} · {tierLabel(view.tier, locale)}
        </Badge>
      }
    >
      <div className="stack gap-4">
        <div className="row gap-2">
          {PILLAR_ORDER.map((id) => (
            <div key={id} className="grow" style={{ minWidth: 0 }}>
              <div
                className="pillar-letter"
                style={{
                  background: PILLARS[id].color,
                  width: '100%',
                  height: 28,
                  borderRadius: 'var(--radius-sm)',
                  opacity: id === view.profile.limitingPillar ? 1 : 0.55,
                }}
                aria-hidden="true"
              >
                {PILLARS[id].letter}
              </div>
              <div className="text-xs muted" style={{ textAlign: 'center', marginTop: 4 }}>
                {view.profile.pillars[id].score}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="text-xs semibold muted" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {locale === 'vi' ? 'Trụ giới hạn' : 'Limiting pillar'} ·{' '}
            {locale === 'vi' ? limiting.labelVi : limiting.label}
          </div>
          <p className="text-sm secondary" style={{ marginTop: 'var(--space-2)' }}>
            {locale === 'vi' ? move.moveVi : move.move}
          </p>
        </div>

        <Button size="sm" onClick={() => navigate({ name: 'gita' })} style={{ alignSelf: 'flex-start' }}>
          <IconSparkle size={14} />
          {locale === 'vi' ? 'Mở mô thức GITA' : 'Open GITA'}
        </Button>
      </div>
    </Card>
  );
}
