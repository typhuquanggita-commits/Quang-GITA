/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Thi thử bấm giờ — kiểm bằng trình duyệt thật, không kiểm bằng mắt.
 *
 * VÌ SAO BÀI NÀY TỒN TẠI
 *   Bộ chấm đã có bài kiểm riêng (tools/kiem-chamthi.ts), nhưng bộ chấm đúng
 *   không có nghĩa là màn hình thi đúng. Ba chỗ chỉ trình duyệt mới nói được:
 *     1. Đáp án có thật sự bị GIẤU trong lúc làm bài không — nếu chuỗi đáp án
 *        lọt vào DOM thì bài thi thử mất sạch giá trị, mà nhìn mắt không thấy.
 *     2. Đóng trang rồi mở lại thì bài làm còn không, và đồng hồ có chạy tiếp
 *        theo thời gian ngoài đời không.
 *     3. Nộp bài xong có ra đúng hai con số không.
 *
 * Chạy: node tools/kiem-thi-thu.mjs
 */
import {chromium} from 'playwright';
import {moXemTruoc} from './mo-xem-truoc.mjs';

const {base: BASE, dong: dongXemTruoc} = await moXemTruoc();
const browser = await chromium.launch({executablePath: '/opt/pw-browsers/chromium'});
const ctx = await browser.newContext({viewport: {width: 1440, height: 1000}});
const page = await ctx.newPage();

const loi = [];
page.on('pageerror', (e) => loi.push('PAGEERROR ' + e.message.slice(0, 200)));
page.on('console', (m) => m.type() === 'error' && loi.push(m.text().slice(0, 200)));

let hong = 0;
const ok = (ten, dieu, them = '') => {
  if (dieu) console.log(`  ✓ ${ten}`);
  else {
    hong++;
    console.log(`  ✗ ${ten}${them ? ' — ' + them : ''}`);
  }
};

console.log('\n  THI THỬ BẤM GIỜ — KIỂM BẰNG TRÌNH DUYỆT THẬT\n');

await page.goto(`${BASE}/thi-thu-bam-gio`, {waitUntil: 'networkidle'});
await page.waitForTimeout(600);

/* --- Màn chọn đề --- */
const nut = page.getByRole('button', {name: /^Bắt đầu làm — /});
const soNut = await nut.count();
ok('màn chọn đề hiện đủ bốn nút bắt đầu', soNut === 4, `thấy ${soNut}`);

/* --- Bắt đầu đề ngắn nhất để bài kiểm chạy nhanh --- */
const nhan = await nut.allInnerTexts();
const phut = nhan.map((t) => Number(t.match(/(\d+) phút/)?.[1] ?? 0));
const iNgan = phut.indexOf(Math.min(...phut));
await nut.nth(iNgan).click();
await page.waitForTimeout(500);

const dongHo = page.locator('span.font-mono').first();
const t1 = await dongHo.innerText();
ok('đồng hồ hiện ở dạng phút:giây', /^\d{2}:\d{2}$/.test(t1.trim()), t1);
const giay = (s) => {
  const [p, g] = s.trim().split(':').map(Number);
  return p * 60 + g;
};
ok(
  'đồng hồ bắt đầu đúng bằng thời gian đề',
  Math.abs(giay(t1) - phut[iNgan] * 60) <= 2,
  `${giay(t1)}s vs ${phut[iNgan] * 60}s`,
);

/* --- Đáp án phải bị giấu --- */
const daGiau = await page.evaluate(() => {
  const t = document.body.innerText;
  return {
    coChuDapAn: /Đáp án —/.test(t),
    coLoiGiai: /Lời giải —/.test(t),
    coBarem: /Barem phần/.test(t),
  };
});
ok('trong lúc làm bài không lộ chữ "Đáp án —"', !daGiau.coChuDapAn);
ok('trong lúc làm bài không lộ lời giải', !daGiau.coLoiGiai);
ok('trong lúc làm bài không lộ barem chấm', !daGiau.coBarem);

/* --- Trả lời vài câu --- */
const oTracNghiem = page.locator('[id^="cau-"] button[aria-pressed]');
const soO = await oTracNghiem.count();
ok('có ô lựa chọn để bấm', soO > 0, `${soO} ô`);
await oTracNghiem.nth(0).click();
await oTracNghiem.nth(5).click();
await page.waitForTimeout(200);
const daChon = await page.locator('[id^="cau-"] button[aria-pressed="true"]').count();
ok('bấm hai ô thì đúng hai ô được đánh dấu đã chọn', daChon === 2, `${daChon} ô`);
const tienDo1 = await page.locator('text=/đã làm \\d+\\/\\d+ câu/').first().innerText();
ok('thanh trạng thái đếm đúng 2 câu đã làm', /đã làm 2\//.test(tienDo1), tienDo1);

/* --- Điền một câu tự luận nếu đề có --- */
const oGo = page.locator('[id^="cau-"] input[type="text"]');
if (await oGo.count()) {
  await oGo.nth(0).fill('xyz-không-phải-đáp-án');
  await page.waitForTimeout(200);
}

/* --- Đóng trang rồi mở lại: bài làm còn, đồng hồ chạy tiếp --- */
const truocKhiCho = giay(await dongHo.innerText());
await page.waitForTimeout(3200);
await page.reload({waitUntil: 'networkidle'});
await page.waitForTimeout(700);
const sauKhiMoLai = giay(await page.locator('span.font-mono').first().innerText());
ok(
  'mở lại trang thì đồng hồ đã trôi tiếp theo thời gian thật',
  truocKhiCho - sauKhiMoLai >= 3 && truocKhiCho - sauKhiMoLai <= 12,
  `trôi ${truocKhiCho - sauKhiMoLai}s`,
);
const conChon = await page.locator('[id^="cau-"] button[aria-pressed="true"]').count();
ok('mở lại trang thì các câu đã làm vẫn còn nguyên', conChon === 2, `${conChon} ô`);

/* --- Nộp bài --- */
await page.getByRole('button', {name: 'Nộp bài và xem kết quả'}).click();
await page.waitForTimeout(600);

const kq = await page.evaluate(() => document.body.innerText);
ok('nộp xong hiện điểm máy chấm được', /điểm đã chấm được/.test(kq));
ok('nộp xong hiện riêng điểm chờ tự chấm', /điểm chờ tự chấm/.test(kq));
ok('nộp xong mới hiện đáp án', /Đáp án —/.test(kq));
ok('nộp xong có lời đọc kết quả, không chỉ một con số', /Đọc kết quả/.test(kq));
ok('bảng theo phần có hiện', /chờ tự chấm/i.test(kq));
ok('chỉ liệt kê những câu cần xem lại', /\d+ câu cần xem lại/.test(kq));

const hai = await page.evaluate(() => {
  const t = document.body.innerText;
  const m = t.match(/([\d.]+)\/([\d.]+)\s*\n?\s*điểm đã chấm được/);
  return m ? {dat: Number(m[1]), tong: Number(m[2])} : null;
});
ok('điểm đã chấm nhỏ hơn hoặc bằng thang điểm', hai && hai.dat <= hai.tong, JSON.stringify(hai));
ok('làm hai câu trắc nghiệm ngẫu nhiên thì không thể đạt điểm tối đa', hai && hai.dat < hai.tong);

/* --- Về màn chọn đề: lịch sử phải ghi lại --- */
await page.getByRole('button', {name: 'Chọn đề khác'}).click();
await page.waitForTimeout(400);
const ls = await page.evaluate(() => document.body.innerText);
ok('lịch sử ghi lại đúng một lần thi', /Lịch sử 1 lần thi thử/.test(ls));
ok('thẻ đề hiện điểm lần gần nhất', /Lần gần nhất:/.test(ls));

ok('không lỗi JavaScript nào trong cả luồng thi', loi.length === 0, loi.join(' | '));

await browser.close();
await dongXemTruoc?.();
console.log(
  `\n  ${hong === 0 ? 'ĐẠT — luồng thi thử chạy đúng từ chọn đề tới kết quả' : `HỎNG — ${hong} lỗi`}\n`,
);
process.exit(hong ? 1 : 0);
