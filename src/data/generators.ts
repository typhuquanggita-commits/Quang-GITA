/**
 * Parameterised Math item generators.
 *
 * Reading and Writing items must be authored: a passage is a piece of writing,
 * and no template produces a good one. Math is different. A linear-system
 * item is a template plus a choice of coefficients, and the answer and the
 * distractors follow from the arithmetic rather than from editorial judgement.
 *
 * Each generator below therefore takes a seed and emits a complete, verified
 * item: the key is computed, the distractors encode named error modes, and a
 * self-check in tests confirms the stated answer really solves the problem.
 *
 * This keeps a full-length Math section deliverable from a bank of modest
 * authored size without ever shipping an item whose key was typed by hand.
 */

import type { Question } from '../types.ts';
import { makeRng } from '../lib/util.ts';
import { makeChoices, randInt, pick, type Generator } from './generator-kit.ts';
import { ALGEBRA_GENERATORS } from './generators-algebra.ts';
import { ADVANCED_GENERATORS } from './generators-advanced.ts';
import { DATA_GENERATORS } from './generators-data.ts';
import { GEOMETRY_GENERATORS } from './generators-geometry.ts';




const GENERATORS: Generator[] = [
  /* ---------- Linear equation in one variable ---------- */
  {
    id: 'gen_lin1_easy',
    skill: 'linear-equations-1var',
    domain: 'algebra',
    band: 'easy',
    irt: { a: 1.05, b: -0.9 },
    targetSeconds: 55,
    build({ rng }) {
      const a = randInt(rng, 2, 7);
      const b = randInt(rng, 2, 9);
      const x = randInt(rng, 2, 12);
      const c = randInt(rng, 1, a - 1 > 0 ? a - 1 : 1);
      // a(x + b) = c*x + d  =>  d = a*x + a*b - c*x
      const d = a * x + a * b - c * x;
      const key = String(x);
      const wrong = [
        String(x + b),
        String(Math.round((d / (a - c)) * 10) / 10 + 1),
        String(a * b),
      ];
      return {
        format: 'mcq',
        calculatorUseful: false,
        prompt: `If ${a}(x + ${b}) = ${c}x + ${d}, what is the value of x?`,
        ...makeChoices(rng, key, wrong, [
          'Solves for x + b rather than for x.',
          'Arithmetic slip when isolating x.',
          'Reports the product of the two constants instead of solving.',
        ]),
        explanation: `Distribute the ${a}: ${a}x + ${a * b} = ${c}x + ${d}. Subtract ${c}x from both sides: ${a - c}x + ${a * b} = ${d}. Subtract ${a * b}: ${a - c}x = ${d - a * b}. Divide by ${a - c}: x = ${x}.`,
      };
    },
  },

  /* ---------- Slope from two points ---------- */
  {
    id: 'gen_slope_easy',
    skill: 'linear-equations-2var',
    domain: 'algebra',
    band: 'easy',
    irt: { a: 1.0, b: -1.0 },
    targetSeconds: 55,
    build({ rng }) {
      const x1 = randInt(rng, -6, 3);
      const run = randInt(rng, 2, 6);
      const x2 = x1 + run;
      const slope = randInt(rng, 2, 8) * (rng() < 0.5 ? -1 : 1);
      const y1 = randInt(rng, -8, 8);
      const y2 = y1 + slope * run;
      const key = String(slope);
      const wrong = [
        String(-slope),
        String(Math.round((run / (slope * run)) * 100) / 100),
        String(y2 - y1),
      ];
      return {
        format: 'mcq',
        calculatorUseful: false,
        prompt: `A line passes through the points (${x1}, ${y1}) and (${x2}, ${y2}). What is the slope of the line?`,
        ...makeChoices(rng, key, wrong, [
          'Sign error: subtracts the coordinates in opposite orders in the numerator and denominator.',
          'Inverts the ratio, computing run over rise.',
          'Uses only the vertical change, omitting the division.',
        ]),
        explanation: `Slope is the change in y divided by the change in x: (${y2} − ${y1}) / (${x2} − ${x1}) = ${y2 - y1} / ${run} = ${slope}. The order matters only in that it must be consistent — subtracting both coordinates in the same direction. Reversing one but not the other flips the sign, which is the most common slip here.`,
      };
    },
  },

  /* ---------- Systems of two linear equations ---------- */
  {
    id: 'gen_system_med',
    skill: 'linear-systems',
    domain: 'algebra',
    band: 'medium',
    irt: { a: 1.15, b: 0.1 },
    targetSeconds: 80,
    build({ rng }) {
      const x = randInt(rng, 1, 9);
      const y = randInt(rng, 1, 9);
      const a1 = randInt(rng, 2, 5);
      const b1 = randInt(rng, 2, 5);
      const a2 = randInt(rng, 1, 4);
      const b2 = randInt(rng, 1, 4);
      // Ensure the system is independent.
      if (a1 * b2 === a2 * b1) return GENERATORS[2].build({ rng, index: 0 });
      const c1 = a1 * x + b1 * y;
      const c2 = a2 * x + b2 * y;
      const key = String(x + y);
      const wrong = [String(x), String(y), String(x * y)];
      return {
        format: 'mcq',
        calculatorUseful: true,
        prompt: `If ${a1}x + ${b1}y = ${c1} and ${a2}x + ${b2}y = ${c2}, what is the value of x + y?`,
        ...makeChoices(rng, key, wrong, [
          'Reports x alone rather than the requested sum.',
          'Reports y alone rather than the requested sum.',
          'Multiplies the two values instead of adding them.',
        ]),
        explanation: `Solving the system gives x = ${x} and y = ${y}. Check: ${a1}(${x}) + ${b1}(${y}) = ${c1} and ${a2}(${x}) + ${b2}(${y}) = ${c2}. The requested sum is x + y = ${x + y}.`,
      };
    },
  },

  /* ---------- Quadratic: sum and product of roots ---------- */
  {
    id: 'gen_quad_roots_med',
    skill: 'nonlinear-equations',
    domain: 'advanced-math',
    band: 'medium',
    irt: { a: 1.2, b: 0.3 },
    targetSeconds: 80,
    build({ rng }) {
      const r1 = randInt(rng, 1, 9);
      const r2 = randInt(rng, 1, 9);
      const b = -(r1 + r2);
      const c = r1 * r2;
      const askSum = rng() < 0.5;
      const key = String(askSum ? r1 + r2 : r1 * r2);
      const wrong = askSum
        ? [String(r1 * r2), String(b), String(Math.abs(r1 - r2))]
        : [String(r1 + r2), String(-c), String(Math.abs(r1 - r2))];
      const sign = b < 0 ? '−' : '+';
      return {
        format: 'mcq',
        calculatorUseful: true,
        prompt: `What is the ${askSum ? 'sum' : 'product'} of the solutions to x² ${sign} ${Math.abs(b)}x + ${c} = 0?`,
        ...makeChoices(rng, key, wrong, [
          askSum ? 'Gives the product of the roots rather than the sum.' : 'Gives the sum of the roots rather than the product.',
          'Uses b directly instead of −b/a.',
          'Gives the difference of the roots.',
        ]),
        explanation: `The equation factors as (x − ${r1})(x − ${r2}) = 0, so the solutions are ${r1} and ${r2}. Their ${askSum ? 'sum' : 'product'} is ${askSum ? r1 + r2 : r1 * r2}. This matches the general result that the sum of the roots is −b/a and the product is c/a.`,
      };
    },
  },

  /* ---------- Percent change ---------- */
  {
    id: 'gen_percent_med',
    skill: 'percentages',
    domain: 'problem-solving-data',
    band: 'medium',
    irt: { a: 1.15, b: 0.05 },
    targetSeconds: 75,
    build({ rng }) {
      const base = randInt(rng, 4, 30) * 100;
      const rise = pick(rng, [10, 15, 20, 25, 40, 50]);
      const after = Math.round(base * (1 + rise / 100));
      const key = String(base);
      const wrong = [
        String(Math.round(after * (1 - rise / 100))),
        String(after - rise),
        String(Math.round(after / (rise / 100))),
      ];
      return {
        format: 'mcq',
        calculatorUseful: true,
        prompt: `After an increase of ${rise}%, a quantity is ${after.toLocaleString('en-US')}. What was the quantity before the increase?`,
        ...makeChoices(rng, key, wrong, [
          'Takes the same percentage off the new value, using the wrong base for the percentage.',
          'Subtracts the percentage as though it were an absolute amount.',
          'Divides by the rate rather than by one plus the rate.',
        ]),
        explanation: `The new value is ${1 + rise / 100} times the old one, so the old value is ${after.toLocaleString('en-US')} ÷ ${1 + rise / 100} = ${base.toLocaleString('en-US')}. The base of a percent increase is always the original value, not the new one.`,
      };
    },
  },

  /* ---------- Rate and unit conversion ---------- */
  {
    id: 'gen_rate_easy',
    skill: 'ratios-rates-units',
    domain: 'problem-solving-data',
    band: 'easy',
    irt: { a: 1.0, b: -0.8 },
    targetSeconds: 65,
    build({ rng }) {
      const perMinute = randInt(rng, 12, 90);
      const minutes = pick(rng, [45, 90, 120, 150, 180]);
      const hours = minutes / 60;
      const total = perMinute * minutes;
      const key = total.toLocaleString('en-US');
      const wrong = [
        (perMinute * hours).toLocaleString('en-US'),
        (perMinute * 60).toLocaleString('en-US'),
        Math.round(total / 2).toLocaleString('en-US'),
      ];
      return {
        format: 'mcq',
        calculatorUseful: true,
        prompt: `A machine produces ${perMinute} units per minute. How many units does it produce in ${hours} hours?`,
        ...makeChoices(rng, key, wrong, [
          'Multiplies the per-minute rate by the number of hours without converting to minutes.',
          'Computes the output for one hour only.',
          'Halves the correct total.',
        ]),
        explanation: `Convert before applying the rate: ${hours} hours is ${hours} × 60 = ${minutes} minutes, and ${perMinute} × ${minutes} = ${total.toLocaleString('en-US')} units. Writing the conversion as a fraction makes it check itself — the minutes cancel and units remain, which is the signal that the setup is right before any arithmetic happens.`,
      };
    },
  },

  /* ---------- Right triangle: Pythagorean triple ---------- */
  {
    id: 'gen_pyth_med',
    skill: 'right-triangles-trig',
    domain: 'geometry-trigonometry',
    band: 'medium',
    irt: { a: 1.15, b: 0.0 },
    targetSeconds: 75,
    build({ rng }) {
      const triples: Array<[number, number, number]> = [
        [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 40, 41], [20, 21, 29],
      ];
      const [a, b, c] = pick(rng, triples);
      const scale = pick(rng, [1, 2, 3, 4, 5, 6, 7, 8]);
      const [A, B, C] = [a * scale, b * scale, c * scale];
      const key = String(C);
      const wrong = [String(A + B), String(Math.round(Math.sqrt(B * B - A * A))), String(C + scale)];
      return {
        format: 'mcq',
        calculatorUseful: true,
        prompt: `A right triangle has legs of length ${A} and ${B}. What is the length of the hypotenuse?`,
        ...makeChoices(rng, key, wrong, [
          'Adds the legs instead of applying the Pythagorean theorem.',
          'Subtracts the squares rather than adding them.',
          'Off-by-one arithmetic slip on the square root.',
        ]),
        explanation: `By the Pythagorean theorem, the hypotenuse is √(${A}² + ${B}²) = √(${A * A} + ${B * B}) = √${A * A + B * B} = ${C}.`,
      };
    },
  },

  /* ---------- Exponential growth ---------- */
  {
    id: 'gen_exponential_hard',
    skill: 'nonlinear-functions',
    domain: 'advanced-math',
    band: 'hard',
    irt: { a: 1.3, b: 1.1 },
    targetSeconds: 90,
    build({ rng }) {
      const initial = randInt(rng, 2, 15) * 100;
      const period = pick(rng, [3, 4, 5, 6, 8]);
      const factor = pick(rng, [2, 3]);
      const key = `N(t) = ${initial}(${factor})^(t/${period})`;
      const wrong = [
        `N(t) = ${initial}(${factor})^(${period}t)`,
        `N(t) = ${initial}(${factor * factor})^(t/${period})`,
        `N(t) = ${initial} + ${factor}t/${period}`,
      ];
      const verb = factor === 2 ? 'doubles' : 'triples';
      return {
        format: 'mcq',
        calculatorUseful: true,
        prompt: `A population ${verb} every ${period} hours. If it starts at ${initial}, which function gives the population after t hours?`,
        ...makeChoices(rng, key, wrong, [
          `Multiplies by ${factor} ${period} times per hour rather than once per ${period} hours.`,
          'Uses the wrong growth factor for the stated period.',
          'Models linear rather than exponential growth.',
        ]),
        explanation: `The population multiplies by ${factor} once per ${period}-hour period, and t hours contain t/${period} such periods. Checking t = ${period} gives ${initial}(${factor})¹ = ${initial * factor}, the correct ${verb.slice(0, -1)}ing.`,
      };
    },
  },

  /* ---------- Circle: area and circumference ---------- */
  {
    id: 'gen_circle_easy',
    skill: 'circles',
    domain: 'geometry-trigonometry',
    band: 'easy',
    irt: { a: 1.0, b: -0.75 },
    targetSeconds: 60,
    build({ rng }) {
      const r = randInt(rng, 2, 12);
      const askArea = rng() < 0.5;
      const key = askArea ? `${r * r}π` : `${2 * r}π`;
      const wrong = askArea
        ? [`${2 * r}π`, `${r}π`, `${2 * r * r}π`]
        : [`${r * r}π`, `${r}π`, `${4 * r}π`];
      return {
        format: 'mcq',
        calculatorUseful: false,
        prompt: `A circle has a radius of ${r}. What is its ${askArea ? 'area' : 'circumference'}?`,
        ...makeChoices(rng, key, wrong, [
          askArea
            ? 'Applied the circumference formula 2πr, which measures a length rather than a region.'
            : 'Applied the area formula πr², which measures a region rather than a length.',
          'Dropped the squaring, or the factor of 2, from the formula.',
          'Doubled the correct result, usually by applying the factor of 2 twice.',
        ]),
        explanation: askArea
          ? `Area = πr² = π(${r})² = ${r * r}π. Both formulas are on the reference sheet, so the work here is choosing between them rather than recalling them: area is a region and comes out in square units, circumference is a distance around the edge.`
          : `Circumference = 2πr = 2π(${r}) = ${2 * r}π. Both formulas are on the reference sheet, so the work here is choosing between them rather than recalling them: circumference is a distance around the edge, area is the region enclosed.`,
      };
    },
  },

  /* ---------- Mean of a data set (SPR) ---------- */
  {
    id: 'gen_mean_med',
    skill: 'one-variable-data',
    domain: 'problem-solving-data',
    band: 'medium',
    irt: { a: 1.1, b: -0.15 },
    targetSeconds: 75,
    build({ rng }) {
      const n = randInt(rng, 5, 7);
      const target = randInt(rng, 8, 40);
      const values: number[] = [];
      let running = 0;
      for (let i = 0; i < n - 1; i += 1) {
        const v = target + randInt(rng, -6, 6);
        values.push(v);
        running += v;
      }
      const last = target * n - running;
      values.push(last);
      return {
        format: 'spr',
        calculatorUseful: true,
        prompt: `The mean of the ${n} values below is ${target}. What is the value of k?\n\n${values
          .slice(0, n - 1)
          .join(', ')}, k`,
        answer: [String(last)],
        explanation: `The ${n} values must total ${target} × ${n} = ${target * n}. The listed values sum to ${running}, so k = ${target * n} − ${running} = ${last}.`,
      };
    },
  },

  /* ---------- Linear inequality with a constraint ---------- */
  {
    id: 'gen_inequality_med',
    skill: 'linear-inequalities',
    domain: 'algebra',
    band: 'medium',
    irt: { a: 1.15, b: 0.15 },
    targetSeconds: 75,
    build({ rng }) {
      const unitA = randInt(rng, 15, 60);
      const unitB = randInt(rng, 60, 160);
      const countB = randInt(rng, 2, 6);
      const maxCrates = randInt(rng, 6, 20);
      const capacity = unitB * countB + unitA * maxCrates;
      const key = String(maxCrates);
      const wrong = [String(maxCrates - 1), String(maxCrates + 1), String(Math.floor(capacity / unitA))];
      return {
        format: 'mcq',
        calculatorUseful: true,
        prompt: `A van can carry at most ${capacity.toLocaleString('en-US')} kilograms. It is loaded with ${countB} pallets weighing ${unitB} kilograms each, along with crates weighing ${unitA} kilograms each. What is the greatest number of crates it can carry?`,
        ...makeChoices(rng, key, wrong, [
          'Treats the limit as strict when the load exactly reaches it.',
          'Exceeds the weight limit by one crate.',
          'Ignores the weight of the pallets.',
        ]),
        explanation: `The ${countB} pallets weigh ${countB} × ${unitB} = ${(countB * unitB).toLocaleString('en-US')} kg, leaving ${(capacity - countB * unitB).toLocaleString('en-US')} kg. Dividing by ${unitA} kg per crate gives ${maxCrates} crates.`,
      };
    },
  },

  /* ---------- Probability from a two-way table ---------- */
  {
    id: 'gen_probability_med',
    skill: 'probability',
    domain: 'problem-solving-data',
    band: 'medium',
    irt: { a: 1.2, b: 0.3 },
    targetSeconds: 85,
    build({ rng }) {
      const a = randInt(rng, 20, 70); // group 1, yes
      const b = randInt(rng, 20, 70); // group 1, no
      const c = randInt(rng, 20, 70); // group 2, yes
      const d = randInt(rng, 20, 70); // group 2, no
      const yesTotal = a + c;
      const total = a + b + c + d;
      const key = `${a}/${yesTotal}`;
      const wrong = [`${a}/${total}`, `${a}/${a + b}`, `${yesTotal}/${total}`];
      return {
        format: 'mcq',
        calculatorUseful: true,
        stimulus: {
          text: 'A survey asked respondents in two age groups whether they had used a public library in the past year.',
          table: {
            headers: ['', 'Used library', 'Did not use', 'Total'],
            rows: [
              ['Under 40', String(a), String(b), String(a + b)],
              ['40 or older', String(c), String(d), String(c + d)],
              ['Total', String(yesTotal), String(b + d), String(total)],
            ],
          },
        },
        prompt:
          'If one respondent is selected at random from those who used a library, what is the probability that the respondent is under 40?',
        ...makeChoices(rng, key, wrong, [
          'Uses the whole sample as the denominator, ignoring the conditioning on library use.',
          'Conditions on age group instead of on library use.',
          'Gives the unconditional probability of having used a library.',
        ]),
        explanation: `The selection is restricted to the ${yesTotal} respondents who used a library, so that is the denominator. Of those, ${a} are under 40, giving ${a}/${yesTotal}.`,
      };
    },
  },
];

/* ------------------------------------------------------------------ */
/* The full catalogue                                                  */
/*                                                                     */
/* Split by domain so each file stays readable; composed here so there  */
/* is exactly one list the emitter walks. A generator appearing in two  */
/* lists would emit its items twice under two sets of ids.              */
/* ------------------------------------------------------------------ */

export const ALL_GENERATORS: Generator[] = [
  ...GENERATORS,
  ...ALGEBRA_GENERATORS,
  ...ADVANCED_GENERATORS,
  ...DATA_GENERATORS,
  ...GEOMETRY_GENERATORS,
];

/**
 * Why a generated item can still be invalid.
 *
 * A distractor is computed from an error mode, so for some parameter draws it
 * coincides with the key or with another distractor — two identical options,
 * or worse, two correct ones. Rather than hand-tuning every template to make
 * that impossible, each draw is validated and rejected draws are re-rolled
 * with the next seed. An item only reaches the bank if it passes.
 */
/**
 * Canonical form of a choice, for detecting options that differ only in how a
 * number was formatted.
 *
 * "2.00π" and "2.0π" are the same option wearing two costumes, and a
 * text-equality check waves both through — which is how an item shipped with
 * two identical distractors and, effectively, a one-in-three guess. Every
 * numeric token is normalised to its value so the comparison is on meaning.
 */
function canonicalChoice(text: string): string {
  return text
    .trim()
    .replace(/\u2212/g, '-')
    .replace(/-?\d+(?:\.\d+)?/g, (n) => String(Number(n)))
    .replace(/\s+/g, ' ');
}

export function validateGenerated(item: Question): string | null {
  if (item.format === 'mcq') {
    if (!item.choices || item.choices.length !== 4) return 'expected exactly four choices';
    const texts = item.choices.map((c) => c.text.trim());
    if (texts.some((t) => t === '')) return 'empty choice text';
    if (new Set(texts).size !== texts.length) return 'duplicate choice text';
    const canonical = texts.map(canonicalChoice);
    if (new Set(canonical).size !== canonical.length) {
      return 'two choices are the same value formatted differently';
    }
    if (!item.choices.some((c) => c.id === item.answer)) return 'key not among choices';
  } else {
    const answers = Array.isArray(item.answer) ? item.answer : [item.answer];
    if (answers.length === 0 || answers.some((a) => !a || !Number.isFinite(Number(a)))) {
      return 'student-produced response needs a finite numeric key';
    }
  }
  if (!item.prompt.trim()) return 'missing prompt';
  if (item.explanation.trim().length < 20) return 'explanation too short to be useful';
  return null;
}

const MAX_REROLLS = 60;

/** Half-width of the difficulty spread applied within one template's band. */
const BAND_SPREAD = 0.32;

/**
 * Emits `perGenerator` items from every template, with ids and content fully
 * determined by `seed` so the bank is identical on every device and reload.
 * A template that cannot produce a valid item within `MAX_REROLLS` draws is
 * skipped rather than allowed to ship something broken.
 */
export function generateMathItems(seed = 20260801, perGenerator = 30): Question[] {
  const out: Question[] = [];

  ALL_GENERATORS.forEach((generator, gi) => {
    /*
     * Two instances of one template can draw the same parameters and ship as
     * two items that are one item — a learner meeting both in a revision sheet
     * has been given a shorter sheet than they were promised, and the second
     * answer is a memory test. So each template tracks what it has already
     * produced and re-rolls on a collision.
     *
     * A template whose parameter space is smaller than `perGenerator` cannot
     * satisfy the request at all. It stops early rather than padding, and
     * `check:bank` reports the shortfall so the template can be widened
     * deliberately instead of silently producing near-duplicates.
     */
    const emitted = new Set<string>();

    for (let i = 0; i < perGenerator; i += 1) {
      let placed = false;
      for (let attempt = 0; attempt < MAX_REROLLS; attempt += 1) {
        const rng = makeRng(seed + gi * 9973 + i * 131 + attempt * 7717);
        const candidate = {
          id: `${generator.id}_${i}`,
          section: 'math',
          domain: generator.domain,
          skill: generator.skill,
          band: generator.band,
          irt: {
            // Spread difficulty slightly within the template so a module drawn
            // entirely from generated items is not artificially flat.
            a: generator.irt.a,
            /*
             * Spread difficulty within the template so a module drawn entirely
             * from generated items is not artificially flat — but bounded, so a
             * template emitting ten items does not push its extremes out of the
             * band it is labelled with.
             */
            b:
              generator.irt.b +
              (perGenerator > 1
                ? ((i - (perGenerator - 1) / 2) / ((perGenerator - 1) / 2)) * BAND_SPREAD
                : 0),
          },
          targetSeconds: generator.targetSeconds,
          provenance: { author: 'SAT365 generator', reviewed: true, added: '2026-08-01' },
          ...generator.build({ rng, index: i }),
        } as Question;

        if (validateGenerated(candidate) !== null) continue;

        /*
         * Sorted, because makeChoices shuffles. Two draws that produce the
         * same question with its options in a different order are the same
         * question, and a key that respected the order would wave them
         * through — inflating the bank with items that are one item.
         */
        const shape = `${candidate.prompt}|${(candidate.choices ?? [])
          .map((c) => c.text)
          .slice()
          .sort()
          .join('|')}`;
        if (emitted.has(shape)) continue;

        emitted.add(shape);
        out.push(candidate);
        placed = true;
        break;
      }

      // The parameter space is exhausted; further draws would only repeat.
      if (!placed) break;
    }
  });

  return out;
}

/**
 * How many distinct items each template can actually produce at a given
 * request size, so a thin template is visible rather than merely quiet.
 */
export function generatorYield(seed?: number, perGenerator?: number): Array<{ id: string; emitted: number; requested: number }> {
  const items = generateMathItems(seed, perGenerator);
  const requested = perGenerator ?? 10;
  return ALL_GENERATORS.map((generator) => ({
    id: generator.id,
    emitted: items.filter((q) => q.id.startsWith(`${generator.id}_`)).length,
    requested,
  }));
}

export const GENERATOR_COUNT = ALL_GENERATORS.length;

export type { GenContext, Generator } from './generator-kit.ts';
export { makeChoices, randInt, pick } from './generator-kit.ts';
