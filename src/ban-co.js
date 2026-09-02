/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÁY CHẠY BÀN CỜ HÀNH TRÌNH

   Kho chuẩn ở kho-goc/data.ban-co.js.

   KHÔNG DỰNG KHO VIỆC MỚI

   Mười gợi ý mỗi ngày lấy từ mười bánh đà đã có: mỗi bánh đà đưa ra
   việc nhỏ KẾ TIẾP của nó — việc đầu tiên trong `nho` mà nhà mình chưa
   đặt lần nào. Một trăm việc đã nằm sẵn trong BD_LON từ lâu, mỗi việc
   đã có sẵn cả "làm gì" lẫn "rồi sẽ thấy gì".

   Dựng một kho nhiệm vụ thứ hai là để dành một ngày mà hai kho lệch
   nhau, và lúc ấy màn này bảo làm một việc còn màn bánh đà bảo làm việc
   khác.

   SỐ NGÀY CỦA TẦNG ĐỌC TỪ HP_TANG

   Bảy · hai mươi mốt · chín mươi · ba trăm sáu lăm · ba trăm sáu lăm.
   Con số ấy đã nằm trong bảng học phí; rút ra bằng cách đọc số đầu
   tiên trong tên chặng. HP_TANG ở gói NGHỀ, nên máy gia đình không có —
   và lúc ấy màn nói CHƯA ĐO ĐƯỢC kèm tên kho, không đoán một con số.

   MỘT CHỖ DỄ SAI: NGÀY THEO GIỜ MÁY NGƯỜI DÙNG

   Khoá ô là ngày địa phương, không phải ngày UTC. Dùng toISOString()
   thì nhà mình đặt quân lúc chín giờ tối giờ Việt Nam sẽ rơi vào ô của
   NGÀY HÔM SAU — và cái bàn cờ lệch đúng một ô suốt cả tầng.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  var U = G.U, h = U.h;
  var MA_TANG = ['T1', 'T2', 'T3', 'T4', 'T5'];

  /* Ngày địa phương. toISOString() trả về ngày UTC — chín giờ tối giờ
     Việt Nam đã là ngày hôm sau ở UTC, và bàn cờ lệch một ô cả tầng. */
  G.bcNgay = function (d) {
    d = d || new Date();
    var m = d.getMonth() + 1, n = d.getDate();
    return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (n < 10 ? '0' : '') + n;
  };

  /* Số ngày của một tầng — ĐỌC từ HP_TANG, không ghi lại ở đây. */
  G.bcSoNgay = function (tang) {
    /* HP_TANG ở gói NGHỀ vì nó chứa GIÁ. HP_NGAY là bản rút của chính nó,
       sinh ra lúc đóng gói và để ở gói NỀN — vì số ngày là LỜI HỨA với
       nhà mình, không phải bí mật, và bản đồ công khai đã in nó rồi.
       Máy nghề đọc bản đầy đủ, máy gia đình đọc bản rút. Một nguồn. */
    var t = (G.HP_TANG || []).filter(function (x) { return x.tang === tang; })[0];
    if (t) {
      var so = String(t.ten || '').match(/\d+/);
      return so ? Number(so[0]) : null;
    }
    var n = (G.HP_NGAY || []).filter(function (x) { return x.tang === tang; })[0];
    return n && n.ngay ? n.ngay : null;
  };

  function so() { return (G.S && G.S.banCo) || {}; }
  function soCua(tang) { return so()[tang] || {}; }

  /* ═══════════ MƯỜI GỢI Ý CỦA HÔM NAY ═══════════
     Mỗi bánh đà đưa ra việc nhỏ kế tiếp của nó. Đúng mười, vì có đúng
     mười bánh đà. */
  G.bcGoiY = function (tang) {
    if (!G.BD_LON) return [];
    var daDat = {};
    Object.keys(so()).forEach(function (t) {
      Object.keys(so()[t]).forEach(function (n) { daDat[so()[t][n].ma] = true; });
    });
    var iNay = MA_TANG.indexOf(tang);
    return (G.BD_LON || []).map(function (b) {
      var nho = (b.nho || []).filter(function (x) { return !daDat[x.ma]; })[0] || null;
      if (!nho) return null;
      var iB = MA_TANG.indexOf(b.tang);
      var muc = iB === iNay ? 'DUNG_TANG' : iB < iNay ? 'TANG_TRUOC' : 'TANG_SAU';
      var w = (G.BC_TRONGSO || []).filter(function (x) { return x.ma === muc; })[0] || {};
      return { ma: nho.ma, ten: nho.ten, viec: nho.viec, thay: nho.thay,
        banhDa: b.ma, banhDaTen: b.ten, tang: b.tang, c: b.c,
        muc: muc, mucTen: w.ten || '', diem: w.diem || 1 };
    }).filter(Boolean);
  };

  /* ═══════════ ĐẶT MỘT QUÂN ═══════════
     Ô đã đặt thì không xoá và không đặt đè — việc đã làm rồi thì đã làm
     rồi, và một bàn cờ sửa được thì nhìn nó không còn nghĩa gì. */
  G.bcDat = function (tang, maViec) {
    var g = G.bcGoiY(tang).filter(function (x) { return x.ma === maViec; })[0];
    if (!g) return { ok: false, y: 'Việc này không có trong mười gợi ý của hôm nay.' };
    G.S.banCo = G.S.banCo || {};
    G.S.banCo[tang] = G.S.banCo[tang] || {};
    var n = G.bcNgay();
    if (G.S.banCo[tang][n])
      return { ok: false, y: 'Hôm nay nhà mình đã đặt một quân rồi. Mai đặt tiếp.' };
    G.S.banCo[tang][n] = { ma: g.ma, bd: g.banhDa, diem: g.diem, c: g.c, muc: g.muc };
    if (G.save) G.save();
    return { ok: true, diem: g.diem, o: G.S.banCo[tang][n], viec: g };
  };

  /* ═══════════ ĐO ═══════════ */
  G.bcDo = function (tang) {
    var s = soCua(tang), ngay = Object.keys(s).sort();
    var tong = 0, bd = {};
    ngay.forEach(function (n) { tong += Number(s[n].diem) || 0; bd[s[n].bd] = true; });
    /* Chuỗi hiện tại: đếm ngược từ hôm nay, dừng ở ngày đầu tiên trống. */
    var chuoi = 0, d = new Date();
    for (;;) {
      if (!s[G.bcNgay(d)]) break;
      chuoi++; d = new Date(d.getTime() - 86400000);
    }
    /* Chuỗi dài nhất từng có */
    var dai = 0, chay = 0, truoc = null;
    ngay.forEach(function (n) {
      var t = new Date(n + 'T00:00:00').getTime();
      chay = (truoc !== null && t - truoc === 86400000) ? chay + 1 : 1;
      if (chay > dai) dai = chay;
      truoc = t;
    });
    var can = G.bcSoNgay(tang);
    return { soO: ngay.length, tong: tong, chuoi: chuoi, chuoiDai: dai,
      soBanhDa: Object.keys(bd).length, can: can,
      phanTram: can ? Math.min(100, Math.round(ngay.length * 100 / can)) : null,
      xong: can ? ngay.length >= can : false,
      daDatHomNay: !!s[G.bcNgay()] };
  };

  /* Mốc nào vừa chạm. Trả về mốc CAO NHẤT đạt được — nổi năm cái cùng
     lúc thì không cái nào được nhìn. */
  G.bcMocDat = function (tang) {
    var d = G.bcDo(tang), ra = [];
    if (d.xong) ra.push('XONG_TANG');
    if (d.soBanhDa >= 10) ra.push('DU_MUOI');
    if (d.can && d.soO >= Math.ceil(d.can / 2)) ra.push('NUA_BAN');
    if (d.chuoi >= 7) ra.push('BAY_LIEN');
    if (d.daDatHomNay) ra.push('MOI_NGAY');
    var thu = ['XONG_TANG', 'DU_MUOI', 'NUA_BAN', 'BAY_LIEN', 'MOI_NGAY'];
    for (var i = 0; i < thu.length; i++)
      if (ra.indexOf(thu[i]) >= 0)
        return (G.BC_MUNG || []).filter(function (m) { return m.ma === thu[i]; })[0] || null;
    return null;
  };

  /* ═══════════ SOI ═══════════ */
  G.bcSoi = function () {
    var loi = [], chuaDo = [];
    if ((G.BC_TRONGSO || []).length !== 3) loi.push('trọng số phải đúng 3 mức');
    var d = {};
    (G.BC_TRONGSO || []).forEach(function (t) {
      if (d[t.diem]) loi.push('hai mức cùng ' + t.diem + ' điểm');
      d[t.diem] = 1;
      if (!t.khi || !t.vi) loi.push(t.ma + ':thiếu cột');
    });
    (G.BC_MUNG || []).forEach(function (m) {
      if (!m.bieuTuong || !m.loi || !m.phu || !m.khi) loi.push(m.ma + ':mốc mừng thiếu cột');
    });
    if ((G.BC_TRONGSO_LUAT || {}).khongXepHang !== true) loi.push('chưa khai không xếp hạng');
    if ((G.BC_TRONGSO_LUAT || {}).khongPhatNgayBoLo !== true) loi.push('chưa khai không phạt ngày bỏ lỡ');
    /* Số ngày phải ĐỌC được từ HP_TANG cho cả năm tầng — nếu không thì
       bàn cờ không biết mình dài bao nhiêu ô. HP_TANG ở gói nghề. */
    if (!G.HP_TANG) chuaDo.push('HP_TANG');
    else MA_TANG.forEach(function (t) {
      if (!G.bcSoNgay(t)) loi.push(t + ':không đọc được số ngày từ HP_TANG');
    });
    return { loi: loi, chuaDo: chuaDo };
  };

  /* ═══════════════════════════════════════════════════════════
     MÀN HÌNH
     ═══════════════════════════════════════════════════════════ */
  function veBan(tang, can, s) {
    if (!can) return '';
    /* Bàn dài thì ô nhỏ lại chứ không cuộn: cả cái bàn phải nhìn được
       trong một mắt, vì nhìn được cả bàn mới là chỗ vui của cờ. */
    var cot = can <= 7 ? 7 : can <= 21 ? 7 : can <= 90 ? 15 : 28;
    var o = '<div class="bc-ban" style="--bc-cot:' + cot + '">';
    var d0 = null;
    Object.keys(s).sort().forEach(function (n) { if (!d0) d0 = n; });
    for (var i = 0; i < can; i++) {
      var ng = d0 ? G.bcNgay(new Date(new Date(d0 + 'T00:00:00').getTime() + i * 86400000)) : null;
      var q = ng ? s[ng] : null;
      o += '<i class="bc-o' + (q ? ' co' : '') + '"' +
        (q ? ' style="background:' + q.c + '" title="' + h(ng + ' · ' + q.bd + ' · +' + q.diem) + '"' : '') +
        '></i>';
    }
    return o + '</div>';
  }

  G.VIEWS['ban-co'] = function () {
    if (!G.BD_LON || !G.BC_TRONGSO)
      return U.empty('Chưa mở được bàn cờ', 'Phần này nằm trong gói nền. Đăng nhập lại để nạp.');

    var loi = G.BC_LOI || {};
    var tang = G.S.bcTang || 'T1';
    var s = soCua(tang), d = G.bcDo(tang);

    var o = U.ph({ eyebrow: 'BÀN CỜ HÀNH TRÌNH', ic: 'target', grad: 1,
      t: loi.la || '', lead: loi.viBanCo || '' });

    /* ── Chọn tầng ── */
    o += '<div class="row wrap mb" style="gap:8px">' + MA_TANG.map(function (t) {
      var n = G.bcSoNgay(t);
      return '<button class="btn ' + (t === tang ? 'pri' : 'ghost') + ' sm" data-bctang="' + t + '">' +
        'Tầng ' + t.slice(1) + (n ? '<span class="muted"> · ' + n + ' ngày</span>' : '') + '</button>';
    }).join('') + '</div>';

    if (!d.can) {
      o += '<div class="card mb"><p class="sm">Số ngày của tầng đọc từ bảng học phí, mà bảng ấy ' +
        'nằm ở gói nghề — máy này chưa mở được. Bàn cờ chưa biết mình dài bao nhiêu ô, nên ' +
        'chưa vẽ ra. Mười gợi ý bên dưới vẫn dùng được.</p></div>';
    } else {
      o += '<div class="bc-dinh">' +
        '<div class="bc-so"><b>' + d.soO + '</b><span>/ ' + d.can + ' ô đã có màu</span></div>' +
        '<div class="bc-so"><b>' + d.tong + '</b><span>điểm KPI</span></div>' +
        '<div class="bc-so"><b>' + d.chuoi + '</b><span>ngày liên tiếp</span></div>' +
        '<div class="bc-so"><b>' + d.soBanhDa + '</b><span>/ 10 bánh đà đã chạm</span></div></div>';
      o += veBan(tang, d.can, s);
      o += '<p class="bc-y">' + h(loi.viKienTri || '') + '</p>';
    }

    /* ── Mốc vừa chạm ── */
    var moc = G.bcMocDat(tang);
    if (moc)
      o += '<div class="bc-mung"><span class="bc-bt">' + h(moc.bieuTuong) + '</span>' +
        '<div><b>' + h(moc.loi) + '</b><p>' + h(moc.phu) + '</p></div></div>';

    /* ── Mười gợi ý ── */
    var gy = G.bcGoiY(tang);
    o += U.sec('MƯỜI VIỆC GỢI Ý — CHỌN ĐÚNG MỘT',
      d.daDatHomNay ? 'Hôm nay nhà mình đã đặt một quân. Mai đặt tiếp.'
        : 'Hệ bày ra mười việc. Nhà mình chọn một — chọn hộ thì việc ấy là việc của hệ.');
    o += '<div class="bc-ds">' + gy.map(function (g) {
      return '<button class="bc-viec" data-bcdat="' + h(g.ma) + '"' +
        (d.daDatHomNay ? ' disabled' : '') + ' style="--bc-c:' + g.c + '">' +
        '<span class="bc-diem">+' + g.diem + '</span>' +
        '<span class="bc-bd">' + h(g.banhDaTen) + ' · ' + h(g.mucTen) + '</span>' +
        '<b>' + h(g.ten) + '</b>' +
        '<span class="bc-lam">' + h(g.viec) + '</span>' +
        (g.thay ? '<span class="bc-thay">Rồi sẽ thấy: ' + h(g.thay) + '</span>' : '') +
        '</button>';
    }).join('') + '</div>';

    /* ── Ba mức trọng số, nói thẳng ── */
    o += U.sec('VÌ SAO VIỆC NÀY BA ĐIỂM, VIỆC KIA MỘT',
      (G.BC_TRONGSO_LUAT || {}).cot || '');
    o += '<div class="card mb">' + (G.BC_TRONGSO || []).map(function (t) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">+' + t.diem + ' · ' + h(t.ten) + '</b>' +
        '<p class="sm mt" style="line-height:1.75">' + h(t.khi) + '</p>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(t.vi) + '</p></div>';
    }).join('') + '</div>';
    o += '<p class="tiny dim mb" style="line-height:1.7"><b>' +
      h((G.BC_TRONGSO_LUAT || {}).viKhongXepHang || '') + '</b> ' +
      h((G.BC_TRONGSO_LUAT || {}).viKhongPhat || '') + '</p>';

    o += U.sec('Sáu luật của bàn cờ', '');
    o += '<div class="card">' + (G.BC_LUAT || []).map(function (l) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + l.no + '. ' + h(l.t) + '</b>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(l.y) + '</p></div>';
    }).join('') + '</div>';
    return o;
  };

  /* ═══════════ BẤM ═══════════ */
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-bctang]');
    if (t) { G.S.bcTang = t.getAttribute('data-bctang'); G.render(); return; }
    var v = e.target.closest && e.target.closest('[data-bcdat]');
    if (!v) return;
    var kq = G.bcDat(G.S.bcTang || 'T1', v.getAttribute('data-bcdat'));
    if (!kq.ok) { if (U.toast) U.toast(kq.y, 'err'); return; }
    /* Điểm nổi lên ngay tại chỗ vừa bấm, TRƯỚC khi dựng lại màn. Dựng
       lại rồi mới nổi thì nút ấy đã biến mất và điểm nổi giữa hư không. */
    noiDiem(v, kq.diem);
    setTimeout(function () { G.render(); }, 620);
  });

  function noiDiem(nut, diem) {
    try {
      var r = nut.getBoundingClientRect();
      var e = document.createElement('div');
      e.className = 'bc-noi';
      e.textContent = '+' + diem;
      /* Kẹp vào trong khung nhìn. position:fixed lấy toạ độ của nút, mà
         nút có thể đang nằm dưới màn — lúc ấy chữ +3 nổi ngoài khung và
         không ai thấy phần thưởng của chính mình. Chỉ lộ ra khi bấm một
         nút ở cuối danh sách, nên đọc mã không thấy. */
      var W = window.innerWidth, H = window.innerHeight;
      e.style.left = Math.max(40, Math.min(W - 40, r.left + r.width / 2)) + 'px';
      e.style.top = Math.max(70, Math.min(H - 90, r.top + 12)) + 'px';
      document.body.appendChild(e);
      setTimeout(function () { if (e.parentNode) e.parentNode.removeChild(e); }, 1100);
    } catch (x) { /* nổi điểm hỏng thì không được làm hỏng việc đặt quân */ }
  }
})();
