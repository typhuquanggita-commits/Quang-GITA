/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Sinh robots.txt, sitemap.xml, trang 404 và HTML tĩnh cho từng địa chỉ.
 * Chạy: npm run build && npx tsx tools/sinh-seo.mjs
 *
 * VÌ SAO PHẢI DỰNG SẴN HTML TĨNH
 *   Ứng dụng này dựng toàn bộ nội dung bằng JavaScript. Google có chạy được
 *   JavaScript, nhưng nó chạy ở lượt thứ hai, xếp hàng, và không phải lúc
 *   nào cũng chạy tới nơi. Máy tìm kiếm khác và phần lớn công cụ xem trước
 *   liên kết của mạng xã hội thì không chạy JavaScript chút nào.
 *
 *   Dựng sẵn nghĩa là mở từng địa chỉ bằng một trình duyệt thật ngay lúc
 *   đóng gói, đợi trang dựng xong, rồi lưu lại HTML đã có nội dung. Người
 *   dùng vẫn nhận đủ ứng dụng động như cũ — nhưng máy tìm kiếm đọc được
 *   nội dung ngay ở lượt đầu, không cần đợi lượt thứ hai.
 *
 * DỰNG BẰNG VAI MẶC ĐỊNH, KHÔNG DỰNG BẰNG VAI CAO NHẤT
 *   Bản dựng sẵn phải là đúng thứ khách vãng lai nhìn thấy. Dựng bằng vai
 *   giáo viên bậc 5 thì HTML gửi cho mọi người sẽ chứa cả màn hình vận
 *   hành nội bộ, và người dùng thấy chúng loé lên rồi biến mất khi
 *   JavaScript chạy. Vừa lộ thứ không nên lộ, vừa nhấp nháy.
 */
import {chromium} from 'playwright';
import {writeFileSync, readFileSync, mkdirSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {moXemTruoc} from './mo-xem-truoc.mjs';
import {ngaySuaTheoTab} from './ngay-sua.mjs';

const {TRANG_CONG_KHAI, TRANG_NOI_BO, GOC, duongDanCuaTab} = await import('../data/seo.ts');

const DIST = 'dist';
let loi = 0;
const bao = (m) => console.log(`  ${m}`);
const hong = (m) => {
  loi++;
  console.log(`  ✗ ${m}`);
};

console.log('\n  SINH TỆP SEO\n');

/*
 * Giữ lại VỎ ứng dụng trước khi ghi đè bất cứ thứ gì. Vỏ là bản index.html
 * do Vite sinh ra: có thẻ script, chưa có nội dung. Các địa chỉ nội bộ sẽ
 * dùng vỏ này thay vì bản dựng sẵn.
 */
const VO = readFileSync(join(DIST, 'index.html'), 'utf8');
if (!/<script[^>]+src=/.test(VO)) {
  hong('bản dựng không có thẻ script — chạy npm run build trước');
  process.exit(1);
}

/* ------------------------------ robots.txt ------------------------------ */
/*
 * KHÔNG chặn gì bằng Disallow, kể cả các địa chỉ nội bộ.
 *
 * Đây là chỗ nhiều người làm ngược. Disallow không có nghĩa là "đừng đưa
 * vào chỉ mục" — nó có nghĩa là "đừng tải trang này". Máy tìm kiếm không
 * tải trang thì cũng không đọc được thẻ noindex trong đó, nên trang vẫn có
 * thể lọt vào kết quả qua một liên kết từ nơi khác, mà lại lọt vào không
 * kèm mô tả. Muốn giữ một trang ra khỏi chỉ mục thì để nó tải được và đặt
 * noindex — đúng cách hệ thống này làm ở data/seo.ts.
 */
const robots = `# ENGWIN365 — GITA365
User-agent: *
Allow: /

Sitemap: ${GOC}/sitemap.xml
`;
writeFileSync(join(DIST, 'robots.txt'), robots);
bao('✓ robots.txt — không chặn gì, chỉ tới sitemap');

/* ------------------------------ sitemap.xml ----------------------------- */
/*
 * Chỉ gồm trang CÔNG KHAI. Đưa trang nội bộ vào sitemap là mời máy tìm
 * kiếm thu thập đúng những trang nó sẽ bị đẩy đi chỗ khác.
 *
 * Không ghi changefreq: Google nói thẳng là họ bỏ qua nó từ lâu, và khai
 * "weekly" cho một trang không đổi hàng tháng chỉ là một câu sai nữa trong
 * tệp. Ghi ít mà đúng hơn ghi nhiều mà sai.
 */
const ngaySua = ngaySuaTheoTab();
const duNgay = new Date().toISOString();
const xmlAnToan = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  TRANG_CONG_KHAI.map((t) => {
    const u = xmlAnToan(`${GOC}${duongDanCuaTab(t.tabId)}`);
    const n = ngaySua[t.tabId]?.ngay ?? duNgay;
    return `  <url>\n    <loc>${u}</loc>\n    <lastmod>${n}</lastmod>\n    <priority>${t.uuTien.toFixed(1)}</priority>\n  </url>`;
  }).join('\n') +
  '\n</urlset>\n';
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
bao(
  `✓ sitemap.xml — ${TRANG_CONG_KHAI.length} địa chỉ công khai, ` +
    `ngày sửa lấy từ lịch sử git chứ không phải ngày đóng gói`,
);
bao(`· ${TRANG_NOI_BO.length} địa chỉ nội bộ nằm ngoài sitemap và mang thẻ noindex`);

/* --------------------- DỰNG SẴN HTML CHO TỪNG ĐỊA CHỈ ------------------- */
const {base: B, dong: dongXemTruoc} = await moXemTruoc();
const trinh = await chromium.launch({executablePath: '/opt/pw-browsers/chromium'});
const ctx = await trinh.newContext({viewport: {width: 1440, height: 1000}});
const trang = await ctx.newPage();

/*
 * BỎ ĐỊA CHỈ MÁY CHỦ XEM TRƯỚC RA KHỎI HTML LƯU LẠI.
 *
 * Đây là một lỗi thật đã suýt lọt ra bản phát hành. Bộ nạp mô-đun của Vite
 * chèn thêm <link rel="modulepreload"> lúc chạy, và nó chèn bằng địa chỉ
 * TUYỆT ĐỐI dựng từ import.meta.url — tức là kèm cả tên máy và cổng của
 * máy chủ xem trước. Lưu nguyên thì mỗi trang dựng sẵn mang theo một dòng
 * http://localhost:38393/assets/... đóng băng trong đó.
 *
 * Trên máy người dùng thì cổng đó không tồn tại: liên kết chết, CSP chặn
 * vì khác gốc, và bảng điều khiển đầy lỗi. Nó còn để lộ cổng của máy đóng
 * gói. Trang vẫn hiện ra nên lỗi này rất dễ trôi qua — đúng loại lỗi phải
 * có bài kiểm chặn lại, và tools/kiem-seo.mjs có một mục riêng cho nó.
 *
 * Đổi về đường dẫn từ gốc để tệp dùng được ở bất kỳ tên miền nào.
 */
const doiVeGocTuongDoi = (html) => html.split(B).join('');

const ghi = (duong, html) => {
  const dich = duong === '/' ? join(DIST, 'index.html') : join(DIST, duong.slice(1), 'index.html');
  mkdirSync(dirname(dich), {recursive: true});
  writeFileSync(dich, html);
};

let daDung = 0;
for (const t of TRANG_CONG_KHAI) {
  const duong = duongDanCuaTab(t.tabId);
  await trang.goto(`${B}${duong}`, {waitUntil: 'networkidle'});
  await trang.waitForFunction(() => document.querySelectorAll('main h1, main h2').length > 0, {
    timeout: 15_000,
  });
  await trang.waitForTimeout(300);

  const do_ = await trang.evaluate(() => ({
    chu: (document.querySelector('main')?.innerText || '').trim().length,
    soH1: document.querySelectorAll('main h1').length,
    soLien: document.querySelectorAll('nav a[href^="/"]').length,
  }));
  if (do_.chu < 400) {
    hong(`${duong} — chỉ ${do_.chu} ký tự nội dung, quá mỏng`);
    continue;
  }
  if (do_.soH1 !== 1) {
    hong(`${duong} — có ${do_.soH1} thẻ <h1>, phải đúng một`);
    continue;
  }
  if (do_.soLien < 10) {
    hong(`${duong} — chỉ ${do_.soLien} liên kết điều hướng, trang gần như mồ côi`);
    continue;
  }
  ghi(duong, doiVeGocTuongDoi(await trang.content()));
  daDung++;
}
bao(`✓ dựng sẵn ${daDung}/${TRANG_CONG_KHAI.length} trang công khai, mỗi trang một tệp HTML có nội dung`);

/*
 * Địa chỉ nội bộ nhận VỎ ứng dụng kèm thẻ noindex đặt sẵn trong HTML.
 *
 * Không dựng sẵn nội dung cho chúng vì khách vãng lai bị đưa về thẻ khác —
 * dựng sẵn sẽ ra nội dung của thẻ khác nằm ở địa chỉ này, tức là hai địa
 * chỉ cùng một nội dung. Đặt noindex thẳng trong HTML chứ không đợi
 * JavaScript, vì máy tìm kiếm phải đọc được nó ngay ở lượt đầu.
 */
const NOINDEX = '<meta name="robots" content="noindex, follow" />';
for (const t of TRANG_NOI_BO) {
  ghi(duongDanCuaTab(t.tabId), VO.replace('<title>', `${NOINDEX}\n    <title>`));
}
bao(`✓ ${TRANG_NOI_BO.length} địa chỉ nội bộ nhận vỏ ứng dụng kèm noindex sẵn trong HTML`);

/* -------------------------------- 404 ---------------------------------- */
/*
 * Trang 404 thật, không phải chuyển hướng về trang gốc. Chuyển hướng địa
 * chỉ hỏng về trang gốc tạo ra "404 mềm": máy tìm kiếm nhận mã 200 kèm nội
 * dung không khớp địa chỉ, và đó là một trong những lỗi bị hạ giá rõ nhất.
 */
const nhanh = TRANG_CONG_KHAI.slice()
  .sort((a, b) => b.uuTien - a.uuTien)
  .slice(0, 8);
writeFileSync(
  join(DIST, '404.html'),
  `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, follow" />
    <title>Không có trang này — ENGWIN365</title>
    <style>
      body{margin:0;background:#020617;color:#F1F5F9;font-family:Inter,system-ui,sans-serif;
           display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}
      .h{max-width:640px}
      p.e{font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#38BDF8;margin:0}
      h1{font-size:34px;line-height:1.15;margin:12px 0 0}
      p.l{color:#CBD5E1;line-height:1.6;margin:16px 0 28px}
      ul{list-style:none;padding:0;margin:0;display:grid;gap:8px}
      a{color:#38BDF8;text-decoration:none;font-size:15px}
      a:hover,a:focus{text-decoration:underline}
    </style>
  </head>
  <body>
    <div class="h">
      <p class="e">ENGWIN365 · GITA365</p>
      <h1>Không có trang này</h1>
      <p class="l">Địa chỉ bạn vừa mở không tồn tại, hoặc đã đổi tên. Dưới đây là những trang được mở nhiều nhất.</p>
      <ul>
${nhanh.map((t) => `        <li><a href="${duongDanCuaTab(t.tabId)}">${t.tieuDe}</a></li>`).join('\n')}
      </ul>
    </div>
  </body>
</html>
`,
);
bao(`✓ 404.html — trang thật kèm ${nhanh.length} lối đi tiếp, không chuyển hướng về gốc`);

/* ----------------------------- kiểm lại nhanh --------------------------- */
const goc = readFileSync(join(DIST, 'index.html'), 'utf8');
/<script[^>]+src=/.test(goc)
  ? bao('✓ trang gốc vẫn giữ thẻ script — người dùng vẫn nhận đủ ứng dụng động')
  : hong('trang gốc mất thẻ script, người dùng sẽ nhận một trang chết');

existsSync(join(DIST, 'og'))
  ? bao('✓ thư mục ảnh chia sẻ đã có')
  : bao('· chưa có ảnh chia sẻ — chạy tools/sinh-anh-og.mjs');

existsSync(join(DIST, '_headers'))
  ? bao('✓ tệp _headers còn nguyên')
  : bao('· không thấy _headers (bình thường nếu nơi đăng không dùng)');

dongXemTruoc();
await trinh.close();
console.log(`\n  ${loi === 0 ? 'ĐẠT — tệp SEO đã sinh xong' : `HỎNG — ${loi} lỗi`}\n`);
process.exit(loi === 0 ? 0 : 1);
