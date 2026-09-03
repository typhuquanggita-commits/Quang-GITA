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

  /* ═══════════ VÒNG CỦA MỘT TẦNG ═══════════
     ĐỌC từ chỗ đã viết, không khai lại:
       HP_TANG.ten  'Chặng bứt phá — 90 ngày, 4 chuỗi 21 ngày'
       CUHICH.hua   'Mỗi vòng bảy ngày thay đúng một biến.'  (tier T2)
     Không thấy ở đâu thì tầng ấy không chia vòng — và nói là không có,
     chứ không tự đặt ra một con số cho đều bảng. */
  var SO_CHU = { nhất: 1, hai: 2, ba: 3, tư: 4, bốn: 4, năm: 5, sáu: 6, bảy: 7, tám: 8,
    chín: 9, mười: 10, 'mười một': 11, 'hai mươi mốt': 21 };
  function soTuChu(t) {
    t = String(t || '').toLowerCase();
    var k = Object.keys(SO_CHU).sort(function (a, b) { return b.length - a.length; });
    for (var i = 0; i < k.length; i++) if (t.indexOf(k[i]) >= 0) return SO_CHU[k[i]];
    return null;
  }
  G.bcVong = function (tang) {
    var can = G.bcSoNgay(tang);
    if (!can) return null;
    /* 1. Tên chặng: 'N chuỗi M ngày' hoặc 'N chu kỳ M ngày' */
    var t = (G.HP_TANG || []).filter(function (x) { return x.tang === tang; })[0] ||
            (G.HP_NGAY || []).filter(function (x) { return x.tang === tang; })[0];
    /* Lấy luôn CHỮ mà kho gọi cái vòng ấy: tầng ba gọi là "chuỗi", tầng
       bốn gọi là "chu kỳ". Gọi cả hai là "vòng" thì màn nói một đằng mà
       hợp đồng nói một nẻo, và nhà mình phải tự dịch. */
    var m = /(\d+)\s*(chuỗi|chu kỳ|vòng)\s*(\d+)\s*ngày/i.exec((t && t.ten) || '');
    if (m) return vongRa(Number(m[1]), Number(m[3]), can, 'HP_TANG.ten', m[2]);
    /* 2. Lời hứa của cú hích cùng tầng: 'Mỗi vòng bảy ngày…' */
    var ch = (G.CUHICH || []).filter(function (x) { return x.tier === tang; })[0];
    var hua = (ch && ch.hua) || '';
    var mv = /mỗi vòng\s+([^,\.]+?)\s*ngày/i.exec(hua);
    var dai = mv ? (Number(mv[1]) || soTuChu(mv[1])) : null;
    if (dai && dai > 0 && dai <= can)
      return vongRa(Math.floor(can / dai), dai, can, 'CUHICH.' + ch.ma + '.hua', 'vòng');
    return null;
  };
  /* Vòng KHÔNG lát kín tầng ở hai chỗ, và cả hai đều nằm sẵn trong kho:
       T3  '90 ngày, 4 chuỗi 21 ngày'   → 4×21 = 84, dư 6
       T4  '365 ngày, 4 chu kỳ 90 ngày' → 4×90 = 360, dư 5
     Kho không nói mấy ngày dư ấy là gì. Nên KHÔNG làm tròn và KHÔNG
     giãn vòng cho vừa — trả về số dư và để màn nói thẳng. Giãn cho vừa
     là sửa lời hứa cho khớp cái bàn, mà đáng ra phải ngược lại. */
  function vongRa(soVong, dai, can, docTu, ten) {
    var du = can - soVong * dai;
    ten = String(ten || 'vòng').toLowerCase();
    return { soVong: soVong, dai: dai, du: du, docTu: docTu,
      ten: ten, tenVong: ten.charAt(0).toUpperCase() + ten.slice(1),
      la: soVong + ' ' + ten + ', mỗi ' + ten + ' ' + dai + ' ngày' +
        (du > 0 ? ' · dư ' + du + ' ngày' : ''),
      duChuaKhai: du > 0
        ? 'Kho khai ' + can + ' ngày và ' + soVong + ' ' + ten + ' ' + dai + ' ngày — cộng lại ' +
          (soVong * dai) + ', dư ' + du + ' ngày chưa nói là gì. Bàn cờ để ' + du +
          ' ô ấy ngoài ' + ten + ' chứ không giãn ' + ten + ' cho vừa.'
        : null };
  }

  /* Biến của một vòng — nhà mình tự ghi, và KHÔNG bắt buộc. Bắt điền mới
     cho đi tiếp là dựng một cái cổng ở chỗ đáng ra chỉ cần một lời mời. */
  G.bcBien = function (tang, vong) {
    var b = (G.S && G.S.bcBien) || {};
    return (b[tang] || {})[vong] || null;
  };
  G.bcGhiBien = function (tang, vong, cu, moi) {
    if (!String(moi || '').trim()) return false;
    G.S.bcBien = G.S.bcBien || {};
    G.S.bcBien[tang] = G.S.bcBien[tang] || {};
    G.S.bcBien[tang][vong] = { cu: String(cu || '').trim(), moi: String(moi).trim(),
      ngay: G.bcNgay() };
    if (G.save) G.save();
    return true;
  };

  function so() { return (G.S && G.S.banCo) || {}; }
  function soCua(tang) { return so()[tang] || {}; }

  /* ═══════════ AI TRONG NHÀ ĐANG CÙNG ĐI ═══════════
     Mặc định ba: mẹ · bố · con. Nhưng có nhà một mẹ nuôi con, có nhà ông
     bà nuôi cháu — ép đủ ba mới được tính là đuổi đúng những nhà cần hệ
     này nhất ra ngoài. Nhà hai người thì hai việc là đủ, và ô ấy đầy y
     như ô của nhà ba người. */
  G.bcVaiNha = function () {
    var khai = (G.S && G.S.bcVai) || null;
    var ds = G.BC_VAI || [];
    if (!khai) return ds.filter(function (v) { return v.mac === true; });
    var co = ds.filter(function (v) { return khai.indexOf(v.ma) >= 0; });
    /* Khai rỗng thì rơi về mặc định — một bàn cờ không có ai đi thì ô
       nào cũng đầy sẵn, và cái bàn ấy vô nghĩa. */
    return co.length ? co : ds.filter(function (v) { return v.mac === true; });
  };
  G.bcDatVai = function (dsMa) {
    if (!Array.isArray(dsMa) || !dsMa.length) return false;
    var hop = (G.BC_VAI || []).map(function (v) { return v.ma; });
    G.S.bcVai = dsMa.filter(function (m) { return hop.indexOf(m) >= 0; });
    if (!G.S.bcVai.length) { delete G.S.bcVai; return false; }
    if (G.save) G.save();
    return true;
  };

  /* Ô của một ngày, dạng chuẩn. Bản 9.32 ghi một việc thẳng vào ô; từ
     9.34 ô là { vai: {...} }. Đọc được cả hai để bàn cờ đã đặt không
     mất màu sau khi cập nhật. */
  function oChuan(q) {
    if (!q) return null;
    if (q.vai) return q;
    return { vai: { _cu: { ma: q.ma, bd: q.bd, diem: q.diem, c: q.c, muc: q.muc } } };
  }
  function diemO(q) {
    q = oChuan(q); if (!q) return 0;
    var t = 0;
    Object.keys(q.vai).forEach(function (v) { t += Number(q.vai[v].diem) || 0; });
    return t + (Number(q.thuong) || 0);
  }
  function oDay(q, canVai) {
    q = oChuan(q); if (!q) return false;
    if (q.vai._cu) return true;                    /* ô kiểu cũ coi như đầy */
    return canVai.every(function (v) { return !!q.vai[v.ma]; });
  }

  /* ═══════════ MƯỜI GỢI Ý CỦA HÔM NAY ═══════════
     Mỗi bánh đà đưa ra việc nhỏ kế tiếp của nó. Đúng mười, vì có đúng
     mười bánh đà. */
  G.bcGoiY = function (tang) {
    if (!G.BD_LON) return [];
    /* Việc đã đặt phải rút khỏi danh sách gợi ý. Ô nay là { vai: {...} }
       chứ không còn là một việc phẳng — đọc `.ma` thẳng trên ô thì luôn
       ra undefined, và cùng một việc gợi ý lại mãi. Chỉ lộ ra khi đặt
       xong rồi nhìn lại danh sách. */
    var daDat = {};
    Object.keys(so()).forEach(function (t) {
      Object.keys(so()[t]).forEach(function (n) {
        var q = oChuan(so()[t][n]);
        Object.keys(q.vai).forEach(function (v) { if (q.vai[v].ma) daDat[q.vai[v].ma] = true; });
      });
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
  G.bcDat = function (tang, vai, maViec) {
    var canVai = G.bcVaiNha();
    if (!canVai.filter(function (v) { return v.ma === vai; })[0])
      return { ok: false, y: 'Nhà mình chưa khai vai này đang cùng đi.' };
    var g = G.bcGoiY(tang).filter(function (x) { return x.ma === maViec; })[0];
    if (!g) return { ok: false, y: 'Việc này không có trong mười gợi ý của hôm nay.' };
    G.S.banCo = G.S.banCo || {};
    G.S.banCo[tang] = G.S.banCo[tang] || {};
    var n = G.bcNgay();
    var q = G.S.banCo[tang][n] || { vai: {} };
    if (q.vai && q.vai[vai])
      return { ok: false, y: 'Hôm nay ' + (G.BC_VAI.filter(function (v) { return v.ma === vai; })[0] || {}).ten +
        ' đã đặt việc của mình rồi. Mai đặt tiếp.' };
    q.vai = q.vai || {};
    q.vai[vai] = { ma: g.ma, bd: g.banhDa, diem: g.diem, c: g.c, muc: g.muc };
    /* Thưởng CÙNG NHAU: ô đầy trong cùng một ngày thì cả nhà được thêm
       điểm bằng số người đã khai. Bằng số người chứ không phải một con
       số cố định — con số cố định thì nhà đông thấy rẻ, nhà ít thấy với
       không tới. Chỉ cộng đúng một lần, ở đúng lúc ô vừa đầy. */
    var vuaDay = oDay(q, canVai) && !q.thuong;
    if (vuaDay) q.thuong = canVai.length;
    G.S.banCo[tang][n] = q;
    if (G.save) G.save();
    return { ok: true, diem: g.diem, thuong: vuaDay ? canVai.length : 0,
      day: oDay(q, canVai), conThieu: canVai.filter(function (v) { return !q.vai[v.ma]; })
        .map(function (v) { return v.ten; }),
      o: q, viec: g };
  };

  /* ═══════════ ĐO ═══════════ */
  G.bcDo = function (tang) {
    var s = soCua(tang), ngay = Object.keys(s).sort();
    var canVai = G.bcVaiNha();
    var tong = 0, bd = {}, day = [], dang = 0;
    ngay.forEach(function (n) {
      var q = oChuan(s[n]);
      tong += diemO(q);
      Object.keys(q.vai).forEach(function (v) { if (q.vai[v].bd) bd[q.vai[v].bd] = true; });
      /* Ô ĐẦY mới được tính là một ô có màu. Ô mới một người làm là ô
         dở dang — công đã cộng, nhưng bức tranh chưa có ô ấy. */
      if (oDay(q, canVai)) day.push(n); else dang++;
    });
    /* Chuỗi tính trên ô ĐẦY: chuỗi là "cả nhà cùng làm mấy tối liền",
       không phải "có người làm mấy tối liền". */
    var chuoi = 0, d = new Date();
    for (;;) {
      var q0 = s[G.bcNgay(d)];
      if (!q0 || !oDay(q0, canVai)) break;
      chuoi++; d = new Date(d.getTime() - 86400000);
    }
    var dai = 0, chay = 0, truoc = null;
    day.forEach(function (n) {
      var t = new Date(n + 'T00:00:00').getTime();
      chay = (truoc !== null && t - truoc === 86400000) ? chay + 1 : 1;
      if (chay > dai) dai = chay;
      truoc = t;
    });
    var can = G.bcSoNgay(tang);
    var nay = oChuan(s[G.bcNgay()]);
    return { soO: day.length, dangDo: dang, tong: tong, chuoi: chuoi, chuoiDai: dai,
      soBanhDa: Object.keys(bd).length, can: can, soVai: canVai.length,
      phanTram: can ? Math.min(100, Math.round(day.length * 100 / can)) : null,
      xong: can ? day.length >= can : false,
      daDatHomNay: !!(nay && oDay(nay, canVai)),
      vaiHomNay: canVai.map(function (v) {
        return { ma: v.ma, ten: v.ten, c: v.c, xong: !!(nay && nay.vai[v.ma]),
          viec: nay && nay.vai[v.ma] ? nay.vai[v.ma] : null };
      }) };
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
  /* Bàn chia theo VÒNG: mỗi vòng một dải riêng, có nhãn và có chỗ ghi
     biến. Đổ 21 ô liền một mạch thì mắt đọc ra một dải ngày, không đọc
     ra ba lần thử — mà ba lần thử mới là thứ tầng hai đang dạy. */
  /* Số của một vòng. Nói gì thì tuỳ vòng ấy ĐÃ TRỌN, ĐANG ĐI hay CHƯA
     TỚI — một vòng chưa tới lượt mà bị báo "kém 7 ô" là bị trách về một
     việc chưa đến lượt làm, và một vòng mới đi ba ngày mà đem so với
     một vòng đã trọn hai mươi mốt thì con số ấy âm vì lịch chứ không
     vì nhà mình. */
  function veSoVong(dv, v) {
    if (!dv || dv.soO === undefined) return '';
    if (dv.trangThai === 'chuaToi')
      return '<p class="bc-vong-so dim">Chưa tới ' + h(v.ten) + ' này.</p>';
    var o = '<p class="bc-vong-so"><b>' + dv.soO + '</b>/' +
      (dv.trangThai === 'dangDi' ? dv.ngayThu : v.dai) + ' ô · <b>' +
      dv.tong + '</b> điểm · dài nhất <b>' + dv.chuoiDai + '</b> ngày liền';
    if (dv.trangThai === 'dangDi') {
      o += ' <span class="dang">đang đi · ngày thứ ' + dv.ngayThu + '/' + v.dai + '</span>';
      if (dv.truocCungNgay !== null && dv.truocCungNgay !== undefined) {
        var c = dv.soO - dv.truocCungNgay;
        o += '<br><span class="' + (c > 0 ? 'hon' : c < 0 ? 'kem' : 'bang') + '">' +
          h(v.tenVong) + ' trước tới đúng ngày thứ ' + dv.ngayThu + ' có ' +
          dv.truocCungNgay + ' ô' +
          (c > 0 ? ' — nhà mình đang hơn ' + c : c < 0 ? ' — đang kém ' + (-c) : ' — đang bằng') +
          '</span>';
      }
    } else if (dv.hon !== null && dv.hon !== undefined) {
      o += ' <span class="' + (dv.hon > 0 ? 'hon' : dv.hon < 0 ? 'kem' : 'bang') + '">' +
        (dv.hon > 0 ? '+' + dv.hon + ' ô so với ' + v.ten + ' trước'
         : dv.hon < 0 ? dv.hon + ' ô so với ' + v.ten + ' trước'
         : 'bằng ' + v.ten + ' trước') + '</span>';
    }
    return o + '</p>';
  }

  function veTheoVong(tang, can, s, v) {
    var o = '', d0 = ngayDau(s);
    var dsKho = G.bcVongKho(tang) || [];
    var doV = G.bcVongDo(tang) || [];
    var noi = G.bcMoiNoi(tang) || [];
    for (var k = 0; k < v.soVong; k++) {
      var bien = G.bcBien(tang, k + 1);
      var kho = dsKho.indexOf(k + 1) >= 0;
      var dv = doV[k] || {};
      /* Mối nối vào TRƯỚC dải của vòng sau — cái khớp nằm giữa hai
         chuỗi, nên nó phải hiện ở giữa, không phải nằm dưới chân một
         trong hai. */
      var mn = noi.filter(function (x) { return x.den === k + 1; })[0];
      if (mn) o += '<div class="bc-khop' + (mn.noi ? ' noi' : '') + '">' +
        (mn.noi ? '⟶ nối được từ chuỗi ' + mn.tu + ' sang chuỗi ' + mn.den
                : '⟝ hở ở khớp chuỗi ' + mn.tu + ' sang chuỗi ' + mn.den) + '</div>';
      o += '<div class="bc-vong' + (kho ? ' kho' : '') + '">' +
        '<div class="bc-vong-d"><b>' + h(v.tenVong || 'Vòng') + ' ' + (k + 1) + '</b>' +
        '<span>' + v.dai + ' ngày</span>' +
        (kho ? '<span class="bc-vong-kho">CHỖ KHÓ NHẤT CỦA TẦNG</span>' : '') + '</div>' +
        veO(tang, s, d0, k * v.dai, v.dai) +
        /* Số của từng vòng, và chênh với vòng trước. Trong quãng "không
           kết quả nào", con số này là kết quả duy nhất có thật. */
        veSoVong(dv, v) +
        (bien
          ? '<p class="bc-bien"><b>Biến của ' + h(v.ten) + ' này:</b> ' +
            (bien.cu ? '<s>' + h(bien.cu) + '</s> → ' : '') + h(bien.moi) + '</p>'
          /* Vòng chưa tới thì không mời ghi biến. Mời ghi biến cho một
             vòng còn cách đây hai tháng là mời nghĩ hộ chính mình của
             hai tháng nữa, mà lúc ấy nhà mình đã khác. */
          : dv.trangThai === 'chuaToi' ? ''
          : '<button class="bc-nutbien" data-bcbien="' + (k + 1) + '">' +
            'Ghi một biến cho ' + h(v.ten) + ' này</button>') +
        '</div>';
    }
    if (v.du > 0) {
      o += '<div class="bc-vong du"><div class="bc-vong-d"><b>Ngoài ' + h(v.ten || 'vòng') + '</b>' +
        '<span>' + v.du + ' ngày</span></div>' +
        veO(tang, s, d0, v.soVong * v.dai, v.du) +
        '<p class="bc-bien dim">' + h(v.duChuaKhai || '') + '</p></div>';
    }
    return o;
  }

  /* Chỗ khó của tầng — đọc từ HT_TANG.khoNhat, rút số vòng trong câu.
       T2  'Tuần thứ hai — lúc hào hứng đã hết mà nếp thì chưa thành.'
       T3  'Chuỗi thứ hai và thứ ba. Không biến cố nào, không kết quả nào…'

     TRẢ VỀ MỘT DANH SÁCH, KHÔNG PHẢI MỘT SỐ

     Bản 9.35 chỉ bắt 'tuần thứ N' và trả về một số. Tầng ba nói CHUỖI
     chứ không nói tuần, và nói HAI vòng chứ không một — nên lời báo
     trước dựng ở 9.35 im lặng đúng ở tầng cần nó nhất: tầng ba là tầng
     dài nhất trước khi sang năm, và chỗ chán của nó kéo suốt sáu tuần
     giữa. Im lặng ấy không đỏ ở đâu cả, vì phép kiểm cũng chỉ hỏi T2. */
  G.bcVongKho = function (tang) {
    var t = (G.HT_TANG || []).filter(function (x) { return x.ma === tang; })[0];
    var m = /(?:tuần|chuỗi|chu kỳ|vòng)\s+thứ\s+([^\s,\.—–]+)(?:\s+và\s+(?:thứ\s+)?([^\s,\.—–]+))?/i
      .exec((t && t.khoNhat) || '');
    if (!m) return null;
    var ra = [m[1], m[2]].map(function (x) {
      if (!x) return null;
      var n = Number(x) || soTuChu(x);
      return n > 0 ? n : null;
    }).filter(Boolean);
    return ra.length ? ra : null;
  };
  G.bcKhoNhat = function (tang) {
    var t = (G.HT_TANG || []).filter(function (x) { return x.ma === tang; })[0];
    return (t && t.khoNhat) || null;
  };
  G.bcThuThach = function (tang) {
    var t = (G.HT_TANG || []).filter(function (x) { return x.ma === tang; })[0];
    return (t && t.thuThach) || null;
  };

  function ngayThu(d0, i) {
    return G.bcNgay(new Date(new Date(d0 + 'T00:00:00').getTime() + i * 86400000));
  }
  function ngayDau(s) { var k = Object.keys(s).sort(); return k.length ? k[0] : null; }

  /* ═══════════ ĐO TỪNG VÒNG ═══════════
     Tầng ba nói thẳng chỗ khó của nó: 'Không biến cố nào, không kết quả
     nào — chỉ là dài.' Sáu tuần giữa không có gì để nhìn, và đó là lý
     do thật khiến người ta bỏ ở chuỗi hai chứ không phải vì việc nặng.

     Thứ duy nhất có thật để nhìn trong quãng ấy là CHÍNH CHUỖI TRƯỚC.
     Chuỗi một mười lăm ô, chuỗi hai mười bảy — đó là một kết quả, và nó
     không phải đi vay ở đâu: nó nằm sẵn trên bàn cờ của chính nhà mình.

     So với chuỗi trước, KHÔNG so với nhà khác. Luật 11 đã cấm bảng vàng;
     chỗ này là cái thay thế duy nhất còn đúng — vì nhà mình tháng trước
     và nhà mình tháng này thì cùng một hoàn cảnh. */
  G.bcVongDo = function (tang) {
    var v = G.bcVong(tang); if (!v) return null;
    var s = soCua(tang), d0 = ngayDau(s), canVai = G.bcVaiNha();
    var nayI = d0 ? Math.floor((new Date(G.bcNgay() + 'T00:00:00').getTime() -
      new Date(d0 + 'T00:00:00').getTime()) / 86400000) : -1;
    /* Đếm ô đầy trong DEM ngày đầu của vòng k. Dùng cho cả phép đếm cả
       vòng lẫn phép so cùng độ dài. */
    function dem(k, sl) {
      var soO = 0, tong = 0, dai = 0, chay = 0;
      for (var i = 0; i < sl; i++) {
        var q = d0 ? oChuan(s[ngayThu(d0, k * v.dai + i)]) : null;
        if (!q) { chay = 0; continue; }
        tong += diemO(q);
        if (oDay(q, canVai)) { soO++; chay++; if (chay > dai) dai = chay; }
        else chay = 0;
      }
      return { soO: soO, tong: tong, chuoiDai: dai };
    }
    var ra = [];
    for (var k = 0; k < v.soVong; k++) {
      var d = dem(k, v.dai);
      /* TRẠNG THÁI CỦA VÒNG — và vì sao nó quyết định được phép so gì.
         Vòng chưa tới thì mọi con số của nó là 0, và "0 ô, kém 7 ô so
         với vòng trước" là một lời trách về một việc chưa tới lượt làm.
         Vòng ĐANG ĐI thì mới đi được mấy ngày, đem so với một vòng đã
         trọn hai mươi mốt ngày là so nửa chuỗi với cả chuỗi — con số ra
         luôn âm, và nó âm vì lịch chứ không vì nhà mình. */
      var tt = nayI < 0 ? 'chuaToi'
        : nayI >= (k + 1) * v.dai ? 'xong'
        : nayI >= k * v.dai ? 'dangDi' : 'chuaToi';
      var ngThu = tt === 'dangDi' ? nayI - k * v.dai + 1 : null;
      var truoc = k > 0 ? ra[k - 1] : null;
      ra.push({ vong: k + 1, dai: v.dai, soO: d.soO, tong: d.tong, chuoiDai: d.chuoiDai,
        trangThai: tt, ngayThu: ngThu,
        /* Chỉ so hai vòng ĐỀU ĐÃ TRỌN. */
        hon: (tt === 'xong' && truoc && truoc.trangThai === 'xong')
          ? d.soO - truoc.soO : null,
        /* Vòng đang đi thì so CÙNG ĐỘ DÀI: vòng trước tới đúng ngày thứ
           ấy đã có mấy ô. Đó là phép so duy nhất còn công bằng, và nó
           chính là thứ cần nhất trong quãng dài không có gì để nhìn. */
        truocCungNgay: (tt === 'dangDi' && truoc) ? dem(k - 1, ngThu).soO : null });
    }
    return ra;
  };

  /* ═══════════ MỐI NỐI GIỮA HAI VÒNG ═══════════
     Tầng ba đòi 'bốn chuỗi hai mươi mốt ngày NỐI NHAU'. Nối nhau là
     chuyện của đúng một cái khớp: tối cuối chuỗi này và tối đầu chuỗi
     sau. Đó cũng đúng là chỗ người ta dừng — xong một chuỗi thì thấy đã
     xong, và tối hôm sau không ai mở màn này nữa.

     HIỆN RA CHỨ KHÔNG PHẠT. Luật 8 đã nói ô trống là ô trống. Mối nối
     hở thì màn nói hở, không trừ điểm, không đỏ lên. Và chỉ nói về mối
     nối ĐÃ QUA — báo hở một cái khớp còn chưa tới là bịa. */
  G.bcMoiNoi = function (tang) {
    var v = G.bcVong(tang); if (!v || v.soVong < 2) return null;
    var s = soCua(tang), d0 = ngayDau(s); if (!d0) return null;
    var canVai = G.bcVaiNha();
    var daQua = Math.floor((new Date(G.bcNgay() + 'T00:00:00').getTime() -
      new Date(d0 + 'T00:00:00').getTime()) / 86400000);
    var ra = [];
    for (var k = 1; k < v.soVong; k++) {
      var iDau = k * v.dai;
      if (iDau > daQua) break;
      var a = oChuan(s[ngayThu(d0, iDau - 1)]), b = oChuan(s[ngayThu(d0, iDau)]);
      ra.push({ tu: k, den: k + 1,
        noi: !!(a && oDay(a, canVai)) && !!(b && oDay(b, canVai)) });
    }
    return ra.length ? ra : null;
  };

  function veBan(tang, can, s) {
    if (!can) return '';
    var d0 = null;
    Object.keys(s).sort().forEach(function (n) { if (!d0) d0 = n; });
    /* Tầng có vòng thì vẽ theo vòng; tầng không có thì một dải. Không tự
       đặt ra một số vòng cho đều bảng — tầng một và tầng năm thật sự
       không khai vòng nào ở kho. */
    var v = G.bcVong(tang);
    if (v && v.soVong > 1) return veTheoVong(tang, can, s, v);
    return veO(tang, s, d0, 0, can);
  }

  function veO(tang, s, d0, tu, dem) {
    /* Một chuỗi hai mươi mốt ngày vẽ thành MỘT HÀNG hai mươi mốt ô —
       vì kho gọi nó là "chuỗi", và một chuỗi bẻ làm ba dòng thì mắt đọc
       ra ba tuần rời chứ không đọc ra một chuỗi. */
    var cot = dem <= 7 ? 7 : dem <= 21 ? dem : dem <= 90 ? 15 : 28;
    var o = '<div class="bc-ban" style="--bc-cot:' + cot + '">';
    var canVai = G.bcVaiNha();
    for (var i = tu; i < tu + dem; i++) {
      var ng = d0 ? G.bcNgay(new Date(new Date(d0 + 'T00:00:00').getTime() + i * 86400000)) : null;
      var q = ng ? oChuan(s[ng]) : null;
      if (!q) { o += '<i class="bc-o"></i>'; continue; }
      /* Ô chia sọc theo vai: mỗi người một sọc, sọc có màu là người ấy
         đã làm. Nhìn một ô là biết tối ấy ai có mặt ai vắng — thứ một
         ô đặc một màu không nói được. */
      var n2 = canVai.length, sac = [], b2 = 100 / n2;
      canVai.forEach(function (v, k) {
        var xong = !!q.vai[v.ma] || !!q.vai._cu;
        var mau = xong ? (q.vai[v.ma] ? q.vai[v.ma].c : v.c) : 'transparent';
        sac.push(mau + ' ' + (k * b2).toFixed(2) + '% ' + ((k + 1) * b2).toFixed(2) + '%');
      });
      var du = oDay(q, canVai);
      var mo = canVai.filter(function (v) { return q.vai[v.ma]; })
        .map(function (v) { return v.ten; }).join('+') || 'đã đặt';
      o += '<i class="bc-o co' + (du ? ' du' : ' dang') + '" style="background:linear-gradient(180deg,' +
        sac.join(',') + ')" title="' + h(ng + ' · ' + mo + ' · +' + diemO(q)) + '"></i>';
    }
    return o + '</div>';
  }

  function gyTen(ma) {
    var r = null;
    (G.BD_LON || []).forEach(function (b) {
      (b.nho || []).forEach(function (x) { if (x.ma === ma) r = x; });
    });
    return r;
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
      /* Vòng: nói ngay dưới bàn, và nói ĐỌC TỪ ĐÂU — con số vòng không
         phải tôi đặt, nó nằm sẵn trong tên chặng hoặc lời hứa cú hích. */
      var vg = G.bcVong(tang);
      /* Thử thách của tầng, in NGUYÊN CÂU của kho. Tầng ba: 'Đi bốn
         chuỗi hai mươi mốt ngày nối nhau, và qua được cơn chán ở giữa.'
         Câu ấy nói đúng hai việc phải làm, và cả hai đều đo được trên
         chính bàn này — nên nó phải đứng ngay trên bàn. */
      var tt = G.bcThuThach(tang);
      if (tt) o += '<p class="bc-thuthach"><b>Việc của tầng này:</b> ' + h(tt) + '</p>';
      if (vg) o += '<p class="bc-y"><b>' + h(vg.la) + '</b> · ' +
        h((G.BC_VONG_LUAT || {}).motBienMotVong || '') +
        ' <span class="dim">(đọc từ ' + h(vg.docTu) + ')</span></p>';
      o += veBan(tang, d.can, s);
      /* Mối nối: nói ngay dưới bàn, và nói nó KHÔNG phải hình phạt —
         nếu không thì một cái khớp hở đọc thành một lời trách. */
      var mn = G.bcMoiNoi(tang);
      if (mn) {
        var ho = mn.filter(function (x) { return !x.noi; }).length;
        o += '<p class="bc-y"><b>Mối nối giữa các ' + h(vg.ten) + ': ' +
          (mn.length - ho) + '/' + mn.length + ' nối được.</b> ' +
          h((G.BC_VONG_LUAT || {}).viMoiNoi || '') + '</p>';
      }
      /* Chỗ khó BÁO TRƯỚC, không đợi tới lúc nó tới. Câu này nằm ở
         HT_TANG.khoNhat từ bản 9.21 mà chưa màn nào nói ra đúng lúc. */
      var kn = G.bcKhoNhat(tang);
      if (kn) o += '<div class="bc-baotruoc"><b>Chỗ khó nhất của tầng này — nói trước</b>' +
        '<p>' + h(kn) + '</p>' +
        '<p class="dim">' + h((G.BC_VONG_LUAT || {}).viBaoTruoc || '') + '</p></div>';
      o += '<p class="bc-y">' + h(loi.viKienTri || '') + '</p>';
    }

    /* ── Mốc vừa chạm ── */
    var moc = G.bcMocDat(tang);
    if (moc)
      o += '<div class="bc-mung"><span class="bc-bt">' + h(moc.bieuTuong) + '</span>' +
        '<div><b>' + h(moc.loi) + '</b><p>' + h(moc.phu) + '</p></div></div>';

    /* ── TỐI NAY: BA NGƯỜI, MỘT QUÂN ── */
    var canVai = G.bcVaiNha();
    var chuaXong = d.vaiHomNay.filter(function (v) { return !v.xong; });
    o += U.sec('TỐI NAY — MỘT QUÂN LÀ ' + canVai.length + ' VIỆC',
      (G.BC_VAI_LUAT || {}).cot || '');
    o += '<div class="bc-toinay">' + d.vaiHomNay.map(function (v) {
      return '<div class="bc-nguoi' + (v.xong ? ' xong' : '') + '" style="--bc-c:' + v.c + '">' +
        '<div class="bc-nguoi-d"><b>' + h(v.ten) + '</b>' +
        '<span>' + (v.xong ? '✓ xong' : 'chưa chọn') + '</span></div>' +
        (v.xong
          ? '<p class="bc-nguoi-v">' + h((gyTen(v.viec.ma) || {}).ten || v.viec.ma) + '</p>' +
            '<span class="bc-nguoi-d2">+' + v.viec.diem + '</span>'
          : '<p class="bc-nguoi-v dim">Chọn một việc trong mười gợi ý bên dưới.</p>') +
        '</div>';
    }).join('') + '</div>';
    o += '<p class="bc-y">' + h(d.daDatHomNay
      ? 'Ô hôm nay đã đầy. Cả nhà được thêm ' + canVai.length + ' điểm cho việc cùng nhau.'
      : 'Ô hôm nay còn chờ: ' + chuaXong.map(function (v) { return v.ten; }).join(' · ') +
        '. Công của người đã làm đã cộng rồi và không mất đi.') + '</p>';

    /* Ai đang cùng đi — sửa được */
    o += '<div class="row wrap mb" style="gap:8px;align-items:center">' +
      '<span class="tiny up" style="color:var(--ink-4)">AI TRONG NHÀ ĐANG CÙNG ĐI</span>' +
      (G.BC_VAI || []).map(function (v) {
        var co = canVai.filter(function (x) { return x.ma === v.ma; }).length > 0;
        return '<button class="btn ' + (co ? 'pri' : 'ghost') + ' sm" data-bcvai="' + v.ma + '">' +
          h(v.ten) + '</button>';
      }).join('') + '</div>';
    o += '<p class="tiny dim mb" style="line-height:1.7">' +
      h((G.BC_VAI_LUAT || {}).viKhongEpDuBa || '') + '</p>';

    /* ── Mười gợi ý, chọn cho từng người ── */
    var gy = G.bcGoiY(tang);
    o += U.sec('MƯỜI VIỆC GỢI Ý',
      chuaXong.length
        ? 'Bấm một việc rồi chọn việc ấy cho ai. ' + (G.BC_VAI_LUAT || {}).moiNguoiChonRieng
        : 'Tối nay cả nhà đã chọn xong. Mai chọn tiếp.');
    o += '<div class="bc-ds">' + gy.map(function (g) {
      return '<div class="bc-viec" style="--bc-c:' + g.c + '">' +
        '<span class="bc-diem">+' + g.diem + '</span>' +
        '<span class="bc-bd">' + h(g.banhDaTen) + ' · ' + h(g.mucTen) + '</span>' +
        '<b>' + h(g.ten) + '</b>' +
        '<span class="bc-lam">' + h(g.viec) + '</span>' +
        (g.thay ? '<span class="bc-thay">Rồi sẽ thấy: ' + h(g.thay) + '</span>' : '') +
        (chuaXong.length
          ? '<div class="bc-cho">' + chuaXong.map(function (v) {
              return '<button class="bc-nut" data-bcdat="' + h(g.ma) + '" data-bcvai2="' + v.ma +
                '" style="--bc-c:' + v.c + '">việc của ' + h(v.ten) + '</button>';
            }).join('') + '</div>'
          : '') + '</div>';
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

    /* Đếm chứ không gõ tay. Nhan đề còn ghi "Sáu luật" trong khi kho đã
       có mười một — một con số gõ tay thì đứng yên trong lúc kho đi tiếp. */
    o += U.sec((G.BC_LUAT || []).length + ' luật của bàn cờ', '');
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
    var nb = e.target.closest && e.target.closest('[data-bcbien]');
    if (nb) {
      var vg = Number(nb.getAttribute('data-bcbien'));
      var cu = window.prompt('Câu quen cũ trong nhà (bỏ trống cũng được):', '');
      if (cu === null) return;
      var moi = window.prompt('Câu mới nhà mình muốn giữ suốt vòng này:', '');
      if (moi === null) return;
      if (!G.bcGhiBien(G.S.bcTang || 'T1', vg, cu, moi)) {
        if (U.toast) U.toast('Chưa ghi được — câu mới không được để trống.', 'err');
        return;
      }
      G.render(); return;
    }
    var vv = e.target.closest && e.target.closest('[data-bcvai]');
    if (vv) {
      var ma = vv.getAttribute('data-bcvai');
      var nay = G.bcVaiNha().map(function (x) { return x.ma; });
      var i = nay.indexOf(ma);
      if (i >= 0) nay.splice(i, 1); else nay.push(ma);
      if (!G.bcDatVai(nay) && U.toast)
        U.toast('Phải có ít nhất một người cùng đi.', 'err');
      G.render(); return;
    }
    var v = e.target.closest && e.target.closest('[data-bcdat]');
    if (!v) return;
    var kq = G.bcDat(G.S.bcTang || 'T1', v.getAttribute('data-bcvai2'),
      v.getAttribute('data-bcdat'));
    if (!kq.ok) { if (U.toast) U.toast(kq.y, 'err'); return; }
    /* Điểm nổi lên ngay tại chỗ vừa bấm, TRƯỚC khi dựng lại màn. Dựng
       lại rồi mới nổi thì nút ấy đã biến mất và điểm nổi giữa hư không. */
    /* Ô vừa đầy thì nổi luôn cả điểm thưởng cùng nhau — hai con số nổi
       liền nhau là lúc nhà mình thấy rõ nhất việc cùng làm được thêm. */
    noiDiem(v, kq.diem);
    if (kq.thuong) setTimeout(function () { noiDiem(v, kq.thuong, true); }, 260);
    setTimeout(function () { G.render(); }, 620);
  });

  function noiDiem(nut, diem, cungNhau) {
    try {
      var r = nut.getBoundingClientRect();
      var e = document.createElement('div');
      e.className = 'bc-noi' + (cungNhau ? ' cung' : '');
      e.textContent = '+' + diem + (cungNhau ? ' cùng nhau' : '');
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
