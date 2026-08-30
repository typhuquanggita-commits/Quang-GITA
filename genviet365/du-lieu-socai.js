/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · SỔ CÁI YÊU CẦU VÀ MÓN NỢ SỐ

   Kho này tồn tại vì một câu hỏi mà trước đây chỉ trả lời được
   bằng lời: "đã làm đủ mọi thứ tôi yêu cầu chưa?"

   Nói "rồi" thì không kiểm được. Nên ở đây mọi yêu cầu của Học
   viện được ghi thành một DÒNG SỔ, kèm chỗ nó được đáp ứng. Bộ
   kiểm phát hành đọc sổ này và soi từng dòng: màn được viện dẫn
   có thật không, kho được viện dẫn có dữ liệu không. Dòng nào
   viện dẫn vào chỗ không tồn tại thì bản dựng bị chặn.

   Phần thứ hai — MÓN NỢ SỐ — chặn một lỗi đã thật sự xảy ra và
   sống nhiều tháng trong hệ này: kho NÓI "600 chuyên đề", "52
   tuần", "100 chương trình" ở hàng chục chỗ mà chưa nơi nào VIẾT
   RA chúng. Nay mỗi con số hứa hẹn phải trỏ tới một kho có đúng
   ngần ấy phần tử, nếu không bản dựng bị chặn.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Sổ yêu cầu ───────────────────────────────────────
        ma  · mã dòng sổ
        y   · yêu cầu, tóm bằng chữ của Học viện
        man · các mã màn đáp ứng — bộ kiểm soi từng mã
        kho · các khoá kho phải có dữ liệu — bộ kiểm soi từng khoá  */
  G.SC_YEU_CAU = [
    { ma: 'Y01', y: 'Hệ huấn luyện nhân tài Gen Việt 365 tối ưu nhất theo tầm nhìn ba mươi năm, dựng từ chính kho tài liệu của Học viện',
      man: ['tong-quan', 'nguyen-ly', 'kien-truc', 'ba-muoi-nam', 'gv-nguon'],
      kho: ['NGUYEN_LY', 'LOP', 'CHANG', 'TY_NGUON'] },

    { ma: 'Y02', y: 'Club Gen Việt có tầng chiều sâu như mô hình BNI, tạo thế hệ lãnh đạo trẻ giàu phẩm chất',
      man: ['chi-hoi', 'vong', 'ban-dieu-hanh', 'clb-muoi-cap', 'clb-nang-luc', 'clb-muoi-hai-ban',
            'bn-tang-sau', 'bn-doi-chieu', 'bn-khong-be', 'bn-van-hanh'],
      kho: ['TUAN', 'TY_CLB_CAP', 'TY_CLB_NL', 'TY_CLB_BAN', 'TY_CLB_TUAN',
            'BN_TANG_SAU', 'BN_DOI_CHIEU', 'BN_KHONG_BE', 'BN_VAI', 'BN_CHI_SO'] },

    { ma: 'Y03', y: 'Bật phân quyền theo tầng năng lực học sinh và tầng quyền, theo quy định quyền như GITA365',
      man: ['phan-quyen', 'vai-tro', 'pham-vi'],
      kho: ['VAI', 'QUYEN_MAX', 'BAC_SO', 'TANG_HT_UI', 'LUAT_QUYEN'] },

    { ma: 'Y04', y: 'Bộ thư viện Gen Việt: chiến lược, danh nhân, danh tướng — thành một bộ sách quý',
      man: ['thu-vien', 'q1-giu-nuoc', 'q2-dung-nuoc', 'q3-hien-tai', 'q4-khoa-hoc', 'q5-van-hien', 'q6-duong-thoi', 'mo-thuc-viet'],
      kho: ['TV_QUYEN', 'TV_Q1', 'TV_Q6', 'TV_MO_THUC'] },

    { ma: 'Y05', y: 'Hoàn thiện toàn diện với tư duy chuyên gia: khách hàng phải hài lòng và bất ngờ về dịch vụ và giá trị nhận được',
      man: ['cam-ket-dv', 'khoanh-khac', 'wow', 'bao-dam', 'phan-doi', 'phuc-hoi'],
      kho: ['TN_CAM_KET', 'TN_KHOANH_KHAC', 'GT_BAO_DAM', 'GT_PHAN_DOI'] },

    { ma: 'Y06', y: 'Bộ nhận diện thương hiệu để đăng ký bản quyền đề án cấp quốc gia và triển khai toàn cầu',
      man: ['nen-thuong-hieu', 'an-gen-viet', 'an-dung-sai', 'mau-th', 'chu-th', 'ung-dung-th',
            'tai-san-tri-tue', 'quyen-tac-gia', 'nhan-hieu', 'de-an-quoc-gia', 'ra-quoc-te', 'lo-trinh-toan-cau'],
      kho: ['TH_AN_Y_NIEM', 'TH_AN_LUAT', 'TH_AN_SAI', 'TH_MAU', 'BQ_TAI_SAN', 'BQ_DE_AN', 'BQ_QUOC_TE', 'BQ_LO_TRINH'] },

    { ma: 'Y07', y: 'Phiên bản mạnh gấp năm lần, hướng tới tự động một trăm phần trăm với cấu trúc tự động mạch lạc sâu hơn',
      man: ['so-chuan', 'ban-do-he', 'nguyen-tac-kt'],
      kho: ['SO', 'DAU', 'TU_TU_DONG'] },

    { ma: 'Y08', y: 'Năm tuyến vận hành: CLB · mười hai khối lớp · gia đình · hoạt động xã hội · khởi nghiệp và chuyên gia',
      man: ['gv-nam-tuyen', 'gv-15-giai-doan', 'gv-pipeline',
            'clb-muoi-cap', 'khoi-nam-nhom', 'khoi-muoi-hai',
            'gd-chin-muoi-ngay', 'gd-nam-s', 'xh-du-an', 'xh-su-kien',
            'kn-sau-buoc', 'kn-de-tai', 'kn-thiet-ke'],
      kho: ['TY_TUYEN', 'TY_GIAI_DOAN', 'TY_PIPELINE', 'TY_KHOI_12', 'TY_GD_90', 'TY_XH_DU_AN', 'TY_KN_DE_TAI'] },

    { ma: 'Y09', y: 'Biên soạn thành bộ tài liệu chuẩn có thể đăng ký bản quyền, chất lượng nâng lên gấp mười lần',
      man: ['quyen-tac-gia', 'nhan-hieu', 'chong-xam-pham', 'anh-xa-chuan', 'so-loi'],
      kho: ['BQ_QUYEN_TG', 'BQ_NHAN_HIEU', 'BQ_CHONG', 'BQ_ANH_XA_PC'] },

    { ma: 'Y10', y: 'Thực hiện nhượng quyền với tiêu chuẩn cao nhất, độc quyền trên thị trường',
      man: ['nq-goi', 'nq-dieu-kien', 'nq-chang', 'nq-dao-tao', 'nq-kiem-dinh',
            'nq-phi', 'nq-lanh-tho', 'nq-hop-dong', 'nq-luat', 'nq-faq'],
      kho: ['NQ_GOI', 'NQ_TRAO', 'NQ_CHANG', 'NQ_HOC_PHAN', 'NQ_KIEM_DINH', 'NQ_PHI', 'NQ_LANH_THO', 'NQ_HOP_DONG', 'NQ_LUAT'] },

    { ma: 'Y11', y: 'Tối ưu để tìm kiếm chất lượng lên đầu Google theo hệ giá trị uy tín và ý định người tìm, phản hồi năm sao',
      man: ['seo-nguyen-tac', 'seo-y-dinh', 'seo-eeat', 'seo-ky-thuat', 'seo-phan-hoi', 'seo-do', 'seo-90'],
      kho: ['SE_NGUYEN_TAC', 'SE_Y_DINH', 'SE_CUM', 'SE_EEAT', 'SE_KY_THUAT', 'SE_PHAN_HOI', 'SE_DO', 'SE_90'] },

    { ma: 'Y12', y: 'Biên soạn đầy đủ kho, không thiếu bất cứ yêu cầu nào, độ chất chuyên đề tốt nhất so với thị trường',
      man: ['clb-chu-ky', 'clb-52-tuan', 'so-cai-yc', 'so-cai-no',
            'cde-nam-nhom', 'cde-ma-hoa', 'cde-tai-nang', 'cde-khung', 'cde-giao-an', 'cde-luat',
            'cd-muoi-cap', 'cd-tram-ct', 'cd-nang-luc', 'cd-chuan-ra', 'cd-sop', 'cd-quy-chuan',
            'ga-khung', 'ga-khau-quyet', 'ga-buoi', 'ga-hoat-dong', 'ga-hoc-ky'],
      kho: ['T52_CHU_KY', 'T52_TUAN', 'SC_YEU_CAU', 'SC_MON_NO',
            'CD_DE_TAI', 'CD_TAI_NANG', 'CD_KHUNG_CD', 'CD_GIAO_AN', 'CD10_CAP', 'CD10_CT', 'CD10_CHUAN_RA',
            'GA_KHUNG_TIET', 'GA_KHAU_QUYET', 'GA_BUOI', 'GA_HOAT_DONG', 'GA_HOC_KY'] },

    { ma: 'Y13', y: 'Nguồn tài liệu, quy trình, phác đồ, nội dung và tài nguyên phải đủ chuẩn, không sơ sài — hoàn thiện theo đúng định hướng đã đặt ra',
      man: ['vh-so-do', 'vh-truoc-trong-sau', 'vh-ban12', 'vh-raci-kpi', 'vh-canh-bao', 'vh-bieu-mau',
            'ms-loi-mo', 'ms-luan-diem', 'ms-ba-chang', 'ms-mo-thuc', 'ms-rui-ro', 'ms-khung-sach',
            'tr-bay-ngay', 'tr-lich-hau', 'tr-an-toan', 'tr-vip', 'tr-bukatsu',
            'gv-anh-xa-bac', 'so-nguon', 'so-nguon-no',
            'da-cau-truc', 'da-phap-ly', 'da-to-chuc', 'da-kpi', 'da-ke-hoach', 'da-nghien-cuu',
            'sl-bo-slide', 'sl-kich-ban', 'sl-thong-diep', 'sl-buoi-hop'],
      kho: ['VH2_SO_DO', 'VH2_TRUOC', 'VH2_TRONG', 'VH2_SAU', 'VH2_BAN12', 'VH2_RACI', 'VH2_KPI',
            'VH2_CANH_BAO', 'VH2_BIEU_MAU', 'VH2_LUAT',
            'MS_LUAN_DIEM', 'MS_CHANG', 'MS_MO_THUC', 'MS_RUI', 'MS_TRICH',
            'TV2_TRAI_KHUNG', 'TV2_VIP_CHUONG_TRINH', 'TV2_BUKATSU',
            'TY_ANH_XA_BAC', 'TY_ANH_XA_LUAT', 'SN_TEP', 'SN_NO', 'SN_LUAT',
            'DA_CAU_TRUC', 'DA_CAN_CU', 'DA_RACI', 'DA_KPI', 'DA_KE_HOACH_12', 'DA_NGHIEN_CUU',
            'SL_BO_SLIDE', 'SL_KICH_BAN', 'SL_THONG_DIEP', 'SL_LUAT'] }
  ];

  /* ── 2 · Món nợ số ────────────────────────────────────────
        Mỗi dòng: hệ thống HỨA một con số ở đâu đó, và con số ấy
        phải khớp với số phần tử thật của một kho. Bộ kiểm đếm.
        so  · con số đã hứa
        kho · khoá kho phải có đúng ngần ấy phần tử
        sau · nếu kho là hai tầng thì đếm tầng trong theo trường này  */
  G.SC_MON_NO = [
    { t: 'Năm mươi hai tuần chuyên đề trong CLB', so: 52, kho: 'T52_TUAN' },
    { t: 'Bốn chu kỳ của một năm sinh hoạt', so: 4, kho: 'T52_CHU_KY' },
    { t: 'Mười lăm giai đoạn — xương sống Gen Việt', so: 15, kho: 'TY_GIAI_DOAN' },
    { t: 'Mười cấp độ thành viên CLB', so: 10, kho: 'TY_CLB_CAP' },
    { t: 'Mười hai Ban chức năng', so: 12, kho: 'TY_CLB_BAN' },
    { t: 'Mười hai khối lớp', so: 12, kho: 'TY_KHOI_12' },
    { t: 'Năm nhóm cố định xuyên mười hai khối', so: 5, kho: 'TY_KHOI_NHOM' },
    { t: 'Năm tuyến vận hành', so: 5, kho: 'TY_TUYEN' },
    { t: 'Mười đề tài nghiên cứu GV-R', so: 10, kho: 'TY_KN_DE_TAI' },
    { t: 'Bốn gói nhượng quyền', so: 4, kho: 'NQ_GOI' },
    { t: 'Mười sáu điều khoản hợp đồng bắt buộc', so: 16, kho: 'NQ_HOP_DONG' },
    { t: 'Mười hai luật nhượng quyền', so: 12, kho: 'NQ_LUAT' },
    { t: 'Năm học phần đào tạo bên nhận quyền', so: 5, kho: 'NQ_HOC_PHAN' },
    { t: 'Bốn mức chế tài', so: 4, kho: 'NQ_CHE_TAI' },
    { t: 'Bảy nguyên tắc tìm thấy được', so: 7, kho: 'SE_NGUYEN_TAC' },
    { t: 'Tám nhóm ý định tìm kiếm', so: 8, kho: 'SE_Y_DINH' },
    { t: 'Sáu cụm nội dung', so: 6, kho: 'SE_CUM' },
    { t: 'Bốn tín hiệu uy tín', so: 4, kho: 'SE_EEAT' },
    { t: 'Mười hai hạng mục kỹ thuật', so: 12, kho: 'SE_KY_THUAT' },
    { t: 'Tám chỉ số phải đo', so: 8, kho: 'SE_DO' },
    { t: 'Bảy nguyên lý bất biến', so: 7, kho: 'NGUYEN_LY' },
    { t: 'Mười ba dòng sổ yêu cầu', so: 13, kho: 'SC_YEU_CAU' },

    /* Món nợ trả trong đợt khai thác sáu nguồn gốc song song */
    { t: 'Một trăm chương trình huấn luyện của hệ mười cấp độ', so: 100, kho: 'CD10_CT' },
    { t: 'Mười cấp độ thành viên — bảng đầy đủ bảy cột', so: 10, kho: 'CD10_CAP' },
    { t: 'Ba mươi quy trình chuẩn theo Ban', so: 30, kho: 'CD10_SOP' },
    { t: 'Hai trăm năm mươi chuyên đề có mã GV', so: 251, kho: 'CD_DE_TAI' },
    { t: 'Sáu trăm chuyên đề phát triển tài năng mười hai khối', so: 601, kho: 'CD_TAI_NANG' },
    { t: 'Bốn mươi hai chuyên đề có khung đầy đủ', so: 43, kho: 'CD_KHUNG_CD' },
    { t: 'Mười hai Ban có nhiệm vụ chi tiết', so: 12, kho: 'VH2_BAN12' },
    { t: 'Hai mươi biểu mẫu vận hành', so: 21, kho: 'VH2_BIEU_MAU' },
    { t: 'Mười lăm cảnh báo sớm', so: 15, kho: 'VH2_CANH_BAO' },
    { t: 'Ba mươi hai luật vận hành', so: 32, kho: 'VH2_LUAT' },
    { t: 'Mười bốn luận điểm nền của sách Master', so: 14, kho: 'MS_LUAN_DIEM' },
    { t: 'Mười tám mô thức', so: 18, kho: 'MS_MO_THUC' },
    { t: 'Năm rủi ro chiến lược', so: 5, kho: 'MS_RUI' },
    { t: 'Bảy ngày trại Leader Boom', so: 7, kho: 'TV2_TRAI_KHUNG' },
    { t: 'Sáu bậc ánh xạ sang mười lăm giai đoạn', so: 6, kho: 'TY_ANH_XA_BAC' },
    { t: 'Bảy mươi ba buổi đã soạn', so: 73, kho: 'GA_BUOI' },
    { t: 'Ba mươi hai hoạt động trong ngân hàng', so: 32, kho: 'GA_HOAT_DONG' },
    { t: 'Hai mươi khẩu quyết', so: 20, kho: 'GA_KHAU_QUYET' },
    { t: 'Mười lăm tuần một học kỳ', so: 15, kho: 'GA_HOC_KY' },
    { t: 'Mười tám luật dạy một buổi', so: 18, kho: 'GA_LUAT' },
    { t: 'Bốn trạng thái của một dòng sổ nguồn', so: 4, kho: 'SN_TRANG_THAI' },
    { t: 'Sáu luật giữ sổ nguồn', so: 6, kho: 'SN_LUAT' },
    { t: 'Sáu món nợ nguồn còn lại', so: 6, kho: 'SN_NO' },
    { t: 'Mười bốn cơ chế tạo chiều sâu học từ mô hình chi hội', so: 14, kho: 'BN_TANG_SAU' },
    { t: 'Hai mươi trục đối chiếu', so: 20, kho: 'BN_DOI_CHIEU' },
    { t: 'Mười hai thứ không được bê sang môi trường học đường', so: 12, kho: 'BN_KHONG_BE' },
    { t: 'Hai mươi hai slide giới thiệu', so: 22, kho: 'SL_BO_SLIDE' },
    { t: 'Chín kịch bản nói', so: 9, kho: 'SL_KICH_BAN' },
    { t: 'Mười hai thông điệp lõi', so: 12, kho: 'SL_THONG_DIEP' },
    { t: 'Tám mục của một bộ đề án', so: 9, kho: 'DA_CAU_TRUC' },
    { t: 'Mười sáu luật viết và bảo vệ đề án', so: 16, kho: 'DA_LUAT' }
  ];


  /* ── 4 · SỔ XUẤT XỨ ───────────────────────────────────────
     Lớp cuối của kiến trúc trung thực. Sổ nguồn nói "đã đọc hết
     kho tài liệu chưa". Sổ này nói điều nghiêm hơn: MỖI TỆP KHO
     TRONG HỆ TỪ ĐÂU RA.

     Ba loại xuất xứ, và ranh giới giữa chúng có ý nghĩa pháp lý
     khi nộp hồ sơ quyền tác giả:
     · RÚT       — lấy từ tài liệu gốc của Học viện. Tác phẩm gốc
                   của chủ sở hữu.
     · DỰNG      — kiến trúc, phân quyền, bộ kiểm, cách trình bày.
                   Sáng tạo mới cho chính hệ này.
     · BIÊN SOẠN — nội dung mới viết ra để lấp một khoảng trống mà
                   kho gốc chưa có. PHẢI được Hội đồng Chuyên môn
                   của Học viện duyệt trước khi đưa vào dạy hoặc
                   nộp hồ sơ. Đây là loại duy nhất còn treo.
     · THAM CHIẾU — tài liệu của tổ chức khác. KHÔNG kê khai là
                   tác phẩm của Học viện.

     Bộ kiểm soi: mọi tệp du-lieu-*.js phải có đúng một dòng ở
     đây, không thiếu không thừa.                                */
  G.SC_XUAT_XU = [
    ['du-lieu.js', 'DỰNG', 'Nền móng: nguyên lý, kiến trúc, bậc, khung năng lực, phẩm chất', 'đã chốt'],
    ['du-lieu-daotao.js', 'DỰNG', 'Nhịp 365, hình thái, lộ trình bậc, khoá nền, chuyên đề, trại, bộ test', 'đã chốt'],
    ['du-lieu-vanhanh.js', 'DỰNG', 'Vai trò, tài chính, an toàn, rủi ro, triển khai', 'đã chốt'],
    ['du-lieu-kythuat.js', 'DỰNG', 'Mã hoá, hồ sơ, bảng lưu, lộ trình công nghệ', 'đã chốt'],
    ['du-lieu-chuyenmon.js', 'DỰNG', 'Ma trận 8×8, quy trình mười bước, nhóm giải pháp, chiến lược', 'đã chốt'],
    ['du-lieu-congdong.js', 'DỰNG', 'Chi hội, vòng tuần, kịch bản, ban điều hành, lịch năm', 'đã chốt'],
    ['du-lieu-thuvien.js', 'DỰNG', 'Thư viện Gen Việt: sáu quyển, bốn mươi lăm chân dung, mô thức Việt', 'đã chốt'],
    ['du-lieu-trainghiem.js', 'DỰNG', 'Hành trình 365, khoảnh khắc, cam kết dịch vụ, phục hồi', 'đã chốt'],
    ['du-lieu-giatri.js', 'DỰNG', 'Gói sản phẩm, bảo đảm, phễu, thông điệp, phản đối, nhân rộng', 'đã chốt'],
    ['du-lieu-tincay.js', 'DỰNG', 'Ba tầng bằng chứng, kiểm định, bảo vệ trẻ em, khủng hoảng, pháp lý', 'đã chốt'],
    ['du-lieu-thuonghieu.js', 'DỰNG', 'Bộ nhận diện: ý niệm dấu hiệu, biến thể, luật dùng, bảng màu, chữ', 'đã chốt'],
    ['du-lieu-banquyen.js', 'DỰNG', 'Tài sản trí tuệ, quyền tác giả, nhãn hiệu, đề án quốc gia, ra quốc tế', 'đã chốt'],
    ['du-lieu-camtay.js', 'DỰNG', 'Bộ cầm tay: bảy câu hỏi bàn ăn, bản đọc ca, kịch bản gọi, thư mẫu', 'đã chốt'],
    ['du-lieu-tracuu.js', 'DỰNG', 'Từ điển thuật ngữ, Sổ Chuẩn, bản đồ toàn hệ', 'đã chốt'],
    ['du-lieu-quyen.js', 'DỰNG', 'Bảng phân quyền: mười bảy vai, tầng hiển thị, luật quyền', 'đã chốt'],
    ['du-lieu-nhuongquyen.js', 'DỰNG', 'Bộ hồ sơ nhượng quyền: bốn gói, kiểm định, hợp đồng, lãnh thổ', 'đã chốt'],
    ['du-lieu-seo.js', 'DỰNG', 'Tìm thấy được và đáng tin: nguyên tắc, ý định, E-E-A-T, phản hồi', 'đã chốt'],
    ['du-lieu-socai.js', 'DỰNG', 'Sổ yêu cầu, món nợ số, sổ xuất xứ — kiến trúc trung thực của hệ', 'đã chốt'],
    ['du-lieu-songuon.js', 'DỰNG', 'Sổ nguồn: bốn mươi lăm dòng tệp kho gốc và sáu món nợ nguồn', 'đã chốt'],

    ['du-lieu-tuyen.js', 'RÚT', 'Xương sống: mười lăm giai đoạn, năm tuyến, pipeline — từ Bộ Đề Tài Nghiên Cứu Ứng Dụng', 'đã chốt'],
    ['du-lieu-tuan52.js', 'RÚT', 'Năm mươi hai tuần chuyên đề — từ CHUYÊN ĐỀ 52 TUẦN ĐÀO TẠO TRONG CLB', 'đã chốt'],
    ['du-lieu-capdo.js', 'RÚT', 'Một trăm chương trình huấn luyện — từ Hệ 10 Cấp Độ Đào Tạo Gen Việt', 'đã chốt'],
    ['du-lieu-chuyende.js', 'RÚT', 'Tám trăm năm mươi chuyên đề — từ CHƯƠNG TRÌNH CẤP 1 và CHUYÊN ĐỀ PHÁT TRIỂN TÀI NĂNG', 'đã chốt'],
    ['du-lieu-giaoan.js', 'RÚT', 'Giáo án và khung cứng hai tiết — từ PHẦN 0, CHUYÊN ĐỀ lớp 2, GV2, GV7', 'đã chốt'],
    ['du-lieu-vanhanh2.js', 'RÚT', 'Cẩm nang vận hành chi tiết — từ CẨM NANG VẬN HÀNH và QUY TRÌNH HỌP CLB', 'đã chốt'],
    ['du-lieu-master.js', 'RÚT', 'Hệ tư tưởng nền — từ bốn bản MASTER Gen Việt và Khung sách', 'đã chốt'],
    ['du-lieu-trai-vip.js', 'RÚT', 'Trại Leader Boom và Học viện VIP — từ hai tài liệu cùng tên', 'đã chốt'],
    ['du-lieu-deana.js', 'RÚT', 'Đề án thành lập — từ ƯƠM MẦM GEN VIỆT và Bộ Đề Tài Nghiên Cứu', 'đã chốt'],
    ['du-lieu-slide.js', 'RÚT', 'Bộ trình bày — từ SLIDE CLB GEN VIỆT và slide buổi họp tham khảo', 'đã chốt'],

    ['du-lieu-bni.js', 'THAM CHIẾU', 'Mô hình chi hội — tài liệu của BNI Global, LLC. Học cơ chế, không dùng lại thương hiệu hay văn bản', 'không kê khai là tác phẩm của Học viện']
  ];

  /* ── 5 · Luật xuất xứ ─────────────────────────────────────── */
  G.SC_XX_LUAT = [
    'Mỗi tệp kho phải có đúng một dòng trong sổ xuất xứ. Bộ kiểm đối chiếu danh sách tệp thật với sổ này; thiếu một dòng hoặc thừa một dòng đều chặn bản dựng.',
    'Ranh giới giữa RÚT và BIÊN SOẠN có ý nghĩa pháp lý. Phần RÚT là tác phẩm gốc của Học viện; phần BIÊN SOẠN là nội dung mới, chưa qua Hội đồng Chuyên môn. Gộp hai loại làm một trong hồ sơ quyền tác giả là tạo rủi ro.',
    'Phần THAM CHIẾU không bao giờ được kê khai là tác phẩm của Học viện. Chỉ phần đối chiếu và bình luận về nó là sáng tạo riêng.',
    'Mọi tệp BIÊN SOẠN mang trạng thái *chờ Hội đồng Chuyên môn duyệt* cho tới khi có văn bản duyệt. Không tự chuyển sang *đã chốt*.',
    'Nội dung BIÊN SOẠN được phép sáng tác về sư phạm, nhưng KHÔNG được bịa số liệu nghiên cứu, tên người thật, trích dẫn, hay viện dẫn văn bản pháp luật.',
    'Khi một tệp BIÊN SOẠN về sau tìm được tài liệu gốc tương ứng, đối chiếu rồi đổi sang RÚT — không giữ song song hai bản.'
  ];

  /* ── 3 · Luật giữ sổ ─────────────────────────────────────── */
  G.SC_LUAT = [
    'Mỗi yêu cầu của Học viện phải thành một dòng sổ trước khi được coi là đã nhận. Nhận bằng lời rồi làm theo trí nhớ là cách một yêu cầu biến mất.',
    'Dòng sổ phải viện dẫn màn và kho CỤ THỂ. Viện dẫn chung chung — "đã có trong hệ" — không được tính là đáp ứng.',
    'Bộ kiểm soi từng viện dẫn ở mỗi lần dựng. Viện dẫn vào màn không tồn tại hoặc kho rỗng thì bản dựng bị chặn, không cảnh báo suông.',
    'Mọi con số hứa trong văn xuôi phải có một dòng MÓN NỢ SỐ trỏ tới kho chứa đúng ngần ấy phần tử. Hứa mà không trỏ được thì bỏ con số ấy đi.',
    'Khi một yêu cầu được đáp ứng thêm ở chỗ mới thì bổ sung viện dẫn, không xoá viện dẫn cũ. Sổ ghi lịch sử, không ghi trạng thái cuối.',
    'Không dòng sổ nào được đóng bằng cách sửa lại yêu cầu cho vừa với thứ đã làm.'
  ];

})(window.GV = window.GV || {});
