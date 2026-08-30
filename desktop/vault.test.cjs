/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Tự kiểm tra két dữ liệu. Chạy: node desktop/vault.test.cjs
 */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {Vault, validate} = require('./vault.cjs');

let pass = 0;
let fail = 0;
const ok = (name, cond, extra = '') => {
  if (cond) {
    pass++;
    console.log(`  \x1b[32m✓\x1b[0m ${name}`);
  } else {
    fail++;
    console.log(`  \x1b[31m✗\x1b[0m ${name}${extra ? ` — ${extra}` : ''}`);
  }
};

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'engwin-vault-'));
console.log(`\n  KIỂM TRA KÉT DỮ LIỆU — ${dir}\n`);

// 1. Quy tắc mã khoá
ok('từ chối mã ngắn', validate('abc1') !== null);
ok('từ chối mã không có chữ số', validate('abcdefgh') !== null);
ok('từ chối mã không có chữ cái', validate('12345678') !== null);
ok('từ chối một ký tự lặp lại', validate('aaaaaaaa') !== null);
ok('từ chối mã dễ đoán', validate('password') !== null);
ok('chấp nhận mã hợp lệ', validate('Engwin365!') === null);

// 2. Khởi tạo
const v = new Vault(dir);
ok('két chưa khởi tạo', v.isInitialised === false);
ok('không tạo được bằng mã yếu', v.create('1234').ok === false);
ok('tạo được bằng mã hợp lệ', v.create('Engwin365!').ok === true);
ok('két đã khởi tạo', v.isInitialised === true);
ok('két đang mở sau khi tạo', v.isUnlocked === true);
ok('không tạo lại được', v.create('Engwin365!').ok === false);

// 3. Ghi / đọc
const HO_SO = {ten: 'Quang', muc_tieu: 'IELTS 8.0', ngay: 1, ghiChu: 'Bí mật — không được lộ'};
ok('ghi được hồ sơ', v.write(HO_SO).ok === true);
const r1 = v.read();
ok('đọc lại đúng hồ sơ', JSON.stringify(r1.data) === JSON.stringify(HO_SO));

// 4. Khoá lại
v.lock();
ok('két đã khoá', v.isUnlocked === false);
ok('khoá rồi thì không đọc được', v.read().ok === false);
ok('khoá rồi thì không ghi được', v.write({x: 1}).ok === false);

// 5. Mở khoá
ok('sai mã thì không mở được', v.unlock('SaiMaKhoa9').ok === false);
ok('sai mã vẫn giữ két khoá', v.isUnlocked === false);
ok('đúng mã thì mở được', v.unlock('Engwin365!').ok === true);
ok('mở rồi đọc lại đúng', JSON.stringify(v.read().data) === JSON.stringify(HO_SO));

// 6. Đổi mã khoá
ok('đổi mã sai mã cũ → hỏng', v.change('SaiMaKhoa9', 'MaMoi2026!').ok === false);
ok('đổi sang mã yếu → hỏng', v.change('Engwin365!', 'abc').ok === false);
ok('đổi mã thành công', v.change('Engwin365!', 'MaMoi2026!').ok === true);
v.lock();
ok('mã cũ không còn dùng được', v.unlock('Engwin365!').ok === false);
ok('mã mới mở được', v.unlock('MaMoi2026!').ok === true);
ok('dữ liệu còn nguyên sau khi đổi mã', JSON.stringify(v.read().data) === JSON.stringify(HO_SO));

// 7. Không rò rỉ bản rõ ra đĩa
const onDisk = [
  fs.readFileSync(path.join(dir, 'vault.json'), 'utf8'),
  fs.readFileSync(path.join(dir, 'profile.enc'), 'utf8'),
].join('\n');
ok('không có bản rõ trên đĩa', !onDisk.includes('Bí mật') && !onDisk.includes('IELTS 8.0'));
ok('không lưu mã khoá trên đĩa', !onDisk.includes('MaMoi2026') && !onDisk.includes('Engwin365!'));

// 8. Quyền tệp — kiểm theo đúng cơ chế của từng hệ điều hành
//
// Trên Linux và macOS, quyền nằm ở mode bit và Node đặt được, nên đòi đúng 0600.
//
// Trên Windows KHÔNG có mode bit. Node chỉ ánh xạ được duy nhất thuộc tính
// chỉ-đọc, và fs.stat luôn trả về 0666 hoặc 0444 dù chmod đặt gì. Đòi 0600 ở đó
// là đòi một thứ hệ điều hành không có — bài kiểm sẽ đỏ mãi mà chẳng bảo vệ
// thêm được gì.
//
// Cái BẢO VỆ THẬT trên Windows là danh sách kiểm soát truy cập của NTFS mà thư
// mục hồ sơ người dùng truyền xuống: két nằm trong %APPDATA%\ENGWIN365, dưới
// C:\Users\<tên>, và thư mục đó mặc định chỉ cấp quyền cho chính người dùng,
// SYSTEM và nhóm quản trị. Người dùng thường khác trên cùng máy không đọc được.
// Đây là mức tương đương với 0600 trên POSIX, nơi root cũng đọc được tất.
//
// Và ở cả hai hệ, quyền tệp chỉ là lớp phòng thủ thứ hai. Lớp thứ nhất là mã
// hoá AES-256-GCM với khoá dẫn xuất bằng scrypt — đã kiểm ở mục 7.
const laWindows = process.platform === 'win32';
for (const f of ['vault.json', 'profile.enc']) {
  const mode = fs.statSync(path.join(dir, f)).mode & 0o777;
  if (laWindows) {
    ok(
      `${f} — Windows không có mode bit, quyền do ACL hồ sơ người dùng quyết định`,
      mode === 0o666 || mode === 0o444,
      `thấy ${mode.toString(8)}, không phải giá trị Windows thường trả về`,
    );
  } else {
    ok(`${f} chỉ chủ sở hữu đọc được (0600)`, mode === 0o600, `thấy ${mode.toString(8)}`);
  }
}

// 9. Chống sửa đổi (AES-GCM)
const good = fs.readFileSync(path.join(dir, 'profile.enc'), 'utf8');
const buf = Buffer.from(good, 'base64');
buf[buf.length - 1] ^= 0xff;
fs.writeFileSync(path.join(dir, 'profile.enc'), buf.toString('base64'));
ok('phát hiện tệp bị sửa đổi', v.read().ok === false);
fs.writeFileSync(path.join(dir, 'profile.enc'), good);
ok('phục hồi tệp gốc thì đọc lại được', v.read().ok === true);

// 10. Xoá két
ok('xoá được két', v.destroy().ok === true);
ok('xoá xong thì coi như chưa khởi tạo', v.isInitialised === false);
ok('xoá xong thì tệp không còn', !fs.existsSync(path.join(dir, 'profile.enc')));

/* ===================================================================== *
 * 11. THỜI GIAN CHỜ PHẢI SỐNG SÓT QUA VIỆC TẮT MỞ ỨNG DỤNG
 * Đây là lỗ hổng thật của bản trước: đếm số lần sai trong bộ nhớ tiến trình
 * nên tắt mở lại là về không. Bài kiểm dựng một đối tượng Vault MỚI hoàn
 * toàn — đúng cái xảy ra khi mở lại ứng dụng — rồi kiểm số đếm còn nguyên.
 * ===================================================================== */
const dir2 = fs.mkdtempSync(path.join(os.tmpdir(), 'engwin-vault-cho-'));
const v2 = new Vault(dir2);
v2.create('Engwin365!');
ok('mới tạo thì không phải chờ', v2.choMs === 0 && v2.soLanSai === 0);
for (let i = 0; i < 4; i++) v2.unlock('SaiRoi123');
ok('nhập sai bốn lần thì đếm đủ bốn', v2.soLanSai === 4, `thấy ${v2.soLanSai}`);
ok('nhập sai bốn lần thì phải chờ', v2.choMs > 0, `chờ ${v2.choMs}ms`);
const v2b = new Vault(dir2);
ok('tắt mở lại KHÔNG xoá được số lần sai', v2b.soLanSai === 4, `thấy ${v2b.soLanSai}`);
ok('tắt mở lại vẫn phải chờ', v2b.choMs > 0, `chờ ${v2b.choMs}ms`);
ok('chờ có trần 30 giây', (() => {
  for (let i = 0; i < 40; i++) v2b.unlock('SaiRoi123');
  return v2b.choMs === 30_000;
})(), `chờ ${v2b.choMs}ms`);
ok('nhập đúng thì số lần sai về không', v2b.unlock('Engwin365!').ok === true && v2b.soLanSai === 0);
ok('sai nhiều lần KHÔNG khoá vĩnh viễn két', v2b.isUnlocked === true);

/* ===================================================================== *
 * 12. GHI NGUYÊN TỬ — KHÔNG ĐỂ LẠI TỆP TẠM
 * ===================================================================== */
v2b.write({a: 1});
const rac = fs.readdirSync(dir2).filter((f) => f.includes('.tmp-'));
ok('ghi xong không để lại tệp tạm', rac.length === 0, rac.join(', '));

/* ===================================================================== *
 * 13. ĐỔI MÃ KHOÁ — HỒ SƠ PHẢI SANG ĐƯỢC KHOÁ MỚI
 * ===================================================================== */
v2b.write({dulieu: 'quan trọng', n: 42});
ok('đổi mã khoá thành công', v2b.change('Engwin365!', 'Engwin366?').ok === true);
ok('đổi xong đọc lại đúng dữ liệu cũ', v2b.read().data?.n === 42);
ok('đổi xong mã cũ KHÔNG mở được', (() => {
  v2b.lock();
  return v2b.unlock('Engwin365!').ok === false;
})());
ok('đổi xong mã mới mở được', v2b.unlock('Engwin366?').ok === true);
ok('đổi mã khoá không để lại tệp dàn sẵn',
   !fs.existsSync(path.join(dir2, 'vault.json.new')) &&
   !fs.existsSync(path.join(dir2, 'profile.enc.new')));

/* Hồ sơ hỏng thì PHẢI từ chối đổi mã khoá, không được chôn nó vĩnh viễn. */
const nguyen = fs.readFileSync(path.join(dir2, 'profile.enc'), 'utf8');
fs.writeFileSync(path.join(dir2, 'profile.enc'), 'khong-phai-base64-hop-le');
const thu = v2b.change('Engwin366?', 'Engwin367#');
ok('hồ sơ hỏng thì từ chối đổi mã khoá', thu.ok === false, JSON.stringify(thu));
ok('từ chối rồi thì mã khoá cũ vẫn còn hiệu lực', (() => {
  fs.writeFileSync(path.join(dir2, 'profile.enc'), nguyen);
  v2b.lock();
  return v2b.unlock('Engwin366?').ok === true && v2b.read().data?.n === 42;
})());

/* ===================================================================== *
 * 14. PHỤC HỒI SAU KHI MẤT ĐIỆN GIỮA LÚC ĐỔI MÃ KHOÁ
 * Dựng lại đúng hai trạng thái dở dang rồi kiểm luật phục hồi.
 * ===================================================================== */
// (a) Mất điện TRƯỚC khi đổi tên tệp nào: còn cả hai tệp .new → phải lùi lại.
fs.writeFileSync(path.join(dir2, 'profile.enc.new'), 'do-dang');
fs.writeFileSync(path.join(dir2, 'vault.json.new'), '{"do":"dang"}');
const v3 = new Vault(dir2);
ok('mất điện trước bước đổi tên thì lùi lại', v3.phucHoi === 'đã lùi lại');
ok('lùi lại thì hai tệp dàn sẵn bị xoá',
   !fs.existsSync(path.join(dir2, 'profile.enc.new')) &&
   !fs.existsSync(path.join(dir2, 'vault.json.new')));
ok('lùi lại thì mã khoá cũ vẫn mở được', v3.unlock('Engwin366?').ok === true);
ok('lùi lại thì hồ sơ còn nguyên', v3.read().data?.n === 42);

// (b) Mất điện GIỮA hai bước đổi tên: chỉ còn vault.json.new → phải tiến tới.
//     Dựng bằng cách đổi khoá thật rồi chặn lại đúng ở giữa.
const dir3 = fs.mkdtempSync(path.join(os.tmpdir(), 'engwin-vault-nua-'));
const v4 = new Vault(dir3);
v4.create('Engwin365!');
v4.write({n: 7});
{
  // Mô phỏng: hồ sơ ĐÃ sang khoá mới, vault.json thì chưa.
  const crypto = require('node:crypto');
  const meta = JSON.parse(fs.readFileSync(path.join(dir3, 'vault.json'), 'utf8'));
  const saltMoi = crypto.randomBytes(32);
  const khoaMoi = crypto.scryptSync(Buffer.from('Engwin999#', 'utf8'), saltMoi, 32, {
    N: 1 << 17, r: 8, p: 1, maxmem: 256 * 1024 * 1024,
  });
  const seal = (key, txt) => {
    const iv = crypto.randomBytes(12);
    const c = crypto.createCipheriv('aes-256-gcm', key, iv);
    const enc = Buffer.concat([c.update(txt, 'utf8'), c.final()]);
    return Buffer.concat([iv, c.getAuthTag(), enc]).toString('base64');
  };
  fs.writeFileSync(path.join(dir3, 'profile.enc'), seal(khoaMoi, JSON.stringify({n: 7})));
  meta.salt = saltMoi.toString('base64');
  meta.probe = seal(khoaMoi, 'engwin365-vault-v1');
  meta.saiLienTiep = 0;
  fs.writeFileSync(path.join(dir3, 'vault.json.new'), JSON.stringify(meta, null, 2));
}
const v5 = new Vault(dir3);
ok('mất điện giữa hai bước đổi tên thì tiến tới', v5.phucHoi === 'đã đổi xong');
ok('tiến tới thì mã khoá MỚI mở được', v5.unlock('Engwin999#').ok === true);
ok('tiến tới thì đọc lại đúng hồ sơ', v5.read().data?.n === 7);
ok('tiến tới thì không còn tệp dàn sẵn', !fs.existsSync(path.join(dir3, 'vault.json.new')));

/* ===================================================================== *
 * 15. GHI HỎNG PHẢI ĐƯỢC BÁO, KHÔNG ĐƯỢC NÉM RA NGOÀI
 *
 * Đây là đường mất dữ liệu âm thầm: đĩa đầy hoặc thư mục bị khoá quyền thì
 * fs ném lỗi, lỗi đi thẳng qua IPC, và nếu giao diện không bắt thì học viên
 * đóng máy trong niềm tin rằng bài vừa làm đã lưu.
 *
 * Mô phỏng bằng cách XOÁ thư mục két sau khi đã mở khoá. Cách này chặn được
 * ở mọi mức quyền — kể cả khi chạy dưới root, và kể cả trên Windows nơi
 * chmod không có tác dụng. Bỏ quyền ghi bằng chmod thì root vẫn ghi được,
 * nên phép thử sẽ không chạy mà vẫn báo xanh.
 * ===================================================================== */
const dir4 = fs.mkdtempSync(path.join(os.tmpdir(), 'engwin-vault-hong-'));
const v6 = new Vault(dir4);
v6.create('Engwin365!');
v6.write({n: 1});
fs.rmSync(dir4, {recursive: true, force: true});

const kqGhi = v6.write({n: 2});
ok('ghi khi thư mục két không còn thì BÁO LỖI, không ném ra ngoài',
   kqGhi.ok === false, JSON.stringify(kqGhi));
ok('lời báo lỗi là câu người dùng đọc hiểu được',
   typeof kqGhi.error === 'string' && kqGhi.error.length > 20 && !/undefined/.test(kqGhi.error),
   String(kqGhi.error));

/* Đổi mã khoá cũng phải báo lỗi, không được ném ra ngoài. */
const kqDoi = v6.change('Engwin365!', 'Engwin366?');
ok('đổi mã khoá khi ghi hỏng thì BÁO LỖI, không ném ra ngoài', kqDoi.ok === false);

/* Và tạo két mới ở chỗ không ghi được cũng vậy. */
const dir5 = fs.mkdtempSync(path.join(os.tmpdir(), 'engwin-vault-tao-'));
const v7 = new Vault(dir5);
fs.rmSync(dir5, {recursive: true, force: true});
const kqTao = v7.create('Engwin365!');
ok('tạo két khi ghi hỏng thì BÁO LỖI, không ném ra ngoài', kqTao.ok === false, JSON.stringify(kqTao));
ok('tạo hỏng thì két KHÔNG tự coi là đã mở', v7.isUnlocked === false);

/* Ghi hỏng không được để lại tệp tạm chiếm nốt chỗ trống còn lại. */
const dir6 = fs.mkdtempSync(path.join(os.tmpdir(), 'engwin-vault-rac-'));
const v8 = new Vault(dir6);
v8.create('Engwin365!');
const thuMucChan = path.join(dir6, 'profile.enc');
fs.mkdirSync(thuMucChan); // biến đường ghi thành thư mục: mọi lần ghi đều hỏng
const kqRac = v8.write({n: 3});
ok('ghi vào chỗ bị chiếm thì báo lỗi', kqRac.ok === false, JSON.stringify(kqRac));
const racHong = fs.readdirSync(dir6).filter((f) => f.includes('.tmp-'));
ok('ghi hỏng không để lại tệp tạm chiếm chỗ', racHong.length === 0, racHong.join(', '));
fs.rmSync(dir6, {recursive: true, force: true});

fs.rmSync(dir2, {recursive: true, force: true});
fs.rmSync(dir3, {recursive: true, force: true});

fs.rmSync(dir, {recursive: true, force: true});
console.log(`\n  ${fail === 0 ? '\x1b[32mĐẠT\x1b[0m' : '\x1b[31mHỎNG\x1b[0m'} — ${pass} đúng, ${fail} sai\n`);
process.exit(fail === 0 ? 0 : 1);
