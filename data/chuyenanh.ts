/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {ExamPart, Band, ChuyenPhase, ChuyenLevel, UpgradePlan} from '../types';

/* ==========================================================================
   LỘ TRÌNH CHUYÊN ANH VÀ LỚP CHẤT LƯỢNG CAO VÀO 10 — HÀ NỘI
   Vào từ lớp 8, thi tháng 6 cuối lớp 9. Hai mươi hai tháng.
   ========================================================================== */

export const CHUYEN_CREED = {
  name: 'ĐƯỜNG VÀO CHUYÊN ANH',
  claim:
    'Hai mươi hai tháng, đích là đỗ chuyên với biên an toàn 0,5–1,0 điểm trên điểm chuẩn, và bài chuyên từ 7,0 trở lên.',
  whyMargin:
    'Không đặt đích ngang điểm chuẩn mà đặt trên nó nửa điểm tới một điểm. Điểm chuẩn đổi theo từng năm và không ai đoán được; nhắm đúng bằng điểm chuẩn năm ngoái là đặt cả hai năm ôn luyện vào tay may rủi.',
  whySeven:
    'Bảy điểm bài chuyên không phải con số đẹp mà là ngưỡng thực tế: dưới mức đó, tổng điểm phải bù bằng ba môn chung, mà ba môn đó nhân hệ số một nên bù rất chậm. Bài chuyên nhân hệ số hai — mỗi điểm ở đây đáng gấp đôi.',
  hardTruth:
    'Không phải học sinh nào vào lộ trình này cũng đỗ. Bài test đầu vào chia bậc chính là để nói thẳng điều đó từ tháng đầu, thay vì để gia đình phát hiện ở tháng thứ hai mươi. Một số bậc sẽ được khuyên nhắm lớp chất lượng cao trước, và đó là lời khuyên trung thực chứ không phải hạ mục tiêu.',
  clcNote:
    'Lớp chất lượng cao dùng chung lộ trình này nhưng dừng ở mức thấp hơn: đề chung 40 câu trắc nghiệm thay vì đề chuyên 120 phút bốn kỹ năng. Học sinh nhắm CLC vẫn luyện đủ bốn kỹ năng, vì đó là thứ giữ được sau khi thi xong.',
};

/* ---------------------- CẤU TRÚC ĐỀ VÀ CÁCH TÍNH ĐIỂM -------------------- */

export const EXAM_SPEC = {
  verifyFirst:
    'CẢNH BÁO QUAN TRỌNG: cấu trúc đề và công thức điểm THAY ĐỔI theo từng năm và từng trường. Các con số dưới đây theo cấu trúc những năm gần đây của đề chuyên Sở Hà Nội. Trước mỗi mùa thi PHẢI đối chiếu lại với đề án tuyển sinh chính thức của Sở và của trường, rồi sửa hằng EXAM_SPEC trong data/chuyenanh.ts. Cả lộ trình tự cập nhật theo, không phải sửa chỗ nào khác.',
  chuyen: {
    name: 'Đề chuyên Anh — Sở Hà Nội',
    minutes: 120,
    maxScore: 10,
    note: 'Bốn phần: Nghe, Từ vựng – Ngữ pháp, Đọc, Viết. Khoảng 86 câu.',
  },
  common: {
    name: 'Đề Ngoại ngữ chung — vào 10 Hà Nội',
    minutes: 60,
    items: 40,
    perItem: 0.25,
    maxScore: 10,
    note:
      'Bốn mươi câu trắc nghiệm, trộn 24 mã đề. Những năm gần đây tăng mạnh dạng bài thực tế: đọc biển báo, hội thoại đời thường, tìm câu chủ đề, sắp xếp đoạn văn, điền câu vào chỗ trống.',
  },
  formula: {
    text: 'Điểm xét tuyển chuyên = Toán + Văn + Ngoại ngữ + (Chuyên × 2)',
    max: 50,
    note:
      'Ba môn chung hệ số một, môn chuyên hệ số hai. Đây là lý do một điểm ở bài chuyên đáng gấp đôi một điểm ở môn chung.',
  },
};

export const EXAM_PARTS: ExamPart[] = [
  {
    no: 1,
    name: 'NGHE',
    items: 20,
    minutes: 25,
    weight: 2.3,
    whatItTests:
      'Nghe hiểu hội thoại và độc thoại, bắt chi tiết và ý chính, thường chỉ phát hai lần.',
    commonLoss:
      'Mất điểm vì chưa đọc trước câu hỏi. Đọc trước là kỹ thuật rẻ nhất và cho điểm nhanh nhất trong cả đề.',
  },
  {
    no: 2,
    name: 'NGỮ ÂM',
    items: 5,
    minutes: 5,
    weight: 0.6,
    whatItTests: 'Trọng âm và phát âm — nhóm câu ngắn nhất, dễ ăn trọn nhất.',
    commonLoss:
      'Học vẹt từng từ thay vì học quy tắc dịch chuyển trọng âm theo hậu tố. Năm câu này lẽ ra phải đúng cả năm.',
  },
  {
    no: 3,
    name: 'TỪ VỰNG – NGỮ PHÁP',
    items: 25,
    minutes: 25,
    weight: 2.9,
    whatItTests:
      'Cụm từ cố định, giới từ đi kèm, dạng từ, thì, mệnh đề, câu điều kiện, đảo ngữ.',
    commonLoss:
      'Học từ đơn lẻ. Đề chuyên hỏi CỤM, nên biết nghĩa từng từ vẫn sai.',
  },
  {
    no: 4,
    name: 'ĐỌC',
    items: 20,
    minutes: 35,
    weight: 2.3,
    whatItTests:
      'Bài dài, nhiều từ học thuật, hỏi ý chính, chi tiết, suy luận, thái độ tác giả, tham chiếu đại từ.',
    commonLoss:
      'Đọc tuần tự từ đầu và hết giờ. Bài đọc đề chuyên dài tới tám trang A4 — không quét theo từ khoá thì không kịp.',
  },
  {
    no: 5,
    name: 'VIẾT',
    items: 16,
    minutes: 30,
    weight: 1.9,
    whatItTests:
      'Biến đổi câu giữ nguyên nghĩa, viết lại theo từ gợi ý, và một đoạn luận ngắn.',
    commonLoss:
      'Bỏ phần biến đổi câu vì hết giờ. Đây là phần cho điểm chắc nhất nếu thuộc mẫu, nên phải làm TRƯỚC đoạn luận.',
  },
];

/**
 * Tính ngược từ đích: cần đúng bao nhiêu câu mỗi phần.
 *
 * Hàm thuần, không đọc gì bên ngoài. Trả về số câu cần đúng ở từng phần để
 * đạt điểm bài chuyên mong muốn, phân bổ theo trọng số của phần đó.
 */
export function tinhNguoc(diemChuyenMucTieu: number) {
  const tongTrong = EXAM_PARTS.reduce((s, p) => s + p.weight, 0);
  const tyLe = Math.min(1, Math.max(0, diemChuyenMucTieu / 10));
  return EXAM_PARTS.map((p) => {
    const diemPhan = (p.weight / tongTrong) * EXAM_SPEC.chuyen.maxScore * tyLe;
    return {
      part: p.name,
      items: p.items,
      // Phần ngắn phải đúng tỉ lệ cao hơn: mất một câu ở phần 5 câu đau hơn
      // nhiều so với mất một câu ở phần 25 câu.
      needCorrect: Math.min(p.items, Math.ceil(p.items * Math.min(1, tyLe + (p.items <= 5 ? 0.15 : 0)))),
      pointsFromPart: Number(diemPhan.toFixed(2)),
    };
  });
}

/** Điểm xét tuyển từ bốn đầu điểm, theo công thức của Sở. */
export function diemXetTuyen(
  toan: number,
  van: number,
  ngoaiNgu: number,
  chuyen: number,
): number {
  return Number((toan + van + ngoaiNgu + chuyen * 2).toFixed(2));
}

/* ------------------------ TEST ĐẦU VÀO VÀ PHÂN BẬC ---------------------- */

export const ENTRY_TEST = {
  name: 'TEST NĂNG LỰC ĐẦU VÀO',
  when: 'Tuần đầu tiên, trước khi học buổi nào.',
  minutes: 150,
  shape: [
    'Một đề chuyên rút gọn đúng bốn phần, 90 phút — để biết em đang ở đâu so với đích, không phải để chấm điểm.',
    'Nói 5 phút với giáo viên: mô tả tranh, trả lời ba câu hỏi mở, đọc to một đoạn.',
    'Viết tay 20 phút một đoạn 120 từ theo đề mở.',
    'Phỏng vấn phụ huynh 20 phút — riêng, không có mặt học sinh.',
    'Bài đo thói quen 15 phút: em học lúc nào, ở đâu, bị cắt ngang bởi cái gì.',
  ],
  whyParentSeparate:
    'Phỏng vấn phụ huynh riêng vì hai bên thường trả lời khác nhau về cùng một câu hỏi: ai là người muốn thi chuyên. Biết sự thật đó từ tháng đầu quyết định cả hai năm sau.',
  notForRanking:
    'Kết quả test không dùng để xếp hạng học sinh với nhau và không công bố so sánh. Nó chỉ để chọn bậc và chọn lộ trình.',
};

export const BANDS: Band[] = [
  {
    id: 'b-a',
    name: 'BẬC A — ĐỦ NỀN',
    entryScore: 'Đề chuyên rút gọn đạt 6,0 trở lên',
    months: 22,
    feasible:
      'Rất khả thi. Đây là nhóm cần luyện đúng cách chứ không cần luyện nhiều.',
    focus: [
      'Đóng ba lỗ hổng lớn nhất trong 6 tháng đầu',
      'Vào luyện đề sớm từ tháng thứ 10',
      'Nửa cuối tập trung vào tốc độ và biên an toàn',
    ],
    dailyMinutes: 60,
    honestNote:
      'Nguy cơ lớn nhất của bậc này không phải trượt mà là chủ quan ở lớp 9 học kỳ một.',
  },
  {
    id: 'b-b',
    name: 'BẬC B — GẦN ĐỦ',
    entryScore: 'Đề chuyên rút gọn đạt 4,5–5,9',
    months: 22,
    feasible: 'Khả thi nếu giữ được nhịp. Đây là bậc đông nhất.',
    focus: [
      'Chín tháng đầu chỉ xây nền: từ vựng theo cụm, ngữ pháp lõi, nghe hằng ngày',
      'Không luyện đề trước tháng thứ 10 — luyện đề sớm khi nền yếu chỉ tạo cảm giác bận rộn',
      'Từ tháng 10 mới vào đề, và vào có hệ thống',
    ],
    dailyMinutes: 70,
    honestNote:
      'Bậc này đỗ hay trượt quyết định ở học kỳ hè lớp 8 lên 9. Bỏ hè là mất cơ hội.',
  },
  {
    id: 'b-c',
    name: 'BẬC C — CÒN XA',
    entryScore: 'Đề chuyên rút gọn đạt 3,0–4,4',
    months: 22,
    feasible:
      'Khả thi nhưng phải đánh đổi thật: 90 phút mỗi ngày, gần như không nghỉ hè.',
    focus: [
      'Sáu tháng đầu chỉ nghe và từ vựng, chưa động tới đề',
      'Mục tiêu trung gian là đỗ lớp chất lượng cao, chuyên là mục tiêu vươn',
      'Xét lại bậc ở tháng thứ 12 bằng số liệu, không bằng cảm tính',
    ],
    dailyMinutes: 90,
    honestNote:
      'Phải nói thẳng với gia đình ngay từ đầu: xác suất đỗ chuyên của bậc này thấp hơn hẳn hai bậc trên. Ai chọn đi tiếp thì đi với mắt mở.',
  },
  {
    id: 'b-d',
    name: 'BẬC D — CHƯA ĐỦ ĐIỀU KIỆN VÀO',
    entryScore: 'Đề chuyên rút gọn dưới 3,0',
    months: 22,
    feasible:
      'Không khuyến nghị nhắm chuyên trong 22 tháng. Khuyến nghị nhắm lớp chất lượng cao.',
    focus: [
      'Toàn bộ 22 tháng đi theo đề chung 40 câu, không theo đề chuyên',
      'Đích là điểm Ngoại ngữ 9,0 trở lên ở đề chung',
      'Nếu tới tháng 12 vượt mốc bậc C thì mở lại cửa chuyên',
    ],
    dailyMinutes: 60,
    honestNote:
      'Đây là lời khuyên trung thực chứ không phải hạ mục tiêu. Nhận một em bậc D vào lớp luyện chuyên là lấy tiền của gia đình để bán một xác suất rất thấp.',
  },
];

/* ------------------------ HAI MƯƠI HAI THÁNG ---------------------------- */

export const CHUYEN_PHASES: ChuyenPhase[] = [
  {
    no: 1,
    name: 'DỰNG NỀN ÂM VÀ TỪ',
    grade: 'Lớp 8 · học kỳ I',
    months: 'Tháng 1–5',
    goal:
      'Tai tách được âm, và vốn từ chuyển từ học từ đơn sang học theo cụm. Chưa đụng tới đề thi.',
    weekly: [
      {block: 'Nghe nền', sessions: 6, minutes: 25, what: 'Nghe khối lượng lớn đúng mức, không tua, không transcript ở lượt đầu.'},
      {block: 'Từ theo cụm', sessions: 5, minutes: 20, what: '10 cụm mỗi ngày, ôn theo lịch giãn cách 1-3-7-14-30.'},
      {block: 'Ngữ âm', sessions: 3, minutes: 15, what: 'Quy tắc trọng âm theo hậu tố, cặp âm tối thiểu.'},
      {block: 'Đọc mở rộng', sessions: 4, minutes: 25, what: 'Đọc không tra từ, mỗi tuần một bài dài hơn tuần trước.'},
    ],
    exitGate: 'Chép chính tả 60 giây đạt 85%. Dùng đúng 150 cụm trong câu tự đặt.',
    mock: 'Chưa thi thử. Chỉ đo bằng bài chép chính tả và bài cụm từ.',
  },
  {
    no: 2,
    name: 'NGỮ PHÁP LÕI VÀ ĐỌC TỐC ĐỘ',
    grade: 'Lớp 8 · học kỳ II',
    months: 'Tháng 6–10',
    goal:
      'Ngữ pháp lõi thành phản xạ, không phải thuộc bảng. Đọc đủ nhanh để không sợ bài dài.',
    weekly: [
      {block: 'Ngữ pháp lõi', sessions: 5, minutes: 25, what: 'Mỗi tuần một cấu trúc, luyện tới khi bật ra không cần nghĩ.'},
      {block: 'Đọc bấm giờ', sessions: 4, minutes: 30, what: 'Quét theo từ khoá, đọc câu hỏi trước bài.'},
      {block: 'Nghe có nhiệm vụ', sessions: 5, minutes: 25, what: 'Nghe kèm một việc phải làm: bắt số, ghi bước, đoán thái độ.'},
      {block: 'Viết câu', sessions: 3, minutes: 20, what: 'Biến đổi câu giữ nguyên nghĩa — 20 mẫu cốt lõi.'},
    ],
    exitGate: 'Đọc 1.000 từ trong 8 phút đúng 75%. Làm đúng 15/20 câu biến đổi câu.',
    mock: 'Thi thử lần 1 — đề chuyên rút gọn, chỉ để lấy đường cơ sở.',
  },
  {
    no: 3,
    name: 'HÈ TĂNG TỐC',
    grade: 'Hè lớp 8 lên 9',
    months: 'Tháng 11–12',
    goal:
      'Hai tháng có nhiều giờ nhất trong cả lộ trình. Đây là chỗ bậc B quyết định đỗ hay trượt.',
    weekly: [
      {block: 'Nghe chuyên sâu', sessions: 6, minutes: 40, what: 'Nghe đúng dạng đề chuyên, hai lần phát, có ghi chép.'},
      {block: 'Từ học thuật', sessions: 6, minutes: 30, what: 'Chuyển sang vốn từ học thuật, 15 cụm mỗi ngày.'},
      {block: 'Đọc bài dài', sessions: 5, minutes: 40, what: 'Bài 800–1.200 từ, đúng độ khó đề chuyên.'},
      {block: 'Viết đoạn', sessions: 4, minutes: 35, what: 'Đoạn luận 150 từ, nộp chấm theo bốn tiêu chí.'},
    ],
    exitGate: 'Đề chuyên rút gọn đạt 5,5 trở lên với mọi bậc.',
    mock: 'Thi thử lần 2 — đề chuyên đầy đủ 120 phút, đúng điều kiện phòng thi.',
  },
  {
    no: 4,
    name: 'VÀO ĐỀ CÓ HỆ THỐNG',
    grade: 'Lớp 9 · học kỳ I',
    months: 'Tháng 13–18',
    goal:
      'Chuyển từ học kiến thức sang luyện dạng bài. Mỗi phần của đề có chiến thuật riêng, đo riêng.',
    weekly: [
      {block: 'Luyện dạng', sessions: 5, minutes: 40, what: 'Mỗi tuần một dạng bài, làm tới khi tỉ lệ đúng ổn định.'},
      {block: 'Đề thành phần', sessions: 3, minutes: 45, what: 'Làm từng phần đề bấm giờ, ghi lỗi theo mã.'},
      {block: 'Sổ lỗi', sessions: 7, minutes: 10, what: 'Mỗi ngày rà lại năm câu từng sai, làm lại không nhìn đáp án.'},
      {block: 'Nghe giữ nhịp', sessions: 5, minutes: 25, what: 'Giữ tai, không để tụt trong lúc dồn cho đọc và viết.'},
    ],
    exitGate: 'Đề chuyên đầy đủ đạt 6,5. Không phần nào dưới 55% số câu.',
    mock: 'Thi thử lần 3 và 4, cách nhau 8 tuần, có xếp hạng nội bộ ẩn danh.',
  },
  {
    no: 5,
    name: 'VỀ ĐÍCH VÀ GIỮ BIÊN',
    grade: 'Lớp 9 · học kỳ II',
    months: 'Tháng 19–22',
    goal:
      'Đạt 7,0 trở lên và giữ ổn định qua nhiều đề khác nhau. Ổn định quan trọng hơn đỉnh cao.',
    weekly: [
      {block: 'Đề đầy đủ', sessions: 2, minutes: 120, what: 'Mỗi tuần hai đề trọn vẹn, đúng giờ, đúng điều kiện.'},
      {block: 'Chữa đề', sessions: 2, minutes: 60, what: 'Chữa kỹ hơn làm. Mỗi câu sai phải nêu được vì sao sai.'},
      {block: 'Phần yếu nhất', sessions: 4, minutes: 30, what: 'Dồn vào đúng phần đang kéo điểm xuống, xác định bằng số liệu.'},
      {block: 'Giữ tâm lý', sessions: 3, minutes: 20, what: 'Luyện trong điều kiện gây nhiễu: tiếng ồn, mệt, áp lực giờ.'},
    ],
    exitGate: 'Ba đề liên tiếp đạt 7,0 trở lên, độ lệch giữa các đề dưới 0,7 điểm.',
    mock: 'Thi thử lần 5, 6, 7 — cách nhau 3 tuần, đề mới hoàn toàn.',
  },
];

/* --------------------------- BẢY CẤP PHẢI VƯỢT --------------------------- */

export const CHUYEN_LEVELS: ChuyenLevel[] = [
  {
    no: 1,
    name: 'MỞ TAI',
    target: 'Chép chính tả 60 giây đạt 85% trên đoạn chưa từng nghe.',
    criteria: [
      'Tách được ranh giới từ trong dòng nói tự nhiên',
      'Nhận ra nối âm, nuốt âm, âm yếu',
      'Chuỗi 30 ngày nghe không đứt',
    ],
    ifStuck: 'Hạ mức tài liệu xuống một bậc. Nghe không ra thì không phải do lười.',
  },
  {
    no: 2,
    name: 'VỐN CỤM',
    target: 'Dùng đúng 300 cụm từ trong câu tự đặt, không phải câu mẫu.',
    criteria: [
      'Sổ từ ghi theo cụm, không ghi từ đơn',
      'Ôn theo lịch giãn cách, có ghi số đo mỗi lượt',
      'Tỉ lệ nhớ sau 7 ngày trên 70%',
    ],
    ifStuck: 'Giảm còn 5 cụm mỗi ngày. Nhồi nhiều rồi quên sạch là lãng phí lớn nhất.',
  },
  {
    no: 3,
    name: 'NGỮ PHÁP PHẢN XẠ',
    target: 'Hai mươi cấu trúc lõi bật ra dưới 3 giây, không cần nghĩ.',
    criteria: [
      'Làm đúng 45/50 câu ngữ pháp bấm giờ',
      'Viết lại câu đúng 18/20 mẫu',
      'Không còn lỗi thì và mạo từ lặp lại trong sổ lỗi',
    ],
    ifStuck: 'Mỗi tuần chỉ một cấu trúc. Ép năm cấu trúc cùng lúc thì không cái nào thành phản xạ.',
  },
  {
    no: 4,
    name: 'ĐỌC KHÔNG SỢ DÀI',
    target: 'Bài 1.200 từ trong 10 phút, trả lời đúng 8/10 câu.',
    criteria: [
      'Đọc câu hỏi trước, quét theo từ khoá và từ đồng nghĩa',
      'Không tra từ giữa chừng',
      'Nhận ra được câu chủ đề và thái độ tác giả',
    ],
    ifStuck: 'Vấn đề thường là vốn từ đồng nghĩa, không phải tốc độ. Luyện riêng nhóm đó.',
  },
  {
    no: 5,
    name: 'VIẾT ĂN ĐIỂM CHẮC',
    target: 'Mười sáu câu phần viết đúng tối thiểu 13, và đoạn luận đạt 3/4 tiêu chí.',
    criteria: [
      'Thuộc 20 mẫu biến đổi câu tới mức không cần nghĩ',
      'Làm phần biến đổi câu TRƯỚC đoạn luận',
      'Đoạn luận có dàn ý bốn dòng trước khi viết',
    ],
    ifStuck: 'Bỏ đoạn luận tạm thời, ăn chắc phần biến đổi câu trước. Điểm chắc trước, điểm hay sau.',
  },
  {
    no: 6,
    name: 'ĐỦ ĐIỂM',
    target: 'Đề chuyên đầy đủ đạt 7,0.',
    criteria: [
      'Không phần nào dưới 60% số câu',
      'Làm hết đề, không bỏ trống câu nào',
      'Thời gian còn dư tối thiểu 5 phút để soát',
    ],
    ifStuck: 'Xác định đúng một phần đang kéo điểm và dồn 4 tuần vào đúng phần đó.',
  },
  {
    no: 7,
    name: 'GIỮ BIÊN',
    target: 'Ba đề liên tiếp đạt 7,0 trở lên, độ lệch dưới 0,7 điểm.',
    criteria: [
      'Ổn định qua đề của nhiều trường khác nhau',
      'Giữ được điểm khi làm trong điều kiện gây nhiễu',
      'Không có đề nào tụt quá 1 điểm so với trung bình',
    ],
    ifStuck:
      'Dao động lớn thường là vấn đề tâm lý phòng thi, không phải kiến thức. Luyện trong điều kiện khó hơn thật.',
  },
];

/* ------------------------ HỆ GIẢI PHÁP NÂNG CẤP ------------------------- */

export const UPGRADE_PLANS: UpgradePlan[] = [
  {
    part: 'NGHE',
    symptom: 'Nghe được ý chính nhưng mất câu hỏi chi tiết.',
    rootCause: 'Không đọc trước câu hỏi nên không biết cần bắt gì.',
    drill: 'Mỗi bài nghe: 60 giây đọc câu hỏi và gạch từ khoá TRƯỚC khi bật băng. Ghi dự đoán loại thông tin cần bắt.',
    weeks: 3,
    gain: 'Thường lên 3–5 câu trong 20 câu nghe.',
  },
  {
    part: 'NGHE',
    symptom: 'Mất hẳn phần cuối bài nghe.',
    rootCause: 'Sức tập trung nghe chưa đủ dài, không phải kỹ năng nghe kém.',
    drill: 'Tăng dần độ dài đoạn nghe liên tục: tuần 1 là 4 phút, mỗi tuần thêm 1 phút, luôn kèm nhiệm vụ.',
    weeks: 6,
    gain: 'Giữ được điểm ở nửa sau bài nghe.',
  },
  {
    part: 'NGỮ ÂM',
    symptom: 'Sai trọng âm ở từ dài.',
    rootCause: 'Học vẹt từng từ thay vì học quy tắc dịch chuyển theo hậu tố.',
    drill: 'Học 12 nhóm hậu tố quyết định trọng âm. Mỗi ngày 20 từ dài, vỗ tay vào âm tiết mang trọng âm.',
    weeks: 2,
    gain: 'Năm câu ngữ âm gần như ăn trọn. Đây là phần lên điểm nhanh nhất cả đề.',
  },
  {
    part: 'TỪ VỰNG – NGỮ PHÁP',
    symptom: 'Biết nghĩa từng từ mà vẫn chọn sai.',
    rootCause: 'Đề hỏi cụm cố định và giới từ đi kèm, không hỏi nghĩa từ.',
    drill: 'Chuyển toàn bộ sổ từ sang ghi theo cụm. Mỗi ngày chuyển 10 từ cũ thành cụm, dùng từ điển kết hợp từ.',
    weeks: 8,
    gain: 'Thường lên 5–8 câu trong 25 câu.',
  },
  {
    part: 'TỪ VỰNG – NGỮ PHÁP',
    symptom: 'Sai lặp lại ở cùng vài cấu trúc.',
    rootCause: 'Sửa từng bài chứ không sửa quy tắc. Lỗi được chỉ ra nhưng không luyện lại.',
    drill: 'Mỗi lỗi trong sổ phải kèm 10 câu tự đặt dùng đúng quy tắc đó, làm ngay trong ngày.',
    weeks: 4,
    gain: 'Nhóm lỗi lặp biến mất khỏi sổ trong vòng một tháng.',
  },
  {
    part: 'ĐỌC',
    symptom: 'Hiểu bài nhưng hết giờ.',
    rootCause: 'Đọc tuần tự từ đầu thay vì quét theo từ khoá.',
    drill: 'Đọc câu hỏi trước, gạch từ khoá, quét tìm chính từ đó hoặc từ đồng nghĩa. 15 câu mỗi ngày theo đúng thứ tự này.',
    weeks: 4,
    gain: 'Rút 8–12 phút cho cả phần đọc.',
  },
  {
    part: 'ĐỌC',
    symptom: 'Sai nhóm câu suy luận và thái độ tác giả.',
    rootCause: 'Chưa bắt được tín hiệu thái độ: từ hạn định, từ nhượng bộ, mức độ chắc chắn.',
    drill: 'Mỗi ngày một bài xã luận, chỉ khoanh từ chỉ thái độ, bỏ qua nội dung sự kiện, rồi đoán quan điểm.',
    weeks: 5,
    gain: 'Nhóm câu khó nhất của phần đọc lên rõ rệt.',
  },
  {
    part: 'VIẾT',
    symptom: 'Bỏ trống phần biến đổi câu vì hết giờ.',
    rootCause: 'Làm đoạn luận trước. Sai thứ tự chiến thuật.',
    drill: 'Luôn làm biến đổi câu TRƯỚC. Bấm giờ 12 phút cho 16 câu, rồi mới sang đoạn luận.',
    weeks: 2,
    gain: 'Lấy lại 1,0–1,5 điểm mà không cần giỏi hơn.',
  },
  {
    part: 'VIẾT',
    symptom: 'Đoạn luận đủ ý nhưng bị chấm thấp.',
    rootCause: 'Thiếu xương sống đoạn: câu chủ đề, luận cứ, ví dụ, câu chốt.',
    drill: 'Viết dàn ý bốn dòng trước khi viết, nộp kèm bài. Mỗi ngày một đoạn 120 từ.',
    weeks: 6,
    gain: 'Lên một bậc ở tiêu chí mạch lạc và liên kết.',
  },
];

/* ------------------------------ VỀ ĐÍCH --------------------------------- */

export const FINISH_LINE = {
  name: 'ĐỊNH NGHĨA VỀ ĐÍCH',
  target: 'Đỗ chuyên với biên an toàn 0,5–1,0 điểm trên điểm chuẩn, bài chuyên từ 7,0.',
  why:
    'Biên an toàn không phải để khoe mà để chịu được biến động: điểm chuẩn năm nay có thể cao hơn năm ngoái, và ngày thi có thể là một ngày không tốt.',
  checklist: [
    'Ba đề thi thử liên tiếp đạt 7,0 trở lên, độ lệch dưới 0,7 điểm',
    'Không phần nào của đề dưới 60% số câu',
    'Đã làm ít nhất 7 đề đầy đủ trong đúng điều kiện phòng thi',
    'Ba môn chung đều đạt mức đủ để tổng vượt điểm chuẩn dự kiến 1,0 điểm',
    'Đã đi thăm phòng thi hoặc trường thi ít nhất một lần trước ngày thi',
  ],
  ifShort:
    'Còn cách đích dưới 0,5 điểm ở tháng 20: dồn toàn bộ vào đúng một phần yếu nhất, không dàn đều. Còn cách trên 1,5 điểm: ngồi lại với gia đình và bàn nghiêm túc về nguyện vọng lớp chất lượng cao — bàn ở tháng 20 còn kịp, bàn ở tháng 22 thì không.',
};
