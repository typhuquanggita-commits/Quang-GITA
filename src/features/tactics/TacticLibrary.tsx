/**
 * Kho bí kíp — the tactics treasury as a surface.
 *
 * The layer above lessons and packets: the moves that transfer, which a strong
 * test taker reaches for without being told which skill they are in.
 *
 * Every entry leads with its trigger rather than its name, because a tactic a
 * learner cannot find under time pressure is a tactic they do not have. And
 * every entry ends with what it costs — the field that separates a tactic from
 * a slogan, and the one most "SAT tips" lists omit.
 */

import React, { useMemo, useState } from 'react';
import type { SectionId } from '../../types.ts';
import { sectionLabel, skillLabel } from '../../data/blueprint.ts';
import {
  TACTICS,
  TACTIC_FAMILY_LABEL,
  type Tactic,
  type TacticFamily,
} from '../../data/tactics.ts';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Card, Empty, Segmented } from '../../components/ui/primitives.tsx';
import { IconAlert, IconCheck, IconSparkle, IconTarget } from '../../components/ui/icons.tsx';
import type { Route } from '../shell/routes.ts';

type Scope = SectionId | 'both';

export function TacticLibrary({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const vi = locale === 'vi';
  const [scope, setScope] = useState<Scope>('both');

  const families = useMemo(() => {
    const shown = TACTICS.filter((tactic) => scope === 'both' || tactic.sections.includes(scope));
    const order: TacticFamily[] = ['reframe', 'from-the-options', 'make-it-concrete', 'error-guard', 'triage'];
    return order
      .map((family) => ({ family, tactics: shown.filter((x) => x.family === family) }))
      .filter((group) => group.tactics.length > 0);
  }, [scope]);

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <div className="between wrap gap-4">
          <div>
            <h1 className="page-title">{vi ? 'Kho bí kíp' : 'Tactics treasury'}</h1>
            <p className="page-sub">
              {vi
                ? 'Các nước đi dùng được cho nhiều dạng bài — thứ một người làm bài giỏi với lấy mà không cần ai nhắc đang ở kỹ năng nào.'
                : 'The moves that transfer — what a strong test taker reaches for without being told which skill they are in.'}
            </p>
          </div>
          <Badge tone="info">
            {TACTICS.length} {vi ? 'bí kíp' : 'tactics'}
          </Badge>
        </div>
      </header>

      {/*
        Stated before the list, because a treasury of tactics read as a list of
        tricks is how a learner ends up applying the wrong one confidently.
      */}
      <div className="escalation" data-severity="info">
        <IconAlert size={20} />
        <div>
          <strong>{vi ? 'Cách đọc kho này' : 'How to read this'}</strong>
          <p>
            {vi
              ? 'Mỗi bí kíp có ba phần, và phần thứ ba mới là phần quan trọng. Dấu hiệu cho biết khi nào với tới nó — một nước đi không có dấu hiệu là nước đi không tìm thấy khi đang gấp. Các bước là cách làm. Và cái giá cho biết khi nào nó chậm hơn cách trực tiếp, hoặc sai hẳn. Một "mẹo" không nêu được cái giá của nó thì chưa được nghĩ đến nơi.'
              : 'Every tactic has three parts, and the third is the one that matters. The trigger tells you when to reach for it — a move with no trigger is a move you cannot find under time pressure. The steps are how. And the cost says when it is slower than the direct route, or wrong outright. A "tip" that cannot state its own cost has not been thought through.'}
          </p>
        </div>
      </div>

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

      {families.length === 0 ? (
        <Empty icon={<IconSparkle size={30} />} title={vi ? 'Không có bí kíp nào' : 'No tactics'} />
      ) : (
        families.map(({ family, tactics }) => (
          <section key={family} className="stack gap-4">
            <h2 className="tactic-family">
              {vi ? TACTIC_FAMILY_LABEL[family].vi : TACTIC_FAMILY_LABEL[family].en}
            </h2>
            {tactics.map((tactic) => (
              <TacticCard key={tactic.id} tactic={tactic} navigate={navigate} locale={locale} />
            ))}
          </section>
        ))
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* One tactic — module scope, per the standing rule                    */
/* ------------------------------------------------------------------ */

export function TacticCard({
  tactic,
  navigate,
  locale,
}: {
  tactic: Tactic;
  navigate?(route: Route): void;
  locale: 'vi' | 'en';
}): React.ReactElement {
  const vi = locale === 'vi';

  return (
    <Card
      level={3}
      className="tactic-card"
      title={vi ? tactic.nameVi : tactic.name}
      action={
        <span className="row gap-2 wrap">
          {tactic.sections.map((section) => (
            <Badge key={section} tone={section === 'rw' ? 'rw' : 'math'}>
              {sectionLabel(section, locale)}
            </Badge>
          ))}
        </span>
      }
    >
      <div className="stack gap-4">
        {/* The trigger leads. A tactic is found by its signal, not by its name. */}
        <div className="tactic-trigger">
          <IconTarget size={16} />
          <div>
            <strong>{vi ? 'Khi nào dùng' : 'When to reach for it'}</strong>
            <p>{vi ? tactic.triggerVi : tactic.trigger}</p>
          </div>
        </div>

        <div>
          <h4 className="tactic-heading">{vi ? 'Các bước' : 'The move'}</h4>
          <ol className="lesson-method">
            {(vi ? tactic.moveVi : tactic.move).map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="tactic-demo">
          <h4 className="tactic-heading">{vi ? 'Áp dụng thử' : 'Applied'}</h4>
          <p className="lesson-prompt">{vi ? tactic.demo.setupVi : tactic.demo.setup}</p>
          <ol className="lesson-method">
            {(vi ? tactic.demo.workingVi : tactic.demo.working).map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ol>
        </div>

        {/* The cost. Required, and given the same weight as the move itself. */}
        <div className="tactic-cost">
          <IconAlert size={16} />
          <div>
            <strong>{vi ? 'Cái giá của nó' : 'What it costs'}</strong>
            <p>{vi ? tactic.costsVi : tactic.costs}</p>
          </div>
        </div>

        {tactic.skills.length > 0 && (
          <div className="row gap-2 wrap">
            <span className="text-xs muted">{vi ? 'Ăn điểm nhất ở:' : 'Pays best on:'}</span>
            {tactic.skills.map((skill) => (
              <button
                key={skill}
                type="button"
                className="tactic-skill"
                onClick={() => navigate?.({ name: 'lesson', skill })}
                disabled={!navigate}
              >
                <IconCheck size={12} /> {skillLabel(skill, locale)}
              </button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
