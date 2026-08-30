/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT · NĂM TUYẾN VẬN HÀNH
   Kho này KHÔNG do tôi nghĩ ra. Nó rút từ chính bộ tài liệu gốc
   trong thư mục GEN VIỆT của Học viện GITA — 65 tệp, đọc ngày
   30.08.2026. Nguồn của từng phần ghi trong GV.TY_NGUON.

   Xương sống là thứ mà bản dựng trước chưa có: MÔ HÌNH 15 GIAI
   ĐOẠN, và PIPELINE 5 CẤP chạy trên nó. Năm tuyến không phải năm
   chương trình song song — chúng là năm MÔI TRƯỜNG mà cùng một
   người đi qua cùng mười lăm giai đoạn ấy.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 0 · Định vị lấy nguyên văn từ tài liệu gốc ───────────── */
  G.TY_DINH_VI = [
    { t: 'Tên', n: 'Club Nhân Tài Việt — GEN VIỆT CLUB', vi: 'Trực thuộc trường, phối hợp Học viện GITA và CLB Văn hoá Nghệ thuật Tài năng trẻ Đoàn Thị Điểm.' },
    { t: 'Sứ mệnh', n: '**Ươm Mầm Gen Việt**', vi: 'Bốn chữ. Không mở rộng, không diễn giải lại.' },
    { t: 'Tầm nhìn', n: '**Gen Việt Thắp Sáng Vươn Mình**', vi: 'Đặt trong kỷ nguyên vươn mình của dân tộc.' },
    { t: 'Giá trị cốt lõi', n: '**Rèn Luyện — Hun Đúc — Trưởng Thành — Tài Năng Việt**', vi: 'Bốn nhịp, đúng thứ tự. Rèn trước, tài năng sau.' },
    { t: 'Văn hoá Club', n: 'Khám Phá — Học Hỏi — Trải Nghiệm — Hoàn Thiện — Tỏa Sáng', vi: 'Năm nhịp của một chu kỳ sinh hoạt.' },
    { t: 'Tinh thần', n: '**Lead by Doing** — dẫn dắt bằng việc làm', vi: 'Không có vai trò nào được trao bằng lời. Trao bằng việc đã làm.' },
    { t: 'Văn hoá 5S Gen Việt', n: 'Sạch · Sắp xếp · Sẵn sàng · Sâu sắc · Sáng tạo', vi: 'Đo được hằng ngày. Là nền của cả năm tuyến.' },
    { t: 'Căn cứ pháp lý', n: 'Nghị định 79/2017/NĐ-CP · Nghị quyết 29-NQ/TW · Nghị quyết 71-NQ/TW (2025) · Chiến lược phát triển giáo dục 2030–2045', vi: 'Mọi hoạt động tuân thủ quy định Bộ GD&ĐT, có cố vấn chuyên môn giám sát, không thương mại hoá.' }
  ];

  /* ── 1 · Năm tuyến ───────────────────────────────────────── */
  G.TY_TUYEN = [
    { ma: 'T1', t: 'TUYẾN CLB GEN VIỆT', mau: '#185AB4',
      hoi: 'Nơi em được trao vai thật và có người trông vào.',
      n: 'Câu lạc bộ trong trường: 10 cấp độ thành viên, 12 Ban chức năng, 52 tuần chuyên đề, sinh hoạt định kỳ theo kịch bản chuẩn.',
      lam: ['10 cấp độ từ Làm quen tới Đại sứ hệ thống, mỗi cấp 10 chương trình huấn luyện',
            '12 Ban do chính học sinh giữ ghế, có nhiệm kỳ và bàn giao',
            'Sinh hoạt 2 buổi/tháng theo cấu trúc 4 phần cố định',
            'Leadership Lab 60–90 phút + Squad Sprint 30–45 phút mỗi tuần'],
      do: 'Cấp độ đạt được · tỉ lệ tham gia · vai trò đảm nhiệm · phản hồi 360°',
      ai: 'Chủ nhiệm CLB (giáo viên) · Ban Điều hành học sinh · Cố vấn GITA' },

    { ma: 'T2', t: 'TUYẾN 12 KHỐI LỚP', mau: '#5140B4',
      hoi: 'Nơi việc rèn đi vào đúng lứa tuổi và đúng chương trình.',
      n: 'Chương trình đào tạo theo từng khối lớp 1→12. Mỗi khối có 5 nhóm cố định × 10 chuyên đề = 50 chuyên đề, mã hoá GV<khối>.<nhóm>.<số>.',
      lam: ['5 nhóm cố định giữ nguyên suốt 12 khối, chỉ đổi độ khó và bối cảnh',
            'Mỗi chuyên đề là một việc làm được, không phải một bài giảng',
            'Gắn vào tiết kỹ năng sống, hoạt động trải nghiệm, sinh hoạt lớp',
            'Giáo viên chủ nhiệm dùng được ngay, không cần đào tạo dài'],
      do: 'Số chuyên đề hoàn thành · minh chứng từng chuyên đề · nhận xét giáo viên chủ nhiệm',
      ai: 'Giáo viên chủ nhiệm · Tổng phụ trách · Trainer GITA' },

    { ma: 'T3', t: 'TUYẾN GIA ĐÌNH', mau: '#0B7350',
      hoi: 'Nơi thói quen được giữ khi không ai nhìn.',
      n: 'Lộ trình 90 ngày bứt phá tại nhà: 4 giai đoạn × 12 tuần, nhật ký hằng ngày, mentor check-in hằng tuần, phụ huynh đồng hành hằng ngày.',
      lam: ['90 ngày chia 4 giai đoạn: Thức tỉnh · Rèn thói quen · Tư duy và kỹ năng · Hành động và lan toả',
            'Nhật ký ngày: 5 dòng tự đánh giá — 3 điều biết ơn — 1 hành động tử tế',
            'Bảng điểm 5S do gia đình cùng chấm, có ảnh minh chứng',
            'Ba danh hiệu cuối chặng: Tự lập · Kiên trì · Truyền cảm hứng'],
      do: '90% duy trì ≥4/5S mỗi ngày · 80% lập được kế hoạch tuần · nhật ký ≥5/7 ngày',
      ai: 'Phụ huynh · Mentor GITA · Đôi bạn cùng tiến' },

    { ma: 'T4', t: 'TUYẾN HOẠT ĐỘNG XÃ HỘI', mau: '#BE0E16',
      hoi: 'Nơi giá trị của em được người ngoài xác nhận.',
      n: 'Dự án phụng sự, sự kiện toàn trường, kết nối liên trường. Đây là tuyến duy nhất mà bằng chứng do người ngoài hệ ký.',
      lam: ['Dự án "Tôi vì cộng đồng" — nhóm 3–5 học sinh, có báo cáo và người thụ hưởng',
            'Ba sự kiện trụ cột mỗi năm: Gen Việt Day · Gen Việt Awards · Gen Việt Camp',
            'Kết nối liên trường: trại "Together We Shine", thi đấu học thuật',
            'Sổ vàng Gen Việt ghi nhận thành tích cuối năm'],
      do: 'Số dự án hoàn thành có nghiệm thu ngoài · số người thụ hưởng · số trường kết nối',
      ai: 'Ban Lan Tỏa Việt · Ban Sự Kiện · Ban Giám hiệu · đối tác doanh nghiệp' },

    { ma: 'T5', t: 'TUYẾN KHỞI NGHIỆP VÀ CHUYÊN GIA', mau: '#A8801F',
      hoi: 'Nơi tài năng của em bắt đầu có nghề.',
      n: 'Từ ý tưởng học đường tới đề tài nghiên cứu ứng dụng và hướng nghiệp sớm. Mười đề tài GV-R1→R10 đăng ký được cấp trường, cấp Sở, cấp Bộ.',
      lam: ['Cuộc thi "Ý tưởng sáng tạo học đường" — chọn ươm mầm, có ý tưởng triển khai thật',
            'Mười đề tài nghiên cứu ứng dụng, mỗi đề tài có sản phẩm dùng được ngay',
            'Chương trình "Talk – Tour – Task": gặp mentor, tham quan doanh nghiệp, nhận việc thật',
            'Test Mật mã Gen Tài Năng và hồ sơ hướng nghiệp sơ bộ'],
      do: 'Số ý tưởng được triển khai thật · số đề tài đăng ký được · số mentor đồng hành',
      ai: 'Cố vấn chuyên môn · mentor doanh nghiệp · Hội đồng khoa học nhà trường' }
  ];

  G.TY_LUAT_TUYEN = [
    'Năm tuyến **không phải năm chương trình song song**. Chúng là năm *môi trường* mà cùng một học sinh đi qua cùng mười lăm giai đoạn.',
    'Một học sinh vào hệ qua **bất kỳ tuyến nào**, nhưng không thể lên cấp nếu chỉ có mặt ở một tuyến.',
    'Tuyến CLB là *trục chính* — nơi ghi nhận và xét cấp. Bốn tuyến còn lại cung cấp **bằng chứng**.',
    'Tuyến Gia đình là tuyến **dễ bỏ nhất và quyết định nhất**: thói quen giữ được khi không ai nhìn mới là thói quen.',
    'Tuyến Xã hội là tuyến duy nhất mà bằng chứng **do người ngoài hệ ký** — nên nó nặng nhất khi xét cấp.',
    'Tuyến Khởi nghiệp mở từ cấp 5 trở lên. Mở sớm hơn là bắt trẻ chạy trước khi đứng vững.',
    'Không tuyến nào được chạy mà thiếu **cố vấn chuyên môn** và **giám sát của nhà trường**.'
  ];

  /* ── 2 · Mười lăm giai đoạn — xương sống ──────────────────
     Rút nguyên khung từ "Mô hình 15 giai đoạn Gen Việt trong phát
     triển toàn diện HS THCS". Sáu giai đoạn đầu là nền Thân–Tâm–
     Trí–Văn–Thể–Mĩ; ba giai đoạn giữa là cách học; ba giai đoạn
     sau là kết quả và giá trị; ba giai đoạn cuối là bộ công cụ
     làm nên người dẫn. */
  G.TY_GIAI_DOAN = [
    { so: '1', t: 'THÂN', k: 'Nền', mau: '#0B6675',
      hoi: 'Em có nề nếp sinh hoạt lành mạnh chưa?',
      dich: 'Biết giữ sức khoẻ và giờ giấc để học và tham gia bền vững.',
      m90: 'Đúng giờ ≥90% · ngủ đủ 7–8 giờ · giảm uể oải · giữ tư thế nghiêm túc',
      moc: '0–30 check-in giờ giấc · 31–60 thêm nước, ăn sáng, tư thế · 61–90 giữ nhịp và nhận vai “Captain Năng lượng”',
      do: 'Bảng theo dõi giờ giấc · điểm chuyên cần' },
    { so: '2', t: 'TÂM', k: 'Nền', mau: '#0B6675',
      hoi: 'Em ứng xử với cảm xúc và với người khác thế nào?',
      dich: 'Biết tôn trọng, không bạo lực, biết xin lỗi và cảm ơn, biết chia sẻ.',
      m90: 'Không tham gia bắt nạt · nói thẳng mà vẫn tôn trọng · khi nóng biết *dừng ba giây* · có ít nhất một người tin tưởng để chia sẻ',
      moc: '0–30 nhận diện năm cảm xúc hay gặp · 31–60 tập “dừng ba giây”, xử một tình huống thật · 61–90 tham gia hoà giải một lần',
      do: 'Biên bản sự vụ giảm · phản hồi giáo viên · nhật ký cảm xúc' },
    { so: '3', t: 'TRÍ', k: 'Nền', mau: '#0B6675',
      hoi: 'Em học có chủ động và biết suy nghĩ không?',
      dich: 'Biết học hiểu, biết hỏi, biết kiểm chứng thông tin.',
      m90: 'Biết đặt câu hỏi khi không hiểu · tự chuẩn bị ít nhất một môn · không phụ thuộc đáp án mạng và AI · xem lại lỗi sai',
      moc: '0–30 mỗi ngày một câu hỏi chủ động · 31–60 quy trình đọc–nghĩ–hỏi–kiểm · 61–90 lập sổ lỗi sai một môn',
      do: 'Sổ “Câu hỏi và Lỗi sai” · vở ghi · nhật ký học tập' },
    { so: '4', t: 'VĂN', k: 'Nền', mau: '#0B6675',
      hoi: 'Em giao tiếp và hành xử có văn minh không?',
      dich: 'Lễ phép, văn hoá ứng xử chuẩn mực cả ngoài đời lẫn trên mạng.',
      m90: 'Dùng đúng danh xưng · hạn chế nói tục · không toxic trên mạng · phát biểu mạch lạc',
      moc: '0–30 chuẩn xưng hô và chào hỏi · 31–60 mỗi tuần phát biểu ít nhất một lần · 61–90 dẫn một mục nhỏ hoặc viết một bài tử tế',
      do: 'Bảng “từ nên tránh — từ nên dùng” · phản hồi về cách ứng xử' },
    { so: '5', t: 'THỂ', k: 'Nền', mau: '#0B6675',
      hoi: 'Em có sức bền để theo đuổi mục tiêu không?',
      dich: 'Tham gia vận động, không lụi tàn vì lối sống thụ động.',
      m90: 'Vận động ≥3 lần/tuần · không kiệt sức vì thiếu ngủ hay game · cải thiện tập trung',
      moc: '0–30 chọn một hình thức vận động 10–15 phút/ngày · 31–60 tăng tần suất, gắn vào lịch học · 61–90 chia bí kíp giữ sức cho Squad',
      do: 'Log vận động · tự đánh giá khác biệt về tập trung' },
    { so: '6', t: 'MĨ', k: 'Nền', mau: '#0B6675',
      hoi: 'Em có gu thẩm mỹ và môi trường sống lành mạnh không?',
      dich: 'Biết đẹp — sạch — văn minh, biết chọn nội dung lành mạnh.',
      m90: 'Trang phục gọn gàng · vở và tài liệu sạch · poster và slide có bố cục rõ · giảm xem nội dung độc hại',
      moc: '0–30 dọn góc học tập · 31–60 thiết kế một sản phẩm đẹp · 61–90 giữ gu và giúp bạn trình bày đẹp hơn',
      do: 'Ảnh “góc học tập Gen Việt” · sản phẩm đạt chuẩn' },

    { so: '7', t: 'TƯ DUY XUẤT SẮC', k: 'Cách học', mau: '#5140B4',
      hoi: 'Em nhìn bản thân và việc học theo kiểu nào?',
      dich: 'Tin mình phát triển được, coi sai là dữ liệu, dám thử và dám sửa.',
      m90: 'Giảm câu “em ngu lắm” · sau mỗi lỗi rút một bài học · nhận ít nhất một thử thách mới',
      moc: '0–30 ghi năm lỗi gần đây và điều rút ra · 31–60 nhận một thử thách · 61–90 kể lại hành trình tiến bộ cho nhóm',
      do: 'Nhật ký “Sai và Học” · thang đo mindset' },
    { so: '8', t: 'PHƯƠNG PHÁP CÁ NHÂN HOÁ', k: 'Cách học', mau: '#5140B4',
      hoi: 'Em học theo cách phù hợp nhất với mình chưa?',
      dich: 'Có một *Study OS* riêng: thời gian, cách ghi chép, công cụ phù hợp.',
      m90: 'Có lịch học cá nhân · chọn được cách ghi nhớ phù hợp · tăng điểm hoặc giảm căng thẳng',
      moc: '0–30 lập thời khoá biểu, chọn 1–2 kỹ thuật · 31–60 theo dõi tuân thủ và điều chỉnh · 61–90 giữ cái hiệu quả, bỏ cái không hợp',
      do: 'Bảng Study OS · log tự học · kết quả học cải thiện' },
    { so: '9', t: 'KỸ NĂNG TOÀN DIỆN', k: 'Cách học', mau: '#5140B4',
      hoi: 'Em có kỹ năng để làm việc với người khác và với công nghệ không?',
      dich: 'Bốn chữ C — giao tiếp, hợp tác, phản biện, sáng tạo — cộng kỹ năng sống và kỹ năng số nền tảng.',
      m90: 'Dám phát biểu · biết làm việc nhóm · biết giải quyết mâu thuẫn nhỏ · dùng được công cụ số cơ bản',
      moc: '0–30 tập nói trong nhóm · 31–60 nhận một nhiệm vụ nhóm có hạn chót · 61–90 thử dẫn một phần nhóm',
      do: 'Rubric kỹ năng · video minh chứng · sản phẩm nhóm nộp đúng hạn' },

    { so: '10', t: 'KẾT QUẢ XUẤT SẮC', k: 'Kết quả', mau: '#0B7350',
      hoi: 'Nỗ lực của em có ra kết quả thấy được không?',
      dich: 'Thấy rõ bước tiến về học tập, kỹ năng, vai trò.',
      m90: 'Tăng ít nhất một chỉ số: điểm, dự án, hoặc vai trò · có một sản phẩm rõ ràng',
      moc: '0–30 chốt mục tiêu SMART · 31–60 thực hiện và theo dõi · 61–90 trình bày kết quả trước Squad',
      do: 'Phiếu cam kết mục tiêu · sản phẩm cụ thể · portfolio cá nhân 52 tuần' },
    { so: '11', t: 'GIÁ TRỊ VÀ ĐAM MÊ TÀI NĂNG', k: 'Kết quả', mau: '#0B7350',
      hoi: 'Em tạo giá trị gì, và đang hứng thú sâu với lĩnh vực nào?',
      dich: 'Bắt đầu gắn tài năng với giá trị phụng sự thực tế.',
      m90: 'Nhận diện 1–2 thế mạnh · thử một dự án dùng thế mạnh để giúp người khác',
      moc: '0–30 test Mật mã Gen và tự liệt kê việc mình làm tốt · 31–60 chọn một hoạt động dùng thế mạnh · 61–90 viết “case giá trị” của mình',
      do: 'Bảng “Em giỏi gì — Em thích gì” · dự án phụng sự · phản hồi người nhận' },

    { so: '12', t: 'BỐN YẾU TỐ BỨT PHÁ', k: 'Bộ công cụ', mau: '#BE0E16',
      hoi: 'Em có đủ tổ hợp: thái độ — lộ trình — cố vấn — nỗ lực chưa?',
      dich: 'Khoá bốn mảnh nền của phát triển dài hạn.',
      m90: 'Có một mentor rõ · có lộ trình 90 ngày · ký cam kết thái độ · duy trì nỗ lực ≥8/12 tuần',
      moc: '0–30 chọn mentor và viết mục tiêu · 31–60 gặp mentor ít nhất hai lần · 61–90 tự theo dõi và báo cáo mà không đợi nhắc',
      do: 'Form 4Y cá nhân · lịch gặp mentor · đánh giá hai chiều mentor–mentee' },
    { so: '13', t: 'BA GIAI ĐOẠN THÓI QUEN', k: 'Bộ công cụ', mau: '#BE0E16',
      hoi: 'Em còn *làm cho có* hay đã *làm đúng* và *giữ được*?',
      dich: 'Làm → Làm đúng → Duy trì làm đúng. Thói quen bền, không bùng lên rồi tắt.',
      m90: 'Chọn 1–2 hành vi cốt lõi và đưa lên được giai đoạn ba',
      moc: '0–30 LÀM: thử liên tục · 31–60 LÀM ĐÚNG: chuẩn hoá theo quy trình · 61–90 DUY TRÌ: ≥80% số ngày đạt chuẩn',
      do: 'Bảng theo dõi ba màu · huy hiệu “Duy trì Gen Việt”' },
    { so: '14', t: 'BẢY BƯỚC GEN VIỆT', k: 'Bộ công cụ', mau: '#BE0E16',
      hoi: 'Em đang ở bước nào trên đường trở thành người dẫn?',
      dich: 'Đi trọn bảy bước cho ít nhất một mục tiêu.',
      m90: 'B1 hiểu bản thân → B2 mục tiêu → B3 kế hoạch → B4 hành động lặp → B5 tìm giải pháp khi kẹt → B6 thi đua với chính mình → B7 trình bày như người dẫn',
      moc: '0–30 bước 1 tới 3 · 31–60 bước 4 và 5 · 61–90 bước 6 và 7',
      do: 'Hồ sơ bảy bước · ghi lại lúc bế tắc và cách giải · được công nhận ở một vai trò' },
    { so: '15', t: 'HỘI TỤ GEN VIỆT', k: 'Bộ công cụ', mau: '#BE0E16',
      hoi: 'Em có thể đại diện cho lớp, cho trường, cho Gen Việt không?',
      dich: 'Hình mẫu: phẩm chất cộng năng lực cộng kết quả cộng phụng sự.',
      m90: 'Đảm nhận một vai trò lãnh đạo · thực hiện một hoạt động lan toả · có bản phác thảo hướng nghiệp ban đầu',
      moc: '0–30 xác định vai trò phù hợp · 31–60 thực hiện vai trò qua một sự kiện hoặc dự án · 61–90 đánh giá 360° và viết tầm nhìn 1–3 năm',
      do: 'Nhật ký lãnh đạo · phiếu 360° từ bạn, thầy cô và ban điều hành · hồ sơ hướng nghiệp' }
  ];

  /* ── 3 · Pipeline năm cấp chạy trên mười lăm giai đoạn ───── */
  G.TY_PIPELINE = [
    { ma: 'P1', t: 'Thành viên nền', gd: 'Giai đoạn 1 → 4', mau: '#7A8CA3',
      n: 'Ứng viên và thành viên mới. Ổn định Thân — Tâm — Trí — Văn ở mức cơ bản.',
      vi: 'Chưa giao vai trò. Việc duy nhất là có mặt đều và không vi phạm.' },
    { ma: 'P2', t: 'Thành viên tích cực', gd: 'Giai đoạn 5 → 9', mau: '#185AB4',
      n: 'Tham gia đều, có kỹ năng, kết quả học tập tốt hơn thấy được.',
      vi: 'Bắt đầu nhận việc nhỏ. Đây là chuẩn “member nền vững” trước khi xét nòng cốt.' },
    { ma: 'P3', t: 'Động lực nhân tài', gd: 'Giai đoạn 10 → 11', mau: '#0B7350',
      n: 'Có thành tích, có giá trị, bắt đầu rõ thế mạnh và đam mê.',
      vi: 'Mở tuyến Khởi nghiệp và Chuyên gia từ đây, không sớm hơn.' },
    { ma: 'P4', t: 'Nòng cốt lãnh đạo', gd: 'Giai đoạn 12 → 14', mau: '#5140B4',
      n: 'Nắm bốn yếu tố, ba giai đoạn, bảy bước; dẫn được nhóm hoặc ban.',
      vi: 'Giữ ghế trong 12 Ban, có nhiệm kỳ và có bàn giao.' },
    { ma: 'P5', t: 'Đại sứ và cán bộ gương mẫu', gd: 'Giai đoạn 15', mau: '#BE0E16',
      n: 'Đại diện trường và hệ thống, vai trò lớn, có định hướng nghề nghiệp.',
      vi: 'Được tín nhiệm bởi bạn — thầy cô — phụ huynh. Có cơ chế giám sát và có thể bị rút danh hiệu.' }
  ];

  /* ── 4 · TUYẾN 1 · CLB — mười cấp độ ─────────────────────── */
  G.TY_CLB_CAP = [
    ['Cấp 1', 'Làm quen Gen Việt', 'Thành viên mới', '1–2 tháng; tham gia ≥50% buổi; hiểu nội quy và giá trị; không vi phạm', 'Trải nghiệm nhẹ, vui, an toàn; xây thiện cảm; không ép vai trò'],
    ['Cấp 2', 'Thành viên tích cực', 'Đã qua cấp 1', '1–3 tháng; tham gia ≥70%; không vi phạm mức cảnh cáo; đạt 70–80% yêu cầu 10 chương trình', 'Hình thành kỷ luật — thái độ — hành vi chuẩn, phân biệt rõ với kiểu “đi cho vui”'],
    ['Cấp 3', 'Thành viên có mục tiêu', 'Đã qua cấp 2', 'Có mục tiêu cá nhân rõ, biết tự quản và tự rèn', 'Dẫn từ “ngoan và tích cực” sang “sống có mục tiêu”'],
    ['Cấp 4', 'Thành viên nòng cốt', 'Đã qua cấp 3', 'Nhận và hoàn thành việc thật; là chỗ dựa của nhóm', 'Giao việc có trách nhiệm, có hạn chót, có nghiệm thu'],
    ['Cấp 5', 'Hạt giống phục vụ và ảnh hưởng tích cực', 'Đã qua cấp 4', 'Có ảnh hưởng tốt lên bạn bè; chủ động phục vụ', '**Mở tuyến Khởi nghiệp từ cấp này.** Chuyển từ nhận sang cho'],
    ['Cấp 6', 'Thành viên ban chuyên trách', 'Đã qua cấp 5', 'Thuộc một trong 12 Ban, làm được việc chuyên môn của ban', 'Học nghề của một ban cụ thể, không còn làm việc chung chung'],
    ['Cấp 7', 'Leader nhóm nhỏ · tổ · tiểu ban', 'Đã qua cấp 6', 'Dẫn được 3–7 người; có kết quả nhóm đo được', 'Lần đầu chịu trách nhiệm về kết quả của người khác'],
    ['Cấp 8', 'Trưởng · phó ban — lãnh đạo vận hành', 'Đã qua cấp 7', 'Vận hành một ban trọn nhiệm kỳ; có bàn giao và có sổ ghế', 'Quản trị: kế hoạch, nhân sự, báo cáo, phối hợp liên ban'],
    ['Cấp 9', 'Thủ lĩnh CLB tại đơn vị', 'Đã qua cấp 8', 'Chủ nhiệm hoặc core Ban Điều hành; một nhiệm kỳ thành công, không scandal', 'Chịu trách nhiệm về cả CLB trước nhà trường và phụ huynh'],
    ['Cấp 10', 'Đại sứ · thủ lĩnh hệ thống', 'Đã qua cấp 9', 'Điểm F1–F4 trung bình ≥4.7, không tiêu chí lõi nào <4.5; ≥80% đánh giá tích cực; có dự án tầm liên trường', 'Chọn lọc rất ít. Huấn luyện trực tiếp bởi Hội đồng. Có cơ chế thu hồi danh hiệu']
  ];

  G.TY_CLB_NL = [
    ['A', 'Tự chủ và kỷ luật', 'Cấp 1 → 3', 'Đúng giờ, giữ lời, tự quản một ngày của mình'],
    ['B', 'Thể chất và năng lượng', 'Cấp 1 → 3', 'Sức bền để theo đuổi, không kiệt sức'],
    ['C', 'Giao tiếp', 'Cấp 2 → 5', 'Nói được, nghe được, phản hồi được'],
    ['D', 'Thói quen học', 'Cấp 2 → 5', 'Học chủ động, có phương pháp riêng'],
    ['E', 'Giá trị và hành vi', 'Cấp 2 → 6', 'Ứng xử chuẩn, không bắt nạt, đại diện được hình ảnh CLB'],
    ['F1', 'Uy tín', 'Cấp 7 → 10', 'Nói là làm; người khác tin và tìm đến'],
    ['F2', 'Tư duy hệ thống và chiến lược', 'Cấp 8 → 10', 'Nhìn được bức tranh toàn cảnh, không chỉ phần việc của mình'],
    ['F3', 'Ảnh hưởng rộng, đa tầng', 'Cấp 9 → 10', 'Ảnh hưởng tới bạn, tới thầy cô, tới phụ huynh, tới trường khác'],
    ['F4', 'Phụng sự, khiêm tốn, kỷ luật nội tâm', 'Cấp 9 → 10', 'Dẫn dắt bằng phục vụ; không đòi đặc quyền; chịu được giám sát']
  ];

  G.TY_CLB_BAN = [
    { t: 'Ban Khơi Dậy Việt', n: 'Giữ nhịp toàn CLB: gửi và tổng hợp danh mục nhiệm vụ, điều phối các ban, tham vấn Ban Cố vấn.', vi: 'Ban giữ đồng hồ. Không có ban này thì mười một ban còn lại chạy lệch nhau.' },
    { t: 'Ban Trái Tim Việt', n: 'Chăm sóc thành viên, lắng nghe, hoà giải, giữ an toàn tâm lý.', vi: 'Ban được nhắc nhiều nhất trong tài liệu vận hành — vì đây là ban giữ người.' },
    { t: 'Ban Trí Tuệ Việt', n: 'Nội dung đào tạo, chuyên đề tuần, tài liệu, kiểm tra chất lượng học.', vi: 'Giữ 52 chuyên đề và bộ giáo án.' },
    { t: 'Ban Bản Lĩnh Việt', n: 'Dẫn chương trình, tổ chức buổi sinh hoạt, giữ kỷ luật và khí thế.', vi: 'MC và điều phối sân khấu. Bộ mặt của mỗi buổi.' },
    { t: 'Ban Phẩm Chất Việt', n: 'Giữ chuẩn hành vi, nội quy, văn hoá ứng xử; theo dõi 20 quy ước.', vi: 'Ban duy nhất được đề nghị cờ vàng và cờ đỏ.' },
    { t: 'Ban Tài Năng Việt', n: 'Phát hiện và bồi dưỡng năng khiếu; tổ chức showcase và talent show.', vi: 'Nơi Mật mã Gen Tài Năng được đọc và dùng.' },
    { t: 'Ban Lan Tỏa Việt', n: 'Truyền thông nội bộ và ra ngoài; viết bài, ảnh, video; giữ hình ảnh.', vi: 'Sáu bài mỗi tuần theo lịch cố định từ tối Chủ nhật tới tối thứ Sáu.' },
    { t: 'Ban Kết Nối Việt', n: 'Đối ngoại: mời khách, kết nối mentor, doanh nghiệp, trường bạn.', vi: 'Giữ danh mục đối tác chiến lược.' },
    { t: 'Ban Văn Hóa Việt', n: 'Nghi lễ, nghi thức, bản sắc, sự kiện văn hoá nghệ thuật.', vi: 'Giữ những thứ làm nên chất riêng mà không đo được bằng số.' },
    { t: 'Ban Tinh Thần Việt', n: 'Khí thế, động viên, ghi nhận, vinh danh; giữ năng lượng tích cực.', vi: 'Chống lại thứ giết CLB nhanh nhất: sự nhạt.' },
    { t: 'Ban Bàn Chân Việt', n: 'Hậu cần, cơ sở vật chất, an toàn, hiện trường sự kiện.', vi: 'Ban ít được nhắc tên nhất và thiếu thì hỏng nhanh nhất.' },
    { t: 'Ban Phong Cách Việt', n: 'Đồng phục, tác phong, hình ảnh cá nhân, chuẩn xuất hiện.', vi: 'Người ngoài nhìn CLB qua ban này trước khi nghe CLB nói gì.' }
  ];

  G.TY_CLB_BUOI = [
    ['1', 'Khởi động', '5 phút', 'Trò chơi “Tôi là Gen Việt” — làm nóng', 'Phó chủ nhiệm'],
    ['2', 'Chuyên đề rèn luyện', '30 phút', 'Một chủ đề phát triển bản thân trong bộ 52 tuần', 'Mentor hoặc Trainer GITA'],
    ['3', 'Hoạt động nhóm', '25 phút', 'Bài tập thực hành, thảo luận Squad', 'Ban Trí Tuệ Việt'],
    ['4', 'Phản tư và kết nối', '10 phút', 'Viết nhật ký “Bài học hôm nay”', 'Ban Trái Tim Việt']
  ];

  G.TY_CLB_TUAN = [
    { t: 'Leadership Lab', n: '60–90 phút, cả CLB.', vi: 'Nghi thức chào → giới thiệu → nội dung chính → cam kết. Ban Bản Lĩnh Việt dẫn.' },
    { t: 'Squad Sprint', n: '30–45 phút, theo tổ nhỏ.', vi: 'Nơi từng người phải nói, không ai ngồi im được.' },
    { t: 'Rèn luyện tại nhà 7 ngày', n: 'Nhật ký tối thiểu 5/7 ngày.', vi: 'Đây là chỗ tuyến CLB nối vào tuyến Gia đình.' },
    { t: 'Đôi bạn cùng tiến', n: 'Hai người nhắc nhau, ký xác nhận cho nhau.', vi: 'Rẻ nhất và hiệu quả nhất trong mọi cơ chế giữ nhịp.' },
    { t: 'Team vô địch tuần', n: 'Một Squad được đề cử mỗi tuần.', vi: 'Thi đua theo tổ, không xếp hạng cá nhân.' }
  ];

  /* ── 5 · TUYẾN 2 · Mười hai khối lớp ─────────────────────── */
  G.TY_KHOI_NHOM = [
    { so: '1', t: 'Văn hoá — Phẩm chất', n: 'Lời chào, lời tử tế, trung thực, trách nhiệm, tôn trọng lượt, nhân ái, giữ lời hứa.', v: 'Nhóm mở đầu ở mọi khối. Không có nhóm này thì bốn nhóm sau không đứng được.' },
    { so: '2', t: 'Nghị lực — Bản lĩnh — Kỷ luật — Thói quen học xuất sắc', n: 'Tập trung, danh mục cặp sách, xong–kiểm–cất, không bỏ cuộc, bình tĩnh khi sai, kỷ luật màn hình.', v: 'Nhóm nặng nhất về đo lường: mọi mục đều đếm được theo ngày.' },
    { so: '3', t: 'Tư duy người xuất sắc', n: 'Quan sát, so sánh, phân loại, trình tự, hỏi để hiểu, tóm tắt một câu, tư duy hình ảnh và logic.', v: 'Đi từ quan sát tới suy luận, không dạy khái niệm trừu tượng trước.' },
    { so: '4', t: 'Trí tuệ Gen Việt — Tấm gương kiệt xuất', n: 'Chân dung danh nhân, danh tướng, hiền tài Việt Nam gắn với việc làm được trong tuần.', v: 'Nối thẳng vào Thư viện Gen Việt — 45 chân dung, 12 mô thức tư duy.' },
    { so: '5', t: 'Leader Gen Việt — Teamwork — Cống hiến tạo giá trị', n: 'Vai trò nhóm, dẫn dắt, phối hợp, dự án nhỏ, việc tốt có người xác nhận.', v: 'Nhóm duy nhất bắt buộc có bằng chứng từ người ngoài.' }
  ];

  G.TY_KHOI_12 = [
    ['Khối 1', 'Nề nếp và “kỷ luật vui”', 'Tiểu học', 'Bảng sticker tiến bộ · 7 ngày kỷ luật vui', 'Người lớn đi cùng từng bước'],
    ['Khối 2', 'Tự quản văn minh, học đều, tư duy có tiêu chí', 'Tiểu học', 'Lịch tuần tự lập · tiêu chí đánh giá đơn giản', 'Người lớn nhắc, chưa làm hộ'],
    ['Khối 3', 'Tư duy dữ liệu cơ bản, dự án ngắn 2–4 tuần', 'Tiểu học', 'Bảng số liệu đơn giản · một dự án ngắn', 'Nhóm 3 người, có sản phẩm'],
    ['Khối 4', 'Tư duy hệ thống, dự án 4–8 tuần, chuẩn “tạo giá trị thật”', 'Tiểu học', 'Sơ đồ hệ thống · dự án có người thụ hưởng', 'Bắt đầu cần chữ ký người ngoài'],
    ['Khối 5', 'Thủ lĩnh THCS, tư duy chiến lược, dự án 8–12 tuần', 'Tiểu học', 'Kế hoạch chiến lược cá nhân · dự án dài', 'Chuẩn bị bước sang cấp hai'],
    ['Khối 6', 'Hội nhập THCS, Study OS cá nhân', 'THCS', 'Bảng Study OS · sổ lỗi sai', 'Giai đoạn 8 của mô hình 15 giai đoạn'],
    ['Khối 7', 'Kỹ năng toàn diện 4C, Squad và vai trò', 'THCS', 'Rubric 4C · nhật ký vai trò', 'Giai đoạn 9'],
    ['Khối 8', 'Kết quả xuất sắc, portfolio 52 tuần', 'THCS', 'Portfolio cá nhân · mục tiêu SMART', 'Giai đoạn 10 — mở tuyến Khởi nghiệp'],
    ['Khối 9', 'Giá trị, đam mê, Mật mã Gen và hướng nghiệp sớm', 'THCS', 'Test Mật mã Gen · case giá trị', 'Giai đoạn 11'],
    ['Khối 10', 'Bốn yếu tố bứt phá, mentor và cam kết', 'THPT', 'Form 4Y · lịch gặp mentor', 'Giai đoạn 12'],
    ['Khối 11', 'Ba giai đoạn thói quen và bảy bước Gen Việt', 'THPT', 'Bảng ba màu · hồ sơ bảy bước', 'Giai đoạn 13 và 14'],
    ['Khối 12', 'Hội tụ Gen Việt: đại sứ, hướng nghiệp, bàn giao thế hệ', 'THPT', 'Phiếu 360° · tầm nhìn 1–3 năm · hồ sơ hướng nghiệp', 'Giai đoạn 15 — và bàn giao lại cho khối dưới']
  ];

  G.TY_KHOI_LUAT = [
    'Năm nhóm **giữ nguyên suốt mười hai khối**. Chỉ đổi độ khó và bối cảnh, không đổi tên nhóm — để một học sinh đi hết mười hai năm vẫn thấy cùng một hệ.',
    'Mỗi khối **50 chuyên đề** (5 nhóm × 10). Toàn tuyến **600 chuyên đề**, mã hoá `GV<khối>.<nhóm>.<số>`.',
    'Mỗi chuyên đề là **một việc làm được**, không phải một bài giảng. Không có chuyên đề nào chỉ để nghe.',
    'Nhóm 4 lấy chất liệu từ **Thư viện Gen Việt**: mỗi chân dung phải dẫn tới một việc học viên làm được trong tuần.',
    'Nhóm 5 bắt buộc có **bằng chứng từ người ngoài** — giáo viên chủ nhiệm, người nhận việc, hoặc người thụ hưởng ký.',
    'Giáo viên chủ nhiệm dùng được ngay: mỗi chuyên đề gói trong 10–15 phút sinh hoạt lớp, không cần đào tạo dài.'
  ];

  /* ── 6 · TUYẾN 3 · Gia đình ─────────────────────────────── */
  G.TY_GD_90 = [
    { ma: 'GĐ1', t: 'Thức tỉnh bản thân', tuan: 'Tuần 1 – 2', mau: '#185AB4',
      dich: 'Nhận thức bản thân, hiểu điểm mạnh và điểm yếu, khởi động tinh thần rèn luyện.',
      lam: ['Workshop “Tôi là ai trong hành trình Gen Việt”',
            'Viết Cam kết 90 ngày — có chữ ký của con và của gia đình',
            'Bắt đầu thực hành 5S tại góc học tập'],
      ra: 'Phiếu Cam kết Gen Việt · bản mô tả điểm mạnh và điểm yếu · ảnh góc học tập ngày đầu' },
    { ma: 'GĐ2', t: 'Rèn luyện thói quen tích cực', tuan: 'Tuần 3 – 6', mau: '#0B6675',
      dich: 'Hình thành thói quen tốt, rèn kỷ luật cá nhân và năng lượng tích cực.',
      lam: ['Tuần 3 — 5S và kỷ luật: danh mục 5S, dọn góc học tập, đúng giờ',
            'Tuần 4 — chăm sóc bản thân: ba phút thiền sáng, ba điều biết ơn tối',
            'Tuần 5 — học chủ động: kế hoạch học mỗi ngày, ghi chú sáng tạo',
            'Tuần 6 — quản lý thời gian và cảm xúc: “Dừng — Thở — Chọn”'],
      ra: '7 ngày hoàn thành 100% danh mục · bảng năng lượng tích cực · 21 ngày học 30 phút/ngày' },
    { ma: 'GĐ3', t: 'Rèn tư duy và kỹ năng sống', tuan: 'Tuần 7 – 9', mau: '#5140B4',
      dich: 'Tư duy tích cực, tinh thần hợp tác, sáng tạo, khả năng giao tiếp.',
      lam: ['Tuần 7 — tư duy tích cực và biết ơn: bảng “Điểm cộng mỗi ngày”',
            'Tuần 8 — giao tiếp và làm việc nhóm: thuyết trình nhóm',
            'Tuần 9 — tư duy sáng tạo và giải pháp: “Dám nghĩ — Dám làm — Dám sai”'],
      ra: '7 câu chuyện về lòng biết ơn · 5 bài trình bày nhóm · 3 ý tưởng cải thiện trường lớp' },
    { ma: 'GĐ4', t: 'Hành động — lan toả — toả sáng', tuan: 'Tuần 10 – 12', mau: '#BE0E16',
      dich: 'Có hành động cụ thể, lan toả năng lượng, chia sẻ hành trình thay đổi.',
      lam: ['Tuần 10 — dự án cá nhân “Tôi đã thay đổi”: ba mục tiêu nhỏ khả thi',
            'Tuần 11 — thực hiện và lan toả: triển khai thật, chia sẻ nhóm',
            'Tuần 12 — tổng kết và tôn vinh: báo cáo dự án, kể lại câu chuyện'],
      ra: 'Kế hoạch cá nhân · ảnh và video minh chứng · một buổi “Gen Việt Celebration Day”' }
  ];

  G.TY_GD_5S = [
    ['Sạch', 'Giữ vệ sinh cá nhân, góc học tập sạch sẽ', 'Ảnh minh chứng · bảng điểm vệ sinh'],
    ['Sắp xếp', 'Bố trí đồ dùng, kế hoạch, thời gian khoa học', 'Bảng kế hoạch tuần · ghi chú học tập'],
    ['Sẵn sàng', 'Chuẩn bị bài, tài liệu, tinh thần trước mỗi buổi', 'Mentor kiểm tra đầu buổi'],
    ['Sâu sắc', 'Viết nhật ký phản tư, học từ trải nghiệm', 'Bài viết “Bài học của tôi hôm nay”'],
    ['Sáng tạo', 'Tạo ý tưởng mới trong học tập và sinh hoạt', 'Sản phẩm nhóm · ý tưởng cải tiến']
  ];

  G.TY_GD_NHAT_KY = [
    { t: 'Nhật ký ngày', n: '**Năm dòng tự đánh giá — ba điều biết ơn — một hành động tử tế.** Không dài hơn.', vi: 'Ba phút. Dài hơn thì bỏ sau một tuần.' },
    { t: 'Báo cáo tuần', n: 'Mentor tổng hợp điểm 5S cộng điểm năng lượng.', vi: 'Mentor đọc nhanh, không chấm điểm văn.' },
    { t: 'Đánh giá tháng', n: 'Học viên tự trình bày tiến bộ và chia sẻ trải nghiệm.', vi: 'Con nói, người lớn nghe.' },
    { t: 'Cuối chặng', n: 'Báo cáo dự án cộng video tổng kết cá nhân.', vi: 'Sản phẩm cầm được, không phải lời khen.' }
  ];

  G.TY_GD_DANH_HIEU = [
    ['Gương mặt Gen Việt Tự Lập', 'Duy trì kỷ luật và tự giác trọn 90 ngày', 'Bảng theo dõi ba màu ≥80% xanh'],
    ['Gương mặt Gen Việt Kiên Trì', 'Không bỏ cuộc giữa chừng, kể cả khi vấp', 'Sổ phục hồi có ít nhất ba lần quay lại'],
    ['Gương mặt Gen Việt Truyền Cảm Hứng', 'Lan toả tinh thần tích cực cho người khác', 'Ít nhất một người khác thay đổi nhờ em, có xác nhận']
  ];

  G.TY_GD_LUAT = [
    'Gia đình **đồng hành hằng ngày** — đây là tần suất cao nhất trong cả năm tuyến, cao hơn cả CLB.',
    'Người lớn **không ghi hộ nhật ký**, không làm hộ danh mục 5S. Làm hộ là xoá luôn mục đích.',
    'Chỉ số quan trọng nhất không phải số ngày làm được, mà là **thời gian quay lại sau khi đứt nhịp**.',
    'Không so con với con nhà khác. Mọi so sánh là với chính con ở tuần đầu — có ảnh minh chứng để so.',
    'Thông điệp chủ đạo: *“Mỗi ngày chỉ cần tiến lên một phần trăm so với hôm qua. Chín mươi ngày sau, con sẽ là một phiên bản khác.”*'
  ];

  /* ── 7 · TUYẾN 4 · Hoạt động xã hội ─────────────────────── */
  G.TY_XH_DU_AN = [
    { t: 'Tôi vì cộng đồng', n: 'Nhóm 3–5 học sinh, một vấn đề có thật trong trường hoặc khu dân cư.', vi: 'Bắt buộc có người thụ hưởng nêu được tác động cụ thể — không phải lời cảm ơn chung chung.' },
    { t: 'Ý tưởng sáng tạo học đường', n: 'Cuộc thi ý tưởng, chọn ươm mầm, có ít nhất một ý tưởng triển khai thật.', vi: 'Cửa vào tuyến Khởi nghiệp. Ý tưởng không triển khai thì không tính.' },
    { t: 'Dự án phụng sự theo Ban', n: 'Mỗi Ban trong 12 Ban chạy một dự án mỗi học kỳ theo chuyên môn của mình.', vi: 'Ban Lan Tỏa làm truyền thông cộng đồng, Ban Tài Năng làm showcase cho trẻ khó khăn.' },
    { t: 'Giờ phụng sự có xác nhận', n: 'Phiếu xác nhận giờ phụng sự do nơi nhận ký và đóng dấu nếu có.', vi: 'Đơn vị đo của cả tuyến này. Không có chữ ký thì không có giờ.' }
  ];

  G.TY_XH_SU_KIEN = [
    ['Gen Việt Day', 'Ngày hội tài năng toàn trường', 'Tháng 9 hoặc giữa năm học', 'Sân khấu showcase, triển lãm gian hàng, 10 tiết mục', 'Tôn vinh thành quả và truyền cảm hứng cho khối dưới'],
    ['Gen Việt Awards', 'Lễ vinh danh cuối năm', 'Tháng 12', '20 giải thưởng, Sổ vàng Gen Việt, mời phụ huynh và đối tác', 'Ghi nhận cá nhân và tập thể xuất sắc'],
    ['Gen Việt Camp', 'Trại kỹ năng 2–3 ngày', 'Tháng 7', '100 học sinh, 5 nhóm xuất sắc, rèn tự lập và tinh thần đồng đội', 'Nơi tuyến Gia đình và tuyến CLB gặp nhau'],
    ['Gen Việt Talent Show', 'Thi năng khiếu nghệ thuật và sáng tạo', 'Tháng 10', '15 tiết mục, 5 giải thưởng', 'Cửa cho những em mạnh về nghệ thuật hơn về học thuật'],
    ['Together We Shine', 'Trại liên trường', 'Theo cụm trường', 'Giao lưu kỹ năng, thi đấu học thuật, talkshow', 'Mở rộng ra ngoài phạm vi một trường'],
    ['Người Thắp Sáng Gen Việt', 'Toạ đàm ba bên', 'Tháng 11', 'Học sinh — phụ huynh — cựu thành viên cùng ngồi', 'Buổi duy nhất trong năm cả ba thế hệ cùng nói']
  ];

  G.TY_XH_LUAT = [
    'Tuyến này là tuyến **duy nhất mà bằng chứng do người ngoài hệ ký**. Vì thế nó nặng nhất khi xét cấp.',
    'Không dự án nào được tính nếu **không nêu được người thụ hưởng cụ thể** và tác động cụ thể.',
    'Sự kiện lớn phải có **kế hoạch sáu bước** và **báo cáo tổng kết lưu hồ sơ** — không tổ chức xong là xong.',
    'Mọi hoạt động ngoài cơ sở phải có **hồ sơ an toàn đầy đủ** và **bảo hiểm tai nạn** trước khi khởi hành.',
    'Tài trợ theo ba nguyên tắc: **minh bạch** (có chứng từ) · **đúng mục đích** (phục vụ học sinh) · **vinh danh** (nêu tên công khai).',
    'Không thương mại hoá hoạt động giáo dục. Đây là cam kết ghi trong đề án trình Ban Giám hiệu.'
  ];

  /* ── 8 · TUYẾN 5 · Khởi nghiệp và chuyên gia ─────────────── */
  G.TY_KN_DE_TAI = [
    ['GV-R1', 'Mô hình 15 giai đoạn Gen Việt trong phát triển toàn diện học sinh THCS', 'Kiểm chứng hiệu quả khung 15 giai đoạn lên Thân–Tâm–Trí–Văn–Thể–Mĩ', 'Bộ rubric và Sổ tay Tầm nhìn cá nhân Gen Việt'],
    ['GV-R2', 'Ảnh hưởng của bốn yếu tố bứt phá đến thói quen kỷ luật và thành tích học tập', 'Đo vai trò Thái độ–Lộ trình–Cố vấn–Nỗ lực', 'Bộ công cụ mentoring và lộ trình 90 ngày'],
    ['GV-R3', 'Ba giai đoạn Làm — Làm đúng — Duy trì như khung xây dựng thói quen lãnh đạo trẻ', 'Xác định chu trình hình thành thói quen ở tuổi 12–15', 'Danh mục và quy trình coaching thói quen'],
    ['GV-R4', 'Ứng dụng bảy bước Gen Việt trong phát triển tự lãnh đạo và trách nhiệm học tập', 'Đo thay đổi khi áp dụng trọn bảy bước trong 6–12 tháng', 'Bộ công cụ mục tiêu cá nhân hoá và bảng theo dõi'],
    ['GV-R5', 'Hiệu quả Mật mã Gen Tài Năng trong phân ban và hướng nghiệp sớm', 'Xem mô hình phân Mật mã Gen có tăng phù hợp và động lực không', 'Bộ test Mật mã Gen Việt và hướng dẫn phân ban'],
    ['GV-R6', 'CLB Gen Việt như hệ sinh thái “AI-ready student”', 'Đánh giá tác động lên năng lực số, tư duy phản biện, đạo đức số', 'Bộ chuẩn “Công dân số Gen Việt” và học phần AI an toàn'],
    ['GV-R7', 'Từ thành viên đến Đại sứ Gen Việt: cơ chế lan toả giá trị và văn hoá trường', 'Đo hiệu ứng lan toả lên lớp, trường và gia đình', 'Mô hình Đại sứ Gen Việt và bộ công cụ truyền thông nội bộ'],
    ['GV-R8', 'Vai trò CLB Gen Việt trong hiện thực hoá Nghị quyết 71-NQ/TW và Chiến lược giáo dục 2030–2045', 'Kết nối chính sách vĩ mô với mô hình CLB tại chỗ', 'Bộ hồ sơ minh chứng chính sách — thực tiễn'],
    ['GV-R9', 'Quan hệ giữa tham gia dự án Gen Việt và phát triển phẩm chất công dân, phụng sự cộng đồng', 'Đo tác động dự án phụng sự lên trách nhiệm và lòng yêu nước', 'Bộ khung Dự án phụng sự theo chuẩn kỹ năng sống'],
    ['GV-R10', 'Lộ trình Gen Việt → cán bộ gương mẫu → vai trò dẫn dắt: một pipeline phát triển nhân tài trẻ', 'Xây pipeline nhân sự học sinh và kiểm chứng hiệu quả', 'Khung phát triển lãnh đạo học sinh chuẩn hoá cho nhiều trường']
  ];

  G.TY_KN_THIET_KE = [
    { t: 'Đối tượng', n: 'Học sinh 12–15 tuổi tham gia CLB, **và một nhóm đối chứng** không tham gia ở cùng trường cùng khối.', vi: 'Không có nhóm đối chứng thì mọi con số chỉ là mô tả, không phải bằng chứng.' },
    { t: 'Phạm vi', n: '1–3 trường thí điểm, rồi mở rộng 5–10 trường.', vi: 'Xin phạm vi vừa sức. Xin rộng quá là dấu hiệu thiếu thực tế.' },
    { t: 'Phương pháp', n: 'Kết hợp định lượng (thang đo, rubric, điểm số, hành vi) và định tính (phỏng vấn, nhật ký, quan sát, case study).', vi: 'Một mình định lượng thì mỏng; một mình định tính thì không kiểm chứng được.' },
    { t: 'Thời gian', n: 'Tối thiểu 6–12 tháng để đo được cả ba giai đoạn *làm — làm đúng — duy trì làm đúng*.', vi: 'Dưới sáu tháng chỉ đo được giai đoạn một.' },
    { t: 'Công cụ', n: 'Bộ form GV-01 → GV-10 · rubric 15 giai đoạn · thang đo bốn yếu tố, ba giai đoạn, bảy bước · bảng ba màu · portfolio cá nhân.', vi: 'Toàn bộ công cụ đã có sẵn trong hệ — nghiên cứu không phải chế thêm.' },
    { t: 'Khả năng nhân rộng', n: 'Có quy trình, tài liệu, biểu mẫu và chương trình tập huấn để triển khai cho tỉnh thành khác.', vi: 'Đây là tiêu chí hội đồng đọc kỹ nhất ở phần cuối.' }
  ];

  G.TY_KN_NGHE = [
    { b: '1', t: 'Chạm tài năng', ai: 'Ban Tài Năng Việt + mentor',
      n: 'Test Mật mã Gen Tài Năng, thử nhiều vai nhỏ, ghi lại việc nào làm mà quên giờ.',
      ra: 'Bảng “Em giỏi gì — Em thích gì”, có phản hồi của ít nhất hai người ngoài gia đình' },
    { b: '2', t: 'Ý tưởng học đường', ai: 'Ban Trí Tuệ Việt',
      n: 'Cuộc thi ý tưởng, phản biện công khai, chọn ươm mầm.',
      ra: 'Ba ý tưởng được chọn, một ý tưởng triển khai thật' },
    { b: '3', t: 'Talk — Tour — Task', ai: 'Ban Kết Nối Việt',
      n: 'Gặp mentor doanh nghiệp, tham quan nơi làm việc thật, rồi **nhận một việc thật** làm trong bốn tuần.',
      ra: 'Báo cáo học tập thực tế có xác nhận của nơi tiếp nhận' },
    { b: '4', t: 'Dự án có người dùng', ai: 'Cố vấn chuyên môn',
      n: 'Sản phẩm có người dùng thật ngoài trường, có phản hồi ghi lại được.',
      ra: 'Hồ sơ dự án và phản hồi người dùng — dòng nặng nhất trong hồ sơ năng lực' },
    { b: '5', t: 'Đề tài nghiên cứu ứng dụng', ai: 'Hội đồng khoa học nhà trường',
      n: 'Chọn một trong mười đề tài GV-R, làm cùng giáo viên hướng dẫn.',
      ra: 'Hồ sơ đề tài đăng ký được cấp trường, cấp Sở hoặc cấp Bộ' },
    { b: '6', t: 'Hồ sơ hướng nghiệp', ai: 'Mentor + phụ huynh',
      n: 'Tổng hợp toàn bộ minh chứng thành một hồ sơ dùng được cho học bổng và tuyển sinh.',
      ra: 'Hồ sơ năng lực có minh chứng từng dòng, và bản tầm nhìn 1–3 năm' }
  ];

  G.TY_KN_LUAT = [
    'Tuyến này **mở từ cấp 5** (Hạt giống phục vụ) trở lên. Mở sớm hơn là bắt trẻ chạy trước khi đứng vững.',
    'Mọi đề tài phải có **sản phẩm ứng dụng trực tiếp cho CLB** — không làm nghiên cứu để lấy giấy.',
    'Ý tưởng không triển khai thì không tính. **Một ý tưởng làm thật hơn mười ý tưởng trình bày hay.**',
    'Bước “Task” trong Talk–Tour–Task là bắt buộc: gặp và tham quan mà không nhận việc thì mới đi được hai phần ba.',
    'Không để doanh nghiệp tài trợ đổi lấy quyền tiếp cận thương mại tới học sinh. Ranh giới này không thương lượng.',
    'Hồ sơ hướng nghiệp thuộc về học sinh, không thuộc về trường hay CLB — mang theo khi chuyển trường.'
  ];


  /* ── 10 · HOÀ GIẢI HAI THANG ──────────────────────────────
     Hệ này từng mang hai thang tiến bộ song song mà không nói rõ
     quan hệ giữa chúng: SÁU BẬC B1–B6 (bản dựng đầu tiên nghĩ ra)
     và MƯỜI LĂM GIAI ĐOẠN (rút từ tài liệu gốc). Hai thang song
     song trong một hệ là lỗi, không phải sự phong phú — người
     dùng không biết mình đang ở đâu.

     Cách xử: KHÔNG bỏ thang nào, mà tách vai trò.
     · Mười lăm giai đoạn là THANG NỘI DUNG — em đang rèn cái gì.
       Đây là thang chuẩn, lấy từ tài liệu gốc của Học viện.
     · Sáu bậc là THANG QUYỀN — em được mở tới đâu trong hệ.
       Nó tồn tại vì phân quyền cần một thang thô, sáu nấc; mười
       lăm nấc thì quá mịn để gắn quyền.
     Bảng dưới đây là ánh xạ chính thức giữa hai thang.          */
  /* Tên bậc lấy NGUYÊN theo GV.BAC — nơi sáu bậc quyền được định
     nghĩa. Bản dựng đầu của bảng này từng tự nghĩ ra một bộ tên
     khác (RỄ · THÂN · TÁN · QUẢ), và điều đó tạo ra đúng thứ nhầm
     lẫn mà chính luật ánh xạ sinh ra để chặn: "THÂN" vừa là tên
     giai đoạn 1 vừa là tên một bậc. Đã sửa; bộ kiểm nay đối chiếu
     bảng này với GV.BAC ở mỗi lần dựng. */
  G.TY_ANH_XA_BAC = [
    ['B1', 'HẠT', 'Giai đoạn 1–3 · THÂN · TÂM · TRÍ', 'Nề nếp, cảm xúc, cách học — ba thứ nền',
     'Mở phần chung và hành trình của chính em'],
    ['B2', 'MẦM', 'Giai đoạn 4–6 · VĂN · THỂ · MĨ', 'Ứng xử, sức bền, thẩm mỹ — trọn sáu giai đoạn Nền',
     'Thêm sổ tay vai và biểu mẫu gia đình'],
    ['B3', 'THÂN', 'Giai đoạn 7–9 · Cách học', 'Tư duy phát triển, phương pháp riêng, kỹ năng toàn diện',
     'Thêm nhịp chi hội và lịch năm'],
    ['B4', 'TRỤ', 'Giai đoạn 10–11 · Kết quả', 'Kết quả thấy được và bắt đầu tạo giá trị cho người khác',
     'Thêm điều hành chi hội: ghế, nhiệm kỳ, bàn giao'],
    ['B5', 'NGƯỜI DẪN', 'Giai đoạn 12–14 · Bộ công cụ', 'Bốn yếu tố bứt phá, ba giai đoạn thói quen, bảy bước Gen Việt',
     'Mở kho nghề: ma trận, phác đồ, chiến lược'],
    ['B6', 'KIẾN TRÚC SƯ', 'Giai đoạn 15 · Hội tụ', 'Đại diện được cho lớp, cho trường, cho Gen Việt',
     'Mở phần nghiệm thu và cố vấn cho bậc dưới']
  ];

  G.TY_ANH_XA_LUAT = [
    'Thang chuẩn là MƯỜI LĂM GIAI ĐOẠN. Mọi tài liệu chuyên môn, giáo án và kỳ nghiệm thu đều nói bằng thang này.',
    'Sáu bậc chỉ dùng cho một việc: quyết định một tài khoản mở được tới đâu. Không dùng sáu bậc để mô tả năng lực của một em.',
    'Không em nào được lên bậc mà chưa đi hết các giai đoạn thuộc bậc ấy. Ánh xạ này là điều kiện, không phải mô tả.',
    'Một em có thể ở giai đoạn 11 mà vẫn giữ bậc B3 nếu chưa có bằng chứng tầng ba. Bậc đi sau giai đoạn, không đi trước.',
    'Khi hai thang mâu thuẫn trong một hồ sơ, giai đoạn là thứ đúng và bậc là thứ phải sửa.',
    'Không thêm thang thứ ba. Mọi cách xếp hạng mới phải quy về một trong hai thang này, hoặc thay thế hẳn một thang.',
    'Tên sáu bậc chỉ được đặt ở MỘT chỗ: GV.BAC. Mọi bảng khác viện dẫn tên bậc đều phải khớp với nó, và bộ kiểm đối chiếu ở mỗi lần dựng. Luật này sinh ra vì chính bảng ánh xạ trên đã từng tự nghĩ ra một bộ tên khác — làm cho chữ THÂN vừa là tên một giai đoạn vừa là tên một bậc.'
  ];

  /* ── 9 · Nguồn ────────────────────────────────────────────── */
  G.TY_NGUON = [
    ['Hệ 10 Cấp Độ Đào Tạo Gen Việt', 'Mười cấp độ, 100 chương trình huấn luyện, nhóm năng lực A–F, chuẩn đầu ra bốn góc nhìn', 'Tuyến 1'],
    ['Cẩm nang Vận hành Gen Việt', 'Sơ đồ tổ chức, mô tả vị trí, KPI sáu tháng, RACI, PDCA, heatmap cảnh báo sớm', 'Tuyến 1'],
    ['Quy trình họp CLB Gen Việt', 'Quy trình trước — trong — sau buổi sinh hoạt, phân việc 12 Ban, lịch truyền thông tuần', 'Tuyến 1'],
    ['Chuyên đề 52 tuần đào tạo trong CLB Gen Việt', 'Leadership Lab, Squad Sprint, 20 quy ước hành vi, Team vô địch tuần', 'Tuyến 1'],
    ['Chương trình đào tạo Gen Việt cấp 1 · Khối lớp 1–5', 'Năm nhóm cố định × 10 chuyên đề mỗi khối, mã hoá GV<khối>.<nhóm>.<số>', 'Tuyến 2'],
    ['Chương trình Gen Việt Tiểu học · Giáo án lớp 2–5', 'Giáo án chi tiết từng buổi theo khối', 'Tuyến 2'],
    ['Ươm Mầm Gen Việt — đề án thành lập CLB', 'Định vị, cơ cấu tổ chức, RACI, KPI hai năm, kế hoạch 12 tháng, bộ mẫu biểu hành chính', 'Tuyến 1 · 3 · 4'],
    ['Lộ trình 90 ngày bứt phá cùng Gen Việt', 'Bốn giai đoạn, văn hoá 5S, nhật ký, ba danh hiệu', 'Tuyến 3'],
    ['Bộ Đề Tài Nghiên Cứu Ứng Dụng Gen Việt', 'Mô hình 15 giai đoạn, pipeline 5 cấp, 10 đề tài GV-R1→R10, khung thiết kế nghiên cứu', 'Xương sống · Tuyến 5'],
    ['Master Gen Việt (bốn bản)', 'Khung sách và hệ thống lý luận nền', 'Toàn hệ'],
    ['Trại huấn luyện Leader Boom 2026', 'Thiết kế trại và hậu trại', 'Tuyến 4'],
    ['Học viện Gen Việt VIP · Chương trình điều hành', 'Chương trình điều hành và chuẩn học viện', 'Tuyến 1'],
    ['Mô hình Bukatsu', 'Tham chiếu mô hình câu lạc bộ học đường Nhật Bản', 'Tham chiếu'],
    ['BNI Accelerate Journey · Cẩm nang Vận hành Chapter', 'Tham chiếu mô hình chi hội có chiều sâu và quy trình họp', 'Tham chiếu']
  ];

})(window.GV = window.GV || {});
