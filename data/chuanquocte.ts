/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {ChuanQuocTe} from '../types';

/* ==========================================================================
   ĐỐI CHIẾU CHUẨN QUỐC TẾ

   "Chất lượng quốc tế" là một câu nói, không phải một bằng chứng. Tệp này đổi
   câu nói ấy thành thứ kiểm được: mười sáu chuẩn có tên, có nguồn, và với mỗi
   chuẩn là một kết luận thẳng — đạt, đạt một phần, hay chưa đạt — kèm bằng
   chứng và kèm phần còn thiếu.

   MỘT BẢNG ĐỐI CHIẾU MÀ CHỖ NÀO CŨNG ĐẠT LÀ MỘT BẢNG QUẢNG CÁO
   Bảng dưới đây có chuẩn chưa đạt, và chúng được để nguyên ở đó. Đó là điểm
   khác biệt thật: phần lớn tài liệu tiếp thị giáo dục nêu chuẩn để mượn uy
   tín; bảng này nêu chuẩn để biết mình còn thiếu gì và thiếu ở đâu.

   VÌ SAO CHỌN ĐÚNG NHỮNG CHUẨN NÀY
   Chúng là những chuẩn có thể ĐỐI CHIẾU ĐƯỢC bằng thứ đã có trong kho mã:
   một bài kiểm tự động, một con số, một tệp cụ thể. Chuẩn nào chỉ kiểm được
   bằng một cuộc đánh giá bên ngoài thì ghi rõ là chưa đạt, chứ không tự nhận.
   ========================================================================== */

export const CHUAN_CREED = {
  name: 'ĐỐI CHIẾU CHUẨN QUỐC TẾ',
  claim:
    'Mười sáu chuẩn có tên và có nguồn. Mỗi chuẩn một kết luận thẳng, kèm bằng chứng kiểm được và kèm phần còn thiếu.',
  luat:
    'Chỉ ghi "đạt" khi có một bài kiểm tự động, một con số, hoặc một tệp cụ thể chứng minh được. Không có bằng chứng thì ghi "đạt một phần" hoặc "chưa đạt", kể cả khi cảm thấy đã làm tốt.',
  vaBang:
    'Một bảng đối chiếu mà chỗ nào cũng đạt là một bảng quảng cáo. Bảng này có chuẩn chưa đạt và chúng được để nguyên.',
  khongHua:
    'Đối chiếu chuẩn KHÔNG phải chứng nhận. Không tổ chức nào ngoài học viện đã kiểm lại bảng này. Muốn thành chứng nhận thì phải có bên thứ ba đánh giá, và phần lớn chuẩn dưới đây đều có quy trình đánh giá riêng.',
};

const S = (
  id: string, ten: string, nguon: string, noiLaGi: string, hethongLamGi: string,
  datToiDau: ChuanQuocTe['datToiDau'], bangChung: string, conThieu: string,
): ChuanQuocTe => ({id, ten, nguon, noiLaGi, hethongLamGi, datToiDau, bangChung, conThieu});

export const CHUAN: ChuanQuocTe[] = [
  /* ------------------------- TIẾP CẬN ---------------------------------- */
  S('c-wcag', 'WCAG 2.1 mức AA', 'W3C — Web Content Accessibility Guidelines',
    'Bộ tiêu chí quốc tế cho việc ai cũng dùng được nội dung web: tương phản chữ, dùng được bằng bàn phím, có nhãn cho phần tử điều khiển.',
    'Toàn bộ bảng màu chữ được sửa lại theo ngưỡng tương phản 4,5 và mọi ô nhập liệu đều có nhãn.',
    'đạt',
    'tools/kiem-tiep-can.mjs quét axe-core qua toàn bộ các mục và trả về 0 vi phạm. Trước khi sửa, con số là 3.356.',
    'Chưa kiểm bằng trình đọc màn hình thật với người dùng thật. Máy quét bắt được phần lớn lỗi kỹ thuật nhưng không bắt được trải nghiệm.'),
  S('c-508', 'Section 508 và ADA', 'Chính phủ Hoa Kỳ — Rehabilitation Act mục 508, Americans with Disabilities Act',
    'Yêu cầu pháp lý của Hoa Kỳ về việc phần mềm phải dùng được với người khuyết tật; nền kỹ thuật của nó chính là WCAG.',
    'Đạt nền kỹ thuật WCAG AA, dùng thẻ ngữ nghĩa và điều khiển có nhãn.',
    'đạt một phần',
    'Nền WCAG AA đã đạt và kiểm được tự động.',
    'Chưa có bản khai VPAT, chưa kiểm với công nghệ hỗ trợ thật. Hai thứ này cần đánh giá bên ngoài, không tự làm được.'),
  S('c-udl', 'Universal Design for Learning', 'CAST — tổ chức nghiên cứu giáo dục Hoa Kỳ',
    'Khung thiết kế học liệu đòi nhiều cách trình bày, nhiều cách hành động, và nhiều cách tạo động lực — để không thiết kế cho một kiểu người học duy nhất.',
    'Cùng một nội dung có văn bản, có phiếu luyện, có bài giảng, có podcast; học viên chọn tuyến và chọn nhịp; có cả thang thưởng lẫn thang cấp độ.',
    'đạt một phần',
    'Ba dạng trình bày và hai tuyến học có thật trong kho mã, kiểm được bằng bài kiểm phiếu và bài kiểm hai tuyến.',
    'Kênh âm thanh tiếng Việt chưa đạt chuẩn thanh điệu, nên "nhiều cách trình bày" hiện chưa trọn vẹn cho người học dựa vào tai.'),

  /* ------------------------ SƯ PHẠM ------------------------------------ */
  S('c-cefr', 'Khung tham chiếu CEFR', 'Hội đồng châu Âu',
    'Thang sáu bậc mô tả năng lực ngôn ngữ, được dùng làm chuẩn chung trên toàn thế giới.',
    'Hai mươi lăm cấp độ và mười hai cột mốc đều gắn mốc CEFR vào và ra, không có cấp nào lơ lửng.',
    'đạt',
    '12 cột mốc đều có trường cefrFrom và cefrTo, và 25 cấp độ chia đúng 5 tầng; tools/kiem-so-khai.ts đối chiếu các con số này với thanh điều hướng.',
    'Chưa có bên thứ ba xác nhận việc quy đổi giữa cấp độ nội bộ và bậc CEFR là chính xác.'),
  S('c-bloom', 'Thang Bloom sửa đổi', 'Anderson và Krathwohl — Hoa Kỳ, 2001',
    'Thang sáu mức nhận thức từ nhớ tới sáng tạo, dùng để thiết kế mục tiêu học và đề kiểm tra.',
    'Kim tự tháp năm bậc BIẾT · HIỂU · LÀM · DẠY LẠI được dùng làm trục cho bộ ba trăm bài định hướng và cho năm mức của bài giảng chuyên sâu.',
    'đạt',
    'PYRAMID có đủ 5 bậc với tỉ lệ ghi nhớ và phương thức; tools/kiem-giang-sau.ts soát 2.000 bài giảng sinh đúng 5 mức theo tầng và độ sâu tăng thật.',
    'Chưa đối chiếu từng câu hỏi trong bốn mươi nghìn câu với mức Bloom tương ứng.'),
  S('c-miller', 'Kim tự tháp Miller', 'George Miller — Hoa Kỳ, 1990',
    'Bốn mức đánh giá năng lực: biết, biết cách, chỉ ra được, và làm được trong thực tế.',
    'Năm bậc đề tốt nghiệp gắn thẳng mức Miller, và mức cao nhất đòi làm được với người thật chứ không đòi trả lời đúng.',
    'đạt',
    'EXAM_TIERS có 5 bậc, mỗi bậc mang trường millerLevel và trường cannotFake; tools/kiem-danh-gia.ts soát toàn bộ bộ đề.',
    'Mức cao nhất cần quan sát trong công việc thật, mà học viện chỉ quan sát được trong phạm vi lớp và câu lạc bộ.'),
  S('c-ubd', 'Thiết kế ngược', 'Wiggins và McTighe — Hoa Kỳ, Understanding by Design',
    'Thiết kế chương trình bắt đầu từ đích và từ bằng chứng của việc đạt đích, rồi mới tới hoạt động dạy học.',
    'Mọi cột mốc viết cổng thoát trước khi viết nội dung; hàm tính ngược cho biết cần đúng bao nhiêu câu mỗi phần để đạt mục tiêu.',
    'đạt',
    'Hàm tinhNguoc và trường exitCriteria ở cả 12 cột mốc; tools/kiem-chuyen.ts soát tính ngược ở 6 mức mục tiêu từ 5 tới 10 điểm.',
    'Bộ hai nghìn phiếu chưa có bản đối chiếu ngược từng phiếu về một cổng thoát cụ thể.'),
  S('c-mastery', 'Học theo mức thành thạo', 'Benjamin Bloom — Hoa Kỳ, Mastery Learning',
    'Học viên không đi tiếp khi chưa đạt ngưỡng thành thạo của phần hiện tại, thay vì đi tiếp theo lịch.',
    'Ngưỡng 90% cho từng phiếu và cho cả cấp; không cho nhảy phần trong phiếu; cổng thoát chặn giữa các cột mốc.',
    'đạt',
    'Hàm chamPhieu và xetNangCap kiểm được bằng tám trăm lượt chấm thử trong tools/kiem-phieu.ts.',
    'Trên bản chạy trên máy người dùng, việc chặn là chặn ở giao diện. Không có máy chủ thì không cưỡng chế được.'),
  S('c-deliberate', 'Luyện tập có chủ đích', 'Anders Ericsson — Hoa Kỳ',
    'Tiến bộ đến từ việc tấn công đúng điểm yếu với phản hồi ngay, không đến từ số giờ lặp lại thứ đã làm được.',
    'Sổ lỗi theo mã, kho một nghìn đơn kê theo triệu chứng và cấp độ, và luật mỗi lần chỉ kê tối đa ba đơn.',
    'đạt',
    'SOLUTIONS sinh đủ 1.000 đơn và bài kiểm đánh giá soát từng đơn; DANG_BAI có tám mươi bẫy khác nhau, mỗi bẫy là một điểm yếu cụ thể.',
    'Phản hồi tức thì mới có ở phần có đáp án đóng. Phần nói và phần viết vẫn phải chờ người chấm.'),
  S('c-retrieval', 'Nhớ chủ động và ôn giãn cách', 'Roediger và Karpicke — Hoa Kỳ; Ebbinghaus',
    'Tự lấy lại thông tin từ trí nhớ củng cố mạnh hơn đọc lại, và ôn đúng lúc sắp quên là hiệu quả nhất.',
    'Lịch ôn 1-3-7-14-30 nằm trong bài luyện chuẩn; nhiều chủ đề trong trụ phương pháp dạy thẳng nguyên tắc này.',
    'đạt',
    'Bài luyện d-anki và các chủ đề pp02, pp03 trong bộ bài giảng chuyên sâu; bài kiểm bài giảng soát mọi chủ đề có việc phải làm.',
    'Hệ thống mô tả lịch ôn nhưng không tự chạy lịch đó — học viên vẫn phải dùng công cụ ôn bên ngoài.'),
  S('c-actfl', 'Hướng dẫn năng lực ACTFL', 'American Council on the Teaching of Foreign Languages — Hoa Kỳ',
    'Bộ mô tả năng lực nói và viết theo mức, dùng rộng rãi trong hệ thống giáo dục Hoa Kỳ.',
    'Có mô tả năng lực nói theo cấp độ và bốn trục chấm phần nói.',
    'đạt một phần',
    'Bốn trục chấm nói và hai mươi lăm cấp độ có mô tả năng lực riêng.',
    'Chưa ánh xạ tường minh từng cấp độ sang mức ACTFL. Việc này cần người được ACTFL đào tạo mới làm đúng.'),
  S('c-danielson', 'Khung Danielson về chất lượng dạy học', 'Charlotte Danielson — Hoa Kỳ',
    'Khung bốn miền đánh giá người dạy: chuẩn bị, môi trường lớp, giảng dạy, và trách nhiệm nghề nghiệp.',
    'Thang nghề năm nấc, mỗi nấc ghi rõ làm được gì và chưa làm được gì, kèm cổng nâng bậc bằng số giờ và bằng kết quả ca.',
    'đạt một phần',
    'COACH_LADDER và bảng cấp chuyên môn có tiêu chí vào ra rõ ràng; bài kiểm phân quyền ép thừa kế đơn điệu qua các nấc.',
    'Chưa có phiếu dự giờ chuẩn hoá theo bốn miền, và chưa có quy trình dự giờ chéo định kỳ.'),

  /* --------------------- DỮ LIỆU VÀ AN TOÀN ---------------------------- */
  S('c-ferpa', 'FERPA — bảo vệ hồ sơ học tập', 'Chính phủ Hoa Kỳ — Family Educational Rights and Privacy Act',
    'Luật Hoa Kỳ về quyền riêng tư đối với hồ sơ giáo dục: học viên và phụ huynh được xem hồ sơ, và hồ sơ không được chia sẻ tuỳ tiện.',
    'Bản máy tính giữ toàn bộ dữ liệu trên máy người dùng, mã hoá AES-256-GCM với khoá dẫn xuất bằng scrypt; hệ phân quyền cho phụ huynh xem hồ sơ con và chặn xem hồ sơ người khác.',
    'đạt một phần',
    'desktop/vault.cjs với 36 phép kiểm tự động; quyền q-xem-ho-so-con và q-xem-ho-so-lop trong ma trận phân quyền.',
    'Chưa có quy trình chính thức để học viên yêu cầu xem, sửa hay xoá hồ sơ, và chưa có hợp đồng xử lý dữ liệu với bên thứ ba. Phân quyền phía giao diện cũng chưa phải cưỡng chế thật.'),
  S('c-coppa', 'COPPA — trẻ dưới mười ba tuổi', 'Uỷ ban Thương mại Liên bang Hoa Kỳ',
    'Quy định của Hoa Kỳ về việc thu thập dữ liệu trẻ dưới mười ba tuổi, đòi có sự đồng ý của cha mẹ.',
    'Lộ trình chuyên nhận học sinh từ lớp 8, tức phần lớn đã trên mười ba tuổi; vai phụ huynh có trong hệ phân quyền và bài phỏng vấn phụ huynh nằm trong test đầu vào.',
    'đạt một phần',
    'Vai ph-1 trong BAC_QUYEN và bước phỏng vấn phụ huynh riêng trong ENTRY_TEST.',
    'Chưa có luồng xin đồng ý bằng văn bản, và chưa có cơ chế xác minh tuổi. Nếu nhận học viên dưới mười ba thì phải bổ sung trước.'),
  S('c-iso', 'ISO/IEC 27001 và SOC 2', 'Tổ chức Tiêu chuẩn hoá Quốc tế; AICPA — Hoa Kỳ',
    'Chuẩn về hệ thống quản lý an toàn thông tin, cần đánh giá bởi tổ chức độc lập.',
    'Có mã hoá két, cách ly tiến trình trên bản máy tính, và tài liệu BAOMAT.md nói rõ cả những gì hệ thống KHÔNG bảo vệ.',
    'chưa đạt',
    'Không có bằng chứng nào cho chuẩn này, vì nó đòi một chương trình quản lý và một cuộc đánh giá độc lập.',
    'Cần chính sách an toàn thông tin bằng văn bản, phân loại tài sản, quy trình ứng phó sự cố, và kiểm toán bên ngoài. Chưa có thứ nào trong số đó.'),
  S('c-build', 'Dựng bản phát hành kiểm chứng được', 'Thực hành chuẩn của ngành phần mềm',
    'Bản phát hành phải dựng trên đúng nền nó sẽ chạy, đi qua cổng kiểm tự động, và có mã băm để người tải đối chiếu.',
    'Bản Windows dựng trên máy Windows thật qua GitHub Actions, có cổng chặn kiểm kiểu dữ liệu và kiểm két trước khi đóng gói, và phát hành kèm tệp SHA256SUMS.',
    'đạt',
    '.github/workflows/phat-hanh-windows.yml; bản phát hành v1.0.0 có mã băm công bố. Cổng chặn đã thật sự chặn một lần khi bài kiểm két đỏ 2/36 trên Windows.',
    'Bản cài chưa được ký số, nên Windows SmartScreen vẫn cảnh báo. Cần mua chứng thư ký số OV hoặc EV.'),
];

export const CHUAN_SO = {
  soChuan: CHUAN.length,
  dat: CHUAN.filter((c) => c.datToiDau === 'đạt').length,
  motPhan: CHUAN.filter((c) => c.datToiDau === 'đạt một phần').length,
  chuaDat: CHUAN.filter((c) => c.datToiDau === 'chưa đạt').length,
};
