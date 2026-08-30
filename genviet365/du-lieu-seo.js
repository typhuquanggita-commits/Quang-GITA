/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · TÌM THẤY ĐƯỢC VÀ ĐÁNG TIN
   Kho này nói về việc đưa GEN VIỆT lên đầu kết quả tìm kiếm — nhưng
   nói theo đúng cách hệ này nói về mọi thứ khác: bằng bằng chứng,
   không bằng thủ thuật.

   Một điều phải nói thẳng ngay dòng đầu: không ai — kể cả Google —
   bảo đảm được vị trí số một. Thứ làm được là làm cho trang này trở
   thành câu trả lời TỐT NHẤT hiện có cho một câu hỏi cụ thể, rồi để
   máy tìm kiếm không có lựa chọn nào tốt hơn. Toàn bộ kho này phục
   vụ một việc đó.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Bảy nguyên tắc ───────────────────────────────────── */
  G.SE_NGUYEN_TAC = [
    { so: '1', t: 'Xếp hạng là hệ quả, không phải mục tiêu',
      n: 'Mục tiêu là trở thành câu trả lời tốt nhất cho một câu hỏi thật của một người thật.',
      v: 'Mọi thủ thuật xếp hạng đều có tuổi thọ ngắn hơn một thuật toán. Chất lượng thì không.' },
    { so: '2', t: 'Không viết cho máy đọc',
      n: 'Không nhồi từ khoá, không viết trang mỏng chỉ để phủ từ khoá, không xoay vòng nội dung cũ thành bài mới.',
      v: 'Máy tìm kiếm ngày càng giỏi nhận ra trang viết cho máy. Người đọc thì giỏi việc đó từ lâu rồi.' },
    { so: '3', t: 'Mỗi lời hứa trên trang phải có chỗ chứng minh',
      n: 'Nói "hệ 15 giai đoạn" thì phải có màn liệt kê đủ 15. Nói "kiểm định 100 điểm" thì phải có bảng chấm.',
      v: 'Đây là thứ phân biệt một trang giáo dục thật với một trang quảng cáo — và cũng là thứ E-E-A-T đo.' },
    { so: '4', t: 'Không mua đánh giá, không xin đánh giá kèm quà',
      n: 'Chỉ xin phản hồi ở đúng thời điểm gia đình vừa thấy một kết quả cụ thể, và xin cả khi biết họ sẽ chê.',
      v: 'Một trang toàn năm sao không có lấy một lời chê là dấu hiệu đầu tiên người đọc nhận ra là giả.' },
    { so: '5', t: 'Trả lời cả câu hỏi bất lợi',
      n: 'Giá bao nhiêu, không phù hợp với ai, có gì không làm được — trả lời thẳng trên trang.',
      v: 'Người đang cân nhắc gõ đúng những câu này. Ai trả lời trước thì được tin trước.' },
    { so: '6', t: 'Nhanh và đọc được trên điện thoại là điều kiện cần',
      n: 'Không có ảnh nặng, không có thư viện ngoài, không có bố cục nhảy khi tải xong.',
      v: 'Phần lớn phụ huynh tìm hiểu về con vào buổi tối, trên điện thoại, bằng đường truyền không tốt.' },
    { so: '7', t: 'Một trang, một câu hỏi',
      n: 'Mỗi màn trong hệ này trả lời trọn vẹn một câu hỏi và tự đứng được khi ai đó vào thẳng bằng đường dẫn.',
      v: 'Người tìm kiếm không bao giờ vào từ trang chủ. Họ rơi thẳng vào giữa, nên chỗ nào cũng phải là cửa vào tử tế.' }
  ];

  /* ── 2 · Bản đồ ý định tìm kiếm ───────────────────────────── */
  G.SE_Y_DINH = [
    ['Phụ huynh đang lo', 'con thiếu tự tin phải làm sao · rèn tính tự lập cho con · con không có chính kiến', 'Đang tìm cách xử lý một vấn đề cụ thể, chưa tìm chương trình', 'Màn phẩm chất và tuyến gia đình 90 ngày', 'Nhật ký 5S và ba danh hiệu — thứ làm được ở nhà ngay tối nay'],
    ['Phụ huynh đang chọn', 'chương trình rèn luyện lãnh đạo cho học sinh · câu lạc bộ kỹ năng cho con · học kỳ quân đội hay clb nào tốt', 'So sánh vài lựa chọn, cần lý do để loại bớt', 'Màn định vị hai hệ và màn không phù hợp với ai', 'Bảng so sánh và phần nói rõ giới hạn'],
    ['Nhà trường', 'thành lập câu lạc bộ trong trường · mô hình clb học sinh · hoạt động trải nghiệm hướng nghiệp lớp 6', 'Cần một mô hình có hồ sơ đủ để trình lãnh đạo', 'Màn đề án CLB và màn ánh xạ chuẩn quốc gia', 'Căn cứ pháp lý và bảng ánh xạ Chương trình 2018'],
    ['Giáo viên', 'giáo án kỹ năng sống lớp 3 · chuyên đề sinh hoạt clb · kịch bản buổi sinh hoạt lớp', 'Cần vật liệu dùng được vào tuần sau', 'Màn 12 khối lớp và 52 tuần chuyên đề', 'Mã chuyên đề GV<khối>.<nhóm>.<số> tra được'],
    ['Học sinh', 'đề tài nghiên cứu khoa học kỹ thuật học sinh · làm dự án cộng đồng · kỹ năng lãnh đạo tuổi teen', 'Tìm thứ tự làm được, không muốn bị dạy dỗ', 'Màn 10 đề tài GV-R và tuyến hoạt động xã hội', 'Đề tài có sản phẩm ứng dụng và đăng ký được cấp Sở'],
    ['Nhà đầu tư', 'nhượng quyền giáo dục kỹ năng · mô hình nhượng quyền clb học đường · chi phí nhượng quyền trung tâm', 'Đánh giá cơ hội, rất nhạy với chỗ nói vòng', 'Màn bốn gói nhượng quyền và màn cấu trúc phí', 'Nói thẳng bảy điều Học viện từ chối'],
    ['Đối tác và báo chí', 'gen việt học viện gita · đề án ươm mầm gen việt · trương nhật quang gita', 'Kiểm chứng đơn vị này có thật và làm thật không', 'Màn tổng quan và màn nguồn tài liệu', 'Mười bốn nguồn có tên, có ngày đọc'],
    ['Người đã biết tên', 'gen việt 365 · clb gen việt · genviet365', 'Đã nghe qua, muốn vào đúng chỗ', 'Trang chủ và ô tìm trong hệ', 'Điều hướng 27 nhóm hiện ngay, tìm được bằng cách gõ không dấu']
  ];

  /* ── 3 · Kiến trúc cụm nội dung ───────────────────────────── */
  G.SE_CUM = [
    { m: 'Cụm 1', t: 'Rèn phẩm chất cho con', v: [
      'Trụ: năm phẩm chất Đức · Dũng · Trí · Chủ · Chí',
      'Vệ tinh: tuyến gia đình 90 ngày · văn hoá 5S · nhật ký · ba danh hiệu',
      'Câu hỏi cụm trả lời: làm gì ở nhà, bắt đầu từ tối nay' ]},
    { m: 'Cụm 2', t: 'Câu lạc bộ trong trường', v: [
      'Trụ: mô hình CLB Gen Việt mười cấp độ',
      'Vệ tinh: 12 Ban · kịch bản sinh hoạt · 52 tuần chuyên đề · đề án thành lập',
      'Câu hỏi cụm trả lời: trình lãnh đạo nhà trường bằng hồ sơ nào' ]},
    { m: 'Cụm 3', t: 'Chương trình theo khối lớp', v: [
      'Trụ: mười hai khối lớp và năm nhóm cố định',
      'Vệ tinh: giáo án từng buổi · mã chuyên đề · ánh xạ Chương trình 2018',
      'Câu hỏi cụm trả lời: tuần sau dạy gì, lấy ở đâu' ]},
    { m: 'Cụm 4', t: 'Bằng chứng và kiểm định', v: [
      'Trụ: ba tầng bằng chứng',
      'Vệ tinh: hộ chiếu nhân tài · cổng nghiệm thu 100 điểm · mười đề tài GV-R',
      'Câu hỏi cụm trả lời: lấy gì chứng minh chương trình này có tác dụng' ]},
    { m: 'Cụm 5', t: 'Nhượng quyền và mở điểm', v: [
      'Trụ: bốn gói nhượng quyền',
      'Vệ tinh: hành trình 180 ngày · cấu trúc phí · lãnh thổ · mười sáu điều khoản',
      'Câu hỏi cụm trả lời: mở một điểm thì cầm gì, mất quyền khi nào' ]},
    { m: 'Cụm 6', t: 'Nguồn gốc và độ tin cậy', v: [
      'Trụ: Học viện GITA và đề án Ươm Mầm Gen Việt',
      'Vệ tinh: mười bốn nguồn tài liệu · căn cứ pháp lý · hồ sơ bản quyền · bộ nhận diện',
      'Câu hỏi cụm trả lời: đơn vị này là ai và dựa vào đâu mà nói' ]}
  ];

  /* ── 4 · Bốn tín hiệu E-E-A-T ─────────────────────────────── */
  G.SE_EEAT = [
    { t: 'Experience · từng trải qua', n: 'Google ưu tiên nội dung viết bởi người đã thật sự làm việc đó, không phải người tổng hợp lại.',
      vi: 'Hệ này chứng minh bằng: 65 tài liệu gốc có tên và ngày đọc · giáo án từng buổi đã dạy · biên bản chỉnh sau sáu buổi chạy thử. Không có phần nào viết ra từ suy đoán mà không ghi rõ là suy đoán.' },
    { t: 'Expertise · có chuyên môn', n: 'Người viết có nền chuyên môn tương xứng với chủ đề, và nền đó kiểm chứng được.',
      vi: 'Hệ này chứng minh bằng: khung năng lực 4 trụ × 12 trục × 5 mức · lộ trình nghề Coach có chuẩn dự giờ · năm học phần đào tạo có bài thi và ngưỡng đạt.' },
    { t: 'Authoritativeness · được thừa nhận', n: 'Người khác trong lĩnh vực dẫn lại, nhắc tới, hoặc công nhận.',
      vi: 'Hệ này chứng minh bằng: căn cứ pháp lý dẫn đúng số hiệu văn bản · mười đề tài đăng ký được cấp Sở · dự án phụng sự có người thụ hưởng xác nhận · danh bạ điểm đạt chuẩn công khai kỳ kiểm định gần nhất.' },
    { t: 'Trustworthiness · đáng tin', n: 'Trọng số cao nhất trong bốn tín hiệu. Nói rõ mình là ai, sai thì sửa công khai, và không giấu điều bất lợi.',
      vi: 'Hệ này chứng minh bằng: mỗi gói đều có mục *không phù hợp với ai* · bảy điều Học viện từ chối làm · mọi cam kết dịch vụ đều kèm ngưỡng và khoản đền · mã bản dựng và ngày dựng in ngay trên đầu trang.' }
  ];

  /* ── 5 · SEO kỹ thuật · mười hai hạng mục ────────────────── */
  G.SE_KY_THUAT = [
    ['Thẻ tiêu đề', 'Dưới 60 ký tự, đặt từ khoá chính trước, có tên thương hiệu sau dấu ngăn', 'Sinh theo từng màn từ trường t của GV.MAN, ghép với hậu tố GEN VIỆT 365'],
    ['Thẻ mô tả', '140–160 ký tự, nói thứ trang này trả lời, không nhồi từ khoá', 'Lấy từ trường p — câu dẫn của màn, vốn đã viết cho người đọc'],
    ['Một thẻ h1 mỗi trang', 'Đúng một, trùng ý với thẻ tiêu đề', 'Tiêu đề màn đã là h1 từ bản trước; bộ kiểm chặn mọi màn thiếu h1'],
    ['Thứ bậc tiêu đề không nhảy cấp', 'h1 → h2 → h3, không bỏ cấp', 'Khối muc dựng ra h2, thẻ trong khối dựng ra h3'],
    ['Đường dẫn nói được nghĩa', 'Chữ thường, không dấu, ngăn bằng gạch nối, không tham số dài', 'Mã màn vốn đã là chuỗi không dấu có gạch nối: #tuyen-clb-cap, #nq-goi'],
    ['Thẻ chuẩn tắc', 'Mỗi nội dung có đúng một địa chỉ chuẩn, tránh trùng lặp giữa bản đầy đủ và bản cắt', 'Bản cắt theo vai gắn thẻ chuẩn tắc trỏ về bản đầy đủ'],
    ['Dữ liệu có cấu trúc', 'Khai báo tổ chức, chương trình đào tạo, câu hỏi thường gặp và đường dẫn phân cấp theo schema.org', 'Sinh tự động từ kho vào thẻ script kiểu ld+json'],
    ['Thẻ chia sẻ mạng xã hội', 'Tiêu đề, mô tả, ảnh 1200×630 và tên trang', 'Ảnh chia sẻ dựng từ chính bộ nhận diện, không dùng ảnh chụp màn hình'],
    ['Bản đồ trang và tệp chặn', 'Liệt kê mọi địa chỉ công khai; chặn bản cắt theo vai khỏi lập chỉ mục', 'Bản cắt gắn thẻ noindex trong lớp gộp'],
    ['Tốc độ tải', 'Ngưỡng Core Web Vitals: LCP dưới 2,5 giây · INP dưới 200 mili giây · CLS dưới 0,1', 'Một tệp, không thư viện ngoài, không phông tải từ máy chủ khác, không ảnh bitmap'],
    ['Đọc được trên điện thoại', 'Không tràn ngang ở 390 điểm ảnh, chạm được bằng ngón tay', 'Bộ kiểm soi tràn ngang ở ba khổ màn trong mỗi lần dựng'],
    ['Tiếp cận được', 'Tương phản chữ đạt WCAG AA 4.5:1, đi được bằng bàn phím, có nhãn cho ảnh', 'Bộ kiểm chấm tương phản tám mã màu chữ trên cả hai chế độ sáng tối']
  ];

  /* ── 6 · Hệ phản hồi năm sao ──────────────────────────────── */
  G.SE_PHAN_HOI = [
    { v: '1', t: 'Chọn đúng thời điểm hỏi', dk: 'Gia đình vừa chứng kiến một kết quả cụ thể — con tự dậy sớm được hai tuần, hoặc vừa đứng trước lớp lần đầu',
      duoc: 'Lời khen viết ra có chi tiết thật, không phải câu chung chung', bac: 'Không hỏi sau buổi khai giảng' },
    { v: '2', t: 'Hỏi bằng một câu mở', dk: 'Không hỏi "cho chúng tôi năm sao nhé" mà hỏi "điều gì thay đổi ở con anh chị trong ba tháng qua"',
      duoc: 'Câu trả lời có nội dung, dùng lại được, và tự nó thuyết phục', bac: 'Không gợi ý số sao' },
    { v: '3', t: 'Không đổi phản hồi lấy quyền lợi', dk: 'Không giảm học phí, không tặng quà, không ưu tiên suất học cho người đánh giá',
      duoc: 'Phản hồi giữ được giá trị làm bằng chứng', bac: 'Vi phạm chính sách nền tảng và làm hỏng chính thứ mình đang xây' },
    { v: '4', t: 'Xin cả khi biết sẽ bị chê', dk: 'Gửi lời mời phản hồi cho toàn bộ gia đình kết thúc chu kỳ, không lọc trước',
      duoc: 'Tỷ lệ sao thấp hơn nhưng đáng tin hơn, và người đọc nhận ra điều đó', bac: 'Lọc trước là hành vi bị phạt trên hầu hết nền tảng' },
    { v: '5', t: 'Trả lời mọi phản hồi dưới ba sao trong 48 giờ', dk: 'Trả lời công khai, nêu đúng việc đã làm để sửa, không tranh cãi và không nhắc tên trẻ',
      duoc: 'Người đang cân nhắc đọc phần trả lời kỹ hơn đọc lời khen', bac: 'Im lặng trước một lời chê có sức nặng hơn chính lời chê ấy' },
    { v: '6', t: 'Đưa phản hồi vào vòng cải tiến', dk: 'Mỗi quý gom phản hồi thành danh sách điểm yếu, đưa vào cùng bảng với kết quả kiểm định',
      duoc: 'Lần sau trả lời được: điều anh chị góp tháng trước đã sửa như sau', bac: 'Phản hồi không dẫn tới thay đổi nào thì lần sau không ai buồn viết nữa' }
  ];

  /* ── 7 · Luật phản hồi ────────────────────────────────────── */
  G.SE_PH_LUAT = [
    'Không mua, không đổi, không tự viết phản hồi. Một lần bị phát hiện là mất toàn bộ vốn tin cậy đã tích trong nhiều năm.',
    'Không xoá phản hồi tiêu cực trung thực. Chỉ báo cáo phản hồi sai sự thật, và báo cáo bằng bằng chứng.',
    'Không bao giờ nhắc tên hoặc chi tiết nhận dạng của một đứa trẻ trong phần trả lời công khai.',
    'Không trả lời phản hồi tiêu cực trong ngày đang giận. Trả lời trong 48 giờ, nhưng không trong hai giờ đầu.',
    'Mọi lời trích dẫn phản hồi lên trang phải có văn bản đồng ý của người viết, lưu lại được.',
    'Không gộp điểm trung bình của nhiều điểm nhượng quyền thành một con số chung. Mỗi điểm chịu trách nhiệm về điểm của mình.'
  ];

  /* ── 8 · Tám chỉ số phải đo ──────────────────────────────── */
  G.SE_DO = [
    ['Lần hiện ra trong kết quả tìm kiếm', 'Google Search Console', 'Hằng tuần', 'Đo mức được máy tìm kiếm biết tới — chỉ số đi trước mọi chỉ số khác'],
    ['Vị trí trung bình theo cụm', 'Google Search Console, lọc theo sáu cụm nội dung', 'Hằng tuần', 'Đo theo cụm, không đo theo từ khoá đơn lẻ — từ khoá đơn lẻ dao động vô nghĩa'],
    ['Tỷ lệ nhấp trên mỗi vị trí', 'Google Search Console', 'Hai tuần một lần', 'Thấp bất thường so với vị trí nghĩa là thẻ tiêu đề hoặc mô tả chưa nói đúng thứ người ta cần'],
    ['Câu người ta thật sự gõ', 'Báo cáo truy vấn, đọc bằng mắt chứ không chỉ nhìn số', 'Hằng tháng', 'Nguồn tốt nhất để biết nên viết màn tiếp theo về gì'],
    ['Core Web Vitals thực địa', 'Chrome UX Report', 'Hằng tháng', 'Số đo trên máy người dùng thật, không phải số đo trong phòng thí nghiệm'],
    ['Chiều sâu đọc trong một lần vào', 'Số màn xem trong một phiên', 'Hằng tháng', 'Người vào bằng tìm kiếm mà đọc tiếp màn thứ hai là dấu hiệu nội dung đúng ý định'],
    ['Số phản hồi mới và điểm trung bình', 'Nền tảng đánh giá', 'Hằng tháng', 'Đo cả số lượng lẫn tỷ lệ trả lời — tỷ lệ trả lời quan trọng hơn điểm'],
    ['Số nơi khác dẫn lại có ghi nguồn', 'Rà thủ công và công cụ theo dõi', 'Hằng quý', 'Tín hiệu thừa nhận thật; một lần được dẫn từ nguồn ngành giá trị hơn trăm lần tự đăng']
  ];

  /* ── 9 · Chín mươi ngày ───────────────────────────────────── */
  G.SE_90 = [
    { q: 'Đ1', chu: 'Dựng nền', tuan: 'Ngày 1–30', mau: '#185AB4', moc: [
      { t: 'Tuần 1', v: 'Sinh thẻ tiêu đề, thẻ mô tả và dữ liệu có cấu trúc cho toàn bộ màn' },
      { t: 'Tuần 2', v: 'Bản đồ trang, thẻ chuẩn tắc, chặn lập chỉ mục bản cắt theo vai' },
      { t: 'Tuần 3', v: 'Khai báo Search Console, gửi bản đồ trang, đo Core Web Vitals lần đầu' },
      { t: 'Tuần 4', v: 'Dựng trang hồ sơ đơn vị: là ai, ở đâu, dựa vào đâu — trang mà E-E-A-T đọc trước tiên' } ]},
    { q: 'Đ2', chu: 'Phủ ý định', tuan: 'Ngày 31–60', mau: '#0B7350', moc: [
      { t: 'Tuần 5–6', v: 'Rà tám nhóm ý định, đối chiếu với màn hiện có, ghi ra chỗ chưa ai trả lời' },
      { t: 'Tuần 7', v: 'Viết bù các màn còn thiếu, ưu tiên cụm phụ huynh đang lo và nhà trường' },
      { t: 'Tuần 8', v: 'Nối chéo trong sáu cụm: mỗi màn dẫn tới ít nhất hai màn cùng cụm' } ]},
    { q: 'Đ3', chu: 'Dựng tin cậy', tuan: 'Ngày 61–90', mau: '#A8801F', moc: [
      { t: 'Tuần 9', v: 'Mở hệ phản hồi: gửi lời mời cho toàn bộ gia đình vừa kết thúc chu kỳ, không lọc' },
      { t: 'Tuần 10', v: 'Công bố danh bạ điểm đạt chuẩn, có mã điểm và kỳ kiểm định gần nhất' },
      { t: 'Tuần 11', v: 'Đưa mười bốn nguồn và căn cứ pháp lý lên một màn công khai dẫn được' },
      { t: 'Tuần 12', v: 'Đọc lại báo cáo truy vấn, chọn ba câu hỏi mới cho chu kỳ sau' } ]}
  ];

  /* ── 10 · Bảy việc không làm ─────────────────────────────── */
  G.SE_KHONG = [
    'Không mua liên kết, không trao đổi liên kết, không đăng bài trên mạng lưới trang rác.',
    'Không dựng trang riêng cho từng tỉnh chỉ khác nhau ở tên tỉnh.',
    'Không dùng chữ trắng trên nền trắng, không giấu từ khoá dưới lớp che.',
    'Không nhét nội dung do máy sinh hàng loạt mà không có người đọc lại và chịu trách nhiệm.',
    'Không hứa một vị trí xếp hạng cho bên nhận quyền — không ai bảo đảm được điều đó.',
    'Không dùng tên chương trình khác làm từ khoá so sánh để hút người tìm.',
    'Không đặt bất kỳ nội dung nào về một đứa trẻ cụ thể lên trang công khai để lấy lượt xem.'
  ];


  /* ── 11 · Dữ liệu có cấu trúc · mẫu khai báo ─────────────── */
  G.SE_SCHEMA = [
    '{',
    '  "@context": "https://schema.org",',
    '  "@graph": [',
    '    { "@type": "EducationalOrganization",',
    '      "@id": "https://genviet365.vn/#hocvien",',
    '      "name": "Học viện GITA",',
    '      "alternateName": "GEN VIỆT 365",',
    '      "slogan": "Gen Việt Thắp Sáng Vươn Mình",',
    '      "description": "Hệ điều hành phát triển con người: 15 giai đoạn, 5 tuyến vận hành, 12 khối lớp.",',
    '      "areaServed": "VN",',
    '      "knowsAbout": ["giáo dục phẩm chất", "câu lạc bộ học đường", "huấn luyện lãnh đạo trẻ"] },',
    '',
    '    { "@type": "EducationalOccupationalProgram",',
    '      "@id": "https://genviet365.vn/#chuongtrinh",',
    '      "name": "GEN VIỆT 365",',
    '      "provider": { "@id": "https://genviet365.vn/#hocvien" },',
    '      "educationalProgramMode": "part-time",',
    '      "programPrerequisites": "Học sinh phổ thông từ lớp 1 đến lớp 12",',
    '      "occupationalCategory": "Phát triển năng lực và phẩm chất",',
    '      "timeToComplete": "P1Y" },',
    '',
    '    { "@type": "WebSite",',
    '      "@id": "https://genviet365.vn/#trang",',
    '      "inLanguage": "vi-VN",',
    '      "publisher": { "@id": "https://genviet365.vn/#hocvien" } },',
    '',
    '    { "@type": "FAQPage",',
    '      "mainEntity": [ /* sinh từ GV.NQ_FAQ — mỗi cặp hỏi/đáp một phần tử */ ] }',
    '  ]',
    '}'
  ].join('\n');

})(window.GV = window.GV || {});
