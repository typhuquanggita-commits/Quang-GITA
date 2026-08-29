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
const PROBE = 'engwill365-vault-v1';

class Vault {
  constructor(dir) {
    this.dir = dir;
    this.metaPath = path.join(dir, 'vault.json');
    this.dataPath = path.join(dir, 'profile.enc');
    this.key = null;
    fs.mkdirSync(dir, {recursive: true});
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
    fs.writeFileSync(
      this.metaPath,
      JSON.stringify(
        {
          version: 1,
          kdf: 'scrypt',
          params: {N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p},
          salt: salt.toString('base64'),
          probe: this.#seal(key, PROBE),
          createdAt: new Date().toISOString(),
        },
        null,
        2,
      ),
      {mode: 0o600},
    );
    this.key = key;
    return {ok: true};
  }

  /** Mở khoá. Sai mã thì không tiết lộ gì thêm ngoài việc sai. */
  unlock(passcode) {
    if (!this.isInitialised) return {ok: false, error: 'Chưa đặt mã khoá'};
    let meta;
    try {
      meta = JSON.parse(fs.readFileSync(this.metaPath, 'utf8'));
    } catch {
      return {ok: false, error: 'Tệp két hỏng'};
    }
    const key = this.#derive(passcode, Buffer.from(meta.salt, 'base64'));
    try {
      if (this.#open(key, meta.probe) !== PROBE) throw new Error();
    } catch {
      return {ok: false, error: 'Mã khoá không đúng'};
    }
    this.key = key;
    return {ok: true};
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

  write(data) {
    if (!this.key) return {ok: false, error: 'Két đang khoá'};
    fs.writeFileSync(this.dataPath, this.#seal(this.key, JSON.stringify(data)), {
      mode: 0o600,
    });
    return {ok: true};
  }

  /** Đổi mã khoá: giải mã bằng mã cũ, mã hoá lại bằng mã mới. */
  change(oldPass, newPass) {
    const u = this.unlock(oldPass);
    if (!u.ok) return u;
    const check = validate(newPass);
    if (check) return {ok: false, error: check};

    const current = this.read();
    const salt = crypto.randomBytes(32);
    const key = this.#derive(newPass, salt);
    const meta = JSON.parse(fs.readFileSync(this.metaPath, 'utf8'));
    meta.salt = salt.toString('base64');
    meta.probe = this.#seal(key, PROBE);
    meta.changedAt = new Date().toISOString();
    fs.writeFileSync(this.metaPath, JSON.stringify(meta, null, 2), {mode: 0o600});
    this.key = key;
    if (current.ok && current.data) this.write(current.data);
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
  const weak = ['12345678', 'password', 'engwill1', 'qwerty12', '11111111'];
  if (weak.includes(s.toLowerCase())) return 'Mã khoá quá dễ đoán';
  return null;
}

module.exports = {Vault, validate};
