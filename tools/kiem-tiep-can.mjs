/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm TIẾP CẬN của bản web bằng axe-core, quét đủ cả 37 thẻ.
 *
 * VÌ SAO CÓ BÀI NÀY
 *   Lần quét đầu tiên tìm ra 3.356 chỗ chữ không đủ tương phản, trải khắp 29
 *   mục. Nguyên nhân gọn: hai màu slate-500 và slate-600 chỉ đạt 2,5–4,2 trên
 *   nền tối, trong khi chuẩn WCAG AA đòi 4,5. Không ai phát hiện được bằng mắt
 *   vì chữ vẫn "đọc được" trên màn hình tốt trong phòng tối — nhưng học viên
 *   dùng máy rẻ, màn hình loá, ngồi cạnh cửa sổ thì không.
 *
 *   Sửa xong thì phải có bài kiểm giữ, nếu không lần thêm giao diện sau lại
 *   rơi về màu cũ mà không ai biết.
 *
 * Chạy:  BASE=http://localhost:4173 node tools/kiem-tiep-can.mjs
 */
import {chromium} from 'playwright';
import {moXemTruoc} from './mo-xem-truoc.mjs';
import {readFileSync} from 'node:fs';

// Tự dựng máy chủ xem trước nếu chưa có. Đặt BASE=<địa chỉ> để dùng máy
// chủ có sẵn. Xem tools/mo-xem-truoc.mjs.
const {base: B, dong: dongXemTruoc} = await moXemTruoc();
const axe = readFileSync('node_modules/axe-core/axe.min.js', 'utf8');

/*
 * bypassCSP CHỈ CHO TRÌNH DUYỆT CỦA BÀI KIỂM, KHÔNG PHẢI CHO SẢN PHẨM.
 *
 * Bản web mang chính sách script-src 'self', nên trình duyệt từ chối mọi
 * script nội tuyến — kể cả script mà bài kiểm bơm vào để chạy axe-core.
 * Đó là CSP làm đúng việc của nó. Nới CSP để bài kiểm chạy được là bán rẻ
 * lớp chặn XSS mạnh nhất của trang để lấy một con số xanh; ở đây làm ngược
 * lại: trang giữ nguyên chính sách, chỉ phiên trình duyệt của bài kiểm mới
 * được phép bơm mã. tools/kiem-bao-mat.mjs kiểm rằng chính sách của trang
 * vẫn còn nguyên.
 *
 * VAI GV-5 ĐỂ QUÉT ĐỦ MỌI THẺ
 * Phân quyền đã được bật, nên vai mặc định chỉ mở 32 trên 37 thẻ. Quét
 * bằng vai mặc định thì năm thẻ vận hành không bao giờ được soi. Đặt vai
 * chủ nhiệm chuyên môn — vai duy nhất mở đủ 37 thẻ — trước khi trang dựng.
 */
const b = await chromium.launch({executablePath: '/opt/pw-browsers/chromium'});
const ctx = await b.newContext({viewport: {width: 1440, height: 1000}, bypassCSP: true});
await ctx.addInitScript(() => {
  try {
    localStorage.setItem('engwin365.vai.v1', 'gv-5');
  } catch {
    /* chặn ghi thì quét bằng vai mặc định, số thẻ sẽ ít hơn và bài kiểm báo */
  }
});
const p = await ctx.newPage();
await p.goto(B, {waitUntil: 'networkidle'});

console.log('\n  KIỂM TIẾP CẬN — WCAG 2.1 mức A và AA\n');

const tabs = await p.$$eval('aside nav button[data-tab]', (es) => es.map((e) => e.dataset.tab));
const CAN_QUET = 39;
if (tabs.length !== CAN_QUET) {
  console.log(
    `  ✗ thấy ${tabs.length} mục, cần đủ ${CAN_QUET} — hoặc bộ chọn lỗi thời, ` +
      `hoặc vai gv-5 không đặt được nên còn thẻ chưa quét\n`,
  );
  await b.close();
  dongXemTruoc(), process.exit(1);
}

const gop = {};
let tong = 0;
for (const t of tabs) {
  await p.click(`aside nav button[data-tab="${t}"]`);
  await p.waitForTimeout(300);
  await p.addScriptTag({content: axe});
  const loi = await p.evaluate(async () => {
    const r = await window.axe.run(document, {
      runOnly: ['wcag2a', 'wcag2aa'],
      resultTypes: ['violations'],
    });
    return r.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      n: v.nodes.length,
      help: v.help,
      vd: v.nodes.slice(0, 1).map((x) => x.html.slice(0, 120)),
    }));
  });
  for (const v of loi) {
    gop[v.id] = gop[v.id] || {impact: v.impact, help: v.help, n: 0, tabs: new Set(), vd: v.vd};
    gop[v.id].n += v.n;
    gop[v.id].tabs.add(t);
    tong += v.n;
  }
}

console.log(`  Đã quét ${tabs.length} mục.\n`);
if (tong === 0) {
  console.log('  ✓ không chỗ nào vi phạm WCAG A hay AA');
  console.log('\n  ĐẠT — bản web không lỗi tiếp cận\n');
} else {
  for (const [id, v] of Object.entries(gop).sort((a, b) => b[1].n - a[1].n)) {
    console.log(`  ✗ ${v.impact} · ${id} · ${v.n} chỗ · ${v.tabs.size} mục`);
    console.log(`      ${v.help}`);
    console.log(`      ví dụ: ${v.vd[0]}`);
  }
  console.log(`\n  HỎNG — ${tong} chỗ vi phạm\n`);
}
await b.close();
dongXemTruoc(), process.exit(tong === 0 ? 0 : 1);
