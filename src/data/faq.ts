import type { PageId } from '@/lib/routes';

/**
 * CÂU HỎI THƯỜNG GẶP
 *
 * Đây không phải phần trang trí để lấy dữ liệu có cấu trúc. Mỗi câu là một câu
 * người học hoặc phụ huynh thật sự gõ vào ô tìm kiếm, và câu trả lời phải đứng
 * độc lập được — đọc xong là dùng được ngay, không cần bấm thêm.
 *
 * Ba quy tắc khi viết câu trả lời:
 *   1. Trả lời thẳng ở câu đầu tiên, giải thích ở câu sau.
 *   2. Có số liệu cụ thể khi số liệu tồn tại; nói rõ khi không có.
 *   3. Không hứa hẹn điều không kiểm chứng được (“cam kết đỗ”, “chắc chắn 10 điểm”).
 */

export interface FaqItem {
  q: string;
  a: string;
  /** Trang mà câu hỏi này thuộc về. */
  page: PageId;
}

export const FAQS: FaqItem[] = [
  /* ---------- Trang chủ ---------- */
  {
    page: 'home',
    q: 'MATH365 là gì?',
    a: 'MATH365 là nền tảng luyện Toán ba luồng của GITA365: Toán chuyên thi vào lớp 10 chuyên, Toán vào lớp 10 mục tiêu 9–10 điểm, và Toán THPT lớp 10–12 hướng tới trên 9 điểm thi đại học. Hệ thống gồm 2.000 phiếu luyện theo chuyên đề, 7 đề thi thử trọn vẹn có lời giải và barem, 195 công thức tra cứu, cùng một lộ trình cá nhân hoá sinh ra từ chính dữ liệu làm bài của người học.',
  },
  {
    page: 'home',
    q: 'Học trên MATH365 có mất phí không?',
    a: 'Bản đang chạy là bản dùng thử đầy đủ tính năng: toàn bộ phiếu luyện, đề thi thử, lời giải và công thức đều mở. Tiến độ học được lưu ngay trên trình duyệt của bạn, không cần tạo tài khoản và không gửi dữ liệu đi đâu.',
  },
  {
    page: 'home',
    q: 'MATH365 khác gì so với việc tự mua sách luyện thi?',
    a: 'Sách cho bạn đề bài và đáp án. MATH365 cho thêm ba thứ sách không làm được: chấm ngay và chỉ ra bạn sai vì nguyên nhân gì trong năm nhóm nguyên nhân, xếp lịch ôn lại từng dạng theo mốc 1–3–7–21 ngày để chống quên, và xếp thứ tự chuyên đề cần học tiếp theo dữ liệu lỗi sai của riêng bạn thay vì theo thứ tự in trong sách.',
  },
  {
    page: 'home',
    q: 'Bắt đầu từ đâu nếu mới vào hệ thống?',
    a: 'Làm bài xếp lộ trình khoảng 20 phút để hệ thống biết bạn đang ở đâu, chọn luồng và ngày thi mục tiêu, rồi mở trang Hôm nay. Trang đó luôn trả lời đúng một câu hỏi: hôm nay làm gì, trong bao nhiêu phút.',
  },

  /* ---------- Chuyên đề ---------- */
  {
    page: 'chuyen-de',
    q: 'Một chuyên đề trên MATH365 gồm những gì?',
    a: 'Mỗi chuyên đề là một bộ sáu phiếu đi theo đúng thứ tự sư phạm: Lý thuyết nền, Dạng bài và Đọc vị đề, Kỹ năng và Phương pháp, Luyện nâng cao, Ôn thi tổng hợp, và Phiếu thi. Mỗi phiếu có một phiếu lời giải kèm bảng phân tích chuyên sâu, cộng thêm một phiếu hướng dẫn ôn chắc cho cả chuyên đề.',
  },
  {
    page: 'chuyen-de',
    q: 'Nên học chuyên đề Toán vào 10 theo thứ tự nào?',
    a: 'Thứ tự tối ưu không giống nhau giữa hai người. Hệ thống xếp hạng chuyên đề theo công thức tần suất ra đề nhân với mật độ lỗi nhân với độ mới của lỗi nhân với độ phù hợp mức độ, rồi đánh dấu nhóm 20% chuyên đề tạo ra phần lớn điểm số. Nếu chưa có dữ liệu làm bài, hãy đi theo thứ tự mặc định: Căn thức, Phương trình và hệ, Hàm số và Viète, Đường tròn, rồi mới tới Bất đẳng thức.',
  },
  {
    page: 'chuyen-de',
    q: 'Bao lâu thì học xong một chuyên đề?',
    a: 'Trung bình 6 đến 10 giờ cho một chuyên đề mức độ trung bình, chia thành 4 đến 6 buổi. Nhưng mốc dừng không phải là hết giờ mà là đạt KPI 90% ở hai phiếu cùng mức độ — đó mới là điều kiện để hệ thống mở khoá mức khó hơn.',
  },

  /* ---------- Cấu trúc đề thi ---------- */
  {
    page: 'cau-truc-de-thi',
    q: 'Cấu trúc đề thi Toán vào lớp 10 Hà Nội gồm mấy bài?',
    a: 'Đề gồm 5 bài tự luận trong 90 phút, thang điểm 10: Bài I (2,0đ) biểu thức chứa căn, Bài II (2,0đ) giải bài toán bằng cách lập phương trình hoặc hệ kèm một ý hình học thực tế, Bài III (2,5đ) hệ phương trình và tương giao parabol – đường thẳng, Bài IV (3,0đ) hình học đường tròn ba ý, Bài V (0,5đ) cực trị hoặc bất đẳng thức. Cấu trúc này đã ổn định nhiều năm, nhưng luôn phải đối chiếu với công bố mới nhất của Sở GD&ĐT Hà Nội trước mỗi mùa thi.',
  },
  {
    page: 'cau-truc-de-thi',
    q: 'Đề thi chuyên Toán KHTN có gì khác đề chuyên các trường khác?',
    a: 'Điểm khác lớn nhất là mật độ Số học và Tổ hợp rất cao. Vòng 1 là bài thi điều kiện 120 phút thiên về kỹ thuật biến đổi; vòng 2 là đề chuyên 150 phút với năm bài, trong đó bài Số học và bài Tổ hợp thường là hai bài phân định thứ hạng. Đề chuyên khối Sở Hà Nội (Ams, Chu Văn An, Nguyễn Huệ, Sơn Tây) dùng chung một đề với năm bài phủ đều năm mạch kiến thức.',
  },
  {
    page: 'cau-truc-de-thi',
    q: 'Đề thi tốt nghiệp THPT môn Toán định dạng mới tính điểm thế nào?',
    a: 'Đề có ba phần trong 90 phút. Phần I gồm 12 câu trắc nghiệm nhiều lựa chọn, mỗi câu 0,25 điểm. Phần II gồm 4 câu đúng/sai, mỗi câu 4 ý, tính điểm luỹ tiến: đúng 1 ý được 0,10, hai ý 0,25, ba ý 0,50, bốn ý 1,00. Phần III gồm 6 câu trả lời ngắn, mỗi câu 0,5 điểm. Cơ chế luỹ tiến ở Phần II khiến bước từ 3 ý lên 4 ý đáng gấp đôi bước từ 2 lên 3.',
  },
  {
    page: 'cau-truc-de-thi',
    q: 'Cần bao nhiêu điểm Toán để đỗ chuyên?',
    a: 'Ngưỡng thay đổi theo từng năm và từng trường nên không có con số cố định. Mức tham khảo từ các mùa gần đây: chuyên KHTN vòng 2 khoảng 6,5–7,5/10 để quanh ngưỡng đỗ, Chu Văn An khoảng 5,5–7,0/10, Hà Nội – Amsterdam khoảng 7,0–8,5/10. Hãy luôn đối chiếu với thông báo chính thức của từng trường trong năm bạn dự thi.',
  },

  /* ---------- Đề thi thử ---------- */
  {
    page: 'de-thi',
    q: 'Đề thi thử trên MATH365 có phải đề thi thật không?',
    a: 'Không. Đây là đề do MATH365 biên soạn theo đúng ma trận thống kê của từng kỳ thi — đủ số bài, đúng thang điểm, đúng thời gian, đúng mạch kiến thức từng phần. Đề dùng để luyện tập và tự chẩn đoán, không phải để dự đoán đề thật. Cấu trúc đề chính thức có thể thay đổi giữa các mùa thi.',
  },
  {
    page: 'de-thi',
    q: 'Làm đề thi thử xong thì làm gì tiếp?',
    a: 'Chấm ngay khi trí nhớ về bài làm còn nguyên, theo barem từng mốc 0,25 điểm. Sau đó phân loại mọi điểm mất vào năm nhóm nguyên nhân: không biết hướng, sai tính toán, thiếu trường hợp, trình bày, hết giờ. Cuối cùng đọc bảng phân tích của đúng những câu đã sai — đó là nơi chứa dấu hiệu đọc vị và bí kíp cho từng dạng.',
  },
  {
    page: 'de-thi',
    q: 'Nên làm đề thi thử với tần suất thế nào?',
    a: 'Còn trên 120 ngày thì mỗi tháng một đề là đủ, thời gian còn lại dành cho phiếu chuyên đề. Trong khoảng 45 ngày cuối, mỗi tuần ít nhất một đề trọn vẹn tính giờ. Trong 14 ngày nước rút, mỗi ngày một đề nhưng chỉ sửa những lỗi lặp lại, không học kiến thức mới.',
  },

  /* ---------- Công thức ---------- */
  {
    page: 'cong-thuc',
    q: 'Cần thuộc bao nhiêu công thức để thi Toán vào 10?',
    a: 'Danh sách tối thiểu bắt buộc thuộc gồm 163 công thức được đánh dấu sao trong sổ tay, phủ hằng đẳng thức, căn thức, phương trình bậc hai và Viète, hệ thức lượng, đường tròn, hình trụ – nón – cầu và bất đẳng thức cơ bản. Tiêu chuẩn “thuộc” ở đây là viết được ra giấy trong 5 giây kèm điều kiện áp dụng, không phải nhận ra khi nhìn thấy.',
  },
  {
    page: 'cong-thuc',
    q: 'Vì sao nhớ công thức mà vẫn làm sai?',
    a: 'Phần lớn điểm mất không nằm ở việc quên công thức mà ở ba chỗ khác: quên điều kiện áp dụng, không nhận ra tình huống nào thì dùng công thức nào, và sai ở bước trình bày. Vì thế mỗi công thức trong sổ tay đều kèm ba phần: điều kiện, dấu hiệu trong đề cho biết phải dùng, và lỗi điển hình đi kèm.',
  },

  /* ---------- Lộ trình ---------- */
  {
    page: 'lo-trinh',
    q: 'Lộ trình học được cá nhân hoá dựa trên cái gì?',
    a: 'Trên bốn yếu tố lấy từ dữ liệu thật: tần suất chuyên đề đó xuất hiện trong đề thi, mật độ lỗi sai của bạn ở chuyên đề đó, độ mới của lỗi (lỗi tuần này cấp bách hơn lỗi tháng trước), và độ phù hợp với mức độ đang mở khoá. Kết quả là một thứ tự ưu tiên có đánh dấu nhóm 20/80 và kèm nhiệm vụ cụ thể, không phải một lời khuyên chung chung.',
  },
  {
    page: 'lo-trinh',
    q: 'KPI 90% nghĩa là gì và vì sao lại là 90%?',
    a: 'KPI là tỉ lệ câu làm đúng trong một phiếu. Ngưỡng 90% được chọn vì ở mức thấp hơn, người học vẫn còn dạng bài chưa vững và việc lên mức khó hơn sẽ tạo lỗ hổng tích luỹ. Quy tắc thăng cấp: đạt KPI từ 90% ở hai phiếu cùng mức độ thì mở khoá mức tiếp theo; đạt chuẩn ở 15 nhiệm vụ của một giai đoạn với KPI trung bình năm lượt gần nhất từ 90% thì mở khoá giai đoạn mới.',
  },
  {
    page: 'lo-trinh',
    q: 'Mỗi ngày nên học Toán bao nhiêu phút?',
    a: 'Hệ thống suy ra mục tiêu phút mỗi ngày từ cam kết giờ mỗi tuần trong hồ sơ, chia cho năm ngày học chứ không phải bảy, để chừa chỗ cho ngày bận. Điều quan trọng hơn tổng số phút là tính đều đặn: chuỗi ngày học liên tiếp là chỉ số dự báo kết quả tốt hơn nhiều so với số giờ học dồn trong một buổi.',
  },

  /* ---------- Bí kíp ---------- */
  {
    page: 'bi-kip',
    q: 'Làm sao để không quên kiến thức đã học?',
    a: 'Gặp lại đúng lúc thay vì học lại từ đầu. MATH365 xếp lịch ôn lại mỗi phiếu theo bốn mốc 1 – 3 – 7 – 21 ngày, chặn đúng những thời điểm đường cong quên dốc nhất. Qua đủ bốn mốc thì dạng bài đó coi như đã thành phản xạ và chỉ cần gặp lại trong đề tổng hợp.',
  },
  {
    page: 'bi-kip',
    q: 'Học Toán bao lâu thì thấy tiến bộ?',
    a: 'Với nhịp đều đặn 5 buổi mỗi tuần, chỉ số thay đổi sớm nhất là tỉ lệ đọc vị đúng dạng bài — thường trong 2 đến 3 tuần. Tỉ lệ làm đúng ở phiếu nâng cao thường cần 6 đến 8 tuần. Nếu sau 4 tuần mà không chỉ số nào nhúc nhích, vấn đề gần như luôn nằm ở chỗ làm nhiều nhưng không sửa lỗi đã sai, chứ không phải ở lượng bài.',
  },

  /* ---------- Nguồn và phương pháp ---------- */
  {
    page: 'nguon-phuong-phap',
    q: 'Nội dung MATH365 được biên soạn thế nào?',
    a: 'Cấu trúc đề và ma trận được tổng hợp từ đề thi chính thức, đề tham khảo và thông tin tuyển sinh các năm gần đây, có ghi rõ đường dẫn nguồn chính thức trong trang Kỳ thi và Cấu trúc đề. Câu hỏi luyện tập được sinh từ các bộ sinh đề tham số hoá có hạt giống cố định, nên đáp án được tính ra chứ không chép tay. Toàn bộ 16.664 câu được kiểm tra tự động mỗi lần build.',
  },
  {
    page: 'nguon-phuong-phap',
    q: 'MATH365 có cam kết đỗ không?',
    a: 'Không, và bất kỳ nơi nào cam kết đỗ đều nên khiến bạn thận trọng. Điều hệ thống làm được là đo chính xác bạn đang ở đâu, chỉ ra khoảng cách tới yêu cầu của trường mục tiêu, và đưa ra danh sách việc cụ thể cho từng tuần. Kết quả thi phụ thuộc nhiều yếu tố nằm ngoài phạm vi một nền tảng học tập.',
  },
  {
    page: 'nguon-phuong-phap',
    q: 'Thông tin về kỳ thi trên MATH365 có được cập nhật không?',
    a: 'Có, nhưng bạn không nên chỉ dựa vào đó. Quy chế và định dạng đề có thể thay đổi giữa các mùa thi. Trước mỗi mùa, hãy đối chiếu với công bố chính thức của Bộ GD&ĐT, Sở GD&ĐT Hà Nội hoặc chính trường dự thi — mọi đường dẫn nguồn đều có sẵn trong trang Kỳ thi và Cấu trúc đề.',
  },

  /* ---------- Học viện ---------- */
  {
    page: 'hoc-vien',
    q: 'Giáo viên dùng MATH365 để dạy như thế nào?',
    a: 'Có ba giáo án chuẩn chia tới từng khối thời gian: buổi kiến thức mới 90 phút, buổi luyện nâng cao 120 phút, và buổi thi thử kèm chữa đề 150 phút. Mỗi khối ghi rõ mục đích, việc của giáo viên, việc của học sinh, dấu hiệu quan sát được cho biết đã đạt, và lỗi giáo viên hay mắc. Kèm theo là 12 nước đi sư phạm, 8 kịch bản nhận xét theo tình huống và bảng dự giờ 6 tiêu chí.',
  },
];

export const faqFor = (page: PageId) => FAQS.filter((f) => f.page === page);
