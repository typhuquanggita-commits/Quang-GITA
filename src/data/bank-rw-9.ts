/**
 * Reading and Writing item bank — Command of Evidence: Quantitative.
 *
 * Every item carries a table or a figure, described declaratively so it renders
 * as an accessible element rather than as a picture nobody can read aloud.
 *
 * Two distractor families do the work here. One is a correct number under the
 * wrong label — the answer a student reaches by reading the data before the
 * axis. The other is a statement the figure cannot support: a cause, a
 * prediction, or a trend beyond the plotted range. A figure supports only what
 * it plots, and that is the whole skill.
 */

import type { Question } from '../types.ts';

export const RW_BANK_9: Question[] = [
  /* ================= Easy ================= */
  {
    id: 'rw_ceq_101', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'easy', irt: { a: 1.02, b: -1.1 }, targetSeconds: 68,
    stimulus: {
      text: 'A city recorded the number of trips taken on its bike-share scheme in four consecutive years. A transport officer summarised the figures for a committee.',
      table: { caption: 'Bike-share trips by year (thousands)', headers: ['Year', 'Trips'], rows: [['2022', '410'], ['2023', '505'], ['2024', '498'], ['2025', '640']] },
    },
    prompt: 'Which choice best describes data from the table that support the officer’s statement that use grew over the period as a whole despite a setback?',
    choices: [
      { id: 'A', text: 'Trips rose from 410 thousand in 2022 to 640 thousand in 2025, with a dip in 2024.' },
      { id: 'B', text: 'Trips rose every year between 2022 and 2025.' },
      { id: 'C', text: 'Trips fell from 505 thousand in 2023 to 498 thousand in 2024.' },
      { id: 'D', text: 'Trips in 2025 were more than twice the 2022 figure.' },
    ],
    answer: 'A',
    explanation: 'The statement has two parts — overall growth and a setback — so the supporting data must contain both. Choice A gives the endpoints and names the dip; the others give one half or misstate a figure.',
    distractorNotes: {
      B: 'Contradicted by the table: 2024 is lower than 2023.',
      C: 'True, and only the setback. It leaves the growth half of the statement unsupported.',
      D: 'False on the numbers: 640 is well short of twice 410.',
    },
  },
  {
    id: 'rw_ceq_102', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'easy', irt: { a: 1.0, b: -1.0 }, targetSeconds: 68,
    stimulus: {
      text: 'Researchers measured germination rates for four seed treatments.',
      table: { caption: 'Germination rate by treatment', headers: ['Treatment', 'Germinated (%)'], rows: [['Untreated', '31'], ['Soaked', '52'], ['Scarified', '68'], ['Soaked and scarified', '71']] },
    },
    prompt: 'Which choice best completes the statement that scarification contributed more to germination than soaking did?',
    choices: [
      { id: 'A', text: 'scarified seeds germinated at 68 percent against 52 percent for soaked seeds.' },
      { id: 'B', text: 'seeds given both treatments germinated at 71 percent.' },
      { id: 'C', text: 'untreated seeds germinated at only 31 percent.' },
      { id: 'D', text: 'no treatment produced germination above 75 percent.' },
    ],
    answer: 'A',
    explanation: 'The comparison named is between the two single treatments, so the supporting figures are the two single-treatment rows. 68 against 52 is the comparison, stated directly.',
    distractorNotes: {
      B: 'The combined treatment, which compares neither single treatment with the other.',
      C: 'The baseline. It shows both treatments help without ranking them.',
      D: 'A true ceiling observation that makes no comparison at all.',
    },
  },
  {
    id: 'rw_ceq_103', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'easy', irt: { a: 1.05, b: -0.92 }, targetSeconds: 69,
    stimulus: {
      text: 'A museum recorded visitor numbers for two exhibitions running in the same building.',
      table: { caption: 'Weekly visitors (thousands)', headers: ['Week', 'Exhibition A', 'Exhibition B'], rows: [['1', '12', '7'], ['2', '11', '9'], ['3', '9', '12'], ['4', '8', '15']] },
    },
    prompt: 'Which choice best describes data supporting the claim that the two exhibitions moved in opposite directions over the four weeks?',
    choices: [
      { id: 'A', text: 'A fell from 12 to 8 thousand while B rose from 7 to 15 thousand.' },
      { id: 'B', text: 'B overtook A in week 3.' },
      { id: 'C', text: 'Total visitors to the building rose from 19 to 23 thousand.' },
      { id: 'D', text: 'A received more visitors than B in the first two weeks.' },
    ],
    answer: 'A',
    explanation: 'Opposite directions is a claim about two trends, so both endpoints of both series are needed. Choice A supplies exactly that and nothing else.',
    distractorNotes: {
      B: 'A crossing point, which is consistent with many trend shapes and does not establish two directions.',
      C: 'A correct total under the wrong label: the claim is about the two series, not their sum.',
      D: 'A level comparison in a claim about change.',
    },
  },
  {
    id: 'rw_ceq_104', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'easy', irt: { a: 1.0, b: -0.85 }, targetSeconds: 69,
    stimulus: {
      text: 'A laboratory measured how long a battery chemistry held its charge at four temperatures.',
      table: { caption: 'Charge retained after 30 days', headers: ['Temperature (°C)', 'Charge retained (%)'], rows: [['0', '96'], ['20', '91'], ['40', '78'], ['60', '54']] },
    },
    prompt: 'Which choice best completes the statement that losses accelerate as temperature rises?',
    choices: [
      { id: 'A', text: 'retention falls by 5 points between 0 and 20 °C but by 24 points between 40 and 60 °C.' },
      { id: 'B', text: 'retention is highest at 0 °C and lowest at 60 °C.' },
      { id: 'C', text: 'retention remains above half at every temperature tested.' },
      { id: 'D', text: 'retention at 40 °C is 78 percent.' },
    ],
    answer: 'A',
    explanation: 'Acceleration is about the *rate* of loss changing, so the evidence must compare two intervals. Five points against twenty-four across equal temperature steps is precisely that comparison.',
    distractorNotes: {
      B: 'Establishes direction only. A steady decline would also satisfy it, and that is not acceleration.',
      C: 'A floor observation that says nothing about rate.',
      D: 'A single reading, which cannot show a change in rate.',
    },
  },
  {
    id: 'rw_ceq_105', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'easy', irt: { a: 1.05, b: -0.78 }, targetSeconds: 70,
    stimulus: {
      text: 'A study counted pollinator visits to a crop under three field-margin treatments.',
      table: { caption: 'Mean pollinator visits per hour', headers: ['Margin treatment', 'Visits'], rows: [['Mown grass', '4.2'], ['Wildflower strip', '11.6'], ['Bare soil', '2.1']] },
    },
    prompt: 'Which choice best supports the claim that the wildflower strip more than doubled visits relative to mown grass?',
    choices: [
      { id: 'A', text: 'Visits rose from 4.2 per hour with mown grass to 11.6 with a wildflower strip.' },
      { id: 'B', text: 'Bare soil produced the fewest visits, at 2.1 per hour.' },
      { id: 'C', text: 'The wildflower strip produced 11.6 visits per hour.' },
      { id: 'D', text: 'Mown grass produced twice as many visits as bare soil.' },
    ],
    answer: 'A',
    explanation: 'A doubling claim compares two named values, so both must appear. 4.2 against 11.6 is the comparison the claim asserts, and 11.6 is more than twice 4.2.',
    distractorNotes: {
      B: 'A different pair, and not the one named in the claim.',
      C: 'One value without the baseline, so no ratio can be read from it.',
      D: 'A true comparison between the wrong two treatments — the classic right-number-wrong-label error.',
    },
  },
  {
    id: 'rw_ceq_106', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'easy', irt: { a: 1.0, b: -0.7 }, targetSeconds: 70,
    stimulus: {
      text: 'A scatterplot shows the relationship between the number of rings in a tree core and the tree’s diameter for one species.',
      figure: { kind: 'scatter', alt: 'Scatterplot of tree diameter in centimetres against ring count, with points rising from about 10 centimetres at 20 rings to about 55 centimetres at 120 rings, and a fitted line through them.', xLabel: 'Ring count', yLabel: 'Diameter (cm)', points: [[20, 10], [40, 20], [60, 28], [80, 38], [100, 47], [120, 55]], line: { slope: 0.45, intercept: 1.5 } },
    },
    prompt: 'Which statement is best supported by the scatterplot?',
    choices: [
      { id: 'A', text: 'Trees with more rings tend to have larger diameters.' },
      { id: 'B', text: 'Ring count determines diameter in this species.' },
      { id: 'C', text: 'A tree with 200 rings would have a diameter of about 90 centimetres.' },
      { id: 'D', text: 'Diameter increases by exactly half a centimetre per ring.' },
    ],
    answer: 'A',
    explanation: 'A scatterplot shows association, and the points rise together across the plotted range. That is the claim the figure supports, stated with the tentativeness ("tend to") that observational data allow.',
    distractorNotes: {
      B: 'Causal language. A plot of two measured quantities cannot establish that one determines the other.',
      C: 'Extrapolation: 200 rings lies far beyond the plotted range of 20 to 120.',
      D: '"Exactly" overstates a fitted line through scattered points.',
    },
  },
  {
    id: 'rw_ceq_107', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'easy', irt: { a: 1.02, b: -0.62 }, targetSeconds: 70,
    stimulus: {
      text: 'A survey recorded how households in a town heat their homes.',
      table: { caption: 'Primary heating source (percent of households)', headers: ['Source', '2015', '2025'], rows: [['Gas', '64', '41'], ['Electric heat pump', '9', '34'], ['Oil', '18', '11'], ['Wood', '9', '14']] },
    },
    prompt: 'Which choice best completes the statement that the fall in gas heating was matched most closely by the rise in one alternative?',
    choices: [
      { id: 'A', text: 'gas fell 23 points while heat pumps rose 25 points.' },
      { id: 'B', text: 'oil fell 7 points over the same period.' },
      { id: 'C', text: 'wood rose from 9 to 14 percent.' },
      { id: 'D', text: 'gas remained the largest single source in 2025.' },
    ],
    answer: 'A',
    explanation: 'The statement asks which rise most closely matched the fall in gas. The fall is 23 points and heat pumps rose 25 — much closer than the 5-point rise in wood.',
    distractorNotes: {
      B: 'Another fall, not a rise, so it cannot match anything.',
      C: 'A genuine rise, but of 5 points against a 23-point fall.',
      D: 'True on the 2025 column, and about levels rather than about the change.',
    },
  },
  {
    id: 'rw_ceq_108', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'easy', irt: { a: 1.05, b: -0.55 }, targetSeconds: 71,
    stimulus: {
      text: 'A bar chart shows mean daily screen time reported by four age groups.',
      figure: { kind: 'bar', alt: 'Bar chart of mean daily screen time in hours for four age groups: 13 to 17 at 6.4 hours, 18 to 29 at 5.1, 30 to 49 at 4.3, and 50 and over at 2.9.', xLabel: 'Age group', yLabel: 'Hours per day', categories: ['13–17', '18–29', '30–49', '50+'], values: [6.4, 5.1, 4.3, 2.9] },
    },
    prompt: 'Which statement is best supported by the chart?',
    choices: [
      { id: 'A', text: 'Reported screen time decreases with each successive age group shown.' },
      { id: 'B', text: 'People spend less time on screens as they grow older.' },
      { id: 'C', text: 'The 13–17 group spends more than twice as long on screens as the 50+ group.' },
      { id: 'D', text: 'Screen time among teenagers has risen in recent years.' },
    ],
    answer: 'A',
    explanation: 'The four bars fall in order, and that is exactly what the chart shows. Choice A describes the plotted pattern without adding anything to it.',
    distractorNotes: {
      B: 'A claim about individuals changing over time from data comparing different groups at one time. Ageing and cohort are not the same thing.',
      C: '6.4 is not more than twice 2.9, so the arithmetic fails.',
      D: 'A trend over time, and the chart has no time axis at all.',
    },
  },

  /* ================= Medium ================= */
  {
    id: 'rw_ceq_109', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'medium', irt: { a: 1.15, b: -0.02 }, targetSeconds: 78,
    stimulus: {
      text: 'A trial compared two irrigation schedules on yield across three soil types.',
      table: { caption: 'Yield (tonnes per hectare)', headers: ['Soil', 'Schedule A', 'Schedule B'], rows: [['Sandy', '3.1', '4.4'], ['Loam', '5.8', '5.9'], ['Clay', '6.2', '5.1']] },
    },
    prompt: 'Which choice best completes the statement that the better schedule depends on the soil?',
    choices: [
      { id: 'A', text: 'B outyielded A on sandy soil by 1.3 tonnes, while A outyielded B on clay by 1.1.' },
      { id: 'B', text: 'B outyielded A on two of the three soil types.' },
      { id: 'C', text: 'the highest single yield, 6.2 tonnes, came from schedule A on clay.' },
      { id: 'D', text: 'the two schedules differed by only 0.1 tonnes on loam.' },
    ],
    answer: 'A',
    explanation: 'Dependence on soil means the ranking reverses. Only choice A shows a reversal: B ahead on one soil, A ahead on another, with the margins that make the reversal substantial.',
    distractorNotes: {
      B: 'A count, and it also obscures the reversal by treating a 0.1 margin as equivalent to a 1.3 one.',
      C: 'A single maximum, which is consistent with one schedule being better everywhere.',
      D: 'The soil where the schedules are equivalent — the one row that shows no dependence.',
    },
  },
  {
    id: 'rw_ceq_110', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'medium', irt: { a: 1.18, b: 0.06 }, targetSeconds: 78,
    stimulus: {
      text: 'A line chart tracks the concentration of two pollutants in a river after a treatment plant opened in year 3.',
      figure: { kind: 'line', alt: 'Line chart over six years. Nitrate falls from 42 to 11 milligrams per litre, most steeply after year 3. Phosphate stays between 7 and 8 throughout.', xLabel: 'Year', yLabel: 'Concentration (mg/L)', series: [{ name: 'Nitrate', points: [[1, 42], [2, 40], [3, 39], [4, 24], [5, 15], [6, 11]] }, { name: 'Phosphate', points: [[1, 7.4], [2, 7.9], [3, 7.2], [4, 7.6], [5, 7.1], [6, 7.8]] }] },
    },
    prompt: 'Which statement is best supported by the chart?',
    choices: [
      { id: 'A', text: 'Nitrate fell sharply after year 3 while phosphate remained roughly level throughout.' },
      { id: 'B', text: 'The treatment plant removed nitrate but was unable to remove phosphate.' },
      { id: 'C', text: 'Both pollutants declined over the six years shown.' },
      { id: 'D', text: 'Nitrate will fall below 5 milligrams per litre by year 8.' },
    ],
    answer: 'A',
    explanation: 'The chart shows two series and their shapes: one falling sharply after year 3, one flat. Choice A reports both without asserting a cause the figure cannot establish.',
    distractorNotes: {
      B: 'Attributes the change to the plant and asserts an inability. The chart shows timing, not mechanism.',
      C: 'Phosphate ends higher than it began and never trends down.',
      D: 'A prediction two years beyond the plotted range.',
    },
  },
  {
    id: 'rw_ceq_111', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'medium', irt: { a: 1.15, b: 0.15 }, targetSeconds: 79,
    stimulus: {
      text: 'A survey of reading habits reported time spent reading by format.',
      table: { caption: 'Mean minutes per day, by age group', headers: ['Format', 'Under 30', '30–59', '60+'], rows: [['Print', '9', '17', '34'], ['Screen', '41', '28', '12'], ['Audio', '14', '11', '5']] },
    },
    prompt: 'Which choice best completes the statement that total reading time is more similar across age groups than the format figures alone would suggest?',
    choices: [
      { id: 'A', text: 'totals are 64, 56, and 51 minutes, a spread far narrower than the fourfold difference in print.' },
      { id: 'B', text: 'print reading rises from 9 to 34 minutes across the three groups.' },
      { id: 'C', text: 'screen reading is highest among those under 30, at 41 minutes.' },
      { id: 'D', text: 'audio is the least used format in every age group.' },
    ],
    answer: 'A',
    explanation: 'The statement contrasts totals with per-format figures, so the evidence must supply the totals and set them against a format spread. Choice A does both.',
    distractorNotes: {
      B: 'A per-format figure, which is the half of the contrast the statement is arguing past.',
      C: 'Another single-format reading, and the largest one, which makes the groups look less similar.',
      D: 'True across the row and irrelevant to whether totals converge.',
    },
  },
  {
    id: 'rw_ceq_112', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'medium', irt: { a: 1.2, b: 0.24 }, targetSeconds: 79,
    stimulus: {
      text: 'A scatterplot relates a city’s annual rainfall to the size of its municipal reservoir.',
      figure: { kind: 'scatter', alt: 'Scatterplot of reservoir capacity in millions of cubic metres against annual rainfall in millimetres for eighteen cities, showing widely scattered points with no clear direction.', xLabel: 'Annual rainfall (mm)', yLabel: 'Reservoir capacity (million m³)', points: [[420, 31], [560, 12], [610, 44], [700, 19], [780, 38], [820, 9], [910, 27], [1030, 41], [1150, 16]] },
    },
    prompt: 'Which statement is best supported by the scatterplot?',
    choices: [
      { id: 'A', text: 'The data show no clear relationship between rainfall and reservoir capacity.' },
      { id: 'B', text: 'Cities with more rainfall build smaller reservoirs.' },
      { id: 'C', text: 'Reservoir capacity is determined by factors other than rainfall.' },
      { id: 'D', text: 'The city with the highest rainfall has the smallest reservoir.' },
    ],
    answer: 'A',
    explanation: 'Scattered points with no direction support exactly one statement: no clear relationship. Reporting the absence is a finding, and it is the only one the figure licenses.',
    distractorNotes: {
      B: 'Reads a negative trend into a plot that has none.',
      C: 'A tempting near-miss. The figure shows rainfall does not predict capacity; it cannot say what does, because nothing else is plotted.',
      D: 'False on the data: the 1150 mm city has 16, and the 820 mm city has 9.',
    },
  },
  {
    id: 'rw_ceq_113', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'medium', irt: { a: 1.15, b: 0.32 }, targetSeconds: 80,
    stimulus: {
      text: 'Two archaeological sites were dated by radiocarbon, and the laboratory reported each date with its uncertainty.',
      table: { caption: 'Radiocarbon dates (years before present)', headers: ['Site', 'Date', 'Uncertainty (±)'], rows: [['North terrace', '4120', '90'], ['South terrace', '4180', '110']] },
    },
    prompt: 'Which choice best completes the statement that the dates cannot establish which terrace is older?',
    choices: [
      { id: 'A', text: 'the ranges 4030–4210 and 4070–4290 overlap substantially.' },
      { id: 'B', text: 'the south terrace date is 60 years earlier than the north terrace date.' },
      { id: 'C', text: 'the uncertainty on the south terrace is larger than on the north.' },
      { id: 'D', text: 'both dates fall within the fifth millennium before present.' },
    ],
    answer: 'A',
    explanation: 'A date is an interval, not a point. Overlapping intervals mean either terrace could be the older one, which is exactly why the dates cannot settle the order.',
    distractorNotes: {
      B: 'Compares the central values as though they were exact — the reasoning the statement is correcting.',
      C: 'True, and a larger uncertainty on one date alone does not establish overlap.',
      D: 'A shared era, which is compatible with a clear ordering.',
    },
  },
  {
    id: 'rw_ceq_114', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'medium', irt: { a: 1.18, b: 0.4 }, targetSeconds: 80,
    stimulus: {
      text: 'A hospital reported outcomes for two surgical techniques.',
      table: { caption: 'Complication rate by technique and case severity', headers: ['Severity', 'Technique A', 'Technique B'], rows: [['Routine (n=800)', '2%', '4%'], ['Complex (n=200)', '11%', '18%'], ['All cases', '7.4%', '6.8%']] },
    },
    prompt: 'Which choice best completes the statement that the overall figures favour B while the severity-specific figures favour A?',
    choices: [
      { id: 'A', text: 'A has the lower rate in both severity bands, yet the higher rate overall.' },
      { id: 'B', text: 'A’s overall rate of 7.4 percent exceeds B’s 6.8 percent.' },
      { id: 'C', text: 'complex cases have higher complication rates than routine ones for both techniques.' },
      { id: 'D', text: 'there were four times as many routine cases as complex ones.' },
    ],
    answer: 'A',
    explanation: 'The statement names a reversal between the stratified and pooled figures. Choice A states both halves of that reversal in one sentence, which is what the paradox requires.',
    distractorNotes: {
      B: 'Only the pooled half, so the reversal is invisible.',
      C: 'True of the table and about severity rather than about the comparison between techniques.',
      D: 'The case mix, which explains the reversal but does not state it.',
    },
  },
  {
    id: 'rw_ceq_115', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'medium', irt: { a: 1.15, b: 0.46 }, targetSeconds: 80,
    stimulus: {
      text: 'A study measured how quickly a coating degraded under three light conditions, reporting the fraction remaining after 500 hours.',
      table: { caption: 'Coating remaining after 500 hours', headers: ['Condition', 'Sample 1', 'Sample 2', 'Sample 3'], rows: [['Dark', '0.97', '0.96', '0.98'], ['Indoor light', '0.88', '0.71', '0.90'], ['Direct sun', '0.42', '0.39', '0.44']] },
    },
    prompt: 'Which choice best supports the statement that one indoor-light measurement is out of keeping with the others in its condition?',
    choices: [
      { id: 'A', text: 'The indoor-light samples read 0.88, 0.71, and 0.90, a spread far wider than in either other condition.' },
      { id: 'B', text: 'Direct sun produced the lowest values of any condition.' },
      { id: 'C', text: 'Dark samples varied by only 0.02.' },
      { id: 'D', text: 'Indoor light degraded the coating more than darkness did.' },
    ],
    answer: 'A',
    explanation: 'An outlier is identified by comparing spread within a condition against spread elsewhere. Choice A gives the three indoor readings and the comparison that makes 0.71 stand out.',
    distractorNotes: {
      B: 'A between-condition ranking, which says nothing about consistency within one.',
      C: 'Half the comparison: the tight dark spread means nothing without the indoor figures beside it.',
      D: 'True and about condition means rather than about an anomalous reading.',
    },
  },
  {
    id: 'rw_ceq_116', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'medium', irt: { a: 1.2, b: 0.52 }, targetSeconds: 81,
    stimulus: {
      text: 'A city compared cycling casualty figures before and after building a network of protected lanes.',
      table: { caption: 'Cycling in the city', headers: ['Measure', 'Before', 'After'], rows: [['Casualties per year', '84', '96'], ['Trips per year (millions)', '3.1', '6.8']] },
    },
    prompt: 'Which choice best completes the statement that cycling became safer despite the rise in casualties?',
    choices: [
      { id: 'A', text: 'casualties per million trips fell from about 27 to about 14.' },
      { id: 'B', text: 'casualties rose from 84 to 96 per year.' },
      { id: 'C', text: 'trips more than doubled, from 3.1 to 6.8 million.' },
      { id: 'D', text: 'the network was built between the two measurement periods.' },
    ],
    answer: 'A',
    explanation: 'Safety is a rate, not a count. Dividing casualties by trips converts both rows into the figure the statement needs, and it falls by roughly half.',
    distractorNotes: {
      B: 'The raw count, which is the fact the statement concedes rather than the evidence for it.',
      C: 'The denominator alone; exposure without outcome is not a safety measure.',
      D: 'Context for why things changed, not evidence that they became safer.',
    },
  },
  {
    id: 'rw_ceq_117', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'medium', irt: { a: 1.18, b: 0.58 }, targetSeconds: 81,
    stimulus: {
      text: 'Two laboratories measured the same enzyme’s activity at four pH values.',
      table: { caption: 'Enzyme activity (units)', headers: ['pH', 'Lab 1', 'Lab 2'], rows: [['5.0', '12', '31'], ['6.0', '38', '57'], ['7.0', '61', '80'], ['8.0', '44', '63']] },
    },
    prompt: 'Which choice best supports the statement that the two laboratories agree about the shape of the response but not about its magnitude?',
    choices: [
      { id: 'A', text: 'Both peak at pH 7.0, and Lab 2 reads about 19 units higher at every pH.' },
      { id: 'B', text: 'Lab 2 reported higher activity than Lab 1 at all four pH values.' },
      { id: 'C', text: 'Activity in both laboratories was lowest at pH 5.0.' },
      { id: 'D', text: 'Lab 1’s highest reading, 61 units, came at pH 7.0.' },
    ],
    answer: 'A',
    explanation: 'Shape means where the curve peaks; magnitude means the offset between them. Choice A supplies both — a shared peak and a constant gap — which is precisely the agreement-plus-disagreement claimed.',
    distractorNotes: {
      B: 'The magnitude half only, with nothing about shape.',
      C: 'One point of the shape, which alone does not establish a matching response curve.',
      D: 'A single laboratory’s peak, so no comparison is made.',
    },
  },

  /* ================= Hard ================= */
  {
    id: 'rw_ceq_118', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'hard', irt: { a: 1.28, b: 0.96 }, targetSeconds: 88,
    stimulus: {
      text: 'A trial reported the effect of a drug on a biomarker, with participants split by baseline level.',
      table: { caption: 'Mean change in biomarker after 12 weeks', headers: ['Baseline group', 'n', 'Drug', 'Placebo'], rows: [['Low', '210', '−0.4', '−0.3'], ['Middle', '190', '−1.1', '−0.9'], ['High', '38', '−4.8', '−1.2']] },
    },
    prompt: 'Which choice best completes the statement that the striking result in the high-baseline group should be treated cautiously?',
    choices: [
      { id: 'A', text: 'that group contains 38 participants against roughly two hundred in each of the others.' },
      { id: 'B', text: 'the drug outperformed placebo in all three baseline groups.' },
      { id: 'C', text: 'the difference in the high group, 3.6 units, is the largest in the table.' },
      { id: 'D', text: 'the low group showed a difference of only 0.1 units.' },
    ],
    answer: 'A',
    explanation: 'The caution is about reliability, and the sample size is what governs it. A group one-fifth the size of the others produces a far less stable estimate, whatever the headline number.',
    distractorNotes: {
      B: 'Consistency across groups, which argues for the result rather than for caution.',
      C: 'Restates the striking finding. Its size is the reason it draws attention, not the reason to doubt it.',
      D: 'Another group’s result, which does not bear on the reliability of this one.',
    },
  },
  {
    id: 'rw_ceq_119', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'hard', irt: { a: 1.3, b: 1.04 }, targetSeconds: 89,
    stimulus: {
      text: 'A regional authority reported recycling rates and the method by which each was measured.',
      table: { caption: 'Reported recycling rate', headers: ['District', 'Rate', 'Basis'], rows: [['North', '61%', 'Weight collected for recycling'], ['South', '44%', 'Weight actually reprocessed'], ['East', '58%', 'Weight collected for recycling']] },
    },
    prompt: 'Which choice best completes the statement that South’s figure cannot be compared directly with the others?',
    choices: [
      { id: 'A', text: 'South’s rate excludes material collected but later rejected, which the other two include.' },
      { id: 'B', text: 'South’s rate is the lowest of the three reported.' },
      { id: 'C', text: 'North and East are within three percentage points of each other.' },
      { id: 'D', text: 'all three districts report rates between 40 and 65 percent.' },
    ],
    answer: 'A',
    explanation: 'The basis column is the point of the table. Two districts measure what was collected and one measures what survived reprocessing, so the figures count different things and cannot be set side by side.',
    distractorNotes: {
      B: 'The observation that needs explaining, not the explanation — and treating it as a comparison is the error.',
      C: 'A comparison between the two districts that *are* comparable.',
      D: 'A range statement that treats all three as one series, which is what the item denies.',
    },
  },
  {
    id: 'rw_ceq_120', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'hard', irt: { a: 1.28, b: 1.12 }, targetSeconds: 89,
    stimulus: {
      text: 'A study of a teaching method reported outcomes for schools that adopted it, comparing each school with its own performance three years earlier.',
      table: { caption: 'Mean score change over three years', headers: ['Group', 'n schools', 'Change'], rows: [['Adopted the method', '46', '+7.2'], ['Did not adopt', '312', '+2.1'], ['Adopted, then withdrew', '11', '+6.9']] },
    },
    prompt: 'Which row most complicates the conclusion that the method produced the gain?',
    choices: [
      { id: 'A', text: 'Schools that adopted and then withdrew gained 6.9 points, nearly as much as those that continued.' },
      { id: 'B', text: 'Schools that did not adopt gained 2.1 points.' },
      { id: 'C', text: 'Only 46 schools adopted the method.' },
      { id: 'D', text: 'Adopting schools gained 7.2 points over three years.' },
    ],
    answer: 'A',
    explanation: 'Schools that stopped using the method gained almost as much as those that kept it. That points to something the adopting schools share — willingness to change, resources, leadership — rather than to the method itself.',
    distractorNotes: {
      B: 'The comparison group, which supports the conclusion by making the adopters look effective.',
      C: 'A modest sample, which counsels caution generally without pointing at an alternative explanation.',
      D: 'The headline finding being questioned, not something that complicates it.',
    },
  },
  {
    id: 'rw_ceq_121', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'hard', irt: { a: 1.3, b: 1.18 }, targetSeconds: 90,
    stimulus: {
      text: 'A chart plots average house price against distance from a city centre, using data from properties sold in one year.',
      figure: { kind: 'line', alt: 'Line chart of mean sale price in thousands against distance from centre in kilometres, falling from 640 at 1 kilometre to 280 at 12 kilometres, with the line ending at 12.', xLabel: 'Distance from centre (km)', yLabel: 'Mean price (thousands)', series: [{ name: 'Mean sale price', points: [[1, 640], [3, 540], [5, 470], [8, 360], [12, 280]] }] },
    },
    prompt: 'A commentator uses the chart to argue that a property 20 kilometres out would sell for about 150 thousand. Which is the best evaluation of that argument?',
    choices: [
      { id: 'A', text: 'It extends the relationship beyond the range the data cover, where nothing supports it.' },
      { id: 'B', text: 'It is sound, because the decline in the chart is close to linear.' },
      { id: 'C', text: 'It is unsound, because price is affected by factors other than distance.' },
      { id: 'D', text: 'It is unsound, because the chart shows means rather than individual sales.' },
    ],
    answer: 'A',
    explanation: 'The plotted range stops at 12 kilometres. Evaluating a prediction at 20 is a question about extrapolation, and the specific defect is that no observation supports the relationship out there.',
    distractorNotes: {
      B: 'Linearity within the observed range gives no licence to continue the line beyond it.',
      C: 'True of house prices generally and does not explain why *this* prediction fails where an in-range one would not.',
      D: 'Means are the appropriate summary here; the problem is the distance, not the averaging.',
    },
  },
  {
    id: 'rw_ceq_122', section: 'rw', domain: 'information-ideas', skill: 'command-evidence-quantitative',
    format: 'mcq', band: 'hard', irt: { a: 1.32, b: 1.24 }, targetSeconds: 90,
    stimulus: {
      text: 'An analysis reported the share of applicants admitted to a university, overall and by department.',
      table: { caption: 'Admission rate', headers: ['Group', 'Applicants', 'Admitted'], rows: [['Overall, Group X', '2000', '30%'], ['Overall, Group Y', '2000', '45%'], ['Dept A (competitive), X', '1600', '22%'], ['Dept A (competitive), Y', '400', '20%'], ['Dept B (less competitive), X', '400', '62%'], ['Dept B (less competitive), Y', '1600', '51%']] },
    },
    prompt: 'Which choice best completes the statement that the overall gap misrepresents what happened within departments?',
    choices: [
      { id: 'A', text: 'X was admitted at a higher rate than Y in both departments, yet at a lower rate overall.' },
      { id: 'B', text: 'Y’s overall admission rate exceeded X’s by 15 percentage points.' },
      { id: 'C', text: 'Department A admitted about a fifth of its applicants and Department B about half.' },
      { id: 'D', text: 'Each group submitted 2000 applications in total.' },
    ],
    answer: 'A',
    explanation: 'The reversal is the whole finding: X ahead in each department and behind in the pooled figure, because X concentrated in the competitive department. Choice A states both halves.',
    distractorNotes: {
      B: 'The pooled gap alone, which is the misleading figure rather than the correction to it.',
      C: 'Explains why the pooling misleads, but does not state the reversal the statement asserts.',
      D: 'Equal totals, which makes the reversal more surprising without demonstrating it.',
    },
  },
];
