import { buildQuestions, type QuestionDraft } from './helpers';

/**
 * NGAN HANG CAU HOI PHAN NGU VAN — BO MO RONG
 *
 * Ly do ton tai: mot bo 10 de cho moi to hop doi hoi ngan hang du day de cac
 * de khong lap lai nhau. Phan Ngu van truoc do chi co 114 cau, tuc chi du
 * dung HAI de roi nhau — de thu ba tro di se lap lai gan het cau va nguoi
 * hoc chi con lam bang tri nho.
 *
 * Bo nay nang phan Ngu van len muc dap ung duoc chuan "hai de bat ky khong
 * dung chung qua 40% so cau".
 */

const reading: QuestionDraft[] = [
  {
    id: 'l.rea.21',
    topicId: 'qualitative.reading',
    difficulty: 2,
    stem: 'Theo đoạn trích, vì sao người thợ sửa giày vẫn tiếp tục công việc dù khách ngày một thưa?',
    choices: [
      'Vì vẫn còn những người mang tới các đôi giày có giá trị tình cảm',
      'Vì ông không biết làm nghề nào khác',
      'Vì tiền công sửa giày đã tăng lên',
      'Vì chính quyền hỗ trợ ông giữ nghề',
    ],
    answer: 'A',
    explanation:
      'Đoạn hai nói rõ mỗi tuần vẫn còn dăm người tìm tới với những đôi giày mà giá trị không nằm ở tiền. Đó là lý do được văn bản nêu trực tiếp, không phải suy đoán.',
    traps: { B: 'Văn bản nói ông biết rõ chuyện đang xảy ra với nghề, không nói ông không biết làm gì khác.' },
    passageId: 'p.reading.5',
    skills: ['đọc hiểu chi tiết'],
  },
  {
    id: 'l.rea.22',
    topicId: 'qualitative.reading',
    difficulty: 3,
    stem: 'Câu "Có những nghề không mất đi vì hết người làm, mà thu nhỏ lại cho vừa với phần nhu cầu còn sót lại" thể hiện điều gì trong lập luận của tác giả?',
    choices: [
      'Một cách nhìn khác về sự tồn tại của nghề cũ: không biến mất mà đổi quy mô',
      'Sự tiếc nuối thuần túy trước cái cũ mất đi',
      'Lời kêu gọi mọi người quay lại dùng dịch vụ sửa chữa',
      'Nhận định rằng nghề sửa giày sẽ sớm chấm dứt',
    ],
    answer: 'A',
    explanation:
      'Câu này là luận điểm khái quát của cả đoạn: tác giả không nói nghề chết đi mà nói nó co lại đúng bằng phần nhu cầu còn tồn tại. Đây là một cách nhìn, không phải một lời than hay lời kêu gọi.',
    traps: {
      D: 'Đoạn cuối khẳng định ngược lại: chừng nào còn người muốn giữ lại thì vẫn còn chỗ cho ông.',
    },
    passageId: 'p.reading.5',
    skills: ['ý khái quát', 'lập luận'],
  },
  {
    id: 'l.rea.23',
    topicId: 'qualitative.reading',
    difficulty: 3,
    stem: 'Chi tiết "tấm biển viết tay đã phai gần hết chữ" có tác dụng gì?',
    choices: [
      'Gợi thời gian đã trôi rất lâu và sự lặng lẽ của nghề cũ',
      'Cho biết ông thợ không biết chữ',
      'Chứng tỏ ông thợ làm ăn gian dối',
      'Nhấn mạnh giá dịch vụ rất rẻ',
    ],
    answer: 'A',
    explanation:
      'Tấm biển phai chữ là một chi tiết tả thực nhưng mang thêm nghĩa: nó nói lên độ dài thời gian mà không cần nêu con số, và gợi cảm giác nghề đang lùi dần vào im lặng.',
    passageId: 'p.reading.5',
    skills: ['chi tiết nghệ thuật'],
  },
  {
    id: 'l.rea.24',
    topicId: 'qualitative.reading',
    difficulty: 4,
    stem: 'Theo đoạn trích về sự chắc chắn, vì sao xu hướng né tránh rủi ro lại "có gốc rễ hợp lý"?',
    choices: [
      'Vì trong lịch sử tiến hóa, cái khó lường thường gắn với nguy hiểm nên người thận trọng sống lâu hơn',
      'Vì các nhà khoa học đã chứng minh rủi ro luôn có hại',
      'Vì xã hội hiện đại thưởng cho người thận trọng',
      'Vì con người vốn lười biếng',
    ],
    answer: 'A',
    explanation:
      'Đoạn hai nêu đúng lý do này: bộ não được định hình bởi hàng vạn năm mà thứ không đoán trước được thường đồng nghĩa với nguy hiểm. Đây là lời giải thích về nguồn gốc, không phải lời tán thành.',
    traps: {
      C: 'Đoạn ba nói ngược lại: trong môi trường hiện nay, ở lại vùng an toàn phải trả giá bằng sự tụt lại.',
    },
    passageId: 'p.reading.6',
    skills: ['đọc hiểu nguyên nhân'],
  },
  {
    id: 'l.rea.25',
    topicId: 'qualitative.reading',
    difficulty: 4,
    stem: 'Câu kết "Sự thoải mái và sự tiến bộ, đáng tiếc, hiếm khi đi cùng nhau" có vai trò gì trong đoạn?',
    choices: [
      'Chốt lại luận điểm bằng một nghịch lý, buộc người đọc chấp nhận một đánh đổi',
      'Mở ra một chủ đề mới chưa được bàn tới',
      'Bác bỏ toàn bộ những gì đã nói ở trên',
      'Chỉ là một câu cảm thán không mang thông tin',
    ],
    answer: 'A',
    explanation:
      'Cả đoạn đi tới chỗ chỉ ra rằng người chịu được cảm giác chưa chắc chắn mới học nhanh nhất. Câu kết cô đọng điều đó thành một nghịch lý, và từ "đáng tiếc" cho thấy tác giả thừa nhận đây là một cái giá thật.',
    traps: { C: 'Câu kết củng cố chứ không bác bỏ những lập luận phía trước.' },
    passageId: 'p.reading.6',
    skills: ['vai trò câu kết', 'lập luận'],
  },
  {
    id: 'l.rea.26',
    topicId: 'qualitative.reading',
    difficulty: 2,
    stem: 'Theo đoạn trích, vì sao một tấm bản đồ ghi lại đủ mọi chi tiết lại trở nên vô dụng?',
    choices: [
      'Vì nó sẽ to bằng chính vùng đất nên không dùng được',
      'Vì nó quá đắt tiền để in',
      'Vì không ai đọc nổi chữ nhỏ',
      'Vì các chi tiết sẽ thay đổi theo thời gian',
    ],
    answer: 'A',
    explanation:
      'Câu thứ hai của đoạn nêu thẳng: nếu bản đồ ghi đủ mọi viên sỏi, mọi ngọn cỏ thì nó sẽ to bằng chính vùng đất và trở nên vô dụng.',
    passageId: 'p.reading.7',
    skills: ['đọc hiểu chi tiết'],
  },
  {
    id: 'l.rea.27',
    topicId: 'qualitative.reading',
    difficulty: 4,
    stem: 'Câu "Giá trị của bản đồ nằm ở những gì nó bỏ đi" nên được hiểu thế nào?',
    choices: [
      'Việc lược bớt có chọn lọc mới làm bản đồ dùng được, nên đơn giản hóa là ưu điểm chứ không phải khuyết điểm',
      'Bản đồ càng thiếu thông tin càng tốt',
      'Người vẽ bản đồ thường cẩu thả',
      'Bản đồ không nên có tỉ lệ',
    ],
    answer: 'A',
    explanation:
      'Ý của tác giả là sự chọn lọc — bỏ đi cái không cần để làm nổi cái cần. Đó khác hẳn với việc thiếu thông tin một cách tùy tiện, vì thiếu ngẫu nhiên thì bản đồ cũng vô dụng.',
    traps: {
      B: 'Đẩy ý tới mức cực đoan và bỏ mất chữ "có chọn lọc" — đây là loại nhiễu tinh vi nhất của câu hiểu ý.',
    },
    passageId: 'p.reading.7',
    skills: ['hiểu ý ẩn dụ'],
  },
  {
    id: 'l.rea.28',
    topicId: 'qualitative.reading',
    difficulty: 5,
    stem: 'Theo lập luận của đoạn trích, sai lầm nguy hiểm nhất khi dùng một lý thuyết là gì?',
    choices: [
      'Quên rằng lý thuyết chỉ là mô hình giản lược, và tưởng nó chính là thực tế',
      'Dùng một lý thuyết chưa hoàn hảo',
      'Học quá nhiều lý thuyết cùng lúc',
      'Không thuộc lòng công thức của lý thuyết',
    ],
    answer: 'A',
    explanation:
      'Đoạn cuối phân biệt rõ hai điều: dùng bản đồ chưa hoàn hảo là bình thường và không tránh được; sai lầm thật sự là quên mình đang cầm bản đồ. Câu hỏi kiểm tra đúng sự phân biệt này.',
    traps: {
      B: 'Chính đoạn văn nói đây KHÔNG phải sai lầm nguy hiểm nhất, nên đây là bẫy dành cho người đọc lướt câu cuối.',
    },
    passageId: 'p.reading.7',
    skills: ['suy luận', 'phân biệt hai mệnh đề gần nhau'],
  },
  {
    id: 'l.rea.29',
    topicId: 'qualitative.reading',
    difficulty: 3,
    stem: 'Một văn bản mở đầu bằng số liệu thống kê, tiếp theo nêu nguyên nhân, rồi kết bằng đề xuất giải pháp. Đó là kiểu lập luận nào?',
    choices: [
      'Diễn dịch theo mạch thực trạng — nguyên nhân — giải pháp',
      'Quy nạp từ nhiều dẫn chứng nhỏ',
      'Song hành, các ý ngang hàng nhau',
      'Móc xích, ý sau lặp lại từ ngữ của ý trước',
    ],
    answer: 'A',
    explanation:
      'Mạch thực trạng — nguyên nhân — giải pháp là cấu trúc quen thuộc của văn nghị luận xã hội, đi từ hiện tượng cụ thể tới cách xử lý. Nhận ra cấu trúc giúp đoán được nội dung phần chưa đọc.',
    skills: ['cấu trúc lập luận'],
  },
  {
    id: 'l.rea.30',
    topicId: 'qualitative.reading',
    difficulty: 3,
    stem: 'Trong một văn bản nghị luận, chức năng chính của dẫn chứng là gì?',
    choices: [
      'Làm luận điểm trở nên đáng tin bằng một trường hợp cụ thể kiểm chứng được',
      'Làm bài viết dài hơn cho đủ dung lượng',
      'Thay thế cho luận điểm',
      'Thể hiện vốn hiểu biết của người viết',
    ],
    answer: 'A',
    explanation:
      'Dẫn chứng phục vụ luận điểm chứ không thay thế nó. Một bài chỉ có dẫn chứng mà không rút ra luận điểm là bài kể chuyện; một bài chỉ có luận điểm mà không có dẫn chứng là bài nói suông.',
    traps: { C: 'Dẫn chứng và luận điểm là hai thành phần khác nhau, không thay nhau được.' },
    skills: ['luận điểm và dẫn chứng'],
  },
];

const literature: QuestionDraft[] = [
  {
    id: 'l.lit.21',
    topicId: 'qualitative.literature',
    difficulty: 2,
    stem: 'Thể loại nào sau đây thuộc loại hình tự sự?',
    choices: ['Truyện ngắn', 'Thơ trữ tình', 'Kịch nói', 'Tùy bút'],
    answer: 'A',
    explanation:
      'Tự sự là loại hình kể lại một chuỗi sự việc thông qua cốt truyện và nhân vật, tiêu biểu là truyện ngắn và tiểu thuyết. Thơ trữ tình thuộc loại trữ tình, kịch thuộc loại kịch, còn tùy bút nghiêng về ghi chép và cảm nghĩ.',
    skills: ['loại hình văn học'],
  },
  {
    id: 'l.lit.22',
    topicId: 'qualitative.literature',
    difficulty: 3,
    stem: 'Yếu tố nào sau đây KHÔNG thuộc cốt truyện của một tác phẩm tự sự?',
    choices: ['Ngôn ngữ đối thoại của nhân vật', 'Thắt nút', 'Cao trào', 'Mở nút'],
    answer: 'A',
    explanation:
      'Cốt truyện là chuỗi sự kiện có quan hệ nhân quả, gồm các chặng trình bày, thắt nút, phát triển, cao trào và mở nút. Ngôn ngữ đối thoại là một phương tiện nghệ thuật để triển khai cốt truyện chứ không phải một thành phần của cốt truyện.',
    skills: ['cốt truyện', 'yếu tố tự sự'],
  },
  {
    id: 'l.lit.23',
    topicId: 'qualitative.literature',
    difficulty: 3,
    stem: 'Cảm hứng chủ đạo của văn học Việt Nam giai đoạn 1930 – 1945 ở dòng hiện thực phê phán là gì?',
    choices: [
      'Phơi bày bất công xã hội và số phận bi kịch của người lao động nghèo',
      'Ngợi ca chiến công của người anh hùng cách mạng',
      'Ca ngợi vẻ đẹp của thiên nhiên đất nước',
      'Kêu gọi hội nhập quốc tế',
    ],
    answer: 'A',
    explanation:
      'Dòng hiện thực phê phán trước Cách mạng tập trung vào mâu thuẫn xã hội và sự tha hóa, bần cùng hóa của người lao động dưới chế độ thực dân nửa phong kiến. Cảm hứng ngợi ca người anh hùng cách mạng thuộc giai đoạn sau 1945.',
    traps: { B: 'Đây là cảm hứng của giai đoạn 1945 – 1975, sau Cách mạng tháng Tám.' },
    skills: ['hiện thực phê phán', 'giai đoạn văn học'],
  },
  {
    id: 'l.lit.24',
    topicId: 'qualitative.literature',
    difficulty: 4,
    stem: 'Vì sao nói nhân vật trong tác phẩm hiện thực thường mang tính điển hình?',
    choices: [
      'Vì nhân vật vừa có nét riêng sinh động vừa khái quát được số phận của cả một lớp người',
      'Vì nhân vật luôn được xây dựng theo một khuôn mẫu cố định',
      'Vì nhân vật không có đặc điểm cá nhân nào',
      'Vì nhân vật luôn có thật ngoài đời',
    ],
    answer: 'A',
    explanation:
      'Tính điển hình đòi hỏi hai vế phải cùng có: nét riêng làm nhân vật sống động và không lẫn với ai, đồng thời nét chung làm nhân vật đại diện cho một tầng lớp. Thiếu vế đầu thì thành công thức, thiếu vế sau thì chỉ là một trường hợp cá biệt.',
    traps: {
      B: 'Khuôn mẫu cố định là điều trái ngược với tính điển hình, vì nó xóa mất nét riêng.',
    },
    skills: ['nhân vật điển hình', 'chủ nghĩa hiện thực'],
  },
  {
    id: 'l.lit.25',
    topicId: 'qualitative.literature',
    difficulty: 4,
    stem: 'Trong thơ, "tứ thơ" được hiểu là gì?',
    choices: [
      'Ý tưởng nghệ thuật xuyên suốt, chi phối cách tổ chức hình ảnh và cảm xúc của cả bài',
      'Số câu trong một khổ thơ',
      'Cách gieo vần của bài thơ',
      'Số tiếng trong một dòng thơ',
    ],
    answer: 'A',
    explanation:
      'Tứ thơ là hạt nhân ý tưởng làm bài thơ thành một chỉnh thể: nó quyết định chọn hình ảnh nào, sắp xếp ra sao và dẫn cảm xúc đi đâu. Số câu, cách gieo vần hay số tiếng thuộc về hình thức thể thơ.',
    skills: ['tứ thơ', 'đặc trưng thơ'],
  },
  {
    id: 'l.lit.26',
    topicId: 'qualitative.literature',
    difficulty: 5,
    stem: 'Vì sao kết thúc mở lại được nhiều tác giả hiện đại lựa chọn?',
    choices: [
      'Vì nó buộc người đọc tham gia hoàn tất ý nghĩa, và giữ tác phẩm ở lại lâu hơn sau khi gấp sách',
      'Vì tác giả không nghĩ ra cách kết thúc',
      'Vì kết thúc mở giúp rút ngắn tác phẩm',
      'Vì quy định xuất bản yêu cầu như vậy',
    ],
    answer: 'A',
    explanation:
      'Kết thúc đóng trả lời trọn vẹn mọi câu hỏi và khép lại tác phẩm cùng lúc với trang cuối. Kết thúc mở để lại một khoảng trống có chủ ý, buộc người đọc tự đưa ra phán đoán — và chính hoạt động đó kéo dài đời sống của tác phẩm trong tâm trí họ.',
    traps: {
      B: 'Đây là một lựa chọn nghệ thuật có chủ đích, không phải sự bế tắc.',
    },
    skills: ['kết thúc mở', 'tiếp nhận văn học'],
  },
];

const grammar: QuestionDraft[] = [
  {
    id: 'l.gra.21',
    topicId: 'qualitative.grammar',
    difficulty: 2,
    stem: 'Câu nào sau đây dùng đúng dấu câu?',
    choices: [
      'Trời đã tối, chúng tôi vẫn tiếp tục đi.',
      'Trời đã tối chúng tôi vẫn tiếp tục đi.',
      'Trời đã tối. Chúng tôi, vẫn tiếp tục đi.',
      'Trời đã tối; chúng tôi vẫn tiếp tục, đi.',
    ],
    answer: 'A',
    explanation:
      'Hai vế có quan hệ chặt chẽ nên nối bằng dấu phẩy là hợp lý. Phương án B thiếu dấu ngăn giữa hai vế, còn C và D đặt dấu phẩy cắt ngang cụm chủ vị làm câu đứt mạch.',
    skills: ['dấu câu', 'câu ghép'],
  },
  {
    id: 'l.gra.22',
    topicId: 'qualitative.grammar',
    difficulty: 3,
    stem: 'Câu "Bằng những nỗ lực không mệt mỏi, thành tích của em đã được cải thiện." mắc lỗi gì?',
    choices: [
      'Trạng ngữ chỉ phương tiện không cùng chủ thể với chủ ngữ của câu',
      'Thiếu vị ngữ',
      'Dùng sai dấu phẩy',
      'Lặp từ',
    ],
    answer: 'A',
    explanation:
      'Trạng ngữ "bằng những nỗ lực không mệt mỏi" ngầm chỉ hành động của một người, nhưng chủ ngữ của câu lại là "thành tích" — một sự vật không thể nỗ lực. Sửa lại: "Bằng những nỗ lực không mệt mỏi, em đã cải thiện được thành tích của mình."',
    traps: { B: 'Câu có vị ngữ đầy đủ là "đã được cải thiện".' },
    skills: ['lỗi trạng ngữ', 'chủ thể hành động'],
  },
  {
    id: 'l.gra.23',
    topicId: 'qualitative.grammar',
    difficulty: 3,
    stem: 'Câu nào sau đây mắc lỗi lặp thừa?',
    choices: [
      'Nguyên nhân chính là do thời tiết xấu gây ra.',
      'Nguyên nhân chính là thời tiết xấu.',
      'Thời tiết xấu là nguyên nhân chính.',
      'Vì thời tiết xấu nên chuyến đi bị hoãn.',
    ],
    answer: 'A',
    explanation:
      'Từ "nguyên nhân" đã bao hàm ý gây ra, nên thêm "do... gây ra" là thừa và làm câu rườm rà. Ba câu còn lại đều diễn đạt gọn, mỗi ý chỉ xuất hiện một lần.',
    skills: ['lỗi lặp thừa', 'diễn đạt'],
  },
  {
    id: 'l.gra.24',
    topicId: 'qualitative.grammar',
    difficulty: 4,
    stem: 'Trong các câu sau, câu nào có quan hệ giữa hai vế được diễn đạt CHÍNH XÁC nhất?',
    choices: [
      'Vì chuẩn bị kỹ nên anh ấy trình bày rất tự tin.',
      'Tuy chuẩn bị kỹ nên anh ấy trình bày rất tự tin.',
      'Nếu chuẩn bị kỹ thì anh ấy đã trình bày rất tự tin rồi.',
      'Mặc dù chuẩn bị kỹ nhưng anh ấy trình bày rất tự tin.',
    ],
    answer: 'A',
    explanation:
      'Chuẩn bị kỹ dẫn tới trình bày tự tin — quan hệ nguyên nhân kết quả, đúng với cặp "vì… nên". Phương án B ghép lẫn hai cặp; C biến câu thành giả định trái thực tế; D dùng cặp tương phản cho hai vế vốn thuận chiều nhau.',
    traps: { D: 'Cặp "mặc dù… nhưng" đòi hai vế phải trái ngược kỳ vọng, ở đây thì không.' },
    skills: ['quan hệ từ', 'lô-gic câu ghép'],
  },
  {
    id: 'l.gra.25',
    topicId: 'qualitative.grammar',
    difficulty: 5,
    stem: 'Câu "Tôi khuyên nó không nên bỏ học là sai." có thể hiểu theo mấy cách?',
    choices: [
      'Hai cách, tùy vào việc cụm "là sai" quy về lời khuyên hay quy về việc bỏ học',
      'Một cách duy nhất',
      'Ba cách',
      'Câu này sai ngữ pháp nên không hiểu được',
    ],
    answer: 'A',
    explanation:
      'Cách thứ nhất: việc tôi khuyên nó là một việc làm sai. Cách thứ hai: tôi khuyên nó rằng bỏ học là sai. Sự mơ hồ nảy sinh vì cụm "là sai" có thể gắn với hai thành phần khác nhau, và câu không có dấu hiệu nào phân định.',
    traps: {
      D: 'Câu đúng ngữ pháp; vấn đề nằm ở chỗ nó cho phép hai cách phân tích cấu trúc.',
    },
    skills: ['câu mơ hồ', 'cấu trúc cú pháp'],
  },
];

const vocabulary: QuestionDraft[] = [
  {
    id: 'l.voc.21',
    topicId: 'qualitative.vocabulary',
    difficulty: 2,
    stem: 'Từ nào sau đây là từ ghép đẳng lập?',
    choices: ['Nhà cửa', 'Nhà máy', 'Nhà ăn', 'Nhà báo'],
    answer: 'A',
    explanation:
      'Từ ghép đẳng lập có hai tiếng bình đẳng về nghĩa, không tiếng nào phụ thuộc tiếng nào, và nghĩa chung thường khái quát hơn từng tiếng. "Nhà cửa" chỉ chung nơi ở. Ba từ còn lại là ghép chính phụ, tiếng sau thu hẹp nghĩa của tiếng "nhà".',
    skills: ['từ ghép', 'đẳng lập và chính phụ'],
  },
  {
    id: 'l.voc.22',
    topicId: 'qualitative.vocabulary',
    difficulty: 3,
    stem: 'Trong câu "Tình hình đã khả quan hơn", từ "khả quan" có nghĩa gần nhất với từ nào?',
    choices: ['Sáng sủa', 'Nghiêm trọng', 'Ổn định', 'Rõ ràng'],
    answer: 'A',
    explanation:
      '"Khả quan" nghĩa là có dấu hiệu tốt lên, đáng để lạc quan. "Sáng sủa" khi nói về tình hình mang đúng sắc thái đó. "Ổn định" chỉ sự không biến động chứ không hàm ý tốt lên, còn "rõ ràng" nói về mức độ minh bạch.',
    traps: { C: 'Ổn định là không đổi, khác với chuyển biến theo hướng tốt.' },
    skills: ['từ Hán Việt', 'từ gần nghĩa'],
  },
  {
    id: 'l.voc.23',
    topicId: 'qualitative.vocabulary',
    difficulty: 3,
    stem: 'Thành ngữ nào sau đây nói về việc làm vô ích vì không đúng đối tượng?',
    choices: ['Đàn gảy tai trâu', 'Nước chảy đá mòn', 'Có công mài sắt có ngày nên kim', 'Tích tiểu thành đại'],
    answer: 'A',
    explanation:
      '"Đàn gảy tai trâu" chỉ việc nói điều hay với người không có khả năng tiếp nhận, nên công sức bỏ ra thành vô ích. Ba thành ngữ còn lại đều ca ngợi sự kiên trì tích lũy.',
    skills: ['thành ngữ', 'phân loại theo nghĩa'],
  },
  {
    id: 'l.voc.24',
    topicId: 'qualitative.vocabulary',
    difficulty: 4,
    stem: 'Cặp từ nào sau đây là cặp từ trái nghĩa hoàn toàn trong mọi ngữ cảnh?',
    choices: ['Sống — chết', 'Già — trẻ', 'Cao — thấp', 'Nóng — lạnh'],
    answer: 'A',
    explanation:
      '"Sống — chết" là cặp trái nghĩa loại trừ: không có trạng thái trung gian, phủ định vế này là khẳng định vế kia. Ba cặp còn lại là trái nghĩa thang độ, có vùng trung gian như trung niên, trung bình hay ấm.',
    traps: { C: 'Giữa cao và thấp còn có trung bình, nên đây là trái nghĩa thang độ.' },
    skills: ['từ trái nghĩa', 'loại trừ và thang độ'],
  },
  {
    id: 'l.voc.25',
    topicId: 'qualitative.vocabulary',
    difficulty: 5,
    stem: 'Vì sao không nói "một người phụ nữ đàn bà" dù hai từ này gần nghĩa?',
    choices: [
      'Vì hai từ cùng chỉ một đối tượng nên đặt cạnh nhau tạo thành lặp thừa',
      'Vì "đàn bà" là từ sai chính tả',
      'Vì hai từ trái nghĩa nhau',
      'Vì "phụ nữ" chỉ dùng cho số nhiều',
    ],
    answer: 'A',
    explanation:
      'Hai từ có cùng sở chỉ, chỉ khác sắc thái trang trọng. Ghép chúng lại không thêm được nghĩa nào mà chỉ lặp lại cùng một thông tin, tạo lỗi thừa từ. Trong một câu chỉ nên chọn một từ theo sắc thái phù hợp với văn cảnh.',
    traps: { B: '"Đàn bà" là từ thuần Việt hoàn toàn chuẩn, chỉ khác sắc thái so với từ Hán Việt.' },
    skills: ['lỗi thừa từ', 'sắc thái từ đồng nghĩa'],
  },
];

const rhetoric: QuestionDraft[] = [
  {
    id: 'l.rhe.21',
    topicId: 'qualitative.rhetoric',
    difficulty: 2,
    stem: 'Câu "Bàn tay ta làm nên tất cả" sử dụng biện pháp tu từ nào?',
    choices: ['Hoán dụ', 'So sánh', 'Nói giảm', 'Chơi chữ'],
    answer: 'A',
    explanation:
      '"Bàn tay" là một bộ phận được dùng để chỉ toàn bộ con người lao động — quan hệ bộ phận với toàn thể, tức hoán dụ.',
    traps: { B: 'Không có từ so sánh nào trong câu.' },
    skills: ['hoán dụ'],
  },
  {
    id: 'l.rhe.22',
    topicId: 'qualitative.rhetoric',
    difficulty: 3,
    stem: 'Biện pháp nói giảm nói tránh thường được dùng nhằm mục đích gì?',
    choices: [
      'Giảm cảm giác đau buồn hoặc nặng nề, thể hiện sự tế nhị',
      'Phóng đại mức độ của sự việc',
      'Làm câu văn dài hơn',
      'Tạo nhịp điệu cho câu',
    ],
    answer: 'A',
    explanation:
      'Nói giảm nói tránh dùng cách diễn đạt nhẹ hơn để tránh gây sốc hoặc để giữ phép lịch sự, ví dụ dùng "đi xa" thay cho "chết". Nó ngược hẳn với nói quá vốn nhằm phóng đại.',
    traps: { B: 'Đó là mục đích của biện pháp nói quá.' },
    skills: ['nói giảm nói tránh'],
  },
  {
    id: 'l.rhe.23',
    topicId: 'qualitative.rhetoric',
    difficulty: 3,
    stem: 'Phong cách ngôn ngữ sinh hoạt có đặc trưng nổi bật nào?',
    choices: [
      'Tính cụ thể, tính cảm xúc và tính cá thể trong lời nói hằng ngày',
      'Tính khái quát và trừu tượng cao',
      'Tính khuôn mẫu chặt chẽ theo thể thức',
      'Tính chính xác tuyệt đối của thuật ngữ',
    ],
    answer: 'A',
    explanation:
      'Ngôn ngữ sinh hoạt gắn với hoàn cảnh giao tiếp cụ thể, bộc lộ cảm xúc trực tiếp và mang dấu ấn riêng của người nói. Tính khuôn mẫu thuộc phong cách hành chính, còn tính chính xác thuật ngữ thuộc phong cách khoa học.',
    skills: ['phong cách sinh hoạt'],
  },
  {
    id: 'l.rhe.24',
    topicId: 'qualitative.rhetoric',
    difficulty: 4,
    stem: 'Câu hỏi tu từ khác câu hỏi thông thường ở điểm nào?',
    choices: [
      'Nó không nhằm tìm câu trả lời mà nhằm khẳng định hoặc bộc lộ cảm xúc',
      'Nó luôn dài hơn câu hỏi thông thường',
      'Nó luôn kết thúc bằng dấu chấm than',
      'Nó chỉ xuất hiện trong thơ',
    ],
    answer: 'A',
    explanation:
      'Câu hỏi tu từ mang hình thức hỏi nhưng người nói đã có sẵn câu trả lời, mục đích là nhấn mạnh một ý hoặc bày tỏ tình cảm. Chính vì vậy nó thường không được đáp lại trong văn bản.',
    traps: { D: 'Câu hỏi tu từ xuất hiện cả trong văn xuôi và văn nghị luận.' },
    skills: ['câu hỏi tu từ'],
  },
  {
    id: 'l.rhe.25',
    topicId: 'qualitative.rhetoric',
    difficulty: 5,
    stem: 'Vì sao phép liệt kê tăng tiến có sức biểu đạt mạnh hơn liệt kê thông thường?',
    choices: [
      'Vì các yếu tố sắp xếp theo mức độ tăng dần nên tạo được cao trào ở cuối chuỗi',
      'Vì nó dùng nhiều từ hơn',
      'Vì nó luôn đi kèm dấu chấm lửng',
      'Vì nó làm câu văn ngắn lại',
    ],
    answer: 'A',
    explanation:
      'Liệt kê thông thường đặt các yếu tố ngang hàng nên sức nặng dàn đều. Liệt kê tăng tiến sắp xếp theo mức độ lớn dần, khiến người đọc bị dẫn tới điểm mạnh nhất ở cuối — cấu trúc đó tạo cao trào.',
    skills: ['liệt kê tăng tiến', 'hiệu quả biểu đạt'],
  },
];

const logic: QuestionDraft[] = [
  {
    id: 'l.log.21',
    topicId: 'qualitative.logic',
    difficulty: 3,
    stem: 'Từ hai tiền đề "Một số vận động viên là sinh viên" và "Mọi sinh viên đều phải thi cuối kỳ", kết luận nào đúng?',
    choices: [
      'Một số vận động viên phải thi cuối kỳ',
      'Mọi vận động viên đều phải thi cuối kỳ',
      'Mọi người phải thi cuối kỳ đều là vận động viên',
      'Không vận động viên nào phải thi cuối kỳ',
    ],
    answer: 'A',
    explanation:
      'Nhóm vận động viên vừa là sinh viên nằm trọn trong nhóm phải thi cuối kỳ, nên chắc chắn tồn tại vận động viên phải thi. Nhưng vì tiền đề chỉ nói "một số" nên không mở rộng ra "mọi" được.',
    traps: {
      B: 'Mở rộng từ "một số" thành "mọi" — lỗi phổ biến nhất của suy luận từ tiền đề bộ phận.',
    },
    skills: ['tam đoạn luận', 'lượng từ'],
  },
  {
    id: 'l.log.22',
    topicId: 'qualitative.logic',
    difficulty: 3,
    stem: 'Bốn bạn ngồi thành hàng ngang. Nam không ngồi cạnh Bình. Nam ngồi giữa Cường và Dũng. Vị trí của Bình là gì?',
    choices: ['Một trong hai đầu hàng', 'Ngồi giữa hàng', 'Cạnh Nam', 'Không xác định được'],
    answer: 'A',
    explanation:
      'Nam ngồi giữa Cường và Dũng nên ba bạn này chiếm ba ghế liền nhau. Ghế còn lại của Bình vì thế phải nằm ở một trong hai đầu hàng, và điều đó cũng thỏa mãn điều kiện Bình không ngồi cạnh Nam.',
    traps: { D: 'Hai ràng buộc là đủ để xác định vị trí của Bình, dù chưa xác định được từng người cụ thể.' },
    skills: ['xếp vị trí', 'suy luận từ ràng buộc'],
  },
  {
    id: 'l.log.23',
    topicId: 'qualitative.logic',
    difficulty: 4,
    stem: 'Một lập luận nói: "Từ khi thành phố lắp camera, số vụ trộm giảm. Vậy camera đã làm giảm trộm cắp." Lỗi tiềm ẩn của lập luận này là gì?',
    choices: [
      'Suy từ tương quan ra nhân quả mà chưa loại trừ các nguyên nhân khác',
      'Dùng số liệu sai',
      'Mâu thuẫn nội tại giữa hai câu',
      'Không có lỗi nào',
    ],
    answer: 'A',
    explanation:
      'Hai hiện tượng xảy ra cùng lúc chưa đủ để kết luận cái này gây ra cái kia. Số vụ trộm có thể giảm vì tăng tuần tra, vì kinh tế khá lên, hoặc vì cách thống kê thay đổi. Muốn kết luận nhân quả phải loại trừ được các giải thích thay thế đó.',
    traps: { D: 'Lập luận nghe hợp lý nhưng chính sự hợp lý đó là điều làm lỗi khó nhận ra.' },
    skills: ['tương quan và nhân quả', 'lỗi lập luận'],
  },
  {
    id: 'l.log.24',
    topicId: 'qualitative.logic',
    difficulty: 4,
    stem: 'Trong một dãy số, mỗi số bằng tổng hai số liền trước: 2, 3, 5, 8, 13, … Số tiếp theo là bao nhiêu?',
    choices: ['21', '18', '26', '20'],
    answer: 'A',
    explanation:
      'Quy luật là mỗi số bằng tổng hai số đứng ngay trước nó. Số tiếp theo bằng 8 + 13 = 21. Kiểm lại quy luật với các số trước: 2 + 3 = 5, 3 + 5 = 8, 5 + 8 = 13 — nhất quán.',
    traps: {
      C: 'Nhân đôi số cuối, một quy luật khác không khớp với các số đầu dãy.',
    },
    skills: ['quy luật dãy số', 'suy luận'],
  },
  {
    id: 'l.log.25',
    topicId: 'qualitative.logic',
    difficulty: 5,
    stem: 'Ba người phát biểu: A nói "B nói dối", B nói "C nói dối", C nói "cả A và B đều nói dối". Biết mỗi người hoặc luôn nói thật hoặc luôn nói dối. Ai là người nói thật?',
    choices: ['Chỉ B nói thật', 'Chỉ A nói thật', 'Chỉ C nói thật', 'Cả ba đều nói dối'],
    answer: 'A',
    explanation:
      'Từ lời của A suy ra A và B luôn trái nhau, nên đúng một trong hai người nói thật. Xét trường hợp A nói thật: khi đó B nói dối, mà B nói dối nghĩa là C nói thật; nhưng lời của C khẳng định cả A lẫn B đều nói dối, trái với việc A nói thật — mâu thuẫn, loại. Xét trường hợp B nói thật: khi đó A nói dối, và lời B đúng nên C nói dối; kiểm lại lời C là "cả A và B đều nói dối" — sai vì B nói thật, đúng với việc C nói dối. Không có mâu thuẫn nào, nên đây là lời giải duy nhất: chỉ B nói thật.',
    traps: {
      D: 'Nếu cả ba nói dối thì lời của A phải sai, tức B nói thật — mâu thuẫn ngay với giả thiết.',
      C: 'C nói thật kéo theo B nói dối, mà B nói dối lại kéo theo C nói thật rồi vòng về mâu thuẫn với chính lời C.',
    },
    skills: ['bài toán nói thật nói dối', 'xét cạn trường hợp'],
  },
];

export const QUALITATIVE_QUESTIONS_3 = buildQuestions('qualitative', undefined, [
  ...reading,
  ...literature,
  ...grammar,
  ...vocabulary,
  ...rhetoric,
  ...logic,
]);
