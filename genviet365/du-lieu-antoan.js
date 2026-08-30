/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT · AN TOÀN TRẠI VÀ BẢO VỆ TRẺ EM Ở LẠI QUA ĐÊM

   BIÊN SOẠN MỚI — kho gốc của Học viện chưa có phần này. Đây là
   khung an toàn theo thông lệ tốt, KHÔNG THAY THẾ tư vấn y tế và
   pháp lý chuyên môn. Trước khi tổ chức trại thật, Học viện phải
   để một cán bộ y tế có chứng chỉ và một luật sư rà lại, và phải
   tuân thủ quy định hiện hành của địa phương.

   VÌ SAO CÓ KHO NÀY:
   Tài liệu "TRẠI HUẤN LUYỆN LEADER BOOM 2026.docx" không có chương
   an toàn nào. G.TV2_TRAI_AN_TOAN trong du-lieu-trai-vip.js là mười
   ba điều gom từ ba chỗ rời — luật chơi, phiếu cam kết, ô "Rủi ro &
   Lưu ý" — và không có quy định y tế, sơ cứu, bảo hiểm, quy trình
   sự cố hay số điện thoại khẩn. Trong khi đó G.NQ_KIEM_DINH chấm
   "An toàn trẻ em" 15 điểm, và ghi rõ: phần này bằng không thì cả
   kỳ kiểm định không đạt, bất kể tổng điểm. Nghĩa là trại bảy ngày
   ấy hiện KHÔNG ĐƯỢC PHÉP CHẠY. Kho này viết đúng phần còn thiếu.

   BỐN ĐIỀU PHẢI BIẾT TRƯỚC KHI DÙNG:

   1. Toàn bộ nội dung ở đây là BIÊN SOẠN, không phải trích nguồn.
      Chỗ nào bám vào kho cũ thì kho cũ được gọi tên: bộ mười luật
      bảo vệ trẻ G.TC_BAO_VE, năm cấp khủng hoảng G.TC_KHUNG_HOANG,
      bộ giấy tờ G.TC_PHAP_LY trong du-lieu-tincay.js. Kho này KHÔNG
      chép lại những điều đã có ở đó; nó chỉ thêm phần riêng của môi
      trường ở lại qua đêm, và nói rõ chỗ nào nối vào đâu.

   2. Kho này KHÔNG hướng dẫn y khoa. Không có tên thuốc kèm liều,
      không có thủ thuật vượt quá sơ cứu cơ bản. Mọi sự cố nghiêm
      trọng đều kết thúc bằng cùng một câu: gọi cấp cứu, đưa tới cơ
      sở y tế, báo gia đình. Người phụ trách trại không tự xử.

   3. Các con số định mức — tỉ lệ người lớn trên trẻ, số lượng trong
      túi y tế, thời hạn lưu hồ sơ — là mức tối thiểu do kho này đặt
      ra theo thông lệ, KHÔNG phải trích từ văn bản pháp luật. Kho
      này cố ý không dẫn số hiệu văn bản nào, vì dẫn sai còn nguy
      hiểm hơn không dẫn. Bộ phận pháp chế phải đối chiếu lại.

   4. Số điện thoại khẩn dùng ở đây là bốn đầu số công cộng toàn
      quốc: 115 cấp cứu · 114 cứu hoả và cứu nạn · 113 công an ·
      111 Tổng đài quốc gia bảo vệ trẻ em. Số của trạm y tế, bệnh
      viện và công an sở tại thì mỗi trại phải tự lấy và tự kiểm
      trước ngày đi — kho này không ghi sẵn số nào của địa phương.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Việc phải xong TRƯỚC ngày trại ────────────────────
     Đếm ngược từ D-30. Mốc nào chưa xong thì không được bước sang
     mốc sau — đây là chuỗi có thứ tự, không phải danh sách gợi ý.
     Cột "ai" ghi vai, không ghi tên người: vai phải tồn tại kể cả
     khi người giữ vai đổi. */
  G.AT_TRUOC_TRAI = [
    { p: 'D-30', m: 'Chỉ định một Trưởng ban an toàn có tên, và một người thay khi vắng. Người này không kiêm dẫn chương trình, không kiêm trainer chính.',
      ai: 'Ban tổ chức trại', y: 'An toàn cần một người rảnh tay để nhìn. Người đang đứng lớp thì không nhìn được.' },
    { p: 'D-30', m: 'Khảo sát địa điểm tại chỗ, đi bộ hết khuôn viên. Ghi vào biên bản: lối thoát hiểm, nguồn nước hở (ao, hồ, bể, suối), chỗ dễ ngã, chỗ tối, chỗ mất sóng, chỗ người ngoài vào được.',
      ai: 'Trưởng ban an toàn · Trưởng ban hậu cần', y: 'Không khảo sát tại chỗ thì mọi phương án sau đều dựa vào ảnh quảng cáo của cơ sở.' },
    { p: 'D-30', m: 'Xác định cơ sở y tế gần nhất còn trực 24 giờ. Lái thử tuyến đường vào ban ngày và ban đêm, bấm giờ thật, in bản đồ giấy.',
      ai: 'Trưởng ban hậu cần', y: 'Con số cần biết là số phút thật, không phải số phút trên ứng dụng bản đồ.' },
    { p: 'D-30', m: 'Mua bảo hiểm tai nạn cho toàn bộ học viên và toàn bộ nhân sự, đủ cả bảy ngày và cả thời gian đi lại hai chiều. Lưu bản hợp đồng và số hotline của bên bảo hiểm.',
      ai: 'Bộ phận hành chính', y: 'Bảo hiểm là điều kiện bắt buộc với mọi hoạt động ngoài cơ sở, theo G.TC_PHAP_LY.' },
    { p: 'D-30', m: 'Thu lý lịch tư pháp còn hạn của MỌI người lớn sẽ ở trong khuôn viên trại: HLV, trainer, hậu cần, lái xe, nhân viên bếp, người của cơ sở lưu trú.',
      ai: 'Hồ sơ nhân sự', y: 'Kho cũ đã bắt buộc điều này với người dạy. Trại mở rộng ra mọi người lớn có mặt, vì trẻ ngủ lại.' },
    { p: 'D-30', m: 'Chốt tỉ lệ người lớn trên trẻ và bảng ca trực. Mức tối thiểu kho này đặt: ban ngày 1 người lớn / 8 học viên; hoạt động dưới nước 1 / 5; ban đêm mỗi khu ngủ luôn có ít nhất 2 người lớn thức trực.',
      ai: 'Trưởng trại', y: 'Tỉ lệ quyết định mọi thứ khác. Thiếu người thì mọi quy trình phía sau chỉ là chữ.' },
    { p: 'D-30', m: 'Gửi phiếu khai sức khoẻ tới từng gia đình, có hạn nộp là D-14. Phiếu hỏi: bệnh nền, thuốc đang dùng, dị ứng thức ăn, dị ứng thuốc, tiền sử co giật, hen, ngất, tiền sử sốc phản vệ, biết bơi hay không.',
      ai: 'Ban tổ chức trại', y: 'Không hỏi thì không biết. Biết muộn thì biết vào lúc không làm gì được nữa.' },
    { p: 'D-14', m: 'Chốt hồ sơ sức khoẻ từng em. Em nào phiếu còn trống ô thì gọi điện hỏi trực tiếp, ghi lại người trả lời và giờ gọi.',
      ai: 'Cán bộ y tế trại', y: 'Ô trống trên phiếu không có nghĩa là "không có gì".' },
    { p: 'D-14', m: 'Lập BẢNG DỊ ỨNG toàn trại: tên em, dị ứng thức ăn, dị ứng thuốc, biểu hiện đã từng gặp. Gửi bếp và bắt bếp ký nhận.',
      ai: 'Cán bộ y tế trại · Trưởng ban hậu cần', y: 'Dị ứng thức ăn là rủi ro chết người phổ biến nhất của trại bảy ngày ăn tập thể.' },
    { p: 'D-14', m: 'Ký hợp đồng với một cán bộ y tế có chứng chỉ hành nghề, có mặt tại trại suốt bảy ngày và cả đêm. Lưu bản sao chứng chỉ.',
      ai: 'Bộ phận hành chính', y: 'Không có người này thì trại không chạy. Đây là điều kiện, không phải hạng mục cải thiện.' },
    { p: 'D-14', m: 'Lập danh sách liên hệ khẩn cấp: mỗi em hai số của hai người khác nhau, gọi thử cả hai số trước khi chốt.',
      ai: 'Ban tổ chức trại', y: 'Một số duy nhất là một điểm hỏng duy nhất. Số chưa gọi thử là số chưa có.' },
    { p: 'D-14', m: 'Tập huấn an toàn nửa ngày cho toàn đội. Nội dung: ba mức báo động, mười hai quy trình sự cố, ranh giới người lớn với trẻ, quy trình nhận tố giác. Điểm danh có chữ ký.',
      ai: 'Trưởng ban an toàn', y: 'Kiểm định hỏi có diễn tập trong 12 tháng gần nhất hay không. Buổi này là bằng chứng đó.' },
    { p: 'D-7', m: 'Chốt danh sách học viên lần cuối. Em nào thiếu một trong bốn giấy — phiếu sức khoẻ, đồng thuận của người giám hộ, bảo hiểm, liên hệ khẩn cấp — thì chưa được ghi tên đi.',
      ai: 'Trưởng trại', y: 'Nhận thêm một em vào phút chót mà chưa đủ giấy là cách sự cố lớn thường bắt đầu.' },
    { p: 'D-7', m: 'Kiểm túi y tế theo G.AT_TUI_Y_TE. Bỏ mọi thứ hết hạn, bổ sung cho đủ số lượng tối thiểu, dán lại bảng số điện thoại khẩn ở mặt trong nắp.',
      ai: 'Cán bộ y tế trại', y: 'Túi y tế của trại trước không dùng lại được nếu chưa kiểm từng món.' },
    { p: 'D-7', m: 'Diễn tập trên giấy ba tình huống: một em vắng khi điểm danh · một em ngất giữa hoạt động ngoài trời · báo cháy lúc 2 giờ sáng. Bấm giờ, ghi chỗ tắc.',
      ai: 'Trưởng ban an toàn', y: 'Diễn tập tìm ra chỗ tắc rẻ hơn nhiều so với để sự cố thật tìm ra.' },
    { p: 'D-3', m: 'Gửi gia đình bản thông tin một trang: địa chỉ trại, số hotline trực 24 giờ của trại, giờ được gọi cho con, quy định điện thoại, tên Trưởng ban an toàn.',
      ai: 'Ban tổ chức trại', y: 'Phụ huynh không liên lạc được là nguồn khủng hoảng cấp 5 nhanh nhất, kể cả khi trại không có chuyện gì.' },
    { p: 'D-3', m: 'Kiểm cơ sở lần cuối: đèn lối thoát hiểm, bình chữa cháy còn hạn, khoá cổng ngoài, rào chắn quanh nguồn nước hở, nước sinh hoạt, sóng điện thoại tại khu ngủ.',
      ai: 'Trưởng ban hậu cần', y: 'Cơ sở thay đổi giữa lần khảo sát và ngày đến. Lần kiểm này bắt cái thay đổi đó.' },
    { p: 'D-1', m: 'Nhận thuốc riêng của từng em từ gia đình, có đơn của bác sĩ và có tên em trên hộp. Lập biên bản bàn giao hai bên ký. Cán bộ y tế giữ toàn bộ, khoá tủ.',
      ai: 'Cán bộ y tế trại', y: 'Thuốc để trong ba lô của trẻ là thuốc có thể bị uống nhầm, bị mất, hoặc bị bạn khác uống.' },
    { p: 'D-1', m: 'Dán bảng dị ứng và bệnh nền ở ba nơi: bếp, phòng y tế, phòng trực đêm. Che tên em bằng mã nếu bảng ở nơi người ngoài đi qua.',
      ai: 'Cán bộ y tế trại', y: 'Bảng nằm trong cặp của một người là bảng không ai đọc được lúc 3 giờ sáng.' },
    { p: 'D-1', m: 'Điểm danh nhân sự, phát thẻ tên, chốt ca trực đêm bảy ngày, chốt xe và lái xe luôn sẵn sàng chở đi cấp cứu. Xe không được rời trại vì việc khác.',
      ai: 'Trưởng trại', y: 'Xe đi mua đồ lúc có sự cố là tình huống đã xảy ra ở rất nhiều trại.' }
  ];

  /* ── 2 · Túi y tế bắt buộc ─────────────────────────────────
     Cột: nhóm · hạng mục · số lượng tối thiểu · dùng khi nào.
     Số lượng tính cho MỖI 50 HỌC VIÊN cho trọn bảy ngày. Trại đông
     hơn thì nhân lên, không chia nhỏ ra. Danh mục này là hạng mục
     sơ cứu và vật tư, KHÔNG phải đơn thuốc: kho này cố ý không ghi
     tên thuốc kèm liều. Ai được phát cái gì là quyết định của cán
     bộ y tế có chứng chỉ, không phải của HLV. */
  G.AT_TUI_Y_TE = [
    ['Bảo hộ', 'Găng tay y tế dùng một lần', '100 đôi', 'Mọi lần chạm vào máu, dịch hoặc vết thương hở — không có ngoại lệ vì vội'],
    ['Bảo hộ', 'Khẩu trang y tế', '100 cái', 'Khi chăm em có triệu chứng hô hấp, khi sơ cứu ở cự ly gần'],
    ['Bảo hộ', 'Túi rác y tế và hộp đựng vật sắc nhọn', '2 bộ', 'Bỏ bông gạc dính máu và vật sắc — không bỏ chung rác sinh hoạt của trại'],
    ['Rửa và sát trùng', 'Nước muối sinh lý 0,9% chai 500 ml', '6 chai', 'Rửa vết bẩn, rửa mắt khi bụi hoặc cát bay vào'],
    ['Rửa và sát trùng', 'Dung dịch sát khuẩn ngoài da', '4 lọ', 'Sát khuẩn quanh vết xước SAU khi đã rửa sạch bằng nước'],
    ['Rửa và sát trùng', 'Xà phòng rửa tay và dung dịch rửa tay khô', '4 chai', 'Trước và sau mỗi lần sơ cứu, kể cả khi có đeo găng'],
    ['Băng bó', 'Gạc vô trùng nhiều cỡ', '50 miếng', 'Che vết thương sau khi rửa; đắp lên chỗ chảy máu để ép'],
    ['Băng bó', 'Băng cuộn co giãn', '20 cuộn', 'Giữ gạc tại chỗ, băng ép cầm máu'],
    ['Băng bó', 'Băng dính cá nhân', '100 miếng', 'Vết xước nhỏ, phồng rộp chân sau ngày đi bộ'],
    ['Băng bó', 'Băng tam giác', '6 cái', 'Treo tay, cố định tạm một chi trong lúc chờ chuyển viện'],
    ['Băng bó', 'Kéo đầu tù và nhíp', '2 bộ', 'Cắt băng, gắp dằm nông ở da — không dùng để lấy dị vật cắm sâu'],
    ['Cố định', 'Nẹp cố định chi nhiều cỡ', '4 bộ', 'Nghi gãy xương: giữ nguyên tư thế đang có, không nắn, không kéo thẳng'],
    ['Cố định', 'Cáng cứng và chăn mỏng', '1 bộ', 'Chỉ dùng khi cán bộ y tế chỉ huy di chuyển em bất tỉnh hoặc nghi chấn thương cột sống'],
    ['Nhiệt và nước', 'Túi chườm lạnh dùng nhanh', '20 túi', 'Sưng do va đập; hạ nhiệt vùng cổ, nách, bẹn khi nghi say nắng'],
    ['Nhiệt và nước', 'Gói bù nước và điện giải', '50 gói', 'Mất nước, nôn, tiêu chảy — pha đúng hướng dẫn in trên gói, cán bộ y tế quyết định cho ai uống'],
    ['Nhiệt và nước', 'Nước uống sạch dự phòng ngoài định mức bếp', '20 lít', 'Ngày nắng, hoạt động ngoài trời, và mọi tình huống cấp cứu'],
    ['Nhiệt và nước', 'Chăn giữ ấm hoặc chăn cứu hộ', '6 cái', 'Em ướt, em lạnh run, em vừa được đưa lên khỏi nước'],
    ['Theo dõi', 'Nhiệt kế điện tử', '4 cái', 'Đo ngay khi em kêu mệt, nóng, ớn lạnh — ghi số vào sổ, không đoán bằng tay sờ trán'],
    ['Theo dõi', 'Đèn pin và pin dự phòng', '4 bộ', 'Trực đêm, mất điện, tìm em vắng mặt, soi khi sơ cứu'],
    ['Theo dõi', 'Còi báo động', '4 cái', 'Gọi người tới hỗ trợ khi ở xa khu trung tâm'],
    ['Cấp cứu', 'Bảng số điện thoại khẩn dán mặt trong nắp túi', '1 bảng, in lại cho từng trại', '115 · 114 · 113 · 111, kèm số trạm y tế, bệnh viện và công an sở tại — để không ai phải nhớ số khi đang hoảng'],
    ['Cấp cứu', 'Bản đồ giấy đường tới cơ sở y tế gần nhất', '2 bản', 'Khi mất sóng, khi lái xe không thuộc đường, khi điện thoại hết pin'],
    ['Hồ sơ', 'Sổ ghi sự cố và bút', '1 quyển', 'Ghi ngay tại chỗ, giờ và người chứng kiến — không viết lại từ trí nhớ vào buổi tối'],
    ['Hồ sơ', 'Bảng dị ứng và bệnh nền toàn trại', '3 bản', 'Một bản trong túi y tế, một ở bếp, một ở phòng trực đêm'],
    ['Thuốc riêng', 'Hộp thuốc riêng của từng em, dán tên, kèm đơn bác sĩ', 'Đủ theo số em có đơn', 'Chỉ cán bộ y tế mở và phát, đúng đơn, ghi sổ mỗi lần phát'],
    ['Không được có trong túi', 'Thuốc kê đơn không mang tên em nào, thuốc an thần, thuốc ngủ', '0', 'Không trữ, không mượn của nhau, không phát — kể cả khi phụ huynh dặn miệng qua điện thoại']
  ];

  /* ── 3 · Mười hai quy trình sự cố ──────────────────────────
     Bốn ô mỗi thẻ: dấu hiệu nhận ra · em cần gì ngay · làm theo
     thứ tự này · bẫy thường gặp. Mọi thẻ nghiêm trọng đều kết
     bằng cùng một chuỗi: gọi cấp cứu, đưa tới cơ sở y tế, báo
     gia đình. Không thẻ nào cho phép người phụ trách tự xử tiếp. */
  G.AT_SU_CO = [
    { t: 'Say nắng và sốc nhiệt', mau: '#BE0E16',
      dh: 'Da nóng đỏ, có thể khô hoặc vẫn ướt mồ hôi. Đau đầu, choáng, buồn nôn. Nói lẫn, không nhớ mình đang ở đâu, lơ mơ. Xảy ra sau hoạt động ngoài trời hoặc trong phòng bí gió.',
      can: 'Ra khỏi nắng ngay, hạ nhiệt cơ thể, và được người có chuyên môn đánh giá. Lẫn lộn hoặc lơ mơ là dấu hiệu nặng — đây là cấp cứu.',
      lam: 'Đưa vào chỗ râm mát thoáng gió, cởi bớt lớp áo ngoài. Chườm mát vùng cổ, nách, bẹn; quạt cho em. Nếu em tỉnh táo hoàn toàn thì cho uống nước từng ngụm nhỏ. Gọi cán bộ y tế. *Có lẫn lộn, lơ mơ, nôn hoặc co giật: gọi 115 ngay*, tiếp tục hạ nhiệt trong lúc chờ. Đưa tới cơ sở y tế. Báo gia đình.',
      bay: 'Cho em nghỉ mười phút rồi bảo em quay lại hoạt động. Ép uống nước khi em lơ mơ — dễ sặc. Dội nước đá lên toàn thân. Coi "em chỉ mệt thôi" là kết luận.' },

    { t: 'Mất nước', mau: '#A8801F',
      dh: 'Khát nhiều, môi khô, đi tiểu ít và nước tiểu sẫm, mệt, đau đầu, chóng mặt khi đứng dậy. Thường gặp ở ngày 2 và ngày 3 khi các em còn ngại xin nước giữa buổi.',
      can: 'Bù nước từ từ, nghỉ ở chỗ mát, và có người theo dõi trong ít nhất một giờ.',
      lam: 'Cho ngồi chỗ mát. Uống nước hoặc dung dịch bù điện giải pha đúng hướng dẫn, uống từng ngụm nhỏ, không uống ừng ực. Báo cán bộ y tế và ghi sổ. Theo dõi một giờ. *Nếu nôn liên tục, không uống được, hoặc lơ mơ: gọi 115 và đưa tới cơ sở y tế.* Báo gia đình khi phải rời trại đi khám.',
      bay: 'Chờ em kêu khát mới cho uống. Không tính lượng nước trong lịch hoạt động ngoài trời. Nhầm mất nước với lười — em mệt thật thì không cãi lại được.' },

    { t: 'Ngất và choáng', mau: '#9E470D',
      dh: 'Mặt tái, vã mồ hôi, mắt hoa, rồi khuỵu xuống. Có thể xảy ra khi đứng lâu trong lễ khai mạc, khi đói, khi thấy máu.',
      can: 'Được đặt nằm an toàn ngay và được đánh giá xem còn thở bình thường không.',
      lam: 'Đỡ em nằm xuống chỗ bằng phẳng thoáng, nới cổ áo, kê chân cao hơn thân. Không cho ăn uống gì khi em chưa tỉnh hẳn. Gọi cán bộ y tế. *Nếu không tỉnh lại trong vòng một phút, thở bất thường, có co giật, hoặc ngã đập đầu: gọi 115 ngay và giữ nguyên hiện trạng.* Đưa tới cơ sở y tế. Báo gia đình trong mọi trường hợp có ngất, kể cả khi em tỉnh lại nhanh.',
      bay: 'Xốc em dậy cho tỉnh. Tát, vỗ mặt, xoa dầu vào mũi. Cho uống nước ngay khi mắt vừa mở. Không báo gia đình vì "em tỉnh rồi, không sao".' },

    { t: 'Chấn thương chi, nghi gãy xương', mau: '#9E470D',
      dh: 'Đau nhiều tại một điểm, sưng nhanh, biến dạng, không cử động được, hoặc nghe tiếng rắc lúc ngã. Hay gặp ở trò chơi vận động và ở phiên thể thao tự do chiều.',
      can: 'Không bị di chuyển thêm, được cố định ở nguyên tư thế đang có, và được đưa đi chụp chiếu.',
      lam: 'Dừng hoạt động của cả nhóm. Để em ở nguyên tư thế em thấy đỡ đau nhất. Cố định bằng nẹp hoặc băng tam giác *giữ nguyên tư thế đó*, chườm lạnh qua lớp vải. Gọi cán bộ y tế. Đưa tới cơ sở y tế bằng xe đã bố trí sẵn. Báo gia đình ngay khi đã cố định xong, không chờ có kết quả chụp.',
      bay: 'Nắn cho thẳng lại. Kéo thử xem có gãy không. Bảo em cử động thử. Xoa dầu nóng, bóp rượu thuốc. Chờ tới cuối buổi cho tiện xe.' },

    { t: 'Chảy máu', mau: '#BE0E16',
      dh: 'Máu chảy từ vết cắt, vết rách hoặc vết đâm. Nặng khi máu chảy thành dòng, thấm ướt nhanh qua nhiều lớp gạc, hoặc kèm choáng và da tái lạnh.',
      can: 'Được cầm máu bằng ép trực tiếp, và với vết nặng thì được chuyển viện càng sớm càng tốt.',
      lam: 'Đeo găng. Ép trực tiếp lên vết thương bằng gạc sạch, ép mạnh và *giữ liên tục, không nhấc ra xem*. Gạc thấm đẫm thì đắp thêm lớp mới lên trên. Nâng cao chi nếu làm được mà không tăng đau. Gọi cán bộ y tế. *Máu không cầm được, vết rộng và sâu, hoặc có dị vật cắm vào: gọi 115, không rút dị vật, giữ nguyên hiện trạng.* Đưa tới cơ sở y tế. Báo gia đình.',
      bay: 'Nhấc gạc lên xem đã cầm chưa. Rửa vết thương sâu bằng nước không sạch. Rút vật cắm ra. Buộc garo khi chưa được huấn luyện. Sơ cứu bằng tay trần.' },

    { t: 'Dị ứng thức ăn và phản ứng nặng', mau: '#BE0E16',
      dh: 'Nổi mẩn, ngứa, sưng môi hoặc mí mắt, đau bụng, nôn sau khi ăn. *Dấu hiệu nguy kịch: sưng lưỡi hoặc cổ họng, khó thở, thở rít, giọng khàn, nói không ra tiếng, choáng.*',
      can: 'Dừng ăn ngay, gọi cấp cứu nếu có bất kỳ dấu hiệu nguy kịch nào, và dùng đúng thuốc bác sĩ đã kê riêng cho em nếu gia đình có gửi.',
      lam: 'Dừng bữa ăn của em ngay, giữ lại phần thức ăn để biết em đã ăn gì. Gọi cán bộ y tế lập tức. *Có bất kỳ dấu hiệu khó thở, sưng họng hoặc choáng: gọi 115 ngay, cùng lúc.* Nếu gia đình đã khai tiền sử và đã gửi thuốc cấp cứu bác sĩ kê riêng cho em, chỉ cán bộ y tế dùng, đúng đơn kèm theo. Cho em nằm yên, không để em đi lại. Đưa tới cơ sở y tế kể cả khi triệu chứng đỡ. Báo gia đình.',
      bay: 'Chờ xem có nặng lên không. Cho em uống thuốc dị ứng của bạn khác hoặc của người lớn. Cho em tự đi bộ tới phòng y tế. Bếp nấu chung nồi, chung dụng cụ với món có chất em dị ứng.' },

    { t: 'Đau bụng cấp', mau: '#9E470D',
      dh: 'Đau bụng dữ dội hoặc đau tăng dần, đau khu trú một chỗ, bụng cứng, nôn, sốt, không dám duỗi chân. Đau kéo dài quá một giờ và không đỡ khi nghỉ.',
      can: 'Được bác sĩ khám. Đau bụng cấp ở trẻ là thứ chỉ cơ sở y tế mới loại trừ được.',
      lam: 'Cho em nằm nghỉ ở tư thế em thấy dễ chịu nhất. *Không cho ăn, không cho uống, không cho bất kỳ thuốc giảm đau nào.* Ghi giờ bắt đầu đau và vị trí đau. Gọi cán bộ y tế. Đau dữ dội, bụng cứng, nôn nhiều hoặc có sốt: đưa tới cơ sở y tế ngay, gọi 115 nếu em không đi lại được. Báo gia đình.',
      bay: 'Cho thuốc giảm đau — thuốc làm mờ dấu hiệu và làm bác sĩ chẩn đoán chậm hơn. Chườm nóng. Xoa bụng. Cho ăn cháo cho ấm bụng. Nghĩ em giả vờ để trốn hoạt động.' },

    { t: 'Hoảng loạn và khủng hoảng cảm xúc', mau: '#5140B4',
      dh: 'Thở gấp, run, khóc không dừng, nói mình sắp chết, ôm ngực. Hoặc ngược lại: im lặng hoàn toàn, không phản ứng. Hay bùng ra ở phiên vòng tròn tối và ở phiên chia sẻ sâu, khi một em chạm phải chuyện thật của mình.',
      can: 'Một chỗ yên tĩnh, một người lớn ở cạnh, và thời gian. Không cần đám đông, không cần lời khuyên.',
      lam: 'Tách em khỏi đám đông nhưng *không đưa vào phòng kín một mình với một người lớn* — ra chỗ mở, có người thứ hai trong tầm nhìn. Hạ giọng, nói câu ngắn, gọi tên em. Không hỏi dồn. Ngồi cùng cho tới khi nhịp thở chậm lại. Gọi cán bộ y tế. Ghi sổ sự cố. Báo gia đình trong ngày. *Nếu em nói tới ý định tự làm hại mình, hoặc kể ra một chuyện bị xâm hại: chuyển sang G.AT_TO_GIAC và mức báo động ĐỎ ngay, không tự xử.*',
      bay: 'Bảo em bình tĩnh lại. Nói "có gì đâu mà khóc". Gọi cả đội tới xem. Ép em kể tiếp cho hết. Coi đó là chuyện riêng và không ghi sổ.' },

    { t: 'Học viên đi lạc hoặc vắng mặt khi điểm danh', mau: '#BE0E16',
      dh: 'Thiếu một em ở bất kỳ lần điểm danh nào, hoặc không ai thấy em trong mười lăm phút. Điểm danh bắt buộc: đầu và cuối mỗi phiên, trước và sau mỗi lần di chuyển, trước giờ ngủ và sau giờ báo thức.',
      can: 'Cả trại dừng lại và tìm ngay. Thời gian là thứ duy nhất quan trọng ở đây.',
      lam: 'Hô báo động, *dừng toàn bộ chương trình*. Điểm danh lại toàn trại tại chỗ để chắc chắn chỉ thiếu một em và biết còn thiếu ai nữa. Chia người theo bản đồ khảo sát D-30: nguồn nước hở trước, rồi cổng ra, rồi khu ngủ, rồi chỗ tối. Giữ một người ở điểm tập kết và một người ở cổng. *Không tìm thấy trong 15 phút: gọi 113 và gọi gia đình.* Ghi mốc giờ từng bước. Không tự đi tìm lan ra ngoài khuôn viên trước khi báo công an.',
      bay: 'Tìm thêm mười phút nữa rồi hãy báo. Không muốn báo vì sợ mang tiếng. Giấu gia đình cho tới khi tìm thấy. Cho các đội tự tản đi tìm — thành ra thiếu thêm người.' },

    { t: 'Tai nạn dưới nước', mau: '#BE0E16',
      dh: 'Một em chìm, sặc nước, hoặc mất hút khỏi tầm nhìn ở hồ bơi, ao, suối, bể. Người đuối nước thật thường KHÔNG kêu cứu và không vùng vẫy ồn ào.',
      can: 'Được đưa lên bờ an toàn và được đưa đi khám, kể cả khi lên bờ vẫn tỉnh và nói bình thường.',
      lam: 'Hô to, chỉ tay vào vị trí em, không rời mắt. Ném phao, dây, sào — *không ai nhảy xuống nếu không phải người cứu hộ được huấn luyện*. Gọi 115 ngay khi thấy em chìm, không chờ xem kết quả. Đưa lên bờ, giữ ấm, để nằm nghiêng nếu em nôn. Cán bộ y tế đánh giá. *Mọi em từng chìm dưới nước đều phải đưa tới cơ sở y tế, kể cả khi tỉnh táo hoàn toàn.* Báo gia đình. Dừng toàn bộ hoạt động dưới nước của trại cho tới khi rà xong.',
      bay: 'Nhảy xuống cứu bằng tay không — cách nhanh nhất để có hai người đuối thay vì một. Dốc ngược em cho ra nước. Cho em nghỉ rồi tiếp tục chơi vì "em nói không sao". Không báo gia đình vì em đã lên bờ.' },

    { t: 'Hoả hoạn', mau: '#BE0E16',
      dh: 'Khói, mùi khét, chuông báo cháy, hoặc lửa bùng. Hai chỗ rủi ro cao nhất của trại: khu bếp và nghi thức lửa trại Ngày 7.',
      can: 'Ra khỏi toà nhà theo đường đã tập, và được đếm đủ đầu người ở điểm tập kết.',
      lam: 'Hô báo động và kéo còi. Sơ tán theo đúng đường thoát đã diễn tập, đi hàng, không chạy, không quay lại lấy đồ. Gọi 114. Điểm danh tại điểm tập kết theo danh sách đội, báo ngay số người còn thiếu cho lực lượng chữa cháy. Chỉ dùng bình chữa cháy với đám cháy rất nhỏ và chỉ khi đường thoát của mình còn mở. Báo gia đình sau khi đã đếm đủ người. Ghi biên bản.',
      bay: 'Quay lại lấy điện thoại, ba lô, giấy tờ. Dập lửa trước khi đếm người. Sơ tán mà không mang danh sách đội. Đốt lửa trại khi trời gió mà không có nước và cát sẵn bên cạnh.' },

    { t: 'Xung đột bạo lực giữa học viên', mau: '#185AB4',
      dh: 'Xô đẩy, đánh nhau, dồn ép một em, trêu chọc ác ý kéo dài, hoặc một nhóm cô lập một bạn. Rủi ro cao ở Ngày 4 phần sân khấu và Ngày 6 phần diễn tập đội, khi áp lực nhóm lên cao.',
      can: 'Được tách ra ngay và được người lớn đứng giữa. Không đội nào tự xử lý tiếp việc này.',
      lam: 'Tách hai bên ra hai chỗ khác nhau, mỗi bên có một người lớn. Kiểm tra thương tích trước khi nói bất cứ chuyện gì khác; có thương tích thì chuyển sang quy trình chảy máu hoặc chấn thương chi. Nghe từng bên riêng, ghi lại nguyên văn. Trưởng trại quyết. Báo *cả hai gia đình trong 24 giờ*, theo đúng cấp 3 của G.TC_KHUNG_HOANG. Ghi sổ sự cố. Rà lại thiết kế hoạt động đã tạo ra áp lực đó.',
      bay: 'Bắt hai em bắt tay làm hoà ngay tại chỗ rồi coi như xong. Xử trước đám đông. Chỉ báo gia đình của em bị đánh. Coi là chuyện trẻ con. Để đội tự giải quyết vì "đang học làm lãnh đạo".' }
  ];

  /* ── 4 · Ba mức báo động ───────────────────────────────────
     Ai được quyết ở mức nào. Nghi ngờ mức nào thì xử theo mức CAO
     HƠN — nhầm lên một mức tốn công, nhầm xuống một mức mất em.
     Ba mức này nối vào năm cấp khủng hoảng của G.TC_KHUNG_HOANG:
     ĐỎ trong trại luôn tương đương cấp 3 trở lên. */
  G.AT_MUC_BAO_DONG = [
    { m: 'VÀNG', t: 'Xử tại chỗ, chương trình chạy tiếp',
      quyen: 'HLV trực đội quyết. Cán bộ y tế xem trong ca. Không cần dừng chương trình.',
      ho: 'Ghi sổ sự cố trong ngày. Trưởng ban an toàn đọc sổ mỗi tối 22h00. Báo gia đình nếu em phải rời hoạt động quá một phiên.',
      bang: 'Xước nhẹ, phồng rộp chân, đau đầu nhẹ, mệt do nắng nhưng tỉnh táo hoàn toàn, tị nạnh trong đội chưa thành xung đột.' },
    { m: 'CAM', t: 'Dừng hoạt động của một đội, Trưởng trại vào cuộc',
      quyen: 'Trưởng trại quyết, sau khi nghe cán bộ y tế. HLV không tự quyết ở mức này.',
      ho: 'Cán bộ y tế đánh giá trực tiếp. Xe và lái xe vào tư thế sẵn sàng. Biên bản trong 24 giờ. Báo gia đình *trước khi hết ngày*, không chờ tới lúc đón con.',
      bang: 'Nghi gãy xương, chảy máu cần băng ép, nôn nhiều, sốt, đau bụng cấp, khủng hoảng cảm xúc phải rời phiên, xung đột có xô đẩy.' },
    { m: 'ĐỎ', t: 'Dừng toàn trại, gọi cấp cứu, chuyển tuyến',
      quyen: 'Bất kỳ ai phát hiện cũng ĐƯỢC QUYỀN hô mức đỏ và gọi 115 — không phải xin phép ai. Không ai được hạ mức đỏ xuống, kể cả Trưởng trại.',
      ho: 'Gọi 115 hoặc 114 hoặc 113 tuỳ loại. Đưa tới cơ sở y tế. Báo gia đình ngay lập tức. Báo Giám đốc điều hành trong ngày. Một người phát ngôn duy nhất theo G.TC_24H. Trại không chạy tiếp cho tới khi Trưởng trại và cán bộ y tế cùng ký cho chạy lại.',
      bang: 'Bất tỉnh, khó thở, sưng họng, co giật, chảy máu không cầm được, tai nạn dưới nước, hoả hoạn, một em vắng mặt quá 15 phút, hoặc bất kỳ dấu hiệu nào của mười luật bảo vệ trẻ trong G.TC_BAO_VE.' }
  ];

  /* ── 5 · Nước và đêm ───────────────────────────────────────
     Hai vùng rủi ro cao nhất của mọi trại thiếu niên. Phần lớn tai
     nạn chết người ở trại rơi vào một trong hai vùng này. Mọi điều
     dưới đây áp dụng cả khi cơ sở lưu trú nói là họ đã lo. */
  G.AT_NUOC_VA_DEM = [
    'Không có hoạt động dưới nước nào nếu không có ít nhất một người cứu hộ có chứng chỉ còn hạn, đứng riêng, *không kiêm dẫn trò chơi*. Không có người đó thì bỏ hoạt động, không thay bằng "HLV bơi giỏi".',
    'Tỉ lệ dưới nước là 1 người lớn / 5 học viên, và người lớn đứng ở bờ nhìn xuống, không cùng chơi dưới nước.',
    'Mọi học viên khai không biết bơi đều đeo áo phao, kể cả ở chỗ nước nông tới thắt lưng. Không dùng lời khai của chính em làm căn cứ duy nhất — lấy từ phiếu sức khoẻ có chữ ký người giám hộ.',
    'Chia cặp bạn giám sát: hai em một cặp, cứ mười phút còi một lần, mỗi em phải nắm tay bạn cặp giơ lên. Thiếu một tay giơ là báo động ngay.',
    'Đếm đầu người trước khi xuống nước, giữa buổi, và ngay khi lên bờ. Ba con số phải bằng nhau; lệch một là dừng tất cả.',
    'Không hoạt động dưới nước sau khi trời tối, không khi trời có sấm, không khi nước đục không nhìn thấy đáy, không ở đoạn suối hoặc sông chưa được khảo sát ở D-30.',
    'Không ai được bơi ngoài giờ có tổ chức, kể cả người lớn. Nguồn nước hở trong khuôn viên phải có rào hoặc có người trực suốt thời gian trại.',
    'Sau mỗi buổi dưới nước, cán bộ y tế hỏi lại từng em có sặc nước không. Em nào có thì theo dõi và báo gia đình, dù em nói mình bình thường.',
    'Ban đêm mỗi khu ngủ luôn có ít nhất *hai* người lớn thức trực, và hai người này không cùng một phòng với nhau. Ca trực dài tối đa bốn giờ; người vừa dẫn cả ngày không nhận ca đêm đầu.',
    'Đi tuần đêm luôn đi hai người, có đèn pin, theo vòng cố định, ghi giờ vào sổ trực mỗi vòng. Vòng tuần bắt buộc đi qua: khu vệ sinh, lối thoát hiểm, cổng ra, và nguồn nước hở.',
    'Điểm danh trước giờ ngủ và ngay sau giờ báo thức, đếm bằng mắt từng giường, không đếm bằng cách hỏi trưởng phòng.',
    'Cửa khu ngủ không được khoá từ bên ngoài trong bất kỳ trường hợp nào. Lối thoát hiểm phải sáng đèn suốt đêm.',
    'Em nào ốm trong đêm thì đưa tới phòng y tế, có hai người lớn đi cùng, không để em tự đi và không để một người lớn đưa đi một mình.',
    'Em nào ra khỏi phòng ban đêm phải báo người trực. Không cấm em đi vệ sinh; điều cần là người trực biết em ra và biết em đã về.',
    'Không có hoạt động chương trình nào sau 22h00. Trò chơi đêm, thử thách đêm, thức trắng để "rèn ý chí" — không nằm trong thiết kế này, và không được thêm vào tại chỗ.',
    'Điện thoại của học viên do ban tổ chức giữ theo luật trại, nhưng phải có ít nhất một số hotline trực 24 giờ mà em thuộc lòng hoặc dán trong phòng, để em gọi được cho người lớn của trại từ bất cứ đâu trong khuôn viên.'
  ];

  /* ── 6 · Ranh giới người lớn với trẻ trong môi trường ngủ lại
     Mười luật bảo vệ trẻ ở G.TC_BAO_VE vẫn áp dụng nguyên vẹn.
     Phần dưới đây KHÔNG chép lại mười luật đó — nó chỉ thêm phần
     riêng của việc ở lại qua đêm, là môi trường mà kho cũ chưa
     viết tới. Đọc cả hai, không đọc thay. */
  G.AT_RANH_GIOI = [
    '*Không bao giờ một người lớn ở riêng với một trẻ* — nguyên tắc gốc của G.TC_BAO_VE, ở trại có nghĩa cụ thể là: mọi cuộc nói chuyện riêng diễn ra ở nơi có người thứ hai nhìn thấy, kể cả lúc 2 giờ sáng, kể cả khi em đang khóc.',
    'Người lớn không ngủ trong cùng phòng với học viên. Người trực có chỗ nằm riêng ngay cạnh khu ngủ, cửa mở, nhìn ra hành lang.',
    'Người lớn không vào phòng ngủ của học viên một mình. Vào phòng luôn đi hai người, gõ cửa, xưng tên, bật đèn.',
    'Khu ngủ chia theo giới. Người lớn trực khu nào thì cùng giới với học viên khu đó. Cần vào khu khác giới thì đi cùng một người lớn của khu đó.',
    'Nhà vệ sinh và nhà tắm: người lớn không vào khi bên trong có học viên. Người lớn đứng ngoài cửa, đếm em vào và đếm em ra. Có sự cố bên trong thì gọi thêm người rồi mới vào, không vào một mình.',
    'Không dùng chung nhà vệ sinh và nhà tắm giữa người lớn và học viên. Nếu cơ sở chỉ có một khu thì chia khung giờ riêng và có người canh giờ.',
    'Không thiết bị ghi hình nào trong khu ngủ, khu vệ sinh, khu thay đồ — kể cả camera an ninh của cơ sở lưu trú. Kiểm việc này ở buổi khảo sát D-30 và yêu cầu cơ sở tắt bằng văn bản.',
    'Chụp ảnh trại chỉ ở khu hoạt động chung, chỉ bằng máy của ban tổ chức, chỉ do người được phân công. Người lớn không chụp học viên bằng điện thoại cá nhân. Ảnh chuyển về kho chung cuối mỗi ngày, không lưu lại trên máy cá nhân.',
    'Không đăng ảnh có mặt học viên khi chưa có đồng thuận văn bản của người giám hộ, và không đăng ảnh trong lúc trại đang chạy — đăng ảnh trực tiếp là nói cho người lạ biết chính xác con đang ở đâu, lúc nào.',
    'Tiếp xúc thân thể ở trại chỉ có ba trường hợp: sơ cứu, ngăn một em khỏi nguy hiểm ngay trước mắt, và cái ôm do chính em chủ động ở nơi có người khác nhìn thấy. Không xoa lưng dỗ ngủ, không ngồi lên đùi, không nằm chung giường, không chung túi ngủ.',
    'Không nhắn tin riêng, không kết bạn mạng xã hội, không cho số riêng cho học viên trong và sau trại. Khoảnh khắc chia tay có mục đổi liên lạc giữa các em với nhau; điều đó không mở đường cho người lớn xin liên lạc riêng của trẻ.',
    'Người lớn không tặng quà riêng, không cho tiền, không ưu ái riêng một em, không hứa hẹn riêng. "Chuyện này giữa hai thầy trò mình thôi" là câu bị cấm tuyệt đối ở trại — không có bí mật giữa một người lớn và một trẻ.',
    'Người lớn không uống rượu bia trong suốt bảy ngày trại, kể cả khi hết ca, kể cả ở ngoài khuôn viên. Ai vi phạm rời trại ngay trong đêm.',
    'Hỗ trợ viên là học viên cũ — "Leader Boom thế hệ 2" — KHÔNG được tính là người lớn trực, không nhận ca đêm, không ở riêng với học viên nhỏ tuổi hơn. Các em ấy vẫn là trẻ và vẫn được hệ bảo vệ như trẻ.',
    'Người của cơ sở lưu trú, nhân viên bếp, lái xe, khách tới thăm: không vào khu ngủ, không tiếp xúc riêng với học viên, luôn có người của trại đi cùng. Mọi người lạ vào khuôn viên đều phải ghi sổ ra vào.',
    'Nghi ngờ một người lớn vượt ranh giới: *đình chỉ trước, điều tra sau*, đúng như G.TC_BAO_VE. Ở trại, đình chỉ nghĩa là người đó rời khuôn viên trong đêm và có người thay ngay — không có chuyện "để hết trại rồi tính".'
  ];

  /* ── 7 · Nhận và xử lý tố giác trong thời gian trại ────────
     Kho cũ đã có quy trình chuyển tuyến chung. Phần này chỉ nói
     riêng bảy ngày trại: khi trẻ ở xa nhà, người nhận tố giác ở
     ngay bên cạnh, và mọi thứ phải chạy trong vài giờ chứ không
     phải vài ngày. */
  G.AT_TO_GIAC = [
    { v: '1', t: 'Có người nhận tố giác, công khai từ ngày đầu',
      dk: 'Hai người được chỉ định, một nam một nữ, ảnh và tên dán ở khu sinh hoạt chung và nhắc miệng ở lễ khai mạc. Cả hai không phải người trực tiếp chấm điểm hay xếp hạng đội nào.',
      duoc: 'Học viên biết đích danh mình nói với ai, không phải đoán. Kiểm định yêu cầu "có người nhận tố giác công khai" — đây là chỗ đáp ứng.',
      bac: 'Người nhận tố giác kiêm luôn vai chấm điểm thì trẻ sẽ cân nhắc thiệt hơn trước khi mở miệng.' },
    { v: '2', t: 'Nghe, không điều tra',
      dk: 'Nghe ở chỗ yên tĩnh nhưng có người thứ hai trong tầm nhìn. Không hỏi dồn, không hỏi gợi ý, không hỏi "có đúng là bạn ấy đã…". Để em kể theo cách của em.',
      duoc: 'Lời kể giữ nguyên giá trị. Hỏi gợi ý là cách làm hỏng chính bằng chứng mình đang cần.',
      bac: 'Người lớn hỏi thêm cho rõ với ý tốt vẫn làm hỏng lời khai. Việc điều tra thuộc về cơ quan có thẩm quyền, không thuộc về trại.' },
    { v: '3', t: 'Ghi nguyên văn trong vòng một giờ',
      dk: 'Ghi đúng chữ em dùng, đặt trong ngoặc kép. Ghi giờ, nơi, ai có mặt. Không diễn giải, không tóm tắt lại cho gọn, không phán đoán.',
      duoc: 'Một biên bản dùng được về sau, thay vì một trí nhớ đã bị sửa qua ba lần kể lại.',
      bac: 'Ghi vào buổi tối cho tiện là đã muộn. Chi tiết mất đi trong ba giờ đầu không lấy lại được.' },
    { v: '4', t: 'Bảo vệ em ngay, trước khi làm gì khác',
      dk: 'Tách em khỏi người bị nêu tên, đổi phòng nếu cần, sắp người lớn tin cậy ở gần. Nếu người bị nêu tên là người của trại: người đó rời khuôn viên trong đêm.',
      duoc: 'Em không phải ngủ cùng khu với nguồn nguy hiểm thêm một đêm nào.',
      bac: 'Chờ xác minh rồi mới tách là đặt thủ tục lên trên đứa trẻ. Đình chỉ trước, điều tra sau — không có ngoại lệ vì thâm niên hay vì trại đang giữa chừng.' },
    { v: '5', t: 'Hô mức ĐỎ và báo lên trong ngày',
      dk: 'Trưởng trại và Giám đốc điều hành biết trong ngày, không qua trung gian nào khác. Chuyển tuyến theo quy trình của Học viện; gọi 111 khi cần tư vấn, gọi 113 khi có dấu hiệu tội phạm.',
      duoc: 'Việc ra khỏi phạm vi tự xử của trại và vào đúng nơi có thẩm quyền.',
      bac: 'Không hoà giải nội bộ. Không thoả thuận riêng với gia đình. Không hứa với em là "để cô xử lý nội bộ cho".' },
    { v: '6', t: 'Báo người giám hộ, trừ đúng một trường hợp',
      dk: 'Báo trong ngày. *Ngoại lệ duy nhất: khi chính người trong gia đình là người bị nêu tên* — khi đó báo cơ quan có thẩm quyền trước, và làm theo hướng dẫn của họ về việc báo gia đình.',
      duoc: 'Gia đình biết sớm, và đứa trẻ không bị trả về đúng chỗ nguy hiểm.',
      bac: 'Đây là ngoại lệ dễ làm sai nhất. Không ai ở trại tự quyết một mình việc này — hỏi Giám đốc điều hành và hỏi 111.' },
    { v: '7', t: 'Nói lại với em là đã làm gì',
      dk: 'Trong 24 giờ, bằng lời em hiểu được: đã báo cho ai, chuyện gì sẽ xảy ra tiếp, ai sẽ ở cạnh em. Không hứa điều mình không giữ được, kể cả lời hứa giữ bí mật.',
      duoc: 'Em thấy nói ra là có tác dụng. Đó là điều quyết định em có nói lần sau hay không.',
      bac: 'Im lặng sau khi trẻ đã dám nói là cách chắc chắn nhất để đứa trẻ tiếp theo không nói gì.' },
    { v: '8', t: 'Ghi sổ và sinh ra một luật mới',
      dk: 'Vào sổ sự cố của trại, và vào sổ ghi lỗi công khai G.TC_SO_LOI theo đúng cách của kho đó: không ghi tên trẻ, không ghi chi tiết đủ để nhận ra một gia đình.',
      duoc: 'Sự việc để lại một điều luật, không chỉ để lại một hồ sơ.',
      bac: 'Sự cố không sinh ra luật mới thì sẽ lặp lại ở trại năm sau, với một đứa trẻ khác.' }
  ];

  /* ── 8 · Bộ hồ sơ bắt buộc ─────────────────────────────────
     Cột: mã · hồ sơ · ai ký · ai giữ · lưu bao lâu.
     Thời hạn lưu ở đây là mức kho này đặt theo thông lệ, KHÔNG
     trích từ văn bản pháp luật nào. Bộ phận pháp chế phải đối
     chiếu với quy định hiện hành trước khi chốt. Thiếu một dòng
     trong bảng này thì rơi thẳng vào G.AT_KHONG_CHAY. */
  G.AT_HO_SO = [
    ['AT-01', 'Phiếu khai sức khoẻ và bệnh nền của từng học viên', 'Người giám hộ', 'Cán bộ y tế trại, bản gốc về hồ sơ học viên sau trại', '3 năm sau trại'],
    ['AT-02', 'Bảng dị ứng thức ăn và dị ứng thuốc toàn trại', 'Cán bộ y tế trại lập, bếp trưởng ký nhận', 'Túi y tế · bếp · phòng trực đêm', '3 năm sau trại'],
    ['AT-03', 'Đồng thuận cho con tham gia trại ở lại qua đêm', 'Người giám hộ', 'Bộ phận hành chính', '5 năm sau trại'],
    ['AT-04', 'Đồng thuận cho phép trại đưa con đi cấp cứu khi không liên lạc được', 'Người giám hộ', 'Trưởng trại mang theo bản sao suốt trại', '5 năm sau trại'],
    ['AT-05', 'Đồng thuận hình ảnh, có ô chọn từng mục, rút được bất cứ lúc nào', 'Người giám hộ', 'Sổ đồng thuận của Học viện', 'Cho tới khi bị rút, tối đa 3 năm'],
    ['AT-06', 'Danh sách liên hệ khẩn cấp, hai số cho mỗi em, đã gọi thử', 'Ban tổ chức trại lập, người giám hộ xác nhận', 'Trưởng trại và phòng trực đêm', '1 năm sau trại'],
    ['AT-07', 'Hợp đồng bảo hiểm tai nạn cho học viên và nhân sự', 'Bộ phận hành chính và bên bảo hiểm', 'Bộ phận hành chính', 'Theo thời hạn hợp đồng, tối thiểu 5 năm'],
    ['AT-08', 'Lý lịch tư pháp còn hạn của mọi người lớn có mặt trong khuôn viên', 'Chính người đó nộp', 'Hồ sơ nhân sự', 'Làm mới 3 năm một lần, theo G.TC_PHAP_LY'],
    ['AT-09', 'Chứng chỉ hành nghề của cán bộ y tế trực trại', 'Cán bộ y tế nộp bản sao', 'Bộ phận hành chính', 'Theo hạn chứng chỉ'],
    ['AT-10', 'Chứng chỉ cứu hộ còn hạn của người phụ trách hoạt động dưới nước', 'Người cứu hộ nộp bản sao', 'Trưởng ban an toàn', 'Theo hạn chứng chỉ'],
    ['AT-11', 'Cam kết tuân thủ ranh giới với trẻ, ký từng người trước ngày đi', 'Từng người lớn tham gia trại', 'Hồ sơ nhân sự', '5 năm sau trại'],
    ['AT-12', 'Biên bản khảo sát địa điểm và bản đồ rủi ro tại chỗ', 'Trưởng ban an toàn và đại diện cơ sở lưu trú', 'Trưởng ban an toàn', '3 năm, dùng lại làm nền cho trại sau'],
    ['AT-13', 'Phương án y tế: cơ sở y tế gần nhất, tuyến đường, số phút thật, số điện thoại', 'Trưởng ban hậu cần', 'Túi y tế và Trưởng trại, mỗi người một bản giấy', 'Lập mới cho từng trại'],
    ['AT-14', 'Bảng ca trực và tỉ lệ người lớn trên trẻ theo từng khung giờ', 'Trưởng trại', 'Dán tại phòng trực', '1 năm sau trại'],
    ['AT-15', 'Biên bản bàn giao thuốc riêng của từng em', 'Người giám hộ và cán bộ y tế', 'Cán bộ y tế trại', '3 năm sau trại'],
    ['AT-16', 'Sổ sự cố của trại, ghi tại chỗ, có giờ và người chứng kiến', 'Người ghi ký từng mục', 'Trưởng ban an toàn, nộp Giám đốc điều hành sau trại', 'Lưu vĩnh viễn'],
    ['AT-17', 'Sổ ra vào của người ngoài trong thời gian trại', 'Người trực cổng', 'Trưởng ban an toàn', '1 năm sau trại'],
    ['AT-18', 'Biên bản tập huấn an toàn D-14, có điểm danh và chữ ký', 'Toàn bộ nhân sự tham gia', 'Trưởng ban an toàn', '3 năm — là bằng chứng diễn tập cho kỳ kiểm định'],
    ['AT-19', 'Báo cáo an toàn sau trại: việc đã xảy ra, việc suýt xảy ra, luật mới sinh ra', 'Trưởng ban an toàn và Trưởng trại', 'Giám đốc điều hành, đọc trong họp tháng', 'Lưu vĩnh viễn']
  ];

  /* ── 9 · Thiếu một điều là không mở trại ───────────────────
     Đây không phải danh sách mong muốn. Thiếu MỘT dòng thôi thì
     trại hoãn, dù đã thu tiền, dù đã đặt xe, dù phụ huynh đã xin
     nghỉ phép. Hoãn một trại tốn tiền; chạy một trại thiếu an
     toàn có thể tốn một đứa trẻ. */
  G.AT_KHONG_CHAY = [
    'Không có cán bộ y tế có chứng chỉ hành nghề ở lại trại suốt bảy ngày và cả đêm.',
    'Không đủ tỉ lệ người lớn trên trẻ ở bất kỳ khung giờ nào trong bảng ca trực — kể cả một khung giờ duy nhất, kể cả vì một người báo ốm sát ngày.',
    'Còn một người lớn nào sẽ ở trong khuôn viên mà chưa nộp lý lịch tư pháp còn hạn — kể cả lái xe, nhân viên bếp, người của cơ sở lưu trú.',
    'Chưa mua xong bảo hiểm tai nạn cho toàn bộ học viên và nhân sự, đủ cả thời gian đi lại hai chiều.',
    'Còn một em nào thiếu phiếu khai sức khoẻ, hoặc thiếu đồng thuận của người giám hộ, hoặc thiếu hai số liên hệ khẩn cấp đã gọi thử.',
    'Chưa có bảng dị ứng thức ăn và dị ứng thuốc toàn trại, hoặc bếp chưa ký nhận bảng đó.',
    'Chưa xác định được cơ sở y tế gần nhất còn trực 24 giờ, hoặc chưa đi thử tuyến đường và chưa biết số phút thật.',
    'Không có xe và lái xe túc trực riêng cho việc chuyển viện suốt bảy ngày.',
    'Túi y tế chưa kiểm theo danh mục, hoặc còn món hết hạn, hoặc thiếu bảng số điện thoại khẩn dán trong nắp.',
    'Khu ngủ không bố trí được ít nhất hai người lớn thức trực mỗi đêm, hoặc cửa khu ngủ bị khoá từ bên ngoài, hoặc lối thoát hiểm không sáng đèn.',
    'Chưa chỉ định và chưa công khai hai người nhận tố giác, hoặc toàn đội chưa ký cam kết ranh giới với trẻ.',
    'Có hoạt động dưới nước trong chương trình mà không có người cứu hộ chứng chỉ còn hạn đứng riêng — trường hợp này bỏ hoạt động thì trại vẫn chạy được, nhưng giữ hoạt động thì không.',
    'Chưa tập huấn an toàn cho toàn đội, hoặc có người tham gia trại chưa dự và chưa được tập bù.',
    'Có một vi phạm an toàn trẻ em từ trại trước hoặc kỳ kiểm định trước chưa xử lý xong — theo G.NQ_KIEM_DINH, phần an toàn trẻ em bằng không thì cả kỳ kiểm định không đạt, bất kể tổng điểm.'
  ];

  /* ── 10 · Mười tám luật an toàn ────────────────────────────
     Đọc trước mỗi trại. Ký từng người. Luật nào không hiểu thì
     hỏi trước ngày đi, không hỏi giữa lúc có chuyện. */
  G.AT_LUAT_TRAI = [
    'An toàn đứng trước chương trình. Bỏ một phiên vì lý do an toàn không phải là thất bại của người dẫn — *chạy tiếp một phiên không an toàn mới là*.',
    'Bất kỳ ai cũng được quyền hô dừng và gọi 115, kể cả người mới nhất trong đội. Không ai bị trách vì hô nhầm; người bị trách là người thấy mà không hô.',
    'Nghi ngờ ở mức nào thì xử theo mức cao hơn. Nhầm lên tốn công, nhầm xuống mất em.',
    'Điểm danh là việc thiêng liêng của trại: đầu và cuối mỗi phiên, trước và sau mỗi lần di chuyển, trước giờ ngủ, sau giờ báo thức. Đếm bằng mắt từng người, không hỏi vọng.',
    'Không đứa trẻ nào ở một mình. Không người lớn nào ở riêng với một đứa trẻ. Hai câu này là nền của mọi thứ còn lại.',
    'Với mọi sự cố nghiêm trọng, quy trình chỉ có một cái kết: gọi cấp cứu, đưa tới cơ sở y tế, báo gia đình. Người phụ trách trại không tự xử tới cùng, dù có tự tin tới đâu.',
    'Chỉ cán bộ y tế có chứng chỉ mới được quyết định về thuốc. HLV không phát thuốc, không cho mượn thuốc, không gợi ý thuốc — kể cả thuốc thông thường, kể cả khi phụ huynh dặn qua điện thoại.',
    'Báo gia đình sớm và báo bằng sự thật. Gọi ngay khi đã ổn định được tình hình, không chờ tới khi biết đủ mọi thứ, không để gia đình biết qua người khác.',
    'Ghi sổ ngay tại chỗ, có giờ, có tên người chứng kiến. Ghi lại vào buổi tối từ trí nhớ là đã làm hỏng hồ sơ.',
    'Ghi cả việc *suýt* xảy ra. Một lần suýt là một lần được cảnh báo miễn phí; bỏ qua nó là chờ lần sau không còn chữ suýt.',
    'Nghi ngờ một người lớn vi phạm ranh giới: đình chỉ trước, điều tra sau, người đó rời khuôn viên trong đêm. Không có ngoại lệ vì thâm niên, vì chức vụ, vì trại đang giữa chừng.',
    'Không hoà giải nội bộ chuyện xâm hại và bạo hành. Không thoả thuận riêng với gia đình. Không hứa với trẻ là sẽ giữ bí mật.',
    'Kỷ luật ở trại không bao giờ đi qua thân thể và không bao giờ đi qua sự xấu hổ trước đám đông. Không phạt chạy vòng sân, không bắt đứng riêng cho cả trại nhìn, không bỏ bữa, không phạt bằng cách cắt giấc ngủ.',
    'Học viên được quyền dừng bất kỳ hoạt động nào vì lý do sức khoẻ — điều này đã ghi trong chính Phiếu A của trại, và HLV phải tôn trọng ngay, không hỏi lại, không thuyết phục thêm.',
    'Không thêm hoạt động vào chương trình tại chỗ. Mọi hoạt động đều phải qua khảo sát rủi ro trước ngày đi. Ý hay nghĩ ra lúc 21 giờ là ý chưa được kiểm.',
    'Người lớn mệt là người lớn nguy hiểm. Ca trực đêm tối đa bốn giờ, và người vừa dẫn cả ngày không nhận ca đêm đầu.',
    'Nước và đêm là hai vùng phải có luật riêng và có người riêng. Không gộp hai vùng này vào phần trách nhiệm chung của cả đội.',
    'Sau trại, mọi sự cố và mọi việc suýt xảy ra phải sinh ra một dòng luật mới trong kho này. Sự cố không sinh ra luật thì sẽ lặp lại ở trại năm sau, với một đứa trẻ khác.'
  ];

})(window.GV = window.GV || {});
