/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm tra khói cho bản máy tính: mở đúng cửa sổ thật, xem trang có dựng
 * được không, két có chạy qua IPC không, rồi thoát. Chạy:
 *   xvfb-run -a npx electron desktop/smoke.cjs
 */
const {app, BrowserWindow} = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');

// Dùng thư mục dữ liệu tạm để không đụng vào két thật của người dùng.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'engwin-smoke-'));
app.setPath('userData', tmp);

let failed = 0;
const ok = (n, c, x = '') => {
  if (c) console.log(`  ✓ ${n}`);
  else { failed++; console.log(`  ✗ ${n}${x ? ` — ${x}` : ''}`); }
};

require('./main.cjs');

// Chốt chặn: dù có chuyện gì thì tiến trình cũng phải thoát. Một lời gọi
// executeJavaScript ném lỗi mà không ai bắt sẽ làm bài kiểm tra treo vô hạn.
const HET_GIO = setTimeout(() => {
  console.log('\n  HỎNG — quá 90 giây, bài kiểm tra bị treo\n');
  app.exit(1);
}, 90_000);

app.whenReady().then(async () => {
  try {
    await chay();
  } catch (e) {
    failed++;
    console.log(`  ✗ ngoại lệ ngoài dự tính: ${e && e.message}`);
  }
  finish();
});

async function chay() {
  await new Promise((r) => setTimeout(r, 1500));
  const win = BrowserWindow.getAllWindows()[0];
  ok('cửa sổ được tạo', !!win);
  if (!win) return;

  await new Promise((r) => setTimeout(r, 2500));
  const wc = win.webContents;

  const url = wc.getURL();
  ok('nạp qua giao thức app://', url.startsWith('app://engwin'), url);

  const rootLen = await wc.executeJavaScript(
    "document.getElementById('root').innerHTML.length",
  );
  ok('React đã dựng được giao diện', rootLen > 500, `chỉ có ${rootLen} ký tự`);

  const hasBridge = await wc.executeJavaScript('!!window.engwin');
  ok('cầu nối engwin có mặt', hasBridge);

  const noNode = await wc.executeJavaScript(
    "typeof require === 'undefined' && typeof process === 'undefined'",
  );
  ok('trang KHÔNG chạm được vào Node', noNode);

  const noIpc = await wc.executeJavaScript(
    "typeof window.engwin?.vault?.invoke === 'undefined' && !('ipcRenderer' in window)",
  );
  ok('trang KHÔNG có ipcRenderer thô', noIpc);

  // Màn hình mã khoá phải hiện vì két chưa khởi tạo.
  const heading = await wc.executeJavaScript(
    "document.querySelector('h2')?.textContent ?? ''",
  );
  ok('hiện màn hình đặt mã khoá', heading.includes('Đặt mã khoá'), heading);

  // Toàn bộ vòng đời két qua đúng đường IPC mà trang vẫn dùng.
  const run = (js) => wc.executeJavaScript(js);
  ok(
    'két báo chưa khởi tạo',
    (await run('window.engwin.vault.status()')).initialised === false,
  );
  ok(
    'từ chối mã yếu qua IPC',
    (await run("window.engwin.vault.create('123')")).ok === false,
  );
  ok(
    'tạo được két qua IPC',
    (await run("window.engwin.vault.create('Engwin365!')")).ok === true,
  );
  ok(
    'ghi được hồ sơ qua IPC',
    (await run("window.engwin.vault.write({ngay: 21, ghiChu: 'bài ra vòng'})")).ok === true,
  );
  const read = await run('window.engwin.vault.read()');
  ok('đọc lại đúng hồ sơ', read.ok && read.data.ngay === 21);
  await run('window.engwin.vault.lock()');
  ok(
    'khoá rồi thì không đọc được',
    (await run('window.engwin.vault.read()')).ok === false,
  );
  ok(
    'sai mã thì không mở được',
    (await run("window.engwin.vault.unlock('SaiMa1234')")).ok === false,
  );
  ok(
    'đúng mã thì mở được',
    (await run("window.engwin.vault.unlock('Engwin365!')")).ok === true,
  );

  // Tệp trên đĩa phải là bản mã, không phải bản rõ.
  const enc = fs.readFileSync(path.join(tmp, 'vault', 'profile.enc'), 'utf8');
  ok('tệp trên đĩa đã mã hoá', !enc.includes('bài ra vòng'));

  // Sau khi mở khoá, giao diện chính phải dựng được — và điều đó đòi hỏi các
  // chunk tải động nạp được qua app://. Đây là chỗ dễ hỏng nhất sau khi tách
  // mã theo tab: dynamic import trên giao thức tự đăng ký.
  // Nạp lại trang khi két ĐANG MỞ: phải vào thẳng giao diện, không hỏi mã lại.
  // Nạp lại không phải ranh giới bảo mật — cửa sổ vẫn mở, người dùng vẫn ngồi
  // đó, và khoá vẫn nằm trong tiến trình chính. Két chỉ khoá khi đóng cửa sổ.
  wc.reload();
  await new Promise((r) => wc.once('did-finish-load', r));
  await new Promise((r) => setTimeout(r, 2000));

  const soTab = await run("document.querySelectorAll('aside nav button').length");
  ok('két đang mở thì nạp lại vào thẳng giao diện', soTab >= 23, `thấy ${soTab} thẻ`);

  // Bấm sang một tab khác để buộc nạp một chunk chưa từng tải. Đây là chỗ dễ
  // hỏng nhất sau khi tách mã theo tab: dynamic import trên giao thức tự đăng ký.
  await run(`(() => {
    const b = [...document.querySelectorAll('aside nav button')]
      .find(x => x.textContent.includes('Hồ sơ 365 ngày'));
    if (!b) throw new Error('không thấy thẻ Hồ sơ 365 ngày');
    b.click();
    return true;
  })()`);
  await new Promise((r) => setTimeout(r, 2500));
  const tieuDe = await run("document.querySelector('h2')?.textContent ?? ''");
  ok('chunk tải động nạp được qua app://', tieuDe.includes('365'), tieuDe);
  ok('tab Hồ sơ dựng đủ 90 ngày của quý 1',
     (await run("document.querySelectorAll('h4').length")) === 90);

  // Khoá lại rồi nạp lại: BẮT BUỘC phải hỏi mã khoá. Đây mới là ranh giới thật.
  await run('window.engwin.vault.lock()');
  wc.reload();
  await new Promise((r) => wc.once('did-finish-load', r));
  await new Promise((r) => setTimeout(r, 2000));
  const sauKhoa = await run("document.querySelector('h2')?.textContent ?? ''");
  ok('khoá rồi nạp lại thì phải hỏi mã khoá', sauKhoa.includes('Mở khoá'), sauKhoa);
  ok('khoá rồi thì giao diện chính KHÔNG dựng',
     (await run("document.querySelectorAll('aside nav button').length")) === 0);
  await run("window.engwin.vault.unlock('Engwin365!')");

  // Giao thức app:// không được cho đọc ra ngoài thư mục dist.
  // Dạng %2e%2e là dạng nguy hiểm thật: giao thức chuẩn không tự rút gọn nó,
  // nên nó đi thẳng tới bộ xử lý và chỉ bị chặn nhờ kiểm tra đường dẫn ở đó.
  for (const attack of [
    'app://engwin/../package.json',
    'app://engwin/%2e%2e/package.json',
    'app://engwin/%2e%2e%2f%2e%2e%2fetc%2fpasswd',
  ]) {
    const r = await run(
      `fetch(${JSON.stringify(attack)}).then(async r => r.ok ? await r.text() : 'chặn:' + r.status).catch(() => 'chặn:lỗi')`,
    );
    ok(`chặn được ${attack}`, String(r).startsWith('chặn'), String(r).slice(0, 80));
  }
}

function finish() {
  clearTimeout(HET_GIO);
  console.log(`\n  ${failed === 0 ? 'ĐẠT' : `HỎNG — ${failed} lỗi`}\n`);
  fs.rmSync(tmp, {recursive: true, force: true});
  app.exit(failed === 0 ? 0 : 1);
}
