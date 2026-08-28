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

  // Phụ huynh và học viên: chỉ tầng đang học và các tầng đã đi qua
  var tang = Number(hoSo.tier || 1);
  for (var j = 1; j <= Math.max(1, Math.min(5, tang)); j++) ds.push('tang' + j);
  return ds;
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
    var y = JSON.parse(e.postData.contents || '{}');
    if (y.fn !== 'capKhoa') return ra({ ok: false, error: 'Yêu cầu không hợp lệ.' });

    // 1. Xác thực phiên — dùng đúng lớp bảo mật sẵn có của hệ thống
    var hoSo = kiemTraPhien_(y.token, y.u);
    if (!hoSo) return ra({ ok: false, code: 'AUTH', error: 'Phiên không hợp lệ hoặc đã hết hạn.' });
    if (hoSo.khoa) return ra({ ok: false, code: 'LOCKED', error: 'Tài khoản đang bị khoá.' });

    // 2. Tính phạm vi được cấp, giao nhau với danh sách client xin
    var duocCap = gitaPhamViCapPhep(hoSo);
    var xin = Array.isArray(y.goi) ? y.goi : duocCap;
    var cap = duocCap.filter(function (g) { return xin.indexOf(g) >= 0; });

    // 3. Lấy khoá và chỉ trả đúng phần được cấp
    var kho = JSON.parse(PropertiesService.getScriptProperties().getProperty('GITA_KHOA_KHO') || '{}');
    var traVe = {};
    cap.forEach(function (g) { if (kho[g]) traVe[g] = kho[g]; });

    // 4. Ghi nhật ký — ai, lúc nào, mở gói nào, trên máy nào
    ghiNhatKy_({
      viec: 'CAP_KHOA', u: hoSo.u, role: hoSo.role, tier: hoSo.tier,
      goi: cap.join(','), may: String(y.may || '').slice(0, 120),
      ip: (e.parameter && e.parameter.ip) || ''
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

/* ───────────────────────────────────────────────────────────────
   Hai hàm dưới nối vào lớp sẵn có của hệ thống v6.9.
   Thay phần thân bằng lời gọi thật trong 02_Security.gs và 09_Jobs.gs.
   ─────────────────────────────────────────────────────────────── */

/** Trả về hồ sơ {u, role, tier, khoa} nếu phiên hợp lệ, ngược lại null. */
function kiemTraPhien_(token, u) {
  // return SEC_kiemTraToken(token, u);        // ← 02_Security.gs
  throw new Error('Chưa nối kiemTraPhien_ vào 02_Security.gs — không được chạy thật khi chưa nối.');
}

/** Ghi một dòng nhật ký chỉ thêm, không sửa, không xoá. */
function ghiNhatKy_(muc) {
  // JOB_ghiNhatKy('CAP_PHEP', muc);           // ← 09_Jobs.gs
  Logger.log(JSON.stringify(muc));
}
