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
      gitaSau: mau('gita-sau', '#185AB4'),
      gitaInk: mau('gita-ink', '#14509E'),
      do:     mau('gita-do', '#F61824'),
      vien:   mau('vien-1', 'rgba(28,20,64,.12)')
    };
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

  function khung(kg, k, ruot) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + kg.w + ' ' +
      kg.h + '" width="' + kg.w + '" height="' + kg.h + '" role="img">' +
      '<rect width="' + kg.w + '" height="' + kg.h + '" fill="' + h(k.nen) + '"/>' +
      ruot + '</svg>';
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

    var t = veChu(cau, le, dinh, {co: co, chu: CHU_TIEU, dam: 600,
      mau: k.gitaInk, rong: rong, gian: 1.24});
    var o = '<rect x="0" y="0" width="' + kg.w + '" height="6" fill="' + h(k.gita) + '"/>' +
      '<rect x="' + le + '" y="' + Math.round(dinh - co * 1.02) + '" width="52" height="4" ' +
        'rx="2" fill="' + h(k.do) + '"/>' + t.svg;
    if (phu)
      o += veChu(phu, le, dinh + t.cao + co * 0.5, {co: coPhu,
        chu: CHU_THAN, dam: 500, mau: k.muc2, rong: rong, gian: 1.45}).svg;
    o += dauGita(k, le + 15, kg.h - Math.round(kg.h * 0.085));
    return {ok: true, svg: khung(kg, k, o)};
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
    var o = '<rect x="0" y="0" width="' + kg.w + '" height="6" fill="' + h(k.gita) + '"/>' +
      '<text x="' + giua + '" y="' + dinh + '" text-anchor="middle" ' +
        'font-family="' + h(CHU_THAN) + '" font-size="' + coSo + '" font-weight="800" ' +
        'fill="' + h(k.gitaSau) + '" letter-spacing="-2">' + h(s.so) + '</text>' +
      '<rect x="' + (giua - 26) + '" y="' + Math.round(dinh + coSo * 0.22) +
        '" width="52" height="4" rx="2" fill="' + h(k.do) + '"/>';
    o += veChu(cau, giua, Math.round(dinh + coSo * 0.62), {co: Math.round(kg.w / 42),
      chu: CHU_THAN, dam: 500, mau: k.muc2, rong: Math.round(rong * 0.9),
      gian: 1.5, can: 'middle'}).svg;
    o += dauGita(k, le + 15, kg.h - Math.round(kg.h * 0.085));
    return {ok: true, svg: khung(kg, k, o)};
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

    var o = '<rect x="0" y="0" width="' + kg.w + '" height="6" fill="' + h(k.gita) + '"/>';
    o += veChu(x.nhiemVu, le, Math.round(kg.h * 0.17), {co: Math.round(kg.w / 30),
      chu: CHU_TIEU, dam: 600, mau: k.gitaInk, rong: rong, gian: 1.25}).svg;
    o += '<line x1="' + viTriX(0) + '" y1="' + truc + '" x2="' + viTriX(ds.length - 1) +
      '" y2="' + truc + '" stroke="' + h(k.vien) + '" stroke-width="3"/>';

    ds.forEach(function (t, i) {
      var cx = viTriX(i);
      var day = (t.tang === dang);
      o += '<circle cx="' + cx + '" cy="' + truc + '" r="' + (day ? 15 : 9) + '" ' +
        'fill="' + h(day ? k.do : k.gita) + '"/>' +
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
    return {ok: true, svg: khung(kg, k, o)};
  }

  /* ═══════════ BẢNG PHÂN VIỆC ═══════════
     Loại hình nào KHÔNG có tên ở đây thì bộ vẽ nói thẳng là chưa có.
     Danh sách trắng, không danh sách cấm — cùng luật với mọi cửa khác
     trong kho này: loại hình mới thêm vào ngày mai cũng không tự lọt
     qua đây và nhận một bố cục đại khái. */
  var BO_VE = {
    BIA:              {ve: veBia,    kho: 'rong'},
    MOT_SO:           {ve: veMotSo,  kho: 'rong'},
    BANDO_HANHTRINH:  {ve: veBanDo,  kho: 'rong'}
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
      kho: Object.keys(KHO_GIAY).map(function (m) {
        return {ma: m, ten: KHO_GIAY[m].ten}; })};
  };
})();
