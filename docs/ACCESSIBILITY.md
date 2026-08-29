# Accessibility

## Standard

WCAG 2.1 Level AA throughout, with a high-contrast theme targeting Level AAA.

This is not aspirational for an assessment platform. A student who cannot use
the interface is being measured on the interface rather than on the SAT, and
accommodations are a legal requirement in most jurisdictions this serves.

## Colour and contrast

Every text-on-surface pair in `src/styles/tokens.css` meets 4.5:1 for body
text and 3:1 for large text and UI boundaries. The high-contrast theme targets
7:1 throughout.

Colour is never the only channel. The question navigator distinguishes
answered from unanswered by fill *and* border style, and marks flagged
questions with a corner dot as well as a colour. Correct and incorrect answers
in review carry an icon and a state attribute, not just a background.

Highlighter colours were chosen to keep the passage text above 4.5:1 against
every highlight, in both themes.

## Themes

Four modes: light, dark, system, and high contrast. Themes are applied to the
document root, so a page never renders half-styled.

Dark mode is defined twice on purpose — once under
`@media (prefers-color-scheme: dark)` guarded by
`:root:not([data-theme='light'])`, and once under `:root[data-theme='dark']`.
That is what makes an explicit choice win in both directions rather than only
when it agrees with the system.

## Keyboard

Everything is reachable and operable by keyboard.

- A skip link precedes the navigation and becomes visible on focus.
- `:focus-visible` gives a 2px outline with a 2px offset. It is never removed.
- Modals trap Tab, move focus in on open, and restore it on close. A modal
  that must be answered — the time-up dialog — does not close on Escape.
- Tab lists respond to arrow keys with roving tabindex.
- The exam player has shortcuts: arrows to move between questions, `A`–`D` to
  select a choice, `F` to flag, `N` to open the navigator. They are suppressed
  while focus is in a text field.

## Screen readers

- The exam clock is `role="timer"` with `aria-live="off"`, because a clock
  announcing every second would make the test unusable. Its accessible name
  carries the remaining time for on-demand reading.
- Navigator cells announce their number and state: "Question 12, answered,
  marked for review".
- Every chart is `role="img"` with an `aria-label` that states what it shows
  and its values. Figures inside items are described declaratively, so a
  student using a screen reader gets the same information as one looking at
  the plot.
- Progress bars carry `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and a
  label.
- Toasts live in an `aria-live="polite"` region.
- Data tables use `<th scope="col">` and `<th scope="row">`.

## Accommodations

Extended time mirrors the College Board tiers: standard, +50% (×1.5), and
double time (×2). The multiplier applies to every timed delivery and is
carried on the attempt record, so a score report shows the conditions the test
was taken under.

Scores are reported on the standard scale regardless. Extended time changes
the conditions, not the metric.

## Reading support

- Text scale is adjustable from 85% to 140% and applies to the root font size,
  so the whole layout reflows rather than only some text growing.
- A dyslexia-friendly font option adjusts family, letter spacing, and word
  spacing together.
- Passage text is set in a serif at a generous line height, capped near 68
  characters per line.

## Motion

`prefers-reduced-motion` is respected, and there is an explicit toggle for
users whose system setting does not reflect what they want here. Both collapse
animation and transition durations to effectively zero rather than disabling
transitions outright, which would break state changes that depend on them.

## Language

The interface is fully bilingual in Vietnamese and English, key for key —
enforced by a parity check during development. The document `lang` attribute
follows the chosen locale, so a screen reader uses the right voice.

Item content is always English, because the SAT is.

## Verified

The Playwright smoke test exercises keyboard answering and flagging, theme
switching including high contrast, locale switching, and modal focus
behaviour, and asserts a clean console throughout.

## Known gaps

- No automated axe-core audit in CI. It should be added.
- The high-contrast theme has not been tested against a real screen magnifier.
- Colour choices have not been reviewed by someone with colour vision
  deficiency; the contrast ratios are computed, not experienced.
