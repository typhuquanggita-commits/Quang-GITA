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
      return '<div class="the ly"><div class="stt">' + x.so + '</div>' +
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
      return '<article class="bac" style="--c:' + e(x.mau) + '">' +
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
      return '<div class="tru" style="--c:' + e(x.mau) + '">' +
        '<div class="dinh"><div class="k">' + e(x.k) + '</div><h3>' + e(x.t) + '</h3>' +
        '<div class="hoi">' + e(x.hoi) + '</div></div><ul>' +
        ds(x.truc, function (t) {
          return '<li><span class="n">' + t.so + '</span><div><b>' + e(t.t) + '</b>' +
            '<span>' + e(t.do) + ' · ' + e(t.bang) + ' · ' + e(t.ky) + '</span></div></li>';
        }) + '</ul></div>';
    }) + '</div>';
  };

  K.thang = function (o) {
    return '<div class="thang">' + ds(lay(o), function (x) {
      return '<div class="nac"><div class="m">' + x.m + '</div><div class="noi">' +
        '<b>' + e(x.t) + '</b><span>Quyền điều hành: ' + e(x.quyen) + '</span>' +
        '<span>Mức hỗ trợ: ' + e(x.ho) + '</span><span>Bằng chứng: ' + e(x.bang) + '</span>' +
        '</div></div>';
    }) + '</div>';
  };

  K.pc = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<div class="pc" style="--c:' + e(x.mau) + '">' +
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
      return '<div class="o" style="--c:' + e(x.mau) + '"><div class="dai"></div><div class="noi">' +
        '<b>' + e(x.b) + '</b><p>' + e(x.n) + '</p>' +
        '<p class="dam">' + e(x.lam) + '</p>' +
        '<div class="cham">Nhịp chạm: ' + e(x.cham) + '</div></div></div>';
    }) + '</div>';
  };

  K.mt = function (o) {
    return '<div class="luoi mot">' + ds(lay(o), function (x) {
      return '<div class="mt" style="--c:' + e(x.mau) + '">' +
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
      return '<article class="chang" style="--c:' + e(x.mau) + '">' +
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
      return '<div class="lt" style="--c:' + e(b.mau) + '">' +
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
      return '<div class="the buoi"><div class="b-dau"><span class="n">Buổi ' + x.b + '</span>' +
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
      return '<div class="cdn" style="--c:' + e(n.mau) + '"><h3>' + e(n.nhom) + '</h3><ol>' +
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
        '<span class="d">' + x.d + '</span>' +
        '<div class="thanh"><i style="width:' + (x.d / toi * 100) + '%"></i></div>' +
        '<span class="n">' + e(x.n) + '</span></div>';
    }) + '<div class="tong-d">Tổng ' + tong + ' điểm · ngưỡng đạt ' +
      e(o.nguong == null ? 85 : o.nguong) + '</div></div>';
  };

  K.quy = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<div class="quy" style="--c:' + e(x.mau) + '">' +
        '<div class="q-dau"><span class="q">' + e(x.q) + '</span>' +
        '<b>' + e(x.chu) + '</b><span class="tu">' + e(x.tuan) + '</span></div><ul class="moc">' +
        ds(x.moc, function (m) {
          return '<li><span class="t">' + e(m.t) + '</span><span>' + e(m.v) + '</span></li>';
        }) + '</ul></div>';
    }) + '</div>';
  };

  K.nam = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<div class="quy" style="--c:' + e(x.mau) + '">' +
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
      return '<div class="mt st" style="--c:' + e(x.mau) + '">' +
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
      return '<div class="stv" style="--c:' + e(x.mau) + '"><h3>' + e(x.v) + '</h3>' +
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
      return '<div class="clg" style="--c:' + e(n.mau) + '">' +
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

  /* bốn chân dung gia đình */
  K.cd4 = function (o) {
    return '<div class="luoi hai">' + ds(lay(o), function (x) {
      return '<div class="cd4" style="--c:' + e(x.mau) + '"><h3>' + e(x.t) + '</h3>' +
        '<div class="d"><b>Dấu hiệu</b>' + e(x.dh) + '</div>' +
        '<div class="d"><b>Họ cần gì</b>' + e(x.can) + '</div>' +
        '<div class="d lam"><b>Mình làm gì</b>' + e(x.lam) + '</div>' +
        '<div class="d bay"><b>Bẫy</b>' + e(x.bay) + '</div></div>';
    }) + '</div>';
  };

  /* ── dựng một màn ────────────────────────────────── */
  function veMan(v) {
    var m = G.MAN[v];
    if (!m) return '<div class="the"><p>Chưa có màn ' + e(v) + '.</p></div>';
    var html = '<div class="dau"><span class="k">' + e(m.k) + '</span><h2>' + e(m.t) + '</h2>' +
      (m.p ? '<p>' + dm(m.p) + '</p>' : '') + '</div>';
    html += ds(m.khoi, function (o) {
      var f = K[o.k];
      return f ? f(o) : '<p class="van">[thiếu loại khối: ' + e(o.k) + ']</p>';
    });
    return html;
  }

  /* danh sách phẳng để đi tới / lui */
  var PHANG = [];
  (G.NHOM || []).forEach(function (n) {
    n.ds.forEach(function (i) { PHANG.push({ v: i.v, t: i.t, nhom: n.t }); });
  });

  function dieuHuong(v) {
    var i = -1, k;
    for (k = 0; k < PHANG.length; k++) if (PHANG[k].v === v) i = k;
    var truoc = i > 0 ? PHANG[i - 1] : null;
    var sau = i > -1 && i < PHANG.length - 1 ? PHANG[i + 1] : null;
    return '<nav class="di" aria-label="Chuyển màn">' +
      (truoc ? '<a href="#' + e(truoc.v) + '" class="tr"><span>← Trước</span><b>' + e(truoc.t) + '</b></a>' : '<span></span>') +
      '<span class="dem">' + (i + 1) + ' / ' + PHANG.length + '</span>' +
      (sau ? '<a href="#' + e(sau.v) + '" class="sa"><span>Sau →</span><b>' + e(sau.t) + '</b></a>' : '<span></span>') +
      '</nav>';
  }

  /* ── vỏ ứng dụng ─────────────────────────────────── */
  function veVo() {
    var m = G.META;
    return '<a href="#noi-dung" class="bo-qua">Tới nội dung</a>' +
      '<header class="mao">' +
        '<div class="hieu"><span class="ten">' + e(m.ten) + '</span>' +
          '<span class="phu">' + e(m.phu) + '</span></div>' +
        '<div class="ban">Bản ' + e(m.ban) + ' · ' + e(m.tam) + '</div>' +
        '<button class="nut-muc" type="button" aria-expanded="false">Mục lục</button>' +
      '</header>' +
      '<div class="khung">' +
        '<nav class="muc" aria-label="Mục lục">' + ds(G.NHOM, function (n) {
          return '<div class="nhom" style="--c:' + e(n.mau) + '">' +
            '<div class="n-dau"><span class="no">' + e(n.no) + '</span>' +
            '<span class="t">' + e(n.t) + '</span><span class="s">' + e(n.s) + '</span></div>' +
            '<ul>' + ds(n.ds, function (i) {
              return '<li><a href="#' + e(i.v) + '" data-v="' + e(i.v) + '">' +
                '<b>' + e(i.t) + '</b><span>' + e(i.h) + '</span></a></li>';
            }) + '</ul></div>';
        }) + '</nav>' +
        '<main id="noi-dung" class="chinh" tabindex="-1"></main>' +
      '</div>' +
      '<footer class="chan"><b>' + e(m.ten) + '</b><span>' + e(m.hocVien) + '</span>' +
      '<span>' + e(m.suMenh) + '</span></footer>';
  }

  var goc, chinh, nut;

  function nho(v) { try { localStorage.setItem('genviet365.man', v); } catch (x) {} }
  function nhoLai() { try { return localStorage.getItem('genviet365.man'); } catch (x) { return null; } }

  function ve() {
    var v = location.hash.replace(/^#/, '');
    if (v === 'noi-dung') return;
    if (!v || !G.MAN[v]) v = PHANG.length ? PHANG[0].v : '';
    chinh.innerHTML = veMan(v) + dieuHuong(v);
    Array.prototype.forEach.call(goc.querySelectorAll('.muc a'), function (a) {
      var o = a.getAttribute('data-v') === v;
      a.classList.toggle('oo', o);
      if (o) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    nho(v);
    goc.classList.remove('mo');
    if (nut) nut.setAttribute('aria-expanded', 'false');
    window.scrollTo(0, 0);
  }

  function dung(g) {
    goc = g;
    goc.className = 'ung';
    goc.innerHTML = veVo();
    chinh = goc.querySelector('.chinh');
    nut = goc.querySelector('.nut-muc');
    nut.addEventListener('click', function () {
      var mo = goc.classList.toggle('mo');
      nut.setAttribute('aria-expanded', mo ? 'true' : 'false');
    });
    window.addEventListener('hashchange', ve);
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
