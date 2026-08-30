/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · TẦNG SỐ LIỆU
   Nạp sau nen/dan-xuat.js. Không dựng gì ra màn hình — nó chỉ trả
   lời được một câu hỏi, nhưng là câu hỏi mà không bộ kiểm nào
   trước đó trả lời được:

     *Hệ này nói về chính nó có đúng không?*

   Tiêu đề màn viết "Mười hai khoảnh khắc quyết định". Kho giữ mảng
   khoảnh khắc. Hai thứ ấy ở hai tệp khác nhau, và không có gì buộc
   chúng khớp nhau. Thêm một khoảnh khắc thứ mười ba thì tiêu đề
   thành nói dối — một lời nói dối rất nhỏ, rất khó thấy, và chính
   vì thế mà nó sống lâu.

   Tầng này đọc SỐ VIẾT BẰNG CHỮ trong tiêu đề, đối chiếu với độ
   dài mảng mà màn ấy thật sự dựng ra, và báo chỗ lệch.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── Số đếm tiếng Việt, một tới một trăm ─────────────────── */
  var DON = { 'không': 0, 'một': 1, 'mốt': 1, 'hai': 2, 'ba': 3, 'bốn': 4, 'tư': 4,
              'năm': 5, 'lăm': 5, 'sáu': 6, 'bảy': 7, 'bẩy': 7, 'tám': 8,
              'chín': 9, 'mười': 10, 'mươi': 10 };

  /* "mười hai" → 12 · "hai mươi mốt" → 21 · "một trăm" → 100 */
  function docSo(cum) {
    var t = cum.toLowerCase().trim().split(/\s+/);
    if (!t.length) return null;
    if (t.length === 1) return DON[t[0]] != null ? DON[t[0]] : null;
    if (t.length === 2) {
      if (t[0] === 'mười' && DON[t[1]] != null && DON[t[1]] < 10) return 10 + DON[t[1]];
      if (t[1] === 'mươi' && DON[t[0]] != null) return DON[t[0]] * 10;
      if (t[1] === 'trăm' && DON[t[0]] != null) return DON[t[0]] * 100;
      return null;
    }
    if (t.length === 3 && t[1] === 'mươi' && DON[t[0]] != null && DON[t[2]] != null)
      return DON[t[0]] * 10 + DON[t[2]];
    return null;
  }

  /* Tìm số viết bằng chữ ở ĐẦU một câu — "Mười hai khoảnh khắc…".
     Chỉ nhận ở đầu, vì "năm" giữa câu thường là năm tháng chứ không
     phải số đếm, và "tư" thường là tư vấn. */
  var DV = 'một|hai|ba|bốn|tư|năm|lăm|mốt|sáu|bảy|bẩy|tám|chín';
  var MAU = new RegExp(
    '^(' +
    '(?:một|hai|ba|bốn|năm|sáu|bảy|bẩy|tám|chín)\\s+mươi(?:\\s+(?:' + DV + '))?' +
    '|(?:một|hai|ba|bốn|năm|sáu|bảy|bẩy|tám|chín)\\s+trăm' +
    '|mười(?:\\s+(?:' + DV + '))?' +
    '|một|hai|ba|bốn|năm|sáu|bảy|bẩy|tám|chín' +
    ')(?=\\s|$)', 'i');

  /* Bẫy của tiếng Việt: "năm" vừa là số 5 vừa là đơn vị thời gian,
     "tư" vừa là 4 vừa là tư vấn. Sau số đếm mà tới một trong những
     từ này thì đó không phải số đếm. */
  var KHONG_PHAI_DEM = {
    'đầu': 1, 'sau': 1, 'nay': 1, 'ngoái': 1, 'tới': 1, 'trước': 1, 'học': 1,
    'duy': 1, 'thế': 1, 'lần': 1, 'là': 1, 'mà': 1, 'thì': 1, 'của': 1,
    'này': 1, 'ấy': 1, 'đó': 1, 'phương': 1,
    /* đơn vị thời gian: "chín mươi ngày" là quãng, không phải số mục */
    'ngày': 1, 'tuần': 1, 'tháng': 1, 'năm': 1, 'giờ': 1, 'phút': 1, 'giây': 1
  };
  /* Chặn theo CẶP chứ không theo từ đơn: "tư cách" không phải số 4,
     nhưng "tám cách" thì là số 8. */
  var CAP_CHAN = { 'tư vấn': 1, 'tư cách': 1, 'tư duy': 1, 'tư liệu': 1,
                   'năm sinh': 1, 'ba mẹ': 1, 'tám chuyện': 1 };

  function soODau(chuoi) {
    var c = String(chuoi || '').trim();
    /* Tiêu đề ghép — "Hai hệ, hai câu hỏi" — thì con số nói về vế
       của nó, không nói về mảng dựng ngay sau. Không đoán, bỏ qua. */
    if (/[,;]/.test(c)) return null;
    var m = MAU.exec(c);
    if (!m) return null;
    var con = c.slice(m[1].length).trim();
    var tuSau = con.split(/[\s·—–,.:;]/)[0].toLowerCase();
    if (!tuSau) return null;
    if (KHONG_PHAI_DEM[tuSau]) return null;
    if (CAP_CHAN[(m[1] + ' ' + tuSau).toLowerCase()]) return null;
    if (/^\d/.test(tuSau)) return null;           /* "Năm 2026 tới…" */
    var n = docSo(m[1]);
    return n == null || n < 2 ? null : n;
  }

  /* Độ dài thật của thứ một khối dựng ra.
     Trả về CẢ HAI con số khi dữ liệu lồng hai tầng: số nhóm ngoài
     và tổng số mục bên trong. "Mười bảy vai" xếp trong năm nhóm —
     tiêu đề nói mười bảy là đúng, và năm cũng là đúng. Khớp một
     trong hai thì coi là khớp. */
  function doDai(o) {
    var d = o.tu ? G.TU[o.tu] : o.ds;
    if (d && typeof d === 'object' && !Array.isArray(d) && Array.isArray(d.bang))
      return [d.bang.length];
    if (!Array.isArray(d)) return null;
    var ra = [d.length], trong = 0, deu = d.length > 0;
    d.forEach(function (x) {
      if (x && typeof x === 'object' && Array.isArray(x.ds)) trong += x.ds.length;
      else deu = false;
    });
    if (deu && trong && trong !== d.length) ra.push(trong);
    return ra;
  }

  /* Loại khối mà độ dài mảng KHÔNG tương ứng với con số ở tiêu đề
     (khối gom nhóm, khối một mảnh) */
  var BO_QUA = { van: 1, muc: 1, trich: 1, ma: 1, so: 1, luat1: 1, phamvi: 1,
                 an: 1, chimuc: 1, the: 1, cd: 1, cl: 1, tudien: 1, faq: 1 };

  G.doiChieuSo = function () {
    var loi = [];
    Object.keys(G.MAN || {}).forEach(function (v) {
      var m = G.MAN[v];
      /* 1 · tiêu đề màn so với khối NỘI DUNG đầu tiên */
      var coMuc = (m.khoi || []).some(function (o) { return o.k === 'muc'; });
      var n = coMuc ? null : soODau(m.t);
      /* Màn chia mục con thì con số ở tiêu đề nói về CÁC MỤC, không
         nói về mảng đầu tiên — nên chỉ đối chiếu màn một chủ đề. */
      if (n != null) {
        var dau = (m.khoi || []).filter(function (o) { return !BO_QUA[o.k]; })[0];
        var d = dau ? doDai(dau) : null;
        if (d && d.indexOf(n) < 0)
          loi.push('Màn ' + v + ': tiêu đề nói "' + n + '" nhưng ' +
                   (dau.tu || dau.k) + ' có ' + d.join(' hoặc ') + ' mục');
      }
      /* 2 · từng tiêu đề mục con so với khối ngay sau nó */
      var ds = m.khoi || [];
      for (var i = 0; i < ds.length; i++) {
        if (ds[i].k !== 'muc') continue;
        var sn = soODau(ds[i].t);
        if (sn == null) continue;
        for (var j = i + 1; j < ds.length; j++) {
          if (BO_QUA[ds[j].k]) continue;
          var dd = doDai(ds[j]);
          if (dd && dd.indexOf(sn) < 0)
            loi.push('Màn ' + v + ' · mục "' + ds[i].t + '" nói "' + sn +
                     '" nhưng ' + (ds[j].tu || ds[j].k) + ' có ' + dd.join(' hoặc ') + ' mục');
          break;
        }
      }
    });
    /* 3 · tên nhóm điều hướng so với số màn thật trong nhóm */
    (G.NHOM || []).forEach(function (nh) {
      var n2 = soODau(nh.t);
      if (n2 != null && nh.ds.length !== n2)
        loi.push('Nhóm ' + nh.no + ': tên nói "' + n2 + '" nhưng có ' + nh.ds.length + ' màn');
    });
    return loi;
  };

  G.docSo = docSo;
  G.soODau = soODau;

})(window.GV = window.GV || {});
