/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · LỚP GIAO DIỆN
   Không thư viện ngoài. Đọc GV.NHOM và GV.MAN rồi dựng ra ứng dụng.
   Quy tắc: mọi chuỗi đi vào HTML đều qua e() — kể cả chuỗi của chính
   mình, vì kho sẽ được người khác biên tập trong ba mươi năm tới.
   Thêm nội dung thì sửa man-hinh.js; chỉ sửa tệp này khi cần một LOẠI
   khối chưa từng có.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function () {
  var G = window.GV;

  /* ── tiện ích ────────────────────────────────────── */
  function e(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  /* Đậm bằng *…* — đánh dấu tối thiểu, cố ý không mở rộng thêm.
     Chạy SAU e() nên nội dung vẫn được thoát đầy đủ. */
  function dm(s) { return e(s).replace(/\*([^*]+)\*/g, '<strong>$1</strong>'); }
  function ds(a, f) { return (a || []).map(f).join(''); }
  function lay(o) { return o.tu ? G.TU[o.tu] : o.ds; }

  /* Màu đi thẳng vào thuộc tính style. Thoát ký tự thôi chưa đủ: một
     giá trị như "red;background:url(...)" vẫn chèn được khai báo CSS
     mới. Nên chỉ nhận đúng dạng #rrggbb, sai thì rơi về màu chữ. */
  function mau(s) { return /^#[0-9A-Fa-f]{6}$/.test(s) ? s : 'currentColor'; }

  /* ── tài khoản đang xem ──────────────────────────── */
  var VAI = 'R01', BAC = 'B1';
  function docTT() {
    /* Bản cắt (dong-goi-artifact.cjs --vai=) đã bỏ hẳn phần nội dung
       ngoài quyền khỏi tệp. Khoá luôn thanh đổi vai để không tạo ảo
       giác rằng đổi vai sẽ mở thêm được gì. */
    if (G.KHOA_VAI) { VAI = G.KHOA_VAI; BAC = G.KHOA_BAC || 'B1'; return; }
    try {
      var v = localStorage.getItem('genviet365.vai');
      var b = localStorage.getItem('genviet365.bac');
      if (v && G.timVai(v)) VAI = v;
      if (b && G.BAC_SO[b]) BAC = b;
    } catch (x) {}
  }
  function luuTT() {
    try {
      localStorage.setItem('genviet365.vai', VAI);
      localStorage.setItem('genviet365.bac', BAC);
    } catch (x) {}
  }
  G.vaiHienTai = function () { return { vai: VAI, bac: BAC }; };

  /* ── các loại khối ───────────────────────────────── */
  var K = {};

  K.van = function (o) { return '<p class="van">' + dm(o.tu ? G.TU[o.tu] : o.t) + '</p>'; };

  K.muc = function (o) { return '<h3 class="muc-con">' + e(o.t) + '</h3>'; };

  K.trich = function (o) {
    return '<blockquote class="trich">' + e(o.t) +
      (o.n ? '<cite>' + e(o.n) + '</cite>' : '') + '</blockquote>';
  };

  K.so = function (o) {
    return '<div class="so">' + ds(lay(o), function (r) {
      return '<div><b>' + e(r.b) + '</b><span>' + e(r.t) + '</span></div>';
    }) + '</div>';
  };

  K.bang = function (o) {
    return '<div class="cuon"><table><thead><tr>' +
      ds(o.cot, function (c) { return '<th>' + e(c) + '</th>'; }) +
      '</tr></thead><tbody>' + ds(o.tu ? G.TU[o.tu] : o.hang, function (h) {
        return '<tr>' + h.map(function (o2, i) {
          return i === 0 ? '<td><strong>' + e(o2) + '</strong></td>'
                         : '<td class="mo">' + e(o2) + '</td>';
        }).join('') + '</tr>';
      }) + '</tbody></table></div>';
  };

  K.ds = function (o) {
    var t = o.so ? 'ol' : 'ul';
    return '<' + t + ' class="ds' + (o.so ? ' ds-so' : '') + '">' +
      ds(lay(o), function (x) { return '<li>' + dm(x) + '</li>'; }) + '</' + t + '>';
  };

  K.the = function (o) {
    var d = o.tu ? G.TU[o.tu] : o;
    if (typeof d === 'string') d = { t: o.t, n: d };
    return '<div class="the">' + (d.t ? '<h3>' + e(d.t) + '</h3>' : '') +
      (d.n ? '<p>' + dm(d.n) + '</p>' : '') +
      (d.vi ? '<p class="vi">' + dm(d.vi) + '</p>' : '') + '</div>';
  };

  K.luoi = function (o) {
    return '<div class="luoi ' + (o.c === 3 ? 'ba' : 'hai') + '">' + ds(lay(o), function (x) {
      return '<div class="the"><h3>' + e(x.t) + '</h3><p>' + dm(x.n) + '</p>' +
        (x.vi ? '<p class="vi">' + dm(x.vi) + '</p>' : '') + '</div>';
    }) + '</div>';
  };

  K.ly = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<div class="the ly"><div class="stt">' + e(x.so) + '</div>' +
        '<div><h3>' + e(x.t) + '</h3><p>' + e(x.n) + '</p>' +
        '<p class="vi">' + e(x.v) + '</p></div></div>';
    }) + '</div>';
  };

  K.thap = function (o) {
    return '<div class="thap">' + ds(lay(o), function (x) {
      return '<div class="tang"><div class="ma">' + e(x.ma) + '</div>' +
        '<div class="noi"><div class="hang"><h3>' + e(x.t) + '</h3>' +
        '<span class="toc">' + e(x.toc) + '</span></div>' +
        '<div class="giu">' + e(x.giu) + '</div>' +
        '<div class="ai">Người giữ: ' + e(x.ai) + '</div>' +
        '<div class="chi">' + e(x.chi) + '</div></div></div>';
    }) + '</div>';
  };

  K.bac = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<article class="bac" style="--c:' + mau(x.mau) + '">' +
        '<div class="top"><div class="hang"><span class="m">' + e(x.ma) + '</span>' +
          '<h3>' + e(x.t) + '</h3><span class="tuoi">' + e(x.tuoi) + '</span></div>' +
          '<div class="hoi">' + e(x.hoi) + '</div></div><dl>' +
        '<div><dt>Đích của bậc</dt><dd class="manh">' + e(x.dich) + '</dd></div>' +
        '<div><dt>Trục trọng tâm</dt><dd>' + e(x.truc) + '</dd></div>' +
        '<div><dt>Bằng chứng</dt><dd>' + e(x.bang) + '</dd></div>' +
        '<div><dt>Cổng nghiệm thu</dt><dd>' + e(x.cong) + '</dd></div>' +
        '<div><dt>Tối thiểu · người chịu trách nhiệm</dt><dd>' + e(x.toi) + ' · ' + e(x.ai) + '</dd></div>' +
        '</dl></article>';
    }) + '</div>';
  };

  K.tru = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<div class="tru" style="--c:' + mau(x.mau) + '">' +
        '<div class="dinh"><div class="k">' + e(x.k) + '</div><h3>' + e(x.t) + '</h3>' +
        '<div class="hoi">' + e(x.hoi) + '</div></div><ul>' +
        ds(x.truc, function (t) {
          return '<li><span class="n">' + e(t.so) + '</span><div><b>' + e(t.t) + '</b>' +
            '<span>' + e(t.do) + ' · ' + e(t.bang) + ' · ' + e(t.ky) + '</span></div></li>';
        }) + '</ul></div>';
    }) + '</div>';
  };

  K.thang = function (o) {
    return '<div class="thang">' + ds(lay(o), function (x) {
      return '<div class="nac"><div class="m">' + e(x.m) + '</div><div class="noi">' +
        '<b>' + e(x.t) + '</b><span>Quyền điều hành: ' + e(x.quyen) + '</span>' +
        '<span>Mức hỗ trợ: ' + e(x.ho) + '</span><span>Bằng chứng: ' + e(x.bang) + '</span>' +
        '</div></div>';
    }) + '</div>';
  };

  K.pc = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<div class="pc" style="--c:' + mau(x.mau) + '">' +
        '<div class="dinh"><span class="k">' + e(x.k) + '</span><h3>' + e(x.t) + '</h3>' +
        '<span class="tru-n">trụ ' + e(x.tru) + '</span></div>' +
        '<div class="than"><p>' + e(x.n) + '</p>' +
        '<div class="ren"><b>Rèn ở đâu</b>' + e(x.ren) + '</div>' +
        '<div class="do"><b>Đo bằng gì</b>' + e(x.do) + '</div></div></div>';
    }) + '</div>';
  };

  K.nhip = function (o) {
    return '<div class="the khung-nhip">' + ds(lay(o), function (x) {
      return '<div class="nhip"><div class="cot">' + e(x.chu) + '</div>' +
        '<div class="noi"><b>' + e(x.viec) + '</b>' +
        '<span class="ai">' + e(x.ai) + ' → ' + e(x.ra) + '</span>' +
        '<span class="vi">' + e(x.vi) + '</span></div></div>';
    }) + '</div>';
  };

  /* nhịp rút gọn: hai cột, không có dòng ý đồ */
  K.nhip2 = function (o) {
    return '<div class="the khung-nhip">' + ds(lay(o), function (x) {
      return '<div class="nhip"><div class="cot">' + e(x.a) + '</div>' +
        '<div class="noi"><b>' + e(x.b) + '</b></div></div>';
    }) + '</div>';
  };

  K.lich = function (o) {
    return '<div class="lich">' + ds(lay(o), function (x) {
      return '<div class="muc-l"><span class="p">' + e(x.p) + '</span>' +
        '<div class="noi"><b>' + e(x.m) + '</b>' +
        (x.ai ? '<span class="ai">' + e(x.ai) + '</span>' : '') +
        '<span class="y">' + e(x.y) + '</span></div></div>';
    }) + '</div>';
  };

  K.buoc = function (o) {
    return '<div class="vong">' + ds(lay(o), function (x) {
      return '<div class="buoc"><span class="v">' + e(x.v) + '</span>' +
        '<div class="noi"><h3>' + e(x.t) + '</h3>' +
        '<span class="dk">Điều kiện: ' + e(x.dk) + '</span>' +
        '<span class="duoc">' + e(x.duoc) + '</span></div>' +
        '<span class="bmap">' + e(x.bac) + '</span></div>';
    }) + '</div>';
  };

  K.mau = function (o) {
    return '<div class="bang">' + ds(lay(o), function (x) {
      return '<div class="o" style="--c:' + mau(x.mau) + '"><div class="dai"></div><div class="noi">' +
        '<b>' + e(x.b) + '</b><p>' + e(x.n) + '</p>' +
        '<p class="dam">' + e(x.lam) + '</p>' +
        '<div class="cham">Nhịp chạm: ' + e(x.cham) + '</div></div></div>';
    }) + '</div>';
  };

  K.mt = function (o) {
    return '<div class="luoi mot">' + ds(lay(o), function (x) {
      return '<div class="mt" style="--c:' + mau(x.mau) + '">' +
        '<div class="hang"><span class="m">' + e(x.ma) + '</span><h3>' + e(x.t) + '</h3>' +
        '<span class="truc">' + e(x.truc) + '</span></div>' +
        '<p>' + e(x.n) + '</p>' +
        '<div class="lam"><strong>Làm gì:</strong> ' + e(x.lam) + '</div>' +
        '<div class="xn">Ai xác nhận: ' + e(x.xn) + '</div>' +
        '<div class="vi">' + e(x.vi) + '</div></div>';
    }) + '</div>';
  };

  K.rui = function (o) {
    return '<div class="the">' + ds(lay(o), function (x) {
      return '<div class="rui"><div class="cham"></div><div>' +
        '<h3>' + e(x.t) + '</h3><span class="dh">Dấu hiệu: ' + e(x.dau) + '</span>' +
        '<div class="phanh"><b>Phanh</b>' + e(x.phanh) + '</div></div></div>';
    }) + '</div>';
  };

  K.chang = function (o) {
    return '<div class="tram">' + ds(lay(o), function (x) {
      return '<article class="chang" style="--c:' + mau(x.mau) + '">' +
        '<div class="top"><div class="hang"><span class="m">' + e(x.ma) + '</span>' +
        '<h3>' + e(x.t) + '</h3><span class="nam">' + e(x.nam) + '</span></div>' +
        '<div class="hoi">' + e(x.hoi) + '</div></div><div class="than-c">' +
        '<div><h4>Việc lõi</h4><ul>' + ds(x.lam, function (y) { return '<li>' + e(y) + '</li>'; }) + '</ul></div>' +
        '<div><h4>Đích</h4><div class="dich">' + ds(x.dich, function (y) { return '<span>' + e(y) + '</span>'; }) + '</div></div>' +
        '<div><h4>Cổng sang chặng sau</h4><div class="cong">' + e(x.cong) + '</div></div>' +
        '<div class="rui-c">Rủi ro chính: ' + e(x.rui) + '</div></div></article>';
    }) + '</div>';
  };

  K.luat = function (o) {
    return '<div class="the"><ol class="luat">' + ds(lay(o), function (x) {
      return '<li><span>' + dm(x) + '</span></li>';
    }) + '</ol></div>';
  };

  /* một điều luật đứng riêng, cỡ lớn */
  K.luat1 = function (o) {
    var d = G.TU[o.tu];
    return '<div class="the luat1"><h3>' + e(d.t) + '</h3><p>' + dm(d.n) + '</p></div>';
  };

  K.ma = function (o) {
    return '<div class="cuon-ma"><pre><code>' + e(G.TU[o.tu]) + '</code></pre></div>';
  };

  /* lộ trình bậc — mỗi bậc một khối chu kỳ */
  K.ck = function (o) {
    return ds(lay(o), function (b) {
      return '<div class="lt" style="--c:' + mau(b.mau) + '">' +
        '<div class="lt-dau"><span class="m">' + e(b.bac) + '</span><h3>' + e(b.t) + '</h3>' +
        '<span class="tong">' + e(b.tong) + '</span></div>' +
        '<div class="lt-than">' + ds(b.ck, function (c) {
          return '<div class="cky"><div class="cky-dau"><span class="n">' + e(c.n) + '</span>' +
            '<b>' + e(c.t) + '</b><span class="ng">' + e(c.ngay) + '</span></div>' +
            '<ul>' + ds(c.viec, function (v) { return '<li>' + e(v) + '</li>'; }) + '</ul>' +
            '<div class="ra"><b>Đầu ra</b>' + e(c.ra) + '</div>' +
            '<div class="cg"><b>Cổng</b>' + e(c.cong) + '</div></div>';
        }) + '</div></div>';
    });
  };

  /* khoá nền — tám buổi */
  K.buoi = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<div class="the buoi"><div class="b-dau"><span class="n">Buổi ' + e(x.b) + '</span>' +
        '<h3>' + e(x.t) + '</h3></div>' +
        '<div class="dich-b">' + e(x.dich) + '</div>' +
        '<div class="d"><b>Trên lớp</b>' + e(x.lop) + '</div>' +
        '<div class="d"><b>Về nhà</b>' + e(x.nha) + '</div>' +
        '<div class="d kiem"><b>Kiểm bằng</b>' + e(x.kiem) + '</div></div>';
    }) + '</div>';
  };

  /* 24 chuyên đề — bốn nhóm sáu */
  K.cd = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (n) {
      return '<div class="cdn" style="--c:' + mau(n.mau) + '"><h3>' + e(n.nhom) + '</h3><ol>' +
        ds(n.ds, function (x) {
          return '<li><b>' + e(x.t) + '</b><span>' + e(x.lam) + '</span></li>';
        }) + '</ol></div>';
    }) + '</div>';
  };

  K.trai = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<div class="the trai"><div class="b-dau"><h3>' + e(x.t) + '</h3>' +
        '<span class="n">' + e(x.ngay) + '</span></div>' +
        '<div class="meta">' + e(x.ai) + ' · ' + e(x.quy) + ' · trục ' + e(x.truc) + '</div>' +
        '<p class="dich-b">' + e(x.dich) + '</p>' +
        '<b class="nhan-n">Sáu khoảnh khắc bắt buộc</b><ol class="ds ds-so">' +
        ds(x.khoanh, function (y) { return '<li>' + e(y) + '</li>'; }) + '</ol></div>';
    }) + '</div>';
  };

  K.bm = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<div class="the bm"><div class="b-dau"><span class="n">' + e(x.m) + '</span>' +
        '<h3>' + e(x.t) + '</h3></div>' +
        '<div class="ai-bm">' + e(x.ai) + '</div>' +
        '<div class="tr">' + e(x.truong) + '</div></div>';
    }) + '</div>';
  };

  /* bảng điểm cổng — sáu cột với thanh tỷ trọng */
  K.diem = function (o) {
    var t = lay(o), tong = 0, i;
    for (i = 0; i < t.length; i++) tong += t[i].d;
    var toi = 0;
    for (i = 0; i < t.length; i++) if (t[i].d > toi) toi = t[i].d;
    return '<div class="the diem">' + ds(t, function (x) {
      return '<div class="hang-d"><span class="t">' + e(x.t) + '</span>' +
        '<span class="d">' + e(x.d) + '</span>' +
        '<div class="thanh"><i style="width:' + (Number(x.d) / toi * 100).toFixed(2) + '%"></i></div>' +
        '<span class="n">' + e(x.n) + '</span></div>';
    }) + '<div class="tong-d">Tổng ' + tong + ' điểm · ngưỡng đạt ' +
      e(o.nguong == null ? 85 : o.nguong) + '</div></div>';
  };

  K.quy = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<div class="quy" style="--c:' + mau(x.mau) + '">' +
        '<div class="q-dau"><span class="q">' + e(x.q) + '</span>' +
        '<b>' + e(x.chu) + '</b><span class="tu">' + e(x.tuan) + '</span></div><ul class="moc">' +
        ds(x.moc, function (m) {
          return '<li><span class="t">' + e(m.t) + '</span><span>' + e(m.v) + '</span></li>';
        }) + '</ul></div>';
    }) + '</div>';
  };

  K.nam = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<div class="quy" style="--c:' + mau(x.mau) + '">' +
        '<div class="q-dau"><span class="q">' + e(x.q) + '</span><b>' + e(x.chu) + '</b></div>' +
        '<ul class="viec">' + ds(x.viec, function (v) { return '<li>' + e(v) + '</li>'; }) + '</ul>' +
        '<div class="dich">' + ds(x.so, function (s) { return '<span>' + e(s) + '</span>'; }) + '</div></div>';
    }) + '</div>';
  };

  K.vai = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (n) {
      return '<div class="the"><span class="nhan">' + e(n.nhom) + '</span><ul class="vai">' +
        ds(n.ds, function (v) {
          return '<li><b>' + e(v.v) + '</b>' +
            (v.moi ? ' <span class="nhan nhat">mới</span>' : '') +
            '<br><span>' + e(v.l) + '</span></li>';
        }) + '</ul></div>';
    }) + '</div>';
  };

  K.stmt = function (o) {
    return ds(lay(o), function (x) {
      return '<div class="mt st" style="--c:' + mau(x.mau) + '">' +
        '<div class="hang"><span class="m">' + e(x.m) + '</span><h3>' + e(x.t) + '</h3></div>' +
        '<p>' + e(x.n) + '</p><div class="viec-mt">' +
        ds(x.viec, function (v) {
          return '<div class="v"><b>' + e(v.t) + '</b><span>' + e(v.v) + '</span></div>';
        }) + '</div>' +
        '<div class="xn">Ai xác nhận: ' + e(x.xn) + '</div>' +
        '<div class="vi">' + e(x.bay) + '</div></div>';
    });
  };

  K.stv = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<div class="stv" style="--c:' + mau(x.mau) + '"><h3>' + e(x.v) + '</h3>' +
        '<div class="k"><b>Hằng tuần</b><ul>' + ds(x.tuan, function (y) { return '<li>' + e(y) + '</li>'; }) + '</ul></div>' +
        '<div class="k"><b>Hằng tháng</b><ul>' + ds(x.thang, function (y) { return '<li>' + e(y) + '</li>'; }) + '</ul></div>' +
        '<div class="k khong"><b>Không được làm</b><ul>' + ds(x.khong, function (y) { return '<li>' + e(y) + '</li>'; }) + '</ul></div>' +
        '<div class="do-stv"><b>Đo bằng</b>' + e(x.do) + '</div></div>';
    }) + '</div>';
  };

  K.moc = function (o) {
    return '<div class="luoi ba">' + ds(lay(o), function (x) {
      return '<div class="the"><span class="nhan">' + e(x.m) + '</span><h3 class="sau">' + e(x.t) + '</h3>' +
        '<ul class="ds">' + ds(x.v, function (y) { return '<li>' + e(y) + '</li>'; }) + '</ul></div>';
    }) + '</div>';
  };

  K.canh = function (o) {
    return '<div class="the canh"><ul>' + ds(lay(o), function (x) {
      return '<li>' + e(x) + '</li>';
    }) + '</ul></div>';
  };

  /* bước có số — quy trình, đường vào, chuỗi điểm chạm */
  K.buocso = function (o) {
    return '<ol class="bso">' + ds(lay(o), function (x) {
      return '<li><span class="s">' + e(x.b) + '</span><div class="noi">' +
        '<b>' + e(x.t) + '</b>' +
        (x.ai ? '<span class="ai">' + e(x.ai) + '</span>' : '') +
        '<span class="y">' + e(x.n) + '</span>' +
        (x.ra ? '<span class="ra">Đầu ra: ' + e(x.ra) + '</span>' : '') +
        '</div></li>';
    }) + '</ol>';
  };

  /* thư viện chiến lược — mười nhóm, mỗi nhóm một bảng mười dòng */
  K.cl = function (o) {
    return ds(lay(o), function (n) {
      return '<div class="clg" style="--c:' + mau(n.mau) + '">' +
        '<h3>' + e(n.nhom) + '</h3>' +
        '<div class="cuon"><table><thead><tr><th>#</th><th>Chiến lược</th>' +
        '<th>Cơ chế</th><th>Trụ</th><th>Đo bằng</th></tr></thead><tbody>' +
        ds(n.ds, function (r) {
          return '<tr><td class="co">' + e(r[0]) + '</td><td><strong>' + e(r[1]) + '</strong></td>' +
            '<td class="mo">' + e(r[2]) + '</td><td class="co">' + e(r[3]) + '</td>' +
            '<td class="mo">' + e(r[4]) + '</td></tr>';
        }) + '</tbody></table></div></div>';
    });
  };

  /* thẻ bốn ô — chân dung gia đình, lý do nghỉ, gói nhà trường, đường
     nhân rộng. Bốn nhãn đặt lại được qua o.nhan, mặc định là nhãn cũ. */
  K.cd4 = function (o) {
    var n = o.nhan || ['Dấu hiệu', 'Họ cần gì', 'Mình làm gì', 'Bẫy'];
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<div class="cd4" style="--c:' + mau(x.mau) + '"><h3>' + e(x.t) + '</h3>' +
        '<div class="d"><b>' + e(n[0]) + '</b>' + dm(x.dh) + '</div>' +
        '<div class="d"><b>' + e(n[1]) + '</b>' + dm(x.can) + '</div>' +
        '<div class="d lam"><b>' + e(n[2]) + '</b>' + dm(x.lam) + '</div>' +
        '<div class="d bay"><b>' + e(n[3]) + '</b>' + dm(x.bay) + '</div></div>';
    }) + '</div>';
  };

  /* phạm vi của vai đang xem — khối duy nhất đọc trạng thái chạy */
  K.phamvi = function () {
    var v = G.timVai(VAI) || {}, tong = Object.keys(G.MAN).length;
    var mo = G.demMan(VAI, BAC), khoa = G.manBiKhoa(VAI, BAC);
    var pt = Math.round(mo / tong * 100);
    var theoBac = !!v.theoBac;
    var bacMo = null;
    (G.BAC_MO || []).forEach(function (b) { if (b.bac === BAC) bacMo = b; });
    return '<div class="so"><div><b>' + e(v.ma) + '</b><span>mã vai</span></div>' +
      '<div><b>' + e(v.lv) + '</b><span>bậc quyền</span></div>' +
      (theoBac ? '<div><b>' + e(BAC) + '</b><span>bậc năng lực</span></div>' +
                 '<div><b>' + e(G.lvHieuLuc(VAI, BAC)) + '</b><span>bậc hiệu lực</span></div>' : '') +
      '<div><b>' + mo + '/' + tong + '</b><span>màn mở được</span></div>' +
      '<div><b>' + pt + '%</b><span>tỉ lệ hiển thị</span></div></div>' +
      '<div class="the"><h3>' + e(v.t) + '</h3><p>' + e(v.ln) + '</p>' +
      (theoBac && bacMo ? '<p class="vi">Bậc ' + e(bacMo.bac) + ' · ' + e(bacMo.t) + ' — ' + e(bacMo.mo) + '</p>' : '') +
      '</div>' +
      (khoa.length
        ? '<h3 class="muc-con">' + khoa.length + ' màn chưa mở</h3><div class="cuon"><table>' +
          '<thead><tr><th>Màn</th><th>Vì sao chưa mở</th></tr></thead><tbody>' +
          ds(khoa, function (k) {
            return '<tr><td><strong>' + e(k.t) + '</strong></td><td class="mo">' + e(k.ly.n) + '</td></tr>';
          }) + '</tbody></table></div>'
        : '<p class="van">Vai này mở toàn bộ hệ thống, không khoá màn nào.</p>');
  };

  /* hành trình 365 ngày — mỗi chặng một thẻ có cột cảm xúc */
  K.hanhtrinh = function (o) {
    return '<div class="ht">' + ds(lay(o), function (x) {
      return '<article class="ht-c" style="--c:' + mau(x.mau) + '">' +
        '<div class="ht-dau"><span class="m">' + e(x.ma) + '</span><h3>' + e(x.t) + '</h3>' +
        '<span class="khi">' + e(x.khi) + '</span></div>' +
        '<div class="ht-cam"><div class="nghi"><b>Phụ huynh đang nghĩ</b>' + e(x.nghi) + '</div>' +
        '<div class="so-ht"><b>Điều họ sợ</b>' + e(x.so) + '</div></div>' +
        '<div class="ht-lam"><b>Hệ làm gì</b><ul>' +
        ds(x.lam, function (y) { return '<li>' + dm(y) + '</li>'; }) + '</ul></div>' +
        '<div class="ht-vat"><b>Gia đình cầm về</b>' + e(x.vat) + '</div>' +
        '<div class="ht-roi"><b>Dấu hiệu đang rơi</b>' + e(x.roi) + '</div>' +
        '<div class="ht-cuu"><b>Việc cứu</b>' + dm(x.cuu) + '</div></article>';
    }) + '</div>';
  };

  /* khoảnh khắc quyết định — hai cột đối chiếu */
  K.doichieu = function (o) {
    return '<div class="dc">' + ds(lay(o), function (x) {
      return '<div class="dc-h"><div class="dc-dau"><span class="s">' + e(x.so) + '</span>' +
        '<h3>' + e(x.t) + '</h3></div><div class="dc-doi">' +
        '<div class="dc-o thuong"><b>Thường thấy</b><p>' + e(x.thuong) + '</p></div>' +
        '<div class="dc-o minh"><b>Chuẩn Gen Việt</b><p>' + dm(x.minh) + '</p></div></div>' +
        '<div class="dc-do">Đo bằng: ' + e(x.do) + '</div></div>';
    }) + '</div>';
  };

  /* cam kết dịch vụ — lời hứa nào cũng phải có thứ đền */
  K.hua = function (o) {
    return '<div class="hua">' + ds(lay(o), function (x) {
      return '<div class="hua-h"><div class="hua-dau"><span class="m">' + e(x.ma) + '</span>' +
        '<h3>' + e(x.hua) + '</h3></div>' +
        '<div class="hua-o"><b>Đo bằng</b>' + e(x.do) + '</div>' +
        '<div class="hua-o nguong"><b>Ngưỡng</b>' + e(x.nguong) + '</div>' +
        '<div class="hua-o den"><b>Không giữ được thì đền</b>' + e(x.den) + '</div></div>';
    }) + '</div>';
  };

  /* gói sản phẩm */
  K.goi = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<article class="goi" style="--c:' + mau(x.mau) + '">' +
        '<div class="goi-dau"><span class="m">' + e(x.ma) + '</span><h3>' + e(x.t) + '</h3>' +
        '<span class="nh">' + e(x.nhip) + '</span></div>' +
        '<div class="goi-cho">' + e(x.cho) + '</div>' +
        '<ul class="goi-gom">' + ds(x.gom, function (y) { return '<li>' + e(y) + '</li>'; }) + '</ul>' +
        '<div class="goi-cam"><b>Cam kết đầu ra</b>' + dm(x.cam) + '</div>' +
        '<div class="goi-khong"><b>Không phù hợp với ai</b>' + dm(x.khong) + '</div></article>';
    }) + '</div>';
  };

  /* ba lớp bảo đảm */
  K.baodam = function (o) {
    return '<div class="luoi ba">' + ds(lay(o), function (x) {
      return '<div class="bd" style="--c:' + mau(x.mau) + '"><h3>' + e(x.t) + '</h3>' +
        '<div class="d"><b>Điều kiện</b>' + dm(x.dk) + '</div>' +
        '<div class="d duoc"><b>Được gì</b>' + dm(x.duoc) + '</div>' +
        '<div class="d"><b>Ai phán quyết</b>' + dm(x.ai) + '</div>' +
        '<div class="d gioi"><b>Giới hạn nói rõ</b>' + dm(x.gioi) + '</div></div>';
    }) + '</div>';
  };

  /* mười hai phản đối thường gặp */
  K.phandoi = function (o) {
    return '<div class="pd">' + ds(lay(o), function (x) {
      return '<div class="pd-h" style="--c:' + mau(x.mau) + '"><h3>' + e(x.t) + '</h3>' +
        '<div class="d"><b>Điều thật đằng sau</b>' + dm(x.sau) + '</div>' +
        '<div class="d hoi-pd"><b>Hỏi lại một câu</b>' + dm(x.hoi) + '</div>' +
        '<div class="d"><b>Nói gì</b>' + dm(x.noi) + '</div>' +
        '<div class="d khong-pd"><b>Không nói gì</b>' + dm(x.khong) + '</div></div>';
    }) + '</div>';
  };

  /* câu hỏi thường gặp — nhóm theo người hỏi */
  K.faq = function (o) {
    return ds(lay(o), function (n) {
      return '<div class="faq" style="--c:' + mau(n.mau) + '"><h3>' + e(n.nhom) + '</h3><dl>' +
        ds(n.ds, function (x) {
          return '<div><dt>' + e(x.h) + '</dt><dd>' + dm(x.d) + '</dd></div>';
        }) + '</dl></div>';
    });
  };

  /* ── ẤN GEN VIỆT ────────────────────────────────────────
     Dấu hiệu được VẼ ở đây chứ không nằm trong kho, vì nó là hình
     chứ không phải dữ liệu. Toạ độ trong lưới 120 × 120:
       khung  ô vuông bo góc, nét 7          — cam kết và ranh giới
       nét trái  (38,40) → (60,84), nét 8    — bảy nguyên lý, LUÔN LIỀN
       sáu chấm  trên đoạn (60,84) → (82,40) — sáu bậc, LUÔN CÓ QUÃNG
     Mọi biến thể đều gọi cùng một hàm này. Không vẽ tay bản nào. */
  var AN_CHAM = [[63.74, 76.52], [67.39, 69.22], [71.04, 61.91],
                 [74.70, 54.61], [78.35, 47.30], [82.00, 40.00]];

  function veAn(o) {
    o = o || {};
    var c = o.mau ? mau(o.mau) : 'currentColor';
    var co = o.co || 120;
    var t = [];
    if (!o.khongKhung)
      t.push('<rect x="10" y="10" width="100" height="100" rx="16" fill="none" ' +
             'stroke="' + c + '" stroke-width="7"/>');
    t.push('<path d="M38 40L60 84" fill="none" stroke="' + c + '" stroke-width="8" ' +
           'stroke-linecap="round"' + (o.traiDut ? ' stroke-dasharray="9 7"' : '') + '/>');
    if (o.noiLien) {
      t.push('<path d="M60 84L82 40" fill="none" stroke="' + c + '" stroke-width="8" ' +
             'stroke-linecap="round"/>');
    } else {
      AN_CHAM.forEach(function (d, i) {
        var cc = o.chamNhieuMau ? mau(['#BE0E16', '#9E470D', '#8A6006', '#0B7350', '#0B6675', '#5140B4'][i]) : c;
        t.push('<circle cx="' + d[0] + '" cy="' + d[1] + '" r="3.4" fill="' + cc + '"/>');
      });
    }
    return '<svg class="an-h" viewBox="0 0 120 120" width="' + co + '" height="' + co + '" ' +
      'role="img" aria-label="Ấn Gen Việt">' + t.join('') + '</svg>';
  }

  /* khoá ngang / dọc — ấn cộng tên hệ */
  function veKhoa(doc, c) {
    var m = G.META;
    return '<div class="khoa' + (doc ? ' doc' : '') + '" style="--c:' + mau(c) + '">' +
      veAn({ mau: c, co: doc ? 76 : 58 }) +
      '<div class="khoa-chu"><span class="ten">' + e(m.ten) + '</span>' +
      '<span class="phu">' + e(m.phu) + '</span></div></div>';
  }

  K.an = function (o) {
    var LAM = '#185AB4', SON = '#BE0E16';
    var h = '<div class="an-bo">';

    /* bản chính, cỡ lớn, hai màu nghi lễ và thường ngày */
    h += '<div class="an-lon">' +
      '<figure><div class="o lam">' + veAn({ mau: LAM, co: 150 }) + '</div>' +
      '<figcaption>Bản thường ngày · lam GITA #185AB4</figcaption></figure>' +
      '<figure><div class="o son">' + veAn({ mau: SON, co: 150 }) + '</div>' +
      '<figcaption>Bản nghi lễ · đỏ son #BE0E16</figcaption></figure>' +
      '<figure><div class="o dao">' + veAn({ mau: '#FFFFFF', co: 150 }) + '</div>' +
      '<figcaption>Bản đảo · trắng trên nền đặc</figcaption></figure>' +
      '</div>';

    /* dựng hình và vùng an toàn */
    h += '<h3 class="muc-con">Dựng hình và vùng an toàn</h3>' +
      '<div class="an-dung">' +
      '<figure><div class="o luoi-an">' +
        '<svg viewBox="-25 -25 170 170" width="200" height="200" role="img" ' +
        'aria-label="Lưới dựng ấn với vùng an toàn">' +
        '<rect x="-25" y="-25" width="170" height="170" fill="none" ' +
          'stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" opacity=".45"/>' +
        '<g opacity=".28" stroke="currentColor" stroke-width="0.8">' +
        '<line x1="60" y1="-25" x2="60" y2="145"/><line x1="-25" y1="60" x2="145" y2="60"/>' +
        '<line x1="10" y1="-25" x2="10" y2="145"/><line x1="110" y1="-25" x2="110" y2="145"/>' +
        '<line x1="-25" y1="10" x2="145" y2="10"/><line x1="-25" y1="110" x2="145" y2="110"/>' +
        '</g>' +
        '<rect x="10" y="10" width="100" height="100" rx="16" fill="none" ' +
          'stroke="currentColor" stroke-width="7"/>' +
        '<path d="M38 40L60 84" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>' +
        AN_CHAM.map(function (d) {
          return '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="3.4" fill="currentColor"/>';
        }).join('') +
        '</svg></div>' +
        '<figcaption>Lưới 120 × 120. Vùng an toàn 25 đơn vị mỗi phía — bằng *một phần tư* cạnh khung. Không đặt gì vào vùng ấy.</figcaption></figure>' +
      '<figure><div class="o co-nho">' +
        '<span>' + veAn({ mau: LAM, co: 64 }) + '<i>64 px</i></span>' +
        '<span>' + veAn({ mau: LAM, co: 32 }) + '<i>32 px</i></span>' +
        '<span>' + veAn({ mau: LAM, co: 16 }) + '<i>16 px</i></span>' +
        '</div><figcaption>Cỡ nhỏ nhất là *16 px* trên màn hình và *6 mm* khi in. Nhỏ hơn thì sáu chấm dính vào nhau và ý nghĩa mất.</figcaption></figure>' +
      '</div>';

    /* năm biến thể khoá */
    h += '<h3 class="muc-con">Năm biến thể</h3><div class="an-bt">' +
      '<figure>' + veAn({ mau: LAM, co: 84 }) + '<figcaption><b>A · Ấn đơn</b>Huy hiệu, con dấu, thêu, ảnh đại diện</figcaption></figure>' +
      '<figure>' + veKhoa(false, LAM) + '<figcaption><b>B · Khoá ngang</b>Giấy tiêu đề, chữ ký thư, biển hiệu</figcaption></figure>' +
      '<figure>' + veKhoa(true, LAM) + '<figcaption><b>C · Khoá dọc</b>Bìa ấn phẩm, cờ tổ, áo</figcaption></figure>' +
      '<figure><div class="nen-dac">' + veAn({ mau: '#FFFFFF', co: 84 }) + '</div><figcaption><b>D · Bản đảo</b>Trên nền màu đặc, trên ảnh</figcaption></figure>' +
      '<figure>' + veAn({ mau: '#0E1826', co: 84 }) + '<figcaption><b>E · Bản một nét</b>Dập nổi, khắc, in một màu</figcaption></figure>' +
      '</div>';
    return h + '</div>';
  };

  /* tám cách dùng sai — vẽ ra thì hiểu nhanh hơn kể ra */
  K.ansai = function (o) {
    var LAM = '#185AB4';
    var kieu = [
      { s: 'transform:rotate(-12deg)', a: {} },
      { a: { chamNhieuMau: true } },
      { a: { noiLien: true } },
      { a: { traiDut: true } },
      { a: { khongKhung: true } },
      { s: 'filter:drop-shadow(3px 5px 4px rgba(0,0,0,.45))', a: {} },
      { s: 'transform:scaleX(1.38)', a: {} },
      { nen: true, a: { mau: '#FFFFFF' } }
    ];
    return '<div class="an-sai">' + ds(lay(o), function (x, i) {
      var k = kieu[i] || { a: {} };
      var v = veAn(k.a.mau ? k.a : (function () { var b = {}; for (var q in k.a) b[q] = k.a[q]; b.mau = LAM; return b; })());
      return '<figure><div class="o' + (k.nen ? ' ron' : '') + '">' +
        '<div class="hinh"' + (k.s ? ' style="' + e(k.s) + '"' : '') + '>' + v + '</div>' +
        '<span class="x" aria-hidden="true">✕</span></div>' +
        '<figcaption><b>' + e(x[0]) + '</b>' + e(x[1]) + '</figcaption></figure>';
    }) + '</div>';
  };

  /* bảng màu — ô màu kèm mã và tỉ số tương phản */
  K.swatch = function (o) {
    return '<div class="sw">' + ds(lay(o), function (x) {
      return '<div class="sw-o"><div class="chip" style="--c:' + mau(x.mau) + '"></div>' +
        '<div class="noi"><b>' + e(x.t) + '</b>' +
        '<span class="ma">' + e(x.hex) + '</span>' +
        '<span class="ma">RGB ' + e(x.rgb) + '</span>' +
        '<span class="ma">CMYK ' + e(x.cmyk) + '</span>' +
        '<span class="ma">' + e(x.pantone) + '</span>' +
        '<span class="vai">' + dm(x.vai) + '</span>' +
        '<span class="tp">Tương phản trên nền sáng: ' + e(x.tp) + '</span></div></div>';
    }) + '</div>';
  };

  /* mẫu chữ — bày đúng bằng chính phông ấy */
  K.chuviet = function (o) {
    var mau2 = { 'Playfair Display': 'var(--tit)', 'Be Vietnam Pro': 'var(--chu)',
                 'IBM Plex Mono': 'var(--ma)' };
    return '<div class="cv">' + ds(lay(o), function (x) {
      var f = mau2[x.t] || 'inherit';
      return '<div class="cv-o"><div class="cv-dau"><b>' + e(x.t) + '</b>' +
        '<span class="vai">' + e(x.vai) + '</span><span class="can">' + e(x.can) + '</span></div>' +
        '<div class="cv-bay" style="font-family:' + f + '">' +
          '<span class="lon">Nâng tầm trí tuệ vàng Việt Nam</span>' +
          '<span class="vua">Ừ ĐƯỢC · nghiêng · 0123456789 · ắẳẵặễệỗộỡợửữựỳỷỹ</span>' +
        '</div><p class="n">' + dm(x.n) + '</p><p class="vi">' + dm(x.vi) + '</p></div>';
    }) + '</div>';
  };

  /* chân dung trong Thư viện Gen Việt */
  K.nhanvat = function (o) {
    return ds(lay(o), function (x) {
      return '<article class="nv">' +
        '<div class="nv-dau"><h3>' + e(x.ten) + '</h3><span class="nam">' + e(x.nam) + '</span></div>' +
        '<div class="danh">' + e(x.danh) + '</div>' +
        '<div class="nv-than">' +
          '<div class="o"><b>Việc lớn nhất</b>' + e(x.viec) + '</div>' +
          '<div class="o qd"><b>Quyết định then chốt</b>' + e(x.quyet) + '</div>' +
          '<div class="o mt"><b>Mô thức rút ra</b>' + e(x.mothuc) + '</div>' +
          '<div class="hang"><span class="chip">Trụ ' + e(x.tru) + '</span>' +
            '<span class="chip">' + e(x.pc) + '</span></div>' +
          '<div class="o lam"><b>Tuần này em làm được</b>' + e(x.lam) + '</div>' +
          '<div class="o hoi"><b>Câu hỏi phản biện</b>' + e(x.hoi) + '</div>' +
          (x.luu ? '<div class="luu">' + e(x.luu) + '</div>' : '') +
        '</div></article>';
    });
  };

  /* sáu quyển của bộ sách */
  K.quyen = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<div class="qs" style="--c:' + mau(x.mau) + '">' +
        '<div class="q-d"><span class="q">' + e(x.q) + '</span><b>' + e(x.t) + '</b>' +
        '<span class="so">' + e(x.so) + ' chân dung</span></div>' +
        '<div class="hoi">' + e(x.hoi) + '</div>' +
        '<p>' + e(x.n) + '</p></div>';
    }) + '</div>';
  };

  /* mười hai mô thức */
  K.mothuc = function (o) {
    return '<div class="mtv">' + ds(lay(o), function (x) {
      return '<div class="m1"><span class="s">' + e(x.so) + '</span>' +
        '<div class="noi"><b>' + e(x.t) + '</b>' +
        '<span class="tu">' + e(x.tu) + '</span>' +
        '<span class="y">' + e(x.n) + '</span>' +
        '<span class="nay">Hôm nay: ' + e(x.nay) + '</span></div></div>';
    }) + '</div>';
  };

  /* ── dựng một màn ────────────────────────────────── */
  function veMan(v) {
    var m = G.MAN[v];
    if (!m) return '<div class="the"><p>Chưa có màn ' + e(v) + '.</p></div>';
    var html = '<div class="dau"><span class="k">' + e(m.k) + '</span><h1>' + e(m.t) + '</h1>' +
      (m.p ? '<p>' + dm(m.p) + '</p>' : '') + '</div>';
    html += ds(m.khoi, function (o) {
      var f = K[o.k];
      return f ? f(o) : '<p class="van">[thiếu loại khối: ' + e(o.k) + ']</p>';
    });
    return html;
  }

  /* Thẻ khoá — nói đúng lý do, không nói chung chung. */
  function theKhoa(v) {
    var m = G.MAN[v] || {}, ly = G.lyDoKhoa(VAI, BAC, v), r = G.timVai(VAI) || {};
    return '<div class="dau"><span class="k">Chưa mở</span><h1>' + e(m.t || v) + '</h1></div>' +
      '<div class="the khoa"><h3>Đang xem với vai: ' + e(r.t || VAI) +
      (r.theoBac ? ' · bậc ' + e(BAC) : '') + '</h3>' +
      '<p>' + e(ly.n) + '</p>' +
      '<p class="vi">Đổi vai ở thanh trên để xem hệ thống từ chỗ người khác. ' +
      'Trong bản chạy thật, phần này KHÔNG được gửi xuống máy của vai không có quyền — ' +
      'ẩn ở trình duyệt chỉ để giao diện đúng vai, không phải để giữ bí mật.</p></div>';
  }

  /* danh sách phẳng để đi tới / lui — chỉ gồm màn vai này mở được */
  var PHANG = [];
  function dungPhang() {
    PHANG = [];
    (G.NHOM || []).forEach(function (n) {
      n.ds.forEach(function (i) {
        if (G.duocPhep(VAI, BAC, i.v)) PHANG.push({ v: i.v, t: i.t, nhom: n.t });
      });
    });
  }

  function dieuHuong(v) {
    var i = -1, k;
    for (k = 0; k < PHANG.length; k++) if (PHANG[k].v === v) i = k;
    var truoc = i > 0 ? PHANG[i - 1] : null;
    var sau = i > -1 && i < PHANG.length - 1 ? PHANG[i + 1] : null;
    return '<nav class="di" aria-label="Chuyển màn">' +
      (truoc ? '<a href="#' + e(truoc.v) + '" class="tr"><span>← Trước</span><b>' + e(truoc.t) + '</b></a>' : '<span></span>') +
      '<span class="dem">' + (i > -1 ? (i + 1) + ' / ' + PHANG.length : 'ngoài phạm vi') + '</span>' +
      (sau ? '<a href="#' + e(sau.v) + '" class="sa"><span>Sau →</span><b>' + e(sau.t) + '</b></a>' : '<span></span>') +
      '</nav>';
  }

  /* ── vỏ ứng dụng ─────────────────────────────────── */
  function veChonVai() {
    var r = G.timVai(VAI) || {};
    return '<div class="chon">' +
      '<label for="o-vai">Vai</label>' +
      '<select id="o-vai">' + ds(G.VAI, function (v) {
        return '<option value="' + e(v.ma) + '"' + (v.ma === VAI ? ' selected' : '') + '>' +
          e(v.ma) + ' · ' + e(v.t) + '</option>';
      }) + '</select>' +
      '<label for="o-bac"' + (r.theoBac ? '' : ' hidden') + '>Bậc</label>' +
      '<select id="o-bac"' + (r.theoBac ? '' : ' hidden') + '>' + ds(G.BAC_MO, function (b) {
        return '<option value="' + e(b.bac) + '"' + (b.bac === BAC ? ' selected' : '') + '>' +
          e(b.bac) + ' · ' + e(b.t) + '</option>';
      }) + '</select></div>';
  }

  function veVaiKhoa() {
    var r = G.timVai(VAI) || {};
    return '<div class="chon khoa-vai"><span class="nhan">Bản cắt cho ' + e(r.t || VAI) +
      (r.theoBac ? ' · bậc ' + e(BAC) : '') + '</span></div>';
  }

  function veMucLuc() {
    return ds(G.NHOM, function (n) {
      var muc = n.ds.filter(function (i) { return G.duocPhep(VAI, BAC, i.v); });
      if (!muc.length) return '';
      return '<div class="nhom" style="--c:' + mau(n.mau) + '">' +
        '<div class="n-dau"><span class="no">' + e(n.no) + '</span>' +
        '<span class="t">' + e(n.t) + '</span><span class="s">' + e(n.s) + '</span></div>' +
        '<ul>' + ds(muc, function (i) {
          return '<li><a href="#' + e(i.v) + '" data-v="' + e(i.v) + '">' +
            '<b>' + e(i.t) + '</b><span>' + e(i.h) + '</span></a></li>';
        }) + '</ul></div>';
    });
  }

  function veVo() {
    var m = G.META;
    return '<a href="#noi-dung" class="bo-qua">Tới nội dung</a>' +
      '<header class="mao">' +
        '<div class="hieu"><span class="ten">' + e(m.ten) + '</span>' +
          '<span class="phu">' + e(m.phu) + '</span></div>' +
        '<div class="ban">Bản ' + e(m.ban) + '</div>' +
        (G.KHOA_VAI ? veVaiKhoa() : veChonVai()) +
        '<button class="nut-muc" type="button" aria-expanded="false">Mục lục</button>' +
      '</header>' +
      '<div class="khung">' +
        '<nav class="muc" aria-label="Mục lục"></nav>' +
        '<main id="noi-dung" class="chinh" tabindex="-1"></main>' +
      '</div>' +
      '<p class="doc-to" role="status" aria-live="polite"></p>' +
      '<footer class="chan"><b>' + e(m.ten) + '</b><span>' + e(m.hocVien) + '</span>' +
      '<span>' + e(m.suMenh) + '</span></footer>';
  }

  var goc, chinh, nut, mucNav, docTo;

  function nho(v) { try { localStorage.setItem('genviet365.man', v); } catch (x) {} }
  function nhoLai() { try { return localStorage.getItem('genviet365.man'); } catch (x) { return null; } }

  function ve() {
    var v = location.hash.replace(/^#/, '');
    if (v === 'noi-dung') return;
    if (!v || !G.MAN[v]) v = PHANG.length ? PHANG[0].v : 'tong-quan';

    /* CỔNG LỚP HAI — chạy trước mọi lần dựng, nên vào thẳng bằng
       liên kết hay bằng trạng thái đã lưu đều bị chặn như nhau. */
    var duoc = G.duocPhep(VAI, BAC, v);
    chinh.innerHTML = (duoc ? veMan(v) : theKhoa(v)) + dieuHuong(v);

    Array.prototype.forEach.call(mucNav.querySelectorAll('a'), function (a) {
      var o = a.getAttribute('data-v') === v;
      a.classList.toggle('oo', o);
      if (o) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    nho(v);
    goc.classList.remove('mo');
    if (nut) nut.setAttribute('aria-expanded', 'false');
    if (docTo) docTo.textContent = (duoc ? '' : 'Chưa mở: ') + ((G.MAN[v] || {}).t || v);
    window.scrollTo(0, 0);
  }

  function dungLai() {
    dungPhang();
    mucNav.innerHTML = veMucLuc();
    ve();
  }

  function doiVai(v, b) {
    if (v) VAI = v;
    if (b) BAC = b;
    luuTT();
    var r = G.timVai(VAI) || {};
    var oBac = goc.querySelector('#o-bac');
    var nBac = goc.querySelector('label[for="o-bac"]');
    if (oBac) oBac.hidden = !r.theoBac;
    if (nBac) nBac.hidden = !r.theoBac;
    dungLai();
  }

  function dung(g) {
    goc = g;
    docTT();
    goc.className = 'ung';
    goc.innerHTML = veVo();
    chinh = goc.querySelector('.chinh');
    mucNav = goc.querySelector('.muc');
    nut = goc.querySelector('.nut-muc');
    docTo = goc.querySelector('.doc-to');

    nut.addEventListener('click', function () {
      var mo = goc.classList.toggle('mo');
      nut.setAttribute('aria-expanded', mo ? 'true' : 'false');
    });
    var oVai = goc.querySelector('#o-vai'), oBac = goc.querySelector('#o-bac');
    if (oVai) oVai.addEventListener('change', function (ev) { doiVai(ev.target.value, null); });
    if (oBac) oBac.addEventListener('change', function (ev) { doiVai(null, ev.target.value); });
    window.addEventListener('hashchange', ve);

    /* mũi tên trái phải để lật màn — bỏ qua khi đang gõ hoặc đang
       chọn trong danh sách, và khi người dùng đang giữ phím tắt */
    document.addEventListener('keydown', function (ev) {
      if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
      var t = ev.target || {};
      var the = (t.tagName || '').toLowerCase();
      if (the === 'input' || the === 'select' || the === 'textarea' || t.isContentEditable) return;
      if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') return;
      var i = -1, k;
      var hien = location.hash.replace(/^#/, '');
      for (k = 0; k < PHANG.length; k++) if (PHANG[k].v === hien) i = k;
      var j = ev.key === 'ArrowLeft' ? i - 1 : i + 1;
      if (i > -1 && j >= 0 && j < PHANG.length) {
        ev.preventDefault();
        location.hash = PHANG[j].v;
      }
    });

    dungPhang();
    mucNav.innerHTML = veMucLuc();
    if (!location.hash) {
      var cu = nhoLai();
      if (cu && G.MAN[cu]) { location.hash = cu; return; }
    }
    ve();
  }

  window.GVdung = dung;
  function batDau() {
    var g = document.getElementById('ung-dung');
    if (g) dung(g);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', batDau);
  } else { batDau(); }
})();
