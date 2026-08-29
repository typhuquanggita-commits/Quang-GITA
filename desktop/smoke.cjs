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
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'engwill-smoke-'));
app.setPath('userData', tmp);

let failed = 0;
const ok = (n, c, x = '') => {
  if (c) console.log(`  ✓ ${n}`);
  else { failed++; console.log(`  ✗ ${n}${x ? ` — ${x}` : ''}`); }
};

require('./main.cjs');

app.whenReady().then(async () => {
  await new Promise((r) => setTimeout(r, 1500));
  const win = BrowserWindow.getAllWindows()[0];
  ok('cửa sổ được tạo', !!win);
  if (!win) return finish();

  await new Promise((r) => setTimeout(r, 2500));
  const wc = win.webContents;

  const url = wc.getURL();
  ok('nạp qua giao thức app://', url.startsWith('app://engwill'), url);

  const rootLen = await wc.executeJavaScript(
    "document.getElementById('root').innerHTML.length",
  );
  ok('React đã dựng được giao diện', rootLen > 500, `chỉ có ${rootLen} ký tự`);

  const hasBridge = await wc.executeJavaScript('!!window.engwill');
  ok('cầu nối engwill có mặt', hasBridge);

  const noNode = await wc.executeJavaScript(
    "typeof require === 'undefined' && typeof process === 'undefined'",
  );
  ok('trang KHÔNG chạm được vào Node', noNode);

  const noIpc = await wc.executeJavaScript(
    "typeof window.engwill?.vault?.invoke === 'undefined' && !('ipcRenderer' in window)",
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
    (await run('window.engwill.vault.status()')).initialised === false,
  );
  ok(
    'từ chối mã yếu qua IPC',
    (await run("window.engwill.vault.create('123')")).ok === false,
  );
  ok(
    'tạo được két qua IPC',
    (await run("window.engwill.vault.create('Engwill365!')")).ok === true,
  );
  ok(
    'ghi được hồ sơ qua IPC',
    (await run("window.engwill.vault.write({ngay: 21, ghiChu: 'bài ra vòng'})")).ok === true,
  );
  const read = await run('window.engwill.vault.read()');
  ok('đọc lại đúng hồ sơ', read.ok && read.data.ngay === 21);
  await run('window.engwill.vault.lock()');
  ok(
    'khoá rồi thì không đọc được',
    (await run('window.engwill.vault.read()')).ok === false,
  );
  ok(
    'sai mã thì không mở được',
    (await run("window.engwill.vault.unlock('SaiMa1234')")).ok === false,
  );
  ok(
    'đúng mã thì mở được',
    (await run("window.engwill.vault.unlock('Engwill365!')")).ok === true,
  );

  // Tệp trên đĩa phải là bản mã, không phải bản rõ.
  const enc = fs.readFileSync(path.join(tmp, 'vault', 'profile.enc'), 'utf8');
  ok('tệp trên đĩa đã mã hoá', !enc.includes('bài ra vòng'));

  // Giao thức app:// không được cho đọc ra ngoài thư mục dist.
  // Dạng %2e%2e là dạng nguy hiểm thật: giao thức chuẩn không tự rút gọn nó,
  // nên nó đi thẳng tới bộ xử lý và chỉ bị chặn nhờ kiểm tra đường dẫn ở đó.
  for (const attack of [
    'app://engwill/../package.json',
    'app://engwill/%2e%2e/package.json',
    'app://engwill/%2e%2e%2f%2e%2e%2fetc%2fpasswd',
  ]) {
    const r = await run(
      `fetch(${JSON.stringify(attack)}).then(async r => r.ok ? await r.text() : 'chặn:' + r.status).catch(() => 'chặn:lỗi')`,
    );
    ok(`chặn được ${attack}`, String(r).startsWith('chặn'), String(r).slice(0, 80));
  }

  finish();
});

function finish() {
  console.log(`\n  ${failed === 0 ? 'ĐẠT' : `HỎNG — ${failed} lỗi`}\n`);
  fs.rmSync(tmp, {recursive: true, force: true});
  app.exit(failed === 0 ? 0 : 1);
}
