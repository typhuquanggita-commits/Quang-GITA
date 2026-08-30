/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm máy tính điểm của lộ trình chuyên Anh.
 *
 * Vì sao bài này tồn tại: một con số sai ở đây làm hỏng kế hoạch hai năm của
 * một đứa trẻ. Không kiểm bằng mắt.
 *
 * Chạy: BASE=http://localhost:4173 node tools/kiem-may-tinh-diem.mjs
 */
import {chromium} from 'playwright';
import {moXemTruoc} from './mo-xem-truoc.mjs';

// Tự dựng máy chủ xem trước nếu chưa có. Đặt BASE=<địa chỉ> để dùng máy
// chủ có sẵn. Xem tools/mo-xem-truoc.mjs.
const {base: B, dong: dongXemTruoc} = await moXemTruoc();
const browser = await chromium.launch({executablePath: '/opt/pw-browsers/chromium'});
/*
 * Phân quyền đã được BẬT, nên vai mặc định chỉ mở 32 trên 37 thẻ. Bài kiểm
 * chạy bằng vai mặc định sẽ bỏ sót năm thẻ vận hành mà không báo gì. Đặt
 * vai chủ nhiệm chuyên môn — vai duy nhất mở đủ 37 thẻ — trước khi trang
 * dựng, để phạm vi kiểm không bị phân quyền thu hẹp trong im lặng.
 */
const ctx = await browser.newContext({viewport: {width: 1440, height: 1050}});
await ctx.addInitScript(() => {
  try {
    localStorage.setItem('engwin365.vai.v1', 'gv-5');
  } catch {
    /* chặn ghi thì chạy bằng vai mặc định; bài kiểm sẽ báo thiếu thẻ */
  }
});
const p = await ctx.newPage();
const errs = [];
p.on('pageerror', (e) => errs.push(e.message.slice(0, 150)));

let bad = 0;
const ok = (n, c, x = '') => {
  if (c) console.log(`  ✓ ${n}`);
  else { bad++; console.log(`  ✗ ${n}${x ? ` — ${x}` : ''}`); }
};

console.log('\n  KIỂM MÁY TÍNH ĐIỂM CHUYÊN ANH\n');
await p.goto(B, {waitUntil: 'networkidle'});
await p.locator('aside nav [data-tab]').filter({hasText: 'Luyện thi chuyên Anh'}).first().click();
await p.waitForTimeout(900);

// Bốn ô thống kê đầu trang là của tab, ba ô tiếp theo mới là của máy tính.
const TAB_STATS = 4;
const stat = async (i) =>
  parseFloat((await p.locator('p.text-2xl').nth(TAB_STATS + i).textContent()) || 'NaN');
const set = async (id, v) => { await p.locator(id).fill(String(v)); await p.waitForTimeout(120); };

const CA = [
  [38, 1, 8, 7, 9],
  [40, 0.5, 9, 8, 9],
  [35, 1, 7, 7, 8],
  [46, 1, 9, 9, 9],
  [30, 0.5, 6, 6, 7],
];

for (const [chuan, bien, toan, van, ng] of CA) {
  await set('#c-chuan', chuan); await set('#c-bien', bien);
  await set('#c-toan', toan); await set('#c-van', van); await set('#c-ng', ng);
  await p.waitForTimeout(250);

  const dichMong = chuan + bien;
  // Bài chuyên nhân hệ số hai nên phần còn thiếu chia đôi, kẹp trong 0–10.
  const chuyenMong = Math.max(0, Math.min(10, (dichMong - toan - van - ng) / 2));
  const tongMong = toan + van + ng + chuyenMong * 2;

  const [dich, chuyen, dat] = [await stat(0), await stat(1), await stat(2)];
  const nhan = `chuẩn ${chuan} biên ${bien} · ${toan}/${van}/${ng}`;
  ok(`${nhan} → tổng đích ${dichMong}`, Math.abs(dich - dichMong) < 0.02, `máy ra ${dich}`);
  ok(`${nhan} → bài chuyên cần ${chuyenMong.toFixed(2)}`,
     Math.abs(chuyen - chuyenMong) < 0.02, `máy ra ${chuyen}`);
  ok(`${nhan} → tổng đạt ${tongMong.toFixed(2)}`,
     Math.abs(dat - tongMong) < 0.02, `máy ra ${dat}`);
}

// Ca bất khả thi phải được cảnh báo, không im lặng trả về 10.
await set('#c-chuan', 48); await set('#c-bien', 1);
await set('#c-toan', 5); await set('#c-van', 5); await set('#c-ng', 5);
await p.waitForTimeout(300);
ok('ca bất khả thi được cảnh báo rõ', /bất khả thi/i.test(await p.locator('body').innerText()));

// Ca dưới mốc 7,0 phải khuyên vẫn nhắm 7,0.
await set('#c-chuan', 30); await set('#c-bien', 0.5);
await set('#c-toan', 9); await set('#c-van', 9); await set('#c-ng', 9);
await p.waitForTimeout(300);
ok('ca dưới mốc 7,0 vẫn khuyên nhắm 7,0',
   /vẫn nên nhắm 7,0/i.test(await p.locator('body').innerText()));

// Số câu cần đúng không bao giờ vượt số câu có, ở mọi mức mục tiêu.
let vuot = 0;
for (const [c, t] of [[46, 9], [40, 8], [34, 7], [28, 6]]) {
  await set('#c-chuan', c); await set('#c-toan', t); await set('#c-van', t); await set('#c-ng', t);
  await p.waitForTimeout(200);
  for (const r of await p.locator('table tbody tr').allTextContents()) {
    const m = r.match(/(\d+)\s+(\d+)\s+(\d+)%/);
    if (m && Number(m[2]) > Number(m[1])) vuot++;
  }
}
ok('số câu cần đúng không bao giờ vượt số câu có', vuot === 0, `${vuot} lần vượt`);

ok('không lỗi trên bảng điều khiển', errs.length === 0, errs[0]);
console.log(`\n  ${bad === 0 ? 'ĐẠT' : `HỎNG — ${bad} lỗi`}\n`);
await browser.close();
dongXemTruoc(), process.exit(bad ? 1 : 0);
