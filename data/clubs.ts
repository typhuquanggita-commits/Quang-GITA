/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {Club, Checkpoint} from '../types';

/* ==========================================================================
   HỆ THỐNG CLUB — 7 câu lạc bộ, mở dần theo trình độ
   Vì sao bắt buộc: Thuyết tự quyết cần đủ 3 nhu cầu — Tự chủ, Năng lực,
   KẾT NỐI. Người tự học một mình luôn thiếu vế thứ ba, và đó là lý do
   số một khiến họ bỏ cuộc ở tháng thứ 4.
   ========================================================================== */

export const CLUBS: Club[] = [
  {
    id: 'c-accountability',
    name: 'CLB Chuỗi Ngày — Cam kết & Trách nhiệm',
    frequency: 'Điểm danh mỗi ngày (nhắn tin) + họp 30 phút tối thứ Tư',
    size: '4–6 người',
    level: ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1'],
    format: [
      'Mỗi sáng: nhắn vào nhóm đúng một dòng — "Xong buổi sáng ✅ 15 phút shadowing".',
      'Tối thứ Tư: mỗi người 5 phút báo cáo — làm được gì, vướng gì, tuần tới làm gì.',
      'Bảng chuỗi ngày công khai của cả nhóm, cập nhật hằng tuần.',
      'Ai đứt chuỗi 2 ngày sẽ được gọi điện — không phải để trách, mà để hỏi "cần giúp gì".',
    ],
    rules: [
      'Điểm danh trước 9:00 sáng. Không điểm danh coi như chưa học.',
      'Không so sánh điểm số giữa các thành viên. Chỉ so mỗi người với chính họ.',
      'Vắng buổi họp phải báo trước 24 giờ.',
      'Nhóm giải tán nếu còn dưới 3 người hoạt động — hãy tuyển bù ngay.',
    ],
    outcome: 'Chuỗi ngày ≥ 85/90 mỗi quý. Đây là club quan trọng nhất trong 6 tháng đầu.',
    hostScript:
      'Mở đầu: "Tuần này ai giữ được chuỗi dài nhất?" → Mỗi người 5 phút: một thắng lợi, một khó khăn, một cam kết cho tuần tới → Kết: cả nhóm đọc to câu bản sắc.',
  },
  {
    id: 'c-shadow',
    name: 'CLB Shadowing — Luyện âm cùng nhau',
    frequency: '2 buổi/tuần, 45 phút (T2 & T5, 20:00)',
    size: '3–5 người',
    level: ['A1', 'A2', 'B1', 'B2'],
    format: [
      'Cả nhóm dùng CHUNG một đoạn 90 giây trong suốt tuần.',
      '10 phút: cùng nghe và đánh dấu chỗ nối âm, trọng âm câu.',
      '20 phút: từng người shadowing, những người khác nghe và ghi nhận xét.',
      '10 phút: mỗi người nhận đúng 2 góp ý — một điểm mạnh, một điểm cần sửa.',
      '5 phút: chốt đoạn cho buổi sau.',
    ],
    rules: [
      'Bắt buộc bật camera — nhìn được khẩu hình là một nửa giá trị của buổi học.',
      'Góp ý phải CỤ THỂ: "âm /s/ cuối chưa bật ở từ works", không nói "phát âm tạm ổn".',
      'Không ai được ngồi im cả buổi. Mỗi người shadowing ít nhất 1 lần.',
      'Ghi âm buổi học để tự nghe lại.',
    ],
    outcome: 'Sau 12 tuần: bám kịp 80% đoạn tốc độ tự nhiên, độ chính xác chép chính tả ≥ 90%.',
    hostScript:
      'Mở: bật đoạn, cả nhóm nghe 2 lần im lặng → Cùng đánh dấu transcript → Lần lượt shadowing → Vòng góp ý → Chốt đoạn tuần sau.',
  },
  {
    id: 'c-speaking',
    name: 'CLB Nói — Vòng tròn giao tiếp',
    frequency: '2 buổi/tuần, 60 phút (T4 & T6, 20:00)',
    size: '4–8 người',
    level: ['A2', 'B1', 'B2', 'C1'],
    format: [
      '10 phút khởi động: mỗi người kể một điều thú vị trong ngày (60 giây).',
      '25 phút chủ đề: chia cặp xoay vòng, mỗi cặp 5 phút, đổi bạn 5 lần.',
      '15 phút thử thách: bốc thăm cue card, nói 2 phút trước cả nhóm.',
      '10 phút thu hoạch: mỗi người chia sẻ 3 cụm hay học được từ người khác.',
    ],
    rules: [
      'TIẾNG ANH 100%. Nói một câu tiếng Việt là bị nhắc; ba lần thì mất lượt.',
      'Không ai được nói quá 40% thời lượng phần của mình.',
      'Mỗi buổi phải đưa và nhận đúng 1 góp ý cụ thể.',
      'Người sửa lỗi phải sửa một cách tử tế — chỉ ra cái đúng, không chỉ chê cái sai.',
    ],
    outcome: 'Sau 12 tuần: nói liên tục 3 phút, tốc độ ≥ 130 từ/phút, dưới 3 từ đệm/phút.',
    hostScript:
      'Mở: khởi động vòng tròn 60 giây/người → Chia cặp xoay vòng theo chuông → Thử thách cue card → Vòng thu hoạch cụm hay → Chốt chủ đề buổi sau.',
  },
  {
    id: 'c-book',
    name: 'CLB Sách — Đọc mở rộng cùng nhau',
    frequency: '1 buổi/tuần, 60 phút (T7, 15:00)',
    size: '4–8 người',
    level: ['A2', 'B1', 'B2', 'C1'],
    format: [
      'Cả nhóm đọc cùng một cuốn, mỗi tuần một số chương định trước.',
      '15 phút: mỗi người kể lại một cảnh yêu thích trong 90 giây.',
      '25 phút: thảo luận theo 5 câu hỏi mở do người dẫn chuẩn bị.',
      '15 phút: cùng chia sẻ 10 cụm hay nhất nhặt được trong tuần.',
      '5 phút: chốt số chương cho tuần sau.',
    ],
    rules: [
      'Chưa đọc xong vẫn phải đến — nghe cũng có giá trị, và vắng mặt là bắt đầu bỏ.',
      'Cấm tiết lộ trước nội dung các chương sau.',
      'Mỗi người phải đóng góp ít nhất 2 cụm vào kho chung của nhóm.',
      'Người dẫn xoay vòng mỗi tuần một người.',
    ],
    outcome: '12 cuốn sách mỗi năm, khoảng 500.000 từ đã đọc, và một thư viện cụm từ chung của cả nhóm.',
    hostScript:
      'Mở: "Cảnh nào tuần này khiến bạn dừng lại lâu nhất?" → Vòng kể lại → 5 câu hỏi thảo luận → Chia sẻ cụm hay → Chốt chương tuần sau.',
  },
  {
    id: 'c-writing',
    name: 'CLB Viết — Chấm chéo & Sổ Lỗi chung',
    frequency: '1 buổi/tuần, 60 phút (T4, 20:00)',
    size: '3–5 người (nhỏ để chấm kỹ)',
    level: ['B1', 'B2', 'C1'],
    format: [
      'Trước buổi: mỗi người nộp 1 bài viết lên thư mục chung, hạn 24 giờ trước.',
      '20 phút: chấm chéo theo đúng 4 tiêu chí IELTS, bài của người bên phải.',
      '25 phút: mỗi người nhận phản hồi — 2 điểm mạnh, 2 điểm cần sửa, 1 đề xuất cụ thể.',
      '10 phút: tổng hợp lỗi chung của cả nhóm vào Sổ Lỗi Chung.',
      '5 phút: chốt đề bài cho tuần sau.',
    ],
    rules: [
      'Nộp muộn thì không được chấm tuần đó — quy tắc cứng, không ngoại lệ.',
      'Phản hồi phải dẫn chiếu tiêu chí: "Task Response chưa đủ vì bạn bỏ phần thứ hai của câu hỏi".',
      'Bắt buộc nêu điểm mạnh TRƯỚC điểm yếu.',
      'Sổ Lỗi Chung là tài sản của nhóm — mọi người đều đọc mỗi tuần.',
    ],
    outcome: 'Sau 12 tuần: tự chấm sai lệch ≤ 0,5 band so với giáo viên, viết Task 2 ổn định Band 7.0+.',
    hostScript:
      'Mở: đọc 1 lỗi phổ biến nhất tuần trước → Chấm chéo im lặng 20 phút → Vòng phản hồi từng người → Cập nhật Sổ Lỗi Chung → Chốt đề tuần sau.',
  },
  {
    id: 'c-debate',
    name: 'CLB Tranh biện — Rèn tư duy bằng tiếng Anh',
    frequency: '1 buổi/tuần, 60 phút (T6, 20:00)',
    size: '4–6 người',
    level: ['B2', 'C1'],
    format: [
      'Nhận định được công bố trước 48 giờ để cả nhóm chuẩn bị CẢ HAI phía.',
      'BỐC THĂM lập trường ngay tại buổi — không ai được chọn.',
      '10 phút chuẩn bị theo nhóm nhỏ.',
      '30 phút tranh biện: mở đầu 3 phút → phản biện 2 phút → chốt 2 phút mỗi bên.',
      '20 phút phản tư: điều gì thuyết phục, điều gì không, và vì sao.',
    ],
    rules: [
      'Không được chọn phía. Bốc thăm là bốc thăm — đây chính là bài luyện.',
      'Mọi luận điểm phải có ít nhất một bằng chứng cụ thể.',
      'Cấm công kích cá nhân. Tấn công lập luận, không tấn công người.',
      'Ghi lại 5 cụm hay nhất mà phía đối diện dùng.',
    ],
    outcome: 'Sau 12 tuần: bảo vệ thuyết phục cả hai phía của bất kỳ đề IELTS nào; Speaking Part 3 đạt 7.5+.',
    hostScript:
      'Mở: đọc nhận định → Bốc thăm phía → 10 phút chuẩn bị → Tranh biện theo chuông → Vòng phản tư → Công bố nhận định tuần sau.',
  },
  {
    id: 'c-mock',
    name: 'CLB Thi Thử — Mô phỏng phòng thi',
    frequency: '1 buổi/tuần, 90 phút (T4, 20:00) + thi thử toàn phần sáng T7',
    size: '4–6 người',
    level: ['B2', 'C1'],
    format: [
      'Sáng T7: cả nhóm cùng làm thi thử toàn phần, cùng khung giờ, cùng đề.',
      'Tối T4: một người đóng vai giám khảo Speaking, một người thí sinh, còn lại chấm theo tiêu chí.',
      '30 phút: chấm chéo bài Writing của thi thử tuần trước.',
      '30 phút: mổ xẻ lỗi chiến thuật — không phải lỗi ngôn ngữ.',
      '15 phút: mỗi người chốt 1 điều sẽ làm khác trong bài thi thử tới.',
    ],
    rules: [
      'Thi thử phải đúng điều kiện thật: điện thoại ở phòng khác, không tạm dừng.',
      'Người đóng giám khảo phải chấm nghiêm — chấm dễ là hại bạn mình.',
      'Mọi lỗi chiến thuật vào Sổ Lỗi Chung.',
      'Không ai được bỏ buổi thi thử trừ khi ốm.',
    ],
    outcome: 'Sau 12 tuần: điểm ổn định, dao động ≤ 0,5 band; quen áp lực 3 tiếng liên tục.',
    hostScript:
      'Mở: công bố điểm thi thử của cả nhóm (tự nguyện) → Mô phỏng Speaking có chấm → Chấm chéo Writing → Mổ xẻ lỗi chiến thuật → Chốt đề tuần sau.',
  },
];

/* ==========================================================================
   MỐC KIỂM ĐỊNH — 12 cổng, mỗi quý một cổng
   ========================================================================== */

export const CHECKPOINTS: Checkpoint[] = [
  {
    id: 'cp-3',
    at: 'Cuối tháng 3',
    name: 'Cổng Nền Âm',
    test: 'Đọc phiên âm 20 từ ngẫu nhiên + nghe hiểu hội thoại A1 + nói 60 giây về bản thân',
    passBand: 'A1 — chuỗi ngày ≥ 85/90',
    actions: {
      ifPass: 'Sang Y1Q2. Bắt đầu shadowing và chép chính tả — hai kỹ thuật đòn bẩy cao nhất.',
      ifFail: 'Lặp 4 tuần. Ưu tiên tuyệt đối cho bảng âm IPA và chuỗi ngày, chưa vội thêm từ vựng.',
    },
  },
  {
    id: 'cp-6',
    at: 'Cuối tháng 6',
    name: 'Cổng Bắt Âm',
    test: 'Shadowing 90 giây tốc độ gốc + chép chính tả A2 đạt ≥ 90% + đã đọc 8 Graded Reader',
    passBand: 'A2 — độ chính xác chép chính tả ≥ 90%',
    actions: {
      ifPass: 'Sang Y1Q3. Đặt lịch buổi nói 1-1 đầu tiên NGAY trong tuần này.',
      ifFail: 'Lặp 4 tuần, tăng gấp đôi thời lượng chép chính tả. Đây là nền của cả Listening lẫn Speaking.',
    },
  },
  {
    id: 'cp-9',
    at: 'Cuối tháng 9',
    name: 'Cổng Bật Tiếng',
    test: '≥ 12 buổi nói 1-1 + nói 2 phút chủ đề quen + viết 150 từ trong 15 phút + Sổ Lỗi ≥ 60 mục',
    passBand: 'A2+ / IELTS ~4.5',
    actions: {
      ifPass: 'Sang Y1Q4. Chuyển hoàn toàn sang từ điển Anh–Anh.',
      ifFail: 'Lặp 4 tuần. Nếu chưa nói buổi nào với người thật, đó chính là điều cần sửa trước tiên.',
    },
  },
  {
    id: 'cp-12',
    at: 'Cuối tháng 12',
    name: 'Cổng Độc Lập — Kiểm định năm 1',
    test: 'Bài kiểm tra CEFR chuẩn hoá + đọc trọn 1 tiểu thuyết nguyên bản + 400 collocation tự nhặt',
    passBand: 'B1 xác nhận / IELTS ~5.0',
    actions: {
      ifPass: 'Sang năm 2. Nâng thời lượng lên 90–105 phút/ngày.',
      ifFail: 'Lặp 8 tuần. KHÔNG được sang năm 2 khi chưa vững B1 — đây là lỗi khiến người học kẹt ở Band 6.0 nhiều năm.',
    },
  },
  {
    id: 'cp-15',
    at: 'Cuối tháng 15',
    name: 'Cổng Dòng Chảy',
    test: 'Kỹ thuật 4/3/2 + tốc độ nói ≥ 120 từ/phút + thi thử IELTS đầu tiên',
    passBand: 'IELTS ≥ 5.5',
    actions: {
      ifPass: 'Sang Y2Q2. Bắt đầu chu kỳ nạp hẹp 12 chủ đề.',
      ifFail: 'Lặp 4 tuần, tăng mật độ nói lên 5 buổi/tuần. Trôi chảy chỉ đến từ số giờ nói.',
    },
  },
  {
    id: 'cp-18',
    at: 'Cuối tháng 18',
    name: 'Cổng Mở Rộng — Nửa chặng đường',
    test: '12 chủ đề đã cày sâu + Task 2 đạt 6.0 ổn định + 200 từ AWL chủ động',
    passBand: 'B2 / IELTS ≥ 6.0',
    actions: {
      ifPass: 'Sang Y2Q3. Chuyển sang hệ ngôn ngữ học thuật.',
      ifFail: 'Lặp 4 tuần. Nếu Writing tụt lại, nguyên nhân gần như luôn là thiếu người chấm bài.',
    },
  },
  {
    id: 'cp-21',
    at: 'Cuối tháng 21',
    name: 'Cổng Học Thuật',
    test: '400/570 từ AWL chủ động + Task 1 trong 20 phút + nén 1.000 từ xuống 100 từ',
    passBand: 'IELTS ≥ 6.5, không kỹ năng nào dưới 6.0',
    actions: {
      ifPass: 'Sang Y2Q4. Bây giờ mới được chạm vào đề Cambridge.',
      ifFail: 'Lặp 4 tuần tập trung vào AWL và cấu trúc học thuật. Đây là chỗ tách 6.5 khỏi 7.5.',
    },
  },
  {
    id: 'cp-24',
    at: 'Cuối tháng 24',
    name: 'Cổng Đường Đua — Kiểm định năm 2',
    test: 'Tự chấm sai lệch ≤ 0,5 band + Reading ≥ 30/40 + Listening ≥ 30/40 + 3 bài thi thử toàn phần',
    passBand: 'IELTS ≥ 6.5 ổn định',
    actions: {
      ifPass: 'Sang năm 3. Bắt đầu chiến dịch diệt lỗi.',
      ifFail: 'Lặp 8 tuần. Tuyệt đối KHÔNG đăng ký thi thật lúc này — thi non sẽ mất cả tiền lẫn tinh thần.',
    },
  },
  {
    id: 'cp-27',
    at: 'Cuối tháng 27',
    name: 'Cổng Phá Trần',
    test: '6 lỗi mục tiêu đã đóng + ≥ 60% câu không lỗi + Writing 7.0 ở cả 4 tiêu chí',
    passBand: 'IELTS ≥ 7.0, không kỹ năng nào dưới 6.5',
    actions: {
      ifPass: 'Sang Y3Q2. Chuyển trọng tâm sang độ tự nhiên và linh hoạt.',
      ifFail: 'Lặp 4 tuần. Nếu vẫn kẹt, gần như chắc chắn bạn đang tìm bí kíp mới thay vì diệt lỗi cũ.',
    },
  },
  {
    id: 'cp-30',
    at: 'Cuối tháng 30',
    name: 'Cổng Tinh Luyện',
    test: '300 cụm bậc cao chủ động + paraphrase 3 tầng trong 60 giây + Part 3 nói 45–60 giây/câu',
    passBand: 'IELTS ≥ 7.5, Writing ≥ 7.0, Speaking ≥ 7.0',
    actions: {
      ifPass: 'Sang Y3Q3. Chuyển sang rèn độ ổn định dưới áp lực.',
      ifFail: 'Lặp 4 tuần. Tăng số buổi nói với người bản ngữ để phát hiện chỗ chưa tự nhiên.',
    },
  },
  {
    id: 'cp-33',
    at: 'Cuối tháng 33',
    name: 'Cổng Chính Xác',
    test: '4 bài thi thử liên tiếp ≥ 7.5, dao động ≤ 0,5 + 20 chủ đề yếu đã xử lý + không bao giờ quá giờ',
    passBand: 'IELTS ≥ 7.5 ổn định',
    actions: {
      ifPass: 'Sang Y3Q4. Đăng ký lịch thi thật, cách ngày thi 10–11 tuần.',
      ifFail: 'Lặp 4 tuần và LÙI ngày thi. Thi khi chưa ổn định là đánh cược, không phải chiến lược.',
    },
  },
  {
    id: 'cp-36',
    at: 'Cuối tháng 36',
    name: 'CỔNG ĐỈNH — Kỳ thi thật',
    test: 'IELTS Academic chính thức',
    passBand: 'Overall 8.0, không kỹ năng nào dưới 7.0',
    actions: {
      ifPass: 'Hoàn thành hành trình. Chuyển sang chế độ duy trì: 30 phút/ngày để giữ trình độ cả đời.',
      ifFail:
        'Đây không phải thất bại mà là dữ liệu. Phân tích bảng điểm chi tiết, tấn công đúng kỹ năng yếu nhất trong 6 tuần, thi lại. Phần lớn người đạt 8.0 không đạt ngay ở lần thi đầu tiên.',
    },
  },
];
