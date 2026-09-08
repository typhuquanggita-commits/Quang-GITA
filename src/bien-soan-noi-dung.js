/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÀN BIÊN SOẠN NỘI DUNG

   Chỗ người viết ngồi làm việc, và chỗ chủ hệ ĐỌC KIỂM TRA.

   ══ MÀN NÀY KHÔNG VIẾT HỘ, VÀ NÓI THẲNG RA NGAY DÒNG ĐẦU ══

   Nó dựng khuôn, ĐO, và giữ cổng. Người mở ra mà tưởng máy sắp viết hộ
   một bài học thì họ thất vọng ở giây thứ ba — cùng lý do màn Kiến trúc
   sư Thị giác nói trước rằng nó không vẽ ảnh.

   ══ NĂM NGĂN, VÀ THỨ TỰ LÀ MỘT QUYẾT ĐỊNH ══

     soạn     — khuôn hai mươi bốn khối, máy đo NGAY khi gõ
     thang    — bài này đang ở cổng nào, ai đã ký, chữ ký nào còn hiệu lực
     kho bài  — mọi bài, và bài nào đang treo quá hạn ở một cổng
     hiến pháp— tra cứu: khối, thang điểm, luật cấm, bảng thay lời
     quyền ký — ai ký được cổng nào (chỉ R01–R02 mở được ngăn này)

   SOẠN đứng đầu vì đó là việc hằng ngày. HIẾN PHÁP không đứng đầu dù nó
   là bộ não: người ta mở tra cứu khi có một câu hỏi cụ thể.

   ══ PHÉP ĐO Ở MÀN HÌNH KHÔNG PHẢI LÀ CỔNG ══

   Máy chủ mới là chỗ chặn. Phép đo chạy ở đây chỉ để người viết thấy
   NGAY chỗ thiếu thay vì phải nộp lên rồi chờ — và nó đọc thẳng
   G.KN_KHOI, G.KN_RONG, G.KN_LOI_THAY trong kho, tức là đọc BẢN GỐC,
   không đọc một bản chép thứ ba.

   Đó là chỗ khác nhau giữa hai bản chép trong hệ này: máy chủ buộc phải
   giữ bản chép vì nó không đọc được kho đã mã hoá, và bộ kiểm mục 77
   đối chiếu bản chép ấy từng ô. Màn hình thì đọc được kho, nên nó không
   được phép có bản chép nào.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  var U = G.U, h = U.h, ic = U.ic;

  var NGAN = [
    {ma: 'soan',     ten: 'Soạn',      ic: 'plus'},
    {ma: 'thang',    ten: 'Thang',     ic: 'shield'},
    {ma: 'kho',      ten: 'Kho bài',   ic: 'vault'},
    {ma: 'hienphap', ten: 'Hiến pháp', ic: 'book'},
    {ma: 'quyen',    ten: 'Quyền ký',  ic: 'lock'}
  ];

  G.bsNgan = G.bsNgan || 'soan';
  G.bsD = G.bsD || {chu: '', tieuDe: '', tang: 'T1', id: ''};

  /* Màu của từng bậc — lấy từ biến CSS, không gõ mã màu. Biến CSS đã
     tính sẵn cả nền sáng lẫn nền tối; một mã hex thì đúng ở một nền và
     chìm ở nền kia, và người dùng nền tối không báo lỗi ấy bao giờ. */
  var MAU_BAC = {
    nhap: 'var(--ink-3)', may: 'var(--teal)', bienTap: 'var(--warn)',
    chuyenMon: 'var(--warn)', giuChuan: 'var(--warn)', chuHe: 'var(--gita)',
    phatHanh: 'var(--ok)', tuChoi: 'var(--bad)'
  };

  function vai() { return ((G.S && G.S.acc && G.S.acc.role) || ''); }
  function laChuHe() { return vai() === 'R01'; }
  function capQuyenDuoc() { return vai() === 'R01' || vai() === 'R02'; }
  function tenBac(ma) {
    var t = (G.KN_TRANGTHAI || []).filter(function (x) { return x.ma === ma; })[0];
    return t ? t.ten : ma;
  }
  function veLai() {
    if (!G.S || G.S.view !== 'bien-soan-noi-dung') return;
    if (typeof document === 'undefined' || !document.getElementById('main')) return;
    G.render && G.render();
  }
  function oGiaTri(id) {
    var el = typeof document !== 'undefined' && document.getElementById(id);
    return el ? String(el.value || '') : '';
  }

  function thanhNgan() {
    return '<div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:18px">' +
      NGAN.filter(function (n) { return n.ma !== 'quyen' || capQuyenDuoc(); })
        .map(function (n) {
          var on = G.bsNgan === n.ma;
          return '<button class="btn' + (on ? ' primary' : '') + '" ' +
            'onclick="G.bsMoNgan(\'' + n.ma + '\')" style="gap:7px">' +
            ic(n.ic) + h(n.ten) + '</button>';
        }).join('') + '</div>';
  }
  G.bsMoNgan = function (ma) { G.bsNgan = ma; veLai(); };

  /* ═══════════ PHÉP ĐO CHẠY Ở MÁY KHÁCH ═══════════

     Đọc thẳng bản gốc trong kho. Cùng ba phép đo mà máy chủ chạy — dò
     theo TỪ chứ không theo chuỗi con, vì bỏ dấu xong thì "hư" thành
     "hu", và "hu" nằm trong "chưa", "chuẩn", "thứ". Bản đầu của bộ dò ở
     máy chủ mắc đúng lỗi ấy và báo mười ba câu dán nhãn trên một bài
     sạch; chép lại lỗi ấy sang đây là chép cả lỗi. */
  function boDau(s) {
    return String(s || '').toLowerCase().normalize('NFD')
      .replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
  }
  function reTu(cum) {
    var goc = boDau(cum).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
    try {
      return new RegExp('(?<![\\p{L}\\p{N}])' + goc + '(?![\\p{L}\\p{N}])', 'u');
    } catch (e) {
      /* Trình duyệt cũ không có lookbehind. Lùi về ranh giới thô còn hơn
         tắt hẳn phép đo — nhưng KHÔNG im lặng lùi về chuỗi con, vì chuỗi
         con báo sai và báo sai thì người ta thôi đọc cả danh sách. */
      return new RegExp('(^|[^\\wÀ-ỹ])' + goc + '([^\\wÀ-ỹ]|$)', 'i');
    }
  }
  function doBang(chu, bang, lay) {
    var dong = String(chu || '').split('\n'), bat = [];
    dong.forEach(function (d, i) {
      var t = boDau(d);
      bang.forEach(function (hang) {
        var c = lay(hang);
        if (!reTu(c.cau).test(t)) return;
        bat.push({dong: i + 1, bat: c.cau, thay: c.thay, vi: c.vi});
      });
    });
    return bat;
  }

  var RE_MO = /^[ \t]*(K\d{2})[ \t]*\|(.*)$/;

  function docKhoi(chu) {
    var maKhoi = (G.KN_KHOI || []).map(function (k) { return k.ma; });
    var dong = String(chu || '').split('\n');
    var thoi = {}, dang = null, gom = [];
    function chot() {
      if (dang) { thoi[dang] = gom.join('\n').trim(); }
      dang = null; gom = [];
    }
    dong.forEach(function (d) {
      var m = d.match(RE_MO);
      if (!m) { if (dang) gom.push(d); return; }
      chot();
      if (maKhoi.indexOf(m[1]) < 0) return;
      dang = m[1]; gom = [];
    });
    chot();
    var co = {}, trong = [];
    maKhoi.forEach(function (ma) {
      if (!Object.prototype.hasOwnProperty.call(thoi, ma)) return;
      if (thoi[ma].length >= 8) co[ma] = thoi[ma]; else trong.push(ma);
    });
    return {khoi: co, thieu: maKhoi.filter(function (m) { return !co[m]; }), trong: trong};
  }

  function soatDoi(co) {
    var pham = [];
    (G.KN_KHOI || []).forEach(function (k) {
      if (!k.doi || !co[k.ma]) return;
      k.doi.forEach(function (can) {
        if (co[can]) return;
        var t = (G.KN_KHOI || []).filter(function (x) { return x.ma === can; })[0];
        pham.push({khoi: k.ma, ten: k.ten, can: can, tenCan: t ? t.ten : can});
      });
    });
    return pham;
  }

  /** Toàn bộ phép đo của một bài, chạy tại chỗ. */
  G.bsSoat = function (chu) {
    var doc = docKhoi(chu);
    var rong = doBang(chu, G.KN_RONG || [], function (r) {
      return {cau: r.cau, thay: r.thay};
    });
    var loi = doBang(chu, G.KN_LOI_THAY || [], function (l) {
      return {cau: l.dung, thay: l.thay, vi: l.vi};
    });
    var nhan = (G.KN_NGUON || []).filter(function (n) {
      return String(chu || '').indexOf(n.nhan) >= 0;
    });
    var xong = [];
    (G.KN_XONG || []).forEach(function (x) {
      var can = (G.KN_KHOI || []).filter(function (k) {
        return (k.xong || []).indexOf(x.ma) >= 0;
      }).map(function (k) { return k.ma; });
      var thieu = can.filter(function (m) { return !doc.khoi[m]; });
      xong.push({ma: x.ma, dieu: x.dieu, dat: thieu.length === 0, thieu: thieu});
    });
    return {doc: doc, doi: soatDoi(doc.khoi), rong: rong, loi: loi,
      nhan: nhan, xong: xong,
      /* Đúng hai điều kiện máy chủ dùng để CHẶN ở cổng 1. Khai lại ở đây
         thì người viết biết trước mình sẽ bị chặn hay không, thay vì nộp
         lên rồi mới biết. */
      quaCong1: doc.thieu.length === 0 && soatDoi(doc.khoi).length === 0 &&
                loi.length === 0};
  };

  /* ═══════════ NGĂN 1 · SOẠN ═══════════ */
  function nganSoan() {
    var d = G.bsD;
    var s = G.bsSoat(d.chu);
    var soKhoi = (G.KN_KHOI || []).length;
    var duKhoi = soKhoi - s.doc.thieu.length;

    var o = '<div class="card"><b>Máy dựng khuôn và ĐO. Nó không viết hộ.</b>' +
      '<p class="sm muted mt">Hai mươi bốn khối là khuôn của một bài học GITA. ' +
      'Máy đếm được khối nào có, khối nào đòi khối nào mà không có, dòng nào ' +
      'rỗng, dòng nào phán xét — và nó chỉ ra ĐÚNG SỐ DÒNG. Nội dung chuyên môn ' +
      'là việc của người viết: máy không tự nghĩ ra một câu nào (luật gốc ' +
      '<i>không suy diễn</i>).</p>' +
      '<p class="sm muted mt">Phép đo ở màn này chạy tại chỗ để anh thấy ngay, ' +
      'nhưng nó KHÔNG phải cổng — máy chủ mới là chỗ chặn. Nó đọc thẳng bản gốc ' +
      'trong kho, không đọc một bản chép.</p></div>';

    /* ── Ô nhập ── */
    o += U.sec('Bài đang soạn');
    o += '<div class="card">' +
      '<div class="row" style="gap:10px;flex-wrap:wrap">' +
      '<input id="bsTieuDe" class="inp grow" placeholder="Tiêu đề bài" ' +
        'value="' + h(d.tieuDe) + '" oninput="G.bsGhi()">' +
      '<select id="bsTang" class="inp" style="max-width:120px" onchange="G.bsGhi()">' +
      ['T1', 'T2', 'T3', 'T4', 'T5'].map(function (t) {
        return '<option value="' + t + '"' + (d.tang === t ? ' selected' : '') + '>' + t + '</option>';
      }).join('') + '</select>' +
      '<button class="btn" onclick="G.bsMau()" style="gap:6px">' + ic('plus') + 'Chèn khuôn trống</button>' +
      '<button class="btn" onclick="G.bsViDu()" style="gap:6px">' + ic('book') + 'Chèn bài mẫu</button>' +
      '</div>' +
      '<textarea id="bsChu" class="inp mt" rows="16" spellcheck="false" ' +
        'style="font-family:ui-monospace,monospace;font-size:13px;line-height:1.6" ' +
        'placeholder="Mỗi khối mở bằng một dòng dạng  K01 |  rồi viết ở các dòng dưới." ' +
        'oninput="G.bsGhi()">' + h(d.chu) + '</textarea>' +
      '</div>';

    /* ── Kết quả đo ── */
    o += U.sec('Máy đo được gì', duKhoi + '/' + soKhoi + ' khối · ' +
      s.rong.length + ' câu rỗng · ' + s.loi.length + ' câu phán xét');

    o += '<div class="grid3">' +
      the('Khối', duKhoi + '/' + soKhoi,
        s.doc.thieu.length ? 'thiếu ' + s.doc.thieu.join(', ') : 'đủ',
        s.doc.thieu.length ? 'var(--bad)' : 'var(--ok)') +
      the('Câu phán xét', String(s.loi.length),
        s.loi.length ? 'chặn ở cổng 1' : 'sạch',
        s.loi.length ? 'var(--bad)' : 'var(--ok)') +
      the('Cổng 1', s.quaCong1 ? 'QUA' : 'CHẶN',
        s.quaCong1 ? 'nộp được' : 'sửa rồi nộp',
        s.quaCong1 ? 'var(--ok)' : 'var(--bad)') +
      '</div>';

    if (s.doc.trong.length)
      o += canhBao('Dấu mở khối có mà ruột để trống: ' + s.doc.trong.join(', ') +
        '. Máy đếm CHỮ chứ không đếm dấu mở — gõ đủ hai mươi bốn dấu mà bỏ ' +
        'trống ruột thì vẫn tính là thiếu.', 'var(--warn)');

    if (s.doi.length)
      o += canhBao('Khối đòi khối: ' + s.doi.map(function (p) {
        return p.khoi + ' ' + p.ten + ' → thiếu ' + p.can + ' ' + p.tenCan;
      }).join(' · ') + '. Đây là chỗ chín trong mười luật chống nội dung rỗng ' +
        'thành phép đo: "bài tập không có sản phẩm" là câu ai cũng gật, còn ' +
        'K14 đòi K15 thì máy chỉ ra được.', 'var(--bad)');

    if (s.loi.length) {
      o += U.sec('Câu phán xét — cổng 1 chặn', 'Mỗi dòng kèm câu NÓI THAY và vì sao');
      o += U.tbl(['Dòng', 'Bắt được', 'Nói thay', 'Vì sao'], s.loi.map(function (l) {
        return ['<b>' + l.dong + '</b>', h(l.bat),
          '<span style="color:var(--ok)">' + h(l.thay || '') + '</span>',
          '<span class="sm muted">' + h(l.vi || '') + '</span>'];
      }));
    }
    if (s.rong.length) {
      o += U.sec('Câu rỗng', 'Không sai — chỉ không mang thông tin nào');
      o += U.tbl(['Dòng', 'Bắt được', 'Đáng lẽ nằm ở đó'], s.rong.map(function (r) {
        return ['<b>' + r.dong + '</b>', h(r.bat),
          '<span class="sm">' + h(r.thay || '') + '</span>'];
      }));
    }
    if (!s.nhan.length && String(d.chu || '').trim().length > 40)
      o += canhBao('Không dòng nào mang nhãn nguồn. Bốn nhãn: ' +
        (G.KN_NGUON || []).map(function (n) { return n.nhan; }).join(' · ') +
        '. Đây là phép đo YẾU — nó đếm bài có nhãn nào không, chứ không biết ' +
        'câu nào đáng lẽ phải có nhãn.', 'var(--warn)');

    /* ── Mười điều kiện hoàn thành ── */
    o += U.sec('Mười điều kiện hoàn thành',
      'Thang đo NGƯỜI HỌC — tính riêng, không cộng vào điểm');
    o += '<div class="card">' + s.xong.map(function (x) {
      return '<div class="row" style="gap:9px;padding:5px 0;align-items:flex-start">' +
        '<span style="color:' + (x.dat ? 'var(--ok)' : 'var(--ink-4)') + ';flex:none">' +
        ic(x.dat ? 'check' : 'dot', 'w-4 h-4') + '</span>' +
        '<span style="font-size:14px' + (x.dat ? '' : ';color:var(--ink-3)') + '">' +
        '<b>' + h(x.ma) + '</b> · ' + h(x.dieu) +
        (x.dat ? '' : ' <span class="sm muted">— thiếu ' + h(x.thieu.join(', ')) + '</span>') +
        '</span></div>';
    }).join('') + '</div>';

    /* ── Chấm: máy 60, người 40 ── */
    o += U.sec('Thang một trăm', 'Máy chấm sáu chiều. Bốn chiều còn lại máy KHÔNG đoán.');
    o += '<div class="card"><p class="sm muted">Máy chấm được <b>60/100</b>. Bốn ' +
      'chiều — chiều sâu, cá nhân hoá, dùng lại được, và phần có giá trị của chìa ' +
      'khoá kim cương — không có dữ liệu nào để đo, nên máy BỎ TRỐNG chứ không ' +
      'đoán, và nó không cộng ra tổng khi còn ô trống. Cộng ra một con số trong ' +
      'lúc bốn ô còn trống là dựng một con số trông như đã xong.</p>' +
      U.tbl(['Chiều', 'Ai chấm', 'Trần máy', 'Câu hỏi'],
        (G.KN_DIEM || []).map(function (q) {
          var mau = q.ai === 'may' ? 'var(--ok)' : q.ai === 'ca' ? 'var(--warn)' : 'var(--ink-3)';
          var tenAi = q.ai === 'may' ? 'máy' : q.ai === 'ca' ? 'máy + người' : 'người';
          return ['<b>' + h(q.ma) + '</b> ' + h(q.ten),
            '<span style="color:' + mau + '">' + h(tenAi) + '</span>',
            String(q.ai === 'may' ? q.trong : (q.tranMay || 0)) + '/' + q.trong,
            '<span class="sm muted">' + h(q.hoi || '') + '</span>'];
        })) + '</div>';

    /* ── Nộp ── */
    o += U.sec('Nộp vào thang năm cổng');
    o += '<div class="card">' +
      (G.API_CAP_PHEP
        ? '<div class="row" style="gap:10px;flex-wrap:wrap">' +
          '<button class="btn primary" onclick="G.bsNap()" style="gap:6px">' +
            ic('check') + 'Lưu bản nháp lên máy chủ</button>' +
          '<button class="btn" onclick="G.bsNop()" style="gap:6px"' +
            (s.quaCong1 ? '' : ' disabled title="Máy đang chặn — sửa rồi nộp"') + '>' +
            ic('arrow') + 'Nộp qua cổng 1</button>' +
          (d.id ? '<span class="chip">mã bài ' + h(d.id) + '</span>' : '') +
          '</div>' +
          '<p class="sm muted mt">Nạp và nộp là hai việc khác nhau. Gộp chúng thì ' +
          'không ai sửa được bản nháp của mình. Và sửa nội dung sau khi đã có chữ ' +
          'ký thì MỌI chữ ký cũ hết hiệu lực, bài về bản nháp — luật L4.</p>'
        : '<p class="sm muted">Chưa nối máy chủ, nên chưa nộp được. Phép đo ở trên ' +
          'vẫn chạy đủ: nó chạy trong máy này và đọc thẳng kho.<br>' +
          'Nối ở <b>Quản trị trang → Nối máy chủ</b>.</p>') +
      '</div>';
    return o;
  }

  function the(ten, so, phu, mau) {
    return '<div class="card"><div class="sm muted">' + h(ten) + '</div>' +
      '<div style="font-size:26px;font-weight:700;color:' + mau + ';margin-top:4px">' +
      h(so) + '</div><div class="sm muted">' + h(phu) + '</div></div>';
  }
  function canhBao(chu, mau) {
    return '<div class="card mt" style="border-color:' + mau + '40">' +
      '<div class="row" style="gap:9px;align-items:flex-start">' +
      '<span style="color:' + mau + ';flex:none">' + ic('shield', 'w-4 h-4') + '</span>' +
      '<span style="font-size:14px;line-height:1.55">' + h(chu) + '</span></div></div>';
  }

  /* ── Ghi ô nhập vào bộ nhớ tạm, không gọi render (gõ mà vẽ lại thì
       mất chỗ con trỏ). Chỉ vẽ lại khi người dùng ngừng gõ. ── */
  var hen = null;
  G.bsGhi = function () {
    G.bsD.chu = oGiaTri('bsChu');
    G.bsD.tieuDe = oGiaTri('bsTieuDe');
    G.bsD.tang = oGiaTri('bsTang') || 'T1';
    if (hen) clearTimeout(hen);
    hen = setTimeout(function () {
      /* Giữ chỗ con trỏ qua lượt vẽ lại: không giữ thì gõ tới chữ thứ
         hai mươi là con trỏ nhảy về đầu ô, và không ai gõ tiếp được. */
      var el = document.getElementById('bsChu');
      var vt = el ? el.selectionStart : null;
      veLai();
      var el2 = document.getElementById('bsChu');
      if (el2 && vt !== null) { el2.focus(); el2.setSelectionRange(vt, vt); }
    }, 450);
  };

  G.bsMau = function () {
    G.bsD.chu = (G.KN_KHOI || []).map(function (k) {
      return k.ma + ' | ' + k.ten + '\n' + (k.hoi ? '' : '') + '\n';
    }).join('');
    veLai();
  };

  /* Bài mẫu ĐỦ hai mươi bốn khối. Nó ở đây chứ không ở trong kho vì nó
     là một VÍ DỤ VỀ KHUÔN, không phải nội dung của Học viện — nội dung
     đã duyệt nằm trong kho và đi qua thang năm cổng. */
  G.bsViDu = function () {
    G.bsD.tieuDe = 'Bảy ngày nhìn cho đúng';
    G.bsD.tang = 'T1';
    G.bsD.chu = [
      'K01 | Tên bài', 'Bảy ngày nhìn cho đúng — chưa sửa gì cả.',
      'K02 | Chìa khoá kim cương',
      'Đừng đo việc học bằng số giờ ngồi bàn. Đo bằng thứ tạo ra được.',
      'K03 | Mục tiêu', 'Ghi được ba dòng mỗi tối, đủ năm trong bảy tối.',
      'K04 | Vì sao quan trọng', 'Không ghi thì tuần sau cả nhà cãi nhau bằng trí nhớ.',
      'K05 | Vấn đề thật', 'Tối nào cũng nhắc học. Nhắc xong vẫn thế.',
      'K06 | Insight', '[KHO GITA] Nhắc nhiều làm việc học thành việc của bố mẹ.',
      'K07 | Bản chất', 'Người nhắc đang giữ trách nhiệm thay người học.',
      'K08 | Khung tư duy', 'Bốn trụ G–I–T–A, đọc theo thứ tự, không nhảy cóc.',
      'K09 | Ví dụ', 'Nhà A: 19h30 mở sách, 19h45 cầm điện thoại. Bảy tối như một.',
      'K10 | Ca thật', 'Nhà B chạy bảy tối. Tối thứ tư quên, và vẫn ghi là quên.',
      'K11 | Sai lầm thường gặp', 'Ghi kèm nhận xét. Ghi kèm nhận xét là đang chấm.',
      'K12 | Công cụ', 'Bảng ba dòng: giờ bắt đầu, việc, chỗ dừng.',
      'K13 | Hướng dẫn dùng', 'Điền sau bữa tối, mất chừng hai phút.',
      'K14 | Bài tập', 'Ghi đủ bảy tối, không bỏ tối nào.',
      'K15 | Sản phẩm đầu ra', 'Một bảng bảy dòng, có chữ của chính học viên.',
      'K16 | KPI', 'Mốc nền: 0 tối. Đích: 5 trên 7 tối có đủ ba dòng.',
      'K17 | Bảng theo dõi', 'Treo ở chỗ cả nhà đi qua mỗi ngày.',
      'K18 | Phản tư', 'Tối nào dễ ghi nhất? Vì sao tối ấy dễ hơn sáu tối kia?',
      'K19 | Câu hỏi coach', 'Điều gì làm tối thứ tư khác sáu tối còn lại?',
      'K20 | Việc 24 giờ', 'Tối nay ghi 3 dòng, không thêm một nhận xét nào.',
      'K21 | Việc 7 ngày', 'Lặp 7 tối liền. Ghi cả tối quên.',
      'K22 | Tiêu chí đạt chuẩn', 'Đủ 5 trên 7 tối, và không dòng nào có nhận xét.',
      'K23 | Điều đọng lại', 'Nhìn trước, sửa sau. Ghi cả cái quên.',
      'K24 | Thử thách', 'Tuần tới học viên tự ghi, người lớn không nhắc một lần nào.'
    ].join('\n');
    veLai();
  };

  /* ═══════════ CỬA MÁY CHỦ ═══════════ */
  function goi(fn, than) {
    if (!G.goiMayChu)
      return Promise.resolve({ok: false, error: 'Chưa nối máy chủ.'});
    return G.goiMayChu(fn, than || {});
  }
  function bao(d, cauXong) {
    if (d && d.ok) { U.toast(cauXong || 'Xong.', 'ok'); return true; }
    U.toast((d && (d.vi || d.error)) || 'Không gọi được máy chủ.', 'err');
    return false;
  }

  G.bsNap = function () {
    var d = G.bsD;
    goi('napBai', {id: d.id || undefined, tieuDe: d.tieuDe, chu: d.chu, tang: d.tang})
      .then(function (r) {
        if (r && r.ok) { G.bsD.id = r.id; G.bsD.thang = null; }
        bao(r, 'Đã lưu bản nháp · ' + ((r && r.id) || ''));
        /* U.toast chỉ có hai kiểu: 'ok' và 'err'. Truyền 'warn' thì nó rơi
           vào nhánh mặc định và vẽ dấu TÍCH lên một câu cảnh báo — người đọc
           thấy dấu tích trước khi đọc chữ, và họ đọc ra là "xong rồi". */
        if (r && r.vi) U.toast(r.vi, 'err');
        veLai();
      });
  };
  G.bsNop = function () {
    if (!G.bsD.id) { U.toast('Lưu bản nháp trước đã.', 'err'); return; }
    goi('nopBai', {id: G.bsD.id}).then(function (r) {
      if (r && r.ok) { G.bsNgan = 'thang'; G.bsD.thang = null; }
      bao(r, 'Qua cổng 1. Còn bốn cổng người.');
      veLai();
    });
  };
  G.bsKy = function (viec) {
    if (!G.bsD.id) return;
    var lyDo = '';
    if (viec === 'tuChoi') {
      lyDo = String(window.prompt('Từ chối thì phải nói vì sao (ít nhất 10 chữ):') || '');
      if (lyDo.trim().length < 10) {
        U.toast('Chưa đủ lý do. Không nói thì người viết sửa mò rồi nộp lại y hệt.', 'err');
        return;
      }
    }
    goi('kyBai', {id: G.bsD.id, viec: viec, lyDo: lyDo}).then(function (r) {
      G.bsD.thang = null;
      bao(r, (r && r.vi) || 'Đã ghi.');
      veLai();
    });
  };
  G.bsXemThang = function (id) {
    G.bsD.id = id; G.bsD.thang = null; G.bsNgan = 'thang'; veLai();
  };

  /* ═══════════ NGĂN 2 · THANG NĂM CỔNG ═══════════ */
  function nganThang() {
    var d = G.bsD;
    var o = '<div class="card"><b>Năm cổng, và không cổng nào bỏ qua được</b>' +
      '<p class="sm muted mt">Máy chặn ở cổng 1 bằng SỐ. Bốn cổng còn lại là người ' +
      'ký, và <b>một người ký nhiều nhất MỘT cổng</b> trên một bài — nếu không thì ' +
      'một người ký được cả bốn, thang năm cổng thành một chữ ký, mà sổ vẫn đủ năm ' +
      'dòng nên không ai đọc ra.</p></div>';

    o += U.sec('Năm cổng');
    o += U.tbl(['Cổng', 'Ai ký', 'Kiểm cái gì', 'Chặn ở đâu'],
      (G.KN_CONG || []).map(function (c) {
        return ['<b>' + h(c.ma) + '</b> ' + h(c.ten),
          '<span class="chip">' + h(c.ai) + '</span>',
          '<span class="sm">' + h(c.kiem) + '</span>',
          '<span class="sm muted">' + h(c.chan) + '</span>'];
      }));

    o += U.sec('Năm luật cứng');
    o += '<div class="card">' + (G.KN_LUAT_THANG || []).map(function (l) {
      return '<div style="padding:7px 0;border-bottom:1px solid var(--line)">' +
        '<b>' + h(l.ma) + '</b> — ' + h(l.luat) +
        '<div class="sm muted" style="margin-top:3px">' + h(l.vi || '') + '</div></div>';
    }).join('') + '</div>';

    if (!d.id)
      return o + canhBao('Chưa chọn bài nào. Mở ngăn KHO BÀI rồi bấm một bài, ' +
        'hoặc lưu bản nháp ở ngăn SOẠN.', 'var(--ink-3)');

    if (!d.thang) {
      if (G.API_CAP_PHEP && !d.dangNapThang) {
        d.dangNapThang = true;
        goi('soKyBai', {id: d.id}).then(function (r) {
          G.bsD.thang = r; G.bsD.dangNapThang = false; veLai();
        });
      }
      return o + '<div class="card mt"><p class="sm muted">' +
        (G.API_CAP_PHEP ? 'Đang đọc sổ ký của bài ' + h(d.id) + '…'
          : 'Chưa nối máy chủ nên không đọc được sổ ký. Bảng năm cổng và năm ' +
            'luật ở trên đọc từ kho, nên vẫn xem được.') + '</p></div>';
    }
    var t = d.thang;
    if (!t.ok) return o + canhBao((t.vi || t.error || 'Không đọc được sổ ký.'), 'var(--bad)');

    o += U.sec('Bài ' + t.id, t.tieuDe);
    o += '<div class="grid3">' +
      the('Đang ở', tenBac(t.trangThai), 'cổng hiện tại', MAU_BAC[t.trangThai] || 'var(--ink-3)') +
      the('Đã ký', String((t.nguoiDaKy || []).length), 'chữ ký còn hiệu lực', 'var(--ok)') +
      the('Vân tay', String(t.vanTay || '').slice(0, 8), 'bản đang nằm trong sổ', 'var(--ink-2)') +
      '</div>';

    if (t.canhBao) o += canhBao(t.canhBao, 'var(--bad)');

    o += U.sec('Sổ ký', 'Chỉ thêm — không sửa, không xoá một dòng nào');
    o += U.tbl(['Cổng', 'Việc', 'Ai', 'Vai lúc ký', 'Ghi chú', 'Còn hiệu lực'],
      (t.so || []).map(function (k) {
        return ['<b>' + h(k.cong) + '</b>',
          '<span style="color:' + (k.viec === 'ky' ? 'var(--ok)' : 'var(--bad)') + '">' +
            h(k.viec === 'ky' ? 'ký' : 'từ chối') + '</span>',
          h(k.boiAi), h(k.vaiLuc),
          '<span class="sm muted">' + h(k.ghiChu || '') + '</span>',
          k.conHieuLuc ? '<span style="color:var(--ok)">còn</span>'
                       : '<span style="color:var(--bad)">HẾT</span>'];
      }));

    var laCong = ['bienTap', 'chuyenMon', 'giuChuan', 'chuHe']
      .indexOf(t.trangThai) >= 0;
    if (laCong)
      o += '<div class="card mt"><div class="row" style="gap:10px;flex-wrap:wrap">' +
        '<button class="btn primary" onclick="G.bsKy(\'ky\')" style="gap:6px">' +
          ic('check') + 'Ký cổng ' + h(bacRaCong(t.trangThai)) + '</button>' +
        '<button class="btn" onclick="G.bsKy(\'tuChoi\')" style="gap:6px">' +
          ic('x') + 'Từ chối, kèm lý do</button>' +
        '</div><p class="sm muted mt">Máy sẽ chặn nếu anh là người viết bài này ' +
        '(luật L2), hoặc đã ký một cổng khác của chính bài này (luật L3), hoặc ' +
        'chưa có quyền ký cổng ấy.</p></div>';
    return o;
  }
  function bacRaCong(bac) {
    return {may: 'C1', bienTap: 'C2', chuyenMon: 'C3', giuChuan: 'C4', chuHe: 'C5'}[bac] || '';
  }

  /* ═══════════ NGĂN 3 · KHO BÀI ═══════════ */
  function nganKho() {
    var o = '<div class="card"><b>Mọi bài, và bài nào đang treo</b>' +
      '<p class="sm muted mt">Đồng hồ treo đo từ lúc bài VÀO CỔNG, không đo từ ' +
      'lúc viết: một bài nằm ba ngày ở cổng 2 rồi qua nhanh bốn cổng sau thì chỗ ' +
      'tắc là cổng 2, mà đo từ lúc viết thì không thấy. Quá hạn KHÔNG chặn bài — ' +
      'chặn một bài vì người duyệt bận là phạt nhầm người.</p></div>';

    if (!G.API_CAP_PHEP)
      return o + canhBao('Chưa nối máy chủ nên chưa đọc được kho bài. ' +
        'Nối ở Quản trị trang → Nối máy chủ.', 'var(--ink-3)');

    if (!G.bsD.treo && !G.bsD.dangNapTreo) {
      G.bsD.dangNapTreo = true;
      goi('baiTreo', {}).then(function (r) {
        G.bsD.treo = r; G.bsD.dangNapTreo = false; veLai();
      });
      return o + '<div class="card mt"><p class="sm muted">Đang đọc…</p></div>';
    }
    var t = G.bsD.treo || {};
    o += U.sec('Đồng hồ treo', (t.soTreo || 0) + ' bài quá hạn ở một cổng');
    if (!t.treo || !t.treo.length)
      o += '<div class="card"><p class="sm muted">' + h(t.vi || 'Không cổng nào quá hạn.') +
        '</p></div>';
    else
      o += U.tbl(['Bài', 'Cổng', 'Đã chờ', 'Hạn'], t.treo.map(function (b) {
        return ['<a href="#" onclick="G.bsXemThang(\'' + h(b.id) + '\');return false">' +
            h(b.tieuDe) + '</a>',
          '<b>' + h(b.cong) + '</b>',
          '<span style="color:var(--bad)">' + h(String(b.choGio)) + ' giờ</span>',
          h(String(b.hanGio)) + ' giờ'];
      }));

    o += U.sec('Mở một bài theo mã');
    o += '<div class="card"><div class="row" style="gap:10px">' +
      '<input id="bsMoId" class="inp grow" placeholder="Mã bài, ví dụ BND-…" ' +
        'value="' + h(G.bsD.id || '') + '">' +
      '<button class="btn" onclick="G.bsXemThang(document.getElementById(\'bsMoId\').value.trim())">' +
        'Xem thang</button></div></div>';
    return o;
  }

  /* ═══════════ NGĂN 4 · HIẾN PHÁP ═══════════ */
  function nganHienPhap() {
    var o = '<div class="card"><b>Hiến pháp Nội dung ' + h(G.KN_MA_VB || '') + '</b>' +
      '<p class="sm muted mt">' + h((G.KN_LUAT_GOC || {}).cot || '') + '</p>' +
      '<p class="sm muted mt"><i>' + h((G.KN_LUAT_GOC || {}).vi || '') + '</i></p>' +
      '</div>';

    o += U.sec('Hai mươi bốn khối', 'Mỗi khối phải TRẢ LỜI một câu — không có câu hỏi thì người viết điền cho có');
    o += U.tbl(['Mã', 'Khối', 'Phải trả lời câu gì', 'Đòi khối'],
      (G.KN_KHOI || []).map(function (k) {
        return ['<b>' + h(k.ma) + '</b>', h(k.ten),
          '<span class="sm">' + h(k.hoi || '') + '</span>',
          k.doi ? '<span class="chip">' + h(k.doi.join(' · ')) + '</span>' : '—'];
      }));

    o += U.sec('Mười luật chống nội dung rỗng', 'Ô "đo" nói máy bắt nó bằng cách nào — luật không có ô ấy là luật máy KHÔNG bắt được');
    o += U.tbl(['Mã', 'Luật', 'Máy đo bằng', 'Vì sao'],
      (G.KN_CAM || []).map(function (c) {
        var doTen = {khoi: 'khối thiếu', chu: 'dấu hiệu chữ', dai: 'độ dài câu'}[c.do];
        return ['<b>' + h(c.ma) + '</b>', h(c.luat),
          doTen ? '<span style="color:var(--ok)">' + h(doTen) + '</span>'
                : '<span style="color:var(--ink-4)">người đọc bắt</span>',
          '<span class="sm muted">' + h(c.vi || '') + '</span>'];
      }));

    o += U.sec('Bảng thay lời', 'Luật gốc: ĐỪNG SỬA CON NGƯỜI TRƯỚC KHI KIỂM HỆ THỐNG');
    o += U.tbl(['Đừng nói', 'Nói thay', 'Vì sao'],
      (G.KN_LOI_THAY || []).map(function (l) {
        return ['<span style="color:var(--bad)">' + h(l.dung) + '</span>',
          '<span style="color:var(--ok)">' + h(l.thay) + '</span>',
          '<span class="sm muted">' + h(l.vi) + '</span>'];
      }));

    o += U.sec('Bảng câu rỗng', 'Không sai — chỉ không mang thông tin nào, nên người viết không tự thấy');
    o += U.tbl(['Câu', 'Đáng lẽ nằm ở đó'],
      (G.KN_RONG || []).map(function (r) {
        return [h(r.cau), '<span class="sm">' + h(r.thay) + '</span>'];
      }));

    o += U.sec('Bốn nhãn nguồn', 'Bốn nhãn cố định thì máy đếm được — "luôn nêu nguồn" thì không');
    o += U.tbl(['Nhãn', 'Nghĩa'], (G.KN_NGUON || []).map(function (n) {
      return ['<b>' + h(n.nhan) + '</b>', h(n.nghia)];
    }));

    o += U.sec('Tám chế độ', 'Chế độ nào ĐÒI khối nào — chế độ không đòi gì thì chỉ là một cái tên');
    o += U.tbl(['Mã', 'Chế độ', 'Làm gì', 'Đòi khối'],
      (G.KN_CHE || []).map(function (c) {
        return ['<b>' + h(c.ma) + '</b>', h(c.ten), '<span class="sm">' + h(c.lam) + '</span>',
          (c.doi && c.doi.length) ? '<span class="chip">' + h(c.doi.join(' · ')) + '</span>' : '—'];
      }));

    o += U.sec('Ba phiên bản theo người đọc');
    o += '<div class="card">' + (G.KN_NGUOIDOC || []).map(function (n) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--line)">' +
        '<b>' + h(n.ten) + '</b> — ' + h((n.hoi || []).join('  ·  ')) +
        (n.cam ? '<div class="sm" style="color:var(--bad);margin-top:5px">' +
          ic('shield', 'w-3 h-3') + ' ' + h(n.cam) + '</div>' : '') +
        '</div>';
    }).join('') + '</div>';

    o += U.sec('Chỗ máy dừng lại', 'Việc còn chờ chủ hệ, không phải chờ mã');
    o += '<div class="card">' + (G.KN_CHOCHU || []).map(function (c) {
      return '<div style="padding:8px 0;border-bottom:1px solid var(--line)">' +
        '<b>' + h(c.ma) + '</b> — ' + h(c.viec) +
        '<div class="sm muted" style="margin-top:4px">' + h(c.vi) + '</div></div>';
    }).join('') + '</div>';
    return o;
  }

  /* ═══════════ NGĂN 5 · QUYỀN KÝ ═══════════ */
  function nganQuyen() {
    var o = '<div class="card"><b>Quyền ký là một TRỤC RIÊNG, không phải một vai mới</b>' +
      '<p class="sm muted mt">Bản đặc tả đề nghị năm vai mới. Học viện đã có thang ' +
      'R01–R15 đang chạy, và dựng thang thứ hai là dựng hai sự thật về ai được làm ' +
      'gì. Nên ba quyền ký cấp bằng cờ <code>quyenNoiDung</code> — y như ' +
      '<code>quyenTaiChinh</code> của phòng tài chính bản 9.97. Chỉ R01–R02 cấp ' +
      'được, và không ai tự cấp cho mình.</p></div>';

    if (!G.API_CAP_PHEP)
      return o + canhBao('Chưa nối máy chủ nên chưa đọc được danh sách quyền ký.',
        'var(--ink-3)');

    if (!G.bsD.quyen && !G.bsD.dangNapQuyen) {
      G.bsD.dangNapQuyen = true;
      goi('dsQuyenNoiDung', {}).then(function (r) {
        G.bsD.quyen = r; G.bsD.dangNapQuyen = false; veLai();
      });
      return o + '<div class="card mt"><p class="sm muted">Đang đọc…</p></div>';
    }
    var q = G.bsD.quyen || {};

    if (q.congThieuNguoi && q.congThieuNguoi.length)
      o += canhBao('Chưa ai giữ quyền: ' + q.congThieuNguoi.join(', ') +
        '. Bài sẽ ĐỨNG ở cổng ấy — và máy nói thẳng là đứng vì THIẾU NGƯỜI chứ ' +
        'không phải vì bài sai. Luật L3 làm chỗ này tốn thật: một bài đi trọn ' +
        'thang cần BỐN người khác nhau, và người viết không nằm trong bốn người ấy.',
        'var(--bad)');

    o += U.sec('Ai đang giữ quyền ký', (q.ds || []).length + ' người');
    o += (q.ds && q.ds.length)
      ? U.tbl(['Tài khoản', 'Quyền', 'Cổng', 'Vì sao cấp', 'Ai cấp'],
          q.ds.map(function (x) {
            var c = (G.KN_QUYEN || []).filter(function (k) { return k.ma === x.chucNang; })[0];
            return [h(x.username), '<b>' + h(x.chucNang) + '</b>',
              '<span class="chip">' + h(c ? c.cong : '') + '</span>',
              '<span class="sm muted">' + h(x.lyDo) + '</span>', h(x.boiAi)];
          }))
      : '<div class="card"><p class="sm muted">Chưa cấp cho ai.</p></div>';

    o += U.sec('Cấp quyền ký');
    o += '<div class="card"><div class="row" style="gap:10px;flex-wrap:wrap">' +
      '<input id="bsQTen" class="inp grow" placeholder="Tài khoản (email đăng nhập)">' +
      '<select id="bsQChuc" class="inp" style="max-width:180px">' +
      (G.KN_QUYEN || []).map(function (k) {
        return '<option value="' + h(k.ma) + '">' + h(k.ten) + ' · ' + h(k.cong) + '</option>';
      }).join('') + '</select></div>' +
      '<input id="bsQLyDo" class="inp mt" placeholder="Vì sao cấp — ít nhất 10 chữ">' +
      '<div class="row mt" style="gap:10px">' +
      '<button class="btn primary" onclick="G.bsCapQuyen()">Cấp</button>' +
      '<button class="btn" onclick="G.bsThuQuyen()">Thu hồi</button></div>' +
      '<p class="sm muted mt">Cấp quyền phải nói vì sao. Một quyền không lý do thì ' +
      'sáu tháng sau không ai dám thu hồi, vì không ai biết vì sao nó có ở đó.</p>' +
      '</div>';
    return o;
  }
  G.bsCapQuyen = function () {
    goi('capQuyenNoiDung', {username: oGiaTri('bsQTen').trim(),
      chucNang: oGiaTri('bsQChuc'), lyDo: oGiaTri('bsQLyDo').trim()})
      .then(function (r) { G.bsD.quyen = null; bao(r, 'Đã cấp quyền ký.'); veLai(); });
  };
  G.bsThuQuyen = function () {
    goi('thuHoiQuyenNoiDung', {username: oGiaTri('bsQTen').trim(),
      chucNang: oGiaTri('bsQChuc')})
      .then(function (r) { G.bsD.quyen = null; bao(r, 'Đã thu hồi.'); veLai(); });
  };

  /* ═══════════ MÀN ═══════════ */
  G.VIEWS['bien-soan-noi-dung'] = function () {
    /* Kho nạp SAU khi đăng nhập, nên KHÔNG đọc G.KN_* ở lúc tệp vừa tải.
       Đọc ở đây, mỗi lượt vẽ. Thiếu kho thì nói ra chứ không vẽ một màn
       trống rỗng để người dùng tự đoán. */
    if (!(G.KN_KHOI || []).length)
      return U.ph({eyebrow: 'Kiến trúc sư Nội dung', ic: 'book',
        t: 'Biên soạn nội dung', grad: 1}) +
        canhBao('Chưa nạp được kho nội dung. Kho đi theo quyền: cổng này ở gói ' +
          'NGHỀ, nên tài khoản phải có gói nghề. Đăng nhập lại bằng tài khoản của ' +
          'Học viện, hoặc kiểm ở màn Kho tổng.', 'var(--warn)');

    var o = U.ph({eyebrow: 'Kiến trúc sư Nội dung', ic: 'book',
      t: 'Biên soạn nội dung', grad: 1,
      lead: 'Khuôn hai mươi bốn khối · máy đo chứ không viết hộ · năm cổng có người ký'});
    o += thanhNgan();
    if (G.bsNgan === 'soan')     return o + nganSoan();
    if (G.bsNgan === 'thang')    return o + nganThang();
    if (G.bsNgan === 'kho')      return o + nganKho();
    if (G.bsNgan === 'hienphap') return o + nganHienPhap();
    if (G.bsNgan === 'quyen' && capQuyenDuoc()) return o + nganQuyen();
    return o + nganSoan();
  };
})();
