/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {Playbook} from '../types';

/* ==========================================================================
   CHUỖI BÍ KÍP — 24 chiến thuật cô đọng, áp dụng được trong ngày
   Mỗi bí kíp: 1 bí mật + các nước đi + bằng chứng + phản mẫu.
   ========================================================================== */

export const PLAYBOOKS: Playbook[] = [
  {
    id: 'p-90-98',
    title: 'Quy tắc 90–98%: chọn đúng tài liệu là thắng một nửa',
    skill: 'listening',
    band: 'Mọi trình độ',
    secret:
      'Tài liệu đúng không phải tài liệu hay nhất — mà là tài liệu bạn hiểu 90–98% mà vẫn còn 2–10% mới. Sai ở đây thì mọi kỹ thuật khác vô nghĩa.',
    moves: [
      'Đọc thử 1 trang: tra quá 5 từ → quá khó, hạ một bậc ngay lập tức.',
      'Nghe thử 2 phút: hiểu dưới 70% → quá khó; hiểu 100% → quá dễ, nâng bậc.',
      'Chấp nhận tài liệu "trông trẻ con". Hiệu quả quan trọng hơn sĩ diện.',
      'Mỗi 4 tuần thử lại tài liệu khó hơn để dò trần mới.',
    ],
    proof: 'Người chọn đúng vùng i+1 tiến bộ nhanh gấp 2–3 lần người cố cày tài liệu quá sức.',
    antiPattern: 'Xem phim Mỹ không phụ đề ở trình độ A2 vì "tắm ngôn ngữ" — 0% hấp thụ, 100% mệt.',
  },
  {
    id: 'p-2min',
    title: 'Phiên bản 2 phút: vũ khí chống đứt chuỗi',
    skill: 'mindset',
    band: 'Mọi trình độ',
    secret:
      'Ngày bận nhất không cần học 60 phút — chỉ cần 2 phút. Mục tiêu của ngày đó không phải tiến bộ, mà là GIỮ CHUỖI.',
    moves: [
      'Định nghĩa sẵn phiên bản 2 phút: mở Anki ôn 5 thẻ là tính hoàn thành.',
      'Viết nó ra giấy TRƯỚC khi cần dùng, đừng ứng biến lúc mệt.',
      'Không bao giờ cho phép bỏ 2 ngày liên tiếp — một ngày là tai nạn, hai ngày là thói quen mới.',
      'Tô ô lịch ngay cả cho ngày 2 phút. Chuỗi là chuỗi.',
    ],
    proof: 'Người giữ chuỗi 330/365 ngày ở mức trung bình vượt xa người học dồn cuối tuần rồi bỏ.',
    antiPattern: '"Hôm nay không đủ thời gian học tử tế nên thôi bỏ" — đây là câu nói giết chết mọi lộ trình 3 năm.',
  },
  {
    id: 'p-48h',
    title: 'Luật 48 giờ: input phải có đường ra',
    skill: 'speaking',
    band: 'Mọi trình độ',
    secret:
      'Mọi thứ nạp vào phải được nói lại, viết lại hoặc dạy lại trong vòng 48 giờ. Nếu không, nó chỉ là giải trí có phụ đề.',
    moves: [
      'Nghe podcast xong → kể lại 60 giây ngay lập tức.',
      'Đọc bài báo xong → viết 3 câu tóm tắt bằng lời của bạn.',
      'Học 10 cụm mới → ép cả 10 vào nhật ký tối nay.',
      'Xem phim → chọn 1 câu thoại hay, dùng nó trong buổi tự nói ngày mai.',
    ],
    proof: 'Đây là lý do người xem 300 giờ Netflix vẫn nói ú ớ, còn người xem 100 giờ có output thì nói được.',
    antiPattern: 'Tiêu thụ nội dung tiếng Anh cả ngày mà không sản xuất câu nào — cảm giác bận rộn, không có kết quả.',
  },
  {
    id: 'p-one-target',
    title: 'Một mục tiêu hẹp mỗi buổi',
    skill: 'mindset',
    band: 'Mọi trình độ',
    secret:
      'Luyện tập không mục tiêu chỉ là lặp lại điểm yếu. Trước mỗi buổi, viết đúng một câu: "Hôm nay tôi sửa …".',
    moves: [
      'Viết mục tiêu lên giấy TRƯỚC khi mở tài liệu.',
      'Mục tiêu phải hẹp đến mức đo được: "bật rõ âm /s/ cuối", không phải "phát âm tốt hơn".',
      'Sau buổi: tự chấm 1–5 và ghi 1 điều sẽ làm khác lần sau.',
      'Đổi mục tiêu mỗi 2 tuần, luôn lấy từ Sổ Lỗi.',
    ],
    proof: 'Ericsson: khác biệt giữa chuyên gia và người nghiệp dư nằm ở chất lượng giờ luyện, không phải số giờ.',
    antiPattern: '"Hôm nay luyện speaking" — quá rộng, không đo được, không cải thiện gì cụ thể.',
  },
  {
    id: 'p-45s',
    title: 'Bí kíp 45 giây: chép chính tả ít mà sâu',
    skill: 'listening',
    band: 'Band 4.0–6.5',
    secret:
      '45 giây làm thật kỹ có giá trị hơn 10 phút làm ẩu. Mục tiêu không phải chép xong — là tìm ra CHÍNH XÁC vì sao bạn nghe hụt.',
    moves: [
      'Chọn đúng 45 giây, không hơn.',
      'Chép, đối chiếu, tô đỏ mọi chỗ sai.',
      'Phân loại từng lỗi: không biết từ / biết mà không nhận ra âm / nối–nuốt âm.',
      'Lỗi loại 2 và 3 chuyển thẳng sang buổi shadowing ngày mai.',
    ],
    proof: 'Sau 60 buổi, độ chính xác nghe của người Việt thường tăng từ ~60% lên trên 90%.',
    antiPattern: 'Chép cả bài 10 phút, sai 200 chỗ, nản, bỏ luôn phương pháp.',
  },
  {
    id: 'p-chunk',
    title: 'Không bao giờ học từ lẻ',
    skill: 'vocabulary',
    band: 'Band 5.0–8.0',
    secret:
      'Đơn vị của ngôn ngữ không phải "từ" mà là "cụm". Học "research" là vô dụng; học "conduct research into" là dùng được ngay.',
    moves: [
      'Mỗi từ mới phải nhặt kèm 2–3 collocation từ ozdic.com.',
      'Thẻ Anki luôn chứa CỤM trong câu, không bao giờ chứa từ trần.',
      'Kiểm tra độ tự nhiên bằng YouGlish: dưới 20 kết quả thì bỏ.',
      'Mỗi chủ đề xây 15 khung câu, không phải 50 từ rời rạc.',
    ],
    proof: 'Người bản ngữ nói bằng khối đúc sẵn chiếm 50–80% lời nói tự nhiên.',
    antiPattern: 'Học "plethora, ubiquitous, myriad" rồi ghép sai cụm → mất điểm Lexical Resource thay vì được thêm.',
  },
  {
    id: 'p-error-close',
    title: 'Đóng lỗi: biến Sổ Lỗi thành máy tăng điểm',
    skill: 'grammar',
    band: 'Band 6.0–8.0',
    secret:
      'Từ 6.5 lên 7.5 không phải học thêm — là BỎ BỚT LỖI. Mỗi 2 tuần diệt gọn đúng 1 lỗi có giá trị hơn học 200 từ mới.',
    moves: [
      'Xếp hạng lỗi theo mức độ "tốn kém": lỗi nào làm mất nhiều điểm nhất.',
      'Mỗi 2 tuần chọn ĐÚNG MỘT lỗi làm mục tiêu.',
      'Trong 14 ngày đó, mọi bài viết/bài nói đều rà riêng lỗi ấy.',
      'Ba bài liên tiếp không tái phạm → đánh dấu ĐÓNG và ăn mừng.',
    ],
    proof: 'Ở Band 6.5, thường chỉ 8–12 lỗi lặp lại giữ bạn lại. Diệt hết là lên 7.5.',
    antiPattern: 'Đi tìm "bí kíp Band 8 mới" trong khi vẫn sai mạo từ ở mỗi câu thứ ba.',
  },
  {
    id: 'p-self-grade',
    title: 'Trở thành giám khảo của chính mình',
    skill: 'writing',
    band: 'Band 6.0–8.0',
    secret:
      'Ngày bạn tự chấm bài mình sai lệch dưới 0,5 band so với giáo viên là ngày bạn không còn cần giáo viên cho mỗi bài.',
    moves: [
      'In Band Descriptors, dán lên tường.',
      'Tự chấm 4 tiêu chí TRƯỚC khi nộp, ghi rõ lý do bằng ngôn ngữ tiêu chí.',
      'So sánh với điểm giáo viên, ghi độ lệch vào bảng.',
      'Lặp 10 lần — độ lệch sẽ hội tụ về dưới 0,5.',
    ],
    proof: 'Người tự chấm chính xác có thể viết 5 bài/tuần thay vì 1 bài, vì không bị nghẽn ở khâu chờ chấm.',
    antiPattern: 'Nộp bài rồi chỉ nhìn con số điểm, không đọc nhận xét — không có chuyển hoá nào xảy ra.',
  },
  {
    id: 'p-franklin',
    title: 'Phương pháp Franklin: học từ khoảng cách',
    skill: 'writing',
    band: 'Band 6.5–8.0',
    secret:
      'Đọc bài mẫu để thán phục thì vô ích. Hãy TÁI TẠO nó rồi đo khoảng cách — chính khoảng cách đó là bài học.',
    moves: [
      'Đọc bài Band 9, ghi dàn ý 8 gạch đầu dòng.',
      'CẤT bài mẫu 24 giờ — bước này bắt buộc, không được bỏ.',
      'Từ dàn ý, tự viết lại trong 40 phút.',
      'So sánh câu-với-câu: họ chọn từ gì, nối ý ra sao, bạn thua ở đâu.',
    ],
    proof: 'Benjamin Franklin tự học viết bằng đúng phương pháp này và trở thành một trong những cây bút ảnh hưởng nhất thời đại ông.',
    antiPattern: 'Học thuộc bài mẫu để chép vào phòng thi — giám khảo nhận ra ngay và trừ nặng Task Response.',
  },
  {
    id: 'p-overview',
    title: 'Overview: câu đắt giá nhất của Task 1',
    skill: 'writing',
    band: 'Band 6.0–8.0',
    secret:
      'Thiếu overview thì trần điểm Task Achievement là Band 5, dù phần còn lại viết hay đến đâu.',
    moves: [
      'Luôn viết overview NGAY sau mở bài, không để xuống cuối.',
      'Overview nêu 2–3 XU HƯỚNG lớn nhất, tuyệt đối không có con số cụ thể.',
      'Bắt đầu bằng "Overall, it is clear that…" — rõ ràng hơn là hoa mỹ.',
      'Kiểm tra: che phần thân bài đi, người đọc vẫn nắm được bức tranh chung.',
    ],
    proof: 'Đây là lỗi đơn lẻ khiến nhiều thí sinh mất nhiều điểm Task 1 nhất.',
    antiPattern: 'Liệt kê mọi con số trên biểu đồ mà không hề nêu xu hướng tổng thể.',
  },
  {
    id: 'p-peel',
    title: 'PEEL: khung cứu mọi câu trả lời Part 3',
    skill: 'speaking',
    band: 'Band 6.0–8.0',
    secret:
      'Band 6 trả lời 15 giây rồi im. Band 8 trả lời 45–60 giây với cấu trúc rõ. Khác biệt nằm ở một cái khung.',
    moves: [
      'Point: nêu lập trường trong 1 câu.',
      'Explain: giải thích tại sao, 2 câu.',
      'Example: một ví dụ CỤ THỂ, không chung chung.',
      'Link: nối lại về câu hỏi ban đầu.',
    ],
    proof: 'Khung này biến câu trả lời 15 giây thành 50 giây có chiều sâu mà không cần thêm từ vựng.',
    antiPattern: 'Nói dài bằng cách lặp lại ý cũ với từ khác — giám khảo tính là thiếu phát triển ý.',
  },
  {
    id: 'p-concede',
    title: 'Nhượng bộ rồi phản biện: dấu hiệu của Band 8',
    skill: 'speaking',
    band: 'Band 7.0–8.0',
    secret:
      'Người Band 8 không bảo vệ lập trường một cách mù quáng. Họ thừa nhận phía kia trước, rồi mới bác lại — đó là dấu hiệu của tư duy trưởng thành.',
    moves: [
      '"While it\'s true that…, I\'d argue that…"',
      '"There\'s certainly some merit to that, but…"',
      '"I can see why people say that, though in practice…"',
      'Luôn thừa nhận điểm mạnh THẬT của phía kia, không phải rơm giả.',
    ],
    proof: 'Tiêu chí Fluency & Coherence ở Band 8 đòi hỏi phát triển ý mạch lạc — nhượng bộ là cách nhanh nhất thể hiện điều đó.',
    antiPattern: '"I totally disagree because it is bad" — lập trường cứng nhắc, không có chiều sâu.',
  },
  {
    id: 'p-three-speed',
    title: 'Ba tốc độ đọc',
    skill: 'reading',
    band: 'Band 6.0–8.5',
    secret:
      'Không ai kịp đọc kỹ 2.700 từ trong 60 phút. Người đạt 8.5 không đọc nhanh hơn — họ đọc BA TỐC ĐỘ khác nhau.',
    moves: [
      'Tốc độ 1 (2 phút): lướt câu đầu mỗi đoạn, dựng bản đồ bài.',
      'Tốc độ 2: quét tìm từ khoá của câu hỏi, định vị đoạn.',
      'Tốc độ 3: chỉ đọc kỹ 2–3 câu quanh vị trí đã định vị.',
      'Thứ tự làm: dạng có thứ tự trước, matching heading để sau cùng.',
    ],
    proof: 'Chiến thuật này thường giúp thí sinh tăng từ 28/40 lên 35/40 mà không cần thêm vốn từ.',
    antiPattern: 'Đọc kỹ từ đầu đến cuối passage 1 rồi hết giờ khi mới sang passage 3.',
  },
  {
    id: 'p-predict',
    title: 'Dự đoán trước khi băng chạy',
    skill: 'listening',
    band: 'Band 6.0–8.5',
    secret:
      'Trận đấu Listening thắng thua ở 30 giây TRƯỚC khi băng chạy, không phải trong lúc nghe.',
    moves: [
      'Đọc câu hỏi, đoán LOẠI đáp án: số, tên riêng, danh từ, hay động từ.',
      'Gạch chân từ khoá và nghĩ sẵn 2 cách paraphrase khả dĩ.',
      'Đoán trước bối cảnh: ai đang nói với ai, ở đâu.',
      'Trong lúc nghe, bám dấu hiệu chuyển ý: however, actually, on second thought.',
    ],
    proof: 'Đề IELTS gần như không bao giờ dùng lại nguyên văn từ khoá — luôn paraphrase. Ai đoán trước sẽ bắt được.',
    antiPattern: 'Ngồi chờ băng chạy rồi mới đọc câu hỏi — luôn chậm một nhịp và mất câu.',
  },
  {
    id: 'p-tfng',
    title: 'Phân biệt False và Not Given',
    skill: 'reading',
    band: 'Band 6.0–8.0',
    secret:
      'FALSE = bài viết nói NGƯỢC LẠI. NOT GIVEN = bài viết KHÔNG NHẮC TỚI. Đừng bao giờ dùng kiến thức đời thực để suy luận.',
    moves: [
      'Tìm chính xác đoạn văn chứa thông tin, không đoán mò.',
      'Không thấy thông tin ở đâu cả → NOT GIVEN, dù bạn "biết" nó đúng ngoài đời.',
      'Thấy thông tin trái ngược → FALSE.',
      'Cảnh giác từ chỉ mức độ: all/some, always/often, must/may — thường là chỗ đánh bẫy.',
    ],
    proof: 'Đây là dạng câu mất điểm nhiều nhất trong Reading và gần như luôn vì cùng một lý do.',
    antiPattern: 'Chọn FALSE vì "theo mình biết thì không phải vậy" — bài thi chỉ chấm theo văn bản.',
  },
  {
    id: 'p-time-lock',
    title: 'Khoá giờ tuyệt đối: 20 + 40',
    skill: 'writing',
    band: 'Band 6.0–8.0',
    secret:
      'Task 2 chiếm 2/3 điểm Writing. Lấn giờ sang Task 2 để làm đẹp Task 1 là đánh đổi lỗ nặng.',
    moves: [
      'Đặt đồng hồ đếm ngược. Phút thứ 20 là dừng Task 1, dù đang viết dở.',
      'Luyện đúng khung giờ này từ tháng 22, không phải chờ tới sát ngày thi.',
      'Task 2: 5 phút lập dàn ý, 27 phút viết, 5 phút rà lỗi, 3 phút dự phòng.',
      'Không viết được kết bài → viết 1 câu chốt còn hơn bỏ trống.',
    ],
    proof: 'Bỏ dở Task 2 làm mất nhiều điểm hơn bất kỳ lỗi ngôn ngữ nào.',
    antiPattern: 'Dành 30 phút cho Task 1 vì "đang viết hay", rồi Task 2 chỉ còn 180 từ.',
  },
  {
    id: 'p-example-bank',
    title: 'Ngân hàng 12 ví dụ đa dụng',
    skill: 'writing',
    band: 'Band 6.5–8.0',
    secret:
      'Bạn không cần ví dụ cho 200 chủ đề. Bạn cần 12 ví dụ đủ linh hoạt để xoay dùng cho 80% đề thi.',
    moves: [
      'Chọn 12 ví dụ có sức nặng: Singapore, Phần Lan, cách mạng công nghiệp, đại dịch, mạng xã hội…',
      'Mỗi ví dụ chuẩn bị 3 góc khai thác khác nhau.',
      'Luyện xoay: cùng một ví dụ dùng cho Giáo dục, Kinh tế và Công nghệ.',
      'Ví dụ phải CỤ THỂ — có tên, có số, có mốc thời gian.',
    ],
    proof: 'Ví dụ cụ thể là thứ tách Band 7 khỏi Band 8 ở tiêu chí Task Response.',
    antiPattern: '"For example, many people in society today…" — đây không phải ví dụ, đây là câu rỗng.',
  },
  {
    id: 'p-taper',
    title: 'Giảm tải trước ngày thi',
    skill: 'mindset',
    band: 'Band 7.0–8.0',
    secret:
      'Vận động viên đỉnh cao giảm 40% khối lượng trong 2 tuần cuối. Não bộ cũng vậy — nhồi sát ngày thi làm mất 0,5–1,0 band.',
    moves: [
      '2 tuần cuối: giảm 40% khối lượng, GIỮ NGUYÊN tần suất.',
      'Không thẻ Anki mới, chỉ ôn thẻ cũ.',
      'Không đề mới trong 3 ngày cuối — chỉ đọc lại Sổ Lỗi và bộ 40 cụm mạnh.',
      'Ngủ ≥ 7 giờ mỗi đêm trong toàn bộ tuần thi. Đây là điều kiện bắt buộc.',
    ],
    proof: 'Trí nhớ được củng cố trong giấc ngủ. Học thâu đêm phá đúng cơ chế bạn đang cần nhất.',
    antiPattern: 'Cày 6 tiếng/ngày trong tuần cuối rồi vào phòng thi với đầu óc kiệt quệ.',
  },
  {
    id: 'p-panic',
    title: 'Quy trình 90 giây khi bí giữa phòng thi',
    skill: 'writing',
    band: 'Band 6.5–8.0',
    secret:
      'Hoảng loạn không phải vì thiếu năng lực — vì thiếu quy trình. Hãy có sẵn một quy trình đã diễn tập.',
    moves: [
      '0–20 giây: thở ra dài 4 nhịp. Nhịp tim xuống thì tư duy quay lại.',
      '20–50 giây: viết ra 3 từ khoá bất kỳ liên quan đề, bằng bất kỳ ngôn ngữ nào.',
      '50–80 giây: chọn 1 từ khoá, hỏi "Ai được lợi? Ai chịu thiệt?" — luôn ra ý.',
      '80–90 giây: viết câu chủ đề và bắt đầu. Bản nháp xấu vẫn hơn trang trắng.',
    ],
    proof: 'Diễn tập quy trình này 5 lần trong lúc thi thử là đủ để nó tự chạy vào ngày thi thật.',
    antiPattern: 'Ngồi nhìn đề 10 phút chờ cảm hứng — mất 10 phút và mất luôn bình tĩnh.',
  },
  {
    id: 'p-narrow-10',
    title: 'Nạp hẹp 10 ngày: biến chủ đề lạ thành sân nhà',
    skill: 'vocabulary',
    band: 'Band 5.5–7.5',
    secret:
      'Ở lì trong một chủ đề 10 ngày, từ vựng tự ghim mà không cần học thuộc — vì bạn gặp nó lặp lại hàng chục lần trong ngữ cảnh khác nhau.',
    moves: [
      'Ngày 1–3: đọc/nghe 6–8 nguồn khác nhau về đúng chủ đề đó.',
      'Ngày 4–7: săn collocation và xây 15 khung câu cho chủ đề.',
      'Ngày 8–9: viết 1 bài Task 2 và nói 1 bài Part 3, có chuẩn bị.',
      'Ngày 10: làm lại cả hai, KHÔNG chuẩn bị. So sánh với bài ngày 8.',
    ],
    proof: 'Sau 12 chu kỳ như vậy (khoảng 4 tháng), bạn không còn chủ đề nào là "chủ đề lạ".',
    antiPattern: 'Mỗi ngày một chủ đề mới cho "đỡ chán" — không chủ đề nào đủ sâu để nói 2 phút.',
  },
  {
    id: 'p-70-30',
    title: 'Luật 70/30 trong buổi học với gia sư',
    skill: 'speaking',
    band: 'Band 5.0–8.0',
    secret:
      'Bạn trả tiền để NÓI, không phải để nghe. Nếu gia sư nói nhiều hơn bạn, bạn đang trả tiền cho một podcast đắt đỏ.',
    moves: [
      'Gửi trước yêu cầu cụ thể: "Hôm nay sửa giúp tôi mạo từ".',
      'Yêu cầu gia sư ghi lỗi vào chat, KHÔNG ngắt lời giữa chừng.',
      'Bạn phải nói ≥ 70% thời lượng. Không đạt thì đổi gia sư.',
      '5 phút cuối: yêu cầu tổng kết 3 lỗi lớn nhất và 3 cụm nên dùng.',
    ],
    proof: 'Người có yêu cầu cụ thể tiến bộ nhanh hơn hẳn người "học gì cũng được".',
    antiPattern: 'Buổi học thành 45 phút nghe gia sư kể chuyện đời — dễ chịu và vô ích.',
  },
  {
    id: 'p-ai-human',
    title: 'AI chấm hằng ngày, người chấm hằng tuần',
    skill: 'writing',
    band: 'Band 6.0–8.0',
    secret:
      'AI cho bạn phản hồi tức thì để viết mỗi ngày. Nhưng AI chấm rộng tay và bỏ sót lỗi mạch ý — mỗi tuần vẫn phải có một người thật.',
    moves: [
      'Dùng Lexibot / Write & Improve cho vòng sửa hằng ngày.',
      'Mỗi tuần 1 bài do giáo viên thật chấm — đây là mỏ neo hiệu chỉnh.',
      'So sánh điểm AI và điểm người: nếu lệch > 1 band, tin người.',
      'Mọi lỗi từ cả hai nguồn đều phải vào Sổ Lỗi.',
    ],
    proof: 'AI hiện chấm khá tốt ngữ pháp và từ vựng, nhưng yếu ở Task Response và mạch lập luận — đúng hai tiêu chí quyết định Band 8.',
    antiPattern: 'Chỉ dùng AI suốt 6 tháng, thấy toàn 7.5, rồi thi thật được 6.5.',
  },
  {
    id: 'p-identity',
    title: 'Bản sắc trước hành vi',
    skill: 'mindset',
    band: 'Mọi trình độ',
    secret:
      'Đừng đặt mục tiêu "đạt 8.0". Hãy đặt bản sắc "tôi là người học tiếng Anh mỗi ngày". Mục tiêu có ngày kết thúc, bản sắc thì không.',
    moves: [
      'Viết ra: "Tôi là người học tiếng Anh mỗi ngày" và dán lên gương.',
      'Mỗi buổi học hoàn thành là một lá phiếu cho bản sắc đó.',
      'Khi lỡ một ngày, tự nhủ "tôi là người học mỗi ngày và tôi đang quay lại", không phải "tôi thất bại".',
      'Ăn mừng chuỗi ngày, không ăn mừng điểm số.',
    ],
    proof: 'Thay đổi dựa trên bản sắc bền hơn nhiều so với dựa trên mục tiêu, vì nó không sụp đổ khi kết quả tới chậm.',
    antiPattern: 'Đặt mục tiêu 8.0 rồi mỗi lần thi thử dưới kỳ vọng lại tự nghi ngờ toàn bộ hành trình.',
  },
  {
    id: 'p-plateau',
    title: 'Cách vượt cao nguyên năng lực',
    skill: 'mindset',
    band: 'Band 5.5–7.0',
    secret:
      'Cao nguyên không phải dấu hiệu bạn hết khả năng — là dấu hiệu não đang hợp nhất. Nó luôn đến ở tháng 14 và tháng 26.',
    moves: [
      'Nhận ra sớm: khi thấy "học mãi không lên", hãy đối chiếu với dữ liệu chứ không với cảm giác.',
      'Nghe lại bản ghi âm của chính bạn 6 tháng trước — bằng chứng tiến bộ luôn ở đó.',
      'Đổi cách luyện, không đổi mục tiêu: sang interleaving, sang chủ đề mới, sang giọng khác.',
      'Giảm tải 1 tuần thay vì bỏ hẳn. Cao nguyên luôn kết thúc nếu bạn còn ở lại.',
    ],
    proof: 'Đây là lý do #1 khiến người học bỏ cuộc ở tháng 14 — họ không biết đó là hiện tượng bình thường và có tên gọi.',
    antiPattern: 'Đổi hoàn toàn phương pháp mỗi khi chững lại → không phương pháp nào chạy đủ lâu để cho kết quả.',
  },
];

export const PLAYBOOK_BY_ID = Object.fromEntries(PLAYBOOKS.map((p) => [p.id, p]));
