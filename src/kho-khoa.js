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

G.KHO = { daNap: [], dangNap: [], cheDoMau: false, hanKhoa: null, lyDoTuChoi: '', maTuChoi: '' };

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
  'HOSO_VIP','CHUYENDOI','XUONG_SONG','NGUON_VAITRO','SACH_THAMKHAO','PHUONGPHAP','VANTAY','AICHAM','SOTAY_NHANDIEN','CAPDO_VANDUNG','VANDUNG','QUYTRINH_XL','RANG_BUOC',
  'TRU_GITA','HANHTRINH12','LOI_HUA_GITA','TN7','LOI5','REF_CHUAN','TRUYENTHONG3',
  'BANG_GAINS','BANG_REF','REF16','REF_GIAIDOAN','REF_LOI5','CHUOI10','BANDAP',
  'KHACHLON_NGUON','KHACH_TANG','NAM_TANG_PHUCVU','TAM_NAM_TANG','NAC_QUANHE',
  'NAC_TRUNGTHANH','TAM_MATXICH','HOSO68','MUOIHAI_NGUYENTAC','NHANTANG',
  'NAM_BUOC_KHIEUNAI','GIU124','VISAO_ROIDI','KHACHLON_CAU'
];
function donKho(){
  G.THUOC_CAP_PHEP.forEach(function(k){ try{ delete G[k]; }catch(e){ G[k] = undefined; } });
  G.KHO.daNap = []; G.KHO.dangNap = []; G.KHO.cheDoMau = false; G.KHO.hanKhoa = null;
  /* Bảng thứ hạng của trần 30% tính từ chính kho đang mở. Đổi vai là kho
     đổi, nên bảng cũ phải bỏ đi — không thì nhà mình được tính theo kho
     của vai trước. */
  if (G.quenBangHang) G.quenBangHang();
}
G.donKho = donKho;

/* ── Phạm vi cấp phép: vai nào, tầng nào, được mở gói nào ── */
G.goiDuocCap = function () {
  /* Đây chỉ là DANH SÁCH XIN. Quyết định cấp hay không là của máy chủ:
     máy chủ đọc hồ sơ tài khoản, biết vai và tầng thật, rồi chỉ trả khoá
     của những gói tài khoản đó được cấp phép. Client không tự phong quyền. */
  var r = G.S.roleObj, ds = ['nen'];
  if (!r) return ds;
  /* Bậc 12 chứ không phải 11. Ba bảng khác đều nói kho nghề mở tới R12
     (G.PERM.nghe_chung = 12, G.TANG_HIENTHI, và bảng tỉ lệ hiển thị), nhưng
     chỗ này từng dừng ở 11 — nên Chuyên viên phân tích thấy mục "Kho báu vật"
     và "Sách gốc" trong trình đơn mà bấm vào chỉ ra màn xin cấp phép. */
  if (r.lv <= 12) ds.push('nghe');
  if (r.lv <= 12 || r.portal === 'ph' || r.portal === 'hs')
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
      if (!d || !d.ok) {
        /* Máy chủ từ chối có lý do, và lý do ấy phải tới được người dùng.
           Rơi thẳng về chế độ mẫu mà không nói gì là cách chắc chắn nhất
           để một người ngồi hàng giờ tưởng ứng dụng hỏng. */
        G.KHO.lyDoTuChoi = (d && d.error) || 'Máy chủ chưa cấp khoá';
        G.KHO.maTuChoi   = (d && d.code) || '';
        if (d && d.code === 'MUSTCHANGE' && G.U && G.U.toast)
          setTimeout(function () {
            G.U.toast('Kho chưa mở vì tài khoản còn dùng mật khẩu tạm. ' +
              'Đổi mật khẩu rồi đăng nhập lại.', 'err');
            if (G.moDoiMatKhau) G.moDoiMatKhau();
          }, 400);
        throw new Error(G.KHO.lyDoTuChoi);
      }
      G.KHO.lyDoTuChoi = ''; G.KHO.maTuChoi = '';
      G.KHO.hanKhoa = d.hetHan || null;
      return d.khoa;
    });
}

/* ── Lấy một gói đã mã hoá ──
   Hai đường, tuỳ bản web nằm ở đâu:
     · bản tĩnh (GitHub Pages, tên miền, bản cài trên máy) → đọc tệp cạnh ứng dụng
     · bản do Apps Script phục vụ → xin qua máy chủ, nhận base64
   Gói nào cũng đã mã hoá sẵn, nên đường nào cũng không lộ gì. */
function layGoi(ten) {
  var nguon = window.GITA_NGUON_KHO;
  if (nguon)
    return fetch(nguon + encodeURIComponent(ten))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || !d.ok) throw new Error((d && d.error) || 'Máy chủ không trả gói ' + ten);
        return Uint8Array.from(atob(d.du), function (c) { return c.charCodeAt(0); });
      });

  return fetch('kho/' + ten + '.enc')
    .then(function (r) { if (!r.ok) throw new Error('Không tìm thấy gói ' + ten); return r.arrayBuffer(); })
    .then(function (buf) { return new Uint8Array(buf); });
}

/* ── Giải mã một gói ── */
function moGoi(ten, khoaB64) {
  return layGoi(ten)
    .then(function (b) {
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
  /* Bản do Apps Script phục vụ không có thư mục kho/ cạnh trang, nên dữ liệu
     mẫu cũng xin qua máy chủ như các gói khác. */
  var duong = window.GITA_NGUON_KHO ? (window.GITA_NGUON_KHO + 'mau') : 'kho/mau.json';
  return fetch(duong).then(function (r) { return r.json(); })
    .then(function (m) {
      G.KHO.cheDoMau = true;
      Object.keys(m).forEach(function(k){ G[k] = m[k]; });
      G.KICHBAN = m.KICHBAN || []; G.PHACDO = m.PHACDO || [];
      G.MOTHUC = m.MOTHUC || []; G.TEST750 = m.TEST750 || [];
      if (G.quenBangHang) G.quenBangHang();
    })
    .catch(function () {
      G.KHO.cheDoMau = true; G.KICHBAN = []; G.PHACDO = []; G.MOTHUC = []; G.TEST750 = [];
      if (G.quenBangHang) G.quenBangHang();
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
        return moGoi(t, khoa[t])
          .then(function (du) {
            gop(du); G.KHO.daNap.push(t);
            /* Kho vừa lớn thêm một gói — tính lại thứ hạng cho trần 30% */
            if (G.quenBangHang) G.quenBangHang();
          })
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

/* ── Màn hình khi nội dung chưa được cấp phép ──
   Không chỉ nói "bị khoá". Nói rõ ba điều khách hàng cần biết ngay:
   khoá cái gì, vì sao, và mở nó bằng cách nào — kèm những thứ đang
   dùng được ngay bây giờ để không ai bị bỏ lại ở một trang cụt. */
var TEN_GOI = {
  nen:  'Gói nền — mô hình, lộ trình, nhịp sống nhà mình',
  nghe: 'Gói nghề — kịch bản, phác đồ, mô thức, hệ VIP',
  tang1:'Gói tầng 1 — NHẬN DIỆN', tang2:'Gói tầng 2 — GIẢI MÃ',
  tang3:'Gói tầng 3 — KIẾN TẠO',  tang4:'Gói tầng 4 — CHUYỂN HOÁ',
  tang5:'Gói tầng 5 — BỨT PHÁ'
};

G.canCapPhep = function (goi) {
  var U = G.U, h = U.h;
  var mau = G.KHO && G.KHO.cheDoMau;
  var laTang = /^tang(\d)$/.test(String(goi));
  var soTang = laTang ? Number(String(goi).slice(4)) : 0;
  var tenGoi = TEN_GOI[goi] || goi;

  var o = U.ph({ eyebrow: 'PHẦN NÀY CHƯA MỞ', ic: 'lock', t: 'Chưa tới lượt màn hình này',
    lead: 'Không phải lỗi, và cũng không phải anh chị làm sai. Dưới đây là đúng ba điều: khoá phần nào, vì sao, và mở bằng cách nào.' });

  /* 1 · Khoá phần nào */
  o += '<div class="card" style="border-color:var(--gita-vien-1)">' +
    '<div class="row mb"><span style="color:var(--gold-ink)">' + U.ic('vault', 'w-4 h-4') + '</span>' +
    '<b>1 · Màn hình này nằm trong ' + h(tenGoi) + '</b></div>' +
    '<p class="sm" style="line-height:1.75;color:var(--ink-2)">Nội dung chuyên môn của GITA 365 được mã hoá và chia thành bảy gói. ' +
    'Mỗi tài khoản chỉ nhận khoá của những gói thuộc vai và tầng của mình — không thừa một gói nào.</p></div>';

  /* 2 · Vì sao */
  o += '<div class="card mt2">' +
    '<div class="row mb"><span style="color:var(--ink-3)">' + U.ic('shield', 'w-4 h-4') + '</span>' +
    '<b>2 · Vì sao đang khoá</b></div>' +
    (mau
      ? '<p class="sm" style="line-height:1.75;color:var(--ink-2)">Ứng dụng đang chạy <b>chế độ mẫu</b> — chưa nối với máy chủ cấp phép ' +
        'nên chưa có khoá của gói nào. Đây là trạng thái của bản dùng thử và bản cài chưa kích hoạt.</p>'
      : laTang
        ? '<p class="sm" style="line-height:1.75;color:var(--ink-2)">Nhà mình chưa vào <b>tầng ' + soTang + '</b>. ' +
          'Tầng mở dần theo hành trình, không mở hết một lượt — vì học tầng sau khi chưa xong tầng trước thì hỏng nhịp, ' +
          'không phải vì tiếc nội dung.</p>'
        : '<p class="sm" style="line-height:1.75;color:var(--ink-2)">Gói này thuộc phạm vi của đội ngũ dẫn dắt GITA 365. ' +
          'Vai hiện tại không được cấp — đó là cách giữ cho hồ sơ từng gia đình không rơi sang tay người không phụ trách.</p>') +
    '</div>';

  /* 3 · Mở bằng cách nào */
  o += '<div class="card mt2" style="border-color:rgba(16,185,129,.36)">' +
    '<div class="row mb"><span style="color:var(--ok)">' + U.ic('arrow', 'w-4 h-4') + '</span>' +
    '<b>3 · Mở bằng cách nào</b></div>' +
    (mau
      ? U.list([
          'Nối ứng dụng với máy chủ cấp phép của Học viện, rồi đăng nhập lại.',
          'Bản cài trên máy tính: nạp tệp giấy phép được cấp cho đúng máy đó.',
          'Chưa có tài khoản: đăng ký ở Cổng vào, xác nhận email, rồi hệ thống cấp mã số khách hàng.'
        ])
      : laTang
        ? U.list([
            'Hoàn thành KPI của tầng đang học — hệ thống đếm từ dữ liệu anh chị đã ghi.',
            'Xác nhận thanh toán thành công — kế toán đối chiếu sao kê rồi ghi nhận.',
            'Đủ cả hai thì hệ thống nâng tầng và mở gói này ở lần đăng nhập kế tiếp.'
          ])
        : U.list([
            'Phần này dành cho đội ngũ GITA 365. Nếu anh chị là người của đội ngũ, đề nghị Admin cấp đúng vị trí.',
            'Nếu là gia đình đang học, Coach phụ trách sẽ mang phần cần thiết vào buổi đồng hành.'
          ])) +
    '</div>';

  /* Đang dùng được gì — để không ai đứng ở trang cụt */
  o += '<div class="card mt2"><div class="up mb" style="color:var(--ink-4)">ĐANG DÙNG ĐƯỢC NGAY BÂY GIỜ</div>' +
    '<p class="sm dim" style="line-height:1.7">' +
    (G.KHO.daNap.length
      ? 'Gói đã mở: <b class="mono">' + h(G.KHO.daNap.join(' · ')) + '</b>.'
      : 'Bản mẫu công khai: mô hình năm khoang chín vai, lộ trình năm tầng, mười chân dung thành công, ' +
        'nhịp sống và nghi lễ gia đình, cú hích, cách ghi nhận và trao quà, sáu ranh giới an toàn, ' +
        'chương trình đại sứ, sự kiện, và một bài test rút gọn.') + '</p>' +
    '<div class="row mt" style="gap:9px;flex-wrap:wrap">' +
      (G.napDuocGiayPhep && G.napDuocGiayPhep()
        ? '<button class="btn pri sm" data-act="gp-mo">' + U.ic('vault','w-4 h-4') + 'Nạp giấy phép để mở kho</button>' : '') +
      '<button class="btn ghost sm" data-v="pham-vi">Xem đầy đủ phạm vi của tôi</button>' +
      '<button class="btn ghost sm" data-v="lo-trinh">Lộ trình năm tầng</button></div></div>';

  /* Người của Học viện thì nói thẳng đường mở, đừng để họ mắc ở đây */
  if (G.napDuocGiayPhep && G.napDuocGiayPhep())
    o += '<div class="card mt2" style="border-color:var(--gita-vien-1);background:var(--gita-mo-1)">' +
      '<div class="row mb"><span style="color:var(--gita-ink)">' + U.ic('shield', 'w-4 h-4') + '</span>' +
      '<b>Anh chị là người của Học viện — mở được ngay</b></div>' +
      '<p class="sm" style="line-height:1.75;color:var(--ink-2)">Bấm <b>Nạp giấy phép</b> ở trên và chọn tệp ' +
      '<span class="mono">giay-phep-….json</span> Học viện cấp cho máy này. Kho mở ngay trong phiên làm việc, ' +
      'đủ cả bảy gói nếu giấy phép cấp đủ — không cần chờ nối máy chủ.</p>' +
      '<p class="tiny muted mt">Chưa có tệp giấy phép: chạy <span class="mono">node tools/tao-giay-phep.js "Tên anh chị" 24</span> ' +
      'trên máy dựng, tệp ra ở thư mục <span class="mono">giay-phep/</span>.</p></div>';
  return o;
};

