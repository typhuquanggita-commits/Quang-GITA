/**
 * Browser smoke test.
 *
 * Drives the real built application through the paths a user actually takes,
 * and treats any console error as a failure. Unit tests cover the engines;
 * this covers the part where a component silently discards state, which is a
 * class of bug no unit test in this repository would have caught.
 *
 * Run with: npm run test:browser
 */

import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const AXE_SOURCE = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const PORT = Number(process.env.PORT ?? 4319);
const BASE = `http://127.0.0.1:${PORT}/`;
const EXECUTABLE = process.env.CHROMIUM_PATH || undefined;

const steps = [];
let currentGroup = '';

function group(name) {
  currentGroup = name;
  console.log(`\n${name}`);
}

function check(name, ok, detail = '') {
  steps.push({ group: currentGroup, name, ok });
  const mark = ok ? '  ok  ' : '  FAIL';
  console.log(`${mark} ${name}${detail ? ` — ${detail}` : ''}`);
}

/* ---------------- Accessibility ---------------- */

/*
 * An axe pass over the routes a learner actually spends time on.
 *
 * Only serious and critical violations fail the run. That is not a way of
 * ignoring the rest: minor and moderate findings are printed with their node
 * counts so a regression is visible, but a rule like "landmark-unique" firing
 * on a page that is otherwise operable should not block a content change,
 * while a missing form label or a contrast failure should.
 *
 * axe covers roughly a third of WCAG by machine. Passing it means no automated
 * violation was found, not that the page is accessible — which is why the
 * keyboard paths below are exercised by hand as well.
 */
const SERIOUS = new Set(['serious', 'critical']);

async function auditPage(name) {
  await page.evaluate(AXE_SOURCE);
  const result = await page.evaluate(async () => {
    const run = await window.axe.run(document, {
      resultTypes: ['violations'],
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] },
    });
    return run.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.length,
      help: v.help,
    }));
  });

  const blocking = result.filter((v) => SERIOUS.has(v.impact));
  const advisory = result.filter((v) => !SERIOUS.has(v.impact));

  check(
    `${name} has no serious or critical violations`,
    blocking.length === 0,
    blocking.map((v) => `${v.id} (${v.nodes})`).join(', '),
  );
  if (advisory.length > 0) {
    console.log(`       advisory: ${advisory.map((v) => `${v.id} (${v.nodes})`).join(', ')}`);
  }
}

/* ---------------- Server ---------------- */

async function waitForServer(url, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return true;
    } catch {
      // Not up yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  return false;
}

const server = spawn(
  'npx',
  ['vite', 'preview', '--port', String(PORT), '--host', '127.0.0.1'],
  { stdio: 'ignore' },
);

process.on('exit', () => server.kill());
process.on('SIGINT', () => {
  server.kill();
  process.exit(130);
});

if (!(await waitForServer(BASE))) {
  console.error(`Preview server did not start on ${BASE}`);
  server.kill();
  process.exit(1);
}

/* ---------------- Browser ---------------- */

const errors = [];
const browser = await chromium.launch({ executablePath: EXECUTABLE });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));

const title = (selector = '.page-title') =>
  page.locator(selector).first().innerText().catch(() => '');

try {
  /* ---------------- Onboarding ---------------- */
  group('Onboarding');
  await page.goto(BASE, { waitUntil: 'networkidle' });
  check('welcome screen renders', await page.getByText('Chào mừng đến SAT365').isVisible());

  await page.locator('input.input').first().fill('Nguyễn Minh');
  await page.getByRole('button', { name: 'Tiếp' }).click();
  await page.getByRole('button', { name: 'Tiếp' }).click();
  await page.getByRole('button', { name: 'Bắt đầu' }).click();
  await page.waitForTimeout(800);

  check('lands on the automated session', (await title()).includes('Hôm nay'));
  check('profile survived the organisation seed', (await page.locator('.topbar').innerText()).includes('Nguyễn Minh'));

  /* ---------------- Automated coach ---------------- */
  group('Automated coach');
  check('a programme was produced', (await page.locator('.today-hero').count()) === 1);
  check('a new learner is sent to the diagnostic', (await page.getByText('Bài chẩn đoán').count()) >= 1);
  check('thin evidence is declared', (await page.getByText(/chưa có đủ dữ liệu/).count()) >= 1);

  await page.getByRole('button', { name: /Vì sao lại là những việc này/ }).click();
  await page.waitForTimeout(400);
  check('the decision log opens', (await page.locator('.decision').count()) >= 1);
  check('a decision shows its evidence', (await page.locator('.evidence-item').count()) >= 1);
  const ruleId = await page.locator('.decision-body .badge').first().innerText();
  check('a decision names the rule that produced it', /^r-/.test(ruleId), ruleId);

  const done = page.getByRole('button', { name: 'Đã xong' }).first();
  if (await done.count()) {
    await done.click();
    await page.waitForTimeout(400);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
    check('completion survives a programme rebuild', (await page.locator('.block[data-done="true"]').count()) >= 1);
  }

  /* ---------------- Navigation ---------------- */
  group('Navigation');
  for (const [label, marker] of [
    ['Tổng quan', 'Nguyễn Minh'],
    ['Luyện tập', 'Luyện tập thích ứng'],
    ['Từ vựng', 'Từ vựng học thuật'],
    ['Bài giảng', 'Thư viện bài giảng'],
    ['Kế hoạch', 'Kế hoạch học tập'],
    ['GITA', 'GITA'],
    ['Bài thi thử', 'Chọn bài thi'],
    ['Ôn lỗi sai', 'Trung tâm ôn tập'],
    ['Phân tích', 'Phân tích năng lực'],
    ['Cài đặt', 'Cài đặt'],
  ]) {
    await page.getByRole('button', { name: label, exact: true }).first().click();
    await page.waitForTimeout(350);
    const heading = await title();
    check(`route: ${label}`, heading.includes(marker), heading);
  }

  /* ---------------- Dossier ---------------- */
  group('Learner dossier');
  await page.evaluate(() => { window.location.hash = '#/dossier'; });
  await page.waitForTimeout(600);
  check('the dossier opens', (await title()).includes('Hồ sơ học viên'));
  // Nothing has been scored, so the route must be the single honest step of
  // getting measured rather than a plausible-looking plan built from nothing.
  // Nothing scored yet, so the route is exactly one step — get measured — and
  // not a plausible-looking plan elaborated out of nothing.
  const steps = await page.locator('.pathway-step').count();
  check('an unmeasured learner gets exactly one step', steps === 1, `${steps}`);
  check(
    'and that step is to sit a test',
    (await page.getByText(/Làm một bài thi thử full-length/).count()) >= 1,
  );
  check(
    'and the document names what it does not know',
    (await page.getByText(/Chưa có bài thi thử full-length nào được chấm/).count()) >= 1,
  );

  /* ---------------- Forecast ---------------- */
  group('Score forecast');
  await page.evaluate(() => { window.location.hash = '#/plan'; });
  await page.waitForTimeout(500);
  check('onboarding produced a plan', (await page.locator('.plan-task').count()) > 0);
  // No full-length test has been scored, so there is no baseline. Drawing a
  // curve anyway would be exactly the failure this codebase refuses.
  check(
    'no baseline means no forecast curve',
    (await page.getByText(/Chưa có bài thi thử nào được chấm/).count()) === 1,
  );
  check(
    'and no chart is drawn from nothing',
    (await page.locator('svg.chart[aria-label*="Dự báo"]').count()) === 0,
  );

  /* ---------------- Lesson library ---------------- */
  group('Lesson library');
  await page.getByRole('button', { name: 'Bài giảng', exact: true }).first().click();
  await page.waitForTimeout(500);
  const lessonRows = await page.locator('.lesson-row').count();
  check('every skill is listed', lessonRows === 30, `${lessonRows}`);
  check('nothing is marked read yet', (await page.locator('.lesson-read').count()) === 0);

  await page.locator('.lesson-row').first().click();
  await page.waitForTimeout(500);
  check('a lesson opens', (await page.locator('.lesson-idea').count()) === 1);
  check('the method is a numbered procedure', (await page.locator('.lesson-method li').count()) >= 3);
  check('the traps say why they are tempting', (await page.locator('.lesson-trap-why').count()) >= 2);

  await page.getByRole('button', { name: /Đã đọc xong/ }).click();
  await page.waitForTimeout(400);
  check('reading is recorded', (await page.getByText(/Đã đọc ngày/).count()) >= 1);

  // Reading is only recorded when the learner says so, and it has to survive
  // the debounced write — the store flushes on hide, so a reload must find it.
  await page.reload();
  await page.waitForTimeout(900);
  check('the record survives a reload', (await page.getByText(/Đã đọc ngày/).count()) >= 1);

  await page.evaluate(() => { window.location.hash = '#/lessons'; });
  await page.waitForTimeout(500);
  check('the library shows it as read', (await page.locator('.lesson-read').count()) === 1);

  await page.locator('input[type="search"]').fill('zzzz-no-such-skill');
  await page.waitForTimeout(350);
  check('search can return nothing rather than everything', (await page.locator('.lesson-row').count()) === 0);
  await page.locator('input[type="search"]').fill('');
  await page.waitForTimeout(350);

  /* ---------------- Tactics and papers ---------------- */
  group('Tactics treasury');
  await page.getByRole('button', { name: 'Kho bí kíp', exact: true }).first().click();
  await page.waitForTimeout(600);
  check('the treasury opens', (await title()).includes('Kho bí kíp'));
  const tacticCards = await page.locator('.tactic-card').count();
  check('tactics are listed', tacticCards >= 10, `${tacticCards}`);
  // A tactic without its cost is a slogan, so every card must carry one.
  const triggers = await page.locator('.tactic-trigger').count();
  const costs = await page.locator('.tactic-cost').count();
  check('every tactic states when to use it and what it costs', triggers === tacticCards && costs === tacticCards, `${triggers}/${costs}/${tacticCards}`);

  group('Published papers');
  await page.getByRole('button', { name: 'Bộ đề công bố', exact: true }).first().click();
  await page.waitForTimeout(600);
  check('the paper library opens', (await title()).includes('Bộ đề công bố'));
  check('papers are listed', (await page.locator('.lesson-row').count()) >= 5);

  await page.locator('.lesson-row').first().click();
  await page.waitForTimeout(700);
  check('a paper opens on its question paper', (await page.locator('.sheet-question').count()) > 40);
  check(
    'the three documents are not to be handed out together',
    (await page.getByText(/không phát cùng nhau/).count()) === 1,
  );
  check('the paper carries a document frame', (await page.locator('.doc-masthead').count()) >= 1);

  await page.getByRole('tab', { name: 'Barem' }).click();
  await page.waitForTimeout(500);
  const schemeRows = await page.locator('.scheme-table tbody tr').count();
  check('the mark scheme covers every raw score', schemeRows === 51 + 41, `${schemeRows}`);
  // The flat ends of the curve are bounds, not points.
  check(
    'the unidentifiable extremes are marked as bounds',
    (await page.locator('.scheme-table tbody tr[data-bounded]').count()) >= 2,
  );

  await page.getByRole('tab', { name: 'Lời giải' }).click();
  await page.waitForTimeout(600);
  check('the solutions carry explanations', (await page.locator('.explain').count()) > 40);

  /* ---------------- Topic packets ---------------- */
  group('Topic packets');
  await page.getByRole('button', { name: 'Bộ phiếu', exact: true }).first().click();
  await page.waitForTimeout(600);
  check('every topic has a packet', (await page.locator('.lesson-row').count()) === 30);
  const pips = await page.locator('.lesson-row').first().locator('.packet-pips > i').count();
  check('each packet shows its seven sheets', pips === 7, `${pips}`);

  await page.locator('.lesson-row').first().click();
  await page.waitForTimeout(600);
  check('a packet opens on its theory sheet', (await page.getByText('Phiếu lý thuyết').count()) >= 1);

  await page.getByRole('tab', { name: /dạng bài và đọc vị/ }).click();
  await page.waitForTimeout(400);
  const types = await page.locator('.type-card').count();
  check('the đọc-vị sheet lists the question types', types >= 2, `${types}`);

  await page.getByRole('tab', { name: /Phiếu thi/ }).click();
  await page.waitForTimeout(400);
  // The solution sheet is behind a toggle: a solution visible while the
  // question is being attempted is not a solution, it is the answer.
  check('solutions are not shown beside the questions', (await page.locator('.explain').count()) === 0);
  await page.getByRole('button', { name: /Xem phiếu lời giải/ }).click();
  await page.waitForTimeout(400);
  check('the solution sheet opens', (await page.locator('.explain').count()) >= 1);
  check('and carries the deep analysis', (await page.getByText('Bảng phân tích chuyên sâu').count()) === 1);

  await page.getByRole('tab', { name: /ôn chắc chuyên đề/ }).click();
  await page.waitForTimeout(400);
  const criteria = await page.locator('.secure-list > li').count();
  check('consolidation is stated as observable criteria', criteria >= 3, `${criteria}`);

  await page.getByRole('button', { name: 'Đánh dấu đã hoàn thành' }).click();
  await page.waitForTimeout(400);
  // Sheets are a sequence: finishing the last one must send the learner back
  // to the first unfinished sheet, not carry them past it.
  check(
    'an out-of-order completion sends the learner back',
    (await page.getByText(/Phiếu tiếp theo chưa hoàn thành/).count()) === 1,
  );

  /* ---------------- GITA ---------------- */
  group('GITA');
  await page.getByRole('button', { name: 'GITA', exact: true }).first().click();
  await page.waitForTimeout(600);
  check('four pillar cards', (await page.locator('.pillar-card').count()) === 4);
  check('the limiting pillar is marked', (await page.locator('.pillar-limiting').count()) === 1);
  check('the tier ladder has five steps', (await page.locator('.tier-step').count()) === 5);
  check('low confidence is declared', (await page.getByText(/chưa quan sát đủ hành vi/).count()) === 1);

  await page.getByRole('tab', { name: 'Thói quen' }).click();
  await page.waitForTimeout(400);
  const habits = await page.locator('.habit-check').count();
  check('habits are active at tier 1', habits >= 2, `${habits}`);
  await page.locator('.habit-check').first().click();
  await page.waitForTimeout(300);
  check('a habit records as done', (await page.locator('.habit-check[aria-pressed="true"]').count()) === 1);

  await page.getByRole('tab', { name: 'Chuyển giao' }).click();
  await page.waitForTimeout(400);
  check('arenas are gated at tier 1', (await page.getByText(/Mở ở tầng/).count()) >= 2);
  check('the coach playbook is hidden from a student', (await page.getByRole('tab', { name: 'Sổ tay coach' }).count()) === 0);

  /* ---------------- Document identity ---------------- */
  group('Document identity');
  await page.evaluate(() => { window.location.hash = '#/brand'; });
  await page.waitForTimeout(600);
  check('the identity page opens', (await title()).includes('Nhận diện'));
  check('the mark renders in three treatments', (await page.locator('.brand-swatch-block').count()) === 3);
  check('the four pillars are shown', (await page.locator('.pillar-swatch').count()) === 4);
  // The contrast figures are recomputed, so a colour that fails for text must
  // be shown as failing rather than quietly listed.
  check(
    'contrast is reported rather than claimed',
    (await page.getByText(/không đủ cho chữ/).count()) >= 1,
  );
  check('the document frame is demonstrated', (await page.locator('.doc-limits').count()) >= 1);

  /* ---------------- Access control ---------------- */
  group('Access control');
  check('teaching nav hidden from a student', (await page.getByRole('button', { name: 'Giảng dạy', exact: true }).count()) === 0);

  await page.evaluate(() => { window.location.hash = '#/settings'; });
  await page.waitForTimeout(500);
  const roleOptions = await page.locator('select').first().locator('option').count();
  check('every role is offered, not just three', roleOptions === 8, `${roleOptions}`);
  await page.locator('select').first().selectOption('teacher');
  await page.waitForTimeout(300);
  check(
    'the selected role explains what it is for',
    (await page.getByText(/Dạy các lớp được phân công/).count()) === 1,
  );
  await page.locator('select').nth(1).selectOption('head');
  await page.waitForTimeout(500);
  check('teaching nav appears for a teacher', (await page.getByRole('button', { name: 'Giảng dạy', exact: true }).count()) === 1);

  await page.getByRole('button', { name: 'Giảng dạy', exact: true }).first().click();
  await page.waitForTimeout(500);
  check('the console opens', (await title()).includes('Bảng điều khiển giảng dạy'));
  check('a head of programme sees the audit log', await page.getByRole('tab', { name: 'Nhật ký' }).isVisible());

  await page.getByRole('button', { name: 'Tạo lớp mới' }).click();
  await page.waitForTimeout(300);
  await page.locator('.modal input.input').first().fill('SAT Nâng cao A1');
  await page.locator('.modal').getByRole('button', { name: 'Lưu' }).click();
  await page.waitForTimeout(400);
  check('a class is created', await page.getByText('SAT Nâng cao A1').first().isVisible());

  await page.getByRole('tab', { name: 'Nhật ký' }).click();
  await page.waitForTimeout(300);
  check('the audit log records it', await page.getByText('class.created').first().isVisible());

  /* ---------------- A student's record ---------------- */
  group('Student record');
  await page.getByRole('tab', { name: 'Nhân sự' }).click();
  await page.waitForTimeout(300);
  await page.getByRole('button', { name: 'Thêm tài khoản' }).click();
  await page.waitForTimeout(300);
  await page.locator('.modal input.input').first().fill('Trần Bảo Ngọc');
  await page.locator('.modal').getByRole('button', { name: 'Lưu' }).click();
  await page.waitForTimeout(400);

  await page.getByRole('tab', { name: 'Học sinh' }).click();
  await page.waitForTimeout(400);
  check(
    'a student outside every class is not on the roster',
    (await page.getByRole('button', { name: 'Xem hồ sơ' }).count()) === 0,
  );

  await page.getByRole('button', { name: 'Thêm học sinh' }).click();
  await page.waitForTimeout(300);
  await page.locator('.modal').getByRole('button', { name: 'Thêm' }).first().click();
  await page.waitForTimeout(400);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  await page.getByRole('button', { name: 'Xem hồ sơ' }).first().click();
  await page.waitForTimeout(600);
  check('the record opens', (await title()).includes('Trần Bảo Ngọc'));
  check(
    'the record states what this device cannot see',
    (await page.getByText(/không bao giờ tới thiết bị này/).count()) === 1,
  );
  check(
    'an unsynced score is not shown as a zero',
    (await page.locator('.kpi-value').first().innerText()).trim() === '—',
  );

  // Looking at someone else's record is a privileged act and has to leave a
  // trace; a policy without a record is only a claim about the past.
  await page.evaluate(() => { window.location.hash = '#/console'; });
  await page.waitForTimeout(500);
  await page.getByRole('tab', { name: 'Nhật ký' }).click();
  await page.waitForTimeout(300);
  check('viewing it was audited', await page.getByText('student.record.viewed').first().isVisible());

  /* ---------------- Role boundaries ---------------- */
  group('Role boundaries');
  // A head of programme runs classes and never touches the item bank's
  // calibration; a product administrator is the reverse. Each must see its own
  // surfaces and not the other's.
  // Publishing item parameters changes the basis of every score, so it sits
  // with the product administrator rather than on the teaching ladder.
  check(
    'a head of programme cannot publish item parameters',
    (await page.getByRole('button', { name: 'Hiệu chuẩn', exact: true }).count()) === 0,
  );

  await page.evaluate(() => { window.location.hash = '#/settings'; });
  await page.waitForTimeout(500);
  await page.locator('select').first().selectOption('executive');
  await page.waitForTimeout(500);
  check(
    'an executive sees organisation metrics',
    (await page.getByRole('button', { name: 'Chỉ số tổ chức', exact: true }).count()) === 1,
  );
  // The decision most likely to be questioned, so it is checked in the browser
  // too: seniority is not a reason to read a child's record.
  check(
    'an executive is not offered the teaching console',
    (await page.getByRole('button', { name: 'Giảng dạy', exact: true }).count()) === 0,
  );

  await page.getByRole('button', { name: 'Chỉ số tổ chức', exact: true }).first().click();
  await page.waitForTimeout(600);
  check('the metrics page opens', (await title()).includes('Chỉ số tổ chức'));
  check(
    'it states that no learner is named',
    (await page.getByText(/Không có học sinh nào được nêu tên/).count()) >= 1,
  );
  check(
    'a cohort too small to hide in is suppressed, not reported',
    (await page.getByText(/để công bố/).count()) >= 1,
  );

  await page.evaluate(() => { window.location.hash = '#/settings'; });
  await page.waitForTimeout(500);
  await page.locator('select').first().selectOption('super-admin');
  await page.waitForTimeout(500);

  /* ---------------- Calibration ---------------- */
  group('Calibration console');
  // Calibration belongs to the role that owns the bank.
  await page.evaluate(() => { window.location.hash = '#/settings'; });
  await page.waitForTimeout(500);
  await page.locator('select').first().selectOption('product-admin');
  await page.waitForTimeout(500);
  check(
    'calibration is offered to the product administrator',
    (await page.getByRole('button', { name: 'Hiệu chuẩn', exact: true }).count()) === 1,
  );
  check(
    'and the product administrator gets no roster',
    (await page.getByRole('button', { name: 'Giảng dạy', exact: true }).count()) === 0,
  );
  await page.getByRole('button', { name: 'Hiệu chuẩn', exact: true }).first().click();
  await page.waitForTimeout(600);
  check('the console opens', (await title()).includes('Hiệu chuẩn ngân hàng'));
  // One learner is not a population, and the console has to say so rather than
  // calibrating anyway and returning confident, meaningless numbers.
  check(
    'local data is declared unusable',
    (await page.getByText(/không có quần thể/).count()) >= 1,
  );
  await page.getByRole('tab', { name: 'Chạy hiệu chuẩn' }).click();
  await page.waitForTimeout(300);
  check(
    'a run cannot start without an imported matrix',
    (await page.getByText(/Chưa có ma trận nào được nhập/).count()) === 1,
  );
  await page.getByRole('tab', { name: 'Công bằng (DIF)' }).click();
  await page.waitForTimeout(300);
  check(
    'DIF is not invented from an unlabelled cohort',
    (await page.getByText(/Cần nhãn nhóm trong tệp nhập/).count()) === 1,
  );

  await page.evaluate(() => { window.location.hash = '#/settings'; });
  await page.waitForTimeout(400);
  await page.locator('select').first().selectOption('student');
  await page.waitForTimeout(400);

  /* ---------------- Practice ---------------- */
  group('Practice');
  await page.getByRole('button', { name: 'Luyện tập', exact: true }).first().click();
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: 'Bắt đầu phiên' }).click();
  await page.waitForTimeout(600);
  check('a session starts', (await page.locator('.q-prompt').count()) === 1);

  let explained = 0;
  for (let i = 0; i < 3; i += 1) {
    const radios = page.locator('[role="radio"]');
    if (await radios.count()) await radios.first().click();
    else await page.locator('.spr-input').fill('5');
    await page.getByRole('button', { name: 'Kiểm tra' }).click();
    await page.waitForTimeout(350);
    if (await page.locator('.explain').count()) explained += 1;
    await page.getByRole('button', { name: /Câu tiếp theo|Hoàn tất/ }).click();
    await page.waitForTimeout(350);
  }
  check('checking an answer reveals the explanation', explained === 3, `${explained}/3`);

  /* ---------------- Exam ---------------- */
  group('Exam delivery');
  await page.getByRole('button', { name: 'Bài thi thử', exact: true }).first().click();
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: 'Vào phòng thi' }).click();
  await page.waitForTimeout(900);
  check('the exam player renders', (await page.locator('.exam').count()) === 1);
  check('the module header is correct', (await page.locator('.exam-module-name').innerText()).includes('Module 1'));
  const clock = await page.locator('.exam-time').innerText();
  check('the clock is running', /^\d+:\d\d$/.test(clock), clock);

  await page.locator('.nav-toggle').click();
  await page.waitForTimeout(300);
  check('the navigator lists the whole module', (await page.locator('.nav-cell').count()) === 27);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);

  await page.keyboard.press('b');
  await page.waitForTimeout(200);
  check('a keyboard answer selects a choice', (await page.locator('[role="radio"][aria-checked="true"]').count()) === 1);
  await page.keyboard.press('f');
  await page.waitForTimeout(200);
  check('a keyboard flag toggles', (await page.locator('.q-flag[aria-pressed="true"]').count()) === 1);

  const eliminator = page.locator('.eliminator').first();
  if (await eliminator.count()) {
    await eliminator.click();
    await page.waitForTimeout(200);
    check('the answer eliminator strikes a choice', (await page.locator('.choice[data-eliminated="true"]').count()) >= 1);
  }

  const passage = page.locator('.stimulus p').first();
  if (await passage.count()) {
    const box = await passage.boundingBox();
    if (box) {
      await page.mouse.move(box.x + 8, box.y + 8);
      await page.mouse.down();
      await page.mouse.move(box.x + 180, box.y + 8, { steps: 8 });
      await page.mouse.up();
      await page.waitForTimeout(300);
      if (await page.locator('.hl-bubble').count()) {
        await page.locator('.hl-swatch[data-color="yellow"]').click();
        await page.waitForTimeout(300);
        check('passage highlighting works', (await page.locator('mark.hl').count()) >= 1);
      } else {
        check('passage highlighting works', false, 'no selection toolbar appeared');
      }
    }
  }

  await page.getByRole('button', { name: 'Thoát' }).first().click();
  await page.waitForTimeout(300);
  await page.locator('.modal').getByRole('button', { name: 'Thoát' }).click();
  await page.waitForTimeout(600);
  const discard = page.locator('.modal').getByRole('button', { name: 'Bỏ bài' });
  if (await discard.count()) {
    await discard.click();
    await page.waitForTimeout(300);
  }

  /* ---------------- Math tools ---------------- */
  group('Math tools');
  await page.evaluate(() => { window.location.hash = '#/tests'; });
  await page.waitForTimeout(500);
  const mathStart = page
    .locator('.card', { hasText: 'Thi theo phần' })
    .getByRole('button', { name: 'Bắt đầu' })
    .last();
  await mathStart.click();
  await page.waitForTimeout(900);

  const calculator = page.getByRole('button', { name: /Máy tính/ });
  if (await calculator.count()) {
    await calculator.first().click();
    await page.waitForTimeout(400);
    check('the calculator opens', (await page.locator('.calc-plot').count()) === 1);

    await page.locator('.calc-input').first().fill('x^2-3');
    await page.waitForTimeout(500);
    check('it plots a function', (await page.locator('.calc-plot path').count()) >= 1);

    await page.locator('.calc-input').nth(1).fill('2*sqrt(9)+1');
    await page.waitForTimeout(500);
    const value = await page.locator('.calc-value').first().innerText().catch(() => '');
    check('it evaluates numerically', value.includes('7'), value);

    await page.getByRole('button', { name: /Công thức/ }).first().click();
    await page.waitForTimeout(400);
    check('the reference sheet opens', (await page.locator('.ref-grid').count()) === 1);
  } else {
    check('the calculator opens', false, 'the Math module was not reached');
  }

  await page.getByRole('button', { name: 'Thoát' }).first().click();
  await page.waitForTimeout(300);
  await page.locator('.modal').getByRole('button', { name: 'Thoát' }).click();
  await page.waitForTimeout(600);

  /* ---------------- Accessibility ---------------- */
  group('Accessibility');

  for (const [name, hash] of [
    ['the dashboard', '#/dashboard'],
    ['today', '#/today'],
    ['the lesson library', '#/lessons'],
    ['the vocabulary deck', '#/vocab'],
    ['the guardian report', '#/guardian-report'],
    ['the syllabus', '#/curriculum'],
    ['programmes and fees', '#/programmes'],
    ['the SAT calendar', '#/test-dates'],
    ['the long roadmap', '#/roadmap'],
    ['the certificate page', '#/certificate'],
    ['the topic packets', '#/topics'],
    ['the tactics treasury', '#/tactics'],
    ['the expert solutions', '#/expert-solutions'],
    ['the must-know reference', '#/must-know'],
    ['the papers shelf', '#/papers'],
    ['the shortcuts sheet', '#/shortcuts'],
    ['settings', '#/settings'],
  ]) {
    await page.evaluate((h) => { window.location.hash = h; }, hash);
    await page.waitForTimeout(600);
    await auditPage(name);
  }

  // The dark and high-contrast palettes are separate colour systems, and
  // contrast is the failure they can introduce without touching the markup.
  await page.evaluate(() => { window.location.hash = '#/today'; });
  await page.waitForTimeout(600);
  for (const theme of ['dark', 'high-contrast']) {
    await page.evaluate((t) => { document.documentElement.dataset.theme = t; }, theme);
    await page.waitForTimeout(300);
    await auditPage(`the ${theme} theme on today`);
  }
  await page.evaluate(() => { delete document.documentElement.dataset.theme; });
  await page.waitForTimeout(200);

  /* ---------------- Keyboard ---------------- */
  group('Keyboard');

  await page.evaluate(() => { window.location.hash = '#/today'; });
  await page.waitForTimeout(500);
  await page.keyboard.press('Shift+Slash');
  await page.waitForTimeout(500);
  check('? opens the shortcuts sheet', (await page.evaluate(() => window.location.hash)) === '#/shortcuts');

  check(
    'the sheet documents the exam keys',
    (await page.locator('.shortcut-table kbd').allInnerTexts()).includes('F'),
  );

  /*
   * The guardian report's whole value is that it refuses to call a change
   * inside measurement error "progress". A regression there would be silent
   * and would reach a family, so it is checked here rather than only in the
   * unit tests.
   */
  /*
   * A certificate is only worth having if it is hard to get, so the page must
   * publish the awarding rule whether or not the viewer qualifies. A build
   * that showed only a result would let the rule quietly drift.
   */
  /*
   * While the amounts are market reference rates rather than the centre's own
   * prices, every surface must say so. A table of plausible numbers with no
   * label on it is how a wrong price reaches a parent.
   */
  /*
   * The roadmap must refuse to draw a plan with no diagnostic behind it. The
   * seeded learner has not sat a full-length paper, so this is the refusal
   * path — the one a commercial platform is most tempted to replace with a
   * plausible-looking plan.
   */
  /*
   * The wrong turn is the field this library exists for, and it is behind a
   * reveal so the reasoning is read forwards. Both halves are checked.
   */
  /*
   * The whole value of this page is the asymmetry between what the exam gives
   * and what the candidate carries, so both counts are checked, and so is the
   * drill hiding its answers until asked.
   */
  await page.evaluate(() => { window.location.hash = '#/must-know'; });
  await page.waitForTimeout(700);
  const facts = await page.locator('.mk-fact').count();
  check('the must-know list is complete', facts >= 40, `${facts} facts`);
  const given = await page.locator('.mk-fact[data-given]').count();
  check('the exam-supplied formulas are marked apart', given > 0 && given <= 9, `${given} marked as given`);

  await page.getByRole('button', { name: /Tự kiểm tra|Self-test/ }).click();
  await page.waitForTimeout(400);
  const drills = await page.locator('.mk-drill').count();
  check('every fact can be self-tested', drills === facts, `${drills} drills for ${facts} facts`);
  check('drill answers stay hidden until asked', (await page.locator('.mk-answer').count()) === 0);

  await page.evaluate(() => { window.location.hash = '#/expert-solutions'; });
  await page.waitForTimeout(800);
  const cards = await page.locator('.solution-card').count();
  check('the solution library renders every walkthrough', cards >= 25, `${cards} solutions`);
  check('the answer is hidden until the reasoning is opened', (await page.locator('.solution-wrong').count()) === 0);

  await page.getByRole('button', { name: /cách một chuyên gia|how an expert/ }).first().click();
  await page.waitForTimeout(300);
  check('opening one shows the wrong turn and where it breaks', (await page.locator('.solution-wrong').count()) === 1);
  check('and what transfers beyond the item', (await page.locator('.solution-transfer').count()) === 1);

  await page.evaluate(() => { window.location.hash = '#/roadmap'; });
  await page.waitForTimeout(800);
  const roadmapText = await page.locator('.page').innerText();
  check(
    'the roadmap refuses to invent a baseline',
    roadmapText.includes('Chưa có điểm xuất phát') || roadmapText.includes('No starting point'),
  );

  await page.evaluate(() => { window.location.hash = '#/test-dates'; });
  await page.waitForTimeout(700);
  check('the calendar lists every administration', (await page.locator('.dates-table tbody tr').count()) === 8);
  check(
    'derived dates are labelled inline, not in a footnote',
    (await page.locator('.date-derived').count()) > 10,
  );

  await page.evaluate(() => { window.location.hash = '#/programmes'; });
  await page.waitForTimeout(700);
  const feeText = await page.locator('.page').innerText();
  check(
    'unconfirmed fees are labelled, not presented as a price list',
    feeText.includes('KHÔNG phải báo giá') || feeText.includes('not a quote'),
  );
  check('the fee table is derived per course', (await page.locator('.fees-table tbody tr').count()) === 4);

  await page.evaluate(() => { window.location.hash = '#/certificate'; });
  await page.waitForTimeout(700);
  check('the certificate page publishes every band', (await page.locator('.cert-band').count()) === 4);
  const certText = await page.locator('.page').innerText();
  check(
    'the awarding rule is stated on the page, not only in the code',
    certText.includes('KHOẢNG SAI SỐ') || certText.includes('measurement interval'),
  );

  await page.evaluate(() => { window.location.hash = '#/curriculum'; });
  await page.waitForTimeout(800);
  const sessions = await page.locator('.syllabus-session').count();
  check('the syllabus derives a full timetable', sessions >= 8, `${sessions} sessions`);
  check(
    'every unit states why it sits where it does',
    (await page.locator('.syllabus-rationale').count()) >= 3,
  );
  await page.getByRole('button', { name: /Nền tảng|Foundation/ }).click();
  await page.waitForTimeout(500);
  check(
    'switching course rebuilds the timetable',
    (await page.locator('.syllabus-session').count()) !== sessions,
  );

  await page.evaluate(() => { window.location.hash = '#/guardian-report'; });
  await page.waitForTimeout(800);
  check('the guardian report renders', (await page.locator('.doc-masthead').count()) === 1);
  const reportText = await page.locator('.doc').innerText();
  check(
    'the report always states what it cannot tell you',
    reportText.includes('KHÔNG nói được') || reportText.includes('cannot tell you'),
  );
  check(
    'the report never omits the limits list',
    (await page.locator('.report-limits li').count()) >= 2,
  );

  await page.evaluate(() => { window.location.hash = '#/vocab'; });
  await page.waitForTimeout(700);
  await page.getByRole('button', { name: /Nghĩa thứ hai|Second meaning/ }).click();
  await page.waitForTimeout(400);
  const senseRows = await page.locator('.vocab-row').count();
  check('the second-meaning filter narrows the deck', senseRows > 20 && senseRows < 120, `${senseRows} rows`);

  await page.locator('.vocab-row-head').first().click();
  await page.waitForTimeout(300);
  check(
    'opening a second-meaning word shows the tested sense',
    (await page.locator('.vocab-row[data-open] .vocab-sense').count()) === 1,
  );

  await page.evaluate(() => { window.location.hash = '#/lessons'; });
  await page.waitForTimeout(500);
  await page.locator('.lesson-search input').first().click().catch(() => {});
  await page.keyboard.type('?');
  await page.waitForTimeout(300);
  check(
    '? typed into a search box does not navigate',
    (await page.evaluate(() => window.location.hash)) === '#/lessons',
  );

  /*
   * Reloaded rather than navigated. Blurring the search box above does not
   * move the browser's sequential-focus starting point, so a Tab press would
   * resume from where that box used to be — which would test the harness's
   * focus history rather than the page's tab order.
   */
  await page.evaluate(() => { window.location.hash = '#/today'; });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.keyboard.press('Tab');
  const firstStop = await page.evaluate(() => {
    const active = document.activeElement;
    return active instanceof HTMLElement ? active.className : '';
  });
  check('the first tab stop is the skip link', firstStop.includes('skip-link'));

  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  check(
    'the skip link moves focus past the sidebar',
    await page.evaluate(() => {
      const active = document.activeElement;
      return !!active && !active.closest('.sidebar');
    }),
  );

  /* ---------------- Appearance and persistence ---------------- */
  group('Appearance and persistence');
  await page.evaluate(() => { window.location.hash = '#/settings'; });
  await page.waitForTimeout(500);
  const dismiss = page.locator('.modal').getByRole('button', { name: /Bỏ bài|Tiếp tục/ });
  if (await dismiss.count()) {
    await page.locator('.modal').getByRole('button', { name: 'Bỏ bài' }).click().catch(() => {});
    await page.waitForTimeout(400);
  }

  await page.getByRole('button', { name: 'Tối', exact: true }).click();
  await page.waitForTimeout(300);
  check('the dark theme applies', await page.evaluate(() => document.documentElement.dataset.theme === 'dark'));

  await page.getByRole('button', { name: 'Tương phản cao' }).click();
  await page.waitForTimeout(300);
  check('the high-contrast theme applies', await page.evaluate(() => document.documentElement.dataset.theme === 'high-contrast'));

  await page.getByRole('button', { name: 'English' }).click();
  await page.waitForTimeout(400);
  check('the locale switches', (await title()).includes('Settings'));

  await page.getByRole('button', { name: 'Light', exact: true }).click();
  await page.waitForTimeout(300);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  check('state survives a reload', (await page.locator('.topbar').innerText()).includes('Nguyễn Minh'));
} catch (error) {
  check(`unexpected failure: ${error.message}`, false);
} finally {
  await browser.close();
  server.kill();
}

/* ---------------- Report ---------------- */

const real = errors.filter((e) => !e.includes('favicon') && !e.includes('manifest'));

console.log('\nConsole errors');
console.log(real.length ? real.slice(0, 12).map((e) => `  ${e}`).join('\n') : '  (none)');

const failed = steps.filter((s) => !s.ok);
console.log(`\n${steps.length - failed.length}/${steps.length} checks passed`);

if (failed.length > 0 || real.length > 0) {
  if (failed.length > 0) {
    console.error('\nFailed:');
    for (const step of failed) console.error(`  ${step.group} → ${step.name}`);
  }
  process.exit(1);
}
