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

  return { ok: true, keo: duLieu, mocTruong: moc, mocMayChu: ban.suaLuc, boQua: boQua };
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
