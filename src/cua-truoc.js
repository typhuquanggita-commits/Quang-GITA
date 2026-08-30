/* ═══════════════════════════════════════════════════════════════
   GITA 365 — CỬA TRƯỚC: NGƯỜI LẠ NHÌN TRƯỚC KHI ĐĂNG KÝ

   Anh Quang kể một hành trình cụ thể: anh Hoàng tình cờ biết tới
   GITA365, tò mò vào xem, rồi mới đăng ký và làm bài test để nói ra
   chuyện nhà mình. Rồi anh hỏi: phần giao diện ấy đâu, phần năm bài
   test đâu.

   Đo lại thì ra hai chỗ hụt, cả hai đều thật:

   1. Màn đăng nhập không có cửa nào cho người CHƯA có tài khoản nhìn
      vào. Ba nút ở đó là "Bước vào bản đồ" (cuộn xuống ô mật khẩu),
      "Xem 15 tài khoản trải nghiệm" (bảng tài khoản nội bộ) và "Đăng
      ký". Không nút nào trả lời câu hỏi đầu tiên của một người lạ:
      chỗ này làm gì, và tôi có đúng chỗ không. Màn giới thiệu và màn
      đường vào sáu bước đều đã dựng xong — nhưng cả hai nằm SAU tường
      đăng nhập. Mời người ta bước qua cửa rồi khoá chính cái cửa ấy.

   2. Bản xem thử chỉ mở MỘT bài test trong khi cả lời hứa lẫn màn
      test đều nói năm bài. (Chỗ ấy sửa ở tools/ma-hoa-kho.js.)

   Tệp này dựng cửa số 1. Nó KHÔNG mở thêm dữ liệu nào: cả ba phần
   dưới đây đọc đúng kho/mau.json — gói công khai mà bất kỳ ai cũng
   tải được sẵn, và packer đã cố ý để mở với lý do ghi ngay trong đó
   ("khoá nó lại là khoá đúng cái cửa mình đang mời người ta bước
   qua"). Kho nghề, 1.000 kịch bản, 220 phác đồ, ma trận, học phí vẫn
   khoá nguyên trong bảy gói .enc.

   Một điều cố ý KHÔNG làm: người chưa đăng ký xem được HÌNH DẠNG năm
   bài test nhưng không làm được bài. Vì bài làm xong phải có chỗ ghi
   — mã gia đình — và mã đó chỉ có sau khi đăng ký. Cho làm bài rồi
   vứt kết quả đi là lấy 75 phút của một gia đình để đổi lấy không gì
   cả.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

(function () {
  var DA_NAP = false;      /* mau.json chỉ tải một lần cho mỗi phiên */
  var PHAN = 'gita';       /* gita · duong · test */

  function U() { return G.U; }
  function h(x) { return G.U.h(x); }
  function ic(a, b) { return G.U.ic(a, b); }

  /* ─── Tải gói công khai ───
     Cùng đường dẫn mà napMau() dùng, kể cả khi Apps Script phục vụ. */
  function napCongKhai() {
    if (DA_NAP) return Promise.resolve(true);
    var duong = window.GITA_NGUON_KHO ? (window.GITA_NGUON_KHO + 'mau') : 'kho/mau.json';
    return fetch(duong)
      .then(function (r) { return r.json(); })
      .then(function (m) {
        /* Chỉ nhận những kho của CỬA TRƯỚC. Gói mẫu có 50 kho; đổ hết
           vào G lúc chưa đăng nhập là để lại dữ liệu của phiên trước
           trong bộ nhớ khi người dùng bấm đăng nhập ngay sau đó, và
           donKho() lúc đăng nhập sẽ không biết chúng từ đâu ra. */
        var lay = ['DV_BUOC', 'DV_CHAN', 'DV_HOI', 'TEST750', 'HANHTRINH12', 'TRU_GITA'];
        Object.keys(m).forEach(function (k) {
          if (k.indexOf('GT_') === 0 || lay.indexOf(k) >= 0) G[k] = m[k];
        });
        DA_NAP = true;
        return true;
      })
      .catch(function () { return false; });
  }

  /* ─── Ba phần ─── */
  var PHANS = [
    { k: 'gita',  t: 'GITA 365 làm gì',      h: 'và sáu điều Học viện KHÔNG làm' },
    { k: 'duong', t: 'Đường vào sáu bước',   h: 'từ nghe giới thiệu tới bảy ngày đầu tiên' },
    { k: 'test',  t: 'Năm bài test đánh giá', h: 'nhìn trước hình dạng bài trước khi đăng ký' }
  ];

  /* Màn năm bài test cho người CHƯA đăng ký: nói đúng hình dạng bài,
     không mở nút làm bài. Không dùng lại G.VIEWS['bo-test'] vì màn ấy
     đọc G.S.test và mở nút làm bài — cả hai đều cần tài khoản. */
  function manTest() {
    var T = (G.TEST750 || []).slice();
    if (!T.length)
      return U().empty('Chưa tải được phần xem trước',
        'Phần này tải từ gói công khai kho/mau.json. Mở lại trang rồi bấm lại.');

    var t1 = T.filter(function (b) { return b.tang === 'T1'; });
    var ds = t1.length ? t1 : T;
    var cauThat = ds.reduce(function (a, b) { return a + (b.soCauThat || b.cau.length); }, 0);
    var mien = ds[0] && ds[0].mien ? ds[0].mien.length : 0;

    var o = U().sec('NĂM BÀI CỦA TẦNG MỘT',
      'Học viên làm ba bài, phụ huynh làm hai bài. Hai phía nhìn cùng một nhà từ hai chỗ đứng — ' +
      'chỗ hai phía trả lời lệch nhau chính là chỗ cần nói chuyện trước tiên.');

    o += '<div class="grid g4 mb">' +
      U().stat({ k: 'Bài', v: String(ds.length), d: 'A · B · C · D · E', c: '#185AB4' }) +
      U().stat({ k: 'Câu hỏi', v: String(cauThat), d: 'mỗi bài ba mươi câu', c: '#5140B4' }) +
      U().stat({ k: 'Miền đo', v: String(mien), d: 'mỗi bài đo sáu miền', c: '#0B6675' }) +
      U().stat({ k: 'Thời gian', v: String(ds.length * 15) + '′', d: 'chia được nhiều lần', c: '#0B7350' }) +
      '</div>';

    o += '<div class="grid g2 mb">' + ds.map(function (b) {
      var ai = b.ai === 'PH' ? 'Phụ huynh làm' : b.ai === 'HS' ? 'Học viên làm' : h(b.ai || '');
      return '<div class="card" style="border-color:var(--gita-vien-1)">' +
        '<div class="row wrap mb" style="gap:7px">' + U().chip('Bài ' + h(b.bo)) +
        U().chip(ai, b.ai === 'PH' ? '#B45309' : '#185AB4') +
        '<span class="tiny muted">' + (b.soCauThat || b.cau.length) + ' câu · ' + h(String(b.phut)) + ' phút</span></div>' +
        '<b class="sm" style="display:block;line-height:1.4;margin-bottom:6px">' + h(b.ten) + '</b>' +
        '<p class="tiny muted" style="line-height:1.6;margin-bottom:8px">' + h(b.muc || '') + '</p>' +
        '<div class="tiny" style="color:var(--ink-4);line-height:1.6">' + ic('map', 'w-3 h-3') + ' ' +
        (b.mien || []).map(function (m) { return h(m); }).join(' · ') + '</div></div>';
    }).join('') + '</div>';

    /* Bốn nhóm — lấy từ chính dữ liệu, không viết lại. */
    if (ds[0] && ds[0].nhom) {
      o += U().sec('BÀI CHẤM RA BỐN NHÓM',
        'Điểm quy về thang 100 rồi rơi vào một trong bốn nhóm. Không có nhóm nào là trượt.');
      o += '<div class="grid g4 mb">' + ds[0].nhom.map(function (n) {
        return '<div class="card pad-sm" style="border-color:' + n.color + '33">' +
          '<div class="row mb" style="gap:8px">' + U().dot(n.color) +
          '<b class="sm" style="color:' + n.color + '">' + h(n.label) + '</b></div>' +
          '<div class="tiny muted mb">' + n.min + '–' + n.max + ' điểm</div>' +
          '<p class="tiny dim" style="line-height:1.6">' + h(n.meaning) + '</p></div>';
      }).join('') + '</div>';
    }

    if (ds[0] && ds[0].gioiHan)
      o += '<div class="card mb" style="border-color:var(--gita-vien-1)">' +
        '<div class="row mb" style="gap:8px"><span style="color:var(--gold-ink)">' + ic('shield', 'w-4 h-4') + '</span>' +
        '<b>Ranh giới của bộ test</b></div>' +
        '<p class="sm dim" style="line-height:1.75">' + h(ds[0].gioiHan) + '</p></div>';

    o += '<div class="card" style="border-color:var(--alert);background:rgba(251,146,60,.06)">' +
      '<div class="row" style="gap:10px;align-items:flex-start">' +
      '<span style="color:var(--alert);flex:none">' + ic('lock', 'w-4 h-4') + '</span>' +
      '<div style="flex:1"><b class="sm">Xem được hình dạng bài, làm bài thì cần đăng ký trước</b>' +
      '<p class="tiny mt" style="line-height:1.7;color:var(--ink-2)">' +
      'Không phải để giữ bài. Là vì bài làm xong phải có chỗ ghi — mã gia đình dạng F-xxx — ' +
      'và mã đó chỉ có sau khi đăng ký. Cho làm trước rồi vứt kết quả đi là lấy ' +
      (ds.length * 15) + ' phút của cả nhà để đổi lấy không gì cả. ' +
      'Đăng ký mất năm phút, và kết quả ở lại trong hồ sơ nhà mình suốt năm tầng.</p></div></div></div>';
    return o;
  }

  function than() {
    if (PHAN === 'duong') return G.VIEWS && G.VIEWS['tham-gia'] ? G.VIEWS['tham-gia']() : '';
    if (PHAN === 'test') return manTest();
    return G.VIEWS && G.VIEWS['gioi-thieu'] ? G.VIEWS['gioi-thieu']() : '';
  }

  function khung() {
    var o = '<div class="gate-top"><div class="brand"><span class="mark">' + G.dauGita() + '</span>' +
      '<div><div class="nm">GITA 365</div><div class="sub">' + h(G.L('brandSub')) + '</div></div></div>' +
      '<span class="grow"></span>' +
      '<button class="btn ghost sm" data-act="ct-dong">' + ic('arrow') + 'Quay lại đăng nhập</button>' +
      '<button class="btn pri sm" data-act="mo-dang-ky">' + ic('plus') + 'Đăng ký</button></div>';

    o += '<div class="view" style="max-width:1080px;margin:0 auto;padding:22px 18px 60px">';

    o += '<div class="card mb" style="border-color:var(--gita-vien-1);background:var(--gita-mo-1)">' +
      '<p class="tiny" style="line-height:1.7;color:var(--ink-2)">' +
      '<b>Đây là phần mở cho người chưa có tài khoản.</b> Ba mục dưới đây là những gì Học viện vốn ' +
      'nói ra ngoài: làm gì, không làm gì, đường vào đi qua mấy bước, và bài đánh giá đo cái gì. ' +
      'Nội dung chuyên môn — kịch bản, phác đồ, ma trận, học phí — nằm sau đăng nhập và sau phạm vi ' +
      'được cấp phép của từng vai.</p></div>';

    o += '<div class="row wrap mb" style="gap:8px">' + PHANS.map(function (x) {
      return '<button class="btn ghost sm' + (x.k === PHAN ? ' on' : '') + '" data-ct="' + x.k + '">' +
        h(x.t) + '</button>';
    }).join('') + '</div>';

    o += '<p class="tiny muted mb">' + h((PHANS.filter(function (x) { return x.k === PHAN; })[0] || {}).h || '') + '</p>';

    o += than();

    o += '<div class="card mt2" style="border-color:var(--gita-vien-2);background:var(--gita-mo-1)">' +
      '<div class="row wrap" style="gap:14px;align-items:center">' +
      '<div class="grow" style="min-width:260px">' +
      '<b class="sm" style="display:block;margin-bottom:5px">Thấy đúng chỗ mình cần thì bước tiếp</b>' +
      '<p class="tiny" style="line-height:1.7;color:var(--ink-2)">' +
      'Đăng ký mất năm phút và không mất phí. Xong là nhà mình có mã riêng, có hồ sơ trống chờ số liệu, ' +
      'và mở được năm bài đánh giá của tầng một.</p></div>' +
      '<button class="btn pri" data-act="mo-dang-ky">' + ic('plus') + 'Đăng ký tài khoản</button>' +
      '<button class="btn ghost" data-act="ct-dong">Đã có tài khoản</button></div></div>';

    o += '</div>';
    return o;
  }

  function ve() {
    var app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = '<div id="gate">' + khung() + '</div>';
    try { window.scrollTo(0, 0); } catch (e) {}
  }

  /* ─── Cửa vào ─── */
  G.moCuaTruoc = function (phan) {
    if (phan) PHAN = phan;
    var app = document.getElementById('app');
    if (app) app.innerHTML = '<div id="gate"><div class="gate-body center" style="padding:80px 20px">' +
      '<p class="sm muted">Đang mở phần xem trước…</p></div></div>';
    napCongKhai().then(function (ok) {
      if (!ok) {
        if (G.U && G.U.toast) G.U.toast('Chưa tải được phần xem trước. Kiểm lại đường mạng rồi bấm lại.', 'err');
        return G.dongCuaTruoc();
      }
      ve();
    });
  };

  G.dongCuaTruoc = function () {
    PHAN = 'gita';
    if (G.veCong) G.veCong();
  };

  G.doiPhanCuaTruoc = function (k) {
    if (!PHANS.filter(function (x) { return x.k === k; }).length) return;
    PHAN = k; ve();
  };
})();
