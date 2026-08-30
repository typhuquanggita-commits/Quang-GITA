import { buildQuestions, type QuestionDraft } from './helpers';

/**
 * KHO CAU KHO VA CAU PHAN LOAI — PHAN NGU VAN
 *
 * Cau kho cua phan Ngu van khac cau kho cua phan Toan o ban chat: no khong
 * dai hon hay nhieu buoc hon, ma doi mot lan DOC KY hon o dung mot cho.
 *
 * Ba kieu lam nen cau phan loai cua phan nay:
 *  - Bon phuong an DEU dung ve su that, chi khac nhau o tam bao quat.
 *  - Cau hoi ve thai do hoac gia dinh ngam, thu khong duoc noi thang.
 *  - Cau suy luan ma phuong an sai lai dung ve logic doi thuong.
 */

const reading: QuestionDraft[] = [
  {
    id: 'q.rea.h1',
    topicId: 'qualitative.reading',
    difficulty: 5,
    stem: 'Đọc đoạn: "Người ta thường nói tuổi trẻ là tuổi của ước mơ. Nhưng ước mơ mà không kèm một kế hoạch thì chỉ là mong muốn. Và mong muốn thì ai cũng có, kể cả người không định làm gì cả." Giả định ngầm mà tác giả dựa vào để lập luận là gì?',
    choices: [
      'Có kế hoạch là thứ phân biệt ước mơ với mong muốn suông',
      'Tuổi trẻ không nên có ước mơ',
      'Mọi người đều lười biếng như nhau',
      'Kế hoạch quan trọng hơn tuổi trẻ',
    ],
    answer: 'A',
    explanation:
      'Đoạn văn không nói thẳng định nghĩa nào, nhưng cả ba câu chỉ đứng vững nếu người đọc chấp nhận rằng kế hoạch là ranh giới giữa ước mơ và mong muốn. Đó là giả định ngầm chống đỡ toàn bộ lập luận.',
    traps: {
      B: 'Đây là điều tác giả không hề nói; văn bản phê phán ước mơ thiếu kế hoạch chứ không phê phán ước mơ.',
      D: 'So sánh này không xuất hiện trong đoạn, là suy diễn thêm.',
    },
    skills: ['giả định ngầm', 'đọc hiểu lập luận'],
  },
  {
    id: 'q.rea.h2',
    topicId: 'qualitative.reading',
    difficulty: 5,
    stem: 'Đọc đoạn: "Thư viện trường mở cửa tới 9 giờ tối. Đa số học sinh vẫn về lúc 5 giờ. Số ít ở lại thì hầu hết là học sinh lớp 12." Kết luận nào KHÔNG suy ra được từ đoạn trên?',
    choices: [
      'Học sinh lớp 12 chăm chỉ hơn các khối khác',
      'Phần lớn học sinh không dùng khoảng thời gian sau 5 giờ',
      'Thư viện mở cửa dài hơn thời gian đa số học sinh sử dụng',
      'Nhóm ở lại muộn có tỉ lệ học sinh lớp 12 cao',
    ],
    answer: 'A',
    explanation:
      'Ba phương án còn lại đều đọc thẳng ra được từ các dữ kiện. Riêng "chăm chỉ hơn" là một đánh giá về phẩm chất, trong khi đoạn văn chỉ cho biết một hành vi ở một địa điểm — học sinh lớp 12 có thể ở lại vì sắp thi, vì nhà xa, hoặc vì nhiều lý do khác.',
    traps: {
      D: 'Đây chính là điều đoạn văn nói thẳng, nên nó suy ra được.',
      B: 'Suy trực tiếp từ việc đa số về lúc 5 giờ.',
    },
    skills: ['suy luận có căn cứ', 'phân biệt dữ kiện và đánh giá'],
  },
];

const literature: QuestionDraft[] = [
  {
    id: 'q.lit.h1',
    topicId: 'qualitative.literature',
    difficulty: 4,
    stem: 'Đặc điểm nào sau đây KHÔNG thuộc khuynh hướng sử thi của văn học Việt Nam giai đoạn 1945 – 1975?',
    choices: [
      'Đi sâu vào bi kịch cá nhân và những dằn vặt riêng tư',
      'Nhân vật đại diện cho phẩm chất của cả cộng đồng',
      'Đề tài hướng về vận mệnh dân tộc',
      'Giọng điệu ngợi ca, trang trọng',
    ],
    answer: 'A',
    explanation:
      'Khuynh hướng sử thi đặt số phận cá nhân trong vận mệnh chung của cộng đồng, nên nhân vật mang tầm vóc đại diện và giọng điệu thiên về ngợi ca. Việc đi sâu vào bi kịch riêng tư là đặc điểm nổi lên ở văn học sau 1975, khi cảm hứng chuyển sang đời sống thế sự.',
    traps: { B: 'Đây đúng là đặc điểm của khuynh hướng sử thi, nên không phải đáp án của câu hỏi phủ định.' },
    skills: ['khuynh hướng sử thi', 'giai đoạn văn học'],
  },
  {
    id: 'q.lit.h2',
    topicId: 'qualitative.literature',
    difficulty: 4,
    stem: 'Vì sao cùng viết về người nông dân, nhưng tác phẩm trước 1945 thường kết thúc bi kịch còn tác phẩm sau 1945 thường kết thúc mở ra hy vọng?',
    choices: [
      'Vì hoàn cảnh lịch sử đổi, nên cách nhìn về khả năng thay đổi số phận cũng đổi',
      'Vì các tác giả sau 1945 viết kém hiện thực hơn',
      'Vì người nông dân sau 1945 không còn khổ nữa',
      'Vì quy định về độ dài tác phẩm thay đổi',
    ],
    answer: 'A',
    explanation:
      'Trước Cách mạng, người nông dân bị dồn vào ngõ cụt nên tác phẩm hiện thực phản ánh đúng bế tắc đó. Sau Cách mạng, khi con đường giải phóng đã mở ra, văn học phản ánh khả năng thay đổi số phận. Kết thúc tác phẩm thay đổi vì hiện thực được phản ánh đã thay đổi.',
    traps: {
      C: 'Đời sống vẫn còn nhiều khó khăn; điều đổi là khả năng thay đổi số phận, không phải sự khổ biến mất.',
      B: 'Đánh giá về chất lượng, không giải thích được mối quan hệ lịch sử — văn học.',
    },
    skills: ['hoàn cảnh lịch sử và văn học', 'so sánh giai đoạn'],
  },
  {
    id: 'q.lit.h3',
    topicId: 'qualitative.literature',
    difficulty: 5,
    stem: 'Trong một tác phẩm tự sự, việc tác giả chọn ngôi kể thứ nhất thay vì ngôi thứ ba mang lại hiệu quả nghệ thuật chủ yếu nào?',
    choices: [
      'Tăng độ tin cậy cảm xúc nhưng thu hẹp tầm bao quát của điểm nhìn',
      'Giúp bao quát được toàn bộ diễn biến và nội tâm mọi nhân vật',
      'Làm câu văn ngắn gọn hơn',
      'Bắt buộc tác phẩm phải có thật',
    ],
    answer: 'A',
    explanation:
      'Ngôi thứ nhất cho người đọc tiếp cận trực tiếp nội tâm người kể nên cảm xúc đáng tin hơn, nhưng đổi lại chỉ biết được những gì nhân vật ấy biết. Đó là một sự đánh đổi có chủ đích chứ không phải một ưu thế thuần túy.',
    traps: {
      B: 'Đây là đặc quyền của ngôi thứ ba toàn tri, ngược hẳn với ngôi thứ nhất.',
      D: 'Ngôi kể là một lựa chọn nghệ thuật, không liên quan tới tính có thật của câu chuyện.',
    },
    skills: ['ngôi kể', 'điểm nhìn trần thuật'],
  },
  {
    id: 'q.lit.h4',
    topicId: 'qualitative.literature',
    difficulty: 5,
    stem: 'Chi tiết nghệ thuật trong tác phẩm tự sự khác chi tiết thông thường ở điểm nào?',
    choices: [
      'Nó vừa tả thực vừa mang sức nặng biểu tượng, xoá đi thì tác phẩm hụt một tầng nghĩa',
      'Nó luôn dài hơn và được miêu tả kỹ hơn',
      'Nó luôn xuất hiện ở phần mở đầu tác phẩm',
      'Nó luôn gắn với nhân vật chính',
    ],
    answer: 'A',
    explanation:
      'Chi tiết nghệ thuật được chọn vì nó vừa dựng được cảnh vừa gánh thêm một lớp nghĩa. Phép thử để nhận ra: thử bỏ chi tiết đó đi, nếu tác phẩm chỉ mất một mô tả thì đó là chi tiết thường; nếu mất luôn một tầng ý nghĩa thì đó là chi tiết nghệ thuật.',
    traps: {
      B: 'Độ dài không quyết định; nhiều chi tiết nghệ thuật rất ngắn.',
      D: 'Chi tiết nghệ thuật có thể gắn với nhân vật phụ hoặc với bối cảnh.',
    },
    skills: ['chi tiết nghệ thuật', 'phân tích tác phẩm'],
  },
];

const grammar: QuestionDraft[] = [
  {
    id: 'q.gra.h1',
    topicId: 'qualitative.grammar',
    difficulty: 4,
    stem: 'Câu nào sau đây mắc lỗi lô-gic trong quan hệ giữa các vế?',
    choices: [
      'Vì trời mưa to nên chúng tôi vẫn quyết định đi.',
      'Tuy trời mưa to nhưng chúng tôi vẫn quyết định đi.',
      'Trời mưa to nên chúng tôi hoãn chuyến đi.',
      'Nếu trời mưa to thì chúng tôi sẽ hoãn chuyến đi.',
    ],
    answer: 'A',
    explanation:
      'Cặp "vì… nên" báo hiệu quan hệ nguyên nhân — kết quả, nhưng từ "vẫn" ở vế sau lại báo hiệu sự trái ngược với kỳ vọng. Hai tín hiệu này đánh nhau, nên câu sai lô-gic. Ba câu còn lại có quan hệ từ khớp với quan hệ ý nghĩa thật.',
    traps: { B: 'Cặp "tuy… nhưng" khớp hoàn toàn với từ "vẫn", nên câu này đúng.' },
    skills: ['quan hệ từ', 'lỗi lô-gic'],
  },
  {
    id: 'q.gra.h2',
    topicId: 'qualitative.grammar',
    difficulty: 5,
    stem: 'Câu "Nam gặp thầy giáo của em trai anh ấy ở thư viện." mơ hồ ở chỗ nào?',
    choices: [
      'Không xác định được "anh ấy" trỏ về Nam hay về một người khác',
      'Không rõ Nam có đi thư viện hay không',
      'Thiếu chủ ngữ',
      'Sai trật tự từ',
    ],
    answer: 'A',
    explanation:
      'Câu có hai nhân vật nam là Nam và thầy giáo, nên đại từ "anh ấy" có thể trỏ về một trong hai, cho hai cách hiểu khác nhau về em trai của ai. Câu mơ hồ về sở chỉ vẫn là câu sai dù đọc lên hoàn toàn xuôi tai.',
    traps: {
      C: 'Câu có chủ ngữ đầy đủ là "Nam".',
      B: 'Việc Nam gặp ai đó ở thư viện là điều câu nói rõ.',
    },
    skills: ['mơ hồ về sở chỉ', 'đại từ'],
  },
  {
    id: 'q.gra.h3',
    topicId: 'qualitative.grammar',
    difficulty: 5,
    stem: 'Trong các câu sau, câu nào KHÔNG mắc lỗi?',
    choices: [
      'Tác phẩm đã khắc họa thành công hình tượng người lính.',
      'Qua tác phẩm đã khắc họa thành công hình tượng người lính.',
      'Với tác phẩm đã cho ta thấy hình tượng người lính.',
      'Bằng tác phẩm đã thể hiện rõ hình tượng người lính.',
    ],
    answer: 'A',
    explanation:
      'Ba phương án B, C, D đều bắt đầu bằng một giới từ biến cụm "tác phẩm" thành trạng ngữ, khiến câu mất chủ ngữ và chỉ còn vị ngữ đứng một mình. Phương án A giữ "tác phẩm" ở vị trí chủ ngữ nên câu đủ nòng cốt.',
    traps: {
      B: 'Chữ "qua" ở đầu biến chủ ngữ thành trạng ngữ — đây là lỗi phổ biến nhất trong bài làm của học sinh vì nó nghe trang trọng hơn.',
      C: 'Cùng một lỗi, chỉ đổi giới từ.',
    },
    skills: ['thành phần câu', 'câu thiếu chủ ngữ'],
  },
];

const vocabulary: QuestionDraft[] = [
  {
    id: 'q.voc.h1',
    topicId: 'qualitative.vocabulary',
    difficulty: 4,
    stem: 'Từ "phong" trong "phong cảnh" và trong "phong tỏa" có quan hệ gì với nhau?',
    choices: [
      'Là hai từ đồng âm, nghĩa hoàn toàn khác nhau',
      'Là một từ nhiều nghĩa, nghĩa sau chuyển từ nghĩa trước',
      'Là hai từ đồng nghĩa',
      'Là hai từ trái nghĩa',
    ],
    answer: 'A',
    explanation:
      '"Phong" trong "phong cảnh" nghĩa là gió, cảnh sắc; "phong" trong "phong tỏa" nghĩa là ngăn, đóng kín. Hai yếu tố Hán Việt này viết và đọc giống nhau nhưng gốc nghĩa khác hẳn, không có quan hệ chuyển nghĩa — đó là hiện tượng đồng âm.',
    traps: {
      B: 'Từ nhiều nghĩa đòi hỏi các nghĩa phải có liên hệ với nhau; ở đây không có liên hệ nào.',
    },
    skills: ['từ đồng âm', 'yếu tố Hán Việt'],
  },
  {
    id: 'q.voc.h2',
    topicId: 'qualitative.vocabulary',
    difficulty: 4,
    stem: 'Trong câu "Anh ấy là người có tiếng nói trong công ty", từ "tiếng nói" mang nghĩa gì?',
    choices: [
      'Có ảnh hưởng, ý kiến được coi trọng',
      'Nói rất to và rõ ràng',
      'Biết nhiều ngoại ngữ',
      'Hay phát biểu trong cuộc họp',
    ],
    answer: 'A',
    explanation:
      'Nghĩa đen của "tiếng nói" là âm thanh phát ra khi nói. Ở đây chủ ngữ là một người trong bối cảnh công ty và cụm "có tiếng nói" đi với "trong công ty", nên nghĩa chuyển là có trọng lượng, có ảnh hưởng tới quyết định chung.',
    traps: {
      B: 'Lấy nghĩa đen, không hợp với ngữ cảnh về vị thế trong tổ chức.',
      D: 'Hay phát biểu là hành vi, khác với việc ý kiến được coi trọng.',
    },
    skills: ['nghĩa chuyển', 'đọc nghĩa theo ngữ cảnh'],
  },
  {
    id: 'q.voc.h3',
    topicId: 'qualitative.vocabulary',
    difficulty: 5,
    stem: 'Cặp từ nào sau đây KHÔNG thể thay thế cho nhau trong mọi ngữ cảnh, dù chúng gần nghĩa?',
    choices: [
      'hy sinh — chết',
      'to — lớn',
      'nhanh — mau',
      'xinh — đẹp',
    ],
    answer: 'A',
    explanation:
      '"Hy sinh" mang sắc thái trang trọng và hàm ý cái chết vì một lý tưởng hoặc vì người khác, nên không dùng được cho mọi trường hợp chết. Ba cặp còn lại tuy có khác biệt nhỏ về phạm vi kết hợp nhưng không mang chênh lệch sắc thái đánh giá như cặp đầu.',
    traps: {
      D: 'Có khác biệt về phạm vi nhưng không mang sắc thái trang trọng và hàm ý lý tưởng.',
    },
    skills: ['sắc thái biểu cảm', 'từ đồng nghĩa không hoàn toàn'],
  },
  {
    id: 'q.voc.h4',
    topicId: 'qualitative.vocabulary',
    difficulty: 5,
    stem: 'Thành ngữ "nước đổ lá khoai" mang nghĩa gì?',
    choices: [
      'Khuyên bảo mà người nghe không tiếp thu được gì',
      'Làm việc rất nhanh và gọn gàng',
      'Của cải bị mất mát dần dần',
      'Hai việc xảy ra cùng lúc',
    ],
    answer: 'A',
    explanation:
      'Lá khoai có lớp phủ không thấm nước, nước đổ lên thì trôi tuột đi không đọng lại chút nào. Hình ảnh đó được dùng để chỉ lời khuyên bảo không lưu lại gì trong người nghe.',
    traps: {
      C: 'Đây gần với nghĩa của "gió vào nhà trống" hoặc các thành ngữ về hao hụt.',
    },
    skills: ['thành ngữ', 'nghĩa biểu trưng'],
  },
];

const rhetoric: QuestionDraft[] = [
  {
    id: 'q.rhe.h1',
    topicId: 'qualitative.rhetoric',
    difficulty: 4,
    stem: 'Câu "Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao" sử dụng biện pháp tu từ nào là chính?',
    choices: ['Ẩn dụ kết hợp đối lập', 'So sánh', 'Nói quá đơn thuần', 'Điệp ngữ'],
    answer: 'A',
    explanation:
      '"Cây" là ẩn dụ chỉ con người, "non" và "núi cao" ẩn dụ chỉ thành quả. Hai vế đặt trong thế đối lập một — ba, chẳng nên — nên, làm nổi bật sức mạnh của đoàn kết. Câu không có từ so sánh nên không phải so sánh.',
    traps: {
      B: 'Không có từ so sánh nào như "như", "tựa", nên không thể là so sánh.',
      C: 'Có yếu tố phóng đại nhưng nó phục vụ cho ẩn dụ, không phải biện pháp chính.',
    },
    skills: ['ẩn dụ', 'đối lập', 'tục ngữ'],
  },
  {
    id: 'q.rhe.h2',
    topicId: 'qualitative.rhetoric',
    difficulty: 4,
    stem: 'Trong câu "Cả làng đều ra đồng từ sớm", từ "làng" được dùng theo biện pháp tu từ nào?',
    choices: ['Hoán dụ', 'Ẩn dụ', 'Nhân hóa', 'So sánh'],
    answer: 'A',
    explanation:
      '"Làng" là vật chứa được dùng để gọi thay cho người sống trong đó — quan hệ gần gũi, đi liền nhau, nên đây là hoán dụ. Ẩn dụ dựa trên quan hệ tương đồng, còn hoán dụ dựa trên quan hệ tương cận.',
    traps: {
      B: 'Ẩn dụ cần quan hệ giống nhau giữa hai đối tượng; ở đây là quan hệ chứa đựng.',
      C: 'Nhân hóa gán đặc điểm người cho vật, còn ở đây "làng" đang thay cho chính con người.',
    },
    skills: ['hoán dụ', 'phân biệt ẩn dụ và hoán dụ'],
  },
  {
    id: 'q.rhe.h3',
    topicId: 'qualitative.rhetoric',
    difficulty: 5,
    stem: 'Tác dụng chủ yếu của phép điệp cấu trúc trong một đoạn văn nghị luận là gì?',
    choices: [
      'Tạo nhịp điệu dồn dập và làm luận điểm được khắc sâu qua từng lần lặp',
      'Giúp đoạn văn ngắn gọn hơn',
      'Thay thế cho việc phải đưa dẫn chứng',
      'Làm cho ý nghĩa trở nên mơ hồ hơn',
    ],
    answer: 'A',
    explanation:
      'Lặp lại cùng một kiểu cấu trúc câu tạo ra nhịp và khiến người đọc gặp lại luận điểm nhiều lần dưới các hình thức khác nhau. Đây là biện pháp về nhịp điệu và sự nhấn mạnh, không thay thế được cho lập luận hay dẫn chứng.',
    traps: {
      B: 'Điệp cấu trúc làm đoạn văn dài thêm chứ không ngắn đi.',
      C: 'Nhấn mạnh không phải là chứng minh; đây là hiểu nhầm phổ biến trong bài nghị luận.',
    },
    skills: ['điệp cấu trúc', 'tác dụng biện pháp tu từ'],
  },
  {
    id: 'q.rhe.h4',
    topicId: 'qualitative.rhetoric',
    difficulty: 5,
    stem: 'Một văn bản dùng nhiều thuật ngữ chuyên môn, có trích dẫn nguồn, nhưng lại xen vào các câu cảm thán và hình ảnh giàu sức gợi. Nhận định nào đúng nhất về phong cách của văn bản này?',
    choices: [
      'Văn bản khoa học có pha yếu tố nghệ thuật nhằm phổ biến kiến thức cho công chúng rộng',
      'Văn bản nghệ thuật thuần túy',
      'Văn bản hành chính',
      'Văn bản không xác định được phong cách',
    ],
    answer: 'A',
    explanation:
      'Thuật ngữ và trích nguồn là dấu hiệu cốt lõi của phong cách khoa học. Yếu tố cảm thán và hình ảnh là chất liệu nghệ thuật được đưa vào để văn bản dễ tiếp nhận hơn — đặc trưng của loại khoa học phổ cập. Phong cách chính vẫn do mục đích giao tiếp quyết định.',
    traps: {
      B: 'Văn bản nghệ thuật không dùng trích dẫn nguồn và thuật ngữ chuyên môn làm nền.',
      D: 'Phong cách vẫn xác định được qua mục đích chính là truyền đạt tri thức.',
    },
    skills: ['phong cách ngôn ngữ', 'văn bản pha trộn'],
  },
];

const logic: QuestionDraft[] = [
  {
    id: 'q.log.h1',
    topicId: 'qualitative.logic',
    difficulty: 5,
    stem: 'Biết rằng "Mọi sinh viên giỏi đều đọc nhiều sách" là đúng. Mệnh đề nào sau đây chắc chắn cũng đúng?',
    choices: [
      'Ai không đọc nhiều sách thì không phải sinh viên giỏi',
      'Ai đọc nhiều sách đều là sinh viên giỏi',
      'Có sinh viên giỏi không đọc nhiều sách',
      'Sinh viên không giỏi thì không đọc nhiều sách',
    ],
    answer: 'A',
    explanation:
      'Mệnh đề "mọi A đều B" tương đương với mệnh đề phản đảo "không B thì không A" — đây là dạng suy luận duy nhất luôn bảo toàn tính đúng. Phương án B là mệnh đề đảo, phương án D là mệnh đề phản, cả hai đều không suy ra được.',
    traps: {
      B: 'Mệnh đề đảo — sai vì người đọc nhiều sách chưa chắc là sinh viên giỏi.',
      D: 'Mệnh đề phản — cũng không tương đương với mệnh đề gốc.',
    },
    skills: ['mệnh đề phản đảo', 'suy luận logic'],
  },
  {
    id: 'q.log.h2',
    topicId: 'qualitative.logic',
    difficulty: 5,
    stem: 'Bốn bạn A, B, C, D có thứ hạng khác nhau trong một cuộc thi. Biết: A không đứng nhất; B đứng ngay trước C; D đứng cuối. Ai đứng nhất?',
    choices: ['B', 'A', 'C', 'Không xác định được'],
    answer: 'A',
    explanation:
      'D đứng thứ tư. Khối BC liền nhau nên chỉ có thể ở vị trí 1–2 hoặc 2–3. Nếu BC ở 2–3 thì vị trí 1 phải là A, trái với điều kiện A không đứng nhất. Vậy BC ở 1–2, tức B nhất, C nhì, và A đứng thứ ba.',
    traps: {
      D: 'Ba ràng buộc là đủ để xác định duy nhất; kết luận "không xác định được" là do chưa dùng hết điều kiện.',
      C: 'C đứng ngay sau B nên không thể đứng nhất.',
    },
    skills: ['bài toán xếp thứ tự', 'loại trừ'],
  },
];

export const HARD_QUALITATIVE = buildQuestions('qualitative', undefined, [
  ...reading,
  ...literature,
  ...grammar,
  ...vocabulary,
  ...rhetoric,
  ...logic,
]);
