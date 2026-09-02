/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.1 — KHO KHOÁ
   Nội dung chuyên môn của GITA 365 là tài sản có bản quyền. Nó không
   nằm trong ứng dụng dưới dạng đọc được: mỗi gói được mã hoá AES-256-GCM
   và chỉ mở ra khi máy chủ cấp khoá cho đúng vai, đúng tầng, đúng phiên.

   Ba tầng bảo vệ:
     1. Tệp .enc không đọc được nếu không có khoá.
     2. Khoá do máy chủ cấp sau khi đăng nhập, theo phạm vi được cấp phép,
        có hạn dùng. Khoá không bao giờ nằm trong mã nguồn.
     3. Nội dung sau khi giải mã chỉ tồn tại trong bộ nhớ phiên làm việc —
        không ghi ra đĩa, không vào localStorage.

   Nói thẳng: ba tầng này chặn được việc sao chép kho khi chưa đăng nhập,
   chặn máy quét, và chặn phát tán tệp. Chúng KHÔNG chặn được một người
   đã được cấp phép cố tình chép lại phần mình đang xem — không hệ thống
   nào trên đời làm được điều đó. Phần còn lại thuộc về hợp đồng, nhật ký
   truy cập và đóng dấu chìm theo người xem.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var G = window.G || {}; window.G = G;

/* Địa chỉ máy chủ cấp phép. Để trống thì ứng dụng chạy ở chế độ mẫu. */
G.API_CAP_PHEP = G.API_CAP_PHEP || '';

G.KHO = { daNap: [], dangNap: [], cheDoMau: false, hanKhoa: null, lyDoTuChoi: '', maTuChoi: '' };

/* Mọi thuộc tính do kho cấp phép nạp vào. Đổi vai là xoá sạch rồi nạp lại
   theo đúng phạm vi của vai mới — không để sót nội dung của vai trước. */
G.THUOC_CAP_PHEP = [
  'VANHANH','CHUYENDICH','CHANDUNG','LOTRINH','FAMILIES','TEAM','CUHICH','NGHILE','SUKIEN',
  'HEALTH','DUYET','AUDIT','TODAY','LEVELS','DIEM','HUYHIEU','QUA','HOAHONG','DANDAT','BRAND',
  'RASOAT','TAMNHIN100','TANG100','WOW','NHATBAN','CHIPHI','NGONTU_RANH','DAISU','BAIHOC',
  'MOTHUC','SACH','BANDO_A3','POSTER','SODO','PHACDO','DIEMCHAM','NGONTU','NGONTU_TANG',
  'THAYVI','MAUTHOAI','PERSONA','CHUAN1000','HAILONG','TAILIEU','AIPOLICY','KPI','DINHTUYEN',
  'AINANGCAP','LACHAN','BENCH','BENCH_AI','KICHBAN',
  /* Kho nghề thêm từ v8.9. Thiếu tên ở đây thì donKho() không xoá, và
     một máy vừa đăng nhập Coach rồi đăng nhập lại bằng phụ huynh sẽ để
     phụ huynh giữ nguyên chiều sâu nghề trong bộ nhớ — khoá màn hình mà
     dữ liệu vẫn nằm đó. Bộ kiểm phát hành soi danh sách này đối chiếu
     với nội dung thật của bảy gói, nên quên một tên là đỏ. */
  'PD_SAU','TH_SAU','NOI_KET','QT_NHOM','TL_GIADINH',
  'MT_RANH','MT_RANH_LUAT','PD_RUOT_SOAT','TH_RUOT_SOAT',
  /* Ba kho này từ bản 9.8 mang NỬA NGHỀ: chuyện của cấp Coach/Tư vấn/
     Admin, câu sát hạch của đội ngũ, bài khoá đào tạo nghề. Thiếu tên ở
     đây thì máy vừa đăng nhập Coach rồi đăng nhập lại bằng phụ huynh sẽ
     để phụ huynh giữ nguyên nửa ấy. */
  'CHUYEN','SH_HOI','KH_BAI',
  /* Tháp chiến lược và bản đồ bốn tầng — bản thiết kế cách Học viện tự lái mình. */
  'CL_THAP','CL_TANG','CL_MUC','CL_KETQUA','CL_NHIP','CL_NHAT','CL_LUAT',
  'TG_LANG','TG_GON','TG_GIAIDOAN','TG_LOP','TG_GON_LUAT',
  'CT_TRANG','CT_LOAI','CT_DIEM','CT_LUAT',
  'BD_LON','BD_CAP','BD_CHON','BD_LUAT','BD_DAN',
  'TT_CAMXUC','TT_MUA','TT_MUA_LUAT','TT_CHIAKHOA','TT_BANGCHUNG','TT_VET','TT_LUAT','TT_CONGTHUC',
  'TT_MAN','TT_DONGHANH','TT_DONGHANH_LUAT','TT_NHIEMKY',
  'HM_NGAY1','HM_HOI3','HM_NGONTU','HM_VUNG','HM_VUNG_LUAT',
  'HM_NGUY','HM_NGUY_SAU','HM_LEU','HM_HEO','HM_LUAT','HM_SAU',
  'DD_HUA','DD_CAP','DD_TRAN_LUAT','DD_9010','DD_HOI','DD_HATLAI',
  'DD_TINHHUONG','DD_THAY','DD_KPI','DD_LUAT',
  'GL_XONG','GL_XONG_LUAT','GL_BAN','GL_BAN_CAM','GL_MUC1','GL_MUC1_LUAT',
  'GL_ANDON','GL_ANDON_LUAT','GL_KPI','GL_KPI_LUAT','GL_SUCO','GL_SUCO_LUAT',
  'GL_LS','GL_LS_LUAT','GL_HOPDEN','GL_LUAT',
  'ND_LUAT','ND_QUYMO','ND_NGAY0','ND_THANG','ND_TUAN','ND_TUAN_LUAT',
  'ND_MOC','ND_MOC_LUAT','ND_SUCO','ND_CAM',
  'TR_DEN','TR_DEN_LUAT','TR_LUAT','TR_NGUON','TR_CHI','TR_CAT_LUAT','TR_TUCHU',
  'TR_QUY','TR_QUY_LUAT','TR_LUONG','TR_BAO','TR_KIEMTOAN','TR_CHUA','TR_CHUA_LUAT',
  'DT_LUAT','DT_VAO','DT_BUOI','DT_VAI','DT_VAI_LUAT','DT_THUCTAP',
  'DT_RUBRIC','DT_TUYETDOI','DT_THI','DT_PHAO','DT_TAICHUNGCHI','DT_RUTLUI',
  'MP_BAY','MP_LUAT','MP_QUAI','MP_BAO','MP_CHONG','MP_CHONG_LUAT',
  'MP_DO','MP_GAY','MP_LICH','MP_CHUA','MP_CHUA_LUAT',
  'BN_TRUC5','BN_TRUC5_LUAT','BN_THAPKY','BN_THAPKY_LUAT','BN_DOTDONG',
  'BN_MORUNG','BN_MORUNG_LUAT','BN_GIEOLAI','BN_CHUYENGIAO','BN_BONG',
  'BN_HANSEI_TC','BN_HANSEI_TC_LUAT','BN_LE50','BN_CHAMTHU','BN_NENTANG',
  'BN_LIENMINH','BN_NAM100','BN_DICHUC','BN_CHET','BN_LUAT',
  'PL_QUYEN','PL_QUYEN_LUAT','PL_CO','PL_CO_LUAT','PL_CHUYENNGU','PL_KHO','PL_KHO_LUAT','PL_CAMKET',
  'PL_DIEU','PL_PHAPNHAN','PL_HOPDONG','PL_XUNGDOT','PL_BAC4','PL_BAC4_LUAT',
  'PL_TRANHCHAP','PL_KIEM90','PL_DINHKY','PL_CHOCHU','PL_CHOCHU_LUAT','PL_LUAT',
  /* Lớp băng của ma trận: từ 9.8 nó về gói nghề cùng MATRAN, vì mọi
     màn đọc nó đều khoá ở quyền nghề. */
  'MT_BANG','MT_BANG_MA','MT_BANG_TANG','MT_BANG_NHOM','MT_BANG_LUAT','MT_DO',
  'CV_TRANG','CV_MUC','CV_MUC_DS','CV_LUAT','CV_HANG','CV_KH_NGAY','CV_KH_TANG','CV_KPI_CAP','CV_KPI_CAP_LUAT','DEHIEU_LUAT','DEHIEU_THAY','DEHIEU_TRANG','DEHIEU_NGUONG',
  /* ── Bốn mươi bảy kho nghề tích lại qua nhiều bản ──
     Bộ kiểm phát hành v8.9 đối chiếu nội dung thật của gói NGHỀ và gói
     TẦNG với danh sách này, và tìm ra 47 kho chưa bao giờ được khai.
     Mỗi cái là một chỗ dữ liệu nghề nằm lại trong bộ nhớ máy khách sau
     khi đổi vai: máy vừa đăng nhập Coach, đăng nhập lại bằng phụ huynh,
     thì phụ huynh vẫn còn học phí, hợp đồng tuyến, mô thức NLP, chiều
     sâu nghề trong tay.

     Không kho nào trong đây do bản này thêm vào — chúng có sẵn. Cái mới
     là phép đo tìm ra chúng, và phép đo ấy nay chạy mỗi lần phát hành
     nên danh sách không tụt lại phía sau kho được nữa. */
  'MT_SAU','SAU_BOICANH','SAU_TRUONG_CAP','SAU_TRUONG_CHUNG','SAU_LUAT',
  'HD_CHUAN','HD_RIENG','HD_LUAT','QT_LUONG','QT_RIENG',
  'QT_LUAT','TD_MUC','TD_CANH','TD_TRITHUC','TD_MAYCHU',
  'TD_KHONG','TD_THAT','NLP_GOC','NLP_MUC','NLP_CAITIEN',
  'NLP_LUAT','HP_PHAM_VI','TAILIEU_GOC','TAILIEU_DRIVE','HP_TANG',
  'HP_LUAT','HP_KICHBAN','HP_SOAT','REF_30S','REF_GAINS_GITA',
  'REF_121','REF_CHAM','REF_CHAM_MUC','REF_TRANGTHAI','REF_BANGIAO',
  'REF_CAMON','REF_KHONG','REF_HOI','REF_KPI','REF_LOI',
  'CD_BO','CD_LUAT','TL_KE','TL_DUONG','TL_LUAT',
  'TL_TRICH','TL_BAOQUAN',
  'LUAT_TK','TAIKHOAN_KPI','YEUCAU_MO','HANG_TL','DAU_MAT','QUYTRINH',
  'QUA1000','QUA_DANG','KETNOI','LIENKET','VANBAN','TAICHINH_QT','THANHTRA','RASOAT_KH',
  'BANDO_TUVAN','BANDO_COACH','XUAT','TINHHUONG','KHUNG_T5','THANHTOAN','TEST750','KPI100',
  'MATRAN','MATRAN_T1','MATRAN_T2','MATRAN_T3','MATRAN_T4','MATRAN_T5',
  'REFERRAL','CHANDUNG_KH','DOLUONG_KH','PHANHANG','CHUAN_VIP','NHANSU_TT','CAYTIEN',
  'HOSO_VIP','CHUYENDOI','XUONG_SONG','NGUON_VAITRO','SACH_THAMKHAO','PHUONGPHAP','VANTAY','AICHAM','SOTAY_NHANDIEN','CAPDO_VANDUNG','VANDUNG','QUYTRINH_XL','RANG_BUOC',
  'TRU_GITA','HANHTRINH12','LOI_HUA_GITA','TN7','LOI5','REF_CHUAN','TRUYENTHONG3',
  'BANG_GAINS','BANG_REF','REF16','REF_GIAIDOAN','REF_LOI5','CHUOI10','BANDAP',
  'KHACHLON_NGUON','KHACH_TANG','NAM_TANG_PHUCVU','TAM_NAM_TANG','NAC_QUANHE',
  'NAC_TRUNGTHANH','TAM_MATXICH','HOSO68','MUOIHAI_NGUYENTAC','NHANTANG',
  'NAM_BUOC_KHIEUNAI','GIU124','VISAO_ROIDI','KHACHLON_CAU','LUAT_LAMVIEC'
];
function donKho(){
  G.THUOC_CAP_PHEP.forEach(function(k){ try{ delete G[k]; }catch(e){ G[k] = undefined; } });
  /* Kho trải ra nhiều gói được NỐI chứ không gán, nên quên dọn là nối
     chồng: mở kho lần thứ hai trong cùng một trang thì 600 chuyện thành
     1200, và không có gì báo. Phép đo bắt được đúng lỗi này ngay lần
     chạy đầu sau khi chia kho. */
  G.KHO_TRAI_RA.forEach(function(k){ try{ delete G[k]; }catch(e){ G[k] = undefined; } });
  G.KHO.daNap = []; G.KHO.dangNap = []; G.KHO.cheDoMau = false; G.KHO.hanKhoa = null;
  /* Bảng thứ hạng của trần 30% tính từ chính kho đang mở. Đổi vai là kho
     đổi, nên bảng cũ phải bỏ đi — không thì nhà mình được tính theo kho
     của vai trước. */
  if (G.quenBangHang) G.quenBangHang();
}
G.donKho = donKho;

/* ── Phạm vi cấp phép: vai nào, tầng nào, TUYẾN nào, được mở gói nào ── */
G.goiDuocCap = function () {
  /* Đây chỉ là DANH SÁCH XIN. Quyết định cấp hay không là của máy chủ:
     máy chủ đọc hồ sơ tài khoản, biết vai, tầng và tuyến thật, rồi chỉ trả
     khoá của những gói tài khoản đó được cấp phép. Client không tự phong
     quyền — nên chỗ này xin rộng cũng không mở thêm được gì.

     Từ v7.8 phạm vi có ba chiều thay vì hai: VAI × TẦNG × TUYẾN. Tài khoản
     không khai tuyến thì G.tuyenCuaTK trả về đúng GITA365, nên mọi tài
     khoản và mọi giấy phép có trước v7.8 xin y hệt như cũ. */
  var r = G.S.roleObj, ds = ['nen'];
  if (!r) return ds;

  /* Chỉ xin gói của tuyến ĐANG CHẠY. Tuyến còn đang dựng chuẩn thì chưa
     có tệp .enc nào mang tên gói của nó; xin một tên không tồn tại làm
     máy chủ ghi một dòng từ chối mỗi lần đăng nhập, và người đọc nhật ký
     sẽ tưởng có ai đang dò khoá. */
  var tuyen = (G.tuyenCuaTK ? G.tuyenCuaTK(G.S.acc) : ['GITA365'])
    .filter(function (mt) { var t = G.tuyen && G.tuyen(mt); return t && t.trangThai === 'chay'; });
  var moTang = (r.lv <= 12 || r.portal === 'ph' || r.portal === 'hs');

  /* ── TẦNG CAO NHẤT ĐƯỢC CẤP PHÉP ──
     Đội ngũ (bậc ≤ 12) phải mở được mọi tầng: họ phục vụ nhà ở mọi tầng,
     và một Coach không đọc được tầng của nhà mình đang theo thì không làm
     được việc. Khách hàng thì KHÔNG: họ chỉ mở tới tầng đã mua.

     Trước 9.9 chỗ này xin cả năm tầng cho mọi khách hàng, và vì bảng cấp
     phát của máy chủ dựng bằng chính hàm này, máy chủ CẤP THẬT cả năm.
     Hai cái giá cùng lúc: một nhà Tầng 1 giữ trong máy tư liệu Tầng 5 mà
     họ chưa mua, và 6,6 MB đường truyền cho phần không được dùng. */
  var tangToiDa = (r.lv <= 12) ? G.TUYEN_SO_TANG
    : Math.max(1, Math.min(G.TUYEN_SO_TANG, Number(G.S.acc && G.S.acc.tang) || 1));

  tuyen.forEach(function (mt) {
    /* Bậc 12 chứ không phải 11. Ba bảng khác đều nói kho nghề mở tới R12
       (G.PERM.nghe_chung = 12, G.TANG_HIENTHI, và bảng tỉ lệ hiển thị),
       nhưng chỗ này từng dừng ở 11 — nên Chuyên viên phân tích thấy mục
       "Kho báu vật" và "Sách gốc" trong trình đơn mà bấm vào chỉ ra màn
       xin cấp phép. */
    if (r.lv <= 12) ds.push(G.goiNghe(mt));
    if (moTang)
      for (var i = 1; i <= tangToiDa; i++) ds.push(G.goiTang(mt, i));
  });

  return ds.filter(function (g, i) { return g && ds.indexOf(g) === i; });
};

/* ── Bảng cấp phát cho MÁY CHỦ đọc ──
   Khi máy của chủ hệ thống phục vụ máy khác (desktop/may-chu.js), máy chủ
   phải tự quyết định mỗi tài khoản được mở gói nào. Nó KHÔNG được tin cái
   vai mà máy khách khai — máy khách nào cũng khai được "R01".

   Nên máy chủ tra bảng này theo TÊN ĐĂNG NHẬP. Bảng dựng bằng chính
   G.goiDuocCap() ở trên, không chép lại luật lần thứ hai: sửa phạm vi cấp
   phép một chỗ là cả hai đường đi theo. */
G.bangCapPhat = function () {
  var ra = {};
  var ds = (G.ACCOUNTS || []).concat(G.AUDITORS || []);
  var giuAcc = G.S.acc, giuRole = G.S.role, giuRo = G.S.roleObj;
  try {
    for (var i = 0; i < ds.length; i++) {
      var a = ds[i];
      if (!a || !a.u) continue;
      G.S.acc = a; G.S.role = a.role; G.S.roleObj = G.roleById(a.role);
      ra[String(a.u).toLowerCase()] = { vai: a.role, ten: a.ten || '', goi: G.goiDuocCap() };
    }
  } finally {
    /* Phải trả trạng thái về đúng như cũ. Bảng này dựng ngay trong phiên
       của chủ hệ thống đang mở màn hình — để sót là chủ hệ thống bị đổi
       vai thành người cuối danh sách mà không hiểu vì sao. */
    G.S.acc = giuAcc; G.S.role = giuRole; G.S.roleObj = giuRo;
  }
  return ra;
};

/* ── Xin khoá ── */
function xinKhoa(danhSach) {
  /* Giấy phép cục bộ: bản máy tính đã kích hoạt nạp khoá qua đường này,
     sau khi tiến trình chính đọc và kiểm tệp giấy phép trong thư mục dữ liệu.
     Bản web không bao giờ có sẵn khoá — luôn phải hỏi máy chủ. */
  if (window.GITA_KHOA) return Promise.resolve(window.GITA_KHOA);
  if (!G.API_CAP_PHEP) return Promise.resolve(null);
  return fetch(G.API_CAP_PHEP, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      fn: 'capKhoa',
      u: G.S.acc && G.S.acc.u,
      vai: G.S.role,
      goi: danhSach,
      may: navigator.userAgent.slice(0, 120)
    })
  }).then(function (r) { return r.json(); })
    .then(function (d) {
      if (!d || !d.ok) {
        /* Máy chủ từ chối có lý do, và lý do ấy phải tới được người dùng.
           Rơi thẳng về chế độ mẫu mà không nói gì là cách chắc chắn nhất
           để một người ngồi hàng giờ tưởng ứng dụng hỏng. */
        G.KHO.lyDoTuChoi = (d && d.error) || 'Máy chủ chưa cấp khoá';
        G.KHO.maTuChoi   = (d && d.code) || '';
        if (d && d.code === 'MUSTCHANGE' && G.U && G.U.toast)
          setTimeout(function () {
            G.U.toast('Kho chưa mở vì tài khoản còn dùng mật khẩu tạm. ' +
              'Đổi mật khẩu rồi đăng nhập lại.', 'err');
            if (G.moDoiMatKhau) G.moDoiMatKhau();
          }, 400);
        throw new Error(G.KHO.lyDoTuChoi);
      }
      G.KHO.lyDoTuChoi = ''; G.KHO.maTuChoi = '';
      G.KHO.hanKhoa = d.hetHan || null;
      /* Máy chủ của chủ hệ thống (desktop/may-chu.js) trả kèm mã phiên.
         Gói của phiên nào chỉ lấy được bằng mã phiên ấy, nên phải giữ lại
         và gửi kèm ở layGoi. Máy chủ Apps Script không trả trường này —
         khi ấy chuỗi rỗng, và layGoi gọi y như cũ. */
      G.KHO.maPhien = d.phien || '';
      return d.khoa;
    });
}

/* ── Lấy một gói đã mã hoá ──
   Hai đường, tuỳ bản web nằm ở đâu:
     · bản tĩnh (GitHub Pages, tên miền, bản cài trên máy) → đọc tệp cạnh ứng dụng
     · bản do Apps Script phục vụ → xin qua máy chủ, nhận base64
   Gói nào cũng đã mã hoá sẵn, nên đường nào cũng không lộ gì. */
function layGoi(ten) {
  var nguon = window.GITA_NGUON_KHO;
  if (nguon)
    return fetch(nguon + encodeURIComponent(ten) +
        (G.KHO.maPhien ? '?p=' + encodeURIComponent(G.KHO.maPhien) : ''))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || !d.ok) {
          /* Chủ hệ thống cắt quyền máy này giữa chừng thì đường này là chỗ
             đầu tiên biết. Không nói ra thì người dùng chỉ thấy màn trắng. */
          if (G.MAY_KHACH_BI_CAT) G.MAY_KHACH_BI_CAT(d && d.error);
          throw new Error((d && d.error) || 'Máy chủ không trả gói ' + ten);
        }
        return Uint8Array.from(atob(d.du), function (c) { return c.charCodeAt(0); });
      });

  return fetch('kho/' + ten + '.enc')
    .then(function (r) { if (!r.ok) throw new Error('Không tìm thấy gói ' + ten); return r.arrayBuffer(); })
    .then(function (buf) { return new Uint8Array(buf); });
}

/* ── Giải mã một gói ── */
function moGoi(ten, khoaB64) {
  return layGoi(ten)
    .then(function (b) {
      var iv = b.slice(0, 12), tag = b.slice(12, 28), ma = b.slice(28);
      var kem = new Uint8Array(ma.length + tag.length);
      kem.set(ma); kem.set(tag, ma.length);       // WebCrypto chờ tag ở cuối
      var raw = Uint8Array.from(atob(khoaB64), function (c) { return c.charCodeAt(0); });
      return crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt'])
        .then(function (k) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, k, kem); });
    })
    .then(function (ro) { return giaiNen(ro); })
    .then(function (chu) { return JSON.parse(chu); });
}

/* ── Giải nén sau khi giải mã ──
   Từ bản 9.9, ruột của gói được NÉN trước rồi mới mã hoá. Vì sao theo thứ
   tự ấy: nén trước thì nén được thật (JSON lặp rất nhiều), còn nén sau
   thì không — bản đã mã hoá là chuỗi ngẫu nhiên, nén vào không giảm nổi
   một phần trăm. Đo trên kho thật: 13,6 MB xuống 2,07 MB, riêng các gói
   tầng giảm 14 đến 31 lần.

   Không cần thêm cờ hay đổi định dạng phong bì: JSON luôn bắt đầu bằng
   '{' (0x7B), còn gzip luôn bắt đầu bằng 0x1F 0x8B. Hai giá trị ấy không
   bao giờ trùng, nên chỉ cần nhìn hai byte đầu là biết. Nhờ vậy gói cũ
   chưa nén vẫn mở được bình thường — không có ngày nào người dùng phải
   tải lại toàn bộ kho vì đổi định dạng. */
function giaiNen(buf) {
  var u8 = new Uint8Array(buf);
  if (!(u8[0] === 0x1f && u8[1] === 0x8b)) return Promise.resolve(new TextDecoder().decode(buf));
  if (typeof DecompressionStream !== 'function')
    return Promise.reject(new Error('Trình duyệt này chưa giải nén được gzip. Cần bản mới hơn.'));
  var ds = new DecompressionStream('gzip');
  var w = ds.writable.getWriter(); w.write(u8); w.close();
  return new Response(ds.readable).text();
}

/* ── Gộp nội dung đã mở vào G, chỉ trong bộ nhớ ── */
/* ── KHO TRẢI RA NHIỀU GÓI ──
   Hầu hết kho nằm gọn trong một gói: mở gói ra, gán vào G, xong. Nhưng
   vài kho phải trải ra nhiều gói vì người đọc chúng thuộc nhiều phạm vi
   cấp phép khác nhau — bộ test chia theo tầng, danh mục quà chia theo
   tầng, kho chuyện và bộ sát hạch chia theo VAI (phần của gia đình đi
   gói nền, phần của đội ngũ đi gói nghề).

   Với những kho ấy, gộp là NỐI chứ không phải GÁN. Gán thì gói mở sau
   đè mất gói mở trước, và cái mất đi im lặng: màn hình vẫn chạy, chỉ là
   thiếu một nửa nội dung. Đúng lỗi đã xảy ra thật khi dựng lại kho ở
   9.6 — TEST750 tụt từ 25 bộ xuống 5 vì một lượt Object.assign.

   Danh sách này phải khớp ĐÚNG với thực tế bảy gói: bộ kiểm phát hành
   đối chiếu hai chiều — kho nào nằm ở nhiều gói mà không khai ở đây là
   đỏ, và kho nào khai ở đây mà chỉ nằm một gói cũng đỏ. Nhờ vậy nó
   không tụt lại phía sau kho như một danh sách viết tay thường thấy. */
/* KICHBAN từng nằm ở đây khi kịch bản còn đi theo gói tầng. Từ 8.9 nó
   về gói nghề, nằm gọn một gói, nên nó KHÔNG còn thuộc danh sách này —
   khai thừa cũng đỏ, và đỏ ở đây là đúng: một cái tên khai thừa hôm nay
   là một cái tên không ai dám xoá ngày mai. */
G.KHO_TRAI_RA = ['TEST750', 'QUA1000', 'CHUYEN', 'SH_HOI', 'KH_BAI'];

function gop(du) {
  Object.keys(du).forEach(function (k) {
    if (G.KHO_TRAI_RA.indexOf(k) >= 0) G[k] = (G[k] || []).concat(du[k]);
    else G[k] = du[k];
  });
}

/* ── Chế độ mẫu: đủ để xem giao diện, không lộ kho ── */
function napMau() {
  /* Bản do Apps Script phục vụ không có thư mục kho/ cạnh trang, nên dữ liệu
     mẫu cũng xin qua máy chủ như các gói khác. */
  var duong = window.GITA_NGUON_KHO ? (window.GITA_NGUON_KHO + 'mau') : 'kho/mau.json';
  return fetch(duong).then(function (r) { return r.json(); })
    .then(function (m) {
      G.KHO.cheDoMau = true;
      Object.keys(m).forEach(function(k){ G[k] = m[k]; });
      G.KICHBAN = m.KICHBAN || []; G.PHACDO = m.PHACDO || [];
      G.MOTHUC = m.MOTHUC || []; G.TEST750 = m.TEST750 || [];
      if (G.quenBangHang) G.quenBangHang();
    })
    .catch(function () {
      G.KHO.cheDoMau = true; G.KICHBAN = []; G.PHACDO = []; G.MOTHUC = []; G.TEST750 = [];
      if (G.quenBangHang) G.quenBangHang();
    });
}

/* ── Nạp kho cho phiên làm việc hiện tại ── */
G.napKho = function () {
  donKho();
  var ds = G.goiDuocCap();
  G.KICHBAN = [];
  G.KHO_TRAI_RA.forEach(function(k){ G[k] = []; });
  return xinKhoa(ds)
    .then(function (khoa) {
      if (!khoa) return napMau();
      var co = ds.filter(function (t) { return khoa[t]; });
      /* CHỈ gói nền mở trước. Có nó là cột trái dựng được, màn đầu dựng
         được, người ta bắt đầu làm việc được.

         Gói nghề từng nằm ở đây cùng gói nền, và cái giá đo được: một
         Coach phải chờ 6,6 MB giải mã xong mới thấy màn hình đầu tiên —
         1.196 ms đứng nhìn màn chờ. Nhưng màn đầu của Coach không đọc
         một chữ nào của gói nghề.

         Nay gói nghề mở ở nền như gói tầng. Màn nào cần nó mà nó chưa
         xong thì render() đã có sẵn thẻ "Đang mở kho" và tự dựng lại khi
         gói tới — cơ chế ấy có từ 7.x cho gói tầng, chỉ là chưa ai dùng
         cho gói nghề. */
      var truoc = co.filter(function (t) { return t === 'nen'; });
      var sau   = co.filter(function (t) { return truoc.indexOf(t) < 0; });

      function mo(t) {
        return moGoi(t, khoa[t])
          .then(function (du) {
            gop(du); G.KHO.daNap.push(t);
            /* Kho vừa lớn thêm một gói — tính lại thứ hạng cho trần 30% */
            if (G.quenBangHang) G.quenBangHang();
          })
          .catch(function (e) { console.warn('[GITA] gói ' + t + ': ' + e.message); })
          .then(function () {
            var i = G.KHO.dangNap.indexOf(t);
            if (i >= 0) G.KHO.dangNap.splice(i, 1);
          });
      }

      G.KHO.dangNap = co.slice();
      return Promise.all(truoc.map(mo)).then(function () {
        if (!G.KHO.daNap.length && !sau.length) return napMau();
        G.KHO.cheDoMau = false;
        if (G.secLog) G.secLog('Mở kho', 'Đã mở ' + G.KHO.daNap.length + ' gói theo phạm vi cấp phép: ' +
          G.KHO.daNap.join(', '), 'Ghi nhận');
        /* Không chờ phần này — để nó chạy ở nền */
        sau.forEach(function (t) {
          mo(t).then(function () {
            if (!G.S.acc) return;
            /* Cột trái dựng lại mỗi lần một gói về. Vài mục chỉ hiện khi
               CÓ dữ liệu trong kho, nên gói về muộn mà cột không dựng lại
               thì mục ấy ẩn luôn tới lần chuyển màn kế tiếp. */
            if (G.veLaiCot) G.veLaiCot();
            if (G.render && !G.coGoi(G.goiCanCho(G.S.view))) return;
            if (G.render && G.goiCanCho(G.S.view) === t) G.render();
          });
        });
      });
    })
    .catch(function (e) {
      console.warn('[GITA] cấp phép: ' + e.message);
      return napMau();
    });
};

/* ── Màn hình khi nội dung chưa được cấp phép ──
   Không chỉ nói "bị khoá". Nói rõ ba điều khách hàng cần biết ngay:
   khoá cái gì, vì sao, và mở nó bằng cách nào — kèm những thứ đang
   dùng được ngay bây giờ để không ai bị bỏ lại ở một trang cụt. */
var TEN_GOI = {
  nen:  'Gói nền — mô hình, lộ trình, nhịp sống nhà mình',
  nghe: 'Gói nghề — kịch bản, phác đồ, mô thức, hệ VIP',
  tang1:'Gói tầng 1 — NHẬN DIỆN', tang2:'Gói tầng 2 — GIẢI MÃ',
  tang3:'Gói tầng 3 — KIẾN TẠO',  tang4:'Gói tầng 4 — CHUYỂN HOÁ',
  tang5:'Gói tầng 5 — BỨT PHÁ'
};

/* Gói của tuyến mới không viết tay vào bảng trên — tên gọi suy ra từ
   G.TUYEN, nên thêm một tuyến là có ngay tên đọc được, không phải nhớ
   sửa thêm chỗ này. */
function tenGoi_(g){
  if(TEN_GOI[g]) return TEN_GOI[g];
  var d = G.doiGoi && G.doiGoi(g);
  if(!d || !d.tuyen) return g;
  var t = G.tuyen(d.tuyen); if(!t) return g;
  if(d.loai === 'nghe') return 'Gói nghề ' + t.ten + ' — kịch bản và phác đồ của tuyến';
  var bac = (G.TIERS || []).filter(function(x){ return x.id === d.tang; })[0];
  return 'Gói tầng ' + d.tang + ' ' + t.ten + (bac ? ' — ' + bac.name : '');
}

G.canCapPhep = function (goi) {
  var U = G.U, h = U.h;
  var mau = G.KHO && G.KHO.cheDoMau;
  var laTang = /^tang(\d)$/.test(String(goi));
  var soTang = laTang ? Number(String(goi).slice(4)) : 0;
  var tenGoi = tenGoi_(goi);

  /* Người đọc màn này đang muốn LÀM MỘT VIỆC, không muốn đọc một bài giải
     thích. Nên nút mở đứng trước, giải thích đứng sau — và nút phải hợp với
     đúng vai đang đăng nhập, không đưa ba lựa chọn để họ tự đoán. */
  var laChu = G.can && G.can('qt_trang');          /* Super Admin · Admin hệ thống */
  /* Nạp tệp giấy phép chạy được trên bản web nhiều tệp và bản cài — chỉ
     cần vai được phép. KHÔNG chạy trên bản giới thiệu một tệp: bản ấy
     không mang theo kho .enc nào, nên có khoá cũng không có gì để mở. */
  var napDuoc = !!(G.napDuocGiayPhep && G.napDuocGiayPhep());
  var motTep  = !!(G.laBanMotTep && G.laBanMotTep());

  var o = U.ph({ eyebrow: 'PHẦN NÀY CHƯA MỞ', ic: 'lock',
    t: mau ? 'Bấm một nút là mở' : 'Chưa tới lượt màn hình này',
    lead: mau
      ? 'Ứng dụng đang chạy bản mẫu nên kho chuyên môn chưa mở. Chọn đúng một việc bên dưới.'
      : 'Không phải lỗi, và cũng không phải anh chị làm sai. Dưới đây là đúng ba điều: khoá phần nào, vì sao, và mở bằng cách nào.' });

  /* Bản một tệp: nói thẳng vì sao nạp giấy phép không giúp được gì ở đây.
     Trước đây màn này vẫn mời nạp giấy phép trên bản một tệp — người dùng
     bấm, chọn tệp, và không có gì đổi. Nút chết còn tệ hơn không có nút:
     nó làm người ta tưởng mình thao tác sai, và làm giấy phép bị mang ra
     khỏi nơi an toàn mà chẳng để làm gì. */
  if(mau && motTep)
    o += '<div class="card mb" style="border-color:rgba(251,146,60,.45);background:rgba(251,146,60,.07)">'+
      '<div class="row mb" style="gap:9px"><span style="color:var(--alert)">'+U.ic('bell','w-4 h-4')+'</span>'+
      '<b style="color:var(--alert)">ĐÂY LÀ BẢN GIỚI THIỆU MỘT TỆP — KHÔNG KÈM KHO</b></div>'+
      '<p class="sm" style="line-height:1.75">Bản này gói cả ứng dụng vào một tệp HTML để gửi đi và mở '+
      'được ở mọi nơi. Nó <b>không mang theo kho tri thức đã mã hoá</b>, nên nạp giấy phép vào đây '+
      'cũng không mở thêm được gì — có khoá mà không có hộp để mở.</p>'+
      '<p class="sm mt" style="line-height:1.75">Muốn xem đủ kho thì dùng một trong hai đường: '+
      '<b>bản cài trên máy tính</b> (Trợ giúp → Nạp giấy phép), hoặc <b>bản web nhiều tệp</b> đã nối '+
      'máy chủ cấp phép. Cả hai đều đi kèm bảy tệp <span class="mono">kho/*.enc</span>.</p></div>';

  /* ── Hàng nút, đặt NGAY ĐẦU màn ── */
  if(mau){
    var nut = [];
    if(napDuoc) nut.push({t:'Nạp tệp giấy phép', act:'gp-mo', pri:1,
      y:'Tệp .json Học viện cấp. Chọn tệp là mở kho ngay, không cần mạng, không cần máy chủ. '+
        'Đây là đường nhanh nhất.'});
    if(laChu) nut.push({t:'Nối máy chủ cấp phép', v:'noi-may-chu', pri:!napDuoc,
      y:'Dán địa chỉ máy chủ một lần. Từ đó về sau mọi tài khoản đăng nhập là có khoá.'});
    nut.push({t:'Đăng nhập lại', act:'logout',
      y:'Đã nối máy chủ rồi mà vẫn khoá thì đăng xuất và vào lại — khoá cấp lúc mở phiên.'});
    if(!laChu && !napDuoc) nut.push({t:"Đăng ký tài khoản", act:"mo-dang-ky",
      y:'Chưa có tài khoản thì đăng ký ở Cổng vào, xác nhận email, hệ thống cấp mã số khách hàng.'});

    o += '<div class="card" style="border-color:var(--gita);background:var(--gita-mo-1)">'+
      '<div class="up mb" style="color:var(--gita-ink)">'+U.ic('arrow','w-4 h-4')+' MỞ NGAY BÂY GIỜ</div>'+
      nut.map(function(n, j){
        return '<div class="row" style="gap:12px;align-items:flex-start;'+
          (j ? 'margin-top:12px;padding-top:12px;border-top:1px solid var(--line)' : '')+'">'+
          '<button class="btn '+(n.pri ? 'pri' : 'ghost')+'" style="flex:none;min-width:190px"'+
            (n.v ? ' data-v="'+h(n.v)+'"' : '')+(n.act ? ' data-act="'+h(n.act)+'"' : '')+'>'+
            h(n.t)+'</button>'+
          '<p class="sm dim" style="flex:1;min-width:200px;line-height:1.6;margin-top:9px">'+h(n.y)+'</p>'+
        '</div>';
      }).join('')+
      (laChu ? '<p class="tiny muted mt2">Anh chị đang ở vai quản trị — nối máy chủ một lần là mở cho toàn hệ, '+
               'không phải làm lại trên từng máy.</p>' : '')+
    '</div>';
  }
  else if(!laTang){
    /* Không phải chế độ mẫu: vai không đủ. Chỉ có một việc làm được. */
    o += '<div class="card" style="border-color:var(--gita-vien-1)">'+
      '<div class="row" style="gap:12px;align-items:center;flex-wrap:wrap">'+
        '<button class="btn ghost" data-act="logout">Đăng nhập bằng vai khác</button>'+
        '<p class="sm dim" style="flex:1;min-width:220px;line-height:1.6">Gói này thuộc phạm vi vai khác. '+
        'Cần dùng thật thì nhắn Admin hệ thống cấp thêm quyền cho vai của anh chị.</p></div></div>';
  }

  /* 1 · Khoá phần nào */
  o += '<div class="card" style="border-color:var(--gita-vien-1)">' +
    '<div class="row mb"><span style="color:var(--gold-ink)">' + U.ic('vault', 'w-4 h-4') + '</span>' +
    '<b>1 · Màn hình này nằm trong ' + h(tenGoi) + '</b></div>' +
    '<p class="sm" style="line-height:1.75;color:var(--ink-2)">Nội dung chuyên môn của GITA 365 được mã hoá và chia thành bảy gói. ' +
    'Mỗi tài khoản chỉ nhận khoá của những gói thuộc vai và tầng của mình — không thừa một gói nào.</p></div>';

  /* 2 · Vì sao */
  o += '<div class="card mt2">' +
    '<div class="row mb"><span style="color:var(--ink-3)">' + U.ic('shield', 'w-4 h-4') + '</span>' +
    '<b>2 · Vì sao đang khoá</b></div>' +
    (mau
      ? '<p class="sm" style="line-height:1.75;color:var(--ink-2)">Ứng dụng đang chạy <b>chế độ mẫu</b> — chưa nối với máy chủ cấp phép ' +
        'nên chưa có khoá của gói nào. Đây là trạng thái của bản dùng thử và bản cài chưa kích hoạt.</p>'
      : laTang
        ? '<p class="sm" style="line-height:1.75;color:var(--ink-2)">Nhà mình chưa vào <b>tầng ' + soTang + '</b>. ' +
          'Tầng mở dần theo hành trình, không mở hết một lượt — vì học tầng sau khi chưa xong tầng trước thì hỏng nhịp, ' +
          'không phải vì tiếc nội dung.</p>'
        : '<p class="sm" style="line-height:1.75;color:var(--ink-2)">Gói này thuộc phạm vi của đội ngũ dẫn dắt GITA 365. ' +
          'Vai hiện tại không được cấp — đó là cách giữ cho hồ sơ từng gia đình không rơi sang tay người không phụ trách.</p>') +
    '</div>';

  /* 3 · Mở bằng cách nào */
  o += '<div class="card mt2" style="border-color:rgba(16,185,129,.36)">' +
    '<div class="row mb"><span style="color:var(--ok)">' + U.ic('arrow', 'w-4 h-4') + '</span>' +
    '<b>3 · Mở bằng cách nào</b></div>' +
    (mau
      ? U.list([
          'Nối ứng dụng với máy chủ cấp phép của Học viện, rồi đăng nhập lại.',
          'Bản cài trên máy tính: nạp tệp giấy phép được cấp cho đúng máy đó.',
          'Chưa có tài khoản: đăng ký ở Cổng vào, xác nhận email, rồi hệ thống cấp mã số khách hàng.'
        ])
      : laTang
        ? U.list([
            'Hoàn thành KPI của tầng đang học — hệ thống đếm từ dữ liệu anh chị đã ghi.',
            'Xác nhận thanh toán thành công — kế toán đối chiếu sao kê rồi ghi nhận.',
            'Đủ cả hai thì hệ thống nâng tầng và mở gói này ở lần đăng nhập kế tiếp.'
          ])
        : U.list([
            'Phần này dành cho đội ngũ GITA 365. Nếu anh chị là người của đội ngũ, đề nghị Admin cấp đúng vị trí.',
            'Nếu là gia đình đang học, Coach phụ trách sẽ mang phần cần thiết vào buổi đồng hành.'
          ])) +
    '</div>';

  /* Đang dùng được gì — để không ai đứng ở trang cụt */
  o += '<div class="card mt2"><div class="up mb" style="color:var(--ink-4)">ĐANG DÙNG ĐƯỢC NGAY BÂY GIỜ</div>' +
    '<p class="sm dim" style="line-height:1.7">' +
    (G.KHO.daNap.length
      ? 'Gói đã mở: <b class="mono">' + h(G.KHO.daNap.join(' · ')) + '</b>.'
      : 'Bản mẫu công khai: mô hình năm khoang chín vai, lộ trình năm tầng, mười chân dung thành công, ' +
        'nhịp sống và nghi lễ gia đình, cú hích, cách ghi nhận và trao quà, sáu ranh giới an toàn, ' +
        'chương trình đại sứ, sự kiện, và một bài test rút gọn.') + '</p>' +
    '<div class="row mt" style="gap:9px;flex-wrap:wrap">' +
      (G.napDuocGiayPhep && G.napDuocGiayPhep()
        ? '<button class="btn pri sm" data-act="gp-mo">' + U.ic('vault','w-4 h-4') + 'Nạp giấy phép để mở kho</button>' : '') +
      '<button class="btn ghost sm" data-v="pham-vi">Xem đầy đủ phạm vi của tôi</button>' +
      '<button class="btn ghost sm" data-v="lo-trinh">Lộ trình năm tầng</button></div></div>';

  /* Người của Học viện thì nói thẳng đường mở, đừng để họ mắc ở đây */
  if (G.napDuocGiayPhep && G.napDuocGiayPhep())
    o += '<div class="card mt2" style="border-color:var(--gita-vien-1);background:var(--gita-mo-1)">' +
      '<div class="row mb"><span style="color:var(--gita-ink)">' + U.ic('shield', 'w-4 h-4') + '</span>' +
      '<b>Anh chị là người của Học viện — mở được ngay</b></div>' +
      '<p class="sm" style="line-height:1.75;color:var(--ink-2)">Bấm <b>Nạp giấy phép</b> ở trên và chọn tệp ' +
      '<span class="mono">giay-phep-….json</span> Học viện cấp cho máy này. Kho mở ngay trong phiên làm việc, ' +
      'đủ cả bảy gói nếu giấy phép cấp đủ — không cần chờ nối máy chủ.</p>' +
      '<p class="tiny muted mt">Chưa có tệp giấy phép: chạy <span class="mono">node tools/tao-giay-phep.js "Tên anh chị" 24</span> ' +
      'trên máy dựng, tệp ra ở thư mục <span class="mono">giay-phep/</span>.</p></div>';
  return o;
};

