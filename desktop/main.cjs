/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Tiến trình chính của bản máy tính ENGWIN365.
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

const APP_ORIGIN = 'app://engwin';

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

/*
 * Thời gian chờ giữa các lần thử mã khoá nằm trong két, không nằm ở đây.
 *
 * Bản trước đếm số lần sai bằng một biến của tiến trình này, nên tắt ứng
 * dụng rồi mở lại là xoá sạch thời gian chờ. Nay số lần sai được ghi vào
 * vault.json, và két tự tính thời gian phải chờ.
 */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 940,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: '#020617',
    title: 'ENGWIN365',
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
          /*
           * script-src KHÔNG có 'unsafe-inline'.
           *
           * Bản dựng Vite chỉ sinh đúng một thẻ script có src, không có thẻ
           * script nội tuyến nào — có bài kiểm đếm lại điều đó ở
           * tools/kiem-bao-mat.mjs. Khi không cần thì để 'unsafe-inline'
           * trong script-src là tự bỏ đi lớp chặn XSS mạnh nhất mà CSP có.
           * style-src vẫn cần vì trang có khối <style> nội tuyến và vì
           * thuộc tính style của React.
           */
          "default-src 'self'; " +
            "script-src 'self'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data:; " +
            "media-src 'self'; " +
            "font-src 'self' data:; " +
            "connect-src 'self'; " +
            "worker-src 'self'; " +
            "frame-src 'none'; " +
            "form-action 'none'; " +
            "object-src 'none'; " +
            "frame-ancestors 'none'; " +
            "base-uri 'none'",
        ],
      },
    });
  });

  /*
   * QUYỀN HỆ THỐNG: CHỈ MICRO, VÀ PHẢI CHẶN Ở CẢ HAI CỬA
   *
   * Trong Electron, quyền 'media' gộp CẢ micro LẪN camera. Trả về true cho
   * 'media' mà không xét mediaTypes là mở luôn webcam — đúng thứ mà khối
   * PHẢN XẠ không cần đến bao giờ. Ở đây chỉ chấp thuận khi yêu cầu có
   * audio và KHÔNG có video.
   *
   * Và phải đặt cả hai cửa: setPermissionRequestHandler cho lời hỏi có hộp
   * thoại, setPermissionCheckHandler cho lời hỏi đồng bộ mà trang gọi thẳng
   * (navigator.permissions.query, getUserMedia trong vài đường). Chỉ đặt
   * một cửa là còn cửa kia mở.
   */
  const chiMicro = (permission, details) => {
    if (permission !== 'media') return false;
    const loai = details?.mediaTypes;
    // Không khai loại thì không đoán hộ — từ chối.
    if (!Array.isArray(loai) || loai.length === 0) return false;
    return loai.includes('audio') && !loai.includes('video');
  };

  session.defaultSession.setPermissionRequestHandler((_wc, permission, cb, details) => {
    cb(chiMicro(permission, details));
  });

  session.defaultSession.setPermissionCheckHandler((_wc, permission, _origin, details) =>
    chiMicro(permission, details),
  );

  // Không thiết bị ngoài nào: HID, cổng nối tiếp, USB. Ứng dụng không dùng.
  session.defaultSession.setDevicePermissionHandler(() => false);
  session.defaultSession.setUSBProtectedClassesHandler(() => []);

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

/*
 * Chặn ở tầng ứng dụng, không chỉ ở cửa sổ đã tạo.
 *
 * createWindow() gắn setWindowOpenHandler và will-navigate cho ĐÚNG cửa sổ
 * nó tạo ra. Bất kỳ webContents nào sinh ra bằng đường khác — cửa sổ thứ
 * hai thêm về sau, một webview lọt lưới — sẽ không có hai lớp chặn đó.
 * Móc này áp cùng luật cho mọi webContents, kể cả cái chưa tồn tại lúc
 * viết dòng này.
 */
app.on('web-contents-created', (_e, wc) => {
  wc.setWindowOpenHandler(({url}) => {
    if (/^https:\/\//.test(url)) shell.openExternal(url);
    return {action: 'deny'};
  });
  wc.on('will-navigate', (e, url) => {
    if (!url.startsWith(APP_ORIGIN)) {
      e.preventDefault();
      if (/^https:\/\//.test(url)) shell.openExternal(url);
    }
  });
  // Gắn webview là con đường chạy mã ngoài tầm CSP của trang. Không dùng.
  wc.on('will-attach-webview', (e) => e.preventDefault());
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
  await wait(vault.choMs);
  const r = vault.unlock(passcode);
  return r.ok ? r : {...r, waitMs: vault.choMs};
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
