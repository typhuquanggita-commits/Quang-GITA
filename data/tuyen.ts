/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  Tuyen,
  TuyenId,
  PhanKy,
  LoiChung,
  NhamLan,
  DonBay,
  KhoiNgay,
  TinhTuy,
} from '../types';
import {MILESTONES} from './roadmap';
import {UPGRADE_PLANS, BANDS, CHUYEN_PHASES, EXAM_PARTS, EXAM_SPEC} from './chuyenanh';

/* ==========================================================================
   HAI TUYẾN
   Trước tệp này, hai lộ trình nằm lẫn trong cùng một dãy tab. Một gia đình
   mở app lên không biết mục nào là của con mình, nên đọc hết — và đọc hết
   thì không làm gì cả. Tệp này làm đúng hai việc: tách rõ hai tuyến, rồi
   lọc mỗi tuyến xuống phần không thể bỏ.
   ========================================================================== */

export const TUYEN_CREED = {
  name: 'HAI TUYẾN, MỘT ĐỘNG CƠ',
  claim:
    'IELTS 8.0 và chuyên Anh vào 10 dùng chung một động cơ nhưng khác hộp số. Chung phần làm nên năng lực; khác phần đổi năng lực thành điểm.',
  deepest:
    'Khác biệt sâu nhất không nằm ở đề thi mà ở CÁCH ĐO. IELTS đo tuyệt đối: band của bạn không phụ thuộc vào ai khác, và thi lại được — chính hồ sơ IELTS trong hệ thống này đã dặn coi lần thi đầu là "lần lấy dữ liệu, đã có sẵn kế hoạch lần 2". Chuyên đo tương đối: phải vượt điểm chuẩn do chính các thí sinh khác đẩy lên, vào đúng một ngày, không có lần hai.',
  consequence:
    'Từ một khác biệt đó chảy ra tất cả những khác biệt còn lại. IELTS tối ưu cho ĐỈNH: cứ nâng trần, chưa tới thì thi sau. Chuyên tối ưu cho BIÊN và ĐỘ ỔN ĐỊNH: thà 7,2 ở cả ba đề còn hơn 8,0 rồi 6,0 — vì ngày thi có thể rơi vào đề thứ hai.',
  reversible:
    'Chọn tuyến không phải cánh cửa một chiều. Bảy phần lõi dưới đây chiếm phần lớn hai năm đầu của cả hai tuyến và giống hệt nhau, nên một em đổi hướng ở tháng 12 không mất năm đầu — chỉ đổi phần trên.',
  oneRule:
    'Nguyên tắc chọn: có một ngày thi cố định không dời được thì đi tuyến chuyên. Không có ngày thi cố định thì đi tuyến IELTS. Đừng chọn theo cái nào nghe oai hơn.',
};

/* ------------------------------ HAI TUYẾN ------------------------------- */

export const TUYEN: Tuyen[] = [
  {
    id: 'ielts',
    icon: '🎯',
    ten: 'TUYẾN IELTS 8.0',
    phuDe: 'Ba năm, từ con số 0 tới band 8.0',
    dich: 'Band 8.0 tổng, không kỹ năng nào dưới 7.0.',
    doiTuong:
      'Người học không bị ràng buộc bởi một ngày thi cố định: học sinh cấp ba còn dư thời gian, sinh viên, người đi làm.',
    batDau: 'Bất kỳ lúc nào. Đồng hồ bắt đầu từ ngày đầu tiên có mặt.',
    soThang: 36,
    nhipNgay: '45 phút ở quý 1, tăng dần tới 150 phút ở quý 12',
    heDo: 'CEFR và band IELTS — 12 cột mốc, mỗi cột mốc một mùa 13 tuần',
    kyThi: 'IELTS Academic hoặc General — bốn kỹ năng, có Nói trực tiếp với giám khảo',
    kieuDo: 'tuyệt đối',
    thiLai: 'Thi lại được, bao nhiêu lần cũng được. Lần một nên coi là lần lấy dữ liệu.',
    bacThang: '25 cấp độ trong 5 tầng',
    mau: 'from-sky-500 to-violet-500',
  },
  {
    id: 'chuyen',
    icon: '🏛️',
    ten: 'TUYẾN CHUYÊN ANH VÀO 10',
    phuDe: 'Hai mươi hai tháng, từ lớp 8 tới phòng thi tháng 6 lớp 9',
    dich: 'Đỗ chuyên với biên an toàn 0,5–1,0 điểm trên điểm chuẩn, bài chuyên từ 7,0.',
    doiTuong:
      'Học sinh vào lộ trình từ lớp 8, nhắm chuyên Anh hoặc lớp chất lượng cao của các trường Hà Nội.',
    batDau: 'Đầu lớp 8. Vào muộn hơn thì phải rút mục tiêu, không rút được thời gian.',
    soThang: 22,
    nhipNgay: '60 phút bậc A, 70 phút bậc B, 90 phút bậc C — theo bậc sau test đầu vào',
    heDo: 'Điểm trên thang 10 của đề chuyên, đối chiếu với điểm chuẩn — 5 giai đoạn, 7 cấp',
    kyThi:
      'Đề chuyên Anh Sở Hà Nội, 120 phút, khoảng 86 câu, KHÔNG có phần thi Nói',
    kieuDo: 'tương đối',
    thiLai: 'Không. Một ngày, một lần. Sai ngày đó là mất cả hai năm.',
    bacThang: '7 cấp phải vượt',
    mau: 'from-amber-500 to-rose-500',
  },
];

export const TUYEN_BY_ID = Object.fromEntries(TUYEN.map((t) => [t.id, t])) as Record<
  TuyenId,
  Tuyen
>;

/* -------------------- TAB NÀO THUỘC TUYẾN NÀO --------------------------- */

/**
 * Tab nào phục vụ tuyến nào. Mảng rỗng nghĩa là tab vận hành học viện, không
 * thuộc tuyến học nào của học viên.
 *
 * Bản đồ này nằm ở tầng dữ liệu chứ không nằm trong App.tsx để công cụ
 * kiểm tra đối chiếu được hai chiều: không tab nào thiếu, không khoá nào thừa.
 */
export const TAB_TUYEN: Record<string, TuyenId[]> = {
  tuyen: ['ielts', 'chuyen'],
  chugita: ['ielts', 'chuyen'],
  gita: ['ielts', 'chuyen'],
  charter: ['ielts', 'chuyen'],
  myplan: ['ielts', 'chuyen'],
  sprint: ['ielts', 'chuyen'],
  dossier: ['ielts'],
  assistant: ['ielts', 'chuyen'],
  assess: ['ielts', 'chuyen'],
  overview: ['ielts'],
  roadmap: ['ielts'],
  chuyen: ['chuyen'],
  exams: ['chuyen'],
  methods: ['ielts', 'chuyen'],
  drills: ['ielts', 'chuyen'],
  lectures: ['ielts', 'chuyen'],
  phieu: ['ielts', 'chuyen'],
  chuyende: ['ielts', 'chuyen'],
  hoso: ['ielts', 'chuyen'],
  giangsau: ['ielts', 'chuyen'],
  playbooks: ['ielts'],
  habits: ['ielts', 'chuyen'],
  mindset: ['ielts', 'chuyen'],
  clubs: ['ielts', 'chuyen'],
  resources: ['ielts', 'chuyen'],
  // Bốn mục dưới đây App xếp vào nhóm vận hành học viện, không phải nhóm
  // học viên, nên chúng không mang tuyến — bộ lọc tuyến cũng không đụng tới.
  chuan: [],
  quyen: [],
  academy: [],
  levels: [],
  grading: [],
  podcast: [],
  certify: [],
  casting: [],
  brand: [],
  training: [],
  studio: [],
};

export const tabsCuaTuyen = (id: TuyenId): string[] =>
  Object.entries(TAB_TUYEN)
    .filter(([, ts]) => ts.includes(id))
    .map(([tab]) => tab);

/* ---------------------------- PHẦN DÙNG CHUNG --------------------------- */

export const LOI_CHUNG: LoiChung[] = [
  {
    no: 1,
    ten: 'Chuỗi ngày không đứt',
    vi: 'Cả hai tuyến đều là bài toán cộng dồn. Hồ sơ IELTS đặt chuỗi ngày làm tiêu chí quan trọng nhất của quý 1; lộ trình chuyên đặt cổng thoát ở mỗi giai đoạn. Không có ngày nào bù được cho một tháng nghỉ.',
    drillIds: ['d-journal'],
  },
  {
    no: 2,
    ten: 'Âm nền và bảng IPA',
    vi: 'Phát âm sai hoá thạch thì cả hai tuyến đều trả giá: IELTS mất điểm Pronunciation, chuyên mất trọn năm câu ngữ âm và nghe hụt cả phần Nghe. Sửa ở tháng 1 mất sáu tuần; sửa ở tháng 20 mất một năm.',
    drillIds: ['d-phonics', 'd-pronunciation-drill'],
  },
  {
    no: 3,
    ten: 'Học theo cụm, không học từ đơn',
    vi: 'Đề chuyên hỏi cụm cố định và giới từ đi kèm nên biết nghĩa từng từ vẫn sai; IELTS chấm Lexical Resource theo độ tự nhiên của cụm chứ không theo độ hiếm của từ. Cùng một lỗi, hai kiểu mất điểm.',
    drillIds: ['d-collocation', 'd-mine'],
  },
  {
    no: 4,
    ten: 'Ôn giãn cách có số đo',
    vi: 'Nhồi rồi quên sạch là lãng phí lớn nhất của cả hai tuyến. Lịch 1-3-7-14-30 và thống kê thẻ trưởng thành cho biết trí nhớ thật, không phải cảm giác đã học.',
    drillIds: ['d-anki'],
  },
  {
    no: 5,
    ten: 'Nghe hằng ngày có nhiệm vụ',
    vi: 'Nghe suông không có việc phải làm thì tai không lọc. Cả hai tuyến đều yêu cầu nghe kèm một nhiệm vụ cụ thể: bắt số, ghi bước, đoán thái độ, dựng bản đồ ý.',
    drillIds: ['d-extensive-listen', 'd-listening-map'],
  },
  {
    no: 6,
    ten: 'Sổ lỗi và chữa kỹ hơn làm',
    vi: 'Cày đề mà không phân tích lỗi thì điểm đứng yên ở cả hai tuyến — hồ sơ IELTS ghi đúng câu đó ở quý 8, lộ trình chuyên ghi đúng câu đó ở giai đoạn 5. Mỗi câu sai phải nêu được vì sao sai.',
    drillIds: ['d-errorreview'],
  },
  {
    no: 7,
    ten: 'Chưa đủ nền thì chưa vào đề',
    vi: 'Hai tuyến độc lập nhau nhưng ra cùng một luật: tuyến IELTS chưa động vào đề tới tháng 22 trên 36; tuyến chuyên chưa vào đề trước tháng 10 trên 22. Luyện đề khi nền yếu chỉ tạo cảm giác bận rộn.',
    drillIds: ['d-mock'],
  },
];

/* ------------------------------ PHÂN KỲ --------------------------------- */

export const PHAN_KY: PhanKy[] = [
  {
    truc: 'Cách đo',
    ielts: 'Tuyệt đối. Band do bài làm quyết định, không phụ thuộc thí sinh khác.',
    chuyen: 'Tương đối. Phải vượt điểm chuẩn, mà điểm chuẩn do các thí sinh khác đẩy lên.',
    heQua:
      'Tuyến IELTS tối ưu cho đỉnh; tuyến chuyên tối ưu cho biên an toàn và độ ổn định giữa các đề.',
  },
  {
    truc: 'Số lần thi',
    ielts: 'Không giới hạn. Lần một nên coi là lần lấy dữ liệu.',
    chuyen: 'Đúng một lần, vào một ngày ấn định trước hai năm.',
    heQua:
      'Tuyến chuyên phải luyện trong điều kiện gây nhiễu và đo độ lệch giữa các đề. Tuyến IELTS không cần trả giá đó.',
  },
  {
    truc: 'Kỹ năng Nói',
    ielts: 'Chiếm một phần tư điểm. Phỏng vấn trực tiếp 11–14 phút với giám khảo.',
    chuyen: 'Không có trong đề viết của Sở. Ngữ âm được hỏi trên giấy, 5 câu.',
    heQua:
      'Đây là chỗ lệch lớn nhất về thời gian. Tuyến chuyên vẫn nói mỗi ngày nhưng để giữ tai, không để lấy điểm — nên giữ ở mức 10 phút, không phải 40 phút.',
  },
  {
    truc: 'Ngữ pháp',
    ielts: 'Không có phần hỏi riêng. Ngữ pháp bị chấm gián tiếp qua Viết và Nói.',
    chuyen: 'Khối lớn nhất của đề: 25 câu, trọng số 2,9 trên 10.',
    heQua:
      'Học sinh tuyến chuyên phải luyện ngữ pháp thành phản xạ chọn đúng dưới 3 giây. Người tuyến IELTS luyện ngữ pháp bằng cách viết và bị chữa, không bằng cách làm trắc nghiệm.',
  },
  {
    truc: 'Viết',
    ielts: 'Task 1 mô tả số liệu và Task 2 luận 250 từ, tổng 60 phút.',
    chuyen: '16 câu biến đổi câu cộng một đoạn 120–150 từ, tổng 30 phút.',
    heQua:
      'Cấu trúc bốn đoạn của IELTS không dùng được trong 30 phút của đề chuyên. Đây là kiểu lẫn tuyến tốn kém nhất.',
  },
  {
    truc: 'Đọc',
    ielts: 'Ba bài dài, 40 câu, 60 phút, nhiều dạng câu hỏi khác nhau.',
    chuyen: '20 câu, 35 phút, bài có thể dài tới tám trang A4.',
    heQua:
      'Cùng một kỹ thuật quét theo từ khoá, nhưng áp lực thời gian của đề chuyên gắt hơn tính trên mỗi câu.',
  },
  {
    truc: 'Đồng hồ',
    ielts: '36 tháng, người học tự chọn ngày kết thúc.',
    chuyen: '22 tháng, ngày kết thúc đã ấn định từ trước.',
    heQua:
      'Tuyến chuyên không có quyền lùi. Chậm một tháng ở giai đoạn 3 là mất một tháng thật, không dời được.',
  },
  {
    truc: 'Ngân sách thời gian',
    ielts: 'Chỉ cạnh tranh với việc riêng của người học.',
    chuyen:
      'Cạnh tranh với Toán, Văn và sáu môn khác trên lớp — mà Toán và Văn cũng nằm trong công thức xét tuyển.',
    heQua:
      'Tiếng Anh chiếm 30 trên 50 điểm xét tuyển chuyên, nhưng 20 điểm còn lại không được bỏ. Đó là lý do lõi ngày tuyến chuyên bị chặn ở 60–90 phút.',
  },
  {
    truc: 'Bậc thang',
    ielts: '25 cấp độ theo CEFR, trải 5 tầng.',
    chuyen: '7 cấp, cấp cuối là ba đề liên tiếp đạt 7,0 với độ lệch dưới 0,7.',
    heQua:
      'Không dùng bậc thang này để đo bậc thang kia. Một em đạt cấp 12 của thang IELTS vẫn có thể trượt cấp 5 của thang chuyên vì chưa thuộc 20 mẫu biến đổi câu.',
  },
  {
    truc: 'Thất bại trông như thế nào',
    ielts: 'Đứng bánh ở band 6.5 nhiều năm vì đi tìm bí kíp mới thay vì sửa lỗi cũ.',
    chuyen: 'Đủ điểm trung bình nhưng dao động 1,5 điểm giữa các đề, rồi rơi vào đề khó đúng ngày thi.',
    heQua:
      'Hai kiểu thất bại khác nhau nên hai hệ cảnh báo sớm khác nhau: tuyến IELTS canh sổ lỗi lặp, tuyến chuyên canh độ lệch giữa các đề thi thử.',
  },
];

/* ---------------------------- LẪN TUYẾN --------------------------------- */

export const NHAM_LAN: NhamLan[] = [
  {
    ai: 'chuyen',
    sai: 'Luyện Writing Task 2 của IELTS để "viết cho chắc".',
    vi: 'Nghe có vẻ khó hơn thì làm được đề dễ hơn. Nhiều trung tâm cũng dạy chung một giáo án cho cả hai.',
    gia: 'Bài luận đề chuyên chỉ 120–150 từ trong khối viết 30 phút đã gánh sẵn 16 câu biến đổi câu. Viết theo lối bốn đoạn của IELTS là tràn giờ, và phần biến đổi câu bị bỏ trống — đúng 1,0–1,5 điểm, phần cho điểm chắc nhất cả đề.',
    dung: 'Làm biến đổi câu trước, bấm giờ 12 phút cho 16 câu, rồi mới viết đoạn với dàn ý bốn dòng.',
  },
  {
    ai: 'chuyen',
    sai: 'Dành 40 phút mỗi ngày luyện Speaking Part 2 và Part 3.',
    vi: 'Nói là kỹ năng thấy tiến bộ rõ nhất nên tạo cảm giác hiệu quả nhất.',
    gia: 'Đề chuyên Sở Hà Nội không có phần thi Nói. Bốn mươi phút mỗi ngày trong hai năm là khoảng 480 giờ đổ vào phần không được chấm.',
    dung: 'Giữ 10 phút nói mỗi ngày để tai và miệng không tụt, dồn 30 phút còn lại vào cụm từ và ngữ pháp phản xạ. Nếu trường có phần phỏng vấn riêng thì phải kiểm tra và tính lại từ đầu.',
  },
  {
    ai: 'chuyen',
    sai: 'Lấy điểm IELTS làm thước đo tiến bộ cho lộ trình chuyên.',
    vi: 'IELTS có con số đẹp và có chứng chỉ cầm được, còn điểm thi thử chuyên thì không.',
    gia: 'Hai đề đo hai thứ khác nhau. Một em 6.5 IELTS vẫn có thể chỉ được 6,0 đề chuyên vì thiếu ngữ pháp trắc nghiệm và biến đổi câu — hai khối chiếm 4,8 trên 10 điểm.',
    dung: 'Đo bằng đề chuyên thi thử, đúng 120 phút, đúng điều kiện phòng thi. Đó là thước duy nhất có nghĩa cho tuyến này.',
  },
  {
    ai: 'ielts',
    sai: 'Cày trắc nghiệm ngữ pháp 40 câu để "chắc ngữ pháp".',
    vi: 'Trắc nghiệm chấm được ngay nên cho cảm giác tiến bộ đo được.',
    gia: 'IELTS không có phần hỏi ngữ pháp riêng. Chọn đúng đáp án trong bốn lựa chọn không chuyển thành viết đúng khi phải tự nghĩ ra câu.',
    dung: 'Viết và bị chữa. Ngữ pháp lên qua sổ lỗi lặp, không qua bảng đáp án.',
  },
  {
    ai: 'ielts',
    sai: 'Đặt biên an toàn và ám ảnh độ ổn định như tuyến chuyên.',
    vi: 'Nghe có vẻ kỷ luật hơn.',
    gia: 'IELTS thi lại được nên tối ưu độ ổn định là mua bảo hiểm cho rủi ro không tồn tại. Vài tháng lẽ ra dùng để nâng trần bị tiêu vào việc giữ mức cũ.',
    dung: 'Nâng trần cho tới khi ba đề thử liên tiếp chạm mục tiêu, rồi mới đăng ký. Coi lần thi đầu là lần lấy dữ liệu.',
  },
  {
    ai: 'ielts',
    sai: 'Dùng chứng chỉ IELTS để thay cho việc ôn thi vào 10.',
    vi: 'Một số năm và một số trường có xét miễn hoặc quy đổi điểm ngoại ngữ.',
    gia: 'Quy định này THAY ĐỔI theo từng năm và từng trường, và thường chỉ áp cho môn ngoại ngữ chung chứ không thay được bài chuyên hệ số hai.',
    dung: 'Phải đọc đề án tuyển sinh chính thức của năm thi trước khi tính chứng chỉ vào kế hoạch. Không có văn bản trong tay thì coi như không có.',
  },
];

export const CANH_BAO_QUY_DOI = {
  title: 'PHẢI KIỂM TRA LẠI TRƯỚC MỖI MÙA THI',
  body: EXAM_SPEC.verifyFirst,
  them:
    'Kèm theo đó, mọi chính sách quy đổi hay miễn thi ngoại ngữ bằng chứng chỉ quốc tế cũng phải đọc lại từ đề án tuyển sinh của chính năm đó. Hệ thống này không giả định bất kỳ chính sách quy đổi nào.',
};

/* =========================== PHẦN TINH TUÝ ===============================
   Lọc từ chính dữ liệu trong hệ thống, không phải chọn bằng cảm tính.
   ========================================================================= */

/**
 * Xương sống của tuyến IELTS: bài luyện xuất hiện ở nhiều mùa nhất.
 *
 * Tần suất đo ĐỘ TRẢI, không đo độ quan trọng — d-phonics chỉ xuất hiện ở
 * một mùa nhưng bỏ nó thì hỏng cả ba năm. Vì vậy phần đòn bẩy bên dưới lấy
 * cả bài trải rộng lẫn bài chỉ xuất hiện một lần mà không thể bỏ.
 */
export function xuongSongIelts(): {drillId: string; soMua: number}[] {
  const dem: Record<string, number> = {};
  for (const m of MILESTONES) for (const d of m.drillIds) dem[d] = (dem[d] ?? 0) + 1;
  return Object.entries(dem)
    .map(([drillId, soMua]) => ({drillId, soMua}))
    .sort((a, b) => b.soMua - a.soMua || a.drillId.localeCompare(b.drillId));
}

/**
 * Đòn bẩy của tuyến chuyên, xếp theo thời gian tới khi có hiệu lực.
 *
 * Không tự nghĩ ra thứ tự: lấy nguyên chín phác đồ nâng cấp trong hệ thống
 * và sắp theo số tuần tăng dần. Rẻ nhất về thời gian đứng trước, vì học sinh
 * lớp 9 chỉ còn vài tháng thì phải biết nên tiêu tuần đầu vào đâu.
 */
export function donBayChuyen(): DonBay[] {
  return [...UPGRADE_PLANS]
    .sort((a, b) => a.weeks - b.weeks || a.part.localeCompare(b.part))
    .map((p) => ({
      ten: `${p.part} — ${p.symptom}`,
      lam: p.drill,
      vi: p.rootCause,
      tuan: p.weeks,
      duoc: p.gain,
      bo: 'Giữ nguyên triệu chứng này tới ngày thi, và nó lặp lại ở mọi đề.',
    }));
}

/**
 * Lõi ngày của tuyến chuyên, tính theo bậc sau test đầu vào.
 *
 * Ba khối cố định chiếm 40 phút ở mọi bậc; toàn bộ phần chênh lệch giữa các
 * bậc dồn vào một khối duy nhất theo giai đoạn. Nhờ vậy tổng luôn khớp đúng
 * dailyMinutes của bậc đó và không thể lệch khi ai đó sửa số ở một chỗ.
 */
export const CO_DINH_PHUT = 40;

export function loiNgayChuyen(bacId: string): KhoiNgay[] {
  const bac = BANDS.find((b) => b.id === bacId);
  if (!bac) throw new Error(`Không có bậc ${bacId}`);
  const theoPha = bac.dailyMinutes - CO_DINH_PHUT;
  return [
    {
      khoi: 'Nghe có nhiệm vụ',
      phut: 20,
      lam: 'Nghe kèm một việc phải làm: bắt số, ghi bước, đoán thái độ. Đọc câu hỏi trước khi bật băng.',
      drillId: 'd-listening-map',
    },
    {
      khoi: 'Cụm từ theo lịch giãn cách',
      phut: 15,
      lam: '10 cụm mỗi ngày, ôn theo lịch 1-3-7-14-30. Ghi theo cụm, không ghi từ đơn.',
      drillId: 'd-collocation',
    },
    {
      khoi: 'Khối theo giai đoạn',
      phut: theoPha,
      lam: 'Giai đoạn 1–2 là ngữ pháp lõi và đọc bấm giờ; giai đoạn 3–4 là luyện dạng bài; giai đoạn 5 là đề đầy đủ và chữa đề.',
    },
    {
      khoi: 'Sổ lỗi',
      phut: 5,
      lam: 'Rà lại năm câu từng sai, làm lại không nhìn đáp án. Mỗi lỗi kèm mười câu tự đặt.',
      drillId: 'd-errorreview',
    },
  ];
}

export const tongPhut = (k: KhoiNgay[]): number => k.reduce((s, x) => s + x.phut, 0);

export const TINH_TUY: TinhTuy[] = [
  {
    tuyen: 'ielts',
    motTrang:
      'Nạp đầu vào có nhiệm vụ mỗi ngày, ép một phần đầu vào đó ra thành lời nói hoặc chữ viết, đưa cái viết ra cho người khác chữa, rồi ghi lỗi lặp vào sổ và luyện đúng lỗi đó. Bốn việc ấy lặp 1.095 ngày là toàn bộ hệ thống. Mọi thứ còn lại trong app này chỉ là chi tiết của bốn việc đó ở từng giai đoạn.',
    loiNgay: [
      {
        khoi: 'Nạp đầu vào có nhiệm vụ',
        phut: 25,
        lam: 'Nghe hoặc đọc nội dung hiểu được khoảng chín phần mười, kèm một việc phải làm với nó.',
        drillId: 'd-extensive-listen',
      },
      {
        khoi: 'Ép ra thành đầu ra',
        phut: 15,
        lam: 'Nói lại hoặc viết lại chính nội dung vừa nạp, không nhìn bản gốc.',
        drillId: 'd-selftalk',
      },
      {
        khoi: 'Ôn giãn cách theo cụm',
        phut: 10,
        lam: 'Thẻ ghi cả cụm và cả câu nguồn, không ghi từ trần trụi.',
        drillId: 'd-anki',
      },
      {
        khoi: 'Sổ lỗi',
        phut: 5,
        lam: 'Chỉ trích lỗi LẶP LẠI. Sổ dày là sổ không ai đọc.',
        drillId: 'd-errorreview',
      },
    ],
    vongNgoai:
      'Năm mươi lăm phút này là mức sàn, giữ nguyên suốt 36 tháng. Phần tăng từ 45 lên 150 phút qua các mùa là phần luyện dạng bài và bài chấm, nằm ngoài lõi. Ngày bận thì cắt vòng ngoài, không bao giờ cắt lõi.',
    donBay: [
      {
        ten: 'Chuỗi ngày ở quý 1',
        lam: 'Tô đen lịch tường mỗi ngày có mặt. Mục tiêu 85 trên 90 ngày.',
        vi: 'Sản phẩm thật của quý 1 không phải 800 từ mà là chứng minh cho chính mình rằng mình là người không bỏ cuộc.',
        tuan: 13,
        duoc: 'Toàn bộ 33 tháng sau cộng dồn trên nền này.',
        bo: 'Không có chuỗi thì mọi kỹ thuật bên dưới đều vô nghĩa vì không kịp cộng dồn.',
      },
      {
        ten: 'Bảng âm IPA làm sớm',
        lam: 'Sáu tuần đi hết 44 âm, sáu tuần lặp lại chỉ tập trung 8 âm tiếng Việt không có.',
        vi: 'Chỉ xuất hiện ở một mùa trên mười hai, nhưng là mùa đầu tiên và không bù được về sau.',
        tuan: 12,
        duoc: 'Đọc được phiên âm bất kỳ từ nào, và nghe ra được âm bị nuốt.',
        bo: 'Phát âm sai hoá thạch. Hệ thống ghi rõ cái giá: mất một năm để sửa ở giai đoạn sau.',
      },
      {
        ten: 'Sổ lỗi lặp',
        lam: 'Mỗi tuần rút ra ba lỗi xuất hiện từ hai lần trở lên, luyện riêng đúng ba lỗi đó.',
        vi: 'Bài luyện có mặt ở bảy trên mười hai mùa — nhiều nhất cùng với bài viết luận.',
        tuan: 4,
        duoc: 'Đây là thứ phân biệt người lên band với người cày đề mà điểm đứng yên.',
        bo: 'Mắc kẹt ở 6.5 nhiều năm vì đi tìm bí kíp mới thay vì sửa lỗi cũ.',
      },
      {
        ten: 'Bài viết có người chữa',
        lam: 'Một bài mỗi tuần được chữa kỹ, hơn bảy bài mỗi tuần không ai đọc.',
        vi: 'Có mặt ở bảy trên mười hai mùa. Viết không được chữa là tự khắc sâu lỗi.',
        tuan: 8,
        duoc: 'Ngữ pháp và từ vựng lên gián tiếp mà không cần học riêng.',
        bo: 'Viết càng nhiều càng sai chắc, tệ hơn viết ít mà có chữa.',
      },
      {
        ten: 'Thi thử đúng điều kiện',
        lam: 'Đủ bốn kỹ năng, đúng giờ, không dừng giữa chừng, không tra cứu.',
        vi: 'Có mặt ở năm trên mười hai mùa và là thứ duy nhất trả về số liệu thật.',
        tuan: 1,
        duoc: 'Biết đang ở đâu thay vì đoán.',
        bo: 'Chỉ luyện đề dễ để giữ tinh thần rồi sốc ở phòng thi thật.',
      },
      {
        ten: 'Nói thành tiếng mỗi ngày',
        lam: 'Tự thoại hoặc kể lại, có ghi âm để nghe lại chính mình.',
        vi: 'Có mặt ở năm trên mười hai mùa. Nói chiếm một phần tư điểm nhưng thường bị né vì khó chấm.',
        tuan: 12,
        duoc: 'Giữ bốn kỹ năng không chênh nhau quá nửa band.',
        bo: 'Chênh lệch band lớn kéo tụt tổng điểm dù hai kỹ năng kia rất cao.',
      },
      {
        ten: 'Giảm tải trước ngày thi',
        lam: 'Hai tuần cuối giảm khối lượng, không học bài mới, không làm đề mới.',
        vi: 'Phong độ đỉnh cần thời gian hợp nhất, không cần thêm giờ.',
        tuan: 2,
        duoc: 'Vào phòng thi với đúng khả năng thật của mình.',
        bo: 'Học nhồi ba tuần cuối làm mất 0,5 tới 1,0 band so với khả năng thật.',
      },
    ],
    catBo: [
      {
        viec: 'Mua sách IELTS và làm đề trong năm đầu.',
        vi: 'Cho cảm giác đang ôn thi nghiêm túc, nhưng nền chưa có thì đề chỉ đo được sự trống rỗng. Hệ thống này không động vào đề tới tháng 22.',
      },
      {
        viec: 'Chép công thức ngữ pháp.',
        vi: 'Biết luật mà nói vẫn sai. Ngữ pháp thành phản xạ qua đầu vào và qua bị chữa, không qua bảng.',
      },
      {
        viec: 'Đặt mục tiêu ba giờ mỗi ngày.',
        vi: 'Tuần một hào hứng, tuần bốn tắt máy. Giữ 45 phút cho tới khi thấy nhàm mới tăng.',
      },
      {
        viec: 'Học từ hiếm để gây ấn tượng.',
        vi: 'Dùng sai ngữ cảnh mất điểm nhiều hơn được. Giám khảo chấm độ tự nhiên, không chấm độ hiếm.',
      },
      {
        viec: 'Đổi tài liệu và phương pháp mỗi khi thấy chậm.',
        vi: 'Cao nguyên năng lực ở tháng 14 là dấu hiệu bình thường, không phải lỗi của tài liệu. Đổi tài liệu lúc đó là bắt đầu lại từ đầu.',
      },
    ],
    chanDuong: [
      {
        khi: 'Cuối tháng 3',
        hoi: 'Chuỗi ngày có đạt 85 trên 90 không?',
        neuKhong: 'Lặp lại quý 1 bốn tuần với mục tiêu giờ thấp hơn. Không đi tiếp.',
      },
      {
        khi: 'Cuối tháng 12',
        hoi: 'Nền B1 đã vững chưa, hay đang vội nhảy vào IELTS vì "đã một năm rồi"?',
        neuKhong: 'Vào năm hai với nền yếu là đứng bánh ở band 6.0 suốt mười hai tháng.',
      },
      {
        khi: 'Tháng 14',
        hoi: 'Có đang ở cao nguyên năng lực và định bỏ không?',
        neuKhong: 'Đây là lý do số một khiến người học bỏ. Giữ nguyên nhịp bốn tuần rồi đo lại.',
      },
      {
        khi: 'Tháng 24',
        hoi: 'Có định đăng ký thi thật vì "đã hai năm" không?',
        neuKhong: 'Thi non thì mất tiền và mất tinh thần. Đích của hệ thống này là tháng 36.',
      },
    ],
  },
  {
    tuyen: 'chuyen',
    motTrang:
      'Hai mươi hai tháng chia làm hai nửa rõ rệt: mười tháng đầu chỉ xây năng lực và không đụng tới đề, mười hai tháng sau chuyển toàn bộ sang luyện dạng bài và đề đầy đủ. Đo bằng đúng một thước — đề chuyên thi thử 120 phút trong điều kiện phòng thi. Về đích không phải là chạm 7,0 một lần mà là ba đề liên tiếp từ 7,0 với độ lệch dưới 0,7 điểm.',
    loiNgay: loiNgayChuyen('b-b'),
    vongNgoai:
      'Bảy mươi phút này là lõi của bậc B — bậc đông nhất. Bậc A bớt mười phút ở khối theo giai đoạn, bậc C thêm hai mươi phút vào đúng khối đó. Ba khối còn lại giữ nguyên ở mọi bậc, vì chúng là thứ giữ được kể cả khi thi xong.',
    // Không viết tay lại chín đòn bẩy ở đây: lấy thẳng từ phác đồ nâng cấp
    // trong hệ thống, sắp theo số tuần. Sửa phác đồ thì phần này tự đi theo.
    donBay: donBayChuyen(),
    catBo: [
      {
        viec: 'Luyện Speaking theo dạng IELTS 40 phút mỗi ngày.',
        vi: 'Đề chuyên Sở Hà Nội không có phần thi Nói. Giữ 10 phút để tai không tụt là đủ.',
      },
      {
        viec: 'Viết luận 250 từ theo bố cục IELTS.',
        vi: 'Khối viết đề chuyên chỉ có 30 phút và đã gánh 16 câu biến đổi câu. Tràn giờ ở đoạn luận là bỏ trống phần cho điểm chắc nhất.',
      },
      {
        viec: 'Làm đề đầy đủ trước tháng thứ mười.',
        vi: 'Nền chưa đủ thì đề chỉ tạo cảm giác bận rộn và một đường điểm đi ngang gây nản.',
      },
      {
        viec: 'Ghi sổ từ theo từ đơn.',
        vi: 'Khối 25 câu từ vựng và ngữ pháp hỏi cụm cố định và giới từ đi kèm. Biết nghĩa từng từ vẫn chọn sai.',
      },
      {
        viec: 'Bỏ hè lớp 8 lên 9.',
        vi: 'Đó là hai tháng có nhiều giờ nhất trong cả lộ trình và là chỗ bậc B quyết định đỗ hay trượt.',
      },
    ],
    chanDuong: [
      {
        khi: 'Tuần đầu tiên',
        hoi: 'Bậc sau test đầu vào là gì, và gia đình đã nghe đúng lời khuyên thật chưa?',
        neuKhong: 'Bậc D được khuyên nhắm lớp chất lượng cao. Nói ở tháng đầu, không phải tháng hai mươi.',
      },
      {
        khi: 'Cuối tháng 10',
        hoi: 'Đề chuyên rút gọn đã đạt 5,5 chưa?',
        neuKhong: 'Chưa đạt thì chưa vào giai đoạn luyện đề. Kéo dài giai đoạn nền thêm, đừng bỏ qua.',
      },
      {
        khi: 'Tháng 12',
        hoi: 'Bậc C có vượt được mốc bậc B chưa?',
        neuKhong: 'Đây là mốc xét lại bậc bằng số liệu, không bằng cảm tính. Xét lại nguyện vọng ở đây còn kịp.',
      },
      {
        khi: 'Tháng 18',
        hoi: 'Đề đầy đủ đã đạt 6,5 và không phần nào dưới 55% số câu chưa?',
        neuKhong: 'Dồn bốn tuần vào đúng một phần đang kéo điểm, xác định bằng số liệu chứ không bằng cảm giác.',
      },
      {
        khi: 'Tháng 20',
        hoi: 'Còn cách đích bao nhiêu?',
        neuKhong: 'Dưới 0,5 điểm thì dồn vào phần yếu nhất. Trên 1,5 điểm thì ngồi lại với gia đình bàn về lớp chất lượng cao — bàn ở tháng 20 còn kịp, tháng 22 thì không.',
      },
    ],
  },
];

/** Tinh tuý của một tuyến. */
export function tinhTuy(id: TuyenId): TinhTuy {
  const tt = TINH_TUY.find((t) => t.tuyen === id);
  if (!tt) throw new Error(`Không có tuyến ${id}`);
  return tt;
}

/* ---------------------------- SỐ ĐỂ ĐỐI CHIẾU --------------------------- */

/**
 * Tháng cuối của lộ trình chuyên, đọc ra từ chính chuỗi "Tháng 19–22" của
 * giai đoạn cuối. Không viết cứng số 22 ở đây: sửa giai đoạn thì con số này
 * tự đi theo, không có chỗ nào lệch.
 */
export function thangCuoiChuyen(): number {
  const cuoi = CHUYEN_PHASES[CHUYEN_PHASES.length - 1];
  const so = cuoi.months.match(/\d+/g);
  if (!so || !so.length) throw new Error(`Không đọc được tháng từ "${cuoi.months}"`);
  return Number(so[so.length - 1]);
}

export const TUYEN_SO = {
  soTuyen: TUYEN.length,
  soLoiChung: LOI_CHUNG.length,
  soPhanKy: PHAN_KY.length,
  soNhamLan: NHAM_LAN.length,
  soThangIelts: MILESTONES.length * 3,
  soThangChuyen: thangCuoiChuyen(),
  soPhanDeChuyen: EXAM_PARTS.length,
  soCauDeChuyen: EXAM_PARTS.reduce((s, p) => s + p.items, 0),
};
