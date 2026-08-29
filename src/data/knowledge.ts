import type { SectionId } from '../types';

/**
 * BO KIEN THUC LIEN QUAN
 *
 * Moi chuyen de co mot phieu kien thuc: y lo i, cong thuc phai thuoc, cac dang
 * bai thuong gap, bay hay mac, va chien thuat thoi gian trong phong thi.
 *
 * Vi sao phieu nay ton tai: sau khi lam xong, nguoi hoc doc loi giai cua tung
 * cau roi van khong biet "vay minh phai on lai cai gi". Phieu kien thuc tra loi
 * dung cau hoi do — no la cau noi giua MOT cau sai va MOT viec phai on.
 *
 * Noi dung o day duoc bien soan rieng cho HSA365, bam theo cau truc de thi HSA
 * cua DHQGHN.
 */

export interface KnowledgeSheet {
  topicId: string;
  section: SectionId;
  /** Y lo i — thu phai hieu truoc khi nho cong thuc. */
  coreIdeas: readonly string[];
  /** Cong thuc hoac quy tac phai thuoc long. */
  formulas: readonly string[];
  /** Cac dang bai thuong gap, kem dau hieu nhan biet. */
  patterns: readonly { name: string; cue: string }[];
  /** Bay hay mac, kem cach tranh. */
  traps: readonly { trap: string; fix: string }[];
  /** Chien thuat thoi gian trong phong thi. */
  timing: string;
}

export const KNOWLEDGE: readonly KnowledgeSheet[] = [
  /* ── Phần 1: Toán học và xử lý số liệu ─────────────────────────────── */
  {
    topicId: 'quantitative.arithmetic',
    section: 'quantitative',
    coreIdeas: [
      'Phần trăm luôn phải hỏi "phần trăm của cái gì" — mẫu số quyết định đáp án.',
      'Hai lần thay đổi liên tiếp là phép nhân hệ số, không phải phép cộng phần trăm.',
      'Bài toán năng suất quy về "làm được bao nhiêu phần công việc trong một đơn vị thời gian" thì cộng được.',
    ],
    formulas: [
      'Tăng a% rồi tăng b%: hệ số = (1 + a/100)(1 + b/100)',
      'Mức tăng tương đối = (giá trị sau − giá trị trước) / giá trị trước',
      'Năng suất chung = tổng các năng suất riêng; thời gian = 1 / năng suất chung',
      'Nồng độ = khối lượng chất tan / khối lượng dung dịch',
    ],
    patterns: [
      { name: 'Giảm giá liên tiếp', cue: 'Có hai lần giảm, lần sau tính trên giá đã giảm' },
      { name: 'Năng suất chung', cue: 'Hai người/máy cùng làm một công việc' },
      { name: 'Pha trộn dung dịch', cue: 'Thêm chất tan hoặc thêm dung môi vào dung dịch có sẵn' },
    ],
    traps: [
      { trap: 'Cộng gộp hai lần giảm giá thành một lần', fix: 'Nhân hai hệ số, luôn ra kết quả nhỏ hơn tổng cộng gộp' },
      { trap: 'Lấy chênh lệch chia cho kỳ sau thay vì kỳ gốc', fix: 'Mẫu số luôn là mốc so sánh, tức là kỳ trước' },
      { trap: 'Thêm chất tan mà quên khối lượng dung dịch cũng tăng', fix: 'Viết phương trình với cả tử và mẫu đều có x' },
    ],
    timing: 'Dạng này phải xong trong 60 giây. Nếu quá 90 giây, gần như chắc chắn bạn đang lập phương trình sai hướng — đọc lại đề.',
  },
  {
    topicId: 'quantitative.algebra',
    section: 'quantitative',
    coreIdeas: [
      'Dấu của biệt thức quyết định số nghiệm; định lý Viète nối nghiệm với hệ số mà không cần giải.',
      'Bất phương trình chứa căn phải chia trường hợp theo dấu của vế còn lại trước khi bình phương.',
      'Đồ thị cắt trục hoành tại nghiệm của phương trình — hai cách nói của cùng một việc.',
    ],
    formulas: [
      "Δ = b² − 4ac; Δ' = b'² − ac với b = 2b'",
      'Viète: x₁ + x₂ = −b/a, x₁x₂ = c/a',
      'x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂',
      '√A ≥ B ⟺ (B < 0 và A ≥ 0) hoặc (B ≥ 0 và A ≥ B²)',
    ],
    patterns: [
      { name: 'Tìm m để phương trình có nghiệm thỏa điều kiện', cue: 'Xuất hiện tham số m trong hệ số' },
      { name: 'Biểu thức đối xứng của hai nghiệm', cue: 'Hỏi x₁² + x₂², 1/x₁ + 1/x₂ mà không hỏi từng nghiệm' },
      { name: 'Bất phương trình vô tỉ', cue: 'Có dấu căn ở một vế' },
    ],
    traps: [
      { trap: 'Bình phương ngay hai vế mà bỏ sót trường hợp vế phải âm', fix: 'Luôn xét dấu vế không chứa căn trước' },
      { trap: 'Nhầm (x + y)² với x² + y²', fix: 'Nhớ số hạng chéo 2xy' },
      { trap: "Dùng Δ thay Δ' hoặc ngược lại mà không đổi hệ số", fix: "Δ' chỉ dùng khi b chẵn, và b' = b/2" },
    ],
    timing: 'Câu Viète nên xong trong 60 giây. Câu chứa tham số m cho phép tới 2 phút — nếu quá, bỏ lại và quay về sau.',
  },
  {
    topicId: 'quantitative.sequence',
    section: 'quantitative',
    coreIdeas: [
      'Cấp số cộng là cộng thêm một lượng cố định; cấp số nhân là nhân với một lượng cố định.',
      'Chỉ số n − 1 chứ không phải n là nguồn sai lầm phổ biến nhất của cả chuyên đề này.',
    ],
    formulas: [
      'CSC: uₙ = u₁ + (n − 1)d; Sₙ = n(u₁ + uₙ)/2',
      'CSN: uₙ = u₁·qⁿ⁻¹; Sₙ = u₁(qⁿ − 1)/(q − 1) khi q ≠ 1',
      'Ba số lập CSC ⟺ 2b = a + c; lập CSN ⟺ b² = ac',
    ],
    patterns: [
      { name: 'Tìm số hạng thứ n', cue: 'Cho u₁ và công sai/công bội' },
      { name: 'Tính tổng n số hạng đầu', cue: 'Hỏi "tổng của n số hạng đầu tiên"' },
      { name: 'Ba số lập cấp số', cue: 'Cho ba số và yêu cầu tìm điều kiện' },
    ],
    traps: [
      { trap: 'Dùng u₁ + n·d thay vì u₁ + (n − 1)d', fix: 'Kiểm nhanh với n = 1: công thức phải trả về đúng u₁' },
      { trap: 'Dùng công thức tổng CSN khi q = 1', fix: 'q = 1 thì Sₙ = n·u₁' },
    ],
    timing: 'Dạng thuần công thức, 45 giây là đủ. Đây là nhóm câu nên lấy trọn điểm.',
  },
  {
    topicId: 'quantitative.geometry',
    section: 'quantitative',
    coreIdeas: [
      'Tính diện tích bằng hai cách khác nhau là kỹ thuật mạnh nhất trong hình phẳng.',
      'Trong không gian, chiều cao luôn tìm bằng tam giác vuông chứa nó — hãy dựng tam giác đó trước khi tính.',
    ],
    formulas: [
      'Hệ thức lượng tam giác vuông: h·c = a·b (h là đường cao ứng với cạnh huyền c)',
      'V khối chóp = (1/3)·S đáy·h; V khối lăng trụ = S đáy·h',
      'Hình trụ: S xung quanh = 2πrh, V = πr²h',
      'Hình cầu: S = 4πR², V = (4/3)πR³',
    ],
    patterns: [
      { name: 'Đường cao ứng với cạnh huyền', cue: 'Tam giác vuông, biết hai cạnh góc vuông' },
      { name: 'Thể tích chóp đều', cue: 'Cho cạnh đáy và cạnh bên' },
      { name: 'Khối tròn xoay', cue: 'Cho bán kính và chiều cao' },
    ],
    traps: [
      { trap: 'Quên hệ số 1/3 của khối chóp', fix: 'Chóp luôn bằng 1/3 lăng trụ cùng đáy cùng chiều cao' },
      { trap: 'Nhầm nửa đường chéo đáy với cạnh đáy khi tính chiều cao chóp đều', fix: 'Vẽ hình, đánh dấu chân đường cao ở tâm đáy' },
    ],
    timing: 'Hình không gian cho phép 2 phút. Dành 20 giây đầu để vẽ hình — vẽ hình nhanh hơn là tưởng tượng.',
  },
  {
    topicId: 'quantitative.coordinate',
    section: 'quantitative',
    coreIdeas: [
      'Tọa độ biến hình học thành đại số: mọi câu hỏi hình đều có một công thức tương ứng.',
      'Khoảng cách bằng 0 nghĩa là điểm nằm trên hình — đây là bẫy hay gặp chứ không phải lỗi tính.',
    ],
    formulas: [
      'd(M, Δ) = |ax₀ + by₀ + c| / √(a² + b²)',
      'Đường tròn x² + y² − 2ax − 2by + c = 0: tâm I(a; b), R = √(a² + b² − c)',
      'AB = √((x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²)',
      'Trung điểm: tọa độ là trung bình cộng của hai đầu mút',
    ],
    patterns: [
      { name: 'Khoảng cách điểm — đường thẳng', cue: 'Cho một điểm và một phương trình đường thẳng' },
      { name: 'Xác định tâm và bán kính đường tròn', cue: 'Phương trình dạng khai triển' },
      { name: 'Độ dài đoạn thẳng trong không gian', cue: 'Cho hai điểm có ba tọa độ' },
    ],
    traps: [
      { trap: 'Quên chuẩn hóa mẫu số √(a² + b²)', fix: 'Mẫu số luôn là độ dài vectơ pháp tuyến' },
      { trap: 'Lấy c làm −c khi tìm bán kính', fix: 'Đưa phương trình về đúng dạng chuẩn trước, chú ý dấu' },
    ],
    timing: '60–75 giây. Nếu công thức đã thuộc, đây là nhóm câu ăn điểm nhanh nhất phần Toán.',
  },
  {
    topicId: 'quantitative.calculus',
    section: 'quantitative',
    coreIdeas: [
      'Đạo hàm đổi dấu từ dương sang âm là cực đại; từ âm sang dương là cực tiểu.',
      'Trên một đoạn kín, giá trị lớn nhất chỉ có thể ở điểm tới hạn hoặc ở hai đầu mút — so ba nhóm là xong.',
      'Diện tích giữa hai đồ thị là tích phân của hiệu, lấy hàm ở trên trừ hàm ở dưới.',
    ],
    formulas: [
      "(xⁿ)' = n·xⁿ⁻¹; ∫xⁿdx = xⁿ⁺¹/(n+1) + C (n ≠ −1)",
      'S = ∫ₐᵇ |f(x) − g(x)| dx',
      'Hoành độ giao điểm là nghiệm của f(x) = g(x) — luôn tìm cận bằng cách này',
    ],
    patterns: [
      { name: 'Cực trị của hàm bậc ba', cue: "y' là tam thức bậc hai" },
      { name: 'GTLN — GTNN trên đoạn', cue: 'Có đoạn [a; b] trong đề' },
      { name: 'Diện tích hình phẳng', cue: 'Cho hai đồ thị và hỏi diện tích' },
    ],
    traps: [
      { trap: 'Nhầm cực đại với cực tiểu', fix: 'Lập bảng biến thiên thay vì nhớ dấu' },
      { trap: 'Quên trừ hàm dưới khi tính diện tích', fix: 'Vẽ phác hai đồ thị để biết hàm nào ở trên' },
      { trap: 'Bỏ sót giá trị tại hai đầu mút', fix: 'Luôn tính đủ f(a), f(b) và các điểm tới hạn' },
    ],
    timing: 'Cực trị 60 giây, tích phân cơ bản 60 giây, diện tích hình phẳng 2 phút. Nếu tích phân không ra sau 2 phút, đề có thể đang cài đổi biến — cân nhắc bỏ qua.',
  },
  {
    topicId: 'quantitative.exponential',
    section: 'quantitative',
    coreIdeas: [
      'Hàm mũ đơn điệu nên hai lũy thừa cùng cơ số bằng nhau khi và chỉ khi số mũ bằng nhau.',
      'Logarit là phép nghịch đảo của mũ; mọi tính chất đều suy ra từ tính chất của mũ.',
      'Điều kiện xác định của logarit gây mất điểm nhiều hơn cả phần giải.',
    ],
    formulas: [
      'log_a(xy) = log_a x + log_a y; log_a(x/y) = log_a x − log_a y',
      'log_a(xⁿ) = n·log_a x; log_a b = log_c b / log_c a',
      'a^x = a^y ⟺ x = y (a > 0, a ≠ 1)',
      'Điều kiện: log_a x xác định khi x > 0',
    ],
    patterns: [
      { name: 'Đưa về cùng cơ số', cue: 'Hai vế là lũy thừa của cùng một số' },
      { name: 'Gộp logarit rồi giải', cue: 'Tổng hoặc hiệu hai logarit cùng cơ số' },
      { name: 'Đặt ẩn phụ', cue: 'Xuất hiện a^x và a^2x trong cùng phương trình' },
    ],
    traps: [
      { trap: 'Quên đối chiếu điều kiện xác định', fix: 'Viết điều kiện ra giấy TRƯỚC khi giải, không phải sau' },
      { trap: 'Nhận cả nghiệm âm khi giải x² = 9 trong bài logarit', fix: 'Loại nghiệm không thỏa điều kiện x > 1 hoặc x > 0' },
    ],
    timing: '60–90 giây. Viết điều kiện xác định trong 10 giây đầu, việc này tiết kiệm nhiều điểm hơn bất kỳ mẹo nào.',
  },
  {
    topicId: 'quantitative.combinatorics',
    section: 'quantitative',
    coreIdeas: [
      'Có phân biệt thứ tự thì dùng chỉnh hợp; không phân biệt thứ tự thì dùng tổ hợp. Đây là câu hỏi đầu tiên phải trả lời.',
      'Xác suất cổ điển = số kết quả thuận lợi / số kết quả đồng khả năng — mẫu số phải đếm nhất quán với tử số.',
      'Bài "ít nhất" thường dễ hơn khi tính phần bù.',
    ],
    formulas: [
      'C(n, k) = n! / (k!(n−k)!); A(n, k) = n! / (n−k)!',
      'P(A) = |A| / |Ω|; P(Ā) = 1 − P(A)',
      'Quy tắc nhân: chọn theo nhiều bước độc lập thì nhân số cách',
    ],
    patterns: [
      { name: 'Chọn nhóm không phân vai', cue: 'Từ khóa "tổ", "nhóm", "chọn ra k người"' },
      { name: 'Lập số có chữ số khác nhau', cue: 'Từ khóa "đôi một khác nhau"' },
      { name: 'Đúng k phần tử loại A', cue: 'Từ khóa "đúng", khác hẳn với "ít nhất"' },
    ],
    traps: [
      { trap: 'Dùng chỉnh hợp khi đề không phân biệt vai trò', fix: 'Hỏi: đổi thứ tự có ra kết quả khác không?' },
      { trap: 'Nhầm "đúng 2" với "ít nhất 2"', fix: 'Gạch chân từ khóa này ngay khi đọc đề' },
    ],
    timing: '60 giây cho câu đếm cơ bản, 2 phút cho câu xác suất phức. Nếu mẫu số khó đếm, thử tính phần bù.',
  },
  {
    topicId: 'quantitative.statistics',
    section: 'quantitative',
    coreIdeas: [
      'Trung bình bị kéo bởi giá trị cực đoan; trung vị thì không. Đề hay khai thác đúng chỗ khác nhau này.',
      'Bài trung bình có trọng số giải bằng cách quay về TỔNG rồi mới chia lại.',
      'Độ lệch chuẩn là căn của phương sai — quên lấy căn là lỗi mất điểm phổ biến nhất.',
    ],
    formulas: [
      'Trung bình = tổng / số phần tử',
      'Phương sai = Σ(xᵢ − x̄)² / n; độ lệch chuẩn = √phương sai',
      'Tỉ trọng = thành phần / tổng thể × 100%',
      'Tốc độ tăng = (sau − trước) / trước × 100%',
    ],
    patterns: [
      { name: 'Trung bình có trọng số', cue: 'Cho trung bình của cả nhóm và của một nhóm con' },
      { name: 'Đọc bảng số liệu', cue: 'Đề kèm bảng nhiều dòng nhiều cột' },
      { name: 'Trung vị của dãy', cue: 'Hỏi giá trị ở giữa' },
    ],
    traps: [
      { trap: 'Dừng ở phương sai mà quên lấy căn', fix: 'Đọc lại câu hỏi: hỏi phương sai hay độ lệch chuẩn' },
      { trap: 'Nhầm "tăng bao nhiêu %" với "bằng bao nhiêu %"', fix: 'Tăng thì lấy chênh lệch; bằng thì lấy trực tiếp' },
      { trap: 'Quên sắp xếp dãy trước khi tìm trung vị', fix: 'Trung vị chỉ có nghĩa trên dãy đã sắp xếp' },
    ],
    timing: 'Câu đọc bảng số liệu chiếm tỉ trọng lớn trong đề HSA. Dành 30 giây đọc kỹ đầu đề bảng — sai ở bước đọc thì mọi phép tính sau đều vô nghĩa.',
  },

  /* ── Phần 2: Ngôn ngữ — Văn học ─────────────────────────────────────── */
  {
    topicId: 'qualitative.reading',
    section: 'qualitative',
    coreIdeas: [
      'Ý chính là ý bao trùm cả văn bản, không phải ý của đoạn hay nhất.',
      'Từ nối là manh mối mạnh nhất về cấu trúc lập luận: "Nhưng", "Tuy nhiên" báo hiệu đảo chiều; "Vì vậy" báo hiệu kết luận.',
      'Câu mở đầu nêu định kiến phổ biến thường là phản đề sẽ bị bác bỏ, không phải quan điểm tác giả.',
    ],
    formulas: [
      'Quy trình đọc: đọc câu hỏi trước → quét văn bản tìm vùng chứa đáp án → đọc kỹ vùng đó',
      'Phương thức biểu đạt: nghị luận (nêu quan điểm) / thuyết minh (cung cấp tri thức) / tự sự (kể) / miêu tả / biểu cảm',
    ],
    patterns: [
      { name: 'Xác định ý chính', cue: 'Hỏi "ý chính", "nhan đề phù hợp nhất"' },
      { name: 'Đọc hiểu chi tiết', cue: 'Hỏi "theo văn bản", "theo tác giả"' },
      { name: 'Suy luận hàm ý', cue: 'Hỏi "hàm ý", "có thể suy ra"' },
      { name: 'Nhận diện thao tác lập luận', cue: 'Hỏi cách tác giả thuyết phục' },
    ],
    traps: [
      { trap: 'Chọn đáp án nhắc lại một chi tiết đúng nhưng nhỏ', fix: 'Ý chính phải phủ được cả ba đoạn, không chỉ một' },
      { trap: 'Chọn ý bị chính văn bản bác bỏ', fix: 'Tìm từ "Nhưng"/"Tuy nhiên" — phần trước nó thường là ý bị bác' },
      { trap: 'Hiểu nghĩa đen ở chỗ tác giả dùng nghĩa chuyển', fix: 'Tín hiệu như "trớ trêu thay", dấu ngoặc kép báo hiệu nghĩa chuyển' },
    ],
    timing: 'Chùm 5 câu / 1 ngữ liệu: 6 phút cho cả chùm. Đọc lướt toàn bài 60 giây trước, rồi mới vào từng câu.',
  },
  {
    topicId: 'qualitative.literature',
    section: 'qualitative',
    coreIdeas: [
      'Nhớ theo cụm: tác giả — tác phẩm — thể loại — hoàn cảnh sáng tác — phong cách. Nhớ rời rạc thì rất dễ nhầm.',
      'Phong cách tác giả là câu hỏi hay gặp nhất và cũng dễ ăn điểm nhất nếu đã hệ thống.',
    ],
    formulas: [
      'Nguyễn Tuân: tài hoa, uyên bác, nhìn sự vật ở phương diện thẩm mĩ',
      'Tố Hữu: trữ tình chính trị, giàu tính sử thi',
      'Nam Cao: hiện thực sắc lạnh, đau đáu về nhân phẩm',
      'Vũ Trọng Phụng: trào phúng, đả kích xã hội thành thị',
      'Tô Hoài: am hiểu phong tục, ngôn ngữ đời sống',
    ],
    patterns: [
      { name: 'Tác giả — tác phẩm', cue: 'Hỏi ai viết tác phẩm nào' },
      { name: 'Hoàn cảnh sáng tác', cue: 'Hỏi tác phẩm viết trong giai đoạn nào, về ai' },
      { name: 'Thể loại và đặc trưng', cue: 'Hỏi thể thơ, thể loại' },
      { name: 'Phong cách nghệ thuật', cue: 'Đưa nhận định và hỏi đúng với ai' },
    ],
    traps: [
      { trap: 'Nhầm "Vợ nhặt" (Kim Lân) với "Vợ chồng A Phủ" (Tô Hoài)', fix: 'Nhớ theo bối cảnh: A Phủ ở Tây Bắc, Vợ nhặt ở nạn đói 1945' },
      { trap: 'Nhầm đề tài chống Pháp với chống Mĩ', fix: 'Neo theo mốc: 1945–1954 chống Pháp, 1954–1975 chống Mĩ' },
      { trap: 'Nhầm lục bát với song thất lục bát', fix: 'Truyện Kiều là lục bát; Chinh phụ ngâm bản Nôm là song thất lục bát' },
    ],
    timing: '30–45 giây. Đây là câu ăn điểm nếu đã học, và là câu nên bỏ nhanh nếu chưa — đừng đoán mò quá 60 giây.',
  },
  {
    topicId: 'qualitative.grammar',
    section: 'qualitative',
    coreIdeas: [
      'Xác định chủ ngữ và vị ngữ trước khi phán câu sai hay đúng.',
      'Cụm bắt đầu bằng "Qua", "Với", "Bằng", "Trong" là trạng ngữ — nếu sau nó là vị ngữ luôn thì câu thiếu chủ ngữ.',
      'Trạng ngữ chỉ phương tiện hoặc thái độ phải bổ nghĩa cho một chủ thể là người.',
    ],
    formulas: [
      'Câu đủ = (Trạng ngữ) + Chủ ngữ + Vị ngữ',
      'Định ngữ: đứng sau danh từ, làm rõ danh từ (thường mở đầu bằng "mà", "của")',
      'Bổ ngữ: đứng sau động từ hoặc tính từ',
    ],
    patterns: [
      { name: 'Câu thiếu chủ ngữ', cue: 'Câu mở đầu bằng "Qua...", "Thông qua..."' },
      { name: 'Sai lô-gíc trạng ngữ — chủ ngữ', cue: 'Trạng ngữ chỉ thái độ nhưng chủ ngữ là vật' },
      { name: 'Xác định thành phần câu', cue: 'Hỏi bộ phận in đậm giữ vai trò gì' },
    ],
    traps: [
      { trap: 'Thấy câu dài thì cho là sai', fix: 'Dài không phải lỗi. Tìm đủ chủ — vị mới kết luận' },
      { trap: 'Nhầm định ngữ với vị ngữ', fix: 'Vị ngữ là phần nêu hoạt động/trạng thái chính của câu' },
    ],
    timing: '45 giây. Kỹ thuật nhanh: che phần trạng ngữ đi, đọc lại xem câu còn đứng được không.',
  },
  {
    topicId: 'qualitative.vocabulary',
    section: 'qualitative',
    coreIdeas: [
      'Từ Hán Việt phải hiểu theo nghĩa đã định hình trong sử dụng, không phải ghép nghĩa từng yếu tố.',
      'Trường từ vựng: tìm ba từ cùng nhóm rồi loại từ còn lại — nhanh hơn phân tích từng từ.',
      'Kết hợp từ có quy tắc riêng: "góp phần" đi với quá trình, "góp mặt" đi với sự kiện.',
    ],
    formulas: [
      'Quy trình chọn từ điền: xác định từ loại cần điền → xét kết hợp từ → xét sắc thái',
      'Từ đồng nghĩa hiếm khi thay thế được nhau ở mọi ngữ cảnh — luôn thử đặt vào câu',
    ],
    patterns: [
      { name: 'Từ khác nhóm nghĩa', cue: 'Cho 4 từ, hỏi từ nào KHÔNG cùng nhóm' },
      { name: 'Nghĩa của từ Hán Việt', cue: 'Hỏi nghĩa một từ hai âm tiết Hán Việt' },
      { name: 'Điền từ vào chỗ trống', cue: 'Câu có dấu gạch, bốn phương án gần nghĩa' },
    ],
    traps: [
      { trap: 'Suy nghĩa Hán Việt từ từng yếu tố', fix: 'Nhớ nghĩa đã dùng phổ biến: "khả quan" = có triển vọng tốt' },
      { trap: 'Chọn từ đúng nghĩa nhưng sai kết hợp', fix: 'Đọc thành tiếng cả câu với từ đã chọn' },
    ],
    timing: '30–45 giây. Nếu phân vân giữa hai phương án quá 60 giây, đánh dấu và quay lại sau.',
  },
  {
    topicId: 'qualitative.rhetoric',
    section: 'qualitative',
    coreIdeas: [
      'Ẩn dụ dựa trên nét TƯƠNG ĐỒNG; hoán dụ dựa trên quan hệ GẦN GŨI. Đây là ranh giới bị hỏi nhiều nhất.',
      'Biện pháp tu từ luôn có tác dụng cụ thể — câu hỏi thường hỏi tác dụng chứ không chỉ hỏi tên.',
    ],
    formulas: [
      'Ẩn dụ: gọi A bằng tên B vì A và B giống nhau ở một nét',
      'Hoán dụ: gọi A bằng tên B vì A và B gần nhau (bộ phận — toàn thể, vật chứa — vật bị chứa, cụ thể — trừu tượng)',
      'Nói quá: phóng đại để nhấn mạnh; Nói giảm: giảm nhẹ để tránh thô hoặc đau',
      'Điệp: lặp lại để nhấn mạnh và tạo nhịp',
    ],
    patterns: [
      { name: 'Nhận diện biện pháp', cue: 'Cho câu thơ và hỏi dùng biện pháp gì' },
      { name: 'Phân tích tác dụng', cue: 'Hỏi biện pháp đó có tác dụng gì' },
    ],
    traps: [
      { trap: 'Nhầm ẩn dụ với hoán dụ', fix: 'Hỏi: hai vật GIỐNG nhau (ẩn dụ) hay GẦN nhau (hoán dụ)?' },
      { trap: 'Nhầm so sánh với ẩn dụ', fix: 'So sánh còn giữ cả hai vế và từ so sánh; ẩn dụ giấu một vế' },
    ],
    timing: '30–45 giây. Câu nhận diện là câu ăn điểm; câu hỏi tác dụng cho phép tới 60 giây.',
  },
  {
    topicId: 'qualitative.logic',
    section: 'qualitative',
    coreIdeas: [
      'Sắp xếp câu thành đoạn: từ nối quyết định thứ tự, không phải nội dung.',
      'Phép phản đảo: từ "nếu P thì Q" chỉ suy ra được "nếu không Q thì không P" — không suy ra được điều ngược lại.',
      'Kết luận chắc chắn khác với kết luận có thể — đề luôn phân biệt hai mức này.',
    ],
    formulas: [
      'P → Q tương đương ¬Q → ¬P (phản đảo, luôn đúng)',
      'P → Q KHÔNG tương đương Q → P (đảo, không suy ra được)',
      'Từ nối chỉ phản bác: nhưng, tuy nhiên, trái lại, ngược lại',
      'Từ nối chỉ kết luận: vì vậy, do đó, như vậy, tóm lại',
    ],
    patterns: [
      { name: 'Sắp xếp câu thành đoạn', cue: 'Cho các câu đánh số và hỏi thứ tự' },
      { name: 'Suy luận từ tiền đề', cue: 'Cho hai mệnh đề và hỏi kết luận nào chắc chắn đúng' },
    ],
    traps: [
      { trap: 'Dùng mệnh đề đảo thay vì phản đảo', fix: 'Viết ra P → Q rồi phủ định cả hai vế và đảo chiều' },
      { trap: 'Chọn phương án "không thể kết luận" khi thực ra suy được', fix: 'Thử phép phản đảo trước khi kết luận là không suy được' },
    ],
    timing: '60–90 giây. Với câu sắp xếp, khoanh tròn các từ nối trước khi đọc nội dung.',
  },

  /* ── Phần 3: Vật lý ────────────────────────────────────────────────── */
  {
    topicId: 'science.physics.mechanics',
    section: 'science',
    coreIdeas: [
      'Rơi tự do không phụ thuộc khối lượng — chỉ phụ thuộc độ cao và g.',
      'Động năng tỉ lệ với BÌNH PHƯƠNG vận tốc: vận tốc gấp đôi thì động năng gấp bốn.',
      'Công chỉ được sinh ra theo phương của dịch chuyển.',
    ],
    formulas: [
      'a = F/m (định luật II Newton)',
      'h = ½gt² ⟹ t = √(2h/g); v = gt',
      'W_đ = ½mv²; W_t = mgh',
      'A = F·s·cosα',
    ],
    patterns: [
      { name: 'Rơi tự do', cue: 'Thả không vận tốc đầu từ độ cao h' },
      { name: 'Định luật II Newton', cue: 'Cho lực và khối lượng, hỏi gia tốc' },
      { name: 'Công và năng lượng', cue: 'Cho lực, quãng đường hoặc vận tốc' },
    ],
    traps: [
      { trap: 'Quên hệ số ½ trong h = ½gt² và trong động năng', fix: 'Kiểm thứ nguyên hoặc thử một trường hợp đã biết' },
      { trap: 'Nhân F với s khi lực không cùng phương dịch chuyển', fix: 'Luôn viết cosα, kể cả khi α = 0' },
    ],
    timing: '45–60 giây. Dạng thuần công thức, nên lấy trọn điểm.',
  },
  {
    topicId: 'science.physics.oscillation',
    section: 'science',
    coreIdeas: [
      'Tần số góc của con lắc lò xo chỉ phụ thuộc k và m, không phụ thuộc biên độ.',
      'Bước sóng, tốc độ và tần số liên hệ nghịch: cùng tốc độ, tần số càng cao thì bước sóng càng ngắn.',
      'Đối chiếu phương trình dao động với dạng chuẩn là bước đầu tiên của mọi bài.',
    ],
    formulas: [
      'x = A·cos(ωt + φ); T = 2π/ω; f = 1/T',
      'Con lắc lò xo: ω = √(k/m)',
      'Con lắc đơn: ω = √(g/ℓ)',
      'λ = v/f = v·T',
    ],
    patterns: [
      { name: 'Đọc tham số từ phương trình', cue: 'Cho x = A·cos(ωt + φ)' },
      { name: 'Tần số góc con lắc', cue: 'Cho k và m, hoặc g và ℓ' },
      { name: 'Bước sóng', cue: 'Cho tốc độ truyền và tần số' },
    ],
    traps: [
      { trap: 'Nhân v với f thay vì chia', fix: 'Kiểm đơn vị: m/s chia 1/s ra mét — đúng thứ nguyên bước sóng' },
      { trap: 'Nhầm ω với f', fix: 'ω tính bằng rad/s, f tính bằng Hz, ω = 2πf' },
    ],
    timing: '45–60 giây. Viết ra ω, T, f cùng lúc ngay khi đọc đề — thường đề hỏi một trong ba.',
  },
  {
    topicId: 'science.physics.electricity',
    section: 'science',
    coreIdeas: [
      'Nối tiếp: dòng điện như nhau, điện trở cộng. Song song: hiệu điện thế như nhau, nghịch đảo điện trở cộng.',
      'Điện trở tương đương khi mắc song song LUÔN nhỏ hơn điện trở nhỏ nhất — dùng để kiểm tra nhanh.',
    ],
    formulas: [
      'I = U/R (định luật Ohm)',
      'Nối tiếp: R = R₁ + R₂; song song: 1/R = 1/R₁ + 1/R₂',
      'Song song hai điện trở: R = R₁R₂/(R₁+R₂)',
      'P = UI = I²R = U²/R',
    ],
    patterns: [
      { name: 'Mạch nối tiếp', cue: 'Các điện trở mắc liên tiếp' },
      { name: 'Mạch song song', cue: 'Các điện trở cùng nối vào hai điểm' },
      { name: 'Công suất tiêu thụ', cue: 'Hỏi công suất hoặc nhiệt lượng' },
    ],
    traps: [
      { trap: 'Cộng điện trở khi mắc song song', fix: 'Kiểm bằng quy tắc: kết quả phải nhỏ hơn điện trở nhỏ nhất' },
      { trap: 'Nhầm U toàn mạch với U trên một điện trở', fix: 'Vẽ mạch và đánh dấu chỗ đo hiệu điện thế' },
    ],
    timing: '45–60 giây. Vẽ lại mạch trong 10 giây đầu nếu đề mô tả bằng lời.',
  },
  {
    topicId: 'science.physics.modern',
    section: 'science',
    coreIdeas: [
      'Số khối A đếm cả proton lẫn nơtron; Z là số proton. Số nơtron = A − Z.',
      'Trong phản ứng hạt nhân, tổng số khối và tổng điện tích đều được bảo toàn.',
    ],
    formulas: [
      'Kí hiệu ᴬ_Z X: A = số khối, Z = số proton, N = A − Z',
      'Bảo toàn: ΣA trước = ΣA sau; ΣZ trước = ΣZ sau',
      'E = mc²; 1u ≈ 931,5 MeV/c²',
    ],
    patterns: [
      { name: 'Đọc cấu tạo hạt nhân', cue: 'Cho kí hiệu hạt nhân, hỏi số hạt' },
      { name: 'Cân bằng phản ứng hạt nhân', cue: 'Phương trình thiếu một hạt' },
    ],
    traps: [
      { trap: 'Nhầm số nơtron với số proton', fix: 'Z ở dưới là proton, hiệu A − Z mới là nơtron' },
      { trap: 'Quên bảo toàn điện tích khi cân bằng', fix: 'Cân cả hai chỉ số, không chỉ số khối' },
    ],
    timing: '30–45 giây. Đây là nhóm câu ngắn, nên làm sớm để dành thời gian cho phần khó.',
  },

  /* ── Phần 3: Hóa học ───────────────────────────────────────────────── */
  {
    topicId: 'science.chemistry.general',
    section: 'science',
    coreIdeas: [
      'Số hiệu nguyên tử Z quyết định nguyên tố, và bằng số proton.',
      'Mol là cầu nối giữa khối lượng và số hạt — hầu hết bài tính toán đều đi qua mol.',
      'Axit mạnh phân li hoàn toàn, nên [H⁺] bằng đúng nồng độ axit.',
    ],
    formulas: [
      'n = m/M = V/22,4 (khí ở đktc) = C_M·V',
      'pH = −log[H⁺]; pH + pOH = 14',
      'Số nơtron = A − Z',
    ],
    patterns: [
      { name: 'Tính theo mol', cue: 'Cho khối lượng hoặc thể tích, hỏi đại lượng còn lại' },
      { name: 'Tính pH', cue: 'Cho nồng độ axit hoặc bazơ mạnh' },
      { name: 'Cấu tạo nguyên tử', cue: 'Cho Z hoặc A, hỏi số hạt' },
    ],
    traps: [
      { trap: 'Dùng 22,4 L/mol cho chất không phải khí hoặc không ở đktc', fix: 'Kiểm điều kiện trước khi dùng' },
      { trap: 'Tính pH của axit yếu như axit mạnh', fix: 'Axit yếu cần hằng số phân li, không phân li hoàn toàn' },
    ],
    timing: '45 giây cho câu công thức thuần. Viết n ra trước mọi phép tính khác.',
  },
  {
    topicId: 'science.chemistry.inorganic',
    section: 'science',
    coreIdeas: [
      'Chỉ kim loại đứng trước H trong dãy hoạt động mới đẩy được H₂ khỏi axit loãng.',
      'Phản ứng trung hòa theo tỉ lệ mol H⁺ : OH⁻ = 1 : 1.',
      'SO₂ và NOₓ gây mưa axit; CO₂ gây hiệu ứng nhà kính. Hai chuyện khác nhau.',
    ],
    formulas: [
      'Dãy hoạt động: K Na Ca Mg Al Zn Fe Ni Sn Pb (H) Cu Hg Ag Pt Au',
      'n(H⁺) = n(OH⁻) tại điểm trung hòa',
      'C_M = n/V ⟹ V = n/C_M',
    ],
    patterns: [
      { name: 'Kim loại tác dụng axit', cue: 'Hỏi kim loại nào phản ứng giải phóng H₂' },
      { name: 'Chuẩn độ trung hòa', cue: 'Cho thể tích và nồng độ một dung dịch, hỏi dung dịch kia' },
      { name: 'Hóa học môi trường', cue: 'Hỏi khí gây mưa axit, hiệu ứng nhà kính' },
    ],
    traps: [
      { trap: 'Cho rằng Cu tác dụng HCl loãng', fix: 'Cu đứng sau H nên không đẩy được H₂' },
      { trap: 'Nhân thay vì chia cho nồng độ khi tìm thể tích', fix: 'Kiểm đơn vị: mol chia mol/L ra L' },
      { trap: 'Nhầm khí gây mưa axit với khí nhà kính', fix: 'Mưa axit: SO₂, NOₓ. Nhà kính: CO₂, CH₄' },
    ],
    timing: '45–60 giây. Câu lý thuyết nhận biết nên xong trong 30 giây.',
  },
  {
    topicId: 'science.chemistry.organic',
    section: 'science',
    coreIdeas: [
      'Liên kết đôi C=C kém bền nên anken đặc trưng bởi phản ứng CỘNG; ankan no nên đặc trưng bởi phản ứng THẾ.',
      'Bảo toàn nguyên tố cacbon là công cụ nhanh nhất cho bài đốt cháy.',
      'Nhóm –CHO cho phản ứng tráng bạc với tỉ lệ 1 mol chất : 2 mol Ag.',
    ],
    formulas: [
      'Đốt cháy CₓH_y: mỗi mol chất cho x mol CO₂ và y/2 mol H₂O',
      'Tráng bạc: 1 mol –CHO → 2 mol Ag',
      'Etanol C₂H₅OH = C₂H₆O; axit axetic CH₃COOH = C₂H₄O₂',
    ],
    patterns: [
      { name: 'Phản ứng đặc trưng', cue: 'Hỏi phản ứng đặc trưng của một loại hợp chất' },
      { name: 'Bài đốt cháy', cue: 'Cho số mol chất hữu cơ, hỏi CO₂ hoặc H₂O' },
      { name: 'Phản ứng tráng bạc', cue: 'Có glucozơ, anđehit hoặc nhóm –CHO' },
    ],
    traps: [
      { trap: 'Dùng tỉ lệ 1:1 cho phản ứng tráng bạc', fix: 'Mỗi nhóm –CHO cho 2 Ag' },
      { trap: 'Nhầm công thức phân tử etanol với axit axetic', fix: 'Đếm số O: etanol 1 O, axit axetic 2 O' },
    ],
    timing: '60 giây cho câu lý thuyết, 90 giây cho bài tính. Dùng bảo toàn nguyên tố thay vì cân bằng đầy đủ phương trình.',
  },

  /* ── Phần 3: Lịch sử ───────────────────────────────────────────────── */
  {
    topicId: 'science.history.vietnam',
    section: 'science',
    coreIdeas: [
      'Neo theo bốn mốc lớn: 1930 thành lập Đảng — 1945 Cách mạng tháng Tám — 1954 Điện Biên Phủ — 1975 thống nhất — 1986 Đổi mới.',
      'Câu hỏi quan hệ nhân quả (sự kiện nào dẫn tới sự kiện nào) hay gặp hơn câu hỏi ngày tháng thuần túy.',
    ],
    formulas: [
      '3/2/1930: thành lập Đảng Cộng sản Việt Nam',
      '19/8/1945: khởi nghĩa giành chính quyền ở Hà Nội; 2/9/1945: Tuyên ngôn Độc lập',
      '7/5/1954: chiến thắng Điện Biên Phủ → 21/7/1954: Hiệp định Genève',
      '1973: Hiệp định Paris; 30/4/1975: Chiến dịch Hồ Chí Minh toàn thắng',
      '12/1986: Đại hội VI đề ra đường lối Đổi mới',
    ],
    patterns: [
      { name: 'Mốc thời gian', cue: 'Hỏi sự kiện diễn ra năm nào' },
      { name: 'Quan hệ nhân quả', cue: 'Hỏi thắng lợi nào dẫn tới hiệp định nào' },
      { name: 'Thứ tự chiến dịch', cue: 'Hỏi chiến dịch nào mở đầu, kết thúc' },
    ],
    traps: [
      { trap: 'Nhầm Hiệp định Genève (chống Pháp) với Hiệp định Paris (chống Mĩ)', fix: 'Genève 1954 sau Điện Biên Phủ; Paris 1973 sau Điện Biên Phủ trên không' },
      { trap: 'Nhầm 1925 (Hội VNCM Thanh niên) với 1930 (thành lập Đảng)', fix: '1925 là tổ chức tiền thân, không phải Đảng' },
    ],
    timing: '30 giây. Đây là câu hoặc biết hoặc không — không nên nghĩ quá 45 giây.',
  },
  {
    topicId: 'science.history.world',
    section: 'science',
    coreIdeas: [
      'Trật tự hai cực Ianta hình thành 1945 và tan rã hoàn toàn 1991 khi Liên Xô sụp đổ.',
      'Xu thế toàn cầu hóa và hội nhập khu vực là chủ đề xuyên suốt phần hiện đại.',
    ],
    formulas: [
      '1945: Liên hợp quốc thành lập (Hiến chương có hiệu lực 24/10/1945)',
      '8/8/1967: ASEAN thành lập tại Bangkok với 5 nước sáng lập',
      '1989: bức tường Berlin sụp đổ; 1991: Liên Xô tan rã',
      '7/1995: Việt Nam gia nhập ASEAN; 2007: gia nhập WTO',
    ],
    patterns: [
      { name: 'Tổ chức quốc tế', cue: 'Hỏi năm thành lập, số thành viên sáng lập' },
      { name: 'Trật tự thế giới', cue: 'Hỏi sự kiện đánh dấu kết thúc Chiến tranh lạnh' },
      { name: 'Hội nhập của Việt Nam', cue: 'Hỏi năm Việt Nam gia nhập tổ chức nào' },
    ],
    traps: [
      { trap: 'Nhầm 1919 (Hội Quốc liên) với 1945 (Liên hợp quốc)', fix: 'Hội Quốc liên sau Thế chiến I; Liên hợp quốc sau Thế chiến II' },
      { trap: 'Cho rằng 1989 là mốc trật tự hai cực tan rã', fix: '1989 là bước ngoặt; 1991 mới là kết thúc hoàn toàn' },
      { trap: 'Nhầm 1995 (ASEAN) với 2007 (WTO)', fix: 'ASEAN là khu vực, WTO là toàn cầu — mốc sau cao hơn' },
    ],
    timing: '30 giây. Ưu tiên làm trước các câu mốc thời gian để lấy điểm chắc.',
  },

  /* ── Phần 3: Địa lý ────────────────────────────────────────────────── */
  {
    topicId: 'science.geography.nature',
    section: 'science',
    coreIdeas: [
      'Vị trí nội chí tuyến + giáp Biển Đông + nằm trong khu vực gió mùa châu Á quy định tính chất nhiệt đới ẩm gió mùa.',
      'Đồi núi chiếm khoảng 3/4 diện tích, nhưng chủ yếu là đồi núi thấp dưới 1000 m.',
      'Gió mùa Đông Bắc suy yếu dần về phía nam, gần như bị chặn ở dãy Bạch Mã.',
    ],
    formulas: [
      'Đồi núi ≈ 3/4 diện tích; đồng bằng ≈ 1/4',
      'Địa hình thấp dần từ tây bắc xuống đông nam',
      'Ranh giới khí hậu quan trọng: dãy Bạch Mã (khoảng vĩ tuyến 16°B)',
    ],
    patterns: [
      { name: 'Đặc điểm khí hậu', cue: 'Hỏi tính chất cơ bản của khí hậu Việt Nam' },
      { name: 'Câu hỏi phủ định về địa hình', cue: 'Có từ "KHÔNG đúng"' },
      { name: 'Ảnh hưởng gió mùa', cue: 'Hỏi khu vực chịu ảnh hưởng gió mùa nào' },
    ],
    traps: [
      { trap: 'Bỏ sót từ "KHÔNG" trong câu hỏi phủ định', fix: 'Gạch chân từ phủ định ngay khi đọc đề' },
      { trap: 'Nhầm tỉ lệ đồi núi 1/4 với 3/4', fix: 'Nhớ: Việt Nam là nước nhiều đồi núi' },
    ],
    timing: '30–45 giây. Câu phủ định cần thêm 15 giây để đọc lại — vẫn rẻ hơn mất điểm.',
  },
  {
    topicId: 'science.geography.economy',
    section: 'science',
    coreIdeas: [
      'Mỗi vùng có một thế mạnh gắn với điều kiện tự nhiên: ĐBSCL — lúa, Tây Nguyên — cà phê, Đông Nam Bộ — cao su và công nghiệp.',
      'Câu hỏi vùng kinh tế thường hỏi "lớn nhất", "quan trọng nhất" — nhớ theo cặp vùng — sản phẩm.',
    ],
    formulas: [
      'ĐBSCL: vựa lúa lớn nhất (diện tích và sản lượng)',
      'Tây Nguyên: cà phê (đất badan, khí hậu cận xích đạo có mùa khô)',
      'Đông Nam Bộ: cao su, công nghiệp, dầu khí',
      'Trung du miền núi Bắc Bộ: chè, cây dược liệu, thủy điện',
    ],
    patterns: [
      { name: 'Vùng — sản phẩm chủ lực', cue: 'Hỏi vùng nào dẫn đầu về sản phẩm gì' },
      { name: 'Điều kiện phát triển', cue: 'Hỏi vì sao vùng đó phát triển ngành đó' },
    ],
    traps: [
      { trap: 'Nhầm cà phê (Tây Nguyên) với cao su (Đông Nam Bộ)', fix: 'Neo theo đất: badan Tây Nguyên — cà phê; đất xám Đông Nam Bộ — cao su' },
      { trap: 'Nhầm ĐBSCL với ĐBSH về sản lượng lúa', fix: 'ĐBSCL lớn hơn nhiều cả về diện tích lẫn sản lượng' },
    ],
    timing: '30 giây. Nhóm câu ăn điểm nếu đã hệ thống theo bảng vùng — sản phẩm.',
  },
  {
    topicId: 'science.geography.data',
    section: 'science',
    coreIdeas: [
      'Từ khóa trong đề quyết định dạng biểu đồ, không phải cảm nhận về số liệu.',
      'Số liệu khác đơn vị thì phải xử lí về dạng tương đối trước khi so sánh tốc độ tăng trưởng.',
    ],
    formulas: [
      '"Cơ cấu" + 1 năm → biểu đồ tròn; + 2–3 năm → nhiều hình tròn; + ≥ 4 năm → biểu đồ miền',
      '"Tốc độ tăng trưởng" → biểu đồ đường, năm gốc = 100%',
      '"So sánh quy mô" → biểu đồ cột',
      '"Hai đại lượng khác đơn vị" → biểu đồ kết hợp cột và đường',
      'Tỉ trọng = thành phần / tổng × 100%',
    ],
    patterns: [
      { name: 'Chọn dạng biểu đồ', cue: 'Hỏi biểu đồ nào thích hợp nhất' },
      { name: 'Tính tỉ trọng', cue: 'Cho bảng số liệu, hỏi phần trăm của một thành phần' },
      { name: 'Nhận xét bảng số liệu', cue: 'Hỏi nhận xét nào đúng/không đúng' },
    ],
    traps: [
      { trap: 'Chọn biểu đồ miền cho tốc độ tăng trưởng', fix: 'Miền dùng cho chuyển dịch cơ cấu; đường dùng cho tốc độ' },
      { trap: 'So sánh trực tiếp số liệu khác đơn vị', fix: 'Quy về chỉ số với năm gốc bằng 100%' },
    ],
    timing: '45 giây cho câu nhận dạng biểu đồ, 90 giây cho câu tính toán trên bảng. Đọc kỹ tiêu đề bảng trước.',
  },

  /* ── Phần 3: Tiếng Anh ─────────────────────────────────────────────── */
  {
    topicId: 'science.english.grammar',
    section: 'science',
    coreIdeas: [
      'Xác định mốc thời gian trong câu trước khi chọn thì.',
      '"The number of + N số nhiều" là chủ ngữ SỐ ÍT; "A number of + N số nhiều" mới là số nhiều.',
      'Cụm phủ định đứng đầu câu (Not until, Never, Rarely) buộc phải đảo ngữ.',
    ],
    formulas: [
      'Điều kiện hỗn hợp: If + had + V3 (quá khứ), would + V (hiện tại)',
      'Đảo ngữ loại 3: Had + S + V3',
      'Thể giả định sau insist/demand/suggest/recommend: S + V nguyên mẫu',
      'whose dùng cho cả người và vật để chỉ sở hữu',
      'that KHÔNG dùng trong mệnh đề quan hệ không xác định (có dấu phẩy)',
    ],
    patterns: [
      { name: 'Chọn thì phù hợp', cue: 'Có trạng ngữ thời gian hoặc mệnh đề mốc' },
      { name: 'Mệnh đề quan hệ', cue: 'Có chỗ trống trước danh từ hoặc sau dấu phẩy' },
      { name: 'Đảo ngữ', cue: 'Câu bắt đầu bằng cụm phủ định' },
      { name: 'Tìm lỗi sai', cue: 'Bốn phần được gạch chân' },
    ],
    traps: [
      { trap: 'Chia động từ số nhiều sau "The number of"', fix: 'Nhớ cặp đối lập: The number → is; A number → are' },
      { trap: 'Dùng "which" trước danh từ trần', fix: 'Sở hữu thì dùng whose, hoặc "of which the + N"' },
      { trap: 'Quên đảo ngữ sau cụm phủ định đầu câu', fix: 'Thấy Not until / Never đầu câu là nghĩ ngay tới trợ động từ' },
    ],
    timing: '30–40 giây mỗi câu. Câu tìm lỗi sai cho phép 60 giây.',
  },
  {
    topicId: 'science.english.vocabulary',
    section: 'science',
    coreIdeas: [
      'Collocation quan trọng hơn nghĩa đơn lẻ: nhiều từ đúng nghĩa nhưng sai kết hợp.',
      'Từ loại quyết định trước, nghĩa quyết định sau: sau linking verb cần tính từ.',
      'Cụm giới từ cố định phải học nguyên cụm, không suy luận.',
    ],
    formulas: [
      'be consistent WITH; on the grounds OF; reconcile A WITH B',
      'Sau remain / become / seem / appear → tính từ',
      'Hậu tố tính từ thường gặp: -ic, -ive, -ous, -ful, -al',
    ],
    patterns: [
      { name: 'Từ đồng nghĩa', cue: 'Hỏi closest in meaning' },
      { name: 'Từ trái nghĩa', cue: 'Hỏi OPPOSITE in meaning' },
      { name: 'Chọn collocation', cue: 'Bốn phương án cùng nghĩa gần nhau' },
      { name: 'Dạng từ', cue: 'Bốn phương án cùng gốc, khác hậu tố' },
    ],
    traps: [
      { trap: 'Chọn từ đúng nghĩa nhưng sai kết hợp', fix: 'Thử đọc cả cụm: "consistent with" nghe đúng, "consistent to" thì không' },
      { trap: 'Chọn danh từ ở vị trí cần tính từ', fix: 'Xác định từ loại trước khi xét nghĩa' },
    ],
    timing: '30 giây. Câu collocation nếu không chắc trong 45 giây thì đánh dấu và quay lại.',
  },
  {
    topicId: 'science.english.reading',
    section: 'science',
    coreIdeas: [
      'Đọc câu hỏi trước, rồi quét bài tìm vùng chứa đáp án — không đọc kỹ cả bài từ đầu.',
      'Từ vựng trong ngữ cảnh: chọn nghĩa hợp với sắc thái của đoạn, không chọn nghĩa từ điển phổ biến nhất.',
      'Câu hỏi thái độ tác giả thường nằm ở câu cuối hoặc ở các từ hạn định (may, might, however).',
    ],
    formulas: [
      'Main idea: ý phủ được cả bài, thường nằm ở đoạn 1 hoặc đoạn cuối',
      'Detail: có từ khóa trùng với bài — quét từ khóa',
      'Inference: không có sẵn trong bài, phải suy từ hai chi tiết trở lên',
      'Attitude: dựa vào tính từ và từ hạn định',
    ],
    patterns: [
      { name: 'Main idea', cue: 'What is the main idea / best title' },
      { name: 'Detail', cue: 'According to the passage' },
      { name: 'Vocabulary in context', cue: 'The word X is closest in meaning to' },
      { name: 'Inference', cue: 'It can be inferred / The author suggests' },
    ],
    traps: [
      { trap: 'Chọn nghĩa từ điển phổ biến nhất thay vì nghĩa hợp ngữ cảnh', fix: 'Thay từ đã chọn vào câu và đọc lại xem có hợp sắc thái không' },
      { trap: 'Chọn ý đúng nhưng quá hẹp cho câu main idea', fix: 'Ý chính phải phủ cả bài, không chỉ một đoạn' },
      { trap: 'Chọn đáp án dùng lại từ ngữ trong bài mà sai nghĩa', fix: 'Trùng từ không có nghĩa là đúng ý' },
    ],
    timing: 'Chùm 5–6 câu / 1 bài đọc: 7 phút. Quét bài 60 giây, mỗi câu 60–70 giây.',
  },
];

export const KNOWLEDGE_BY_TOPIC = new Map(KNOWLEDGE.map((k) => [k.topicId, k]));

export function knowledgeFor(topicId: string): KnowledgeSheet | undefined {
  return KNOWLEDGE_BY_TOPIC.get(topicId);
}
