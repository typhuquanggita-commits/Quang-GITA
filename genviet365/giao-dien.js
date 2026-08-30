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
  var TEN_NGUOI = '';
  function luuTT() {
    try {
      localStorage.setItem('genviet365.vai', VAI);
      localStorage.setItem('genviet365.bac', BAC);
      localStorage.setItem('genviet365.ten', TEN_NGUOI);
    } catch (x) {}
  }
  function docTen() {
    try { TEN_NGUOI = localStorage.getItem('genviet365.ten') || ''; } catch (x) {}
  }
  function daVao() {
    if (G.KHOA_VAI) return true;          /* bản cắt: vai đã cố định, không hỏi lại */
    try { return localStorage.getItem('genviet365.vao') === '1'; } catch (x) { return true; }
  }
  function ghiVao(co) {
    try {
      if (co) localStorage.setItem('genviet365.vao', '1');
      else localStorage.removeItem('genviet365.vao');
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

  /* ── DẤU HIỆU THẬT ──────────────────────────────────────
     Hình do tools/ve-dau-hieu.cjs sinh ra và nạp qua nen/dau-hieu.js,
     nên trang web và tệp in trong nhan-dien/ dùng CHUNG một hình.
     Bản dựng trước của hệ này có một dấu hiệu TỰ CHẾ — sai, vì Học
     viện đã có dấu hiệu riêng. Đã thay. */
  function veDau(loai, o) {
    o = o || {};
    var H = G.HINH;
    if (!H) return '';
    var gita = loai === 'gita';
    var vb = gita ? H.gitaVB : H.gvVB;
    var than = gita ? H.gita(o.mot) : H.gv(o.mot);
    var w = o.co || (gita ? 240 : 150);
    return '<svg class="dh" viewBox="' + vb + '" width="' + w + '" ' +
      'role="img" aria-label="' + (gita ? 'Học viện GITA' : 'GEN VIỆT — Thắp sáng, Vươn mình') + '">' +
      than + '</svg>';
  }

  function khoaDoc(mot) {
    return '<div class="kdoc"' + (mot ? ' style="--t:' + mau(mot) + '"' : '') + '>' +
      veDau('gv', { mot: mot, co: 120 }) +
      '<div class="kd-chu"><span class="ten">GEN VIỆT</span>' +
      '<span class="phu">THẮP SÁNG — VƯƠN MÌNH</span></div></div>';
  }

  K.an = function () {
    var h = '<div class="an-bo">';
    h += '<div class="an-lon">' +
      '<figure><div class="o">' + veDau('gv', { co: 190 }) + '</div>' +
      '<figcaption>Bản màu đầy đủ — dùng ở mọi nơi có nền sáng</figcaption></figure>' +
      '<figure><div class="o">' + khoaDoc() + '</div>' +
      '<figcaption>Khoá dọc — dấu hiệu cùng tên và khẩu hiệu</figcaption></figure>' +
      '<figure><div class="o dao">' + veDau('gv', { mot: '#FFFFFF', co: 190 }) + '</div>' +
      '<figcaption>Bản đảo — trắng trên nền đỏ hoặc nền ảnh đặc</figcaption></figure>' +
      '</div>';
    h += '<h3 class="muc-con">Ba màu, ba ý</h3>' +
      '<div class="an-y"><div class="y" style="--c:' + mau(G.HINH.mau) + '">' +
        '<b>Đỏ</b>Nét chữ V vươn lên — màu cờ, màu của ý chí</div>' +
      '<div class="y" style="--c:' + mau(G.HINH.vang) + '">' +
        '<b>Vàng</b>Ngôi sao ở đỉnh và các nấc chuỗi xoắn — màu sao vàng, đích của hành trình</div>' +
      '<div class="y" style="--c:' + mau(G.HINH.lam) + '">' +
        '<b>Lam</b>Vành quỹ đạo dưới chân — thế giới mà em bước ra</div></div>';
    h += '<h3 class="muc-con">Cỡ nhỏ dần</h3><div class="an-dung"><figure><div class="o co-nho">' +
      '<span>' + veDau('gv', { co: 88 }) + '<i>88 px</i></span>' +
      '<span>' + veDau('gv', { co: 48 }) + '<i>48 px</i></span>' +
      '<span>' + veDau('gv', { co: 26 }) + '<i>26 px</i></span></div>' +
      '<figcaption>Cỡ nhỏ nhất *26 px* trên màn hình và *9 mm* khi in. Nhỏ hơn thì các nấc vàng của chuỗi xoắn dính vào nhau và chữ *GEN* trong dấu hiệu mất nghĩa.</figcaption></figure>' +
      '<figure><div class="o">' + veDau('gita', { co: 250 }) + '</div>' +
      '<figcaption>Dấu hiệu Học viện GITA — thương hiệu mẹ, đứng ở dòng bảo chứng</figcaption></figure></div>';
    h += '<h3 class="muc-con">Đứng cùng nhau</h3>' +
      '<div class="an-cap"><div class="o">' + veDau('gv', { co: 96 }) +
      '<span class="vach"></span>' + veDau('gita', { co: 190 }) + '</div>' +
      '<p class="van">GEN VIỆT đứng *trước*, GITA đứng *sau* ở dòng bảo chứng. Hai dấu hiệu cách nhau ít nhất một vùng an toàn và có một đường kẻ mảnh phân cách. Không bao giờ chồng lên nhau, không bao giờ ghép thành một hình mới.</p></div>';
    return h + '</div>';
  };

  /* tám cách dùng sai — vẽ ra thì hiểu nhanh hơn kể ra */
  K.ansai = function (o) {
    var kieu = [
      { s: 'transform:rotate(-12deg)' },
      { s: 'transform:scaleX(1.42)' },
      { s: 'filter:drop-shadow(3px 5px 4px rgba(0,0,0,.45))' },
      { mot: '#0B7350' },
      { s: 'filter:grayscale(1) contrast(.55)' },
      { s: 'transform:scaleX(-1)' },
      { nen: true, mot: '#FFFFFF' },
      { s: 'filter:blur(1.2px)', co: 40 }
    ];
    return '<div class="an-sai">' + ds(lay(o), function (x, i) {
      var k = kieu[i] || {};
      return '<figure><div class="o' + (k.nen ? ' ron' : '') + '">' +
        '<div class="hinh"' + (k.s ? ' style="' + e(k.s) + '"' : '') + '>' +
        veDau('gv', { mot: k.mot, co: k.co || 76 }) + '</div>' +
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

  /* ── NHÓM 19 · CẦM LÊN DÙNG ĐƯỢC ─────────────────────── */

  /* bảy câu hỏi bàn ăn — thứ in ra đưa phụ huynh */
  K.baycau = function (o) {
    return '<ol class="bc">' + ds(lay(o), function (x) {
      return '<li><div class="bc-h"><span class="s">' + e(x.so) + '</span>' +
        '<h3>' + e(x.t) + '</h3></div>' +
        '<div class="d"><b>Vì sao hỏi câu này</b>' + dm(x.n) + '</div>' +
        '<div class="d mo-ra"><b>Dấu hiệu con đang mở</b>' + dm(x.v) + '</div>' +
        '<div class="d cam"><b>Không được làm</b>' + dm(x.k) + '</div></li>';
    }) + '</ol>';
  };

  /* giáo án từng phút */
  K.giaoan = function (o) {
    return '<div class="ga">' + ds(lay(o), function (x) {
      return '<div class="ga-h"><div class="ga-p">' + e(x.p) + '</div>' +
        '<div class="ga-n"><div class="ga-dau"><h3>' + e(x.t) + '</h3>' +
        '<span class="ai">' + e(x.ai) + '</span></div>' +
        '<p>' + dm(x.n) + '</p>' +
        '<div class="loi"><b>Lời Coach nói</b>' + e(x.loi) + '</div>' +
        '<div class="hong"><b>Dấu hiệu buổi đang hỏng</b>' + e(x.hong) + '</div>' +
        '</div></div>';
    }) + '</div>';
  };

  /* kịch bản gọi điện */
  K.kichban = function (o) {
    return '<div class="kb">' + ds(lay(o), function (x) {
      return '<article style="--c:' + mau(x.mau) + '">' +
        '<div class="kb-dau"><span class="m">' + e(x.ma) + '</span><h3>' + e(x.t) + '</h3></div>' +
        '<div class="kb-meta">' + e(x.khi) + ' · ' + e(x.ai) + '</div>' +
        '<div class="cau mo"><b>Mở đầu</b>' + e(x.mo) + '</div>' +
        '<div class="cau"><b>Ba câu giữa</b><ol>' +
        ds(x.giua, function (y) { return '<li>' + dm(y) + '</li>'; }) + '</ol></div>' +
        '<div class="cau ket"><b>Kết</b>' + e(x.ket) + '</div>' +
        '<div class="cau cam"><b>Không được nói</b>' + e(x.cam) + '</div></article>';
    }) + '</div>';
  };

  /* thư mẫu — có cả bản viết sẵn để đọc thẳng */
  K.thumau = function (o) {
    return '<div class="tm">' + ds(lay(o), function (x) {
      return '<article style="--c:' + mau(x.mau) + '">' +
        '<div class="tm-dau"><span class="m">' + e(x.ma) + '</span><h3>' + e(x.t) + '</h3>' +
        '<span class="khi">' + e(x.khi) + '</span></div>' +
        '<div class="cau"><b>Cấu trúc</b><ul>' +
        ds(x.cau, function (y) { return '<li>' + dm(y) + '</li>'; }) + '</ul></div>' +
        '<div class="vd"><b>Thư viết sẵn</b><pre>' + e(x.vd) + '</pre></div>' +
        '<div class="cam"><b>Không được</b>' + e(x.cam) + '</div></article>';
    }) + '</div>';
  };

  /* bảng chấm — mỗi cột mở ra thành thang mức */
  K.cham = function (o) {
    var t = lay(o), tong = 0;
    t.forEach(function (x) { tong += x.d; });
    return '<div class="ch">' + ds(t, function (x) {
      return '<div class="ch-c" style="--c:' + mau(x.mau) + '">' +
        '<div class="ch-dau"><h3>' + e(x.t) + '</h3><span class="d">' + e(x.d) + ' điểm</span></div>' +
        '<div class="ch-thang">' + ds(x.muc, function (m) {
          return '<div class="n"><span class="k">' + e(m[0]) + '</span><span>' + dm(m[1]) + '</span></div>';
        }) + '</div></div>';
    }) + '<div class="ch-tong">Tổng ' + tong + ' điểm · ngưỡng đạt ' +
      e(o.nguong == null ? 85 : o.nguong) + '</div></div>';
  };

  /* ── NHÓM 20 · TRA CỨU ────────────────────────────────── */

  /* từ điển thuật ngữ, xếp theo chữ cái */
  K.tudien = function (o) {
    return '<div class="td">' + ds(lay(o), function (n) {
      return '<section class="td-n"><h3>' + e(n.n) + '</h3><dl>' +
        ds(n.ds, function (x) {
          return '<div><dt>' + e(x[0]) + '</dt><dd>' + dm(x[1]) +
            '<span class="en">' + dm(x[2]) + '</span>' +
            '<span class="o">' + e(x[3]) + '</span></dd></div>';
        }) + '</dl></section>';
    }) + '</div>';
  };

  /* chỉ mục — SINH RA từ chính kho màn lúc chạy, và chỉ liệt kê
     những màn vai đang xem có quyền mở. Không có danh sách nào
     phải bảo trì bằng tay, nên không bao giờ lệch. */
  K.chimuc = function () {
    var ds2 = [], i;
    for (var v in G.MAN) {
      if (!G.duocPhep(VAI, BAC, v)) continue;
      var m = G.MAN[v];
      ds2.push({ v: v, t: m.t, k: m.k });
    }
    ds2.sort(function (a, b) { return a.t.localeCompare(b.t, 'vi'); });
    var chu = '', ra = '';
    for (i = 0; i < ds2.length; i++) {
      var c = ds2[i].t.charAt(0).toUpperCase();
      if (c !== chu) { chu = c; ra += '<dt class="cm-chu">' + e(c) + '</dt>'; }
      ra += '<dd><a href="#' + e(ds2[i].v) + '">' + e(ds2[i].t) + '</a>' +
            '<span>' + e(ds2[i].k) + '</span></dd>';
    }
    return '<p class="van">Chỉ mục này *sinh ra lúc chạy* từ chính kho màn, và chỉ liệt kê ' +
      ds2.length + ' màn vai đang xem mở được. Không có danh sách nào phải bảo trì bằng tay, ' +
      'nên nó không bao giờ lệch với hệ.</p><dl class="cm">' + ra + '</dl>';
  };

  /* ── NĂM TUYẾN GEN VIỆT ─────────────────────────────── */
  K.tuyen = function (o) {
    return '<div class="tuy">' + ds(lay(o), function (x) {
      return '<article style="--c:' + mau(x.mau) + '">' +
        '<div class="tuy-dau"><span class="m">' + e(x.ma) + '</span><h3>' + e(x.t) + '</h3></div>' +
        '<div class="hoi">' + e(x.hoi) + '</div>' +
        '<p>' + dm(x.n) + '</p>' +
        '<ul>' + ds(x.lam, function (y) { return '<li>' + dm(y) + '</li>'; }) + '</ul>' +
        '<div class="o do-t"><b>Đo bằng</b>' + e(x.do) + '</div>' +
        '<div class="o ai-t"><b>Ai giữ</b>' + e(x.ai) + '</div></article>';
    }) + '</div>';
  };

  /* mười lăm giai đoạn — xương sống của cả năm tuyến */
  K.giaidoan = function (o) {
    return '<div class="gdo">' + ds(lay(o), function (x) {
      return '<div class="gd-h" style="--c:' + mau(x.mau) + '">' +
        '<div class="gd-s"><span class="n">' + e(x.so) + '</span>' +
        '<span class="k">' + e(x.k) + '</span></div>' +
        '<div class="gd-n"><h3>' + e(x.t) + '</h3>' +
        '<div class="hoi">' + e(x.hoi) + '</div>' +
        '<div class="o"><b>Đích đến</b>' + dm(x.dich) + '</div>' +
        '<div class="o m9"><b>Mục tiêu 90 ngày</b>' + dm(x.m90) + '</div>' +
        '<div class="o moc"><b>Ba mốc</b>' + dm(x.moc) + '</div>' +
        '<div class="o do-g"><b>Đo bằng</b>' + dm(x.do) + '</div>' +
        '</div></div>';
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

  /* ĐƯỜNG NGANG — màn liên quan, TÍNH chứ không xếp tay.
     Mục lục cho đường dọc: nhóm này rồi nhóm kia. Thứ người đọc
     thiếu ở một trăm ba mươi hai màn là đường ngang: đang đọc màn
     này thì còn màn nào nói tiếp chuyện này, dù nằm ở nhóm khác.
     nen/dan-xuat.js tính sẵn bằng từ hiếm dùng chung; ở đây chỉ
     lọc lại theo quyền của vai đang xem. */
  function lienQuan(v) {
    var ds2 = ((G.LIEN_QUAN || {})[v] || []).filter(function (x) {
      return G.MAN[x] && G.duocPhep(VAI, BAC, x);
    });
    if (!ds2.length) return '';
    return '<nav class="lq" aria-label="Màn liên quan">' +
      '<b>Đọc tiếp chuyện này</b><ul>' + ds(ds2, function (x) {
        var m = G.MAN[x];
        return '<li><a href="#' + e(x) + '"><span>' + e(m.k) + '</span>' +
          e(m.t) + '</a></li>';
      }) + '</ul></nav>';
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

  /* ── MỤC LỤC ─────────────────────────────────────────────
     Ở ba mươi sáu nhóm và hơn hai trăm màn, một mục lục phẳng dài
     hơn mười lăm nghìn điểm ảnh — tức mười bảy màn hình cuộn để đi
     hết. Ở khổ điện thoại thì không dùng được nữa.

     Nên mỗi nhóm là một <details> gập lại được. Chọn <details>
     chứ không phải nút tự chế vì ba lý do: bàn phím đi được ngay
     không cần thêm mã, trình đọc màn hình hiểu sẵn trạng thái
     đóng mở, và nội dung vẫn nằm trong DOM khi gập nên ô tìm và
     cổng quyền không đổi hành vi.

     Nhóm chứa màn đang đọc luôn được mở — xem moNhomHienTai(). */
  function veMucLuc() {
    var theoId = {};
    G.NHOM.forEach(function (n) { theoId[n.id] = n; });

    function veNhom(n) {
      var muc = n.ds.filter(function (i) { return G.duocPhep(VAI, BAC, i.v); });
      if (!muc.length) return { rong: true, ma: '', dem: 0 };
      return {
        dem: muc.length,
        ma: '<details class="nhom" style="--c:' + mau(n.mau) + '">' +
          '<summary class="n-dau"><span class="no">' + e(n.no) + '</span>' +
          '<span class="t">' + e(n.t) + '</span><span class="s">' + e(n.s) + '</span>' +
          '<span class="dem">' + muc.length + '</span></summary>' +
          '<ul>' + ds(muc, function (i) {
            return '<li><a href="#' + e(i.v) + '" data-v="' + e(i.v) + '">' +
              '<b>' + e(i.t) + '</b><span>' + e(i.h) + '</span></a></li>';
          }) + '</ul></details>'
      };
    }

    return '<div class="muc-thanh">' +
      '<button type="button" class="muc-nut" data-mo="1">Mở hết</button>' +
      '<button type="button" class="muc-nut" data-mo="0">Thu hết</button>' +
      '</div>' + ds(G.PHAN, function (p) {
      var trong = '', demMan = 0, demNhom = 0;
      p.nhom.forEach(function (gid) {
        var n = theoId[gid];
        if (!n) return;
        var r = veNhom(n);
        if (r.rong) return;
        trong += r.ma; demMan += r.dem; demNhom++;
      });
      if (!demNhom) return '';
      return '<details class="phan" style="--c:' + mau(p.mau) + '">' +
        '<summary class="p-dau"><span class="p-no">' + e(p.no) + '</span>' +
        '<span class="p-t">' + e(p.t) + '</span>' +
        '<span class="p-s">' + e(p.s) + '</span>' +
        '<span class="dem">' + demNhom + '·' + demMan + '</span></summary>' +
        '<div class="p-trong">' + trong + '</div></details>';
    });
  }

  /* Mở nhóm chứa màn đang đọc, và chỉ cuộn tới nó khi nó đang
     khuất — cuộn khi đã nhìn thấy là một cử động thừa gây khó chịu.

     Đóng lại nhóm mà CHÍNH HÀM NÀY đã mở ở lần trước. Không đóng
     nhóm người dùng tự mở — phân biệt được vì ta chỉ nhớ nhóm của
     mình. Không có bước đóng ấy thì sau vài chục màn, mục lục mở
     hết trở lại và dài y như khi chưa gập; bộ kiểm đã bắt đúng lỗi
     này ở lần chạy đầu tiên. */
  var nhomTuMo = null, phanTuMo = null;
  function moNhomHienTai(v) {
    var a = mucNav.querySelector('a[data-v="' + v + '"]');
    if (!a) return;
    var n = a.closest ? a.closest('details') : null;
    if (!n) return;
    var ph = n.parentNode && n.parentNode.closest ? n.parentNode.closest('details.phan') : null;
    if (phanTuMo && phanTuMo !== ph && phanTuMo.isConnected) phanTuMo.open = false;
    if (nhomTuMo && nhomTuMo !== n && nhomTuMo.isConnected) nhomTuMo.open = false;
    nhomTuMo = n; phanTuMo = ph;
    if (ph) ph.open = true;
    n.open = true;
    var o = a.getBoundingClientRect(), k = mucNav.getBoundingClientRect();
    if (o.top < k.top || o.bottom > k.bottom) {
      if (a.scrollIntoView) a.scrollIntoView({ block: 'center' });
    }
  }

  /* ── TÌM KIẾM ────────────────────────────────────────────
     Ở quy mô một trăm ba mươi màn thì mục lục không còn đủ: người
     ta biết mình cần gì nhưng không biết nó nằm ở nhóm nào.
     Ba điều đáng nói về cách dựng:
       · Chỉ mục sinh từ CHÍNH KHO, không phải từ một danh sách
         chép tay — nên không bao giờ lệch với nội dung.
       · Bỏ dấu trước khi so, nên gõ "ho chieu" tìm ra "hộ chiếu".
       · Lọc theo quyền TRƯỚC khi tìm. Ô tìm không được là lối
         vòng qua cổng phân quyền. */
  var DAU = 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ';
  var KHONG = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd';
  function boDau(t) {
    t = String(t == null ? '' : t).toLowerCase();
    var r = '', i, j;
    for (i = 0; i < t.length; i++) {
      j = DAU.indexOf(t.charAt(i));
      r += j > -1 ? KHONG.charAt(j) : t.charAt(i);
    }
    return r;
  }

  /* gom mọi chuỗi trong một cấu trúc lồng nhau, có chặn độ sâu */
  function gomChu(d, sau, ra) {
    if (sau > 5 || d == null) return ra;
    if (typeof d === 'string') { ra.push(d); return ra; }
    if (typeof d === 'number') { ra.push(String(d)); return ra; }
    if (Array.isArray(d)) {
      for (var i = 0; i < d.length; i++) gomChu(d[i], sau + 1, ra);
      return ra;
    }
    if (typeof d === 'object') {
      for (var k in d) if (Object.prototype.hasOwnProperty.call(d, k)) gomChu(d[k], sau + 1, ra);
    }
    return ra;
  }

  var KHO_TIM = null;
  function khoTim() {
    if (KHO_TIM) return KHO_TIM;
    KHO_TIM = [];
    var goiY = {};
    (G.NHOM || []).forEach(function (n) {
      (n.ds || []).forEach(function (x) { goiY[x.v] = n.t + ' ' + (x.h || ''); });
    });
    for (var v in G.MAN) {
      if (!Object.prototype.hasOwnProperty.call(G.MAN, v)) continue;
      var m = G.MAN[v], chu = [v, m.t, m.k, m.p, goiY[v] || ''];
      (m.khoi || []).forEach(function (o) {
        if (o.t) chu.push(o.t);
        if (o.n) chu.push(o.n);
        if (o.cot) gomChu(o.cot, 0, chu);
        gomChu(o.tu ? G.TU[o.tu] : o.ds, 0, chu);
      });
      KHO_TIM.push({ v: v, t: m.t, k: m.k, p: m.p || '', goi: goiY[v] || '',
                     chu: boDau(chu.join(' · ')) });
    }
    return KHO_TIM;
  }

  /* 2 nếu trúng ĐẦU MỘT TỪ, 1 nếu chỉ trúng giữa từ, 0 nếu không.
     Phân biệt này quan trọng trong tiếng Việt: tìm "tướng" mà xếp
     "biểu tượng" lên trước "danh tướng" là xếp sai. */
  function trungTu(hay, kim) {
    var i = hay.indexOf(kim);
    while (i > -1) {
      if (i === 0 || /[\s·—–\-,.:;()"'\/]/.test(hay.charAt(i - 1))) return 2;
      i = hay.indexOf(kim, i + 1);
    }
    return hay.indexOf(kim) > -1 ? 1 : 0;
  }

  function tim(q) {
    var tu = boDau(q).split(/\s+/).filter(function (x) { return x.length > 1; });
    if (!tu.length) return [];
    var ra = [];
    khoTim().forEach(function (m) {
      if (!G.duocPhep(VAI, BAC, m.v)) return;   /* lọc quyền TRƯỚC */
      var diem = 0, i, tt = boDau(m.t), tp = boDau(m.p), tg = boDau(m.goi || ''), du = true;
      for (i = 0; i < tu.length; i++) {
        if (m.chu.indexOf(tu[i]) < 0) { du = false; break; }
        var oT = trungTu(tt, tu[i]);
        diem += oT === 2 ? 24 : (oT === 1 ? 6 : 0);      /* tiêu đề */
        diem += trungTu(tg, tu[i]) === 2 ? 8 : 0;        /* câu gợi ở mục lục */
        diem += trungTu(tp, tu[i]) === 2 ? 5 : 0;        /* câu dẫn của màn */
        diem += 1;
      }
      /* Cả cụm đứng liền nhau đáng giá hơn nhiều từ rời rạc. Bỏ dấu
         làm "tướng" và "tượng" thành một, nên cụm là thứ duy nhất
         phân biệt được "danh tướng" với "biểu tượng". */
      if (tu.length > 1) {
        var cum = tu.join(' ');
        if (tt.indexOf(cum) > -1) diem += 22;
        if (tg.indexOf(cum) > -1) diem += 16;
        if (tp.indexOf(cum) > -1) diem += 11;
      }
      if (du) ra.push({ v: m.v, t: m.t, k: m.k, p: m.p, d: diem });
    });
    ra.sort(function (a, b) { return b.d - a.d || a.t.localeCompare(b.t, 'vi'); });
    return ra;
  }

  function veKetQua(q) {
    var kq = tim(q);
    if (!kq.length) {
      return '<div class="dau"><span class="k">Tìm</span><h1>Không thấy “' + e(q) + '”</h1>' +
        '<p>Thử một từ ngắn hơn, hoặc bỏ dấu. Ô tìm chỉ soi những màn vai này mở được.</p></div>';
    }
    return '<div class="dau"><span class="k">Tìm</span><h1>' + kq.length +
      ' màn khớp “' + e(q) + '”</h1>' +
      '<p>Xếp theo mức khớp. Ô tìm chỉ soi những màn vai này mở được — nó không phải lối vòng qua cổng phân quyền.</p></div>' +
      '<ol class="kq">' + ds(kq, function (x) {
        return '<li><a href="#' + e(x.v) + '"><span class="k">' + e(x.k) + '</span>' +
          '<b>' + e(x.t) + '</b><span class="p">' + e(x.p) + '</span></a></li>';
      }) + '</ol>';
  }

  function veVo() {
    var m = G.META;
    return '<a href="#noi-dung" class="bo-qua">Tới nội dung</a>' +
      '<header class="mao">' +
        '<div class="hieu"><span class="ten">' + e(m.ten) + '</span>' +
          '<span class="phu">' + e(m.phu) + '</span></div>' +
        '<div class="ban" title="Mã băm nội dung — đổi một chữ trong kho thì mã đổi theo">Bản ' +
          e(m.ban) + (G.DAU ? ' · <span class="dau-ban">' + e(G.DAU.ma) + '</span>' : '') + '</div>' +
        (G.KHOA_VAI ? veVaiKhoa() : veChonVai()) +
        (G.KHOA_VAI ? '' : '<button type="button" class="ra-cong" title="Về cổng vào để chọn lại vai">' +
          (TEN_NGUOI ? e(TEN_NGUOI) + ' · ' : '') + 'Ra cổng</button>') +
        '<form class="tim" role="search">' +
          '<label class="an-chu" for="o-tim">Tìm trong hệ thống</label>' +
          '<input id="o-tim" type="search" autocomplete="off" spellcheck="false" ' +
            'placeholder="Tìm…  (gõ / để nhảy vào đây)">' +
        '</form>' +
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

  /* ── ĐẦU TRANG THEO MÀN ──────────────────────────────────
     Bản đầy đủ là một trang đổi màn bằng dấu thăng. Máy tìm kiếm
     không lập chỉ mục phần sau dấu thăng như một địa chỉ riêng —
     việc đó do các trang tĩnh trong ban-phat-hanh/trang/ lo. Phần
     dưới đây phục vụ NGƯỜI: thẻ trên trình duyệt, tên khi lưu dấu
     trang, và tấm thẻ hiện ra khi ai đó dán liên kết vào tin nhắn.
     Màn ngoài quyền cố ý KHÔNG ghi tiêu đề thật ra đầu trang. */
  function datDauTrang(v, duoc) {
    var m = G.MAN[v];
    if (!m) return;
    var t = duoc ? m.t + ' · GEN VIỆT 365' : 'Chưa mở · GEN VIỆT 365';
    var mo = duoc ? String(m.p || m.t).replace(/\*/g, '').replace(/\s+/g, ' ').trim()
                  : 'Màn này cần quyền cao hơn vai đang chọn.';
    if (mo.length > 160) {
      var c = mo.slice(0, 157), k = c.lastIndexOf(' ');
      mo = (k > 120 ? c.slice(0, k) : c) + '…';
    }
    document.title = t;
    theMeta('name', 'description', mo);
    theMeta('property', 'og:title', t);
    theMeta('property', 'og:description', mo);
    theMeta('property', 'og:url', location.href);
    var can = document.querySelector('link[rel="canonical"]');
    if (can) can.setAttribute('href', location.href);
  }

  function theMeta(loai, ten, giaTri) {
    var el = document.querySelector('meta[' + loai + '="' + ten + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(loai, ten);
      document.head.appendChild(el);
    }
    el.setAttribute('content', giaTri);
  }

  function ve() {
    var v = location.hash.replace(/^#/, '');
    if (v === 'noi-dung') return;

    /* màn kết quả tìm — không phải một màn trong kho, nên không
       đi qua veMan() và không được ghi nhớ làm màn đang đọc */
    if (v.indexOf('tim=') === 0) {
      var q = '';
      try { q = decodeURIComponent(v.slice(4).replace(/\+/g, ' ')); } catch (x) { q = v.slice(4); }
      chinh.innerHTML = veKetQua(q);
      Array.prototype.forEach.call(mucNav.querySelectorAll('a'), function (a3) {
        a3.classList.remove('oo'); a3.removeAttribute('aria-current');
      });
      goc.classList.remove('mo');
      if (nut) nut.setAttribute('aria-expanded', 'false');
      if (docTo) docTo.textContent = 'Kết quả tìm: ' + q;
      document.title = 'Tìm: ' + q + ' · GEN VIỆT 365';
      window.scrollTo(0, 0);
      return;
    }

    if (!v || !G.MAN[v]) v = PHANG.length ? PHANG[0].v : 'tong-quan';

    /* CỔNG LỚP HAI — chạy trước mọi lần dựng, nên vào thẳng bằng
       liên kết hay bằng trạng thái đã lưu đều bị chặn như nhau. */
    var duoc = G.duocPhep(VAI, BAC, v);
    chinh.innerHTML = (duoc ? veMan(v) + lienQuan(v) : theKhoa(v)) + dieuHuong(v);

    Array.prototype.forEach.call(mucNav.querySelectorAll('a'), function (a) {
      var o = a.getAttribute('data-v') === v;
      a.classList.toggle('oo', o);
      if (o) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    nho(v);
    moNhomHienTai(v);
    datDauTrang(v, duoc);
    goc.classList.remove('mo');
    if (nut) nut.setAttribute('aria-expanded', 'false');
    if (docTo) docTo.textContent = (duoc ? '' : 'Chưa mở: ') + ((G.MAN[v] || {}).t || v);
    window.scrollTo(0, 0);
  }

  function dungLai() {
    KHO_TIM = null;   /* quyền đổi thì phạm vi tìm cũng đổi */
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

  /* ── CỔNG VÀO ────────────────────────────────────────────
     Không phải hàng rào an ninh, và màn hình nói thẳng điều đó —
     xem màn dn-cong. Cổng này làm ba việc thật: nhận diện người
     đọc, đặt vai mặc định để mở ra là thấy phần của mình, và
     nhắc trách nhiệm đi kèm vai đã chọn.

     Hàng rào thật là BẢN CẮT: mỗi vai nhận một tệp riêng, nội
     dung ngoài quyền không có trong tệp. Trên bản cắt, G.KHOA_VAI
     đã cố định vai nên cổng này không hiện ra. */
  function veCong() {
    var ds = (G.DN_TAI_KHOAN || []).map(function (r) {
      var vai = G.timVai(r[0]);
      return '<button type="button" class="cong-vai" data-vai="' + e(r[0]) + '" ' +
        'style="--c:' + mau(vai && vai.mau) + '">' +
        '<span class="cv-ma">' + e(r[0]) + '</span>' +
        '<span class="cv-t">' + e(r[1]) + '</span>' +
        '<span class="cv-mo">' + e(r[2]) + '</span>' +
        '<span class="cv-ai">' + e(r[3]) + '</span></button>';
    }).join('');
    return '<div class="cong"><div class="cong-hop">' +
      '<div class="cong-dau">' +
        (G.HINH ? '<svg class="cong-dh" viewBox="' + e(G.HINH.gvVB) + '" width="52" height="72" ' +
          'role="img" aria-label="Dấu hiệu Gen Việt">' + G.HINH.gv() + '</svg>' : '') +
        '<div><h1>GEN VIỆT 365</h1>' +
        '<p class="cong-phu">Hệ điều hành phát triển con người · Học viện GITA</p></div>' +
      '</div>' +
      '<label class="cong-ten"><span>Tên người đang dùng</span>' +
      '<input type="text" id="cong-ten" autocomplete="name" ' +
      'placeholder="Ghi tên để hệ biết đang nói với ai"></label>' +
      '<p class="cong-hoi">Anh chị vào hệ với vai nào?</p>' +
      '<div class="cong-ds">' + ds + '</div>' +
      '<div class="cong-that"><b>Nói rõ một điều trước khi vào.</b> ' +
      'Cổng này <em>không phải</em> hàng rào an ninh. Trang chạy trên máy của anh chị, ' +
      'nên ai mở công cụ phát triển của trình duyệt cũng đổi được vai của mình. ' +
      'Hàng rào thật là <b>bản cắt</b>: mỗi vai nhận một tệp riêng, và nội dung ngoài ' +
      'quyền <em>không có trong tệp</em> — không phải bị ẩn, mà là không tồn tại. ' +
      'Chi tiết ở màn <b>Cổng đăng nhập và bốn lớp kiểm soát</b>.</div>' +
      '</div></div>';
  }

  function moCong(g) {
    g.className = 'ung-cong';
    g.innerHTML = veCong();
    var oTen = g.querySelector('#cong-ten');
    docTen();
    if (oTen && TEN_NGUOI) oTen.value = TEN_NGUOI;
    if (oTen) oTen.focus();
    g.addEventListener('click', function (ev) {
      var n = ev.target.closest ? ev.target.closest('.cong-vai') : null;
      if (!n) return;
      TEN_NGUOI = oTen ? oTen.value.trim() : '';
      VAI = n.getAttribute('data-vai');
      var r = G.timVai(VAI);
      /* học viên và đại sứ mặc định bậc thấp nhất; vai trong hệ thì
         không dùng trục bậc nên để nguyên */
      if (r && r.theoBac) BAC = 'B1';
      ghiVao(true);
      luuTT();
      dung(g);
    });
  }

  function dung(g) {
    goc = g;
    docTT();
    docTen();
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
    var nutRa = goc.querySelector('.ra-cong');
    if (nutRa) nutRa.addEventListener('click', function () {
      ghiVao(false);
      moCong(goc);
    });
    var oTim = goc.querySelector('#o-tim');
    var fTim = goc.querySelector('.tim');
    if (fTim) fTim.addEventListener('submit', function (ev) { ev.preventDefault(); });
    if (oTim) {
      var treo = 0;
      oTim.addEventListener('input', function () {
        clearTimeout(treo);
        var q = oTim.value.trim();
        treo = setTimeout(function () {
          if (q.length < 2) {
            if (location.hash.indexOf('#tim=') === 0) history.replaceState(null, '', '#');
            return;
          }
          location.hash = 'tim=' + encodeURIComponent(q);
        }, 180);
      });
      oTim.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape') { oTim.value = ''; oTim.blur(); location.hash = ''; }
        if (ev.key === 'Enter') {
          ev.preventDefault();
          var a5 = chinh.querySelector('.kq a');
          if (a5) { oTim.blur(); location.hash = a5.getAttribute('href').slice(1); }
        }
      });
    }

    var oVai = goc.querySelector('#o-vai'), oBac = goc.querySelector('#o-bac');
    if (oVai) oVai.addEventListener('change', function (ev) { doiVai(ev.target.value, null); });
    if (oBac) oBac.addEventListener('change', function (ev) { doiVai(null, ev.target.value); });
    /* Mở hết · thu hết — người quen hệ thường muốn nhìn toàn cảnh,
       người mới thì muốn gập lại cho đỡ ngợp. Cho cả hai. */
    mucNav.addEventListener('click', function (ev) {
      var nut = ev.target.closest ? ev.target.closest('.muc-nut') : null;
      if (!nut) return;
      var mo = nut.getAttribute('data-mo') === '1';
      Array.prototype.forEach.call(mucNav.querySelectorAll('details.phan, details.nhom'),
        function (n) { n.open = mo; });
      nhomTuMo = null; phanTuMo = null;   /* người dùng vừa quyết định thay, đừng đóng hộ nữa */
    });

    window.addEventListener('hashchange', ve);

    /* mũi tên trái phải để lật màn — bỏ qua khi đang gõ hoặc đang
       chọn trong danh sách, và khi người dùng đang giữ phím tắt */
    document.addEventListener('keydown', function (ev) {
      if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
      var t = ev.target || {};
      var the = (t.tagName || '').toLowerCase();
      if (the === 'input' || the === 'select' || the === 'textarea' || t.isContentEditable) return;
      if (ev.key === '/' && oTim) { ev.preventDefault(); oTim.focus(); oTim.select(); return; }
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
    if (!g) return;
    if (daVao()) dung(g); else moCong(g);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', batDau);
  } else { batDau(); }
})();
