/**
 * ═══════════════════════════════════════════════════════════════════════
 *  GITA 365 — MÁY CHỦ  ·  TOÀN BỘ TRONG MỘT TỆP
 *  Học viện GITA · Trương Nhật Quang · 08.5555.4688
 * ═══════════════════════════════════════════════════════════════════════
 *
 *  Bảy phần mã của máy chủ gộp lại một chỗ, để dán MỘT LẦN thay vì bảy lần.
 *  Nội dung y hệt bảy tệp trong thư mục server/ của kho mã — không cắt bớt.
 *
 *  ── KHÔNG CÓ MẬT KHẨU NÀO TRONG TỆP NÀY ──
 *  Mã nguồn đi qua kho mã, qua tin nhắn, qua email, qua màn hình người khác
 *  nhìn thấy. Một mật khẩu đặt cứng trong mã là mật khẩu đã lộ từ dòng đầu
 *  tiên nó được viết ra. Nên máy chủ tự sinh mật khẩu tạm khi cài đặt, hiện
 *  một lần trong log, gửi kèm một thư, rồi KHÔNG mở kho cho tới khi mật khẩu
 *  ấy được đổi.
 *
 *  ── LÀM THEO ĐÚNG BỐN BƯỚC ──
 *
 *  1. Vào script.google.com bằng tài khoản Google của Học viện.
 *     New project → đổi tên thành GITA 365 → xoá hết nội dung Code.gs
 *     → dán TOÀN BỘ tệp này vào.
 *
 *  2. Kiểm hai dòng ngay dưới đây. Sai thì sổ dữ liệu nằm nhầm chỗ.
 *
 *  3. Chọn hàm  caiDatLanDau  → Run.
 *     Google hỏi quyền ở lần đầu: Review permissions → chọn tài khoản →
 *     Advanced → Go to GITA 365 (unsafe) → Allow.
 *     ("unsafe" chỉ nghĩa là dự án chưa qua kiểm duyệt của Google.
 *      Đây là mã của chính Học viện.)
 *
 *     Log sẽ hiện MẬT KHẨU TẠM của Admin@gita365. Chép ngay — nó không hiện
 *     lại lần thứ hai. Một bản cũng được gửi tới email hệ thống.
 *     Lỡ mất thì chạy hàm  datLaiMatKhauSuperAdmin  để sinh mật khẩu mới.
 *
 *  4. Thêm một tệp mã nữa tên GITA_NapKhoa, dán nội dung tệp bộ khoá,
 *     chọn hàm  napBoKhoaMotLan  → Run → log báo "Đã nạp 7 khoá"
 *     → XOÁ tệp GITA_NapKhoa khỏi dự án ngay lập tức.
 *
 *  Rồi triển khai:
 *     Deploy → New deployment → bánh răng → Web app
 *        Execute as      : Me
 *        Who has access  : Anyone
 *     → Deploy → chép địa chỉ kết thúc bằng /exec
 *
 *  Cuối cùng, trong ứng dụng GITA 365: đăng nhập Super Admin →
 *  Quản trị trang → Nối máy chủ → dán địa chỉ → Lưu → Gọi thử.
 *
 *  Lần đăng nhập đầu, ứng dụng sẽ đưa thẳng tới màn đổi mật khẩu. Kho chỉ
 *  mở sau khi đổi xong — đây là chặn thật ở máy chủ, không phải lời nhắc.
 *
 *  Hướng dẫn đầy đủ, kể cả phần xử lý khi có trục trặc: docs/MAY_CHU.md
 * ═══════════════════════════════════════════════════════════════════════
 */


/* ═══════════════════════════════════════════════════════════════════════
   LỚP NỀN — bảng dữ liệu, phiên, băm mật khẩu, nhật ký, đăng nhập
   (nguyên văn server/GITA_Nen.gs)
   ═══════════════════════════════════════════════════════════════════════ */

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

var GITA_THU_MUC_DRIVE = '1pvXH45JvXXPOW9V6ObB5CR87r7gxH0fU';   /* Dữ Liệu GITA365 — sổ dữ liệu nằm ở đây */
var GITA_THU_MUC_MA    = '1jVOnIH7286glI95fC4aqfXApecxEj7Xz';   /* Mã máy chủ GITA365 — mã và hướng dẫn */
var GITA_EMAIL_HE_THONG = 'typhuquanggita@gmail.com';

/** Tên bảng tính chứa toàn bộ dữ liệu. Tự tạo trong lần chạy đầu. */
var GITA_TEN_SO = 'GITA365 — Sổ dữ liệu';

/* ═══════════════ CÁC BẢNG ═══════════════
   Mỗi bảng là một trang trong bảng tính. Cột đầu luôn là id. */
var GITA_BANG = {
  users:          ['id','username','hoTen','email','dienThoai','role','portal','studentId',
                   'pwSalt','pwHash','active','createdAt','updatedAt','deletedAt','maKhachHang','boTro',
                   'mustChangePw','pwDoiLuc'],
  students:       ['id','hoTen','lop','tinh','tier','status','kpi','phuHuynhId','coach','createdAt'],
  sessions:       ['id','uid','username','role','portal','studentId','exp','createdAt'],
  dangKyCho:      ['id','email','hoTen','dienThoai','tenCon','lop','tinh','maGioiThieu',
                   'otpSalt','otpHash','otpHan','otpSai','tokenKichHoat','tokenHan','trangThai','createdAt'],
  audit:          ['id','luc','uid','username','viec','doiTuong','chiTiet'],
  hosoApp:        ['id','uid','u','role','duLieu','moc','taoLuc','suaLuc'],
  hosoAppSaoLuu:  ['id','uid','duLieu','luc'],
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
    /* Cờ này để ứng dụng đưa thẳng người dùng tới màn đổi mật khẩu.
       Máy chủ không trông chờ ứng dụng nghe lời: nó chặn cấp khoá ở phía
       mình. Cờ chỉ để người dùng biết vì sao kho chưa mở. */
    phaiDoiMk: isTrue(nd.mustChangePw),
    hoSo: {u: nd.username, ten: nd.hoTen, role: nd.role,
           portal: nd.portal || (ROLES[nd.role] || {}).portal || '',
           maKhachHang: nd.maKhachHang || ''}};
}

function gitaDangXuat_(y) {
  if (y && y.token) xoaPhien_(y.token);
  return {ok: true};
}

/* ═══════════════ TÀI KHOẢN KHỞI ĐẦU ═══════════════

   Không có mật khẩu nào nằm sẵn trong tệp này.

   Lý do: mã nguồn đi qua kho mã, qua tin nhắn, qua email, qua màn hình
   người khác nhìn thấy. Một mật khẩu đặt cứng trong mã là mật khẩu đã lộ
   kể từ dòng đầu tiên nó được viết ra.

   Thay vào đó, máy chủ tự sinh một mật khẩu ngẫu nhiên khi cài đặt, hiện
   MỘT LẦN trong log của người đang chạy hàm, và gửi kèm một thư về địa chỉ
   hệ thống. Sau đó máy chủ KHÔNG mở kho cho tài khoản ấy cho tới khi mật
   khẩu được đổi — không phải nhắc nhở, mà chặn thật. */

/* Bốn mươi âm tiết dễ đọc, dễ chép lại đúng. Không dấu để khỏi lỗi gõ, và
   mỗi âm tiết ít nhất ba chữ cái — âm tiết một chữ đọc lên nghe không ra
   tiếng, chép qua điện thoại hay sót. */
var GITA_TU_MK = ['binh','yen','nha','tam','sang','vung','ben','minh','tue',
  'kien','tri','nhan','hoa','tho','lang','xanh','bien','nui','song','gio',
  'mua','nang','trang','sao','lua','mam','than','canh','qua','hat',
  'duong','loi','cau','buoc','nhip','vong','tay','long','luc','hanh'];

/**
 * Sinh mật khẩu tạm: năm âm tiết viết hoa chữ đầu, nối bằng gạch, thêm bốn số.
 * Ví dụ: Binh-Yen-Kien-Tri-Vung-4827
 * Bốn mươi âm tiết chọn năm lần, thêm bốn chữ số: hơn một nghìn tỉ khả năng.
 * Thừa cho một mật khẩu chỉ sống tới lần đăng nhập đầu tiên, mà vẫn chép tay
 * lại được không sai.
 */
function gitaMatKhauTam_() {
  var ra = [];
  for (var i = 0; i < 5; i++) {
    var t = GITA_TU_MK[Math.floor(Math.random() * GITA_TU_MK.length)];
    ra.push(t.charAt(0).toUpperCase() + t.slice(1));
  }
  var so = '';
  for (var j = 0; j < 4; j++) so += Math.floor(Math.random() * 10);
  return ra.join('-') + '-' + so;
}

/**
 * Tạo tài khoản Super Admin. Chạy một lần, sau khi dựng sổ dữ liệu.
 * Trả về mật khẩu tạm — đây là lần duy nhất nó hiện ra.
 */
function taoTaiKhoanKhoiDau() {
  var co = Store.all('users').filter(function (x) {
    return String(x.username || '').toLowerCase() === 'admin@gita365';
  })[0];
  if (co) return 'Tài khoản Admin@gita365 đã có rồi — không tạo lại.\n' +
    'Quên mật khẩu thì chạy hàm datLaiMatKhauSuperAdmin.';

  var mkTam = gitaMatKhauTam_();
  var muoi = Utilities.getUuid();
  Store.insert('users', {
    id: gitaMaMoi_('U'), username: 'Admin@gita365', hoTen: 'Trương Nhật Quang',
    email: GITA_EMAIL_HE_THONG, dienThoai: '0855554688',
    role: 'R01', portal: 'admin', studentId: '',
    pwSalt: muoi, pwHash: hashPw_(mkTam, muoi),
    active: 'TRUE', createdAt: new Date().toISOString(), updatedAt: '', deletedAt: '',
    maKhachHang: 'GITA-0001', boTro: '',
    mustChangePw: 'TRUE', pwDoiLuc: ''
  });

  gitaGuiThuMatKhauTam_('Admin@gita365', mkTam, 'Tài khoản Super Admin vừa được tạo.');
  audit_(null, 'TAO_SUPER_ADMIN', 'Admin@gita365', 'Mật khẩu tạm sinh ngẫu nhiên, bắt buộc đổi');

  return 'Đã tạo Admin@gita365.\n' +
    '  Mật khẩu tạm: ' + mkTam + '\n' +
    '  Chép ngay — dòng này không hiện lại lần thứ hai.\n' +
    '  Một bản đã gửi tới ' + GITA_EMAIL_HE_THONG + '.\n' +
    '  Máy chủ KHÔNG mở kho cho tài khoản này cho tới khi mật khẩu được đổi.';
}

/** Đặt lại mật khẩu Super Admin khi lỡ mất. Chạy trong Apps Script, không qua mạng. */
function datLaiMatKhauSuperAdmin() {
  var nd = Store.all('users').filter(function (x) {
    return String(x.username || '').toLowerCase() === 'admin@gita365';
  })[0];
  if (!nd) return 'Chưa có tài khoản Admin@gita365. Chạy caiDatLanDau trước.';

  var mkTam = gitaMatKhauTam_();
  var muoi = Utilities.getUuid();
  Store.update('users', nd.id, {
    pwSalt: muoi, pwHash: hashPw_(mkTam, muoi),
    mustChangePw: 'TRUE', pwDoiLuc: '', updatedAt: new Date().toISOString()
  });
  gitaGuiThuMatKhauTam_('Admin@gita365', mkTam, 'Mật khẩu Super Admin vừa được đặt lại từ Apps Script.');
  audit_(null, 'DAT_LAI_SUPER_ADMIN', 'Admin@gita365', 'Đặt lại trực tiếp trong Apps Script');

  return 'Đã đặt lại mật khẩu Admin@gita365.\n' +
    '  Mật khẩu tạm: ' + mkTam + '\n' +
    '  Chép ngay. Một bản đã gửi tới ' + GITA_EMAIL_HE_THONG + '.';
}

function gitaGuiThuMatKhauTam_(u, mk, dan) {
  try {
    MailApp.sendEmail(GITA_EMAIL_HE_THONG, 'GITA 365 — mật khẩu tạm của ' + u,
      dan + '\n\n' +
      'Tên đăng nhập : ' + u + '\n' +
      'Mật khẩu tạm  : ' + mk + '\n\n' +
      'Mật khẩu này chỉ dùng cho lần đăng nhập đầu tiên. Máy chủ không mở kho\n' +
      'cho tài khoản này cho tới khi anh chị đổi sang mật khẩu của riêng mình.\n\n' +
      'Nếu không phải anh chị vừa chạy cài đặt, hãy chạy lại hàm\n' +
      'datLaiMatKhauSuperAdmin trong Apps Script ngay.\n\n' +
      'Học viện GITA · 08.5555.4688');
  } catch (e) { /* chưa cấp quyền gửi thư — mật khẩu vẫn hiện trong log */ }
}

/** Dựng cả máy chủ trong một nút bấm: sổ dữ liệu + tài khoản đầu tiên. */
function caiDatLanDau() {
  var a = dungSoDuLieu();
  var b = taoTaiKhoanKhoiDau();
  /* Kiểm quyền ngay trong lần cài đặt. Biết sớm một thư mục không ghi được
     thì hơn là biết lúc phụ huynh đầu tiên gửi tài liệu lên và tệp mất tăm. */
  var c = kiemTraQuyenDrive();
  return a + '\n\n' + b + '\n\n' + c +
    '\n\nCòn một việc: dán bộ khoá vào napBoKhoaMotLan rồi chạy hàm đó.';
}

/* ═══════════════ MẬT KHẨU ═══════════════
   Bốn hàm mà GITA_MatKhau.gs gọi tới. Trước đây chúng được coi là "đã có
   sẵn trong 02_Security.gs của v6.9". Dựng máy chủ mới thì không có gì
   sẵn cả — nên chúng nằm ở đây. */

/** Muối mới cho một lần đặt mật khẩu. */
function newSalt_() { return Utilities.getUuid(); }

/**
 * Độ mạnh mật khẩu. Trả về true nếu đạt, hoặc một câu nói rõ thiếu gì.
 * Không đòi ký tự đặc biệt cho đủ lệ: độ dài mới là thứ thật sự chặn được
 * dò mật khẩu, nên mức sàn đặt ở 10 ký tự.
 */
function checkPwStrength_(mk) {
  mk = String(mk || '');
  if (mk.length < 10) return 'Mật khẩu cần ít nhất 10 ký tự.';
  if (!/[a-zA-Z]/.test(mk)) return 'Mật khẩu cần ít nhất một chữ cái.';
  if (!/[0-9]/.test(mk))    return 'Mật khẩu cần ít nhất một chữ số.';
  if (/^(.)\1+$/.test(mk))  return 'Mật khẩu không được là một ký tự lặp lại.';

  var de = ['123456789', 'password', 'matkhau', 'qwerty', 'abc123', 'gita365', '111111'];
  var t = mk.toLowerCase();
  for (var i = 0; i < de.length; i++)
    if (t.indexOf(de[i]) >= 0) return 'Mật khẩu chứa chuỗi quá dễ đoán.';

  return true;
}

/** Đóng một phiên. Dùng sau khi đổi mật khẩu — buộc đăng nhập lại. */
function closeSession_(token) {
  if (!token) return;
  try { xoaPhien_(token); } catch (e) {}
}

/** Xoá bộ đếm đăng nhập sai của một tài khoản, sau khi đặt lại mật khẩu. */
function clearFail_(u) {
  try {
    CacheService.getScriptCache().remove('DANGNHAP_SAI_' + String(u).toLowerCase());
  } catch (e) {}
}

/* ═══════════════ XÁC NHẬN QUYỀN VÀO DRIVE ═══════════════

   Khi bấm Allow trên màn xin quyền của Google, người ta chỉ biết mình vừa
   đồng ý điều gì đó. Không ai biết máy chủ có thật sự ghi được vào đúng
   thư mục của Học viện hay không — cho tới lúc một phụ huynh gửi tài liệu
   lên và tệp biến mất.

   Mục này trả lời trước câu đó. Nó không đọc cấu hình rồi báo "ổn". Nó
   thử thật: mở từng thư mục, tạo một tệp dấu, đọc lại, rồi xoá đi. Thư mục
   nào không vào được thì nói rõ thư mục nào và vì sao.

   Chạy được hai đường:
     · trong Apps Script — chọn hàm kiemTraQuyenDrive rồi Run
     · từ ứng dụng — màn Nối máy chủ, nút "Kiểm quyền Drive" (R01–R02) */

var GITA_THU_MUC_CAN = [
  {ma: 'GITA_THU_MUC_DRIVE',   ten: 'Dữ Liệu GITA365',
   viec: 'Sổ dữ liệu: tài khoản, học viên, phiên, nhật ký, thanh toán'},
  {ma: 'GITA_THU_MUC_TAILIEU', ten: 'Thư mục nhận tài liệu',
   viec: 'Tài liệu và ảnh đội ngũ gửi lên, minh chứng nhiệm vụ của gia đình'},
  {ma: 'GITA_THU_MUC_XUAT',    ten: 'Thư mục xuất bảng tính',
   viec: 'Google Sheet do cấp quản lý xuất ra'},
  {ma: 'GITA_THU_MUC_MA',      ten: 'Mã máy chủ GITA365',
   viec: 'Mã nguồn và hướng dẫn dựng máy chủ'}
];

function gitaIdThuMuc_(ma) {
  /* Ba hằng kia nằm ở tệp khác. Đọc qua this để không nổ khi thiếu tệp nào. */
  try {
    if (ma === 'GITA_THU_MUC_DRIVE')   return GITA_THU_MUC_DRIVE;
    if (ma === 'GITA_THU_MUC_MA')      return GITA_THU_MUC_MA;
    if (ma === 'GITA_THU_MUC_TAILIEU') return GITA_THU_MUC_TAILIEU;
    if (ma === 'GITA_THU_MUC_XUAT')    return GITA_THU_MUC_XUAT;
  } catch (e) { return ''; }
  return '';
}

/** Thử một thư mục: mở được chưa, ghi được chưa, xoá lại được chưa. */
function gitaThuMotThuMuc_(id) {
  var kq = {id: id, moDuoc: false, ten: '', ghiDuoc: false, xoaDuoc: false, loi: ''};
  if (!id) { kq.loi = 'Chưa đặt mã thư mục.'; return kq; }

  var tm;
  try { tm = DriveApp.getFolderById(id); kq.ten = tm.getName(); kq.moDuoc = true; }
  catch (e) {
    kq.loi = 'Không mở được. Hoặc mã thư mục sai, hoặc tài khoản đang chạy ' +
             'Apps Script không có quyền vào thư mục này.';
    return kq;
  }

  var tep = null;
  try {
    tep = tm.createFile('GITA365_kiem_quyen_' + Date.now() + '.txt',
      'Tệp dấu do máy chủ GITA 365 tạo để kiểm quyền ghi. Xoá ngay sau khi kiểm.',
      MimeType.PLAIN_TEXT);
    kq.ghiDuoc = true;
  } catch (e) {
    kq.loi = 'Mở được nhưng KHÔNG ghi được. Tài khoản chỉ có quyền xem — ' +
             'cần quyền Người chỉnh sửa trên thư mục này.';
    return kq;
  }

  try { tep.setTrashed(true); kq.xoaDuoc = true; }
  catch (e) { kq.loi = 'Ghi được nhưng không xoá được tệp dấu. Xoá tay trong Drive.'; }

  return kq;
}

/**
 * Kiểm cả bốn thư mục. Trả về một bảng đọc được, và ghi vào nhật ký.
 * Chạy lại bất cứ lúc nào — nó không đụng vào dữ liệu, chỉ tạo rồi xoá
 * một tệp dấu trong mỗi thư mục.
 */
function kiemTraQuyenDrive() {
  var ds = [], dat = 0;
  GITA_THU_MUC_CAN.forEach(function (t) {
    var r = gitaThuMotThuMuc_(gitaIdThuMuc_(t.ma));
    r.nhan = t.ten; r.viec = t.viec; r.hang = t.ma;
    r.dat = r.moDuoc && r.ghiDuoc;
    if (r.dat) dat++;
    ds.push(r);
  });

  var ai = '';
  try { ai = Session.getEffectiveUser().getEmail(); } catch (e) { ai = '(chưa đọc được)'; }

  var dong = ['XÁC NHẬN QUYỀN VÀO DRIVE',
    'Máy chủ đang chạy dưới tài khoản: ' + ai,
    'Đạt ' + dat + '/' + ds.length + ' thư mục.', ''];

  ds.forEach(function (r) {
    dong.push((r.dat ? '  ✓ ' : '  ✗ ') + r.nhan + '  ·  ' + (r.ten || '(không mở được)'));
    dong.push('      ' + r.viec);
    dong.push('      mã ' + (r.id || '(trống)') +
      '  ·  mở ' + (r.moDuoc ? 'được' : 'KHÔNG') +
      '  ·  ghi ' + (r.ghiDuoc ? 'được' : 'KHÔNG') +
      '  ·  dọn ' + (r.xoaDuoc ? 'được' : 'KHÔNG'));
    if (r.loi) dong.push('      → ' + r.loi);
    dong.push('');
  });

  if (dat < ds.length) {
    dong.push('CÁCH SỬA');
    dong.push('  · Mã thư mục là phần sau /folders/ trong địa chỉ Drive.');
    dong.push('  · Thư mục phải thuộc chính tài khoản đang chạy Apps Script,');
    dong.push('    hoặc được chia sẻ cho tài khoản đó ở mức Người chỉnh sửa.');
    dong.push('  · Sửa xong thì chạy lại hàm này. Không cần triển khai lại.');
  } else {
    dong.push('Cả bốn thư mục đều mở được và ghi được. Tệp dấu đã dọn sạch.');
  }

  var thongDiep = dong.join('\n');
  audit_(null, 'KIEM_QUYEN_DRIVE', ai, 'Đạt ' + dat + '/' + ds.length + ' thư mục');
  Logger.log(thongDiep);
  return thongDiep;
}

/** Bản cho ứng dụng gọi qua doPost. Chỉ Super Admin và Admin hệ thống. */
function gitaKiemDrive_(y, hoSo) {
  var lv = (ROLES[hoSo.role] || {lv: 99}).lv;
  if (lv > 2) return {ok: false, error: 'Chỉ Super Admin và Admin hệ thống kiểm được quyền Drive.'};

  var ds = [], dat = 0;
  GITA_THU_MUC_CAN.forEach(function (t) {
    var r = gitaThuMotThuMuc_(gitaIdThuMuc_(t.ma));
    r.nhan = t.ten; r.viec = t.viec;
    r.dat = r.moDuoc && r.ghiDuoc;
    if (r.dat) dat++;
    ds.push(r);
  });

  var ai = '';
  try { ai = Session.getEffectiveUser().getEmail(); } catch (e) {}
  audit_(hoSo.phien, 'KIEM_QUYEN_DRIVE', ai, 'Đạt ' + dat + '/' + ds.length + ' thư mục');
  return {ok: true, taiKhoan: ai, dat: dat, tong: ds.length, thuMuc: ds};
}

/* ═══════════════ MỤC LỤC HÀM ═══════════════
   Chạy hàm này khi quên tên hàm nào làm việc gì. Không đụng vào dữ liệu. */
function mucLucHam() {
  var b = [
    ['caiDatLanDau',             'Dựng sổ dữ liệu + tạo Super Admin. Chạy MỘT LẦN đầu tiên.'],
    ['kiemTraQuyenDrive',        'Thử thật quyền vào bốn thư mục Drive. Chạy lại bất cứ lúc nào.'],
    ['napBoKhoaMotLan',          'Nạp bộ khoá mở kho. Chạy một lần, rồi xoá tệp chứa khoá.'],
    ['datLaiMatKhauSuperAdmin',  'Sinh mật khẩu tạm mới cho Admin@gita365 khi lỡ mất.'],
    ['dungSoDuLieu',             'Dựng lại các bảng còn thiếu. caiDatLanDau đã gọi sẵn.'],
    ['taoTaiKhoanKhoiDau',       'Tạo riêng tài khoản Super Admin. caiDatLanDau đã gọi sẵn.'],
    ['mucLucHam',                'Chính bảng anh chị đang đọc.']
  ];
  var ra = ['BẢNG HÀM CHẠY TAY TRONG APPS SCRIPT', ''];
  b.forEach(function (x) { ra.push('  ' + x[0] + Array(30 - x[0].length).join(' ') + x[1]); });
  ra.push('');
  ra.push('Mọi việc khác đi qua doPost — ứng dụng gọi, không chạy tay ở đây.');
  var t = ra.join('\n');
  Logger.log(t);
  return t;
}


/* ═══════════════════════════════════════════════════════════════════════
   CẤP PHÉP — doPost, cửa vào duy nhất, và việc cấp khoá mở kho
   (nguyên văn server/GITA_CapPhep.gs)
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * ═══════════════════════════════════════════════════════════════
 * GITA 365 — MÁY CHỦ CẤP PHÉP
 * Dán vào dự án Apps Script của GITA 365 (cùng chỗ 00_Config.gs).
 *
 * Việc duy nhất của tệp này: sau khi tài khoản đăng nhập hợp lệ, trả về
 * ĐÚNG những khoá giải mã mà vai và tầng của tài khoản đó được cấp phép —
 * không hơn một khoá nào.
 *
 * Khoá lấy từ kho/khoa.json (do tools/ma-hoa-kho.js sinh ra) và được nạp
 * vào Script Properties. KHÔNG dán khoá vào mã nguồn.
 * ═══════════════════════════════════════════════════════════════
 */

/** Nạp bộ khoá một lần sau khi mã hoá kho. Dán nội dung kho/khoa.json vào. */
function napBoKhoaMotLan() {
  var khoa = {
    // "nen":   "…", "nghe": "…", "tang1": "…", …
  };
  if (!Object.keys(khoa).length) throw new Error('Chưa dán nội dung kho/khoa.json vào hàm này.');
  PropertiesService.getScriptProperties().setProperty('GITA_KHOA_KHO', JSON.stringify(khoa));
  return 'Đã nạp ' + Object.keys(khoa).length + ' khoá. Xoá nội dung khoá khỏi hàm này ngay sau khi chạy.';
}

/** Hạn dùng của một lần cấp khoá (giờ). Hết hạn thì client phải xin lại. */
var GITA_HAN_KHOA_GIO = 12;

/**
 * Phạm vi cấp phép — nguồn sự thật duy nhất.
 * lv lấy từ ROLES trong 00_Config.gs: càng nhỏ càng nhiều quyền.
 */
function gitaPhamViCapPhep(hoSo) {
  var ds = ['nen'];                        // mọi tài khoản đã đăng nhập
  var lv = (ROLES[hoSo.role] || { lv: 99 }).lv;

  if (lv <= 11) {                           // tư vấn, coach, quản lý, quản trị
    ds.push('nghe');
    for (var i = 1; i <= 5; i++) ds.push('tang' + i);
    return ds;
  }
  if (lv === 15) return ds;                 // CTV giới thiệu: chỉ phần nền

  // Phụ huynh và học viên: chỉ tầng đang học và các tầng đã đi qua.
  // Chưa gắn hồ sơ học viên hoặc chưa vào tầng nào thì chỉ có phần nền.
  var tang = Number(hoSo.tier || 0);
  if (!(tang >= 1)) return ds;
  for (var j = 1; j <= Math.min(5, tang); j++) ds.push('tang' + j);
  return ds;
}

/* ═══════════════ CHỐNG XIN KHOÁ HÀNG LOẠT ═══════════════
   Một tài khoản hợp lệ vẫn có thể bị dùng để rút khoá liên tục từ nhiều
   máy. Mỗi tài khoản chỉ được cấp khoá một số lần giới hạn trong mỗi giờ. */
var GITA_TRAN_XIN_KHOA_GIO = 12;

function gitaDemXinKhoa_(u) {
  var kho = CacheService.getScriptCache();
  var k = 'CAPKHOA_' + String(u).toLowerCase();
  var n = Number(kho.get(k) || 0) + 1;
  kho.put(k, String(n), 3600);
  return n;
}

/**
 * Điểm vào của client. Gọi bằng POST tới URL triển khai của Web App.
 * Thân yêu cầu: {"fn":"capKhoa","u":"…","token":"…","goi":[…],"may":"…"}
 */
function doPost(e) {
  var ra = function (o) {
    return ContentService.createTextOutput(JSON.stringify(o))
      .setMimeType(ContentService.MimeType.JSON);
  };
  try {
    var y = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    /* ── Những việc KHÔNG cần phiên ──
       Đăng nhập, đăng ký và lấy lại mật khẩu đều xảy ra TRƯỚC khi có phiên,
       nên không thể đòi phiên ở đây. Mỗi hàm tự lo phần chặt của mình:
       đếm số lần sai, băm mã, và không bao giờ tiết lộ email nào đã đăng ký. */
    if (y.fn === 'dangNhap')      return ra(gitaDangNhap_(y));
    if (y.fn === 'dangXuat')      return ra(gitaDangXuat_(y));
    if (y.fn === 'quenMatKhau')   return ra(gitaQuenMatKhau_(y));
    if (y.fn === 'datLaiMatKhau') return ra(gitaDatLaiMatKhau_(y));
    if (y.fn === 'kiemBanMoi')    return ra(gitaKiemBanMoi_(y));
    if (y.fn === 'dangKy')        return ra(gitaDangKy_(y));
    if (y.fn === 'guiLaiOtp')     return ra(gitaGuiLaiOtp_(y));
    if (y.fn === 'xacThucOtp')    return ra(gitaXacThucOtp_(y));
    if (y.fn === 'kichHoat')      return ra(gitaKichHoat_(y));

    var VIEC = ['capKhoa', 'xuatSheet', 'dongBo', 'doiMatKhau', 'napTaiLieu', 'duyetTaiLieu',
                'nangTang', 'kiemDrive'];
    if (VIEC.indexOf(y.fn) < 0) return ra({ ok: false, error: 'Yêu cầu không hợp lệ.' });

    // 1. Xác thực phiên — dùng đúng lớp bảo mật sẵn có của hệ thống
    var hoSo = kiemTraPhien_(y.token, y.u);
    if (!hoSo) return ra({ ok: false, code: 'AUTH', error: 'Phiên không hợp lệ hoặc đã hết hạn.' });
    if (hoSo.khoa) return ra({ ok: false, code: 'LOCKED', error: 'Tài khoản đang bị khoá.' });

    /* ── Ba việc cần phiên hợp lệ, xử lý ở tệp riêng ── */
    if (y.fn === 'xuatSheet')   return ra(gitaXuatSheet_(y, hoSo));
    if (y.fn === 'dongBo')      return ra(gitaDongBo_(y, hoSo));
    if (y.fn === 'doiMatKhau')  return ra(gitaDoiMatKhau_(y, hoSo));
    if (y.fn === 'napTaiLieu')  return ra(gitaNapTaiLieu_(y, hoSo));
    if (y.fn === 'duyetTaiLieu')return ra(gitaDuyetTaiLieu_(y, hoSo));
    if (y.fn === 'nangTang')    return ra(gitaNangTang_(y, hoSo));
    if (y.fn === 'kiemDrive')   return ra(gitaKiemDrive_(y, hoSo));

    // 2. Mật khẩu tạm chưa đổi thì không mở kho
    if (hoSo.phaiDoiMk) {
      ghiNhatKy_({ viec: 'CAP_KHOA_CHAN', u: hoSo.u, role: hoSo.role, tier: hoSo.tier,
        goi: '', may: String(y.may || '').slice(0, 120), phien: hoSo.phien,
        chiTiet: 'Mật khẩu tạm chưa đổi' });
      return ra({ ok: false, code: 'MUSTCHANGE',
        error: 'Tài khoản đang dùng mật khẩu tạm do máy sinh ra. ' +
               'Đổi sang mật khẩu của riêng anh chị rồi kho mới mở.' });
    }

    // 3. Chặn rút khoá hàng loạt
    var soLan = gitaDemXinKhoa_(hoSo.u);
    if (soLan > GITA_TRAN_XIN_KHOA_GIO) {
      ghiNhatKy_({ viec: 'CAP_KHOA_CHAN', u: hoSo.u, role: hoSo.role, tier: hoSo.tier,
        goi: '', may: String(y.may || '').slice(0, 120), phien: hoSo.phien,
        chiTiet: 'Vượt trần ' + GITA_TRAN_XIN_KHOA_GIO + ' lượt/giờ — lượt thứ ' + soLan });
      return ra({ ok: false, code: 'RATE', error: 'Xin khoá quá nhiều lần trong một giờ. Thử lại sau.' });
    }

    // 4. Tính phạm vi được cấp, giao nhau với danh sách client xin
    var duocCap = gitaPhamViCapPhep(hoSo);
    var xin = Array.isArray(y.goi) ? y.goi : duocCap;
    var cap = duocCap.filter(function (g) { return xin.indexOf(g) >= 0; });

    // 5. Lấy khoá và chỉ trả đúng phần được cấp
    var kho = JSON.parse(PropertiesService.getScriptProperties().getProperty('GITA_KHOA_KHO') || '{}');
    if (!Object.keys(kho).length) return ra({ ok: false, code: 'NOKEY', error: 'Máy chủ chưa được nạp bộ khoá.' });
    var traVe = {};
    cap.forEach(function (g) { if (kho[g]) traVe[g] = kho[g]; });

    // 6. Ghi nhật ký — ai, lúc nào, mở gói nào, trên máy nào
    ghiNhatKy_({
      viec: 'CAP_KHOA', u: hoSo.u, role: hoSo.role, tier: hoSo.tier,
      goi: cap.join(','), may: String(y.may || '').slice(0, 120),
      phien: hoSo.phien, ip: (e && e.parameter && e.parameter.ip) || ''
    });

    return ra({
      ok: true,
      khoa: traVe,
      hetHan: new Date(Date.now() + GITA_HAN_KHOA_GIO * 3600e3).toISOString(),
      phamVi: cap
    });
  } catch (err) {
    return ra({ ok: false, error: String(err && err.message || err) });
  }
}

/** Kiểm tra máy chủ còn sống và đã nạp khoá chưa. Không trả khoá nào.
    Apps Script chỉ cho phép MỘT hàm doGet trong cả dự án, nên hàm này không
    còn tên doGet nữa — bộ định tuyến trong GITA_BanWeb.gs gọi nó. */
function gitaTrangThai_() {
  var kho = {};
  try { kho = JSON.parse(PropertiesService.getScriptProperties().getProperty('GITA_KHOA_KHO') || '{}'); } catch (e) {}
  return ContentService.createTextOutput(JSON.stringify({
    ok: true, ten: 'GITA 365 — máy chủ cấp phép',
    daNapKhoa: Object.keys(kho).length, luc: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

/* ───────────────────────────────────────────────────────────────
   Hai hàm dưới nối vào lớp sẵn có của hệ thống v6.9.
   Đã nối thật — không còn là chỗ trống.
   ─────────────────────────────────────────────────────────────── */

/**
 * Trả về hồ sơ {u, role, tier, khoa, phien} nếu phiên hợp lệ, ngược lại null.
 *
 * Nối vào 02_Security.gs:
 *   readSession_(token) → {uid, username, role, portal, studentId, exp}
 *   Store.find('users', uid)      → kiểm tài khoản còn hoạt động
 *   Store.find('students', id)    → lấy tầng đang học
 */
function kiemTraPhien_(token, u) {
  var s = readSession_(token);
  if (!s) return null;

  // Tên đăng nhập client gửi lên phải khớp phiên — chặn dùng token của người khác
  if (u && String(u).toLowerCase() !== String(s.username || '').toLowerCase()) return null;

  var hoSo = { u: s.username, role: s.role, tier: 0, khoa: false, phaiDoiMk: false, phien: s };

  // Tài khoản có còn hoạt động không
  var nd = null;
  try { nd = Store.find('users', s.uid); } catch (e) { nd = null; }
  if (!nd || !isTrue(nd.active) || nd.deletedAt) { hoSo.khoa = true; return hoSo; }

  /* Mật khẩu tạm chưa đổi. Tài khoản vẫn đăng nhập và đổi mật khẩu được,
     nhưng KHÔNG mở được kho — mật khẩu do máy sinh ra và đi qua log, qua
     email, nên không được phép là chìa mở tài sản của Học viện. */
  if (isTrue(nd.mustChangePw)) hoSo.phaiDoiMk = true;
  if (nd.role !== s.role) { hoSo.role = nd.role; }   // vai đổi sau khi mở phiên

  // Tầng đang học — lấy từ hồ sơ học viên gắn với tài khoản
  var maHV = nd.studentId || s.studentId || '';
  if (maHV) {
    var hv = null;
    try { hv = Store.find('students', maHV); } catch (e) { hv = null; }
    if (hv) {
      if (String(hv.status || '').toLowerCase() === 'locked') { hoSo.khoa = true; return hoSo; }
      hoSo.tier = Number(hv.tier) || 0;
    }
  }
  return hoSo;
}

/** Ghi một dòng nhật ký chỉ thêm, không sửa, không xoá. */
function ghiNhatKy_(muc) {
  try {
    audit_(muc.phien || null, muc.viec || 'CAP_KHOA',
      muc.goi || '',
      'tang=' + (muc.tier || 0) + ' · may=' + (muc.may || '') +
      (muc.ip ? ' · ip=' + muc.ip : '') +
      (muc.chiTiet ? ' · ' + muc.chiTiet : ''));
  } catch (e) {
    Logger.log(JSON.stringify(muc));
  }
}


/* ═══════════════════════════════════════════════════════════════════════
   ĐĂNG KÝ — OTP, kích hoạt, mã số khách hàng, nâng tầng
   (nguyên văn server/GITA_DangKy.gs)
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * ═══════════════════════════════════════════════════════════════
 * GITA 365 — ĐĂNG KÝ · OTP · KÍCH HOẠT
 *
 * Đúng luồng anh Quang đặt:
 *   Đăng ký → điền đủ thông tin → nhận mã OTP qua email → kích link
 *   đăng nhập lại → đặt mật khẩu → đăng ký thành công → có mã số khách hàng.
 *
 * Ba chỗ chặt trong luồng này:
 *   · Mã OTP không lưu dạng đọc được. Chỉ lưu bản băm, sống 15 phút,
 *     sai năm lần là huỷ.
 *   · Không bao giờ nói cho người gửi biết email đã đăng ký hay chưa —
 *     nếu không, bất kỳ ai cũng dò được danh sách khách hàng của GITA.
 *   · Tài khoản chỉ sinh ra ở bước cuối, sau khi đặt mật khẩu. Trước đó
 *     bản ghi nằm trong bảng chờ, không phải bảng người dùng.
 * ═══════════════════════════════════════════════════════════════
 */

var GITA_OTP_PHUT     = 15;   /* mã sống bao lâu */
var GITA_OTP_SAI_TOI  = 5;    /* sai bao nhiêu lần thì huỷ */
var GITA_KICHHOAT_GIO = 24;   /* link kích hoạt sống bao lâu */

function gitaOtpMoi_() {
  var n = '';
  for (var i = 0; i < 6; i++) n += Math.floor(Math.random() * 10);
  return n;
}

function gitaChoTheoEmail_(email) {
  var e = String(email || '').trim().toLowerCase();
  return Store.all('dangKyCho').filter(function (x) {
    return String(x.email || '').toLowerCase() === e && x.trangThai !== 'xong';
  })[0] || null;
}

function gitaEmailDaCo_(email) {
  var e = String(email || '').trim().toLowerCase();
  return !!Store.all('users').filter(function (x) {
    return String(x.email || '').toLowerCase() === e && !x.deletedAt;
  })[0];
}

/* ═══════════════ BƯỚC 1 · GỬI THÔNG TIN ĐĂNG KÝ ═══════════════ */
function gitaDangKy_(y) {
  var d = y.hoSo || {};
  var email = String(d.email || '').trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    return {ok: false, error: 'Email chưa đúng định dạng.'};
  if (!String(d.hoTen || '').trim() || !String(d.tenCon || '').trim())
    return {ok: false, error: 'Chưa điền đủ họ tên phụ huynh và tên con.'};
  var dt = String(d.dienThoai || '').replace(/[\s.\-]/g, '');
  if (!/^(0|\+84)[0-9]{9,10}$/.test(dt))
    return {ok: false, error: 'Số điện thoại chưa đúng định dạng Việt Nam.'};

  var thongBao = 'Nếu email này chưa có tài khoản, mã sáu số vừa được gửi tới ' + email +
                 '. Mã sống ' + GITA_OTP_PHUT + ' phút.';

  /* Email đã có tài khoản: dừng ở đây nhưng trả lời y hệt trường hợp thường,
     và gửi một thư nhắc rằng tài khoản đã tồn tại. Người thật vẫn biết
     phải làm gì; người dò danh sách thì không biết thêm điều gì. */
  if (gitaEmailDaCo_(email)) {
    try {
      MailApp.sendEmail(email, 'GITA 365 — email này đã có tài khoản',
        'Chào anh chị,\n\nCó một lượt đăng ký vừa dùng địa chỉ email này, nhưng email này đã ' +
        'có tài khoản GITA 365 rồi.\n\nNếu là anh chị: xin mời đăng nhập như bình thường, ' +
        'hoặc dùng mục "Quên mật khẩu" nếu không nhớ.\nNếu không phải anh chị: bỏ qua thư này, ' +
        'tài khoản vẫn an toàn.\n\nCần người thật: 08.5555.4688\nHọc viện GITA');
    } catch (e) {}
    audit_(null, 'DANG_KY_TRUNG_EMAIL', email, '');
    return {ok: true, thongBao: thongBao};
  }

  var cu = gitaChoTheoEmail_(email);
  var ma = gitaOtpMoi_();
  var muoi = Utilities.getUuid();
  var ban = {
    email: email,
    hoTen: String(d.hoTen || '').trim(),
    dienThoai: dt,
    tenCon: String(d.tenCon || '').trim(),
    lop: String(d.lop || '').trim(),
    tinh: String(d.tinh || '').trim(),
    maGioiThieu: String(d.maGioiThieu || '').trim(),
    otpSalt: muoi, otpHash: hashPw_(ma, muoi),
    otpHan: Date.now() + GITA_OTP_PHUT * 60000, otpSai: 0,
    tokenKichHoat: '', tokenHan: 0, trangThai: 'choOtp'
  };

  if (cu) Store.update('dangKyCho', cu.id, ban);
  else { ban.id = gitaMaMoi_('D'); ban.createdAt = new Date().toISOString(); Store.insert('dangKyCho', ban); }

  try {
    MailApp.sendEmail(email, 'GITA 365 — mã xác nhận đăng ký',
      'Chào ' + ban.hoTen + ',\n\nMã xác nhận của anh chị là: ' + ma + '\n\n' +
      'Mã sống ' + GITA_OTP_PHUT + ' phút. Nhập mã vào màn hình đang mở để đi tiếp.\n\n' +
      'Nếu anh chị không đăng ký, bỏ qua thư này.\n\n' +
      'Cần người thật: 08.5555.4688\nHọc viện GITA');
  } catch (e) {
    return {ok: false, error: 'Máy chủ chưa gửi được thư. Kiểm lại quyền gửi email của dự án.'};
  }

  audit_(null, 'DANG_KY_GUI_OTP', email, 'Chờ xác nhận');
  return {ok: true, thongBao: thongBao};
}

/* ═══════════════ BƯỚC 2 · GỬI LẠI MÃ ═══════════════ */
function gitaGuiLaiOtp_(y) {
  var email = String(y.email || '').trim().toLowerCase();
  var c = gitaChoTheoEmail_(email);
  var thongBao = 'Nếu email này đang chờ xác nhận, mã mới vừa được gửi.';
  if (!c) return {ok: true, thongBao: thongBao};

  var ma = gitaOtpMoi_(), muoi = Utilities.getUuid();
  Store.update('dangKyCho', c.id, {
    otpSalt: muoi, otpHash: hashPw_(ma, muoi),
    otpHan: Date.now() + GITA_OTP_PHUT * 60000, otpSai: 0
  });
  try {
    MailApp.sendEmail(email, 'GITA 365 — mã xác nhận mới',
      'Mã mới của anh chị: ' + ma + '\n\nMã cũ đã hết hiệu lực. Mã này sống ' +
      GITA_OTP_PHUT + ' phút.\n\nHọc viện GITA · 08.5555.4688');
  } catch (e) {}
  audit_(null, 'DANG_KY_GUI_LAI_OTP', email, '');
  return {ok: true, thongBao: thongBao};
}

/* ═══════════════ BƯỚC 3 · XÁC THỰC MÃ ═══════════════ */
function gitaXacThucOtp_(y) {
  var email = String(y.email || '').trim().toLowerCase();
  var ma = String(y.ma || '').replace(/\D/g, '');
  var c = gitaChoTheoEmail_(email);
  var sai = {ok: false, error: 'Mã chưa đúng hoặc đã hết hạn.'};
  if (!c || c.trangThai !== 'choOtp') return sai;

  if (Number(c.otpHan || 0) < Date.now()) return {ok: false, error: 'Mã đã hết hạn. Bấm gửi lại mã.'};
  if (Number(c.otpSai || 0) >= GITA_OTP_SAI_TOI)
    return {ok: false, error: 'Mã đã bị huỷ vì nhập sai quá nhiều lần. Bấm gửi lại mã.'};

  if (!safeEqual_(hashPw_(ma, c.otpSalt), c.otpHash)) {
    Store.update('dangKyCho', c.id, {otpSai: Number(c.otpSai || 0) + 1});
    var con = GITA_OTP_SAI_TOI - (Number(c.otpSai || 0) + 1);
    return {ok: false, error: 'Mã chưa đúng.' + (con > 0 ? ' Còn ' + con + ' lần nhập.' : ' Mã đã bị huỷ.')};
  }

  /* Đúng mã — sinh link kích hoạt, gửi qua chính email đó. Người dùng phải
     quay lại từ hòm thư, đúng như luồng anh Quang đặt: "kích link đăng nhập lại". */
  var token = gitaMaMoi_('K') + gitaMaMoi_('');
  Store.update('dangKyCho', c.id, {
    trangThai: 'choKichHoat', tokenKichHoat: token,
    tokenHan: Date.now() + GITA_KICHHOAT_GIO * 3600e3,
    otpHash: '', otpSalt: ''
  });

  var lien = gitaDiaChiUngDung_() + '#kichhoat=' + token;
  try {
    MailApp.sendEmail(email, 'GITA 365 — bước cuối để mở tài khoản',
      'Chào ' + c.hoTen + ',\n\nMã xác nhận đã đúng. Còn một bước: bấm vào đường dẫn dưới đây ' +
      'để đặt mật khẩu và mở tài khoản.\n\n' + lien + '\n\n' +
      'Đường dẫn sống ' + GITA_KICHHOAT_GIO + ' giờ.\n\nHọc viện GITA · 08.5555.4688');
  } catch (e) {
    return {ok: false, error: 'Máy chủ chưa gửi được thư kích hoạt.'};
  }

  audit_(null, 'DANG_KY_XAC_THUC_OTP', email, 'Đã gửi link kích hoạt');
  return {ok: true, thongBao: 'Mã đúng. Thư có đường dẫn đặt mật khẩu vừa được gửi tới ' + email + '.'};
}

/** Địa chỉ bản web, để dựng link kích hoạt. Đặt trong Script Properties. */
function gitaDiaChiUngDung_() {
  return PropertiesService.getScriptProperties().getProperty('GITA_DIA_CHI_WEB') ||
         'https://gita.edu.vn/';
}

/* ═══════════════ BƯỚC 4 · KÍCH HOẠT VÀ ĐẶT MẬT KHẨU ═══════════════ */
function gitaKichHoat_(y) {
  var token = String(y.token || '');
  var mk = String(y.mk || '');
  if (mk.length < 10) return {ok: false, error: 'Mật khẩu cần ít nhất 10 ký tự.'};

  var c = Store.all('dangKyCho').filter(function (x) {
    return String(x.tokenKichHoat || '') === token && x.trangThai === 'choKichHoat';
  })[0];
  if (!c) return {ok: false, error: 'Đường dẫn không còn hiệu lực. Xin đăng ký lại.'};
  if (Number(c.tokenHan || 0) < Date.now())
    return {ok: false, error: 'Đường dẫn đã hết hạn. Xin đăng ký lại.'};

  /* Mã số khách hàng: đánh số liên tục, không đoán được ai là ai từ mã. */
  var soHienCo = Store.all('users').filter(function (x) { return x.maKhachHang; }).length;
  var maKH = 'GITA-' + ('0000' + (soHienCo + 1)).slice(-4);

  var muoi = Utilities.getUuid();
  var uid = gitaMaMoi_('U');
  var maHV = gitaMaMoi_('H');

  Store.insert('students', {
    id: maHV, hoTen: c.tenCon, lop: c.lop, tinh: c.tinh,
    tier: 0, status: 'moi', kpi: 0, phuHuynhId: uid, coach: '',
    createdAt: new Date().toISOString()
  });

  Store.insert('users', {
    id: uid, username: c.email, hoTen: c.hoTen, email: c.email, dienThoai: c.dienThoai,
    role: 'R13', portal: 'ph', studentId: maHV,
    pwSalt: muoi, pwHash: hashPw_(mk, muoi),
    active: 'TRUE', createdAt: new Date().toISOString(), updatedAt: '', deletedAt: '',
    maKhachHang: maKH, boTro: c.maGioiThieu || ''
  });

  Store.update('dangKyCho', c.id, {trangThai: 'xong', tokenKichHoat: '', tokenHan: 0});
  audit_({uid: uid, username: c.email}, 'DANG_KY_XONG', maKH,
    'Tầng 0 · chờ hoàn thành KPI và xác nhận thanh toán' +
    (c.maGioiThieu ? ' · bảo trợ ' + c.maGioiThieu : ''));

  try {
    MailApp.sendEmail(c.email, 'GITA 365 — tài khoản đã mở',
      'Chào ' + c.hoTen + ',\n\nTài khoản của gia đình đã mở.\n' +
      'Mã số khách hàng: ' + maKH + '\nTên đăng nhập: ' + c.email + '\n\n' +
      'Hiện nhà mình đang ở chặng khởi đầu. Tư vấn của GITA sẽ liên hệ trong 24 giờ tới ' +
      'để cùng nhìn lại và chọn chặng phù hợp.\n\nHọc viện GITA · 08.5555.4688');
  } catch (e) {}

  return {ok: true, maKhachHang: maKH, email: c.email};
}

/* ═══════════════ NÂNG TẦNG ═══════════════
   Luồng anh Quang đặt: hoàn thành KPI tầng → xác nhận thanh toán → check
   cả hai → nâng tầng → mở quyền tương ứng.
   Máy chủ KHÔNG tự nâng. Phải có người bậc ≤ 3 bấm, và cả hai điều kiện
   phải đúng, nếu không thì từ chối kèm lý do rõ ràng. */
function gitaNangTang_(y, hoSo) {
  var lv = (ROLES[hoSo.role] || {lv: 99}).lv;
  if (lv > 3) return {ok: false, error: 'Chỉ R01–R03 nâng tầng được.'};

  var hv = Store.find('students', String(y.maHocVien || ''));
  if (!hv) return {ok: false, error: 'Không tìm thấy hồ sơ học viên.'};

  var tangMoi = Number(y.tang || 0);
  if (!(tangMoi >= 1 && tangMoi <= 5)) return {ok: false, error: 'Tầng phải từ 1 đến 5.'};
  if (tangMoi !== Number(hv.tier || 0) + 1)
    return {ok: false, error: 'Chỉ nâng được một tầng mỗi lần, theo thứ tự.'};

  var kpi = Number(hv.kpi || 0);
  if (kpi < 80)
    return {ok: false, error: 'KPI tầng đang là ' + kpi + '%. Cửa nâng tầng là 80%.'};

  var tt = Store.all('thanhToan').filter(function (x) {
    return String(x.maKhachHang) === String(y.maKhachHang || '') &&
           Number(x.tier) === tangMoi && String(x.trangThai) === 'daXacNhan';
  })[0];
  if (!tt) return {ok: false, error: 'Chưa có xác nhận thanh toán cho tầng ' + tangMoi + '.'};

  Store.update('students', hv.id, {tier: tangMoi, status: 'dangHoc'});
  audit_(hoSo.phien, 'NANG_TANG', hv.id,
    'Lên tầng ' + tangMoi + ' · KPI ' + kpi + '% · thanh toán ' + tt.id);
  return {ok: true, tang: tangMoi, kpi: kpi};
}


/* ═══════════════════════════════════════════════════════════════════════
   MẬT KHẨU — đổi, quên, đặt lại bằng mã
   (nguyên văn server/GITA_MatKhau.gs)
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * ═══════════════════════════════════════════════════════════════
 * GITA 365 — ĐỔI MẬT KHẨU VÀ LẤY LẠI MẬT KHẨU QUA EMAIL
 * Dán vào cùng dự án Apps Script với GITA_CapPhep.gs.
 *
 * Dùng đúng lớp băm sẵn có của v6.9: hashPw_, newSalt_, safeEqual_,
 * checkPwStrength_ trong 02_Security.gs. Không tự nghĩ ra cách băm mới.
 * ═══════════════════════════════════════════════════════════════
 */

var GITA_HAN_MA_PHUT   = 15;   // mã lấy lại mật khẩu sống bao lâu
var GITA_TRAN_QUEN_GIO = 5;    // số lần xin mã tối đa mỗi giờ cho một tài khoản

function gitaMaSauSo_() {
  var b = '';
  for (var i = 0; i < 6; i++) b += Math.floor(Math.random() * 10);
  return b;
}
function gitaKhoaMa_(u) { return 'PWRESET_' + String(u).toLowerCase(); }

/* ═══════════ 1. ĐỔI MẬT KHẨU — khi đã đăng nhập ═══════════ */
function gitaDoiMatKhau_(y, hoSo) {
  var cu = String(y.cu || ''), moi = String(y.moi || '');
  if (!cu || !moi) return { ok: false, error: 'Thiếu mật khẩu cũ hoặc mật khẩu mới.' };

  var nd = Store.find('users', hoSo.phien.uid);
  if (!nd) return { ok: false, code: 'AUTH', error: 'Không tìm thấy tài khoản.' };

  // Mật khẩu cũ phải đúng
  if (!safeEqual_(hashPw_(cu, nd.pwSalt), nd.pwHash)) {
    ghiNhatKy_({ viec: 'DOI_MK_SAI', u: hoSo.u, role: hoSo.role, phien: hoSo.phien,
      chiTiet: 'Nhập sai mật khẩu cũ' });
    return { ok: false, code: 'WRONG', error: 'Mật khẩu hiện tại không đúng.' };
  }
  if (cu === moi) return { ok: false, error: 'Mật khẩu mới phải khác mật khẩu cũ.' };

  var manh = checkPwStrength_(moi);
  if (manh !== true && manh) return { ok: false, code: 'WEAK', error: String(manh) };

  var muoi = newSalt_();
  Store.update('users', nd.id, {
    pwSalt: muoi, pwHash: hashPw_(moi, muoi),
    mustChangePw: false, pwDoiLuc: new Date().toISOString()
  });

  // Đổi mật khẩu là đóng mọi phiên khác — người lạ đang dùng token cũ bị đá ra
  try { closeSession_(y.token); } catch (e) {}

  ghiNhatKy_({ viec: 'DOI_MK', u: hoSo.u, role: hoSo.role, phien: hoSo.phien,
    chiTiet: 'Đổi mật khẩu thành công, đã đóng phiên' });
  try {
    MailApp.sendEmail(nd.email || nd.username, 'GITA 365 — mật khẩu đã được đổi',
      'Chào ' + (nd.hoTen || 'anh chị') + ',\n\n' +
      'Mật khẩu tài khoản ' + nd.username + ' vừa được đổi lúc ' +
      Utilities.formatDate(new Date(), 'GMT+7', 'HH:mm dd/MM/yyyy') + '.\n\n' +
      'Nếu không phải anh chị đổi, báo ngay cho Học viện GITA theo số 08.5555.4688.\n\n' +
      'Học viện GITA');
  } catch (e) { /* không gửi được thư thì việc đổi vẫn xong */ }

  return { ok: true, thongBao: 'Đã đổi mật khẩu. Hãy đăng nhập lại bằng mật khẩu mới.' };
}

/* ═══════════ 2. QUÊN MẬT KHẨU — gửi mã sáu số qua email ═══════════ */
function gitaQuenMatKhau_(y) {
  var u = String(y.u || '').trim().toLowerCase();
  if (!u) return { ok: false, error: 'Thiếu tên đăng nhập.' };

  // Trả lời GIỐNG NHAU dù tài khoản có thật hay không — không để dò tài khoản
  var traLoi = { ok: true, thongBao: 'Nếu tài khoản có thật, mã lấy lại mật khẩu đã được gửi tới email đăng ký. Mã sống ' + GITA_HAN_MA_PHUT + ' phút.' };

  var kho = CacheService.getScriptCache();
  var kDem = 'PWRESET_DEM_' + u;
  var soLan = Number(kho.get(kDem) || 0) + 1;
  kho.put(kDem, String(soLan), 3600);
  if (soLan > GITA_TRAN_QUEN_GIO) {
    ghiNhatKy_({ viec: 'QUEN_MK_CHAN', u: u, chiTiet: 'Vượt trần ' + GITA_TRAN_QUEN_GIO + ' lần/giờ' });
    return traLoi;
  }

  /* Nhận CẢ tên đăng nhập LẪN địa chỉ email — giống hệt lúc đăng nhập.
     Người quên mật khẩu thường cũng không nhớ chính xác tên đăng nhập; bắt
     họ nhớ đúng một trong hai là dựng thêm một cánh cửa khoá nữa ngay lúc
     họ đang bí. */
  var nd = null;
  try {
    nd = Store.all('users').filter(function (x) {
      return String(x.username || '').toLowerCase() === u ||
             String(x.email || '').toLowerCase() === u;
    })[0];
  } catch (e) { nd = null; }
  if (!nd || !isTrue(nd.active) || nd.deletedAt) return traLoi;

  var email = nd.email || nd.username;
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return traLoi;

  /* Khoá lưu mã đi theo TÊN ĐĂNG NHẬP thật, không theo chuỗi người dùng gõ.
     Nếu không, xin mã bằng email rồi đặt lại bằng tên đăng nhập sẽ không khớp. */
  var uThat = String(nd.username || '').toLowerCase();

  var ma = gitaMaSauSo_();
  var muoi = newSalt_();
  kho.put(gitaKhoaMa_(uThat), JSON.stringify({
    hash: hashPw_(ma, muoi), salt: muoi, uid: nd.id,
    het: Date.now() + GITA_HAN_MA_PHUT * 60000, sai: 0
  }), GITA_HAN_MA_PHUT * 60);

  try {
    MailApp.sendEmail(email, 'GITA 365 — mã lấy lại mật khẩu',
      'Chào ' + (nd.hoTen || 'anh chị') + ',\n\n' +
      'Mã lấy lại mật khẩu của tài khoản ' + nd.username + ' là:\n\n' +
      '        ' + ma + '\n\n' +
      'Mã sống ' + GITA_HAN_MA_PHUT + ' phút và chỉ dùng được một lần.\n\n' +
      'Nếu không phải anh chị yêu cầu, bỏ qua thư này — mật khẩu cũ vẫn nguyên. ' +
      'Nếu nhận nhiều thư như thế này, báo cho Học viện GITA theo số 08.5555.4688.\n\n' +
      'Học viện GITA');
  } catch (e) {
    ghiNhatKy_({ viec: 'QUEN_MK_LOI', u: u, chiTiet: 'Không gửi được thư: ' + e.message });
    return traLoi;
  }

  ghiNhatKy_({ viec: 'QUEN_MK', u: u, chiTiet: 'Đã gửi mã tới ' + email.replace(/^(.{2}).*(@.*)$/, '$1***$2') });
  return traLoi;
}

/* ═══════════ 3. ĐẶT LẠI MẬT KHẨU BẰNG MÃ ═══════════ */
function gitaDatLaiMatKhau_(y) {
  var u = String(y.u || '').trim().toLowerCase();
  var ma = String(y.ma || '').trim();
  var moi = String(y.moi || '');
  if (!u || !ma || !moi) return { ok: false, error: 'Thiếu tên đăng nhập, mã hoặc mật khẩu mới.' };

  /* Người dùng có thể xin mã bằng email rồi đặt lại bằng tên đăng nhập, hoặc
     ngược lại. Quy cả hai về đúng một tài khoản trước khi tìm mã. */
  var ndTim = null;
  try {
    ndTim = Store.all('users').filter(function (x) {
      return String(x.username || '').toLowerCase() === u ||
             String(x.email || '').toLowerCase() === u;
    })[0];
  } catch (e) { ndTim = null; }
  if (ndTim) u = String(ndTim.username || '').toLowerCase();

  var kho = CacheService.getScriptCache();
  var raw = kho.get(gitaKhoaMa_(u));
  if (!raw) return { ok: false, code: 'EXPIRED', error: 'Mã đã hết hạn hoặc chưa được cấp. Xin mã mới.' };

  var g = JSON.parse(raw);
  if (g.het < Date.now()) { kho.remove(gitaKhoaMa_(u)); return { ok: false, code: 'EXPIRED', error: 'Mã đã hết hạn. Xin mã mới.' }; }

  if (!safeEqual_(hashPw_(ma, g.salt), g.hash)) {
    g.sai = (g.sai || 0) + 1;
    if (g.sai >= 5) {
      kho.remove(gitaKhoaMa_(u));
      ghiNhatKy_({ viec: 'DAT_LAI_MK_CHAN', u: u, chiTiet: 'Sai mã 5 lần — huỷ mã' });
      return { ok: false, code: 'LOCKED', error: 'Sai mã năm lần. Mã đã bị huỷ, xin mã mới.' };
    }
    kho.put(gitaKhoaMa_(u), JSON.stringify(g), Math.max(60, Math.round((g.het - Date.now()) / 1000)));
    return { ok: false, code: 'WRONG', error: 'Mã không đúng. Còn ' + (5 - g.sai) + ' lần thử.' };
  }

  var manh = checkPwStrength_(moi);
  if (manh !== true && manh) return { ok: false, code: 'WEAK', error: String(manh) };

  var nd = Store.find('users', g.uid);
  if (!nd) return { ok: false, error: 'Không tìm thấy tài khoản.' };

  var muoi = newSalt_();
  Store.update('users', nd.id, {
    pwSalt: muoi, pwHash: hashPw_(moi, muoi),
    mustChangePw: false, pwDoiLuc: new Date().toISOString()
  });
  kho.remove(gitaKhoaMa_(u));
  try { clearFail_(u); } catch (e) {}

  ghiNhatKy_({ viec: 'DAT_LAI_MK', u: u, role: nd.role, chiTiet: 'Đặt lại mật khẩu bằng mã email' });
  try {
    MailApp.sendEmail(nd.email || nd.username, 'GITA 365 — mật khẩu đã được đặt lại',
      'Mật khẩu tài khoản ' + nd.username + ' vừa được đặt lại lúc ' +
      Utilities.formatDate(new Date(), 'GMT+7', 'HH:mm dd/MM/yyyy') + '.\n\n' +
      'Nếu không phải anh chị làm, báo ngay cho Học viện GITA theo số 08.5555.4688.\n\nHọc viện GITA');
  } catch (e) {}

  return { ok: true, thongBao: 'Đã đặt lại mật khẩu. Đăng nhập bằng mật khẩu mới.' };
}


/* ═══════════════════════════════════════════════════════════════════════
   TÀI LIỆU — nhận tài liệu và minh chứng, kiểm duyệt
   (nguyên văn server/GITA_TaiLieu.gs)
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * ═══════════════════════════════════════════════════════════════
 * GITA 365 — NHẬN TÀI LIỆU VÀ MINH CHỨNG TỪ ỨNG DỤNG
 * Dán vào cùng dự án Apps Script với GITA_CapPhep.gs.
 *
 * Mọi vị trí đều gửi được tệp lên. Tệp vào thư mục Drive của Học viện,
 * mỗi loại một thư mục con, và sổ tài liệu ghi lại ai gửi cái gì lúc nào.
 * Chỉ Super Admin và Admin hệ thống duyệt.
 * ═══════════════════════════════════════════════════════════════
 */

/* Thư mục gốc nhận tài liệu đội ngũ gửi lên. Đổi ID ở đây nếu chuyển chỗ. */
var GITA_THU_MUC_TAILIEU = '1pvXH45JvXXPOW9V6ObB5CR87r7gxH0fU';

var GITA_TL_CO_TOI_DA   = 25 * 1024 * 1024;  /* 25 MB mỗi tệp */
var GITA_TL_TRAN_NGAY   = 30;                /* mỗi tài khoản gửi tối đa 30 tệp/ngày */

/* Chỉ nhận đúng những kiểu tệp dùng được. Không nhận tệp chạy được. */
var GITA_TL_DUOI_CHO_PHEP = [
  'pdf','doc','docx','ppt','pptx','xls','xlsx','png','jpg','jpeg','webp','txt','csv'
];

function gitaDuoiTep_(ten) {
  var p = String(ten || '').split('.');
  return p.length > 1 ? p.pop().toLowerCase() : '';
}

function gitaThuMucCon_(goc, ten) {
  var it = goc.getFoldersByName(ten);
  return it.hasNext() ? it.next() : goc.createFolder(ten);
}

function gitaDemGuiNgay_(u) {
  var kho = CacheService.getScriptCache();
  var k = 'TLGUI_' + String(u).toLowerCase() + '_' + Utilities.formatDate(new Date(), 'GMT+7', 'yyyyMMdd');
  var n = Number(kho.get(k) || 0) + 1;
  kho.put(k, String(n), 86400);
  return n;
}

/**
 * Nhận một tệp. Thân yêu cầu:
 * {"fn":"napTaiLieu","u":"…","token":"…","ban":{…},"dulieu":"<base64>"}
 */
function gitaNapTaiLieu_(y, hoSo) {
  var ban = y.ban || {};
  var ten = String(ban.ten || '').trim();
  var tenTep = String(ban.tenTep || '').trim();
  if (!ten || !tenTep) return { ok: false, error: 'Thiếu tên tài liệu hoặc tên tệp.' };

  var duoi = gitaDuoiTep_(tenTep);
  if (GITA_TL_DUOI_CHO_PHEP.indexOf(duoi) < 0)
    return { ok: false, error: 'Không nhận tệp đuôi .' + duoi + '. Chỉ nhận tài liệu và ảnh.' };

  var soLan = gitaDemGuiNgay_(hoSo.u);
  if (soLan > GITA_TL_TRAN_NGAY) {
    ghiNhatKy_({ viec: 'GUI_TL_CHAN', u: hoSo.u, role: hoSo.role,
      chiTiet: 'Vượt trần ' + GITA_TL_TRAN_NGAY + ' tệp/ngày' });
    return { ok: false, code: 'RATE', error: 'Đã gửi quá ' + GITA_TL_TRAN_NGAY + ' tệp hôm nay. Thử lại ngày mai.' };
  }

  var thoBase64 = String(y.dulieu || '');
  if (!thoBase64) return { ok: false, error: 'Tệp rỗng.' };

  var byte;
  try { byte = Utilities.base64Decode(thoBase64); }
  catch (e) { return { ok: false, error: 'Tệp gửi lên không đọc được.' }; }
  if (byte.length > GITA_TL_CO_TOI_DA)
    return { ok: false, error: 'Tệp lớn hơn 25 MB.' };

  var goc = DriveApp.getFolderById(GITA_THU_MUC_TAILIEU);
  var thuMuc = gitaThuMucCon_(gitaThuMucCon_(goc, 'TAI-LIEU-DOI-NGU'),
    String(ban.loai || 'khac'));

  /* Tên tệp mang sẵn mã, người gửi và ngày — nhìn tên là truy được nguồn */
  var tenLuu = (ban.id || 'TL') + '__' + String(hoSo.u).split('@')[0] + '__' +
    Utilities.formatDate(new Date(), 'GMT+7', 'yyyyMMdd') + '__' + tenTep;

  var blob = Utilities.newBlob(byte, ban.kieuTep || MimeType.PLAIN_TEXT, tenLuu);
  var tep = thuMuc.createFile(blob);
  tep.setDescription(
    'Mã: ' + (ban.id || '') + '\n' +
    'Tên: ' + ten + '\n' +
    'Loại: ' + (ban.loai || '') + ' · Tầng: ' + (ban.tang || 'chung') + '\n' +
    'Người gửi: ' + hoSo.u + ' (' + hoSo.role + ')\n' +
    'Mô tả: ' + String(ban.moTa || '') + '\n' +
    'Trạng thái: CHỜ DUYỆT — chỉ vào kho sau khi Super Admin hoặc Admin duyệt.');

  /* Ghi vào sổ tài liệu để màn kiểm duyệt đọc được */
  try {
    Store.insert('tailieu', {
      ma: ban.id || '', ten: ten, loai: ban.loai || '', tang: ban.tang || 0,
      moTa: String(ban.moTa || ''), driveId: tep.getId(), tenTep: tenTep,
      nguoiGui: hoSo.u, vaiGui: hoSo.role, luc: new Date().toISOString(),
      trangThai: 'cho-duyet'
    });
  } catch (e) { /* chưa có sổ thì tệp vẫn nằm đúng chỗ trên Drive */ }

  ghiNhatKy_({ viec: 'GUI_TL', u: hoSo.u, role: hoSo.role,
    chiTiet: (ban.id || '') + ' · ' + ten + ' · ' + Math.round(byte.length / 1024) + ' KB' });

  return { ok: true, driveId: tep.getId(),
    thongBao: 'Đã lưu tệp vào Drive của Học viện. Tài liệu đang chờ kiểm duyệt.' };
}

/**
 * Quyết định của người kiểm duyệt. CHỈ vai bậc ≤ 2.
 * {"fn":"duyetTaiLieu","u":"…","token":"…","ma":"TL-…","viec":"duyet|sua|tuchoi","lyDo":"…"}
 */
function gitaDuyetTaiLieu_(y, hoSo) {
  var lv = (ROLES[hoSo.role] || { lv: 99 }).lv;
  if (lv > 2) {
    ghiNhatKy_({ viec: 'DUYET_TL_CHAN', u: hoSo.u, role: hoSo.role,
      chiTiet: 'Vai bậc ' + lv + ' không được kiểm duyệt tài liệu' });
    return { ok: false, code: 'PERM',
      error: 'Chỉ Super Admin và Admin hệ thống được kiểm duyệt tài liệu.' };
  }
  var viec = String(y.viec || '');
  if (['duyet', 'sua', 'tuchoi'].indexOf(viec) < 0)
    return { ok: false, error: 'Việc không hợp lệ.' };
  var lyDo = String(y.lyDo || '').trim();
  if (viec !== 'duyet' && lyDo.length < 8)
    return { ok: false, error: 'Phải ghi rõ lý do hoặc điều cần bổ sung.' };

  var tt = viec === 'duyet' ? 'da-duyet' : viec === 'sua' ? 'yeu-cau-sua' : 'tu-choi';
  try {
    var b = Store.find('tailieu', { ma: String(y.ma || '') });
    if (b) Store.update('tailieu', b.id, {
      trangThai: tt, nguoiDuyet: hoSo.u, lucDuyet: new Date().toISOString(), lyDo: lyDo
    });
  } catch (e) { /* không có sổ thì vẫn ghi nhật ký */ }

  ghiNhatKy_({ viec: 'DUYET_TL', u: hoSo.u, role: hoSo.role,
    chiTiet: String(y.ma || '') + ' → ' + tt + (lyDo ? ' · ' + lyDo : '') });
  return { ok: true, trangThai: tt, thongBao: 'Đã ghi quyết định.' };
}


/* ═══════════════════════════════════════════════════════════════════════
   ĐỒNG BỘ — hồ sơ và cài đặt giữa bản web và bản cài trên máy
   (nguyên văn server/GITA_DongBo.gs)
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * ═══════════════════════════════════════════════════════════════
 * GITA 365 — ĐỒNG BỘ APP ↔ WEB APP
 * Dán vào cùng dự án Apps Script với GITA_CapPhep.gs.
 *
 * App máy tính giữ dữ liệu trong máy và chạy được khi mất mạng.
 * Có mạng thì đẩy phần đã đổi lên máy chủ Admin và kéo phần mới về.
 * Xung đột giải bằng mốc thời gian từng trường, không ghi đè cả khối.
 * ═══════════════════════════════════════════════════════════════
 */

/** Trần kích thước một lần đẩy — chặn đẩy cả kho lên bằng một lệnh. */
var GITA_TRAN_DONGBO_KB = 512;

/** Những nhóm dữ liệu được phép đồng bộ. Ngoài danh sách này là từ chối. */
var GITA_NHOM_DONGBO = ['checks', 'journal', 'vision', 'test', 'mood'];

function gitaKhoaHoSo_(uid) { return 'HOSO_' + uid; }

/**
 * Thân yêu cầu:
 *   { fn:'dongBo', u, token, tuLuc: <ISO|null>, day: { checks:{...}, journal:{...}, ... },
 *     mocTruong: { 'checks.kpi-1-0': 1787900000000, ... } }
 * Trả về:
 *   { ok, keo: {...}, mocTruong: {...}, mocMayChu: <ISO>, boQua: [] }
 */
/* Cài đặt của chủ hệ thống — bố cục, chữ hiển thị, bảng phân quyền.
   Đồng bộ theo cả cụm: ai sửa sau thì bản đó thắng. Chỉ vai bậc ≤ 2
   được ghi; vai khác chỉ NHẬN về, không đẩy lên. */
function gitaCaiDat_(y, hoSo) {
  var kho = PropertiesService.getScriptProperties();
  var cu = {};
  try { cu = JSON.parse(kho.getProperty('GITA_CAI_DAT') || '{}'); } catch (e) { cu = {}; }
  var lv = (ROLES[hoSo.role] || { lv: 99 }).lv;
  var gui = y.caiDat || {}, doi = 0;

  /* Hai cụm khác luật: tư liệu Tư vấn và Coach gửi thêm cho từng nhà, và
     những lời xin đang chờ. Ghi được từ Tư vấn trở lên (bậc ≤ 11) — vì
     chính họ là người đứng giữa kho và gia đình. Gia đình chỉ đặt lời xin
     qua cụm xinthem, không bao giờ tự ghi vào cụm khothem. */
  var CUM_NGHE = ['khothem', 'xinthem', 'ca'];
  if (lv <= 11) {
    Object.keys(gui).forEach(function (k) {
      if (CUM_NGHE.indexOf(k) < 0) return;
      var v = gui[k];
      if (!v || typeof v !== 'object' || !v.du) return;
      if (Number(v.luc || 0) <= Number((cu[k] || {}).luc || 0)) return;
      cu[k] = { luc: Number(v.luc), du: v.du, boi: hoSo.u };
      doi++;
    });
  } else {
    /* Gia đình và cộng tác viên: chỉ được đẩy lời XIN lên, không hơn. */
    var vx = gui.xinthem;
    if (vx && typeof vx === 'object' && vx.du &&
        Number(vx.luc || 0) > Number((cu.xinthem || {}).luc || 0)) {
      cu.xinthem = { luc: Number(vx.luc), du: vx.du, boi: hoSo.u };
      doi++;
    }
  }

  if (lv <= 2) {
    Object.keys(gui).forEach(function (k) {
      if (['sapxep', 'noidung', 'phanquyen'].indexOf(k) < 0) return;
      var v = gui[k];
      if (!v || typeof v !== 'object' || !v.du) return;
      if (Number(v.luc || 0) <= Number((cu[k] || {}).luc || 0)) return;
      cu[k] = { luc: Number(v.luc), du: v.du, boi: hoSo.u };
      doi++;
    });
  }

  if (doi) {
    var tho = JSON.stringify(cu);
    if (tho.length > 400000) return cu;            /* quá lớn thì không ghi, giữ bản cũ */
    kho.setProperty('GITA_CAI_DAT', tho);
    ghiNhatKy_({ viec: 'DONG_BO_CAI_DAT', u: hoSo.u, role: hoSo.role,
      chiTiet: 'Cập nhật ' + doi + ' cụm cài đặt' });
  }
  return cu;
}

function gitaDongBo_(y, hoSo) {
  var uid = hoSo.phien.uid;

  // 1. Kích thước
  var co = JSON.stringify(y.day || {}).length;
  if (co > GITA_TRAN_DONGBO_KB * 1024)
    return { ok: false, code: 'TOOBIG', error: 'Gói đẩy lên vượt trần ' + GITA_TRAN_DONGBO_KB + ' KB.' };

  // 2. Đọc hồ sơ đang có trên máy chủ
  var cu = null;
  try { cu = Store.find('hosoApp', uid); } catch (e) { cu = null; }
  var duLieu = {}, moc = {};
  if (cu && cu.duLieu) {
    try { duLieu = JSON.parse(cu.duLieu) || {}; } catch (e) { duLieu = {}; }
    try { moc = JSON.parse(cu.moc || '{}') || {}; } catch (e) { moc = {}; }
  }

  // 3. Gộp theo TỪNG TRƯỜNG, bên nào mới hơn thì thắng.
  //    Không ghi đè cả khối — hai máy sửa hai việc khác nhau thì giữ được cả hai.
  var day = y.day || {}, mocDay = y.mocTruong || {}, boQua = [];
  Object.keys(day).forEach(function (nhom) {
    if (GITA_NHOM_DONGBO.indexOf(nhom) < 0) { boQua.push(nhom); return; }
    var v = day[nhom];
    if (v === null || typeof v !== 'object') return;
    duLieu[nhom] = duLieu[nhom] || {};
    Object.keys(v).forEach(function (k) {
      var khoa = nhom + '.' + k;
      var tMay = Number(mocDay[khoa] || 0);
      var tChu = Number(moc[khoa] || 0);
      if (tMay >= tChu) { duLieu[nhom][k] = v[k]; moc[khoa] = tMay || Date.now(); }
      // tMay < tChu: máy chủ mới hơn, giữ nguyên và trả về ở phần keo
    });
  });

  // 4. Ghi lại, luôn giữ một bản sao lưu trước khi ghi đè
  var ban = { duLieu: JSON.stringify(duLieu), moc: JSON.stringify(moc), suaLuc: new Date().toISOString() };
  try {
    if (cu) {
      Store.insert('hosoAppSaoLuu', { id: uid + '-' + Date.now(), uid: uid,
        duLieu: cu.duLieu, luc: cu.suaLuc || '' });
      Store.update('hosoApp', uid, ban);
    } else {
      Store.insert('hosoApp', { id: uid, uid: uid, u: hoSo.u, role: hoSo.role,
        duLieu: ban.duLieu, moc: ban.moc, suaLuc: ban.suaLuc, taoLuc: ban.suaLuc });
    }
  } catch (e) {
    return { ok: false, error: 'Không ghi được hồ sơ: ' + e.message };
  }

  ghiNhatKy_({ viec: 'DONG_BO', u: hoSo.u, role: hoSo.role, tier: hoSo.tier,
    may: String(y.may || '').slice(0, 120), phien: hoSo.phien,
    chiTiet: Math.round(co / 1024) + ' KB · ' + Object.keys(day).join(',') +
             (boQua.length ? ' · bỏ qua: ' + boQua.join(',') : '') });

  return { ok: true, caiDat: gitaCaiDat_(y, hoSo), keo: duLieu, mocTruong: moc, mocMayChu: ban.suaLuc, boQua: boQua };
}

/**
 * Kiểm bản mới của ứng dụng và của kho — app hỏi mỗi lần mở và mỗi 6 giờ.
 * Thân: { fn:'kiemBanMoi', banApp:'7.5.0' }
 */
function gitaKiemBanMoi_(y) {
  var P = PropertiesService.getScriptProperties();
  return {
    ok: true,
    banMoiNhat: P.getProperty('GITA_BAN_MOI_NHAT') || '',
    tai: P.getProperty('GITA_LINK_TAI') || '',
    bacBuoc: P.getProperty('GITA_BAN_BAT_BUOC') || '',
    khoBam: JSON.parse(P.getProperty('GITA_KHO_BAM') || '{}'),
    banApp: String(y.banApp || '')
  };
}


/* ═══════════════════════════════════════════════════════════════════════
   XUẤT SHEET — đẩy bảng tính về thư mục Drive của Học viện
   (nguyên văn server/GITA_XuatSheet.gs)
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * ═══════════════════════════════════════════════════════════════
 * GITA 365 — XUẤT BẢNG TÍNH VỀ DRIVE CỦA ADMIN
 * Dán vào cùng dự án Apps Script với GITA_CapPhep.gs.
 *
 * Dữ liệu KHÔNG đi qua máy người dùng. Máy chủ tạo Google Sheet
 * thẳng trong thư mục Drive của Admin rồi trả về đường dẫn.
 * Không có tệp nào nằm lại trong thư mục Tải về của ai cả.
 * ═══════════════════════════════════════════════════════════════
 */

/** Thư mục Drive nhận mọi bảng tính xuất ra. */
var GITA_THU_MUC_XUAT = '1pvXH45JvXXPOW9V6ObB5CR87r7gxH0fU';

/** Trần số dòng mỗi lần xuất — chặn rút cả kho bằng một lệnh. */
var GITA_TRAN_DONG_XUAT = 5000;

/** Trần số lần xuất mỗi tài khoản mỗi ngày. */
var GITA_TRAN_XUAT_NGAY = 20;

function gitaDemXuat_(u) {
  var kho = CacheService.getScriptCache();
  var k = 'XUATSHEET_' + String(u).toLowerCase() + '_' + Utilities.formatDate(new Date(), 'GMT+7', 'yyyyMMdd');
  var n = Number(kho.get(k) || 0) + 1;
  kho.put(k, String(n), 86400);
  return n;
}

/**
 * Tạo một Google Sheet trong thư mục Admin.
 * Gọi từ doPost khi fn === 'xuatSheet'.
 */
function gitaXuatSheet_(y, hoSo) {
  // 1. Quyền: chỉ vai có xuat_sheet. lv lấy từ ROLES trong 00_Config.gs.
  var lv = (ROLES[hoSo.role] || { lv: 99 }).lv;
  if (lv > 4) return { ok: false, code: 'PERM', error: 'Vai này không có quyền xuất bảng tính.' };

  // 2. Dữ liệu phải hợp lệ và trong trần
  var cot = Array.isArray(y.cot) ? y.cot : null;
  var dong = Array.isArray(y.dong) ? y.dong : null;
  if (!cot || !cot.length || !dong) return { ok: false, error: 'Thiếu dữ liệu bảng.' };
  if (dong.length > GITA_TRAN_DONG_XUAT)
    return { ok: false, code: 'TOOBIG', error: 'Vượt trần ' + GITA_TRAN_DONG_XUAT + ' dòng một lần xuất.' };

  var soLan = gitaDemXuat_(hoSo.u);
  if (soLan > GITA_TRAN_XUAT_NGAY)
    return { ok: false, code: 'RATE', error: 'Vượt trần ' + GITA_TRAN_XUAT_NGAY + ' lần xuất một ngày.' };

  // 3. Tạo bảng tính trong đúng thư mục
  var thuMuc = DriveApp.getFolderById(GITA_THU_MUC_XUAT);
  var maBan = String(y.maBan || '').slice(0, 40) || 'GITA-' + new Date().getTime();
  var ten = maBan + ' · ' + String(y.ten || 'Bảng dữ liệu').slice(0, 80);

  var ss = SpreadsheetApp.create(ten);
  var sh = ss.getActiveSheet();
  sh.setName(String(y.ten || 'Dữ liệu').slice(0, 90));

  // Ngăn công thức: mọi ô ghi dưới dạng chuỗi, ô bắt đầu bằng = + - @ được thêm dấu nháy
  var an = function (v) {
    var t = (v === null || v === undefined) ? '' : String(v);
    return /^[=+\-@\t\r]/.test(t) ? "'" + t : t;
  };
  var bang = [cot.map(an)].concat(dong.map(function (r) { return (r || []).map(an); }));
  sh.getRange(1, 1, bang.length, cot.length).setValues(
    bang.map(function (r) {
      var d = r.slice(0, cot.length);
      while (d.length < cot.length) d.push('');
      return d;
    })
  );
  sh.getRange(1, 1, 1, cot.length).setFontWeight('bold').setBackground('#F5B942');
  sh.setFrozenRows(1);
  sh.autoResizeColumns(1, cot.length);

  // Trang thứ hai: dấu vết xuất — ai, lúc nào, từ máy nào
  var v = ss.insertSheet('Dấu vết');
  v.getRange(1, 1, 7, 2).setValues([
    ['Mã bản', maBan],
    ['Loại dữ liệu', String(y.loai || '')],
    ['Người xuất', hoSo.u],
    ['Vai', hoSo.role + ' — ' + ((ROLES[hoSo.role] || {}).n || '')],
    ['Lúc xuất', Utilities.formatDate(new Date(), 'GMT+7', 'dd/MM/yyyy HH:mm:ss')],
    ['Số dòng', dong.length],
    ['Ghi chú', 'Tài sản của Học viện GITA. Bản này được ghi vào nhật ký và truy nguồn được theo mã bản.']
  ]);
  v.getRange(1, 1, 7, 1).setFontWeight('bold');
  v.autoResizeColumns(1, 2);

  // 4. Chuyển vào thư mục Admin, gỡ khỏi thư mục gốc của tài khoản chạy script
  var tep = DriveApp.getFileById(ss.getId());
  thuMuc.addFile(tep);
  try { DriveApp.getRootFolder().removeFile(tep); } catch (e) { /* đã ở đúng chỗ */ }
  // Không chia sẻ cho ai — Admin tự phân phối từ Drive
  try { tep.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE); } catch (e) {}

  ghiNhatKy_({
    viec: 'XUAT_SHEET', u: hoSo.u, role: hoSo.role, tier: hoSo.tier,
    goi: String(y.loai || ''), may: String(y.may || '').slice(0, 120), phien: hoSo.phien,
    chiTiet: maBan + ' · ' + dong.length + ' dòng · ' + ss.getId()
  });

  return { ok: true, url: ss.getUrl(), id: ss.getId(), maBan: maBan, soDong: dong.length };
}


/* ═══════════════════════════════════════════════════════════════════════
   BẢN WEB — doGet: phục vụ trang, trả gói kho, báo tình trạng
   (nguyên văn server/GITA_BanWeb.gs)
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * ═══════════════════════════════════════════════════════════════
 * GITA 365 — BẢN WEB PHỤC VỤ THẲNG TỪ APPS SCRIPT
 *
 * Bình thường bản web nằm ở một chỗ khác (GitHub Pages, hoặc gita.edu.vn)
 * và chỉ gọi về đây để xin khoá. Nhưng như vậy phải dựng thêm một chỗ nữa,
 * phải mua tên miền, và bản web nằm ngoài tay Học viện.
 *
 * Tệp này bỏ được bước đó: chính dự án Apps Script phục vụ luôn bản web.
 * Địa chỉ /exec vừa là máy chủ vừa là trang. Không thuê hosting, không tên
 * miền, không kho mã công khai — mọi thứ nằm trong Drive của Học viện.
 *
 * ── CẦN CHUẨN BỊ GÌ ──
 * Trong thư mục "Bản web GITA365" trên Drive, đặt:
 *     GITA365.html      vỏ ứng dụng, một tệp duy nhất
 *     nen.enc  nghe.enc  tang1.enc … tang5.enc      bảy gói kho
 *     mau.json          dữ liệu mẫu cho chế độ chưa cấp phép
 *
 * Bảy tệp .enc đã mã hoá AES-256-GCM. Đặt chúng ở đâu cũng được — không có
 * khoá thì chúng là một đống byte vô nghĩa. Khoá vẫn do doPost cấp, sau khi
 * đăng nhập, theo đúng vai và tầng.
 *
 * ── APPS SCRIPT CHỈ CHO MỘT doGet ──
 * Nên doGet ở đây là bộ định tuyến duy nhất của cả dự án:
 *     /exec                 → bản web
 *     /exec?viec=trangthai  → JSON tình trạng máy chủ
 *     /exec?goi=nghe        → một gói kho, dạng base64
 * ═══════════════════════════════════════════════════════════════
 */

/** Thư mục chứa bản web. Để trống thì dùng chung thư mục mã. */
var GITA_THU_MUC_WEB = '';

/** Tên tệp vỏ ứng dụng trong thư mục đó. */
var GITA_TEP_WEB = 'GITA365.html';

function gitaThuMucWeb_() {
  return GITA_THU_MUC_WEB || GITA_THU_MUC_MA;
}

/** Tìm một tệp theo tên trong thư mục bản web. Trả null nếu không có. */
function gitaTimTep_(ten) {
  var tm;
  try { tm = DriveApp.getFolderById(gitaThuMucWeb_()); } catch (e) { return null; }
  var ds = tm.getFilesByName(ten);
  return ds.hasNext() ? ds.next() : null;
}

/* ═══════════════ BỘ ĐỊNH TUYẾN ═══════════════ */
function doGet(e) {
  var t = (e && e.parameter) || {};

  if (t.viec === 'trangthai') return gitaTrangThai_();
  if (t.goi) return gitaTraGoi_(String(t.goi));
  /* ?dangnhap=1 — bỏ phiên đang nhớ và ra thẳng màn đăng nhập.
     Bản Apps Script chạy trong khung sandbox, nên gõ #dangnhap vào thanh
     địa chỉ không chạm tới được trang bên trong. Phải có đường qua máy chủ. */
  return gitaTrangWeb_(!!(t.dangnhap || t.dangxuat));
}

/* ═══════════════ TRẢ BẢN WEB ═══════════════ */
function gitaTrangWeb_(raNgoai) {
  var tep = gitaTimTep_(GITA_TEP_WEB);
  if (!tep) return HtmlService.createHtmlOutput(gitaTrangHuongDan_())
    .setTitle('GITA 365 — chưa đặt bản web');

  var html = tep.getBlob().getDataAsString('UTF-8');

  /* Nối bản web với chính máy chủ này. Hai dòng dưới đây thay cho việc phải
     sửa cau-hinh.js bằng tay: trang biết địa chỉ máy chủ, và biết lấy kho
     qua đường nào. */
  var diaChi = ScriptApp.getService().getUrl();
  var tiem = '<script>' +
    'window.G = window.G || {};' +
    'window.G.API_CAP_PHEP = ' + JSON.stringify(diaChi) + ';' +
    'window.GITA_NGUON_KHO = ' + JSON.stringify(diaChi + '?goi=') + ';' +
    'window.GITA_CUA_DANG_NHAP = ' + JSON.stringify(diaChi + '?dangnhap=1') + ';' +
    (raNgoai ? 'window.GITA_RA_NGOAI = true;' : '') +
    '</script>';

  /* Chèn ngay sau <head> nếu có, không thì lên đầu tệp. */
  var i = html.toLowerCase().indexOf('<head>');
  html = (i >= 0) ? html.slice(0, i + 6) + tiem + html.slice(i + 6) : tiem + html;

  return HtmlService.createHtmlOutput(html)
    .setTitle('GITA 365 — Hệ Sinh Thái Gia Đình Thịnh Vượng')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/* ═══════════════ TRẢ MỘT GÓI KHO ═══════════════
   Gói đã mã hoá sẵn, nên đường này không cần phiên: không có khoá thì tệp
   là một đống byte vô nghĩa. Vẫn chỉ nhận đúng bảy tên gói, để không ai
   dùng tham số này đọc tệp khác trong Drive. */
var GITA_GOI_HOP_LE = ['nen', 'nghe', 'tang1', 'tang2', 'tang3', 'tang4', 'tang5'];

function gitaTraGoi_(ten) {
  var json = function (o) {
    return ContentService.createTextOutput(JSON.stringify(o))
      .setMimeType(ContentService.MimeType.JSON);
  };

  if (ten === 'mau') {
    var tm = gitaTimTep_('mau.json');
    if (!tm) return json({ok: false, error: 'Chưa đặt mau.json trong thư mục bản web.'});
    return ContentService.createTextOutput(tm.getBlob().getDataAsString('UTF-8'))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (GITA_GOI_HOP_LE.indexOf(ten) < 0)
    return json({ok: false, error: 'Không có gói tên này.'});

  var tep = gitaTimTep_(ten + '.enc');
  if (!tep) return json({ok: false, error: 'Chưa đặt ' + ten + '.enc trong thư mục bản web.'});

  /* base64 vì ContentService chỉ trả được chữ, không trả được byte thô.
     Trình duyệt giải ngược lại trước khi đưa vào WebCrypto. */
  return json({ok: true, goi: ten, du: Utilities.base64Encode(tep.getBlob().getBytes())});
}

/* ═══════════════ TRANG KHI CHƯA ĐẶT BẢN WEB ═══════════════
   Không để trắng màn hình. Nói thẳng còn thiếu gì và lấy ở đâu. */
function gitaTrangHuongDan_() {
  var tm = '';
  try { tm = DriveApp.getFolderById(gitaThuMucWeb_()).getName(); } catch (e) { tm = '(không mở được)'; }

  var co = [], thieu = [];
  ['GITA365.html', 'mau.json'].concat(GITA_GOI_HOP_LE.map(function (g) { return g + '.enc'; }))
    .forEach(function (t) { (gitaTimTep_(t) ? co : thieu).push(t); });

  return '<!doctype html><meta charset="utf-8">' +
    '<style>body{font:15px/1.7 system-ui,sans-serif;max-width:640px;margin:48px auto;padding:0 20px;' +
    'color:#1a1a2e;background:#F6F3FC}h1{font-size:22px;color:#185AB4;margin-bottom:4px}' +
    'code{background:#fff;padding:2px 6px;border-radius:4px;font-size:13px}' +
    'li{margin:4px 0}.x{color:#BE0E16}.v{color:#0B7350}</style>' +
    '<h1>GITA 365 — máy chủ đã chạy, bản web chưa đặt</h1>' +
    '<p>Máy chủ sống và trả lời được. Còn thiếu các tệp của bản web trong thư mục ' +
    '<b>' + tm + '</b>.</p>' +
    '<h3>Đã có (' + co.length + ')</h3><ul>' +
    (co.length ? co.map(function (t) { return '<li class="v">✓ <code>' + t + '</code></li>'; }).join('')
               : '<li>chưa có tệp nào</li>') +
    '</ul><h3>Còn thiếu (' + thieu.length + ')</h3><ul>' +
    thieu.map(function (t) { return '<li class="x">✕ <code>' + t + '</code></li>'; }).join('') +
    '</ul><p>Tải cả bộ từ kho mã của Học viện, rồi kéo thả vào thư mục trên. ' +
    'Xong thì tải lại trang này.</p>' +
    '<p style="color:#666;font-size:13px">Máy chủ vẫn dùng được ngay cả khi chưa đặt bản web — ' +
    'bản web ở chỗ khác vẫn gọi về địa chỉ này xin khoá như thường.</p>';
}
