/**
 * Math item bank — Algebra and Advanced Math.
 *
 * Roughly a quarter of Math items are student-produced responses (`spr`),
 * matching the operational format mix. SPR answers list every equivalent form
 * the 5-character entry field accepts.
 */

import type { Question } from '../types.ts';

export const MATH_BANK_1: Question[] = [
  /* ---------- Linear equations in one variable ---------- */
  {
    id: 'ma_l1_001',
    section: 'math',
    domain: 'algebra',
    skill: 'linear-equations-1var',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.05, b: -1.2 },
    targetSeconds: 55,
    calculatorUseful: false,
    prompt: 'If 5(x − 3) = 2x + 9, what is the value of x?',
    choices: [
      { id: 'A', text: '2' },
      { id: 'B', text: '4' },
      { id: 'C', text: '8' },
      { id: 'D', text: '12' },
    ],
    answer: 'C',
    explanation:
      'Distribute: 5x − 15 = 2x + 9. Subtract 2x: 3x − 15 = 9. Add 15: 3x = 24, so x = 8. Check: 5(8 − 3) = 25 and 2(8) + 9 = 25.',
    distractorNotes: {
      A: 'Comes from dropping the distribution over the 3, solving 5x − 3 = 2x + 9.',
      B: 'Comes from subtracting 15 instead of adding it: 3x = 9 − 15 handled with a sign slip.',
      D: 'Comes from dividing 24 by 2 instead of 3.',
    },
  },
  {
    id: 'ma_l1_002',
    section: 'math',
    domain: 'algebra',
    skill: 'linear-equations-1var',
    format: 'spr',
    band: 'medium',
    irt: { a: 1.15, b: 0.1 },
    targetSeconds: 75,
    calculatorUseful: true,
    prompt:
      'A technician charges a fixed call-out fee plus an hourly rate. A 3-hour job costs $245 and a 7-hour job costs $465. What is the call-out fee, in dollars?',
    answer: ['80'],
    explanation:
      'The two extra hours between the jobs cost 465 − 245 = 220 over 4 hours, so the hourly rate is 55. The 3-hour job then costs 3(55) = 165 in labour, leaving 245 − 165 = 80 as the fixed fee.',
  },
  {
    id: 'ma_l1_003',
    section: 'math',
    domain: 'algebra',
    skill: 'linear-equations-1var',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.3, b: 1.15 },
    targetSeconds: 80,
    calculatorUseful: false,
    prompt: 'In the equation 3(2x + k) = 6x + 21, k is a constant. If the equation has infinitely many solutions, what is the value of k?',
    choices: [
      { id: 'A', text: '3' },
      { id: 'B', text: '7' },
      { id: 'C', text: '18' },
      { id: 'D', text: '21' },
    ],
    answer: 'B',
    explanation:
      'Infinitely many solutions means the two sides are the same expression. Expanding gives 6x + 3k = 6x + 21, so 3k = 21 and k = 7.',
    distractorNotes: {
      A: 'Divides 21 by 7 rather than by 3.',
      C: 'Comes from 21 − 3 instead of 21 ÷ 3.',
      D: 'Takes k to equal the constant term without dividing by the factor of 3.',
    },
  },

  /* ---------- Linear equations in two variables ---------- */
  {
    id: 'ma_l2_001',
    section: 'math',
    domain: 'algebra',
    skill: 'linear-equations-2var',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.0, b: -0.95 },
    targetSeconds: 60,
    calculatorUseful: false,
    prompt: 'Line ℓ passes through the points (2, 1) and (6, 13). What is the slope of line ℓ?',
    choices: [
      { id: 'A', text: '1/3' },
      { id: 'B', text: '3' },
      { id: 'C', text: '4' },
      { id: 'D', text: '12' },
    ],
    answer: 'B',
    explanation: 'Slope = (13 − 1) / (6 − 2) = 12 / 4 = 3.',
    distractorNotes: {
      A: 'Inverts the ratio, computing run over rise.',
      C: 'Uses only the horizontal change.',
      D: 'Uses only the vertical change.',
    },
  },
  {
    id: 'ma_l2_002',
    section: 'math',
    domain: 'algebra',
    skill: 'linear-equations-2var',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.05 },
    targetSeconds: 70,
    calculatorUseful: false,
    prompt: 'Which equation represents the line that passes through (0, −4) and is perpendicular to the line y = (2/3)x + 1?',
    choices: [
      { id: 'A', text: 'y = (2/3)x − 4' },
      { id: 'B', text: 'y = (3/2)x − 4' },
      { id: 'C', text: 'y = −(3/2)x − 4' },
      { id: 'D', text: 'y = −(2/3)x − 4' },
    ],
    answer: 'C',
    explanation:
      'A perpendicular line has the negative reciprocal slope: the negative reciprocal of 2/3 is −3/2. The point (0, −4) is the y-intercept, giving y = −(3/2)x − 4.',
    distractorNotes: {
      A: 'Parallel, not perpendicular.',
      B: 'Takes the reciprocal but not the negative.',
      D: 'Takes the negative but not the reciprocal.',
    },
  },
  {
    id: 'ma_l2_003',
    section: 'math',
    domain: 'algebra',
    skill: 'linear-functions',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.2, b: 0.25 },
    targetSeconds: 80,
    calculatorUseful: true,
    stimulus: {
      text: 'A reservoir is being drained at a constant rate. The table shows the volume of water remaining after several elapsed times.',
      table: {
        headers: ['Time (hours)', 'Volume (thousands of litres)'],
        rows: [
          ['2', '186'],
          ['5', '150'],
          ['9', '102'],
        ],
      },
    },
    prompt: 'Which function V models the volume, in thousands of litres, remaining after t hours?',
    choices: [
      { id: 'A', text: 'V(t) = 210 − 12t' },
      { id: 'B', text: 'V(t) = 186 − 12t' },
      { id: 'C', text: 'V(t) = 210 − 36t' },
      { id: 'D', text: 'V(t) = 198 − 12t' },
    ],
    answer: 'A',
    explanation:
      'Between t = 2 and t = 5 the volume falls 36 over 3 hours, a rate of 12 per hour. Extrapolating back to t = 0 gives 186 + 2(12) = 210, so V(t) = 210 − 12t.',
    distractorNotes: {
      B: 'Uses the t = 2 volume as the initial value without extrapolating to t = 0.',
      C: 'Uses the total drop over the interval as the per-hour rate.',
      D: 'Extrapolates back only one hour instead of two.',
    },
  },

  /* ---------- Systems ---------- */
  {
    id: 'ma_sy_001',
    section: 'math',
    domain: 'algebra',
    skill: 'linear-systems',
    format: 'spr',
    band: 'medium',
    irt: { a: 1.15, b: 0.0 },
    targetSeconds: 80,
    calculatorUseful: false,
    prompt: 'If 4x + 3y = 25 and x \u2212 y = 1, what is the value of x + y?',
    answer: ['7'],
    explanation:
      'From x \u2212 y = 1, x = y + 1. Substituting into the first equation: 4(y + 1) + 3y = 25, so 7y + 4 = 25, 7y = 21, and y = 3. Then x = 4, so x + y = 7.',
  },
  {
    id: 'ma_sy_002',
    section: 'math',
    domain: 'algebra',
    skill: 'linear-systems',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.3, b: 1.2 },
    targetSeconds: 90,
    calculatorUseful: false,
    prompt: 'The system 2x + ky = 8 and 6x + 15y = 24 has infinitely many solutions. What is the value of k?',
    choices: [
      { id: 'A', text: '3' },
      { id: 'B', text: '5' },
      { id: 'C', text: '9' },
      { id: 'D', text: '15' },
    ],
    answer: 'B',
    explanation:
      'Infinitely many solutions means one equation is a multiple of the other. Dividing the second by 3 gives 2x + 5y = 8, which matches the first exactly when k = 5.',
    distractorNotes: {
      A: 'The scale factor between the equations, not the coefficient asked for.',
      C: 'Comes from 15 − 6 rather than 15 ÷ 3.',
      D: 'Copies the coefficient from the unscaled second equation.',
    },
  },

  /* ---------- Linear inequalities ---------- */
  {
    id: 'ma_li_001',
    section: 'math',
    domain: 'algebra',
    skill: 'linear-inequalities',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.1, b: -0.1 },
    targetSeconds: 75,
    calculatorUseful: true,
    prompt:
      'A delivery van can carry at most 900 kilograms. It is loaded with crates weighing 35 kilograms each and pallets weighing 120 kilograms each. If the van carries 4 pallets, what is the greatest number of crates it can also carry?',
    choices: [
      { id: 'A', text: '10' },
      { id: 'B', text: '11' },
      { id: 'C', text: '12' },
      { id: 'D', text: '13' },
    ],
    answer: 'C',
    explanation:
      'Four pallets weigh 480 kg, leaving 900 − 480 = 420 kg. Since 420 / 35 = 12 exactly, the van can carry 12 crates.',
    distractorNotes: {
      A: 'Rounds down too aggressively from an arithmetic slip.',
      B: 'Treats the limit as strict rather than "at most".',
      D: 'Exceeds the limit: 13 crates weigh 455 kg, over the 420 available.',
    },
  },
  {
    id: 'ma_li_002',
    section: 'math',
    domain: 'algebra',
    skill: 'linear-inequalities',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.25, b: 1.0 },
    targetSeconds: 85,
    calculatorUseful: false,
    prompt: 'Which of the following is equivalent to the inequality −3(x − 4) > 2x + 7?',
    choices: [
      { id: 'A', text: 'x > 1' },
      { id: 'B', text: 'x < 1' },
      { id: 'C', text: 'x > −1' },
      { id: 'D', text: 'x < −1' },
    ],
    answer: 'B',
    explanation:
      'Distribute: −3x + 12 > 2x + 7. Subtract 2x: −5x + 12 > 7. Subtract 12: −5x > −5. Dividing by −5 reverses the inequality: x < 1.',
    distractorNotes: {
      A: 'Fails to reverse the inequality when dividing by a negative.',
      C: 'Sign slip on the constant plus a failure to reverse.',
      D: 'Sign slip on the constant.',
    },
  },

  /* ---------- Equivalent expressions ---------- */
  {
    id: 'ma_ee_001',
    section: 'math',
    domain: 'advanced-math',
    skill: 'equivalent-expressions',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.05, b: -0.8 },
    targetSeconds: 55,
    calculatorUseful: false,
    prompt: 'Which expression is equivalent to (2x + 5)(x − 3)?',
    choices: [
      { id: 'A', text: '2x² − x − 15' },
      { id: 'B', text: '2x² + x − 15' },
      { id: 'C', text: '2x² − 11x − 15' },
      { id: 'D', text: '2x² − x + 15' },
    ],
    answer: 'A',
    explanation:
      'Expanding: 2x·x = 2x², 2x·(−3) = −6x, 5·x = 5x, 5·(−3) = −15. Combining the middle terms: −6x + 5x = −x, giving 2x² − x − 15.',
    distractorNotes: {
      B: 'Sign error combining −6x and 5x.',
      C: 'Adds the middle terms as −6x − 5x.',
      D: 'Sign error on the constant product.',
    },
  },
  {
    id: 'ma_ee_002',
    section: 'math',
    domain: 'advanced-math',
    skill: 'equivalent-expressions',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.3, b: 1.25 },
    targetSeconds: 85,
    calculatorUseful: false,
    prompt: 'For x ≠ ±2, which expression is equivalent to (x² − 4) / (x² + 4x + 4)?',
    choices: [
      { id: 'A', text: '(x − 2)/(x + 2)' },
      { id: 'B', text: '(x + 2)/(x − 2)' },
      { id: 'C', text: '−1' },
      { id: 'D', text: '(x − 2)/(x + 2)²' },
    ],
    answer: 'A',
    explanation:
      'Factor both: the numerator is (x − 2)(x + 2) and the denominator is (x + 2)². Cancelling one factor of (x + 2) leaves (x − 2)/(x + 2).',
    distractorNotes: {
      B: 'Cancels the wrong factor, inverting the result.',
      C: 'Would require the numerator and denominator to be negatives of each other.',
      D: 'Cancels nothing from the denominator.',
    },
  },
  {
    id: 'ma_ee_003',
    section: 'math',
    domain: 'advanced-math',
    skill: 'equivalent-expressions',
    format: 'spr',
    band: 'medium',
    irt: { a: 1.2, b: 0.35 },
    targetSeconds: 80,
    calculatorUseful: false,
    prompt: 'If (x + a)(x + 6) = x² + 11x + 30 for all x, what is the value of a?',
    answer: ['5'],
    explanation:
      'Expanding gives x² + (a + 6)x + 6a. Matching the linear coefficient: a + 6 = 11, so a = 5. The constant confirms it: 6(5) = 30.',
  },

  /* ---------- Nonlinear equations ---------- */
  {
    id: 'ma_ne_001',
    section: 'math',
    domain: 'advanced-math',
    skill: 'nonlinear-equations',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.2 },
    targetSeconds: 80,
    calculatorUseful: true,
    prompt: 'What is the sum of the solutions to x² − 7x + 10 = 0?',
    choices: [
      { id: 'A', text: '−7' },
      { id: 'B', text: '2' },
      { id: 'C', text: '7' },
      { id: 'D', text: '10' },
    ],
    answer: 'C',
    explanation:
      'The equation factors as (x − 2)(x − 5) = 0, so the solutions are 2 and 5 and their sum is 7. This matches the general result that the sum of the roots equals −b/a = 7.',
    distractorNotes: {
      A: 'Uses b instead of −b/a.',
      B: 'Reports one root rather than the sum.',
      D: 'Reports the product of the roots.',
    },
  },
  {
    id: 'ma_ne_002',
    section: 'math',
    domain: 'advanced-math',
    skill: 'nonlinear-equations',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.35, b: 1.35 },
    targetSeconds: 95,
    calculatorUseful: true,
    prompt: 'The equation 2x² + 12x + c = 0 has exactly one real solution, where c is a constant. What is the value of c?',
    choices: [
      { id: 'A', text: '6' },
      { id: 'B', text: '12' },
      { id: 'C', text: '18' },
      { id: 'D', text: '36' },
    ],
    answer: 'C',
    explanation:
      'Exactly one real solution means the discriminant is zero: b² − 4ac = 0, so 12² − 4(2)c = 0, giving 144 = 8c and c = 18.',
    distractorNotes: {
      A: 'Comes from 12 ÷ 2.',
      B: 'Copies the linear coefficient.',
      D: 'Comes from 144 ÷ 4, omitting the factor a = 2.',
    },
  },
  {
    id: 'ma_ne_003',
    section: 'math',
    domain: 'advanced-math',
    skill: 'nonlinear-functions',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.2, b: 0.4 },
    targetSeconds: 85,
    calculatorUseful: true,
    prompt: 'The function f is defined by f(x) = −2(x − 3)² + 8. What is the maximum value of f?',
    choices: [
      { id: 'A', text: '−2' },
      { id: 'B', text: '3' },
      { id: 'C', text: '8' },
      { id: 'D', text: '11' },
    ],
    answer: 'C',
    explanation:
      'The squared term is never negative, and it is multiplied by −2, so −2(x − 3)² is at most 0, attained at x = 3. The maximum of f is therefore 0 + 8 = 8.',
    distractorNotes: {
      A: 'Reports the leading coefficient.',
      B: 'Reports the x-coordinate of the vertex rather than the maximum value.',
      D: 'Adds the vertex coordinates.',
    },
  },
  {
    id: 'ma_nf_001',
    section: 'math',
    domain: 'advanced-math',
    skill: 'nonlinear-functions',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.3, b: 1.2 },
    targetSeconds: 90,
    calculatorUseful: true,
    prompt:
      'A culture of bacteria doubles every 4 hours. If the culture starts with 500 cells, which function gives the number of cells after t hours?',
    choices: [
      { id: 'A', text: 'N(t) = 500(2)^(4t)' },
      { id: 'B', text: 'N(t) = 500(2)^(t/4)' },
      { id: 'C', text: 'N(t) = 500(4)^(t/2)' },
      { id: 'D', text: 'N(t) = 500 + 2t/4' },
    ],
    answer: 'B',
    explanation:
      'The population multiplies by 2 once per 4-hour period, and t hours contain t/4 such periods, so the exponent is t/4. Checking t = 4 gives 500(2)¹ = 1000, a correct doubling.',
    distractorNotes: {
      A: 'Doubles four times per hour instead of once per four hours.',
      C: 'Quadruples every two hours, which is twice the stated rate.',
      D: 'Models linear rather than exponential growth.',
    },
  },
];
