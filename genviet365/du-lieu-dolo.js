/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · KHO ĐO LƯỜNG VÀ BÁO CÁO

   BIÊN SOẠN MỚI — chưa có trong kho gốc ở mức chi tiết. Dựng theo
   ba tầng bằng chứng đã có. Cần Hội đồng Chuyên môn duyệt.

   Kho này lấp một mâu thuẫn của chính hệ: hệ mang khẩu hiệu “không
   có bằng chứng thì không có điểm”, nhưng phần đo lường lại là phần
   mỏng nhất — bốn màn cộng lại chưa bằng một màn trung bình. Ở đây
   viết ra bộ báo cáo, bộ chỉ số, biểu mẫu đo, nhịp đo cả năm, và
   một phần hiếm ai chịu viết: cách một con số bị làm hỏng.

   Hai nguyên lý không được vi phạm ở bất kỳ dòng nào phía dưới:
   nâng theo bằng chứng chứ không theo thời gian; và bằng chứng
   tầng ba là bằng chứng do người ngoài hệ xác nhận — người không
   trả tiền cho hệ và không nhận tiền từ hệ.

   Ngưỡng trong kho này là ngưỡng thiết kế, không phải số đo thực
   tế. Chưa có kỳ đo nào của hệ được dùng làm căn cứ ở đây.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Bộ báo cáo của hệ ────────────────────────────────
     Ba mươi lăm báo cáo. Mỗi dòng trả lời đủ bảy câu: mã, tên, ai làm,
     gửi cho ai, nhịp, số lấy từ đâu, và quyết định nào treo vào nó.
     Cột cuối là cột quan trọng nhất. Báo cáo không dẫn tới một
     quyết định có tên thì đó là việc giấy tờ, bỏ đi được.        */
  G.DL_BAO_CAO = [
    ['Mã', 'Báo cáo', 'Ai làm', 'Gửi cho ai', 'Nhịp', 'Dữ liệu lấy từ đâu', 'Quyết định dựa trên nó'],

    ['BC-W1', 'Báo cáo buổi sinh hoạt tuần', 'Thư ký chi hội', 'Toàn chi hội và phụ huynh', 'Trong 24 giờ sau buổi',
      'Sổ check-in · timeline buổi · biên bản buổi · phiếu phản hồi cuối buổi',
      'Ai vào danh sách ĐỎ tuần này và ai là người gọi trong 48 giờ'],
    ['BC-W2', 'Bảng băng màu tuần', 'Coach đang kèm', 'Quản lý chuyên môn', 'Sáng thứ Hai hằng tuần',
      'Bảng số bảy cột từng người · bảng ba màu 90 ngày',
      'Chia lại giờ kèm trong tuần: ai được thêm giờ, ai giảm mức hỗ trợ'],
    ['BC-W3', 'Báo cáo cam kết tuần trước', 'Ban phụ trách rèn nếp', 'Trưởng các ban', 'Trước buổi kế tiếp 24 giờ',
      'Phiếu cam kết cuối buổi · sổ theo dõi cam kết · minh chứng hành vi',
      'Mở chuyên đề mới hay phải chạy lại chuyên đề cũ'],
    ['BC-W4', 'Nhật ký đứt nhịp tuần', 'Coach đang kèm', 'Quản lý chuyên môn', 'Chiều thứ Sáu hằng tuần',
      'Sổ đứt nhịp và phục hồi · bảng ba màu 90 ngày',
      'Ai cần một cuộc gọi phục hồi trước cuối tuần'],

    ['BC-M1', 'Thư tháng gửi gia đình', 'Coach đang kèm', 'Gia đình từng học viên', 'Ngày 5 tháng sau',
      'Hồ sơ học viên · bảng ba màu · sổ việc đã nhận · bảng tuần của gia đình',
      'Một việc gia đình đổi trong tháng tới; mức hỗ trợ tăng hay giảm'],
    ['BC-M2', 'Báo cáo chất lượng buổi', 'Quản lý chuyên môn', 'Giám đốc điều hành', 'Ngày 5 hằng tháng',
      'Phiếu dự giờ · timeline từng buổi · phiếu phản hồi cuối buổi',
      'Coach nào vào kèm cặp bốn tuần; chuyên đề nào phải viết lại'],
    ['BC-M3', 'Báo cáo giữ người', 'Ban phụ trách gắn kết', 'Chủ nhiệm chi hội', 'Ngày 3 hằng tháng',
      'Sổ điểm danh · phiếu phỏng vấn khi rời · danh sách vắng kéo dài',
      'Có tạm dừng nhận người mới để sửa trải nghiệm hay không'],
    ['BC-M4', 'Báo cáo nhân sự và tải việc', 'Bộ phận hành chính', 'Giám đốc điều hành', 'Ngày 5 hằng tháng',
      'Bảng phân công · số ca kèm từng Coach · hồ sơ nhân sự và hạn lý lịch tư pháp',
      'Ai đang quá tải; ai thiếu giấy tờ phải tạm dừng đứng lớp ngay'],
    ['BC-M5', 'Báo cáo sổ phàn nàn', 'Giám đốc điều hành', 'Hội đồng Chuyên môn', 'Ngày 10 hằng tháng',
      'Sổ phàn nàn: ngày mở, ngày đóng, việc đã đổi',
      'Ca nào quá 14 ngày phải nêu tên người chịu trách nhiệm trong họp tháng'],
    ['BC-M6', 'Báo cáo tài chính tháng của chi hội', 'Ban tài chính chi hội', 'Chủ nhiệm chi hội và Ban Cố Vấn', 'Ngày 5 hằng tháng',
      'Sổ thu chi từng hoạt động · chứng từ gốc · biên bản kiểm quỹ',
      'Duyệt chi tháng sau; dừng khoản nào chưa có chứng từ'],

    ['BC-Q1', 'Báo cáo nghiệm thu quý', 'Chuyên gia đánh giá', 'Quản lý chuyên môn và gia đình', 'Trong 7 ngày sau kỳ chấm',
      'Biên bản chấm từng người · điểm sáu cột · hồ sơ bằng chứng đính kèm',
      'Ai lên bậc; ai chưa đủ bằng chứng và thiếu ở cột nào'],
    ['BC-Q2', 'Báo cáo chấm chéo liên chi hội', 'Coach vùng', 'Hội đồng Chuyên môn', 'Tuần cuối quý',
      'Phiếu chấm chéo cùng một cổng ở hai chi hội',
      'Chuẩn có đang loãng không; chi hội nào phải chấm lại cả kỳ'],
    ['BC-Q3', 'Rà nhật ký truy cập dữ liệu', 'Bộ phận hành chính', 'Giám đốc điều hành', 'Tuần cuối quý',
      'Nhật ký mở hồ sơ học viên · lý do từng lần xem ngoài ca kèm',
      'Thu quyền xem của ai; lần xem nào phải giải trình bằng văn bản'],
    ['BC-Q4', 'Rà mẫu hồ sơ bằng chứng', 'Chuyên gia đánh giá', 'Hội đồng Chuyên môn', 'Tuần cuối quý',
      'Hai mươi phần trăm hồ sơ bốc ngẫu nhiên · phiếu kiểm mẫu',
      'Trên 5% dòng thiếu bằng chứng thì rà 100% và tạm dừng cấp bậc ở chi hội đó'],
    ['BC-Q5', 'Báo cáo dự án và tác động', 'Nhóm dự án và quản lý chuyên môn', 'Ban Cố Vấn', 'Cuối mỗi quý',
      'Hồ sơ dự án · biên bản nghiệm thu có chữ ký người thụ hưởng',
      'Dự án nào được ghi là bằng chứng tầng ba; dự án nào chỉ là hoạt động'],

    ['BC-Y1', 'Báo cáo năm toàn hệ', 'Bộ phận phân tích dữ liệu', 'Hội đồng Chuyên môn và công bố nội bộ', 'Trước đại hội 30 ngày',
      'Toàn bộ chỉ số năm, mỗi số ghi rõ tầng bằng chứng và ngày đo',
      'Chỉ tiêu năm sau; vùng nào dừng mở rộng để siết chuẩn'],
    ['BC-Y2', 'Báo cáo ngoại kiểm thường niên', 'Hội đồng ngoài: một chuyên gia giáo dục, một chuyên gia bảo vệ trẻ em, hai phụ huynh đại diện', 'Hội đồng Chuyên môn; công bố nội bộ nguyên văn', 'Một lần mỗi năm',
      'Quan sát trực tiếp · hồ sơ · phỏng vấn học viên, phụ huynh và Coach',
      'Kế hoạch xử lý từng khuyến nghị trong 30 ngày, kèm tên người chịu trách nhiệm'],
    ['BC-Y3', 'Báo cáo sổ lỗi cả năm', 'Giám đốc điều hành', 'Toàn hệ', 'Tháng cuối năm',
      'Sổ ghi lỗi công khai · biên bản khắc phục',
      'Lỗi nào đã đóng; lỗi nào lặp lần hai và phải đổi quy trình, không đổi người'],
    ['BC-Y4', 'Đối chiếu định nghĩa chỉ số', 'Bộ phận phân tích dữ liệu', 'Hội đồng Chuyên môn', 'Tháng đầu năm',
      'Bảng định nghĩa chỉ số năm trước · các đề nghị sửa',
      'Chốt định nghĩa cho cả năm; nếu sửa thì tính lại cả dãy số cũ theo định nghĩa mới'],

    ['BC-G1', 'Bản đọc ca đầu vào', 'Người đánh giá đầu vào, không phải người sẽ dạy', 'Gia đình', 'Cuối tuần thử',
      'Bộ test đầu vào · tám chỉ số ngoài hệ đo trong tuần thử',
      'Nhận hay chưa nhận; nếu nhận thì mũi nhọn nào làm trước'],
    ['BC-G2', 'Báo cáo cuối chu kỳ 90 ngày', 'Coach đang kèm', 'Gia đình và học viên', 'Trong 7 ngày sau cổng nghiệm thu',
      'Toàn bộ hồ sơ bằng chứng của chu kỳ · biên bản chấm',
      'Mục tiêu chu kỳ sau; mức hỗ trợ mới; có đổi Coach hay không'],
    ['BC-G3', 'Hồ sơ bàn giao khi rời hệ', 'Bộ phận hành chính', 'Gia đình', 'Trong 7 ngày kể từ ngày rời',
      'Toàn bộ dữ liệu của học viên · danh mục nơi dữ liệu đang được lưu',
      'Gia đình chọn giữ hồ sơ bằng chứng hay xoá; ngày xoá đặt lịch ngay tại chỗ'],

    ['BC-N1', 'Phiếu quan sát của giáo viên chủ nhiệm', 'Đại diện Học viện phát và thu trực tiếp', 'Quản lý chuyên môn', 'Đầu và cuối năm học',
      'Ba câu hỏi cố định, giáo viên ký, phiếu không đi qua tay phụ huynh',
      'Bằng chứng tầng ba: hệ có tác động ở nơi hệ không có mặt hay không'],
    ['BC-N2', 'Báo cáo học kỳ gửi ban giám hiệu', 'Chủ nhiệm chi hội trường', 'Ban giám hiệu nhà trường', 'Cuối mỗi học kỳ',
      'Sổ điểm danh · hồ sơ dự án · biên bản sự cố nếu có',
      'Nhà trường có tiếp tục cấp phòng và giờ sinh hoạt cho kỳ sau hay không'],

    ['BC-H1', 'Hồ sơ trình Hội đồng Chuyên môn', 'Quản lý chuyên môn', 'Hội đồng Chuyên môn', 'Trước mỗi phiên họp 7 ngày',
      'Bản thảo chuẩn · giáo án mới · kho dữ liệu mới biên soạn · ý kiến phản biện đã thu',
      'Duyệt, duyệt có điều kiện, hay trả lại kèm lý do bằng văn bản'],
    ['BC-H2', 'Báo cáo khiếu nại và thu hồi danh hiệu', 'Bộ phận hành chính', 'Hội đồng Chuyên môn', 'Khi phát sinh và tổng hợp cuối năm',
      'Trang thu hồi và khiếu nại trong hồ sơ học viên · biên bản đối chất',
      'Giữ, thu hồi, hay phục hồi danh hiệu; công bố lại nếu đã công bố sai'],

    ['BC-F1', 'Báo cáo quý của bên nhận nhượng quyền', 'Bên nhận nhượng quyền', 'Bên nhượng quyền', 'Trong 10 ngày sau cuối quý',
      'Sổ điểm danh · hồ sơ nghiệm thu · sổ thu chi tại địa bàn',
      'Gia hạn, cảnh cáo, hay khởi động thủ tục thu hồi quyền'],
    ['BC-F2', 'Báo cáo kiểm định hiện trường', 'Đoàn kiểm định của bên nhượng quyền', 'Hội đồng Chuyên môn và bên nhận nhượng quyền', 'Trong 14 ngày sau đợt kiểm',
      'Biên bản dự giờ · rà hồ sơ tại chỗ · phỏng vấn phụ huynh tại địa bàn',
      'Mức chế tài theo hợp đồng; có được mở thêm điểm mới hay không'],

    ['BC-S1', 'Biên bản sự cố an toàn', 'Người phụ trách an toàn', 'Giám đốc điều hành và gia đình liên quan', 'Trong 24 giờ',
      'Lời kể của từng người có mặt, ghi riêng · ảnh hiện trường · sổ y tế',
      'Có dừng toàn bộ hoạt động cùng loại cho tới khi rà xong hay không'],
    ['BC-S2', 'Báo cáo vi phạm luật đỏ bảo vệ trẻ em', 'Giám đốc điều hành', 'Hội đồng Chuyên môn', 'Trong ngày phát hiện',
      'Nguồn tin · biên bản đình chỉ · hồ sơ nhân sự người liên quan',
      'Đình chỉ trước, điều tra sau; chuyển tuyến theo quy trình, không hoà giải nội bộ'],
    ['BC-S3', 'Báo cáo rò rỉ dữ liệu', 'Bộ phận hành chính', 'Gia đình bị ảnh hưởng và Giám đốc điều hành', 'Trong 72 giờ kể từ khi biết',
      'Nhật ký truy cập · bản ghi hệ thống · danh mục dữ liệu bị lộ',
      'Báo cho những ai; khoá quyền truy cập nào; đổi cách lưu ra sao'],
    ['BC-S4', 'Báo cáo sau khủng hoảng công khai', 'Người đứng đầu', 'Toàn hệ và các bên liên quan', 'Trong 14 ngày sau khi việc khép lại',
      'Dòng thời gian sự việc · toàn bộ phát ngôn đã đưa · phản hồi đã nhận',
      'Điều gì đổi trong quy trình; ai được ghi nhận đã sửa; điều gì hệ nhận là sai'],

    ['BC-TC1', 'Báo cáo học phí và diện hỗ trợ', 'Bộ phận hành chính', 'Giám đốc điều hành', 'Ngày 10 hằng tháng',
      'Danh sách đã đóng, miễn, chậm · hồ sơ xét diện hỗ trợ',
      'Gia đình nào chuyển sang diện hỗ trợ. Không nêu tên ai trong buổi sinh hoạt'],
    ['BC-TC2', 'Quyết toán một sự kiện', 'Ban tài chính chi hội', 'Chủ nhiệm chi hội và Ban Cố Vấn', 'Trong 15 ngày sau sự kiện',
      'Dự toán · chứng từ · danh sách tài trợ và điều kiện kèm theo',
      'Có tổ chức lại sự kiện đó không, ở quy mô nào, giữ nhà tài trợ nào'],
    ['BC-TC3', 'Báo cáo tài chính năm có soát xét', 'Kế toán của Học viện', 'Hội đồng Chuyên môn', 'Trước đại hội 30 ngày',
      'Sổ cả năm · biên bản kiểm quỹ · kết luận soát xét độc lập',
      'Duyệt ngân sách năm sau; trần chi cho mỗi đầu học viên']
  ];

  /* ── 2 · Một trang báo cáo mẫu ────────────────────────────
     Cấu trúc này áp cho mọi báo cáo trong bảng trên, dài ngắn
     khác nhau nhưng thứ tự mục không đổi. Thứ tự là phần quan
     trọng: chỗ hỏng nằm trước chỗ tốt, và mục cuối cùng là mục
     nói ra cái mình chưa biết.                                  */
  G.DL_MAU_BAO_CAO = [
    { m: 'M1', t: 'Đầu trang — báo cáo này là của ai, cho ai',
      v: ['Mã báo cáo theo bảng bộ báo cáo, ví dụ BC-M2.',
          'Kỳ báo cáo: từ ngày nào tới ngày nào. Không ghi “tháng vừa rồi”.',
          'Người làm — một tên người, không phải một ban.',
          'Người nhận — một tên người hoặc một hội đồng có tên.',
          'Ngày gửi và hạn phải gửi. Gửi muộn thì ghi luôn số ngày muộn, không giải thích ở đây.',
          'Toàn bộ báo cáo gói trong một trang. Phần dài đưa xuống phụ lục.'] },

    { m: 'M2', t: 'Ba con số đứng đầu',
      v: ['Chọn đúng ba chỉ số, không nhiều hơn. Ba chỉ số này cố định cả năm.',
          'Mỗi số viết thành bộ bốn: số kỳ này · số kỳ trước · ngưỡng · tầng bằng chứng.',
          'Ghi cả mẫu số. “85%” không đọc được; “85% — 34 trên 40 người” thì đọc được.',
          'Số nào chưa đo được thì để trống và ghi lý do trống. Không ước lượng cho đủ ô.'] },

    { m: 'M3', t: 'Đã hứa gì kỳ trước, đã làm được gì',
      v: ['Chép nguyên các việc đã cam kết ở báo cáo kỳ trước, không diễn đạt lại.',
          'Mỗi việc đánh một trong ba trạng thái: xong · đang làm · chưa làm.',
          'Việc chưa làm ghi rõ vướng ở đâu và ai gỡ được.',
          'Không có mục này thì báo cáo trở thành một chuỗi lời hứa không ai đối chiếu.'] },

    { m: 'M4', t: 'Chỗ đang hỏng — viết trước chỗ đang tốt',
      v: ['Ba chỗ hỏng nặng nhất, mỗi chỗ ba dòng: hiện tượng · số liệu kèm theo · ai đang xử.',
          'Viết bằng sự việc, không viết bằng tính từ. “Bốn buổi lệch trên 20 phút” chứ không phải “timeline chưa tốt”.',
          'Chỗ hỏng do chính người làm báo cáo gây ra thì ghi trước tiên.',
          'Chỗ tốt viết sau, ngắn hơn, và cũng phải có số.'] },

    { m: 'M5', t: 'Bằng chứng đính kèm',
      v: ['Liệt kê từng nguồn: tên biểu mẫu, mã, số bản, ngày thu.',
          'Mỗi con số ở mục M2 phải trỏ được về một dòng trong danh mục này.',
          'Ghi rõ số nào là tự thuật (tầng một), số nào do người ngoài hệ xác nhận (tầng ba).',
          'Bằng chứng chưa thu đủ thì ghi “thu 12 trên 20 phiếu” chứ không lấy 12 phiếu nói thay cho 20.'] },

    { m: 'M6', t: 'Quyết định đang xin người nhận đưa ra',
      v: ['Mỗi quyết định viết thành một câu có động từ: duyệt, dừng, đổi người, cấp thêm giờ kèm.',
          'Kèm phương án và hệ quả của từng phương án, không chỉ nêu vấn đề.',
          'Ghi ai là người có thẩm quyền quyết và hạn cần quyết.',
          'Báo cáo không xin quyết định nào thì phải nói rõ đây là báo cáo để biết.'] },

    { m: 'M7', t: 'Chỗ chưa biết và giới hạn của số liệu',
      v: ['Nêu thẳng mẫu nhỏ, thiếu phiếu, hoặc kỳ đo bị lệch.',
          'Nêu chỉ số nào có thể đang bị đo sai và vì sao nghi ngờ.',
          'Nêu điều gì sẽ làm đảo ngược kết luận nếu biết thêm.',
          'Mục này để trống là dấu hiệu người viết chưa kiểm số của mình.'] },

    { m: 'M8', t: 'Ký, lưu, và đính chính',
      v: ['Người làm ký. Người duyệt ký nếu báo cáo cần duyệt.',
          'Lưu một bản không sửa được. Bản gửi đi và bản lưu phải trùng nhau.',
          'Phát hiện sai sau khi gửi thì ra bản đính chính riêng: số cũ, số mới, vì sao sai.',
          'Không sửa lặng lẽ vào bản đã gửi. Sửa lặng lẽ là lỗi nặng hơn con số sai.'] }
  ];

  /* ── 3 · Bộ chỉ số ────────────────────────────────────────
     Bốn mươi tám chỉ số, tám nhóm. Cột cuối — “đọc sai thế nào” —
     là cột giữ cho bảng này không thành một bảng thi đua. Gần như
     mọi chỉ số ở đây đều có một cách làm đẹp mà không cần làm tốt,
     nên cách làm đẹp ấy được viết ra ngay cạnh chỉ số.

     Ngưỡng là ngưỡng thiết kế, đặt trước khi đo. Muốn đổi ngưỡng
     thì đổi từ kỳ sau, không đổi khi đã nhìn thấy số.            */
  G.DL_CHI_SO = [
    ['Nhóm', 'Chỉ số', 'Công thức tính', 'Ngưỡng tốt', 'Ngưỡng báo động', 'Đọc sai thế nào'],

    ['Người học', 'Tỷ lệ có bằng chứng tầng ba',
      'Số học viên có ít nhất một bằng chứng do người ngoài hệ ký trong 12 tháng, chia cho tổng học viên đang học',
      '≥ 60%', '< 30%',
      'Đếm cả phiếu do phụ huynh ký là tự nâng mình lên tầng ba. Phụ huynh là người trả tiền, không phải người ngoài hệ'],
    ['Người học', 'Số bằng chứng tầng ba trung bình mỗi hồ sơ',
      'Tổng bằng chứng tầng ba chia cho số học viên đang học',
      '≥ 2 bằng chứng mỗi năm', '< 1 bằng chứng mỗi năm',
      'Vài hồ sơ rất dày kéo trung bình lên. Luôn đọc kèm trung vị và số hồ sơ trắng'],
    ['Người học', 'Tỷ lệ qua cổng nghiệm thu ngay lần đầu',
      'Số người đạt từ 85 điểm ở lần chấm đầu, chia cho số người dự chấm',
      '55–75%', 'Trên 90% hoặc dưới 30%',
      'Tỷ lệ quá cao thường không phải dạy giỏi, mà là chấm nhẹ hoặc chỉ cho người chắc đạt đi thi'],
    ['Người học', 'Thời gian trung vị giữa hai bậc',
      'Trung vị số ngày từ ngày đạt một bậc tới ngày đạt bậc kế tiếp',
      'Không đặt ngưỡng; chỉ theo dõi xu hướng', 'Rút ngắn đột ngột trên 30% trong một quý',
      'Rút ngắn không mặc nhiên là tin tốt. Hệ nâng theo bằng chứng, không theo thời gian — rút ngắn nhanh thường là tiêu chí đang bị hạ'],
    ['Người học', 'Tỷ lệ giữ nhịp trong chu kỳ 90 ngày',
      'Số ô xanh chia cho tổng số ô trong bảng ba màu, tính trên toàn chi hội',
      '≥ 70%', '< 45%',
      'Học viên tự ghi. Coach không đối chiếu bằng chứng thì đây là số tự khai, đọc như bằng chứng tầng một'],
    ['Người học', 'Tỷ lệ quay lại sau đứt nhịp',
      'Số lần quay lại trong vòng 14 ngày chia cho số lần đứt nhịp',
      '≥ 60%', '< 30%',
      'Đứt nhịp ít không đồng nghĩa với tốt. Thường là không ai ghi sổ, hoặc ghi sổ đang bị phạt'],
    ['Người học', 'Tỷ lệ hồ sơ có sổ lỗi được ghi',
      'Số hồ sơ có ít nhất một lỗi tự ghi trong quý, chia cho tổng hồ sơ',
      '≥ 70%', '< 40%',
      'Sổ lỗi trống là dấu hiệu xấu chứ không phải hồ sơ sạch. Nó nói rằng nói ra lỗi đang tốn kém'],

    ['Giữ người', 'Giữ chân sau 6 tháng',
      'Số người còn sinh hoạt sau 6 tháng chia cho số người vào cùng đợt',
      '≥ 85%', '< 70%',
      'Phải tính theo từng đợt vào. Trộn các đợt sẽ giấu trọn một đợt hỏng'],
    ['Giữ người', 'Giữ chân sau 5 năm',
      'Số người vào ở bậc 1 còn trong hệ ở năm thứ năm, chia cho số người của chính đợt ấy',
      '≥ 30%', '< 15%',
      'Chỉ đọc được sau đủ năm năm. Mọi con số công bố sớm hơn là ước tính và phải ghi rõ là ước tính'],
    ['Giữ người', 'Tỷ lệ rời hệ vì cảm giác bị bỏ rơi',
      'Số ca rời có lý do cảm xúc ghi trong phiếu phỏng vấn rời, chia cho tổng số ca rời',
      '0 ca', 'Từ 1 ca trở lên',
      'Người rời hay nói lý do lịch học cho lịch sự. Phải có người thứ ba hỏi lại sau 30 ngày mới ra lý do thật'],
    ['Giữ người', 'Tỷ lệ ca rời có phỏng vấn',
      'Số ca rời có biên bản phỏng vấn chia cho tổng số ca rời',
      '≥ 90%', '< 60%',
      'Thiếu phỏng vấn thì mọi phân tích lý do rời chỉ dựa trên người còn ở lại. Mẫu đã lệch từ gốc'],
    ['Giữ người', 'Vắng mặt kéo dài không ai gọi',
      'Số người vắng từ ba buổi liên tiếp mà chưa có ai liên hệ, chia cho tổng thành viên',
      '0', '≥ 5%',
      'Đếm theo người, không theo lượt vắng. Một người vắng sáu buổi khác hẳn sáu người vắng một buổi'],
    ['Giữ người', 'Tỷ lệ hồ sơ được cập nhật trong tháng',
      'Số hồ sơ có ít nhất một dòng mới trong tháng, chia cho tổng hồ sơ đang mở',
      '≥ 80%', '< 60%',
      'Cập nhật không phải là có bằng chứng. Đếm riêng số dòng có chữ ký người ngoài hệ'],

    ['Chất lượng buổi', 'Độ lệch timeline cả buổi',
      'Số phút chênh giữa giờ kết thúc thực tế và giờ trên timeline đã gửi',
      '≤ 10 phút', 'Trên 20 phút mà không giải thích được',
      'Đúng giờ nhờ cắt phần thực hành là lệch 0 phút mà hỏng buổi. Luôn đọc kèm thời lượng phần thực hành thực tế'],
    ['Chất lượng buổi', 'Tỷ lệ người có phát biểu thật',
      'Số người phát biểu ít nhất một lượt có nội dung, chia cho số người có mặt',
      '≥ 80%', '< 50%',
      'Đếm cả câu trả lời đồng thanh là làm đẹp số. Chỉ đếm lượt nói riêng, có nội dung riêng'],
    ['Chất lượng buổi', 'Điểm dự giờ của Coach',
      'Điểm rubric dự giờ, thang 20',
      '≥ 16', 'Dưới 13, hoặc hai lần liên tiếp dưới ngưỡng',
      'Buổi có báo trước luôn cho điểm cao hơn. Mỗi Coach phải có ít nhất một lần dự đột xuất mỗi quý, nếu không cả dãy điểm đều lệch lên'],
    ['Chất lượng buổi', 'Tỷ lệ buổi có giáo án duyệt trước',
      'Số buổi có giáo án được duyệt trước ít nhất 48 giờ, chia cho tổng số buổi',
      '100%', '< 90%',
      'Duyệt hình thức vẫn được tính là duyệt. Đọc kèm tỷ lệ giáo án bị trả lại; trả lại 0% nghĩa là việc duyệt không có thật'],
    ['Chất lượng buổi', 'Tỷ lệ cam kết cuối buổi được kiểm lại',
      'Số cam kết có người kiểm và có ghi kết quả, chia cho tổng cam kết đã thu',
      '≥ 70%', '< 40%',
      'Thu phiếu cam kết không phải là kiểm. Chỉ đếm cam kết có dòng kết quả và ngày kiểm'],
    ['Chất lượng buổi', 'Tỷ lệ chuyên đề phải chạy lại',
      'Số chuyên đề bị đánh giá hỏng và phải dạy lại, chia cho tổng chuyên đề trong quý',
      '≤ 10%', '0% hoặc trên 25%',
      'Con số 0% đáng ngờ ngang 25%. Không chuyên đề nào hỏng thường có nghĩa là không ai dám báo hỏng'],

    ['Nhân sự', 'Hồ sơ đủ trước buổi tiếp xúc trẻ đầu tiên',
      'Số người có lý lịch tư pháp còn hạn và hồ sơ nhân sự đủ trước buổi đầu, chia cho tổng người tiếp xúc trẻ',
      '100%', 'Bất kỳ mức nào dưới 100%',
      'Chỉ số này không có ngưỡng vàng. Thiếu một người thì dừng người đó, không hạ ngưỡng cho cả nhóm'],
    ['Nhân sự', 'Tải kèm trung bình',
      'Tổng số học viên đang được kèm chia cho số Coach đang đứng lớp',
      '≤ 12 học viên mỗi Coach', '> 18 học viên mỗi Coach',
      'Trung bình che người quá tải. Luôn báo kèm số Coach đang vượt 18 và tên ca của họ'],
    ['Nhân sự', 'Tỷ lệ Coach còn đứng lớp sau 12 tháng',
      'Số Coach còn đứng lớp sau 12 tháng chia cho số Coach nhận việc cùng đợt',
      '≥ 75%', '< 50%',
      'Coach nghỉ giữa chu kỳ làm hỏng cả dãy dữ liệu của học viên. Đọc kèm số học viên bị đổi Coach giữa chu kỳ'],
    ['Nhân sự', 'Giờ đào tạo lại mỗi Coach',
      'Tổng giờ tập huấn có điểm danh chia cho số Coach',
      '≥ 24 giờ mỗi năm', '< 12 giờ mỗi năm',
      'Giờ ngồi nghe không phải là năng lực. Chỉ có ý nghĩa khi đọc cùng điểm dự giờ của chính kỳ đó'],
    ['Nhân sự', 'Tỷ lệ ghế bàn giao có biên bản',
      'Số ghế đổi người có biên bản bàn giao trước khi hết nhiệm kỳ, chia cho tổng ghế đổi người',
      '100%', '< 80%',
      'Bàn giao miệng vẫn hay được ghi là đã bàn giao. Chỉ đếm ca có chữ ký người kế nhiệm'],
    ['Nhân sự', 'Số ca người chấm trùng người kèm',
      'Đếm số ca chấm mà người chấm cũng là người kèm',
      '0 ca', 'Từ 1 ca trở lên',
      'Đây là chỉ số đếm vi phạm, không phải tỷ lệ để cải thiện dần. Một ca là huỷ kết quả cả kỳ chấm đó'],

    ['Gia đình', 'Thư tháng gửi đúng hạn',
      'Số thư gửi trước ngày 5 chia cho tổng gia đình đang theo',
      '≥ 95%', '< 85%',
      'Gửi đúng hạn mà nội dung chép lại tháng trước thì vô nghĩa. Rà mẫu 10% xem có số liệu riêng của từng con không'],
    ['Gia đình', 'Bảng tuần của gia đình có ghi',
      'Số tuần có bảng được ghi chia cho tổng số tuần trong kỳ',
      '≥ 60%', '< 30%',
      'Bảng ghi dồn một lần cuối tháng không dùng để đo hành vi được. Phải kiểm ngày ghi, không chỉ kiểm bảng có chữ'],
    ['Gia đình', 'Chỉ số tiến cử thuần từ phụ huynh',
      'Khảo sát do đơn vị ngoài thực hiện, hai lần mỗi năm, cùng bộ câu hỏi',
      '≥ 40', '< 20',
      'Đây là bằng chứng tầng một: đo cảm nhận của người đã trả tiền. Không được dùng thay cho kết quả của trẻ'],
    ['Gia đình', 'Phàn nàn đóng trong 14 ngày',
      'Số phàn nàn đóng đúng hạn chia cho tổng phàn nàn mở trong kỳ',
      '≥ 90%', '< 70%',
      'Đóng nhanh bằng dòng “đã trao đổi” là đóng giả. Chỉ đếm ca có mô tả việc thật sự đã đổi'],
    ['Gia đình', 'Gia đình dự ít nhất một buổi mở',
      'Số gia đình có mặt ít nhất một buổi mở trong năm, chia cho tổng gia đình',
      '≥ 70%', '< 40%',
      'Có mặt không đồng nghĩa với đồng hành. Đọc kèm tỷ lệ bảng tuần có ghi mới thấy được thực chất'],

    ['Cộng đồng', 'Người ngoài hệ được hưởng lợi',
      'Đếm theo danh sách người thụ hưởng có tên trong hồ sơ dự án',
      '≥ 3 người mỗi học viên bậc 3 trở lên mỗi năm', '0 người trong cả năm',
      'Đếm lượt tham dự sự kiện là thổi số. Chỉ đếm người có tên và có một câu chính họ nói ra'],
    ['Cộng đồng', 'Dự án có nghiệm thu ngoài',
      'Số dự án có biên bản người ngoài hệ ký, chia cho tổng dự án khai báo',
      '≥ 70%', '< 40%',
      'Người ngoài hệ nghĩa là không nhận tiền từ hệ và không trả tiền cho hệ. Người quen của Coach không tính'],
    ['Cộng đồng', 'Dự án còn chạy sau 6 tháng',
      'Số dự án còn hoạt động sau 6 tháng chia cho số dự án đã nghiệm thu',
      '≥ 40%', '< 15%',
      'Dự án chết ngay sau lễ tổng kết là chuyện thường. Không đo mục này thì mọi con số dự án chỉ là ảnh chụp một ngày'],
    ['Cộng đồng', 'Thư biết ơn có việc cụ thể',
      'Đếm thư nêu được một việc có ngày tháng và tên người',
      '≥ 1 thư mỗi học viên mỗi quý', '0 thư trong hai quý liên tiếp',
      'Thư viết theo mẫu chung không tính. Tiêu chí là một việc, một ngày, một tên — thiếu một trong ba thì bỏ'],
    ['Cộng đồng', 'Chi hội có ít nhất một dự án cộng đồng',
      'Số chi hội có dự án đã nghiệm thu chia cho tổng số chi hội',
      '≥ 80%', '< 50%',
      'Một chi hội mạnh làm mười dự án sẽ che phần còn lại. Phải đếm theo chi hội, không đếm theo dự án'],

    ['Tài chính', 'Giao dịch có chứng từ',
      'Số giao dịch có chứng từ gốc chia cho tổng số giao dịch',
      '100%', 'Bất kỳ mức nào dưới 100%',
      'Không hạ ngưỡng chỉ số này. Một khoản thiếu chứng từ là một khoản phải giải trình, không phải một phần trăm sai số'],
    ['Tài chính', 'Chi phí trên mỗi học viên hoàn thành chu kỳ',
      'Tổng chi trong kỳ chia cho số học viên hoàn thành chu kỳ',
      'Theo dõi xu hướng, so với cùng kỳ năm trước', 'Tăng trên 25% trong một năm mà không giải thích được',
      'Giảm chi bằng cách cắt giờ kèm sẽ làm đẹp số này và làm hỏng nhóm chất lượng buổi. Luôn đọc thành cặp'],
    ['Tài chính', 'Tỷ trọng nguồn thu lớn nhất',
      'Nguồn thu lớn nhất chia cho tổng thu',
      '≤ 50%', '> 70%',
      'Một nhà tài trợ chiếm quá nửa thì trên thực tế họ có quyền phủ quyết, dù hợp đồng không ghi dòng nào như vậy'],
    ['Tài chính', 'Số ngày quỹ dự phòng đủ chi',
      'Quỹ dự phòng chia cho mức chi bình quân một ngày',
      '≥ 90 ngày', '< 30 ngày',
      'Tính theo chi bình quân cả năm sẽ đẹp hơn thực tế vào mùa cao điểm. Tính theo quý chi nhiều nhất'],
    ['Tài chính', 'Tỷ lệ suất hỗ trợ học phí',
      'Số học viên thuộc diện hỗ trợ chia cho tổng học viên',
      '≥ 10%', '< 5%',
      'Chỉ báo cáo con số tổng. Không công bố danh sách, không ghi lý do hỗ trợ vào hồ sơ của con'],
    ['Tài chính', 'Quyết toán sự kiện đúng hạn',
      'Số sự kiện quyết toán trong 15 ngày chia cho tổng số sự kiện',
      '100%', '< 80%',
      'Quyết toán muộn thường không phải vì bận, mà vì đang thiếu chứng từ. Đọc như một chỉ số cảnh báo, không phải chỉ số hành chính'],

    ['Vận hành', 'Biểu mẫu nộp đúng hạn',
      'Số biểu mẫu nộp trước hạn chia cho tổng biểu mẫu tới hạn trong kỳ',
      '≥ 90%', '< 70%',
      'Nộp đúng hạn với trường bắt buộc để trống vẫn phải tính là thiếu. Chỉ đếm sau khi đã kiểm trường bắt buộc'],
    ['Vận hành', 'Trường bắt buộc bị bỏ trống',
      'Số ô bắt buộc còn trống chia cho tổng số ô bắt buộc',
      '≤ 3%', '> 10%',
      'Tỷ lệ thấp cũng có thể do điền bừa cho đủ. Kiểm chéo với bằng chứng đính kèm của chính biểu mẫu đó'],
    ['Vận hành', 'Số ngày từ sự cố tới biên bản',
      'Trung vị số ngày từ ngày xảy ra tới ngày có biên bản',
      '≤ 1 ngày', '> 3 ngày',
      'Trung vị đẹp vẫn có thể che một ca chậm 30 ngày. Luôn báo kèm ca chậm nhất trong kỳ'],
    ['Vận hành', 'Khuyến nghị ngoại kiểm đã có người xử',
      'Số khuyến nghị có kế hoạch và có tên người chịu trách nhiệm trong 30 ngày, chia cho tổng khuyến nghị',
      '100%', '< 80%',
      'Có kế hoạch không phải là đã sửa. Đếm riêng số khuyến nghị đã đóng và số khuyến nghị sang năm thứ hai'],
    ['Vận hành', 'Chi hội nộp báo cáo quý',
      'Số chi hội nộp đúng hạn chia cho tổng số chi hội',
      '≥ 95%', '< 80%',
      'Chi hội im lặng thường là chi hội đang hỏng, không phải chi hội đang ổn. Không nộp là một tín hiệu, không phải một khoảng trống'],
    ['Vận hành', 'Lỗi tự báo trong sổ lỗi',
      'Đếm số lỗi do chính người trong hệ báo trước khi bị phát hiện',
      '≥ 1 lỗi mỗi chi hội mỗi quý', '0 lỗi trong hai quý liên tiếp',
      'Sổ lỗi trống không phải là hệ sạch. Nó có nghĩa là báo lỗi đang bị phạt, và lỗi đang được giữ ở chỗ khác'],
    ['Vận hành', 'Số liệu bị đính chính sau khi công bố',
      'Đếm số chỉ số phải ra bản đính chính trong kỳ',
      '≤ 2 mỗi năm', '> 5 mỗi năm, hoặc cùng một chỉ số đính chính hai lần',
      'Ít đính chính chưa chắc là số đúng. Đọc kèm số lần bị người ngoài chỉ ra sai — đó mới là con số nói thật']
  ];

  /* ── 4 · Biểu mẫu đo ──────────────────────────────────────
     Hai mươi hai biểu mẫu. Đây là bộ giấy sinh ra con số; bộ biểu
     mẫu vận hành nằm ở kho khác và không trùng với bộ này.

     Một luật thiết kế duy nhất: điền được trong ba phút. Biểu mẫu
     dài mười phút sẽ bị điền cho có từ tuần thứ tư, và từ đó mọi
     con số phía sau đều sai mà không ai biết.                    */
  G.DL_BIEU_MAU_DO = [
    ['Mã', 'Biểu mẫu', 'Ai điền', 'Khi nào', 'Trường không được để trống'],

    ['ĐO-01', 'Phiếu số nền đầu vào', 'Người đánh giá đầu vào, không phải người sẽ dạy', 'Trong tuần thử, trước buổi dạy đầu tiên',
      'Ngày đo · người đo · tám chỉ số ngoài hệ · nguồn của từng số · chữ ký người đo'],
    ['ĐO-02', 'Bảng ba màu 90 ngày', 'Học viên tự ghi; Coach ký cuối mỗi tuần', 'Ghi mỗi ngày, ký mỗi tuần',
      'Ngày · màu ô · việc đã làm trong ngày · chữ ký Coach cuối tuần'],
    ['ĐO-03', 'Phiếu quan sát của giáo viên chủ nhiệm', 'Giáo viên chủ nhiệm', 'Đầu năm học và cuối năm học',
      'Tên và trường lớp · ba câu trả lời · ngày · chữ ký. Phiếu không đi qua tay phụ huynh'],
    ['ĐO-04', 'Phiếu bằng chứng tầng ba', 'Người ngoài hệ đã trực tiếp chứng kiến', 'Ngay khi việc xảy ra, chậm nhất 7 ngày',
      'Việc gì · ngày · nơi · tên và cách liên hệ người xác nhận · quan hệ của họ với hệ · chữ ký'],
    ['ĐO-05', 'Biên bản chấm cổng nghiệm thu', 'Chuyên gia đánh giá', 'Mỗi kỳ chấm',
      'Tên người chấm · xác nhận không phải người kèm · điểm sáu cột · phần chưa đủ bằng chứng · quyết định'],
    ['ĐO-06', 'Phiếu dự giờ', 'Quản lý chuyên môn', 'Ít nhất một lần mỗi quý cho mỗi Coach, có ít nhất một lần đột xuất',
      'Ngày · báo trước hay đột xuất · điểm từng mục · một việc phải sửa · hạn sửa'],
    ['ĐO-07', 'Phiếu phản hồi cuối buổi', 'Người có mặt trong buổi', 'Mỗi buổi, thu trước khi ra về',
      'Buổi nào · một điều dùng được · một điều chưa ổn. Người điền được quyền không ghi tên'],
    ['ĐO-08', 'Sổ đứt nhịp và phục hồi', 'Học viên tự ghi; Coach đọc và ký, không sửa chữ của con', 'Mỗi lần đứt nhịp',
      'Ngày đứt · lý do thật · ngày quay lại · việc đã làm để quay lại'],
    ['ĐO-09', 'Phiếu phỏng vấn khi rời hệ', 'Người thứ ba, không phải Coach đang kèm', 'Trong 14 ngày kể từ ngày rời, hỏi lại sau 30 ngày',
      'Ngày rời · lý do người ấy nói lần đầu · lý do sau khi hỏi lại · điều hệ đáng lẽ phải làm khác'],
    ['ĐO-10', 'Bảng tuần của gia đình', 'Phụ huynh', 'Ghi trong ngày, không ghi dồn cuối tháng',
      'Ngày ghi · việc con tự làm không cần nhắc · số lần · ghi chú'],
    ['ĐO-11', 'Sổ theo dõi cam kết cuối buổi', 'Người đồng hành được phân công kiểm', 'Trong 7 ngày sau buổi',
      'Tên người cam kết · điều đã cam kết · đã làm hay chưa · bằng chứng · ngày kiểm'],
    ['ĐO-12', 'Biên bản nghiệm thu dự án', 'Người thụ hưởng ký; chuyên gia đánh giá đối chiếu', 'Khi dự án kết thúc',
      'Vấn đề · sản phẩm · người thụ hưởng có tên · một câu chính họ nói ra · quan hệ của họ với hệ · chữ ký'],
    ['ĐO-13', 'Sổ phàn nàn', 'Người trực tiếp nhận phàn nàn', 'Ghi ngay khi nhận, không để sang ngày sau',
      'Ngày nhận · ai phàn nàn · nội dung theo đúng lời họ · người xử · ngày đóng · việc đã đổi'],
    ['ĐO-14', 'Biên bản sự cố', 'Người phụ trách an toàn', 'Trong 24 giờ kể từ khi xảy ra',
      'Thời gian · nơi · ai có mặt · diễn biến theo sự kiện · đã báo gia đình lúc mấy giờ · việc phải đổi'],
    ['ĐO-15', 'Nhật ký truy cập hồ sơ học viên', 'Chính người mở hồ sơ tự ghi', 'Mỗi lần mở hồ sơ không thuộc ca mình kèm',
      'Ngày giờ · người xem · hồ sơ nào · lý do xem · ai cho phép'],
    ['ĐO-16', 'Phiếu đồng thuận hình ảnh', 'Phụ huynh; học viên từ 16 tuổi ký cùng', 'Trước lần chụp đầu tiên, rà lại mỗi năm học',
      'Phạm vi sử dụng · nơi đăng · thời hạn · cách rút lại · chữ ký. Còn ô trống thì không được đăng'],
    ['ĐO-17', 'Phiếu yêu cầu xoá dữ liệu', 'Gia đình, hoặc học viên từ 16 tuổi', 'Bất cứ lúc nào, không hỏi lý do',
      'Người yêu cầu · phần dữ liệu yêu cầu xoá · ngày nhận · ngày xoá xong · người xác nhận đã xoá'],
    ['ĐO-18', 'Sổ thu chi theo hoạt động', 'Ban tài chính chi hội', 'Ghi trong ngày phát sinh',
      'Ngày · nội dung · số tiền · người duyệt · người giữ chứng từ · số hiệu chứng từ'],
    ['ĐO-19', 'Phiếu kiểm mẫu hồ sơ', 'Chuyên gia đánh giá', 'Mỗi quý, trên 20% hồ sơ bốc ngẫu nhiên',
      'Cách bốc mẫu · số hồ sơ đã rà · số dòng thiếu bằng chứng · tỷ lệ · kết luận và việc phải làm'],
    ['ĐO-20', 'Phiếu chấm chéo liên chi hội', 'Người chấm thuộc chi hội khác', 'Mỗi quý, cùng một cổng nghiệm thu',
      'Hai chi hội · cổng nào · điểm mỗi bên · chênh lệch · giải thích chênh lệch'],
    ['ĐO-21', 'Sổ lỗi của chi hội', 'Bất kỳ ai trong hệ phát hiện ra lỗi', 'Ghi ngay khi phát hiện',
      'Lỗi gì · ai báo · tự báo hay bị phát hiện · đã sửa gì · ngày đóng'],
    ['ĐO-22', 'Phiếu ghi tầng bằng chứng cho một con số', 'Người lập báo cáo', 'Kèm theo mọi báo cáo có số',
      'Con số · nguồn · tầng một, hai hay ba · ngày đo · người đo · mẫu số']
  ];

  /* ── 5 · Cách một con số bị làm hỏng ──────────────────────
     Mười bốn lối. Không lối nào cần nói dối. Đó là chỗ nguy hiểm:
     mỗi lối đều có thể làm với thiện chí, và người làm thường tin
     rằng mình đang trình bày cho dễ hiểu.

     Cột “dấu” là dấu hiệu nhận ra. Cột “phanh” là thứ chặn được,
     và phanh chỉ hiệu lực khi đặt TRƯỚC lúc nhìn thấy số.        */
  G.DL_SO_XAU = [
    { t: 'Đổi định nghĩa giữa kỳ',
      dau: 'Con số nhảy một bậc lớn mà không có việc gì lớn xảy ra. Hỏi kỹ thì hoá ra cách tính vừa được chỉnh cho hợp lý hơn.',
      phanh: 'Định nghĩa từng chỉ số chốt đầu năm bằng văn bản, có Hội đồng Chuyên môn duyệt. Muốn sửa thì sửa từ năm sau và tính lại toàn bộ dãy cũ theo định nghĩa mới, công bố cả hai dãy.' },

    { t: 'Chọn mốc so sánh có lợi',
      dau: 'Báo cáo so với một tháng thấp bất thường, hoặc so với năm đầu tiên khi hệ còn dở, thay vì so với kỳ liền trước.',
      phanh: 'Mốc so sánh cố định: kỳ liền trước và cùng kỳ năm trước, cả hai đều phải có mặt. Muốn thêm mốc khác thì thêm, không được thay.' },

    { t: 'Bỏ người rời hệ ra khỏi mẫu',
      dau: 'Tỷ lệ tiến bộ rất đẹp, mẫu số nhỏ hơn số người đã vào. Câu quen thuộc: “chỉ tính những em theo đủ chương trình”.',
      phanh: 'Mẫu số luôn là số người đã vào chương trình. Người rời được tính là chưa đạt cho tới khi có bằng chứng khác. Báo cáo phải in kèm số người rời ngay cạnh tỷ lệ.' },

    { t: 'Gộp nhóm để giấu nhóm kém',
      dau: 'Chỉ có số toàn hệ, không có số từng chi hội, từng khối lớp, từng đợt vào.',
      phanh: 'Mọi chỉ số người học tách theo chi hội và theo đợt vào. Nhóm nào dưới ngưỡng báo động thì nêu tên nhóm đó trong báo cáo, kể cả khi số tổng đẹp.' },

    { t: 'Đo cái dễ thay cho cái đúng',
      dau: 'Báo cáo đầy số điểm danh, số buổi, số bài đăng — và không có dòng nào về bằng chứng tầng ba.',
      phanh: 'Mỗi báo cáo phải có ít nhất một chỉ số tầng ba ở mục ba con số đứng đầu. Chỉ số dễ đo được xếp xuống phần phụ lục, không được lên đầu trang.' },

    { t: 'Đo lại tới khi đẹp',
      dau: 'Cùng một lớp được khảo sát ba lần trong một quý, và bản báo cáo dùng lần thứ ba.',
      phanh: 'Ngày đo chốt từ đầu chu kỳ và không dời. Đo thêm thì được, nhưng phải công bố cả ba lần, theo thứ tự thời gian.' },

    { t: 'Đổi mẫu số mà không nói',
      dau: 'Kỳ này tính trên số người đang hoạt động, kỳ trước tính trên toàn danh sách. Tử số giữ nguyên, tỷ lệ vọt lên.',
      phanh: 'Mọi tỷ lệ viết kèm mẫu số bằng số tuyệt đối: “85% — 34 trên 40”. Không có mẫu số thì bộ kiểm trả lại báo cáo.' },

    { t: 'Trộn tầng bằng chứng',
      dau: 'Một danh sách kết quả nối tiếp nhau: lời khen của phụ huynh, phiếu tự đánh giá, và một biên bản dự án có người ngoài ký — đọc như nhau.',
      phanh: 'Mỗi con số ghi tầng ngay bên cạnh. Cấm cộng dồn số thuộc hai tầng khác nhau thành một tỷ lệ chung.' },

    { t: 'Trung bình che cái đuôi',
      dau: 'Trung bình đạt ngưỡng, không ai nhắc tới nhóm thấp nhất. Vài trường hợp rất tốt đang gánh cả bảng.',
      phanh: 'Chỉ số về người luôn báo ba số: trung vị, nhóm thấp nhất một phần tư, và số ca dưới ngưỡng báo động. Trung bình đứng sau cùng.' },

    { t: 'Chọn người chắc đạt đi thi',
      dau: 'Tỷ lệ qua cổng lần đầu vượt 90%, trong khi số người dự chấm ít hơn hẳn số người tới kỳ.',
      phanh: 'Danh sách dự chấm chốt từ đầu chu kỳ theo tiêu chí, không theo dự đoán. Ai được rút khỏi danh sách phải ghi lý do và được quản lý chuyên môn duyệt.' },

    { t: 'Đếm lượt thay cho đếm người',
      dau: 'Số người hưởng lợi lớn bất thường sau một sự kiện đông. Một người đi ba buổi được đếm thành ba.',
      phanh: 'Đơn vị đếm mặc định là người, có tên. Muốn báo lượt thì báo riêng, đặt ở cột khác, không cộng chung.' },

    { t: 'Một ca hay thay cho cả tập',
      dau: 'Báo cáo mở đầu bằng một câu chuyện cảm động và không quay lại với bảng số. Câu chuyện càng hay, bảng số càng vắng.',
      phanh: 'Chuyện kể đặt sau bảng số, và mỗi chuyện phải kèm câu trả lời: trong kỳ này có bao nhiêu ca như vậy trên tổng bao nhiêu.' },

    { t: 'Đặt ngưỡng sau khi đã có số',
      dau: 'Ngưỡng của kỳ này vừa khéo thấp hơn kết quả một chút. Không ai nhớ ngưỡng cũ là bao nhiêu.',
      phanh: 'Ngưỡng công bố trước kỳ đo, lưu bản không sửa được. Không đạt thì ghi là không đạt; hạ ngưỡng là một quyết định riêng, phải có biên bản và lý do.' },

    { t: 'Người chấm là người dạy',
      dau: 'Điểm nghiệm thu của một Coach cao đều bất thường và chênh rõ với kết quả chấm chéo liên chi hội.',
      phanh: 'Người chấm khác người kèm — tuyệt đối. Phát hiện trùng thì huỷ kết quả cả kỳ chấm đó và chấm lại toàn bộ, không chỉ chấm lại ca bị phát hiện.' }
  ];

  /* ── 6 · Quy tắc dữ liệu trẻ em ───────────────────────────
     Hai mươi điều. Kho tin cậy đã nêu sáu nguyên tắc; đây là bản
     đủ để một người mới vào làm theo mà không phải hỏi ai.

     Vi phạm các điều dưới đây xử như luật đỏ: khoá quyền truy cập
     trước, xem xét sau.                                          */
  G.DL_DU_LIEU_TRE = [
    'Mỗi trường dữ liệu phải trả lời được một câu: trường này phục vụ quyết định nào. Không trả lời được thì bỏ trường, không giữ lại để sau này dùng.',
    'Không thu nghề nghiệp, thu nhập, tôn giáo hay tình trạng hôn nhân của gia đình. Diện hỗ trợ học phí xét bằng một hồ sơ riêng, lưu riêng, và không ghi lý do vào hồ sơ của con.',
    'Không thu dữ liệu sinh trắc, không thu vị trí, không đọc và không lưu nội dung tin nhắn của học viên.',
    'Ghi chú về một đứa trẻ viết bằng việc đã xảy ra, có ngày. Không viết chẩn đoán, không gắn nhãn tính cách, không viết đùa. Người viết phải hình dung chính đứa trẻ ấy đọc lại ở tuổi hai mươi.',
    'Quyền xem mặc định chỉ gồm hai người: Coach đang kèm và quản lý chuyên môn. Không ai khác được xem mặc định, kể cả ban giám đốc.',
    'Người ngoài ca kèm muốn xem thì ghi lý do vào nhật ký truy cập trước khi mở, và phải được quản lý chuyên môn cho phép. Nhật ký rà hằng quý; lần xem không có lý do là một vi phạm.',
    'Ban điều hành chi hội chỉ xem số tổng hợp. Không xem hồ sơ từng người, kể cả hồ sơ của người trong ban mình.',
    'Bên nhận nhượng quyền chỉ xem hồ sơ học viên trên địa bàn mình. Kết thúc hợp đồng thì bàn giao toàn bộ và xoá bản lưu, có biên bản xác nhận.',
    'Dữ liệu vận hành giữ ba năm sau khi học viên rời hệ, rồi xoá. Ngày xoá đặt lịch ngay từ ngày rời, không phụ thuộc vào việc ai đó còn nhớ.',
    'Hồ sơ bằng chứng giữ ba mươi năm nếu gia đình đồng ý bằng văn bản. Không đồng ý thì xoá cùng đợt với dữ liệu vận hành.',
    'Gia đình xin bản sao toàn bộ hồ sơ thì giao trong bảy ngày. Không thu phí, không hỏi lý do, không cắt bớt phần bất lợi cho hệ.',
    'Yêu cầu xoá được thực hiện trong ba mươi ngày. Phần buộc phải giữ vì đang có sự cố xử lý dở thì nói rõ với gia đình phần nào, vì sao, và ngày sẽ xoá.',
    'Xoá là xoá cả bản sao lưu, cả tệp trong nhóm trao đổi, cả bản riêng trên máy cá nhân. Người giữ bản riêng phải xoá và xác nhận bằng văn bản.',
    'Không gửi dữ liệu học viên ra ngoài hệ dưới bất kỳ hình thức nào: không cho nhà tài trợ, không cho đối tác truyền thông, không cho người làm tuyển sinh của bất kỳ nơi nào.',
    'Không đưa dữ liệu học viên vào công cụ bên ngoài để phân tích, tóm tắt hay soạn nhận xét. Cần dùng công cụ thì bỏ hết tên, ngày sinh, tên trường, tên chi hội trước khi đưa vào.',
    'Không xếp hạng công khai trẻ theo tên. Bảng thi đua chỉ hiện tên nhóm và số tổng; người muốn biết vị trí của mình thì hỏi Coach, và Coach chỉ nói với chính người ấy.',
    'Không đăng ảnh có mặt trẻ khi chưa có phiếu đồng thuận còn hiệu lực. Gia đình rút đồng thuận thì gỡ trong bốn mươi tám giờ, kể cả bài đã lan rộng.',
    'Không đưa bất kỳ dữ liệu học viên thật nào vào bản dựng tĩnh của hệ. Bản dựng chỉ chứa chuẩn, giáo án và biểu mẫu trống. Một tên thật lọt vào bản dựng là một sự cố dữ liệu, xử theo quy trình rò rỉ.',
    'Bản trình diễn dùng dữ liệu giả, tên giả, và ghi rõ trên màn rằng đây là dữ liệu giả. Không lấy hồ sơ thật rồi đổi tên — số liệu còn lại vẫn đủ để nhận ra người.',
    'Từ mười sáu tuổi, học viên được xem toàn bộ dữ liệu của mình và có tiếng nói về việc chia sẻ. Từ mười tám tuổi, quyền quyết định chuyển hẳn cho chính người ấy, kể cả quyền xoá.'
  ];

  /* ── 7 · Nhịp đo cả năm ───────────────────────────────────
     Hai mươi bốn mốc. Nhịp này là nhịp chung toàn quốc để liên chi
     hội đối chiếu được với nhau. Chi hội không tự dời mốc; dời một
     mốc là mất khả năng so sánh của cả vùng trong kỳ đó.          */
  G.DL_NHIP = [
    { p: 'Tuần thử của mỗi người mới', m: 'Đo số nền: bộ test đầu vào và tám chỉ số ngoài hệ',
      ai: 'Người đánh giá đầu vào, không phải người sẽ dạy',
      y: 'Không có dòng số nền thì mọi con số về sau không so được với gì' },
    { p: 'Mỗi buổi sinh hoạt', m: 'Điểm danh, chốt độ lệch timeline, thu phiếu phản hồi cuối buổi',
      ai: 'Ban trực buổi',
      y: 'Ba số rẻ nhất của cả hệ, và cũng là ba số bị bỏ nhiều nhất' },
    { p: 'Trong 24 giờ sau buổi', m: 'Gửi báo cáo buổi cho chi hội và phụ huynh',
      ai: 'Thư ký chi hội',
      y: 'Quá 24 giờ thì người ta đã quên, báo cáo thành tài liệu lịch sử chứ không còn là công cụ' },
    { p: 'Sáng thứ Hai hằng tuần', m: 'Chốt băng màu từng người, lập danh sách ĐỎ của tuần',
      ai: 'Coach đang kèm',
      y: 'Mỗi tên trong danh sách ĐỎ phải có một người gọi trong 48 giờ' },
    { p: 'Chiều thứ Sáu hằng tuần', m: 'Rà sổ đứt nhịp, chốt ai cần một cuộc gọi trước cuối tuần',
      ai: 'Coach đang kèm',
      y: 'Không để ai ở băng ĐỎ đi qua một cuối tuần mà không có ai gọi' },
    { p: 'Ngày 3 hằng tháng', m: 'Báo cáo giữ người của chi hội',
      ai: 'Ban phụ trách gắn kết',
      y: 'Ra trước báo cáo tài chính, để quyết định về con người không bị con số tiền dẫn dắt' },
    { p: 'Ngày 5 hằng tháng', m: 'Ba báo cáo cùng ra: thư tháng cho gia đình, chất lượng buổi, tài chính tháng',
      ai: 'Coach · quản lý chuyên môn · ban tài chính chi hội',
      y: 'Cùng ngày thì đọc chéo được: chất lượng tụt mà chi tăng là một câu hỏi phải trả lời ngay tháng đó' },
    { p: 'Ngày 10 hằng tháng', m: 'Họp tháng: đọc sổ phàn nàn, nêu tên người chịu trách nhiệm ở ca quá hạn',
      ai: 'Giám đốc điều hành',
      y: 'Phàn nàn quá 14 ngày không được đóng bằng một câu nói trong phòng họp' },
    { p: 'Tuần cuối mỗi tháng', m: 'Rà tỷ lệ trường bắt buộc bị bỏ trống trong biểu mẫu tháng',
      ai: 'Bộ phận hành chính',
      y: 'Số liệu hỏng từ những ô trống, không hỏng ở khâu phân tích' },
    { p: 'Cuối mỗi chu kỳ 90 ngày', m: 'Cổng nghiệm thu; người chấm khác người kèm',
      ai: 'Chuyên gia đánh giá',
      y: 'Đây là mốc duy nhất quyết định lên bậc. Không có mốc nào lên bậc theo thời gian ngồi trong hệ' },
    { p: 'Trong 7 ngày sau cổng', m: 'Báo cáo cuối chu kỳ gửi gia đình và gửi chính học viên',
      ai: 'Coach đang kèm',
      y: 'Nói rõ thiếu bằng chứng ở cột nào. Câu “chưa đạt” đóng lại một đứa trẻ, câu “còn thiếu bằng chứng ở cột này” mở ra một chu kỳ' },
    { p: 'Tuần cuối quý', m: 'Chấm chéo liên chi hội trên cùng một cổng',
      ai: 'Coach vùng',
      y: 'Chênh quá 15 điểm giữa hai nơi nghĩa là chuẩn đang loãng, không phải học viên đang khác nhau' },
    { p: 'Tuần cuối quý', m: 'Bốc ngẫu nhiên 20% hồ sơ, rà từng dòng bằng chứng',
      ai: 'Chuyên gia đánh giá',
      y: 'Trên 5% dòng thiếu bằng chứng thì rà 100% và tạm dừng cấp bậc ở chi hội đó' },
    { p: 'Tuần cuối quý', m: 'Rà nhật ký truy cập dữ liệu học viên',
      ai: 'Bộ phận hành chính',
      y: 'Quyền xem không được rà thì tự nở ra, và không ai nhớ mình đã cấp cho ai' },
    { p: 'Trong 10 ngày sau cuối quý', m: 'Báo cáo quý của bên nhận nhượng quyền',
      ai: 'Bên nhận nhượng quyền',
      y: 'Nộp muộn hai quý liên tiếp là căn cứ chế tài theo hợp đồng' },
    { p: 'Đầu năm học', m: 'Phát phiếu quan sát cho giáo viên chủ nhiệm',
      ai: 'Đại diện Học viện phát trực tiếp',
      y: 'Hỏi trước khi hệ kịp tác động, để cuối năm còn có cái mà so' },
    { p: 'Giữa năm học', m: 'Khảo sát phụ huynh đợt một, do đơn vị ngoài thực hiện',
      ai: 'Đơn vị khảo sát ngoài',
      y: 'Người của hệ đi hỏi thì thu về sự lịch sự, không thu về sự thật' },
    { p: 'Cuối năm học', m: 'Thu phiếu quan sát giáo viên chủ nhiệm đợt hai và chạy khảo sát phụ huynh đợt hai',
      ai: 'Đại diện Học viện · đơn vị khảo sát ngoài',
      y: 'Cặp phiếu đầu năm và cuối năm là bằng chứng tầng ba mạnh nhất mà hệ có trong tay' },
    { p: 'Tháng 10', m: 'Đợt ngoại kiểm thường niên tại chỗ',
      ai: 'Hội đồng ngoài bốn người',
      y: 'Báo cáo công bố nội bộ nguyên văn, không cắt, không tóm tắt lại cho dễ nghe' },
    { p: 'Trong 30 ngày sau ngoại kiểm', m: 'Lập kế hoạch xử lý từng khuyến nghị, gắn tên người chịu trách nhiệm',
      ai: 'Giám đốc điều hành',
      y: 'Khuyến nghị không gắn tên người là khuyến nghị không ai làm' },
    { p: 'Tháng 11', m: 'Khoá sổ số liệu năm. Sau ngày này không sửa số, chỉ ra bản đính chính',
      ai: 'Bộ phận phân tích dữ liệu',
      y: 'Sửa số sau khi đã nhìn thấy kết quả là cách hỏng một hệ đo nhanh nhất' },
    { p: 'Trước đại hội 30 ngày', m: 'Báo cáo năm toàn hệ và báo cáo tài chính năm có soát xét',
      ai: 'Bộ phận phân tích dữ liệu · kế toán của Học viện',
      y: 'Mỗi con số ghi rõ tầng bằng chứng và mẫu số. Số không có nguồn thì để trống, ghi lý do trống' },
    { p: 'Tháng cuối năm', m: 'Đọc sổ lỗi cả năm trước toàn hệ',
      ai: 'Giám đốc điều hành',
      y: 'Sổ lỗi trống là dấu hiệu xấu. Nơi nào không báo lỗi nào cả năm thì rà nơi đó trước' },
    { p: 'Tháng đầu năm sau', m: 'Chốt định nghĩa và ngưỡng của từng chỉ số cho cả năm',
      ai: 'Hội đồng Chuyên môn',
      y: 'Đổi định nghĩa giữa kỳ là cách làm hỏng số phổ biến nhất, và gần như luôn được làm với thiện chí' }
  ];

  /* ── 8 · Luật đo lường ───────────────────────────────────── */
  G.DL_LUAT = [
    'Nâng theo bằng chứng, không theo thời gian. Không có mốc nào kiểu đủ một năm thì lên bậc; đủ bằng chứng thì lên, chưa đủ thì chưa.',
    'Bằng chứng tầng ba là bằng chứng do người ngoài hệ xác nhận: người không trả tiền cho hệ và không nhận tiền từ hệ. Phụ huynh không phải người ngoài hệ. Người quen của Coach cũng không.',
    'Mọi con số công bố phải ghi rõ thuộc tầng nào. Nhập nhèm tầng là một hình thức nói dối, kể cả khi từng con số đều đúng.',
    'Định nghĩa chỉ số chốt đầu năm và không đổi giữa kỳ. Muốn đổi thì đổi từ năm sau, và tính lại cả dãy số cũ theo định nghĩa mới rồi công bố cả hai dãy.',
    'Ngưỡng đặt trước khi đo. Đặt ngưỡng sau khi đã nhìn thấy số là tự chấm bài của mình.',
    'Người chấm không phải người kèm. Phát hiện trùng thì huỷ kết quả cả kỳ chấm và chấm lại toàn bộ.',
    'Mỗi báo cáo có một người làm, một nơi nhận, một hạn. Không có báo cáo nào gửi cho mọi người khi nào xong.',
    'Báo cáo không dẫn tới một quyết định có tên thì bỏ. Giữ lại một báo cáo vô dụng là dạy cả hệ rằng giấy tờ quan trọng hơn việc thật.',
    'Một con số không có nguồn thì không được vào báo cáo: để trống ô đó và ghi lý do trống. Mọi tỷ lệ phải viết kèm mẫu số bằng số tuyệt đối, không có mẫu số thì báo cáo bị trả lại.',
    'Không có số nền thì không nói tiến bộ. Số nền đo trước buổi dạy đầu tiên, bởi người không dạy người ấy.',
    'Mẫu phải gồm cả người đã rời hệ. Bỏ họ ra là biến một báo cáo thành một tờ quảng cáo.',
    'Chỗ đang hỏng viết trước chỗ đang tốt. Trang đầu của mọi báo cáo là chỗ hỏng.',
    'Chỉ số nào cũng đọc theo cặp: một chỉ số kết quả đi kèm một chỉ số có thể bị hy sinh để làm đẹp nó. Không có cặp thì không đọc.',
    'Chỉ số đẹp bất thường được kiểm như chỉ số xấu. Một trăm phần trăm và không phần trăm đều là dấu hiệu cần kiểm, không phải dấu hiệu để khen.',
    'Biểu mẫu đo phải điền được trong ba phút. Dài hơn thì tới tuần thứ tư người ta điền cho có, và mọi số phía sau đều sai.',
    'Số liệu học viên không rời khỏi hệ dưới bất kỳ hình thức nào, kể cả để làm truyền thông, kể cả khi đã xoá tên.',
    'Không xếp hạng công khai trẻ theo tên. Muốn tạo động lực thì so con với chính con, và chỉ nói riêng với con.',
    'Sai số đã công bố thì đính chính công khai: số cũ, số mới, vì sao sai, ai chịu trách nhiệm. Không sửa lặng lẽ vào bản đã gửi.',
    'Ai báo sai sót số liệu của chính mình trước khi bị phát hiện thì không bị kỷ luật vì con số đó. Che giấu thì bị. Đây là luật giữ cho sổ lỗi có thật.',
    'Kho đo này là bản biên soạn mới, chưa qua thẩm định. Trước khi Hội đồng Chuyên môn duyệt, nó dùng làm bản thảo để bàn, không dùng làm căn cứ cho bất kỳ quyết định nào về một đứa trẻ.'
  ];

})(window.GV = window.GV || {});
