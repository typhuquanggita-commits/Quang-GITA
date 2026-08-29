/**
 * Advanced Math generators: equivalent expressions, nonlinear equations and
 * systems, nonlinear functions.
 *
 * The difficulty ladder here is about what the learner must decide, not about
 * how much they must compute. An easy quadratic factors on sight; a hard one
 * asks for the number of solutions, which is answered by the discriminant and
 * ruined by solving. That distinction is the point of the topic, so the items
 * are built to reward it.
 */

import { makeChoices, randInt, pick, type Generator } from './generator-kit.ts';

export const ADVANCED_GENERATORS: Generator[] = [
  /* ================= Equivalent expressions ================= */

  {
    id: 'gen_equiv_easy',
    skill: 'equivalent-expressions',
    domain: 'advanced-math',
    band: 'easy',
    irt: { a: 1.0, b: -0.85 },
    targetSeconds: 55,
    build({ rng }) {
      const a = randInt(rng, 2, 9);
      const b = randInt(rng, 2, 9);
      const key = `x² + ${a + b}x + ${a * b}`;
      const wrong = [
        `x² + ${a * b}x + ${a + b}`,
        `x² + ${a + b}x − ${a * b}`,
        `x² + ${a}x + ${b}`,
      ];
      return {
        format: 'mcq',
        prompt: `Which expression is equivalent to (x + ${a})(x + ${b})?`,
        ...makeChoices(rng, key, wrong, [
          'Swapped the sum and the product: the middle coefficient is the sum of the two numbers, and the constant is their product.',
          'Correct terms but a sign error on the constant; two positive numbers multiply to a positive product.',
          'Copied the two numbers into the expression without multiplying or adding them.',
        ]),
        explanation: `Expanding gives x² + ${b}x + ${a}x + ${a * b} = x² + ${a + b}x + ${a * b}. The middle coefficient is the sum ${a} + ${b} = ${a + b} and the constant is the product ${a} × ${b} = ${a * b}. Checking at x = 1: (1 + ${a})(1 + ${b}) = ${(1 + a) * (1 + b)}, and 1 + ${a + b} + ${a * b} = ${1 + a + b + a * b}.`,
      };
    },
  },

  {
    id: 'gen_equiv_med',
    skill: 'equivalent-expressions',
    domain: 'advanced-math',
    band: 'medium',
    irt: { a: 1.15, b: 0.2 },
    targetSeconds: 75,
    build({ rng }) {
      const a = randInt(rng, 2, 12);
      const b = randInt(rng, 2, 14);
      // (ax + b)(ax − b) = a²x² − b²
      const key = `${a * a}x² − ${b * b}`;
      const wrong = [
        `${a * a}x² + ${b * b}`,
        `${a * a}x² − ${2 * a * b}x − ${b * b}`,
        `${2 * a}x² − ${b * b}`,
      ];
      return {
        format: 'mcq',
        prompt: `Which expression is equivalent to (${a}x + ${b})(${a}x − ${b})?`,
        ...makeChoices(rng, key, wrong, [
          'Sign error on the constant. Multiplying +b by −b gives a negative product.',
          'Kept a middle term. In a difference of squares the two middle terms cancel exactly.',
          'Added the leading coefficients instead of multiplying them.',
        ]),
        explanation: `This is a difference of squares. The middle terms are −${a * b}x and +${a * b}x, which cancel, leaving (${a}x)² − (${b})² = ${a * a}x² − ${b * b}. Recognising the pattern removes three of the four multiplications; expanding term by term reaches the same place more slowly.`,
      };
    },
  },

  {
    id: 'gen_equiv_hard',
    skill: 'equivalent-expressions',
    domain: 'advanced-math',
    band: 'hard',
    irt: { a: 1.25, b: 1.1 },
    targetSeconds: 95,
    build({ rng }) {
      const a = randInt(rng, 2, 12);
      const b = randInt(rng, 2, 15);
      // (x² − b²) / (x + b) = x − b, for x ≠ −b
      const key = `x − ${b}`;
      const wrong = [`x + ${b}`, `x² − ${b}`, `−${b}`];
      return {
        format: 'mcq',
        prompt: `For x ≠ −${b}, which expression is equivalent to (x² − ${b * b}) / (x + ${b})?`,
        ...makeChoices(rng, key, wrong, [
          'Cancelled the wrong factor. The numerator factors as (x + b)(x − b); dividing by (x + b) leaves the other factor.',
          'Cancelled the squared term across the sum, which is never valid — only common factors cancel, never terms.',
          'Cancelled x against x², leaving only the constants.',
        ]),
        explanation: `Factor the numerator first: x² − ${b * b} = (x + ${b})(x − ${b}). Dividing by (x + ${b}) leaves x − ${b}. Nothing may be cancelled until both parts are fully factored — cancelling a term across a sum is the error this item is built to catch. Testing x = ${a}: (${a * a} − ${b * b}) / (${a} + ${b}) = ${(a * a - b * b) / (a + b)} = ${a} − ${b}.`,
      };
    },
  },

  /* ================= Nonlinear equations and systems ================= */

  {
    id: 'gen_quad_easy',
    skill: 'nonlinear-equations',
    domain: 'advanced-math',
    band: 'easy',
    irt: { a: 1.05, b: -0.7 },
    targetSeconds: 60,
    build({ rng }) {
      const r = randInt(rng, 2, 25);
      const key = String(r);
      const wrong = [String(r * r), String(-r), String(Math.round(r / 2))];
      return {
        format: 'mcq',
        prompt: `If x² = ${r * r} and x > 0, what is the value of x?`,
        ...makeChoices(rng, key, wrong, [
          'Squared instead of taking the square root, applying the operation in the wrong direction.',
          'Took the negative root. The condition x > 0 rules it out.',
          'Halved the number instead of taking its square root.',
        ]),
        explanation: `x² = ${r * r} has two solutions, x = ${r} and x = −${r}. The condition x > 0 selects x = ${r}. The stated condition exists precisely to make the answer unique, so it must be read — an equation with a square always has two roots unless something narrows it.`,
      };
    },
  },

  {
    id: 'gen_quad_hard',
    skill: 'nonlinear-equations',
    domain: 'advanced-math',
    band: 'hard',
    irt: { a: 1.3, b: 1.2 },
    targetSeconds: 100,
    build({ rng }) {
      // Exactly one solution ⇒ discriminant zero ⇒ c = b²/(4a).
      const a = pick(rng, [1, 2, 3, 4, 5, 6]);
      const half = randInt(rng, 2, 14);
      const b = 2 * a * half; // ensures b²/(4a) is an integer
      const c = (b * b) / (4 * a);
      const key = String(c);
      const wrong = [String(b), String(a * b), String(c + 1)];
      return {
        format: 'mcq',
        prompt: `In the equation ${a}x² + ${b}x + c = 0, c is a constant. For what value of c does the equation have exactly one real solution?`,
        ...makeChoices(rng, key, wrong, [
          'Reported a coefficient from the equation rather than deriving the condition on c.',
          'Multiplied two coefficients together instead of using the discriminant.',
          'Off by one: any larger value makes the discriminant negative and gives no real solutions at all.',
        ]),
        explanation: `Exactly one real solution means the discriminant is zero: b² − 4ac = 0, so ${b}² − 4(${a})c = 0 and c = ${b * b} / ${4 * a} = ${c}. Solving the equation is unnecessary and slower — the question asks how many solutions there are, and the discriminant answers that directly.`,
      };
    },
  },

  /* ================= Nonlinear functions ================= */

  {
    id: 'gen_nonlinfn_easy',
    skill: 'nonlinear-functions',
    domain: 'advanced-math',
    band: 'easy',
    irt: { a: 1.0, b: -0.8 },
    targetSeconds: 55,
    build({ rng }) {
      const a = randInt(rng, 1, 4);
      const c = randInt(rng, 1, 12);
      const x = randInt(rng, 2, 6);
      const key = String(a * x * x + c);
      const wrong = [String(a * x * 2 + c), String((a * x) ** 2 + c), String(a * x * x)];
      return {
        format: 'mcq',
        prompt: `The function g is defined by g(x) = ${a}x² + ${c}. What is the value of g(${x})?`,
        ...makeChoices(rng, key, wrong, [
          'Doubled the input instead of squaring it.',
          'Squared the coefficient along with the variable. Only x is squared, not the product.',
          'Squared and scaled correctly but dropped the constant.',
        ]),
        explanation: `Substitute: g(${x}) = ${a}(${x})² + ${c} = ${a}(${x * x}) + ${c} = ${a * x * x + c}. The exponent applies to x alone; the coefficient multiplies the result afterwards.`,
      };
    },
  },

  {
    id: 'gen_nonlinfn_med',
    skill: 'nonlinear-functions',
    domain: 'advanced-math',
    band: 'medium',
    irt: { a: 1.15, b: 0.2 },
    targetSeconds: 80,
    build({ rng }) {
      const r1 = randInt(rng, 1, 12);
      const r2 = r1 + randInt(rng, 2, 11);
      const axis = (r1 + r2) / 2;
      const key = String(axis);
      const wrong = [String(r1), String(r2), String(r1 + r2)];
      return {
        format: 'mcq',
        prompt: `The graph of y = (x − ${r1})(x − ${r2}) is a parabola in the xy-plane. What is the x-coordinate of its vertex?`,
        ...makeChoices(rng, key, wrong, [
          'Reported one of the x-intercepts rather than the point midway between them.',
          'Reported the other x-intercept, for the same reason.',
          'Added the intercepts without halving, so the answer is twice the axis of symmetry.',
        ]),
        explanation: `In factored form the x-intercepts are ${r1} and ${r2}. A parabola is symmetric about the vertical line midway between its intercepts, so the vertex sits at x = (${r1} + ${r2}) / 2 = ${axis}. Reading the intercepts off the factored form is why that form was given — expanding first and using −b/2a reaches the same answer with more work.`,
      };
    },
  },

  {
    id: 'gen_growth_med',
    skill: 'nonlinear-functions',
    domain: 'advanced-math',
    band: 'medium',
    irt: { a: 1.2, b: 0.35 },
    targetSeconds: 80,
    build({ rng }) {
      const start = pick(rng, [120, 150, 200, 250, 300, 400, 500, 600, 750, 800, 1000, 1200, 1500, 2000]);
      const pct = pick(rng, [3, 4, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50]);
      const key = `${start}(${(1 + pct / 100).toFixed(2)})^t`;
      const wrong = [
        `${start}(${(1 - pct / 100).toFixed(2)})^t`,
        `${start}(${pct / 100})^t`,
        `${start} + ${pct}t`,
      ];
      return {
        format: 'mcq',
        prompt: `A population of ${start} bacteria increases by ${pct}% each hour. Which function models the population after t hours?`,
        ...makeChoices(rng, key, wrong, [
          'Modelled a decrease. A base below 1 shrinks the quantity each period.',
          'Used the rate itself as the base rather than 1 plus the rate, which would destroy most of the population each hour.',
          'Modelled a constant increase of a fixed amount, which is linear growth, not percentage growth.',
        ]),
        explanation: `Growth by a fixed percentage is exponential, not linear: each hour the population is multiplied by 1 + ${pct}/100 = ${(1 + pct / 100).toFixed(2)}. After t hours the model is ${start}(${(1 + pct / 100).toFixed(2)})^t. Reading the base tells you the story: above 1 is growth, below 1 is decay, and the distance from 1 is the rate.`,
      };
    },
  },
];
