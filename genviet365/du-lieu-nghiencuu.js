/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT · THIẾT KẾ NGHIÊN CỨU BẢY ĐỀ TÀI CÒN THIẾU

   BIÊN SOẠN MỚI — bảy thiết kế này không có trong kho gốc. Chúng
   dựng theo đúng khung của ba đề tài GV-R1, R2, R6 mà Học viện đã
   viết, và cần Hội đồng Chuyên môn duyệt trước khi nộp.

   Khoảng trống được lấp: kho gốc chỉ dựng thiết kế đầy đủ cho ba
   đề tài GV-R1, GV-R2, GV-R6. Bảy đề tài GV-R3, R4, R5, R7, R8,
   R9, R10 mới có tên, mục tiêu và sản phẩm — không có giả thuyết.
   Một đề tài không có giả thuyết thì không đăng ký được cấp Sở,
   vì hội đồng hỏi câu đó đầu tiên.

   ĐIỀU KHO NÀY KHÔNG LÀM — đọc trước khi dùng:
   · Không có kết quả nghiên cứu ở đây. Không một con số nào trong
     kho này là số liệu đã đo được. Tất cả là thiết kế dự kiến.
   · Không viện dẫn thang đo có sẵn của bất kỳ tác giả nào. Chỗ
     nào cần thang đo thì kho ghi thẳng: phải tự xây và phải thử
     nghiệm trước, kèm cách thử nghiệm.
   · Không dẫn hệ số tin cậy, không dẫn tên tác giả, không dẫn
     công trình đã công bố. Phần tổng quan tài liệu là việc của
     người làm đề tài, làm với thư viện thật.
   · GV-R8 chỉ nhắc đúng hai văn bản mà kho gốc đã ghi — Nghị
     quyết 71-NQ/TW và Chiến lược phát triển giáo dục 2030–2045 —
     và không kèm điều khoản, vì nguồn không có điều khoản. Không
     thêm văn bản nào khác.

   Tên và mục tiêu bảy đề tài lấy nguyên từ GV.TY_KN_DE_TAI.
   Khung chung lấy từ GV.TY_KN_THIET_KE. Chuẩn bằng chứng bám ba
   tầng ở GV.TC_TANG_BC — mọi chỉ số đầu ra dưới đây đều ghi rõ
   nó nằm ở tầng nào.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Bảy thiết kế nghiên cứu ────────────────────────────
     Cùng bảy cột với GV.DA_NGHIEN_CUU, để đặt cạnh nhau đọc
     được liền mạch với ba đề tài đã có. */
  G.NC_THIET_KE = [
    ['Mã', 'Giả thuyết / câu hỏi nghiên cứu', 'Biến số', 'Nhóm đối chứng', 'Công cụ đo', 'Thời gian', 'Sản phẩm'],

    ['GV-R3',
      'Câu hỏi: chu trình Làm → Làm đúng → Duy trì làm đúng có tạo được thói quen sống sót sau khi rút hỗ trợ không? Giả thuyết: nhóm được huấn luyện theo ba giai đoạn tường minh — có tiêu chí chuẩn cho “làm đúng” và ngưỡng ≥80% số ngày cho “duy trì” — giữ hành vi mục tiêu ở mức cao hơn nhóm chỉ được nhắc làm, tại thời điểm 90 ngày sau khi ngừng nhắc.',
      'Độc lập: có hay không khung ba giai đoạn tường minh (tiêu chí chuẩn + ngưỡng duy trì + bảng ba màu). Phụ thuộc: tỷ lệ ngày đạt chuẩn, số hành vi lên được giai đoạn ba, và *tỷ lệ giữ được hành vi sau khi rút hỗ trợ* — đây là biến chính, không phải tỷ lệ trong lúc còn được nhắc.',
      'Cùng trường cùng khối, chọn cùng một hành vi mục tiêu (ví dụ đi học đúng giờ hoặc tự học 30 phút mỗi tối). Nhóm đối chứng được nhắc chung, không có tiêu chí chuẩn và không có ngưỡng duy trì. Đo trước và đo tại ba mốc.',
      'Bảng theo dõi ba màu · sổ điểm danh · log tự học · phiếu giáo viên chủ nhiệm (tầng 2) · đối chiếu với một chỉ số tầng 3 do người ngoài ghi. Bảng tự theo dõi một mình KHÔNG đủ.',
      '9 tháng, chia ba chặng: 90 ngày can thiệp · 90 ngày duy trì có hỗ trợ · 90 ngày rút hỗ trợ. Đo tại ngày 0, 90, 180, 270.',
      'Danh mục hành vi cốt lõi và quy trình coaching thói quen: tiêu chí “làm đúng” cho từng hành vi, ngưỡng duy trì, và kịch bản rút hỗ trợ.'],

    ['GV-R4',
      'Câu hỏi: đi trọn bảy bước Gen Việt cho ít nhất một mục tiêu cá nhân có làm tăng tự lãnh đạo và trách nhiệm học tập không? Giả thuyết: nhóm đi trọn bảy bước tăng hơn nhóm chỉ được giao mục tiêu, ở ba hành vi đo được — tự đặt mục tiêu mà không đợi giao, tự lập kế hoạch trước hạn, tự sửa khi kẹt mà không bỏ.',
      'Độc lập: số bước đã đi trọn trong bảy bước (B1 hiểu bản thân → B7 trình bày như người dẫn), chấm bằng hồ sơ bảy bước chứ không bằng lời khai. Phụ thuộc: số nhiệm vụ nộp đúng hạn không cần nhắc, số lần chủ động xin giúp khi kẹt, số buổi tự học có log, điểm trung bình môn, và một chỉ số tầng 3 — số lần được giáo viên giao việc có trách nhiệm ở lớp.',
      'BA nhánh, không phải hai. Nhánh 1: bảy bước đủ, có mentor. Nhánh 2: có mentor gặp cùng tần suất nhưng không dùng bảy bước. Nhánh 3: không can thiệp. Không có nhánh 2 thì không tách được tác dụng của bảy bước khỏi tác dụng của việc có một người lớn quan tâm đều đặn.',
      'Hồ sơ bảy bước có mốc thời gian · phiếu cam kết mục tiêu · log tự học · sổ chủ nhiệm · phiếu giáo viên hỏi đầu và cuối năm học (tầng 2) · thang tự lãnh đạo phải tự xây và thử nghiệm trước, không mượn thang chưa kiểm chứng.',
      '6–12 tháng theo khung chung. Đo trước, giữa (tháng 3), sau. Ba mốc chốt từ đầu chu kỳ, không dời.',
      'Bộ công cụ mục tiêu cá nhân hoá và bảng theo dõi bảy bước, kèm bản mô tả cách xây và thử nghiệm thang tự lãnh đạo.'],

    ['GV-R5',
      'HAI PHA. Pha A là câu hỏi công cụ: bộ test Mật mã Gen Tài Năng có đo ổn định không — cùng một em làm hai lần cách nhau bốn tuần có ra kết quả giống nhau không, và kết quả có khớp với đánh giá độc lập của giáo viên bộ môn không? Pha B mới là giả thuyết: học sinh chọn hướng có tham chiếu kết quả Mật mã Gen *cộng* trải nghiệm thực tế có mức phù hợp cảm nhận và mức kiên trì với lựa chọn cao hơn nhóm chọn chỉ theo điểm số. Không chạy pha B khi pha A chưa đạt.',
      'Độc lập: quy trình hướng nghiệp có tham chiếu Mật mã Gen và có trải nghiệm thử vai. Phụ thuộc: mức phù hợp tự cảm nhận (tầng 1), đánh giá của giáo viên bộ môn về mức phù hợp (tầng 2), và *tỷ lệ giữ nguyên lựa chọn sau sáu tháng* cùng số hoạt động tự nguyện theo hướng đã chọn (tầng 3).',
      'Cùng khối 9, nhóm đối chứng đi quy trình hướng nghiệp hiện hành của trường. Không được để nhóm đối chứng thiếu tư vấn hướng nghiệp — họ nhận quy trình chuẩn của trường, chỉ khác là không có Mật mã Gen.',
      'Bộ test Mật mã Gen Tài Năng — PHẢI tự xây, thử trên nhóm nhỏ, sửa, rồi thử lại; đo độ ổn định bằng cách cho làm hai lần cách nhau bốn tuần. Bảng “Em giỏi gì — Em thích gì” có phản hồi của ít nhất hai người ngoài gia đình · phiếu giáo viên bộ môn · nhật ký thử vai · theo dõi lựa chọn sau sáu tháng.',
      '12 tháng: 3 tháng pha A xây và thử công cụ, 9 tháng pha B. Đo lại lựa chọn ở tháng thứ 6 sau khi chọn.',
      'Bộ test Mật mã Gen Việt và hướng dẫn phân ban, kèm BẢN GIỚI HẠN SỬ DỤNG ghi rõ test là gợi ý để thử, không phải kết luận về năng lực của một đứa trẻ.'],

    ['GV-R7',
      'Câu hỏi: một Đại sứ Gen Việt trong lớp có làm thay đổi được cả lớp không, hay chỉ thay đổi chính em ấy? Giả thuyết: lớp có ít nhất một Đại sứ hoạt động thật khác lớp không có, về ba chỉ số văn hoá lớp — số vụ việc vi phạm nội quy, tỷ lệ nhiệm vụ tập thể nộp đúng hạn, và số học sinh trong lớp tự nguyện nhận một vai trò.',
      'Độc lập: có hay không Đại sứ đang hoạt động trong lớp, và *cường độ hoạt động* của Đại sứ đó (số hoạt động đã dẫn trong kỳ). Phụ thuộc: ba chỉ số văn hoá lớp ở trên, cộng đánh giá của giáo viên chủ nhiệm và một chỉ số gia đình — số việc nhà tự làm không nhắc, do phụ huynh ghi.',
      'ĐƠN VỊ PHÂN TÍCH LÀ LỚP, không phải cá nhân. So sánh giữa các lớp trong cùng trường, và giữa trường có CLB với trường chưa có. Bắt buộc đo trước để trừ chênh lệch xuất phát giữa các lớp.',
      'Sổ đầu bài và biên bản vi phạm · bảng theo dõi nhiệm vụ tập thể · danh sách nhận vai trò · phiếu giáo viên chủ nhiệm hỏi đầu và cuối năm · bảng tuần của phụ huynh · sơ đồ ai-ảnh-hưởng-ai vẽ bằng một câu hỏi duy nhất trong lớp: “khi cần giúp, em tìm ai?”.',
      'Một năm học trọn vẹn. Đo đầu năm, cuối học kỳ I, cuối năm.',
      'Mô hình Đại sứ Gen Việt và bộ công cụ truyền thông nội bộ: tiêu chí chọn, nhiệm vụ tối thiểu mỗi tháng, và cách đo ảnh hưởng ở cấp lớp.'],

    ['GV-R8',
      'Đây KHÔNG phải nghiên cứu can thiệp và không có giả thuyết nhân quả. Câu hỏi: hoạt động của CLB Gen Việt đáp ứng những nội dung nào của Nghị quyết 71-NQ/TW và Chiến lược phát triển giáo dục 2030–2045, đáp ứng ở mức nào, và còn hở ở đâu? Sản phẩm là một ma trận đối chiếu có bằng chứng cho từng ô, kèm cột “chưa đáp ứng”.',
      'Không có biến độc lập — phụ thuộc. Đơn vị phân tích là *một nội dung chính sách*. Mỗi nội dung được chấm ba mức: có hoạt động và có hồ sơ minh chứng · có hoạt động nhưng chưa có hồ sơ · chưa có hoạt động. Hai người mã hoá độc lập, đối chiếu, chỗ lệch thì đưa ra bàn và ghi lại lý do thống nhất.',
      'Không có nhóm đối chứng người. Thay bằng đối chiếu chéo: mức minh chứng ở trường có CLB Gen Việt so với trường chưa có, trên cùng bộ nội dung chính sách.',
      'Bản gốc hai văn bản · biên bản CLB (BM-1) · kế hoạch hoạt động (BM-3) · báo cáo KPI quý (BM-4) · báo cáo tổng kết năm (BM-6) · phỏng vấn Ban Giám hiệu và cán bộ Phòng Giáo dục. Bảng mã hoá phải tự lập và phải thử trên năm nội dung trước khi chạy toàn bộ.',
      '6 tháng: 2 tháng đọc và lập bảng mã hoá, 3 tháng thu hồ sơ và mã hoá, 1 tháng đối chiếu và viết.',
      'Bộ hồ sơ minh chứng chính sách — thực tiễn: ma trận đối chiếu, tập bằng chứng theo từng ô, và danh sách chỗ hở kèm việc phải làm.'],

    ['GV-R9',
      'Câu hỏi: tham gia dự án phụng sự Gen Việt có đi cùng với phẩm chất công dân mạnh hơn không, và đi cùng theo chiều nào? Giả thuyết tương quan: mức tham gia dự án — đo bằng số giờ và số dự án có nghiệm thu của người ngoài — tương quan thuận với hành vi công dân đo được. NÓI THẲNG: đây là thiết kế tương quan, chưa đủ để kết luận nhân quả; muốn kết luận nhân quả phải phân bổ ngẫu nhiên thứ tự tham gia và ghi rõ trong đề cương.',
      'Dự báo: số giờ phụng sự có xác nhận, số dự án có biên bản nghiệm thu ngoài. Kết quả: số người em đã giúp có chữ ký người nhận, số hoạt động cộng đồng tự khởi xướng, số lần chủ động nhận lỗi, và đánh giá của người thụ hưởng. Ưu tiên tầng 3 — thứ đếm được ở nơi CLB không có mặt.',
      'Hai lớp đối chứng. Một: nhóm chưa tới lượt tham gia dự án — danh sách chờ là nhóm so sánh tự nhiên và hợp đạo đức. Hai: chính các em, so với chính mình trước khi tham gia, để trừ bớt chiều nhân quả ngược.',
      'Hồ sơ dự án có người thụ hưởng cụ thể · phiếu “tôi đã giúp” có chữ ký người nhận · biên bản nghiệm thu của người ngoài hệ · phiếu giáo viên chủ nhiệm · phỏng vấn sâu 8–10 em và 3–5 người thụ hưởng.',
      '12 tháng, đo ba lần: trước, sau dự án đầu tiên, và cuối năm.',
      'Bộ khung Dự án phụng sự theo chuẩn kỹ năng sống: mẫu hồ sơ dự án, phiếu nghiệm thu ngoài, và bảng chỉ số công dân đo được.'],

    ['GV-R10',
      'Câu hỏi: pipeline P1 → P5 chạy thật đến đâu — bao nhiêu phần trăm đi được lên bậc kế tiếp, mất bao lâu, rơi ở khúc nào, và tiêu chí nào ở bậc dưới dự báo được thành công ở bậc trên? Giả thuyết dự báo: mức hoàn thành ở bậc P2 (tham gia đều, nhận việc nhỏ có hạn chót) dự báo tốt hơn cho vai trò dẫn dắt ở P4 so với kết quả học tập.',
      'Dự báo: các chỉ số ở P1–P2 (tỷ lệ có mặt, số việc nhận và hoàn thành đúng hạn, điểm trung bình môn, đánh giá của bạn cùng nhóm). Kết quả: có đạt P4 trong 24 tháng không, có hoàn thành trọn nhiệm kỳ và có bàn giao không, và đánh giá 360° khi giữ vai trò.',
      'Không có nhóm đối chứng theo nghĩa thử nghiệm — đây là theo dõi dọc một khoá. So sánh giữa các khoá vào ở các năm khác nhau, và giữa các trường. BẮT BUỘC theo cả những em rời hệ và ghi lý do rời; chỉ nhìn người còn ở lại thì pipeline nào cũng đẹp.',
      'Sổ ghế và hồ sơ nhiệm kỳ · biên bản bàn giao · phiếu 360° từ bạn, thầy cô và ban điều hành · rubric 15 giai đoạn · bảng năng lực A–F4 · phỏng vấn thoát cho mọi em rời hệ.',
      '24 tháng tối thiểu — dưới hai năm không đủ để một em đi từ P1 lên P4. Chốt sổ mỗi quý.',
      'Khung phát triển lãnh đạo học sinh chuẩn hoá cho nhiều trường: bảng tiêu chí từng bậc, mốc thời gian trung vị, và danh sách khúc rơi kèm việc phải làm ở mỗi khúc.']
  ];

  /* ── 2 · Bảy thẻ chi tiết ────────────────────────────────────
     truc = đề tài này bám giai đoạn nào của khung 15 giai đoạn.
     n   = bối cảnh và khoảng trống tri thức.
     lam = các bước triển khai.
     xn  = ai xác nhận kết quả — không phải người dạy.
     vi  = rủi ro thiết kế lớn nhất của chính đề tài này. */
  G.NC_CHI_TIET = [

    { ma: 'GV-R3', t: 'Ba giai đoạn Làm — Làm đúng — Duy trì như khung xây dựng thói quen lãnh đạo trẻ',
      truc: 'Giai đoạn 13 · Ba giai đoạn thói quen', mau: '#BE0E16',
      n: 'CLB đang dùng bảng ba màu và ngưỡng ≥80% số ngày đạt chuẩn cho giai đoạn duy trì. Chưa ai kiểm chứng khung đó. Khoảng trống: gần như mọi báo cáo về thói quen học sinh đều đo trong lúc còn được nhắc — tức là đo sự tuân thủ, không phải đo thói quen. Câu chưa ai trả lời được ở đây là: rút hỗ trợ đi thì còn lại gì.',
      lam: 'Bước 1: mỗi em chọn 1–2 hành vi cốt lõi, viết tiêu chí “làm đúng” thành câu quan sát được, không phải câu cảm tính. Bước 2: 90 ngày can thiệp theo mốc 0–30 LÀM, 31–60 LÀM ĐÚNG, 61–90 DUY TRÌ. Bước 3: 90 ngày duy trì có hỗ trợ, giảm dần tần suất nhắc. Bước 4: 90 ngày RÚT HẲN hỗ trợ — không nhắc, không hỏi, chỉ đo. Bước 5: đối chiếu bảng tự theo dõi với một nguồn ngoài để bắt phần khai không đúng.',
      xn: 'Giáo viên chủ nhiệm và người ghi điểm danh xác nhận, không phải mentor đang kèm em đó. Với hành vi ở nhà thì phụ huynh ghi vào bảng tuần có sẵn. Người chấm bảng ba màu phải khác người phát bảng.',
      vi: 'Rủi ro lớn nhất: bảng theo dõi ba màu là TỰ KHAI. Một em tích đủ ô mà không làm thì số liệu đẹp và vô nghĩa. Phải có ít nhất một chỉ số song song do người khác ghi — điểm danh, sổ đầu bài, hoặc bảng tuần của phụ huynh — và khi hai nguồn lệch nhau thì lấy nguồn ngoài.' },

    { ma: 'GV-R4', t: 'Ứng dụng bảy bước Gen Việt trong phát triển tự lãnh đạo và trách nhiệm học tập',
      truc: 'Giai đoạn 14 · Bảy bước Gen Việt', mau: '#5140B4',
      n: 'Bảy bước là bộ công cụ nặng nhất của hệ, đi từ hiểu bản thân đến trình bày như người dẫn. Nó luôn được triển khai kèm mentor. Khoảng trống: chưa ai tách được phần đóng góp của quy trình bảy bước khỏi phần đóng góp của việc có một người lớn quan tâm đều đặn. Đây là câu hội đồng sẽ hỏi, và nếu thiết kế chỉ có hai nhánh thì không trả lời được.',
      lam: 'Bước 1: dựng thang tự lãnh đạo — viết mục hỏi, thử trên 20–30 em, bỏ mục gây hiểu nhầm, thử lại. Bước 2: chia ba nhánh, ghi rõ cách chia trong đề cương trước khi bắt đầu. Bước 3: nhánh 1 và nhánh 2 gặp mentor cùng tần suất, cùng thời lượng — chỉ khác nội dung. Bước 4: chấm số bước đã đi trọn bằng hồ sơ có mốc thời gian, không bằng lời khai. Bước 5: đo ba mốc đã chốt từ đầu.',
      xn: 'Giáo viên bộ môn xác nhận nhiệm vụ nộp đúng hạn. Giáo viên chủ nhiệm trả lời ba câu hỏi cố định đầu và cuối năm, phiếu có chữ ký và không đi qua tay phụ huynh. Hồ sơ bảy bước do một người chấm không kèm em nào trong nghiên cứu.',
      vi: 'Rủi ro lớn nhất: nhầm tác dụng của mentor thành tác dụng của bảy bước. Nhánh 2 — có mentor, không có bảy bước — là nhánh tốn công nhất và cũng là nhánh dễ bị cắt nhất khi thiếu người. Cắt nó đi thì đề tài mất giá trị kết luận, chỉ còn là mô tả.' },

    { ma: 'GV-R5', t: 'Hiệu quả Mật mã Gen Tài Năng trong phân ban và hướng nghiệp sớm',
      truc: 'Giai đoạn 11 · Giá trị và đam mê tài năng', mau: '#A8801F',
      n: 'Mật mã Gen Tài Năng đang được dùng ở khối 9 và ở Ban Tài Năng Việt. Nó chưa từng được kiểm định. Khoảng trống nghiêm trọng hơn cả câu hỏi hiệu quả: chưa ai biết công cụ này có đo ổn định không. Một bộ test cho ra kết quả khác nhau giữa hai lần làm thì mọi kết luận dựa trên nó đều rỗng. Vì thế đề tài này phải chia hai pha, và pha A không đạt thì dừng.',
      lam: 'Pha A — bước 1: viết mục hỏi cho từng nhóm mật mã, mỗi nhóm ít nhất tám mục. Bước 2: thử trên 30–50 em, phỏng vấn xem em hiểu câu hỏi thế nào, bỏ mục gây hiểu nhầm. Bước 3: cho cùng nhóm làm lại sau bốn tuần, so hai lần. Bước 4: đối chiếu kết quả test với đánh giá độc lập của hai giáo viên bộ môn. Pha B — bước 5: nhóm can thiệp đi quy trình Mật mã Gen cộng thử vai thật; nhóm đối chứng đi quy trình hướng nghiệp hiện hành của trường. Bước 6: đo lại lựa chọn sau sáu tháng.',
      xn: 'Giáo viên bộ môn chấm mức phù hợp, chấm mù — không biết em đó ra kết quả mật mã gì. Người thu thập lựa chọn sau sáu tháng không phải người tư vấn hướng nghiệp cho em đó.',
      vi: 'Rủi ro lớn nhất không nằm ở thống kê mà ở đứa trẻ: HIỆU ỨNG DÁN NHÃN. Một em nhận kết quả “không hợp khối tự nhiên” ở tuổi 14 có thể thôi cố ngay từ đó, và chính nghiên cứu gây ra tổn hại ấy. Bắt buộc: kết quả test trả cho em kèm câu “đây là gợi ý để thử, không phải kết luận”, không dán mã mật mã lên danh sách lớp, không dùng kết quả test để chặn bất kỳ lựa chọn nào của em, và mọi em vẫn được tư vấn đầy đủ theo quy trình của trường.' },

    { ma: 'GV-R7', t: 'Từ thành viên đến Đại sứ Gen Việt: cơ chế lan toả giá trị và văn hoá trường',
      truc: 'Giai đoạn 15 · Hội tụ Gen Việt · bậc P5', mau: '#185AB4',
      n: 'Hệ tin rằng một Đại sứ làm thay đổi cả lớp. Đó là một niềm tin, chưa phải bằng chứng. Khoảng trống: mọi báo cáo hiện có đều đo sự thay đổi của chính em Đại sứ — thứ dễ đo và cũng dễ đoán trước, vì em ấy vốn đã là em nổi trội. Cái chưa ai đo là hiệu ứng lên những người xung quanh em ấy. Đổi đơn vị phân tích từ cá nhân sang lớp là toàn bộ điểm mới của đề tài này.',
      lam: 'Bước 1: đo trước toàn bộ các lớp trong diện, kể cả lớp sẽ là đối chứng, trước khi ai được công nhận Đại sứ. Bước 2: ghép cặp lớp theo khối, sĩ số và mức vi phạm năm trước, để bớt chênh lệch xuất phát. Bước 3: theo dõi cường độ hoạt động của từng Đại sứ theo tháng — có Đại sứ trên giấy mà không hoạt động thì phải tách ra, không gộp chung. Bước 4: hỏi cả lớp một câu duy nhất mỗi kỳ — “khi cần giúp, em tìm ai?” — và vẽ lại sơ đồ ảnh hưởng. Bước 5: thu bảng tuần của phụ huynh để bắt phần lan toả về gia đình.',
      xn: 'Giáo viên chủ nhiệm và giám thị ghi vi phạm và nhiệm vụ tập thể — họ ghi vì công việc, không vì nghiên cứu, nên số ít bị bóp méo. Phụ huynh ghi việc nhà. Người tổng hợp sơ đồ ảnh hưởng không được là Đại sứ hay bạn thân của Đại sứ.',
      vi: 'Rủi ro lớn nhất: LÂY NHIỄM CHÉO. Lớp đối chứng ở cùng trường, ăn cùng sân, dự cùng lễ chào cờ — Đại sứ ảnh hưởng sang họ, và chênh lệch giữa hai nhóm bị san phẳng. Hệ quả là đề tài kết luận “không có hiệu ứng” trong khi hiệu ứng có thật. Cách giảm: thêm một lớp đối chứng ở trường chưa có CLB, và ghi lại mọi hoạt động toàn trường mà cả hai nhóm cùng dự.' },

    { ma: 'GV-R8', t: 'Vai trò CLB Gen Việt trong hiện thực hoá Nghị quyết 71-NQ/TW và Chiến lược giáo dục 2030–2045',
      truc: 'Khung chính sách · nền của toàn bộ đề án', mau: '#9E470D',
      n: 'Kho gốc nhắc hai văn bản này ở phần căn cứ, nhưng không kèm điều khoản nào, và không có tài liệu nào đối chiếu từng nội dung chính sách với từng hoạt động có thật của CLB. Khoảng trống: hồ sơ trình Sở hiện dừng ở mức nêu tên văn bản. Hội đồng hỏi “điều nào, và anh chứng minh bằng cái gì” thì không có câu trả lời. Đề tài này làm ra chính cái ma trận đó.',
      lam: 'Bước 1: đọc bản gốc hai văn bản, tách thành danh sách nội dung rời, mỗi nội dung một dòng, giữ nguyên câu chữ. Bước 2: lập bảng mã hoá ba mức và thử trên năm nội dung với hai người mã hoá độc lập; lệch nhiều thì sửa bảng rồi thử lại. Bước 3: thu hồ sơ thật — BM-1, BM-3, BM-4, BM-6 của các CLB trong diện. Bước 4: hai người mã hoá toàn bộ độc lập, chỗ lệch đưa ra bàn, ghi biên bản thống nhất. Bước 5: phỏng vấn Ban Giám hiệu và cán bộ Phòng Giáo dục về chỗ hở. Bước 6: viết cột “chưa đáp ứng” trước, cột “đã đáp ứng” sau — làm ngược thứ tự này thì báo cáo trượt thành bài ca ngợi.',
      xn: 'Người mã hoá thứ hai phải ở ngoài CLB. Cán bộ Phòng Giáo dục xác nhận cách hiểu nội dung chính sách. Ban Giám hiệu xác nhận hồ sơ minh chứng là thật và đã lưu.',
      vi: 'Rủi ro lớn nhất là bịa căn cứ pháp lý. Nguồn của hệ chỉ có tên hai văn bản, KHÔNG có điều khoản. Người viết rất dễ tự thêm một số điều cho hồ sơ trông chắc chắn hơn. Trích sai số hiệu hoặc gán sai điều khoản nguy hiểm hơn nhiều so với trích ít: hội đồng tra một phút là ra, và cả hồ sơ mất tin cậy. Luật của đề tài này: chỉ ghi những gì đã mở bản gốc ra đọc, chỗ nào chưa tra được thì ghi thẳng là chưa tra được.' },

    { ma: 'GV-R9', t: 'Quan hệ giữa tham gia dự án Gen Việt và phát triển phẩm chất công dân, phụng sự cộng đồng',
      truc: 'Giai đoạn 11 · Tuyến Xã hội và phụng sự', mau: '#0B7350',
      n: 'Tuyến phụng sự là tuyến duy nhất mà bằng chứng do người ngoài hệ ký, nên nó là tuyến có dữ liệu tầng 3 sẵn nhất. Khoảng trống: hệ đang đếm số dự án và số giờ, tức là đếm đầu vào. Chưa ai nối con số đầu vào ấy với thay đổi ở phía đứa trẻ. Và chưa ai xử lý câu hỏi khó: có thể em vốn đã có trách nhiệm nên mới tham gia nhiều, chứ không phải tham gia nhiều nên có trách nhiệm.',
      lam: 'Bước 1: đo nền cho toàn bộ danh sách đăng ký, gồm cả những em chưa tới lượt. Bước 2: chốt bộ chỉ số kết quả ưu tiên tầng 3 — phiếu “tôi đã giúp” có chữ ký người nhận, biên bản nghiệm thu ngoài, số hoạt động tự khởi xướng. Bước 3: theo nhóm tham gia và nhóm chờ song song, cùng lịch đo. Bước 4: khi nhóm chờ tới lượt thì đo họ trước và sau, để có thêm so sánh trong cùng người. Bước 5: phỏng vấn sâu 8–10 em và 3–5 người thụ hưởng, mã hoá theo chủ đề. Bước 6: viết kết luận bằng ngôn ngữ tương quan, không viết bằng ngôn ngữ nhân quả.',
      xn: 'Người thụ hưởng ngoài trường ký biên bản nghiệm thu — đây là chữ ký nặng nhất trong hồ sơ. Giáo viên chủ nhiệm đánh giá hành vi ở lớp. Không ai trong ban tổ chức dự án được chấm chính dự án mình tổ chức.',
      vi: 'Rủi ro lớn nhất: CHIỀU NHÂN QUẢ NGƯỢC và tự chọn mẫu. Em nào sẵn tinh thần trách nhiệm thì đăng ký dự án nhiều hơn, nên tương quan xuất hiện ngay cả khi dự án chẳng làm gì cả. Không có cách nào loại bỏ hoàn toàn trong khuôn khổ trường học, chỉ giảm được: đo nền thật kỹ, dùng nhóm chờ, và so mỗi em với chính mình. Kết luận phải nói rõ mức giới hạn này — hội đồng đánh giá cao đề tài dám nói, và đánh trượt đề tài giấu.' },

    { ma: 'GV-R10', t: 'Lộ trình Gen Việt → cán bộ gương mẫu → vai trò dẫn dắt: pipeline phát triển nhân tài trẻ',
      truc: 'Pipeline P1 → P5 chạy trên 15 giai đoạn', mau: '#5140B4',
      n: 'Pipeline năm bậc đã có mô tả đầy đủ nhưng chưa có một con số nào về dòng chảy thật: bao nhiêu em lên được bậc kế, mất bao lâu, rơi ở đâu. Khoảng trống: hệ có bảng tiêu chí nhưng không có tỷ lệ chuyển bậc và không có thời gian trung vị. Thiếu hai con số đó thì không ai lập kế hoạch nhân sự được, và cũng không ai biết bậc nào đang nghẽn.',
      lam: 'Bước 1: chốt định nghĩa “đã lên bậc” bằng bằng chứng cụ thể cho từng bậc, viết ra trước khi theo dõi. Bước 2: lập sổ theo dõi khoá, mỗi em một dòng, chốt sổ mỗi quý. Bước 3: ghi ngày lên bậc, không ghi ước lượng. Bước 4: mọi em rời hệ đều phải có phỏng vấn thoát ngắn và một dòng lý do — đây là bước hay bị bỏ nhất và cũng là bước quyết định giá trị đề tài. Bước 5: sau 24 tháng, tính tỷ lệ chuyển bậc, thời gian trung vị, và xem chỉ số nào ở P1–P2 đi cùng với việc đạt P4. Bước 6: kiểm lại kết luận trên một khoá khác trước khi nhân rộng.',
      xn: 'Hội đồng công nhận bậc gồm ba người, có ít nhất một người ngoài CLB đó. Biên bản bàn giao nhiệm kỳ có chữ ký người nhận. Phiếu 360° thu từ bạn, thầy cô và ban điều hành, người tổng hợp không phải người đang giữ ghế.',
      vi: 'Rủi ro lớn nhất: THIÊN LỆCH SỐNG SÓT. Nếu chỉ đếm những em còn ở lại thì mọi pipeline đều cho tỷ lệ đẹp, vì người rơi đã biến mất khỏi mẫu. Đề tài chỉ có giá trị nếu mẫu số là toàn bộ khoá vào ban đầu, kể cả người bỏ. Rủi ro thứ hai: tự ứng nghiệm — người chấm bậc cũng là người kèm, nên em nào được kỳ vọng sẽ được chấm rộng tay hơn. Vì thế hội đồng công nhận bậc bắt buộc có người ngoài.' }
  ];

  /* ── 3 · Đạo đức nghiên cứu khi đối tượng là trẻ vị thành niên
     Đối tượng của cả mười đề tài là học sinh 12–15 tuổi. Ở tuổi
     đó các em chưa tự ký được đồng ý pháp lý, nhưng đã đủ hiểu
     để từ chối — và quyền từ chối ấy phải được tôn trọng thật.
     Mọi điều dưới đây phải nằm trong đề cương trước khi thu số
     liệu đầu tiên, không phải bổ sung sau. */
  G.NC_DAO_DUC = [
    'Cha mẹ hoặc người giám hộ ký ĐỒNG Ý bằng văn bản trước khi em tham gia. Phiếu đồng ý phải ghi rõ: đề tài đo cái gì, thu dữ liệu nào, ai được xem, giữ bao lâu, và số điện thoại của người chịu trách nhiệm. Phiếu ký một lần cho cả chu kỳ, nhưng phải nhắc lại nội dung ở mỗi mốc đo.',
    'Chính đứa trẻ phải ĐỒNG THUẬN, tách khỏi chữ ký của cha mẹ. Hỏi bằng câu em hiểu được, không đọc phiếu người lớn. Cha mẹ đồng ý mà em không đồng thuận thì KHÔNG thu dữ liệu của em đó. Không có ngoại lệ cho lý do “bố mẹ đã ký rồi”.',
    'Quyền rút khỏi nghiên cứu bất cứ lúc nào, không phải giải thích, và KHÔNG BỊ THIỆT gì: vẫn sinh hoạt CLB đầy đủ, vẫn được xét bậc, vẫn nhận mọi hoạt động như bạn khác. Nếu rút mà mất quyền lợi thì đồng thuận ban đầu chỉ là hình thức.',
    'Em rút giữa chừng thì dữ liệu đã thu của em được huỷ theo yêu cầu, trừ phần đã gộp vào bảng tổng hợp ẩn danh không tách ra được — và phải nói trước điều này ngay từ lúc xin đồng thuận, không nói sau.',
    'Dữ liệu ẩn danh ngay tại bước nhập: mỗi em một mã, bảng nối mã với tên giữ riêng, khoá lại, chỉ hai người có quyền mở. Bảng phân tích không bao giờ chứa tên, lớp và tên trường cùng lúc.',
    'Nhóm đối chứng KHÔNG ĐƯỢC THIỆT VỀ GIÁO DỤC. Họ nhận đầy đủ chương trình chuẩn của nhà trường; cái họ không nhận chỉ là phần can thiệp đang được thử. Nếu can thiệp cho kết quả tốt thì sau chu kỳ nghiên cứu phải mở cho nhóm đối chứng — điều này ghi vào đề cương ngay từ đầu, không hứa miệng.',
    'Không ai bị giữ lại trong danh sách chờ chỉ để làm nhóm đối chứng. Danh sách chờ dùng làm nhóm so sánh chỉ khi nó đã tồn tại vì lý do vận hành thật.',
    'Không công bố ảnh, video, tên, tên lớp, tên trường hay bất kỳ chi tiết nào đủ để nhận ra một em cụ thể. Một câu chuyện ca có thể nhận ra người dù đã đổi tên — nếu muốn kể thì phải có văn bản đồng ý riêng của cả em và cha mẹ, ký sau khi đã đọc bản viết cuối.',
    'Không dùng dữ liệu nghiên cứu để tuyển sinh, để quảng bá, hay để xét bậc cho chính em đó. Dữ liệu thu vì nghiên cứu chỉ dùng cho nghiên cứu.',
    'Người thu dữ liệu không được là người có quyền cho điểm hay xét bậc của em đó tại thời điểm thu. Trẻ trả lời khác đi khi biết người hỏi cầm quyền chấm mình.',
    'Nếu trong lúc thu dữ liệu phát hiện dấu hiệu em bị bạo lực, bị bắt nạt, hoặc có nguy cơ tự hại — dừng vai trò nghiên cứu, chuyển ngay cho người phụ trách bảo vệ trẻ em theo quy trình của hệ. An toàn của trẻ đứng trên tính toàn vẹn của bộ số liệu.',
    'Đề cương phải được Hội đồng Chuyên môn của Học viện và Ban Giám hiệu nhà trường duyệt trước khi thu số liệu. Thu trước rồi xin duyệt sau là số liệu không dùng được, và hội đồng cấp Sở có quyền loại.',
    'Người tham gia được nghe kết quả. Cuối chu kỳ, tổ chức một buổi báo lại cho học sinh và phụ huynh bằng ngôn ngữ họ hiểu, gồm cả phần không đạt.'
  ];

  /* ── 4 · Chín sai lầm thiết kế hay gặp ───────────────────────
     dau = dấu hiệu nhận biết trong bản đề cương hoặc trong số
     liệu · phanh = việc phải làm, và cái giá nếu không làm. */
  G.NC_SAI_LAM = [

    { t: 'Không có nhóm đối chứng',
      dau: 'Đề cương chỉ có một nhóm, đo trước và sau, rồi kết luận “chương trình có hiệu quả”. Trong bảng số liệu không có cột nào cho nhóm thứ hai. Câu hỏi đỏ: nếu năm nay các em đơn giản là lớn thêm một tuổi thì kết quả có khác đi không?',
      phanh: 'Thêm nhóm không tham gia ở cùng trường cùng khối, hoặc dùng danh sách chờ. Nếu thật sự không có nhóm đối chứng thì phải HẠ CẤP KẾT LUẬN: viết “ghi nhận thay đổi”, không viết “chứng minh hiệu quả”. Không hạ cấp kết luận thì hội đồng hạ hộ, và hạ cả điểm.' },

    { t: 'Chỉ đo bằng tự đánh giá',
      dau: 'Toàn bộ công cụ là phiếu học sinh tự chấm mình, cộng phiếu phụ huynh. Không có một dòng dữ liệu nào do người ngoài ghi. Điểm tự đánh giá tăng đều và đẹp ở mọi chỉ số — dấu hiệu điển hình của việc các em đang trả lời cái mà người hỏi muốn nghe.',
      phanh: 'Mỗi chỉ số chính phải có ít nhất một nguồn tầng 2 hoặc tầng 3 đi kèm: sổ điểm danh, sổ đầu bài, học bạ, biên bản nghiệm thu ngoài, phiếu giáo viên có chữ ký. Giữ tự đánh giá làm tín hiệu sớm, đừng làm bằng chứng kết luận.' },

    { t: 'Cỡ mẫu quá nhỏ',
      dau: 'Nghiên cứu chạy trên 12 em một nhóm rồi báo cáo phần trăm. “Tăng 25%” trên 12 em nghĩa là ba em. Câu hỏi đỏ: một em chuyển trường thì con số của tôi đổi bao nhiêu?',
      phanh: 'Tính cỡ mẫu trước khi thu, không tính sau. Nếu chỉ có mẫu nhỏ thì đừng ép nó thành nghiên cứu định lượng — chuyển sang thiết kế nghiên cứu trường hợp nhiều ca, mô tả sâu từng em, và nói thẳng là không khái quát hoá được. Và không bao giờ công bố phần trăm mà giấu mẫu số.' },

    { t: 'Đo sau mà không đo trước',
      dau: 'Đề cương chỉ có một lần đo, vào cuối chu kỳ, thường vì lúc bắt đầu chưa ai nghĩ tới việc đo. Bảng kết quả không có cột “trước”. Người viết bù bằng cách hỏi các em “em thấy mình tiến bộ hơn hồi đầu năm không” — đó là trí nhớ, không phải số nền.',
      phanh: 'Không có số nền thì mọi con số sau này vô nghĩa. Nếu đã lỡ thì tìm dữ liệu hành chính có sẵn từ trước — học bạ, sổ điểm danh, biên bản vi phạm năm ngoái — làm số nền thay thế, và ghi rõ trong phần hạn chế rằng đây là số nền thay thế.' },

    { t: 'Người dạy đồng thời là người chấm',
      dau: 'Mentor kèm em nào thì chấm rubric cho em đó. Người tổ chức can thiệp cũng là người thu phiếu và nhập số. Điểm của các em trong nhóm can thiệp cao đều một cách khả nghi, kể cả ở những chỉ số can thiệp không hề nhắm tới.',
      phanh: 'Tách vai cứng: người dạy, người đo, người phân tích là ba người. Người chấm không được biết em nào ở nhóm nào khi chấm được. Đây là luật của hệ, không phải khuyến nghị — vi phạm thì huỷ kết quả kỳ đó và chấm lại.' },

    { t: 'Đổi cách đo hoặc dời mốc giữa chừng',
      dau: 'Mốc đo tháng 6 bị lùi sang tháng 9 vì “các em chưa kịp tiến bộ”. Thang 5 mức đổi thành 4 mức giữa chu kỳ. Bảng số liệu có những ô trống mà không ai giải thích được vì sao trống.',
      phanh: 'Chốt lịch đo và bộ công cụ trong đề cương, công bố từ đầu chu kỳ. Muốn đổi thì phải ghi biên bản, nêu lý do, và báo cáo cả hai phiên bản số liệu. Dời mốc vì kết quả chưa đẹp là gian lận số liệu, gọi đúng tên như vậy.' },

    { t: 'Đo trong lúc còn được nhắc rồi gọi đó là thói quen',
      dau: 'Số liệu đẹp nhất rơi đúng vào tuần cuối của chu kỳ can thiệp, khi nhắc nhở dày nhất. Không có mốc đo nào sau khi hỗ trợ đã rút. Kết luận viết “hình thành thói quen bền vững” mà không có dữ liệu nào sau ngày kết thúc.',
      phanh: 'Thêm ít nhất một mốc đo sau khi rút hẳn hỗ trợ, cách chu kỳ can thiệp tối thiểu 60–90 ngày. Đây là phần khó nhất và cũng là phần duy nhất phân biệt thói quen với sự tuân thủ. Không có mốc đó thì đổi từ “thói quen” thành “mức tuân thủ trong chu kỳ”.' },

    { t: 'Trộn nhiều can thiệp rồi không tách được cái nào có tác dụng',
      dau: 'Nhóm can thiệp cùng lúc nhận: bảy bước, mentor, trại hè, thêm hai buổi sinh hoạt mỗi tháng và một bộ đồng phục mới. Kết quả tốt hơn — nhưng nhờ cái nào thì không ai biết, và nhân rộng thì phải bê nguyên cả gói, kể cả phần vô ích.',
      phanh: 'Giữ nhóm can thiệp khác nhóm đối chứng ĐÚNG MỘT YẾU TỐ. Muốn thử nhiều yếu tố thì thêm nhánh, đừng gộp. Nếu buộc phải gộp vì điều kiện thực tế thì ghi thẳng trong phần hạn chế là đề tài đánh giá cả gói, không đánh giá từng thành phần.' },

    { t: 'Chọn nhóm bằng cách để các em tự đăng ký',
      dau: 'Nhóm can thiệp gồm các em xung phong, nhóm đối chứng là phần còn lại. Ngay ở lần đo trước, nhóm can thiệp đã cao hơn ở gần hết các chỉ số. Chênh lệch cuối kỳ có thể chỉ là chênh lệch xuất phát kéo dài.',
      phanh: 'Phân nhóm bằng thứ tự đăng ký, bằng lớp, hoặc bằng bốc thăm — cách nào cũng được, miễn là không do động cơ của chính em quyết định. Nếu buộc phải để tự đăng ký thì đo trước thật kỹ, ghép cặp theo mức xuất phát, và nêu rõ tự chọn mẫu là hạn chế lớn nhất của đề tài.' },

    { t: 'Chỉ báo cáo phần đạt',
      dau: 'Báo cáo có bốn ca thành công kể chi tiết, không có ca nào không đạt. Không có số em bỏ giữa chừng. Không có chỉ số nào đi xuống — điều gần như không xảy ra trong bất kỳ chu kỳ thật nào.',
      phanh: 'Mỗi báo cáo phải có mục “những gì chúng tôi chưa làm được”, số em rời hệ và lý do, và mọi chỉ số đi xuống. Ca thành công được kể thì ca thất bại cũng phải được kể, trong cùng một tài liệu. Hội đồng đọc phần này trước phần kết luận.' }
  ];

  /* ── 5 · Bộ hồ sơ nộp cấp Sở ─────────────────────────────────
     Cột cuối là câu hội đồng thường hỏi ở đúng mục đó. Chuẩn bị
     câu trả lời cho từng dòng trước khi vào phòng bảo vệ. */
  G.NC_HO_SO_SO = [
    ['Mục hồ sơ', 'Nội dung phải có', 'Ai ký', 'Hội đồng thường hỏi gì'],

    ['Phiếu đăng ký đề tài',
      'Tên đề tài đúng như đăng ký, mã GV-R, lĩnh vực, nhóm tác giả tối đa hai học sinh, giáo viên hướng dẫn, đơn vị chủ trì, thời gian thực hiện.',
      'Học sinh tác giả ký · giáo viên hướng dẫn ký · Hiệu trưởng ký và đóng dấu',
      'Tên đề tài có khớp với việc thực tế các em đã làm không? Đề tài này là của học sinh hay của thầy cô?'],

    ['Lý do chọn đề tài và khoảng trống',
      'Vấn đề có thật tại trường, mô tả bằng số hoặc bằng sự việc cụ thể. Nêu rõ cái gì đã có người làm và cái gì còn thiếu. Ba dòng đầu phải gói được toàn bộ.',
      'Giáo viên hướng dẫn xác nhận phần tổng quan',
      'Đã có ai làm cái này chưa? Em đã đọc gì trước khi bắt đầu? Nếu bỏ đề tài này đi thì trường mất gì?'],

    ['Giả thuyết hoặc câu hỏi nghiên cứu',
      'Phát biểu thành MỘT câu, nêu rõ ai — làm gì — thay đổi cái gì — so với ai. Nếu là nghiên cứu mô tả thì ghi thẳng là câu hỏi, không giả vờ có giả thuyết.',
      'Nhóm tác giả và giáo viên hướng dẫn',
      'Giả thuyết của em là gì? Nếu số liệu ra ngược lại thì em kết luận thế nào? Câu này hội đồng hỏi đầu tiên — không trả lời được là hỏng cả buổi.'],

    ['Thiết kế và biến số',
      'Sơ đồ thiết kế, danh sách biến độc lập và biến phụ thuộc, cách phân nhóm, lịch đo đã chốt, và bảng cỡ mẫu từng nhóm.',
      'Giáo viên hướng dẫn · cố vấn chuyên môn',
      'Nhóm đối chứng của em là ai? Vì sao hai nhóm khác nhau ngay từ đầu? Em phân nhóm bằng cách nào?'],

    ['Công cụ đo',
      'Bản in đầy đủ từng công cụ. Với công cụ tự xây: mô tả cách xây, số em đã thử, những mục đã bỏ và vì sao, kết quả thử lại lần hai. KHÔNG viện dẫn thang đo có sẵn mà nhóm chưa mở ra đọc.',
      'Giáo viên hướng dẫn · người thẩm định công cụ ngoài nhóm',
      'Thang này ở đâu ra? Em có chắc nó đo đúng cái em muốn đo không? Em đã thử nó trên bao nhiêu em trước khi dùng thật?'],

    ['Hồ sơ đạo đức nghiên cứu',
      'Mẫu phiếu đồng ý của cha mẹ · mẫu phiếu đồng thuận của học sinh · quy trình ẩn danh dữ liệu · cam kết nhóm đối chứng không thiệt về giáo dục · cam kết không công bố ảnh và thông tin nhận dạng.',
      'Cha mẹ ký từng phiếu · học sinh ký đồng thuận · Hiệu trưởng xác nhận · Hội đồng Chuyên môn duyệt',
      'Các em có biết mình đang được nghiên cứu không? Ai muốn rút thì rút thế nào? Nhóm đối chứng mất gì trong chín tháng đó?'],

    ['Số liệu thô và nhật ký thu số liệu',
      'Bảng số liệu gốc đã ẩn danh, nhật ký ghi ngày thu — ai thu — thu ở đâu, và biên bản mọi lần lệch khỏi kế hoạch ban đầu.',
      'Người thu số liệu ký từng đợt · giáo viên hướng dẫn xác nhận',
      'Cho tôi xem số liệu thô. Vì sao ô này trống? Ai nhập bảng này? Người nhập có phải người dạy không?'],

    ['Xử lý và kết quả',
      'Cách xử lý nêu rõ, bảng và biểu đồ có ghi cỡ mẫu ở từng ô, và mọi chỉ số đều ghi thuộc tầng bằng chứng nào. Cả chỉ số đi xuống cũng phải có trong báo cáo.',
      'Nhóm tác giả · giáo viên hướng dẫn',
      'Phần trăm này trên bao nhiêu em? Có chỉ số nào không cải thiện không? Vì sao mục này không có số liệu tháng 6?'],

    ['Bàn luận và hạn chế',
      'Nói thẳng ba thứ: thiết kế này không kết luận được điều gì, cái gì có thể đã làm sai lệch kết quả, và nếu làm lại thì sửa chỗ nào. Mục hạn chế viết thật là điểm cộng, không phải điểm trừ.',
      'Nhóm tác giả · giáo viên hướng dẫn',
      'Điểm yếu lớn nhất của đề tài em là gì? Nếu tôi nói kết quả này do các em vốn đã giỏi sẵn thì em phản biện thế nào?'],

    ['Sản phẩm ứng dụng',
      'Hiện vật thật: bộ công cụ, quy trình, tài liệu tập huấn, biểu mẫu — kèm bằng chứng đã dùng ở đâu, cho bao nhiêu người, trong bao lâu.',
      'Chủ nhiệm CLB · cố vấn chuyên môn · Hiệu trưởng xác nhận đã áp dụng',
      'Sản phẩm này đang được ai dùng? Trường khác cầm về có dùng ngay được không? Cần tập huấn bao nhiêu buổi?'],

    ['Căn cứ và tài liệu tham khảo',
      'Chỉ ghi văn bản và tài liệu nhóm đã mở ra đọc. Số hiệu phải tra và điền đúng. Chỗ chưa tra được thì để trống và nói rõ, không đoán.',
      'Giáo viên hướng dẫn chịu trách nhiệm về phần trích dẫn',
      'Điều nào của văn bản này cho phép điều em vừa nói? Em đã đọc bản gốc chưa? Trích sai một số hiệu là mất tin cậy cả hồ sơ.'],

    ['Kế hoạch nhân rộng',
      'Quy trình, tài liệu, biểu mẫu và chương trình tập huấn đủ để một trường khác triển khai mà không cần nhóm tác giả có mặt. Kèm dự toán và mốc thời gian.',
      'Chủ nhiệm CLB · Ban Giám hiệu',
      'Không có các em thì mô hình này còn chạy không? Chi phí một trường triển khai là bao nhiêu? Đây là mục hội đồng đọc kỹ nhất ở phần cuối.']
  ];

  /* ── 6 · Mười bốn luật làm nghiên cứu ứng dụng trong trường ── */
  G.NC_LUAT = [
    'Viết giả thuyết TRƯỚC khi thu số liệu, và ghi ngày. Giả thuyết viết sau khi đã nhìn số liệu thì bao giờ cũng đúng, và bao giờ cũng vô giá trị.',
    'Một câu giả thuyết phải nêu đủ bốn thứ: ai — làm gì — thay đổi chỉ số nào — so với ai. Thiếu vế “so với ai” thì đó là mong muốn, không phải giả thuyết.',
    'Đề tài không đo được thì đổi đề tài, đừng đổi cách nói. “Nâng cao nhận thức” không đo được. “Số em tự nhận một vai trò trong lớp” thì đo được.',
    'Nhóm can thiệp và nhóm đối chứng chỉ được khác nhau ĐÚNG MỘT YẾU TỐ — cái yếu tố đang thử. Khác hai thứ trở lên là không kết luận được về thứ nào.',
    'Người dạy, người đo và người phân tích là ba vai khác nhau. Trùng vai nào thì ghi rõ vào phần hạn chế, và hội đồng sẽ trừ đúng chỗ đó.',
    'Mọi con số công bố phải ghi *thuộc tầng bằng chứng nào* và *cỡ mẫu bao nhiêu*. Tự thuật là tầng 1, quan sát bên thứ ba là tầng 2, hành vi đếm được ngoài hệ là tầng 3. Nhập nhèm tầng là một hình thức nói dối.',
    'Không công bố phần trăm mà giấu mẫu số. Trên hai mươi em thì đếm bằng người, đừng đếm bằng phần trăm.',
    'Lịch đo chốt từ đầu chu kỳ và công bố. Không dời mốc vì kết quả chưa đẹp. Nếu buộc phải dời thì ghi biên bản nêu lý do và báo cáo cả hai bản số liệu.',
    'Số liệu thô được giữ nguyên, ẩn danh, và mở cho ngoại kiểm. Bảng phân tích có thể sửa, số liệu thô thì không.',
    'Mục hạn chế phải viết thật và viết trước mục kết luận. Đề tài nói rõ mình không kết luận được điều gì thì được tin ở phần còn lại.',
    'Ca thành công được kể thì ca không đạt cũng phải được kể, trong cùng một tài liệu, cùng độ chi tiết.',
    'Chỉ trích dẫn văn bản và tài liệu đã mở ra đọc. Trích sai số hiệu nguy hiểm hơn trích ít. Chỗ chưa tra được thì ghi thẳng là chưa tra được.',
    'Mọi đề tài phải cho ra một SẢN PHẨM ỨNG DỤNG dùng được trong CLB — bộ công cụ, quy trình hoặc tài liệu tập huấn. Không làm nghiên cứu để lấy giấy.',
    'An toàn và quyền của đứa trẻ đứng trên tính toàn vẹn của bộ số liệu. Mất một mẫu thì sửa được ở chu kỳ sau; làm tổn thương một em thì không sửa được.',
    'Đề tài mới, thang đo mới và quy trình mới đều phải qua Hội đồng Chuyên môn trước khi chạy thật. Thử trên trẻ trước khi được duyệt là vi phạm, không phải sáng kiến.',
    'Kết quả phải được báo lại cho chính học sinh và phụ huynh đã tham gia, bằng ngôn ngữ họ hiểu, gồm cả phần không đạt. Người cho dữ liệu có quyền biết dữ liệu ấy đã nói gì.'
  ];

})(window.GV = window.GV || {});
