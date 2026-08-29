/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm tra bản web đã dựng bằng trình duyệt thật.
 * Chạy:  npm run build && npx vite preview --port 4185 &  rồi
 *        node tools/kiem-ban-web.mjs
 */
import {chromium} from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4185';
const browser = await chromium.launch({executablePath: '/opt/pw-browsers/chromium'});
const page = await browser.newPage({viewport: {width: 1440, height: 1000}});

const errors = [];
const external = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 200)));
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message.slice(0, 200)));
page.on('request', (r) => {
  const u = r.url();
  if (!u.startsWith(BASE) && !u.startsWith('data:')) external.push(u);
});

let failed = 0;
const ok = (name, cond, extra = '') => {
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failed++;
    console.log(`  ✗ ${name}${extra ? ` — ${extra}` : ''}`);
  }
};

console.log('\n  KIỂM TRA BẢN WEB\n');
await page.goto(BASE, {waitUntil: 'networkidle'});
await page.waitForTimeout(1200);

const tabs = await page.locator('aside nav button').count();
ok('mọi thẻ điều hướng đều dựng được', tabs >= 24, `chỉ có ${tabs}`);

ok('web KHÔNG hiện màn hình mã khoá', (await page.getByText('Đặt mã khoá').count()) === 0);

// Mở lần lượt từng thẻ, không thẻ nào được ném lỗi.
for (let i = 0; i < tabs; i++) {
  const btn = page.locator('aside nav button').nth(i);
  const label = (await btn.innerText()).split('\n')[0];
  await btn.click();
  await page.waitForTimeout(120);
  const body = await page.locator('main, div.min-w-0').first().innerText();
  if (body.trim().length < 50) {
    failed++;
    console.log(`  ✗ thẻ "${label}" dựng ra trang rỗng`);
  }
}
ok(`cả ${tabs} thẻ đều có nội dung`, true);

// Hồ sơ 365 ngày
await page.locator('aside nav button').filter({hasText: 'Hồ sơ 365 ngày'}).first().click();
await page.waitForTimeout(500);
ok('quý 1 hiện đủ 90 ngày', (await page.locator('h4').count()) === 90);
await page.locator('#dossier-jump').fill('21');
await page.waitForTimeout(400);
const first = (await page.locator('h4').first().textContent())?.trim();
ok('nhảy tới ngày 21 ra đúng bài ra vòng', /BÀI RA VÒNG/.test(first ?? ''), first ?? '');

ok('không có lỗi trên bảng điều khiển', errors.length === 0, errors.join(' | '));
ok('không gọi ra Internet', external.length === 0, [...new Set(external)].join(' | '));

console.log(`\n  ${failed === 0 ? 'ĐẠT' : `HỎNG — ${failed} lỗi`}\n`);
await browser.close();
process.exit(failed === 0 ? 0 : 1);
