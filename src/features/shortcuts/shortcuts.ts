/**
 * Keyboard shortcuts — the catalogue, and the bindings themselves.
 *
 * A shortcuts sheet is only worth showing if it is true, and a sheet
 * maintained separately from the handlers stops being true the first time a
 * key is renamed. So the bindings live here, the exam player imports them
 * rather than writing its own key strings, and a test in
 * `tests/shortcuts.test.ts` fails if the catalogue and the bindings drift
 * apart.
 *
 * The limits are part of the catalogue rather than a footnote in the docs. A
 * learner who presses F during an exam and nothing happens deserves to read,
 * on the same sheet, that shortcuts do not fire while the cursor is in an
 * answer field.
 */

/** The exam player's bindings. The player reads these; nothing else defines them. */
export const EXAM_BINDING = {
  next: 'ArrowRight',
  previous: 'ArrowLeft',
  flag: 'f',
  navigator: 'n',
  choices: ['a', 'b', 'c', 'd'],
} as const;

/** Opens this sheet from anywhere outside a running exam. */
export const HELP_KEY = '?';

export interface Shortcut {
  /** Keys as a reader would press them, already formatted for display. */
  keys: string[];
  label: string;
  labelVi: string;
  /** The single binding this row documents, when it comes from EXAM_BINDING. */
  binding?: string;
}

export interface ShortcutGroup {
  id: string;
  title: string;
  titleVi: string;
  /** Where the group applies — stated, because a shortcut that works on one screen and not another is otherwise a mystery. */
  where: string;
  whereVi: string;
  shortcuts: Shortcut[];
}

export const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    id: 'everywhere',
    title: 'Anywhere in the app',
    titleVi: 'Ở mọi màn hình',
    where: 'Available on every screen except a running exam.',
    whereVi: 'Dùng được ở mọi màn hình, trừ khi đang trong bài thi.',
    shortcuts: [
      { keys: ['?'], label: 'Open this shortcuts sheet', labelVi: 'Mở bảng phím tắt này' },
      { keys: ['Tab'], label: 'Move to the next control', labelVi: 'Chuyển tới điều khiển kế tiếp' },
      { keys: ['Shift', 'Tab'], label: 'Move to the previous control', labelVi: 'Quay lại điều khiển trước' },
      { keys: ['Enter'], label: 'Activate the focused control', labelVi: 'Kích hoạt điều khiển đang chọn' },
      { keys: ['Space'], label: 'Activate a focused button or checkbox', labelVi: 'Kích hoạt nút hoặc ô đánh dấu đang chọn' },
      { keys: ['Esc'], label: 'Close the open dialog', labelVi: 'Đóng hộp thoại đang mở' },
    ],
  },
  {
    id: 'navigation',
    title: 'Getting around',
    titleVi: 'Di chuyển trong ứng dụng',
    where: 'The first Tab press on any page reaches the skip link.',
    whereVi: 'Lần nhấn Tab đầu tiên ở mỗi trang sẽ tới liên kết bỏ qua điều hướng.',
    shortcuts: [
      { keys: ['Tab', 'Enter'], label: 'Skip the sidebar and jump straight to the page content', labelVi: 'Bỏ qua thanh điều hướng, nhảy thẳng vào nội dung trang' },
      { keys: ['←', '→'], label: 'Move between tabs when a tab strip has focus', labelVi: 'Chuyển giữa các thẻ khi dải thẻ đang được chọn' },
    ],
  },
  {
    id: 'exam',
    title: 'During an exam',
    titleVi: 'Trong lúc làm bài thi',
    where: 'Only while a test is in progress, and only when the cursor is not in an answer field.',
    whereVi: 'Chỉ khi đang làm bài, và chỉ khi con trỏ không nằm trong ô nhập đáp án.',
    shortcuts: [
      { keys: ['→'], label: 'Next question', labelVi: 'Câu tiếp theo', binding: EXAM_BINDING.next },
      { keys: ['←'], label: 'Previous question', labelVi: 'Câu trước', binding: EXAM_BINDING.previous },
      { keys: ['F'], label: 'Flag the current question for review', labelVi: 'Đánh dấu câu hiện tại để xem lại', binding: EXAM_BINDING.flag },
      { keys: ['N'], label: 'Open or close the question navigator', labelVi: 'Mở hoặc đóng bảng điều hướng câu hỏi', binding: EXAM_BINDING.navigator },
      { keys: ['A', 'B', 'C', 'D'], label: 'Select that answer choice', labelVi: 'Chọn phương án tương ứng', binding: EXAM_BINDING.choices.join('') },
    ],
  },
];

/**
 * What the shortcuts deliberately do not do. Stated on the sheet, because each
 * one is a case where a reasonable person would press a key and get nothing.
 */
export const SHORTCUT_LIMITS: Array<{ en: string; vi: string }> = [
  {
    en: 'Nothing fires while the cursor is in a text box, so typing "n" into a grid-in answer never opens the navigator.',
    vi: 'Không phím tắt nào chạy khi con trỏ đang ở trong ô nhập liệu, nên gõ chữ "n" vào ô điền đáp án sẽ không mở bảng điều hướng.',
  },
  {
    en: 'Nothing fires while Ctrl, Cmd, or Alt is held, so the browser keeps its own shortcuts.',
    vi: 'Không phím tắt nào chạy khi đang giữ Ctrl, Cmd hoặc Alt, để trình duyệt giữ nguyên phím tắt của nó.',
  },
  {
    en: 'The ? key does not open this sheet during an exam. Leaving the test screen mid-section is not something a keystroke should be able to do by accident.',
    vi: 'Phím ? không mở bảng này khi đang thi. Rời màn hình thi giữa chừng không phải việc một lần gõ nhầm được phép làm.',
  },
  {
    en: 'There is no shortcut that submits a module or ends a test. Those need a deliberate click and a confirmation.',
    vi: 'Không có phím tắt nào nộp phần thi hay kết thúc bài thi. Những việc đó cần một cú nhấp có chủ ý và một bước xác nhận.',
  },
];

/** Every key the catalogue claims the exam player binds. */
export function documentedExamKeys(): string[] {
  const group = SHORTCUT_GROUPS.find((g) => g.id === 'exam');
  return (group?.shortcuts ?? []).flatMap((s) => (s.binding ? [s.binding] : []));
}
