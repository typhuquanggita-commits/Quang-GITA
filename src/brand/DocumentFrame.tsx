/**
 * The document frame: what makes a printed page a SAT365 document.
 *
 * Before this existed, printing a score report produced a screen with its
 * navigation removed. That is not a document. A document says, on every page
 * and without being asked, what it is, who it is about, when it was produced,
 * and what it may be relied on for — because a page that leaves a filing
 * cabinet without those four things is an orphan, and a reader who finds it in
 * six months has no way to tell whether it still means anything.
 *
 * ## The four things, and why each is on the page
 *
 * **What it is.** A document type, in the masthead, with the pillar it serves.
 * A learner holding six sheets should be able to sort them by glance.
 *
 * **Who it is about.** Named in the metadata block. A worksheet with no name
 * on it is a worksheet that gets handed back to the wrong person.
 *
 * **When.** Generated date, in the footer of every page. Learner data moves
 * fast enough that a report three months old is a different claim from the same
 * report today.
 *
 * **What it may be relied on for.** The limits line. This is the one most
 * document systems omit and the one this codebase insists on: the same rule
 * that puts uncalibrated parameters in front of a reader on screen puts them in
 * front of a reader on paper. A number that arrives on headed paper acquires an
 * authority the number has not earned, and the frame is where that gets
 * corrected.
 */

import React from 'react';
import { SatLockup } from './Brandmark.tsx';
import { PILLAR_COLOUR } from './tokens.ts';

export type PillarId = 'goal' | 'inspirits' | 'talent' | 'action';

const PILLAR_LABEL: Record<PillarId, { vi: string; en: string }> = {
  goal: { vi: 'Goal — Mục tiêu', en: 'Goal' },
  inspirits: { vi: 'Inspirits — Nội lực', en: 'Inspirits' },
  talent: { vi: 'Talent — Tài năng', en: 'Talent' },
  action: { vi: 'Action — Hành động', en: 'Action' },
};

export interface DocumentFrameProps {
  /** The document type, e.g. "Phiếu luyện nâng cao". */
  kind: string;
  /** The specific title, e.g. the topic or the test name. */
  title: string;
  /** Which pillar of the training model this document serves. */
  pillar: PillarId;
  /** Who the document is about. */
  subject?: string;
  /** Local calendar date the document was produced. */
  date: string;
  /**
   * What this document may be relied on for, and what it may not. Required
   * rather than optional: a frame that lets a document omit its own limits is
   * a frame that will be used to omit them.
   */
  limits: string;
  /** A short reference so a printed sheet can be matched back to a record. */
  reference?: string;
  locale: 'vi' | 'en';
  children: React.ReactNode;
}

export function DocumentFrame({
  kind,
  title,
  pillar,
  subject,
  date,
  limits,
  reference,
  locale,
  children,
}: DocumentFrameProps): React.ReactElement {
  const vi = locale === 'vi';

  return (
    <article className="doc" data-pillar={pillar}>
      {/*
        The masthead repeats on every printed page through the running-header
        rules in print.css, so a page separated from its fellows still names
        itself.
      */}
      <header className="doc-masthead">
        <SatLockup height={30} />
        <div className="doc-masthead-meta">
          <span
            className="doc-pillar"
            style={{ '--pillar': PILLAR_COLOUR[pillar] } as React.CSSProperties}
          >
            {vi ? PILLAR_LABEL[pillar].vi : PILLAR_LABEL[pillar].en}
          </span>
          <span className="doc-kind">{kind}</span>
        </div>
      </header>

      <div className="doc-title-block">
        <h1 className="doc-title">{title}</h1>
        <dl className="doc-meta">
          {subject && (
            <>
              <dt>{vi ? 'Học viên' : 'Learner'}</dt>
              <dd>{subject}</dd>
            </>
          )}
          <dt>{vi ? 'Lập ngày' : 'Issued'}</dt>
          <dd>{date}</dd>
          {reference && (
            <>
              <dt>{vi ? 'Mã tài liệu' : 'Reference'}</dt>
              <dd className="doc-ref">{reference}</dd>
            </>
          )}
        </dl>
      </div>

      <div className="doc-body">{children}</div>

      {/*
        Not a disclaimer in small print at the end. The limits sit in a bordered
        block that survives photocopying, because the failure this guards
        against is a figure being quoted without them.
      */}
      <aside className="doc-limits" aria-label={vi ? 'Giới hạn của tài liệu này' : 'Limits of this document'}>
        <strong>{vi ? 'Tài liệu này dùng được đến đâu' : 'What this document supports'}</strong>
        <p>{limits}</p>
      </aside>

      <footer className="doc-footer">
        <span>SAT365 · GITA</span>
        <span>{title}</span>
        <span>{date}</span>
      </footer>
    </article>
  );
}
