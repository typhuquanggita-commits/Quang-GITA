/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {VoiceProfile, DeliverySpec, AccentContrast} from '../types';

/* ==========================================================================
   DÀN GIỌNG — 10 giọng học viên chọn được
   Tuyển từ 904 giọng của model en-us-libritts-high bằng bộ sàng lọc âm học
   (tools/cast_voices.py): tần số cơ bản đúng vùng 20–28 tuổi, phổ sáng để phụ
   âm rõ, biến thiên cao độ đủ để dẫn sinh động.
   ========================================================================== */

export const CASTING_NOTE = {
  how: 'Nghe hết 904 giọng là không khả thi, nên bước một là sàng lọc bằng số đo, bước hai mới là nghe.',
  criteria: [
    'Tần số cơ bản: nam 110–140Hz, nữ 190–215Hz — vùng đặc trưng của giọng 20–28 tuổi.',
    'Độ sáng phổ quanh 1.700Hz — đủ sáng để phụ âm rõ, chưa tới mức chói.',
    'Biến thiên cao độ quanh 26 — có lên xuống để dẫn sinh động, không lạc giọng.',
    'Dải động quanh 17dB — khoẻ và đều, không bẹt cũng không nhảy loạn.',
  ],
  command: 'python3 tools/cast_voices.py --scan 140 --reel',
  caveat:
    'Số đo lọc được giọng KHÔNG đạt, nhưng không thay được tai người ở bước cuối. Băng audition 77 giây trong audio/casting/ là để nghe và chốt.',
};

export const VOICE_ROSTER: VoiceProfile[] = [
  {
    id: 'v1', no: 1, stageName: 'ĐỨC', gender: 'nam', accent: 'Anh–Mỹ',
    age: '24–26', character: 'Trầm ấm, chắc nhịp, nói như đang giải thích cho một người bạn.',
    bestFor: 'Bài giảng lõi và phần Giải mã lỗi — nơi cần người nghe tin tưởng.',
    model: 'en-us-libritts-high', speaker: 540,
    measured: {f0: 120, centroid: 1834, variation: 23},
  },
  {
    id: 'v2', no: 2, stageName: 'MINH', gender: 'nam', accent: 'Anh–Mỹ',
    age: '25–27', character: 'Điềm đạm, nhịp đều, ít lên xuống — dễ nghe khi nghe dài.',
    bestFor: 'Khối NẠP 20 phút và audio Lập trình tư duy.',
    model: 'en-us-libritts-high', speaker: 330,
    measured: {f0: 119, centroid: 1567, variation: 16},
  },
  {
    id: 'v3', no: 3, stageName: 'KHOA', gender: 'nam', accent: 'Anh–Mỹ',
    age: '24–26', character: 'Trầm, gọn, dứt khoát từng câu.',
    bestFor: 'Buổi BẮN PHẢN XẠ — câu ngắn, nhịp nhanh, cần dứt khoát.',
    model: 'en-us-libritts-high', speaker: 318,
    measured: {f0: 117, centroid: 1448, variation: 21},
  },
  {
    id: 'v4', no: 4, stageName: 'BẢO', gender: 'nam', accent: 'Anh–Mỹ',
    age: '22–24', character: 'Trẻ, sáng, năng lượng cao, hơi nhanh.',
    bestFor: 'Nhiệm vụ hằng ngày và phần mở đầu tạo hứng.',
    model: 'en-us-libritts-high', speaker: 426,
    measured: {f0: 135, centroid: 2278, variation: 26},
  },
  {
    id: 'v5', no: 5, stageName: 'NAM', gender: 'nam', accent: 'Anh–Mỹ',
    age: '23–25', character: 'Trẻ, vui, nhiều biến thiên — chất dẫn chương trình.',
    bestFor: 'Tình huống hội thoại và phần kể chuyện.',
    model: 'en-us-libritts-high', speaker: 102,
    measured: {f0: 136, centroid: 1968, variation: 27},
  },
  {
    id: 'v6', no: 6, stageName: 'LINH', gender: 'nữ', accent: 'Anh–Mỹ',
    age: '23–25', character: 'Trong, ấm, nhịp vừa — nghe lâu không mỏi.',
    bestFor: 'Giọng dẫn chính của toàn series.',
    model: 'en-us-libritts-high', speaker: 108,
    measured: {f0: 200, centroid: 1480, variation: 24},
  },
  {
    id: 'v7', no: 7, stageName: 'HÀ', gender: 'nữ', accent: 'Anh–Mỹ',
    age: '22–24', character: 'Sáng, nhiều lên xuống, vui — chất MC trẻ.',
    bestFor: 'Chuyên mục 5 Phút Mỗi Sáng và các phần cần khí thế.',
    model: 'en-us-libritts-high', speaker: 84,
    measured: {f0: 202, centroid: 1639, variation: 32},
  },
  {
    id: 'v8', no: 8, stageName: 'THU', gender: 'nữ', accent: 'Anh–Mỹ',
    age: '25–27', character: 'Chững chạc, rõ ràng, nhịp chậm hơn một chút.',
    bestFor: 'Câu mẫu để shadowing — nơi cần chậm và rõ tuyệt đối.',
    model: 'en-us-libritts-high', speaker: 780,
    measured: {f0: 192, centroid: 1625, variation: 25},
  },
  {
    id: 'v9', no: 9, stageName: 'AN', gender: 'nữ', accent: 'Anh–Mỹ',
    age: '22–24', character: 'Cao, sáng, nhanh nhẹn, tươi.',
    bestFor: 'Vai thứ hai trong hội thoại hai người.',
    model: 'en-us-libritts-high', speaker: 138,
    measured: {f0: 206, centroid: 1829, variation: 28},
  },
  {
    id: 'v10', no: 10, stageName: 'CHI', gender: 'nữ', accent: 'Anh–Mỹ',
    age: '21–23', character: 'Trẻ nhất dàn, biến thiên lớn nhất, rất sinh động.',
    bestFor: 'Tình huống đời thường và phần tương tác vui.',
    model: 'en-us-libritts-high', speaker: 18,
    measured: {f0: 212, centroid: 1543, variation: 34},
  },
];

/* ------------------- CHUẨN CHẤT GIỌNG: MC TRUYỀN HÌNH -------------------- */

/* ------------------ GIỚI HẠN CỦA GIỌNG VIỆT NGOẠI TUYẾN ------------------ */

/**
 * Đây là giới hạn kỹ thuật quan trọng nhất của phần âm thanh, và nó không sửa
 * được bằng hậu kỳ. Ghi ở đây để không ai đi lại con đường đã dò.
 */
export const VIETNAMESE_TTS_LIMIT = {
  finding:
    'Không model Piper tiếng Việt nào biểu diễn được thanh điệu. Sáu từ ma, mà, mả, mã, má, mạ đi vào model như một.',
  why:
    'Piper dùng một bảng ký hiệu IPA chung 130 ký tự cho mọi ngôn ngữ. Trong bảng đó không có ký hiệu thanh điệu nào. espeak-ng phiên âm tiếng Việt CÓ kèm thanh, mã hoá bằng chữ số — nhưng mọi chữ số bị loại im lặng trước khi vào model, chiếm khoảng 14% tổng số âm vị của một câu.',
  evidence:
    'Đo trên sáu câu thử: 17% âm vị bị bỏ qua, trong đó 44 lần là dấu thanh. Dựng riêng sáu từ một thanh cho thấy đường cao độ không khớp thanh nào: "mà" là thanh huyền phải đi xuống thì lại đi lên 225→232 Hz, "má" là thanh sắc phải lên gắt thì gần như phẳng 198→200 Hz.',
  notFixable:
    'Thông tin thanh điệu chưa từng đi vào model, kể cả lúc huấn luyện. Không có bộ lọc, bộ chỉnh cao độ hay kỹ thuật hậu kỳ nào tạo lại được thứ chưa bao giờ tồn tại.',
  secondIssue:
    'Cả hai model tiếng Việt còn xuất ở 16 kHz, nghĩa là mất toàn bộ dải trên 8 kHz. Đo trên bản dựng thật: chỉ 1% năng lượng nằm trên 8 kHz. Model tiếng Anh dùng trong hệ thống là 22 kHz, nên phần tiếng Anh nghe hẳn hơn phần tiếng Việt — chênh lệch đó không phải do cách trộn.',
  fix:
    'Muốn giọng Việt chuẩn thanh điệu, phải đổi nguồn tổng hợp: Google Cloud TTS (vi-VN-Neural2-A giọng nữ, vi-VN-Neural2-D giọng nam, 24 kHz) hoặc Gemini TTS. Cả hai đã có sẵn trong pipeline, chỉ cần khoá API. Ngoài ra là thu giọng người thật.',
  verify: 'python3 tools/kiem-am-viet.py',
};

export const MC_DELIVERY: DeliverySpec[] = [
  {
    id: 'd-rate',
    aspect: 'Tốc độ',
    target:
      'Tiếng Việt 145–160 từ/phút. Tiếng Anh cho câu mẫu 110–125 từ/phút; cho phần dẫn 135–150.',
    why:
      'MC bản tin nói khoảng 150 từ/phút — đủ nhanh để không buồn ngủ, đủ chậm để nghe một lần là hiểu. Câu mẫu tiếng Anh phải chậm hơn hẳn vì học viên đang nói đuổi theo.',
    howToDirect:
      'Nếu người đọc phải hít hơi giữa câu thì đang quá nhanh. Nếu người nghe kịp nghĩ sang việc khác thì đang quá chậm.',
    bounds: [
      // Máy đếm được ÂM TIẾT, không đếm được TỪ — nên ngưỡng máy đặt theo âm
      // tiết. Quy đổi: tiếng Việt khoảng 1,6 âm tiết một từ, tiếng Anh khoảng
      // 1,4. Dải rộng vì một tập podcast trộn cả tiếng Việt (nhanh hơn) lẫn
      // câu mẫu tiếng Anh (đọc chậm hẳn để học viên nói đuổi theo).
      {metric: 'am_tiet_phut', min: 190, max: 300, unit: 'âm tiết/phút', scope: 'chung'},
    ],  },
  {
    id: 'd-pitch',
    aspect: 'Cao độ và biến thiên',
    target:
      'Nam 110–140Hz, nữ 190–215Hz. Biến thiên cao độ 20–32 — có lên xuống rõ nhưng không kịch.',
    why:
      'Giọng đều một mạch làm người nghe rơi vào trạng thái lơ đãng sau khoảng bốn phút. Biến thiên là thứ giữ sự chú ý mà không cần tăng âm lượng.',
    howToDirect:
      'Mỗi câu có một từ được nhấn. Chọn trước từ đó rồi mới đọc. Không nhấn thì câu thành phẳng; nhấn ba từ thì thành kịch.',
    bounds: [
      {metric: 'f0', min: 110, max: 140, unit: 'Hz', scope: 'nam'},
      {metric: 'f0', min: 190, max: 215, unit: 'Hz', scope: 'nữ'},
      {metric: 'f0_var', min: 20, max: 32, unit: 'Hz', scope: 'chung'},
    ],  },
  {
    id: 'd-energy',
    aspect: 'Năng lượng',
    target: 'Ổn định ở mức 7/10 suốt bài. Không mở 10/10 rồi tụt xuống 4/10.',
    why:
      'Chất MC không nằm ở việc hô to, mà ở chỗ giữ được cùng một mức năng lượng từ giây đầu tới giây cuối. Người nghe cảm nhận sự tụt dốc rõ hơn nhiều so với mức tuyệt đối.',
    howToDirect:
      'Đứng khi đọc, không ngồi. Đọc như đang nói với một người ngồi cách hai mét, không phải với micro cách hai mươi phân.',
    bounds: [
      {metric: 'troi_nang_luong', min: 0, max: 2.5, unit: 'dB lệch đầu–cuối', scope: 'chung'},
      {metric: 'lufs', min: -17, max: -15, unit: 'LUFS', scope: 'chung'},
    ],  },
  {
    id: 'd-clarity',
    aspect: 'Độ rõ phụ âm',
    target: 'Trọng tâm phổ quanh 1.700Hz. Mọi âm cuối phải nghe được.',
    why:
      'Người nghe qua tai nghe rẻ tiền, trên xe buýt, giữa tiếng ồn. Phụ âm là thứ mất trước tiên, và mất phụ âm là mất nghĩa.',
    howToDirect:
      'Đọc thử một câu rồi nghe lại qua loa điện thoại, không nghe qua tai nghe xịn. Nghe rõ ở đó mới là rõ.',
    bounds: [
      {metric: 'centroid', min: 1450, max: 1950, unit: 'Hz', scope: 'chung'},
      {metric: 'ti_le_cao_tan', min: 0.12, max: 0.40, unit: 'phần năng lượng trên 2kHz', scope: 'chung'},
    ],  },
  {
    id: 'd-warmth',
    aspect: 'Thái độ',
    target: 'Vui nhưng không đùa. Gần gũi nhưng không suồng sã.',
    why:
      'Học viên mở app lúc 5h45 sáng hoặc lúc mệt sau giờ làm. Giọng phải là lý do họ ở lại, không phải lý do họ tắt.',
    howToDirect:
      'Mỉm cười khi đọc — nghe được qua micro. Nhưng không cười thành tiếng và không thêm câu đùa vào kịch bản.',
    notMeasurable:
      'Không có ngưỡng máy đo cho tiêu chí này. Thái độ là thứ người nghe cảm được mà máy không đo được — gán cho nó một con số sẽ tạo cảm giác khách quan giả. Tiêu chí này do người duyệt chấm.',
  },
  {
    id: 'd-pause',
    aspect: 'Nhịp nghỉ',
    target:
      'Nghỉ 0,3–0,5 giây giữa các câu. 0,8–1,2 giây khi chuyển ý. Đúng 15–20 giây ở dòng LẶNG.',
    why:
      'Chỗ nghỉ là chỗ người nghe kịp hiểu. MC giỏi nghỉ nhiều hơn người mới tưởng, và chính khoảng nghỉ tạo cảm giác chững chạc.',
    howToDirect:
      'Kịch bản đã đánh dấu sẵn từng khoảng nghỉ bằng giây. Bám đúng, đừng lấp bằng "ờ" hay hít hơi to.',
    bounds: [
      {metric: 'nghi_trung_binh', min: 0.30, max: 0.85, unit: 'giây', scope: 'chung'},
      {metric: 'so_nghi', min: 8, max: 22, unit: 'lần/phút', scope: 'chung'},
      {metric: 'ti_le_lang', min: 0.10, max: 0.30, unit: 'phần thời lượng', scope: 'chung'},
    ],  },
];

/* ---------------- BỘ ĐỐI CHIẾU ANH–ANH VÀ ANH–MỸ ------------------------ */

export const ACCENT_STANDARD = {
  title: 'Hai chuẩn, dạy song song từ đầu',
  why:
    'IELTS dùng cả giọng Anh, Mỹ, Úc và các giọng khác. Học viên chỉ quen một giọng sẽ mất điểm Listening ở đúng những phần khó nhất. Hệ thống này dạy cả hai chuẩn song song ngay từ Tầng 1, và đánh dấu rõ câu nào theo chuẩn nào.',
  rule:
    'Học viên CHỌN một chuẩn để NÓI theo, nhưng phải NGHE được cả hai. Trộn hai chuẩn khi nói là lỗi bị trừ điểm ở tiêu chí Phát âm.',
  marking:
    'Trong kịch bản, vai ANH và ANH-NỮ đọc theo chuẩn Anh–Mỹ; vai ANH-ANH và ANH-ANH-NAM đọc theo chuẩn Anh–Anh. Cùng một câu có thể xuất hiện hai lần, hai giọng, để học viên nghe khác biệt trực tiếp.',
};

export const ACCENT_CONTRASTS: AccentContrast[] = [
  {
    id: 'a-rhotic',
    feature: 'Âm /r/ sau nguyên âm',
    gb: 'Không đọc. car → /kɑː/, better → /ˈbetə/',
    us: 'Đọc rõ. car → /kɑːr/, better → /ˈbetər/',
    example: 'car · park · better · water · four',
    teachAt: 'Tầng 1 · cấp BẮT NHỊP',
    matters:
      'Khác biệt lớn nhất và dễ nhận ra nhất. Học viên nghe quen một bên sẽ hụt hẳn khi gặp bên kia.',
  },
  {
    id: 'a-bath',
    feature: 'Nhóm từ BATH',
    gb: 'Nguyên âm dài /ɑː/. bath → /bɑːθ/, class → /klɑːs/',
    us: 'Nguyên âm ngắn /æ/. bath → /bæθ/, class → /klæs/',
    example: 'bath · class · dance · answer · can\'t · after',
    teachAt: 'Tầng 1 · cấp THẤU ÂM',
    matters:
      'Nhóm này xuất hiện rất dày trong đề thi. Nghe nhầm can\'t thành can là đảo ngược nghĩa cả câu.',
  },
  {
    id: 'a-flap',
    feature: 'Âm /t/ giữa hai nguyên âm',
    gb: 'Giữ /t/ rõ. water → /ˈwɔːtə/',
    us: 'Chớp thành gần /d/. water → /ˈwɑːɾər/',
    example: 'water · better · letter · city · party · matter',
    teachAt: 'Tầng 1 · cấp LỌC NHIỄU',
    matters:
      'Đây là lý do hàng đầu khiến người Việt nghe hụt giọng Mỹ: từ quen nhưng âm lạ hoàn toàn.',
  },
  {
    id: 'a-lot',
    feature: 'Nguyên âm nhóm LOT',
    gb: 'Môi tròn /ɒ/. hot → /hɒt/, not → /nɒt/',
    us: 'Môi không tròn /ɑː/. hot → /hɑːt/, not → /nɑːt/',
    example: 'hot · not · lot · coffee · stop · box',
    teachAt: 'Tầng 2 · cấp THẤY HÌNH',
    matters: 'Ảnh hưởng tới hàng trăm từ thông dụng nhất.',
  },
  {
    id: 'a-yod',
    feature: 'Âm /j/ sau phụ âm',
    gb: 'Giữ. new → /njuː/, tune → /tjuːn/, duty → /ˈdjuːti/',
    us: 'Lược bỏ. new → /nuː/, tune → /tuːn/, duty → /ˈduːti/',
    example: 'new · tune · duty · student · Tuesday · news',
    teachAt: 'Tầng 2 · cấp ĐỌC Ý',
    matters: 'Ít gặp hơn nhưng gây hiểu nhầm ở các từ rất thông dụng như news và student.',
  },
  {
    id: 'a-stress',
    feature: 'Trọng âm khác nhau',
    gb: 'garAGE · adVERtisement · reSEARCH',
    us: 'gaRAGE · adverTISEment · REsearch',
    example: 'garage · advertisement · research · address · detail',
    teachAt: 'Tầng 3 · cấp NỐI CÂU',
    matters:
      'Đặt sai trọng âm khiến người nghe không nhận ra từ, kể cả khi mọi âm đều đúng.',
  },
  {
    id: 'a-intonation',
    feature: 'Ngữ điệu chung',
    gb: 'Dải cao độ rộng hơn, lên xuống nhiều hơn, kết câu thường xuống dứt khoát.',
    us: 'Dải hẹp hơn, phẳng hơn, câu kể đôi khi kết bằng ngữ điệu lên.',
    example: 'Nghe cùng một câu do hai giọng đọc để cảm nhận',
    teachAt: 'Tầng 3 · cấp GIỮ MẠCH',
    matters:
      'Không ảnh hưởng nghĩa nhưng ảnh hưởng mạnh tới cảm nhận về độ tự nhiên — tức là tới điểm Phát âm.',
  },
  {
    id: 'a-vocab',
    feature: 'Từ vựng khác nhau',
    gb: 'flat · lift · queue · rubbish · autumn · holiday · timetable',
    us: 'apartment · elevator · line · trash · fall · vacation · schedule',
    example: 'Dùng nhất quán một bộ, không trộn trong cùng một bài',
    teachAt: 'Tầng 4 · cấp DỰNG Ý',
    matters:
      'Không bị trừ điểm vì chọn bộ nào, nhưng bị trừ vì trộn hai bộ trong cùng một bài viết.',
  },
];
