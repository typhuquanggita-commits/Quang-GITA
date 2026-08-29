/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {LevelBadge} from '../types';

/* ==========================================================================
   25 CẤP ĐỘ — 5 TẦNG × 5 CẤP
   Nguyên tắc đặt tên: mỗi cấp là một ĐỘNG TỪ mà học viên vừa làm được, không
   phải một danh hiệu trừu tượng. Người ta tự hào vì việc mình làm được, không
   tự hào vì cái nhãn được dán.
   Mỗi cấp chạy trọn vòng 11 bước và kết thúc bằng một bài về đích thật.
   ========================================================================== */

export const LEVELS: LevelBadge[] = [
  /* ================= TẦNG 1 — KHAI NHĨ · MỞ TAI ========================= */
  {
    id: 'L1-1',
    tierId: 'tier-1',
    no: 1,
    name: 'BẮT SÓNG',
    epithet: 'Người vừa nhận ra tiếng Anh có hình dạng',
    entry: 'Không yêu cầu gì. Đây là cửa vào.',
    mission:
      'Nghe được ra đâu là ranh giới giữa các từ trong dòng âm thanh liên tục — thứ mà trước đây chỉ là một khối tiếng ù ù.',
    challenge:
      'Bảy ngày liên tiếp, mỗi ngày nghe 20 phút nội dung có hình ảnh minh hoạ. Ngày thứ bảy, nghe lại đúng đoạn của ngày đầu và đếm xem nhận ra được bao nhiêu từ.',
    passCriteria: [
      'Chuỗi 7/7 ngày, không đứt',
      'Nhận diện được ≥ 30 từ quen trong một đoạn 2 phút',
      'Đọc đúng phiên âm của 12 nguyên âm đơn',
    ],
    reward: 'Huy hiệu SÓNG ĐẦU · Bộ audio khởi động 30 ngày',
    unlocks: 'Mở cấp LỌC NHIỄU và quyền vào CLB Chuỗi Ngày',
  },
  {
    id: 'L1-2',
    tierId: 'tier-1',
    no: 2,
    name: 'LỌC NHIỄU',
    epithet: 'Người tách được tiếng nói khỏi tiếng ồn',
    entry: 'Đã đạt BẮT SÓNG',
    mission:
      'Tách được âm cuối, âm yếu và âm nối — ba thủ phạm khiến người Việt nghe hụt dù biết hết các từ.',
    challenge:
      'Mười bốn ngày chép chính tả 45 giây mỗi ngày, phân loại mọi lỗi thành ba nhóm: không biết từ, biết mà không nhận ra âm, nối hoặc nuốt âm.',
    passCriteria: [
      'Độ chính xác chép chính tả ≥ 85% trên đoạn A1',
      'Chỉ ra được 5 hiện tượng nối âm trong một transcript bất kỳ',
      'Bảng phân loại lỗi nghe có ít nhất 30 mục',
    ],
    reward: 'Huy hiệu TAI TINH · Bộ 50 cặp âm tối thiểu có audio',
    unlocks: 'Mở cấp BẮT NHỊP',
  },
  {
    id: 'L1-3',
    tierId: 'tier-1',
    no: 3,
    name: 'BẮT NHỊP',
    epithet: 'Người nghe được nhạc điệu của tiếng Anh',
    entry: 'Đã đạt LỌC NHIỄU',
    mission:
      'Nắm được nhịp trọng âm — hiểu vì sao tiếng Anh "nuốt" chữ và nuốt ở đâu, thay vì cố nghe từng từ một.',
    challenge:
      'Hai mươi mốt ngày shadowing một đoạn 60 giây, mỗi tuần đổi một đoạn. Ghi âm ngày đầu và ngày cuối của mỗi tuần để so sánh.',
    passCriteria: [
      'Bám kịp ≥ 70% thời lượng đoạn ở tốc độ gốc',
      'Đánh dấu đúng trọng âm câu trong một đoạn chưa từng gặp',
      'Ba cặp ghi âm đầu–cuối cho thấy tiến bộ nghe được',
    ],
    reward: 'Huy hiệu NHỊP CHUẨN · Bộ 20 đoạn shadowing phân cấp',
    unlocks: 'Mở cấp THẤU ÂM',
  },
  {
    id: 'L1-4',
    tierId: 'tier-1',
    no: 4,
    name: 'THẤU ÂM',
    epithet: 'Người nghe được cả điều không nói ra',
    entry: 'Đã đạt BẮT NHỊP',
    mission:
      'Nghe ra thái độ và ý định qua ngữ điệu — phân biệt được câu hỏi thật với câu hỏi tu từ, đồng ý thật với đồng ý miễn cưỡng.',
    challenge:
      'Mười bốn ngày, mỗi ngày nghe một đoạn hội thoại và ghi lại: người nói đang thật sự muốn gì, dấu hiệu ngữ điệu nào cho biết điều đó.',
    passCriteria: [
      'Đoán đúng thái độ người nói ≥ 8/10 đoạn',
      'Chép chính tả đạt ≥ 92% trên đoạn A2',
      'Nghe hiểu ý chính podcast tốc độ gốc mà không cần transcript',
    ],
    reward: 'Huy hiệu THẤU ÂM · Bộ 30 đoạn hội thoại có phân tích ngữ điệu',
    unlocks: 'Mở cấp NGHE THẤU',
  },
  {
    id: 'L1-5',
    tierId: 'tier-1',
    no: 5,
    name: 'NGHE THẤU',
    epithet: 'Người đã mở xong cánh cửa thứ nhất',
    entry: 'Đã đạt THẤU ÂM',
    mission:
      'Nghe hiểu nội dung tốc độ tự nhiên với nhiều giọng khác nhau, không cần phụ đề, không cần tua lại.',
    challenge:
      'Bài về đích: nghe một đoạn 5 phút chưa từng gặp, giọng Anh–Úc hoặc Anh–Scotland, rồi kể lại nội dung trong 90 giây.',
    passCriteria: [
      'Hiểu ≥ 85% nội dung tốc độ gốc, giọng lạ, không phụ đề',
      'Kể lại đúng ≥ 80% ý chính trong 90 giây',
      'Tổng giờ nghe tích luỹ ≥ 150 giờ có ghi sổ',
    ],
    reward: 'Huy hiệu KHAI NHĨ · Chứng nhận hoàn thành Tầng 1 · Vinh danh trước cộng đồng',
    unlocks: 'Mở toàn bộ Tầng 2 — KHAI NHÃN',
  },

  /* ================= TẦNG 2 — KHAI NHÃN · MỞ MẮT ======================== */
  {
    id: 'L2-1',
    tierId: 'tier-2',
    no: 1,
    name: 'CHẠM CHỮ',
    epithet: 'Người đọc trọn cuốn sách tiếng Anh đầu tiên',
    entry: 'Đã hoàn thành Tầng 1',
    mission:
      'Đọc hết một cuốn sách từ đầu đến cuối mà không tra từ điển — phá vỡ niềm tin "tôi không đọc nổi sách tiếng Anh".',
    challenge:
      'Đọc trọn hai cuốn truyện phân cấp trong 21 ngày. Quy tắc cứng: gặp từ mới thì đoán và đi tiếp, chỉ đánh dấu chứ không tra.',
    passCriteria: [
      'Hai cuốn đã đọc xong, kể lại được cốt truyện mỗi cuốn trong 2 phút',
      'Tốc độ đọc ≥ 15 trang mỗi giờ',
      'Không quá 5 từ được tra trên mỗi chương',
    ],
    reward: 'Huy hiệu TRANG ĐẦU · Bộ 20 truyện phân cấp có audio đi kèm',
    unlocks: 'Mở cấp LƯỚT DÒNG',
  },
  {
    id: 'L2-2',
    tierId: 'tier-2',
    no: 2,
    name: 'LƯỚT DÒNG',
    epithet: 'Người đọc bằng mắt, không đọc bằng miệng',
    entry: 'Đã đạt CHẠM CHỮ',
    mission:
      'Bỏ thói quen đọc thầm từng chữ trong đầu — thứ chặn tốc độ đọc ở mức nói, khoảng 150 từ mỗi phút.',
    challenge:
      'Mười bốn ngày luyện ba tốc độ đọc: lướt lấy bố cục, quét tìm thông tin, đọc kỹ đoạn cần thiết.',
    passCriteria: [
      'Tốc độ đọc ≥ 200 từ/phút với độ hiểu ≥ 80%',
      'Lướt một bài 1.000 từ trong 2 phút và nêu đúng luận điểm chính',
      'Định vị được thông tin cụ thể trong bài dài dưới 30 giây',
    ],
    reward: 'Huy hiệu MẮT NHANH · Bộ 40 bài đọc phân cấp có bấm giờ',
    unlocks: 'Mở cấp THẤY HÌNH',
  },
  {
    id: 'L2-3',
    tierId: 'tier-2',
    no: 3,
    name: 'THẤY HÌNH',
    epithet: 'Người nhìn ra cấu trúc ẩn dưới câu chữ',
    entry: 'Đã đạt LƯỚT DÒNG',
    mission:
      'Tự rút ra quy luật ngữ pháp từ ví dụ thật, trước khi đọc bất kỳ lời giải thích nào. Đây là cấp quyết định của cả tầng.',
    challenge:
      'Bốn tuần, mỗi tuần một cấu trúc: thu thập 15 ví dụ thật, tự viết ra quy luật bằng lời của mình, rồi mới mở sách đối chiếu.',
    passCriteria: [
      'Bốn quy luật tự rút, mỗi quy luật có 15 ví dụ thật đi kèm',
      'Độ khớp với sách ngữ pháp ≥ 70% cho cả bốn',
      'Viết 5 câu của riêng mình dùng đúng mỗi cấu trúc',
    ],
    reward: 'Huy hiệu MẮT THẤY LUẬT · Sổ Săn Cấu Trúc bản in',
    unlocks: 'Mở cấp ĐỌC Ý',
  },
  {
    id: 'L2-4',
    tierId: 'tier-2',
    no: 4,
    name: 'ĐỌC Ý',
    epithet: 'Người nắm được lập luận, không chỉ nắm nội dung',
    entry: 'Đã đạt THẤY HÌNH',
    mission:
      'Đọc ra bộ khung lập luận của một bài viết: đâu là luận điểm, đâu là bằng chứng, đâu là chỗ tác giả đang lách.',
    challenge:
      'Hai mươi mốt ngày, mỗi ngày một bài báo: nén xuống 100 từ giữ nguyên lập luận, rồi chỉ ra một điểm yếu trong lập luận đó.',
    passCriteria: [
      'Hai mươi mốt bản nén 100 từ, người chưa đọc bài gốc vẫn nắm được lập luận',
      'Chỉ ra được điểm yếu lập luận trong ≥ 15/21 bài',
      'Phân biệt đúng luận điểm và ý kiến trong bài chưa từng đọc',
    ],
    reward: 'Huy hiệu ĐỌC XUYÊN · Bộ 50 bài luận có chú giải lập luận',
    unlocks: 'Mở cấp NHÌN XUYÊN',
  },
  {
    id: 'L2-5',
    tierId: 'tier-2',
    no: 5,
    name: 'NHÌN XUYÊN',
    epithet: 'Người đọc được thứ chưa từng học',
    entry: 'Đã đạt ĐỌC Ý',
    mission:
      'Đọc trôi một văn bản học thuật ở lĩnh vực hoàn toàn xa lạ, dùng ngữ cảnh và cấu trúc để bù cho từ vựng chưa biết.',
    challenge:
      'Bài về đích: đọc một bài 1.200 từ thuộc lĩnh vực bạn chưa từng động tới, trong 8 phút, rồi trả lời 10 câu hỏi hiểu.',
    passCriteria: [
      'Đúng ≥ 8/10 câu hỏi hiểu',
      'Hoàn thành trong 8 phút',
      'Tổng số từ đã đọc tích luỹ ≥ 400.000 từ',
    ],
    reward: 'Huy hiệu KHAI NHÃN · Chứng nhận hoàn thành Tầng 2 · Vinh danh trước cộng đồng',
    unlocks: 'Mở toàn bộ Tầng 3 — KHAI KHẨU',
  },

  /* ================= TẦNG 3 — KHAI KHẨU · MỞ MIỆNG ====================== */
  {
    id: 'L3-1',
    tierId: 'tier-3',
    no: 1,
    name: 'BẬT TIẾNG',
    epithet: 'Người vừa vượt qua nỗi sợ lớn nhất đời mình',
    entry: 'Đã hoàn thành Tầng 2',
    mission:
      'Nói chuyện với một người thật bằng tiếng Anh, lần đầu tiên. Đây không phải cấp độ về ngôn ngữ — đây là cấp độ về can đảm.',
    challenge:
      'Bảy buổi nói 1-1 trong 21 ngày. Chỉ tiêu bắt buộc: nói sai ít nhất 20 lần có chủ đích. Đếm lỗi và ăn mừng chúng.',
    passCriteria: [
      'Bảy buổi đã hoàn thành, có ghi âm',
      'Sổ Lỗi có ≥ 40 mục thu được từ bảy buổi này',
      'Nói liên tục 60 giây về bản thân, không dừng quá 3 giây mỗi lần',
    ],
    reward: 'Huy hiệu PHÁ RÀO · Bộ 100 câu mở đầu hội thoại có audio mẫu',
    unlocks: 'Mở cấp NỐI CÂU',
  },
  {
    id: 'L3-2',
    tierId: 'tier-3',
    no: 2,
    name: 'NỐI CÂU',
    epithet: 'Người nói được đoạn, không chỉ nói được câu',
    entry: 'Đã đạt BẬT TIẾNG',
    mission:
      'Nối các câu rời rạc thành một đoạn có mạch — và nói vòng được khi không nhớ ra từ, thay vì tắc tị.',
    challenge:
      'Hai mươi mốt ngày chạy nghi thức tự nói ba mốc. Mỗi tuần một lần dùng kỹ thuật 4/3/2: kể cùng một câu chuyện trong 4 phút, rồi 3, rồi 2.',
    passCriteria: [
      'Nói liên tục 2 phút, dưới 5 lần ngập ngừng dài mỗi phút',
      'Tốc độ nói ≥ 100 từ/phút',
      'Nói vòng thành công khi thiếu từ, không chuyển sang tiếng Việt',
    ],
    reward: 'Huy hiệu MẠCH NỐI · Bộ 60 cụm câu giờ và cụm nối ý tự nhiên',
    unlocks: 'Mở cấp GIỮ MẠCH',
  },
  {
    id: 'L3-3',
    tierId: 'tier-3',
    no: 3,
    name: 'GIỮ MẠCH',
    epithet: 'Người không sập câu giữa chừng',
    entry: 'Đã đạt NỐI CÂU',
    mission:
      'Giữ được mạch trong đoạn nói dài và tự sửa giữa chừng mà không mất dòng suy nghĩ.',
    challenge:
      'Hai mươi tám ngày, mỗi ngày một cue card bốc thăm: chuẩn bị 1 phút, nói 2 phút, ghi âm và tự chấm.',
    passCriteria: [
      'Nói đủ 2 phút trong ≥ 25/28 lần, không dừng sớm',
      'Dưới 4 từ đệm mỗi phút',
      'Tự sửa mượt ≥ 5 lần mà không mất mạch',
    ],
    reward: 'Huy hiệu MẠCH VỮNG · Bộ 200 cue card có audio mẫu Band 8',
    unlocks: 'Mở cấp DẪN CHUYỆN',
  },
  {
    id: 'L3-4',
    tierId: 'tier-3',
    no: 4,
    name: 'DẪN CHUYỆN',
    epithet: 'Người khiến người khác muốn nghe tiếp',
    entry: 'Đã đạt GIỮ MẠCH',
    mission:
      'Kể chuyện có cao trào, có cảm xúc, có nhịp — nói để người ta muốn nghe, không chỉ để truyền đạt thông tin.',
    challenge:
      'Hai mươi mốt ngày, mỗi ngày kể một câu chuyện 3 phút theo khung năm phần. Mỗi tuần kể trước nhóm ít nhất một lần.',
    passCriteria: [
      'Ba lần kể trước nhóm, người nghe xác nhận có bị cuốn',
      'Dùng được ngữ điệu để tạo cao trào, nghe rõ trên bản ghi âm',
      'Tốc độ nói ≥ 130 từ/phút, dưới 3 từ đệm mỗi phút',
    ],
    reward: 'Huy hiệu CHUYỆN HAY · Bộ 40 khung kể chuyện có phân tích',
    unlocks: 'Mở cấp THUYẾT PHỤC',
  },
  {
    id: 'L3-5',
    tierId: 'tier-3',
    no: 5,
    name: 'THUYẾT PHỤC',
    epithet: 'Người bảo vệ được cả hai phía của một vấn đề',
    entry: 'Đã đạt DẪN CHUYỆN',
    mission:
      'Tranh biện thuyết phục ở lập trường được bốc thăm — kể cả lập trường mình không đồng ý.',
    challenge:
      'Bài về đích: bốc thăm lập trường, chuẩn bị 3 phút, tranh biện 5 phút trước hội đồng. Sau đó đổi phía và bác lại chính lập luận vừa rồi của mình.',
    passCriteria: [
      'Thuyết phục được ở cả hai phía, hội đồng xác nhận',
      'Dùng được kỹ thuật nhượng bộ rồi phản biện',
      'Không sập câu khi bị phản bác trực diện',
      'Tổng giờ nói tích luỹ ≥ 100 giờ',
    ],
    reward: 'Huy hiệu KHAI KHẨU · Chứng nhận hoàn thành Tầng 3 · Vinh danh trước cộng đồng',
    unlocks: 'Mở toàn bộ Tầng 4 — KHAI THỦ',
  },

  /* ================= TẦNG 4 — KHAI THỦ · MỞ TAY ========================= */
  {
    id: 'L4-1',
    tierId: 'tier-4',
    no: 1,
    name: 'ĐẶT BÚT',
    epithet: 'Người không còn sợ trang giấy trắng',
    entry: 'Đã hoàn thành Tầng 3',
    mission:
      'Viết liên tục không dừng, không sửa, không tra từ — phá bỏ nỗi sợ trang trắng và tăng tốc độ truy xuất ngôn ngữ.',
    challenge:
      'Ba mươi ngày viết tự do bấm giờ, tăng dần từ 5 lên 15 phút. Vẽ đường tốc độ theo ngày.',
    passCriteria: [
      'Ba mươi bản viết tự do, không ngày nào trống',
      'Tốc độ đạt ≥ 150 từ trong 15 phút',
      'Không dùng từ điển hay công cụ dịch trong lúc viết',
    ],
    reward: 'Huy hiệu BÚT CHẢY · Bộ 100 đề viết tự do theo chủ đề',
    unlocks: 'Mở cấp DỰNG Ý',
  },
  {
    id: 'L4-2',
    tierId: 'tier-4',
    no: 2,
    name: 'DỰNG Ý',
    epithet: 'Người có dàn ý trước khi có câu chữ',
    entry: 'Đã đạt ĐẶT BÚT',
    mission:
      'Dựng bộ khung bài viết trong 5 phút: lập trường rõ, hai luận điểm, mỗi luận điểm một ví dụ cụ thể.',
    challenge:
      'Hai mươi mốt ngày, mỗi ngày dựng dàn ý cho một đề khác nhau trong đúng 5 phút. Mỗi tuần chọn hai dàn ý viết thành bài hoàn chỉnh.',
    passCriteria: [
      'Hai mươi mốt dàn ý, mỗi dàn ý dựng trong ≤ 5 phút',
      'Sáu bài hoàn chỉnh đã được chấm',
      'Lập trường nhất quán từ mở bài tới kết bài trong cả sáu bài',
    ],
    reward: 'Huy hiệu KHUNG VỮNG · Ngân hàng 12 ví dụ đa dụng + 6 khung lập luận',
    unlocks: 'Mở cấp LẬP LUẬN',
  },
  {
    id: 'L4-3',
    tierId: 'tier-4',
    no: 3,
    name: 'LẬP LUẬN',
    epithet: 'Người viết có bằng chứng, không viết bằng cảm tính',
    entry: 'Đã đạt DỰNG Ý',
    mission:
      'Viết đoạn có lập luận chặt: khẳng định, lý lẽ, bằng chứng cụ thể, và chốt lại về đề bài.',
    challenge:
      'Hai mươi tám ngày, mỗi tuần hai bài luận hoàn chỉnh bấm giờ 40 phút. Mỗi bài phải có bản làm lại sau khi nhận phản hồi.',
    passCriteria: [
      'Tám bài có chấm, tám bản làm lại',
      'Mỗi luận điểm đều có ví dụ cụ thể, có tên và có số',
      'Trả lời trọn vẹn mọi phần của câu hỏi trong cả tám bài',
    ],
    reward: 'Huy hiệu LÝ SẮC · Bộ 60 bài mẫu Band 8–9 có mổ xẻ từng câu',
    unlocks: 'Mở cấp MÀI SẮC',
  },
  {
    id: 'L4-4',
    tierId: 'tier-4',
    no: 4,
    name: 'MÀI SẮC',
    epithet: 'Người tự chấm được bài của chính mình',
    entry: 'Đã đạt LẬP LUẬN',
    mission:
      'Trở thành giám khảo của chính mình — tự chấm sai lệch dưới 0,5 band so với người chấm chuyên môn.',
    challenge:
      'Mười bài liên tiếp: tự chấm bốn tiêu chí kèm lý do TRƯỚC khi nộp, ghi độ lệch so với điểm cố vấn.',
    passCriteria: [
      'Độ lệch tự chấm ≤ 0,5 band trong 3 bài liên tiếp cuối',
      'Tỉ lệ câu không lỗi ≥ 55%',
      'Ba lỗi mục tiêu đã được đánh dấu ĐÓNG trong Sổ Lỗi',
    ],
    reward: 'Huy hiệu MẮT GIÁM KHẢO · Bộ tiêu chí chấm đã chú giải + 30 bài chấm mẫu',
    unlocks: 'Mở cấp TÁC THÀNH',
  },
  {
    id: 'L4-5',
    tierId: 'tier-4',
    no: 5,
    name: 'TÁC THÀNH',
    epithet: 'Người đã tạo ra thứ có người lạ thật sự dùng',
    entry: 'Đã đạt MÀI SẮC',
    mission:
      'Làm ra một sản phẩm hoàn chỉnh bằng tiếng Anh, công khai, và có người lạ tương tác thật với nó.',
    challenge:
      'Bài về đích: chọn một trong ba dạng — bài blog 1.200 từ, video hướng dẫn 10 phút, hoặc bản báo cáo có biểu đồ. Công bố công khai và thu về ít nhất năm phản hồi từ người lạ.',
    passCriteria: [
      'Sản phẩm đã công bố công khai, có đường dẫn',
      'Ít nhất năm phản hồi từ người không quen biết',
      'Bản thứ hai đã sửa theo phản hồi nhận được',
      'Tổng số từ đã viết tích luỹ ≥ 80.000 từ',
    ],
    reward: 'Huy hiệu KHAI THỦ · Chứng nhận hoàn thành Tầng 4 · Sản phẩm được trưng bày trong học viện',
    unlocks: 'Mở toàn bộ Tầng 5 — KHAI ĐẠO',
  },

  /* ================= TẦNG 5 — KHAI ĐẠO · MỞ ĐƯỜNG ======================= */
  {
    id: 'L5-1',
    tierId: 'tier-5',
    no: 1,
    name: 'KỂ LẠI',
    epithet: 'Người giảng được điều mình vừa học',
    entry: 'Đã hoàn thành Tầng 4',
    mission:
      'Giảng lại một khái niệm trong 90 giây cho người chưa biết gì, không dùng thuật ngữ. Chỗ ấp úng chính là chỗ chưa nắm.',
    challenge:
      'Hai mươi mốt ngày, mỗi ngày giảng lại một khái niệm trong 90 giây, có ghi hình. Bảy lần giảng cho người thật.',
    passCriteria: [
      'Hai mươi mốt bản ghi hình 90 giây',
      'Bảy người nghe xác nhận hiểu được sau khi nghe',
      'Không dùng thuật ngữ trong bất kỳ bản nào',
    ],
    reward: 'Huy hiệu LỜI TRONG · Bộ 50 khái niệm cần giảng lại',
    unlocks: 'Mở cấp CHỈ ĐƯỜNG',
  },
  {
    id: 'L5-2',
    tierId: 'tier-5',
    no: 2,
    name: 'CHỈ ĐƯỜNG',
    epithet: 'Người kèm được một học viên đi hết một chặng',
    entry: 'Đã đạt KỂ LẠI',
    mission:
      'Kèm một học viên tầng dưới đi trọn một cấp độ — học cách đặt câu hỏi thay vì đưa đáp án.',
    challenge:
      'Sáu tuần kèm một học viên tầng 1 hoặc 2. Mỗi tuần một buổi 30 phút, có biên bản. Người được kèm phải lên cấp.',
    passCriteria: [
      'Người được kèm đã lên được một cấp',
      'Sáu biên bản buổi kèm',
      'Tỉ lệ thời lượng nói: người được kèm nói ≥ 60%',
    ],
    reward: 'Huy hiệu TAY DẪN · Bộ câu hỏi cố vấn 120 câu theo tình huống',
    unlocks: 'Mở cấp DẪN NHÓM',
  },
  {
    id: 'L5-3',
    tierId: 'tier-5',
    no: 3,
    name: 'DẪN NHÓM',
    epithet: 'Người điều phối được một buổi có bảy người nói',
    entry: 'Đã đạt CHỈ ĐƯỜNG',
    mission:
      'Dẫn một buổi Club: giữ nhịp, chia lượt nói công bằng, xử lý người im lặng và người nói lấn.',
    challenge:
      'Dẫn tám buổi Club trong tám tuần. Sau mỗi buổi thu phiếu đánh giá ẩn danh từ thành viên.',
    passCriteria: [
      'Tám buổi đã dẫn',
      'Điểm đánh giá trung bình ≥ 4/5',
      'Không buổi nào có thành viên nói dưới 20% mức trung bình của nhóm',
    ],
    reward: 'Huy hiệu NHỊP NHÓM · Bộ kịch bản dẫn 7 loại club + xử lý 20 tình huống khó',
    unlocks: 'Mở cấp TRUYỀN LỬA',
  },
  {
    id: 'L5-4',
    tierId: 'tier-5',
    no: 4,
    name: 'TRUYỀN LỬA',
    epithet: 'Người kéo được người khác quay lại khi họ muốn bỏ',
    entry: 'Đã đạt DẪN NHÓM',
    mission:
      'Làm chủ kỹ năng khó nhất của nghề cố vấn: giữ lại một người đang muốn bỏ cuộc, bằng cách bắt nhịp trước khi dẫn dắt.',
    challenge:
      'Sáu tuần phụ trách nhóm có nguy cơ bỏ. Thực hiện ít nhất năm cuộc gọi cứu người theo đúng phác đồ bắt nhịp rồi dẫn dắt.',
    passCriteria: [
      'Năm cuộc gọi đã thực hiện, có ghi chép',
      'Ít nhất ba người quay lại và giữ chuỗi thêm bốn tuần',
      'Không cuộc gọi nào dùng lý lẽ trước khi bắt nhịp đủ',
    ],
    reward: 'Huy hiệu GIỮ LỬA · Bộ phác đồ cứu học viên + 30 tình huống mẫu có lời thoại',
    unlocks: 'Mở cấp KHAI ĐẠO',
  },
  {
    id: 'L5-5',
    tierId: 'tier-5',
    no: 5,
    name: 'KHAI ĐẠO',
    epithet: 'Người mở đường cho những người đi sau',
    entry: 'Đã đạt TRUYỀN LỬA',
    mission:
      'Đóng góp lại cho hệ thống: biến hành trình của mình thành tài sản dùng được cho người đi sau.',
    challenge:
      'Bài về đích: thiết kế và chạy trọn một chu kỳ cấp độ cho một nhóm mới — từ pha GIEO tới pha THĂNG — với tài liệu do chính bạn biên soạn.',
    passCriteria: [
      'Một chu kỳ hoàn chỉnh đã chạy, có nhóm học viên thật',
      'Bộ tài liệu tự biên soạn đã được đưa vào thư viện học viện',
      'Ít nhất năm học viên trong nhóm đã lên cấp',
      'IELTS chính thức đạt mục tiêu đã đặt ra ở La Bàn',
    ],
    reward:
      'Huy hiệu KHAI ĐẠO SƯ · Chứng nhận hoàn thành toàn bộ 25 cấp độ · Tên được khắc vào bảng vàng học viện · Tư cách cố vấn chính thức',
    unlocks: 'Hành trình học kết thúc. Hành trình dẫn dắt bắt đầu.',
  },
];

export const LEVELS_BY_TIER = (tierId: string) =>
  LEVELS.filter((l) => l.tierId === tierId);

export const LEVEL_BY_ID = Object.fromEntries(LEVELS.map((l) => [l.id, l]));
