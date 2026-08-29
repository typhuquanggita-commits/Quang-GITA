/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Tiến trình chính của bản máy tính ENGWILL365.
 *
 * Nguyên tắc bảo mật áp dụng ở đây:
 *   - contextIsolation bật: mã của trang không chạm được vào Node.
 *   - nodeIntegration tắt: trang không có require, không có process.
 *   - sandbox bật: tiến trình hiển thị chạy trong hộp cát của Chromium.
 *   - CSP chặt: không cho phép nạp mã từ bên ngoài.
 *   - Mọi điều hướng ra ngoài đều bị chặn và mở bằng trình duyệt hệ thống.
 * Trang chỉ nói chuyện với két dữ liệu qua đúng chín kênh IPC khai báo dưới đây.
 */

const {
  app,
  BrowserWindow,
  ipcMain,
  shell,
  session,
  protocol,
  net,
} = require('electron');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
const {Vault, validate} = require('./vault.cjs');

const IS_DEV = !app.isPackaged;
const DIST = path.join(__dirname, '..', 'dist');

/*
 * Vì sao phải có giao thức app:// thay vì mở thẳng tệp bằng file://
 *
 * Bản dựng là ES module. Chromium từ chối nạp ES module qua file:// vì gốc của
 * trang lúc đó là "null", vi phạm chính sách cùng nguồn — cửa sổ sẽ trắng
 * trơn. Đăng ký một giao thức riêng cho ứng dụng vừa giải quyết việc đó, vừa
 * cho trang một gốc thật để câu lệnh 'self' trong CSP có nghĩa.
 */
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {standard: true, secure: true, supportFetchAPI: true, stream: true},
  },
]);

const APP_ORIGIN = 'app://engwill';

function serveDist(request) {
  const {pathname} = new URL(request.url);
  const rel = pathname === '/' ? 'index.html' : decodeURIComponent(pathname);
  const file = path.join(DIST, rel);
  // Chặn thoát thư mục: mọi đường dẫn phải nằm trong dist/.
  if (file !== DIST && !file.startsWith(DIST + path.sep)) {
    return new Response('Forbidden', {status: 403});
  }
  return net.fetch(pathToFileURL(file).toString());
}
const vault = new Vault(path.join(app.getPath('userData'), 'vault'));

/* Đếm số lần nhập sai để làm chậm dần — chống dò mã bằng cách thử liên tục. */
let wrongTries = 0;
const delayFor = (n) => (n < 3 ? 0 : Math.min(30_000, 2 ** (n - 2) * 1000));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 940,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: '#020617',
    title: 'ENGWILL365',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webviewTag: false,
      spellcheck: false,
    },
  });

  win.once('ready-to-show', () => win.show());
  win.loadURL(`${APP_ORIGIN}/`);

  // Không cho trang tự mở cửa sổ mới; liên kết ngoài giao cho trình duyệt.
  win.webContents.setWindowOpenHandler(({url}) => {
    if (/^https:\/\//.test(url)) shell.openExternal(url);
    return {action: 'deny'};
  });

  // Chặn mọi điều hướng rời khỏi chính ứng dụng.
  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith(APP_ORIGIN)) {
      e.preventDefault();
      if (/^https:\/\//.test(url)) shell.openExternal(url);
    }
  });

  // Khoá két khi cửa sổ đóng — không để khoá nằm lại trong bộ nhớ.
  win.on('closed', () => vault.lock());

  if (IS_DEV) win.webContents.openDevTools({mode: 'detach'});
  return win;
}

app.whenReady().then(() => {
  protocol.handle('app', serveDist);

  // Chính sách nội dung: chỉ chạy mã của chính ứng dụng.
  session.defaultSession.webRequest.onHeadersReceived((details, cb) => {
    cb({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data:; " +
            "media-src 'self'; " +
            "font-src 'self' data:; " +
            "connect-src 'self'; " +
            "object-src 'none'; " +
            "frame-ancestors 'none'; " +
            "base-uri 'none'",
        ],
      },
    });
  });

  // Từ chối mọi yêu cầu quyền hệ thống trừ micro — micro cần cho khối PHẢN XẠ.
  session.defaultSession.setPermissionRequestHandler((_wc, permission, cb) => {
    cb(permission === 'media');
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  vault.lock();
  if (process.platform !== 'darwin') app.quit();
});

/* --------------------------- CHÍN KÊNH IPC ------------------------------ */

ipcMain.handle('vault:status', () => ({
  initialised: vault.isInitialised,
  unlocked: vault.isUnlocked,
}));

ipcMain.handle('vault:validate', (_e, passcode) => ({
  error: validate(passcode),
}));

ipcMain.handle('vault:create', (_e, passcode) => vault.create(passcode));

ipcMain.handle('vault:unlock', async (_e, passcode) => {
  await wait(delayFor(wrongTries));
  const r = vault.unlock(passcode);
  wrongTries = r.ok ? 0 : wrongTries + 1;
  return r.ok ? r : {...r, waitMs: delayFor(wrongTries)};
});

ipcMain.handle('vault:lock', () => {
  vault.lock();
  return {ok: true};
});

ipcMain.handle('vault:read', () => vault.read());

ipcMain.handle('vault:write', (_e, data) => vault.write(data));

ipcMain.handle('vault:change', (_e, oldPass, newPass) =>
  vault.change(oldPass, newPass),
);

ipcMain.handle('vault:destroy', () => vault.destroy());
