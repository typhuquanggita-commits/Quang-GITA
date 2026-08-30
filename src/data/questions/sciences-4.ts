import { buildQuestions, type QuestionDraft } from './helpers';

/**
 * Ngan hang cau hoi Hoa hoc, Lich su, Dia ly — bo bo sung.
 *
 * Muc dich cu the: dua moi mon tu chon cua phan 3 len du 50 cau, de mot DE MAU
 * tron ven 150 cau dung duoc cho ca nam mon chu khong chi rieng Vat ly.
 */

const chemistry: QuestionDraft[] = [
  {
    id: 's.che.46',
    topicId: 'science.chemistry.general',
    difficulty: 2,
    stem: 'Số mol của 8 gam khí oxi (O₂) là bao nhiêu? (điền số, làm tròn một chữ số thập phân)',
    answer: '0,25',
    accepted: ['0.25', '0,25'],
    explanation:
      'Khối lượng mol của O₂ là 32 g/mol, nên n = m/M = 8/32 = 0,25 mol. Sai lầm quen thuộc là lấy M = 16 (khối lượng mol của nguyên tử O chứ không phải phân tử O₂).',
    skills: ['tính số mol'],
  },
  {
    id: 's.che.47',
    topicId: 'science.chemistry.general',
    difficulty: 3,
    stem: 'Trộn 100 ml dung dịch HCl 1M với 100 ml dung dịch NaOH 1M. Dung dịch thu được có môi trường:',
    choices: ['Trung tính', 'Axit', 'Bazơ', 'Không xác định được'],
    answer: 'A',
    explanation:
      'Số mol HCl = 0,1 mol, số mol NaOH = 0,1 mol; phản ứng theo tỉ lệ 1:1 nên cả hai vừa hết, dung dịch chỉ còn NaCl là muối trung tính.',
    traps: { B: 'Axit dư chỉ xảy ra khi số mol HCl lớn hơn số mol NaOH, không phải trường hợp này.' },
    skills: ['phản ứng trung hòa'],
  },
  {
    id: 's.che.48',
    topicId: 'science.chemistry.inorganic',
    difficulty: 2,
    stem: 'Kim loại nào sau đây KHÔNG tan trong dung dịch HCl loãng?',
    choices: ['Cu', 'Zn', 'Fe', 'Mg'],
    answer: 'A',
    explanation:
      'Đồng đứng sau hiđro trong dãy hoạt động hóa học nên không đẩy được H₂ ra khỏi axit loãng. Ba kim loại còn lại đều đứng trước H nên đều tan và giải phóng khí hiđro.',
    traps: { C: 'Sắt đứng trước hiđro nên vẫn tan trong HCl loãng, tạo FeCl₂ và khí H₂.' },
    skills: ['dãy hoạt động hóa học'],
  },
  {
    id: 's.che.49',
    topicId: 'science.chemistry.inorganic',
    difficulty: 3,
    stem: 'Cho dung dịch NaOH dư vào dung dịch CuSO₄, hiện tượng quan sát được là:',
    choices: [
      'Xuất hiện kết tủa xanh lam',
      'Xuất hiện kết tủa nâu đỏ',
      'Có khí không màu thoát ra',
      'Không có hiện tượng gì',
    ],
    answer: 'A',
    explanation:
      'Phản ứng trao đổi tạo Cu(OH)₂ là kết tủa màu xanh lam đặc trưng. Kết tủa nâu đỏ là Fe(OH)₃, thuộc muối sắt(III) chứ không phải muối đồng.',
    traps: { B: 'Nâu đỏ là màu của Fe(OH)₃, không phải của hiđroxit đồng.' },
    skills: ['phản ứng trao đổi', 'nhận biết'],
  },
  {
    id: 's.che.50',
    topicId: 'science.chemistry.organic',
    difficulty: 3,
    stem: 'Thuốc thử nào phân biệt được ancol etylic và axit axetic chỉ trong một lần thử?',
    choices: [
      'Dung dịch NaHCO₃',
      'Kim loại Na',
      'Dung dịch AgNO₃ trong NH₃',
      'Nước brom',
    ],
    answer: 'A',
    explanation:
      'Chỉ axit axetic phản ứng với NaHCO₃ và giải phóng khí CO₂; ancol etylic không có tính axit đủ mạnh nên không có hiện tượng. Natri thì cả hai đều sủi bọt nên không phân biệt được.',
    traps: { B: 'Cả ancol và axit đều tác dụng với Na sinh khí hiđro, nên không phân biệt được.' },
    skills: ['nhận biết hợp chất hữu cơ'],
  },
];

const history: QuestionDraft[] = [
  /* ── Lịch sử Việt Nam ─────────────────────────────────────────────── */
  {
    id: 's.his.31',
    topicId: 'science.history.vietnam',
    difficulty: 2,
    stem: 'Hai Bà Trưng phất cờ khởi nghĩa vào năm 40 nhằm chống lại ách đô hộ của triều đại nào?',
    choices: ['Nhà Đông Hán', 'Nhà Đường', 'Nhà Tống', 'Nhà Minh'],
    answer: 'A',
    explanation:
      'Khởi nghĩa Hai Bà Trưng nổ ra năm 40 chống ách đô hộ của nhà Đông Hán, mở đầu truyền thống đấu tranh giành độc lập trong thời kỳ Bắc thuộc.',
    skills: ['mốc sự kiện'],
  },
  {
    id: 's.his.32',
    topicId: 'science.history.vietnam',
    difficulty: 3,
    stem: 'Bộ luật thành văn đầu tiên của nhà nước phong kiến Việt Nam là:',
    choices: ['Hình thư thời Lý', 'Quốc triều hình luật thời Lê', 'Hoàng Việt luật lệ thời Nguyễn', 'Hình luật thời Trần'],
    answer: 'A',
    explanation:
      'Hình thư ban hành dưới thời Lý (1042) là bộ luật thành văn đầu tiên, đánh dấu bước tiến trong tổ chức nhà nước. Quốc triều hình luật (luật Hồng Đức) ra đời muộn hơn nhiều, thời Lê sơ.',
    traps: { B: 'Quốc triều hình luật là bộ luật hoàn chỉnh nhất nhưng không phải bộ luật đầu tiên.' },
    skills: ['thiết chế nhà nước'],
  },
  {
    id: 's.his.33',
    topicId: 'science.history.vietnam',
    difficulty: 2,
    stem: 'Nguyễn Ái Quốc gửi bản "Yêu sách của nhân dân An Nam" tới Hội nghị Véc-xai vào năm nào? (điền số năm)',
    answer: '1919',
    explanation:
      'Năm 1919, Nguyễn Ái Quốc thay mặt nhóm người Việt Nam yêu nước tại Pháp gửi bản yêu sách tới Hội nghị Véc-xai, đòi các quyền tự do dân chủ cơ bản cho nhân dân An Nam.',
    skills: ['mốc sự kiện'],
  },
  {
    id: 's.his.34',
    topicId: 'science.history.vietnam',
    difficulty: 3,
    stem: 'Phong trào Xô viết Nghệ — Tĩnh (1930 — 1931) có ý nghĩa nổi bật nào?',
    choices: [
      'Lần đầu tiên chính quyền của nhân dân được thành lập ở một số vùng nông thôn',
      'Buộc thực dân Pháp phải trao trả độc lập',
      'Thành lập được quân đội chính quy đầu tiên',
      'Đưa Việt Nam thoát khỏi ách thống trị của phát xít Nhật',
    ],
    answer: 'A',
    explanation:
      'Ở Nghệ An và Hà Tĩnh, chính quyền địch tan rã ở nhiều nơi, các Xô viết được lập ra và thực hiện quyền làm chủ của nhân dân — đây là hình thức chính quyền cách mạng đầu tiên ở nước ta.',
    traps: { B: 'Phong trào bị đàn áp và chưa giành được độc lập; ý nghĩa nằm ở kinh nghiệm chính quyền.' },
    skills: ['ý nghĩa lịch sử'],
  },
  {
    id: 's.his.35',
    topicId: 'science.history.vietnam',
    difficulty: 3,
    stem: 'Mặt trận Việt Minh được thành lập năm 1941 với mục tiêu trực tiếp là:',
    choices: [
      'Tập hợp mọi lực lượng yêu nước để giành độc lập dân tộc',
      'Tiến hành cải cách ruộng đất trên toàn quốc',
      'Xây dựng nền kinh tế công nghiệp hiện đại',
      'Đàm phán với Pháp để mở rộng quyền tự trị',
    ],
    answer: 'A',
    explanation:
      'Hội nghị Trung ương lần thứ tám (1941) đặt nhiệm vụ giải phóng dân tộc lên hàng đầu và lập Mặt trận Việt Minh để đoàn kết mọi giai tầng cho mục tiêu ấy.',
    traps: { B: 'Cải cách ruộng đất được thực hiện về sau, không phải mục tiêu trực tiếp khi thành lập Việt Minh.' },
    skills: ['đường lối'],
  },
  {
    id: 's.his.36',
    topicId: 'science.history.vietnam',
    difficulty: 2,
    stem: 'Chiến dịch Biên giới thu — đông năm 1950 mang lại kết quả quan trọng nào?',
    choices: [
      'Khai thông đường liên lạc với các nước xã hội chủ nghĩa',
      'Kết thúc hoàn toàn cuộc kháng chiến chống Pháp',
      'Buộc Pháp phải ký Hiệp định Giơ-ne-vơ',
      'Giải phóng hoàn toàn miền Nam',
    ],
    answer: 'A',
    explanation:
      'Chiến dịch Biên giới phá thế bao vây, khai thông biên giới Việt — Trung, nối liền căn cứ địa Việt Bắc với bên ngoài và giành thế chủ động trên chiến trường chính Bắc Bộ.',
    traps: { C: 'Hiệp định Giơ-ne-vơ được ký năm 1954, sau chiến thắng Điện Biên Phủ.' },
    skills: ['diễn biến chiến dịch'],
  },
  {
    id: 's.his.37',
    topicId: 'science.history.vietnam',
    difficulty: 3,
    stem: 'Phong trào "Đồng khởi" (1959 — 1960) ở miền Nam đánh dấu bước chuyển nào?',
    choices: [
      'Từ thế giữ gìn lực lượng sang thế tiến công',
      'Từ đấu tranh vũ trang sang đấu tranh chính trị đơn thuần',
      'Từ chiến tranh du kích sang chiến tranh chính quy quy mô lớn',
      'Từ đấu tranh trong nước sang đấu tranh ngoại giao',
    ],
    answer: 'A',
    explanation:
      'Đồng khởi phá vỡ từng mảng bộ máy chính quyền địch ở nông thôn, chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công, và dẫn tới sự ra đời của Mặt trận Dân tộc giải phóng miền Nam.',
    traps: { B: 'Ngược lại, Đồng khởi kết hợp đấu tranh chính trị với vũ trang chứ không từ bỏ vũ trang.' },
    skills: ['bước ngoặt'],
  },
  {
    id: 's.his.38',
    topicId: 'science.history.vietnam',
    difficulty: 2,
    stem: 'Cuộc Tổng tiến công và nổi dậy Xuân Mậu Thân diễn ra vào năm nào? (điền số năm)',
    answer: '1968',
    explanation:
      'Tổng tiến công và nổi dậy Xuân Mậu Thân 1968 làm lung lay ý chí xâm lược của Mỹ, buộc Mỹ phải xuống thang chiến tranh và ngồi vào bàn đàm phán Paris.',
    skills: ['mốc sự kiện'],
  },
  {
    id: 's.his.39',
    topicId: 'science.history.vietnam',
    difficulty: 3,
    stem: 'Chiến dịch Hồ Chí Minh (tháng 4 — 1975) là chiến dịch quyết chiến chiến lược nhằm:',
    choices: [
      'Giải phóng Sài Gòn — Gia Định, kết thúc cuộc kháng chiến chống Mỹ',
      'Giải phóng Tây Nguyên mở đầu tổng tiến công',
      'Giải phóng Huế và Đà Nẵng',
      'Buộc Mỹ ký Hiệp định Paris',
    ],
    answer: 'A',
    explanation:
      'Sau chiến dịch Tây Nguyên và chiến dịch Huế — Đà Nẵng, chiến dịch Hồ Chí Minh là đòn quyết định giải phóng Sài Gòn — Gia Định, kết thúc thắng lợi cuộc kháng chiến chống Mỹ cứu nước.',
    traps: { B: 'Chiến dịch Tây Nguyên mới là chiến dịch mở đầu, diễn ra tháng 3 — 1975.' },
    skills: ['diễn biến chiến dịch'],
  },
  {
    id: 's.his.40',
    topicId: 'science.history.vietnam',
    difficulty: 3,
    stem: 'Kỳ họp thứ nhất Quốc hội khóa VI (năm 1976) có ý nghĩa quan trọng nào?',
    choices: [
      'Hoàn thành thống nhất đất nước về mặt nhà nước',
      'Mở đầu công cuộc Đổi mới toàn diện',
      'Chấm dứt chiến tranh trên toàn lãnh thổ',
      'Đưa Việt Nam gia nhập ASEAN',
    ],
    answer: 'A',
    explanation:
      'Kỳ họp quyết định đặt tên nước là Cộng hòa xã hội chủ nghĩa Việt Nam, bầu các cơ quan lãnh đạo cao nhất, hoàn thành việc thống nhất đất nước về mặt nhà nước sau khi đã thống nhất về lãnh thổ năm 1975.',
    traps: { B: 'Đổi mới bắt đầu từ Đại hội VI năm 1986, muộn hơn mười năm.' },
    skills: ['ý nghĩa lịch sử'],
  },
  /* ── Lịch sử thế giới ─────────────────────────────────────────────── */
  {
    id: 's.his.41',
    topicId: 'science.history.world',
    difficulty: 2,
    stem: 'Tuyên ngôn Độc lập của Hợp chúng quốc Hoa Kỳ được thông qua vào năm nào? (điền số năm)',
    answer: '1776',
    explanation:
      'Bản Tuyên ngôn Độc lập ngày 4 — 7 — 1776 khẳng định quyền bình đẳng và quyền mưu cầu hạnh phúc, về sau được Chủ tịch Hồ Chí Minh trích dẫn mở đầu Tuyên ngôn Độc lập của Việt Nam năm 1945.',
    skills: ['mốc sự kiện'],
  },
  {
    id: 's.his.42',
    topicId: 'science.history.world',
    difficulty: 3,
    stem: 'Chính sách kinh tế mới (NEP) của nước Nga Xô viết năm 1921 có nội dung then chốt nào?',
    choices: [
      'Thay chế độ trưng thu lương thực thừa bằng thuế lương thực',
      'Quốc hữu hóa toàn bộ ruộng đất của nông dân',
      'Xóa bỏ hoàn toàn quan hệ hàng hóa — tiền tệ',
      'Đóng cửa với thương nhân nước ngoài',
    ],
    answer: 'A',
    explanation:
      'NEP thay trưng thu bằng thuế lương thực, cho phép tự do buôn bán và khôi phục quan hệ hàng hóa — tiền tệ, nhờ đó kinh tế Nga phục hồi nhanh sau nội chiến.',
    traps: { C: 'Ngược lại, NEP khôi phục chứ không xóa bỏ quan hệ hàng hóa — tiền tệ.' },
    skills: ['chính sách kinh tế'],
  },
  {
    id: 's.his.43',
    topicId: 'science.history.world',
    difficulty: 3,
    stem: 'Nguyên nhân sâu xa dẫn tới cuộc khủng hoảng kinh tế thế giới 1929 — 1933 là:',
    choices: [
      'Sản xuất ồ ạt, cung vượt quá xa sức mua của thị trường',
      'Chiến tranh thế giới thứ hai bùng nổ',
      'Các nước đồng loạt tăng thuế nhập khẩu',
      'Sự sụp đổ của hệ thống thuộc địa',
    ],
    answer: 'A',
    explanation:
      'Sản xuất phát triển ồ ạt trong thập niên 20 mà sức mua của quần chúng không tăng tương ứng, dẫn tới khủng hoảng thừa — bắt đầu từ Mỹ rồi lan ra toàn thế giới tư bản.',
    traps: { B: 'Chiến tranh thế giới thứ hai nổ ra năm 1939, là hệ quả xa chứ không phải nguyên nhân.' },
    skills: ['quan hệ nhân quả'],
  },
  {
    id: 's.his.44',
    topicId: 'science.history.world',
    difficulty: 2,
    stem: 'Tổ chức nào sau đây là liên minh quân sự do Mỹ đứng đầu, thành lập năm 1949?',
    choices: ['NATO', 'ASEAN', 'EU', 'Liên hợp quốc'],
    answer: 'A',
    explanation:
      'Tổ chức Hiệp ước Bắc Đại Tây Dương (NATO) thành lập năm 1949 là liên minh quân sự của Mỹ và các nước Tây Âu, đối trọng với khối Vác-sa-va sau này.',
    traps: { C: 'EU là liên minh kinh tế — chính trị, ra đời muộn hơn nhiều và không phải liên minh quân sự.' },
    skills: ['tổ chức quốc tế'],
  },
  {
    id: 's.his.45',
    topicId: 'science.history.world',
    difficulty: 3,
    stem: 'Nhân tố hàng đầu giúp kinh tế Nhật Bản phát triển "thần kỳ" giai đoạn 1952 — 1973 là:',
    choices: [
      'Nguồn nhân lực có chất lượng cao và ý thức kỷ luật tốt',
      'Nguồn tài nguyên khoáng sản dồi dào trong nước',
      'Lãnh thổ rộng lớn và đất đai màu mỡ',
      'Không phải chi cho quốc phòng nhờ trung lập tuyệt đối',
    ],
    answer: 'A',
    explanation:
      'Nhật Bản nghèo tài nguyên và hẹp đất, nên nhân tố quyết định là con người: lực lượng lao động được đào tạo tốt, cần cù, kỷ luật, cộng với vai trò điều tiết hiệu quả của nhà nước.',
    traps: { B: 'Nhật Bản rất nghèo tài nguyên và phải nhập khẩu phần lớn nguyên liệu.' },
    skills: ['nhân tố phát triển'],
  },
  {
    id: 's.his.46',
    topicId: 'science.history.world',
    difficulty: 3,
    stem: 'Sự kiện nào đánh dấu bước ngoặt của phong trào giải phóng dân tộc ở châu Phi, khiến năm 1960 được gọi là "Năm châu Phi"?',
    choices: [
      'Mười bảy quốc gia châu Phi giành được độc lập trong cùng một năm',
      'Chế độ phân biệt chủng tộc ở Nam Phi bị xóa bỏ',
      'Liên minh châu Phi được thành lập',
      'Ai Cập giành được quyền kiểm soát kênh đào Xuy-ê',
    ],
    answer: 'A',
    explanation:
      'Năm 1960 có 17 nước châu Phi tuyên bố độc lập, làm sụp đổ hàng loạt hệ thống thuộc địa cũ — vì vậy năm này đi vào lịch sử với tên gọi "Năm châu Phi".',
    traps: { B: 'Chế độ A-pác-thai ở Nam Phi bị xóa bỏ vào năm 1993 — 1994, muộn hơn ba thập niên.' },
    skills: ['phong trào giải phóng dân tộc'],
  },
  {
    id: 's.his.47',
    topicId: 'science.history.world',
    difficulty: 2,
    stem: 'Việt Nam chính thức gia nhập ASEAN vào năm nào? (điền số năm)',
    answer: '1995',
    explanation:
      'Tháng 7 — 1995, Việt Nam trở thành thành viên thứ bảy của ASEAN, đánh dấu bước hội nhập khu vực quan trọng sau khi bình thường hóa quan hệ với các nước láng giềng.',
    skills: ['mốc sự kiện', 'hội nhập khu vực'],
  },
  {
    id: 's.his.48',
    topicId: 'science.history.world',
    difficulty: 3,
    stem: 'Đặc điểm nổi bật của quan hệ quốc tế sau khi Chiến tranh lạnh kết thúc là:',
    choices: [
      'Xu thế hòa hoãn và hợp tác, lấy phát triển kinh tế làm trọng tâm',
      'Đối đầu quân sự giữa hai khối ngày càng gay gắt',
      'Các nước lớn từ bỏ hoàn toàn việc chạy đua vũ trang',
      'Thế giới trở lại trật tự một cực ổn định lâu dài',
    ],
    answer: 'A',
    explanation:
      'Sau năm 1991, các quốc gia điều chỉnh chiến lược, lấy phát triển kinh tế làm trọng điểm và mở rộng hợp tác; tuy nhiên xung đột khu vực, sắc tộc, tôn giáo vẫn diễn ra ở nhiều nơi.',
    traps: { C: 'Chạy đua vũ trang giảm nhiệt nhưng không hề chấm dứt.' },
    skills: ['quan hệ quốc tế'],
  },
  {
    id: 's.his.49',
    topicId: 'science.history.world',
    difficulty: 3,
    stem: 'Hạn chế lớn nhất của cuộc cách mạng khoa học — công nghệ hiện đại là:',
    choices: [
      'Tạo ra vũ khí hủy diệt và gây ô nhiễm môi trường nghiêm trọng',
      'Làm giảm năng suất lao động xã hội',
      'Khiến khoa học tách rời khỏi sản xuất',
      'Làm chậm quá trình toàn cầu hóa',
    ],
    answer: 'A',
    explanation:
      'Cùng với những thành tựu to lớn, cách mạng khoa học — công nghệ cũng tạo ra vũ khí hủy diệt hàng loạt, ô nhiễm môi trường, tai nạn lao động và các bệnh dịch mới.',
    traps: { B: 'Ngược lại, cách mạng khoa học — công nghệ làm năng suất lao động tăng vọt.' },
    skills: ['đánh giá hai mặt'],
  },
  {
    id: 's.his.50',
    topicId: 'science.history.world',
    difficulty: 3,
    stem: 'Bài học quan trọng nhất mà Việt Nam có thể rút ra từ sự sụp đổ của Liên Xô và Đông Âu là:',
    choices: [
      'Phải đổi mới kịp thời, đúng hướng và giữ vững vai trò lãnh đạo',
      'Phải đóng cửa nền kinh tế để tránh ảnh hưởng bên ngoài',
      'Phải từ bỏ hoàn toàn mô hình kinh tế kế hoạch ngay lập tức',
      'Phải dựa hoàn toàn vào viện trợ của các nước lớn',
    ],
    answer: 'A',
    explanation:
      'Nguyên nhân sụp đổ là mô hình xây dựng chủ nghĩa xã hội có nhiều khiếm khuyết mà cải tổ lại chậm trễ và sai lầm. Bài học rút ra là phải đổi mới kịp thời, đúng hướng, đồng thời giữ vững ổn định chính trị.',
    traps: { B: 'Đóng cửa nền kinh tế đi ngược hoàn toàn với xu thế hội nhập và với chính đường lối Đổi mới.' },
    skills: ['bài học lịch sử'],
  },
];

const geography: QuestionDraft[] = [
  {
    id: 's.geo.46',
    topicId: 'science.geography.nature',
    difficulty: 2,
    stem: 'Dãy núi cao nhất Việt Nam, nơi có đỉnh Phan-xi-păng, là:',
    choices: ['Hoàng Liên Sơn', 'Trường Sơn Bắc', 'Trường Sơn Nam', 'Bạch Mã'],
    answer: 'A',
    explanation:
      'Hoàng Liên Sơn thuộc vùng Tây Bắc là dãy núi cao và đồ sộ nhất nước ta, có đỉnh Phan-xi-păng cao 3143 m — nơi duy nhất xuất hiện đai ôn đới gió mùa trên núi.',
    traps: { D: 'Bạch Mã là dãy núi thấp đâm ngang ra biển, đóng vai trò ranh giới khí hậu chứ không phải nơi cao nhất.' },
    skills: ['địa hình'],
  },
  {
    id: 's.geo.47',
    topicId: 'science.geography.nature',
    difficulty: 3,
    stem: 'Dãy Bạch Mã có vai trò địa lý tự nhiên quan trọng nào?',
    choices: [
      'Là ranh giới khí hậu giữa miền Bắc và miền Nam',
      'Là nơi bắt nguồn của hệ thống sông Cửu Long',
      'Là dãy núi cao nhất Trường Sơn Nam',
      'Là ranh giới giữa vùng núi và vùng đồng bằng châu thổ',
    ],
    answer: 'A',
    explanation:
      'Bạch Mã chạy theo hướng tây — đông, chắn gió mùa Đông Bắc nên phía nam dãy này hầu như không còn mùa đông lạnh; đây là ranh giới tự nhiên giữa hai miền khí hậu.',
    traps: { B: 'Sông Cửu Long bắt nguồn từ cao nguyên Tây Tạng, hoàn toàn ngoài lãnh thổ nước ta.' },
    skills: ['địa hình', 'phân hóa khí hậu'],
  },
  {
    id: 's.geo.48',
    topicId: 'science.geography.economy',
    difficulty: 2,
    stem: 'Ngành công nghiệp khai thác than của nước ta tập trung chủ yếu ở tỉnh nào?',
    choices: ['Quảng Ninh', 'Thái Nguyên', 'Lào Cai', 'Hà Giang'],
    answer: 'A',
    explanation:
      'Bể than Quảng Ninh có trữ lượng lớn nhất cả nước, chất lượng than antraxit cao, lại nằm gần cảng biển nên rất thuận lợi cho khai thác và xuất khẩu.',
    traps: { B: 'Thái Nguyên nổi tiếng về luyện kim và quặng sắt, không phải trung tâm khai thác than.' },
    skills: ['phân bố công nghiệp'],
  },
  {
    id: 's.geo.49',
    topicId: 'science.geography.economy',
    difficulty: 3,
    stem: 'Ý nghĩa lớn nhất của việc hình thành các vùng chuyên canh cây công nghiệp ở nước ta là:',
    choices: [
      'Tạo khối lượng nông sản hàng hóa lớn, ổn định cho chế biến và xuất khẩu',
      'Giúp giảm hoàn toàn diện tích trồng lúa',
      'Xóa bỏ tình trạng du canh du cư ở miền núi',
      'Làm cho mọi vùng đều có cơ cấu cây trồng giống nhau',
    ],
    answer: 'A',
    explanation:
      'Chuyên canh cho phép sản xuất tập trung quy mô lớn, thuận lợi cho áp dụng kỹ thuật và cung cấp nguyên liệu ổn định cho công nghiệp chế biến cũng như cho xuất khẩu.',
    traps: { D: 'Chuyên canh đi theo hướng phát huy thế mạnh riêng của từng vùng, tức là làm cơ cấu cây trồng khác nhau chứ không giống nhau.' },
    skills: ['tổ chức lãnh thổ nông nghiệp'],
  },
  {
    id: 's.geo.50',
    topicId: 'science.geography.data',
    difficulty: 2,
    stem: 'Một nước có GDP 400 tỉ USD và dân số 100 triệu người. GDP bình quân đầu người là bao nhiêu USD? (điền số)',
    answer: '4000',
    explanation:
      'GDP bình quân đầu người bằng GDP chia dân số: 400 000 000 000 : 100 000 000 = 4000 USD/người. Sai lầm quen thuộc là quên rằng "tỉ" và "triệu" lệch nhau ba bậc mười.',
    skills: ['tính bình quân đầu người'],
  },
];

export const chemistryQuestions3 = buildQuestions('science', 'chemistry', chemistry);
export const historyQuestions3 = buildQuestions('science', 'history', history);
export const geographyQuestions3 = buildQuestions('science', 'geography', geography);
