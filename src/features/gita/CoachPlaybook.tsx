/**
 * The coach playbook.
 *
 * Written for the person delivering the model, not the learner receiving it.
 * Two things govern what appears here: the learner's absorption tier, and the
 * practitioner's own certified level — because the most common failure in a
 * coaching organisation is a practitioner working a problem one level above
 * what they are prepared for.
 */

import React from 'react';
import { useStore } from '../../state/store.tsx';
import { useLocale } from '../../i18n/index.ts';
import { useGitaProfile } from '../../gita/useGitaProfile.ts';
import {
  PILLARS,
  PILLAR_ORDER,
  PRACTITIONERS,
  PRACTITIONER_ORDER,
  TIERS,
  TIER_ORDER,
  canDeliverTier,
  canWorkArena,
  practitionerLabel,
  tierLabel,
  type AbsorptionTier,
  type PractitionerLevel,
} from '../../gita/framework.ts';
import { ARENAS, ARENA_ORDER } from '../../gita/arenas.ts';
import { Badge, Button, Card, Field } from '../../components/ui/primitives.tsx';
import { IconAlert, IconCheck } from '../../components/ui/icons.tsx';

export function CoachPlaybook(): React.ReactElement {
  const locale = useLocale();
  const { state, dispatch } = useStore();
  const view = useGitaProfile();
  const level = state.gita.practitionerLevel;

  return (
    <div className="stack gap-6">
      <Card
        title={locale === 'vi' ? 'Cấp chuyên môn của bạn' : 'Your practitioner level'}
        subtitle={
          locale === 'vi'
            ? 'Tách riêng khỏi quyền truy cập dữ liệu. Quyền quyết định bạn xem được gì; cấp chuyên môn quyết định bạn được phép dẫn dắt điều gì.'
            : 'Kept separate from data access. Permissions decide what you can see; this decides what you are prepared to deliver.'
        }
      >
        <div className="stack gap-5">
          <Field
            label={locale === 'vi' ? 'Cấp hiện tại' : 'Current level'}
            hint={
              locale === 'vi'
                ? 'Trên bản chạy cục bộ, cấp này do bạn tự khai. Bản triển khai tổ chức phải do trưởng bộ môn cấp.'
                : 'On a local install this is self-declared. An organisational deployment must have it issued by a head of programme.'
            }
          >
            {(id) => (
              <select
                id={id}
                className="select"
                style={{ maxWidth: 280 }}
                value={level ?? ''}
                onChange={(e) =>
                  dispatch({
                    type: 'gita/setPractitionerLevel',
                    level: e.target.value === '' ? null : (e.target.value as PractitionerLevel),
                  })
                }
              >
                <option value="">{locale === 'vi' ? '— Chưa đặt —' : '— Not set —'}</option>
                {PRACTITIONER_ORDER.map((id2) => (
                  <option key={id2} value={id2}>{practitionerLabel(id2, locale)}</option>
                ))}
              </select>
            )}
          </Field>

          {level && (
            <div className="stack gap-4">
              <div>
                <div className="text-xs semibold muted" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {locale === 'vi' ? 'Trách nhiệm' : 'Mandate'}
                </div>
                <p className="text-sm" style={{ marginTop: 4 }}>
                  {locale === 'vi' ? PRACTITIONERS[level].mandateVi : PRACTITIONERS[level].mandate}
                </p>
              </div>

              <div
                style={{
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--warning-soft)',
                  color: 'var(--warning)',
                }}
              >
                <div className="row gap-3">
                  <IconAlert size={17} style={{ flex: 'none', marginTop: 2 }} />
                  <div>
                    <div className="text-xs semibold" style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {locale === 'vi' ? 'Phải chuyển tiếp, không tự xử lý' : 'Escalate rather than handle'}
                    </div>
                    <p className="text-sm" style={{ marginTop: 4 }}>
                      {locale === 'vi' ? PRACTITIONERS[level].escalatesVi : PRACTITIONERS[level].escalates}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                <div>
                  <div className="text-xs semibold muted" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-2)' }}>
                    {locale === 'vi' ? 'Được dẫn dắt tầng' : 'Certified for tiers'}
                  </div>
                  <div className="row gap-2 wrap">
                    {TIER_ORDER.map((tier) => (
                      <Badge key={tier} tone={canDeliverTier(level, tier) ? 'success' : 'default'}>
                        {tier} · {tierLabel(tier, locale)}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs semibold muted" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-2)' }}>
                    {locale === 'vi' ? 'Được làm việc ở' : 'Cleared for arenas'}
                  </div>
                  <div className="row gap-2 wrap">
                    <Badge tone={canWorkArena(level, 'study') ? 'success' : 'default'}>
                      {locale === 'vi' ? 'Học tập' : 'Study'}
                    </Badge>
                    {ARENA_ORDER.map((arena) => (
                      <Badge key={arena} tone={canWorkArena(level, arena) ? 'success' : 'default'}>
                        {locale === 'vi' ? ARENAS[arena].labelVi : ARENAS[arena].label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs semibold muted" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-2)' }}>
                    {locale === 'vi' ? 'Giờ có giám sát yêu cầu' : 'Supervised hours required'}
                  </div>
                  <div style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>
                    {PRACTITIONERS[level].supervisedHours}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card
        title={
          locale === 'vi'
            ? `Cách làm việc ở tầng ${view.tier} — ${tierLabel(view.tier, locale)}`
            : `Working at tier ${view.tier} — ${tierLabel(view.tier, locale)}`
        }
        subtitle={locale === 'vi' ? TIERS[view.tier].focusVi : TIERS[view.tier].focus}
        action={
          level && !canDeliverTier(level, view.tier) ? (
            <Badge tone="danger">{locale === 'vi' ? 'Vượt cấp của bạn' : 'Above your level'}</Badge>
          ) : undefined
        }
      >
        {level && !canDeliverTier(level, view.tier) ? (
          <div className="row gap-3">
            <IconAlert size={18} style={{ color: 'var(--danger)', flex: 'none' }} />
            <p className="text-sm">
              {locale === 'vi'
                ? `Người học này đang ở tầng ${view.tier}, cao hơn mức ${practitionerLabel(level, locale).toLowerCase()} được chứng nhận dẫn dắt. Hãy chuyển tiếp cho người có cấp phù hợp thay vì tự làm.`
                : `This learner is at tier ${view.tier}, above what a ${practitionerLabel(level, 'en').toLowerCase()} is certified to deliver. Hand this on rather than working it yourself.`}
            </p>
          </div>
        ) : (
          <div className="stack gap-5">
            <div>
              <div className="text-xs semibold muted" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-2)' }}>
                {locale === 'vi' ? 'Việc người học làm ở tầng này' : 'What the learner does here'}
              </div>
              <ul className="stack gap-2 text-sm secondary" style={{ paddingLeft: '1.1rem', listStyle: 'disc' }}>
                {(locale === 'vi' ? TIERS[view.tier].practicesVi : TIERS[view.tier].practices).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs semibold muted" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-2)' }}>
                {locale === 'vi' ? 'Cổng lên tầng sau' : 'Gate to the next tier'}
              </div>
              <p className="text-sm">{locale === 'vi' ? TIERS[view.tier].gateVi : TIERS[view.tier].gate}</p>
            </div>
          </div>
        )}
      </Card>

      <Card
        title={locale === 'vi' ? 'Câu hỏi thăm dò theo trụ' : 'Probes by pillar'}
        subtitle={
          locale === 'vi'
            ? 'Mỗi chiều một câu hỏi. Bắt đầu từ trụ giới hạn — ba trụ còn lại có thể đợi.'
            : 'One question per dimension. Start with the limiting pillar; the other three can wait.'
        }
      >
        <div className="stack gap-6">
          {PILLAR_ORDER.map((id) => {
            const isLimiting = id === view.profile.limitingPillar;
            return (
              <div key={id}>
                <div className="row gap-3" style={{ marginBottom: 'var(--space-3)' }}>
                  <span className="pillar-letter" style={{ background: PILLARS[id].color, width: 28, height: 28, fontSize: 'var(--text-sm)' }}>
                    {PILLARS[id].letter}
                  </span>
                  <span className="semibold">{locale === 'vi' ? PILLARS[id].labelVi : PILLARS[id].label}</span>
                  {isLimiting && (
                    <Badge tone="warning">{locale === 'vi' ? 'Bắt đầu ở đây' : 'Start here'}</Badge>
                  )}
                </div>
                <ul className="stack gap-3" style={{ listStyle: 'none', paddingLeft: 'calc(28px + var(--space-3))' }}>
                  {PILLARS[id].dimensions.map((dimension) => (
                    <li key={dimension.id}>
                      <div className="text-sm semibold">
                        “{locale === 'vi' ? dimension.probeVi : dimension.probe}”
                      </div>
                      <div className="text-xs muted" style={{ marginTop: 2 }}>
                        <IconCheck size={11} style={{ display: 'inline', verticalAlign: '-1px' }} />{' '}
                        {locale === 'vi' ? dimension.evidenceVi : dimension.evidence}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Card>

      <Card
        title={locale === 'vi' ? 'Đặt tầng thủ công' : 'Override the tier'}
        subtitle={
          locale === 'vi'
            ? 'Chỉ dùng khi bạn biết điều dữ liệu chưa biết. Ghi đè sẽ tắt việc xếp tầng theo bằng chứng cho tới khi bạn bỏ nó.'
            : 'Only when you know something the data does not. An override suspends evidence-based placement until you clear it.'
        }
      >
        <div className="row gap-2 wrap">
          {TIER_ORDER.map((tier) => (
            <Button
              key={tier}
              size="sm"
              variant={state.gita.tierOverride === tier ? 'primary' : 'secondary'}
              onClick={() =>
                dispatch({
                  type: 'gita/setTierOverride',
                  tier: state.gita.tierOverride === tier ? null : (tier as AbsorptionTier),
                })
              }
            >
              {tier} · {tierLabel(tier, locale)}
            </Button>
          ))}
          {state.gita.tierOverride !== null && (
            <Button size="sm" variant="ghost" onClick={() => dispatch({ type: 'gita/setTierOverride', tier: null })}>
              {locale === 'vi' ? 'Bỏ ghi đè' : 'Clear override'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
