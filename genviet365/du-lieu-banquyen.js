/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · BẢN QUYỀN VÀ TRIỂN KHAI TOÀN CẦU
   Phần chuẩn bị hồ sơ để xác lập quyền, trình đề án cấp quốc gia,
   và đưa hệ ra ngoài biên giới mà không loãng chất.

   LƯU Ý PHẢI ĐỌC TRƯỚC: kho này là BẢN CHUẨN BỊ, không phải tư vấn
   pháp lý. Mức phí, thời hạn và mẫu tờ khai thay đổi theo từng thời
   kỳ. Trước khi nộp bất kỳ hồ sơ nào, đối chiếu lại với cơ quan tiếp
   nhận hoặc với một đại diện sở hữu công nghiệp được cấp phép. Việc
   kho này làm được là: liệt kê đủ, không sót thứ nào, và sắp đúng
   thứ tự để không phải làm lại.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 0 · Ranh giới của tài liệu này ────────────────────────── */
  G.BQ_RANH_GIOI = [
    'Đây là **bản chuẩn bị hồ sơ**, không phải tư vấn pháp lý và không thay thế luật sư.',
    'Mức phí, lệ phí và thời hạn xử lý **thay đổi theo từng thời kỳ** — phải tra lại tại cơ quan tiếp nhận trước khi nộp.',
    'Mẫu tờ khai do cơ quan ban hành và có thể đã thay đổi. Luôn tải mẫu mới nhất từ trang chính thức, không dùng lại mẫu cũ.',
    'Việc nộp đơn nhãn hiệu nên đi qua **đại diện sở hữu công nghiệp được cấp phép** — sai một chi tiết trong danh mục hàng hoá dịch vụ có thể phải nộp lại từ đầu.',
    'Với hồ sơ ra nước ngoài, luật từng nước khác nhau đáng kể. Không suy diễn từ luật Việt Nam sang nước khác.'
  ];

  /* ── 1 · Danh mục tài sản trí tuệ ──────────────────────────── */
  G.BQ_TAI_SAN = [
    ['Sáu tập tài liệu hệ thống', 'Quyền tác giả — tác phẩm viết', 'Cục Bản quyền tác giả', 'Kiến trúc · vận hành · chuyên môn · phân quyền · thư viện · trải nghiệm', 'Đăng ký sớm nhất'],
    ['Thư viện Gen Việt — 45 chân dung', 'Quyền tác giả — tác phẩm viết', 'Cục Bản quyền tác giả', 'Phần biên soạn là sáng tạo riêng; sự kiện lịch sử thì không ai độc quyền', 'Đăng ký riêng một hồ sơ'],
    ['Phần mềm trình bày hệ thống', 'Quyền tác giả — chương trình máy tính', 'Cục Bản quyền tác giả', 'Mã nguồn và tài liệu thiết kế', 'Nộp kèm bản in mã nguồn theo hướng dẫn'],
    ['Ấn Gen Việt — dấu hiệu', 'Quyền tác giả — mỹ thuật ứng dụng · VÀ nhãn hiệu hình', 'Cục Bản quyền · Cục Sở hữu trí tuệ', 'Đăng ký cả hai đường: quyền tác giả nhanh, nhãn hiệu mạnh', 'Làm song song'],
    ['GEN VIỆT 365', 'Nhãn hiệu chữ', 'Cục Sở hữu trí tuệ', 'Nhóm 41 · 16 · 9 · 35 · 42', 'Ưu tiên số một'],
    ['HỘ CHIẾU NHÂN TÀI', 'Nhãn hiệu chữ', 'Cục Sở hữu trí tuệ', 'Nhóm 41 · 16 · 9', 'Ưu tiên hai — đây là tên dễ bị chiếm'],
    ['CHI HỘI GEN VIỆT', 'Nhãn hiệu chữ', 'Cục Sở hữu trí tuệ', 'Nhóm 41 · 35', 'Cần cho mô hình nhân rộng'],
    ['GEN ALPHA · LEADER BOOM', 'Nhãn hiệu chữ', 'Cục Sở hữu trí tuệ', 'Nhóm 41', 'Tra cứu kỹ — hai tên này dễ trùng'],
    ['THƯ VIỆN GEN VIỆT', 'Nhãn hiệu chữ', 'Cục Sở hữu trí tuệ', 'Nhóm 41 · 16 · 9', 'Đi kèm hồ sơ quyền tác giả của chính bộ sách'],
    ['Thang chấm cổng nghiệm thu chi tiết', 'Bí mật kinh doanh', 'Không đăng ký', 'Giữ bằng quy chế nội bộ và thoả thuận bảo mật', 'Không công bố bản đầy đủ'],
    ['Dữ liệu theo dõi dọc 30 năm', 'Bí mật kinh doanh · dữ liệu cá nhân', 'Không đăng ký', 'Vừa là tài sản vừa là nghĩa vụ bảo vệ', 'Mã hoá, tách kho, hai người giữ khoá'],
    ['Tên miền', 'Đăng ký tên miền', 'VNNIC và nhà đăng ký quốc tế', '.vn · .com.vn · .com · .org và các biến thể viết sai', 'Giữ trước khi công bố tên']
  ];

  /* ── 2 · Đăng ký quyền tác giả ─────────────────────────────── */
  G.BQ_QUYEN_TG = [
    { t: 'Quyền phát sinh từ lúc nào', n: 'Quyền tác giả phát sinh **tự động** kể từ khi tác phẩm được định hình dưới một hình thức vật chất nhất định — không phụ thuộc vào việc đã đăng ký hay chưa.',
      vi: 'Nghĩa là anh **đã có quyền** với sáu tập tài liệu này rồi. Đăng ký không tạo ra quyền; đăng ký tạo ra **chứng cứ**.' },
    { t: 'Vậy đăng ký để làm gì', n: 'Khi có tranh chấp, bên đã có Giấy chứng nhận **không phải chứng minh quyền của mình**; bên kia phải chứng minh ngược lại.',
      vi: 'Đây là toàn bộ giá trị của việc đăng ký. Nó chuyển gánh nặng chứng minh sang phía người xâm phạm.' },
    { t: 'Ai là tác giả, ai là chủ sở hữu', n: 'Tác giả là người trực tiếp sáng tạo. Chủ sở hữu là người có quyền tài sản — có thể là tổ chức, nếu tác phẩm được tạo ra theo nhiệm vụ được giao hoặc theo hợp đồng.',
      vi: 'Phải làm rõ **trước khi nộp**: nếu có người khác cùng biên soạn thì cần văn bản đồng ý của đồng tác giả và đồng chủ sở hữu. Thiếu giấy này là hồ sơ bị trả.' },
    { t: 'Quyền nhân thân không chuyển được', n: 'Quyền đứng tên và quyền bảo vệ sự toàn vẹn của tác phẩm gắn với tác giả, không chuyển nhượng được.',
      vi: 'Kể cả khi nhượng quyền toàn bộ cho đối tác, tên tác giả vẫn phải được ghi. Đưa điều này vào mọi hợp đồng.' },
    { t: 'Cơ quan tiếp nhận', n: 'Cục Bản quyền tác giả — Bộ Văn hoá, Thể thao và Du lịch. Có văn phòng đại diện ở Đà Nẵng và Thành phố Hồ Chí Minh.',
      vi: 'Nộp trực tiếp, qua bưu điện, hoặc trực tuyến nếu cổng dịch vụ công đang mở cho loại hình ấy.' },
    { t: 'Thời hạn xử lý', n: 'Luật quy định cấp Giấy chứng nhận trong thời hạn ngắn tính từ ngày nhận hồ sơ **hợp lệ**.',
      vi: 'Chữ “hợp lệ” là chỗ mất thời gian thật. Hồ sơ thiếu một giấy là quay lại từ đầu, nên soát kỹ hơn là nộp nhanh.' }
  ];

  G.BQ_HO_SO_TG = [
    ['Tờ khai đăng ký', 'Theo mẫu hiện hành của Cục', 'Tải mẫu mới nhất, không dùng lại mẫu cũ'],
    ['Hai bản sao tác phẩm', 'Bản in đầy đủ, đóng quyển', 'Với chương trình máy tính: theo hướng dẫn riêng về nộp mã nguồn'],
    ['Giấy tờ pháp nhân hoặc cá nhân', 'Đăng ký kinh doanh hoặc căn cước', 'Bản sao có chứng thực'],
    ['Văn bản đồng ý của đồng tác giả', 'Nếu có nhiều người sáng tạo', 'Ghi rõ phần đóng góp của từng người'],
    ['Văn bản đồng ý của đồng chủ sở hữu', 'Nếu quyền thuộc nhiều bên', 'Bỏ sót giấy này là lý do bị trả hồ sơ phổ biến nhất'],
    ['Tài liệu chứng minh quyền nộp đơn', 'Hợp đồng giao việc, quyết định giao nhiệm vụ', 'Cần khi tổ chức đứng tên chủ sở hữu'],
    ['Giấy uỷ quyền', 'Nếu nhờ người khác nộp', 'Ghi rõ phạm vi uỷ quyền'],
    ['Chứng từ nộp phí', 'Theo biểu phí hiện hành', 'Tra lại mức phí tại thời điểm nộp']
  ];

  G.BQ_DONG_DAU_TG = [
    'Trước khi nộp, **đóng dấu thời gian** cho bản hiện tại: mã băm của kho mã nguồn, ngày giờ, và một bản lưu ở nơi thứ ba.',
    'Kho mã nguồn có lịch sử ghi nhận từng lần sửa kèm ngày giờ — đây là chứng cứ về **quá trình sáng tạo**, thứ mà một bản in không có.',
    'Gửi một bản qua thư bảo đảm cho chính mình và giữ nguyên phong bì chưa mở — cách cũ, rẻ, và vẫn có giá trị tham khảo về thời điểm.',
    'Công chứng bản in nếu chuẩn bị cho tranh chấp có giá trị lớn.',
    'Ghi lại **ngày định hình** của từng tập vào một sổ riêng, kèm tên người biên soạn từng phần.',
    'Mỗi lần ban hành bản mới thì đánh số hiệu bản và giữ lại bản cũ — không xoá, không ghi đè.'
  ];

  /* ── 3 · Đăng ký nhãn hiệu ─────────────────────────────────── */
  G.BQ_NHAN_HIEU = [
    { b: '1', t: 'Tra cứu trước khi nộp', ai: 'Đại diện sở hữu công nghiệp',
      n: 'Tra trong cơ sở dữ liệu nhãn hiệu của Cục Sở hữu trí tuệ và cơ sở dữ liệu quốc tế. Tra cả nhãn hiệu **tương tự gây nhầm lẫn**, không chỉ trùng khít.',
      ra: 'Báo cáo tra cứu, và quyết định có đổi tên hay không — đổi tên ở bước này rẻ hơn ở mọi bước sau' },
    { b: '2', t: 'Chọn nhóm hàng hoá dịch vụ', ai: 'Đại diện sở hữu công nghiệp',
      n: 'Theo Bảng phân loại quốc tế Nice. Chọn hẹp thì không bảo hộ đủ; chọn rộng thì tốn phí và dễ bị phản đối. Danh mục phải mô tả đúng việc mình thật sự làm.',
      ra: 'Danh mục hàng hoá dịch vụ theo từng nhóm' },
    { b: '3', t: 'Nộp đơn', ai: 'Chủ đơn hoặc đại diện',
      n: 'Nộp tại Cục Sở hữu trí tuệ. **Ngày nộp đơn là ngày xác lập quyền ưu tiên** — nộp sớm hơn một ngày cũng có ý nghĩa nếu có người nộp trùng.',
      ra: 'Tờ khai có số đơn và ngày nộp' },
    { b: '4', t: 'Thẩm định hình thức', ai: 'Cục Sở hữu trí tuệ',
      n: 'Kiểm tra đơn có đủ và đúng thể thức không.',
      ra: 'Quyết định chấp nhận đơn hợp lệ, hoặc thông báo thiếu sót cần sửa' },
    { b: '5', t: 'Công bố đơn', ai: 'Cục Sở hữu trí tuệ',
      n: 'Đơn được công bố trên Công báo sở hữu công nghiệp. Từ lúc này bên thứ ba có thể có ý kiến phản đối.',
      ra: 'Đơn xuất hiện công khai — cũng là lúc đối thủ biết ý định của mình' },
    { b: '6', t: 'Thẩm định nội dung', ai: 'Cục Sở hữu trí tuệ',
      n: 'Xét khả năng phân biệt và khả năng gây nhầm lẫn với nhãn hiệu có trước. Đây là bước dài nhất, và thực tế thường lâu hơn thời hạn luật định.',
      ra: 'Thông báo dự định cấp, hoặc thông báo từ chối — từ chối vẫn có quyền trả lời và khiếu nại' },
    { b: '7', t: 'Cấp văn bằng', ai: 'Cục Sở hữu trí tuệ',
      n: 'Nộp phí cấp bằng. Văn bằng có hiệu lực mười năm tính từ **ngày nộp đơn**, gia hạn được nhiều lần.',
      ra: 'Giấy chứng nhận đăng ký nhãn hiệu' },
    { b: '8', t: 'Dùng và giữ', ai: 'Admin sản phẩm (R05)',
      n: 'Nhãn hiệu không được sử dụng liên tục trong thời gian luật định có thể bị đình chỉ hiệu lực. Lưu bằng chứng sử dụng: ảnh biển hiệu, ấn phẩm, hoá đơn, hợp đồng.',
      ra: 'Hồ sơ bằng chứng sử dụng, cập nhật hằng năm' }
  ];

  G.BQ_NHOM_NICE = [
    ['Nhóm 41', 'Giáo dục · đào tạo · tổ chức hoạt động huấn luyện, trại, câu lạc bộ', 'Nhóm CỐT LÕI — không được thiếu', 'Toàn bộ hoạt động huấn luyện và chi hội'],
    ['Nhóm 16', 'Ấn phẩm in · sách · sổ tay · giáo trình · biểu mẫu', 'Cần cho hộ chiếu in, sáu tập tài liệu, bộ sách Gen Việt', 'Bảo hộ tên trên bìa sách'],
    ['Nhóm 9', 'Phần mềm · ấn phẩm điện tử tải xuống · dữ liệu ghi trên vật mang tin', 'Cần cho ứng dụng và hộ chiếu số', 'Bảo hộ tên trong cửa hàng ứng dụng'],
    ['Nhóm 35', 'Quảng cáo · quản trị kinh doanh · dịch vụ hỗ trợ nhượng quyền', 'Cần cho mô hình chi hội vệ tinh và nhượng quyền', 'Không có nhóm này thì khó xử lý bên nhượng quyền trái phép'],
    ['Nhóm 42', 'Dịch vụ phần mềm không tải xuống · nền tảng trực tuyến', 'Cần nếu hộ chiếu số chạy trên nền web', 'Bổ sung khi sản phẩm số ra mắt']
  ];

  /* ── 4 · Đề án cấp quốc gia ────────────────────────────────── */
  G.BQ_DE_AN = [
    { b: '1', t: 'Xác định đúng cửa', ai: 'Giám đốc điều hành',
      n: 'Một đề án về phát triển con người trẻ có thể đi qua nhiều cửa: giáo dục, thanh niên, khoa học công nghệ, hoặc chương trình mục tiêu quốc gia. Mỗi cửa có tiêu chí và mẫu hồ sơ khác nhau.',
      ra: 'Chọn một cửa chính và một cửa dự phòng — không nộp song song cùng nội dung ở nhiều nơi' },
    { b: '2', t: 'Bám căn cứ pháp lý sẵn có', ai: 'Người soạn đề án',
      n: 'Đề án được xét dễ hơn nhiều khi nó **phục vụ một chủ trương đã có** thay vì đề xuất một chủ trương mới. Bám vào Chương trình giáo dục phổ thông 2018, Luật Trẻ em, và các chiến lược phát triển thanh niên đang hiệu lực.',
      ra: 'Mục “căn cứ pháp lý” liệt kê đúng tên và số hiệu văn bản, đã kiểm còn hiệu lực' },
    { b: '3', t: 'Ánh xạ sang chuẩn quốc gia', ai: 'Quản lý chuyên môn',
      n: 'Đây là **phần quyết định**. Hội đồng thẩm định không đọc hệ của mình bằng ngôn ngữ của mình — họ đọc bằng ngôn ngữ chuẩn quốc gia. Phải có bảng ánh xạ năm phẩm chất và mười hai trục sang phẩm chất và năng lực của Chương trình 2018.',
      ra: 'Bảng ánh xạ hai chiều, đầy đủ, không bỏ ô nào' },
    { b: '4', t: 'Đưa bằng chứng, không đưa cam kết', ai: 'Chuyên gia đánh giá',
      n: 'Hội đồng đã đọc rất nhiều đề án hứa hẹn. Thứ hiếm là số liệu thật kèm cỡ mẫu, kèm cả chỉ số chưa đạt.',
      ra: 'Báo cáo tác động có nhóm so sánh, có nêu hạn chế' },
    { b: '5', t: 'Nói rõ chi phí và ai trả', ai: 'Giám đốc điều hành',
      n: 'Đề án không nói tiền là đề án không nghiêm túc. Nêu rõ phần nào từ ngân sách, phần nào xã hội hoá, phần nào tổ chức tự lo.',
      ra: 'Dự toán ba cột và phương án nếu không được cấp ngân sách' },
    { b: '6', t: 'Có mô hình đã chạy', ai: 'Toàn hệ',
      n: 'Một chi hội chạy thật ba quý liên tiếp trên ngưỡng, có số liệu, có phụ huynh xác nhận — mạnh hơn một trăm trang lý luận.',
      ra: 'Hồ sơ mô hình điểm, mời được đoàn tới xem tận nơi' },
    { b: '7', t: 'Chuẩn bị phần bảo vệ', ai: 'Người đứng đầu',
      n: 'Bảo vệ trước hội đồng: mười lăm phút trình bày, phần còn lại là hỏi. Chuẩn bị trước năm câu khó nhất, trong đó có câu “cái này khác gì các chương trình kỹ năng sống đang có?”.',
      ra: 'Bộ trả lời năm câu khó, mỗi câu dưới chín mươi giây' }
  ];

  G.BQ_CAU_TRUC_DA = [
    ['I. Sự cần thiết', 'Vấn đề thật, có số liệu, không kể lể', 'Nêu khoảng trống mà chủ trương hiện có chưa phủ tới'],
    ['II. Căn cứ pháp lý', 'Đúng tên, đúng số hiệu, đã kiểm còn hiệu lực', 'Một văn bản hết hiệu lực làm mất tin cả hồ sơ'],
    ['III. Mục tiêu', 'Mục tiêu chung và mục tiêu cụ thể có số', 'Mục tiêu không đo được thì không phải mục tiêu'],
    ['IV. Đối tượng và phạm vi', '9–18 tuổi; phạm vi thí điểm rồi mở rộng', 'Xin phạm vi vừa sức — xin rộng quá là dấu hiệu thiếu thực tế'],
    ['V. Nội dung', 'Sáu bậc, bốn môi trường, chi hội, hộ chiếu', 'Trình bày bằng ngôn ngữ chuẩn quốc gia, không bằng thuật ngữ riêng'],
    ['VI. Ánh xạ chuẩn', 'Bảng đối chiếu với Chương trình 2018', 'Phần được đọc kỹ nhất trong cả hồ sơ'],
    ['VII. Giải pháp thực hiện', 'Đội ngũ, đào tạo, tài liệu, công nghệ, kiểm định', 'Nêu cả cơ chế kiểm soát chất lượng khi nhân rộng'],
    ['VIII. Nguồn lực và dự toán', 'Ba cột: ngân sách · xã hội hoá · tự lo', 'Kèm phương án nếu không được cấp'],
    ['IX. Hiệu quả dự kiến', 'Có chỉ số, có cách đo, có mốc thời gian', 'Nêu cả rủi ro và phanh tương ứng'],
    ['X. Tổ chức thực hiện', 'Ai làm gì, mốc nào, ai giám sát', 'Ghi rõ đơn vị chủ trì và đơn vị phối hợp'],
    ['Phụ lục', 'Sáu tập tài liệu, hồ sơ mô hình điểm, giấy chứng nhận quyền tác giả', 'Giấy chứng nhận quyền tác giả trong phụ lục làm tăng độ tin cậy đáng kể']
  ];

  /* ── 5 · Ánh xạ sang Chương trình giáo dục phổ thông 2018 ───
     Hội đồng thẩm định đọc bằng ngôn ngữ của họ, không đọc bằng
     ngôn ngữ của mình. Bảng này là cây cầu. */
  G.BQ_ANH_XA_PC = [
    ['Đức', 'Sống ngay thẳng, không lấy cái không phải của mình', 'Nhân ái · Trung thực', 'Phiếu “tôi đã giúp” có chữ ký người nhận · sổ phục hồi ghi cả lần mình sai'],
    ['Dũng', 'Dám nhận việc, dám nói thật, dám đứng ra chịu', 'Trách nhiệm · Trung thực', 'Ghế ban điều hành có nhiệm kỳ và bàn giao · biên bản mổ xẻ sau thất bại'],
    ['Trí', 'Học được, chuyển được cái học sang việc mới', 'Chăm chỉ *(và toàn bộ ba năng lực chung)*', 'Bài kiểm 24 giờ · bài chuyển bối cảnh · sản phẩm dự án'],
    ['Chủ', 'Tự chạy được một ngày của mình mà không cần ai nhắc', 'Chăm chỉ · Trách nhiệm', 'Nhật ký giữ nhịp · số lần phụ huynh phải nhắc giảm ≥60% · đường cong hỗ trợ giảm dần'],
    ['Chí', 'Muốn làm được điều gì đó cho người khác, và bền với nó', 'Yêu nước · Nhân ái · Chăm chỉ', 'Dự án cộng đồng có nghiệm thu ngoài · phản hồi của người dùng thật']
  ];

  G.BQ_ANH_XA_NL = [
    ['G1 Mục tiêu', 'Quyền sở hữu mục tiêu', 'Tự chủ và tự học', 'Goal Map do chính em viết'],
    ['G10 Định hướng nghề', 'Độ rõ của đường đi', 'Tự chủ và tự học *(nội dung giáo dục hướng nghiệp)*', 'Trải nghiệm nghề có ghi chép'],
    ['G12 Tạo giá trị', 'Tác động lên người khác', 'Giải quyết vấn đề và sáng tạo', 'Phản hồi của người dùng thật'],
    ['I3 Kỷ luật', 'Độ bền của nhịp', 'Tự chủ và tự học', 'Nhật ký · tỷ lệ giữ nhịp'],
    ['I6 Phục hồi', 'Thời gian quay lại sau vấp', 'Tự chủ và tự học', 'Sổ phục hồi'],
    ['I7 Tự chủ', 'Mức hỗ trợ còn cần', 'Tự chủ và tự học', 'Quan sát nhiều bối cảnh'],
    ['T4 Năng lực học', 'Nhớ bền và chuyển giao', 'Tự chủ và tự học', 'Bài kiểm 24 giờ · bài chuyển bối cảnh'],
    ['T5 Hiệu suất', 'Sản lượng và chất lượng', 'Giải quyết vấn đề và sáng tạo', 'Sản phẩm thật · giờ tập trung sâu'],
    ['T8 Tài năng', 'Độ khác biệt', 'Năng lực đặc thù tuỳ mũi nhọn *(ngôn ngữ · tính toán · khoa học · công nghệ · tin học · thẩm mĩ · thể chất)*', 'Thành tích trong thử thách khó'],
    ['A2 Tự quản', 'Lập kế hoạch và thực thi', 'Tự chủ và tự học', 'Độ chính xác của kế hoạch'],
    ['A9 Lãnh đạo', 'Trách nhiệm với nhóm', 'Giao tiếp và hợp tác', 'Kết quả nhóm · phản hồi đồng đội'],
    ['A11 Dự án', 'Năng lực đưa việc tới đích', 'Giải quyết vấn đề và sáng tạo · Giao tiếp và hợp tác', 'Cột mốc · sản phẩm bàn giao']
  ];

  G.BQ_ANH_XA_LUAT = [
    'Bảng ánh xạ là **cây cầu, không phải sự thay thế**. Hệ vẫn giữ ngôn ngữ riêng khi làm việc với gia đình; ngôn ngữ chuẩn quốc gia dùng khi làm việc với nhà trường và cơ quan quản lý.',
    'Không tuyên bố hệ này *thay thế* nội dung giáo dục trong nhà trường. Nó **bổ trợ**, và nói rõ điều đó ở mọi hồ sơ.',
    'Mọi trục đều phải ánh xạ được về ít nhất một năng lực trong chuẩn quốc gia. Trục nào không ánh xạ được thì phải giải thích được vì sao nó vẫn cần.',
    'Ba năng lực chung của Chương trình 2018 — tự chủ và tự học, giao tiếp và hợp tác, giải quyết vấn đề và sáng tạo — đều được phủ. Kiểm lại điều này mỗi lần sửa khung năng lực.',
    'Bảy năng lực đặc thù được phủ qua **trục T8 Tài năng**, tuỳ mũi nhọn của từng em — không hứa phủ đều bảy năng lực cho mọi học viên.'
  ];

  /* ── 6 · Ra quốc tế ───────────────────────────────────────── */
  G.BQ_QUOC_TE = [
    { t: 'Quyền tác giả — Công ước Berne', n: 'Việt Nam là thành viên. Tác phẩm được bảo hộ **tự động** tại các nước thành viên, không cần đăng ký ở từng nước.',
      vi: 'Nghĩa là sáu tập tài liệu đã được bảo hộ ở phần lớn thế giới. Vấn đề không phải có quyền hay không, mà là **chứng minh được** khi cần.' },
    { t: 'Nhãn hiệu — Nghị định thư Madrid', n: 'Nộp **một đơn** qua Cục Sở hữu trí tuệ, chỉ định nhiều nước cùng lúc, dựa trên đơn hoặc đăng ký cơ sở tại Việt Nam.',
      vi: 'Rẻ hơn nhiều so với nộp riêng từng nước. Nhưng phụ thuộc vào đơn cơ sở trong năm năm đầu — đơn cơ sở bị huỷ thì đăng ký quốc tế đổ theo.' },
    { t: 'Nhãn hiệu — nộp trực tiếp từng nước', n: 'Với nước không thuộc Madrid, hoặc thị trường trọng điểm cần bảo hộ chắc.',
      vi: 'Đắt hơn nhưng độc lập với đơn cơ sở. Cân nhắc cho thị trường đầu tiên ngoài Việt Nam.' },
    { t: 'Nguyên tắc nộp trước', n: 'Phần lớn các nước áp dụng nguyên tắc **ai nộp trước người đó được** với nhãn hiệu, không phải ai dùng trước.',
      vi: 'Đây là lý do phải nộp ở một thị trường **trước khi** truyền thông về việc sẽ vào thị trường đó.' },
    { t: 'Tên quốc tế', n: 'Giữ nguyên **GEN VIỆT 365** làm tên chính thức, kèm dòng giải nghĩa tiếng Anh *“Vietnamese Gene 365 — a talent development operating system”*.',
      vi: 'Không dịch tên. Chữ “Việt” có dấu là một phần của nhận diện; ở nơi không gõ được dấu thì dùng *GEN VIET 365* và ghi chú cách viết đúng.' },
    { t: 'Tên miền', n: 'Giữ trước khi công bố: bản .vn và .com.vn, bản quốc tế, và **các biến thể viết sai** thường gặp.',
      vi: 'Tên miền rẻ hơn kiện tụng vài trăm lần. Mua trước, không mua sau.' }
  ];

  G.BQ_BAN_DIA = [
    { t: 'Tầng 1 · Dịch nguyên', mau: '#185AB4',
      dh: 'Phần không phụ thuộc văn hoá: khung năng lực, quy trình, cổng nghiệm thu, biểu mẫu, luật an toàn.',
      can: 'Dịch chính xác, thuật ngữ nhất quán, có bảng đối chiếu thuật ngữ.',
      lam: 'Dịch bởi người biết nghề, không dịch bởi người chỉ biết ngôn ngữ. Rồi cho một Coach bản địa đọc lại.',
      bay: 'Đừng dịch tên riêng của hệ: hộ chiếu nhân tài, chi hội, sáu bậc — giữ nguyên kèm giải nghĩa.' },
    { t: 'Tầng 2 · Thích ứng', mau: '#0B6675',
      dh: 'Phần phụ thuộc bối cảnh: ví dụ, tình huống, nghi lễ, cách nói với phụ huynh, mô hình hợp tác nhà trường.',
      can: 'Giữ nguyên *mục đích*, đổi *hình thức*. Nghi thức trao hộ chiếu phải còn; cách trao có thể khác.',
      lam: 'Người bản địa đề xuất, hội đồng chuẩn duyệt. Ghi lại lý do đổi vào Sổ Chuẩn.',
      bay: 'Đừng bỏ nghi lễ vì “ở đây người ta không quen”. Bỏ nghi lễ là bỏ phần giữ người.' },
    { t: 'Tầng 3 · Tái tạo', mau: '#A8801F',
      dh: 'Phần chỉ đúng với Việt Nam: **Thư viện Gen Việt** — 45 chân dung người Việt.',
      can: 'Không dịch để dùng cho trẻ nước khác. Với cộng đồng người Việt xa xứ thì giữ nguyên và tăng phần bản sắc.',
      lam: 'Với nước sở tại: mời họ **tự biên soạn bộ của họ** theo đúng bảy nguyên tắc biên soạn của mình. Đây là cách xuất khẩu phương pháp, không xuất khẩu nội dung.',
      bay: 'Đừng thay Nguyễn Trãi bằng một danh nhân nước khác trong cùng một quyển. Làm thế là làm hỏng cả hai.' }
  ];

  G.BQ_TUAN_THU = [
    ['Việt Nam', 'Luật Trẻ em · pháp luật về bảo vệ dữ liệu cá nhân đang hiệu lực', 'Đồng thuận của cha mẹ; quyền xem, sửa, xoá; thông báo khi rò rỉ', 'Rà lại văn bản đang hiệu lực tại thời điểm triển khai — lĩnh vực này thay đổi nhanh'],
    ['Liên minh châu Âu', 'GDPR', 'Tuổi tự đồng thuận 13–16 tuỳ nước; cơ sở pháp lý cho từng mục đích; quyền mang dữ liệu đi', 'Cần người đại diện trong EU nếu không có cơ sở tại đó'],
    ['Hoa Kỳ', 'COPPA cho trẻ dưới 13 · FERPA khi hợp tác trường công', 'Đồng thuận cha mẹ có thể xác minh được — chuẩn cao hơn Việt Nam đáng kể', 'Không thu dữ liệu trẻ dưới 13 nếu chưa có quy trình xác minh đạt chuẩn'],
    ['Anh', 'UK GDPR · Age Appropriate Design Code', 'Thiết kế mặc định phải bảo vệ trẻ — áp cả cho giao diện, không chỉ cho dữ liệu', 'Cổng phụ huynh và hộ chiếu số phải rà lại theo bộ quy tắc này'],
    ['Singapore · ASEAN', 'PDPA và luật tương đương', 'Đồng thuận, hạn chế mục đích, thông báo vi phạm', 'Thường gần với chuẩn Việt Nam hơn — thị trường vào dễ hơn EU và Mỹ'],
    ['Chung mọi nơi', 'Lý lịch tư pháp người tiếp xúc trẻ', 'Bắt buộc ở mọi thị trường, tên gọi khác nhau', 'Không có ngoại lệ vì lý do thiếu người hay khác biệt pháp lý']
  ];

  G.BQ_LO_TRINH = [
    { ma: 'Q1', t: 'Vững ở Việt Nam', nam: '2026 – 2029', mau: '#185AB4',
      hoi: 'Mô hình đã chạy được ba quý liên tiếp trên ngưỡng chưa?',
      lam: ['Xác lập xong quyền tác giả sáu tập và nhãn hiệu năm nhóm chính',
            'Một chi hội điểm đạt ngưỡng bền ba quý liên tiếp, có số liệu tác động',
            'Trình đề án cấp quốc gia, có bảng ánh xạ chuẩn',
            'Giữ tên miền quốc tế trước khi nói về quốc tế'],
      dich: ['Giấy chứng nhận quyền tác giả', 'Văn bằng nhãn hiệu nhóm 41', 'Ba mươi chi hội'],
      cong: 'Có bằng chứng tác động ở tầng ba, và có ít nhất hai người đủ chuẩn mở chi hội mới',
      rui: 'Ra quốc tế trước khi vững trong nước — lỗi phổ biến nhất và đắt nhất' },
    { ma: 'Q2', t: 'Cộng đồng người Việt xa xứ', nam: '2029 – 2034', mau: '#0B6675',
      hoi: 'Thư viện Gen Việt có giữ được gốc cho trẻ sinh ra ở nước ngoài không?',
      lam: ['Chọn ba điểm có cộng đồng đông và có người sẵn sàng đứng ra',
            'Giữ nguyên Thư viện Gen Việt, tăng phần bản sắc và tiếng Việt',
            'Nộp nhãn hiệu qua Madrid cho các nước ấy trước khi công bố',
            'Rà toàn bộ dữ liệu theo luật sở tại'],
      dich: ['Ba chi hội ngoài nước', 'Đăng ký quốc tế qua Madrid', 'Bản song ngữ sáu tập'],
      cong: 'Một chi hội ngoài nước tự vận hành được một năm không cần người từ Việt Nam sang',
      rui: 'Cộng đồng xa xứ rất khác nhau giữa các nước — không dùng chung một cách tiếp cận' },
    { ma: 'Q3', t: 'ASEAN', nam: '2034 – 2042', mau: '#0B7350',
      hoi: 'Phương pháp có chạy được với trẻ không phải người Việt không?',
      lam: ['Mời nước sở tại tự biên soạn bộ chân dung của họ theo bảy nguyên tắc',
            'Đào tạo Coach bản địa theo chuẩn K1–K7, kiểm định bởi hội đồng gốc',
            'Ngoại kiểm hằng năm do người ngoài hệ và ngoài nước ấy thực hiện'],
      dich: ['Ba nước ASEAN', 'Ba bộ chân dung bản địa', 'Chuẩn Coach được công nhận'],
      cong: 'Một nước ngoài Việt Nam đưa được người của mình qua cổng B5',
      rui: 'Loãng chất. Phanh: kiểm định sáu tháng một lần và quyền thu hồi tên trong ba mươi ngày' },
    { ma: 'Q4', t: 'Toàn cầu', nam: '2042 – 2056', mau: '#A8801F',
      hoi: 'Hệ có sống được khi người dựng ra nó không còn tham gia không?',
      lam: ['Chuyển quyền giữ chuẩn sang một hội đồng có người của nhiều nước',
            'Công bố dữ liệu theo dõi dọc ba mươi năm cho giới nghiên cứu',
            'Mở phương pháp, giữ chuẩn — mô hình dùng được nhưng bậc vẫn do hội đồng cấp'],
      dich: ['Hội đồng Chuẩn đa quốc gia', 'Dữ liệu 30 năm được công bố', 'Khoá đầu tiên tròn 30 năm'],
      cong: 'Hệ số tự tái tạo ≥ 1: mỗi người được rèn đưa được ít nhất một người tiếp theo qua B3',
      rui: 'Đây là chặng hệ dễ mất linh hồn nhất. Phanh duy nhất: bảy nguyên lý ở lớp L0' }
  ];

  /* ── 7 · Chống xâm phạm ───────────────────────────────────── */
  G.BQ_CHONG = [
    { t: 'Cấp 1 · Dùng nhầm, không cố ý', dau: 'Một trường hoặc một cá nhân dùng tài liệu của mình mà không ghi nguồn, không thu tiền.',
      phanh: 'Một thư nhã nhặn, kèm bản chính thức và lời mời hợp tác. Phần lớn dừng ở đây, và nhiều trường hợp thành đối tác.' },
    { t: 'Cấp 2 · Sao chép có thu tiền', dau: 'Một trung tâm dạy theo tài liệu của mình, thu học phí, không xin phép.',
      phanh: 'Thu thập bằng chứng có ngày giờ trước khi liên hệ. Thư yêu cầu chấm dứt từ luật sư. Nêu rõ số Giấy chứng nhận quyền tác giả.' },
    { t: 'Cấp 3 · Chiếm tên', dau: 'Một bên nộp đơn nhãn hiệu trùng hoặc tương tự, hoặc đăng ký tên miền của mình.',
      phanh: 'Phản đối đơn trong thời hạn công bố — đây là lý do phải theo dõi Công báo sở hữu công nghiệp hằng tháng. Với tên miền: theo cơ chế giải quyết tranh chấp tên miền.' },
    { t: 'Cấp 4 · Mạo danh', dau: 'Một bên tự xưng là chi hội, đối tác hoặc đơn vị được uỷ quyền của mình.',
      phanh: 'Thông báo công khai danh sách đơn vị được uỷ quyền chính thức, cập nhật thường xuyên. Đây là biện pháp rẻ nhất và hiệu quả nhất.' },
    { t: 'Cấp 5 · Xâm phạm gây hại cho trẻ', dau: 'Một bên dùng tên của mình để tổ chức hoạt động thiếu an toàn cho trẻ.',
      phanh: 'Xử lý ngay và công khai. Đây là cấp duy nhất mà lợi ích thương mại không được cân nhắc — thông báo cho cơ quan chức năng trước, xử lý pháp lý sau.' }
  ];

  G.BQ_BANG_CHUNG = [
    'Giữ sẵn **bản lưu có ngày giờ** của mọi bản tài liệu đã ban hành — số hiệu bản, ngày, người ban hành.',
    'Lịch sử kho mã nguồn là chứng cứ về quá trình sáng tạo. Không xoá lịch sử, không viết lại lịch sử.',
    'Chụp màn hình vi phạm phải có **ngày giờ và địa chỉ nhìn thấy được** trong ảnh; lưu thêm bản lưu trang.',
    'Theo dõi Công báo sở hữu công nghiệp hằng tháng để phát hiện đơn trùng trong thời hạn phản đối.',
    'Đặt cảnh báo tự động cho tên hệ và tên sản phẩm trên công cụ tìm kiếm.',
    'Danh sách đơn vị được uỷ quyền công bố công khai và cập nhật — người muốn kiểm tra phải kiểm được trong một phút.',
    'Mọi hợp đồng đối tác và nhượng quyền phải có điều khoản **thu hồi quyền dùng tên trong ba mươi ngày** và điều khoản về quyền nhân thân của tác giả.'
  ];

})(window.GV = window.GV || {});
