/* GEN VIỆT 365 · lớp dựng giao diện.
   Không thư viện ngoài. Đọc GV từ du-lieu.js rồi dựng ra HTML.
   Quy tắc: mọi chuỗi đi vào HTML đều qua e() — kể cả chuỗi của chính mình,
   vì kho sẽ được người khác biên tập trong ba mươi năm tới. */
'use strict';
(function () {
  var G = window.GV;

  function e(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function ds(a, f) { return (a || []).map(f).join(''); }

  /* ── mào đầu ─────────────────────────────────────── */
  function mao() {
    var m = G.META;
    return '<header class="mao">' +
      '<div class="day"><span>' + e(m.ten) + '</span><b>' + e(m.phu) + '</b>' +
        '<b>Bản ' + e(m.ban) + '</b><b>' + e(m.tam) + '</b></div>' +
      '<h1>Kiến trúc một hệ thống <em>tự tái tạo</em> nhân tài Việt</h1>' +
      '<p class="dan">' + e(m.motCau) + '</p>' +
      '<div class="so">' +
        '<div><b>7</b><span>lớp kiến trúc</span></div>' +
        '<div><b>6</b><span>bậc nhân tài</span></div>' +
        '<div><b>12</b><span>trục năng lực</span></div>' +
        '<div><b>5</b><span>hình thái huấn luyện</span></div>' +
        '<div><b>30</b><span>năm · 6 chặng</span></div>' +
      '</div></header>';
  }

  /* ── mục lục ─────────────────────────────────────── */
  function mucLuc() {
    return '<nav class="muc" aria-label="Mục lục">' + ds(G.MUC_LUC, function (o, i) {
      return '<a href="#' + e(o.id) + '" data-di="' + e(o.id) + '">' +
        '<span class="n">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' +
        '<span class="t">' + e(o.t) + '</span>' +
        '<span class="p">' + e(o.p) + '</span></a>';
    }) + '</nav>';
  }

  function dau(k, t, p) {
    return '<div class="dau"><span class="k">' + e(k) + '</span><h2>' + e(t) + '</h2>' +
      (p ? '<p>' + e(p) + '</p>' : '') + '</div>';
  }

  /* ── 1 · mở đầu ──────────────────────────────────── */
  function moDau() {
    return '<section id="mo-dau">' +
      dau('Mở đầu', 'Hệ này là gì, và vì sao phải dựng nó bây giờ',
        'Học viện GITA đã có một hệ giải pháp năm tầng chạy được trên gia đình thật. Cái còn thiếu là hệ chịu trách nhiệm về mười, hai mươi, ba mươi năm tiếp theo của những em giỏi nhất đi qua đó.') +
      '<p>GEN VIỆT 365 không phải một chương trình học. Nó là <strong>hệ điều hành phát triển con người</strong> của Học viện: nơi một em bé bảy tuổi bước vào ở bậc Hạt, và ba mươi năm sau có thể ngồi trong Hội đồng Chuẩn quyết định điều gì là đúng cho thế hệ tiếp theo. Toàn bộ kiến trúc dưới đây phục vụ đúng một vòng lặp ấy — và phục vụ nó tới mức hệ thống không cần người sáng lập để chạy tiếp.</p>' +
      '<blockquote class="trich">GITA không huấn luyện một hành vi đơn lẻ. GITA kiến tạo một hệ điều hành phát triển cá nhân.<cite>Hệ thống giải pháp GITA · Chương 13</cite></blockquote>' +
      '<p>Bản thiết kế này lấy toàn bộ tài sản đã có làm nền: mô thức G–I–T–A, ma trận 8 × 8, năm tầng T1–T5, 1.000 kịch bản, 220 phác đồ, 550 tình huống, bộ sách <em>Nôi Nuôi Dưỡng Nhân Tài</em>, bộ quy chuẩn CLB Gen Việt và mã nguồn hệ thống v8.0. Không có gì bị bỏ đi. Thứ được thêm vào là <strong>chiều dọc thời gian</strong> — thứ mà một hệ xử lý ca, dù chặt tới đâu, cũng không tự có.</p>' +
      '</section>';
  }

  /* ── 2 · định vị ─────────────────────────────────── */
  function dinhVi() {
    var d = G.DINH_VI;
    return '<section id="dinh-vi">' +
      dau('Định vị', 'Hai hệ, hai câu hỏi', d.ly) +
      '<div class="cuon"><table><thead><tr>' +
        '<th>Trục so sánh</th><th>GITA 365 — hệ giải pháp</th><th>GEN VIỆT 365 — hệ huấn luyện</th>' +
      '</tr></thead><tbody>' + ds(d.bang, function (r) {
        return '<tr><td><strong>' + e(r.truc) + '</strong></td>' +
          '<td class="mo">' + e(r.gita) + '</td><td>' + e(r.gv) + '</td></tr>';
      }) + '</tbody></table></div>' +
      '<p>Hai hệ dùng chung một kho, chung một bảng phân quyền, chung một mô thức. Chúng khác nhau ở <strong>đơn vị công việc</strong>: một bên đóng ca, một bên không bao giờ đóng.</p>' +
      '</section>';
  }

  /* ── 3 · nguyên lý ───────────────────────────────── */
  function nguyenLy() {
    return '<section id="nguyen-ly">' +
      dau('Lớp L0', 'Bảy nguyên lý bất biến',
        'Đây là lớp đổi chậm nhất. Mọi thứ khác trong ba mươi năm tới được phép đổi; bảy điều này chỉ đổi bởi Hội đồng Chuẩn, và mỗi lần đổi phải ghi lý do vào Sổ Chuẩn.') +
      '<div class="luoi hai">' + ds(G.NGUYEN_LY, function (o) {
        return '<div class="the ly">' +
          '<div class="stt">' + o.so + '</div>' +
          '<div><h3>' + e(o.t) + '</h3><p>' + e(o.n) + '</p>' +
          '<p class="vi">' + e(o.v) + '</p></div></div>';
      }) + '</div></section>';
  }

  /* ── 4 · kiến trúc ───────────────────────────────── */
  function kienTruc() {
    var td = G.TRUC_DOC;
    return '<section id="kien-truc">' +
      dau('Kiến trúc', 'Bảy lớp, xếp theo tốc độ đổi',
        'Nguyên tắc duy nhất giữ cho một hệ thống ba mươi năm không rối: lớp đổi nhanh được phép phụ thuộc lớp đổi chậm, không bao giờ ngược lại.') +
      '<div class="thap">' + ds(G.LOP, function (o) {
        return '<div class="tang"><div class="ma">' + e(o.ma) + '</div>' +
          '<div class="noi"><div class="hang"><h3>' + e(o.t) + '</h3>' +
          '<span class="toc">' + e(o.toc) + '</span></div>' +
          '<div class="giu">' + e(o.giu) + '</div>' +
          '<div class="ai">Người giữ: ' + e(o.ai) + '</div>' +
          '<div class="chi">' + e(o.chi) + '</div></div></div>';
      }) + '</div>' +
      '<div class="the"><span class="nhan">Trục dọc xuyên bảy lớp</span>' +
        '<h3 style="margin-top:10px">' + e(td.t) + '</h3><p>' + e(td.n) + '</p>' +
        '<div class="cuon" style="margin-top:14px"><table><thead><tr><th>Trường</th><th>Nội dung</th></tr></thead><tbody>' +
        ds(td.truong, function (r) {
          return '<tr><td><strong>' + e(r.k) + '</strong></td><td class="mo">' + e(r.v) + '</td></tr>';
        }) + '</tbody></table></div></div>' +
      '</section>';
  }

  /* ── 5 · sáu bậc ─────────────────────────────────── */
  function bac() {
    return '<section id="bac">' +
      dau('Dòng chảy người', 'Sáu bậc nhân tài',
        'Bậc không lên theo tuổi và không lên theo thời gian ở lại. Bậc lên theo bằng chứng, và bằng chứng ở mỗi bậc là một loại khác nhau.') +
      '<div class="luoi hai">' + ds(G.BAC, function (o) {
        return '<article class="bac" style="--c:' + e(o.mau) + '">' +
          '<div class="top"><div class="hang"><span class="m">' + e(o.ma) + '</span>' +
            '<h3>' + e(o.t) + '</h3><span class="tuoi">' + e(o.tuoi) + '</span></div>' +
            '<div class="hoi">' + e(o.hoi) + '</div></div>' +
          '<dl>' +
            '<div><dt>Đích của bậc</dt><dd class="manh">' + e(o.dich) + '</dd></div>' +
            '<div><dt>Trục trọng tâm</dt><dd>' + e(o.truc) + '</dd></div>' +
            '<div><dt>Bằng chứng</dt><dd>' + e(o.bang) + '</dd></div>' +
            '<div><dt>Cổng nghiệm thu</dt><dd>' + e(o.cong) + '</dd></div>' +
            '<div><dt>Thời gian tối thiểu · người chịu trách nhiệm</dt><dd>' + e(o.toi) + ' · ' + e(o.ai) + '</dd></div>' +
          '</dl></article>';
      }) + '</div>' +
      '<p><strong>Điểm gập của toàn bộ kiến trúc nằm ở bậc 5.</strong> Từ bậc này trở đi, sản phẩm của hệ thống trở thành lực lượng của chính hệ thống. Đó là lý do một tầm nhìn ba mươi năm khả thi: không phải vì tuyển được nhiều hơn, mà vì mỗi người bậc 5 rèn được người tiếp theo — và chỉ số quan trọng nhất của cả hệ là <em>hệ số tự tái tạo</em>.</p>' +
      '</section>';
  }

  /* ── 6 · khung năng lực ──────────────────────────── */
  function nangLuc() {
    return '<section id="nang-luc">' +
      dau('Lớp L1', 'Khung năng lực: bốn trụ × mười hai trục × năm mức',
        'Mười hai trục lấy nguyên từ hệ KPI nâng cao Tầng 5, xếp lại dưới bốn trụ G–I–T–A để nhìn một dòng là biết nó thuộc miền nào.') +
      '<div class="luoi hai">' + ds(G.TRU, function (o) {
        return '<div class="tru" style="--c:' + e(o.mau) + '">' +
          '<div class="dinh"><div class="k">' + e(o.k) + '</div>' +
            '<h3>' + e(o.t) + '</h3><div class="hoi">' + e(o.hoi) + '</div></div>' +
          '<ul>' + ds(o.truc, function (t) {
            return '<li><span class="n">' + t.so + '</span><div><b>' + e(t.t) + '</b>' +
              '<span>' + e(t.do) + ' · ' + e(t.bang) + ' · ' + e(t.ky) + '</span></div></li>';
          }) + '</ul></div>';
      }) + '</div>' +
      '<h3 style="margin:8px 0 0; font-size:15px">Thang năm mức — dùng chung cho cả mười hai trục</h3>' +
      '<div class="thang">' + ds(G.MUC, function (o) {
        return '<div class="nac"><div class="m">' + o.m + '</div><div class="noi">' +
          '<b>' + e(o.t) + '</b><span>Quyền điều hành: ' + e(o.quyen) + '</span>' +
          '<span>Mức hỗ trợ: ' + e(o.ho) + '</span><span>Bằng chứng: ' + e(o.bang) + '</span>' +
          '</div></div>';
      }) + '</div>' +
      '<h3 style="margin:8px 0 0; font-size:15px">Cổng định lượng: bậc nào đòi hồ sơ nào</h3>' +
      '<div class="cuon"><table><thead><tr><th>Bậc</th><th>Đòi hỏi tối thiểu</th><th>Điều kiện trục chính</th></tr></thead><tbody>' +
      ds(G.BAC_MUC, function (r) {
        return '<tr><td class="co">' + e(r.bac) + '</td><td>' + e(r.doi) + '</td><td class="mo">' + e(r.chinh) + '</td></tr>';
      }) + '</tbody></table></div>' +
      '<p>Bảng này là thứ khiến hệ thống <strong>chấm được bởi người thứ ba</strong>. Một Assessor chưa từng gặp học viên vẫn nghiệm thu được, vì mọi ô đều có đơn vị đo và bằng chứng đi kèm — đó là điều kiện cần để chuẩn không loãng khi mở ra mười vùng.</p>' +
      '</section>';
  }

  /* ── 7 · nhịp ────────────────────────────────────── */
  function nhip() {
    return '<section id="nhip">' +
      dau('Lớp L3', 'Nhịp 365 — đồng hồ của hệ thống',
        'Bảy chu kỳ lồng vào nhau. Mỗi chu kỳ có đúng một đầu ra, và đầu ra của chu kỳ nhỏ là nguyên liệu của chu kỳ lớn.') +
      '<div class="the" style="padding:4px 22px">' + ds(G.NHIP, function (o) {
        return '<div class="nhip"><div class="cot">' + e(o.chu) + '</div>' +
          '<div class="noi"><b>' + e(o.viec) + '</b>' +
          '<span class="ai">' + e(o.ai) + ' → ' + e(o.ra) + '</span>' +
          '<span class="vi">' + e(o.vi) + '</span></div></div>';
      }) + '</div></section>';
  }

  /* ── 8 · hình thái ───────────────────────────────── */
  function hinhThai() {
    return '<section id="hinh-thai">' +
      dau('Lớp L3', 'Năm hình thái huấn luyện',
        'Không thay nhau — chồng lên nhau. Một học viên bậc 3 thường nằm trong bốn hình thái cùng lúc. Gia đình không phải hình thái thứ sáu; nó là môi trường bao trùm cả năm.') +
      '<div class="cuon"><table><thead><tr>' +
        '<th>Mã</th><th>Hình thái</th><th>Nhịp</th><th>Mạnh ở</th><th>Yếu ở</th><th>Dùng khi</th><th>Bậc</th>' +
      '</tr></thead><tbody>' + ds(G.HINH_THAI, function (o) {
        return '<tr><td class="co">' + e(o.ma) + '</td><td><strong>' + e(o.t) + '</strong></td>' +
          '<td class="mo">' + e(o.nhip) + '</td><td class="mo">' + e(o.manh) + '</td>' +
          '<td class="mo">' + e(o.yeu) + '</td><td class="mo">' + e(o.dung) + '</td>' +
          '<td class="co">' + e(o.bac) + '</td></tr>';
      }) + '</tbody></table></div>' +
      '<p>Câu lạc bộ Gen Việt là <strong>xương sống</strong>, không phải hoạt động phụ. Trại tạo bước ngoặt, kèm 1-1 gỡ nút thắt, nhưng thứ giữ người qua các chu kỳ và tạo chỗ cho bậc 5 thực tập dẫn dắt là nhịp tuần của câu lạc bộ — với bộ quy chuẩn trang phục, nhận diện và giao tiếp đã có sẵn.</p>' +
      '</section>';
  }

  /* ── 9 · hệ đo ───────────────────────────────────── */
  function doLuong() {
    return '<section id="do-luong">' +
      dau('Hệ đo', 'Băng màu cho từng nhà · chỉ số cho toàn hệ',
        'Bốn băng đo tình trạng một gia đình ngay lúc này. Bảy chỉ số hệ đo xem cả hệ thống có đang đi đúng hướng ba mươi năm hay không.') +
      '<div class="bang">' + ds(G.BANG_MAU, function (o) {
        return '<div class="o" style="--c:' + e(o.mau) + '"><div class="dai"></div><div class="noi">' +
          '<b>' + e(o.b) + '</b><p>' + e(o.n) + '</p>' +
          '<p style="color:var(--muc)">' + e(o.lam) + '</p>' +
          '<div class="cham">Nhịp chạm: ' + e(o.cham) + '</div></div></div>';
      }) + '</div>' +
      '<p>Băng <strong>độc lập với bậc</strong>: một nhà ở bậc 4 vẫn có thể rơi xuống ĐỎ, một nhà bậc 1 vẫn có thể XANH. Trộn hai trục này là lỗi thường gặp nhất khi đọc bảng số.</p>' +
      '<h3 style="margin:8px 0 0; font-size:15px">Bảy chỉ số của hệ thống</h3>' +
      '<div class="cuon"><table><thead><tr><th>Chỉ số</th><th>Vì sao đo</th><th>Đơn vị</th></tr></thead><tbody>' +
      ds(G.KPI_HE, function (r) {
        return '<tr><td><strong>' + e(r.t) + '</strong></td><td class="mo">' + e(r.vi) + '</td>' +
          '<td class="co so-cot">' + e(r.dv) + '</td></tr>';
      }) + '</tbody></table></div>' +
      '<blockquote class="trich">Không nâng cấp theo thời gian; nâng theo bằng chứng năng lực.<cite>GITA Tầng 4 · nguyên tắc gốc, giữ nguyên cho toàn bộ sáu bậc</cite></blockquote>' +
      '</section>';
  }

  /* ── 10 · mã hoá & dữ liệu ───────────────────────── */
  function maHoa() {
    var g = G.GHEP_KHONG_LUU;
    return '<section id="ma-hoa">' +
      dau('Lớp L2', 'Mã hoá và dữ liệu — xương sống kỹ thuật',
        'Một mã phải đọc được bằng mắt, không cần tra bảng. Đây là thứ giữ cho một kho ba mươi năm không biến thành đống tài liệu vô danh.') +
      '<div class="cuon"><table><thead><tr><th>Mã mẫu</th><th>Là gì</th><th>Đọc thế nào</th></tr></thead><tbody>' +
      ds(G.MA_HOA, function (r) {
        return '<tr><td class="co">' + e(r.ma) + '</td><td><strong>' + e(r.la) + '</strong></td>' +
          '<td class="mo">' + e(r.gt) + '</td></tr>';
      }) + '</tbody></table></div>' +
      '<div class="the"><span class="nhan">Nguyên tắc kho</span><h3 style="margin-top:10px">' + e(g.t) + '</h3>' +
        '<p>' + e(g.n) + '</p><p class="vi">' + e(g.vi) + '</p></div>' +
      '<h3 style="margin:8px 0 0; font-size:15px">Ba tầng lưu trữ</h3>' +
      '<div class="luoi ba">' + ds(G.LUU_BA_TANG, function (o) {
        return '<div class="the"><h3>' + e(o.t) + '</h3><p>' + e(o.gi) + '</p>' +
          '<p class="vi">' + e(o.mat) + '</p></div>';
      }) + '</div>' +
      '<h3 style="margin:8px 0 0; font-size:15px">Lộ trình công nghệ ba chặng</h3>' +
      '<div class="cuon"><table><thead><tr><th>Chặng</th><th>Làm gì</th><th>Được</th><th>Hạn</th><th>Điều kiện bắt buộc</th></tr></thead><tbody>' +
      ds(G.CONG_NGHE, function (r) {
        return '<tr><td><strong>' + e(r.ten) + '</strong><br><span class="co">' + e(r.chang) + '</span></td>' +
          '<td class="mo">' + e(r.lam) + '</td><td class="mo">' + e(r.duoc) + '</td>' +
          '<td class="mo">' + e(r.han) + '</td><td>' + e(r.phai) + '</td></tr>';
      }) + '</tbody></table></div>' +
      '</section>';
  }

  /* ── 11 · vận hành ───────────────────────────────── */
  function vanHanh() {
    var t = G.TAI_CHINH;
    return '<section id="van-hanh">' +
      dau('Lớp L4', 'Vận hành: ai làm gì, và tiền đi đường nào',
        'Mười lăm vai của hệ thống hiện tại giữ nguyên. Năm vai mới được thêm vào — tất cả đều thuộc phần mà một hệ huấn luyện nhân tài cần mà hệ xử lý ca không cần.') +
      '<div class="luoi hai">' + ds(G.VAI, function (n) {
        return '<div class="the"><span class="nhan">' + e(n.nhom) + '</span>' +
          '<ul style="list-style:none;margin:12px 0 0;padding:0;display:grid;gap:9px">' +
          ds(n.ds, function (v) {
            return '<li style="font-size:13.5px"><b>' + e(v.v) + '</b>' +
              (v.moi ? ' <span class="nhan" style="background:var(--the3);color:var(--muc2)">mới</span>' : '') +
              '<br><span style="color:var(--muc2);font-size:12.5px">' + e(v.l) + '</span></li>';
          }) + '</ul></div>';
      }) + '</div>' +
      '<div class="the" style="border-left:3px solid var(--lua)">' +
        '<h3 style="font-family:var(--tit);font-size:21px">' + e(t.luat) + '</h3>' +
        '<p>' + e(t.vi) + '</p></div>' +
      '<div class="cuon"><table><thead><tr><th>Dòng tiền</th><th>Vai trò trong hệ</th><th>Tỷ trọng mục tiêu</th></tr></thead><tbody>' +
      ds(t.dong, function (r) {
        return '<tr><td><strong>' + e(r.t) + '</strong></td><td class="mo">' + e(r.vai) + '</td>' +
          '<td class="so-cot">' + e(r.ty) + '</td></tr>';
      }) + '</tbody></table></div>' +
      '<div class="the"><span class="nhan">' + e(t.quy.t) + '</span>' +
        '<p style="margin-top:10px"><strong>' + e(t.quy.n) + '</strong></p>' +
        '<p>' + e(t.quy.dung) + '</p><p class="vi">' + e(t.quy.vi) + '</p></div>' +
      '</section>';
  }

  /* ── 12 · rủi ro ─────────────────────────────────── */
  function ruiRo() {
    return '<section id="rui-ro">' +
      dau('Lớp L6', 'Bảy rủi ro và phanh tương ứng',
        'Một tầm nhìn ba mươi năm không chết vì thiếu ý tưởng. Nó chết vì bảy thứ dưới đây, và mỗi thứ chỉ dừng được bằng một cái phanh cụ thể, đặt sẵn từ trước.') +
      '<div class="the">' + ds(G.RUI_RO, function (o) {
        return '<div class="rui"><div class="cham"></div><div>' +
          '<h3>' + e(o.t) + '</h3><span class="dh">Dấu hiệu: ' + e(o.dau) + '</span>' +
          '<div class="phanh"><b>Phanh</b>' + e(o.phanh) + '</div></div></div>';
      }) + '</div></section>';
  }

  /* ── 13 · ba mươi năm ────────────────────────────── */
  function loTrinh() {
    return '<section id="lo-trinh">' +
      dau('Tầm nhìn', 'Ba mươi năm, sáu chặng',
        'Mỗi chặng có một câu hỏi trung tâm và một cổng. Không qua cổng thì không sang chặng sau — kể cả khi lịch đã tới.') +
      '<div class="tram">' + ds(G.CHANG, function (o) {
        return '<article class="chang" style="--c:' + e(o.mau) + '">' +
          '<div class="top"><div class="hang"><span class="m">' + e(o.ma) + '</span>' +
            '<h3>' + e(o.t) + '</h3><span class="nam">' + e(o.nam) + '</span></div>' +
            '<div class="hoi">' + e(o.hoi) + '</div></div>' +
          '<div class="than">' +
            '<div><h4>Việc lõi</h4><ul>' + ds(o.lam, function (x) { return '<li>' + e(x) + '</li>'; }) + '</ul></div>' +
            '<div><h4>Đích</h4><div class="dich">' + ds(o.dich, function (x) { return '<span>' + e(x) + '</span>'; }) + '</div></div>' +
            '<div><h4>Cổng sang chặng sau</h4><div class="cong">' + e(o.cong) + '</div></div>' +
            '<div class="rui-c">Rủi ro chính: ' + e(o.rui) + '</div>' +
          '</div></article>';
      }) + '</div>' +
      '<p>Ba lần chuyển giao thế hệ người dẫn nằm ở chặng 2, chặng 4 và chặng 6. <strong>Lần đầu phải bắt đầu ở chặng 2, không phải chặng 6.</strong> Một tổ chức bắt đầu nghĩ về kế thừa khi người sáng lập sắp nghỉ là một tổ chức đã muộn mười lăm năm.</p>' +
      '</section>';
  }

  /* ── 14 · 90 ngày ────────────────────────────────── */
  function batTay() {
    return '<section id="bat-tay">' +
      dau('Làm ngay', 'Chín mươi ngày đầu tiên',
        'Không có phần nào dưới đây cần thêm người, thêm tiền hay thêm phần mềm. Toàn bộ chạy được bằng đội ngũ và hệ thống hiện có.') +
      '<div class="cuon"><table><thead><tr><th>Mốc</th><th>Việc</th><th>Ai</th><th>Đầu ra</th></tr></thead><tbody>' +
      ds(G.NGAY_90, function (r) {
        return '<tr><td class="co">' + e(r.tuan) + '</td><td>' + e(r.viec) + '</td>' +
          '<td class="mo">' + e(r.ai) + '</td><td><strong>' + e(r.ra) + '</strong></td></tr>';
      }) + '</tbody></table></div>' +
      '<p>Thứ tự trong bảng là bắt buộc. Đánh mã kho trước khi khoá bảng chuẩn năng lực thì phải đánh lại lần hai; xếp bậc trước khi có cổng mẫu thì mỗi Coach xếp một kiểu, và bản đồ bậc đầu tiên của cả hệ sẽ sai ngay từ ngày lập ra.</p>' +
      '</section>';
  }

  /* ── 15 · nguồn ──────────────────────────────────── */
  function nguon() {
    return '<section id="nguon">' +
      dau('Nguồn', 'Tài liệu đã dùng để dựng bản thiết kế này',
        'Phần chuyên môn rút trọn vẹn từ kho tài liệu sẵn có của Học viện. Thứ duy nhất mượn từ bên ngoài là khung tổ chức chi hội của BNI — mượn cấu trúc vận hành, không mượn động cơ kinh tế.') +
      '<div class="cuon"><table><thead><tr><th>Tài liệu</th><th>Phần được dùng</th></tr></thead><tbody>' +
      ds(G.NGUON, function (r) {
        return '<tr><td><strong>' + e(r.t) + '</strong></td><td class="mo">' + e(r.l) + '</td></tr>';
      }) + '</tbody></table></div></section>';
  }

  function chan() {
    var m = G.META;
    return '<footer class="chan"><b>' + e(m.ten) + '</b>' +
      '<span>Bản ' + e(m.ban) + ' · ' + e(m.tam) + '</span>' +
      '<span>' + e(m.hocVien) + '</span>' +
      '<span>' + e(m.suMenh) + '</span></footer>';
  }

  /* ── 7 · năm phẩm chất ───────────────────────────── */
  function phamChat() {
    return '<section id="pham-chat">' +
      dau('Đích của con người', 'Năm phẩm chất Gen Việt',
        'Đức · Dũng · Trí · Chủ · Chí. Mỗi phẩm chất phải có chỗ rèn cụ thể hằng tuần và một cách đo — nếu không thì nó chỉ là khẩu hiệu treo tường.') +
      '<div class="luoi hai">' + ds(G.PHAM_CHAT, function (o) {
        return '<div class="pc" style="--c:' + e(o.mau) + '">' +
          '<div class="dinh"><span class="k">' + e(o.k) + '</span><h3>' + e(o.t) + '</h3>' +
            '<span class="tru">trụ ' + e(o.tru) + '</span></div>' +
          '<div class="than"><p>' + e(o.n) + '</p>' +
            '<div class="ren"><b>Rèn ở đâu</b>' + e(o.ren) + '</div>' +
            '<div class="do"><b>Đo bằng gì</b>' + e(o.do) + '</div></div></div>';
      }) + '</div>' +
      '<p>Năm phẩm chất không phải trục thứ mười ba. Chúng là <strong>cách đọc mười hai trục theo chiều đạo đức</strong>: một em đạt mức 5 cả mười hai trục mà thiếu Đức thì hệ thống đã tạo ra một người giỏi nguy hiểm, không phải một nhân tài.</p>' +
      '</section>';
  }

  /* ── 10 · chi hội Gen Việt ───────────────────────── */
  function clb() {
    var C = G.CLB;
    return '<section id="clb">' +
      dau('Lớp L5 · hạt nhân vận hành', 'Chi hội Gen Việt — mô hình chiều sâu',
        'Câu lạc bộ không phải sinh hoạt ngoại khoá. Nó là đơn vị vận hành nhỏ nhất của cả hệ thống, và được tổ chức theo khung đã chứng minh được độ bền qua bốn mươi năm: khung chi hội của BNI, dịch toàn bộ sang mục đích rèn người trẻ.') +
      '<div class="the"><h3>' + e(C.goc.t) + '</h3><p>' + e(C.goc.n) + '</p>' +
        '<p class="vi">' + e(C.goc.khac) + '</p></div>' +
      '<div class="cuon"><table><thead><tr><th>Điểm chốt</th><th>Chuẩn</th></tr></thead><tbody>' +
      ds(C.quyMo, function (r) {
        return '<tr><td><strong>' + e(r.c) + '</strong></td><td class="mo">' + e(r.v) + '</td></tr>';
      }) + '</tbody></table></div>' +

      '<h3 style="margin:8px 0 0; font-size:15px">Sáu vòng chiều sâu — đường đi trong một chi hội</h3>' +
      '<div class="vong">' + ds(C.vong, function (o) {
        return '<div class="buoc"><span class="v">' + e(o.v) + '</span>' +
          '<div class="noi"><h3>' + e(o.t) + '</h3>' +
            '<span class="dk">Điều kiện: ' + e(o.dk) + '</span>' +
            '<span class="duoc">' + e(o.duoc) + '</span></div>' +
          '<span class="bmap">' + e(o.bac) + '</span></div>';
      }) + '</div>' +
      '<p>Vòng trong chi hội và bậc nhân tài là <strong>hai thang khác nhau nhưng khớp vào nhau</strong>: vòng đo vị trí của em trong cộng đồng, bậc đo năng lực của em trong hộ chiếu. Không được lấy vòng thay cho bậc — một em rất được yêu quý trong chi hội vẫn có thể chưa đủ bằng chứng để lên bậc.</p>' +

      '<h3 style="margin:8px 0 0; font-size:15px">Kịch bản buổi sinh hoạt — 90 phút, không đổi</h3>' +
      '<div class="lich">' + ds(C.kichBan, function (o) {
        return '<div class="muc-l"><span class="p">' + e(o.p) + '</span>' +
          '<div class="noi"><b>' + e(o.m) + '</b><span class="ai">' + e(o.ai) + '</span>' +
          '<span class="y">' + e(o.y) + '</span></div></div>';
      }) + '</div>' +
      '<p>Kịch bản cố định là thứ khiến một chi hội ở Hà Nội và một chi hội ở Sơn La chạy giống nhau. <strong>Ban điều hành không được phép sửa kịch bản</strong> — chỉ Hội đồng Gen Việt sửa, và mỗi lần sửa áp cho toàn quốc.</p>' +

      '<h3 style="margin:8px 0 0; font-size:15px">Bảng số tuần — bảy cột</h3>' +
      '<div class="cuon"><table><thead><tr><th>Cột</th><th>Đo gì</th><th>Đơn vị</th><th>Luật</th></tr></thead><tbody>' +
      ds(C.bangSo, function (r) {
        return '<tr><td class="co">' + e(r.c) + '</td><td><strong>' + e(r.t) + '</strong></td>' +
          '<td class="mo">' + e(r.d) + '</td><td class="mo">' + e(r.n) + '</td></tr>';
      }) + '</tbody></table></div>' +
      '<p>Bảng số xếp mỗi thành viên vào một trong bốn băng <strong>XANH · VÀNG · CAM · ĐỎ</strong> — cùng bốn băng hệ thống đã dùng cho gia đình, nên một Coach nhìn là hiểu ngay. Gọi tên người ở băng ĐỎ giữa buổi họp là để cả chi hội giúp, không phải để phạt.</p>' +

      '<h3 style="margin:8px 0 0; font-size:15px">Bảy ghế ban điều hành — nhiệm kỳ 6 tháng</h3>' +
      '<div class="cuon"><table><thead><tr><th>Ghế</th><th>Làm gì</th><th>KPI của ghế</th></tr></thead><tbody>' +
      ds(C.ban, function (r) {
        return '<tr><td><strong>' + e(r.g) + '</strong></td><td class="mo">' + e(r.l) + '</td><td>' + e(r.kpi) + '</td></tr>';
      }) + '</tbody></table></div>' +
      '<p>Mọi thành viên <strong>phải qua ít nhất một ghế</strong> trước khi được xét bậc 4. Đây là chỗ một người trẻ học lãnh đạo bằng cách chịu trách nhiệm thật, trước những người bạn có quyền bỏ phiếu thay mình.</p>' +

      '<div class="luoi hai">' +
        '<div class="the"><span class="nhan">' + e(C.to.t) + '</span><p style="margin-top:10px">' + e(C.to.n) + '</p>' +
          '<ul style="margin:12px 0 0;padding-left:18px;display:grid;gap:5px;font-size:13px;color:var(--muc2)">' +
          ds(C.to.ds, function (x) { return '<li>' + e(x) + '</li>'; }) + '</ul></div>' +
        '<div class="the"><span class="nhan">' + e(C.moMoi.t) + '</span>' +
          '<ol style="margin:12px 0 0;padding-left:18px;display:grid;gap:5px;font-size:13px;color:var(--muc2)">' +
          ds(C.moMoi.b, function (x) { return '<li>' + e(x) + '</li>'; }) + '</ol>' +
          '<p class="vi">' + e(C.moMoi.n) + '</p></div>' +
      '</div>' +

      '<h3 style="margin:8px 0 0; font-size:15px">Mười điều luật chi hội</h3>' +
      '<div class="the"><ol class="luat">' + ds(C.luat, function (x) {
        return '<li><span>' + e(x) + '</span></li>';
      }) + '</ol></div>' +

      '<h3 style="margin:8px 0 0; font-size:15px">Ba tầng tổ chức</h3>' +
      '<div class="luoi ba">' + ds(C.baTang, function (o) {
        return '<div class="the"><h3>' + e(o.t) + '</h3>' +
          '<p style="color:var(--muc3);font-family:var(--ma);font-size:11px">' + e(o.qm) + ' · ' + e(o.nhip) + '</p>' +
          '<p style="margin-top:8px">' + e(o.lam) + '</p></div>';
      }) + '</div></section>';
  }

  /* ── 11 · bốn môi trường ─────────────────────────── */
  function moiTruong() {
    return '<section id="moi-truong">' +
      dau('Nơi năng lực bị kiểm', 'Bốn môi trường thực tiễn',
        'Chi hội là nơi RÈN. Bốn môi trường dưới đây là nơi THI. Chi hội không được tự cấp bằng chứng cho chính mình — mọi cổng bậc đều đòi bằng chứng từ ít nhất hai môi trường.') +
      '<div class="luoi" style="gap:12px">' + ds(G.MOI_TRUONG, function (o) {
        return '<div class="mt" style="--c:' + e(o.mau) + '">' +
          '<div class="hang"><span class="m">' + e(o.ma) + '</span><h3>' + e(o.t) + '</h3>' +
            '<span class="truc">' + e(o.truc) + '</span></div>' +
          '<p>' + e(o.n) + '</p>' +
          '<div class="lam"><strong>Làm gì:</strong> ' + e(o.lam) + '</div>' +
          '<div class="xn">Ai xác nhận: ' + e(o.xn) + '</div>' +
          '<div class="vi">' + e(o.vi) + '</div></div>';
      }) + '</div>' +
      '<h3 style="margin:8px 0 0; font-size:15px">Vòng bảy ngày của một thành viên</h3>' +
      '<div class="the" style="padding:4px 22px">' + ds(G.TUAN, function (o) {
        return '<div class="nhip"><div class="cot">' + e(o.ng) + '</div>' +
          '<div class="noi"><b>' + e(o.v) + '</b></div></div>';
      }) + '</div>' +
      '<p>Bảy ngày ấy là thứ biến toàn bộ kiến trúc phía trên thành đời sống thật của một đứa trẻ. <strong>Nếu một tuần không chạy được, thì ba mươi năm cũng không chạy được</strong> — nên đây là đơn vị phải thử trước tiên, trước khi bàn tới vùng, tới quy mô, tới quốc gia.</p>' +
      '</section>';
  }

  /* ── dựng ────────────────────────────────────────── */
  function dung(goc) {
    goc.className = 'khung';
    goc.innerHTML = mao() + mucLuc() + '<main class="chinh">' +
      moDau() + dinhVi() + nguyenLy() + kienTruc() + bac() + nangLuc() +
      phamChat() + nhip() + hinhThai() + clb() + moiTruong() +
      doLuong() + maHoa() + vanHanh() + ruiRo() +
      loTrinh() + batTay() + nguon() + '</main>' + chan();

    /* Mục lục sáng theo phần đang đọc. Không có thư viện, chỉ một
       IntersectionObserver — và có nhánh dự phòng cho trình duyệt cũ. */
    var neo = {};
    Array.prototype.forEach.call(goc.querySelectorAll('.muc a'), function (a) {
      neo[a.getAttribute('data-di')] = a;
    });
    if (!window.IntersectionObserver) return;
    var dang = null;
    var soi = new IntersectionObserver(function (mucs) {
      mucs.forEach(function (m) {
        if (!m.isIntersecting) return;
        var a = neo[m.target.id];
        if (!a || a === dang) return;
        if (dang) dang.classList.remove('oo');
        a.classList.add('oo');
        dang = a;
      });
    }, { rootMargin: '-10% 0px -70% 0px', threshold: 0 });
    Array.prototype.forEach.call(goc.querySelectorAll('section[id]'), function (s) { soi.observe(s); });
  }

  window.GVdung = dung;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      var g = document.getElementById('ung-dung');
      if (g) dung(g);
    });
  } else {
    var g = document.getElementById('ung-dung');
    if (g) dung(g);
  }
})();
