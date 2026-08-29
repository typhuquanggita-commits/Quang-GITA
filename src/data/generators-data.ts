/**
 * Problem-Solving and Data Analysis generators.
 *
 * Seven skills, and three of them held a single item before this file existed:
 * two-variable data, inference from sample statistics, and evaluating
 * statistical claims. Those three are also where the SAT's hardest reasoning
 * lives, because the failure mode is not arithmetic — it is concluding more
 * than the data licenses.
 *
 * So the distractors here are mostly *true statements that the study does not
 * support*. A distractor that is simply false teaches nothing about statistical
 * reasoning; one that is plausible, popular, and unsupported teaches exactly
 * the thing the topic exists to teach.
 */

import { makeChoices, randInt, pick, type Generator } from './generator-kit.ts';

export const DATA_GENERATORS: Generator[] = [
  /* ================= Ratios, rates, proportions, units ================= */

  {
    id: 'gen_rate_med',
    skill: 'ratios-rates-units',
    domain: 'problem-solving-data',
    band: 'medium',
    irt: { a: 1.15, b: 0.15 },
    targetSeconds: 75,
    build({ rng }) {
      const perMin = randInt(rng, 3, 12);
      const minutes = randInt(rng, 20, 90);
      const key = String(perMin * minutes);
      const wrong = [
        String(perMin * 60),
        String(Math.round(minutes / perMin)),
        String(perMin * minutes * 60),
      ];
      return {
        format: 'mcq',
        prompt: `A machine fills ${perMin} bottles per minute. At this rate, how many bottles does it fill in ${minutes} minutes?`,
        ...makeChoices(rng, key, wrong, [
          'Converted to an hour that the question did not ask about.',
          'Divided instead of multiplying, inverting the rate.',
          'Multiplied by 60 as well, mixing minutes and hours in the same calculation.',
        ]),
        explanation: `The rate is ${perMin} bottles per minute, so bottles = ${perMin} × ${minutes} = ${perMin * minutes}. Writing the units as a fraction makes it check itself: (${perMin} bottles / 1 minute) × ${minutes} minutes leaves bottles, and minutes cancel. Units that do not cancel mean the setup is wrong before any arithmetic happens.`,
      };
    },
  },

  {
    id: 'gen_rate_hard',
    skill: 'ratios-rates-units',
    domain: 'problem-solving-data',
    band: 'hard',
    irt: { a: 1.25, b: 1.1 },
    targetSeconds: 95,
    build({ rng }) {
      const cmPerMetre = 100;
      const metres = randInt(rng, 2, 9);
      const perCm = randInt(rng, 2, 8);
      const key = String(metres * cmPerMetre * perCm);
      const wrong = [
        String(metres * perCm),
        String(metres * cmPerMetre),
        String((metres * cmPerMetre) / perCm),
      ];
      return {
        format: 'mcq',
        prompt: `A ribbon is ${metres} metres long. Each decoration uses ${perCm} centimetres of ribbon per centimetre of width, and the ribbon is 1 centimetre wide. How many centimetres of decorative thread are needed for the whole ribbon? (1 metre = 100 centimetres.)`,
        ...makeChoices(rng, key, wrong, [
          'Skipped the metre-to-centimetre conversion entirely.',
          'Converted the units but never applied the per-centimetre rate.',
          'Divided by the rate rather than multiplying by it.',
        ]),
        explanation: `Convert first, then apply the rate: ${metres} m × 100 cm/m = ${metres * cmPerMetre} cm of ribbon, and ${metres * cmPerMetre} cm × ${perCm} = ${metres * cmPerMetre * perCm} cm of thread. Chaining the conversions as fractions and cancelling units on paper is what makes a two-step conversion reliable; tracking them mentally is where the factor of 100 goes missing.`,
      };
    },
  },

  /* ================= Percentages ================= */

  {
    id: 'gen_percent_easy',
    skill: 'percentages',
    domain: 'problem-solving-data',
    band: 'easy',
    irt: { a: 1.0, b: -0.85 },
    targetSeconds: 50,
    build({ rng }) {
      const pct = pick(rng, [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80]);
      const base = pick(rng, [20, 40, 60, 80, 120, 140, 160, 180, 200, 240, 300, 360, 400, 500]);
      const key = String((base * pct) / 100);
      const wrong = [String(base - pct), String(base * pct), String(Math.round(base / pct))];
      return {
        format: 'mcq',
        prompt: `What is ${pct}% of ${base}?`,
        ...makeChoices(rng, key, wrong, [
          'Subtracted the percentage as if it were a quantity rather than a proportion.',
          'Multiplied by the percentage without converting it to a decimal first.',
          'Divided by the percentage instead of multiplying by it.',
        ]),
        explanation: `Convert to a decimal and multiply: ${pct}% = ${pct / 100}, so ${pct / 100} × ${base} = ${(base * pct) / 100}. The word "of" is always multiplication. Converting to a decimal first removes the factor-of-100 errors that come from working in percent.`,
      };
    },
  },

  {
    id: 'gen_percent_hard',
    skill: 'percentages',
    domain: 'problem-solving-data',
    band: 'hard',
    irt: { a: 1.3, b: 1.15 },
    targetSeconds: 95,
    build({ rng }) {
      const up = pick(rng, [5, 10, 15, 20, 25, 30, 40, 50]);
      const down = pick(rng, [5, 10, 15, 20, 25, 30, 40, 50]);
      const factor = (1 + up / 100) * (1 - down / 100);
      const net = Math.round((factor - 1) * 1000) / 10; // one decimal place
      const key = net === 0 ? 'It is unchanged' : `It ${net > 0 ? 'increases' : 'decreases'} by ${Math.abs(net)}%`;
      const wrong = [
        up === down ? `It increases by ${up - down + 1}%` : `It ${up > down ? 'increases' : 'decreases'} by ${Math.abs(up - down)}%`,
        `It increases by ${up + down}%`,
        'It is unchanged, because the two percentages are applied to the same quantity',
      ].filter((w) => w !== key);
      return {
        format: 'mcq',
        prompt: `The price of an item is increased by ${up}% and the new price is then decreased by ${down}%. How does the final price compare with the original price?`,
        ...makeChoices(rng, key, wrong.slice(0, 3), [
          'Subtracted the percentages. Successive changes multiply; they do not add or subtract.',
          'Added the percentages, which would describe two increases rather than an increase and a decrease.',
          'Assumed the two changes cancel. They do not, because the decrease is applied to the larger, already-increased price.',
        ]),
        explanation: `Successive percentage changes multiply: the final price is (1 + ${up}/100)(1 − ${down}/100) = ${factor.toFixed(4)} times the original. That is a change of ${net}%. The two changes do not cancel even when the percentages are equal, because the decrease acts on the *increased* price, which is a larger base.`,
      };
    },
  },

  /* ================= One-variable data ================= */

  {
    id: 'gen_onevar_easy',
    skill: 'one-variable-data',
    domain: 'problem-solving-data',
    band: 'easy',
    irt: { a: 1.0, b: -0.75 },
    targetSeconds: 55,
    build({ rng }) {
      const values = Array.from({ length: 5 }, () => randInt(rng, 2, 20)).sort((a, b) => a - b);
      const median = values[2];
      const mean = Math.round((values.reduce((a, b) => a + b, 0) / 5) * 10) / 10;
      const key = String(median);
      const wrong = [String(mean), String(values[0]), String(values[4])];
      return {
        format: 'mcq',
        prompt: `What is the median of the data set ${values.join(', ')}?`,
        ...makeChoices(rng, key, wrong, [
          'Computed the mean. The median is the middle value once the data are ordered, not the average.',
          'Reported the smallest value rather than the middle one.',
          'Reported the largest value rather than the middle one.',
        ]),
        explanation: `The values in order are ${values.join(', ')}. With five values the median is the third, which is ${median}. The mean here is ${mean} — close, but a different statistic, and the gap between them widens as soon as an outlier appears.`,
      };
    },
  },

  {
    id: 'gen_onevar_hard',
    skill: 'one-variable-data',
    domain: 'problem-solving-data',
    band: 'hard',
    irt: { a: 1.25, b: 1.05 },
    targetSeconds: 90,
    build({ rng }) {
      const base = Array.from({ length: 7 }, () => randInt(rng, 10, 20)).sort((a, b) => a - b);
      const outlier = randInt(rng, 90, 200);
      const key = 'The mean increases and the median is unchanged';
      const wrong = [
        'Both the mean and the median increase substantially',
        'The median increases and the mean is unchanged',
        'Neither the mean nor the median changes',
      ];
      return {
        format: 'mcq',
        prompt: `A data set consists of the values ${base.join(', ')}. A new value of ${outlier} is added to the set. Which statement best describes the effect on the mean and the median?`,
        ...makeChoices(rng, key, wrong, [
          'The median barely moves: it is a position in the ordered list, so one extreme value shifts it by at most one place.',
          'Reverses the two. The mean is the statistic that responds to the size of a value; the median responds only to its position.',
          'Adding a value well above every existing value must raise the mean.',
        ]),
        explanation: `The mean is the total divided by the count, so a value far above the rest pulls it up sharply. The median is a *position* in the ordered list; adding one value at the top shifts that position by at most one place among values that are all close together, so it barely moves. This asymmetry — the median resisting outliers, the mean not — is the whole point of reporting both.`,
      };
    },
  },

  /* ================= Two-variable data ================= */

  {
    id: 'gen_twovar_easy',
    skill: 'two-variable-data',
    domain: 'problem-solving-data',
    band: 'easy',
    irt: { a: 1.0, b: -0.7 },
    targetSeconds: 55,
    build({ rng }) {
      const m = randInt(rng, 2, 9);
      const b = randInt(rng, 5, 40);
      const x = randInt(rng, 3, 12);
      const key = String(m * x + b);
      const wrong = [String(m * x), String(m + b), String(b - m * x)];
      return {
        format: 'mcq',
        prompt: `The line of best fit for a scatterplot is given by y = ${m}x + ${b}. What value does the model predict for y when x = ${x}?`,
        ...makeChoices(rng, key, wrong, [
          'Applied the slope but dropped the intercept.',
          'Added the slope to the intercept instead of evaluating at the given x.',
          'Subtracted rather than added, reversing the direction of the relationship.',
        ]),
        explanation: `A line of best fit is used exactly like any other line: substitute. y = ${m}(${x}) + ${b} = ${m * x + b}. The prediction comes from the model, not from any individual plotted point — the question is about the line, and the points are what the line was drawn through.`,
      };
    },
  },

  {
    id: 'gen_twovar_med',
    skill: 'two-variable-data',
    domain: 'problem-solving-data',
    band: 'medium',
    irt: { a: 1.2, b: 0.25 },
    targetSeconds: 80,
    build({ rng }) {
      const m = randInt(rng, 2, 8);
      const unit = pick(rng, ['hour', 'week', 'kilometre', 'degree']);
      const yUnit = pick(rng, ['dollars', 'grams', 'points', 'litres']);
      const key = `The predicted increase in ${yUnit} for each additional ${unit}`;
      const wrong = [
        `The predicted number of ${yUnit} when the number of ${unit}s is zero`,
        `The total number of ${yUnit} across all the data`,
        `The number of ${unit}s needed for the ${yUnit} to reach zero`,
      ];
      return {
        format: 'mcq',
        prompt: `A line of best fit is given by y = ${m}x + ${randInt(rng, 10, 60)}, where x is measured in ${unit}s and y in ${yUnit}. What is the best interpretation of the slope ${m}?`,
        ...makeChoices(rng, key, wrong, [
          'That is the intercept, the value when x is zero, not the slope.',
          'A slope is a rate of change, not a total.',
          'That would be an x-intercept, and it is not what a slope reports.',
        ]),
        explanation: `A slope is a rate: the change in y for a one-unit change in x. Here that is ${m} ${yUnit} per ${unit}. Stating it with both units attached is what separates it from the intercept, which is a single value rather than a rate.`,
      };
    },
  },

  {
    id: 'gen_twovar_hard',
    skill: 'two-variable-data',
    domain: 'problem-solving-data',
    band: 'hard',
    irt: { a: 1.3, b: 1.2 },
    targetSeconds: 95,
    build({ rng }) {
      const lo = randInt(rng, 1, 5);
      const hi = lo + randInt(rng, 8, 20);
      const outside = hi + randInt(rng, 10, 30);
      const key = `The value ${outside} lies outside the range of the data, so the prediction is an extrapolation and may not be reliable`;
      const wrong = [
        `The model can be used for any value of x, since it is a line`,
        `The model cannot be used because the relationship is not exactly linear`,
        `The prediction is reliable because the line of best fit minimises the total error`,
      ];
      return {
        format: 'mcq',
        prompt: `A scatterplot contains data for values of x between ${lo} and ${hi}, and a line of best fit is drawn. A researcher uses the line to predict y when x = ${outside}. Which of the following is the best evaluation of this prediction?`,
        ...makeChoices(rng, key, wrong, [
          'A line continues mathematically, but the evidence for the relationship does not extend past the data that were collected.',
          'No model fits observed data exactly; that alone does not disqualify it within the observed range.',
          'The fit is optimised over the observed data only, which says nothing about behaviour beyond them.',
        ]),
        explanation: `The data cover x from ${lo} to ${hi}. Predicting at x = ${outside} is extrapolation: the line can be evaluated there, but nothing in the data supports the claim that the relationship continues. Interpolation inside the observed range is supported; extrapolation outside it is an assumption, and questions of this type test whether the distinction is being made.`,
      };
    },
  },

  /* ================= Probability ================= */

  {
    id: 'gen_prob_easy',
    skill: 'probability',
    domain: 'problem-solving-data',
    band: 'easy',
    irt: { a: 1.0, b: -0.8 },
    targetSeconds: 55,
    build({ rng }) {
      const wanted = randInt(rng, 2, 9);
      const other = randInt(rng, 3, 15);
      const total = wanted + other;
      const key = `${wanted}/${total}`;
      const wrong = [`${wanted}/${other}`, `${other}/${total}`, `${total}/${wanted}`];
      return {
        format: 'mcq',
        prompt: `A bag contains ${wanted} red marbles and ${other} blue marbles. If one marble is selected at random, what is the probability that it is red?`,
        ...makeChoices(rng, key, wrong, [
          'Used the other colour as the denominator instead of the total. A probability is a part of the whole, not a ratio of one part to another.',
          'Reported the probability of the other outcome.',
          'Inverted the fraction, giving a value greater than 1 — which no probability can be.',
        ]),
        explanation: `There are ${total} marbles in total and ${wanted} of them are red, so the probability is ${wanted}/${total}. Find the denominator first: the question determines what the whole is, and the numerator follows from it. A probability above 1 is always a sign the wrong denominator was used.`,
      };
    },
  },

  {
    id: 'gen_prob_hard',
    skill: 'probability',
    domain: 'problem-solving-data',
    band: 'hard',
    irt: { a: 1.3, b: 1.15 },
    targetSeconds: 95,
    build({ rng }) {
      const aYes = randInt(rng, 20, 60);
      const aNo = randInt(rng, 10, 50);
      const bYes = randInt(rng, 15, 55);
      const bNo = randInt(rng, 10, 45);
      const rowTotal = aYes + aNo;
      const grand = rowTotal + bYes + bNo;
      const key = `${aYes}/${rowTotal}`;
      const wrong = [`${aYes}/${grand}`, `${aYes}/${aYes + bYes}`, `${rowTotal}/${grand}`];
      return {
        format: 'mcq',
        prompt: `In a survey, ${aYes} of ${rowTotal} students in Group A answered yes, and ${bYes} of ${bYes + bNo} students in Group B answered yes. If a student is selected at random from among those in Group A, what is the probability that the student answered yes?`,
        ...makeChoices(rng, key, wrong, [
          `Used the whole survey of ${grand} students as the denominator. The phrase "from among those in Group A" restricts it to that group.`,
          'Used the total number of yes answers as the denominator, which answers a different conditional question.',
          'Reported the proportion of the survey that Group A represents, not the proportion within Group A.',
        ]),
        explanation: `The selection is made "from among those in Group A", so the denominator is the size of Group A: ${rowTotal}. Of those, ${aYes} answered yes, giving ${aYes}/${rowTotal}. A conditional phrase narrows the denominator to the named subgroup — identifying it before touching the numerator is what makes these questions quick rather than confusing.`,
      };
    },
  },

  /* ================= Inference from sample statistics ================= */

  {
    id: 'gen_infer_easy',
    skill: 'inference-statistics',
    domain: 'problem-solving-data',
    band: 'easy',
    irt: { a: 1.05, b: -0.6 },
    targetSeconds: 60,
    build({ rng }) {
      const mean = randInt(rng, 20, 80);
      const moe = randInt(rng, 2, 8);
      const key = `Between ${mean - moe} and ${mean + moe}`;
      const wrong = [
        `Exactly ${mean}`,
        `Between ${mean - moe * 2} and ${mean + moe * 2}`,
        `Greater than ${mean + moe}`,
      ];
      return {
        format: 'mcq',
        prompt: `A random sample gives an estimated mean of ${mean} with a margin of error of ${moe}. Which of the following is the most appropriate conclusion about the population mean?`,
        ...makeChoices(rng, key, wrong, [
          'A point estimate from a sample is never exact; the margin of error exists precisely to say so.',
          'Doubled the margin of error, widening the interval beyond what was reported.',
          'A margin of error gives an interval around the estimate, not a one-sided bound.',
        ]),
        explanation: `The margin of error defines an interval around the estimate: ${mean} ± ${moe}, that is, from ${mean - moe} to ${mean + moe}. The interval is the estimate; the single number in the middle is not. A larger sample would narrow this interval without necessarily moving its centre.`,
      };
    },
  },

  {
    id: 'gen_infer_med',
    skill: 'inference-statistics',
    domain: 'problem-solving-data',
    band: 'medium',
    irt: { a: 1.2, b: 0.3 },
    targetSeconds: 80,
    build({ rng }) {
      const n1 = pick(rng, [80, 100, 120, 150, 200, 250, 300, 400, 500]);
      const n2 = n1 * pick(rng, [2, 3, 4, 5]);
      const key = 'The margin of error would decrease';
      const wrong = [
        'The margin of error would increase',
        'The margin of error would stay the same',
        'The estimated mean would necessarily increase',
      ];
      return {
        format: 'mcq',
        prompt: `A study estimates a population mean using a random sample of ${n1} people. If the study were repeated with a random sample of ${n2} people from the same population, what would most likely happen to the margin of error?`,
        ...makeChoices(rng, key, wrong, [
          'Reverses the relationship. More data makes an estimate more precise, not less.',
          'Sample size is the main thing under a researcher’s control that changes precision.',
          'A larger sample changes the precision of the estimate, not the direction of its value.',
        ]),
        explanation: `Margin of error shrinks as sample size grows — the estimate becomes more precise. Going from ${n1} to ${n2} would narrow the interval. What it would *not* do is predictably move the centre of the interval: precision and value are different properties, and confusing them is the error this item screens for.`,
      };
    },
  },

  {
    id: 'gen_infer_hard',
    skill: 'inference-statistics',
    domain: 'problem-solving-data',
    band: 'hard',
    irt: { a: 1.3, b: 1.2 },
    targetSeconds: 95,
    build({ rng }) {
      const group = pick(rng, [
        'gym members',
        'magazine subscribers',
        'conference attendees',
        'residents of one apartment block',
      ]);
      const n = randInt(rng, 150, 900);
      const key = `Only to the ${group} from whom the sample was drawn`;
      const wrong = [
        'To all adults in the country',
        'To all adults in the country, because the sample size is large',
        'To no population at all, since the sample was not a census',
      ];
      return {
        format: 'mcq',
        prompt: `Researchers randomly selected ${n} ${group} and surveyed them. To which population can the results be generalised?`,
        ...makeChoices(rng, key, wrong, [
          'The sample was random within a specific group, so it says nothing about people outside that group.',
          'Sample size does not repair a sampling frame. A large sample of one group is still a sample of that group.',
          'A random sample does support inference — but only about the population it was drawn from.',
        ]),
        explanation: `Random selection licenses generalisation to the population that was actually sampled, and no further. The sample here was drawn from ${group}, so the conclusion extends to that group. Increasing the sample size makes the estimate more precise about *that* group; it never widens which group the estimate is about.`,
      };
    },
  },

  /* ================= Evaluating statistical claims ================= */

  {
    id: 'gen_claims_easy',
    skill: 'statistical-claims',
    domain: 'problem-solving-data',
    band: 'easy',
    irt: { a: 1.05, b: -0.55 },
    targetSeconds: 60,
    build({ rng }) {
      const setting = pick(rng, [
        'a shopping centre', 'a university library', 'an online forum', 'a sports stadium',
        'a farmers’ market', 'a commuter rail platform', 'a public swimming pool',
        'a community noticeboard', 'a hospital waiting room', 'a music festival',
      ]);
      const claim = pick(rng, [
        'most adults in the city hold a particular view',
        'the city’s residents overwhelmingly support a proposed policy',
        'a majority of the city’s households have changed a daily habit',
        'residents of the city are more satisfied than they were five years ago',
      ]);
      const key = 'The participants were not randomly selected from the population of interest';
      const wrong = [
        'The sample was too small to detect any difference',
        'The survey questions were written by the researchers',
        'The results were reported as percentages rather than counts',
      ];
      return {
        format: 'mcq',
        prompt: `A researcher surveyed people who volunteered at ${setting} and concluded that ${claim}. What is the most serious problem with this conclusion?`,
        ...makeChoices(rng, key, wrong, [
          'Sample size is not the issue here; a larger self-selected sample would have the same flaw.',
          'Researchers normally write their own questions; that alone is not a design flaw.',
          'The choice of reporting format does not affect whether the conclusion generalises.',
        ]),
        explanation: `People who volunteer at ${setting} are not a random sample of adults in the city, so the results describe volunteers rather than the city. Non-random selection blocks generalisation regardless of how many people responded — reading the selection method before the results is what catches this.`,
      };
    },
  },

  {
    id: 'gen_claims_med',
    skill: 'statistical-claims',
    domain: 'problem-solving-data',
    band: 'medium',
    irt: { a: 1.2, b: 0.3 },
    targetSeconds: 80,
    build({ rng }) {
      const treatment = pick(rng, [
        'a new study technique', 'a daily exercise routine', 'a revised diet', 'a sleep schedule',
        'a meditation programme', 'a language-learning app', 'a note-taking method',
        'a morning reading habit', 'a structured revision timetable', 'a peer-tutoring scheme',
      ]);
      const outcome = pick(rng, ['scored higher', 'reported better concentration', 'completed more coursework', 'attended more sessions']);
      const key = 'No, because the participants chose for themselves whether to take part in the programme';
      const wrong = [
        'Yes, because the two groups were compared directly',
        'Yes, because the difference between the groups was large',
        'No, because the study did not report a margin of error',
      ];
      return {
        format: 'mcq',
        prompt: `Participants who chose to follow ${treatment} ${outcome} compared with those who did not. Can the researchers conclude that the programme caused the difference?`,
        ...makeChoices(rng, key, wrong, [
          'Comparing two groups shows an association; it does not establish which way the causation runs, or whether something else explains both.',
          'A large difference is still a difference between two groups that may have differed to begin with.',
          'A margin of error concerns precision, not whether a causal conclusion is licensed.',
        ]),
        explanation: `Participants selected themselves into the groups, so the groups may have differed before the programme began — in motivation, in prior ability, in available time. A causal conclusion requires *random assignment* to the groups, which is what makes them comparable. Random selection supports generalisation; random assignment supports causation. They are different conditions, and this question turns on the difference.`,
      };
    },
  },

  {
    id: 'gen_claims_hard',
    skill: 'statistical-claims',
    domain: 'problem-solving-data',
    band: 'hard',
    irt: { a: 1.3, b: 1.25 },
    targetSeconds: 100,
    build({ rng }) {
      const n = randInt(rng, 200, 800);
      const key = 'A causal conclusion about the sampled population, because participants were randomly assigned and randomly selected from it';
      const wrong = [
        'A causal conclusion about all adults, because the sample was large',
        'An association within the sampled population only, because no experiment can establish cause',
        'Neither, because the sample was drawn from a single population',
      ];
      return {
        format: 'mcq',
        prompt: `Researchers randomly selected ${n} volunteers from a defined population and then randomly assigned each to one of two treatments. Which conclusion is best supported?`,
        ...makeChoices(rng, key, wrong, [
          'Random selection from a defined population supports generalisation to that population, not beyond it, whatever the sample size.',
          'Random assignment is exactly what licenses a causal conclusion; a well-run experiment does establish cause.',
          'Both conditions were met, so both kinds of inference are supported — within the population sampled.',
        ]),
        explanation: `Both randomisations are present, and each licenses a different thing. Random *assignment* to treatments makes the groups comparable, which supports a causal conclusion. Random *selection* from the defined population supports generalising to that population. Together they give a causal claim about that population — and nothing about any population that was not sampled.`,
      };
    },
  },
];
