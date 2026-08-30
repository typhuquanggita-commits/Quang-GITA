/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/* ==========================================================================
   TẦNG IELTS 9.0 — KHOẢNG CÁCH TỪ 8.0 LÊN 9.0

   VÌ SAO PHẢI CÓ TẦNG RIÊNG CHO ĐOẠN NÀY
     Toàn bộ hệ thống trước đây nhắm 8.0. Đoạn 8.0 → 9.0 không phải là
     "làm tiếp những gì đã làm, nhưng nhiều hơn". Nó là một bài toán khác,
     vì ba lý do đo được:

     1. BIÊN LỖI GẦN BẰNG KHÔNG. Ở Nghe và Đọc, band 9 đòi 39–40 câu đúng
        trên 40. Nghĩa là biên sai của cả bài là MỘT câu. Ở 8.0 thì sai
        năm sáu câu vẫn đạt; chiến thuật "làm chắc phần dễ, buông phần
        khó" hết tác dụng hoàn toàn ở đây.

     2. TIÊU CHÍ ĐỔI CHẤT, KHÔNG ĐỔI LƯỢNG. Bản mô tả band chính thức tả
        band 8 là "very good user" còn band 9 là "expert user" có "full
        operational command". Khoảng cách nằm ở ĐỘ CHÍNH XÁC và SỰ VẮNG
        MẶT CỦA GẮNG SỨC, không nằm ở từ khó hay câu phức. Đây là chỗ
        người luyện lên 9 hay đi sai đường nhất: nhồi từ hiếm và câu dài,
        rồi tụt điểm vì dùng sai sắc thái.

     3. CÓ ĐƯỜNG VÒNG BẰNG SỐ HỌC. Điểm tổng là trung bình bốn kỹ năng rồi
        làm tròn. Nên KHÔNG cần 9.0 cả bốn kỹ năng để có 9.0 tổng — và
        biết chính xác cần bao nhiêu ở đâu thì tiết kiệm được hàng trăm
        giờ. Phần dưới tính ra đủ mọi tổ hợp đạt được.

   NÓI THẲNG MỘT ĐIỀU
     9.0 tổng là mức rất ít người đạt, và với phần lớn mục đích thực tế —
     du học, định cư, xét tuyển — thì 7.5 hay 8.0 đã đủ và 9.0 không đổi
     được kết quả. Tầng này dành cho người có lý do thật để cần 9.0, không
     dành cho người coi nó là huy chương.
   ========================================================================== */

export const IELTS9_CREED = {
  name: 'TẦNG IELTS 9.0',
  claim:
    'Khoảng cách 8.0 → 9.0 phát biểu bằng thứ đo được: biên lỗi một câu ở Nghe và Đọc, tiêu chí đổi chất ở Nói và Viết, và toàn bộ tổ hợp bốn kỹ năng đạt 9.0 tổng tính ra bằng chính luật làm tròn.',
  khongPhaiTuKho:
    'Khoảng cách nằm ở độ chính xác và sự vắng mặt của gắng sức, không nằm ở từ hiếm hay câu dài. Nhồi từ khó là đường sai phổ biến nhất ở đoạn này, và nó làm TỤT điểm chứ không tăng.',
  duongVong:
    'Không cần 9.0 cả bốn kỹ năng để có 9.0 tổng. Luật làm tròn cho phép một kỹ năng ở 8.0 nếu ba kỹ năng kia ở 9.0.',
  daiDuoc:
    'Với phần lớn mục đích thực tế thì 7.5–8.0 đã đủ và 9.0 không đổi được kết quả. Tầng này dành cho người có lý do thật, không dành cho người coi 9.0 là huy chương.',
};

/* ==========================================================================
   LUẬT LÀM TRÒN — VÀ TOÀN BỘ TỔ HỢP ĐẠT 9.0

   Điểm tổng là trung bình cộng bốn kỹ năng, làm tròn về nửa band gần nhất,
   với .25 và .75 làm tròn LÊN. Tính bằng số nguyên nửa-band để không dính
   sai số dấu phẩy động — cộng bốn số thập phân rồi chia bốn là chỗ 8.75
   có thể ra 8.749999.
   ========================================================================== */

/** Các band hợp lệ của một kỹ năng, tính bằng đơn vị nửa band. */
const NUA_BAND_HOP_LE = Array.from({length: 19}, (_, i) => i); // 0 → 18, tức 0.0 → 9.0

export function diemTong(bonKyNang: number[]): number {
  if (bonKyNang.length !== 4) throw new Error('Phải đúng bốn kỹ năng');
  const tongNua = bonKyNang.reduce((s, b) => s + Math.round(b * 2), 0);
  return Math.round(tongNua / 4) / 2;
}

/**
 * Mọi tổ hợp bốn kỹ năng cho ra đúng 9.0 tổng, với sàn cho trước.
 *
 * Trả về tổ hợp KHÔNG phân biệt thứ tự kỹ năng: một tổ hợp {9,9,9,8} nói
 * rằng "ba kỹ năng 9.0 và một kỹ năng 8.0" — kỹ năng nào là chuyện của
 * người học, và đó chính là chỗ có thể chọn.
 */
export function toHopDat(muc: number, san = 7): number[][] {
  const nuaSan = Math.round(san * 2);
  const ra: number[][] = [];
  const nuas = NUA_BAND_HOP_LE.filter((n) => n >= nuaSan);
  for (const a of nuas)
    for (const b of nuas.filter((x) => x >= a))
      for (const c of nuas.filter((x) => x >= b))
        for (const d of nuas.filter((x) => x >= c))
          if (Math.round((a + b + c + d) / 4) / 2 === muc) ra.push([a, b, c, d].map((n) => n / 2));
  return ra;
}

export const SO_HOC_9 = {
  luat:
    'Điểm tổng là trung bình bốn kỹ năng, làm tròn về nửa band gần nhất; .25 và .75 làm tròn lên.',
  nguongTrungBinh: 8.75,
  nguongTong: 35,
  ynghia:
    'Cần tổng bốn kỹ năng đạt ít nhất 35.0. Đó là chỗ mở ra đường vòng: 9+9+9+8 = 35 vẫn ra 9.0 tổng.',
  chienThuat:
    'Hệ quả thực tế: chọn ĐÚNG một kỹ năng để buông xuống 8.0, và buông kỹ năng đắt nhất. Với gần như mọi người học tiếng Việt, kỹ năng đắt nhất là Viết — nó cần người chấm đồng ý, còn Nghe và Đọc chỉ cần đúng.',
};

/* ==========================================================================
   NGHE VÀ ĐỌC — BIÊN LỖI MỘT CÂU
   ========================================================================== */

export const NGHE_DOC_9 = {
  yeuCau:
    'Band 9 ở Nghe cần 39/40. Ở Đọc Academic cần 39–40/40. Biên sai của cả bài là một câu, và ở Đọc có đề không cho phép sai câu nào.',
  khongCongBoDayDu:
    'IELTS KHÔNG công bố bảng quy đổi đầy đủ từ số câu đúng ra band, và bảng đó thay đổi theo từng đề. Mọi bảng quy đổi chi tiết lưu hành trên mạng đều là ước lượng. Con số 39/40 cho band 9 là mốc được nêu nhất quán, nhưng vẫn phải hiểu là mốc chứ không phải cam kết.',
  doiChienThuat: [
    'Ở 8.0 thì buông phần khó là hợp lý. Ở 9.0 thì không còn phần nào được buông — mọi câu đều phải làm và phải đúng.',
    'Lỗi chính tả và lỗi số nhiều bị tính là SAI. Ở mức này, phần lớn điểm mất đi là lỗi chép đáp án chứ không phải lỗi nghe hay đọc.',
    'Quá số chữ cho phép cũng bị tính sai. Đọc kỹ giới hạn "NO MORE THAN TWO WORDS" trước mỗi nhóm câu, vì giới hạn đổi giữa các nhóm trong cùng một đề.',
    'Dành 2 phút cuối chỉ để soát chính tả và số nhiều của những ô đã điền, không để làm thêm câu mới. Ở biên một lỗi, soát đáng giá hơn làm thêm.',
  ],
  luyenTap:
    'Chuyển từ đo "đúng bao nhiêu câu" sang đo "sai vì lý do gì". Ghi mỗi câu sai vào một trong bốn ô: không nghe/đọc ra, hiểu sai câu hỏi, chép sai, quá giới hạn chữ. Ba ô sau sửa được trong vài tuần và thường chiếm quá nửa số lỗi ở mức 8.0.',
};

/* ==========================================================================
   VIẾT VÀ NÓI — TIÊU CHÍ ĐỔI CHẤT
   ========================================================================== */

export interface TieuChi9 {
  id: string;
  kyNang: 'viet' | 'noi';
  ten: string;
  tenAnh: string;
  band8: string;
  band9: string;
  /** Việc cụ thể phải đổi, không phải lời khuyên chung. */
  doiGi: string;
  /** Dấu hiệu tự kiểm được, không cần người chấm. */
  tuKiem: string;
}

export const TIEU_CHI_9: TieuChi9[] = [
  {
    id: 'tr',
    kyNang: 'viet',
    ten: 'Trả lời đúng yêu cầu',
    tenAnh: 'Task Response',
    band8: 'Trả lời đủ mọi phần của đề, ý chính rõ và có phát triển, nhưng có chỗ phát triển chưa đều.',
    band9: 'Mọi phần của đề được trả lời ĐẦY ĐỦ và phát triển đều tay; quan điểm rõ suốt bài, không có ý nào bị bỏ dở.',
    doiGi:
      'Trước khi viết, tách đề thành các phần phải trả lời và đếm chúng. Bài band 8 hay hỏng ở chỗ trả lời phần thứ hai của đề mỏng hơn phần thứ nhất, không phải ở chỗ thiếu ý.',
    tuKiem:
      'Đếm số câu dành cho mỗi phần của đề. Chênh nhau quá gấp đôi là dấu hiệu phát triển không đều.',
  },
  {
    id: 'cc',
    kyNang: 'viet',
    ten: 'Mạch lạc và liên kết',
    tenAnh: 'Coherence and Cohesion',
    band8: 'Sắp xếp thông tin logic, liên kết tốt, đôi chỗ dùng từ nối hơi máy móc.',
    band9: 'Mạch lạc tới mức người đọc không phải để ý tới cấu trúc; liên kết tự nhiên và không gây chú ý về chính nó.',
    doiGi:
      'Bỏ bớt từ nối, đừng thêm. Ở band 8, lỗi thường gặp là rắc "Moreover, Furthermore, In addition" ở đầu mỗi đoạn — đó chính là liên kết GÂY CHÚ Ý, và nó chặn đường lên 9.',
    tuKiem:
      'Xoá hết từ nối đầu câu rồi đọc lại. Nếu mạch vẫn liền thì bài mạch lạc thật; nếu đứt thì trước đó từ nối đang che một chỗ đứt logic.',
  },
  {
    id: 'lr',
    kyNang: 'viet',
    ten: 'Vốn từ',
    tenAnh: 'Lexical Resource',
    band8: 'Dùng từ linh hoạt và chính xác, thỉnh thoảng sai sắc thái hoặc kết hợp từ.',
    band9: 'Dùng từ tự nhiên và chính xác hoàn toàn; sai sót nếu có chỉ là lỗi đánh máy hiếm hoi.',
    doiGi:
      'Chuyển từ học từ mới sang học KẾT HỢP TỪ của những từ đã biết. Ở mức này, điểm mất vì "heavy rain" viết thành "strong rain" nhiều hơn vì thiếu từ.',
    tuKiem:
      'Với mỗi từ ít gặp đã dùng, tự hỏi có chắc kết hợp này người bản ngữ nói không. Không chắc thì thay bằng từ thường mà chắc — từ thường dùng đúng ăn điểm cao hơn từ hiếm dùng sai.',
  },
  {
    id: 'gra',
    kyNang: 'viet',
    ten: 'Ngữ pháp',
    tenAnh: 'Grammatical Range and Accuracy',
    band8: 'Đa dạng cấu trúc, phần lớn câu không lỗi, còn lỗi lẻ tẻ không hệ thống.',
    band9: 'Đa dạng và chính xác hoàn toàn; lỗi cực hiếm và ở mức người bản ngữ cũng mắc.',
    doiGi:
      'Không viết câu dài hơn. Viết câu mình KIỂM SOÁT ĐƯỢC. Một bài toàn câu vừa phải không lỗi ăn điểm cao hơn bài có câu phức ba tầng kèm hai lỗi.',
    tuKiem:
      'Đếm lỗi trên 100 chữ. Ở band 8 thường là 2–4 lỗi; band 9 gần như bằng 0. Đếm được thì mới cải thiện được.',
  },
  {
    id: 'fc',
    kyNang: 'noi',
    ten: 'Trôi chảy và mạch lạc',
    tenAnh: 'Fluency and Coherence',
    band8: 'Nói trôi, hiếm khi tự sửa hoặc ngập ngừng; ý rõ và có tổ chức.',
    band9: 'Nói trôi hoàn toàn, KHÔNG có gắng sức thấy được; ngập ngừng nếu có là để nghĩ nội dung, không phải để tìm từ.',
    doiGi:
      'Phân biệt hai loại ngập ngừng. Dừng để nghĩ ý thì không trừ điểm; dừng để tìm từ thì trừ. Chữa loại thứ hai bằng cách nói về chủ đề quen tới mức từ tự ra, không bằng cách nói nhanh hơn.',
    tuKiem:
      'Ghi âm hai phút rồi nghe lại, đếm số lần dừng quá một giây và ghi lý do từng lần. Đây là phép đo tự làm được, không cần giám khảo.',
  },
  {
    id: 'p',
    kyNang: 'noi',
    ten: 'Phát âm',
    tenAnh: 'Pronunciation',
    band8: 'Rõ ràng, còn lỗi nhỏ thỉnh thoảng; người nghe hiểu suốt.',
    band9: 'Kiểm soát đầy đủ ngữ điệu, trọng âm và nhịp; hoàn toàn tự nhiên, không có chỗ phát âm sai.',
    doiGi:
      'Chuyển trọng tâm từ âm đơn sang TRỌNG ÂM CÂU và NHỊP. Người học tiếng Việt hay phát âm từng âm rất chuẩn nhưng đều tăm tắp về nhịp, vì tiếng Việt là ngôn ngữ tính theo âm tiết còn tiếng Anh tính theo trọng âm. Đó là thứ giám khảo nghe ra ngay và là trần thật của phần lớn người dừng ở 8.0.',
    tuKiem:
      'Đọc một câu dài rồi vỗ tay theo trọng âm. Vỗ đều nhau ở mọi từ là dấu hiệu đang nói theo nhịp tiếng Việt.',
  },
];

export const tieuChiCua = (k: 'viet' | 'noi') => TIEU_CHI_9.filter((t) => t.kyNang === k);

/* ==========================================================================
   NĂM ĐƯỜNG SAI PHỔ BIẾN Ở ĐOẠN 8.0 → 9.0
   ========================================================================== */

export const DUONG_SAI = [
  {
    sai: 'Nhồi từ hiếm',
    viSao:
      'Từ hiếm dùng sai sắc thái bị trừ ở tiêu chí vốn từ, trong khi từ thường dùng đúng thì không. Đổi một từ chắc lấy một từ oai là đổi lỗ.',
    thayBang: 'Học kết hợp từ của những từ đã biết. Kết hợp đúng mới là thứ band 9 đo.',
  },
  {
    sai: 'Viết câu dài hơn cho "phức tạp"',
    viSao: 'Câu càng dài càng nhiều chỗ sai, mà band 9 đo độ chính xác chứ không đo độ dài.',
    thayBang: 'Viết câu kiểm soát được, đa dạng bằng cách đổi kiểu câu chứ không bằng cách kéo dài.',
  },
  {
    sai: 'Rắc từ nối ở đầu mỗi đoạn',
    viSao:
      'Bản mô tả band nói liên kết ở mức cao phải KHÔNG gây chú ý. Từ nối máy móc là dấu hiệu rõ nhất của bài band 7–8.',
    thayBang: 'Nối bằng ý: câu sau nhắc lại một khái niệm của câu trước. Liên kết đó không nhìn thấy được.',
  },
  {
    sai: 'Luyện thêm đề thay vì chữa lỗi',
    viSao:
      'Ở biên một câu, thứ quyết định là loại lỗi còn sót chứ không phải số đề đã làm. Làm thêm đề mà không phân loại lỗi thì lặp lại đúng lỗi cũ.',
    thayBang: 'Mỗi đề làm xong dành gấp đôi thời gian để phân loại lỗi theo bốn ô, rồi luyện đúng ô đang rò.',
  },
  {
    sai: 'Nhắm 9.0 cả bốn kỹ năng',
    viSao:
      'Tổng 35.0 là đủ, nên ép Viết lên 9.0 khi ba kỹ năng kia đã 9.0 là làm việc thừa — và Viết là kỹ năng đắt nhất.',
    thayBang: 'Tính tổ hợp trước, rồi dồn giờ vào kỹ năng rẻ nhất còn thiếu.',
  },
];

export const IELTS9_SO = {
  soTieuChi: TIEU_CHI_9.length,
  soDuongSai: DUONG_SAI.length,
  nguongTong: SO_HOC_9.nguongTong,
  soToHopDat9: toHopDat(9, 7).length,
  soCauDungNghe: 39,
  soCauDungDoc: 39,
  bienLoi: 1,
};
