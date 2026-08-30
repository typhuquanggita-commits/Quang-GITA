/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT · KHO THAM CHIẾU BNI
   Kho này KHÔNG do bản dựng nghĩ ra. Nó rút từ ba tài liệu gốc
   "BNI_Accelerate_Journey (1).pdf", "Cẩm nang Vận hành Chapter
   -07.2025- v3.pdf" và "Cập nhật trong cẩm nang vận hành Chapter
   07.2025.pdf" trong thư mục GEN VIỆT của Học viện GITA,
   đọc ngày 30.08.2026.

   ĐÂY LÀ TÀI LIỆU CỦA MỘT TỔ CHỨC KHÁC. BNI®, Givers Gain®,
   BNI Connect®, Changing the Way the World Does Business® là
   thương hiệu của BNI Global, LLC. Ba tệp trên nằm trong kho với
   tư cách THAM CHIẾU, không phải tài sản của Học viện GITA. Gen
   Việt học CƠ CHẾ tổ chức — kịch bản họp, ghế luân phiên, bảng số
   công khai, ban gác chuẩn — và không sao chép thương hiệu, không
   dùng lại văn bản, biểu mẫu hay lịch trình họp của BNI. Chỉ
   Thành viên BNI mới được dùng lịch trình họp BNI; phần
   BN_QUY_TRINH_HOP dưới đây là để ĐỌC HIỂU cơ chế, không phải để
   Gen Việt chạy theo.

   Hệ thống trước nay mới chỉ nhắc tên ba tệp này. Kho lấp chỗ
   trống đó: cơ chế nào của BNI tạo ra chiều sâu nhiều năm, cơ chế
   nào bê được sang môi trường học sinh phổ thông, cơ chế nào
   tuyệt đối không.

   TRUNG THỰC VỚI NGUỒN — những chỗ dưới đây là SUY RA, không có
   trong tài liệu gốc:
   · cột "Gen Việt làm hoặc nên làm" và cột "Điều chỉnh vì đối
     tượng là học sinh" trong G.BN_DOI_CHIEU;
   · toàn bộ G.BN_KHONG_BE và G.BN_LUAT;
   · trường "vi" trong G.BN_TANG_SAU.
   Những mục suy ra có tính đề xuất được ghi thẳng bằng chữ
   "Đề xuất". Những mục ghi "đã có" là thứ GV.CLB trong du-lieu.js
   đã dựng sẵn, kiểm chứng được trong mã.
   Ba lưu ý về sạn nguồn: (1) trang V-C-P của bản Accelerate in
   nhầm tiêu đề thành "V.C.D" trong khi ba mục bên dưới ghi rõ
   Visibility · Credibility · Profitability; (2) tiêu đề trang ba
   Chapter Kim cương ghi "300 Thành Viên Trong 21 năm" — đơn vị
   thời gian đọc không rõ nên không chép lại; (3) bốn trang cuối
   Cẩm nang (81–84, phần Passport to Success chi tiết và phụ lục
   tái gia nhập) là ảnh, không rút được chữ.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Hành trình Accelerate — sáu chặng ────────────────────
     Bản Accelerate Journey là một tập trình chiếu kể câu chuyện
     có thật của Joey, không phải một giáo trình. Sáu chặng dưới
     đây là các mốc của chính câu chuyện ấy, theo đúng thứ tự và
     đúng số liệu trong tệp.                                      */
  G.BN_HANH_TRINH = [
    { ma: 'A1', t: 'MẮC KẸT', nam: '2008 → 2022 · Kelantan sang Thái Lan', mau: '#BE0E16',
      hoi: 'Khi mất sạch nền cũ thì còn lại cái gì?',
      lam: ['Làm tổ chức sự kiện tại Kelantan, Malaysia từ 2008',
            'Mắc kẹt tại Thái Lan 2,5 năm qua ba làn sóng đại dịch',
            'Nghe hiểu tiếng Thái nhưng không đọc được chữ Thái',
            'Quan hệ tại chỗ bằng không, bị hạn chế vì là người nước ngoài'],
      dich: ['Tài chính cạn kiệt', 'Tương lai con cái vô định'],
      cong: 'Không có cổng. Đây là điểm xuất phát bắt buộc của câu chuyện, không phải một chặng người ta chọn bước vào.',
      rui: 'Ở lại trong trạng thái này đủ lâu thì mọi mạng lưới cũ đều hết giá trị.' },

    { ma: 'A2', t: 'CHỌN HƯỚNG', nam: 'Thời điểm quyết định', mau: '#9E470D',
      hoi: 'FEAR là chữ viết tắt của cái nào trong hai cái?',
      lam: ['Đọc FEAR theo nghĩa thứ nhất: Forget Everything And Run — bỏ chạy, buông xuôi, quay về quê',
            'Đọc FEAR theo nghĩa thứ hai: Face Everything And Rise — đối mặt, vươn lên, dùng mạng lưới BNI mới',
            'Chọn nghĩa thứ hai vì đó là lựa chọn duy nhất để tồn tại'],
      dich: ['Một quyết định, không phải một kế hoạch'],
      cong: 'Chọn xong mới có chặng sau. Không chọn thì câu chuyện dừng ở A1.',
      rui: 'Hai nghĩa của FEAR nhìn từ bên trong giống hệt nhau — cả hai đều là phản ứng với cùng một nỗi sợ.' },

    { ma: 'A3', t: 'HIỆN DIỆN · VISIBILITY', nam: 'Sau khoá MSP đầu tiên', mau: '#185AB4',
      hoi: 'Làm sao để một người ngoại quốc thành công ở BNI Thái Lan?',
      lam: ['Đặt câu hỏi ấy ngay tại khoá MSP đầu tiên',
            'Nhận câu trả lời: phải TĂNG TỐC quá trình xây niềm tin, đừng chỉ làm Thành viên',
            'Nhận vai Giám đốc Mở Chapter — Launcher',
            'Bánh răng 1 của công thức Accelerate: Launch — mở Chapter để tăng số người nhìn thấy mình'],
      dich: ['Vai Launcher thay cho vai Thành viên thường',
             'Mạng lưới mở rộng tức thì thay vì giới hạn trong Chapter sở tại'],
      cong: 'Nhận vai. Bản gốc nói rõ: Visibility vô nghĩa nếu thiếu Knowledge — nên bánh răng 2 là Train, đào tạo, và bánh răng 3 là Lead, làm ban điều hành hoặc đội ngũ giám đốc.',
      rui: 'Hiện diện nhiều mà không có kiến thức vận hành thì chỉ là bị nhìn thấy, không phải được tin.' },

    { ma: 'A4', t: 'UY TÍN · CREDIBILITY', nam: 'Giai đoạn tại Thái Lan', mau: '#5140B4',
      hoi: 'Người ta tin mình vì mình nói gì hay vì mình đã dựng được cái gì?',
      lam: ['Ra mắt thành công 3 Chapter hạng Platinum tại Thái Lan, trong đó có Rise và Courage',
            'Trở thành Giám đốc BNI SR7',
            'Tương tác, cống hiến và lãnh đạo để người khác tin — đúng chữ C trong V-C-P'],
      dich: ['Uy tín được xác lập ngay lập tức với tư cách người kiến tạo, không phải tích luỹ dần qua từng buổi họp',
             'Năng lực lãnh đạo bị ép thăng hạng qua áp lực thực chiến'],
      cong: 'Có Chapter chạy được thật. Bản gốc đối chiếu thẳng: Thành viên thường xây uy tín từ từ qua từng buổi họp hằng tuần; Launcher có uy tín ngay vì đã dựng ra sân chơi.',
      rui: 'Uy tín xây bằng vai trò sẽ sụp nếu Chapter mình mở ra không sống nổi.' },

    { ma: 'A5', t: 'LỢI NHUẬN · PROFITABILITY', nam: 'Sau khi uy tín đủ lớn', mau: '#0B7350',
      hoi: 'Cơ hội kinh doanh là mục tiêu hay là hệ quả?',
      lam: ['Từ một tiệm tạp hoá nhỏ thành nhà phân phối sản phẩm Malaysia cho toàn bộ hệ thống siêu thị tại Thái Lan',
            'Mở rộng thêm thị trường tổ chức sự kiện xuyên biên giới'],
      dich: ['Cơ hội kinh doanh bùng nổ theo cấp số nhân thay vì tăng trưởng đều đặn'],
      cong: 'Bản gốc nói thẳng thứ tự nhân quả: khi niềm tin đủ lớn, cơ hội kinh doanh là kết quả TẤT YẾU. Tầm nhìn càng rộng thì lợi nhuận càng cao — P đứng sau V và C, không đứng trước.',
      rui: 'Đảo thứ tự — đi tìm P trước khi có V và C — là cách hỏng nhanh nhất của mọi mạng lưới.' },

    { ma: 'A6', t: 'NHÂN BẢN', nam: 'Tháng 6.2024 trở đi · Kelantan', mau: '#A8801F',
      hoi: 'Giúp cả vùng lớn lên thì phần mình được gì?',
      lam: ['Tháng 6.2024: một buổi cà phê với ba người chung tầm nhìn — Sulaiman Nor, Tengku Sharizani, Mat Razi',
            'Tháng 6 đến tháng 8: từ 4 lên 25 thành viên trong hai tháng',
            'Ngày 24 tháng 9: đạt 45 thành viên, từ chối dừng ở mức Platinum thông thường',
            'Ba tuần tiếp theo: chạm 100 thành viên',
            'BNI Legenda — Chapter Diamond đầu tiên trong khu vực và Chapter nói tiếng Bahasa Melayu đầu tiên trên thế giới',
            'BNI Kijang ra mắt 3,5 tháng sau đó; BNI Agong ra mắt sau 8 tháng',
            'Hỗ trợ tái cấu trúc một vùng khác từ 20 lên 60 thành viên'],
      dich: ['Ba Chapter Kim cương tại một tỉnh 1,8 triệu dân',
             'Lời mời chia sẻ tại Hội nghị Toàn cầu BNI',
             'Kết nối mạng lưới hơn 70 quốc gia với 350.000 thành viên'],
      cong: 'Bài học cốt lõi bản gốc rút ra: khi bạn giúp khu vực hoặc quốc gia của mình phát triển, cơ hội kinh doanh cá nhân của bạn cũng vươn lên tầm thế giới.',
      rui: 'Tốc độ này là ngoại lệ được kể lại, không phải chuẩn để đo một người mới. Đọc nó như một khả năng, đừng đọc như một chỉ tiêu.' }
  ];

  /* ── 2 · Các ghế trong một Chapter ────────────────────────────
     Ban điều hành theo định nghĩa của Cẩm nang gồm Chủ tịch, Phó
     Chủ tịch, Tổng Thư ký, Trưởng Ban Thành viên, Điều phối Khách
     mời, Điều phối Đào tạo Networking và Điều phối Định hướng
     Thành viên. Cẩm nang KHÔNG ghi số tháng của một nhiệm kỳ —
     cột nhiệm kỳ dưới đây nói đúng những gì nguồn nói.           */
  G.BN_VAI = [
    ['Chủ tịch',
     'Điều hành buổi họp đúng lịch trình và đúng giờ; tổ chức họp ban điều hành hằng tháng; tạo động lực cho Chapter; tương tác hằng tuần với Giám đốc Hỗ trợ. Điều hành nửa đầu Chapter Success Meeting.',
     'Theo nhiệm kỳ Ban điều hành — cẩm nang không ghi số tháng. Phải ký hợp đồng bảo mật, không trục lợi, không cạnh tranh và hoàn thành khoá đào tạo Ban điều hành trước khi nhận ghế.',
     'Buổi họp kết thúc đúng giờ; liên hệ Khách mời trong 3 ngày sau buổi họp; xác nhận Phó Chủ tịch đã nộp PALMS và báo cáo Chapter Success Meeting'],
    ['Phó Chủ tịch',
     'Quản lý Ban Thành viên; điểm danh và giữ số liệu PALMS; thực thi chính sách hiện diện; đọc báo cáo PALMS trong buổi họp; trao chứng nhận Notable Networker; điều hành nửa sau Chapter Success Meeting.',
     'Theo nhiệm kỳ Ban điều hành. Là người lãnh đạo Ban Thành viên và chịu trách nhiệm cuối cùng cho mọi việc đã phân cho các vị trí trong ban.',
     'Nộp PALMS lên BNI Connect trong 48 giờ sau mỗi buổi họp; gửi báo cáo Chapter Success Meeting cho Văn phòng BNI hằng tháng'],
    ['Tổng Thư ký',
     'Theo dõi và thu phí gia nhập, tái gia nhập, phí tham gia; quản lý lịch diễn giả trên BNI Connect; giới thiệu diễn giả; bấm giờ phần Weekly Presentation; công bố thành viên sắp hết hạn.',
     'Theo nhiệm kỳ Ban điều hành.',
     'Lịch diễn giả luôn kín 4–6 tuần tới; công bố danh sách thành viên hết hạn trong 60 ngày; tình hình tài chính Chapter báo tại Chapter Success Meeting'],
    ['Ban Thành viên',
     'Cơ quan có thẩm quyền cao nhất trong việc THỰC THI các Quy định BNI. Xét đơn vào, xét tái gia nhập, đặt thời gian thử thách, mở ngành nghề của thành viên không tuân thủ.',
     'Số vị trí luôn là số lẻ, tính cả Phó Chủ tịch. Hoạt động trên cam kết tự nguyện, gắn với từng nhiệm kỳ của Ban điều hành.',
     'Họp nhanh 10–15 phút sau mỗi buổi họp Chapter; mọi khiếu nại bằng văn bản được xử lý ngay khi nhận'],
    ['Phụ trách Chất lượng Thành viên',
     'Bảo đảm mọi thành viên mới là chuyên gia chất lượng cao và phù hợp ngành nghề: tìm kiếm trên Internet, xét đơn trực tuyến, phỏng vấn thẩm định, kiểm tra lời chứng thực, phân loại ngành nghề.',
     'Một vị trí trong Ban Thành viên, do Phó Chủ tịch phân công.',
     'Mức thẩm định của từng đơn được xác định và theo dõi; tiến độ luôn được cập nhật cho Phó Chủ tịch'],
    ['Phụ trách Gắn kết Thành viên',
     'Giữ người ở lại: theo dõi Đánh giá tháng thứ 7, hỗ trợ quy trình tái gia nhập trực tuyến, chọn ba thành viên cần kèm mỗi tháng, tiến hành coaching theo mô hình GROW.',
     'Một vị trí trong Ban Thành viên.',
     'Hằng tháng đọc Member Traffic Light theo Power of One để chỉ ra ba thành viên cần hỗ trợ'],
    ['Phụ trách Xây dựng Chapter',
     'Quản lý danh sách top 10 ngành nghề còn thiếu; gọi điện cho thành viên vắng mặt lần 2, 3, 4 trong 6 tháng liên tiếp; nhập số liệu Chapter Statistic lên BNI Connect.',
     'Một vị trí trong Ban Thành viên.',
     'Nhập Chapter Statistic chậm nhất hai ngày làm việc sau buổi họp; mỗi Contact Sphere chính có tối thiểu 8 thành viên'],
    ['Phụ trách Mối quan hệ Thành viên',
     'Nhận và xử lý khiếu nại: phỏng vấn từng bên riêng, ghi chép, đưa Ban Thành viên biểu quyết, chọn biện pháp từ coaching đến mở ngành nghề.',
     'Một vị trí trong Ban Thành viên. Nếu mâu thuẫn liên quan tới chính người trong ban thì người đó bị cắt khỏi quá trình xử lý.',
     'Khiếu nại phải bằng văn bản, phải là trải nghiệm trực tiếp, phải của một Thành viên BNI; quyết định theo đa số phiếu ban đã qua đào tạo'],
    ['Ban Khách mời',
     'Tạo ấn tượng đầu: đón, giới thiệu khách với thành viên cùng Contact Sphere, phát tài liệu, định hướng khách sau buổi họp, nhập khách vào BNI Connect, gọi lại sau buổi họp.',
     'Theo nhiệm kỳ Ban điều hành. Một Điều phối Khách mời thay mặt ban dự Chapter Success Meeting.',
     'Gọi khách đủ điều kiện trong 24 giờ sau buổi họp, tốt nhất là 2 giờ; báo cáo số khách, số đơn, tỷ lệ chuyển đổi hằng tháng'],
    ['Điều phối Đào tạo Networking',
     'Bài đào tạo 3–5 phút mỗi tuần; chọn chủ đề từ Chapter Success Meeting và báo cáo Chapter Traffic Lights; quản lý thư viện tài liệu của Chapter.',
     'Theo nhiệm kỳ Ban điều hành.',
     'Bài đào tạo có bốn phần: liên hệ công việc, vì sao quan trọng, liên kết với BNI, nguồn tham khảo'],
    ['Điều phối Định hướng Thành viên',
     'Bảo đảm thành viên mới hoàn thành Passport to Success: ghép các cuộc hẹn One-to-One với những người dạy được từng chủ đề, cấp tài liệu cho Người định hướng, theo sát tiến độ hằng tuần.',
     'Theo nhiệm kỳ Ban điều hành. Dự phần Power of One trong Chapter Success Meeting rồi mới rời phòng.',
     'Tương tác hằng tuần với từng thành viên mới; trao chứng nhận khi hoàn thành định hướng'],
    ['Người định hướng · Mentor',
     'Không phải ghế ban điều hành. Là thành viên được chọn để ngồi One-to-One với người mới theo từng chủ đề của Passport to Success, hoặc được Ban Thành viên chỉ định kèm một người đang tụt chỉ số.',
     'Được chọn theo Bảng phân công Người định hướng Thành viên, không bầu.',
     'Thành viên được kèm đi qua đủ các chủ đề Passport và ra khỏi vùng Xám']
  ];

  /* ── 3 · Lịch trình một buổi họp Chapter trực tiếp ────────────
     Nguyên văn 20 bước với mốc phút của bản họp trực tiếp
     (in-person). Cẩm nang nói rõ: lịch trình này giữ nguyên từ
     1985 và chỉ Thành viên BNI được phép dùng. Ghi ở đây để hiểu
     cơ chế, không phải để dùng lại. Ban điều hành và Ban Khách
     mời phải có mặt trước giờ họp 15 phút.                       */
  G.BN_QUY_TRINH_HOP = [
    { p: '0:00', m: 'Giao lưu mở', ai: 'Toàn bộ · Ban Khách mời dẫn khách',
      y: 'Đúng 15 phút. Củng cố quan hệ với người đã quen, bắt đầu quan hệ với người chưa quen, chủ động gặp khách. Đây là lúc đặt lịch hẹn One-to-One.' },
    { p: '0:15', m: 'Chào đón Khách mời và giới thiệu Ban Điều hành', ai: 'Chủ tịch',
      y: 'Ban điều hành đứng lên nói tên và vị trí. Khách nói tên, tên doanh nghiệp, và ai đã mời mình. Mục đích: cho khách thấy Chapter có cấu trúc và có người chịu trách nhiệm.' },
    { p: '0:16', m: 'Một giá trị cốt lõi của tuần', ai: 'Một thành viên được phân trước',
      y: 'Bảy giá trị cốt lõi luân phiên: Cho là Nhận, Xây dựng mối quan hệ, Học tập suốt đời, Truyền thống cộng Đổi mới, Thái độ tích cực, Trách nhiệm, Sự ghi nhận. Người trình bày được giao từ tuần trước.' },
    { p: '0:17', m: 'Mục đích và Tổng quan về BNI', ai: 'Một thành viên',
      y: 'Một thành viên kể BNI đã đem lại gì cho doanh nghiệp mình. Đây là chỗ khách nghe lời chứng thực từ người trong cuộc, không phải từ ban điều hành.' },
    { p: '0:18', m: 'Đào tạo kỹ năng Networking', ai: 'Điều phối Đào tạo',
      y: 'Ba đến năm phút, đúng một kỹ năng. Đại diện cho giá trị cốt lõi Học tập suốt đời. Chủ đề lấy từ vấn đề đã nhận diện ở Chapter Success Meeting.' },
    { p: '0:21', m: 'Vinh danh và khen thưởng', ai: 'Phó Chủ tịch',
      y: 'Buổi họp đầu tháng. Chứng nhận Notable Networker cho người dẫn đầu về CEU, số khách mời, số One-to-One, số referral trao đi và giá trị referral trao đi. Kèm câu hỏi vì sao họ làm tốt.' },
    { p: '0:24', m: 'Chào mừng Thành viên mới và tái gia nhập', ai: 'Chủ tịch',
      y: 'Người mới bước lên trước phòng. Cả Chapter đứng dậy đọc Quy tắc đạo đức BNI. Người mới nói vì sao gia nhập, người tái gia nhập nói vì sao ở lại. Đây là nghi thức kết nạp.' },
    { p: '0:26', m: 'Weekly Presentation — bài thuyết trình hằng tuần', ai: 'Toàn bộ thành viên',
      y: 'Mỗi người 30–60 giây: tôi là ai, tôi làm gì, tuần này tôi cần được giới thiệu tới ai. Có bấm giờ. Chapter trên 50 người rút xuống 45 giây, trên 70 người rút xuống 30 giây — nhưng không bao giờ dưới 30 giây, vì đó là quyền lợi thành viên.' },
    { p: '0:49', m: 'Khách mời tự giới thiệu', ai: 'Khách mời',
      y: 'Sau khi tất cả thành viên đã trình bày. Khách cũng bị bấm giờ. Cách nói được hướng dẫn trước: hãy đào tạo chúng tôi về doanh nghiệp của anh chị.' },
    { p: '0:51', m: 'Báo cáo của Phó Chủ tịch', ai: 'Phó Chủ tịch',
      y: 'Tối đa 2 phút, lấy từ Summary PALMS Report: referral trung bình mỗi thành viên mỗi tháng, số khách mỗi tháng, tổng referral tới nay, giá trị giao dịch thành công tháng trước và luỹ kế.' },
    { p: '0:52', m: 'Báo cáo của Ban Thành viên', ai: 'Một người trong Ban Thành viên',
      y: 'Ngành nghề đang trống, đơn đang xử lý, một quy định cần nhắc lại. Phó Chủ tịch duyệt trước nội dung. Nhấn mạnh ngành nghề của khách đang có mặt chính là ngành Chapter đang cần.' },
    { p: '0:53', m: 'Giới thiệu diễn giả', ai: 'Tổng Thư ký',
      y: 'Công bố lịch diễn giả sáu tuần tới và giới thiệu diễn giả tuần này bằng Phiếu thông tin Thành viên. Lịch thực tế phải được xếp trước 8–12 tuần.' },
    { p: '0:54', m: 'Feature Presentation — bài thuyết trình doanh nghiệp', ai: 'Một hoặc hai diễn giả',
      y: '5–10 phút. Chỉ người đã hoàn thành chương trình MSP mới được trình bày. Cả Chapter nghe với tâm thế người mới để tìm ra cơ hội cho diễn giả.' },
    { p: '1:04', m: 'Trao Cơ hội kinh doanh và Chứng thực chất lượng', ai: 'Toàn bộ, đứng',
      y: 'Phần quan trọng nhất của buổi họp, cẩm nang ghi thẳng như vậy. Mỗi người mở đầu bằng "Tuần này tôi đã đóng góp như sau", nêu số referral và số khách trước rồi mới nêu tên người nhận. Cuối phần, Chủ tịch cộng tổng và đọc to.' },
    { p: '1:22', m: 'Kiểm chứng chất lượng Referral', ai: 'Phó Chủ tịch',
      y: 'Rút hai phiếu referral của hai tuần trước và hỏi người nhận: đã gọi chưa, bên kia có sẵn sàng nhận cuộc gọi không, đây có phải cơ hội thật không. Đây là cơ chế chống báo số cho đẹp.' },
    { p: '1:24', m: 'Tri ân và tiễn Khách mời sang phần định hướng', ai: 'Chủ tịch và Ban Khách mời',
      y: 'Khách và Ban Khách mời cùng đứng lên, rồi rời sang phòng khác để được giải đáp và hướng dẫn nộp đơn. Buổi họp tạm dừng cho việc di chuyển này.' },
    { p: '1:26', m: 'Báo cáo của Tổng Thư ký', ai: 'Tổng Thư ký',
      y: 'Đọc tên những người tới hạn tái gia nhập sau 90 ngày, lấy từ Membership Dues Report. Lặp lại hằng tuần cho tới khi người đó gia hạn.' },
    { p: '1:28', m: 'Thông báo và nhắc nhở', ai: 'Chủ tịch',
      y: 'Sự kiện, chương trình đào tạo, hoạt động vùng. Kèm lời mời thành viên đã tham dự kể lại trải nghiệm.' },
    { p: '1:29', m: 'Bốc thăm trúng thưởng — tuỳ chọn', ai: 'Phó Chủ tịch',
      y: 'Dành cho người mang nhiều khách hoặc trao nhiều referral. Mỗi diễn giả mang một phần thưởng, tối thiểu 200.000 đồng. Phải có kế hoạch dự phòng phần thưởng.' },
    { p: '1:30', m: 'Kết thúc', ai: 'Chủ tịch',
      y: 'Một câu tích cực và một câu chốt cố định: "Chúng tôi sẽ gặp lại tất cả các bạn tại cuộc họp tuần tới, mà hành trình bắt đầu ngay bây giờ." Ngay sau đó là Định hướng Thành viên mới.' }
  ];

  /* ── 4 · Bộ chỉ số đo sức khoẻ Chapter ────────────────────────
     Mọi ngưỡng dưới đây đều lấy nguyên từ Cẩm nang 07.2025 hoặc
     bản Cập nhật 07.2025.                                        */
  G.BN_CHI_SO = [
    ['PALMS',
     'Điểm danh từng thành viên từng tuần: P có mặt, A vắng, L đi trễ hoặc về sớm, M nghỉ có xin phép, S có người đi thay.',
     'Phó Chủ tịch ghi tay trong buổi họp trên phiếu PALMS trống, rồi nhập BNI Connect',
     'Nộp trong 48 giờ sau buổi họp. Bản 07.2024 quy định 24 giờ; bản 07.2025 nới thành 48 giờ. Nộp trễ làm sai lệch cả Chapter Traffic Lights lẫn Power of One.'],
    ['Chính sách hiện diện',
     'Số lần vắng mặt trong 6 tháng liên tiếp tính lùi từ thời điểm xem xét.',
     'Báo cáo PALMS và Absence Report trên BNI Connect',
     'Được vắng 3 lần trong 6 tháng. Vắng lần 2 và lần 3 nhận biên bản cảnh báo. Vắng lần 4 có thể bị khai trừ ngành nghề. Cử người đi thay thì không tính là vắng.'],
    ['Chapter Traffic Lights',
     'Sức khoẻ toàn Chapter theo băng màu, gộp các chỉ số hoạt động.',
     'BNI Connect, in ra trước Chapter Success Meeting',
     'Nhìn được 6 tháng gần nhất nên khó thấy xu hướng ngắn hạn — cẩm nang yêu cầu đối chiếu thêm PALMS 3 tháng. Mục tiêu là đạt điểm tối đa hoặc dẫn đầu ở tất cả chỉ số.'],
    ['Member Traffic Lights · Power of One',
     'Sức khoẻ từng thành viên theo bốn băng: Xanh, Vàng, Đỏ, Xám.',
     'BNI Connect, đọc tại Chapter Success Meeting hằng tháng',
     'Mục tiêu là càng nhiều Xanh càng tốt. Cẩm nang bác bỏ quan niệm cho phép người mới ở mức Xám: một người đã xong MSP, làm 1–2 One-to-One mỗi tuần và dự họp đều đặn đã đạt 60 điểm, tức mức Vàng ngay.'],
    ['Tăng trưởng ròng thành viên',
     'Số người vào trừ số người ra trong tháng.',
     'Chapter Roster Report, đọc tại Chapter Success Meeting',
     'Tối thiểu +1 để giữ nguyên quy mô. Tối thiểu +2 để thực sự phát triển.'],
    ['Referral trao và nhận',
     'Số cơ hội kinh doanh trao đi, trung bình mỗi thành viên mỗi tháng và luỹ kế.',
     'Phiếu referral nhập trên BNI Connect Mobile App, đọc trong báo cáo Phó Chủ tịch hằng tuần',
     'Không có ngưỡng số tuyệt đối trong cẩm nang. Cơ chế kiểm tra chất lượng là rút hai phiếu của hai tuần trước và hỏi lại người nhận.'],
    ['TYFCB — giá trị giao dịch thành công',
     'Tiền thật đã chốt được nhờ referral, tháng trước và luỹ kế.',
     'Thành viên tự nhập trên BNI Connect',
     'Đọc công khai hằng tuần trong báo cáo Phó Chủ tịch. Đây là chỉ số kết quả, đứng cuối chuỗi Visibility – Credibility – Profitability.'],
    ['Khách mời',
     'Số khách mỗi buổi và mỗi tháng, số đơn đăng ký, tỷ lệ chuyển đổi.',
     'Cổng Khách mời trên BNI Connect; Điều phối Khách mời báo cáo hằng tháng',
     'Khách được dự tối đa 2 lần. Gọi lại trong 24 giờ, tốt nhất trong 2 giờ. Khách chưa quyết định thì mời dự lần nữa và khuyến khích rủ thêm người.'],
    ['CEU · chỉ số đào tạo',
     'Số đơn vị học tập đã hoàn thành trên BNI Business Builder.',
     'Member Training Report',
     'Là một trong năm hạng mục xét Notable Networker hằng tháng, cùng số khách, số One-to-One, số referral và giá trị referral.'],
    ['One-to-One',
     'Số cuộc gặp riêng hai người trong tuần.',
     'Phiếu One-to-One nhập trên BNI Connect',
     'Mốc tham chiếu trong định nghĩa mức Vàng của Power of One là 1–2 lượt mỗi tuần.'],
    ['Đánh giá tháng thứ 7',
     'Mức độ thành viên còn muốn ở lại, hỏi trước kỳ gia hạn nhiều tháng.',
     'Membership Dues Report chọn người, One-to-One thực hiện, ghi vào Bảng đánh giá tháng thứ 7',
     'Làm cho những người tới hạn trong 5–6 tháng tới. Câu hỏi chốt: nếu hôm nay phải quyết định gia hạn, tỷ lệ đồng ý của bạn là bao nhiêu phần trăm.'],
    ['Contact Sphere',
     'Độ phủ các nhóm ngành bổ trợ nhau trong Chapter.',
     'Bảng xác định top 10 ngành nghề qua Contact Sphere trên BNI Business Builder',
     'Mỗi Contact Sphere chính cần tối thiểu 8 thành viên; 6 Contact Sphere đủ 8 người cho quy mô 48 thành viên. Cẩm nang ghi 50–60% referral đến từ trong Contact Sphere.'],
    ['Hiện diện dữ liệu trên BNI Connect',
     'Trạng thái phí của từng thành viên.',
     'Quy tắc nghiệp vụ Hiện diện trên BNI Connect',
     'Trễ hạn sau 1 ngày; hết hạn sau 15 ngày; xoá khỏi Chapter sau 32 ngày.']
  ];

  /* ── 5 · Cơ chế tạo chiều sâu ─────────────────────────────────
     Đây là phần trả lời câu hỏi của chủ sở hữu hệ thống: thứ gì
     khiến người ta ở lại nhiều năm thay vì rời đi sau vài tháng.
     Trường "t" và "n" rút từ nguồn; trường "vi" là suy ra —
     là lý do cơ chế ấy giữ được người, không phải câu chữ của
     BNI.                                                         */
  G.BN_TANG_SAU = [
    { t: 'Kịch bản không đổi từ 1985',
      n: 'Mọi buổi họp Chapter đều chạy cùng một lịch trình từ năm 1985. Cẩm nang nói thẳng rằng vài Chapter có ý tốt muốn sửa lịch cho hợp hơn, nhưng so về số cơ hội trao được trong thời gian ngắn nhất thì không lịch nào vượt được lịch chính thức.',
      vi: 'Một cấu trúc bất biến biến buổi họp thành thói quen thân thể chứ không phải sự kiện phải cân nhắc mỗi tuần. Cái gì phải quyết định lại hằng tuần thì sẽ có tuần bị quyết định là không đi.' },
    { t: 'Ghế luân phiên có bản mô tả việc',
      n: 'Bảy ghế ban điều hành, mỗi ghế một checklist chia bốn khối: TRƯỚC buổi họp, TRONG khi họp, SAU khi họp, HÀNG THÁNG. Người nhận ghế phải ký hợp đồng bảo mật, không trục lợi, không cạnh tranh và hoàn thành khoá đào tạo Ban điều hành.',
      vi: 'Chiều sâu không đến từ việc ngồi nghe lâu, nó đến từ việc chịu trách nhiệm cho một phần của tổ chức. Một người đã cầm ghế sáu tháng không còn là khách của tổ chức nữa.' },
    { t: 'Đo công khai hằng tuần',
      n: 'PALMS ghi từng người từng tuần và nộp trong 48 giờ. Báo cáo Phó Chủ tịch đọc số trước cả Chapter mỗi tuần. Member Traffic Lights xếp từng người vào bốn băng Xanh, Vàng, Đỏ, Xám.',
      vi: 'Số công khai làm hai việc cùng lúc: người tốt được nhìn thấy, người tụt không thể tự giấu mình lâu. Đo mà không công khai thì chỉ là hồ sơ; công khai mà không đo thì chỉ là cảm tính.' },
    { t: 'Kiểm chứng ngược chất lượng',
      n: 'Mỗi tuần Phó Chủ tịch rút hai phiếu referral của hai tuần trước và hỏi người nhận đã gọi chưa, có phải cơ hội thật không.',
      vi: 'Đây là chi tiết tinh nhất của cả hệ. Không có nó, mọi bảng số đều trôi về phía báo cho đẹp trong vòng vài tháng.' },
    { t: 'Nghi thức kết nạp có lời thề',
      n: 'Thành viên mới bước lên trước phòng, cả Chapter đứng dậy cùng đọc Quy tắc đạo đức BNI, rồi người mới nói vì sao mình gia nhập. Người tái gia nhập nói vì sao mình ở lại.',
      vi: 'Một cam kết nói to trước ba mươi người khác nặng hơn hẳn một chữ ký trên đơn. Và câu hỏi dành cho người tái gia nhập biến việc gia hạn thành một lựa chọn được nói ra, không phải một khoản phí lặng lẽ.' },
    { t: 'Kèm cặp có lộ trình — Passport to Success',
      n: 'Người mới phải đi qua một chuỗi One-to-One với những thành viên dạy được từng chủ đề, do Điều phối Định hướng ghép và theo sát hằng tuần. Người kèm được chọn theo bảng phân công, không tự nhận.',
      vi: 'Ba tháng đầu quyết định người ta ở hay đi. Giao việc đón người mới cho một cái ghế có tên khiến việc đó không rơi vào khoảng trống "ai cũng nên làm nên không ai làm".' },
    { t: 'Nói chuyện trước khi người ta kịp bỏ đi',
      n: 'Đánh giá tháng thứ 7 làm với người còn 5–6 tháng nữa mới tới hạn. Người thực hiện là một thành viên Ban Thành viên có quan hệ tốt nhưng không quá thân, để dám nói mặt cần cải thiện. Câu chốt hỏi thẳng tỷ lệ phần trăm khả năng gia hạn.',
      vi: 'Đây là cơ chế chống mất người đắt giá nhất và ít tốn kém nhất: hỏi khi còn kịp sửa, chứ không phải khi người ta đã quyết định xong.' },
    { t: 'Coaching GROW thay vì kỷ luật ngay',
      n: 'Bốn bước: Goal mục tiêu, Reality thực tế, Options lựa chọn, Way Forward hướng đi. Kết thúc bằng câu hỏi thang 1–10 về mức cam kết và câu hỏi cần làm gì để lên mức 10.',
      vi: 'Trước khi có quyền phạt, tổ chức phải chứng minh mình đã thử giúp. GROW là cái khung khiến việc "đã thử giúp" trở nên kiểm chứng được chứ không phải lời nói.' },
    { t: 'Một ban dám mời người ra',
      n: 'Ban Thành viên là cơ quan có thẩm quyền cao nhất trong việc thực thi quy định. Thang xử lý có ba nấc: coaching, thời gian thử thách, mở ngành nghề. Quyết theo đa số phiếu của ban đã qua đào tạo, và phải có phê duyệt bằng văn bản của cấp trên trước khi mở ngành nghề.',
      vi: 'Chuẩn chỉ có giá trị khi có người dám dùng nó. Nhưng chi tiết đáng học không phải là quyền đuổi — mà là việc quyền ấy bị buộc đi qua ba nấc, một cuộc bỏ phiếu và một chữ ký bên ngoài.' },
    { t: 'Cuộc họp vận hành hằng tháng có nghị trình cố định',
      n: 'Chapter Success Meeting, tuần thứ nhất hoặc thứ hai mỗi tháng, 13 mục theo thứ tự cố định, bắt đầu bằng việc rà lại kế hoạch hành động tháng trước và kết thúc bằng ba khối đề xuất cho Chủ tịch, Điều phối Đào tạo và Giám đốc Hỗ trợ.',
      vi: 'Mục số 1 là mấu chốt: mọi cuộc họp mở đầu bằng việc đọc lại lời hứa của cuộc họp trước. Không có mục ấy thì các mục còn lại chỉ tạo ra kế hoạch chứ không tạo ra kết quả.' },
    { t: 'Người ra khỏi phòng theo tầng thông tin',
      n: 'Trong Chapter Success Meeting, Chủ tịch, Tổng Thư ký và Điều phối Khách mời rời phòng sau mục 6; Điều phối Định hướng rời sau mục 7. Phần còn lại chỉ Phó Chủ tịch và Ban Thành viên.',
      vi: 'Chuyện riêng của từng người chỉ được bàn ở vòng nhỏ nhất có thể. Đây là cách một tổ chức đo lường công khai mà vẫn không biến thành nơi mổ xẻ cá nhân.' },
    { t: 'Khan hiếm ghế theo ngành nghề',
      n: 'Mỗi ngành nghề chỉ một người trong một Chapter. Mỗi người chỉ được ở một Chapter và không được tham gia tổ chức nào khác có cùng cơ chế độc quyền ngành nghề.',
      vi: 'Chỗ ngồi có giới hạn thì chỗ ngồi có giá. Đây là cơ chế mạnh nhất và cũng nguy hiểm nhất trong cả mô hình, vì nó tạo cam kết bằng nỗi sợ mất chỗ.' },
    { t: 'Ghi nhận có tên, hằng tháng',
      n: 'Notable Networker trao cho người dẫn đầu năm hạng mục: CEU, số khách mời, số One-to-One, số referral trao đi, giá trị referral trao đi. Chứng chỉ được đóng khung sẵn, người nhận bước lên trước phòng.',
      vi: 'Năm hạng mục nghĩa là năm đường để trở thành người xuất sắc. Một bảng xếp hạng duy nhất chỉ tạo ra một người thắng và hai mươi người thua.' },
    { t: 'Chi hội mở chi hội',
      n: 'Bản Accelerate Journey mô tả vai Launcher — Giám đốc Mở Chapter — như con đường tăng tốc: mở Chapter thì uy tín được xác lập ngay với tư cách người kiến tạo, và năng lực lãnh đạo bị ép thăng hạng qua áp lực thực chiến.',
      vi: 'Đây là cách một tổ chức tạo ra tầng người ở lại quá năm thứ ba: cho họ một việc lớn hơn việc của chính họ. Người mở ra một đơn vị mới không rời đơn vị ấy.' }
  ];

  /* ── 6 · Đối chiếu BNI ↔ Câu lạc bộ Gen Việt ──────────────────
     Cột 1 và cột 2 rút từ nguồn. Cột 3 và cột 4 là SUY RA. Mục
     ghi "đã có" là thứ GV.CLB trong du-lieu.js đã dựng; mục ghi
     "Đề xuất" là kiến nghị của kho này, chưa có trong hệ.        */
  G.BN_DOI_CHIEU = [
    ['Động cơ tham gia',
     'Người ta đến để có khách hàng. Triết lý Givers Gain: cho đi cơ hội kinh doanh thì sẽ nhận lại cơ hội kinh doanh.',
     'Đã có. Em đến để trở thành người mình muốn trở thành. Cho đi trước vẫn giữ, nhưng thứ trao đi là cơ hội, kiến thức, một người nên quen, một việc mình làm được.',
     'Bê nguyên triết lý, đổi sạch đơn vị đo. Học sinh không có doanh thu để trao, nên nếu giữ nguyên đơn vị đo thì cả mô hình rỗng ngay tuần đầu.'],
    ['Quy mô một đơn vị',
     'Không giới hạn trần. Cẩm nang có bảng điều chỉnh riêng cho Chapter 51–70 người và 71 người trở lên, cho phép họp dài hơn 90 phút nếu Giám đốc Vùng chấp thuận.',
     'Đã có. Chi hội 24–36 thành viên, cố định 90 phút.',
     'Có trần là đúng cho học sinh. Ở quy mô 70 người, mỗi em chỉ còn 30 giây nói mỗi tuần — đủ cho một doanh nhân báo số, không đủ cho một đứa trẻ tập nói trước đám đông.'],
    ['Nhịp sinh hoạt',
     'Hằng tuần, quanh năm, thường bắt đầu 7 giờ sáng. Ba hình thức được chấp nhận: trực tiếp, trực tuyến hoàn toàn qua Zoom, và hybrid — trực tiếp buổi đầu tháng, còn lại trực tuyến.',
     'Đã có nhịp tuần và không nghỉ hè. Đề xuất bổ sung hình thức hybrid cho mùa thi và mùa hè.',
     'Giờ họp phải tránh giờ học chính khoá; hybrid giải quyết chuyện em chuyển trường, đi trại hoặc ôn thi mà vẫn giữ được mạch tuần.'],
    ['Kịch bản buổi họp',
     '20 bước có mốc phút cho bản trực tiếp, 12 bước cho bản trực tuyến. Lịch trình không được sửa và chỉ Thành viên BNI được dùng.',
     'Đã có kịch bản 90 phút chín bước riêng của Gen Việt, không sao chép lịch trình BNI.',
     'Bê nguyên NGUYÊN TẮC bất biến, không bê văn bản. Chín bước là vừa cho học sinh; hai mươi bước có mốc phút là nhịp của người đã đi làm.'],
    ['Bài nói cá nhân hằng tuần',
     'Weekly Presentation 30–60 giây: tôi là ai, tôi làm gì, tuần này tôi cần được giới thiệu tới ai. Có bấm giờ, quá giờ thì Chủ tịch đứng lên nói cảm ơn.',
     'Đã có. Vòng 45 giây: em là ai, mũi nhọn của em, tuần này em cần gì. Đứng, nhìn thẳng, không cầm giấy.',
     'Giữ nguyên cả việc bấm giờ. Nhưng cách cắt lời phải đổi: với người lớn là một câu cảm ơn, với học sinh cần một tín hiệu báo trước — cờ vàng còn 10 giây như chính cẩm nang gợi ý.'],
    ['Bài trình bày sâu',
     'Feature Presentation 5–10 phút, chỉ dành cho người đã hoàn thành chương trình MSP. Lịch diễn giả xếp trước 8–12 tuần.',
     'Đã có ghế nóng 10 phút, mỗi em tới lượt khoảng hai lần một năm.',
     'Điều kiện "phải học xong khoá nền mới được lên" nên giữ — nó biến lượt trình bày thành phần thưởng chứ không phải nghĩa vụ. Đề xuất công bố lịch ghế nóng trước 8 tuần như BNI, vì thời gian chuẩn bị mới là phần rèn thật.'],
    ['Đo lường hằng tuần',
     'PALMS năm ký tự P-A-L-M-S, nộp trong 48 giờ. Chapter Traffic Lights và Member Traffic Lights bốn băng màu.',
     'Đã có bảng số bảy cột: Có mặt, Đúng giờ, Trao cơ hội, Gặp riêng, Khách mời, Biết ơn, Phụng sự. Đã có băng màu.',
     'Cột "Biết ơn" là chỗ Gen Việt đi xa hơn nguồn: đó là cột duy nhất em không tự ghi được cho mình, nên không gian lận được. BNI không có cột tương đương.'],
    ['Chống báo số ảo',
     'Mỗi tuần rút hai phiếu referral của hai tuần trước và hỏi lại người nhận đã gọi chưa, có phải cơ hội thật không.',
     'Đề xuất — hiện Gen Việt chưa có cơ chế này. Mỗi tuần Phó chủ tịch rút hai lời trao của hai tuần trước và hỏi người nhận đã dùng được chưa.',
     'Bê được nguyên xi và nên bê sớm. Với học sinh, hỏi bằng giọng tò mò chứ không phải giọng kiểm tra: chuyện đó về sau thế nào rồi.'],
    ['Ghế lãnh đạo',
     'Bảy ghế ban điều hành, mỗi ghế một checklist bốn khối. Cẩm nang không ghi số tháng của nhiệm kỳ.',
     'Đã có bảy ghế và nhiệm kỳ 6 tháng, tối đa hai nhiệm kỳ liền; mọi thành viên phải qua ít nhất một ghế trước khi xét bậc 4.',
     'Gen Việt chốt nhiệm kỳ cứng là đúng hơn nguồn. Mục đích của BNI là Chapter chạy tốt nên giữ người giỏi ở ghế lâu cũng được; mục đích của Gen Việt là rèn người, nên ghế phải đổi tay kể cả khi người đang ngồi làm tốt.'],
    ['Gác cổng đầu vào',
     'Ban Thành viên thẩm định năm bước: tìm kiếm Internet, xét đơn trực tuyến, phỏng vấn, kiểm tra lời chứng thực, phân loại ngành nghề. Tám lý do từ chối, trong đó có "thái độ không tốt, không phù hợp với Chapter".',
     'Đã có Ban Thành viên xét đơn vào và 60 ngày thử.',
     'Bỏ hẳn bước tìm kiếm Internet và mạng xã hội — đó là điều tra một đứa trẻ. Giữ phỏng vấn và thời gian thử. Lý do từ chối phải nói được thành hành vi quan sát được, không được là "thái độ không phù hợp".'],
    ['Một mũi nhọn một người',
     'Mỗi ngành nghề chỉ một người trong một Chapter; muốn đổi ngành phải nộp đơn mới.',
     'Đã có. Mỗi hướng chuyên môn chỉ một thành viên giữ; muốn đổi mũi thì xin Ban Thành viên.',
     'Giữ được, nhưng phải giữ mềm. Ở BNI đây là độc quyền kinh tế; ở Gen Việt nó chỉ nên là "ai cũng có một sân riêng để không phải tranh nhau toả sáng". Không bao giờ được dùng nó để chặn một em khỏi thứ em thích.'],
    ['Kèm người mới',
     'Passport to Success: chuỗi One-to-One theo chủ đề, người kèm được chọn theo bảng phân công, Điều phối Định hướng theo sát hằng tuần.',
     'Đã có Trưởng ban Đào tạo, khoá nền 60 ngày và cặp đôi rèn hằng tuần.',
     'Đề xuất bổ sung một quyển hộ chiếu định hướng có ô đóng dấu cho từng chủ đề. Với học sinh, tấm hộ chiếu nhìn thấy được có sức giữ chân hơn hẳn một danh sách việc.'],
    ['Gặp riêng hai người',
     'One-to-One, mốc tham chiếu 1–2 lượt mỗi tuần trong định nghĩa mức Vàng.',
     'Đã có cặp đôi rèn: mỗi tuần một bạn khác nhau, 30 phút, có phiếu ghi lại.',
     'Bắt buộc phải mở, nhìn thấy được, và có phiếu ghi lại nộp cho ban điều hành. Ở BNI hai người lớn hẹn cà phê là chuyện riêng; ở Gen Việt mọi cuộc gặp một-một giữa hai học sinh đều phải nằm trong tầm nhìn của người lớn.'],
    ['Giữ người khỏi bỏ cuộc',
     'Đánh giá tháng thứ 7 với người còn 5–6 tháng nữa tới hạn, do người có quan hệ tốt nhưng không quá thân thực hiện. Câu chốt hỏi tỷ lệ phần trăm khả năng gia hạn.',
     'Đề xuất — hiện Gen Việt chưa có. Đặt "buổi hỏi giữa nhiệm kỳ" ở tháng thứ 3 của mỗi kỳ 6 tháng.',
     'Đây là cơ chế đáng bê nhất trong cả cẩm nang. Nhưng bỏ câu hỏi phần trăm — hỏi một đứa trẻ "bao nhiêu phần trăm em còn muốn ở lại" là đặt lên vai em một quyết định của người lớn. Hỏi thay: điều gì ở đây đang làm em thấy chán, và em muốn đổi gì.'],
    ['Xử lý người tụt chỉ số',
     'Ba nấc: coaching theo GROW, thời gian thử thách, mở ngành nghề. Mỗi nấc cần biểu quyết và phê duyệt bằng văn bản của cấp trên.',
     'Đã có phần đầu: mọi thành viên băng ĐỎ phải được chạm trong 48 giờ, gọi tên để giúp chứ không để phạt.',
     'Bê nguyên nguyên tắc ba nấc và bắt buộc có người ngoài duyệt trước nấc cuối. Nhưng nấc cuối ở Gen Việt phải luôn có Coach của Học viện và phụ huynh cùng ngồi — một chi hội học sinh không được tự quyết việc loại một bạn.'],
    ['Xử lý mâu thuẫn',
     'Khiếu nại phải bằng văn bản, phải là trải nghiệm trực tiếp. Hai người trong ban phỏng vấn riêng từng bên, ghi chép lại, không đưa thư khiếu nại cho các bên.',
     'Đề xuất — hiện Gen Việt mới có luật "không nói xấu người vắng mặt, phản biện vào việc".',
     'Quy trình phỏng vấn riêng từng bên rất đáng học. Nhưng người phỏng vấn phải là người lớn, không phải bạn cùng lứa — giao cho một học sinh vai điều tra bạn mình là đặt em vào chỗ không đứng nổi.'],
    ['Ghi nhận',
     'Notable Networker hằng tháng cho người dẫn đầu năm hạng mục khác nhau. Chứng chỉ đóng khung, người nhận bước lên trước phòng.',
     'Đã có vinh danh ba người dẫn đầu hằng tuần trong phần bảng số.',
     'Học cách chia nhiều hạng mục — năm đường thắng thay vì một. Nhưng vinh danh nên theo tháng chứ không theo tuần, và nên có hạng mục tiến bộ nhiều nhất, thứ BNI không có.'],
    ['Cuộc họp vận hành',
     'Chapter Success Meeting hằng tháng, 13 mục cố định, mở đầu bằng rà lại kế hoạch tháng trước, có cơ chế người rời phòng theo tầng thông tin.',
     'Đề xuất — Gen Việt hiện chưa mô tả cuộc họp ban điều hành hằng tháng.',
     'Bê nguyên hai chi tiết: mục số 1 là đọc lại lời hứa tháng trước, và chuyện riêng của từng em chỉ bàn ở vòng nhỏ nhất. Thêm một chi tiết nguồn không có: Coach của Học viện luôn ngồi cùng.'],
    ['Nhân bản đơn vị',
     'Vai Launcher — người mở Chapter mới. Bản Accelerate mô tả đây là con đường tăng tốc uy tín và năng lực lãnh đạo nhanh nhất.',
     'Đã có. Chi hội mở chi hội: 12 thành viên sáng lập, 4 người từ V2 trở lên, một cố vấn V5 bảo trợ, chạy thử 8 tuần rồi mới nghiệm thu.',
     'Gen Việt đặt điều kiện chặt hơn nguồn, và nên giữ như vậy. Với học sinh, mở một đơn vị mới là bài rèn lãnh đạo lớn nhất — nhưng thất bại của nó rơi lên hai mươi bạn khác, nên không được mở bằng nhiệt tình.'],
    ['Tài liệu và thương hiệu',
     'Tuân thủ thương hiệu là bắt buộc; mọi ấn phẩm phải được duyệt bằng văn bản trước khi sản xuất; ban điều hành có 3 tháng để cập nhật khi bộ nhận diện thay đổi.',
     'Đã có Bộ quy chuẩn CLB Gen Việt về trang phục, nhận diện, ngôn ngữ.',
     'Nguyên tắc kỷ luật nhận diện đáng học. Nhưng không được mượn bất kỳ dấu hiệu nào của BNI, và mọi biểu mẫu của Gen Việt phải tự soạn từ đầu.']
  ];

  /* ── 7 · Những thứ KHÔNG bê vào môi trường học đường ──────────
     Toàn bộ phần này là SUY RA. Đây là ranh giới do kho này đặt
     ra, không phải nhận định về BNI — những cơ chế dưới đây hợp
     lý với một tổ chức của người trưởng thành tự nguyện kinh
     doanh, và chỉ trở thành sai khi đặt lên một đứa trẻ.         */
  G.BN_KHONG_BE = [
    'Chỉ tiêu giới thiệu bắt buộc. Quy định chung số 6 buộc thành viên phải mang referral hoặc khách mời đến cho Chapter. Đặt chỉ tiêu ấy lên học sinh là buộc trẻ đi tuyển người, và cái em mang tới sẽ là bạn bè bị nài ép chứ không phải người thật sự muốn tham gia.',
    'Phạt bằng tiền. Cẩm nang có mức phạt tối thiểu 550.000 đồng cho chi phiếu bị trả lại và phí trễ hạn khi tái gia nhập. Không một khoản phạt tiền nào được tồn tại trong chi hội học sinh — nó chuyển gánh nặng sang phụ huynh và biến kỷ luật thành giao dịch.',
    'Ràng buộc bằng phí không hoàn lại. Phí thành viên BNI không được hoàn trả. Chi hội Gen Việt không được dùng bất kỳ khoản tiền nào để giữ chân người; một em muốn rời phải rời được mà không mất gì ngoài lời chào.',
    'Xếp hạng công khai theo một trục duy nhất. Đọc to số của từng em trước cả chi hội hằng tuần là cách tạo áp lực đồng lứa vượt ngưỡng. Công bố số theo nhóm và theo xu hướng, chỉ gọi tên khi vinh danh hoặc khi mời một em lên nhận sự giúp đỡ.',
    'Điều tra mạng xã hội ứng viên. Quy trình thẩm định của BNI có bước tìm trên Google, Facebook, LinkedIn và lưu lại ảnh chụp thông tin tiêu cực. Không được làm điều đó với một đứa trẻ, trong bất kỳ hoàn cảnh nào.',
    'Loại người vì "thái độ không tốt, không phù hợp". Đây là lý do từ chối số 8 trong cẩm nang. Với người lớn tự nguyện thì đó là quyền của tổ chức; với học sinh thì đó chính là đứa trẻ cần được ở lại nhất.',
    'Độc quyền tuyệt đối một hướng cho một người. Ở BNI nó bảo vệ sinh kế. Ở tuổi học sinh, chặn một em khỏi hướng em thích chỉ vì bạn khác đã giữ chỗ là chặn đúng thứ mình định phát triển.',
    'Cấm tham gia tổ chức tương tự. Quy định chung số 4 cấm thành viên tham gia tổ chức khác có cùng chức năng. Không được áp bất cứ điều gì giống vậy: học sinh phải được sinh hoạt Đoàn, Đội, câu lạc bộ trường và mọi nơi khác cùng lúc.',
    'Khai trừ sau bốn lần vắng. Với học sinh, vắng mặt thường là dấu hiệu của chuyện đang xảy ra ở nhà hoặc ở trường, không phải dấu hiệu thiếu cam kết. Vắng lần thứ hai là lúc gọi hỏi có chuyện gì, không phải lúc bắt đầu đếm ngược.',
    'Thư trách nhiệm ký tên tập thể. BNI quy định thư luôn ký là "Ban Thành viên", không dùng tên riêng. Với trẻ, một văn bản kỷ luật không có người chịu trách nhiệm đứng tên là một trải nghiệm bị phán xử bởi không ai cả.',
    'Người đi thay để giữ điểm danh. Cơ chế cử người đi thay để không bị tính vắng chỉ có nghĩa khi mục đích là giữ dòng cơ hội kinh doanh. Mục đích của Gen Việt là em có mặt và em được rèn — không ai rèn thay được.',
    'Buổi họp lúc 6 giờ 30 hoặc 7 giờ sáng. Cẩm nang lùi giờ bắt đầu sớm hơn khi Chapter đông lên. Học sinh cần ngủ đủ; giờ họp phải nằm ngoài giờ học và ngoài giờ ngủ, không được lấn vào cả hai.'
  ];

  /* ── 8 · Luật rút ra khi áp mô hình chi hội cho học sinh ──────
     Toàn bộ phần này là SUY RA từ việc đối chiếu ba tài liệu BNI
     với GV.CLB.                                                  */
  G.BN_LUAT = [
    'Mượn cấu trúc, không mượn động cơ. Mọi chỗ BNI đo tiền, Gen Việt đo bằng chứng trưởng thành. Bê nguyên đơn vị đo là cách hỏng nhanh nhất.',
    'Kịch bản buổi họp là bất biến, nội dung bên trong thì đổi mỗi tuần. Bốn mươi năm một lịch trình là bài học lớn nhất của nguồn.',
    'Không có số thì không có chiều sâu; không có kiểm chứng ngược thì số sẽ thành số ảo trong vòng ba tháng.',
    'Công khai xu hướng của cả chi hội, gọi tên riêng chỉ để vinh danh hoặc để giúp. Không bao giờ đọc bảng xếp hạng cá nhân từ dưới lên.',
    'Mỗi thành viên phải qua ít nhất một ghế. Ghế đổi tay theo kỳ kể cả khi người đang ngồi làm tốt — vì mục đích là rèn người, không phải vận hành trơn.',
    'Mọi ghế đều phải có bản mô tả việc chia theo trước, trong, sau và hằng tháng. Ghế không có checklist là ghế danh dự, và ghế danh dự không rèn được ai.',
    'Ba tháng đầu quyết định người ở hay đi, nên việc đón người mới phải có một cái ghế đứng tên chịu trách nhiệm.',
    'Hỏi người ta còn muốn ở lại không khi vẫn còn thời gian để sửa, đừng hỏi khi họ đã quyết định xong.',
    'Trước khi có quyền phạt, tổ chức phải chứng minh được mình đã thử giúp — bằng biên bản, không bằng lời.',
    'Việc loại một thành viên không bao giờ được quyết bởi riêng nhóm bạn cùng lứa. Phải có người lớn của Học viện và phụ huynh cùng ngồi.',
    'Mọi cuộc gặp một-một giữa hai thành viên phải ở nơi mở, nhìn thấy được, và có phiếu ghi lại.',
    'Chi hội mở chi hội, Học viện không mở chi hội. Nhưng chi hội mới chỉ được mở khi có người đã sống trong chuẩn ấy nhiều kỳ đứng ra bảo trợ.',
    'Không dùng tiền để giữ chân và không dùng tiền để phạt. Một em rời chi hội phải rời được mà không mất gì.',
    'Không bao giờ dùng lại thương hiệu, biểu mẫu hay lịch trình họp của BNI. Học viện học cơ chế và tự soạn toàn bộ văn bản của mình.'
  ];

})(window.GV = window.GV || {});
