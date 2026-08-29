/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  SprintCycle,
  SprintDay,
  LearningMechanism,
} from '../types';

/* ==========================================================================
   CHU KỲ TỐC ĐỘ — 21 NGÀY MỘT VÒNG, BỐN VÒNG THÀNH 90 NGÀY
   Đây là lớp TĂNG TỐC đặt lên trên lộ trình 36 tháng, không thay thế nó.
   Lộ trình dài trả lời "đi đâu". Chu kỳ 21 ngày trả lời "ba tuần tới làm gì".
   ========================================================================== */

export const SPRINT_CREED = {
  name: 'CHU KỲ 21 · 90',
  why21:
    'Hai mươi mốt ngày không phải con số huyền bí — nghiên cứu về hình thành thói quen cho thấy thời gian thật dao động rất rộng, trung bình khoảng 66 ngày. Chúng tôi chọn 21 ngày vì lý do khác: đó là khoảng đủ dài để một kỹ năng hẹp chuyển từ phải nghĩ sang tự động, và đủ ngắn để người học nhìn thấy vạch đích ngay từ ngày đầu.',
  why90:
    'Bốn vòng 21 ngày cộng thêm chín ngày hợp nhất thành 90. Ba tháng là chu kỳ ngắn nhất mà năng lực thật sự đổi bậc — dưới mức đó chỉ là cảm giác tiến bộ.',
  rule:
    'Mỗi vòng 21 ngày chỉ tấn công MỘT kỹ năng hẹp. Tham hai kỹ năng là không kỹ năng nào chạm ngưỡng tự động.',
  speedTruth:
    'Siêu tốc không có nghĩa là rút ngắn số giờ tiếp xúc — điều đó bất khả thi. Siêu tốc nghĩa là mỗi giờ tiếp xúc tạo ra nhiều tự động hoá hơn: đúng vùng khó, đúng nhịp ôn, đúng lúc trong ngày, và có phản hồi ngay.',
};

export const SPRINT_CYCLES: SprintCycle[] = [
  {
    id: 'c1',
    no: 1,
    name: 'VÒNG 1 — MỞ TAI',
    days: 'Ngày 1–21',
    promise: 'Tai tách được ranh giới từ trong dòng nói tự nhiên.',
    focus: 'Nhận diện âm: nối âm, nuốt âm, âm yếu, âm cuối.',
    dailyMinutes: 35,
    mechanism:
      'Học ngầm theo thống kê. Não tự rút quy luật phân bố âm khi được tiếp xúc dày đặc và đều đặn, không cần ai giảng quy luật đó.',
    exitTest:
      'Chép chính tả một đoạn 45 giây chưa từng nghe, đạt trên 85% chính xác.',
  },
  {
    id: 'c2',
    no: 2,
    name: 'VÒNG 2 — BẬT PHẢN XẠ',
    days: 'Ngày 22–42',
    promise: 'Trả lời được 40 tình huống thường gặp dưới 1,5 giây.',
    focus: 'Phản xạ có chủ đích: kích thích → phản hồi, không qua dịch.',
    dailyMinutes: 40,
    mechanism:
      'Tự động hoá truy xuất. Lặp lại cặp kích thích–phản hồi cho tới khi truy xuất chuyển từ có kiểm soát sang tự động, đo bằng độ trễ.',
    exitTest:
      'Bốn mươi tình huống bốc thăm, độ trễ trung bình dưới 1,5 giây, không câu nào quá 3 giây.',
  },
  {
    id: 'c3',
    no: 3,
    name: 'VÒNG 3 — DÀI HƠI',
    days: 'Ngày 43–63',
    promise: 'Nói liên tục 2 phút về chủ đề bất kỳ, không sập câu.',
    focus: 'Kéo dài đoạn nói, nối ý, nói vòng khi thiếu từ.',
    dailyMinutes: 45,
    mechanism:
      'Kỹ thuật 4/3/2 và luyện có ngắt quãng. Cùng nội dung nói ngắn dần, buộc não nén và tăng tốc truy xuất.',
    exitTest:
      'Nói 2 phút về cue card bốc thăm, dưới 3 từ đệm mỗi phút, không dừng quá 3 giây.',
  },
  {
    id: 'c4',
    no: 4,
    name: 'VÒNG 4 — RA THẾ GIỚI',
    days: 'Ngày 64–84',
    promise: 'Hoàn thành 21 nhiệm vụ thật với người thật.',
    focus: 'Chuyển giao: dùng được ngoài đời, không chỉ trong bài tập.',
    dailyMinutes: 45,
    mechanism:
      'Chuyển giao theo bối cảnh. Kỹ năng chỉ bền khi được luyện trong nhiều bối cảnh khác nhau, không chỉ trong bối cảnh đã học.',
    exitTest:
      'Hai mươi mốt nhiệm vụ đã hoàn thành có bằng chứng, ít nhất 7 nhiệm vụ với người lạ.',
  },
];

export const CONSOLIDATION_DAYS = {
  name: 'NGÀY 85–90 — HỢP NHẤT',
  what: 'Sáu ngày cuối không nạp gì mới.',
  why:
    'Đây là bước bị bỏ qua nhiều nhất và cũng là bước tạo ra khác biệt lớn nhất. Trí nhớ cần thời gian được củng cố; nạp liên tục 90 ngày không nghỉ khiến phần lớn những gì học được ở tuần cuối không kịp chuyển vào trí nhớ dài hạn.',
  plan: [
    'Ngày 85–86: nghe lại toàn bộ bản ghi âm của chính mình từ ngày 1.',
    'Ngày 87: làm lại đúng bài kiểm tra của ngày 1, so số liệu.',
    'Ngày 88: dạy lại cho một người chưa biết gì — 90 giây, không thuật ngữ.',
    'Ngày 89: viết một trang cho người sẽ bắt đầu chu kỳ sau mình.',
    'Ngày 90: chọn kỹ năng hẹp cho chu kỳ 90 ngày tiếp theo.',
  ],
};

/* ------------------------- MỘT NGÀY TRONG CHU KỲ ------------------------- */

export const SPRINT_DAY: SprintDay[] = [
  {
    slot: 'MỒI',
    clock: 'Ngay khi mở mắt · 3 phút',
    name: 'Mồi buổi sáng',
    minutes: 3,
    what: 'Mở app, nghe đúng ba câu mục tiêu của ngày. Chưa cần hiểu hết, chỉ nghe.',
    mechanism:
      'Hiệu ứng mồi. Ba câu này sẽ được gặp lại năm lần trong ngày; lần đầu tiên tạo dấu vết để những lần sau bám vào.',
    appAction: 'Nút MỒI HÔM NAY — tự phát, không cần chọn gì.',
  },
  {
    slot: 'NẠP',
    clock: 'Lúc đi lại · 20 phút',
    name: 'Nạp trong lúc di chuyển',
    minutes: 20,
    what: 'Nghe bài của ngày. Không ghi chép, không tua lại, không cần hiểu hết.',
    mechanism:
      'Học ngầm theo thống kê. Não rút quy luật từ khối lượng, không từ sự tập trung phân tích.',
    appAction: 'Danh sách phát tự nối tiếp, hoạt động cả khi mất mạng.',
  },
  {
    slot: 'PHẢN XẠ',
    clock: 'Giờ nghỉ trưa · 7 phút',
    name: 'Bắn phản xạ',
    minutes: 7,
    what: 'App bắn 20 tình huống. Bạn trả lời to trong 2 giây. App đo độ trễ.',
    mechanism:
      'Tự động hoá truy xuất, đo bằng thời gian. Đây là buổi duy nhất trong ngày có tính điểm.',
    appAction: 'Nút BẮN — micro bật sẵn, hiện độ trễ ngay sau mỗi câu.',
  },
  {
    slot: 'NHIỆM VỤ',
    clock: 'Bất cứ lúc nào · 5 phút',
    name: 'Nhiệm vụ đời thật',
    minutes: 5,
    what: 'Một việc phải làm bằng tiếng Anh trong đời thật hôm nay, có bằng chứng nộp lại.',
    mechanism:
      'Chuyển giao theo bối cảnh. Kỹ năng luyện trong phòng không tự sang được ngoài đời nếu không bắc cầu.',
    appAction: 'Thẻ NHIỆM VỤ HÔM NAY — chụp ảnh hoặc ghi âm để nộp.',
  },
  {
    slot: 'ĐẦU RA',
    clock: 'Tối · 10 phút',
    name: 'Nói và viết lại',
    minutes: 10,
    what: 'Kể lại ngày hôm nay 3 phút, rồi viết 5 câu dùng đúng ba câu mục tiêu.',
    mechanism:
      'Truy hồi chủ động. Lôi ra khỏi trí nhớ mạnh hơn nhiều so với nhận diện lại.',
    appAction: 'Nút GHI — tự lưu vào kho bản ghi để về sau nghe lại đối chiếu.',
  },
  {
    slot: 'GIEO ĐÊM',
    clock: 'Ngay trước khi ngủ · 4 phút',
    name: 'Ôn cuối trước giấc ngủ',
    minutes: 4,
    what: 'Nghe lại đúng ba câu mục tiêu, rồi tắt máy đi ngủ. Không nghe trong lúc ngủ.',
    mechanism:
      'Củng cố trí nhớ trong giấc ngủ. Nội dung ôn ngay trước khi ngủ được củng cố tốt hơn — nhưng phải ôn TRƯỚC khi ngủ, không phải phát trong lúc ngủ.',
    appAction: 'Chế độ ĐÊM — tự tắt sau 4 phút, màn hình tối dần.',
  },
];

/* ---------------------- CƠ CHẾ HỌC: THẬT VÀ KHÔNG THẬT ------------------- */

export const MECHANISMS: LearningMechanism[] = [
  {
    id: 'm-implicit',
    name: 'HỌC NGẦM THEO THỐNG KÊ',
    claim:
      'Não tự rút được quy luật của một ngôn ngữ chỉ nhờ tiếp xúc đủ nhiều, mà người học không hề ý thức mình đang học quy luật đó.',
    evidence:
      'Được chứng minh trên cả trẻ sơ sinh lẫn người lớn: sau vài phút nghe một dòng âm thanh liên tục, người nghe tách được ranh giới "từ" chỉ dựa vào xác suất âm này đi sau âm kia. Đây là cơ chế gần nhất với cái mà nhiều người gọi là "học bằng tiềm thức".',
    howWeUse:
      'Khối NẠP 20 phút mỗi ngày trong lúc đi lại: nghe khối lượng lớn, không phân tích, không tua lại. Đúng điều kiện để cơ chế này chạy.',
    notThis:
      'Đây KHÔNG phải nghe trong lúc ngủ. Học ngầm đòi hỏi người nghe đang tỉnh và đang xử lý âm thanh.',
  },
  {
    id: 'm-priming',
    name: 'MỒI NGỮ CẢNH',
    claim:
      'Gặp một cấu trúc một lần làm tăng khả năng nhận ra và tái tạo nó trong những lần gặp sau, kể cả khi không nhớ đã gặp.',
    evidence:
      'Hiệu ứng mồi cú pháp là một trong những hiện tượng ổn định nhất của tâm lý học ngôn ngữ: người nói có xu hướng lặp lại cấu trúc vừa nghe, một cách không chủ ý.',
    howWeUse:
      'Ba câu mục tiêu của ngày xuất hiện năm lần, ở năm thời điểm khác nhau, trong năm bối cảnh khác nhau. Lần đầu lúc vừa mở mắt là lần gieo mồi.',
    notThis:
      'Mồi không thay được luyện tập. Nó làm cho lần luyện sau hiệu quả hơn, không làm thay lần luyện đó.',
  },
  {
    id: 'm-automaticity',
    name: 'TỰ ĐỘNG HOÁ TRUY XUẤT',
    claim:
      'Một kỹ năng chuyển từ có kiểm soát sang tự động khi được lặp lại đủ nhiều với cùng một ánh xạ kích thích–phản hồi. Dấu hiệu đo được là ĐỘ TRỄ giảm.',
    evidence:
      'Trong nghiên cứu về song ngữ, sự khác biệt cốt lõi giữa người nói trôi chảy và người nói ấp úng không nằm ở vốn từ mà ở tốc độ truy xuất.',
    howWeUse:
      'Buổi BẮN PHẢN XẠ 7 phút mỗi trưa. App đo độ trễ từng câu. Mục tiêu vòng 2: dưới 1,5 giây. Đây là buổi duy nhất trong ngày có tính điểm.',
    notThis:
      'Không phải học thuộc câu. Ánh xạ phải là tình huống → phản hồi, không phải câu tiếng Việt → câu tiếng Anh.',
  },
  {
    id: 'm-sleep',
    name: 'CỦNG CỐ TRONG GIẤC NGỦ',
    claim:
      'Nội dung được ôn ngay trước khi ngủ được củng cố vào trí nhớ dài hạn tốt hơn nội dung ôn giữa ngày.',
    evidence:
      'Giấc ngủ, đặc biệt là giấc ngủ sóng chậm, tham gia vào quá trình chuyển trí nhớ từ vùng hải mã sang vỏ não. Ôn trước khi ngủ tận dụng được cửa sổ đó.',
    howWeUse:
      'Khối GIEO ĐÊM 4 phút: nghe lại đúng ba câu mục tiêu rồi tắt máy. Không nội dung mới, không màn hình sáng.',
    notThis:
      'KHÔNG phát audio trong lúc ngủ. Nghe khi ngủ không tạo được trí nhớ mới cho ngôn ngữ, và còn làm giảm chất lượng giấc ngủ — tức là làm hỏng chính cơ chế đang muốn tận dụng.',
  },
  {
    id: 'm-spacing',
    name: 'GIÃN CÁCH TRONG NGÀY',
    claim:
      'Cùng một lượng tiếp xúc, chia thành nhiều lần cách nhau trong ngày cho kết quả nhớ tốt hơn hẳn dồn một lần.',
    evidence:
      'Hiệu ứng giãn cách là một trong những phát hiện vững chắc nhất của tâm lý học nhận thức, đúng ở mọi thang thời gian từ vài phút tới vài tháng.',
    howWeUse:
      'Ba câu mục tiêu xuất hiện ở sáu khối trong ngày, cách nhau từ 2 tới 8 giờ. Tổng thời gian không đổi, chỉ đổi cách phân bố.',
    notThis:
      'Không phải học sáu buổi khác nhau. Là cùng một nội dung, gặp lại sáu lần.',
  },
  {
    id: 'm-notreal',
    name: '⚠ NHỮNG ĐIỀU CHÚNG TÔI KHÔNG ĐƯA VÀO',
    claim:
      'Ba tuyên bố phổ biến trong quảng cáo học tiếng Anh mà bằng chứng không ủng hộ.',
    evidence:
      'Chúng tôi bỏ chúng ra dù chúng dễ bán, vì đưa vào là đánh đổi kết quả của học viên lấy sức hấp dẫn của lời quảng cáo.',
    howWeUse:
      'Thay bằng năm cơ chế có bằng chứng ở trên — vốn tạo ra đúng trải nghiệm "ngấm mà không phải cố", nhưng bằng đường thật.',
    notThis:
      'Nghe khi ngủ để học tiếng Anh · Sóng não hoặc nhạc tần số đặc biệt giúp thuộc nhanh · Dạy theo "kiểu học" riêng của từng người (nhìn, nghe, vận động) làm tăng kết quả — cả ba đều đã được kiểm chứng và không cho hiệu quả.',
  },
];
