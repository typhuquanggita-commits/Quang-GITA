/**
 * The topic library — one packet per topic.
 *
 * Ordered by need rather than by curriculum: the topics the learner is weakest
 * at come first. A topic with too little evidence to rank is shown as unranked
 * rather than sorted into a position it has not earned, which is the same rule
 * the lesson library holds.
 */

import React, { useMemo, useState } from 'react';
import { own } from '../../lib/record.ts';
import type { SectionId } from '../../types.ts';
import { LESSONS } from '../../data/lesson-index.ts';
import { BANK } from '../../data/bank.ts';
import { sectionLabel, skillLabel } from '../../data/blueprint.ts';
import { buildPacket, packetMinutes, packetProgress, packetIsThin, SHEET_ORDER, type SheetKind } from '../../engine/packets.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Empty, Segmented } from '../../components/ui/primitives.tsx';
import { IconAlert, IconCheck, IconClipboard } from '../../components/ui/icons.tsx';
import type { Route } from '../shell/routes.ts';

/** Responses below this say nothing about a topic, so it is left unranked. */
const MIN_FOR_RANK = 4;

type Scope = SectionId | 'both';

export function TopicLibrary({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const vi = locale === 'vi';
  const { state } = useStore();
  const [scope, setScope] = useState<Scope>('both');

  const rows = useMemo(
    () =>
      LESSONS.filter((lesson) => scope === 'both' || lesson.section === scope)
        .map((lesson) => {
          const packet = buildPacket(lesson.skill, BANK);
          const estimate = own(state.ability, lesson.skill);
          const theta = estimate && estimate.n >= MIN_FOR_RANK ? estimate.theta : null;
          const progress = packetProgress(
            (own(state.packets, lesson.skill)?.done ?? []) as SheetKind[],
          );
          return { lesson, packet, theta, progress };
        })
        .filter((row) => row.packet !== null)
        .sort((a, b) => {
          if (a.theta === null && b.theta === null) return 0;
          if (a.theta === null) return 1;
          if (b.theta === null) return -1;
          return a.theta - b.theta;
        }),
    [scope, state.ability, state.packets],
  );

  const started = rows.filter((r) => r.progress.done.length > 0).length;
  const finished = rows.filter((r) => r.progress.next === null).length;

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <div className="between wrap gap-4">
          <div>
            <h1 className="page-title">{vi ? 'Bộ phiếu theo chuyên đề' : 'Topic packets'}</h1>
            <p className="page-sub">
              {vi
                ? `${SHEET_ORDER.length} phiếu cho mỗi chuyên đề: lý thuyết, đọc vị, phương pháp, luyện nâng cao, ôn thi, phiếu thi, và hướng dẫn ôn chắc.`
                : `${SHEET_ORDER.length} sheets per topic: theory, recognition, method, advanced practice, revision, an exam sheet, and a consolidation guide.`}
            </p>
          </div>
          <div className="row gap-2 wrap">
            <Badge tone="info">
              {vi ? `${started} đang học` : `${started} in progress`}
            </Badge>
            <Badge tone={finished > 0 ? 'success' : 'default'}>
              {vi ? `${finished} đã ôn chắc` : `${finished} consolidated`}
            </Badge>
          </div>
        </div>
      </header>

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

      {rows.length === 0 ? (
        <Empty icon={<IconClipboard size={32} />} title={vi ? 'Không có chuyên đề nào' : 'No topics'} />
      ) : (
        <ul className="lesson-list">
          {rows.map(({ lesson, packet, theta, progress }) => (
            <li key={lesson.skill}>
              <button
                type="button"
                className="lesson-row"
                onClick={() => navigate({ name: 'packet', skill: lesson.skill })}
              >
                <span className="lesson-row-main">
                  <span className="lesson-row-title">{vi ? lesson.titleVi : lesson.title}</span>
                  <span className="lesson-row-idea">
                    {skillLabel(lesson.skill, locale)} ·{' '}
                    {vi
                      ? `${packet!.topic.types.length} dạng bài · ${packetMinutes(packet!)} phút`
                      : `${packet!.topic.types.length} question types · ${packetMinutes(packet!)} min`}
                  </span>
                  <span className="packet-pips" aria-hidden="true">
                    {SHEET_ORDER.map((kind) => (
                      <i key={kind} data-done={progress.done.includes(kind) || undefined} />
                    ))}
                  </span>
                </span>
                <span className="lesson-row-meta">
                  <Badge tone={lesson.section === 'rw' ? 'rw' : 'math'}>
                    {sectionLabel(lesson.section, locale)}
                  </Badge>
                  {theta !== null && theta < -0.3 && (
                    <Badge tone="warning">{vi ? 'Yếu nhất' : 'Weakest'}</Badge>
                  )}
                  {packetIsThin(packet!) && (
                    <Badge>
                      <IconAlert size={12} /> {vi ? 'Ít câu đúng chuyên đề' : 'Thin on-topic supply'}
                    </Badge>
                  )}
                  {progress.next === null ? (
                    <span className="lesson-read">
                      <IconCheck size={14} /> {vi ? 'Đã ôn chắc' : 'Consolidated'}
                    </span>
                  ) : (
                    <span className="lesson-unread">
                      {progress.done.length}/{SHEET_ORDER.length} {vi ? 'phiếu' : 'sheets'}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
