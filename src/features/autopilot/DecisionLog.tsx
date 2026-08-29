/**
 * The decision log.
 *
 * This is the part that makes the automated coach answerable. Every rule that
 * fired is listed with the evidence that triggered it and the reasoning behind
 * the rule itself, so a learner or a coach can disagree with a specific step
 * rather than with the system as a whole.
 *
 * An automated system nobody can argue with is not trusted for long, and
 * should not be.
 */

import React, { useState } from 'react';
import { useLocale } from '../../i18n/index.ts';
import type { DailyProgramme } from '../../engine/autopilot.ts';
import { PILLARS } from '../../gita/framework.ts';
import { RULE_BY_ID } from '../../engine/interventions.ts';
import { Badge, Card } from '../../components/ui/primitives.tsx';
import { IconChevronDown, IconChevronRight } from '../../components/ui/icons.tsx';

export function DecisionLog({ programme }: { programme: DailyProgramme }): React.ReactElement {
  const locale = useLocale();
  const [open, setOpen] = useState<string | null>(programme.decisions[0]?.id ?? null);

  return (
    <Card
      title={locale === 'vi' ? 'Vì sao hệ thống quyết định như vậy' : 'Why the system decided this'}
      subtitle={
        locale === 'vi'
          ? 'Mỗi quyết định ghi lại chính xác dữ liệu nào đã kích hoạt nó. Nếu bạn không đồng ý với một bước, hãy nói với coach — bộ luật này sửa được.'
          : 'Each decision records exactly which data triggered it. If you disagree with a step, say so to a coach — these rules are editable.'
      }
    >
      {programme.decisions.length === 0 ? (
        <p className="muted text-sm">
          {locale === 'vi' ? 'Không có quyết định nào hôm nay.' : 'No decisions today.'}
        </p>
      ) : (
        <div>
          {programme.decisions.map((decision) => {
            const rule = RULE_BY_ID.get(decision.ruleId);
            const pillar = rule ? PILLARS[rule.pillar] : null;
            const isOpen = open === decision.id;

            return (
              <div className="decision" key={decision.id}>
                <button
                  type="button"
                  className="decision-head"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : decision.id)}
                >
                  {isOpen ? (
                    <IconChevronDown size={16} style={{ flex: 'none', marginTop: 3 }} />
                  ) : (
                    <IconChevronRight size={16} style={{ flex: 'none', marginTop: 3 }} />
                  )}

                  <span style={{ minWidth: 0 }}>
                    <span className="semibold" style={{ display: 'block' }}>
                      {locale === 'vi' ? decision.summaryVi : decision.summary}
                    </span>
                    <span className="text-sm secondary" style={{ display: 'block', marginTop: 2 }}>
                      {locale === 'vi' ? decision.actionVi : decision.action}
                    </span>
                  </span>

                  {pillar && (
                    <span
                      className="badge"
                      style={{
                        marginLeft: 'auto',
                        flex: 'none',
                        background: `color-mix(in srgb, ${pillar.color} 18%, transparent)`,
                        color: pillar.color,
                      }}
                    >
                      {pillar.letter}
                    </span>
                  )}
                </button>

                {isOpen && (
                  <div className="decision-body stack gap-4">
                    <div>
                      <div className="evidence-label">
                        {locale === 'vi' ? 'Bằng chứng đã đọc' : 'Evidence read'}
                      </div>
                      <div className="evidence-grid" style={{ marginTop: 'var(--space-2)' }}>
                        {decision.evidence.map((item) => (
                          <div className="evidence-item" key={item.label}>
                            <div className="evidence-label">
                              {locale === 'vi' ? item.labelVi : item.label}
                            </div>
                            <div className="evidence-value">{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="evidence-label">
                        {locale === 'vi' ? 'Vì sao có luật này' : 'Why this rule exists'}
                      </div>
                      <p className="text-sm secondary" style={{ marginTop: 'var(--space-2)' }}>
                        {locale === 'vi' ? decision.rationaleVi : decision.rationale}
                      </p>
                    </div>

                    <div className="row gap-2 wrap">
                      <Badge>{decision.ruleId}</Badge>
                      {decision.blockIds.length > 0 && (
                        <Badge tone="primary">
                          {decision.blockIds.length}{' '}
                          {locale === 'vi' ? 'khối trong buổi học' : 'block(s) in today’s session'}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
