/**
 * Math item bank — Problem-Solving and Data Analysis, Geometry and Trigonometry.
 */

import type { Question } from '../types.ts';

export const MATH_BANK_2: Question[] = [
  /* ---------- Ratios, rates, proportions, units ---------- */
  {
    id: 'ma_rr_001',
    section: 'math',
    domain: 'problem-solving-data',
    skill: 'ratios-rates-units',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.0, b: -1.0 },
    targetSeconds: 60,
    calculatorUseful: true,
    prompt:
      'A printing press produces 1,400 pages in 8 minutes. At this rate, how many pages does it produce in 30 minutes?',
    choices: [
      { id: 'A', text: '3,500' },
      { id: 'B', text: '4,200' },
      { id: 'C', text: '5,250' },
      { id: 'D', text: '11,200' },
    ],
    answer: 'C',
    explanation: 'The rate is 1,400 / 8 = 175 pages per minute, and 175 × 30 = 5,250 pages.',
    distractorNotes: {
      A: 'Uses a rate of 1,400 per 12 minutes.',
      B: 'Triples the 8-minute output, treating 30 minutes as 24.',
      D: 'Multiplies 1,400 by 8 instead of finding a per-minute rate.',
    },
  },
  {
    id: 'ma_rr_002',
    section: 'math',
    domain: 'problem-solving-data',
    skill: 'ratios-rates-units',
    format: 'spr',
    band: 'hard',
    irt: { a: 1.25, b: 1.1 },
    targetSeconds: 90,
    calculatorUseful: true,
    prompt:
      'A pipeline moves crude oil at 45 cubic metres per minute. How many cubic metres does it move in 2.5 hours?',
    answer: ['6750'],
    explanation: '2.5 hours is 150 minutes, and 45 × 150 = 6,750 cubic metres.',
  },

  /* ---------- Percentages ---------- */
  {
    id: 'ma_pc_001',
    section: 'math',
    domain: 'problem-solving-data',
    skill: 'percentages',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.0 },
    targetSeconds: 75,
    calculatorUseful: true,
    prompt:
      'The price of a laptop was reduced by 20%, and the reduced price was then reduced by a further 15%. The final price is what percent of the original price?',
    choices: [
      { id: 'A', text: '35%' },
      { id: 'B', text: '65%' },
      { id: 'C', text: '68%' },
      { id: 'D', text: '80%' },
    ],
    answer: 'C',
    explanation:
      'Successive discounts multiply: 0.80 × 0.85 = 0.68, so the final price is 68% of the original.',
    distractorNotes: {
      A: 'Adds the two discounts and subtracts from 100 incorrectly.',
      B: 'Adds the discounts: 100 − (20 + 15).',
      D: 'Applies only the first discount.',
    },
  },
  {
    id: 'ma_pc_002',
    section: 'math',
    domain: 'problem-solving-data',
    skill: 'percentages',
    format: 'spr',
    band: 'hard',
    irt: { a: 1.3, b: 1.2 },
    targetSeconds: 95,
    calculatorUseful: true,
    prompt:
      'After a 25% increase, a town\'s population is 8,750. What was the population before the increase?',
    answer: ['7000'],
    explanation:
      'The new population is 1.25 times the old, so the old population is 8,750 / 1.25 = 7,000. Taking 25% off 8,750 would be the common error, since the base of the percentage is the original, not the new, figure.',
  },

  /* ---------- One-variable data ---------- */
  {
    id: 'ma_ov_001',
    section: 'math',
    domain: 'problem-solving-data',
    skill: 'one-variable-data',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.2, b: 0.3 },
    targetSeconds: 85,
    calculatorUseful: true,
    stimulus: {
      text: 'The list below gives the number of hours nine students spent on a project.\n\n3, 4, 4, 5, 6, 7, 8, 9, 26',
    },
    prompt: 'Which statement about the data is true?',
    choices: [
      { id: 'A', text: 'The mean is less than the median.' },
      { id: 'B', text: 'The mean is greater than the median.' },
      { id: 'C', text: 'The mean is equal to the median.' },
      { id: 'D', text: 'The median is greater than the maximum.' },
    ],
    answer: 'B',
    explanation:
      'The median is the fifth of nine sorted values, which is 6. The sum is 72, so the mean is 8. The single large value of 26 pulls the mean above the median — the standard signature of a right-skewed distribution.',
    distractorNotes: {
      A: 'Reverses the effect of a high outlier, which raises the mean, not lowers it.',
      C: 'Would require a symmetric distribution.',
      D: 'The median can never exceed the maximum.',
    },
  },
  {
    id: 'ma_ov_002',
    section: 'math',
    domain: 'problem-solving-data',
    skill: 'one-variable-data',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.25, b: 1.05 },
    targetSeconds: 90,
    calculatorUseful: true,
    stimulus: {
      text: 'Two classes took the same 50-point quiz. Class A and Class B each had a mean of 38. The standard deviation was 3.1 for Class A and 9.4 for Class B.',
    },
    prompt: 'Which statement is best supported by this information?',
    choices: [
      { id: 'A', text: 'Class A scored higher on average than Class B.' },
      { id: 'B', text: 'Scores in Class B were more spread out than scores in Class A.' },
      { id: 'C', text: 'Class B contained more students than Class A.' },
      { id: 'D', text: 'The median score in Class A was 38.' },
    ],
    answer: 'B',
    explanation:
      'Standard deviation measures spread about the mean. A standard deviation of 9.4 against 3.1 means Class B\'s scores were dispersed considerably more widely, even though the two means are identical.',
    distractorNotes: {
      A: 'The means are equal, so neither class scored higher on average.',
      C: 'Standard deviation says nothing about sample size.',
      D: 'The mean is 38, but a mean does not determine the median.',
    },
  },

  /* ---------- Two-variable data ---------- */
  {
    id: 'ma_tv_001',
    section: 'math',
    domain: 'problem-solving-data',
    skill: 'two-variable-data',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.15 },
    targetSeconds: 85,
    calculatorUseful: true,
    stimulus: {
      text: 'The scatterplot shows the mass, in grams, of a seedling against the number of days since germination, with the line of best fit drawn.',
      figure: {
        kind: 'scatter',
        alt: 'Scatterplot of seedling mass in grams against days since germination, with an upward-sloping line of best fit passing near (0, 2) and (20, 14).',
        xLabel: 'Days since germination',
        yLabel: 'Mass (g)',
        points: [
          [2, 3.4], [4, 4.1], [6, 5.8], [8, 6.9], [10, 8.3],
          [12, 9.0], [14, 10.6], [16, 11.4], [18, 13.1], [20, 13.8],
        ],
        line: { slope: 0.6, intercept: 2 },
      },
    },
    prompt: 'Which statement best describes the meaning of the slope of the line of best fit?',
    choices: [
      { id: 'A', text: 'The seedling\'s mass at germination was about 0.6 grams.' },
      { id: 'B', text: 'The seedling gained about 0.6 grams per day.' },
      { id: 'C', text: 'The seedling reached 0.6 grams after 20 days.' },
      { id: 'D', text: 'The seedling gained about 2 grams per day.' },
    ],
    answer: 'B',
    explanation:
      'Slope is the change in the vertical variable per unit of the horizontal one. Here that is grams per day, so a slope of 0.6 means roughly 0.6 grams gained each day.',
    distractorNotes: {
      A: 'Describes the y-intercept, which is about 2 grams, not the slope.',
      C: 'Misreads the slope as a total mass.',
      D: 'Uses the intercept value as a rate.',
    },
  },

  /* ---------- Probability ---------- */
  {
    id: 'ma_pr_001',
    section: 'math',
    domain: 'problem-solving-data',
    skill: 'probability',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.2, b: 0.25 },
    targetSeconds: 85,
    calculatorUseful: true,
    stimulus: {
      text: 'A survey asked 200 commuters whether they had used a bicycle-share service in the past month.',
      table: {
        headers: ['', 'Used service', 'Did not use', 'Total'],
        rows: [
          ['Under 30', '54', '36', '90'],
          ['30 or older', '44', '66', '110'],
          ['Total', '98', '102', '200'],
        ],
      },
    },
    prompt:
      'If one commuter is selected at random from those who used the service, what is the probability that the commuter is under 30?',
    choices: [
      { id: 'A', text: '54/200' },
      { id: 'B', text: '54/90' },
      { id: 'C', text: '54/98' },
      { id: 'D', text: '98/200' },
    ],
    answer: 'C',
    explanation:
      'The selection is restricted to service users, so the denominator is the 98 users, not the full 200. Of those, 54 are under 30, giving 54/98.',
    distractorNotes: {
      A: 'Uses the whole sample as the denominator, ignoring the conditioning.',
      B: 'Conditions on age instead of on service use.',
      D: 'Gives the unconditional probability of being a user.',
    },
  },

  /* ---------- Inference and statistical claims ---------- */
  {
    id: 'ma_is_001',
    section: 'math',
    domain: 'problem-solving-data',
    skill: 'inference-statistics',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.3, b: 1.15 },
    targetSeconds: 90,
    calculatorUseful: false,
    stimulus: {
      text: 'A random sample of 400 residents of a city was surveyed. The mean weekly grocery spend was $142, with an associated margin of error of $6 at the 95% confidence level.',
    },
    prompt: 'Which conclusion is most appropriate based on these results?',
    choices: [
      { id: 'A', text: 'Every resident of the city spends between $136 and $148 per week on groceries.' },
      { id: 'B', text: 'It is plausible that the mean weekly grocery spend of all residents is between $136 and $148.' },
      { id: 'C', text: 'Exactly 95% of residents spend between $136 and $148 per week on groceries.' },
      { id: 'D', text: 'Surveying more residents would necessarily raise the mean weekly spend.' },
    ],
    answer: 'B',
    explanation:
      'A confidence interval is a statement about the population mean, not about individuals. The interval $142 ± $6 gives a plausible range for the mean of the whole population.',
    distractorNotes: {
      A: 'Applies an interval for the mean to every individual.',
      C: 'Confuses the confidence level with the proportion of individuals inside the interval.',
      D: 'A larger sample narrows the interval; it does not push the mean in a predictable direction.',
    },
  },
  {
    id: 'ma_sc_001',
    section: 'math',
    domain: 'problem-solving-data',
    skill: 'statistical-claims',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.2, b: 0.4 },
    targetSeconds: 85,
    calculatorUseful: false,
    stimulus: {
      text: 'Researchers recruited volunteers from a running club and randomly assigned them to either a new training programme or their usual routine. After twelve weeks, the programme group had significantly faster times.',
    },
    prompt: 'Which statement describes an appropriate conclusion from this study?',
    choices: [
      { id: 'A', text: 'The programme causes faster times in all adults.' },
      { id: 'B', text: 'The programme likely causes faster times among members of running clubs like this one.' },
      { id: 'C', text: 'Faster runners are more likely to choose the new programme.' },
      { id: 'D', text: 'No causal conclusion is possible because the study used volunteers.' },
    ],
    answer: 'B',
    explanation:
      'Random assignment supports a causal conclusion, but the volunteers came from a running club rather than from the general population, so the result generalises only to a similar group.',
    distractorNotes: {
      A: 'Over-generalises beyond the population the sample was drawn from.',
      C: 'Assignment was random, so self-selection into the programme did not occur.',
      D: 'Volunteer recruitment limits generalisability, but random assignment still licenses a causal claim within the group studied.',
    },
  },

  /* ---------- Area and volume ---------- */
  {
    id: 'ma_av_001',
    section: 'math',
    domain: 'geometry-trigonometry',
    skill: 'area-volume',
    format: 'mcq',
    band: 'easy',
    irt: { a: 1.0, b: -0.85 },
    targetSeconds: 60,
    calculatorUseful: true,
    prompt:
      'A cylindrical tank has a radius of 3 metres and a height of 10 metres. What is its volume, in cubic metres?',
    choices: [
      { id: 'A', text: '30π' },
      { id: 'B', text: '60π' },
      { id: 'C', text: '90π' },
      { id: 'D', text: '900π' },
    ],
    answer: 'C',
    explanation: 'V = πr²h = π(3²)(10) = 90π cubic metres.',
    distractorNotes: {
      A: 'Uses r rather than r².',
      B: 'Uses the circumference formula 2πr in place of the area of the base.',
      D: 'Squares the height as well as the radius.',
    },
  },
  {
    id: 'ma_av_002',
    section: 'math',
    domain: 'geometry-trigonometry',
    skill: 'area-volume',
    format: 'spr',
    band: 'hard',
    irt: { a: 1.3, b: 1.25 },
    targetSeconds: 95,
    calculatorUseful: true,
    prompt:
      'A rectangular prism has a volume of 240 cubic centimetres. Its length is 8 cm and its width is 5 cm. What is its height, in centimetres?',
    answer: ['6'],
    explanation: 'V = lwh, so 240 = 8 × 5 × h = 40h, giving h = 6 centimetres.',
  },

  /* ---------- Lines, angles, triangles ---------- */
  {
    id: 'ma_la_001',
    section: 'math',
    domain: 'geometry-trigonometry',
    skill: 'lines-angles-triangles',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.1 },
    targetSeconds: 75,
    calculatorUseful: false,
    prompt:
      'In triangle ABC, the measure of angle A is 42° and the measure of angle B is 71°. What is the measure of angle C?',
    choices: [
      { id: 'A', text: '29°' },
      { id: 'B', text: '67°' },
      { id: 'C', text: '113°' },
      { id: 'D', text: '138°' },
    ],
    answer: 'B',
    explanation: 'Angles in a triangle sum to 180°, so angle C = 180 − 42 − 71 = 67°.',
    distractorNotes: {
      A: 'Computes the difference between the two given angles.',
      C: 'Gives the sum of the two known angles.',
      D: 'Subtracts only angle A from 180.',
    },
  },
  {
    id: 'ma_la_002',
    section: 'math',
    domain: 'geometry-trigonometry',
    skill: 'lines-angles-triangles',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.3, b: 1.1 },
    targetSeconds: 90,
    calculatorUseful: true,
    prompt:
      'Triangle ABC is similar to triangle DEF, with AB corresponding to DE. If AB = 6, DE = 15, and the area of triangle ABC is 20, what is the area of triangle DEF?',
    choices: [
      { id: 'A', text: '50' },
      { id: 'B', text: '80' },
      { id: 'C', text: '125' },
      { id: 'D', text: '150' },
    ],
    answer: 'C',
    explanation:
      'The linear scale factor is 15/6 = 5/2. Areas scale as the square of the linear factor, so the area multiplies by (5/2)² = 25/4, giving 20 × 25/4 = 125.',
    distractorNotes: {
      A: 'Applies the linear scale factor once instead of squaring it.',
      B: 'Uses a scale factor of 2 rather than 5/2.',
      D: 'Multiplies by the ratio of the sides without dividing correctly.',
    },
  },

  /* ---------- Right triangles and trigonometry ---------- */
  {
    id: 'ma_rt_001',
    section: 'math',
    domain: 'geometry-trigonometry',
    skill: 'right-triangles-trig',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.2, b: 0.2 },
    targetSeconds: 80,
    calculatorUseful: true,
    prompt:
      'In a right triangle, the leg adjacent to angle θ has length 9 and the hypotenuse has length 15. What is the value of sin θ?',
    choices: [
      { id: 'A', text: '3/5' },
      { id: 'B', text: '4/5' },
      { id: 'C', text: '9/15' },
      { id: 'D', text: '15/12' },
    ],
    answer: 'B',
    explanation:
      'The remaining leg is √(15² − 9²) = √144 = 12, and it is opposite θ. So sin θ = opposite / hypotenuse = 12/15 = 4/5.',
    distractorNotes: {
      A: 'Gives cos θ = 9/15 in lowest terms.',
      C: 'Gives cos θ unreduced.',
      D: 'Inverts the ratio, giving the cosecant of the complementary angle.',
    },
  },
  {
    id: 'ma_rt_002',
    section: 'math',
    domain: 'geometry-trigonometry',
    skill: 'right-triangles-trig',
    format: 'spr',
    band: 'medium',
    irt: { a: 1.15, b: 0.0 },
    targetSeconds: 80,
    calculatorUseful: true,
    prompt:
      'A ladder leans against a wall, reaching 24 feet up the wall. The base of the ladder is 7 feet from the wall. How long is the ladder, in feet?',
    answer: ['25'],
    explanation: 'By the Pythagorean theorem, the length is √(24² + 7²) = √(576 + 49) = √625 = 25 feet.',
  },

  /* ---------- Circles ---------- */
  {
    id: 'ma_ci_001',
    section: 'math',
    domain: 'geometry-trigonometry',
    skill: 'circles',
    format: 'mcq',
    band: 'hard',
    irt: { a: 1.3, b: 1.2 },
    targetSeconds: 90,
    calculatorUseful: false,
    prompt:
      'The equation x² + y² − 6x + 8y = 0 defines a circle in the xy-plane. What is the radius of the circle?',
    choices: [
      { id: 'A', text: '5' },
      { id: 'B', text: '7' },
      { id: 'C', text: '14' },
      { id: 'D', text: '25' },
    ],
    answer: 'A',
    explanation:
      'Complete the square: (x² − 6x + 9) + (y² + 8y + 16) = 0 + 9 + 16, so (x − 3)² + (y + 4)² = 25. The radius is √25 = 5.',
    distractorNotes: {
      B: 'Adds the two half-coefficients, 3 + 4.',
      C: 'Doubles that sum.',
      D: 'Reports r² rather than r.',
    },
  },
  {
    id: 'ma_ci_002',
    section: 'math',
    domain: 'geometry-trigonometry',
    skill: 'circles',
    format: 'mcq',
    band: 'medium',
    irt: { a: 1.15, b: 0.15 },
    targetSeconds: 80,
    calculatorUseful: true,
    prompt:
      'A circle has a radius of 12 centimetres. What is the length of an arc subtended by a central angle of 60°?',
    choices: [
      { id: 'A', text: '2π cm' },
      { id: 'B', text: '4π cm' },
      { id: 'C', text: '12π cm' },
      { id: 'D', text: '24π cm' },
    ],
    answer: 'B',
    explanation:
      'A 60° angle is one sixth of the circle. The full circumference is 2π(12) = 24π, so the arc is 24π / 6 = 4π centimetres.',
    distractorNotes: {
      A: 'Divides by 12 instead of by 6.',
      C: 'Halves the circumference, as if the angle were 180°.',
      D: 'Gives the full circumference.',
    },
  },
];
