/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {MindsetModule} from '../types';

/* ==========================================================================
   LẬP TRÌNH TƯ DUY — 10 mô-đun gỡ và cài lại "phần mềm" bên trong
   Đây là phần quyết định bạn có đi hết 1.095 ngày hay không.
   Kỹ thuật học thì tìm đâu cũng có. Hệ điều hành tinh thần thì hiếm.
   ========================================================================== */

export const MINDSET_MODULES: MindsetModule[] = [
  {
    id: 'm-identity',
    name: 'BẢN SẮC — Trở thành, không phải đạt được',
    principle:
      'Hành vi bền vững chảy ra từ bản sắc, không từ mục tiêu. Mục tiêu có ngày kết thúc; bản sắc thì không.',
    science:
      'James Clear (Atomic Habits): thay đổi dựa trên bản sắc bền hơn thay đổi dựa trên kết quả, vì mỗi hành động nhỏ trở thành "một lá phiếu" cho con người bạn đang trở thành — thay vì một bước tiến tới một cột mốc xa xôi.',
    oldStory: '"Tôi đang cố đạt IELTS 8.0." — Khi thi xong, động lực biến mất. Khi thi thử thấp, cả bản thân bị nghi ngờ.',
    newStory:
      '"Tôi là người học tiếng Anh mỗi ngày." — Một ngày lỡ chỉ là một ngày lỡ, không phải bằng chứng rằng bạn không đủ khả năng.',
    ritual: [
      'Viết câu bản sắc lên giấy, dán lên gương phòng tắm.',
      'Mỗi sáng, đọc to trước khi chạm điện thoại.',
      'Sau mỗi buổi học: thầm ghi nhận "một lá phiếu nữa".',
      'Khi lỡ ngày: nói "tôi là người học mỗi ngày và tôi đang quay lại", không nói "tôi thất bại".',
    ],
    affirmation: 'Tôi không cố gắng giỏi tiếng Anh. Tôi là người sống cùng tiếng Anh mỗi ngày.',
  },
  {
    id: 'm-growth',
    name: 'PHÁT TRIỂN — Sức mạnh của chữ "CHƯA"',
    principle: 'Năng lực không phải thứ cố định bạn có hay không có. Nó là thứ được xây bằng luyện tập đúng cách.',
    science:
      'Carol Dweck: người tin năng lực có thể phát triển kiên trì hơn khi gặp thất bại, tìm kiếm phản hồi thay vì né tránh, và cải thiện nhanh hơn về lâu dài.',
    oldStory: '"Tôi không có năng khiếu ngoại ngữ. Học 7 năm không nói được là bằng chứng."',
    newStory:
      '"Tôi CHƯA nói trôi chảy — vì 7 năm đó tôi học ngữ pháp để thi, chưa từng nạp đủ input và chưa từng có ai sửa lỗi cho tôi."',
    ritual: [
      'Thêm chữ "CHƯA" vào mọi câu tự phán xét, không bỏ sót câu nào.',
      'Khen quá trình, không khen kết quả: "tôi giữ được chuỗi 40 ngày".',
      'Coi mỗi lỗi sai là dữ liệu — ghi vào Sổ Lỗi thay vì tự trách.',
      'Mỗi tháng viết 3 điều bạn làm được hôm nay mà 3 tháng trước không làm được.',
    ],
    affirmation: 'Tôi chưa làm được. Đó là một mốc thời gian, không phải một bản án.',
  },
  {
    id: 'm-consistency',
    name: 'CHUỖI NGÀY — Đều đặn thắng cường độ',
    principle: 'Người thắng không phải người học nhiều nhất trong một ngày, mà là người không bỏ ngày nào trong 1.095 ngày.',
    science:
      'Hiệu ứng giãn cách: cùng một tổng số giờ, chia nhỏ và trải đều cho kết quả ghi nhớ cao hơn nhiều so với dồn cục. Não cần các chu kỳ ngủ xen giữa để hợp nhất trí nhớ.',
    oldStory: '"Cuối tuần rảnh, tôi sẽ học bù 6 tiếng." — Học 6 tiếng thứ Bảy rồi im lặng 6 ngày.',
    newStory:
      '"45 phút mỗi ngày trong 7 ngày mạnh hơn 6 tiếng một ngày." — Não coi tiếng Anh là môi trường sống, không phải một sự kiện.',
    ritual: [
      'Lịch tô đen treo ở nơi nhìn thấy hằng ngày.',
      'Luật bất di bất dịch: không bao giờ bỏ 2 ngày liên tiếp.',
      'Có sẵn phiên bản 2 phút cho ngày bận nhất, viết ra từ trước.',
      'Ăn mừng chuỗi ngày, không ăn mừng điểm số.',
    ],
    affirmation: 'Một ngày lỡ là tai nạn. Hai ngày lỡ là khởi đầu của việc bỏ cuộc.',
  },
  {
    id: 'm-fear',
    name: 'NỖI SỢ NÓI SAI — Gỡ bỏ rào cản lớn nhất',
    principle: 'Bạn không sợ tiếng Anh. Bạn sợ bị đánh giá. Và cái giá của nỗi sợ đó là hàng nghìn giờ không được luyện.',
    science:
      'Krashen (bộ lọc cảm xúc): lo lắng cao làm dựng lên một "bộ lọc" cản trở đầu vào được tiếp thu. Người sợ nói sai vừa nói ít hơn, vừa học được ít hơn từ chính lượng input họ nhận.',
    oldStory: '"Đợi giỏi hơn tôi sẽ nói." — Nhưng không nói thì không bao giờ giỏi hơn. Đây là vòng lặp khép kín.',
    newStory:
      '"Mỗi lỗi tôi nói ra là một lỗi được phát hiện và sửa. Lỗi giấu trong đầu thì không ai sửa được."',
    ritual: [
      'Đặt chỉ tiêu SAI: tuần này phải nói sai ít nhất 20 lần có chủ đích.',
      'Buổi nói đầu tiên đặt lịch trong TUẦN NÀY, không phải "khi sẵn sàng".',
      'Nói với gia sư ngay từ đầu: "Tôi muốn bị sửa nhiều, đừng khen xã giao."',
      'Sau mỗi lỗi bị sửa: ghi vào sổ và tự nhủ "được thêm một cái".',
    ],
    affirmation: 'Người duy nhất không bao giờ nói sai tiếng Anh là người không bao giờ nói.',
  },
  {
    id: 'm-perfection',
    name: 'HOÀN HẢO — Kẻ thù của người học ngôn ngữ',
    principle: 'Chủ nghĩa hoàn hảo không phải tiêu chuẩn cao. Nó là nỗi sợ đội lốt tiêu chuẩn cao.',
    science:
      'Nghiên cứu về hiệu suất viết: người viết theo số lượng, chấp nhận bản nháp xấu, cuối cùng tạo ra tác phẩm chất lượng cao hơn nhóm chờ ý tưởng hoàn hảo — vì họ có nhiều vòng lặp cải tiến hơn.',
    oldStory: '"Bài này chưa đủ tốt để nộp cho ai chấm." — Kết quả: 6 tháng không có ai sửa bài nào.',
    newStory: '"Bản nháp xấu được chấm có giá trị gấp mười lần bài hoàn hảo trong đầu."',
    ritual: [
      'Viết tự do: cấm sửa trong lúc viết. Chỉ sửa SAU khi hết giờ.',
      'Nộp bài ngay khi hết 40 phút, dù thấy chưa ưng.',
      'Đặt chỉ tiêu số lượng: 3 bài/tuần, không đặt chỉ tiêu "bài hay".',
      'Chấp nhận: bài đầu tiên mỗi tuần sẽ là bài tệ nhất tuần. Đó là thiết kế, không phải lỗi.',
    ],
    affirmation: 'Xong tốt hơn hoàn hảo. Được chấm tốt hơn được cất trong ngăn kéo.',
  },
  {
    id: 'm-plateau',
    name: 'CAO NGUYÊN — Khi tiến bộ trở nên vô hình',
    principle: 'Cao nguyên không phải dấu hiệu bạn đã hết khả năng. Là dấu hiệu não đang hợp nhất những gì vừa học.',
    science:
      'Đường cong học tập có dạng bậc thang, không phải đường thẳng. Giai đoạn "phẳng" là lúc kiến thức được tự động hoá — bạn không giỏi thêm về lượng, nhưng nhanh và chắc hơn về chất.',
    oldStory: '"Ba tháng nay tôi không tiến bộ gì. Chắc phương pháp này sai." — Rồi đổi phương pháp, rồi lại chững, rồi lại đổi.',
    newStory:
      '"Cao nguyên luôn đến ở tháng 14 và tháng 26. Nó có tên gọi, có nguyên nhân, và nó sẽ kết thúc nếu tôi còn ở lại."',
    ritual: [
      'Đối chiếu với DỮ LIỆU, không với cảm giác: mở bảng 5 con số ra xem.',
      'Nghe lại bản ghi âm của chính bạn 6 tháng trước — bằng chứng luôn ở đó.',
      'Đổi CÁCH luyện, đừng đổi mục tiêu: sang interleaving, sang chủ đề mới, sang giọng khác.',
      'Giảm tải một tuần thay vì bỏ hẳn.',
    ],
    affirmation: 'Cao nguyên là nơi người nghiệp dư bỏ cuộc và người nghiêm túc bứt lên.',
  },
  {
    id: 'm-comparison',
    name: 'SO SÁNH — Kẻ trộm niềm vui',
    principle: 'Bạn đang so sánh hậu trường của mình với sân khấu của người khác. Đó là một phép so sánh vô nghĩa.',
    science:
      'Thuyết so sánh xã hội (Festinger): so sánh hướng lên với người vượt xa mình làm giảm động lực; so sánh với chính mình trong quá khứ làm tăng động lực và độ bền.',
    oldStory: '"Người kia học 1 năm đã 7.5. Tôi học 18 tháng mới 6.0. Chắc tôi không hợp."',
    newStory:
      '"Người đó có thể đã học 5 năm trước đó, hoặc đang học toàn thời gian, hoặc chỉ khoe con số đẹp nhất. Đối thủ duy nhất của tôi là tôi của 3 tháng trước."',
    ritual: [
      'Bỏ theo dõi mọi tài khoản khoe điểm số.',
      'Mỗi tháng: nghe lại bản ghi âm cũ, đọc lại bài viết cũ của chính bạn.',
      'Ghi 3 điều bạn làm được hôm nay mà 3 tháng trước không làm được.',
      'Trong Club: chia sẻ tiến bộ của mình, không hỏi điểm của người khác.',
    ],
    affirmation: 'Tôi chỉ chạy đua với chính tôi của ngày hôm qua.',
  },
  {
    id: 'm-ambiguity',
    name: 'MƠ HỒ — Học cách thoải mái khi chưa hiểu hết',
    principle: 'Muốn hiểu 100% mọi từ là bản năng đúng của người học trường lớp, nhưng là bản năng sai của người tiếp thu ngôn ngữ.',
    science:
      'Krashen: tiếp thu xảy ra khi ta hiểu được thông điệp CHUNG, không đòi hỏi hiểu từng từ. Việc dừng lại tra mọi từ phá vỡ dòng chảy và giết chết đúng cơ chế đang giúp bạn học.',
    oldStory: '"Câu này có 2 từ tôi không biết, phải tra ngay không thì mất gốc." — Đọc 1 trang mất 40 phút, bỏ sách sau 3 ngày.',
    newStory: '"Tôi hiểu 92% và đó là chính xác vùng tôi cần ở. 8% còn lại sẽ tự sáng ra sau vài chục lần gặp lại."',
    ritual: [
      'Đọc mở rộng: TUYỆT ĐỐI không tra từ trong lúc đọc.',
      'Chỉ đánh dấu (không tra) từ xuất hiện lặp lại nhiều lần.',
      'Cuối chương mới tra tối đa 5 từ đã đánh dấu.',
      'Khi nghe: gặp chỗ không hiểu thì bỏ qua, đi tiếp, không tua lại.',
    ],
    affirmation: 'Hiểu 92% và đọc tiếp mạnh hơn hiểu 100% và bỏ cuộc.',
  },
  {
    id: 'm-energy',
    name: 'NĂNG LƯỢNG — Quản trị năng lượng, không phải thời gian',
    principle: 'Bạn không thiếu thời gian. Bạn thiếu năng lượng vào đúng những khung giờ bạn đã dành cho việc học.',
    science:
      'Ý chí và khả năng tập trung suy giảm trong ngày. Trí nhớ được củng cố trong giấc ngủ — thiếu ngủ làm hỏng đúng cơ chế biến việc học hôm nay thành trí nhớ ngày mai.',
    oldStory: '"Tối nào tôi cũng định học nhưng 21:00 là kiệt sức, thế là lướt điện thoại tới nửa đêm."',
    newStory:
      '"Việc khó nhất phải xảy ra lúc 6:00 sáng, khi năng lượng còn nguyên vẹn. Buổi tối chỉ dành cho việc nhẹ."',
    ritual: [
      'Xếp việc khó (shadowing, viết bài, thi thử) vào khung giờ đỉnh của bạn.',
      'Buổi tối chỉ dành cho việc nhẹ: đọc mở rộng, nhật ký, nghe thụ động.',
      'Ngủ 7 giờ là điều kiện bắt buộc, không phải điều xa xỉ.',
      'Dấu hiệu kiệt sức → giảm tải một tuần, không bỏ hẳn.',
    ],
    affirmation: 'Giấc ngủ của tôi là một phần của việc học, không phải phần bị cắt để học thêm.',
  },
  {
    id: 'm-why',
    name: 'LÝ DO — Nhiên liệu cho tháng thứ 20',
    principle: 'Ở tháng thứ 20, sự mới mẻ đã hết và đích đến vẫn còn xa. Chỉ một lý do đủ sâu mới kéo bạn qua đoạn đó.',
    science:
      'Thuyết tự quyết (Deci & Ryan): động lực nội tại — gắn với ý nghĩa và giá trị cá nhân — bền hơn nhiều so với động lực ngoại lai như điểm số hay áp lực từ gia đình.',
    oldStory: '"Tôi học vì cần IELTS để đi du học." — Lý do ngoại lai, sẽ cạn đúng vào lúc bạn cần nó nhất.',
    newStory:
      '"Tôi học vì muốn đọc được nguyên bản những cuốn sách thay đổi tôi, muốn trò chuyện với người ở nửa kia thế giới, muốn con tôi lớn lên thấy bố mẹ vẫn đang học."',
    ritual: [
      'Viết một trang trả lời: "Nếu ngày mai IELTS bị xoá sổ, tôi có còn học tiếng Anh không? Vì sao?"',
      'Dán 3 câu cốt lõi từ trang đó lên bàn học.',
      'Mỗi quý đọc lại và viết lại — lý do sẽ tiến hoá theo bạn.',
      'Tìm một ứng dụng THẬT ngay bây giờ: một cuốn sách, một cộng đồng, một dự án bằng tiếng Anh.',
    ],
    affirmation: 'IELTS là cánh cửa, không phải căn phòng. Tôi học tiếng Anh vì những gì ở phía sau cánh cửa đó.',
  },
];

export const MINDSET_BY_ID = Object.fromEntries(MINDSET_MODULES.map((m) => [m.id, m]));
