/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm các tính chất bảo mật bằng cách ĐỌC MÃ NGUỒN, không phải bằng lời hứa.
 * Chạy: node tools/kiem-bao-mat.mjs   (cần chạy `npm run build` trước)
 *
 * Vì sao cần bài này: mọi thiết lập bảo mật ở đây đều là một dòng dễ sửa và
 * sửa xong thì không có gì đỏ lên. Bỏ 'unsafe-inline' vào lại script-src,
 * bật lại nodeIntegration, thêm một kênh IPC không ai gọi — cả ba đều là lỗ
 * hổng thật và cả ba đều lọt qua mọi bài kiểm khác của kho này.
 */
import {readFileSync, existsSync} from 'node:fs';

let bad = 0;
const fail = (m, x = '') => { bad++; console.log(`  ✗ ${m}${x ? ` — ${x}` : ''}`); };
const ok = (m) => console.log(`  ✓ ${m}`);
const doc = (p) => readFileSync(p, 'utf8');

console.log('\n  KIỂM BẢO MẬT\n');

const main = doc('desktop/main.cjs');
const preload = doc('desktop/preload.cjs');
const vault = doc('desktop/vault.cjs');
const web = doc('index.html');

/* ------------------------- TIẾN TRÌNH HIỂN THỊ -------------------------- */
const batBuoc = [
  ['contextIsolation: true', 'trang không chạm được vào Node'],
  ['nodeIntegration: false', 'trang không có require, không có process'],
  ['sandbox: true', 'tiến trình hiển thị nằm trong hộp cát Chromium'],
  ['webviewTag: false', 'không cho gắn webview, đường chạy mã ngoài tầm CSP'],
];
for (const [chuoi, viSao] of batBuoc) {
  main.includes(chuoi) ? ok(`${chuoi} — ${viSao}`) : fail(`thiếu ${chuoi}`, viSao);
}

/* Những thứ KHÔNG được xuất hiện. Mỗi cái là một cách tự mở cửa. */
const cam = [
  ['webSecurity: false', 'tắt chính sách cùng nguồn'],
  ['allowRunningInsecureContent', 'cho nạp nội dung không mã hoá'],
  ['nodeIntegrationInWorker', 'đưa Node vào worker'],
  ['nodeIntegrationInSubFrames', 'đưa Node vào khung con'],
  ['experimentalFeatures: true', 'bật tính năng chưa kiểm chứng'],
  ['enableRemoteModule', 'mô-đun remote đã bị gỡ vì không an toàn'],
];
for (const [chuoi, viSao] of cam) {
  main.includes(chuoi) ? fail(`có ${chuoi}`, viSao) : ok(`không có ${chuoi}`);
}

/* ------------------------------- CSP ------------------------------------ */
/*
 * script-src 'unsafe-inline' là chỗ CSP mất hết tác dụng chống XSS. Nó chỉ
 * chấp nhận được khi trang thật sự có script nội tuyến. Bài kiểm không tin
 * lời khai: nó ĐẾM thẻ script nội tuyến trong bản dựng.
 */
const layScriptSrc = (s) => (s.match(/script-src ([^;"]*)/) || [])[1]?.trim();

// Chỉ đọc phần chuỗi CSP thật, không đọc phần chú thích nói VỀ nó.
const cspMain = main.slice(main.indexOf("\"default-src 'self'; \""));
const ssMain = layScriptSrc(cspMain);
ssMain === "'self'"
  ? ok(`bản máy tính: script-src ${ssMain} — không có unsafe-inline`)
  : fail('bản máy tính script-src sai', String(ssMain));

const cspWeb = (web.match(/http-equiv="Content-Security-Policy"[\s\S]*?content="([^"]*)"/) || [])[1];
cspWeb
  ? ok('bản web có mang chính sách nội dung trong thẻ meta')
  : fail('bản web KHÔNG có CSP', 'không máy chủ nào đặt hộ đầu trang cho nó');
if (cspWeb) {
  layScriptSrc(cspWeb) === "'self'"
    ? ok(`bản web: script-src 'self' — không có unsafe-inline`)
    : fail('bản web script-src sai', String(layScriptSrc(cspWeb)));
  for (const ct of ['object-src', 'base-uri', 'form-action', 'connect-src', 'default-src']) {
    cspWeb.includes(ct) ? ok(`bản web có chỉ thị ${ct}`) : fail(`bản web thiếu ${ct}`);
  }
}

/* Điều kiện tiên quyết của việc bỏ unsafe-inline: bản dựng không có script nội tuyến. */
if (existsSync('dist/index.html')) {
  const dist = doc('dist/index.html');
  const noiTuyen = [...dist.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter((m) => !/\bsrc=/.test(m[1]) && m[2].trim().length > 0);
  noiTuyen.length === 0
    ? ok('bản dựng không có thẻ script nội tuyến nào — đủ điều kiện bỏ unsafe-inline')
    : fail(`bản dựng có ${noiTuyen.length} script nội tuyến`, 'CSP sẽ chặn chính mã của trang');
  dist.includes('Content-Security-Policy')
    ? ok('bản dựng giữ lại thẻ CSP')
    : fail('bản dựng mất thẻ CSP', 'bản web sẽ chạy không có chính sách nào');
} else {
  fail('chưa có dist/index.html', 'chạy npm run build trước');
}

/* --------------------------- QUYỀN HỆ THỐNG ------------------------------ */
/*
 * Trong Electron, quyền 'media' gộp cả micro lẫn camera. Trả true cho
 * 'media' mà không xét mediaTypes là mở luôn webcam.
 */
main.includes('mediaTypes')
  ? ok('quyền media có xét mediaTypes — không mở nhầm camera')
  : fail('quyền media không xét mediaTypes', 'đang mở cả webcam');
main.includes('setPermissionCheckHandler')
  ? ok('có chặn ở cả cửa kiểm đồng bộ')
  : fail('thiếu setPermissionCheckHandler', 'chỉ chặn một cửa là còn cửa kia mở');
main.includes('setDevicePermissionHandler')
  ? ok('từ chối mọi thiết bị ngoài (HID, cổng nối tiếp, USB)')
  : fail('thiếu setDevicePermissionHandler');
main.includes("wc.on('will-attach-webview'")
  ? ok('chặn gắn webview ở tầng ứng dụng')
  : fail('không chặn will-attach-webview');
main.includes("app.on('web-contents-created'")
  ? ok('luật chặn áp cho mọi webContents, kể cả cái tạo sau')
  : fail('chỉ chặn trên cửa sổ tạo sẵn');

/* Mở liên kết ra ngoài phải giới hạn ở https, không mở lược đồ tuỳ ý. */
const moNgoai = [...main.matchAll(/shell\.openExternal\(/g)].length;
const canHttps = [...main.matchAll(/\/\^https:\\\/\\\/\/\.test\(url\)/g)].length;
moNgoai > 0 && canHttps >= moNgoai
  ? ok(`cả ${moNgoai} chỗ mở liên kết ngoài đều chỉ nhận https`)
  : fail(`có ${moNgoai} chỗ openExternal nhưng chỉ ${canHttps} chỗ chặn lược đồ`);

/* ------------------------------- IPC ------------------------------------ */
/*
 * Kênh IPC là toàn bộ bề mặt tấn công giữa trang và tiến trình chính. Kênh
 * thừa ở main mà preload không gọi vẫn gọi được từ một preload khác; kênh
 * preload gọi mà main không có thì là lỗi im lặng.
 */
const kenhMain = [...main.matchAll(/ipcMain\.handle\('([^']+)'/g)].map((m) => m[1]).sort();
const kenhPreload = [...preload.matchAll(/ipcRenderer\.invoke\('([^']+)'/g)].map((m) => m[1]).sort();
const thua = kenhMain.filter((k) => !kenhPreload.includes(k));
const thieu = kenhPreload.filter((k) => !kenhMain.includes(k));
thua.length === 0 ? ok(`${kenhMain.length} kênh IPC, không kênh nào thừa`) : fail('kênh thừa ở main', thua.join(', '));
thieu.length === 0 ? ok('không kênh nào gọi vào chỗ trống') : fail('kênh không có người nhận', thieu.join(', '));
new Set(kenhMain).size === kenhMain.length ? ok('không kênh IPC nào đăng ký hai lần') : fail('kênh IPC trùng');
/*
 * preload chỉ được DÙNG ipcRenderer, không được TRAO nó cho trang. Bài kiểm
 * bỏ qua dòng khai báo require rồi soi mọi lần nhắc tới ipcRenderer còn
 * lại: hợp lệ khi và chỉ khi lần nào cũng là ipcRenderer.invoke('kênh cố
 * định'). Bất kỳ cách nhắc nào khác — gán vào biến, đưa vào object trao ra,
 * gọi .on hay .send — đều là rò cả đối tượng ra trang.
 */
const boChuThich = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const thanPreload = boChuThich(preload).replace(
  /const\s*\{[^}]*\}\s*=\s*require\('electron'\);?/,
  '',
);
const nhacIpc = [...thanPreload.matchAll(/ipcRenderer(\.\w+)?/g)].map((m) => m[0]);
const nhacXau = nhacIpc.filter((x) => x !== 'ipcRenderer.invoke');
nhacXau.length === 0
  ? ok(`preload chỉ gọi ipcRenderer.invoke (${nhacIpc.length} lần), không trao đối tượng ra trang`)
  : fail('preload rò ipcRenderer ra trang', nhacXau.join(', '));
/invoke\(\s*(?!')/.test(preload)
  ? fail('preload có kênh động', 'tên kênh phải là hằng, không nhận từ trang')
  : ok('mọi tên kênh trong preload đều là hằng, không nhận từ trang');

/* ------------------------------- KÉT ------------------------------------ */
/[Nn]:\s*1\s*<<\s*17/.test(vault)
  ? ok('scrypt N = 2^17 — mỗi lần thử tốn CPU thật')
  : fail('tham số scrypt bị hạ');
vault.includes('aes-256-gcm')
  ? ok('AES-256-GCM — vừa mã hoá vừa chống sửa đổi')
  : fail('không dùng AES-256-GCM');
vault.includes('timingSafeEqual')
  ? ok('so bản xác minh bằng phép so hằng thời gian')
  : fail('so bản xác minh bằng phép so thường');
!/fs\.writeFileSync\(\s*this\.(dataPath|metaPath)/.test(vault)
  ? ok('không chỗ nào ghi thẳng lên tệp két — đều qua ghi nguyên tử')
  : fail('còn chỗ ghi thẳng lên tệp két', 'mất điện giữa chừng là mất hồ sơ');
vault.includes('saiLienTiep')
  ? ok('số lần nhập sai ghi xuống đĩa — tắt mở lại không xoá được')
  : fail('số lần nhập sai chỉ nằm trong bộ nhớ');
!/this\.key\s*=\s*[^n]/.test(vault.split('lock()')[0] ?? '') || vault.includes('key.fill(0)')
  ? ok('khoá bị xoá khỏi bộ nhớ khi đóng két')
  : fail('khoá còn nằm lại trong bộ nhớ sau khi đóng két');
!/passcode/.test(vault.match(/ghiNguyenTu\([\s\S]{0,400}?\)/g)?.join('') ?? '')
  ? ok('không có đường nào ghi mã khoá xuống đĩa')
  : fail('có đường ghi mã khoá xuống đĩa');

console.log(`\n  ${bad === 0 ? 'ĐẠT — không lỗ hổng nào trong danh mục này' : `HỎNG — ${bad} lỗi`}\n`);
process.exit(bad === 0 ? 0 : 1);
