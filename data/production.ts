/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {ProductionSpec} from '../types';

/* ==========================================================================
   XƯỞNG HỌC LIỆU — bản thiết kế sản xuất
   Đây là bản vẽ kỹ thuật để ê-kíp quay dựng, không phải file media.
   Mỗi hạng mục có: cấu trúc từng phút, thông số kỹ thuật, và phần tài sản
   tái sử dụng để không phải quay lại từ đầu cho mỗi cấp độ.
   ========================================================================== */

export const STUDIO_RULES = {
  title: 'Sáu luật sản xuất — vi phạm luật nào là hỏng học liệu ở đó',
  rules: [
    {
      no: 1,
      rule: 'Không video nào dài quá 20 phút.',
      why: 'Vượt 20 phút là tỉ lệ xem hết rơi xuống dưới một nửa. Thà cắt thành hai bài còn hơn để một bài không ai xem hết.',
    },
    {
      no: 2,
      rule: 'Mọi video đều kết thúc bằng một việc phải làm, không kết thúc bằng lời chào.',
      why: 'Video không có bài tập là giải trí có kiến thức. Hai phút cuối luôn là giao bài cụ thể.',
    },
    {
      no: 3,
      rule: 'Mọi audio đều có bản transcript đầy đủ và bản chậm 0,75×.',
      why: 'Không có transcript thì không chép chính tả được, mà chép chính tả là kỹ thuật đòn bẩy cao nhất cho người Việt.',
    },
    {
      no: 4,
      rule: 'Hình ảnh phải là ảnh thật, có bối cảnh, có người thật.',
      why: 'Ảnh minh hoạ chung chung không tạo được liên kết ngữ nghĩa. Não nhớ bối cảnh, không nhớ hình vẽ trang trí.',
    },
    {
      no: 5,
      rule: 'Mọi tài liệu đều ghi rõ cấp độ và vị trí trong lộ trình ở góc trên.',
      why: 'Học viên phải biết ngay tài liệu này dành cho ai và dùng ở đâu, nếu không nó sẽ nằm im trong thư mục.',
    },
    {
      no: 6,
      rule: 'Quay một lần, dùng cho nhiều cấp độ. Thiết kế tài sản tái sử dụng ngay từ đầu.',
      why: 'Hai mươi lăm cấp độ mà quay riêng từng cấp là không khả thi. Phải có thư viện cảnh nền, chân dung và audio gốc dùng chung.',
    },
  ],
};

export const PRODUCTION_SPECS: ProductionSpec[] = [
  {
    id: 'ps-lesson',
    kind: 'video',
    name: 'VIDEO BÀI GIẢNG LÕI',
    tier: 'Tất cả 5 tầng',
    quantity: '268 bài — theo đúng 10 chuỗi bài giảng đã có trong hệ thống',
    duration: '12–20 phút mỗi bài',
    purpose:
      'Truyền một khái niệm duy nhất, minh hoạ bằng ví dụ thật, làm cùng học viên, rồi giao bài. Đây là xương sống của thư viện.',
    structure: [
      {t: '0:00–0:30', content: 'Móc câu: một tình huống thật mà học viên đang gặp, kết bằng câu hỏi họ chưa trả lời được.'},
      {t: '0:30–4:00', content: 'Khái niệm — chỉ MỘT khái niệm. Nói bằng lời thường, cấm thuật ngữ chưa giải thích.'},
      {t: '4:00–12:00', content: 'Minh hoạ: 15 ví dụ thật trên màn hình, người học tự rút quy luật TRƯỚC khi được nghe quy luật.'},
      {t: '12:00–18:00', content: 'Làm cùng: giảng viên và học viên làm song song, có khoảng lặng 7 giây để học viên tự làm.'},
      {t: '18:00–20:00', content: 'Giao bài: một nhiệm vụ cụ thể, có tiêu chí hoàn thành, có hạn nộp.'},
    ],
    specs: [
      'Quay ngang 1920×1080, 25fps. Không quay dọc — học viên xem trên máy tính khi luyện.',
      'Micro cài ve áo, thu 48kHz. Âm thanh quan trọng hơn hình ảnh gấp nhiều lần trong học liệu ngôn ngữ.',
      'Phụ đề tiếng Anh cứng bắt buộc; phụ đề tiếng Việt để dạng bật/tắt được.',
      'Chữ trên màn hình tối thiểu 28pt để đọc được trên điện thoại.',
      'Cảnh cận miệng khi dạy phát âm — tối thiểu 5 giây mỗi âm, quay từ chính diện và nghiêng 45 độ.',
    ],
    reusableAssets:
      'Bộ 30 cảnh nền cố định · Bộ khung đồ hoạ chung cho 5 tầng · Nhạc nền một bản duy nhất cho toàn hệ thống để tạo nhận diện.',
  },
  {
    id: 'ps-mouth',
    kind: 'video',
    name: 'VIDEO CẬN MIỆNG — 44 ÂM IPA',
    tier: 'Tầng 1 · KHAI NHĨ',
    quantity: '44 clip + 12 clip hiện tượng nối âm',
    duration: '90–120 giây mỗi clip',
    purpose:
      'Cho học viên NHÌN THẤY vị trí lưỡi và môi. Đây là thứ mà nghe không bao giờ dạy được, và là lý do người Việt sửa phát âm rất chậm.',
    structure: [
      {t: '0:00–0:15', content: 'Ký hiệu IPA lớn trên màn hình + phát âm mẫu 3 lần, tốc độ thường.'},
      {t: '0:15–0:45', content: 'Cận miệng chính diện, quay chậm 0,25×, có mũi tên chỉ vị trí lưỡi.'},
      {t: '0:45–1:00', content: 'Sơ đồ cắt dọc khoang miệng, chỉ rõ điểm chạm của lưỡi.'},
      {t: '1:00–1:30', content: '10 từ chứa âm đó, mỗi từ đọc 2 lần, có khoảng lặng để học viên lặp lại.'},
      {t: '1:30–2:00', content: '5 cặp âm tối thiểu để phân biệt với âm dễ nhầm nhất trong tiếng Việt.'},
    ],
    specs: [
      'Quay macro, khẩu độ f/4 trở lên để cả môi và răng đều nét.',
      'Ánh sáng hai nguồn đặt hai bên để thấy rõ chiều sâu khoang miệng.',
      'Quay tốc độ cao 120fps để có thể làm chậm mượt.',
      'Nền tối đơn sắc để miệng nổi bật hoàn toàn.',
      'Bắt buộc quay hai người mẫu: một giọng Anh–Anh, một giọng Anh–Mỹ.',
    ],
    reusableAssets:
      'Quay trọn 44 âm trong hai buổi. Dùng lại cho toàn bộ Tầng 1 và cho mọi phác đồ khắc phục lỗi phát âm về sau.',
  },
  {
    id: 'ps-shadow',
    kind: 'audio',
    name: 'BỘ AUDIO SHADOWING PHÂN CẤP',
    tier: 'Tầng 1 và 3',
    quantity: '150 đoạn — 30 đoạn cho mỗi mức từ A1 tới C1',
    duration: '60–90 giây mỗi đoạn',
    purpose:
      'Nguyên liệu cho kỹ thuật đòn bẩy cao nhất. Phải kiểm soát chặt độ khó để mọi đoạn nằm đúng vùng hiểu 90–98% của cấp tương ứng.',
    structure: [
      {t: 'Bản 1', content: 'Tốc độ gốc tự nhiên — bản dùng để shadowing chính thức.'},
      {t: 'Bản 2', content: 'Tốc độ 0,75× nhưng GIỮ NGUYÊN cao độ giọng — dùng cho tuần đầu làm quen.'},
      {t: 'Bản 3', content: 'Bản tách câu, mỗi câu có khoảng lặng đúng bằng độ dài câu đó để lặp lại.'},
      {t: 'Kèm theo', content: 'Transcript đầy đủ, đã đánh dấu sẵn chỗ nối âm, chỗ nuốt âm và trọng âm câu.'},
    ],
    specs: [
      'Thu 48kHz/24bit, phòng có tiêu âm, không nhạc nền.',
      'Đa dạng giọng bắt buộc: Anh 40%, Mỹ 30%, Úc 20%, các giọng khác 10% — đúng phổ giọng của kỳ thi.',
      'Kiểm soát độ khó bằng công cụ đo tần suất từ vựng, không kiểm soát bằng cảm tính.',
      'Chuẩn hoá âm lượng về -16 LUFS để học viên không phải chỉnh loa giữa các đoạn.',
      'Đặt tên file theo quy ước: [cấp]-[giọng]-[chủ đề]-[số thứ tự].',
    ],
    reusableAssets:
      'Mỗi đoạn dùng được cho ba việc: shadowing, chép chính tả, và nghe mở rộng. Thu một lần, khai thác ba lần.',
  },
  {
    id: 'ps-dictation',
    kind: 'audio',
    name: 'BỘ CHÉP CHÍNH TẢ 45 GIÂY',
    tier: 'Tầng 1',
    quantity: '200 đoạn phân theo 5 mức độ khó',
    duration: '45 giây mỗi đoạn',
    purpose:
      'Chẩn đoán chính xác vì sao học viên nghe hụt. Mỗi đoạn được thiết kế để chứa một hiện tượng âm cụ thể.',
    structure: [
      {t: 'Đoạn audio', content: '45 giây, chứa ít nhất 5 hiện tượng nối hoặc nuốt âm đã được chủ đích cài vào.'},
      {t: 'Transcript', content: 'Bản đầy đủ, tô màu ba nhóm: nối âm, nuốt âm, âm yếu schwa.'},
      {t: 'Bảng phân loại lỗi', content: 'Mẫu in sẵn ba cột để học viên tự phân loại lỗi của mình.'},
      {t: 'Audio giải thích', content: '60 giây phân tích đúng những chỗ người Việt hay nghe hụt trong đoạn này.'},
    ],
    specs: [
      'Mỗi đoạn phải chứa tối thiểu 5 hiện tượng âm được cài có chủ đích, không lấy ngẫu nhiên.',
      'Ghi rõ ở đầu file: đoạn này rèn hiện tượng nào.',
      'Có bản chậm 0,5× để học viên tự kiểm sau khi đã chép xong.',
      'Chuẩn hoá âm lượng và cắt khoảng lặng đầu cuối đúng 0,5 giây.',
    ],
    reusableAssets: 'Dùng chung nguồn thu với bộ shadowing — cắt ra từ cùng các buổi thu.',
  },
  {
    id: 'ps-photo',
    kind: 'bộ ảnh',
    name: 'BỘ ẢNH BỐI CẢNH THẬT',
    tier: 'Tầng 1 và 2',
    quantity: '1.200 ảnh — 12 chủ đề × 100 ảnh',
    duration: '—',
    purpose:
      'Gắn từ vựng trực tiếp với hình ảnh, không qua tiếng Việt. Đây là công cụ chính để cắt thói quen dịch trong đầu.',
    structure: [
      {t: 'Ảnh chính', content: 'Bối cảnh thật, có người thật đang làm việc thật. Không dùng ảnh dàn dựng trắng trơn.'},
      {t: 'Lớp phủ', content: 'Nhãn tiếng Anh cho 5–8 vật thể trong ảnh, có thể bật tắt.'},
      {t: 'Câu mô tả', content: '3 câu mô tả ảnh ở ba mức độ: A1, B1, C1 — cùng một ảnh dùng được cho ba cấp.'},
      {t: 'Audio', content: 'Bản đọc 3 câu mô tả, để nghe và nhìn cùng lúc.'},
    ],
    specs: [
      'Độ phân giải tối thiểu 2000px cạnh dài, để phóng to xem chi tiết được.',
      'Ưu tiên bối cảnh Việt Nam cho chủ đề đời thường — học viên liên hệ được ngay.',
      'Bối cảnh quốc tế cho chủ đề học thuật — đúng thế giới của kỳ thi.',
      'Bắt buộc có giấy phép sử dụng rõ ràng cho mọi ảnh có mặt người.',
    ],
    reusableAssets:
      'Một ảnh dùng cho ba cấp độ nhờ ba mức câu mô tả. Cũng dùng làm đề bài mô tả tranh cho phần thi nói.',
  },
  {
    id: 'ps-workbook',
    kind: 'tài liệu',
    name: 'SỔ TAY CẤP ĐỘ',
    tier: 'Tất cả 25 cấp độ',
    quantity: '25 quyển, mỗi cấp độ một quyển',
    duration: '24–32 trang mỗi quyển',
    purpose:
      'Vật thể hoá hành trình. Học viên cầm được, viết vào được, và nhìn thấy nó dày lên. Đây là thứ file PDF không thay thế được.',
    structure: [
      {t: 'Trang 1–2', content: 'Thẻ Niềm Tin và Thẻ Tư Duy — học viên tự viết vào ở pha GIEO.'},
      {t: 'Trang 3–4', content: 'Bản cam kết hành vi: khi nào, ở đâu, làm gì, và phương án dự phòng.'},
      {t: 'Trang 5–6', content: 'Lịch tô đen của cấp độ + bảng theo dõi năm con số hằng tuần.'},
      {t: 'Trang 7–20', content: 'Bảy thử thách, mỗi thử thách hai trang: đề bài, chỗ làm, chỗ dán phản hồi.'},
      {t: 'Trang 21–24', content: 'Sổ Lỗi của cấp độ, có cột Ngày Đóng.'},
      {t: 'Trang 25–28', content: 'Bài về đích + bản tự chấm theo tiêu chí.'},
      {t: 'Trang cuối', content: 'Ô dán huy hiệu + một dòng để lại cho người đi sau.'},
    ],
    specs: [
      'In khổ A5 để bỏ túi được, giấy 100gsm để viết bút mực không thấm sang mặt sau.',
      'Gáy khâu chỉ để mở phẳng được khi viết.',
      'Bìa in mã cấp độ lớn và tên cấp độ, để nhìn thấy tiến độ trên giá sách.',
      'Có bản PDF điền được cho học viên học từ xa.',
    ],
    reusableAssets:
      'Một khuôn thiết kế duy nhất, chỉ thay nội dung bảy thử thách và màu bìa theo tầng.',
  },
  {
    id: 'ps-feedback',
    kind: 'công cụ',
    name: 'BỘ CÔNG CỤ CHẤM BÀI CHO CỐ VẤN',
    tier: 'Dành cho cố vấn, dùng ở mọi cấp độ',
    quantity: '1 bộ: mẫu chấm + thư viện 20 phác đồ lỗi + ngân hàng câu nhận xét',
    duration: 'Mục tiêu: 12 phút cho một bài chấm đầy đủ bốn phần',
    purpose:
      'Bảo đảm mọi bài nộp đều nhận được phản hồi bốn phần trong 48 giờ, và chất lượng phản hồi không phụ thuộc vào cố vấn nào chấm.',
    structure: [
      {t: 'Phần 1', content: 'Mẫu nhận xét có sẵn khung bốn tiêu chí và ô so sánh với lần trước.'},
      {t: 'Phần 2', content: 'Bảng chọn lỗi mục tiêu: nhập tần suất lỗi, công cụ gợi ý lỗi nào đáng tấn công nhất.'},
      {t: 'Phần 3', content: 'Thư viện 20 phác đồ khắc phục — tra mã lỗi, dán vào, cá nhân hoá bằng câu sai của học viên.'},
      {t: 'Phần 4', content: 'Bộ bài luyện 14 ngày gắn sẵn theo từng mã lỗi.'},
    ],
    specs: [
      'Dạng bảng tính hoặc biểu mẫu, không dùng văn bản trắng — cố vấn phải điền được trong 12 phút.',
      'Mã lỗi thống nhất toàn học viện: PA (phát âm), GR (ngữ pháp), WR (viết), SP (nói), RD (đọc), LS (nghe), VO (từ vựng).',
      'Có ô bắt buộc điền hai điểm mạnh cụ thể — không điền thì không nộp được biểu mẫu.',
      'Tự động nhắc khi quá 40 giờ chưa trả bài.',
    ],
    reusableAssets:
      'Thư viện phác đồ dùng chung cho toàn bộ cố vấn. Mỗi phác đồ mới được viết một lần rồi dùng mãi.',
  },
  {
    id: 'ps-audio-mindset',
    kind: 'audio',
    name: 'BỘ AUDIO LẬP TRÌNH TƯ DUY',
    tier: 'Xuyên suốt — nghe vào pha GIEO của mỗi cấp độ',
    quantity: '25 bài, mỗi cấp độ một bài',
    duration: '8–12 phút mỗi bài',
    purpose:
      'Chạy pha GIEO ngay cả khi học viên không có mặt cố vấn. Dẫn dắt bằng giọng nói, có khoảng lặng để học viên tự trả lời.',
    structure: [
      {t: '0:00–1:30', content: 'Đưa về trạng thái: thở bốn nhịp, thả vai, chuyển sự chú ý vào bên trong.'},
      {t: '1:30–4:00', content: 'Gọi ra niềm tin cũ. Có khoảng lặng 20 giây để học viên tự trả lời.'},
      {t: '4:00–7:00', content: 'Dựng lại khung: dẫn tới một bằng chứng phản chứng từ chính đời họ.'},
      {t: '7:00–9:00', content: 'Đặt neo trạng thái: khuếch đại ký ức thành công rồi neo vào cử chỉ tay.'},
      {t: '9:00–11:00', content: 'Diễn tập tương lai: chạy thử cấp độ sắp tới, kèm nhánh xử lý khi gặp khó.'},
      {t: '11:00–12:00', content: 'Quay về hiện tại, chốt một hành động sẽ làm trong 24 giờ tới.'},
    ],
    specs: [
      'Giọng đọc chậm hơn tốc độ thường khoảng 20%, tông trầm và đều.',
      'Khoảng lặng thật, tối thiểu 15 giây — không lấp bằng nhạc.',
      'Nhạc nền cực nhẹ, dưới -30dB, hoặc không có nhạc.',
      'Bản tiếng Việt cho học viên Tầng 1 và 2; bản tiếng Anh cho Tầng 3, 4, 5 — đây cũng là đầu vào ngôn ngữ.',
    ],
    reusableAssets:
      'Phần đưa về trạng thái và phần neo dùng chung một bản thu cho cả 25 bài. Chỉ thay phần giữa.',
  },
  {
    id: 'ps-case',
    kind: 'video',
    name: 'VIDEO CHÂN DUNG HỌC VIÊN',
    tier: 'Dùng cho tuyển sinh và cho pha GIEO',
    quantity: '25 video — một cho mỗi cấp độ, quay chính học viên vừa vượt cấp đó',
    duration: '3–5 phút',
    purpose:
      'Bằng chứng xã hội mạnh nhất không phải lời quảng cáo — mà là một người giống hệt học viên, sáu tháng trước cũng ở đúng chỗ họ đang đứng.',
    structure: [
      {t: '0:00–0:30', content: 'Bản ghi âm CỦA CHÍNH HỌ ở ngày đầu tiên. Không chỉnh sửa, không làm đẹp.'},
      {t: '0:30–1:30', content: 'Họ kể lại điều khó nhất và khoảnh khắc suýt bỏ cuộc.'},
      {t: '1:30–3:00', content: 'Điều gì đã tạo ra thay đổi — cụ thể, không nói chung chung.'},
      {t: '3:00–4:00', content: 'Bản ghi âm của họ HÔM NAY, cùng nội dung với đoạn mở đầu.'},
      {t: '4:00–5:00', content: 'Một lời nhắn cho người đang ở cấp độ mà họ vừa rời khỏi.'},
    ],
    specs: [
      'Bắt buộc có cặp ghi âm đầu–cuối cùng nội dung. Đây là toàn bộ sức mạnh của video này.',
      'Không kịch bản, không đọc giấy. Phỏng vấn và cắt dựng.',
      'Không dùng nhạc kích động hay lời dẫn thổi phồng — sự thật đủ mạnh rồi.',
      'Xin phép sử dụng hình ảnh bằng văn bản trước khi quay.',
    ],
    reusableAssets:
      'Quy trình lưu bản ghi âm ngày đầu cho MỌI học viên, ngay từ buổi nhập học. Không có bản ghi ngày đầu thì không bao giờ làm được video này.',
  },
  {
    id: 'ps-club',
    kind: 'tài liệu',
    name: 'BỘ KỊCH BẢN DẪN CLUB',
    tier: 'Dành cho học viên Tầng 5 và cố vấn',
    quantity: '7 kịch bản club × 12 buổi = 84 giáo án buổi',
    duration: '45–60 phút mỗi buổi',
    purpose:
      'Để bất kỳ ai ở Tầng 5 cũng dẫn được một buổi có chất lượng, không phụ thuộc vào kinh nghiệm cá nhân.',
    structure: [
      {t: 'Trang 1', content: 'Mục tiêu buổi, số người, vật dụng cần chuẩn bị.'},
      {t: 'Trang 2', content: 'Kịch bản theo phút, có lời thoại mẫu cho phần mở và phần chuyển.'},
      {t: 'Trang 3', content: 'Bộ câu hỏi dự phòng khi nhóm im lặng hoặc lạc đề.'},
      {t: 'Trang 4', content: 'Xử lý ba tình huống khó: người nói lấn, người im lặng, nhóm chuyển sang tiếng Việt.'},
      {t: 'Trang 5', content: 'Phiếu đánh giá ẩn danh phát cuối buổi.'},
    ],
    specs: [
      'Viết ở dạng ai cũng dùng được, không giả định người dẫn có kinh nghiệm sư phạm.',
      'Mọi phần chuyển đều có lời thoại mẫu — chỗ người dẫn mới lúng túng nhất.',
      'Có phiên bản trực tuyến và phiên bản trực tiếp cho mỗi buổi.',
      'In A4 gấp đôi, để mở trên bàn trong lúc dẫn.',
    ],
    reusableAssets: 'Một khuôn giáo án chung, thay nội dung theo từng loại club.',
  },
  {
    id: 'ps-poster',
    kind: 'bộ ảnh',
    name: 'BỘ ẤN PHẨM MÔI TRƯỜNG',
    tier: 'Dựng lớp môi trường vật lý cho học viên',
    quantity: '15 mẫu in',
    duration: '—',
    purpose:
      'Lớp môi trường vật lý là thứ học viện có thể tặng học viên với chi phí gần bằng không nhưng tác động rất lớn.',
    structure: [
      {t: 'Mẫu 1', content: 'Lịch 90 ngày khổ A3 để tô đen, có ô ghi năm con số hằng tuần.'},
      {t: 'Mẫu 2', content: 'Thẻ bản sắc khổ danh thiếp — dán lên gương phòng tắm.'},
      {t: 'Mẫu 3', content: 'Bảng 44 âm IPA khổ A2, có ký hiệu và từ ví dụ.'},
      {t: 'Mẫu 4', content: 'Poster tuyên ngôn 8 dòng, khổ A3, dán bàn học.'},
      {t: 'Mẫu 5', content: 'Sơ đồ tháp 5 tầng và 25 cấp độ, có ô đánh dấu cấp đã qua.'},
      {t: 'Mẫu 6–15', content: 'Thẻ phác đồ 20 lỗi phổ biến, khổ bỏ túi, tra nhanh khi tự rà bài.'},
    ],
    specs: [
      'In một màu chủ đạo theo tầng, để nhìn là biết học viên đang ở tầng nào.',
      'Giấy có bề mặt viết bút dạ xoá được cho lịch tô đen.',
      'Có bản tải về in tại nhà cho học viên ở xa.',
      'Chữ đủ lớn để đọc từ cách hai mét — poster chữ nhỏ là poster không ai đọc.',
    ],
    reusableAssets: 'Một bộ khuôn đồ hoạ chung cho toàn hệ thống, chỉ thay màu theo tầng.',
  },
];

/* ------------------------ TRÌNH TỰ TRIỂN KHAI ---------------------------- */

export const ROLLOUT = {
  title: 'Trình tự triển khai — làm gì trước, làm gì sau',
  note:
    'Không sản xuất hết 268 video rồi mới mở lớp. Sản xuất theo tầng, chạy thử với một nhóm nhỏ, rồi mới nhân rộng. Tầng 1 đủ dùng cho sáu tháng đầu của mọi học viên.',
  phases: [
    {
      phase: 'Giai đoạn 1 — 8 tuần',
      goal: 'Mở được lớp đầu tiên với Tầng 1 hoàn chỉnh',
      items: [
        '44 video cận miệng IPA — quay gọn trong 2 buổi',
        '30 đoạn shadowing mức A1–A2 + transcript đã đánh dấu',
        '50 đoạn chép chính tả mức dễ',
        '5 sổ tay cấp độ của Tầng 1',
        'Bộ công cụ chấm bài + 20 phác đồ lỗi',
        'Bộ ấn phẩm môi trường 15 mẫu',
      ],
    },
    {
      phase: 'Giai đoạn 2 — 12 tuần',
      goal: 'Mở Tầng 2 và 3, bắt đầu có học viên nói',
      items: [
        '60 video bài giảng của chuỗi Nền Móng và Âm Thanh',
        '120 đoạn shadowing mức B1',
        '600 ảnh bối cảnh cho 6 chủ đề đầu',
        '10 sổ tay cấp độ của Tầng 2 và 3',
        '84 giáo án dẫn club',
        '25 bài audio lập trình tư duy',
      ],
    },
    {
      phase: 'Giai đoạn 3 — 16 tuần',
      goal: 'Hoàn thiện Tầng 4 và 5, có lứa học viên đầu tiên lên làm cố vấn',
      items: [
        '108 video bài giảng còn lại',
        '600 ảnh bối cảnh còn lại',
        '10 sổ tay cấp độ của Tầng 4 và 5',
        'Video chân dung học viên — quay lứa đầu tiên vượt cấp',
        'Bộ tài liệu đào tạo cố vấn nội bộ',
      ],
    },
  ],
};
