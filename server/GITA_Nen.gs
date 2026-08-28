/**
 * ═══════════════════════════════════════════════════════════════
 * GITA 365 — LỚP NỀN CỦA MÁY CHỦ
 *
 * Các tệp GITA_CapPhep, GITA_MatKhau, GITA_TaiLieu, GITA_DongBo và
 * GITA_XuatSheet đều gọi tới bốn thứ: Store, readSession_, audit_ và
 * isTrue. Trước đây chúng được coi là "đã có sẵn trong dự án v6.9".
 * Nếu Học viện dựng máy chủ mới thì không có gì sẵn cả, và cả bộ đứng im.
 *
 * Tệp này dựng đủ bốn thứ đó trên MỘT bảng tính Google, để máy chủ chạy
 * được ngay từ một dự án trống. Không thuê máy, không cơ sở dữ liệu riêng,
 * dữ liệu nằm trong Drive của chính Học viện.
 *
 * ══ HAI DÒNG DUY NHẤT PHẢI SỬA ══
 * Đặt mã thư mục Drive của Học viện và địa chỉ email nhận thư hệ thống
 * ngay dưới đây. Mọi thứ còn lại chạy được mà không phải chạm vào.
 * ═══════════════════════════════════════════════════════════════
 */

var GITA_THU_MUC_DRIVE = '1pvXH45JvXXPOW9V6ObB5CR87r7gxH0fU';
var GITA_EMAIL_HE_THONG = 'typhuquanggita@gmail.com';

/** Tên bảng tính chứa toàn bộ dữ liệu. Tự tạo trong lần chạy đầu. */
var GITA_TEN_SO = 'GITA365 — Sổ dữ liệu';

/* ═══════════════ CÁC BẢNG ═══════════════
   Mỗi bảng là một trang trong bảng tính. Cột đầu luôn là id. */
var GITA_BANG = {
  users:          ['id','username','hoTen','email','dienThoai','role','portal','studentId',
                   'pwSalt','pwHash','active','createdAt','updatedAt','deletedAt','maKhachHang','boTro'],
  students:       ['id','hoTen','lop','tinh','tier','status','kpi','phuHuynhId','coach','createdAt'],
  sessions:       ['id','uid','username','role','portal','studentId','exp','createdAt'],
  dangKyCho:      ['id','email','hoTen','dienThoai','tenCon','lop','tinh','maGioiThieu',
                   'otpSalt','otpHash','otpHan','otpSai','tokenKichHoat','tokenHan','trangThai','createdAt'],
  audit:          ['id','luc','uid','username','viec','doiTuong','chiTiet'],
  hosoApp:        ['id','uid','u','role','du','luc'],
  hosoAppSaoLuu:  ['id','uid','du','luc'],
  thanhToan:      ['id','maKhachHang','tier','soTien','trangThai','nguoiDuyet','luc','ghiChu']
};

/* ═══════════════ BẬC VAI ═══════════════
   Giống hệt G.ROLES trong ứng dụng. Càng nhỏ càng nhiều quyền. */
var ROLES = {
  R01:{lv:1,  ten:'Super Admin',            portal:'admin'},
  R02:{lv:2,  ten:'Admin hệ thống',         portal:'admin'},
  R03:{lv:3,  ten:'Giám đốc hệ thống',      portal:'admin'},
  R04:{lv:4,  ten:'Quản lý chuyên môn',     portal:'admin'},
  R05:{lv:5,  ten:'Trưởng nhóm Coach',      portal:'coach'},
  R06:{lv:6,  ten:'Senior Coach',           portal:'coach'},
  R07:{lv:7,  ten:'Coach',                  portal:'coach'},
  R08:{lv:8,  ten:'Giáo viên',              portal:'coach'},
  R09:{lv:9,  ten:'Mentor',                 portal:'coach'},
  R10:{lv:10, ten:'Chuyên viên đánh giá',   portal:'coach'},
  R11:{lv:11, ten:'Tư vấn',                 portal:'tuvan'},
  R12:{lv:12, ten:'Chuyên viên phân tích',  portal:'admin'},
  R13:{lv:13, ten:'Phụ huynh',              portal:'ph'},
  R14:{lv:14, ten:'Học viên',               portal:'hs'},
  R15:{lv:15, ten:'Cộng tác viên',          portal:'ctv'}
};

/* ═══════════════ BẢNG TÍNH ═══════════════ */
function gitaSo_() {
  var P = PropertiesService.getScriptProperties();
  var id = P.getProperty('GITA_SO_ID');
  if (id) {
    try { return SpreadsheetApp.openById(id); } catch (e) { /* bị xoá — dựng lại */ }
  }
  var so = SpreadsheetApp.create(GITA_TEN_SO);
  P.setProperty('GITA_SO_ID', so.getId());
  try {
    DriveApp.getFolderById(GITA_THU_MUC_DRIVE).addFile(DriveApp.getFileById(so.getId()));
  } catch (e) { /* thư mục chưa đặt đúng — vẫn chạy được, sổ nằm ở Drive gốc */ }
  return so;
}

function gitaTrang_(ten) {
  var so = gitaSo_();
  var tr = so.getSheetByName(ten);
  if (!tr) {
    tr = so.insertSheet(ten);
    tr.appendRow(GITA_BANG[ten] || ['id']);
    tr.setFrozenRows(1);
    var mac = so.getSheetByName('Sheet1');
    if (mac && so.getSheets().length > 1) so.deleteSheet(mac);
  }
  return tr;
}

/** Dựng đủ mọi bảng. Chạy một lần sau khi dán mã. */
function dungSoDuLieu() {
  Object.keys(GITA_BANG).forEach(function (t) { gitaTrang_(t); });
  return 'Đã dựng ' + Object.keys(GITA_BANG).length + ' bảng trong "' + GITA_TEN_SO +
         '". Mở Drive để xem.';
}

/* ═══════════════ STORE ═══════════════
   Bốn hàm, đúng những gì các tệp khác gọi tới. Đọc cả trang một lần rồi
   lọc trong bộ nhớ — với quy mô vài nghìn dòng thì nhanh hơn đọc từng ô. */
var Store = (function () {
  var dem = {};   /* nhớ trong một lần chạy, không nhớ qua các lần gọi */

  function doc(bang) {
    if (dem[bang]) return dem[bang];
    var tr = gitaTrang_(bang);
    var v = tr.getDataRange().getValues();
    var cot = v.length ? v[0] : (GITA_BANG[bang] || ['id']);
    var ds = [];
    for (var i = 1; i < v.length; i++) {
      var o = {_dong: i + 1};
      for (var j = 0; j < cot.length; j++) o[cot[j]] = v[i][j];
      if (String(o.id || '').length) ds.push(o);
    }
    dem[bang] = {cot: cot, ds: ds, tr: tr};
    return dem[bang];
  }

  return {
    all: function (bang) { return doc(bang).ds.slice(); },

    find: function (bang, id) {
      var k = String(id);
      var ds = doc(bang).ds;
      for (var i = 0; i < ds.length; i++) if (String(ds[i].id) === k) return ds[i];
      return null;
    },

    insert: function (bang, ban) {
      var d = doc(bang);
      var hang = d.cot.map(function (c) { return ban[c] === undefined ? '' : ban[c]; });
      d.tr.appendRow(hang);
      ban._dong = d.tr.getLastRow();
      d.ds.push(ban);
      return ban;
    },

    update: function (bang, id, doi) {
      var d = doc(bang);
      var cu = null, k = String(id);
      for (var i = 0; i < d.ds.length; i++) if (String(d.ds[i].id) === k) { cu = d.ds[i]; break; }
      if (!cu) return null;
      Object.keys(doi).forEach(function (c) { cu[c] = doi[c]; });
      var hang = d.cot.map(function (c) { return cu[c] === undefined ? '' : cu[c]; });
      d.tr.getRange(cu._dong, 1, 1, d.cot.length).setValues([hang]);
      return cu;
    }
  };
})();

/* ═══════════════ TIỆN ═══════════════ */
function isTrue(v) {
  if (v === true) return true;
  var s = String(v == null ? '' : v).trim().toLowerCase();
  return s === 'true' || s === '1' || s === 'x' || s === 'có' || s === 'yes';
}

function gitaMaMoi_(tien) {
  return (tien || '') + Utilities.getUuid().replace(/-/g, '').slice(0, 16).toUpperCase();
}

/* Băm mật khẩu: SHA-256 trên muối riêng từng tài khoản cộng tiêu chung.
   Tiêu chung nằm trong Script Properties, không nằm trong mã. */
function gitaTieu_() {
  var P = PropertiesService.getScriptProperties();
  var t = P.getProperty('GITA_TIEU');
  if (!t) { t = Utilities.getUuid() + Utilities.getUuid(); P.setProperty('GITA_TIEU', t); }
  return t;
}

function hashPw_(mk, muoi) {
  var b = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,
    String(muoi) + '·' + String(mk) + '·' + gitaTieu_(), Utilities.Charset.UTF_8);
  return b.map(function (x) { return ('0' + (x & 0xFF).toString(16)).slice(-2); }).join('');
}

/* So sánh không rò rỉ thời gian. Với chuỗi băm thì chênh lệch nhỏ, nhưng
   đây là chỗ không có lý do gì để làm ẩu. */
function safeEqual_(a, b) {
  a = String(a || ''); b = String(b || '');
  if (a.length !== b.length) return false;
  var kh = 0;
  for (var i = 0; i < a.length; i++) kh |= (a.charCodeAt(i) ^ b.charCodeAt(i));
  return kh === 0;
}

/* ═══════════════ PHIÊN ═══════════════ */
var GITA_HAN_PHIEN_GIO = 12;

function taoPhien_(nd) {
  var id = gitaMaMoi_('S');
  var het = Date.now() + GITA_HAN_PHIEN_GIO * 3600e3;
  Store.insert('sessions', {
    id: id, uid: nd.id, username: nd.username, role: nd.role,
    portal: nd.portal || (ROLES[nd.role] || {}).portal || '',
    studentId: nd.studentId || '', exp: het, createdAt: new Date().toISOString()
  });
  return {token: id, exp: het};
}

function readSession_(token) {
  if (!token) return null;
  var s = Store.find('sessions', token);
  if (!s) return null;
  if (Number(s.exp || 0) < Date.now()) return null;
  return {uid: s.uid, username: s.username, role: s.role,
          portal: s.portal, studentId: s.studentId, exp: Number(s.exp)};
}

function xoaPhien_(token) {
  var s = Store.find('sessions', token);
  if (s) Store.update('sessions', token, {exp: 0});
}

/* ═══════════════ NHẬT KÝ ═══════════════
   Chỉ thêm, không sửa, không xoá. Đây là chỗ trả lời câu "ai đã làm gì". */
function audit_(phien, viec, doiTuong, chiTiet) {
  try {
    Store.insert('audit', {
      id: gitaMaMoi_('A'), luc: new Date().toISOString(),
      uid: (phien && phien.uid) || '', username: (phien && phien.username) || '',
      viec: viec || '', doiTuong: String(doiTuong || '').slice(0, 200),
      chiTiet: String(chiTiet || '').slice(0, 500)
    });
  } catch (e) { Logger.log('audit lỗi: ' + e.message); }
}

/* ═══════════════ ĐĂNG NHẬP ═══════════════ */
function gitaDangNhap_(y) {
  var u = String(y.u || '').trim().toLowerCase();
  var mk = String(y.mk || '');
  if (!u || !mk) return {ok: false, error: 'Thiếu tên đăng nhập hoặc mật khẩu.'};

  var nd = Store.all('users').filter(function (x) {
    return String(x.username || '').toLowerCase() === u ||
           String(x.email || '').toLowerCase() === u;
  })[0];

  /* Trả lời giống nhau cho "không có tài khoản" và "sai mật khẩu" — không
     để ai dò xem email nào đã đăng ký. */
  var chung = {ok: false, error: 'Tên đăng nhập hoặc mật khẩu chưa đúng.'};
  if (!nd) return chung;
  if (!isTrue(nd.active) || nd.deletedAt) return {ok: false, error: 'Tài khoản đang bị khoá.'};
  if (!safeEqual_(hashPw_(mk, nd.pwSalt), nd.pwHash)) {
    audit_({uid: nd.id, username: nd.username}, 'DANG_NHAP_SAI', nd.username, '');
    return chung;
  }

  var p = taoPhien_(nd);
  audit_({uid: nd.id, username: nd.username}, 'DANG_NHAP', nd.username, '');
  return {ok: true, token: p.token, hetHan: new Date(p.exp).toISOString(),
    hoSo: {u: nd.username, ten: nd.hoTen, role: nd.role,
           portal: nd.portal || (ROLES[nd.role] || {}).portal || '',
           maKhachHang: nd.maKhachHang || ''}};
}

function gitaDangXuat_(y) {
  if (y && y.token) xoaPhien_(y.token);
  return {ok: true};
}

/* ═══════════════ TÀI KHOẢN KHỞI ĐẦU ═══════════════
   Chạy MỘT LẦN sau khi dựng sổ. Tạo tài khoản Super Admin theo đúng
   thông tin anh Quang đặt. Đổi mật khẩu ngay trong lần đăng nhập đầu. */
function taoTaiKhoanKhoiDau() {
  var co = Store.all('users').filter(function (x) {
    return String(x.username || '').toLowerCase() === 'admin@gita365';
  })[0];
  if (co) return 'Tài khoản Admin@gita365 đã có rồi — không tạo lại.';

  var muoi = Utilities.getUuid();
  Store.insert('users', {
    id: gitaMaMoi_('U'), username: 'Admin@gita365', hoTen: 'Trương Nhật Quang',
    email: GITA_EMAIL_HE_THONG, dienThoai: '0855554688',
    role: 'R01', portal: 'admin', studentId: '',
    pwSalt: muoi, pwHash: hashPw_('@toiyeugita365#', muoi),
    active: 'TRUE', createdAt: new Date().toISOString(), updatedAt: '', deletedAt: '',
    maKhachHang: 'GITA-0001', boTro: ''
  });
  return 'Đã tạo Admin@gita365. ĐỔI MẬT KHẨU NGAY trong lần đăng nhập đầu tiên.';
}

/** Dựng cả máy chủ trong một nút bấm: sổ dữ liệu + tài khoản đầu tiên. */
function caiDatLanDau() {
  var a = dungSoDuLieu();
  var b = taoTaiKhoanKhoiDau();
  return a + '\n' + b + '\nCòn một việc: dán kho/khoa.json vào napBoKhoaMotLan rồi chạy hàm đó.';
}
