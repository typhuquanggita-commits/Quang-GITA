import type { Group } from '@/types';

/** Năm nhóm học sinh — kết quả phân loại của bài test xếp lộ trình. */
export const GROUPS: Group[] = [
  {
    id: 'nen-tang',
    name: 'Nhóm 1 · Xây nền',
    track: 'thpt',
    band: 'Điểm khảo sát 4,0 – 6,0',
    portrait:
      'Nắm lý thuyết rời rạc, làm được bài mẫu nhưng đổi số là lúng túng. Thường mất điểm ở căn thức và hình học.',
    diagnosis: [
      'Chưa thành thạo biến đổi căn thức và phân tích đa thức thành nhân tử.',
      'Vẽ hình chưa chuẩn, chưa quen ngôn ngữ chứng minh hình học.',
      'Tốc độ làm bài chậm, thường không kịp Bài IV.',
    ],
    target: 'Đạt vững vàng 7,0 – 8,0 điểm; chắc trọn Bài I, II, III và ý 1 Bài IV.',
    weeklyHours: '8 – 10 giờ/tuần',
    priorities: [
      'Căn thức & rút gọn biểu thức (đến khi làm đúng 10/10 bài liên tiếp).',
      'Hệ phương trình và giải bài toán bằng cách lập phương trình.',
      'Tứ giác nội tiếp — chỉ cần thành thạo ý 1 và ý 2 của Bài IV.',
      'Kỹ năng trình bày theo barem để không mất điểm hình thức.',
    ],
    redFlags: [
      'Học thêm dạng mới khi dạng cũ chưa chắc — đây là lỗi phổ biến nhất của nhóm này.',
      'Luyện đề chuyên hoặc bài quá khó, gây mất tự tin.',
    ],
    color: '#0891b2',
  },
  {
    id: 'vung-chac',
    name: 'Nhóm 2 · Vững chắc',
    track: 'thpt',
    band: 'Điểm khảo sát 6,0 – 7,5',
    portrait:
      'Làm tốt các dạng quen thuộc, điểm thi thử dao động 7,5 – 8,5. Rào cản là ý 3 Bài IV và tốc độ.',
    diagnosis: [
      'Ba bài đầu làm được nhưng còn sai vặt (thiếu điều kiện, tính nhầm).',
      'Hình học dừng ở ý 2; ý 3 chưa có phương pháp tiếp cận.',
      'Chưa có chiến thuật phân bổ thời gian rõ ràng.',
    ],
    target: 'Ổn định 8,5 – 9,0 điểm; hướng tới 9,0+ trong 8 tuần cuối.',
    weeklyHours: '10 – 12 giờ/tuần',
    priorities: [
      'Diệt lỗi sai vặt: lập sổ tay lỗi, mỗi lỗi phải làm lại 3 bài cùng dạng.',
      'Ý 3 Bài IV: học kỹ thuật dự đoán điểm cố định và các mô hình chuẩn.',
      'Luyện đề tính giờ 1 lần/tuần, chấm theo barem thật.',
      'Làm quen Bài V ở mức bất đẳng thức cơ bản.',
    ],
    redFlags: ['Chỉ luyện dạng mình thích, né hình học.', 'Làm đề mà không chấm và không phân tích lỗi.'],
    color: '#0f766e',
  },
  {
    id: 'but-pha',
    name: 'Nhóm 3 · Bứt phá 9–10',
    track: 'thpt',
    band: 'Điểm khảo sát 7,5 – 10',
    portrait:
      'Đã ổn định 8,5 – 9,0. Mục tiêu là biến 9 thành 9,5–10 — cuộc chiến của 0,25 điểm.',
    diagnosis: [
      'Kiến thức đủ, vấn đề là độ chính xác tuyệt đối và ý cuối của đề.',
      'Chưa xử lý gọn Bài V (bất đẳng thức 0,5 điểm).',
      'Ý 3 Bài IV làm được nhưng chậm, dễ thiếu thời gian.',
    ],
    target: '9,5 – 10 điểm. Sai số cho phép: tối đa 1 ý nhỏ trong toàn bài.',
    weeklyHours: '12 – 15 giờ/tuần',
    priorities: [
      'Chuyên đề bất đẳng thức & cực trị — mục tiêu làm trọn Bài V trong 8 phút.',
      'Ngân hàng ý 3 Bài IV: điểm cố định, quỹ tích, cực trị hình học (ít nhất 40 bài).',
      'Luyện đề tính giờ 2 lần/tuần, mô phỏng đúng điều kiện phòng thi.',
      'Quy trình soát bài 5 phút cuối: checklist ĐKXĐ – đối chiếu – kết luận.',
      'Bổ sung một số bài chuyên nhẹ để nâng trần tư duy.',
    ],
    redFlags: [
      'Chủ quan với Bài I – II vì “dễ” rồi mất điểm oan (đây là nguyên nhân mất điểm số 1 của nhóm này).',
      'Luyện đề quá nhiều mà không phân tích lỗi.',
    ],
    color: '#4f46e5',
  },
  {
    id: 'chuyen-sau',
    name: 'Nhóm 4 · Chuyên sâu',
    track: 'chuyen',
    band: 'Đã có nền vào 10 vững, mới bước vào ôn chuyên',
    portrait:
      'Điểm đề thường 9+, nhưng gặp đề chuyên thì mới làm được 3–4/10. Chưa quen số học và tổ hợp.',
    diagnosis: [
      'Số học gần như chưa học có hệ thống.',
      'Tổ hợp chưa có công cụ (Dirichlet, bất biến).',
      'Hình học mới dừng ở mức đề vào 10, chưa biết phương tích.',
      'Trình bày lời giải chứng minh còn lỏng.',
    ],
    target:
      'Vượt vòng 1 KHTN (7,0+/10) và đạt 5,5 – 7,0 đề chuyên — đủ để đỗ Chu Văn An và có cửa Ams/KHTN.',
    weeklyHours: '14 – 18 giờ/tuần',
    priorities: [
      'Số học từ đầu: chia hết → đồng dư → số chính phương → nghiệm nguyên (chiếm 30% quỹ thời gian).',
      'Tổ hợp nhập môn: Dirichlet và bất biến, mỗi tuần 5 bài.',
      'Hình học: bổ sung phương tích, các mô hình chuẩn, kỹ thuật chứng minh thẳng hàng.',
      'Phương trình vô tỉ & hệ nâng cao — bài mở đầu đề chuyên, phải ăn trọn.',
      'Giữ nhịp đề chung: 1 đề vào 10 mỗi tuần để không mất phong độ (điểm 3 môn chung vẫn chiếm tỉ trọng lớn khi xét chuyên của Sở).',
    ],
    redFlags: [
      'Bỏ bê đề chung vì mải ôn chuyên — trượt vì môn chung là kịch bản rất phổ biến.',
      'Đọc lời giải mà không tự làm lại — ảo tưởng đã hiểu.',
      'Học dàn trải cả 5 mạch cùng lúc thay vì dứt điểm từng mạch.',
    ],
    color: '#b45309',
  },
  {
    id: 'dinh-cao',
    name: 'Nhóm 5 · Đỉnh cao',
    track: 'chuyen',
    band: 'Đã ôn chuyên ≥ 1 năm, từng đạt giải HSG',
    portrait:
      'Làm được 6–8/10 đề chuyên. Mục tiêu là top đầu KHTN / Ams, cần chinh phục bài chốt.',
    diagnosis: [
      'Ba bài đầu chắc, nhưng bài tổ hợp và ý cuối bài hình còn bỏ ngỏ.',
      'Thiếu tốc độ trong 150 phút, hay thiếu thời gian cho bài cuối.',
      'Trình bày đôi khi tắt bước, mất điểm thành phần.',
    ],
    target: 'Đề chuyên 8,0+/10 — đủ an toàn cho chuyên Toán KHTN và Ams.',
    weeklyHours: '18 – 22 giờ/tuần',
    priorities: [
      'Tổ hợp nâng cao: bất biến, cực hạn, đếm bằng hai cách, trò chơi (mỗi tuần 1 buổi chuyên sâu).',
      'Hình học: tỉ số, đồng quy – thẳng hàng, phương tích nâng cao, bổ đề hay dùng.',
      'Bất đẳng thức: SOS, dồn biến, chọn điểm rơi không đối xứng.',
      'Luyện đề chuyên tính giờ 2 lần/tuần, chấm chéo và mổ xẻ từng bước trình bày.',
      'Nghiên cứu đề các năm của đúng trường mục tiêu để bắt đúng “gu” ra đề.',
    ],
    redFlags: [
      'Chỉ làm bài khó, bỏ qua luyện tốc độ và độ chính xác ở bài dễ.',
      'Không luyện trình bày ⇒ mất 1–2 điểm dù nghĩ ra hướng giải.',
    ],
    color: '#be123c',
  },
  {
    id: 'qg-nen-tang',
    name: 'Nhóm 6 · Nền tảng THPT',
    track: 'thpt-qg',
    band: 'Điểm khảo sát 4,0 – 6,5 · thường ở lớp 10 hoặc đầu lớp 11',
    portrait:
      'Đang nợ kiến thức của những chương trước. Học chương mới thì hiểu, nhưng bài tổng hợp là mất phương hướng.',
    diagnosis: [
      'Kỹ năng biến đổi đại số và xét dấu chưa thành thạo — kéo theo sai ở mọi chương sau.',
      'Chưa có thói quen học đều; chỉ ôn dồn trước kiểm tra.',
      'Điểm hệ số 1 thấp làm tụt điểm tổng kết dù bài lớn làm được.',
    ],
    target: 'Điểm tổng kết môn Toán từ 8,5 trở lên và không còn nợ chương nào.',
    weeklyHours: '6 – 8 giờ/tuần',
    priorities: [
      'Vá lỗ hổng theo thứ tự: biến đổi đại số → xét dấu tam thức → hàm số.',
      'Xây thói quen “ôn trong 48 giờ” sau mỗi buổi học trên lớp.',
      'Làm chắc toàn bộ bài tập giáo viên đã chữa trước mỗi bài kiểm tra.',
      'Chỉ luyện Level 1–2 cho tới khi KPI ổn định ở 90%.',
    ],
    redFlags: [
      'Nhảy sang luyện đề thi thử khi nền tảng chưa xong — vừa mất thời gian vừa mất tự tin.',
      'Học theo mẹo giải nhanh mà không hiểu bản chất.',
    ],
    color: '#0891b2',
  },
  {
    id: 'qg-vung-chac',
    name: 'Nhóm 7 · Vững chắc THPT',
    track: 'thpt-qg',
    band: 'Điểm khảo sát 6,5 – 8,0 · thường ở lớp 11 hoặc đầu lớp 12',
    portrait:
      'Điểm tổng kết 8,0 – 8,8; thi thử quanh 7,5 – 8,5. Rào cản là nhóm câu vận dụng cao và tốc độ.',
    diagnosis: [
      'Làm tốt các dạng quen nhưng lúng túng khi đề đổi cách hỏi.',
      'Phần II (đúng/sai) thường chỉ đúng 2–3 ý mỗi câu — mất điểm rất nhanh.',
      'Chưa kiểm soát được thời gian cho 90 phút với ba phần.',
    ],
    target: 'Tổng kết 9,0+ và điểm thi thử ổn định 8,5 – 9,0.',
    weeklyHours: '8 – 12 giờ/tuần',
    priorities: [
      'Luyện chuyên sâu Phần II: mục tiêu từ 2–3 ý lên đủ 4 ý mỗi câu.',
      'Ứng dụng đạo hàm và nguyên hàm – tích phân: hai mạch chiếm tỉ trọng lớn nhất.',
      'Mỗi tuần một đề tính giờ theo đúng định dạng ba phần.',
      'Lập sổ tay lỗi sai và làm lại đúng dạng đã sai sau 3 ngày.',
    ],
    redFlags: [
      'Chỉ luyện trắc nghiệm Phần I vì làm nhanh có cảm giác tiến bộ.',
      'Bỏ qua thống kê – xác suất vì nghĩ là phần phụ (thực tế chiếm tỉ trọng đáng kể).',
    ],
    color: '#1d4ed8',
  },
  {
    id: 'qg-toi-uu',
    name: 'Nhóm 8 · Tối ưu 9+ & Top 1',
    track: 'thpt-qg',
    band: 'Điểm khảo sát 8,0 – 10 · mục tiêu 9+ thi tốt nghiệp và Top 1 tổng kết',
    portrait:
      'Kiến thức đã đủ. Cuộc chiến còn lại là độ chính xác tuyệt đối và nhóm câu vận dụng cao.',
    diagnosis: [
      'Vẫn mất 0,5 – 1,0 điểm mỗi đề vì lỗi tính toán ở câu dễ.',
      'Phần III (trả lời ngắn) rủi ro cao vì không có phương án để loại trừ.',
      'Câu vận dụng cao làm được nhưng tốn quá nhiều thời gian.',
    ],
    target: 'Điểm thi 9,0 – 10 và đứng đầu lớp/khối về điểm tổng kết môn Toán.',
    weeklyHours: '12 – 16 giờ/tuần',
    priorities: [
      'Ngân hàng câu vận dụng cao: tham số, cực trị hàm hợp, tích phân nâng cao, cực trị Oxyz.',
      'Quy trình kiểm tra chéo cho Phần III: luôn tính lại bằng cách thứ hai trước khi điền.',
      'Hai đề tính giờ mỗi tuần, chấm chi tiết theo từng phần.',
      'Nếu xét tuyển bằng ĐGNL/ĐGTD, bổ sung luyện tốc độ riêng cho hai kỳ thi đó.',
      'Duy trì điểm hệ số 1 tuyệt đối để giữ vị trí Top 1 tổng kết.',
    ],
    redFlags: [
      'Chủ quan với câu dễ — đây là nguyên nhân mất điểm số một của nhóm này.',
      'Chỉ săn câu khó mà không luyện độ chính xác và tốc độ ở câu trung bình.',
    ],
    color: '#be123c',
  },
  {
    id: 'l6-lam-quen',
    name: 'Nhóm 9 · Làm quen đề vào 6',
    track: 'lop6',
    band: 'Học sinh lớp 4 – đầu lớp 5, mới bắt đầu ôn',
    portrait:
      'Học tốt trên lớp nhưng gặp đề đánh giá năng lực thì bỡ ngỡ: câu hỏi xoay, dữ kiện gài trong lời văn, thời gian chặt.',
    diagnosis: [
      'Tính toán đúng nhưng đọc đề chậm và hay bỏ sót dữ kiện.',
      'Chưa quen dạng toán tính ngược và toán chuyển động.',
      'Gặp câu suy luận logic là bỏ trống vì không biết bắt đầu từ đâu.',
    ],
    target: 'Làm đúng trọn phần câu hỏi cơ bản của đề và không còn sợ dạng có lời văn dài.',
    weeklyHours: '3 – 4 giờ/tuần',
    priorities: [
      'Bốn phép tính với phân số và số thập phân — đến mức không cần nháp cho phép tính đơn giản.',
      'Đọc đề bằng bút chì: gạch chân dữ kiện, khoanh tròn câu hỏi.',
      'Toán tính ngược và sơ đồ đoạn thẳng, hai công cụ giải được rất nhiều dạng.',
      'Mỗi tuần một đề ngắn 20 phút để làm quen áp lực thời gian.',
    ],
    redFlags: [
      'Học trước chương trình lớp 6 – 7 thay vì làm chắc lớp 4 – 5. Đề vào 6 không hỏi kiến thức cấp hai.',
      'Ép luyện đề quá sớm khiến trẻ sợ môn Toán — ở tuổi này mất hứng thú là mất tất cả.',
    ],
    color: '#0d9488',
  },
  {
    id: 'l6-vung-chac',
    name: 'Nhóm 10 · Vững chắc vào 6',
    track: 'lop6',
    band: 'Học sinh lớp 5, đã ôn được một thời gian',
    portrait:
      'Làm được phần lớn câu cơ bản, mất điểm ở câu suy luận và ở những câu dễ nhưng đọc vội.',
    diagnosis: [
      'Sai ở câu dễ nhiều hơn sai ở câu khó — dấu hiệu của đọc đề vội.',
      'Toán chuyển động ngược chiều, cùng chiều còn lẫn công thức.',
      'Chưa biết cách bỏ qua câu khó để quay lại sau.',
    ],
    target: 'Làm đúng đều toàn đề, chỉ còn cân nhắc ở một đến hai câu khó nhất.',
    weeklyHours: '4 – 6 giờ/tuần',
    priorities: [
      'Sổ tay lỗi: mỗi câu sai phải ghi lại nguyên nhân bằng chính lời của con.',
      'Ba dạng chuyển động chuẩn (gặp nhau, đuổi kịp, dòng nước) đến mức tự vẽ được sơ đồ.',
      'Tỉ số phần trăm trong ngữ cảnh mua bán, tăng giảm giá.',
      'Luyện đề tính giờ 45 phút, mỗi tuần một lần.',
    ],
    redFlags: [
      'Chạy theo số lượng đề mà không chữa kỹ — chữa một đề tốt hơn làm ba đề qua loa.',
      'Bỏ qua câu hình học vì nghĩ “ít điểm”, trong khi đây là phần dễ lấy điểm nhất.',
    ],
    color: '#0284c7',
  },
  {
    id: 'l6-but-pha',
    name: 'Nhóm 11 · Bứt phá vào 6',
    track: 'lop6',
    band: 'Học sinh lớp 5 nhắm trường có tỉ lệ chọi cao',
    portrait:
      'Nền tảng đã chắc. Khoảng cách còn lại nằm ở nhóm câu suy luận, dãy số quy luật và tốc độ xử lý.',
    diagnosis: [
      'Câu khó làm được nhưng tốn quá nhiều thời gian, ảnh hưởng phần còn lại.',
      'Chưa có bộ mô hình sẵn cho dạng suy luận bảng đúng/sai.',
      'Đôi khi tính đúng nhưng trả lời sai thứ đề hỏi.',
    ],
    target: 'Làm gần trọn đề trong thời gian quy định và giữ được sự bình tĩnh ở phòng thi.',
    weeklyHours: '6 – 8 giờ/tuần',
    priorities: [
      'Kho dạng suy luận: bảng đúng/sai, cân đĩa, chia nhóm, dãy số quy luật.',
      'Kỹ thuật ước lượng để loại nhanh phương án ở phần trắc nghiệm.',
      'Quy trình soát bài 5 phút cuối: đọc lại câu hỏi, không đọc lại bài giải.',
      'Đề tính giờ hai lần mỗi tuần, luân phiên hai định dạng trường khác nhau.',
    ],
    redFlags: [
      'Học kiến thức cấp hai để “đi tắt” — đề vào 6 không cho điểm cách giải ngoài chương trình, và dễ sai.',
      'Đặt kỳ vọng đỗ như một điều chắc chắn: tỉ lệ chọi ở nhóm trường này rất cao, cần chuẩn bị cả phương án dự phòng.',
    ],
    color: '#7c3aed',
  },
  {
    id: 'ck-vao-nhip',
    name: 'Nhóm 12 · Vào nhịp',
    track: 'chinh-khoa',
    band: 'Điểm kiểm tra hiện tại 5,0 – 7,0',
    portrait:
      'Hiểu bài trên lớp nhưng về nhà làm lại thì tắc. Điểm dao động mạnh giữa các bài kiểm tra vì phụ thuộc vào đề dễ hay khó.',
    diagnosis: [
      'Không ôn lại trong vòng 48 giờ sau buổi học nên kiến thức phai trước bài kiểm tra.',
      'Mất điểm nhiều ở câu nhận biết và thông hiểu vì lỗi tính toán, không phải vì không hiểu.',
      'Chưa có thói quen làm hết bài tập sách giáo khoa trước khi làm sách tham khảo.',
    ],
    target: 'Đưa điểm kiểm tra lên ổn định 8,0+ và không còn bài nào dưới 7,0.',
    weeklyHours: '5 – 7 giờ/tuần',
    priorities: [
      'Thói quen ôn 48 giờ: 20 phút sau mỗi buổi học, không thương lượng.',
      'Làm trọn bài tập sách giáo khoa của chuyên đề đang học trước khi động vào sách nâng cao.',
      'Sổ tay lỗi tính toán, mỗi lỗi phải làm lại 3 bài cùng dạng.',
      'Điểm hệ số 1: chuẩn bị bài trước mỗi buổi để luôn trả lời được khi bị gọi.',
    ],
    redFlags: [
      'Học dồn trước ngày kiểm tra. Đây là nguyên nhân số một khiến điểm dao động.',
      'Nhảy sang sách nâng cao khi bài cơ bản còn sai — vừa mất thời gian vừa mất tự tin.',
    ],
    color: '#0d9488',
  },
  {
    id: 'ck-gioi',
    name: 'Nhóm 13 · Học sinh giỏi',
    track: 'chinh-khoa',
    band: 'Điểm kiểm tra hiện tại 7,0 – 8,5',
    portrait:
      'Nắm chắc chương trình, làm tốt câu nhận biết và thông hiểu. Rào cản là nhóm câu vận dụng ở cuối đề và tốc độ.',
    diagnosis: [
      'Ba phần đầu đề kiểm tra làm sạch, nhưng hai câu cuối thường bỏ dở.',
      'Trình bày còn tắt, bị trừ điểm dù hướng làm đúng.',
      'Chưa phân bổ thời gian, hay hết giờ ở câu cuối.',
    ],
    target: 'Ổn định 9,0+ ở mọi bài kiểm tra định kỳ.',
    weeklyHours: '7 – 10 giờ/tuần',
    priorities: [
      'Nhóm câu vận dụng: mỗi tuần 5 bài đúng dạng thường ra ở đề của trường.',
      'Trình bày theo barem: tự chấm bài của mình theo thang điểm trước khi nộp.',
      'Luyện đề đúng ma trận giữa kỳ và cuối kỳ, tính giờ.',
      'Ôn ngắt quãng 1–3–7–21 cho các chuyên đề đã học từ đầu năm.',
    ],
    redFlags: [
      'Chỉ ôn chuyên đề đang học mà bỏ quên chuyên đề đầu năm — đề cuối kỳ hỏi cả hai.',
      'Bỏ luôn câu vận dụng cao vì nghĩ "chỉ 0,5 điểm" — đó chính là 0,5 điểm tách 9,0 khỏi 9,5.',
    ],
    color: '#1B4F9C',
  },
  {
    id: 'ck-top1',
    name: 'Nhóm 14 · Top 1 lớp',
    track: 'chinh-khoa',
    band: 'Điểm kiểm tra hiện tại 8,5 – 10',
    portrait:
      'Kiến thức đã đủ. Cuộc chiến còn lại là độ chính xác tuyệt đối, tốc độ, và nhóm câu vận dụng cao ở cuối đề.',
    diagnosis: [
      'Vẫn mất 0,5 – 1,0 điểm mỗi bài vì lỗi vặt ở câu dễ.',
      'Câu vận dụng cao làm được nhưng tốn quá nhiều thời gian.',
      'Điểm hệ số 1 đôi khi bị bỏ lơi vì "đằng nào cũng cao".',
    ],
    target: 'Điểm tổng kết môn Toán cao nhất lớp, và mọi bài kiểm tra đều từ 9,0 trở lên.',
    weeklyHours: '10 – 14 giờ/tuần',
    priorities: [
      'Quy trình soát bài 5 phút cuối: đọc lại câu hỏi, không đọc lại lời giải.',
      'Ngân hàng câu vận dụng cao theo từng chuyên đề của khối lớp.',
      'Giữ điểm hệ số 1 tuyệt đối — đây là phần dễ nhất nhưng cũng hay bị buông nhất.',
      'Nếu có định thi đánh giá năng lực (HSA, TSA) thì bổ sung luyện tốc độ riêng từ học kỳ II.',
    ],
    redFlags: [
      'Chủ quan với câu dễ. Ở nhóm này, gần như toàn bộ điểm mất đi đến từ câu dễ chứ không phải câu khó.',
      'Chạy trước chương trình quá xa mà bỏ bê bài trên lớp — điểm tổng kết tính theo bài trên lớp.',
    ],
    color: '#E01B24',
  },
];

export const groupById = (id: string) => GROUPS.find((g) => g.id === id)!;
export const groupsByTrack = (track: string) => GROUPS.filter((g) => g.track === track);
