import { SECTION3_OPTIONS, SECTION_BY_ID } from '../config';
import { SCIENCE_PICK } from '../types';
import type { ScienceTopicSubject, Section3Choice } from '../types';
import { questionsPerSubject, subjectsOf } from '../lib/section3';
import { Badge, Segmented } from './ui/primitives';

/**
 * BO CHON PHAN 3
 *
 * Dang thuc chinh thuc cho phep hai duong: Khoa hoc — chon DUNG BA trong nam
 * chu de — hoac Tieng Anh cho ca phan. Man hinh cai dat va bai dinh vi deu
 * dung chung bo chon nay, vi hai noi ma cho chon khac nhau thi nguoi hoc se
 * luyen mot dang va thi mot dang khac.
 *
 * Rang buoc "dung ba" duoc cai vao thao tac chu khong chi nhac bang chu: khi
 * da du ba, cac o con lai bi khoa, va bo mot o thi cac o kia mo lai. Nguoi hoc
 * khong bao gio ket thuc o mot trang thai khong hop le.
 */
export function Section3Picker({
  value,
  onChange,
}: {
  value: Section3Choice;
  onChange: (next: Section3Choice) => void;
}) {
  const picked = value.mode === 'science' ? value.subjects : [];
  const full = picked.length >= SCIENCE_PICK;
  const perSubject = questionsPerSubject(SECTION_BY_ID.science.questionCount);

  function toggle(subject: ScienceTopicSubject) {
    if (value.mode !== 'science') return;
    const has = picked.includes(subject);
    if (!has && full) return;
    onChange({
      mode: 'science',
      subjects: has ? picked.filter((s) => s !== subject) : [...picked, subject],
    });
  }

  return (
    <div className="space-y-4">
      <Segmented
        label="Đường thi phần 3"
        value={value.mode}
        onChange={(mode) =>
          onChange(mode === 'english' ? { mode: 'english' } : { mode: 'science', subjects: [] })
        }
        options={[
          { value: 'science', label: `Khoa học (${SCIENCE_PICK} chủ đề)` },
          { value: 'english', label: 'Tiếng Anh' },
        ]}
      />

      {value.mode === 'science' ? (
        <>
          <p className="text-sm text-fg-muted">
            Chọn đúng <strong className="text-fg">{SCIENCE_PICK} trong 5</strong> chủ đề. Mỗi chủ đề{' '}
            {perSubject[perSubject.length - 1]}–{perSubject[0]} câu, gồm cả câu trắc nghiệm và câu điền đáp án.
            Đã chọn{' '}
            <strong className={full ? 'text-ok' : 'text-fg'}>
              {picked.length}/{SCIENCE_PICK}
            </strong>
            .
          </p>

          <fieldset className="grid gap-2 sm:grid-cols-2">
            <legend className="sr-only">Chủ đề khoa học của phần 3</legend>
            {SECTION3_OPTIONS.filter((o) => o.id !== 'english').map((option) => {
              const subject = option.id as ScienceTopicSubject;
              const checked = picked.includes(subject);
              const locked = !checked && full;
              return (
                <label
                  key={option.id}
                  className={[
                    'flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition',
                    checked ? 'border-brand-line bg-brand-soft' : 'border-line bg-surface',
                    locked ? 'cursor-not-allowed opacity-55' : 'hover:border-brand-line',
                  ].join(' ')}
                >
                  <input
                    type="checkbox"
                    className="mt-0.5 size-4 accent-brand"
                    checked={checked}
                    disabled={locked}
                    onChange={() => toggle(subject)}
                  />
                  <span>
                    <span className="font-medium text-fg">{option.name}</span>
                    <span className="mt-0.5 block text-xs text-fg-muted">{option.note}</span>
                  </span>
                </label>
              );
            })}
          </fieldset>

          {!full ? (
            <Badge tone="warn">Còn thiếu {SCIENCE_PICK - picked.length} chủ đề</Badge>
          ) : null}
        </>
      ) : (
        <p className="text-sm text-fg-muted">
          Chọn Tiếng Anh nghĩa là cả phần 3 là bài Tiếng Anh — ngữ pháp, từ vựng và đọc hiểu — thay cho ba chủ đề
          khoa học. Trường bạn xét tuyển có thể yêu cầu đường thi cụ thể, nên hãy đối chiếu trước khi chốt.
        </p>
      )}
    </div>
  );
}

/** Lua chon da du dieu kien de bat dau chua. */
export function isSection3Complete(value: Section3Choice): boolean {
  return value.mode === 'english' || subjectsOf(value).length === SCIENCE_PICK;
}
