/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÀN KIẾN TRÚC SƯ THỊ GIÁC

   Chốt của chủ hệ thống bản 9.99.10: "Hiểu hệ thống trước — hiểu nội
   dung — hiểu người dùng — rồi mới thiết kế."

   ══ MÀN NÀY KHÔNG VẼ ẢNH, VÀ NÓI THẲNG RA NGAY DÒNG ĐẦU ══

   Nó dựng ĐỀ BÀI THIẾT KẾ và giữ cổng duyệt. Người dùng mở ra mà tưởng
   sắp có ảnh thì họ thất vọng ở giây thứ ba; nói trước thì họ dùng đúng
   thứ nó làm được.

   ══ SÁU NGĂN, VÀ THỨ TỰ LÀ MỘT QUYẾT ĐỊNH ══

     đọc màn  — máy dựng một màn thật ra chữ rồi đọc
     tài liệu — dán chữ tài liệu, máy chỉ chỗ nên thành hình
     đề xuất  — chỗ làm việc
     kho      — mọi đề xuất, cây phiên bản, chặn ở đâu
     hiến pháp— tra cứu ranh giới Tầng và luật
     luật     — sổ quyết định thương hiệu, bộ nhớ dài hạn

   ĐỌC MÀN đứng đầu vì đó là chỗ bắt đầu đúng: đọc hệ thống trước, rồi
   mới thiết kế. Gõ tay nội dung vào ô đề xuất là đọc một bản chép tay.

   Hiến pháp KHÔNG đứng đầu dù nó là bộ não: người ta mở tra cứu khi có
   một câu hỏi cụ thể, không phải để đọc mỗi ngày.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  var U = G.U, h = U.h, ic = U.ic;

  var NGAN = [
    {ma: 'docman',  ten: 'Đọc màn',    ic: 'search'},
    {ma: 'tailieu', ten: 'Tài liệu',   ic: 'quote'},
    {ma: 'dexuat',  ten: 'Đề xuất',    ic: 'plus'},
    {ma: 'kho',     ten: 'Kho',        ic: 'vault'},
    {ma: 'hienphap',ten: 'Hiến pháp',  ic: 'book'},
    {ma: 'luat',    ten: 'Luật',       ic: 'shield'}
  ];

  G.ktNgan = G.ktNgan || 'docman';
  G.ktDuLieu = G.ktDuLieu || {};

  /* Màu của từng bậc. Lấy từ biến CSS — cùng luật với bảng tin. */
  var MAU_BAC = {
    nhap: 'var(--ink-3)', deXuat: 'var(--teal)', mophong: 'var(--warn)',
    duyet: 'var(--ok)', hoanThien: 'var(--ok)', phatHanh: 'var(--gita)',
    tuChoi: 'var(--bad)'
  };
  var TEN_BAC = {nhap: 'Nháp', deXuat: 'Đã đề xuất', mophong: 'Mô phỏng',
    duyet: 'Đã duyệt', hoanThien: 'Bản cuối', phatHanh: 'Đã phát hành',
    tuChoi: 'Bị từ chối'};

  function laChuHe() {
    return ((G.S && G.S.acc && G.S.acc.role) || '') === 'R01';
  }
  function oGiaTri(id) {
    var el = typeof document !== 'undefined' && document.getElementById(id);
    return el ? String(el.value || '').trim() : '';
  }
  function veLai() {
    if (!G.S || G.S.view !== 'kien-truc-thi-giac') return;
    if (typeof document === 'undefined' || !document.getElementById('main')) return;
    G.render && G.render();
  }

  function thanhNgan() {
    return '<div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:18px">' +
      NGAN.map(function (n) {
        var on = G.ktNgan === n.ma;
        return '<button class="btn' + (on ? ' primary' : '') + '" ' +
          'onclick="G.ktMoNgan(\'' + n.ma + '\')" style="gap:7px">' +
          ic(n.ic) + h(n.ten) + '</button>';
      }).join('') + '</div>';
  }
  G.ktMoNgan = function (ma) { G.ktNgan = ma; veLai(); };

  G.ktNap = function () {
    if (!G.goiMayChu) return;
    G.ktDuLieu.dangNap = true;
    G.goiMayChu('khoThiGiac', {}).then(function (d) {
      G.ktDuLieu.kho = d; G.ktDuLieu.dangNap = false; veLai();
    });
  };

  /* ═══════════ NGĂN 1 · ĐỌC MÀN HÌNH THẬT ═══════════

     Chốt 9.99.11. Trước bản này người dùng phải TỰ GÕ nội dung vào ô đề
     xuất, nghĩa là máy đọc một bản chép tay của màn hình chứ không đọc
     màn hình. Bản chép tay thì thiếu chỗ nào không ai biết.

     Nay nó dựng thẳng màn ấy ra chữ rồi đọc. Chạy ở MÁY KHÁCH vì màn
     hình là mã máy khách — máy chủ không có gì để đọc.

     ══ VÀ NÓ KHÔNG TỰ GỬI ĐI ══

     Nó điền sẵn ô đề xuất rồi DỪNG. Máy đoán Tầng bằng cách dò chữ, và
     dò chữ thì đoán sai được — một đề xuất tự gửi dựa trên một cái đoán
     là đúng thứ luật "không tự suy diễn" cấm. Người xác nhận rồi mới đi
     tiếp. */
  function nganDocMan() {
    /* G.NAV là danh sách NHÓM, mỗi nhóm có .items — không phải danh sách
       màn. Bản đầu tôi lọc thẳng trên G.NAV nên ô chọn ra RỖNG, và lượt
       đọc rơi vào nhánh "màn không có chữ" với một câu chẩn đoán trỏ sai
       hẳn chỗ. Chạy demo mới thấy: 0 mục trong ô chọn. */
    var nav = [];
    (G.NAV || []).forEach(function (nh) {
      (nh.items || []).forEach(function (x) {
        if (x && x.v && x.t && G.VIEWS[x.v]) nav.push(x);
      });
    });
    var o = '<div class="card"><b>Máy dựng màn ấy ra chữ rồi đọc</b>' +
      '<p class="sm muted mt">Trước bản này người dùng phải tự gõ nội dung vào ô ' +
      'đề xuất — nghĩa là máy đọc một bản chép tay chứ không đọc màn hình, và bản ' +
      'chép tay thì thiếu chỗ nào không ai biết. Máy ĐOÁN chặng bằng cách dò chữ và ' +
      'điền sẵn, rồi DỪNG: đoán sai được, nên người xác nhận rồi mới đi tiếp.</p></div>';

    o += U.sec('Chọn một màn', nav.length + ' màn đang có trong hệ');
    o += '<div class="card"><select id="ktMan" class="inp">' +
      nav.map(function (x) {
        return '<option value="' + h(x.v) + '">' + h(x.t) + '</option>';
      }).join('') + '</select>' +
      '<div class="row mt2" style="gap:8px">' +
      '<button class="btn primary" onclick="G.ktDocMan()">Đọc màn này</button>' +
      '</div></div>';

    var r = G.ktDocRa;
    if (!r) return o;
    if (r.loi)
      return o + '<div class="card" style="border-left:3px solid var(--bad);margin-top:14px">' +
        '<b>Không dựng được màn này ra chữ</b>' +
        '<p class="sm mt">' + h(r.loi) + '</p>' +
        '<p class="sm muted mt">Một số màn cần dữ liệu của một vai cụ thể mới vẽ ' +
        'được. Đăng nhập bằng vai ấy rồi đọc lại.</p></div>';

    o += U.sec('Máy đọc được gì', 'Máy ĐOÁN — người xác nhận.');
    o += '<div class="card">' +
      '<p class="sm"><b>Màn:</b> ' + h(r.ten) + ' · <code>' + h(r.v) + '</code></p>' +
      '<p class="sm mt"><b>Chặng máy đoán:</b> ' +
        (r.tangDoan ? '<b style="color:var(--teal)">' + h(r.tangDoan) + '</b>' +
          ' <span class="muted">(' + h(r.viDoan) + ')</span>'
        : '<span class="muted">không đoán được — người khai</span>') + '</p>' +
      '<p class="sm mt"><b>Người xem máy đoán:</b> ' +
        h((r.nguoiDoan || []).join(', ') || '(không rõ)') + '</p>' +
      '<p class="sm mt"><b>Dài:</b> ' + h(String(r.soChu)) + ' chữ · ' +
        h(String(r.soMuc)) + ' mục</p>' +
      '<p class="sm mt"><b>Loại hình máy đề nghị:</b> ' +
        h(r.loaiDoan || '(chưa rõ)') + '</p>' +
      '<div class="row mt2" style="gap:8px">' +
      '<button class="btn primary" onclick="G.ktDienSan()">Điền sẵn vào ô đề xuất</button>' +
      '</div></div>';
    o += '<pre class="sm mt" style="white-space:pre-wrap;background:var(--phu-2);' +
      'padding:12px;border-radius:10px;max-height:260px;overflow:auto">' +
      h(r.chu.slice(0, 1800)) + '</pre>';
    return o;
  }

  /* Dò chặng bằng chữ. Đọc HP_TANG chứ không gắn cứng — bảng chặng đổi
     thì phép dò đổi theo. */
  function doanTang(chu) {
    var t = String(chu || '').toLowerCase();
    var diem = [];
    (G.HP_TANG || []).forEach(function (x) {
      var d = 0, ten = String(x.ten || '').toLowerCase();
      if (t.indexOf(x.tang.toLowerCase()) >= 0) d += 2;
      ten.split(/[\s—,]+/).forEach(function (w) {
        if (w.length >= 4 && t.indexOf(w) >= 0) d += 1;
      });
      if (d) diem.push({tang: x.tang, d: d, ten: x.ten});
    });
    diem.sort(function (a, b) { return b.d - a.d; });
    return diem[0] || null;
  }

  G.ktDocMan = function () {
    var v = oGiaTri('ktMan');
    var muc = {};
    (G.NAV || []).forEach(function (nh) {
      (nh.items || []).forEach(function (x) { if (x.v === v) muc = x; });
    });
    if (!v || !G.VIEWS[v]) {
      G.ktDocRa = {loi: 'Chưa chọn được màn nào. Ô chọn đang rỗng — nghĩa là bảng ' +
        'điều hướng chưa nạp, hoặc vai hiện tại không mở màn nào.'};
      return veLai();
    }
    var chu = '', loi = '';
    try {
      var html = (G.VIEWS && G.VIEWS[v]) ? G.VIEWS[v]() : '';
      chu = String(html).replace(/<style[\s\S]*?<\/style>/g, ' ')
        .replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ')
        .replace(/\s+/g, ' ').trim();
      if (chu.length < 40) loi = 'Màn dựng ra gần như không có chữ.';
    } catch (e) { loi = String(e && e.message || e); }

    if (loi) { G.ktDocRa = {loi: loi}; return veLai(); }

    var dt = doanTang(chu + ' ' + (muc.t || '') + ' ' + (muc.h || ''));
    /* Người xem đoán từ chính chữ trên màn, không đoán từ tên màn: tên
       màn là thứ người làm đặt, còn chữ là thứ người dùng đọc. */
    var ng = [];
    if (/phụ huynh|bố mẹ|gia đình mình/i.test(chu)) ng.push('PHUHUYNH');
    if (/học viên|con đang|bài tập/i.test(chu)) ng.push('HOCVIEN');
    if (/coach|kèm|phác đồ|kịch bản/i.test(chu)) ng.push('COACH');
    if (/toàn hệ|super admin|quản trị/i.test(chu)) ng.push('CHUHE');
    if (!ng.length) ng.push('COACH');

    var loai = /bước|quy trình/i.test(chu) ? 'QUY_TRINH'
      : /ngày|chặng|lộ trình/i.test(chu) ? 'BANDO_HANHTRINH'
      : /điều kiện|nghiệm thu/i.test(chu) ? 'CONG'
      : /danh sách|cần làm/i.test(chu) ? 'DANH_SACH_VIEC' : 'KHUNG';

    G.ktDocRa = {v: v, ten: muc.t || v, chu: chu, soChu: chu.length,
      soMuc: (String(chu).match(/·/g) || []).length,
      tangDoan: dt ? dt.tang : '', viDoan: dt ? dt.ten : '',
      nguoiDoan: ng, loaiDoan: loai};
    veLai();
  };

  G.ktDienSan = function () {
    var r = G.ktDocRa;
    if (!r || r.loi) return;
    G.ktMoiTuMan = r;
    G.ktNgan = 'dexuat';
    veLai();
    U.toast('Đã điền sẵn — kiểm lại chặng trước khi đề xuất');
  };

  /* ═══════════ NGĂN 2 · TÀI LIỆU ═══════════

     Nó đọc CHỮ, không đọc PDF hay DOCX: mở ba định dạng ấy cần một thư
     viện tải từ mạng ngoài, mà chính sách nội dung của bản web chặn mọi
     nguồn ngoài — và nới ra để đọc một tệp là nới cho mọi thứ khác đi
     qua cùng cái lỗ. Mở tài liệu bằng phần mềm sẵn có, chọn hết, dán
     vào: mất mười giây, và không phải nới lỗ nào. */
  function nganTaiLieu() {
    var o = '<div class="card"><b>Dán chữ của tài liệu vào đây</b>' +
      '<p class="sm muted mt">Máy đọc CHỮ, không đọc PDF hay DOCX — mở ba định dạng ' +
      'ấy cần một thư viện tải từ mạng ngoài, mà nới chính sách nội dung ra để đọc ' +
      'một tệp là nới cho mọi thứ khác đi qua cùng cái lỗ. Mở tài liệu bằng phần ' +
      'mềm sẵn có, chọn hết, dán vào.</p>' +
      '<p class="sm muted mt">Máy CHỈ nói chỗ nào nên thành hình gì. Nó không sửa ' +
      'một chữ nào — sửa nội dung đã duyệt là việc của người viết.</p></div>';

    o += '<div class="card mt2">' +
      '<label class="sm"><b>Tài liệu này thuộc chặng nào</b></label>' +
      '<select id="ktTlTang" class="inp">' +
      ['T1', 'T2', 'T3', 'T4', 'T5'].map(function (t) {
        var x = (G.HP_TANG || []).filter(function (y) { return y.tang === t; })[0];
        return '<option value="' + t + '">' + h(t + ' — ' +
          ((x && x.ten) || '').slice(0, 50)) + '</option>';
      }).join('') + '</select>' +
      '<div class="mt"><label class="sm"><b>Chữ của tài liệu</b> ' +
      '<span class="muted">(để dòng trống giữa các ý — máy chia theo đó)</span></label>' +
      '<textarea id="ktTlChu" class="inp" rows="10" maxlength="200000"></textarea></div>' +
      '<div class="row mt2" style="gap:8px">' +
      '<button class="btn primary" onclick="G.ktDocTaiLieu()">Đọc và đề nghị</button>' +
      '</div></div>';

    var d = G.ktTlRa;
    if (!d) return o;
    if (!d.ok)
      return o + '<div class="card" style="border-left:3px solid var(--bad);margin-top:14px">' +
        '<p class="sm">' + h(d.error || '') + '</p></div>';

    if ((d.phamTang || []).length)
      o += '<div class="card" style="border-left:3px solid var(--bad);margin-top:14px">' +
        '<b>' + h(String(d.phamTang.length)) + ' đoạn vượt ranh giới chặng ' +
        h(d.tang) + '</b>' +
        d.phamTang.map(function (p) {
          return '<p class="sm mt">Đoạn ' + h(String(p.doan)) + ' — phạm <b>' +
            h(p.pham.join(', ')) + '</b><br><span class="muted">' + h(p.trich) +
            '…</span></p>';
        }).join('') + '</div>';

    if (d.canhBao)
      o += '<div class="card" style="border-left:3px solid var(--warn);margin-top:14px">' +
        '<p class="sm">' + h(d.canhBao) + '</p></div>';

    o += U.sec('Chỗ nên thành hình',
      d.soDoan + ' đoạn · ' + d.viTri.length + ' chỗ được đề nghị · ' + d.tyLe + '%');
    o += U.tbl(['Đoạn', 'Nên làm', 'Vì', 'Trích'],
      d.viTri.map(function (v) {
        var lh = (G.TG_LOAIHINH || []).filter(function (x) { return x.ma === v.nen; })[0];
        return ['<b>' + h(String(v.doan)) + '</b>',
          h((lh && lh.ten) || v.nen),
          '<span class="sm muted">' + h(v.vi) + '</span>',
          '<span class="sm muted">' + h(v.trich) + '…</span>'];
      }));
    return o;
  }

  G.ktDocTaiLieu = function () {
    G.goiMayChu('docTaiLieuThiGiac', {tang: oGiaTri('ktTlTang'), chu: oGiaTri('ktTlChu')})
      .then(function (d) { G.ktTlRa = d; veLai(); });
  };

  /* ═══════════ NGĂN 3 · ĐỀ XUẤT ═══════════ */
  function nganDeXuat() {
    var d = G.ktDuLieu.kho;
    var loai = (d && d.ok && d.loaiHinh) || [];
    var nx = (d && d.ok && d.nguoiXem) || [];
    var tang = (d && d.ok && d.thuTuTang) || ['T1', 'T2', 'T3', 'T4', 'T5'];
    var hp = G.TG_LOAIHINH || [];

    /* Điền sẵn từ ngăn ĐỌC MÀN, nếu vừa bấm sang. Đọc một lần rồi thôi:
       giữ mãi thì người dùng sửa tay xong, đổi ngăn, quay lại và thấy
       tay mình bị đè bởi cái máy đoán. */
    var tuMan = G.ktMoiTuMan; G.ktMoiTuMan = null;
    var sanTang = (tuMan && tuMan.tangDoan) || '';
    var sanLoai = (tuMan && tuMan.loaiDoan) || '';
    var sanNguoi = (tuMan && tuMan.nguoiDoan) || [];
    var sanChu = tuMan ? tuMan.chu.slice(0, 3000) : '';
    var sanViTri = tuMan ? ('màn ' + tuMan.v) : '';

    var o = '';
    if (tuMan)
      o += '<div class="card" style="border-left:3px solid var(--warn)">' +
        '<b>Điền sẵn từ màn "' + h(tuMan.ten) + '"</b>' +
        '<p class="sm muted mt">Máy ĐOÁN chặng và người xem bằng cách dò chữ. ' +
        'Kiểm lại trước khi đề xuất — một đề xuất dựng trên một cái đoán chưa ai ' +
        'xác nhận là đúng thứ luật "không tự suy diễn" cấm.</p></div>';

    o += '<div class="card"><b>Máy dựng ĐỀ BÀI THIẾT KẾ, không vẽ ảnh</b>' +
      '<p class="sm muted mt">Nó không gọi ra một bộ tạo ảnh nào — đưa được nội ' +
      'dung thiết kế ra ngoài là đưa được nội dung ra ngoài, cùng một cái cửa. ' +
      'Việc của nó là CHẶN một tấm sai Tầng lại trước khi có ai bỏ công vẽ, và ' +
      'bắt mỗi tấm đi đủ sáu bậc duyệt.</p></div>';

    o += U.sec('Đề xuất một hình',
      'Cổng Tầng chạy TRƯỚC mọi thứ khác. Ranh giới đọc thẳng từ bảng chặng đã ' +
      'chốt, không phải một bản khai riêng.');

    o += '<div class="card">' +
      '<div><label class="sm"><b>Chặng</b></label>' +
      '<select id="ktTang" class="inp">' + tang.map(function (t) {
        var x = (G.TG_TANG || []).filter(function (y) { return y.tang === t; })[0];
        var hpt = (G.HP_TANG || []).filter(function (y) { return y.tang === t; })[0];
        return '<option value="' + h(t) + '"' + (t === sanTang ? ' selected' : '') +
          '>' + h(t + ' — ' +
          ((hpt && hpt.ten) || (x && x.ngonNgu) || t).slice(0, 60)) + '</option>';
      }).join('') + '</select></div>' +

      '<div class="mt"><label class="sm"><b>Loại hình</b> ' +
      '<span class="muted">(mỗi loại đúng MỘT nhiệm vụ)</span></label>' +
      '<select id="ktLoai" class="inp">' + loai.map(function (m) {
        var x = hp.filter(function (y) { return y.ma === m; })[0];
        return '<option value="' + h(m) + '"' + (m === sanLoai ? ' selected' : '') +
          '>' + h(((x && x.ten) || m) +
          ((x && x.nhiemVu) ? ' — ' + x.nhiemVu : '')) + '</option>';
      }).join('') + '</select></div>' +

      '<div class="mt"><label class="sm"><b>Nhiệm vụ DUY NHẤT của tấm này</b></label>' +
      '<input id="ktNhiemVu" class="inp" maxlength="300" ' +
      'placeholder="Viết một câu. Viết không nổi một câu nghĩa là nó đang mang hai việc."></div>' +

      '<div class="mt"><label class="sm"><b>Cho ai xem</b></label>' +
      '<div class="row" style="gap:12px;flex-wrap:wrap;margin-top:6px">' +
      nx.map(function (m) {
        var x = (G.TG_NGUOI || []).filter(function (y) { return y.ma === m; })[0];
        return '<label class="sm" style="display:flex;gap:6px;align-items:center">' +
          '<input type="checkbox" class="ktNX" value="' + h(m) + '"' +
          (sanNguoi.indexOf(m) >= 0 ? ' checked' : '') + '> ' +
          h((x && x.ten) || m) + '</label>';
      }).join('') + '</div></div>' +

      '<div class="mt"><label class="sm"><b>Nội dung cần truyền đạt</b></label>' +
      '<textarea id="ktNoiDung" class="inp" rows="4" maxlength="4000" ' +
      'placeholder="Máy đọc chỗ này để soi Tầng. Viết đủ thì cổng Tầng làm được việc.">' +
      h(sanChu) + '</textarea></div>' +

      '<div class="mt"><label class="sm"><b>Bố cục</b> <span class="muted">(không bắt buộc)</span></label>' +
      '<input id="ktBoCuc" class="inp" maxlength="200"></div>' +
      '<div class="mt"><label class="sm"><b>Đặt ở đâu trên giao diện</b> ' +
      '<span class="muted">(không bắt buộc)</span></label>' +
      '<input id="ktViTri" class="inp" maxlength="200" value="' + h(sanViTri) +
      '" placeholder="ví dụ: trang chặng T1 › phần 2"></div>' +

      '<div class="row mt2" style="gap:8px">' +
      '<button class="btn primary" onclick="G.ktGuiDeXuat()">Đề xuất</button></div>' +
      '</div>';

    if (G.ktDap) {
      var r = G.ktDap;
      o += r.ok
        ? '<div class="card" style="border-left:3px solid var(--ok);margin-top:14px">' +
          '<b>Đã qua cổng Tầng · ' + h(r.id) + '</b>' +
          '<p class="sm muted mt">' + h(r.soatTang || '') + '</p>' +
          /* Máy cho qua nhưng thấy chỗ đáng ngờ thì phải NÓI RA ngay ở
             đây, chứ không chỉ giấu trong đề bài. Người đề xuất đang
             nhìn màn này, và sửa lúc này rẻ hơn sửa sau khi đã vẽ. */
          ((r.luuY || []).length
            ? '<div class="mt" style="border-left:3px solid var(--warn);padding-left:10px">' +
              '<b class="sm">Máy không chặn, nhưng người duyệt đọc lại</b>' +
              r.luuY.map(function (x) {
                return '<p class="sm muted mt">' + h(x) + '</p>'; }).join('') + '</div>'
            : '') +
          '<pre class="sm mt" style="white-space:pre-wrap;background:var(--phu-2);' +
          'padding:12px;border-radius:10px;overflow-x:auto">' + h(r.deBai || '') + '</pre>' +
          '</div>'
        : '<div class="card" style="border-left:3px solid var(--bad);margin-top:14px">' +
          '<b>' + h(r.chan ? 'CỔNG TẦNG CHẶN LẠI' : 'Chưa đề xuất được') + '</b>' +
          '<p class="sm mt">' + h(r.error || '') + '</p>' +
          ((r.phamPhai || []).length
            ? '<p class="sm mt"><b>Phạm:</b> ' + h(r.phamPhai.join(' · ')) + '</p>'
            : '') + '</div>';
    }
    return o;
  }

  G.ktGuiDeXuat = function () {
    var nx = [];
    if (typeof document !== 'undefined')
      Array.prototype.forEach.call(document.querySelectorAll('.ktNX'), function (e) {
        if (e.checked) nx.push(e.value);
      });
    G.goiMayChu('deXuatThiGiac', {deXuat: {
      tang: oGiaTri('ktTang'), loaiHinh: oGiaTri('ktLoai'),
      nhiemVu: oGiaTri('ktNhiemVu'), noiDung: oGiaTri('ktNoiDung'),
      boCuc: oGiaTri('ktBoCuc'), viTri: oGiaTri('ktViTri'), nguoiXem: nx
    }}).then(function (d) {
      G.ktDap = d;
      U.toast(d.ok ? 'Đã vào sổ ở bậc ĐỀ XUẤT' : (d.error || 'Chưa đề xuất được'),
        d.ok ? 'ok' : 'err');
      if (d.ok) G.ktNap(); else veLai();
    });
  };

  /* ═══════════ NGĂN 2 · KHO ═══════════ */
  function nganKho() {
    var d = G.ktDuLieu.kho;
    if (!d) return U.empty('Đang mở kho', 'Chờ máy chủ trả lời.', true);
    if (!d.ok) return U.empty('Chưa mở được kho', d.error || '', true);
    if (!d.ds.length)
      return U.empty('Kho còn trống',
        'Chưa có đề xuất nào. Sang ngăn "Đề xuất" để bắt đầu.', true);

    var o = '<div class="row" style="gap:8px;flex-wrap:wrap">' +
      Object.keys(d.dem).map(function (k) {
        return U.chip((TEN_BAC[k] || k) + ': ' + d.dem[k], MAU_BAC[k] || 'var(--ink-3)', true);
      }).join('') + '</div>';

    o += U.sec('Mọi đề xuất', d.vi || '');
    o += d.ds.map(function (x) {
      var mau = MAU_BAC[x.trangThai] || 'var(--ink-3)';
      return '<div class="card" style="border-left:3px solid ' + mau + ';margin-bottom:10px">' +
        '<div class="row" style="gap:8px;flex-wrap:wrap;align-items:center">' +
          U.chip(TEN_BAC[x.trangThai] || x.trangThai, mau, true) +
          U.chip(x.tang, 'var(--teal)') +
          (x.ban > 1 ? U.chip('bản ' + x.ban, 'var(--warn)', true) : '') +
          (x.diem !== null && x.diem !== undefined
            ? U.chip(x.diem + ' · ' + (x.bacDiem || ''), 'var(--gold)', true) : '') +
        '</div>' +
        '<b style="display:block;margin-top:8px">' + h(x.nhiemVu) + '</b>' +
        '<p class="tiny muted mt">' + h(x.loaiHinh + ' · ' + x.nguoiXem.join(', ') +
          ' · ' + x.nguoiDe + ' · ' + String(x.deLuc).slice(0, 16).replace('T', ' ')) +
          (x.banTruoc ? h(' · sửa từ ' + x.banTruoc) : '') + '</p>' +
        (x.lyDo ? '<p class="sm mt"><b>Lý do:</b> ' + h(x.lyDo) + '</p>' : '') +
        (x.viTri ? '<p class="sm muted mt">Đặt tại: ' + h(x.viTri) + '</p>' : '') +
        '<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:10px">' +
        (x.keTiep || []).map(function (b) {
          var canChu = (b === 'duyet' || b === 'phatHanh');
          if (canChu && !laChuHe())
            return '<span class="sm muted">' + h(TEN_BAC[b] || b) + ': chờ Super Admin</span>';
          return '<button class="btn' + (b === 'tuChoi' ? '' : ' primary') + '" ' +
            'onclick="G.ktMoChuyenBac(\'' + h(x.id) + '\',\'' + h(b) + '\')">' +
            h(TEN_BAC[b] || b) + '</button>';
        }).join('') +
        '<button class="btn" onclick="G.ktMoCham(\'' + h(x.id) + '\')">Chấm điểm</button>' +
        '<button class="btn" onclick="G.ktVe(\'' + h(x.id) + '\')">Vẽ thử</button>' +
        (x.trangThai === 'duyet' || x.trangThai === 'phatHanh'
          ? '<button class="btn" onclick="G.ktBanMoi(\'' + h(x.id) + '\')">Sửa → bản mới</button>'
          : '') +
        '</div></div>';
    }).join('');
    return o;
  }

  G.ktMoChuyenBac = function (id, den) {
    if (den !== 'tuChoi') {
      G.goiMayChu('chuyenBacThiGiac', {id: id, den: den}).then(function (d) {
        U.toast(d.ok ? d.vi : (d.error || 'Không đi được'), d.ok ? 'ok' : 'err');
        if (d.ok) G.ktNap();
      });
      return;
    }
    U.modal('<h3>Từ chối đề xuất này</h3>' +
      '<p class="sm muted mt">Nói vì sao. Không nói thì lần sau máy đề xuất y hệt, ' +
      'và câu từ chối ấy phải nói lại mãi.</p>' +
      '<textarea id="ktLyDo" class="inp mt2" rows="3" maxlength="500"></textarea>' +
      '<div class="row mt2" style="gap:8px">' +
      '<button class="btn primary" onclick="G.ktGuiTuChoi(\'' + h(id) + '\')">Từ chối</button>' +
      '<button class="btn" onclick="U.closeModal()">Thôi</button></div>');
  };
  G.ktGuiTuChoi = function (id) {
    G.goiMayChu('chuyenBacThiGiac', {id: id, den: 'tuChoi', lyDo: oGiaTri('ktLyDo')})
      .then(function (d) {
        if (!d.ok) return U.toast(d.error || 'Chưa từ chối được', 'err');
        U.closeModal(); U.toast('Đã từ chối'); G.ktNap();
      });
  };
  G.ktBanMoi = function (id) {
    G.goiMayChu('banMoiThiGiac', {id: id, deXuat: {}}).then(function (d) {
      U.toast(d.ok ? d.vi : (d.error || 'Chưa tạo được bản mới'), d.ok ? 'ok' : 'err');
      if (d.ok) G.ktNap();
    });
  };

  /* ═══════════ VẼ THỬ — BỘ VẼ NẰM TRONG MÁY ═══════════
     Ảnh dựng ngay trong trình duyệt đã đăng nhập, từ chính bản ghi đã
     qua cổng. Không một lượt hỏi mạng nào trong cả lượt vẽ, nên không
     có cửa nào để rò. Xem src/ve-thi-giac.js.

     Loại hình chưa có bộ vẽ thì hộp này nói CHƯA CÓ và nói luôn đã vẽ
     được những loại nào — nói "không vẽ được" mà không nói vẽ được gì
     thì người dùng thử mò từng loại. */
  /* Bộ vẽ TỪ CHỐI khi phông thương hiệu chưa tải — mọi phép ngắt dòng
     của nó đo bằng phông đang có, nên đo bằng phông dự phòng rồi vẽ
     bằng phông thật là chữ tràn lề. Nên chờ ở ĐÂY, một lần, thay vì
     để người bấm nhận một lời từ chối họ không làm gì được. */
  G.ktVe = function (id, kho) {
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready &&
        !G._ktChuXong) {
      document.fonts.ready.then(function () {
        G._ktChuXong = 1; G.ktVe(id, kho);
      });
      return;
    }
    var d = G.ktDuLieu.kho;
    var x = ((d && d.ds) || []).filter(function (y) { return y.id === id; })[0];
    if (!x) return U.toast('Không tìm thấy bản ghi này trong sổ.', 'err');

    var biet = G.veThiGiacBiet ? G.veThiGiacBiet() : {kho: []};
    var r = G.veThiGiac(x, kho);
    U.modal('<h3>Vẽ thử · ' + h(x.loaiHinh) + '</h3>' +
      (r.ok
        ? '<p class="sm muted mt">' + h(r.kho + ' · ' + r.vi) + '</p>' +
          '<div class="mt" style="border:1px solid var(--vien-1);border-radius:12px;' +
          'overflow:hidden;line-height:0">' + r.svg + '</div>' +
          '<div class="row mt2" style="gap:8px;flex-wrap:wrap">' +
          biet.kho.map(function (m) {
            return '<button class="btn" onclick="G.ktVe(\'' + h(x.id) + '\',\'' +
              h(m.ma) + '\')">' + h(m.ten) + '</button>'; }).join('') + '</div>'
        : '<div class="card mt" style="border-left:3px solid var(--bad)">' +
          '<p class="sm">' + h(r.error) + '</p></div>') +
      '<div class="row mt2" style="gap:8px">' +
      '<button class="btn" onclick="U.closeModal()">Đóng</button></div>');
  };

  G.ktMoCham = function (id) {
    var muc = G.TG_DIEM || [];
    U.modal('<h3>Chấm thang điểm 100</h3>' +
      '<p class="sm muted mt">Đúng hệ thống nặng 25, thẩm mỹ 10. Một tấm rất đẹp mà ' +
      'sai Tầng thì tệ hơn một tấm xấu mà đúng — tấm đẹp được tin, và cái sai đi ' +
      'theo nó xa hơn.</p>' +
      muc.map(function (m) {
        return '<div class="mt"><label class="sm"><b>' + h(m.ten) + '</b> ' +
          '<span class="muted">trọng số ' + h(String(m.trong)) + ' · ' + h(m.hoi) +
          '</span></label>' +
          '<input id="ktD_' + h(m.ma) + '" class="inp" type="number" min="0" max="100" ' +
          'value="100"></div>';
      }).join('') +
      '<div class="row mt2" style="gap:8px">' +
      '<button class="btn primary" onclick="G.ktGuiCham(\'' + h(id) + '\')">Chấm</button>' +
      '<button class="btn" onclick="U.closeModal()">Thôi</button></div>');
  };
  G.ktGuiCham = function (id) {
    var cham = {};
    (G.TG_DIEM || []).forEach(function (m) {
      cham[m.ma] = Number(oGiaTri('ktD_' + m.ma) || 0);
    });
    G.goiMayChu('chamThiGiac', {id: id, cham: cham}).then(function (d) {
      if (!d.ok) return U.toast(d.error || 'Chưa chấm được', 'err');
      U.closeModal(); U.toast(d.diem + ' điểm · ' + d.bac); G.ktNap();
    });
  };

  /* ═══════════ NGĂN 3 · HIẾN PHÁP ═══════════ */
  function nganHienPhap() {
    if (!(G.TG_TANG || []).length)
      return U.empty('Hiến pháp thị giác chưa mở',
        'Kho nghề chưa nạp. Đăng nhập bằng vai có quyền nghề.', true);

    var o = '<div class="card"><p class="sm">' + h((G.TG_LUAT_GOC || {}).cot || '') +
      '</p><p class="sm muted mt">' + h((G.TG_LUAT_GOC || {}).vi || '') + '</p></div>';

    o += U.sec('Ranh giới từng chặng',
      'Ranh giới THẬT nằm ở bảng chặng — ô "gồm" và ô "không". Chỗ này chỉ thêm ' +
      'lớp thị giác: chặng ấy hứa được gì bằng hình.');
    o += U.tbl(['Chặng', 'Hình được hứa', 'Hình KHÔNG được hứa', 'Mật độ'],
      G.TG_TANG.map(function (t) {
        var hpt = (G.HP_TANG || []).filter(function (y) { return y.tang === t.tang; })[0];
        return ['<b>' + h(t.tang) + '</b><div class="tiny muted">' +
            h(((hpt && hpt.ten) || '').slice(0, 40)) + '</div>',
          h(t.hinhDuocHua),
          '<span style="color:var(--bad)">' + h(t.hinhKhongDuocHua) + '</span>',
          '<span class="sm muted">' + h(t.matDo) + '</span>'];
      }));

    o += U.sec('Mười hai loại hình — mỗi loại một nhiệm vụ');
    o += U.tbl(['Loại', 'Nhiệm vụ', 'Hợp chặng'],
      (G.TG_LOAIHINH || []).map(function (x) {
        return [h(x.ten), h(x.nhiemVu),
          '<span class="sm muted">' + h((x.hop || []).join(' ')) + '</span>'];
      }));

    o += U.sec('Mười điều cấm');
    o += '<div class="card"><ol class="sm">' + (G.TG_CAM || []).map(function (x) {
      return '<li>' + h(x.luat) + '</li>'; }).join('') + '</ol></div>';

    o += U.sec('Chỗ máy dừng lại',
      'Cùng luật với L-01 của bảng lương: máy làm phần của máy và nói thẳng phần ' +
      'nó không làm được.');
    o += (G.TG_CHOCHU || []).map(function (x) {
      return '<div class="card" style="border-left:3px solid var(--warn);margin-bottom:10px">' +
        '<b>' + h(x.ma + ' · ' + x.viec) + '</b>' +
        '<p class="sm muted mt">' + h(x.vi) + '</p></div>';
    }).join('');
    return o;
  }

  /* ═══════════ NGĂN 4 · SỔ LUẬT THƯƠNG HIỆU ═══════════ */
  function nganLuat() {
    var d = G.ktDuLieu.kho;
    var o = '<div class="card"><b>Đây là chỗ máy HỌC từ chủ hệ</b>' +
      '<p class="sm muted mt">Chủ hệ từ chối một hướng và nói vì sao; câu ấy ở lại, ' +
      'và mọi đề xuất sau đọc nó trước. Không có sổ này thì mỗi lượt thiết kế bắt ' +
      'đầu lại từ số không, và chủ hệ phải nói lại cùng một câu tới lần thứ mười ' +
      'thì thôi dùng.</p>' +
      (laChuHe()
        ? '<div class="row mt" style="gap:8px"><button class="btn primary" ' +
          'onclick="G.ktMoGhiLuat()">Ghi một luật</button></div>'
        : '<p class="tiny muted mt">Chỉ Super Admin ghi được.</p>') + '</div>';

    var ds = (d && d.ok && d.luatThuongHieu) || [];
    if (!ds.length)
      return o + U.empty('Sổ luật còn trống',
        'Chưa có quyết định thương hiệu nào được ghi.', true);

    o += U.sec('Luật đang có hiệu lực');
    o += ds.map(function (x) {
      return '<div class="card" style="margin-bottom:10px">' +
        U.chip(x.nhom, 'var(--teal)') +
        (x.hieuLuc === 'vinhVien' ? U.chip('vĩnh viễn', 'var(--gita)', true) : '') +
        '<b style="display:block;margin-top:8px">' + h(x.luat) + '</b>' +
        '<p class="sm muted mt">' + h(x.vi) + '</p>' +
        '<p class="tiny muted mt">' + h(x.boiAi + ' · ' +
          String(x.ghiLuc).slice(0, 10)) + '</p></div>';
    }).join('');
    return o;
  }

  G.ktMoGhiLuat = function () {
    U.modal('<h3>Ghi một luật thương hiệu</h3>' +
      '<p class="sm muted mt">Luật phải kèm LÝ DO. Không có lý do thì sáu tháng sau ' +
      'người ta gỡ nó ra, vì không ai biết gỡ thì hỏng gì.</p>' +
      '<div class="mt2"><label class="sm"><b>Nhóm</b></label>' +
      '<select id="ktLNhom" class="inp">' +
      '<option value="mau">Màu</option><option value="chu">Chữ</option>' +
      '<option value="bocuc">Bố cục</option><option value="giong">Giọng</option>' +
      '<option value="anh">Ảnh</option><option value="khac">Khác</option></select></div>' +
      '<div class="mt"><label class="sm"><b>Luật</b></label>' +
      '<input id="ktLLuat" class="inp" maxlength="500"></div>' +
      '<div class="mt"><label class="sm"><b>Vì sao</b></label>' +
      '<textarea id="ktLVi" class="inp" rows="3" maxlength="800"></textarea></div>' +
      '<div class="row mt2" style="gap:8px">' +
      '<button class="btn primary" onclick="G.ktGuiLuat()">Ghi</button>' +
      '<button class="btn" onclick="U.closeModal()">Thôi</button></div>');
  };
  G.ktGuiLuat = function () {
    G.goiMayChu('ghiLuatThuongHieu', {luat: {
      nhom: oGiaTri('ktLNhom'), luat: oGiaTri('ktLLuat'), vi: oGiaTri('ktLVi')
    }}).then(function (d) {
      if (!d.ok) return U.toast(d.error || 'Chưa ghi được', 'err');
      U.closeModal(); U.toast('Đã ghi — mọi đề xuất sau đọc luật này trước'); G.ktNap();
    });
  };

  /* ═══════════ MÀN CHÍNH ═══════════ */
  G.VIEWS['kien-truc-thi-giac'] = function () {
    if (!G.ktDuLieu.daGoi) { G.ktDuLieu.daGoi = true; G.ktNap(); }

    var o = U.ph({
      t: 'Kiến trúc sư thị giác',
      s: 'Hiểu hệ thống trước — hiểu nội dung — hiểu người dùng — rồi mới thiết kế.'
    });
    o += thanhNgan();

    if (G.ktNgan === 'docman')   return o + nganDocMan();
    if (G.ktNgan === 'tailieu')  return o + nganTaiLieu();
    if (G.ktNgan === 'dexuat')   return o + nganDeXuat();
    if (G.ktNgan === 'kho')      return o + nganKho();
    if (G.ktNgan === 'hienphap') return o + nganHienPhap();
    return o + nganLuat();
  };
})();
