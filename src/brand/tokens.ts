/**
 * The GITA brand palette, taken from the mark.
 *
 * Three colours carry the identity: two blues and a red, arranged as an orbit
 * with a rising arc of stars. They are declared here as data rather than as raw
 * hex in a stylesheet so that the same values reach the SVG mark, the print
 * sheet, and the documentation page without drifting apart — a brand that
 * exists in three places with three slightly different blues is not a brand.
 *
 * ## Contrast, and why the brand blue is not the interface blue
 *
 * The mark's blue is `#1F5FAC`. Against white that is 5.8:1, which clears AA
 * for text. Its lighter companion `#4A90D9` is 3.0:1 — fine for a shape, not
 * for a word — and the red `#E1252B` is 4.3:1, which fails AA for body text by
 * a small margin that matters.
 *
 * So the rule this file encodes: **the brand colours are for marks and rules,
 * never for running text.** Text keeps the interface tokens, which were chosen
 * for contrast first. Where a brand colour must carry a word — a document
 * masthead, a pillar label — the deepened variants below are used instead, and
 * those clear AA against both paper and dark ground.
 *
 * That separation is not a compromise. A document identity that quietly drops
 * body text to 4.3:1 is a document a portion of its readers cannot read, and
 * no amount of brand consistency is worth that.
 */

export interface BrandColour {
  /** The value as it appears in the mark. */
  hex: string;
  /** A deepened variant that clears AA for text on paper. */
  onPaper: string;
  /** A lightened variant that clears AA for text on a dark ground. */
  onDark: string;
  name: string;
  nameVi: string;
}

export const BRAND: Record<'blue' | 'sky' | 'red' | 'ink', BrandColour> = {
  blue: {
    hex: '#1f5fac',
    onPaper: '#1a5197',
    onDark: '#7fb2e8',
    name: 'GITA blue',
    nameVi: 'Xanh GITA',
  },
  sky: {
    hex: '#4a90d9',
    onPaper: '#2f6ba8',
    onDark: '#9ecbf2',
    name: 'Orbit blue',
    nameVi: 'Xanh quỹ đạo',
  },
  red: {
    hex: '#e1252b',
    onPaper: '#c01c22',
    onDark: '#ff8a8e',
    name: 'Signal red',
    nameVi: 'Đỏ tín hiệu',
  },
  ink: {
    hex: '#14192b',
    onPaper: '#14192b',
    onDark: '#eef1f7',
    name: 'Ink',
    nameVi: 'Mực',
  },
};

/**
 * The four pillars, given a colour each.
 *
 * The mark contains four elements — two blue arcs, a red arc, and the rising
 * stars — and the training model has four pillars. Pairing them is not
 * decoration: a document that carries a pillar colour tells a reader which part
 * of the model it serves before they have read a word of it, and a learner who
 * sees the same colour on a habit card, a lesson sheet, and a coaching note
 * learns that those three things belong to one another.
 *
 * Every value here is the paper-safe variant, because these labels carry text.
 */
export const PILLAR_COLOUR: Record<'goal' | 'inspirits' | 'talent' | 'action', string> = {
  /** Goal — the outer arc: the destination the whole orbit is drawn around. */
  goal: BRAND.blue.onPaper,
  /** Inspirits — the red arc: the drive that cuts across the others. */
  inspirits: BRAND.red.onPaper,
  /** Talent — the rising stars: what is already there, waiting to be seen. */
  talent: BRAND.sky.onPaper,
  /** Action — the inner arc: the daily path, closest to the centre. */
  action: '#0f6a5a',
};

/** Type scale for printed documents, in points, as a document designer states it. */
export const PRINT_SCALE = {
  masthead: 18,
  title: 16,
  heading: 12,
  body: 10.5,
  caption: 8.5,
  footer: 7.5,
} as const;
