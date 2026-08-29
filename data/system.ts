/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {Pillar} from '../types';

/* ==========================================================================
   ENGWIN365 — Hiến chương hệ thống
   ========================================================================== */

export const NORTH_STAR = {
  name: 'ENGWIN365',
  meaning: 'ENGlish + WIN + 365 — Tiếng Anh không phải tài năng, là 365 lần THẮNG chính mình.',
  promise:
    'Từ con số 0 đến IELTS 8.0 trong 36 tháng, bằng một hệ thống vận hành hằng ngày — không dựa vào cảm hứng.',
  bigBet:
    'Người thắng không phải người học nhiều nhất trong 1 ngày, mà là người KHÔNG BỎ NGÀY NÀO trong 1095 ngày.',
  equation: 'Kết quả = (Input dễ hiểu × Output có sửa) ^ Thời gian đều đặn',
  totalDays: 1095,
  totalWeeks: 156,
  totalMonths: 36,
  targetBand: 8.0,
  targetCefr: 'C1+',
  targetVocab: 10000,
  targetInputHours: 1800,
  targetSpeakingHours: 300,
  targetWordsWritten: 150000,
};

/** 5 luật bất biến — vi phạm luật nào là hỏng hệ thống ở đó. */
export const LAWS = [
  {
    no: 1,
    name: 'Luật Không Số Không',
    statement:
      'Mỗi ngày phải có ít nhất 1 điểm chạm tiếng Anh, dù chỉ 2 phút. Chuỗi ngày quan trọng hơn độ dài buổi học.',
    violation: 'Học 5 tiếng thứ Bảy rồi im lặng 6 ngày → não coi tiếng Anh là sự kiện, không phải môi trường.',
  },
  {
    no: 2,
    name: 'Luật i+1',
    statement:
      'Tài liệu đúng là tài liệu bạn hiểu 90–98% mà vẫn còn 2–10% mới. Dưới 90% là tra từ điển, trên 98% là giải trí.',
    violation: 'Nghe TED ở trình độ A1 → 0% hấp thụ, 100% chán nản, bỏ cuộc trong 3 tuần.',
  },
  {
    no: 3,
    name: 'Luật Đầu Ra Bắt Buộc',
    statement:
      'Mọi thứ nạp vào phải có đường ra trong 48 giờ: nói lại, viết lại, hoặc dạy lại. Input không có output là giải trí.',
    violation: 'Xem 300 giờ Netflix mà không nói câu nào → hiểu tốt, nói vẫn ú ớ.',
  },
  {
    no: 4,
    name: 'Luật Phản Hồi',
    statement:
      'Luyện tập không có người/máy sửa lỗi chỉ khắc sâu lỗi sai. Mỗi tuần tối thiểu 1 vòng phản hồi có chất lượng.',
    violation: 'Nói sai /s/ cuối trong 3 năm → thành hoá thạch (fossilization), sửa gấp 10 lần công.',
  },
  {
    no: 5,
    name: 'Luật Đo Lường',
    statement:
      'Cái gì không đo được thì không cải thiện được. Mỗi tuần ghi 5 con số, mỗi quý thi thử 1 lần.',
    violation: 'Học 2 năm bằng cảm giác "chắc là tiến bộ" → thi thử lần đầu Band 5.5, sụp đổ động lực.',
  },
];

/** 7 trụ cột — mọi hoạt động trong hệ thống đều thuộc về một trụ. */
export const PILLARS: Pillar[] = [
  {
    id: 'input',
    name: 'INPUT — Nạp dễ hiểu',
    motto: 'Bạn không học ngôn ngữ. Bạn hấp thụ nó.',
    why:
      'Giả thuyết Đầu vào Dễ hiểu (Krashen): ngôn ngữ được tiếp thu khi ta hiểu thông điệp hơi vượt trình độ hiện tại (i+1). Đây là nguồn nhiên liệu duy nhất — không có input, mọi kỹ thuật khác chạy trong chân không.',
    law: 'Tối thiểu 50% tổng thời gian học. Cả hành trình cần ~1.800 giờ input dễ hiểu.',
    dailyShare: '50%',
    icon: '📥',
  },
  {
    id: 'output',
    name: 'OUTPUT — Ép nói & viết',
    motto: 'Bạn chỉ thực sự biết điều bạn tự tạo ra được.',
    why:
      'Giả thuyết Đầu ra (Swain): khi buộc phải nói/viết, não phát hiện "lỗ hổng" giữa điều muốn nói và điều nói được — chính khoảnh khắc đó kích hoạt học sâu. Output biến từ vựng bị động thành chủ động.',
    law: 'Tối thiểu 25% thời gian. 300 giờ nói + 150.000 từ viết trong 36 tháng.',
    dailyShare: '25%',
    icon: '📤',
  },
  {
    id: 'memory',
    name: 'MEMORY — Ghi nhớ có kỷ luật',
    motto: 'Quên là tính năng, không phải lỗi. Hãy lập lịch cho nó.',
    why:
      'Đường cong quên Ebbinghaus + Hiệu ứng giãn cách (Cepeda) + Truy hồi chủ động (Roediger): ôn đúng lúc sắp quên tạo trí nhớ bền gấp 3–5 lần đọc lại. FSRS/Anki tự động hoá việc chọn "đúng lúc".',
    law: '15% thời gian. Không quá 20 thẻ mới/ngày ở năm 1. Không bao giờ bỏ ngày ôn.',
    dailyShare: '15%',
    icon: '🧠',
  },
  {
    id: 'sound',
    name: 'SOUND — Làm chủ âm thanh',
    motto: 'Nếu miệng không phát ra được, tai sẽ không nghe thấy.',
    why:
      'Người Việt mất điểm nghe không vì thiếu từ, mà vì không nhận diện được âm nối, âm yếu, âm cuối. Shadowing (Arguelles) + chép chính tả rèn đồng thời cả tai và miệng bằng một mũi tên.',
    law: '10% thời gian nhưng là 10% có đòn bẩy cao nhất cho Band Listening & Speaking.',
    dailyShare: '10%',
    icon: '🔊',
  },
  {
    id: 'thinking',
    name: 'THINKING — Lập trình tư duy',
    motto: 'Bạn không thể diễn đạt bằng tiếng Anh điều bạn chưa nghĩ rõ bằng bất kỳ ngôn ngữ nào.',
    why:
      'Band 7 lên Band 8 hiếm khi là vấn đề ngôn ngữ — đó là vấn đề tư duy: lập luận rời rạc, ví dụ chung chung, không có lập trường. Rèn khung tư duy phản biện đẩy Writing/Speaking vượt trần.',
    law: 'Mỗi ngày 1 câu hỏi tư duy. Mỗi tuần 1 bài lập luận có phản đề.',
    dailyShare: 'Đan xen',
    icon: '🧭',
  },
  {
    id: 'habit',
    name: 'HABIT — Kiến trúc thói quen',
    motto: 'Ý chí là nguồn lực cạn kiệt. Hệ thống thì không.',
    why:
      'Atomic Habits (Clear) + Tiny Habits (Fogg) + Ý định thực thi (Gollwitzer): thiết kế môi trường và tín hiệu để hành vi tự động xảy ra, thay vì mỗi ngày phải "quyết tâm" lại từ đầu.',
    law: 'Mỗi quý cài đúng 1–2 thói quen mới. Không bao giờ bỏ lỡ 2 ngày liên tiếp.',
    dailyShare: 'Nền tảng',
    icon: '⚙️',
  },
  {
    id: 'community',
    name: 'COMMUNITY — Club & trách nhiệm',
    motto: 'Bạn học nhanh gấp đôi khi có người chờ bạn xuất hiện.',
    why:
      'Thuyết Tự quyết (Deci & Ryan): động lực bền vững cần Tự chủ + Năng lực + Kết nối. Club cung cấp "Kết nối" — yếu tố mà người tự học một mình luôn thiếu và là lý do #1 khiến họ bỏ cuộc ở tháng thứ 4.',
    law: 'Tối thiểu 2 buổi club/tuần, không thương lượng. Vắng phải báo trước.',
    dailyShare: '2 buổi/tuần',
    icon: '🤝',
  },
];

/** Quỹ đạo mục tiêu theo từng quý — dùng để vẽ biểu đồ tiến trình. */
export const TRAJECTORY = [
  {q: 'Xuất phát', month: 0, band: 0.0, vocab: 300, cefr: 'Pre-A1', inputHours: 0},
  {q: 'Y1Q1', month: 3, band: 3.0, vocab: 800, cefr: 'A1', inputHours: 90},
  {q: 'Y1Q2', month: 6, band: 4.0, vocab: 1500, cefr: 'A2', inputHours: 200},
  {q: 'Y1Q3', month: 9, band: 4.5, vocab: 2200, cefr: 'A2+', inputHours: 320},
  {q: 'Y1Q4', month: 12, band: 5.0, vocab: 3000, cefr: 'B1', inputHours: 450},
  {q: 'Y2Q1', month: 15, band: 5.5, vocab: 3800, cefr: 'B1+', inputHours: 600},
  {q: 'Y2Q2', month: 18, band: 6.0, vocab: 4800, cefr: 'B2', inputHours: 760},
  {q: 'Y2Q3', month: 21, band: 6.5, vocab: 5800, cefr: 'B2', inputHours: 920},
  {q: 'Y2Q4', month: 24, band: 6.5, vocab: 6800, cefr: 'B2+', inputHours: 1080},
  {q: 'Y3Q1', month: 27, band: 7.0, vocab: 7800, cefr: 'C1', inputHours: 1260},
  {q: 'Y3Q2', month: 30, band: 7.5, vocab: 8800, cefr: 'C1', inputHours: 1440},
  {q: 'Y3Q3', month: 33, band: 7.5, vocab: 9500, cefr: 'C1+', inputHours: 1620},
  {q: 'Y3Q4', month: 36, band: 8.0, vocab: 10000, cefr: 'C1+', inputHours: 1800},
];

/** Ngân sách thời gian mỗi ngày theo năm. */
export const TIME_BUDGET = [
  {
    year: 1,
    label: 'Năm 1 — Xây nền',
    daily: '75 phút/ngày (tối thiểu 45)',
    split: [
      {pillar: 'Input dễ hiểu', minutes: 35},
      {pillar: 'Âm thanh (shadowing/dictation)', minutes: 15},
      {pillar: 'Ghi nhớ (Anki)', minutes: 15},
      {pillar: 'Output (nói/viết ngắn)', minutes: 10},
    ],
  },
  {
    year: 2,
    label: 'Năm 2 — Mở rộng',
    daily: '105 phút/ngày (tối thiểu 60)',
    split: [
      {pillar: 'Input dễ hiểu', minutes: 45},
      {pillar: 'Output (nói/viết dài)', minutes: 30},
      {pillar: 'Ghi nhớ (Anki + collocation)', minutes: 15},
      {pillar: 'Âm thanh + tư duy', minutes: 15},
    ],
  },
  {
    year: 3,
    label: 'Năm 3 — Chinh phục',
    daily: '135 phút/ngày (tối thiểu 90)',
    split: [
      {pillar: 'Input học thuật', minutes: 40},
      {pillar: 'Output có chấm chữa', minutes: 45},
      {pillar: 'Luyện đề & chiến thuật', minutes: 30},
      {pillar: 'Ghi nhớ + sửa lỗi', minutes: 20},
    ],
  },
];
