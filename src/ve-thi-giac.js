/* ═══════════════════════════════════════════════════════════════
   GITA 365 — BỘ VẼ TRONG MÁY

   ══ VÌ SAO VẼ Ở ĐÂY CHỨ KHÔNG GỌI RA NGOÀI ══

   TG-01 trong hiến pháp thị giác ghi: "Đưa được nội dung thiết kế ra
   ngoài là đưa được nội dung ra ngoài — cùng cái cửa." Cửa ấy có thật
   (guiDeBaiRaNgoai) và đang ĐÓNG, và nó cố tình chỉ gửi ĐỀ BÀI, không
   gửi nội dung.

   Nhưng chủ hệ cần ẢNH, không cần đề bài. Bộ vẽ này là đường thứ ba:
   vẽ bằng chính máy, ngay trong trình duyệt đã đăng nhập. Chữ đi từ
   kho đã mở ra thẳng thẻ <svg> trên màn — không một lượt hỏi mạng nào,
   nên không có cửa nào để rò.

   Đổi lại: nó chỉ vẽ được thứ nó biết dựng. Đó là chỗ mạnh chứ không
   phải chỗ yếu — một bộ vẽ dựng hình theo LUẬT thì mọi tấm cùng một
   hệ, còn một bộ vẽ đoán thì mỗi tấm một kiểu.

   ══ BA LUẬT CỦA BỘ VẼ NÀY ══

   1. KHÔNG VẼ TỰ DO. Chỉ vẽ từ một bản ghi đã qua cổng Tầng. Không có
      hàm nào nhận chữ trần rồi vẽ — vẽ được chữ trần thì cổng Tầng
      thành đồ trang trí.
   2. KHÔNG BỊA. Loại hình nào chưa có bộ vẽ thì NÓI CHƯA CÓ, không vẽ
      đại một khung chung rồi nhét chữ vào. Luật C10 cấm tự suy diễn,
      và một tấm vẽ đại chính là một suy diễn có màu.
   3. MÀU LẤY TỪ BẢNG ĐÃ CHỐT. Đọc biến CSS đang chạy, nên tấm hình
      đổi theo nền sáng/tối y như giao diện. Không mã màu nào gõ tay ở
      tệp này — gõ tay là một bảng màu thứ hai mọc lên lặng lẽ.

   ══ CHỖ NÀY CHƯA LÀM, VÀ CỐ Ý CHƯA LÀM ══

   TG-02: ấn phẩm IN RA GIẤY cần bảng màu riêng, chủ hệ chốt. Bộ vẽ
   này vẽ cho MÀN HÌNH — đúng chỗ mấy tấm tầm nhìn sẽ nằm.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

(function () {
  var U = G.U, h = U.h;

  /* ── KHỔ GIẤY ──
     1200×630 là khổ chia sẻ của chính kho này (assets/icons/chia-se-
     1200x630.png). Dùng lại chứ không đặt khổ mới: một tấm vẽ ra vừa
     khít chỗ nó sẽ nằm thì không ai phải cắt lại. */
  var KHO_GIAY = {
    rong:  {w: 1200, h: 630,  ten: 'Khổ chia sẻ 1200×630'},
    vuong: {w: 1080, h: 1080, ten: 'Khổ vuông 1080×1080'},
    doc:   {w: 1080, h: 1350, ten: 'Khổ dọc 1080×1350'}
  };

  /* ── MÀU: ĐỌC TỪ BIẾN CSS ĐANG CHẠY ──
     Trả về mã thật (rgb) chứ không trả về "var(--gita)": chuỗi var()
     sống trong thẻ <svg> trên màn, nhưng chết ngay khi tấm ấy được
     tách ra thành tệp. Đọc một lần lúc vẽ thì tấm đứng độc lập. */
  function mau(ten, duPhong) {
    if (typeof document === 'undefined') return duPhong || '#000000';
    var v = '';
    try {
      v = getComputedStyle(document.documentElement)
        .getPropertyValue('--' + ten).trim();
    } catch (e) { v = ''; }
    return v || duPhong || '#000000';
  }

  /* Bảng màu một tấm hình. Gom lại một chỗ để mỗi bộ vẽ không tự đi
     hỏi lẻ — và để thấy ngay tấm hình đang dùng đúng mấy màu nào. */
  function bang() {
    return {
      nen:    mau('nen-1', '#FFFFFF'),
      nen2:   mau('nen-2', '#F7F4FC'),
      muc:    mau('ink-1', '#1C1440'),
      muc2:   mau('ink-2', '#4A4270'),
      muc3:   mau('ink-3', '#7C7599'),
      gita:   mau('gita', '#2A72C6'),
      gitaSang: mau('gita-sang', '#5C9BE0'),
      gitaSau: mau('gita-sau', '#185AB4'),
      gitaInk: mau('gita-ink', '#14509E'),
      do:     mau('gita-do', '#F61824'),
      doInk:  mau('gita-do-ink', '#BE0E16'),
      vien:   mau('vien-1', 'rgba(28,20,64,.12)')
    };
  }

  /* ── SÁU SẮC TẦNG: ĐỌC TỪ G.BRAND.mau, KHÔNG TỰ ĐẶT ──
     Ảnh mẫu chủ hệ gửi có sáu ô sáu màu khác nhau. Cám dỗ là tự chọn
     sáu màu cho đẹp — làm thế là dựng bảng màu thứ hai, đúng thứ luật
     "màu lấy từ bảng đã chốt" cấm.
     Không phải tự chọn: G.BRAND.mau đã có sẵn năm sắc tầng cộng một
     sắc nhắc, đủ sáu, và đã được duyệt từ v7.0. Đọc thẳng từ đấy.
     Không mở được kho thì trả rỗng, và bộ vẽ nào cần sáu sắc sẽ NÓI
     là chưa mở kho — chứ không lấy tạm sáu màu khác. */
  var TEN_SAC = ['T1 · Xanh dương', 'T2 · Tím', 'T3 · Lam',
                 'T4 · Lục', 'T5 · Hổ phách', 'Hồng nhắc'];
  function sacTang() {
    var ds = (G.BRAND && G.BRAND.mau) || [];
    var ra = [];
    for (var i = 0; i < TEN_SAC.length; i++) {
      var m = ds.filter(function (x) { return x.k === TEN_SAC[i]; })[0];
      if (m && m.hex) ra.push({hex: m.hex, ten: m.k});
    }
    return ra;
  }

  /* Sáng hơn / tối hơn một sắc, để dựng chuyển sắc trong huy hiệu mà
     vẫn chỉ dùng đúng một màu gốc đã duyệt. */
  function doiSang(hex, ty) {
    var m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
    if (!m) return hex;
    var n = parseInt(m[1], 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    var f = function (v) {
      return Math.max(0, Math.min(255, Math.round(ty > 0
        ? v + (255 - v) * ty : v * (1 + ty)))); };
    return '#' + ((1 << 24) + (f(r) << 16) + (f(g) << 8) + f(b))
      .toString(16).slice(1);
  }

  /* ═══════════ LỚP CHIỀU SÂU ═══════════
     Chiều sâu trong tấm hình không đến từ việc dán bóng đổ lên mọi
     thứ. Nó đến từ BA LỚP tách bạch, mỗi lớp một việc:

       lớp 1 · NỀN     — quầng sáng mờ, không có nét, không đọc được
       lớp 2 · TẤM     — mặt kính có viền sáng trên và bóng đổ dưới
       lớp 3 · CHỮ     — nét đặc, tương phản cao nhất tấm

     Mắt đọc lớp 3 trước, lớp 2 sau, lớp 1 không bao giờ. Đảo thứ tự
     ấy — chẳng hạn cho nền một hoạ tiết đủ đậm để mắt dừng lại — là
     chỗ mọi tấm hình "nhiều hiệu ứng" hỏng.

     Một luật cấm kỵ của thương hiệu đứng ngay đây: BRAND.camKy ghi
     "không đổi màu logo, không nghiêng, KHÔNG THÊM BÓNG ĐỔ". Nên dấu
     GITA là thứ DUY NHẤT trong tấm không được nhận bóng. */
  var demId = 0;
  function idMoi(g) { demId++; return 'gita-' + g + '-' + demId; }

  function lopNen(kg, k, dam) {
    /* Hai quầng sáng radial, cùng ngôn ngữ với #aura của giao diện —
       xanh GITA một bên, đỏ GITA một bên, đều rất mờ. Chúng làm nền
       KHÔNG phẳng, và một nền không phẳng là thứ cho tấm hình chiều
       sâu mà không tốn một nét nào. */
    var a = idMoi('quang'), b = idMoi('quang');
    var d = dam === undefined ? 1 : dam;
    return {
      defs:
        '<radialGradient id="' + a + '" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="' + h(k.gita) + '" stop-opacity="' +
            (0.20 * d).toFixed(3) + '"/>' +
          '<stop offset="100%" stop-color="' + h(k.gita) + '" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<radialGradient id="' + b + '" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="' + h(k.do) + '" stop-opacity="' +
            (0.10 * d).toFixed(3) + '"/>' +
          '<stop offset="100%" stop-color="' + h(k.do) + '" stop-opacity="0"/>' +
        '</radialGradient>',
      ve:
        '<ellipse cx="' + Math.round(kg.w * 0.80) + '" cy="' + Math.round(kg.h * 0.12) +
          '" rx="' + Math.round(kg.w * 0.46) + '" ry="' + Math.round(kg.h * 0.62) +
          '" fill="url(#' + a + ')"/>' +
        '<ellipse cx="' + Math.round(kg.w * 0.10) + '" cy="' + Math.round(kg.h * 0.94) +
          '" rx="' + Math.round(kg.w * 0.34) + '" ry="' + Math.round(kg.h * 0.44) +
          '" fill="url(#' + b + ')"/>'
    };
  }

  /* Bóng đổ mềm. Một bộ lọc dùng chung cho mọi tấm kính trong hình —
     dựng riêng cho từng ô thì tệp phình lên mà mắt không thấy khác. */
  function defBong(k) {
    var id = idMoi('bong');
    return {id: id, defs:
      '<filter id="' + id + '" x="-30%" y="-30%" width="160%" height="180%">' +
        '<feDropShadow dx="0" dy="10" stdDeviation="14" ' +
          'flood-color="' + h(k.gitaSau) + '" flood-opacity="0.16"/>' +
      '</filter>'};
  }

  /* Mặt kính: chuyển sắc rất nhẹ từ trắng xuống, cộng một nét viền
     sáng Ở TRÊN. Viền sáng trên là thứ nói với mắt "vật này nổi lên",
     vì ngoài đời ánh sáng đến từ trên. Bỏ nó đi thì tấm kính dẹt ra
     ngay, dù bóng đổ vẫn còn. */
  function tamKinh(x, y, w, ht, k, o) {
    o = o || {};
    var g = idMoi('kinh');
    var r = o.bo === undefined ? 20 : o.bo;
    var sac = o.sac || k.gita;
    return {
      defs: '<linearGradient id="' + g + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="' + h(doiSang(k.nen, 0.06)) +
          '" stop-opacity="0.96"/>' +
        '<stop offset="100%" stop-color="' + h(k.nen2) + '" stop-opacity="0.92"/>' +
        '</linearGradient>',
      ve:
        '<g' + (o.bong ? ' filter="url(#' + o.bong + ')"' : '') + '>' +
          '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + ht +
            '" rx="' + r + '" fill="url(#' + g + ')" stroke="' + h(sac) +
            '" stroke-opacity="0.22" stroke-width="1"/>' +
          '<path d="M' + (x + r) + ' ' + (y + 0.75) + ' H' + (x + w - r) + '" ' +
            'stroke="' + h(doiSang(k.nen, 0.9)) + '" stroke-opacity="0.85" ' +
            'stroke-width="1.5" fill="none"/>' +
        '</g>'
    };
  }

  /* ── HUY HIỆU BIỂU TƯỢNG ──
     Vòng tròn chuyển sắc từ một sắc tầng, biểu tượng nét trắng bên
     trong. Sáu biểu tượng vẽ bằng hình học thuần, không nạp bộ chữ
     biểu tượng nào — một tệp phông ngoài là một lượt hỏi mạng, và
     luật của bộ vẽ này là không có lượt nào. */
  /* Mỗi biểu tượng là một mảnh SVG vẽ trong ô 30×30 quanh gốc toạ độ.
     Cho phép cả nét (stroke) chứ không chỉ mảng đặc: bản đầu vẽ tất cả
     bằng mảng đặc với fill-rule="evenodd", và cái ĐÍCH ra thành một
     đốm tròn có lỗ — nhìn không ra là đích. Ba vòng đồng tâm vẽ bằng
     NÉT thì đọc ra ngay. Cái ĐẦU NGƯỜI nhìn nghiêng cũng ra một giọt
     nước; đổi sang hai bong bóng thoại, vì việc của ô ấy là TƯ VẤN —
     và trò chuyện là thứ ai cũng đọc được ngay. */
  var HINH = {
    sach: '<path d="M-9 -7 h7 a2 2 0 0 1 2 2 v12 a2 2 0 0 0 -2 -2 h-7 z ' +
          'M9 -7 h-7 a2 2 0 0 0 -2 2 v12 a2 2 0 0 1 2 -2 h7 z"/>',
    thoai:'<path d="M-10 -8 h13 a2.5 2.5 0 0 1 2.5 2.5 v7 a2.5 2.5 0 0 1 -2.5 2.5 ' +
          'h-6 l-4.5 4 v-4 h-2.5 a2.5 2.5 0 0 1 -2.5 -2.5 v-7 a2.5 2.5 0 0 1 2.5 -2.5 z"/>' +
          '<path d="M7 -3.5 h3 a2.5 2.5 0 0 1 2.5 2.5 v6 a2.5 2.5 0 0 1 -2.5 2.5 ' +
          'v3.5 l-3.5 -3.5 h-1" fill="none" stroke="#FFFFFF" stroke-width="2.2" ' +
          'stroke-linejoin="round"/>',
    dich: '<circle cx="0" cy="0" r="9" fill="none" stroke="#FFFFFF" stroke-width="2.4"/>' +
          '<circle cx="0" cy="0" r="4.6" fill="none" stroke="#FFFFFF" stroke-width="2.4"/>' +
          '<circle cx="0" cy="0" r="1.6"/>',
    den:  '<path d="M0 -9 a6.5 6.5 0 0 1 3.8 11.8 v2.2 h-7.6 v-2.2 A6.5 6.5 0 0 1 0 -9 z"/>' +
          '<rect x="-3" y="6.4" width="6" height="2" rx="1"/>' +
          '<rect x="-2.2" y="9.4" width="4.4" height="2" rx="1"/>',
    banh: '<path d="M-1.6 -9 h3.2 l0.5 2.6 l2.3 1.3 l2.4 -1.1 l1.6 2.8 l-1.9 1.8 v2.6 ' +
          'l1.9 1.8 l-1.6 2.8 l-2.4 -1.1 l-2.3 1.3 l-0.5 2.6 h-3.2 l-0.5 -2.6 ' +
          'l-2.3 -1.3 l-2.4 1.1 l-1.6 -2.8 l1.9 -1.8 v-2.6 l-1.9 -1.8 l1.6 -2.8 ' +
          /* Lỗ bánh răng phải nằm TRONG CÙNG một thẻ path thì fill-rule
             evenodd mới khoét được. Tách ra thành <circle> riêng là vẽ
             thêm một đĩa đặc đè lên, không phải khoét. */
          'l2.4 1.1 l2.3 -1.3 z M0 -3.2 a3.2 3.2 0 1 0 0.01 0 z"/>',
    cot:  '<path d="M-9 9 v-6 h4 v6 z M-2 9 v-11 h4 v11 z M5 9 v-16 h4 v16 z"/>' +
          '<path d="M-8 -4 l6 -5 l5 3 l6 -7" fill="none" stroke="#FFFFFF" ' +
          'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ' +
          'opacity="0.85"/>'
  };
  var THU_TU_HINH = ['sach', 'thoai', 'dich', 'den', 'banh', 'cot'];

  function huyHieu(cx, cy, r, hex, hinh, bong) {
    var g = idMoi('hh');
    return {
      defs: '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="' + h(doiSang(hex, 0.22)) + '"/>' +
        '<stop offset="100%" stop-color="' + h(doiSang(hex, -0.20)) + '"/>' +
        '</linearGradient>',
      ve: '<g' + (bong ? ' filter="url(#' + bong + ')"' : '') + '>' +
        '<rect x="' + (cx - r) + '" y="' + (cy - r) + '" width="' + (r * 2) +
          '" height="' + (r * 2) + '" rx="' + Math.round(r * 0.62) +
          '" fill="url(#' + g + ')"/>' +
        '<g transform="translate(' + cx + ',' + cy + ') scale(' + (r / 15).toFixed(3) +
          ')" fill="#FFFFFF" fill-rule="evenodd">' + HINH[hinh] + '</g></g>'
    };
  }

  /* Chữ chuyển sắc — cùng ngôn ngữ với .grad-text của giao diện:
     xanh sâu → xanh → đỏ. Chỉ dùng cho MỘT câu trong tấm; hai câu
     chuyển sắc thì không câu nào còn là câu chính. */
  function defChuSac(k) {
    var id = idMoi('chusac');
    return {id: id, defs:
      '<linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="0.35">' +
        '<stop offset="0%" stop-color="' + h(k.gitaSau) + '"/>' +
        '<stop offset="52%" stop-color="' + h(k.gita) + '"/>' +
        '<stop offset="100%" stop-color="' + h(k.doInk) + '"/>' +
      '</linearGradient>'};
  }

  /* ── ĐO CHỮ THẬT, KHÔNG ĐẾM KÝ TỰ ──
     Bản đầu tôi định ngắt dòng bằng cách đếm ký tự. Sai với tiếng
     Việt: dấu mũ và dấu thanh không thêm bề ngang, còn "M" với "i"
     thì hơn nhau gấp ba. Canvas đo bằng đúng bộ chữ đang tải nên
     dòng ngắt đúng chỗ mắt thấy. */
  var doBoi = null;
  function doRong(chu, font) {
    if (!doBoi && typeof document !== 'undefined')
      doBoi = document.createElement('canvas').getContext('2d');
    if (!doBoi) return String(chu).length * 8;   /* chạy ngoài trình duyệt */
    doBoi.font = font;
    return doBoi.measureText(String(chu)).width;
  }

  function catDong(chu, font, rongToiDa) {
    var tu = String(chu || '').trim().split(/\s+/), dong = [], nay = '';
    for (var i = 0; i < tu.length; i++) {
      var thu = nay ? nay + ' ' + tu[i] : tu[i];
      if (nay && doRong(thu, font) > rongToiDa) { dong.push(nay); nay = tu[i]; }
      else nay = thu;
    }
    if (nay) dong.push(nay);
    return dong;
  }

  /* Bó chữ thành mấy thẻ <text>. Trả về cả CHIỀU CAO đã dùng để chỗ
     gọi xếp phần dưới — không có nó thì mọi bố cục phải đoán, và đoán
     sai một dòng là chữ đè lên nhau. */
  function veChu(chu, x, y, o) {
    var font = (o.dam || 600) + ' ' + o.co + 'px ' + o.chu;
    var dong = catDong(chu, font, o.rong);
    var cao = o.co * (o.gian || 1.28);
    var can = o.can || 'start';
    var ra = dong.map(function (d, i) {
      return '<text x="' + x + '" y="' + (y + i * cao) + '" ' +
        'font-family="' + h(o.chu) + '" font-size="' + o.co + '" ' +
        'font-weight="' + (o.dam || 600) + '" fill="' + h(o.mau) + '" ' +
        'text-anchor="' + can + '"' +
        (o.gianChu ? ' letter-spacing="' + o.gianChu + '"' : '') +
        '>' + h(d) + '</text>';
    }).join('');
    return {svg: ra, cao: dong.length * cao, soDong: dong.length};
  }

  var CHU_TIEU = '"Playfair Display", Georgia, serif';
  var CHU_THAN = '"Be Vietnam Pro", system-ui, sans-serif';

  /* Dấu GITA ở góc — cùng một chỗ trên mọi tấm. Nhận diện không phải
     là dán logo to, mà là ĐẶT ĐÚNG MỘT CHỖ qua tất cả các tấm. */
  function dauGita(k, x, y) {
    return '<g transform="translate(' + x + ',' + y + ')">' +
      '<circle cx="0" cy="0" r="15" fill="none" stroke="' + h(k.gita) +
        '" stroke-width="2"/>' +
      '<circle cx="0" cy="0" r="5" fill="' + h(k.do) + '"/>' +
      '<text x="26" y="-2" font-family="' + h(CHU_THAN) + '" font-size="17" ' +
        'font-weight="800" fill="' + h(k.gitaSau) + '" letter-spacing="1.6">GITA 365</text>' +
      '<text x="26" y="15" font-family="' + h(CHU_THAN) + '" font-size="10.5" ' +
        'font-weight="600" fill="' + h(k.muc3) + '" letter-spacing="1.1">' +
        'HỆ SINH THÁI GIA ĐÌNH THỊNH VƯỢNG</text></g>';
  }

  function khung(kg, k, ruot, defs) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + kg.w + ' ' +
      kg.h + '" width="' + kg.w + '" height="' + kg.h + '" role="img">' +
      '<defs>' + (defs || '') + '</defs>' +
      '<rect width="' + kg.w + '" height="' + kg.h + '" fill="' + h(k.nen) + '"/>' +
      ruot + '</svg>';
  }

  /* Gom các mảnh (mỗi mảnh là {defs, ve}) thành một cặp. Viết tay
     việc nối defs ở từng bộ vẽ là chỗ quên chắc chắn xảy ra: quên một
     defs thì hình vẫn vẽ ra, chỉ mất chuyển sắc — im lặng đúng kiểu
     khó thấy nhất. */
  function gom(ds) {
    return {defs: ds.map(function (x) { return x.defs || ''; }).join(''),
            ve: ds.map(function (x) { return x.ve || ''; }).join('')};
  }

  /* Câu đầu của nội dung. Tấm bìa nói MỘT câu — câu đầu là câu chủ hệ
     đặt lên đầu, nên đó là câu ấy. Không tự chọn câu nào "hay hơn". */
  function cauDau(chu) {
    return String(chu || '').trim().split(/\n\s*\n/)[0].trim();
  }
  function cauHai(chu) {
    var d = String(chu || '').trim().split(/\n\s*\n/);
    return d.length > 1 ? d[1].trim() : '';
  }

  /* ═══════════ BỘ VẼ · BÌA ═══════════
     Một câu lớn, một dấu, một dòng phụ. Không hơn. Bìa mà có ba khối
     chữ thì mắt không biết đọc khối nào trước, và tấm ấy hỏng đúng
     nhiệm vụ duy nhất của nó. */
  function veBia(x, kg) {
    var k = bang();
    var cau = cauDau(x.noiDung), phu = cauHai(x.noiDung);
    if (!cau) return {ok: false, error: 'Nội dung rỗng — không có câu nào để đặt lên bìa.'};

    var le = Math.round(kg.w * 0.085), rong = kg.w - le * 2;
    /* Cỡ chữ co lại cho tới khi câu vừa BỐN dòng. Đặt cỡ cứng thì câu
       dài tràn khỏi tấm, mà tràn thì không ai thấy lúc vẽ — chỉ thấy
       lúc đã dán lên giao diện. */
    var co = Math.round(kg.w / 21), dong;
    for (;;) {
      dong = catDong(cau, '600 ' + co + 'px ' + CHU_TIEU, rong);
      if (dong.length <= 4 || co <= 20) break;
      co -= 2;
    }
    /* ── CĂN CẢ KHỐI, KHÔNG CĂN RIÊNG CÂU CHÍNH ──
       Bản đầu chỉ căn giữa câu chính rồi thả dòng phụ xuống dưới, nên
       tấm nào có dòng phụ cũng lệch lên và hở một mảng dưới. Đo cả
       khối (câu + khoảng + phụ) rồi căn giữa VÙNG NẰM TRÊN dấu GITA —
       căn giữa cả tấm thì khối chữ đè vào dấu. */
    var coPhu = Math.round(co * 0.34);
    var caoCau = dong.length * co * 1.24;
    var caoPhu = phu
      ? co * 0.5 + catDong(phu, '500 ' + coPhu + 'px ' + CHU_THAN, rong).length *
        coPhu * 1.45
      : 0;
    var dayVung = kg.h - Math.round(kg.h * 0.085) - 34;   /* chừa chỗ dấu GITA */
    var dinh = Math.round((dayVung - caoCau - caoPhu) / 2) + co * 0.32;

    var nen = lopNen(kg, k);
    var cs = defChuSac(k);
    var t = veChu(cau, le, dinh, {co: co, chu: CHU_TIEU, dam: 600,
      mau: 'url(#' + cs.id + ')', rong: rong, gian: 1.24});
    var o = nen.ve +
      '<rect x="0" y="0" width="' + kg.w + '" height="6" fill="' + h(k.gita) + '"/>' +
      '<rect x="' + le + '" y="' + Math.round(dinh - co * 1.02) + '" width="52" height="4" ' +
        'rx="2" fill="' + h(k.do) + '"/>' + t.svg;
    if (phu)
      o += veChu(phu, le, dinh + t.cao + co * 0.5, {co: coPhu,
        chu: CHU_THAN, dam: 500, mau: k.muc2, rong: rong, gian: 1.45}).svg;
    o += dauGita(k, le + 15, kg.h - Math.round(kg.h * 0.085));
    return {ok: true, svg: khung(kg, k, o, nen.defs + cs.defs)};
  }

  /* ═══════════ BỘ VẼ · MỘT CON SỐ ═══════════
     Loại hình này chỉ có một việc: cho thấy MỘT con số. Nên nó phải
     tìm được con số ấy TRONG nội dung. Không tìm thấy thì DỪNG, chứ
     không vẽ một tấm có chỗ trống hình con số — luật C10, không tự
     suy diễn thứ chủ hệ chưa viết ra. */
  var SO_CHU = {
    'một triệu': '1.000.000', 'mot trieu': '1.000.000',
    'một nghìn': '1.000', 'một trăm': '100', 'mười nghìn': '10.000',
    'trăm nghìn': '100.000', 'một tỷ': '1.000.000.000'
  };
  function timSo(chu) {
    var t = String(chu || '');
    for (var k in SO_CHU)
      if (t.toLowerCase().indexOf(k) >= 0) return {so: SO_CHU[k], goc: k};
    /* Số viết bằng chữ số, kể cả có dấu chấm/phẩy phân nhóm. Bỏ qua
       số dính chữ (365 trong "GITA 365") bằng cách đòi ít nhất hai
       chữ số VÀ không đứng ngay sau một chữ cái. */
    var m = t.match(/(?:^|[^\wÀ-ỹ])(\d{1,3}(?:[.,]\d{3})+|\d{2,})(?![\wÀ-ỹ])/);
    return m ? {so: m[1], goc: m[1]} : null;
  }

  function veMotSo(x, kg) {
    var k = bang();
    var s = timSo(x.noiDung + ' ' + x.nhiemVu);
    if (!s) return {ok: false,
      error: 'Loại hình MỘT CON SỐ mà trong nội dung không có con số nào. ' +
             'Máy không tự nghĩ ra một con số để lấp chỗ — viết con số vào ' +
             'nội dung rồi vẽ lại.'};

    var cau = cauDau(x.noiDung), le = Math.round(kg.w * 0.085);
    var rong = kg.w - le * 2;
    var coSo = Math.round(kg.w / 6.2);
    while (doRong(s.so, '800 ' + coSo + 'px ' + CHU_THAN) > rong && coSo > 40) coSo -= 4;

    var giua = Math.round(kg.w / 2), dinh = Math.round(kg.h * 0.44);
    var nen = lopNen(kg, k);
    var cs = defChuSac(k);
    var o = nen.ve +
      '<rect x="0" y="0" width="' + kg.w + '" height="6" fill="' + h(k.gita) + '"/>' +
      '<text x="' + giua + '" y="' + dinh + '" text-anchor="middle" ' +
        'font-family="' + h(CHU_THAN) + '" font-size="' + coSo + '" font-weight="800" ' +
        'fill="url(#' + cs.id + ')" letter-spacing="-2">' + h(s.so) + '</text>' +
      '<rect x="' + (giua - 26) + '" y="' + Math.round(dinh + coSo * 0.22) +
        '" width="52" height="4" rx="2" fill="' + h(k.do) + '"/>';
    o += veChu(cau, giua, Math.round(dinh + coSo * 0.62), {co: Math.round(kg.w / 42),
      chu: CHU_THAN, dam: 500, mau: k.muc2, rong: Math.round(rong * 0.9),
      gian: 1.5, can: 'middle'}).svg;
    o += dauGita(k, le + 15, kg.h - Math.round(kg.h * 0.085));
    return {ok: true, svg: khung(kg, k, o, nen.defs + cs.defs)};
  }

  /* ═══════════ BỘ VẼ · BẢN ĐỒ HÀNH TRÌNH ═══════════
     Năm chặng đọc thẳng từ G.HP_TANG — bảng giá đã chốt, KHÔNG chép
     lại thành một danh sách riêng ở đây. Chép ra là ngày nào đó bảng
     giá đổi mà tấm hình vẫn vẽ bản cũ. */
  function veBanDo(x, kg) {
    var k = bang();
    var ds = (G.HP_TANG || []).slice(0, 5);
    if (!ds.length) return {ok: false,
      error: 'Chưa mở được bảng chặng (G.HP_TANG). Bản đồ hành trình vẽ từ ' +
             'bảng ấy chứ không từ một danh sách chép tay.'};

    var le = Math.round(kg.w * 0.075), rong = kg.w - le * 2;
    /* ── MỐC ĐỨNG GIỮA Ô, KHÔNG ĐỨNG Ở HAI ĐẦU ĐƯỜNG ──
       Bản đầu đặt mốc thứ nhất ở đúng mép trái và mốc cuối ở đúng mép
       phải. Nhãn dưới mốc căn GIỮA, nên nửa nhãn của hai mốc ngoài
       cùng đổ hẳn ra ngoài tấm — chạy demo mới thấy, vì bộ vẽ không
       báo lỗi khi chữ tràn, nó cứ vẽ.
       Chia đường thành N ô đều rồi đặt mốc ở tâm mỗi ô thì mọi nhãn
       đều có đủ nửa ô ở cả hai bên, kể cả nhãn đầu và cuối. */
    var o1 = rong / ds.length;
    var viTriX = function (i) { return Math.round(le + o1 * (i + 0.5)); };
    var buoc = o1;
    var truc = Math.round(kg.h * 0.46);
    var dang = String(x.tang || '').toUpperCase();

    var nen = lopNen(kg, k);
    var bong = defBong(k);
    var cs = defChuSac(k);
    var o = nen.ve +
      '<rect x="0" y="0" width="' + kg.w + '" height="6" fill="' + h(k.gita) + '"/>';
    o += veChu(x.nhiemVu, le, Math.round(kg.h * 0.17), {co: Math.round(kg.w / 30),
      chu: CHU_TIEU, dam: 600, mau: 'url(#' + cs.id + ')', rong: rong, gian: 1.25}).svg;
    o += '<line x1="' + viTriX(0) + '" y1="' + truc + '" x2="' + viTriX(ds.length - 1) +
      '" y2="' + truc + '" stroke="' + h(k.vien) + '" stroke-width="3"/>';

    ds.forEach(function (t, i) {
      var cx = viTriX(i);
      var day = (t.tang === dang);
      /* Mốc nhận bóng đổ nên nó NỔI TRÊN đường kẻ, chứ không nằm cùng
         một mặt phẳng với đường. Đó là chỗ chiều sâu có việc thật để
         làm: mắt đọc ngay cái nào là mốc, cái nào là đường nối. */
      o += '<g filter="url(#' + bong.id + ')">' +
        '<circle cx="' + cx + '" cy="' + truc + '" r="' + (day ? 15 : 9) + '" ' +
        'fill="' + h(day ? k.do : k.gita) + '"/></g>' +
        (day ? '<circle cx="' + cx + '" cy="' + truc + '" r="24" fill="none" stroke="' +
          h(k.do) + '" stroke-width="2" opacity="0.45"/>' : '') +
        '<text x="' + cx + '" y="' + (truc - 38) + '" text-anchor="middle" ' +
          'font-family="' + h(CHU_THAN) + '" font-size="' + Math.round(kg.w / 55) +
          '" font-weight="800" fill="' + h(day ? k.do : k.gitaSau) + '" ' +
          'letter-spacing="1.2">' + h(t.tang) + '</text>';
      /* Chừa RÃNH giữa hai nhãn. Bản trước cho nhãn rộng 0,94 ô nên
         hai nhãn cạnh nhau chạm đúng vào nhau — vẫn nằm trong khung,
         nên phép đo tràn không thấy; mắt thấy ngay. Rãnh 22 pixel là
         chỗ để mắt biết đây là hai mục, không phải một câu dài. */
      o += veChu(t.ten || t.tang, cx, truc + 42, {co: Math.round(kg.w / 62),
        chu: CHU_THAN, dam: day ? 700 : 500, mau: day ? k.muc : k.muc2,
        rong: Math.round(buoc - 22), gian: 1.35, can: 'middle'}).svg;
    });
    o += dauGita(k, le + 15, kg.h - Math.round(kg.h * 0.09));
    return {ok: true, svg: khung(kg, k, o, nen.defs + bong.defs + cs.defs)};
  }

  /* ═══════════ BỘ VẼ · KHUNG PHƯƠNG PHÁP (LƯỚI Ô) ═══════════
     Ảnh mẫu chủ hệ gửi có sáu ô năng lực, mỗi ô một huy hiệu màu, một
     tiêu đề, một câu mô tả. Đó là đúng nhiệm vụ của loại hình KHUNG
     trong hiến pháp: "Giúp hiểu hệ thống làm việc theo cách nào".

     ══ MÁY KHÔNG ĐOÁN ĐÂU LÀ MỘT Ô ══
     Cám dỗ là cho máy tự cắt nội dung thành sáu ô. Cắt kiểu gì cũng
     là đoán, và đoán sai thì tấm hình nói sai — luật C10 cấm đúng
     thứ đó. Nên định dạng phải RÕ, người viết gõ ra, máy chỉ đọc:

         ĐỌC HIỂU — Toàn bộ hệ thống Web App GITA 365
         TƯ VẤN — Cá nhân hoá theo nhu cầu của bạn

     Mỗi dòng một ô: TÊN, dấu gạch dài, rồi mô tả. Không đủ ba dòng
     đúng dạng thì bộ vẽ DỪNG và chỉ ra dạng cần gõ — nói "không vẽ
     được" mà không nói cần gõ thế nào thì người dùng đoán tiếp. */
  function catO(chu) {
    var ra = [];
    String(chu || '').split('\n').forEach(function (d) {
      var m = /^\s*(.{2,40}?)\s+[—–]\s+(.{4,})$/.exec(d);
      if (m) ra.push({ten: m[1].trim(), y: m[2].trim()});
    });
    return ra;
  }

  function veKhung(x, kg) {
    var k = bang();
    var o6 = catO(x.noiDung);
    if (o6.length < 3) return {ok: false,
      error: 'Khung phương pháp cần ít nhất BA ô, mỗi ô một dòng theo dạng ' +
             '"TÊN Ô — mô tả một câu" (dấu gạch dài). Máy KHÔNG tự cắt nội ' +
             'dung thành ô: cắt kiểu gì cũng là đoán, và một tấm hình dựng ' +
             'trên cái đoán thì nói sai mà trông vẫn chắc chắn. Đang đọc ra ' +
             o6.length + ' ô.'};
    var sac = sacTang();
    if (sac.length < 6) return {ok: false,
      error: 'Chưa mở được bảng màu thương hiệu (G.BRAND.mau). Sáu sắc của ' +
             'lưới ô lấy từ bảng ấy chứ không tự đặt — tự đặt là dựng bảng ' +
             'màu thứ hai mà không ai biết là có bản thứ hai.'};

    o6 = o6.slice(0, 6);
    var cot = o6.length <= 4 ? 2 : 3;
    var hang = Math.ceil(o6.length / cot);
    var le = Math.round(kg.w * 0.06);
    /* Lưới bắt đầu ngay dưới tiêu đề. Bản đầu để 0,34 và tấm hở một
       mảng trắng bằng một phần tư chiều cao ở giữa — mảng trống ấy
       không mang tin gì, mà lại đẩy sáu ô xuống lùn đi. Chỗ trống
       trong một tấm hình phải là chỗ NGHỈ giữa hai khối, không phải
       chỗ thừa vì tính sai. */
    var dinhLuoi = Math.round(kg.h * 0.235);
    var dayLuoi = kg.h - Math.round(kg.h * 0.115);
    var rongO = Math.round((kg.w - le * 2 - 18 * (cot - 1)) / cot);
    var caoO = Math.round((dayLuoi - dinhLuoi - 18 * (hang - 1)) / hang);

    var nen = lopNen(kg, k, 1.3);
    var bong = defBong(k);
    var cs = defChuSac(k);
    var manh = [nen, bong, cs];

    /* Tiêu đề dùng chữ nhấn và chuyển sắc — MỘT câu duy nhất trong
       tấm được phép, đúng luật của .grad-text. */
    var tieu = veChu(x.nhiemVu, le, Math.round(kg.h * 0.155),
      {co: Math.round(kg.w / 26), chu: CHU_TIEU, dam: 600,
       mau: 'url(#' + cs.id + ')', rong: kg.w - le * 2, gian: 1.2});

    /* ── ĐỈNH CỤM CHUNG CHO CẢ HÀNG ──
       Căn giữa từng ô một cách độc lập thì ô nào mô tả một dòng sẽ tụt
       xuống so với ô bên cạnh hai dòng, và sáu tiêu đề không thẳng
       hàng. Mắt quét một cái lưới theo HÀNG NGANG, nên tiêu đề lệch
       nhau đọc ra ngay là xếp ẩu — dù từng ô riêng lẻ đều cân.
       Lấy cụm CAO NHẤT trong hàng làm chuẩn cho cả hàng: huy hiệu và
       tiêu đề thẳng băng, chỉ phần mô tả dài ngắn khác nhau ở dưới,
       mà đó là chỗ khác nhau THẬT nên khác nhau là đúng. */
    var coTenC = Math.round(kg.w / 44), coYC = Math.round(kg.w / 66);
    var rC = Math.round(Math.min(rongO, caoO) * 0.17);
    var hoTenC = Math.round(caoO * 0.115), hoYC = Math.round(caoO * 0.055);
    var caoHang = [];
    o6.forEach(function (m, i) {
      var dT = catDong(m.ten, '800 ' + coTenC + 'px ' + CHU_THAN, rongO - 24);
      var dY = catDong(m.y, '500 ' + coYC + 'px ' + CHU_THAN, rongO - 26);
      var c = rC * 2 + hoTenC + dT.length * coTenC * 1.2 +
        hoYC + dY.length * coYC * 1.34;
      var hg = Math.floor(i / cot);
      caoHang[hg] = Math.max(caoHang[hg] || 0, c);
    });

    var ve = '';
    o6.forEach(function (m, i) {
      var cx = le + (i % cot) * (rongO + 18);
      var cy = dinhLuoi + Math.floor(i / cot) * (caoO + 18);
      var s = sac[i % sac.length];
      var kinh = tamKinh(cx, cy, rongO, caoO, k, {sac: s.hex, bong: bong.id});
      var r = Math.round(Math.min(rongO, caoO) * 0.17);
      var giuaX = cx + Math.round(rongO / 2);

      /* ── CĂN CẢ CỤM VÀO GIỮA Ô, KHÔNG THẢ TỪ TRÊN XUỐNG ──
         Bản đầu đặt huy hiệu ở 0,27 chiều cao ô rồi thả tên và mô tả
         xuống dưới. Ô nào mô tả ngắn thì hở hẳn một mảng ở đáy, ô nào
         dài thì chật — sáu ô cùng khổ mà ruột lệch nhau, và mắt đọc
         ra ngay là "tấm này xếp ẩu" dù không chỉ được ra chỗ nào sai.
         Đo cụm trước, rồi mới đặt: đúng cách đã sửa cho tấm bìa. */
      var coTen = Math.round(kg.w / 44), coY = Math.round(kg.w / 66);
      var dTen = catDong(m.ten, '800 ' + coTen + 'px ' + CHU_THAN, rongO - 24);
      var dY = catDong(m.y, '500 ' + coY + 'px ' + CHU_THAN, rongO - 26);
      var hoTen = Math.round(caoO * 0.115), hoY = Math.round(caoO * 0.055);
      var dinhCum = cy + Math.round((caoO - caoHang[Math.floor(i / cot)]) / 2);

      var hh = huyHieu(giuaX, dinhCum + r, r, s.hex,
        THU_TU_HINH[i % THU_TU_HINH.length]);
      manh.push(kinh); manh.push(hh);
      ve += kinh.ve + hh.ve;

      var yTen = dinhCum + r * 2 + hoTen + coTen * 0.78;
      ve += veChu(m.ten, giuaX, yTen,
        {co: coTen, chu: CHU_THAN, dam: 800, mau: k.muc,
         rong: rongO - 24, gian: 1.2, can: 'middle', gianChu: 0.4}).svg;
      ve += veChu(m.y, giuaX,
        yTen + (dTen.length - 1) * coTen * 1.2 + hoY + coY * 1.05,
        {co: coY, chu: CHU_THAN, dam: 500, mau: k.muc2,
         rong: rongO - 26, gian: 1.34, can: 'middle'}).svg;
    });

    var g = gom(manh);
    var ruot = nen.ve +
      '<rect x="0" y="0" width="' + kg.w + '" height="6" fill="' + h(k.gita) + '"/>' +
      tieu.svg + ve +
      dauGita(k, le + 15, kg.h - Math.round(kg.h * 0.062));
    return {ok: true, svg: khung(kg, k, ruot, g.defs)};
  }

  /* ═══════════ BẢNG PHÂN VIỆC ═══════════
     Loại hình nào KHÔNG có tên ở đây thì bộ vẽ nói thẳng là chưa có.
     Danh sách trắng, không danh sách cấm — cùng luật với mọi cửa khác
     trong kho này: loại hình mới thêm vào ngày mai cũng không tự lọt
     qua đây và nhận một bố cục đại khái. */
  var BO_VE = {
    BIA:              {ve: veBia,    kho: 'rong'},
    MOT_SO:           {ve: veMotSo,  kho: 'rong'},
    BANDO_HANHTRINH:  {ve: veBanDo,  kho: 'rong'},
    /* Lưới ô mặc định khổ VUÔNG: sáu ô xếp 3×2 trên khổ ngang thì mỗi
       ô lùn quá cho hai dòng mô tả. Khổ vuông cho ô thở. */
    KHUNG:            {ve: veKhung,  kho: 'vuong'}
  };

  /* ═══════════ CỬA DUY NHẤT ═══════════ */
  G.veThiGiac = function (x, khoMuon) {
    if (!x || !x.id) return {ok: false,
      error: 'Bộ vẽ chỉ vẽ từ một bản ghi đề xuất. Không có hàm nào nhận chữ ' +
             'trần rồi vẽ — vẽ được chữ trần thì cổng Tầng thành đồ trang trí.'};

    /* ── KHÔNG QUA CỔNG TẦNG THÌ KHÔNG VẼ ──
       Mọi bản ghi trong sổ đều đã qua cổng lúc đề xuất, nên chỗ này
       gần như không bao giờ đỏ. Giữ lại vì "gần như" không phải là
       "không bao giờ": ngày nào đó có đường ghi thẳng vào sổ thì đây
       là chỗ chặn, và nó đã đứng sẵn. */
    if (!x.soatTang) return {ok: false,
      error: 'Bản ghi này chưa có dấu qua cổng Tầng. Chưa qua cổng thì chưa vẽ.'};

    var b = BO_VE[x.loaiHinh];
    if (!b) return {ok: false, chuaCo: true,
      error: 'Chưa có bộ vẽ cho loại hình "' + x.loaiHinh + '". Máy KHÔNG vẽ ' +
             'đại một khung chung rồi nhét chữ vào — một tấm vẽ đại là một ' +
             'suy diễn có màu, và luật C10 cấm đúng thứ đó. Đã vẽ được: ' +
             Object.keys(BO_VE).join(', ') + '.'};

    var kg = KHO_GIAY[khoMuon || b.kho] || KHO_GIAY[b.kho];
    var r;
    try { r = b.ve(x, kg); }
    catch (e) { return {ok: false, error: 'Bộ vẽ hỏng giữa chừng: ' + e.message}; }
    if (!r.ok) return r;
    return {ok: true, svg: r.svg, kho: kg.ten, w: kg.w, h: kg.h,
      vi: 'Vẽ trong máy này. Không một chữ nào rời khỏi trình duyệt — ' +
          'không có lượt hỏi mạng nào trong cả lượt vẽ.'};
  };

  /* Danh sách khổ và loại hình vẽ được, cho màn hình dựng ô chọn mà
     không phải chép lại hai bảng trên. */
  G.veThiGiacBiet = function () {
    return {loaiHinh: Object.keys(BO_VE),
      /* Khai ra sáu sắc đang dùng thật, để bộ kiểm đối chiếu được
         chúng với G.BRAND.mau. Không khai thì luật "màu lấy từ bảng
         đã chốt" chỉ là một câu trong chú giải. */
      sac: sacTang(),
      kho: Object.keys(KHO_GIAY).map(function (m) {
        return {ma: m, ten: KHO_GIAY[m].ten}; })};
  };
})();
