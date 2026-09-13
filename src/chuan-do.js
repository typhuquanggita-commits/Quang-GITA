/* ══════════════════════════════════════════════════════════════════
   CHUẨN 1000 — NỬA MÁY ĐO
   ------------------------------------------------------------------
   Tới 9.99.80 cả năm mươi ô của G.CHUAN1000 đều là LỜI KHAI: một con
   số gõ tay một lần rồi không ai đo lại. Đo thử đúng một ô — C8 "có
   nhãn cho trình đọc màn hình", ô tự khai THẤP NHẤT cả bảng 12/20 —
   ra 0/3.021 nút thiếu nhãn. Bảng chấm sai, và sai theo chiều nào
   cũng vô dụng như nhau.

   Chủ hệ chốt WOW-01 phương án 1: TÁCH HAI NGĂN. Tệp này là nửa thứ
   nhất — mỗi hàm ở đây đo THẬT, trên DOM đang chạy hoặc trên kho đã
   mở, VÀO ĐÚNG LÚC người ta mở màn.

   Vì sao đo lúc mở màn chứ không đo ở bộ kiểm rồi ghi số vào kho:
   một con số đo ở bộ kiểm rồi chép vào kho là một LỜI KHAI mang dấu
   của phép đo — nhìn y hệt, và nó cũ đi lặng lẽ. Cùng luật với cột
   `conHan` không có trong theVungManh (9.99.63), cột `den` không có
   trong hoSoSongSinh (9.99.66), cột "giá hiện tại" không có trong
   bangGia (9.99.73).

   HAI LUẬT CỦA TỆP NÀY
   1. Hàm nào KHÔNG đo được thật thì KHÔNG viết ra ở đây. Khai `mayDo`
      cho một ô rồi trả về một con số đoán là dựng lại đúng cái bẫy
      vừa gỡ — tệ hơn, vì nay nó mang nhãn "máy đo".
   2. Mỗi hàm trả kèm `cach` — CÂU NÓI CÁCH ĐO. Một con số không nói
      nó đo bằng gì thì người đọc không cãi lại được, và thứ không cãi
      lại được thì không kiểm lại được.
   ══════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var G = window.G;

  /* Chấm theo tỷ lệ đạt, làm tròn XUỐNG. Làm tròn lên là tự cho mình
     nửa điểm ở mọi ô, và năm mươi nửa điểm cộng lại thành một con số
     không ai đặt. */
  function cham(dat, tren, m){
    if (!tren) return 0;
    return Math.max(0, Math.min(m, Math.floor(dat / tren * m)));
  }

  /* Kho có thể chưa nạp (kho nạp SAU khi đăng nhập, và vai không có
     gói nghề thì không bao giờ nạp). Trả undefined chứ không trả 0 —
     0 đọc ra là "đo được và bằng không". */
  function kho(ten){
    var v = G[ten];
    return (v === undefined || v === null) ? undefined : v;
  }

  /* ── Tương phản: công thức WCAG, đọc màu ĐANG CHẠY từ trình duyệt ── */
  function sang(mau){
    var m = /rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(mau);
    if (!m) return null;
    var a = [+m[1], +m[2], +m[3]].map(function(v){
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  function tuongPhan(truoc, sau){
    var a = sang(truoc), b = sang(sau);
    if (a === null || b === null) return null;
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  }

  /* ══════════════ CÁC PHÉP ĐO ══════════════
     Mỗi mã ở đây phải có ĐÚNG MỘT ô trong G.CHUAN1000 trỏ tới, và
     ngược lại. Mục 95 canh cả hai chiều: một phép đo không ô nào gọi
     là mã chết, và một ô trỏ vào mã không tồn tại thì ô ấy lặng lẽ
     mất điểm mà nhìn vẫn y hệt một ô đã được đo. */
  var DO = {

    /* ─── C1 · Nhận diện ─── */
    CHUAN_CHU: function(m){
      /* Thang cỡ chữ: đếm bậc cỡ chữ THẬT SỰ đang hiện trên trang.
         Bản 9.25 có hai mươi sáu bậc — nghĩa là không có thang nào
         cả, mỗi mảnh giao diện tự nghĩ ra cỡ của mình. */
      var bac = {}, n = 0;
      document.querySelectorAll('body *').forEach(function(e){
        if (!e.offsetParent && e.tagName !== 'BODY') return;
        var t = (e.textContent || '').trim();
        if (!t || e.children.length) return;
        var c = Math.round(parseFloat(getComputedStyle(e).fontSize) * 2) / 2;
        if (!c) return;
        bac[c] = (bac[c] || 0) + 1; n++;
      });
      var so = Object.keys(bac).length;
      return { d: cham(Math.max(0, 12 - so), 9, m), tren: n,
        cach: so + ' bậc cỡ chữ đang hiện trên màn này (thang chuẩn: 9 bậc; '
          + 'đạt tối đa khi ≤ 3 bậc trên một màn)' };
    },

    /* ─── C2 · Điều hướng ─── */
    NAV_NHOM: function(m){
      var nav = kho('NAV');
      if (!nav) return undefined;
      /* Hai điều kiện: gom về năm nhóm, và KHÔNG mục nào nằm hai nhóm.
         Mục nằm hai nhóm là chỗ người dùng học một đường đi rồi lần
         sau tìm ở đường ấy không thấy. */
      var thay = {}, chong = 0, tong = 0;
      nav.forEach(function(nh){
        (nh.items || []).forEach(function(i){
          tong++;
          if (thay[i.v]) chong++; else thay[i.v] = 1;
        });
      });
      var dat = (chong === 0 ? 1 : 0) + (nav.length <= 6 ? 1 : 0);
      return { d: cham(dat, 2, m), tren: tong,
        cach: nav.length + ' nhóm · ' + tong + ' mục · ' + chong + ' mục nằm hai nhóm' };
    },
    NAV_PHIM: function(m){
      /* Tìm nhanh bằng bàn phím: ô tìm phải CÓ MẶT và nhận được nét
         nháy. Một ô tìm hiện ra mà không focus được thì nó chỉ dùng
         được bằng chuột — tức là đúng thứ ô này sinh ra để thay. */
      var o = document.querySelector('#nav-tim, [data-tim], input[type=search]');
      if (!o) return { d: 0, tren: 1, cach: 'không có ô tìm nhanh trên màn này' };
      var duoc = o.tabIndex >= 0 && !o.disabled;
      return { d: cham(duoc ? 1 : 0, 1, m), tren: 1,
        cach: duoc ? 'có ô tìm nhanh và nhận được nét nháy bàn phím'
                   : 'có ô tìm nhanh nhưng bàn phím không tới được' };
    },

    /* ─── C4 · Chiều sâu nội dung ─── */
    KICHBAN_5T: function(m){
      var k = kho('KICHBAN');
      if (!k) return undefined;
      var t = {}; k.forEach(function(x){ if (x.tang) t[x.tang] = (t[x.tang] || 0) + 1; });
      var du = ['T1','T2','T3','T4','T5'].filter(function(x){ return t[x] >= 100; }).length;
      return { d: cham(du, 5, m), tren: k.length,
        cach: k.length + ' kịch bản · ' + du + '/5 tầng có từ 100 bản ghi trở lên ('
          + ['T1','T2','T3','T4','T5'].map(function(x){ return x + ':' + (t[x] || 0); }).join(' ') + ')' };
    },
    PHACDO_220: function(m){
      var p = kho('PHACDO');
      if (!p) return undefined;
      /* Đếm phác đồ CÓ ĐỦ ba lời khuyên theo vai — một phác đồ thiếu
         một vai là một phác đồ chỉ dùng được cho hai phần ba số người
         mở nó ra, và chỗ thiếu ấy không hiện ra ở đâu cả. */
      var du = p.filter(function(x){
        return (x.ph || '').trim() && (x.coach || '').trim() && (x.dich || '').trim();
      }).length;
      return { d: cham(du, p.length, m), tren: p.length,
        cach: du + '/' + p.length + ' phác đồ có đủ lời cho cả ba vai (phụ huynh · coach · chuyển tuyến)' };
    },
    MOTHUC_TANG: function(m){
      var mt = kho('MOTHUC');
      if (!mt) return undefined;
      var du = mt.filter(function(x){ return (x.tiers || []).length; }).length;
      return { d: cham(du, mt.length, m), tren: mt.length,
        cach: du + '/' + mt.length + ' mô thức có khai tầng dùng được' };
    },
    NGUON_NGOAI: function(m){
      /* "Nguyên lý mượn ngoài đều ghi nguồn" — đo trên chính kho mô
         thức, nơi phần lớn nguyên lý mượn ngoài nằm. */
      var mt = kho('MOTHUC');
      if (!mt) return undefined;
      var co = mt.filter(function(x){ return (x.source || '').trim(); }).length;
      return { d: cham(co, mt.length, m), tren: mt.length,
        cach: co + '/' + mt.length + ' mô thức ghi rõ nguồn' };
    },

    /* ─── C6 · Phân quyền ─── */
    VAI_PHAMVI: function(m){
      var r = kho('ROLES');
      if (!r) return undefined;
      /* Mỗi vai phải trỏ vào một cổng CÓ THẬT. Một vai trỏ vào cổng
         không tồn tại thì người mang vai ấy đăng nhập vào khoảng
         không, và lỗi chỉ hiện ra với đúng người ấy. */
      var cong = kho('PORTALS') || {};
      var du = r.filter(function(x){ return x.portal && cong[x.portal]; }).length;
      return { d: cham(du, r.length, m), tren: r.length,
        cach: du + '/' + r.length + ' vai trỏ vào một cổng có thật' };
    },
    PHIEN_HAN: function(m){
      /* "Xác thực đặt ở máy chủ, phiên có hạn" — phần máy khách kiểm
         được là: phiên CÓ mốc hết hạn, và mốc ấy nằm ở tương lai gần
         chứ không phải một trăm năm. Phần "đặt ở máy chủ" thì máy
         khách không tự chứng minh được — nên ô này chỉ lấy phần đo
         được, và `cach` nói thẳng nó đo nửa nào. */
      var s = G.S || {};
      var han = s.hetHan || s.exp || (s.phien && s.phien.hetHan);
      if (!han) return { d: 0, tren: 1, cach: 'phiên máy khách không mang mốc hết hạn nào' };
      var gio = (new Date(han).getTime() - Date.now()) / 3600000;
      var hopLy = gio > 0 && gio <= 24 * 30;
      return { d: cham(hopLy ? 1 : 0, 1, m), tren: 1,
        cach: 'phiên còn ' + Math.round(gio) + ' giờ' +
          (hopLy ? '' : ' — ngoài khoảng hợp lý (0–720 giờ)') +
          '. Chỉ đo phía máy khách; phần "đặt ở máy chủ" đo ở thu-worker.js' };
    },

    /* ─── C7 · Hiệu năng ─── */
    CHUYEN_MAN: function(m){
      /* Đo THẬT: dựng lại ba màn đang có trong cột trái và bấm giờ.
         Không đọc một con số ai đó ghi lại. */
      var nut = [].slice.call(document.querySelectorAll('button.nav-i[data-v]')).slice(0, 3);
      if (!nut.length) return undefined;
      var ms = [];
      nut.forEach(function(n){
        var v = n.getAttribute('data-v'), f = G.VIEWS && G.VIEWS[v];
        if (typeof f !== 'function') return;
        var t0 = performance.now();
        try { f(); } catch (e) { return; }
        ms.push(performance.now() - t0);
      });
      if (!ms.length) return undefined;
      var cao = Math.max.apply(null, ms);
      return { d: cham(ms.filter(function(x){ return x < 100; }).length, ms.length, m), tren: ms.length,
        cach: 'dựng ' + ms.length + ' màn ngay lúc này · chậm nhất ' + cao.toFixed(1) + ' ms (ngưỡng 100)' };
    },
    KHO_TACH: function(m){
      /* "Dữ liệu tách khỏi giao diện" — đo bằng chỗ dữ liệu THẬT SỰ
         nằm: số kho G.* đã mở. Không kho nào thì cả câu ấy không đúng
         ở máy này. */
      var ds = kho('DS_KHO') || (G.KHO && G.KHO.ten);
      var n = 0;
      for (var k in G) if (Object.prototype.hasOwnProperty.call(G, k) &&
        /^[A-Z][A-Z0-9_]*$/.test(k) && (Array.isArray(G[k]) || (G[k] && typeof G[k] === 'object'))) n++;
      void ds;
      return { d: cham(n >= 300 ? 1 : 0, 1, m), tren: n,
        cach: n + ' kho dữ liệu nằm ngoài mã giao diện, nạp riêng sau khi đăng nhập' };
    },

    /* ─── C8 · Khả năng tiếp cận ─── */
    BAN_PHIM: function(m){
      var tuongTac = document.querySelectorAll(
        'button, a[href], input:not([type=hidden]), select, textarea, [role=button]');
      var tat = 0, tong = 0;
      tuongTac.forEach(function(e){
        if (!e.offsetParent) return;
        tong++;
        if (e.tabIndex < 0 || e.getAttribute('aria-hidden') === 'true') tat++;
      });
      return { d: cham(tong - tat, tong || 1, m), tren: tong,
        cach: tat + '/' + tong + ' chỗ bấm được mà bàn phím KHÔNG tới được' };
    },
    TUONG_PHAN: function(m){
      /* Đọc màu ĐANG CHẠY, không đọc một bảng mã chép tay: tệp kiểu
         đổi mà bảng chép tay ở lại thì cả bộ nhận diện trôi đi trong
         khi phép kiểm vẫn xanh (bài học 9.26). */
      var nen = getComputedStyle(document.body).backgroundColor;
      var mau = [], chu = 0, dat = 0;
      document.querySelectorAll('body *').forEach(function(e){
        if (!e.offsetParent || e.children.length) return;
        if (!(e.textContent || '').trim()) return;
        var st = getComputedStyle(e);
        var co = parseFloat(st.fontSize) >= 18.66 || +st.fontWeight >= 700 ? 3 : 4.5;
        var tp = tuongPhan(st.color, st.backgroundColor === 'rgba(0, 0, 0, 0)' ? nen : st.backgroundColor);
        if (tp === null) return;
        chu++; if (tp >= co) dat++; else mau.push(tp.toFixed(2));
      });
      return { d: cham(dat, chu || 1, m), tren: chu,
        cach: dat + '/' + chu + ' khối chữ đạt ngưỡng AA' +
          (mau.length ? ' · thấp nhất ' + Math.min.apply(null, mau.map(Number)).toFixed(2) : '') };
    },
    GIAM_CHUYEN_DONG: function(m){
      /* Có luật `prefers-reduced-motion` trong tệp kiểu đang chạy hay
         không — hỏi chính bộ luật CSS trình duyệt đã nạp, không hỏi
         một ô khai. */
      var co = 0;
      try {
        for (var i = 0; i < document.styleSheets.length; i++) {
          var ss = document.styleSheets[i], r;
          try { r = ss.cssRules; } catch (e) { continue; }
          if (!r) continue;
          for (var j = 0; j < r.length; j++)
            if (r[j].media && /prefers-reduced-motion/.test(r[j].conditionText || r[j].media.mediaText)) co++;
        }
      } catch (e) { return undefined; }
      return { d: cham(co ? 1 : 0, 1, m), tren: 1,
        cach: co + ' khối luật tôn trọng chế độ giảm chuyển động của máy người dùng' };
    },
    CO_CHU_LON: function(m){
      /* Ngưỡng 16px không phải một ý thích: dưới mức ấy Safari trên
         iPhone phóng CẢ TRANG khi người ta chạm vào ô nhập. */
      var o = document.querySelectorAll('input:not([type=hidden]), textarea, select');
      var dat = 0, n = 0;
      o.forEach(function(e){
        if (!e.offsetParent) return;
        n++; if (parseFloat(getComputedStyle(e).fontSize) >= 16) dat++;
      });
      var than = parseFloat(getComputedStyle(document.body).fontSize);
      if (!n) return { d: cham(than >= 14 ? 1 : 0, 1, m), tren: 1,
        cach: 'màn này không có ô nhập · cỡ chữ thân trang ' + than + 'px' };
      return { d: cham(dat, n, m), tren: n,
        cach: dat + '/' + n + ' ô nhập đạt 16px · cỡ chữ thân trang ' + than + 'px' };
    },
    NHAN_DOC: function(m){
      /* Ô tự khai THẤP NHẤT cả bảng (12/20) và là ô đầu tiên được đo
         thật. Kết quả lượt đầu: 0/3.021 nút thiếu nhãn — bảng chấm
         quá tay, chứ không phải kho hỏng. */
      function coNhan(e){
        if (e.getAttribute('aria-label') || e.getAttribute('aria-labelledby') ||
            e.getAttribute('title')) return true;
        if (e.id && document.querySelector('label[for="' + (window.CSS && CSS.escape
          ? CSS.escape(e.id) : e.id) + '"]')) return true;
        if (e.closest && e.closest('label')) return true;
        if (e.tagName === 'BUTTON' || e.tagName === 'A')
          return !!(e.textContent || '').trim();
        return !!e.getAttribute('placeholder');
      }
      var thieu = 0, n = 0;
      document.querySelectorAll('button, a[href], img, input:not([type=hidden]), select, textarea')
        .forEach(function(e){
          if (!e.offsetParent && e.tagName !== 'IMG') return;
          n++;
          var ok = e.tagName === 'IMG' ? e.hasAttribute('alt') : coNhan(e);
          if (!ok) thieu++;
        });
      return { d: cham(n - thieu, n || 1, m), tren: n,
        cach: thieu + '/' + n + ' nút · liên kết · ảnh · ô nhập thiếu tên đọc được' };
    },

    /* ─── C10 · Lan toả ─── */
    DAISU_KHUNG: function(m){
      var d = kho('DAISU');
      if (!d) return undefined;
      var cap = (d.capDo || []).length, nv = (d.nhiemVu || []).length;
      var dat = (cap === 4 ? 1 : 0) + (nv === 20 ? 1 : 0);
      return { d: cham(dat, 2, m), tren: 2,
        cach: cap + ' cấp đại sứ (cần 4) · ' + nv + ' nhiệm vụ (cần 20)' };
    },
    CHIASE_LUAT: function(m){
      var d = kho('DAISU');
      if (!d || !d.quyTac) return undefined;
      var n = (d.quyTac.muc || []).length;
      return { d: cham(Math.min(n, 13), 13, m), tren: n,
        cach: n + '/13 quy tắc an toàn khi chia sẻ' };
    }
  };

  /* ══════════════ CỬA RA ══════════════
     Trả về BẢNG THEO MÃ, không trả một con số tổng. Cộng tổng là việc
     của chỗ trình bày, và chỗ ấy phải cộng RIÊNG nửa này — gộp với
     nửa lời khai thì con số mang tên của phép đo trong khi nó thừa
     hưởng mọi sai của lời khai (luật phễu, 9.99.59). */
  G.chuanDo = function(){
    var ra = {}, luc = new Date();
    Object.keys(DO).forEach(function(ma){
      var r;
      try { r = DO[ma](20); }
      catch (e) { r = { loi: (e && e.message ? e.message : 'lỗi') }; }
      /* Kho chưa mở thì BỎ HẲN mã ấy, không ghi 0. Trống là "chưa đo
         được", 0 là "đo được và bằng không" — hai câu khác hẳn nhau. */
      if (r !== undefined) ra[ma] = r;
    });
    ra._luc = luc;
    return ra;
  };

  /* Danh sách mã, để mục 95 đối chiếu hai chiều với kho. */
  G.CHUAN_DO_MA = Object.keys(DO);
})();
