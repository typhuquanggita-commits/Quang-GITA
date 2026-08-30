/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT · KHO CHI HỘI — VẬN HÀNH MỘT ĐƠN VỊ CƠ SỞ

   BIÊN SOẠN MỚI — chưa có trong kho gốc ở mức chi tiết. Cần Hội
   đồng Chuyên môn duyệt; phần tài chính cần kế toán và nhà trường
   rà lại trước khi áp dụng.

   Kho gốc đã có khung chi hội: GV.CLB trong du-lieu.js dựng sáu
   vòng, chín mục kịch bản, bảy cột bảng số, bảy ghế, sáu tổ mũi
   nhọn, mười điều luật, ba tầng tổ chức và năm bước mở chi hội
   mới. GV.TAI_CHINH dựng bốn dòng tiền ở cấp TOÀN HỆ. G.VH2_*
   trong du-lieu-vanhanh2.js dựng 57 mốc trước – trong – sau một
   buổi sinh hoạt và 12 Ban của tuyến CLB trường học.

   Chỗ trống mà kho này lấp: mọi thứ trên đều dừng ở mức khung.
   Không có bản mở chi hội theo mốc tuần, không có vòng bảy ngày
   ở cấp chi hội, không có tài chính ở cấp một chi hội, không có
   quy tắc luân phiên và bàn giao ghế, không có danh sách dấu
   hiệu một chi hội đang hỏng.

   TRUNG THỰC VỚI NGUỒN — toàn bộ kho này là SUY RA từ khung sẵn
   có, không rút từ một tài liệu gốc nào. Tên gọi (chi hội, vòng
   V0–V5, bảy ghế, băng ĐỎ – CAM – VÀNG – XANH, bảng số bảy cột,
   tổ mũi nhọn, Quỹ Nhân tài, liên chi hội vùng) lấy đúng chữ của
   kho gốc để hai bên khớp nhau. Phần cơ chế lấy hướng từ kho
   tham chiếu BNI (du-lieu-bni.js), đã đổi đơn vị đo sang bằng
   chứng trưởng thành.

   ĐỐI TƯỢNG LÀ HỌC SINH PHỔ THÔNG. Vì vậy phần tiền ở đây viết
   theo hướng thắt chặt chứ không theo hướng mở rộng: trẻ không
   giữ tiền mặt, không có áp lực đóng góp, không có khoản nào
   phân biệt được nhà giàu với nhà nghèo. Không mục nào ghi số
   tiền cụ thể, không mục nào dẫn văn bản pháp luật, không mục
   nào nêu tên ngân hàng hay ví điện tử — những thứ đó phải do
   nhà trường và kế toán điền theo quy định của chính đơn vị.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Mở một chi hội mới từ số không ───────────────────
     Sáu chặng, mốc đếm theo tuần. Tuần âm là giai đoạn chuẩn
     bị, chưa có buổi sinh hoạt nào. Tuần 1 là buổi sinh hoạt
     đầu tiên. Năm bước trong GV.CLB.moMoi nằm rải ở chặng 3,
     4 và 6 dưới đây; kho này thêm phần trước và phần sau mà
     khung gốc chưa nói tới.                                  */
  G.CH_MO_MOI = [
    { ma: 'C1', t: 'DỰNG LÕI', nam: 'Tuần −8 → −5', mau: '#185AB4',
      hoi: 'Có mười hai người thật muốn mở, hay chỉ có một người muốn và mười một người nể?',
      lam: ['Người khởi xướng viết một trang: mở ở đâu, cho ai, vì sao chỗ đó cần',
            'Gom mười hai thành viên sáng lập, trong đó ít nhất bốn người đã ở V2 trở lên tại chi hội mẹ',
            'Gặp riêng từng người trong mười hai, hỏi một câu: em bỏ được bao nhiêu giờ mỗi tuần trong sáu tháng tới',
            'Mời một cố vấn V5 bảo trợ và một Coach của Học viện đỡ đầu — cả hai phải nhận bằng văn bản, không nhận bằng lời'],
      dich: ['Danh sách mười hai người có chữ ký của chính em và của phụ huynh',
             'Một trang lý do mở, có tên người chịu trách nhiệm',
             'Thư nhận bảo trợ của cố vấn V5 và thư nhận đỡ đầu của Coach'],
      cong: 'Chi hội mẹ họp và biểu quyết. Không đủ mười hai chữ ký hoặc thiếu người bảo trợ thì dừng, không chạy tiếp bằng lời hứa sẽ gom sau.',
      rui: 'Gom cho đủ đầu người. Một danh sách mười hai tên trong đó bảy người chưa hiểu mình ký gì sẽ rơi rụng hết trong tám tuần đầu, và chi hội chết trước khi kịp có buổi thứ mười.' },

    { ma: 'C2', t: 'XIN PHÉP VÀ CHỌN CHỖ', nam: 'Tuần −4 → −1', mau: '#5140B4',
      hoi: 'Nơi này có cho phép, có an toàn, và có đứng được suốt sáu tháng không?',
      lam: ['Làm việc với nhà trường hoặc nơi cho mượn địa điểm: xin phép bằng văn bản, ghi rõ khung giờ cố định hằng tuần',
            'Kiểm địa điểm theo bộ chuẩn an toàn: lối vào ra, ánh sáng, chỗ ngồi, nơi mở nhìn thấy được cho các cuộc gặp một-một',
            'Chốt một khung giờ duy nhất và không đổi trong cả nhiệm kỳ đầu',
            'Họp phụ huynh của mười hai thành viên sáng lập, nói rõ chi hội đòi gì và không đòi gì'],
      dich: ['Văn bản đồng ý của nơi cho mượn địa điểm, có khung giờ',
             'Biên bản kiểm an toàn địa điểm có chữ ký người kiểm',
             'Biên bản họp phụ huynh, ghi rõ cam kết không thu tiền mặt từ học sinh'],
      cong: 'Coach đỡ đầu ký xác nhận địa điểm đạt chuẩn an toàn. Không đạt thì đổi chỗ, không chạy tạm.',
      rui: 'Mượn chỗ bằng quan hệ cá nhân, không có giấy. Người quen chuyển công tác là chi hội mất chỗ giữa nhiệm kỳ, và một chi hội mất chỗ hai lần thì thành viên không quay lại lần thứ ba.' },

    { ma: 'C3', t: 'TÁM TUẦN CHẠY THỬ', nam: 'Tuần 1 → 8', mau: '#0B7350',
      hoi: 'Chạy đúng kịch bản chín mục trong 90 phút được tám tuần liền không?',
      lam: ['Sinh hoạt hằng tuần theo đúng kịch bản chín mục, kết thúc đúng phút thứ 90',
            'Bảng số bảy cột chạy từ tuần đầu tiên — thiếu cột nào thì tuần đó tính là chưa chạy',
            'Cố vấn V5 dự ít nhất bốn trong tám buổi và ghi phiếu quan sát',
            'Mỗi thành viên sáng lập dẫn ít nhất một khách tới trong tám tuần'],
      dich: ['Tám biên bản buổi sinh hoạt', 'Tám bảng số công bố trong 24 giờ',
             'Bốn phiếu quan sát của cố vấn'],
      cong: 'Cố vấn V5 kết luận đạt hay chưa đạt sau tuần 8. Chưa đạt thì chạy thử thêm bốn tuần, tối đa một lần.',
      rui: 'Sửa kịch bản cho dễ chạy. Chi hội mới bỏ mục ghế nóng hoặc rút vòng 45 giây vì thấy mất giờ; sáu tháng sau nó là một cuộc họp thân mật, không còn là chi hội.' },

    { ma: 'C4', t: 'MỞ CỬA VÀ ĐỦ QUÂN SỐ', nam: 'Tuần 9 → 16', mau: '#A8801F',
      hoi: 'Có đủ hai mươi người và có tám tuần liền không tuần nào cả chi hội ở băng ĐỎ không?',
      lam: ['Tổ chức ngày mở cửa đầu tiên, mời phụ huynh và nhà trường dự trọn buổi',
            'Ban Thành viên xét đơn vào theo đúng quy trình, không rút gọn cho người quen',
            'Ghép cặp đôi rèn cho toàn bộ thành viên mới trong tuần đầu họ vào',
            'Lập hai tổ mũi nhọn đầu tiên theo hướng mà thành viên hiện có thật sự làm được'],
      dich: ['Danh sách đủ hai mươi thành viên có đơn được duyệt',
             'Tám tuần bảng số liên tiếp không có tuần nào cả chi hội ở băng ĐỎ',
             'Hai tổ mũi nhọn có tên tổ trưởng và một dự án đang chạy'],
      cong: 'Ban Thành viên và cố vấn V5 cùng rà. Chưa đủ hai mươi thì kéo dài chặng này, không hạ chuẩn xét đơn để cho đủ số.',
      rui: 'Nhận ồ ạt cho đủ hai mươi. Người vào không qua cửa xét sẽ không hiểu luật, và tuần thứ ba họ dạy cả chi hội rằng luật ở đây là thứ nói cho vui.' },

    { ma: 'C5', t: 'TRAO GHẾ VÀ CẮT DÂY', nam: 'Tuần 17 → 24', mau: '#9E470D',
      hoi: 'Chi hội chạy được khi người khởi xướng vắng mặt ba buổi liền không?',
      lam: ['Bầu ban điều hành đủ bảy ghế bằng phiếu kín, người khởi xướng không được ứng cử ghế Chủ tịch nhiệm kỳ đầu',
            'Mỗi ghế nhận sổ ghế và bản mô tả việc chia bốn khối: trước buổi, trong buổi, sau buổi, hằng tháng',
            'Người khởi xướng cố tình vắng ba buổi liên tiếp trong chặng này, báo trước, không can thiệp từ xa',
            'Cố vấn V5 giảm tần suất dự từ hằng tuần xuống hai tuần một lần'],
      dich: ['Biên bản bầu cử có kết quả từng ghế', 'Bảy sổ ghế đã mở và đang được ghi',
             'Ba biên bản buổi sinh hoạt chạy khi người khởi xướng vắng'],
      cong: 'Ba buổi vắng ấy phải kết thúc đúng phút thứ 90 và có bảng số đủ. Một buổi hỏng thì làm lại cả ba.',
      rui: 'Người khởi xướng giữ ghế Chủ tịch nhiệm kỳ đầu vì thấy chưa ai làm được. Chi hội ấy sẽ không bao giờ tự đứng, và khi người ấy đi học đại học thì chi hội tan trong một quý.' },

    { ma: 'C6', t: 'NGHIỆM THU VÀ CÔNG NHẬN', nam: 'Tuần 25 → 26', mau: '#BE0E16',
      hoi: 'Liên chi hội vùng nhìn vào hồ sơ này có thấy đúng chuẩn của mình không?',
      lam: ['Nộp hồ sơ nghiệm thu: 24 biên bản buổi, 24 bảng số, sổ ghế, sổ quỹ, sổ an toàn',
            'Một đoàn của liên chi hội vùng dự một buổi bất kỳ, không báo trước quá ba ngày',
            'Phỏng vấn ngẫu nhiên năm thành viên, trong đó ít nhất hai người vào sau tuần 9',
            'Đối chiếu sổ quỹ với xác nhận của người giữ tiền phía nhà trường hoặc Học viện'],
      dich: ['Biên bản nghiệm thu của liên chi hội vùng',
             'Quyết định công nhận chi hội chính thức và trao huy hiệu chi hội',
             'Danh sách hai đến ba việc phải sửa trong nhiệm kỳ tiếp theo'],
      cong: 'Liên chi hội vùng biểu quyết. Không công nhận thì chi hội tiếp tục tư cách chi hội thử, được xét lại sau mười ba tuần.',
      rui: 'Nghiệm thu bằng ấn tượng của một buổi đẹp. Đoàn nghiệm thu phải đọc sổ trước và dự buổi sau — làm ngược lại thì mọi chi hội đều đạt, và chuẩn vùng mất giá trị trong hai năm.' }
  ];

  /* ── 2 · Tổ mũi nhọn — mười hai loại ──────────────────────
     Sáu loại đầu là tổ thường trực, đã có tên trong GV.CLB.to.
     Sáu loại sau là tổ thời vụ: lập vì một việc khó, giải thể
     khi việc xong. Cột cuối là cột quan trọng nhất của bảng —
     một tổ sống lâu hơn lý do tồn tại của nó sẽ thành một
     nhóm đặc quyền, và đó là cách chi hội mất công bằng nhanh
     nhất.                                                     */
  G.CH_TO_MUI_NHON = [
    ['Tổ Truyền thông',
     'Ngay từ tuần đầu chi hội chạy thử — không có tổ này thì không ai biết chi hội tồn tại',
     '4–6 người giữ sáu mũi khác nhau: viết, ảnh, dựng phim, dẫn chương trình, thiết kế, phân phối',
     'Ghi lại mỗi buổi, dựng hồ sơ hình ảnh chi hội, viết bài vinh danh có tên và có hành vi cụ thể',
     'Không giải thể. Đổi toàn bộ nhân sự mỗi nhiệm kỳ, giữ lại đúng một người làm cầu nối',
     'Tổ giữ quyền quyết ai được lên hình. Khi lời khen chỉ rơi vào người trong tổ và bạn bè của tổ.'],

    ['Tổ Khoa học – Công nghệ',
     'Khi có ít nhất bốn thành viên đang thật sự làm một thứ đo được: mã, thí nghiệm, bài thi học thuật',
     '4–6 người, mỗi người một mũi: lập trình, phần cứng, thí nghiệm, dữ liệu, thi học thuật, hướng dẫn lại',
     'Một sản phẩm mỗi chu kỳ 90 ngày, có người dùng ngoài chi hội',
     'Không giải thể nếu còn dự án đang có người dùng. Giải thể nếu hai chu kỳ liền không ra sản phẩm',
     'Tổ nói chuyện bằng thứ tiếng không ai ngoài tổ hiểu, và bắt đầu từ chối giải thích khi được hỏi.'],

    ['Tổ Kinh doanh – Khởi nghiệp',
     'Chỉ lập khi đã có người lớn nhận trách nhiệm giám sát toàn bộ phần tiền bằng văn bản',
     '4–6 người, và bắt buộc có một cố vấn người lớn ngồi cùng mọi buổi liên quan tới thu chi',
     'Dựng một dự án học tập có sản phẩm thật; mọi đồng tiền đi qua kênh chính thức, không qua tay học sinh',
     'Giải thể ngay khi cố vấn người lớn rút, kể cả khi dự án đang chạy tốt',
     'Tổ bắt đầu chia phần cho nhau, hoặc coi doanh thu là thành tích cá nhân của tổ trưởng.'],

    ['Tổ Nghệ thuật',
     'Khi chi hội có nhu cầu biểu diễn định kỳ, hoặc có từ bốn thành viên theo đuổi một bộ môn',
     '4–6 người: nhạc, hội hoạ, sân khấu, múa, âm thanh, hậu đài',
     'Giữ phần nghi lễ và phần trình diễn của mọi sự kiện chi hội; dựng một tiết mục mỗi quý',
     'Không giải thể. Rà lại danh sách mỗi nhiệm kỳ để người mới có chỗ vào',
     'Tổ tự nhận là bộ mặt của chi hội và giành phần lớn thời lượng sân khấu trong mọi sự kiện.'],

    ['Tổ Thể chất',
     'Từ tuần đầu. Đây là tổ dễ lập nhất và dễ bị coi nhẹ nhất',
     '4–6 người, ưu tiên người có thể duy trì lịch tập đều chứ không phải người khoẻ nhất',
     'Giữ lịch vận động chung, tổ chức giải nội bộ, kèm người đang đuối sức bền',
     'Không giải thể. Tổ trưởng đổi mỗi nhiệm kỳ, không có ngoại lệ',
     'Tổ biến giải nội bộ thành sân riêng, và người mới không được xếp vào đội nào.'],

    ['Tổ Xã hội – Phụng sự',
     'Trước dự án cộng đồng đầu tiên ít nhất bốn tuần',
     '4–6 người, có ít nhất một người đã từng đi một dự án phụng sự trọn vẹn từ đầu tới cuối',
     'Tìm nơi thụ hưởng thật, khảo sát trước, làm, và quay lại kiểm sau ba tháng',
     'Không giải thể. Nhưng mỗi dự án là một tiểu tổ riêng, giải thể sau khi kiểm hậu kỳ',
     'Tổ chọn dự án theo mức độ dễ chụp ảnh. Dấu hiệu sớm: không ai nhớ tên người thụ hưởng.'],

    ['Tổ Mở chi hội',
     'Khi chi hội đã đủ ba mươi người và có ít nhất bốn người ở V2 trở lên muốn đi mở',
     '4–6 người, dẫn bởi một thành viên đã qua trọn một nhiệm kỳ ghế',
     'Chạy sáu chặng mở chi hội mới cho tới khi được liên chi hội vùng công nhận',
     'Giải thể ngay khi chi hội mới được công nhận chính thức, muộn nhất là tuần 26',
     'Tổ ở lại sau khi chi hội mới đã đứng, và thành một tầng quản lý không ai bầu ra.'],

    ['Tổ Sự kiện',
     'Sáu tuần trước một sự kiện lớn: ngày mở cửa, đại hội, hội thi liên chi hội',
     '4–6 người rút từ nhiều tổ khác, có một người của Ban Đón khách',
     'Lo trọn một sự kiện: kịch bản, hậu cần, an toàn, đón khách, ghi hình, dọn dẹp',
     'Giải thể trong vòng bảy ngày sau sự kiện, sau khi nộp biên bản rút kinh nghiệm',
     'Tổ xin gia hạn để lo luôn sự kiện sau. Ba sự kiện liền cùng một tổ là chi hội đã có một ban ngầm.'],

    ['Tổ Cứu bảng số',
     'Khi từ một phần ba chi hội ở băng ĐỎ ba tuần liên tiếp',
     '3–4 người: Phó chủ tịch, Trưởng ban Đào tạo, và một đến hai thành viên đang ở băng XANH',
     'Gặp riêng từng người ở băng ĐỎ, tìm nguyên nhân thật, đề xuất một việc nhỏ sửa được trong bảy ngày',
     'Giải thể khi tỷ lệ băng ĐỎ về dưới ngưỡng hai tuần liền — tối đa tám tuần rồi phải báo cáo vùng',
     'Tổ chuyển từ giúp sang chấm điểm, và người ở băng ĐỎ bắt đầu giấu số thay vì sửa.'],

    ['Tổ Đón người mới',
     'Ngay khi chi hội vượt hai mươi thành viên — dưới ngưỡng đó Ban Đón khách làm đủ',
     '4–5 người, mỗi người kèm không quá hai người mới cùng lúc',
     'Kèm người mới qua sáu mươi ngày thử: khoá nền, ghép cặp đôi rèn, giải thích luật, chọn mũi nhọn',
     'Không giải thể. Nhưng danh sách người kèm phải đổi mỗi nhiệm kỳ để không ai độc quyền cửa vào',
     'Tổ trở thành cửa duyệt không chính thức: người tổ thích thì vào nhanh, người tổ không thích thì mãi ở V1.'],

    ['Tổ Hồ sơ và bằng chứng',
     'Sáu tuần trước một đợt xét cổng bậc của chi hội',
     '3–5 người, có một người đã tự qua một cổng bậc và hiểu cổng đòi gì',
     'Rà hồ sơ từng người sắp qua cổng: đủ bằng chứng chưa, thiếu ở môi trường nào, ai xác nhận',
     'Giải thể sau khi đợt xét kết thúc và mọi kết quả đã trả về cho từng người',
     'Tổ bắt đầu viết hộ hồ sơ thay vì chỉ ra chỗ thiếu. Đó là gian lận, dù không ai gọi tên nó như vậy.'],

    ['Tổ Rà chuẩn nội bộ',
     'Bốn tuần trước kỳ chấm chéo của liên chi hội vùng',
     '3–4 người, không ai trong ban điều hành đương nhiệm — người bị chấm không được ngồi ghế chấm',
     'Đọc lại sổ, biên bản, bảng số của chính chi hội mình và ghi ra chỗ lệch chuẩn',
     'Giải thể sau khi kỳ chấm chéo kết thúc và biên bản đã được gửi cho toàn chi hội',
     'Tổ dọn sổ cho đẹp trước khi đoàn vùng tới. Rà là để tìm chỗ sai, không phải để giấu chỗ sai.']
  ];

  /* ── 3 · Vòng bảy ngày của một chi hội ────────────────────
     Buổi sinh hoạt đặt vào chiều thứ Bảy để tuần bắt đầu bằng
     việc công bố số và kết thúc bằng buổi họp. Chi hội đổi
     ngày họp thì dịch cả bảng, giữ nguyên thứ tự.
     Đây là vòng của TỔ CHỨC. Vòng bảy ngày của một THÀNH VIÊN
     đã có ở GV.TUAN; hai vòng khớp vào nhau nhưng không thay
     nhau được.                                                */
  G.CH_VONG_TUAN = [
    { chu: 'Chủ nhật · trong 24 giờ sau buổi',
      viec: 'Công bố bảng số bảy cột của toàn chi hội, kèm biên bản buổi và danh sách cam kết tuần tới',
      ai: 'Thư ký – Thủ quỹ', ra: 'Bảng số công khai · biên bản buổi',
      vi: 'Quá 24 giờ thì số mất sức. Người ta chỉ sửa được hành vi khi còn nhớ mình vừa làm gì.' },

    { chu: 'Chủ nhật · tối',
      viec: 'Ban điều hành họp rút hai mươi phút: một việc chạy tốt, một việc hỏng, một việc sửa trong tuần này',
      ai: 'Bảy ghế, Chủ tịch chủ trì', ra: 'Ba dòng ghi vào sổ ghế Chủ tịch',
      vi: 'Hai mươi phút mỗi tuần rẻ hơn nhiều so với một cuộc họp khẩn ba tiếng vào tháng thứ tư.' },

    { chu: 'Thứ Hai · sáng',
      viec: 'Lọc bảng số thành bốn băng, chia tên người ở băng CAM và ĐỎ cho từng người trong ban điều hành',
      ai: 'Phó chủ tịch', ra: 'Danh sách phân công chạm, có tên người chạm',
      vi: 'Băng ĐỎ không có tên người chịu trách nhiệm thì tuần sau vẫn là băng ĐỎ ấy.' },

    { chu: 'Thứ Hai → Thứ Ba',
      viec: 'Chạm từng người ở băng ĐỎ trong vòng 48 giờ. Hỏi chuyện gì đang xảy ra, không đọc lại con số cho họ nghe',
      ai: 'Người được phân công', ra: 'Một dòng ghi lại: nguyên nhân thật · một việc sửa trong bảy ngày',
      vi: 'Con số nói có chuyện; chỉ cuộc nói chuyện mới nói chuyện gì. Chạm mà chỉ nhắc số là cách nhanh nhất khiến người ta khai gian tuần sau.' },

    { chu: 'Thứ Hai',
      viec: 'Ghép cặp đôi rèn cho cả tuần. Mỗi người một bạn khác với tuần trước; người mới được ghép với người đã ở V2 trở lên',
      ai: 'Trưởng ban Đào tạo', ra: 'Bảng ghép cặp gửi toàn chi hội',
      vi: 'Để tự ghép thì người quen ghép với người quen, và ba tháng sau chi hội chia thành bốn nhóm nhỏ không nói chuyện với nhau.' },

    { chu: 'Thứ Ba',
      viec: 'Rà danh sách hạn: đơn vào đang chờ, người sắp hết sáu mươi ngày thử, người sắp tới kỳ gia hạn sáu tháng',
      ai: 'Trưởng ban Thành viên', ra: 'Danh sách hạn trong bốn tuần tới',
      vi: 'Hỏi một người còn muốn ở lại không khi vẫn còn thời gian để sửa, đừng hỏi khi họ đã quyết định xong.' },

    { chu: 'Thứ Ba → Thứ Năm',
      viec: 'Các cặp đôi rèn gặp nhau 30 phút ở nơi mở và nhìn thấy được, ghi phiếu cặp đôi rèn',
      ai: 'Từng cặp thành viên', ra: 'Phiếu cặp đôi rèn nộp trước thứ Sáu',
      vi: 'Không nơi mở thì không gặp. Đây là luật an toàn, không phải luật hành chính, và không có ngoại lệ cho bạn thân.' },

    { chu: 'Thứ Tư · cách tuần',
      viec: 'Tổ mũi nhọn gặp riêng: báo tiến độ dự án, chia lại việc, gọi tên chỗ đang tắc',
      ai: 'Tổ trưởng từng tổ', ra: 'Một dòng tiến độ gửi Chủ tịch',
      vi: 'Tổ họp mà không báo ra ngoài thì chi hội không biết tổ đang sống hay đã chết, cho tới lúc cần tổ ấy làm việc.' },

    { chu: 'Thứ Tư',
      viec: 'Chốt danh sách khách của buổi tới: ai dẫn, khách quan tâm gì, xếp ngồi cạnh ai',
      ai: 'Trưởng ban Đón khách', ra: 'Danh sách khách có tên người dẫn',
      vi: 'Một vị khách không có người dẫn chịu trách nhiệm sẽ ngồi một mình cả buổi và không quay lại.' },

    { chu: 'Thứ Năm',
      viec: 'Duyệt hạt giống tri thức bảy phút: nghe người trình bày chạy thử một lần, cắt phần giảng đạo lý',
      ai: 'Trưởng ban Đào tạo', ra: 'Bản chốt bảy phút, có một việc làm ngay trong tuần',
      vi: 'Duyệt trước là cách duy nhất giữ được bảy phút. Không duyệt thì bảy phút thành mười lăm, và buổi họp mất mục cuối.' },

    { chu: 'Thứ Năm',
      viec: 'Người tới lượt ghế nóng tập thử trước hai thành viên và nhận phản biện lần một',
      ai: 'Người giữ ghế nóng tuần đó', ra: 'Bản trình bày đã sửa một vòng',
      vi: 'Ghế nóng là mười phút, nhưng chuẩn bị cho nó mất nhiều tuần. Bỏ buổi tập thử là biến ghế nóng thành mười phút nói vo.' },

    { chu: 'Thứ Sáu',
      viec: 'Kiểm chứng ngược: rút ngẫu nhiên hai lời trao của hai tuần trước, hỏi người nhận đã dùng chưa và có thật là cơ hội không',
      ai: 'Phó chủ tịch', ra: 'Hai dòng kết quả, đọc trước chi hội ở mục vòng trao',
      vi: 'Đây là chi tiết tinh nhất của cả mô hình. Không có nó, cột trao cơ hội sẽ trôi về phía báo cho đẹp trong vòng ba tháng.' },

    { chu: 'Thứ Sáu',
      viec: 'Chốt hậu cần và an toàn: phòng, thiết bị, chỗ ngồi, lối thoát, danh sách người có nhu cầu y tế cần lưu ý',
      ai: 'Trưởng ban Phụng sự phối hợp với người lớn phụ trách địa điểm', ra: 'Phiếu kiểm hậu cần đã ký',
      vi: 'Phần an toàn không được rút gọn cho vừa thời gian. Một buổi thiếu chỗ ngồi thì khó chịu; một buổi thiếu lối thoát thì không sửa lại được.' },

    { chu: 'Thứ Sáu · tối',
      viec: 'Gửi nhắc chung: giờ, địa điểm, trang phục, ai vắng phải báo và cử người thay',
      ai: 'Thư ký – Thủ quỹ', ra: 'Tin nhắn nhắc · danh sách vắng có phép',
      vi: 'Vắng có báo trước là chuyện bình thường. Vắng im lặng là thứ ăn mòn chi hội, và nó bắt đầu từ chỗ không ai nhắc.' },

    { chu: 'Thứ Bảy · trước buổi 45 phút',
      viec: 'Dựng phòng: bàn đón khách, thẻ tên, chỗ ngồi theo sơ đồ, thiết bị chạy thử xong trước khi người đầu tiên tới',
      ai: 'Trưởng ban Phụng sự và tổ trực', ra: 'Phòng sẵn sàng, thiết bị đã chạy thử',
      vi: 'Dò thiết bị khi khách đã vào là mất mười phút và mất luôn ấn tượng đầu tiên của người mới.' },

    { chu: 'Thứ Bảy · trước buổi 15 phút',
      viec: 'Họp nhanh bảy ghế: ai làm gì trong 90 phút tới, ai bấm giờ, ai đón khách nào',
      ai: 'Chủ tịch', ra: 'Phân công miệng, ghi vào sổ ghế Chủ tịch',
      vi: 'Mười lăm phút này quyết định buổi họp có kết thúc đúng phút thứ 90 hay không.' },

    { chu: 'Thứ Bảy · 90 phút',
      viec: 'Buổi sinh hoạt theo đúng kịch bản chín mục, không thêm mục, không bỏ mục',
      ai: 'Toàn chi hội', ra: 'Biên bản buổi · bảng số tuần · danh sách cam kết',
      vi: 'Kịch bản là thứ khiến một chi hội ở nơi này và một chi hội ở nơi khác chạy giống nhau. Ban điều hành không có quyền sửa.' },

    { chu: 'Thứ Bảy · sau buổi 15 phút',
      viec: 'Tiễn khách, ghi phiếu cảm nhận của khách, hỏi khách có muốn dự buổi thứ hai không',
      ai: 'Trưởng ban Đón khách và người dẫn khách', ra: 'Phiếu khách · danh sách khách sẽ quay lại',
      vi: 'Khách quyết định quay lại hay không trong mười lăm phút này, không phải trong 90 phút vừa rồi.' }
  ];

  /* ── 4 · Chín nhóm năng lực nhìn ở cấp chi hội ────────────
     Tên nhóm và ngưỡng lấy đúng chữ của G.CD10_NANG_LUC trong
     du-lieu-capdo.js. Ba cột giữa là SUY RA: chúng trả lời câu
     hỏi mà bảng gốc chưa trả lời — nhóm năng lực này được rèn
     ở đúng hoạt động nào của một chi hội, ai kèm, và chi hội
     lấy gì làm bằng chứng.                                    */
  G.CH_NANG_LUC = [
    ['A', 'Tự chủ và bản lĩnh',
     'Vòng 45 giây mỗi tuần · cam kết công khai cuối buổi · tự ghi bảng số không ai kiểm hộ',
     'Trưởng ban Đào tạo, kèm theo nhóm; Coach can thiệp khi một người đứng im ba tuần liền',
     'Số tuần đứng nói không cầm giấy · khoảng cách giữa cam kết tuần trước và việc đã làm'],

    ['B', 'Tổ chức và thực thi',
     'Giữ một đầu việc trong tổ mũi nhọn · lo một phần hậu cần của buổi · chạy một dự án 90 ngày',
     'Tổ trưởng tổ mũi nhọn; Trưởng ban Phụng sự với phần dự án cộng đồng',
     'Việc nhận có xong đúng hạn không · số lần phải có người làm thay'],

    ['C', 'Giao tiếp và hợp tác',
     'Cặp đôi rèn hằng tuần · vòng trao · dẫn khách và giải thích luật cho khách',
     'Bạn cặp đôi rèn là người kèm gần nhất; Trưởng ban Đón khách kèm phần dẫn khách',
     'Phiếu cặp đôi rèn đủ và có nội dung thật · số thư biết ơn NHẬN được từ bạn khác'],

    ['D', 'Học tập và tư duy phát triển',
     'Hạt giống tri thức bảy phút · ghế nóng và phần nhận phản biện · hồ sơ bằng chứng qua cổng bậc',
     'Trưởng ban Đào tạo; Coach của Học viện với phần hồ sơ cổng',
     'Đã dạy lại được cho chi hội một kỹ năng chưa · chất lượng phản biện nhận được ở ghế nóng'],

    ['E', 'Giá trị sống và cống hiến',
     'Dự án phụng sự có người thụ hưởng thật · giờ phụng sự có xác nhận · cách ứng xử với người đang ở băng ĐỎ',
     'Trưởng ban Phụng sự; Ban Thành viên với phần hành vi và luật',
     'Giờ phụng sự có xác nhận của nơi nhận · biên bản vi phạm luật, nếu có. Đây là tiêu chí loại, không phải điểm trừ'],

    ['F', 'Lãnh đạo — bốn trục F1 đến F4',
     'Chỉ bắt đầu được chấm khi đã giữ một ghế trọn nhiệm kỳ hoặc dẫn một tổ mũi nhọn trọn sáu tháng',
     'Cố vấn chi hội V5 và Coach vùng cùng chấm, không ai chấm một mình',
     'Sổ ghế đã ghi đủ nhiệm kỳ · biên bản bàn giao · phản hồi của người kế nhiệm'],

    ['F1', 'Độ tin cậy',
     'Có mặt và đúng giờ · giữ lời hứa công khai · nộp bảng số đúng hạn suốt nhiệm kỳ',
     'Phó chủ tịch theo dõi hằng tuần; cố vấn V5 xác nhận cuối nhiệm kỳ',
     'Tỷ lệ có mặt · số phút muộn cộng dồn · số cam kết công khai đã hoàn thành trên tổng số đã nói'],

    ['F2', 'Tổ chức và thực thi trong vai lãnh đạo',
     'Vận hành trọn một ghế theo bản mô tả việc chia bốn khối trước – trong – sau – hằng tháng',
     'Chủ tịch kèm sáu ghế còn lại; cố vấn V5 kèm Chủ tịch',
     'KPI của chính ghế đó · sổ ghế có ghi đủ tuần không · buổi họp có kết thúc đúng phút thứ 90 không'],

    ['F3', 'Ảnh hưởng tích cực',
     'Dẫn một tổ mũi nhọn · kèm một người mới qua sáu mươi ngày thử · nói trước chi hội ở mục ghế nóng',
     'Cố vấn V5; và chính người được kèm là nguồn bằng chứng nặng nhất',
     'Người mình kèm có qua được sáu mươi ngày thử không · thư biết ơn nhận được có nêu việc cụ thể không'],

    ['F4', 'Tư duy phục vụ',
     'Nhận việc không ai muốn nhận: dọn phòng, ghi biên bản, chạm người ở băng ĐỎ, trực bàn đón khách',
     'Ban Thành viên quan sát; không có người kèm riêng — đây là nhóm được nhìn nhiều hơn được dạy',
     'Việc thầm lặng có ai làm chứng không · người này có đòi đặc quyền khi giữ ghế không · có chịu được giám sát không']
  ];

  /* ── 5 · Luân phiên ghế và bàn giao ───────────────────────
     Nhiệm kỳ sáu tháng, đếm theo tuần của nhiệm kỳ. Tám bước
     này chạy song song với việc điều hành bình thường, không
     phải một đợt riêng. Trường "bac" ghi bậc nhân tài mà bước
     ấy sinh ra bằng chứng.                                    */
  G.CH_GHE = [
    { v: 'G1', t: 'MỞ ĐỀ CỬ', dk: 'Tuần 20 của nhiệm kỳ. Ban điều hành đương nhiệm công bố bảy ghế và bản mô tả việc của từng ghế',
      duoc: 'Mọi thành viên từ V2 trở lên được đề cử người khác hoặc tự ứng cử. Người đương nhiệm được ứng cử lại tối đa một lần liền kề',
      bac: 'B2 trở lên mới có quyền đề cử' },

    { v: 'G2', t: 'HỒ SƠ GHẾ', dk: 'Tuần 21. Người ứng cử nộp một trang: vì sao chọn ghế này, ba việc sẽ làm, và bỏ được bao nhiêu giờ mỗi tuần',
      duoc: 'Hồ sơ dán công khai trong phòng sinh hoạt trọn một tuần trước khi bầu',
      bac: 'B2 · bằng chứng tự đánh giá năng lực' },

    { v: 'G3', t: 'ĐỐI THOẠI VỚI PHỤ HUYNH', dk: 'Tuần 22. Mỗi người ứng cử nói chuyện với phụ huynh mình về khối lượng việc của ghế',
      duoc: 'Phụ huynh ký xác nhận đã biết. Không ký thì rút hồ sơ, không ai bị đánh giá vì việc rút',
      bac: 'Không sinh bậc — đây là cửa an toàn, không phải cửa năng lực' },

    { v: 'G4', t: 'BẦU KÍN', dk: 'Tuần 23. Toàn bộ thành viên V2 trở lên bỏ phiếu kín, một người một phiếu cho mỗi ghế',
      duoc: 'Kết quả công bố ngay trong buổi, đủ số phiếu từng người. Ghế không có ứng cử viên thì Ban Thành viên chỉ định tạm và mở lại đề cử sau tám tuần',
      bac: 'B3 với người trúng ghế Chủ tịch hoặc Trưởng ban' },

    { v: 'G5', t: 'HAI TUẦN NGỒI KÈM', dk: 'Tuần 24–25. Người trúng ngồi cạnh người đương nhiệm trong hai buổi, làm thử phần việc trong buổi',
      duoc: 'Được cầm việc thật với người cũ ngồi bên; được hỏi mọi câu mà không bị coi là chưa đủ trình',
      bac: 'B3 · bằng chứng học nghề trực tiếp' },

    { v: 'G6', t: 'BÀN GIAO SỔ GHẾ', dk: 'Tuần 26. Bàn giao có mặt Chủ tịch cũ, Chủ tịch mới và cố vấn V5',
      duoc: 'Nhận sổ ghế, danh sách việc đang dở, mật khẩu và quyền truy cập, và một trang người cũ viết: ba việc đừng làm lại',
      bac: 'B3–B4 · biên bản bàn giao là bằng chứng nặng nhất của trục F2' },

    { v: 'G7', t: 'NHẬN GHẾ TRƯỚC CHI HỘI', dk: 'Tuần 1 của nhiệm kỳ mới. Bảy người đứng trước chi hội, đọc phần việc của ghế mình',
      duoc: 'Được cả chi hội công nhận quyền của ghế. Từ phút này người cũ không còn quyền quyết, kể cả khi thấy người mới làm chậm',
      bac: 'B3–B4' },

    { v: 'G8', t: 'KHOÁ NỀN GHẾ VÀ RÀ 30 NGÀY', dk: 'Tuần 2–5. Bảy người học khoá nền ghế do liên chi hội vùng tổ chức; ngày thứ 30 cố vấn V5 rà một vòng',
      duoc: 'Được sửa hướng khi còn sớm. Ghế nào chưa chạy sau 30 ngày thì được ghép thêm người kèm, không bị thay ngay',
      bac: 'B4 nếu qua trọn nhiệm kỳ và có người kế nhiệm được bàn giao đủ' }
  ];

  /* ── 6 · Tài chính một chi hội — mười chín khoản ──────────
     GV.TAI_CHINH trong du-lieu.js nói về dòng tiền TOÀN HỆ.
     Bảng này nói về một chi hội, nơi người cầm việc là học
     sinh. Nguyên tắc xuyên suốt: học sinh GHI SỔ, người lớn
     GIỮ TIỀN. Không khoản nào ở đây ghi số tiền — mức cụ thể
     do nhà trường và kế toán ấn định và phải nằm ngoài kho
     dữ liệu này.                                              */
  G.CH_TAI_CHINH = [
    ['THU · Phí thành viên chi hội',
     'Gia đình nộp qua kênh chính thức của nhà trường hoặc Học viện, không nộp cho học sinh',
     'Ban Thành viên đề xuất mức · nhà trường và Học viện duyệt',
     'Thư ký – Thủ quỹ ghi sổ; kế toán nhà trường hoặc Học viện giữ tiền',
     'Danh sách đã nộp hoặc được miễn dán công khai theo dạng đã hoàn thành nghĩa vụ, không nêu số tiền của từng nhà',
     'Không được thu tiền mặt tại buổi sinh hoạt. Không được nêu tên người chưa nộp trước chi hội, một lần cũng không'],

    ['THU · Kinh phí Học viện cấp cho chi hội',
     'Học viện cấp theo kế hoạch nhiệm kỳ đã duyệt',
     'Coach đỡ đầu đề xuất · Học viện duyệt',
     'Thư ký – Thủ quỹ ghi sổ; bộ phận kế toán Học viện giữ',
     'Tổng khoản được cấp và mục đích công bố cho toàn chi hội đầu nhiệm kỳ',
     'Không được dùng khoản này để thưởng tiền cho cá nhân dưới bất kỳ tên gọi nào'],

    ['THU · Tài trợ hiện vật từ doanh nghiệp đồng hành',
     'Doanh nghiệp trao vật phẩm, thiết bị hoặc dịch vụ, có biên bản trao nhận',
     'Trưởng ban Đón khách trình · cố vấn V5 và người lớn phụ trách duyệt',
     'Thư ký – Thủ quỹ ghi vào sổ tài sản; người lớn phụ trách ký nhận',
     'Đọc tên nhà tài trợ và món tài trợ trong buổi sinh hoạt gần nhất, ghi vào biên bản',
     'Không nhận tài trợ kèm điều kiện quảng cáo trên người học sinh, kèm việc thu thập thông tin gia đình, hoặc kèm yêu cầu học sinh mua hàng'],

    ['THU · Tài trợ bằng tiền từ doanh nghiệp hoặc cựu thành viên',
     'Chuyển thẳng vào tài khoản chính thức của nhà trường hoặc Học viện, không qua tài khoản cá nhân',
     'Cố vấn V5 thẩm định nguồn · nhà trường và Học viện duyệt nhận',
     'Kế toán giữ; Thư ký – Thủ quỹ chỉ ghi sổ theo dõi của chi hội',
     'Công bố tên nhà tài trợ, mục đích và tiến độ dùng trong báo cáo quý',
     'Không nhận tiền từ nguồn không nêu được danh tính. Không nhận tiền vào tài khoản mang tên bất kỳ học sinh nào'],

    ['THU · Suất học bổng từ Quỹ Nhân tài về một thành viên',
     'Quỹ Nhân tài Gen Việt, xét bởi Hội đồng Chuẩn',
     'Hội đồng Chuẩn duyệt; chi hội chỉ đề cử, không quyết',
     'Học viện giữ và chi thẳng cho hạng mục học phí, chi hội không cầm',
     'Chỉ công bố việc chi hội có bao nhiêu suất, không công bố suất ấy về ai nếu gia đình không đồng ý',
     'Không được đưa việc nhận học bổng vào bất kỳ bảng xếp hạng, bài vinh danh hay bài truyền thông nào'],

    ['THU · Doanh thu dự án học tập của tổ Kinh doanh – Khởi nghiệp',
     'Bán sản phẩm hoặc dịch vụ do chính học sinh làm ra, trong khuôn khổ dự án đã được duyệt',
     'Cố vấn người lớn của tổ duyệt từng đợt · nhà trường duyệt cả dự án',
     'Cố vấn người lớn giữ toàn bộ tiền; tổ trưởng ghi sổ dự án',
     'Báo cáo thu chi của dự án đọc trước chi hội mỗi tháng và dán công khai',
     'Không chia lãi cho thành viên. Toàn bộ số dư vào quỹ chi hội hoặc quỹ phụng sự, đã ghi rõ trước khi dự án bắt đầu'],

    ['THU · Gây quỹ cho một dự án phụng sự',
     'Bán vé sự kiện, bán sản phẩm gây quỹ, hoặc quyên góp từ cộng đồng ngoài lớp',
     'Trưởng ban Phụng sự trình kế hoạch · nhà trường và cố vấn V5 duyệt trước khi bắt đầu',
     'Người lớn phụ trách giữ; hai học sinh cùng ghi sổ độc lập rồi đối chiếu',
     'Công bố tổng thu, tổng chi và số còn lại trong vòng bảy ngày sau khi dự án kết thúc',
     'Không quyên góp từ chính phụ huynh trong lớp. Không đặt chỉ tiêu gây quỹ cho từng thành viên'],

    ['THU · Đóng góp cho một hoạt động cụ thể',
     'Gia đình tự nguyện góp cho một chuyến đi hoặc một sự kiện đã có kế hoạch và dự trù',
     'Ban điều hành trình dự trù · nhà trường duyệt · phụ huynh biểu quyết',
     'Kế toán hoặc người lớn phụ trách giữ; Thư ký – Thủ quỹ ghi sổ',
     'Dự trù công khai trước, quyết toán công khai sau, cả hai gửi tới mọi phụ huynh',
     'Không có gia đình nào bị hỏi lần thứ hai. Thành viên không góp vẫn tham gia đầy đủ, không có phiên bản rút gọn cho người không góp'],

    ['THU · Hoàn ứng và tiền thừa trả lại',
     'Người đã ứng tiền cho một việc trả lại phần chưa dùng',
     'Người lớn phụ trách xác nhận số trả lại',
     'Người lớn phụ trách giữ; Thư ký – Thủ quỹ ghi bút toán ngược',
     'Ghi vào sổ quỹ tuần đó và đọc trong báo cáo tháng',
     'Không để tiền thừa nằm ngoài sổ dù nhỏ. Mọi khoản ngoài sổ đều bắt đầu từ một khoản nhỏ được cho là không đáng ghi'],

    ['CHI · Vật tư sinh hoạt hằng tuần',
     'Quỹ chi hội, hạng mục vận hành thường xuyên',
     'Chủ tịch duyệt trong hạn mức đã được nhà trường ấn định; vượt hạn mức thì người lớn phụ trách duyệt',
     'Thư ký – Thủ quỹ ghi sổ; người lớn phụ trách chi tiền và giữ chứng từ',
     'Liệt kê trong báo cáo quỹ hằng tháng dán tại phòng sinh hoạt',
     'Không có hoá đơn hoặc phiếu thu thì không được chi. Không ai được ứng tiền cá nhân của học sinh rồi đòi lại sau'],

    ['CHI · Thuê phòng, thiết bị, âm thanh',
     'Quỹ chi hội hoặc kinh phí Học viện cấp',
     'Người lớn phụ trách duyệt, không phân quyền cho học sinh ở khoản này',
     'Kế toán hoặc người lớn phụ trách; học sinh chỉ ghi sổ theo dõi',
     'Nêu trong báo cáo quỹ hằng tháng, kèm hợp đồng hoặc phiếu thuê',
     'Học sinh không được đứng tên ký bất kỳ hợp đồng thuê nào'],

    ['CHI · In ấn, huy hiệu, thẻ tên, biểu mẫu',
     'Quỹ chi hội, hạng mục nhận diện',
     'Chủ tịch trình mẫu · cố vấn V5 duyệt mẫu · người lớn phụ trách duyệt chi',
     'Thư ký – Thủ quỹ ghi sổ; người lớn phụ trách giữ chứng từ',
     'Số lượng và đơn giá ghi trong báo cáo quỹ hằng tháng',
     'Huy hiệu và thẻ tên cấp cho mọi thành viên như nhau. Không có phiên bản đẹp hơn cho người đóng nhiều hơn'],

    ['CHI · Đồng phục và trang phục nhận diện',
     'Gia đình tự lo theo bộ quy chuẩn, hoặc quỹ hỗ trợ với trường hợp khó khăn',
     'Ban Thành viên xác định trường hợp cần hỗ trợ · người lớn phụ trách duyệt',
     'Người lớn phụ trách; danh sách hỗ trợ không lưu trong sổ dùng chung',
     'Chỉ công bố tổng số trường hợp được hỗ trợ, tuyệt đối không công bố tên',
     'Bộ quy chuẩn phải chọn được ở mức phổ thông nhất. Một bộ đồng phục mà một phần gia đình không với tới là một cách phân loại giàu nghèo có tổ chức'],

    ['CHI · Đi lại cho hoạt động ngoài trường',
     'Quỹ chi hội, hoặc khoản đóng góp cho hoạt động cụ thể đã được duyệt',
     'Ban điều hành trình dự trù · nhà trường duyệt cả phương án đi lại và phương án an toàn',
     'Người lớn phụ trách giữ và chi trực tiếp cho nhà xe',
     'Dự trù và quyết toán gửi mọi phụ huynh của người tham gia',
     'Không thu tiền đi lại tại chỗ. Không thành viên nào bị loại khỏi chuyến đi vì lý do tiền — đó là việc phải xử bằng quỹ hỗ trợ trước khi chốt danh sách'],

    ['CHI · Quà vinh danh và phần thưởng',
     'Quỹ chi hội, hạng mục ghi nhận',
     'Ban điều hành thống nhất · người lớn phụ trách duyệt',
     'Thư ký – Thủ quỹ ghi sổ; người lớn phụ trách mua và giữ chứng từ',
     'Danh sách hạng mục thưởng công bố từ đầu nhiệm kỳ, không đặt thêm giữa chừng',
     'Không thưởng bằng tiền mặt cho học sinh trong bất kỳ hoàn cảnh nào. Phần thưởng là hiện vật, cơ hội, hoặc quyền — không phải tiền'],

    ['CHI · Dự án phụng sự',
     'Quỹ gây được cho chính dự án đó',
     'Trưởng ban Phụng sự trình · cố vấn V5 và người lớn phụ trách cùng duyệt',
     'Người lớn phụ trách giữ; hai học sinh ghi sổ độc lập',
     'Quyết toán công khai trong bảy ngày, kèm ảnh chứng từ và tên nơi thụ hưởng',
     'Tiền gây cho dự án nào chỉ được dùng cho dự án đó. Dùng sang việc khác, kể cả việc tốt hơn, là sai và phải hoàn lại'],

    ['CHI · Ngày mở cửa và đại hội',
     'Quỹ chi hội và tài trợ, theo dự trù riêng cho từng sự kiện',
     'Ban điều hành trình · nhà trường duyệt · liên chi hội vùng biết với sự kiện có khách ngoài trường',
     'Người lớn phụ trách; tổ Sự kiện ghi sổ riêng cho sự kiện đó',
     'Dự trù trước, quyết toán trong bảy ngày sau sự kiện, đọc trước chi hội',
     'Không bán vé cho học sinh trong chính chi hội mình. Không đặt chỉ tiêu bán vé cho từng thành viên'],

    ['CHI · Hỗ trợ thành viên gặp khó khăn',
     'Quỹ chi hội, hạng mục hỗ trợ, có tỷ lệ dành riêng ấn định từ đầu nhiệm kỳ',
     'Trưởng ban Thành viên đề xuất kín · người lớn phụ trách và Coach duyệt',
     'Người lớn phụ trách giữ và chi thẳng cho hạng mục, không đưa tiền cho gia đình',
     'Chỉ công bố tổng số trường hợp trong báo cáo năm. Tên và hoàn cảnh không được lưu ở nơi học sinh khác đọc được',
     'Không ai trong ban điều hành học sinh được biết danh sách đầy đủ. Người được hỗ trợ không phải làm gì để đổi lại, không viết thư cảm ơn công khai, không lên sân khấu nhận'],

    ['CHI · Khoản bất thường: y tế tại chỗ, hỏng thiết bị, đền bù',
     'Quỹ dự phòng của chi hội, hoặc Học viện ứng khi vượt khả năng',
     'Người lớn phụ trách quyết ngay, báo lại ban điều hành và phụ huynh trong 24 giờ',
     'Người lớn phụ trách; ghi sổ ngay trong ngày',
     'Báo cáo riêng gửi ban điều hành, nhà trường và phụ huynh liên quan trong 24 giờ',
     'Học sinh không bao giờ là người đứng ra chi hoặc đền trong tình huống này, kể cả khi lỗi thuộc về học sinh']
  ];

  /* ── 7 · Minh bạch tiền trong môi trường học sinh ─────────
     Mười tám điều. Đây là phần cần kế toán và nhà trường rà
     lại kỹ nhất trước khi áp dụng, vì mỗi đơn vị có quy định
     nội bộ riêng mà kho dữ liệu không được phép đoán thay.    */
  G.CH_MINH_BACH = [
    'Học sinh không giữ tiền mặt lớn. Thủ quỹ của chi hội là người GHI SỔ, không phải người GIỮ TIỀN — tiền do kế toán nhà trường, bộ phận kế toán Học viện, hoặc người lớn được phân công bằng văn bản giữ.',
    'Mọi khoản thu và chi đều có hai chữ ký: một của học sinh giữ sổ và một của người lớn giữ tiền. Thiếu một chữ ký thì khoản đó chưa tồn tại.',
    'Công khai định kỳ, không công khai khi được hỏi. Báo cáo quỹ dán tại phòng sinh hoạt hằng tháng và gửi phụ huynh hằng quý, kể cả tháng không phát sinh gì.',
    'Không quyên góp từ chính phụ huynh trong lớp cho các hoạt động gây quỹ của chi hội. Gây quỹ hướng ra cộng đồng bên ngoài, không hướng vào chính những gia đình đang nuôi chi hội.',
    'Không dùng tiền để đổi lấy vai trò. Đóng góp nhiều không cho thêm phiếu bầu, không cho ưu tiên nhận ghế, không cho suất ghế nóng, không rút ngắn được một ngày nào của sáu mươi ngày thử.',
    'Tiền mua dịch vụ đồng hành, tiền không mua bậc. Ranh giới này của toàn hệ áp nguyên xuống chi hội và không có ngoại lệ ở cấp cơ sở.',
    'Mọi khoản đóng góp đều tự nguyện và đều có phương án cho người không đóng. Nếu không nghĩ ra được phương án ấy thì hoạt động đó chưa được phép chạy.',
    'Không nêu tên người chưa nộp, chưa đóng góp hoặc đang được hỗ trợ — không trước chi hội, không trong nhóm chung, không trong biên bản lưu.',
    'Không ai được ứng tiền cá nhân của mình cho việc chung rồi đòi lại sau. Việc chung phải được duyệt và chi từ quỹ trước khi làm.',
    'Không có tài khoản, ví hay sổ nào của chi hội đứng tên một học sinh. Không có tài khoản nào của chi hội đứng tên riêng một người lớn.',
    'Hai người ghi sổ độc lập cho mọi hoạt động có thu từ bên ngoài, rồi đối chiếu. Lệch thì tìm ra nguyên nhân trước khi khoá sổ, không làm tròn cho khớp.',
    'Chứng từ giữ đủ trọn nhiệm kỳ và bàn giao nguyên trạng cho ban điều hành kế nhiệm. Mất chứng từ thì ghi rõ là mất, không viết lại.',
    'Thưởng cho học sinh không bao giờ bằng tiền mặt. Hiện vật, cơ hội, quyền — ba thứ đó thưởng được; tiền thì không.',
    'Tiền gây được cho một mục đích chỉ dùng cho mục đích đó. Muốn đổi mục đích thì phải hỏi lại người đã đóng góp, không tự quyết dù việc mới tốt hơn.',
    'Quỹ hỗ trợ thành viên khó khăn là khoản kín: chi thẳng cho hạng mục, không đưa tiền cho gia đình, không đòi hỏi gì đổi lại, không đưa người nhận lên sân khấu.',
    'Ban điều hành học sinh không được biết danh sách đầy đủ những gia đình đang được hỗ trợ. Đây là thông tin của người lớn phụ trách và Coach.',
    'Không nhận tài trợ kèm điều kiện thu thập thông tin gia đình, kèm yêu cầu học sinh mua hàng, hoặc kèm quảng cáo đặt trên người và trên bài viết của học sinh.',
    'Mọi tranh chấp về tiền dừng ngay việc thu chi liên quan, chuyển cho người lớn phụ trách và nhà trường, và không đưa ra thảo luận trong buổi sinh hoạt.',
    'Bàn giao quỹ giữa hai nhiệm kỳ phải có biên bản đối chiếu số dư, có mặt cả hai thủ quỹ, người lớn giữ tiền và cố vấn V5. Không đối chiếu xong thì chưa bàn giao xong.',
    'Nghi ngờ một khoản không rõ ràng thì báo, và người báo được bảo vệ. Chi hội nào để người báo phải chịu thiệt sẽ không bao giờ nghe được lần thứ hai.'
  ];

  /* ── 8 · Dấu hiệu một chi hội đang hỏng ───────────────────
     Mười ba dấu hiệu, sắp theo thứ tự xuất hiện thường thấy:
     hỏng phần đo trước, hỏng phần người sau, hỏng phần tiền
     và phần quyền sau cùng. Cột phanh phải là việc làm được
     trong vòng một nhiệm kỳ, không phải một lời khuyên.       */
  G.CH_HONG = [
    { t: 'Bảng số đẹp dần lên mà đời sống không đổi',
      dau: 'Tỷ lệ băng XANH tăng đều bốn tuần liền trong khi số khách mới, số thư biết ơn và giờ phụng sự đứng yên',
      phanh: 'Bật kiểm chứng ngược: mỗi tuần rút hai lời trao của hai tuần trước, hỏi người nhận. Hai tuần liền không xác nhận được thì cột đó bị đóng băng cho tới khi rà xong.' },

    { t: 'Buổi họp kéo dài dần',
      dau: 'Ba tuần liền kết thúc sau phút thứ 95',
      phanh: 'Chủ tịch giao đồng hồ cho một người không phải mình, đặt chuông cứng ở từng mục. Tuần thứ tư còn quá giờ thì cắt mục dài nhất, không cắt mục cuối.' },

    { t: 'Vòng 45 giây thành đọc giấy',
      dau: 'Quá một phần ba thành viên cầm giấy hoặc nhìn điện thoại khi đứng nói',
      phanh: 'Trưởng ban Đào tạo mở lại buổi tập nói mười lăm phút trước buổi sinh hoạt trong bốn tuần, và ghép người cầm giấy với một người đã nói vo được.' },

    { t: 'Cặp đôi rèn thành hình thức',
      dau: 'Phiếu nộp đủ nhưng nội dung ba dòng giống nhau, hoặc luôn cùng một cặp gặp nhau',
      phanh: 'Trưởng ban Đào tạo ghép cặp cứng theo bảng xoay, cấm ghép trùng trong sáu tuần, và đọc ngẫu nhiên một phiếu trước chi hội mỗi tuần.' },

    { t: 'Không còn khách mới',
      dau: 'Bốn tuần liền không có khách nào, hoặc ba tháng liền không có ai từ khách thành thành viên',
      phanh: 'Mở lại ngày mở cửa trong vòng bốn tuần và giao mỗi thành viên V2 trở lên dẫn một khách trong một quý. Không đạt thì Ban Đón khách báo cáo trực tiếp lên liên chi hội vùng.' },

    { t: 'Chi hội chia thành nhóm nhỏ',
      dau: 'Người ta ngồi đúng chỗ cũ với đúng nhóm cũ mỗi tuần; người mới ngồi rìa',
      phanh: 'Xếp chỗ theo sơ đồ xoay hằng tuần, không cho tự chọn chỗ. Ghép cặp đôi rèn xuyên nhóm trong tám tuần liền.' },

    { t: 'Một người nói hết',
      dau: 'Trong mục vòng trao và mục phản biện, quá một nửa lượt nói thuộc về ba người',
      phanh: 'Đặt trần lượt nói cho mỗi người trong một buổi. Chủ tịch gọi tên theo danh sách xoay, không gọi theo người giơ tay.' },

    { t: 'Ghế thành ghế danh dự',
      dau: 'Sổ ghế bỏ trống quá hai tuần, hoặc người giữ ghế không nêu được ba việc mình làm trong tháng',
      phanh: 'Cố vấn V5 rà bảy sổ ghế cuối mỗi tháng. Ghế trống sổ hai tháng liền thì mở lại đề cử cho riêng ghế đó, không đợi hết nhiệm kỳ.' },

    { t: 'Người khởi xướng không rời được',
      dau: 'Ban điều hành hỏi ý người ấy trước mọi quyết định, hoặc buổi họp lệch hẳn khi người ấy vắng',
      phanh: 'Áp lại chặng C5: người ấy vắng ba buổi liên tiếp, báo trước, không can thiệp từ xa. Ba buổi ấy phải đủ bảng số và đúng 90 phút.' },

    { t: 'Một tổ mũi nhọn thành nhóm đặc quyền',
      dau: 'Tổ ở lại sau khi việc đã xong, giữ quyền quyết ngoài phạm vi tổ, hoặc từ chối nhận người mới',
      phanh: 'Ban Thành viên rà danh sách tổ mỗi nhiệm kỳ. Tổ thời vụ quá hạn giải thể thì Chủ tịch tuyên bố giải thể trong buổi gần nhất, không cần tổ đồng ý.' },

    { t: 'Luật được nhắc nhưng không được thi hành',
      dau: 'Có người vắng không phép quá ba lần hoặc khai gian bảng số mà không có nấc xử nào được ghi vào sổ',
      phanh: 'Ban Thành viên phải ghi biên bản cho mọi ca chạm ngưỡng, kể cả ca kết luận là không xử. Cố vấn V5 đọc sổ biên bản mỗi quý.' },

    { t: 'Vinh danh trôi về một nhóm',
      dau: 'Cùng vài cái tên xuất hiện trong bài vinh danh nhiều tuần liền, hoặc người vinh danh và người được vinh danh cùng một tổ',
      phanh: 'Đặt nhiều hạng mục vinh danh cho nhiều đường khác nhau, và cấm người trong cùng tổ đề cử nhau trong cùng một tháng.' },

    { t: 'Tiền bắt đầu đi ngoài sổ',
      dau: 'Có khoản chi không chứng từ, có người ứng tiền cá nhân, hoặc báo cáo quỹ chậm quá một tháng',
      phanh: 'Dừng toàn bộ hoạt động có thu chi. Người lớn phụ trách và kế toán đối chiếu lại từ đầu nhiệm kỳ, báo cáo nhà trường, rồi mới mở lại từng hạng mục một.' },

    { t: 'Có gia đình rút vì lý do tiền',
      dau: 'Một thành viên nghỉ hoạt động ngoài trường, bỏ đồng phục, hoặc rời chi hội ngay sau một đợt đóng góp',
      phanh: 'Trưởng ban Thành viên và Coach gặp riêng gia đình trong bảy ngày. Đồng thời rà lại mọi khoản đóng góp của quý đó: khoản nào không có phương án cho người không đóng thì hủy khoản ấy.' }
  ];

  /* ── 9 · Mười tám luật chi hội ────────────────────────────
     Mười điều luật DÀNH CHO THÀNH VIÊN đã có ở GV.CLB.luat.
     Mười tám điều dưới đây dành cho CHI HỘI với tư cách một
     tổ chức: những gì chi hội được làm, không được làm, và
     phải làm dù không ai nhắc.                                */
  G.CH_LUAT = [
    'Kịch bản buổi sinh hoạt là bất biến. Ban điều hành không sửa, không thêm mục, không bỏ mục. Thấy mục nào không hợp thì gửi đề nghị lên liên chi hội vùng và vẫn chạy nguyên trong lúc chờ.',
    'Chi hội họp hằng tuần, quanh năm. Nghỉ quá hai tuần liên tiếp phải báo liên chi hội vùng bằng văn bản và nêu ngày họp lại.',
    'Bảng số công bố trong 24 giờ sau mỗi buổi, kể cả tuần xấu. Một tuần không công bố là một tuần chi hội tự cho phép mình không bị nhìn.',
    'Mọi cuộc gặp một-một giữa hai thành viên diễn ra ở nơi mở, nhìn thấy được, và có phiếu ghi lại. Không có ngoại lệ cho bạn thân, cho anh chị em, hay cho người đang giữ ghế.',
    'Không có hoạt động nào của chi hội diễn ra mà không có ít nhất một người lớn chịu trách nhiệm có tên.',
    'Mọi thành viên phải qua ít nhất một ghế trước khi được xét bậc 4. Ghế đổi tay theo kỳ kể cả khi người đang ngồi làm rất tốt — mục đích là rèn người, không phải vận hành trơn.',
    'Không ai giữ cùng một ghế quá hai nhiệm kỳ liên tiếp. Không ai giữ hai ghế cùng lúc, kể cả tạm thời.',
    'Bàn giao ghế phải có sổ ghế, danh sách việc đang dở và biên bản có mặt người tiền nhiệm. Bàn giao miệng không tính là đã bàn giao.',
    'Việc dừng tư cách một thành viên không bao giờ được quyết bởi riêng nhóm bạn cùng lứa. Phải có người lớn của Học viện và phụ huynh cùng ngồi.',
    'Trước khi có quyền xử, chi hội phải chứng minh được mình đã thử giúp — bằng biên bản ghi ngày, người gặp và việc đã đề xuất, không bằng lời kể.',
    'Nhắc luật, không nhắc tên. Người vi phạm được nói riêng ở nấc một; chỉ khi lặp lại hoặc ảnh hưởng tới người khác mới đưa ra ban.',
    'Chi hội không tự cấp bằng chứng cho chính mình. Mọi hồ sơ qua cổng bậc đều phải có bằng chứng từ ít nhất hai môi trường ngoài chi hội.',
    'Chi hội không được dùng cho việc riêng của người lớn: không bán hàng, không vận động, không thu thập thông tin gia đình, không mượn danh sách thành viên.',
    'Không hình ảnh, họ tên đầy đủ hay thông tin cá nhân nào của thành viên được đăng công khai nếu chưa có đồng ý bằng văn bản của phụ huynh, và sự đồng ý ấy rút lại được bất cứ lúc nào.',
    'Học lực là điều kiện nền, không phải phần thưởng. Chi hội không được lấy hoạt động làm lý do cho việc học sút, và cũng không được lấy điểm số làm điều kiện xét ghế.',
    'Một mũi nhọn một người áp trong chi hội, không áp trong tổ. Muốn đổi mũi thì xin Ban Thành viên, và người nhường mũi không mất gì.',
    'Chi hội mở chi hội, Học viện không mở chi hội. Nhưng chỉ mở khi có người đã sống trong chuẩn ấy nhiều kỳ đứng ra bảo trợ bằng văn bản.',
    'Chi hội chịu chấm chéo của liên chi hội vùng ít nhất mỗi năm một lần, và không được biết trước quá ba ngày. Từ chối chấm chéo là mất tư cách chi hội chính thức.',
    'Ra khỏi chi hội trong danh dự: báo trước một tháng, bàn giao việc, không phải giải thích lý do, và vẫn được mời dự đại hội năm.',
    'Điều luật nào không bao giờ được thực thi thì phải bỏ khỏi bảng luật. Giữ một điều chết trong bảng dạy cả chi hội rằng những điều còn lại cũng có thể chết.'
  ];

})(window.GV = window.GV || {});
