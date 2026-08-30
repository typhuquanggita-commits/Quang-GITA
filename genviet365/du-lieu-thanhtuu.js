/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT · KHO THÀNH TỰU — DANH HIỆU, CÔNG NHẬN, VINH DANH

   BIÊN SOẠN MỚI — hệ danh hiệu này không có sẵn trong kho gốc ở
   mức chi tiết. Dựng theo chuẩn đã có của hệ, đặc biệt là chuẩn
   đầu ra bốn góc nhìn (G.CD10_CHUAN_RA) và ba tầng bằng chứng
   (G.TC_TANG_BC). Cần Hội đồng Chuyên môn duyệt.

   Khoảng trống được lấp: phần 5 của hệ mang tên "Thành tựu Gen
   Việt" nhưng đang gom ba nhóm về đo lường và bằng chứng. Chưa
   có phần thành tựu đúng nghĩa: hệ danh hiệu, chuẩn công nhận,
   hồ sơ thành tích, cách vinh danh, và cách phân biệt thành tựu
   thật với thành tích ảo.

   BA NGUYÊN LÝ BẤT BIẾN mà kho này phải phục vụ, không được phá:
   · Nâng theo bằng chứng, không theo thời gian.
   · Không có nhân tài một mùa.
   · Mọi kỳ tích phải để lại một năng lực chuyển giao được.

   Cơ chế thu hồi danh hiệu đã có sẵn ở Cấp 10 CLB và ở tuyến
   Đại sứ (G.CD10_CAP, G.TY_PIPELINE). Kho này giữ nguyên tinh
   thần ấy và mở rộng cho mọi trục danh hiệu.

   ĐÃ ĐỌC ĐỂ KHÔNG VIẾT TRÙNG: du-lieu-tincay.js (ba tầng bằng
   chứng, kiểm định), du-lieu-capdo.js (10 cấp, chuẩn đầu ra,
   bậc Pin), du-lieu-tuyen.js (danh hiệu 90 ngày, pipeline),
   du-lieu-congdong.js (nghi lễ, hệ ghi nhận 10 dấu),
   du-lieu-trainghiem.js (khoảnh khắc, cam kết dịch vụ).
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Hệ danh hiệu Gen Việt ─────────────────────────────
     Ba mươi tám danh hiệu trên bảy trục: cá nhân · nỗ lực và
     tiến bộ · đội nhóm · Ban · lớp và khối · gia đình · người
     lớn đi kèm · điểm nhượng quyền.

     Nguyên tắc đặt điều kiện: mỗi danh hiệu phải đếm được bằng
     một thứ đã tồn tại trong hệ — bảng ba màu, hộ chiếu, sổ
     ghế, biên bản dự giờ, phiếu quan sát của giáo viên chủ
     nhiệm. Không danh hiệu nào dựa trên cảm nhận của người trao.

     Cột: Mã · Danh hiệu · Cấp trao · Ai được xét ·
          Điều kiện đạt đo được · Ai xác nhận ·
          Thời hạn và có thu hồi được không                    */
  G.TT_HE_DANH_HIEU = [
    ['DH-CN-01', 'Người Giữ Nhịp', 'Chi hội · CLB', 'Thành viên từ Cấp 2 trở lên',
     'Bốn tuần liên tiếp không băng đỏ trên bảng ba màu; đi ≥ 80% buổi; nhật ký đủ 5/7 ngày mỗi tuần',
     'Coach đang kèm, đối chiếu bảng ba màu và sổ điểm danh',
     '6 tháng · thu hồi nếu hai tuần liền bỏ nhịp mà không có lý do được ghi vào sổ'],
    ['DH-CN-02', 'Người Hỏi Đúng', 'Chi hội · CLB', 'Thành viên từ Cấp 3 trở lên',
     'Sổ “Câu hỏi và Lỗi sai” đủ 12 tuần; ≥ 30 câu hỏi tự đặt; ≥ 10 lỗi được làm lại và làm đúng',
     'Giáo viên bộ môn hoặc Ban Trí Tuệ Việt chấm sổ, không phải Coach kèm',
     '12 tháng · không thu hồi, vì bằng chứng đã đóng lại và không phụ thuộc hành vi sau đó'],
    ['DH-CN-03', 'Người Làm Ra', 'Chi hội · CLB', 'Thành viên từ Cấp 4 trở lên',
     'Một sản phẩm có ít nhất 5 người dùng thật ngoài hệ; có biên bản nghiệm thu do người ngoài ký',
     'Cố vấn dự án và một Assessor không phải người kèm',
     'Vĩnh viễn · không thu hồi, trừ khi phát hiện sản phẩm do người khác làm hộ'],
    ['DH-CN-04', 'Người Cho Đi Trước', 'Chi hội · CLB', 'Mọi thành viên, kể cả Cấp 1',
     'Mười thư biết ơn từ mười người khác nhau, mỗi thư nêu một việc cụ thể có ngày tháng',
     'Ban Trái Tim Việt lưu thư gốc; Coach đối chiếu tên người viết',
     '12 tháng · thu hồi nếu phát hiện thư được xin, được đổi chác hoặc do một nhóm viết chéo'],
    ['DH-CN-05', 'Người Đứng Nói', 'Chi hội · CLB', 'Thành viên từ Cấp 3 trở lên',
     'Trình bày 10 phút trước ≥ 20 người; trả lời được 3 câu hỏi không có trong kịch bản',
     'Assessor chấm theo rubric, có mặt đại diện Ban Bản Lĩnh Việt',
     '12 tháng · không thu hồi'],
    ['DH-CN-06', 'Người Giữ Lời', 'Chi hội · CLB', 'Thành viên từ Cấp 2 trở lên',
     'Trong 12 tuần, ≥ 90% cam kết đã ký được hoàn thành đúng hạn; đếm trên sổ giao việc, không đếm bằng trí nhớ',
     'Trưởng nhóm hoặc Trưởng Ban giữ sổ giao việc',
     '6 tháng · thu hồi ngay khi tỉ lệ tụt dưới 70% trong một chu kỳ 12 tuần'],
    ['DH-CN-07', 'Người Rèn Người', 'Chi hội · CLB', 'Thành viên từ Cấp 5 trở lên',
     'Kèm một bạn đi trọn một cổng bậc; người được kèm phải thật sự đạt cổng đó',
     'Quản lý chuyên môn, căn cứ biên bản chấm của người được kèm',
     'Vĩnh viễn · không thu hồi, vì kết quả nằm ở người khác chứ không ở người nhận danh hiệu'],
    ['DH-CN-08', 'Người Ngoài Sân', 'Cụm trường', 'Thành viên từ Cấp 3 trở lên',
     'Giáo viên chủ nhiệm xác nhận bằng văn bản ≥ 3 lần được giao việc có trách nhiệm trong một học kỳ',
     'Giáo viên chủ nhiệm ký trực tiếp, phiếu không đi qua tay phụ huynh',
     '12 tháng · không thu hồi; đây là bằng chứng tầng ba, đã xảy ra ở nơi hệ không có mặt'],
    ['DH-CN-09', 'Người Sửa Sai', 'Chi hội · CLB', 'Mọi thành viên',
     'Ít nhất 3 lần tự báo lỗi trước khi bị phát hiện, và sửa xong trong 7 ngày; ghi trong sổ lỗi cá nhân',
     'Coach kèm và một thành viên Ban Phẩm Chất Việt cùng ký',
     '12 tháng · thu hồi nếu có một lần che lỗi bị phát hiện sau đó'],
    ['DH-CN-10', 'Đại sứ Gen Việt', 'Hệ thống', 'Ứng viên đã qua Cấp 9, đủ một nhiệm kỳ vai trò cấp cao',
     'F1–F4 trung bình ≥ 4.7 và không tiêu chí lõi nào dưới 4.5; có hồ sơ đào tạo, cố vấn, đóng góp hệ thống; ≥ 80% đánh giá tích cực',
     'Hội đồng Chuyên môn Học viện, có ý kiến của các CLB phối hợp',
     '1 nhiệm kỳ 9–12 tháng · thu hồi được, theo quy định giám sát đã có ở Cấp 10'],

    ['DH-TB-01', 'Người Về Lại', 'Chi hội · CLB', 'Mọi thành viên, ưu tiên người đã từng bỏ nhịp',
     'Trong 90 ngày có ≥ 3 lần đứt nhịp rồi quay lại; thời gian quay lại trung bình ≤ 3 ngày; ghi trong sổ phục hồi',
     'Coach kèm, đối chiếu sổ phục hồi và bảng ba màu',
     '6 tháng · không thu hồi; đứt nhịp thêm lần nữa không làm mất danh hiệu này'],
    ['DH-TB-02', 'Bước Dài Nhất', 'Chi hội · CLB', 'Mọi thành viên đã có bản đọc ca đầu vào',
     'Mức tăng lớn nhất của chính mình trên một trục, đo bằng hộ chiếu đầu và cuối chu kỳ 90 ngày; so với chính mình, không so với ai khác',
     'Assessor không phải người kèm, chấm hai bản hộ chiếu cạnh nhau',
     '6 tháng · không thu hồi; trao lại được cho cùng một người ở chu kỳ sau nếu lại có bước dài nhất'],
    ['DH-TB-03', 'Người Đi Đủ', 'Chi hội · CLB', 'Mọi thành viên',
     'Đi 100% buổi trong một chu kỳ 12 tuần; không xét kết quả học, không xét thứ hạng',
     'Sổ điểm danh, đối chiếu bởi Ban Khơi Dậy Việt',
     '3 tháng · thu hồi không đặt ra, vì danh hiệu chỉ nói về một chu kỳ đã khép'],
    ['DH-TB-04', 'Người Làm Việc Khó', 'Chi hội · CLB', 'Thành viên từ Cấp 3 trở lên',
     'Nhận và hoàn thành ≥ 3 việc thuộc danh mục việc ít người nhận: dọn hiện trường, trực sổ, hậu cần đêm, đón người mới',
     'Trưởng Ban Bàn Chân Việt và Trưởng Ban phụ trách việc đó',
     '12 tháng · không thu hồi'],
    ['DH-TB-05', 'Người Bắt Đầu', 'Chi hội · CLB', 'Thành viên trong 30 ngày đầu',
     'Hoàn thành trọn 30 ngày đầu và tự kể lại được ba việc mình đã làm, mỗi việc trong một câu',
     'Người dẫn em vào chi hội, nghe em kể trực tiếp',
     'Vĩnh viễn · không thu hồi; danh hiệu này cố ý đặt ngưỡng ai làm cũng đạt được'],
    ['DH-TB-06', 'Người Đứng Lại Với Bạn', 'Chi hội · CLB', 'Mọi thành viên',
     'Ở lại giúp một bạn đang tụt lại trong ≥ 8 tuần liên tiếp; bạn ấy nhích được ít nhất một mức',
     'Người được giúp xác nhận bằng phiếu riêng, Coach không đọc trước khi ký',
     '12 tháng · không thu hồi'],

    ['DH-DN-01', 'Squad Giữ Nhịp', 'Chi hội · CLB', 'Tổ nhỏ 4–8 người',
     'Cả tổ ≥ 85% chuyên cần trong 12 tuần và không thành viên nào dưới 60%',
     'Ban Khơi Dậy Việt cộng sổ điểm danh của cả tổ',
     '6 tháng · thu hồi nếu chu kỳ sau có một thành viên bị bỏ lại dưới 50%'],
    ['DH-DN-02', 'Squad Làm Ra', 'Cụm trường', 'Tổ nhỏ hoặc nhóm dự án 3–5 người',
     'Một dự án có người thụ hưởng nêu được tác động cụ thể bằng lời của chính họ; có biên bản nghiệm thu ngoài hệ',
     'Cố vấn dự án và người thụ hưởng cùng ký; Assessor kiểm tra lại một mẫu',
     'Vĩnh viễn · thu hồi nếu phát hiện người thụ hưởng được sắp đặt hoặc nhờ nói hộ'],
    ['DH-DN-03', 'Squad Học Từ Thua', 'Chi hội · CLB', 'Tổ vừa thua một cuộc thi hoặc hỏng một việc chung',
     'Tổ chức buổi mổ xẻ trong 7 ngày do đội trưởng chủ trì; rút ra một luật tổ, ghi vào sổ ghế và giữ được luật đó ≥ 8 tuần',
     'Coach ngồi dự nhưng không chủ trì; Ban Trái Tim Việt lưu biên bản',
     '12 tháng · không thu hồi'],
    ['DH-DN-04', 'Đôi Bạn Cùng Tiến', 'Chi hội · CLB', 'Hai thành viên đăng ký thành cặp',
     'Cả hai cùng nhích ít nhất một mức trong 12 tuần; có ký xác nhận chéo hằng tuần, đủ 10/12 tuần',
     'Coach kèm của cả hai, chấm chung một lần',
     '6 tháng · thu hồi nếu chỉ một người nhích còn người kia đứng yên — danh hiệu này không chia đôi được'],

    ['DH-BA-01', 'Ban Đúng Hạn', 'Chi hội · CLB', 'Một trong 12 Ban chuyên trách',
     '≥ 80% nhiệm vụ hoàn thành đúng hạn trong một nhiệm kỳ; đếm trên sổ giao việc của Ban',
     'Ban Khơi Dậy Việt đối chiếu sổ; BĐH CLB duyệt',
     '1 nhiệm kỳ · hết nhiệm kỳ thì hết hiệu lực, phải đạt lại'],
    ['DH-BA-02', 'Ban Bàn Giao Sạch', 'Chi hội · CLB', 'Ban vừa kết thúc nhiệm kỳ',
     'Hồ sơ bàn giao đủ mục; người kế nhiệm chạy được 30 ngày đầu mà phải hỏi lại người tiền nhiệm không quá 3 lần',
     'Người kế nhiệm ghi số lần hỏi vào sổ ghế; BĐH CLB xác nhận sau 30 ngày',
     'Vĩnh viễn · không thu hồi; danh hiệu ghi tên nhiệm kỳ, không ghi tên một người'],
    ['DH-BA-03', 'Ban Nuôi Người', 'Chi hội · CLB', 'Một trong 12 Ban chuyên trách',
     'Trong một nhiệm kỳ đưa được ≥ 2 thành viên lên cấp kế tiếp qua cổng chấm chính thức',
     'Quản lý chuyên môn, căn cứ biên bản lên cấp của từng người',
     '1 nhiệm kỳ · không thu hồi trong nhiệm kỳ đó'],
    ['DH-BA-04', 'Ban Giữ Chuẩn', 'Chi hội · CLB', 'Một trong 12 Ban chuyên trách',
     'Trọn nhiệm kỳ không sự cố an toàn, không vi phạm quy chuẩn hình ảnh, không phàn nàn nào quá 14 ngày chưa xử',
     'Ban Phẩm Chất Việt và sổ phàn nàn nội bộ',
     '1 nhiệm kỳ · thu hồi ngay trong nhiệm kỳ nếu có một sự cố an toàn do chủ quan'],

    ['DH-LO-01', 'Lớp Gen Việt', 'Cụm trường', 'Một lớp có giáo viên chủ nhiệm nhận đồng hành',
     'Sinh hoạt lớp chạy đủ ≥ 30/35 tuần chuyên đề trong năm học; có sổ ghi từng tuần',
     'Giáo viên chủ nhiệm ký sổ; đại diện Học viện kiểm tra ngẫu nhiên 3 tuần bất kỳ',
     '1 năm học · không thu hồi'],
    ['DH-LO-02', 'Lớp Không Bỏ Ai', 'Cụm trường', 'Một lớp đang chạy chuyên đề Gen Việt',
     'Suốt một học kỳ không học sinh nào bị để ngoài hoạt động chung; đo bằng phiếu ẩn danh của chính học sinh, không đo bằng lời giáo viên',
     'Đại diện Học viện phát và thu phiếu ẩn danh, giáo viên không cầm phiếu',
     '1 học kỳ · phải đạt lại mỗi học kỳ'],
    ['DH-LO-03', 'Khối Chuyển Giao', 'Cụm trường', 'Một khối lớp sắp kết thúc năm học',
     'Khối trên bàn giao được nội dung và người phụ trách cho khối dưới; có buổi bàn giao và biên bản có chữ ký hai bên',
     'Ban giám hiệu hoặc đại diện nhà trường, cùng đại diện Học viện',
     'Vĩnh viễn · không thu hồi'],

    ['DH-GD-01', 'Gia Đình Đồng Hành', 'Chi hội · CLB', 'Gia đình đã ký cam kết 90 ngày',
     'Ghi bảng tuần ≥ 10/12 tuần; không ghi hộ con, không làm hộ danh mục 5S',
     'Coach đối chiếu nét chữ và nội dung; con được hỏi riêng một câu xác nhận',
     '6 tháng · thu hồi nếu phát hiện người lớn ghi hộ'],
    ['DH-GD-02', 'Gia Đình Không So Sánh', 'Chi hội · CLB', 'Gia đình đang trong chu kỳ 90 ngày',
     'Trọn 90 ngày không một lần so con với con nhà khác trước mặt con; xác nhận bằng phiếu ẩn danh do chính con điền, hỏi ba lần rải trong chu kỳ',
     'Ban Trái Tim Việt thu phiếu; phụ huynh không được đọc phiếu',
     '6 tháng · thu hồi nếu một phiếu sau đó cho kết quả ngược lại'],
    ['DH-GD-03', 'Gia Đình Mở Cửa', 'Chi hội · CLB', 'Gia đình đã qua trọn một chu kỳ 90 ngày',
     'Nhận đỡ đầu nhịp cho một gia đình mới trong 90 ngày; gia đình được giúp xác nhận bằng văn bản',
     'Gia đình được giúp ký; Ban Kết Nối Việt lưu hồ sơ',
     '12 tháng · không thu hồi'],
    ['DH-GD-04', 'Gia Đình Kể Được', 'Chi hội · CLB', 'Gia đình đang trong hệ',
     'Phụ huynh kể được cụ thể một việc con làm trong tuần, ≥ 10/12 tuần; hỏi ngẫu nhiên, không báo trước, không gợi ý',
     'Người gọi hỏi là bộ phận chăm sóc, không phải Coach của con',
     '6 tháng · phải đạt lại mỗi chu kỳ'],

    ['DH-GV-01', 'Coach Đạt Chuẩn Dự Giờ', 'Học viện', 'Coach đang nhận ca',
     '≥ 16/20 ở hai kỳ dự giờ liên tiếp trong 12 tháng; không kỳ nào dưới 14',
     'Hai người dự giờ khác nhau, không ai là quản lý trực tiếp của Coach đó',
     '12 tháng · thu hồi ngay khi có một kỳ dưới 12'],
    ['DH-GV-02', 'Coach Không Bỏ Ca', 'Học viện', 'Coach đã kèm ≥ 12 tháng liên tục',
     'Trong 12 tháng không ca nào rời hệ vì lý do thuộc về người kèm; mọi ca rời đều có biên bản ghi lý do do gia đình nói',
     'Quản lý chuyên môn đọc lại toàn bộ biên bản rời hệ của Coach đó',
     '12 tháng · thu hồi khi xuất hiện một ca rời có lý do thuộc về người kèm'],
    ['DH-GV-03', 'Giáo Viên Đồng Hành', 'Cụm trường', 'Giáo viên chủ nhiệm ngoài hệ',
     'Theo dõi và xác nhận ≥ 5 học viên trong một học kỳ; nộp đủ phiếu quan sát đầu kỳ và cuối kỳ',
     'Đại diện Học viện đối chiếu phiếu; nhà trường xác nhận',
     '1 năm học · không thu hồi; danh hiệu này không kèm bất kỳ khoản chi nào để tránh xung đột lợi ích'],
    ['DH-GV-04', 'Người Rèn Coach', 'Học viện', 'Coach từ bậc cao, hoặc quản lý chuyên môn',
     'Đào tạo và đưa ≥ 2 Coach mới qua kiểm định trong 12 tháng; cả hai đạt chuẩn dự giờ ở kỳ đầu tiên',
     'Hội đồng Chuyên môn, căn cứ hồ sơ kiểm định của người được đào tạo',
     'Vĩnh viễn · không thu hồi'],

    ['DH-NQ-01', 'Điểm Đạt Chuẩn', 'Học viện', 'Điểm nhượng quyền đã qua ít nhất một năm nhiệm kỳ',
     'Điểm kiểm định ≥ 90 hai kỳ liên tiếp; không lỗi nhận diện, không lỗi nội dung lõi',
     'Đoàn kiểm định của Học viện, có ít nhất một người ngoài đoàn kỳ trước',
     '1 năm · thu hồi ngay khi một kỳ tụt dưới 85'],
    ['DH-NQ-02', 'Điểm Nuôi Nguồn', 'Học viện', 'Điểm nhượng quyền đang hoạt động',
     'Đưa ≥ 3 người tại chỗ qua chứng nhận Coach trong 12 tháng; cả ba còn đang nhận ca ở thời điểm xét',
     'Hội đồng Chuyên môn, đối chiếu danh sách Coach còn hiệu lực',
     '1 năm · không thu hồi trong năm đó'],
    ['DH-NQ-03', 'Điểm Nói Thật', 'Học viện', 'Điểm nhượng quyền đang hoạt động',
     'Báo cáo năm công bố đủ cả chỉ số đi xuống, số gia đình rời hệ và lý do; không ca thổi phồng thành tích nào bị phát hiện trong kỳ',
     'Đoàn kiểm định đối chiếu báo cáo với số liệu thô của điểm đó',
     '1 năm · thu hồi ngay và công khai nếu phát hiện một ca thổi phồng sau khi đã trao']
  ];

  /* ── 2 · Năm bậc thành tựu ─────────────────────────────────
     Không phải năm mức khen. Đây là năm mức *bằng chứng*. Một
     thành tựu nằm ở bậc nào là do bằng chứng của nó nằm ở đâu,
     không do việc đó nghe có oai hay không.

     Bậc 4 và bậc 5 là chỗ hai nguyên lý của hệ được đóng đinh:
     kỳ tích phải để lại năng lực chuyển giao được, và không có
     nhân tài một mùa.                                          */
  G.TT_BAC_THANH_TUU = [
    { m: 'T1', t: 'Được ghi',
      quyen: 'Được ghi một dòng vào hộ chiếu. Được đọc tên trong buổi sinh hoạt chi hội gần nhất.',
      ho: 'Một dòng bằng chứng có ngày, có việc, có tên người chứng kiến.',
      bang: 'Tầng một hoặc tầng hai. Người trong hệ quan sát và ghi lại. Chưa cần ai ngoài hệ biết.' },
    { m: 'T2', t: 'Được xác nhận trong hệ',
      quyen: 'Gắn dấu vào hộ chiếu. Được đề cử vào một vai trò có trách nhiệm.',
      ho: 'Hồ sơ một trang: việc gì, làm trong bao lâu, đo bằng gì, ai chứng kiến. Kèm biên bản chấm.',
      bang: 'Tầng hai. Người xác nhận không phải người kèm — đây là ranh giới giữa T1 và T2.' },
    { m: 'T3', t: 'Có người ngoài nghiệm thu',
      quyen: 'Được đưa vào trưng bày. Được dự lễ vinh danh cấp cụm. Được ghi vào hồ sơ gửi nhà trường.',
      ho: 'Biên bản nghiệm thu do người ngoài hệ ký, ghi rõ tác động cụ thể bằng lời của chính họ.',
      bang: 'Tầng ba. Việc đã xảy ra ở nơi hệ không có mặt, và có người không nhận tiền của hệ xác nhận.' },
    { m: 'T4', t: 'Để lại năng lực chuyển giao',
      quyen: 'Được kèm người khác trong đúng việc ấy. Được mở một lớp nhỏ hoặc một tiểu ban về việc ấy.',
      ho: 'Bộ tài liệu chuyển giao: cách làm viết ra được, và một người khác đã làm lại được theo tài liệu đó.',
      bang: 'Tầng ba cộng thêm một điều kiện cứng: có người thứ hai làm lại thành công. Kỳ tích không lặp lại được thì dừng ở T3.' },
    { m: 'T5', t: 'Bền qua hai mùa',
      quyen: 'Được đề cử Đại sứ hệ thống. Được mời ngồi hội đồng xét danh hiệu cho người khác.',
      ho: 'Hồ sơ hai chu kỳ liên tiếp đặt cạnh nhau, cùng bộ chỉ số, cùng cách đo, cùng người chấm khác nhau.',
      bang: 'Lặp lại qua hai chu kỳ. Đây là bậc duy nhất trả lời được câu hỏi liệu đây có phải nhân tài một mùa không.' }
  ];

  /* ── 3 · Hồ sơ thành tích của một học viên ─────────────────
     Hồ sơ này không phải để khoe. Nó là thứ học viên mang đi khi
     rời hệ, và là thứ hệ dùng để tự kiểm chính mình.

     Cột: Mục hồ sơ · Nội dung · Ai nộp · Ai xác nhận ·
          Dùng vào việc gì về sau                              */
  G.TT_HO_SO = [
    ['Trang định danh', 'Tên, ngày vào hệ, chi hội, người dẫn vào, Coach từng kèm qua các thời kỳ', 'Bộ phận hành chính', 'Quản lý chuyên môn',
     'Truy được ai chịu trách nhiệm ở từng đoạn khi cần xem lại một quyết định cũ'],
    ['Bản đọc ca đầu vào', 'Kết quả test đầu vào và tám chỉ số ngoài hệ đo trong tuần thử — dòng số nền', 'Người đánh giá đầu vào', 'Assessor không phải người sẽ dạy',
     'Là mốc so sánh duy nhất hợp lệ. Không có dòng này thì mọi con số sau đều vô nghĩa'],
    ['Bảng ba màu 90 ngày', 'Từng ngày một ô: xanh làm đủ, vàng làm thiếu, đỏ không làm', 'Học viên tự ghi', 'Coach ký cuối mỗi tuần',
     'Xét danh hiệu nhóm giữ nhịp; đọc lại khi cần biết chỗ nào con hay đứt'],
    ['Sổ phục hồi', 'Mỗi lần đứt nhịp: ngày đứt, ngày quay lại, lý do, việc đã làm để quay lại', 'Học viên tự ghi', 'Coach đọc và ký, không sửa chữ của con',
     'Xét danh hiệu Người Về Lại; là chỉ số dự báo tốt hơn chuyên cần'],
    ['Sổ Câu hỏi và Lỗi sai', 'Câu hỏi tự đặt, lỗi đã mắc, lỗi đã làm lại và làm đúng', 'Học viên tự ghi', 'Giáo viên bộ môn hoặc Ban Trí Tuệ Việt',
     'Xét danh hiệu Người Hỏi Đúng; dùng để chọn hướng học sâu về sau'],
    ['Danh mục việc đã nhận', 'Mọi việc được giao: giao ngày nào, hạn nào, xong ngày nào', 'Trưởng nhóm hoặc Trưởng Ban giữ sổ', 'Trưởng Ban ký từng kỳ',
     'Xét danh hiệu Người Giữ Lời; là bằng chứng độ tin cậy khi xét vai trò lớn hơn'],
    ['Hồ sơ dự án', 'Mô tả vấn đề, cách làm, sản phẩm, người thụ hưởng, tác động họ nói ra', 'Nhóm dự án', 'Người thụ hưởng ký, Assessor kiểm mẫu',
     'Bằng chứng tầng ba. Dùng cho hồ sơ xét học bổng, hồ sơ tuyển sinh, hồ sơ nghề'],
    ['Thư biết ơn nhận được', 'Thư gốc từ người khác, mỗi thư nêu một việc cụ thể có ngày tháng', 'Ban Trái Tim Việt lưu', 'Coach đối chiếu tên người viết',
     'Xét danh hiệu nhóm cho đi; là phần hồ sơ học viên đọc lại nhiều nhất khi nản'],
    ['Phiếu quan sát ngoài hệ', 'Ba câu hỏi cố định cho giáo viên chủ nhiệm, hỏi đầu và cuối năm học', 'Đại diện Học viện phát và thu', 'Giáo viên chủ nhiệm ký, không qua phụ huynh',
     'Bằng chứng tầng ba mạnh nhất. Dùng để kiểm tra hệ có tác động thật hay không'],
    ['Biên bản lên cấp', 'Ngày chấm, người chấm, điểm từng tiêu chí, phần chưa đạt', 'Assessor chấm', 'Quản lý chuyên môn duyệt',
     'Truy lại được vì sao một người được lên cấp; là cơ sở khi có khiếu nại'],
    ['Sổ ghế và nhiệm kỳ', 'Vai trò đã giữ, thời hạn, việc đã làm, người bàn giao và người nhận', 'Người giữ ghế tự ghi', 'Người kế nhiệm ký khi nhận bàn giao',
     'Xét danh hiệu nhóm Ban; chứng minh quyền lực có thời hạn và có bàn giao'],
    ['Sổ lỗi cá nhân', 'Lỗi tự báo, lỗi bị phát hiện, cách sửa, thời gian sửa xong', 'Học viên tự ghi', 'Coach và một thành viên Ban Phẩm Chất Việt',
     'Xét danh hiệu Người Sửa Sai; nếu sổ trống rỗng thì đó là dấu hiệu xấu, không phải dấu hiệu tốt'],
    ['Bản ghi buổi bảo vệ', 'Video hoặc biên bản buổi học viên trình bày và trả lời câu hỏi ngoài kịch bản', 'Ban Lan Tỏa Việt ghi hình khi có đồng thuận', 'Assessor chấm theo rubric',
     'Bằng chứng năng lực trình bày; dùng lại khi ứng tuyển vai trò dẫn dắt'],
    ['Danh mục người đã kèm', 'Tên người được kèm, thời gian kèm, cổng bậc họ đã qua', 'Người kèm tự ghi', 'Quản lý chuyên môn đối chiếu biên bản của người được kèm',
     'Xét danh hiệu Người Rèn Người; là điều kiện bắt buộc để lên bậc thành tựu T4'],
    ['Bộ tài liệu chuyển giao', 'Cách làm được viết ra đủ để người khác làm lại, kèm tên người đã làm lại được', 'Học viên hoặc nhóm', 'Quản lý chuyên môn xác nhận đã có người làm lại thành công',
     'Điều kiện cứng của bậc T4. Không có mục này thì kỳ tích dừng ở T3'],
    ['Trang thu hồi và khiếu nại', 'Danh hiệu từng bị thu hồi, lý do, ngày, và phần học viên trình bày lại', 'Bộ phận hành chính ghi', 'Hội đồng xét danh hiệu ký',
     'Giữ cho việc thu hồi là một thủ tục có giấy tờ chứ không phải một lời nói miệng']
  ];

  /* ── 4 · Thành tựu thật và thành tích ảo ───────────────────
     Mười hai cặp. Mỗi cặp trông giống nhau từ xa và khác hẳn khi
     lại gần. Cột "can" là cách kiểm — thường chỉ mất vài phút và
     hầu như không ai làm.                                       */
  G.TT_THAT_GIA = [
    { t: 'Sản phẩm có người dùng · Sản phẩm chỉ có ảnh chụp', mau: '#0B7350',
      dh: 'Thành tựu thật có người dùng gọi tên được. Thành tích ảo có bộ ảnh đẹp và không ai dùng lần thứ hai.',
      can: 'Hỏi: “Ai đang dùng cái này? Cho tôi số điện thoại một người.” Không có tên nào trong 30 giây thì đã rõ.',
      lam: 'Ghi vào hồ sơ dự án số người dùng thật và một câu người dùng nói ra. Không có thì để trống, không viết bù.',
      bay: 'Đừng chấm sản phẩm bằng độ đẹp của bản trình bày. Bản trình bày đẹp là kỹ năng khác, chấm riêng.' },
    { t: 'Giải có đối thủ · Giải chia đều cho ai cũng có', mau: '#BE0E16',
      dh: 'Thành tựu thật có người không đạt. Thành tích ảo là giải mà cả nhóm đều được, chỉ khác tên gọi.',
      can: 'Đếm tỉ lệ người dự và người được giải. Trên 70% được giải thì đó không còn là giải.',
      lam: 'Công bố ngưỡng trước khi thi. Ai đạt ngưỡng thì đạt, kể cả không ai đạt.',
      bay: 'Đừng đẻ thêm hạng mục để ai cũng có phần. Muốn ghi nhận người không đạt thì dùng danh hiệu nỗ lực, đừng dùng giải.' },
    { t: 'Tiến bộ đo từ số nền · Tiến bộ kể bằng tính từ', mau: '#185AB4',
      dh: 'Thành tựu thật có hai con số và một khoảng thời gian. Thành tích ảo có các chữ “tiến bộ rõ rệt”, “trưởng thành hơn hẳn”.',
      can: 'Hỏi: “Số nền là bao nhiêu, đo ngày nào, ai đo?” Không trả lời được cả ba thì chưa có tiến bộ nào được chứng minh.',
      lam: 'Bắt buộc có bản đọc ca đầu vào trước khi bắt đầu. Không có số nền thì không xét danh hiệu tiến bộ.',
      bay: 'Đừng đo lại vào lúc thuận lợi. Mốc đo phải chốt từ đầu chu kỳ và không dời.' },
    { t: 'Vai trò có bàn giao · Chức danh trên giấy', mau: '#5140B4',
      dh: 'Thành tựu thật để lại một sổ ghế người sau đọc được. Thành tích ảo để lại một dòng trong bản khai.',
      can: 'Gọi người kế nhiệm và hỏi: “Bạn phải hỏi lại người trước mấy lần trong tháng đầu?” Trên năm lần là bàn giao hỏng.',
      lam: 'Chỉ công nhận vai trò khi có biên bản bàn giao hai chiều, ký bởi cả người đi và người đến.',
      bay: 'Đừng trao danh hiệu ngay ngày hết nhiệm kỳ. Đợi 30 ngày để xem người sau có chạy được không.' },
    { t: 'Dự án có người thụ hưởng nói được tác động · Dự án có ảnh trao quà', mau: '#9E470D',
      dh: 'Thành tựu thật để lại thay đổi sau khi nhóm rút đi. Thành tích ảo kết thúc lúc chụp xong ảnh.',
      can: 'Quay lại sau 60 ngày và hỏi chính người thụ hưởng: “Từ hôm đó tới giờ có gì khác không?”',
      lam: 'Đưa mốc kiểm tra 60 ngày vào chính hồ sơ dự án, ghi từ đầu, không phải thêm về sau.',
      bay: 'Đừng để người thụ hưởng nói trước ống kính có người của hệ đứng cạnh. Câu trả lời sẽ lịch sự chứ không thật.' },
    { t: 'Kỹ năng làm lại được trước người lạ · Tiết mục tập thuộc một lần', mau: '#A8801F',
      dh: 'Thành tựu thật lặp lại được ở bối cảnh khác. Thành tích ảo chỉ chạy đúng một lần trên đúng sân khấu ấy.',
      can: 'Yêu cầu làm lại trong 7 ngày, đổi người xem, đổi câu hỏi. Chênh lệch lớn giữa hai lần là dấu hiệu.',
      lam: 'Mọi cổng chấm đều có phần hỏi ngoài kịch bản, tối thiểu ba câu.',
      bay: 'Đừng báo trước câu hỏi. Báo trước là biến bài kiểm tra thành buổi diễn tập.' },
    { t: 'Điểm tăng bền qua ba kỳ · Điểm tăng một kỳ', mau: '#0B7350',
      dh: 'Thành tựu thật là xu hướng. Thành tích ảo là một điểm dữ liệu nằm cao hơn các điểm khác.',
      can: 'Vẽ ba kỳ liên tiếp. Một đỉnh giữa hai đáy thì đó là dao động, không phải tiến bộ.',
      lam: 'Danh hiệu học tập chỉ xét trên chuỗi ba kỳ. Đây là ứng dụng trực tiếp của luật không có nhân tài một mùa.',
      bay: 'Đừng công bố một kỳ đẹp rồi im lặng ở kỳ sau. Đã công bố một kỳ thì phải công bố cả chuỗi.' },
    { t: 'Giúp người có tên và chữ ký · Số giờ tình nguyện tự khai', mau: '#185AB4',
      dh: 'Thành tựu thật có người nhận nêu được mình đã nhận gì. Thành tích ảo là một con số tổng do chính người làm khai ra.',
      can: 'Chọn ngẫu nhiên ba dòng trong bản khai và gọi cho người nhận. Ba cuộc gọi là đủ để biết.',
      lam: 'Chỉ tính giờ có chữ ký người nhận và một dòng mô tả việc. Không có chữ ký thì không tính.',
      bay: 'Đừng đặt chỉ tiêu số giờ. Đặt chỉ tiêu là bảo người ta khai cho đủ.' },
    { t: 'Thành tích của em · Thành tích người lớn làm hộ', mau: '#BE0E16',
      dh: 'Thành tựu thật thì em kể lại được từng bước, kể cả bước hỏng. Thành tích ảo thì em chỉ kể được kết quả.',
      can: 'Hỏi em ba câu: chỗ khó nhất là chỗ nào, em đã làm hỏng gì, và nếu làm lại em đổi gì. Ấp úng cả ba là dấu hiệu.',
      lam: 'Đưa ba câu này thành phần bắt buộc của mọi cổng chấm và mọi lễ vinh danh.',
      bay: 'Đừng chất vấn em trước đám đông. Hỏi riêng trước, vinh danh sau — không bao giờ ngược lại.' },
    { t: 'Danh hiệu có ngưỡng công bố trước · Danh hiệu đặt sau khi đã chọn người', mau: '#5140B4',
      dh: 'Thành tựu thật đo bằng thước có sẵn. Thành tích ảo là thước được vẽ vừa khít quanh một người.',
      can: 'Đối chiếu ngày công bố tiêu chí và ngày chọn người. Tiêu chí ra sau là hỏng.',
      lam: 'Mọi danh hiệu phải có mã, ngưỡng và người xác nhận, công bố từ đầu chu kỳ.',
      bay: 'Đừng thêm danh hiệu giữa chu kỳ vì có người xứng đáng mà chưa có mục nào hợp. Ghi nhận riêng, và đưa danh hiệu ấy vào chu kỳ sau.' },
    { t: 'Bằng chứng do người ngoài ký · Bằng chứng do hệ tự cấp cho mình', mau: '#A8801F',
      dh: 'Thành tựu thật có chữ ký của người không nhận tiền của hệ. Thành tích ảo là hệ khen chính học viên của hệ rồi mang ra ngoài kể.',
      can: 'Hỏi: “Ai ký? Người ấy có liên quan lợi ích gì với chỗ này không?”',
      lam: 'Ghi rõ tầng bằng chứng trên mọi dòng thành tích. Nhập nhèm tầng là một hình thức nói dối.',
      bay: 'Đừng dùng giấy khen nội bộ để làm bằng chứng tác động khi nói với người ngoài.' },
    { t: 'Bền qua hai mùa · Một mùa rồi biến mất', mau: '#9E470D',
      dh: 'Thành tựu thật vẫn còn ở chu kỳ sau. Thành tích ảo rực lên một kỳ rồi không ai nhắc nữa.',
      can: 'Mở lại danh sách người được vinh danh 12 tháng trước. Bao nhiêu người còn đang làm việc đó?',
      lam: 'Rà soát danh sách cũ mỗi năm một lần và công bố tỉ lệ còn duy trì, kể cả khi tỉ lệ ấy thấp.',
      bay: 'Đừng coi tỉ lệ thấp là chuyện phải giấu. Giấu nó là mất cơ hội biết mình đang trao nhầm ở đâu.' }
  ];

  /* ── 5 · Vinh danh mà không làm hỏng người được vinh danh ──
     Vinh danh sai cách gây hai hỏng hóc: đứa được khen thành đứa
     sợ mất danh hiệu, và những đứa còn lại thành khán giả. Cả hai
     đều đắt hơn cái lợi của buổi lễ.                             */
  G.TT_VINH_DANH = [
    'Không so em này với em khác trước đám đông. Mọi so sánh chỉ được đặt giữa em hôm nay và chính em ở mốc đo trước — và mốc ấy phải có số.',
    'Vinh danh *việc làm*, không vinh danh phẩm chất bẩm sinh. Nói “em giữ nhịp mười tuần liền” chứ không nói “em thông minh”, “em có tố chất”.',
    'Người được vinh danh phải tự kể được mình đã làm gì, trong không quá hai phút, không đọc giấy. Không kể được thì hoãn lễ, không phải hoãn danh hiệu.',
    'Không vinh danh cùng một người quá **hai lần trong một chu kỳ 12 tuần**, kể cả khi người ấy xứng đáng cả năm lần. Ghi vào hồ sơ, để dành cho lễ sau.',
    'Trong mỗi buổi lễ, số danh hiệu thuộc nhóm **nỗ lực và tiến bộ** không được ít hơn số danh hiệu thuộc nhóm năng lực.',
    'Người trao là người đã đi cùng, không phải người có chức vụ cao nhất trong phòng.',
    'Nói rõ *việc gì*, không chỉ đọc tên. Vinh danh không có nội dung là khen chung chung có thêm sân khấu.',
    'Nêu cả chỗ chưa xong. Một câu: “Phần em còn dở là...” — do chính em nói, không do người trao nói hộ.',
    'Không xếp hạng nhất nhì ba giữa các em trong cùng một chi hội. Ai đạt ngưỡng thì đạt, cùng lúc, đứng cùng hàng.',
    'Không gắn tiền hoặc hiện vật có giá vào danh hiệu bậc. Bậc là bằng chứng năng lực; gắn tiền vào đó phá huỷ giá trị của cả hệ hộ chiếu.',
    'Không quay phim chụp ảnh nếu chưa có đồng thuận văn bản. Rút đồng thuận thì gỡ trong 48 giờ, không hỏi lại lý do.',
    'Không dùng buổi lễ để bán hàng. Không giới thiệu gói học, không phát tờ rơi, không mời đăng ký trong khuôn khổ buổi lễ.',
    'Người không được vinh danh phải có việc để làm trong buổi lễ — đọc tên, trao, ghi biên bản, giữ cửa. Không ai chỉ ngồi nhìn.',
    'Vinh danh công khai, góp ý riêng tư. Không đảo ngược thứ tự này trong bất cứ hoàn cảnh nào.',
    'Không nhắc lại lỗi cũ của người được vinh danh trên sân khấu, kể cả theo kiểu đùa, kể cả khi em ấy đã vượt qua lỗi đó.',
    'Buổi lễ dài không quá 90 phút. Quá 90 phút thì phần cuối chỉ còn là nghi thức, và người ở phần cuối bị thiệt.',
    'Mỗi danh hiệu trao xong phải được ghi vào hộ chiếu trong 24 giờ, kèm mã danh hiệu và tên người xác nhận. Trao mà không ghi thì coi như chưa trao.',
    'Sau 12 tháng, mở lại danh sách và công bố bao nhiêu người còn duy trì việc đã được vinh danh. Công bố cả khi tỉ lệ ấy thấp.'
  ];

  /* ── 6 · Kịch bản một lễ vinh danh ─────────────────────────
     Mười tám mốc, từ hai tuần trước tới một tuần sau. Cột "ai"
     ghi vai, không ghi tên người.                               */
  G.TT_LE = [
    { p: 'D-14', m: 'Chốt danh sách đạt ngưỡng. Đối chiếu từng người với mã danh hiệu và điều kiện đã công bố từ đầu chu kỳ.',
      ai: 'Hội đồng xét danh hiệu', y: 'Danh sách chốt trước hai tuần thì không còn chỗ cho việc thêm tên vào phút cuối.' },
    { p: 'D-14', m: 'Đối chiếu chéo với danh sách đã vinh danh hai chu kỳ gần nhất. Ai đã được hai lần trong 12 tuần thì chuyển sang lễ sau.',
      ai: 'Bộ phận hành chính', y: 'Đây là chỗ luật chống lặp người được thi hành bằng giấy tờ chứ không bằng trí nhớ.' },
    { p: 'D-10', m: 'Kiểm tỉ lệ: số danh hiệu nỗ lực và tiến bộ phải ≥ số danh hiệu năng lực. Thiếu thì rà lại xem đã bỏ sót ai.',
      ai: 'Ban Tinh Thần Việt', y: 'Một buổi lễ chỉ toàn người giỏi sẵn là buổi lễ dạy phần còn lại rằng cố gắng không được tính.' },
    { p: 'D-7', m: 'Gặp riêng từng người được vinh danh. Hỏi ba câu: chỗ khó nhất, em đã làm hỏng gì, làm lại thì đổi gì.',
      ai: 'Coach đang kèm', y: 'Hỏi riêng trước để phát hiện ca người lớn làm hộ. Phát hiện ở đây thì còn kịp xử tử tế.' },
    { p: 'D-7', m: 'Cùng em soạn hai phút em sẽ nói. Em viết, người lớn chỉ hỏi lại. Không viết hộ một câu nào.',
      ai: 'Coach đang kèm', y: 'Bài do người lớn viết nghe ra ngay, và làm hỏng đúng thứ buổi lễ định chứng minh.' },
    { p: 'D-5', m: 'Thu đồng thuận hình ảnh bằng văn bản cho từng người có mặt trên sân khấu, kể cả người trao.',
      ai: 'Ban Lan Tỏa Việt', y: 'Không có đồng thuận thì không có ống kính. Không có ngoại lệ cho khách mời.' },
    { p: 'D-3', m: 'Mời người xác nhận ngoài hệ có mặt: giáo viên chủ nhiệm, người thụ hưởng dự án, người dùng sản phẩm.',
      ai: 'Ban Kết Nối Việt', y: 'Người ngoài ngồi dưới hàng ghế làm cho phần bằng chứng tầng ba có mặt thật trong phòng.' },
    { p: 'D-1', m: 'Giao việc cho toàn bộ người không được vinh danh: đọc tên, trao, ghi biên bản, đón khách, giữ cửa, quay phim.',
      ai: 'Ban Bản Lĩnh Việt', y: 'Không ai chỉ ngồi nhìn. Đây là điều khác nhau giữa một buổi lễ và một buổi diễn.' },
    { p: '00', m: 'Nghi thức chào. Cả chi hội đứng, đọc tuyên ngôn. Không lời dẫn hoa mỹ, không nhạc nền dài.',
      ai: 'Ban Văn Hóa Việt', y: 'Mở đầu ngắn thì phần dành cho các em còn nguyên.' },
    { p: '03', m: 'Công bố ngưỡng của từng danh hiệu trong lễ này, đúng như đã công bố từ đầu chu kỳ.',
      ai: 'Chủ nhiệm CLB', y: 'Đọc lại ngưỡng trước khi đọc tên là cách chứng minh thước không được vẽ quanh người.' },
    { p: '08', m: 'Trao nhóm danh hiệu nỗ lực và tiến bộ trước. Người trao là Coach đã đi cùng.',
      ai: 'Coach đang kèm', y: 'Trao trước, khi phòng còn đông và còn tập trung. Trao sau cùng là hạ giá trị bằng thứ tự.' },
    { p: '25', m: 'Mỗi người được vinh danh nói không quá hai phút, không cầm giấy. Người dẫn bấm giờ và không nhắc.',
      ai: 'Người được vinh danh', y: 'Nếu em không kể được mình đã làm gì thì danh hiệu ấy chưa nên trao.' },
    { p: '40', m: 'Trao nhóm danh hiệu năng lực cá nhân. Người trao đọc rõ việc gì, đo bằng gì, ai xác nhận.',
      ai: 'Assessor đã chấm', y: 'Ba mẩu thông tin ấy là toàn bộ khác biệt giữa vinh danh và khen chung chung.' },
    { p: '55', m: 'Trao danh hiệu đội nhóm và Ban. Cả tổ lên cùng lúc, đứng cùng hàng, không có người đứng giữa.',
      ai: 'BĐH CLB', y: 'Đứng cùng hàng vì thành tựu tổ không chia được cho một người.' },
    { p: '65', m: 'Trao danh hiệu gia đình và giáo viên đồng hành. Người trao là học viên, không phải người lớn.',
      ai: 'Đại diện học viên', y: 'Đảo chiều một lần trong buổi lễ để người lớn nhận từ tay trẻ. Điều này được nhớ lâu.' },
    { p: '75', m: 'Đọc phần chưa xong: mỗi người được vinh danh nói một câu về chỗ mình còn dở.',
      ai: 'Người được vinh danh', y: 'Phần này giữ cho buổi lễ không biến thành nơi mọi thứ đều tốt đẹp.' },
    { p: '85', m: 'Công bố tỉ lệ duy trì của danh sách vinh danh 12 tháng trước, kể cả khi tỉ lệ thấp.',
      ai: 'Quản lý chuyên môn', y: 'Nghi thức này giữ cho hệ trung thực với chính mình trước mặt cộng đồng.' },
    { p: 'D+1', m: 'Ghi toàn bộ danh hiệu vào hộ chiếu trong 24 giờ: mã, ngày, người xác nhận, tầng bằng chứng.',
      ai: 'Bộ phận hành chính', y: 'Trao mà không ghi thì coi như chưa trao. Sau một tháng không ai nhớ chính xác nữa.' },
    { p: 'D+7', m: 'Gọi cho từng người *không* được vinh danh lần này, hỏi một câu: em cần gì để lần sau đạt ngưỡng.',
      ai: 'Coach đang kèm', y: 'Đây là mốc quan trọng nhất trong cả kịch bản, và là mốc hay bị bỏ nhất.' }
  ];

  /* ── 7 · Trưng bày thành tựu ───────────────────────────────
     Cột: Hình thức · Hợp với thành tựu loại nào · Giữ bao lâu ·
          Bẫy thường gặp                                        */
  G.TT_TRUNG_BAY = [
    ['Bảng tên tại chi hội', 'Danh hiệu chu kỳ, nhóm nỗ lực và tiến bộ', 'Một chu kỳ 12 tuần, sau đó thay toàn bộ',
     'Để nguyên bảng quá một năm. Bảng cũ biến thành nơi vài cái tên đóng khung vĩnh viễn, và phần còn lại thôi nhìn'],
    ['Tủ hiện vật', 'Sản phẩm thật cầm được, có người dùng', 'Sáu tháng, rồi trả lại cho người làm ra',
     'Giữ hiện vật lại vĩnh viễn. Đồ trong tủ thuộc về người làm ra nó, không thuộc về tổ chức'],
    ['Triển lãm dự án', 'Thành tựu bậc T3 có nghiệm thu ngoài', 'Ba ngày đến hai tuần, gắn với một sự kiện cụ thể',
     'Trưng bày ảnh trao quà thay vì trưng bày tác động. Mỗi bảng phải có một câu do người thụ hưởng nói'],
    ['Hồ sơ số của học viên', 'Toàn bộ hồ sơ thành tích, mọi bậc', 'Suốt đời học viên, kể cả sau khi rời hệ',
     'Cho quá nhiều người xem. Chỉ Coach đang kèm và quản lý chuyên môn xem được; gia đình xin bản sao thì có trong 7 ngày'],
    ['Thư viện bản ghi buổi bảo vệ', 'Năng lực trình bày, bậc T2 trở lên', 'Ba năm, có đồng thuận có thời hạn',
     'Quên rằng đồng thuận có thể bị rút. Rút thì gỡ trong 48 giờ, không thương lượng'],
    ['Bản tin tuần của chi hội', 'Danh hiệu vừa trao trong tuần', 'Một tuần',
     'Đăng đi đăng lại cùng một cái tên. Một người xuất hiện quá hai lần trong sáu số liên tiếp là dấu hiệu lệch'],
    ['Tường lớp học', 'Danh hiệu lớp và khối, sản phẩm nhóm', 'Một học kỳ',
     'Xếp hạng cá nhân trên tường lớp. Tường lớp chỉ treo thành tựu tổ và thành tựu lớp'],
    ['Sổ ghế bàn giao', 'Vai trò, nhiệm kỳ, danh hiệu nhóm Ban', 'Vĩnh viễn, chuyển tay qua các nhiệm kỳ',
     'Coi sổ ghế là kỷ vật. Nó là tài liệu vận hành — người kế nhiệm phải đọc được và dùng được'],
    ['Cổng phụ huynh', 'Tiến bộ so với số nền của chính con', 'Suốt thời gian con trong hệ',
     'Xếp hạng giữa các cháu trên cổng. Không một dòng nào được so con này với con khác'],
    ['Kỷ yếu năm', 'Thành tựu bậc T4 và T5, và tỉ lệ duy trì của năm trước', 'Vĩnh viễn',
     'Chỉ in phần đẹp. Kỷ yếu phải có mục những gì chưa làm được, cùng cỡ chữ với phần còn lại']
  ];

  /* ── 8 · Chống lạm phát danh hiệu ──────────────────────────
     Danh hiệu là một loại tiền tệ nội bộ. In nhiều thì mất giá,
     và thứ mất giá theo nó là chính thứ hệ đang cố xây.        */
  G.TT_LAM_PHAT = [
    { t: 'In thêm danh hiệu để không ai buồn',
      dau: 'Số danh hiệu tăng giữa chu kỳ. Xuất hiện các mục đặt tên sau khi đã nhìn thấy người.',
      phanh: 'Danh mục danh hiệu chỉ được sửa một lần mỗi năm, bởi Hội đồng Chuyên môn, trước khi chu kỳ bắt đầu. Giữa chu kỳ thì đóng.' },
    { t: 'Hạ ngưỡng cho đủ chỉ tiêu',
      dau: 'Tỉ lệ đạt của một danh hiệu vọt lên trên 70% trong một chu kỳ.',
      phanh: 'Ngưỡng gắn với bằng chứng chứ không gắn với tỉ lệ đạt. Tỉ lệ vọt lên thì rà lại cách đo trước, đừng mừng vội.' },
    { t: 'Trao lặp cho vài gương mặt quen',
      dau: 'Cùng một nhóm nhỏ xuất hiện ở đa số buổi lễ. Bản tin tuần lặp tên.',
      phanh: 'Trần hai lần trong một chu kỳ 12 tuần cho mỗi người. Đối chiếu chéo danh sách hai chu kỳ gần nhất, làm ở mốc D-14.' },
    { t: 'Danh hiệu không có người xác nhận độc lập',
      dau: 'Cột người xác nhận ghi trùng với người kèm, hoặc ghi tên một ban chung chung.',
      phanh: 'Mọi danh hiệu từ bậc T2 trở lên bắt buộc người xác nhận khác người kèm. Ghi tên vai cụ thể, không ghi tập thể.' },
    { t: 'Gắn tiền và quà vào danh hiệu',
      dau: 'Xuất hiện phần thưởng có giá kèm theo bậc. Phụ huynh bắt đầu hỏi lần này được gì.',
      phanh: 'Cấm gắn tiền hoặc hiện vật có giá vào danh hiệu bậc. Muốn tài trợ thì tài trợ cho hoạt động, không tài trợ cho cá nhân.' },
    { t: 'Danh hiệu không bao giờ hết hạn',
      dau: 'Danh sách người mang danh hiệu chỉ dài ra, không bao giờ ngắn lại.',
      phanh: 'Mỗi danh hiệu ghi rõ thời hạn ngay ở cột thứ bảy. Hết hạn thì phải đạt lại, không tự động gia hạn.' },
    { t: 'Không ai dám thu hồi',
      dau: 'Có ca đủ điều kiện thu hồi nhưng hồ sơ để đó vì ngại va chạm.',
      phanh: 'Thu hồi là thủ tục có giấy tờ, do hội đồng quyết, không do một người quyết. Có trang thu hồi và khiếu nại trong hồ sơ để người bị thu hồi được trình bày lại.' },
    { t: 'Lễ vinh danh dài và dày',
      dau: 'Buổi lễ quá 90 phút, hoặc tổ chức dày hơn một lần mỗi 12 tuần.',
      phanh: 'Một lễ mỗi chu kỳ, tối đa 90 phút. Các ghi nhận nhỏ đưa vào sinh hoạt tuần, không đưa lên sân khấu.' },
    { t: 'Danh hiệu dùng làm công cụ bán hàng',
      dau: 'Số danh hiệu công bố ra ngoài tăng nhanh hơn số bằng chứng tầng ba.',
      phanh: 'Mọi con số danh hiệu công bố ra ngoài phải ghi kèm tầng bằng chứng và cỡ mẫu. Không ghi được thì không công bố.' },
    { t: 'Mất trí nhớ về chu kỳ trước',
      dau: 'Không ai biết người được vinh danh năm ngoái giờ còn làm việc đó hay không.',
      phanh: 'Rà soát duy trì mỗi năm một lần và công bố tỉ lệ trong lễ. Tỉ lệ dưới 50% thì dừng trao danh hiệu ấy một chu kỳ để xem lại cách đo.' }
  ];

  /* ── 9 · Luật của kho thành tựu ────────────────────────────
     Mười tám điều. Điều nào mâu thuẫn với ba nguyên lý bất biến
     của hệ thì điều ấy sai, không phải nguyên lý sai.           */
  G.TT_LUAT = [
    'Danh hiệu **nâng theo bằng chứng, không theo thời gian**. Ở lâu không phải là một điều kiện đạt, và không bao giờ được viết vào cột điều kiện.',
    'Mỗi danh hiệu phải đếm được bằng một thứ đã tồn tại trong hệ: bảng ba màu, hộ chiếu, sổ giao việc, sổ ghế, biên bản dự giờ, phiếu quan sát ngoài hệ.',
    'Mọi dòng thành tích phải ghi rõ **thuộc tầng bằng chứng nào**. Nhập nhèm tầng là một hình thức nói dối.',
    'Từ bậc T2 trở lên, **người xác nhận không được là người kèm**. Đây là luật, không phải thông lệ.',
    'Bậc T4 chỉ đạt khi **có người thứ hai làm lại được**. Kỳ tích không để lại năng lực chuyển giao thì dừng ở T3, dù nó lớn tới đâu.',
    'Bậc T5 chỉ đạt khi **lặp lại qua hai chu kỳ**. Đây là chỗ luật không có nhân tài một mùa được thi hành bằng thủ tục.',
    'Tiêu chí và ngưỡng phải **công bố trước khi chu kỳ bắt đầu**. Tiêu chí ra sau khi đã nhìn thấy người là danh hiệu hỏng.',
    'Danh mục danh hiệu sửa **một lần mỗi năm**, bởi Hội đồng Chuyên môn. Giữa chu kỳ thì đóng, kể cả khi có trường hợp xứng đáng chưa có mục.',
    'Mọi danh hiệu có **thời hạn ghi rõ** và nêu rõ có thu hồi được hay không. Không danh hiệu nào được để trống cột này.',
    'Thu hồi là **thủ tục có giấy tờ**, do hội đồng quyết, ghi vào trang thu hồi và khiếu nại. Người bị thu hồi được trình bày lại một lần.',
    'Không **gắn tiền hoặc hiện vật có giá** vào danh hiệu bậc. Bậc là bằng chứng năng lực; gắn tiền vào đó phá huỷ giá trị của cả hệ hộ chiếu.',
    'Trong mỗi lễ, số danh hiệu **nỗ lực và tiến bộ** không ít hơn số danh hiệu năng lực. Hệ này không chỉ dành cho người giỏi sẵn.',
    'Không xếp hạng nhất nhì ba giữa các thành viên cùng chi hội. Ai đạt ngưỡng thì đạt, cùng lúc.',
    'Mỗi người được vinh danh **tối đa hai lần trong một chu kỳ 12 tuần**, kiểm bằng đối chiếu chéo, không bằng trí nhớ.',
    'Danh hiệu trao xong phải **ghi vào hộ chiếu trong 24 giờ** kèm mã, ngày, người xác nhận và tầng bằng chứng. Trao mà không ghi thì coi như chưa trao.',
    'Mỗi năm **công bố tỉ lệ duy trì** của danh sách vinh danh năm trước, kể cả khi tỉ lệ ấy thấp. Dưới 50% thì dừng trao danh hiệu ấy một chu kỳ để xem lại cách đo.',
    'Danh hiệu công bố ra ngoài hệ phải kèm **cỡ mẫu** và tầng bằng chứng. Không ghi được thì không công bố.',
    'Toàn bộ kho này là **bản biên soạn mới, chưa có hiệu lực**, cho tới khi Hội đồng Chuyên môn duyệt từng mã danh hiệu và từng ngưỡng.'
  ];

})(window.GV = window.GV || {});
