/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT · LỘ TRÌNH CÁ NHÂN
   BIÊN SOẠN MỚI — lớp chi tiết này không có trong kho gốc.
   Tên và thứ tự mười lăm giai đoạn giữ nguyên theo `du-lieu-tuyen.js`
   (GV.TY_GIAI_DOAN). Cần Hội đồng Chuyên môn duyệt.

   Kho gốc đã có: mục đích, câu hỏi, mốc 90 ngày và cách đo của từng
   giai đoạn (TY_GIAI_DOAN); ánh xạ giai đoạn ↔ bậc (TY_ANH_XA_BAC);
   lộ trình bậc theo chu kỳ (GV.LO_TRINH); hành trình cảm xúc của
   gia đình (TN_HANH_TRINH). Thứ chưa có — và là thứ tệp này viết ra —
   là lớp dùng được hằng tuần: em ở giai đoạn này TRÔNG NHƯ THẾ NÀO,
   ba việc làm mỗi tuần, người lớn làm gì và KHÔNG làm gì, em mắc kẹt
   ở đâu và gỡ ra sao, một năm nhìn theo tháng, và đường từ bậc 5–6
   sang nghề.

   Hai luật của hệ được tuân trong toàn bộ tệp này:
   · Mười lăm giai đoạn là thang NỘI DUNG và là thang chuẩn.
     Sáu bậc là thang QUYỀN. Không trộn hai thang (xem TY_ANH_XA_LUAT).
   · Nâng theo bằng chứng, không theo thời gian. Mọi can thiệp nhắm
     tới việc tự xoá mình — người lớn ngày càng ít phải có mặt.

   Một chỗ lệch trong kho gốc, ghi lại để Hội đồng xử, KHÔNG tự sửa:
   tên sáu bậc ở `du-lieu.js` (GV.BAC) và `du-lieu-quyen.js` (GV.BAC_MO)
   là HẠT · MẦM · THÂN · TRỤ · NGƯỜI DẪN · KIẾN TRÚC SƯ, còn cột tên
   trong TY_ANH_XA_BAC là HẠT · MẦM · RỄ · THÂN · TÁN · QUẢ. Tệp này
   dùng bộ tên của GV.BAC và GV.BAC_MO — vì đó là nơi bậc quyền được
   định nghĩa — và dùng khoảng giai đoạn của TY_ANH_XA_BAC.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Mười lăm giai đoạn nhìn từ chỗ ngồi của người kèm ──
     Bảy ô: số · tên · em trông như thế nào · ba việc hằng tuần ·
     bằng chứng để qua giai đoạn · người lớn làm gì và không làm gì ·
     dấu hiệu em đang mắc kẹt. Đủ mười lăm dòng, đúng thứ tự gốc.  */
  G.LT_MUOI_LAM = [
    ['1', 'THÂN',
     'Sáng dậy không cần gọi tới lần thứ ba. Cặp soạn từ tối hôm trước. Vào lớp trước tiếng trống. Chiều về còn sức làm một việc nhà.',
     'Ghi giờ ngủ và giờ dậy đủ bảy ngày · soạn cặp tối hôm trước mỗi ngày học · một bữa sáng cùng nhà và nói ba câu về hôm nay',
     'Bảng giờ giấc bảy ngày liên tiếp do chính em ghi · sổ đầu bài không có lượt đi muộn trong bốn tuần',
     'LÀM: đặt một giờ đi ngủ chung cho cả nhà và người lớn tắt đèn trước. KHÔNG: gọi dậy hộ tới lần thứ ba, không soạn cặp hộ, không dùng giấc ngủ làm phần thưởng.',
     'Bảng giờ giấc đẹp đều tăm tắp — dấu hiệu ghi cho xong vào cuối tuần. Hoặc chỉ đúng giờ những ngày có người lớn ở nhà.'],

    ['2', 'TÂM',
     'Bị trêu mà không đánh lại. Cãi nhau xong biết quay lại nói chuyện trước. Trong nhà có một người em kể chuyện thật, không phải chuyện đối phó.',
     'Mỗi tối gọi tên cảm xúc mạnh nhất trong ngày, một dòng · một lần dùng “dừng ba giây” và ghi lại chuyện gì đã xảy ra sau đó · một lời cảm ơn nói trực tiếp, không nhắn tin',
     'Sổ ba dòng bốn tuần, trong đó có ít nhất một tình huống thật em đã dừng lại được · một người ngoài nhà kể lại được một lần em xử lý bình tĩnh',
     'LÀM: nghe hết câu trước khi kết luận; hỏi “rồi con thấy thế nào” trước khi hỏi “sao con làm thế”. KHÔNG: mắng lúc em đang khóc; không kể chuyện của em cho người khác nghe khi em đang ngồi đó.',
     'Em trả lời “con không sao” cho mọi chuyện. Hoặc chỉ bình tĩnh ở nhà, ra lớp vẫn bùng.'],

    ['3', 'TRÍ',
     'Hỏi lại ngay trong giờ khi không hiểu, không để tới lúc kiểm tra. Có sổ ghi lỗi sai và có mở ra xem. Không chép đáp án trên mạng rồi nộp.',
     'Một câu hỏi chủ động mỗi buổi học, ghi lại · chép ba lỗi sai của tuần và tự giải lại · một lần kiểm chứng thông tin đọc trên mạng ở hai nguồn khác nhau',
     'Sổ Câu hỏi và Lỗi sai bốn tuần liên tiếp · một bài kiểm tra sau đó không lặp lại lỗi cũ đã ghi',
     'LÀM: bảo “con giải thích cho bố mẹ nghe” thay vì kiểm đáp án. KHÔNG: giải hộ bài; không mua lời giải; không ngồi cạnh suốt buổi tự học.',
     'Em hỏi rất nhiều nhưng không hỏi thầy cô, chỉ hỏi máy. Hoặc sổ lỗi sai chép lại đề mà không chép cách sửa.'],

    ['4', 'VĂN',
     'Chào người lớn trước khi bị nhắc. Nhắn tin có đầu có đuôi, đúng danh xưng. Không hùa theo bình luận ác trên mạng.',
     'Một lần phát biểu trước lớp · một lần rà lại bình luận của mình trên mạng và tự xoá thứ mình thấy không ổn · một tin nhắn viết đủ câu gửi thầy cô hoặc người lớn',
     'Giáo viên chủ nhiệm xác nhận em phát biểu đều trong bốn tuần · một bài viết hoặc tin nhắn em tự soạn đúng chuẩn xưng hô, có lưu lại',
     'LÀM: nói mẫu; xin lỗi con trước mặt con khi mình sai. KHÔNG: chửi trước mặt con rồi cấm con nói tục; không đọc trộm tin nhắn của con để lấy chứng cứ mắng.',
     'Lễ phép trước mặt người lớn, khác hẳn trong nhóm chat. Hoặc chỉ phát biểu khi bị gọi tên.'],

    ['5', 'THỂ',
     'Vận động ba buổi một tuần và không cần được chở đi mới chịu tập. Không ngủ gật tiết đầu. Leo bốn tầng không thở dốc.',
     'Ba buổi vận động ít nhất hai mươi phút, ghi vào log · một buổi vận động cùng người trong nhà · bảy ngày không mang điện thoại vào phòng ngủ',
     'Log vận động bốn tuần từ mười hai buổi trở lên · em tự nói được khác biệt về mức tập trung, kèm một ví dụ cụ thể',
     'LÀM: đi cùng hoặc tập cùng ít nhất một buổi mỗi tuần. KHÔNG: dùng thể thao làm phần thưởng hay hình phạt; không cắt giờ vận động để nhét thêm giờ học thêm.',
     'Tập rất hăng hai tuần rồi nghỉ hẳn. Hoặc chỉ tập những hôm có người quay video.'],

    ['6', 'MĨ',
     'Góc học tập gọn mà không ai phải dọn. Vở sạch. Slide làm ra người khác đọc được. Đã bỏ theo dõi vài kênh nội dung rác.',
     'Năm phút dọn góc học tập cuối mỗi ngày · một sản phẩm có bố cục: bìa vở, poster, slide hoặc mâm cơm · một lần dọn danh sách theo dõi trên mạng xã hội',
     'Ảnh góc học tập chụp cùng một góc ở tuần đầu và tuần thứ tư · một sản phẩm được người khác xin dùng lại',
     'LÀM: khen đúng chi tiết đã đẹp lên, không khen chung chung. KHÔNG: dọn hộ phòng con rồi trách con bừa; không chê gu của con trước mặt bạn của con.',
     'Dọn xong một lần rồi bừa lại trong ba ngày. Hoặc đẹp ở chỗ chụp ảnh, bừa ở chỗ khuất.'],

    ['7', 'TƯ DUY XUẤT SẮC',
     'Sai một bài thì hỏi sai ở đâu, không nói “con dốt”. Nhận việc chưa từng làm mà không đòi bảo đảm sẽ thắng.',
     'Ghi một lỗi trong tuần kèm một điều rút ra · nhận một việc chưa chắc làm được · một lần kể lại thất bại cho nhóm nghe mà không đổ cho ai',
     'Nhật ký Sai và Học tám tuần · một việc em từng bỏ giữa chừng và đã quay lại làm xong',
     'LÀM: kể lỗi của chính mình trong tuần, trước khi hỏi lỗi của con. KHÔNG: gọi con là thông minh hay dốt; không nhắc lại lỗi cũ để dằn mặt.',
     'Em nói “không sao đâu” nhưng tránh mọi việc khó. Hoặc chỉ nhận thử thách chắc thắng.'],

    ['8', 'PHƯƠNG PHÁP CÁ NHÂN HOÁ',
     'Có thời khoá biểu riêng do em viết. Biết mình học vào giờ nào thì vào nhất. Đổi cách học khi cách cũ không ra kết quả.',
     'Lập kế hoạch tuần vào cùng một khung giờ cố định · tự chấm phần trăm kế hoạch làm đúng · thử một kỹ thuật học trên đúng một môn',
     'Bảng Study OS có ít nhất hai lần sửa, mỗi lần ghi rõ lý do sửa · độ chính xác kế hoạch tuần từ sáu mươi phần trăm trở lên trong bốn tuần',
     'LÀM: hỏi con số phần trăm, không hỏi cảm giác. KHÔNG: viết thời khoá biểu hộ; không bắt con học theo cách từng hợp với mình ba mươi năm trước.',
     'Kế hoạch tuần nào cũng đẹp và tuần nào cũng vỡ. Hoặc đổi phương pháp liên tục, không cái nào chạy đủ ba tuần.'],

    ['9', 'KỸ NĂNG TOÀN DIỆN',
     'Trong nhóm em nhận một phần việc rõ và nộp đúng hạn. Bất đồng thì nói thẳng với bạn, không nói sau lưng. Dùng được công cụ số cơ bản mà không nhờ người lớn.',
     'Một phần việc nhóm có hạn chót do em giữ · một lần nói ý kiến khác số đông, kèm lý do · một sản phẩm số tự làm: bảng tính, slide hoặc video ngắn',
     'Phiếu 360° của bạn cùng nhóm chấm em · một sản phẩm nhóm nộp đúng hạn có ghi rõ phần việc của em',
     'LÀM: để con tự nhắn cho bạn và cho thầy cô. KHÔNG: nhắn hộ vào nhóm phụ huynh; không xử mâu thuẫn của con bằng cách gọi cho mẹ bạn kia.',
     'Em nhận phần dễ nhất trong mọi lần chia việc. Hoặc làm hết phần của cả nhóm rồi ấm ức.'],

    ['10', 'KẾT QUẢ XUẤT SẮC',
     'Có một con số đang đi lên và em nói được vì sao nó lên. Có một sản phẩm cầm được, không chỉ có lời kể.',
     'Cập nhật đúng một con số của mục tiêu đang chạy · một buổi làm sâu ít nhất chín mươi phút cho sản phẩm · một lần báo tiến độ trước nhóm, kể cả tuần số xấu',
     'Phiếu mục tiêu có ngày ký và ngày chốt · sản phẩm bàn giao được người ngoài gia đình xem và góp ý',
     'LÀM: hỏi đúng con số đã hẹn, đúng ngày đã hẹn. KHÔNG: đổi mục tiêu giữa chừng cho dễ đạt; không đem điểm của con so với con nhà khác.',
     'Mục tiêu đổi liên tục nên chưa mục tiêu nào bị trượt. Hoặc kết quả có nhưng phần khó do người lớn làm.'],

    ['11', 'GIÁ TRỊ VÀ ĐAM MÊ TÀI NĂNG',
     'Em kể được hai việc mình làm tốt hơn phần lớn bạn, kèm bằng chứng. Có một việc em làm cho người khác mà không ai trả công.',
     'Một giờ dành cho lĩnh vực em đang mê, ngoài bài vở · một việc dùng thế mạnh để giúp một người cụ thể · ghi lại nguyên văn phản hồi của người nhận',
     'Bảng “em giỏi gì — em thích gì” có bằng chứng cho từng dòng · một người ngoài gia đình xác nhận đã được em giúp',
     'LÀM: giới thiệu con với một người đang làm nghề trong lĩnh vực ấy. KHÔNG: gọi đam mê của con là mất thời gian; không biến việc phụng sự thành ảnh để khoe.',
     'Em mê nhưng chỉ xem và chỉ tiêu thụ, chưa làm ra gì. Hoặc chỉ làm việc tốt khi có người chụp ảnh.'],

    ['12', 'BỐN YẾU TỐ BỨT PHÁ',
     'Có một mentor gọi được và đã gọi thật. Có lộ trình chín mươi ngày viết ra giấy, có ngày chốt. Không đợi nhắc mới báo cáo.',
     'Một tin nhắn báo tiến độ cho mentor · đóng một việc trong lộ trình chín mươi ngày · tự chấm nỗ lực tuần theo thang đã thống nhất từ đầu',
     'Lịch gặp mentor ít nhất hai lần trong chín mươi ngày, có biên bản ngắn · phiếu đánh giá hai chiều giữa mentor và em',
     'LÀM: chọn mentor cùng con, nhưng để con tự nhắn lời mời. KHÔNG: làm thay vai mentor; không gọi mentor hỏi về con sau lưng con.',
     'Có mentor trên giấy, ba tháng chưa gặp lần nào. Hoặc lộ trình chín mươi ngày viết đẹp mà không có ngày chốt nào.'],

    ['13', 'BA GIAI ĐOẠN THÓI QUEN',
     'Một hai hành vi cốt lõi giữ được cả trong tuần bận nhất. Đứt nhịp thì quay lại trong vòng hai ngày, không bỏ hẳn.',
     'Đánh dấu ba màu cho hành vi cốt lõi mỗi ngày · một lần tự kiểm chất lượng chứ không chỉ đếm số lần · ghi sổ phục hồi nếu có ngày đứt',
     'Bảng ba màu đạt chuẩn từ tám mươi phần trăm số ngày trở lên trong bốn tuần · sổ phục hồi cho thấy thời gian quay lại rút ngắn dần',
     'LÀM: coi thời gian quay lại sau khi đứt là chỉ số chính, không phải chuỗi ngày liên tiếp. KHÔNG: phạt vì một ngày đứt nhịp; không thêm hành vi thứ ba khi hai cái đầu chưa vững.',
     'Số lần đủ nhưng chất lượng rơi — làm cho có. Hoặc mỗi lần đứt là bỏ luôn cả bảng, làm lại từ đầu.'],

    ['14', 'BẢY BƯỚC GEN VIỆT',
     'Em đi trọn một mục tiêu từ lúc hiểu mình tới lúc đứng nói lại cho người khác nghe. Kẹt thì đi tìm cách gỡ, không ngồi đợi được gỡ.',
     'Đóng một bước trong bảy bước, ghi rõ bước nào · ghi lại một lần bế tắc và cách em đã thử gỡ · một lần thi với chính con số của mình tuần trước',
     'Hồ sơ bảy bước đủ bảy mục cho một mục tiêu · một lần em trình bày lại hành trình ấy cho người chưa biết gì về nó',
     'LÀM: để im ít nhất bốn mươi tám giờ khi con đang kẹt. KHÔNG: gỡ hộ ngay lần đầu con kêu; không nhảy vào sửa bài trình bày của con trước giờ con lên nói.',
     'Em dừng ở bước ba: kế hoạch nào cũng đẹp mà không có bước bốn. Hoặc làm được nhưng không nói lại được.'],

    ['15', 'HỘI TỤ GEN VIỆT',
     'Người khác chọn em vào việc mà không cần thầy cô chỉ định. Em nói được mình muốn thành người thế nào trong ba năm tới, và bước gần nhất là gì.',
     'Một buổi kèm cho một bạn bậc dưới · một việc thuộc vai trò đang giữ, có bàn giao rõ · mười lăm phút viết tiếp bản tầm nhìn một tới ba năm',
     'Phiếu 360° từ bạn, thầy cô và ban điều hành · một bạn bậc dưới tiến bộ có hồ sơ, và tiến bộ ấy truy được về việc em kèm',
     'LÀM: lùi hẳn ra, chỉ có mặt khi em mời. KHÔNG: nhận vai thay con vì sợ con làm hỏng; không dùng danh hiệu của con làm thành tích của mình.',
     'Em ôm hết mọi vai và không bàn giao được việc nào. Hoặc đã có danh hiệu rồi thôi không rèn nữa.']
  ];

  /* ── 2 · Hộ chiếu nhân tài — từng trang ghi gì ─────────────
     Chi tiết hoá GV.TRUC_DOC. Mười hai trang, năm ô mỗi dòng:
     trang · ghi gì · ai ghi · nhịp cập nhật · dùng vào việc gì.  */
  G.LT_HO_CHIEU = [
    ['Trang 1 · Định danh',
     'Mã GV-<năm vào>-<vùng>-<số>, họ tên, ngày sinh, trường, ngày vào hệ.',
     'Admin hệ thống, ghi một lần',
     'Không đổi trọn đời',
     'Nối được dữ liệu của một người qua nhiều năm và nhiều vùng mà không trùng, không mất.'],

    ['Trang 2 · Bậc và ngày đạt',
     'Từng bậc B1 tới B6, ngày qua cổng, tên người nghiệm thu, số hiệu biên bản.',
     'Hội đồng nghiệm thu',
     'Chỉ khi qua cổng, không theo lịch',
     'Quyết định tài khoản của em mở tới đâu. Không dùng trang này để mô tả năng lực của em.'],

    ['Trang 3 · Giai đoạn đang ở',
     'Giai đoạn hiện tại trong mười lăm giai đoạn, các giai đoạn đã đóng, ngày đóng từng giai đoạn.',
     'Coach kèm ghi, Assessor xác nhận',
     'Mỗi chín mươi ngày, hoặc ngay khi đóng một giai đoạn',
     'Đây là thang chuẩn. Mọi giáo án, mọi buổi kèm và mọi kỳ nghiệm thu đều nói bằng trang này.'],

    ['Trang 4 · Bản đồ mười hai trục',
     'Mức 1 tới 5 của từng trục, kèm các lần chụp trước xếp cạnh nhau trên cùng một hình.',
     'Assessor, độc lập với người dạy',
     'Chín mươi ngày một lần',
     'Nhìn được đường đi chứ không chỉ điểm hiện tại. Chọn một đòn bẩy chính cho chu kỳ sau.'],

    ['Trang 5 · Mức hỗ trợ',
     'Số lần người lớn phải nhắc mỗi tuần, giờ kèm một kèm một mỗi tháng, danh sách việc em còn cần người lớn có mặt.',
     'Phụ huynh ghi thô hằng ngày, Coach chốt',
     'Ghi hằng tuần, chốt hằng tháng',
     'Chỉ số quan trọng nhất của hệ. Hỗ trợ giảm mà kết quả giữ thì mới tính là tiến bộ.'],

    ['Trang 6 · Bằng chứng',
     'Sản phẩm, dự án, giải, phản hồi nguyên văn của người dùng thật, ảnh và video, kèm ngày và tên người xác nhận.',
     'Em nộp, Coach nhận, Assessor kiểm',
     'Nộp ngay khi có, không dồn cuối kỳ',
     'Vật liệu cho mọi cổng. Thiếu trang này thì không xét nâng bậc, dù đã ở trong hệ bao lâu.'],

    ['Trang 7 · Sổ phục hồi',
     'Từng lần vấp: chuyện gì, đứt bao nhiêu ngày, quay lại bằng cách nào, ai đã giúp.',
     'Em tự ghi. Không ai được ghi hộ trang này',
     'Theo sự kiện',
     'Đo thời gian quay lại — thứ dự báo độ bền tốt hơn chuỗi ngày liên tiếp.'],

    ['Trang 8 · Người đã rèn em',
     'Chuỗi Coach, Giáo viên, Mentor qua từng năm, kèm giai đoạn mà mỗi người phụ trách.',
     'Admin hệ thống, ghi theo phân công',
     'Mỗi lần đổi người kèm',
     'Truy được nguồn của chất lượng. Một người kèm yếu sẽ lộ ra sau vài hồ sơ, không cần ai tố.'],

    ['Trang 9 · Người em đã rèn',
     'Tên và mã của người bậc dưới em kèm, cổng họ đã qua, và phần em đã làm.',
     'Assessor của người bậc dưới xác nhận',
     'Theo cổng của người bậc dưới',
     'Mở từ bậc 5. Đây là trường đo hệ có tự tái tạo được hay không.'],

    ['Trang 10 · Hồ sơ nghề',
     'Hướng nghề đang thử, việc đã thử trong chín mươi ngày, người trong nghề đã gặp, sản phẩm để lại.',
     'Em viết, Mentor chuyên môn ghi chú bên lề',
     'Chín mươi ngày một lần, từ bậc 5',
     'Cơ sở cho mọi buổi tư vấn nghề: thay lời khuyên cảm tính bằng việc em đã thử thật.'],

    ['Trang 11 · An toàn và giới hạn',
     'Dị ứng, bệnh nền, người được phép đón, việc em không được giao, các lần có sự vụ và cách đã xử.',
     'Phụ huynh khai; phần sự vụ do Giám đốc điều hành duyệt',
     'Đầu năm và ngay khi có thay đổi',
     'Bắt buộc đọc trước mọi trại, mọi chuyến đi và mọi hoạt động ngoài trường.'],

    ['Trang 12 · Quyền của người sở hữu',
     'Ai đã mở hồ sơ, mở lúc nào, xem trang nào; các lần em hoặc gia đình yêu cầu sửa hoặc xoá.',
     'Hệ thống ghi tự động, không sửa tay được',
     'Mỗi lần có người mở',
     'Em và gia đình xem toàn bộ, xuất bản sao, yêu cầu xoá — kể cả trong lúc đang là học viên.']
  ];

  /* ── 3 · Nghi thức và điều kiện chuyển bậc ─────────────────
     Khoảng giai đoạn lấy theo TY_ANH_XA_BAC; ngưỡng trục lấy theo
     GV.BAC_MUC; quyền mở lấy theo GV.BAC_MO. Bậc đi SAU giai đoạn,
     không đi trước.                                              */
  G.LT_CHUYEN_BAC = [
    { v: '1', t: 'Lễ nhận Hạt', bac: 'B1 · HẠT · giai đoạn 1–3',
      dk: 'Đóng giai đoạn 1 THÂN, 2 TÂM, 3 TRÍ. Có đủ: bảng giờ giấc bốn tuần do em tự ghi, một tình huống cảm xúc em xử được có người ngoài nhà xác nhận, sổ Câu hỏi và Lỗi sai bốn tuần. Hồ sơ đạt từ mức 2 ở ba trục bất kỳ.',
      duoc: 'Mở hành trình của chính em, nhịp tuần chi hội và bốn môi trường. Nghi thức: em đọc bản đồ cá nhân trước chi hội trong ba phút; gia đình ngồi dưới nghe và không được nhắc.' },

    { v: '2', t: 'Lễ nhận Mầm', bac: 'B2 · MẦM · giai đoạn 4–6',
      dk: 'Đóng trọn sáu giai đoạn Nền, thêm 4 VĂN, 5 THỂ, 6 MĨ. Có đủ: giáo viên chủ nhiệm xác nhận nề nếp ứng xử bốn tuần, log vận động từ mười hai buổi trong bốn tuần, ảnh góc học tập ở hai mốc cách nhau bốn tuần. Hồ sơ đạt mức 3 ở sáu trên mười hai trục, trong đó trụ I và trụ A từ mức 3.',
      duoc: 'Thêm sáu vòng chiều sâu và toàn bộ khoá nền. Nghi thức: em kể ba tuần liên tiếp giữ được thói quen khi không ai nhắc; phụ huynh ký xác nhận số lần phải nhắc đã giảm, kèm bảng đếm.' },

    { v: '3', t: 'Lễ nhận Thân', bac: 'B3 · THÂN · giai đoạn 7–9',
      dk: 'Đóng giai đoạn 7, 8, 9 — nhóm cách học. Có đủ: nhật ký Sai và Học tám tuần, bảng Study OS có ít nhất hai lần sửa kèm lý do, một sản phẩm nhóm nộp đúng hạn có phiếu 360° của bạn cùng nhóm. Hồ sơ đạt mức 3 ở chín trên mười hai trục, một trục thuộc trụ T đạt mức 4.',
      duoc: 'Thêm tổ mũi nhọn, sổ tay vai, biểu mẫu, bảng ngôn ngữ và cách dùng Thư viện. Nghi thức: em dạy lại một phương pháp học cho một bạn và bạn ấy dùng được — người xác nhận là bạn ấy, không phải em.' },

    { v: '4', t: 'Lễ nhận Trụ', bac: 'B4 · TRỤ · giai đoạn 10–11',
      dk: 'Đóng giai đoạn 10 và 11 — kết quả và giá trị. Có đủ: một con số mục tiêu đi lên trong chín mươi ngày có phiếu ký ngày đầu, một sản phẩm có người ngoài gia đình dùng và góp ý nguyên văn, một việc phụng sự có người thụ hưởng ký. Hồ sơ đạt mức 4 ở tám trên mười hai trục, trục 9 Lãnh đạo và trục 10 Định hướng nghề từ mức 4.',
      duoc: 'Thêm phần điều hành chi hội: ghế, nhiệm kỳ, lịch năm, quy trình mở chi hội. Nghi thức: em bảo vệ sản phẩm trước hội đồng, và phải chỉ ra được một năng lực đã chuyển sang việc khác.' },

    { v: '5', t: 'Lễ nhận Người Dẫn', bac: 'B5 · NGƯỜI DẪN · giai đoạn 12–14',
      dk: 'Đóng giai đoạn 12, 13, 14 — bộ công cụ. Có đủ: hồ sơ bảy bước đủ bảy mục cho một mục tiêu, bảng ba màu từ tám mươi phần trăm số ngày đạt chuẩn trong bốn tuần, biên bản hai lần gặp mentor. Hồ sơ đạt mức 4 ở cả mười hai trục, trục trụ chính đạt mức 5, và ít nhất ba người bậc dưới qua cổng dưới sự kèm của em, có Assessor độc lập xác nhận.',
      duoc: 'Mở kho nghề: ma trận tám nhân tám, phác đồ, một trăm chiến lược. Em thành Mentor trong hệ. Nghi thức: ba người em kèm nói trước hội đồng về điều họ học được; em ngồi nghe và không được đính chính.' },

    { v: '6', t: 'Lễ nhận Kiến trúc sư', bac: 'B6 · KIẾN TRÚC SƯ · giai đoạn 15',
      dk: 'Đóng giai đoạn 15 — hội tụ — và giữ được chuẩn: một vùng hoặc một nhánh chuyên môn chạy đúng chuẩn hai mươi bốn tháng trong khi em không có mặt hằng ngày; viết được phần kho mà trước đó chưa ai viết. Bậc này không đo bằng mười hai trục nữa.',
      duoc: 'Thêm cổng nghiệm thu và báo cáo hệ. Nhiệm kỳ năm năm, có tái nghiệm thu, có thể bị rút. Nghi thức: Hội đồng Chuẩn bỏ phiếu; ngay trong buổi lễ em bàn giao một việc mình đang làm tốt cho người khác.' }
  ];

  /* ── 4 · Một năm của một học viên, nhìn theo tháng ─────────
     Năm học Việt Nam: quý một mở vào tháng 9, quý bốn đóng vào
     tháng 8 bằng Hội nghị Phát triển. Bốn cổng chín mươi ngày rơi
     đúng cuối mỗi quý.                                            */
  G.LT_MOT_NAM = [
    { q: 'QUÝ 1', chu: 'Vào nhịp — giờ giấc, cảm xúc, cách học', tuan: 'Tuần 1–13 · tháng 9 đến tháng 11', mau: '#185AB4',
      moc: [
        { t: 'Tháng 9', v: 'Tuần 1 làm bộ test nhận diện và đọc kết quả cùng gia đình. Tuần 2 ký cam kết chín mươi ngày, có chữ ký của em và của người lớn. Tuần 3 và 4 dựng bảng giờ giấc và dọn góc học tập, chụp ảnh mốc đầu.' },
        { t: 'Tháng 10', v: 'Chọn đúng một thói quen cốt lõi, chạy vòng hai mươi mốt ngày đầu. Mỗi tuần một vòng bốn mươi lăm giây trước chi hội. Mở sổ Câu hỏi và Lỗi sai.' },
        { t: 'Tháng 11', v: 'Vòng hai mươi mốt ngày thứ hai. Kiểm tra giữa kỳ ở trường rơi vào đây — không thêm việc mới, chỉ giữ nhịp cũ và chấp nhận số tuần đó xấu hơn.' },
        { t: 'Cổng quý 1', v: 'Chụp bản đồ mười hai trục lần một. Chốt mức hỗ trợ đầu năm: số lần nhắc mỗi tuần, giờ kèm mỗi tháng. Đây là mốc để cuối năm có cái mà so.' }
      ]},

    { q: 'QUÝ 2', chu: 'Phương pháp riêng và kết quả đầu tiên', tuan: 'Tuần 14–26 · tháng 12 đến tháng 2', mau: '#5140B4',
      moc: [
        { t: 'Tháng 12', v: 'Dựng Study OS: khung giờ, cách ghi chép, một kỹ thuật học thử trên đúng một môn. Thi học kỳ một là nơi thử phương pháp, không phải nơi bắt đầu dựng nó.' },
        { t: 'Tháng 1', v: 'Tổng kết học kỳ một bằng số, không bằng cảm giác. Sửa Study OS đúng một lần, ghi rõ sửa gì và vì sao. Nhận một vai nhỏ có nhiệm kỳ trong lớp hoặc chi hội.' },
        { t: 'Tháng 2', v: 'Tết: nhịp đứt là chuyện bình thường. Việc duy nhất phải giữ là hành vi cốt lõi ở mức tối thiểu. Sau Tết đo thời gian quay lại, không đo số ngày đã đứt.' },
        { t: 'Cổng quý 2', v: 'Chụp bản đồ mười hai trục lần hai. Chọn một mũi nhọn để đầu tư sâu trong nửa năm còn lại, và bỏ bớt một việc đang chiếm chỗ.' }
      ]},

    { q: 'QUÝ 3', chu: 'Sản phẩm và người dùng thật', tuan: 'Tuần 27–39 · tháng 3 đến tháng 5', mau: '#0B7350',
      moc: [
        { t: 'Tháng 3', v: 'Chốt một sản phẩm hoặc một dự án có người dùng ngoài gia đình. Viết phiếu mục tiêu có ngày chốt và có tên người sẽ nhận sản phẩm.' },
        { t: 'Tháng 4', v: 'Làm và báo tiến độ hằng tuần, kể cả tuần số xấu. Đây là tháng dễ bỏ nhất trong năm vì hứng đã hết mà hạn còn xa.' },
        { t: 'Tháng 5', v: 'Bàn giao sản phẩm, lấy phản hồi nguyên văn của người dùng, dán vào trang bằng chứng. Thi cuối năm ở trường — giữ nhịp, không dựng việc mới.' },
        { t: 'Cổng quý 3', v: 'Chụp bản đồ mười hai trục lần ba. Đối chiếu đúng một câu hỏi: hỗ trợ đã giảm chưa, mà kết quả vẫn giữ.' }
      ]},

    { q: 'QUÝ 4', chu: 'Trại, phụng sự và nghiệm thu năm', tuan: 'Tuần 40–52 · tháng 6 đến tháng 8', mau: '#A8801F',
      moc: [
        { t: 'Tháng 6', v: 'Trại hè: nơi mở bậc và tạo bước ngoặt. Bước ngoặt sẽ tan trong ba tuần nếu tháng 7 ở nhà không có nhịp giữ.' },
        { t: 'Tháng 7', v: 'Hậu trại — đúng ba tuần giữ nhịp tại gia đình, cùng một danh mục như trong trại. Một việc phụng sự có người thụ hưởng ký.' },
        { t: 'Tháng 8', v: 'Năm ngày Hội nghị Phát triển: em bảo vệ hồ sơ, người lớn trình bày thay đổi của chính mình. Xét chuyển bậc nếu đủ bằng chứng — đủ bằng chứng, không phải đủ tháng.' },
        { t: 'Cổng năm', v: 'Chụp bản đồ mười hai trục lần bốn, xếp cạnh ba lần trước trên một hình. Viết mức hỗ trợ cho năm sau, và mức ấy phải thấp hơn năm nay.' }
      ]}
  ];

  /* ── 5 · Em mắc kẹt ở đâu và gỡ thế nào ────────────────────
     Mười hai kiểu mắc kẹt thật của lứa tuổi. Mỗi kiểu: dấu hiệu
     nhận ra · điều đang thực sự xảy ra · làm gì · bẫy mà người lớn
     hay rơi vào.                                                  */
  G.LT_MAC_KET = [
    { t: 'Mất động lực giữa chừng', mau: '#9E470D',
      dh: 'Rơi vào tuần thứ năm tới tuần thứ tám. Em vẫn đi nhưng làm cho xong. Bảng theo dõi ghi dồn một lần vào cuối tuần. Không hỏi gì nữa.',
      can: 'Mục tiêu là của người lớn, không phải của em. Hoặc đích quá xa mà trên đường không có mốc nào đủ gần để chạm tới.',
      lam: 'Cắt đích xuống còn một việc làm xong trong bảy ngày. Hỏi em đúng một câu: nếu bỏ được một thứ trong danh sách này thì bỏ thứ nào — rồi bỏ thật. Cho em gặp một người đang sống bằng chính việc em từng nói là thích.',
      bay: 'Tăng động viên và tăng thưởng. Cách này mua được hai tuần rồi rơi sâu hơn trước.' },

    { t: 'Giỏi một môn, ghét mọi thứ khác', mau: '#185AB4',
      dh: 'Điểm một môn rất cao, các môn khác vừa đủ qua. Nhắc tới môn kia là em cáu hoặc im.',
      can: 'Ở môn mạnh em được công nhận. Ở môn khác em từng bị chê và đã bỏ. Đây là né đau, không phải lười.',
      lam: 'Không ép cân bằng. Dùng môn mạnh làm cầu: giao một dự án cần đúng một kỹ năng của môn yếu. Đặt cho môn yếu một ngưỡng sàn thấp và cố định, không tăng trong ba tháng.',
      bay: 'Cắt giờ môn mạnh để bù cho môn yếu. Kết quả thường là mất cả hai.' },

    { t: 'Sợ nói trước đám đông', mau: '#5140B4',
      dh: 'Đến lượt thì đau bụng, xin ra ngoài, hoặc nói ba giây rồi ngồi xuống. Ở nhà nói rất nhiều.',
      can: 'Một lần bị cười trước lớp chưa từng được làm lại. Trí nhớ giữ nguyên cảnh cũ và phát lại mỗi lần em đứng lên.',
      lam: 'Hạ mức xuống chỗ em chắc thắng: nói bốn mươi lăm giây, cầm giấy trong tay, trước sáu người quen. Lặp mỗi tuần trong bốn tuần rồi mới tăng số người nghe. Việc phải làm lại là chính tình huống cũ, không phải một tình huống khác.',
      bay: 'Đẩy thẳng em lên sân khấu lớn để “vượt qua nỗi sợ”. Một lần hỏng ở đó lùi thêm cả năm.' },

    { t: 'Bị so sánh với anh chị', mau: '#BE0E16',
      dh: 'Em nhắc tên anh chị trong mọi câu tự đánh giá. Hoặc làm ngược hẳn anh chị một cách cố ý, kể cả khi bất lợi cho mình.',
      can: 'Trong nhà đã có sẵn một thang đo và em luôn ở dưới. Cố gắng không đổi được vị trí thì bỏ cuộc là lựa chọn hợp lý.',
      lam: 'Bỏ mọi so sánh ngang. So em với chính em ở tuần đầu, có ảnh và số để so. Cho em một sân mà anh chị không có mặt. Nói rõ với anh chị: không bình luận về hồ sơ của em.',
      bay: 'Nói “bố mẹ có so đâu” rồi tuần sau lại kể thành tích anh chị trước mặt em.' },

    { t: 'Gia đình kỳ vọng lệch', mau: '#A8801F',
      dh: 'Mục tiêu trong phiếu là của bố mẹ. Em ký nhưng không nói được vì sao chọn mục tiêu ấy. Trong buổi gặp, người lớn báo cáo thay em.',
      can: 'Người lớn đang giải quyết tiếc nuối của chính mình thông qua con.',
      lam: 'Tách hai bản mục tiêu: một bản của em, một bản của gia đình, viết riêng rồi đọc cho nhau nghe. Chỉ giữ phần trùng làm mục tiêu chính. Phần lệch để lại đó, hẹn xem lại sau chín mươi ngày.',
      bay: 'Người kèm đứng về phía em và nói người lớn sai. Gia đình rút, em mất cả hai bên cùng lúc.' },

    { t: 'Bạn bè kéo xuống', mau: '#9E470D',
      dh: 'Em bỏ nhịp đúng những ngày đi với nhóm bạn. Cách nói năng đổi. Úp điện thoại xuống khi người lớn lại gần.',
      can: 'Nhóm bạn đang cho em thứ hệ chưa cho kịp: được thuộc về ngay lập tức, không phải chứng minh gì.',
      lam: 'Không cấm bạn. Dựng một nhóm thứ hai đủ hấp dẫn: tổ ba tới năm người, có việc thật, có tên gọi và có lịch. Giao em một vai trong tổ ấy suốt bốn tuần. Mời chính nhóm bạn kia dự một buổi mở.',
      bay: 'Cấm chơi và nói xấu bạn của con. Em sẽ chọn bạn, và lần sau giấu kỹ hơn.' },

    { t: 'Nghiện màn hình', mau: '#BE0E16',
      dh: 'Ngủ sau nửa đêm. Cáu khi bị gọi. Số giờ dùng thật cao gấp đôi số em tự khai. Bỏ vận động trước, bỏ bài sau.',
      can: 'Màn hình trả công ngay lập tức cho thứ mà đời thật bắt em chờ hàng tháng.',
      lam: 'Đo trước, sửa sau: một tuần đầu chỉ ghi số giờ, không cấm gì. Sau đó cắt đúng một khung — điện thoại ra khỏi phòng ngủ, cả nhà cùng làm và người lớn làm trước. Lấp chỗ trống bằng việc có người khác đang chờ em, không bằng việc ngồi một mình.',
      bay: 'Tịch thu máy. Em học được cách giấu, và người lớn mất luôn kênh nói chuyện.' },

    { t: 'Làm nhanh ẩu', mau: '#0B7350',
      dh: 'Nộp sớm nhất lớp và sai đúng những lỗi đã sửa ba lần. Không đọc lại. Hỏi “xong chưa ạ” thay vì “đúng chưa ạ”.',
      can: 'Em đang được thưởng vì tốc độ. Chưa lần nào em phải trả giá cho lỗi.',
      lam: 'Đổi luật nộp: chỉ nhận bài đã có ba phút tự soát và một dòng ghi em đã soát gì. Bài sai thì trả lại đúng bài đó, không phát bài mới. Đếm khoảng cách giữa lần nộp đầu và lần được nhận — đó là con số cần giảm.',
      bay: 'Chấm chăm chỉ theo số lượng bài. Em sẽ nhanh và ẩu hơn nữa.' },

    { t: 'Cầu toàn, không dám bắt đầu', mau: '#5140B4',
      dh: 'Sát hạn chót vẫn chưa có dòng nào. Viết rồi xoá làm lại. Nói “con chưa sẵn sàng”. Sợ nộp bản chưa đẹp hơn sợ nộp trễ.',
      can: 'Trong đầu em, bản nộp ra là bản định nghĩa em là ai. Nộp bản xấu nghĩa là em xấu.',
      lam: 'Bắt buộc nộp một bản nháp xấu, hẹn giờ mười lăm phút, và người nhận cam kết trước là không chấm. Tách rõ hai vòng: vòng làm và vòng sửa, cấm sửa trong vòng làm. Ở vòng này chỉ khen việc nộp đúng hạn, không khen chất lượng.',
      bay: 'Khen em kỹ tính và cẩn thận. Đó là lời khen khoá chặt em lại thêm một năm.' },

    { t: 'Thành công sớm rồi dừng lại', mau: '#A8801F',
      dh: 'Có giải, có danh hiệu, rồi ba tháng không có sản phẩm mới. Nói về việc cũ nhiều hơn việc đang làm.',
      can: 'Danh hiệu đã trả đủ công cho nỗ lực. Đi tiếp thì không thêm được gì mà lại có nguy cơ mất tiếng.',
      lam: 'Đổi vai: từ người thi sang người kèm — giao em kèm một bạn bậc dưới đi qua đúng cái cổng em vừa qua. Đặt thêm một việc em chắc chắn chưa làm được và chấp nhận hỏng. Không nhắc lại giải cũ trong sinh hoạt chi hội.',
      bay: 'Đem em đi trưng bày ở mọi sự kiện. Em thành hiện vật và thôi làm người học.' },

    { t: 'Bị cô lập trong nhóm', mau: '#BE0E16',
      dh: 'Chia nhóm thì em luôn là người còn lại. Đi học đều nhưng không kể gì về bạn. Ăn một mình.',
      can: 'Có thể vì em khác nhóm, có thể vì một sự việc chưa ai xử. Đừng đoán, phải hỏi.',
      lam: 'Hỏi thẳng và hỏi riêng, hỏi em trước khi hỏi thầy cô. Nếu là bắt nạt thì xử theo luật chi hội ngay trong ngày và báo cả hai gia đình trong hai mươi bốn giờ. Nếu không phải, giao em một vai mà nhóm buộc phải cần tới: giữ giờ, giữ số, giữ đồ.',
      bay: 'Bảo em “cứ hoà đồng lên”. Trong câu đó không có bước làm nào cả.' },

    { t: 'Thiếu ngủ kéo dài, học bằng đêm', mau: '#9E470D',
      dh: 'Học tới một hai giờ sáng, ngủ gật tiết đầu, cuối tuần ngủ bù tới trưa. Điểm còn giữ được nhưng người xuống thấy rõ.',
      can: 'Ban ngày đã hết chỗ vì việc khác nên đêm là khoảng trống duy nhất. Đây là vấn đề của cái lịch, không phải của ý chí.',
      lam: 'Dựng lại lịch tuần trên giấy, tính cả giờ đi lại và giờ học thêm — thường sẽ lộ ra hai việc phải cắt. Cắt thật. Đặt một giờ tắt đèn cố định cho cả nhà. Sau hai tuần kiểm lại bằng số giờ ngủ, không bằng lời hứa.',
      bay: 'Thêm giờ học thêm để bù phần đang tụt. Phần bị cắt tiếp vẫn là giấc ngủ, và mọi thứ tụt nhanh hơn.' }
  ];

  /* ── 6 · Vai của gia đình theo từng bậc ────────────────────
     Nguyên lý tự xoá mình đọc rõ nhất ở đây: cột việc hằng tuần
     ngắn dần theo bậc, tới B6 thì hết.                            */
  G.LT_GIA_DINH = [
    { v: 'B1 · HẠT — người lớn có mặt hằng ngày', mau: '#185AB4',
      tuan: ['Ngồi cạnh mười lăm phút khi em ghi nhật ký ba dòng: ngồi cạnh, không đọc, không sửa.',
             'Một bữa ăn dùng bộ câu hỏi bàn ăn, và không nhân dịp đó dạy dỗ.',
             'Đi cùng em một buổi vận động.',
             'Đưa em tới chi hội đúng giờ, đứng ngoài, không vào ngồi cùng.'],
      thang: ['Mở hộ chiếu cùng em ở đúng trang bằng chứng và để em kể.',
              'Gặp Coach mười lăm phút, mang theo con số: tháng này đã phải nhắc bao nhiêu lần.'],
      khong: ['Không ghi hộ nhật ký, không dọn hộ góc học tập.',
              'Không kể chuyện của em cho họ hàng nghe khi em đang ngồi đó.',
              'Không hứa thưởng để đổi lấy một thói quen.'],
      do: 'Số lần phải nhắc mỗi tuần, ghi thô, không làm tròn. Bậc này chỉ cần đúng con số ấy.' },

    { v: 'B2 · MẦM — người lớn giữ khung, em chạy trong khung', mau: '#5140B4',
      tuan: ['Hỏi đúng một câu về kế hoạch tuần: bao nhiêu phần trăm làm đúng.',
             'Giữ giờ tắt đèn của cả nhà, và người lớn tắt trước.',
             'Để em tự nhắn cho thầy cô và cho bạn, kể cả khi nhắn còn vụng.'],
      thang: ['Ngồi nghe em trình bày tiến bộ mười phút: không ngắt, không bổ sung, không chữa lời.',
              'Rà lại trong nhà còn bao nhiêu việc đang làm hộ em, rồi bỏ bớt một việc.'],
      khong: ['Không viết thời khoá biểu hộ.',
              'Không vào nhóm chat lớp hỏi bài hộ con.',
              'Không so con với anh chị hay với con nhà khác, kể cả khi là lời khen.'],
      do: 'Số lần nhắc giảm ít nhất bốn mươi phần trăm so với đầu chu kỳ, mà kết quả không tụt.' },

    { v: 'B3 · THÂN — người lớn thành người đặt câu hỏi', mau: '#0B7350',
      tuan: ['Một câu hỏi mở về việc em đang làm, rồi im nghe cho tới hết.',
             'Chở em tới nơi có người làm nghề thật, nếu em cần và em đã hẹn được.'],
      thang: ['Đọc sản phẩm của em như một người dùng, góp ý ở góc người dùng, không ở góc giám khảo.',
              'Gặp Mentor chuyên môn khi có mặt em — không gặp riêng sau lưng em.'],
      khong: ['Không sửa bài trình bày của em trước giờ em lên nói.',
              'Không nhận lời hộ em cho bất kỳ vai trò nào.',
              'Không hỏi Coach về em trước khi hỏi chính em.'],
      do: 'Giờ kèm một kèm một mỗi tháng giảm dần, trong khi số sản phẩm hoàn chỉnh không giảm.' },

    { v: 'B4 · TRỤ — người lớn thành người bảo lãnh, không phải người điều hành', mau: '#A8801F',
      tuan: ['Có mặt khi em mời, và chỉ khi em mời.'],
      thang: ['Mở cho em một mối quan hệ: một cuộc gặp, một buổi đi xem việc, một lời giới thiệu — rồi rút ra ngay.',
              'Hỏi về tiền: dự án đang tiêu gì, ai trả, ghi sổ ở đâu.'],
      khong: ['Không dự họp nhóm của em.',
              'Không xin đặc cách cho em vì em là con mình.',
              'Không đem thành tích của em ra làm thành tích của mình trên mạng.'],
      do: 'Số quyết định trong tháng em tự chốt mà không hỏi người lớn.' },

    { v: 'B5 · NGƯỜI DẪN — người lớn thành người quan sát và giữ an toàn', mau: '#BE0E16',
      tuan: ['Không còn việc theo tuần. Đây là điều đúng, không phải là thiếu sót.'],
      thang: ['Một bữa ăn hỏi em đang kèm ai và người đó khó ở chỗ nào.',
              'Rà phần an toàn: em đi đâu, với ai, và có ai đang dựa vào em quá mức không.'],
      khong: ['Không can vào cách em kèm người khác.',
              'Không nhận xét về người em kèm.',
              'Không nhắc lại chuyện em hồi bé để hạ uy tín của em trước nhóm.'],
      do: 'Ba người bậc dưới em kèm có qua cổng hay không — do Assessor độc lập xác nhận, không do nhà tự nhận.' },

    { v: 'B6 · KIẾN TRÚC SƯ — vai huấn luyện của gia đình đã xong', mau: '#185AB4',
      tuan: ['Không còn việc theo tuần. Quan hệ trở lại là quan hệ gia đình, không còn là quan hệ huấn luyện.'],
      thang: ['Em mời thì đến. Không mời thì thôi.'],
      khong: ['Không nhắc lại lộ trình, không hỏi về bậc.',
              'Không đòi báo cáo.',
              'Không dùng danh của em để mở việc cho mình.'],
      do: 'Chuẩn ở vùng em phụ trách còn đứng khi em vắng. Việc đo này thuộc Hội đồng Chuẩn, không thuộc gia đình.' }
  ];

  /* ── 7 · Từ bậc 5–6 sang nghề ──────────────────────────────
     Mười bốn hướng. Năm ô: hướng nghề · dấu hiệu em hợp hướng này ·
     việc thử trong chín mươi ngày · người cần gặp · sản phẩm để vào
     hồ sơ. Không hướng nào được chọn bằng bài trắc nghiệm — chọn
     bằng chín mươi ngày đã thử thật.                               */
  G.LT_NGHE = [
    ['Sư phạm và huấn luyện',
     'Em giảng lại thì bạn hiểu. Em thích nhất lúc người khác vỡ ra, hơn cả lúc chính em được điểm cao.',
     'Kèm một bạn bậc dưới đi qua đúng một cổng. Soạn và dạy ba buổi mười lăm phút. Ghi lại chỗ bạn ấy vẫn không hiểu.',
     'Một giáo viên đang đứng lớp và một người dạy ngoài trường — hai nghề khác nhau nhiều hơn em tưởng.',
     'Ba giáo án ngắn, một video buổi dạy, và phản hồi nguyên văn của người học.'],

    ['Y và chăm sóc sức khoẻ',
     'Em không né chuyện đau ốm. Kiên nhẫn với người yếu. Chịu được việc lặp đi lặp lại mà vẫn làm đúng.',
     'Học và thi lấy chứng chỉ sơ cấp cứu. Trực tổ y tế một sự kiện. Chăm một người ốm trong nhà theo lịch thật, không theo hứng.',
     'Một bác sĩ, một điều dưỡng và một sinh viên y năm cuối — hỏi về ca trực và về những năm học rất dài.',
     'Chứng chỉ sơ cấp cứu, nhật ký mười ca trực hoặc mười ngày chăm sóc có xác nhận.'],

    ['Kỹ thuật và công nghệ',
     'Em tháo đồ ra để xem bên trong. Ngồi tìm một lỗi nhiều giờ không chán. Không bỏ khi máy chưa chạy.',
     'Làm một sản phẩm chạy được cho một người dùng thật ngoài gia đình, rồi sửa theo phản hồi của họ hai vòng.',
     'Một người đang làm nghề trong doanh nghiệp và một người đã bỏ nghề — hỏi cả hai người.',
     'Kho mã nguồn hoặc bản vẽ, nhật ký lỗi, và tin nhắn phản hồi của người dùng.'],

    ['Kinh doanh và bán hàng',
     'Em nói chuyện với người lạ không ngại. Nhớ được ai cần gì. Bị từ chối mà không sụp.',
     'Bán một thứ có thật ba mươi lần, ghi sổ thu chi từng đồng, làm đúng quy định. Không được bán cho người trong nhà.',
     'Một chủ cửa hàng nhỏ và một người làm bán hàng cho công ty lớn.',
     'Sổ thu chi ba tháng, danh sách khách kèm lý do người ta từ chối, một bản rút kinh nghiệm.'],

    ['Luật và hành chính công',
     'Em hay hỏi “luật nào nói thế”. Chịu đọc văn bản dài. Khó chịu ra mặt khi thấy xử không công bằng.',
     'Đọc trọn một văn bản pháp luật liên quan tới học đường rồi tóm tắt cho các bạn hiểu. Giữ một nhiệm kỳ trong ban kỷ luật hoặc ban giám sát của chi hội.',
     'Một luật sư và một cán bộ đang làm việc ở phường hoặc xã.',
     'Bản tóm tắt văn bản luật và biên bản các vụ việc em đã tham gia xử, đã ẩn danh.'],

    ['Truyền thông, viết và làm nội dung',
     'Em viết ra thì người khác đọc hết. Để ý những chi tiết người khác bỏ qua. Chịu sửa bản thảo nhiều lần.',
     'Ra đều hai mươi bài hoặc hai mươi số trong mười hai tuần, cùng một chủ đề, cùng một kênh. Đo lượt đọc và ít nhất một phản hồi thật.',
     'Một phóng viên hoặc biên tập viên, và một người làm nội dung tự do.',
     'Bộ hai mươi bài, số liệu của kênh, và ba bản sửa của cùng một bài để thấy quá trình.'],

    ['Nghệ thuật biểu diễn',
     'Em tập một mình được nhiều giờ. Lên sân khấu thì tỉnh ra chứ không tắt đi. Chịu được lời chê về kỹ thuật.',
     'Tập một tiết mục tới mức biểu diễn được, rồi diễn thật ba lần trước ba loại khán giả khác nhau.',
     'Một người dạy chuyên môn và một người đang sống bằng nghề diễn — hỏi thẳng về thu nhập.',
     'Ba bản ghi hình cùng một tiết mục ở ba thời điểm, kèm ghi chú đã sửa gì giữa các lần.'],

    ['Thiết kế và mĩ thuật ứng dụng',
     'Em nhìn ra chỗ lệch mà người khác không thấy. Vẽ hoặc dựng liên tục không cần ai giao.',
     'Nhận ba việc thiết kế có yêu cầu từ người khác — nhận diện chi hội, poster sự kiện, ấn phẩm lớp — và làm tới lúc người đặt duyệt.',
     'Một người làm thiết kế trong công ty và một người nhận việc tự do.',
     'Ba bộ hồ sơ thiết kế đủ bản đầu, bản sửa, bản duyệt, kèm nhận xét của người đặt.'],

    ['Thể thao và huấn luyện thể chất',
     'Em chịu được khối lượng tập nặng và đều. Hồi phục nhanh sau khi thua. Tự tập khi không ai nhìn.',
     'Theo một giáo án tập mười hai tuần có ghi số. Thi đấu ít nhất hai giải cấp trường hoặc cấp quận huyện.',
     'Một huấn luyện viên và một vận động viên đã giải nghệ — hỏi về chấn thương và về đường ra khỏi nghề.',
     'Nhật ký tập mười hai tuần có số, kết quả hai giải, và một bản đánh giá của huấn luyện viên.'],

    ['Nghiên cứu và khoa học',
     'Em hay hỏi “làm sao biết là đúng”. Chịu được thử mười lần hỏng chín. Ghi chép cẩn thận mà không ai phải bắt.',
     'Chạy một đề tài nhỏ theo khung nghiên cứu: câu hỏi, cách đo, dữ liệu thật, kết luận có nêu giới hạn.',
     'Một giảng viên hoặc nghiên cứu viên, và một sinh viên đang làm nghiên cứu.',
     'Báo cáo đề tài kèm dữ liệu thô, và một mục nói rõ nghiên cứu này chưa trả lời được gì.'],

    ['Nông nghiệp, thực phẩm và nghề thủ công',
     'Em thích làm ra thứ cầm được. Không ngại bẩn tay. Chờ được — có thứ ba tháng mới ra kết quả.',
     'Chạy trọn một vụ hoặc một mẻ: từ chuẩn bị tới lúc có sản phẩm và có người ăn hoặc người dùng thật.',
     'Một người đang làm nghề ở quy mô hộ gia đình và một người đã đưa hàng ra thị trường.',
     'Nhật ký mùa vụ hoặc nhật ký mẻ, ảnh từng mốc, và phản hồi của người dùng.'],

    ['Quân đội, công an và nghề kỷ luật cao',
     'Em chịu được kỷ luật và giờ giấc chặt. Bình tĩnh khi có việc gấp. Không sợ việc nặng.',
     'Giữ nhịp thể lực và giờ giấc mười hai tuần, không đứt quá hai ngày. Tra đúng điều kiện tuyển sinh của một trường cụ thể rồi đối chiếu với sức khoẻ và học lực của mình.',
     'Một người đang công tác trong ngành và một học viên đang học trường trong ngành.',
     'Bảng theo dõi thể lực và giờ giấc mười hai tuần, kèm bản đối chiếu điều kiện tuyển sinh.'],

    ['Dịch vụ và du lịch',
     'Em nhớ tên và sở thích của người khác. Nói chuyện cả ngày không mệt. Xử được lúc khách khó chịu.',
     'Làm lễ tân hoặc hướng dẫn cho ba sự kiện thật của trường hoặc chi hội, có đón khách từ ngoài vào.',
     'Một hướng dẫn viên và một quản lý khách sạn hoặc nhà hàng.',
     'Ba kịch bản đón khách em tự soạn, phiếu nhận xét của khách và của người quản lý sự kiện.'],

    ['Tài chính và số liệu',
     'Em thấy số thì thấy vui chứ không thấy sợ. Phát hiện được chỗ cộng sai. Giữ sổ đều tay.',
     'Giữ sổ thu chi cho một dự án hoặc cho chi hội trọn một quý, đóng sổ đúng hạn mỗi tháng, chịu được người khác soát.',
     'Một kế toán và một người làm phân tích dữ liệu.',
     'Sổ quý đã đóng, một báo cáo một trang, và biên bản soát của người thứ hai.']
  ];

  /* ── 8 · Luật đi lộ trình ─────────────────────────────────── */
  G.LT_LUAT = [
    'Thang chuẩn là **mười lăm giai đoạn** — em đang rèn cái gì. Sáu bậc là **thang quyền** — tài khoản của em mở tới đâu. Nói về một em thì nói bằng giai đoạn, đừng nói bằng bậc.',
    'Nâng theo bằng chứng, không theo thời gian. Ở trong hệ mười hai tháng không phải là lý do để lên bậc.',
    'Không đóng một giai đoạn bằng lời khen. Đóng bằng vật: một bảng số, một sản phẩm, hoặc một chữ ký của người ngoài.',
    'Bằng chứng do người ngoài gia đình ký nặng hơn bằng chứng do nhà tự nhận. Bằng chứng do chính người thụ hưởng ký là nặng nhất.',
    'Mỗi chu kỳ chỉ một đòn bẩy chính. Sửa ba thứ cùng lúc thì không biết thứ nào đã có tác dụng.',
    'Chỉ số quan trọng nhất của một chu kỳ không phải kết quả, mà là **mức hỗ trợ đã giảm được bao nhiêu mà kết quả vẫn giữ**.',
    'Người kèm giỏi là người ngày càng ít phải có mặt. Sau một năm mà em vẫn cần đúng số giờ kèm như năm đầu thì lộ trình đã hỏng, dù điểm có đẹp.',
    'Được phép đứng lại ở một giai đoạn bao lâu cũng được. Không được phép nhảy cóc qua một giai đoạn.',
    'Đứt nhịp là chuyện bình thường. Cái được đo là **thời gian quay lại**, không phải chuỗi ngày liên tiếp.',
    'Mọi so sánh là với chính em ở tuần đầu, và phải có ảnh hoặc số của tuần đầu để so. Không có mốc đầu thì không được nói là tiến bộ.',
    'Người lớn không làm hộ phần khó. Làm hộ là xoá đúng cái mà giai đoạn ấy sinh ra để rèn.',
    'Hỏi em trước khi hỏi Coach về em. Nói với em trước khi nói về em với người khác.',
    'Một thất bại chưa được làm lại thì chỉ là một thất bại. Giao lại đúng việc ấy trong mười bốn ngày.',
    'Sản phẩm và giải thưởng chỉ tính khi chỉ ra được **một năng lực chuyển được sang việc khác**. Không có phần chuyển giao thì coi như chưa nghiệm thu.',
    'Từ bậc 5, em không còn được đo bằng thành tích của chính mình, mà bằng chất lượng của người em kèm.',
    'Hồ sơ là của em, không của trung tâm. Em và gia đình được xem toàn bộ, xuất bản sao và yêu cầu xoá, kể cả trong lúc đang học.',
    'Không thêm thang thứ ba. Mọi cách xếp hạng mới phải quy về giai đoạn hoặc về bậc, hoặc thay hẳn một trong hai thang ấy.'
  ];

})(window.GV = window.GV || {});
