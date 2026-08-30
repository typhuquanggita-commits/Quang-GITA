/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · MẬT MÃ GEN VIỆT

   BIÊN SOẠN MỚI — lớp sản phẩm để đời và hệ mật mã không có trong
   kho gốc. Tên nhân vật, chiến tích và mô thức giữ nguyên theo
   `du-lieu-thuvien.js`. Cần Hội đồng Chuyên môn duyệt, và cần một
   người có chuyên môn sử học rà lại phần niên đại và sử liệu trước
   khi đưa vào dạy.

   KHOẢNG TRỐNG KHO NÀY LẤP. Thư viện Gen Việt có 45 chân dung trong
   sáu quyển, mỗi chân dung có `viec` (chiến tích) và `mothuc` (tư duy
   để đời). Chủ sở hữu hệ thống yêu cầu ba trục: chiến tích — sản phẩm
   — tư duy. Trục thứ hai chưa có ở đâu cả. Kho này viết trục ấy, rồi
   rút từ 45 đời người một hệ mười hai MẬT MÃ lặp lại — thứ mà một
   học sinh dùng lại được trong tuần, chứ không chỉ nghe xong thấy hay.

   LUẬT TRUNG THỰC ĐÃ ÁP KHI VIẾT KHO NÀY:
   · Không bịa niên đại, tên tác phẩm, số liệu trận đánh, trích dẫn
     nguyên văn. Chỗ nào không chắc thì viết ở mức khái quát đúng
     thay vì cụ thể sai.
   · Chỗ nào là truyền thuyết hoặc còn tranh luận thì ghi rõ ngay
     trong chính ô ấy, không đẩy xuống chú thích.
   · Không thêm nhân vật nào ngoài 45 người đã có trong `TV_Q1`…`TV_Q6`.
   · Cột “sản phẩm để đời” chỉ nhận thứ chỉ ra được: một cuốn sách,
     một bộ luật, một công trình, một trường phái, một định chế, một
     phương pháp, một giống cây. Không nhận “tinh thần yêu nước”.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · BỐN MƯƠI LĂM SẢN PHẨM ĐỂ ĐỜI ─────────────────────────
     bang 5 ô: [nhân vật, quyển, sản phẩm hoặc di sản để đời,
     hôm nay còn thấy ở đâu, em dùng lại được gì ngay tuần này].
     Tên và quyển khớp đúng TV_Q1…TV_Q6. Đủ 45 dòng.            */
  G.MM_SAN_PHAM = [

    /* ── Quyển 1 · Giữ nước · 8 dòng ── */
    ['Ngô Quyền', 'Q1 · Giữ nước',
      'Trận địa cọc dưới lòng sông Bạch Đằng — một lối đánh thành khuôn mẫu, được đời sau dùng lại ở chính khúc sông ấy.',
      'Các bãi cọc gỗ đã được khai quật ở vùng cửa sông Bạch Đằng, thuộc Quảng Ninh và Hải Phòng, cọc hiện vật đang trưng bày tại bảo tàng. Lưu ý: niên đại từng bãi và việc gắn bãi nào với trận nào là việc của khảo cổ học, kho này không kết luận thay. Đền thờ Ngô Quyền ở Đường Lâm, Hà Nội.',
      'Trước một việc đang thua, hỏi trước: địa hình của việc này là gì, mình đổi chỗ đánh được không.'],

    ['Lê Hoàn', 'Q1 · Giữ nước',
      'Lệ vua đích thân cày ruộng đầu năm — sử chép ông xuống ruộng cày, đặt nghề nông vào chỗ trang trọng nhất của triều đình.',
      'Lễ tịch điền ở Đọi Sơn, Hà Nam đã được phục dựng và tổ chức hằng năm dịp đầu xuân; khu di tích Cố đô Hoa Lư ở Ninh Bình và đền thờ Lê Hoàn ở Thanh Hoá.',
      'Việc nào em muốn cả nhóm coi trọng thì tự tay em làm trước một lần, làm công khai, không giao ngay.'],

    ['Lý Thường Kiệt', 'Q1 · Giữ nước',
      'Phòng tuyến sông Như Nguyệt — cách tổ chức phòng ngự dựa vào một khúc sông chọn trước; và bài Nam quốc sơn hà, bản khẳng định chủ quyền bằng văn bản sớm nhất còn lưu ở nước ta.',
      'Khúc sông Cầu qua Bắc Ninh chính là sông Như Nguyệt; đền thờ ông ở Bắc Ninh và Thanh Hoá; bài thơ nằm trong chương trình ngữ văn phổ thông. Lưu ý: việc gắn bài thơ với Lý Thường Kiệt là truyền tụng, tác giả và thời điểm ra đời vẫn còn tranh luận.',
      'Chọn trước một phòng tuyến cho tuần: một khung giờ và một chỗ ngồi mà em không cho việc khác lấn vào.'],

    ['Trần Hưng Đạo', 'Q1 · Giữ nước',
      'Hịch tướng sĩ — văn bản còn nguyên tới nay; và Binh thư yếu lược, sách binh pháp gắn với tên ông.',
      'Hịch tướng sĩ nằm trong sách giáo khoa ngữ văn; đền Kiếp Bạc ở Hải Dương và đền Trần ở Nam Định mở hội hằng năm. Lưu ý: bản Binh thư yếu lược còn lại được nhiều nhà nghiên cứu cho là bản do người đời sau biên tập thêm, không phải nguyên bản.',
      'Trước khi chia việc cho nhóm, viết một trang nói rõ vì sao phải làm việc này, rồi đọc cho cả nhóm nghe.'],

    ['Trần Quốc Toản', 'Q1 · Giữ nước',
      'Lá cờ sáu chữ “Phá cường địch, báo hoàng ân” — một khẩu hiệu đủ ngắn để tập hợp người, còn được nhắc tới sau hơn bảy trăm năm.',
      'Tên ông đặt cho rất nhiều trường học và đường phố; câu chuyện có trong sách lịch sử bậc phổ thông. Lưu ý: chi tiết bóp nát quả cam được sử chép lại và lưu truyền rộng; năm sinh năm mất chỉ là ước đoán.',
      'Đặt tên cho việc em tự nhận làm, viết thành một câu sáu tới tám chữ, rồi mang câu ấy đi rủ người.'],

    ['Lê Lợi và Nguyễn Trãi', 'Q1 · Giữ nước',
      'Bình Ngô đại cáo — bản tổng kết cuộc kháng chiến và tuyên bố nền độc lập; cùng cách kết thúc chiến tranh ở hội thề Đông Quan: cấp thuyền, cấp ngựa, cấp lương cho quân thua về nước.',
      'Bình Ngô đại cáo nằm trong chương trình ngữ văn phổ thông; khu di tích Lam Kinh ở Thanh Hoá và khu di tích Côn Sơn — Kiếp Bạc ở Hải Dương.',
      'Kết thúc một việc bằng một bản tổng kết ngắn gửi cả nhóm, không kết thúc bằng im lặng.'],

    ['Quang Trung – Nguyễn Huệ', 'Q1 · Giữ nước',
      'Chiếu cầu hiền và Chiếu lập học; cùng việc đưa chữ Nôm vào khoa cử — lần đầu tiếng nói của dân được dùng để chọn người làm quan.',
      'Bảo tàng Quang Trung ở Tây Sơn, Bình Định; gò Đống Đa ở Hà Nội mở hội mùng năm Tết hằng năm; Chiếu cầu hiền có trong chương trình ngữ văn.',
      'Ngay sau khi làm xong một việc, dành một buổi đi tìm người giỏi hơn mình ở việc kế tiếp, thay vì ngồi kể lại việc vừa xong.'],

    ['Võ Nguyên Giáp', 'Q1 · Giữ nước',
      'Cách tổ chức một chiến dịch dài ngày dựa vào hậu cần đường bộ và sức người; và bộ hồi ký ông viết lại các chiến dịch, trong đó có đoạn kể chính quyết định đổi cách đánh ở Điện Biên Phủ.',
      'Quần thể di tích chiến trường Điện Biên Phủ — đồi A1, hầm chỉ huy Mường Phăng — là di tích quốc gia đặc biệt, mở cửa cho khách tham quan; hồi ký của ông đã in và tái bản nhiều lần.',
      'Trước khi bắt đầu một kế hoạch, viết ra điều gì xảy ra thì em sẽ đổi kế hoạch — rồi khi nó xảy ra thật thì đổi thật.'],

    /* ── Quyển 2 · Dựng nước · 9 dòng ── */
    ['Lý Công Uẩn', 'Q2 · Dựng nước',
      'Chiếu dời đô — một quyết định lớn được viết ra kèm lý do, để đời sau đọc lại được; và chính kinh đô Thăng Long.',
      'Khu trung tâm Hoàng thành Thăng Long ở Hà Nội đã được UNESCO ghi danh là di sản văn hoá thế giới, mở cửa hằng ngày; Chiếu dời đô nằm trong chương trình ngữ văn; đền Đô ở Bắc Ninh.',
      'Xem lại chỗ ngồi học của em, đổi một thứ trong tuần này rồi so kết quả, thay vì cố ngồi lâu hơn ở chỗ cũ.'],

    ['Lý Thánh Tông và Lý Nhân Tông', 'Q2 · Dựng nước',
      'Văn Miếu, Quốc Tử Giám và chế độ khoa cử — một định chế tuyển người bằng thi cử, chạy gần chín trăm năm sau khi người lập đã mất.',
      'Khu di tích Văn Miếu — Quốc Tử Giám ở Hà Nội mở cửa hằng ngày; hình Khuê Văn Các là biểu tượng của thành phố.',
      'Mở một cửa nhỏ cho chi hội: một buổi ai cũng vào được, tiêu chí ghi rõ, không cần quen ai mới vào được.'],

    ['Trần Nhân Tông', 'Q2 · Dựng nước',
      'Thiền phái Trúc Lâm — một trường phái do người Việt lập, có hệ thống chùa và có người kế tục, nên sống tiếp sau khi người sáng lập mất.',
      'Quần thể Yên Tử trải trên Quảng Ninh, Bắc Giang và Hải Dương, còn nguyên hệ thống chùa và đường hành hương; nhiều thiền viện mang tên Trúc Lâm đang hoạt động trong nước.',
      'Bàn giao một việc em đang làm tốt cho một bạn, kèm bản hướng dẫn ba bước — bàn giao lúc em còn làm tốt, không đợi lúc em chán.'],

    ['Lê Thánh Tông', 'Q2 · Dựng nước',
      'Quốc triều hình luật, quen gọi là luật Hồng Đức — bộ luật viết ra cả những điều lẽ ra vua có thể tuỳ ý quyết; cùng bản đồ hành chính và hệ thống bia tiến sĩ dựng ở Văn Miếu.',
      'Văn bản Quốc triều hình luật đã được dịch, xuất bản và còn được giới luật học nghiên cứu tới nay; 82 bia tiến sĩ ở Văn Miếu, Hà Nội đã được UNESCO ghi vào danh mục di sản tư liệu.',
      'Viết luật cho nhóm em: đúng ba điều, ai cũng đọc được, và áp cho cả người đề ra ba điều ấy.'],

    ['Thân Nhân Trung', 'Q2 · Dựng nước',
      'Bài ký bia tiến sĩ khoa Nhâm Tuất, dựng năm 1484 — nơi câu “Hiền tài là nguyên khí của quốc gia” được khắc vào đá thay vì chỉ nói ra.',
      'Tấm bia ấy còn đứng trong vườn bia Văn Miếu, Hà Nội, ai vào cũng đọc được; câu văn được trích dẫn ở rất nhiều trường học.',
      'Chọn một nguyên tắc của gia đình hoặc chi hội em, viết thành đúng một câu, in ra dán ở chỗ dễ thấy nhất.'],

    ['Hồ Quý Ly', 'Q2 · Dựng nước',
      'Thành Tây Đô xây bằng đá; lần phát hành tiền giấy đầu tiên được sử chép ở nước ta; và việc đưa chữ Nôm cùng môn toán vào việc nước, vào thi cử.',
      'Thành nhà Hồ ở Vĩnh Lộc, Thanh Hoá — tường đá còn đứng, đã được UNESCO ghi danh là di sản văn hoá thế giới. Đây là ca hiếm: sản phẩm còn nguyên, còn triều đại thì chỉ sống bảy năm.',
      'Khi muốn đổi một nếp trong nhà, đổi đúng một thứ trước và hỏi ý từng người bị ảnh hưởng, đừng đổi năm thứ cùng lúc.'],

    ['Nguyễn Trường Tộ', 'Q2 · Dựng nước',
      'Bộ điều trần — hàng chục bản viết đề nghị canh tân kinh tế, giáo dục, kỹ nghệ, võ bị, ngoại giao. Hầu hết không được thi hành, nhưng văn bản thì còn.',
      'Các bản điều trần đã được sưu tầm, dịch và in thành sách, là tư liệu gốc cho nghiên cứu lịch sử cận đại; phần mộ và nhà thờ họ ở Hưng Nguyên, Nghệ An.',
      'Viết lại đề nghị mà lần trước không ai trả lời — lần này có số liệu, có một trang, và gửi đúng người.'],

    ['Phan Châu Trinh', 'Q2 · Dựng nước',
      'Cương lĩnh chín chữ “khai dân trí, chấn dân khí, hậu dân sinh” — một công thức đủ ngắn để truyền đi và đủ rõ để kiểm; cùng mô hình trường học kiểu Duy Tân.',
      'Chín chữ ấy vẫn được dẫn trong các cuộc bàn về giáo dục và phát triển tới nay; khu lưu niệm và phần mộ ông ở Thành phố Hồ Chí Minh; tên ông đặt cho nhiều trường và đường phố.',
      'Xếp ba việc của chi hội theo đúng ba vế: tuần này học được gì, dám làm gì, và ai sống tốt hơn ở chỗ nào.'],

    ['Phan Bội Châu', 'Q2 · Dựng nước',
      'Phong trào Đông Du — một mô hình đưa người trẻ ra ngoài học rồi trở về; cùng khối trước tác của ông, trong đó có Việt Nam vong quốc sử.',
      'Khu lưu niệm Phan Bội Châu ở Nam Đàn, Nghệ An và nhà lưu niệm ở Huế nơi ông bị giam lỏng cuối đời; các trước tác đã được dịch và in.',
      'Cử một bạn trong chi hội đi học một khoá ở ngoài, và giao trước điều kiện: về phải dạy lại cả nhóm trong một buổi.'],

    /* ── Quyển 3 · Hiền tài · 7 dòng ── */
    ['Chu Văn An', 'Q3 · Hiền tài',
      'Ngôi trường ông mở ở Chí Linh và lớp học trò ông đào tạo — sản phẩm là người, không phải sách. Lưu ý: Thất trảm sớ nay không còn văn bản, sử chỉ chép lại việc ông dâng sớ.',
      'Đền thờ Chu Văn An ở Chí Linh, Hải Dương, nằm trong khu di tích Côn Sơn — Kiếp Bạc; ông được thờ trong Văn Miếu, Hà Nội; tên ông đặt cho nhiều trường học.',
      'Dạy trọn một điều em làm tốt cho một bạn, dạy tới khi bạn ấy làm được mà không cần hỏi em nữa.'],

    ['Nguyễn Trãi', 'Q3 · Hiền tài',
      'Quốc âm thi tập — tập thơ Nôm sớm nhất còn giữ được, bằng chứng rằng tiếng Việt viết được thơ ở trình độ cao; cùng Quân trung từ mệnh tập và Dư địa chí.',
      'Toàn bộ trước tác còn lại đã được sưu tập, phiên âm, dịch và in thành bộ; khu di tích Côn Sơn ở Hải Dương; tên ông được kỷ niệm ở quy mô quốc tế.',
      'Viết một trang bằng tiếng của chính em về việc em vừa làm, rồi đưa cho chi hội đọc — không mượn câu trong sách.'],

    ['Nguyễn Bỉnh Khiêm', 'Q3 · Hiền tài',
      'Bạch Vân am thi tập bằng chữ Hán và Bạch Vân quốc ngữ thi tập bằng chữ Nôm; cùng lớp học trò ông dạy ở am Bạch Vân, sau có mặt ở nhiều phe đối lập nhau.',
      'Khu di tích đền thờ Nguyễn Bỉnh Khiêm ở Vĩnh Bảo, Hải Phòng; hai tập thơ đã được phiên âm và in. Lưu ý: các câu sấm lưu truyền trong dân gian chưa được xác định là của ông, không dùng làm sử liệu.',
      'Trước khi phản bác một người, hỏi họ ba câu để hiểu vì sao họ nghĩ như thế, rồi mới nói phần của mình.'],

    ['Lê Quý Đôn', 'Q3 · Hiền tài',
      'Bộ trước tác bao quát nhiều ngành: Vân đài loại ngữ, Đại Việt thông sử, Phủ biên tạp lục, Kiến văn tiểu lục — tri thức được phân loại, không phải ghi tản mạn.',
      'Các bộ này đã được dịch và in; Phủ biên tạp lục là tư liệu gốc được dẫn trong nghiên cứu về vùng Thuận Hoá và về biển đảo; tên ông đặt cho nhiều trường chuyên.',
      'Mở một cuốn sổ chia sẵn ba mục, mỗi ngày ghi một điều em quan sát được vào đúng mục của nó.'],

    ['Nguyễn Đình Chiểu', 'Q3 · Hiền tài',
      'Truyện thơ Lục Vân Tiên, Văn tế nghĩa sĩ Cần Giuộc, và Ngư Tiều y thuật vấn đáp — một cuốn dạy nghề thuốc viết bằng thơ để người ít chữ cũng thuộc được.',
      'Lục Vân Tiên còn sống trong lối nói thơ, kể thơ ở Nam Bộ; khu lưu niệm ở Ba Tri, Bến Tre; tác phẩm nằm trong chương trình ngữ văn; UNESCO đã cùng kỷ niệm 200 năm ngày sinh của ông năm 2022.',
      'Làm phiên bản nhỏ nhất của việc em vẫn hoãn vì chưa đủ điều kiện, làm ngay tuần này bằng thứ đang có.'],

    ['Nguyễn Khuyến', 'Q3 · Hiền tài',
      'Chùm thơ thu bằng chữ Nôm — Thu điếu, Thu vịnh, Thu ẩm: ba bài dựng nên hình ảnh làng quê đồng bằng Bắc Bộ mà tới nay chưa ai thay được.',
      'Chùm thơ thu nằm trong chương trình ngữ văn phổ thông; từ đường và khu lưu niệm ở Bình Lục, Hà Nam.',
      'Tả một chỗ quen thuộc quanh nhà bằng năm câu, không dùng chữ nào em đã đọc thấy trong sách.'],

    ['Lương Văn Can', 'Q3 · Hiền tài',
      'Mô hình nghĩa thục — trường không thu tiền, dạy chữ quốc ngữ và khoa học; cùng những cuốn ông viết về đạo làm ăn của người Việt, trong đó có Thương học phương châm.',
      'Sách của ông đã được in lại và đọc trong giới doanh nhân; tên ông đặt cho đường phố và cho một giải thưởng dành cho người trẻ khởi nghiệp.',
      'Ghi đủ thu và chi bảy ngày liền, không làm tròn, không sửa số, rồi đọc lại xem tiền đi đâu.'],

    /* ── Quyển 4 · Trí tuệ khoa học · 9 dòng ── */
    ['Tuệ Tĩnh', 'Q4 · Trí tuệ khoa học',
      'Nam dược thần hiệu — hệ thống hoá cây thuốc trong nước; cùng chủ trương “Nam dược trị Nam nhân” và mô hình vườn thuốc trồng ngay tại chỗ chữa bệnh.',
      'Sách đã được phiên dịch và còn là tài liệu tham khảo trong y học cổ truyền; vườn thuốc Nam theo mẫu ấy có ở nhiều trạm y tế xã; đền Bia và chùa Giám ở Cẩm Giàng, Hải Dương. Lưu ý: năm sinh năm mất và nhiều chi tiết tiểu sử còn dị bản.',
      'Thử một phương pháp học của người khác đúng bảy ngày, rồi ghi lại phần hợp với em và phần không hợp.'],

    ['Hải Thượng Lãn Ông Lê Hữu Trác', 'Q4 · Trí tuệ khoa học',
      'Bộ Hải Thượng y tông tâm lĩnh gồm hàng chục quyển, trong đó có phần y huấn — y đức được viết thành điều khoản kiểm được, kèm cả những ca ông chữa thất bại.',
      'Bộ sách đã được dịch trọn và in; phần y huấn còn được nhắc lại và treo trong nhiều cơ sở y tế; khu di tích ở Hương Sơn, Hà Tĩnh; UNESCO đã cùng kỷ niệm 300 năm ngày sinh của ông.',
      'Lập một trang sổ lỗi: ba lỗi trong tuần và nguyên nhân của từng lỗi, không kèm lời tự trách.'],

    ['Trần Đại Nghĩa', 'Q4 · Trí tuệ khoa học',
      'Súng không giật SKZ và các loại đạn chống tăng chế tạo trong rừng; cùng mô hình xưởng quân giới làm ra vũ khí bằng vật liệu kiếm được tại chỗ.',
      'Hiện vật vũ khí do quân giới Việt Nam thời kỳ ấy chế tạo được trưng bày tại Bảo tàng Lịch sử Quân sự Việt Nam; tên ông đặt cho trường học và cho một giải thưởng khoa học công nghệ.',
      'Làm một vật dùng được chỉ bằng thứ có sẵn trong nhà, không mua thêm gì cả.'],

    ['Tôn Thất Tùng', 'Q4 · Trí tuệ khoa học',
      'Phương pháp cắt gan có kế hoạch mang tên ông — một quy trình mổ, tức là thứ dạy lại được cho người khác, không phải một biệt tài cá nhân.',
      'Phương pháp Tôn Thất Tùng được ghi trong y văn quốc tế, vẫn được dạy và dùng trong phẫu thuật gan; Bệnh viện Hữu nghị Việt Đức ở Hà Nội là nơi ông làm việc; tên ông đặt cho đường phố và trường học.',
      'Chọn chương em học kém nhất và ngồi vẽ lại cấu trúc của nó thành một sơ đồ trên đúng một trang.'],

    ['Đặng Văn Ngữ', 'Q4 · Trí tuệ khoa học',
      'Quy trình làm nước lọc penicillin ngay trong vùng kháng chiến — sản xuất kháng sinh tại chỗ khi không có nguồn thuốc; và một viện nghiên cứu về ký sinh trùng, sốt rét mà ông là viện trưởng đầu tiên.',
      'Viện Sốt rét — Ký sinh trùng — Côn trùng Trung ương vẫn đang hoạt động; tên ông đặt cho đường phố và trường học; câu chuyện lọ giống nấm được kể lại trong lịch sử ngành y.',
      'Đi hỏi trực tiếp một người đang gặp vấn đề em muốn giải, hỏi trước khi em nghĩ ra lời giải.'],

    ['Lương Định Của', 'Q4 · Trí tuệ khoa học',
      'Các giống lúa và rau màu chọn tạo cho đồng đất Việt Nam — sản phẩm ở đây là thứ mọc được trên ruộng, đo được bằng năng suất, không đo bằng bài báo.',
      'Giống do ông và lớp học trò chọn tạo đã đi vào sản xuất; tên ông đặt cho một giải thưởng dành cho nhà nông trẻ, trao hằng năm, và cho nhiều đường phố, trường học.',
      'Ngồi cạnh xem một bạn làm bài mười phút, im lặng, trước khi khuyên bạn ấy bất cứ điều gì.'],

    ['Lê Văn Thiêm', 'Q4 · Trí tuệ khoa học',
      'Một ngành toán học trong nước dựng gần như từ số không: viện nghiên cứu, hội chuyên ngành, tạp chí, và lớp nhà toán học đầu tiên được đào tạo ngay tại Việt Nam.',
      'Viện Toán học và Hội Toán học Việt Nam vẫn hoạt động; tạp chí Toán học và Tuổi trẻ ra đều tới nay; giải thưởng mang tên ông được trao cho người dạy và người học toán.',
      'Làm một việc cho khoá sau của chi hội — thứ em sẽ không hưởng kết quả.'],

    ['Hoàng Tụy', 'Q4 · Trí tuệ khoa học',
      'Hướng nghiên cứu tối ưu toàn cục và khái niệm mang tên ông trong tài liệu quốc tế; cùng khối bài viết phản biện về giáo dục, đã được tập hợp in thành sách.',
      'Tối ưu toàn cục nay là một hướng có hội nghị và tạp chí riêng trên thế giới, khái niệm “lát cắt Tuy” có trong tài liệu chuyên ngành; các bài viết về giáo dục của ông còn được dẫn trong tranh luận hôm nay.',
      'Viết một góp ý có căn cứ cho lớp hoặc chi hội, gửi đúng người, thay vì phàn nàn sau lưng.'],

    ['Ngô Bảo Châu', 'Q4 · Trí tuệ khoa học',
      'Chứng minh Bổ đề cơ bản trong chương trình Langlands — một kết quả toán học đã công bố, mở đường cho các kết quả sau; cùng một viện nghiên cứu toán học trong nước mà ông làm giám đốc khoa học đầu tiên.',
      'Công trình đã công bố trên tạp chí chuyên ngành và được giới toán học thế giới dùng làm nền; Viện Nghiên cứu cao cấp về Toán ở Hà Nội vẫn hoạt động, mở chương trình cho người làm toán trong nước. Lưu ý: người đang sống — kho này ghi việc đã làm, không kết luận về con người.',
      'Ở lại với đúng một bài khó ba buổi liền, không đổi sang bài dễ hơn.'],

    /* ── Quyển 5 · Văn hiến · 7 dòng ── */
    ['Nguyễn Du', 'Q5 · Văn hiến',
      'Truyện Kiều — 3.254 câu lục bát, tác phẩm đưa tiếng Việt lên tầm một ngôn ngữ văn học hoàn chỉnh; cùng Thanh Hiên thi tập và Văn tế thập loại chúng sinh.',
      'Truyện Kiều đã được dịch ra nhiều thứ tiếng, nằm trong chương trình ngữ văn, và còn sống trong đời thường qua lẩy Kiều, ngâm Kiều; khu di tích Nguyễn Du ở Nghi Xuân, Hà Tĩnh; UNESCO đã kỷ niệm 250 năm ngày sinh của ông.',
      'Kể lại một bài học bằng lời của chính em cho một người trong nhà nghe, không mượn câu trong sách.'],

    ['Hồ Xuân Hương', 'Q5 · Văn hiến',
      'Mảng thơ Nôm mang tên bà — tiếng nói của người phụ nữ, viết được điều không được phép viết bằng một hình thức không ai cấm nổi.',
      'Thơ đã được in, dịch ra nhiều thứ tiếng và giảng trong nhà trường; UNESCO cùng vinh danh bà nhân dịp kỷ niệm năm 2021. Lưu ý: tiểu sử của bà và việc xác định bài nào chắc chắn là của bà vẫn đang được nghiên cứu.',
      'Nói một điều em vẫn ngại nói, nhưng chọn cách nói mà người nghe nhận được, không phải cách làm mình hả dạ.'],

    ['Đoàn Thị Điểm', 'Q5 · Văn hiến',
      'Bản diễn Nôm Chinh phụ ngâm — một trong những đỉnh cao của thể song thất lục bát; cùng tập truyện Truyền kỳ tân phả.',
      'Bản diễn Nôm được in, giảng trong nhà trường, được ngâm và phổ nhạc tới nay. Lưu ý: việc bản diễn Nôm phổ biến nhất là của Đoàn Thị Điểm hay của Phan Huy Ích vẫn còn tranh luận trong giới nghiên cứu.',
      'Giải thích lại một khái niệm khó cho một em nhỏ hơn em năm tuổi, tới khi em ấy kể lại được.'],

    ['Bà Huyện Thanh Quan', 'Q5 · Văn hiến',
      'Một chùm rất ít bài thơ Đường luật chữ Nôm — Qua Đèo Ngang, Thăng Long thành hoài cổ, Chiều hôm nhớ nhà — nhưng bài nào cũng ở chuẩn cao nhất và bài nào cũng được thuộc.',
      'Qua Đèo Ngang nằm trong chương trình ngữ văn phổ thông; Đèo Ngang trên ranh giới Hà Tĩnh — Quảng Bình đến nay vẫn được nhắc bằng chính bài thơ ấy; tên bà đặt cho đường phố. Lưu ý: số bài chắc chắn là của bà rất ít và việc xác định còn tranh luận.',
      'Làm lại một sản phẩm cũ của em cho tới khi em thật sự hài lòng, thay vì bắt đầu một cái mới.'],

    ['Cao Bá Quát', 'Q5 · Văn hiến',
      'Khối thơ chữ Hán lớn còn lưu lại, đã được sưu tập và dịch — một giọng thơ không chịu uốn theo khuôn sáo khoa cử đương thời.',
      'Thơ ông đã được tuyển dịch và in; tên ông đặt cho đường phố và trường học. Lưu ý: câu “Nhất sinh đê thủ bái mai hoa” gắn với ông theo truyền tụng, đây không phải sử liệu chắc chắn.',
      'Viết ra ba thứ em thật sự kính trọng, và một thứ em vẫn giả vờ kính trọng — chỉ em đọc.'],

    ['Văn Cao', 'Q5 · Văn hiến',
      'Tiến quân ca — bài hát sau trở thành Quốc ca; cùng nhiều ca khúc, tranh và thơ để lại ở cả ba lĩnh vực.',
      'Tiến quân ca vang lên ở mọi lễ chào cờ trên cả nước và ở mọi giải đấu quốc tế có đoàn Việt Nam; gia đình ông đã hiến tặng tác phẩm cho Nhà nước; các ca khúc khác vẫn được biểu diễn và thu âm.',
      'Làm một sản phẩm nhỏ tặng chi hội hoặc tặng lớp, và đừng ký tên to.'],

    ['Đặng Thái Sơn', 'Q5 · Văn hiến',
      'Các bản thu âm và một lối chơi Chopin được thế giới công nhận; cùng lớp học trò ông dạy sau này — trong đó có người đã đoạt giải nhất chính cuộc thi Chopin.',
      'Các bản thu âm còn được phát hành và nghe rộng rãi; ông giảng dạy và ngồi ban giám khảo các cuộc thi piano quốc tế. Lưu ý: người đang sống — kho này ghi việc đã làm, không kết luận về con người.',
      'Luyện đúng một kỹ năng nhỏ 20 phút mỗi ngày trong bảy ngày, ghi lại sự khác biệt ngày đầu và ngày cuối.'],

    /* ── Quyển 6 · Người đương thời · 5 dòng ── */
    ['Người thầy vùng cao', 'Q6 · Người đương thời',
      'Những điểm trường lẻ còn mở và mô hình lớp ghép — cách tổ chức dạy nhiều trình độ trong một phòng học, với một thầy và rất ít phương tiện.',
      'Lớp ghép và điểm trường lẻ vẫn nằm trong hệ thống giáo dục ở vùng cao; nhiều thế hệ học trò vùng cao đã học tiếp lên rồi trở về dạy chính bản mình.',
      'Giữ một việc nhỏ đều đặn suốt 21 ngày, kể cả những ngày không ai kiểm.'],

    ['Đội tuyển học sinh Việt Nam ở các kỳ thi quốc tế', 'Q6 · Người đương thời',
      'Một quy trình phát hiện và bồi dưỡng lặp lại được: hệ thống trường chuyên, kỳ thi chọn, đội ngũ giáo viên bồi dưỡng và bộ đề tích luỹ qua nhiều chục năm.',
      'Hệ thống trường chuyên và kỳ thi chọn học sinh giỏi quốc gia vẫn chạy hằng năm; kết quả các kỳ Olympic quốc tế được công bố công khai, tra lại được; nhiều cựu thành viên đội tuyển nay làm nghiên cứu và giảng dạy.',
      'Tìm hiểu quy trình ôn của một người từng đi thi quốc tế, chép lại, rồi thử đúng một phần của nó tuần này.'],

    ['Người Việt làm nghề ở nước ngoài', 'Q6 · Người đương thời',
      'Những chuẩn nghề được mang về và đặt vào chỗ làm việc trong nước: quy trình, giáo trình, phòng thí nghiệm, ê-kíp — thứ ở lại sau khi người mang về đã chuyển việc.',
      'Các khoa, phòng thí nghiệm, chương trình đào tạo và ê-kíp do người học ở nước ngoài về dựng đang có mặt trong nhiều bệnh viện, trường đại học và doanh nghiệp trong nước.',
      'Tìm một chuẩn cao hơn cho một việc em vẫn làm, và áp chuẩn ấy ngay tuần này.'],

    ['Người thợ giỏi và làng nghề', 'Q6 · Người đương thời',
      'Sản phẩm nghề và bộ tay nghề truyền đời — gốm, mộc, đúc đồng, dệt, khảm: một quy trình chỉ chuyển giao được bằng cách làm cùng nhau, không ghi hết thành văn được.',
      'Các làng nghề còn hoạt động, còn xưởng và còn bán hàng; một số nghề thủ công đã được ghi vào danh mục di sản văn hoá phi vật thể; nhiều làng mở cửa cho khách vào xem thợ làm.',
      'Học một kỹ năng bằng tay từ một người lớn trong nhà, học trực tiếp, không xem video.'],

    ['Trang để trống', 'Q6 · Người đương thời',
      'Chân dung do chính học viên đi tìm và viết ra, theo đủ bảy nguyên tắc của bộ sách. Sản phẩm này chưa tồn tại.',
      'Chưa có ở đâu cả. Đây là ô duy nhất trong bảng còn trống, và nó trống có chủ ý: bộ sách chỉ sống nếu người đọc trở thành người viết.',
      'Phỏng vấn 30 phút một người em khâm phục về một quyết định khó của họ, rồi viết một trang.']
  ];

  /* Bí danh cho màn hình đã dựng sẵn trong man-hinh.js */

  /* ── 2 · MƯỜI HAI MẬT MÃ ────────────────────────────────────
     Quy luật lặp lại xuyên suốt 45 chân dung. `n` là mật mã nói gì,
     `v` là nhận ra nó ở những ai và vì sao nó lặp lại.            */
  G.MM_MA = [
    { so: 1, t: 'Chuẩn bị dài hơn trận đánh',
      n: 'Phần nhìn thấy được của một chiến công thường rất ngắn. Phần làm nên nó thì dài, chán và không ai xem.',
      v: 'Ngô Quyền đóng cọc xong trước khi thuyền địch tới. Trần Hưng Đạo rút và nuôi lực nhiều tháng cho một trận cuối. Tôn Thất Tùng phẫu tích hàng trăm lá gan trước khi bàn tới dao mổ. Lê Quý Đôn ghi chép mấy chục năm mới thành bộ sách. Đặng Thái Sơn luyện đàn trong sơ tán trước khi có cơ hội được đào tạo bài bản. Lặp lại vì bên yếu hơn không có quyền ứng biến tại chỗ; thứ duy nhất họ kiểm soát được là quãng thời gian trước đó.' },

    { so: 2, t: 'Biến cái sẵn có thành lực lượng',
      n: 'Không chờ đủ phương tiện. Nhìn quanh xem cái gì đang có mà chưa ai coi là vũ khí.',
      v: 'Ngô Quyền dùng thuỷ triều và lòng sông. Tuệ Tĩnh dùng cây cỏ mọc quanh nhà thay cho thuốc phải mua từ xa. Trần Đại Nghĩa làm vũ khí bằng vật liệu kiếm được trong rừng. Đặng Văn Ngữ mang giống nấm về trong một cái lọ. Lương Định Của lấy chính đồng đất Việt Nam làm phòng thí nghiệm. Lặp lại vì trong lịch sử này, bên ngồi chờ đủ điều kiện gần như luôn là bên thua trước.' },

    { so: 3, t: 'Chọn chỗ trước khi chọn sức',
      n: 'Đứng sai chỗ thì cố mấy cũng chỉ đi ngang. Đổi chỗ rẻ hơn đổi sức rất nhiều.',
      v: 'Lý Công Uẩn dời đô khỏi một thung lũng dễ giữ. Lý Thường Kiệt chọn khúc sông rồi mới dựng phòng tuyến. Chu Văn An rời triều đình nhưng không rời việc dạy. Nguyễn Khuyến giữ chỗ đứng của mình và trả giá bằng cơ hội. Ngô Bảo Châu chọn bài toán trước khi dồn nhiều năm vào nó. Lặp lại vì chọn chỗ là quyết định trả một lần, còn cố sức là trả mỗi ngày.' },

    { so: 4, t: 'Đi tới chỗ có vấn đề, và chỗ có lời giải',
      n: 'Đứng xa mà khuyên thì lời khuyên đúng về lý thuyết và sai về thực tế.',
      v: 'Đặng Văn Ngữ đưa nghiên cứu ra nơi có thương binh. Lương Định Của lội ruộng cấy cùng nông dân. Lê Quý Đôn làm quan ở Thuận Hoá thì viết luôn một cuốn khảo về vùng ấy. Phan Bội Châu đưa thanh niên sang chỗ có tri thức mới. Người thầy vùng cao ở lại nơi ít người muốn ở. Lặp lại vì khoảng cách giữa người biết và người cần là chỗ mọi lời giải tốt chết đi.' },

    { so: 5, t: 'Đổi phương án khi dữ liệu đổi',
      n: 'Đổi kể cả khi đã đổ rất nhiều công vào phương án cũ, và kể cả khi đổi thì mất mặt.',
      v: 'Võ Nguyên Giáp hoãn giờ nổ súng, kéo pháo ra, đổi cách đánh khi mọi thứ đã sẵn sàng. Trần Hưng Đạo bỏ trống thành thay vì giữ bằng mọi giá. Đọc ngược lại thì có Hồ Quý Ly: nội dung cải cách không sai, nhưng dữ liệu về lòng người đã báo mà nhịp không đổi. Lặp lại vì công đã bỏ ra luôn kéo người ta đi tiếp, và đó là cái bẫy giống hệt nhau ở mọi thời.' },

    { so: 6, t: 'Thắng rồi vẫn giữ lễ',
      n: 'Đích không phải làm cho người kia thua, mà làm cho cuộc đối đầu chấm dứt và không quay lại.',
      v: 'Lê Lợi và Nguyễn Trãi cấp thuyền, cấp ngựa, cấp lương cho hàng vạn quân Minh về nước ở hội thề Đông Quan. Lê Hoàn thắng rồi vẫn nối lại bang giao. Lê Thánh Tông minh oan cho Nguyễn Trãi hai mươi hai năm sau án Lệ Chi Viên, dù việc ấy chạm vào triều trước. Lặp lại vì một nước nhỏ ở cạnh một nước lớn không có lựa chọn nào khác ngoài việc kết thúc chiến tranh cho gọn.' },

    { so: 7, t: 'Viết ra để cái đúng sống lâu hơn người viết',
      n: 'Cái tốt nằm trong đầu một người giỏi sẽ mất theo người ấy. Viết ra được, dạy được, kiểm được thì nó tự chạy.',
      v: 'Lê Thánh Tông đưa vào bộ luật cả những điều lẽ ra vua có thể tuỳ ý quyết. Thân Nhân Trung khắc một nguyên tắc vào đá. Hải Thượng Lãn Ông viết y đức thành điều khoản. Lý Công Uẩn viết hẳn một bài chiếu nói rõ vì sao dời đô. Nguyễn Trường Tộ viết tiếp cả khi không ai đọc. Lặp lại vì triều đại nào cũng đổi, còn văn bản thì đọc lại được sau nhiều trăm năm.' },

    { so: 8, t: 'Dựng cửa, đừng đi tìm từng người',
      n: 'Muốn có người giỏi lâu dài thì làm ra một lối vào có tiêu chí rõ, ai cũng đi được.',
      v: 'Lý Thánh Tông và Lý Nhân Tông mở khoa thi và dựng Quốc Tử Giám. Quang Trung ban Chiếu cầu hiền ngay sau chiến thắng. Lương Văn Can mở một trường không thu tiền. Lê Văn Thiêm dựng cả một ngành từ gần như số không. Hệ thống chọn và bồi dưỡng đội tuyển học sinh chạy đều qua nhiều chục năm. Lặp lại vì đi tìm từng người thì phụ thuộc may mắn, còn cái cửa thì vẫn chạy khi người dựng đã đi.' },

    { so: 9, t: 'Nói bằng tiếng của người nghe',
      n: 'Điều đúng mà nói bằng thứ tiếng người ta không dùng thì không tới được ai.',
      v: 'Nguyễn Du viết Truyện Kiều bằng chữ Nôm chứ không phải chữ Hán. Nguyễn Đình Chiểu viết truyện thơ để người ít chữ ở Nam Bộ kể lại được bằng miệng. Đoàn Thị Điểm dựng lại cả nhạc điệu một áng thơ chữ Hán bằng chất liệu tiếng Việt. Quang Trung đưa chữ Nôm vào khoa cử. Trần Quốc Toản gói cả ý mình vào sáu chữ trên một lá cờ. Lặp lại vì đây là cách duy nhất để một ý đi xa hơn tầm nói của người nghĩ ra nó.' },

    { so: 10, t: 'Chưa được trao thì tự làm rồi mang kết quả tới',
      n: 'Khi chưa có quyền, cách duy nhất để có quyền là làm được một việc mà người khác không phủ nhận nổi.',
      v: 'Trần Quốc Toản không được dự bàn việc nước thì về tự chiêu mộ quân. Hồ Xuân Hương viết điều không được phép viết, bằng cách viết mà không ai cấm được. Nguyễn Đình Chiểu mù mắt vẫn mở trường, bốc thuốc và làm thơ. Cao Bá Quát không chịu uốn mình theo khuôn quan trường. Lặp lại vì cửa chính thức bao giờ cũng hẹp hơn số người có việc muốn làm.' },

    { so: 11, t: 'Ghi ra chỗ hỏng, kể cả chỗ hỏng của mình',
      n: 'Giấu lỗi là giữ danh cho mình và hại người đến sau.',
      v: 'Hải Thượng Lãn Ông chép cả những ca ông chữa thất bại kèm phân tích nguyên nhân, việc rất hiếm trong y thư thời ấy. Hoàng Tuỵ nhận phần việc khó chịu là nói công khai về chỗ hỏng của giáo dục, dù biết ít được nghe. Nguyễn Trường Tộ chỉ ra chỗ yếu của nước mình trên giấy. Chính Thư viện Gen Việt cũng ghi Hồ Quý Ly như một ca thất bại. Lặp lại vì một nghề chỉ tiến khi lỗi được ghi lại thay vì được che.' },

    { so: 12, t: 'Làm cái mình không hưởng',
      n: 'Đặt nền, dạy người, rồi trao tay khi mình còn đang mạnh — chứ không đợi tới lúc buộc phải trao.',
      v: 'Trần Nhân Tông nhường ngôi lúc đang ở đỉnh uy tín. Lê Văn Thiêm về xây một ngành mà thành quả rơi vào tay lớp sau. Phan Châu Trinh chọn con đường không thấy đích trong đời mình. Người thợ giỏi dạy thật cho học trò dù biết học trò sẽ giỏi hơn mình. Người thầy vùng cao ở lại thêm một năm nữa, năm này qua năm khác. Lặp lại vì thứ gì cần hơn một đời người mới xong thì chỉ kiểu người này làm được.' }
  ];

  /* ── 3 · MA TRẬN NHÂN VẬT × MẬT MÃ ──────────────────────────
     bang 4 ô: [nhân vật, mật mã chính, mật mã phụ, vì sao xếp vậy].
     Đủ 45 dòng, cùng thứ tự với MM_SAN_PHAM.                     */
  G.MM_DOI_CHIEU = [

    ['Ngô Quyền', '2 · Biến cái sẵn có thành lực lượng', '1 · Chuẩn bị dài hơn trận đánh',
      'Thuỷ triều và lòng sông vốn có sẵn cho cả hai bên; phần của ông là đọc đúng quy luật rồi đóng cọc xong từ trước.'],
    ['Lê Hoàn', '3 · Chọn chỗ trước khi chọn sức', '6 · Thắng rồi vẫn giữ lễ',
      'Chỗ ông chọn không phải một địa hình mà là một bộ chỉ huy thống nhất, có trước khi giặc tới; thắng xong thì nối lại bang giao.'],
    ['Lý Thường Kiệt', '3 · Chọn chỗ trước khi chọn sức', '1 · Chuẩn bị dài hơn trận đánh',
      'Ông chọn hai chỗ: kho lương của địch để đánh trước, và khúc sông Như Nguyệt để giữ. Cả hai đều chọn xong trước khi giặc sang.'],
    ['Trần Hưng Đạo', '1 · Chuẩn bị dài hơn trận đánh', '5 · Đổi phương án khi dữ liệu đổi',
      'Phần lớn thời gian kháng chiến là rút, bỏ trống và nuôi lực; trận Bạch Đằng chỉ là ngày cuối của một việc dài.'],
    ['Trần Quốc Toản', '10 · Chưa được trao thì tự làm', '9 · Nói bằng tiếng của người nghe',
      'Không được mời dự bàn thì tự chiêu mộ quân; và ông gói cả lời hứa của mình vào sáu chữ đủ ngắn để người khác nhớ.'],
    ['Lê Lợi và Nguyễn Trãi', '6 · Thắng rồi vẫn giữ lễ', '9 · Nói bằng tiếng của người nghe',
      'Hội thề Đông Quan là mã sáu ở dạng rõ nhất trong cả Thư viện; và cuộc kháng chiến được kết bằng một văn bản, không bằng một cuộc tàn sát.'],
    ['Quang Trung – Nguyễn Huệ', '8 · Dựng cửa cho người tài', '9 · Nói bằng tiếng của người nghe',
      'Trận đánh chỉ vài ngày; việc ông làm ngay sau đó là mở cửa tìm người tài và đưa tiếng nói của dân vào khoa cử.'],
    ['Võ Nguyên Giáp', '5 · Đổi phương án khi dữ liệu đổi', '1 · Chuẩn bị dài hơn trận đánh',
      'Pháo đã vào trận địa, giờ nổ súng đã định, ông vẫn ra lệnh kéo pháo ra. Đây là ca kinh điển của việc chịu mất mặt để đổi phương án.'],

    ['Lý Công Uẩn', '3 · Chọn chỗ trước khi chọn sức', '7 · Viết ra để cái đúng sống lâu hơn người viết',
      'Ông đổi chỗ đứng cho cả một quốc gia, và viết hẳn một bài chiếu nói rõ lý do — nên đời sau tranh luận được với ông.'],
    ['Lý Thánh Tông và Lý Nhân Tông', '8 · Dựng cửa cho người tài', '7 · Viết ra để cái đúng sống lâu hơn người viết',
      'Khoa thi là cái cửa; và nó thành định chế viết ra được nên chạy tiếp gần chín trăm năm sau khi người lập đã mất.'],
    ['Trần Nhân Tông', '12 · Làm cái mình không hưởng', '7 · Viết ra để cái đúng sống lâu hơn người viết',
      'Rời ngôi khi còn mạnh, rồi lập một thiền phái có tổ chức và có người kế tục — không để lại uy tín cá nhân mà để lại một dòng.'],
    ['Lê Thánh Tông', '7 · Viết ra để cái đúng sống lâu hơn người viết', '8 · Dựng cửa cho người tài',
      'Ông viết vào luật cả những điều lẽ ra vua có thể tuỳ ý quyết — tức là tự trói mình để cái đúng không phụ thuộc vào một ông vua giỏi.'],
    ['Thân Nhân Trung', '7 · Viết ra để cái đúng sống lâu hơn người viết', '9 · Nói bằng tiếng của người nghe',
      'Khắc vào đá là hình thức viết bền nhất thời ấy; và câu ông viết ngắn tới mức năm trăm năm sau người ta vẫn dẫn nguyên.'],
    ['Hồ Quý Ly', '5 · Đổi phương án khi dữ liệu đổi', '7 · Viết ra để cái đúng sống lâu hơn người viết',
      'Xếp ở đây theo chiều ngược: dữ liệu về lòng người đã báo mà ông không đổi nhịp. Thành đá còn tới nay, triều đại thì không.'],
    ['Nguyễn Trường Tộ', '12 · Làm cái mình không hưởng', '7 · Viết ra để cái đúng sống lâu hơn người viết',
      'Ông viết cho một thời chưa tới. Không có phần thưởng nào trong đời ông, nhưng văn bản còn nên đời sau đọc được.'],
    ['Phan Châu Trinh', '12 · Làm cái mình không hưởng', '9 · Nói bằng tiếng của người nghe',
      'Ông chọn con đường không thấy đích trong đời mình, và đóng gói nó vào chín chữ đủ dễ nhớ để truyền đi.'],
    ['Phan Bội Châu', '8 · Dựng cửa cho người tài', '4 · Đi tới chỗ có vấn đề và chỗ có lời giải',
      'Đông Du là một cái cửa mở ra ngoài: đưa người trẻ tới chỗ có tri thức mới, chấp nhận mất kiểm soát.'],

    ['Chu Văn An', '3 · Chọn chỗ trước khi chọn sức', '12 · Làm cái mình không hưởng',
      'Ông đổi chỗ làm việc chứ không đổi việc: rời triều đình, mở trường, và dồn phần đời còn lại vào lớp người kế tiếp.'],
    ['Nguyễn Trãi', '9 · Nói bằng tiếng của người nghe', '6 · Thắng rồi vẫn giữ lễ',
      'Ông viết thư dụ hàng, viết cáo, và viết thơ Nôm — cả ba đều là chọn đúng thứ tiếng cho đúng người nghe.'],
    ['Nguyễn Bỉnh Khiêm', '12 · Làm cái mình không hưởng', '3 · Chọn chỗ trước khi chọn sức',
      'Về ở ẩn nhưng không đóng cửa: ông chuyển toàn bộ ảnh hưởng của mình sang lớp học trò, kể cả học trò ở các phe đối lập.'],
    ['Lê Quý Đôn', '1 · Chuẩn bị dài hơn trận đánh', '4 · Đi tới chỗ có vấn đề và chỗ có lời giải',
      'Bộ sách của ông là kết quả của thói quen ghi chép nhiều chục năm, và ghi ngay tại nơi ông đang làm việc.'],
    ['Nguyễn Đình Chiểu', '10 · Chưa được trao thì tự làm', '9 · Nói bằng tiếng của người nghe',
      'Mất phương tiện lớn nhất, ông vẫn mở trường và bốc thuốc; rồi viết bằng thể thơ mà người ít chữ kể lại được bằng miệng.'],
    ['Nguyễn Khuyến', '3 · Chọn chỗ trước khi chọn sức', '9 · Nói bằng tiếng của người nghe',
      'Ông chọn giữ chỗ đứng và trả bằng cơ hội; phần còn lại của đời ông dồn vào thơ Nôm về chính làng mình.'],
    ['Lương Văn Can', '8 · Dựng cửa cho người tài', '7 · Viết ra để cái đúng sống lâu hơn người viết',
      'Trường không thu tiền là một cái cửa; và khi cửa bị đóng, ông viết sách để điều mình dạy còn đọc lại được.'],

    ['Tuệ Tĩnh', '2 · Biến cái sẵn có thành lực lượng', '7 · Viết ra để cái đúng sống lâu hơn người viết',
      'Ông lấy cây cỏ bản địa làm nguồn thuốc, rồi hệ thống hoá thành sách nên nghề không mất theo người.'],
    ['Hải Thượng Lãn Ông Lê Hữu Trác', '11 · Ghi ra chỗ hỏng', '7 · Viết ra để cái đúng sống lâu hơn người viết',
      'Ghi cả ca chữa thất bại kèm nguyên nhân, rồi viết y đức thành điều khoản — vừa nhận lỗi vừa dựng chuẩn.'],
    ['Trần Đại Nghĩa', '2 · Biến cái sẵn có thành lực lượng', '12 · Làm cái mình không hưởng',
      'Bỏ một sự nghiệp đang thuận để về làm kỹ thuật bằng vật liệu kiếm được tại chỗ.'],
    ['Tôn Thất Tùng', '1 · Chuẩn bị dài hơn trận đánh', '7 · Viết ra để cái đúng sống lâu hơn người viết',
      'Hàng trăm lá gan được phẫu tích trước khi có một phương pháp; và ông biến nó thành quy trình dạy lại được, không giữ làm biệt tài riêng.'],
    ['Đặng Văn Ngữ', '4 · Đi tới chỗ có vấn đề và chỗ có lời giải', '2 · Biến cái sẵn có thành lực lượng',
      'Ông mang phòng thí nghiệm tới chỗ có thương binh, và làm kháng sinh từ một lọ giống nấm mang theo người.'],
    ['Lương Định Của', '4 · Đi tới chỗ có vấn đề và chỗ có lời giải', '2 · Biến cái sẵn có thành lực lượng',
      'Ông lội ruộng cấy cùng nông dân, nên giống chọn tạo ra hợp với đồng đất thật chứ không chỉ hợp với trạm.'],
    ['Lê Văn Thiêm', '12 · Làm cái mình không hưởng', '8 · Dựng cửa cho người tài',
      'Đặt nền là việc mà thành quả rơi vào tay lớp sau; ông đổi con đường nghiên cứu của mình lấy một cái cửa cho người khác.'],
    ['Hoàng Tụy', '11 · Ghi ra chỗ hỏng', '12 · Làm cái mình không hưởng',
      'Ông có thể chỉ làm toán và sống yên; ông chọn thêm phần việc nói ra chỗ hỏng, dù biết mình sẽ không thấy nó được sửa.'],
    ['Ngô Bảo Châu', '3 · Chọn chỗ trước khi chọn sức', '1 · Chuẩn bị dài hơn trận đánh',
      'Chọn đúng bài toán rồi mới dồn nhiều năm vào nó — chọn bài toán là quyết định lớn hơn số giờ ngồi làm.'],

    ['Nguyễn Du', '9 · Nói bằng tiếng của người nghe', '7 · Viết ra để cái đúng sống lâu hơn người viết',
      'Ông bỏ ngôn ngữ của khoa cử để viết bằng tiếng nói của dân, và làm cho tiếng nói ấy đẹp lên tới mức không ai bỏ đi được nữa.'],
    ['Hồ Xuân Hương', '10 · Chưa được trao thì tự làm', '9 · Nói bằng tiếng của người nghe',
      'Không có kênh chính thức nào cho tiếng nói của bà, nên bà tìm ra một hình thức mà không ai cấm được.'],
    ['Đoàn Thị Điểm', '9 · Nói bằng tiếng của người nghe', '1 · Chuẩn bị dài hơn trận đánh',
      'Chuyển giao tốt không phải chép lại: bà dựng lại cả nhạc điệu bằng chất liệu tiếng Việt, việc đòi công phu hơn dịch.'],
    ['Bà Huyện Thanh Quan', '1 · Chuẩn bị dài hơn trận đánh', '9 · Nói bằng tiếng của người nghe',
      'Rất ít bài, nhưng bài nào cũng ở chuẩn cao nhất — thời gian của bà nằm ở phần mài, không ở phần công bố.'],
    ['Cao Bá Quát', '10 · Chưa được trao thì tự làm', '3 · Chọn chỗ trước khi chọn sức',
      'Ông không uốn mình theo khuôn khoa cử để được trao chỗ, và chấp nhận toàn bộ hệ quả của lựa chọn ấy.'],
    ['Văn Cao', '9 · Nói bằng tiếng của người nghe', '12 · Làm cái mình không hưởng',
      'Một bài hát cho việc chung, viết lúc ngoài hai mươi tuổi, và sau này gia đình hiến tặng lại cho Nhà nước.'],
    ['Đặng Thái Sơn', '1 · Chuẩn bị dài hơn trận đánh', '12 · Làm cái mình không hưởng',
      'Nhiều năm luyện trong thiếu thốn trước một cuộc thi mười mấy ngày; nay phần lớn công sức của ông dồn vào học trò.'],

    ['Người thầy vùng cao', '12 · Làm cái mình không hưởng', '4 · Đi tới chỗ có vấn đề và chỗ có lời giải',
      'Ở lại nơi ít người muốn ở, năm này qua năm khác, và phần lớn kết quả rơi vào đời của học trò chứ không của mình.'],
    ['Đội tuyển học sinh Việt Nam ở các kỳ thi quốc tế', '8 · Dựng cửa cho người tài', '1 · Chuẩn bị dài hơn trận đánh',
      'Thành tích lặp lại nhiều chục năm là dấu hiệu của một cái cửa chạy đều, không phải của những cá nhân may mắn.'],
    ['Người Việt làm nghề ở nước ngoài', '4 · Đi tới chỗ có vấn đề và chỗ có lời giải', '7 · Viết ra để cái đúng sống lâu hơn người viết',
      'Đi ra để thấy chuẩn, đi về để đặt chuẩn; chuẩn chỉ ở lại nếu được viết thành quy trình và giáo trình.'],
    ['Người thợ giỏi và làng nghề', '12 · Làm cái mình không hưởng', '1 · Chuẩn bị dài hơn trận đánh',
      'Nhận học trò và dạy thật dù biết học trò sẽ giỏi hơn mình; và nghề chỉ vào tay được sau rất nhiều năm làm cùng nhau.'],
    ['Trang để trống', '10 · Chưa được trao thì tự làm', '11 · Ghi ra chỗ hỏng',
      'Không ai giao cho học viên việc viết một chân dung; em tự đi tìm, tự viết, và tự ghi cả chỗ nhân vật của mình sai.']
  ];

  /* Bí danh cho màn hình đã dựng sẵn trong man-hinh.js */

  /* ── 4 · KỂ MỘT CÂU CHUYỆN TRONG BẢY PHÚT ───────────────────
     Khớp với hạt giống tri thức 7 phút mà hệ đã có.             */
  G.MM_KE_CHUYEN = [
    { p: '0:00 – 0:30', t: 'Đặt tình huống, giấu tên nhân vật', ai: 'Coach',
      n: 'Nêu hoàn cảnh và ràng buộc, *chưa nói ai*. Cả buổi sống hay chết ở ba mươi giây này: nếu các em không thấy bài toán thì phần sau chỉ là kể chuyện.',
      loi: 'Em có ba mươi giây. Đối phương đông hơn nhiều lần, thuyền tốt hơn, lương đủ hơn. Em còn một con sông. Em làm gì?',
      hong: 'Coach nói tên nhân vật ngay câu đầu. Các em biết kết cục rồi thì không còn gì để nghĩ.' },

    { p: '0:30 – 2:00', t: 'Cho các em chọn trước khi biết đáp án', ai: 'Cả chi hội',
      n: 'Ba em nói phương án, mỗi em một câu. Coach *không* bình luận đúng sai, chỉ ghi lên bảng. Đây là phút các em có quyền sai miễn phí.',
      loi: 'Ba em nói, mỗi em đúng một câu. Chưa ai sai cả — chúng ta chưa biết đáp án.',
      hong: 'Coach gật đầu hoặc nhíu mày với một phương án. Từ đó các em đoán ý Coach thay vì nghĩ.' },

    { p: '2:00 – 3:30', t: 'Kể quyết định thật, không kể tiểu sử', ai: 'Coach',
      n: 'Nói tên, nói khoảng thời gian, nói người ấy *chọn gì* và *trả giá gì*. Chỉ một quyết định. Không quê quán, không dòng dõi, không năm sinh trừ khi nó là một phần của bài toán.',
      loi: 'Người ấy tên là… Ông chọn… Và cái giá ông trả là…',
      hong: 'Coach kể sang tiểu sử. Mất ba phút và cả chi hội rơi ra khỏi câu chuyện.' },

    { p: '3:30 – 4:30', t: 'Nói chỗ người ấy sai, thua, hoặc chỗ sử liệu không chắc', ai: 'Coach',
      n: 'Bắt buộc, không có buổi nào được bỏ pha này. Nếu chân dung có ô lưu ý về sử liệu thì đọc luôn ô ấy nguyên văn, kể cả khi nó làm câu chuyện bớt gọn.',
      loi: 'Chỗ này sử chép khác nhau, nên chúng ta chỉ nói tới mức chắc chắn. Và đây là chỗ ông ấy làm hỏng.',
      hong: 'Hết bảy phút mà không có một câu nào nói nhân vật sai. Buổi ấy đã thành buổi thờ cúng, không phải buổi học.' },

    { p: '4:30 – 5:30', t: 'Chỉ ra sản phẩm hôm nay còn xem được', ai: 'Coach',
      n: 'Mở bảng bốn mươi lăm sản phẩm để đời. Nói *một thứ cụ thể* và *một chỗ đi xem được*: một cuốn sách, một tấm bia, một bộ luật, một khu di tích, một phương pháp còn dùng.',
      loi: 'Thứ ông để lại hiện còn ở… Em đi xem được. Cuối tháng chi hội đi một chuyến.',
      hong: 'Coach chỉ nói được câu kiểu “ông để lại tinh thần…”. Không chỉ ra được vật gì thì cắt hẳn câu ấy đi.' },

    { p: '5:30 – 6:30', t: 'Rút mật mã và tìm người thứ hai mang nó', ai: 'Coach và chi hội',
      n: 'Gọi tên đúng một mật mã, rồi hỏi: trong Thư viện còn ai mang mã này nữa? Một mật mã chỉ thành mật mã khi các em chỉ ra được người thứ hai.',
      loi: 'Mật mã hôm nay là… Còn ai nữa mang mã này? Ai nói được người thứ hai?',
      hong: 'Coach đọc mật mã như đọc khẩu hiệu và không em nào nêu được người thứ hai. Nghĩa là chưa ai hiểu.' },

    { p: '6:30 – 7:00', t: 'Giao đúng một việc trong tuần', ai: 'Coach',
      n: 'Lấy nguyên ô “em dùng lại được gì ngay tuần này” của chân dung ấy. Giao đúng một việc, có ngày kiểm, không thêm lời kêu gọi.',
      loi: 'Tuần này mỗi em làm đúng việc này. Tuần sau em nào làm rồi thì giơ tay, không cần kể hay.',
      hong: 'Không giao việc, hoặc giao một việc chung chung. Tuần sau không đo được gì và buổi kể coi như chưa xảy ra.' }
  ];

  /* ── 5 · BẢY CÂU HỎI MỞ SAU MỖI CÂU CHUYỆN ────────────────── */
  G.MM_KHOI_BAY = [
    { t: 'Nếu là em, em chọn thế nào?',
      n: 'Câu hỏi duy nhất buộc các em đứng vào chỗ ràng buộc thật, thay vì ngồi ngoài khen người trong chuyện.',
      vi: 'Trả lời tốt là trả lời có kèm cái giá phải trả. Trả lời chỉ nghe hay thì hỏi tiếp: *em mất gì?*' },

    { t: 'Cái giá của lựa chọn ấy là gì, và ai trả?',
      n: 'Mọi quyết định trong Thư viện đều có người trả giá, thường là người không có tên trong sử. Bỏ câu này thì lịch sử thành truyện cổ tích.',
      vi: 'Dấu hiệu các em đã hiểu: có em nhắc tới người lính, người dân, người nhà — chứ không chỉ nhắc tới nhân vật chính.' },

    { t: 'Người ấy đã chuẩn bị gì trước khi tới lúc phải quyết?',
      n: 'Kéo sự chú ý ra khỏi khoảnh khắc kịch tính và đưa nó về quãng dài trước đó — đúng chỗ mật mã thứ nhất nằm.',
      vi: 'Trả lời tốt chỉ ra được một việc cụ thể làm từ trước, không phải một phẩm chất chung chung.' },

    { t: 'Chỗ nào trong chuyện này là sử liệu, chỗ nào là truyền thuyết?',
      n: 'Dạy trẻ tin đúng mức là một phần của dạy trẻ tư duy. Câu này để các em quen với việc một câu chuyện có nhiều mức chắc chắn khác nhau.',
      vi: 'Coach phải trả lời được câu này trước khi hỏi. Nếu Coach không biết thì nói *tôi không chắc* ngay tại chỗ.' },

    { t: 'Người ấy sai ở đâu?',
      n: 'Một người không bao giờ sai thì không ai học được gì từ họ, và đứa trẻ đọc xong chỉ thấy mình càng xa.',
      vi: 'Nếu cả chi hội im lặng, Coach nêu trước một chỗ. Lần sau các em sẽ tự nêu.' },

    { t: 'Bỏ đi một điều kiện thuận lợi thì kế ấy còn chạy không?',
      n: 'Tách cái ăn may ra khỏi cái nguyên lý. Không tách được thì bài học không mang sang việc khác được.',
      vi: 'Ví dụ: bỏ thuỷ triều thì trận Bạch Đằng còn gì? Điều gì mới là chìa khoá — cây cọc hay việc đọc đúng quy luật?' },

    { t: 'Thứ người ấy để lại, hôm nay em đi xem được ở đâu, và bao giờ em đi?',
      n: 'Câu này biến một buổi kể chuyện thành một kế hoạch. Nó cũng là cách kiểm xem cột sản phẩm có viết đủ cụ thể hay không.',
      vi: 'Trả lời tốt là một địa chỉ và một ngày. Trả lời *ở trong lòng dân tộc* thì cột sản phẩm của chân dung ấy cần viết lại.' }
  ];

  /* ── 6 · LUẬT DÙNG NHÂN VẬT LỊCH SỬ TRONG DẠY TRẺ ───────────
     Mười lăm điều. Đây là phần chặn cả kho khỏi trượt thành
     tuyên truyền — đọc trước khi mở bảng chân dung.             */
  G.MM_LUAT = [
    'Không thần thánh hoá. Nhân vật là người, có giới hạn, có lúc sai. Một hình mẫu không có vết là một hình mẫu không dùng được.',
    'Mỗi buổi phải nêu ít nhất một chỗ nhân vật *sai, thua, hoặc bị chê*. Buổi nào không nêu được thì Coach chuẩn bị chưa xong, không phải nhân vật hoàn hảo.',
    'Phân biệt sử liệu với truyền thuyết ngay trong lúc kể, không đẩy xuống cuối buổi. Câu mẫu: *chỗ này sử chép, chỗ này là truyền tụng, chỗ này các nhà nghiên cứu còn bàn.*',
    'Không bịa chi tiết cho câu chuyện hay hơn. Một chi tiết bịa làm buổi kể sinh động hơn năm phút và làm hỏng lòng tin nhiều năm.',
    'Không bịa niên đại, số liệu trận đánh, tên tác phẩm, hay trích dẫn nguyên văn. Không chắc thì nói ở mức khái quát đúng, đừng nói cụ thể sai.',
    'Không dùng lịch sử để hạ thấp dân tộc khác. Kể việc quân xâm lược làm, không kết luận về con người của một dân tộc.',
    'Nuôi lòng tự trọng, không nuôi lòng tự tôn. Người Việt giỏi ở đâu thì nói ở đó; học được gì từ nơi khác thì cũng nói.',
    'Với người đang sống, ghi việc đã làm, không kết luận về con người. Hành trình của họ chưa kết thúc.',
    'Kể *quyết định*, đừng kể tiểu sử. Bảy phút chỉ đủ cho một quyết định và cái giá của nó.',
    'Mỗi buổi kết bằng một việc làm được trong tuần, có ngày kiểm. Không kết bằng lời kêu gọi — cảm hứng không kèm hành động thì tan trong ba ngày.',
    'Không dùng nhân vật lịch sử để ép hoặc để mỉa một em đang thua. Câu *người ta ngày xưa khổ hơn con nhiều* làm hỏng cả nhân vật lẫn đứa trẻ.',
    'Cho phép các em không đồng ý với nhân vật, và không cho điểm cao hơn cho em nào chọn giống lịch sử. Kiểm bằng chất lượng lý lẽ.',
    'Ghi nguồn ở mức tra được. Khi một em hỏi *sao Coach biết*, Coach phải trả lời được, hoặc hẹn buổi sau trả lời.',
    'Khi Coach không chắc thì nói *tôi không chắc* ngay tại chỗ, và ghi lại để tra. Đây là bài học lớn hơn phần lớn nội dung của buổi.',
    'Không dùng câu chuyện lịch sử để bán hàng, để tuyển thành viên, hay để tôn một người đang sống trong hệ thống. Vi phạm điều này thì cả kho mất tư cách.'
  ];

})(window.GV = window.GV || {});
