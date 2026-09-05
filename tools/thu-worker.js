/* ═══════════════════════════════════════════════════════════════
   GITA 365 — THỬ CỬA VÀO MỚI

       node tools/thu-worker.js

   Bộ thử gọi ĐÚNG hàm fetch của may-chu/worker.js, qua một Request
   thật và nhận về một Response thật. Không dựng lại luồng xử lý ở đây:
   dựng lại là thử một bản chép, và bản chép thì đúng cho tới hôm bản
   thật đổi.

   Chỗ duy nhất phải dựng là D1 — Cloudflare không chạy được ở máy này.
   Lớp dựng ấy mỏng đúng ba hàm (.bind .first .all .run) và chạy trên
   node:sqlite, tức là chạy trên CÙNG một cỗ máy cơ sở dữ liệu mà D1
   dùng. Câu lệnh nào chạy ở đây thì chạy ở đó.

   ═══════════ MỖI PHÉP ĐO Ở ĐÂY LÀ MỘT CÂU HỎI VỀ AN TOÀN ═══════════

   Cửa vào là chỗ duy nhất người lạ chạm được. Nên bộ thử này không đo
   "chạy có ra kết quả không" — nó đo những chỗ mà một câu trả lời SAI
   sẽ mở ra một cánh cửa: dò được email nào đã đăng ký, dùng token của
   người khác, giữ phiên cũ sau khi đổi mật khẩu, rút khoá kho hàng
   loạt, nhận khoá của gói không được cấp.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const path = require('path');
process.chdir(path.join(__dirname, '..'));
const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');

let loi = 0;
const bao = (ok, ten, ct) => {
  if (!ok) loi++;
  console.log((ok ? '  ✓ ' : '  ✗ ') + ten + (ct ? ' — ' + ct : ''));
};

/* ═══════════════ LỚP DỰNG D1 ═══════════════
   Ba hàm, không hơn. Mỗi hàm thêm vào đây là một chỗ bộ thử có thể
   khác bản thật mà không ai biết. */
function dungD1(db) {
  return {
    prepare(sql) {
      let dv = [];
      const o = {
        bind(...a) { dv = a; return o; },
        async first() { return db.prepare(sql).get(...dv) ?? null; },
        async all()   { return {results: db.prepare(sql).all(...dv)}; },
        async run()   {
          const r = db.prepare(sql).run(...dv);
          return {meta: {changes: Number(r.changes || 0)}};
        }
      };
      return o;
    }
  };
}

(async () => {
console.log('\nTHỬ CỬA VÀO MỚI — Worker thật, D1 dựng trên node:sqlite\n');

const db = new DatabaseSync(':memory:');
db.exec(fs.readFileSync('may-chu/csdl.sql', 'utf8'));

const worker = (await import('../may-chu/worker.js')).default;
const nen    = await import('../may-chu/nen.js');

const env = {
  CSDL: dungD1(db),
  GITA_TIEU: 'tieu-thu-nghiem-khong-dung-that',
  GITA_KHOA_KHO: JSON.stringify({
    nen: 'khoa-nen', nghe: 'khoa-nghe', 'nghe-cao': 'khoa-nghe-cao',
    tang1: 'k1', tang2: 'k2', tang3: 'k3', tang4: 'k4', tang5: 'k5'
  })
};

const goi = async y => {
  const r = await worker.fetch(new Request('https://gita.test/', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(y)
  }), env);
  return {ma: r.status, than: await r.json(), tieuDe: r.headers};
};

/* ═══════════════ 1 · DỰNG TÀI KHOẢN ═══════════════ */
console.log('1 · DỰNG TÀI KHOẢN');
async function themNguoi(id, u, mk, role, opt) {
  const muoi = nen.muoiMoi();
  db.prepare('INSERT INTO users (id,username,hoTen,email,role,portal,pwSalt,pwHash,active,' +
    'createdAt,mustChangePw) VALUES (?,?,?,?,?,?,?,?,?,?,?)').run(
    id, u, 'Người ' + id, u, role, (opt && opt.portal) || 'ph',
    muoi, await nen.bamMoi(mk, muoi, env.GITA_TIEU),
    (opt && opt.active === 0) ? 0 : 1, new Date().toISOString(),
    (opt && opt.mustChangePw) ? 1 : 0);
}
/* Một tài khoản CỐ Ý còn bản băm KIỂU CŨ — để phép đo nâng bản băm ở
   mục 3 có thứ thật để nâng, chứ không nâng một bản do chính nó vừa
   dựng bằng cách mới. */
async function themNguoiBamCu(id, u, mk, role) {
  const muoi = nen.muoiMoi();
  db.prepare('INSERT INTO users (id,username,hoTen,email,role,portal,pwSalt,pwHash,active,createdAt) ' +
    'VALUES (?,?,?,?,?,?,?,?,1,?)').run(
    id, u, 'Người ' + id, u, role, 'ph', muoi,
    await nen.bamCu(mk, muoi, env.GITA_TIEU), new Date().toISOString());
}

await themNguoi('U-ph', 'phuhuynh@gita365.vn', 'MatKhauRieng2026!', 'R13');
await themNguoi('U-coach', 'coach@gita365.vn', 'MatKhauRieng2026!', 'R07', {portal: 'coach'});
await themNguoi('U-gv', 'giaovien@gita365.vn', 'MatKhauRieng2026!', 'R08', {portal: 'coach'});
await themNguoi('U-khoa', 'bikhoa@gita365.vn', 'MatKhauRieng2026!', 'R13', {active: 0});
await themNguoi('U-tam', 'mktam@gita365.vn', 'MatKhauRieng2026!', 'R13', {mustChangePw: 1});
await themNguoiBamCu('U-cu', 'bamcu@gita365.vn', 'MatKhauRieng2026!', 'R13');
db.prepare('INSERT INTO students (id,hoTen,tier,phuHuynhId,createdAt) VALUES (?,?,?,?,?)')
  .run('HV-1', 'Con nhà A', 3, 'U-ph', new Date().toISOString());
bao(db.prepare('SELECT count(*) c FROM users').get().c === 6, 'dựng 6 tài khoản thử');

/* ═══════════════ 2 · ĐĂNG NHẬP ═══════════════ */
console.log('\n2 · ĐĂNG NHẬP');
const dn = await goi({fn: 'dangNhap', u: 'phuhuynh@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(dn.than.ok && dn.than.token, 'mật khẩu đúng thì vào được', 'vai ' + dn.than.role);
bao(dn.than.tier === 3, 'trả về đúng tầng đang học, đọc từ hồ sơ học viên', 'tầng ' + dn.than.tier);
bao(dn.than.token && dn.than.token.length === 64,
  'token 32 byte ngẫu nhiên thật, không phải UUID', dn.than.token.length + ' ký tự hex');

const sai = await goi({fn: 'dangNhap', u: 'phuhuynh@gita365.vn', mk: 'sai-roi'});
const khong = await goi({fn: 'dangNhap', u: 'khongcoai@gita365.vn', mk: 'gi-cung-duoc'});
bao(!sai.than.ok && !khong.than.ok, 'sai mật khẩu và không có tài khoản đều bị từ chối');
bao(sai.than.error === khong.than.error,
  'HAI CÂU TỪ CHỐI GIỐNG HỆT NHAU — không dò được email nào đã đăng ký',
  JSON.stringify(sai.than.error));

const khoa = await goi({fn: 'dangNhap', u: 'bikhoa@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(!khoa.than.ok && khoa.than.code === 'LOCKED',
  'nhưng ĐÚNG mật khẩu thì nói thật là tài khoản đang khoá',
  'tới đây người hỏi đã chứng minh họ là chủ tài khoản');

/* ═══════════════ 3 · NÂNG BẢN BĂM, KHÔNG BẮT AI ĐẶT LẠI ═══════════════ */
console.log('\n3 · NÂNG BẢN BĂM MẬT KHẨU');
const truoc = db.prepare('SELECT pwHash FROM users WHERE id = ?').get('U-cu').pwHash;
bao(!truoc.startsWith('pbkdf2$'), 'tài khoản này đang giữ bản băm KIỂU CŨ — SHA-256 một vòng',
  truoc.slice(0, 16) + '…');
const dnCu = await goi({fn: 'dangNhap', u: 'bamcu@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(dnCu.than.ok, 'bản băm cũ vẫn đăng nhập được — không ai bị bắt đặt lại mật khẩu');
const sau = db.prepare('SELECT pwHash FROM users WHERE id = ?').get('U-cu').pwHash;
bao(sau.startsWith('pbkdf2$'), 'và bản băm được thay bằng PBKDF2 NGAY trong lượt ấy',
  sau.split('$')[1] + ' vòng');
const dnCu2 = await goi({fn: 'dangNhap', u: 'bamcu@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(dnCu2.than.ok, 'nâng xong vẫn đăng nhập được bằng đúng mật khẩu cũ');
bao(!(await goi({fn: 'dangNhap', u: 'bamcu@gita365.vn', mk: 'MatKhauRieng2027!'})).than.ok,
  'và mật khẩu sai vẫn bị từ chối sau khi nâng');

/* ═══════════════ 4 · PHIÊN ═══════════════ */
console.log('\n4 · PHIÊN');
const tk = dn.than.token;
bao((await goi({fn: 'capKhoa', token: tk, u: 'phuhuynh@gita365.vn', goi: ['nen']})).than.ok,
  'token đúng thì qua cửa');
bao((await goi({fn: 'capKhoa', token: tk, u: 'coach@gita365.vn'})).than.code === 'AUTH',
  'TÊN GỬI LÊN PHẢI KHỚP PHIÊN — không dùng được token của người khác');
bao((await goi({fn: 'capKhoa', token: 'bia-ra-mot-token', u: 'phuhuynh@gita365.vn'})).than.code === 'AUTH',
  'token bịa thì bị chặn');

db.prepare('UPDATE sessions SET exp = ? WHERE id = ?').run(Date.now() - 1000, tk);
bao((await goi({fn: 'capKhoa', token: tk, u: 'phuhuynh@gita365.vn'})).than.code === 'AUTH',
  'phiên quá hạn thì hết dùng được');
db.prepare('UPDATE sessions SET exp = ? WHERE id = ?').run(Date.now() + 3600e3, tk);

/* ═══════════════ 5 · CẤP KHOÁ ĐÚNG PHẠM VI ═══════════════ */
console.log('\n5 · CẤP KHOÁ — ĐÚNG PHẠM VI, KHÔNG HƠN');
const ckPh = (await goi({fn: 'capKhoa', token: tk, u: 'phuhuynh@gita365.vn'})).than;
bao(ckPh.ok && ckPh.phamVi.join(',') === 'nen,tang1,tang2,tang3',
  'phụ huynh tầng 3 nhận nền + tầng 1-2-3, KHÔNG có tầng 4-5',
  ckPh.phamVi.join(', '));
bao(!ckPh.khoa['tang4'] && !ckPh.khoa['tang5'] && !ckPh.khoa['nghe'],
  'và trong khoá trả về cũng không có tầng 4, tầng 5 hay gói nghề');

const ckXin = (await goi({fn: 'capKhoa', token: tk, u: 'phuhuynh@gita365.vn',
  goi: ['nen', 'tang5', 'nghe', 'nghe-cao']})).than;
bao(ckXin.phamVi.join(',') === 'nen',
  'XIN THÊM GÓI KHÔNG ĐƯỢC CẤP THÌ KHÔNG ĐƯỢC — máy chủ giao nhau với phạm vi, không tin danh sách máy khách gửi lên',
  'xin 4 gói, nhận ' + ckXin.phamVi.join(', '));

const dnC = await goi({fn: 'dangNhap', u: 'coach@gita365.vn', mk: 'MatKhauRieng2026!'});
const ckC = (await goi({fn: 'capKhoa', token: dnC.than.token, u: 'coach@gita365.vn'})).than;
bao(ckC.phamVi.indexOf('nghe-cao') >= 0, 'Coach (bậc 7) nhận được gói NGHỀ CAO — hồ sơ khách tầng 4-5');

const dnG = await goi({fn: 'dangNhap', u: 'giaovien@gita365.vn', mk: 'MatKhauRieng2026!'});
const ckG = (await goi({fn: 'capKhoa', token: dnG.than.token, u: 'giaovien@gita365.vn'})).than;
bao(ckG.phamVi.indexOf('nghe') >= 0 && ckG.phamVi.indexOf('nghe-cao') < 0,
  'Giáo viên (bậc 8) nhận gói nghề nhưng KHÔNG nhận gói nghề cao',
  'chốt của chủ hệ: tầng 4-5 chỉ từ Coach lên — ' + ckG.phamVi.join(', '));

const dnT = await goi({fn: 'dangNhap', u: 'mktam@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(dnT.than.ok && dnT.than.phaiDoiMk, 'mật khẩu tạm vẫn đăng nhập được');
bao((await goi({fn: 'capKhoa', token: dnT.than.token, u: 'mktam@gita365.vn'})).than.code === 'MUSTCHANGE',
  'nhưng mật khẩu tạm KHÔNG mở được kho — nó đã đi qua log và qua email');

/* ═══════════════ 6 · ĐỔI MẬT KHẨU ĐÁ PHIÊN KHÁC ═══════════════ */
console.log('\n6 · ĐỔI MẬT KHẨU');
const dnA = await goi({fn: 'dangNhap', u: 'coach@gita365.vn', mk: 'MatKhauRieng2026!'});
const dnB = await goi({fn: 'dangNhap', u: 'coach@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(dnA.than.token !== dnB.than.token, 'mở được hai phiên cùng lúc trên hai máy');

bao(!(await goi({fn: 'doiMatKhau', token: dnA.than.token, u: 'coach@gita365.vn',
  cu: 'sai', moi: 'MotChuoiKhacHan2026!'})).than.ok, 'sai mật khẩu cũ thì không đổi được');
bao(!(await goi({fn: 'doiMatKhau', token: dnA.than.token, u: 'coach@gita365.vn',
  cu: 'MatKhauRieng2026!', moi: 'password123'})).than.ok,
  'mật khẩu mới dễ đoán thì bị chặn ngay lần đầu');

const doi = (await goi({fn: 'doiMatKhau', token: dnA.than.token, u: 'coach@gita365.vn',
  cu: 'MatKhauRieng2026!', moi: 'MotChuoiKhacHan2026!'})).than;
bao(doi.ok, 'đổi được mật khẩu');
bao((await goi({fn: 'capKhoa', token: dnB.than.token, u: 'coach@gita365.vn'})).than.code === 'AUTH',
  'ĐỔI MẬT KHẨU ĐÁ LUÔN PHIÊN TRÊN MÁY KHÁC — kẻ giữ token cũ mất quyền ngay',
  'đá ' + doi.daPhien + ' phiên');
bao((await goi({fn: 'capKhoa', token: dnA.than.token, u: 'coach@gita365.vn'})).than.ok,
  'nhưng phiên đang dùng để đổi thì giữ lại — không tự đá mình ra');
bao((await goi({fn: 'dangNhap', u: 'coach@gita365.vn', mk: 'MotChuoiKhacHan2026!'})).than.ok &&
    !(await goi({fn: 'dangNhap', u: 'coach@gita365.vn', mk: 'MatKhauRieng2026!'})).than.ok,
  'mật khẩu mới dùng được, mật khẩu cũ hết dùng được');

/* ═══════════════ 7 · CHẶN NHỊP ═══════════════ */
console.log('\n7 · CHẶN NHỊP');
for (let i = 0; i < 12; i++)
  await goi({fn: 'dangNhap', u: 'phuhuynh@gita365.vn', mk: 'doan-thu-' + i});
const chan = await goi({fn: 'dangNhap', u: 'phuhuynh@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(!chan.than.ok && chan.than.code === 'RATE',
  'đoán liên tiếp thì bị chặn, KỂ CẢ khi gõ đúng mật khẩu ở lượt sau',
  chan.than.error);
bao(db.prepare("SELECT count(*) c FROM chanNhip WHERE khoa LIKE 'dangNhapSai%'").get().c > 0,
  'số đếm nằm trong CƠ SỞ DỮ LIỆU, không nằm trong bộ nhớ từng máy chủ',
  'Worker chạy ở hàng trăm nơi cùng lúc — đếm trong bộ nhớ thì rải đều lượt thử là qua được');

/* Đăng nhập đúng thì xoá số đếm — người gõ nhầm vài lần rồi gõ đúng
   không bị phạt tiếp ở lần sau. */
db.exec("DELETE FROM chanNhip WHERE khoa LIKE 'dangNhapSai%'");
await goi({fn: 'dangNhap', u: 'phuhuynh@gita365.vn', mk: 'sai'});
await goi({fn: 'dangNhap', u: 'phuhuynh@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(db.prepare("SELECT count(*) c FROM chanNhip WHERE khoa LIKE 'dangNhapSai%'").get().c === 0,
  'gõ đúng thì số đếm được xoá — gõ nhầm vài lần không bị phạt sang lần sau');

/* ═══════════════ 8 · VIỆC CHƯA PORT PHẢI BÁO TO ═══════════════ */
console.log('\n8 · VIỆC CHƯA CHUYỂN SANG NỀN MỚI');
const cp = (await goi({fn: 'dongBo', token: tk, u: 'phuhuynh@gita365.vn'})).than;
bao(cp.code === 'CHUAPORT', 'việc chưa port trả về mã riêng, không lẫn với "yêu cầu không hợp lệ"',
  cp.error);
const bia = (await goi({fn: 'mot-viec-khong-co-that', token: tk})).than;
bao(bia.code !== 'CHUAPORT' && !bia.ok, 'còn việc bịa ra thì vẫn là yêu cầu không hợp lệ',
  bia.error);

/* ═══════════════ 9 · KHÔNG RÒ RA NGOÀI ═══════════════ */
console.log('\n9 · KHÔNG RÒ RA NGOÀI');
const xau = {prepare(){ throw new Error('SQLITE_ERROR: no such column: users.matKhauThat'); }};
const rNo = await worker.fetch(new Request('https://gita.test/', {
  method: 'POST', headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({fn: 'dangNhap', u: 'a@b.vn', mk: 'x'})
}), {...env, CSDL: xau});
const jNo = await rNo.json();
bao(rNo.status === 500 && !/SQLITE|users\.|column/i.test(JSON.stringify(jNo)),
  'lỗi cơ sở dữ liệu KHÔNG lọt ra máy khách — tên bảng, tên cột là bản đồ cho người đi dò',
  JSON.stringify(jNo.error));

const gt = await worker.fetch(new Request('https://gita.test/', {method: 'GET'}), env);
const jGt = await gt.json();
bao(jGt.ok && jGt.daNapKhoa === 8 && !JSON.stringify(jGt).includes('khoa-nen'),
  'cửa trạng thái nói ĐÃ NẠP MẤY KHOÁ mà không trả khoá nào',
  'đã nạp ' + jGt.daNapKhoa + ' gói');

/* ═══════════════ 10 · PHÉP SOI TỰ CHỨNG MINH CHƯA CÂM ═══════════════

   Chín mục trên xanh hết. Một bộ thử chưa từng đỏ thì chưa phải bộ thử.
   Ở đây phá bằng cách truyền một hồ sơ vai KHÁC vào chính hàm tính
   phạm vi — không tráo hàm toàn cục, đúng luật đã ghi ở v9.79. */
console.log('\n10 · PHÉP SOI TỰ CHỨNG MINH CHƯA CÂM');
const pv = (await import('../may-chu/worker.js')).phamViCapPhep;
bao(pv({role: 'R13', tier: 5}).indexOf('tang5') >= 0 &&
    pv({role: 'R13', tier: 2}).indexOf('tang3') < 0,
  'đổi tầng trong hồ sơ thì phạm vi đổi theo — phép soi phạm vi không phải hằng số',
  'T5 → ' + pv({role: 'R13', tier: 5}).length + ' gói · T2 → ' + pv({role: 'R13', tier: 2}).length + ' gói');
bao(pv({role: 'R99', tier: 5}).join(',') === 'nen',
  'vai LẠ chỉ nhận phần nền — danh sách trắng, không phải danh sách cấm',
  'vai chưa tồn tại hôm nay cũng không lọt được');

console.log('');
if (loi) { console.log('✗ CÒN ' + loi + ' CHỖ CHƯA ĐẠT'); process.exit(1); }
console.log('✓ TOÀN BỘ ĐẠT — cửa vào mới chạy đúng');
})();
