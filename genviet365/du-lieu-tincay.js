/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · KHO BẰNG CHỨNG VÀ TIN CẬY
   Một hệ nói về nhân tài mà không chứng minh được mình có tác dụng
   thì cũng chỉ là một niềm tin dễ chịu. Kho này nói về cách đo tác
   động thật, cách bảo vệ trẻ, cách xử khủng hoảng, giấy tờ phải có,
   và một thứ hiếm nơi nào dám làm: sổ ghi lỗi công khai.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Ba tầng bằng chứng ─────────────────────────────────
     Phần lớn tổ chức giáo dục dừng ở tầng một rồi gọi đó là kết
     quả. Tầng một gần như vô giá trị khi người trả lời biết mình
     đang được hỏi để đánh giá chính nơi mình đã trả tiền. */
  G.TC_TANG_BC = [
    { so: '1', t: 'Tự thuật · YẾU', n: 'Phụ huynh hoặc học viên tự nói mình thấy tốt hơn.',
      v: 'Nhiễm nặng ba thứ: lịch sự, thiên lệch xác nhận, và tiếc tiền đã bỏ. Dùng được để bắt tín hiệu sớm, không dùng được để kết luận.' },
    { so: '2', t: 'Quan sát bên thứ ba · KHÁ', n: 'Giáo viên chủ nhiệm, huấn luyện viên, hàng xóm, người nhận việc — người không trả tiền và không nhận tiền.',
      v: 'Mạnh hơn hẳn tầng một. Điều kiện: người quan sát phải *không biết* con đang tham gia chương trình nào, hoặc ít nhất không có lợi ích gì.' },
    { so: '3', t: 'Hành vi đo được ngoài hệ · MẠNH', n: 'Thứ đếm được, xảy ra ở nơi hệ không có mặt: số lần được giao việc lớp, số việc nhà tự làm không nhắc, số dự án có người ngoài ký.',
      v: 'Đây là tầng duy nhất chứng minh được tác động. Mọi công bố của hệ phải nêu rõ số liệu thuộc tầng nào — nhập nhèm tầng là một hình thức nói dối.' }
  ];

  G.TC_CHI_SO = [
    ['Việc được giao ở lớp', 'Số lần con được giáo viên giao một việc có trách nhiệm trong học kỳ', 'Sổ chủ nhiệm hoặc phiếu xác nhận', 'Trụ Chủ · Dũng'],
    ['Đánh giá của giáo viên chủ nhiệm', 'Ba câu hỏi cố định, hỏi đầu và cuối năm học', 'Phiếu có chữ ký, không qua phụ huynh', 'Cả bốn trụ'],
    ['Việc nhà tự làm không nhắc', 'Số việc/tuần, phụ huynh ghi vào bảng có sẵn', 'Bảng tuần trong sổ 90 ngày', 'Trụ Chủ'],
    ['Số lần con chủ động nhận lỗi', 'Đếm bởi phụ huynh, không nói cho con biết đang đếm', 'Bảng tuần', 'Trụ Đức'],
    ['Số người con đã giúp', 'Phiếu “tôi đã giúp” có chữ ký người nhận', 'Hộ chiếu, mục bằng chứng ngoài', 'Trụ Đức · Chí'],
    ['Dự án hoàn thành có nghiệm thu ngoài', 'Số dự án/năm, có biên bản của người ngoài hệ', 'Hộ chiếu, mục dự án', 'Trụ Trí · Chí'],
    ['Điểm rèn luyện và kỷ luật ở trường', 'Xu hướng ba học kỳ liên tiếp', 'Học bạ', 'Trụ Đức · Chủ'],
    ['Giờ màn hình ngoài học tập', 'Trung bình phút/ngày, đo bằng chính máy của con', 'Ảnh chụp màn hình thống kê máy', 'Trụ Chủ']
  ];

  G.TC_THIET_KE = [
    { b: '1', t: 'Đo trước khi bắt đầu', ai: 'Người đánh giá, không phải người sẽ dạy',
      n: 'Bộ test đầu vào và tám chỉ số ngoài hệ, đo trong tuần thử. Không có số nền thì mọi con số sau này vô nghĩa.',
      ra: 'Bản đọc ca một trang, và một dòng số nền cho từng chỉ số' },
    { b: '2', t: 'Có nhóm so sánh', ai: 'Quản lý chuyên môn',
      n: 'Danh sách chờ là nhóm so sánh tự nhiên và hợp đạo đức: những gia đình đã đăng ký nhưng chưa tới lượt. Đo họ cùng lúc, cùng bộ câu hỏi.',
      ra: 'Hai đường số song song, không phải một đường đơn độc' },
    { b: '3', t: 'Người đo không phải người dạy', ai: 'Chuyên gia đánh giá (R11)',
      n: 'Coach đang kèm con không được chấm hộ chiếu của chính con mình ở cổng nghiệm thu. Đây là luật, không phải thông lệ.',
      ra: 'Biên bản chấm có tên người chấm, khác tên người kèm' },
    { b: '4', t: 'Đo lại đúng mốc, không đo khi thuận lợi', ai: 'Quản lý chuyên môn',
      n: 'Mốc cố định từ đầu: ngày 90, ngày 180, ngày 365. Không dời mốc vì kết quả chưa đẹp — dời mốc là gian lận số liệu.',
      ra: 'Lịch đo công bố từ đầu chu kỳ' },
    { b: '5', t: 'Công bố cả phần không đạt', ai: 'Giám đốc điều hành',
      n: 'Báo cáo năm nêu cả chỉ số đi xuống và số gia đình rời hệ, kèm lý do. Chọn lọc số liệu là cách nhanh nhất để mất thứ đang cố xây.',
      ra: 'Báo cáo năm có mục *những gì chúng tôi chưa làm được*' }
  ];

  G.TC_LUAT_DO = [
    'Mọi con số công bố phải ghi rõ *thuộc tầng bằng chứng nào* và *cỡ mẫu bao nhiêu*.',
    'Không bao giờ công bố phần trăm mà giấu mẫu số. “95% phụ huynh hài lòng” trên 20 người là một câu vô nghĩa.',
    'Không dùng lời khen của phụ huynh làm bằng chứng tác động. Lời khen là bằng chứng về cảm nhận, không phải về kết quả.',
    'Ca thành công được kể thì ca thất bại cũng phải được kể, trong cùng một tài liệu.',
    'Người chấm không được là người kèm. Người đánh giá tác động không được là người bán hàng.',
    'Số liệu thô được giữ tối thiểu 10 năm và mở cho ngoại kiểm.'
  ];

  /* ── 2 · Theo dõi dọc ba mươi năm ───────────────────────────
     Đây là tài sản mà không đối thủ nào sao chép được trong ngắn
     hạn, vì thứ duy nhất tạo ra nó là thời gian. Bắt đầu từ khoá
     đầu tiên, năm 2026. */
  G.TC_THEO_DOI = [
    { m: 'Năm 1', t: 'Sau khi rời chương trình 12 tháng', v: ['Tám chỉ số ngoài hệ, đo lại đủ bộ', 'Ba câu hỏi cho giáo viên chủ nhiệm mới', 'Con còn giữ hộ chiếu không, có ghi thêm dòng nào không'] },
    { m: 'Năm 3', t: 'Cuối cấp hoặc chuyển cấp', v: ['Định hướng nghề nghiệp có rõ hơn không', 'Số hoạt động con tự khởi xướng', 'Con còn liên lạc với ai trong tổ cũ không'] },
    { m: 'Năm 5', t: 'Vào đại học hoặc vào nghề', v: ['Lựa chọn có khớp với mũi nhọn đã nhận diện năm B3 không', 'Con có từng dẫn một nhóm nào không', 'Thu nhập và tự chủ tài chính — hỏi tự nguyện'] },
    { m: 'Năm 10', t: 'Đi làm ổn định', v: ['Vị trí, mức trách nhiệm, số người con đang dẫn', 'Con có quay lại kèm ai trong hệ không', 'Con đánh giá lại: điều gì ở chương trình còn dùng được tới hôm nay'] },
    { m: 'Năm 20', t: 'Giữa sự nghiệp', v: ['Đóng góp cộng đồng đo được', 'Con có cho con của mình vào hệ không — chỉ số trung thực nhất trong tất cả', 'Phỏng vấn sâu, ghi hình, lưu trữ'] },
    { m: 'Năm 30', t: 'Khép vòng 2056', v: ['Hệ số tự tái tạo thật: bao nhiêu người của khoá đầu đang rèn thế hệ sau', 'Công bố toàn bộ dữ liệu ba mươi năm, ẩn danh, cho giới nghiên cứu', 'Đây là lúc trả lời được câu hỏi mà tất cả bắt đầu từ đó'] }
  ];

  G.TC_LUAT_TD = [
    'Đồng thuận theo dõi dọc là *tự nguyện*, ký riêng, và rút được bất cứ lúc nào mà không mất quyền lợi nào.',
    'Người đã thành niên tự ký lại đồng thuận của mình ở tuổi 18 — đồng thuận của cha mẹ hết hiệu lực từ đó.',
    'Dữ liệu theo dõi dọc được tách khỏi dữ liệu vận hành, mã hoá, và chỉ hai người trong hệ có khoá.',
    'Không bao giờ dùng dữ liệu theo dõi dọc để bán hàng cho chính người đó hoặc gia đình họ.',
    'Công bố luôn ở dạng tổng hợp, ẩn danh. Không ca nào được kể ra nếu người trong ca chưa đồng ý bằng văn bản.'
  ];

  /* ── 3 · Kiểm định ─────────────────────────────────────────── */
  G.TC_KIEM_DINH = [
    ['Dự giờ', 'Quản lý chuyên môn', 'Mỗi Coach ≥1 lần/quý, có ít nhất 1 lần đột xuất', '≥16/20', 'Dưới ngưỡng: kèm cặp 4 tuần rồi dự lại. Hai lần liên tiếp dưới ngưỡng: dừng đứng lớp'],
    ['Hồ sơ hộ chiếu', 'Chuyên gia đánh giá (R11)', 'Rà 20% hồ sơ ngẫu nhiên mỗi quý', 'Không quá 5% dòng thiếu bằng chứng', 'Trên 5%: rà 100% và tạm dừng cấp bậc ở chi hội đó'],
    ['Cổng nghiệm thu', 'Hội đồng 3 người, có 1 người ngoài chi hội', 'Mỗi kỳ nghiệm thu', 'Người chấm khác người kèm — tuyệt đối', 'Vi phạm: huỷ kết quả kỳ đó, chấm lại toàn bộ'],
    ['Sổ phàn nàn', 'Giám đốc điều hành', 'Hằng tháng', 'Không phàn nàn nào quá 14 ngày chưa đóng', 'Quá hạn: đưa vào biên bản họp tháng, nêu tên người chịu trách nhiệm'],
    ['Khảo sát phụ huynh', 'Đơn vị ngoài, không phải người của học viện', '2 lần/năm', 'Chỉ số tiến cử thuần ≥40', 'Dưới ngưỡng: dừng tuyển sinh mới cho tới khi sửa xong'],
    ['An toàn cơ sở và trại', 'Người phụ trách an toàn', 'Trước mỗi hoạt động ngoài cơ sở', 'Đủ 100% mục trong danh mục', 'Thiếu bất kỳ mục nào: hoãn hoạt động, không có ngoại lệ'],
    ['Ngoại kiểm toàn hệ', 'Hội đồng ngoài: 1 chuyên gia giáo dục, 1 chuyên gia bảo vệ trẻ em, 2 phụ huynh đại diện', '1 lần/năm', 'Báo cáo được công bố nội bộ nguyên văn', 'Khuyến nghị phải có kế hoạch xử lý trong 30 ngày, kèm người chịu trách nhiệm']
  ];

  /* ── 4 · Bảo vệ trẻ em ─────────────────────────────────────
     Mười luật đỏ. Không có mức phạt trung gian cho luật đỏ:
     vi phạm là chấm dứt, và điều tra sau khi đã đình chỉ. */
  G.TC_BAO_VE = [
    '*Không bao giờ một người lớn ở một mình với một trẻ trong phòng kín.* Kèm 1–1 luôn diễn ra ở phòng có kính, hoặc cửa mở, hoặc có người thứ ba trong tầm nhìn.',
    'Không nhắn tin riêng với học viên dưới 16 tuổi. Mọi trao đổi đi qua nhóm có phụ huynh hoặc có người thứ hai của hệ.',
    'Không chở trẻ một mình bằng xe riêng, kể cả khi phụ huynh nhờ.',
    'Không tiếp xúc thân thể ngoài những gì cần cho an toàn. Ôm, xoa đầu, nắm tay — chỉ khi trẻ chủ động và có người khác nhìn thấy.',
    'Không chụp và đăng ảnh trẻ khi chưa có đồng thuận văn bản của phụ huynh. Rút đồng thuận thì gỡ trong 48 giờ.',
    'Mọi người tiếp xúc với trẻ phải có *lý lịch tư pháp* còn hạn và hồ sơ nhân sự đầy đủ trước buổi đầu tiên.',
    'Không kỷ luật bằng cách bêu tên, cô lập, hoặc phạt thân thể dưới bất kỳ hình thức nào — kể cả “chạy vòng sân cho tỉnh”.',
    'Không hỏi trẻ về chuyện riêng trong gia đình ngoài mức cần cho việc kèm cặp. Nghe được thì ghi và báo, không khai thác thêm.',
    'Nghi ngờ trẻ bị xâm hại hoặc bạo hành ở bất cứ đâu: báo giám đốc điều hành *trong ngày*, và theo quy trình chuyển tuyến — không tự điều tra, không tự hoà giải.',
    'Nghi ngờ một người của hệ vi phạm: *đình chỉ trước, điều tra sau*. Không có ngoại lệ vì thâm niên, vì chức vụ, vì “sắp tới kỳ nghiệm thu”.'
  ];

  G.TC_DU_LIEU = [
    { t: 'Thu tối thiểu', n: 'Chỉ thu thứ dùng cho việc kèm. Không thu nghề nghiệp, thu nhập, tôn giáo của gia đình.', vi: 'Câu hỏi kiểm: trường dữ liệu này phục vụ quyết định nào? Không trả lời được thì bỏ trường đó.' },
    { t: 'Giữ có hạn', n: 'Dữ liệu vận hành giữ 3 năm sau khi rời hệ. Hộ chiếu giữ 30 năm nếu gia đình đồng ý, xoá ngay nếu không.', vi: 'Ngày xoá được đặt lịch tự động, không phụ thuộc ai nhớ.' },
    { t: 'Ai xem được', n: 'Coach đang kèm và quản lý chuyên môn. Không ai khác, kể cả ban giám đốc, trừ khi có lý do ghi vào nhật ký.', vi: 'Mọi lần xem đều để lại dấu vết. Nhật ký truy cập được rà hằng quý.' },
    { t: 'Quyền của gia đình', n: 'Xin bản sao toàn bộ trong 7 ngày · yêu cầu sửa thông tin sai · yêu cầu xoá khi rời hệ.', vi: 'Không thu phí cho các quyền này, không hỏi lý do.' },
    { t: 'Khi rò rỉ', n: 'Báo cho gia đình bị ảnh hưởng trong 72 giờ, nói rõ dữ liệu nào, ai có thể đã xem, đã làm gì.', vi: 'Báo trước khi kịp biết đủ mọi thứ. Báo muộn để “nắm rõ tình hình” là cách mất niềm tin vĩnh viễn.' },
    { t: 'Trẻ tự quyết từ 16 tuổi', n: 'Từ 16 tuổi, học viên được xem toàn bộ dữ liệu của mình và có tiếng nói về việc chia sẻ.', vi: 'Từ 18 tuổi, quyền quyết định chuyển hẳn cho chính người ấy.' }
  ];

  /* ── 5 · Năm cấp khủng hoảng ──────────────────────────────── */
  G.TC_KHUNG_HOANG = [
    { t: 'Cấp 1 · Phàn nàn đơn lẻ', dau: 'Một gia đình không hài lòng về một buổi, một câu nói, một lần chậm trễ.',
      phanh: 'Quản lý chuyên môn xử theo năm bước phục hồi dịch vụ. Trong 48 giờ. Ghi sổ. Không cần báo lên.' },
    { t: 'Cấp 2 · Lặp lại có hệ thống', dau: 'Ba phàn nàn cùng loại trong một tháng, hoặc cùng một người bị phàn nàn hai lần.',
      phanh: 'Giám đốc điều hành vào cuộc. Dừng phần đang hỏng lại, sửa quy trình, rồi mới chạy tiếp. Báo cáo trong họp tháng.' },
    { t: 'Cấp 3 · Sự cố an toàn không nghiêm trọng', dau: 'Trẻ bị thương nhẹ, lạc trong hoạt động ngoài trời, xung đột giữa hai học viên gây tổn thương.',
      phanh: 'Báo gia đình *trước khi con về tới nhà*. Biên bản trong 24 giờ. Rà lại toàn bộ quy trình liên quan trong 7 ngày.' },
    { t: 'Cấp 4 · Nghi ngờ xâm hại hoặc vi phạm luật đỏ', dau: 'Bất kỳ dấu hiệu nào liên quan tới mười luật bảo vệ trẻ em.',
      phanh: 'Đình chỉ người liên quan *ngay*, trước khi điều tra. Báo giám đốc điều hành trong ngày. Theo quy trình chuyển tuyến. Không hoà giải nội bộ, không thoả thuận riêng với gia đình.' },
    { t: 'Cấp 5 · Khủng hoảng công khai', dau: 'Sự việc lan ra ngoài: mạng xã hội, báo chí, phụ huynh tập thể.',
      phanh: 'Một người phát ngôn duy nhất — người đứng đầu. Mọi người khác im lặng, kể cả để bênh vực. Áp dụng nguyên tắc 24 giờ vàng.' }
  ];

  G.TC_24H = [
    { b: '1', t: 'Sự thật trước', ai: 'Người đứng đầu', n: 'Nói ngay điều đã biết chắc, và nói rõ điều chưa biết. “Chúng tôi chưa biết” là một câu mạnh, “không có bình luận” là một câu chết.', ra: 'Thông báo đầu tiên trong 4 giờ' },
    { b: '2', t: 'Xin lỗi trước, giải thích sau', ai: 'Người đứng đầu', n: 'Xin lỗi người bị ảnh hưởng bằng tên, không xin lỗi “nếu có ai đó cảm thấy”. Không giải thích gì trong thông báo đầu tiên.', ra: 'Lời xin lỗi không kèm chữ “nhưng”' },
    { b: '3', t: 'Một người nói', ai: 'Người đứng đầu', n: 'Mọi nhân sự khác không phát ngôn, không đăng bài, không nhắn tin bênh vực trong nhóm phụ huynh. Bênh vực rời rạc là thứ làm khủng hoảng dài thêm gấp ba.', ra: 'Tin nhắn nội bộ gửi toàn đội trong 1 giờ' },
    { b: '4', t: 'Nói với người trong nhà trước người ngoài', ai: 'Giám đốc điều hành', n: 'Phụ huynh đang học và đội ngũ phải nghe từ mình trước khi nghe từ mạng xã hội.', ra: 'Thư gửi toàn bộ phụ huynh trong 12 giờ' },
    { b: '5', t: 'Việc cụ thể, ngày cụ thể', ai: 'Người đứng đầu', n: 'Nói mình sẽ làm gì, ai làm, xong ngày nào, và ai kiểm. Không hứa “sẽ rà soát toàn diện” — câu đó không có nghĩa gì.', ra: 'Cam kết có mốc, công bố công khai' },
    { b: '6', t: 'Quay lại báo kết quả', ai: 'Người đứng đầu', n: 'Đúng ngày đã hứa, báo đã làm gì — kể cả khi chưa xong. Im lặng sau khi hứa là cách xoá sạch thiện chí đã tạo ra.', ra: 'Báo cáo công khai đúng mốc đã hứa' }
  ];

  /* ── 6 · Giấy tờ phải có ─────────────────────────────────── */
  G.TC_PHAP_LY = [
    ['Giấy phép hoạt động giáo dục', 'Điều kiện để tồn tại hợp pháp', 'Bộ phận hành chính', 'Rà hạn 6 tháng một lần'],
    ['Hợp đồng dịch vụ với gia đình', 'Ghi rõ: nội dung, học phí, điều kiện hoàn, ba lớp bảo đảm, quyền dữ liệu, quyền chấm dứt của cả hai bên', 'Bản gia đình giữ, bản hệ lưu', 'Cập nhật khi đổi gói hoặc đổi chính sách'],
    ['Đồng thuận hình ảnh', 'Tách riêng khỏi hợp đồng, có ô chọn từng mục, rút được bất cứ lúc nào', 'Sổ đồng thuận', 'Xác nhận lại hằng năm'],
    ['Đồng thuận dữ liệu và theo dõi dọc', 'Tự nguyện, ký riêng, người đủ 18 tuổi tự ký lại', 'Kho mã hoá riêng', 'Ký lại ở mốc 18 tuổi'],
    ['Bảo hiểm tai nạn cho học viên', 'Bắt buộc với mọi hoạt động ngoài cơ sở', 'Bộ phận hành chính', 'Kiểm trước mỗi trại'],
    ['Lý lịch tư pháp của nhân sự', 'Bắt buộc trước buổi đầu tiên tiếp xúc trẻ, không có ngoại lệ', 'Hồ sơ nhân sự', 'Làm mới 3 năm một lần'],
    ['Quy chế nội bộ và bộ quy tắc ứng xử', 'Mười luật bảo vệ trẻ, bảy luật an toàn, quy trình khiếu nại', 'Ký nhận từng người', 'Ký lại hằng năm'],
    ['Hồ sơ an toàn từng hoạt động', 'Danh mục kiểm, người trực từng ca, số điện thoại khẩn, phương án y tế', 'Người phụ trách an toàn', 'Lập mới cho từng hoạt động'],
    ['Sổ phàn nàn và sổ sự cố', 'Ghi mọi việc, kể cả việc đã xử xong', 'Giám đốc điều hành', 'Đọc trong họp tháng'],
    ['Biên bản ngoại kiểm', 'Công bố nội bộ nguyên văn, kèm kế hoạch xử lý', 'Lưu trữ vĩnh viễn', 'Hằng năm']
  ];

  /* ── 7 · Câu hỏi thường gặp ───────────────────────────────── */
  G.TC_FAQ = [
    { nhom: 'Phụ huynh mới', mau: '#185AB4', ds: [
      { h: 'Con mấy tuổi thì vào được?', d: 'Từ 9 tuổi. Dưới 9 tuổi các trục về ý chí và trách nhiệm chưa đo được đáng tin, nên hệ không nhận — nhận sớm là lấy tiền mà không giao được kết quả.' },
      { h: 'Có phải học thêm không, con bận lắm rồi?', d: 'Ba phần tư phần rèn nằm ở nơi con vốn đã có mặt: lớp học, nhà, hoạt động ở trường. Phần đến lớp là 90 phút một tuần.' },
      { h: 'Con nhút nhát thì có hợp không?', d: 'Hợp. Đó là điểm xuất phát phổ biến nhất. B1 không bắt ai nói trước đám đông — việc đầu tiên là việc con làm một mình và có người ngoài ký nhận.' },
      { h: 'Bao lâu thì thấy khác?', d: 'Tuần 6 có bảng đối chiếu đầu tiên với bằng chứng cụ thể. Ai hứa thấy khác sau ba buổi thì đang hứa thứ họ không kiểm soát được.' },
      { h: 'Nếu con không thích thì sao?', d: 'Bảy ngày đầu hoàn 100%, không hỏi lý do. Sau đó nếu con muốn nghỉ, Coach nói chuyện với *con* trước, không qua phụ huynh.' },
      { h: 'Học phí có giảm được không?', d: 'Không. Giá công khai và không mặc cả. Gia đình khó khăn thì đi qua quỹ học bổng, có quy trình và có hội đồng.' },
      { h: 'Bên mình có cam kết gì bằng văn bản không?', d: 'Mười hai cam kết dịch vụ, mỗi cam kết có ngưỡng đo và thứ đền khi không giữ được — đền tự động, không cần đòi.' },
      { h: 'Người dạy con là ai?', d: 'Coach đã qua bảy năng lực nghề K1–K7, có lý lịch tư pháp, và đạt ≥16/20 chuẩn dự giờ trong 90 ngày gần nhất. Gia đình được xem hồ sơ này trước khi ký.' } ] },

    { nhom: 'Phụ huynh đang học', mau: '#0B6675', ds: [
      { h: 'Sao con tôi chưa lên bậc mà bạn cùng lớp đã lên?', d: 'Bậc đổi bằng bằng chứng, không bằng thời gian. Hệ sẽ chỉ rõ trục nào còn thiếu và kế hoạch bù — nhưng không so hai cháu với nhau, cả trong lời nói lẫn trong báo cáo.' },
      { h: 'Tôi không hài lòng với Coach thì làm sao?', d: 'Gọi đường dây tới quản lý chuyên môn, không qua Coach ấy. Đổi Coach được, trong tuần, không cần giải thích dài.' },
      { h: 'Con vắng nhiều thì có bị mất bậc không?', d: 'Không mất bậc đã đạt. Nhưng vắng trên 15% thì không xét bảo đảm 90 ngày — và hệ vẫn phải trả lời vì sao con vắng nhiều.' },
      { h: 'Tôi muốn xem toàn bộ dữ liệu của con?', d: 'Xin bản sao đầy đủ, có trong 7 ngày, miễn phí, không hỏi lý do.' },
      { h: 'Con tôi bị bạn trong tổ trêu thì xử thế nào?', d: 'Xử ngay trong buổi theo luật chi hội, và báo lại cả hai gia đình trong 24 giờ. Không có chuyện “trẻ con ấy mà”.' },
      { h: 'Tạm dừng một thời gian được không?', d: 'Được, bảo lưu tối đa 6 tháng, giữ nguyên bậc và giữ chỗ trong tổ.' } ] },

    { nhom: 'Học viên', mau: '#5140B4', ds: [
      { h: 'Em không thích nói trước đám đông thì sao?', d: 'Không ai bắt em nói trước đám đông ở B1 và B2. Đến B3 thì có, nhưng lúc đó em đã làm được nhiều việc rồi — nói về việc mình đã làm thì dễ hơn nhiều.' },
      { h: 'Em làm hỏng một việc thì có bị trừ điểm không?', d: 'Không. Việc hỏng mà được làm lại trong 14 ngày thì tính là bằng chứng, đôi khi mạnh hơn việc làm đúng ngay lần đầu.' },
      { h: 'Hộ chiếu là của em hay của học viện?', d: 'Của em. Em rời hệ thì mang theo bản đầy đủ, có dấu, không ai giữ lại gì.' },
      { h: 'Em muốn đổi tổ được không?', d: 'Được, nhưng nói chuyện trước đã. Đổi tổ khi chưa có bạn thì tổ mới cũng vậy.' },
      { h: 'Em xong B6 rồi thì sao?', d: 'Em thành người rèn người tiếp theo. Đó là đích của cả hệ, và là lý do hệ này sống được ba mươi năm.' } ] },

    { nhom: 'Nhà trường và giáo viên', mau: '#0B7350', ds: [
      { h: 'Chương trình này chiếm bao nhiêu thời gian của trường?', d: 'Tuỳ mô hình: một tiết kỹ năng sống mỗi tuần, hoặc một buổi câu lạc bộ ngoài giờ. Mô hình đào tạo giáo viên chủ nhiệm thì không chiếm giờ nào của học sinh.' },
      { h: 'Giáo viên của trường phải làm thêm gì?', d: 'Không làm thêm. Mô hình M1 nhằm để lớp tự quản được nhiều hơn — mục tiêu là giáo viên chủ nhiệm *bớt* việc, không phải thêm việc.' },
      { h: 'Có báo cáo cho phòng chuyên môn được không?', d: 'Có, theo mẫu của trường, nộp cuối mỗi học kỳ, kèm số liệu và sản phẩm của học sinh.' },
      { h: 'Nhà trường có phải trả phí không?', d: 'Gói dự án cộng đồng thì không. Ba gói còn lại có phí, và có thể đi qua nguồn xã hội hoá hoặc thoả thuận với hội phụ huynh.' } ] },

    { nhom: 'Người muốn làm Coach', mau: '#A8801F', ds: [
      { h: 'Cần bằng cấp gì?', d: 'Không bắt buộc bằng sư phạm. Bắt buộc: lý lịch tư pháp, qua bảy năng lực nghề K1–K7, và 90 ngày thử việc có dự giờ.' },
      { h: 'Thu nhập thế nào?', d: 'Theo bậc nghề, sáu bậc từ trợ giảng tới quản lý chuyên môn. Lương người kèm chiếm 38–45% doanh thu một học viên — đây là khoản hệ không cắt.' },
      { h: 'Bao lâu thì lên bậc nghề?', d: 'Không theo thâm niên. Theo hồ sơ: số ca đã kèm, kết quả dự giờ, số người mình đã đưa qua cổng nghiệm thu.' },
      { h: 'Có phải bán hàng không?', d: 'Không. Coach không nhận hoa hồng tuyển sinh, và không được nhận hoa hồng giới thiệu từ gia đình mình đang kèm. Đây là luật, để lời khuyên chuyên môn không bị mua.' } ] },

    { nhom: 'Người muốn mở chi hội', mau: '#BE0E16', ds: [
      { h: 'Điều kiện tối thiểu?', d: 'Đã đưa ≥3 người của mình qua B3, đã ngồi ghế ban điều hành ít nhất một nhiệm kỳ, và qua kiểm định K1–K7.' },
      { h: 'Cần bao nhiêu người để chi hội sống được?', d: 'Hoà vốn ở khoảng 24–30 thành viên đóng phí đều. Dưới 18 người thì kịch bản 90 phút mất chất.' },
      { h: 'Được cầm những gì?', d: 'Giáo trình, hộ chiếu, con dấu chi hội, quyền dùng tên. Học viện giữ cổng nghiệm thu và quyền cấp bậc — đây là thứ giữ cho chất không loãng.' },
      { h: 'Có được sửa giáo trình cho hợp địa phương không?', d: 'Sửa được phần hình thức và ví dụ. Không sửa được bảy thứ trong danh sách lõi bất biến.' },
      { h: 'Nếu chi hội không đạt chuẩn thì sao?', d: 'Kiểm định sáu tháng một lần. Không đạt thì có 90 ngày khắc phục; vẫn không đạt thì thu hồi quyền dùng tên trong 30 ngày.' } ] }
  ];

  /* ── 8 · Sổ ghi lỗi công khai ───────────────────────────────
     Rất ít tổ chức dám làm việc này. Đó chính là lý do nên làm:
     thứ ai cũng làm được thì không tạo ra niềm tin. */
  G.TC_SO_LOI = [
    { t: 'Vì sao có sổ này', n: 'Một hệ nói với trẻ rằng “sai thì nhận và làm lại” mà bản thân nó không dám ghi lại cái sai của mình thì đang dạy điều ngược với điều nó nói.', vi: 'Sổ được đọc trong họp tháng và trong buổi ngoại kiểm hằng năm. Phụ huynh đại diện được đọc bản đầy đủ.' },
    { t: 'Ghi gì', n: 'Ngày · lỗi gì · ai bị ảnh hưởng · đã sửa gì · *luật mới sinh ra từ lỗi này*.', vi: 'Cột cuối là cột quan trọng nhất. Lỗi không sinh ra luật mới thì sẽ lặp lại.' },
    { t: 'Không ghi gì', n: 'Không ghi tên trẻ. Không ghi chi tiết đủ để nhận ra một gia đình cụ thể.', vi: 'Minh bạch về mình, kín đáo về người khác.' },
    { t: 'Ai được đọc', n: 'Toàn đội ngũ · hội đồng ngoại kiểm · phụ huynh đại diện. Bản tóm tắt vào báo cáo năm.', vi: 'Không đăng công khai ra ngoài — minh bạch không đồng nghĩa với phô bày.' }
  ];

  G.TC_LOI_MAU = [
    ['Trao hộ chiếu ở bàn lễ tân cho nhanh', 'Ba gia đình khoá đầu', 'Làm bù nghi thức trong tuần kế tiếp', 'Nghi thức trao hộ chiếu không được rút gọn vì lý do thời gian — nếu không kịp thì dời, không làm tắt'],
    ['Thư tuần viết chung chung, không có tên con', 'Toàn bộ một chi hội trong 4 tuần', 'Viết lại 4 tuần, gửi bù', 'Mỗi thư tuần phải có tên con trong mọi câu; quản lý đọc ngẫu nhiên 3 thư mỗi tuần'],
    ['Coach chấm hộ chiếu của chính học viên mình kèm', 'Một kỳ nghiệm thu, 11 hồ sơ', 'Huỷ kết quả, chấm lại toàn bộ bởi người ngoài', 'Người chấm khác người kèm — đưa thành luật cứng, phần mềm chặn ở tầng quyền'],
    ['Đăng ảnh nhóm có mặt cháu chưa ký đồng thuận', 'Một gia đình', 'Gỡ trong 6 giờ, thư xin lỗi của người đứng đầu', 'Sổ đồng thuận phải rà trước mỗi lần đăng, không rà sau'],
    ['Giảm giá riêng cho một gia đình để giữ chân', 'Cả chi hội, khi việc lộ ra', 'Đưa toàn bộ về giá chuẩn, lập quỹ học bổng có quy trình', 'Không giảm giá riêng lẻ trong bất kỳ trường hợp nào; khó khăn thì đi qua quỹ'],
    ['Hoãn cổng nghiệm thu vì kết quả chưa đẹp', 'Cả khoá, 23 học viên', 'Chấm đúng lịch cũ, công bố cả phần không đạt', 'Mốc đo cố định từ đầu chu kỳ; dời mốc là gian lận số liệu, xử như vi phạm nghiêm trọng']
  ];

})(window.GV = window.GV || {});
