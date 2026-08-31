/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÃ HOÁ KHO TÀI SẢN
   Đọc nội dung gốc trong kho-goc/, chia thành các gói theo phạm vi
   cấp phép, mã hoá AES-256-GCM và xuất ra kho/*.enc

       node tools/ma-hoa-kho.js

   Ra hai thứ:
     kho/*.enc        — gói đã mã hoá, phát hành kèm ứng dụng được
     kho/khoa.json    — BỘ KHOÁ, nạp vào máy chủ cấp phép.
                        TUYỆT ĐỐI KHÔNG đưa tệp này lên kho mã.

   Khoá KHÔNG nằm trong ứng dụng. Máy chủ chỉ trả khoá của những gói
   mà vai và tầng của người đăng nhập được cấp phép.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const GOC = path.join(__dirname, '..');
const NGUON = path.join(GOC, 'kho-goc');
const RA = path.join(GOC, 'kho');

/* ─── Nạp nội dung gốc ─── */
global.window = {};
for (const t of fs.readdirSync(NGUON).filter(f => f.endsWith('.js')).sort())
  require(path.join(NGUON, t));
const G = global.window.G;

/* ─── Chia gói theo phạm vi cấp phép ─── */
const NEN = ['VANHANH', 'CHUYENDICH', 'LOTRINH', 'FAMILIES', 'TEAM', 'CUHICH',
  'NGHILE', 'SUKIEN', 'AUDIT', 'TODAY', 'LEVELS', 'DIEM', 'HUYHIEU', 'KPI100', 'QUA', 'HOAHONG', 'WOW',
  'NGONTU_RANH', 'DAISU', 'BAIHOC', 'QUA_DANG', 'KETNOI', 'LIENKET', 'KICHBAN_AI',
  /* Hành trình 12 chặng mở cho MỌI vai — gia đình cũng phải thấy mình đang
     ở đâu trên đường. Nên nó nằm ở gói nền, không nằm sau kho nghề. */
  'TRU_GITA', 'HANHTRINH12', 'LOI_HUA_GITA',
  /* Kênh cộng đồng chính thức: phụ huynh chưa là khách hàng cũng phải
     thấy được nhóm. Đây là cửa trước, cùng lý do với GT_* và DV_*. */
  'KENH_DS', 'KENH_CHANG', 'KENH_LUAT',
  /* Bản đồ cá nhân 11 ô: mọi vai đều có một bản của riêng mình — học viên,
     phụ huynh, cộng tác viên, đội ngũ — nên nó thuộc gói nền. */
  'BDCN_MA', 'BDCN', 'BDCN_MUOI_VIEC', 'BDCN_QUY_TAC', 'BDCN_NHIP',
  /* Sáu trăm chuyện truyền cảm hứng, mỗi cấp tài khoản một trăm. Ở gói nền
     vì vai nào cũng phải có kho của cấp mình; màn hình lọc theo vai. */
  'CH_MACH', 'CH_CAP', 'ROHN', 'CHUYEN',
  /* Đánh giá của gia đình: luật, câu hỏi, mức hiển thị tên — và mảng
     đánh giá THẬT (rỗng cho tới khi có người thật gửi và Học viện duyệt).
     Ở gói nền vì phụ huynh và học viên đều phải gửi được. */
  'DANHGIA_THAT', 'DG_LUAT', 'DG_HOI', 'DG_MOC', 'DG_TEN',
  /* Sổ khai kho rỗng có chủ ý — bộ rà soát đọc nó thay cho danh sách tha lặng */
  'RONG_CO_Y',
  /* Sổ nhật ký từng vị trí và bốn mốc thi viết: mọi vai đều dùng. */
  /* Nghi lễ gia đình: bốn nghi lễ nhịp đều đã có ở NGHILE, nay thêm mười
     nghi lễ TÌNH HUỐNG cho lúc nhà mình lệch nhịp — đứt chuỗi, cãi nhau,
     kết quả xấu, người lớn kiệt sức. Ở gói NỀN vì đây là việc của chính
     gia đình, không phải công cụ nghề. */
  'NGHILE_TH', 'NGHILE_THEM', 'NGHILE_LUAT',
  /* Sổ khai dữ liệu mẫu — để không ai tưởng số dựng là số đo */
  'DL_MAU', 'DL_MAU_LUAT',
  /* Bảng công việc, luật chấm KPI và hạng tháng. Ở gói NỀN vì MỌI vai
     đều phải mở được bảng việc của mình — kể cả cộng tác viên, và kể cả
     gia đình (phần CV_KH_*).

     CV_MUC thì KHÔNG ở đây, và đó là điểm sửa của bản này. Nó từng nằm ở
     gói nền với lý do "màn hình tự lọc theo vai" — nhưng lọc trên màn
     hình không phải bảo vệ dữ liệu. Ba mươi đầu việc đội ngũ, kèm bằng
     chứng đóng việc và điều khoản liên đới, đã xuống máy mọi tài khoản
     phụ huynh; gõ G.CV_MUC trong công cụ nhà phát triển là đọc hết. Nay
     CV_MUC đi gói NGHỀ, còn ba đầu việc của cộng tác viên ở CV_MUC_DS
     giữ lại đây vì R15 không được cấp gói nghề. */
  'CV_TRANG', 'CV_MUC_DS', 'CV_LUAT', 'CV_HANG', 'CV_KH_NGAY', 'CV_KH_TANG',
  'CV_KPI_CAP', 'CV_KPI_CAP_LUAT',
  'DEHIEU_LUAT', 'DEHIEU_THAY', 'DEHIEU_TRANG', 'DEHIEU_NGUONG',
  'NK_NHIP', 'NK_O', 'THI_VIET', 'THI_LUAT',
  /* Chuẩn thời gian, chuẩn hoàn thành, thang thưởng và phạt: mọi vai đều
     phải đọc được, vì luật mà không ai đọc được thì không phải luật. */
  'TG_NGUNG_GIAY', 'TG_LOAI', 'TG_XEP', 'TG_NHIEMVU', 'TG_THUONG', 'TG_PHAT', 'TG_QUYDOI',
  /* Bản giới thiệu Học viện và hồ sơ giọng đọc: mọi vai đều đọc được. */
  'GT_MOT_CAU', 'GT_VISAO', 'GT_HUA', 'GT_KHONG', 'GT_CHANG', 'GT_TANG', 'GT_VAI',
  'GT_HOI', 'GT_SO', 'GT_BUOC', 'GT_MUCTIEU', 'GT_MUCTIEU_RANH', 'GT_DONGHANH',
  'AD_THUMUC', 'AD_DUOI', 'AD_TRANGTHAI', 'AD_GIONG', 'AD_DIEUKHOAN', 'AD_KYTHUAT', 'AD_KHUNG',
  /* Bộ sát hạch và khoá đào tạo tự động. Ở gói NỀN vì cả sáu vai đều thi,
     kể cả học viên và phụ huynh — bài của ai thì màn hình lọc theo vai. */
  'SH_TRUC', 'SH_TRONGSO', 'SH_VAI', 'SH_TANG', 'SH_TOTNGHIEP', 'SH_LUAT', 'SH_HOI',
  'KH_LOTRINH', 'KH_BAI', 'KH_LUAT',
  /* Kho chuyện người thật — người có thật, việc có thật, ghi chép công khai.
     Ở gói nền vì mọi vai đều đọc được. */
  'TG_LINH', 'CHUYEN_TG',
  /* Lớp băng của ma trận: bốn nhóm khách hàng trong mỗi tầng. Ở gói nền
     vì bảng định nghĩa băng và luật xếp băng thì vai nào cũng phải đọc
     được; phần kế hoạch chi tiết vẫn nằm trong gói tầng như cũ. */
  /* Đường vào sáu bước: người mới chưa có tầng nào cũng phải đọc được,
     nên nó thuộc gói nền. */
  'DV_BUOC', 'DV_CHAN', 'DV_HOI',
  /* Chuẩn soát đủ ruột. Ở gói NỀN chứ không phải gói nghề: màn tự soát
     phải chạy được ngay cả khi gói nghề chưa nạp — chính lúc đó nó mới
     báo được kho nào chưa nạp. */
  'SOAT_BAT_BUOC', 'SOAT_THA', 'SOAT_MOC', 'SOAT_CHATLUONG'];

const NGHE = [
  /* Chiều sâu năm lớp: nói rõ ở cấp nghề nào thì làm được gì và CHƯA làm
     được gì. Đây là bản đồ năng lực nội bộ của Học viện — mở ra công khai
     là chỉ cho đối thủ đúng cách dựng đội ngũ. Ở gói NGHỀ. */
  'MT_SAU', 'SAU_BOICANH', 'SAU_TRUONG_CAP', 'SAU_TRUONG_CHUNG', 'SAU_LUAT',
  /* Chiều sâu cho 11 nhóm phác đồ và 10 chủ đề tình huống, lớp nối giữa
     phác đồ/tình huống với kịch bản và chuyện, quy trình riêng từng nhóm,
     và bộ tài liệu phát cho gia đình. Tất cả là tài sản nghề — ở gói NGHỀ. */
  'PD_SAU', 'TH_SAU', 'NOI_KET', 'QT_NHOM', 'TL_GIADINH',
  /* Ranh giới sử dụng của 42 mô thức — khi nào KHÔNG dùng */
  'MT_RANH', 'MT_RANH_LUAT',
  /* Biên nhận áp ruột: bộ áp chạy lúc đóng gói, ghi lại đã áp được bao
     nhiêu phác đồ / tình huống và còn mã nào chưa có ruột. Không có nó thì
     màn soát trên trình duyệt không phân biệt được "chưa áp" với "áp hụt".
     Đi cùng PHACDO và TINHHUONG nên ở gói NGHỀ. */
  'PD_RUOT_SOAT', 'TH_RUOT_SOAT',
  /* Kịch bản chuyên môn — xem lý do ở chỗ dựng gói tầng bên dưới */
  'KICHBAN',
  /* ── MƯỜI BẢY KHO CHUYỂN TỪ GÓI NỀN SANG ĐÂY Ở BẢN 9.8 ──
     Cách tìm ra chúng, ghi lại để sau còn dùng: đăng nhập thật bằng từng
     vai, thay mỗi kho bằng một getter có đánh dấu, rồi dựng LẦN LƯỢT mọi
     màn vai ấy mở được. Kho nào không màn nào chạm tới là kho vai ấy
     nhận mà không dùng. Rồi đọc tay từng chỗ gọi để loại những kho chỉ
     được dùng trong cửa sổ bật lên hoặc hàm phụ (BAIHOC lọt lưới kiểu
     ấy — kho của khách hàng có dùng, nên nó ở lại gói nền).

     Còn lại mười bảy kho dưới đây: MỌI màn đọc chúng đều khoá ở quyền
     nghề hoặc quyền quản trị. Ý định của sản phẩm đã ghi sẵn trong quyền
     của màn hình; trước bản này kho không đi theo ý định ấy.

     Nặng nhất là MATRAN 106 KB — bản ma trận đủ năm tầng. Khách hàng vẫn
     có ma trận tầng mình qua MATRAN_T{n} trong gói tầng, nên chuyển sang
     đây không lấy đi của họ thứ gì.

     Đáng ngại nhất là RASOAT: đó là biên bản rà soát nội bộ, kể tên các
     lỗ hổng đã tìm thấy. Nó nằm ở gói nền suốt từ 7.0. */
  /* ── THÁP CHIẾN LƯỢC VÀ BẢN ĐỒ BỐN TẦNG (9.8) ──
     Đây là bản đồ điều hành của Học viện: chuỗi nhân quả từ việc hôm nay
     lên tới bốn kết quả ở đỉnh, kèm thước và ngưỡng của từng mắt xích.
     Mở nó ra công khai là đưa cho người khác đúng bản thiết kế cách Học
     viện tự lái mình. Hai màn đọc nó đều khoá ở quyền nghề. */
  'CL_THAP', 'CL_TANG', 'CL_MUC', 'CL_KETQUA', 'CL_NHIP', 'CL_NHAT', 'CL_LUAT',
  /* Quy trình tinh gọn, năm giai đoạn, bốn tầng bảo vệ. Ở gói NGHỀ vì
     bảng bốn tầng bảo vệ kể ra CHÍNH XÁC những gì đang giữ kho và những
     chỗ chưa giữ được — đưa ra ngoài là đưa cho người khác bản đồ chỗ hở. */
  'TG_LANG', 'TG_GON', 'TG_GIAIDOAN', 'TG_LOP', 'TG_GON_LUAT',
  /* Luồng cải tiến. Ở gói NGHỀ vì nó chỉ có nghĩa với người CÓ đầu việc
     trong hệ, và vì bảng loại đề xuất nói rõ vai nào quyết chuyện gì —
     tức là một phần sơ đồ quyền quyết định bên trong Học viện. */
  'CT_TRANG', 'CT_LOAI', 'CT_DIEM', 'CT_LUAT',
  'CHANDUNG',                                    /* chan-dung-tc · nghe_chung */
  'MATRAN',                                      /* ma-tran, ma-tran-bang · nghe_chung */
  'MT_BANG', 'MT_BANG_MA', 'MT_BANG_TANG',       /* ma-tran-bang · nghe_chung */
  'MT_BANG_NHOM', 'MT_BANG_LUAT', 'MT_DO',
  'BRAND',                                       /* thuong-hieu · nghe_chung */
  'TAMNHIN100', 'TANG100',                       /* kien-truc-100 · nghe_chung */
  'NHATBAN',                                     /* chuan-nhat · nghe_chung */
  'DANDAT',                                      /* nguoi-dan-dat · pro_consult */
  'CHIPHI',                                      /* chi-phi · fin_view */
  'HEALTH',                                      /* dieu-hanh · dh_toan_he */
  'DUYET',                                       /* kiem-duyet · qt_trang */
  'RASOAT',                                      /* ra-soat · qt_trang */
  /* Danh mục đầu việc của đội ngũ R01–R12. Cùng một lý do với KICHBAN:
     đây là cách Học viện vận hành từ bên trong — đối soát dòng tiền, soát
     quyền truy cập, kiểm hành vi lưu trữ, cổng nghiệm thu — kèm bằng
     chứng phải có để đóng mỗi việc. Chỉ vai được cấp gói nghề mới cần nó,
     và chỉ vai ấy mới nhận được. */
  'CV_MUC',
  /* Chuẩn hợp đồng theo tuyến: nó liệt kê mọi điều khoản Học viện tự
     buộc mình phải có, kèm rủi ro khi thiếu. Đưa ra công khai là đưa cho
     đối thủ bản đồ pháp lý và cho bên tranh chấp danh sách chỗ yếu. */
  'HD_CHUAN', 'HD_RIENG', 'HD_LUAT',
  /* Bảng quy trình toàn hệ: nó vẽ ra cách Học viện vận hành, gồm cả
     luồng giữ tài sản và luồng thanh tra. Đây là bản đồ nội bộ. */
  'QT_LUONG', 'QT_RIENG', 'QT_LUAT',
  /* Tự vận hành: danh mục canh, ngưỡng, và những việc máy tự làm. Đây là
     bản đồ phòng thủ của hệ — mở ra công khai là chỉ cho người muốn dò
     biết đúng ngưỡng nào chưa bị canh. */
  'TD_MUC', 'TD_CANH', 'TD_TRITHUC', 'TD_MAYCHU', 'TD_KHONG', 'TD_THAT',
  /* Gốc NLP và trạng thái bằng chứng: đây là chuẩn nghề — nó nói rõ chỗ
     nào Học viện đang nói chắc hơn bằng chứng cho phép. Ở kho nghề. */
  'NLP_GOC', 'NLP_MUC', 'NLP_CAITIEN', 'NLP_LUAT',
  /* Phạm vi học phí: nói rõ bảng giá này chỉ của GITA365. */
  'HP_PHAM_VI','MOTHUC', 'SACH', 'BANDO_A3', 'POSTER', 'SODO', 'PHACDO',
  'DIEMCHAM', 'NGONTU', 'NGONTU_TANG', 'THAYVI', 'MAUTHOAI', 'PERSONA',
  'CHUAN1000', 'HAILONG', 'TAILIEU', 'AIPOLICY', 'KPI', 'DINHTUYEN', 'AINANGCAP',
  'LACHAN', 'BENCH', 'BENCH_AI',
  'LUAT_TK', 'TAIKHOAN_KPI', 'YEUCAU_MO', 'HANG_TL', 'DAU_MAT', 'QUYTRINH',
  'VANBAN', 'TAICHINH_QT', 'THANHTRA', 'RASOAT_KH', 'BANDO_TUVAN', 'BANDO_COACH',
  'XUAT', 'TINHHUONG', 'KHUNG_T5', 'THANHTOAN',
  'REFERRAL', 'CHANDUNG_KH', 'DOLUONG_KH', 'PHANHANG', 'CHUAN_VIP', 'NHANSU_TT', 'CAYTIEN',
  'HOSO_VIP', 'CHUYENDOI', 'XUONG_SONG', 'NGUON_VAITRO', 'SACH_THAMKHAO', 'PHUONGPHAP', 'VANTAY', 'AICHAM', 'TAILIEU_GOC', 'TAILIEU_DRIVE', 'SOTAY_NHANDIEN', 'CAPDO_VANDUNG', 'VANDUNG', 'QUYTRINH_XL', 'RANG_BUOC',
  'TN7', 'LOI5', 'REF_CHUAN', 'TRUYENTHONG3', 'BANG_GAINS', 'BANG_REF', 'REF16', 'REF_GIAIDOAN',
  'REF_LOI5', 'CHUOI10', 'BANDAP',
  /* Phiếu chỉ dẫn referral bản đầy đủ, bộ làm việc sáu chân dung, và lớp
     tra cứu kho tư liệu. Ở gói NGHỀ vì đây là tài sản chuyên môn: người
     giới thiệu và đội ngũ dùng, khách hàng không thấy. */
  /* Học phí và kịch bản nói chuyện tiền: kho NGHỀ. Gia đình đọc bản mô tả
     chặng, không đọc nhịp thu và không đọc kịch bản xử lý phản đối. */
  'HP_TANG', 'HP_LUAT', 'HP_KICHBAN', 'HP_SOAT',
  'REF_30S', 'REF_GAINS_GITA', 'REF_121', 'REF_CHAM', 'REF_CHAM_MUC', 'REF_TRANGTHAI',
  'REF_BANGIAO', 'REF_CAMON', 'REF_KHONG', 'REF_HOI', 'REF_KPI', 'REF_LOI',
  'CD_BO', 'CD_LUAT',
  'TL_KE', 'TL_DUONG', 'TL_LUAT', 'TL_TRICH', 'TL_BAOQUAN',
  'KHACHLON_NGUON', 'KHACH_TANG', 'NAM_TANG_PHUCVU', 'TAM_NAM_TANG', 'NAC_QUANHE',
  'NAC_TRUNGTHANH', 'TAM_MATXICH', 'HOSO68', 'MUOIHAI_NGUYENTAC', 'NHANTANG',
  'NAM_BUOC_KHIEUNAI', 'GIU124', 'VISAO_ROIDI', 'KHACHLON_CAU', 'LUAT_LAMVIEC'];

const goi = {};
goi.nen  = Object.fromEntries(NEN.map(k => [k, G[k]]).filter(([, v]) => v !== undefined));
goi.nghe = Object.fromEntries(NGHE.map(k => [k, G[k]]).filter(([, v]) => v !== undefined));

/* ══════════ BỐN KHO CHIA THEO BẢN GHI, KHÔNG THEO TÊN KHO ══════════
   Ba kho trên chia được vì cả kho thuộc về một phạm vi. Bốn kho dưới đây
   thì không: mỗi kho phục vụ NHIỀU phạm vi cùng lúc, nên phải cắt theo
   từng bản ghi.

     CHUYEN   600 chuyện, mỗi cấp tài khoản 100. Một phụ huynh đang nhận
              cả 100 chuyện của cấp ADMIN và 100 của cấp TƯ VẤN — chuyện
              nội bộ về cách Học viện được dựng lên.
     SH_HOI   348 câu sát hạch kèm đáp án, chia sáu vai. Một phụ huynh
              đang giữ nguyên ngân hàng câu hỏi sát hạch của Coach, Giáo
              viên và Tư vấn — tức là bộ đề của kỳ thi mà chính họ không
              thi, và người khác thì phải thi thật.
     KH_BAI   30 bài khoá đào tạo nghề. Cộng tác viên có phần của mình
              (15 bài), phần còn lại là của đội ngũ.
     QUA1000  1000 cẩm nang một trang, chia năm tầng. Một nhà Tầng 1 đang
              nhận cả tư liệu Tầng 5 — trái đúng luật anh Quang đặt ra:
              khách hàng chỉ dùng trong giới hạn tầng được cấp phép.

   Chia rồi thì hai nửa mang CÙNG MỘT TÊN KHO ở hai gói khác nhau, và
   G.KHO_TRAI_RA bên src/kho-khoa.js nối chúng lại khi mở gói. Nhờ vậy
   không màn hình nào phải sửa: đội ngũ mở đủ hai gói vẫn thấy đủ 600
   chuyện, gia đình chỉ thấy 300 của mình. */
const CAP_NHA   = ['HS', 'PH', 'CTV'];        /* cấp tài khoản của phía khách hàng */
const VAI_NHA   = ['HS', 'PH', 'CTV'];
goi.nen.CHUYEN  = (G.CHUYEN || []).filter(c => CAP_NHA.includes(c.cap));
goi.nghe.CHUYEN = (G.CHUYEN || []).filter(c => !CAP_NHA.includes(c.cap));
goi.nen.SH_HOI  = (G.SH_HOI || []).filter(h => VAI_NHA.includes(h.vai));
goi.nghe.SH_HOI = (G.SH_HOI || []).filter(h => !VAI_NHA.includes(h.vai));
/* Bài nào có CTV trong danh sách vai thì cộng tác viên phải đọc được, nên
   nó đi gói nền. Đội ngũ mở cả hai gói nên vẫn thấy đủ ba mươi bài. */
goi.nen.KH_BAI  = (G.KH_BAI || []).filter(b => (b.vai || []).includes('CTV'));
goi.nghe.KH_BAI = (G.KH_BAI || []).filter(b => !(b.vai || []).includes('CTV'));
/* ── KỊCH BẢN CHUYÊN MÔN KHÔNG ĐI THEO GÓI TẦNG ──
   Kịch bản từng nằm trong gói tầng, mỗi tầng 200 cái. Nghĩa là một
   phụ huynh Tầng 3 nhận về máy mình 200 kịch bản coaching: nguyên văn
   câu mở của Coach, mục tiêu từng buổi, và cả danh sách điều Coach
   tuyệt đối không được làm.

   Màn "Kịch bản" khoá ở quyền nghe_chung (chỉ R01–R12), nên Ý ĐỊNH của
   sản phẩm đã rõ: đây là tài sản nghề, khách hàng không xem. Nhưng
   khoá màn hình mà vẫn gửi dữ liệu là khoá cửa và đưa chìa: mở công cụ
   nhà phát triển gõ G.KICHBAN là đọc được hết.

   Không màn nào của khách hàng hiển thị kịch bản (màn "Kho" chỉ hiện
   con số, và có số dự phòng ở G.META.soKichBan), nên chuyển sang gói
   NGHỀ không mất gì của khách. Gói tầng giữ nguyên phần vốn là của
   khách: ma trận tầng và bộ test của tầng ấy. */
for (let t = 1; t <= 5; t++)
  goi['tang' + t] = {
    TEST750: (G.TEST750 || []).filter(b => b.tang === 'T' + t),
    /* Cẩm nang một trang đi theo tầng, cùng đường với bộ test và ma trận.
       Trước bản 9.8 nó nằm ở gói nền, nên một nhà Tầng 1 nhận đủ 1000 tờ
       của cả năm tầng — 203 KB, và là tư liệu của những tầng họ chưa mua. */
    QUA1000: (G.QUA1000 || []).filter(q => q.tang === 'T' + t),
    ['MATRAN_T' + t]: G['MATRAN_T' + t] || []
  };

/* ─── Gói của bốn tuyến chuyên môn ───
   ENGWIN365 · MATH365 · SAT365 · HSA365 dùng chung năm tầng của GITA365
   nhưng có kho riêng và băng riêng, nên mỗi tuyến có gói cấp phép riêng:
   bán MATH365 mà không mở SAT365.

   Quy ước đặt tên kho của một tuyến: tiền tố là mã tuyến, ví dụ
   MATH365_BANG · MATH365_KICHBAN · MATH365_TANG · MATH365_DO. Đặt tên
   như thế thì chỗ này không phải liệt kê tay từng kho — thêm một tệp
   kho-goc/data.math365.js là gói tự có nội dung.

   CHỈ dựng gói khi tuyến ĐÃ CÓ nội dung. Dựng gói rỗng thì bộ khoá có
   thêm một khoá mở ra một cái hộp không có gì, và người cấp giấy phép
   tưởng tuyến ấy đã sẵn sàng. */
{
  global.window = global.window || {};
  require(path.join(GOC, 'src', 'data.tuyen.js'));
  const T = global.window.G;
  /* data.tuyen.js gán vào cùng một window.G nên G ở trên đã có sẵn các
     hàm tên gói; lấy lại cho rõ ý là đang dùng bảng tuyến. */
  const boQua = [];
  for (const t of T.TUYEN) {
    if (t.goiCu) continue;                       /* GITA365 đã dựng ở trên */
    const tienTo = t.ma + '_';
    const kho = Object.keys(G).filter(k => k.indexOf(tienTo) === 0);
    if (!kho.length) { boQua.push(t.ma); continue; }

    /* Kho chung của tuyến (băng, chuẩn đo, luật) đi vào gói nghề; nội
       dung theo tầng tách ra đúng tầng của nó. */
    goi[T.goiNghe(t.ma)] = Object.fromEntries(
      kho.filter(k => !/_T[1-5]$/.test(k)).map(k => [k, G[k]]));
    for (let n = 1; n <= T.TUYEN_SO_TANG; n++) {
      const rieng = kho.filter(k => k.endsWith('_T' + n));
      if (!rieng.length) continue;
      goi[T.goiTang(t.ma, n)] = Object.fromEntries(rieng.map(k => [k, G[k]]));
    }
    if (t.trangThai !== 'chay')
      console.log('  ⚠ ' + t.ma + ' có nội dung nhưng trangThai vẫn là "chuan" — ' +
        'đổi sang "chay" trong src/data.tuyen.js và server/GITA_CapPhep.gs thì khách mới mở được.');
  }
  if (boQua.length)
    console.log('  Chưa dựng gói cho: ' + boQua.join(' ') + ' — chưa có kho nào mang tiền tố ấy.\n');
}

/* ─── Mã hoá ───
   Khoá được GIỮ NGUYÊN giữa các lần mã hoá lại. Đổi khoá là mọi giấy
   phép đã cấp cho khách và cho đội ngũ đều hết dùng được ngay lập tức.
   Muốn đổi khoá thật (khi nghi rò rỉ) thì chạy:  node tools/ma-hoa-kho.js --doi-khoa
   rồi cấp lại giấy phép cho toàn bộ người đang dùng. */
fs.mkdirSync(RA, { recursive: true });
const doiKhoa = process.argv.includes('--doi-khoa');
let khoaCu = {};
if (!doiKhoa) {
  try { khoaCu = JSON.parse(fs.readFileSync(path.join(RA, 'khoa.json'), 'utf8')).khoa || {}; }
  catch { khoaCu = {}; }
}
if (doiKhoa) console.log('  ⚠ ĐỔI KHOÁ: mọi giấy phép đã cấp sẽ hết hiệu lực. Phải cấp lại toàn bộ.\n');
const khoa = {};
let tong = 0;
let giu = 0;

/* ── NÉN TRƯỚC, MÃ HOÁ SAU ──
   Thứ tự này không đảo được. Nén trước thì nén được thật vì JSON lặp rất
   nhiều: đo trên kho thật, 13,6 MB xuống 2,07 MB, riêng các gói tầng giảm
   14 đến 31 lần vì ma trận và bộ test lặp cấu trúc gần như hoàn toàn. Nén
   sau khi mã hoá thì không giảm nổi một phần trăm — bản đã mã hoá là chuỗi
   ngẫu nhiên, mà thứ ngẫu nhiên thì không nén được. Đó là định nghĩa.

   Máy khách nhận ra gói đã nén bằng hai byte đầu (0x1F 0x8B) sau khi giải
   mã, nên KHÔNG phải đổi định dạng phong bì và gói cũ vẫn mở được. */
const zlib = require('zlib');

for (const [ten, du] of Object.entries(goi)) {
  const chu = Buffer.from(JSON.stringify(du), 'utf8');
  const ro = zlib.gzipSync(chu, { level: 9 });
  const k = khoaCu[ten] ? Buffer.from(khoaCu[ten], 'base64') : crypto.randomBytes(32);
  if (khoaCu[ten] && k.length === 32) giu++; else if (khoaCu[ten]) throw new Error('Khoá cũ của gói ' + ten + ' không đúng 32 byte.');
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', k, iv);
  const ma = Buffer.concat([c.update(ro), c.final()]);
  const tag = c.getAuthTag();
  /* iv (12) + tag (16) + dữ liệu */
  fs.writeFileSync(path.join(RA, ten + '.enc'), Buffer.concat([iv, tag, ma]));
  khoa[ten] = k.toString('base64');
  tong += ma.length;
  console.log('  ' + ten.padEnd(8) + ' ' + String(Math.round(chu.length / 1024)).padStart(5) + ' KB → ' +
    String(Math.round(ma.length / 1024)).padStart(5) + ' KB nén rồi mã hoá  (giảm ' +
    (chu.length / ma.length).toFixed(1) + 'x)');
}

fs.writeFileSync(path.join(RA, 'khoa.json'), JSON.stringify({
  chuY: 'BỘ KHOÁ MẬT — nạp vào máy chủ cấp phép, không bao giờ đưa lên kho mã.',
  taoLuc: new Date().toISOString(),
  thuatToan: 'AES-256-GCM',
  khoa
}, null, 2));

/* ─── Gói mẫu công khai: đủ để xem giao diện, không lộ kho ───
   Chỉ những phần GITA 365 vẫn nói ra ngoài khi giới thiệu: câu chuyện
   chuyển hoá, lộ trình năm tầng, kiến trúc trăm năm, chuỗi trải nghiệm,
   cách ghi nhận và nhận diện thương hiệu. Phần nghề — 1.000 kịch bản,
   220 phác đồ, 42 mô thức, ngôn từ dẫn dắt, tình huống, văn bản, tài
   chính, quản trị — KHÔNG nằm ở đây. */
const MO_RA = [
  /* Phần GITA vẫn nói ra ngoài khi giới thiệu */
  'CHUYENDICH', 'LOTRINH', 'TIERS', 'TAMNHIN100', 'TANG100', 'WOW',
  'NHATBAN', 'LEVELS', 'DIEM', 'HUYHIEU', 'QUA_DANG', 'BRAND', 'BAIHOC',
  /* Mở thêm ở v7.6 — mô hình công khai và nhịp sống nhà mình.
     Lý do: khoá những phần này làm gia đình không dùng được ứng dụng
     hằng ngày, trong khi chúng đã nằm trong tài liệu giới thiệu và
     trang web của Học viện. Phần NGHỀ vẫn khoá nguyên: 1.000 kịch bản
     đầy đủ, 220 phác đồ, 42 mô thức, ngôn từ dẫn dắt, 250 tình huống,
     ma trận, xương sống phương pháp, hệ VIP và Cây Tiền, toàn bộ quản
     trị và tài chính. */
  'VANHANH',      /* 5 khoang · 9 vai — mô hình lõi, đã công bố */
  'CHANDUNG',     /* mười chân dung thành công */
  'CUHICH',       /* cú hích lớn trong nhà */
  'NGHILE',       /* thói quen và nghi lễ gia đình */
  'SUKIEN',       /* sự kiện và lửa trại */
  'KETNOI',       /* kết nối hệ sinh thái */
  'LIENKET',      /* liên kết giữa các phần */
  'DAISU',        /* chương trình đại sứ — điều kiện công khai */
  'HOAHONG',      /* bốn cấp và trần hoa hồng 10% — điều khoản thương mại công khai */
  'NGONTU_RANH',  /* sáu ranh giới — luật an toàn, càng nhiều người biết càng tốt */
  'QUA',          /* cách ghi nhận và trao quà */
  'DANDAT',       /* hành trình người dẫn dắt — phần giới thiệu nghề */
  /* Đường vào sáu bước: đây CHÍNH LÀ phần giới thiệu. Một gia đình
     đang cân nhắc phải xem được con đường trước khi quyết định bước
     vào — khoá nó lại là khoá đúng cái cửa mình đang mời người ta qua.
     Phần học phí (HP_*) thì ngược lại: vẫn khoá trong kho nghề. */
  'DV_BUOC', 'DV_CHAN', 'DV_HOI',
  /* Bản giới thiệu Học viện. Cùng một lý do với DV_* và mạnh hơn: màn
     "GITA 365 là gì" mở cho MỌI người (capMo:'chung') — đó là cửa trước.
     Nhưng kho GT_* lại chỉ nằm ở gói NỀN, nên trên bản giới thiệu một tệp
     và trên trang web công khai, màn ấy dựng ra đúng mười hai cái tiêu đề
     mục và không có chữ nào bên trong. Người đầu tiên nhìn thấy GITA365
     nhìn thấy một cái khung rỗng.

     Nội dung này vốn đã là thứ Học viện nói ra ngoài: sứ mệnh, tầm nhìn,
     mục tiêu có mốc, năm tầng, văn hoá, cách đồng hành, và cả sáu điều
     Học viện KHÔNG làm. Khoá nó lại là khoá đúng cái cửa mình đang mời
     người ta bước qua.

     Phần nghề vẫn khoá nguyên: 1.000 kịch bản, 220 phác đồ, 42 mô thức,
     250 tình huống, ma trận, và toàn bộ HP_* học phí. */
  'GT_MOT_CAU', 'GT_VISAO', 'GT_HUA', 'GT_KHONG', 'GT_CHANG', 'GT_TANG',
  'GT_VAI', 'GT_HOI', 'GT_SO', 'GT_BUOC', 'GT_MUCTIEU', 'GT_MUCTIEU_RANH',
  'GT_DONGHANH',
  /* Hành trình 12 chặng: con số "12 chặng" đã nằm ngay trong bảng số liệu
     giới thiệu, và một gia đình đang cân nhắc cần nhìn thấy con đường
     trước khi quyết bước vào. Giấu chính tấm bản đồ mình đang mời người
     ta đi thì lời mời không có nghĩa gì. */
  'HANHTRINH12', 'TRU_GITA',
  'KENH_DS', 'KENH_CHANG', 'KENH_LUAT',
  /* Việc của hôm nay, theo từng cổng: 4 việc cho phụ huynh, 3 cho học
     viên, 3 cho cộng tác viên, và của cả đội ngũ. Thiếu nó ở gói công
     khai thì màn "Nhiệm vụ hôm nay" — màn dẫn hành động nặng nhất của
     khách hàng — ném lỗi ngay trên bản một tệp gửi cho khách.

     Đây không phải tài sản nghề: nó là danh sách việc mà chính gia đình
     phải làm, viết bằng ngôn ngữ gia đình. Giấu nó đi là giấu đúng phần
     mình đang bảo người ta làm. */
  'TODAY',
  /* Bốn trạng thái việc, luật chấm KPI, bốn hạng tháng, và toàn bộ phần
     KPI của gia đình. Đây là LUẬT CHƠI, không phải bí quyết: một người
     đang cân nhắc vào làm, và một gia đình đang cân nhắc tham gia, đều
     phải đọc được cách mình sẽ bị đo TRƯỚC KHI quyết. Giấu cách đo rồi
     mới đo là cách chắc chắn để không ai tin con số.

     Danh mục đầu việc CV_MUC thì khác — nó xuống dưới ở dạng rút. */
  'CV_TRANG', 'CV_LUAT', 'CV_HANG', 'CV_KH_NGAY', 'CV_KH_TANG', 'CV_KPI_CAP', 'CV_KPI_CAP_LUAT',
  /* Chuẩn thời hạn và thang thưởng phạt. Máy chấm công việc đọc hạn giờ
     từ TG_NHIEMVU; thiếu nó thì nhipCua() trả undefined và MỌI việc rơi
     về hạn mặc định 24 giờ — một việc tháng và một việc ngày cùng đến
     hạn vào mai. Bảng công việc trên bản xem thử khi ấy chạy được nhưng
     chạy sai, và sai lặng lẽ.

     Cùng lý do với CV_LUAT: đây là cách người ta bị đo, phải đọc được
     trước khi bị đo. */
  'TG_NHIEMVU', 'TG_THUONG', 'TG_PHAT',
  /* Chuẩn lời dễ hiểu: ai cũng phải đọc được cách Học viện tự buộc mình viết. */
  'DEHIEU_LUAT', 'DEHIEU_THAY', 'DEHIEU_TRANG', 'DEHIEU_NGUONG'
  /* SOAT_* KHÔNG nằm ở đây. Chuẩn soát liệt kê tên mọi kho nội bộ, trường
     bắt buộc của từng kho và số bản ghi phải có — đưa vào gói mẫu công khai
     là vẽ sẵn bản đồ kho cho người chưa được cấp phép. Nó ở gói NỀN. */
];
/* Sáu câu trải đều các miền, không phải sáu câu đầu: sáu câu đầu của
   một bài ba mươi câu thường rơi hết vào miền thứ nhất, nên bản xem thử
   chấm ra một miền có điểm và bốn miền trống. Lấy mỗi miền một câu
   trước, còn chỗ thì bù thêm theo thứ tự gốc. */
function cauMau(b) {
  const ra = [], da = new Set();
  for (const m of b.mien) {
    const c = b.cau.find(x => x.mien === m);
    if (c) { ra.push(c); da.add(c.id); }
  }
  for (const c of b.cau) {
    if (ra.length >= Math.max(6, b.mien.length)) break;
    if (!da.has(c.id)) { ra.push(c); da.add(c.id); }
  }
  return b.cau.filter(c => da.has(c.id));   /* giữ nguyên thứ tự gốc */
}


/* Rút một đầu việc xuống bản khung cho gói công khai: giữ mã · vị trí ·
   nhịp · điểm · tên · bước luân chuyển, cắt phần dạy nghề. */
function rutDauViec(m) {
  const r = { ma: m.ma, vai: m.vai, nhip: m.nhip, diem: m.diem, ten: m.ten,
    mo: (m.mo || '').slice(0, 80) + '… [cần cấp phép]',
    xong: '[Cách đóng việc mở khi được cấp phép]' };
  if (m.chuyen) r.chuyen = m.chuyen;
  if (m.lienDoi) r.lienDoi = '[Điều khoản liên đới mở khi được cấp phép]';
  return r;
}

const mau = {
  ...Object.fromEntries(MO_RA.map(k => [k, G[k]]).filter(([, v]) => v !== undefined)),
  KICHBAN: (G.KICHBAN || []).filter(k => k.tang === 'T1').slice(0, 8)
    .map(k => ({ ...k, mo: (k.mo || '').slice(0, 90) + '… [cần cấp phép]', chot: undefined, khong: undefined })),
  PHACDO: (G.PHACDO || []).slice(0, 6)
    .map(p => ({ ma: p.ma, nhom: p.nhom, nhomTen: p.nhomTen, ten: p.ten })),
  MOTHUC: (G.MOTHUC || []).slice(0, 4)
    .map(m => ({ id: m.id, title: m.title, summary: (m.summary || '').slice(0, 120) + '… [cần cấp phép]' })),
  /* Mười điểm về đích: mở tên và ý nghĩa, mở đủ tiêu chí của điểm mốc
     đầu tiên. Chín mốc còn lại chỉ đếm số tiêu chí, không mở nội dung. */
  KPI100: G.KPI100 && {
    ...G.KPI100,
    diem: G.KPI100.diem.map((d, i) => ({
      ...d, tc: i === 0 ? d.tc : d.tc.map(() => '[Tiêu chí mở khi được cấp phép]')
    }))
  },
  /* CẢ NĂM bài của tầng một, mỗi bài rút còn sáu câu.
     Trước đây chỗ này chỉ mở MỘT bài. Hậu quả: đường vào sáu bước hứa ở
     bước ba là "làm bài test đánh giá" và màn test tự giới thiệu là "năm
     nhóm bài cho mỗi tầng", nhưng người mở bản xem thử chỉ thấy đúng một
     thẻ. Lời hứa và màn hình nói khác nhau ngay ở bước người lạ gặp đầu
     tiên — và người xem kết luận là phần năm bài không tồn tại.

     Mở tên, miền đo, mức phân nhóm và sáu câu của mỗi bài: đủ để thấy
     hình dạng cả năm bài và chấm thử được. Ba mươi câu trên bảy trăm
     năm mươi là 4% — kho câu hỏi vẫn nằm trong gói tầng đã mã hoá.
     soCauThat đi kèm để màn hình nói đúng đây là bản rút, không để
     người xem tưởng bài thật chỉ có sáu câu. */
  /* Danh mục đầu việc: mở KHUNG, khoá RUỘT.
     Mở mã · vị trí · nhịp · điểm · tên việc · bước luân chuyển, để ba màn
     công việc dựng ra được thật — bảng bốn cột chạy, danh mục tích chọn
     được, KPI chấm được. Khoá phần `mo` (vì sao việc này trước), `xong`
     (đóng bằng bằng chứng gì) và `lienDoi`: đó mới là chỗ Học viện dạy
     người mới CÁCH LÀM VIỆC, và là thứ một đối thủ cần.

     Cùng cách đã dùng cho KICHBAN: khung thì mở, lời thì cắt. Vì sao
     phải mở khung: thiếu CV_MUC thì cả ba màn chỉ dựng ra một thẻ "chưa
     mở được" 1.4 nghìn ký tự, và người mở bản xem thử kết luận đúng như
     anh Quang đã kết luận — không nhìn thấy bảng đầu việc nào cả. */
  CV_MUC: (G.CV_MUC || []).map(rutDauViec),
  CV_MUC_DS: (G.CV_MUC_DS || []).map(rutDauViec),
  TEST750: (G.TEST750 || []).filter(b => b.tang === 'T1')
    .map(b => ({ ...b, mau: true, soCauThat: b.cau.length, cau: cauMau(b) }))
};
fs.writeFileSync(path.join(RA, 'mau.json'), JSON.stringify(mau));

console.log('\n  Tổng ' + Math.round(tong / 1024) + ' KB đã mã hoá · ' +
  Object.keys(khoa).length + ' gói · khoá ghi vào kho/khoa.json');
console.log('  Giữ nguyên ' + giu + ' khoá cũ' + (giu ? ' — giấy phép đã cấp vẫn dùng được.' : '.'));
console.log('  ⚠ kho/khoa.json và kho-goc/ đều nằm trong .gitignore — kiểm lại trước khi đẩy.');
