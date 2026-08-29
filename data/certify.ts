/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {Axis, ExamTier, RoleTrack} from '../types';

/* ==========================================================================
   HỆ KIỂM ĐỊNH NĂNG LỰC — 8 trục · 5 tầng bài kiểm tra · 6 vai · 5 bậc
   Nguyên tắc: không bậc nào được cấp bằng trắc nghiệm. Bậc càng cao thì tỉ
   trọng bằng chứng thực chiến càng lớn, tỉ trọng câu hỏi lý thuyết càng nhỏ.
   ========================================================================== */

export const CERTIFY_CREED = {
  title: 'Kiểm định năng lực GITA365',
  principle:
    'Người ta không hành nghề bằng thứ họ biết, mà bằng thứ họ làm được khi có người thật ngồi trước mặt. Vì vậy mọi bậc từ 3 trở lên đều phải có bằng chứng thực chiến, không bậc nào lên được chỉ bằng làm bài trắc nghiệm.',
  millerNote:
    'Năm tầng bài kiểm tra dựng theo tháp Miller — chuẩn quốc tế cho đánh giá năng lực nghề: BIẾT → BIẾT CÁCH → LÀM ĐƯỢC → LÀM THẬT. Mỗi tầng lên cao thì càng khó diễn, và càng khó gian lận.',
  antiCheat:
    'Tầng 1 và 2 có thể học tủ. Tầng 3 lộ ngay ai chưa hiểu. Tầng 4 và 5 thì không diễn được — vì có người thật đối diện và có kết quả thật để đối chiếu.',
  fairness:
    'Trượt một trục không phải trượt cả bài. Hệ thống chỉ định đúng mô-đun bù cho trục đó, học xong thi lại riêng trục đó. Không ai phải học lại thứ mình đã đạt.',
};

/* ------------------------------ 8 TRỤC ----------------------------------- */

export const AXES: Axis[] = [
  {
    id: 'ax-knowledge',
    no: 1,
    name: 'KIẾN THỨC',
    what: 'Nắm nội dung chuyên môn: ngữ âm, ngữ pháp, tiêu chí chấm IELTS, đặc điểm lỗi của người Việt.',
    measuredBy: 'Trắc nghiệm có thời gian + giải thích ngắn vì sao đáp án kia sai.',
    failLooks: 'Trả lời đúng nhưng không giải thích được vì sao — dấu hiệu học thuộc, không hiểu.',
  },
  {
    id: 'ax-gita',
    no: 2,
    name: 'AM HIỂU GITA365',
    what: 'Hiểu triết lý gốc rễ, 5 luật bất biến, tháp học tập, mô thức GITA, 25 cấp độ và vì sao chúng được thiết kế như vậy.',
    measuredBy: 'Câu hỏi "vì sao" chứ không phải "là gì". Ví dụ: vì sao không luyện đề trước tháng 22.',
    failLooks: 'Đọc thuộc tên các tầng nhưng không nói được tầng đó giải quyết vấn đề gì.',
  },
  {
    id: 'ax-thinking',
    no: 3,
    name: 'TƯ DUY',
    what: 'Phán đoán trong tình huống mơ hồ: chẩn đoán đúng nguyên nhân gốc thay vì xử lý triệu chứng.',
    measuredBy: 'Ca lâm sàng: cho dữ liệu học viên, hỏi vấn đề thật nằm ở đâu và vì sao.',
    failLooks: 'Chẩn đoán theo triệu chứng — học viên nghe kém thì bảo nghe thêm, không hỏi vùng i+1.',
  },
  {
    id: 'ax-skill',
    no: 4,
    name: 'KỸ NĂNG',
    what: 'Làm được việc của vai mình: dạy một điểm ngữ pháp, chữa một bài viết, dẫn một buổi club, chốt một cuộc tư vấn.',
    measuredBy: 'Mô phỏng có người đóng vai, chấm theo bảng tiêu chí quan sát được.',
    failLooks: 'Nói được lý thuyết nhưng khi vào vai thì nói nhiều hơn học viên.',
  },
  {
    id: 'ax-method',
    no: 5,
    name: 'PHƯƠNG PHÁP',
    what: 'Chọn đúng phương pháp cho đúng người ở đúng giai đoạn, và biết khi nào KHÔNG dùng phương pháp nào.',
    measuredBy: 'Cho ba hồ sơ học viên khác nhau, yêu cầu kê ba lộ trình khác nhau và bảo vệ lựa chọn.',
    failLooks: 'Kê cùng một lộ trình cho cả ba — dấu hiệu chưa hiểu vì sao phải cá nhân hoá.',
  },
  {
    id: 'ax-process',
    no: 6,
    name: 'CHUẨN QUY TRÌNH',
    what: 'Tuân thủ quy trình vận hành: phản hồi trong 48 giờ, nhập Sổ Lỗi trong ngày, biên bản buổi kèm, bảo mật dữ liệu học viên.',
    measuredBy: 'Kiểm tra hồ sơ thật trong 30 ngày gần nhất, đối chiếu với chuẩn.',
    failLooks: 'Chuyên môn giỏi nhưng bài nộp của học viên bị trả chậm — đây là lỗi làm mất học viên nhanh nhất.',
  },
  {
    id: 'ax-consult',
    no: 7,
    name: 'CHUẨN TƯ VẤN KHÁCH HÀNG',
    what: 'Tư vấn trung thực: hỏi trước khi nói, nói đúng thời gian thật cần, không hứa điều không làm được.',
    measuredBy: 'Mô phỏng cuộc tư vấn có ghi âm, chấm tỉ lệ hỏi/nói và tính trung thực của cam kết.',
    failLooks:
      'Hứa "6 tháng lên 7.0" cho người mất gốc. Đây là lỗi nặng nhất — trừ thẳng, không cộng bù bằng trục khác.',
  },
  {
    id: 'ax-problem',
    no: 8,
    name: 'XỬ LÝ VẤN ĐỀ',
    what: 'Giữ được học viên muốn bỏ, xử lý khiếu nại, xử lý phụ huynh gây áp lực, xử lý học viên không tiến bộ.',
    measuredBy: 'Ca khó có ghi âm, chấm theo phác đồ bắt nhịp trước rồi mới dẫn dắt.',
    failLooks: 'Dùng lý lẽ ngay từ câu đầu, chưa bắt nhịp — học viên thấy không được lắng nghe và rời đi.',
  },
];

/* --------------------- 5 TẦNG BÀI KIỂM TRA (THÁP MILLER) ----------------- */

export const EXAM_TIERS: ExamTier[] = [
  {
    no: 1,
    name: 'BIẾT',
    millerLevel: 'Knows',
    format: 'Trắc nghiệm 40 câu có thời gian, mỗi câu 45 giây. Có câu bẫy hiểu sai phổ biến.',
    duration: '30 phút',
    scores: 'Kiến thức · Am hiểu GITA365',
    cannotFake: 'Học tủ được. Đây là tầng sàng lọc, không phải tầng đánh giá.',
  },
  {
    no: 2,
    name: 'BIẾT CÁCH',
    millerLevel: 'Knows how',
    format:
      'Hai mươi tình huống, mỗi tình huống bốn phương án. Không có phương án sai hoàn toàn — chọn phương án TỐT NHẤT và giải thích trong một câu.',
    duration: '45 phút',
    scores: 'Tư duy · Phương pháp · Chuẩn quy trình',
    cannotFake:
      'Khó học tủ hơn vì các phương án đều nghe hợp lý. Phần giải thích một câu là chỗ lộ người chọn mò.',
  },
  {
    no: 3,
    name: 'PHÂN TÍCH CA',
    millerLevel: 'Knows how (sâu)',
    format:
      'Ba hồ sơ học viên thật đã ẩn danh, kèm dữ liệu: trình độ, quỹ thời gian, Sổ Lỗi, bản ghi âm. Chẩn đoán và kê lộ trình cho từng hồ sơ.',
    duration: '90 phút',
    scores: 'Tư duy · Phương pháp · Xử lý vấn đề',
    cannotFake:
      'Lộ ngay ai chưa hiểu. Người học thuộc sẽ kê cùng một lộ trình cho cả ba hồ sơ khác nhau.',
  },
  {
    no: 4,
    name: 'MÔ PHỎNG',
    millerLevel: 'Shows how',
    format:
      'Ba mươi phút đóng vai với giám khảo làm học viên hoặc khách hàng khó tính. Có ghi hình. Chấm theo bảng tiêu chí quan sát được.',
    duration: '30 phút + 15 phút phản hồi',
    scores: 'Kỹ năng · Chuẩn tư vấn · Xử lý vấn đề',
    cannotFake:
      'Không diễn được. Tỉ lệ thời lượng nói được đo bằng máy — cố vấn nói nhiều hơn học viên là trượt, bất kể nói hay tới đâu.',
  },
  {
    no: 5,
    name: 'THỰC CHIẾN',
    millerLevel: 'Does',
    format:
      'Hồ sơ 90 ngày làm việc thật: học viên đã kèm, bài đã chấm, thời gian phản hồi trung bình, tỉ lệ học viên giữ chuỗi, kết quả cổng thoát của học viên mình phụ trách.',
    duration: 'Tích luỹ 90 ngày',
    scores: 'Toàn bộ 8 trục, có trọng số theo vai',
    cannotFake:
      'Đây là tầng duy nhất chấm bằng KẾT QUẢ của người khác, không bằng biểu hiện của mình. Không có cách nào diễn.',
  },
];

/* ---------------------------- 6 VAI · 5 BẬC ------------------------------ */

const L = (
  no: number,
  name: string,
  epithet: string,
  canDo: string,
  cannotYet: string,
  passMark: number,
  tiers: number[],
) => ({no, name, epithet, canDo, cannotYet, passMark, tiersRequired: tiers});

export const ROLE_TRACKS: RoleTrack[] = [
  {
    id: 'r-student',
    name: 'HỌC VIÊN',
    who: 'Người đang đi trên lộ trình 36 tháng hoặc chu kỳ 90 ngày.',
    purpose: 'Xác nhận năng lực thật ở từng chặng, không để ai đi tiếp trên nền rỗng.',
    color: 'from-rose-500 to-amber-500',
    weights: [
      {axis: 'KIẾN THỨC', pct: 25},
      {axis: 'AM HIỂU GITA365', pct: 10},
      {axis: 'TƯ DUY', pct: 15},
      {axis: 'KỸ NĂNG', pct: 35},
      {axis: 'PHƯƠNG PHÁP', pct: 15},
    ],
    levels: [
      L(1, 'NHẬP MÔN', 'Đã cài xong hệ thống', 'Chạy được nhịp ngày, giữ chuỗi 21 ngày', 'Chưa nói được với người lạ', 60, [1, 2]),
      L(2, 'TỰ CHẠY', 'Không cần ai nhắc', 'Tự chọn tài liệu đúng vùng i+1, tự chấm sơ bộ', 'Chưa tự sửa được lỗi lặp', 65, [1, 2, 3]),
      L(3, 'VỮNG NỀN', 'Đã qua cổng B1', 'Đọc sách nguyên bản, nói 2 phút không sập câu', 'Chưa vào được ngôn ngữ học thuật', 70, [1, 2, 3, 4]),
      L(4, 'HỌC THUẬT', 'Đã đổi hệ ngôn ngữ', 'Viết Task 2 Band 7, tự chấm lệch dưới 0,5', 'Chưa ổn định dưới áp lực', 75, [2, 3, 4, 5]),
      L(5, 'THÀNH THẠO', 'Kèm được người khác', 'Band 8.0, dẫn được club, kèm được học viên tầng dưới', '—', 80, [3, 4, 5]),
    ],
    cadence: 'Cuối mỗi vòng 21 ngày và cuối mỗi tầng của tháp học tập.',
    recertify: 'Không cần — năng lực học viên chỉ đi lên theo cổng.',
  },
  {
    id: 'r-parent',
    name: 'PHỤ HUYNH',
    who: 'Cha mẹ của học viên dưới 18 tuổi, hoặc người tài trợ cho học viên trưởng thành.',
    purpose:
      'Phụ huynh hiểu sai hệ thống là nguyên nhân số hai khiến học viên bỏ — chỉ sau việc học một mình. Người gây áp lực sai chỗ phá hỏng công sức của cả coach lẫn học viên.',
    color: 'from-amber-500 to-emerald-500',
    weights: [
      {axis: 'AM HIỂU GITA365', pct: 40},
      {axis: 'TƯ DUY', pct: 25},
      {axis: 'PHƯƠNG PHÁP', pct: 20},
      {axis: 'XỬ LÝ VẤN ĐỀ', pct: 15},
    ],
    levels: [
      L(1, 'ĐỒNG HÀNH', 'Hiểu con mình đang làm gì', 'Biết lộ trình, biết cổng thoát, biết vì sao chưa luyện đề', 'Chưa biết hỗ trợ đúng cách', 60, [1]),
      L(2, 'HỖ TRỢ ĐÚNG', 'Không phá nhịp', 'Bảo vệ khung giờ học, không hỏi điểm mỗi tuần', 'Chưa đọc được bảng tiến độ', 65, [1, 2]),
      L(3, 'ĐỌC ĐƯỢC SỐ', 'Hiểu dữ liệu', 'Đọc bảng 5 con số, phân biệt cao nguyên với chững thật', 'Chưa xử lý được lúc con muốn bỏ', 70, [1, 2, 3]),
      L(4, 'GIỮ LỬA', 'Kéo con qua tháng 4 và 14', 'Biết bắt nhịp trước khi khuyên, biết khi nào nên im lặng', '—', 75, [2, 3, 4]),
      L(5, 'ĐẠI SỨ', 'Hướng dẫn được phụ huynh khác', 'Chia sẻ kinh nghiệm, dẫn buổi sinh hoạt phụ huynh', '—', 80, [3, 4, 5]),
    ],
    cadence: 'Đầu chương trình, sau 90 ngày, rồi mỗi 6 tháng.',
    recertify: 'Mỗi 12 tháng, hoặc khi con chuyển tầng.',
  },
  {
    id: 'r-ctv',
    name: 'CỘNG TÁC VIÊN',
    who: 'Người giới thiệu học viên, chưa trực tiếp giảng dạy hay tư vấn sâu.',
    purpose:
      'CTV là điểm chạm đầu tiên. Một lời hứa sai ở đây tạo ra học viên vào nhầm chương trình, và người trả giá là coach ở phía sau.',
    color: 'from-emerald-500 to-sky-500',
    weights: [
      {axis: 'AM HIỂU GITA365', pct: 30},
      {axis: 'CHUẨN TƯ VẤN KHÁCH HÀNG', pct: 30},
      {axis: 'CHUẨN QUY TRÌNH', pct: 20},
      {axis: 'TƯ DUY', pct: 10},
      {axis: 'XỬ LÝ VẤN ĐỀ', pct: 10},
    ],
    levels: [
      L(1, 'TẬP SỰ', 'Nói đúng về hệ thống', 'Giới thiệu đúng, không hứa vượt', 'Chưa sàng lọc được nhu cầu', 65, [1, 2]),
      L(2, 'SÀNG LỌC', 'Hỏi trước khi nói', 'Xác định đúng nhu cầu và quỹ thời gian thật của khách', 'Chưa xử lý được từ chối', 70, [1, 2, 3]),
      L(3, 'DẪN DẮT', 'Đưa được khách tới buổi tư vấn', 'Xử lý ba loại từ chối phổ biến mà không ép', 'Chưa tư vấn lộ trình được', 75, [2, 3, 4]),
      L(4, 'ĐỒNG HÀNH', 'Giữ được khách sau khi vào học', 'Theo dõi 30 ngày đầu, phát hiện sớm nguy cơ bỏ', '—', 78, [2, 3, 4, 5]),
      L(5, 'HẠT NHÂN', 'Đào tạo được CTV mới', 'Kèm CTV bậc 1–2, dẫn buổi huấn luyện nội bộ', '—', 82, [3, 4, 5]),
    ],
    cadence: 'Sau khoá nhập môn, rồi mỗi quý.',
    recertify: 'Mỗi 6 tháng. Trục Chuẩn tư vấn phải thi lại toàn bộ.',
  },
  {
    id: 'r-consultant',
    name: 'TƯ VẤN',
    who: 'Người trực tiếp tư vấn lộ trình và chốt chương trình cho học viên.',
    purpose:
      'Tư vấn là người quyết định học viên vào đúng hay sai chương trình. Vào sai thì mọi thứ phía sau đều lệch.',
    color: 'from-sky-500 to-indigo-500',
    weights: [
      {axis: 'CHUẨN TƯ VẤN KHÁCH HÀNG', pct: 30},
      {axis: 'AM HIỂU GITA365', pct: 20},
      {axis: 'TƯ DUY', pct: 15},
      {axis: 'PHƯƠNG PHÁP', pct: 15},
      {axis: 'CHUẨN QUY TRÌNH', pct: 10},
      {axis: 'XỬ LÝ VẤN ĐỀ', pct: 10},
    ],
    levels: [
      L(1, 'TẬP SỰ', 'Chạy đúng kịch bản', 'Hoàn thành cuộc tư vấn theo khung 7 bước', 'Chưa rời được kịch bản', 65, [1, 2]),
      L(2, 'CHẨN ĐOÁN', 'Đọc đúng nhu cầu thật', 'Phân biệt điều khách nói muốn với điều khách thật sự cần', 'Chưa kê được lộ trình cá nhân hoá', 70, [1, 2, 3]),
      L(3, 'KÊ LỘ TRÌNH', 'Cá nhân hoá được', 'Kê ba lộ trình khác nhau cho ba hồ sơ khác nhau và bảo vệ được', 'Chưa xử lý được ca khó', 75, [2, 3, 4]),
      L(4, 'CA KHÓ', 'Giữ được khách khó tính', 'Xử lý khiếu nại, xử lý phụ huynh gây áp lực, từ chối khách không phù hợp', '—', 80, [3, 4, 5]),
      L(5, 'TRƯỞNG NHÓM', 'Đào tạo và giám sát chất lượng', 'Nghe lại băng của nhóm, chấm và kèm', '—', 85, [3, 4, 5]),
    ],
    cadence: 'Sau khoá nghề, rồi mỗi quý có nghe lại băng ngẫu nhiên.',
    recertify: 'Mỗi 6 tháng. Trượt trục Chuẩn tư vấn là dừng tư vấn cho tới khi thi lại đạt.',
  },
  {
    id: 'r-coach',
    name: 'COACH',
    who: 'Người đồng hành cùng học viên suốt hành trình, không trực tiếp giảng bài.',
    purpose:
      'Coach là vai giữ học viên ở lại. Tỉ lệ học viên bỏ giữa chừng là chỉ số đánh giá coach quan trọng hơn cả điểm đầu ra.',
    color: 'from-indigo-500 to-violet-500',
    weights: [
      {axis: 'TƯ DUY', pct: 22},
      {axis: 'AM HIỂU GITA365', pct: 20},
      {axis: 'XỬ LÝ VẤN ĐỀ', pct: 20},
      {axis: 'KỸ NĂNG', pct: 15},
      {axis: 'PHƯƠNG PHÁP', pct: 13},
      {axis: 'CHUẨN QUY TRÌNH', pct: 10},
    ],
    levels: [
      L(1, 'TẬP SỰ', 'Chạy được vòng 11 bước', 'Dẫn một chu kỳ cấp độ theo đúng lời thoại mẫu', 'Chưa rời được kịch bản', 65, [1, 2]),
      L(2, 'ĐẶT CÂU HỎI', 'Hỏi thay vì giảng', 'Giữ tỉ lệ học viên nói trên 70% trong buổi 1-1', 'Chưa chẩn đoán được nguyên nhân gốc', 70, [1, 2, 3]),
      L(3, 'CHẨN ĐOÁN', 'Tìm đúng nguyên nhân gốc', 'Đọc dữ liệu học viên, chỉ ra vấn đề thật thay vì triệu chứng', 'Chưa cứu được người muốn bỏ', 75, [2, 3, 4]),
      L(4, 'GIỮ NGƯỜI', 'Kéo lại người muốn bỏ', 'Bắt nhịp trước khi dẫn, tỉ lệ giữ chân trên 80%', '—', 80, [3, 4, 5]),
      L(5, 'CỐ VẤN TRƯỞNG', 'Cố vấn cho người cố vấn', 'Kèm coach bậc dưới, thiết kế chu kỳ mới', '—', 85, [3, 4, 5]),
    ],
    cadence: 'Sau khoá nghề, rồi mỗi quý.',
    recertify: 'Mỗi 6 tháng, có kèm chỉ số giữ chân học viên của 90 ngày gần nhất.',
  },
  {
    id: 'r-teacher',
    name: 'GIÁO VIÊN',
    who: 'Người trực tiếp giảng bài và chấm chữa bài nộp.',
    purpose:
      'Giáo viên là người tạo ra chất lượng chuyên môn. Sai ở đây thì học viên học sai suốt nhiều tháng mà không ai biết.',
    color: 'from-violet-500 to-fuchsia-500',
    weights: [
      {axis: 'KIẾN THỨC', pct: 28},
      {axis: 'KỸ NĂNG', pct: 22},
      {axis: 'PHƯƠNG PHÁP', pct: 20},
      {axis: 'AM HIỂU GITA365', pct: 15},
      {axis: 'CHUẨN QUY TRÌNH', pct: 10},
      {axis: 'TƯ DUY', pct: 5},
    ],
    levels: [
      L(1, 'TRỢ GIẢNG', 'Dạy được theo giáo án có sẵn', 'Chạy đúng bài giảng lõi, chấm được tầng 1–2', 'Chưa tự soạn được bài', 70, [1, 2]),
      L(2, 'ĐỨNG LỚP', 'Dạy độc lập', 'Dẫn được lớp, điều chỉnh theo vùng i+1 của người đang ngồi đó', 'Chưa chấm được Writing Band 7+', 75, [1, 2, 3]),
      L(3, 'CHẤM CHUẨN', 'Chấm lệch dưới 0,5 band', 'Chấm Writing và Speaking theo tiêu chí, viết phản hồi 4 phần', 'Chưa soạn được nội dung mới', 78, [2, 3, 4]),
      L(4, 'SOẠN BÀI', 'Tạo ra nội dung mới', 'Soạn bài giảng, phác đồ lỗi mới, đề kiểm tra đạt chuẩn', '—', 82, [3, 4, 5]),
      L(5, 'CHỦ NHIỆM', 'Bảo đảm chất lượng toàn hệ', 'Kiểm định chất lượng chấm bài, đào tạo giáo viên mới', '—', 86, [3, 4, 5]),
    ],
    cadence: 'Sau khoá nghề, rồi mỗi quý có chấm chéo mù.',
    recertify:
      'Mỗi 6 tháng. Bắt buộc chấm mù 5 bài đối chiếu với hội đồng — lệch quá 0,5 band là học bù trục Kiến thức.',
  },
];

/* ------------------------- QUY TẮC CHẤM ---------------------------------- */

export const SCORING_RULES = [
  {
    no: 1,
    rule: 'Điểm tổng là trung bình có trọng số của 8 trục, trọng số khác nhau theo vai.',
    why: 'Một CTV giỏi chuyên môn nhưng hứa sai với khách vẫn là rủi ro; một giáo viên tư vấn kém nhưng chấm chuẩn thì không.',
  },
  {
    no: 2,
    rule: 'Có trục sàn: dưới 50 ở bất kỳ trục nào là trượt, dù điểm tổng cao.',
    why: 'Trọng số không được phép cho người ta bù một lỗ hổng nghiêm trọng bằng thế mạnh ở chỗ khác.',
  },
  {
    no: 3,
    rule: 'Trục Chuẩn tư vấn khách hàng không có bù trừ. Hứa điều không làm được là trượt thẳng.',
    why: 'Đây là lỗi phá huỷ niềm tin, và niềm tin mất thì không lấy lại bằng chuyên môn.',
  },
  {
    no: 4,
    rule: 'Bậc 3 trở lên bắt buộc có tầng 4 (mô phỏng). Bậc 4 trở lên bắt buộc có tầng 5 (thực chiến).',
    why: 'Không ai được cấp bậc hành nghề chỉ bằng làm bài. Bậc càng cao thì bằng chứng thực chiến càng nặng.',
  },
  {
    no: 5,
    rule: 'Trượt một trục thì chỉ học bù và thi lại đúng trục đó, giữ nguyên điểm các trục đã đạt trong 12 tháng.',
    why: 'Bắt học lại thứ đã đạt là lãng phí và làm người ta ngại thi lại — dẫn tới né kiểm định.',
  },
  {
    no: 6,
    rule: 'Mọi bài tầng 4 và 5 đều có ghi hình hoặc hồ sơ, lưu 24 tháng, hai giám khảo chấm độc lập.',
    why: 'Chấm một người là chấm theo cảm tính. Hai người chấm mù rồi đối chiếu mới ra kết quả tin được.',
  },
];
