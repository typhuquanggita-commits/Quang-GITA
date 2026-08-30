/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT · TRẠI LEADER BOOM · HỌC VIỆN VIP · MÔ HÌNH BUKATSU
   Kho này KHÔNG do bản dựng nghĩ ra. Nó rút từ ba tài liệu gốc
   trong thư mục GEN VIỆT của Học viện GITA, đọc ngày 30.08.2026:
   "TRẠI HUẤN LUYỆN LEADER BOOM 2026.docx" (phần A),
   "HỌC VIỆN GEN VIỆT. VIP.docx" (phần B),
   "Mô hình Bukatsu.docx" (phần C).
   Bản dựng trước mới chỉ nêu tên trại Leader Boom mà chưa có thiết
   kế thật, chưa có chuẩn đầu vào — đầu ra của chương trình VIP, và
   chưa có chỗ nào nói mô hình CLB học từ Nhật điều gì. Kho này lấp
   ba khoảng trống đó. Ba nguồn độc lập, ba phần tách bạch.

   BỐN ĐIỀU PHẢI BIẾT VỀ NGUỒN — đọc trước khi dùng số liệu:

   1. Tài liệu trại có HAI phương án 7 ngày khác nhau. Phương án
      đầu đặt Ngày 2 là "Soi gương", Ngày 3 là "N.V.L cá nhân".
      Phương án sau — bộ 7 bảng tóm tắt soạn để training nội bộ đội
      HLV — đặt Ngày 2 là "Kỷ luật, thói quen, trách nhiệm". Kho
      này dùng phương án sau vì nó đủ sáu cột (mục tiêu, trục nội
      dung, công cụ, output, vai trò HLV, rủi ro). Khác biệt này là
      của tài liệu gốc, không phải lỗi trích.

   2. G.TV2_TRAI_LICH chỉ là lịch NGÀY 1. Tài liệu có bảng
      06h00–22h00 tương tự cho cả bảy ngày; ở đây trích trọn một
      ngày làm mẫu khối giờ. Cột `ai` do bản dựng suy từ cột "Gợi ý
      phong cách" của bảng gốc — chỗ nào bảng gốc gọi tên (thầy
      Quang, HLV, trainer) thì giữ nguyên, chỗ nào không gọi tên ai
      thì ghi "HLV trực đội". Đây là suy luận, không phải chữ gốc.

   3. Tài liệu trại KHÔNG có chương an toàn riêng. G.TV2_TRAI_AN_TOAN
      được gom từ ba chỗ rời: mục "Luật chơi Leader Boom" của Phiên
      1 Ngày 1, Phiếu A "Kỳ vọng & Cam kết", và các ô "Rủi ro & Lưu
      ý" trong 7 bảng training HLV. Không có quy định y tế, sơ cứu,
      bảo hiểm, danh sách thuốc hay quy trình khi có sự cố — nguồn
      không viết, và kho này không bịa ra.

   4. Tệp "Mô hình Bukatsu.docx" đã bị tìm-thay-thế: chữ "Bukatsu"
      bị đổi thành "Gen Việt" và cặp "senpai–kōhai" bị đổi thành
      "Gen A – Gen V" trên toàn văn. Dấu vết còn lại là những câu
      hụt chữ như "kiểu  nhưng nhân văn" hay tiêu đề "Mô hình Gen
      Việt–Gen Việt". Vì vậy chữ "Bukatsu" và "senpai–kōhai" trong
      phần C là bản dựng khôi phục từ TÊN TỆP và văn cảnh, không
      phải chữ còn nằm trong thân tài liệu. Mọi phát biểu về mô hình
      Nhật ở đây chỉ giới hạn trong điều tài liệu thật sự khẳng
      định; nguồn không nêu tên trường, số liệu khảo sát hay công
      trình nghiên cứu cụ thể nào, nên kho này cũng không nêu.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ══════════════════════════════════════════════════════════════
     A · TRẠI HUẤN LUYỆN LEADER BOOM 2026
     Nguồn: "TRẠI HUẤN LUYỆN LEADER BOOM 2026.docx"
     ══════════════════════════════════════════════════════════════ */

  /* ── A1 · Khung 7 ngày — bộ bảng training nội bộ HLV ───────── */
  G.TV2_TRAI_KHUNG = [
    {
      ma: 'DAY 1',
      t: 'Thức tỉnh bản thân – Nhìn xa 20 năm',
      nam: 'Học viên hiểu trại là hành trình rèn luyện chứ không phải "trại chơi"; bắt đầu trả lời "Tôi là ai hôm nay?" và "20 năm nữa tôi muốn là ai?".',
      hoi: 'Em là ai trong Việt Nam Đổi Mới?',
      lam: [
        'Định vị trại – luật chơi – giới thiệu 5 DÁM.',
        'Tự đánh giá hiện tại qua Bánh xe cuộc sống học sinh Gen Việt, 8 múi, thang 0–10.',
        'Chọn 3–5 phẩm chất ADN Gen Việt muốn rèn.',
        'Kể chuyện Nhân tài đất Việt để khơi tầm nhìn 20 năm.',
        'Vẽ Bản đồ ước mơ 20 năm và viết Tuyên ngôn cá nhân bản nháp.',
        'Công cụ bắt buộc chuẩn bị trước: Phiếu A Kỳ vọng & Cam kết · Phiếu B Bánh xe cuộc sống · Phiếu C ADN Gen Việt · Phiếu D Bản đồ ước mơ 20 năm · Phiếu E Tuyên ngôn cá nhân bản nháp'
      ],
      dich: [
        'Phiếu Kỳ vọng & Cam kết đã viết và ký tên.',
        'Bánh xe cuộc sống chấm xong, chỉ ra 1–2 múi yếu.',
        'Chọn xong 3–5 phẩm chất ADN Gen Việt.',
        'Bản đồ 20 năm sơ khởi.',
        'Nhật ký Ngày 1 ít nhất 5–10 dòng thật.'
      ],
      cong: 'Dùng Bánh xe cuộc sống và ADN Gen Việt đã chọn làm nền để Ngày 2–3 đi vào kỷ luật, thói quen, N.V.L và kế hoạch 4–8 tuần.',
      rui: 'Học sinh mơ mơ hồ — HLV phải chấp nhận "ước mơ mờ" miễn là thật, không vội chỉnh cho cụ thể. Tránh biến phiên sáng thành giờ phổ biến nội quy khô khan.',
      mau: '#185AB4'
    },
    {
      ma: 'DAY 2',
      t: 'Kỷ luật, thói quen và trách nhiệm với chính mình',
      nam: 'Học sinh hiểu kỷ luật là tự trọng chứ không phải bị ép; nhìn rõ chuỗi thói quen tốt và xấu hằng ngày.',
      hoi: '24 giờ của em đang đi đâu?',
      lam: [
        'Phân biệt kỷ luật bên ngoài và kỷ luật bên trong.',
        'Vẽ bảng "24h của tôi" và Radar thói quen.',
        'Nhận diện "kẻ cướp thời gian": điện thoại, game, mạng xã hội.',
        'Giới thiệu nguyên lý hình thành thói quen theo chuỗi cue – routine – reward, lặp 21–66 ngày.',
        'Chọn 1–2 thói quen cần xây và 1 thói quen xấu cần bỏ.',
        'Công cụ bắt buộc chuẩn bị trước: Bảng “24h của tôi” chia theo mốc giờ · Bảng Radar thói quen · Form “Thói quen muốn xây – Thói quen muốn bỏ – Lý do”'
      ],
      dich: [
        'Hoàn thành bản đồ 24 giờ hiện tại.',
        'Danh sách 3–5 thói quen tốt và 3–5 thói quen chưa tốt.',
        'Chọn được 1 thói quen sẽ xây và 1 thói quen sẽ giảm trong 4–8 tuần tới.',
        'Nhật ký ngày 2 ghi 1 lỗi mình dám nhận và bài học từ đó.'
      ],
      cong: 'Chuyển sang: “Nếu không có kế hoạch 4–8 tuần và N.V.L rõ, thói quen tốt khó bền.” Thói quen vừa chọn thành chất liệu cho kế hoạch 90 ngày.',
      rui: 'Dễ sa vào giảng đạo lý. Có học sinh tự ti khi thấy mình "quá tệ" — HLV phải khen mọi bước nhận diện: "Con nhận ra đã là bước rất lớn".',
      mau: '#0B7350'
    },
    {
      ma: 'DAY 3',
      t: 'N.V.L và kế hoạch 4–8 tuần, nền cho 90 ngày',
      nam: 'Học sinh biết đặt mục tiêu cụ thể vừa sức, biết chia nhỏ mục tiêu 4–8 tuần xuống tuần và ngày.',
      hoi: 'Ước mơ của em biến thành lịch tuần bằng cách nào?',
      lam: [
        'Ôn lại ước mơ 20 năm, ADN đã chọn và thói quen chốt ở Ngày 2.',
        'Giới thiệu khung N.V.L — Nói Và Làm, lấy từ tấm gương Nguyễn Văn Linh.',
        'Dạy khung SMART, có bản rút gọn cho lứa nhỏ.',
        'Thiết kế mục tiêu 4–8 tuần trên ba mảng: học tập, thói quen, sức khoẻ.',
        'Xây bảng kế hoạch tuần và bảng điểm tự chấm đơn giản.',
        'Công cụ bắt buộc chuẩn bị trước: Form “Mục tiêu 4–8 tuần” ba mục Học – Thói quen – Sức khoẻ · Bảng “Kế hoạch tuần” có ô tick theo ngày · Phiếu “Hợp đồng mini 4–8 tuần” ghi tên người đồng hành giám sát'
      ],
      dich: [
        '1–3 mục tiêu 4–8 tuần rõ ràng, đo được.',
        'Bản kế hoạch tuần sơ khởi có khung giờ và hoạt động.',
        'Xác định 1 buddy hoặc mentor trong gia đình, thầy cô hoặc hệ Gen Việt.'
      ],
      cong: 'Nhấn: “Muốn mục tiêu thành hiện thực, phải dám nói, dám thuyết phục, dám trình bày với ba mẹ, thầy cô, đội nhóm.” Đó là cầu nối sang Ngày 4.',
      rui: 'Tránh biến thành giờ làm thời khoá biểu nhàm chán. Lứa 10–12 tuổi cần ít mục tiêu và đơn giản; lứa 13–15 mới chi tiết được.',
      mau: '#A8801F'
    },
    {
      ma: 'DAY 4',
      t: 'Lên tiếng, trình bày và truyền cảm hứng',
      nam: 'Học sinh bớt sợ nói trước đám đông, trình bày được một ý tưởng trong 2–3 phút, hiểu tiếng nói là trách nhiệm chứ không phải vũ khí.',
      hoi: 'Em dám nói điều đúng vào lúc khó không?',
      lam: [
        'Mổ xẻ nỗi sợ: vì sao nói trước đám đông lại đáng sợ.',
        'Học khung bài nói 3 phút theo bố cục Mở – Thân – Kết.',
        'Thực hành nói về một trong ba đề: ước mơ 20 năm, mục tiêu 4–8 tuần, hoặc một câu chuyện cống hiến và biết ơn.',
        'Luyện kỹ năng lắng nghe và phản hồi tích cực.',
        'Công cụ bắt buộc chuẩn bị trước: Khung “Bài nói 3 phút” gồm 3–5 gạch đầu dòng · Phiếu “Feedback tích cực” cho người nghe · Check-list “Khi đứng trước đám đông”: tư thế – mắt – giọng – nụ cười'
      ],
      dich: [
        'Viết được dàn ý một bài nói ngắn trên giấy hoặc trong sổ.',
        'Thực hành nói ít nhất 1 lần trong nhóm nhỏ.',
        'Có 1 bài nói được ghi hình nếu điều kiện cho phép.'
      ],
      cong: 'Đặt cầu nối: “Ngày mai chúng ta không chỉ nói mà sẽ làm — qua Dự án Cống hiến Gen Việt.” Tiếng nói hôm nay thành ý tưởng cho dự án Ngày 5.',
      rui: 'Học sinh nhút nhát dễ trốn, nên chia nhiệm vụ rõ và cho nói theo cặp trước. Tránh biến đêm lên tiếng thành cuộc thi hùng biện nặng thành tích.',
      mau: '#5140B4'
    },
    {
      ma: 'DAY 5',
      t: 'Cống hiến thật – Dự án Gen Việt và lòng biết ơn',
      nam: 'Học sinh hiểu cống hiến không đợi "lớn rồi mới làm"; thực hành một dự án cống hiến nhỏ ngay trong phạm vi trại.',
      hoi: 'Trong trại này, em làm được điều tốt nào cho người khác ngay hôm nay?',
      lam: [
        'Vẽ Bản đồ "Những người đã cống hiến cho em".',
        'Chọn vấn đề và đối tượng hưởng lợi ngay trong trại.',
        'Thiết kế và triển khai Dự án Gen Việt theo nhóm, phân vai rõ.',
        'Đêm Cống hiến và Biết ơn: trình bày dự án, chia sẻ cảm xúc.',
        'Công cụ bắt buộc chuẩn bị trước: Bản đồ những người đã cống hiến cho em · Project Canvas Leader Boom · Bảng phân vai dự án gồm Leader, phó, hậu cần, truyền thông · Rubric ba góc nhìn BTC – trại sinh – tự đánh giá · Nhật ký Cống hiến cá nhân'
      ],
      dich: [
        'Mỗi nhóm hoàn thành ít nhất 1 dự án nhỏ, có sản phẩm hữu hình.',
        'Mỗi học viên viết 1 trang Nhật ký Cống hiến.',
        'Buổi tối trình bày kết quả dự án kèm cảm nhận cá nhân.'
      ],
      cong: 'Chuyển ý: “Để cống hiến được lâu dài, chúng ta cần đội ngũ và văn hoá.” Dự án Ngày 5 là tiền đề để nhìn lại teamwork ở Ngày 6.',
      rui: 'Dự án quá to thì không làm kịp, học sinh nản. Tránh biến thành cuộc thi công trình — mục tiêu là trải nghiệm cống hiến và tri ân, không phải sản phẩm hoành tráng.',
      mau: '#BE0E16'
    },
    {
      ma: 'DAY 6',
      t: 'Đội ngũ và văn hoá — không ai làm lãnh đạo một mình',
      nam: 'Học sinh phân biệt được "nhóm", "đội" và "đội ngũ"; tự thiết kế Team Canvas và Team Charter cho đội mình.',
      hoi: 'Đội của em sống bằng bộ quy tắc nào khi HLV không có mặt?',
      lam: [
        'Game teamwork rồi phân tích khác biệt Nhóm – Đội – Đội ngũ.',
        'Thiết kế Team Canvas và Team Charter: giá trị – hành vi – nghi thức.',
        'Học 3 bước xử lý mâu thuẫn.',
        'Diễn tập tình huống đội kèm Feedback 360°.',
        'Đêm Văn hoá Leader Boom: mỗi đội trình diễn bản sắc riêng.',
        'Công cụ bắt buộc chuẩn bị trước: Team Canvas Leader Boom · Team Charter theo mẫu 3 điều làm – 3 điều tránh – nghi thức · Bảng “Gen Việt Team DNA” · Thang trưởng thành đội ngũ 4 bậc · Bảng 6 vai lãnh đạo trong đội · Phiếu Feedback 360°'
      ],
      dich: [
        'Mỗi đội có bản Team Canvas và Team Charter hoàn chỉnh.',
        'Học sinh tự nhận dạng vai trò lãnh đạo của mình trong đội.',
        'Mỗi em có 1 Phiếu Feedback 360° gồm tự đánh giá và góp ý của bạn.'
      ],
      cong: 'Nói rõ: “Ngày 7 là lúc chốt lại toàn bộ hành trình, thiết kế 90 ngày – 1 năm – 20 năm, nhận cup và bước vào hệ sinh thái Gen Việt.” Team Canvas thành nền cho Bản chuyển giao đội ngũ sau trại.',
      rui: 'Một số đội bị "dính nhãn" mạnh hoặc yếu, dễ gây tự ti. Tránh để Đêm Văn hoá trở thành diễn trò tấu hài; phải luôn kéo về giá trị và bản sắc.',
      mau: '#9E470D'
    },
    {
      ma: 'DAY 7',
      t: 'Cất cánh — Cam kết 90 ngày và Lễ tổng kết',
      nam: 'Học sinh nhìn lại trọn hành trình, tự đánh giá thay đổi, viết Kế hoạch 90 ngày và phác Bản đồ 1 năm – 20 năm, rồi được nối vào hệ sinh thái Gen Việt sau trại.',
      hoi: 'Ngày mai mới là ngày hành trình bắt đầu — em bắt đầu bằng việc gì?',
      lam: [
        'Tổng kết hành trình bằng bảng tự đánh giá 7 ngày.',
        'Thiết kế Kế hoạch 90 ngày, nâng lên từ kế hoạch 4–8 tuần của Ngày 3.',
        'Phác lại Bản đồ 1 năm – 20 năm chi tiết hơn, liên thông với 90 ngày.',
        'Viết Thư gửi chính mình sau 90 ngày và Thư gửi ba mẹ.',
        'Tổ chức Lễ tổng kết: trao cup, Lửa cam kết, Lời thề Leader Boom.',
        'Công cụ bắt buộc chuẩn bị trước: Phiếu Check-out 7 ngày · Mẫu Kế hoạch 90 ngày gồm mục tiêu, thói quen, kế hoạch tuần, buddy, cách báo cáo · Bản đồ 1 năm – 20 năm chia 4 giai đoạn · Mẫu Thư gửi chính mình và Thư gửi ba mẹ · Phiếu đăng ký vai trò sau trại · Lời thề Leader Boom – Gen Việt · Mẫu Giấy chứng nhận hoàn thành trại'
      ],
      dich: [
        'Kế hoạch 90 ngày hoàn chỉnh ở mức cơ bản.',
        'Thư gửi chính mình và thư gửi gia đình, viết thật.',
        'Phiếu Check-out 7 ngày.',
        'Phiếu đăng ký vai trò sau trại cho học sinh muốn gắn dài hạn.'
      ],
      cong: 'Ra khỏi trại: dùng Kế hoạch 90 ngày, thư và phiếu vai trò để tổ chức các mốc follow-up 30–60–90 ngày, kết nối với CLB Gen Việt tại trường và tuyển “Leader Boom thế hệ 2”.',
      rui: 'Học sinh dễ tụt cảm xúc vì nghĩ "mai về rồi" — HLV phải xoay lại: "thật ra mai mới là ngày hành trình bắt đầu". Tránh để lễ kéo quá dài; phần phát biểu phải gọn và có chuẩn bị.',
      mau: '#185AB4'
    }
  ];

  /* ── A2 · Lịch khối giờ Ngày 1, 06h00–22h00 ────────────────── */
  G.TV2_TRAI_LICH = [
    { p: '06:00–06:30', m: 'Thức dậy, vệ sinh cá nhân, mở nhạc nhẹ. Bật nhạc vui nhưng êm, không quát tháo.', ai: 'HLV trực đội', y: 'Chuyển trạng thái, tạo năng lượng tích cực đầu ngày' },
    { p: '06:30–07:00', m: 'Thể dục Leader Boom "Wake-up Boom": bài ngắn 10–12 động tác, kết bằng khẩu hiệu "Leader Boom – Vươn mình!".', ai: 'HLV trực đội', y: 'Làm ấm cơ thể, tạo nhịp độ trại, khởi động tinh thần tập thể' },
    { p: '07:00–07:30', m: 'Ăn sáng. Hướng dẫn văn hoá bàn ăn: xếp hàng, biết cảm ơn, không lãng phí.', ai: 'HLV trực đội', y: 'Nạp năng lượng và rèn nếp sinh hoạt' },
    { p: '07:30–08:00', m: 'Chuẩn bị, chia đội, nhận khăn và màu đội. Mỗi đội mang một tên gắn với 5 Dám: Đội Ước Mơ, Đội Bứt Phá, Đội Cống Hiến.', ai: 'HLV phụ trách đội', y: 'Chia team và giới thiệu HLV phụ trách' },
    { p: '08:00–08:30', m: 'Lễ khai mạc và nghi thức "Boom Start – 5 nhịp". Thầy Quang ra mắt, chia sẻ 5–7 phút.', ai: 'Thầy Trương Nhật Quang', y: 'Định vị trại, bản sắc và quy ước chung' },
    { p: '08:30–09:30', m: 'Phiên 1 — Bản đồ Việt Nam sống và câu chuyện Đổi Mới. Game chuyển động rồi storytelling.', ai: 'Trainer chính', y: 'Kết nối học viên, hiểu Đổi Mới qua tấm gương Nguyễn Văn Linh' },
    { p: '09:30–09:45', m: 'Giải lao, snack, mini game chuyền bóng hoặc đếm số.', ai: 'HLV trực đội', y: 'Xả năng lượng, giữ tập trung' },
    { p: '09:45–11:15', m: 'Phiên 2 — Em trong bức tranh Việt Nam. Thảo luận nhóm và vẽ poster "Việt Nam & Chúng em".', ai: 'Trainer chính', y: 'Học sinh nhận ra mình là một mảnh ghép của đất nước' },
    { p: '11:15–11:45', m: 'Rubric 5 Dám — đánh giá khởi điểm, học sinh tự chấm mình ở cả 5 Dám.', ai: 'Trainer chính', y: 'Tạo baseline Pre-test để đo tiến bộ sau trại' },
    { p: '11:45–13:30', m: 'Ăn trưa và nghỉ trưa. Khuyến khích nằm nghỉ hoặc giữ yên tĩnh 30–45 phút.', ai: 'HLV trực đội', y: 'Hồi phục năng lượng' },
    { p: '13:30–14:00', m: 'Wake-up nhẹ, trò chơi kích hoạt 5–10 phút: "Ai nói thật – ai nói đùa", "Nhanh như chớp mini".', ai: 'HLV trực đội', y: 'Đánh thức lại sau giờ nghỉ' },
    { p: '14:00–15:30', m: 'Phiên 3 — Chân dung 4 góc: "Em thật sự là ai?". Bài tập cá nhân rồi chia sẻ nhóm nhỏ.', ai: 'Trainer chính', y: 'Nhận diện mạnh – yếu – sở thích – giá trị' },
    { p: '15:30–16:00', m: 'Giải lao, vận động nhẹ: kéo co, nhảy bao bố, đi bộ quanh khuôn viên.', ai: 'HLV trực đội', y: 'Tránh mệt mỏi trí não' },
    { p: '16:00–17:30', m: 'Phiên 4 — Tầm nhìn 20 năm bản V1. Viết cá nhân rồi chia sẻ theo nhóm tuổi.', ai: 'Trainer chính', y: 'Học sinh phác thảo tầm nhìn 10–20 năm đầu tiên' },
    { p: '17:30–18:15', m: 'Tắm rửa và thể thao tự do: bóng đá, cầu lông, tự do trong khuôn khổ.', ai: 'HLV trực đội', y: 'Giải toả năng lượng và thư giãn' },
    { p: '18:15–19:00', m: 'Ăn tối. Tập thói quen dọn khay và giữ sạch bàn ăn.', ai: 'HLV trực đội', y: 'Nạp năng lượng và rèn nếp' },
    { p: '19:00–19:30', m: 'Chuẩn bị vòng tròn tối: học 1 bài hát trại và 1 khẩu hiệu tập thể.', ai: 'HLV trực đội', y: 'Kết nối cảm xúc trước phiên tối' },
    { p: '19:30–21:00', m: 'Phiên tối — Vòng tròn "Ước mơ không bị chê cười". Chia sẻ vòng tròn rồi lời kết của thầy Quang.', ai: 'Thầy Trương Nhật Quang', y: 'Tạo không gian an toàn cho ước mơ' },
    { p: '21:00–21:30', m: 'Viết nhật ký Leader Boom Ngày 1. Mỗi em viết một trang mở đầu bằng "Hôm nay em nhận ra…".', ai: 'HLV trực đội', y: 'Cố kết bài học và cảm xúc trong ngày' },
    { p: '21:30–22:00', m: 'Vệ sinh, đi ngủ, nhạc nhẹ. HLV đi chúc ngủ ngon từng phòng.', ai: 'HLV trực đội', y: 'Khép lại Ngày 1' }
  ];

  /* ── A3 · Hậu trại — cơ chế follow-up 90 ngày ──────────────── */
  G.TV2_TRAI_HAU = [
    {
      m: 'Ngay sau lễ bế mạc',
      t: 'Thu và lưu hồ sơ trại',
      v: [
        'Scan hoặc chụp lại Kế hoạch 90 ngày của từng học viên.',
        'Lưu Team Canvas và Team Charter của từng đội.',
        'Lưu Project Canvas Ngày 5 và Bản chuyển giao đội ngũ Ngày 6.',
        'Ban tổ chức giữ Phiếu đăng ký vai trò sau trại để làm căn cứ follow-up.'
      ]
    },
    {
      m: 'Ngày 10',
      t: 'Check-in nhẹ',
      v: [
        'Liên hệ ngắn để xem nhịp 90 ngày đã khởi động chưa.',
        'Nhắc lại thói quen mà học viên đã chọn xây và chọn bỏ ở Ngày 2.'
      ]
    },
    {
      m: 'Ngày 30',
      t: 'Mini Zoom hoặc gặp offline',
      v: [
        'Học viên trả lời bốn câu của mẫu Báo cáo 30 ngày: giữ được thói quen nào, khó nhất ở đâu, đã làm việc cống hiến nhỏ nào, muốn xin hỗ trợ gì.',
        'Gửi báo cáo qua Zalo hoặc email để ban tổ chức có dữ liệu xây nội dung cho buổi talk 30 ngày.'
      ]
    },
    {
      m: 'Ngày 60',
      t: 'Gửi báo cáo một trang',
      v: [
        'Học viên tự tổng kết tiến độ so với Kế hoạch 90 ngày.',
        'Buddy hoặc mentor xác nhận phần đã làm được.'
      ]
    },
    {
      m: 'Ngày 90',
      t: 'Buổi tổng kết nhỏ — Gặp lại Leader Boom',
      v: [
        'Mời học viên tham gia một buổi online hoặc CLB offline.',
        'Xem lại Thư gửi chính mình nếu ban tổ chức giữ bản chụp.',
        'Cho các em cập nhật: "Con đã làm được gì? Con vướng ở đâu?".'
      ]
    },
    {
      m: 'Sau 90 ngày',
      t: 'Nối vào hệ sinh thái Gen Việt',
      v: [
        'Bốn nhóm vai trò để học viên đăng ký: Lãnh đạo CLB hoặc Đội tại trường, Hạt nhân lớp học, Đại sứ Gen Việt, Thành viên nòng cốt Online.',
        'Đội và nhóm mạnh trở thành Ban nòng cốt cho CLB Gen Việt tại trường.',
        'Tuyển chọn "Leader Boom thế hệ 2": học viên cũ trở thành hỗ trợ viên cho trại năm sau.'
      ]
    }
  ];

  /* ── A4 · Luật trại và ranh giới an toàn ───────────────────── */
  G.TV2_TRAI_AN_TOAN = [
    'Đúng giờ và đúng vị trí. Trại chạy bằng điểm danh, còi và hiệu lệnh.',
    'Tôn trọng tuyệt đối: không body-shaming, không trêu ác ý, không nói tục.',
    'Tham gia đầy đủ hoạt động, không tự ý bỏ giữa chừng.',
    'Trung thực trong mọi bài tập, bài test và trò chơi.',
    'Điện thoại theo quy định: gửi lại ban tổ chức, chỉ dùng trong khung giờ cho phép.',
    'Học viên cam kết không bỏ cuộc trong hoạt động khó, *trừ khi có lý do sức khoẻ* — đây là ngoại lệ ghi thẳng trong Phiếu A, HLV phải tôn trọng.',
    'Hoàn thành nhật ký mỗi tối; đây là điều khoản trong bản cam kết học viên tự ký.',
    'Phiên chia sẻ ước mơ Ngày 1: HLV không được "soi" hay chê ước mơ của trẻ, kể cả ước mơ còn mờ.',
    'Sân khấu Ngày 4: tuyệt đối không chê bai, không nhại giọng, không cười ác ý với người đang nói.',
    'Triển khai dự án Ngày 5: HLV nhắc an toàn khi di chuyển và khi dùng dụng cụ; vai Hậu cần trong nhóm chịu trách nhiệm dụng cụ, thời gian, di chuyển và an toàn.',
    'Diễn tập đội Ngày 6: HLV phải can thiệp khi mâu thuẫn vượt ngưỡng an toàn tâm lý, không để đội tự xử lý tiếp.',
    'Nghi thức lửa trại Ngày 7: chỉ cho học viên chạm tay gần lửa hoặc thả giấy vào lửa khi điều kiện thật sự an toàn.',
    'Khoảnh khắc chia tay: cho phép ký áo và đổi liên lạc, nhưng phải nhắc quy tắc an toàn khi dùng mạng.'
  ];

  /* ══════════════════════════════════════════════════════════════
     B · HỌC VIỆN GEN VIỆT VIP — CHƯƠNG TRÌNH ĐIỀU HÀNH
     Nguồn: "HỌC VIỆN GEN VIỆT. VIP.docx"
     ══════════════════════════════════════════════════════════════ */

  /* ── B1 · Kịch bản điều hành buổi sinh hoạt, khung 10 bước ── */
  G.TV2_VIP_CHUONG_TRINH = [
    ['Bước · khối phút', 'Nội dung', 'Ban phụ trách', 'Mục tiêu của bước'],
    ['1 · 00’–05’', 'Khởi động và chào mừng. Nhạc nền 5–8 giây rồi hạ; MC đứng giữa, tư thế vững, không đùa giỡn; mời cả hội trường chuyển điện thoại sang chế độ im lặng.', 'MC chính · Ban Trái Tim Việt · Kỹ thuật', 'Định vị ngay từ đầu rằng đây là buổi sinh hoạt chuyên nghiệp, đúng giờ, có giá trị'],
    ['2 · 05’–10’', 'Giới thiệu đại biểu: cố vấn, Ban Giám hiệu, thầy cô, doanh nghiệp đối tác, phụ huynh, thành viên. Đọc chậm, rõ, dùng chữ "Quý" nhất quán, không mời phát biểu ở mục này.', 'MC', 'Thể hiện sự trân trọng và kỷ luật xưng hô, nâng tầm hình ảnh Gen Việt'],
    ['3 · 10’–16’', 'Giới thiệu 12 Ban chức năng, mỗi Ban một câu, đại diện đứng dậy chào: Trái Tim Việt, Trí Tuệ Việt, Bản Lĩnh Việt, Phẩm Chất Việt, Lan Toả Việt, Cánh Sát Việt, Kết Nối Việt, Tài Năng Việt, Sự Kiện Việt, Tài Chính Việt, Dự Án Việt, Hậu Cần Việt.', 'MC · Chủ nhiệm Club · đại diện các Ban', 'Cho thấy Gen Việt vận hành như một tổ chức thật, mỗi thành viên có vai rõ, không phải CLB phong trào'],
    ['4 · 16’–22’', 'Giới thiệu Gen Việt, mô hình và giá trị.', 'Chủ nhiệm Club · đại diện Trung Tâm Gen Việt', 'Định vị bản chất: Gen Việt là môi trường huấn luyện lãnh đạo trẻ mang bản sắc Việt'],
    ['5 · 22’–30’', 'Vinh danh thành viên và đối tác.', 'MC · Ban Bản Lĩnh Việt · Chủ nhiệm', 'Củng cố văn hoá công nhận và khích lệ, ghi nhận đóng góp cụ thể chứ không chung chung'],
    ['6 · 30’–60’', 'Chuyên đề đào tạo kèm thực hành 30 phút.', 'Ban Trí Tuệ Việt · speaker hoặc cố vấn · MC hỗ trợ', 'Mỗi buổi có một giá trị hoặc một kỹ năng cốt lõi, thực hành ngay, thành viên cảm nhận rõ mình được nâng cấp'],
    ['7 · 60’–68’', 'Nghi thức kết nạp thành viên mới.', 'MC · Chủ nhiệm · Ban Trái Tim Việt · Ban Bản Lĩnh Việt', 'Tạo cảm giác danh dự, thiêng liêng, được đứng vào hàng ngũ Gen Việt'],
    ['8 · 68’–76’', 'Bài tập "Giới thiệu 20 giây" để rèn kỹ năng.', 'MC · Ban Bản Lĩnh Việt', 'Rèn kỹ năng giới thiệu bản thân chuyên nghiệp và súc tích'],
    ['9 · 76’–84’', 'Báo cáo kết quả và định hướng sự kiện tiếp theo.', 'Ban Cánh Sát Việt · MC · cố vấn hoặc đại diện nhà trường', 'Thể hiện văn hoá đo lường, minh bạch, cải tiến, có tiếng nói định hướng từ người dẫn dắt'],
    ['10 · 84’–90’', 'Khẩu hiệu, chụp ảnh tập thể, kết thúc.', 'MC · toàn thể các Ban', 'Khép buổi bằng hình ảnh chung, giữ đúng cam kết 80–90 phút']
  ];

  /* ── B2 · Chuẩn đầu vào và chuẩn đầu ra ───────────────────── */
  G.TV2_VIP_CHUAN = [
    {
      t: 'Đầu vào · Lộ trình 7 bước',
      n: 'B1 Giao lưu lần đầu · B2 Định hướng nhanh sau buổi để lọc động lực · B3 Hồ sơ và đăng ký nguyện vọng · B4 Phỏng vấn Vòng 1 giá trị và thái độ · B5 Phỏng vấn Vòng 2 năng lực và tiềm năng · B6 Phỏng vấn Vòng 3 cam kết trước Hội đồng · B7 Giai đoạn thử thách rồi Lễ kết nạp.',
      vi: 'Mỗi bước có Ban phụ trách, thông điệp và kết quả riêng. Nguyên tắc xuyên suốt: được trở thành thành viên chính thức là một danh dự, không phải thủ tục hành chính.'
    },
    {
      t: 'Đầu vào · Hồ sơ ba câu',
      n: 'Vì sao em muốn trở thành thành viên Gen Việt? Em tự đánh giá 3 điểm mạnh và 3 điểm cần rèn? Em muốn thử sức ở Ban nào và vì sao?',
      vi: 'Bản thân việc chịu ngồi viết đã là bộ lọc: tài liệu ghi thẳng "ai không chịu viết nổi vài câu là không đủ chuẩn".'
    },
    {
      t: 'Đầu vào · Vòng 1 — giá trị và thái độ',
      n: 'Phỏng vấn 1–1 hoặc nhóm nhỏ, 10–15 phút. Bốn câu lõi: em hiểu gì về Gen Việt, điều gì quan trọng nhất khi tham gia một tổ chức, kể một lần em giữ lời hứa hoặc nhận trách nhiệm khi làm sai, em phản ứng ra sao khi bị nhắc nhở về kỷ luật.',
      vi: 'Ba tiêu chí qua vòng: lễ phép và giao tiếp rõ, không đổ thừa, sẵn sàng chấp nhận kỷ luật. Không đạt thì giữ ở vai trò Bạn đồng hành hoặc Khách giao lưu, không loại hẳn.'
    },
    {
      t: 'Đầu vào · Vòng 2 — năng lực và tiềm năng',
      n: 'Ban Tài Năng Việt khai thác sở trường theo bảy nhóm: Tổ chức, Giao tiếp, Học thuật, Nghệ thuật, Công nghệ, Đối ngoại, Truyền thông. Hỏi thẳng: em có sẵn sàng nhận một nhiệm vụ thật trong 7–14 ngày không?',
      vi: 'Đầu ra của vòng là ba quyết định: phân vào Ban nào, mức tiềm năng Member – Core – Future Leader, và gợi ý lộ trình 3–6 tháng cho từng người.'
    },
    {
      t: 'Đầu vào · Vòng 3 — cam kết trước Hội đồng',
      n: 'Chủ nhiệm CLB, đại diện Ban Tài Năng Việt và một cố vấn hoặc thầy cô hỏi ba câu trực diện: cam kết tham gia tối thiểu bao nhiêu tháng, có chấp nhận nội quy và chuẩn hình ảnh Gen Việt không, có sẵn sàng nhận nhiệm vụ thực tế và báo cáo kết quả không.',
      vi: 'Đạt thì vào danh sách Ứng viên chính thức – Giai đoạn Thử thách. Không rõ cam kết thì tạm giữ ở mức thành viên mở rộng và tiếp tục quan sát.'
    },
    {
      t: 'Đầu vào · Giai đoạn thử thách 30–45 ngày',
      n: 'Ứng viên phải tham gia tối thiểu tỉ lệ buổi sinh hoạt do đơn vị quy định và thực hiện ít nhất một nhiệm vụ cụ thể trong Ban của mình: dẫn một phần chương trình, hỗ trợ một sự kiện, làm một bài truyền thông, hoặc phụ trách một nhóm.',
      vi: 'Ban Tài Năng Việt, Ban Cánh Sát Việt và Chủ nhiệm chấm theo checklist. Đạt thì được mời vào Nghi thức kết nạp ở bước 7 của buổi sinh hoạt chính.'
    },
    {
      t: 'Đầu vào · Phiếu chân dung 15 tiêu chí',
      n: 'Mười lăm tiêu chí quan sát chia bảy nhóm: động lực tham gia, thái độ, kỷ luật cơ bản, nội quy, nhân cách, giao tiếp và tự tin, làm việc nhóm, quản lý bản thân, nhận thức bản thân, gia đình và môi trường. Mỗi tiêu chí thang 1–5, tổng tối đa 75 điểm.',
      vi: 'Ngưỡng đề xuất trong tài liệu: từ 55 điểm trở lên là phù hợp tham gia chính thức; 40–54 điểm là phù hợp nhưng cần mentor theo sát.'
    },
    {
      t: 'Đầu ra · Sáu nhóm năng lực A–F',
      n: 'A Tự chủ và Bản lĩnh · B Tổ chức và Thực thi · C Giao tiếp và Ảnh hưởng tích cực · D Học tập và Tư duy phát triển · E Giá trị sống và Cống hiến · F Năng lực Lãnh đạo, tách thành F1 độ tin cậy, F2 tổ chức và dẫn dắt, F3 ảnh hưởng tích cực, F4 tư duy phục vụ.',
      vi: 'Điểm Tổng Gen Việt tính theo công thức TGV = 0,4 × NCB + 0,4 × LD + 0,2 × CH, trong đó NCB là trung bình nhóm A–E, LD là trung bình F1–F4, CH là điểm cống hiến quy đổi về thang 1–5.'
    },
    {
      t: 'Đầu ra · Chuẩn đo được của phiếu tốt nghiệp',
      n: 'A1 nói hoặc viết được 3–5 điểm mạnh và 2–3 điểm cần cải thiện · A2 có mục tiêu 6–12 tháng bằng văn bản · B2 đã thuyết trình tối thiểu 1–2 lần trước nhóm với cấu trúc rõ · C2 hoàn thành trên 80% nhiệm vụ trong dự án · D2 duy trì lịch tuần tối thiểu 8 tuần · E1 đạt 10–20 giờ hoạt động cộng đồng mỗi năm · F1 có portfolio gồm hình hoạt động, dự án và nhận xét mentor.',
      vi: 'Đây là các chuẩn có thể kiểm chứng bằng hiện vật, không phải bằng cảm nhận. Phiếu dùng khi kết thúc một chu kỳ 6, 12 hoặc 24 tháng.'
    },
    {
      t: 'Đầu ra · Xếp loại tốt nghiệp',
      n: 'Xuất sắc Gen Việt từ 85% tổng điểm trở lên, thể hiện rõ vai trò dẫn dắt · Đạt chuẩn Gen Việt 70–84% · Hoàn thành chương trình 50–69%, đề xuất hỗ trợ thêm một chu kỳ · dưới 50% là không đủ chuẩn tốt nghiệp, cần lộ trình cá nhân hoá.',
      vi: 'Ba quyết định kèm theo: cấp Chứng nhận Tốt nghiệp, đề xuất vào Core Team hoặc Leader, hoặc tiếp tục bồi dưỡng.'
    },
    {
      t: 'Đầu ra · Thang Pin sáu bậc',
      n: 'Pin Trắng level 0 Thành viên Khởi động, chưa đủ dữ liệu · Xanh lá level 1 Thành viên Tích cực, TGV từ 2,5 · Xanh dương level 2 Thành viên Nòng cốt, từ 3,2 · Bạc level 3 Leader Tương Lai, từ 3,8 · Vàng level 4 Leader Xuất Sắc cấp CLB hoặc trường, từ 4,3 · Đỏ hoặc Kim cương level 5 Đại sứ hoặc Thủ lĩnh Quốc gia, từ 4,7.',
      vi: 'Tài liệu ghi rõ các ngưỡng này là "gợi ý", tức mỗi đơn vị được phép chuẩn hoá lại trước khi áp dụng.'
    }
  ];

  /* ── B3 · Quyền và nghĩa vụ thành viên ─────────────────────── */
  /* Cột quyền lấy từ Điều 5, cột nghĩa vụ lấy từ Điều 6 của quy
     chế. Việc ghép từng cặp quyền với nghĩa vụ tương ứng là sắp xếp
     của bản dựng; quy chế gốc liệt kê hai danh sách rời nhau.      */
  G.TV2_VIP_QUYEN_LOI = [
    ['Trục', 'Quyền của thành viên', 'Nghĩa vụ đi kèm', 'Điều khoản gốc'],
    ['Sinh hoạt', 'Được tham gia sinh hoạt, chương trình và dự án của CLB.', 'Tham gia đều đặn các hoạt động đã cam kết, không tham dự tuỳ hứng.', 'Điều 5 · Điều 6'],
    ['Phát triển', 'Được hướng dẫn và hỗ trợ phát triển kỹ năng, phẩm chất.', 'Tuân thủ Quy chế, Nội quy CLB và quy định của nhà trường hoặc đơn vị.', 'Điều 5 · Điều 6'],
    ['Ghi nhận', 'Được đánh giá, xếp hạng Pin và có cơ hội thăng tiến vai trò nếu đủ tiêu chuẩn.', 'Sẵn sàng nhận nhiệm vụ thực tế và báo cáo kết quả khi được giao.', 'Điều 5 · Bước 6 quy trình định hướng'],
    ['Tiếng nói', 'Được phát biểu ý kiến và đề xuất hoạt động trong khuôn khổ tôn trọng và xây dựng.', 'Không bạo lực, không bắt nạt, không kỳ thị, không phá hoại, không nói xấu nội bộ.', 'Điều 5 · Điều 6'],
    ['Hình ảnh', 'Được ghi nhận vào portfolio Gen Việt và nhận chứng nhận nội bộ theo cấp độ đạt được.', 'Giữ hình ảnh Gen Việt cả trong lẫn ngoài CLB, bao gồm môi trường online.', 'Điều 6 · Phiếu tốt nghiệp nhóm F'],
    ['Thuộc về một Ban', 'Được chọn Ban phù hợp với sở trường sau khi qua Vòng 2 phỏng vấn.', 'Mỗi thành viên chính thức phải chọn ít nhất 01 Ban để đồng hành.', 'Chốt của Chủ nhiệm trong kịch bản điều hành'],
    ['Kết nạp', 'Được dự Nghi thức kết nạp trong buổi sinh hoạt chính, ở khối phút 60–68.', 'Đi trọn ba vòng phỏng vấn và hoàn thành giai đoạn thử thách 30–45 ngày.', 'Bước 7 quy trình định hướng · bước 7 kịch bản điều hành'],
    ['Đối tượng', 'Không giới hạn ở học sinh giỏi: điều kiện là có nhu cầu phát triển bản thân và tinh thần hợp tác.', 'Không bạo lực, không cực đoan; đồng ý tham gia tối thiểu theo quy định từng đơn vị.', 'Điều 4']
  ];

  /* ══════════════════════════════════════════════════════════════
     C · MÔ HÌNH BUKATSU — THAM CHIẾU NHẬT BẢN
     Nguồn: "Mô hình Bukatsu.docx". Xem lưu ý số 4 ở đầu tệp: chữ
     "Bukatsu" và "senpai–kōhai" đã bị tìm-thay-thế khỏi thân tài
     liệu, phần dưới đây khôi phục theo tên tệp và văn cảnh.
     ══════════════════════════════════════════════════════════════ */

  /* ── C1 · Bài học rút ra: lấy gì, không lấy gì ─────────────────
     Khối cd4 này cần đặt lại bốn nhãn khi dựng màn, qua o.nhan:
     ['Bukatsu dạy gì', 'Vì sao Gen Việt cần', 'Gen Việt làm gì',
     'Bẫy phải tránh'] — nhãn mặc định của khối không hợp ở đây.  */
  G.TV2_BUKATSU = [
    {
      t: 'Tự nguyện – Tự quản – Tự trưởng thành',
      mau: '#185AB4',
      dh: 'Điều tài liệu lấy từ mô hình tham chiếu: học sinh tự chọn tham gia và tự điều hành, không ai bị ghi danh hộ.',
      can: 'Mục tiêu là xây nội lực tự chủ, chứ không tạo thêm một chỗ để học sinh lệ thuộc người lớn.',
      lam: 'CLB Gen Việt trao quyền cho Ban Điều Hành Học Sinh: Chủ nhiệm, hai Phó Chủ nhiệm, và các Trưởng ban Dự án, Truyền thông, Tài chính, Văn hoá. Cố vấn chỉ phê duyệt kế hoạch và giám sát kỷ luật chung, không điều hành chi tiết.',
      bay: 'Người lớn trượt vào vai "ông chủ" thay vì cố vấn. Tài liệu chốt: quyền vận hành nằm ở Ban Điều Hành Học Sinh.'
    },
    {
      t: 'Nhịp sinh hoạt đều đặn, không phong trào',
      mau: '#0B7350',
      dh: 'Tinh thần "gần như mỗi ngày" của mô hình tham chiếu — sinh hoạt thường xuyên, có nhịp điệu rõ.',
      can: 'Kỹ năng chỉ bền khi được luyện theo chu kỳ ngắn, lặp lại và có phản hồi nhanh.',
      lam: 'Khung tuần chuẩn ba buổi: Huấn luyện Cốt lõi 60–90 phút, Dự án và Thực chiến 60–120 phút, Phản biện và sinh hoạt Gen A – Gen V 45–60 phút. Trường ít thời gian được rút xuống tối thiểu 2 buổi mỗi tháng nhưng vẫn giữ cơ chế Gen A – Gen V.',
      bay: 'Chép nguyên tần suất Nhật Bản sang Việt Nam. Tài liệu cắt xuống còn ba buổi mỗi tuần, cấm trùng giờ chính khoá và cấm chiếm trọn thời gian nghỉ của học sinh.'
    },
    {
      t: 'Hệ thứ bậc dìu dắt lớp trước – lớp sau',
      mau: '#5140B4',
      dh: 'Tài liệu gọi đây là "lõi của mô hình": một hệ thứ bậc học hỏi, lớp trước kèm lớp sau.',
      can: 'Không có nó thì mỗi khoá phải làm lại từ đầu, CLB không tích được kinh nghiệm vận hành.',
      lam: 'Gen A từ cấp 5–10 dẫn nhóm 3–7 Gen V, kèm kỹ năng, nhắc kỷ luật, hỗ trợ bài tập và dự án. Gen A phải được đào tạo trước về kỹ năng dẫn dắt, và bị đánh giá bằng thái độ, hiệu quả dẫn dắt, mức độ gương mẫu — không phải bằng quyền lực.',
      bay: 'Đây là chỗ mặt tối dễ tái diễn nhất. Cấm tuyệt đối: hạ nhục, mạt sát, phạt thể xác, bắt Gen V làm việc riêng hoặc nộp tiền riêng, dùng danh nghĩa "kỷ luật CLB" để che hành vi cá nhân. Gen V có quyền từ chối yêu cầu sai trái và phản ánh ẩn danh.'
    },
    {
      t: 'Người lớn làm cố vấn, không làm chủ',
      mau: '#A8801F',
      dh: 'Mô hình tham chiếu đặt giáo viên ở vai cố vấn định hướng, không phải người đứng lớp.',
      can: 'Có người lớn thì hoạt động mới hợp pháp và an toàn; nhưng người lớn làm thay thì học sinh mất chỗ để trưởng thành.',
      lam: 'Hai tầng cố vấn tách bạch: Cố vấn học đường là giáo viên của trường, lo tuân thủ quy định và an toàn học sinh; Cố vấn doanh nhân từ hệ sinh thái Gen Việt, mỗi tháng 1–2 buổi chuyên đề, đóng vai khách hàng hoặc nhà đầu tư trong các buổi pitch.',
      bay: 'Người lớn chỉ nên đặt "làn can" an toàn và chuẩn đạo đức. Vượt quá làn can đó là làm hộ.'
    },
    {
      t: 'Học qua thực chiến',
      mau: '#9E470D',
      dh: 'Nguyên tắc lấy từ mô hình tham chiếu: không chỉ nghe, phải làm.',
      can: 'Sai lầm chỉ trở thành bài học khi học sinh được phép sai trong một môi trường có người phân tích cùng.',
      lam: 'Mỗi CLB trong trường phải có ít nhất một dự án tạo tác động thật mỗi năm học — doanh thu, thiện nguyện, truyền thông hoặc nghiên cứu. Học sinh tổ chức sự kiện, làm mini business, pitch ý tưởng và tự quản lý ngân sách.',
      bay: 'Biến dự án thành cuộc thi thành tích. Tài liệu nhấn: mỗi khoản thu chi phải là một bài học về minh bạch và trách nhiệm, không phải một con số để khoe.'
    },
    {
      t: 'Kế thừa và di sản',
      mau: '#185AB4',
      dh: 'Mỗi khoá không chỉ "tốt nghiệp và rời đi" — đây là điều tài liệu giữ lại nguyên vẹn từ mô hình tham chiếu.',
      can: 'CLB chỉ sống qua nhiều năm nếu mỗi khoá để lại thứ khoá sau dùng được.',
      lam: 'Mỗi khoá để lại quy trình, tài liệu, dự án, quỹ và văn hoá cho thế hệ sau. Hồ sơ năng lực Gen Việt ghi cấp độ đạt được, dự án tham gia, vai trò lãnh đạo và feedback mentor, dùng được khi xin học bổng hoặc thực tập.',
      bay: 'Phụ thuộc vài thầy cô năng nổ. Cách chặn là chuẩn hoá tài liệu, cố định lịch và có dashboard theo dõi.'
    },
    {
      t: 'Kỷ luật cao nhưng không bạo lực',
      mau: '#BE0E16',
      dh: 'Lấy tinh thần kỷ luật và cam kết cao của mô hình tham chiếu: đi học đều, đúng giờ, làm đến nơi đến chốn.',
      can: 'Bỏ kỷ luật thì CLB thành sinh hoạt cho vui; giữ nguyên chế tài kiểu cũ thì tái diễn đúng mặt tối bị phê phán.',
      lam: 'Kỷ luật xây dựng thay cho chế tài: phản hồi 1-1, nhiệm vụ cộng đồng, sửa sai có hướng dẫn. Đến muộn thì ghi nhận và trao đổi riêng, lặp lại nhiều lần mới giao nhiệm vụ cộng đồng — không phạt nhục. Vắng phải báo trước; ba lần không lý do thì xem xét tư cách.',
      bay: 'Đánh, tát, chống đẩy phạt mang tính sỉ nhục, bắt nạt, cô lập, "truyền thống" làm nhục thành viên mới — tất cả đều nằm trong danh mục cấm tuyệt đối. Kèm theo phải có kênh phản ánh ẩn danh và Hội đồng kỷ luật có cố vấn và đại diện nhà trường.'
    },
    {
      t: 'Chặn quá tải trước khi nó xảy ra',
      mau: '#0B7350',
      dh: 'Rủi ro quá tải là mặt tối được tài liệu nêu ngay cạnh bạo lực, không phải một lo lắng phụ.',
      can: 'CLB là môi trường nâng học sinh lên, không phải chỗ vắt kiệt học sinh.',
      lam: 'Không tổ chức với tần suất gây mất ngủ, bỏ bê học chính khoá hoặc stress kéo dài. Trước và trong mùa thi thì giảm hoạt động nặng, chuyển sang mentoring học tập. Ban Điều Hành và Gen A được hướng dẫn nhận diện dấu hiệu kiệt sức và báo cố vấn.',
      bay: 'Hoạt động khuya hoặc ở địa điểm nhạy cảm khi chưa có phê duyệt rõ ràng. Sinh hoạt phải trong khuôn viên trường hoặc nơi được nhà trường và phụ huynh cho phép.'
    }
  ];

  /* ── C2 · Đối chiếu mô hình tham chiếu với CLB Gen Việt ────── */
  G.TV2_BUKATSU_DOI_CHIEU = [
    ['Trục so sánh', 'Mô hình Bukatsu (theo mô tả trong tài liệu)', 'CLB Gen Việt', 'Vì sao khác'],
    ['Tần suất sinh hoạt', 'Tinh thần "gần như mỗi ngày".', 'Tối thiểu 3 buổi mỗi tuần cho mô hình chuẩn; trường ít thời gian được rút còn 2 buổi mỗi tháng.', 'Phải ưu tiên sức khoẻ và học chính khoá; tài liệu cấm trùng giờ chính khoá và cấm chiếm trọn thời gian nghỉ.'],
    ['Người điều hành', 'Học sinh tự quản.', 'Ban Điều Hành Học Sinh 7–9 vị trí, tự vận hành toàn bộ; quy mô gợi ý 40–60 thành viên mỗi CLB.', 'Giữ nguyên nguyên tắc tự quản, chỉ thêm cơ cấu chức danh rõ để có người chịu trách nhiệm cho từng mảng.'],
    ['Vai trò người lớn', 'Cố vấn định hướng, không đứng lớp.', 'Hai tầng: Cố vấn học đường lo pháp lý và an toàn, Cố vấn doanh nhân dạy chuyên đề 1–2 buổi mỗi tháng.', 'Bối cảnh Việt Nam đòi hỏi một người của nhà trường chịu trách nhiệm phê duyệt, đồng thời CLB nhắm tới năng lực doanh nhân nên cần nguồn cố vấn thứ hai.'],
    ['Hệ thứ bậc', 'Lớp trước dìu dắt lớp sau, được tài liệu gọi là "lõi của mô hình".', 'Gen A cấp 5–10 dẫn nhóm 3–7 Gen V cấp 1–4, có Bộ Quy tắc riêng và cơ chế phản ánh hai chiều.', 'Giữ cấu trúc dìu dắt nhưng gắn phanh: Gen A phải được đào tạo trước, bị chấm bằng hiệu quả dẫn dắt, và Gen V có quyền từ chối yêu cầu sai trái.'],
    ['Kỷ luật và chế tài', 'Kỷ luật và cam kết cao; mặt tối là phạt thể xác và "truyền thống" làm nhục.', 'Kỷ luật xây dựng: phản hồi 1-1, nhiệm vụ cộng đồng, sửa sai có hướng dẫn. Cấm tuyệt đối mọi hình phạt thể xác và sỉ nhục.', 'Đây là điểm cắt dứt khoát nhất giữa hai mô hình — tài liệu dành hẳn một chương để loại bỏ phần này.'],
    ['Nội dung rèn luyện', 'Rèn kỷ luật, trách nhiệm, làm việc nhóm, học qua thực hành.', 'Bốn trụ cột: Nhân cách và Phụng sự, Kỷ luật và Tự quản, Năng lực Doanh nhân – Lãnh đạo, Cộng đồng và Di sản.', 'Gen Việt thêm trục doanh nhân và trục phụng sự vì mục tiêu là ươm thế hệ doanh nhân – lãnh đạo, không phải một CLB chuyên môn đơn thuần.'],
    ['Đo lường tiến bộ', 'Tài liệu mô tả mô hình tham chiếu qua tinh thần và nếp sinh hoạt, không qua chỉ số.', 'Hệ 10 cấp độ, mỗi cấp có KPI hành vi, minh chứng sản phẩm, feedback 360° và lễ trao cấp.', 'Không đo được thì không trình được với nhà trường, phụ huynh và đối tác — đây là yêu cầu của bối cảnh triển khai, không phải của mô hình gốc.'],
    ['Cơ chế bảo vệ học sinh', 'Mặt tối được nêu gồm quá tải, bạo lực và bắt nạt.', 'Kênh phản ánh ẩn danh, Hội đồng kỷ luật có cố vấn và đại diện nhà trường, giới hạn thời lượng mỗi tuần, đào tạo Gen A về tâm lý và hướng dẫn tích cực.', 'Tài liệu coi đây là "lá chắn an toàn" bắt buộc phải trình khi làm việc với nhà trường và cơ quan quản lý.'],
    ['Kế thừa', 'Mỗi khoá dìu dắt khoá sau.', 'Mỗi khoá để lại quy trình, tài liệu, dự án, quỹ và văn hoá; thành viên có Hồ sơ năng lực Gen Việt mang theo được.', 'Gen Việt biến di sản từ chuyện truyền miệng thành hồ sơ có thể dùng để xin học bổng, thực tập và kết nối doanh nghiệp.']
  ];

})(window.GV = window.GV || {});
