/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  WhyLayer,
  ExcellenceTier,
  IdentityTrait,
  StrategyBet,
  PlanTemplate,
  KeyAction,
  KpiSpec,
  ParetoMove,
  SuccessRule,
  Differentiator,
  Archetype,
} from '../types';

/* ==========================================================================
   LA BÀN — HIẾN CHƯƠNG CÁ NHÂN
   Tầng này trả lời "vì ai và vì sao". Tầng Lộ trình trả lời "làm gì".
   Thiếu La Bàn, Lộ trình chỉ là một thời khoá biểu — và thời khoá biểu nào
   cũng bị bỏ ở tháng thứ tư.
   ========================================================================== */

/* ---------------------------- 1. TẠI SAO -------------------------------- */

export const WHY_LAYERS: WhyLayer[] = [
  {
    level: 'Tầng 1 — Lý do bề mặt',
    question: 'Tôi cần IELTS 8.0 để làm gì?',
    draft:
      'Tôi cần 8.0 để mở một cánh cửa cụ thể: hồ sơ du học, một vị trí công việc, một chương trình học bổng, hoặc một tiêu chuẩn định cư.',
    test:
      'Kiểm tra: lý do này có ngày hết hạn. Khi cánh cửa đó mở ra hoặc đóng lại, động lực sẽ biến mất. Nó đủ để bắt đầu, không đủ để đi hết 1.095 ngày.',
    yours: true,
  },
  {
    level: 'Tầng 2 — Lý do sâu',
    question: 'Điều gì trong cuộc đời tôi sẽ khác đi khi tôi thật sự dùng được tiếng Anh?',
    draft:
      'Tôi không còn bị giới hạn ở phần thông tin đã được dịch sang tiếng Việt. Tôi đọc được nguyên bản những gì mình quan tâm, ngay khi nó xuất hiện, chứ không đợi hai năm sau. Tôi ngồi được vào những cuộc trò chuyện mà trước đây tôi chỉ đứng ngoài nghe. Tôi thôi cảm thấy nhỏ lại mỗi khi có người nước ngoài bắt chuyện.',
    test:
      'Kiểm tra: lý do này không hết hạn sau kỳ thi. Nếu bạn viết được ba câu cụ thể ở tầng này, bạn đã có nhiên liệu cho tháng thứ 20.',
    yours: true,
  },
  {
    level: 'Tầng 3 — Lý do tối hậu',
    question:
      'Nếu ngày mai IELTS bị xoá sổ khỏi thế giới, tôi có còn học tiếng Anh không? Vì sao?',
    draft:
      'Có. Vì tiếng Anh với tôi không phải một chứng chỉ, mà là một cách sống rộng hơn: được tiếp cận trực tiếp với tri thức tốt nhất của nhân loại mà không qua trung gian, được kết nối với người ở nửa kia thế giới, và được là bằng chứng sống cho những người quanh tôi rằng một người trưởng thành vẫn có thể học lại từ đầu và thành công.',
    test:
      'Đây là câu hỏi quan trọng nhất trong toàn bộ hệ thống. Nếu câu trả lời là "Không", bạn cần biết trước điều này: bạn sẽ dừng lại ở tháng thứ tư. Hãy tìm cho được một lý do khiến câu trả lời là "Có" trước khi bắt đầu.',
    yours: true,
  },
];

export const WHY_ELICITATION = {
  title: 'Quy trình khai vấn — 25 phút, làm một lần, đọc lại mỗi quý',
  steps: [
    'Đặt giờ 5 phút. Viết tay, không gõ máy. Trả lời: "Tôi muốn giỏi tiếng Anh vì…" — viết liên tục, không dừng, không sửa.',
    'Đọc lại. Với mỗi lý do, hỏi tiếp "Để làm gì?" — hỏi 5 lần liên tiếp. Lý do thật luôn nằm ở lần hỏi thứ 4 hoặc thứ 5.',
    'Đặt giờ 5 phút. Viết: "Ngày 29/08/2029, tôi 3 năm sau. Một ngày của tôi trông như thế nào?" — mô tả bằng chi tiết cụ thể, không bằng tính từ.',
    'Đặt giờ 5 phút. Viết mặt tối: "Nếu 3 năm nữa tôi vẫn ở đúng trình độ hôm nay, tôi sẽ mất gì?" — cụ thể, không chung chung.',
    'Nén tất cả xuống 3 câu. Viết ra giấy A5, dán lên bàn học. Đây là trang bạn sẽ đọc lại vào tháng thứ 20 khi muốn bỏ cuộc.',
  ],
  warning:
    'Đừng bỏ bước 4. Nghiên cứu về đối chiếu tinh thần cho thấy chỉ hình dung thành công làm GIẢM nỗ lực. Phải hình dung thành công RỒI đối diện cái giá của thất bại thì hành động mới tăng.',
};

/* ------------------------ 2. KẾT QUẢ XUẤT SẮC --------------------------- */

export const EXCELLENCE_TIERS: ExcellenceTier[] = [
  {
    id: 'ex-score',
    tier: 'Bậc 1',
    name: 'Kết quả thi — thứ đo được bằng giấy',
    why: 'Đây là bậc thấp nhất nhưng cũng là bậc duy nhất có người khác công nhận. Cần thiết, nhưng không được nhầm nó với năng lực thật.',
    targets: [
      {label: 'IELTS Academic Overall', value: '8.0'},
      {label: 'Không kỹ năng nào dưới', value: '7.0'},
      {label: 'Listening', value: '8.5'},
      {label: 'Reading', value: '8.5'},
      {label: 'Writing', value: '7.0'},
      {label: 'Speaking', value: '7.5'},
    ],
  },
  {
    id: 'ex-ability',
    tier: 'Bậc 2',
    name: 'Năng lực thật — thứ còn lại sau khi chứng chỉ hết hạn',
    why: 'Chứng chỉ IELTS hết hiệu lực sau 2 năm. Năng lực thật thì không. Đây mới là thứ tôi thực sự đang xây.',
    targets: [
      {label: 'Đọc sách nguyên bản', value: 'Tra dưới 5 từ mỗi chương'},
      {label: 'Nghe podcast học thuật', value: 'Hiểu ≥ 90%, không phụ đề'},
      {label: 'Nói liên tục', value: '10 phút về chủ đề bất kỳ, không chuẩn bị'},
      {label: 'Viết', value: '1.000 từ mạch lạc trong 90 phút'},
      {label: 'Họp / phỏng vấn bằng tiếng Anh', value: 'Không cần bản dịch'},
      {label: 'Nghĩ bằng tiếng Anh', value: 'Không dịch trong đầu khi nói'},
    ],
  },
  {
    id: 'ex-asset',
    tier: 'Bậc 3',
    name: 'Tài sản tích luỹ — thứ tôi sở hữu sau 3 năm',
    why: 'Đây là phần không ai lấy đi được và cũng không ai mua được. Mỗi con số dưới đây là kết quả của hàng trăm giờ.',
    targets: [
      {label: 'Ngân hàng cụm từ tự nhặt', value: '10.000 cụm, có ngữ cảnh'},
      {label: 'Sổ Lỗi', value: '≥ 400 mục, ≥ 300 đã đóng'},
      {label: 'Bài viết đã được chấm', value: '≥ 150 bài'},
      {label: 'Giờ nói có phản hồi', value: '300 giờ'},
      {label: 'Sách đã đọc nguyên bản', value: '36 cuốn'},
      {label: 'Bản ghi âm lưu trữ', value: '156 bản — bằng chứng tiến bộ theo tuần'},
    ],
  },
  {
    id: 'ex-proof',
    tier: 'Bậc 4',
    name: 'Bằng chứng công khai — thứ người khác nhìn thấy',
    why: 'Năng lực không được thể hiện ra ngoài thì với thế giới, nó không tồn tại. Bậc này biến năng lực thành cơ hội.',
    targets: [
      {label: 'Thuyết trình bằng tiếng Anh', value: '≥ 6 lần trước người thật'},
      {label: 'Bài viết công khai', value: '≥ 24 bài blog / bình luận chuyên môn'},
      {label: 'Dẫn buổi Club', value: '≥ 50 buổi'},
      {label: 'Hồ sơ nghề nghiệp bằng tiếng Anh', value: 'CV + LinkedIn hoàn chỉnh'},
      {label: 'Video tự giới thiệu 3 phút', value: 'Quay lại mỗi 6 tháng, công khai'},
    ],
  },
  {
    id: 'ex-impact',
    tier: 'Bậc 5',
    name: 'Tác động — thứ khiến 3 năm này có ý nghĩa ngoài bản thân tôi',
    why: 'Đây là bậc mà hầu như không ai đặt ra, và cũng chính là bậc giữ người ta lại khi động lực cá nhân cạn kiệt.',
    targets: [
      {label: 'Người tôi kéo theo cùng học', value: '≥ 3 người đi hết năm 1'},
      {label: 'Club tôi sáng lập hoặc duy trì', value: '≥ 1 club sống quá 12 tháng'},
      {label: 'Bộ tài liệu tôi chia sẻ lại', value: 'Deck Anki + Sổ Lỗi công khai'},
      {label: 'Người tôi trở thành với gia đình', value: 'Bằng chứng sống rằng người lớn vẫn học được'},
    ],
  },
];

/* -------------------- 3. CON NGƯỜI TÔI MUỐN TRỞ THÀNH -------------------- */

export const IDENTITY_STATEMENT = {
  core: 'Tôi là người học tiếng Anh mỗi ngày.',
  expanded:
    'Tôi là người giữ lời hứa với chính mình khi không có ai nhìn. Tôi coi lỗi sai là dữ liệu chứ không phải bản án. Tôi chọn đều đặn thay vì bùng nổ, chọn bị sửa thay vì được khen, và chọn ở lại khi mọi thứ trở nên nhàm chán — vì tôi biết đó chính là lúc phần lớn người khác rời đi.',
  notAGoal:
    'Đây không phải mục tiêu. Mục tiêu có ngày kết thúc; đến ngày đó động lực sụp đổ. Đây là bản sắc — và bản sắc thì không có vạch đích. Mỗi buổi học hoàn thành là một lá phiếu bầu cho con người này.',
};

export const IDENTITY_TRAITS: IdentityTrait[] = [
  {
    id: 'id-consistent',
    trait: 'NGƯỜI ĐỀU ĐẶN — tôi xuất hiện kể cả ngày không muốn',
    notThis: 'Không phải người bùng nổ 8 tiếng cuối tuần rồi biến mất 6 ngày.',
    proof: 'Chuỗi ≥ 950/1.095 ngày. Không bao giờ bỏ 2 ngày liên tiếp.',
    underPressure:
      'Ngày kiệt sức nhất, tôi vẫn mở Anki ôn 5 thẻ. Không phải để tiến bộ — để giữ chuỗi và giữ con người mình.',
  },
  {
    id: 'id-coachable',
    trait: 'NGƯỜI DỄ SỬA — tôi đi tìm lời chê, không đi tìm lời khen',
    notThis: 'Không phải người chọn gia sư dễ tính để buổi học dễ chịu.',
    proof: 'Sổ Lỗi ≥ 400 mục. Mỗi buổi học 1-1 đều kết thúc bằng 3 lỗi cụ thể.',
    underPressure:
      'Khi bị chê bài viết, phản ứng đầu tiên của tôi là mở Sổ Lỗi ra ghi, không phải giải thích tại sao tôi viết như vậy.',
  },
  {
    id: 'id-brave',
    trait: 'NGƯỜI DÁM SAI — tôi nói trước khi sẵn sàng',
    notThis: 'Không phải người đợi "giỏi hơn chút nữa" rồi mới mở miệng.',
    proof: '300 giờ nói. Buổi 1-1 đầu tiên diễn ra ở tháng thứ 7, không phải tháng thứ 20.',
    underPressure:
      'Trong phòng đông người nói tiếng Anh, tôi là người mở lời trước, chấp nhận câu đầu tiên sẽ vụng.',
  },
  {
    id: 'id-data',
    trait: 'NGƯỜI DÙNG SỐ LIỆU — tôi tin bảng theo dõi hơn tin cảm giác',
    notThis: 'Không phải người học 2 năm bằng cảm giác "chắc là đang tiến bộ".',
    proof: '156 tuần đều có đủ 5 con số. 12 bài thi thử đúng điều kiện phòng thi.',
    underPressure:
      'Khi thấy "học mãi không lên", tôi mở bảng số liệu ra đối chiếu thay vì tin vào cảm giác của một ngày tồi tệ.',
  },
  {
    id: 'id-deep',
    trait: 'NGƯỜI ĐÀO SÂU — tôi ở lại một thứ đủ lâu để nó cho kết quả',
    notThis: 'Không phải người đổi phương pháp mỗi khi chững lại, hoặc sưu tầm khoá học mà không học xong cái nào.',
    proof: 'Một phương pháp chạy tối thiểu 8 tuần trước khi tôi đánh giá nó.',
    underPressure:
      'Gặp cao nguyên năng lực, tôi đổi CÁCH luyện chứ không đổi mục tiêu, và không đi tìm bí kíp mới.',
  },
  {
    id: 'id-owner',
    trait: 'NGƯỜI CHỊU TRÁCH NHIỆM — không ai nợ tôi kết quả này',
    notThis: 'Không phải người đổ lỗi cho trung tâm dở, giáo viên tệ, công việc bận, hay "không có môi trường".',
    proof: 'Không có lời than nào trong nhật ký học 36 tháng.',
    underPressure:
      'Thi thử thấp hơn kỳ vọng, câu đầu tiên tôi hỏi là "Tôi đã bỏ sót điều gì?", không phải "Đề này khó bất thường".',
  },
  {
    id: 'id-giver',
    trait: 'NGƯỜI KÉO THEO — tôi không đi một mình',
    notThis: 'Không phải người học lén một mình rồi xuất hiện với tấm bằng.',
    proof: '≥ 3 người cùng đi hết năm 1 với tôi. ≥ 50 buổi tôi làm người dẫn Club.',
    underPressure:
      'Khi bận nhất, tôi vẫn giữ buổi Club — vì có người đang chờ tôi xuất hiện, và đó chính là thứ giữ tôi lại.',
  },
];

/* ------------------------- 4. CHIẾN LƯỢC -------------------------------- */

export const STRATEGY_BETS: StrategyBet[] = [
  {
    id: 'sb-1',
    no: 1,
    bet: 'Dồn 22 tháng đầu xây NĂNG LỰC, chỉ 14 tháng cuối luyện THI.',
    instead: 'Thay vì luyện đề IELTS ngay từ tháng đầu như phần lớn người học.',
    rationale:
      'Luyện đề chỉ tối ưu cách thể hiện năng lực sẵn có; nó không tạo ra năng lực. Luyện đề khi vốn còn mỏng giống như đánh bóng một cái khung rỗng — điểm sẽ chạm trần ở 6.0 rồi đứng yên nhiều năm.',
    tradeoff:
      'Tôi chấp nhận 22 tháng không có con số nào để khoe, và chấp nhận cảm giác "hình như mình đang đi chậm" khi thấy người khác thi sớm.',
    provesWrongIf:
      'Nếu đến tháng 24 tôi thi thử mà không đạt 6.5, cược này sai và tôi phải xem lại toàn bộ chất lượng input, không phải tăng luyện đề.',
  },
  {
    id: 'sb-2',
    no: 2,
    bet: 'Đầu tư ÂM THANH trước NGỮ PHÁP trong 9 tháng đầu.',
    instead: 'Thay vì bắt đầu bằng 12 thì và công thức ngữ pháp như cách học phổ thông.',
    rationale:
      'Người Việt học 7 năm ngữ pháp mà vẫn không nghe được, vì điểm nghẽn không nằm ở luật ngữ pháp mà ở chỗ tai chưa nhận được âm nối, âm yếu, âm cuối. Shadowing và chép chính tả chữa đồng thời cả tai lẫn miệng bằng cùng một hành động — đây là đòn bẩy cao nhất trong toàn bộ 36 tháng.',
    tradeoff:
      'Tôi chấp nhận nói sai ngữ pháp trong năm đầu, và chấp nhận không giải thích được vì sao câu mình nói lại đúng.',
    provesWrongIf:
      'Nếu sau 6 tháng chép chính tả đều mà độ chính xác vẫn dưới 80%, tôi phải xem lại tài liệu có đúng vùng i+1 không.',
  },
  {
    id: 'sb-3',
    no: 3,
    bet: 'Đặt cược vào CHUỖI NGÀY, không đặt cược vào CƯỜNG ĐỘ.',
    instead: 'Thay vì học 4 tiếng những ngày rảnh và bỏ trống những ngày bận.',
    rationale:
      'Hiệu ứng giãn cách: cùng một tổng số giờ, chia đều cho kết quả ghi nhớ cao hơn hẳn dồn cục, vì não cần các chu kỳ ngủ xen giữa để hợp nhất trí nhớ. Quan trọng hơn, chuỗi ngày biến tiếng Anh từ "một sự kiện" thành "một môi trường".',
    tradeoff:
      'Tôi chấp nhận tiến độ nhìn có vẻ chậm trong 6 tháng đầu, và chấp nhận những ngày chỉ học 2 phút vẫn được tính là hoàn thành.',
    provesWrongIf: 'Không có điều kiện nào làm cược này sai. Đây là cược chắc chắn nhất trong toàn hệ thống.',
  },
  {
    id: 'sb-4',
    no: 4,
    bet: 'Từ tháng 25, DIỆT LỖI CŨ thay vì HỌC THÊM CÁI MỚI.',
    instead: 'Thay vì tiếp tục nạp từ vựng và tìm bí kíp mới khi bị kẹt ở Band 6.5.',
    rationale:
      'Ở mức 6.5, tôi đã biết gần đủ thứ cần biết. Điểm bị giữ lại bởi 8–12 lỗi lặp đi lặp lại. Diệt gọn một lỗi trong 2 tuần có giá trị hơn học 200 từ mới — vì lỗi xuất hiện ở mọi câu, còn từ mới chỉ xuất hiện khi có dịp.',
    tradeoff:
      'Tôi chấp nhận cảm giác "đang giậm chân" vì không nạp thêm kiến thức mới, và chấp nhận công việc sửa lỗi vốn nhàm chán hơn nhiều so với học cái mới.',
    provesWrongIf:
      'Nếu sau 6 lỗi đã đóng mà điểm Writing không nhúc nhích, vấn đề nằm ở tiêu chí Task Response chứ không phải ngôn ngữ.',
  },
  {
    id: 'sb-5',
    no: 5,
    bet: 'Xây CỘNG ĐỒNG thay vì dựa vào Ý CHÍ.',
    instead: 'Thay vì tự học một mình và cố gắng "quyết tâm hơn" mỗi lần chùng xuống.',
    rationale:
      'Ý chí là nguồn lực cạn kiệt, còn nhu cầu không muốn làm người khác thất vọng thì không. Thuyết tự quyết chỉ ra động lực bền cần đủ ba nhu cầu: Tự chủ, Năng lực và Kết nối — người tự học một mình luôn thiếu vế thứ ba, và đó là lý do số một khiến họ bỏ ở tháng thứ tư.',
    tradeoff:
      'Tôi chấp nhận mất quyền tự do đổi lịch tuỳ hứng, và chấp nhận phải xuất hiện đúng giờ kể cả khi không muốn.',
    provesWrongIf:
      'Nếu Club trở thành nơi tán gẫu bằng tiếng Việt, nó mất tác dụng — khi đó phải siết luật hoặc lập nhóm mới, chứ không bỏ mô hình.',
  },
  {
    id: 'sb-6',
    no: 6,
    bet: 'Chi tiền cho PHẢN HỒI, tiết kiệm ở mọi khoản khác.',
    instead: 'Thay vì mua khoá học trọn gói đắt tiền hoặc sưu tầm tài liệu.',
    rationale:
      'Gần như toàn bộ nội dung tôi cần đều miễn phí và chất lượng cao. Thứ duy nhất không thể lấy miễn phí là một người có chuyên môn nghe tôi nói rồi chỉ ra chính xác tôi sai ở đâu. Luyện tập không có người sửa chỉ khắc sâu lỗi sai.',
    tradeoff:
      'Tôi chấp nhận không có lớp học sẵn để dựa vào, và phải tự chịu trách nhiệm thiết kế lộ trình của mình.',
    provesWrongIf:
      'Nếu sau 12 buổi 1-1 mà Sổ Lỗi không dày thêm, vấn đề là chọn sai gia sư — đổi người, không bỏ chiến lược.',
  },
];

export const RESOURCE_ALLOCATION = [
  {resource: 'Thời gian', amount: '~1.900 giờ / 3 năm', split: 'Input 50% · Output 25% · Ghi nhớ 15% · Âm thanh 10%'},
  {resource: 'Tiền', amount: '~25–35 triệu / 3 năm', split: 'Gia sư 1-1 ~70% · Sách 20% · Ứng dụng 10%'},
  {resource: 'Năng lượng', amount: 'Khung giờ đỉnh mỗi ngày', split: 'Việc khó nhất vào buổi sáng · Việc nhẹ vào buổi tối'},
  {resource: 'Quan hệ', amount: '2 buổi Club / tuần', split: '1 nhóm trách nhiệm · 1 nhóm kỹ năng'},
];

/* --------------------- 5. KẾ HOẠCH RÈN LUYỆN ---------------------------- */

export const PLAN_TEMPLATES: PlanTemplate[] = [
  {
    scope: 'day',
    name: 'Kế hoạch NGÀY — ba phiên bản, chọn theo thực tế hôm nay',
    variants: [
      {
        label: 'Ngày Đủ',
        when: 'Ngày bình thường — chiếm khoảng 70% số ngày',
        minutes: 105,
        blocks: [
          {time: '05:45', task: 'Đọc câu bản sắc. Không chạm điện thoại.', minutes: 2},
          {time: '05:50', task: 'Anki — ôn tới khi hàng đợi về 0', minutes: 18},
          {time: '06:10', task: 'Shadowing hoặc chép chính tả', minutes: 20},
          {time: '06:30', task: 'Buổi luyện chính theo cột mốc', minutes: 20},
          {time: 'Trong ngày', task: 'Túi thời gian rơi vãi: podcast, tự nói, Anki', minutes: 25},
          {time: '21:00', task: 'Viết: nhật ký hoặc Task 2', minutes: 15},
          {time: '21:20', task: 'Nhập lỗi trong ngày vào Sổ Lỗi', minutes: 5},
        ],
      },
      {
        label: 'Ngày Bận',
        when: 'Công việc dồn, đi công tác, có việc gia đình — khoảng 25% số ngày',
        minutes: 35,
        blocks: [
          {time: 'Sáng sớm', task: 'Anki — ôn hết hàng đợi, không học thẻ mới', minutes: 15},
          {time: 'Đi lại', task: 'Podcast — nghe thụ động, không cần ghi chép', minutes: 15},
          {time: 'Trước ngủ', task: 'Tự nói 3 phút kể lại ngày hôm nay', minutes: 3},
          {time: 'Trước ngủ', task: 'Tô đen ô lịch', minutes: 2},
        ],
      },
      {
        label: 'Ngày Tệ',
        when: 'Ốm, khủng hoảng, kiệt sức — khoảng 5% số ngày. Mục tiêu duy nhất là GIỮ CHUỖI.',
        minutes: 2,
        blocks: [
          {time: 'Bất cứ lúc nào', task: 'Mở Anki, ôn 5 thẻ. Đóng máy. Tô ô lịch.', minutes: 2},
        ],
      },
    ],
  },
  {
    scope: 'week',
    name: 'Kế hoạch TUẦN — khung cố định, nội dung thay theo cột mốc',
    variants: [
      {
        label: 'Tuần chuẩn',
        when: '7 ngày · tổng 12–14 giờ',
        minutes: 780,
        blocks: [
          {time: 'T2', task: 'Khối sâu sáng + viết tối', minutes: 105},
          {time: 'T3', task: 'Khối sâu sáng + buổi 1-1 với gia sư', minutes: 120},
          {time: 'T4', task: 'Khối sâu sáng + CLB kỹ năng', minutes: 125},
          {time: 'T5', task: 'Khối sâu sáng + đọc mở rộng', minutes: 105},
          {time: 'T6', task: 'Khối sâu sáng + CLB thứ hai', minutes: 125},
          {time: 'T7', task: 'Buổi dài: thi thử hoặc luyện sâu', minutes: 120},
          {time: 'CN', task: 'Tổng kết: Sổ Lỗi, WOOP, ghi 5 con số', minutes: 80},
        ],
      },
    ],
  },
  {
    scope: 'month',
    name: 'Kế hoạch THÁNG — bốn tuần có vai trò khác nhau',
    variants: [
      {
        label: 'Chu kỳ 4 tuần',
        when: 'Lặp lại mỗi tháng trong suốt 36 tháng',
        minutes: 0,
        blocks: [
          {time: 'Tuần 1', task: 'NẠP — mở chủ đề mới, cường độ cao nhất, học thẻ mới nhiều nhất', minutes: 0},
          {time: 'Tuần 2', task: 'ÉP — đẩy mạnh đầu ra: viết và nói về đúng chủ đề tuần 1', minutes: 0},
          {time: 'Tuần 3', task: 'SỬA — tấn công lỗi mục tiêu, giảm 20% lượng nạp mới', minutes: 0},
          {time: 'Tuần 4', task: 'ĐO — thi thử, kiểm định KPI, tổng kết tháng, ăn mừng', minutes: 0},
        ],
      },
    ],
  },
];

/* --------------------- 6. 10 VIỆC QUAN TRỌNG ---------------------------- */

export const DAILY_TEN: KeyAction[] = [
  {no: 1, action: 'Ôn hết hàng đợi Anki — về 0, không nợ sang ngày mai', why: 'Nợ 3 ngày là gấp ba khối lượng, và đó là lúc người ta bỏ Anki', minutes: '15–20′', nonNegotiable: true},
  {no: 2, action: 'Nạp ≥ 45 phút input dễ hiểu (hiểu 90–98%)', why: 'Nhiên liệu của toàn hệ thống. Không input thì mọi kỹ thuật khác chạy trong chân không', minutes: '45′', nonNegotiable: true},
  {no: 3, action: 'Shadowing hoặc chép chính tả một đoạn 45–90 giây', why: 'Đòn bẩy cao nhất cho người Việt: chữa tai và miệng bằng cùng một hành động', minutes: '15–20′', nonNegotiable: true},
  {no: 4, action: 'Nói ra tiếng ≥ 10 phút (tự nói 3 mốc hoặc với người thật)', why: 'Luật 48 giờ: input không có đường ra chỉ là giải trí có phụ đề', minutes: '10′', nonNegotiable: true},
  {no: 5, action: 'Viết ≥ 100 từ, dùng ít nhất 3 cụm mới học trong ngày', why: 'Biến từ vựng bị động thành chủ động — chỗ tắc lớn nhất của người học Việt', minutes: '15′', nonNegotiable: true},
  {no: 6, action: 'Nhập mọi lỗi được sửa trong ngày vào Sổ Lỗi', why: 'Lỗi không ghi lại sẽ tái phạm; tái phạm 12 tháng thì hoá thạch', minutes: '5′', nonNegotiable: true},
  {no: 7, action: 'Đọc câu bản sắc trước khi chạm điện thoại buổi sáng', why: 'Đặt bản sắc trước hành vi — quyết định chất lượng cả ngày', minutes: '1′', nonNegotiable: true},
  {no: 8, action: 'Tô đen ô lịch — bằng chứng vật lý của chuỗi ngày', why: 'Thứ khiến bạn không muốn phá chuỗi là nhìn thấy nó dài ra', minutes: '10″', nonNegotiable: true},
  {no: 9, action: 'Ghi số phút input vào sổ giờ tích luỹ', why: 'Cái gì không đo được thì không cải thiện được. Mục tiêu 1.800 giờ cần được đếm', minutes: '1′', nonNegotiable: false},
  {no: 10, action: 'Tắt màn hình lúc 22:30 — ngủ đủ 7 giờ', why: 'Trí nhớ được củng cố khi ngủ. Thiếu ngủ phá đúng cơ chế bạn vừa mất cả ngày để nạp', minutes: '—', nonNegotiable: true},
];

export const WEEKLY_TEN: KeyAction[] = [
  {no: 1, action: 'Dự đủ 2 buổi Club, đúng giờ, bật camera', why: 'Đáp ứng nhu cầu Kết nối — vế mà người tự học một mình luôn thiếu', minutes: '2 × 60′', nonNegotiable: true},
  {no: 2, action: '≥ 1 buổi 1-1 với gia sư, có yêu cầu cụ thể trước buổi', why: 'Luật số 4 — không có phản hồi thì luyện tập chỉ khắc sâu lỗi sai', minutes: '45′', nonNegotiable: true},
  {no: 3, action: 'Nộp ≥ 1 bài viết cho NGƯỜI THẬT chấm (không chỉ AI)', why: 'AI chấm rộng tay và bỏ sót lỗi mạch ý — đúng hai tiêu chí quyết định Band 8', minutes: '50′', nonNegotiable: true},
  {no: 4, action: 'Đọc lại toàn bộ Sổ Lỗi 10 phút vào Chủ Nhật', why: 'Sổ lỗi không được ôn chỉ là nghĩa trang giấy', minutes: '10′', nonNegotiable: true},
  {no: 5, action: 'Chọn ĐÚNG MỘT lỗi làm mục tiêu tuần tới', why: 'Một mục tiêu hẹp mỗi tuần hiệu quả hơn năm mục tiêu rộng', minutes: '5′', nonNegotiable: true},
  {no: 6, action: 'Ghi 5 con số vào bảng theo dõi', why: 'Hệ thống lái của cả hành trình — và thuốc giải cho cảm giác chững lại', minutes: '10′', nonNegotiable: true},
  {no: 7, action: 'Chạy WOOP: Ước – Kết quả – Chướng ngại – Kế hoạch', why: 'Chỉ mơ làm giảm nỗ lực; mơ rồi đối diện chướng ngại mới làm tăng hành động', minutes: '10′', nonNegotiable: true},
  {no: 8, action: 'Thu âm 1 bản 2 phút và lưu lại vĩnh viễn', why: '156 bản ghi là bằng chứng tiến bộ duy nhất bạn có khi rơi vào cao nguyên', minutes: '10′', nonNegotiable: true},
  {no: 9, action: 'Một buổi dài ≥ 2 giờ vào thứ Bảy', why: 'Rèn sức bền tập trung — thứ mà luyện 45 phút mỗi ngày không rèn được', minutes: '120′', nonNegotiable: false},
  {no: 10, action: 'Chốt trước 3 khung giờ bất khả xâm phạm của tuần sau', why: 'Ý định thực thi: chốt trước khi nào và ở đâu làm tăng tỉ lệ thực hiện 2–3 lần', minutes: '5′', nonNegotiable: true},
];

export const MONTHLY_TEN: KeyAction[] = [
  {no: 1, action: 'Thi thử toàn phần đúng điều kiện phòng thi (từ tháng 22)', why: 'Vấn đề thật của Band 8 là sức bền 3 tiếng, không phải kiến thức lẻ', minutes: '165′', nonNegotiable: true},
  {no: 2, action: 'Đối chiếu 4 KPI của cột mốc — đúng tiến độ hay chậm?', why: 'Phát hiện lệch hướng ở tháng thứ 2 rẻ hơn nhiều so với ở tháng thứ 8', minutes: '20′', nonNegotiable: true},
  {no: 3, action: 'Nghe lại bản ghi âm của chính mình 6 tháng trước', why: 'Liều thuốc mạnh nhất chống lại cảm giác "học mãi không tiến bộ"', minutes: '15′', nonNegotiable: true},
  {no: 4, action: 'Xem 1 bài giảng Lập trình tư duy của tháng', why: 'Hệ điều hành tinh thần cần được cập nhật, không chỉ kỹ thuật học', minutes: '15′', nonNegotiable: true},
  {no: 5, action: 'Mở một chủ đề nạp hẹp mới, cày sâu 10 ngày', why: 'Ở lì một chủ đề khiến từ vựng tự ghim mà không cần học thuộc', minutes: 'Cả tháng', nonNegotiable: true},
  {no: 6, action: 'Tổng kết Sổ Lỗi: đóng bao nhiêu lỗi, mở bao nhiêu lỗi mới', why: 'Số lỗi đã đóng là chỉ số dự báo điểm chính xác hơn số từ đã học', minutes: '20′', nonNegotiable: true},
  {no: 7, action: 'Rà lại thư viện: bỏ tài liệu không dùng, thêm cái đang thiếu', why: 'Thừa tài liệu gây tê liệt lựa chọn nhiều hơn thiếu tài liệu', minutes: '20′', nonNegotiable: false},
  {no: 8, action: 'Một nhiệm vụ thật bằng tiếng Anh, có người thật đọc hoặc nghe', why: 'Nhiệm vụ giả mất áp lực chất lượng và mất luôn động lực', minutes: '60′', nonNegotiable: true},
  {no: 9, action: 'Kiểm tra sức khoẻ hệ thống: ngủ, năng lượng, dấu hiệu kiệt sức', why: 'Kiệt sức ở tháng 20 phá huỷ nhiều hơn bất kỳ lỗi kỹ thuật nào', minutes: '15′', nonNegotiable: true},
  {no: 10, action: 'Ăn mừng có chủ đích khi đạt cột mốc', why: 'Phần thưởng làm hành vi được lặp lại — bỏ qua bước này là bỏ vòng lặp thói quen', minutes: '—', nonNegotiable: true},
];

/* ----------------------------- 7. KPI ------------------------------------ */

export const KPIS: KpiSpec[] = [
  {id: 'k-streak', name: 'Chuỗi ngày', type: 'dẫn', cadence: 'Hằng ngày', target: '≥ 95% số ngày', redline: 'Bỏ 2 ngày liên tiếp', how: 'Lịch tô đen trên tường'},
  {id: 'k-input', name: 'Giờ input tích luỹ', type: 'dẫn', cadence: 'Hằng tuần', target: '≥ 10 giờ/tuần (năm 1) → 14 giờ (năm 3)', redline: 'Dưới 6 giờ/tuần trong 2 tuần liền', how: 'Bấm giờ, ghi sổ mỗi tối'},
  {id: 'k-speak', name: 'Phút nói ra tiếng', type: 'dẫn', cadence: 'Hằng tuần', target: '≥ 120 phút/tuần (năm 2–3)', redline: 'Dưới 60 phút/tuần', how: 'Cộng tự nói + gia sư + Club'},
  {id: 'k-write', name: 'Số từ đã viết', type: 'dẫn', cadence: 'Hằng tuần', target: '≥ 1.000 từ/tuần', redline: 'Dưới 400 từ/tuần', how: 'Đếm từ trong sổ viết'},
  {id: 'k-anki', name: 'Thẻ Anki trưởng thành', type: 'dẫn', cadence: 'Hằng tuần', target: 'Tăng đều, đạt 10.000 vào tháng 36', how: 'Thống kê trong Anki', redline: 'Hàng đợi tồn > 200 thẻ'},
  {id: 'k-error', name: 'Số lỗi đã ĐÓNG', type: 'dẫn', cadence: 'Hằng tháng', target: '≥ 8 lỗi/tháng (từ năm 2)', redline: '0 lỗi đóng trong 2 tháng liền', how: 'Cột "Ngày đóng" trong Sổ Lỗi'},
  {id: 'k-feedback', name: 'Vòng phản hồi có người thật', type: 'dẫn', cadence: 'Hằng tuần', target: '≥ 2 vòng/tuần', redline: '0 vòng trong 1 tuần', how: 'Buổi 1-1 + bài viết được chấm'},
  {id: 'k-mock', name: 'Điểm thi thử', type: 'trễ', cadence: 'Hằng tháng (từ tháng 22)', target: 'Theo đúng quỹ đạo cột mốc', redline: 'Đi ngang 3 tháng liền', how: 'Đề Cambridge, đúng điều kiện phòng thi'},
  {id: 'k-cefr', name: 'Cấp độ CEFR', type: 'trễ', cadence: 'Hằng quý', target: 'Đạt cổng thoát của cột mốc', redline: 'Trượt cổng 2 quý liên tiếp', how: 'Exam English / Linguaskill'},
  {id: 'k-errorfree', name: 'Tỉ lệ câu không lỗi khi viết', type: 'trễ', cadence: 'Hằng tháng (từ năm 3)', target: '≥ 60%', redline: 'Dưới 40% ở tháng 27', how: 'Đếm trên bài đã được chấm'},
];

export const ANTI_KPI = {
  title: 'Những chỉ số tôi KHÔNG đo — vì đo chúng sẽ làm hỏng hành vi',
  items: [
    'Số giờ "ngồi vào bàn" — vì ngồi 3 tiếng mà mở mạng xã hội không bằng 45 phút tập trung thật.',
    'Số từ vựng đã "gặp" — vì nhận ra một từ không phải là dùng được nó.',
    'Số khoá học đã mua hoặc tài liệu đã tải — vì đây là chỉ số của sự bận rộn, không phải tiến bộ.',
    'Điểm thi thử của người khác — vì so sánh xã hội hướng lên làm giảm động lực và không cải thiện gì.',
    'Số ngày học liên tục trên ứng dụng game hoá — vì nó đo lòng trung thành với ứng dụng, không đo năng lực.',
  ],
};

/* --------------------- 8. TƯ DUY TÍCH CỰC 20/80 -------------------------- */

export const PARETO_MOVES: ParetoMove[] = [
  {
    id: 'pm-1',
    no: 1,
    move: 'Chuyển từ PHÁN XÉT sang DỮ LIỆU',
    share: '~25% tổng hiệu quả tinh thần',
    from: '"Mình dốt quá, viết mãi vẫn sai."',
    to: '"Đây là lỗi mạo từ, lần thứ tư. Ghi vào sổ, thành mục tiêu tuần sau."',
    trigger: 'Mỗi khi nhận bài chữa hoặc bị sửa lỗi khi nói.',
    script: 'Lỗi là dữ liệu, không phải bản án. Câu hỏi duy nhất: lỗi này thuộc loại nào?',
  },
  {
    id: 'pm-2',
    no: 2,
    move: 'Thêm chữ CHƯA vào mọi câu tự phán xét',
    share: '~15%',
    from: '"Tôi không nói được tiếng Anh."',
    to: '"Tôi CHƯA nói được tiếng Anh trôi chảy — vì tôi mới có 40 giờ nói."',
    trigger: 'Mỗi khi bắt gặp mình nói câu bắt đầu bằng "Tôi không…".',
    script: 'Một từ duy nhất biến bản án vĩnh viễn thành một mốc thời gian.',
  },
  {
    id: 'pm-3',
    no: 3,
    move: 'So sánh với CHÍNH MÌNH 3 tháng trước, không với người khác',
    share: '~12%',
    from: '"Người ta học 1 năm đã 7.5, mình 18 tháng mới 6.0."',
    to: '"Bản ghi âm tháng trước so với bản hôm nay — tôi đã khác."',
    trigger: 'Mỗi khi thấy ai đó khoe điểm, hoặc mỗi lần rơi vào cao nguyên.',
    script: 'Bạn đang so hậu trường của mình với sân khấu của người khác. Phép so đó vô nghĩa.',
  },
  {
    id: 'pm-4',
    no: 4,
    move: 'Coi CAO NGUYÊN là dấu hiệu sắp bứt, không phải dấu hiệu hết khả năng',
    share: '~10%',
    from: '"Ba tháng nay không tiến bộ. Chắc phương pháp này sai."',
    to: '"Cao nguyên luôn đến ở tháng 14 và 26. Nó có tên, có nguyên nhân, và sẽ kết thúc nếu tôi còn ở lại."',
    trigger: 'Khi cảm thấy học mãi không lên trong hơn 3 tuần liền.',
    script: 'Đổi CÁCH luyện, đừng đổi mục tiêu. Và mở bảng số liệu ra trước khi kết luận.',
  },
  {
    id: 'pm-5',
    no: 5,
    move: 'Tìm lời CHÊ thay vì tìm lời KHEN',
    share: '~8%',
    from: '"Gia sư khen mình nói tốt, chắc mình ổn rồi."',
    to: '"Buổi này không ai chỉ ra lỗi nào — đó là buổi học lãng phí. Tôi cần đổi gia sư."',
    trigger: 'Sau mỗi buổi 1-1 hoặc mỗi lần nhận bài chữa.',
    script: 'Lời khen làm bạn dễ chịu hôm nay. Lời chê làm bạn khá hơn tháng sau.',
  },
  {
    id: 'pm-6',
    no: 6,
    move: 'Chấp nhận HIỂU 92% và đi tiếp',
    share: '~5%',
    from: '"Câu này có 2 từ lạ, phải tra ngay."',
    to: '"Tôi hiểu ý chung. Đi tiếp. Từ này gặp đủ 12 lần sẽ tự sáng."',
    trigger: 'Mỗi khi tay với lấy từ điển trong lúc đang đọc hoặc nghe.',
    script: 'Muốn hiểu 100% là bản năng đúng của học sinh và là bản năng sai của người tiếp thu ngôn ngữ.',
  },
  {
    id: 'pm-7',
    no: 7,
    move: 'Chọn XONG thay vì HOÀN HẢO',
    share: '~5%',
    from: '"Bài này chưa đủ tốt để nộp cho ai chấm."',
    to: '"Hết 40 phút là nộp. Bản nháp xấu được chấm giá trị gấp mười lần bài hoàn hảo trong đầu."',
    trigger: 'Mỗi khi trì hoãn nộp bài hoặc trì hoãn đặt lịch nói.',
    script: 'Chủ nghĩa hoàn hảo không phải tiêu chuẩn cao. Nó là nỗi sợ đội lốt tiêu chuẩn cao.',
  },
];

export const PARETO_NOTE =
  'Đây không phải "suy nghĩ tích cực" chung chung. Bảy nước đi này được chọn theo nguyên tắc 20/80: chúng là số ít cách phản ứng chiếm phần lớn khác biệt giữa người đi hết 3 năm và người dừng ở tháng thứ tư. Mỗi nước đi đều có tình huống kích hoạt cụ thể — vì tư duy chỉ đổi được tại đúng khoảnh khắc nó bị thử thách, không đổi được bằng cách đọc lý thuyết.';

/* -------------------- 9. BỘ QUY TẮC THÀNH CÔNG --------------------------- */

export const SUCCESS_RULES: SuccessRule[] = [
  {no: 1, rule: 'Tôi không bao giờ bỏ hai ngày liên tiếp.', meaning: 'Một ngày lỡ là tai nạn. Hai ngày lỡ là một thói quen mới đang hình thành.', breach: 'Nếu lỡ ngày thứ nhất, ngày thứ hai chạy phiên bản 2 phút — bất kể lý do gì.'},
  {no: 2, rule: 'Tôi chỉ học tài liệu mình hiểu 90–98%.', meaning: 'Tài liệu đúng quan trọng hơn tài liệu hay. Ngoài vùng này là lãng phí thời gian.', breach: 'Tra quá 5 từ mỗi trang thì hạ cấp ngay, không cố.'},
  {no: 3, rule: 'Mọi thứ tôi nạp vào đều phải có đường ra trong 48 giờ.', meaning: 'Nói lại, viết lại, hoặc dạy lại. Input không có output là giải trí có phụ đề.', breach: 'Không kịp trong 48 giờ thì bỏ nội dung đó, đừng cố nạp thêm cái mới.'},
  {no: 4, rule: 'Mỗi tuần tôi phải có ít nhất một vòng phản hồi từ người thật.', meaning: 'Luyện tập không có người sửa chỉ khắc sâu lỗi sai.', breach: 'Tuần nào không có, tuần sau phải bù đủ hai vòng.'},
  {no: 5, rule: 'Tôi ghi lại mọi lỗi được sửa, ngay trong ngày.', meaning: 'Sổ Lỗi là tài sản quý nhất của 3 năm. Lỗi không ghi sẽ tái phạm và hoá thạch.', breach: 'Không ghi trong 24 giờ thì lỗi đó coi như chưa từng được sửa.'},
  {no: 6, rule: 'Tôi không động vào đề IELTS trước tháng 22.', meaning: 'Luyện đề tối ưu cách thể hiện năng lực, không tạo ra năng lực.', breach: 'Nếu sốt ruột, đọc lại Cược chiến lược số 1 thay vì mở đề.'},
  {no: 7, rule: 'Tôi học theo cụm, không bao giờ học từ lẻ.', meaning: 'Đơn vị của ngôn ngữ là cụm đi liền, không phải từ đơn.', breach: 'Thẻ Anki nào chỉ có từ trần thì xoá và làm lại.'},
  {no: 8, rule: 'Việc khó nhất của ngày phải xảy ra trước 7 giờ sáng.', meaning: 'Ý chí là nguồn lực cạn dần. Buổi tối chỉ dành cho việc nhẹ.', breach: 'Lỡ buổi sáng thì hạ cấp việc tối xuống mức nhẹ, không cố làm việc khó khi kiệt sức.'},
  {no: 9, rule: 'Tôi ngủ tối thiểu 7 giờ. Không đánh đổi giấc ngủ lấy giờ học.', meaning: 'Trí nhớ được củng cố khi ngủ. Thiếu ngủ phá đúng cơ chế mình vừa mất cả ngày để nạp.', breach: 'Ngủ dưới 6 giờ thì hôm sau chạy Ngày Bận, không cố chạy Ngày Đủ.'},
  {no: 10, rule: 'Tôi không đi tiếp khi chưa qua cổng kiểm định.', meaning: 'Đi tiếp khi nền chưa vững là lý do khiến người ta kẹt ở Band 6.0 nhiều năm.', breach: 'Trượt cổng thì lặp 4 tuần đúng những tiêu chí còn thiếu. Không thương lượng.'},
  {no: 11, rule: 'Tôi chạy một phương pháp tối thiểu 8 tuần trước khi đánh giá nó.', meaning: 'Đổi phương pháp mỗi khi chững lại nghĩa là không phương pháp nào chạy đủ lâu để cho kết quả.', breach: 'Muốn đổi trước 8 tuần thì phải viết ra bằng chứng cụ thể, không dựa vào cảm giác.'},
  {no: 12, rule: 'Tôi không học một mình. Mỗi tuần hai buổi Club, không thương lượng.', meaning: 'Ý chí cạn kiệt; nhu cầu không muốn làm người khác thất vọng thì không.', breach: 'Vắng phải báo trước 24 giờ và bù bằng một buổi 1-1 trong tuần.'},
];

/* -------------------- 10. PHƯƠNG PHÁP KHÁC BIỆT -------------------------- */

export const DIFFERENTIATORS: Differentiator[] = [
  {
    id: 'df-1',
    what: 'Chép chính tả 45 giây mỗi ngày',
    mostPeople: 'Nghe thật nhiều và hy vọng tai tự quen.',
    iDo: 'Chép từng chữ một đoạn 45 giây, rồi PHÂN LOẠI từng lỗi: không biết từ / biết mà không nhận ra âm / nối–nuốt âm.',
    edge: 'Tôi biết chính xác vì sao mình nghe hụt, nên sửa đúng chỗ. Người khác chỉ biết "nghe chưa tốt" nên không sửa được gì.',
  },
  {
    id: 'df-2',
    what: 'Sổ Lỗi có cột "Ngày đóng"',
    mostPeople: 'Ghi lỗi vào sổ rồi không bao giờ đọc lại.',
    iDo: 'Xếp hạng lỗi theo mức độ tốn kém, mỗi 2 tuần diệt gọn đúng MỘT lỗi, và đánh dấu ĐÓNG khi 3 bài liên tiếp không tái phạm.',
    edge: 'Từ 6.5 lên 7.5 là bỏ bớt lỗi, không phải học thêm. Tôi có quy trình cho việc đó; phần lớn người học thì không.',
  },
  {
    id: 'df-3',
    what: 'Nạp hẹp 10 ngày một chủ đề',
    mostPeople: 'Mỗi ngày một chủ đề mới cho đỡ chán.',
    iDo: 'Ở lì trong một chủ đề 10 ngày với 6–8 nguồn khác nhau, kết thúc bằng một bài viết và một bài nói KHÔNG chuẩn bị.',
    edge: 'Sau 12 chu kỳ, tôi không còn chủ đề nào là "chủ đề lạ". Từ vựng tự ghim vì gặp lặp lại hàng chục lần trong ngữ cảnh khác nhau.',
  },
  {
    id: 'df-4',
    what: 'Mổ xẻ bài mẫu theo phương pháp Franklin',
    mostPeople: 'Đọc bài Band 9 rồi thán phục, hoặc học thuộc để chép vào phòng thi.',
    iDo: 'Ghi dàn ý 8 gạch đầu dòng, CẤT bài mẫu 24 giờ, tự viết lại, rồi so sánh câu-với-câu để đo khoảng cách.',
    edge: 'Tôi học từ khoảng cách giữa bài mình và bài mẫu. Đọc để thán phục không tạo ra bất kỳ thay đổi nào.',
  },
  {
    id: 'df-5',
    what: 'Tự chấm theo Band Descriptors trước khi nộp',
    mostPeople: 'Nộp bài rồi chỉ nhìn con số điểm.',
    iDo: 'Tự chấm 4 tiêu chí kèm lý do bằng đúng ngôn ngữ tiêu chí, so với điểm giáo viên, và theo dõi độ lệch cho tới khi dưới 0,5 band.',
    edge: 'Khi tự chấm chính xác, tôi viết được 5 bài một tuần thay vì 1 bài — vì không còn bị nghẽn ở khâu chờ người chấm.',
  },
  {
    id: 'df-6',
    what: 'Ba phiên bản kế hoạch ngày, viết ra TRƯỚC khi cần',
    mostPeople: 'Có một kế hoạch lý tưởng, và bỏ hẳn khi không thực hiện được.',
    iDo: 'Ngày Đủ 105 phút, Ngày Bận 35 phút, Ngày Tệ 2 phút — cả ba đều được định nghĩa sẵn từ trước.',
    edge: 'Tôi không bao giờ phải quyết định "hôm nay có học không". Tôi chỉ chọn phiên bản nào. Chuỗi ngày vì thế không đứt.',
  },
  {
    id: 'df-7',
    what: 'Lưu 156 bản ghi âm 2 phút',
    mostPeople: 'Không có bằng chứng nào về tiến bộ của chính mình.',
    iDo: 'Mỗi tuần thu một bản 2 phút, lưu vĩnh viễn, và nghe lại bản của 6 tháng trước vào mỗi kỳ tổng kết tháng.',
    edge: 'Khi rơi vào cao nguyên, tôi có bằng chứng vật lý rằng mình đã khác. Người khác chỉ có cảm giác — và cảm giác luôn nói dối ở giai đoạn đó.',
  },
  {
    id: 'df-8',
    what: 'Cổng kiểm định là chặn cứng',
    mostPeople: 'Học theo lịch, hết tháng thì sang bài mới bất kể đã vững hay chưa.',
    iDo: 'Cuối mỗi quý làm bài kiểm tra cổng thoát. Chưa đạt thì lặp lại 4 tuần, không đi tiếp.',
    edge: 'Nền của tôi không bao giờ rỗng. Đây chính là điều tách người đạt 8.0 khỏi người học 5 năm vẫn kẹt ở 6.0.',
  },
];

/* ----------- 11. TÀI NĂNG / ĐIỂM MẠNH / KHÁC BIỆT CỦA TÔI ---------------- */

export const STRENGTH_AUDIT = {
  title: 'Tự kiểm điểm mạnh — 20 phút, làm trong tuần đầu tiên',
  note:
    'Đây là mục duy nhất trong La Bàn mà không ai viết hộ được. Điểm mạnh của bạn quyết định bạn nên nghiêng lộ trình về hướng nào — và quan trọng hơn, nó cho bạn một chỗ để bám vào khi mọi thứ khác đều khó.',
  questions: [
    'Trong 5 năm qua, việc gì tôi đã kiên trì làm được trên 6 tháng mà không ai ép? — Đó là bằng chứng tôi CÓ khả năng bền bỉ, chỉ là chưa đặt đúng chỗ.',
    'Tôi học tốt nhất qua kênh nào: nghe, nhìn, đọc, hay làm? — Nghiêng 30% lộ trình về kênh đó, giữ 70% theo thiết kế chuẩn.',
    'Tôi có sẵn kiến thức chuyên sâu về lĩnh vực nào? — Đó là chủ đề nạp hẹp đầu tiên của tôi, vì tôi đã có sẵn kiến thức nền để đoán nghĩa.',
    'Tôi làm việc tốt hơn khi một mình hay khi có người? — Quyết định tôi cần 2 hay 4 buổi Club mỗi tuần.',
    'Khung giờ nào trong ngày đầu óc tôi sắc nhất? — Khối sâu phải đặt vào đúng khung đó, bất kể nó là 5 giờ sáng hay 22 giờ đêm.',
    'Lần gần nhất tôi bỏ dở một việc, nguyên nhân THẬT là gì? — Đó chính là chướng ngại tôi phải viết vào bước Obstacle của WOOP mỗi tuần.',
    'Điều gì khiến tôi tự hào mà không cần ai công nhận? — Đó là nguồn động lực nội tại bền nhất của tôi; hãy gắn việc học vào nó.',
  ],
};

export const ARCHETYPES: Archetype[] = [
  {
    id: 'ar-analyst',
    name: 'NGƯỜI PHÂN TÍCH',
    signs: ['Thích hiểu quy luật trước khi làm', 'Khó chịu khi không biết vì sao câu này đúng', 'Học ngữ pháp thấy dễ chịu'],
    superpower: 'Độ chính xác cao. Khi đã nắm luật thì hầu như không sai lại — rất lợi cho tiêu chí Grammatical Accuracy ở Band 8.',
    blindSpot: 'Phân tích thay cho luyện tập. Hiểu rất rõ hiện tại hoàn thành nhưng nói vẫn ú ớ vì thiếu giờ nói.',
    strategy: [
      'Giữ nguyên tỉ lệ Input 50% dù bản năng muốn giảm xuống để phân tích nhiều hơn.',
      'Ép luật: mỗi giờ phân tích phải kèm 30 phút nói ra tiếng.',
      'Dùng phương pháp Chú ý (thu thập 15 ví dụ thật RỒI mới tự rút quy luật) — hợp gu mà vẫn đúng cách.',
      'Sổ Lỗi sẽ là công cụ mạnh nhất của bạn. Khai thác tối đa nó.',
    ],
  },
  {
    id: 'ar-social',
    name: 'NGƯỜI GIAO TIẾP',
    signs: ['Học nhanh nhất khi có người đối diện', 'Ngồi một mình 30 phút là chán', 'Không ngại nói sai'],
    superpower: 'Tích luỹ giờ nói nhanh gấp đôi người khác. Độ trôi chảy và tự nhiên đến sớm.',
    blindSpot: 'Trôi chảy nhưng thiếu chính xác. Dễ dừng ở Band 6.5–7.0 vì lỗi ngữ pháp hoá thạch từ sớm.',
    strategy: [
      'Tăng Club lên 4 buổi/tuần — đây là nhiên liệu của bạn, đừng cắt.',
      'Nhưng BẮT BUỘC giữ khối viết một mình mỗi ngày, kể cả khi thấy nhàm.',
      'Yêu cầu gia sư sửa ngay tại chỗ thay vì ghi vào chat — bạn tiếp thu tốt hơn qua tương tác trực tiếp.',
      'Cẩn thận nhất với lỗi hoá thạch. Sổ Lỗi với bạn là bắt buộc sinh tử, không phải tuỳ chọn.',
    ],
  },
  {
    id: 'ar-reader',
    name: 'NGƯỜI ĐỌC',
    signs: ['Đọc nhanh và thích đọc', 'Vốn từ bị động lớn hơn nhiều so với vốn chủ động', 'Ngại nói'],
    superpower: 'Reading và vốn từ đi trước rất xa. Có thể đạt 8.5 Reading sớm hơn lộ trình chuẩn.',
    blindSpot: 'Chênh lệch band lớn: Reading 8.5 nhưng Speaking 6.0, kéo tụt điểm tổng.',
    strategy: [
      'Áp Luật 48 giờ nghiêm ngặt hơn người khác: mọi thứ đọc được phải nói lại trong ngày.',
      'Đặt lịch buổi 1-1 đầu tiên ở tháng thứ 5, sớm hơn lộ trình chuẩn 2 tháng.',
      'Ưu tiên tuyệt đối cho chép chính tả — điểm yếu ẩn của người đọc giỏi thường là tai.',
      'Đặt chỉ tiêu nói theo PHÚT, không theo cảm hứng. Đo và ép.',
    ],
  },
  {
    id: 'ar-disciplined',
    name: 'NGƯỜI KỶ LUẬT',
    signs: ['Đã từng duy trì một thói quen khó trên 1 năm', 'Thích hệ thống, bảng biểu, con số', 'Không cần động lực để bắt đầu'],
    superpower: 'Chuỗi ngày gần như tuyệt đối. Đây là điểm mạnh giá trị nhất trong toàn bộ 36 tháng.',
    blindSpot: 'Chăm chỉ theo cách sai mà không nhận ra. Có thể cày 500 giờ tài liệu quá khó và tự hỏi vì sao không tiến bộ.',
    strategy: [
      'Dành nhiều công sức cho việc CHỌN ĐÚNG tài liệu (Luật i+1) hơn là cho việc chăm chỉ.',
      'Mỗi tháng dừng lại hỏi: "Việc này có thật sự tạo ra kết quả không?" — đừng chỉ hỏi "Tôi đã làm đủ chưa?".',
      'Cẩn thận với kiệt sức ở tháng 20: bạn sẽ ép mình đi tiếp khi lẽ ra nên giảm tải.',
      'KPI dẫn là bạn của bạn. Nhưng phải xem cả KPI trễ để biết công sức có chuyển thành kết quả không.',
    ],
  },
  {
    id: 'ar-creative',
    name: 'NGƯỜI SÁNG TẠO',
    signs: ['Chán nhanh với việc lặp lại', 'Học tốt qua phim, nhạc, truyện', 'Ghét bảng biểu và thời khoá biểu cứng'],
    superpower: 'Ngôn ngữ tự nhiên, sinh động, không sách vở. Rất lợi cho Speaking Band 8 ở tiêu chí độ tự nhiên.',
    blindSpot: 'Đứt chuỗi vì chán. Bỏ Anki ở tháng thứ 3 và mất toàn bộ vốn từ đã tích luỹ.',
    strategy: [
      'Dùng quyền Tự chủ tối đa: 30% nội dung mỗi tuần do bạn tự chọn theo sở thích.',
      'Đãi câu từ phim và truyện thay vì từ giáo trình — cùng kết quả, hợp gu hơn nhiều.',
      'Giữ Anki bằng mọi giá, nhưng hạ xuống 10 thẻ mới/ngày cho đỡ ngán. Ít mà đều hơn nhiều mà bỏ.',
      'Đổi CÁCH luyện thường xuyên, nhưng tuyệt đối không đổi MỤC TIÊU của cột mốc.',
    ],
  },
  {
    id: 'ar-comeback',
    name: 'NGƯỜI QUAY LẠI',
    signs: ['Đã học tiếng Anh nhiều lần và bỏ nhiều lần', 'Có nền cũ lộn xộn', 'Mang theo cảm giác thất bại'],
    superpower: 'Biết chính xác điều gì KHÔNG hiệu quả với mình — đây là dữ liệu mà người mới bắt đầu không có.',
    blindSpot: 'Tự đánh giá thấp bản thân, và dễ bỏ cuộc ngay lần chững đầu tiên vì coi đó là bằng chứng cho niềm tin cũ.',
    strategy: [
      'Viết ra 3 lần bỏ cuộc trước và nguyên nhân THẬT của từng lần. Đó là danh sách chướng ngại của bạn.',
      'Mô-đun tư duy Bản sắc và Phát triển là bắt buộc, làm ngay tuần đầu tiên.',
      'CLB Chuỗi Ngày quan trọng với bạn hơn bất kỳ ai — bạn cần người chờ bạn xuất hiện.',
      'Đừng tin nền cũ. Bắt đầu lại từ bảng âm IPA, kể cả khi thấy nó quá dễ. Nền lộn xộn nguy hiểm hơn nền trống.',
    ],
  },
];

export const MANIFESTO = {
  title: 'TUYÊN NGÔN — in ra, dán lên bàn học',
  lines: [
    'Tôi là người học tiếng Anh mỗi ngày.',
    'Tôi chọn đều đặn thay vì bùng nổ.',
    'Tôi chọn bị sửa thay vì được khen.',
    'Tôi coi lỗi sai là dữ liệu, không phải bản án.',
    'Tôi ở lại khi mọi thứ trở nên nhàm chán — vì đó chính là lúc phần lớn người khác rời đi.',
    'Tôi không đi một mình.',
    'Tôi không bao giờ bỏ hai ngày liên tiếp.',
    'Ngày tệ nhất, tôi vẫn ôn năm thẻ — không phải để tiến bộ, mà để giữ con người mình.',
  ],
  closing:
    'IELTS 8.0 là cánh cửa, không phải căn phòng. Điều tôi thật sự xây trong 1.095 ngày này là một con người có khả năng giữ lời hứa với chính mình khi không có ai nhìn.',
};
