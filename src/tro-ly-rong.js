/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v9.72 — MỞ KHO CHO TRỢ LÝ TRA

   ĐO ĐƯỢC GÌ TRƯỚC KHI SỬA

   Đưa hai mươi câu hỏi thật vào trợ lý và đếm xem nó trúng mấy câu:
   TRÚNG 1 / 20.

   Nó KHÔNG im lặng ở mười chín câu còn lại — nó vẫn trả về mười hai
   tư liệu, lấy từ năm kho cũ, gần giống mà sai. Đó là kiểu hỏng tệ
   hơn im lặng: im lặng thì người ta đi tra chỗ khác, còn trả lời sai
   thì người ta tin.

   Nguyên nhân: hàm nguon() trong src/tro-ly-ai.js liệt kê đúng NĂM
   kho — mô thức, phác đồ, kịch bản, tình huống, bài học — trong tổng
   hơn tám trăm kho của hệ. Mọi thứ dựng từ 9.65 tới 9.71 nằm ngoài
   tầm với của trợ lý.

   KHOÁ Ở CHỖ TRA, KHÔNG Ở CHỖ HIỆN KẾT QUẢ

   Mỗi nguồn thêm khai QUYỀN của nó. nguon() lọc bằng G.can() TRƯỚC
   khi tra, nên kho nghề không bao giờ vào vòng chấm điểm của một
   người không có quyền — chứ không phải chấm xong rồi giấu kết quả.

   Đây là đúng luật đã sai ba lần trong kho này: lọc trên màn hình
   không phải bảo vệ dữ liệu.

   trSoiRoRi() đăng nhập-độc-lập không làm được, nên nó canh chiều
   khác: mọi nguồn thêm phải khai quyền, và quyền ấy phải có thật
   trong G.PERM. Thiếu một trong hai thì đỏ.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

(function () {
  /* Mỗi nguồn: kho nào, gọi tên bằng chữ gì trong câu hỏi, lấy mã và
     tên ra sao, và những trường nào đem đi so.

     Ô goiTen là chỗ đắt: nó cho người hỏi gọi thẳng tên loại tư liệu
     và được ưu tiên. "Bảy cửa trước khi KÝ KẾT" thì phải ra kho ký
     kết, không ra một kịch bản trùng vài từ. */
  function on(o) { return G[o.kho] !== undefined && G[o.kho] !== null; }

  var THEM = [
    /* ── Thang độ khó của một ca (9.74) ──
       DOKHO_CAP và DOKHO_DAU ở gói NỀN nên KHÔNG khai quyền: gia
       đình phải tra được vì sao trợ lý dừng lại. Bốn kho định tuyến
       thì ở gói NGHỀ và khai quyền nghề. */
    { kho: 'DOKHO_CAP', loai: 'Độ khó của ca', mau: '#BE0E16', go: '',
      goiTen: ['do kho', 'cap do', 'cap 1', 'cap 10', 'muoi cap', 'thang do kho'],
      ma: 'ma', ten: 'ten', than: ['ten', 'mo', 'viDu', 'vi', 'nhip'] },
    { kho: 'DOKHO_DAU', loai: 'Dấu hiệu độ khó', mau: '#BE0E16', go: '',
      goiTen: ['dau hieu', 'vi sao dung lai', 'vi sao phai cho'],
      ma: 'ma', ten: 'ten', than: ['ten', 'vi'] },
    { kho: 'DOKHO_TUYEN', loai: 'Ai xác nhận', mau: '#BE0E16', go: '',
      quyen: 'nghe_chung', goiTen: ['ai xac nhan', 'bat khoa', 'khoa xu ly', 'ai duyet'],
      ma: 'ma', ten: 'ten', than: ['ten', 'vi', 'tuXK'] },
    { kho: 'DOKHO_CAM', loai: 'Khoá mở rồi vẫn cấm', mau: '#BE0E16', go: '',
      quyen: 'nghe_chung', goiTen: ['mo khoa van cam', 'bat roi van khong duoc'],
      ma: 'ma', ten: 'viec', than: ['viec', 'vi', 'tuLuat'] },
    /* ── Nghề: bản vẽ, bàn làm việc, ngôn ngữ ── */
    { kho: 'BV_VAI', loai: 'Trần vai', mau: '#5140B4', go: 'ban-ve',
      quyen: 'nghe_chung', goiTen: ['tran vai', 'phu trach toi da', 'ban ve'],
      ma: 'ten', ten: 'ten', than: ['ten', 'tran', 'gioiHanTuyetDoi'] },
    { kho: 'BLV_NGAN', loai: 'Bàn Coach', mau: '#5140B4', go: 'ban-coach',
      quyen: 'pro_coach', goiTen: ['ban coach', 'ban lam viec', 'ngan'],
      ma: 'ma', ten: 'ten', than: ['ten', 'laGi', 'vet'] },
    { kho: 'NN_CAM', loai: 'Câu cấm', mau: '#BE0E16', go: 'chuan-ngon-ngu',
      quyen: 'pro_coach', goiTen: ['cau cam', 'chuan ngon ngu', 'khong duoc noi'],
      ma: 'ma', ten: 'ten', than: ['ten', 'vi', 'thay'] },

    /* ── Hành lang và rà soát hệ ── */
    { kho: 'HL_VIRUS', loai: 'Virus', mau: '#BE0E16', go: 'hanh-lang',
      quyen: 'pro_coach', goiTen: ['virus', 'vac xin', 'hanh lang'],
      ma: 'ma', ten: 'ten', than: ['ten', 'trieuChung', 'duongLay', 'vacXin'] },
    { kho: 'HL_LUAT12', loai: 'Luật hành lang', mau: '#B4720F', go: 'hanh-lang',
      quyen: 'pro_coach', goiTen: ['muoi hai luat', 'luat hanh lang'],
      ma: 'ma', ten: 'luat', than: ['luat', 'hanhVi', 'viPham'] },
    { kho: 'HL_SAUNHIP', loai: 'Sáu Nhịp', mau: '#0B6675', go: 'hanh-lang',
      quyen: 'pro_coach', goiTen: ['sau nhip'],
      ma: 'ma', ten: 'ten', than: ['ten', 'laGi', 'lam'] },
    { kho: 'HL_KHOA9', loai: 'Khoá hệ', mau: '#185AB4', go: 'hanh-lang',
      quyen: 'pro_coach', goiTen: ['khoa he', 'chin khoa', 'bat bien'],
      ma: 'ma', ten: 'ten', than: ['ten', 'chan', 'coChe'] },
    { kho: 'RS_CHAN', loai: 'Lỗi chặn', mau: '#BE0E16', go: 'ra-soat-loi',
      quyen: 'pro_coach', goiTen: ['loi chan', 'ra soat loi', 'diem gay'],
      ma: 'ma', ten: 'loi', than: ['loi', 'hauQua', 'xuLy', 'noiUngDung'] },

    /* ── Pháp lý ── */
    { kho: 'RSP_CHAN', loai: 'Phát hiện pháp lý', mau: '#BE0E16', go: 'ra-soat-phap-ly',
      quyen: 'pro_coach', goiTen: ['phap ly', 'phat hien', 'nghiem trong'],
      ma: 'ma', ten: 'ten', than: ['ten', 'rui', 'noiUngDung', 'lamGi'] },
    { kho: 'RSP_LECH', loai: 'Chỗ lệch', mau: '#B4720F', go: 'ra-soat-phap-ly',
      quyen: 'pro_coach', goiTen: ['cho lech', 'tai lieu noi khac'],
      ma: 'ma', ten: 'ten', than: ['ten', 'taiLieuNoi', 'ungDungLam', 'huongDeXuat'] },
    { kho: 'BCD_THAOTAC', loai: 'Bằng chứng', mau: '#0B6675', go: 'bang-chung',
      quyen: 'pro_coach', goiTen: ['bang chung', 'thao tac sinh bang chung'],
      ma: 'ma', ten: 'ten', than: ['ten', 'phaiCo', 'giu'] },
    { kho: 'BCD_TINHCHAT', loai: 'Tính chất bằng chứng', mau: '#0B6675', go: 'bang-chung',
      quyen: 'pro_coach', goiTen: ['tinh chat', 'chuan bang chung'],
      ma: 'ma', ten: 'ten', than: ['ten', 'loi', 'viLaDau'] },

    /* ── Hợp đồng và ký kết ── */
    { kho: 'HSH_HD', loai: 'Hợp đồng', mau: '#185AB4', go: 'ho-so-hop-dong',
      quyen: 'pro_coach', goiTen: ['hop dong', 'ho so hop dong'],
      ma: 'ma', ten: 'ten', than: ['ten', 'dich', 'ben', 'han'] },
    { kho: 'HSH_DK', loai: 'Điều khoản', mau: '#185AB4', go: 'ho-so-hop-dong',
      quyen: 'pro_coach', goiTen: ['dieu khoan', 'dk'],
      ma: 'ma', ten: 'ten', than: ['ten', 'batBuoc', 'ghi'] },
    { kho: 'HSH_KY', loai: 'Cấp chữ ký', mau: '#B4720F', go: 'ho-so-hop-dong',
      quyen: 'pro_coach', goiTen: ['chu ky', 'cap chu ky', 'ky so'],
      ma: 'ma', ten: 'ten', than: ['ten', 'hinh', 'dung', 'gia'] },
    { kho: 'HSH_BAC', loai: 'Bậc lương', mau: '#0B7350', go: 'ho-so-hop-dong',
      quyen: 'pro_coach', goiTen: ['bac luong', 'chin bac', 'thu nhap'],
      ma: 'ma', ten: 'ten', than: ['ten', 'nangLuc', 'thuNhap', 'bienDoi'] },
    { kho: 'KK_CUA', loai: 'Cửa ký kết', mau: '#BE0E16', go: 'ky-ket',
      quyen: 'pro_coach', goiTen: ['ky ket', 'truoc khi ky', 'bay cua'],
      ma: 'so', ten: 'cua', than: ['cua', 'hoi', 'khongQua'] },

    /* ── Quản trị và vận hành ── */
    { kho: 'STA_NHIP', loai: 'Nhịp quản trị', mau: '#185AB4', go: 'so-tay-admin',
      quyen: 'qt_trang', goiTen: ['nhip', 'moi ngay', 'so tay', 'super admin'],
      ma: 'nhip', ten: 'nhip', than: ['nhip', 'gio'] },
    { kho: 'STA_XUONGSONG', loai: 'Màn quản trị', mau: '#BE0E16', go: 'so-tay-admin',
      quyen: 'qt_trang', goiTen: ['man quan tri', 'xuong song', 'nut nguy'],
      ma: 'man', ten: 'ten', than: ['ten', 'mo', 'docTruoc', 'nutNguy', 'daSai'] },
    { kho: 'BTN_NGAN', loai: 'Ngăn bảng tin', mau: '#0B6675', go: 'tin-noi-bo',
      quyen: 'nghe_chung', goiTen: ['bang tin noi bo', 'ngan bang tin'],
      ma: 'ma', ten: 'ten', than: ['ten', 'laGi', 'aiThay', 'lay'] },
    { kho: 'BTN_VINHDANH', loai: 'Vinh danh', mau: '#5140B4', go: 'tin-noi-bo',
      quyen: 'nghe_chung', goiTen: ['vinh danh', 'ghi nhan', 'thuong ky'],
      ma: 'ma', ten: 'ten', than: ['ten', 'canCu', 'doTuDau', 'khongDungLam'] },
    { kho: 'TDH_HE', loai: 'Việc hệ thống', mau: '#0B6675', go: 'tu-dong',
      quyen: 'nghe_chung', goiTen: ['tu dong', 'tu dong hoa', 'may chay'],
      ma: 'ma', ten: 'ten', than: ['ten', 'kich', 'may', 'nguoi', 'neuHong'] },
    { kho: 'TDH_CHAN', loai: 'Máy không được nhận', mau: '#BE0E16', go: 'tu-dong',
      quyen: 'nghe_chung', goiTen: ['may khong duoc', 'cam may', 'chi nguoi'],
      ma: 'ma', ten: 'viec', than: ['viec', 'vi', 'tuLuat'] },

    /* ── Quyền của gia đình: mở cho MỌI vai, vì đây là thứ nhà mình
         phải đọc được. Không khai ô quyen nghĩa là không lọc. ── */
    { kho: 'PL_QUYEN', loai: 'Quyền của nhà mình', mau: '#0B7350', go: 'phap-ly',
      goiTen: ['quyen', 'bay quyen', 'quyen cua nha'],
      ma: 'ma', ten: 't', than: ['t', 'la', 'demBang'] },
    { kho: 'PL_CO', loai: 'Cơ chế dùng quyền', mau: '#0B7350', go: 'phap-ly',
      goiTen: ['lam the nao', 'xin xoa', 'khieu nai', 'co che'],
      ma: 'ma', ten: 'lam', than: ['lam', 'ai', 'han', 'khong'] }
  ];

  /* TỆP NÀY NẰM Ở GÓI CHUNG, KHÔNG Ở GÓI NGHỀ — VÀ ĐÓ LÀ CỐ Ý

     Bản đầu tôi khai nó vào cả hai danh sách, nên nó chỉ vào gói
     nghề. Đo lại thì thấy: phụ huynh, học viên và cộng tác viên
     KHÔNG rò một dòng kho nghề nào — đúng ý — nhưng họ cũng mất
     luôn hai nguồn đáng lẽ mở cho họ: bảy quyền của gia đình, và
     cơ chế dùng từng quyền ấy.

     Nhà mình phải hỏi được về quyền của chính mình. Nên tệp về gói
     chung, và việc chặn giao cho HAI lớp đã có:

       lớp 1 · kho nghề nằm trong gói .enc mà máy khách hàng không
               nhận được — không có dữ liệu thì không tra được gì
       lớp 2 · nguon() lọc bằng G.can(quyen) TRƯỚC khi tra

     Hai lớp ấy độc lập nhau. Mất một lớp thì lớp kia vẫn giữ.

     DỰNG LẠI MỖI LẦN TRA, KHÔNG DỰNG MỘT LẦN LÚC TẢI TỆP

     Bản đầu gán G.AI_NGUON_THEM một lần ngay khi tệp chạy, và kết
     quả đo KHÔNG nhúc nhích: vẫn 2 trên 20.

     Lý do là luật số hai của kho này: KHO NẠP SAU KHI ĐĂNG NHẬP. Lúc
     tệp vừa tải thì G.HL_VIRUS, G.HSH_HD, G.KK_CUA đều chưa tồn tại,
     nên bộ lọc "kho đã nạp chưa" gạt sạch hai mươi lăm nguồn và trợ
     lý vẫn chỉ có năm kho cũ.

     Nên hàm này dựng lại mỗi lần được gọi. Tốn thêm vài mi-li-giây
     một lượt hỏi, đổi lấy việc nó luôn đúng với thứ đang nạp. */
  G.aiNguonThem = function () { return DUNG(); };

  function DUNG() { return THEM.filter(on).map(function (o) {
    return {
      kho: G[o.kho], ten_kho: o.kho, loai: o.loai, mau: o.mau, go: o.go,
      quyen: o.quyen || '', goiTen: o.goiTen || [],
      ma: function (x) { return String(x[o.ma] || ''); },
      ten: function (x) { return String(x[o.ten] || ''); },
      than: function (x) {
        return o.than.map(function (k) { return String(x[k] || ''); });
      }
    };
  }); }

  /* ═══════ KHOÁ: MỌI NGUỒN NGHỀ PHẢI KHAI QUYỀN CÓ THẬT ═══════

     Không đăng nhập-độc-lập được trong cùng một trang, nên phép này
     canh chiều khác: nguồn nào trỏ vào kho của gói nghề thì BẮT BUỘC
     khai quyền, và quyền ấy phải có thật trong G.PERM.

     Gõ nhầm tên quyền là chỗ hỏng im lặng nhất: G.can() trả về false
     cho quyền không tồn tại, nên nguồn ấy biến mất khỏi mọi vai —
     kể cả vai đáng lẽ được tra. Trợ lý im về cả một mảng kho mà
     không ai biết. */
  G.trSoiRoRi = function () {
    var ds = G.aiNguonThem(), loi = [];
    if (!ds.length) return { chuaDo: true, thieu: 'AI_NGUON_THEM', loi: [] };

    var khoNghe = {};
    (G.THUOC_CAP_PHEP || []).forEach(function (k) { khoNghe[k] = 1; });
    if (!Object.keys(khoNghe).length)
      return { chuaDo: true, thieu: 'THUOC_CAP_PHEP', loi: [] };

    var moVai = [];
    ds.forEach(function (n) {
      ['loai', 'go'].forEach(function (k) {
        if (!n[k]) loi.push(n.ten_kho + ' thiếu ô ' + k);
      });
      if (!(n.goiTen || []).length)
        loi.push(n.ten_kho + ' không khai ô goiTen — người hỏi không gọi thẳng tên nó được');
      if (typeof (G.VIEWS || {})[n.go] !== 'function')
        loi.push(n.ten_kho + ' trỏ vào màn "' + n.go + '" — màn ấy không có thật');

      /* Kho thuộc gói cấp phép mà không khai quyền là chỗ rò. */
      if (khoNghe[n.ten_kho] && !n.quyen)
        loi.push(n.ten_kho + ' thuộc gói cấp phép mà KHÔNG khai quyền — mọi vai tra được');
      if (n.quyen && typeof (G.PERM || {})[n.quyen] !== 'number')
        loi.push(n.ten_kho + ' khai quyền "' + n.quyen + '" — quyền ấy không có trong G.PERM, ' +
          'nên nguồn này biến mất khỏi MỌI vai, kể cả vai đáng lẽ được tra');
      if (!n.quyen) moVai.push(n.ten_kho);
    });

    /* Phải còn ít nhất một nguồn mở cho mọi vai — bảy quyền của gia
       đình là thứ nhà mình phải hỏi được. Không còn cái nào thì trợ
       lý của khách hàng chỉ còn năm kho cũ, y như trước 9.72. */
    if (!moVai.length)
      loi.push('không nguồn thêm nào mở cho mọi vai — trợ lý của khách hàng lại chỉ còn ' +
        'năm kho cũ');
    return { chuaDo: false, loi: loi, so: ds.length, moVai: moVai.length,
      khoaNghe: ds.length - moVai.length };
  };
})();
