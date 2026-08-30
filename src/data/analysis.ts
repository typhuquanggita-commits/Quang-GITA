/**
 * BẢNG PHÂN TÍCH DẠNG BÀI — mỗi bộ sinh đề có một hồ sơ phân tích riêng.
 *
 * Đây là phần "phân tích kiến thức liên quan" hiện ra sau khi học viên nộp bài:
 * nhận dạng đề — quy trình giải chuẩn — bẫy thường gặp — dấu hiệu đã thành thạo —
 * và liên hệ với đề thi thật.
 */

export interface DrillAnalysis {
  /** Dấu hiệu để nhận ra dạng bài này ngay từ đề. */
  recognize: string;
  /** Quy trình giải chuẩn, đánh số theo bước. */
  method: string[];
  /** Bẫy và lỗi mất điểm hay gặp nhất ở dạng này. */
  traps: string[];
  /** Dạng này xuất hiện ở đâu trong đề thi thật và đáng bao nhiêu điểm. */
  transfer: string;
  /** Dấu hiệu cho thấy đã thực sự làm chủ dạng bài. */
  mastery: string;
}

export const DRILL_ANALYSIS: Record<string, DrillAnalysis> = {
  /* ==================== ĐẠI SỐ THCS ==================== */
  'g-dkxd': {
    recognize: 'Đề chỉ yêu cầu "tìm điều kiện xác định", biểu thức có căn bậc hai và/hoặc có mẫu.',
    method: [
      'Liệt kê mọi vị trí gây ràng buộc: dưới dấu căn bậc hai, mẫu số, mẫu trong căn.',
      'Căn bậc hai ⇒ biểu thức dưới căn ≥ 0.',
      'Mẫu số ⇒ mẫu ≠ 0.',
      'Giao tất cả các điều kiện lại, viết gọn trên trục số.',
    ],
    traps: [
      'Chỉ lấy điều kiện của căn mà quên mẫu (hoặc ngược lại).',
      'Viết dấu ">" thay vì "≥" cho biểu thức dưới căn khi biểu thức đó không nằm ở mẫu.',
      'Quên loại nghiệm làm mẫu bằng 0 sau khi đã giải xong bài chính.',
    ],
    transfer:
      'Là bước đầu tiên của Bài I đề vào 10 Hà Nội. Barem thường dành riêng 0,25 điểm cho dòng điều kiện — mất điểm ở đây là mất oan nhất toàn đề.',
    mastery: 'Viết được ĐKXĐ đúng ngay dòng đầu, không cần nghĩ quá 10 giây.',
  },
  'g-can-kep': {
    recognize: 'Dưới dấu căn có dạng "số ± số·√số", tức là căn lồng trong căn.',
    method: [
      'Tách biểu thức dưới căn về dạng A − 2√(AB) + B hoặc A + 2√(AB) + B.',
      'Nhận ra đó là bình phương của (√A ∓ √B).',
      'Lấy căn: kết quả là |√A ∓ √B|.',
      'So sánh A và B để phá dấu trị tuyệt đối cho đúng dấu.',
    ],
    traps: [
      'Bỏ dấu trị tuyệt đối và viết luôn √A − √B dù A < B — đây là lỗi phổ biến nhất.',
      'Tách sai cặp (A, B): phải thoả đồng thời A + B = số hạng tự do và AB = số dưới căn nhỏ.',
    ],
    transfer:
      'Xuất hiện ở ý "tính giá trị biểu thức tại x = …" của Bài I, và rất hay gặp trong đề chuyên KHTN vòng 1.',
    mastery: 'Nhìn 9 − 4√5 là đọc ngay ra (√5 − 2)² mà không cần nháp.',
  },
  'g-pt-bac-hai': {
    recognize: 'Phương trình bậc hai một ẩn với hệ số nguyên nhỏ.',
    method: [
      'Thử nhẩm Viète trước: tìm hai số có tổng −b/a và tích c/a.',
      'Nếu không nhẩm được, tính Δ = b² − 4ac rồi dùng công thức nghiệm.',
      'Kết luận đầy đủ cả hai nghiệm.',
    ],
    traps: [
      'Nhầm dấu khi lấy tổng hai nghiệm: tổng là −b/a chứ không phải b/a.',
      'Tìm được Δ nhưng quên khai căn hoặc khai căn sai.',
      'Chỉ ghi một nghiệm rồi kết luận.',
    ],
    transfer:
      'Kỹ năng nền cho toàn bộ Bài III đề vào 10 và mọi bài toán tham số. Không thành thạo bước này thì mọi bài Viète phía sau đều chậm.',
    mastery: 'Nhẩm được nghiệm của phương trình hệ số nguyên nhỏ trong dưới 15 giây.',
  },
  'g-viete-bieu-thuc': {
    recognize:
      'Đề cho phương trình bậc hai rồi hỏi giá trị của một biểu thức đối xứng theo hai nghiệm.',
    method: [
      'Kiểm tra Δ > 0 để phương trình thực sự có hai nghiệm.',
      'Viết ra S = x₁ + x₂ và P = x₁x₂ theo định lí Viète.',
      'Biến đổi biểu thức đề bài về S và P (không đi tìm nghiệm cụ thể).',
      'Thay số và tính.',
    ],
    traps: [
      'Đi giải tìm nghiệm rồi mới thay — chậm và dễ sai khi nghiệm lẻ.',
      'Nhớ nhầm công thức: x₁² + x₂² = S² − 2P, không phải S² + 2P.',
      'Bỏ qua bước kiểm tra Δ.',
    ],
    transfer:
      'Là nửa đầu của Bài III ý 2 đề vào 10 Hà Nội (1,0 điểm). Cũng là công cụ cho các bài tham số của đề chuyên.',
    mastery: 'Thuộc lòng bộ ba công thức S² − 2P, S³ − 3PS, S² − 4P và dùng đúng ngay lần đầu.',
  },
  'g-viete-thamso': {
    recognize:
      'Phương trình bậc hai có tham số m, kèm một điều kiện ràng buộc giữa hai nghiệm.',
    method: [
      'Tìm điều kiện để phương trình có hai nghiệm: Δ > 0 (hoặc Δ′ > 0).',
      'Viết S và P theo m.',
      'Chuyển điều kiện của đề về một phương trình chỉ chứa S, P — tức chỉ chứa m.',
      'Giải ra m, rồi ĐỐI CHIẾU lại với điều kiện Δ > 0.',
    ],
    traps: [
      'Quên bước đối chiếu Δ > 0 ⇒ nhận cả giá trị m làm phương trình vô nghiệm.',
      'Quên xét trường hợp hệ số bậc hai bằng 0 khi hệ số đó chứa m.',
      'Chỉ lấy nghiệm dương của m khi đề không hề yêu cầu.',
    ],
    transfer:
      'Đúng dạng Bài III ý 2 đề vào 10 Hà Nội — 1,0 điểm, gần như năm nào cũng có.',
    mastery: 'Làm trọn bài trong 6 phút và luôn tự động viết dòng đối chiếu điều kiện ở cuối.',
  },
  'g-he-bac-nhat': {
    recognize: 'Hệ hai phương trình bậc nhất hai ẩn, hệ số nguyên.',
    method: [
      'Chọn ẩn dễ khử hơn (hệ số nhỏ hoặc đã cùng bội).',
      'Nhân hai vế để hệ số của ẩn đó đối nhau, rồi cộng đại số.',
      'Giải ẩn còn lại, thế ngược để tìm ẩn kia.',
      'Thử lại nghiệm vào cả hai phương trình.',
    ],
    traps: [
      'Sai dấu khi nhân cả hai vế với số âm.',
      'Tìm được một ẩn rồi quên thế ngược.',
      'Không thử lại nên không phát hiện lỗi tính.',
    ],
    transfer: 'Nền của Bài III ý 1 và của mọi bài giải toán bằng cách lập hệ (Bài II).',
    mastery: 'Giải xong và thử lại trong dưới 3 phút, không sai dấu.',
  },
  'g-he-an-phu': {
    recognize:
      'Hệ có các biểu thức lặp lại như √(x − a), 1/(x − a), |x + b| ở cả hai phương trình.',
    method: [
      'Đặt ĐKXĐ cho từng biểu thức.',
      'Đặt ẩn phụ u, v cho các biểu thức lặp, kèm điều kiện của ẩn phụ (căn thì u ≥ 0).',
      'Giải hệ bậc nhất theo u, v.',
      'Trả biến: giải u = … và v = … để tìm x, y.',
      'Đối chiếu ĐKXĐ rồi kết luận.',
    ],
    traps: [
      'Quên điều kiện u ≥ 0 nên nhận nghiệm âm của ẩn phụ.',
      'Giải xong u, v rồi dừng lại, quên trả biến — mất trọn điểm dù đã làm đúng 80%.',
      'Trả biến sai: √(x − a) = u ⇒ x = a + u², không phải x = a + u.',
    ],
    transfer:
      'Là dạng chính của Bài III ý 1 đề vào 10 Hà Nội (1,0 điểm) và bài mở đầu nhiều đề chuyên.',
    mastery: 'Tự động viết điều kiện của ẩn phụ ngay dòng đặt ẩn, không cần nhắc.',
  },
  'g-pt-vo-ti': {
    recognize: 'Phương trình có một căn bậc hai ở một vế và biểu thức bậc nhất ở vế kia.',
    method: [
      'Đặt hai điều kiện: biểu thức dưới căn ≥ 0 VÀ vế phải ≥ 0.',
      'Bình phương hai vế để khử căn.',
      'Giải phương trình bậc hai thu được.',
      'Đối chiếu từng nghiệm với điều kiện, loại nghiệm ngoại lai.',
    ],
    traps: [
      'Bình phương khi chưa đặt điều kiện vế phải không âm ⇒ nhận nghiệm ngoại lai.',
      'Chỉ đặt điều kiện dưới căn mà quên điều kiện vế phải.',
      'Không thử lại nghiệm vào phương trình gốc.',
    ],
    transfer:
      'Bài 1 của đề chuyên KHTN vòng 1 và đề chuyên Sư phạm; cũng là ý nâng cao trong đề Nguyễn Tất Thành.',
    mastery: 'Luôn viết đủ hai điều kiện trước khi bình phương, và tự phát hiện nghiệm ngoại lai.',
  },
  'g-he-doi-xung': {
    recognize:
      'Hệ không đổi khi hoán vị x và y (ví dụ x + y và x² + y², hoặc x + y và xy).',
    method: [
      'Đặt S = x + y, P = xy.',
      'Chuyển cả hai phương trình về S và P (nhớ x² + y² = S² − 2P).',
      'Giải hệ theo S, P.',
      'KIỂM TRA điều kiện S² ≥ 4P — nếu không thoả thì loại.',
      'x, y là hai nghiệm của t² − St + P = 0.',
    ],
    traps: [
      'Bỏ qua điều kiện S² ≥ 4P ⇒ nhận cặp (S; P) không tồn tại nghiệm thực.',
      'Quên rằng nghiệm phải trả về theo cặp có thứ tự: (x; y) và (y; x) là hai nghiệm.',
    ],
    transfer: 'Bài mở đầu quen thuộc của đề chuyên Sư phạm và đề chuyên các tỉnh.',
    mastery: 'Nhận ra hệ đối xứng và viết ngay S, P mà không thử thế trước.',
  },
  'g-tuong-giao': {
    recognize: 'Đề cho một parabol và một đường thẳng, hỏi giao điểm.',
    method: [
      'Cho hai vế bằng nhau để lập phương trình hoành độ giao điểm.',
      'Chuyển hết về một vế, thu gọn thành phương trình bậc hai.',
      'Tính Δ để biết số giao điểm: Δ > 0 hai điểm, Δ = 0 tiếp xúc, Δ < 0 không cắt.',
      'Giải ra hoành độ; thay vào để có tung độ nếu đề hỏi toạ độ.',
    ],
    traps: [
      'Chỉ tìm hoành độ trong khi đề hỏi toạ độ giao điểm.',
      'Chuyển vế sai dấu khi lập phương trình hoành độ.',
    ],
    transfer: 'Nửa đầu Bài III ý 2 đề vào 10 Hà Nội.',
    mastery: 'Lập đúng phương trình hoành độ giao điểm ngay từ dòng đầu, không nhầm dấu.',
  },
  'g-da-thuc-du': {
    recognize: 'Hỏi số dư khi chia đa thức cho một nhị thức bậc nhất (x − a).',
    method: [
      'Áp dụng định lí Bézout: số dư bằng P(a).',
      'Thay a vào đa thức và tính cẩn thận (chú ý dấu khi a âm).',
    ],
    traps: [
      'Với ước là (x + k), giá trị cần thay là a = −k chứ không phải k.',
      'Sai dấu khi nâng luỹ thừa số âm: (−2)³ = −8 nhưng (−2)² = 4.',
    ],
    transfer:
      'Xuất hiện trong đề chuyên Sư phạm và các bài số học dùng tính chất đa thức hệ số nguyên.',
    mastery: 'Không cần chia đa thức, chỉ cần thay số và ra đáp án trong 1 phút.',
  },

  /* ==================== TOÁN THỰC TẾ THCS ==================== */
  'g-chuyen-dong': {
    recognize:
      'Bài toán có quãng đường – vận tốc – thời gian, và một mệnh đề so sánh thời gian giữa hai lần đi.',
    method: [
      'Gọi ẩn là đại lượng đề hỏi, kèm đơn vị và điều kiện dương.',
      'Lập bảng ba cột: quãng đường / vận tốc / thời gian cho từng lượt đi.',
      'Đổi mọi đơn vị thời gian về giờ trước khi lập phương trình.',
      'Lập phương trình từ mệnh đề so sánh, quy đồng và giải.',
      'Loại nghiệm âm, trả lời bằng câu hoàn chỉnh có đơn vị.',
    ],
    traps: [
      'Đổi phút sang giờ sai: 36 phút = 36/60 giờ, không phải 0,36 giờ.',
      'Đặt ẩn nhưng quên điều kiện x > 0.',
      'Quên câu kết luận cuối — barem có 0,25 điểm cho phần này.',
    ],
    transfer: 'Bài II ý 1 đề vào 10 Hà Nội, 1,5 điểm cố định hằng năm.',
    mastery: 'Lập đúng phương trình trong 3 phút và không bao giờ quên dòng kết luận.',
  },
  'g-nang-suat': {
    recognize:
      'Hai đối tượng cùng làm chung một công việc, đề cho thời gian chung và chênh lệch thời gian riêng.',
    method: [
      'Coi cả công việc là 1 đơn vị.',
      'Năng suất mỗi giờ của từng đối tượng là 1/x và 1/(x + d).',
      'Lập phương trình 1/x + 1/(x + d) = 1/t.',
      'Quy đồng, đưa về phương trình bậc hai và giải.',
      'Loại nghiệm âm, kết luận đủ cả hai thời gian.',
    ],
    traps: [
      'Cộng thời gian thay vì cộng năng suất — sai lầm bản chất hay gặp nhất.',
      'Chỉ trả lời thời gian của một đối tượng.',
    ],
    transfer: 'Một trong năm dạng cố định của Bài II đề vào 10 Hà Nội.',
    mastery: 'Viết ngay được phương trình năng suất mà không cần vẽ bảng.',
  },
  'g-phan-tram': {
    recognize: 'Hai lần giảm giá (hoặc tăng) liên tiếp trên cùng một món hàng.',
    method: [
      'Giá sau lần giảm a%: nhân với (1 − a/100).',
      'Giá sau lần giảm thứ hai: lấy kết quả trên nhân tiếp với (1 − b/100).',
      'Không cộng gộp hai phần trăm lại với nhau.',
    ],
    traps: [
      'Cộng a% + b% rồi giảm một lần — đây chính là bẫy của dạng bài này.',
      'Nhầm "giảm còn" với "giảm đi".',
    ],
    transfer:
      'Dạng toán thực tế xuất hiện trong Bài II đề vào 10 và trong phần trả lời ngắn của đề tốt nghiệp THPT.',
    mastery: 'Giải thích được vì sao giảm 20% rồi 10% không bằng giảm 30%.',
  },
  'g-hinh-tru': {
    recognize: 'Đề cho bán kính đáy và chiều cao của một vật hình trụ.',
    method: [
      'Đọc kỹ đề hỏi thể tích hay diện tích xung quanh.',
      'Thể tích V = πr²h; diện tích xung quanh S = 2πrh.',
      'Thay số, giữ π hoặc thay π ≈ 3,14 theo đúng yêu cầu.',
    ],
    traps: [
      'Đề cho đường kính nhưng thay luôn vào công thức như bán kính.',
      'Nhầm V với S_xq (khác nhau ở việc r bình phương hay không).',
      'Sai đơn vị: cm³ với lít, dm³ với lít.',
    ],
    transfer: 'Ý 0,5 điểm của Bài II đề vào 10 Hà Nội — điểm "cho không" nếu thuộc công thức.',
    mastery: 'Thuộc đủ 6 công thức trụ – nón – cầu và không bao giờ nhầm bán kính với đường kính.',
  },
  'g-hinh-non': {
    recognize: 'Đề cho hình nón với hai trong ba đại lượng: bán kính, chiều cao, đường sinh.',
    method: [
      'Dùng l² = r² + h² để tìm đại lượng còn thiếu.',
      'Diện tích xung quanh S_xq = πrl (dùng đường sinh, KHÔNG dùng chiều cao).',
      'Thể tích V = (1/3)πr²h (dùng chiều cao, KHÔNG dùng đường sinh).',
    ],
    traps: [
      'Dùng chiều cao thay cho đường sinh trong công thức diện tích xung quanh.',
      'Quên hệ số 1/3 trong công thức thể tích.',
    ],
    transfer: 'Ý hình học thực tế của Bài II đề vào 10 Hà Nội.',
    mastery: 'Nhớ được quy tắc "diện tích dùng l, thể tích dùng h".',
  },
  'g-hinh-cau': {
    recognize: 'Vật thể hình cầu, đề cho bán kính.',
    method: ['Diện tích mặt cầu S = 4πR².', 'Thể tích V = (4/3)πR³.', 'Thay số và giữ đúng đơn vị.'],
    traps: [
      'Nhầm hai công thức với nhau (một cái bình phương, một cái lập phương).',
      'Quên hệ số 4/3 ở công thức thể tích.',
    ],
    transfer: 'Ý 0,5 điểm của Bài II đề vào 10 Hà Nội.',
    mastery: 'Viết được cả hai công thức từ trí nhớ, không nhầm lẫn.',
  },
  'g-xac-suat': {
    recognize: 'Lấy ngẫu nhiên một vật từ một tập hợp, hỏi xác suất của một loại.',
    method: [
      'Đếm tổng số kết quả có thể (toàn bộ số vật).',
      'Đếm số kết quả thuận lợi.',
      'Xác suất = thuận lợi / có thể, rút gọn phân số.',
    ],
    traps: [
      'Lấy số bi loại này chia cho số bi loại kia thay vì chia cho tổng.',
      'Quên rút gọn phân số.',
    ],
    transfer:
      'Nội dung mới theo Chương trình GDPT 2018, có thể xuất hiện trong đề vào 10 và chắc chắn có trong đề tốt nghiệp THPT.',
    mastery: 'Luôn xác định đúng "không gian mẫu" trước khi đếm kết quả thuận lợi.',
  },
  'g-thong-ke': {
    recognize: 'Cho một mẫu số liệu nhỏ, hỏi số trung bình cộng.',
    method: ['Cộng tất cả các giá trị.', 'Chia cho số phần tử của mẫu.', 'Rút gọn kết quả.'],
    traps: [
      'Nhầm trung bình cộng với trung vị (giá trị ở giữa khi đã sắp xếp).',
      'Chia cho sai số phần tử.',
    ],
    transfer: 'Phần thống kê của Chương trình GDPT 2018, có ở cả đề vào 10 và đề tốt nghiệp.',
    mastery: 'Phân biệt rõ ba đại trưng: trung bình cộng, trung vị và mốt.',
  },

  /* ==================== HÌNH HỌC THCS ==================== */
  'g-he-thuc-luong': {
    recognize: 'Tam giác vuông có đường cao kẻ từ đỉnh góc vuông xuống cạnh huyền.',
    method: [
      'Vẽ hình và ghi rõ hình chiếu của hai cạnh góc vuông lên cạnh huyền.',
      'Áp dụng AH² = BH · CH cho đường cao.',
      'Áp dụng AB² = BH · BC và AC² = CH · BC cho cạnh góc vuông.',
      'Khai căn và ghi đơn vị.',
    ],
    traps: [
      'Nhầm hệ thức đường cao với hệ thức cạnh góc vuông.',
      'Dùng BC thay cho BH hoặc CH.',
    ],
    transfer:
      'Công cụ dùng thường xuyên trong Bài IV đề vào 10, đặc biệt ở mô hình hai tiếp tuyến cắt nhau.',
    mastery: 'Nhìn hình là biết ngay dùng hệ thức nào, không phải thử.',
  },
  'g-goc-duong-tron': {
    recognize:
      'Đề nhắc tới tứ giác nội tiếp, cung, góc nội tiếp, góc ở tâm, hoặc tiếp tuyến và dây.',
    method: [
      'Xác định góc đang xét thuộc loại nào: nội tiếp, ở tâm, hay tạo bởi tiếp tuyến và dây.',
      'Góc nội tiếp và góc tạo bởi tiếp tuyến–dây đều bằng nửa số đo cung bị chắn.',
      'Góc ở tâm bằng đúng số đo cung bị chắn.',
      'Tứ giác nội tiếp: tổng hai góc đối bằng 180°.',
    ],
    traps: [
      'Nhầm góc nội tiếp với góc ở tâm (chênh nhau hệ số 2).',
      'Xác định sai cung bị chắn khi hình có nhiều dây.',
    ],
    transfer: 'Ý 1 của Bài IV đề vào 10 Hà Nội — 1,0 điểm, gần như năm nào cũng có.',
    mastery: 'Chuyển góc qua lại giữa các tứ giác nội tiếp một cách trôi chảy.',
  },
  'g-phuong-tich': {
    recognize:
      'Có một điểm cố định và một cát tuyến thay đổi cắt đường tròn tại hai điểm; đề hỏi tích hai đoạn.',
    method: [
      'Tính phương tích: 𝒫 = OM² − R².',
      'Với mọi cát tuyến qua M: MA · MB = |𝒫|.',
      'Nếu có tiếp tuyến MT thì MT² = |𝒫|.',
    ],
    traps: [
      'Quên rằng phương tích có dấu: âm khi M nằm trong đường tròn.',
      'Nghĩ rằng tích phụ thuộc vào cát tuyến đã chọn — thực ra nó không đổi.',
    ],
    transfer:
      'Công cụ chủ lực cho ý cuối bài hình của đề chuyên: chứng minh đồng viên, tiếp xúc, thẳng hàng.',
    mastery: 'Nhìn thấy tích hai đoạn thẳng là nghĩ ngay tới phương tích.',
  },
  'g-tiep-tuyen': {
    recognize: 'Từ một điểm ngoài đường tròn kẻ tiếp tuyến, đề hỏi độ dài đoạn tiếp tuyến.',
    method: [
      'Tiếp tuyến vuông góc với bán kính tại tiếp điểm ⇒ tam giác OTM vuông tại T.',
      'Áp dụng Pythagore: MT² = OM² − R².',
      'Khai căn.',
    ],
    traps: [
      'Lấy hiệu OM − R thay vì hiệu bình phương.',
      'Quên rằng góc vuông nằm tại tiếp điểm, không phải tại tâm.',
    ],
    transfer: 'Mô hình số 1 trong 10 mô hình chuẩn của Bài IV đề vào 10.',
    mastery: 'Vẽ được hình và nhận ra tam giác vuông trong dưới 30 giây.',
  },

  /* ==================== SỐ HỌC ==================== */
  'g-tich-lien-tiep': {
    recognize: 'Biểu thức là tích của k số nguyên liên tiếp.',
    method: [
      'Đếm xem có bao nhiêu số liên tiếp trong tích.',
      'Trong k số nguyên liên tiếp luôn có một số chia hết cho 1, cho 2, …, cho k.',
      'Kết luận tích chia hết cho k!.',
      'Kiểm tra bằng một giá trị nhỏ để chắc chắn không kết luận quá mạnh.',
    ],
    traps: [
      'Kết luận chia hết cho số lớn hơn k! mà không kiểm chứng.',
      'Không nhận ra biểu thức có thể phân tích thành tích các số liên tiếp.',
    ],
    transfer:
      'Kỹ thuật nền của mọi bài "chứng minh chia hết" trong đề chuyên KHTN và Ams.',
    mastery: 'Tự động nghĩ tới việc phân tích thành tích các số liên tiếp khi gặp bài chia hết.',
  },
  'g-so-du-luy-thua': {
    recognize: 'Hỏi số dư của một luỹ thừa lớn khi chia cho một số nhỏ.',
    method: [
      'Tính vài luỹ thừa đầu theo modulo để tìm chu kì.',
      'Lấy số mũ chia cho độ dài chu kì, lấy phần dư.',
      'Kết quả là luỹ thừa ứng với phần dư đó.',
    ],
    traps: [
      'Tìm chu kì sai vì tính nhầm một bước ở giữa.',
      'Lấy số mũ chia cho modulo thay vì chia cho độ dài chu kì.',
    ],
    transfer: 'Bài số học của đề chuyên KHTN, Ams, Sư phạm — 2,0 điểm.',
    mastery: 'Tìm được chu kì trong dưới 1 phút và dùng đúng phần dư.',
  },
  'g-chu-so-tan-cung': {
    recognize: 'Hỏi chữ số tận cùng của một luỹ thừa.',
    method: [
      'Chữ số tận cùng chính là số dư khi chia cho 10.',
      'Tính chu kì của chữ số tận cùng (thường là 1, 2 hoặc 4).',
      'Lấy số mũ chia cho độ dài chu kì và tra kết quả.',
    ],
    traps: [
      'Nhớ sai chu kì của 2, 3, 7, 8 (đều là 4).',
      'Quên rằng khi số mũ chia hết cho chu kì thì lấy phần tử cuối, không phải phần tử đầu.',
    ],
    transfer: 'Câu số học nhập môn của đề chuyên, và là bước đệm để học đồng dư.',
    mastery: 'Thuộc bảng chu kì chữ số tận cùng của các số từ 2 đến 9.',
  },
  'g-nghiem-nguyen-tich': {
    recognize:
      'Phương trình hai ẩn nguyên có dạng xy cộng các hạng tử bậc nhất của x và y.',
    method: [
      'Nhóm để tạo nhân tử chung: x(y + a) + b(y + a).',
      'Đưa về dạng (x + b)(y + a) = K.',
      'Liệt kê MỌI ước nguyên của K, kể cả ước âm.',
      'Mỗi ước cho một nghiệm; kết luận đầy đủ tập nghiệm.',
    ],
    traps: [
      'Chỉ xét ước dương ⇒ mất một nửa số nghiệm.',
      'Cộng thiếu hằng số ab khi chuyển vế.',
      'Không kết luận đầy đủ tập nghiệm.',
    ],
    transfer: 'Dạng kinh điển của bài số học đề chuyên KHTN — thường là 2,0 điểm.',
    mastery: 'Đưa về dạng tích trong hai dòng và liệt kê đủ nghiệm không sót trường hợp.',
  },
  'g-dong-du-tim-n': {
    recognize:
      'Tìm n để một tam thức bậc hai theo n chia hết cho một số nguyên tố lẻ.',
    method: [
      'Nhân cả biểu thức với 4 (hợp lệ vì gcd(4, p) = 1).',
      'Hoàn thành bình phương: 4(n² + bn + c) = (2n + b)² + (4c − b²).',
      'Rút gọn phần hằng số theo modulo p.',
      'Vì p nguyên tố, bình phương chia hết cho p kéo theo cơ số chia hết cho p.',
      'Giải đồng dư bậc nhất để tìm lớp n.',
    ],
    traps: [
      'Nhân với 4 mà quên rằng chỉ hợp lệ khi p lẻ.',
      'Kết luận n bằng một số cụ thể thay vì một lớp đồng dư.',
      'Không thử lại với một giá trị n cụ thể.',
    ],
    transfer: 'Bài số học mức khó của đề chuyên KHTN và đề học sinh giỏi.',
    mastery: 'Nhận ra ngay kỹ thuật "nhân 4 hoàn thành bình phương" khi gặp tam thức và modulo lẻ.',
  },
  'g-chinh-phuong-mod4': {
    recognize: 'Phương trình dạng tổng hai bình phương bằng một hằng số.',
    method: [
      'Nhớ: số chính phương chia 4 chỉ dư 0 hoặc 1.',
      'Suy ra tổng hai bình phương chia 4 dư 0, 1 hoặc 2.',
      'Tính số dư của vế phải khi chia cho 4.',
      'Nếu dư 3 thì phương trình vô nghiệm.',
    ],
    traps: [
      'Chọn sai modulo: với tổng hai bình phương phải dùng mod 4, không phải mod 3.',
      'Thử vài giá trị rồi kết luận vô nghiệm mà không chứng minh.',
    ],
    transfer:
      'Kỹ thuật loại nghiệm chuẩn trong bài phương trình nghiệm nguyên của đề chuyên.',
    mastery: 'Thuộc bảng số dư của số chính phương theo mod 3, 4, 8, 9.',
  },
  'g-ucln-bcnn': {
    recognize: 'Hỏi ước chung lớn nhất hoặc bội chung nhỏ nhất của hai số.',
    method: [
      'Dùng thuật toán Euclid: lấy số lớn chia số bé, thay số lớn bằng số dư, lặp lại.',
      'ƯCLN là số dư khác 0 cuối cùng.',
      'BCNN = tích hai số chia cho ƯCLN.',
    ],
    traps: [
      'Nhầm ƯCLN với BCNN.',
      'Phân tích thừa số nguyên tố sai với số lớn — Euclid nhanh và an toàn hơn.',
    ],
    transfer: 'Kiến thức nền cho toàn bộ mạch số học của đề chuyên.',
    mastery: 'Chạy Euclid nhẩm được với hai số ba chữ số.',
  },
  'g-chinh-phuong-4-lien-tiep': {
    recognize: 'Tích của bốn số nguyên liên tiếp cộng thêm 1.',
    method: [
      'Ghép số đầu với số cuối, số thứ hai với số thứ ba.',
      'Hai tích thu được chênh nhau đúng 2 đơn vị.',
      'Đặt t bằng tích nhỏ hơn ⇒ biểu thức thành t(t + 2) + 1 = (t + 1)².',
      'Viết kết quả theo n.',
    ],
    traps: [
      'Ghép sai cặp (ví dụ ghép số đầu với số thứ hai) ⇒ không ra hằng đẳng thức.',
      'Quên trả lời theo n mà chỉ đưa ra giá trị số.',
    ],
    transfer: 'Dạng "chứng minh là số chính phương" quen thuộc của đề chuyên Ams và KHTN.',
    mastery: 'Nhìn thấy bốn số liên tiếp là nghĩ ngay tới phép ghép cặp đầu–cuối.',
  },
  'g-dirichlet': {
    recognize:
      'Có n đối tượng phân vào k nhóm, đề hỏi khẳng định nào chắc chắn đúng.',
    method: [
      'Xác định rõ đâu là "thỏ" (đối tượng) và đâu là "chuồng" (nhóm).',
      'Áp dụng dạng mạnh: tồn tại chuồng chứa ít nhất ⌈n/k⌉ thỏ.',
      'Kiểm tra không thể khẳng định con số lớn hơn bằng cách xét phân bố đều nhất.',
    ],
    traps: [
      'Kết luận con số lớn hơn ⌈n/k⌉ — sai vì có phản ví dụ.',
      'Nhầm vai trò thỏ và chuồng.',
      'Dùng ⌊n/k⌋ thay vì ⌈n/k⌉.',
    ],
    transfer:
      'Bài chốt tổ hợp của đề chuyên KHTN và Ams — thường 1,0 đến 2,0 điểm, ít thí sinh làm trọn.',
    mastery: 'Tự thiết kế được hệ thống "chuồng" cho những bài chưa từng gặp.',
  },
  'g-dem-chu-so': {
    recognize: 'Đếm số tự nhiên có các chữ số đôi một khác nhau lập từ một tập chữ số.',
    method: [
      'Xử lý ràng buộc chữ số đầu tiên khác 0 trước.',
      'Các vị trí còn lại: chọn có thứ tự từ các chữ số chưa dùng.',
      'Nhân các số cách chọn theo quy tắc nhân.',
    ],
    traps: [
      'Quên điều kiện chữ số hàng cao nhất khác 0 — bẫy kinh điển của dạng này.',
      'Nhầm giữa có lặp và không lặp chữ số.',
    ],
    transfer:
      'Bài đếm của đề chuyên và phần tổ hợp – xác suất của đề tốt nghiệp THPT.',
    mastery: 'Tự động xử lý ràng buộc "khó nhất" trước khi đếm phần còn lại.',
  },
  'g-bat-bien': {
    recognize:
      'Một quá trình lặp lại phép biến đổi, đề hỏi trạng thái cuối cùng hoặc hỏi có thể đạt trạng thái nào đó không.',
    method: [
      'Tìm một đại lượng KHÔNG đổi qua mỗi phép biến đổi (thường là tính chẵn lẻ của tổng).',
      'Chứng minh nó thực sự bất biến với MỌI phép biến đổi được phép.',
      'Tính giá trị bất biến ở trạng thái ban đầu.',
      'Suy ra kết luận cho trạng thái cuối.',
    ],
    traps: [
      'Chọn đại lượng "gần bất biến" nhưng lại thay đổi trong một trường hợp.',
      'Không kiểm tra bất biến với mọi phép biến đổi.',
      'Nhầm rằng kết quả phụ thuộc thứ tự thực hiện.',
    ],
    transfer:
      'Bài chốt của đề chuyên KHTN — đúng dạng "chứng minh không thể" hoặc "kết quả không đổi".',
    mastery: 'Nghĩ tới tính chẵn lẻ hoặc tổng theo modulo ngay khi thấy quá trình lặp.',
  },

  /* ==================== BẤT ĐẲNG THỨC ==================== */
  'g-amgm-min': {
    recognize: 'Tìm giá trị nhỏ nhất của tổng một biến với nghịch đảo của nó nhân hằng số.',
    method: [
      'Kiểm tra điều kiện dương của biến.',
      'Áp dụng AM–GM cho hai số dương: a + k/a ≥ 2√k.',
      'Tìm điểm rơi: dấu bằng khi a = k/a, tức a = √k.',
      'Kết luận giá trị nhỏ nhất và điểm đạt được.',
    ],
    traps: [
      'Áp dụng AM–GM khi chưa biết biến dương.',
      'Kết luận giá trị nhỏ nhất mà không chỉ ra dấu bằng đạt tại đâu — mất điểm barem.',
    ],
    transfer: 'Bài V đề vào 10 Hà Nội (0,5 điểm) và bài bất đẳng thức đề chuyên Sở.',
    mastery: 'Xác định điểm rơi trước khi chọn kỹ thuật, không làm ngược lại.',
  },
  'g-bdt-nghich-dao': {
    recognize: 'Hai biến dương có tổng cố định, hỏi giá trị nhỏ nhất của tổng hai nghịch đảo.',
    method: [
      'Dùng bất đẳng thức 1/a + 1/b ≥ 4/(a + b).',
      'Thay tổng đã cho vào.',
      'Dấu bằng khi a = b, tức mỗi số bằng nửa tổng.',
    ],
    traps: [
      'Nhớ nhầm thành 2/(a + b).',
      'Quên chỉ ra điều kiện dấu bằng.',
    ],
    transfer:
      'Đúng dạng Bài V đề vào 10 Hà Nội — câu 0,5 điểm quyết định điểm 10.',
    mastery: 'Nhận ra ngay cấu trúc "tổng cố định – nghịch đảo" và áp dụng trong 2 phút.',
  },
  'g-bdt-max-tich': {
    recognize: 'Hai biến dương có tổng cố định, hỏi giá trị lớn nhất của tích.',
    method: [
      'Áp dụng AM–GM: √(ab) ≤ (a + b)/2.',
      'Bình phương hai vế để có ab ≤ (a + b)²/4.',
      'Dấu bằng khi hai số bằng nhau.',
    ],
    traps: [
      'Nhầm chiều bất đẳng thức (đây là bài tìm giá trị LỚN nhất).',
      'Quên bình phương nên kết quả thiếu mũ 2.',
    ],
    transfer: 'Bài V đề vào 10 và bước trung gian trong nhiều bài cực trị đề chuyên.',
    mastery: 'Hiểu được vì sao "tổng cố định thì tích lớn nhất khi hai số bằng nhau".',
  },
  'g-bdt-ba-bien': {
    recognize: 'Ba biến dương có tổng cho trước, hỏi giá trị lớn nhất của ab + bc + ca.',
    method: [
      'Xuất phát từ (a − b)² + (b − c)² + (c − a)² ≥ 0.',
      'Suy ra a² + b² + c² ≥ ab + bc + ca.',
      'Khai triển (a + b + c)² rồi thay vào.',
      'Kết luận ab + bc + ca ≤ (a + b + c)²/3, dấu bằng khi ba biến bằng nhau.',
    ],
    traps: [
      'Nhớ nhầm mẫu số là 4 thay vì 3 (mẫu 4 là cho trường hợp hai biến).',
      'Không nêu điều kiện dấu bằng.',
    ],
    transfer: 'Bài III đề chuyên Sở (Ams, Chu Văn An) — 2,0 điểm.',
    mastery: 'Chứng minh lại được bất đẳng thức này từ đầu, không chỉ học thuộc.',
  },

  /* ==================== LỚP 10 ==================== */
  'gq-tap-hop': {
    recognize: 'Cho hai tập hợp dưới dạng khoảng/đoạn, hỏi giao hoặc hợp.',
    method: [
      'Vẽ trục số và tô hai tập bằng hai màu khác nhau.',
      'Giao là phần chồng lên nhau; hợp là toàn bộ phần được tô.',
      'Xét kỹ từng đầu mút: đóng khi cả hai tập đều lấy, mở khi có ít nhất một tập không lấy.',
    ],
    traps: [
      'Nhầm dấu ngoặc vuông với ngoặc tròn ở đầu mút.',
      'Nhầm giao với hợp khi làm nhanh.',
    ],
    transfer:
      'Chương mở đầu lớp 10, quyết định khả năng viết tập nghiệm chính xác trong suốt ba năm.',
    mastery: 'Không cần vẽ trục số vẫn lấy đúng giao/hợp và đúng loại ngoặc.',
  },
  'gq-dau-tam-thuc': {
    recognize: 'Bất phương trình bậc hai một ẩn.',
    method: [
      'Tìm nghiệm của tam thức (nhẩm Viète hoặc tính Δ).',
      'Xác định dấu của hệ số a.',
      'Áp dụng quy tắc "trong trái ngoài cùng": giữa hai nghiệm thì trái dấu a.',
      'Viết tập nghiệm bằng ký hiệu khoảng.',
    ],
    traps: [
      'Nhầm chiều: bất phương trình < 0 với a > 0 cho khoảng GIỮA hai nghiệm.',
      'Dùng ngoặc vuông cho bất phương trình nghiêm ngặt.',
    ],
    transfer:
      'Công cụ nền dùng lại ở đạo hàm (xét dấu y′), tích phân và mũ – logarit trong suốt lớp 11, 12.',
    mastery: 'Xét dấu tam thức thành phản xạ, không cần lập bảng.',
  },
  'gq-tam-thuc-tham-so': {
    recognize: 'Tìm tham số để tam thức bậc hai luôn dương (hoặc luôn âm) với mọi x.',
    method: [
      'Kiểm tra hệ số a: luôn dương cần a > 0.',
      'Yêu cầu Δ < 0 (không có nghiệm thực).',
      'Giải bất phương trình theo tham số.',
      'Nếu a chứa tham số, phải xét thêm trường hợp a = 0.',
    ],
    traps: [
      'Quên điều kiện a > 0 mà chỉ xét Δ < 0.',
      'Dùng Δ ≤ 0 cho yêu cầu "luôn dương" (dấu bằng cho phép chạm 0, không thoả).',
      'Bỏ sót trường hợp a = 0.',
    ],
    transfer: 'Dạng tham số kinh điển lớp 10, tiền đề cho bài tham số về cực trị lớp 12.',
    mastery: 'Luôn viết đủ hai điều kiện a và Δ, không bỏ sót trường hợp suy biến.',
  },
  'gq-dinh-parabol': {
    recognize: 'Hỏi toạ độ đỉnh, trục đối xứng hoặc giá trị lớn nhất/nhỏ nhất của hàm bậc hai.',
    method: [
      'Hoành độ đỉnh: x = −b/(2a).',
      'Tung độ đỉnh: thay hoành độ vào hàm số.',
      'Trục đối xứng là đường thẳng đứng qua đỉnh.',
      'a > 0 thì đỉnh là điểm thấp nhất; a < 0 thì là điểm cao nhất.',
    ],
    traps: [
      'Quên dấu trừ trong công thức −b/(2a).',
      'Đảo thứ tự hoành độ và tung độ khi ghi toạ độ đỉnh.',
    ],
    transfer:
      'Nền tảng trực tiếp cho phần khảo sát hàm số lớp 12 — hiểu parabol thì đọc bảng biến thiên rất nhanh.',
    mastery: 'Tính đỉnh trong đầu với hệ số nguyên nhỏ.',
  },
  'gq-dinh-li-cosin': {
    recognize: 'Tam giác biết hai cạnh và góc xen giữa, hỏi cạnh còn lại.',
    method: [
      'Xác định góc đã cho có xen giữa hai cạnh đã biết hay không.',
      'Áp dụng a² = b² + c² − 2bc·cos A.',
      'Với A = 60° thì cos A = 1/2; với A = 120° thì cos A = −1/2 (dấu trừ đổi thành cộng).',
      'Khai căn để có cạnh.',
    ],
    traps: [
      'Sai dấu với góc tù: cos 120° âm nên biểu thức thành cộng bc.',
      'Dùng định lí cosin khi góc không xen giữa hai cạnh đã biết.',
    ],
    transfer:
      'Bài toán thực tế về đo đạc trong đề kiểm tra lớp 10 và trong phần trả lời ngắn của đề tốt nghiệp.',
    mastery: 'Chọn đúng giữa định lí sin và định lí cosin ngay từ dữ kiện đề.',
  },
  'gq-tich-vo-huong': {
    recognize: 'Hai vectơ cho bằng toạ độ, đề hỏi điều kiện vuông góc hoặc giá trị tích vô hướng.',
    method: [
      'Tích vô hướng theo toạ độ: x₁x₂ + y₁y₂.',
      'Hai vectơ vuông góc khi và chỉ khi tích vô hướng bằng 0.',
      'Giải phương trình bậc nhất theo tham số.',
    ],
    traps: [
      'Nhầm tích vô hướng (kết quả là số) với phép nhân vectơ.',
      'Sai dấu khi một toạ độ âm.',
    ],
    transfer:
      'Ngôn ngữ nền cho toàn bộ hình toạ độ lớp 10 và hình Oxyz lớp 12 — học hời hợt ở đây sẽ trả giá ở lớp 12.',
    mastery: 'Viết được điều kiện vuông góc ngay lập tức, cả trong mặt phẳng lẫn không gian.',
  },
  'gq-khoang-cach-oxy': {
    recognize: 'Cho điểm và đường thẳng dạng tổng quát, hỏi khoảng cách.',
    method: [
      'Đưa đường thẳng về dạng ax + by + c = 0.',
      'Thay toạ độ điểm vào tử số, lấy trị tuyệt đối.',
      'Mẫu số là √(a² + b²).',
      'Rút gọn phân số.',
    ],
    traps: [
      'Quên lấy trị tuyệt đối ở tử ⇒ ra khoảng cách âm.',
      'Quên đưa phương trình về dạng có vế phải bằng 0 trước khi thay.',
    ],
    transfer:
      'Dạng cơ bản lớp 10, lặp lại gần như nguyên vẹn ở hình Oxyz lớp 12 (chỉ thêm một biến).',
    mastery: 'Áp dụng công thức không cần nhìn lại sách, kể cả bản ba chiều.',
  },
  'gq-duong-tron-oxy': {
    recognize: 'Phương trình dạng x² + y² + Dx + Ey + F = 0, hỏi tâm và bán kính.',
    method: [
      'Đối chiếu với dạng chuẩn x² + y² − 2ax − 2by + c = 0.',
      'Tâm là I(a; b) với a = −D/2, b = −E/2.',
      'Bán kính R = √(a² + b² − c).',
      'Kiểm tra a² + b² − c > 0 thì mới là đường tròn thật.',
    ],
    traps: [
      'Quên dấu trừ khi lấy tâm từ hệ số ⇒ tâm bị đảo dấu.',
      'Lấy R = a² + b² − c mà quên khai căn.',
    ],
    transfer: 'Lặp lại gần nguyên vẹn ở phần mặt cầu trong Oxyz lớp 12.',
    mastery: 'Đọc ra tâm và bán kính trong một dòng nháp.',
  },
  'gq-to-hop': {
    recognize:
      'Bài đếm cách chọn: có phân biệt vai trò/thứ tự hay không là điểm mấu chốt.',
    method: [
      'Đọc kỹ xem việc chọn có phân biệt thứ tự hay không.',
      'Có thứ tự ⇒ chỉnh hợp A(n, k). Không thứ tự ⇒ tổ hợp C(n, k).',
      'Áp dụng công thức và tính.',
      'Nhớ liên hệ A(n, k) = C(n, k) × k!.',
    ],
    traps: [
      'Nhầm chỉnh hợp với tổ hợp — lỗi số một của chương này.',
      'Đếm trùng khi chia trường hợp không rời nhau.',
    ],
    transfer:
      'Nền cho toàn bộ phần xác suất lớp 11, 12 và phần thống kê – xác suất của đề tốt nghiệp.',
    mastery: 'Đọc đề là phân loại được ngay có thứ tự hay không.',
  },
  'gq-newton': {
    recognize: 'Hỏi hệ số của một số hạng chứa luỹ thừa cụ thể trong khai triển nhị thức.',
    method: [
      'Viết số hạng tổng quát: C(n, i)·a^(n−i)·b^i.',
      'Cho số mũ của x bằng yêu cầu để tìm i.',
      'Thay i vào để tính hệ số.',
    ],
    traps: [
      'Nhầm chỉ số: khi cần x^k thì i = n − k, không phải i = k.',
      'Quên nâng luỹ thừa cho hằng số trong ngoặc.',
    ],
    transfer: 'Xuất hiện đều trong đề kiểm tra lớp 10 và đề tốt nghiệp THPT.',
    mastery: 'Viết đúng số hạng tổng quát ngay dòng đầu tiên.',
  },

  /* ==================== LỚP 11 ==================== */
  'gq-pt-luong-giac': {
    recognize: 'Phương trình lượng giác cơ bản với vế phải là giá trị đặc biệt.',
    method: [
      'Nhận dạng hàm lượng giác: sin, cos hay tan.',
      'Đưa vế phải về dạng giá trị lượng giác của một cung đặc biệt.',
      'Áp dụng đúng công thức nghiệm của từng hàm.',
      'Với tan/cot, ghi thêm điều kiện xác định.',
    ],
    traps: [
      'Với phương trình sin, chỉ ghi một trong hai họ nghiệm — lỗi mất điểm phổ biến nhất.',
      'Dùng chu kì kπ cho sin/cos (đúng ra là k2π) và ngược lại cho tan.',
      'Quên ghi k ∈ ℤ.',
    ],
    transfer:
      'Chương trọng điểm đầu lớp 11, và là nền cho các bài lượng giác trong đề tốt nghiệp.',
    mastery: 'Viết đủ và đúng họ nghiệm cho cả ba loại phương trình mà không cần tra công thức.',
  },
  'gq-cap-so': {
    recognize: 'Dãy số cho bởi số hạng đầu và công sai (hoặc công bội).',
    method: [
      'Xác định là cấp số cộng (cộng thêm d) hay cấp số nhân (nhân với q).',
      'Số hạng tổng quát: CSC uₙ = u₁ + (n − 1)d; CSN uₙ = u₁·q^(n−1).',
      'Tổng n số hạng đầu: CSC Sₙ = n(u₁ + uₙ)/2; CSN Sₙ = u₁(1 − qⁿ)/(1 − q).',
    ],
    traps: [
      'Dùng nd thay vì (n − 1)d — lỗi lệch một bước kinh điển.',
      'Áp dụng công thức tổng CSN khi q = 1.',
    ],
    transfer:
      'Chương "dễ ăn điểm" nhất lớp 11; bài toán lãi kép trong đề tốt nghiệp cũng chính là cấp số nhân.',
    mastery: 'Viết đúng công thức ngay lần đầu, không lệch chỉ số.',
  },
  'gq-gioi-han': {
    recognize: 'Giới hạn của một phân thức khi x tiến tới giá trị làm cả tử và mẫu bằng 0.',
    method: [
      'Thay thử để xác nhận đúng là dạng vô định 0/0.',
      'Phân tích tử thành nhân tử, tìm nhân tử chung với mẫu.',
      'Rút gọn nhân tử chung.',
      'Thay giá trị vào biểu thức đã rút gọn.',
    ],
    traps: [
      'Kết luận "không tồn tại" ngay khi thấy 0/0 mà chưa khử.',
      'Phân tích nhân tử sai dấu.',
    ],
    transfer:
      'Nền tảng để hiểu đạo hàm và tiệm cận — hai nội dung chiếm tỉ trọng lớn trong đề tốt nghiệp.',
    mastery: 'Nhận diện và khử dạng vô định trong dưới 1 phút.',
  },
  'gq-mu-logarit': {
    recognize: 'Phương trình mũ có thể đưa hai vế về cùng một cơ số.',
    method: [
      'Viết mọi cơ số thành luỹ thừa của cùng một cơ số gốc.',
      'Gộp số mũ ở mỗi vế.',
      'Hàm mũ đơn ánh nên cho hai số mũ bằng nhau.',
      'Giải phương trình bậc nhất thu được.',
    ],
    traps: [
      'Nhân số mũ sai khi viết 8^x = 2^(3x).',
      'Với bất phương trình, quên đổi chiều khi cơ số nằm trong khoảng (0; 1).',
    ],
    transfer:
      'Chuyên đề tần suất cao trong đề tốt nghiệp THPT, xuất hiện ở cả ba phần của đề.',
    mastery: 'Đưa về cùng cơ số trong một dòng, không nhầm khi cơ số là luỹ thừa.',
  },
  'gq-logarit-tinh': {
    recognize: 'Tính giá trị một biểu thức chứa logarit với cơ số và đối số đẹp.',
    method: [
      'Nhớ log_a(aⁿ) = n.',
      'Dùng log_a x + log_a y = log_a(xy) khi cần gộp.',
      'Đổi cơ số khi các logarit khác cơ số nhau.',
    ],
    traps: [
      'Nhầm log_a(x + y) với log_a x + log_a y — hoàn toàn khác nhau.',
      'Quên điều kiện đối số của logarit phải dương.',
    ],
    transfer: 'Câu nhận biết – thông hiểu chắc chắn có trong Phần I đề tốt nghiệp.',
    mastery: 'Thuộc và dùng đúng bốn công thức logarit cơ bản mà không tra bảng.',
  },
  'gq-dao-ham': {
    recognize: 'Cho hàm đa thức, hỏi giá trị đạo hàm tại một điểm.',
    method: [
      'Đạo hàm từng hạng tử: (xⁿ)′ = n·x^(n−1).',
      'Thay giá trị x₀ vào biểu thức đạo hàm.',
      'Chú ý dấu khi x₀ âm.',
    ],
    traps: [
      'Thay x₀ vào hàm số gốc thay vì vào đạo hàm.',
      'Sai dấu khi nâng luỹ thừa số âm.',
      'Quên đạo hàm của hằng số bằng 0.',
    ],
    transfer:
      'Công cụ quan trọng nhất của chương trình THPT — gần như toàn bộ lớp 12 xây trên đạo hàm.',
    mastery: 'Đạo hàm đa thức và tính giá trị trong dưới 1 phút, không sai dấu.',
  },
  'gq-tiep-tuyen': {
    recognize: 'Viết phương trình tiếp tuyến tại điểm có hoành độ cho trước.',
    method: [
      'Tính đạo hàm y′.',
      'Hệ số góc k = y′(x₀).',
      'Tung độ tiếp điểm y₀ = f(x₀).',
      'Viết y = k(x − x₀) + y₀ rồi rút gọn.',
    ],
    traps: [
      'Nhầm "tiếp tuyến TẠI điểm" với "tiếp tuyến ĐI QUA điểm" — hai bài toán khác nhau.',
      'Quên tính tung độ tiếp điểm.',
      'Rút gọn sai dấu ở bước cuối.',
    ],
    transfer: 'Dạng quen thuộc của đề kiểm tra lớp 11 và Phần II đề tốt nghiệp.',
    mastery: 'Làm trọn bài trong 3 phút với lời giải sạch, không nhầm hai loại tiếp tuyến.',
  },
  'gq-xac-suat-hop': {
    recognize: 'Cho xác suất hai biến cố và xác suất giao, hỏi xác suất hợp.',
    method: [
      'Áp dụng P(A ∪ B) = P(A) + P(B) − P(A ∩ B).',
      'Thay số và rút gọn.',
      'Kiểm tra kết quả phải nằm trong đoạn [0; 1].',
    ],
    traps: [
      'Quên trừ phần giao ⇒ kết quả có thể vượt quá 1.',
      'Nhầm xung khắc với độc lập: xung khắc thì giao rỗng, độc lập thì giao bằng tích.',
    ],
    transfer:
      'Nội dung được tăng tỉ trọng theo Chương trình GDPT 2018, có mặt đều trong đề tốt nghiệp.',
    mastery: 'Phân biệt rõ ba khái niệm: hợp, giao, và độc lập.',
  },

  /* ==================== LỚP 12 ==================== */
  'gq-cuc-tri-ham-bac-ba': {
    recognize: 'Hàm bậc ba, hỏi điểm cực đại hoặc cực tiểu.',
    method: [
      'Tính y′ và giải y′ = 0.',
      'Lập bảng xét dấu y′.',
      'y′ đổi dấu từ + sang − ⇒ cực đại; từ − sang + ⇒ cực tiểu.',
      'Kết luận theo đúng cái đề hỏi (điểm hay giá trị).',
    ],
    traps: [
      'Kết luận cực trị chỉ vì y′(x₀) = 0 mà không kiểm tra đổi dấu.',
      'Nhầm "điểm cực đại" (giá trị của x) với "giá trị cực đại" (giá trị của y).',
      'Nhầm vị trí cực đại và cực tiểu với hàm có hệ số bậc ba dương.',
    ],
    transfer:
      'Chuyên đề nặng ký nhất của đề tốt nghiệp — ứng dụng đạo hàm chiếm khoảng một phần tư số câu.',
    mastery: 'Đọc bảng biến thiên và kết luận cực trị mà không cần vẽ đồ thị.',
  },
  'gq-tiem-can': {
    recognize: 'Hàm phân thức có tử và mẫu đều bậc nhất.',
    method: [
      'Tiệm cận đứng: nghiệm của mẫu (với điều kiện tử không triệt tiêu tại đó).',
      'Tiệm cận ngang: tỉ số hai hệ số bậc cao nhất.',
      'Viết dưới dạng phương trình đường thẳng: x = … và y = …',
    ],
    traps: [
      'Đảo hai loại tiệm cận cho nhau.',
      'Quên kiểm tra tử có triệt tiêu cùng nghiệm mẫu không (khi đó không có tiệm cận đứng).',
      'Viết tiệm cận dưới dạng số thay vì phương trình đường thẳng.',
    ],
    transfer: 'Câu quen thuộc trong Phần I và Phần II đề tốt nghiệp THPT.',
    mastery: 'Đọc ra hai tiệm cận trực tiếp từ hệ số, không cần tính giới hạn.',
  },
  'gq-tich-phan': {
    recognize: 'Tích phân xác định của một đa thức trên một đoạn.',
    method: [
      'Tìm nguyên hàm từng hạng tử: ∫xⁿ dx = x^(n+1)/(n+1).',
      'Áp dụng công thức Newton–Leibniz: lấy F(b) − F(a).',
      'Quy đồng và rút gọn kết quả.',
    ],
    traps: [
      'Trừ ngược thành F(a) − F(b).',
      'Sai khi tính luỹ thừa của cận âm.',
      'Rút gọn phân số sai ở bước cuối.',
    ],
    transfer:
      'Chuyên đề tỉ trọng lớn thứ hai của đề tốt nghiệp; rất "ăn điểm" vì các dạng lặp lại đều đặn.',
    mastery: 'Tính tích phân đa thức chính xác trong dưới 2 phút.',
  },
  'gq-oxyz-khoang-cach': {
    recognize: 'Cho điểm và mặt phẳng trong không gian, hỏi khoảng cách.',
    method: [
      'Đưa mặt phẳng về dạng ax + by + cz + d = 0.',
      'Thay toạ độ điểm vào tử, lấy trị tuyệt đối.',
      'Mẫu là √(a² + b² + c²).',
      'Rút gọn.',
    ],
    traps: [
      'Quên trị tuyệt đối ở tử.',
      'Sai dấu khi toạ độ điểm âm nhân hệ số âm.',
      'Quên khai căn ở mẫu.',
    ],
    transfer:
      'Phần Oxyz là vùng "dễ ăn điểm nhất trong nhóm câu khó" của đề tốt nghiệp — quy trình rõ ràng, ít bẫy.',
    mastery: 'Thay số và ra kết quả trong 90 giây, không sai dấu.',
  },
  'gq-oxyz-mat-cau': {
    recognize: 'Phương trình bậc hai ba biến với hệ số của x², y², z² đều bằng 1.',
    method: [
      'Đối chiếu với dạng x² + y² + z² − 2ax − 2by − 2cz + d = 0.',
      'Tâm I(a; b; c) lấy từ hệ số chia đôi và đổi dấu.',
      'R = √(a² + b² + c² − d).',
      'Kiểm tra biểu thức dưới căn dương.',
    ],
    traps: [
      'Quên đổi dấu khi lấy toạ độ tâm.',
      'Lấy R mà quên khai căn.',
      'Không kiểm tra điều kiện tồn tại mặt cầu.',
    ],
    transfer: 'Câu chắc điểm trong Phần I và Phần II đề tốt nghiệp THPT.',
    mastery: 'Đọc ra tâm và bán kính ngay, giống hệt cách làm với đường tròn lớp 10.',
  },
  'gq-phuong-sai': {
    recognize: 'Cho mẫu số liệu, hỏi phương sai hoặc độ lệch chuẩn.',
    method: [
      'Tính số trung bình cộng của mẫu.',
      'Tính từng độ lệch so với trung bình rồi bình phương.',
      'Cộng lại và chia cho số phần tử ⇒ phương sai.',
      'Khai căn phương sai ⇒ độ lệch chuẩn.',
    ],
    traps: [
      'Nhầm phương sai với độ lệch chuẩn (chênh nhau một phép khai căn).',
      'Với mẫu ghép nhóm, dùng đầu mút nhóm thay vì trung điểm nhóm.',
      'Quên bình phương độ lệch.',
    ],
    transfer:
      'Nội dung mới của Chương trình GDPT 2018, có mặt trong định dạng đề tốt nghiệp mới.',
    mastery: 'Tính đúng cả hai đại lượng và giải thích được ý nghĩa của chúng.',
  },
  'gq-xac-suat-dieu-kien': {
    recognize:
      'Bài toán nhiều giai đoạn: chọn hộp rồi lấy vật, hoặc chọn nhóm rồi chọn cá thể.',
    method: [
      'Vẽ sơ đồ cây cho các giai đoạn.',
      'Nhân xác suất dọc theo mỗi nhánh.',
      'Cộng xác suất của các nhánh dẫn tới kết quả cần tìm.',
      'Đây chính là công thức xác suất toàn phần.',
    ],
    traps: [
      'Cộng số vật của hai hộp lại rồi tính như một hộp — sai hoàn toàn về bản chất.',
      'Quên nhân với xác suất chọn hộp.',
      'Đảo ngược điều kiện: nhầm P(A|B) với P(B|A).',
    ],
    transfer:
      'Nội dung mới của lớp 12 theo Chương trình GDPT 2018, thường ra ở Phần II hoặc Phần III đề tốt nghiệp.',
    mastery: 'Vẽ sơ đồ cây và tính đúng ngay lần đầu, kể cả với bài Bayes ngược.',
  },
  'gq-diem-phan-ii': {
    recognize: 'Câu hỏi về cách tính điểm Phần II (đúng/sai) của đề tốt nghiệp THPT.',
    method: [
      'Nhớ bảng điểm luỹ tiến: 1 ý đúng 0,10 — 2 ý 0,25 — 3 ý 0,50 — 4 ý 1,00.',
      'Tra điểm cho từng câu theo số ý đúng.',
      'Cộng điểm bốn câu lại.',
    ],
    traps: [
      'Tính điểm tuyến tính (nhân số ý đúng với 0,25) — sai vì thang điểm luỹ tiến.',
      'Quên rằng câu 0 ý đúng được 0 điểm.',
    ],
    transfer:
      'Hiểu cơ chế này thay đổi hẳn chiến thuật làm bài: bước từ 3 ý lên 4 ý đáng 0,50 điểm, gấp đôi bước từ 2 lên 3. Câu nào đã chắc 3 ý thì phải dồn sức xử lý nốt ý cuối.',
    mastery: 'Trong phòng thi biết ngay nên dồn thời gian vào câu nào của Phần II.',
  },

  /* ==================== BỔ SUNG: CHUYÊN ĐỀ NÂNG CAO & KỸ NĂNG ==================== */
  'g-khong-doi-tiep-tuyen': {
    recognize:
      'Có một điểm chạy trên đường tròn và đề hỏi một tích, tổng hoặc góc “có phụ thuộc vị trí điểm đó không”.',
    method: [
      'Vẽ hình ở một vị trí bất kỳ của điểm chạy, ghi đủ giả thiết lên hình.',
      'Khai thác tính chất hai tiếp tuyến cắt nhau để chuyển các đoạn về cùng một tam giác.',
      'Chỉ ra tam giác vuông và đường cao tương ứng, rồi dùng hệ thức lượng.',
      'Kết luận đại lượng chỉ phụ thuộc các yếu tố cố định (thường là R), nên không đổi.',
    ],
    traps: [
      'Chỉ thử một vị trí đặc biệt của M rồi kết luận — đó là dự đoán, không phải chứng minh.',
      'Quên chứng minh OC ⊥ OD trước khi dùng hệ thức đường cao.',
      'Nhầm CM = CB thay vì CM = CA.',
    ],
    transfer:
      'Đây là ý 3 của Bài IV đề vào 10 Hà Nội — 1,0 điểm quyết định khoảng cách giữa 9 và 10.',
    mastery: 'Nhìn thấy “điểm chạy + hỏi đại lượng” là tự động đi tìm yếu tố cố định của bài toán.',
  },
  'g-khoang-cach-day': {
    recognize: 'Đề cho bán kính và độ dài một dây, hỏi khoảng cách từ tâm đến dây (hoặc ngược lại).',
    method: [
      'Kẻ OH vuông góc với dây tại H.',
      'Dùng tính chất: đường kính vuông góc với dây thì đi qua trung điểm dây ⇒ HA = AB/2.',
      'Áp dụng Pythagore cho tam giác OHA vuông tại H.',
      'Khai căn và ghi đơn vị.',
    ],
    traps: [
      'Dùng cả độ dài dây AB thay vì một nửa của nó.',
      'Lấy hiệu R − AB/2 thay vì hiệu bình phương.',
    ],
    transfer:
      'Bước trung gian rất hay dùng trong Bài IV, đặc biệt ở các bài về vị trí tương đối và cực trị độ dài dây.',
    mastery: 'Viết ngay được hệ thức R² = d² + (AB/2)² mà không cần vẽ lại hình.',
  },
  'g-phan-nguyen-dem': {
    recognize: 'Bài đếm có dạng “bao nhiêu số không vượt quá N và chia hết cho k”.',
    method: [
      'Viết số cần đếm dưới dạng k·q.',
      'Ràng buộc k·q ≤ N ⇒ q ≤ N/k.',
      'Số giá trị q nguyên dương thoả mãn chính là [N/k].',
    ],
    traps: [
      'Cộng thêm 1 theo thói quen đếm “từ a đến b” — ở đây q bắt đầu từ 1 nên không cộng.',
      'Làm tròn N/k thay vì lấy phần nguyên.',
    ],
    transfer:
      'Nền của các bài đếm trong đề chuyên và của công thức Legendre về số mũ trong giai thừa.',
    mastery: 'Chuyển bài đếm bội thành một biểu thức phần nguyên chỉ trong một dòng.',
  },
  'g-so-mu-giai-thua': {
    recognize: 'Hỏi số chữ số 0 tận cùng của n!, hoặc số mũ của một số nguyên tố trong n!.',
    method: [
      'Nhận ra mỗi chữ số 0 tận cùng ứng với một cặp thừa số 2 và 5.',
      'Trong n! thừa số 2 luôn dư so với thừa số 5, nên chỉ cần đếm thừa số 5.',
      'Áp dụng công thức Legendre: [n/5] + [n/25] + [n/125] + …',
      'Cộng đến khi lũy thừa vượt quá n.',
    ],
    traps: [
      'Chỉ lấy [n/5] mà quên các số chia hết cho 25, 125 (chúng đóng góp thêm thừa số 5).',
      'Đếm thừa số 2 thay vì thừa số 5.',
    ],
    transfer:
      'Dạng kinh điển của đề chuyên và học sinh giỏi; cũng là ví dụ chuẩn mực cho ứng dụng của phần nguyên.',
    mastery: 'Tính được số chữ số 0 của 100! trong đầu trong dưới 30 giây.',
  },
  'g-menelaus-ti-so': {
    recognize:
      'Tam giác có một cát tuyến cắt ba đường thẳng chứa ba cạnh, đề hỏi một tỉ số độ dài.',
    method: [
      'Chọn tam giác và cát tuyến sao cho ba giao điểm nằm trên ba đường thẳng chứa cạnh.',
      'Viết hệ thức Menelaus: tích ba tỉ số bằng 1, đi vòng theo đúng thứ tự đỉnh.',
      'Thay hai tỉ số đã biết, rút ra tỉ số cần tìm.',
      'Đổi về đúng chiều tỉ số mà đề hỏi (AF/FC hay CF/FA).',
    ],
    traps: [
      'Chọn sai tam giác hoặc sai cát tuyến, dẫn tới hệ thức vô nghĩa.',
      'Đảo chiều tỉ số ở bước cuối.',
      'Dùng BD/DC trong khi hệ thức cần DB/BC — hai tỉ số khác nhau.',
    ],
    transfer:
      'Ý cuối bài hình của đề chuyên KHTN và Ams. Cách 2 không dùng Menelaus (kẻ đường song song) vẫn luôn khả thi ở cấp THCS.',
    mastery: 'Viết đúng hệ thức Menelaus ngay lần đầu và kiểm chứng lại bằng một cách khác.',
  },
  'g-ti-so-dien-tich': {
    recognize: 'Hai tam giác có chung một đỉnh và hai đáy nằm trên cùng một đường thẳng.',
    method: [
      'Xác định đường cao chung hạ từ đỉnh chung xuống đường thẳng chứa hai đáy.',
      'Tỉ số diện tích bằng tỉ số hai cạnh đáy.',
      'Quy đổi tỉ số đề cho (BM/MC) sang tỉ số cần dùng (BM/BC).',
    ],
    traps: [
      'Dùng luôn BM/MC làm tỉ số diện tích — sai vì mẫu số phải là cả cạnh BC.',
      'Áp dụng khi hai tam giác không chung đường cao.',
    ],
    transfer:
      'Công cụ chuyển đổi cực mạnh trong bài hình đề chuyên: đưa bài toán tỉ số độ dài về tỉ số diện tích và ngược lại.',
    mastery: 'Tự chuyển qua lại giữa tỉ số đáy và tỉ số diện tích mà không cần nghĩ.',
  },
  'g-cuc-han-tong': {
    recognize:
      'Đề hỏi giá trị nhỏ nhất (hoặc lớn nhất) của một cấu hình thoả ràng buộc rời rạc.',
    method: [
      'Sắp xếp các đối tượng theo thứ tự tăng dần.',
      'Chặn từng phần tử bởi giá trị nhỏ nhất có thể của nó.',
      'Cộng các chặn để có chặn dưới cho tổng.',
      'Chỉ ra một cấu hình cụ thể đạt được chặn đó — bước này bắt buộc, nếu thiếu thì chưa xong bài.',
    ],
    traps: [
      'Chỉ chứng minh chặn dưới mà quên chỉ ra cấu hình đạt được.',
      'Quên điều kiện “đôi một khác nhau” nên chặn quá thấp.',
    ],
    transfer:
      'Nguyên lí cực hạn là công cụ cho bài chốt tổ hợp của đề chuyên — thường ít thí sinh làm trọn vẹn.',
    mastery: 'Luôn tự hỏi “cấu hình cực trị trông như thế nào” trước khi bắt đầu tính.',
  },
  'g-dirichlet-hieu-chia-het': {
    recognize:
      'Đề hỏi “cần ít nhất bao nhiêu đối tượng để chắc chắn tồn tại hai đối tượng có quan hệ nào đó”.',
    method: [
      'Tìm cách phân loại các đối tượng thành hữu hạn nhóm — đây là bước “xây chuồng”.',
      'Với quan hệ chia hết cho k, chuồng tự nhiên là k lớp số dư khi chia cho k.',
      'Số cần tìm bằng số chuồng cộng 1.',
      'Chỉ ra một cấu hình với đúng số chuồng phần tử mà không thoả — để chứng minh con số đó là nhỏ nhất.',
    ],
    traps: [
      'Trả lời bằng số chuồng thay vì số chuồng cộng 1.',
      'Quên phần chứng minh tính nhỏ nhất (phản ví dụ với k phần tử).',
    ],
    transfer:
      'Dạng Dirichlet cơ bản nhất, xuất hiện đều trong đề chuyên KHTN và các kỳ học sinh giỏi.',
    mastery: 'Thiết kế được “chuồng” cho cả những bài chưa từng gặp, không chỉ bài về số dư.',
  },
  'g-barem-trinh-bay': {
    recognize: 'Câu hỏi về cách trình bày, về bước bắt buộc, hoặc về quy tắc chấm điểm.',
    method: [
      'Nhớ nguyên tắc: barem tự luận cho điểm theo từng bước có căn cứ, không chỉ theo đáp số.',
      'Xác định bước nào trong dạng bài đó được barem tính điểm riêng.',
      'Ưu tiên các bước “hình thức” hay bị bỏ quên: điều kiện xác định, đặt ẩn kèm đơn vị, đối chiếu điều kiện, câu kết luận.',
    ],
    traps: [
      'Coi trình bày là chuyện phụ — thực tế đây là phần lấy điểm rẻ nhất.',
      'Bỏ trống ý chưa xong thay vì viết hướng làm đã nghĩ ra.',
    ],
    transfer:
      'Áp dụng cho mọi bài tự luận của đề vào 10 và đề chuyên. Cùng một lời giải, trình bày chuẩn có thể hơn 0,5–1,0 điểm.',
    mastery: 'Viết lời giải mà giám khảo tìm được từng ý điểm chỉ bằng cách đọc lướt.',
  },
  'g-chien-thuat-thoi-gian': {
    recognize: 'Câu hỏi về phân bổ thời gian, tỉ trọng điểm hoặc thứ tự làm bài.',
    method: [
      'Nhớ ma trận đề: mỗi phần chiếm bao nhiêu điểm.',
      'Phân bổ thời gian tỉ lệ với số điểm, cộng thêm biên cho phần khó.',
      'Đặt trần thời gian cho từng phần; chạm trần thì chuyển phần và đánh dấu.',
      'Chừa 5–8 phút cuối để soát bài.',
    ],
    traps: [
      'Làm tuần tự cứng nhắc từ đầu tới cuối, không phân loại độ khó trước.',
      'Sa lầy vào một ý ít điểm — cách mất điểm đắt nhất trong phòng thi.',
    ],
    transfer:
      'Quyết định khoảng cách giữa “năng lực có” và “điểm số đạt được”. Nhiều học sinh 9 điểm ở nhà chỉ được 7,5 khi thi vì lý do này.',
    mastery: 'Trước khi thi đã biết mình sẽ dành bao nhiêu phút cho từng bài, và bám được kế hoạch đó.',
  },
  'gq-the-tich-chop': {
    recognize: 'Đề cho diện tích đáy và chiều cao của một khối chóp.',
    method: [
      'Xác định rõ đâu là mặt đáy và đâu là chiều cao (khoảng cách từ đỉnh đến mặt đáy).',
      'Áp dụng V = (1/3) · S_đáy · h.',
      'Thay số và ghi đơn vị khối.',
    ],
    traps: [
      'Quên hệ số 1/3 — công thức S·h là của khối lăng trụ, không phải khối chóp.',
      'Lấy cạnh bên làm chiều cao khi cạnh bên không vuông góc với đáy.',
    ],
    transfer:
      'Câu chắc điểm ở Phần I đề tốt nghiệp, và là bước cuối của rất nhiều bài hình không gian phức tạp hơn.',
    mastery: 'Xác định đúng chiều cao trong hình vẽ, kể cả khi đỉnh không nằm trên trục đối xứng.',
  },
  'gq-goc-duong-mat': {
    recognize:
      'Hình chóp có một cạnh bên vuông góc với đáy, đề hỏi góc giữa một đường thẳng và mặt phẳng đáy.',
    method: [
      'Xác định hình chiếu vuông góc của điểm đầu mút lên mặt phẳng — đây là bước quyết định.',
      'Góc cần tìm là góc giữa đường thẳng và hình chiếu của nó.',
      'Đưa về một tam giác vuông và tính tang của góc.',
      'Đối chiếu với bảng giá trị đặc biệt để suy ra số đo góc.',
    ],
    traps: [
      'Xác định sai hình chiếu vuông góc — nguyên nhân sai số một của chương này.',
      'Nhầm góc giữa đường và mặt với góc giữa hai đường thẳng.',
      'Quên rằng góc giữa đường và mặt luôn nằm trong khoảng từ 0° đến 90°.',
    ],
    transfer:
      'Xuất hiện đều ở Phần II đề tốt nghiệp và trong hầu hết các bài kiểm tra hình không gian lớp 11.',
    mastery: 'Nhìn hình là chỉ ra ngay hình chiếu và góc cần tính, không cần thử.',
  },
  'gq-diem-tong-ket': {
    recognize: 'Bài toán tính điểm trung bình môn với các loại điểm có hệ số khác nhau.',
    method: [
      'Xác định số điểm thường xuyên (hệ số 1), điểm giữa kỳ (hệ số 2), điểm cuối kỳ (hệ số 3).',
      'Tử số = tổng điểm thường xuyên + 2 × giữa kỳ + 3 × cuối kỳ.',
      'Mẫu số = số điểm thường xuyên + 5.',
      'Chia và làm tròn theo yêu cầu.',
    ],
    traps: [
      'Lấy trung bình cộng đơn thuần, bỏ qua hệ số.',
      'Quên cộng 5 vào mẫu số (5 = 2 + 3 là tổng hệ số của giữa kỳ và cuối kỳ).',
      'Làm tròn sai số chữ số thập phân theo yêu cầu.',
    ],
    transfer:
      'Trực tiếp phục vụ mục tiêu Top 1 tổng kết: biết công thức thì tính được mình cần bao nhiêu điểm ở bài kiểm tra sắp tới.',
    mastery: 'Tự tính được “cần bao nhiêu điểm cuối kỳ để đạt tổng kết 9,0” trước khi thi.',
  },
  /* ==================== HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG ==================== */
  'g-htl-hinh-chieu': {
    recognize:
      'Đề cho tam giác vuông, có đường cao hạ từ đỉnh góc vuông xuống cạnh huyền, và hỏi độ dài một đoạn trên cạnh huyền (HB hoặc HC). Từ khoá nhận dạng: "chân đường cao", "hình chiếu".',
    method: [
      'Vẽ hình, đặt tên rõ: A là đỉnh góc vuông, H là chân đường cao trên BC.',
      'Ghi ra hệ thức gốc: AB² = BC · BH và AC² = BC · CH.',
      'Ghép cặp cho đúng: hình chiếu luôn cùng đầu mút với cạnh góc vuông (AB ↔ BH vì cùng chứa B; AC ↔ CH vì cùng chứa C).',
      'Thay số, chia, kèm đơn vị.',
      'Kiểm tra nhanh: BH + CH phải bằng BC.',
    ],
    traps: [
      'Ghép nhầm cặp — lấy AC² = BC · BH, ra đúng phép chia nhưng sai đoạn cần tìm.',
      'Quên bình phương cạnh góc vuông, viết AC = BC · CH.',
      'Đề cho hai cạnh góc vuông chứ không cho cạnh huyền: phải tính cạnh huyền bằng Pythagoras trước.',
      'Bỏ đơn vị cm ở kết quả.',
    ],
    transfer:
      'Là ý a hoặc ý b của Bài IV (hình học) đề vào 10 Hà Nội và của phần hình học đề vào 10 các tỉnh, thường 0,75–1,0 điểm. Cũng là bước lót cho các câu chứng minh tam giác đồng dạng ở ý sau.',
    mastery:
      'Nhìn hình là đọc ngay được cặp hệ thức đúng, không cần thử cả hai; kiểm tra lại bằng BH + CH = BC trong dưới 5 giây.',
  },
  'g-htl-duong-cao': {
    recognize:
      'Đề cho hai cạnh góc vuông (hoặc một cạnh góc vuông và cạnh huyền) rồi hỏi đường cao ứng với cạnh huyền.',
    method: [
      'Nếu chưa có cạnh huyền, tính bằng Pythagoras: BC = √(AB² + AC²).',
      'Dùng hệ thức tích: AB · AC = BC · AH.',
      'Suy ra AH = AB · AC / BC.',
      'Nếu cần kết quả gọn, có thể kiểm chứng bằng 1/AH² = 1/AB² + 1/AC².',
    ],
    traps: [
      'Lấy AH bằng nửa cạnh huyền — chỉ đúng khi tam giác vuông cân, không đúng chung.',
      'Lấy trung bình cộng hai cạnh góc vuông.',
      'Nhầm sang hệ thức 1/AH = 1/AB + 1/AC (thiếu bình phương).',
      'Tính diện tích hai lần rồi làm tròn giữa chừng dẫn tới sai số.',
    ],
    transfer:
      'Xuất hiện trực tiếp ở ý tính toán của bài hình vào 10, và là công cụ phụ trợ cho bài toán thực tế đo khoảng cách. Thường 0,5–0,75 điểm.',
    mastery:
      'Viết được ngay AH = AB·AC/BC mà không phải dựng lại công thức diện tích, và biết dùng hệ thức nghịch đảo bình phương để đối chiếu.',
  },
  'g-htl-thuc-te-do-cao': {
    recognize:
      'Bài văn có bối cảnh đời thực: cột cờ, toà nhà, cây, tháp; có "góc nâng"/"góc hạ" và một khoảng cách ngang; thường có thêm chiều cao tầm mắt hoặc chiều cao chân đế.',
    method: [
      'Vẽ hình mô phỏng: cạnh ngang là khoảng cách, cạnh đứng là phần vật cao hơn tầm mắt, góc nâng nằm ở vị trí mắt.',
      'Xác định vị trí góc so với hai cạnh để chọn đúng tỉ số: đối/kề là tan, đối/huyền là sin, kề/huyền là cos.',
      'Tính phần cao hơn tầm mắt: x = (khoảng cách) · tan(góc).',
      'Cộng thêm chiều cao tầm mắt (hoặc phần chân đế) để ra chiều cao thật.',
      'Làm tròn đúng yêu cầu của đề và ghi đơn vị.',
    ],
    traps: [
      'Quên cộng chiều cao tầm mắt — đây là lỗi mất điểm số một của dạng này.',
      'Đảo ngược tỉ số: lấy khoảng cách chia cho tan thay vì nhân.',
      'Đặt máy tính ở chế độ radian thay vì độ.',
      'Làm tròn sớm ở bước trung gian rồi tiếp tục tính, khiến kết quả lệch ở hàng phần mười.',
      'Với "góc hạ" thì hình vẽ lộn ngược — phần cần tìm là độ sâu/khoảng cách chứ không phải chiều cao.',
    ],
    transfer:
      'Chính là bài toán thực tế 0,5–1,0 điểm trong đề vào 10 nhiều tỉnh và trong Bài III/V của đề Hà Nội các năm gần đây; cũng là dạng vận dụng quen thuộc ở đề khảo sát lớp 9.',
    mastery:
      'Vẽ được hình đúng ngay lần đầu và tự nhắc mình cộng chiều cao tầm mắt trước khi viết đáp số, không cần đọc lại đề.',
  },
  'g-htl-ti-so-luong-giac': {
    recognize:
      'Đề cho một giá trị lượng giác của góc nhọn (sin, cos hoặc tan) và hỏi giá trị lượng giác còn lại, không có hình.',
    method: [
      'Cách hằng đẳng thức: dùng sin²α + cos²α = 1 để tìm giá trị còn lại, chọn dấu dương vì α nhọn.',
      'Rồi dùng tan α = sin α / cos α, cot α = cos α / sin α.',
      'Cách dựng hình (nhanh hơn): nếu sin α = b/a thì dựng tam giác vuông cạnh đối b, cạnh huyền a, cạnh kề = √(a² − b²), rồi đọc thẳng mọi tỉ số.',
      'Đối chiếu bằng 1 + tan²α = 1/cos²α nếu còn thời gian.',
    ],
    traps: [
      'Lấy cả dấu âm cho cos α — sai vì đề đã nêu α là góc nhọn.',
      'Nhầm cạnh kề với cạnh huyền khi dựng tam giác.',
      'Viết tan α = cos α / sin α (đảo tử mẫu).',
      'Không rút gọn phân số ở đáp án cuối.',
    ],
    transfer:
      'Là câu trắc nghiệm hoặc ý nhỏ 0,25–0,5 điểm trong phần hình học; nền tảng bắt buộc để làm được bài toán thực tế đo chiều cao và bài giải tam giác vuông.',
    mastery:
      'Chọn được cách dựng tam giác thay cho biến đổi đại số, ra kết quả trong dưới 30 giây và luôn rút gọn phân số.',
  },

  /* ==================== VIÈTE VỚI BIỂU THỨC KHÔNG ĐỐI XỨNG ==================== */
  'g-viete-nhan-dang': {
    recognize:
      'Đề đưa ra một hệ thức giữa hai nghiệm và hỏi (hoặc ngầm buộc bạn phải quyết định) nên dùng kỹ thuật nào. Đây là bước "đọc vị" trước khi tính.',
    method: [
      'Đổi chỗ x₁ và x₂ trong hệ thức.',
      'Nếu hệ thức giữ nguyên ⇒ đối xứng ⇒ viết lại được hoàn toàn theo S = x₁ + x₂ và P = x₁x₂.',
      'Nếu hệ thức đổi khác ⇒ không đối xứng ⇒ phải lập hệ với S, hoặc hạ bậc bằng chính phương trình.',
      'Ghi rõ kết luận phân loại ra nháp trước khi đặt bút giải.',
    ],
    traps: [
      'Coi mọi hệ thức chứa x₁, x₂ đều đưa được về S và P rồi bế tắc giữa chừng.',
      'Nhầm x₁² − x₂ (không đối xứng) với x₁² + x₂² (đối xứng) vì chỉ nhìn thấy dấu bình phương.',
      'Bỏ qua điều kiện Δ ≥ 0 vì mải phân loại.',
      'Quên rằng (x₁ − x₂)² là đối xứng dù x₁ − x₂ thì không.',
    ],
    transfer:
      'Không phải một câu hỏi độc lập trong đề thi, nhưng quyết định toàn bộ 1,0 điểm của ý Viète ở Bài II/III đề vào 10: chọn sai hướng là mất trắng thời gian.',
    mastery:
      'Phân loại đúng trong dưới 10 giây bằng phép đổi chỗ, và nêu được ngay kỹ thuật tương ứng sẽ dùng.',
  },
  'g-viete-ti-le-nghiem': {
    recognize:
      'Hệ thức có dạng một nghiệm gấp k lần nghiệm kia: x₁ = kx₂, hoặc x₁ − kx₂ = 0. Có tham số m cần tìm.',
    method: [
      'Viết điều kiện có hai nghiệm: Δ ≥ 0 (hoặc Δ > 0 nếu đề đòi hai nghiệm phân biệt).',
      'Viết Viète: S = x₁ + x₂ và P = x₁x₂ theo hệ số.',
      'Thế x₁ = kx₂ vào S để tìm x₂, rồi suy ra x₁.',
      'Thay cặp nghiệm vừa tìm vào P để giải ra m.',
      'Đối chiếu m với điều kiện Δ ở bước 1 rồi mới kết luận.',
    ],
    traps: [
      'Bỏ hẳn bước kiểm tra Δ — barem trừ điểm dù đáp số m đúng.',
      'Thế x₁ = kx₂ vào tích P trước, ra phương trình bậc hai theo x₂ rắc rối hơn nhiều so với thế vào tổng.',
      'Nhầm chiều tỉ lệ: đề nói x₁ = 3x₂ nhưng lại thế x₂ = 3x₁.',
      'Với phương trình chưa chuẩn hoá (hệ số a ≠ 1), quên chia cho a khi viết S = −b/a và P = c/a.',
      'Nhận cả nghiệm m làm Δ < 0.',
    ],
    transfer:
      'Là ý thứ hai (ý vận dụng) của bài phương trình bậc hai chứa tham số trong đề vào 10 Hà Nội và đề chuyên Sở, giá trị 0,5–1,0 điểm.',
    mastery:
      'Làm trọn quy trình gồm cả dòng điều kiện Δ và dòng đối chiếu cuối, trong dưới 4 phút, không cần nhắc.',
  },
  'g-viete-ha-bac': {
    recognize:
      'Biểu thức cần tính chứa luỹ thừa bậc ≥ 2 của một nghiệm cụ thể (x₁², x₁³, hoặc đa thức bậc cao theo x₁), trong khi x₁ được nêu là nghiệm của một phương trình bậc hai đã biết hệ số.',
    method: [
      'Thay x₁ vào phương trình: x₁² − bx₁ + c = 0.',
      'Chuyển vế để có công thức hạ bậc: x₁² = bx₁ − c.',
      'Mỗi lần gặp x₁², thay bằng bx₁ − c; lặp lại cho tới khi biểu thức chỉ còn bậc nhất.',
      'Với bậc ba: x₁³ = x₁ · x₁² = x₁(bx₁ − c) = bx₁² − cx₁, rồi thay x₁² thêm một lần nữa.',
      'Cuối cùng dùng Viète (nếu còn cả x₁ lẫn x₂) hoặc thay giá trị cụ thể.',
    ],
    traps: [
      'Sai dấu khi chuyển vế: viết x₁² = bx₁ + c thay vì bx₁ − c.',
      'Chỉ hạ bậc một lần rồi dừng, để sót một số hạng bậc hai.',
      'Đi đường vòng: giải hẳn phương trình ra nghiệm chứa căn rồi khai triển — dài và dễ sai số.',
      'Áp dụng công thức hạ bậc của phương trình này cho nghiệm của phương trình khác.',
    ],
    transfer:
      'Kỹ thuật lõi của câu vận dụng cao trong đề chuyên Sở và vòng 2 KHTN; cũng rút ngắn đáng kể ý cuối bài Viète của đề vào 10 thường.',
    mastery:
      'Tự viết ra công thức hạ bậc ngay khi đọc thấy "x₁ là nghiệm của", và hạ được biểu thức bậc ba về bậc nhất mà không sai dấu.',
  },
  'g-viete-he-bac-nhat': {
    recognize:
      'Hệ thức đề cho là bậc nhất theo hai nghiệm nhưng không đối xứng: ax₁ + bx₂ = c với a ≠ b. Có tham số cần tìm.',
    method: [
      'Viết điều kiện Δ ≥ 0.',
      'Lấy phương trình (1): x₁ + x₂ = S từ Viète.',
      'Lấy phương trình (2): chính hệ thức đề cho.',
      'Giải hệ hai phương trình bậc nhất hai ẩn (1)–(2) bằng cộng đại số hoặc thế, tìm được x₁ và x₂ cụ thể.',
      'Thay vào P = x₁x₂ để tính tham số.',
      'Đối chiếu với điều kiện Δ, rồi kết luận.',
    ],
    traps: [
      'Cố ép hệ thức bậc nhất không đối xứng về theo S và P — bất khả thi, mất thời gian.',
      'Quên rằng vẫn phải dùng tích P ở bước cuối; dừng lại ngay sau khi tìm được x₁, x₂.',
      'Giải hệ sai dấu khi cộng đại số.',
      'Không đối chiếu Δ, nhận cả giá trị tham số làm phương trình vô nghiệm.',
      'Với a ≠ 1 ở phương trình gốc, quên S = −b/a.',
    ],
    transfer:
      'Dạng ra đề quen thuộc của ý vận dụng Bài II đề vào 10 Hà Nội và của phần đại số đề chuyên; 0,5–1,0 điểm và thường là ranh giới giữa 8 và 9 điểm.',
    mastery:
      'Nhận ra ngay "hệ thức bậc nhất ⇒ lập hệ với tổng", trình bày đủ 6 bước kể cả hai dòng điều kiện, trong dưới 5 phút.',
  },

  /* ==================== BÀI TOÁN THỰC TẾ LIÊN QUAN CỰC TRỊ ==================== */
  'g-cuc-tri-hang-rao': {
    recognize:
      'Bài văn có một ràng buộc cố định (diện tích cho trước, thể tích cho trước) và hỏi giá trị nhỏ nhất của một tổng (chiều dài hàng rào, diện tích vật liệu, chi phí).',
    method: [
      'Đặt ẩn theo đúng hình vẽ, nêu rõ điều kiện dương.',
      'Viết ràng buộc thành phương trình, rồi rút một ẩn theo ẩn kia.',
      'Viết đại lượng cần tối ưu thành hàm một biến, dạng tổng hai số hạng có tích không đổi.',
      'Áp dụng AM–GM: u + v ≥ 2√(uv), với uv là hằng số.',
      'Giải dấu bằng u = v để tìm kích thước, rồi tính giá trị nhỏ nhất.',
      'Kết luận đủ hai phần: giá trị nhỏ nhất là bao nhiêu và đạt được khi kích thước bằng bao nhiêu.',
    ],
    traps: [
      'Rào cả bốn cạnh trong khi đề nói một cạnh dựa vào tường — sai ngay từ mô hình.',
      'Áp dụng AM–GM cho hai số mà tích của chúng không phải hằng số ⇒ đánh giá vô nghĩa.',
      'Tìm được giá trị nhỏ nhất nhưng quên chỉ ra dấu bằng xảy ra khi nào; barem trừ điểm.',
      'Quên điều kiện x > 0, y > 0 trước khi dùng AM–GM.',
      'Nhầm đơn vị: diện tích m² với chiều dài m.',
    ],
    transfer:
      'Bài toán thực tế 0,5–1,0 điểm ở đề vào 10 nhiều tỉnh và ở phần vận dụng đề chuyên; cùng khuôn với các bài tối ưu chi phí, tối ưu vật liệu.',
    mastery:
      'Đọc đề là vẽ được hình và viết ngay hàm một biến; luôn viết dòng "dấu bằng xảy ra khi…" như một phản xạ.',
  },
  'g-cuc-tri-tong-khong-doi': {
    recognize:
      'Ràng buộc là một tổng cố định (chu vi cho trước, tổng hai số cho trước) và câu hỏi là giá trị lớn nhất của một tích (diện tích, sản lượng).',
    method: [
      'Đặt hai kích thước x, y > 0.',
      'Chuyển ràng buộc chu vi thành tổng: x + y = hằng số.',
      'Nhớ nguyên lí: tổng không đổi thì tích lớn nhất khi hai số bằng nhau.',
      'Viết đánh giá xy ≤ (x + y)²/4.',
      'Suy ra giá trị lớn nhất, nêu dấu bằng x = y (hình vuông).',
    ],
    traps: [
      'Dùng luôn chu vi làm tổng x + y mà quên chia đôi.',
      'Nhớ ngược nguyên lí: áp dụng "tích không đổi thì tổng nhỏ nhất" cho bài này.',
      'Kết luận bằng kích thước cạnh trong khi đề hỏi diện tích.',
      'Bỏ đơn vị m² ở đáp số.',
    ],
    transfer:
      'Câu vận dụng thấp trong đề vào 10 và đề khảo sát; cũng là bước lót để hiểu các bài cực trị phức tạp hơn ở đề chuyên.',
    mastery:
      'Phân biệt tức thì hai chiều của AM–GM (tổng cố định → tối đa tích; tích cố định → tối thiểu tổng) và chọn đúng chiều ngay từ khi đọc đề.',
  },
  'g-cuc-tri-doc-de': {
    recognize:
      'Không phải bài tính toán mà là bài "đọc vị": một chi tiết nhỏ trong đề (dựa tường, không nắp, hỏi chi phí thay vì kích thước) làm đổi hẳn mô hình hoặc bước kết luận.',
    method: [
      'Gạch chân mọi cụm từ mô tả cấu trúc: "dựa vào tường", "không nắp", "chia thành hai ô bằng nhau", "bể hình hộp".',
      'Vẽ hình theo đúng mô tả trước khi viết bất kỳ công thức nào.',
      'Đếm lại số mặt/số cạnh thực sự phải tính, rồi mới lập biểu thức.',
      'Đọc lại câu hỏi cuối cùng: đề hỏi kích thước, hay diện tích, hay chi phí?',
      'Sau khi tối ưu xong, thay kích thước vào đúng đại lượng đề hỏi rồi mới kết luận.',
    ],
    traps: [
      'Dùng công thức chu vi/diện tích toàn phần mặc định mà không đọc chi tiết cấu trúc.',
      'Tối ưu đúng nhưng kết luận sai đại lượng — tìm được kích thước rồi trả lời luôn, trong khi đề hỏi chi phí.',
      'Với hộp chia ô, quên vách ngăn ở giữa.',
      'Với bể không nắp, vẫn tính hai mặt đáy.',
    ],
    transfer:
      'Quyết định 0,25–0,5 điểm cuối của mọi bài toán thực tế cực trị: phần lớn bài mất điểm ở đây chứ không phải ở kỹ thuật bất đẳng thức.',
    mastery:
      'Trước khi nộp, tự soát lại được ba câu: hình đúng chưa, biểu thức đủ mặt chưa, đã trả lời đúng thứ đề hỏi chưa.',
  },
  /* ==================== LUỒNG 4 · TOÁN VÀO LỚP 6 ==================== */
  'g-l6-cong-phan-so': {
    recognize: 'Phép cộng hai phân số có mẫu số khác nhau, không kèm lời văn.',
    method: [
      'Tìm mẫu số chung — ưu tiên bội chung nhỏ nhất để số không bị lớn.',
      'Quy đồng hai phân số về cùng mẫu.',
      'Cộng hai tử số, giữ nguyên mẫu chung.',
      'Rút gọn kết quả về phân số tối giản.',
    ],
    traps: [
      'Cộng tử với tử và mẫu với mẫu — lỗi kinh điển và mất trọn câu.',
      'Quy đồng đúng nhưng quên nhân tử số theo cùng thừa số phụ.',
      'Không rút gọn kết quả cuối.',
      'Nhân chéo hai mẫu khi hai mẫu có ước chung, làm số to lên vô ích.',
    ],
    transfer:
      'Là bước tính nằm bên trong hầu hết các câu có lời văn của đề vào 6. Sai ở đây thì cách làm đúng cũng không cứu được câu.',
    mastery: 'Cộng đúng và rút gọn xong trong dưới 20 giây, không cần nháp cho các mẫu nhỏ.',
  },
  'g-l6-tinh-nhanh': {
    recognize:
      'Biểu thức dài nhưng các số hạng có chung một thừa số, hoặc có cặp số cộng lại thành số tròn chục, tròn trăm. Đề thường có chữ "tính nhanh".',
    method: [
      'Quan sát cả biểu thức trước khi tính bất kỳ phép nào.',
      'Tìm thừa số chung và đặt ra ngoài dấu ngoặc.',
      'Nhóm các số có tổng tròn để phép cộng trong ngoặc trở nên dễ.',
      'Tính phần trong ngoặc rồi nhân một lần duy nhất.',
    ],
    traps: [
      'Tính tuần tự từ trái sang phải, vừa lâu vừa dễ sai.',
      'Đặt thừa số chung nhưng quên một số hạng còn lại.',
      'Nhóm sai dấu khi biểu thức có phép trừ.',
      'Nhầm vị trí dấu phẩy khi nhân số thập phân với 100.',
    ],
    transfer:
      'Câu mở đầu quen thuộc của phần tự luận ngắn trong đề đánh giá năng lực, và là cách tiết kiệm thời gian cho những câu phía sau.',
    mastery: 'Nhìn biểu thức là thấy ngay cặp số cần nhóm, không đặt bút tính từng phép.',
  },
  'g-l6-phan-tram-co-ban': {
    recognize:
      'Bài có một số tổng và một tỉ lệ phần trăm, hỏi phần đã dùng hoặc phần còn lại.',
    method: [
      'Trả lời câu hỏi "phần trăm của cái gì" trước khi tính.',
      'Tính giá trị phần trăm: tổng × phần trăm : 100.',
      'Nếu đề hỏi phần còn lại thì lấy tổng trừ đi giá trị vừa tính.',
      'Đọc lại câu hỏi rồi mới ghi đáp số kèm đơn vị.',
    ],
    traps: [
      'Tính đúng phần đã bán nhưng đề hỏi phần còn lại — lỗi mất điểm số một của dạng này.',
      'Trừ thẳng số phần trăm vào số lượng, ví dụ lấy 200 − 25.',
      'Đặt sai vị trí dấu phẩy khi chia cho 100.',
      'Quên đơn vị ở đáp số.',
    ],
    transfer:
      'Xuất hiện gần như chắc chắn trong đề vào 6, thường ở nhóm câu dễ — nghĩa là mất câu này là mất điểm không đáng.',
    mastery: 'Viết được ngay dòng "25% của 200 kg" trước khi tính, và luôn đọc lại câu hỏi trước khi ghi đáp số.',
  },
  'g-l6-tang-giam-lien-tiep': {
    recognize:
      'Có từ hai lần thay đổi phần trăm trở lên: tăng rồi giảm, giảm rồi giảm tiếp, hoặc tăng theo từng đợt.',
    method: [
      'Chia bài thành từng bước, mỗi bước một lần thay đổi.',
      'Sau mỗi bước, xác định lại mốc 100% mới là số nào.',
      'Nhân liên tiếp: giá trị cuối = gốc × (1 ± a/100) × (1 ± b/100).',
      'So sánh với giá gốc nếu đề hỏi tăng hay giảm bao nhiêu phần trăm so với ban đầu.',
    ],
    traps: [
      'Cộng trừ trực tiếp hai số phần trăm — sai vì chúng tính trên hai số khác nhau.',
      'Nghĩ tăng 20% rồi giảm 20% thì về như cũ.',
      'Nhầm "giảm so với giá mới" thành "giảm so với giá gốc".',
      'Làm tròn ở bước giữa khiến kết quả cuối lệch.',
    ],
    transfer:
      'Là câu phân hoá của nhóm tỉ số phần trăm trong đề đánh giá năng lực, và cũng là kiến thức dùng được cả đời khi đi mua hàng.',
    mastery: 'Tự giải thích được bằng lời vì sao không cộng trừ phần trăm, không chỉ nhớ công thức.',
  },
  'g-l6-gap-nhau': {
    recognize:
      'Hai vật chuyển động về phía nhau, đề cho khoảng cách ban đầu và hai vận tốc, hỏi thời gian hoặc chỗ gặp nhau.',
    method: [
      'Vẽ sơ đồ đoạn thẳng với hai mũi tên hướng vào nhau.',
      'Đổi mọi đơn vị về cùng một hệ ngay từ đầu.',
      'Tính tổng vận tốc — đây là tốc độ mà khoảng cách giữa hai vật giảm đi.',
      'Thời gian gặp nhau = quãng đường : tổng vận tốc.',
      'Nếu đề hỏi chỗ gặp nhau thì nhân thời gian với vận tốc của một vật.',
    ],
    traps: [
      'Trừ vận tốc thay vì cộng vì không vẽ sơ đồ.',
      'Để lẫn phút với giờ trong cùng một phép chia.',
      'Trả lời "sau 3 giờ" trong khi đề hỏi "lúc mấy giờ".',
      'Quên xử lý trường hợp một xe xuất phát sớm hơn.',
    ],
    transfer:
      'Một trong ba mô hình chuyển động chuẩn, xuất hiện đều trong đề vào 6 của nhóm trường chất lượng cao.',
    mastery: 'Vẽ sơ đồ và viết được phép tính chỉ sau một lần đọc đề, luôn thử lại bằng tổng hai quãng đường.',
  },
  'g-l6-duoi-kip': {
    recognize:
      'Hai vật đi cùng chiều, một vật xuất phát trước hoặc đã đi được một đoạn, hỏi sau bao lâu đuổi kịp.',
    method: [
      'Vẽ sơ đồ hai mũi tên cùng hướng, đánh dấu khoảng cách ban đầu.',
      'Nếu đề cho thời gian xuất phát lệch nhau, tính trước quãng đường vật đi sớm đã đi được.',
      'Tính hiệu vận tốc — đây là mức rút ngắn khoảng cách mỗi giờ.',
      'Thời gian đuổi kịp = khoảng cách ban đầu : hiệu vận tốc.',
      'Kiểm tra: đến thời điểm đó hai vật phải đi được quãng đường bằng nhau tính từ điểm xuất phát chung.',
    ],
    traps: [
      'Cộng vận tốc vì nhớ nhầm sang mô hình gặp nhau.',
      'Quên đổi thời gian xuất phát lệch thành quãng đường.',
      'Chia cho vận tốc của xe nhanh thay vì cho hiệu vận tốc.',
      'Không kiểm tra xem xe sau có nhanh hơn xe trước không.',
    ],
    transfer:
      'Câu chuyển động khó hơn một bậc so với dạng gặp nhau; thường nằm ở nửa sau của đề, chỗ bắt đầu phân hoá.',
    mastery: 'Phân biệt tức thì cộng hay trừ vận tốc bằng sơ đồ mũi tên, không phải bằng cách nhớ thuộc lòng.',
  },
  'g-l6-dong-nuoc': {
    recognize:
      'Có ca nô, thuyền, bè trên sông; đề nhắc tới xuôi dòng, ngược dòng hoặc vận tốc dòng nước.',
    method: [
      'Ghi hai công thức nền: v xuôi = v thực + v dòng; v ngược = v thực − v dòng.',
      'Lấy hiệu hai vận tốc thì được 2 lần vận tốc dòng nước.',
      'Lấy tổng hai vận tốc thì được 2 lần vận tốc thực.',
      'Chia đôi để lấy đại lượng đề hỏi.',
      'Nếu đề hỏi quãng đường hoặc thời gian thì áp tiếp s = v × t với đúng loại vận tốc.',
    ],
    traps: [
      'Lẫn hai kết quả: lấy tổng chia đôi rồi trả lời là vận tốc dòng nước.',
      'Quên chia đôi sau khi lấy hiệu.',
      'Dùng vận tốc thực để tính quãng đường xuôi dòng.',
      'Với bè trôi tự do, quên rằng vận tốc của bè chính là vận tốc dòng nước.',
    ],
    transfer:
      'Mô hình chuyển động thứ ba của đề vào 6; thường chỉ một câu nhưng gần như năm nào cũng có ở nhóm trường tốp đầu.',
    mastery: 'Viết được cả hai công thức nền trước khi nhìn số liệu, và không bao giờ lẫn tổng với hiệu.',
  },
  'g-l6-tinh-nguoc': {
    recognize:
      'Đề mô tả một chuỗi phép tính rồi cho kết quả cuối và hỏi số ban đầu. Từ khoá: "một số", "đem nhân", "rồi trừ", "thì được".',
    method: [
      'Viết lại chuỗi phép tính theo đúng thứ tự trong đề.',
      'Đi ngược từ kết quả cuối về đầu.',
      'Mỗi bước làm phép tính ngược lại: chia thành nhân, trừ thành cộng.',
      'Thử lại theo chiều xuôi để kiểm tra.',
    ],
    traps: [
      'Đi ngược nhưng vẫn dùng đúng phép tính trong đề.',
      'Đảo thứ tự các bước — phải xử lý phép cuối cùng trước.',
      'Bỏ qua bước thử lại, mất cơ hội phát hiện sai.',
      'Nhầm "gấp 3 lần" với "nhiều hơn 3 đơn vị".',
    ],
    transfer:
      'Là cách giải thay cho phương trình ở bậc tiểu học; xuất hiện thường xuyên và luôn giải được nhanh nếu đi đúng chiều.',
    mastery: 'Viết ngay được chuỗi ngược ra nháp và luôn dành 15 giây thử lại theo chiều xuôi.',
  },
  'g-l6-tong-ti': {
    recognize:
      'Đề cho tổng của hai đại lượng và tỉ số giữa chúng, hỏi giá trị của một đại lượng.',
    method: [
      'Vẽ sơ đồ đoạn thẳng: mỗi đại lượng là một số phần bằng nhau.',
      'Tính tổng số phần.',
      'Giá trị một phần = tổng : tổng số phần.',
      'Nhân giá trị một phần với số phần của đại lượng đề hỏi.',
      'Thử lại bằng cách cộng hai kết quả xem có bằng tổng không.',
    ],
    traps: [
      'Trả lời giá trị một phần thay vì giá trị đại lượng đề hỏi.',
      'Vẽ sơ đồ ngược: gán số phần lớn cho đại lượng nhỏ.',
      'Nhầm bài tổng – tỉ với bài hiệu – tỉ, dùng sai mẫu số.',
      'Quên thử lại nên không phát hiện lỗi chia.',
    ],
    transfer:
      'Nhóm bài toán điển hình của lớp 4 – 5, gần như luôn có mặt trong đề vào 6 dưới một lớp vỏ tình huống mới.',
    mastery: 'Vẽ sơ đồ trước khi tính như một phản xạ, và luôn cộng hai kết quả để tự kiểm tra.',
  },
  'g-l6-dien-tich-ghep': {
    recognize:
      'Hình được ghép từ nhiều hình cơ bản, hoặc hình bị cắt bỏ một phần. Đề thường kèm hình vẽ.',
    method: [
      'Vẽ lại hình và ghi mọi số đo đã biết lên hình.',
      'Chọn một trong hai hướng: chia nhỏ để cộng, hoặc lấy hình lớn trừ phần thừa.',
      'Ưu tiên hướng có ít bước tính hơn.',
      'Tính từng phần, ghi rõ đơn vị ở mỗi bước.',
      'Cộng hoặc trừ để ra diện tích cần tìm.',
    ],
    traps: [
      'Trừ độ dài cạnh thay vì trừ diện tích.',
      'Dùng chiều cao của hình này cho hình khác trong hình ghép.',
      'Quên chia đôi ở diện tích tam giác hoặc hình thang.',
      'Lẫn đơn vị cm với cm².',
    ],
    transfer:
      'Phần dễ lấy điểm nhất của đề nếu chịu vẽ hình; thường 1 – 2 câu trong mỗi đề đánh giá năng lực.',
    mastery: 'Chọn được hướng tính ngắn hơn ngay từ đầu và không bao giờ nhầm đơn vị diện tích.',
  },
  'g-l6-hinh-hop': {
    recognize:
      'Có hình hộp chữ nhật hoặc hình lập phương kèm một chi tiết cấu trúc: "không nắp", "quét sơn mặt trong", "lát gạch nền và xung quanh".',
    method: [
      'Gạch chân chi tiết cấu trúc và đếm xem thực sự phải tính mấy mặt.',
      'Tính chu vi đáy trước.',
      'Diện tích xung quanh = chu vi đáy × chiều cao.',
      'Cộng thêm các mặt đáy hoặc nắp theo đúng yêu cầu của đề.',
      'Nếu đề hỏi thể tích hoặc lượng nước thì đổi tiếp sang đơn vị lít khi cần.',
    ],
    traps: [
      'Tính cả nắp cho bể không nắp.',
      'Nhầm diện tích với thể tích khi đề dùng chữ "chứa được bao nhiêu".',
      'Lẫn dm² với m², hoặc quên 1 dm³ = 1 lít.',
      'Dùng chu vi đáy sai vì cộng nhầm chiều dài với chiều cao.',
    ],
    transfer:
      'Câu hình không gian quen thuộc của đề vào 6; điểm rơi thường ở chi tiết "không nắp" chứ không ở phép tính.',
    mastery: 'Đọc đề là nói ngay được "phải tính mấy mặt", trước khi viết bất kỳ công thức nào.',
  },
  'g-l6-bang-dung-sai': {
    recognize:
      'Có một nhóm người hoặc vật và một nhóm thuộc tính, kèm vài dữ kiện khẳng định và phủ định. Câu hỏi dạng "ai thích gì", "ai ngồi đâu".',
    method: [
      'Kẻ bảng: hàng là người, cột là thuộc tính.',
      'Bắt đầu từ dữ kiện chắc chắn nhất, không nhất thiết là dữ kiện đầu tiên.',
      'Mỗi khẳng định thì đánh ✓ rồi loại cả hàng và cả cột.',
      'Mỗi phủ định thì đánh ✗ vào đúng một ô.',
      'Khi một hàng chỉ còn một ô chưa loại thì đó là đáp án; loại tiếp cả cột đó.',
      'Kiểm tra lại đã dùng hết mọi dữ kiện chưa trước khi kết luận.',
    ],
    traps: [
      'Suy luận trong đầu, không kẻ bảng, rồi quên mất một nhánh.',
      'Đọc dữ kiện phủ định thành khẳng định.',
      'Dừng lại khi tìm được một phương án phù hợp mà chưa dùng hết dữ kiện.',
      'Tốn quá nhiều thời gian cho câu này, ảnh hưởng phần còn lại của đề.',
    ],
    transfer:
      'Câu phân hoá đặc trưng của đề đánh giá năng lực — không cần kiến thức mới, chỉ cần một cách nghĩ có hệ thống.',
    mastery: 'Kẻ bảng và giải xong trong dưới 3 phút, luôn kiểm tra lại bằng cách đọc lại toàn bộ dữ kiện.',
  },
  'g-l6-can-dia': {
    recognize:
      'Có cân thăng bằng hai đĩa, không có quả cân, và một vật khác biệt về khối lượng. Câu hỏi dạng "ít nhất bao nhiêu lần cân".',
    method: [
      'Nhớ nguyên tắc gốc: mỗi lần cân cho ba kết quả, nên chia thành ba nhóm chứ không phải hai.',
      'Chia số vật thành ba nhóm gần bằng nhau, đặt hai nhóm lên hai đĩa.',
      'Nếu thăng bằng thì vật khác biệt ở nhóm thứ ba; nếu lệch thì ở đĩa nhẹ hơn (hoặc nặng hơn, tuỳ đề).',
      'Lặp lại với nhóm đã xác định cho tới khi còn một vật.',
      'Đếm số lần cân: n lần phân biệt được tối đa 3ⁿ vật.',
    ],
    traps: [
      'Chia đôi như phản xạ thông thường, khiến số lần cân nhiều hơn mức tối thiểu.',
      'Quên rằng "thăng bằng" cũng là một kết quả có ích.',
      'Trả lời số lần cân trong trường hợp may mắn thay vì trường hợp chắc chắn.',
      'Nhầm khi đề nói vật khác biệt có thể nặng hơn HOẶC nhẹ hơn — bài này khó hơn hẳn.',
    ],
    transfer:
      'Câu khó nhất của nhóm suy luận trong đề vào 6; không phải đề nào cũng có, nhưng có thì thường là câu chốt.',
    mastery: 'Trả lời được ngay theo mốc 3 – 9 – 27 và giải thích được vì sao chia ba chứ không chia đôi.',
  },
  'g-l6-day-cach-deu': {
    recognize:
      'Một dãy số cho vài số hạng đầu rồi hỏi số hạng thứ n, số số hạng, hoặc tổng của dãy.',
    method: [
      'Tính hiệu giữa các số hạng liên tiếp để xác nhận dãy cách đều.',
      'Số hạng thứ n = số đầu + (n − 1) × khoảng cách.',
      'Số số hạng = (số cuối − số đầu) : khoảng cách + 1.',
      'Tổng = (số đầu + số cuối) × số số hạng : 2.',
      'Thử lại công thức với số hạng thứ hai hoặc thứ ba đã biết.',
    ],
    traps: [
      'Quên trừ 1 trong công thức số hạng thứ n.',
      'Quên cộng 1 khi đếm số số hạng.',
      'Kết luận quy luật chỉ sau khi nhìn hai số hạng đầu.',
      'Nhầm dãy cách đều với dãy nhân (mỗi số gấp đôi số trước).',
    ],
    transfer:
      'Câu quen thuộc trong nhóm quy luật của đề đánh giá năng lực; làm nhanh được sẽ dành thời gian cho câu suy luận.',
    mastery: 'Viết ba công thức nền ra nháp trong 10 giây rồi mới thay số, và luôn thử lại bằng một số hạng đã biết.',
  },
  'g-l6-dem-hinh': {
    recognize:
      'Đề cho một hình chia lưới hoặc hình có nhiều đoạn thẳng, hỏi tổng số hình chữ nhật hoặc tam giác.',
    method: [
      'Không đếm tay — tìm cách đếm có hệ thống.',
      'Với lưới ô vuông: mỗi hình chữ nhật ứng với một cách chọn 2 đường ngang và 2 đường dọc.',
      'Số cách chọn 2 trong k đường = k × (k − 1) : 2.',
      'Nhân hai kết quả để ra tổng số hình.',
      'Với hình không phải lưới, đếm theo nhóm kích thước: hình 1 ô, hình 2 ô, hình 3 ô…',
    ],
    traps: [
      'Chỉ đếm các ô nhỏ, bỏ sót hình ghép từ nhiều ô.',
      'Đếm trùng cùng một hình hai lần.',
      'Nhầm số ô với số đường kẻ (lưới m ô có m + 1 đường).',
      'Đếm tay với hình lớn rồi mất nhiều thời gian mà vẫn sai.',
    ],
    transfer:
      'Câu khó của nhóm quy luật – đếm hình; thường nằm cuối đề và là chỗ tạo khác biệt giữa các thí sinh giỏi.',
    mastery: 'Chuyển được bài đếm hình thành bài đếm cách chọn đường thẳng, và ra kết quả không cần vẽ đủ mọi hình.',
  },
  'g-l6-doc-bang': {
    recognize:
      'Có bảng số liệu, biểu đồ cột hoặc biểu đồ tranh, kèm một câu hỏi tính toán đơn giản.',
    method: [
      'Đọc câu hỏi trước, rồi mới đọc bảng — biết cần tìm gì thì đọc nhanh hơn nhiều.',
      'Dò đúng dòng và đúng cột, dùng ngón tay hoặc bút chì để không lệch.',
      'Kiểm tra đã lấy đủ số liệu chưa, đếm lại số cột.',
      'Thực hiện phép tính, ghi rõ đơn vị.',
      'Kiểm tra hợp lý: giá trị trung bình phải nằm giữa số nhỏ nhất và số lớn nhất.',
    ],
    traps: [
      'Lấy nhầm dòng hoặc nhầm cột.',
      'Đếm sót một cột nên chia cho số ngày sai.',
      'Trả lời tổng trong khi đề hỏi trung bình.',
      'Quên đơn vị ở đáp số.',
    ],
    transfer:
      'Nhóm câu đọc hiểu dữ liệu ngày càng nhiều trong đề đánh giá năng lực; sai ở đây là sai vì đọc, không phải vì Toán.',
    mastery: 'Đọc bảng đúng ngay lần đầu và tự kiểm tra kết quả bằng khoảng giá trị hợp lý.',
  },
  'g-l6-nhieu-buoc': {
    recognize:
      'Bài có lời văn dài, nhiều mốc thời gian hoặc nhiều lần lấy đi, mỗi lần lấy một phân số. Từ khoá quyết định: "số còn lại".',
    method: [
      'Chia bài thành từng bước theo đúng trình tự thời gian của đề.',
      'Ở mỗi bước, xác định phân số đó là phân số CỦA SỐ NÀO.',
      'Tính lần lượt, ghi kết quả trung gian của từng bước ra nháp.',
      'Đọc lại câu hỏi cuối cùng rồi mới ghi đáp số.',
    ],
    traps: [
      'Lấy phân số của số ban đầu trong khi đề nói "của số còn lại".',
      'Cộng thẳng hai phân số rồi trừ một lần — sai vì hai phân số tính trên hai số khác nhau.',
      'Dừng lại ở kết quả trung gian, trả lời số còn lại sau ngày đầu.',
      'Quên đơn vị hoặc trả lời sai đại lượng.',
    ],
    transfer:
      'Câu có lời văn nhiều bước là dạng chiếm nhiều điểm nhất của đề vào 6, và cũng là dạng mất điểm oan nhiều nhất.',
    mastery: 'Tự đặt được câu hỏi "của số nào" ở mỗi bước, và luôn đọc lại câu hỏi trước khi ghi đáp số.',
  },
  /* ==================== LUỒNG CHÍNH KHOÁ · LỚP 6 – 8 ==================== */
  'g-ck6-uoc-boi': {
    recognize:
      'Bài văn có hai (hoặc ba) số lượng và yêu cầu chia đều hoặc lặp lại. Từ khoá quyết định: "nhiều nhất" gợi ƯCLN, "ít nhất" hoặc "cùng lúc lặp lại" gợi BCNN.',
    method: [
      'Đọc câu hỏi cuối cùng trước, xác định là bài ƯCLN hay BCNN.',
      'Phân tích các số ra thừa số nguyên tố.',
      'ƯCLN: lấy thừa số chung với số mũ nhỏ nhất. BCNN: lấy thừa số chung và riêng với số mũ lớn nhất.',
      'Trả lời đúng đại lượng đề hỏi, kèm đơn vị.',
    ],
    traps: [
      'Nhầm ƯCLN với BCNN — hai bài toán thực tế nghe rất giống nhau.',
      'Phân tích ra thừa số nguyên tố còn sót một thừa số.',
      'Tính đúng ƯCLN nhưng đề hỏi mỗi phần có bao nhiêu bút, tức phải chia tiếp.',
      'Coi 1 là số nguyên tố.',
    ],
    transfer:
      'Dạng chắc chắn có trong bài kiểm tra giữa kỳ I lớp 6, và là nền cho quy đồng mẫu ở chương phân số.',
    mastery: 'Đọc đề là phân loại được ngay ƯCLN hay BCNN, không cần thử cả hai.',
  },
  'g-ck6-so-nguyen': {
    recognize: 'Biểu thức có dấu trừ đứng trước một ngoặc chứa nhiều số hạng.',
    method: [
      'Bỏ ngoặc và đổi dấu MỌI số hạng bên trong.',
      'Viết lại biểu thức đã bỏ ngoặc thành một dòng riêng.',
      'Tính lần lượt từ trái sang phải.',
      'Kiểm tra lại dấu của kết quả bằng cách ước lượng.',
    ],
    traps: [
      'Chỉ đổi dấu số hạng đầu tiên trong ngoặc.',
      'Nhầm −a² với (−a)².',
      'So sánh sai hai số âm.',
      'Quên đổi dấu khi chuyển vế.',
    ],
    transfer:
      'Quy tắc dấu học ở đây được dùng lại ở mọi phép biến đổi đại số cho tới hết lớp 12.',
    mastery: 'Bỏ ngoặc đúng ngay lần đầu, không cần dừng lại kiểm tra từng dấu.',
  },
  'g-ck6-phan-so': {
    recognize:
      'Đề cho giá trị của một phân số của số cần tìm. Cấu trúc câu: "m/n của một số bằng A".',
    method: [
      'Xác định rõ: đề cho phần và hỏi tổng, hay cho tổng và hỏi phần.',
      'Cho phần hỏi tổng: chia cho tử rồi nhân mẫu.',
      'Cho tổng hỏi phần: nhân tử rồi chia mẫu.',
      'Thử lại bằng chiều ngược lại.',
    ],
    traps: [
      'Nhân thay vì chia, tức làm ngược chiều bài toán.',
      'Trả lời giá trị một phần thay vì cả số.',
      'Với bài nhiều bước, lấy phân số của tổng trong khi đề nói "của số còn lại".',
      'Không thử lại nên không phát hiện sai chiều.',
    ],
    transfer:
      'Cùng cấu trúc với bài tỉ số phần trăm ở lớp 6 – 7 và bài tỉ lệ ở lớp 7.',
    mastery: 'Xác định đúng chiều bài toán trong dưới 10 giây và luôn thử lại.',
  },
  'g-ck6-hinh-thoi': {
    recognize: 'Đề cho hai đường chéo (hình thoi) hoặc cạnh đáy và chiều cao (hình bình hành).',
    method: [
      'Vẽ hình và ghi số đo đã biết lên hình.',
      'Chọn đúng công thức theo loại hình.',
      'Với hình thoi, nhớ chia đôi tích hai đường chéo.',
      'Ghi đơn vị diện tích.',
    ],
    traps: [
      'Quên chia 2 ở công thức hình thoi.',
      'Dùng cạnh thay cho đường chéo.',
      'Ghi đơn vị cm thay vì cm².',
      'Nhầm công thức hình thoi với hình bình hành.',
    ],
    transfer:
      'Nhóm câu lấy điểm chắc của bài kiểm tra hình học lớp 6, và là nền cho hình học lớp 8.',
    mastery: 'Viết đúng công thức trước khi thay số và không bao giờ quên hệ số chia đôi.',
  },
  'g-ck6-xac-suat-tn': {
    recognize: 'Có một thí nghiệm lặp lại nhiều lần và số lần một kết quả xuất hiện.',
    method: [
      'Xác định tổng số lần thực hiện.',
      'Xác định số lần sự kiện xảy ra.',
      'Lấy thương và rút gọn phân số.',
      'Kiểm tra kết quả nằm giữa 0 và 1.',
    ],
    traps: [
      'Lấy số lần xảy ra chia cho số lần KHÔNG xảy ra.',
      'Đảo ngược tử và mẫu.',
      'Quên rút gọn phân số.',
      'Nhầm xác suất thực nghiệm với xác suất lý thuyết.',
    ],
    transfer:
      'Nền của chương xác suất ở lớp 7 – 8 và của xác suất cổ điển ở lớp 10.',
    mastery: 'Viết ngay được phân số đúng và tự kiểm tra bằng khoảng giá trị hợp lý.',
  },
  'g-ck7-gia-tri-tuyet-doi': {
    recognize: 'Có dấu giá trị tuyệt đối chứa ẩn, vế phải là một số dương.',
    method: [
      'Kiểm tra vế phải có không âm không; nếu âm thì phương trình vô nghiệm.',
      'Chia thành hai trường hợp: biểu thức trong dấu bằng số đó, hoặc bằng số đối của nó.',
      'Giải từng trường hợp.',
      'Trả lời đúng đại lượng đề hỏi: tổng nghiệm, nghiệm dương, hay tập nghiệm.',
    ],
    traps: [
      'Chỉ lấy một trường hợp.',
      'Không kiểm tra dấu vế phải nên nhận nghiệm cho phương trình vô nghiệm.',
      'Tìm được hai nghiệm nhưng trả lời sai thứ đề hỏi.',
      'Sai dấu khi giải trường hợp thứ hai.',
    ],
    transfer:
      'Kỹ thuật chia trường hợp dùng lại ở phương trình chứa dấu giá trị tuyệt đối lớp 8 – 10.',
    mastery: 'Viết đủ hai trường hợp thành phản xạ, và luôn đọc lại câu hỏi trước khi ghi đáp số.',
  },
  'g-ck7-ti-le-thuc': {
    recognize:
      'Đề cho một tổng và một dãy tỉ số, hoặc nói "tỉ lệ với" các số cho trước.',
    method: [
      'Coi mỗi số trong dãy tỉ lệ là số phần bằng nhau.',
      'Tính tổng số phần.',
      'Giá trị một phần bằng tổng chia tổng số phần.',
      'Nhân ra từng đại lượng và thử lại bằng tổng.',
    ],
    traps: [
      'Trả lời giá trị một phần thay vì giá trị đại lượng đề hỏi.',
      'Nhầm tỉ lệ thuận với tỉ lệ nghịch.',
      'Cộng nhầm tổng số phần.',
      'Không thử lại nên không phát hiện lỗi chia.',
    ],
    transfer:
      'Cấu trúc y hệt bài tổng – tỉ ở tiểu học, và là nền của bài chia phần ở lớp 8 – 9.',
    mastery: 'Vẽ hoặc hình dung sơ đồ phần trước khi tính, và luôn cộng lại để kiểm tra.',
  },
  'g-ck7-nghiem-da-thuc': {
    recognize: 'Yêu cầu "tìm nghiệm của đa thức" hoặc "tìm x để P(x) = 0".',
    method: [
      'Cho đa thức bằng 0.',
      'Chuyển vế hạng tử tự do, nhớ đổi dấu.',
      'Chia hai vế cho hệ số của x.',
      'Thay ngược vào để thử lại.',
    ],
    traps: [
      'Quên đổi dấu khi chuyển vế.',
      'Chia sai dấu khi hệ số của x âm.',
      'Nhầm nghiệm với giá trị của đa thức.',
      'Không thử lại.',
    ],
    transfer:
      'Nền trực tiếp của phương trình bậc nhất một ẩn ở lớp 8 và phương trình bậc hai ở lớp 9.',
    mastery: 'Giải và thử lại xong trong dưới 30 giây.',
  },
  'g-ck7-truong-hop-bang-nhau': {
    recognize:
      'Đề liệt kê các yếu tố bằng nhau của hai tam giác và hỏi trường hợp bằng nhau.',
    method: [
      'Vẽ hình và đánh dấu các yếu tố bằng nhau.',
      'Đếm xem có mấy cạnh, mấy góc, và chúng xen kẽ thế nào.',
      'Kiểm tra góc có nằm giữa hai cạnh không (điều kiện của c–g–c).',
      'Kiểm tra cạnh có nằm giữa hai góc không (điều kiện của g–c–g).',
    ],
    traps: [
      'Kết luận theo trường hợp cạnh – cạnh – góc, trường hợp này không tồn tại.',
      'Coi góc – góc – góc là một trường hợp bằng nhau (đó là đồng dạng, không phải bằng nhau).',
      'Ghi tên hai tam giác sai thứ tự đỉnh tương ứng.',
      'Bỏ qua bước suy ra góc thứ ba từ tổng ba góc bằng 180°.',
    ],
    transfer:
      'Là bước đầu tiên của mọi bài chứng minh hình học từ lớp 7 đến lớp 9.',
    mastery:
      'Nhìn giả thiết là gọi được tên trường hợp, và viết được tên hai tam giác đúng thứ tự đỉnh ngay lần đầu.',
  },
  'g-ck7-xac-suat-bien-co': {
    recognize:
      'Có một phép thử với các kết quả đồng khả năng (rút bi, gieo xúc xắc, chọn thẻ).',
    method: [
      'Đếm tổng số kết quả có thể xảy ra.',
      'Đếm số kết quả thuận lợi cho biến cố.',
      'Lấy thương và rút gọn.',
      'Kiểm tra kết quả nằm giữa 0 và 1.',
    ],
    traps: [
      'Quên cộng cả hai loại khi tính tổng số kết quả.',
      'Lấy số thuận lợi chia số không thuận lợi.',
      'Không rút gọn phân số.',
      'Nhầm biến cố với biến cố đối.',
    ],
    transfer:
      'Nền trực tiếp của xác suất cổ điển lớp 10 và xác suất có điều kiện lớp 12.',
    mastery: 'Viết ra không gian mẫu trước khi đếm, và luôn kiểm tra bằng biến cố đối.',
  },
  'g-ck8-hang-dang-thuc': {
    recognize:
      'Biểu thức số là hiệu (hoặc tổng) của hai bình phương, hai lập phương; hoặc có dạng khai triển của một hằng đẳng thức.',
    method: [
      'Nhận dạng hằng đẳng thức phù hợp.',
      'Viết công thức ra trước khi thay số.',
      'Thay số và tính, ưu tiên phép nhân với số tròn.',
      'Kiểm tra bằng ước lượng độ lớn.',
    ],
    traps: [
      'Nhớ nhầm dấu ở giữa của a³ + b³ và a³ − b³.',
      'Khai triển (a − b)² mà quên dấu trừ ở hạng tử giữa.',
      'Tính trực tiếp thay vì dùng hằng đẳng thức, mất thời gian và dễ sai.',
      'Nhầm a² − b² với (a − b)².',
    ],
    transfer:
      'Bảy hằng đẳng thức là công cụ nền cho toàn bộ đại số lớp 8 – 9 và cho Bài I của đề vào 10.',
    mastery: 'Viết được cả bảy hằng đẳng thức ra giấy trắng trong 2 phút và dùng được theo cả hai chiều.',
  },
  'g-ck8-dkxd-phan-thuc': {
    recognize: 'Có phân thức đại số và yêu cầu tìm điều kiện xác định, hoặc yêu cầu rút gọn.',
    method: [
      'Phân tích mẫu thức thành nhân tử.',
      'Cho từng nhân tử khác 0.',
      'Gộp các điều kiện lại.',
      'Giữ điều kiện này đến cuối bài để đối chiếu nghiệm.',
    ],
    traps: [
      'Chỉ cho mẫu thức khác 0 mà không phân tích, nên bỏ sót một nghiệm.',
      'Lấy điều kiện từ mẫu sau khi đã rút gọn.',
      'Quên viết điều kiện — barem có riêng một mốc điểm cho dòng này.',
      'Rút gọn khi tử và mẫu là tổng chứ không phải tích.',
    ],
    transfer:
      'Là dòng đầu tiên của Bài I đề vào 10 — chuyên đề chiếm 2,0 điểm chắc nhất toàn đề.',
    mastery: 'Viết điều kiện xác định thành phản xạ, ngay khi nhìn thấy dấu phân thức.',
  },
  'g-ck8-duong-thang-song-song': {
    recognize:
      'Có hai hàm số bậc nhất, một hàm chứa tham số, và yêu cầu về vị trí tương đối.',
    method: [
      'Xác định hệ số góc và tung độ gốc của cả hai đường.',
      'Song song: hệ số góc bằng nhau VÀ tung độ gốc khác nhau.',
      'Trùng nhau: cả hai đều bằng nhau. Cắt nhau: hệ số góc khác nhau.',
      'Giải theo tham số rồi kiểm tra lại điều kiện còn lại.',
    ],
    traps: [
      'Chỉ cho hệ số góc bằng nhau mà quên kiểm tra tung độ gốc khác nhau.',
      'Nhầm hệ số góc với tung độ gốc.',
      'Giải sai dấu khi chuyển vế.',
      'Với hàm số chưa ở dạng y = ax + b, quên đưa về dạng chuẩn trước.',
    ],
    transfer:
      'Nền của bài tương giao parabol – đường thẳng ở lớp 9 và của phương trình đường thẳng ở lớp 10.',
    mastery: 'Luôn viết đủ hai điều kiện (bằng nhau và khác nhau) trong cùng một dòng.',
  },
  'g-ck8-thales': {
    recognize:
      'Trong tam giác có một đường thẳng song song với một cạnh, và đề hỏi độ dài một đoạn.',
    method: [
      'Vẽ hình, đánh dấu hai đường song song.',
      'Viết tỉ lệ thức theo đúng thứ tự: các đoạn trên cùng một cạnh đứng cùng vế.',
      'Thay số và giải tỉ lệ thức bằng nhân chéo.',
      'Kiểm tra bằng cách so hai tỉ số.',
    ],
    traps: [
      'Lập tỉ lệ thức sai thứ tự, ghép nhầm đoạn của cạnh này với đoạn của cạnh kia.',
      'Dùng AM/AB thay cho AM/MB hoặc ngược lại mà không nhất quán ở hai vế.',
      'Áp dụng Thalès khi hai đường không song song.',
      'Quên đơn vị.',
    ],
    transfer:
      'Cùng với tam giác đồng dạng, đây là công cụ chính của Bài IV đề vào 10.',
    mastery:
      'Viết đúng tỉ lệ thức ngay lần đầu và luôn kiểm tra lại bằng cách so hai tỉ số sau khi có kết quả.',
  },
  'g-ck8-hinh-chop': {
    recognize:
      'Có hình chóp đều và yêu cầu tính thể tích hoặc diện tích xung quanh.',
    method: [
      'Xác định đề cho chiều cao hình chóp hay trung đoạn — hai đại lượng khác nhau.',
      'Thể tích dùng chiều cao; diện tích xung quanh dùng trung đoạn.',
      'Tính diện tích đáy hoặc nửa chu vi đáy tuỳ công thức.',
      'Áp công thức và ghi đúng đơn vị.',
    ],
    traps: [
      'Dùng chiều cao thay cho trung đoạn khi tính diện tích xung quanh.',
      'Quên hệ số một phần ba khi tính thể tích.',
      'Ghi đơn vị cm² cho thể tích.',
      'Nhầm hình chóp tam giác đều với hình chóp tứ giác đều khi tính diện tích đáy.',
    ],
    transfer:
      'Nhóm câu lấy điểm của bài cuối kỳ II lớp 8, và là nền của hình không gian lớp 11 – 12.',
    mastery: 'Đọc đề là phân biệt ngay chiều cao với trung đoạn, trước khi viết bất kỳ công thức nào.',
  },
};

export const analysisFor = (generatorId: string): DrillAnalysis | undefined =>
  DRILL_ANALYSIS[generatorId];
