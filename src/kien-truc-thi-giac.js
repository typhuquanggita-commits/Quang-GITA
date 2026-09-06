/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÀN KIẾN TRÚC SƯ THỊ GIÁC

   Chốt của chủ hệ thống bản 9.99.10: "Hiểu hệ thống trước — hiểu nội
   dung — hiểu người dùng — rồi mới thiết kế."

   ══ MÀN NÀY KHÔNG VẼ ẢNH, VÀ NÓI THẲNG RA NGAY DÒNG ĐẦU ══

   Nó dựng ĐỀ BÀI THIẾT KẾ và giữ cổng duyệt. Người dùng mở ra mà tưởng
   sắp có ảnh thì họ thất vọng ở giây thứ ba; nói trước thì họ dùng đúng
   thứ nó làm được.

   ══ BỐN NGĂN, VÀ THỨ TỰ LÀ MỘT QUYẾT ĐỊNH ══

     đề xuất  — chỗ làm việc, mở ra là làm được ngay
     kho      — mọi đề xuất, cây phiên bản, chặn ở đâu
     hiến pháp— tra cứu ranh giới Tầng và luật
     luật     — sổ quyết định thương hiệu, bộ nhớ dài hạn

   Hiến pháp KHÔNG đứng đầu dù nó là bộ não: người ta mở tra cứu khi có
   một câu hỏi cụ thể, không phải để đọc mỗi ngày.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  var U = G.U, h = U.h, ic = U.ic;

  var NGAN = [
    {ma: 'dexuat',  ten: 'Đề xuất',    ic: 'plus'},
    {ma: 'kho',     ten: 'Kho',        ic: 'vault'},
    {ma: 'hienphap',ten: 'Hiến pháp',  ic: 'book'},
    {ma: 'luat',    ten: 'Luật',       ic: 'shield'}
  ];

  G.ktNgan = G.ktNgan || 'dexuat';
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

  /* ═══════════ NGĂN 1 · ĐỀ XUẤT ═══════════ */
  function nganDeXuat() {
    var d = G.ktDuLieu.kho;
    var loai = (d && d.ok && d.loaiHinh) || [];
    var nx = (d && d.ok && d.nguoiXem) || [];
    var tang = (d && d.ok && d.thuTuTang) || ['T1', 'T2', 'T3', 'T4', 'T5'];
    var hp = G.TG_LOAIHINH || [];

    var o = '<div class="card"><b>Máy dựng ĐỀ BÀI THIẾT KẾ, không vẽ ảnh</b>' +
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
        return '<option value="' + h(t) + '">' + h(t + ' — ' +
          ((hpt && hpt.ten) || (x && x.ngonNgu) || t).slice(0, 60)) + '</option>';
      }).join('') + '</select></div>' +

      '<div class="mt"><label class="sm"><b>Loại hình</b> ' +
      '<span class="muted">(mỗi loại đúng MỘT nhiệm vụ)</span></label>' +
      '<select id="ktLoai" class="inp">' + loai.map(function (m) {
        var x = hp.filter(function (y) { return y.ma === m; })[0];
        return '<option value="' + h(m) + '">' +
          h(((x && x.ten) || m) + ((x && x.nhiemVu) ? ' — ' + x.nhiemVu : '')) +
          '</option>';
      }).join('') + '</select></div>' +

      '<div class="mt"><label class="sm"><b>Nhiệm vụ DUY NHẤT của tấm này</b></label>' +
      '<input id="ktNhiemVu" class="inp" maxlength="300" ' +
      'placeholder="Viết một câu. Viết không nổi một câu nghĩa là nó đang mang hai việc."></div>' +

      '<div class="mt"><label class="sm"><b>Cho ai xem</b></label>' +
      '<div class="row" style="gap:12px;flex-wrap:wrap;margin-top:6px">' +
      nx.map(function (m) {
        var x = (G.TG_NGUOI || []).filter(function (y) { return y.ma === m; })[0];
        return '<label class="sm" style="display:flex;gap:6px;align-items:center">' +
          '<input type="checkbox" class="ktNX" value="' + h(m) + '"> ' +
          h((x && x.ten) || m) + '</label>';
      }).join('') + '</div></div>' +

      '<div class="mt"><label class="sm"><b>Nội dung cần truyền đạt</b></label>' +
      '<textarea id="ktNoiDung" class="inp" rows="4" maxlength="4000" ' +
      'placeholder="Máy đọc chỗ này để soi Tầng. Viết đủ thì cổng Tầng làm được việc."></textarea></div>' +

      '<div class="mt"><label class="sm"><b>Bố cục</b> <span class="muted">(không bắt buộc)</span></label>' +
      '<input id="ktBoCuc" class="inp" maxlength="200"></div>' +
      '<div class="mt"><label class="sm"><b>Đặt ở đâu trên giao diện</b> ' +
      '<span class="muted">(không bắt buộc)</span></label>' +
      '<input id="ktViTri" class="inp" maxlength="200" placeholder="ví dụ: trang chặng T1 › phần 2"></div>' +

      '<div class="row mt2" style="gap:8px">' +
      '<button class="btn primary" onclick="G.ktGuiDeXuat()">Đề xuất</button></div>' +
      '</div>';

    if (G.ktDap) {
      var r = G.ktDap;
      o += r.ok
        ? '<div class="card" style="border-left:3px solid var(--ok);margin-top:14px">' +
          '<b>Đã qua cổng Tầng · ' + h(r.id) + '</b>' +
          '<p class="sm muted mt">' + h(r.soatTang || '') + '</p>' +
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

    if (G.ktNgan === 'dexuat')   return o + nganDeXuat();
    if (G.ktNgan === 'kho')      return o + nganKho();
    if (G.ktNgan === 'hienphap') return o + nganHienPhap();
    return o + nganLuat();
  };
})();
