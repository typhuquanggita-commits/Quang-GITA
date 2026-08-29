/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {Habit, Ritual} from '../types';

/* ==========================================================================
   HỆ THỐNG THÓI QUEN — 12 thói quen, cài theo thứ tự, không cài cùng lúc
   Nguyên tắc: mỗi quý chỉ cài 1–2 thói quen mới. Tham là hỏng cả hệ.
   ========================================================================== */

export const HABITS: Habit[] = [
  {
    id: 'h-anchor',
    name: 'Mỏ neo buổi sáng',
    cue: 'Ngay sau khi đánh răng xong buổi sáng',
    routine: 'Ngồi vào bàn đã bày sẵn tai nghe và sách từ tối hôm trước, bật buổi học 15 phút',
    reward: 'Tô đen ô lịch trên tường + một tách cà phê ngon (chỉ được uống trong lúc học)',
    twoMinuteVersion: 'Chỉ cần ngồi vào bàn và đeo tai nghe. Được tính là hoàn thành.',
    identity: 'Tôi là người bắt đầu ngày bằng tiếng Anh.',
    installWeek: 'Tuần 1–4 (Tháng 1)',
    metric: 'Số ngày thực hiện trước 7:00 sáng',
  },
  {
    id: 'h-anki',
    name: 'Ôn Anki không bỏ ngày',
    cue: 'Ngay sau khi ngồi vào bàn buổi sáng',
    routine: 'Ôn hết thẻ đến hạn trước, rồi mới học thẻ mới, tối đa theo giới hạn đã đặt',
    reward: 'Nhìn hàng đợi về 0 — cảm giác dứt điểm rất mạnh',
    twoMinuteVersion: 'Ôn 5 thẻ. Chỉ 5 thẻ thôi.',
    identity: 'Tôi là người không để trí nhớ rò rỉ.',
    installWeek: 'Tuần 2–6 (Tháng 1–2)',
    metric: 'Số ngày hàng đợi về 0 / tổng số ngày',
  },
  {
    id: 'h-input',
    name: 'Nạp một giờ mỗi ngày',
    cue: 'Khi bắt đầu di chuyển, nấu ăn, dọn nhà, hoặc tập thể dục',
    routine: 'Bật nội dung tiếng Anh dễ hiểu, nghe liền mạch, không tra từ',
    reward: 'Ghi số phút vào sổ giờ tích luỹ — nhìn con số 1.800 giờ tiến gần lại',
    twoMinuteVersion: 'Bật một tập podcast 3 phút trong lúc pha cà phê.',
    identity: 'Tôi sống trong môi trường tiếng Anh, không "học" tiếng Anh.',
    installWeek: 'Tuần 3–8 (Tháng 1–2)',
    metric: 'Số giờ input tích luỹ mỗi tuần',
  },
  {
    id: 'h-identity',
    name: 'Nghi thức bản sắc',
    cue: 'Ngay khi thức dậy, trước khi cầm điện thoại',
    routine: 'Đọc to câu dán trên gương: "Tôi là người học tiếng Anh mỗi ngày."',
    reward: 'Cảm giác nhất quán giữa lời nói và hành động trong ngày',
    twoMinuteVersion: 'Đọc thầm cũng được. Miễn là đọc.',
    identity: 'Tôi là người học tiếng Anh mỗi ngày.',
    installWeek: 'Tuần 1 (Tháng 1)',
    metric: 'Số ngày thực hiện liên tiếp',
  },
  {
    id: 'h-shadow',
    name: 'Shadowing 15 phút',
    cue: 'Ngay sau khi ôn xong Anki buổi sáng',
    routine: 'Chạy trọn 7 vòng shadowing trên một đoạn 60–90 giây',
    reward: 'Nghe lại bản ghi âm và thấy mình gần bản gốc hơn hôm qua',
    twoMinuteVersion: 'Shadowing đúng một câu, 10 lần.',
    identity: 'Tôi là người rèn tai và miệng cùng lúc, mỗi ngày.',
    installWeek: 'Tuần 14–18 (Tháng 4)',
    metric: 'Số buổi shadowing / tuần (mục tiêu 6)',
  },
  {
    id: 'h-journal',
    name: 'Nhật ký tiếng Anh buổi tối',
    cue: 'Sau khi đặt điện thoại vào chế độ ban đêm, trước khi lên giường',
    routine: 'Viết 5–10 câu (năm 2: 200 từ) về ngày hôm nay, dùng ≥ 3 cụm mới học',
    reward: 'Đọc lại mục của tháng trước và thấy rõ mình đã viết tốt hơn nhiều',
    twoMinuteVersion: 'Viết đúng một câu: "Today I…"',
    identity: 'Tôi là người kết thúc ngày bằng tiếng Anh.',
    installWeek: 'Tuần 27–31 (Tháng 7)',
    metric: 'Số từ viết mỗi tuần',
  },
  {
    id: 'h-club',
    name: 'Hai buổi Club mỗi tuần',
    cue: 'Tối thứ Tư và tối thứ Sáu, 20:00',
    routine: 'Vào phòng đúng giờ, bật camera, nói ≥ 40% thời lượng phần mình',
    reward: 'Được người khác gọi tên và hỏi thăm tiến độ — nhu cầu kết nối được đáp ứng',
    twoMinuteVersion: 'Vào phòng, chào mọi người, nghe 10 phút rồi xin phép ra.',
    identity: 'Tôi là thành viên của một cộng đồng học tập.',
    installWeek: 'Tuần 14–20 (Tháng 4–5)',
    metric: 'Số buổi tham dự / tổng số buổi (mục tiêu ≥ 90%)',
  },
  {
    id: 'h-review',
    name: 'Phiên Sổ Lỗi Chủ Nhật',
    cue: 'Sáng Chủ Nhật, ngay sau bữa sáng',
    routine: 'Đọc lại toàn bộ Sổ Lỗi 10 phút, chọn 1 lỗi làm mục tiêu tuần tới, chạy WOOP',
    reward: 'Đánh dấu ĐÓNG cho những lỗi đã hết tái phạm — cảm giác thắng rất rõ',
    twoMinuteVersion: 'Đọc lại 5 mục gần nhất trong sổ.',
    identity: 'Tôi là người học từ chính lỗi của mình.',
    installWeek: 'Tuần 27–31 (Tháng 7)',
    metric: 'Số lỗi đã đóng mỗi tháng',
  },
  {
    id: 'h-noscroll',
    name: 'Không lướt trước khi học',
    cue: 'Khi tay với lấy điện thoại vào buổi sáng',
    routine: 'Điện thoại ở phòng khác cho tới khi xong buổi học sáng',
    reward: 'Buổi học sâu hơn hẳn vì không bị dư âm chú ý từ mạng xã hội',
    twoMinuteVersion: 'Để điện thoại ở phòng khác đúng 15 phút.',
    identity: 'Tôi bảo vệ sự tập trung của mình.',
    installWeek: 'Tuần 40–44 (Tháng 10)',
    metric: 'Số buổi học sáng không chạm điện thoại',
  },
  {
    id: 'h-sleep',
    name: 'Ngủ 7 giờ — thói quen học tập bị đánh giá thấp nhất',
    cue: 'Chuông báo 22:30 mỗi tối',
    routine: 'Tắt màn hình, đọc sách giấy 15 phút, ngủ trước 23:00',
    reward: 'Buổi học sáng hôm sau hiệu quả gấp đôi, tỉ lệ nhớ Anki cao hơn rõ rệt',
    twoMinuteVersion: 'Chỉ cần tắt màn hình lúc 22:30, kể cả chưa ngủ ngay.',
    identity: 'Tôi coi giấc ngủ là một phần của việc học.',
    installWeek: 'Tuần 53–57 (Tháng 13)',
    metric: 'Số đêm ngủ ≥ 7 giờ mỗi tuần',
  },
  {
    id: 'h-mock',
    name: 'Thi thử sáng thứ Bảy',
    cue: 'Sáng thứ Bảy 9:00, theo lịch cố định hằng tháng',
    routine: 'Làm trọn bộ 4 kỹ năng đúng điều kiện phòng thi, điện thoại ở phòng khác',
    reward: 'Có dữ liệu thật thay vì phỏng đoán — cảm giác kiểm soát được hành trình',
    twoMinuteVersion: 'Không có phiên bản rút gọn. Thi thử là làm đủ hoặc không làm.',
    identity: 'Tôi là người ra quyết định bằng dữ liệu.',
    installWeek: 'Tuần 88–92 (Tháng 22)',
    metric: 'Số bài thi thử hoàn thành mỗi tháng',
  },
  {
    id: 'h-weekly-review',
    name: 'Tổng kết tuần bằng 5 con số',
    cue: 'Chiều Chủ Nhật 17:00',
    routine: 'Ghi 5 con số vào bảng: giờ input, phút nói, số từ viết, thẻ Anki thuộc, số ngày giữ chuỗi',
    reward: 'Xem biểu đồ 5 đường đi lên qua từng tháng',
    twoMinuteVersion: 'Ghi đúng 1 con số: số ngày giữ chuỗi tuần này.',
    identity: 'Cái gì tôi không đo được thì tôi không cải thiện được.',
    installWeek: 'Tuần 5–9 (Tháng 2)',
    metric: 'Số tuần có đủ 5 con số / 156 tuần',
  },
];

/* ==========================================================================
   NHỊP SINH HOẠT — nghi thức ngày / tuần / tháng / quý
   ========================================================================== */

export const RITUALS: Ritual[] = [
  {
    id: 'rt-morning',
    scope: 'day',
    name: 'Nghi thức Sáng — Khối Sâu',
    when: '05:45 – 06:45 (trước khi thế giới thức dậy)',
    minutes: 60,
    steps: [
      '05:45 — Đọc câu bản sắc trên gương. Không chạm điện thoại.',
      '05:50 — Ôn Anki cho tới khi hàng đợi về 0 (15–20 phút).',
      '06:10 — Shadowing hoặc chép chính tả (15–20 phút).',
      '06:30 — Buổi luyện chính theo lịch cột mốc (20–30 phút).',
      '06:45 — Ghi số phút vào sổ giờ. Tô đen ô lịch.',
    ],
    why:
      'Ý chí là nguồn lực cạn dần trong ngày. Việc quan trọng nhất phải xảy ra trước khi công việc, tin nhắn và mệt mỏi kịp lấy đi phần năng lượng tốt nhất của bạn.',
  },
  {
    id: 'rt-pockets',
    scope: 'day',
    name: 'Túi thời gian rơi vãi',
    when: 'Rải rác cả ngày',
    minutes: 45,
    steps: [
      'Đi lại (20 phút): nghe podcast — nghe thụ động, không ghi chép.',
      'Trưa (2 phút): tự nói bình luận một tin vừa đọc.',
      'Xếp hàng / chờ đợi (5 phút): ôn thẻ Anki trên điện thoại.',
      'Nấu ăn / dọn dẹp (20 phút): nghe nội dung dễ hiểu.',
    ],
    why:
      '45 phút mỗi ngày từ thời gian vốn đã bỏ đi, cộng dồn thành hơn 270 giờ trong 3 năm — bằng một khoá học toàn thời gian, mà không tốn thêm phút nào của lịch sống.',
  },
  {
    id: 'rt-evening',
    scope: 'day',
    name: 'Nghi thức Tối — Khối Đầu Ra',
    when: '20:30 – 21:30',
    minutes: 60,
    steps: [
      '20:30 — Đọc mở rộng hoặc luyện theo cột mốc (30 phút).',
      '21:00 — Viết: nhật ký hoặc bài Task 2 (20 phút).',
      '21:20 — Tự nói 3 phút kể lại ngày hôm nay.',
      '21:25 — Nhập mọi lỗi phát hiện trong ngày vào Sổ Lỗi.',
      '22:30 — Chuông báo ngủ. Tắt màn hình.',
    ],
    why:
      'Luật 48 giờ đòi hỏi mọi thứ nạp vào phải có đường ra. Buổi tối là lúc biến input trong ngày thành output — và việc học ngay trước khi ngủ giúp trí nhớ được củng cố trong đêm.',
  },
  {
    id: 'rt-week',
    scope: 'week',
    name: 'Tổng kết Chủ Nhật',
    when: 'Chủ Nhật 09:00 – 10:00 và 17:00 – 17:20',
    minutes: 80,
    steps: [
      '09:00 — Đọc lại toàn bộ Sổ Lỗi (10 phút).',
      '09:10 — Chọn ĐÚNG MỘT lỗi làm mục tiêu tuần tới.',
      '09:20 — Chạy WOOP: Wish → Outcome → Obstacle → Plan (10 phút).',
      '09:30 — Buổi luyện sâu theo cột mốc (30 phút).',
      '17:00 — Ghi 5 con số của tuần vào bảng theo dõi.',
      '17:10 — Xem lại lịch tuần tới, chốt trước 3 khung giờ không thể dời.',
    ],
    why:
      'Không có vòng phản hồi hằng tuần, bạn sẽ chạy 3 năm mà không biết mình đang đi đúng hay sai. 80 phút này là hệ thống lái của cả hành trình.',
  },
  {
    id: 'rt-month',
    scope: 'month',
    name: 'Kiểm định tháng',
    when: 'Chủ Nhật đầu tiên mỗi tháng',
    minutes: 120,
    steps: [
      'Xem bài giảng Lập trình tư duy của tháng (15 phút).',
      'Từ tháng 22: thi thử toàn phần đúng điều kiện (165 phút, làm vào thứ Bảy).',
      'Đối chiếu 4 KPI của cột mốc: đang đúng tiến độ hay chậm?',
      'Nghe lại bản ghi âm của chính bạn 6 tháng trước — bằng chứng tiến bộ.',
      'Điều chỉnh: nếu chậm 2 tháng liên tiếp, giảm mục tiêu chứ không tăng giờ học.',
    ],
    why:
      'Tiến bộ ngôn ngữ diễn ra quá chậm để cảm nhận theo ngày. Chỉ ở thang tháng, đường đi lên mới hiện ra — và đó là liều thuốc mạnh nhất chống bỏ cuộc.',
  },
  {
    id: 'rt-quarter',
    scope: 'quarter',
    name: 'Cổng chuyển cột mốc',
    when: 'Tuần cuối mỗi quý',
    minutes: 180,
    steps: [
      'Làm bài kiểm tra cổng thoát của cột mốc hiện tại.',
      'Đối chiếu từng tiêu chí thoát: đạt hay chưa đạt, ghi rõ.',
      'ĐẠT → chuyển cột mốc, đọc kỹ phần "bẫy" của cột mốc mới.',
      'CHƯA ĐẠT → lặp lại 4 tuần với đúng những tiêu chí còn thiếu. Không đi tiếp.',
      'Ăn mừng thật sự: một bữa ăn, một chuyến đi, một món quà đã hứa với chính mình.',
      'Viết một trang: điều gì hiệu quả, điều gì không, điều gì sẽ bỏ.',
    ],
    why:
      'Cổng chuyển là cơ chế bảo vệ quan trọng nhất của hệ thống. Đi tiếp khi nền chưa vững là lý do khiến người học mắc kẹt ở Band 6.0 suốt nhiều năm, dù vẫn học chăm chỉ mỗi ngày.',
  },
];
