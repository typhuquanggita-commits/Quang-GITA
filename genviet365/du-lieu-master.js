/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT · KHO MASTER — HỆ LÝ LUẬN NỀN
   Kho này KHÔNG do bản dựng nghĩ ra. Nó rút từ tài liệu gốc
   "MASTER Gen Việt 1.docx", "Khung sách Master Gen Việt.doc" và
   "Lời mở đầu.doc" trong thư mục GEN VIỆT của Học viện GITA,
   đọc ngày 30.08.2026.
   Bản dựng hiện tại có đủ quy trình, bậc, hộ chiếu, vận hành —
   nhưng thiếu phần gốc: vì sao có Bản đồ 30 năm, Gen Việt là gì,
   và những mô thức mà tác giả đặt tên. Kho này lấp đúng khoảng đó.
   Ghi chú nguồn: hai bản "MASTER Gen Việt.docx" còn lại trùng
   gần như hoàn toàn với bản 1 (cùng đề mục 1.1 → 14.10), nên chỉ
   dùng bản đầy đủ nhất làm nguồn chính.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Khung sách Master ────────────────────────────────────
     Lấy nguyên từ "Khung sách Master Gen Việt.doc". Tài liệu gốc
     nhảy từ PHẦN I sang PHẦN III — không có dòng tiêu đề PHẦN II;
     các Chương 5–8 nằm giữa hai mốc đó, ở đây gom lại đúng vị trí
     nguồn và ghi rõ là phần khuyết tiêu đề, không tự đặt tên thay. */
  G.MS_KHUNG_SACH = [
    { m: 'ĐẦU', t: 'Phần đầu sách', v: [
      'Lời giới thiệu · Lời nói đầu của tác giả · Lời tri ân',
      'Hướng dẫn sử dụng cuốn sách',
      'Sơ đồ tổng quan “Master Gen Việt – Bản Đồ 30 Năm”'
    ] },

    { m: 'I', t: 'PHẦN I. Nền tảng tư duy và triết lý Gen Việt', v: [
      'Chương 1. Gen Việt trong bối cảnh giáo dục & xã hội 4.0 — bức tranh giáo dục và giới trẻ hiện nay · những “vết nứt” của mô hình học chỉ vì điểm số · nỗi đau thầm lặng: áp lực, cô đơn, khủng hoảng bản thân · chuyển từ “luyện thi” sang “phát triển hệ sinh thái”',
      'Chương 2. DNA Gen Việt – Tinh thần, Bản lĩnh, Trí tuệ, Ước mơ Việt — khung giá trị cốt lõi · từ “người học giỏi” đến “người có bản lĩnh và di sản” · bản đồ bên trong: Tự thân – Gia đình – Nhà trường – Xã hội · 4 trụ Gen Việt và Chương trình GDPT 2018',
      'Chương 3. Hệ sinh thái Gen Việt – Từ mô hình đến thực thi — 5 lớp hệ sinh thái: Học viện – Câu lạc bộ – Trại – Gia đình – Cộng đồng · mô thức huấn luyện GITA (Goals – Inspirits – Talent – Action/Academy) · nguyên tắc xây hệ sinh thái không phụ thuộc cá nhân',
      'Chương 4. Nguyên lý thiết kế “Bản Đồ 30 Năm” — nhìn 10–20–30 năm, hành động từng 90 ngày · 3 tầng: Sự nghiệp 10 năm – Di sản 20 năm – Hệ sinh thái 30 năm · đối chiếu OECD Learning Compass 2030, UNESCO & CASEL · ba câu hỏi: Tôi – Chúng ta – Thế hệ sau'
    ] },

    { m: 'I·b', t: 'Chương 5–8 (nguồn khuyết tiêu đề phần)', v: [
      'Chương 5. Hành trình 10 năm: từ ý tưởng đến hệ sinh thái — Khởi tạo/Thử nghiệm/Định hình (năm 1–3) · Chuẩn hóa/Nhân rộng (năm 4–7) · Tái cấu trúc/Bền vững/Chuẩn bị kế thừa (năm 8–10)',
      'Chương 6. Thiết kế sản phẩm & chương trình Gen Việt — kiến trúc Học viện – CLB – Trại – Chương trình song hành · lộ trình năng lực theo độ tuổi 10–15, 16–18, 19–25 · chu trình 90 ngày – 1 năm – 3 năm',
      'Chương 7. Hệ vận hành & quản trị chiến lược Gen Việt — RACI cho triển khai tại trường · PDCA cấp hệ thống · quản trị rủi ro: bạo lực học đường, xung đột, “chống đối thụ động”, quá tải giáo viên · kiến trúc dữ liệu & dashboard chỉ số',
      'Chương 8. Đội ngũ – Người làm Gen Việt và chuẩn năng lực nghề — chân dung “Người làm Gen Việt” · rubric năng lực M0–M3 · lộ trình 5–10 năm cho giáo viên nòng cốt · cơ chế bảo vệ sức khỏe tâm lý giáo viên'
    ] },

    { m: 'III', t: 'PHẦN III. Di sản 20 năm – Xây dựng Thư viện Trí tuệ Gen Việt', v: [
      'Chương 9. Khái niệm “Di sản Trí tuệ Gen Việt” — di sản vật chất và di sản trí tuệ – tinh thần · các lớp di sản: cá nhân – gia đình – nhà trường – hệ sinh thái – xã hội · ranh giới đạo đức khi lưu trữ câu chuyện và dữ liệu học sinh',
      'Chương 10. Thư viện Di sản Gen Việt – Thiết kế & vận hành — loại tài sản được lưu · cấu trúc cấp lớp/cấp trường/cấp hệ sinh thái · quy trình chọn lọc, biên tập, ẩn danh, chia sẻ',
      'Chương 11. Di sản trong gia đình & “Gia tộc giáo dục” — hiến chương gia đình · bộ giá trị – nghi thức – câu chuyện truyền đời · “Hồ sơ Di sản cá nhân” cho con',
      'Chương 12. Mở rộng & lan tỏa mô hình Gen Việt — từ một trường đến cụm trường, tỉnh, mạng lưới quốc gia · Việt hóa mô hình quốc tế · những nguyên tắc giữ bản sắc khi mở rộng'
    ] },

    { m: 'IV', t: 'PHẦN IV. Cẩm nang triển khai Gen Việt trong nhà trường', v: [
      'Chương 13. Cẩm nang Chủ nhiệm Gen Việt — khung SHCN Gen Việt 3T+1Q · văn hóa lớp: an toàn – kỷ luật tích cực – gắn kết · hồ sơ lớp Gen Việt',
      'Chương 14. CLB Gen Việt & hệ thống lãnh đạo học sinh — hệ thống 12 ban · nhịp tuần – tháng – học kỳ – năm · cơ chế tuyển chọn và kế thừa lãnh đạo trẻ',
      'Chương 15. 100 tình huống tâm lý học đường & kho giải pháp Gen Việt — 25 tình huống tâm lý lứa tuổi & bạn bè · 25 về áp lực học tập, thi cử, hướng nghiệp · 25 về xung đột với thầy cô, phụ huynh, bạo lực học đường · 25 về mạng xã hội, nghiện game, thế giới số',
      'Chương 16. Bộ công cụ, biểu mẫu & hệ thống đo lường — bộ câu hỏi 4Q và các biến thể · hệ chỉ báo G1–G5 · checklist tự đánh giá cấp trường, cấp lớp, cấp cá nhân'
    ] },

    { m: 'V', t: 'PHẦN V. Case study điển hình & hành trình 5–10 năm', v: [
      'Chương 17. Case study: 5 năm triển khai Gen Việt tại một trường THCS — 5 năm chuyển động, mỗi năm một trọng tâm · những điều làm lại, giữ lại, nâng cấp',
      'Chương 18. Chân dung học sinh & giáo viên Gen Việt tiêu biểu — học sinh từng thu mình trở thành leader · học sinh “nghiện game” chuyển hóa thành mentor · GVCN từ hoài nghi tới huấn luyện viên nội bộ'
    ] },

    { m: 'KẾT', t: 'Phần kết, tài liệu tham khảo và phụ lục', v: [
      'Lời kết: Giữ lửa cho Bản Đồ 30 Năm · gợi ý lộ trình 3 năm đầu cho đơn vị mới bắt đầu',
      'Phụ lục 1–2: mẫu kế hoạch năm học Gen Việt · bộ biểu mẫu vận hành (hồ sơ lớp, hồ sơ hoạt động, hồ sơ di sản, RACI, PDCA)',
      'Phụ lục 3–5: bộ câu hỏi 4Q mở rộng theo chủ đề & độ tuổi · rubric “Người làm Gen Việt” · mẫu Nhật ký Gen Việt 90 ngày',
      'Phụ lục 6–8: mẫu Hiến chương lớp/CLB và “Thỏa ước dùng thiết bị Gen Việt” · bộ 100 tình huống tâm lý học đường · khung Hồ sơ Di sản Gen Việt'
    ] }
  ];

  /* ── 2 · Lời mở — những luận điểm dựng nên cuốn sách ───────────
     Rút từ LỜI DẪN “Khi một thế hệ cần một bản đồ” và ba mục
     tiếp theo trong bản MASTER. */
  G.MS_LOI_MO = [
    { t: 'Đường thì nhiều, bản đồ thì không rõ',
      n: 'Nhiều bạn trẻ bước vào đời như bước vào một mê cung. Khi không có bản đồ, hai khả năng rất dễ xảy ra: đi vòng mãi mà không ra được đường lớn, hoặc chạy rất nhanh nhưng đi nhầm hướng.',
      vi: 'Bốn câu hỏi căn bản mà học sinh sáng dạ vẫn loay hoay: Con là ai? Con mạnh ở điều gì? Con nên đi con đường nào trong 10–20 năm tới? Làm sao vừa là một người con tốt, một công dân có trách nhiệm, vừa là một người thành công trong thời đại mới?' },

    { t: 'Vì sao lại là 30 năm',
      n: 'Ba mươi năm gần như tương ứng với một vòng đời trưởng thành của một con người. Nếu chỉ nói với con trẻ về điểm số, kỳ thi, giải thưởng, danh hiệu, các em rất dễ bị cuốn vào một cuộc đua ngắn và đánh mất những thứ cốt lõi nhất của mình.',
      vi: '0–10 năm đầu đời gieo nền tính cách, phẩm chất, thói quen · 10–20 năm định hình bản ngã, bản lĩnh, hệ giá trị, cách lựa chọn · 20–30 năm bước vào lao động, lập nghiệp, khởi sự lãnh đạo, tạo dấu ấn đầu tiên.' },

    { t: 'Đây không phải một lời tiên tri',
      n: 'Bản đồ 30 năm giống một tấm bản đồ địa hình chi tiết: không nói bạn buộc phải đi đường nào, nhưng cho thấy vùng đất tiềm năng, vực sâu nguy hiểm, trục đường chính và những điểm mốc mà nếu bỏ qua thì hành trình trưởng thành sẽ rất chông chênh.',
      vi: 'Sách không đứng từ trên cao để “chỉ tay năm ngón”; nó sinh ra từ hơn một thập kỷ làm việc trực tiếp với học sinh, phụ huynh, giáo viên, hàng trăm giờ huấn luyện, tham vấn, xây CLB, tổ chức trại.' },

    { t: 'Gen Việt không phải khái niệm sinh học',
      n: 'Trong phạm vi cuốn sách, Gen Việt là cách gọi một tổ hợp bản chất – phẩm chất – năng lực – ký ức văn hoá – cách tư duy của con người Việt Nam, khi được đánh thức và rèn luyện một cách có ý thức.',
      vi: 'Có thể hình dung như một “bản mã bên trong” gồm ít nhất 5 lớp: Cội nguồn – Lịch sử – Văn hoá · Phẩm chất – Việt tính · Tư duy – Năng lực học hỏi · Kết nối – Gia đình – Cộng đồng · Khát vọng – Thời đại số.' },

    { t: 'Vì sao cần một bản đồ đặc thù cho người Việt',
      n: 'Thế giới đã có nhiều mô hình phát triển con người, nhưng copy nguyên bản gặp ba vấn đề: bối cảnh khác nhau, trọng tâm giá trị khác nhau, hệ sinh thái triển khai khác nhau.',
      vi: 'Nhiều mô hình quốc tế đặt nặng tính cá nhân và “self-made”; người Việt mang sẵn yếu tố cộng đồng, gia đình, nghĩa tình — bỏ qua là đánh mất một nguồn lực rất lớn cho sự bền vững.' },

    { t: 'Hai chiều của tấm bản đồ',
      n: 'Chiều Việt tôn trọng cội nguồn, văn hoá, bối cảnh, hệ giá trị của người Việt. Chiều Thế giới cập nhật xu thế, chuẩn năng lực, phương pháp phát triển con người của thời đại mới.',
      vi: 'Một đứa trẻ Việt không nhất thiết phải trở thành bản sao của bất kỳ ai. Em có quyền trở thành phiên bản tốt nhất của một người Việt Nam sống trong thế kỷ 21.' },

    { t: 'Bốn nhóm người đọc',
      n: 'Sách được thiết kế cho học sinh – thanh thiếu niên, phụ huynh, giáo viên – người làm giáo dục – huấn luyện viên, và nhà lãnh đạo – doanh nhân – người làm tổ chức.',
      vi: 'Với giáo viên: để mỗi tiết dạy, mỗi chương trình, mỗi CLB không còn rời rạc, mà được nhìn như một mảnh ghép trong bức tranh 30 năm của học sinh.' },

    { t: 'Cấu trúc ba phần lớn',
      n: 'Phần I dựng bức tranh 30 năm và ngôn ngữ chung. Phần II là bản đồ chi tiết cộng hộp công cụ. Phần III bàn việc vận hành hệ sinh thái và di sản.',
      vi: 'Câu kết của lời dẫn: nếu chúng ta cùng nhau, rất có thể 30 năm tới sẽ là 30 năm Gen Việt trưởng thành, chứ không chỉ là 30 năm trôi qua.' }
  ];

  /* ── 3 · Luận điểm nền của hệ tư tưởng ────────────────────────
     Số hiệu do kho này đánh để tra cứu; tên và nội dung giữ đúng
     chữ của tác giả. */
  G.MS_LUAN_DIEM = [
    { so: 1, t: 'Trở thành NGƯỜI NHƯ THẾ NÀO, chứ không chỉ LÀM NGHỀ GÌ',
      n: 'Câu hỏi sống còn thứ nhất. Nghề có thể thay đổi, xu hướng có thể đổi, nhưng bản tính, phẩm chất, hệ giá trị sẽ đi theo con xuyên suốt.',
      v: 'Đặt lại trọng tâm từ “Chọn nghề gì cho dễ sống?” sang “Con sẽ trở thành kiểu người nào, để dù làm nghề gì, con vẫn có thể sống bền – sống tử tế – sống có giá trị?”' },

    { so: 2, t: 'Không có đứa trẻ nào vô dụng — chỉ có hạt giống chưa được đánh thức',
      n: 'Câu hỏi sống còn thứ hai. Mỗi đứa trẻ mang một tập hợp hạt giống: có hạt là năng khiếu, có hạt là phẩm chất, có hạt là góc nhìn, có hạt là nỗi đau – tổn thương – trải nghiệm.',
      v: 'Nếu được hiểu đúng và rèn đúng, kể cả nỗi đau cũng trở thành sức mạnh. Hệ quả thiết kế: có công cụ nhận diện trước, rồi mới thiết kế lộ trình, thay vì ép con chạy theo khuôn mẫu chung.' },

    { so: 3, t: 'Không bản đồ nào có ý nghĩa nếu người mang nó phải đi một mình trong rừng',
      n: 'Câu hỏi sống còn thứ ba, về đồng hành. Đồng hành không phải là trả tiền học, nhắc bài, thúc ép con đi học thêm.',
      v: 'Đồng hành là hiểu con đang ở chặng nào, biết mục tiêu dài hơn một kỳ thi, và đứng đúng vị trí: lúc là người dẫn đường, lúc là người chạy cạnh, lúc là người đứng phía sau quan sát, lúc là người để con tự đi và chấp nhận con vấp.' },

    { so: 4, t: 'Không tô hồng, cũng không hù doạ',
      n: 'Câu hỏi sống còn thứ tư, về khó khăn và thất bại. Rất nguy hiểm nếu gieo cho con ảo tưởng “chỉ cần cố gắng là thành công”.',
      v: 'Thay vào đó: nhìn trước một số vùng khó trên đường đi — áp lực tuổi thiếu niên, cú sốc thi cử, thất bại đầu đời, những lần lựa chọn sai — và trang bị bản lĩnh cùng công cụ để đi qua.' },

    { so: 5, t: 'DI SẢN gì, chứ không chỉ TÀI SẢN gì',
      n: 'Câu hỏi sống còn thứ năm. Sách không phủ nhận vai trò của tài chính và sự ổn định kinh tế, nhưng đặt một câu hỏi lớn hơn.',
      v: '“Nếu 30–35 năm nữa, con nhìn lại: Điều gì khiến con thấy tự hào nhất? Những con người nào đã tốt hơn vì con đã sống và làm việc cùng họ?”' },

    { so: 6, t: 'Bản lĩnh và giá trị không được “download” qua bài giảng',
      n: 'Có một hiểu lầm nguy hiểm trong giáo dục giá trị: rằng có thể dạy bản lĩnh và đạo đức bằng cách nói thật hay, soạn bài thật cảm động, ra nhiều khẩu hiệu ấn tượng.',
      v: 'Bản lĩnh và giá trị được rèn qua quyết định, nén qua trải nghiệm, củng cố qua việc được phản hồi và ghi nhận đúng lúc. Muốn rèn thì phải chủ động tạo ra tình huống thật, không gian an toàn, hệ tiêu chuẩn rõ ràng, nghi thức ghi nhận.' },

    { so: 7, t: 'Hệ giá trị là những luật bất thành văn dùng lúc không ai nhìn',
      n: 'Hệ giá trị không phải danh sách những từ đẹp treo trên tường, càng không phải vài câu khẩu hiệu đọc trong buổi lễ.',
      v: 'Đó là tập hợp những “luật bất thành văn” mà một người thực sự dùng để ra quyết định, thường là trong những lúc khó, lúc không ai nhìn, lúc không có phần thưởng hay hình phạt tức thời.' },

    { so: 8, t: 'Nếu ta không chủ động rèn lõi cứng, thị trường sẽ làm thay ta',
      n: 'Ở tuổi 10–20, giá trị bị thử lửa, bị so sánh, bị thách thức. Nếu không có cách tiếp cận có hệ thống, việc rèn lõi trông chờ vào may mắn gặp được thầy tốt, nhóm tốt.',
      v: 'Nếu chúng ta không chủ động rèn lõi cứng thì thị trường, mạng xã hội, đám đông, các luồng giá trị ngắn hạn sẽ làm điều đó thay chúng ta.' },

    { so: 9, t: 'Phản biện không phải là cãi',
      n: 'Nhiều em hiểu “phản biện” là bắt bẻ, chứng minh người khác sai; một số người lớn lại sợ phản biện vì nghĩ “trẻ con mà phản biện là hỗn”. Cả hai đều không chính xác.',
      v: 'Phản biện là dám nhìn sâu hơn, hỏi kỹ hơn, kiểm chứng kỹ hơn để tìm điều đúng – điều có ích – điều phù hợp hơn, chứ không phải để “thắng cho sướng”.' },

    { so: 10, t: 'Người học hôm nay chính là người dẫn dắt ngày mai',
      n: 'Điểm khác biệt quan trọng của hệ sinh thái Gen Việt: dòng chảy nhân lực đi lên trong chính hệ, không tuyển từ ngoài vào mỗi khi thiếu người.',
      v: 'Học sinh CLB hôm nay → cộng tác viên trại → huấn luyện viên trẻ → mentor 20–30 → trụ cột 30–50. Tương tự với phụ huynh đồng hành và giáo viên chủ nhiệm ứng dụng mô hình.' },

    { so: 11, t: 'Di sản luôn gắn với ba chữ: Người – Mô thức – Hệ sinh thái',
      n: 'Ba lớp chuyển dịch của tuổi 30–50: từ “Tôi giỏi” sang “Đội ngũ giỏi”; từ “Tôi có kết quả” sang “Hệ thống có kết quả”; từ “Tôi để lại sản phẩm” sang “Tôi để lại Người và Mô thức”.',
      v: 'Sản phẩm có thể lỗi thời, nhưng một thế hệ người Gen Việt được rèn và một mô thức vận hành bền vững sẽ tiếp tục đi xa hơn tuổi thọ của người sáng lập.' },

    { so: 12, t: 'Mọi mô hình đổi mới đều phải sống trong lòng hệ thống',
      n: 'Gen Việt càng lớn càng cần “kỹ năng sống chung” với khung pháp lý và khung đánh giá hiện hành.',
      v: 'Khi làm được điều đó, rủi ro giảm đi, còn không gian để phát triển sáng tạo lại tăng lên. Ngược lại, nếu giáo viên hay ban giám hiệu có cảm giác phải “lách” quy định để làm Gen Việt, đó là một cảnh báo đỏ.' },

    { so: 13, t: 'Đo lường là con dao hai lưỡi',
      n: 'Nếu không đo, mô hình dễ trôi vào cảm tính và phong trào. Nếu đo sai thứ hoặc đo quá mức, mô hình bị kéo lệch thành cuộc đua theo con số và đánh mất chiều sâu nhân văn ban đầu.',
      v: 'Hệ chỉ báo lý tưởng: đơn giản nhưng có ý nghĩa, kết hợp định lượng và định tính, theo dõi quá trình chứ không chỉ kết quả cuối, giúp đội ngũ suy ngẫm tốt hơn chứ không chỉ để nộp báo cáo.' },

    { so: 14, t: 'Giá trị phải sống được, chứ không chỉ thuộc lòng',
      n: 'Năm trụ giá trị lõi chỉ có ý nghĩa khi trở thành tiêu chí thiết kế hoạt động, thành ngôn ngữ chung giữa gia đình – nhà trường – CLB – trại, thành tiêu chuẩn để ghi nhận và phản hồi.',
      v: 'Mỗi giá trị chỉ được giữ lại khi trả lời được ba câu hỏi: có thật sự cần cho một người trẻ Việt trong 30 năm tới không? có thể chuyển hoá thành hành vi cụ thể ở tuổi 10–20 không? hệ sinh thái có công cụ và môi trường để rèn giá trị đó không?' }
  ];

  /* ── 4 · Ba chặng, chín nút gia tốc ───────────────────────────
     Xương sống của toàn bộ cuốn sách (mục 1.4 bản MASTER). */
  G.MS_CHANG = [
    { ma: 'C1', t: 'GIEO HẠT', nam: '0–10 tuổi', mau: '#0B7350',
      hoi: 'Khi mọi thứ “ngấm” vào con trước khi con kịp gọi tên.',
      lam: ['Nút 1 – Gieo NỀN NẾP SỐNG: thói quen sinh hoạt, giờ giấc, ăn – ngủ – nghỉ – học – chơi; cách ứng xử cơ bản chào hỏi, xin lỗi, cảm ơn, tôn trọng',
            'Nút 2 – Gieo TÌNH YÊU HỌC TẬP & KHÁM PHÁ: không gắn việc học với sợ hãi, xấu hổ, trừng phạt',
            'Nút 3 – Gieo VIỆT TÍNH & TÌNH YÊU CỘI NGUỒN: những câu chuyện đầu tiên về ông bà, quê hương, lịch sử; những nghi lễ nhỏ chào cờ, Tết, giỗ tổ, thăm họ hàng'],
      dich: ['Một nền nếp sống lành mạnh',
             'Một tình yêu học tập không bị bóp méo',
             'Một mối dây tình cảm với gia đình và cội nguồn'],
      cong: 'Đứa trẻ chưa tự quyết được nhiều, phụ thuộc rất nhiều vào gia đình và môi trường sống, nhưng hấp thụ mạnh mẽ mọi thứ — tốt lẫn chưa tốt.',
      rui: 'Cảm giác “con là người Việt Nam” nếu chỉ đến qua khẩu hiệu chứ không qua trải nghiệm sống hằng ngày thì không bám rễ.' },

    { ma: 'C2', t: 'RÈN LỬA', nam: '10–20 tuổi', mau: '#BE0E16',
      hoi: 'Khi mọi thứ “sóng” lên trong con.',
      lam: ['Nút 4 – Rèn BẢN LĨNH & HỆ GIÁ TRỊ CÁ NHÂN: học cách nói “không”, chịu trách nhiệm, đứng lên sau sai lầm',
            'Nút 5 – Rèn NĂNG LỰC CỐT LÕI: học tập hiệu quả, tư duy, làm việc nhóm, giao tiếp, quản lý thời gian – cảm xúc – công nghệ',
            'Nút 6 – HƯỚNG NGHIỆP & THIẾT KẾ LỘ TRÌNH 10–20 NĂM: từ cuối THCS đến THPT, khi câu hỏi học gì – thi trường nào – làm nghề gì trở nên rõ hơn'],
      dich: ['Một lõi bản lĩnh đủ chắc và một hệ giá trị đủ rõ',
             'Sáu năng lực cốt lõi đã có chỗ thực hành thật',
             'Một lộ trình do chính em đọc được, không do người lớn đọc hộ'],
      cong: 'Ba loại lửa cùng lúc: lửa bên trong (bản ngã, cảm xúc, nhu cầu được công nhận), lửa bên ngoài (áp lực học tập, thi cử, kỳ vọng xã hội), lửa va chạm (bạn bè, nhóm, mạng xã hội, cám dỗ).',
      rui: 'Lửa hoặc trở thành ngọn lửa biết soi, biết ấm, biết bền; hoặc bùng lên rồi tắt; hoặc cháy lan; hoặc bị dập từ sớm.' },

    { ma: 'C3', t: 'BAY CAO', nam: '20–30 tuổi', mau: '#185AB4',
      hoi: 'Bước vào đời, chọn nghề, chọn môi trường, khởi sự sự nghiệp, bắt đầu tạo tác động.',
      lam: ['Nút 7 – RA ĐỜI & CHỌN MÔI TRƯỜNG LÀM VIỆC ĐẦU TIÊN: công việc đầu đời không nhất thiết hoàn hảo, nhưng là trường học rất mạnh về thực tế, con người, va vấp',
            'Nút 8 – HÌNH THÀNH BẢN SẮC NGHỀ NGHIỆP & SỨ MỆNH CÁ NHÂN: câu hỏi chuyển từ “lương bao nhiêu” sang “con phù hợp với vai trò nào” và “con thấy ý nghĩa gì”',
            'Nút 9 – BƯỚC ĐẦU TẠO DI SẢN & CHUẨN BỊ CHO THẾ HỆ TIẾP: khoảng 28–30 tuổi, khi nhiều người bắt đầu xây gia đình, đội ngũ, tổ chức, dự án riêng'],
      dich: ['Ba pha chiến lược: Định vị & Thử nghề (20–23), rồi hai pha sau của Bản đồ 10 năm sự nghiệp',
             'Một hệ ba vòng hỗ trợ: mentor, cộng đồng, dự án',
             'Người đi tìm một cuộc đời có ý nghĩa, chứ không chỉ đi tìm một công việc'],
      cong: 'Đây là lúc “Gen Việt” được chuyển giao — hoặc tiếp nối, hoặc đứt gãy.',
      rui: 'Mười cái bẫy được sách đặt tên, trong đó có: nhảy việc vô thức, ở lì vì sợ thay đổi, hào quang ảo trên mạng xã hội, lương là thước đo duy nhất, “đốt mình” vì không biết quản trị năng lượng, học thêm vô định, “tự lực mù” không biết xin giúp đỡ, mất kết nối với thế hệ sau.' }
  ];

  /* ── 5 · Mô thức — những mô hình tác giả đặt tên ───────────────
     truc = mô thức phục vụ trục nào của Bản đồ 30 năm.
     xn   = dấu hiệu cho biết mô thức đã chạy thật, không chạy hình thức. */
  G.MS_MO_THUC = [
    { ma: 'MT-01', t: 'Năm trục của Bản đồ 30 năm', truc: 'Khung tổng', mau: '#5140B4',
      n: 'Ở cấp độ hệ thống, Bản đồ 30 năm được xây dựng trên năm trục chính.',
      lam: 'Trục Con người – Bản chất cá nhân · Trục Phẩm chất – Tính cách – Việt tính · Trục Năng lực – Năng suất – Giá trị tạo ra · Trục Hệ sinh thái – Môi trường đồng hành · Trục Di sản – Ảnh hưởng – Tác động dài hạn.',
      xn: 'Mỗi hoạt động, mỗi công cụ đều chỉ ra được nó nằm trên trục nào; không hoạt động nào nằm ngoài năm trục.',
      vi: 'Trục Di sản đặt câu hỏi cuối: không phải “Con kiếm được bao nhiêu tiền?” mà “Con trở thành người như thế nào? Con để lại gì cho thế hệ sau?”' },

    { ma: 'MT-02', t: 'Năm lớp Gen Việt — bản mã bên trong', truc: 'Con người – Bản chất', mau: '#9E470D',
      n: 'Cách sách định nghĩa Gen Việt: một tổ hợp bản chất – phẩm chất – năng lực – ký ức văn hoá – cách tư duy của con người Việt Nam, khi được đánh thức có ý thức.',
      lam: 'Lớp Cội nguồn – Lịch sử – Văn hoá · Lớp Phẩm chất – Việt tính · Lớp Tư duy – Năng lực học hỏi · Lớp Kết nối – Gia đình – Cộng đồng · Lớp Khát vọng – Thời đại số.',
      xn: 'Đứa trẻ không còn phải “đuổi theo” mô hình thành công của người khác, mà đi con đường của mình trên nền bản sắc Việt, với tiêu chuẩn toàn cầu.',
      vi: 'Lớp Cội nguồn gồm ý chí tồn tại qua chiến tranh, tinh thần chịu thương chịu khó, khả năng thích nghi cao, tư duy “liệu cơm gắp mắm”.' },

    { ma: 'MT-03', t: 'Bộ giá trị lõi Gen Việt 10–20 tuổi', truc: 'Phẩm chất – Việt tính', mau: '#A8801F',
      n: 'Năm trụ giá trị được chọn sau nhiều năm làm việc với học sinh, phụ huynh, giáo viên, doanh nghiệp, nhà lãnh đạo.',
      lam: 'TRUNG THỰC – dám nhìn thẳng vào sự thật · TRÁCH NHIỆM – đã nhận lời thì đi đến cùng · BỀN BỈ – KỶ LUẬT – đi từng bước nhỏ đến cùng, kể cả khi không còn hứng thú · PHỤC VỤ – CỐNG HIẾN – sống không chỉ để lấy về, mà còn để cho đi · TỰ TÔN VIỆT – KHIÊM NHƯỜNG TOÀN CẦU – vững gốc mà vẫn mở lòng học hỏi.',
      xn: 'Học sinh dùng chính ngôn ngữ giá trị đó để nói chuyện với nhau khi có việc, chứ không chỉ nhắc lại được khi được hỏi.',
      vi: 'Trung thực ở tuổi 10–20 rất đời thường: không nhận công về mình khi đó là thành quả của cả nhóm; dám nói “con chưa hiểu” thay vì gật cho xong.' },

    { ma: 'MT-04', t: 'Sáu năng lực cốt lõi Gen Việt', truc: 'Năng lực – Giá trị tạo ra', mau: '#185AB4',
      n: 'Bộ năng lực nền giúp con học suốt đời, thích nghi với nghề mới, bước vào bất kỳ môi trường nào cũng không bị chìm, và biến giá trị bên trong thành kết quả hữu hình.',
      lam: 'Tự học & quản trị bản thân · Tư duy phản biện & tư duy hệ thống · Giao tiếp & hợp tác đa dạng · Năng lực số & làm chủ công nghệ · Giải quyết vấn đề & sáng tạo ứng dụng · Lãnh đạo bản thân & triển khai dự án.',
      xn: 'Khi hỏi, học sinh kể được mình mạnh lên cụ thể ở đâu — dám thuyết trình hơn, làm việc nhóm tốt hơn — chứ không kể bằng điểm số.',
      vi: 'Đây là bộ khung vận hành để thiết kế chương trình GITA, cấu trúc CLB, nội dung trại và hệ thống nhiệm vụ – dự án – bảng biểu rèn luyện.' },

    { ma: 'MT-05', t: 'Kiến trúc rèn giá trị: 3 lớp – 4 vòng', truc: 'Phẩm chất – Việt tính', mau: '#0B7350',
      n: 'Câu hỏi mà mô thức này trả lời: tổ chức việc rèn giá trị thế nào để không phụ thuộc vào cảm hứng từng thầy cô hay từng mùa phong trào.',
      lam: 'Ba lớp: Nhận thức – hiểu & gọi tên · Trải nghiệm – thử & nếm · Nội hoá – chọn & sống. Bốn vòng lặp: Vòng tuần · Vòng 90 ngày · Vòng năm · Vòng chặng 3–5 năm.',
      xn: 'Lớp nội hoá xuất hiện khi không còn ai đứng nhắc, không có điểm danh, không có khen thưởng tức thời, mà em vẫn giữ lời hứa và dám nhận sai.',
      vi: 'Vòng 90 ngày là “đơn vị chiến đấu”: tuần 1–4 nhận thức và trải nghiệm nhẹ, tuần 5–8 thử thách tăng dần, tuần 9–12 củng cố và nội hoá bước đầu.' },

    { ma: 'MT-06', t: 'Chu trình dự án 4D Gen Việt', truc: 'Năng lực – Giá trị tạo ra', mau: '#9E470D',
      n: 'Chu trình dự án chuẩn bốn bước, đủ đơn giản để học sinh 10–20 tuổi hiểu và áp dụng, đủ sâu để đi cùng các em lên những dự án phức tạp hơn ở tuổi 20–30.',
      lam: 'D1 – Định nghĩa (Define): rõ mục tiêu – ý nghĩa – phạm vi · D2 – Dự trù & Thiết kế (Design): rõ nguồn lực – kế hoạch – phân công · D3 – Dẫn & Thực hiện (Drive): vào hành động, xử lý phát sinh · D4 – Đúc rút (Debrief): nhìn lại, rút kinh nghiệm, ghi vào hồ sơ phát triển.',
      xn: 'Sau mỗi chu trình, hồ sơ Gen Việt cá nhân có thêm một bản ghi kinh nghiệm mới, không chỉ thêm một ảnh sự kiện.',
      vi: 'Ở D1, vai trò người lớn là đặt câu hỏi gợi mở, tránh áp đặt luôn câu trả lời, và kiểm tra để mục tiêu thực tế, vừa sức.' },

    { ma: 'MT-07', t: '4Q — khung phản tư chuẩn của hệ', truc: 'Con người – Bản chất', mau: '#5140B4',
      n: 'Công cụ đơn giản nhưng cực kỳ quan trọng, có hai phiên bản để tránh biến phản tư thành bài tập hình thức.',
      lam: '4Q chuẩn: Q1 – Em THẤY gì? · Q2 – Em HỌC được gì? · Q3 – Em CẢM thấy gì? · Q4 – Em SẼ LÀM gì? — 4Q nâng cao: Q1 – Em THẤY gì trong sự việc và trong chính mình? · Q2 – Em HIỂU gì về bản thân, người khác, hệ thống? · Q3 – Em CHỌN điều gì là quan trọng với mình lúc này? · Q4 – Em CAM KẾT làm gì khác đi trong 7–30 ngày tới?',
      xn: '4Q được đọc, được trân trọng và được sử dụng lại trong điều chỉnh hoạt động; giáo viên nhắc lại cam kết Q4 sau một tuần.',
      vi: 'Năm ảo tưởng cần tháo: phản tư là phần dư · viết 4Q cho vui · câu hỏi càng khó càng sâu · đọc 4Q để tìm thủ phạm · phản tư là việc của học sinh.' },

    { ma: 'MT-08', t: 'Khung K–N–G–H cho tư duy phản biện', truc: 'Năng lực – Giá trị tạo ra', mau: '#185AB4',
      n: 'Khung bốn bước dễ nhớ để giữ cái đầu tỉnh giữa thời đại quá tải thông tin. Ba tầng phía sau nó: Nhìn – Hỏi – Kết nối.',
      lam: 'K – Kiểm chứng: thông tin này đến từ đâu, có ít nhất hai nguồn đáng tin không? · N – Nhìn đa chiều: ai liên quan, mỗi bên có góc nhìn gì? · G – Gắn bối cảnh: nếu đổi bối cảnh, quyết định có đổi không? · H – Hành động nhỏ, học từ phản hồi.',
      xn: 'Học sinh có thói quen dừng lại 5–10 giây để chạy K–N–G–H trước khi cuốn theo cảm xúc và đám đông.',
      vi: 'Ba tình huống ứng dụng gần gũi trong sách: đọc một tin giật gân về thi cử, xung đột nhóm bạn bè, và chọn giữa hai phương án học tập.' },

    { ma: 'MT-09', t: 'Bốn trục tự quản', truc: 'Năng lực – Giá trị tạo ra', mau: '#A8801F',
      n: 'Bộ trục dùng cho năng lực Tự học & quản trị bản thân, và được dùng lại ở “độ khó 20–30 tuổi” trong quản trị sự nghiệp.',
      lam: 'Mục tiêu – Thời gian – Năng lượng – Cảm xúc.',
      xn: 'Cùng bốn trục ấy xuất hiện trong kịch bản trại, trong mô-đun Tự học 90 ngày và trong bộ công cụ 20–30 tuổi — một ngôn ngữ, nhiều độ khó.',
      vi: 'Ở tuổi 20–30, bẫy “đốt mình” được chữa bằng chính trục Năng lượng: đặt khoảng nghỉ chiến lược trong tuần, quý, năm.' },

    { ma: 'MT-10', t: 'Năm trụ cột kiến trúc hệ sinh thái', truc: 'Hệ sinh thái – Môi trường', mau: '#0B7350',
      n: 'Không phải năm tổ chức tách biệt, mà là năm “class chức năng” trong cùng một hệ điều hành, dùng chung lõi triết lý và bộ công cụ.',
      lam: 'GEN VIỆT ACADEMY – học viện và khung chương trình lõi · GEN VIỆT CLUBS – mạng lưới CLB, phòng lab học đường · GEN VIỆT CAMPS – trại và không gian trải nghiệm cường độ cao · GEN VIỆT CAREER & MENTOR HUB – không gian cho 20–30 và 30–50 tuổi · GEN VIỆT MEDIA & KNOWLEDGE BASE – hệ tri thức và truyền thông giá trị.',
      xn: 'Mọi sản phẩm và hoạt động của từng trụ cột đều chỉ ra được nó “ăn” vào chỗ nào của Bản đồ 30 năm.',
      vi: 'Academy là bộ não chiến lược, gồm ít nhất năm bộ phận: Hội đồng Triết lý & Bản đồ 30 năm · Ban Thiết kế Chương trình theo độ tuổi · Ban Đào tạo & Phát triển Huấn luyện viên/Chủ nhiệm/Mentor · Ban Đo lường – Nghiên cứu – Cải tiến · Ban Kết nối Đối tác & Kiểm định chất lượng.' },

    { ma: 'MT-11', t: 'CLB Gen Việt — ba tầng và 12 Ban', truc: 'Hệ sinh thái – Môi trường', mau: '#BE0E16',
      n: 'Cấu trúc để CLB không rơi vào cảnh Ban Chủ nhiệm làm hết còn 12 Ban chỉ tồn tại trên danh sách.',
      lam: 'Tầng 1 – Hạt nhân lãnh đạo (Ban Chủ nhiệm, Trưởng/Phó 12 Ban, cam kết một năm học) · Tầng 2 – Đội ngũ nòng cốt (5–15 bạn mỗi Ban, cam kết 6–12 tháng) · Tầng 3 – Thành viên rộng (tham gia linh hoạt theo năm học).',
      xn: 'Đội ngũ hoạt động được mà không phụ thuộc hoàn toàn vào chủ nhiệm CLB: chủ nhiệm vắng 1–2 hoạt động nhỏ mà mọi thứ vẫn chạy.',
      vi: '12 Ban phủ các mảng: Nội dung & Đào tạo · Văn hoá – Tinh thần · Dự án & Cộng đồng · Truyền thông & Media · Hậu cần – Sự kiện · Nghiên cứu & Đo lường · Tư vấn – Lắng nghe bạn · Kết nối Gia đình & Phụ huynh · Công nghệ & Chuyển đổi số · Tài chính & Nguồn lực · Phát triển Thành viên · Di sản – Lịch sử & Hồ sơ.' },

    { ma: 'MT-12', t: 'Năm đường trục của một lớp học Gen Việt', truc: 'Hệ sinh thái – Môi trường', mau: '#185AB4',
      n: 'Cách nhìn một lớp học như một hệ nhỏ, để giáo viên chủ nhiệm không bị lạc trong vô số việc.',
      lam: 'Trục 1 – Kỷ luật & An toàn cảm xúc · Trục 2 – Tinh thần & Văn hoá lớp · Trục 3 – Học tập & Năng lực cốt lõi · Trục 4 – Định hướng & Trải nghiệm · Trục 5 – Kết nối Gia đình & Nhà trường.',
      xn: 'Mỗi trục có một câu hỏi trung tâm để giáo viên tự soi, ví dụ trục 1: “Lớp này có phải là nơi học sinh cảm thấy an toàn để học và để là chính mình không?”',
      vi: 'Chỉ báo trục 4: học sinh bắt đầu nói về tương lai không chỉ bằng tên nghề, mà bằng “kiểu người” mình muốn trở thành.' },

    { ma: 'MT-13', t: 'Ba vòng tác động Gen Việt trong lớp', truc: 'Hệ sinh thái – Môi trường', mau: '#A8801F',
      n: 'Ba vòng lồng vào nhau, để giáo viên chủ nhiệm áp dụng được mà không kiệt sức vì thêm mô hình.',
      lam: 'Vòng 1 – SHCN Gen Việt, 35–45 phút mỗi tuần hoặc hai tuần một lần · Vòng 2 – Gen Việt trong giờ bộ môn, tận dụng 3–5 phút “Gen Việt hoá” · Vòng 3 – Gen Việt ngoài tiết học, qua công việc lớp và các vai nhỏ nhưng rõ.',
      xn: 'Học sinh không chỉ được dạy, mà được sống – được thử – được ghi nhận.',
      vi: 'Vòng 2 không biến tiết bộ môn thành tiết kỹ năng sống, mà cài điểm chạm nhỏ: cách cho bài tập, cách phản hồi, cách giao dự án nhóm, cách gọi tên nỗ lực.' },

    { ma: 'MT-14', t: 'Gia đình Gen Việt — ba tầng', truc: 'Hệ sinh thái – Môi trường', mau: '#0B7350',
      n: 'Mô hình khái niệm đủ đơn giản mà vẫn bao quát, để gia đình phối hợp được với nhà trường thay vì mỗi bên kéo một hướng.',
      lam: 'Tầng 1 – Cá nhân: bản đồ khí chất – tính cách – năng lực từng người, và những niềm tin lõi đang chi phối cách cha mẹ dạy con · Tầng 2 – Gia đình hạt nhân: tầm nhìn chung tối thiểu, các nguyên tắc mềm, nhịp đối thoại định kỳ · Tầng 3 – Gia tộc mở rộng: nhận diện nguồn lực tích cực và nguồn áp lực tiêu cực.',
      xn: 'Tầng 2 có cấu trúc rõ; nếu thiếu, mọi nỗ lực ở tầng cá nhân và ở nhà trường rất dễ bị triệt tiêu bởi xung đột trong chính gia đình.',
      vi: 'Niềm tin lõi thường gặp ở cha mẹ: “Chỉ có con đường A mới là an toàn”, “Thời buổi này phải cạnh tranh bằng bằng cấp”, “Con mình phải hơn con người ta”.' },

    { ma: 'MT-15', t: 'Cộng đồng Gen Việt — ba vòng đồng tâm', truc: 'Hệ sinh thái – Môi trường', mau: '#9E470D',
      n: 'Mô hình để các bên cùng hiểu và phối hợp khi đưa Gen Việt ra ngoài phạm vi nhà trường.',
      lam: 'Vòng 1 – Nhà trường và khu vực lân cận · Vòng 2 – Địa phương rộng hơn: phường/xã, quận/huyện, các tổ chức xã hội, cơ sở văn hoá – nghệ thuật – thể thao · Vòng 3 – Mạng lưới liên vùng, liên ngành: doanh nghiệp, trường đại học, tổ chức nghề nghiệp, mạng lưới cựu học sinh.',
      xn: 'Hoạt động diễn ra có kế hoạch, có tính lặp lại, có cơ chế đánh giá và cải tiến — không phải sự kiện đơn lẻ.',
      vi: 'Nguyên tắc chung của cả ba vòng: giá trị và định hướng Gen Việt được tôn trọng, và lợi ích của học sinh được đặt làm trung tâm.' },

    { ma: 'MT-16', t: 'Bốn lớp Di sản Trí tuệ Gen Việt', truc: 'Di sản – Tác động dài hạn', mau: '#5140B4',
      n: 'Cụ thể hoá “di sản” cho giai đoạn 30–50 tuổi, thành bốn lớp liên thông chứ không tách rời.',
      lam: 'Lớp 1 – Di sản bên trong bản thân (nhân cách, trí tuệ, nội lực) · Lớp 2 – Di sản trong gia đình & con cái · Lớp 3 – Di sản trong nghề & tổ chức · Lớp 4 – Di sản cho cộng đồng & quốc gia.',
      xn: 'Câu hỏi kiểm lớp 3: nếu ngày mai tôi không còn trực tiếp làm nữa, điều gì trong nghề vẫn còn vận hành tốt nhờ những gì tôi đã xây?',
      vi: 'Một người có thể tạo tiếng vang bên ngoài, nhưng nếu bên trong rỗng, gia đình vỡ, tổ chức mong manh, thì di sản sẽ không bền.' },

    { ma: 'MT-17', t: 'Năm vòng tròn lãnh đạo Gen Việt và bốn mức', truc: 'Hệ sinh thái – Môi trường', mau: '#BE0E16',
      n: 'Khung năng lực dùng cho tuyển chọn, bồi dưỡng, tự soi và đánh giá phát triển của người lãnh đạo trong hệ.',
      lam: 'Năm vòng: Tự thân · Con người & Đội ngũ · Chuyên môn & Sư phạm · Hệ thống & Chiến lược · Xã hội & Thời đại. Bốn mức: Người thực thi có ý thức · Người dẫn dắt nhóm – lớp · Người kiến trúc cấp trường – cộng đồng · Người kiến tạo di sản – chiến lược dài hạn.',
      xn: 'Mỗi mức không phải một chức vụ, mà là một nấc phát triển năng lực; có thể xuất hiện ở giáo viên, cán bộ quản lý, phụ huynh nòng cốt hay học sinh dẫn dắt dự án.',
      vi: 'Vòng 4 thường bị bỏ quên: nhiều người lãnh đạo rất có tâm, rất yêu trẻ, nhưng thiếu tư duy hệ thống nên dễ kiệt sức và mô hình khó nhân rộng.' },

    { ma: 'MT-18', t: 'Hệ chỉ báo ba tầng: Lớp – Đơn vị – Mạng lưới', truc: 'Di sản – Tác động dài hạn', mau: '#A8801F',
      n: 'Đo lường để bảo vệ chiều sâu, không phải để xếp hạng.',
      lam: 'Tầng Lớp/Nhóm hỏi: học sinh đang thay đổi thế nào về giá trị, thói quen, trải nghiệm · Tầng Đơn vị hỏi: trường hoặc trung tâm đang làm sâu đến đâu, rộng đến đâu · Tầng Mạng lưới hỏi: hệ sinh thái đang tích luỹ di sản và mở rộng thế nào.',
      xn: 'Mỗi năm ít nhất một phiên “Đọc dữ liệu Gen Việt” chung toàn đội ngũ — dữ liệu giúp học tốt hơn chứ không chỉ để báo cáo.',
      vi: 'Chỉ báo tối thiểu cấp lớp gồm nhóm Tham gia & gắn kết, nhóm An toàn & khí hậu lớp (khảo sát ẩn danh 3–5 câu), nhóm Giá trị & thói quen.' }
  ];

  /* ── 6 · Câu trích nguyên văn ─────────────────────────────────
     Cột: [câu trích, nguồn trong sách]. Giữ đúng chữ tác giả. */
  G.MS_TRICH = [
    ['Khi không có bản đồ, hai khả năng rất dễ xảy ra: hoặc là đi vòng mãi mà không ra được đường lớn, hoặc là chạy rất nhanh… nhưng đi nhầm hướng.', 'Lời dẫn – Khi một thế hệ cần một bản đồ'],
    ['Đây là một cuốn sách bản đồ. Và cũng là một lời mời: Nếu chúng ta cùng nhau, rất có thể 30 năm tới sẽ là 30 năm Gen Việt trưởng thành, chứ không chỉ là 30 năm… trôi qua.', 'Lời dẫn – Khi một thế hệ cần một bản đồ'],
    ['Một đứa trẻ Việt không nhất thiết phải trở thành bản sao của bất kỳ ai. Em có quyền trở thành phiên bản tốt nhất của một người Việt Nam sống trong thế kỷ 21.', 'Mục: Vì sao cần một bản đồ đặc thù cho người Việt'],
    ['Bản đồ không chỉ trả lời “30 năm tới ta đi đâu?”, mà còn chỉ rõ: “3 tháng tới ta làm gì cho đúng? Tuần này nên bắt đầu từ đâu?”', 'Nguyên tắc thiết kế 1 – Dài hạn nhưng có thể hành động ngay'],
    ['Chúng ta không cần thêm những thế hệ kiệt sức vì chạy đua, giỏi nhưng bất ổn nội tâm, có thành tích nhưng không hạnh phúc.', 'Nguyên tắc thiết kế 5 – An toàn – Lành mạnh – Bền vững'],
    ['Thử thách đủ, nhưng không bẻ gãy; đòi hỏi đủ, nhưng không bào mòn; khuyến khích tiến bộ, thay vì tôn thờ hoàn hảo.', 'Nguyên tắc thiết kế 5 – An toàn – Lành mạnh – Bền vững'],
    ['Câu hỏi không chỉ là “Lúc đó con làm nghề gì?” mà quan trọng hơn: “Trong bối cảnh đầy biến động như vậy, con sẽ trở thành kiểu người như thế nào để không chỉ sống sót, mà còn sống có ý nghĩa?”', 'Mục 1.1 – Việt Nam 30 năm tới'],
    ['Một đứa trẻ không thể được yêu cầu “tự bản lĩnh đi hết 30 năm” nếu xung quanh em chỉ có những người lớn mệt mỏi, bối rối, thiếu định hướng.', 'Mục 1.2 – Năm lực kéo lớn'],
    ['Quy tắc bên ngoài có thể khiến con “ngoan” khi bị kiểm soát, nhưng chỉ có bản lĩnh bên trong và hệ giá trị đã được con tự tay rèn mới giữ được con khi không có ai đứng cạnh.', 'Mục 2.5 – Trụ 1: Rèn bản lĩnh & hệ giá trị'],
    ['Bản lĩnh và giá trị không được “download” qua bài giảng, mà được: rèn qua quyết định, nén qua trải nghiệm, củng cố qua việc được phản hồi và ghi nhận đúng lúc.', 'Mục 2.5 – Bản lĩnh và giá trị: không phải “dạy”, mà là “rèn”'],
    ['Con chọn sống như thế này, vì con tin đây là cách sống đúng với người con muốn trở thành.', 'Mục 2.5 – khi bản đồ giá trị riêng của một học sinh thành hình'],
    ['Khi một người trẻ cảm nhận được niềm vui yên lặng của việc đi đến cùng, em sẽ bớt bị cuốn theo những hào nhoáng tức thời.', 'Mục 2.6 – Trụ giá trị Bền bỉ – Kỷ luật'],
    ['Phục vụ không làm mình nhỏ đi mà ngược lại, làm trái tim và bản lĩnh của mình lớn lên.', 'Mục 2.6 – Trụ giá trị Phục vụ – Cống hiến'],
    ['Tôi là người Việt Nam – đó là niềm tự hào, và chính vì thế, tôi càng phải học nhiều hơn, khiêm nhường hơn, để xứng đáng với cái gốc mà mình mang theo.', 'Mục 2.6 – Trụ giá trị Tự tôn Việt – Khiêm nhường toàn cầu'],
    ['Nhiều điều con học ở trường hôm nay, 10–20 năm nữa có thể lỗi thời. Nhưng cách con học, cách con tư duy, cách con giải quyết vấn đề, cách con làm việc với người khác sẽ đi cùng con cả đời.', 'Mục 2.8 – Trụ 2: Rèn năng lực cốt lõi'],
    ['Phản biện không chỉ là nói, mà là dám thử một bước nhỏ – rồi học từ nó.', 'Bảng 2.4 – Khung K–N–G–H, bước H'],
    ['Người học hôm nay chính là người dẫn dắt ngày mai.', 'Mục 5.2 – Dòng chảy nhân lực & giá trị trong hệ sinh thái'],
    ['Bản đồ 30 năm luôn được sống trong hiện thực mới, không trở thành “sách giáo khoa bất động”.', 'Mục 5.3 – Nguyên tắc vận hành cốt lõi'],
    ['Sản phẩm có thể lỗi thời, nhưng một thế hệ người Gen Việt được rèn & một mô thức vận hành bền vững sẽ tiếp tục đi xa hơn tuổi thọ của người sáng lập.', 'Mục 4.1 – Từ sự nghiệp cá nhân đến di sản'],
    ['Di sản Trí tuệ Gen Việt luôn gắn với 3 chữ: Người – Mô thức – Hệ sinh thái.', 'Mục 4.1 – Từ sự nghiệp cá nhân đến di sản'],
    ['Người Gen Việt không ảo tưởng rằng mình sẽ tránh hết 10 cái bẫy, nhưng biết đặt tên, biết dừng lại soi chiếu, biết biến mỗi cú vấp thành một đoạn nâng cấp trên Bản đồ 10 năm.', 'Mục 3.8 – Mười cái bẫy của giai đoạn 20–30 tuổi'],
    ['Nếu dừng ở đây, cuốn sách sẽ chỉ là một bản thiết kế đẹp, gây cảm hứng, nhưng có nguy cơ “đóng bìa nằm trên kệ”.', 'Mục 12.1 – Từ cuốn sách trên bàn làm việc đến nhịp sống hằng ngày'],
    ['Mọi mô hình đổi mới đều phải sống trong lòng hệ thống.', 'Mục 12.10 – Rủi ro chiến lược khi triển khai sai cách'],
    ['4Q là kênh nghe & hiểu trước, rồi mới là kênh can thiệp; tuyệt đối không dùng để bêu xấu.', 'Mục 14.5 – Năm ảo tưởng về phản tư'],
    ['Câu hỏi sâu là câu HS trả lời được và dám trả lời thật; độ sâu tăng dần theo độ tuổi.', 'Mục 14.5 – Năm ảo tưởng về phản tư'],
    ['Tôi có thể áp dụng được, mà không bị kiệt sức vì thêm mô hình.', 'Mục 8.1 – câu mà một giáo viên chủ nhiệm phải nói được sau khi đọc Chương 8']
  ];

  /* ── 7 · Rủi ro chiến lược và câu hỏi đỏ ──────────────────────
     dau = dấu hiệu nhận biết · phanh = việc phải làm ngay. */
  G.MS_RUI = [
    { t: '“Phong trào hoá” Gen Việt',
      dau: 'Hoạt động gắn logo Gen Việt tăng nhanh, nhưng tài liệu hoá – PDCA – đo lường thì ít. Giáo viên, học sinh, phụ huynh nói “Gen Việt” như một phong trào, không kể được cụ thể mình đã làm gì, học được gì. Câu hỏi đỏ: trong báo cáo, chúng ta nói nhiều về “bao nhiêu hoạt động” hơn là “học sinh thay đổi ra sao”?',
      phanh: 'Giảm số hoạt động, tăng đầu tư cho PDCA và phản tư. Chọn 1–2 hoạt động mũi nhọn, làm sâu và đo tử tế. Nếu không xử lý: mô hình cháy sau 1–2 năm, đội ngũ mệt mỏi và mất niềm tin.' },

    { t: '“Hành chính hoá” hệ đo lường',
      dau: 'Biểu mẫu và báo cáo Gen Việt dày lên nhưng ít ai đọc, ít cuộc đối thoại. Giáo viên coi đây là giấy tờ phải nộp thêm. Câu hỏi đỏ: giáo viên có thường nói “Lại thêm báo cáo Gen Việt nữa”?',
      phanh: 'Rà soát biểu mẫu, bỏ bớt cái trùng và cái vô nghĩa. Tích hợp vào biểu mẫu Bộ đã quy định. Mời giáo viên tham gia thiết kế lại công cụ.' },

    { t: '“Thương mại hoá” bản sắc Gen Việt',
      dau: 'Gen Việt được dùng chủ yếu như công cụ marketing; hoạt động tập trung vào hình ảnh, ít đầu tư cho trải nghiệm và hệ thống. Câu hỏi đỏ: quyết định hoạt động Gen Việt gần đây có bị chi phối quá nhiều bởi mục tiêu PR?',
      phanh: 'Xem lại nguyên tắc hợp tác và truyền thông. Tạm dừng những hoạt động khiến học sinh hoặc cộng đồng khó chịu, mất niềm tin. Hệ quả nếu để lâu: học sinh trở thành “đạo cụ truyền thông”.' },

    { t: 'Phụ thuộc cá nhân “ngôi sao”',
      dau: 'Mọi việc Gen Việt gắn chặt với một hai người; khi họ vắng mặt, mọi hoạt động dừng lại. Câu hỏi đỏ: nếu một vài người rời đi hoặc bị điều chuyển, hệ thống sẽ “sập”?',
      phanh: 'Thiết kế lộ trình kế cận, phân quyền dần. Tài liệu hoá đầy đủ quy trình, kịch bản, case. Nguyên tắc gốc trong khung sách: xây hệ sinh thái bền vững, không phụ thuộc cá nhân.' },

    { t: 'Xung đột ngầm với quy định hiện hành',
      dau: 'Gen Việt bị xem là “việc riêng”, không gắn được với kế hoạch năm học và chuẩn phẩm chất – năng lực. Câu hỏi đỏ: giáo viên hay ban giám hiệu có cảm giác phải “lách” quy định để làm Gen Việt?',
      phanh: 'Đối chiếu kỹ với văn bản Bộ và Sở. Điều chỉnh cách diễn đạt, cách tích hợp để Gen Việt đi cùng chiến lược chính thức. Chủ động báo cáo, xin ý kiến, mời dự giờ thay vì né tránh.' }
  ];

  /* ── 8 · Nguyên tắc bất biến ──────────────────────────────────
     Gộp ba bộ nguyên tắc mà sách nêu: 5 nguyên tắc thiết kế Bản đồ,
     4 nguyên tắc vận hành hệ sinh thái, 4 nguyên tắc kích hoạt. */
  G.MS_LUAT = [
    'Dài hạn nhưng có thể hành động ngay. Tầm nhìn là 30 năm, nhưng đơn vị hành động là 1 năm – 90 ngày – 30 ngày – 7 ngày.',
    'Việt tính là gốc, toàn cầu là chuẩn đo. Hiếu kính, nghĩa tình, biết ơn, bản lĩnh, kiên trì, giữ lời hứa là “rễ Việt” không đánh đổi; tư duy phản biện, giao tiếp, năng lực số, sáng tạo, làm việc xuyên văn hoá là “tán cây toàn cầu” phải vươn tới.',
    'Hệ sinh thái đồng hành, không phải một cá nhân tự chống chọi. Cha mẹ biết mình đóng vai gì ở từng chặng; thầy cô biết mình gieo hạt gì trong 3–5 năm dạy một thế hệ; tổ chức biết mình tham gia vào đâu trong bản đồ dài hạn.',
    'Cá nhân hoá lộ trình — mỗi người là một “bản đồ con”. Bản đồ không áp đặt rằng tất cả con đều phải làm bác sĩ, kỹ sư, doanh nhân, lãnh đạo.',
    'An toàn – lành mạnh – bền vững. Không hy sinh thân thể cho thành tích ngắn hạn; không “cháy sáng rồi tắt” mà tiến đều, tiến vững.',
    'Một lõi – nhiều mô-đun – nhiều đơn vị đồng hành. Lõi là triết lý, giá trị, khung 30 năm và bộ công cụ chuẩn; mô-đun và đơn vị được phép biến tấu quanh lõi đó.',
    'Tự nguyện – trách nhiệm – kết nối dài hạn. Người tham gia đi vào hệ vì thấy ý nghĩa và hợp giá trị, chứ không vì phong trào; đã vào thì mỗi vai trò đều có kỳ vọng và cam kết rõ.',
    'Thực chiến – phản chiếu – cập nhật liên tục. Mọi mô-đun đều phải được thử trong đời sống thật; sau mỗi chu kỳ, hệ thu lại dữ liệu và câu chuyện để chỉnh mô hình.',
    'Tôn trọng đa dạng – giữ vững lõi Gen Việt. Điều giữ chung là trục giá trị, trục năng lực cốt lõi, cách nhìn 30 năm và phương pháp rèn: mục tiêu – chu kỳ – dự án – phản chiếu.',
    'Nhỏ mà đúng. Không cần lớn ngay, chỉ cần đúng hướng: ưu tiên chọn 1–2 lớp, 1–2 dự án làm thật đến nơi, thay vì triển khai đồng loạt mọi nơi ngay năm đầu.',
    'Sâu mà chậm. Chấp nhận tiến độ vừa phải để chất thấm vào người; không đánh giá mô hình chỉ bằng số lượng sự kiện trong 1–2 năm đầu.',
    'Đều mà dai. Thắng bằng nhịp độ, không thắng bằng bùng nổ: mỗi năm đều có hoạt động cốt lõi lặp lại để tạo đường vân dài hạn.',
    'Kết nối mà không lệ thuộc. Mỗi trường, gia đình, địa phương được linh hoạt điều chỉnh chi tiết, miễn không đánh mất trục Gen Việt; không sao chép máy móc, không đợi “trên” ban hành đủ thứ mới dám làm.',
    'Năm chuẩn lõi soi mọi quyết định triển khai: Giá trị – Thói quen – Trải nghiệm – Di sản – An toàn & Đạo đức.',
    'Thái độ chiến lược của người dẫn: khiêm tốn — chấp nhận đây là hành trình thử, sai, sửa, học; kiên định — không để dao động ngắn hạn phá vỡ đường dài; cởi mở — sẵn sàng để người khác nhìn thấy cả thành công lẫn vấp ngã.'
  ];

})(window.GV = window.GV || {});
