/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÀN GITA SUPREME: BẢN ĐỒ VÀ TRẦN  (9.99.83)

   Theo tệp `MYVIP.doc` của chủ hệ — ba quyển, 410.000 ký tự:
   Quyển I nghiên cứu 14 nền tảng → ma trận 28 sức mạnh · Quyển II
   chuỗi 100.000 điểm chạm chia 10 lớp · Quyển III Kênh GITA Supreme
   100 phần.

   ══ MÀN NÀY TRÌNH BẢN ĐỒ VÀ CÁI TRẦN, CHƯA TRÌNH CÁI KÊNH ══

   Lần thứ tư thứ tự ấy được chọn, sau Hiến pháp (9.99.62), trần giám
   sát (9.99.76) và vòng tự nâng cấp (9.99.77). Ở đây lý do gắt hơn cả
   ba: bản đặc tả không mô tả một màn hình — nó mô tả MỘT MẠNG XÃ HỘI.
   Dựng mạng trước rồi mới hỏi luật nào áp cho nó thì tới lúc ấy mỗi
   tính năng đã có một luật riêng, và gom lại không gom được nữa.

   ══ NGĂN ĐẦU LÀ BẪY TÊN GỌI, KHÔNG PHẢI CHỖ VA ══

   Khác 9.99.76, nơi ngăn đầu là sáu điều cấm. Ở đây chỗ nguy nhất
   không phải một luật bị phạm — nó là BA THANG CÙNG TÊN "điểm chạm".
   Một luật bị phạm thì có người cãi; hai thang cùng tên thì không ai
   cãi, chúng chỉ lặng lẽ được đọc như một.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;
G.VIEWS = G.VIEWS || {};

(function () {
  var U = G.U, h = U.h, ic = U.ic;

  var NGAN = [
    {ma: 'ten',  ten: 'Bẫy tên gọi',      ic: 'shield'},
    {ma: 'va',   ten: 'Chỗ va · chỗ hợp', ic: 'pulse'},
    {ma: 'matran', ten: 'Ma trận 28',     ic: 'star'},
    {ma: 'lop',  ten: '10 lớp · 100 phần', ic: 'list'}
  ];

  G.supNgan = G.supNgan || 'ten';

  function veLai() {
    if (!G.S || G.S.view !== 'supreme') return;
    if (typeof document === 'undefined' || !document.getElementById('main')) return;
    G.render && G.render();
  }
  G.supMoNgan = function (ma) { G.supNgan = ma; veLai(); };

  /* ── NGĂN 1 · BẪY TÊN GỌI ── */
  function veTen() {
    var ds = G.SUP_THANG || [], lu = G.SUP_THANG_LUAT || {};
    /* U.sec() TỰ gọi U.h() trên tham số — truyền h(...) vào là thoát
       lần thứ hai và người đọc thấy &quot; giữa câu tiếng Việt. Lỗi này
       không sinh lỗi trang nên nó sống rất lâu (bản 9.24 gỡ 77 chỗ,
       9.99.70 mắc lại ở U.empty). Bộ rà soát chỗ trống bắt ngay. */
    var o = U.sec('Ba thang cùng mang chữ "điểm chạm"', lu.vaSao || '');
    o += U.tbl(['Mã', 'Thang', 'Gõ là gì', 'Tổng', 'Chốt ở đâu'],
      ds.map(function (t) {
        return [h(t.ma), h(t.ten), '<code>' + h(t.o) + '</code>',
          h(t.tong), h(t.chotO)];
      }));
    ds.forEach(function (t) {
      o += '<p class="note"><b>' + h(t.ten) + ':</b> ' + h(t.la) +
        ' <span class="muted">— dùng ở: ' + h(t.aiDung) + '</span></p>';
    });
    if (lu.cachGoi) o += '<p class="note">' + h(lu.cachGoi) + '</p>';
    if (lu.mucNao) o += '<p class="note">' + h(lu.mucNao) + '</p>';
    return o;
  }

  /* ── NGĂN 2 · CHỖ VA VÀ CHỖ BẮT OAN ──
     Hai bảng đi CÙNG NHAU, không tách ra hai ngăn. Nêu chỗ va mà giấu
     chỗ bắt oan thì người đọc tưởng cả bản đặc tả là sai rồi thôi
     không đọc — và lúc ấy bốn chỗ va thật cũng không ai đọc. */
  function veVa() {
    var ds = G.SUP_VA || [], oan = G.SUP_OAN || [], ol = G.SUP_OAN_LUAT || {};
    var o = U.sec('Bốn chỗ va MỚI — không chép lại sáu điều cấm đã có',
      'Sáu điều cấm của GITA-VIP (9.99.76) đã phủ bốn chỗ Quyển I–III đụng tới: ' +
      'xếp hạng người · sinh trắc trẻ · hạ cấp và đặt lại chuỗi · doạ mất chuỗi. ' +
      'Chép chúng sang đây là dựng bản thứ hai của một BẢNG CẤM — bản nguy nhất, ' +
      'vì sửa một bên thì bên kia vẫn chặn theo luật cũ mà cả hai vẫn xanh.');
    o += U.tbl(['Mã', 'Bản đặc tả đòi gì', 'Đếm được', 'Luật nào', 'Đường đi'],
      ds.map(function (v) {
        return [h(v.ma), h(v.doi), (v.dem ? v.dem + ' lần' : '—'),
          '<code>' + h(v.luat) + '</code>', h(v.duong)];
      }));
    ds.forEach(function (v) {
      o += '<p class="note"><b>' + h(v.ma) + ' · vì sao:</b> ' + h(v.viSao) + '</p>';
    });

    o += U.sec('Hai chỗ phép dò của tôi BẮT OAN', ol.bai || '');
    o += U.tbl(['Dấu hiệu', 'Khớp', 'Nguyên văn trong tài liệu', 'Sự thật'],
      oan.map(function (x) {
        return [h(x.dau), x.dem + ' lần', h(x.nguyenVan), h(x.that)];
      }));
    if (ol.vaSao) o += '<p class="note">' + h(ol.vaSao) + '</p>';
    return o;
  }

  /* ── NGĂN 3 · MA TRẬN 28 ── */
  function veMaTran() {
    var ds = G.SUP_CUM || [];
    var tong = ds.reduce(function (a, c) { return a + (c.nl || []).length; }, 0);
    var o = U.sec('Hai mươi tám sức mạnh, năm cụm',
      'Quyển I giải phẫu 14 nền tảng rồi trích ra "gen trội" của từng cái, hợp nhất ' +
      'thành hai mươi tám năng lực. Bảng này giữ CÁCH CHIA CỤM của bản đặc tả và ' +
      'không chấm điểm cụm nào — chấm điểm ở đây là tự chấm, đúng thứ thang 1000 ' +
      'điểm vừa phải tách hai ngăn để thôi làm (9.99.81).');
    o += U.tbl(['Cụm', 'Tên', 'Năng lực', 'Bao nhiêu'],
      ds.map(function (c) {
        return [h(c.ma), h(c.ten),
          (c.nl || []).join(' · '), String((c.nl || []).length)];
      }));
    o += '<p class="note">Tổng ' + tong + ' năng lực. ' +
      (tong === 28 ? 'Khớp con số bản đặc tả khai.'
        : '<b>LỆCH</b> với con số 28 bản đặc tả khai — nói ra chỗ lệch, ' +
          'im thì người đọc tự đếm rồi ngờ chính bản đặc tả.') + '</p>';
    return o;
  }

  /* ── NGĂN 4 · MƯỜI LỚP VÀ MỘT TRĂM PHẦN ── */
  function veLop() {
    var lop = G.SUP_LOP || [], khoi = G.SUP_KHOI || [], d = G.SUP_DEM || {};
    var o = U.sec('Mười lớp điểm chạm — hai vòng đồng tâm và một vành đai',
      'Mười lớp không xếp theo thời gian mà theo hai vòng đời người dùng, cộng một ' +
      'vành đai bắc qua mọi vòng. Cột "Tổng" cố ý KHÔNG ghi 10.000 cho mỗi lớp: con ' +
      'số ấy là một CHỈ TIÊU chủ hệ đặt, chưa phải một phép đếm — ghi vào bảng là để ' +
      'một chỉ tiêu đọc ra như một phép đo.');
    o += U.tbl(['Lớp', 'Tên', 'Vòng', 'Vì sao lớp này tồn tại'],
      lop.map(function (l) {
        return [h(l.ma), h(l.ten), h(l.vong), h(l.y)];
      }));

    var coChu = khoi.filter(function (k) { return k.daViet; })
      .reduce(function (a, k) { return a + (k.den - k.tu + 1); }, 0);
    o += U.sec('Một trăm phần — và chỗ bản đặc tả còn trống',
      'Đếm được thì đếm. Trình "100 phần" mà không nói bao nhiêu phần chưa có chữ ' +
      'nào thì người đọc tin là đã đủ — cùng luật với `conLaiChuaTrinh` của bản tin ' +
      'sáng (9.99.71): cắt im lặng tệ hơn trình ra con số thật.');
    o += U.tbl(['Khối', 'Tên', 'Phần', 'Đã viết'],
      khoi.map(function (k) {
        return [h(k.ma), h(k.ten), k.tu + '–' + k.den,
          k.daViet ? 'có' : '<b>CHƯA</b>'];
      }));
    o += '<p class="note"><b>' + coChu + '/' + (d.khai || 100) +
      ' phần đã có chữ</b> · còn ' + ((d.khai || 100) - coChu) +
      ' phần trống. ' + h(d.vi || '') + '</p>';
    return o;
  }

  var VE = {ten: veTen, va: veVa, matran: veMaTran, lop: veLop};

  G.VIEWS['supreme'] = function () {
    /* Chặn ở MỘT chỗ, trước cả thanh ngăn — bài học 9.99.63: vai không
       có kho thì cả bốn ngăn vẫn dựng ra bảng có đầu cột mà không có
       dòng, và một khung rỗng đọc ra là "chỗ này chưa làm xong". */
    if (!G.SUP_THANG || !G.SUP_THANG.length) {
      return U.ph({eyebrow: 'GITA SUPREME', ic: 'shield', t: 'Bản đồ và trần',
        lead: 'Màn này đọc kho nghiên cứu của chủ hệ, và kho ấy nằm trong gói nghề.'}) +
        '<div class="card"><p>Vai đang dùng chưa được cấp gói nghề, nên bốn ngăn ' +
        'của màn này không có dữ liệu để dựng. Đây không phải một chỗ chưa làm ' +
        'xong — đây là phạm vi cấp phép đang chạy đúng.</p>' +
        '<p class="note">Thứ nằm trong màn này là bản đồ một tài liệu nghiên cứu ' +
        'nội bộ: bảng chỗ va giữa bản đặc tả mới với luật đã chốt, ma trận hai mươi ' +
        'tám năng lực, mười lớp điểm chạm, và tiến độ một trăm phần. Nó phục vụ ' +
        'người DỰNG hệ, không phải người DÙNG hệ — nên nó ở gói nghề là đúng chỗ.</p>' +
        '<p class="note">Lời hứa với gia đình nằm ở màn <b>Luật giao diện</b>: ' +
        'mười hai luật ấy đọc được với mọi vai, vì chúng là lời hứa VỚI gia đình ' +
        'chứ không phải mã nguồn của hệ.</p></div>';
    }

    var o = U.ph({eyebrow: 'GITA SUPREME · QUYỂN I–III', ic: 'shield', grad: 1,
      t: 'Bản đồ và trần',
      lead: 'Bản đặc tả 410.000 ký tự không mô tả một màn hình — nó mô tả một mạng ' +
        'xã hội. Nên dựng CÁI TRẦN trước, lần thứ tư trong kho này. Ngăn đầu không ' +
        'phải chỗ va mà là bẫy tên gọi: một luật bị phạm thì có người cãi, hai thang ' +
        'cùng tên thì không ai cãi — chúng chỉ lặng lẽ được đọc như một.'});

    o += '<div class="row wrap mb" style="gap:8px">' + NGAN.map(function (n) {
      var on = G.supNgan === n.ma;
      return '<button class="btn' + (on ? ' pri' : '') +
        '" onclick="G.supMoNgan(\'' + n.ma + '\')">' +
        ic(n.ic, 'w-3 h-3') + ' ' + h(n.ten) + '</button>';
    }).join('') + '</div>';

    o += (VE[G.supNgan] || veTen)();
    return o;
  };
})();
