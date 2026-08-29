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
import { chromium } from 'playwright';

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

  /* ---------------- Access control ---------------- */
  group('Access control');
  check('teaching nav hidden from a student', (await page.getByRole('button', { name: 'Giảng dạy', exact: true }).count()) === 0);

  await page.evaluate(() => { window.location.hash = '#/settings'; });
  await page.waitForTimeout(500);
  await page.locator('select').first().selectOption('teacher');
  await page.waitForTimeout(300);
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
