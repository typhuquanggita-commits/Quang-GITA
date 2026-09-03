/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÁY CHẠY HOA HỒNG KÈM VÀ SỔ CHỨNG CỨ

   Kho chuẩn ở kho-goc/data.hoa-hong-kem.js.

   ĐÂY LÀ TỆP DUY NHẤT TRONG src/ RA TIỀN THẬT

   Mọi tệp khác sai thì sửa. Tệp này sai thì kết thúc ở toà. Nên nó có
   ba thói quen khác hẳn phần còn lại của kho:

     · Không hàm nào trả về một con số TIỀN khi chưa có giá. Trả về tỉ
       lệ, kèm câu nói rõ nó chưa nhân được với cái gì.
     · Không bản ghi nào sửa được sau khi đối phương đã xác nhận. Sai
       thì ghi bản đính chính trỏ về bản cũ, và cả hai cùng ở lại.
     · Chỗ nào máy KHÔNG chứng minh được thì nó nói thẳng là không —
       dấu kiểm không phải chữ ký số, giờ máy khách không phải bằng
       chứng. Giấu hai chỗ ấy mới làm hồ sơ yếu đi.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  /* ═══════════ AI ĐĂNG KÝ NHẬN KÈM ĐƯỢC ═══════════
     Từ tầng bốn trở lên. Số tầng đọc từ HT_TANG.so, không so chuỗi. */
  G.hhDangKyDuoc = function (tangNhaKem) {
    var tu = (G.HH_KEM || {}).tuTang;
    if (!tu) return { ok: false, y: 'Kho chưa khai từ tầng nào được nhận kèm.' };
    var a = (G.HT_TANG || []).filter(function (x) { return x.ma === tangNhaKem; })[0];
    var b = (G.HT_TANG || []).filter(function (x) { return x.ma === tu; })[0];
    if (!a || !b) return { ok: false, y: 'Chưa đọc được số của tầng.' };
    if (a.so < b.so) return { ok: false, tuTang: tu,
      y: 'Nhà ở tầng ' + a.so + ' chưa đăng ký nhận kèm được. Từ tầng ' + b.so +
        ' trở lên — ' + ((G.HH_KEM || {}).viTuTangBon || '') };
    return { ok: true, tuTang: tu };
  };

  /* ═══════════ TỈ LỆ HOA HỒNG ═══════════
     Đọc bậc từ HH_BAC, và trần từ HOAHONG.tran. Không con số nào gõ ở
     đây. Bậc nào đòi gì thì chính bậc ấy khai ra ở cột `doi`. */
  G.hhTinh = function (d) {
    d = d || {};
    var tran = (G.HOAHONG || {}).tran;
    var bac = (G.HH_BAC || []).slice().sort(function (a, b) { return b.phanTram - a.phanTram; });
    var thieu = [];
    if (d.vuotTang !== true) thieu.push('Nhà được kèm chưa hoàn thành KPI vượt tầng.');
    var kA = Number(d.kpiKem), kB = Number(d.kpiDuocKem);
    if (!(kA >= 0)) thieu.push('Chưa có KPI của nhà kèm.');
    if (thieu.length) return { phanTram: 0, bac: null, dat: false, thieu: thieu, tran: tran };
    for (var i = 0; i < bac.length; i++) {
      var b = bac[i], o = b.doi || {};
      if (o.nhaDuocKemVuotTang && d.vuotTang !== true) continue;
      if (o.kpiNhaKem != null && !(kA >= o.kpiNhaKem)) continue;
      if (o.kpiNhaDuocKem != null && !(kB >= o.kpiNhaDuocKem)) continue;
      /* Trần của cả hệ vẫn chặn trên cùng, kể cả khi một bậc khai cao
         hơn. Trần mà không có hàm chặn thì sáu tháng sau nó chỉ là một
         câu chữ. */
      var pt = tran != null ? Math.min(b.phanTram, tran) : b.phanTram;
      return { phanTram: pt, bac: b.ma, bacTen: b.ten, dat: true, thieu: [], tran: tran,
        chamTran: tran != null && pt >= tran };
    }
    return { phanTram: 0, bac: null, dat: false, tran: tran,
      thieu: ['KPI của nhà kèm chưa tới ngưỡng thấp nhất của bậc nào.'] };
  };

  /* SỐ TIỀN — và vì sao nó chưa ra được.
     HP_TANG ở gói NGHỀ vì nó chứa giá; máy gia đình đọc HP_NGAY, mà bản
     rút ấy không mang giá. Cả hai đường đều dẫn tới cùng một câu trả
     lời hôm nay: chưa có giá. */
  G.hhTien = function (phanTram, tangDuocKem) {
    var t = (G.HP_TANG || []).filter(function (x) { return x.tang === tangDuocKem; })[0];
    if (!t) return { chuaCoGia: true,
      thieu: 'Bảng học phí nằm ở gói nghề — máy này chưa mở được.' };
    if (t.gia == null) return { chuaCoGia: true, tang: tangDuocKem,
      thieu: 'HP_TANG.gia của tầng ' + tangDuocKem.slice(1) + ' đang để trống. Tỉ lệ ' +
        phanTram + '% đã tính được, nhưng chưa nhân được với cái gì.' };
    return { chuaCoGia: false, tang: tangDuocKem, gia: t.gia, donVi: t.donVi,
      tien: Math.round(t.gia * phanTram / 100) };
  };

  /* ═══════════ DẤU KIỂM NỘI DUNG ═══════════
     KHÔNG PHẢI CHỮ KÝ SỐ, và tên hàm cố ý không gọi là "ký". Nó bắt
     được sửa vô ý và sửa cẩu thả; nó không chặn được người cố tình dựng
     lại cả bản ghi lẫn dấu. Chữ ký thật ký ở máy chủ. */
  function chuanHoa(o) {
    return ['nhiemVu', 'ngayLam', 'loai', 'noiDung', 'nguoiGhi', 'luc']
      .map(function (k) { return k + '=' + String(o[k] == null ? '' : o[k]); }).join('');
  }
  G.ccVanTay = function (o) {
    var s = typeof o === 'string' ? o : chuanHoa(o || {});
    var a = 0x811c9dc5;
    for (var i = 0; i < s.length; i++) {
      a ^= s.charCodeAt(i);
      a = (a + ((a << 1) + (a << 4) + (a << 7) + (a << 8) + (a << 24))) >>> 0;
    }
    return ('00000000' + a.toString(16)).slice(-8);
  };

  /* ═══════════ SỔ CHỨNG CỨ ═══════════ */
  function so() { if (G.S && !G.S.ccSo) G.S.ccSo = []; return (G.S && G.S.ccSo) || []; }
  G.ccDanhSach = function () { return so().slice(); };

  G.ccThieuTruong = function (o) {
    return (G.HH_CHUNGCU || []).filter(function (c) {
      return c.buoc === true && c.cot !== 'ma' && c.cot !== 'luc' &&
        c.cot !== 'nguonGio' && c.cot !== 'vanTay' &&
        !String((o || {})[c.cot] || '').trim();
    }).map(function (c) { return c.ten; });
  };

  G.ccGhi = function (o) {
    o = o || {};
    var thieu = G.ccThieuTruong(o);
    if (thieu.length) return { ok: false, thieu: thieu,
      y: 'Chưa nộp được. Còn thiếu: ' + thieu.join(' · ') };
    if (!(G.HH_LOAI_CC || []).filter(function (x) { return x.ma === o.loai; })[0])
      return { ok: false, y: 'Loại chứng cứ không có trong bảng.' };
    var coViec = (G.BD_LON || []).some(function (b) {
      return (b.nho || []).some(function (n) { return n.ma === o.nhiemVu; });
    });
    if (!coViec) return { ok: false,
      y: 'Mã nhiệm vụ "' + o.nhiemVu + '" không có trong kho việc.' };
    var t = { ma: 'CC-' + Date.now().toString(36) + '-' + so().length,
      nhiemVu: o.nhiemVu, ngayLam: o.ngayLam, loai: o.loai,
      noiDung: String(o.noiDung).trim(), nguoiGhi: o.nguoiGhi,
      luc: Date.now(),
      /* Giờ máy khách KHÔNG phải bằng chứng — cột này nói thẳng ra chỗ
         ấy, và nó chỉ đổi được khi máy chủ đóng dấu. */
      nguonGio: 'may-khach',
      xacNhan: null, dinhChinhCho: o.dinhChinhCho || null };
    t.vanTay = G.ccVanTay(t);
    G.S.ccSo = [t].concat(so());
    if (G.save) G.save();
    return { ok: true, cc: t };
  };

  /* Nhà ĐƯỢC KÈM xác nhận. Chỗ chống làm giả mạnh nhất của cả bảng:
     một người không tự dựng được hồ sơ cho mình. */
  G.ccXacNhan = function (ma, nguoiXacNhan) {
    var t = so().filter(function (x) { return x.ma === ma; })[0];
    if (!t) return { ok: false, y: 'Không thấy bản ghi này.' };
    if (t.xacNhan) return { ok: false, y: 'Bản này đã được xác nhận rồi — không xác nhận lại.' };
    if (!String(nguoiXacNhan || '').trim())
      return { ok: false, y: 'Chưa có người xác nhận.' };
    if (String(nguoiXacNhan).trim() === String(t.nguoiGhi).trim())
      return { ok: false, y: 'Người ghi không tự xác nhận cho mình được. ' +
        ((G.HH_CC_LUAT || {}).viHaiChuKy || '') };
    t.xacNhan = { ai: String(nguoiXacNhan).trim(), luc: Date.now(), nguonGio: 'may-khach' };
    if (G.save) G.save();
    return { ok: true, cc: t };
  };

  /* Đã xác nhận thì KHOÁ. Sai thì ghi bản đính chính trỏ về bản cũ —
     xoá bản sai là xoá luôn bằng chứng rằng đã từng có bản sai. */
  G.ccSuaDuoc = function (ma) {
    var t = so().filter(function (x) { return x.ma === ma; })[0];
    return !!t && !t.xacNhan;
  };
  G.ccDinhChinh = function (ma, o) {
    var t = so().filter(function (x) { return x.ma === ma; })[0];
    if (!t) return { ok: false, y: 'Không thấy bản ghi này.' };
    var moi = {}, k;
    for (k in (o || {})) if (Object.prototype.hasOwnProperty.call(o, k)) moi[k] = o[k];
    moi.dinhChinhCho = ma;
    return G.ccGhi(moi);
  };

  /* Soi cả sổ: dấu kiểm còn khớp không, bản nào chưa đối chứng. */
  G.ccSoi = function () {
    var lech = [], chuaXac = [], dinhChinh = [];
    so().forEach(function (t) {
      if (G.ccVanTay(t) !== t.vanTay) lech.push(t.ma);
      if (!t.xacNhan) chuaXac.push(t.ma);
      if (t.dinhChinhCho) dinhChinh.push({ ma: t.ma, cho: t.dinhChinhCho });
    });
    return { tong: so().length, lech: lech, chuaXacNhan: chuaXac, dinhChinh: dinhChinh,
      gioMayChu: so().filter(function (t) { return t.nguonGio === 'may-chu'; }).length };
  };

  /* ═══════════ HỒ SƠ MỘT LẦN ĐÒI HOA HỒNG ═══════════
     Chỉ chứng cứ ĐÃ ĐỐI CHỨNG mới được tính. Bản chưa xác nhận vẫn nằm
     trong sổ, nhưng đứng ngoài hồ sơ. */
  G.hhHoSo = function (d) {
    d = d || {};
    var tinh = G.hhTinh(d);
    var s = G.ccSoi();
    var duoc = so().filter(function (t) { return !!t.xacNhan; });
    var canh = [];
    if (s.lech.length) canh.push('Có ' + s.lech.length + ' bản ghi dấu kiểm KHÔNG KHỚP — ' +
      'nội dung đã bị sửa sau khi ghi.');
    if (!s.gioMayChu) canh.push((G.HH_CC_LUAT || {}).viGioMayKhach || '');
    canh.push((G.HH_CC_LUAT || {}).viVanTay || '');
    return { tinh: tinh, tien: tinh.dat ? G.hhTien(tinh.phanTram, d.tangDuocKem) : null,
      soChungCu: so().length, daDoiChung: duoc.length,
      chuaDoiChung: s.chuaXacNhan.length, lech: s.lech,
      nopDuoc: tinh.dat && duoc.length > 0 && s.lech.length === 0,
      canh: canh.filter(Boolean) };
  };
})();
