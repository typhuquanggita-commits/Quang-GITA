/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {TAB_QUYEN, tabDuocXem, VAI_MAC_DINH} from './phien';

/* ==========================================================================
   TẦNG SEO

   NÓI THẲNG TRƯỚC MỘT ĐIỀU, VÌ ĐÂY LÀ CHỖ NGƯỜI TA HỨA LIỀU NHIỀU NHẤT
     Không ai bảo đảm được vị trí số một trên Google, và ai nói bảo đảm được
     thì đang bán một thứ họ không có. Thứ hạng phụ thuộc vào đối thủ trong
     cùng truy vấn, vào số trang uy tín dẫn link về, vào tuổi và lịch sử của
     tên miền, và vào hệ thống xếp hạng của Google — không thứ nào trong đó
     nằm trong mã nguồn.

     Cái mã nguồn quyết định được là ĐIỀU KIỆN CẦN: trang có tồn tại dưới
     dạng một địa chỉ riêng không, máy tìm kiếm đọc được nội dung không, và
     trang có đáng tin về mặt kỹ thuật không. Thiếu điều kiện cần thì mọi
     nỗ lực khác đều vô ích; đủ điều kiện cần thì phần còn lại thuộc về nội
     dung và uy tín ngoài đời.

   VẤN ĐỀ GỐC ĐÃ TÌM RA
     Trước tầng này, cả ứng dụng có 40 thẻ nội dung nhưng chỉ có ĐÚNG MỘT
     địa chỉ. Google xếp hạng địa chỉ, không xếp hạng thẻ. Bốn mươi thẻ nằm
     sau một địa chỉ thì Google chỉ có một thứ để xếp hạng, và ba mươi chín
     thẻ còn lại không tồn tại đối với người đang tìm kiếm.

     Cho mỗi thẻ một địa chỉ riêng là việc có đòn bẩy lớn nhất trong toàn bộ
     phần này, và nó là việc kỹ thuật thuần tuý — làm được ngay.

   BỐN CHỮ E-E-A-T VÀ CHỖ MÃ NGUỒN GIÚP ĐƯỢC
     Google đánh giá Kinh nghiệm, Chuyên môn, Thẩm quyền, Đáng tin. Mã nguồn
     KHÔNG tạo ra được uy tín. Nhưng nó bày ra được những gì đã có: phương
     pháp công khai, con số kiểm được, giới hạn nói thẳng, và bảng đối chiếu
     chuẩn quốc tế. Trang giấu giới hạn thì mất điểm đáng tin; trang ghi rõ
     mình chưa làm được gì thì ngược lại.
   ========================================================================== */

export const SEO_CREED = {
  name: 'TẦNG SEO',
  claim:
    'Mỗi thẻ nội dung có một địa chỉ riêng, một tiêu đề riêng, một mô tả riêng, và dữ liệu có cấu trúc riêng. Bốn mươi thẻ nay là bốn mươi trang xếp hạng được, không phải một.',
  khongHuaThuHang:
    'Không ai bảo đảm được vị trí số một, và ai nói bảo đảm được thì đang bán một thứ họ không có. Mã nguồn lo ĐIỀU KIỆN CẦN: có địa chỉ riêng, máy tìm đọc được, kỹ thuật đáng tin. Phần còn lại thuộc về nội dung và uy tín ngoài đời.',
  vanDeGoc:
    'Trước tầng này, 40 thẻ nội dung nằm sau đúng một địa chỉ. Google xếp hạng địa chỉ chứ không xếp hạng thẻ, nên 39 thẻ không tồn tại với người đang tìm kiếm.',
  eeat:
    'Mã nguồn không tạo ra uy tín, nhưng bày ra được cái đã có: phương pháp công khai, con số kiểm được, và giới hạn nói thẳng. Trang giấu giới hạn thì mất điểm đáng tin.',
};

/**
 * Thẻ nhận địa chỉ gốc. Phải là thẻ mặc định của ứng dụng, nếu không thì
 * người vào thẳng địa chỉ gốc sẽ thấy một thẻ khác với người bấm vào từ
 * trong ứng dụng — và hai trang cùng nội dung ở hai địa chỉ là trùng lặp.
 */
export const TAB_GOC = 'tuyen';

/** Địa chỉ gốc. Đổi ở đây thì sitemap và canonical đổi theo. */
export const GOC = 'https://engwin365.gita365.vn';

export interface TrangSeo {
  tabId: string;
  duongDan: string;
  tieuDe: string;
  moTa: string;
  /* Truy vấn mà trang này thật sự trả lời được, viết như người Việt gõ. */
  truyVan: string[];
  /** Mức ưu tiên trong sitemap, 0..1. */
  uuTien: number;
  /**
   * Khách vãng lai có mở được trang này không.
   *
   * KHÔNG tự gõ tay: tính từ chính bảng phân quyền, nên sửa quyền ở
   * data/phanquyen.ts là chỗ này đổi theo, không có đường lệch.
   */
  congKhai: boolean;
}

/* ==========================================================================
   BỐN MƯƠI TRANG

   Mỗi mô tả viết cho NGƯỜI ĐANG TÌM, không viết cho máy. Nguyên tắc:
     · nói trang này trả lời được câu hỏi gì, bằng con số
     · dưới 160 ký tự, vì Google cắt ở khoảng đó
     · không nhồi từ khoá — nhồi từ khoá là tín hiệu xấu từ hơn mười năm nay
   ========================================================================== */

const T: [string, string, string, string, string[], number][] = [
  /*
   * Thẻ 'tuyen' là thẻ mặc định của ứng dụng nên nó nhận địa chỉ GỐC. Trang
   * gốc phải trả lời được câu hỏi rộng nhất mà người tìm kiếm gõ vào, nên
   * tiêu đề và mô tả của nó nói về cả lộ trình chứ không chỉ nói về việc
   * chọn tuyến.
   */
  ['tuyen', 'lo-trinh-tong-quan', 'Lộ trình học tiếng Anh 0 đến IELTS 8.0 trong 3 năm',
   'Toàn bộ lộ trình 1.095 ngày chia thành 25 cấp độ và 5 tầng, kèm phép đo cho từng chặng. Có cả tuyến 22 tháng luyện thi chuyên Anh vào 10.',
   ['lộ trình học tiếng anh từ đầu', 'học ielts từ con số 0', 'lộ trình ielts 3 năm',
    'nên học ielts hay thi chuyên anh'], 1.0],
  ['chugita', 'mo-thuc-gita', 'Mô thức GITA: Goal, Inspirits, Talent, Action',
   'Bốn chữ GITA với 31 thành tố, kèm dấu hiệu khi có và dấu hiệu khi thiếu từng chữ. Không phải khẩu hiệu.',
   ['mô thức gita', 'phương pháp học tập gita'], 0.7],
  ['gita', 'gita-hoa-ba-san', 'GITA hoá ba sân: gia đình, trường học, xã hội',
   '12 bước × 3 sân thành 36 ô, mỗi ô một việc làm được trong tuần. Học ở lớp mà nhà không đổi thì tiến bộ mất ở chỗ chuyển sân.',
   ['áp dụng phương pháp học ở nhà', 'phụ huynh đồng hành con học tiếng anh'], 0.7],
  ['charter', 'hien-chuong-ca-nhan', 'Hiến chương cá nhân: viết cam kết học của chính mình',
   'Mẫu hiến chương viết ở ngôi thứ nhất, buộc người học nói rõ đích, cái giá phải trả, và điều kiện bỏ cuộc.',
   ['cách đặt mục tiêu học tiếng anh', 'cam kết học tập'], 0.6],
  ['myplan', 'ke-hoach-ca-nhan', 'Kế hoạch cá nhân hoá theo quỹ thời gian thật của bạn',
   'Nhập số phút học mỗi ngày và ngày thi, hệ thống tính ngược ra lộ trình khả thi hoặc nói thẳng là không đủ giờ.',
   ['mỗi ngày học tiếng anh bao nhiêu phút', 'lập kế hoạch học tiếng anh'], 0.9],
  ['sprint', 'chu-ky-21-90-ngay', 'Chu kỳ tăng tốc 21 và 90 ngày',
   'Hai chu kỳ có cấu trúc, có cổng thoát và có phép đo. Dùng khi cần kết quả thấy được trong thời gian ngắn.',
   ['học tiếng anh cấp tốc 90 ngày', 'thử thách 21 ngày tiếng anh'], 0.7],
  ['dossier', 'ho-so-365-ngay', 'Hồ sơ 365 ngày: mỗi ngày một bài, có bài ra vòng',
   '365 ngày học chia thành 16 vòng 21 ngày, mỗi vòng một bài thi ra vòng. Xem đủ từng ngày trước khi bắt đầu.',
   ['giáo án học tiếng anh 365 ngày', 'học tiếng anh mỗi ngày'], 0.8],
  ['assistant', 'tro-ly-lo-trinh', 'Trợ lý: hỏi đáp về lộ trình theo tình huống của bạn',
   'Nhập cấp độ, quỹ giờ và triệu chứng đang gặp, nhận về đơn kê cụ thể từ kho 1.000 giải pháp.',
   ['học tiếng anh mãi không tiến bộ', 'mất gốc tiếng anh nên bắt đầu từ đâu'], 0.8],
  ['assess', 'kho-1000-giai-phap', 'Kho 1.000 giải pháp cho 40 triệu chứng học tập',
   '40 triệu chứng × 25 cấp độ, mỗi ô một đơn kê có thời lượng và phép đo. Tra theo đúng chỗ đang mắc.',
   ['học tiếng anh không vào', 'nghe tiếng anh không hiểu phải làm sao'], 0.9],
  ['overview', 'tong-quan-he-thong', 'Tổng quan hệ thống ENGWIN365',
   'Toàn cảnh các tầng của hệ thống và cách chúng nối nhau, kèm con số thật của từng tầng.',
   ['engwin365', 'hệ thống học tiếng anh gita365'], 0.8],
  ['roadmap', 'cot-moc-lo-trinh', 'Cột mốc lộ trình theo quý và theo năm',
   'Mỗi cột mốc có tiêu chí đạt bằng số, không bằng cảm giác. Biết trước mình phải ở đâu vào tháng nào.',
   ['mốc học ielts theo tháng', 'bao lâu thì lên được ielts 6.5'], 0.8],
  ['chuyen', 'thi-chuyen-anh-ha-noi', 'Luyện thi chuyên Anh vào 10 Hà Nội: lộ trình 22 tháng',
   'Cấu trúc đề chuyên Sở, công thức điểm xét tuyển, và lộ trình 22 tháng chia theo bậc năng lực đầu vào.',
   ['thi chuyên anh vào 10 hà nội', 'ôn thi chuyên anh sư phạm', 'luyện thi chuyên ngoại ngữ'], 1.0],
  ['exams', 'bo-de-tot-nghiep', 'Bộ đề tốt nghiệp từng vòng và từng giai đoạn',
   'Đề thi ra vòng cho từng chặng, kèm điều kiện đạt và hướng xử lý khi chưa đạt.',
   ['đề thi tiếng anh theo giai đoạn', 'kiểm tra trình độ tiếng anh'], 0.7],
  ['methods', 'phuong-phap-hoc', 'Phương pháp học: mỗi phương pháp chữa được cái gì',
   'Mỗi phương pháp ghi rõ nó chữa gì, không chữa được gì, và chặn khi nào. Không có phương pháp vạn năng.',
   ['phương pháp học tiếng anh hiệu quả', 'cách học tiếng anh nhanh nhất'], 0.9],
  ['drills', 'bai-luyen-theo-ky-nang', 'Bài luyện theo từng kỹ năng, có định mức thời gian',
   'Bài luyện cho nghe, nói, đọc, viết, từ vựng, ngữ pháp và phát âm, mỗi bài một định mức phút và một phép đo.',
   ['bài tập luyện nghe tiếng anh', 'luyện phát âm tiếng anh'], 0.8],
  ['lectures', 'chuoi-bai-giang', 'Chuỗi bài giảng theo lộ trình',
   'Các chuỗi bài giảng nối nhau theo đúng thứ tự học, mỗi bài gắn với một bài luyện cụ thể.',
   ['bài giảng tiếng anh theo lộ trình'], 0.7],
  ['phieu', 'phieu-luyen', '2.000 phiếu luyện với 40.000 câu, chia 5 phần',
   'Mỗi phiếu 20 câu chia năm phần nối nhau, kèm nhiệm vụ chia sẻ và ngưỡng KPI 90% để xét nâng cấp.',
   ['phiếu bài tập tiếng anh', 'bài tập tiếng anh theo cấp độ'], 0.9],
  ['chuyende', 'bo-phieu-chuyen-de', 'Bộ phiếu chuyên đề: 7 loại phiếu cho mỗi chuyên đề',
   '80 chuyên đề × 7 loại phiếu, mỗi phiếu kèm một phiếu giải có bảng phân tích chuyên sâu.',
   ['chuyên đề ngữ pháp tiếng anh', 'tài liệu ôn thi theo chuyên đề'], 0.9],
  ['bode', 'bo-de-phan-tich', 'Bộ 2.000 đề với bảy chiều phân tích',
   'Mỗi phiếu một bảng: kiến thức, dạng bài, đọc vị, phương pháp, bước giải, mẹo xử lý, bí kíp. Kèm barem chấm.',
   ['cách đọc vị dạng bài tiếng anh', 'mẹo làm bài thi tiếng anh'], 0.8],
  ['dethi', 'de-thi-mau', 'Đề thi mẫu trọn vẹn kèm lời giải và barem',
   'Bốn đề theo cấu trúc thật: chuyên Anh Sở Hà Nội, Ngoại ngữ chung vào 10, chuyên KHTN vòng 2, tốt nghiệp THPT.',
   ['đề thi chuyên anh vào 10 có đáp án', 'đề thi thử tiếng anh vào 10 hà nội'], 1.0],
  ['lambai', 'lam-bai-xem-dap-an', '600 câu có đáp án và lời giải cho từng lựa chọn',
   'Làm bài trực tuyến trên 50 chuyên đề. Mỗi câu có bốn nhận xét cho bốn lựa chọn, nói rõ chỗ lập luận gãy.',
   ['bài tập tiếng anh có đáp án', 'trắc nghiệm tiếng anh online có giải thích'], 1.0],
  ['hoso', 'ho-so-hoc-vien', 'Hồ sơ học viên và lộ trình cá nhân hoá',
   'Mỗi lần làm bài để lại một bản ghi. Hồ sơ sinh ra lộ trình cá nhân hoá bằng phép tính trên số liệu thật.',
   ['theo dõi tiến độ học tiếng anh'], 0.7],
  ['giangsau', 'bai-giang-chuyen-sau', '2.000 bài giảng chuyên sâu theo 4 trụ',
   'Tư duy, kiến thức, kỹ năng, phương pháp — bốn trụ × 20 chủ đề × 25 cấp độ, tổng 613 giờ.',
   ['bài giảng tiếng anh chuyên sâu', 'học tiếng anh có hệ thống'], 0.8],
  ['playbooks', 'bi-kip-chien-thuat', 'Bí kíp: 24 chiến thuật làm bài và học tập',
   'Mỗi chiến thuật ghi rõ dùng khi nào, và quan trọng hơn, không dùng khi nào.',
   ['mẹo thi tiếng anh', 'chiến thuật làm bài thi tiếng anh'], 0.8],
  ['habits', 'thoi-quen-hoc', 'Thói quen học: giữ chuỗi ngày và phục hồi khi đứt',
   'Cách dựng thói quen học bền, và cách nối lại khi đã đứt chuỗi mà không bỏ cuộc.',
   ['duy trì thói quen học tiếng anh', 'học tiếng anh đều đặn mỗi ngày'], 0.7],
  ['mindset', 'tu-duy-hoc-tap', 'Tư duy học tập: vượt cao nguyên năng lực',
   'Cách nhận ra cao nguyên năng lực bằng số liệu, và cách vượt qua nó bằng đổi nội dung chứ không đổi lượng.',
   ['học tiếng anh mãi không lên', 'chững lại khi học tiếng anh'], 0.8],
  ['clubs', 'cau-lac-bo', 'Câu lạc bộ và nhóm học: thi đua có cấu trúc',
   'Mô hình nhóm học có luật, có phép đo và có cổng thoát, thay vì nhóm tự phát rồi tan.',
   ['nhóm học tiếng anh', 'câu lạc bộ tiếng anh'], 0.6],
  ['resources', 'tai-lieu-nguon', '45 nguồn tài liệu đã sàng lọc',
   'Nguồn học liệu chọn theo tiêu chí rõ ràng, ghi rõ hợp với cấp độ nào và không hợp với ai.',
   ['tài liệu học tiếng anh miễn phí', 'nguồn học tiếng anh uy tín'], 0.8],
  ['chuan', 'chuan-quoc-te', 'Đối chiếu 16 chuẩn quốc tế: 9 đạt, 6 một phần, 1 chưa',
   'Bảng đối chiếu WCAG, CEFR, Bloom, UDL và các chuẩn khác, ghi rõ chuẩn nào chưa đạt.',
   ['tiêu chuẩn dạy tiếng anh quốc tế', 'chất lượng trung tâm tiếng anh'], 0.8],
  ['quyen', 'phan-quyen', 'Phân quyền: 39 quyền, 18 bậc, 8 nhóm vai',
   'Hệ phân quyền theo cấp độ học viên và cấp độ giáo viên, kèm nguyên tắc tách bạch trách nhiệm.',
   ['quản lý trung tâm tiếng anh', 'phân quyền hệ thống học tập'], 0.5],
  ['academy', 'trien-ly-hoc-vien', 'Triết lý và mô thức huấn luyện của học viện',
   'Tháp học tập 5 tầng, chu trình huấn luyện, và những gì học viện cam kết lẫn không cam kết.',
   ['trung tâm tiếng anh uy tín', 'gita365'], 0.8],
  ['levels', 'he-25-cap-do', 'Hệ 25 cấp độ: mỗi cấp một tiêu chí đạt bằng số',
   'Từ BẮT SÓNG tới cấp cao nhất, mỗi cấp ghi rõ nhiệm vụ, thử thách và tiêu chí đạt.',
   ['trình độ tiếng anh của tôi', 'kiểm tra trình độ tiếng anh online'], 0.9],
  ['grading', 'cham-bai', 'Chấm bài: thang chấm và cách phản hồi',
   'Thang chấm cho từng kỹ năng và nguyên tắc phản hồi, để hai người chấm ra kết quả gần nhau.',
   ['cách chấm bài viết tiếng anh', 'thang điểm ielts writing'], 0.7],
  ['podcast', 'podcast-hoc-tieng-anh', 'Podcast học tiếng Anh theo lộ trình',
   'Các tập podcast gắn với từng chặng của lộ trình, kèm kịch bản và bản chép.',
   ['podcast học tiếng anh', 'nghe tiếng anh cho người mới'], 0.6],
  ['certify', 'chung-nhan', 'Chứng nhận hoàn thành và điều kiện cấp',
   'Điều kiện cấp chứng nhận, quy trình duyệt hai người, và những gì chứng nhận này không nói lên.',
   ['chứng chỉ tiếng anh'], 0.5],
  ['casting', 'tuyen-giong-doc', 'Tuyển giọng đọc và chuẩn phát âm',
   'Tiêu chí chọn giọng đọc cho học liệu, và cách đo chuẩn phát âm bằng số liệu.',
   ['giọng đọc chuẩn tiếng anh'], 0.4],
  ['brand', 'nhan-dien-thuong-hieu', 'Bộ nhận diện ENGWIN365',
   'Ý tưởng vòng tròn còn hở, bảng màu, quy tắc chữ và giọng nói của thương hiệu.',
   ['nhận diện thương hiệu giáo dục'], 0.4],
  ['decuong', 'de-cuong-hoc-tieng-anh', 'Đề cương học tiếng Anh 10 tầng, 146 tuần có phép đo',
   '10 đề cương cho 2 tuyến × 5 tầng, mỗi tuần một giáo án và một phép đo, kèm 36 ranh giới KHÔNG dạy để không dạy tràn.',
   ['đề cương học tiếng anh', 'giáo án tiếng anh theo tuần', 'lộ trình học tiếng anh có đề cương'], 0.8],
  ['baitest', 'test-chuyen-sau', 'Test chuyên sâu: tìm đúng chỗ gãy thay vì chấm điểm',
   '4 bài test theo thang Bloom 5 bậc cho 4 trụ. Dừng ở bậc nào thì thiếu đúng thứ của bậc đó, kèm đơn kê cho từng chỗ gãy.',
   ['test trình độ tiếng anh', 'kiểm tra năng lực học tập', 'học mãi không tiến bộ vì sao'], 0.8],
  ['camnang', 'cam-nang-diem-10', 'Cẩm nang ôn luyện điểm 10 — 54 cách chặn mất điểm',
   '5 cẩm nang cho 5 phần thi, 18 mục kỹ thuật tách 9 điểm khỏi 10 điểm, mỗi mục có cách chặn và cách tự kiểm.',
   ['cách được điểm 10 tiếng anh', 'mẹo thi tiếng anh điểm cao', 'ôn thi tiếng anh vào 10'], 0.9],
  ['sat', 'luyen-thi-sat', 'Luyện thi SAT: cấu trúc, 36 dạng bài và lịch thi 2026–2027',
   'Bài SAT số hoá thích ứng theo mô-đun: 98 câu, 134 phút, 8 miền kiến thức và 36 dạng bài có đọc vị, bước giải và ngưỡng giây.',
   ['luyện thi sat', 'sat là gì', 'cấu trúc đề sat', 'lịch thi sat 2026', 'sat bao nhiêu điểm là cao'], 1.0],
  ['ielts9', 'ielts-9-cham', 'IELTS 9.0: khoảng cách thật từ 8.0 lên 9.0',
   'Biên lỗi một câu ở Nghe và Đọc, tiêu chí đổi chất ở Viết và Nói, và toàn bộ 4 tổ hợp bốn kỹ năng đạt 9.0 tổng.',
   ['ielts 9.0', 'cách lên 9.0 ielts', 'ielts 8.5 lên 9', 'điểm tổng ielts tính thế nào'], 0.9],
  ['training', 'dao-tao-giao-vien', 'Đào tạo giáo viên và kiểm định năng lực',
   'Khung đào tạo người dạy theo 5 nấc nghề, kèm cổng kiểm định cho từng nấc.',
   ['đào tạo giáo viên tiếng anh', 'trở thành giáo viên ielts'], 0.7],
  ['studio', 'xuong-hoc-lieu', 'Xưởng học liệu: quy trình sản xuất',
   'Quy trình làm học liệu từ kịch bản tới bản phát hành, kèm tiêu chuẩn kỹ thuật.',
   ['sản xuất học liệu tiếng anh'], 0.4],
];

export const TRANG_SEO: TrangSeo[] = T.map(([tabId, duongDan, tieuDe, moTa, truyVan, uuTien]) => ({
  tabId, duongDan, tieuDe, moTa, truyVan, uuTien,
  congKhai: tabDuocXem(VAI_MAC_DINH, tabId),
}));

/* ==========================================================================
   TRANG CÔNG KHAI VÀ TRANG NỘI BỘ — VÌ SAO PHẢI TÁCH

   Năm thẻ trong hệ thống chỉ mở cho vai vận hành: chấm bài, đào tạo giáo
   viên, podcast, tuyển giọng đọc, xưởng học liệu. Khách vãng lai vào thẳng
   địa chỉ của chúng thì màn hình đưa về thẻ khác — đó là hành vi đúng của
   phân quyền.

   Nhưng nếu những địa chỉ đó nằm trong sitemap thì hỏng: người tìm kiếm bấm
   vào kết quả, vào tới nơi, bị đẩy sang một trang khác, rồi bấm quay lại.
   Google đọc đúng chuỗi hành vi đó là "trang không đáp ứng truy vấn" — vừa
   mất một kết quả, vừa để lại tín hiệu xấu cho cả tên miền. Google cũng nói
   thẳng trong tài liệu của họ: đừng đưa vào chỉ mục những trang người dùng
   không mở được.

   Nên: sitemap, liên kết nội bộ và bản dựng sẵn CHỈ gồm trang công khai.
   Trang nội bộ vẫn chạy bình thường trong ứng dụng, nhưng mang thẻ
   noindex để không lọt vào chỉ mục qua đường khác.
   ========================================================================== */
export const TRANG_CONG_KHAI: TrangSeo[] = TRANG_SEO.filter((t) => t.congKhai);
export const TRANG_NOI_BO: TrangSeo[] = TRANG_SEO.filter((t) => !t.congKhai);

export const TRANG_THEO_TAB = Object.fromEntries(TRANG_SEO.map((t) => [t.tabId, t])) as Record<string, TrangSeo>;
export const TAB_THEO_DUONG_DAN = Object.fromEntries(TRANG_SEO.map((t) => [t.duongDan, t.tabId])) as Record<string, string>;

/** Đường dẫn của một thẻ. Thẻ đầu tiên nằm ở gốc, không có đuôi. */
export const duongDanCuaTab = (tabId: string): string => {
  const t = TRANG_THEO_TAB[tabId];
  if (!t) return '/';
  return t.tabId === TAB_GOC ? '/' : `/${t.duongDan}`;
};

export const tabCuaDuongDan = (p: string): string | undefined => {
  const s = p.replace(/^\/+|\/+$/g, '');
  if (!s) return TAB_GOC;
  return TAB_THEO_DUONG_DAN[s];
};

/* --------------------------- ẢNH CHIA SẺ (OG) --------------------------- */
/*
 * Mỗi trang một ảnh 1200×630 sinh sẵn lúc đóng gói. Không có ảnh thì mọi
 * liên kết dán vào Zalo, Facebook hay Messenger hiện ra một ô trắng — và ô
 * trắng thì gần như không ai bấm. Đây là chỗ ảnh hưởng thẳng tới lượt bấm,
 * không phải chỗ trang trí.
 *
 * Địa chỉ ảnh phải là địa chỉ TUYỆT ĐỐI: máy đọc của mạng xã hội không có
 * ngữ cảnh trang để ghép đường dẫn tương đối.
 */
export const anhOg = (tabId: string): string => {
  const t = TRANG_THEO_TAB[tabId];
  return `${GOC}/og/${t ? t.duongDan : 'lo-trinh-tong-quan'}.jpg`;
};

/* ------------------------- DỮ LIỆU CÓ CẤU TRÚC -------------------------- */
/*
 * JSON-LD là cách nói với máy tìm kiếm bằng ngôn ngữ nó hiểu chắc chắn, thay
 * vì để nó đoán từ chữ trên trang. Mọi loại dùng ở đây đều có thật trong
 * schema.org và đều được Google hỗ trợ; không bịa ra loại nào.
 *
 * BA THỨ CỐ TÌNH KHÔNG DÙNG, VÀ VÌ SAO
 *   · FAQPage — cần cặp hỏi/đáp HIỆN RA trên trang. Đánh dấu hỏi/đáp không
 *     có trên trang là vi phạm chính sách và bị phạt. Ngoài ra từ 2023
 *     Google chỉ còn hiện kết quả FAQ cho trang y tế và cơ quan nhà nước,
 *     nên kể cả làm đúng cũng không được gì.
 *   · SearchAction (ô tìm kiếm trong kết quả) — Google đã ngừng tính năng
 *     này từ cuối 2024. Giữ lại chỉ là mã chết.
 *   · hreflang — chỉ có nghĩa khi có nhiều bản ngôn ngữ. Trang này chỉ có
 *     tiếng Việt, nên hreflang tự trỏ về chính nó không thêm được gì.
 *
 * VỤN BÁNH MÌ CHỈ HAI BẬC
 *   Địa chỉ ở đây phẳng: mọi trang nằm ngay dưới gốc, không có thư mục
 *   trung gian. Dựng ba bậc là bịa ra một tầng không tồn tại — Google đối
 *   chiếu vụn bánh mì với địa chỉ thật, nên bịa thì mất luôn cả vụn.
 */

/*
 * Số phút mỗi ngày và số ngày của chương trình. Đây là hai con số mà dữ
 * liệu có cấu trúc đem đi khai báo với Google, nên chúng phải đúng.
 *
 * VÌ SAO GHI SỐ THAY VÌ TÍNH TỪ BẢNG BẬC
 *   Bản đầu tính thẳng: trung bình dailyMinutes của BANDS. Đúng về nguyên
 *   tắc, nhưng nó kéo cả data/chuyenanh.ts vào gói tải LẦN ĐẦU — tệp đó
 *   trước nay chỉ nạp khi người dùng mở thẻ chuyên Anh. Bài kiểm hiệu năng
 *   bắt được ngay: gói lần đầu phình từ dưới 800 kB lên 848 kB. Bắt mọi
 *   người tải thêm 48 kB để lấy một con số là cái giá sai.
 *
 *   Nên ghi số ra đây, và để tools/kiem-seo.mjs đối chiếu lại với BANDS —
 *   bài kiểm chạy lúc đóng gói nên nó nhập gì cũng không ai phải tải. Số
 *   lệch là bài kiểm đỏ, không phải là một lời khai sai lặng lẽ.
 */
const PHUT_MOI_NGAY = 70;
const SO_NGAY = 1095;

export function duLieuCoCauTruc(tabId: string): Record<string, unknown>[] {
  const t = TRANG_THEO_TAB[tabId];
  if (!t) return [];
  const url = `${GOC}${duongDanCuaTab(tabId)}`;

  const toChuc = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${GOC}#tochuc`,
    name: 'ENGWIN365 — GITA365',
    url: GOC,
    description:
      'Hệ thống học tiếng Anh 1.095 ngày từ con số 0 tới IELTS 8.0, và lộ trình 22 tháng luyện thi chuyên Anh vào 10 Hà Nội.',
    areaServed: 'VN',
    inLanguage: 'vi-VN',
  };

  const trang = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t.tieuDe,
    description: t.moTa,
    url,
    inLanguage: 'vi-VN',
    primaryImageOfPage: {'@type': 'ImageObject', url: anhOg(tabId)},
    isPartOf: {'@type': 'WebSite', name: 'ENGWIN365', url: GOC},
    publisher: {'@id': `${GOC}#tochuc`},
  };

  const duong = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'ENGWIN365', item: GOC},
      {'@type': 'ListItem', position: 2, name: t.tieuDe, item: url},
    ],
  };

  const ra: Record<string, unknown>[] = [toChuc, trang, duong];

  /*
   * Course chỉ gắn ở trang gốc, vì đó là trang mô tả cả chương trình. Gắn
   * Course lên từng thẻ con là khai báo 39 khoá học không tồn tại — Google
   * đối chiếu với nội dung trang và coi đó là đánh dấu sai.
   *
   * Không khai `offers`: chưa có bảng giá thật trong mã nguồn, mà bịa giá
   * trong dữ liệu có cấu trúc là chỗ bị phạt nặng nhất.
   */
  if (tabId === TAB_GOC) {
    ra.push({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Lộ trình tiếng Anh 1.095 ngày: từ con số 0 tới IELTS 8.0',
      description:
        `Chương trình ${SO_NGAY} ngày chia thành 25 cấp độ và 5 tầng, mỗi ngày ` +
        `khoảng ${PHUT_MOI_NGAY} phút, có phép đo cho từng chặng. Kèm tuyến 22 tháng luyện thi chuyên Anh vào 10.`,
      url: GOC,
      inLanguage: 'vi-VN',
      provider: {'@id': `${GOC}#tochuc`},
      teaches: ['Nghe tiếng Anh', 'Nói tiếng Anh', 'Đọc tiếng Anh', 'Viết tiếng Anh', 'Luyện thi IELTS', 'Luyện thi chuyên Anh vào 10'],
      educationalLevel: 'Từ mất gốc tới IELTS 8.0',
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: `PT${PHUT_MOI_NGAY}M`,
        courseSchedule: {
          '@type': 'Schedule',
          repeatFrequency: 'daily',
          repeatCount: SO_NGAY,
          duration: `PT${PHUT_MOI_NGAY}M`,
        },
      },
    });
  }

  return ra;
}

export const SEO_SO = {
  soTrang: TRANG_SEO.length,
  soTrangCongKhai: TRANG_CONG_KHAI.length,
  soTrangNoiBo: TRANG_NOI_BO.length,
  phutMoiNgay: PHUT_MOI_NGAY,
  soTabTrongApp: Object.keys(TAB_QUYEN).length,
  soTruyVan: TRANG_SEO.reduce((s, t) => s + t.truyVan.length, 0),
  soLoaiCauTruc: 4,
  goc: GOC,
};
