/* ═══════════════════════════════════════════════════════════════
   GITA 365 · BẢN MÁY TÍNH — TIẾN TRÌNH CHÍNH
   Chạy hoàn toàn ngoại tuyến. Toàn bộ kho tri thức nằm trong ứng dụng.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const { app, BrowserWindow, Menu, dialog, shell, protocol, net, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const url = require('node:url');

const GOC = path.join(__dirname, 'app');
const DEV = !app.isPackaged;
const HO_SO = path.join(app.getPath('userData'), 'cua-so.json');
const GIAY_PHEP = path.join(app.getPath('userData'), 'giay-phep.json');

/* Một origin ổn định cho dữ liệu trong máy — không dùng file:// */
protocol.registerSchemesAsPrivileged([{
  scheme: 'gita',
  privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true }
}]);

/* ─────────── Nhớ vị trí và kích thước cửa sổ ─────────── */
function docHoSo() {
  try { return JSON.parse(fs.readFileSync(HO_SO, 'utf8')); } catch { return null; }
}
function ghiHoSo(win) {
  try {
    if (!win || win.isDestroyed()) return;
    const b = win.getNormalBounds ? win.getNormalBounds() : win.getBounds();
    fs.writeFileSync(HO_SO, JSON.stringify({ ...b, phongTo: win.isMaximized() }));
  } catch { /* không chặn việc đóng ứng dụng vì một tệp ghi hỏng */ }
}

let cuaSo = null;

/* ─────────── Giấy phép cục bộ ───────────
   Bản máy tính chạy ngoại tuyến nên khoá giải mã không lấy được từ máy chủ
   mỗi lần mở. Người vận hành đặt tệp giấy phép do Học viện GITA cấp vào
   thư mục dữ liệu; ứng dụng đọc, kiểm hạn, rồi đưa khoá vào phiên làm việc.
   Giấy phép KHÔNG nằm trong bộ cài — mỗi máy phải được cấp riêng. */
function docGiayPhep() {
  try {
    if (!fs.existsSync(GIAY_PHEP)) return null;
    const gp = JSON.parse(fs.readFileSync(GIAY_PHEP, 'utf8'));
    if (!gp || !gp.khoa || typeof gp.khoa !== 'object') return null;
    if (gp.hetHan && new Date(gp.hetHan).getTime() < Date.now()) {
      dialog.showMessageBox({ type: 'warning', message: 'Giấy phép đã hết hạn',
        detail: 'Ứng dụng sẽ chạy ở chế độ mẫu. Liên hệ Học viện GITA để gia hạn.', buttons: ['Xong'] });
      return null;
    }
    return gp;
  } catch (e) { return null; }
}

function catGiayPhep() {
  const { canceled, filePaths } = dialog.showOpenDialogSync
    ? { canceled: false, filePaths: dialog.showOpenDialogSync(cuaSo, {
        title: 'Chọn tệp giấy phép do Học viện GITA cấp', properties: ['openFile'],
        filters: [{ name: 'Giấy phép GITA 365', extensions: ['json'] }] }) || [] }
    : { canceled: true, filePaths: [] };
  if (canceled || !filePaths[0]) return;
  try {
    const gp = JSON.parse(fs.readFileSync(filePaths[0], 'utf8'));
    if (!gp || !gp.khoa) throw new Error('Tệp không phải giấy phép GITA 365.');
    fs.copyFileSync(filePaths[0], GIAY_PHEP);
    dialog.showMessageBox(cuaSo, { type: 'info', message: 'Đã kích hoạt giấy phép',
      detail: 'Ứng dụng sẽ mở lại để nạp kho theo phạm vi được cấp.', buttons: ['Mở lại'] });
    if (cuaSo) cuaSo.reload();
  } catch (e) {
    dialog.showErrorBox('Giấy phép không hợp lệ', String(e && e.message || e));
  }
}

function moCuaSo() {
  const luu = docHoSo() || {};
  cuaSo = new BrowserWindow({
    width: luu.width || 1440,
    height: luu.height || 900,
    x: luu.x, y: luu.y,
    minWidth: 380,
    minHeight: 560,
    show: false,
    backgroundColor: '#070510',
    title: 'GITA 365 — Hệ Sinh Thái Gia Đình Thịnh Vượng',
    icon: path.join(__dirname, 'build', 'icon.png'),
    autoHideMenuBar: false,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: true,
      devTools: DEV
    }
  });

  if (luu.phongTo) cuaSo.maximize();
  /* Đưa khoá của giấy phép vào phiên — chỉ trong bộ nhớ, không ghi ra đĩa */
  cuaSo.webContents.on('did-start-loading', () => {
    const gp = docGiayPhep();
    cuaSo.webContents.executeJavaScript(
      gp ? 'window.GITA_KHOA = ' + JSON.stringify(gp.khoa) + ';'
         : 'window.GITA_KHOA = null;', true).catch(() => {});
  });
  cuaSo.loadURL('gita://app/index.html');

  cuaSo.once('ready-to-show', () => cuaSo.show());
  ['resize', 'move', 'close'].forEach(e => cuaSo.on(e, () => ghiHoSo(cuaSo)));
  cuaSo.on('closed', () => { cuaSo = null; });

  /* Liên kết ra ngoài mở bằng trình duyệt hệ thống, không mở trong ứng dụng */
  cuaSo.webContents.setWindowOpenHandler(({ url: u }) => {
    if (/^https?:/.test(u)) shell.openExternal(u);
    return { action: 'deny' };
  });
  cuaSo.webContents.on('will-navigate', (e, u) => {
    if (!u.startsWith('gita://')) { e.preventDefault(); if (/^https?:/.test(u)) shell.openExternal(u); }
  });

  /* Chỉ cho phép micro — trợ lý nghe giọng nói. Mọi quyền khác đều từ chối. */
  cuaSo.webContents.session.setPermissionRequestHandler((wc, quyen, cho) => cho(quyen === 'media'));
  cuaSo.webContents.session.setPermissionCheckHandler((wc, quyen) => quyen === 'media');
}

/* ─────────── Phục vụ tệp trong ứng dụng qua gita:// ─────────── */
function dungGiaoThuc() {
  protocol.handle('gita', (req) => {
    const u = new URL(req.url);
    let p = decodeURIComponent(u.pathname);
    if (!p || p === '/') p = '/index.html';
    const that = path.normalize(path.join(GOC, p));
    if (!that.startsWith(GOC)) return new Response('Không được phép', { status: 403 });
    return net.fetch(url.pathToFileURL(that).toString());
  });
}

/* ─────────── Lệnh gửi vào giao diện ─────────── */
function di(man) {
  if (cuaSo) cuaSo.webContents.executeJavaScript(
    `window.G && G.S && G.S.acc ? G.go(${JSON.stringify(man)}) : null`).catch(() => {});
}

async function xuatPDF() {
  if (!cuaSo) return;
  const { canceled, filePath } = await dialog.showSaveDialog(cuaSo, {
    title: 'Xuất màn hình này ra PDF',
    defaultPath: path.join(app.getPath('documents'), 'GITA365-' + Date.now() + '.pdf'),
    filters: [{ name: 'PDF', extensions: ['pdf'] }]
  });
  if (canceled || !filePath) return;
  try {
    const pdf = await cuaSo.webContents.printToPDF({
      printBackground: true, pageSize: 'A4', margins: { marginType: 'default' }
    });
    fs.writeFileSync(filePath, pdf);
    dialog.showMessageBox(cuaSo, { type: 'info', message: 'Đã xuất PDF', detail: filePath, buttons: ['Xong'] });
  } catch (e) {
    dialog.showErrorBox('Chưa xuất được PDF', String(e && e.message || e));
  }
}

async function saoLuu() {
  if (!cuaSo) return;
  const du = await cuaSo.webContents.executeJavaScript(
    `JSON.stringify({v:'7.0', luc:new Date().toISOString(),
      trangThai: localStorage.getItem('gita365.v7'), ngonNgu: localStorage.getItem('gita365.lang')})`);
  const { canceled, filePath } = await dialog.showSaveDialog(cuaSo, {
    title: 'Sao lưu dữ liệu nhà mình',
    defaultPath: path.join(app.getPath('documents'), 'GITA365-saoluu-' + new Date().toISOString().slice(0, 10) + '.json'),
    filters: [{ name: 'Tệp sao lưu GITA 365', extensions: ['json'] }]
  });
  if (canceled || !filePath) return;
  fs.writeFileSync(filePath, du, 'utf8');
  dialog.showMessageBox(cuaSo, {
    type: 'info', message: 'Đã sao lưu',
    detail: 'Dữ liệu của nhà mình nằm trong tệp này. Mang đi máy khác được.\n\n' + filePath,
    buttons: ['Xong']
  });
}

async function phucHoi() {
  if (!cuaSo) return;
  const { canceled, filePaths } = await dialog.showOpenDialog(cuaSo, {
    title: 'Phục hồi từ tệp sao lưu', properties: ['openFile'],
    filters: [{ name: 'Tệp sao lưu GITA 365', extensions: ['json'] }]
  });
  if (canceled || !filePaths[0]) return;
  const tra = await dialog.showMessageBox(cuaSo, {
    type: 'warning', buttons: ['Huỷ', 'Phục hồi'], defaultId: 0, cancelId: 0,
    message: 'Phục hồi sẽ ghi đè dữ liệu đang có trên máy này',
    detail: 'Dữ liệu hiện tại của nhà mình sẽ được thay bằng nội dung trong tệp sao lưu. Nên sao lưu bản hiện tại trước.'
  });
  if (tra.response !== 1) return;
  try {
    const d = JSON.parse(fs.readFileSync(filePaths[0], 'utf8'));
    await cuaSo.webContents.executeJavaScript(
      `(function(){ try{
         ${d.trangThai ? `localStorage.setItem('gita365.v7', ${JSON.stringify(d.trangThai)});` : ''}
         ${d.ngonNgu ? `localStorage.setItem('gita365.lang', ${JSON.stringify(d.ngonNgu)});` : ''}
         location.reload(); }catch(e){} })()`);
  } catch (e) {
    dialog.showErrorBox('Tệp sao lưu không đọc được', String(e && e.message || e));
  }
}

function veUngDung() {
  dialog.showMessageBox(cuaSo, {
    type: 'info',
    title: 'Về GITA 365',
    message: 'GITA 365 · phiên bản ' + app.getVersion(),
    detail:
      'Hệ Sinh Thái Gia Đình Thịnh Vượng\n' +
      'Một gia đình vận hành được — không cần ai canh.\n\n' +
      '56 màn hình · 5 nhóm chính · 15 vai · Việt / Anh\n' +
      '1.000 kịch bản · 220 phác đồ · 42 mô thức gốc\n\n' +
      'Bản máy tính chạy hoàn toàn ngoại tuyến. Dữ liệu của nhà mình\n' +
      'nằm trong máy này, không gửi đi đâu cả.\n\n' +
      'Giấy phép: ' + (docGiayPhep() ? 'đã kích hoạt' : 'chưa kích hoạt — đang ở chế độ mẫu') + '\n\n' +
      'Electron ' + process.versions.electron + ' · Chromium ' + process.versions.chrome + '\n' +
      'Hotline 08.5555.4688 · truongnhatquang.com',
    buttons: ['Xong']
  });
}

/* ─────────── Trình đơn tiếng Việt ─────────── */
function dungTrinhDon() {
  const mac = process.platform === 'darwin';
  const nhom = [
    { l: 'Bắt đầu ở đây', v: 'bat-dau', p: 'CmdOrCtrl+1' },
    { l: 'Bản đồ gia đình thịnh vượng', v: 'ban-do', p: 'CmdOrCtrl+2' },
    { l: 'Nhiệm vụ hôm nay', v: 'nhiem-vu', p: 'CmdOrCtrl+3' },
    { l: 'Kho báu vật', v: 'kho', p: 'CmdOrCtrl+4' },
    { l: 'Chín vai giữ trong nhà', v: 'chin-vai', p: 'CmdOrCtrl+5' },
    { l: 'Ngôn từ dẫn dắt', v: 'ngon-tu', p: 'CmdOrCtrl+6' },
    { type: 'separator' },
    { l: 'Trợ lý GITA', v: 'tro-ly' },
    { l: 'Người đồng hành', v: 'dong-hanh' },
    { type: 'separator' },
    { l: 'Trung tâm điều hành', v: 'dieu-hanh' },
    { l: 'Rà soát hệ thống', v: 'ra-soat' },
    { type: 'separator' },
    { l: 'Tài khoản của tôi', v: 'toi' }
  ].map(m => m.type ? m : { label: m.l, accelerator: m.p, click: () => di(m.v) });

  const mau = [
    ...(mac ? [{ role: 'appMenu' }] : []),
    {
      label: 'Tệp',
      submenu: [
        { label: 'Kích hoạt giấy phép…', click: catGiayPhep },
        { type: 'separator' },
        { label: 'Sao lưu dữ liệu nhà mình…', accelerator: 'CmdOrCtrl+S', click: saoLuu },
        { label: 'Phục hồi từ tệp sao lưu…', click: phucHoi },
        { type: 'separator' },
        { label: 'Xuất màn hình này ra PDF…', accelerator: 'CmdOrCtrl+E', click: xuatPDF },
        { label: 'In…', accelerator: 'CmdOrCtrl+P', click: () => cuaSo && cuaSo.webContents.print() },
        { type: 'separator' },
        mac ? { role: 'close', label: 'Đóng cửa sổ' } : { role: 'quit', label: 'Thoát' }
      ]
    },
    {
      label: 'Sửa',
      submenu: [
        { role: 'undo', label: 'Hoàn tác' }, { role: 'redo', label: 'Làm lại' },
        { type: 'separator' },
        { role: 'cut', label: 'Cắt' }, { role: 'copy', label: 'Sao chép' },
        { role: 'paste', label: 'Dán' }, { role: 'selectAll', label: 'Chọn tất cả' }
      ]
    },
    { label: 'Đi tới', submenu: nhom },
    {
      label: 'Xem',
      submenu: [
        { role: 'reload', label: 'Tải lại' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Cỡ chữ gốc' },
        { role: 'zoomIn', label: 'Phóng to' },
        { role: 'zoomOut', label: 'Thu nhỏ' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Toàn màn hình' },
        ...(DEV ? [{ role: 'toggleDevTools', label: 'Công cụ nhà phát triển' }] : [])
      ]
    },
    {
      label: 'Trợ giúp',
      submenu: [
        { label: 'Tài khoản trải nghiệm 15 vai', click: () => {
            if (cuaSo) cuaSo.webContents.executeJavaScript('window.G && G.accountsModal && G.accountsModal()').catch(() => {});
          } },
        { label: 'Hướng dẫn sử dụng', click: () => di('bat-dau') },
        { type: 'separator' },
        { label: 'Trang chủ Học viện GITA', click: () => shell.openExternal('https://truongnhatquang.com') },
        { label: 'Về GITA 365', click: veUngDung }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(mau));
}

/* ─────────── Chỉ cho chạy một bản ─────────── */
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (cuaSo) { if (cuaSo.isMinimized()) cuaSo.restore(); cuaSo.focus(); }
  });

  app.whenReady().then(() => {
    dungGiaoThuc();
    dungTrinhDon();
    moCuaSo();
    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) moCuaSo(); });
  });

  app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
}

ipcMain.handle('gita:phien-ban', () => ({
  ungDung: app.getVersion(), electron: process.versions.electron, chromium: process.versions.chrome,
  nenTang: process.platform, duLieu: app.getPath('userData')
}));
