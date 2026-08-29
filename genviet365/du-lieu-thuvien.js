/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · THƯ VIỆN GEN VIỆT
   Bộ sách sáu quyển về những người mang bộ gen Việt xuất sắc nhất:
   danh tướng, nhà kiến quốc, hiền tài, nhà khoa học, người làm nên
   văn hiến — và mười hai mô thức tư duy rút ra từ họ.

   Đây KHÔNG phải một danh sách tấm gương. Mỗi chân dung phải trả lời
   được bốn câu: người ấy đứng trước quyết định gì · chọn thế nào ·
   mô thức rút ra là gì · và tuần này học viên làm được việc gì từ đó.
   Chân dung nào không trả lời được cả bốn thì chưa vào sách.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var GV = window.GV || {};
window.GV = GV;

/* ══════════ BẢY NGUYÊN TẮC BIÊN SOẠN ══════════
   Viết trước khi viết chân dung đầu tiên, và là thứ giữ cho bộ sách
   không trượt thành sách ca ngợi.                                    */
GV.TV_NGUYEN_TAC = [
  { t: 'Không thần thánh hoá',
    n: 'Ghi cả thất bại, cả giới hạn, cả chỗ người ấy sai. Một hình mẫu không có vết là một hình mẫu không dùng được — đứa trẻ đọc xong thấy mình càng xa.' },
  { t: 'Phân biệt sử liệu và truyền tụng',
    n: 'Chỗ nào là chính sử, chỗ nào là giai thoại, chỗ nào các nhà nghiên cứu còn tranh luận — nói rõ. Dạy trẻ tin đúng mức là một phần của dạy trẻ tư duy.' },
  { t: 'Mỗi chân dung rút ra một mô thức dùng được',
    n: 'Không dừng ở "hãy noi gương". Phải nói được: cách nghĩ ấy dùng vào bài toán nào của một đứa trẻ hôm nay.' },
  { t: 'Không lấy người đang sống làm hình mẫu đóng khung',
    n: 'Hành trình của họ chưa kết thúc. Với người đang sống, ghi việc đã làm, không kết luận về con người.' },
  { t: 'Nuôi lòng tự trọng, không nuôi lòng tự tôn',
    n: 'Không so dân tộc này hơn dân tộc kia. Người Việt giỏi ở đâu thì nói ở đó, và học được gì từ nơi khác thì cũng nói.' },
  { t: 'Mỗi chân dung kèm một việc làm được trong tuần',
    n: 'Cảm hứng không kèm hành động thì tan trong ba ngày. Đây là chỗ bộ sách nối vào nhịp tuần của chi hội.' },
  { t: 'Có chỗ để tra lại',
    n: 'Ghi nguồn ở mức tra được. Một bộ sách không tra được là một bộ sách dạy trẻ tin theo lời người lớn.' }
];

/* ══════════ SÁU QUYỂN ══════════ */
GV.TV_QUYEN = [
  { q: 'QUYỂN 1', t: 'GIỮ NƯỚC', mau: '#BE0E16', so: 8,
    hoi: 'Khi lực lượng chênh lệch, người giỏi chọn gì?',
    n: 'Nghệ thuật quân sự Việt Nam gần như luôn là bài toán của bên yếu hơn. Chính vì thế nó là kho tàng về cách chọn nơi, chọn lúc, chọn đòn bẩy — thứ dùng được cho mọi bài toán mà nguồn lực không đủ.' },
  { q: 'QUYỂN 2', t: 'DỰNG NƯỚC', mau: '#185AB4', so: 9,
    hoi: 'Làm sao để cái tốt sống lâu hơn người tạo ra nó?',
    n: 'Từ Chiếu dời đô tới bộ luật Hồng Đức: những người hiểu rằng một quyết định đúng chưa đủ, phải dựng được thể chế để cái đúng ấy tự chạy khi mình không còn.' },
  { q: 'QUYỂN 3', t: 'HIỀN TÀI', mau: '#5140B4', so: 7,
    hoi: 'Người có tài mà không được dùng thì làm gì?',
    n: 'Kẻ sĩ Việt Nam. Người từ quan đi dạy học, người dâng điều trần không được nghe, người mù vẫn mở trường. Quyển khó nhất và cần nhất, vì phần lớn đời người ta ở trong hoàn cảnh ấy.' },
  { q: 'QUYỂN 4', t: 'TRÍ TUỆ KHOA HỌC', mau: '#0B7350', so: 9,
    hoi: 'Giải bài toán của mình bằng nguồn lực của mình như thế nào?',
    n: 'Từ "Nam dược trị Nam nhân" tới bổ đề cơ bản. Điểm chung: không chờ điều kiện đủ mới bắt đầu, và không sao chép nguyên xi lời giải của nơi khác.' },
  { q: 'QUYỂN 5', t: 'VĂN HIẾN', mau: '#A8801F', so: 7,
    hoi: 'Điều gì còn lại khi triều đại đã mất?',
    n: 'Chữ nghĩa, âm nhạc, tiếng nói. Thứ mềm nhất lại là thứ sống lâu nhất — và là thứ làm nên phần "Việt" trong bộ gen Việt.' },
  { q: 'QUYỂN 6', t: 'NGƯỜI ĐƯƠNG THỜI', mau: '#0B6675', so: 5,
    hoi: 'Bộ gen ấy hôm nay trông như thế nào?',
    n: 'Quyển viết theo luật riêng: không dựng tượng người đang sống. Ghi việc, ghi chân dung tập thể, và để ngỏ chỗ cho chính học viên viết tiếp.' }
];

/* ══════════ QUYỂN 1 · GIỮ NƯỚC ══════════ */
GV.TV_Q1 = [
  { ten: 'Ngô Quyền', nam: '897 – 944', danh: 'Người chấm dứt hơn một nghìn năm Bắc thuộc',
    viec: 'Trận Bạch Đằng năm 938 đánh tan quân Nam Hán, mở ra thời kỳ độc lập lâu dài.',
    quyet: 'Không dàn quân đối đầu trên bộ với đội thuyền mạnh hơn, mà đóng cọc nhọn bịt sắt xuống lòng sông, nhử thuyền địch vào lúc triều lên rồi đánh khi triều rút.',
    mothuc: 'Biến điều kiện tự nhiên — thuỷ triều, lòng sông — thành một phần của lực lượng. Khi không thể mạnh hơn, hãy chọn nơi mà sức mạnh của đối phương không dùng được.',
    tru: 'T · A', pc: 'Trí · Dũng',
    lam: 'Chọn một việc em đang thua và hỏi: mình đang đánh ở chỗ nào bất lợi nhất, đổi chỗ được không?',
    hoi: 'Nếu không có thuỷ triều thì kế ấy còn dùng được không? Điều gì mới thật sự là chìa khoá — cây cọc hay việc đọc đúng quy luật?' },

  { ten: 'Lê Hoàn', nam: '941 – 1005', danh: 'Người giữ nước trong thế nội bộ chưa yên',
    viec: 'Đánh bại quân Tống năm 981 khi nhà Đinh vừa đổ, triều đình chưa vững.',
    quyet: 'Nhận ngôi trong hoàn cảnh bị nghi ngờ về danh nghĩa, chấp nhận tiếng đời để có một bộ chỉ huy thống nhất trước khi giặc tới.',
    mothuc: 'Có những lúc phải chọn giữa cái danh sạch và cái việc xong. Người gánh việc lớn thường phải trả giá bằng tiếng của chính mình.',
    tru: 'I · A', pc: 'Dũng · Chủ',
    lam: 'Nhận một việc khó trong nhóm mà em biết làm xong sẽ bị vài người trách.',
    hoi: 'Ranh giới giữa "chịu tiếng để làm việc" và "lấy việc để biện minh cho tham vọng" nằm ở đâu?',
    luu: 'Việc Lê Hoàn lên ngôi và quan hệ với Thái hậu Dương Vân Nga được sử chép khác nhau; đây là chỗ các nhà nghiên cứu còn bàn.' },

  { ten: 'Lý Thường Kiệt', nam: '1019 – 1105', danh: 'Người đánh trước để giữ nhà',
    viec: 'Năm 1075–1076 chủ động đưa quân sang phá các căn cứ hậu cần của nhà Tống ở Ung Châu, Khâm Châu, Liêm Châu; sau đó lập phòng tuyến sông Như Nguyệt chặn đứng cuộc xâm lược 1077.',
    quyet: '"Ngồi yên đợi giặc không bằng đem quân ra trước để chặn thế mạnh của giặc." Đánh phủ đầu vào kho lương, rồi rút về giữ.',
    mothuc: 'Tiên phát chế nhân: khi thấy rõ cuộc va chạm là không tránh được, chủ động chọn thời điểm và địa điểm thay vì để đối phương chọn hộ.',
    tru: 'G · A', pc: 'Trí · Dũng',
    lam: 'Nhìn lịch tháng tới, tìm một việc chắc chắn sẽ dồn vào cuối kỳ, và làm trước một phần ngay tuần này.',
    hoi: 'Đánh trước khác gây sự ở chỗ nào? Lấy gì để phân biệt hai điều đó ngoài kết quả?',
    luu: 'Bài thơ "Nam quốc sơn hà" gắn với phòng tuyến Như Nguyệt theo truyền tụng; tác giả và thời điểm ra đời vẫn là vấn đề còn tranh luận.' },

  { ten: 'Trần Hưng Đạo', nam: 'khoảng 1228 – 1300', danh: 'Người soạn ra cách thắng một đế quốc',
    viec: 'Chỉ huy quân dân Đại Việt trong hai cuộc kháng chiến chống Nguyên Mông 1285 và 1288, đỉnh cao là trận Bạch Đằng 1288. Để lại Hịch tướng sĩ và Binh thư yếu lược.',
    quyet: 'Khi thế giặc mạnh thì rút, bỏ trống thành, tránh trận quyết chiến sớm; chờ địch mỏi, hậu cần đứt, rồi mới đánh. Trước khi mất, dặn vua: "Khoan thư sức dân để làm kế sâu rễ bền gốc, đó là thượng sách giữ nước."',
    mothuc: 'Dĩ đoản chế trường — lấy sở trường của mình chế sở trường của địch; và nuôi gốc trước khi dùng gốc. Nguồn lực bền không đến từ trận thắng, nó đến từ việc dân không kiệt.',
    tru: 'G · I · T · A', pc: 'Trí · Chủ · Chí',
    lam: 'Tuần này chủ động NGỪNG một việc đang đuối, để dồn sức cho việc quan trọng nhất — và ghi lại cảm giác khi phải bỏ.',
    hoi: 'Rút lui khác bỏ cuộc ở điểm nào? Ai là người quyết định điều đó — người rút hay người nhìn vào?' },

  { ten: 'Trần Quốc Toản', nam: 'khoảng 1267 – 1285', danh: 'Người trẻ đòi được nhận trách nhiệm',
    viec: 'Vì còn nhỏ tuổi nên không được dự bàn việc nước ở hội nghị Bình Than; bóp nát quả cam trong tay lúc nào không hay, về nhà tự chiêu mộ quân, dựng cờ sáu chữ "Phá cường địch, báo hoàng ân".',
    quyet: 'Không đợi được mời. Tự tổ chức phần việc trong tầm tay mình rồi mang kết quả tới.',
    mothuc: 'Khi chưa được trao quyền, cách duy nhất để có quyền là làm được một việc mà người lớn không phủ nhận nổi.',
    tru: 'I · A', pc: 'Dũng · Chí',
    lam: 'Tìm một việc trong lớp hoặc trong chi hội mà không ai giao cho em, và cứ làm cho xong.',
    hoi: 'Nếu việc em tự nhận thất bại thì sao? Điều đó có làm lời đề nghị lần sau của em yếu đi không?',
    luu: 'Chi tiết bóp nát quả cam được chép trong sử và lưu truyền rộng; năm sinh năm mất chỉ là ước đoán.' },

  { ten: 'Lê Lợi và Nguyễn Trãi', nam: 'khởi nghĩa 1418 – 1427', danh: 'Cặp đôi tướng và mưu sĩ',
    viec: 'Mười năm khởi nghĩa Lam Sơn từ vài trăm người trong rừng núi Thanh Hoá tới ngày quân Minh rút khỏi Đông Quan. Kết thúc bằng Bình Ngô đại cáo.',
    quyet: 'Không tiêu diệt đến cùng đội quân đã thua. Ở hội thề Đông Quan, cấp thuyền, cấp ngựa, cấp lương cho hàng vạn quân Minh về nước — để dứt chiến tranh chứ không chỉ để thắng một trận.',
    mothuc: 'Tâm công — đánh vào lòng người. Mục tiêu không phải là làm đối phương thua, mà là làm cho cuộc đối đầu chấm dứt và không quay lại.',
    tru: 'G · I', pc: 'Đức · Trí',
    lam: 'Trong một mâu thuẫn tuần này, thắng xong hãy tìm cách để người kia giữ được thể diện.',
    hoi: '"Lấy đại nghĩa thắng hung tàn" là một nguyên tắc đạo đức hay một tính toán chiến lược? Có thể là cả hai không?' },

  { ten: 'Quang Trung – Nguyễn Huệ', nam: '1753 – 1792', danh: 'Người biến tốc độ thành vũ khí',
    viec: 'Rạch Gầm – Xoài Mút 1785 đánh tan quân Xiêm; Tết Kỷ Dậu 1789 hành quân thần tốc từ Phú Xuân ra Bắc, đại phá quân Thanh ở Ngọc Hồi – Đống Đa. Sau chiến thắng ban Chiếu cầu hiền, Chiếu lập học, đưa chữ Nôm vào khoa cử.',
    quyet: 'Lên ngôi rồi hành quân ngay giữa mùa đông, hẹn với quân sĩ ăn Tết ở Thăng Long — chấp nhận rủi ro của tốc độ để lấy yếu tố bất ngờ.',
    mothuc: 'Khi mạnh hơn về khả năng di chuyển, hãy biến thời gian thành mặt trận. Và ngay sau chiến thắng, việc đầu tiên là đi tìm người tài chứ không phải hưởng công.',
    tru: 'A · G', pc: 'Dũng · Chí',
    lam: 'Chọn một việc em vẫn hoãn và làm xong trong 48 giờ, không chờ đủ điều kiện.',
    hoi: 'Nhanh và vội khác nhau ở đâu? Cái gì phải chuẩn bị xong trước thì "nhanh" mới không thành "vội"?' },

  { ten: 'Võ Nguyên Giáp', nam: '1911 – 2013', danh: 'Người dám đổi phương án vào phút chót',
    viec: 'Tổng chỉ huy chiến dịch Điện Biên Phủ 1954.',
    quyet: 'Phương án ban đầu là "đánh nhanh thắng nhanh", pháo đã kéo vào trận địa, ngày giờ nổ súng đã định. Sau khi đọc lại tương quan, ông ra lệnh hoãn, kéo pháo ra, chuyển sang "đánh chắc tiến chắc" — quyết định mà chính ông về sau gọi là khó khăn nhất đời cầm quân.',
    mothuc: 'Đổi phương án khi dữ liệu đổi, kể cả khi đã đầu tư rất nhiều vào phương án cũ và kể cả khi việc đổi làm mình mất mặt.',
    tru: 'G · T', pc: 'Trí · Chủ',
    lam: 'Nhìn lại một kế hoạch em đang theo mà số liệu cho thấy không ổn — sửa nó tuần này, đừng đợi hết chu kỳ.',
    hoi: 'Cái gì khiến người ta khó bỏ một phương án đã đổ nhiều công vào? Em đã từng như thế chưa?' }
];

/* ══════════ QUYỂN 2 · DỰNG NƯỚC ══════════ */
GV.TV_Q2 = [
  { ten: 'Lý Công Uẩn', nam: '974 – 1028', danh: 'Người chọn chỗ đứng cho nghìn năm',
    viec: 'Năm 1010 ban Chiếu dời đô, rời Hoa Lư về thành Đại La, đặt tên Thăng Long.',
    quyet: 'Bỏ một kinh đô dễ phòng thủ trong núi để về một vùng đồng bằng mở — chọn chỗ thuận cho phát triển lâu dài thay vì chỗ an toàn trước mắt.',
    mothuc: 'Quyết định về VỊ TRÍ quan trọng hơn quyết định về nỗ lực. Ở sai chỗ thì cố mấy cũng chỉ đi ngang.',
    tru: 'G · A', pc: 'Trí · Chí',
    lam: 'Xem lại góc học của em: chỗ ấy đang giúp hay đang cản? Đổi một thứ trong tuần này.',
    hoi: 'An toàn và phát triển, khi phải chọn một, em lấy gì làm căn cứ?' },

  { ten: 'Lý Thánh Tông và Lý Nhân Tông', nam: 'Văn Miếu 1070 · khoa thi đầu 1075 · Quốc Tử Giám 1076', danh: 'Những người mở cửa học',
    viec: 'Lập Văn Miếu, mở khoa thi tuyển người tài, dựng Quốc Tử Giám — đặt nền cho chế độ khoa cử kéo dài gần chín trăm năm.',
    quyet: 'Chọn con đường tuyển người bằng thi cử thay vì chỉ dựa vào dòng dõi.',
    mothuc: 'Muốn có người tài lâu dài thì phải dựng CỬA cho người tài đi vào, chứ không đi tìm từng người một.',
    tru: 'G · T', pc: 'Trí · Chủ',
    lam: 'Nghĩ một cách để chi hội tìm được người mới giỏi mà không phụ thuộc vào việc ai đó tình cờ quen.',
    hoi: 'Thi cử mở cửa cho người tài, nhưng nó đóng cửa với loại tài nào?' },

  { ten: 'Trần Nhân Tông', nam: '1258 – 1308', danh: 'Người buông quyền lực đúng lúc',
    viec: 'Lãnh đạo đất nước qua hai cuộc kháng Nguyên; sau đó nhường ngôi, lên Yên Tử tu hành và sáng lập Thiền phái Trúc Lâm.',
    quyet: 'Rời ngôi khi đang ở đỉnh uy tín, không đợi tới lúc buộc phải rời.',
    mothuc: 'Chuyển giao lúc mạnh nhất, không phải lúc yếu nhất. Người đi ra khi còn được cần đến sẽ để lại một hệ thống; người bám tới cùng để lại một khoảng trống.',
    tru: 'I · G', pc: 'Chủ · Đức',
    lam: 'Nếu em đang giữ một vai trong nhóm, tuần này tập một người khác làm được việc của mình.',
    hoi: 'Vì sao rời khỏi một vị trí khi đang thành công lại khó hơn khi đang thất bại?' },

  { ten: 'Lê Thánh Tông', nam: '1442 – 1497', danh: 'Người dựng thể chế thay vì dựa vào minh quân',
    viec: 'Ban bộ Quốc triều hình luật (luật Hồng Đức), lập bản đồ hành chính, chuẩn hoá khoa cử, dựng bia tiến sĩ ở Văn Miếu, lập hội Tao đàn.',
    quyet: 'Viết thành luật những điều lẽ ra có thể tuỳ vua quyết — kể cả những điều bảo vệ người yếu thế, trong đó có một số quyền của người phụ nữ hiếm thấy ở luật pháp đương thời trong khu vực.',
    mothuc: 'Cái tốt phụ thuộc vào một người giỏi sẽ mất khi người ấy mất. Chỉ khi thành chuẩn viết ra được, dạy được, kiểm được thì nó mới sống tiếp.',
    tru: 'G · T · A', pc: 'Trí · Chủ',
    lam: 'Viết ra một việc em vẫn làm theo thói quen thành ba bước, rồi đưa cho một bạn làm thử.',
    hoi: 'Luật giữ được cái tốt, nhưng nó làm chậm cái gì?' },

  { ten: 'Thân Nhân Trung', nam: '1419 – 1499', danh: 'Người viết câu định nghĩa nguyên khí quốc gia',
    viec: 'Soạn bài ký cho bia tiến sĩ khoa Nhâm Tuất, dựng năm 1484 tại Văn Miếu.',
    quyet: 'Đặt việc trọng người tài lên hàng quốc sách và khắc vào đá: "Hiền tài là nguyên khí của quốc gia. Nguyên khí thịnh thì thế nước mạnh mà hưng thịnh; nguyên khí suy thì thế nước yếu mà thấp hèn."',
    mothuc: 'Khắc một nguyên tắc vào chỗ không xoá được, để đời sau không phải tranh luận lại từ đầu.',
    tru: 'G', pc: 'Trí · Chí',
    lam: 'Viết một câu nguyên tắc của gia đình hoặc của chi hội em, rồi dán ở chỗ ai cũng đọc được.',
    hoi: 'Một câu khắc vào đá có giữ được điều gì không, nếu người ta không còn tin nó?' },

  { ten: 'Hồ Quý Ly', nam: '1336 – 1407', danh: 'Bài học về cải cách đúng mà vẫn thất bại',
    viec: 'Cải cách sâu rộng: phát hành tiền giấy, hạn điền hạn nô, đưa chữ Nôm vào việc nước, đưa toán vào thi cử, xây thành Tây Đô. Năm 1407 thua quân Minh, đất nước rơi vào hai mươi năm đô hộ.',
    quyet: 'Làm nhiều cải cách cùng lúc, nhanh, và bằng quyền lực — trong khi lòng người chưa theo.',
    mothuc: 'Một cải cách đúng về nội dung vẫn đổ nếu sai về TỐC ĐỘ và về lòng người. Chính ông cũng từng hỏi: làm sao có được trăm vạn quân để chống giặc Bắc — và câu trả lời ông thiếu là lòng dân.',
    tru: 'I · A', pc: 'Trí — và chỗ thiếu là Đức',
    lam: 'Khi muốn thay đổi một nếp trong nhà, tuần này hỏi ý từng người trước khi đổi.',
    hoi: 'Nếu em chắc chắn mình đúng mà mọi người chưa theo, em đi tiếp hay dừng lại thuyết phục? Chi phí của mỗi lựa chọn là gì?' },

  { ten: 'Nguyễn Trường Tộ', nam: '1830 – 1871', danh: 'Người đúng mà không được nghe',
    viec: 'Dâng hàng chục bản điều trần đề nghị canh tân: mở mang kinh tế, cải cách giáo dục, học kỹ nghệ phương Tây, chấn chỉnh võ bị, mở rộng ngoại giao. Hầu hết không được thi hành.',
    quyet: 'Viết tiếp, ngay cả khi những bản trước rơi vào im lặng.',
    mothuc: 'Có những việc phải làm mà không có phần thưởng trong đời mình. Giá trị của một đề nghị đúng không mất đi vì nó bị bỏ qua — nó chỉ đến muộn.',
    tru: 'G · I', pc: 'Chí · Trí',
    lam: 'Nếu em từng góp ý mà không ai nghe, tuần này góp ý lần nữa — bằng cách khác, có số liệu.',
    hoi: 'Khi nào thì kiên trì là bản lĩnh, khi nào nó là cố chấp? Ai trả lời được câu này ngay lúc đang ở trong đó?' },

  { ten: 'Phan Châu Trinh', nam: '1872 – 1926', danh: 'Người chọn đường dài nhất',
    viec: 'Chủ trương "khai dân trí, chấn dân khí, hậu dân sinh" — mở mang hiểu biết, dựng lại khí phách, làm cho dân đủ sống. Gắn với phong trào Duy Tân và tinh thần Đông Kinh Nghĩa Thục (1907).',
    quyet: 'Không chọn con đường bạo động, mà chọn con đường giáo dục — con đường chậm nhất, không thấy kết quả trong đời mình.',
    mothuc: 'Có những bài toán chỉ giải được bằng cách nâng nền, và nâng nền thì phải chấp nhận không nhìn thấy đích.',
    tru: 'G · I', pc: 'Chí · Đức',
    lam: 'Chọn một việc mà kết quả chỉ thấy sau một năm, và bắt đầu tuần này.',
    hoi: 'Con đường chậm và con đường nhanh, cùng thời ấy đều có người theo. Ta có đủ căn cứ để nói ai đúng không?',
    luu: 'Cuộc tranh luận về đường lối giữa Phan Châu Trinh và Phan Bội Châu là một trong những cuộc tranh luận lớn của lịch sử cận đại; sách này ghi cả hai.' },

  { ten: 'Phan Bội Châu', nam: '1867 – 1940', danh: 'Người đưa hàng trăm thanh niên ra ngoài học',
    viec: 'Khởi xướng phong trào Đông Du, đưa thanh niên Việt Nam sang Nhật học, lập Duy Tân hội rồi Việt Nam Quang phục hội. Cuối đời bị giam lỏng ở Huế.',
    quyet: 'Không giữ người tài ở trong nước để chờ điều kiện, mà đưa họ ra chỗ có tri thức mới, chấp nhận mất kiểm soát.',
    mothuc: 'Muốn có một thế hệ khác thì phải cho thế hệ ấy đi tới chỗ mình chưa từng tới.',
    tru: 'G · A', pc: 'Chí · Dũng',
    lam: 'Đăng ký một hoạt động ngoài trường, ngoài vòng quen của em, trong tháng này.',
    hoi: 'Đi ra ngoài học rồi trở về — điều gì khiến người ta trở về?' }
];

/* ══════════ QUYỂN 3 · HIỀN TÀI ══════════ */
GV.TV_Q3 = [
  { ten: 'Chu Văn An', nam: '1292 – 1370', danh: 'Người thầy của muôn đời',
    viec: 'Làm quan Tư nghiệp Quốc Tử Giám, dạy thái tử. Dâng Thất trảm sớ xin chém bảy kẻ nịnh thần; sớ không được duyệt, ông treo mũ từ quan về Chí Linh mở trường dạy học tới cuối đời.',
    quyet: 'Rời quyền lực chứ không ở lại thoả hiệp — nhưng không rời việc, chỉ đổi chỗ làm việc.',
    mothuc: 'Khi không đổi được hệ thống từ bên trong, hãy đi làm cái việc mà mình vẫn đổi được: dạy người kế tiếp.',
    tru: 'I · T', pc: 'Đức · Chí',
    lam: 'Dạy lại cho một bạn một điều em làm tốt — trọn vẹn, tới khi bạn làm được.',
    hoi: 'Từ quan là giữ khí tiết hay là bỏ trận địa? Có câu trả lời nào đúng cho mọi hoàn cảnh không?' },

  { ten: 'Nguyễn Trãi', nam: '1380 – 1442', danh: 'Ức Trai — trí tuệ lớn và án oan lớn',
    viec: 'Quân sư của khởi nghĩa Lam Sơn, soạn Bình Ngô đại cáo, để lại Quân trung từ mệnh tập, Ức Trai thi tập và Quốc âm thi tập — tập thơ Nôm sớm nhất còn giữ được. Năm 1442 mắc án Lệ Chi Viên, bị tru di tam tộc; năm 1464 vua Lê Thánh Tông minh oan.',
    quyet: 'Sau chiến thắng, chọn ở lại làm việc trong triều đình đầy tranh chấp thay vì lui về ẩn dật.',
    mothuc: 'Tài năng lớn không tự bảo vệ được mình. Đây là chân dung để dạy điều ngược với mọi chuyện cổ tích: người giỏi và người tốt vẫn có thể chịu bất công.',
    tru: 'G · I · T', pc: 'Đức · Trí · Chí',
    lam: 'Viết ra một điều em cho là đúng mà hiện chưa ai công nhận, cất đi, đọc lại sau ba tháng.',
    hoi: 'Nếu biết trước kết cục, ông có nên rút lui không? Câu hỏi này để tranh luận, không để kết luận.' },

  { ten: 'Nguyễn Bỉnh Khiêm', nam: '1491 – 1585', danh: 'Trạng Trình — người biết lúc nào nên lui',
    viec: 'Đỗ Trạng nguyên năm 1535, làm quan tám năm rồi dâng sớ xin chém mười tám lộng thần, không được chấp thuận thì cáo quan về dựng am Bạch Vân dạy học. Học trò của ông có mặt ở nhiều phe đối lập nhau.',
    quyet: 'Về ở ẩn nhưng không đóng cửa: vẫn dạy học, vẫn được các thế lực đến hỏi ý.',
    mothuc: 'Rời khỏi bàn cờ không có nghĩa là mất ảnh hưởng. Ảnh hưởng bền nhất là ảnh hưởng qua người mình dạy.',
    tru: 'I · T', pc: 'Trí · Chủ',
    lam: 'Tuần này, thay vì tranh luận thắng một người, hãy hỏi họ ba câu để hiểu vì sao họ nghĩ thế.',
    hoi: 'Dạy học trò ở cả hai phe đối lập — đó là khôn ngoan hay là né tránh lựa chọn?',
    luu: 'Nhiều câu sấm Trạng Trình lưu truyền trong dân gian chưa được xác định là của ông; sách này không dùng chúng làm căn cứ.' },

  { ten: 'Lê Quý Đôn', nam: '1726 – 1784', danh: 'Nhà bác học ghi chép cả một thời đại',
    viec: 'Để lại khối trước tác đồ sộ: Vân đài loại ngữ, Đại Việt thông sử, Phủ biên tạp lục, Kiến văn tiểu lục — bao quát lịch sử, địa lý, nông nghiệp, thiên văn, triết học.',
    quyet: 'Đi tới đâu ghi tới đó, hỏi tới đó. Làm quan ở Thuận Hoá thì viết luôn một cuốn khảo về vùng đất ấy.',
    mothuc: 'Tri thức lớn không đến từ một khoảnh khắc thông minh, nó đến từ thói quen ghi chép có hệ thống suốt nhiều chục năm.',
    tru: 'T · A', pc: 'Trí · Chủ',
    lam: 'Bắt đầu một cuốn sổ ghi: mỗi ngày một điều em quan sát được, không phải điều em nghĩ.',
    hoi: 'Giữa đọc nhiều và ghi nhiều, cái nào làm người ta hiểu sâu hơn? Vì sao?' },

  { ten: 'Nguyễn Đình Chiểu', nam: '1822 – 1888', danh: 'Người mù mở trường, bốc thuốc, làm thơ',
    viec: 'Mù mắt ở tuổi ngoài hai mươi khi đang trên đường đi thi, về quê vừa dạy học vừa làm thầy thuốc vừa sáng tác. Tác giả Lục Vân Tiên và Văn tế nghĩa sĩ Cần Giuộc.',
    quyet: 'Từ chối hợp tác với chính quyền thực dân dù được mời và được hứa hẹn quyền lợi.',
    mothuc: '"Chở bao nhiêu đạo thuyền không khẳm, đâm mấy thằng gian bút chẳng tà." Khi mất phương tiện lớn nhất, con người vẫn còn thứ không ai lấy được: việc mình chọn làm và cách mình chọn sống.',
    tru: 'I', pc: 'Đức · Chí',
    lam: 'Chọn một việc em vẫn tránh vì "không có điều kiện", và làm phiên bản nhỏ nhất của nó ngay tuần này.',
    hoi: 'Hoàn cảnh lấy đi của em cái gì, và còn để lại cái gì? Liệt kê cả hai cột.' },

  { ten: 'Nguyễn Khuyến', nam: '1835 – 1909', danh: 'Tam nguyên Yên Đổ — đỗ đầu ba kỳ rồi về làng',
    viec: 'Đỗ đầu cả ba kỳ thi Hương, Hội, Đình. Làm quan hơn mười năm rồi cáo quan về quê giữa lúc đất nước mất chủ quyền, sống bằng dạy học và làm thơ.',
    quyet: 'Không nhận chức dưới chính quyền mới, chấp nhận nghèo.',
    mothuc: 'Có những lúc thứ đáng giữ nhất là chỗ đứng của mình, và giữ nó thì phải trả bằng cơ hội.',
    tru: 'I', pc: 'Đức · Chủ',
    lam: 'Từ chối một lời rủ dễ dãi mà em biết không hợp với đích của mình.',
    hoi: 'Giữa "ở lại để làm được chút gì" và "rút lui để giữ mình", hoàn cảnh nào nghiêng về vế nào?' },

  { ten: 'Lương Văn Can', nam: '1854 – 1927', danh: 'Người thầy dạy kinh doanh đầu tiên',
    viec: 'Thục trưởng Đông Kinh Nghĩa Thục (1907) — trường học miễn phí dạy chữ quốc ngữ, khoa học, và tinh thần tự cường. Sau khi trường bị đóng, ông viết những cuốn bàn về đạo làm ăn của người Việt.',
    quyet: 'Dạy thương mại và đạo đức kinh doanh vào thời mà nghề buôn bị coi thường.',
    mothuc: 'Muốn một dân tộc mạnh thì phải để người của mình làm ra của cải, và phải dạy cách làm ra của cải một cách tử tế.',
    tru: 'T · G', pc: 'Trí · Đức',
    lam: 'Ghi chi tiêu bảy ngày liền, không sửa số. Đây là bài học đầu tiên của mọi việc làm ăn.',
    hoi: 'Vì sao một xã hội coi thường nghề buôn lại thường nghèo?' }
];

/* ══════════ QUYỂN 4 · TRÍ TUỆ KHOA HỌC ══════════ */
GV.TV_Q4 = [
  { ten: 'Tuệ Tĩnh', nam: 'thế kỷ 14', danh: 'Người đặt ra "Nam dược trị Nam nhân"',
    viec: 'Nhà sư, thầy thuốc, tác giả Nam dược thần hiệu — hệ thống hoá cây thuốc trong nước, chủ trương dùng thuốc Nam chữa bệnh cho người Nam.',
    quyet: 'Không chép nguyên y thư phương Bắc, mà đi khảo cây cỏ bản địa và xây một hệ thống riêng.',
    mothuc: 'Lời giải của nơi khác không tự động là lời giải của mình. Phải kiểm lại trên chính điều kiện của mình.',
    tru: 'T · G', pc: 'Trí · Chủ',
    lam: 'Lấy một phương pháp học em đọc được trên mạng, thử đúng một tuần, rồi ghi lại nó hợp hay không hợp với em.',
    hoi: 'Khi nào thì "làm theo cách của mình" là sáng tạo, khi nào là bảo thủ?',
    luu: 'Năm sinh năm mất của Tuệ Tĩnh và một số chi tiết tiểu sử còn nhiều dị bản.' },

  { ten: 'Hải Thượng Lãn Ông Lê Hữu Trác', nam: '1724 – 1791', danh: 'Người viết y đức thành điều khoản',
    viec: 'Bộ Hải Thượng y tông tâm lĩnh gồm hàng chục quyển, tổng kết cả lý luận lẫn thực hành y học. Trong đó có phần y huấn nêu rõ những điều người thầy thuốc phải giữ.',
    quyet: 'Ghi lại cả những ca mình chữa THẤT BẠI, kèm phân tích vì sao — điều rất hiếm trong y thư thời ấy.',
    mothuc: 'Người làm nghề tử tế ghi lại lỗi của mình để người sau không mắc. Giấu lỗi là giữ danh cho mình và hại người đến sau.',
    tru: 'T · I', pc: 'Đức · Trí',
    lam: 'Lập một trang "sổ lỗi": ba lỗi trong tuần và nguyên nhân, không kèm lời tự trách.',
    hoi: 'Vì sao ghi lại lỗi lại khó hơn ghi lại thành công, dù nó có ích hơn?' },

  { ten: 'Trần Đại Nghĩa', nam: '1913 – 1997', danh: 'Người bỏ chỗ tốt để về chỗ khó',
    viec: 'Kỹ sư được đào tạo và làm việc tại Pháp; năm 1946 theo lời mời của Chủ tịch Hồ Chí Minh về nước. Tổ chức chế tạo vũ khí trong điều kiện thiếu thốn — trong đó có súng không giật SKZ và các loại đạn chống tăng.',
    quyet: 'Đổi một sự nghiệp đang thuận lấy một công việc gần như không có phương tiện.',
    mothuc: 'Kỹ thuật không đòi phòng thí nghiệm đẹp, nó đòi người hiểu nguyên lý đủ sâu để làm lại bằng thứ đang có.',
    tru: 'T · A', pc: 'Trí · Chí',
    lam: 'Làm một sản phẩm nhỏ chỉ bằng vật liệu có sẵn trong nhà, không mua gì.',
    hoi: 'Thiếu thốn có bao giờ là một lợi thế không? Trong trường hợp nào?' },

  { ten: 'Tôn Thất Tùng', nam: '1912 – 1982', danh: 'Người tìm ra một cách mổ mang tên mình',
    viec: 'Nghiên cứu giải phẫu gan từ hàng trăm lá gan, xây dựng phương pháp cắt gan có kế hoạch — được y văn thế giới gọi là phương pháp Tôn Thất Tùng.',
    quyet: 'Bắt đầu từ việc tỉ mỉ và ít ai muốn làm: phẫu tích hệ mạch trong gan, lặp đi lặp lại, để hiểu cấu trúc trước khi bàn tới kỹ thuật.',
    mothuc: 'Một phát hiện lớn thường nằm sau một việc nhỏ mà người khác thấy chán. Hiểu cấu trúc trước, kỹ thuật đến sau.',
    tru: 'T', pc: 'Trí · Chủ',
    lam: 'Chọn một chương em học kém nhất và ngồi vẽ lại cấu trúc của nó thành một sơ đồ.',
    hoi: 'Giữa "học nhiều mẹo làm bài" và "hiểu cấu trúc của môn", cái nào bền hơn khi đề khó lên?' },

  { ten: 'Đặng Văn Ngữ', nam: '1910 – 1967', danh: 'Người mang giống nấm về trong lọ',
    viec: 'Nhà ký sinh trùng học; từ Nhật trở về vùng kháng chiến, mang theo giống nấm để sản xuất "nước lọc penicillin" phục vụ chữa thương binh trong điều kiện không có thuốc kháng sinh. Mất khi đang nghiên cứu phòng chống sốt rét ở chiến trường.',
    quyet: 'Đưa nghiên cứu ra chỗ có bệnh nhân, thay vì chờ có phòng thí nghiệm rồi mới nghiên cứu.',
    mothuc: 'Khoa học có ích là khoa học đứng cạnh vấn đề. Đi tới chỗ vấn đề đang xảy ra là một quyết định phương pháp, không chỉ là lòng dũng cảm.',
    tru: 'T · A', pc: 'Đức · Chí',
    lam: 'Chọn một vấn đề có thật quanh em và đi hỏi trực tiếp người đang gặp nó.',
    hoi: 'Nghiên cứu trong phòng và nghiên cứu ngoài thực địa — mỗi bên mạnh ở đâu?' },

  { ten: 'Lương Định Của', nam: '1920 – 1975', danh: 'Nhà nông học lội ruộng',
    viec: 'Được đào tạo ở Nhật, về nước làm chọn giống cây trồng, lai tạo nhiều giống lúa và rau màu phù hợp đồng đất Việt Nam.',
    quyet: 'Tự lội ruộng cấy cùng nông dân để hiểu điều kiện thật, thay vì chỉ đưa khuyến cáo từ trạm.',
    mothuc: 'Người làm chuyên môn mà không đứng vào chỗ người dùng thì đưa ra lời giải đúng về lý thuyết và sai về thực tế.',
    tru: 'T · A', pc: 'Đức · Trí',
    lam: 'Trước khi giúp một bạn học, ngồi cạnh xem bạn ấy làm bài mười phút đã.',
    hoi: 'Vì sao lời khuyên đúng vẫn thường không dùng được?' },

  { ten: 'Lê Văn Thiêm', nam: '1918 – 1991', danh: 'Người đặt nền cho toán học Việt Nam',
    viec: 'Người Việt Nam đầu tiên bảo vệ luận án tiến sĩ toán học ở nước ngoài; về nước tham gia xây dựng ngành toán, đào tạo lớp nhà toán học đầu tiên trong nước.',
    quyet: 'Chọn về xây dựng một ngành gần như từ số không, thay vì tiếp tục con đường nghiên cứu ở nơi đã có sẵn trường phái.',
    mothuc: 'Đặt nền là công việc mà thành quả rơi vào tay người khác. Ai làm được việc ấy thì tổ chức mới có thế hệ thứ hai.',
    tru: 'G · T', pc: 'Chí · Đức',
    lam: 'Làm một việc cho khoá sau của chi hội — thứ em sẽ không hưởng.',
    hoi: 'Điều gì khiến một người sẵn lòng làm việc mà mình không hưởng kết quả?' },

  { ten: 'Hoàng Tụy', nam: '1927 – 2019', danh: 'Cha đẻ của tối ưu toàn cục',
    viec: 'Công trình về tối ưu hoá lõm mở ra hướng nghiên cứu tối ưu toàn cục; khái niệm "lát cắt Tuy" mang tên ông trong tài liệu quốc tế. Suốt nhiều chục năm cuối đời kiên trì lên tiếng về cải cách giáo dục.',
    quyet: 'Vừa làm nghiên cứu đỉnh cao vừa nhận phần việc khó chịu là phản biện công khai về giáo dục, dù biết ít được nghe.',
    mothuc: 'Người giỏi chuyên môn có một món nợ với chỗ mình đứng: nói ra điều mình thấy, kể cả khi nói xong không đổi được gì ngay.',
    tru: 'T · G', pc: 'Trí · Dũng',
    lam: 'Viết một góp ý có căn cứ cho lớp hoặc chi hội, gửi đúng người, không phàn nàn sau lưng.',
    hoi: 'Phản biện và chê bai khác nhau ở chỗ nào — ở nội dung hay ở chỗ mình có đề xuất thay thế?' },

  { ten: 'Ngô Bảo Châu', nam: '1972 –', danh: 'Người chứng minh Bổ đề cơ bản',
    viec: 'Chứng minh Bổ đề cơ bản trong chương trình Langlands; nhận Huy chương Fields năm 2010 — giải thưởng cao nhất của toán học thế giới.',
    quyet: 'Theo đuổi một bài toán đã làm nhiều người bỏ cuộc, trong nhiều năm, không có gì bảo đảm sẽ giải được.',
    mothuc: 'Bài toán lớn không được giải bằng nỗ lực dài — nó được giải bằng nỗ lực dài ĐÚNG HƯỚNG. Chọn bài toán quan trọng hơn chăm chỉ.',
    tru: 'G · T', pc: 'Trí · Chí',
    lam: 'Chọn MỘT bài khó nhất trong môn em mạnh nhất và ở lại với nó ba buổi, không đổi bài.',
    hoi: 'Làm sao biết một bài toán khó là đáng theo đuổi hay chỉ đang làm mình mắc kẹt?',
    luu: 'Người đang sống — theo nguyên tắc 4, sách ghi việc đã làm, không dựng chân dung khép kín.' }
];

/* ══════════ QUYỂN 5 · VĂN HIẾN ══════════ */
GV.TV_Q5 = [
  { ten: 'Nguyễn Du', nam: '1766 – 1820', danh: 'Người viết nỗi đau thành tiếng nói chung',
    viec: 'Truyện Kiều — 3.254 câu lục bát, tác phẩm đưa tiếng Việt lên tầm một ngôn ngữ văn học hoàn chỉnh. Được UNESCO kỷ niệm nhân 250 năm ngày sinh.',
    quyet: 'Viết bằng chữ Nôm, tiếng nói của dân, thay vì chữ Hán, ngôn ngữ của khoa cử và công danh.',
    mothuc: 'Muốn chạm tới nhiều người thì phải nói bằng thứ tiếng họ dùng hằng ngày — và làm cho thứ tiếng ấy đẹp lên.',
    tru: 'I · T', pc: 'Đức · Trí',
    lam: 'Viết lại một điều em học được bằng lời của chính em, không dùng câu trong sách.',
    hoi: '"Chữ tâm kia mới bằng ba chữ tài" — nếu đúng thế thì vì sao vẫn phải rèn tài?' },

  { ten: 'Hồ Xuân Hương', nam: 'khoảng cuối thế kỷ 18 – đầu 19', danh: 'Tiếng nói của người phụ nữ giữa thời không cho phép',
    viec: 'Thơ Nôm sắc sảo, đa nghĩa, đòi quyền được sống và được nói cho người phụ nữ. UNESCO cùng vinh danh nhân dịp kỷ niệm năm 2021.',
    quyet: 'Viết điều không được phép viết, bằng cách viết mà không ai cấm được.',
    mothuc: 'Khi kênh chính thức đóng, người có điều cần nói sẽ tìm ra một hình thức mới. Sáng tạo thường sinh ra từ chỗ bị chặn.',
    tru: 'I · T', pc: 'Dũng · Trí',
    lam: 'Nói một điều em vẫn ngại nói, nhưng nói theo cách người nghe nhận được.',
    hoi: 'Nói thẳng và nói khéo — khi nào cái nào phục vụ sự thật tốt hơn?',
    luu: 'Tiểu sử Hồ Xuân Hương và việc xác định tác phẩm nào chắc chắn là của bà vẫn đang được nghiên cứu.' },

  { ten: 'Đoàn Thị Điểm', nam: '1705 – 1748', danh: 'Người đưa một áng thơ chữ Hán vào tiếng Việt',
    viec: 'Bản diễn Nôm Chinh phụ ngâm — được xem là một trong những đỉnh cao của thể song thất lục bát.',
    quyet: 'Không dịch theo chữ mà dựng lại toàn bộ nhạc điệu bằng chất liệu tiếng Việt.',
    mothuc: 'Chuyển giao tri thức không phải là chép lại. Chuyển giao tốt là dựng lại được ở chất liệu mới mà vẫn giữ cái hồn.',
    tru: 'T', pc: 'Trí · Chủ',
    lam: 'Lấy một khái niệm khó và giải thích lại cho một em nhỏ hơn năm tuổi.',
    hoi: 'Dịch sát nghĩa và dịch hay — khi phải chọn, chọn theo tiêu chí gì?',
    luu: 'Việc bản diễn Nôm phổ biến nhất là của Đoàn Thị Điểm hay Phan Huy Ích vẫn là vấn đề còn tranh luận trong giới nghiên cứu.' },

  { ten: 'Bà Huyện Thanh Quan', nam: 'thế kỷ 19', danh: 'Người giữ một giọng riêng giữa dòng chung',
    viec: 'Thơ Đường luật chữ Nôm mực thước, trang nhã, với Qua Đèo Ngang, Thăng Long thành hoài cổ.',
    quyet: 'Viết ít, giữ chuẩn cao, không chạy theo số lượng.',
    mothuc: 'Một người có thể để lại dấu bằng vài tác phẩm nếu mỗi tác phẩm đều ở chuẩn cao nhất mình làm được.',
    tru: 'T · I', pc: 'Chủ · Trí',
    lam: 'Làm lại một sản phẩm cũ của em cho tới khi em thật sự hài lòng, thay vì làm cái mới.',
    hoi: 'Làm nhiều để giỏi lên, hay làm ít mà kỹ để giỏi lên? Em thuộc kiểu nào, và kiểu kia dạy em điều gì?' },

  { ten: 'Cao Bá Quát', nam: '1809 – 1855', danh: 'Người cúi đầu trước hoa mai',
    viec: 'Nhà thơ tài hoa, tính khí ngang tàng, chữ nghĩa được người đương thời nể phục. Cuối đời tham gia một cuộc khởi nghĩa và thất bại.',
    quyet: 'Không uốn mình theo khuôn khoa cử và quan trường, chấp nhận cả hệ quả.',
    mothuc: '"Nhất sinh đê thủ bái mai hoa" — một đời chỉ cúi đầu trước hoa mai. Có những thứ đáng để mình khiêm nhường, và biết chọn đúng thứ ấy là một phần của nhân cách.',
    tru: 'I', pc: 'Dũng · Chí',
    lam: 'Viết ra ba thứ em thật sự kính trọng, và một thứ em vẫn giả vờ kính trọng.',
    hoi: 'Khí phách và ngang bướng khác nhau ở đâu? Người trong cuộc có tự phân biệt được không?' },

  { ten: 'Văn Cao', nam: '1923 – 1995', danh: 'Người viết bài hát của một quốc gia',
    viec: 'Tác giả Tiến quân ca — sau trở thành Quốc ca Việt Nam; đồng thời là nhạc sĩ, hoạ sĩ, nhà thơ với nhiều tác phẩm ở cả ba lĩnh vực.',
    quyet: 'Viết một bài hát cho một việc chung, ở tuổi ngoài hai mươi, khi chưa ai bảo đảm việc chung ấy sẽ thành.',
    mothuc: 'Người làm nghệ thuật cũng đứng trước lựa chọn: làm cho mình hay làm cho việc chung. Có những lúc lựa chọn thứ hai để lại nhiều hơn.',
    tru: 'I · T', pc: 'Chí · Trí',
    lam: 'Làm một sản phẩm nhỏ tặng chi hội hoặc lớp, không ký tên to.',
    hoi: 'Một tác phẩm thuộc về tác giả hay thuộc về những người dùng nó?' },

  { ten: 'Đặng Thái Sơn', nam: '1958 –', danh: 'Người châu Á đầu tiên thắng giải Chopin',
    viec: 'Giành giải nhất Cuộc thi Piano quốc tế Chopin lần thứ 10 tại Warszawa năm 1980 — người châu Á đầu tiên đạt được điều đó.',
    quyet: 'Luyện đàn trong điều kiện thiếu thốn của thời chiến, kể cả những giai đoạn phải sơ tán, trước khi có cơ hội được đào tạo bài bản.',
    mothuc: 'Điều kiện quyết định tốc độ, không quyết định trần. Nhiều người dừng lại vì tin điều ngược lại.',
    tru: 'T · I', pc: 'Chí · Chủ',
    lam: 'Luyện đúng một kỹ năng nhỏ 20 phút mỗi ngày trong bảy ngày, ghi lại sự khác biệt.',
    hoi: 'Bao nhiêu phần của tài năng là bẩm sinh, bao nhiêu phần là số giờ? Vì sao câu hỏi này quan trọng với chính em?',
    luu: 'Người đang sống — sách ghi việc đã làm, không dựng chân dung khép kín.' }
];

/* ══════════ QUYỂN 6 · NGƯỜI ĐƯƠNG THỜI ══════════
   Viết theo luật riêng: không dựng tượng người đang sống. Quyển này
   ghi CHÂN DUNG TẬP THỂ và để ngỏ chỗ cho chính học viên viết tiếp. */
GV.TV_Q6 = [
  { ten: 'Người thầy vùng cao', nam: 'chân dung tập thể', danh: 'Những người ở lại nơi ít người muốn ở',
    viec: 'Dạy học ở những điểm trường xa, thiếu điện, thiếu đường, sĩ số ít, học trò bỏ học theo mùa.',
    quyet: 'Ở lại thêm một năm nữa, năm này qua năm khác.',
    mothuc: 'Kiên trì không phải một khoảnh khắc anh hùng; nó là một chuỗi quyết định nhỏ lặp lại, phần lớn không ai nhìn thấy.',
    tru: 'I · A', pc: 'Đức · Chí',
    lam: 'Giữ một việc nhỏ đều đặn suốt 21 ngày, kể cả những ngày không ai kiểm.',
    hoi: 'Việc gì em đang làm mà nếu bỏ thì không ai biết? Vì sao em vẫn làm?' },

  { ten: 'Đội tuyển học sinh Việt Nam ở các kỳ thi quốc tế', nam: 'từ 1974 tới nay', danh: 'Bằng chứng rằng trần không nằm ở gen',
    viec: 'Việt Nam tham dự Olympic Toán quốc tế từ năm 1974 và liên tục có huy chương ở nhiều môn: toán, vật lý, hoá học, tin học, sinh học.',
    quyet: 'Duy trì hệ thống phát hiện và bồi dưỡng qua nhiều thập kỷ, qua cả những giai đoạn đất nước rất khó khăn.',
    mothuc: 'Thành tích lặp lại nhiều chục năm không phải may mắn — nó là dấu hiệu của một HỆ THỐNG. Và hệ thống thì học được, dựng lại được.',
    tru: 'T · A', pc: 'Trí · Chủ',
    lam: 'Tìm hiểu con đường của một người từng đi thi quốc tế: em ấy bắt đầu từ đâu, năm mấy tuổi.',
    hoi: 'Nếu thành tích đến từ hệ thống, thì phần nào của hệ thống ấy chi hội của em dựng lại được?' },

  { ten: 'Người Việt làm nghề ở nước ngoài', nam: 'chân dung tập thể', danh: 'Những người mang chuẩn về',
    viec: 'Học và làm việc ở nơi có chuẩn cao hơn, rồi mang chuẩn ấy về áp vào công việc trong nước — trong y tế, kỹ thuật, giáo dục, nghệ thuật.',
    quyet: 'Chấp nhận giai đoạn khó chịu khi áp một chuẩn cao vào môi trường chưa quen chuẩn ấy.',
    mothuc: 'Đi ra để thấy chuẩn, đi về để đặt chuẩn. Cả hai vế đều cần; thiếu vế sau thì chỉ là di cư.',
    tru: 'T · G', pc: 'Trí · Chí',
    lam: 'Tìm một chuẩn cao hơn ở một việc em làm, và áp nó vào ngay tuần này.',
    hoi: 'Mang chuẩn về mà môi trường chưa nhận, người ta nên hạ chuẩn hay kiên trì? Điều gì quyết định?' },

  { ten: 'Người thợ giỏi và làng nghề', nam: 'chân dung tập thể', danh: 'Tri thức không nằm trong sách',
    viec: 'Gốm, mộc, đúc đồng, dệt, khảm — những nghề mà tri thức truyền bằng tay, qua nhiều đời, và mất rất nhanh khi đứt một thế hệ.',
    quyet: 'Nhận học trò và dạy thật, kể cả khi biết học trò sẽ giỏi hơn mình.',
    mothuc: 'Có loại tri thức chỉ chuyển giao được bằng cách làm cùng nhau. Không ghi được thành văn không có nghĩa là không có chuẩn.',
    tru: 'T · A', pc: 'Đức · Chủ',
    lam: 'Học một kỹ năng bằng tay từ một người lớn trong nhà, trực tiếp, không xem video.',
    hoi: 'Thứ gì em biết mà không viết ra được? Em truyền nó cho người khác bằng cách nào?' },

  { ten: 'Trang để trống', nam: 'dành cho người viết tiếp', danh: 'Chân dung mà học viên tự viết',
    viec: 'Mỗi thành viên chi hội chọn một người Việt mình khâm phục — có thể là người nổi tiếng, có thể là ông bà, hàng xóm, người thầy — và viết một chân dung theo đúng bảy nguyên tắc của bộ sách.',
    quyet: 'Tự đi tìm và tự viết, thay vì đọc chân dung người khác đã viết sẵn.',
    mothuc: 'Một bộ sách chỉ sống nếu người đọc trở thành người viết. Đây là chỗ Thư viện Gen Việt nối vào bậc 5 — em bắt đầu tạo ra thứ người khác dùng được.',
    tru: 'G · T · A', pc: 'Chí · Trí',
    lam: 'Phỏng vấn 30 phút một người em khâm phục, hỏi về một quyết định khó của họ, rồi viết một trang.',
    hoi: 'Khi tự đi hỏi, em phát hiện điều gì mà sách không kể?' }
];

/* ══════════ MƯỜI HAI MÔ THỨC TƯ DUY VIỆT ══════════
   Rút ra từ toàn bộ sáu quyển. Đây là phần dùng được hằng tuần —
   phần còn lại của bộ sách là bằng chứng cho mười hai dòng này.    */
GV.TV_MO_THUC = [
  { so: 1, t: 'Lấy ít địch nhiều', tu: 'Ngô Quyền · Trần Hưng Đạo · Lê Lợi',
    n: 'Không so tổng lực. Chọn nơi và lúc mà ưu thế của đối phương không dùng được.',
    nay: 'Em không cần giỏi hơn cả lớp ở mọi môn. Chọn một mũi nhọn và thắng ở đó trước.' },
  { so: 2, t: 'Dĩ đoản chế trường', tu: 'Trần Hưng Đạo',
    n: 'Lấy sở trường của mình chế sở trường của địch, thay vì đối đầu bằng thứ mình yếu.',
    nay: 'Nếu em nhớ chậm nhưng hiểu sâu, đừng thi nhớ với người nhớ nhanh — thi hiểu.' },
  { so: 3, t: 'Tiên phát chế nhân', tu: 'Lý Thường Kiệt',
    n: 'Khi va chạm là không tránh được, chủ động chọn thời điểm thay vì để người khác chọn hộ.',
    nay: 'Bài kiểm tra cuối kỳ chắc chắn đến. Bắt đầu ôn trước ba tuần là chọn thời điểm.' },
  { so: 4, t: 'Thanh dã — rút để giữ lực', tu: 'Trần Hưng Đạo',
    n: 'Bỏ trống chỗ không giữ nổi, không đánh trận quyết định khi chưa có lợi thế.',
    nay: 'Tuần quá tải thì bỏ bớt một việc có chủ đích, đừng làm dở tất cả.' },
  { so: 5, t: 'Tâm công — đánh vào lòng người', tu: 'Nguyễn Trãi',
    n: 'Đích không phải làm đối phương thua, mà làm cuộc đối đầu chấm dứt và không quay lại.',
    nay: 'Trong mâu thuẫn với bạn, hỏi "mình muốn thắng hay muốn hết chuyện này?" rồi mới nói.' },
  { so: 6, t: 'Khoan thư sức dân', tu: 'Trần Hưng Đạo',
    n: 'Nuôi gốc trước khi dùng gốc. Nguồn lực bền không đến từ trận thắng.',
    nay: 'Ngủ đủ và giữ sức khoẻ là chiến lược, không phải phần thưởng sau khi học xong.' },
  { so: 7, t: 'Thời – thế – cơ', tu: 'Lê Lợi · Quang Trung',
    n: 'Biết chờ mười năm và biết chớp trong một đêm là hai mặt của cùng một năng lực.',
    nay: 'Có việc phải kiên trì cả năm, có việc phải làm ngay hôm nay. Nhầm hai loại là hỏng cả hai.' },
  { so: 8, t: 'Đổi phương án khi dữ liệu đổi', tu: 'Võ Nguyên Giáp',
    n: 'Kể cả khi đã đầu tư rất nhiều vào phương án cũ, và kể cả khi đổi thì mất mặt.',
    nay: 'Phương pháp học nào ba tuần không ra kết quả thì đổi, đừng cố thêm vì đã quen.' },
  { so: 9, t: 'Dựng thể chế thay vì dựa vào người giỏi', tu: 'Lê Thánh Tông',
    n: 'Cái tốt phụ thuộc một người sẽ mất khi người ấy đi.',
    nay: 'Việc gì em làm tốt thì viết thành ba bước cho người sau — đó là dựng thể chế cỡ nhỏ.' },
  { so: 10, t: 'Cầu hiền', tu: 'Thân Nhân Trung · Quang Trung',
    n: 'Dựng cửa cho người tài đi vào, thay vì đi tìm từng người một.',
    nay: 'Ngày mở cửa hằng quý của chi hội chính là cái cửa ấy.' },
  { so: 11, t: 'Nam dược trị Nam nhân', tu: 'Tuệ Tĩnh · Lương Định Của',
    n: 'Lời giải của nơi khác phải được kiểm lại trên điều kiện của mình.',
    nay: 'Phương pháp học của người khác, thử một tuần rồi giữ phần hợp, bỏ phần không.' },
  { so: 12, t: 'Buông đúng lúc', tu: 'Trần Nhân Tông',
    n: 'Chuyển giao khi đang mạnh nhất. Người bám tới cùng để lại một khoảng trống.',
    nay: 'Hết nhiệm kỳ thì bàn giao đầy đủ và rút, kể cả khi em vẫn làm tốt hơn người sau.' }
];

/* ══════════ BẢNG PHẨM CHẤT × CHÂN DUNG ══════════ */
GV.TV_PHAM_CHAT = [
  { pc: 'ĐỨC · Phẩm chất', ai: 'Nguyễn Trãi · Chu Văn An · Nguyễn Đình Chiểu · Hải Thượng Lãn Ông · Lương Định Của',
    hoi: 'Người giỏi mà thiếu điều này thì trở thành gì?' },
  { pc: 'DŨNG · Bản lĩnh', ai: 'Trần Quốc Toản · Quang Trung · Hồ Xuân Hương · Cao Bá Quát · Hoàng Tuỵ',
    hoi: 'Dũng khí thể hiện lúc xông lên hay lúc đứng một mình với ý kiến của mình?' },
  { pc: 'TRÍ · Trí tuệ', ai: 'Lý Thường Kiệt · Trần Hưng Đạo · Lê Quý Đôn · Tôn Thất Tùng · Ngô Bảo Châu',
    hoi: 'Trí tuệ là biết nhiều, hay là biết chọn đúng bài toán?' },
  { pc: 'CHỦ · Làm chủ', ai: 'Trần Nhân Tông · Lê Thánh Tông · Nguyễn Bỉnh Khiêm · Đặng Thái Sơn',
    hoi: 'Làm chủ mình khó nhất ở lúc nào — lúc thất bại hay lúc đang thắng?' },
  { pc: 'CHÍ · Hoài bão', ai: 'Phan Châu Trinh · Phan Bội Châu · Nguyễn Trường Tộ · Lê Văn Thiêm · Trần Đại Nghĩa',
    hoi: 'Hoài bão nào đáng theo đuổi khi biết mình sẽ không thấy kết quả?' }
];

/* ══════════ CÁCH DÙNG BỘ SÁCH ══════════ */
GV.TV_CACH_DUNG = [
  { noi: 'Chi hội · Hạt giống tri thức', nhip: '7 phút mỗi tuần',
    lam: 'Một chân dung mỗi tuần: 3 phút kể quyết định then chốt, 2 phút rút mô thức, 2 phút giao việc trong tuần. Không kể tiểu sử.',
    kiem: 'Tuần sau hỏi: bao nhiêu em đã làm việc được giao. Dưới một nửa thì cách kể phải sửa.' },
  { noi: 'Chi hội · Ghế nóng', nhip: 'Mỗi tuần một em',
    lam: 'Em trình bày một mô thức và chứng minh mình đã dùng nó vào một việc thật trong tháng.',
    kiem: 'Chi hội phản biện bằng câu hỏi cuối mỗi chân dung, không khen chung chung.' },
  { noi: 'Trại · Đêm chủ đề', nhip: 'Một đêm mỗi kỳ trại',
    lam: 'Dựng lại một quyết định khó: chia đội, đặt vào hoàn cảnh của Điện Biên Phủ hay hội thề Đông Quan, để các đội tự chọn rồi so với lịch sử.',
    kiem: 'Không có đáp án đúng. Kiểm bằng chất lượng lý lẽ, không bằng việc đội nào chọn giống lịch sử.' },
  { noi: 'Gia đình · Bữa cơm', nhip: 'Một chuyện mỗi tuần',
    lam: 'Ba mẹ kể một chân dung rồi hỏi con: "Nếu là con, con chọn thế nào?" — và nghe hết trước khi nói.',
    kiem: 'Thành công là con hỏi lại, không phải con gật đầu.' },
  { noi: 'Dự án · Theo chân một người', nhip: '90 ngày',
    lam: 'Học viên chọn một chân dung, đọc kỹ, đi tìm tư liệu, rồi làm một sản phẩm: bài viết, phim ngắn, buổi kể chuyện cho lớp dưới.',
    kiem: 'Sản phẩm phải có người dùng thật ngoài gia đình — đúng chuẩn bằng chứng M4.' },
  { noi: 'Bậc 5 · Viết tiếp bộ sách', nhip: 'Một chân dung mỗi năm',
    lam: 'Mỗi người bậc 5 đóng góp một chân dung mới, viết theo đủ bảy nguyên tắc, qua duyệt của Hội đồng Chuẩn.',
    kiem: 'Đây là chỗ Thư viện Gen Việt tự lớn lên — và là bằng chứng bậc 5 đã biết tạo ra thứ người khác dùng được.' }
];

/* ══════════ NGUỒN VÀ CÁCH TRA ══════════ */
GV.TV_NGUON = [
  { t: 'Chính sử', l: 'Đại Việt sử ký toàn thư · Khâm định Việt sử thông giám cương mục · Đại Nam thực lục' },
  { t: 'Trước tác của chính nhân vật', l: 'Bình Ngô đại cáo · Hịch tướng sĩ · Vân đài loại ngữ · Hải Thượng y tông tâm lĩnh · Nam dược thần hiệu · các bản điều trần của Nguyễn Trường Tộ' },
  { t: 'Văn bia và di tích', l: 'Bia tiến sĩ Văn Miếu (dựng từ 1484) · đền, miếu, nhà lưu niệm gắn với từng nhân vật' },
  { t: 'Nghiên cứu hiện đại', l: 'Công trình của các nhà sử học và nhà nghiên cứu văn học Việt Nam — nơi nhiều chi tiết còn đang được tranh luận' },
  { t: 'Chỗ phải cẩn thận', l: 'Giai thoại dân gian, sấm ký, và các chi tiết chỉ xuất hiện trong một nguồn duy nhất. Sách này ghi rõ khi dùng tới chúng.' }
];
