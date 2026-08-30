/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · SỔ NGUỒN

   Sổ yêu cầu trả lời "đã làm đủ thứ được yêu cầu chưa".
   Sổ nguồn trả lời câu còn lại: "đã đọc hết kho tài liệu chưa".

   Cả hai câu trước đây chỉ trả lời được bằng lời. Ở đây từng tệp
   trong thư mục GEN VIỆT của Học viện được ghi thành một dòng, kèm
   trạng thái thật: đã rút · trùng bản khác · chưa đọc được · không
   phải tài liệu. Dòng nào ghi "đã rút" phải nêu được kho nào chứa
   thứ rút ra, và bộ kiểm soi lại kho ấy có tồn tại không.

   Đọc kho ngày 30.08.2026. Thư mục có 63 tệp, trong đó 12 tệp ảnh
   không phải tài liệu.

   Cập nhật lần hai: thêm tám dòng cho bộ đề án, bộ trình bày và ba
   tài liệu tham chiếu của BNI Global — thứ Học viện đưa vào kho từ
   đầu mà bản dựng trước mới chỉ nhắc tên chứ chưa khai thác.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Trạng thái ──────────────────────────────────────── */
  G.SN_TRANG_THAI = [
    { t: 'ĐÃ RÚT', n: 'Đã đọc hết và đã có kho dữ liệu tương ứng trong hệ.',
      vi: 'Dòng nào mang trạng thái này đều phải nêu được khoá kho; bộ kiểm soi lại khoá ấy ở mỗi lần dựng.' },
    { t: 'TRÙNG BẢN', n: 'Nội dung trùng với một tệp đã rút, hoặc là bản in của chính tệp ấy.',
      vi: 'Không đọc lại. Nhưng vẫn ghi vào sổ, vì bỏ trống một dòng thì lần sau không ai biết đã xét hay chưa.' },
    { t: 'CHƯA ĐỌC ĐƯỢC', n: 'Tệp quá lớn để lấy qua đường hiện có, hoặc trả về rỗng.',
      vi: 'Đây là nợ thật, không phải chỗ bỏ qua. Cách gỡ ghi ở mục cuối kho này.' },
    { t: 'KHÔNG PHẢI TÀI LIỆU', n: 'Ảnh chụp, ảnh chèn, tệp nén chứa vật liệu rời.',
      vi: 'Ghi để đủ số, không rút nội dung.' }
  ];

  /* ── 2 · Sổ nguồn ─────────────────────────────────────────
        [tên tệp, cỡ, trạng thái, rút ra được gì, kho chứa]      */
  G.SN_TEP = [
    /* ══ Xương sống và chương trình ══ */
    ['CHUYÊN ĐỀ 52 TUẦN ĐÀO TẠO TRONG CLB GEN VIỆT.docx', '1,1 MB', 'ĐÃ RÚT',
     'Đủ 52 tuần: chủ đề, mục tiêu chung, đầu ra bắt buộc; bốn chu kỳ Lead Self → Team → Project → Impact', 'T52_TUAN · T52_CHU_KY'],
    ['Hệ 10 Cấp Độ Đào Tạo Gen Việt 1.docx', '254 KB', 'ĐÃ RÚT',
     'Đủ 100 chương trình huấn luyện mã 1.1 → 10.10, 10 cấp độ, nhóm năng lực A–F, chuẩn đầu ra bốn góc nhìn, 30 SOP', 'CD10_CT · CD10_CAP · CD10_SOP'],
    ['Hệ 10 Cấp Độ Đào Tạo Gen Việt.docx', '110 KB', 'TRÙNG BẢN',
     'Trùng khít bản 254 KB — chênh 5 ký tự trên tổng 69.480', 'CD10_CT'],
    ['CHƯƠNG TRÌNH ĐÀO TẠO GEN VIỆT CẤP 1.doc', '727 KB', 'ĐÃ RÚT',
     '250 chuyên đề khối 1–5, bộ duy nhất có hệ mã GV<khối>.<nhóm>.<số> thật', 'CD_DE_TAI'],
    ['CHUYÊN ĐỀ PHÁT TRIỂN TÀI NĂNG GEN VIỆT.doc', '316 KB', 'ĐÃ RÚT',
     '600 chuyên đề trọn lớp 1 → lớp 12, mỗi dòng có tên gần gũi, ý tưởng lõi và minh chứng đo được', 'CD_TAI_NANG'],
    ['KHỐI LỚP 1.doc', '2,8 MB', 'ĐÃ RÚT',
     'Triển khai chi tiết khối 1 — bản gốc dừng ở GV1.3.09, tức 29 trên 50 chuyên đề', 'CD_KHUNG_CD'],
    ['KHỐI LỚP 2.doc', '322 KB', 'ĐÃ RÚT',
     'Triển khai khối 2 — bản gốc thiếu hẳn mã GV2.1.03 và lặp GV2.1.02 hai lần', 'CD_KHUNG_CD'],
    ['KHỐI LỚP 3.doc', '534 KB', 'ĐÃ RÚT',
     'Triển khai khối 3 — bản gốc dừng ở GV3.1.05, tức 5 trên 50 chuyên đề', 'CD_KHUNG_CD'],
    ['CHUYÊN ĐỀ lớp 2.doc', '5,5 MB', 'ĐÃ RÚT',
     '13 chuyên đề lớp 2 đủ hai tiết, 20 khẩu quyết, ngân hàng hoạt động', 'GA_BUOI · GA_KHAU_QUYET'],
    ['CHUYÊN ĐỀ GV2.doc', '957 KB', 'ĐÃ RÚT', 'Chuyên đề nhóm 2, khung tiết và tiêu chí quan sát', 'GA_BUOI'],
    ['🧭 CHUYÊN ĐỀ GV7.doc', '2,0 MB', 'ĐÃ RÚT', 'Chuyên đề nhóm 7, bổ sung ngân hàng hoạt động', 'GA_HOAT_DONG'],
    ['PHẦN 0.doc', '872 KB', 'ĐÃ RÚT', 'Triết lý chương trình, cách dùng giáo án, quy ước mã số', 'GA_PHAN_0'],
    ['PHẦN 0 CHI TIẾT.doc', '5,4 MB', 'ĐÃ RÚT', 'Khung 15 tuần một học kỳ và 14 biểu mẫu đi kèm', 'GA_HOC_KY · GA_BIEU_MAU'],
    ['PHẦN 0 (1).doc', '382 KB', 'TRÙNG BẢN', 'Bản rút gọn của PHẦN 0.doc', 'GA_PHAN_0'],

    /* ══ Vận hành ══ */
    ['CẨM NANG VẬN HÀNH GEN VIỆT.docx', '194 KB', 'ĐÃ RÚT',
     'Sơ đồ tổ chức, RACI, 16 chỉ số có ngưỡng, PDCA, 15 cảnh báo sớm Cờ Vàng và Cờ Đỏ', 'VH2_SO_DO · VH2_KPI · VH2_CANH_BAO'],
    ['QUY TRÌNH HỌP CLB GEN VIỆT.docx', '336 KB', 'ĐÃ RÚT',
     '57 mốc trước — trong — sau một buổi, nhiệm vụ 12 Ban, 20 biểu mẫu', 'VH2_TRUOC · VH2_TRONG · VH2_SAU · VH2_BAN12'],
    ['QUY TRÌNH HỌP CLB GEN VIỆT.pdf', '668 KB', 'TRÙNG BẢN', 'Bản in của tệp .docx cùng tên', 'VH2_TRUOC'],
    ['Lịch trình buổi sinh hoạt Club Gen Việt.docx', '174 KB', 'ĐÃ RÚT', 'Lịch chi tiết và kịch bản dẫn chương trình', 'VH2_TRONG'],
    ['Lịch trình buổi sinh hoạt Club Gen Việt.pdf', '383 KB', 'TRÙNG BẢN', 'Bản in', 'VH2_TRONG'],
    ['CHƯƠNG TRÌNH ĐIỀU HÀNH.docx', '184 KB', 'ĐÃ RÚT',
     'Bộ tên 12 Ban thứ hai — mâu thuẫn với hai tài liệu kia, đã nêu công khai', 'VH2_SO_DO'],
    ['CHƯƠNG TRÌNH ĐIỀU HÀNH.pdf', '284 KB', 'TRÙNG BẢN', 'Bản in', 'VH2_SO_DO'],
    ['BỘ QUY CHUẨN CLB GEN VIỆT .xlsx', '8 KB', 'ĐÃ RÚT', 'Quy chuẩn trang phục, tác phong, giao tiếp', 'CD10_QUY_CHUAN · CD10_GIAO_TIEP'],

    /* ══ Hệ tư tưởng ══ */
    ['MASTER Gen Việt 1.docx', '1,4 MB', 'ĐÃ RÚT',
     '14 luận điểm nền, 3 chặng 30 năm với 9 nút gia tốc, 18 mô thức, 5 rủi ro chiến lược', 'MS_LUAN_DIEM · MS_CHANG · MS_MO_THUC · MS_RUI'],
    ['MASTER Gen Việt.docx', '1,1 MB', 'ĐÃ RÚT', 'Đối chiếu với bản 1,4 MB — trùng gần hoàn toàn, chênh 4.000 trên 888.000 ký tự', 'MS_TRICH'],
    ['MASTER Gen Việt.docx (bản 04.12)', '1,1 MB', 'TRÙNG BẢN', 'Bản lưu cùng ngày, cùng nội dung', 'MS_TRICH'],
    ['MASTER Gen Việt 2.docx', '24,7 MB', 'TRÙNG BẢN', 'Cùng dãy chương 1.1 → 14.10, nặng vì ảnh chèn', 'MS_LUAN_DIEM'],
    ['MASTER Gen Việt 3.docx', '91,6 MB', 'CHƯA ĐỌC ĐƯỢC', 'Quá lớn để lấy qua đường hiện có; nội dung nhiều khả năng trùng bản 1', 'MS_LUAN_DIEM'],
    ['MASTER Gen Việt.pdf · 1.pdf · 2.pdf', '5,8 + 6,3 + 13,5 MB', 'TRÙNG BẢN', 'Ba bản in của các tệp .docx cùng tên', 'MS_LUAN_DIEM'],
    ['Khung sách Master Gen Việt.doc', '52 KB', 'ĐÃ RÚT',
     'Dàn ý 5 phần 18 chương — mô tả một cuốn sách KHÁC với bản đã viết; khuyết tiêu đề PHẦN II', 'MS_KHUNG_SACH'],
    ['Khung sách Master Gen Việt (1).doc', '52 KB', 'TRÙNG BẢN', 'Bản lưu thứ hai, cùng nội dung', 'MS_KHUNG_SACH'],
    ['Lời mở đầu.doc', '63 KB', 'ĐÃ RÚT', '8 luận điểm mở đầu, nguyên chữ tác giả', 'MS_LOI_MO'],

    /* ══ Trại, học viện, tham chiếu ══ */
    ['TRẠI HUẤN LUYỆN LEADER BOOM 2026.docx', '262 KB', 'ĐÃ RÚT',
     '7 ngày trại, lịch ngày một, 6 mốc hậu trại 90 ngày — nhưng KHÔNG có chương an toàn nào', 'TV2_TRAI_KHUNG · TV2_TRAI_AN_TOAN'],
    ['HỌC VIỆN GEN VIỆT. VIP.docx', '1,1 MB', 'ĐÃ RÚT', 'Chương trình điều hành 10 bước, chuẩn vào ra, quyền và nghĩa vụ', 'TV2_VIP_CHUONG_TRINH'],
    ['Mô hình Bukatsu.docx', '156 KB', 'ĐÃ RÚT',
     'ĐÃ BỊ TÌM-THAY-THẾ TOÀN VĂN: chữ Bukatsu bị đổi thành Gen Việt, senpai–kōhai đổi thành Gen A – Gen V', 'TV2_BUKATSU'],
    ['Bộ Đề Tài Nghiên Cứu Ứng Dụng Gen Việt.docx', '48 KB', 'ĐÃ RÚT',
     'Mô hình 15 giai đoạn, pipeline 5 cấp, 10 đề tài GV-R1 → GV-R10, khung thiết kế nghiên cứu', 'TY_GIAI_DOAN · TY_KN_DE_TAI'],

    /* ══ Đề án, trình bày, tham chiếu chi hội ══ */
    ['ƯƠM MẦM GEN VIỆT.docx', '134 KB', 'ĐÃ RÚT',
     'Tám mục đề án, cơ cấu tổ chức, RACI đạt chuẩn một chữ A mỗi dòng, KPI hai năm, kế hoạch 12 tháng, bộ mẫu biểu', 'DA_CAU_TRUC · DA_RACI · DA_KPI · DA_KE_HOACH_12'],
    ['SLIDE CLB GEN VIỆT.pptx', '8,6 MB', 'ĐÃ RÚT',
     '22 slide giới thiệu, 12 thông điệp lõi; bản gốc bỏ trống ô ngày thành lập và số thành viên', 'SL_BO_SLIDE · SL_THONG_DIEP'],
    ['SLIDE CLB GEN VIỆT.pdf (hai bản)', '1,8 + 1,7 MB', 'TRÙNG BẢN', 'Bản in của tệp .pptx cùng tên', 'SL_BO_SLIDE'],
    ['SLIDE Buoi hop tham khao 2026.pptx', '3,3 MB', 'ĐÃ RÚT',
     '22 mốc buổi họp mẫu; phát hiện hai lớp số liệu chồng nhau, một trang cũ tiếng Anh và một trang mới tiếng Việt', 'SL_BUOI_HOP'],
    ['MỐI QUAN HỆ LÀ TÀI SẢN_20260401.pptx', '49 MB', 'ĐÃ RÚT',
     'Chỉ rút được phần chữ — trang tiêu đề và một trang nội dung; phần còn lại nằm trong ảnh', 'SL_QUAN_HE'],
    ['BNI_Accelerate_Journey (1).pdf', '11 MB', 'ĐÃ RÚT',
     'THAM CHIẾU BÊN THỨ BA. Sáu chặng hành trình một thành viên, dạng kể chuyện chứ không phải giáo trình', 'BN_HANH_TRINH'],
    ['Cẩm nang Vận hành Chapter -07.2025- v3.pdf', '5,1 MB', 'ĐÃ RÚT',
     'THAM CHIẾU BÊN THỨ BA. 12 ghế, 13 chỉ số, 20 mốc quy trình họp, 14 cơ chế tạo chiều sâu. Bốn trang cuối là ảnh, chưa rút được', 'BN_VAI · BN_CHI_SO · BN_QUY_TRINH_HOP · BN_TANG_SAU'],
    ['Cập nhật trong cẩm nang vận hành Chapter 07.2025.pdf', '195 KB', 'ĐÃ RÚT',
     'THAM CHIẾU BÊN THỨ BA. Phần cập nhật quy định, đọc trọn', 'BN_TANG_SAU'],

    /* ══ Ảnh và tệp nén ══ */
    ['Mười hai tệp ảnh jpg', '78 KB – 811 KB', 'KHÔNG PHẢI TÀI LIỆU',
     'Ảnh chụp hoạt động và ảnh chèn tài liệu', 'không rút'],
    ['Gita-20251224T074113Z-1-001.zip', '657 MB', 'CHƯA ĐỌC ĐƯỢC',
     'Tệp nén chứa vật liệu rời; quá lớn để lấy qua đường hiện có', 'chưa có']
  ];

  /* ── 3 · Nợ nguồn và cách gỡ ──────────────────────────────
        Không giấu chỗ chưa lấy được. Mỗi dòng nói rõ vì sao
        chưa lấy được và Học viện làm gì thì gỡ được.           */
  G.SN_NO = [
    { t: 'Bốn tệp giáo án tiểu học GA LỚP 2 · 3 · 4 · 5', dau: 'Cỡ 82 MB đến 145 MB mỗi tệp; đường lấy hiện có trả về rỗng',
      phanh: 'Xuất từng tệp sang định dạng văn bản thuần hoặc .docx đã gỡ ảnh, rồi đặt lại vào thư mục. Ảnh chiếm hơn 95% dung lượng — bỏ ảnh là còn dưới 2 MB, lấy được ngay.' },
    { t: 'CHƯƠNG TRÌNH GEN VIỆT TIỂU HỌC.doc', dau: 'Cỡ 63,9 MB, định dạng Word 97 nên không giải nén được',
      phanh: 'Mở bằng Word rồi lưu thành .docx, hoặc lưu thành .txt. Cả hai cách đều đưa tệp xuống dưới ngưỡng lấy được.' },
    { t: 'MASTER Gen Việt 3.docx', dau: 'Cỡ 91,6 MB; hai bản còn lại của cùng cuốn sách đã rút được',
      phanh: 'Đối chiếu xem bản 3 có phần nào bản 1 không có. Nếu có thì tách riêng phần ấy thành tệp nhẹ.' },
    { t: 'Gita-20251224T074113Z-1-001.zip', dau: 'Cỡ 657 MB, chưa biết bên trong có gì',
      phanh: 'Giải nén rồi đưa các tệp văn bản vào một thư mục con. Không cần đưa ảnh và video.' },
    { t: 'Triển khai chi tiết khối 4 và khối 5', dau: 'Không phải lỗi lấy tệp — kho gốc CHƯA CÓ tài liệu này, mới chỉ có tên chuyên đề',
      phanh: 'Đây là khoảng trống nội dung của Học viện, không phải khoảng trống khai thác. Cần biên soạn mới, theo đúng khung cứng 2 tiết × 45 phút đã rút được từ khối 1–3.' },
    { t: 'Bản gốc chưa bị thay chữ của tài liệu Bukatsu', dau: 'Bản trong kho đã bị tìm-thay-thế toàn văn, không còn từ khoá tra ngược',
      phanh: 'Tìm lại bản trước khi thay chữ, hoặc tra cứu lại mô hình câu lạc bộ học đường Nhật Bản từ nguồn khác. Không dùng bản hiện có trong hồ sơ chính thức.' }
  ];

  /* ── 4 · Luật giữ sổ nguồn ────────────────────────────────── */
  G.SN_LUAT = [
    'Mọi tệp trong kho gốc đều có một dòng trong sổ này, kể cả tệp trùng và tệp ảnh. Bỏ trống một dòng thì lần sau không ai biết đã xét hay chưa.',
    'Dòng ghi "đã rút" phải nêu được khoá kho chứa thứ rút ra. Bộ kiểm soi lại khoá ấy ở mỗi lần dựng; khoá không tồn tại thì bản dựng bị chặn.',
    'Chỗ chưa đọc được thì ghi là chưa đọc được, kèm cách gỡ cụ thể. Không lấp bằng nội dung tự nghĩ ra.',
    'Khi bản gốc có sạn — mã trùng, số nhảy, văn bản bị thay chữ — thì giữ nguyên sạn và ghi chú, không âm thầm sửa. Sửa là việc của Học viện, không phải của bản dựng.',
    'Khi hai tài liệu gốc mâu thuẫn nhau, nêu cả hai và nói rõ đã chọn bản nào cùng lý do. Không lặng lẽ chọn một bên.',
    'Tài liệu của tổ chức khác — BNI, mô hình Nhật Bản — chỉ dùng để học cơ chế. Không sao chép thương hiệu, không sao chép nguyên văn vào tài liệu mang tên Gen Việt.'
  ];

})(window.GV = window.GV || {});
