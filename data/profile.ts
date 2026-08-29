/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  ProfileQuestion,
  Profile,
  DerivedPlan,
  DerivedBlock,
  FeasibilityVerdict,
} from '../types';
import {MILESTONES} from './roadmap';

/* ==========================================================================
   CÁ NHÂN HOÁ — 13 câu hỏi và bộ máy suy dẫn
   Nguyên tắc: mọi con số đầu ra đều tính từ quỹ đạo giờ học có thật trong
   hệ thống, không phải từ lời động viên. Nếu mục tiêu không khả thi với quỹ
   thời gian bạn có, bộ máy này nói thẳng và đưa ra ba đòn bẩy cụ thể.
   ========================================================================== */

export const QUESTIONS: ProfileQuestion[] = [
  {
    id: 'level',
    section: 'Định vị',
    question: 'Trình độ thật của tôi hiện nay',
    help: 'Chọn mô tả nào đúng NHẤT với bạn hôm nay, không phải trình độ bạn từng có thời đi học. Chọn cao hơn thực tế là tự phá nền của chính mình.',
    kind: 'single',
    options: [
      {id: 'zero', label: 'Gần như từ số 0', hint: 'Không nghe được câu nào, không nói được câu nào'},
      {id: 'basic', label: 'Mất gốc — biết chữ, biết vài trăm từ', hint: 'Đọc được biển hiệu, nhưng nghe và nói thì không'},
      {id: 'a1', label: 'A1 — hiểu câu chậm, nói được câu đơn', hint: 'Giới thiệu được tên tuổi, nghề nghiệp'},
      {id: 'a2', label: 'A2 — giao tiếp cơ bản', hint: 'Đặt món, hỏi đường, đọc được truyện đơn giản'},
      {id: 'a2plus', label: 'A2+ — nói được 2 phút chủ đề quen', hint: 'Còn ngập ngừng nhiều, sai ngữ pháp nhiều'},
      {id: 'b1', label: 'B1 ~ IELTS 5.0', hint: 'Đọc được tiểu thuyết đơn giản, nghe hiểu ~60% podcast chậm'},
      {id: 'b2low', label: 'B2 thấp ~ IELTS 6.0', hint: 'Làm việc được bằng tiếng Anh ở mức cơ bản'},
      {id: 'b2', label: 'B2 ~ IELTS 6.5', hint: 'Đã thi hoặc thi thử và đạt khoảng 6.5'},
      {id: 'c1', label: 'C1 ~ IELTS 7.0+', hint: 'Đang tìm cách phá trần lên 8.0'},
    ],
  },
  {
    id: 'target',
    section: 'Định vị',
    question: 'Mục tiêu tôi thật sự cần',
    help: 'Đừng chọn 8.0 theo quán tính. Rất nhiều mục đích chỉ cần 6.5 hoặc 7.0 — và chênh lệch giữa 7.0 và 8.0 là hơn 500 giờ học.',
    kind: 'single',
    options: [
      {id: '6.0', label: 'IELTS 6.0', hint: 'Đủ cho phần lớn chương trình đại học và nhiều visa'},
      {id: '6.5', label: 'IELTS 6.5', hint: 'Ngưỡng phổ biến nhất cho du học thạc sĩ'},
      {id: '7.0', label: 'IELTS 7.0', hint: 'Trường tốt, một số ngành yêu cầu cao'},
      {id: '7.5', label: 'IELTS 7.5', hint: 'Trường top, định cư một số nước'},
      {id: '8.0', label: 'IELTS 8.0', hint: 'Học bổng cạnh tranh, định cư điểm cao'},
      {id: '8.5', label: 'IELTS 8.5', hint: 'Rất ít mục đích thật sự cần mức này'},
    ],
  },
  {
    id: 'deadline',
    section: 'Định vị',
    question: 'Tôi cần đạt mục tiêu trong bao lâu',
    kind: 'single',
    options: [
      {id: '12', label: '12 tháng'},
      {id: '18', label: '18 tháng'},
      {id: '24', label: '24 tháng'},
      {id: '36', label: '36 tháng'},
      {id: '48', label: '48 tháng'},
      {id: 'none', label: 'Không có hạn cứng', hint: 'Học tới khi đạt thì thôi'},
    ],
  },
  {
    id: 'daily',
    section: 'Quỹ thời gian',
    question: 'Quỹ thời gian THẬT tôi có mỗi ngày',
    help: 'Con số bạn chắc chắn giữ được cả những tuần bận nhất, không phải con số ngày rảnh. Chọn cao hơn thực tế là lý do số một khiến lộ trình sụp ở tuần thứ ba.',
    kind: 'single',
    options: [
      {id: '30', label: '30 phút'},
      {id: '45', label: '45 phút'},
      {id: '60', label: '60 phút'},
      {id: '75', label: '75 phút'},
      {id: '105', label: '105 phút'},
      {id: '135', label: '135 phút trở lên'},
    ],
  },
  {
    id: 'peak',
    section: 'Quỹ thời gian',
    question: 'Khung giờ đầu óc tôi sắc nhất',
    help: 'Khối việc khó nhất phải rơi vào đúng khung này, bất kể nó là 5 giờ sáng hay 22 giờ đêm. Đây không phải chuyện kỷ luật, đây là chuyện sinh học.',
    kind: 'single',
    options: [
      {id: 'dawn', label: '05:00 – 07:00', hint: 'Trước khi cả nhà thức dậy'},
      {id: 'morning', label: '07:00 – 09:00'},
      {id: 'noon', label: '11:00 – 14:00', hint: 'Giờ nghỉ trưa'},
      {id: 'afternoon', label: '15:00 – 18:00'},
      {id: 'evening', label: '20:00 – 22:00'},
      {id: 'night', label: 'Sau 22:00', hint: 'Cú đêm thật sự'},
    ],
  },
  {
    id: 'busydays',
    section: 'Quỹ thời gian',
    question: 'Những ngày trong tuần tôi gần như chắc chắn bận',
    help: 'Chọn thật. Những ngày này sẽ được xếp sẵn phiên bản Ngày Bận, để bạn không phải quyết định gì khi mệt.',
    kind: 'multi',
    options: [
      {id: 'T2', label: 'Thứ Hai'},
      {id: 'T3', label: 'Thứ Ba'},
      {id: 'T4', label: 'Thứ Tư'},
      {id: 'T5', label: 'Thứ Năm'},
      {id: 'T6', label: 'Thứ Sáu'},
      {id: 'T7', label: 'Thứ Bảy'},
      {id: 'CN', label: 'Chủ Nhật'},
    ],
  },
  {
    id: 'commute',
    section: 'Quỹ thời gian',
    question: 'Mỗi ngày tôi đi lại khoảng',
    help: 'Đây là thời gian vốn đã bỏ đi. Biến nó thành giờ nghe là cách rẻ nhất để tăng quỹ học mà không đụng vào lịch sống.',
    kind: 'single',
    options: [
      {id: '0', label: 'Hầu như không', hint: 'Làm ở nhà'},
      {id: '20', label: 'Khoảng 20 phút'},
      {id: '40', label: 'Khoảng 40 phút'},
      {id: '60', label: 'Khoảng 60 phút'},
      {id: '90', label: '90 phút trở lên'},
    ],
  },
  {
    id: 'speakhome',
    section: 'Bối cảnh',
    question: 'Tôi có nói to tiếng Anh ở nhà được không',
    help: 'Shadowing và tự nói đòi hỏi phát ra tiếng. Nếu không nói to được, lộ trình phải đổi cách chứ không được bỏ khối này.',
    kind: 'single',
    options: [
      {id: 'free', label: 'Thoải mái', hint: 'Có phòng riêng, không ngại ai'},
      {id: 'limited', label: 'Hạn chế', hint: 'Nói nhỏ được, không nói to được'},
      {id: 'no', label: 'Gần như không', hint: 'Ở ghép, nhà đông người, sợ làm phiền'},
    ],
  },
  {
    id: 'budget',
    section: 'Bối cảnh',
    question: 'Ngân sách tôi chi được mỗi tháng',
    help: 'Gần như toàn bộ hệ thống chạy được với 0 đồng. Khoản duy nhất khó thay thế là người sửa lỗi cho bạn.',
    kind: 'single',
    options: [
      {id: '0', label: '0 đồng', hint: 'Chỉ dùng nguồn miễn phí'},
      {id: '300', label: 'Dưới 300 nghìn'},
      {id: '800', label: '300 – 800 nghìn'},
      {id: '2000', label: '800 nghìn – 2 triệu'},
      {id: '2000+', label: 'Trên 2 triệu'},
    ],
  },
  {
    id: 'traits',
    section: 'Con người tôi',
    question: 'Những câu nào mô tả đúng tôi (chọn tất cả câu đúng)',
    help: 'Chọn thật lòng, không chọn theo hình mẫu bạn muốn trở thành. Kết quả quyết định lộ trình được chỉnh theo hướng nào.',
    kind: 'multi',
    options: [
      {id: 't1', label: 'Tôi khó chịu khi không hiểu vì sao câu này đúng', weights: {'ar-analyst': 3, 'ar-disciplined': 1}},
      {id: 't2', label: 'Tôi học nhanh nhất khi có người ngồi đối diện', weights: {'ar-social': 3}},
      {id: 't3', label: 'Ngồi học một mình quá 30 phút là tôi chán', weights: {'ar-social': 2, 'ar-creative': 2}},
      {id: 't4', label: 'Tôi đọc nhanh và thích đọc', weights: {'ar-reader': 3}},
      {id: 't5', label: 'Tôi hiểu nhiều hơn hẳn những gì tôi nói được', weights: {'ar-reader': 3, 'ar-analyst': 1}},
      {id: 't6', label: 'Tôi đã từng duy trì một thói quen khó trên một năm', weights: {'ar-disciplined': 3}},
      {id: 't7', label: 'Tôi thích bảng biểu, con số, hệ thống', weights: {'ar-disciplined': 3, 'ar-analyst': 1}},
      {id: 't8', label: 'Tôi chán rất nhanh với việc lặp đi lặp lại', weights: {'ar-creative': 3}},
      {id: 't9', label: 'Tôi học tốt qua phim, nhạc, truyện hơn qua giáo trình', weights: {'ar-creative': 3}},
      {id: 't10', label: 'Tôi không ngại nói sai trước mặt người khác', weights: {'ar-social': 3}},
      {id: 't11', label: 'Tôi đã bắt đầu học tiếng Anh nhiều lần rồi bỏ', weights: {'ar-comeback': 4}},
      {id: 't12', label: 'Tôi mang cảm giác mình không có năng khiếu ngoại ngữ', weights: {'ar-comeback': 3}},
    ],
  },
  {
    id: 'quits',
    section: 'Con người tôi',
    question: 'Tôi đã bắt đầu rồi bỏ dở việc học tiếng Anh bao nhiêu lần',
    help: 'Câu này không để phán xét. Số lần bỏ càng cao thì trọng số của thói quen và cộng đồng trong lộ trình càng phải lớn.',
    kind: 'single',
    options: [
      {id: '0', label: 'Chưa lần nào', hint: 'Đây là lần đầu tôi làm nghiêm túc'},
      {id: '1', label: '1 – 2 lần'},
      {id: '3', label: '3 lần trở lên', hint: 'Nói thật thì hệ thống mới bảo vệ được bạn'},
    ],
  },
  {
    id: 'social',
    section: 'Con người tôi',
    question: 'Tôi làm việc tốt hơn khi',
    kind: 'single',
    options: [
      {id: 'alone', label: 'Một mình', hint: 'Có người nhìn là tôi mất tập trung'},
      {id: 'mixed', label: 'Tuỳ việc', hint: 'Việc sâu thì một mình, việc luyện thì có người'},
      {id: 'group', label: 'Có người cùng', hint: 'Một mình là tôi bỏ'},
    ],
  },
  {
    id: 'domain',
    section: 'Con người tôi',
    question: 'Lĩnh vực tôi đã có sẵn kiến thức chuyên sâu',
    help: 'Đây sẽ là chủ đề nạp hẹp đầu tiên của bạn — vì có kiến thức nền thì bạn đoán nghĩa được và bớt phải tra từ.',
    kind: 'single',
    options: [
      {id: 'tech', label: 'Công nghệ / Kỹ thuật'},
      {id: 'business', label: 'Kinh doanh / Tài chính'},
      {id: 'health', label: 'Y tế / Sức khoẻ'},
      {id: 'education', label: 'Giáo dục / Đào tạo'},
      {id: 'art', label: 'Nghệ thuật / Truyền thông'},
      {id: 'env', label: 'Môi trường / Khoa học tự nhiên'},
      {id: 'law', label: 'Luật / Hành chính công'},
      {id: 'none', label: 'Không có lĩnh vực nào rõ rệt'},
    ],
  },
];

/* ------------------------- BẢNG THAM CHIẾU ------------------------------- */

/** Số giờ học tích luỹ cần thiết để đạt từng mức band, lấy từ quỹ đạo hệ thống. */
const HOURS_BY_BAND: Record<string, number> = {
  '6.0': 760,
  '6.5': 1080,
  '7.0': 1260,
  '7.5': 1440,
  '8.0': 1800,
  '8.5': 2200,
};

/** Số giờ coi như đã tích luỹ, tương ứng trình độ hiện tại. */
const BANKED_BY_LEVEL: Record<string, number> = {
  zero: 0,
  basic: 40,
  a1: 90,
  a2: 200,
  a2plus: 320,
  b1: 450,
  b2low: 760,
  b2: 1080,
  c1: 1260,
};

/** Cột mốc xuất phát tương ứng trình độ. */
const ENTRY_BY_LEVEL: Record<string, number> = {
  zero: 0,
  basic: 0,
  a1: 1,
  a2: 2,
  a2plus: 3,
  b1: 4,
  b2low: 6,
  b2: 7,
  c1: 8,
};

const PEAK_CLOCK: Record<string, {start: string; label: string; offsets: string[]}> = {
  dawn: {start: '05:45', label: 'sáng sớm', offsets: ['05:45', '06:05', '06:25', '06:45']},
  morning: {start: '07:15', label: 'sáng', offsets: ['07:15', '07:35', '07:55', '08:15']},
  noon: {start: '11:45', label: 'trưa', offsets: ['11:45', '12:05', '12:25', '12:45']},
  afternoon: {start: '15:30', label: 'chiều', offsets: ['15:30', '15:50', '16:10', '16:30']},
  evening: {start: '20:00', label: 'tối', offsets: ['20:00', '20:20', '20:40', '21:00']},
  night: {start: '22:15', label: 'đêm', offsets: ['22:15', '22:35', '22:55', '23:15']},
};

const DOMAIN_TOPIC: Record<string, string> = {
  tech: 'Technology & Artificial Intelligence',
  business: 'Work, Economy & Globalisation',
  health: 'Health & Public Healthcare',
  education: 'Education & Learning',
  art: 'Media, Art & Culture',
  env: 'Environment & Climate',
  law: 'Crime, Law & Government',
  none: 'Education & Learning',
};

const ARCHETYPE_IDS = [
  'ar-analyst',
  'ar-social',
  'ar-reader',
  'ar-disciplined',
  'ar-creative',
  'ar-comeback',
];

/* --------------------------- BỘ MÁY SUY DẪN ------------------------------ */

const num = (v: string | string[] | undefined, fallback = 0) =>
  typeof v === 'string' ? Number(v) || fallback : fallback;

const str = (v: string | string[] | undefined, fallback = '') =>
  typeof v === 'string' ? v : fallback;

const arr = (v: string | string[] | undefined): string[] =>
  Array.isArray(v) ? v : [];

/** Mức band cao nhất đạt được với số giờ cho trước. */
function highestBandWithin(hours: number): string | null {
  const bands = Object.keys(HOURS_BY_BAND).sort(
    (a, b) => HOURS_BY_BAND[b] - HOURS_BY_BAND[a],
  );
  return bands.find((b) => HOURS_BY_BAND[b] <= hours) ?? null;
}

function judgeFeasibility(
  monthsNeeded: number,
  deadline: number | null,
  hoursNeeded: number,
  dailyMinutes: number,
  bankedHours: number,
): FeasibilityVerdict {
  const roundedNeed = Math.ceil(monthsNeeded);

  if (deadline === null) {
    return {
      status: 'du-da',
      label: 'Không có hạn cứng',
      tone: 'emerald',
      message: `Với ${dailyMinutes} phút mỗi ngày, bạn cần khoảng ${roundedNeed} tháng để tích đủ ${Math.round(hoursNeeded)} giờ còn thiếu. Không có hạn nghĩa là bạn được phép ưu tiên tính đều đặn hơn tốc độ — đây là vị thế thuận lợi nhất để đi đường dài.`,
      levers: [],
    };
  }

  const ratio = monthsNeeded / deadline;
  const minutesToHitDeadline = Math.ceil((hoursNeeded * 60) / (deadline * 30.4));
  const reachable = highestBandWithin(bankedHours + (dailyMinutes / 60) * 30.4 * deadline);

  const levers = [
    {
      name: 'Tăng thời gian mỗi ngày',
      detail: `Cần ${minutesToHitDeadline} phút/ngày thay vì ${dailyMinutes} phút để kịp hạn ${deadline} tháng.`,
    },
    {
      name: 'Giãn thời hạn',
      detail: `Giữ nguyên ${dailyMinutes} phút/ngày thì cần ${roundedNeed} tháng, tức chậm hơn hạn ${roundedNeed - deadline} tháng.`,
    },
    {
      name: 'Hạ mục tiêu',
      detail: reachable
        ? `Trong ${deadline} tháng với ${dailyMinutes} phút/ngày, mức thực tế đạt được là IELTS ${reachable}.`
        : `Trong ${deadline} tháng với ${dailyMinutes} phút/ngày, chưa đủ giờ để chạm ngưỡng 6.0. Cần tăng thời gian trước khi bàn tới mục tiêu.`,
    },
  ];

  if (ratio <= 0.9)
    return {
      status: 'du-da',
      label: 'Dư dả',
      tone: 'emerald',
      message: `Cần khoảng ${roundedNeed} tháng, bạn có ${deadline} tháng. Dư ${deadline - roundedNeed} tháng. Đừng dùng phần dư để học nhồi — hãy dùng nó làm đệm cho những tháng ốm đau, công việc dồn, và cho một lần thi lại nếu cần.`,
      levers: [],
    };

  if (ratio <= 1.1)
    return {
      status: 'vua-khit',
      label: 'Vừa khít',
      tone: 'sky',
      message: `Cần khoảng ${roundedNeed} tháng, bạn có ${deadline} tháng. Khả thi nhưng không còn chỗ cho sai sót: một tháng đứt quãng là trễ hạn. Hãy giữ chuỗi ngày như giữ tính mạng của kế hoạch này.`,
      levers: levers.slice(0, 2),
    };

  if (ratio <= 1.5)
    return {
      status: 'cang',
      label: 'Căng — phải chỉnh',
      tone: 'amber',
      message: `Cần khoảng ${roundedNeed} tháng nhưng bạn chỉ có ${deadline} tháng. Chênh ${roundedNeed - deadline} tháng. Kế hoạch này chưa cân, và giả vờ rằng nó cân sẽ khiến bạn bỏ cuộc ở giữa chặng. Hãy chọn một trong ba đòn bẩy dưới đây ngay bây giờ, đừng để tới tháng thứ mười.`,
      levers,
    };

  return {
    status: 'khong-kha-thi',
    label: 'Không khả thi',
    tone: 'rose',
    message: `Cần khoảng ${roundedNeed} tháng nhưng bạn chỉ có ${deadline} tháng — chênh gấp ${ratio.toFixed(1)} lần. Tôi nói thẳng: không có phương pháp nào rút ngắn được khoảng cách này, vì tiếp thu ngôn ngữ bị chặn bởi số giờ tiếp xúc chứ không bởi kỹ thuật. Bắt buộc phải kéo một trong ba đòn bẩy dưới đây.`,
    levers,
  };
}

function buildAllocation(
  minutes: number,
  primary: string,
  level: string,
): {pillar: string; minutes: number; note: string}[] {
  const early = ['zero', 'basic', 'a1', 'a2'].includes(level);

  // Tỉ lệ nền theo giai đoạn
  let base = early
    ? {input: 0.45, sound: 0.22, memory: 0.2, output: 0.13}
    : {input: 0.4, sound: 0.1, memory: 0.15, output: 0.35};

  const notes: Record<string, string> = {
    input: 'Nhiên liệu — nghe và đọc ở vùng hiểu 90–98%',
    sound: 'Shadowing, chép chính tả, luyện âm',
    memory: 'Anki, đãi câu, săn collocation',
    output: 'Nói và viết có người sửa',
  };

  // Điều chỉnh theo nguyên mẫu
  if (primary === 'ar-reader') {
    base = {...base, input: base.input - 0.1, output: base.output + 0.06, sound: base.sound + 0.04};
    notes.output = 'TĂNG — bạn hiểu nhiều hơn nói được, phải ép đầu ra';
    notes.sound = 'TĂNG — điểm yếu ẩn của người đọc giỏi thường là tai';
  } else if (primary === 'ar-social') {
    base = {...base, output: base.output - 0.05, memory: base.memory + 0.05};
    notes.memory = 'TĂNG — bạn nói tốt nhưng dễ hoá thạch lỗi, cần Anki và Sổ Lỗi';
  } else if (primary === 'ar-analyst') {
    base = {...base, output: base.output + 0.08, memory: base.memory - 0.08};
    notes.output = 'TĂNG — bạn hiểu luật rất nhanh, thiếu là giờ nói ra tiếng';
  } else if (primary === 'ar-creative') {
    base = {...base, memory: base.memory - 0.05, input: base.input + 0.05};
    notes.memory = 'GIẢM — hạ xuống 10 thẻ mới/ngày cho đỡ ngán, ít mà đều';
    notes.input = 'TĂNG — nạp qua phim, truyện, nội dung bạn thật sự thích';
  } else if (primary === 'ar-comeback') {
    notes.input = 'Nạp dễ hiểu — bắt đầu lại từ nền, đừng tin nền cũ';
  }

  const order: (keyof typeof base)[] = ['input', 'sound', 'memory', 'output'];
  const labels: Record<string, string> = {
    input: 'Nạp dễ hiểu',
    sound: 'Âm thanh',
    memory: 'Ghi nhớ',
    output: 'Đầu ra',
  };

  const raw = order.map((k) => ({
    pillar: labels[k],
    minutes: Math.round((minutes * base[k]) / 5) * 5,
    note: notes[k],
  }));

  // Bù sai số làm tròn vào khối lớn nhất
  const diff = minutes - raw.reduce((s, r) => s + r.minutes, 0);
  if (diff !== 0) {
    const biggest = raw.reduce((a, b) => (a.minutes >= b.minutes ? a : b));
    biggest.minutes += diff;
  }
  return raw.filter((r) => r.minutes > 0);
}

function buildDay(
  minutes: number,
  peak: string,
  commute: number,
  speakhome: string,
  allocation: {pillar: string; minutes: number}[],
): DerivedBlock[] {
  const clock = PEAK_CLOCK[peak] ?? PEAK_CLOCK.dawn;
  const get = (p: string) => allocation.find((a) => a.pillar === p)?.minutes ?? 0;

  const blocks: DerivedBlock[] = [];
  let i = 0;
  const at = () => clock.offsets[Math.min(i++, clock.offsets.length - 1)];

  blocks.push({
    time: at(),
    task: 'Đọc câu bản sắc. Chưa chạm điện thoại.',
    minutes: 1,
    pillar: 'Bản sắc',
  });

  const mem = get('Ghi nhớ');
  if (mem > 0)
    blocks.push({time: at(), task: 'Anki — ôn tới khi hàng đợi về 0', minutes: mem, pillar: 'Ghi nhớ'});

  const sound = get('Âm thanh');
  if (sound > 0)
    blocks.push({
      time: at(),
      task:
        speakhome === 'no'
          ? 'Chép chính tả 45 giây (thay shadowing — không cần phát ra tiếng)'
          : speakhome === 'limited'
            ? 'Shadowing thì thầm + chép chính tả'
            : 'Shadowing 7 vòng trên đoạn 60–90 giây',
      minutes: sound,
      pillar: 'Âm thanh',
    });

  // Input: ưu tiên đẩy vào thời gian đi lại
  const input = get('Nạp dễ hiểu');
  const inputAtDesk = Math.max(0, input - commute);
  if (inputAtDesk > 0)
    blocks.push({time: at(), task: 'Nạp dễ hiểu — nghe hoặc đọc ở vùng 90–98%', minutes: inputAtDesk, pillar: 'Nạp'});
  if (commute > 0)
    blocks.push({
      time: 'Lúc đi lại',
      task: `Podcast — nghe thụ động (${Math.min(commute, input)} phút này vốn đã bỏ đi, không đụng vào lịch sống)`,
      minutes: Math.min(commute, input),
      pillar: 'Nạp',
    });

  const out = get('Đầu ra');
  if (out > 0) {
    const speakShare = Math.round(out * 0.45);
    const writeShare = out - speakShare;
    if (speakShare > 0)
      blocks.push({
        time: speakhome === 'no' ? 'Lúc đi lại / ngoài trời' : 'Tối',
        task:
          speakhome === 'no'
            ? 'Tự nói — trong xe, lúc đi bộ, hoặc nhắn tin thoại cho bạn trao đổi'
            : 'Tự nói 3 mốc hoặc buổi 1-1',
        minutes: speakShare,
        pillar: 'Đầu ra',
      });
    if (writeShare > 0)
      blocks.push({time: 'Tối', task: 'Viết — nhật ký hoặc bài luận, dùng ≥ 3 cụm mới', minutes: writeShare, pillar: 'Đầu ra'});
  }

  blocks.push({time: 'Trước ngủ', task: 'Nhập lỗi vào Sổ Lỗi. Tô đen ô lịch.', minutes: 4, pillar: 'Đo lường'});
  return blocks;
}

export function derivePlan(p: Profile): DerivedPlan {
  const level = str(p.level, 'zero');
  const targetBandStr = str(p.target, '8.0');
  const deadlineRaw = str(p.deadline, '36');
  const deadlineMonths = deadlineRaw === 'none' ? null : Number(deadlineRaw);
  const dailyMinutes = num(p.daily, 75);
  const commuteMinutes = num(p.commute, 0);
  const peak = str(p.peak, 'dawn');
  const speakhome = str(p.speakhome, 'free');
  const budget = str(p.budget, '0');
  const quits = str(p.quits, '0');
  const social = str(p.social, 'mixed');
  const domain = str(p.domain, 'none');
  const busy = arr(p.busydays);
  const traits = arr(p.traits);

  /* --- Nguyên mẫu --- */
  const scores: Record<string, number> = Object.fromEntries(
    ARCHETYPE_IDS.map((a) => [a, 0]),
  );
  const traitQ = QUESTIONS.find((q) => q.id === 'traits')!;
  traits.forEach((t) => {
    const opt = traitQ.options.find((o) => o.id === t);
    if (opt?.weights)
      Object.entries(opt.weights).forEach(([k, v]) => {
        scores[k] = (scores[k] ?? 0) + v;
      });
  });
  if (quits === '3') scores['ar-comeback'] += 4;
  else if (quits === '1') scores['ar-comeback'] += 2;
  if (social === 'group') scores['ar-social'] += 2;
  if (social === 'alone') scores['ar-disciplined'] += 1;

  const ranked = ARCHETYPE_IDS.map((id) => ({id, score: scores[id] ?? 0})).sort(
    (a, b) => b.score - a.score,
  );
  const primaryArchetypeId = ranked[0].score > 0 ? ranked[0].id : 'ar-disciplined';
  const secondaryArchetypeId =
    ranked[1].score > 0 && ranked[1].score >= ranked[0].score * 0.6
      ? ranked[1].id
      : null;

  /* --- Toán học lộ trình --- */
  const bankedHours = BANKED_BY_LEVEL[level] ?? 0;
  const targetHours = HOURS_BY_BAND[targetBandStr] ?? 1800;
  const hoursNeeded = Math.max(0, targetHours - bankedHours);
  // Thời gian đi lại là giờ nghe thụ động, tính hệ số 0,6 so với giờ học tập trung.
  const effectiveMinutes = dailyMinutes + Math.round(commuteMinutes * 0.6);
  const monthsNeeded = hoursNeeded / ((effectiveMinutes / 60) * 30.4);
  const feasibility = judgeFeasibility(
    monthsNeeded,
    deadlineMonths,
    hoursNeeded,
    effectiveMinutes,
    bankedHours,
  );

  const entryIdx = ENTRY_BY_LEVEL[level] ?? 0;
  const entry = MILESTONES[entryIdx];

  /* --- Phân bổ & nhịp ---
     5 phút nghi thức (đọc câu bản sắc + nhập Sổ Lỗi) nằm TRONG quỹ đã chọn,
     nên phân bổ bốn trụ cột từ phần còn lại. Nhờ vậy tổng Ngày Đủ khớp đúng
     con số người dùng chọn, thay vì vượt lên 5 phút. */
  const RITUAL_OVERHEAD = 5;
  const learningMinutes = Math.max(10, dailyMinutes - RITUAL_OVERHEAD);
  const allocation = buildAllocation(learningMinutes, primaryArchetypeId, level);
  const fullDay = buildDay(learningMinutes, peak, commuteMinutes, speakhome, allocation);
  const busyMinutes = Math.max(15, Math.round(dailyMinutes * 0.35));
  const busyDay: DerivedBlock[] = [
    {time: PEAK_CLOCK[peak]?.start ?? '06:00', task: 'Anki — ôn hết hàng đợi, không học thẻ mới', minutes: Math.round(busyMinutes * 0.5), pillar: 'Ghi nhớ'},
    {time: commuteMinutes > 0 ? 'Lúc đi lại' : 'Bất cứ lúc nào', task: 'Podcast — nghe thụ động', minutes: Math.round(busyMinutes * 0.4), pillar: 'Nạp'},
    {time: 'Trước ngủ', task: 'Tự nói 3 phút kể lại ngày hôm nay. Tô ô lịch.', minutes: Math.max(3, Math.round(busyMinutes * 0.1)), pillar: 'Đầu ra'},
  ];

  const clubsPerWeek =
    social === 'group' ? 4 : social === 'alone' ? (quits === '3' ? 2 : 1) : 2;

  /* --- Tài liệu --- */
  const paid = budget !== '0';
  const richBudget = budget === '2000' || budget === '2000+';
  const early = ['zero', 'basic', 'a1', 'a2'].includes(level);
  const resourceIds: string[] = ['r-anki', 'r-britishcouncil'];
  const excludedResourceIds: string[] = [];

  if (early) {
    resourceIds.push('r-bbc-sounds', 'r-dreaming-english', 'r-spotlight', 'r-langmaster', 'r-duolingo');
  } else {
    resourceIds.push('r-bbc6min', 'r-oxford-learners', 'r-ozdic', 'r-academic-phrasebank');
  }
  if (['b1', 'b2low', 'b2', 'c1'].includes(level))
    resourceIds.push('r-awl', 'r-write-and-improve', 'r-simon', 'r-lexibot');
  if (['b2', 'c1'].includes(level)) resourceIds.push('r-cambridge-ielts', 'r-band-descriptors');

  if (primaryArchetypeId === 'ar-reader') resourceIds.push('r-oxford-bookworms', 'r-guardian');
  if (primaryArchetypeId === 'ar-creative') resourceIds.push('r-netflix-lln', 'r-tedtalks');
  if (primaryArchetypeId === 'ar-social') resourceIds.push('r-hellotalk', 'r-busuu');
  if (primaryArchetypeId === 'ar-analyst') resourceIds.push('r-grammar-in-use', 'r-test-english');
  if (primaryArchetypeId === 'ar-comeback') resourceIds.push('r-bbc-sounds', 'r-busuu');
  if (primaryArchetypeId === 'ar-disciplined') resourceIds.push('r-examenglish', 'r-reading-ecb');

  if (paid) resourceIds.push('r-italki');
  else {
    resourceIds.push('r-busuu', 'r-hellotalk');
    excludedResourceIds.push('r-italki', 'r-cambly', 'r-elsa');
  }
  if (richBudget) resourceIds.push('r-elsa', 'r-pauline-cullen');
  if (budget === '0') excludedResourceIds.push('r-economist', 'r-pauline-cullen');

  /* --- 10 việc/ngày rút gọn theo quỹ thời gian --- */
  let dailyTenIds: number[];
  if (dailyMinutes <= 30) dailyTenIds = [1, 2, 7, 8, 10];
  else if (dailyMinutes <= 45) dailyTenIds = [1, 2, 3, 6, 7, 8, 10];
  else if (dailyMinutes <= 60) dailyTenIds = [1, 2, 3, 4, 6, 7, 8, 10];
  else dailyTenIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const inputMinutes =
    (allocation.find((a) => a.pillar === 'Nạp dễ hiểu')?.minutes ?? 0) +
    Math.min(commuteMinutes, allocation.find((a) => a.pillar === 'Nạp dễ hiểu')?.minutes ?? 0);

  /* --- Rủi ro --- */
  const risks: DerivedPlan['risks'] = [];

  if (budget === '0')
    risks.push({
      level: 'cao',
      title: 'Không có vòng phản hồi trả phí — Luật số 4 đang hở',
      why: 'Luyện tập không có người sửa chỉ khắc sâu lỗi sai. Đây là rủi ro lớn nhất của người tự học miễn phí: lỗi hoá thạch sau 6–12 tháng và tốn gấp nhiều lần công sức để gỡ.',
      fix: 'Thay thế bằng ba nguồn miễn phí, dùng đồng thời: (1) Busuu — cộng đồng bản ngữ sửa bài viết và bài nói của bạn, đổi lại bạn sửa tiếng Việt cho họ; (2) HelloTalk — bạn trao đổi ngôn ngữ, có nút sửa lỗi ngay trong chat; (3) Cambridge Write & Improve — chấm tự động theo thang CEFR. Đặt mục tiêu tối thiểu 2 vòng sửa mỗi tuần và ghi hết vào Sổ Lỗi.',
    });

  if (quits === '3')
    risks.push({
      level: 'cao',
      title: 'Đã bỏ dở từ 3 lần trở lên',
      why: 'Vấn đề của bạn gần như chắc chắn không nằm ở phương pháp — nó nằm ở hạ tầng duy trì. Lần này mà vẫn dựa vào ý chí thì kết quả sẽ lặp lại.',
      fix: 'Ba việc bắt buộc trong tuần đầu: (1) lập CLB Chuỗi Ngày với 3–5 người, điểm danh mỗi sáng; (2) làm ngay hai mô-đun tư duy Bản sắc và Tư duy phát triển; (3) viết ra ba lần bỏ cuộc trước và nguyên nhân THẬT của từng lần — đó chính là danh sách chướng ngại phải đưa vào bước Obstacle của WOOP mỗi tuần.',
    });
  else if (quits === '1')
    risks.push({
      level: 'trung',
      title: 'Đã từng bỏ dở 1–2 lần',
      why: 'Bạn có sẵn dữ liệu quý mà người mới bắt đầu không có: bạn biết điều gì KHÔNG hiệu quả với mình.',
      fix: 'Viết ra nguyên nhân thật của những lần trước và đưa thẳng vào bước Obstacle của WOOP. Giữ CLB Chuỗi Ngày ít nhất trong 6 tháng đầu.',
    });

  if (speakhome === 'no')
    risks.push({
      level: 'cao',
      title: 'Không nói to được ở nhà',
      why: 'Shadowing và tự nói là hai trụ cột không thể bỏ. Nếu không có phương án thay thế, bạn sẽ âm thầm cắt mất khối Đầu ra và phát hiện ra điều đó ở tháng thứ mười.',
      fix: 'Bốn phương án đã được xếp sẵn vào lịch của bạn: (1) shadowing thì thầm — vẫn hiệu quả tới ~70% vì cơ quan phát âm vẫn hoạt động; (2) chép chính tả thay cho shadowing ở nhà; (3) tự nói trong lúc đi lại hoặc đi bộ; (4) gửi tin nhắn thoại 60 giây cho bạn trao đổi trên HelloTalk — vừa là output, vừa được sửa.',
    });
  else if (speakhome === 'limited')
    risks.push({
      level: 'thap',
      title: 'Chỉ nói nhỏ được ở nhà',
      why: 'Shadowing thì thầm giữ được phần lớn hiệu quả nhưng làm yếu phần luyện hơi và âm lượng.',
      fix: 'Mỗi tuần bố trí một buổi nói to thật sự — ngoài công viên, trong xe, hoặc phòng họp mượn. Phần còn lại shadowing thì thầm là chấp nhận được.',
    });

  if (dailyMinutes <= 45 && ['7.5', '8.0', '8.5'].includes(targetBandStr))
    risks.push({
      level: 'cao',
      title: 'Quỹ thời gian không tương xứng với mục tiêu',
      why: `Mức ${targetBandStr} cần khoảng ${targetHours} giờ tích luỹ. Với ${dailyMinutes} phút mỗi ngày, riêng phần còn thiếu đã mất khoảng ${Math.ceil(monthsNeeded)} tháng. Đây là ràng buộc vật lý, không phải vấn đề động lực.`,
      fix: 'Kéo một trong ba đòn bẩy ở phần Tính khả thi. Đòn bẩy rẻ nhất là biến thời gian đi lại thành giờ nghe — nó không lấy thêm một phút nào của lịch sống.',
    });

  if (commuteMinutes >= 40)
    risks.push({
      level: 'thap',
      title: `Bạn có ${commuteMinutes} phút đi lại mỗi ngày — đây là mỏ vàng`,
      why: `${commuteMinutes} phút mỗi ngày cộng dồn thành khoảng ${Math.round((commuteMinutes * 365) / 60)} giờ mỗi năm, từ thời gian vốn đã bỏ đi.`,
      fix: 'Lịch của bạn đã tự động đẩy khối nghe vào khung này. Việc duy nhất cần làm: tải sẵn nội dung từ tối hôm trước để không phải quyết định gì lúc lên đường.',
    });

  if (busy.length >= 4)
    risks.push({
      level: 'trung',
      title: `${busy.length}/7 ngày trong tuần bạn đã báo là bận`,
      why: 'Kế hoạch chuẩn giả định phần lớn là Ngày Đủ. Với lịch của bạn, phần lớn lại là Ngày Bận — nếu không thừa nhận điều đó, bạn sẽ thấy mình "liên tục thất bại" dù thực ra vẫn đang giữ chuỗi.',
      fix: `Những ngày ${busy.join(', ')} đã được xếp sẵn phiên bản Ngày Bận (${busyMinutes} phút). Đó là mức HOÀN THÀNH cho ngày đó, không phải mức thất bại. Dồn buổi dài vào ngày rảnh nhất trong tuần.`,
    });

  if (peak === 'night')
    risks.push({
      level: 'trung',
      title: 'Khung giờ đỉnh của bạn rơi vào sau 22 giờ',
      why: 'Trí nhớ được củng cố trong giấc ngủ. Học sát giờ ngủ có lợi cho việc ghi nhớ, nhưng nếu nó cắt vào tổng thời lượng ngủ thì lợi bất cập hại.',
      fix: 'Giữ khung đêm nhưng chốt cứng giờ tắt màn hình và bảo đảm vẫn ngủ đủ 7 giờ. Nếu phải chọn, hãy chọn giấc ngủ — mất một buổi học rẻ hơn mất khả năng ghi nhớ của cả tuần.',
    });

  /* --- Chỉnh theo nguyên mẫu --- */
  const ADJ: Record<string, string[]> = {
    'ar-analyst': [
      'Tăng khối Đầu ra thêm 8% — bạn nắm luật nhanh, thứ thiếu là số giờ nói ra tiếng.',
      'Học ngữ pháp theo lối Chú ý: thu thập 15 ví dụ thật RỒI mới tự rút quy luật. Hợp gu bạn mà vẫn đúng cách.',
      'Sổ Lỗi sẽ là công cụ mạnh nhất của bạn — hãy khai thác tối đa, phân loại lỗi thật chi tiết.',
      'Canh chừng điểm mù: phân tích thay cho luyện tập. Mỗi giờ đọc lý thuyết phải kèm 30 phút nói ra tiếng.',
    ],
    'ar-social': [
      `Tăng lên ${clubsPerWeek} buổi Club mỗi tuần — đây là nhiên liệu của bạn, tuyệt đối đừng cắt.`,
      'Tăng khối Ghi nhớ thêm 5% — bạn nói tốt nhưng lỗi dễ hoá thạch từ sớm.',
      'Yêu cầu gia sư sửa ngay tại chỗ thay vì ghi vào chat — bạn tiếp thu tốt hơn qua tương tác trực tiếp.',
      'Canh chừng điểm mù: trôi chảy nhưng thiếu chính xác, dễ dừng ở 6.5–7.0. Sổ Lỗi với bạn là bắt buộc sinh tử.',
    ],
    'ar-reader': [
      'Giảm khối Nạp 10%, dồn sang Đầu ra và Âm thanh — bạn đã đọc đủ nhiều rồi.',
      'Áp Luật 48 giờ nghiêm hơn người khác: mọi thứ đọc được phải nói lại trong ngày.',
      'Đặt buổi 1-1 đầu tiên sớm hơn lộ trình chuẩn 2 tháng. Đừng đợi "giỏi hơn đã".',
      'Ưu tiên tuyệt đối cho chép chính tả — điểm yếu ẩn của người đọc giỏi hầu như luôn là tai.',
    ],
    'ar-disciplined': [
      'Giữ nguyên phân bổ chuẩn — chuỗi ngày của bạn vốn đã là điểm mạnh lớn nhất.',
      'Dồn công sức vào việc CHỌN ĐÚNG tài liệu (Luật i+1) nhiều hơn là vào việc chăm chỉ.',
      'Mỗi tháng dừng lại hỏi "việc này có thật sự tạo ra kết quả không", đừng chỉ hỏi "tôi đã làm đủ chưa".',
      'Canh chừng kiệt sức ở tháng 20: bạn sẽ có xu hướng ép mình đi tiếp khi lẽ ra nên giảm tải.',
    ],
    'ar-creative': [
      'Giảm thẻ Anki mới xuống 10 thẻ/ngày — ít mà đều hơn nhiều mà bỏ.',
      'Đãi câu từ phim và truyện thay vì từ giáo trình: cùng kết quả, hợp gu hơn nhiều.',
      'Dùng quyền Tự chủ tối đa: 30% nội dung mỗi tuần do bạn tự chọn theo sở thích.',
      'Đổi CÁCH luyện thường xuyên, nhưng tuyệt đối không đổi MỤC TIÊU của cột mốc.',
    ],
    'ar-comeback': [
      'Hai mô-đun tư duy Bản sắc và Tư duy phát triển là bắt buộc, làm ngay tuần đầu tiên.',
      'Bắt đầu lại từ bảng âm IPA kể cả khi thấy quá dễ — nền lộn xộn nguy hiểm hơn nền trống.',
      'CLB Chuỗi Ngày quan trọng với bạn hơn bất kỳ ai: bạn cần có người chờ mình xuất hiện.',
      'Điểm mạnh riêng của bạn: bạn đã biết điều gì KHÔNG hiệu quả với mình. Đó là dữ liệu người mới không có.',
    ],
  };

  return {
    entryMilestoneId: entry.id,
    entryMilestoneName: `${entry.id} · ${entry.codename}`,
    bankedHours,
    targetBand: Number(targetBandStr),
    targetHours,
    hoursNeeded,
    monthsNeeded,
    deadlineMonths,
    feasibility,
    primaryArchetypeId,
    secondaryArchetypeId,
    archetypeScores: ranked,
    dailyMinutes,
    commuteMinutes,
    effectiveMinutes,
    learningMinutes,
    inputMinutes,
    weeklyHours: Math.round(((dailyMinutes * 7) / 60) * 10) / 10,
    allocation,
    fullDay,
    busyDay,
    busyDayLabels: busy,
    clubsPerWeek,
    firstNarrowTopic: DOMAIN_TOPIC[domain] ?? DOMAIN_TOPIC.none,
    resourceIds: Array.from(new Set(resourceIds)),
    excludedResourceIds: Array.from(new Set(excludedResourceIds)),
    dailyTenIds,
    risks: risks.sort((a, b) => {
      const w = {cao: 0, trung: 1, thap: 2};
      return w[a.level] - w[b.level];
    }),
    archetypeAdjustments: ADJ[primaryArchetypeId] ?? [],
  };
}

export const PROFILE_STORAGE_KEY = 'engwin365.profile.v1';

export function loadProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(p: Profile): void {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* trình duyệt chặn lưu trữ — hệ thống vẫn chạy, chỉ không nhớ giữa các lần mở */
  }
}

export function clearProfile(): void {
  try {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch {
    /* bỏ qua */
  }
}
