/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {GraduationExam, TrainingCourse} from '../types';
import {nhipHoc} from './nhip';

/* ==========================================================================
   BỘ ĐỀ TỐT NGHIỆP — cuối mỗi vòng 21 ngày và cuối mỗi tầng của tháp học tập
   Nguyên tắc: bài thi phải ĐO ĐƯỢC BẰNG SỐ, không chấm bằng cảm nhận.
   ========================================================================== */

export const EXAM_CREED = {
  measurable:
    'Mọi tiêu chí đạt đều là một con số quan sát được: độ trễ tính bằng giây, độ chính xác tính bằng phần trăm, số từ đệm mỗi phút, số câu không lỗi. Không có tiêu chí nào là "nói khá trôi chảy".',
  noSurprise:
    'Học viên biết trước chính xác sẽ thi cái gì và ngưỡng đạt là bao nhiêu, ngay từ ngày đầu của vòng. Bài thi không phải cái bẫy — nó là đích ngắm.',
  ifFail:
    'Trượt không phải thất bại, là dữ liệu. Hệ thống chỉ ra đúng phần chưa đạt và lặp lại đúng phần đó, không bắt học lại từ đầu.',
};

export const GRADUATION_EXAMS: GraduationExam[] = [
  /* ---------------------- 4 BÀI THI CUỐI VÒNG 21 NGÀY ------------------- */
  {
    id: 'g-c1',
    scope: 'vòng',
    ref: 'Vòng 1 · MỞ TAI',
    name: 'Thi tốt nghiệp Vòng 1 — Nhận diện âm',
    when: 'Ngày 21',
    duration: '35 phút',
    sections: [
      {no: 1, name: 'Chép chính tả mù', minutes: 15, task: 'Ba đoạn 45 giây chưa từng nghe, hai giọng khác nhau. Chép từng chữ.', scores: 'Độ chính xác ≥ 85%'},
      {no: 2, name: 'Bắt nối âm', minutes: 8, task: 'Nghe 20 cụm, chỉ ra chỗ nối âm và gọi tên hiện tượng.', scores: 'Đúng ≥ 16/20'},
      {no: 3, name: 'Cặp âm tối thiểu', minutes: 7, task: '25 cặp, người chấm đọc ngẫu nhiên một từ, thí sinh chọn.', scores: 'Đúng ≥ 20/25'},
      {no: 4, name: 'Phân loại lỗi', minutes: 5, task: 'Nhìn bài chép của chính mình, phân loại mọi lỗi thành ba nhóm.', scores: 'Phân loại đúng ≥ 80%'},
    ],
    passMark: 'Đạt cả bốn phần. Không bù trừ giữa các phần.',
    ifFail:
      'Lặp 7 ngày, mỗi ngày hai buổi chép chính tả thay vì một. Chỉ thi lại phần chưa đạt.',
    proctoring: 'Làm trong app, có ghi âm màn hình. Đề bốc ngẫu nhiên từ ngân hàng 120 đoạn.',
  },
  {
    id: 'g-c2',
    scope: 'vòng',
    ref: 'Vòng 2 · BẬT PHẢN XẠ',
    name: 'Thi tốt nghiệp Vòng 2 — Phản xạ có chủ đích',
    when: 'Ngày 42',
    duration: '25 phút',
    sections: [
      {no: 1, name: 'Bắn 40 tình huống', minutes: 12, task: 'App bắn tình huống, thí sinh trả lời to. App đo độ trễ từng câu.', scores: 'Độ trễ trung bình < 1,5 giây'},
      {no: 2, name: 'Không câu nào quá chậm', minutes: 0, task: 'Đo trên chính 40 câu ở phần 1.', scores: 'Không câu nào > 3 giây'},
      {no: 3, name: 'Tình huống lạ', minutes: 8, task: '15 tình huống chưa từng luyện, cùng chủ đề nhưng khác cách hỏi.', scores: 'Trả lời được ≥ 12/15 trong 2,5 giây'},
      {no: 4, name: 'Không dịch trong đầu', minutes: 5, task: 'Mô tả 20 vật quanh phòng trong 60 giây, liên tục.', scores: 'Đạt ≥ 15 vật, không chuyển sang tiếng Việt'},
    ],
    passMark: 'Đạt cả bốn phần. Phần 3 là phần phân định — nó đo chuyển giao, không đo học thuộc.',
    ifFail: 'Lặp 7 ngày, tăng buổi BẮN từ một lên hai lần mỗi ngày.',
    proctoring: 'Làm trong app, micro bật, đo độ trễ tự động. Tình huống bốc từ ngân hàng 400 câu.',
  },
  {
    id: 'g-c3',
    scope: 'vòng',
    ref: 'Vòng 3 · DÀI HƠI',
    name: 'Thi tốt nghiệp Vòng 3 — Nói dài không sập câu',
    when: 'Ngày 63',
    duration: '30 phút',
    sections: [
      {no: 1, name: 'Cue card bốc thăm', minutes: 10, task: 'Ba đề chưa từng gặp, chuẩn bị 1 phút, nói 2 phút mỗi đề.', scores: 'Nói đủ 2 phút cả ba lần'},
      {no: 2, name: 'Đếm từ đệm', minutes: 0, task: 'Đo trên chính ba bản ghi ở phần 1.', scores: '< 3 từ đệm mỗi phút'},
      {no: 3, name: 'Kỹ thuật 4/3/2', minutes: 12, task: 'Cùng một nội dung nói 4 phút, rồi 3, rồi 2.', scores: 'Lần 3 nhanh hơn lần 1 ≥ 25%, không mất ý'},
      {no: 4, name: 'Nói vòng', minutes: 8, task: 'Mô tả 10 từ bị cấm nói thẳng, phải diễn đạt vòng.', scores: 'Người nghe đoán đúng ≥ 8/10'},
    ],
    passMark: 'Đạt cả bốn phần. Không dừng quá 3 giây ở bất kỳ chỗ nào trong phần 1.',
    ifFail: 'Lặp 7 ngày tập trung vào 4/3/2 và nói vòng — hai kỹ thuật chữa đúng nguyên nhân sập câu.',
    proctoring: 'Ghi âm toàn bộ. Hai người chấm độc lập phần 4.',
  },
  {
    id: 'g-c4',
    scope: 'vòng',
    ref: 'Vòng 4 · RA THẾ GIỚI',
    name: 'Thi tốt nghiệp Vòng 4 — Chuyển giao ra đời thật',
    when: 'Ngày 84',
    duration: 'Hồ sơ 21 ngày + 20 phút phỏng vấn',
    sections: [
      {no: 1, name: 'Hồ sơ nhiệm vụ', minutes: 0, task: '21 nhiệm vụ đã hoàn thành, mỗi nhiệm vụ có bằng chứng: ảnh, ghi âm, hoặc tin nhắn.', scores: 'Đủ 21, trong đó ≥ 7 với người lạ'},
      {no: 2, name: 'Kể lại một ca khó', minutes: 8, task: 'Chọn một nhiệm vụ khó nhất, kể lại bằng tiếng Anh: gặp gì, xử lý ra sao.', scores: 'Nói 3 phút, người nghe hiểu ≥ 90%'},
      {no: 3, name: 'Đối thoại bất ngờ', minutes: 7, task: 'Giám khảo đóng vai người lạ, tình huống không báo trước.', scores: 'Giữ được hội thoại 5 phút, không sập'},
      {no: 4, name: 'Tự đánh giá', minutes: 5, task: 'Chỉ ra ba điều mình còn yếu và kế hoạch cho chu kỳ sau.', scores: 'Chỉ đúng, có bằng chứng từ hồ sơ'},
    ],
    passMark:
      'Đạt cả bốn. Phần 4 quan trọng ngang phần 1 — người không tự thấy được điểm yếu sẽ không tự sửa được ở chu kỳ sau.',
    ifFail: 'Bổ sung nhiệm vụ còn thiếu trong 14 ngày, không phải làm lại toàn bộ.',
    proctoring: 'Hồ sơ nộp qua app. Phỏng vấn có ghi hình, hai giám khảo.',
  },

  /* ---------------------- 5 BÀI THI TỐT NGHIỆP TẦNG --------------------- */
  {
    id: 'g-t1',
    scope: 'tầng',
    ref: 'Tầng 1 · KHAI NHĨ',
    name: 'Tốt nghiệp Tầng 1 — Mở tai',
    when: 'Sau khi qua đủ 5 cấp của tầng',
    duration: '60 phút',
    sections: [
      {no: 1, name: 'Nghe giọng lạ', minutes: 20, task: 'Đoạn 5 phút giọng Úc hoặc Scotland chưa từng gặp, không phụ đề.', scores: 'Hiểu ≥ 85%, kể lại đúng ≥ 80% ý chính'},
      {no: 2, name: 'Chép chính tả nâng cao', minutes: 15, task: 'Đoạn 60 giây trình độ B1, nhiều người nói.', scores: 'Chính xác ≥ 92%'},
      {no: 3, name: 'Bảng âm IPA', minutes: 10, task: 'Đọc phiên âm 25 từ ngẫu nhiên chưa từng gặp.', scores: 'Đúng ≥ 23/25'},
      {no: 4, name: 'Shadowing', minutes: 10, task: 'Đoạn 90 giây tốc độ gốc, nói đuổi.', scores: 'Bám kịp ≥ 80% thời lượng'},
      {no: 5, name: 'Sổ giờ', minutes: 5, task: 'Đối chiếu sổ giờ tích luỹ.', scores: '≥ 150 giờ nghe có ghi chép'},
    ],
    passMark: 'Đạt cả năm phần. Phần 1 và 2 không bù trừ.',
    ifFail: 'Lặp 4 tuần đúng phần chưa đạt. Không lặp phần đã đạt.',
    proctoring: 'Thi tại trung tâm hoặc qua app có giám sát camera. Hai giám khảo chấm phần 4.',
  },
  {
    id: 'g-t2',
    scope: 'tầng',
    ref: 'Tầng 2 · KHAI NHÃN',
    name: 'Tốt nghiệp Tầng 2 — Mở mắt',
    when: 'Sau khi qua đủ 5 cấp của tầng',
    duration: '75 phút',
    sections: [
      {no: 1, name: 'Đọc lĩnh vực lạ', minutes: 25, task: 'Bài 1.200 từ thuộc lĩnh vực thí sinh chưa từng động tới.', scores: 'Đúng ≥ 8/10 câu hỏi hiểu, trong 8 phút'},
      {no: 2, name: 'Tốc độ đọc', minutes: 10, task: 'Đo trên bài chưa từng đọc.', scores: '≥ 200 từ/phút với độ hiểu ≥ 80%'},
      {no: 3, name: 'Tự rút quy luật', minutes: 20, task: 'Cho 15 ví dụ thật của một cấu trúc chưa học, tự viết ra quy luật.', scores: 'Khớp sách ngữ pháp ≥ 70%'},
      {no: 4, name: 'Nén lập luận', minutes: 15, task: 'Nén bài 1.000 từ xuống 100 từ giữ nguyên lập luận.', scores: 'Người chưa đọc bài gốc nắm đúng lập luận'},
      {no: 5, name: 'Số từ đã đọc', minutes: 5, task: 'Đối chiếu bảng theo dõi.', scores: '≥ 400.000 từ'},
    ],
    passMark: 'Đạt cả năm. Phần 3 là phần phân định — nó đo hiểu, không đo nhớ.',
    ifFail: 'Lặp 4 tuần. Trượt phần 3 thì quay lại phương pháp Chú ý ở cấp THẤY HÌNH.',
    proctoring: 'Thi có giám sát. Phần 4 do hai người chấm mù.',
  },
  {
    id: 'g-t3',
    scope: 'tầng',
    ref: 'Tầng 3 · KHAI KHẨU',
    name: 'Tốt nghiệp Tầng 3 — Mở miệng',
    when: 'Sau khi qua đủ 5 cấp của tầng',
    duration: '50 phút',
    sections: [
      {no: 1, name: 'Tranh biện bốc thăm', minutes: 20, task: 'Bốc lập trường, chuẩn bị 3 phút, tranh biện 5 phút, rồi đổi phía bác lại chính mình.', scores: 'Thuyết phục được ở cả hai phía'},
      {no: 2, name: 'Nhượng bộ rồi phản biện', minutes: 0, task: 'Đo trên chính phần 1.', scores: 'Dùng đúng kỹ thuật ≥ 3 lần'},
      {no: 3, name: 'Part 3 mô phỏng', minutes: 15, task: '8 câu hỏi trừu tượng liên tiếp, không nghỉ.', scores: 'Mỗi câu 45–60 giây, đủ khung PEEL'},
      {no: 4, name: 'Chỉ số nói', minutes: 0, task: 'Đo trên toàn bộ bản ghi.', scores: '≥ 130 từ/phút, < 3 từ đệm/phút'},
      {no: 5, name: 'Giờ nói tích luỹ', minutes: 15, task: 'Đối chiếu nhật ký buổi nói.', scores: '≥ 100 giờ có ghi chép'},
    ],
    passMark: 'Đạt cả năm. Sập câu khi bị phản bác trực diện ở phần 1 là trượt.',
    ifFail: 'Lặp 4 tuần tại Debate Club, tăng từ 1 lên 3 buổi mỗi tuần.',
    proctoring: 'Ghi hình. Hội đồng ba người cho phần 1.',
  },
  {
    id: 'g-t4',
    scope: 'tầng',
    ref: 'Tầng 4 · KHAI THỦ',
    name: 'Tốt nghiệp Tầng 4 — Mở tay',
    when: 'Sau khi qua đủ 5 cấp của tầng',
    duration: 'Hồ sơ + 90 phút thi viết',
    sections: [
      {no: 1, name: 'Sản phẩm công khai', minutes: 0, task: 'Bài blog 1.200 từ, video 10 phút, hoặc báo cáo có biểu đồ — đã công bố.', scores: '≥ 5 phản hồi từ người lạ, có bản làm lại'},
      {no: 2, name: 'Task 1 bấm giờ', minutes: 20, task: 'Biểu đồ chưa từng gặp.', scores: 'Xong đúng 20 phút, Band ≥ 7.0, có overview'},
      {no: 3, name: 'Task 2 bấm giờ', minutes: 40, task: 'Đề chưa từng gặp, dạng bốc ngẫu nhiên.', scores: 'Band ≥ 7.0 cả bốn tiêu chí'},
      {no: 4, name: 'Tự chấm', minutes: 20, task: 'Tự chấm chính bài mình vừa viết theo bốn tiêu chí.', scores: 'Lệch ≤ 0,5 band so với hội đồng'},
      {no: 5, name: 'Câu không lỗi', minutes: 10, task: 'Đếm trên bài đã chấm.', scores: '≥ 60% câu hoàn toàn không lỗi'},
    ],
    passMark: 'Đạt cả năm. Phần 4 là phần phân định — tự chấm đúng là dấu hiệu đã thành thạo thật.',
    ifFail: 'Lặp 4 tuần. Trượt phần 4 thì quay lại cấp MÀI SẮC.',
    proctoring: 'Thi viết có giám sát, không dùng công cụ hỗ trợ. Hai giám khảo chấm mù.',
  },
  {
    id: 'g-t5',
    scope: 'tầng',
    ref: 'Tầng 5 · KHAI ĐẠO',
    name: 'Tốt nghiệp Tầng 5 — Mở đường',
    when: 'Sau khi qua đủ 5 cấp của tầng',
    duration: 'Hồ sơ 90 ngày + 60 phút bảo vệ',
    sections: [
      {no: 1, name: 'Giảng lại 90 giây', minutes: 10, task: 'Ba khái niệm bốc thăm, giảng cho người chưa biết gì, không thuật ngữ.', scores: 'Người nghe hiểu được cả ba'},
      {no: 2, name: 'Hồ sơ kèm cặp', minutes: 0, task: 'Đã kèm ít nhất một học viên đi trọn một cấp độ.', scores: 'Người được kèm đã lên cấp, có 6 biên bản'},
      {no: 3, name: 'Dẫn buổi Club', minutes: 20, task: 'Dẫn một buổi thật, có phiếu đánh giá ẩn danh của thành viên.', scores: 'Điểm trung bình ≥ 4/5, không ai nói dưới 20% mức trung bình'},
      {no: 4, name: 'Bảo vệ chu kỳ tự thiết kế', minutes: 20, task: 'Trình bày một chu kỳ cấp độ do chính mình thiết kế và đã chạy thật.', scores: '≥ 5 học viên trong nhóm đã lên cấp'},
      {no: 5, name: 'IELTS chính thức', minutes: 10, task: 'Bảng điểm chính thức.', scores: 'Đạt mục tiêu đã đặt ở La Bàn'},
    ],
    passMark:
      'Đạt cả năm. Đây là bài duy nhất chấm bằng KẾT QUẢ CỦA NGƯỜI KHÁC — phần 2, 3 và 4 đều đo qua người mình dẫn dắt.',
    ifFail: 'Bổ sung phần còn thiếu. Không lặp lại toàn bộ.',
    proctoring: 'Hội đồng ba người. Hồ sơ lưu 24 tháng.',
  },
];

/* ==========================================================================
   KHOÁ ĐÀO TẠO TỰ ĐỘNG TRÊN APP — cho CTV, Tư vấn, Coach, Giáo viên
   Chạy tự động: học viên nhân sự vào app, hệ thống mở đúng mô-đun theo bậc
   hiện tại, chặn cổng khi chưa đạt, và tự chỉ định mô-đun bù khi trượt trục.
   ========================================================================== */

export const TRAINING_ENGINE = {
  howItRuns: [
    'Nhân sự mới vào app, làm bài kiểm tra đầu vào tầng 1 và 2 để hệ thống định vị bậc.',
    'Hệ thống mở đúng lộ trình của bậc đó, không mở nội dung của bậc trên.',
    'Mỗi mô-đun có cổng: chưa đạt cổng thì không mở được mô-đun tiếp theo.',
    'Cuối lộ trình bậc là bài kiểm định năm tầng. Đạt thì lên bậc và mở lộ trình bậc kế.',
    'Trượt một trục thì hệ thống tự chỉ định mô-đun bù đúng trục đó, không bắt học lại toàn bộ.',
    'Mọi bài mô phỏng đều ghi hình và lưu vào hồ sơ năng lực cá nhân.',
  ],
  autoAssign:
    'Bảng điểm tám trục sinh ra ngay khi chấm xong. Trục nào dưới ngưỡng thì mô-đun bù tương ứng tự xuất hiện trong app kèm hạn hoàn thành.',
  proof:
    'Hồ sơ năng lực cá nhân tích luỹ theo thời gian: điểm từng trục qua các kỳ, bản ghi hình mô phỏng, chỉ số thực chiến. Đây là căn cứ để giao việc và thăng bậc, không phải cảm nhận của quản lý.',
};

export const TRAINING_COURSES: TrainingCourse[] = [
  {
    id: 't-ctv-1',
    role: 'CỘNG TÁC VIÊN',
    level: 'Bậc 1–2 · Nhập môn tới Sàng lọc',
    name: 'Nói đúng về hệ thống',
    totalHours: 11,
    weeks: 4,
    cadence: nhipHoc(11, 4),
    promise:
      'Sau khoá, bạn giới thiệu đúng về GITA365 mà không hứa vượt, và sàng lọc được nhu cầu thật của khách trong 10 phút đầu.',
    modules: [
      {no: 1, name: 'Triết lý gốc rễ — vì sao hệ thống này khác', minutes: 90, format: 'Video + trắc nghiệm', outcome: 'Nói được 7 nguyên lý bằng lời của mình', gate: 'Trắc nghiệm ≥ 80%'},
      {no: 2, name: 'Lộ trình 36 tháng và chu kỳ 21/90', minutes: 120, format: 'Video + bài tập vẽ lại lộ trình', outcome: 'Vẽ được sơ đồ lộ trình không cần nhìn tài liệu', gate: 'Nộp sơ đồ đạt'},
      {no: 3, name: 'Điều được phép hứa và điều tuyệt đối không', minutes: 90, format: 'Tình huống + ghi âm', outcome: 'Phân biệt được cam kết đúng và hứa hão', gate: '20 tình huống đúng ≥ 18'},
      {no: 4, name: 'Bộ câu hỏi sàng lọc — hỏi trước khi nói', minutes: 120, format: 'Mô phỏng có ghi âm', outcome: 'Tỉ lệ hỏi/nói đạt 60/40 trong 10 phút đầu', gate: 'Mô phỏng đạt, hai người chấm'},
      {no: 5, name: 'Ba loại từ chối phổ biến', minutes: 90, format: 'Mô phỏng + phản hồi', outcome: 'Xử lý không ép, không tranh cãi', gate: 'Mô phỏng đạt'},
      {no: 6, name: 'Quy trình bàn giao cho Tư vấn', minutes: 60, format: 'Hướng dẫn + checklist', outcome: 'Bàn giao đủ thông tin, không để khách kể lại từ đầu', gate: 'Ba ca bàn giao thật đạt chuẩn'},
      {no: 7, name: 'Theo dõi 30 ngày đầu của khách', minutes: 90, format: 'Hướng dẫn + ca thật', outcome: 'Phát hiện sớm nguy cơ bỏ', gate: 'Nhận diện đúng ≥ 4/5 ca'},
    ],
    certification: 'Kiểm định 5 tầng cho bậc 2. Ngưỡng đạt 70, trục Chuẩn tư vấn không bù trừ.',
    autoRemediation:
      'Trượt trục Chuẩn tư vấn → mở lại mô-đun 3 và 4 kèm 10 ca mô phỏng bổ sung, hạn 14 ngày.',
  },
  {
    id: 't-consult-1',
    role: 'TƯ VẤN',
    level: 'Bậc 1–3 · Tập sự tới Kê lộ trình',
    name: 'Tư vấn trung thực và cá nhân hoá',
    totalHours: 20,
    weeks: 8,
    cadence: nhipHoc(20, 8),
    promise:
      'Sau khoá, bạn kê được ba lộ trình khác nhau cho ba hồ sơ khác nhau và bảo vệ được từng lựa chọn bằng số liệu giờ học.',
    modules: [
      {no: 1, name: 'Khung tư vấn 7 bước', minutes: 120, format: 'Video + kịch bản mẫu', outcome: 'Chạy trọn khung không sót bước', gate: 'Mô phỏng lần 1 đạt'},
      {no: 2, name: 'Hỏi trước khi nói — bộ 30 câu hỏi chẩn đoán', minutes: 150, format: 'Mô phỏng có đo tỉ lệ', outcome: 'Khách nói ≥ 60% thời lượng', gate: 'Đo bằng máy, đạt 3 lần liên tiếp'},
      {no: 3, name: 'Điều khách nói muốn vs điều khách thật sự cần', minutes: 120, format: 'Phân tích 10 ca thật', outcome: 'Chẩn đoán đúng nhu cầu ẩn', gate: 'Đúng ≥ 8/10 ca'},
      {no: 4, name: 'Toán học lộ trình — tính số tháng thật cần', minutes: 180, format: 'Thực hành trên bộ máy suy dẫn', outcome: 'Tính đúng số giờ còn thiếu và số tháng cần', gate: 'Tính đúng 10/10 hồ sơ'},
      {no: 5, name: 'Nói thẳng khi mục tiêu không khả thi', minutes: 150, format: 'Mô phỏng ca khó', outcome: 'Đưa ba đòn bẩy thay vì hứa liều', gate: 'Mô phỏng đạt, hai người chấm'},
      {no: 6, name: 'Từ chối khách không phù hợp', minutes: 120, format: 'Mô phỏng + phản hồi', outcome: 'Từ chối mà giữ được quan hệ', gate: 'Mô phỏng đạt'},
      {no: 7, name: 'Kê ba lộ trình cho ba hồ sơ', minutes: 180, format: 'Bài phân tích ca', outcome: 'Ba lộ trình khác nhau, có bảo vệ', gate: 'Hội đồng chấm đạt'},
      {no: 8, name: 'Xử lý khiếu nại và phụ huynh gây áp lực', minutes: 150, format: 'Mô phỏng ca khó nhất', outcome: 'Bắt nhịp trước khi dẫn', gate: 'Mô phỏng đạt'},
    ],
    certification: 'Kiểm định 5 tầng cho bậc 3. Ngưỡng 75. Bắt buộc có tầng 4 mô phỏng.',
    autoRemediation:
      'Trượt trục Tư duy → mở lại mô-đun 3 và 4. Trượt Chuẩn tư vấn → dừng tư vấn cho khách thật cho tới khi thi lại đạt.',
  },
  {
    id: 't-coach-1',
    role: 'COACH',
    level: 'Bậc 1–3 · Tập sự tới Chẩn đoán',
    name: 'Đặt câu hỏi thay vì giảng',
    totalHours: 27,
    weeks: 10,
    cadence: nhipHoc(27, 10),
    promise:
      'Sau khoá, bạn giữ được tỉ lệ học viên nói trên 70% trong buổi 1-1, và chẩn đoán được nguyên nhân gốc thay vì xử lý triệu chứng.',
    modules: [
      {no: 1, name: 'Vai cố vấn — 6 chuyển dịch khỏi vai người giảng', minutes: 120, format: 'Video + tự đánh giá', outcome: 'Nhận ra thói quen giảng của chính mình', gate: 'Trắc nghiệm + tự phản tư'},
      {no: 2, name: 'Vòng 11 bước và mô thức GITA', minutes: 180, format: 'Video + chạy thử', outcome: 'Dẫn được một chu kỳ theo lời thoại mẫu', gate: 'Mô phỏng lần 1 đạt'},
      {no: 3, name: 'Bộ 120 câu hỏi cố vấn theo tình huống', minutes: 180, format: 'Thực hành có đo', outcome: 'Học viên nói ≥ 70%', gate: 'Đo bằng máy, 3 buổi liên tiếp'},
      {no: 4, name: 'Chịu được im lặng bảy giây', minutes: 90, format: 'Mô phỏng có đo thời gian chờ', outcome: 'Không nhắc từ, không nói hộ', gate: 'Chờ đủ 7 giây trong ≥ 8/10 lần'},
      {no: 5, name: 'Đọc dữ liệu học viên — chẩn đoán nguyên nhân gốc', minutes: 240, format: 'Phân tích 15 hồ sơ thật', outcome: 'Chỉ đúng nguyên nhân, không dừng ở triệu chứng', gate: 'Đúng ≥ 12/15'},
      {no: 6, name: 'Sáu phác đồ tình huống khó', minutes: 180, format: 'Mô phỏng từng phác đồ', outcome: 'Chạy đúng phác đồ cho từng tình huống', gate: 'Sáu mô phỏng đều đạt'},
      {no: 7, name: 'Bắt nhịp trước khi dẫn — cứu người muốn bỏ', minutes: 180, format: 'Mô phỏng ca khó nhất', outcome: 'Không dùng lý lẽ trước khi bắt nhịp đủ', gate: 'Hai người chấm đạt'},
      {no: 8, name: 'Mười kỹ thuật NLP và cảnh báo dùng sai', minutes: 180, format: 'Video + thực hành', outcome: 'Dùng đúng lúc, không lạm dụng', gate: 'Mô phỏng đạt'},
      {no: 9, name: 'Trả phản hồi bốn phần trong 48 giờ', minutes: 150, format: 'Chấm thật 10 bài', outcome: 'Bản phản hồi đủ bốn phần, đúng hạn', gate: '10 bản đạt chuẩn'},
      {no: 10, name: 'Đọc chỉ số giữ chân và can thiệp sớm', minutes: 120, format: 'Dữ liệu thật + kế hoạch', outcome: 'Phát hiện nguy cơ bỏ trước khi xảy ra', gate: 'Nhận diện đúng ≥ 8/10 ca'},
    ],
    certification: 'Kiểm định 5 tầng cho bậc 3. Ngưỡng 75. Bắt buộc tầng 4 và hồ sơ 90 ngày.',
    autoRemediation:
      'Tỉ lệ học viên nói dưới 70% → mở lại mô-đun 3 và 4. Chẩn đoán sai → mô-đun 5 kèm 15 hồ sơ bổ sung.',
  },
  {
    id: 't-teacher-1',
    role: 'GIÁO VIÊN',
    level: 'Bậc 1–3 · Trợ giảng tới Chấm chuẩn',
    name: 'Dạy đúng vùng và chấm đúng tiêu chí',
    totalHours: 37,
    weeks: 12,
    cadence: nhipHoc(37, 12),
    promise:
      'Sau khoá, bạn dạy được theo vùng i+1 của người đang ngồi đó, và chấm Writing lệch dưới 0,5 band so với hội đồng.',
    modules: [
      {no: 1, name: 'Bảy nguyên lý gốc rễ và hệ quả lên cách dạy', minutes: 180, format: 'Video + phản tư', outcome: 'Nhận ra cách dạy cũ vi phạm nguyên lý nào', gate: 'Bài phản tư đạt'},
      {no: 2, name: 'Dạy ngữ pháp bằng phương pháp Chú ý', minutes: 240, format: 'Soạn bài + dạy thử', outcome: 'Cho ví dụ trước, giảng quy luật sau', gate: 'Dạy thử đạt, hai người chấm'},
      {no: 3, name: 'Xác định vùng i+1 cho từng học viên', minutes: 180, format: 'Thực hành trên 20 hồ sơ', outcome: 'Chọn đúng tài liệu cho đúng người', gate: 'Đúng ≥ 17/20'},
      {no: 4, name: 'Ngữ âm: 44 âm và 10 lỗi hàng đầu của người Việt', minutes: 300, format: 'Video cận miệng + luyện', outcome: 'Chẩn đoán và sửa được từng lỗi', gate: 'Chẩn đoán đúng 10/10 bản ghi'},
      {no: 5, name: 'Thư viện 20 phác đồ lỗi', minutes: 240, format: 'Thực hành kê phác đồ', outcome: 'Kê đúng phác đồ cho đúng lỗi', gate: 'Đúng ≥ 18/20 ca'},
      {no: 6, name: 'Tiêu chí chấm IELTS — giải mã ngược', minutes: 300, format: 'Chấm mù + đối chiếu', outcome: 'Chấm lệch dưới 0,5 band', gate: '10 bài liên tiếp lệch ≤ 0,5'},
      {no: 7, name: 'Viết phản hồi bốn phần', minutes: 240, format: 'Viết thật + chấm chéo', outcome: 'Đủ bốn phần, có điểm mạnh cụ thể trích dẫn', gate: '15 bản đạt chuẩn'},
      {no: 8, name: 'Chấm Speaking theo tiêu chí', minutes: 240, format: 'Chấm mù bản ghi', outcome: 'Lệch dưới 0,5 band', gate: '10 bản liên tiếp đạt'},
      {no: 9, name: 'Điều phối lớp: ai cũng nói, không ai lấn', minutes: 180, format: 'Dạy thử lớp thật', outcome: 'Không học viên nào nói dưới 20% mức trung bình', gate: 'Đo bằng máy, 3 buổi'},
      {no: 10, name: 'Quy trình 48 giờ và hồ sơ học viên', minutes: 120, format: 'Hướng dẫn + kiểm hồ sơ', outcome: 'Không bài nào trả chậm', gate: 'Kiểm hồ sơ 30 ngày đạt'},
    ],
    certification:
      'Kiểm định 5 tầng cho bậc 3. Ngưỡng 78. Bắt buộc chấm mù 5 bài đối chiếu hội đồng.',
    autoRemediation:
      'Lệch chấm quá 0,5 band → mở lại mô-đun 6 và 8, chấm bù 20 bài trước khi thi lại. Trả bài chậm → khoá nhận học viên mới cho tới khi hồ sơ 30 ngày đạt chuẩn.',
  },
];
