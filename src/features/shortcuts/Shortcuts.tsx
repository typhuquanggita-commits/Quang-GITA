/**
 * The keyboard shortcuts sheet.
 *
 * Reachable from Settings and from the ? key anywhere outside a running exam.
 *
 * The limits are given the same weight as the shortcuts themselves. Every one
 * of them is a case where a reasonable person presses a key, gets nothing, and
 * concludes the feature is broken — so they are on the sheet, not in the docs.
 */

import React from 'react';
import { useLocale } from '../../i18n/index.ts';
import { Card } from '../../components/ui/primitives.tsx';
import { IconAlert } from '../../components/ui/icons.tsx';
import { SHORTCUT_GROUPS, SHORTCUT_LIMITS } from './shortcuts.ts';

function Keys({ keys, joiner }: { keys: string[]; joiner: string }): React.ReactElement {
  return (
    <span className="shortcut-keys">
      {keys.map((key, i) => (
        <React.Fragment key={key}>
          {i > 0 && <span className="shortcut-joiner">{joiner}</span>}
          <kbd className="kbd">{key}</kbd>
        </React.Fragment>
      ))}
    </span>
  );
}

export function Shortcuts(): React.ReactElement {
  const vi = useLocale() === 'vi';

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <h1 className="page-title">{vi ? 'Bảng phím tắt' : 'Keyboard shortcuts'}</h1>
        <p className="page-sub">
          {vi
            ? 'Toàn bộ ứng dụng dùng được bằng bàn phím. Bảng này liệt kê những phím tắt có thật, kèm cả những trường hợp chúng cố ý không chạy.'
            : 'The whole application can be driven from the keyboard. This sheet lists the shortcuts that exist, and the cases where they deliberately do nothing.'}
        </p>
      </header>

      {SHORTCUT_GROUPS.map((group) => (
        <Card key={group.id} title={vi ? group.titleVi : group.title} subtitle={vi ? group.whereVi : group.where}>
          <table className="shortcut-table">
            <caption className="sr-only">{vi ? group.titleVi : group.title}</caption>
            <thead>
              <tr>
                <th scope="col">{vi ? 'Phím' : 'Keys'}</th>
                <th scope="col">{vi ? 'Tác dụng' : 'Does'}</th>
              </tr>
            </thead>
            <tbody>
              {group.shortcuts.map((shortcut) => (
                <tr key={shortcut.label}>
                  <td>
                    <Keys
                      keys={shortcut.keys}
                      // A–D are alternatives; Shift+Tab is a combination. The
                      // separator has to say which, or the row is ambiguous.
                      joiner={shortcut.keys.length > 2 || shortcut.keys.includes('←') ? (vi ? 'hoặc' : 'or') : '+'}
                    />
                  </td>
                  <td>{vi ? shortcut.labelVi : shortcut.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ))}

      <Card title={vi ? 'Những gì phím tắt cố ý không làm' : 'What the shortcuts deliberately do not do'}>
        <ul className="stack gap-3 shortcut-limits">
          {SHORTCUT_LIMITS.map((limit) => (
            <li key={limit.en} className="row gap-3">
              <IconAlert size={16} />
              <span>{vi ? limit.vi : limit.en}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
