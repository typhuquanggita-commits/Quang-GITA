import { buildQuestions, type QuestionDraft } from './helpers';

/**
 * NGU VAN — BO LAM DAY CUOI CUNG
 *
 * Sau khi lam day phan Toan va cac chu de khoa hoc, phan Ngu van la nut that
 * cuoi cung con lai cua chuan "hai de bat ky khong dung chung qua 40%".
 */

const drafts: QuestionDraft[] = [
  {
    id: 'l.rea.41',
    topicId: 'qualitative.reading',
    difficulty: 2,
    stem: 'Trong một văn bản nghị luận, câu chủ đề của đoạn thường có vai trò gì?',
    choices: [
      'Nêu ý chính mà các câu còn lại trong đoạn cùng làm rõ',
      'Đưa ra dẫn chứng cụ thể nhất',
      'Kết thúc mạch lập luận của cả bài',
      'Chuyển sang một chủ đề khác',
    ],
    answer: 'A',
    explanation:
      'Câu chủ đề mang luận điểm của đoạn, còn các câu khác giải thích, chứng minh hoặc mở rộng cho nó. Đọc ra câu chủ đề là nắm được đoạn mà không cần đọc kỹ từng câu.',
    skills: ['câu chủ đề'],
  },
  {
    id: 'l.rea.42',
    topicId: 'qualitative.reading',
    difficulty: 2,
    stem: 'Từ nối nào sau đây báo hiệu quan hệ tương phản giữa hai ý?',
    choices: ['Tuy nhiên', 'Vì vậy', 'Ngoài ra', 'Chẳng hạn'],
    answer: 'A',
    explanation:
      '"Tuy nhiên" báo hiệu ý sau đi ngược với kỳ vọng từ ý trước. "Vì vậy" chỉ kết quả, "ngoài ra" bổ sung, còn "chẳng hạn" dẫn ví dụ.',
    skills: ['từ nối', 'quan hệ ý'],
  },
  {
    id: 'l.rea.43',
    topicId: 'qualitative.reading',
    difficulty: 3,
    stem: 'Một đoạn văn viết: "Không phải ai chăm chỉ cũng thành công. Nhưng chưa ai thành công mà không chăm chỉ." Hai câu này khẳng định điều gì về sự chăm chỉ?',
    choices: [
      'Chăm chỉ là điều kiện cần nhưng chưa đủ để thành công',
      'Chăm chỉ không liên quan gì tới thành công',
      'Chăm chỉ bảo đảm thành công',
      'Thành công chỉ đến với người may mắn',
    ],
    answer: 'A',
    explanation:
      'Câu đầu bác bỏ việc chăm chỉ là điều kiện đủ; câu sau khẳng định nó là điều kiện cần. Ghép hai câu lại được đúng mệnh đề "cần nhưng chưa đủ".',
    traps: { C: 'Chính câu đầu tiên bác bỏ điều này.' },
    skills: ['điều kiện cần và đủ', 'đọc hiểu lập luận'],
  },
  {
    id: 'l.rea.44',
    topicId: 'qualitative.reading',
    difficulty: 3,
    stem: 'Khi đề hỏi "ý nào KHÔNG được đề cập trong đoạn", cách làm hiệu quả nhất là gì?',
    choices: [
      'Đối chiếu từng phương án với văn bản, loại dần những ý tìm thấy được',
      'Chọn phương án nghe lạ tai nhất',
      'Chọn phương án dài nhất',
      'Chọn phương án đầu tiên thấy hợp lý',
    ],
    answer: 'A',
    explanation:
      'Câu hỏi phủ định đòi một quy trình ngược với câu hỏi thường: thay vì tìm phương án đúng, phải xác nhận ba phương án kia có trong bài rồi loại chúng. Phương án còn lại chính là đáp án.',
    skills: ['chiến thuật làm bài', 'câu hỏi phủ định'],
  },
  {
    id: 'l.rea.45',
    topicId: 'qualitative.reading',
    difficulty: 4,
    stem: 'Một văn bản viết: "Chính sách mới giúp doanh nghiệp tiết kiệm chi phí, theo báo cáo của chính hiệp hội doanh nghiệp." Chi tiết "theo báo cáo của chính hiệp hội doanh nghiệp" gợi điều gì?',
    choices: [
      'Nguồn thông tin có thể thiên vị vì hiệp hội có lợi ích liên quan',
      'Thông tin chắc chắn chính xác vì đến từ người trong ngành',
      'Chính sách đã bị bãi bỏ',
      'Doanh nghiệp phản đối chính sách',
    ],
    answer: 'A',
    explanation:
      'Chữ "chính" trong "chính hiệp hội" là một tín hiệu tinh tế: tác giả đang lưu ý rằng nguồn tin là bên hưởng lợi từ kết luận. Đánh giá độ tin cậy của nguồn là một kỹ năng đọc hiểu riêng, khác với hiểu nội dung.',
    traps: { B: 'Người trong ngành hiểu rõ nhưng cũng là bên có lợi ích, nên cần thận trọng.' },
    skills: ['đánh giá nguồn tin', 'đọc hiểu phê phán'],
  },
  {
    id: 'l.lit.31',
    topicId: 'qualitative.literature',
    difficulty: 2,
    stem: 'Thể thơ lục bát có đặc điểm nào?',
    choices: [
      'Câu sáu tiếng xen câu tám tiếng, gieo vần ở tiếng thứ sáu',
      'Mỗi câu bảy tiếng, gieo vần chân',
      'Mỗi câu năm tiếng, không gieo vần',
      'Số tiếng mỗi câu tự do',
    ],
    answer: 'A',
    explanation:
      'Lục bát gồm các cặp câu sáu và tám tiếng nối tiếp, tiếng thứ sáu câu lục hiệp vần với tiếng thứ sáu câu bát. Đây là thể thơ dân tộc phổ biến nhất trong ca dao và truyện thơ Nôm.',
    skills: ['thể thơ'],
  },
  {
    id: 'l.lit.32',
    topicId: 'qualitative.literature',
    difficulty: 3,
    stem: 'Trong tác phẩm tự sự, "điểm nhìn trần thuật" là gì?',
    choices: [
      'Vị trí và góc độ mà người kể chuyện dùng để quan sát, kể lại câu chuyện',
      'Nơi câu chuyện diễn ra',
      'Thời điểm câu chuyện được viết',
      'Nhân vật chính của tác phẩm',
    ],
    answer: 'A',
    explanation:
      'Điểm nhìn quyết định người đọc biết được những gì và biết theo cách nào. Cùng một sự việc, thay đổi điểm nhìn sẽ cho ra hai tác phẩm khác hẳn về ý nghĩa.',
    traps: { B: 'Đó là bối cảnh không gian, một yếu tố khác.' },
    skills: ['điểm nhìn trần thuật'],
  },
  {
    id: 'l.lit.33',
    topicId: 'qualitative.literature',
    difficulty: 3,
    stem: 'Giá trị nhân đạo của một tác phẩm văn học thể hiện chủ yếu qua điều gì?',
    choices: [
      'Sự cảm thông với số phận con người và trân trọng khát vọng sống của họ',
      'Số lượng nhân vật trong tác phẩm',
      'Độ dài của tác phẩm',
      'Mức độ chính xác của các chi tiết lịch sử',
    ],
    answer: 'A',
    explanation:
      'Giá trị nhân đạo gồm ba biểu hiện quen thuộc: cảm thương trước nỗi khổ, tố cáo thế lực chà đạp con người, và phát hiện, trân trọng vẻ đẹp cùng khát vọng của họ.',
    skills: ['giá trị nhân đạo'],
  },
  {
    id: 'l.lit.34',
    topicId: 'qualitative.literature',
    difficulty: 4,
    stem: 'Vì sao tình huống truyện được coi là yếu tố then chốt của truyện ngắn?',
    choices: [
      'Vì nó là hoàn cảnh đặc biệt buộc nhân vật bộc lộ bản chất trong một dung lượng rất ngắn',
      'Vì nó quyết định số trang của tác phẩm',
      'Vì nó luôn nằm ở cuối truyện',
      'Vì nó thay thế cho nhân vật',
    ],
    answer: 'A',
    explanation:
      'Truyện ngắn không có chỗ để kể dần bản chất nhân vật qua nhiều biến cố như tiểu thuyết. Tình huống truyện dồn nhân vật vào một hoàn cảnh buộc phải lựa chọn, và chính lựa chọn đó phơi bày con người họ ngay lập tức.',
    skills: ['tình huống truyện', 'đặc trưng truyện ngắn'],
  },
  {
    id: 'l.gra.31',
    topicId: 'qualitative.grammar',
    difficulty: 2,
    stem: 'Trong câu "Những cuốn sách cũ trên giá đã phủ bụi", bộ phận nào là chủ ngữ?',
    choices: ['Những cuốn sách cũ trên giá', 'Những cuốn sách', 'Trên giá', 'Đã phủ bụi'],
    answer: 'A',
    explanation:
      'Chủ ngữ là toàn bộ cụm danh từ, gồm danh từ trung tâm "cuốn sách" cùng các thành phần bổ nghĩa cho nó. "Đã phủ bụi" là vị ngữ.',
    traps: { B: 'Cắt mất phần bổ nghĩa vốn thuộc cùng một cụm danh từ.' },
    skills: ['thành phần câu', 'cụm danh từ'],
  },
  {
    id: 'l.gra.32',
    topicId: 'qualitative.grammar',
    difficulty: 3,
    stem: 'Câu nào sau đây là câu ghép?',
    choices: [
      'Trời mưa nên đường trơn.',
      'Trời mưa rất to và kéo dài.',
      'Cơn mưa mùa hạ đến rất nhanh.',
      'Sau cơn mưa, trời lại sáng.',
    ],
    answer: 'A',
    explanation:
      'Câu ghép có từ hai cụm chủ vị trở lên, mỗi cụm không bao chứa cụm kia. "Trời mưa" và "đường trơn" là hai cụm chủ vị độc lập nối bằng quan hệ từ. Phương án B chỉ có một chủ ngữ với hai vị ngữ.',
    traps: { B: 'Hai vị ngữ chung một chủ ngữ vẫn là câu đơn.' },
    skills: ['câu đơn và câu ghép'],
  },
  {
    id: 'l.gra.33',
    topicId: 'qualitative.grammar',
    difficulty: 3,
    stem: 'Câu "Học sinh phải nghiêm túc chấp hành nội quy nhà trường một cách nghiêm chỉnh." mắc lỗi gì?',
    choices: [
      'Lặp nghĩa giữa "nghiêm túc" và "một cách nghiêm chỉnh"',
      'Thiếu chủ ngữ',
      'Sai quan hệ từ',
      'Sai trật tự từ',
    ],
    answer: 'A',
    explanation:
      'Hai cụm cùng diễn đạt một ý về thái độ chấp hành, đặt cả hai vào một câu là thừa. Chỉ nên giữ lại một, ví dụ: "Học sinh phải nghiêm túc chấp hành nội quy nhà trường."',
    skills: ['lỗi lặp nghĩa'],
  },
  {
    id: 'l.gra.34',
    topicId: 'qualitative.grammar',
    difficulty: 4,
    stem: 'Câu nào sau đây dùng đúng cặp quan hệ từ?',
    choices: [
      'Không những học giỏi mà bạn ấy còn rất khiêm tốn.',
      'Không những học giỏi nên bạn ấy còn rất khiêm tốn.',
      'Không những học giỏi nhưng bạn ấy còn rất khiêm tốn.',
      'Không những học giỏi thì bạn ấy còn rất khiêm tốn.',
    ],
    answer: 'A',
    explanation:
      'Cặp cố định là "không những… mà còn", biểu thị quan hệ tăng tiến. Ghép "không những" với "nên", "nhưng" hay "thì" đều là lắp lẫn giữa các cặp khác nhau.',
    skills: ['cặp quan hệ từ', 'quan hệ tăng tiến'],
  },
  {
    id: 'l.voc.31',
    topicId: 'qualitative.vocabulary',
    difficulty: 2,
    stem: 'Từ nào sau đây là từ láy?',
    choices: ['Lung linh', 'Quần áo', 'Sách vở', 'Bàn ghế'],
    answer: 'A',
    explanation:
      'Từ láy có quan hệ láy âm giữa các tiếng, và thường chỉ một tiếng có nghĩa rõ hoặc cả hai đều không có nghĩa độc lập. Ba từ còn lại đều là từ ghép đẳng lập với hai tiếng đều có nghĩa.',
    skills: ['từ láy và từ ghép'],
  },
  {
    id: 'l.voc.32',
    topicId: 'qualitative.vocabulary',
    difficulty: 3,
    stem: 'Trong câu "Anh ấy có một trái tim ấm áp", từ "trái tim" được dùng theo nghĩa nào?',
    choices: ['Nghĩa chuyển, chỉ tình cảm và lòng tốt', 'Nghĩa đen, chỉ cơ quan tuần hoàn', 'Nghĩa bóng chỉ sức khỏe', 'Nghĩa chỉ nghề nghiệp'],
    answer: 'A',
    explanation:
      'Cơ quan tuần hoàn không thể "ấm áp" theo nghĩa tình cảm, nên đây là nghĩa chuyển: trái tim được dùng để chỉ đời sống tình cảm của con người.',
    skills: ['nghĩa chuyển'],
  },
  {
    id: 'l.voc.33',
    topicId: 'qualitative.vocabulary',
    difficulty: 3,
    stem: 'Từ Hán Việt nào sau đây có nghĩa là "người đứng đầu một nước"?',
    choices: ['Nguyên thủ', 'Nguyên nhân', 'Nguyên tắc', 'Nguyên liệu'],
    answer: 'A',
    explanation:
      '"Nguyên" nghĩa là đầu, gốc; "thủ" nghĩa là đầu, người đứng đầu. Ghép lại thành người đứng đầu quốc gia. Ba từ còn lại tuy cùng có yếu tố "nguyên" nhưng ghép với các yếu tố khác cho nghĩa hoàn toàn khác.',
    skills: ['từ Hán Việt', 'yếu tố cấu tạo'],
  },
  {
    id: 'l.voc.34',
    topicId: 'qualitative.vocabulary',
    difficulty: 4,
    stem: 'Vì sao không nên dùng từ "rất" đi kèm với từ "hoàn hảo"?',
    choices: [
      'Vì "hoàn hảo" đã chỉ mức tuyệt đối, không còn thang độ để tăng thêm',
      'Vì "rất" là từ thuần Việt còn "hoàn hảo" là từ Hán Việt',
      'Vì hai từ trái nghĩa nhau',
      'Vì "hoàn hảo" là danh từ',
    ],
    answer: 'A',
    explanation:
      'Một số tính từ mang nghĩa tuyệt đối như hoàn hảo, tuyệt đối, duy nhất, tối đa — chúng đã ở mức cao nhất nên không kết hợp được với từ chỉ mức độ. Đây là lỗi kết hợp về nghĩa chứ không phải về ngữ pháp.',
    traps: { B: 'Từ thuần Việt và Hán Việt vẫn kết hợp bình thường với nhau.' },
    skills: ['tính từ tuyệt đối', 'lỗi kết hợp'],
  },
  {
    id: 'l.rhe.31',
    topicId: 'qualitative.rhetoric',
    difficulty: 2,
    stem: 'Câu "Mặt trời xuống biển như hòn lửa" sử dụng biện pháp tu từ nào?',
    choices: ['So sánh', 'Ẩn dụ', 'Hoán dụ', 'Nhân hóa'],
    answer: 'A',
    explanation: 'Có từ so sánh "như" nối hai vế, nên đây là so sánh chứ không phải ẩn dụ. Ẩn dụ là khi từ so sánh bị lược đi.',
    skills: ['so sánh'],
  },
  {
    id: 'l.rhe.32',
    topicId: 'qualitative.rhetoric',
    difficulty: 3,
    stem: 'Biện pháp nói quá có tác dụng chủ yếu nào?',
    choices: [
      'Nhấn mạnh, gây ấn tượng mạnh về mức độ của sự vật hiện tượng',
      'Làm giảm nhẹ cảm giác đau buồn',
      'Tạo sự chính xác cho thông tin',
      'Rút gọn câu văn',
    ],
    answer: 'A',
    explanation:
      'Nói quá phóng đại mức độ để gây ấn tượng, không nhằm cung cấp thông tin chính xác. Nó ngược với nói giảm nói tránh vốn làm nhẹ đi cảm giác nặng nề.',
    traps: { B: 'Đó là tác dụng của nói giảm nói tránh.' },
    skills: ['nói quá'],
  },
  {
    id: 'l.rhe.33',
    topicId: 'qualitative.rhetoric',
    difficulty: 3,
    stem: 'Phong cách ngôn ngữ báo chí có đặc trưng nổi bật nào?',
    choices: [
      'Tính thông tin thời sự, ngắn gọn và hấp dẫn người đọc',
      'Tính hình tượng và biểu cảm cao nhất',
      'Tính khuôn mẫu theo thể thức hành chính',
      'Tính trừu tượng của hệ thống thuật ngữ',
    ],
    answer: 'A',
    explanation:
      'Báo chí phục vụ mục đích đưa tin nên phải mới, gọn và thu hút. Tính hình tượng thuộc phong cách nghệ thuật, khuôn mẫu thuộc hành chính, còn thuật ngữ trừu tượng thuộc khoa học.',
    skills: ['phong cách báo chí'],
  },
  {
    id: 'l.rhe.34',
    topicId: 'qualitative.rhetoric',
    difficulty: 4,
    stem: 'Vì sao phép đối trong thơ Đường luật lại đòi hỏi cả đối ý lẫn đối thanh?',
    choices: [
      'Vì hai vế phải cân xứng cả về nghĩa lẫn về âm điệu mới tạo được thế cân bằng đặc trưng của thể thơ',
      'Vì quy định về số chữ trong câu',
      'Vì để bài thơ dài hơn',
      'Vì để dễ thuộc lòng hơn',
    ],
    answer: 'A',
    explanation:
      'Phép đối yêu cầu hai vế tương ứng nhau về từ loại và ý nghĩa, đồng thời thanh bằng đối với thanh trắc. Chính sự cân xứng hai tầng đó tạo nên vẻ chỉnh chu và nhạc tính riêng của thơ Đường luật.',
    skills: ['phép đối', 'thơ Đường luật'],
  },
  {
    id: 'l.log.31',
    topicId: 'qualitative.logic',
    difficulty: 2,
    stem: 'Trong dãy 2, 6, 12, 20, 30, … số tiếp theo là bao nhiêu?',
    choices: ['42', '40', '36', '44'],
    answer: 'A',
    explanation:
      'Hiệu giữa các số liên tiếp là 4, 6, 8, 10 — tăng đều 2 đơn vị. Hiệu tiếp theo là 12, nên số cần tìm bằng 30 + 12 = 42. Có thể kiểm bằng công thức n(n+1): 6 × 7 = 42.',
    traps: { B: 'Cộng thêm 10 như hiệu trước đó, quên rằng hiệu cũng tăng dần.' },
    skills: ['quy luật dãy số'],
  },
  {
    id: 'l.log.32',
    topicId: 'qualitative.logic',
    difficulty: 3,
    stem: 'Nếu mệnh đề "Mọi số chia hết cho 4 đều chia hết cho 2" là đúng, thì mệnh đề nào sau đây cũng đúng?',
    choices: [
      'Số không chia hết cho 2 thì không chia hết cho 4',
      'Số chia hết cho 2 thì chia hết cho 4',
      'Số không chia hết cho 4 thì không chia hết cho 2',
      'Không có số nào chia hết cho cả 2 và 4',
    ],
    answer: 'A',
    explanation:
      'Mệnh đề phản đảo luôn tương đương với mệnh đề gốc. Từ "mọi A đều B" suy ra "không B thì không A". Phương án B là mệnh đề đảo và sai vì 6 chia hết cho 2 nhưng không chia hết cho 4.',
    traps: { C: 'Đây là mệnh đề phản, không tương đương với mệnh đề gốc.' },
    skills: ['mệnh đề phản đảo'],
  },
  {
    id: 'l.log.33',
    topicId: 'qualitative.logic',
    difficulty: 4,
    stem: 'Một lập luận nói: "Ai cũng nói cuốn sách này hay, vậy nó chắc chắn hay." Đây là kiểu lỗi lập luận nào?',
    choices: [
      'Dựa vào số đông thay vì dựa vào lý lẽ',
      'Suy từ tương quan ra nhân quả',
      'Đánh tráo khái niệm',
      'Lấy trường hợp cá biệt làm quy luật',
    ],
    answer: 'A',
    explanation:
      'Việc nhiều người cùng tin một điều không làm điều đó thành đúng. Lập luận này thay lý lẽ về nội dung cuốn sách bằng một thống kê về ý kiến, nên nó không chứng minh được điều nó khẳng định.',
    traps: { D: 'Lỗi đó là suy từ một trường hợp ra quy luật chung, ngược với việc dựa vào số đông.' },
    skills: ['lỗi lập luận', 'ngụy biện số đông'],
  },
];

export const QUALITATIVE_QUESTIONS_4 = buildQuestions('qualitative', undefined, drafts);
