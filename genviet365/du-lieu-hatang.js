/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · KHO HẠ TẦNG — MÃ HOÁ, HỌC LIỆU SỐ, NGÂN HÀNG
   CÂU HỎI, LỚP TRỰC TUYẾN, LƯU TRỮ

   BIÊN SOẠN MỚI — phần học liệu số và ngân hàng câu hỏi chưa có
   trong kho gốc. Cần Hội đồng Chuyên môn duyệt; phần lưu trữ dữ
   liệu trẻ em cần rà theo quy định hiện hành.

   Khoảng trống được lấp: nhóm 10 của hệ mang tên "Dữ liệu — xương
   sống kỹ thuật" nhưng phần mã hoá chỉ có sáu dòng ví dụ, và toàn
   hệ chưa có một dòng nào về học liệu số, về cách ra đề, hay về
   lớp trực tuyến. Một hệ đào tạo mười hai khối lớp mà không có
   ba thứ ấy thì mỗi điểm mới mở lại tự chế lại từ đầu.

   ĐÃ ĐỌC ĐỂ KHÔNG VIẾT TRÙNG:
   · du-lieu-kythuat.js — hộ chiếu JSON, bảng lưu, giao diện máy
     chủ, quyền, bảy nguyên tắc dựng phần mềm. Kho này KHÔNG lặp
     lại bảng lưu và không lặp lại danh sách quyền.
   · du-lieu-dangnhap.js — bốn lớp kiểm soát và hợp đồng máy chủ
     tối thiểu. Kho này KHÔNG viết lại hợp đồng ấy; chỗ nào cần
     thì trỏ về G.DN_MAY_CHU.
   · du-lieu-tincay.js — ba tầng bằng chứng, bảo vệ trẻ, đồng
     thuận dữ liệu. Phần lưu trữ ở đây bám theo các mốc ấy.
   · du-lieu-chuyende.js và du-lieu-giaoan.js — mã chuyên đề
     GV<khối>.<nhóm>.<số>, khung buổi, biểu mẫu BM-01 tới BM-14.
     Học liệu và câu hỏi trong kho này treo vào đúng các mã đó.
   · du-lieu-slide.js — bộ trình bày cho người lớn đi giới thiệu.
     Khác hẳn học liệu dạy trẻ ở đây.

   NÓI THẲNG VỀ RANH GIỚI: kho này ghi CHUẨN ở mức nguyên tắc —
   định dạng mở, kích thước, phụ đề, tương phản, thời hạn. Nó cố
   ý không nêu tên phần mềm, tên nhà cung cấp hạ tầng, số hiệu
   văn bản pháp luật hay giá. Những thứ đó đổi nhanh hơn kho này,
   và nêu ra là ràng hệ vào một chỗ trong ba mươi năm.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Hệ mã hoá toàn hệ ────────────────────────────────
     Mở rộng sáu dòng ví dụ sẵn có thành mười tám loại đối tượng
     thật sự cần mã. Nguyên tắc chung: mã đọc được bằng mắt, mã
     ghi lại thời điểm chứ không ghi trạng thái hiện tại, và mã
     đã sinh thì không sửa.

     Cột: Loại đối tượng · Dạng mã · Ví dụ ·
          Quy tắc sinh mã · Điều KHÔNG được làm với mã          */
  G.HT_MA_HOA = [
    ['Học viên', 'GV-<năm vào>-<vùng>-<sáu số>', 'GV-2026-HN-000123',
      'Cấp một lần lúc nhập hệ. Số thứ tự chạy trong phạm vi vùng, không chạy toàn hệ, để hai vùng cấp mã song song mà không đụng nhau.',
      'Không đổi mã khi em chuyển vùng hay đổi tên. Không cấp lại mã của người đã rời hệ cho người mới.'],

    ['Chi hội', 'CH-<vùng>-<hai số>', 'CH-HN-01',
      'Liên chi hội vùng cấp, theo thứ tự lập. Chi hội chạy thử cũng có mã ngay từ ngày đầu.',
      'Không đổi mã khi chi hội đổi tên hay đổi trường. Chi hội đóng thì mã treo vĩnh viễn, không dùng lại.'],

    ['Chuyên đề', 'GV<khối>.<nhóm>.<hai số>', 'GV1.2.07',
      'Đã cố định trong kho chuyên đề: khối 1, nhóm 2, chuyên đề thứ 7. Số nhóm chạy 1–5, số chuyên đề chạy 01–10.',
      'Không lấp chỗ trống. Bản gốc khối 2 nhảy từ .02 sang .04; giữ nguyên khoảng hụt, không dồn số cho đẹp.'],

    ['Buổi học', 'BH-<mã chi hội viết liền>-<năm>-<ba số>', 'BH-CHHN01-2026-014',
      'Số chạy theo thứ tự buổi trong năm của chính chi hội đó, tính cả buổi bị huỷ.',
      'Không bỏ số của buổi đã huỷ. Buổi huỷ giữ mã và ghi lý do huỷ — bỏ số là xoá dấu vết.'],

    ['Dự án', 'DA.<năm>.B<bậc>.<ba số>', 'DA.2029.B4.017',
      'Bậc ghi trong mã là bậc của học viên tại lúc mở dự án, không phải bậc hiện nay.',
      'Không sửa phần bậc khi em lên bậc sau đó. Mã ghi lại thời điểm, không ghi trạng thái.'],

    ['Danh hiệu', 'DH-<trục>-<hai số>', 'DH-CN-01',
      'Trục viết tắt hai chữ: CN cá nhân, DN đội nhóm, GD gia đình. Hội đồng cấp mã khi ban hành danh hiệu mới.',
      'Không cấp mã mới khi chỉ đổi tên gọi. Đổi tên thì giữ mã và ghi tên cũ vào lịch sử danh hiệu.'],

    ['Biểu mẫu', 'BM-<hai số>', 'BM-14',
      'Số chạy toàn hệ, không chạy riêng theo phòng ban. Số bản ghi ở một trường riêng cạnh mã.',
      'Không đổi số khi sửa nội dung. BM-14 sửa tới lần thứ ba vẫn là BM-14, bản 3.'],

    ['Hồ sơ nghiệm thu', 'CG.B<bậc>.<chu kỳ>.<hai số>', 'CG.B2.90.03',
      'Cổng lên bậc 2, chu kỳ 90 ngày, lần chấm thứ 3. Mã sinh lúc mở phiên, không sinh lúc chấm xong.',
      'Không xoá hồ sơ của lần chấm trượt. Lần trượt là một phần hồ sơ, không phải rác.'],

    ['Sự kiện', 'SK-<năm>-<vùng>-<hai số>', 'SK-2026-HN-03',
      'Dùng cho lễ, trại, ngày hội, buổi vinh danh — thứ có người ngoài hệ tới dự.',
      'Không dùng mã sự kiện cho buổi học thường. Hai loại này có yêu cầu đồng thuận hình ảnh khác nhau.'],

    ['Điểm nhượng quyền', 'DNQ-<vùng>-<ba số>', 'DNQ-HN-002',
      'Cấp khi ký hợp đồng, không cấp khi mới ký ghi nhớ.',
      'Không nhét mã gói NQ-1 tới NQ-4 vào mã điểm. Gói đổi được lúc gia hạn; mã điểm thì không.'],

    ['Học liệu', 'HL-<loại>-<mã chỗ dùng>-b<số bản>', 'HL-SLIDE-GV1.2.07-b3',
      'Loại viết chữ in. Chỗ dùng là mã chuyên đề hoặc mã biểu mẫu. Số bản nhích mỗi lần phát hành lại.',
      'Không phát hành hai tệp khác ruột cùng một số bản. Người dạy không phân biệt được thì sẽ dạy nhầm bản cũ.'],

    ['Câu hỏi', 'NH-<mã chuyên đề>-<loại>-<ba số>', 'NH-GV1.2.07-TN-004',
      'Loại viết hai chữ: TN trắc nghiệm, TH tình huống, TL tự luận, QS quan sát. Số chạy trong phạm vi một chuyên đề.',
      'Không sửa ruột một câu đã dùng để chấm. Sửa thì cấp mã mới và đánh dấu câu cũ là ngừng dùng.'],

    ['Coach', 'R08-<ba số>', 'R08-017',
      'Ghép mã vai trong bảng phân quyền với số thứ tự người. Chuyên gia đánh giá dùng R11 theo cùng cách.',
      'Không đổi phần vai khi người đó lên vai khác. Cấp mã thứ hai và nối hai mã bằng bản ghi, để giữ được lịch sử ai chấm ai.'],

    ['Lớp', 'LH-<vùng>-<năm>-<hai số>', 'LH-HN-2026-05',
      'Một lớp là một nhóm học viên học cùng nhau trọn một chu kỳ. Khác chi hội — chi hội là tổ chức tự quản, lớp là đơn vị dạy.',
      'Không dùng lại mã lớp cho khoá sau. Lớp kết thúc thì mã đóng theo.'],

    ['Khối', 'K<hai số>', 'K07',
      'Khối theo lớp phổ thông, K01 tới K12. Cố định sẵn, không do ai cấp.',
      'Không dùng mã khối để chỉ độ khó của học liệu. Mã khối chỉ nói học liệu viết cho ai, không nói ai được dùng.'],

    ['Bản dựng', 'BD-<ngày dựng>-<sáu ký tự băm>', 'BD-20260830-a7f3c1',
      'Máy sinh lúc dựng, không do người điền. Băm tính trên toàn bộ nội dung đã đóng gói.',
      'Không để hai bản khác ruột mang cùng mã. Trùng mã mà khác ruột là mất hẳn khả năng truy lại bản đã phát.'],

    ['Minh chứng', 'MC-<sáu số của học viên>-<ba số>', 'MC-000123-021',
      'Số chạy theo từng học viên. Tệp kèm đặt tên đúng bằng mã, không đặt bằng tên người.',
      'Không đặt tên tệp bằng tên hoặc ngày sinh của trẻ. Tên tệp đi ra ngoài dễ hơn ruột tệp rất nhiều.'],

    ['Nhật ký hệ', 'NK-<năm>-<tháng>-<bảy số>', 'NK-2026-08-0004317',
      'Máy sinh liên tục, không có khoảng trống. Khoảng trống trong dãy số là dấu hiệu đã có người xoá.',
      'Không ai được xoá hay sửa một dòng nhật ký, kể cả Super Admin. Sửa được nhật ký thì nhật ký hết giá trị.']
  ];

  /* ── 2 · Kho học liệu số ──────────────────────────────────
     Mười sáu loại học liệu, mỗi loại có chuẩn kỹ thuật tối thiểu
     nói ở mức nguyên tắc. Chuẩn viết theo hai câu hỏi: mở được
     sau mười năm không, và em không nghe được hoặc không nhìn
     rõ có dùng được không.

     Cột: Loại học liệu · Dùng ở đâu · Ai làm ·
          Chuẩn kỹ thuật tối thiểu · Thời hạn rà lại ·
          Ai duyệt trước khi phát                                */
  G.HT_HOC_LIEU = [
    ['Slide bài giảng', 'Chuyên đề trên lớp và buổi sinh hoạt chi hội', 'Giáo viên soạn, người dựng nội dung chuẩn hoá',
      'Tỉ lệ 16:9. Cỡ chữ nhỏ nhất tương đương 24 điểm. Tương phản chữ trên nền từ 4.5:1 trở lên. Không quá 30 chữ một trang. Luôn xuất kèm bản PDF để mở được trên máy không cài phần mềm trình chiếu.',
      '12 tháng', 'Quản lý chuyên môn'],

    ['Video ngắn', 'Mở đầu chuyên đề, hướng dẫn thao tác, ôn tập ở nhà', 'Nhóm nội dung số, quay theo kịch bản đã duyệt',
      'Dưới 3 phút. Phụ đề tiếng Việt để rời thành tệp văn bản, không nung vào hình, để sửa được khi nội dung đổi. Định dạng nén phổ thông. Dung lượng đủ nhỏ để mở trên mạng yếu. Có bản âm thanh tách riêng cho em không xem được hình.',
      '24 tháng', 'Quản lý chuyên môn; có hình trẻ thì thêm Ban an toàn'],

    ['Phiếu in', 'Làm tại lớp và giao về nhà', 'Giáo viên',
      'Một mặt A4 cho tiểu học, tối đa hai mặt cho trung học. In đen trắng vẫn đọc được — màu không bao giờ là thông tin duy nhất. Chừa chỗ viết tay đủ rộng cho chữ trẻ. Chân phiếu có ô ghi mã học liệu và mã chuyên đề.',
      '12 tháng', 'Giáo viên chủ trì khối; bản phát toàn hệ do Quản lý chuyên môn ký'],

    ['Thẻ tình huống', 'Hoạt động nhóm, đóng vai, sinh hoạt chi hội', 'Giáo viên và Coach',
      'Một tình huống một thẻ, dưới 60 chữ. Mặt sau ghi câu hỏi dẫn, không ghi đáp án đúng. Khổ cầm vừa tay trẻ. Bản in và bản số cùng một ruột.',
      '12 tháng', 'Quản lý chuyên môn; thẻ chạm chủ đề nhạy cảm phải qua Ban an toàn'],

    ['Audio', 'Nghe ở nhà, phút tĩnh, luyện đọc, học liệu cho em khó đọc', 'Nhóm nội dung số',
      'Giọng người thật cho mọi nội dung dạy. Luôn kèm bản chép lời đầy đủ dạng văn bản. Định dạng nén phổ thông. Mỗi tệp một mạch, không cắt giữa câu.',
      '24 tháng', 'Quản lý chuyên môn'],

    ['Sổ tay', 'Sổ 90 ngày của học viên, sổ vai của phụ huynh, sổ Ban của CLB', 'Ban chuyên môn',
      'Bản in là bản chính, bản số là bản sao. Mọi trang có số trang và mã bản. Có mục lục. Không in sẵn dữ liệu cá nhân — chỗ ghi tên để trống cho người dùng tự viết.',
      '24 tháng', 'Hội đồng Chuyên môn'],

    ['Poster', 'Treo lớp, treo phòng sinh hoạt, truyền thông sự kiện', 'Nhóm nhận diện',
      'Đọc được từ 3 mét. Một thông điệp một poster. Dùng đúng bộ nhận diện đã ban hành. Lưu kèm bản gốc sửa được, không chỉ lưu ảnh phẳng.',
      '12 tháng', 'Người giữ nhận diện thương hiệu'],

    ['Biểu mẫu điện tử', 'Nộp bảng số tuần, đăng ký, phiếu quan sát, khảo sát', 'Nhóm vận hành',
      'Mỗi trường bắt buộc phải nói được vì sao cần. Không hỏi thứ không dùng tới. Ghi ngay trên biểu mẫu: dữ liệu chảy về đâu, ai đọc được, giữ bao lâu. Luôn có bản giấy tương đương cho nơi không có mạng.',
      '6 tháng', 'Quản lý chuyên môn cùng người phụ trách dữ liệu'],

    ['Bài kiểm tra', 'Đầu vào, mốc 90 ngày, cổng nghiệm thu', 'Ban chuyên môn cùng người ra đề đã tập huấn',
      'Rút từ ngân hàng câu hỏi, không viết mới tại chỗ. Mỗi đề ghi rõ đo trục nào, làm mất bao lâu, chấm theo bảng nào. Bản in và bản làm trên máy cùng một ruột. Bản trên máy phải giữ được bài dở khi mất mạng.',
      '12 tháng', 'Hội đồng Chuyên môn cho đề dùng ở cổng nghiệm thu'],

    ['Trò chơi', 'Khởi động buổi, luyện lặp, sinh hoạt CLB', 'Giáo viên và Coach',
      'Luật viết dưới 10 dòng, đọc một lần là chơi được. Chơi được mà không cần thiết bị. Ghi rõ số người tối thiểu và tối đa. Ghi rõ trò này rèn cái gì — không rèn gì thì không vào kho.',
      '12 tháng', 'Quản lý chuyên môn'],

    ['Tranh minh hoạ', 'Sổ tay, phiếu in, slide, poster', 'Nhóm nhận diện, hoặc mua có giấy phép',
      'Bản gốc dạng véc-tơ để phóng to không vỡ. Ghi nguồn và giấy phép ngay trong hồ sơ tệp. Trẻ trong tranh là hình vẽ; không dùng ảnh chụp trẻ thật cho học liệu phát rộng.',
      '24 tháng', 'Người giữ nhận diện cùng người phụ trách bản quyền'],

    ['Bản đồ tư duy', 'Tổng kết chuyên đề, ôn tập, hướng dẫn người dạy', 'Ban chuyên môn',
      'Luôn kèm bản đọc tuyến tính — phần mềm đọc màn hình không đọc được hình. Không quá ba tầng nhánh. Chữ trên mỗi nhánh dưới 7 chữ.',
      '24 tháng', 'Quản lý chuyên môn'],

    ['Kịch bản', 'Buổi mẫu, lễ, đóng vai, dựng video', 'Ban chuyên môn cùng người đã dựng buổi thật',
      'Ghi mốc phút, ghi ai nói, ghi dấu hiệu buổi đang hỏng. Tách rõ phần được phép bỏ khi thiếu giờ và phần không được bỏ.',
      '12 tháng', 'Quản lý chuyên môn'],

    ['Bài đọc', 'Thư viện Gen Việt, đọc trước buổi, giao về nhà', 'Ban chuyên môn',
      'Ghi rõ viết cho khối nào và đọc mất bao lâu. Câu dài trung bình dưới 20 chữ ở bậc tiểu học. Nguồn trích dẫn đủ để tra lại. Định dạng văn bản mở, không khoá trong một phần mềm.',
      '24 tháng', 'Hội đồng Chuyên môn'],

    ['Bản ghi buổi mẫu', 'Đào tạo Coach và giáo viên mới, dự giờ lại', 'Nhóm nội dung số quay tại lớp thật',
      'Chỉ quay khi mọi gia đình có mặt đã đồng thuận bằng văn bản. Em không có đồng thuận thì bố trí ngoài khung hình. Lưu trong kho có kiểm soát truy cập, không phát công khai.',
      '12 tháng, và rà ngay khi một gia đình rút đồng thuận', 'Ban an toàn cùng Trưởng nhóm Coach'],

    ['Thẻ khẩu quyết', 'Nhắc lại hằng ngày ở lớp và ở nhà', 'Ban chuyên môn',
      'Một câu, dưới 12 chữ, đọc lên nghe được nhịp. Mặt sau ghi một việc làm được ngay hôm nay. Có bản in khổ bỏ túi và bản ảnh cho điện thoại.',
      '24 tháng', 'Hội đồng Chuyên môn']
  ];


  /* ── 3 · Ngân hàng câu hỏi ────────────────────────────────
     Hai mươi loại câu hỏi. Cột cấp độ dùng thang nhận thức sáu
     mức, kèm bậc nhân tài mà loại ấy thường phục vụ. Cột bẫy là
     phần quan trọng nhất: mỗi loại câu hỏi có một cách hỏng
     riêng, và người ra đề mới hầu như luôn dính đúng cái bẫy đó.

     Cột: Loại câu hỏi · Đo năng lực gì · Cấp độ ·
          Ví dụ một câu · Cách chấm · Bẫy khi ra đề              */
  G.HT_NGAN_HANG_CAU_HOI = [
    ['Trắc nghiệm một lựa chọn', 'Nhớ khái niệm, nhận ra định nghĩa đúng', 'Nhớ – Hiểu · thường dùng từ B1',
      '“Trong bảng số tuần của chi hội, cột nào ghi số việc em đã giúp người khác?” — bốn phương án.',
      'Máy chấm. Đúng 1, sai 0, không trừ điểm khi đoán.',
      'Ba phương án sai làm cho có thì cả lớp cùng đúng mà không ai học được gì. Phương án sai phải là ba lỗi hiểu thật đã gặp ở lớp.'],

    ['Trắc nghiệm nhiều lựa chọn', 'Phân biệt cái đủ và cái thiếu trong một danh sách', 'Hiểu – Phân tích · B2',
      '“Chọn tất cả những thứ tính là bằng chứng tầng ba trong hộ chiếu.”',
      'Máy chấm theo từng ý: đúng một ý được một phần, chọn thừa thì trừ đúng phần đó. Không chấm trọn gói.',
      'Không ghi rõ “chọn tất cả” thì trẻ chỉ chọn một ý và mất điểm vì cách đọc đề, không vì thiếu năng lực.'],

    ['Đúng sai kèm giải thích', 'Bắt được lý do chứ không chỉ bắt được kết quả', 'Hiểu · B1–B2',
      '“Đúng hay sai: lời khen của phụ huynh là bằng chứng tác động. Viết một câu vì sao.”',
      'Người chấm. Phần đúng sai 1 điểm, phần giải thích 2 điểm theo ba mức mô tả sẵn. Chọn đúng mà giải thích sai thì không có điểm giải thích.',
      'Câu đúng sai để trần, không có phần giải thích, chỉ đo được may rủi: đoán bừa cũng đúng một nửa.'],

    ['Điền khuyết', 'Nhớ chính xác thuật ngữ và con số của hệ', 'Nhớ · B1',
      '“Hộ chiếu nhân tài chụp lại mức mười hai trục sau mỗi ___ ngày.”',
      'Máy chấm theo danh sách đáp án chấp nhận được, tính cả cách viết khác và lỗi dấu.',
      'Chừa quá nhiều chỗ trống trong một câu thì thành câu đố chữ, không còn đo được gì.'],

    ['Nối cặp', 'Nắm quan hệ giữa hai hệ khái niệm', 'Hiểu · B1–B2',
      '“Nối bốn trụ với mô tả đúng của từng trụ.”',
      'Máy chấm từng cặp một, không chấm tất cả hoặc không.',
      'Hai vế bằng nhau về số lượng thì cặp cuối cùng đúng miễn phí. Luôn để dư ít nhất hai vế bên phải.'],

    ['Sắp thứ tự', 'Hiểu một quy trình có trước sau bắt buộc', 'Vận dụng · B2',
      '“Sắp bảy bước xử lý khi một em kể chuyện bị xâm hại theo đúng thứ tự.”',
      'Chấm theo số cặp liền kề đúng, không chấm tất cả hoặc không.',
      'Quy trình mà đảo thứ tự vẫn chạy được thì không ra dạng này. Chỉ dùng cho quy trình mà đảo thứ tự là làm sai.'],

    ['Tình huống ngắn', 'Vận dụng chuẩn vào một ca cụ thể', 'Vận dụng · B2–B3',
      '“Bạn cùng nhóm nhận phần việc rồi bỏ dở, còn hai ngày là tới buổi báo cáo. Em làm gì trước tiên?”',
      'Người chấm theo bảng ba mức: nêu được hành động, nêu được lý do, nêu được điều mình sẽ không làm.',
      'Tình huống viết quá dài thì đo kỹ năng đọc chứ không đo kỹ năng xử lý. Giữ dưới 80 chữ.'],

    ['Tình huống phân nhánh', 'Thấy hậu quả của lựa chọn và sửa được giữa chừng', 'Phân tích – Đánh giá · B3–B4',
      '“Em chọn nói thẳng với bạn. Bạn im lặng bỏ về. Bước tiếp theo của em là gì?”',
      'Chấm theo đường đi, không chấm theo điểm đến. Ghi rõ em có đổi hướng sau khi thấy hậu quả không.',
      'Chỉ có một nhánh đúng thì trẻ đoán ra mẫu sau hai lần làm. Mỗi nhánh phải có cái được và cái mất.'],

    ['Câu hỏi mở ngắn', 'Diễn đạt lại bằng lời của mình', 'Hiểu · B2',
      '“Nói lại bằng lời của em: vì sao hệ không nâng bậc theo thời gian?”',
      'Người chấm theo ba mức có mô tả hành vi, kèm hai bài mẫu neo ở mỗi mức để hai người chấm ra cùng một điểm.',
      'Không có bài mẫu neo mức thì hai người chấm lệch nhau tới hai mức trên cùng một bài.'],

    ['Bài viết phản tư', 'Nhìn lại chính mình, có bằng chứng cụ thể', 'Đánh giá · B3',
      '“Tuần này em bỏ dở việc gì? Viết việc đó, lý do thật, và một điều em sẽ đổi tuần sau.”',
      'Chấm đạt hay chưa đạt theo bốn dấu hiệu: có việc cụ thể, có lý do không đổ ra ngoài, có điều đổi được, có mốc kiểm lại. Không cho điểm số.',
      'Cho điểm số bài phản tư thì trẻ viết thứ người lớn muốn đọc. Đây là dạng duy nhất trong ngân hàng không được cho điểm số.'],

    ['Bài tập thực hành có sản phẩm', 'Làm được thật, không chỉ nói được', 'Vận dụng – Sáng tạo · B3–B4',
      '“Dựng một phiếu theo dõi việc nhà cho gia đình em, dùng thử bảy ngày, nộp cả phiếu lẫn ảnh chụp lúc đang dùng.”',
      'Chấm theo bảng tiêu chí đã phát cho học viên trước khi làm. Sản phẩm không có dấu vết đã dùng thật thì chưa đạt.',
      'Phát tiêu chí sau khi nộp bài là bẫy người học. Bảng tiêu chí phải nằm ngay trong đề.'],

    ['Quan sát hành vi', 'Cái trẻ làm khi không ai nhắc', 'Vận dụng · B2–B4',
      '“Trong buổi sinh hoạt, em có tự nhận việc dọn chỗ ngồi không? Ghi: có · không · có khi được nhắc.”',
      'Người dạy đánh dấu theo ba mức mô tả bằng hành vi nhìn thấy được. Không có mức “khá”, chỉ có mức mô tả được.',
      'Tiêu chí viết bằng tính từ thì hai người quan sát ra hai kết quả. Viết bằng động từ nhìn thấy được bằng mắt.'],

    ['Tự đánh giá theo thang mức', 'Trẻ biết mình đang đứng ở đâu', 'Đánh giá · B2–B3',
      '“Trên thang 5 mức hỗ trợ, tuần này em cần người lớn nhắc bao nhiêu lần để ngồi vào bàn học?”',
      'Không cho điểm. Đặt cạnh đánh giá của người dạy và tính khoảng lệch. Khoảng lệch thu hẹp dần là tín hiệu tốt hơn điểm cao.',
      'Lấy tự đánh giá làm điểm chính thức thì trẻ học cách khai cao. Tự đánh giá chỉ đứng cạnh dữ liệu khác, không đứng một mình.'],

    ['Đánh giá đồng đẳng', 'Nhận xét việc, không nhận xét người', 'Phân tích · B3',
      '“Đọc bản kế hoạch của bạn cùng nhóm. Nêu một chỗ làm được và một chỗ chưa rõ.”',
      'Chấm chính bản nhận xét: có nêu chỗ cụ thể không, có nói về việc thay vì về người không. Không lấy nhận xét của bạn làm điểm của người được nhận xét.',
      'Cho học viên chấm điểm nhau là mở đường cho trả đũa và bè phái. Chỉ nhận xét, không cho điểm nhau.'],

    ['Vấn đáp theo kịch bản', 'Nghĩ tại chỗ và nói ra thành lời', 'Phân tích – Đánh giá · B3–B5',
      '“Kể một lần em giữ lời hứa khi việc đó bất lợi cho em. Sau đó chuyện gì xảy ra?”',
      'Hai người hỏi, chấm độc lập rồi đối chiếu. Lệch quá một mức thì hỏi lại, không lấy trung bình.',
      'Người hỏi gợi ý để giúp trẻ là làm hỏng phép đo. Chỉ được dùng phần gợi ý đã viết sẵn trong kịch bản.'],

    ['Đóng vai chấm theo mô tả hành vi', 'Kỹ năng còn dùng được dưới áp lực', 'Vận dụng · B3–B4',
      '“Em là người điều hành buổi sinh hoạt. Một bạn nói chen liên tục. Xử lý trong hai phút.”',
      'Chấm bằng bảng liệt kê hành vi nhìn thấy được: gọi tên, nêu luật, mở đường quay lại cho bạn. Đánh dấu có hoặc không, không cho điểm cảm nhận.',
      'Người đóng vai diễn quá gắt thì bài đo sức chịu đựng chứ không đo kỹ năng. Mức khó phải cố định sẵn trong kịch bản.'],

    ['Tìm lỗi trong mẫu sai', 'Nắm chuẩn đủ chắc để nhận ra chỗ lệch', 'Phân tích · B3',
      '“Đây là một bảng số tuần đã điền sai ba chỗ. Tìm ra và nói vì sao sai.”',
      'Chấm theo số lỗi tìm đúng và chất lượng lý do. Chỉ ra lỗi không có thật thì trừ, vì đó là dấu hiệu chuẩn chưa chắc.',
      'Mẫu sai phải sai theo kiểu người thật hay sai. Sai kiểu bịa ra thì trẻ nhận ra ngay và bài mất tác dụng.'],

    ['Dạy lại cho người khác', 'Hiểu tới mức truyền được cho người kế tiếp', 'Đánh giá – Sáng tạo · B4–B5',
      '“Dạy lại cho một em nhỏ hơn cách chia một việc lớn thành ba việc nhỏ. Nộp bản ghi ba phút.”',
      'Chấm ở người học chứ không ở người dạy: em nhỏ sau đó có làm được không. Kèm bản tự nhận xét của người dạy lại.',
      'Chấm ở người trình bày thì đo được sự tự tin, không đo được sự hiểu. Bằng chứng nằm ở người nghe.'],

    ['Nhật ký thực hiện có bằng chứng ngoài', 'Việc làm thật ở nơi hệ không có mặt', 'Vận dụng · B2–B4',
      '“Ghi mười ngày liên tiếp việc em tự làm không cần nhắc, mỗi ngày một dòng, có chữ ký người ở nhà.”',
      'Chấm tính liên tục, không chấm số lượng. Đứt một ngày mà ghi rõ lý do vẫn tính là liên tục.',
      'Đòi ba mươi ngày liền không đứt là ép người ta khai gian. Cho phép đứt có lý do thì số liệu thật hơn hẳn.'],

    ['Đọc bảng số và ước lượng', 'Đọc dữ liệu, không đọc cảm giác', 'Phân tích · B3–B4',
      '“Đường cong hỗ trợ của một bạn đi từ mức 5 xuống mức 3 rồi lên lại mức 4. Nêu hai khả năng đã xảy ra.”',
      'Chấm số khả năng hợp lý nêu được, và có nêu thứ cần kiểm thêm không. Một khả năng duy nhất kèm khẳng định chắc chắn thì chưa đạt.',
      'Ra đề với dữ liệu chỉ có một cách hiểu là dạy trẻ kết luận vội. Dữ liệu phải mở cho ít nhất hai cách hiểu.']
  ];

  /* ── 4 · Từ ý tưởng tới học liệu phát được ────────────────
     Mười bước. Bước 7 là bước hay bị bỏ nhất và cũng là bước
     duy nhất không thay thế được: thử với học sinh thật. Thử với
     đồng nghiệp chỉ cho biết học liệu có dễ hiểu với người lớn
     đã biết trước nội dung hay không — một câu hỏi khác hẳn.    */
  G.HT_QUY_TRINH_HOC_LIEU = [
    { v: '1', t: 'Nhu cầu phải đến từ giáo án, không đến từ ý thích',
      dk: 'Người đề nghị chỉ ra mã chuyên đề và mốc phút trong khung buổi mà học liệu này sẽ nằm vào. Không chỉ ra được thì dừng ở đây.',
      duoc: 'Kho không phình lên bằng những thứ đẹp mà không ai dùng. Mỗi món trong kho có một chỗ đứng cụ thể trong một buổi thật.',
      bac: 'Câu “làm cái video cho sinh động” không phải một nhu cầu. Nhu cầu là “phút 12 của GV1.2.07 học viên không hình dung được thao tác, cần thấy người làm mẫu”.' },

    { v: '2', t: 'Tra kho trước khi làm mới',
      dk: 'Tìm trong kho học liệu theo mã chuyên đề và theo loại. Có thứ dùng lại được thì sửa bản cũ và nhích số bản, không mở món mới.',
      duoc: 'Tránh hai học liệu cùng dạy một thứ theo hai cách lệch nhau — về sau không ai biết bản nào là chuẩn.',
      bac: 'Người mới thường không biết kho có gì nên làm lại từ đầu. Ai nhận việc cũng phải được chỉ chỗ tra kho ngay ngày đầu.' },

    { v: '3', t: 'Viết bản mô tả một trang trước khi làm',
      dk: 'Một trang ghi: dùng ở đâu, dạy cho khối nào, người học làm được gì sau đó, học liệu này đạt khi nào, và ai duyệt.',
      duoc: 'Người duyệt và người làm hiểu giống nhau ngay từ đầu. Cãi nhau về một trang giấy rẻ hơn cãi nhau về một bản dựng xong.',
      bac: 'Bỏ bước này thì tới lúc nghiệm thu mới phát hiện hai bên hiểu khác nhau, và toàn bộ công dựng phải bỏ.' },

    { v: '4', t: 'Duyệt nội dung chuyên môn trước khi làm đẹp',
      dk: 'Người có thẩm quyền chuyên môn duyệt chữ và cấu trúc trên bản nháp trần, chưa có hình, chưa có màu.',
      duoc: 'Sai nội dung được bắt lúc còn rẻ. Sửa một câu trong bản nháp mất năm phút; sửa cùng câu ấy trong một video đã dựng mất một ngày.',
      bac: 'Đưa bản đã làm đẹp đi duyệt thì người duyệt ngại bác — công sức đã bỏ ra làm lệch phán đoán của cả hai bên.' },

    { v: '5', t: 'Dựng bản thô, rẻ nhất có thể',
      dk: 'Bản thô đủ để dùng thử: slide chưa trau chuốt, video quay một lần bằng thiết bị sẵn có, phiếu in đen trắng.',
      duoc: 'Có thứ cầm được để mang ra lớp trong vòng một tuần thay vì một tháng.',
      bac: 'Trau chuốt bản thô là tiêu tiền vào thứ có thể phải bỏ đi sau khi thử. Đẹp là việc của bước 9.' },

    { v: '6', t: 'Rà an toàn trẻ em và bản quyền',
      dk: 'Kiểm ba thứ: có hình hay giọng của trẻ thật không và đã có đồng thuận chưa; ảnh, nhạc, phông chữ có giấy phép dùng không; có dữ liệu cá nhân nào lọt vào ví dụ không.',
      duoc: 'Học liệu không mang theo một quả bom hẹn giờ về pháp lý hoặc về an toàn.',
      bac: 'Ví dụ minh hoạ hay được lấy từ hồ sơ một em có thật cho sinh động. Đó là rò rỉ dữ liệu, dù tên đã đổi — bạn cùng lớp vẫn nhận ra.' },

    { v: '7', t: 'Thử với học sinh thật, có người quan sát',
      dk: 'Ít nhất một lớp thật, đúng khối được nhắm tới, ít nhất mười học viên. Một người dạy, một người ngồi quan sát và ghi. Người quan sát không nhắc, không cứu, không giải thích thêm.',
      duoc: 'Biết chỗ nào trẻ khựng lại, chỗ nào hiểu sai, chỗ nào thừa. Không có cách nào khác biết được điều này.',
      bac: 'Người làm ra học liệu tự dạy thử thì bù được mọi chỗ hổng bằng lời nói tại chỗ, và tưởng học liệu đã ổn. Cho người khác dạy thử.' },

    { v: '8', t: 'Sửa theo chỗ hỏng quan sát được, không theo cảm nhận',
      dk: 'Lấy danh sách chỗ khựng từ người quan sát. Mỗi chỗ khựng phải có một sửa đổi hoặc một lý do giữ nguyên. Sửa xong thì thử lại ở một lớp khác.',
      duoc: 'Bản thứ hai tốt hơn bản đầu ở những chỗ đo được, không phải ở những chỗ người làm thấy chưa ưng.',
      bac: 'Bỏ qua lần thử thứ hai vì đã hết thời gian là bỏ nửa giá trị của cả quy trình. Bản đầu luôn còn ít nhất hai chỗ hỏng.' },

    { v: '9', t: 'Đóng gói, gán mã, đặt hạn rà lại',
      dk: 'Hoàn thiện hình thức. Gán mã theo dạng HL. Ghi vào hồ sơ tệp: chuyên đề gắn vào, khối, người làm, người duyệt, ngày phát, hạn rà lại, giấy phép của mọi thứ đi mượn. Lưu bản gốc sửa được cạnh bản phát hành.',
      duoc: 'Ba năm sau vẫn biết ai làm, sửa được, và biết khi nào phải rà lại.',
      bac: 'Chỉ lưu bản đã đóng gói mà mất bản gốc là án tử của học liệu: năm sau muốn sửa một chữ cũng phải làm lại từ đầu.' },

    { v: '10', t: 'Phát rộng và theo dõi ba tháng đầu',
      dk: 'Ghi vào sổ học liệu, thông báo cho người dạy. Ba tháng đầu thu phản hồi có cấu trúc từ ít nhất năm người dạy khác nhau, không thu bằng lời nói ngoài hành lang.',
      duoc: 'Bắt được chỗ chỉ hỏng khi ra khỏi lớp thử: lớp đông hơn, phòng khác, người dạy chưa quen.',
      bac: 'Không thu phản hồi thì học liệu hỏng vẫn nằm trong kho nhiều năm, và người dạy tự chữa cháy riêng lẻ mà không ai biết.' }
  ];

  /* ── 5 · Lớp trực tuyến ───────────────────────────────────
     Mười hai mục. Phần lớn hệ đào tạo đưa nguyên buổi trực tiếp
     lên mạng rồi ngạc nhiên vì kết quả kém. Nguyên nhân không
     nằm ở đường truyền: có những thứ chỉ hình thành khi trẻ ở
     cùng một phòng với nhau.                                    */
  G.HT_TRUC_TUYEN = [
    { t: 'Dạy trực tuyến được', n: 'Truyền kiến thức, hướng dẫn thao tác, chữa bài, ôn tập, họp Ban điều hành CLB, báo cáo dự án, kèm một em đã quen với người dạy.',
      vi: 'Chung một đặc điểm: nội dung đi một chiều hoặc hai chiều bằng lời, và kết quả đo được ngay trên màn hình.' },

    { t: 'Không dạy trực tuyến được', n: 'Buổi đầu tiên của một nhóm mới, nghi lễ, hoạt động thể chất, đóng vai có va chạm cảm xúc, chấm cổng nghiệm thu bậc 4 trở lên, và mọi buổi có chủ đề chạm tới an toàn cá nhân của trẻ.',
      vi: 'Chung một đặc điểm: cần thấy toàn thân, cần im lặng chung, hoặc cần có người lớn ở ngay cạnh khi một em vỡ ra.' },

    { t: 'Đồng bộ hay tự học — chọn theo mục đích', n: 'Buổi có mặt cùng lúc dùng cho thứ cần hỏi đáp và cần nhìn nhau. Học liệu tự học dùng cho thứ mỗi em cần thời gian khác nhau.',
      vi: 'Đưa nội dung tự học được vào buổi đồng bộ là phí thời gian của cả lớp. Đưa nội dung cần hỏi đáp vào tự học là bỏ rơi em yếu nhất.' },

    { t: 'Độ dài buổi theo lứa tuổi', n: 'Khối 1–3: tối đa 30 phút liền. Khối 4–6: 40 phút. Khối 7–9: 45 phút. Khối 10–12: 60 phút, nghỉ giữa 5 phút. Một ngày không quá hai buổi trực tuyến.',
      vi: 'Con số này là trần, không phải chuẩn. Buổi ngắn mà chặt tốt hơn buổi dài mà loãng — trên màn hình sự loãng đến nhanh gấp đôi.' },

    { t: 'Camera và micro', n: 'Camera bật khi phát biểu và khi điểm danh. Micro tắt mặc định. Không ép bật camera suốt buổi. Em không bật được camera thì báo trước, không bị coi là vắng.',
      vi: 'Ép bật camera suốt buổi là ép trẻ cho người lạ nhìn vào phòng ngủ nhà mình. Nhiều gia đình không có chỗ nào khác để con ngồi học.' },

    { t: 'Không bao giờ một người lớn một trẻ trong phòng kín', n: 'Mọi buổi kèm riêng phải có người thứ ba: một người lớn khác của Học viện, hoặc người giám hộ của em, có mặt trong phòng trực tuyến.',
      vi: 'Luật này không có ngoại lệ vì lý do lịch bận hay vì hai bên đã quen nhau. Nó bảo vệ cả đứa trẻ lẫn người lớn khỏi cáo buộc không kiểm chứng được.' },

    { t: 'Ghi hình buổi học', n: 'Chỉ ghi khi đã báo trước và có đồng thuận bằng văn bản của gia đình. Báo lại bằng lời ngay đầu buổi. Bản ghi lưu trong kho có kiểm soát truy cập, có hạn xoá, không đưa lên kênh công khai.',
      vi: 'Bản ghi một buổi học chứa mặt trẻ, giọng trẻ, tên trẻ và cả tiếng động trong nhà. Nó là dữ liệu trẻ em đầy đủ nghĩa, không phải một tệp tiện dụng.' },

    { t: 'Kênh nhắn tin giữa giáo viên và học sinh', n: 'Chỉ dùng kênh chính thức của Học viện, có người thứ ba đọc được. Nhắn trong khung giờ đã công bố. Nội dung chỉ xoay quanh việc học.',
      vi: 'Kênh có người thứ ba đọc được không phải để rình giáo viên. Nó là thứ bảo vệ giáo viên khi có tranh cãi về một câu đã nhắn.' },

    { t: 'Tài khoản cá nhân — ranh giới cứng', n: 'Giáo viên và Coach không kết bạn, không theo dõi, không nhắn riêng với học sinh trên tài khoản mạng xã hội cá nhân. Học sinh chủ động kết bạn thì từ chối và nói rõ vì sao.',
      vi: 'Đây là ranh giới dễ trượt nhất và cũng là ranh giới hay xuất hiện đầu tiên trong mọi vụ việc về xâm hại trong môi trường giáo dục.' },

    { t: 'An toàn khi trẻ lên mạng', n: 'Phòng học phải có khoá vào: mã riêng từng buổi, người lạ không tự vào được. Người dạy kiểm danh sách trước khi bắt đầu. Không dán đường liên kết phòng học lên nơi công khai. Không gửi đường liên kết lạ trong buổi học.',
      vi: 'Đường liên kết phòng học bị dán lên nhóm công khai là cách phổ biến nhất để người lạ vào quấy rối một lớp trẻ em.' },

    { t: 'Em không có thiết bị hoặc mạng yếu', n: 'Mọi buổi trực tuyến phải có đường thứ hai: bản ghi xem lại, hoặc phiếu in tương đương làm được không cần mạng, hoặc một buổi bù trực tiếp.',
      vi: 'Không có đường thứ hai thì học trực tuyến trở thành cái sàng: nó loại đúng những em vốn đã thiệt thòi nhất.' },

    { t: 'Người lớn ở nhà — vai và giới hạn', n: 'Người lớn ở nhà chịu trách nhiệm về chỗ ngồi, thiết bị và giờ giấc. Không làm bài hộ, không nhắc đáp án, không ngồi trong khung hình suốt buổi.',
      vi: 'Người lớn nhắc đáp án làm hỏng cả phép đo lẫn lòng tự trọng của trẻ. Nói rõ vai này từ buổi đầu, bằng văn bản, để về sau không phải nhắc riêng ai.' }
  ];

  /* ── 6 · Lưu trữ và sao lưu ───────────────────────────────
     Mười bốn loại dữ liệu. Cột "lưu ở đâu" ghi ở mức nguyên tắc,
     không nêu tên nơi cung cấp hạ tầng — nơi ấy sẽ đổi vài lần
     trong đời hệ này, còn nguyên tắc thì không.

     Thời hạn ở cột "giữ bao lâu" là ĐỀ XUẤT của kho, chưa phải
     con số đã rà theo quy định hiện hành. Phần dữ liệu trẻ em
     phải được rà lại trước khi áp dụng.

     Cột: Loại dữ liệu · Lưu ở đâu · Giữ bao lâu ·
          Ai xoá được · Thử phục hồi bao lâu một lần            */
  G.HT_LUU_TRU = [
    ['Hộ chiếu nhân tài', 'Kho chính có kiểm soát truy cập, mã hoá khi lưu. Một bản JSON xuất ra để ở nơi thứ hai, khác nhà cung cấp với kho chính.',
      'Trọn thời gian tham gia, cộng tới khi người học tròn 25 tuổi. Sau đó hỏi lại chính người ấy: giữ tiếp, nhận về, hay xoá.',
      'Chỉ Super Admin, và chỉ khi có yêu cầu xoá của gia đình hoặc của chính người học đã đủ tuổi. Mỗi lần xoá ghi nhật ký không xoá được.',
      'Ba tháng một lần'],

    ['Bảng số tuần chi hội', 'Kho chính, cùng chỗ với hộ chiếu vì hai bảng luôn đọc cùng nhau.',
      'Năm năm ở mức chi tiết. Sau đó gộp thành số tổng theo quý và bỏ dòng chi tiết.',
      'Không ai xoá dòng lẻ. Chỉ Admin hệ thống chạy được lệnh gộp theo lịch, và lệnh ấy ghi nhật ký.',
      'Sáu tháng một lần'],

    ['Minh chứng có hình ảnh trẻ', 'Kho riêng, tách khỏi kho vận hành, mã hoá khi lưu và khi truyền, mở theo từng mã học viên.',
      'Ba năm kể từ ngày nộp, hoặc tới khi gia đình rút đồng thuận — cái nào đến trước.',
      'Super Admin, và bộ phận hành chính khi gia đình rút đồng thuận. Xoá trong bảy ngày kể từ ngày nhận yêu cầu.',
      'Ba tháng một lần'],

    ['Phiếu chuyển tuyến', 'Kho riêng, tách hẳn, chỉ hai vai đọc được theo đúng bảng quyền hiện hành.',
      'Mười năm. Đây là hồ sơ có thể bị yêu cầu lại rất lâu sau.',
      'Không ai xoá, kể cả Super Admin, kể cả khi gia đình yêu cầu — trường hợp đó chuyển sang khoá đọc thay vì xoá, và ghi rõ lý do.',
      'Ba tháng một lần'],

    ['Nhật ký hệ', 'Kho chỉ ghi thêm, không sửa được từ bất kỳ giao diện quản trị nào.',
      'Bảy năm, ghi liên tục không đứt số.',
      'Không ai. Đây là bảng duy nhất trong hệ mà quyền xoá không tồn tại ở bất kỳ vai nào.',
      'Sáu tháng một lần'],

    ['Học liệu bản gốc sửa được', 'Kho học liệu, có phiên bản, mỗi tệp đi kèm hồ sơ giấy phép của mọi thứ đi mượn.',
      'Vĩnh viễn. Mất bản gốc là mất khả năng sửa, không lấy lại được bằng cách nào khác.',
      'Người phụ trách kho học liệu, và chỉ với bản nháp chưa từng phát hành.',
      'Sáu tháng một lần'],

    ['Học liệu bản phát hành', 'Kho phát hành, đọc được cho mọi vai có quyền dạy, không sửa được tại chỗ.',
      'Vĩnh viễn, kể cả bản đã ngừng dùng. Bản cũ đánh dấu ngừng dùng chứ không xoá.',
      'Không ai xoá. Chỉ đổi được trạng thái sang ngừng dùng, kèm lý do và tên người đổi.',
      'Sáu tháng một lần'],

    ['Ngân hàng câu hỏi', 'Kho riêng. Quyền đọc hẹp hơn kho học liệu: người dạy thấy câu mình được phép dùng, không thấy toàn bộ ngân hàng.',
      'Vĩnh viễn. Câu ngừng dùng vẫn giữ, để đọc lại được các bài đã chấm bằng câu ấy.',
      'Không ai. Câu sai thì đánh dấu ngừng dùng và ghi lý do.',
      'Sáu tháng một lần'],

    ['Đáp án và bảng chấm', 'Kho tách khỏi kho câu hỏi, quyền riêng, mở theo từng đợt kiểm tra.',
      'Vĩnh viễn, cùng vòng đời với câu hỏi tương ứng.',
      'Không ai. Sửa bảng chấm thì tạo bản mới và ghi bản cũ đã dùng cho những đợt nào.',
      'Sáu tháng một lần'],

    ['Bài làm và kết quả kiểm tra', 'Kho chính, gắn với mã học viên.',
      'Năm năm cho bài làm chi tiết. Điểm và kết luận đi vào hộ chiếu và theo vòng đời hộ chiếu.',
      'Super Admin theo yêu cầu xoá của gia đình. Xoá bài làm không xoá kết luận đã ghi trong hộ chiếu.',
      'Sáu tháng một lần'],

    ['Bản ghi buổi học trực tuyến', 'Kho có kiểm soát truy cập. Không đưa lên kênh công khai ở bất kỳ mức chia sẻ nào.',
      'Chín mươi ngày, trừ bản ghi buổi mẫu đã có đồng thuận riêng để dùng cho đào tạo.',
      'Người phụ trách dữ liệu chạy lệnh xoá theo lịch. Gia đình rút đồng thuận thì xoá trong bảy ngày, không chờ tới lịch.',
      'Ba tháng một lần'],

    ['Đồng thuận của gia đình', 'Bản ký giấy quét lại lưu ở kho riêng; bản gốc giấy cất trong tủ có khoá tại điểm nhận.',
      'Trọn thời hạn giữ dữ liệu mà tờ đồng thuận ấy cho phép, cộng thêm hai năm.',
      'Không ai xoá trong thời hạn trên. Đồng thuận đã rút thì đánh dấu đã rút, giữ nguyên tờ gốc.',
      'Ba tháng một lần'],

    ['Hồ sơ nhân sự và lý lịch tư pháp', 'Kho nhân sự, tách hẳn khỏi mọi kho học viên, quyền hẹp nhất trong hệ.',
      'Trọn thời gian làm việc, cộng thêm theo thời hạn của quy định lao động hiện hành.',
      'Chỉ người phụ trách nhân sự cấp cao nhất, và chỉ sau khi hết thời hạn trên.',
      'Sáu tháng một lần'],

    ['Bản dựng tĩnh đã phát hành', 'Kho bản dựng, mỗi bản một mã BD, giữ nguyên trạng, không sửa.',
      'Vĩnh viễn. Đây là bằng chứng thời điểm cho hồ sơ quyền tác giả.',
      'Không ai. Bản dựng sai thì phát bản mới và đánh dấu bản cũ là đã thay thế.',
      'Mười hai tháng một lần']
  ];

  /* ── 7 · Lộ trình hạ tầng ─────────────────────────────────
     Năm chặng, từ bản tĩnh hiện nay tới hệ có máy chủ. Lộ trình
     này nói riêng về hạ tầng học liệu và lớp học; lộ trình công
     nghệ chung của Học viện nằm ở kho khác, và hai bên phải khớp
     mốc với nhau ở chặng H3.

     Nguyên tắc xuyên suốt: KHÔNG mang dữ liệu thật của trẻ đi
     trước hạ tầng. Chặng nào chưa đủ điều kiện giữ dữ liệu trẻ
     thì chặng ấy không nhận dữ liệu trẻ, dù tiện tới đâu.       */
  G.HT_LO_TRINH = [
    { ma: 'H1', t: 'Bản tĩnh có kỷ luật', nam: '2026 – 2027', mau: '#185AB4',
      hoi: 'Hệ đã có mã cho mọi thứ, và đã ngừng để dữ liệu thật lọt vào bản dựng chưa?',
      lam: ['Áp hệ mã cho mười tám loại đối tượng, đặt lại tên tệp trong kho theo mã',
            'Rà toàn bộ bản dựng hiện có, gỡ mọi ví dụ lấy từ hồ sơ người thật',
            'Lập sổ học liệu: mỗi món một dòng, có mã, có hạn rà lại, có người chịu trách nhiệm',
            'Bộ kiểm phát hành thêm một phép: chặn bản dựng chứa dữ liệu trông như dữ liệu người thật'],
      dich: ['Sổ học liệu có mã cho mọi món đang dùng', 'Bản dựng sạch dữ liệu trẻ em', 'Bộ kiểm có phép chặn dữ liệu thật'],
      cong: 'Ba lần phát hành liên tiếp không phát hiện dữ liệu thật, và mọi học liệu đang dùng đều có mã kèm hạn rà lại',
      rui: 'Gán mã cho có rồi không ai tra. Phanh: bộ kiểm chặn phát hành học liệu không có mã, ngay từ lần phát hành đầu tiên của chặng.' },

    { ma: 'H2', t: 'Kho học liệu và ngân hàng câu hỏi chạy được', nam: '2027 – 2028', mau: '#0B7350',
      hoi: 'Một giáo viên mới ở một điểm mới có tự tìm ra và dùng đúng học liệu không?',
      lam: ['Dựng kho học liệu tra được theo mã chuyên đề, theo khối và theo loại',
            'Đưa quy trình mười bước vào vận hành thật, không bước nào được bỏ',
            'Ra đề cho hai mươi chuyên đề đầu tiên, mỗi chuyên đề ít nhất hai mươi câu, trải đủ các loại',
            'Tập huấn người ra đề, và chấm thử chéo để đo độ lệch giữa hai người chấm'],
      dich: ['Kho học liệu tra được', 'Bốn trăm câu hỏi đã thử với học sinh thật', 'Mười người ra đề đã tập huấn'],
      cong: 'Hai người chấm độc lập cùng một bài lệch không quá một mức, ở tám trên mười bài',
      rui: 'Ngân hàng phình nhanh bằng câu chưa thử. Phanh: câu chưa thử với ít nhất ba mươi học viên thì để ở trạng thái chờ, không cho rút vào đề chính thức.' },

    { ma: 'H3', t: 'Máy chủ tối thiểu cho hồ sơ', nam: '2028 – 2030', mau: '#A8801F',
      hoi: 'Hệ đã đủ điều kiện để giữ dữ liệu thật của một đứa trẻ chưa?',
      lam: ['Dựng máy chủ theo đúng hợp đồng tối thiểu đã ghi ở G.DN_MAY_CHU, không rút gọn mục nào',
            'Thay hẳn cổng đăng nhập tĩnh, không giữ song song hai cổng',
            'Chuyển hộ chiếu và bảng số tuần lên máy chủ, giữ đường xuất JSON và PDF chạy từ ngày đầu',
            'Chạy thật quy trình xoá theo yêu cầu gia đình một lần, có biên bản, trước khi nhận hồ sơ thứ nhất'],
      dich: ['Máy chủ có xác thực thật', 'Đường xuất dữ liệu chạy được', 'Biên bản thử quy trình xoá'],
      cong: 'Thử phục hồi toàn bộ từ bản sao lưu thành công, có biên bản ghi mất bao lâu và mất bao nhiêu dữ liệu',
      rui: 'Đưa dữ liệu trẻ lên trước khi quy trình xoá chạy được. Phanh: không nhận hồ sơ thật cho tới khi có cả biên bản thử xoá lẫn biên bản thử phục hồi.' },

    { ma: 'H4', t: 'Lớp trực tuyến và chấm trên máy', nam: '2030 – 2033', mau: '#9E470D',
      hoi: 'Một em ở vùng xa có học được cùng chuẩn với một em ở thành phố không?',
      lam: ['Mở lớp trực tuyến theo đúng mười hai mục ranh giới ở kho này, không mở rộng thêm',
            'Đưa bài kiểm tra lên máy: giữ được bài dở khi mất mạng, và luôn có bản in tương đương',
            'Chạy thử ở ba điểm có đường truyền yếu trước khi mở toàn hệ',
            'Đo khoảng cách kết quả giữa nhóm học trực tiếp và nhóm học trực tuyến, công bố cả khi khoảng cách xấu'],
      dich: ['Lớp trực tuyến có quy chế an toàn', 'Bài kiểm tra chạy được trên máy', 'Số liệu so sánh hai hình thức'],
      cong: 'Khoảng cách kết quả giữa hai hình thức không mở rộng qua ba chu kỳ đo liên tiếp',
      rui: 'Trực tuyến rẻ hơn nên bị dùng để thay trực tiếp ở cả chỗ không thay được. Phanh: danh sách những thứ không dạy trực tuyến được là luật, không phải khuyến nghị.' },

    { ma: 'H5', t: 'Mở cho điểm nhượng quyền', nam: '2033 – 2040', mau: '#5140B4',
      hoi: 'Một điểm mới nhận hệ này có chạy đúng chuẩn mà không cần người từ Học viện sang không?',
      lam: ['Mở kho học liệu và ngân hàng câu hỏi cho điểm nhượng quyền theo đúng phạm vi hợp đồng',
            'Dựng đường xuất chuẩn để điểm nhượng quyền lấy dữ liệu của mình về, và lấy trọn khi hết hợp đồng',
            'Kiểm định hai lần một năm bằng chính số liệu hệ ghi, không bằng báo cáo tự khai',
            'Công bố công khai danh sách điểm được uỷ quyền và trạng thái kiểm định của từng điểm'],
      dich: ['Kho mở theo phạm vi hợp đồng', 'Đường xuất dữ liệu cho điểm nhượng quyền', 'Kết quả kiểm định công khai'],
      cong: 'Một điểm nhượng quyền chạy trọn một năm đạt chuẩn kiểm định mà không cần người của Học viện có mặt thường xuyên',
      rui: 'Mở kho rộng rồi mất kiểm soát chất lượng nội dung tại điểm. Phanh: điểm nhượng quyền dùng được kho nhưng không sửa được kho; muốn sửa thì đề nghị về Hội đồng Chuyên môn.' }
  ];

  /* ── 8 · Luật hạ tầng và học liệu ─────────────────────────
     Mười tám điều. Điều nào cũng kèm sẵn một cách vi phạm cụ
     thể — luật không mô tả được cách vi phạm thì không phải
     luật, chỉ là một lời khuyên dài.                            */
  G.HT_LUAT = [
    'Không đưa dữ liệu thật của trẻ vào bản dựng tĩnh, ở bất kỳ vai nào, kể cả để trình diễn một buổi duy nhất. Cần ví dụ thì dựng dữ liệu giả và ghi rõ là giả ngay trên màn.',
    'Học liệu chưa thử với học sinh thật thì chưa phát. Thử với đồng nghiệp chỉ cho biết nó dễ hiểu với người lớn đã biết trước nội dung — một câu hỏi hoàn toàn khác.',
    'Không dùng công cụ miễn phí không rõ nơi lưu dữ liệu cho hồ sơ trẻ em, cho bài làm, cho ảnh hay cho bản ghi. Không biết dữ liệu nằm ở đâu thì mặc định coi là nằm ở chỗ mình không kiểm soát được.',
    'Mọi học liệu có hạn rà lại ghi ngay trong hồ sơ tệp. Hết hạn mà chưa rà thì hệ tự đánh dấu ngừng dùng. Không có trạng thái *chờ rà*, vì trạng thái ấy kéo dài mãi.',
    'Mã đã sinh thì không sửa. Sai thì cấp mã mới và nối hai mã bằng một bản ghi, để người đọc năm sau vẫn lần được.',
    'Số bản nhích mỗi lần ruột đổi, dù chỉ đổi một chữ. Hai tệp khác nhau mang cùng số bản là một cách nói dối không cố ý với chính người dạy.',
    'Bản gốc sửa được phải lưu cạnh bản phát hành. Chỉ còn bản đã đóng gói thì năm sau muốn sửa một dòng cũng phải làm lại từ đầu.',
    'Không nung phụ đề vào hình. Phụ đề để rời thì sửa được, dịch được và máy đọc được; nung vào hình thì mất cả ba.',
    'Không nhét vào mã bất cứ thứ gì đổi được: gói hợp đồng, trạng thái, vùng hiện tại, tên gọi. Mã ghi thời điểm sinh ra, không ghi tình trạng hôm nay.',
    'Câu hỏi đã dùng để chấm thì đóng băng. Muốn sửa thì cấp mã mới và đánh dấu câu cũ ngừng dùng — sửa tại chỗ là làm hỏng mọi kết quả đã chấm bằng câu ấy.',
    'Không ra đề mới tại chỗ cho cổng nghiệm thu. Đề cổng rút từ ngân hàng, gồm câu đã thử, đã có bảng chấm, đã đo độ lệch giữa hai người chấm.',
    'Đề và đáp án lưu ở hai kho, quyền khác nhau. Người dạy lớp nào không giữ đáp án của đợt kiểm tra lớp ấy.',
    'Không quay, không chụp, không ghi âm trẻ khi chưa có đồng thuận bằng văn bản của người giám hộ. Gia đình rút đồng thuận thì gỡ và xoá trong bảy ngày, không hỏi lý do.',
    'Không có buổi trực tuyến một người lớn với một trẻ trong phòng kín. Luôn có người thứ ba trong phòng: một người lớn khác của Học viện, hoặc người giám hộ của em.',
    'Giáo viên và Coach không kết bạn, không nhắn riêng với học sinh trên tài khoản cá nhân. Mọi liên lạc đi qua kênh chính thức, nơi có người thứ ba đọc được — điều này bảo vệ người lớn không kém gì bảo vệ đứa trẻ.',
    'Mỗi lần thử phục hồi phải có biên bản ghi hai con số: mất bao lâu để hệ chạy lại, và mất dữ liệu của khoảng thời gian nào. Hai con số ấy là thứ được phép hứa với gia đình; ngoài chúng ra là cảm giác.',
    'Thời hạn giữ mỗi loại dữ liệu phải công bố TRƯỚC khi thu, ngay trên biểu mẫu thu. Quyết thời hạn sau khi đã cầm dữ liệu trong tay là quyết cho tiện mình.',
    'Học liệu đi mượn — ảnh, nhạc, phông chữ, bài đọc — phải lưu giấy phép cùng tệp. Không tìm thấy giấy phép thì coi như không có quyền dùng và gỡ khỏi kho, kể cả khi món ấy đã dùng nhiều năm.'
  ];

})(window.GV = window.GV || {});
