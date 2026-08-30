/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT · TỔ CHỨC SÁU SỰ KIỆN TRỤ CỘT

   BIÊN SOẠN MỚI — kho gốc chỉ có tên sáu sự kiện. Thiết kế chi
   tiết là mới. Cần Hội đồng Chuyên môn duyệt.

   VÌ SAO CÓ KHO NÀY:
   G.TY_XH_SU_KIEN trong du-lieu-tuyen.js khai sáu sự kiện trụ cột,
   mỗi sự kiện đúng một dòng: tên, mô tả ngắn, mùa, vài con số, một
   câu mục đích. Không có khung tổ chức, không có phân ban, không
   có kịch bản giờ, không có bảng rủi ro, không có cách đo. Màn
   xh-su-kien vì thế dựng ra chưa tới một nửa lượng nội dung trung
   vị của hệ. Hệ quả thực tế: mỗi năm ban tổ chức lại nghĩ lại từ
   đầu, và cái được truyền cho khoá sau là ảnh chụp chứ không phải
   quy trình.

   BỐN ĐIỀU PHẢI BIẾT TRƯỚC KHI DÙNG:
   1. Sáu tên sự kiện lấy nguyên văn từ G.TY_XH_SU_KIEN. Mùa trong
      năm cũng lấy nguyên. Mọi thứ còn lại trong kho này là thiết kế
      mới, chưa chạy thật lần nào, nên phải qua Hội đồng Chuyên môn
      trước khi đem ra dùng.
   2. Kho này KHÔNG ghi số tiền, KHÔNG nêu tên nhà tài trợ, KHÔNG
      nêu tên địa điểm, KHÔNG dẫn số liệu người dự của bất kỳ kỳ
      nào. Chỗ nào cần con số thật thì ban tổ chức tự điền tại chỗ.
   3. Phần an toàn không nằm ở đây. Trại qua đêm và mọi hoạt động
      ngoài cơ sở chạy theo du-lieu-antoan.js. Kho này chỉ nhắc mốc
      nào phải mở kho ấy ra.
   4. Kịch bản lễ vinh danh đã có đủ trong G.TT_LE (du-lieu-thanhtuu.js).
      Kho này không viết lại lễ ấy, chỉ xếp nó vào đúng chỗ trong
      khung sáu sự kiện.

   MỘT NGUYÊN TẮC CHẠY SUỐT KHO:
   Đối tượng là học sinh phổ thông. Sự kiện phải nằm trong sức các
   em, và các em phải GIỮ GHẾ TỔ CHỨC — không phải làm nền cho một
   buổi lễ của người lớn.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Sáu sự kiện trụ cột ───────────────────────────────
     Tên và mùa lấy nguyên văn từ G.TY_XH_SU_KIEN. Sáu cột còn lại
     là thiết kế mới.
     Cột: Mã · Tên sự kiện · Mùa trong năm · Ai dự ·
          Mục đích duy nhất · Đầu ra bắt buộc ·
          Quy mô tối thiểu chạy được · Dấu hiệu đang thành hội chợ */
  G.SK_SAU_TRU = [
    ['SK-1', 'Gen Việt Day', 'Tháng 9 hoặc giữa năm học',
      'Toàn trường. Khối dưới là khán giả chính. Phụ huynh vào theo giấy mời do chính con viết tên.',
      'Cho khối dưới nhìn tận mắt một việc mà học sinh cùng trường đã làm xong, và biết đường nào dẫn tới đó.',
      'Danh mục tiết mục có tên người dựng · sổ gian hàng ghi rõ ai giữ ghế nào · một trang tổng kết nộp trong 14 ngày · danh sách học sinh khối dưới đăng ký tham gia sau sự kiện.',
      'Một sân chung, sáu gian hàng, sáu tiết mục, ba mươi học sinh giữ ghế tổ chức. Dưới mức đó thì gộp vào buổi chào cờ đầu tuần, đừng gọi là ngày hội.',
      'Gian hàng bán đồ ăn nhiều hơn gian hàng trưng việc đã làm. MC là người lớn. Hỏi một gian bất kỳ *ai làm cái này* mà không ai trả lời được.'],

    ['SK-2', 'Gen Việt Awards', 'Tháng 12',
      'Người được vinh danh, người xác nhận ngoài hệ, phụ huynh, đối tác, và toàn bộ thành viên không được vinh danh lần này.',
      'Chứng minh trước cộng đồng rằng thước đo trong hệ có thật và không được vẽ quanh người.',
      'Sổ vàng ghi đủ mã danh hiệu, ngày, người xác nhận, tầng bằng chứng · ghi vào hộ chiếu trong 24 giờ · cuộc gọi cho từng người chưa đạt trong D+7.',
      'Một phòng, một danh sách đã chốt trước 14 ngày, một người xác nhận ngoài hệ có mặt thật. Không đủ ba thứ đó thì hoãn.',
      'Số giải tăng theo số người muốn được khen chứ không theo số người đạt ngưỡng. Bài phát biểu do người lớn viết. Phần *chỗ mình còn dở* bị cắt vì sợ mất khí thế.'],

    ['SK-3', 'Gen Việt Camp', 'Tháng 7',
      'Học sinh đã qua vòng chọn, ban huấn luyện, cán bộ y tế, và người lớn trực đêm theo đúng tỉ lệ trong du-lieu-antoan.js.',
      'Đưa em ra khỏi chỗ có người lớn đỡ sẵn, để em tự lo phần việc của mình trong hai tới ba ngày liền.',
      'Hồ sơ an toàn duyệt xong trước ngày khởi hành · bảo hiểm tai nạn cho từng người · nhật ký trại của từng em · biên bản bàn giao khi trả em về gia đình.',
      'Đủ người lớn theo tỉ lệ trực đêm, đủ bảo hiểm, đủ túi y tế, có phương án chuyển tuyến. Thiếu một trong bốn thì huỷ, bất kể đã bán vé hay chưa.',
      'Lịch trại dày đặc trò chơi lớn và sân khấu lửa trại, nhưng không có mốc nào em phải tự quyết. Ảnh nhiều hơn nhật ký.'],

    ['SK-4', 'Gen Việt Talent Show', 'Tháng 10',
      'Học sinh dự thi, ban giám khảo có ít nhất một người ngoài trường, khán giả là khối lớp của thí sinh.',
      'Mở một cửa được ghi nhận cho em mạnh về nghệ thuật và sáng tạo hơn là về điểm số.',
      'Bảng chấm công khai theo tiêu chí đã dán trước · phiếu nhận xét viết tay trả lại cho từng thí sinh · danh sách tiết mục được mời diễn lại ở Gen Việt Day.',
      'Mười tiết mục, một phòng đa năng, một bộ tiêu chí dán trước một tuần. Không cần sân khấu lớn.',
      'Tiêu chí chấm được nói miệng lúc trao giải. Tiết mục nào có phụ huynh đầu tư phục trang thì lên trước. Không thí sinh nào nhận được nhận xét bằng chữ.'],

    ['SK-5', 'Together We Shine', 'Theo cụm trường',
      'Ba tới năm trường trong cụm, mỗi trường cử một đoàn có cơ cấu giống nhau, cùng một ban tổ chức liên trường do học sinh giữ ghế.',
      'Cho các em thấy hệ không dừng ở cổng trường mình, và tập làm việc với người mình chưa quen.',
      'Biên bản thoả thuận giữa các trường ký trước D-30 · danh sách đoàn từng trường · phân công ban tổ chức liên trường · biên bản chia việc và chia chi phí.',
      'Hai trường, một ngày, một địa điểm. Chưa có thoả thuận ký giữa Ban Giám hiệu các trường thì chưa chạy được, dù đã hẹn miệng.',
      'Một trường đứng ra làm tất, các trường kia chỉ mang học sinh tới ngồi. Tên cụm chỉ xuất hiện trên phông nền.'],

    ['SK-6', 'Người Thắp Sáng Gen Việt', 'Tháng 11',
      'Học sinh, phụ huynh, cựu thành viên. Ba nhóm ngồi cùng phòng, cùng thời lượng nói.',
      'Buổi duy nhất trong năm để ba thế hệ nghe nhau nói mà không ai làm chủ toạ thay người khác.',
      'Biên bản ghi lại câu hỏi từng nhóm đặt cho hai nhóm còn lại · danh sách việc cụ thể được chốt · người chịu trách nhiệm và hạn cho từng việc.',
      'Sáu học sinh, sáu phụ huynh, hai cựu thành viên, một phòng, chín mươi phút. Ít hơn thì thành buổi họp phụ huynh.',
      'Thời lượng nói dồn về phía người lớn. Học sinh chỉ được hỏi *các con thấy thế nào*. Không việc nào được chốt kèm tên người và hạn.']
  ];

  /* ── 2 · Khung tổ chức chung — sáu chặng D-60 tới D+14 ──────
     Dùng chung cho cả sáu sự kiện. Sự kiện nhỏ rút ngắn chặng, không
     bỏ chặng. Bỏ chặng nào thì hỏng đúng chỗ chặng ấy giữ.          */
  G.SK_KHUNG = [
    { ma: 'K1', t: 'QUYẾT ĐỊNH CÓ LÀM KHÔNG', nam: 'D-60 → D-45', mau: '#185AB4',
      hoi: 'Sự kiện này phục vụ mục đích huấn luyện nào, và nếu không có nó thì mất gì?',
      lam: ['Viết một câu mục đích duy nhất. Một câu, không phải ba gạch đầu dòng',
            'Đối chiếu câu ấy với cột *mục đích duy nhất* trong G.SK_SAU_TRU. Lệch thì sửa lại kế hoạch, đừng sửa lại mục đích',
            'Kiểm quy mô tối thiểu chạy được. Không đủ thì chọn hình thức nhỏ hơn ngay từ đây',
            'Xin chủ trương của Ban Giám hiệu bằng văn bản, kèm ngày dự kiến và số buổi học bị ảnh hưởng',
            'Chốt ngày, và chốt luôn ngày dự phòng nếu sự kiện có phần ngoài trời'],
      dich: ['Một tờ chủ trương một trang có chữ ký',
             'Câu mục đích duy nhất đã viết ra và dán ở chỗ ban tổ chức họp',
             'Ngày chính thức và ngày dự phòng'],
      cong: 'Ban Giám hiệu duyệt chủ trương. Chưa duyệt thì không được đặt bất cứ thứ gì, không được thông báo với phụ huynh, không được nhận bất cứ khoản nào.',
      rui: 'Làm vì năm ngoái có làm. Đây là lý do phổ biến nhất và là lý do duy nhất không được chấp nhận ở chặng này.' },

    { ma: 'K2', t: 'THIẾT KẾ VÀ PHÂN BAN', nam: 'D-44 → D-30', mau: '#5140B4',
      hoi: 'Ai giữ ghế nào, và học sinh giữ được bao nhiêu phần trong số ghế ấy?',
      lam: ['Lập bảng ban theo G.SK_BAN, ghi tên người thật vào từng ô, không ghi tên ban suông',
            'Mỗi ban có một học sinh trưởng ban và một người lớn kèm. Người lớn hỏi, không làm thay',
            'Dựng khung kịch bản giờ theo G.SK_KICH_BAN, cắt bớt cho vừa thời lượng của lứa tuổi',
            'Lập bảng ngân sách theo G.SK_NGAN_SACH: đánh dấu hạng mục bắt buộc trước, tuỳ chọn sau',
            'Chốt danh sách khách mời và ai chịu trách nhiệm liên hệ từng người'],
      dich: ['Bảng phân ban có tên người và số điện thoại',
             'Khung kịch bản giờ bản nháp',
             'Bảng ngân sách phân bắt buộc — tuỳ chọn, chưa có số'],
      cong: 'Chủ nhiệm CLB duyệt bảng phân ban. Ghế nào chưa có tên người thì ghế ấy coi như chưa có người, không được ghi là *sẽ phân công sau*.',
      rui: 'Người lớn nhận hết ghế khó vì sợ hỏng. Đến ngày chạy thì học sinh không biết mình phải làm gì, và sự kiện thành buổi biểu diễn của ban tổ chức.' },

    { ma: 'K3', t: 'DỰNG THẬT', nam: 'D-29 → D-14', mau: '#0B7350',
      hoi: 'Thứ ta hứa sẽ có mặt trong ngày ấy, hôm nay đã tồn tại bao nhiêu phần?',
      lam: ['Từng ban chạy phần việc của mình và báo tiến độ mỗi tuần một lần, bằng thứ nhìn thấy được',
            'Tiết mục, gian hàng, bài nói: duyệt bản thô, không duyệt lời hứa',
            'Mở du-lieu-antoan.js nếu sự kiện có phần ngoài cơ sở hoặc ở lại qua đêm. Làm hồ sơ an toàn từ mốc này',
            'Gửi thư mời chính thức. Ghi rõ giờ bắt đầu, giờ kết thúc, và việc cụ thể của khách',
            'Thu đồng thuận hình ảnh bằng văn bản cho mọi người sẽ lên hình, kể cả khách mời'],
      dich: ['Bản thô của mọi phần nội dung',
             'Hồ sơ an toàn nếu áp dụng',
             'Thư mời đã gửi và danh sách xác nhận',
             'Tập đồng thuận hình ảnh'],
      cong: 'Ban Trí Tuệ Việt duyệt nội dung. Phần nào chưa có bản thô ở mốc D-14 thì cắt khỏi chương trình, không giữ lại để chờ.',
      rui: 'Tin vào lời hứa *tuần sau em xong*. Ở D-14 mà chỉ có lời hứa thì tới ngày chạy sẽ có một ô trống trên sân khấu.' },

    { ma: 'K4', t: 'TỔNG DUYỆT VÀ CHỐT', nam: 'D-13 → D-1', mau: '#A8801F',
      hoi: 'Nếu hôm nay là ngày chạy thì chỗ nào sẽ vỡ?',
      lam: ['Chạy tổng duyệt đúng thứ tự kịch bản, bấm giờ từng mốc, ghi lại mốc nào vượt giờ',
            'Cắt phần vượt giờ ngay tại buổi tổng duyệt. Cắt trước còn hơn cắt giữa lúc đang chạy',
            'Thử toàn bộ thiết bị tại đúng chỗ sẽ dùng, đúng giờ trong ngày sẽ dùng',
            'Đọc to bảng rủi ro G.SK_RUI_RO trước toàn ban tổ chức, phân người cầm phanh cho từng mục',
            'Giao việc cho mọi học sinh không có tiết mục: đón khách, giữ cửa, ghi biên bản, dọn, chụp ảnh',
            'Chốt danh sách người có mặt và phương án đưa đón'],
      dich: ['Kịch bản bản chốt, có giờ đã bấm thật',
             'Danh sách người cầm phanh cho từng rủi ro',
             'Bảng phân công cho toàn bộ thành viên, không ai bỏ trống'],
      cong: 'Chủ nhiệm CLB và Ban Bàn Chân Việt cùng ký biên bản sẵn sàng. Một trong hai không ký thì lùi ngày.',
      rui: 'Tổng duyệt cắt ngắn vì bận. Đây là chặng bị bỏ nhiều nhất, và mọi sự cố trong ngày chạy đều đã có thể nhìn thấy ở đây.' },

    { ma: 'K5', t: 'NGÀY CHẠY', nam: 'D0', mau: '#BE0E16',
      hoi: 'Ai đang cầm đồng hồ, và người ấy có quyền cắt không?',
      lam: ['Một người duy nhất cầm đồng hồ và có quyền cắt bất kỳ phần nào đang vượt giờ',
            'Ban Bàn Chân Việt tới trước ít nhất chín mươi phút, kiểm điện, lối thoát hiểm, nhà vệ sinh, điểm y tế',
            'Điểm danh theo nhóm nhỏ ở đầu và cuối mỗi phần, không điểm danh một lần cả buổi',
            'Chạy theo kịch bản. Thay đổi tại chỗ phải qua người cầm đồng hồ, không ai tự đổi',
            'Kết thúc đúng giờ đã ghi trên thư mời, kể cả khi còn phần chưa diễn'],
      dich: ['Sự kiện chạy xong trong khung giờ đã báo',
             'Biên bản sự cố nếu có, ghi ngay trong ngày',
             'Ảnh và video chỉ của người đã có đồng thuận'],
      cong: 'Người cầm đồng hồ quyết định cắt. Quyết định ấy không tranh luận tại chỗ, có gì bàn ở buổi rút kinh nghiệm.',
      rui: 'Khách quý tới muộn và cả chương trình chờ. Chờ một người là lấy mất thời gian của tất cả những người đã tới đúng giờ.' },

    { ma: 'K6', t: 'ĐÓNG SỔ VÀ BÀN GIAO', nam: 'D+1 → D+14', mau: '#9E470D',
      hoi: 'Khoá sau nhận được cái gì ngoài mấy tấm ảnh?',
      lam: ['Họp rút kinh nghiệm trong 48 giờ, khi mọi người còn nhớ. Học sinh nói trước, người lớn nói sau',
            'Ghi giờ tham gia và vai trò của từng em vào hộ chiếu trong bảy ngày',
            'Đóng sổ chi: mọi khoản có chứng từ, công khai trước ban tổ chức',
            'Đo theo G.SK_DO và ghi kết luận: nên làm lại, làm lại nhưng sửa, hay bỏ',
            'Viết một trang bàn giao cho ban tổ chức năm sau: ba việc giữ, ba việc bỏ, một việc chưa ai giải được',
            'Gửi thư cảm ơn tới khách mời và người xác nhận ngoài hệ, có tên người viết'],
      dich: ['Biên bản rút kinh nghiệm',
             'Sổ chi đã đóng và công khai',
             'Kết luận đo theo G.SK_DO',
             'Một trang bàn giao cho khoá sau'],
      cong: 'Hội đồng Chuyên môn nhận trang bàn giao. Không nộp trang này thì sự kiện chưa được tính là đã kết thúc trong hồ sơ.',
      rui: 'Đăng ảnh xong coi như xong. Đây là mốc hay bị bỏ nhất, và bỏ nó là lý do năm nào cũng phải nghĩ lại từ đầu.' }
  ];

  /* ── 3 · Phân ban tổ chức ───────────────────────────────────
     Dựa trên mười hai Ban trong G.TY_CLB_BAN. Trưởng ban là học
     sinh; người lớn kèm chỉ hỏi và giữ an toàn, không làm thay.
     Cột: Ban · Người phụ trách là vai nào · Việc trước sự kiện ·
          Việc trong sự kiện · Việc sau sự kiện · Bàn giao cho ai   */
  G.SK_BAN = [
    ['Ban Khơi Dậy Việt', 'Trưởng ban tổ chức, là học sinh, có Chủ nhiệm CLB kèm',
      'Giữ lịch sáu chặng, họp ban trưởng mỗi tuần, gác cửa mục đích duy nhất',
      'Cầm đồng hồ, quyết định cắt phần vượt giờ, xử lý mọi việc không thuộc ban nào',
      'Chủ trì họp rút kinh nghiệm, viết trang bàn giao',
      'Trưởng ban tổ chức của sự kiện kế tiếp trong năm'],

    ['Ban Bản Lĩnh Việt', 'Trưởng ban điều phối sân khấu, là học sinh',
      'Dựng kịch bản giờ, chọn và tập cho người dẫn, chạy tổng duyệt',
      'Dẫn chương trình, giữ nhịp giữa các phần, bấm giờ phần nói',
      'Nộp kịch bản đã ghi giờ chạy thật kèm ghi chú mốc nào vượt',
      'Ban Trí Tuệ Việt lưu vào bộ tài liệu chuẩn'],

    ['Ban Bàn Chân Việt', 'Trưởng ban hậu cần, là học sinh, có nhân viên cơ sở vật chất kèm',
      'Khảo sát mặt bằng, lên sơ đồ chỗ ngồi và lối thoát hiểm, đặt bàn ghế và thiết bị',
      'Tới trước chín mươi phút, kiểm điện và lối thoát, trực hiện trường suốt buổi, dọn cuối',
      'Trả mặt bằng nguyên trạng, kiểm kê và trả thiết bị mượn',
      'Bộ phận cơ sở vật chất của trường'],

    ['Ban Trái Tim Việt', 'Trưởng ban chăm sóc người, là học sinh, có giáo viên tâm lý kèm',
      'Lập danh sách em cần lưu ý riêng, hẹn trước phương án cho em ngại đám đông',
      'Đi vòng quanh tìm người đứng lẻ, đón em khóc hoặc hoảng, dẫn ra chỗ yên tĩnh',
      'Gặp riêng em có sự cố cảm xúc trong buổi, báo gia đình nếu cần',
      'Coach đang kèm em đó'],

    ['Ban Trí Tuệ Việt', 'Trưởng ban nội dung, là học sinh, có giáo viên chuyên môn kèm',
      'Duyệt bản thô mọi phần nội dung ở mốc D-14, cắt phần chưa có bản thô',
      'Giữ bản nội dung chuẩn, trả lời câu hỏi chuyên môn phát sinh',
      'Lưu toàn bộ nội dung vào thư viện, đánh dấu phần dùng lại được',
      'Ban Trí Tuệ Việt khoá sau, qua thư viện chung'],

    ['Ban Lan Tỏa Việt', 'Trưởng ban truyền thông, là học sinh, có người lớn duyệt bài trước khi đăng',
      'Thu đồng thuận hình ảnh bằng văn bản, soạn trước bản tin và ảnh mẫu',
      'Chụp và quay đúng người đã có đồng thuận, không quay cận mặt trẻ chưa đồng thuận',
      'Đăng bài trong ba ngày, gỡ ngay ảnh bị người trong ảnh yêu cầu gỡ',
      'Kho ảnh chung của CLB, có tệp danh sách đồng thuận đi kèm'],

    ['Ban Kết Nối Việt', 'Trưởng ban đối ngoại, là học sinh, có Chủ nhiệm CLB đứng tên thư mời',
      'Mời khách, xác nhận lại trước ba ngày, ghi rõ việc cụ thể của từng khách',
      'Đón khách tại cửa, dẫn tới chỗ, nhắc giờ phần của khách',
      'Gửi thư cảm ơn có tên người viết, ghi lại ai nhận lời và ai từ chối',
      'Danh mục đối tác của CLB'],

    ['Ban Văn Hóa Việt', 'Trưởng ban nghi lễ, là học sinh',
      'Chuẩn bị nghi thức chào, cờ, tuyên ngôn, trang trí đúng bản sắc chứ không đúng xu hướng',
      'Điều hành nghi thức mở và nghi thức đóng, giữ cho phần này ngắn',
      'Cất và bảo quản đồ nghi lễ, ghi lại phần nào dài quá',
      'Ban Văn Hóa Việt khoá sau'],

    ['Ban Tinh Thần Việt', 'Trưởng ban khí thế và ghi nhận, là học sinh',
      'Soạn phần ghi nhận cho người làm việc phía sau, không chỉ người lên sân khấu',
      'Giữ năng lượng phòng, nhắc vỗ tay đúng chỗ, không hô khẩu hiệu thay nội dung',
      'Đề xuất danh sách ghi nhận cho lễ vinh danh gần nhất',
      'Hội đồng xét danh hiệu, theo G.TT_LE'],

    ['Ban Phẩm Chất Việt', 'Trưởng ban kỷ luật, là học sinh, có giám thị kèm',
      'Phổ biến quy ước ứng xử trong sự kiện cho mọi thành viên tham gia',
      'Nhắc riêng người vi phạm, không nhắc trước đám đông, ghi biên bản nếu nặng',
      'Báo cáo vi phạm và đề xuất xử lý theo nội quy',
      'Chủ nhiệm CLB'],

    ['Ban Tài Năng Việt', 'Trưởng ban tiết mục, là học sinh',
      'Nhận đăng ký, sơ tuyển, xếp thứ tự tiết mục, ghi tên người dựng cho từng tiết mục',
      'Giữ hậu trường, gọi tiết mục đúng lượt, giữ trật tự khu chờ',
      'Trả phiếu nhận xét viết tay cho từng thí sinh trong bảy ngày',
      'Ban Tài Năng Việt khoá sau, kèm danh sách tiết mục nên mời diễn lại'],

    ['Ban An Toàn và Y Tế', 'Cán bộ y tế có chứng chỉ, có hai học sinh phụ việc, là ban duy nhất người lớn giữ ghế đầu',
      'Chuẩn bị túi y tế theo G.AT_TUI_Y_TE, xác nhận bảo hiểm, chốt phương án chuyển tuyến',
      'Trực điểm y tế cố định suốt buổi, nắm danh sách em có bệnh nền và dị ứng',
      'Ghi sổ mọi ca xử lý dù nhỏ, báo gia đình các ca cần theo dõi',
      'Bộ phận y tế của trường và gia đình em liên quan']
  ];

  /* ── 4 · Kịch bản mẫu theo mốc giờ ──────────────────────────
     Mẫu dựng cho Gen Việt Day, buổi sáng kéo sang đầu chiều. Sự kiện
     khác giữ nguyên xương, đổi phần nội dung. Kịch bản lễ vinh danh
     nằm ở G.TT_LE, không lặp lại ở đây.
     Tổng thời gian có mặt của học sinh: dưới bảy giờ, kể cả dựng và
     dọn. Vượt mức đó là vượt sức lứa tuổi.                          */
  G.SK_KICH_BAN = [
    { p: '06:30', m: 'Ban Bàn Chân Việt và ban an toàn có mặt. Kiểm điện, lối thoát hiểm, nhà vệ sinh, điểm y tế, điểm tập kết khi có sự cố.',
      ai: 'Ban Bàn Chân Việt', y: 'Kiểm bốn thứ này trước khi kê một cái bàn nào. Kê xong rồi mới kiểm thì không ai dám dỡ ra nữa.' },
    { p: '07:00', m: 'Dựng sân khấu, gian hàng, biển chỉ dẫn. Mỗi gian tự dựng phần của mình, ban hậu cần chỉ cấp vật tư.',
      ai: 'Chủ gian và ban hậu cần', y: 'Em nào dựng gian nào thì em ấy giữ gian ấy cả ngày. Dựng hộ là bước đầu của việc đứng làm nền.' },
    { p: '07:30', m: 'Chạy âm thanh với đúng người sẽ nói và đúng bài sẽ phát. Không thử bằng nhạc khác.',
      ai: 'Ban Bản Lĩnh Việt', y: 'Micro hỏng lúc chín giờ là hỏng do bảy rưỡi không ai thử.' },
    { p: '07:45', m: 'Họp toàn ban tổ chức năm phút. Đọc lại giờ kết thúc và tên người cầm đồng hồ.',
      ai: 'Trưởng ban tổ chức', y: 'Cả buổi chỉ cần mọi người nhớ đúng hai điều đó là đã đỡ được nửa số sự cố điều phối.' },
    { p: '08:00', m: 'Mở cửa đón khách và khối dưới. Ban Kết Nối đón khách tại cửa, dẫn tới chỗ ngồi có tên.',
      ai: 'Ban Kết Nối Việt', y: 'Khách được dẫn tới chỗ thì không đi lạc vào hậu trường đúng lúc bận nhất.' },
    { p: '08:15', m: 'Điểm danh theo nhóm nhỏ. Trưởng nhóm báo số cho ban tổ chức, không hô tên cả sân.',
      ai: 'Trưởng nhóm', y: 'Điểm danh theo nhóm mất ba phút; điểm danh cả sân mất hai mươi phút và vẫn sót người.' },
    { p: '08:30', m: 'Nghi thức chào. Cả trường đứng, chào cờ, đọc tuyên ngôn CLB. Không lời dẫn hoa mỹ.',
      ai: 'Ban Văn Hóa Việt', y: 'Ngắn và đúng nghi thức. Phần này không phải chỗ để gây ấn tượng.' },
    { p: '08:35', m: 'Chủ nhiệm CLB nói ba phút: hôm nay là ngày gì, các em sẽ thấy gì, kết thúc lúc mấy giờ.',
      ai: 'Chủ nhiệm CLB', y: 'Ba phút. Đây là toàn bộ thời lượng người lớn được nói trên sân khấu trong buổi này.' },
    { p: '08:40', m: 'Trưởng ban tổ chức, là học sinh, giới thiệu bản đồ gian hàng và luật đi lại trong sân.',
      ai: 'Trưởng ban tổ chức', y: 'Người đứng nói tiếp theo người lớn phải là học sinh. Thứ tự này nói lên ai đang chủ nhà.' },
    { p: '08:50', m: 'Mở triển lãm gian hàng vòng một. Khối dưới đi theo lớp, mỗi lớp một tuyến để không dồn cục.',
      ai: 'Ban Bàn Chân Việt', y: 'Chia tuyến trước thì không có cảnh ba trăm em cùng đứng trước một gian.' },
    { p: '09:30', m: 'Sân khấu vòng một: ba tiết mục. Mỗi tiết mục có một câu giới thiệu do chính người dựng nói.',
      ai: 'Ban Tài Năng Việt', y: 'Một câu của người dựng đáng giá hơn cả đoạn lời dẫn viết sẵn.' },
    { p: '10:00', m: 'Nghỉ giữa buổi mười lăm phút. Uống nước, đi vệ sinh, ban y tế đi một vòng.',
      ai: 'Ban An Toàn và Y Tế', y: 'Không có mốc nghỉ thì tới trưa sẽ có em ngất, và đó là lỗi của kịch bản chứ không của em.' },
    { p: '10:15', m: 'Điểm danh lần hai theo nhóm nhỏ. Thiếu người thì báo ngay, không đợi hết buổi.',
      ai: 'Trưởng nhóm', y: 'Phát hiện thiếu người sau mười lăm phút thì tìm được; sau ba tiếng thì phải gọi công an.' },
    { p: '10:20', m: 'Triển lãm gian hàng vòng hai. Đổi chiều tuyến để gian ở cuối cũng có khách.',
      ai: 'Chủ gian', y: 'Không đổi chiều thì gian cuối tuyến cả buổi không ai ghé, và nhóm ấy sẽ không đăng ký năm sau.' },
    { p: '11:00', m: 'Sân khấu vòng hai: bốn tiết mục. Người dẫn bấm giờ, quá thời lượng thì tắt nhạc.',
      ai: 'Ban Bản Lĩnh Việt', y: 'Cắt một tiết mục dài để giữ ba tiết mục sau. Không cắt thì mất cả ba.' },
    { p: '11:40', m: 'Phần hỏi đáp: khối dưới hỏi trực tiếp người dựng tiết mục và chủ gian hàng.',
      ai: 'Học sinh khối dưới', y: 'Đây là phần đắt nhất của cả ngày hội và là phần hay bị cắt đầu tiên khi vỡ giờ.' },
    { p: '12:00', m: 'Nghỉ ăn trưa. Học sinh ăn theo nhóm tại chỗ đã phân, không tự ra khỏi khuôn viên.',
      ai: 'Ban Bàn Chân Việt', y: 'Giờ ăn là giờ dễ mất người nhất trong cả buổi.' },
    { p: '12:45', m: 'Điểm danh lần ba trước khi vào phần chiều. Nhóm nào thiếu thì dừng nhóm đó lại tìm.',
      ai: 'Trưởng nhóm', y: 'Ba lần điểm danh trong một buổi là mức tối thiểu, không phải mức cẩn thận quá.' },
    { p: '13:00', m: 'Sân khấu vòng ba: ba tiết mục cuối, tiết mục mạnh nhất xếp áp chót chứ không xếp chót.',
      ai: 'Ban Tài Năng Việt', y: 'Tiết mục chót luôn bị phần kết thúc và tiếng dọn ghế lấn mất.' },
    { p: '13:30', m: 'Công bố đường vào: khối dưới muốn tham gia thì ghi tên ở đâu, gặp ai, mốc gần nhất là ngày nào.',
      ai: 'Trưởng ban tổ chức', y: 'Không có mốc này thì cảm hứng gây ra sáng nay tối nay tắt, và ngày hội chỉ còn là một buổi vui.' },
    { p: '13:45', m: 'Ghi nhận người làm phía sau: hậu cần, y tế, trực cửa, dọn. Đọc tên từng người.',
      ai: 'Ban Tinh Thần Việt', y: 'Ghi nhận người không lên sân khấu là cách rẻ nhất để năm sau vẫn có người nhận việc hậu cần.' },
    { p: '14:00', m: 'Nghi thức đóng. Kết thúc đúng giờ đã ghi trên thư mời, kể cả khi còn phần chưa diễn.',
      ai: 'Ban Văn Hóa Việt', y: 'Đúng giờ kết thúc là lời hứa với phụ huynh đang đợi ngoài cổng. Lời hứa ấy không được vỡ.' },
    { p: '14:10', m: 'Dọn. Mỗi gian dọn phần của mình rồi mới được ra về. Ban hậu cần kiểm lượt cuối.',
      ai: 'Chủ gian và ban hậu cần', y: 'Dựng thì đông, dọn thì vắng. Luật ai dựng nấy dọn chặn đúng chỗ đó.' },
    { p: '14:40', m: 'Trả mặt bằng nguyên trạng, kiểm kê thiết bị mượn, ký biên bản trả với bộ phận cơ sở vật chất.',
      ai: 'Ban Bàn Chân Việt', y: 'Ký biên bản trả ngay trong ngày thì lần sau còn mượn được.' },
    { p: '15:00', m: 'Họp nóng mười lăm phút ngay tại chỗ: mỗi ban nói một việc chạy tốt và một việc hỏng.',
      ai: 'Trưởng ban tổ chức', y: 'Ghi ngay lúc còn nóng. Buổi rút kinh nghiệm sau hai ngày chỉ để bàn cách sửa, không để nhớ lại.' },
    { p: '15:15', m: 'Bàn giao danh sách em có sự cố trong buổi cho Coach đang kèm và cho gia đình nếu cần.',
      ai: 'Ban Trái Tim Việt', y: 'Một va chạm nhỏ trong ngày hội có thể là chuyện lớn với em ấy. Không để nó rơi ra khỏi buổi.' }
  ];

  /* ── 5 · Hạng mục ngân sách ─────────────────────────────────
     KHÔNG ghi số tiền. Ban tổ chức tự điền theo giá tại chỗ và
     theo mức Ban Giám hiệu duyệt.
     Cột: Hạng mục · Bắt buộc hay tuỳ chọn · Cắt được không ·
          Cắt thì mất gì · Cách làm phiên bản không tốn tiền       */
  G.SK_NGAN_SACH = [
    ['Bảo hiểm tai nạn cho người tham gia', 'Bắt buộc', 'Không, trong mọi trường hợp',
      'Mất tư cách tổ chức. Có tai nạn thì không ai đứng ra chịu được, kể cả về mặt pháp lý',
      'Không có phiên bản miễn phí. Nếu không đủ để mua bảo hiểm thì thu nhỏ sự kiện lại cho vừa, hoặc không tổ chức'],

    ['Túi y tế và người trực y tế', 'Bắt buộc', 'Không',
      'Mất khả năng xử lý ba mươi phút đầu của một ca bất kỳ, là ba mươi phút quyết định nhất',
      'Mượn túi y tế của phòng y tế trường và mời chính cán bộ y tế trường trực, có văn bản phân công'],

    ['Nước uống', 'Bắt buộc', 'Không, nếu sự kiện dài quá hai giờ hoặc có phần ngoài trời',
      'Mất sức của các em trước khi hết buổi, và mất luôn phần cuối chương trình',
      'Bình nước lớn và bình cá nhân mang từ nhà. Ghi rõ trong thư mời là mỗi em mang bình riêng'],

    ['Mặt bằng và điện nước', 'Bắt buộc', 'Không, nhưng thường không phải trả tiền',
      'Không có chỗ thì không có sự kiện',
      'Dùng sân trường, hội trường, phòng đa năng theo giấy đề nghị gửi Ban Giám hiệu từ mốc D-45'],

    ['Âm thanh cơ bản', 'Bắt buộc nếu quá năm mươi người', 'Không cắt hẳn được, nhưng hạ cấp được',
      'Người ngồi cuối phòng không nghe được, tức là một phần khán giả bị loại khỏi buổi',
      'Mượn bộ âm thanh của trường, hoặc thu gọn quy mô vào phòng nhỏ để nói không cần micro'],

    ['Ánh sáng sân khấu', 'Tuỳ chọn', 'Cắt được',
      'Tiết mục nghệ thuật mất một phần hiệu quả. Nội dung không mất gì',
      'Tổ chức ban ngày ở nơi có ánh sáng tự nhiên. Đây cũng là phương án an toàn hơn'],

    ['Sân khấu dựng và phông nền in', 'Tuỳ chọn', 'Cắt được',
      'Mất ảnh đẹp và mất chỗ dán logo cho khách mời',
      'Bục có sẵn, phông vẽ tay do Ban Phong Cách Việt và học sinh làm. Phông tự làm còn kể được câu chuyện của chính nhóm'],

    ['Trang trí và cây cảnh', 'Tuỳ chọn', 'Cắt được toàn bộ',
      'Không mất gì thuộc về mục đích huấn luyện',
      'Sản phẩm của chính học sinh làm vật trang trí: tranh, mô hình, bảng dự án. Vừa trang trí vừa là nội dung'],

    ['In giấy chứng nhận', 'Bắt buộc', 'Không cắt nội dung, cắt được chất liệu',
      'Em không cầm được bằng chứng về nhà, và hộ chiếu thiếu một mục có chữ ký',
      'In đen trắng trên giấy thường, ký tay và đóng dấu trường. Chữ ký thật quan trọng hơn giấy dày'],

    ['Kỷ niệm chương và cúp', 'Tuỳ chọn', 'Cắt được',
      'Mất vật kỷ niệm cầm tay. Không mất giá trị ghi nhận nếu phần đọc tên và ghi hộ chiếu vẫn đủ',
      'Kỷ niệm chương do chính học sinh làm thủ công, hoặc thay bằng một trang viết tay của Coach về em đó'],

    ['Áo đồng phục sự kiện', 'Tuỳ chọn', 'Cắt được',
      'Khó nhận ra ai là ban tổ chức trong đám đông',
      'Đồng phục trường sẵn có, thêm băng đeo tay hoặc thẻ tên do ban tổ chức tự làm, phân màu theo ban'],

    ['Ăn nhẹ cho ban tổ chức trực cả ngày', 'Bắt buộc nếu ca trực quá sáu giờ', 'Không, với người trực cả ngày',
      'Người trực đói và mệt vào đúng lúc cần tỉnh nhất là cuối buổi',
      'Mỗi thành viên ban tổ chức mang phần ăn của mình, ban hậu cần bố trí chỗ ăn và giờ ăn theo ca'],

    ['Vận chuyển và đưa đón', 'Bắt buộc nếu có di chuyển ngoài trường', 'Không',
      'Mất kiểm soát an toàn ở đúng đoạn nguy hiểm nhất của cả sự kiện',
      'Không có phiên bản miễn phí. Chọn địa điểm trong trường để không phát sinh đoạn di chuyển'],

    ['Quà cho khách mời', 'Tuỳ chọn', 'Cắt được',
      'Không mất gì. Khách nhận lời vì nội dung, không vì quà',
      'Thư cảm ơn viết tay của học sinh, kèm ảnh phần việc mà khách đã góp vào. Nhiều khách giữ thứ này lâu hơn giữ quà'],

    ['Chụp ảnh và quay phim thuê ngoài', 'Tuỳ chọn', 'Cắt được',
      'Chất lượng hình ảnh giảm. Tư liệu vẫn còn nếu có người chụp',
      'Ban Lan Tỏa Việt chụp bằng điện thoại, phân trước ba người ba góc, và bắt buộc đối chiếu danh sách đồng thuận'],

    ['Livestream và thiết bị phát trực tiếp', 'Tuỳ chọn', 'Cắt được',
      'Phụ huynh ở xa không xem được trực tiếp',
      'Quay vài đoạn ngắn rồi đăng sau buổi, chỉ đăng người đã có đồng thuận. Cách này còn kiểm soát được hình ảnh tốt hơn'],

    ['Văn phòng phẩm và vật tư gian hàng', 'Bắt buộc ở mức tối thiểu', 'Cắt được phần lớn',
      'Không có gì để các nhóm dựng gian và ghi biên bản',
      'Gom vật liệu tái sử dụng từ các sự kiện trước, ghi kiểm kê để khoá sau dùng tiếp'],

    ['Quỹ dự phòng sự cố', 'Bắt buộc', 'Không',
      'Một xe cấp cứu hoặc một lần đổi phương án vì mưa sẽ không có gì để chi',
      'Không có phiên bản miễn phí. Nếu không lập được quỹ dự phòng thì hạ quy mô cho tới khi lập được']
  ];

  /* ── 6 · Rủi ro sự kiện và phanh ────────────────────────────
     Đọc to toàn bộ bảng này trong buổi tổng duyệt ở chặng K4, và
     phân tên người cầm phanh cho từng mục. Bảng không có tên người
     là bảng chưa dùng được.                                        */
  G.SK_RUI_RO = [
    { t: 'Thời tiết đổi vào ngày chạy',
      dau: 'Dự báo xấu dần trong tuần cuối. Ban tổ chức vẫn giữ nguyên phương án ngoài trời vì đã in phông và đã báo phụ huynh.',
      phanh: 'Ngày dự phòng và phương án trong nhà phải chốt ngay ở chặng K1, không phải khi trời đã chuyển. Mốc quyết định là D-1 lúc mười tám giờ: một người duy nhất, là trưởng ban tổ chức, tuyên bố chạy phương án nào, và tin nhắn tới phụ huynh đi ngay sau đó.' },

    { t: 'Thiếu người vào phút chót',
      dau: 'Sáng ngày chạy vắng vài trưởng ban vì ốm, vì thi, vì gia đình có việc. Việc của họ không ai biết cách làm.',
      phanh: 'Mỗi ghế trong G.SK_BAN có một người thay đã biết việc, tên ghi cạnh tên chính từ chặng K2. Người thay phải dự tổng duyệt. Ghế nào không tìm được người thay thì phần việc của ghế ấy bị cắt khỏi chương trình, chứ không để trống chờ may.' },

    { t: 'Chương trình vượt giờ',
      dau: 'Tới giữa buổi đã chậm ba mươi phút. Ban tổ chức cắt phần hỏi đáp và phần ghi nhận vì đó là hai phần dễ cắt nhất.',
      phanh: 'Người cầm đồng hồ được trao quyền cắt từ trước và không tranh luận tại chỗ. Thứ tự cắt định sẵn ở tổng duyệt và ghi vào kịch bản: cắt lời dẫn trước, cắt phần người lớn nói trước, cắt tiết mục dài trước. Phần hỏi đáp và phần ghi nhận nằm ở cuối danh sách được cắt.' },

    { t: 'Khách mời không đến hoặc đến muộn',
      dau: 'Khách quý báo bận trước một ngày, hoặc tới muộn bốn mươi phút, và cả chương trình dừng lại chờ.',
      phanh: 'Không phần nào của chương trình phụ thuộc vào một khách duy nhất. Ban Kết Nối xác nhận lại ở D-3 và D-1. Nếu khách muộn thì chương trình chạy tiếp, phần của khách chuyển xuống mốc trống gần nhất. Chờ một người là lấy thời gian của tất cả những người đã tới đúng giờ.' },

    { t: 'Thiết bị hỏng giữa buổi',
      dau: 'Micro tắt, máy chiếu mất tín hiệu, mất điện khu vực. Sân khấu đứng im và đám đông bắt đầu ồn.',
      phanh: 'Mỗi thiết bị quan trọng có một phương án dự phòng đã thử tại chỗ trong tổng duyệt: micro thứ hai, bản in thay cho slide, loa cầm tay. Kịch bản có sẵn một mục lấp chỗ dài năm phút do Ban Bản Lĩnh Việt cầm, dùng ngay khi có sự cố kỹ thuật.' },

    { t: 'Trẻ đi lạc hoặc rời khỏi khu vực',
      dau: 'Hết một phần chương trình mới phát hiện thiếu người. Không ai nhớ lần cuối thấy em ấy là lúc nào.',
      phanh: 'Điểm danh theo nhóm nhỏ ở đầu và cuối mỗi phần, tối thiểu ba lần một buổi. Mỗi nhóm có một trưởng nhóm nắm danh sách giấy. Phát hiện thiếu thì báo ngay trong một phút, khoá cổng, chia khu tìm theo sơ đồ đã phân từ tổng duyệt, và gọi gia đình sau mười lăm phút không thấy.' },

    { t: 'Sự cố y tế',
      dau: 'Một em ngất giữa sân nắng hoặc bị va chạm. Người xung quanh xúm lại, không ai biết gọi ai.',
      phanh: 'Điểm y tế cố định có biển, có người trực suốt buổi, ai cũng biết chỗ. Số điện thoại khẩn và phương án chuyển tuyến in ra dán ở ba chỗ. Quy trình chi tiết theo du-lieu-antoan.js — kho này không thay thế kho ấy.' },

    { t: 'Phụ huynh bức xúc tại chỗ',
      dau: 'Một phụ huynh không hài lòng về giải thưởng, về chỗ ngồi, hoặc về việc con mình không được lên sân khấu, và nói to giữa đám đông.',
      phanh: 'Mời ra khỏi khu vực đông người trong một phút, có một giáo viên và một người ghi biên bản cùng ngồi. Nghe hết trước khi giải thích. Không tranh luận về tiêu chí giữa buổi; hẹn một buổi làm việc trong ba ngày và giữ đúng hẹn. Học sinh không được kéo vào cuộc này.' },

    { t: 'Truyền thông sai hoặc đăng ảnh chưa được phép',
      dau: 'Bài đăng ghi sai tên giải, sai tên trường, hoặc có mặt trẻ chưa ký đồng thuận. Bài đã được chia sẻ lại nhiều nơi.',
      phanh: 'Mọi bài qua một người duyệt trước khi đăng, đối chiếu với danh sách đồng thuận. Có sai thì gỡ trong một giờ, đăng đính chính có tên người chịu trách nhiệm, không lặng lẽ sửa. Yêu cầu gỡ ảnh từ người trong ảnh được thực hiện ngay, không hỏi lý do.' },

    { t: 'Người lớn chiếm sân khấu',
      dau: 'Phần phát biểu của người lớn dài gấp nhiều lần dự kiến. Học sinh ngồi dưới nghe, hoặc đứng hai bên cầm hoa.',
      phanh: 'Tổng thời lượng người lớn nói được ghi thành con số trong kịch bản từ chặng K2 và đọc to ở tổng duyệt. Người cầm đồng hồ có quyền báo hết giờ với bất kỳ ai, kể cả khách mời. Học sinh không đứng làm nền: ai lên sân khấu là để làm một việc có tên.' },

    { t: 'Học sinh chỉ làm nền, người lớn làm hết phần khó',
      dau: 'Sự kiện chạy trơn tru đến bất thường. Hỏi một em trong ban tổ chức về phần việc của em thì em không trả lời được.',
      phanh: 'Ở buổi rút kinh nghiệm, hỏi ba em bất kỳ ba câu: em quyết định việc gì, em làm hỏng chỗ nào, làm lại thì em đổi gì. Không trả lời được thì sự kiện ấy không được tính vào hồ sơ tuyến Xã hội của các em, dù ảnh đẹp tới đâu.' },

    { t: 'Chi vượt và không có chứng từ',
      dau: 'Ngày chạy phát sinh vài khoản mua vội. Đóng sổ thì thiếu hoá đơn, và một vài người tự bỏ tiền túi rồi ngại đòi.',
      phanh: 'Một người duy nhất giữ quỹ và ghi sổ, mọi khoản có chứng từ hoặc giấy biên nhận viết tay ký hai bên. Không ai được tự chi rồi báo sau. Sổ chi công khai trước toàn ban tổ chức trong chặng K6. Không học sinh nào phải bỏ tiền túi cho sự kiện.' },

    { t: 'Huy động tiền từ phụ huynh trong lớp',
      dau: 'Một nhóm phụ huynh đề nghị đóng góp cho sự kiện đẹp hơn. Đề nghị lan sang lớp khác và thành áp lực với gia đình khó khăn.',
      phanh: 'Không thu bất kỳ khoản nào từ phụ huynh trong lớp cho sự kiện, kể cả khoản tự nguyện, kể cả khi phụ huynh chủ động đề xuất. Nguồn lực chỉ đến từ ngân sách nhà trường hoặc tài trợ có văn bản qua Ban Giám hiệu. Ai nhận tiền ngoài kênh này thì bị rút khỏi ban tổ chức.' },

    { t: 'Tài trợ đòi đổi nội dung',
      dau: 'Nhà tài trợ đề nghị thêm phần giới thiệu sản phẩm, thêm thời lượng phát biểu, hoặc đổi thứ tự trao giải.',
      phanh: 'Điều kiện tài trợ ghi thành văn bản trước khi nhận: được nêu tên công khai, không được can thiệp nội dung, không được tiếp cận trực tiếp học sinh để giới thiệu sản phẩm. Không thoả thuận nào được sửa sau khi tiền đã về. Không đồng ý điều kiện thì trả lại tài trợ.' }
  ];

  /* ── 7 · Đo một sự kiện có đáng tổ chức lại không ────────────
     Đo ở chặng K6, trong vòng mười bốn ngày. Kết luận ghi vào trang
     bàn giao: nên làm lại · làm lại nhưng sửa · bỏ.
     Cột: Chỉ số · Đo bằng gì · Ngưỡng đáng làm lại · Ngưỡng nên bỏ  */
  G.SK_DO = [
    ['Tỉ lệ ghế tổ chức do học sinh giữ',
      'Đếm trên bảng phân ban: số ghế học sinh làm trưởng ban chia cho tổng số ghế',
      'Từ hai phần ba trở lên',
      'Dưới một nửa. Dưới mức này thì đây là sự kiện của người lớn, và tên sự kiện đang gọi sai'],

    ['Số học sinh có việc cụ thể trong ngày chạy',
      'Đối chiếu bảng phân công ở chặng K4 với danh sách có mặt thật',
      'Không ai trong ban tổ chức đứng không, và ít nhất một phần ba tổng số người dự có việc',
      'Có nhóm học sinh được huy động chỉ để ngồi làm khán giả cho đủ chỗ'],

    ['Đường vào mở ra sau sự kiện',
      'Đếm số học sinh khối dưới đăng ký tham gia trong hai tuần sau, so với hai tuần trước',
      'Số đăng ký sau cao hơn số trước một cách nhìn thấy được',
      'Không ai đăng ký thêm. Sự kiện không dẫn tới đâu cả'],

    ['Đầu ra bắt buộc có đủ không',
      'Đối chiếu với cột đầu ra bắt buộc của sự kiện ấy trong G.SK_SAU_TRU',
      'Đủ toàn bộ, nộp đúng hạn mười bốn ngày',
      'Thiếu trang tổng kết hoặc thiếu bản ghi hộ chiếu. Không có hồ sơ thì không có gì để bàn giao'],

    ['Sự cố an toàn',
      'Sổ ghi của Ban An Toàn và Y Tế, tính cả ca nhỏ',
      'Không có ca nào phải chuyển tuyến, và mọi ca đều được ghi sổ',
      'Có ca chuyển tuyến do lỗi tổ chức, hoặc có ca không được ghi sổ'],

    ['Đúng giờ kết thúc',
      'So giờ kết thúc thật với giờ ghi trên thư mời',
      'Chênh dưới mười lăm phút',
      'Chênh quá một giờ, hoặc phải cắt phần nội dung chính để kịp giờ'],

    ['Thời lượng có mặt của học sinh',
      'Tính từ giờ em phải có mặt tới giờ em được về, kể cả dựng và dọn',
      'Trong khung sức của lứa tuổi mà Hội đồng Chuyên môn đã duyệt cho khối ấy',
      'Vượt khung đó, hoặc có em phải ở lại sau giờ tan mà gia đình không được báo trước'],

    ['Người xác nhận ngoài hệ có mặt',
      'Đếm số người ngoài trường ký xác nhận hoặc ngồi dự thật',
      'Có ít nhất một người, và người ấy ký được vào hồ sơ của học sinh',
      'Không có ai ngoài hệ. Sự kiện chỉ tự chứng minh với chính mình'],

    ['Chi phí so với mục đích',
      'Đối chiếu sổ chi đã đóng với cột bắt buộc và tuỳ chọn trong G.SK_NGAN_SACH',
      'Phần chi cho hạng mục bắt buộc lớn hơn phần chi cho hạng mục tuỳ chọn',
      'Chi cho trang trí, phông nền và quà nhiều hơn chi cho an toàn và nội dung'],

    ['Ban tổ chức có muốn làm lại không',
      'Hỏi riêng từng trưởng ban học sinh ở buổi rút kinh nghiệm: em có nhận ghế này lần nữa không, vì sao',
      'Đa số nhận lại, và nêu được lý do liên quan tới việc chứ không tới cảm giác vui',
      'Đa số không nhận lại, hoặc chỉ nhận vì ngại từ chối'],

    ['Có gì để bàn giao cho khoá sau',
      'Đọc trang bàn giao: ba việc giữ, ba việc bỏ, một việc chưa ai giải được',
      'Có đủ ba phần, viết cụ thể tới mức người chưa dự cũng làm theo được',
      'Chỉ có ảnh và lời khen. Không có trang bàn giao thì năm sau sẽ lại nghĩ lại từ đầu']
  ];

  /* ── 8 · Luật tổ chức sự kiện ───────────────────────────────
     Đọc to toàn bộ trong buổi họp đầu tiên của chặng K1.           */
  G.SK_LUAT = [
    'Mỗi sự kiện phục vụ **một mục đích huấn luyện** viết thành một câu. Không viết được một câu thì chưa được tổ chức. Sự kiện tổ chức để có ảnh đăng là sự kiện không có mục đích.',
    'Học sinh **giữ ghế tổ chức**, không làm nền. Ai lên sân khấu là để làm một việc có tên. Không huy động học sinh đứng hai bên cầm hoa, không huy động lớp ngồi cho đủ chỗ.',
    'Người lớn trong ban tổ chức có đúng ba vai: **giữ an toàn**, **mở cửa**, và **hỏi lại**. Làm thay phần khó là lấy mất chính thứ mà sự kiện định rèn.',
    'Không kéo dài quá sức lứa tuổi. Thời lượng có mặt của học sinh tính từ giờ dựng tới giờ dọn, và phải nằm trong khung Hội đồng Chuyên môn duyệt cho khối ấy.',
    'Không tổ chức vào thời gian ảnh hưởng giờ học chính khoá, trừ khi có văn bản đồng ý của Ban Giám hiệu ghi rõ số tiết bị ảnh hưởng.',
    '**Không huy động tiền từ phụ huynh trong lớp** cho sự kiện, kể cả khoản tự nguyện, kể cả khi phụ huynh chủ động đề xuất. Không học sinh nào phải bỏ tiền túi.',
    'Tài trợ chỉ nhận qua Ban Giám hiệu, có văn bản, theo ba nguyên tắc của G.TY_XH_LUAT: minh bạch, đúng mục đích, vinh danh. Nhà tài trợ được nêu tên, không được đổi nội dung, không được tiếp cận học sinh để giới thiệu sản phẩm.',
    'Chưa có chủ trương bằng văn bản thì không đặt gì, không báo phụ huynh, không nhận khoản nào.',
    'Sự kiện ngoài cơ sở hoặc ở lại qua đêm chỉ chạy khi **hồ sơ an toàn và bảo hiểm tai nạn đủ** theo du-lieu-antoan.js. Thiếu một trong hai thì huỷ, không có ngoại lệ vì đã lỡ báo.',
    'Không ống kính nếu chưa có **đồng thuận hình ảnh bằng văn bản**, kể cả với khách mời. Yêu cầu gỡ ảnh của người trong ảnh được thực hiện ngay, không hỏi lý do.',
    'Mỗi ghế có một người thay đã biết việc và đã dự tổng duyệt. Ghế không có người thay thì phần việc của ghế ấy bị cắt khỏi chương trình từ chặng K4.',
    'Một người duy nhất **cầm đồng hồ** và có quyền cắt bất kỳ phần nào, kể cả phần của khách mời. Quyết định cắt không tranh luận tại chỗ.',
    'Thứ tự cắt khi vỡ giờ định sẵn ở tổng duyệt: cắt lời dẫn trước, cắt phần người lớn nói trước, cắt tiết mục dài trước. Phần hỏi đáp và phần ghi nhận cắt sau cùng.',
    'Kết thúc **đúng giờ đã ghi trên thư mời**, kể cả khi còn phần chưa diễn. Đó là lời hứa với phụ huynh đang đợi ngoài cổng.',
    'Điểm danh theo nhóm nhỏ tối thiểu ba lần một buổi. Phát hiện thiếu người thì báo trong một phút, không đợi hết phần.',
    'Ai dựng gian nào thì giữ và dọn gian ấy. Không ai được ra về trước khi phần của mình đã dọn xong.',
    'Ghi nhận **người làm phía sau** trong mọi sự kiện: hậu cần, y tế, trực cửa, dọn. Đọc tên từng người. Đây là điều kiện để năm sau vẫn có người nhận việc hậu cần.',
    'Ghi giờ tham gia và vai trò vào hộ chiếu trong **bảy ngày**. Làm mà không ghi thì sau một tháng không còn ai nhớ chính xác, và công của các em biến mất khỏi hồ sơ.',
    'Sự kiện chưa được coi là kết thúc cho tới khi **trang bàn giao** nộp cho Hội đồng Chuyên môn: ba việc giữ, ba việc bỏ, một việc chưa ai giải được.',
    'Đo theo G.SK_DO rồi mới quyết định năm sau. **Làm vì năm ngoái có làm** không phải là một lý do, và là lý do duy nhất bị bác thẳng ở chặng K1.'
  ];

})(window.GV = window.GV || {});
