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

  /* ── HAI NỀN, VÀ NỀN SÂU LÀ MẶC ĐỊNH CHO ẤN PHẨM ──
     Bản 9.99.14 vẽ mọi tấm trên nền TRẮNG của giao diện, và tấm nào
     cũng nhợt: tấm kính trắng trên nền trắng thì gần như không tách
     ra khỏi nền, huy hiệu màu không phát sáng được, quầng sáng ở nền
     mờ tới mức không ai thấy.

     Câu trả lời nằm sẵn trong sổ thương hiệu, mục G.BRAND.mau:
       "Đêm sâu #070510 — Nền của mọi màn hình.
        ĐỂ ÁNH SÁNG CỦA HÀNH TRÌNH NỔI LÊN."
     Chính chủ hệ đã chốt từ v7.0. Tôi vẽ trên nền sáng suốt ba bản
     vừa rồi là làm ngược một quyết định đã có, chứ không phải thiếu
     một quyết định.

     Nền SÁNG vẫn giữ, cho hình nhúng thẳng vào giao diện ban ngày.
     Nền SÂU cho ẤN PHẨM — bìa, lưới ô, con số — vì đó là chỗ tấm
     hình đứng một mình và phải tự có sức nặng. */
  function bang(che) {
    if (che === 'giay') return bangGiay();
    var s = bangSang();
    if (che !== 'sau') return s;
    var ds = (G.BRAND && G.BRAND.mau) || [];
    var dem = ds.filter(function (x) { return x.k === 'Đêm sâu'; })[0];
    var day = (dem && dem.hex) || '#070510';
    return {
      nen: day,
      nen2: doiSang(day, 0.10),
      /* Chữ trên nền sâu KHÔNG dùng trắng tinh: trắng tinh trên gần
         đen bị loá viền chữ ở cỡ nhỏ. Hạ một nấc thì mềm mắt mà vẫn
         thừa tương phản — phép đo tương phản canh chỗ này. */
      muc: '#F4F6FB',
      muc2: 'rgba(226,233,247,0.80)',
      muc3: 'rgba(200,211,232,0.60)',
      gita: doiSang(s.gita, 0.22),
      gitaSang: doiSang(s.gitaSang, 0.20),
      gitaSau: s.gita,
      gitaInk: doiSang(s.gita, 0.46),
      do: doiSang(s.do, 0.24),
      doInk: doiSang(s.do, 0.40),
      vien: 'rgba(255,255,255,0.16)',
      sau: true
    };
  }

  /* ══════════ NỀN GIẤY — MẶC ĐỊNH CHO ẤN PHẨM ══════════

     ĐÂY LÀ CHỖ TÔI ĐÃ SAI, VÀ SAI VÌ ĐỌC MỘT DÒNG RỒI BỎ QUA BẢNG
     NGAY DƯỚI NÓ.

     Bản 9.99.15 tôi trích G.BRAND.mau: "Đêm sâu — nền của mọi màn
     hình" rồi lấy đó làm nền cho ẤN PHẨM. Nhưng bốn dòng bên dưới,
     trong cùng một đối tượng, G.BRAND.dungO là bảng ghi MÔI TRƯỜNG
     NÀO DÙNG NỀN NÀO:

       Web app       → nền đêm sâu
       Bản đồ A3 in  → NỀN GIẤY TRẮNG, CHỮ ĐEN, MÀU TẦNG LÀM MÃ MÀU
       Hợp đồng      → đen trắng, không hiệu ứng

     Đêm sâu là nền của MÀN HÌNH ỨNG DỤNG. Một tấm áp phích, một tấm
     tháp tầng, một tấm hành trình — đó là ẤN PHẨM, và ấn phẩm đã có
     dòng riêng: giấy trắng, chữ đen, màu tầng làm mã màu.

     ══ VÀ LẦN TRƯỚC NỀN SÁNG HỎNG VÌ MỘT LÝ DO KHÁC HẲN ══
     Bản 9.99.14 vẽ trên nền sáng và nhợt, nên tôi kết luận nhầm là
     "nền sáng sai". Không phải. Nó nhợt vì TẤM TRẮNG ĐẶT TRÊN NỀN
     TRẮNG — không có gì tách hai lớp ra. Trên giấy, thứ tách các lớp
     không phải bóng đổ mà là:
       · nền trang hơi xám, tấm thì TRẮNG HẲN
       · khối màu ĐẶC và BÃO HOÀ, không phải màu pha loãng
       · viền thật một pixel, không phải kính bán trong
     Đúng cách mọi tấm mẫu chủ hệ gửi đang làm. */
  function bangGiay() {
    var ds = (G.BRAND && G.BRAND.mau) || [];
    var dem = ds.filter(function (x) { return x.k === 'Đêm sâu'; })[0];
    var muc = (dem && dem.hex) || '#070510';
    var s = bangSang();
    return {
      /* Nền trang hơi xám để tấm TRẮNG nổi lên. Trắng trên trắng là
         đúng chỗ bản nền sáng trước đã chết. */
      nen: '#EEF1F7',
      nen2: '#FFFFFF',
      muc: muc,
      muc2: 'rgb(74,79,94)',
      /* Mực phụ trên giấy phải ĐẬM hơn hẳn trên màn: dòng chân dấu
         GITA chỉ 11px, và ở cỡ ấy ngưỡng là 4,5:1 chứ không phải 3,0.
         Xám nhạt quen mắt trên màn thì trên giấy là chữ chìm. */
      muc3: 'rgb(92,99,116)',
      gita: s.gita, gitaSang: s.gitaSang, gitaSau: s.gitaSau, gitaInk: s.gitaInk,
      do: s.do, doInk: s.doInk,
      vien: 'rgba(20,18,28,0.14)',
      giay: true
    };
  }

  /* Bảng màu một tấm hình. Gom lại một chỗ để mỗi bộ vẽ không tự đi
     hỏi lẻ — và để thấy ngay tấm hình đang dùng đúng mấy màu nào. */
  function bangSang() {
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
    var t = String(hex).trim(), r, g, b;
    var m = /^#?([0-9a-f]{6})$/i.exec(t);
    if (m) {
      var n = parseInt(m[1], 16); r = n >> 16; g = (n >> 8) & 255; b = n & 255;
    } else {
      /* getComputedStyle trả biến CSS về nguyên văn, mà nguyên văn có
         thể là "rgb(42,114,198)" chứ không phải mã băm. Bản đầu chỉ
         nhận mã băm nên nó lặng lẽ trả về nguyên chuỗi, và mọi chỗ
         pha sáng/tối thành không pha gì — hỏng mà không kêu. */
      var q = /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i.exec(t);
      if (!q) return hex;
      r = +q[1]; g = +q[2]; b = +q[3];
    }
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
    /* Ba quầng sáng radial, cùng ngôn ngữ với #aura của giao diện.
       Trên nền SÂU chúng đậm hơn hẳn: trên nền trắng một quầng 20%
       gần như vô hình, còn trên nền gần đen thì cùng quầng ấy dựng
       hẳn một khoảng không gian phía sau tấm. Đó chính là chỗ "để
       ánh sáng của hành trình nổi lên" có nghĩa thật.
       Cộng một lớp TỐI DẦN Ở RÌA (vignette): mắt tự tìm chỗ sáng
       nhất, nên rìa tối là cách đẩy mắt vào giữa mà không vẽ thêm
       gì để mắt phải đọc. */
    var a = idMoi('quang'), b = idMoi('quang'), c = idMoi('quang'), r = idMoi('ria');
    var d = (dam === undefined ? 1 : dam) * (k.sau ? 2.6 : (k.giay ? 0.55 : 1));
    var q = function (id, mau, dam2) {
      return '<radialGradient id="' + id + '" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="' + h(mau) + '" stop-opacity="' +
          Math.min(0.85, dam2 * d).toFixed(3) + '"/>' +
        '<stop offset="100%" stop-color="' + h(mau) + '" stop-opacity="0"/>' +
        '</radialGradient>'; };
    return {
      defs: q(a, k.gita, 0.20) + q(b, k.do, 0.09) + q(c, k.gitaSang, 0.13) +
        '<radialGradient id="' + r + '" cx="50%" cy="45%" r="72%">' +
          '<stop offset="55%" stop-color="#000000" stop-opacity="0"/>' +
          '<stop offset="100%" stop-color="#000000" stop-opacity="' +
            (k.sau ? '0.45' : (k.giay ? '0.03' : '0.06')) + '"/></radialGradient>',
      ve:
        '<ellipse cx="' + Math.round(kg.w * 0.80) + '" cy="' + Math.round(kg.h * 0.10) +
          '" rx="' + Math.round(kg.w * 0.50) + '" ry="' + Math.round(kg.h * 0.66) +
          '" fill="url(#' + a + ')"/>' +
        '<ellipse cx="' + Math.round(kg.w * 0.08) + '" cy="' + Math.round(kg.h * 0.96) +
          '" rx="' + Math.round(kg.w * 0.38) + '" ry="' + Math.round(kg.h * 0.48) +
          '" fill="url(#' + b + ')"/>' +
        '<ellipse cx="' + Math.round(kg.w * 0.22) + '" cy="' + Math.round(kg.h * 0.06) +
          '" rx="' + Math.round(kg.w * 0.36) + '" ry="' + Math.round(kg.h * 0.40) +
          '" fill="url(#' + c + ')"/>' +
        '<rect width="' + kg.w + '" height="' + kg.h + '" fill="url(#' + r + ')"/>'
    };
  }

  /* ── MỘT NGUỒN SÁNG, TỪ TRÊN BÊN TRÁI ──
     Bản trước đổ bóng thẳng xuống (dx=0) nhưng lại vẽ vệt sáng ở cạnh
     TRÊN — hai chi tiết ấy kể hai câu chuyện khác nhau về chỗ ánh
     sáng đến từ đâu, và mắt đọc ra ngay là "hình này giả" dù không
     chỉ được chỗ nào sai.
     Chốt một hướng: sáng từ trên-trái. Bóng lệch xuống-phải, vệt sáng
     ở cạnh trên và cạnh trái. Mọi thứ trong tấm theo đúng một hướng.

     Ba BẬC NỔI, không phải một bóng cho mọi thứ: nền(0) · tấm(1) ·
     huy hiệu(2). Vật càng nổi thì bóng càng xa và càng mềm — đó là
     cách mắt đo khoảng cách, và dùng một bóng cho mọi thứ là bỏ mất
     công cụ ấy. */
  var HUONG_SANG = {dx: 0.42, dy: 1};
  function defBong(k, bac) {
    var id = idMoi('bong');
    var n = bac || 1;
    var xa = [0, 12, 22][n] || 12;
    var toe = [0, 16, 26][n] || 16;
    var dam = k.sau ? [0, 0.55, 0.62][n]
      : (k.giay ? [0, 0.13, 0.17][n] : [0, 0.16, 0.20][n]);
    var mau = k.sau ? '#000000' : (k.giay ? '#1A2340' : k.gitaSau);
    return {id: id, defs:
      '<filter id="' + id + '" x="-40%" y="-40%" width="185%" height="200%">' +
        '<feDropShadow dx="' + (xa * HUONG_SANG.dx).toFixed(1) + '" dy="' +
          (xa * HUONG_SANG.dy).toFixed(1) + '" stdDeviation="' + toe + '" ' +
          'flood-color="' + h(mau) + '" flood-opacity="' + dam + '"/>' +
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
    /* Trên nền SÂU, tấm kính là một mảng TRẮNG RẤT MỜ chứ không phải
       một mảng trắng đục: mảng đục cắt hẳn khỏi nền và thành một cái
       thẻ dán lên, còn mảng mờ cho quầng sáng phía sau lọt qua và
       tấm mới thật sự nằm TRONG không gian ấy. Đó là khác biệt giữa
       "có bóng đổ" và "có chiều sâu". */
    var mo = k.sau;
    /* Trên GIẤY: tấm trắng hẳn, không pha. Nền trang đã hơi xám nên
       chính độ trắng là thứ tách tấm ra — thêm chuyển sắc vào đây là
       làm tấm xám đi và mất luôn cái tách ấy. */
    var d1 = mo ? 'rgba(255,255,255,0.13)' : (k.giay ? '#FFFFFF' : doiSang(k.nen, 0.06));
    var d2 = mo ? 'rgba(255,255,255,0.05)' : (k.giay ? '#FFFFFF' : k.nen2);
    var op = mo ? '1' : (k.giay ? '1' : '0.94');
    return {
      defs: '<linearGradient id="' + g + '" x1="0.15" y1="0" x2="0.85" y2="1">' +
        '<stop offset="0%" stop-color="' + h(d1) + '" stop-opacity="' + op + '"/>' +
        '<stop offset="100%" stop-color="' + h(d2) + '" stop-opacity="' + op + '"/>' +
        '</linearGradient>',
      ve:
        '<g' + (o.bong ? ' filter="url(#' + o.bong + ')"' : '') + '>' +
          '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + ht +
            '" rx="' + r + '" fill="url(#' + g + ')" stroke="' + h(sac) +
            '" stroke-opacity="' + (mo ? '0.42' : (k.giay ? '0.55' : '0.22')) +
            '" stroke-width="' + (k.giay ? '1.5' : '1') + '"/>' +
          /* Vệt sáng ôm cạnh TRÊN và cạnh TRÁI — đúng hướng nguồn sáng
             đã chốt. Bản trước chỉ vẽ cạnh trên, nên tấm trông như bị
             chiếu thẳng từ đỉnh đầu chứ không từ trên-trái. */
          (k.giay ? '' :
          '<path d="M' + (x + 0.9) + ' ' + (y + ht * 0.55) + ' V' + (y + r) +
            ' A' + r + ' ' + r + ' 0 0 1 ' + (x + r) + ' ' + (y + 0.9) +
            ' H' + (x + w - r) + '" fill="none" stroke="' +
            (mo ? 'rgba(255,255,255,0.55)' : h(doiSang(k.nen, 0.9))) +
            '" stroke-opacity="0.9" stroke-width="1.4" stroke-linecap="round"/>') +
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

  function huyHieu(cx, cy, r, hex, hinh, bong, k) {
    var g = idMoi('hh'), a = idMoi('anh'), q = idMoi('quanghh');
    var bo = Math.round(r * 0.62);
    /* Quầng sáng toả sau huy hiệu là ngôn ngữ của MÀN HÌNH: nó nói
       "vật này phát sáng". Giấy không phát sáng. Để nguyên quầng trên
       nền giấy thì huy hiệu trông nhoè như in lem, chứ không trông
       sáng — và đó đúng là chỗ cuối cùng còn mùi web trên một tấm ấn
       phẩm. Tắt hẳn khi vẽ trên giấy. */
    var coQuang = !(k && k.giay);
    return {
      defs:
        /* Chuyển sắc chạy theo ĐÚNG hướng nguồn sáng: sáng ở góc
           trên-trái, tối dần xuống góc dưới-phải. */
        '<linearGradient id="' + g + '" x1="0.1" y1="0" x2="0.9" y2="1">' +
          '<stop offset="0%" stop-color="' + h(doiSang(hex, 0.30)) + '"/>' +
          '<stop offset="52%" stop-color="' + h(hex) + '"/>' +
          '<stop offset="100%" stop-color="' + h(doiSang(hex, -0.26)) + '"/>' +
        '</linearGradient>' +
        /* Vệt ÁNH ở nửa trên — thứ làm một khối màu trông như một vật
           có mặt bóng, thay vì một ô màu tô đặc. Rất nhẹ: thấy được
           thì hỏng, chỉ nên cảm được. */
        '<linearGradient id="' + a + '" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.34"/>' +
          '<stop offset="60%" stop-color="#FFFFFF" stop-opacity="0.04"/>' +
          '<stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>' +
        '</linearGradient>' +
        /* Quầng màu toả ra sau huy hiệu. Trên nền sâu đây là chỗ sắc
           tầng thật sự PHÁT SÁNG chứ chỉ nằm im. */
        '<radialGradient id="' + q + '" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="' + h(hex) + '" stop-opacity="0.42"/>' +
          '<stop offset="100%" stop-color="' + h(hex) + '" stop-opacity="0"/>' +
        '</radialGradient>',
      ve:
        (coQuang ? '<circle cx="' + cx + '" cy="' + cy + '" r="' +
          Math.round(r * 1.85) + '" fill="url(#' + q + ')"/>' : '') +
        '<g' + (bong ? ' filter="url(#' + bong + ')"' : '') + '>' +
          '<rect x="' + (cx - r) + '" y="' + (cy - r) + '" width="' + (r * 2) +
            '" height="' + (r * 2) + '" rx="' + bo + '" fill="url(#' + g + ')"/>' +
          '<rect x="' + (cx - r) + '" y="' + (cy - r) + '" width="' + (r * 2) +
            '" height="' + r + '" rx="' + bo + '" fill="url(#' + a + ')"/>' +
          '<rect x="' + (cx - r + 0.7) + '" y="' + (cy - r + 0.7) + '" width="' +
            (r * 2 - 1.4) + '" height="' + (r * 2 - 1.4) + '" rx="' + bo +
            '" fill="none" stroke="#FFFFFF" stroke-opacity="0.30" stroke-width="1.2"/>' +
          '<g transform="translate(' + cx + ',' + cy + ') scale(' + (r / 15).toFixed(3) +
            ')" fill="#FFFFFF" fill-rule="evenodd">' + HINH[hinh] + '</g></g>'
    };
  }

  /* ── MỰC ĐẶT TRÊN MỘT MẢNG MÀU ĐẶC ──
     Mặc định trắng là sai một nửa số lần. Sáu sắc thương hiệu có cả
     sắc TỐI (tím, xanh dương) lẫn sắc SÁNG (hổ phách, lục): chữ trắng
     trên hổ phách chỉ được 2,5:1 — phép đo tương phản bắt ngay.
     Luật: đo độ sáng của chính mảng màu ấy rồi chọn mực. Đây là chỗ
     một bảng màu nhiều sắc BẮT BUỘC phải có, còn bảng một sắc thì
     không ai để ý là thiếu. */
  function doSang(hex) {
    var t = String(hex), r, g, b;
    var m = /^#?([0-9a-f]{6})$/i.exec(t.trim());
    if (m) { var n = parseInt(m[1], 16); r = n >> 16; g = (n >> 8) & 255; b = n & 255; }
    else {
      var q = /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i.exec(t);
      if (!q) return 0.5;
      r = +q[1]; g = +q[2]; b = +q[3];
    }
    var f = function (v) { v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  }
  /* ── KHÔNG ĐẶT NGƯỠNG ĐỘ SÁNG: TÍNH CẢ HAI RỒI CHỌN ──
     Bản đầu viết "sáng hơn 0,42 thì dùng mực đen". Con số 0,42 là một
     con số ma, và nó sai ngay ở sắc LAM #06B6D4: độ sáng 0,38 nên máy
     chọn mực trắng, mà trắng trên lam chỉ được 2,5:1 — trong khi mực
     đen trên chính nó được 7,4:1. Lam là màu "không bên nào": không
     đủ tối cho chữ trắng, không đủ sáng để bị coi là màu sáng.
     Bỏ ngưỡng đi. Đo tương phản của CẢ HAI mực rồi lấy mực thắng.
     Không còn con số nào để đoán sai. */
  var MUC_TOI = '#15121F';
  function tuongPhan(a, b) {
    var L1 = doSang(a), L2 = doSang(b);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  }
  /* Chọn mực theo ĐẦU TỆ NHẤT của dải, không theo màu gốc.
     Nêm được tô bằng chuyển sắc, nên chữ nằm trên một KHOẢNG màu chứ
     không nằm trên một màu. Chọn theo màu gốc thì mực thắng ở giữa
     nêm mà thua ở một đầu — và phép đo lấy trung bình nền ngay dưới
     chữ nên nó bắt được đúng chỗ ấy.
     Kéo theo một luật nữa: dải của nêm phải HẸP. Dải càng rộng thì
     đầu tệ nhất càng tệ, tới mức không mực nào cứu được. */
  /* Trên GIẤY dải của nêm còn hẹp hơn nữa: mắt trên nền trắng nhạy
     với sắc độ hơn hẳn, nên một dải rộng làm khối màu trông bẩn chứ
     không trông có khối. Tấm mẫu chủ hệ gửi dùng khối màu gần như
     ĐẶC — chỉ một chút chuyển để không chết cứng. */
  var NEM_DAI = 0.12;
  function nemDai(k) { return k && k.giay ? 0.07 : NEM_DAI; }
  function mucTren(hex) {
    var s1 = doiSang(hex, NEM_DAI), s2 = doiSang(hex, -NEM_DAI);
    var t = Math.min(tuongPhan(MUC_TOI, s1), tuongPhan(MUC_TOI, s2));
    var w = Math.min(tuongPhan('#FFFFFF', s1), tuongPhan('#FFFFFF', s2));
    return t >= w ? MUC_TOI : '#FFFFFF';
  }
  /* Dòng phụ trên mảng màu dùng ĐÚNG mực ấy, không pha loãng.
     Làm mờ đi để tạo thứ bậc là cách rẻ tiền và nó ăn thẳng vào
     tương phản: mực đen 80% trên nền tầng chỉ còn 4,19:1, hụt ngưỡng.
     Thứ bậc dựng bằng CỠ CHỮ và ĐỘ ĐẬM — hai thứ không tốn một chút
     tương phản nào. */
  function mucPhuTren(hex) { return mucTren(hex); }

  /* ── NHÃN TRÊN ──
     Dòng chữ nhỏ, viết hoa, giãn chữ rộng, đứng TRÊN tiêu đề. Việc
     của nó là nói tấm này thuộc loại gì trước khi mắt đọc tiêu đề —
     và nó là thứ tách một tấm có dựng khỏi một tấm chỉ gõ chữ to. */
  function nhanTren(chu, x, y, k, co) {
    var c = co || 17;
    return '<g>' +
      '<rect x="' + x + '" y="' + Math.round(y - c * 0.78) + '" width="' + Math.round(c * 0.28) +
        '" height="' + Math.round(c * 1.02) + '" rx="' + Math.round(c * 0.14) +
        '" fill="' + h(k.do) + '"/>' +
      '<text x="' + Math.round(x + c * 0.95) + '" y="' + y + '" font-family="' + h(CHU_THAN) +
        '" font-size="' + c + '" font-weight="800" fill="' + h(k.gitaInk) +
        '" letter-spacing="' + (c * 0.16).toFixed(1) + '">' +
        h(String(chu).toUpperCase()) + '</text></g>';
  }

  /* ── DẢI BĂNG ──
     Một câu ngắn nằm trong một dải màu đặc, viết hoa. Ảnh mẫu chủ hệ
     gửi có đúng một dải như thế và nó gánh gần hết sức nặng của tấm:
     nó là chỗ DUY NHẤT có nền đặc, nên mắt dừng ở đó sau tiêu đề.
     Chỉ được MỘT dải một tấm — hai dải thì không dải nào còn là điểm
     dừng. */
  function daiBang(chu, giuaX, y, k, rongToiDa) {
    var c = 22, g = idMoi('bang');
    var chuHoa = String(chu).toUpperCase();
    var rong = doRong(chuHoa, '800 ' + c + 'px ' + CHU_THAN) + c * 3.4;
    while (rong > rongToiDa && c > 12) {
      c -= 1; rong = doRong(chuHoa, '800 ' + c + 'px ' + CHU_THAN) + c * 3.4;
    }
    var ht = Math.round(c * 2.05);
    return {
      defs: '<linearGradient id="' + g + '" x1="0" y1="0" x2="1" y2="0.6">' +
        '<stop offset="0%" stop-color="' + h(doiSang(k.do, 0.14)) + '"/>' +
        '<stop offset="100%" stop-color="' + h(doiSang(k.do, -0.24)) + '"/>' +
        '</linearGradient>',
      cao: ht,
      ve: '<g>' +
        '<rect x="' + Math.round(giuaX - rong / 2) + '" y="' + Math.round(y) +
          '" width="' + Math.round(rong) + '" height="' + ht + '" rx="' +
          Math.round(ht / 2) + '" fill="url(#' + g + ')"/>' +
        '<text x="' + giuaX + '" y="' + Math.round(y + ht * 0.685) +
          '" text-anchor="middle" font-family="' + h(CHU_THAN) + '" font-size="' + c +
          '" font-weight="800" fill="#FFFFFF" letter-spacing="' +
          (c * 0.10).toFixed(1) + '">' + h(chuHoa) + '</text></g>'
    };
  }

  /* Đọc các dòng ĐÁNH DẤU trong nội dung. Máy không đoán đâu là nhãn,
     đâu là dải băng — người viết gõ dấu ra. Cùng luật với lưới ô. */
  function docDau(chu, dau) {
    var re = new RegExp('^\\s*' + dau + '\\s*:\\s*(.+)$', 'im');
    var m = re.exec(String(chu || ''));
    return m ? m[1].trim() : '';
  }
  function boDau(chu) {
    return String(chu || '').split('\n')
      .filter(function (d) { return !/^\s*(NHÃN|BĂNG)\s*:/i.test(d); })
      .join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  /* Chữ chuyển sắc — cùng ngôn ngữ với .grad-text của giao diện:
     xanh sâu → xanh → đỏ. Chỉ dùng cho MỘT câu trong tấm; hai câu
     chuyển sắc thì không câu nào còn là câu chính. */
  function defChuSac(k) {
    var id = idMoi('chusac');
    /* ── DẢI CHUYỂN SẮC PHẢI ĐỌC ĐƯỢC Ở CẢ HAI ĐẦU ──
       Trên nền sáng, dải chạy xanh-sâu → xanh → đỏ-sẫm: cả ba chặng
       đều tối, đều nổi trên nền trắng.
       Lật sang nền SÂU mà giữ nguyên ba chặng ấy thì đầu cuối chìm
       hẳn — phép đo tương phản bắt được 2,17:1 ở câu TO NHẤT của
       tấm, tức là chỗ tệ nhất có thể tệ. Trên nền sâu dải phải chạy
       ngược: sáng → sáng hơn → hồng sáng. */
    var a = k.sau ? doiSang(k.gita, 0.42) : k.gitaSau;
    var b = k.sau ? '#EAF1FC' : k.gita;
    var c = k.sau ? doiSang(k.do, 0.42) : k.doInk;
    return {id: id, defs:
      '<linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="0.35">' +
        '<stop offset="0%" stop-color="' + h(a) + '"/>' +
        '<stop offset="52%" stop-color="' + h(b) + '"/>' +
        '<stop offset="100%" stop-color="' + h(c) + '"/>' +
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
        'font-weight="800" fill="' + h(k.sau ? k.muc : k.gitaSau) +
        '" letter-spacing="1.6">GITA 365</text>' +
      '<text x="26" y="15" font-family="' + h(CHU_THAN) + '" font-size="10.5" ' +
        'font-weight="600" fill="' + h(k.sau ? k.muc2 : k.muc3) + '" letter-spacing="1.1">' +
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
  function veBia(x, kg, che) {
    var k = bang(che);
    var chu = boDau(x.noiDung);
    var nhan = docDau(x.noiDung, 'NHÃN'), bang2 = docDau(x.noiDung, 'BĂNG');
    var cau = cauDau(chu), phu = cauHai(chu);
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
    /* Nhãn trên và dải băng chiếm chỗ THẬT, nên phải vào phép tính căn
       giữa. Vẽ xong mới nhớ ra là chúng có chiều cao thì cả khối đã
       lệch — đúng lớp lỗi đã sửa hai lần trước ở tấm bìa và lưới ô. */
    var caoNhan = nhan ? Math.round(co * 0.62) : 0;
    var dbang = bang2 ? daiBang(bang2, Math.round(kg.w / 2), 0, k, rong) : null;
    var caoBang = dbang ? dbang.cao + Math.round(co * 0.55) : 0;

    var dayVung = kg.h - Math.round(kg.h * 0.085) - 34;   /* chừa chỗ dấu GITA */
    var dinh = Math.round((dayVung - caoNhan - caoCau - caoPhu - caoBang) / 2) +
      caoNhan + co * 0.32;

    var nen = lopNen(kg, k);
    var cs = defChuSac(k);
    var t = veChu(cau, le, dinh, {co: co, chu: CHU_TIEU, dam: 600,
      mau: 'url(#' + cs.id + ')', rong: rong, gian: 1.24});
    var o = nen.ve +
      '<rect x="0" y="0" width="' + kg.w + '" height="6" fill="' + h(k.gita) + '"/>';
    o += nhan
      ? nhanTren(nhan, le, Math.round(dinh - co * 0.92), k, Math.round(co * 0.30))
      : '<rect x="' + le + '" y="' + Math.round(dinh - co * 1.02) +
        '" width="52" height="4" rx="2" fill="' + h(k.do) + '"/>';
    o += t.svg;
    var day = dinh + t.cao;
    if (phu) {
      o += veChu(phu, le, day + co * 0.5, {co: coPhu,
        chu: CHU_THAN, dam: 500, mau: k.muc2, rong: rong, gian: 1.45}).svg;
      day += caoPhu;
    }
    if (dbang) {
      dbang = daiBang(bang2, Math.round(kg.w / 2), Math.round(day + co * 0.55), k, rong);
      o += dbang.ve;
    }
    o += dauGita(k, le + 15, kg.h - Math.round(kg.h * 0.085));
    return {ok: true, svg: khung(kg, k, o,
      nen.defs + cs.defs + (dbang ? dbang.defs : ''))};
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

  function veMotSo(x, kg, che) {
    var k = bang(che);
    var chu = boDau(x.noiDung);
    var nhan = docDau(x.noiDung, 'NHÃN'), bang2 = docDau(x.noiDung, 'BĂNG');
    var s = timSo(chu + ' ' + x.nhiemVu);
    if (!s) return {ok: false,
      error: 'Loại hình MỘT CON SỐ mà trong nội dung không có con số nào. ' +
             'Máy không tự nghĩ ra một con số để lấp chỗ — viết con số vào ' +
             'nội dung rồi vẽ lại.'};

    var cau = cauDau(chu), le = Math.round(kg.w * 0.085);
    var rong = kg.w - le * 2;
    var coSo = Math.round(kg.w / 6.2);
    while (doRong(s.so, '800 ' + coSo + 'px ' + CHU_THAN) > rong && coSo > 40) coSo -= 4;

    var giua = Math.round(kg.w / 2), dinh = Math.round(kg.h * 0.44);
    var nen = lopNen(kg, k);
    var cs = defChuSac(k);
    var o = nen.ve +
      '<rect x="0" y="0" width="' + kg.w + '" height="6" fill="' + h(k.gita) + '"/>' +
      /* Nhãn trên đứng cùng lề với dấu GITA ở góc dưới, nên hai đầu
         tấm neo vào một đường dọc — mắt đọc ra là tấm có trục, chứ
         không phải mấy khối rời thả vào giữa. */
      (nhan ? nhanTren(nhan, le, Math.round(dinh - coSo * 0.92), k, 18) : '') +
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
  function veBanDo(x, kg, che) {
    var k = bang(che);
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
          /* Đỏ tươi dùng làm MẢNG thì tốt, làm CHỮ trên giấy thì hụt:
             3,62:1 ở cỡ 22px. Chữ dùng đỏ sẫm, mảng vẫn dùng đỏ tươi —
             hai vai trò khác nhau của cùng một màu thương hiệu. */
          '" font-weight="800" fill="' + h(day ? (k.giay ? k.doInk : k.do)
            : (k.sau ? k.muc : k.gitaSau)) + '" ' +
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

  function veKhung(x, kg, che) {
    var k = bang(che);
    var o6 = catO(x.noiDung);
    var nhan = docDau(x.noiDung, 'NHÃN'), bang2 = docDau(x.noiDung, 'BĂNG');
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
    var dayLuoi = kg.h - Math.round(kg.h * 0.115);
    var rongO = Math.round((kg.w - le * 2 - 18 * (cot - 1)) / cot);

    var nen = lopNen(kg, k, 1.3);
    var bong = defBong(k, 1);
    var bongHh = defBong(k, 2);
    var cs = defChuSac(k);
    var manh = [nen, bong, bongHh, cs];

    /* Tiêu đề dùng chữ nhấn và chuyển sắc — MỘT câu duy nhất trong
       tấm được phép, đúng luật của .grad-text. */
    var coTieu = Math.round(kg.w / 26);
    var yTieu = Math.round(kg.h * (nhan ? 0.175 : 0.155));
    var tieu = veChu(x.nhiemVu, le, yTieu,
      {co: coTieu, chu: CHU_TIEU, dam: 600,
       mau: 'url(#' + cs.id + ')', rong: kg.w - le * 2, gian: 1.2});
    var dnhan = nhan
      ? nhanTren(nhan, le, Math.round(yTieu - coTieu * 0.92), k, Math.round(coTieu * 0.34))
      : '';

    /* ── LƯỚI BẮT ĐẦU Ở CHỖ KHỐI TRÊN KẾT THÚC ──
       Bản đầu neo đỉnh lưới vào một tỷ lệ CỐ ĐỊNH của chiều cao tấm
       (0,235) mà không hỏi khối tiêu đề cao bao nhiêu — nên khi thêm
       dải băng, dải ấy đè thẳng lên đáy tiêu đề. Đúng lớp lỗi "đặt
       bằng một con số đoán thay vì đo khối trước" đã sửa ba lần rồi ở
       tấm bìa và trong từng ô; lần này nó quay lại ở tầng bố cục lớn.
       Nay chảy theo thứ tự thật: nhãn → tiêu đề → dải băng → lưới. */
    var day = yTieu + tieu.cao;
    var dbang = null;
    if (bang2) {
      dbang = daiBang(bang2, Math.round(kg.w / 2),
        Math.round(day + coTieu * 0.30), k, kg.w - le * 2);
      manh.push(dbang);
      day = day + coTieu * 0.30 + dbang.cao;
    }
    var dinhLuoi = Math.round(day + coTieu * 0.72);
    var caoO = Math.round((dayLuoi - dinhLuoi - 18 * (hang - 1)) / hang);

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
        THU_TU_HINH[i % THU_TU_HINH.length], bongHh.id, k);
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

    /* Dải băng đứng NGAY DƯỚI tiêu đề, trên lưới — đúng chỗ ảnh mẫu
       chủ hệ gửi đặt nó, và đúng vì mắt đi từ tiêu đề xuống lưới thì
       nó nằm trên đường đi ấy. Đặt nó dưới đáy tấm thì mắt đã rời đi
       trước khi tới. */
    var g = gom(manh);
    var ruot = nen.ve +
      '<rect x="0" y="0" width="' + kg.w + '" height="6" fill="' + h(k.gita) + '"/>' +
      dnhan + tieu.svg + (dbang ? dbang.ve : '') + ve +
      dauGita(k, le + 15, kg.h - Math.round(kg.h * 0.062));
    return {ok: true, svg: khung(kg, k, ruot, g.defs)};
  }

  /* ═══════════════════════════════════════════════════════════════
     CẤU TRÚC MANG NGHĨA, KHÔNG PHẢI LƯỚI Ô CHO MỌI THỨ

     Chủ hệ gửi năm tấm mẫu và nói tư duy thiết kế của máy còn xấu.
     Đọc kỹ năm tấm thì chúng KHÔNG hơn nhau ở hiệu ứng — chúng hơn ở
     CẤU TRÚC THÔNG TIN:

       · tháp năm tầng, mỗi tầng một nêm số cộng một thẻ ba cột
       · hai cột đối chứng, mỗi bên một danh sách có dấu đúng/sai
       · ba vòng giao nhau, chỗ giao là câu trả lời
       · ray đánh số mười hai bước, mỗi bước một cụm gạch đầu dòng

     Máy trước đó chỉ dựng được LƯỚI Ô — cấu trúc yếu nhất trong cả
     năm — rồi đi mài bóng đổ cho nó. Mài bề mặt của một cấu trúc sai
     thì càng mài càng lộ ra là sai.

     Ba cấu trúc kia ĐÃ CÓ TÊN trong hiến pháp từ trước: SO_SANH_TANG
     "bảng cột theo chặng", QUY_TRINH "chuỗi bước", TRUOC_SAU "hai cột
     đối xứng". Chúng không phải thứ phải nghĩ ra — chúng là thứ đã
     khai mà chưa ai dựng.

     ══ VÀ THỨ THẬT SỰ THIẾU: MẬT ĐỘ ══
     Mỗi tấm mẫu mang bốn mươi tới một trăm mẩu chữ. Lưới ô của máy
     mang sáu. Một tấm hình đáng để người ta dừng lại nhìn là tấm TRẢ
     CÔNG cho việc dừng lại — nên ô phải chứa được DANH SÁCH, không
     chỉ một câu.
     ═══════════════════════════════════════════════════════════════ */

  /* Gạch đầu dòng trong một ô. Trả cả chiều cao đã dùng, vì mọi bố
     cục ở đây xếp chồng và khối nào cũng phải nói mình cao bao nhiêu. */
  function veGachDau(ds, x, y, o) {
    var co = o.co, rong = o.rong, ra = '', cao = 0;
    ds.forEach(function (d) {
      var dong = catDong(d, '500 ' + co + 'px ' + CHU_THAN, rong - co * 1.15);
      ra += '<circle cx="' + (x + co * 0.30) + '" cy="' + (y + cao + co * 0.30) +
        '" r="' + (co * 0.17).toFixed(1) + '" fill="' + h(o.cham || o.mau) + '"/>';
      dong.forEach(function (t, i) {
        ra += '<text x="' + (x + co * 1.05) + '" y="' +
          (y + cao + i * co * 1.36 + co * 0.55) + '" font-family="' + h(CHU_THAN) +
          '" font-size="' + co + '" font-weight="500" fill="' + h(o.mau) + '">' +
          h(t) + '</text>';
      });
      cao += dong.length * co * 1.36 + co * 0.30;
    });
    return {svg: ra, cao: cao};
  }

  /* ── ĐỌC KHỐI TẦNG ──
     TẦNG 5 | Tầm nhìn & Di sản | Coach truyền cảm hứng
     MỤC TIÊU — Kiến tạo tầm nhìn lớn, giá trị và di sản.
     COACH LÀM GÌ — Khai mở sứ mệnh, tầm nhìn 10x–100x.
     KẾT QUẢ — Khách hàng sống có ý nghĩa, tạo di sản.

     Vẫn một luật: NGƯỜI VIẾT GÕ RA, máy không đoán đâu là một tầng. */
  function catTang(chu) {
    var ra = [], nay = null;
    String(chu || '').split('\n').forEach(function (d) {
      var t = /^\s*(?:TẦNG|BẬC|CẤP)\s+(\S+)\s*\|\s*([^|]+?)\s*(?:\|\s*(.+?))?\s*$/i.exec(d);
      if (t) { nay = {so: t[1], ten: t[2].trim(), vai: (t[3] || '').trim(), o: []};
        ra.push(nay); return; }
      var c = /^\s*(.{2,40}?)\s+[—–]\s+(.{4,})$/.exec(d);
      if (c && nay) nay.o.push({ten: c[1].trim(), y: c[2].trim()});
    });
    return ra.filter(function (x) { return x.o.length; });
  }

  function veSoSanhTang(x, kg, che) {
    var k = bang(che);
    var ds = catTang(x.noiDung);
    var nhan = docDau(x.noiDung, 'NHÃN'), bang2 = docDau(x.noiDung, 'BĂNG');
    if (ds.length < 2) return {ok: false,
      error: 'Bảng tầng cần ít nhất HAI tầng. Mỗi tầng mở bằng một dòng ' +
             '"TẦNG 5 | Tên tầng | Vai của Coach", rồi các dòng "CỘT — nội dung" ' +
             'ngay dưới nó (tối đa ba cột mỗi tầng). Máy KHÔNG tự chia nội dung ' +
             'thành tầng: chia kiểu gì cũng là đoán. Đang đọc ra ' + ds.length + ' tầng.'};
    var sac = sacTang();
    if (!sac.length) return {ok: false,
      error: 'Chưa mở được bảng màu thương hiệu (G.BRAND.mau).'};

    ds = ds.slice(0, 6);
    var le = Math.round(kg.w * 0.045);
    var nen = lopNen(kg, k, 1.2);
    var bong = defBong(k, 1);
    var cs = defChuSac(k);
    var manh = [nen, bong, cs];

    /* ĐẦU TẤM chảy theo thứ tự thật, như đã sửa cho lưới ô. */
    var coTieu = Math.round(kg.w / 22);
    var yTieu = Math.round(kg.h * (nhan ? 0.075 : 0.062)) + coTieu;
    var tieu = veChu(x.nhiemVu, Math.round(kg.w / 2), yTieu,
      {co: coTieu, chu: CHU_TIEU, dam: 600, mau: 'url(#' + cs.id + ')',
       rong: kg.w - le * 2, gian: 1.16, can: 'middle'});
    var dnhan = nhan ? nhanTren(nhan, le + 6,
      Math.round(yTieu - coTieu * 0.95), k, Math.round(coTieu * 0.40)) : '';
    var day = yTieu + tieu.cao;
    var dbang = null;
    if (bang2) {
      dbang = daiBang(bang2, Math.round(kg.w / 2), Math.round(day + coTieu * 0.22),
        k, kg.w - le * 2);
      manh.push(dbang);
      day = day + coTieu * 0.22 + dbang.cao;
    }

    var dinh = Math.round(day + coTieu * 0.52);
    var dayBang2 = kg.h - Math.round(kg.h * 0.075);
    var khe = 12;
    var caoT = Math.round((dayBang2 - dinh - khe * (ds.length - 1)) / ds.length);
    /* Nêm bên trái rộng đúng một phần tư: đủ cho số lớn và tên tầng,
       mà không ăn vào chỗ của ba cột — ba cột mới là phần mang tin. */
    var rongNem = Math.round(kg.w * 0.25);
    var rongThe = kg.w - le * 2 - rongNem - 10;

    var ve = '';
    ds.forEach(function (t, i) {
      var y = dinh + i * (caoT + khe);
      var s = sac[(ds.length - 1 - i) % sac.length];
      /* ── NÊM, KHÔNG PHẢI HỘP ──
         Cạnh phải vát chéo cho tầng trên hẹp hơn tầng dưới, nên xếp
         chồng lại thành một cái THÁP. Hộp vuông xếp chồng chỉ là một
         danh sách; hình tháp nói thêm một điều mà danh sách không nói:
         tầng trên đứng TRÊN tầng dưới, và không nhảy cóc được. */
      var vat = Math.round(rongNem * 0.14 * (ds.length - i) / ds.length);
      var gN = idMoi('nem');
      manh.push({defs: '<linearGradient id="' + gN + '" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="' + h(doiSang(s.hex, nemDai(k))) + '"/>' +
        '<stop offset="100%" stop-color="' + h(doiSang(s.hex, -nemDai(k))) + '"/>' +
        '</linearGradient>'});
      ve += '<g filter="url(#' + bong.id + ')"><path d="M' + le + ' ' + y +
        ' H' + (le + rongNem - vat) + ' L' + (le + rongNem) + ' ' + (y + caoT) +
        ' H' + le + ' Z" fill="url(#' + gN + ')"/></g>';

      /* ── THANG CHỮ NEO VÀO KHỔ TẤM, KHÔNG NEO VÀO CHIỀU CAO HÀNG ──
         Bản đầu tính mọi cỡ chữ theo caoT. Ba tầng thì mỗi hàng cao
         gấp đôi năm tầng, nên cùng một tấm mà chữ phình từ 26px lên
         43px và con số từ 65px lên 108px — chữ to ra chỉ VÌ ÍT HÀNG,
         không vì nó quan trọng hơn.
         Đó là lỗi tư duy chứ không phải lỗi vặt: cỡ chữ phải nói về
         VAI TRÒ của chữ trong tấm, không nói về việc hôm nay có mấy
         hàng. Neo vào bề ngang tấm, rồi chặn trần theo chiều cao hàng
         để hàng thấp không bị tràn. */
      var coSo = Math.min(Math.round(kg.w * 0.062), Math.round(caoT * 0.34));
      var xSo = le + Math.round(rongNem * 0.11);
      /* ── SỐ HẸP VẪN PHẢI CHIẾM MỘT CỘT RỘNG BẰNG NHAU ──
         Bản đầu đặt tên tầng ngay sau bề rộng THẬT của chữ số, nên số
         "1" hẹp khiến tên dính sát vào nó, còn số "5" rộng thì tên
         lùi ra — năm tầng, năm chỗ bắt đầu khác nhau, và tầng 1 thì
         chữ chồng lên số. Chốt một cột số rộng cố định: mọi tên tầng
         bắt đầu ở đúng một đường dọc. */
      var rongCotSo = Math.max(
        doRong(t.so, '800 ' + coSo + 'px ' + CHU_THAN), coSo * 0.66);
      var xT = Math.round(xSo + rongCotSo + coSo * 0.30);
      var rongTen = rongNem - (xT - le) - vat - 10;

      /* Căn cả cụm (tên + vai) vào giữa nêm theo chiều dọc, cùng luật
         đã dùng cho từng ô của lưới. */
      var coTen2 = Math.min(Math.round(kg.w * 0.026), Math.round(caoT * 0.135));
      /* Dòng vai to hơn một nấc, và đây là QUYẾT ĐỊNH chứ không phải
         nới lỏng: trên một sắc bão hoà, chữ NHỎ không mực nào đạt nổi
         4,5:1 — trắng thua ở đầu sáng, đen thua ở đầu tối. Ngưỡng
         WCAG cho chữ từ 24px là 3,0, và ở cỡ ấy nó đọc được THẬT.
         Nên hoặc chữ to lên, hoặc chữ phải rời khỏi mảng màu. Chọn to
         lên: dòng vai là phần định danh của tầng, nó đáng được đọc. */
      var coVai = Math.min(Math.round(kg.w * 0.0235), Math.round(caoT * 0.105));
      var dTen2 = catDong(t.ten, '800 ' + coTen2 + 'px ' + CHU_THAN, rongTen);
      var dVai = t.vai
        ? catDong(t.vai, '500 ' + coVai + 'px ' + CHU_THAN, rongTen) : [];
      var caoCum2 = dTen2.length * coTen2 * 1.18 +
        (dVai.length ? 6 + dVai.length * coVai * 1.22 : 0);
      var yCum = Math.round(y + (caoT - caoCum2) / 2 + coTen2 * 0.80);

      ve += '<text x="' + xSo + '" y="' +
        Math.round(y + caoT / 2 + coSo * 0.35) + '" font-family="' + h(CHU_THAN) +
        '" font-size="' + coSo + '" font-weight="800" fill="' + h(mucTren(s.hex)) +
        '" fill-opacity="0.96">' + h(t.so) + '</text>';
      var tenT = veChu(t.ten, xT, yCum,
        {co: coTen2, chu: CHU_THAN, dam: 800, mau: mucTren(s.hex),
         rong: rongTen, gian: 1.18});
      ve += tenT.svg;
      if (t.vai)
        ve += veChu(t.vai, xT, yCum + tenT.cao + 6,
          {co: coVai, chu: CHU_THAN, dam: 500, mau: mucPhuTren(s.hex),
           rong: rongTen, gian: 1.22}).svg;

      /* THẺ BA CỘT — chỗ mang tin thật. */
      var xThe = le + rongNem + 10;
      var kinh = tamKinh(xThe, y, rongThe, caoT, k, {sac: s.hex, bong: bong.id, bo: 14});
      manh.push(kinh); ve += kinh.ve;

      var nO = Math.min(3, t.o.length);
      var demO = 14;
      var rongO2 = Math.round((rongThe - 26 - demO * (nO - 1)) / nO);
      var coH2 = Math.min(Math.round(kg.w * 0.0195), Math.round(caoT * 0.105));
      var coB2 = Math.min(Math.round(kg.w * 0.0175), Math.round(caoT * 0.093));
      var rH2 = Math.round(coH2 * 0.86);
      /* ── CỘT DÀI NHẤT ĐỊNH CHỖ CHO CẢ HÀNG ──
         Bản đầu neo ba cột vào mép trên thẻ (y + 20), nên khi thẻ cao
         hơn cụm chữ thì cả ba cột dồn lên nửa trên và hở hẳn nửa dưới
         — đúng lớp lỗi đã sửa ba lần ở chỗ khác, quay lại lần thứ tư.
         Đo cột dài nhất rồi căn cả hàng vào giữa thẻ. */
      var caoCotMax = 0;
      t.o.slice(0, nO).forEach(function (m) {
        var d = catDong(m.y, '500 ' + coB2 + 'px ' + CHU_THAN, rongO2 - 4);
        caoCotMax = Math.max(caoCotMax, rH2 * 2 + coB2 * 1.5 + d.length * coB2 * 1.34);
      });
      var yCot = Math.round(y + Math.max(16, (caoT - caoCotMax) / 2));
      t.o.slice(0, nO).forEach(function (m, j) {
        var xo = xThe + 13 + j * (rongO2 + demO);
        if (j) ve += '<line x1="' + (xo - demO / 2) + '" y1="' + (y + 14) +
          '" x2="' + (xo - demO / 2) + '" y2="' + (y + caoT - 14) +
          '" stroke="' + h(s.hex) + '" stroke-opacity="0.34" ' +
          'stroke-width="1" stroke-dasharray="3 4"/>';
        var hh = huyHieu(xo + rH2, yCot + rH2, rH2, s.hex,
          THU_TU_HINH[(i * 3 + j) % THU_TU_HINH.length], null, k);
        manh.push(hh); ve += hh.ve;
        ve += '<text x="' + (xo + rH2 * 2 + 8) + '" y="' + (yCot + rH2 + coH2 * 0.36) +
          '" font-family="' + h(CHU_THAN) + '" font-size="' + coH2 +
          '" font-weight="800" fill="' + h(k.muc) + '" letter-spacing="0.5">' +
          h(m.ten.toUpperCase()) + '</text>';
        ve += veChu(m.y, xo, yCot + rH2 * 2 + coB2 * 1.5,
          {co: coB2, chu: CHU_THAN, dam: 500, mau: k.muc2,
           rong: rongO2 - 4, gian: 1.34}).svg;
      });
    });

    var g = gom(manh);
    return {ok: true, svg: khung(kg, k,
      nen.ve + '<rect x="0" y="0" width="' + kg.w + '" height="6" fill="' +
      h(k.gita) + '"/>' + dnhan + tieu.svg + (dbang ? dbang.ve : '') + ve +
      dauGita(k, le + 21, kg.h - Math.round(kg.h * 0.032)), g.defs)};
  }

  /* ── ĐỌC KHỐI BƯỚC ──
     BƯỚC 01 | Lắng nghe, kết nối, thấu hiểu
     · Lắng nghe câu chuyện của học viên
     · Kết nối và xây dựng niềm tin */
  function catBuoc(chu) {
    var ra = [], nay = null;
    String(chu || '').split('\n').forEach(function (d) {
      var b = /^\s*(?:BƯỚC|CHẶNG|MỐC)\s+(\S+)\s*\|\s*(.+?)\s*$/i.exec(d);
      if (b) { nay = {so: b[1], ten: b[2].trim(), y: []}; ra.push(nay); return; }
      var g = /^\s*[·•\-*]\s+(.{3,})$/.exec(d);
      if (g && nay) nay.y.push(g[1].trim());
    });
    return ra;
  }

  function veQuyTrinh(x, kg, che) {
    var k = bang(che);
    var ds = catBuoc(x.noiDung);
    var nhan = docDau(x.noiDung, 'NHÃN'), bang2 = docDau(x.noiDung, 'BĂNG');
    if (ds.length < 3) return {ok: false,
      error: 'Quy trình cần ít nhất BA bước. Mỗi bước mở bằng một dòng ' +
             '"BƯỚC 01 | Tên bước", rồi các dòng bắt đầu bằng dấu · là ý của ' +
             'bước ấy. Máy KHÔNG tự cắt nội dung thành bước — thứ tự các bước ' +
             'là thứ tấm hình này tồn tại để nói, nên đoán sai thứ tự là nói ' +
             'sai đúng điều duy nhất nó phải nói. Đang đọc ra ' + ds.length + ' bước.'};
    var sac = sacTang();
    if (!sac.length) return {ok: false,
      error: 'Chưa mở được bảng màu thương hiệu (G.BRAND.mau).'};

    ds = ds.slice(0, 8);
    var le = Math.round(kg.w * 0.055);
    var nen = lopNen(kg, k, 1.2);
    var bong = defBong(k, 1);
    var bongHh = defBong(k, 2);
    var cs = defChuSac(k);
    var manh = [nen, bong, bongHh, cs];

    var coTieu = Math.round(kg.w / 22);
    var yTieu = Math.round(kg.h * (nhan ? 0.072 : 0.058)) + coTieu;
    var tieu = veChu(x.nhiemVu, Math.round(kg.w / 2), yTieu,
      {co: coTieu, chu: CHU_TIEU, dam: 600, mau: 'url(#' + cs.id + ')',
       rong: kg.w - le * 2, gian: 1.16, can: 'middle'});
    var dnhan = nhan ? nhanTren(nhan, le + 6,
      Math.round(yTieu - coTieu * 0.95), k, Math.round(coTieu * 0.40)) : '';
    var day = yTieu + tieu.cao;
    var dbang = null;
    if (bang2) {
      dbang = daiBang(bang2, Math.round(kg.w / 2), Math.round(day + coTieu * 0.22),
        k, kg.w - le * 2);
      manh.push(dbang);
      day = day + coTieu * 0.22 + dbang.cao;
    }

    var dinh = Math.round(day + coTieu * 0.55);
    var dayVung = kg.h - Math.round(kg.h * 0.072);
    var khe = 12;
    var caoB = Math.round((dayVung - dinh - khe * (ds.length - 1)) / ds.length);
    var rTron = Math.round(Math.min(caoB * 0.32, kg.w * 0.036));
    var xTron = le + rTron;

    /* ── RAY DỌC NỐI CÁC BƯỚC ──
       Một đường chạy suốt sau các số. Không có nó thì tám vòng tròn
       chỉ là tám vòng tròn; có nó thì chúng thành MỘT chuỗi, và chuỗi
       là đúng thứ loại hình này khai: "giúp làm theo đúng thứ tự". */
    var ve = '<line x1="' + xTron + '" y1="' + (dinh + rTron) + '" x2="' + xTron +
      '" y2="' + (dinh + (ds.length - 1) * (caoB + khe) + rTron) +
      '" stroke="' + h(k.gita) + '" stroke-opacity="0.35" stroke-width="3"/>';

    ds.forEach(function (t, i) {
      var y = dinh + i * (caoB + khe);
      var s = sac[i % sac.length];
      var kinh = tamKinh(xTron + rTron + 16, y, kg.w - le - (xTron + rTron + 16),
        caoB, k, {sac: s.hex, bong: bong.id, bo: 14});
      manh.push(kinh); ve += kinh.ve;

      var gT = idMoi('tron');
      manh.push({defs: '<linearGradient id="' + gT + '" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="' + h(doiSang(s.hex, nemDai(k))) + '"/>' +
        '<stop offset="100%" stop-color="' + h(doiSang(s.hex, -nemDai(k))) + '"/>' +
        '</linearGradient>'});
      ve += '<g filter="url(#' + bongHh.id + ')"><circle cx="' + xTron + '" cy="' +
        (y + rTron) + '" r="' + rTron + '" fill="url(#' + gT + ')"/></g>' +
        '<text x="' + xTron + '" y="' + Math.round(y + rTron + rTron * 0.38) +
        '" text-anchor="middle" font-family="' + h(CHU_THAN) + '" font-size="' +
        Math.round(rTron * 1.02) + '" font-weight="800" fill="' +
        h(mucTren(s.hex)) + '">' + h(t.so) + '</text>';

      var xN = xTron + rTron + 32;
      var rongN = kg.w - le - xN - 16;
      var coTen = Math.min(Math.round(kg.w * 0.030), Math.round(caoB * 0.155));
      var coY = Math.min(Math.round(kg.w * 0.0195), Math.round(caoB * 0.115));
      var ys = t.y.slice(0, 4);

      /* ── ĐO CẢ CỤM RỒI MỚI ĐẶT ──
         Lần thứ năm cùng một lớp lỗi trong tệp này, nên ghi hẳn ra:
         mọi khối chữ trong một khung có sẵn phải ĐO TRƯỚC rồi mới đặt.
         Neo vào mép trên thì khung nào cao hơn cụm cũng hở đáy, và ba
         khung cạnh nhau hở ba kiểu khác nhau.
         Cộng một khe nghỉ THẬT giữa tên bước và danh sách: không có
         khe thì mắt đọc tên bước thành gạch đầu dòng thứ nhất. */
      var dTenB = catDong(t.ten, '800 ' + coTen + 'px ' + CHU_THAN, rongN);
      var caoTenB = dTenB.length * coTen * 1.18;
      var caoY = 0;
      ys.forEach(function (d) {
        caoY += catDong(d, '500 ' + coY + 'px ' + CHU_THAN, rongN - coY * 1.15)
          .length * coY * 1.36 + coY * 0.30;
      });
      var kheTen = ys.length ? coTen * 0.42 : 0;
      var yCumB = Math.round(y + Math.max(14, (caoB - caoTenB - kheTen - caoY) / 2));

      ve += veChu(t.ten, xN, yCumB + coTen * 0.82,
        {co: coTen, chu: CHU_THAN, dam: 800, mau: k.muc,
         rong: rongN, gian: 1.18}).svg;
      if (ys.length)
        ve += veGachDau(ys, xN, yCumB + caoTenB + kheTen,
          {co: coY, rong: rongN, mau: k.muc2, cham: s.hex}).svg;
    });

    var g = gom(manh);
    return {ok: true, svg: khung(kg, k,
      nen.ve + '<rect x="0" y="0" width="' + kg.w + '" height="6" fill="' +
      h(k.gita) + '"/>' + dnhan + tieu.svg + (dbang ? dbang.ve : '') + ve +
      dauGita(k, le + 21, kg.h - Math.round(kg.h * 0.030)), g.defs)};
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
    KHUNG:            {ve: veKhung,  kho: 'vuong'},
    /* Hai cấu trúc DÀY: khổ dọc, vì cả hai xếp chồng theo chiều dọc và
       mỗi hàng phải đủ cao cho một cụm chữ, không phải một dòng. */
    SO_SANH_TANG:     {ve: veSoSanhTang, kho: 'doc'},
    QUY_TRINH:        {ve: veQuyTrinh,   kho: 'doc'}
  };

  /* ═══════════ CỬA DUY NHẤT ═══════════ */
  G.veThiGiac = function (x, khoMuon, cheMuon) {
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
    /* Mặc định NỀN SÂU, theo đúng câu chốt trong G.BRAND.mau: "Đêm sâu
       — nền của mọi màn hình, để ánh sáng của hành trình nổi lên."
       Nền sáng vẫn gọi được, cho hình nhúng thẳng vào giao diện ban
       ngày; nhưng mặc định phải là thứ thương hiệu đã chốt, không
       phải thứ tiện tay lấy được từ biến CSS đang chạy. */
    /* MẶC ĐỊNH LÀ GIẤY, theo đúng dòng "Bản đồ A3 in" của BRAND.dungO.
       Nền đêm sâu vẫn gọi được — nó là nền của WEB APP, cho hình nhúng
       thẳng vào giao diện. Nhưng một tấm áp phích đứng một mình là ẤN
       PHẨM, và ấn phẩm đã có dòng riêng trong sổ. */
    var che = (cheMuon === 'sau' || cheMuon === 'sang') ? cheMuon : 'giay';
    var r;
    try { r = b.ve(x, kg, che); }
    catch (e) { return {ok: false, error: 'Bộ vẽ hỏng giữa chừng: ' + e.message}; }
    if (!r.ok) return r;
    return {ok: true, svg: r.svg, kho: kg.ten, nen: che, w: kg.w, h: kg.h,
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
      nen: [{ma: 'giay', ten: 'Nền giấy — ấn phẩm (mặc định)'},
            {ma: 'sau',  ten: 'Nền đêm sâu — nhúng vào web app'},
            {ma: 'sang', ten: 'Nền sáng theo giao diện đang chạy'}],
      kho: Object.keys(KHO_GIAY).map(function (m) {
        return {ma: m, ten: KHO_GIAY[m].ten}; })};
  };
})();
