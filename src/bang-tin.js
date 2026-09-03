/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÁY CHẠY BẢNG TIN CỘNG ĐỒNG

   Kho chuẩn ở kho-goc/data.bang-tin.js.

   MỘT CÁI CỔNG, KHÔNG PHẢI MỘT CÁI MÀN

   tinSo() là cổng duy nhất mà mọi con số của bảng tin đi qua. Nó nhận
   một mã nguồn, tra TIN_NGUON, và:

     nguồn khai CÓ    → trả con số kèm tên sổ đã đếm nó
     nguồn khai CHƯA  → trả { chuaCoNguon: true, thieu: '...' }

   Không hàm nào khác được in một con số ra bảng tin. Có cổng thì chỉ
   cần canh một chỗ; không cổng thì mỗi lần thêm một dòng tin là một
   lần phải nhớ tự hỏi "con số này ở đâu ra", và trí nhớ là thứ hỏng
   đầu tiên.

   VÌ SAO KHÔNG MƯỢN CUHICH.thamgia

   Kho ấy khai 412 · 268 · 174 · 96 · 58 · 143 mà không dòng nào nói
   chúng đếm từ đâu, trong khi hệ chưa phát hành. Mượn lại là biến một
   con số không nguồn thành một con số có vẻ được xác nhận — vì nó vừa
   xuất hiện ở màn thứ hai.

   Chúng nằm nguyên chỗ cũ: sửa nội dung đã phát hành là việc của chủ
   hệ. Nhưng tinSoiSoKhongNguon() gọi tên chúng ra mỗi lần bộ kiểm chạy.

   CÁI HỆ ĐANG ĐẾM ĐƯỢC THẬT

   Đúng một thứ: sổ bàn cờ của chính nhà đang xem, nằm ngay trong máy
   họ. Nên bảng tin hôm nay mở bằng số của nhà mình, và nói thẳng ba
   con số cộng đồng còn thiếu sổ nào. Nói thẳng thì hôm ra mắt con số
   ấy hiện lên, người ta tin.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  var U = G.U, h = U.h;

  /* ═══════════ CỔNG DUY NHẤT CHO MỌI CON SỐ ═══════════ */
  G.tinSo = function (maNguon, dem) {
    var n = (G.TIN_NGUON || []).filter(function (x) { return x.ma === maNguon; })[0];
    if (!n) return { chuaCoNguon: true, thieu: 'Mã nguồn "' + maNguon + '" chưa khai ở TIN_NGUON.' };
    if (n.co !== true) return { chuaCoNguon: true, ten: n.ten, thieu: n.thieu, vi: n.vi };
    return { chuaCoNguon: false, ten: n.ten, so: dem, demTu: n.demTu };
  };

  /* Số của chính nhà mình — thứ duy nhất hệ đang đếm được thật, vì nó
     nằm ngay trong máy của người đang xem. */
  G.tinNhaMinh = function () {
    if (typeof G.bcDo !== 'function') return null;
    var ra = [], tong = { o: 0, diem: 0, tang: 0 };
    ['T1', 'T2', 'T3', 'T4', 'T5'].forEach(function (t) {
      var d = G.bcDo(t);
      if (!d.soO) return;
      tong.o += d.soO; tong.diem += d.tong; if (d.xong) tong.tang++;
      ra.push({ tang: t, soO: d.soO, can: d.can, diem: d.tong,
        chuoi: d.chuoi, chuoiDai: d.chuoiDai, xong: d.xong });
    });
    return { tang: ra, tong: tong,
      chuaBatDau: ra.length === 0 };
  };

  /* Ba con số cộng đồng — hôm nay chưa con số nào có sổ. */
  G.tinCongDong = function () {
    return ['N-XONG', 'N-TANG', 'N-CHUYEN'].map(function (m) {
      var s = G.tinSo(m);
      s.ma = m;
      return s;
    });
  };

  /* ═══════════ CHUYỆN: MÁY SOI ĐƯỢC GÌ, VÀ KHÔNG SOI ĐƯỢC GÌ ═══════════
     Máy soi được sáu tiêu chí có đủ cột hay chưa. Máy KHÔNG đọc được
     một chuyện hay hay dở — nên nó không bao giờ trả về "đạt", chỉ trả
     về "chưa thấy chỗ nào trượt". Hai câu ấy khác nhau, và gộp chúng
     lại là cách một cái máy được giao việc của một người. */
  G.tinSoiChuyen = function (c) {
    var ts = G.TIN_TIEUCHI || [], truot = [];
    if (!c || typeof c !== 'object')
      return { chuaDo: true, thieu: 'Chưa có chuyện nào để soi.' };
    if (!c.viec || !String(c.viec).trim()) truot.push('1 · không có việc làm thật');
    if (!c.kho || !String(c.kho).trim()) truot.push('2 · không có chỗ khó');
    if (!/\d/.test(String(c.viec || '') + String(c.so || ''))) truot.push('3 · không có con số nào');
    if (c.coNguoiThuBa === true && c.daHoiNguoiThuBa !== true)
      truot.push('4 · có người thứ ba mà chưa hỏi');
    if (c.quangCao === true) truot.push('5 · có mùi quảng cáo');
    if (c.dongYBangChu !== true || !c.ngayDongY) truot.push('6 · chưa đồng ý bằng chữ');
    return { chuaDo: false, soTieuChi: ts.length, truot: truot,
      khongThayTruot: truot.length === 0,
      /* Không nói "đạt". Máy không đọc được chuyện hay hay dở. */
      y: truot.length
        ? 'Chưa đăng được. Còn ' + truot.length + ' chỗ.'
        : 'Không thấy chỗ nào trượt. Người của Học viện đọc và quyết — máy không chọn hộ.' };
  };

  /* ═══════════ BÍ KÍP: MẤY SAO, VÀ TRAO ĐƯỢC CHO AI ═══════════
     Số sao KHÔNG khai ở kho bảng tin — nó là SỐ CỦA TẦNG, và số ấy đã
     nằm ở HT_TANG.so từ lâu. Tầng ba là ba sao. Khai lại là dựng bản
     thứ hai của một con số đã có. */
  G.bkSao = function (tang) {
    var t = (G.HT_TANG || []).filter(function (x) { return x.ma === tang; })[0];
    return t && t.so ? t.so : null;
  };
  /* Cổng: không trao bí kíp vượt tầng. Một bí kíp năm sao trao cho nhà
     tầng một là thứ đọc mà không dùng được — và nó dạy rằng phần thưởng
     là thứ NHẬN được chứ không phải thứ MỞ được. */
  G.bkChoPhep = function (tangNha, sao) {
    var tran = G.bkSao(tangNha);
    if (!tran) return { ok: false, y: 'Chưa đọc được số sao của tầng ' + tangNha + '.' };
    sao = Number(sao);
    if (!(sao > 0)) return { ok: false, y: 'Bí kíp phải có ít nhất một sao.' };
    if (sao > tran) return { ok: false, tran: tran,
      y: 'Nhà ở tầng ' + tangNha.slice(1) + ' chỉ nhận được bí kíp tới ' + tran +
        ' sao. Bí kíp ' + sao + ' sao là vượt tầng — không trao.' };
    return { ok: true, tran: tran, sao: sao };
  };

  /* ═══════════ MẪU THÔNG BÁO ═══════════
     Điền chỗ trống vào mẫu của kho. MỌI giá trị đi qua U.h() trước khi
     ghép — mã số và tên tầng tuy do hệ sinh ra, nhưng ngày mai chúng
     đến từ máy chủ, và lúc ấy chúng là chữ của người khác. */
  G.tinDien = function (maMau, gia) {
    var m = (G.TIN_MAU || []).filter(function (x) { return x.ma === maMau; })[0];
    if (!m) return null;
    gia = gia || {};
    var thieu = [];
    var cau = String(m.mau).replace(/\{(\w+)\}/g, function (_, k) {
      if (gia[k] === undefined || gia[k] === null || gia[k] === '') { thieu.push(k); return '{' + k + '}'; }
      return h(String(gia[k]));
    });
    return { ma: m.ma, loai: m.loai, o: m.o, vi: m.vi, kichThich: m.kichThich,
      cau: cau, thieu: thieu, dayDu: thieu.length === 0 };
  };

  /* ═══════════ BẢNG TIN CỦA MỘT TẦNG ═══════════
     Tầng nào có bảng tin của tầng ấy. Loại tin nào lên bảng thì đọc từ
     cột `dang` của kho, không gõ lại danh sách ở đây. */
  G.tinBangTang = function (tang) {
    var sao = G.bkSao(tang);
    var loai = (G.TIN_LOAI || []).filter(function (l) { return l.dang === true; });
    var mau = loai.map(function (l) {
      var m = (G.TIN_MAU || []).filter(function (x) { return x.loai === l.ma; })[0];
      if (!m) return null;
      var gia = { maSo: 'F-000', maSoKem: 'F-000', maSoDuocKem: 'F-000',
        tang: tang.slice(1), sao: sao };
      gia.diem = m.loai === 'KEM_VUOT'
        ? (G.TIN_KEM_THUONG || {}).diem : (G.TIN_THUONG || {}).diem;
      var d = G.tinDien(m.ma, gia);
      return d ? { loai: l, mau: m, mo: d } : null;
    }).filter(Boolean);
    /* Nguồn tin sống — chưa có sổ nào ở máy chủ. Nói thẳng chỗ ấy chứ
       không để bảng trống không lời giải thích. */
    var nguon = ['N-XONG', 'N-CHUYEN', 'N-KEM'].map(function (m) {
      var x = G.tinSo(m); x.ma = m; return x;
    }).filter(function (x) { return !!x.ten || x.chuaCoNguon; });
    return { tang: tang, sao: sao, mau: mau, nguon: nguon,
      chuaCoTinSong: nguon.every(function (x) { return x.chuaCoNguon; }) };
  };

  /* Bảng tin KHÔNG được chạm vào tên. FAMILIES mang cả tên nhà, tên học
     viên, tên phụ huynh và tên Coach; bảng tin chỉ được cột id. */
  G.tinLocNha = function (f) {
    if (!f || !f.id) return null;
    return { maSo: f.id, tang: f.tier ? 'T' + f.tier : null };
  };

  /* ═══════════ SOI ═══════════ */
  G.tinSoi = function () {
    var loi = [];
    if ((G.TIN_TIEUCHI || []).length !== 6) loi.push('phải đúng 6 tiêu chí');
    (G.TIN_TIEUCHI || []).forEach(function (t) {
      if (!t.dat || !t.truot) loi.push('tiêu chí ' + t.no + ':thiếu cột đạt/trượt');
    });
    (G.TIN_NGUON || []).forEach(function (n) {
      if (typeof n.co !== 'boolean') loi.push(n.ma + ':cột co không phải đúng/sai');
      else if (n.co && !n.demTu) loi.push(n.ma + ':khai CÓ mà không nói đếm từ đâu');
      else if (!n.co && !n.thieu) loi.push(n.ma + ':khai CHƯA mà không nói thiếu gì');
      if (n.co && n.thieu) loi.push(n.ma + ':khai CÓ mà vẫn ghi thiếu');
    });
    (G.TIN_LOAI || []).forEach(function (l) {
      if (!l.khi || !l.demTu || !l.viDangTin) loi.push(l.ma + ':loại tin thiếu cột');
    });
    if ((G.TIN_NGUON_LUAT || {}).khongCoNguonThiKhongHien !== true)
      loi.push('chưa khai luật không có nguồn thì không hiện');
    if ((G.TIN_TIEUCHI_LUAT || {}).duSau !== true) loi.push('chưa khai phải đủ sáu tiêu chí');
    if ((G.TIN_CAM || []).length < 5) loi.push('bảng điều cấm dưới 5 mục');
    return loi;
  };

  /* Con số nào trong kho đang được hiện ra mà không khai nguồn. Hôm nay
     nó gọi tên đúng một chỗ: CUHICH.thamgia. */
  G.tinSoiSoKhongNguon = function () {
    var ra = [];
    (G.CUHICH || []).forEach(function (c) {
      if (typeof c.thamgia === 'number' && c.nguonSo === undefined)
        ra.push('CUHICH.' + c.ma + '.thamgia=' + c.thamgia);
    });
    return ra;
  };

  /* ═══════════════════════════════════════════════════════════
     MÀN HÌNH
     ═══════════════════════════════════════════════════════════ */
  G.VIEWS['bang-tin'] = function () {
    if (!G.TIN_NGUON)
      return U.empty('Chưa mở được bảng tin', 'Phần này nằm trong gói nền. Đăng nhập lại để nạp.');

    var o = U.ph({ eyebrow: 'BẢNG TIN CỘNG ĐỒNG', ic: 'users', grad: 1,
      t: 'Không phải nhà mình đi một mình',
      lead: 'Biết có những nhà khác cũng đang đi, tối nay, là thứ giữ người ta lại — ' +
        'mạnh hơn mọi lời động viên. Với điều kiện mỗi con số ở đây nói được nó đếm từ đâu.' });

    /* ── Số của nhà mình: thứ duy nhất đang đếm được thật ── */
    var nm = G.tinNhaMinh();
    if (nm && !nm.chuaBatDau) {
      o += U.sec('NHÀ MÌNH ĐÃ ĐI ĐƯỢC BAO NHIÊU', 'Đếm từ sổ bàn cờ trong máy nhà mình.');
      o += '<div class="bc-dinh">' +
        '<div class="bc-so"><b>' + nm.tong.o + '</b><span>ô đã có màu</span></div>' +
        '<div class="bc-so"><b>' + nm.tong.diem + '</b><span>điểm cộng lại</span></div>' +
        '<div class="bc-so"><b>' + nm.tong.tang + '</b><span>tầng đã xong</span></div>' +
        '<div class="bc-so"><b>' + nm.tang.length + '</b><span>bàn cờ đang chạy</span></div></div>';
    } else {
      o += '<div class="card mb"><p class="sm" style="line-height:1.8">Nhà mình chưa đặt quân nào. ' +
        'Đặt một quân ở <b>Bàn cờ hành trình</b> là ô đầu tiên có màu, và bảng tin này bắt đầu ' +
        'có số của chính nhà mình.</p></div>';
    }

    /* ── BẢNG TIN CỦA TỪNG TẦNG ──
       Tầng nào có bảng tin của tầng ấy. Nhà tầng một đọc tin của tầng
       năm thì thấy một khoảng cách xa tới mức không định vị được mình
       ở đâu, và cái xa ấy làm người ta bỏ chứ không làm người ta đi. */
    var TL = G.TIN_TANG_LUAT || {};
    var tgT = G.S.tinTang || (G.S.bcTang) || 'T1';
    if (!(G.HT_TANG || []).filter(function (x) { return x.ma === tgT; })[0]) tgT = 'T1';
    o += U.sec('BẢNG TIN CỦA TẦNG ' + tgT.slice(1), TL.cot || '');
    o += '<div class="row wrap mb" style="gap:8px">' +
      (G.HT_TANG || []).map(function (t) {
        return '<button class="btn ' + (t.ma === tgT ? 'pri' : 'ghost') + ' sm" data-tintang="' +
          t.ma + '">Tầng ' + t.so + '<span class="muted"> · ' + t.so + ' sao</span></button>';
      }).join('') + '</div>';
    var bt = G.tinBangTang(tgT);
    o += '<div class="tin-bang">' + bt.mau.map(function (x) {
      return '<div class="tin-dong" style="--tin-c:' + x.loai.c + '">' +
        '<span class="tin-nhan">' + h(x.loai.ten) + '</span>' +
        '<p class="tin-cau">' + x.mo.cau + '</p>' +
        '<p class="tin-o">Đăng ở: ' + h(x.mau.o) + '</p>' +
        '<p class="tin-vi">' + h(x.mau.kichThich) + '</p></div>';
    }).join('') + '</div>';
    /* Mẫu thì có, tin sống thì chưa — nói thẳng, đừng để bảng trống
       không lời giải thích. */
    if (bt.chuaCoTinSong)
      o += '<div class="card mb"><p class="sm" style="line-height:1.8">' +
        '<b style="color:#B4720F">Bảng này đang trống vì chưa có tin thật.</b> Trên kia là ' +
        'ĐÚNG những dòng sẽ hiện khi có nhà đầu tiên vượt tầng. Ba sổ đếm còn thiếu:</p>' +
        '<p class="tiny dim mt" style="line-height:1.75">' +
        bt.nguon.map(function (n) { return h((n.ten || n.ma) + ' — ' + (n.thieu || '')); })
          .join('<br>') + '</p></div>';
    o += '<p class="tiny dim mb" style="line-height:1.7"><b>Chỉ nêu mã số, không nêu tên. </b>' +
      h(TL.viCamInTen || '') + '</p>';

    /* ── Bí kíp: mấy sao, và trao được cho ai ── */
    var BK = G.BK_LUAT || {};
    o += U.sec('BÍ KÍP — QUÀ CỦA CẢ HỆ', BK.cot || '');
    o += '<div class="card mb">' + (G.HT_TANG || []).map(function (t) {
      var k = G.bkChoPhep(t.ma, bt.sao);
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">Tầng ' + t.so + ' · nhận được bí kíp tới <b>' + t.so + ' sao</b></b>' +
        '<p class="tiny dim mt" style="line-height:1.7">Bí kíp ' + bt.sao + ' sao của tầng ' +
        tgT.slice(1) + ': ' + (k.ok ? 'trao được.' : h(k.y)) + '</p></div>';
    }).join('') + '</div>';
    o += '<p class="tiny dim mb" style="line-height:1.7"><b>' + h(BK.khongVuotTang
      ? 'Không trao bí kíp vượt tầng. ' : '') + '</b>' + h(BK.viKhongVuotTang || '') +
      ' <span class="dim">(số sao đọc từ ' + h(BK.saoDocTu || '') + ')</span></p>';

    /* ── Ba con số cộng đồng: nói thẳng chưa có sổ nào ── */
    var cd = G.tinCongDong(), thieu = cd.filter(function (x) { return x.chuaCoNguon; });
    o += U.sec('SỐ CỦA CẢ CỘNG ĐỒNG' + (thieu.length ? ' — ' + thieu.length + ' CON SỐ CHƯA CÓ SỔ ĐẾM' : ''),
      (G.TIN_NGUON_LUAT || {}).cot || '');
    o += '<div class="card mb">' + cd.map(function (x) {
      return '<div style="padding:11px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm" style="color:' + (x.chuaCoNguon ? '#B4720F' : '#0B7350') + '">' +
        (x.chuaCoNguon ? '○ ' : '✓ ') + h(x.ten || x.ma) + '</b>' +
        (x.chuaCoNguon
          ? '<p class="sm mt" style="line-height:1.75;color:#B4720F"><b>Thiếu:</b> ' + h(x.thieu) + '</p>' +
            '<p class="tiny dim mt" style="line-height:1.7">' + h(x.vi || '') + '</p>'
          : '<p class="sm mt" style="line-height:1.75">' + h(String(x.so)) + '</p>' +
            '<p class="tiny dim mt">Đếm từ: ' + h(x.demTu) + '</p>') + '</div>';
    }).join('') + '</div>';
    o += '<p class="tiny dim mb" style="line-height:1.7"><b>' +
      h((G.TIN_NGUON_LUAT || {}).vi || '') + '</b></p>';

    /* ── Con số không nguồn đang có trong kho ── */
    var kn = G.tinSoiSoKhongNguon();
    if (kn.length)
      o += '<div class="card mb" style="border-color:#B4720F5e">' +
        '<span class="tiny up" style="color:#B4720F">' + kn.length + ' CON SỐ TRONG KHO CHƯA KHAI NGUỒN</span>' +
        '<p class="sm mt" style="line-height:1.8">' + h(kn.join(' · ')) + '</p>' +
        '<p class="tiny dim mt" style="line-height:1.7">' +
        h((G.TIN_NGUON_LUAT || {}).daCoMotChoNhuThe || '') + '</p>' +
        '<p class="tiny mt" style="line-height:1.7;color:#B4720F">Bảng tin này không mượn lại chúng. ' +
        'Sửa nội dung đã phát hành là việc của chủ hệ.</p></div>';

    /* ── Bốn loại tin sẽ đăng ── */
    o += U.sec('BỐN LOẠI TIN SẼ ĐĂNG', 'Mỗi loại khai nó đếm từ đâu, và vì sao nó đáng đăng.');
    o += (G.TIN_LOAI || []).map(function (l) {
      return '<div class="card mb" style="border-color:' + l.c + '3e">' +
        '<span class="tiny up" style="color:' + l.c + '">' + h(l.ten) + '</span>' +
        '<p class="sm mt" style="line-height:1.8"><b>Khi nào:</b> ' + h(l.khi) + '</p>' +
        '<p class="sm mt" style="line-height:1.8"><b>Đếm từ:</b> ' + h(l.demTu) + '</p>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(l.viDangTin) + '</p></div>';
    }).join('');

    /* ── Sáu tiêu chí chọn chuyện ── */
    o += U.sec('SÁU TIÊU CHÍ ĐỂ MỘT CÂU CHUYỆN ĐƯỢC CHỌN',
      (G.TIN_TIEUCHI_LUAT || {}).vi || '');
    o += '<div class="card mb">' + (G.TIN_TIEUCHI || []).map(function (t) {
      return '<div style="padding:10px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + t.no + '. ' + h(t.t) + '</b>' +
        '<p class="sm mt" style="line-height:1.75;color:#0B7350"><b>Đạt:</b> ' + h(t.dat) + '</p>' +
        '<p class="sm mt" style="line-height:1.75;color:#B4720F"><b>Trượt:</b> ' + h(t.truot) + '</p></div>';
    }).join('') + '</div>';
    o += '<p class="tiny dim mb" style="line-height:1.7">' +
      h((G.TIN_TIEUCHI_LUAT || {}).aiChon || '') + '</p>';

    /* ── Thưởng ── */
    var tw = G.TIN_THUONG || {};
    o += U.sec('CHUYỆN ĐƯỢC CHỌN THÌ NHÀ ẤY ĐƯỢC GÌ', '');
    o += '<div class="card mb">' +
      '<p class="sm" style="line-height:1.8"><b>Luôn có:</b> ' + h(tw.luonCo || '') + '</p>' +
      '<p class="sm mt" style="line-height:1.8;color:#B4720F"><b>Chờ chủ hệ chốt:</b> ' +
      h(tw.diemChoChu || '') + '</p>' +
      '<p class="sm mt" style="line-height:1.8;color:#B4720F"><b>Chờ chủ hệ chốt:</b> ' +
      h(tw.quaChoChu || '') + '</p>' +
      '<p class="tiny dim mt" style="line-height:1.7">' + h(tw.viRangBuoc || '') + '</p></div>';

    /* ── Năm điều bảng tin không bao giờ làm ── */
    o += U.sec('NĂM ĐIỀU BẢNG TIN KHÔNG BAO GIỜ LÀM', '');
    o += '<div class="card mb">' + (G.TIN_CAM || []).map(function (c) {
      return '<div style="padding:9px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + h(c.t) + '</b>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(c.y) + '</p></div>';
    }).join('') + '</div>';

    o += U.sec('Sáu luật của bảng tin', '');
    o += '<div class="card">' + (G.TIN_LUAT || []).map(function (l) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--gita-vien-2)">' +
        '<b class="sm">' + l.no + '. ' + h(l.t) + '</b>' +
        '<p class="tiny dim mt" style="line-height:1.7">' + h(l.y) + '</p></div>';
    }).join('') + '</div>';
    return o;
  };

  /* ═══════════ BẤM ═══════════ */
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-tintang]');
    if (!t) return;
    G.S.tinTang = t.getAttribute('data-tintang');
    if (G.save) G.save();
    G.render();
  });
})();
