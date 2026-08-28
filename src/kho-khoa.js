/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.1 — KHO KHOÁ
   Nội dung chuyên môn của GITA 365 là tài sản có bản quyền. Nó không
   nằm trong ứng dụng dưới dạng đọc được: mỗi gói được mã hoá AES-256-GCM
   và chỉ mở ra khi máy chủ cấp khoá cho đúng vai, đúng tầng, đúng phiên.

   Ba tầng bảo vệ:
     1. Tệp .enc không đọc được nếu không có khoá.
     2. Khoá do máy chủ cấp sau khi đăng nhập, theo phạm vi được cấp phép,
        có hạn dùng. Khoá không bao giờ nằm trong mã nguồn.
     3. Nội dung sau khi giải mã chỉ tồn tại trong bộ nhớ phiên làm việc —
        không ghi ra đĩa, không vào localStorage.

   Nói thẳng: ba tầng này chặn được việc sao chép kho khi chưa đăng nhập,
   chặn máy quét, và chặn phát tán tệp. Chúng KHÔNG chặn được một người
   đã được cấp phép cố tình chép lại phần mình đang xem — không hệ thống
   nào trên đời làm được điều đó. Phần còn lại thuộc về hợp đồng, nhật ký
   truy cập và đóng dấu chìm theo người xem.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

/* Địa chỉ máy chủ cấp phép. Để trống thì ứng dụng chạy ở chế độ mẫu. */
G.API_CAP_PHEP = G.API_CAP_PHEP || '';

G.KHO = { daNap: [], dangNap: [], cheDoMau: false, hanKhoa: null };

/* Mọi thuộc tính do kho cấp phép nạp vào. Đổi vai là xoá sạch rồi nạp lại
   theo đúng phạm vi của vai mới — không để sót nội dung của vai trước. */
G.THUOC_CAP_PHEP = [
  'VANHANH','CHUYENDICH','CHANDUNG','LOTRINH','FAMILIES','TEAM','CUHICH','NGHILE','SUKIEN',
  'HEALTH','DUYET','AUDIT','TODAY','LEVELS','DIEM','HUYHIEU','QUA','HOAHONG','DANDAT','BRAND',
  'RASOAT','TAMNHIN100','TANG100','WOW','NHATBAN','CHIPHI','NGONTU_RANH','DAISU','BAIHOC',
  'MOTHUC','SACH','BANDO_A3','POSTER','SODO','PHACDO','DIEMCHAM','NGONTU','NGONTU_TANG',
  'THAYVI','MAUTHOAI','PERSONA','CHUAN1000','HAILONG','TAILIEU','AIPOLICY','KPI','DINHTUYEN',
  'AINANGCAP','LACHAN','BENCH','BENCH_AI','KICHBAN',
  'LUAT_TK','TAIKHOAN_KPI','YEUCAU_MO','HANG_TL','DAU_MAT','QUYTRINH',
  'QUA1000','QUA_DANG','KETNOI','LIENKET','VANBAN','TAICHINH_QT','THANHTRA','RASOAT_KH',
  'BANDO_TUVAN','BANDO_COACH','XUAT','TINHHUONG','KHUNG_T5','THANHTOAN','TEST750','KPI100',
  'MATRAN','MATRAN_T1','MATRAN_T2','MATRAN_T3','MATRAN_T4','MATRAN_T5',
  'REFERRAL','CHANDUNG_KH','DOLUONG_KH','PHANHANG','CHUAN_VIP','NHANSU_TT','CAYTIEN',
  'HOSO_VIP','CHUYENDOI','XUONG_SONG','NGUON_VAITRO','SACH_THAMKHAO','PHUONGPHAP','VANTAY','AICHAM'
];
function donKho(){
  G.THUOC_CAP_PHEP.forEach(function(k){ try{ delete G[k]; }catch(e){ G[k] = undefined; } });
  G.KHO.daNap = []; G.KHO.dangNap = []; G.KHO.cheDoMau = false; G.KHO.hanKhoa = null;
}
G.donKho = donKho;

/* ── Phạm vi cấp phép: vai nào, tầng nào, được mở gói nào ── */
G.goiDuocCap = function () {
  /* Đây chỉ là DANH SÁCH XIN. Quyết định cấp hay không là của máy chủ:
     máy chủ đọc hồ sơ tài khoản, biết vai và tầng thật, rồi chỉ trả khoá
     của những gói tài khoản đó được cấp phép. Client không tự phong quyền. */
  var r = G.S.roleObj, ds = ['nen'];
  if (!r) return ds;
  if (r.lv <= 11) ds.push('nghe');
  if (r.lv <= 11 || r.portal === 'ph' || r.portal === 'hs')
    for (var i = 1; i <= 5; i++) ds.push('tang' + i);
  return ds;
};

/* ── Xin khoá ── */
function xinKhoa(danhSach) {
  /* Giấy phép cục bộ: bản máy tính đã kích hoạt nạp khoá qua đường này,
     sau khi tiến trình chính đọc và kiểm tệp giấy phép trong thư mục dữ liệu.
     Bản web không bao giờ có sẵn khoá — luôn phải hỏi máy chủ. */
  if (window.GITA_KHOA) return Promise.resolve(window.GITA_KHOA);
  if (!G.API_CAP_PHEP) return Promise.resolve(null);
  return fetch(G.API_CAP_PHEP, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      fn: 'capKhoa',
      u: G.S.acc && G.S.acc.u,
      vai: G.S.role,
      goi: danhSach,
      may: navigator.userAgent.slice(0, 120)
    })
  }).then(function (r) { return r.json(); })
    .then(function (d) {
      if (!d || !d.ok) throw new Error(d && d.error || 'Máy chủ chưa cấp khoá');
      G.KHO.hanKhoa = d.hetHan || null;
      return d.khoa;
    });
}

/* ── Giải mã một gói ── */
function moGoi(ten, khoaB64) {
  return fetch('kho/' + ten + '.enc')
    .then(function (r) { if (!r.ok) throw new Error('Không tìm thấy gói ' + ten); return r.arrayBuffer(); })
    .then(function (buf) {
      var b = new Uint8Array(buf);
      var iv = b.slice(0, 12), tag = b.slice(12, 28), ma = b.slice(28);
      var kem = new Uint8Array(ma.length + tag.length);
      kem.set(ma); kem.set(tag, ma.length);       // WebCrypto chờ tag ở cuối
      var raw = Uint8Array.from(atob(khoaB64), function (c) { return c.charCodeAt(0); });
      return crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt'])
        .then(function (k) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, k, kem); });
    })
    .then(function (ro) { return JSON.parse(new TextDecoder().decode(ro)); });
}

/* ── Gộp nội dung đã mở vào G, chỉ trong bộ nhớ ── */
function gop(du) {
  Object.keys(du).forEach(function (k) {
    if (k === 'KICHBAN' || k === 'TEST750') G[k] = (G[k] || []).concat(du[k]);
    else G[k] = du[k];
  });
}

/* ── Chế độ mẫu: đủ để xem giao diện, không lộ kho ── */
function napMau() {
  return fetch('kho/mau.json').then(function (r) { return r.json(); })
    .then(function (m) {
      G.KHO.cheDoMau = true;
      Object.keys(m).forEach(function(k){ G[k] = m[k]; });
      G.KICHBAN = m.KICHBAN || []; G.PHACDO = m.PHACDO || [];
      G.MOTHUC = m.MOTHUC || []; G.TEST750 = m.TEST750 || [];
    })
    .catch(function () {
      G.KHO.cheDoMau = true; G.KICHBAN = []; G.PHACDO = []; G.MOTHUC = []; G.TEST750 = [];
    });
}

/* ── Nạp kho cho phiên làm việc hiện tại ── */
G.napKho = function () {
  donKho();
  var ds = G.goiDuocCap();
  G.KICHBAN = []; G.TEST750 = [];
  return xinKhoa(ds)
    .then(function (khoa) {
      if (!khoa) return napMau();
      var co = ds.filter(function (t) { return khoa[t]; });
      /* Gói nền và gói nghề mở trước — có chúng là dùng được ngay.
         Gói theo tầng nặng hơn nhiều nên mở tiếp ở nền, xong gói nào
         thì màn hình đang mở tự dựng lại. Người dùng không phải chờ. */
      var truoc = co.filter(function (t) { return t === 'nen' || t === 'nghe'; });
      var sau   = co.filter(function (t) { return truoc.indexOf(t) < 0; });

      function mo(t) {
        return moGoi(t, khoa[t]).then(function (du) { gop(du); G.KHO.daNap.push(t); })
          .catch(function (e) { console.warn('[GITA] gói ' + t + ': ' + e.message); })
          .then(function () {
            var i = G.KHO.dangNap.indexOf(t);
            if (i >= 0) G.KHO.dangNap.splice(i, 1);
          });
      }

      G.KHO.dangNap = co.slice();
      return Promise.all(truoc.map(mo)).then(function () {
        if (!G.KHO.daNap.length && !sau.length) return napMau();
        G.KHO.cheDoMau = false;
        if (G.secLog) G.secLog('Mở kho', 'Đã mở ' + G.KHO.daNap.length + ' gói theo phạm vi cấp phép: ' +
          G.KHO.daNap.join(', '), 'Ghi nhận');
        /* Không chờ phần này — để nó chạy ở nền */
        sau.forEach(function (t) {
          mo(t).then(function () {
            if (G.render && G.S.acc && !G.coGoi(G.goiCanCho(G.S.view))) return;
            if (G.render && G.S.acc && G.goiCanCho(G.S.view) === t) G.render();
          });
        });
      });
    })
    .catch(function (e) {
      console.warn('[GITA] cấp phép: ' + e.message);
      return napMau();
    });
};

/* ── Màn hình khi nội dung chưa được cấp phép ── */
G.canCapPhep = function (goi) {
  var U = G.U, h = U.h;
  return U.ph({ eyebrow: 'NỘI DUNG CÓ BẢN QUYỀN', ic: 'lock', t: 'Phần này cần được cấp phép',
    lead: 'Kho chuyên môn của GITA 365 được mã hoá và chỉ mở cho tài khoản đã đăng nhập, trong đúng phạm vi vai và tầng được cấp.' }) +
    '<div class="card" style="border-color:rgba(245,185,66,.3)">' +
    '<div class="row mb"><span style="color:var(--gold)">' + U.ic('shield', 'w-4 h-4') + '</span>' +
    '<b>Vì sao anh chị đang thấy màn hình này</b></div>' +
    '<p class="sm dim" style="line-height:1.75">Ứng dụng đang chạy ở <b>chế độ mẫu</b>: chưa nối với máy chủ cấp phép, ' +
    'nên chỉ mở được phần giao diện và một ít nội dung minh hoạ. Gói cần cho màn hình này là <b class="mono">' + h(goi) + '</b>.</p>' +
    '<p class="sm muted mt">Nối máy chủ cấp phép rồi đăng nhập lại là mở đủ. Xem <b>docs/BAO_VE_TAI_SAN.md</b>.</p></div>' +
    '<div class="card mt2"><div class="up mb" style="color:var(--ink-4)">ĐANG CÓ TRONG PHIÊN NÀY</div>' +
    '<p class="sm dim">' + (G.KHO.daNap.length ? h(G.KHO.daNap.join(' · ')) : 'chưa mở gói nào — chế độ mẫu') + '</p></div>';
};
