/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · KHO GIÁ TRỊ VÀ TĂNG TRƯỞNG
   Một hệ huấn luyện không tự nuôi được mình thì không sống nổi ba
   mươi năm, dù kiến trúc có đẹp tới đâu. Kho này nói về gói sản
   phẩm, giá trị nhận được, bảo đảm, đơn vị kinh tế, đường tuyển
   sinh và cách nhân rộng mà không loãng chất.
   Luật trùm lên tất cả: *tiền không mua bậc.* Tiền mua chỗ ngồi,
   mua thời gian của người kèm, mua công cụ. Bậc chỉ đổi bằng
   bằng chứng.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Năm gói ─────────────────────────────────────────────
     Mỗi gói có một mục “không phù hợp với ai”. Mục ấy quan trọng
     hơn mục “gồm gì”: bán đúng người thì giữ được người; bán sai
     người thì mất cả tiền lẫn danh dự. */
  G.GT_GOI = [
    { ma: 'G0', t: 'KHỞI · tuần thử', mau: '#7A8CA3', nhip: '7 ngày · 3 buổi',
      cho: 'Gia đình chưa biết con có hợp không, và chưa muốn cam kết gì.',
      gom: ['Bộ test nhận diện đầu vào và một bản đọc ca một trang',
            'Ba buổi học thật cùng tổ thật, không phải buổi trải nghiệm dàn dựng',
            'Ba tin nhắn ba dòng sau mỗi buổi',
            'Một buổi tư vấn 60 phút với người sẽ kèm con'],
      cam: 'Gia đình cầm về được *bản đọc ca* dù không học tiếp — đó là thứ có giá trị độc lập.',
      khong: 'Không phù hợp với gia đình đang tìm chỗ trông con, hoặc muốn con “ngoan lên trong một tuần”.' },

    { ma: 'G1', t: 'NỀN · một chu kỳ 90 ngày', mau: '#185AB4', nhip: '90 ngày · 12 buổi + việc nhà hằng tuần',
      cho: 'Con lần đầu vào hệ, bậc B1 hoặc B2.',
      gom: ['Khoá nền 8 buổi và 4 chuyên đề',
            'Hộ chiếu nhân tài bản in, mở tài khoản hộ chiếu số',
            'Thư tuần và bảng đối chiếu tuần 6',
            'Cổng nghiệm thu 100 điểm cuối chu kỳ',
            'Một buổi đọc hộ chiếu cùng phụ huynh'],
      cam: 'Nhích ít nhất một mức ở ít nhất một trục, có bằng chứng — nếu không thì học lại miễn phí.',
      khong: 'Không phù hợp nếu gia đình không thể duy trì phần việc nhà hằng tuần. Hệ này hỏng ở nhà thì hỏng cả.' },

    { ma: 'G2', t: 'CHI HỘI · một năm', mau: '#0B6675', nhip: '365 ngày · sinh hoạt hằng tuần',
      cho: 'Con đã qua B2, sẵn sàng vào môi trường có trách nhiệm và có mặt người khác trông vào.',
      gom: ['Toàn bộ gói NỀN cho bốn chu kỳ',
            'Tư cách thành viên chi hội, thẻ và số hiệu',
            'Cơ hội nhận ghế trong ban điều hành, nhiệm kỳ 6 tháng',
            'Một trại (Gen Alpha hoặc Leader Boom) trong năm',
            'Bộ sách Gen Việt bản bỏ túi',
            'Hộp kỷ vật cuối năm và lễ tổng kết có phụ huynh'],
      cam: 'Đủ điều kiện xét lên B3 trong vòng một năm, hoặc chỉ rõ trục nào còn thiếu và kế hoạch bù.',
      khong: 'Không phù hợp nếu con không thể có mặt đều — chi hội sống bằng sự có mặt, vắng nhiều thì tổ hỏng chứ không chỉ mình con thiệt.' },

    { ma: 'G3', t: 'MŨI NHỌN · dự án và trại', mau: '#0B7350', nhip: 'Theo dự án · 4 → 6 tháng',
      cho: 'Con đã ở B3 trở lên, có một mũi nhọn rõ và cần môi trường mài.',
      gom: ['Tổ mũi nhọn theo lĩnh vực, có cố vấn chuyên môn ngoài hệ',
            'Một dự án thật có người ngoài nghiệm thu',
            'Hai trại trong năm, một trong đó con ở vai người dẫn',
            'Kèm 1–1 với Senior Coach, 2 buổi mỗi tháng',
            'Hồ sơ năng lực dùng được cho học bổng và tuyển sinh'],
      cam: 'Một sản phẩm hoặc một dự án hoàn thành, có xác nhận của người ngoài hệ — không có thì không tính là xong.',
      khong: 'Không phù hợp với con chưa qua B3. Vào sớm thì áp lực đè, và mũi nhọn chưa đủ nhọn để mài.' },

    { ma: 'G4', t: 'ĐỒNG HÀNH · ba năm', mau: '#A8801F', nhip: '3 năm · cam kết hai chiều',
      cho: 'Gia đình xác định đi dài, và con có tiềm năng đi tới B5 · B6.',
      gom: ['Toàn bộ CHI HỘI và MŨI NHỌN trong ba năm',
            'Một Mentor riêng theo suốt ba năm, không đổi trừ khi gia đình yêu cầu',
            'Ưu tiên ghế ban điều hành và vai người dẫn ở trại',
            'Hồ sơ theo dõi dọc, mốc đo năm 1 · 3 · 5 · 10',
            'Học phí khoá sau khoá trước, không tăng theo trượt giá trong ba năm',
            'Quyền dự chi hội trọn đời sau khi qua B3'],
      cam: 'Đưa con tới B4 trong ba năm, hoặc hoàn phần chưa dùng của năm cuối.',
      khong: 'Không phù hợp nếu gia đình chưa từng đi hết một chu kỳ 90 ngày. Không bán gói ba năm cho người chưa thử ba tháng — đó là luật, không phải chính sách.' }
  ];

  G.GT_LUAT_GIA = [
    '*Tiền không mua bậc.* Không có gói nào rút ngắn cổng nghiệm thu. Ai trả nhiều hơn thì được nhiều thời gian của người kèm, không được nhiều điểm.',
    'Giá công khai, in ra, không mặc cả. Mặc cả được nghĩa là giá ban đầu không thật.',
    'Không giảm giá riêng lẻ để chốt. Ai không đủ khả năng thì đi qua *quỹ học bổng* có quy trình và có hội đồng — giữ được lòng tự trọng cho gia đình.',
    'Không bán gói dài cho người chưa đi hết một gói ngắn.',
    'Không thu tiền trọn gói năm ngay buổi tư vấn đầu tiên. Muốn thu thì phải qua tuần thử.',
    'Học phí đã dùng thì không hoàn; phần chưa dùng thì hoàn đủ, trừ ngày đã học, không trừ “phí thủ tục”.',
    'Hoa hồng giới thiệu không quá 10% và không bao giờ trả cho người đang kèm con của người được giới thiệu.'
  ];

  /* ── 2 · Chồng giá trị ───────────────────────────────────────
     Bảng này chỉ có tác dụng nếu từng dòng đều thật và kiểm được.
     Thổi phồng một dòng thì cả bảng mất giá trị. */
  G.GT_CHONG = [
    ['Kèm 1–1 với Coach đã kiểm định', '2 buổi/tháng, có biên bản', 'Kèm riêng 1–1 theo giờ ngoài thị trường', 'Người kèm phải đạt ≥16/20 chuẩn dự giờ trong 90 ngày gần nhất'],
    ['Sinh hoạt chi hội hằng tuần', '48 buổi/năm, kịch bản 90 phút cố định', 'CLB kỹ năng theo buổi', 'Điểm khác: có bảng số bảy cột, nên buổi nào cũng để lại bằng chứng'],
    ['Hộ chiếu nhân tài', 'Hồ sơ năng lực 12 trục theo suốt 30 năm', 'Không có tương đương trên thị trường', 'Đây là tài sản của con, không phải của học viện'],
    ['Bộ test nhận diện và bản đọc ca', '5 bộ test, một bản đọc một trang', 'Đánh giá tâm lý – hướng nghiệp', 'Đọc bởi người đã qua K1–K7, không phải bởi phần mềm'],
    ['Trại', '3 → 5 ngày, có 21 ngày hậu trại', 'Trại hè kỹ năng', 'Điểm khác: 21 ngày hậu trại — thứ hầu hết trại không có'],
    ['Dự án thật có nghiệm thu ngoài', '1 → 2 dự án/năm', 'Không có tương đương', 'Người nghiệm thu ở ngoài hệ, nên chữ ký ấy có giá trị thật'],
    ['Thư tuần và cổng phụ huynh', '48 thư/năm, cổng mở mọi lúc', 'Báo cáo học tập định kỳ', 'Điểm khác: có tên con trong mọi câu; không có câu chung chung'],
    ['Bộ sách Gen Việt', '6 quyển, 45 chân dung, 12 mô thức', 'Sách kỹ năng phổ thông', 'Biên soạn riêng, gắn với việc làm được trong tuần'],
    ['Hiện vật và nghi lễ', '14 hiện vật theo mốc', 'Không có tương đương', 'Giá vốn nhỏ; giá trị nằm ở cách trao'],
    ['Mạng lưới sau khi rời hệ', 'Dự chi hội trọn đời sau B3', 'Hội cựu học viên', 'Điểm khác: có quyền dự thật, không chỉ có nhóm chat'],
    ['Bảo đảm 7 ngày · 90 ngày', 'Hoàn phí và học lại', 'Hiếm nơi có', 'Hội đồng phán quyết có một người ngoài đội bán'],
    ['Theo dõi dọc 30 năm', 'Mốc đo năm 1 · 3 · 5 · 10 · 20 · 30', 'Không có tương đương ở Việt Nam', 'Đây là thứ không đối thủ nào sao chép được trong ngắn hạn']
  ];

  /* ── 3 · Ba lớp bảo đảm ─────────────────────────────────────
     Điều kiện phải rõ tới mức không cãi nhau được. Bảo đảm mập
     mờ còn tệ hơn không có bảo đảm: nó tạo kỳ vọng rồi phản bội
     kỳ vọng ấy đúng lúc người ta cần mình nhất. */
  G.GT_BAO_DAM = [
    { t: 'Bảo đảm bảy ngày', mau: '#0B7350',
      dk: 'Trong tuần thử, gia đình thấy không phù hợp — bất kể lý do gì, kể cả không có lý do.',
      duoc: 'Hoàn 100% học phí tuần thử. Xử trong 3 ngày làm việc. Quá 3 ngày thì cộng thêm 10%.',
      ai: 'Không cần hội đồng. Quản lý chuyên môn duyệt thẳng.',
      gioi: 'Bản đọc ca và bộ test vẫn thuộc về gia đình, không phải trả lại.' },
    { t: 'Bảo đảm chín mươi ngày', mau: '#185AB4',
      dk: 'Con đi ≥85% số buổi, hoàn thành ≥80% phần việc nhà có ghi nhận, mà hộ chiếu *không nhích một mức nào ở bất kỳ trục nào trong mười hai trục*.',
      duoc: 'Học lại nguyên chu kỳ miễn phí, và được đổi Coach nếu gia đình muốn.',
      ai: 'Hội đồng ba người, trong đó bắt buộc có một người *ngoài* đội tuyển sinh và ngoài đội đang kèm con.',
      gioi: 'Đi dưới 85% buổi thì không xét — nhưng hệ vẫn phải trả lời vì sao con vắng nhiều, và đó là lỗi của hệ cho tới khi chứng minh được ngược lại.' },
    { t: 'Bảo đảm suốt đời của hệ', mau: '#A8801F',
      dk: 'Đã qua cổng nghiệm thu B3.',
      duoc: 'Quyền dự sinh hoạt chi hội miễn phí trọn đời, kể cả sau khi đã rời hệ, kể cả hai mươi năm sau. Giữ nguyên bậc đã đạt khi quay lại.',
      ai: 'Không ai phải duyệt. Đã có dấu B3 trong hộ chiếu là có quyền.',
      gioi: 'Quyền dự, không phải quyền được kèm riêng. Muốn được kèm lại thì theo gói như mọi người.' }
  ];

  /* ── 4 · Đơn vị kinh tế ──────────────────────────────────────
     Không có bảng này thì mọi lý tưởng ở các tập trước đều là
     lý tưởng của người khác trả tiền. */
  G.GT_KINH_TE = [
    ['Người kèm', 'Lương Coach phân bổ trên đầu học viên', '≈ 38 – 45% doanh thu một học viên', 'Đây là khoản không được cắt. Cắt là cắt vào lõi.'],
    ['Mặt bằng và vận hành', 'Thuê, điện nước, bảo hiểm, phần mềm', '≈ 18 – 22%', 'Chi hội đầu tiên nên mượn hoặc thuê theo buổi, đừng thuê nguyên năm'],
    ['Hiện vật và nghi lễ', '14 hiện vật, in ấn, hộp kỷ vật', '≈ 4 – 6%', 'Khoản nhỏ nhất mà tạo cảm nhận lớn nhất — không bao giờ cắt khoản này'],
    ['Trại và dự án', 'Chi phí trại phân bổ', '≈ 10 – 14%', 'Tính riêng cho gói có trại, không dàn đều'],
    ['Đào tạo đội ngũ', 'Đào tạo K1–K7, dự giờ, giám sát', '≈ 6 – 8%', 'Cắt khoản này thì hai năm sau trả gấp ba bằng mất người'],
    ['Quỹ học bổng', 'Trích cố định', '≈ 3 – 5%', 'Trích trước khi tính lãi, không trích từ phần còn lại'],
    ['Còn lại', 'Biên đóng góp trước quản lý chung', '≈ 8 – 15%', 'Dưới 8% ba quý liên tiếp là dấu hiệu mô hình chưa chạy']
  ];

  G.GT_LUAT_KT = [
    { m: 'Hoà vốn một chi hội', t: 'Ngưỡng người', v: ['Một chi hội hoà vốn ở khoảng 24 – 30 thành viên đóng phí đều', 'Dưới 18 thành viên thì kịch bản 90 phút mất chất — không đủ người để bảng số bảy cột có ý nghĩa', 'Trên 42 thành viên thì tách chi hội, không mở rộng phòng'] },
    { m: 'Giữ người', t: 'Ngưỡng bền', v: ['Tỉ lệ ở lại sau chu kỳ đầu ≥ 70%', 'Tỉ lệ ở lại sau năm đầu ≥ 55%', 'Dưới ngưỡng thì mọi đồng chi cho tuyển sinh đều là đổ vào thùng thủng'] },
    { m: 'Nguồn người mới', t: 'Ngưỡng lành', v: ['≥ 60% người mới đến từ tiến cử của gia đình đang học', 'Dưới 40% thì *không được tăng ngân sách quảng cáo* — phải sửa chất lượng trước', 'Đây là chỉ số trung thực nhất về chất lượng: người ta chỉ đem tên mình ra bảo lãnh cho thứ họ thật sự tin'] },
    { m: 'Mở chi hội thứ hai', t: 'Luật vàng', v: ['Không mở chi hội thứ hai trước khi chi hội thứ nhất đạt ba quý liên tiếp trên ngưỡng bền', 'Không mở khi chưa có ≥2 người đủ chuẩn ngồi ghế đội trưởng', 'Mở sớm một chi hội hỏng hai chi hội'] }
  ];

  /* ── 5 · Phễu tuyển sinh ─────────────────────────────────── */
  G.GT_PHEU = [
    { b: '1', t: 'BIẾT · người ta nghe tên', ai: 'Đại sứ và phụ huynh đang học',
      n: 'Nguồn lành: gia đình đang học kể lại · nhà trường giới thiệu · một buổi mở cho cộng đồng. Nguồn kém lành: quảng cáo chạy theo lượt bấm.',
      ra: 'Chuyển sang quan tâm: kỳ vọng 12 – 18%. Dưới 8% là thông điệp chưa đúng người.' },
    { b: '2', t: 'QUAN TÂM · người ta để lại số', ai: 'Người tư vấn',
      n: 'Việc duy nhất ở tầng này: gửi một thứ *dùng được ngay mà không cần mua gì*. Bộ bảy câu hỏi bàn ăn, hoặc một chuyên đề 7 phút.',
      ra: 'Chuyển sang thử: kỳ vọng 30 – 40%. Gọi lại trong 4 giờ thì con số này gấp đôi so với gọi sau một ngày.' },
    { b: '3', t: 'THỬ · gia đình đi tuần thử', ai: 'Coach sẽ kèm con, không phải người khác',
      n: 'Buổi tư vấn 60 phút và ba buổi học thật. Không dàn dựng buổi trải nghiệm riêng — con phải nhìn thấy đúng thứ con sẽ nhận.',
      ra: 'Chuyển sang nhập hệ: kỳ vọng 55 – 70%. Dưới 40% thì hoặc chọn sai người ở tầng trên, hoặc buổi học thật chưa đủ tốt.' },
    { b: '4', t: 'NHẬP · gia đình vào hệ', ai: 'Ban điều hành chi hội',
      n: 'Lễ nhập hệ, trao hộ chiếu, ghép tổ. Ngày này quyết định 90 ngày sau nhiều hơn mọi buổi tư vấn cộng lại.',
      ra: 'Ở lại hết chu kỳ đầu: kỳ vọng ≥70%.' },
    { b: '5', t: 'TIẾN CỬ · gia đình đem tên mình ra bảo lãnh', ai: 'Chính gia đình',
      n: 'Không xin giới thiệu trước ngày 90. Xin sớm là xin trước khi có bằng chứng, và làm hỏng cả quan hệ.',
      ra: '≥60% người mới đến từ đây. Đây là tầng duy nhất mà đầu tư vào nó không bao giờ lỗ.' }
  ];

  /* ── 6 · Thông điệp và mười hai phản đối ─────────────────── */
  G.GT_THONG_DIEP = [
    { t: 'Một câu', n: 'Chúng tôi rèn những đứa trẻ *dám nhận việc* — và có bằng chứng cho điều đó.' },
    { t: 'Ba câu', n: 'Gen Việt 365 không dạy kỹ năng theo buổi. Chúng tôi giao cho con những việc thật ở lớp, ở trường, ở nhà và ngoài xã hội, rồi ghi lại bằng chứng vào một cuốn hộ chiếu đi theo con ba mươi năm. Con lên bậc bằng việc đã làm, không bằng số buổi đã học.' },
    { t: 'Một trang · mở đầu', n: 'Có hai loại chương trình cho trẻ. Loại thứ nhất làm con vui trong lúc học và quên sau ba tuần. Loại thứ hai làm con khó chịu trong lúc học và đổi con vĩnh viễn. Chúng tôi làm loại thứ hai — và chúng tôi nói trước điều đó với mọi gia đình, ngay ở buổi tư vấn đầu tiên.' },
    { t: 'Một trang · phần bằng chứng', n: 'Mỗi việc con làm đều có người ngoài ký tên xác nhận. Không có chữ ký thì không vào hộ chiếu, không tính điểm, không lên bậc. Cuốn hộ chiếu ấy thuộc về con, không thuộc về chúng tôi — con rời hệ thì mang theo bản đầy đủ.' },
    { t: 'Một trang · phần cam kết', n: 'Bảy ngày đầu không hợp thì hoàn đủ, không hỏi lý do. Chín mươi ngày đi đủ buổi mà không nhích một mức nào thì học lại miễn phí. Chúng tôi hứa ít, nhưng mỗi lời hứa đều có thứ để đền khi không giữ được — và chúng tôi đền tự động, không đợi ai đòi.' }
  ];

  G.GT_PHAN_DOI = [
    { t: '“Con tôi bận học lắm, không có thời gian.”', mau: '#185AB4',
      sau: 'Họ đang xếp hạng: việc này nằm dưới việc học. Đúng, và mình không nên cãi.',
      hoi: '“Nếu con có thêm hai tiếng một tuần, anh chị muốn con dùng vào việc gì nhất?”',
      noi: 'Hệ này không thêm giờ học. Nó đổi cách con dùng những giờ đang có — phần lớn việc rèn nằm ở lớp học của con, ở nhà, trong việc con vẫn phải làm.',
      khong: 'Đừng nói “kỹ năng quan trọng hơn điểm số”. Với phụ huynh Việt Nam đó là một câu tuyên chiến, không phải một lập luận.' },
    { t: '“Đắt quá.”', mau: '#5140B4',
      sau: 'Thường không phải đắt — mà là chưa thấy đáng. Đắt là cách nói lịch sự của “tôi chưa hiểu tôi mua gì”.',
      hoi: '“So với đắt, em muốn hỏi trước: anh chị đang so với cái gì ạ?”',
      noi: 'Đưa bảng chồng giá trị, đi từng dòng, và chỉ rõ ba dòng không có tương đương trên thị trường. Rồi nói về bảo đảm 90 ngày.',
      khong: 'Không giảm giá. Không nói “bên em đang có ưu đãi”. Giảm giá lúc này là tự nhận giá trị không đủ.' },
    { t: '“Học kỹ năng sống thì được cái gì?”', mau: '#0B6675',
      sau: 'Họ đã từng cho con học một chỗ và không thấy gì. Họ không hoài nghi mình — họ hoài nghi cả ngành.',
      hoi: '“Anh chị đã cho cháu học ở đâu rồi ạ? Cái gì làm anh chị thất vọng nhất?”',
      noi: 'Đúng, phần lớn không được gì, vì học xong không ai giao việc thật. Chỗ này khác ở một điểm: mỗi việc phải có người ngoài ký xác nhận mới được tính.',
      khong: 'Đừng chê nơi khác. Chê nơi khác làm mình thành cùng loại với nơi khác.' },
    { t: '“Nhà tôi dạy con được, không cần ai dạy.”', mau: '#0B7350',
      sau: 'Đây thường là gia đình tốt và tự trọng. Họ không sai — họ chỉ thiếu một thứ mình có.',
      hoi: '“Vâng ạ. Em hỏi thật: có việc gì anh chị nói mãi mà cháu không nghe, nhưng bạn cháu nói một câu là nghe không ạ?”',
      noi: 'Thứ gia đình không tạo ra được là *người ngoài trông vào*. Con sửa vì bố mẹ là sửa tạm; con sửa vì có tổ trông vào mới là sửa thật.',
      khong: 'Đừng ám chỉ gia đình dạy con chưa tốt. Câu đó mất khách và đáng mất.' },
    { t: '“Để con lớn thêm chút đã.”', mau: '#A8801F',
      sau: 'Sợ con chưa chịu nổi. Hoặc là cách hoãn lịch sự.',
      hoi: '“Anh chị định đợi tới lúc nào ạ? Em hỏi để xem lúc đó có còn hợp không.”',
      noi: 'Nói thẳng về cửa sổ tuổi: các trục về ý chí và trách nhiệm dễ rèn nhất ở 9–13 tuổi; sau 15 tuổi cùng một việc tốn gấp đôi thời gian. Rồi để họ tự quyết.',
      khong: 'Đừng doạ “sau này hối hận”. Doạ được một lần, mất luôn quan hệ.' },
    { t: '“Sợ con bị nhồi, con đã đủ áp lực rồi.”', mau: '#BE0E16',
      sau: 'Đây là phụ huynh hiểu con. Đáng quý, phải trả lời thật cẩn thận.',
      hoi: '“Con đang áp lực nhất ở chỗ nào ạ — học, bạn bè, hay ở nhà?”',
      noi: 'Nếu con đang quá tải thì hệ này *hạ tải* chứ không thêm: 30 ngày đầu chỉ làm một trục duy nhất. Và mình cam kết dừng nếu con xấu đi.',
      khong: 'Đừng nhận bừa. Có ca thật sự nên chờ — nói thẳng là nên chờ thì lần sau họ quay lại.' },
    { t: '“Trung tâm nào chả nói hay.”', mau: '#185AB4',
      sau: 'Đã bị hứa hẹn rồi thất vọng. Câu này là lời cảnh báo, không phải lời từ chối.',
      hoi: '“Đúng ạ. Anh chị muốn nhìn thấy bằng chứng gì thì mới tin?”',
      noi: 'Đưa ba thứ kiểm được: hộ chiếu của một cháu đang học (đã che tên), sổ phàn nàn công khai, và bảng cam kết dịch vụ có mục *đền gì khi sai*.',
      khong: 'Đừng kể thành tích. Người hoài nghi không tin thành tích, họ tin thứ mình dám công khai khi mình sai.' },
    { t: '“Chồng/vợ tôi không đồng ý.”', mau: '#5140B4',
      sau: 'Người quyết chưa ngồi ở đây. Nói thêm với người đang ngồi là nói lãng phí.',
      hoi: '“Anh/chị nhà lo nhất điều gì ạ?”',
      noi: 'Đề nghị một buổi 20 phút với đúng người ấy, hoặc mời họ dự một buổi con báo công. Không thuyết phục qua người trung gian.',
      khong: 'Đừng nhờ người đang ngồi “về nói giúp”. Đó là đẩy việc khó cho người ít quyền nhất.' },
    { t: '“Con tôi nhút nhát lắm, không hợp đâu.”', mau: '#0B6675',
      sau: 'Sợ con bị so sánh và bị lép vế trước bạn.',
      hoi: '“Ở nhà có việc gì cháu tự làm mà không cần nhắc không ạ?”',
      noi: 'Nhút nhát không phải chống chỉ định — nó là điểm xuất phát phổ biến nhất. B1 không bắt ai nói trước đám đông; việc đầu tiên là việc làm một mình, có người ngoài ký nhận.',
      khong: 'Đừng hứa “cháu sẽ dạn lên”. Hứa tính cách là hứa thứ mình không kiểm soát được.' },
    { t: '“Con tôi nghịch lắm, cô chịu không nổi đâu.”', mau: '#0B7350',
      sau: 'Đã bị nơi khác trả về, hoặc bị phàn nàn nhiều. Đây là phụ huynh mệt mỏi và đang tự vệ trước.',
      hoi: '“Cháu nghịch nhất ở chỗ nào, và lúc nào cháu ngồi yên được lâu nhất ạ?”',
      noi: 'Trẻ hiếu động thường là trẻ thừa năng lượng chưa có việc xứng đáng. Hệ này giao việc thật, và có sĩ số tối đa 8 cho B1 nên kèm được.',
      khong: 'Đừng nhận nếu ca vượt năng lực chuyên môn. Nhận rồi trả về là tổn thương lần thứ hai, nặng hơn lần đầu.' },
    { t: '“Chỗ kia rẻ hơn nhiều.”', mau: '#A8801F',
      sau: 'Họ đang so hai thứ khác loại. Việc của mình là làm rõ khác loại ở đâu, không phải hạ giá.',
      hoi: '“Bên đó anh chị thích nhất điểm nào ạ?”',
      noi: 'Nói thật: nếu gia đình cần một chỗ cho con vui và bận rộn thì chỗ rẻ hơn hợp hơn thật. Chỗ này đắt hơn vì có ba thứ: người kèm đã qua kiểm định, bằng chứng có người ngoài ký, và bảo đảm 90 ngày.',
      khong: 'Đừng dìm nơi rẻ hơn. Nếu gia đình chọn nơi đó, chúc họ thật lòng — nửa số người quay lại sau một năm.' },
    { t: '“Cho tôi học thử miễn phí, không cam kết gì.”', mau: '#BE0E16',
      sau: 'Chưa tin đủ để bỏ tiền, và cũng chưa sẵn sàng bỏ công.',
      hoi: '“Được ạ. Em hỏi ngược lại: nếu tuần thử tốt thì anh chị quyết trong bao lâu?”',
      noi: 'Tuần thử có thu phí, và hoàn 100% nếu không hợp — không hỏi lý do. Thu phí không phải để lấy tiền, mà vì thứ miễn phí thì con không đi đủ ba buổi, và ba buổi mới đủ để biết.',
      khong: 'Đừng cho miễn phí hoàn toàn. Dữ liệu của mọi hệ đào tạo đều giống nhau: nhóm miễn phí bỏ giữa chừng gấp ba nhóm có trả phí, kể cả phí rất nhỏ.' }
  ];

  /* ── 7 · Hợp tác nhà trường ─────────────────────────────────
     Thứ nhà trường cần không phải “kỹ năng sống”. Họ cần lớp dễ
     quản hơn, phong trào có giải, và phụ huynh bớt phàn nàn.
     Bán đúng thứ đó thì cửa mở; bán khái niệm thì cửa đóng. */
  G.GT_NHA_TRUONG = [
    { t: 'Tiết kỹ năng sống chính khoá', mau: '#185AB4',
      dh: 'Bán cho: Ban giám hiệu, qua phòng chuyên môn. Ngân sách từ nguồn xã hội hoá hoặc thoả thuận phụ huynh.',
      can: 'Nhà trường cần giáo án chuẩn, người dạy có hồ sơ đầy đủ, và báo cáo cuối kỳ nộp được lên phòng.',
      lam: 'Cung cấp 24 chuyên đề đã chuẩn hoá, người dạy có lý lịch tư pháp và hồ sơ K1–K7, báo cáo cuối kỳ theo mẫu của trường.',
      bay: 'Đừng đòi đổi thời khoá biểu. Vào được tiết đã xếp sẵn thì vào; đòi xếp lại là mất cơ hội.' },
    { t: 'Câu lạc bộ ngoại khoá trong trường', mau: '#0B6675',
      dh: 'Bán cho: Bí thư Đoàn / Tổng phụ trách Đội. Người này cần phong trào có sản phẩm để báo cáo.',
      can: 'Họ cần một hoạt động chạy được mà không tốn thêm sức của giáo viên, và có sản phẩm nhìn thấy được.',
      lam: 'Đưa nguyên mô hình chi hội vào trường: kịch bản 90 phút, bảng số bảy cột, ban điều hành do học sinh giữ ghế.',
      bay: 'Đừng để câu lạc bộ thành nơi chỉ có học sinh giỏi. Chi hội trong trường phải mở, nếu không nó chết sau một học kỳ.' },
    { t: 'Đào tạo giáo viên chủ nhiệm', mau: '#0B7350',
      dh: 'Bán cho: Ban giám hiệu, dùng ngân sách bồi dưỡng chuyên môn.',
      can: 'Thứ giáo viên chủ nhiệm thật sự cần: lớp tự quản được, ít việc vặt, ít phàn nàn từ phụ huynh.',
      lam: 'Chuyển giao cách tổ chức lớp theo mô hình M1: giao ghế, bảng số, họp lớp 15 phút mỗi tuần. Hai buổi đào tạo và bốn tuần đồng hành.',
      bay: 'Đừng dạy lý thuyết lãnh đạo cho giáo viên. Dạy đúng ba công cụ dùng được từ thứ Hai tuần sau.' },
    { t: 'Dự án cộng đồng cấp trường', mau: '#A8801F',
      dh: 'Bán cho: Ban giám hiệu và hội phụ huynh, thường không thu phí trực tiếp.',
      can: 'Nhà trường cần một dự án tử tế để ghi vào báo cáo năm và để truyền thông.',
      lam: 'Thiết kế và chạy một dự án cộng đồng do học sinh dẫn, có nghiệm thu ngoài, có ảnh và số liệu.',
      bay: 'Đây là gói *mở cửa*, không phải gói kiếm tiền. Làm thật tốt một lần thì ba gói kia tự vào.' }
  ];

  /* ── 8 · Nhân rộng ─────────────────────────────────────────── */
  G.GT_NHAN_RONG = [
    { t: 'Chi hội vệ tinh', mau: '#0B7350',
      dh: 'Do chính người trong hệ mở — thường là phụ huynh cũ hoặc cựu thành viên đã qua B5.',
      can: 'Điều kiện: đã đưa ≥3 người của mình qua B3 · đã ngồi ghế ban điều hành ít nhất một nhiệm kỳ · qua kiểm định K1–K7.',
      lam: 'Được cầm: toàn bộ giáo trình, hộ chiếu, con dấu chi hội, quyền dùng tên. Học viện giữ: cổng nghiệm thu và quyền cấp bậc.',
      bay: 'Đây là đường lành nhất và chậm nhất. Chậm là tính năng, không phải lỗi.' },
    { t: 'Đối tác vùng', mau: '#185AB4',
      dh: 'Một tổ chức giáo dục sẵn có ở tỉnh khác nhận triển khai.',
      can: 'Điều kiện: có cơ sở hợp pháp · có ≥2 người đạt chuẩn Coach sau đào tạo · chấp nhận ngoại kiểm hằng năm.',
      lam: 'Được cầm: giáo trình và công cụ trong phạm vi vùng. Không được cầm: quyền cấp bậc, quyền sửa cổng nghiệm thu, quyền mở tiếp đối tác cấp dưới.',
      bay: 'Rủi ro lớn nhất: đối tác dùng tên mình để bán thứ khác. Hợp đồng phải có điều khoản thu hồi tên trong 30 ngày.' },
    { t: 'Nhượng quyền', mau: '#A8801F',
      dh: 'Người ngoài hệ mua quyền vận hành trọn gói.',
      can: 'Điều kiện: người đứng đầu phải tự đi hết một chu kỳ 90 ngày với tư cách học viên trước khi ký. Không có ngoại lệ.',
      lam: 'Được cầm: trọn bộ vận hành, đào tạo, phần mềm. Kiểm định 6 tháng một lần, dự giờ đột xuất, và khảo sát phụ huynh do học viện trực tiếp làm.',
      bay: 'Đây là đường nhanh nhất để lớn và nhanh nhất để hỏng. Không mở quá 2 nhượng quyền một năm trong 5 năm đầu.' }
  ];

  G.GT_LOI_BAT_BIEN = [
    'Bảy nguyên lý ở lớp L0 — không bên nào được sửa một chữ.',
    'Hộ chiếu nhân tài: cấu trúc 12 trục và 5 mức, và nguyên tắc *hộ chiếu thuộc về con*.',
    'Cổng nghiệm thu 100 điểm, ngưỡng 85, và quyền cấp bậc thuộc về học viện gốc.',
    'Bảy luật an toàn và mười luật bảo vệ trẻ em.',
    'Luật *tiền không mua bậc* và trần hoa hồng giới thiệu 10%.',
    'Nghi thức trao hộ chiếu và nghi thức lên bậc — hình thức có thể đổi theo vùng, việc con tự đọc cam kết thì không.',
    'Sổ phàn nàn công khai và luật *người bị phàn nàn không xử phàn nàn*.'
  ];

})(window.GV = window.GV || {});
