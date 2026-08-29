/**
 * Algebra generators.
 *
 * Five skills across three difficulty bands. Every key is computed from the
 * parameters rather than typed, and every distractor encodes a named error —
 * a sign dropped, the wrong quantity reported, a rate confused with a total.
 * A distractor that is merely a nearby number teaches nothing when the item is
 * reviewed, and review is where most of the learning happens.
 *
 * Difficulty is carried by structure, not by arithmetic size. A hard item asks
 * for a relationship rather than a value, leaves a coefficient symbolic, or
 * requires the learner to decide what to solve for before solving it. Making
 * the numbers uglier produces a slower item, not a harder one.
 */

import { makeChoices, randInt, pick, type Generator } from './generator-kit.ts';

export const ALGEBRA_GENERATORS: Generator[] = [
  /* ================= Linear equations in one variable ================= */

  {
    id: 'gen_lin1_med',
    skill: 'linear-equations-1var',
    domain: 'algebra',
    band: 'medium',
    irt: { a: 1.1, b: 0.05 },
    targetSeconds: 70,
    build({ rng }) {
      // Variables on both sides with a fractional coefficient cleared first.
      const denom = pick(rng, [2, 3, 4]);
      const x = randInt(rng, 2, 9);
      const a = randInt(rng, 2, 6);
      const c = randInt(rng, 1, 5);
      // (a*x + b)/denom = c*x - e   =>  a*x + b = denom*c*x - denom*e
      const e = randInt(rng, 1, 8);
      const b = denom * c * x - denom * e - a * x;

      const key = String(x);
      const wrong = [
        String(x + denom), // forgot to multiply the constant by the denominator
        String(-x),
        String(a + c),
      ];
      return {
        format: 'mcq',
        prompt: `If (${a}x ${b >= 0 ? '+' : '−'} ${Math.abs(b)}) / ${denom} = ${c}x − ${e}, what is the value of x?`,
        ...makeChoices(rng, key, wrong, [
          `Multiplied only the variable term by ${denom} when clearing the fraction, leaving the constant behind.`,
          'Solved correctly but reported the opposite sign, usually from moving a term without changing it.',
          'Combined the coefficients instead of solving for the variable.',
        ]),
        explanation: `Multiply both sides by ${denom} to clear the fraction: ${a}x ${b >= 0 ? '+' : '−'} ${Math.abs(b)} = ${denom * c}x − ${denom * e}. Collect the variable on one side and the constants on the other, then divide. x = ${x}. Substituting back confirms both sides equal ${c * x - e}.`,
      };
    },
  },

  {
    id: 'gen_lin1_hard',
    skill: 'linear-equations-1var',
    domain: 'algebra',
    band: 'hard',
    irt: { a: 1.2, b: 1.0 },
    targetSeconds: 85,
    build({ rng }) {
      // A symbolic coefficient: for what value of k is there no solution?
      const a = randInt(rng, 2, 8);
      const b = randInt(rng, 2, 9);
      const c = randInt(rng, 2, 9);
      // a*x + b = k*x + c has no solution exactly when k = a and b ≠ c.
      const key = String(a);
      const wrong = [String(b), String(c), String(a + 1)];
      return {
        format: 'mcq',
        prompt: `In the equation ${a}x + ${b} = kx + ${c}, where k is a constant and ${b} ≠ ${c}, for what value of k does the equation have no solution?`,
        ...makeChoices(rng, key, wrong, [
          'Read a constant term as the coefficient. The condition concerns the coefficients of x, not the constants.',
          'Read the other constant term as the coefficient, for the same reason.',
          'Off by one: any k other than the matching coefficient gives exactly one solution, not none.',
        ]),
        explanation: `Collect the variable terms: (${a} − k)x = ${c} − ${b}. When ${a} − k ≠ 0 there is exactly one solution. When k = ${a} the left side is 0 while the right side is ${c - b} ≠ 0, so no value of x can satisfy it. Hence k = ${a}. Had the constants also matched, every x would work and there would be infinitely many solutions instead.`,
      };
    },
  },

  /* ================= Linear equations in two variables ================= */

  {
    id: 'gen_lin2_med',
    skill: 'linear-equations-2var',
    domain: 'algebra',
    band: 'medium',
    irt: { a: 1.15, b: 0.1 },
    targetSeconds: 70,
    build({ rng }) {
      const rate = randInt(rng, 3, 12);
      const start = randInt(rng, 20, 90);
      const weeks = randInt(rng, 4, 14);
      const total = start + rate * weeks;
      const key = String(weeks);
      const wrong = [
        String(Math.round(total / rate)), // ignored the starting amount
        String(weeks + 1),
        String(rate),
      ];
      return {
        format: 'mcq',
        prompt: `A tank contains ${start} litres of water, and a pump adds ${rate} litres each hour. After how many hours does the tank contain ${total} litres?`,
        ...makeChoices(rng, key, wrong, [
          'Divided the final amount by the rate, ignoring the water already in the tank at the start.',
          'Counted the starting hour as an hour of pumping.',
          'Reported the rate rather than the number of hours.',
        ]),
        explanation: `The situation is V = ${start} + ${rate}h. Set ${start} + ${rate}h = ${total}, so ${rate}h = ${total - start} and h = ${weeks}. The starting amount is the intercept and must be subtracted before dividing by the rate — dividing ${total} by ${rate} answers a different question, about a tank that started empty.`,
      };
    },
  },

  {
    id: 'gen_lin2_hard',
    skill: 'linear-equations-2var',
    domain: 'algebra',
    band: 'hard',
    irt: { a: 1.25, b: 1.05 },
    targetSeconds: 90,
    build({ rng }) {
      // Parallel line through a point: reported in a non-obvious form.
      const m = pick(rng, [2, 3, 4, 5, -2, -3]);
      const x0 = randInt(rng, 1, 8);
      const y0 = randInt(rng, 1, 12);
      const b = y0 - m * x0;
      const c = randInt(rng, 2, 9);
      const key = String(m * c + b);
      const wrong = [String(m * c), String(b + c), String(m + b)];
      return {
        format: 'mcq',
        prompt: `Line ℓ passes through the point (${x0}, ${y0}) and is parallel to the line y = ${m}x + ${randInt(rng, 1, 9)}. What is the value of y on line ℓ when x = ${c}?`,
        ...makeChoices(rng, key, wrong, [
          'Used the slope but dropped the intercept, effectively assuming the line passes through the origin.',
          'Added the new x-value to the intercept instead of multiplying it by the slope.',
          'Added the slope and the intercept rather than evaluating the equation.',
        ]),
        explanation: `Parallel lines share a slope, so ℓ has slope ${m}. Using the given point: ${y0} = ${m}(${x0}) + b, so b = ${b}. The line is y = ${m}x ${b >= 0 ? '+' : '−'} ${Math.abs(b)}. At x = ${c}, y = ${m * c + b}. The intercept of the *given* line is irrelevant; only its slope carries over.`,
      };
    },
  },

  /* ================= Linear functions ================= */

  {
    id: 'gen_linfn_easy',
    skill: 'linear-functions',
    domain: 'algebra',
    band: 'easy',
    irt: { a: 1.0, b: -0.95 },
    targetSeconds: 50,
    build({ rng }) {
      const m = randInt(rng, 2, 9);
      const b = randInt(rng, 1, 15);
      const x = randInt(rng, 2, 9);
      const key = String(m * x + b);
      const wrong = [String(m + b), String(m * x), String(m * (x + b))];
      return {
        format: 'mcq',
        prompt: `The function f is defined by f(x) = ${m}x + ${b}. What is the value of f(${x})?`,
        ...makeChoices(rng, key, wrong, [
          'Read f(x) as f times x and added, rather than substituting for x.',
          'Substituted correctly but dropped the constant term.',
          'Added the constant to the input before multiplying, instead of after.',
        ]),
        explanation: `Substitute ${x} for every x: f(${x}) = ${m}(${x}) + ${b} = ${m * x} + ${b} = ${m * x + b}. Function notation is an instruction to substitute, never a multiplication.`,
      };
    },
  },

  {
    id: 'gen_linfn_med',
    skill: 'linear-functions',
    domain: 'algebra',
    band: 'medium',
    irt: { a: 1.15, b: 0.15 },
    targetSeconds: 75,
    build({ rng }) {
      // Build the function from two points given in a table.
      const m = pick(rng, [2, 3, 4, 5, 6]);
      const b = randInt(rng, -8, 12);
      const x1 = randInt(rng, 1, 4);
      const x2 = x1 + randInt(rng, 2, 5);
      const y1 = m * x1 + b;
      const y2 = m * x2 + b;
      const target = x2 + randInt(rng, 2, 6);
      const key = String(m * target + b);
      const wrong = [String(y2 + m), String(m * target), String(y2 + (target - x2))];
      return {
        format: 'mcq',
        prompt: `A linear function f satisfies f(${x1}) = ${y1} and f(${x2}) = ${y2}. What is f(${target})?`,
        ...makeChoices(rng, key, wrong, [
          'Advanced one step of the rate from the last known value instead of the required number of steps.',
          'Found the rate correctly but omitted the constant term.',
          'Added the change in x rather than the change in y, treating the rate as 1.',
        ]),
        explanation: `The rate is (${y2} − ${y1}) / (${x2} − ${x1}) = ${m}. Back-substituting one point gives the constant: ${y1} = ${m}(${x1}) + b, so b = ${b}. Then f(${target}) = ${m}(${target}) ${b >= 0 ? '+' : '−'} ${Math.abs(b)} = ${m * target + b}. Rate first, constant second — the order matters because the constant cannot be found without the rate.`,
      };
    },
  },

  {
    id: 'gen_linfn_hard',
    skill: 'linear-functions',
    domain: 'algebra',
    band: 'hard',
    irt: { a: 1.2, b: 1.1 },
    targetSeconds: 90,
    build({ rng }) {
      // Interpretation rather than evaluation: what does the constant mean?
      const rate = randInt(rng, 4, 15);
      const start = randInt(rng, 30, 200);
      const key = `The cost, in dollars, when no items are produced`;
      const wrong = [
        `The cost, in dollars, of producing one item`,
        `The number of items produced when the cost is zero`,
        `The increase in cost, in dollars, for each additional item`,
      ];
      return {
        format: 'mcq',
        prompt: `The total cost C, in dollars, of producing n items is modelled by C(n) = ${rate}n + ${start}. Which of the following is the best interpretation of ${start} in this model?`,
        ...makeChoices(rng, key, wrong, [
          `That would be C(1) = ${rate + start}, which combines the fixed cost with one unit of the variable cost.`,
          'Reverses the roles: the constant is a cost, not a count, and the cost is never zero in this model.',
          `That is the coefficient ${rate}, the per-item rate, not the constant.`,
        ]),
        explanation: `The constant term is the value of the function when the input is zero: C(0) = ${start}. In context that is the cost incurred before a single item is produced — a fixed cost. The coefficient ${rate} is the rate, the extra cost per additional item. Reading a constant as a rate, or a rate as a constant, is the whole of this question.`,
      };
    },
  },

  /* ================= Systems of two linear equations ================= */

  {
    id: 'gen_system_easy',
    skill: 'linear-systems',
    domain: 'algebra',
    band: 'easy',
    irt: { a: 1.05, b: -0.75 },
    targetSeconds: 60,
    build({ rng }) {
      const x = randInt(rng, 1, 9);
      const y = randInt(rng, 1, 9);
      const s = x + y;
      const d = x - y;
      // One minus sign throughout: a computed constant can be negative, and an
      // ASCII hyphen beside a U+2212 reads as two different symbols.
      const neg = (v: number) => (v < 0 ? `−${Math.abs(v)}` : String(v));
      const key = String(x);
      const wrong = [String(y), String(s), String(Math.abs(d))];
      return {
        format: 'mcq',
        prompt: `If x + y = ${s} and x − y = ${neg(d)}, what is the value of x?`,
        ...makeChoices(rng, key, wrong, [
          'Solved the system correctly but reported y instead of x.',
          'Reported the sum given in the question rather than solving for either variable.',
          'Reported the difference given in the question.',
        ]),
        explanation: `Adding the two equations eliminates y: 2x = ${s} + (${neg(d)}) = ${s + d}, so x = ${x}. Substituting back gives y = ${y}. Adding is the right move here precisely because the y-coefficients are already opposites — no scaling is needed.`,
      };
    },
  },

  {
    id: 'gen_system_hard',
    skill: 'linear-systems',
    domain: 'algebra',
    band: 'hard',
    irt: { a: 1.25, b: 1.15 },
    targetSeconds: 95,
    build({ rng }) {
      // No solution: the coefficients must be proportional, constants not.
      const a = randInt(rng, 2, 6);
      const b = randInt(rng, 2, 7);
      const k = randInt(rng, 2, 4);
      const c1 = randInt(rng, 3, 15);
      const key = String(a * k);
      const wrong = [String(b * k), String(a + k), String(a * b)];
      return {
        format: 'mcq',
        prompt: `The system ${a}x + ${b}y = ${c1} and mx + ${b * k}y = ${c1 * k + randInt(rng, 1, 5)} has no solution. What is the value of m?`,
        ...makeChoices(rng, key, wrong, [
          'Scaled the wrong coefficient: the multiplier applies to both coefficients equally, so it must be applied to the x-coefficient.',
          'Added the scale factor instead of multiplying by it.',
          'Multiplied the two coefficients of the first equation together.',
        ]),
        explanation: `No solution means the lines are parallel: identical coefficient ratios with different constants. The y-coefficient was scaled from ${b} to ${b * k}, a factor of ${k}, so the x-coefficient must scale by the same factor: m = ${a} × ${k} = ${a * k}. The constants then differ, which is what makes the system inconsistent rather than identical. Comparing slopes answers this without solving anything.`,
      };
    },
  },

  /* ================= Linear inequalities ================= */

  {
    id: 'gen_ineq_easy',
    skill: 'linear-inequalities',
    domain: 'algebra',
    band: 'easy',
    irt: { a: 1.0, b: -0.8 },
    targetSeconds: 55,
    build({ rng }) {
      const a = randInt(rng, 2, 8);
      const b = randInt(rng, 1, 12);
      const n = randInt(rng, 3, 12);
      const c = a * n + b;
      const key = String(n);
      const wrong = [String(n + 1), String(n - 1), String(Math.floor(c / a))];
      return {
        format: 'mcq',
        prompt: `What is the greatest integer value of x that satisfies ${a}x + ${b} ≤ ${c}?`,
        ...makeChoices(rng, key, wrong, [
          'Went one past the boundary. The inequality includes equality, so the boundary value itself is allowed but nothing beyond it.',
          'Stopped one short. Because ≤ includes equality, the boundary value is itself a solution.',
          'Divided without first subtracting the constant term.',
        ]),
        explanation: `Subtract ${b}: ${a}x ≤ ${c - b}. Divide by ${a} (positive, so the sign does not flip): x ≤ ${n}. The greatest integer satisfying this is ${n} itself, because ≤ admits equality. Checking: ${a}(${n}) + ${b} = ${c}, which satisfies the inequality exactly.`,
      };
    },
  },

  {
    id: 'gen_ineq_hard',
    skill: 'linear-inequalities',
    domain: 'algebra',
    band: 'hard',
    irt: { a: 1.25, b: 1.05 },
    targetSeconds: 90,
    build({ rng }) {
      // Division by a negative: the flip is the whole question.
      const a = randInt(rng, 2, 7);
      const n = randInt(rng, 2, 9);
      const b = randInt(rng, 1, 14);
      const c = -a * n + b;
      // One minus sign throughout: mixing U+2212 in the prompt with an ASCII
      // hyphen in the options reads as two different symbols on the page.
      const neg = (v: number) => (v < 0 ? `−${Math.abs(v)}` : String(v));
      const key = `x ≥ ${neg(n)}`;
      const wrong = [`x ≤ ${neg(n)}`, `x ≥ ${neg(-n)}`, `x ≤ ${neg(-n)}`];
      return {
        format: 'mcq',
        prompt: `Which of the following is equivalent to −${a}x + ${b} ≤ ${neg(c)}?`,
        ...makeChoices(rng, key, wrong, [
          'Divided by a negative number without reversing the inequality sign — the single most common error in this topic.',
          'Reversed the sign correctly but lost the sign of the boundary value.',
          'Neither reversed the inequality nor tracked the sign of the boundary.',
        ]),
        explanation: `Subtract ${b} from both sides: −${a}x ≤ ${c - b}. Now divide by −${a}. Dividing by a negative number reverses the direction of the inequality, giving x ≥ ${n}. Test x = ${n + 1}: −${a}(${n + 1}) + ${b} = ${-a * (n + 1) + b}, which is less than ${c}, so the inequality holds — confirming the direction.`,
      };
    },
  },
];
