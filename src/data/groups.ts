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
];

export const groupById = (id: string) => GROUPS.find((g) => g.id === id)!;
export const groupsByTrack = (track: string) => GROUPS.filter((g) => g.track === track);
