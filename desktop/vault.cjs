/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Két dữ liệu cục bộ cho bản máy tính.
 *
 * Mã khoá KHÔNG bao giờ được lưu. Chỉ lưu:
 *   - salt ngẫu nhiên 32 byte
 *   - bản xác minh: một chuỗi cố định đã mã hoá bằng khoá dẫn xuất
 * Muốn mở két phải nhập đúng mã khoá để dẫn xuất lại khoá và giải mã được
 * bản xác minh đó. Không có mã khoá thì không có cách nào đọc được hồ sơ.
 *
 * Dẫn xuất khoá: scrypt (N=2^17) — chống dò bằng phần cứng chuyên dụng.
 * Mã hoá: AES-256-GCM — vừa mã hoá vừa chống sửa đổi.
 */

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const SCRYPT = {N: 1 << 17, r: 8, p: 1, maxmem: 256 * 1024 * 1024};
const KEYLEN = 32;
const PROBE = 'engwin365-vault-v1';
/* Trần số mũ của thời gian chờ. Xem ghi chú "KHÔNG KHOÁ VĨNH VIỄN" dưới. */
const MU_CHO_TOI_DA = 10;

/*
 * GHI NGUYÊN TỬ
 *
 * fs.writeFileSync ghi thẳng lên tệp đích. Máy mất điện giữa chừng thì
 * profile.enc còn lại một nửa, và AES-GCM sẽ từ chối giải mã cả tệp — hồ sơ
 * mất vĩnh viễn, không phải mất một phần. Ghi vào tệp tạm rồi đổi tên thì
 * đổi tên là thao tác nguyên tử trên cùng một phân vùng: hoặc tệp cũ còn
 * nguyên, hoặc tệp mới đã đủ, không có trạng thái ở giữa.
 *
 * fsync trước khi đổi tên để dữ liệu thật sự nằm trên đĩa chứ không chỉ nằm
 * trong bộ đệm của hệ điều hành.
 */
const NEW = '.new';

/*
 * PHỤC HỒI SAU KHI MẤT ĐIỆN GIỮA LÚC ĐỔI MÃ KHOÁ
 * Luật quyết định, không đoán — xem ghi chú dài ở change().
 */
function phucHoiDoiKhoa(metaPath, dataPath) {
  const metaMoi = fs.existsSync(metaPath + NEW);
  const hoSoMoi = fs.existsSync(dataPath + NEW);
  if (!metaMoi && !hoSoMoi) return null;
  if (hoSoMoi) {
    // Chưa đổi tên tệp nào — lùi về bản cũ còn nguyên.
    for (const p of [dataPath + NEW, metaPath + NEW]) if (fs.existsSync(p)) fs.rmSync(p);
    return 'đã lùi lại';
  }
  // Hồ sơ đã sang khoá mới, chỉ còn thiếu bước đổi tên vault.json.
  fs.renameSync(metaPath + NEW, metaPath);
  return 'đã đổi xong';
}

function ghiNguyenTu(dich, noiDung) {
  const tam = `${dich}.tmp-${process.pid}-${Date.now()}`;
  let fd;
  try {
    fd = fs.openSync(tam, 'w', 0o600);
    fs.writeFileSync(fd, noiDung);
    fs.fsyncSync(fd);
    fs.closeSync(fd);
    fd = undefined;
    fs.renameSync(tam, dich);
  } catch (e) {
    /*
     * Ghi hỏng giữa chừng thì phải dọn tệp tạm. Không dọn thì mỗi lần đầy
     * đĩa lại để lại một tệp .tmp, và chúng chiếm nốt chỗ trống còn lại —
     * biến một lần ghi hỏng thành một ổ đĩa không còn ghi được gì.
     */
    if (fd !== undefined) { try { fs.closeSync(fd); } catch { /* đã đóng */ } }
    try { if (fs.existsSync(tam)) fs.rmSync(tam); } catch { /* dọn được tới đâu hay tới đó */ }
    throw e;
  }
}

/** Đổi mã lỗi của hệ điều hành thành câu người dùng đọc hiểu được. */
function loiDeHieu(e) {
  const ma = e && e.code;
  if (ma === 'ENOSPC') return 'Ổ đĩa đã đầy nên chưa lưu được. Dọn bớt chỗ trống rồi thử lại.';
  if (ma === 'EACCES' || ma === 'EPERM') {
    return 'Không có quyền ghi vào thư mục dữ liệu. Kiểm tra xem phần mềm diệt vi-rút có đang chặn không.';
  }
  if (ma === 'EROFS') return 'Ổ đĩa đang ở chế độ chỉ đọc nên không ghi được.';
  if (ma === 'EBUSY') return 'Tệp đang bị chương trình khác giữ. Đóng bớt chương trình rồi thử lại.';
  return `Không ghi được xuống đĩa (${ma || 'lỗi không rõ'}).`;
}

class Vault {
  constructor(dir) {
    this.dir = dir;
    this.metaPath = path.join(dir, 'vault.json');
    this.dataPath = path.join(dir, 'profile.enc');
    this.key = null;
    fs.mkdirSync(dir, {recursive: true});
    this.phucHoi = phucHoiDoiKhoa(this.metaPath, this.dataPath);
  }

  get isInitialised() {
    return fs.existsSync(this.metaPath);
  }

  get isUnlocked() {
    return this.key !== null;
  }

  #derive(passcode, salt) {
    return crypto.scryptSync(
      Buffer.from(String(passcode), 'utf8'),
      salt,
      KEYLEN,
      SCRYPT,
    );
  }

  #seal(key, plaintext) {
    const iv = crypto.randomBytes(12);
    const c = crypto.createCipheriv('aes-256-gcm', key, iv);
    const enc = Buffer.concat([c.update(plaintext, 'utf8'), c.final()]);
    return Buffer.concat([iv, c.getAuthTag(), enc]).toString('base64');
  }

  #open(key, blob) {
    const buf = Buffer.from(blob, 'base64');
    const d = crypto.createDecipheriv(
      'aes-256-gcm',
      key,
      buf.subarray(0, 12),
    );
    d.setAuthTag(buf.subarray(12, 28));
    return Buffer.concat([d.update(buf.subarray(28)), d.final()]).toString('utf8');
  }

  /** Đặt mã khoá lần đầu. Tối thiểu 8 ký tự. */
  create(passcode) {
    if (this.isInitialised) return {ok: false, error: 'Két đã được khởi tạo'};
    const check = validate(passcode);
    if (check) return {ok: false, error: check};

    const salt = crypto.randomBytes(32);
    const key = this.#derive(passcode, salt);
    // 0600 chỉ có tác dụng trên Linux và macOS. Windows không có mode bit;
    // ở đó két được bảo vệ bằng ACL của %APPDATA%, vốn chỉ mở cho chính
    // người dùng, SYSTEM và nhóm quản trị. Xem BAOMAT.md.
    try {
      ghiNguyenTu(
        this.metaPath,
        JSON.stringify(
          {
            version: 1,
            kdf: 'scrypt',
            params: {N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p},
            salt: salt.toString('base64'),
            probe: this.#seal(key, PROBE),
            createdAt: new Date().toISOString(),
            saiLienTiep: 0,
          },
          null,
          2,
        ),
      );
    } catch (e) {
      key.fill(0);
      return {ok: false, error: loiDeHieu(e)};
    }
    this.key = key;
    return {ok: true};
  }

  /* Số lần nhập sai liên tiếp, đọc từ đĩa. Xem ghi chú ở unlock(). */
  get soLanSai() {
    try {
      const n = JSON.parse(fs.readFileSync(this.metaPath, 'utf8')).saiLienTiep;
      return Number.isInteger(n) && n >= 0 ? n : 0;
    } catch {
      return 0;
    }
  }

  #ghiSoLanSai(n) {
    try {
      const meta = JSON.parse(fs.readFileSync(this.metaPath, 'utf8'));
      if (meta.saiLienTiep === n) return;
      meta.saiLienTiep = n;
      ghiNguyenTu(this.metaPath, JSON.stringify(meta, null, 2));
    } catch {
      // Không ghi được thì thôi; thời gian chờ trong bộ nhớ vẫn còn tác dụng.
    }
  }

  /**
   * Mở khoá. Sai mã thì không tiết lộ gì thêm ngoài việc sai.
   *
   * ĐẾM SỐ LẦN SAI PHẢI NẰM TRÊN ĐĨA
   * Bản trước đếm số lần nhập sai trong một biến của tiến trình chính. Người
   * dò mã chỉ cần tắt ứng dụng rồi mở lại là thời gian chờ về không — tức là
   * gần như không có thời gian chờ nào cả. Đếm trên đĩa thì tắt mở lại không
   * xoá được dấu vết.
   *
   * KHÔNG KHOÁ VĨNH VIỄN, VÀ ĐÂY LÀ LỰA CHỌN CÓ CHỦ Ý
   * Nhiều hệ thống xoá dữ liệu sau N lần sai. Ở đây không có máy chủ, không
   * có đường khôi phục, nên khoá vĩnh viễn nghĩa là một đứa trẻ nghịch bàn
   * phím xoá được cả hồ sơ ba năm của anh chị nó. Thay vào đó thời gian chờ
   * tăng theo luỹ thừa tới trần 30 giây và không bao giờ tự về không —
   * chậm đủ để việc dò mã là vô vọng, mà không cầm tù chính chủ.
   *
   * Hàng rào thật vẫn là scrypt N=2^17: mỗi lần thử tốn cỡ vài trăm mili
   * giây CPU, kể cả khi kẻ tấn công bỏ qua ứng dụng này và tấn công thẳng
   * vào tệp trên đĩa — chỗ mà mọi thời gian chờ ở đây đều vô nghĩa.
   */
  unlock(passcode) {
    if (!this.isInitialised) return {ok: false, error: 'Chưa đặt mã khoá'};
    let meta;
    try {
      meta = JSON.parse(fs.readFileSync(this.metaPath, 'utf8'));
    } catch {
      return {ok: false, error: 'Tệp két hỏng'};
    }
    const key = this.#derive(passcode, Buffer.from(meta.salt, 'base64'));
    let dung = false;
    try {
      const ra = Buffer.from(this.#open(key, meta.probe), 'utf8');
      const mong = Buffer.from(PROBE, 'utf8');
      dung = ra.length === mong.length && crypto.timingSafeEqual(ra, mong);
    } catch {
      dung = false;
    }
    if (!dung) {
      key.fill(0);
      this.#ghiSoLanSai(Math.min(this.soLanSai + 1, 1_000_000));
      return {ok: false, error: 'Mã khoá không đúng'};
    }
    this.#ghiSoLanSai(0);
    this.key = key;
    return {ok: true};
  }

  /** Thời gian phải chờ trước lần thử tiếp theo, tính bằng mili giây. */
  get choMs() {
    const n = this.soLanSai;
    return n < 3 ? 0 : Math.min(30_000, 2 ** Math.min(n - 2, MU_CHO_TOI_DA) * 1000);
  }

  lock() {
    if (this.key) this.key.fill(0);
    this.key = null;
  }

  read() {
    if (!this.key) return {ok: false, error: 'Két đang khoá'};
    if (!fs.existsSync(this.dataPath)) return {ok: true, data: null};
    try {
      return {ok: true, data: JSON.parse(this.#open(this.key, fs.readFileSync(this.dataPath, 'utf8')))};
    } catch {
      return {ok: false, error: 'Không giải mã được hồ sơ'};
    }
  }

  /**
   * Ghi hồ sơ.
   *
   * GHI HỎNG PHẢI ĐƯỢC BÁO, KHÔNG ĐƯỢC NÉM RA NGOÀI
   * Bản trước để lỗi của fs ném thẳng qua IPC. Lời hứa ở phía trang bị từ
   * chối, và nếu chỗ gọi không bắt thì giao diện không hiện gì cả — học
   * viên đóng máy, tin rằng bài vừa làm đã lưu, trong khi đĩa đầy và không
   * có gì được ghi. Đó là mất dữ liệu âm thầm, loại tệ nhất.
   *
   * Nay mọi lỗi được bắt và trả về thành {ok:false, error} với câu nói rõ
   * nguyên nhân, để giao diện hiện được và người dùng còn cứu được việc.
   */
  write(data) {
    if (!this.key) return {ok: false, error: 'Két đang khoá'};
    try {
      ghiNguyenTu(this.dataPath, this.#seal(this.key, JSON.stringify(data)));
      return {ok: true};
    } catch (e) {
      return {ok: false, error: loiDeHieu(e)};
    }
  }

  /**
   * Đổi mã khoá: giải mã bằng mã cũ, mã hoá lại bằng mã mới.
   *
   * ĐỔI MÃ KHOÁ CHẠM VÀO HAI TỆP, VÀ ĐÓ LÀ CHỖ MẤT DỮ LIỆU
   * Bản trước ghi vault.json bằng khoá mới TRƯỚC rồi mới mã hoá lại
   * profile.enc. Mất điện giữa hai bước đó thì két có khoá mới nhưng hồ sơ
   * vẫn đang nằm dưới khoá cũ — mở được két mà không đọc được gì, và không
   * có đường lùi vì mã khoá cũ đã hết hiệu lực.
   *
   * Hai tệp thì không có cách nào đổi tên cùng lúc, nên ở đây dàn sẵn cả
   * hai bản mới rồi đổi tên theo một thứ tự cố định, và để lại dấu vết đủ
   * để phục hồi lần chạy sau:
   *   1. dàn profile.enc.new  (hồ sơ đã mã hoá bằng khoá MỚI)
   *   2. dàn vault.json.new   (salt và bản xác minh MỚI)
   *   3. đổi tên hồ sơ trước
   *   4. đổi tên vault.json sau
   * Mất điện trước bước 3: còn cả hai tệp .new, hai tệp thật vẫn là bản cũ
   * nguyên vẹn — lần sau lùi lại bằng cách xoá hai tệp .new.
   * Mất điện giữa bước 3 và 4: profile.enc.new đã biến mất còn
   * vault.json.new còn — lần sau tiến tới bằng cách đổi nốt tên.
   * Sự có mặt của profile.enc.new là thứ phân biệt hai trường hợp, nên
   * luật phục hồi quyết định được, không phải đoán.
   */
  change(oldPass, newPass) {
    const u = this.unlock(oldPass);
    if (!u.ok) return u;
    const check = validate(newPass);
    if (check) return {ok: false, error: check};

    const coHoSo = fs.existsSync(this.dataPath);
    const current = this.read();
    // Hồ sơ có mà đọc không ra thì DỪNG. Đổi khoá lúc này là chôn vĩnh viễn
    // một tệp có thể vẫn cứu được bằng mã khoá cũ.
    if (coHoSo && !current.ok) {
      return {ok: false, error: 'Không đọc được hồ sơ hiện tại nên chưa đổi mã khoá'};
    }

    const salt = crypto.randomBytes(32);
    const key = this.#derive(newPass, salt);
    const meta = JSON.parse(fs.readFileSync(this.metaPath, 'utf8'));
    meta.salt = salt.toString('base64');
    meta.probe = this.#seal(key, PROBE);
    meta.changedAt = new Date().toISOString();
    meta.saiLienTiep = 0;

    try {
      if (coHoSo) ghiNguyenTu(this.dataPath + NEW, this.#seal(key, JSON.stringify(current.data)));
      ghiNguyenTu(this.metaPath + NEW, JSON.stringify(meta, null, 2));
      if (coHoSo) fs.renameSync(this.dataPath + NEW, this.dataPath);
      fs.renameSync(this.metaPath + NEW, this.metaPath);
    } catch (e) {
      /*
       * Hỏng giữa chừng thì dọn hai tệp dàn sẵn và giữ nguyên mã khoá cũ.
       * Luật phục hồi ở đầu tệp vẫn xử lý được nếu tiến trình chết trước khi
       * chạy tới đây, nhưng khi còn sống thì dọn ngay tốt hơn: không để lại
       * trạng thái dở dang cho lần khởi động sau phải đoán.
       */
      for (const t of [this.dataPath + NEW, this.metaPath + NEW]) {
        try { if (fs.existsSync(t)) fs.rmSync(t); } catch { /* dọn tới đâu hay tới đó */ }
      }
      key.fill(0);
      return {ok: false, error: loiDeHieu(e)};
    }

    this.key = key;
    return {ok: true};
  }

  /** Xoá sạch két. Không khôi phục được. */
  destroy() {
    for (const p of [this.metaPath, this.dataPath]) {
      if (fs.existsSync(p)) fs.rmSync(p);
    }
    this.lock();
    return {ok: true};
  }
}

/** Yêu cầu mã khoá — nói rõ vì sao, không chỉ báo lỗi cụt. */
function validate(p) {
  const s = String(p ?? '');
  if (s.length < 8) return 'Mã khoá phải từ 8 ký tự trở lên';
  if (!/[a-zA-Z]/.test(s)) return 'Mã khoá phải có ít nhất một chữ cái';
  if (!/[0-9]/.test(s)) return 'Mã khoá phải có ít nhất một chữ số';
  if (/^(.)\1+$/.test(s)) return 'Mã khoá không được là một ký tự lặp lại';
  const weak = ['12345678', 'password', 'engwin1', 'qwerty12', '11111111'];
  if (weak.includes(s.toLowerCase())) return 'Mã khoá quá dễ đoán';
  return null;
}

module.exports = {Vault, validate};
