/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · BỘ MÁY PHÂN QUYỀN
   Một nguồn sự thật duy nhất: ứng dụng, bộ gộp và bộ kiểm phát hành
   đều hỏi đúng những hàm dưới đây. Không nơi nào được tự tính lại
   quyền theo cách riêng — hai chỗ tính khác nhau là hai chỗ sẽ lệch
   nhau sau vài lần sửa.

   ⚠ Đây là bộ máy quyết định HIỂN THỊ. Nó không phải bảo mật.
   Xem sáu luật phân quyền trong du-lieu-quyen.js.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (goc) {
  var GV = goc.GV || {};
  goc.GV = GV;

  function timVai(ma) {
    var d = GV.VAI || [], i;
    for (i = 0; i < d.length; i++) if (d[i].ma === ma) return d[i];
    return null;
  }

  /* Bậc quyền hiệu lực của một tài khoản.
     Vai thường: lấy lv của vai.
     Vai theo bậc (học viên): lấy lv mà bậc năng lực mở ra. */
  function lvHieuLuc(maVai, bac) {
    var v = timVai(maVai);
    if (!v) return 99;
    if (!v.theoBac) return v.lv;
    var d = GV.BAC_MO || [], i;
    for (i = 0; i < d.length; i++) if (d[i].bac === (bac || 'B1')) return d[i].lv;
    return v.lv;
  }

  /* Một tài khoản có mở được một quyền không.
     Thứ tự quyết định — cố ý đặt CẤM sau CHO để cấm luôn thắng:
       1. bậc so với trần của quyền
       2. bảng ghi đè "cho"
       3. bảng ghi đè "cam"  ← thắng tất cả  */
  function coQuyen(maVai, bac, q) {
    var tran = (GV.QUYEN_MAX || {})[q];
    if (tran == null) return false;                 /* quyền lạ thì đóng */
    var duoc = lvHieuLuc(maVai, bac) <= tran;
    var gd = (GV.GHI_DE || {})[maVai];
    if (gd) {
      if (!duoc && (gd.cho || []).indexOf(q) > -1) duoc = true;
      if (duoc && (gd.cam || []).indexOf(q) > -1) duoc = false;
    }
    return duoc;
  }

  /* Có mở được một MÀN không — gộp cả hai trục: quyền và bậc năng lực. */
  function duocPhep(maVai, bac, maMan) {
    var m = (GV.MAN || {})[maMan];
    if (!m) return false;
    if (!coQuyen(maVai, bac, m.q)) return false;
    if (m.bac) {
      var v = timVai(maVai);
      /* Vai không theo bậc thì bậc của màn không chặn được */
      if (v && v.theoBac) {
        var so = GV.BAC_SO || {};
        if ((so[bac || 'B1'] || 0) < (so[m.bac] || 0)) return false;
      }
    }
    return true;
  }

  /* Vì sao một màn bị khoá — để thẻ khoá nói được lý do thật */
  function lyDoKhoa(maVai, bac, maMan) {
    var m = (GV.MAN || {})[maMan];
    if (!m) return { ma: 'khong-co', n: 'Màn này không có trong kho.' };
    var v = timVai(maVai);
    if (m.bac && v && v.theoBac) {
      var so = GV.BAC_SO || {};
      if ((so[bac || 'B1'] || 0) < (so[m.bac] || 0)) {
        return { ma: 'bac', n: 'Phần này mở từ bậc ' + m.bac + '. Bậc mở theo bằng chứng, không mở theo thời gian chờ.' };
      }
    }
    var tang = null, i, d = GV.TANG_HT_UI || [];
    for (i = 0; i < d.length; i++) if (d[i].q === m.q) tang = d[i];
    return {
      ma: 'quyen',
      n: 'Phần này thuộc tầng “' + (tang ? tang.t : m.q) + '”. ' + (tang ? tang.mo : '')
    };
  }

  /* Đếm số màn một tài khoản mở được — dùng cho màn Phạm vi và bộ kiểm */
  function demMan(maVai, bac) {
    var d = 0;
    Object.keys(GV.MAN || {}).forEach(function (v) {
      if (duocPhep(maVai, bac, v)) d++;
    });
    return d;
  }

  /* Danh sách màn bị khoá, kèm lý do — cho màn Phạm vi của tôi */
  function manBiKhoa(maVai, bac) {
    var ra = [];
    Object.keys(GV.MAN || {}).forEach(function (v) {
      if (!duocPhep(maVai, bac, v)) ra.push({ v: v, t: GV.MAN[v].t, ly: lyDoKhoa(maVai, bac, v) });
    });
    return ra;
  }

  GV.timVai = timVai;
  GV.lvHieuLuc = lvHieuLuc;
  GV.coQuyen = coQuyen;
  GV.duocPhep = duocPhep;
  GV.lyDoKhoa = lyDoKhoa;
  GV.demMan = demMan;
  GV.manBiKhoa = manBiKhoa;
})(typeof window !== 'undefined' ? window : globalThis);
