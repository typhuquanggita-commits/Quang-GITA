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
  powerMonitor,
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
/* ==========================================================================
   CHỈ CHO PHÉP MỘT PHIÊN BẢN CHẠY

   Đây là một lỗ mất dữ liệu thật, không phải chuyện tiện dụng.

   Mở ứng dụng hai lần là có HAI tiến trình, mỗi tiến trình một đối tượng
   Vault, cùng trỏ vào một tệp profile.enc. Cả hai cùng mở khoá được, cả hai
   cùng ghi được. Tiến trình ghi sau đè lên tiến trình ghi trước, và phần
   việc của cửa sổ kia biến mất mà không có thông báo nào.

   Chuyện này xảy ra thật: ứng dụng Electron mất vài giây mới hiện cửa sổ,
   nên người dùng hay bấm đúp thêm lần nữa vì tưởng chưa ăn. Bản chạy thẳng
   từ USB còn dễ hơn nữa.

   Ghi nguyên tử ở vault.cjs chống được mất điện giữa lúc ghi, nhưng KHÔNG
   chống được hai tiến trình ghi đè nhau — đó là hai vấn đề khác nhau. Chỗ
   duy nhất chặn được là ở đây, trước khi tiến trình thứ hai kịp mở tệp.
   ========================================================================== */
/* ==========================================================================
   TẮT TIẾN TRÌNH GPU KHI MÁY NÀY KHÔNG THẬT SỰ DÙNG GPU

   Đo trên máy không có GPU: tiến trình GPU chiếm 140 MB trong tổng 473 MB,
   và nó không dựng gì cả — Chromium đã rơi về dựng bằng phần mềm. Tắt nó đi
   còn 396 MB, giảm 16%, trang vẫn dựng đúng. Với máy học viên 4 GB RAM thì
   77 MB là con số đáng kể.

   VÌ SAO KHÔNG TẮT THẲNG CHO MỌI MÁY
   Trên máy CÓ GPU dùng được, tắt GPU là ép mọi thứ dựng bằng phần mềm —
   cuộn trang giật và tốn CPU hơn. Đúng những máy yếu mà việc này định giúp
   lại là những máy chịu thiệt nặng nhất. Con số 77 MB ở trên đo trong môi
   trường không có GPU; lấy nó làm căn cứ để tắt trên mọi máy là suy rộng
   một phép đo sang một hoàn cảnh nó không nói gì.

   NÊN QUYẾT ĐỊNH THEO CHÍNH MÁY ĐÓ, KHÔNG THEO PHỎNG ĐOÁN
   app.getGPUFeatureStatus() cho biết máy này thật sự đang dựng bằng GPU hay
   đã rơi về phần mềm. Nhưng nó chỉ đọc được SAU khi app sẵn sàng, còn cờ
   tắt GPU phải đặt TRƯỚC. Nên lần chạy đầu chỉ đo và ghi lại; từ lần sau
   mới áp dụng. Máy đổi card hay cập nhật trình điều khiển thì lần chạy kế
   tiếp đo lại và tự bỏ cờ.

   Ghi vào một tệp nhỏ riêng, KHÔNG đụng vào két. Tệp này hỏng hay mất thì
   chỉ mất phần tối ưu, không mất dữ liệu nào.
   ========================================================================== */
const TEP_MAY = path.join(app.getPath('userData'), 'may.json');

function docHoSoMay() {
  try {
    return JSON.parse(require('node:fs').readFileSync(TEP_MAY, 'utf8'));
  } catch {
    return {};
  }
}

function ghiHoSoMay(o) {
  try {
    require('node:fs').writeFileSync(TEP_MAY, JSON.stringify(o, null, 2));
  } catch {
    // Không ghi được thì lần sau đo lại. Không đáng làm sập ứng dụng.
  }
}

/*
 * Chromium báo "disabled_software" khi nó đã bỏ GPU và tự dựng bằng phần
 * mềm. Chỉ khi CẢ HAI mục quan trọng nhất đều như vậy thì tiến trình GPU
 * mới thật sự là gánh nặng thuần tuý.
 */
function gpuVoDung(tt) {
  const mem = (x) => typeof x === 'string' && x.startsWith('disabled_software');
  return mem(tt.gpu_compositing) && mem(tt.rasterization);
}

if (docHoSoMay().gpuVoDung === true) {
  app.commandLine.appendSwitch('disable-gpu');
}

const giuKhoaPhien = app.requestSingleInstanceLock();
if (!giuKhoaPhien) {
  // Không gọi vault, không mở cửa sổ, không chạm vào tệp nào. Thoát ngay.
  app.quit();
  process.exit(0);
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

/*
 * Người dùng bấm mở lần thứ hai thì không im lặng bỏ qua — đưa cửa sổ đang
 * có lên trước mặt. Im lặng thì họ tưởng ứng dụng hỏng và bấm tiếp.
 */
/* ==========================================================================
   TỰ KHOÁ KÉT KHI NGƯỜI DÙNG RỜI MÁY

   Ở trung tâm, một máy thường có nhiều học viên dùng chung trong ngày. Két
   mở ra rồi cứ thế mở cho tới khi đóng cửa sổ, nên em ngồi sau đọc được hồ
   sơ, điểm và nhận xét của em ngồi trước — mà không cần biết mã khoá nào.

   Ba tín hiệu, và cả ba đều phải bắt vì chúng xảy ra ở ba tình huống khác
   nhau:
     · máy khoá màn hình   — người dùng chủ động rời đi
     · máy ngủ             — gập nắp máy tính xách tay
     · không đụng gì lâu   — quên khoá màn hình rồi bỏ đi
   Bắt hai cái đầu mà bỏ cái thứ ba là bỏ đúng tình huống hay xảy ra nhất.

   MƯỜI PHÚT, VÀ VÌ SAO KHÔNG NGẮN HƠN
   Một buổi luyện có những đoạn dài không đụng chuột: nghe một đoạn ba phút,
   đọc một bài dài, viết ra giấy nháp trước khi gõ. Khoá sau năm phút thì
   ứng dụng đòi mã khoá giữa buổi học, và người dùng sẽ tìm cách tắt tính
   năng này đi — lúc đó nó bảo vệ được không gì cả. Mười phút đủ dài để
   không cắt ngang việc học, đủ ngắn để người kế tiếp không đọc được.

   Dùng đồng hồ nhàn rỗi của HỆ ĐIỀU HÀNH chứ không tự đếm trong ứng dụng:
   người dùng có thể đang gõ ở cửa sổ khác, và như thế họ vẫn đang ngồi đó.
   ========================================================================== */
const CHO_KHOA_GIAY = 10 * 60;
const NHIP_SOAT_MS = 30_000;
let hen = null;

function tuKhoa(viSao) {
  if (!vault.isUnlocked) return;
  vault.lock();
  // Báo cho trang biết để nó hiện lại màn hình mã khoá ngay, không đợi tới
  // lần gọi IPC kế tiếp mới phát hiện ra két đã đóng.
  for (const w of BrowserWindow.getAllWindows()) {
    if (!w.isDestroyed()) w.webContents.send('vault:da-tu-khoa', viSao);
  }
}

function batDauSoatNhanRoi() {
  if (hen) return;
  hen = setInterval(() => {
    if (!vault.isUnlocked) return;
    try {
      if (powerMonitor.getSystemIdleTime() >= CHO_KHOA_GIAY) tuKhoa('nhàn rỗi');
    } catch {
      // Vài nền không có đồng hồ nhàn rỗi. Mất tín hiệu này thì hai tín hiệu
      // kia vẫn chạy; không để cả cơ chế sập vì một lời gọi ném lỗi.
    }
  }, NHIP_SOAT_MS);
  // Đồng hồ này không được giữ tiến trình sống khi mọi cửa sổ đã đóng.
  if (typeof hen.unref === 'function') hen.unref();
}

app.on('second-instance', () => {
  const win = BrowserWindow.getAllWindows()[0];
  if (!win) return;
  if (win.isMinimized()) win.restore();
  win.show();
  win.focus();
});

app.whenReady().then(() => {
  protocol.handle('app', serveDist);

  /*
   * Đo lại tình trạng GPU của chính máy này, mỗi lần chạy. Ghi lại chỉ khi
   * kết quả đổi, để không ghi đĩa thừa mỗi lần mở ứng dụng.
   */
  try {
    const cu = docHoSoMay();
    const moi = gpuVoDung(app.getGPUFeatureStatus());
    if (cu.gpuVoDung !== moi) ghiHoSoMay({...cu, gpuVoDung: moi, doLuc: new Date().toISOString()});
  } catch {
    // Không đọc được trạng thái GPU thì giữ nguyên hành vi mặc định.
  }

  // Khoá màn hình và máy ngủ: khoá két ngay, không đợi hết mười phút.
  powerMonitor.on('lock-screen', () => tuKhoa('khoá màn hình'));
  powerMonitor.on('suspend', () => tuKhoa('máy ngủ'));
  batDauSoatNhanRoi();

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
