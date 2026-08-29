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

fs.rmSync(dir, {recursive: true, force: true});
console.log(`\n  ${fail === 0 ? '\x1b[32mĐẠT\x1b[0m' : '\x1b[31mHỎNG\x1b[0m'} — ${pass} đúng, ${fail} sai\n`);
process.exit(fail === 0 ? 0 : 1);
