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
