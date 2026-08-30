import { buildQuestions, type QuestionDraft } from './helpers';

/**
 * Ngan hang cau hoi phan 3 — bo cau TRAC NGHIEM bo sung.
 *
 * Ly do ton tai cua tep nay rat cu the: theo quy che, phan 3 gom 50 cau TRAC
 * NGHIEM va khong co cau dien. Ngan hang truoc do co lan cau dien — chung van
 * dung tot trong phieu luyen nhung khong dat vao de mau duoc. Tep nay bu du
 * so cau trac nghiem de moi mon tu chon deu dung duoc mot de mau tron ven.
 */

const physics: QuestionDraft[] = [
  {
    id: 's.phy.61',
    topicId: 'science.physics.mechanics',
    difficulty: 2,
    stem: 'Một vật rơi tự do từ độ cao h. Nếu tăng độ cao lên gấp 4 lần thì thời gian rơi thay đổi thế nào?',
    choices: ['Tăng gấp 2 lần', 'Tăng gấp 4 lần', 'Tăng gấp 16 lần', 'Không đổi'],
    answer: 'A',
    explanation:
      'Rơi tự do có h = gt²/2 nên t = √(2h/g), tức thời gian tỉ lệ với căn bậc hai của độ cao. Tăng h gấp 4 thì t chỉ tăng gấp 2.',
    traps: { B: 'Quan hệ là căn bậc hai chứ không phải tỉ lệ thuận — đây là phương án nhiễu quen thuộc.' },
    skills: ['rơi tự do'],
  },
];

const chemistry: QuestionDraft[] = [
  {
    id: 's.che.51',
    topicId: 'science.chemistry.general',
    difficulty: 1,
    stem: 'Nguyên tử được cấu tạo từ những loại hạt nào?',
    choices: ['Proton, nơtron và electron', 'Chỉ proton và electron', 'Chỉ nơtron và electron', 'Proton và nơtron'],
    answer: 'A',
    explanation:
      'Hạt nhân gồm proton mang điện dương và nơtron không mang điện; lớp vỏ gồm các electron mang điện âm. Số proton bằng số electron nên nguyên tử trung hòa về điện.',
    skills: ['cấu tạo nguyên tử'],
  },
  {
    id: 's.che.52',
    topicId: 'science.chemistry.general',
    difficulty: 2,
    stem: 'Dung dịch nào sau đây làm quỳ tím hóa xanh?',
    choices: ['NaOH', 'HCl', 'NaCl', 'H₂SO₄'],
    answer: 'A',
    explanation:
      'NaOH là bazơ mạnh nên làm quỳ tím hóa xanh. HCl và H₂SO₄ là axit làm quỳ hóa đỏ; NaCl là muối trung tính không đổi màu quỳ.',
    traps: { C: 'NaCl là muối của axit mạnh và bazơ mạnh nên dung dịch trung tính.' },
    skills: ['nhận biết axit — bazơ'],
  },
  {
    id: 's.che.53',
    topicId: 'science.chemistry.general',
    difficulty: 3,
    stem: 'Trong phản ứng Fe + CuSO₄ → FeSO₄ + Cu, vai trò của sắt là:',
    choices: ['Chất khử', 'Chất oxi hóa', 'Vừa khử vừa oxi hóa', 'Không thay đổi số oxi hóa'],
    answer: 'A',
    explanation:
      'Số oxi hóa của sắt tăng từ 0 lên +2, tức sắt nhường electron nên là chất khử. Ion đồng nhận electron nên nó mới là chất oxi hóa.',
    traps: { B: 'Chất nhường electron là chất khử; nhớ ngược là lỗi phổ biến nhất của chuyên đề oxi hóa khử.' },
    skills: ['oxi hóa khử'],
  },
  {
    id: 's.che.54',
    topicId: 'science.chemistry.inorganic',
    difficulty: 2,
    stem: 'Khí nào sau đây là thành phần chính gây ra hiệu ứng nhà kính?',
    choices: ['CO₂', 'O₂', 'N₂', 'H₂'],
    answer: 'A',
    explanation:
      'Cacbon đioxit hấp thụ mạnh bức xạ hồng ngoại phát ra từ mặt đất, giữ nhiệt lại trong khí quyển. Nitơ và oxi tuy chiếm phần lớn không khí nhưng gần như không hấp thụ bức xạ này.',
    skills: ['hóa học và môi trường'],
  },
  {
    id: 's.che.55',
    topicId: 'science.chemistry.inorganic',
    difficulty: 3,
    stem: 'Cho dung dịch BaCl₂ vào dung dịch Na₂SO₄, hiện tượng là:',
    choices: [
      'Xuất hiện kết tủa trắng không tan trong axit',
      'Xuất hiện kết tủa trắng tan trong axit',
      'Có khí không màu thoát ra',
      'Không có hiện tượng',
    ],
    answer: 'A',
    explanation:
      'Phản ứng tạo BaSO₄ là kết tủa trắng, đặc trưng ở chỗ không tan trong axit mạnh — nhờ vậy nó được dùng để nhận biết ion sunfat.',
    traps: { B: 'BaCO₃ mới là kết tủa trắng tan trong axit; BaSO₄ thì không tan.' },
    skills: ['phản ứng trao đổi', 'nhận biết'],
  },
  {
    id: 's.che.56',
    topicId: 'science.chemistry.organic',
    difficulty: 2,
    stem: 'Chất nào sau đây làm mất màu dung dịch nước brom?',
    choices: ['Etilen (C₂H₄)', 'Metan (CH₄)', 'Etan (C₂H₆)', 'Propan (C₃H₈)'],
    answer: 'A',
    explanation:
      'Etilen có liên kết đôi C=C nên tham gia phản ứng cộng với brom, làm dung dịch mất màu. Ba chất còn lại đều là ankan no, chỉ phản ứng thế và không làm mất màu nước brom.',
    traps: { C: 'Etan tuy cùng hai nguyên tử cacbon nhưng no hoàn toàn, không có liên kết bội.' },
    skills: ['hiđrocacbon không no'],
  },
  {
    id: 's.che.57',
    topicId: 'science.chemistry.organic',
    difficulty: 3,
    stem: 'Chất béo là trieste của glixerol với:',
    choices: ['Axit béo', 'Ancol đơn chức', 'Axit vô cơ', 'Anđehit'],
    answer: 'A',
    explanation:
      'Chất béo được tạo từ một phân tử glixerol (ba nhóm −OH) và ba phân tử axit béo, nên khi thủy phân trong kiềm luôn cho glixerol và muối của axit béo theo tỉ lệ 1 : 3.',
    traps: { B: 'Este tạo từ axit và ancol; glixerol chính là phần ancol, nên phần còn lại phải là axit.' },
    skills: ['este — chất béo'],
  },
  {
    id: 's.che.58',
    topicId: 'science.chemistry.organic',
    difficulty: 3,
    stem: 'Phản ứng nào sau đây được gọi là phản ứng xà phòng hóa?',
    choices: [
      'Thủy phân chất béo trong dung dịch kiềm',
      'Thủy phân tinh bột trong môi trường axit',
      'Lên men glucozơ thành ancol etylic',
      'Cộng hiđro vào chất béo lỏng',
    ],
    answer: 'A',
    explanation:
      'Xà phòng hóa là phản ứng thủy phân este (cụ thể là chất béo) trong môi trường kiềm, cho muối của axit béo — chính là xà phòng — và glixerol.',
    traps: { D: 'Cộng hiđro vào chất béo lỏng là phản ứng hiđro hóa, dùng để sản xuất bơ nhân tạo.' },
    skills: ['este — chất béo'],
  },
];

const history: QuestionDraft[] = [
  {
    id: 's.his.51',
    topicId: 'science.history.vietnam',
    difficulty: 2,
    stem: 'Nhà nước đầu tiên trong lịch sử Việt Nam là:',
    choices: ['Văn Lang', 'Âu Lạc', 'Vạn Xuân', 'Đại Cồ Việt'],
    answer: 'A',
    explanation:
      'Nhà nước Văn Lang của các vua Hùng là nhà nước đầu tiên. Âu Lạc do An Dương Vương lập ra kế tiếp Văn Lang; Vạn Xuân và Đại Cồ Việt ra đời muộn hơn rất nhiều.',
    traps: { B: 'Âu Lạc là nhà nước thứ hai, hình thành sau khi Thục Phán hợp nhất Văn Lang với vùng Âu Việt.' },
    skills: ['mốc sự kiện'],
  },
  {
    id: 's.his.52',
    topicId: 'science.history.vietnam',
    difficulty: 3,
    stem: 'Cuộc kháng chiến chống Tống lần thứ hai (1075 — 1077) gắn liền với tên tuổi của ai?',
    choices: ['Lý Thường Kiệt', 'Trần Hưng Đạo', 'Lê Lợi', 'Nguyễn Huệ'],
    answer: 'A',
    explanation:
      'Lý Thường Kiệt chủ trương "tiên phát chế nhân", chủ động đánh sang đất Tống rồi lập phòng tuyến sông Như Nguyệt, nơi vang lên bài thơ được coi là bản tuyên ngôn độc lập đầu tiên.',
    traps: { B: 'Trần Hưng Đạo lãnh đạo kháng chiến chống Mông — Nguyên ở thế kỷ XIII.' },
    skills: ['nhân vật lịch sử'],
  },
  {
    id: 's.his.53',
    topicId: 'science.history.vietnam',
    difficulty: 3,
    stem: 'Hiệp định Sơ bộ ngày 6 — 3 — 1946 được ký kết nhằm mục đích chủ yếu nào?',
    choices: [
      'Đẩy nhanh quân Trung Hoa Dân quốc ra khỏi miền Bắc và có thêm thời gian chuẩn bị',
      'Chấm dứt hoàn toàn sự có mặt của Pháp ở Việt Nam',
      'Công nhận Việt Nam là quốc gia hoàn toàn độc lập',
      'Thống nhất hai miền Nam — Bắc',
    ],
    answer: 'A',
    explanation:
      'Ta chấp nhận hòa với Pháp để loại bớt một kẻ thù, đẩy 20 vạn quân Trung Hoa Dân quốc về nước và tranh thủ thời gian củng cố lực lượng cho cuộc kháng chiến lâu dài.',
    traps: { C: 'Hiệp định chỉ công nhận Việt Nam là quốc gia tự do nằm trong Liên hiệp Pháp, chưa phải độc lập hoàn toàn.' },
    skills: ['sách lược ngoại giao'],
  },
  {
    id: 's.his.54',
    topicId: 'science.history.world',
    difficulty: 2,
    stem: 'Cuộc cách mạng công nghiệp lần thứ nhất khởi đầu ở quốc gia nào?',
    choices: ['Anh', 'Pháp', 'Đức', 'Hoa Kỳ'],
    answer: 'A',
    explanation:
      'Nước Anh giữa thế kỷ XVIII hội đủ vốn, nhân công tự do, thuộc địa làm thị trường và nguồn than sắt dồi dào — nên trở thành nơi khởi đầu cách mạng công nghiệp.',
    skills: ['mốc sự kiện'],
  },
  {
    id: 's.his.55',
    topicId: 'science.history.world',
    difficulty: 3,
    stem: 'Hội nghị I-an-ta (tháng 2 — 1945) đã đưa ra quyết định quan trọng nào?',
    choices: [
      'Phân chia phạm vi ảnh hưởng giữa các cường quốc và thỏa thuận thành lập Liên hợp quốc',
      'Chính thức tuyên bố bắt đầu Chiến tranh lạnh',
      'Thành lập khối quân sự NATO',
      'Kết thúc chế độ thực dân trên toàn thế giới',
    ],
    answer: 'A',
    explanation:
      'Ba cường quốc thống nhất tiêu diệt tận gốc chủ nghĩa phát xít, thành lập Liên hợp quốc và phân chia phạm vi ảnh hưởng — những quyết định này định hình trật tự hai cực về sau.',
    traps: { B: 'Chiến tranh lạnh bắt đầu năm 1947 với học thuyết Tru-man; khi họp I-an-ta các bên vẫn là đồng minh.' },
    skills: ['hội nghị quốc tế'],
  },
  {
    id: 's.his.56',
    topicId: 'science.history.world',
    difficulty: 3,
    stem: 'Đặc điểm chung của các nước Đông Nam Á sau khi giành được độc lập là:',
    choices: [
      'Tập trung phát triển kinh tế và từng bước liên kết khu vực',
      'Đồng loạt lựa chọn con đường xã hội chủ nghĩa',
      'Duy trì quan hệ lệ thuộc vào chính quốc cũ',
      'Từ chối tham gia mọi tổ chức quốc tế',
    ],
    answer: 'A',
    explanation:
      'Sau độc lập, các nước Đông Nam Á đều đặt phát triển kinh tế lên hàng đầu và dần liên kết với nhau, mà ASEAN năm 1967 là biểu hiện rõ nhất của xu hướng ấy.',
    traps: { B: 'Các nước lựa chọn nhiều con đường phát triển khác nhau, không đồng loạt theo một mô hình.' },
    skills: ['khu vực Đông Nam Á'],
  },
  {
    id: 's.his.57',
    topicId: 'science.history.world',
    difficulty: 3,
    stem: 'Nguyên nhân sâu xa dẫn tới sự sụp đổ của chế độ xã hội chủ nghĩa ở Liên Xô và Đông Âu là:',
    choices: [
      'Mô hình xây dựng chủ nghĩa xã hội có nhiều khiếm khuyết mà không được sửa chữa kịp thời',
      'Sự can thiệp quân sự trực tiếp từ bên ngoài',
      'Thiếu tài nguyên thiên nhiên để phát triển công nghiệp',
      'Dân số giảm sút nghiêm trọng sau chiến tranh',
    ],
    answer: 'A',
    explanation:
      'Mô hình tập trung quan liêu bao cấp ngày càng bộc lộ khiếm khuyết nhưng cải tổ lại chậm trễ và mắc sai lầm; các nhân tố bên ngoài chỉ là tác động thúc đẩy.',
    traps: { C: 'Liên Xô là một trong những quốc gia giàu tài nguyên nhất thế giới.' },
    skills: ['quan hệ nhân quả'],
  },
];

const geography: QuestionDraft[] = [
  {
    id: 's.geo.51',
    topicId: 'science.geography.nature',
    difficulty: 2,
    stem: 'Loại gió nào hoạt động quanh năm ở nước ta do vị trí nằm trong vùng nội chí tuyến?',
    choices: ['Tín phong bán cầu Bắc', 'Gió Tây ôn đới', 'Gió Đông cực', 'Gió đất — gió biển'],
    answer: 'A',
    explanation:
      'Nằm trong vùng nội chí tuyến nên nước ta chịu tác động của Tín phong bán cầu Bắc quanh năm; tuy nhiên vào các mùa gió mùa, Tín phong bị lấn át và chỉ mạnh lên vào thời kỳ chuyển tiếp.',
    traps: { B: 'Gió Tây ôn đới hoạt động ở vĩ độ trung bình, ngoài phạm vi nước ta.' },
    skills: ['hoàn lưu khí quyển'],
  },
  {
    id: 's.geo.52',
    topicId: 'science.geography.nature',
    difficulty: 3,
    stem: 'Vì sao miền Nam nước ta có hai mùa mưa — khô rõ rệt còn miền Bắc thì không?',
    choices: [
      'Vì miền Nam không chịu tác động của gió mùa Đông Bắc mà chỉ có gió mùa Tây Nam và Tín phong',
      'Vì miền Nam có địa hình thấp hơn miền Bắc',
      'Vì miền Nam nằm xa biển hơn',
      'Vì miền Nam có diện tích rừng lớn hơn',
    ],
    answer: 'A',
    explanation:
      'Gió mùa Đông Bắc suy yếu và hầu như không vượt qua dãy Bạch Mã, nên miền Nam chỉ còn hai mùa do gió mùa Tây Nam gây mưa và Tín phong gây khô, thay vì bốn mùa chuyển tiếp như miền Bắc.',
    traps: { C: 'Miền Nam giáp biển ở nhiều phía, không hề nằm xa biển hơn miền Bắc.' },
    skills: ['phân hóa khí hậu'],
  },
  {
    id: 's.geo.53',
    topicId: 'science.geography.economy',
    difficulty: 2,
    stem: 'Vùng nào sau đây có mật độ dân số cao nhất nước ta?',
    choices: ['Đồng bằng sông Hồng', 'Tây Nguyên', 'Trung du và miền núi Bắc Bộ', 'Bắc Trung Bộ'],
    answer: 'A',
    explanation:
      'Đồng bằng sông Hồng có lịch sử khai thác lâu đời, đất phù sa màu mỡ và nền nông nghiệp lúa nước thâm canh, nên mật độ dân số cao nhất cả nước.',
    traps: { B: 'Tây Nguyên là một trong những vùng thưa dân nhất do địa hình cao nguyên và lịch sử khai thác muộn.' },
    skills: ['phân bố dân cư'],
  },
  {
    id: 's.geo.54',
    topicId: 'science.geography.economy',
    difficulty: 3,
    stem: 'Điều kiện tự nhiên thuận lợi nhất cho Đồng bằng sông Cửu Long phát triển nuôi trồng thủy sản là:',
    choices: [
      'Diện tích mặt nước rộng, mạng lưới sông ngòi kênh rạch dày đặc',
      'Địa hình đồi núi chia cắt tạo nhiều hồ chứa',
      'Khí hậu có mùa đông lạnh thích hợp cá nước lạnh',
      'Bờ biển ngắn nhưng nhiều vũng vịnh nước sâu',
    ],
    answer: 'A',
    explanation:
      'Vùng có hệ thống sông ngòi, kênh rạch chằng chịt cùng vùng ven biển và rừng ngập mặn rộng lớn, tạo diện tích mặt nước nuôi trồng lớn nhất cả nước.',
    traps: { C: 'Đồng bằng sông Cửu Long có khí hậu cận xích đạo nóng quanh năm, không có mùa đông lạnh.' },
    skills: ['thế mạnh vùng'],
  },
  {
    id: 's.geo.55',
    topicId: 'science.geography.data',
    difficulty: 2,
    stem: 'Để thể hiện quy mô và cơ cấu giá trị xuất khẩu của nước ta trong hai năm 2015 và 2022, dạng biểu đồ thích hợp nhất là:',
    choices: [
      'Hai biểu đồ tròn có bán kính khác nhau',
      'Biểu đồ miền',
      'Biểu đồ đường',
      'Biểu đồ cột ghép',
    ],
    answer: 'A',
    explanation:
      'Yêu cầu có cả "quy mô" và "cơ cấu" với đúng hai mốc năm, nên dùng hai hình tròn có bán kính khác nhau: bán kính thể hiện quy mô, các nan quạt thể hiện cơ cấu.',
    traps: { B: 'Biểu đồ miền chỉ thể hiện cơ cấu và cần từ bốn mốc thời gian trở lên.' },
    skills: ['chọn dạng biểu đồ'],
  },
  {
    id: 's.geo.56',
    topicId: 'science.geography.data',
    difficulty: 3,
    stem: 'Cho bảng số liệu sản lượng lúa: 2015 đạt 45 triệu tấn, 2022 đạt 43 triệu tấn. Nhận xét nào sau đây đúng?',
    choices: [
      'Sản lượng lúa giảm khoảng 4,4% trong giai đoạn 2015 — 2022',
      'Sản lượng lúa tăng khoảng 4,4%',
      'Sản lượng lúa giảm khoảng 2%',
      'Sản lượng lúa không thay đổi đáng kể',
    ],
    answer: 'A',
    explanation:
      'Mức thay đổi tương đối = (43 − 45)/45 × 100 ≈ −4,4%. Chú ý mẫu số là năm gốc 2015; lấy chênh lệch 2 triệu tấn rồi báo là 2% là nhầm số tuyệt đối với số tương đối.',
    traps: { C: 'Con số 2 là chênh lệch tuyệt đối tính bằng triệu tấn, không phải phần trăm.' },
    skills: ['tính tốc độ tăng trưởng'],
  },
  {
    id: 's.geo.57',
    topicId: 'science.geography.data',
    difficulty: 2,
    stem: 'Trong biểu đồ tròn thể hiện cơ cấu, một thành phần chiếm 25% sẽ ứng với góc ở tâm bằng bao nhiêu độ?',
    choices: ['90°', '25°', '45°', '180°'],
    answer: 'A',
    explanation:
      'Cả hình tròn là 100% ứng với 360°, nên 1% ứng với 3,6° và 25% ứng với 25 × 3,6 = 90°. Đây cũng chính là một phần tư hình tròn.',
    traps: { B: 'Lấy thẳng số phần trăm làm số đo góc là lỗi quên hệ số 3,6.' },
    skills: ['vẽ biểu đồ tròn'],
  },
  {
    id: 's.geo.58',
    topicId: 'science.geography.data',
    difficulty: 3,
    stem: 'Khi đọc Atlat Địa lí Việt Nam để xác định một trung tâm công nghiệp có quy mô lớn, cần dựa vào yếu tố nào?',
    choices: [
      'Kích thước của vòng tròn biểu thị trung tâm đó',
      'Màu nền của tỉnh chứa trung tâm',
      'Số lượng ký hiệu sông ngòi xung quanh',
      'Vị trí của trung tâm so với đường bờ biển',
    ],
    answer: 'A',
    explanation:
      'Trên bản đồ công nghiệp của Atlat, quy mô giá trị sản xuất được mã hóa bằng kích thước vòng tròn, còn các ký hiệu bên trong cho biết cơ cấu ngành. Chú giải nêu rõ thang kích thước này.',
    traps: { B: 'Màu nền thường biểu thị một chỉ tiêu khác, không phải quy mô trung tâm công nghiệp.' },
    skills: ['kỹ năng Atlat'],
  },
];

export const physicsQuestions3 = buildQuestions('science', 'physics', physics);
export const chemistryQuestions4 = buildQuestions('science', 'chemistry', chemistry);
export const historyQuestions4 = buildQuestions('science', 'history', history);
export const geographyQuestions4 = buildQuestions('science', 'geography', geography);
