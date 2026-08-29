/**
 * The published papers, listed.
 *
 * Each card says what the paper is *for* rather than only what it contains,
 * because the commonest misuse of a practice paper is sitting the right one at
 * the wrong time — a rehearsal paper taken in week one measures nothing anyone
 * needed to know, and a baseline paper re-sat a fortnight later measures
 * memory.
 */

import React from 'react';
import { PAPERS } from '../../data/papers.ts';
import { sectionLabel } from '../../data/blueprint.ts';
import { useLocale } from '../../i18n/index.ts';
import { Badge, Card } from '../../components/ui/primitives.tsx';
import { IconAlert } from '../../components/ui/icons.tsx';
import { formatDate } from '../../lib/util.ts';
import type { Route } from '../shell/routes.ts';

export function PaperLibrary({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <h1 className="page-title">{vi ? 'Bộ đề công bố' : 'Published papers'}</h1>
        <p className="page-sub">
          {vi
            ? 'Đề cố định, in được, chấm tay được — kèm lời giải đầy đủ và barem quy đổi riêng cho từng đề.'
            : 'Fixed papers that can be printed, sat away from a screen, and marked by a person — each with full solutions and its own conversion table.'}
        </p>
      </header>

      {/*
        The distinction between these and the adaptive tests, stated where
        someone choosing between them will read it.
      */}
      <div className="escalation" data-severity="info">
        <IconAlert size={20} />
        <div>
          <strong>{vi ? 'Khác gì với bài thi thử trên máy' : 'How these differ from the on-screen tests'}</strong>
          <p>
            {vi
              ? 'Bài thi trên máy là thích ứng: phần hai được chọn theo kết quả phần một, nên đo chính xác hơn và không in ra được — không có "phần hai" duy nhất để in, cũng không có bảng quy đổi duy nhất. Đề công bố là tuyến tính: mọi thí sinh nhận cùng một bộ câu. Đổi lại một chút độ chính xác, ta được một tờ đề thật.'
              : 'The on-screen tests are adaptive: the second module is chosen from your first-module performance, which measures more precisely and cannot be printed — there is no single second module to print and no single conversion table. A published paper is linear: every candidate receives the same items. It trades a little precision for being a real sheet of paper.'}
          </p>
        </div>
      </div>

      <ul className="lesson-list">
        {PAPERS.map((paper) => (
          <li key={paper.id}>
            <button
              type="button"
              className="lesson-row"
              onClick={() => navigate({ name: 'paper', paperId: paper.id })}
            >
              <span className="lesson-row-main">
                <span className="lesson-row-title">{vi ? paper.nameVi : paper.name}</span>
                <span className="lesson-row-idea">{vi ? paper.purposeVi : paper.purpose}</span>
              </span>
              <span className="lesson-row-meta">
                <Badge tone={paper.scope === 'full' ? 'primary' : paper.scope === 'rw' ? 'rw' : 'math'}>
                  {paper.scope === 'full'
                    ? vi
                      ? 'Trọn vẹn'
                      : 'Full length'
                    : sectionLabel(paper.scope, locale)}
                </Badge>
                <span className="lesson-unread">{formatDate(paper.published, locale)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Card title={vi ? 'Mỗi đề gồm bốn tài liệu' : 'Each paper is four documents'}>
        <ol className="lesson-method">
          <li>
            <strong>{vi ? 'Đề thi' : 'The question paper'}</strong> —{' '}
            {vi ? 'phát cho thí sinh.' : 'handed to the candidate.'}
          </li>
          <li>
            <strong>{vi ? 'Lời giải' : 'The solutions'}</strong> —{' '}
            {vi
              ? 'đáp án, lời giải, và vì sao từng phương án nhiễu hấp dẫn. Phát sau khi thu bài.'
              : 'the key, the working, and why each distractor is tempting. Released after collection.'}
          </li>
          <li>
            <strong>{vi ? 'Barem' : 'The mark scheme'}</strong> —{' '}
            {vi
              ? 'bảng quy đổi số câu đúng sang thang 200–800, tính riêng cho đề đó.'
              : 'the raw-to-scaled table, computed for that paper alone.'}
          </li>
          <li>
            <strong>{vi ? 'Ma trận đề' : 'The specification'}</strong> —{' '}
            {vi ? 'đề gồm những gì, theo miền kiến thức và độ khó.' : 'what the paper contains, by domain and band.'}
          </li>
        </ol>
      </Card>
    </div>
  );
}
