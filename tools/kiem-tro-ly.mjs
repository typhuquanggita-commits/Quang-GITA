/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm bản giao việc của trợ lý bằng trình duyệt thật.
 *
 * Lời hứa cốt lõi: bản giao việc phải VỪA quỹ thời gian người học có. Bản đầu
 * tiên co đều sáu khối với sàn 2 phút, nên khi người học chỉ có 10 phút thì
 * trợ lý trả về 14 — hứa vừa quỹ rồi phá lời hứa ngay trên cùng màn hình.
 * Bài này quét mọi quỹ thời gian trên nhiều ngày để lỗi đó không quay lại.
 *
 * Chạy: BASE=http://localhost:4173 node tools/kiem-tro-ly.mjs
 */
import {chromium} from 'playwright';

const B = process.env.BASE || 'http://localhost:4173';
const QUY = [10, 20, 30, 45, 60, 90];
const NGAY = [1, 23, 63, 87, 111, 200, 291, 356, 363];

const b = await chromium.launch({executablePath: '/opt/pw-browsers/chromium'});
const p = await b.newPage({viewport: {width: 1440, height: 1000}});
const errs = [];
p.on('pageerror', (e) => errs.push(e.message.slice(0, 150)));

let bad = 0;
const ok = (n, c, x = '') => {
  if (c) console.log(`  ✓ ${n}`);
  else {
    bad++;
    console.log(`  ✗ ${n}${x ? ` — ${x}` : ''}`);
  }
};

console.log('\n  KIỂM BẢN GIAO VIỆC CỦA TRỢ LÝ\n');
await p.goto(B, {waitUntil: 'networkidle'});
await p.locator('aside nav button').filter({hasText: 'Trợ lý AI'}).first().click();
await p.waitForTimeout(800);

const tongPhut = async () => {
  const t = await p.locator('span.tabular-nums').allTextContents();
  return t.map((x) => parseInt(x, 10)).filter(Number.isFinite).reduce((s, n) => s + n, 0);
};
const chip = async () => {
  const t = await p.locator('span').filter({hasText: /^\d+′ hôm nay$/}).first().textContent();
  return parseInt(t ?? '0', 10);
};

let vuot = 0;
let lechChip = 0;
for (const ngay of NGAY) {
  await p.locator('#a-day').fill(String(ngay));
  for (const quy of QUY) {
    await p.selectOption('#a-budget', String(quy));
    await p.waitForTimeout(120);
    const tong = await tongPhut();
    const c = await chip();
    if (tong > quy) {
      vuot++;
      if (vuot === 1)
        console.log(`      ngày ${ngay}, quỹ ${quy}′ → giao ${tong}′`);
    }
    if (tong !== c) lechChip++;
  }
}
ok(`không bản nào vượt quỹ thời gian (${NGAY.length} ngày × ${QUY.length} mức)`, vuot === 0,
   `${vuot} lần vượt`);
ok('nhãn tổng phút khớp với tổng các khối', lechChip === 0, `${lechChip} lần lệch`);

// Ngày xấu phải hiện cảnh báo và tạm dừng đơn kê.
await p.locator('#a-day').fill('23');
await p.selectOption('#a-budget', '10');
await p.waitForTimeout(300);
const noiDung = (await p.locator('div.min-w-0, p').allTextContents()).join(' ');
ok('ngày xấu có cảnh báo rút gọn', /ngày xấu/i.test(noiDung));
ok('ngày xấu tạm dừng đơn kê', /tạm\s*dừng hôm nay/i.test(noiDung));
ok('ngày xấu nói rõ khối nào bị bỏ', /Đã bỏ hôm nay/i.test(noiDung));

// Ngày rộng rãi phải chạy đơn kê trở lại và giữ đủ sáu khối.
await p.selectOption('#a-budget', '60');
await p.waitForTimeout(300);
const rong = (await p.locator('div.min-w-0, p').allTextContents()).join(' ');
ok('quỹ rộng thì đơn kê chạy lại', /ĐƠN KÊ ĐANG CHẠY|Đo lại/i.test(rong));
ok('quỹ rộng thì không còn cảnh báo ngày xấu', !/ngày xấu/i.test(rong));

// Đổi gói phải đổi danh sách điều trợ lý không làm.
await p.selectOption('#a-pkg', 'p-tuhoc');
await p.waitForTimeout(250);
const tuhoc = (await p.locator('p, li').allTextContents()).join(' ');
await p.selectOption('#a-pkg', 'p-kemsau');
await p.waitForTimeout(250);
const kemsau = (await p.locator('p, li').allTextContents()).join(' ');
ok('đổi gói thì phạm vi trợ lý đổi theo', tuhoc !== kemsau);

ok('không có lỗi trên bảng điều khiển', errs.length === 0, errs.slice(0, 2).join(' | '));
console.log(`\n  ${bad === 0 ? 'ĐẠT' : `HỎNG — ${bad} lỗi`}\n`);
await b.close();
process.exit(bad ? 1 : 0);
