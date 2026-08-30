/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT · NGHỀ COACH — TUYỂN, DỰ GIỜ, GIỮ CHUẨN NGHỀ
   BIÊN SOẠN MỚI — chưa có trong kho gốc ở mức chi tiết.
   Cần Hội đồng Chuyên môn duyệt, và phần xác minh lý lịch cần rà
   theo quy định hiện hành.

   Kho gốc đã có phần khung: nghề Coach sáu bậc và bảy năng lực
   K1–K7 (GV.NGHE_COACH, GV.BAY_NL), bốn dấu hiệu tìm và bốn dấu
   hiệu tránh khi tuyển cùng ba chặng thử việc (GV.TUYEN), chuẩn dự
   giờ 20 điểm cho buổi kèm một–một (GV.DU_GIO), năm học phần đào
   tạo bên nhận quyền (G.NQ_HOC_PHAN), mười luật bảo vệ trẻ em
   (G.TC_BAO_VE) và dấu hiệu một buổi đang hỏng (G.GA_HONG).

   Thứ chưa có — và là thứ tệp này viết ra — là lớp dùng được ngay:
   quy trình tuyển mười bước có cổng chặn, bộ câu hỏi phỏng vấn có
   thang nghe, phiếu dự giờ đầy đủ 100 điểm cho buổi đứng lớp, kịch
   bản nói chuyện sau dự giờ, lộ trình nghề năm chặng, cách giữ
   người giỏi, mười tám điều ranh giới nghề và dấu hiệu một Coach
   đang xuống.

   Tên bậc và mã năng lực giữ nguyên theo kho cộng đồng, không đặt
   lại. Kho này không ghi mức lương, không ghi số hiệu văn bản,
   không ghi tên tổ chức chứng nhận — những thứ đó thuộc biểu có
   hiệu lực theo năm và thuộc quy định hiện hành, rà trước mỗi đợt
   tuyển chứ không chép lại từ đợt trước.

   Nguyên lý xuyên suốt: *mọi can thiệp nhắm tới việc tự xoá mình.*
   Coach giỏi là Coach ngày càng ít phải có mặt. Lộ trình nghề ở
   đây được xếp để phục vụ điều đó, không phải để thưởng cho người
   ôm được nhiều ca nhất.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Quy trình tuyển một Coach · mười bước ─────────────
     Không bước nào được bỏ và không bước nào được đảo. Bước 4 và
     bước 7 là hai cổng chặn: không qua thì dừng, bất kể các bước
     khác tốt tới đâu.                                            */
  G.NG_TUYEN = [
    { v: '1', t: 'Mở vị trí và viết mô tả việc',
      dk: 'Có ca thật đang chờ hoặc có lớp thật sắp mở. Không tuyển dự phòng cho một nhu cầu chưa tồn tại.',
      duoc: 'Một bản mô tả nói rõ bốn thứ: kèm bao nhiêu ca, dạy khối nào, ai là người bảo trợ, và điều gì khiến ứng viên bị loại ngay từ đầu.',
      bac: 'Tuyển vì thiếu người mà không nói được người ấy sẽ giữ ca nào. Ba tháng sau không ai biết đánh giá họ bằng gì.' },

    { v: '2', t: 'Sàng hồ sơ, đọc mù',
      dk: 'Che tên trường, che nơi làm cũ, che ảnh. Chỉ đọc phần mô tả việc đã làm và kết quả của việc ấy.',
      duoc: 'Danh sách vào vòng phỏng vấn, mỗi người kèm ba câu hỏi riêng rút thẳng ra từ hồ sơ của chính họ.',
      bac: 'Loại vì trường, giữ vì quen. Cả hai đều là đọc hồ sơ bằng thứ không liên quan tới việc đứng lớp.' },

    { v: '3', t: 'Phỏng vấn vòng một · động cơ và ranh giới',
      dk: 'Hai người phỏng vấn: một người hỏi, một người ghi. Dùng bộ câu hỏi chuẩn, cùng thứ tự cho mọi ứng viên.',
      duoc: 'Bản ghi câu trả lời gần nguyên văn ở sáu nhóm câu hỏi. Hai người chấm độc lập trước khi trao đổi với nhau.',
      bac: 'Hai người bàn với nhau trước khi chấm. Người nói to hơn sẽ kéo điểm của người kia về phía mình.' },

    { v: '4', t: 'Xác minh lý lịch tư pháp và ba người tham chiếu',
      dk: 'Phiếu lý lịch tư pháp còn hạn do chính ứng viên xin cấp và nộp, kèm giấy tờ tuỳ thân. Ba người tham chiếu do hệ tự gọi, bắt buộc có một người từng quản lý trực tiếp ứng viên ở nơi có tiếp xúc với trẻ.',
      duoc: 'Một kết luận đạt hoặc không đạt bằng văn bản, lưu trong hồ sơ nhân sự. Chưa có kết luận thì ứng viên không ở cùng phòng với trẻ ở bất kỳ bước nào phía sau.',
      bac: 'Cho nợ giấy để kịp khai giảng. Bước này không có ngoại lệ vì thâm niên, vì quen biết, hay vì lớp đang thiếu người. *Danh mục giấy tờ, cơ quan cấp và thời hạn phải rà theo quy định hiện hành trước mỗi đợt tuyển.*' },

    { v: '5', t: 'Bài đọc ca tại chỗ',
      dk: 'Một hồ sơ ca đã đóng và đã xoá danh tính. Ứng viên có 60 phút, được dùng tài liệu, làm một mình.',
      duoc: 'Ba giả thuyết, mỗi giả thuyết kèm bằng chứng ủng hộ và bằng chứng phản bác, cùng một phép thử có thể sai. Chấm theo K3, K4, K5.',
      bac: 'Ứng viên đưa ra kết luận chắc nịch sau năm phút đọc. Nhanh ở chỗ này không phải là giỏi.' },

    { v: '6', t: 'Thử dạy có người chấm',
      dk: 'Một phần lớp 30 phút với học sinh thật, có đồng thuận của gia đình, có người của hệ trong phòng suốt buổi. Hai người chấm độc lập bằng phiếu dự giờ đầy đủ.',
      duoc: 'Hai phiếu chấm rời. Lệch nhau quá 15 điểm thì mời người chấm thứ ba, không lấy trung bình của hai phiếu đầu.',
      bac: 'Cho ứng viên dạy diễn với người lớn đóng vai học sinh. Diễn thì ai cũng qua. Chỗ lộ ra là lúc một em thật ngồi im không nói gì.' },

    { v: '7', t: 'Vòng tình huống an toàn · bắt buộc đúng',
      dk: 'Năm tình huống bốc ngẫu nhiên, trong đó hai tình huống thuộc nhóm bảo vệ trẻ em. Trả lời miệng, có người phụ trách an toàn ngồi chấm.',
      duoc: 'Đúng tối thiểu bốn trên năm, và bắt buộc đúng cả hai tình huống an toàn. Sai một tình huống an toàn là dừng tuyển.',
      bac: 'Chấm “ý đúng nhưng diễn đạt chưa rõ” thành đạt. Ở nhóm này chỉ có đạt hoặc không đạt, không có mức giữa.' },

    { v: '8', t: 'Hội đồng chốt và ký cam kết',
      dk: 'Ba người ngồi: quản lý chuyên môn, một Coach trưởng, người phụ trách an toàn. Ai đã hướng dẫn hoặc quen thân ứng viên thì rút khỏi phiên chốt.',
      duoc: 'Quyết định bằng văn bản, có ghi lý do. Nhận thì ký bộ quy tắc ứng xử và mười tám điều ranh giới nghề, ký từng trang.',
      bac: 'Ký một chữ ở trang cuối cho nhanh. Về sau không ai chứng minh được người ấy đã đọc điều nào.' },

    { v: '9', t: 'Nhập môn trước buổi đầu tiên',
      dk: 'Chưa dự nhập môn thì chưa vào lớp. Gồm bốn phần: bảo vệ trẻ em, ranh giới nghề, quy trình tố giác, cách ghi biên bản quan sát.',
      duoc: 'Người mới biết đích danh ba điều: ai là người bảo trợ của mình, ai nhận tố giác, và gọi số nào lúc 21 giờ khi có sự cố.',
      bac: 'Nhập môn kiểu đưa tập tài liệu về nhà đọc. Người mới cần thuộc ba số điện thoại, không cần lướt ba trăm trang.' },

    { v: '10', t: 'Thử việc 90 ngày, có cổng',
      dk: 'Theo ba chặng thử việc đã có trong kho cộng đồng. Ba mươi ngày đầu chỉ dự buổi và ghi biên bản, chưa chạm vào ca nào.',
      duoc: 'Cổng ngày 90: kiểm K1–K4 và một phiếu dự giờ đạt ngưỡng. Chưa đạt thì gia hạn 60 ngày, một lần duy nhất, có kế hoạch viết ra.',
      bac: 'Gia hạn lần thứ hai vì “sắp được rồi”. Lần gia hạn thứ hai chưa bao giờ là lần cuối.' }
  ];

  /* ── 2 · Bộ câu hỏi phỏng vấn · 36 câu, sáu nhóm ───────────
     Hỏi đúng thứ tự này cho mọi ứng viên. Cột ba là thứ người
     phỏng vấn đang nghe, không phải thứ ứng viên phải nói ra.   */
  G.NG_CAU_HOI = [
    ['Động cơ', 'Vì sao anh chị muốn làm nghề này? Kể một việc cụ thể đã đẩy mình tới đây.',
     'Động cơ có gốc ở một việc thật hay chỉ ở một câu khẩu hiệu.',
     'Kể được một tình huống có thời gian, có người, có kết quả — kể cả kết quả không đẹp.',
     'Nói về sứ mệnh chung chung, không có một việc nào của chính mình trong đó.'],

    ['Động cơ', 'Ba năm nữa anh chị muốn học được gì ở đây?',
     'Người ấy đang tính học nghề, hay đang tính dùng chỗ này làm bàn đạp.',
     'Nêu năng lực cụ thể muốn thạo và cách tự biết mình đã thạo.',
     'Chỉ nói về chức danh và số ca muốn nhận.'],

    ['Động cơ', 'Điều gì ở nghề này anh chị nghĩ mình sẽ chán nhất?',
     'Có nhìn thấy phần nhàm của nghề không: ghi biên bản, lặp lại, chờ đợi.',
     'Nói thẳng phần mình ngại và cách mình định chịu đựng nó.',
     '“Em không thấy có gì chán cả.”'],

    ['Động cơ', 'Nếu một học viên tiến bộ mà không ai biết đó là nhờ anh chị, anh chị thấy thế nào?',
     'Nhu cầu được công nhận nằm ở mức nào.',
     'Thấy bình thường, và nói được vì sao đó lại là dấu hiệu tốt của nghề này.',
     'Kể ngay một chuyện từng bị cướp công, giọng còn ấm ức.'],

    ['Động cơ', 'Lần gần nhất anh chị tự thay đổi được một thói quen khó của chính mình là khi nào?',
     'Kể lại được cơ chế, hay chỉ kể lại kết quả.',
     'Mô tả được mình đã đổi biến nào, đo bằng gì, và lần thất bại trước đó.',
     '“Em quyết tâm là làm được” — không một chi tiết nào.'],

    ['Động cơ', 'Thu nhập ở đây có thể thấp hơn nghề cũ của anh chị. Anh chị tính sao?',
     'Người ấy đã tính thật chưa, hay đang né câu hỏi.',
     'Nói được khoản mình cần và cách mình xoay. Hỏi lại về lộ trình và điều kiện tăng.',
     'Nói tiền không quan trọng. Sáu tháng nữa tiền sẽ quan trọng, và lúc ấy khó nói lại từ đầu.'],

    ['Ranh giới với trẻ', 'Một em 13 tuổi xin số điện thoại riêng của anh chị để hỏi bài. Anh chị làm gì?',
     'Có biết luật kênh chung không, và có giải thích được cho em không.',
     'Từ chối kênh riêng, chuyển sang nhóm có phụ huynh, và nói cho em vì sao — không chỉ nói không.',
     'Cho số vì “để tiện”. Hoặc từ chối cộc lốc rồi thôi, để em hiểu là mình bị hắt hủi.'],

    ['Ranh giới với trẻ', 'Một em ôm anh chị và khóc sau buổi học. Anh chị làm gì trong ba giây đó?',
     'Phản xạ về tiếp xúc thân thể, và phản xạ tìm người thứ hai.',
     'Đứng chỗ có người nhìn thấy, không đẩy em ra, không giữ lâu, báo và ghi lại trong ngày.',
     'Đưa em vào phòng riêng cho em bình tĩnh. Đây là câu trả lời loại.'],

    ['Ranh giới với trẻ', 'Phụ huynh nhắn tin cho anh chị lúc 23 giờ, tuần thứ ba liên tiếp. Anh chị làm gì?',
     'Có ranh giới thời gian không, và có nói ranh giới ấy một cách tử tế không.',
     'Trả lời trong khung giờ đã hẹn, nói rõ khung ấy một lần, và nêu số cần gọi khi thật sự khẩn.',
     'Trả lời ngay mọi lúc vì sợ mất lòng. Hoặc im lặng mà không giải thích gì.'],

    ['Ranh giới với trẻ', 'Gia đình một học viên tặng anh chị một món quà đắt tiền sau kỳ nghiệm thu. Anh chị làm gì?',
     'Biết luật nhận quà, và dám nói không với người mình quý.',
     'Từ chối, báo quản lý, ghi sổ. Quà chung của lớp thì để lại nơi công cộng, không mang về.',
     'Nhận rồi im. Hoặc nhận vì “từ chối thì họ tự ái”.'],

    ['Ranh giới với trẻ', 'Một học viên kể với anh chị một chuyện ở nhà và xin anh chị đừng nói với ai. Anh chị trả lời sao?',
     'Có hứa điều mình không giữ được không.',
     'Không hứa giữ kín tuyệt đối. Nói trước với em rằng có những chuyện mình buộc phải báo, và báo là để bảo vệ em.',
     '“Cô hứa không nói với ai.” Câu này làm hỏng cả việc bảo vệ trẻ lẫn lòng tin về sau.'],

    ['Ranh giới với trẻ', 'Anh chị đăng gì và không đăng gì về công việc này trên trang cá nhân?',
     'Hiểu về hình ảnh trẻ và về đồng thuận, hay coi đó là chuyện vặt.',
     'Không đăng mặt trẻ khi chưa có đồng thuận văn bản. Không kể ca dù đã đổi tên. Không kết bạn riêng với học viên chưa đủ 16 tuổi.',
     'Coi việc đăng ảnh lớp là đương nhiên vì “có gì đâu, ảnh đẹp mà”.'],

    ['Tình huống khó', 'Giữa buổi, hai em đánh nhau. Anh chị làm gì trong năm phút tiếp theo?',
     'Thứ tự ưu tiên trong đầu: an toàn, tách, ghi, báo.',
     'Tách ngay và dừng lớp. Không hỏi ai đúng ai sai trước đám đông. Ghi sổ sự cố, báo gia đình trong ngày.',
     'Bắt hai em xin lỗi nhau trước lớp rồi coi như xong, không ghi gì.'],

    ['Tình huống khó', 'Một em ngồi im suốt bốn buổi, không nói câu nào. Anh chị làm gì?',
     'Đi tìm dữ liệu, hay đi tìm một kết luận cho nhanh.',
     'Đổi hình thức tham gia trước khi đổi em: viết thay vì nói, cặp đôi thay vì cả lớp. Ghi lại điều kiện nào em có nói.',
     'Gọi em lên bảng cho quen dần. Hoặc để yên vì “em ấy nhút nhát thôi”.'],

    ['Tình huống khó', 'Một phụ huynh nói: “Ba tháng rồi con tôi chẳng khác gì.” Anh chị nói gì?',
     'Có bằng chứng trong tay không, và có chịu nghe hết không.',
     'Nghe hết. Hỏi họ mong thấy khác ở chỗ nào. Mở dữ liệu ra đối chiếu. Nếu đúng là không đổi thì nhận và đổi phác đồ.',
     'Bảo vệ ngay bằng lý thuyết. Hoặc hứa tháng sau sẽ khác mà không nói khác ở đâu.'],

    ['Tình huống khó', 'Một em nói với anh chị rằng em không muốn sống nữa. Anh chị làm gì?',
     'Đây là câu chấm đạt hoặc không đạt, không có mức giữa.',
     'Ở lại với em, không để em một mình, không hứa giữ bí mật. Báo quản lý và gia đình trong ngày theo quy trình chuyển tuyến. Không tự tư vấn, không tự đánh giá mức độ.',
     'Tự trấn an em rồi thôi. Đợi hôm sau xem sao. Hứa không nói với bố mẹ.'],

    ['Tình huống khó', 'Anh chị nhận ra một đồng nghiệp làm sai một điều ranh giới với trẻ. Anh chị làm gì?',
     'Có dám báo không, và báo cho ai trước.',
     'Báo người nhận tố giác trong ngày. Ghi lại điều mình thấy bằng dữ kiện, có mốc giờ. Không tự đi hỏi đồng nghiệp cho ra lẽ.',
     'Nhắc riêng đồng nghiệp rồi thôi, vì “chắc anh ấy vô ý”.'],

    ['Tình huống khó', 'Lớp đang chạy thì mất điện, còn 40 phút. Anh chị làm gì?',
     'Có phần lớp nào chạy được mà không cần thiết bị không.',
     'Chuyển sang phần luyện nói hoặc trạm giấy đã chuẩn bị sẵn. Giữ nguyên mục tiêu buổi, chỉ đổi công cụ.',
     'Cho về sớm. Hoặc giảng chay cho hết giờ.'],

    ['Nhận sai', 'Kể một buổi anh chị dạy hỏng. Hỏng ở đâu?',
     'Có buổi hỏng nào được nhớ không, và lỗi được đặt ở đâu.',
     'Kể chi tiết, đặt lỗi ở quyết định của mình, và nói được lần sau đã làm khác thế nào.',
     'Không nhớ buổi nào hỏng. Hoặc hỏng vì học sinh, vì phụ huynh, vì phòng ốc.'],

    ['Nhận sai', 'Lần gần nhất anh chị bị góp ý nặng là khi nào? Ai góp, và anh chị làm gì sau đó?',
     'Phản ứng thật với phản hồi, không phải phản ứng lý thuyết.',
     'Nhớ được gần nguyên văn lời góp ý, kể cả phần khó nghe. Nói được việc mình đã đổi.',
     'Chỉ nhớ mình đã khó chịu ra sao. Hoặc nói chưa từng bị góp ý nặng bao giờ.'],

    ['Nhận sai', 'Anh chị phát hiện mình chấm sai hồ sơ của một học viên từ tháng trước. Anh chị làm gì?',
     'Sửa công khai hay sửa lặng lẽ.',
     'Báo quản lý, sửa, và nói với gia đình rằng đã sửa. Ghi vào sổ lỗi.',
     'Sửa lặng lẽ vì “không ai biết”. Đây là câu trả lời loại.'],

    ['Nhận sai', 'Nếu người dự giờ chấm anh chị 62 trên 100, anh chị hỏi họ câu gì đầu tiên?',
     'Đi tìm bằng chứng, hay đi tìm lý do biện hộ.',
     'Hỏi phần nào mất điểm nhiều nhất, và họ đã nhìn thấy gì ở phút nào.',
     'Hỏi ai chấm, và vì sao chấm mình thấp thế.'],

    ['Nhận sai', 'Có bao giờ anh chị nói với một học viên rằng mình sai không? Kể lại.',
     'Nói “tôi sai” trước mặt trẻ có phải điều làm được không.',
     'Kể được câu mình đã nói và phản ứng của em sau đó.',
     'Cho rằng nhận sai trước học sinh làm mất uy của người đứng lớp.'],

    ['Nhận sai', 'Điều gì trong cách dạy của anh chị mà anh chị nghi ngờ nhất lúc này?',
     'Có tự soi được không, và soi bằng gì.',
     'Nêu một điểm cụ thể và cách mình đang kiểm chứng nó.',
     'Không nghi ngờ gì. Hoặc nêu một điểm khiêm tốn giả kiểu “em quá cầu toàn”.'],

    ['Làm việc nhóm', 'Người bảo trợ bảo làm cách A, anh chị tin cách B đúng hơn. Anh chị làm gì?',
     'Cách xử bất đồng với người trên mình.',
     'Làm A theo đúng thoả thuận, đồng thời ghi dữ liệu để bàn lại bằng bằng chứng, có mốc.',
     'Làm B rồi báo sau. Hoặc làm A trong bực bội và không nói gì với ai trừ đồng nghiệp.'],

    ['Làm việc nhóm', 'Anh chị bàn giao một ca cho người khác. Anh chị đưa cho họ những gì?',
     'Bàn giao bằng hồ sơ hay bàn giao bằng lời.',
     'Hồ sơ, dữ liệu, phác đồ đang chạy, phần mình đã làm sai, và một buổi ngồi cùng.',
     'Kể miệng mười lăm phút rồi coi như xong.'],

    ['Làm việc nhóm', 'Đồng nghiệp cùng lớp thường xuyên đến muộn mười phút. Anh chị làm gì?',
     'Nói thẳng, hay chịu đựng rồi phàn nàn sau lưng.',
     'Nói riêng với người ấy trước, nói bằng số lần và ngày cụ thể. Không đổi thì đưa lên quản lý.',
     'Nói với người khác về chuyện đó trước khi nói với chính người ấy.'],

    ['Làm việc nhóm', 'Một Coach mới hỏi anh chị một câu mà anh chị không biết trả lời. Anh chị nói gì?',
     'Có nói được “tôi chưa biết” trước mặt người dưới mình không.',
     '“Tôi chưa biết, để tôi hỏi rồi trả lời anh chị trong hôm nay” — và làm đúng thế.',
     'Trả lời cho có. Hoặc trả lời bằng kinh nghiệm riêng rồi gọi đó là chuẩn của hệ.'],

    ['Làm việc nhóm', 'Anh chị được nhờ dự giờ một người giỏi hơn mình. Anh chị chấm thế nào?',
     'Chấm theo phiếu hay chấm theo cảm giác về con người.',
     'Chấm theo phiếu, dẫn được từng điểm về một quan sát có mốc phút.',
     'Chấm cao cho an toàn. Hoặc chấm thấp để chứng minh mình cũng nhìn ra vấn đề.'],

    ['Làm việc nhóm', 'Một việc chung không ai nhận. Anh chị làm gì?',
     'Cách xử phần việc rơi vào giữa các vai.',
     'Nhận nếu làm được, đồng thời đề nghị ghi việc ấy vào vai của một người cho lần sau.',
     'Luôn nhận hết rồi kiệt sức. Hoặc chờ tới khi có người chỉ đích danh mình.'],

    ['Chuyên môn', 'Viết lại câu này bằng dữ kiện quan sát được: “Em này lười.”',
     'Có phân biệt được quan sát với đánh giá không. Đây là K1.',
     'Viết ra hành vi có thời gian và số lần, không còn tính từ nào về con người.',
     'Chỉ đổi chữ lười thành một chữ khác nhẹ hơn.'],

    ['Chuyên môn', 'Anh chị nêu một giả thuyết về một em. Bằng chứng nào sẽ chứng minh anh chị sai?',
     'Đang cầm một giả thuyết hay đang cầm một niềm tin. Đây là K4.',
     'Nêu được điều kiện phản bác cụ thể, nêu trước khi làm.',
     'Không nghĩ ra được điều gì có thể chứng minh mình sai.'],

    ['Chuyên môn', 'Thiết kế một phép thử bảy ngày cho một em không chịu ngồi vào bàn học.',
     'Đổi bao nhiêu biến, đo bằng gì, có thời hạn không. Đây là K5.',
     'Một biến, một cách đo đơn giản, một mốc dừng, và người thực hiện là em chứ không phải người lớn.',
     'Đổi năm thứ cùng lúc. Hoặc phép thử mà người lớn làm hết phần việc.'],

    ['Chuyên môn', 'Trong một buổi 90 phút, anh chị nói bao nhiêu phút là hợp lý? Vì sao?',
     'Hiểu tỷ lệ luyện trên giảng, hay chưa từng nghĩ tới tỷ lệ đó.',
     'Dưới một phần ba thời lượng, và nói được phần còn lại học sinh làm gì.',
     'Càng giảng kỹ càng tốt. Hoặc không có con số nào trong đầu.'],

    ['Chuyên môn', 'Một cam kết cuối buổi thế nào là đạt? Cho hai ví dụ đạt và hai ví dụ không đạt.',
     'Có đo được không, và có phân biệt được hai loại không.',
     'Ví dụ đạt có số và có ngày. Ví dụ không đạt là loại câu “em sẽ cố gắng hơn”.',
     'Cả bốn ví dụ đều chung chung như nhau.'],

    ['Chuyên môn', 'Coach giỏi ở hệ này khác gì một người dạy giỏi?',
     'Có hiểu nguyên lý tự xoá mình không. Đây là K7, và là câu quan trọng nhất trong bộ.',
     'Nói được rằng đích là học viên tự chạy, và Coach giỏi là Coach ngày càng ít phải có mặt.',
     'Mô tả một người dạy hay, được học trò yêu quý, lớp nào cũng cần tới mình.']
  ];

  /* ── 3 · Phiếu dự giờ đầy đủ · 100 điểm ────────────────────
     Dùng cho buổi đứng lớp. Buổi kèm một–một vẫn dùng chuẩn 20
     điểm đã có trong kho cộng đồng. Ngưỡng đạt 80.
     Phần “An toàn và ranh giới” bằng 0 thì cả phiếu không đạt,
     bất kể tổng điểm.                                            */
  G.NG_DU_GIO = [
    { t: 'Chuẩn bị và mở buổi', d: 12, mau: '#185AB4', muc: [
      ['0–4', 'Học sinh đã ngồi mà người dạy còn đang dán thẻ, thử chuông, tìm tài liệu. Không ai biết buổi hôm nay làm gì.'],
      ['5–8', 'Có chuẩn bị, mở buổi đúng giờ, nhưng mục tiêu buổi chỉ có trong đầu người dạy.'],
      ['9–12', 'Vào phòng là chạy được ngay. Mục tiêu buổi và sản phẩm cuối buổi được nói ra trong ba phút đầu, học sinh nhắc lại được.'] ]},

    { t: 'Giữ khung và nhịp', d: 14, mau: '#5140B4', muc: [
      ['0–5', 'Một hoạt động ăn hết thời gian của các hoạt động sau. Phần chốt bị cắt. Buổi kết thúc bằng tiếng trống hết giờ.'],
      ['6–10', 'Có timer nhưng chuông kêu vẫn nói tiếp. Lệch khung dưới mười phút, phần chốt còn nhưng vội.'],
      ['11–14', 'Mọi hoạt động có timebox, chuông kêu là dừng kể cả đang nói dở. Đủ mọi mốc, còn dư thời gian cho phần chốt.'] ]},

    { t: 'Tỷ lệ luyện trên giảng', d: 18, mau: '#0B7350', muc: [
      ['0–6', 'Người dạy nói quá nửa thời lượng. Học sinh nghe là chính, làm là phụ.'],
      ['7–13', 'Người dạy nói khoảng một phần ba tới một nửa. Có luyện nhưng luyện ngắn, một vài em làm thay cả nhóm.'],
      ['14–18', 'Người dạy nói dưới một phần ba. Mọi học sinh đều có lượt làm thật, đếm được trên băng ghi hình.'] ]},

    { t: 'Phản hồi và sửa lỗi', d: 16, mau: '#A8801F', muc: [
      ['0–5', 'Sửa hai ba lỗi trong một lượt, hoặc mắng. Học sinh rối rồi im. Có em bị nêu tên như một ví dụ xấu.'],
      ['6–11', 'Sửa đúng một ý mỗi lần, nhưng phản hồi dừng ở lời khen chung: giỏi, tốt, được rồi.'],
      ['12–16', 'Sửa một ý, cho nói lại một lần, và mô tả được lỗi bằng hành vi chứ không bằng nhãn dán lên người. Khen theo minh chứng của chính buổi ấy.'] ]},

    { t: 'Chuyển quyền cho học sinh', d: 15, mau: '#9E470D', muc: [
      ['0–5', 'Người dạy điều hành mọi thứ. Học sinh chỉ trả lời khi được gọi. Bỏ người dạy ra là lớp đứng.'],
      ['6–10', 'Có giao vai nhưng vai hình thức: em điểm danh, em phát giấy. Quyết định vẫn ở người lớn.'],
      ['11–15', 'Học sinh giữ ghế thật: điều hành phần lớp, chấm chéo, chốt quy ước. Người dạy đứng sau, can thiệp dưới ba lần cả buổi.'] ]},

    { t: 'An toàn và ranh giới', d: 15, mau: '#BE0E16', muc: [
      ['0', 'Có một vi phạm ranh giới hoặc một tình huống an toàn bị bỏ qua. *Phần này bằng 0 thì cả phiếu không đạt, bất kể tổng điểm, và buổi phải được báo cáo trong ngày.*'],
      ['1–10', 'Không vi phạm, nhưng bị động: không biết ai trực y tế, không có phương án cho tình huống bất ngờ, học liệu quá độ tuổi.'],
      ['11–15', 'Không kèm riêng trong phòng kín, không tiếp xúc thân thể ngoài mức cần, không hứa kết quả, không vượt phạm vi chuyên môn. Biết trước gọi ai khi có việc.'] ]},

    { t: 'Chốt buổi, cam kết và dữ liệu', d: 10, mau: '#185AB4', muc: [
      ['0–3', 'Hết giờ là tan. Không cam kết, không phiếu phản hồi, buổi sau không có gì để kiểm.'],
      ['4–7', 'Có chốt và có cam kết, nhưng cam kết chung chung, không số không ngày. Phiếu phản hồi phát mà không thu.'],
      ['8–10', 'Mỗi em ra về với một cam kết có số và có ngày. Phiếu phản hồi thu đủ, dữ liệu vào sổ trong ngày.'] ]}
  ];

  /* ── 4 · Sáu kịch bản phản hồi sau dự giờ ──────────────────
     Phản hồi trong 48 giờ, không để dồn. Nói riêng, ngồi ngang,
     không ngồi đối diện qua bàn. Mở phiếu ra cùng đọc.           */
  G.NG_PHAN_HOI = [
    { ma: 'PH-1', t: 'Buổi tốt', khi: 'Trong 48 giờ, 20 phút', ai: 'Người dự giờ', mau: '#0B7350',
      mo: '“Buổi này 91 điểm. Tôi muốn nói kỹ vì sao nó tốt, để anh chị lặp lại được chứ không phải để anh chị vui.”',
      giua: ['Chỉ đúng ba khoảnh khắc, mỗi khoảnh khắc có mốc phút, và nói cơ chế: phút 34 anh chị im mười giây, em ấy tự nói tiếp — chỗ đó là chuyển quyền.',
             'Hỏi ngược: anh chị chuẩn bị phần đó thế nào? Câu trả lời sẽ thành một mục cho kho dùng chung.',
             'Chỉ một chỗ còn kéo được lên, nói ở cuối, ngắn. Buổi tốt vẫn phải có một việc để làm tiếp.',
             'Đề nghị người ấy cho một Coach mới dự lại buổi tương tự trong tháng.'],
      ket: '“Tôi sẽ xin anh chị ghi lại phần phút 34 thành một mục cho kho. Tuần sau tôi gửi bản nháp để anh chị sửa.”',
      cam: 'Không khen chung chung. “Buổi hay lắm” không giúp lặp lại được gì. Không lấy buổi tốt của một người ra so với buổi kém của người khác trong cùng cuộc nói chuyện.' },

    { ma: 'PH-2', t: 'Buổi trung bình', khi: 'Trong 48 giờ, 30 phút', ai: 'Người dự giờ', mau: '#185AB4',
      mo: '“Buổi này 78, dưới ngưỡng 80 một chút. Tôi nghĩ hai phần kéo nó xuống. Anh chị đọc phiếu trước, rồi nói tôi nghe anh chị thấy chỗ nào.”',
      giua: ['Để người dạy nói trước. Phần lớn người dạy tự chỉ ra được một trong hai chỗ, và chỗ họ tự chỉ ra là chỗ họ sẽ sửa thật.',
             'Chốt đúng một việc để đổi ở buổi sau. Một, không phải ba. Ba việc nghĩa là không việc nào.',
             'Đặt cách đo cho việc ấy: buổi sau đếm số phút người dạy nói, hoặc đếm số em có lượt làm thật.',
             'Hẹn ngày dự giờ lại, ghi vào lịch ngay trong cuộc nói chuyện.'],
      ket: '“Buổi sau tôi chỉ nhìn đúng một thứ: tỷ lệ anh chị nói. Ngày 14, tôi ngồi cuối lớp.”',
      cam: 'Không liệt kê tám lỗi cho đủ. Không mở đầu bằng lời khen giả để đệm cho lời chê — người nghe sẽ chờ chữ “nhưng” và không nhớ gì trước nó.' },

    { ma: 'PH-3', t: 'Buổi hỏng', khi: 'Trong 24 giờ, 45 phút', ai: 'Người dự giờ và quản lý chuyên môn', mau: '#BE0E16',
      mo: '“Buổi hôm qua 54. Tôi nói thẳng vì để lâu thì hỏng thêm. Việc của cuộc này là dựng một kế hoạch, không phải kết luận về anh chị.”',
      giua: ['Nói ngay phần mất điểm nặng nhất, kèm quan sát có mốc phút, không diễn giải động cơ của người dạy.',
             'Hỏi điều đang xảy ra ngoài lớp: sức khoẻ, việc nhà, số ca đang ôm. Buổi hỏng thường có gốc ngoài phòng học.',
             'Tạm giảm tải: dừng nhận ca mới, giữ lại lớp đang dạy, ghép một người bảo trợ ngồi cùng ba buổi tới.',
             'Viết kế hoạch 30 ngày: hai việc cụ thể, hai mốc kiểm, một người kèm có tên.',
             'Nói rõ điều gì xảy ra nếu buổi dự giờ lại vẫn dưới ngưỡng — nói trước, không để người ấy đoán.'],
      ket: '“Ngày 30 chúng ta dự giờ lại. Từ giờ tới đó anh chị không đứng lớp một mình. Đây là kế hoạch, anh chị giữ một bản.”',
      cam: 'Không nói ở nơi có người thứ ba nghe được. Không nhắc lại buổi hỏng này ở bất kỳ cuộc họp nào có tên người ấy. Nếu buổi hỏng có phần an toàn bằng 0 thì đây không còn là cuộc phản hồi — chuyển sang quy trình xử lý vi phạm.' },

    { ma: 'PH-4', t: 'Người mới trong 90 ngày', khi: 'Sau mỗi buổi, 15 phút, không để dồn', ai: 'Người bảo trợ', mau: '#A8801F',
      mo: '“Ba câu thôi. Chỗ nào anh chị thấy trôi, chỗ nào thấy kẹt, và anh chị muốn tôi nhìn gì ở buổi sau?”',
      giua: ['Chỉ nhận xét một thứ mỗi buổi. Người mới không sửa được hai thứ cùng lúc.',
             'Ưu tiên theo thứ tự cố định: an toàn trước, giữ khung thứ hai, tỷ lệ nói thứ ba, phần còn lại để sau.',
             'Nói rõ điều gì là chuẩn bắt buộc và điều gì là gu cá nhân của người bảo trợ. Người mới không phân biệt được, và sẽ bắt chước cả hai.',
             'Cho người mới xem một buổi của người khác trong tuần, kèm phiếu chấm, để thấy thang điểm nghĩa là gì.'],
      ket: '“Buổi sau tôi chỉ nhìn phần mở đầu ba phút. Ngoài ba phút đó tôi không ghi gì.”',
      cam: 'Không để người mới đứng lớp một mình trước cổng ngày 90. Không so người mới với chính mình lúc mới vào nghề — mốc so sánh duy nhất là phiếu chấm.' },

    { ma: 'PH-5', t: 'Người lâu năm đang trượt', khi: 'Trong tuần, 60 phút, hẹn trước', ai: 'Quản lý chuyên môn', mau: '#9E470D',
      mo: '“Ba kỳ gần nhất của anh chị là 88, 79, 71. Tôi không nghĩ anh chị kém đi. Tôi nghĩ có gì đó đang bào mòn, và tôi muốn tìm ra nó cùng anh chị.”',
      giua: ['Mở đường cong ba kỳ ra cùng nhìn. Xu hướng là thứ nói được, một buổi lẻ thì không.',
             'Đếm tải thật: số ca, số lớp, số giờ đi lại, số tháng chưa nghỉ. Người lâu năm trượt vì gánh nhiều nhất, không phải vì hết nghề.',
             'Hỏi thẳng: lần gần nhất anh chị học được một điều mới trong nghề là khi nào? Trượt thường bắt đầu từ chỗ ngừng học.',
             'Đưa ra lựa chọn thật, không phải lựa chọn hình thức: giảm ca, đổi khối lớp, chuyển sang kèm người mới, hoặc nghỉ có thời hạn rồi quay lại.',
             'Không dùng thâm niên làm lý do miễn dự giờ. Cũng không dùng thâm niên làm lý do phạt nặng hơn.'],
      ket: '“Chốt một việc trong ba tháng tới, và tôi chốt một việc của phía tôi. Sáu tuần nữa ngồi lại.”',
      cam: 'Không để người lâu năm nghe tin mình đang trượt lần đầu tiên qua một quyết định phân công. Không giao thêm việc như một cách động viên.' },

    { ma: 'PH-6', t: 'Người phản ứng gay gắt', khi: 'Ngay tại chỗ, rồi hẹn lại sau 48 giờ', ai: 'Người dự giờ, lần sau thêm một người thứ ba', mau: '#5140B4',
      mo: '“Tôi dừng ở đây. Anh chị đang rất bực, và tôi nói tiếp lúc này thì không ai nghe được ai. Ta hẹn lại thứ Sáu.”',
      giua: ['Không tranh luận về điểm số ngay tại chỗ. Ai bực thì nghe kém, kể cả người chấm.',
             'Buổi hẹn lại có người thứ ba do chính người bị chấm chọn trong danh sách, để họ thấy mình không bị xử một mình.',
             'Vào buổi hẹn lại, đọc lại từng quan sát có mốc phút và hỏi: chỗ này tôi ghi có đúng việc đã xảy ra không? Tách phần dữ kiện ra khỏi phần chấm.',
             'Sai thì sửa phiếu công khai và ghi lý do. Người chấm sai một lần mà chịu sửa sẽ được tin ở mười lần sau.',
             'Đúng mà người kia vẫn không nhận thì chốt bằng phương án khách quan: một người chấm thứ ba dự buổi tới, không ai được chọn người ấy.'],
      ket: '“Thứ Sáu ta đọc lại từng dòng. Nếu tôi ghi sai chỗ nào, tôi sửa phiếu và ghi rõ vì sao.”',
      cam: 'Không đáp lại giọng gay gắt bằng giọng gay gắt. Không nhượng bộ điểm số để cho êm chuyện — sửa điểm vì bị phản ứng là cách làm chết cả hệ dự giờ.' }
  ];

  /* ── 5 · Lộ trình nghề · năm chặng ─────────────────────────
     Tên bậc theo GV.NGHE_COACH. Thang tiến ở đây không đo bằng
     số ca ôm được, mà đo bằng mức độ *không còn cần tới mình*:
     ca tự chạy, người mới tự dạy, cơ sở tự giữ chuẩn.            */
  G.NG_LO_TRINH = [
    { ma: 'N1', t: 'TRỢ GIẢNG', nam: '0–6 tháng', mau: '#185AB4',
      hoi: 'Người này ghi được sự thật của một buổi học không?',
      lam: ['Dự tối thiểu 30 buổi, ghi biên bản quan sát từng buổi',
            'Chuẩn bị học liệu, chạy phần lớp ngắn dưới sự có mặt của người bảo trợ',
            'Học thuộc quy trình an toàn và quy trình tố giác, không tra sách khi cần dùng',
            'Chấm thử 10 phiếu dự giờ song song với người chấm thật'],
      dich: ['30 biên bản quan sát đạt chuẩn K1', 'Mười phiếu chấm thử lệch dưới 8 điểm so với người chấm thật'],
      cong: 'Hai người đọc độc lập một băng buổi học và ghi ra hai bản khớp nhau về dữ kiện. Không khớp thì chưa qua.',
      rui: 'Cho trợ giảng đứng lớp sớm vì thiếu người. Người chưa ghi được sự thật thì đứng lớp sẽ dạy theo cảm giác của mình.' },

    { ma: 'N2', t: 'COACH TẬP SỰ', nam: '6–18 tháng', mau: '#5140B4',
      hoi: 'Người này chạy được một ca đơn giản với dây bảo hiểm không?',
      lam: ['Kèm 1–2 ca đơn giản, luôn có Coach bảo trợ ngồi cùng hoặc nghe lại băng',
            'Đứng lớp đủ 20 buổi, trong đó 6 buổi có phiếu dự giờ đầy đủ',
            'Viết một bản đọc ca hoàn chỉnh: dữ liệu, giả thuyết, phép thử, kết quả kể cả khi sai',
            'Ngồi ghế người thứ hai trong hai tình huống an toàn có thật hoặc diễn tập'],
      dich: ['Một ca qua cổng dưới sự dẫn dắt của mình', 'Sáu phiếu dự giờ, phiếu cuối đạt từ 80'],
      cong: 'Đạt K1–K4 và qua bài kiểm đọc ca. Phần an toàn của mọi phiếu dự giờ đều khác 0.',
      rui: 'Người bảo trợ làm thay cho ca chạy đẹp. Hết bảo trợ là ca đứng, và không ai biết điều đó cho tới lúc muộn.' },

    { ma: 'N3', t: 'COACH', nam: '18 tháng – 4 năm', mau: '#0B7350',
      hoi: 'Ca của người này có tự chạy dần lên không?',
      lam: ['Kèm 6–10 ca ở nhiều tầng, tự thiết kế phác đồ, tự làm việc với gia đình',
            'Giữ đường cong hỗ trợ đi xuống trong khi kết quả không tụt',
            'Dạy được cả khối lớp mình không quen, ít nhất một học kỳ',
            'Đóng góp tối thiểu 2 mục vào kho dùng chung, rút từ ca thật đã xoá danh tính'],
      dich: ['Ca ở cả năm tầng dịch vụ', 'Đường cong hỗ trợ 12 tháng có xu hướng giảm'],
      cong: 'Đạt K1–K6, điểm dự giờ trung bình từ 85, và ít nhất hai ca đã giảm được nhịp gặp mà kết quả giữ nguyên.',
      rui: 'Đo giỏi bằng số ca ôm được. Người ôm mười hai ca và không ca nào rời được mình là người đang làm ngược nguyên lý của hệ.' },

    { ma: 'N4', t: 'COACH KÈM CẶP', nam: '4–7 năm', mau: '#A8801F',
      hoi: 'Người này gỡ được ca khó, và gỡ được người khác không?',
      lam: ['Nhận ca khó, ca đã trượt cổng, ca nhiều nhánh',
            'Bảo trợ 2–3 Coach tập sự, phản hồi sau mỗi buổi của họ, không để dồn',
            'Dự giờ chéo cơ sở khác, chấm bằng phiếu đầy đủ',
            'Viết lại bài học từ ca khó thành mục dùng được cho người chưa gặp ca ấy'],
      dich: ['Từ 10 ca khó có hồ sơ và bài học viết lại', 'Ít nhất 2 Coach tập sự do mình bảo trợ qua cổng'],
      cong: 'Đạt K1–K7. Chấm chéo của mình lệch dưới 8 điểm so với người chấm thứ hai ở 8 trên 10 phiếu gần nhất.',
      rui: 'Giữ ca khó cho riêng mình vì gỡ được ca khó là thứ oai nhất trong nghề. Ca khó không thành bài học viết lại thì hệ không học được gì.' },

    { ma: 'N5', t: 'COACH TRƯỞNG', nam: '7 năm trở lên', mau: '#9E470D',
      hoi: 'Chất lượng ở đây có còn đứng vững khi người này vắng mặt không?',
      lam: ['Tạo ra Coach giỏi, không chỉ làm Coach giỏi. Giữ lịch dự giờ toàn nhóm.',
            'Giữ thang chấm không trôi: hiệu chuẩn người chấm mỗi quý bằng băng chung',
            'Dạy trực tiếp một lượng tối thiểu để không mất tay nghề, và một lượng tối đa để không giành ghế của người khác',
            'Chuẩn bị người thay mình: mỗi vai mình giữ phải có tên một người đang học để nhận vai ấy'],
      dich: ['Từ 5 Coach do mình đào tạo đạt chuẩn và còn ở nghề sau 2 năm', 'Điểm dự giờ trung bình của cả nhóm, không phải của riêng mình'],
      cong: 'Nhóm chạy trọn một tháng không có mình mà điểm dự giờ trung bình không tụt quá 5 điểm. Đây là bài kiểm cuối cùng, và nó phải được thi thật.',
      rui: 'Coach trưởng thành người không thể vắng mặt. Nếu nhóm dừng khi mình nghỉ, thì việc đào tạo đã không xảy ra — chỉ có việc gánh xảy ra.' }
  ];

  /* ── 6 · Giữ người giỏi ở lại · mười hai việc ──────────────
     Người giỏi hiếm khi rời đi vì tiền một mình. Họ rời đi khi
     tải tăng, khi hết chỗ học, và khi thấy chuẩn bị bẻ cong.     */
  G.NG_GIU_NGUOI = [
    { t: 'Trần tải viết ra giấy', n: 'Số ca và số buổi tối đa mỗi Coach, ghi trong quy chế, không phải trong lời hứa của quản lý.',
      vi: 'Vượt trần thì phải có quyết định bằng văn bản, có thời hạn, có ngày kết thúc. Không có ngày kết thúc thì trần không tồn tại.' },
    { t: 'Ngày không lớp', n: 'Mỗi tuần một ngày không đứng lớp và không gặp gia đình, dành cho đọc ca, viết hồ sơ và học.',
      vi: 'Ngày này nằm trên lịch chung như một buổi dạy. Ai lấy mất ngày này của người khác thì phải xin, không phải cứ xếp vào.' },
    { t: 'Người bảo trợ suốt đời nghề', n: 'Mỗi Coach có một người trên mình để hỏi, và giữ được người ấy kể cả khi đã lên bậc.',
      vi: 'Người lên bậc mất người bảo trợ là người bắt đầu tự chấm mình. Chuẩn trôi từ đó.' },
    { t: 'Ngân sách học mỗi năm', n: 'Một khoản và một số ngày công được nghỉ để đi học ngoài hệ, cho từng người, không xin theo lượt.',
      vi: 'Không tiêu hết cũng là một dấu hiệu xấu: nghĩa là người ấy không có thời gian để đi học.' },
    { t: 'Kho là của người viết ra nó', n: 'Mục nào vào kho dùng chung thì ghi tên người viết, và đọc tên ấy trong họp quý.',
      vi: 'Đây là thứ giữ người giỏi rẻ nhất và bị bỏ quên nhiều nhất.' },
    { t: 'Đường ngang, không chỉ đường dọc', n: 'Người giỏi chuyên môn không bắt buộc phải đi làm quản lý mới được tăng bậc.',
      vi: 'Ép một Coach giỏi lên làm quản lý là cách mất hai người cùng lúc: mất một Coach giỏi, được một quản lý dở.' },
    { t: 'Quyền nói không với một ca', n: 'Coach được từ chối một ca nếu thấy mình không đủ năng lực hoặc có xung đột cá nhân, không cần giải trình dài.',
      vi: 'Từ chối ba ca liên tiếp thì ngồi lại nói chuyện. Nhưng quyền từ chối lần một phải là quyền thật.' },
    { t: 'Nghỉ dài có đường về', n: 'Nghỉ sinh con, nghỉ chăm người nhà, nghỉ vì kiệt sức: giữ chỗ, giữ bậc, có lộ trình quay lại có kèm.',
      vi: 'Quay lại thì dự giờ lại trong 60 ngày đầu — để đỡ người ấy, không phải để thử người ấy.' },
    { t: 'Nói trước về thay đổi', n: 'Đổi lịch, đổi khối lớp, đổi cơ sở: báo trước theo mốc đã ghi trong quy chế.',
      vi: 'Người giỏi chịu được thay đổi. Cái họ không chịu được là biết tin sau cùng.' },
    { t: 'Ra khỏi nghề vẫn được về', n: 'Người rời đi trong tử tế thì cửa còn mở, và được mời về dạy một chuyên đề nếu muốn.',
      vi: 'Người từng rời rồi quay lại là người thuyết phục nhất về chỗ này, hơn mọi lời tuyển dụng.' },
    { t: 'Quản lý bị chấm ngược', n: 'Mỗi năm một lần, Coach chấm người quản lý mình bằng phiếu ẩn danh, kết quả đọc trong họp.',
      vi: 'Phiếu ẩn danh mà tổng số người trả lời dưới bảy thì không đọc — không còn ẩn danh nữa.' },
    { t: 'Chuẩn không bẻ cong vì doanh số', n: 'Chưa từng có trường hợp một Coach bị ép nhận thêm ca để kịp chỉ tiêu, và điều này kiểm được trong sổ.',
      vi: 'Người giỏi rời đi nhanh nhất khi thấy chuẩn bị bẻ một lần mà không ai nói gì. Lần thứ hai họ không nói nữa, họ đi.' }
  ];

  /* ── 7 · Ranh giới nghề · mười tám điều ────────────────────
     Bổ sung cho mười luật bảo vệ trẻ em, không thay thế. Chỗ nào
     hai bên chồng nhau thì bên chặt hơn có hiệu lực.             */
  G.NG_RANH_GIOI = [
    'Không có kênh liên lạc riêng với học viên chưa đủ 16 tuổi. Mọi trao đổi đi qua nhóm có phụ huynh hoặc có người thứ hai của hệ. Học viên từ 16 tuổi thì vẫn giữ kênh có người thứ hai, chỉ khác là em được biết và được đồng ý.',
    'Không kèm riêng trong phòng kín. Kèm một–một luôn ở phòng có kính, hoặc cửa mở, hoặc có người thứ ba trong tầm nhìn — kể cả khi gia đình đề nghị ngược lại.',
    'Không nhận quà có giá trị từ gia đình học viên. Quà nhỏ mang tính lễ nghi thì nhận công khai, để lại nơi chung, và ghi vào sổ. Không nhận tiền mặt, không nhận phong bì, trong bất kỳ dịp nào.',
    'Không nhận vay mượn tiền của gia đình học viên và không cho họ vay. Không rủ họ vào việc kinh doanh của mình.',
    'Không dạy thêm riêng, có thu tiền, cho học viên đang trong hệ hoặc đã rời hệ dưới mười hai tháng. Gia đình cần thêm giờ thì đăng ký qua hệ và người dạy có thể không phải là mình.',
    'Không giới thiệu dịch vụ riêng của mình, của người nhà mình, hoặc của nơi mình có phần lợi, cho gia đình học viên.',
    'Không hứa kết quả. Nói được điều hệ sẽ làm và mốc kiểm; không nói con sẽ thành thế nào.',
    'Không vượt phạm vi chuyên môn. Nghi ngờ vấn đề tâm lý, tâm thần, y tế hoặc pháp lý thì chuyển tuyến theo quy trình, không tự chẩn đoán, không tự khuyên thuốc, không tự trị liệu.',
    'Không hứa giữ bí mật tuyệt đối với một học viên. Nói trước với em rằng có những chuyện mình buộc phải báo, và báo là để bảo vệ em.',
    'Không nói về một học viên ở nơi công cộng, trong nhóm chat chung, hay với người không có phận sự — kể cả khi đã đổi tên và đã bỏ chi tiết nhận dạng.',
    'Không so sánh học viên này với học viên khác trước mặt gia đình. Không dùng ca của một gia đình làm ví dụ cho gia đình khác nếu chưa có đồng thuận văn bản.',
    'Không kết bạn, không theo dõi, không nhắn tin riêng qua mạng xã hội với học viên chưa đủ 18 tuổi. Với phụ huynh thì dùng kênh công việc, không dùng tài khoản cá nhân.',
    'Không đăng ảnh, video, bài viết có hình hoặc thông tin nhận dạng của học viên khi chưa có đồng thuận văn bản của gia đình. Gia đình rút đồng thuận thì gỡ trong 48 giờ, không hỏi lý do.',
    'Không đăng nội dung về chính trị, tôn giáo, hoặc bình luận về gia đình học viên trên trang cá nhân theo cách khiến người đọc gắn nó với công việc này.',
    'Chuyển ca cho người khác khi có quan hệ họ hàng, quan hệ tình cảm, quan hệ làm ăn hoặc mâu thuẫn cá nhân với học viên hay gia đình họ. Chuyển ngay khi biết, không chờ hết chu kỳ.',
    'Chuyển ca khi mình không còn giữ được sự bình tĩnh nghề nghiệp với ca ấy: thấy sợ, thấy giận, thấy quá gắn bó tới mức không nhìn được dữ liệu. Nói ra điều này là dấu hiệu chuyên nghiệp, không phải dấu hiệu yếu.',
    'Chuyển ca khi ca vượt năng lực của mình, hoặc khi ca chạm tới nhóm vấn đề mà mình chưa được đào tạo. Báo quản lý chuyên môn trong ngày, bàn giao bằng hồ sơ chứ không bằng lời.',
    'Rời khỏi hệ thì không mang theo hồ sơ, dữ liệu, danh sách gia đình hay tài liệu nội bộ dưới bất kỳ hình thức nào, và không liên hệ với gia đình học viên cũ để mời dịch vụ riêng.'
  ];

  /* ── 8 · Dấu hiệu một Coach đang xuống · mười hai mục ──────
     Xuống khác với kém. Người kém thì đào tạo; người đang xuống
     thì phải bắt được sớm, vì họ vốn đã giỏi và không ai ngờ.    */
  G.NG_HONG = [
    { t: 'Điểm dự giờ trôi xuống ba kỳ liền',
      dau: 'Không kỳ nào tụt mạnh, nhưng đường cong đi xuống đều: 88, 79, 71.',
      phanh: 'Quản lý chuyên môn mở đường cong ra cùng nhìn theo kịch bản PH-5. Nhìn xu hướng, đừng cãi nhau về một buổi lẻ.' },

    { t: 'Đường cong hỗ trợ đi ngang hoặc đi lên',
      dau: 'Các ca của người ấy sau mười hai tháng vẫn cần đúng số buổi như lúc đầu, có ca còn cần nhiều hơn.',
      phanh: 'Rà ba ca bất kỳ và hỏi một câu: việc gì trong buổi này học viên đã tự làm được mà Coach vẫn đang làm hộ? Cắt đúng một việc đó.' },

    { t: 'Ghi biên bản bằng tính từ',
      dau: 'Biên bản đầy chữ lười, bướng, ngoan, tiến bộ nhiều. Không còn giờ, không còn số lần.',
      phanh: 'Trả lại biên bản, yêu cầu viết lại bằng dữ kiện. Ba lần trả lại trong một tháng thì cho học lại K1.' },

    { t: 'Không còn ghi lại lần mình sai',
      dau: 'Sổ lỗi cá nhân trắng trơn nhiều tháng, trong khi số ca không giảm.',
      phanh: 'Hỏi trong buổi phản hồi gần nhất: lần gần nhất anh chị thấy mình sai là khi nào? Không trả lời được là dấu hiệu nặng hơn cả điểm thấp.' },

    { t: 'Nói nhiều hơn hẳn so với chính mình năm ngoái',
      dau: 'Tỷ lệ nói trên băng tăng từ 30% lên quá 50%. Thường đi kèm với việc lớp yên hơn.',
      phanh: 'Đếm phút trên hai băng cách nhau một năm, cho người ấy tự đếm. Con số thuyết phục hơn lời nhận xét.' },

    { t: 'Gia đình gắn với người, không gắn với hệ',
      dau: 'Phụ huynh nói “tôi chỉ tin cô ấy thôi”, và từ chối mọi người thay thế. Coach kể lại điều đó như một lời khen.',
      phanh: 'Đưa người thứ hai vào ca theo lịch, không đợi tới lúc phải đổi. Ca chỉ một người vào được là ca đang có rủi ro, không phải ca đang tốt.' },

    { t: 'Bắt đầu có ngoại lệ riêng',
      dau: 'Một quy trình được bỏ qua “vì ca này đặc biệt”. Lần đầu có giải thích, lần sau không còn giải thích nữa.',
      phanh: 'Ghi ngoại lệ vào sổ, có ngày và có lý do, và rà lại trong họp tháng. Ngoại lệ không được ghi thì tháng sau thành thói quen.' },

    { t: 'Né dự giờ',
      dau: 'Hoãn lịch dự giờ hai lần liên tiếp với lý do hợp lý. Hoặc chỉ mời dự những buổi mình chắc chắn tốt.',
      phanh: 'Lịch dự giờ do người chấm chọn buổi, không do người dạy chọn. Hoãn lần thứ hai thì quản lý chuyên môn dự trực tiếp.' },

    { t: 'Ôm quá tải mà không nói',
      dau: 'Vượt trần tải, làm cả ngày nghỉ, trả lời tin nhắn lúc nửa đêm, và coi đó là tận tâm.',
      phanh: 'Cắt tải xuống dưới trần ngay trong tuần, không chờ người ấy đồng ý. Đây là việc của quản lý, không phải việc của người đang kiệt sức.' },

    { t: 'Hết học',
      dau: 'Mười hai tháng không dự một buổi bồi dưỡng nào, không đóng góp mục nào vào kho, không đọc ca của người khác.',
      phanh: 'Giao một việc dạy lại: kèm một Coach tập sự hoặc soạn một mục cho kho. Dạy lại là cách nhanh nhất phát hiện mình đã quên gì.' },

    { t: 'Giọng nói về học viên đổi',
      dau: 'Từ mô tả hành vi chuyển sang phán xét con người. Xuất hiện chữ “bọn trẻ bây giờ” và chữ “vô phương”.',
      phanh: 'Đây thường là dấu hiệu kiệt sức, không phải dấu hiệu đổi tính. Giảm tải trước, nói chuyện chuyên môn sau.' },

    { t: 'Một mình biết một thứ trong hệ',
      dau: 'Chỉ người ấy biết cách chạy một quy trình, giữ một tệp, hoặc liên hệ một đầu mối. Không ai khác mở được.',
      phanh: 'Yêu cầu viết ra và chuyển giao trong 30 ngày, có người nhận đích danh. Việc này bảo vệ chính người ấy trước tiên.' }
  ];

  /* ── 9 · Mười tám luật giữ chuẩn nghề ──────────────────────── */
  G.NG_LUAT = [
    'Người chưa có kết luận xác minh lý lịch tư pháp bằng văn bản thì không ở cùng phòng với trẻ, ở bất kỳ vai nào, kể cả vai quan sát. Không có ngoại lệ vì thâm niên, vì quen biết, hay vì lớp đang thiếu người.',
    'Người chưa qua nhập môn thì không đứng lớp, kể cả buổi khai giảng, kể cả khi đứng cùng người khác.',
    'Trong 90 ngày thử việc, không ai đứng lớp một mình.',
    'Vòng tình huống an toàn khi tuyển chỉ có đạt hoặc không đạt. Sai một tình huống an toàn là dừng, bất kể các vòng trước tốt tới đâu.',
    'Mỗi Coach được dự giờ tối thiểu hai lần một năm, và buổi dự giờ do người chấm chọn, không do người dạy chọn.',
    'Ngưỡng đạt phiếu dự giờ là 80 trên 100. Phần an toàn và ranh giới bằng 0 thì cả phiếu không đạt, bất kể tổng điểm.',
    'Dưới ngưỡng thì được dự giờ lại trong 30 ngày, kèm một kế hoạch viết ra có tên người kèm. Dưới ngưỡng hai lần liên tiếp thì tạm dừng nhận ca mới cho tới khi qua.',
    'Người chấm không được là người đang bảo trợ trực tiếp người bị chấm. Hai phiếu lệch quá 15 điểm thì mời người chấm thứ ba, không lấy trung bình.',
    'Người chấm sai thì sửa phiếu công khai và ghi rõ lý do. Nhưng không bao giờ sửa điểm chỉ vì người bị chấm phản ứng gay gắt.',
    'Phản hồi sau dự giờ trong 48 giờ, nói riêng, và mỗi lần chốt đúng một việc để đổi. Ba việc nghĩa là không việc nào.',
    'Thang chấm phải được hiệu chuẩn mỗi quý: mọi người chấm cùng xem một băng và chấm độc lập. Lệch quá 10 điểm thì ngồi lại thống nhất trước khi đi chấm thật.',
    'Không ai lên bậc bằng số ca ôm được. Lên bậc bằng bằng chứng rằng ca của mình cần mình ít đi mà kết quả không tụt.',
    'Coach trưởng chỉ được công nhận sau khi nhóm chạy trọn một tháng vắng mình mà điểm dự giờ trung bình không tụt quá 5 điểm. Bài kiểm này phải được thi thật, không miễn.',
    'Mỗi vai trong hệ phải có tên một người đang học để nhận vai ấy. Vai nào chỉ một người làm được thì đó là một lỗi vận hành, không phải một thành tích cá nhân.',
    'Chứng nhận nghề gắn với người và có thời hạn. Hết hạn mà chưa bồi dưỡng lại thì dừng đứng lớp, không gia hạn tạm.',
    'Trần tải ghi trong quy chế. Vượt trần phải có quyết định bằng văn bản kèm ngày kết thúc.',
    'Nghi ngờ một người của hệ vi phạm ranh giới với trẻ: đình chỉ trước, điều tra sau. Không hoà giải nội bộ, không thoả thuận riêng với gia đình, không viện thâm niên hay kỳ nghiệm thu sắp tới.',
    'Mọi con số trong kho này — ngưỡng, mốc ngày, số buổi — là con số vận hành do Hội đồng Chuyên môn duyệt và rà lại hằng năm. Danh mục giấy tờ xác minh nhân sự phải rà theo quy định hiện hành trước mỗi đợt tuyển, không chép lại từ đợt trước.'
  ];

})(window.GV = window.GV || {});
