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
};

export const analysisFor = (generatorId: string): DrillAnalysis | undefined =>
  DRILL_ANALYSIS[generatorId];
