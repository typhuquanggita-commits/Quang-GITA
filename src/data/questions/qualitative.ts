import { buildQuestions, type QuestionDraft } from './helpers';

const drafts: QuestionDraft[] = [
  // ── Chùm 1: Đọc chậm trong một thế giới vội ──────────────────────────
  {
    id: 'v.p1.1',
    topicId: 'qualitative.reading',
    passageId: 'p.reading.1',
    difficulty: 2,
    stem: 'Ý chính của đoạn trích là gì?',
    choices: [
      'Khối lượng chữ ta đọc mỗi ngày tăng lên nhưng chiều sâu của việc đọc lại giảm đi.',
      'Màn hình điện tử là nguyên nhân khiến con người không còn đọc sách.',
      'Sách giấy có giá trị cao hơn hẳn so với mọi loại văn bản trên mạng.',
      'Người trẻ ngày nay lười đọc hơn các thế hệ trước.',
    ],
    answer: 'A',
    explanation:
      'Đoạn mở đầu nêu nghịch lý "đọc nhiều hơn nhưng hời hợt hơn", các đoạn sau triển khai chính nghịch lý đó. Đây là ý bao trùm cả ba đoạn.',
    traps: {
      B: 'Đoạn cuối nói rõ "Vấn đề không nằm ở màn hình" — đây là ý bị bác bỏ trong chính văn bản.',
      D: 'Văn bản không hề so sánh giữa các thế hệ.',
    },
    skills: ['xác định ý chính'],
  },
  {
    id: 'v.p1.2',
    topicId: 'qualitative.reading',
    passageId: 'p.reading.1',
    difficulty: 3,
    stem: 'Theo tác giả, "đọc chậm" được hiểu là:',
    choices: [
      'Chấp nhận dừng lại, đọc lại và suy ngẫm về những câu văn đáng suy ngẫm.',
      'Đọc mỗi ngày một số trang cố định và không đọc quá nhiều.',
      'Chỉ đọc sách giấy và tránh xa mọi văn bản trên màn hình.',
      'Đọc to thành tiếng để nhớ lâu hơn.',
    ],
    answer: 'A',
    explanation:
      'Tác giả định nghĩa trực tiếp: "Đọc chậm là chấp nhận rằng có những câu văn đòi hỏi ta dừng lại, đọc đi đọc lại, thậm chí gấp sách để nghĩ."',
    traps: { B: 'Tác giả phủ định ngay ở câu trước: "Đọc chậm không phải là đọc ít."' },
    skills: ['đọc hiểu chi tiết'],
  },
  {
    id: 'v.p1.3',
    topicId: 'qualitative.reading',
    passageId: 'p.reading.1',
    difficulty: 3,
    stem: 'Cụm từ "kẻ tiêu thụ thông tin" trong đoạn 2 mang sắc thái gì?',
    choices: [
      'Phê phán nhẹ, chỉ thái độ thụ động khi tiếp nhận văn bản.',
      'Trung tính, chỉ đơn thuần mô tả người đọc hiện đại.',
      'Ngợi ca khả năng xử lý lượng thông tin lớn của con người.',
      'Hài hước, nhằm gây cười cho người đọc.',
    ],
    answer: 'A',
    explanation:
      'Cụm từ này được đặt trong thế đối lập với "người đối thoại với tác giả". Phép đối lập cho thấy "tiêu thụ" bị đánh giá thấp hơn, mang sắc thái phê phán sự thụ động.',
    skills: ['sắc thái biểu cảm', 'suy luận từ ngữ cảnh'],
  },
  {
    id: 'v.p1.4',
    topicId: 'qualitative.reading',
    passageId: 'p.reading.1',
    difficulty: 4,
    stem: 'Vì sao tác giả gọi khoảng lặng để suy nghĩ là "thứ đắt đỏ nhất của thời đại này"?',
    choices: [
      'Vì trong nhịp sống liên tục bị ngắt quãng, thời gian yên tĩnh để suy nghĩ trở nên hiếm và khó giành được.',
      'Vì muốn có không gian yên tĩnh thì phải trả nhiều tiền.',
      'Vì sách hay ngày càng có giá cao.',
      'Vì các khóa học về tư duy hiện nay rất tốn kém.',
    ],
    answer: 'A',
    explanation:
      '"Đắt đỏ" ở đây được dùng theo nghĩa chuyển: cái gì khan hiếm thì đắt. Toàn văn bản nói về nhịp lướt liên tục làm mất khả năng ở lại lâu với một trang sách, chứ không nói về tiền bạc.',
    traps: { B: 'Hiểu "đắt đỏ" theo nghĩa đen — bỏ qua tín hiệu "trớ trêu thay" báo hiệu nghĩa chuyển.' },
    skills: ['nghĩa chuyển', 'suy luận'],
  },
  {
    id: 'v.p1.5',
    topicId: 'qualitative.reading',
    passageId: 'p.reading.1',
    difficulty: 3,
    stem: 'Phương thức biểu đạt chính của đoạn trích là:',
    choices: ['Nghị luận', 'Tự sự', 'Miêu tả', 'Thuyết minh'],
    answer: 'A',
    explanation:
      'Văn bản nêu luận điểm ("đọc nhiều nhưng hời hợt"), giải thích khái niệm và đưa lí lẽ để thuyết phục người đọc — đặc trưng của văn nghị luận.',
    traps: { D: 'Thuyết minh nhằm cung cấp tri thức khách quan; ở đây tác giả rõ ràng bày tỏ quan điểm và đánh giá.' },
    skills: ['phương thức biểu đạt'],
  },

  // ── Chùm 2: Bức tường xanh của vùng cửa sông ─────────────────────────
  {
    id: 'v.p2.1',
    topicId: 'qualitative.reading',
    passageId: 'p.reading.2',
    difficulty: 2,
    stem: 'Nhan đề "Bức tường xanh của vùng cửa sông" chỉ đối tượng nào?',
    choices: ['Rừng ngập mặn', 'Hệ thống đê bê tông', 'Các đầm nuôi tôm', 'Lớp bùn đáy giàu các-bon'],
    answer: 'A',
    explanation:
      '"Bức tường" là hình ảnh ẩn dụ cho chức năng chắn sóng, "xanh" chỉ cây cối — cả cụm chỉ rừng ngập mặn, đối tượng xuyên suốt văn bản.',
    skills: ['ẩn dụ', 'xác định đối tượng'],
  },
  {
    id: 'v.p2.2',
    topicId: 'qualitative.reading',
    passageId: 'p.reading.2',
    difficulty: 3,
    stem: 'Theo văn bản, vì sao rừng ngập mặn được coi là "vườn ươm của biển"?',
    choices: [
      'Vì tôm, cua, cá con trú ẩn trong các lạch nước nông giữa rễ cây để tránh kẻ săn mồi.',
      'Vì người dân trồng cây giống ở đó rồi mang ra biển.',
      'Vì đây là nơi có nhiều loài thực vật quý hiếm nhất.',
      'Vì rừng ngập mặn tạo ra lượng ô-xy lớn cho nước biển.',
    ],
    answer: 'A',
    explanation: 'Đoạn 3 nêu trực tiếp vai trò trú ẩn và sinh trưởng của thủy sản non giữa hệ rễ.',
    skills: ['đọc hiểu chi tiết'],
  },
  {
    id: 'v.p2.3',
    topicId: 'qualitative.reading',
    passageId: 'p.reading.2',
    difficulty: 4,
    stem: 'Câu "một cái giá chậm trả nên thường không ai kịp nhận ra ai là người phải trả" hàm ý điều gì?',
    choices: [
      'Hậu quả của việc phá rừng đến muộn nên khó quy trách nhiệm cho người gây ra nó.',
      'Chi phí phá rừng có thể được thanh toán dần theo nhiều năm.',
      'Nhà nước sẽ là bên chi trả cho mọi thiệt hại môi trường.',
      'Người dân ven biển không đủ tiền để trả cho việc trồng lại rừng.',
    ],
    answer: 'A',
    explanation:
      'Câu trước đó nói sản lượng đánh bắt "sụt giảm sau đó vài năm". Độ trễ về thời gian khiến hậu quả và nguyên nhân bị tách rời, nên trách nhiệm bị mờ đi. "Cái giá" ở đây là nghĩa chuyển, chỉ hậu quả.',
    traps: { B: 'Hiểu "giá" theo nghĩa đen là khoản tiền trả góp.' },
    skills: ['hàm ý', 'suy luận'],
  },
  {
    id: 'v.p2.4',
    topicId: 'qualitative.reading',
    passageId: 'p.reading.2',
    difficulty: 3,
    stem: 'Lập luận ở đoạn 2 thuyết phục người đọc chủ yếu bằng cách nào?',
    choices: [
      'So sánh chi phí giữ rừng với chi phí xây và sửa đê cho cùng một mức bảo vệ.',
      'Kể lại một trận bão cụ thể mà tác giả từng chứng kiến.',
      'Trích dẫn phát biểu của một nhà khoa học có uy tín.',
      'Miêu tả vẻ đẹp của rừng đước vào lúc thủy triều lên.',
    ],
    answer: 'A',
    explanation:
      'Đoạn 2 đưa ra một phép so sánh kinh tế trực tiếp giữa hai giải pháp bảo vệ bờ biển — đây là lí lẽ mang tính thực dụng, dễ thuyết phục nhất trong đoạn.',
    skills: ['nhận diện thao tác lập luận'],
  },
  {
    id: 'v.p2.5',
    topicId: 'qualitative.reading',
    passageId: 'p.reading.2',
    difficulty: 4,
    stem: 'Câu mở đầu "Rừng ngập mặn thường bị xem là vùng đất hoang" có vai trò gì trong văn bản?',
    choices: [
      'Nêu một định kiến phổ biến để phản bác lại trong toàn bộ phần sau.',
      'Khẳng định quan điểm của chính tác giả về rừng ngập mặn.',
      'Cung cấp một định nghĩa khoa học về rừng ngập mặn.',
      'Kêu gọi người đọc hành động bảo vệ rừng.',
    ],
    answer: 'A',
    explanation:
      'Từ "Nhưng" ngay câu sau đảo chiều lập luận. Đây là kiểu mở bài nêu phản đề: dựng lên định kiến rồi lần lượt bác bỏ bằng các dẫn chứng về chắn sóng, vườn ươm và tích lũy các-bon.',
    traps: { B: 'Nhầm lời dẫn định kiến của số đông với quan điểm của tác giả.' },
    skills: ['cấu trúc lập luận', 'phản đề'],
  },

  // ── Câu đơn lẻ ───────────────────────────────────────────────────────
  {
    id: 'v.voc.1',
    topicId: 'qualitative.vocabulary',
    difficulty: 2,
    stem: 'Từ nào dưới đây KHÔNG cùng nhóm nghĩa với các từ còn lại?',
    choices: ['Bàng hoàng', 'Sững sờ', 'Ngỡ ngàng', 'Hân hoan'],
    answer: 'D',
    explanation:
      '"Bàng hoàng", "sững sờ", "ngỡ ngàng" đều chỉ trạng thái choáng váng, bất ngờ. "Hân hoan" chỉ niềm vui, thuộc trường nghĩa khác.',
    skills: ['trường từ vựng'],
  },
  {
    id: 'v.voc.2',
    topicId: 'qualitative.vocabulary',
    difficulty: 3,
    stem: 'Từ Hán Việt "khả quan" có nghĩa là:',
    choices: [
      'Có thể xem là tốt, đáng để hi vọng.',
      'Có thể quan sát được bằng mắt thường.',
      'Đáng để suy xét kĩ lưỡng.',
      'Có tính khách quan, không thiên vị.',
    ],
    answer: 'A',
    explanation:
      '"Khả" là có thể, "quan" là xem/nhìn; nghĩa gốc là "đáng xem", đã chuyển thành "có triển vọng tốt" trong tiếng Việt hiện đại (kết quả khả quan).',
    traps: { B: 'Suy nghĩa từ từng yếu tố Hán Việt mà bỏ qua nghĩa đã định hình trong sử dụng.' },
    skills: ['từ Hán Việt'],
  },
  {
    id: 'v.voc.3',
    topicId: 'qualitative.vocabulary',
    difficulty: 3,
    stem: 'Chọn từ thích hợp điền vào chỗ trống: "Những đóng góp thầm lặng của ông đã ______ cho sự phát triển của cả ngành."',
    choices: ['góp phần', 'góp mặt', 'góp vốn', 'góp ý'],
    answer: 'A',
    explanation:
      '"Góp phần" đi với một quá trình, một kết quả trừu tượng ("góp phần cho/vào sự phát triển"). "Góp mặt" đi với sự kiện, "góp vốn" với kinh doanh, "góp ý" với ý kiến.',
    skills: ['kết hợp từ', 'lựa chọn từ ngữ'],
  },
  {
    id: 'v.gra.1',
    topicId: 'qualitative.grammar',
    difficulty: 2,
    stem: 'Câu nào dưới đây mắc lỗi thiếu chủ ngữ?',
    choices: [
      'Qua tác phẩm "Chí Phèo" đã cho thấy số phận bi thảm của người nông dân.',
      'Tác phẩm "Chí Phèo" đã cho thấy số phận bi thảm của người nông dân.',
      'Nam Cao đã cho thấy số phận bi thảm của người nông dân qua "Chí Phèo".',
      'Số phận bi thảm của người nông dân hiện lên rõ nét trong "Chí Phèo".',
    ],
    answer: 'A',
    explanation:
      'Cụm "Qua tác phẩm Chí Phèo" là trạng ngữ, nên câu A chỉ còn vị ngữ mà không có chủ ngữ. Sửa bằng cách bỏ "Qua" hoặc thêm chủ ngữ: "Qua tác phẩm Chí Phèo, Nam Cao đã cho thấy...".',
    skills: ['lỗi ngữ pháp', 'thành phần câu'],
  },
  {
    id: 'v.gra.2',
    topicId: 'qualitative.grammar',
    difficulty: 3,
    stem: 'Câu "Với lòng nhiệt tình và trách nhiệm cao, công việc đã được hoàn thành đúng hạn." mắc lỗi gì?',
    choices: [
      'Sai lô-gíc quan hệ giữa trạng ngữ và chủ ngữ.',
      'Thiếu vị ngữ.',
      'Dùng sai quan hệ từ "với".',
      'Lặp từ không cần thiết.',
    ],
    answer: 'A',
    explanation:
      'Trạng ngữ "Với lòng nhiệt tình và trách nhiệm cao" phải bổ nghĩa cho một chủ thể là người, nhưng chủ ngữ của câu lại là "công việc". Sửa: "Với lòng nhiệt tình và trách nhiệm cao, cả nhóm đã hoàn thành công việc đúng hạn."',
    skills: ['lỗi lô-gíc', 'trạng ngữ'],
  },
  {
    id: 'v.gra.3',
    topicId: 'qualitative.grammar',
    difficulty: 3,
    stem: 'Trong câu "Chiếc áo mà mẹ tặng tôi hôm sinh nhật đã cũ", bộ phận "mà mẹ tặng tôi hôm sinh nhật" giữ vai trò gì?',
    choices: [
      'Định ngữ, bổ nghĩa cho danh từ "chiếc áo".',
      'Vị ngữ của câu.',
      'Trạng ngữ chỉ thời gian.',
      'Bổ ngữ cho động từ "cũ".',
    ],
    answer: 'A',
    explanation:
      'Vị ngữ của câu là "đã cũ". Mệnh đề bắt đầu bằng "mà" đứng sau danh từ và làm rõ danh từ đó — đây là định ngữ (mệnh đề quan hệ).',
    skills: ['thành phần câu', 'mệnh đề quan hệ'],
  },
  {
    id: 'v.rhe.1',
    topicId: 'qualitative.rhetoric',
    difficulty: 2,
    stem: 'Câu "Mặt trời của bắp thì nằm trên đồi / Mặt trời của mẹ, em nằm trên lưng" (Nguyễn Khoa Điềm) sử dụng biện pháp tu từ nào ở hình ảnh "mặt trời của mẹ"?',
    choices: ['Ẩn dụ', 'Hoán dụ', 'Nói quá', 'Nhân hóa'],
    answer: 'A',
    explanation:
      'Đứa con được gọi là "mặt trời của mẹ" dựa trên nét tương đồng về vai trò: nguồn sống, nguồn ấm áp. Gọi tên sự vật này bằng tên sự vật khác có nét tương đồng chính là ẩn dụ.',
    traps: { B: 'Hoán dụ dựa trên quan hệ gần gũi (bộ phận — toàn thể, vật chứa — vật bị chứa), không phải nét tương đồng.' },
    skills: ['ẩn dụ', 'phân biệt ẩn dụ — hoán dụ'],
  },
  {
    id: 'v.rhe.2',
    topicId: 'qualitative.rhetoric',
    difficulty: 3,
    stem: 'Trong câu "Một cây làm chẳng nên non / Ba cây chụm lại nên hòn núi cao", "một cây" và "ba cây" là biện pháp gì?',
    choices: ['Hoán dụ', 'Ẩn dụ', 'Điệp ngữ', 'So sánh'],
    answer: 'A',
    explanation:
      '"Một cây", "ba cây" lấy cái cụ thể để chỉ cái trừu tượng: cá nhân đơn lẻ và tập thể đoàn kết. Quan hệ ở đây là quan hệ tương cận (số ít — số nhiều, cụ thể — trừu tượng) nên là hoán dụ.',
    skills: ['hoán dụ'],
  },
  {
    id: 'v.lit.1',
    topicId: 'qualitative.literature',
    difficulty: 1,
    stem: 'Tác phẩm "Vợ chồng A Phủ" là của tác giả nào?',
    choices: ['Tô Hoài', 'Kim Lân', 'Nam Cao', 'Nguyễn Tuân'],
    answer: 'A',
    explanation:
      '"Vợ chồng A Phủ" của Tô Hoài, in trong tập "Truyện Tây Bắc" (1953), viết về Mị và A Phủ ở Hồng Ngài.',
    traps: { B: 'Kim Lân là tác giả "Vợ nhặt" — hai nhan đề dễ nhầm vì cùng bắt đầu bằng chữ "Vợ".' },
    skills: ['tác giả — tác phẩm'],
  },
  {
    id: 'v.lit.2',
    topicId: 'qualitative.literature',
    difficulty: 2,
    stem: 'Bài thơ "Tây Tiến" của Quang Dũng viết về đối tượng nào?',
    choices: [
      'Người lính trong đoàn quân Tây Tiến thời kháng chiến chống Pháp.',
      'Người nông dân vùng Tây Bắc trong cải cách ruộng đất.',
      'Những người lính lái xe trên tuyến đường Trường Sơn.',
      'Đoàn dân công hỏa tuyến trong chiến dịch Điện Biên Phủ.',
    ],
    answer: 'A',
    explanation:
      '"Tây Tiến" (1948) viết về đoàn quân Tây Tiến trong kháng chiến chống Pháp, nơi Quang Dũng từng là đại đội trưởng.',
    traps: { C: 'Người lính lái xe Trường Sơn là đề tài của "Bài thơ về tiểu đội xe không kính" (Phạm Tiến Duật), thời chống Mĩ.' },
    skills: ['hoàn cảnh sáng tác'],
  },
  {
    id: 'v.lit.3',
    topicId: 'qualitative.literature',
    difficulty: 3,
    stem: '"Truyện Kiều" của Nguyễn Du được viết bằng thể thơ nào?',
    choices: ['Lục bát', 'Song thất lục bát', 'Thất ngôn bát cú', 'Tự do'],
    answer: 'A',
    explanation:
      '"Truyện Kiều" gồm 3254 câu thơ lục bát — thể thơ dân tộc với cặp câu 6 chữ và 8 chữ nối tiếp nhau.',
    traps: { B: 'Song thất lục bát là thể của "Chinh phụ ngâm" bản diễn Nôm.' },
    skills: ['thể loại', 'văn học trung đại'],
  },
  {
    id: 'v.lit.4',
    topicId: 'qualitative.literature',
    difficulty: 3,
    stem: 'Nhận định nào đúng về phong cách nghệ thuật của Nguyễn Tuân?',
    choices: [
      'Tài hoa, uyên bác; quan sát và miêu tả sự vật ở phương diện thẩm mĩ, con người ở phương diện tài hoa nghệ sĩ.',
      'Giản dị, mộc mạc, gần với lời ăn tiếng nói hằng ngày của người nông dân.',
      'Trữ tình chính trị, giàu tính sử thi và cảm hứng lãng mạn cách mạng.',
      'Trào phúng sắc sảo, chuyên đả kích xã hội thành thị nửa thực dân nửa phong kiến.',
    ],
    answer: 'A',
    explanation:
      'Nguyễn Tuân nổi tiếng với chất tài hoa, uyên bác và cái nhìn thẩm mĩ, thể hiện rõ trong "Chữ người tử tù" và "Người lái đò Sông Đà".',
    traps: {
      C: 'Đây là đặc điểm phong cách thơ Tố Hữu.',
      D: 'Đây là đặc điểm của Vũ Trọng Phụng trong "Số đỏ".',
    },
    skills: ['phong cách tác giả'],
  },
  {
    id: 'v.log.1',
    topicId: 'qualitative.logic',
    difficulty: 3,
    stem: 'Sắp xếp các câu sau thành một đoạn văn mạch lạc: (1) Vì vậy, thói quen ghi chép tay vẫn có chỗ đứng riêng. (2) Nhiều người cho rằng ghi chép bằng máy tính nhanh hơn nên hiệu quả hơn. (3) Tuy nhiên, các nghiên cứu cho thấy người ghi tay buộc phải tóm lược nên nhớ ý lâu hơn. Thứ tự đúng là:',
    choices: ['(2) — (3) — (1)', '(1) — (2) — (3)', '(3) — (2) — (1)', '(2) — (1) — (3)'],
    answer: 'A',
    explanation:
      'Câu (2) nêu quan niệm phổ biến, câu (3) mở đầu bằng "Tuy nhiên" nên phải đứng sau để phản bác, câu (1) bắt đầu bằng "Vì vậy" nên là kết luận. Các từ nối chính là manh mối quyết định thứ tự.',
    skills: ['liên kết đoạn', 'từ nối'],
  },
  {
    id: 'v.log.2',
    topicId: 'qualitative.logic',
    difficulty: 4,
    stem: 'Cho tiền đề: "Mọi học sinh đạt trên 120 điểm đều được xét tuyển thẳng vào ngành A. Bạn Minh không được xét tuyển thẳng vào ngành A." Kết luận nào chắc chắn đúng?',
    choices: [
      'Minh không đạt trên 120 điểm.',
      'Minh đạt đúng 120 điểm.',
      'Minh đã không dự thi.',
      'Không thể kết luận gì về điểm của Minh.',
    ],
    answer: 'A',
    explanation:
      'Đây là phép phản đảo: từ "nếu P thì Q" suy ra "nếu không Q thì không P". Vì Minh không có Q (không được xét tuyển thẳng) nên chắc chắn không có P (không đạt trên 120 điểm).',
    traps: {
      B: 'Không đạt "trên 120" bao gồm mọi mức từ 120 trở xuống, không riêng đúng 120.',
      D: 'Phép phản đảo cho phép kết luận chắc chắn, nên đáp án này quá thận trọng.',
    },
    skills: ['suy luận lô-gíc', 'phản đảo'],
  },
];

export const qualitativeQuestions = buildQuestions('qualitative', undefined, drafts);
