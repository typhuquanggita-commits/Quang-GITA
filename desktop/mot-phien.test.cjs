/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm khoá một phiên bản bằng cách chạy HAI tiến trình thật.
 * Chạy: xvfb-run -a electron --no-sandbox desktop/mot-phien.test.cjs
 *
 * VÌ SAO PHẢI CHẠY HAI TIẾN TRÌNH THẬT
 *   Đọc mã nguồn xem có gọi requestSingleInstanceLock không thì chỉ chứng
 *   minh được là có dòng đó. Nó không chứng minh được tiến trình thứ hai
 *   THẬT SỰ thoát trước khi kịp chạm vào tệp két — mà đó mới là điều cần.
 *
 *   Hai tiến trình cùng mở một két là đường mất dữ liệu: cả hai đều mở khoá
 *   được, cả hai đều ghi được, và tiến trình ghi sau đè lên tiến trình ghi
 *   trước mà không có thông báo nào.
 */
const {app} = require('electron');
const {spawn} = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

let fail = 0;
const ok = (n, c, x = '') => {
  if (c) console.log(`  ✓ ${n}`);
  else { fail++; console.log(`  ✗ ${n}${x ? ` — ${x}` : ''}`); }
};

const chung = fs.mkdtempSync(path.join(os.tmpdir(), 'engwin-mot-phien-'));
console.log(`\n  KIỂM KHOÁ MỘT PHIÊN BẢN — ${chung}\n`);

/*
 * Kịch bản con: đặt cùng một thư mục dữ liệu rồi nạp main.cjs thật. Tiến
 * trình nào giữ được khoá thì in GIU rồi ở lại; tiến trình nào không giữ
 * được thì main.cjs gọi process.exit(0) trước khi in được gì.
 */
const kichBan = path.join(chung, 'con.cjs');
fs.writeFileSync(
  kichBan,
  `const {app} = require('electron');
app.setPath('userData', ${JSON.stringify(chung)});
require(${JSON.stringify(path.join(__dirname, 'main.cjs'))});
// Chỉ tới được đây khi đã giữ được khoá phiên.
console.log('GIU');
setTimeout(() => app.exit(0), 6000);
`,
);

const chay = () =>
  spawn(process.execPath, ['--no-sandbox', kichBan], {
    env: {...process.env, ELECTRON_RUN_AS_NODE: ''},
    stdio: ['ignore', 'pipe', 'pipe'],
  });

const gom = (tt) => {
  let ra = '';
  tt.stdout.on('data', (d) => (ra += d));
  tt.stderr.on('data', (d) => (ra += d));
  return () => ra;
};

const doi = (ms) => new Promise((r) => setTimeout(r, ms));
const thoat = (tt) =>
  new Promise((r) => {
    if (tt.exitCode !== null) return r(tt.exitCode);
    tt.on('exit', (ma) => r(ma));
  });

app.whenReady().then(async () => {
  try {
    const a = chay();
    const raA = gom(a);
    // Đợi tiến trình đầu giữ được khoá và dựng xong cửa sổ.
    await doi(4000);
    ok('tiến trình thứ nhất giữ được khoá phiên', /GIU/.test(raA()), raA().slice(0, 120));
    ok('tiến trình thứ nhất còn sống', a.exitCode === null, `mã thoát ${a.exitCode}`);

    const truocKhiB = fs.existsSync(path.join(chung, 'vault'))
      ? fs.readdirSync(path.join(chung, 'vault')).sort().join(',')
      : '(chưa có)';

    const b = chay();
    const raB = gom(b);
    const batDau = Date.now();
    const maB = await Promise.race([thoat(b), doi(8000).then(() => 'quá giờ')]);
    const matGiay = (Date.now() - batDau) / 1000;

    ok('tiến trình thứ hai THOÁT, không chạy song song', maB !== 'quá giờ', String(maB));
    ok('tiến trình thứ hai thoát êm, mã 0', maB === 0, String(maB));
    /*
     * Phải thoát NHANH, không phải chạy hết rồi mới thoát. Kịch bản con tự
     * hẹn thoát sau sáu giây, nên nếu chỉ kiểm "có thoát không" thì một bản
     * KHÔNG có khoá phiên vẫn qua được phép kiểm đó. Ngưỡng ba giây tách
     * được hai trường hợp: bị chặn ngay từ đầu, hay chạy đủ vòng đời.
     */
    ok('tiến trình thứ hai bị chặn NGAY, không chạy hết vòng đời',
       matGiay < 3, `mất ${matGiay.toFixed(1)} giây`);
    ok('tiến trình thứ hai KHÔNG giữ được khoá', !/GIU/.test(raB()), raB().slice(0, 120));

    const sauKhiB = fs.existsSync(path.join(chung, 'vault'))
      ? fs.readdirSync(path.join(chung, 'vault')).sort().join(',')
      : '(chưa có)';
    ok('tiến trình thứ hai KHÔNG đụng vào thư mục két', truocKhiB === sauKhiB,
       `${truocKhiB} → ${sauKhiB}`);

    ok('tiến trình thứ nhất vẫn sống sau khi tiến trình thứ hai thoát',
       a.exitCode === null, `mã thoát ${a.exitCode}`);

    a.kill('SIGTERM');
    await Promise.race([thoat(a), doi(3000)]);
  } catch (e) {
    fail++;
    console.log(`  ✗ ngoại lệ ngoài dự tính: ${e && e.message}`);
  }
  fs.rmSync(chung, {recursive: true, force: true});
  console.log(`\n  ${fail === 0 ? 'ĐẠT' : `HỎNG — ${fail} lỗi`}\n`);
  app.exit(fail === 0 ? 0 : 1);
});
