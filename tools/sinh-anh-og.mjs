/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Sinh ảnh chia sẻ 1200×630 (JPEG) cho từng trang công khai.
 *
 * VÌ SAO CẦN
 *   Khi ai đó dán địa chỉ vào Zalo, Facebook, Messenger hay Telegram, máy
 *   đọc của các nền tảng đó lấy đúng thẻ og:image để dựng ô xem trước.
 *   Không có ảnh thì ô xem trước là một mảng trống — và mảng trống thì gần
 *   như không ai bấm vào. Đây là chỗ ảnh hưởng thẳng tới lượt bấm, không
 *   phải chỗ trang trí.
 *
 *   1200×630 là kích thước cả bốn nền tảng đều nhận và không cắt xén.
 *
 * VÌ SAO SINH BẰNG MÃ CHỨ KHÔNG VẼ TAY
 *   39 trang là 39 ảnh, và mỗi lần sửa một tiêu đề là phải vẽ lại. Sinh
 *   bằng mã thì tiêu đề trên ảnh LUÔN khớp với tiêu đề của trang, không có
 *   đường lệch. Màu và chữ lấy thẳng từ bộ nhận diện GITA ở data/brand.ts.
 */
import {chromium} from 'playwright';
import {mkdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const {TRANG_CONG_KHAI} = await import('../data/seo.ts');
const {COLORS, TIER_COLORS} = await import('../data/brand.ts');

const RA = join('dist', 'og');
mkdirSync(RA, {recursive: true});

/* Một trang một cặp màu, lấy xoay vòng trong dải năm tầng của thương hiệu.
   Xoay theo thứ tự trang nên cùng một trang luôn ra cùng một màu. */
const cap = (i) => TIER_COLORS[i % TIER_COLORS.length];

const thoat = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const mau = (t, i) => {
  const c = cap(i);
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{width:1200px;height:630px;background:${COLORS.ink.hex};
         font-family:Inter,'DejaVu Sans',system-ui,sans-serif;color:${COLORS.bright.hex};
         display:flex;flex-direction:column;justify-content:space-between;
         padding:72px 80px;position:relative;overflow:hidden}
    .dai{position:absolute;top:0;left:0;right:0;height:10px;
         background:linear-gradient(90deg,${c.from},${c.to})}
    .hao{position:absolute;right:-160px;bottom:-220px;width:640px;height:640px;
         border-radius:50%;background:radial-gradient(circle,${c.to}22,transparent 68%)}
    .hieu{font-size:26px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;
          color:${COLORS.muted.hex}}
    .hieu b{color:${COLORS.primary.hex}}
    h1{font-size:${t.tieuDe.length > 52 ? 54 : 64}px;line-height:1.1;font-weight:900;
       letter-spacing:-.03em;max-width:1000px;text-wrap:balance}
    p{margin-top:22px;font-size:26px;line-height:1.45;color:${COLORS.body.hex};max-width:940px}
    .chan{display:flex;align-items:center;gap:16px;font-size:22px;color:${COLORS.muted.hex}}
    .cham{width:12px;height:12px;border-radius:50%;
          background:linear-gradient(135deg,${c.from},${c.to})}
  </style></head><body>
    <div class="dai"></div><div class="hao"></div>
    <div class="hieu">ENGWIN<b>365</b> · GITA365</div>
    <div><h1>${thoat(t.tieuDe)}</h1><p>${thoat(t.moTa)}</p></div>
    <div class="chan"><span class="cham"></span>engwin365.gita365.vn</div>
  </body></html>`;
};

const trinh = await chromium.launch({executablePath: '/opt/pw-browsers/chromium'});
const trang = await trinh.newPage({viewport: {width: 1200, height: 630}});
let n = 0;
let tong = 0;
for (const [i, t] of TRANG_CONG_KHAI.entries()) {
  await trang.setContent(mau(t, i), {waitUntil: 'load'});
  // JPEG chứ không PNG: ảnh có dải chuyển màu nên PNG nặng gấp bốn lần mà
  // mắt không phân biệt được. Cả bốn nền tảng chia sẻ đều nhận JPEG.
  const anh = await trang.screenshot({type: 'jpeg', quality: 90});
  writeFileSync(join(RA, `${t.duongDan}.jpg`), anh);
  tong += anh.length;
  n++;
}
await trinh.close();
console.log(
  `  ✓ ${n} ảnh chia sẻ 1200×630 (JPEG) — tổng ${(tong / 1024 / 1024).toFixed(2)} MB, ` +
    `trung bình ${Math.round(tong / n / 1024)} kB`,
);
