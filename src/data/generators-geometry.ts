/**
 * Geometry and Trigonometry generators.
 *
 * Two of these four skills held two items each before this file. The band
 * ladder is built around what a learner must supply themselves: an easy item
 * hands over every dimension, a medium one requires a relationship to be
 * applied, and a hard one asks about scaling or about a figure that is
 * deliberately not drawn to scale.
 *
 * Note on the reference sheet: the SAT supplies the area and volume formulas,
 * so an item that merely tests recall of one is testing the wrong thing. These
 * items assume the formula is available and put the difficulty in choosing and
 * applying it.
 */

import { makeChoices, randInt, pick, type Generator } from './generator-kit.ts';

export const GEOMETRY_GENERATORS: Generator[] = [
  /* ================= Area and volume ================= */

  {
    id: 'gen_area_easy',
    skill: 'area-volume',
    domain: 'geometry-trigonometry',
    band: 'easy',
    irt: { a: 1.0, b: -0.85 },
    targetSeconds: 50,
    build({ rng }) {
      const w = randInt(rng, 3, 12);
      const h = randInt(rng, 4, 15);
      const key = String(w * h);
      const wrong = [String(2 * (w + h)), String(w + h), String(2 * w * h)];
      return {
        format: 'mcq',
        prompt: `A rectangle has a width of ${w} and a length of ${h}. What is its area?`,
        ...makeChoices(rng, key, wrong, [
          'Computed the perimeter rather than the area.',
          'Added the dimensions instead of multiplying them.',
          'Doubled the area, as though counting two rectangles.',
        ]),
        explanation: `Area of a rectangle is width × length = ${w} × ${h} = ${w * h}. The perimeter, ${2 * (w + h)}, answers a different question — checking whether the answer should be in square units is the fastest way to tell the two apart.`,
      };
    },
  },

  {
    id: 'gen_volume_med',
    skill: 'area-volume',
    domain: 'geometry-trigonometry',
    band: 'medium',
    irt: { a: 1.15, b: 0.2 },
    targetSeconds: 75,
    build({ rng }) {
      const l = randInt(rng, 2, 9);
      const w = randInt(rng, 2, 9);
      const h = randInt(rng, 2, 9);
      const key = String(l * w * h);
      const wrong = [
        String(2 * (l * w + l * h + w * h)),
        String(l + w + h),
        String(l * w),
      ];
      return {
        format: 'mcq',
        prompt: `A rectangular box has dimensions ${l} by ${w} by ${h}. What is its volume?`,
        ...makeChoices(rng, key, wrong, [
          'Computed the surface area, which is measured in square units rather than cubic.',
          'Added the three dimensions instead of multiplying them.',
          'Used only two of the three dimensions, computing a face rather than the solid.',
        ]),
        explanation: `Volume of a rectangular solid is length × width × height = ${l} × ${w} × ${h} = ${l * w * h}. All three dimensions must appear: a product of two gives an area, and the units say so.`,
      };
    },
  },

  {
    id: 'gen_scale_hard',
    skill: 'area-volume',
    domain: 'geometry-trigonometry',
    band: 'hard',
    irt: { a: 1.3, b: 1.15 },
    targetSeconds: 90,
    build({ rng }) {
      const k = pick(rng, [2, 3, 4, 5, 6]);
      const shape = pick(rng, ['circle', 'square', 'equilateral triangle', 'regular hexagon']);
      const dimension = shape === 'circle' ? 'radius' : shape === 'square' ? 'side length' : 'side length';
      const key = String(k * k);
      const wrong = [String(k), String(k * k * k), String(2 * k)];
      return {
        format: 'mcq',
        prompt: `The ${dimension} of a ${shape} is multiplied by ${k}. By what factor is its area multiplied?`,
        ...makeChoices(rng, key, wrong, [
          'Applied the scale factor directly. Area is two-dimensional, so it scales by the square of the factor.',
          'Applied the cube of the factor, which is how volume scales, not area.',
          'Doubled the factor instead of squaring it.',
        ]),
        explanation: `Area depends on two dimensions, so scaling any length by ${k} scales the area by ${k}² = ${k * k}. ${shape === 'circle' ? `Concretely: π(${k}r)² = ${k * k}πr².` : `Every area formula for this figure carries the length squared, so replacing s with ${k}s multiplies the result by ${k * k}.`} Volume, depending on three dimensions, would scale by ${k}³ = ${k * k * k} — which is why the distractors here are the factor, its square, and its cube.`,
      };
    },
  },

  /* ================= Lines, angles, and triangles ================= */

  {
    id: 'gen_angles_easy',
    skill: 'lines-angles-triangles',
    domain: 'geometry-trigonometry',
    band: 'easy',
    irt: { a: 1.0, b: -0.8 },
    targetSeconds: 50,
    build({ rng }) {
      const a = randInt(rng, 30, 80);
      const b = randInt(rng, 30, 80);
      const key = String(180 - a - b);
      const wrong = [String(180 - a), String(a + b), String(90 - a)];
      return {
        format: 'mcq',
        prompt: `Two angles of a triangle measure ${a}° and ${b}°. What is the measure of the third angle?`,
        ...makeChoices(rng, key, wrong, [
          'Subtracted only one of the two given angles from 180°.',
          'Added the two given angles rather than subtracting their sum from 180°.',
          'Used 90° instead of 180°, which applies to complementary angles rather than to a triangle.',
        ]),
        explanation: `The three angles of a triangle sum to 180°, so the third is 180 − ${a} − ${b} = ${180 - a - b}. Checking: ${a} + ${b} + ${180 - a - b} = 180.`,
      };
    },
  },

  {
    id: 'gen_parallel_med',
    skill: 'lines-angles-triangles',
    domain: 'geometry-trigonometry',
    band: 'medium',
    irt: { a: 1.15, b: 0.15 },
    targetSeconds: 70,
    build({ rng }) {
      const a = randInt(rng, 35, 145);
      const key = String(a);
      const wrong = [String(180 - a), String(90 - a < 0 ? 90 : 90 - a), String(360 - a)];
      return {
        format: 'mcq',
        prompt: `In the xy-plane, two parallel lines are cut by a transversal. One of the angles formed measures ${a}°. What is the measure of the angle vertical to it?`,
        ...makeChoices(rng, key, wrong, [
          'Gave the supplementary angle, which is the adjacent one along the line rather than the vertical one.',
          'Treated the pair as complementary, which applies to angles summing to 90°.',
          'Subtracted from a full turn rather than identifying the vertical pair.',
        ]),
        explanation: `Vertical angles — the pair opposite each other where two lines cross — are always equal, so the answer is ${a}°. The angle *adjacent* to it along the same line would be supplementary, 180 − ${a} = ${180 - a}°. Naming which relationship the question asks about is the whole of these items.`,
      };
    },
  },

  {
    id: 'gen_similar_hard',
    skill: 'lines-angles-triangles',
    domain: 'geometry-trigonometry',
    band: 'hard',
    irt: { a: 1.3, b: 1.2 },
    targetSeconds: 95,
    build({ rng }) {
      const k = pick(rng, [2, 3, 4]);
      const small = randInt(rng, 3, 9);
      const other = randInt(rng, 4, 11);
      const key = String(other * k);
      const wrong = [String(other + k), String(Math.round(other / k)), String(small * k)];
      return {
        format: 'mcq',
        prompt: `Triangle ABC is similar to triangle DEF, with side AB corresponding to side DE. If AB = ${small}, DE = ${small * k}, and BC = ${other}, what is the length of EF?`,
        ...makeChoices(rng, key, wrong, [
          'Added the scale factor rather than multiplying by it.',
          'Divided by the scale factor, scaling in the wrong direction — DEF is the larger triangle here.',
          'Scaled the wrong side, applying the factor to AB again instead of to BC.',
        ]),
        explanation: `Similar triangles have proportional corresponding sides. The ratio is DE / AB = ${small * k} / ${small} = ${k}. BC corresponds to EF, so EF = ${other} × ${k} = ${other * k}. Writing the correspondence down — which vertex maps to which — before writing any ratio is what prevents scaling the wrong pair.`,
      };
    },
  },

  /* ================= Right triangles and trigonometry ================= */

  {
    id: 'gen_trig_easy',
    skill: 'right-triangles-trig',
    domain: 'geometry-trigonometry',
    band: 'easy',
    irt: { a: 1.0, b: -0.75 },
    targetSeconds: 55,
    build({ rng }) {
      // Three primitive triples, each scaled, so the pool is 3 × 8 rather than 5.
      const [pa, pb, pc] = pick(rng, [[3, 4, 5], [5, 12, 13], [8, 15, 17]] as const);
      const k = randInt(rng, 1, 8);
      const a = pa * k;
      const b = pb * k;
      const c = pc * k;
      const key = String(c);
      const wrong = [String(a + b), String(b - a), String(Math.round(Math.sqrt(a * a + b * b)) + 1)];
      return {
        format: 'mcq',
        prompt: `A right triangle has legs of length ${a} and ${b}. What is the length of its hypotenuse?`,
        ...makeChoices(rng, key, wrong, [
          'Added the legs. The hypotenuse is always shorter than the sum of the other two sides.',
          'Subtracted the legs, which gives a length shorter than either of them.',
          'Off by one from a correct application of the Pythagorean theorem.',
        ]),
        explanation: `By the Pythagorean theorem, c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}, so c = ${c}. These sides are a ${k === 1 ? '' : `${k}× scaled `}${pa}–${pb}–${pc} triangle, which can be read off directly once recognised. The hypotenuse must come out longer than either leg and shorter than their sum — a check worth two seconds.`,
      };
    },
  },

  {
    id: 'gen_trig_hard',
    skill: 'right-triangles-trig',
    domain: 'geometry-trigonometry',
    band: 'hard',
    irt: { a: 1.3, b: 1.15 },
    targetSeconds: 90,
    build({ rng }) {
      const x = randInt(rng, 20, 70);
      const key = `cos(${90 - x}°)`;
      const wrong = [`cos(${x}°)`, `sin(${90 - x}°)`, `tan(${x}°)`];
      return {
        format: 'mcq',
        prompt: `For an acute angle measuring ${x}°, which of the following is equal to sin(${x}°)?`,
        ...makeChoices(rng, key, wrong, [
          'Sine and cosine of the *same* angle are not generally equal; they are equal only at 45°.',
          'Sine of the complement is not equal to sine of the angle unless the angle is 45°.',
          'Tangent is the ratio of the two legs and is a different quantity entirely.',
        ]),
        explanation: `In a right triangle the two acute angles are complementary, and the side opposite one is adjacent to the other. That makes sin(θ) = cos(90° − θ). Here sin(${x}°) = cos(${90 - x}°). The identity is worth knowing outright: this question is testing recognition, not computation, and deriving it from a triangle each time costs half a minute.`,
      };
    },
  },

  /* ================= Circles ================= */

  {
    id: 'gen_circle_med',
    skill: 'circles',
    domain: 'geometry-trigonometry',
    band: 'medium',
    irt: { a: 1.15, b: 0.2 },
    targetSeconds: 75,
    build({ rng }) {
      const h = randInt(rng, -8, 8);
      const k = randInt(rng, -8, 8);
      const r = randInt(rng, 2, 9);
      const key = `(${h}, ${k})`;
      const wrong = [`(${-h}, ${-k})`, `(${h}, ${-k})`, `(${r}, ${r})`];
      return {
        format: 'mcq',
        prompt: `The equation (x ${h >= 0 ? '−' : '+'} ${Math.abs(h)})² + (y ${k >= 0 ? '−' : '+'} ${Math.abs(k)})² = ${r * r} defines a circle in the xy-plane. What are the coordinates of its centre?`,
        ...makeChoices(rng, key, wrong, [
          'Read the signs straight off the equation. The centre coordinates are the opposite of the signs that appear inside the brackets.',
          'Flipped only one of the two coordinates.',
          'Reported the radius in place of the centre.',
        ]),
        explanation: `In centre–radius form (x − h)² + (y − k)² = r², the centre is (h, k) — with the sign *opposite* to what appears in the brackets. Here the centre is (${h}, ${k}) and the radius is ${r}. The sign flip is the single most common slip in this topic, and it produces an answer that is always among the options.`,
      };
    },
  },

  {
    id: 'gen_arc_hard',
    skill: 'circles',
    domain: 'geometry-trigonometry',
    band: 'hard',
    irt: { a: 1.3, b: 1.2 },
    targetSeconds: 95,
    build({ rng }) {
      const r = pick(rng, [2, 3, 4, 5, 6, 8, 9, 10, 12, 15]);
      const deg = pick(rng, [30, 40, 45, 60, 72, 90, 120, 135, 150, 180, 240, 270]);
      const fraction = deg / 360;
      const areaNum = fraction * r * r;
      // "1π" is not how anyone writes π, and a trailing ".00" reads as a
      // measured decimal rather than an exact value.
      const piTerm = (v: number) => (v === 1 ? 'π' : `${v % 1 === 0 ? v : v.toFixed(2)}π`);
      const key = piTerm(areaNum);
      const arcLength = fraction * 2 * r;
      const wrong = [
        // The whole circle's area, ignoring the sector fraction.
        piTerm(r * r),
        // The arc length: the same fraction applied to the circumference.
        piTerm(arcLength),
        // The fraction applied to the radius rather than to the area.
        piTerm(fraction * r),
      ];
      return {
        format: 'mcq',
        prompt: `A sector of a circle of radius ${r} has a central angle of ${deg}°. What is the area of the sector?`,
        ...makeChoices(rng, key, wrong, [
          'Computed the area of the whole circle rather than the sector’s share of it.',
          'Computed the arc length instead of the area — a length, not a square measure.',
          'Applied the sector fraction to the radius instead of to the area.',
        ]),
        explanation: `A sector is a fraction of the whole circle, and the fraction is the central angle over 360°: ${deg}/360 = ${fraction}. The full area is πr² = ${r * r}π, so the sector's area is ${fraction} × ${r * r}π = ${areaNum % 1 === 0 ? areaNum : areaNum.toFixed(2)}π. Arc length uses the same fraction applied to the circumference instead — same idea, different whole.`,
      };
    },
  },
];
