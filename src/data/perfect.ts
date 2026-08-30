import type { SectionId } from '../types';

/**
 * GIAO THUC 150 DIEM
 *
 * Noi dung cua lo trinh diem tuyet doi. Phan tinh toan nam o `lib/perfect.ts`;
 * tep nay tra loi cau hoi con lai: BIET can gi roi thi LAM GI moi ngay.
 *
 * Nguyen tac bien soan: moi muc phai la mot viec LAM DUOC va DEM DUOC. Mot lo
 * trinh diem tuyet do ma toan nhung cau nhu "hoc that chac" hay "can than
 * hon" thi khong khac gi khong co lo trinh — nguoi hoc khong biet hom nay
 * minh da lam dung hay chua.
 */

export interface PerfectPillar {
  id: 'knowledge' | 'execution' | 'endurance';
  name: string;
  /** Cau hoi ma tru cot nay tra loi. */
  question: string;
  /** Vi sao tru cot nay khong thay the duoc bang tru cot khac. */
  why: string;
  /** Chi so do duoc, kem nguong phai dat. */
  metric: string;
  /** Viec lam cu the, theo thu tu. */
  protocol: readonly string[];
  /** Dau hieu cho thay tru cot nay dang la diem nghen. */
  bottleneck: string;
}

export const PERFECT_PILLARS: readonly PerfectPillar[] = [
  {
    id: 'knowledge',
    name: 'Kiến thức',
    question: 'Có chuyên đề nào tôi vẫn còn có thể sai vì không biết không?',
    why:
      'Đây là trụ cột duy nhất mà thời gian học giải quyết được trực tiếp. Nhưng nó chỉ là điều kiện CẦN: biết hết vẫn có thể mất điểm vì hai trụ cột kia. Rất nhiều người dừng lại ở đây, đạt 135–140 rồi không hiểu vì sao mãi không lên.',
    metric:
      'Mọi chuyên đề trong chương trình đạt mức thành thạo từ 99,6% — tương ứng ngưỡng của mốc 50% cơ hội. Đo bằng chuyên đề YẾU NHẤT, không đo bằng trung bình.',
    protocol: [
      'Lấy danh sách chuyên đề xếp theo mức thành thạo tăng dần, làm từ đầu danh sách xuống.',
      'Với mỗi chuyên đề, làm hết phiếu cấp 5 và cấp 6 — hai cấp chứa câu vận dụng cao và câu phân loại.',
      'Chuyên đề nào còn sai một câu vì không biết thì quay lại bài giảng và phiếu kiến thức của chính chuyên đề đó, không làm thêm đề.',
      'Chỉ chuyển sang chuyên đề kế tiếp khi làm đúng trọn hai phiếu cấp 6 liên tiếp.',
      'Mỗi tuần rà lại toàn bộ danh sách: chuyên đề đã đạt có tụt xuống không.',
    ],
    bottleneck:
      'Bạn sai những câu mà khi xem lời giải thì thấy "à, cái này mình chưa học". Đây là điểm nghẽn dễ chữa nhất — chỉ cần thêm giờ đúng chỗ.',
  },
  {
    id: 'execution',
    name: 'Độ chính xác thực thi',
    question: 'Tôi có sai những câu mà tôi thừa sức làm đúng không?',
    why:
      'Đây là trụ cột quyết định ở vùng điểm trên 140, và là trụ cột bị bỏ qua ở gần như mọi tài liệu luyện thi. Lý do nằm ở phép nhân: xác suất làm sạch cả bài bằng (1 − p)^150. Sai 1% mỗi câu — nghe rất nhỏ, tương đương sai 1 trong 100 câu — chỉ cho 22% cơ hội làm đúng cả bài. Muốn 50% cơ hội thì phải xuống dưới một lỗi trong 217 câu.',
    metric:
      'Tỉ lệ sai trên các câu thuộc chuyên đề ĐÃ thành thạo. Ngưỡng cho mốc 50% cơ hội: dưới 0,46%, tức nhiều nhất 6 lỗi trong 10 đề gần nhất (1500 câu) — đúng 7 lỗi đã kéo cơ hội xuống 49,6%.',
    protocol: [
      'Lập sổ lỗi thực thi RIÊNG, tách hẳn khỏi sổ tay lỗi sai kiến thức — hai loại lỗi cần hai cách chữa khác nhau.',
      'Mỗi lỗi thực thi ghi đúng ba dòng: đề hỏi gì, tôi đã làm gì, và câu chữ nào trong đề tôi đã đọc lướt qua.',
      'Phân loại lỗi thành bốn nhóm: đọc nhầm đề, tính vội, chọn nhầm ô, và bỏ sót điều kiện.',
      'Cuối mỗi tuần đếm số lỗi theo nhóm. Nhóm nào chiếm nhiều nhất thì tuần sau đặt một quy tắc chống riêng cho nhóm đó.',
      'Quy tắc chống phải là thao tác vật lý, không phải lời nhắc: gạch chân từ phủ định trong đề, khoanh tròn đơn vị, đọc lại đáp án đã chọn trước khi sang câu.',
      'Đo lại tỉ lệ sau mỗi đề. Tỉ lệ không giảm nghĩa là quy tắc chống chưa đúng nhóm lỗi.',
    ],
    bottleneck:
      'Bạn xem lại bài và thấy "câu này mình biết làm mà". Nếu điều đó xảy ra từ hai lần trở lên trong một đề, đây chính là điểm nghẽn của bạn — và thêm giờ học kiến thức sẽ không chữa được nó.',
  },
  {
    id: 'endurance',
    name: 'Độ bền',
    question: 'Ba mươi câu cuối của tôi có tốt bằng ba mươi câu đầu không?',
    why:
      'Bài thi dài 195 phút. Độ chính xác của hầu hết người học tụt rõ rệt ở phần ba cuối, đúng lúc bài chuyển sang phần tự chọn. Một người có tỉ lệ sai 0,3% ở nửa đầu và 2% ở nửa cuối thì tính chung vẫn hỏng, dù trung bình nghe vẫn đẹp.',
    metric:
      'Chênh lệch tỉ lệ đúng giữa 50 câu đầu và 50 câu cuối, đo trên đề đủ 195 phút. Ngưỡng: dưới 1 điểm phần trăm.',
    protocol: [
      'Từ giai đoạn ba trở đi, mỗi tuần làm ít nhất một đề ĐỦ 195 phút liên tục, không nghỉ giữa chừng.',
      'Làm đúng khung giờ của kỳ thi thật để đồng hồ sinh học quen với việc tập trung vào đúng khoảng đó.',
      'Chấm riêng ba phần và so tỉ lệ đúng giữa chúng, không chỉ nhìn tổng điểm.',
      'Nếu phần cuối kém hơn rõ rệt, đổi thứ tự luyện: làm phần tự chọn TRƯỚC trong các buổi luyện thường ngày để nó không luôn rơi vào lúc mệt.',
      'Rà lại giấc ngủ và bữa ăn trong tuần có đề: đây là hai biến số ảnh hưởng độ bền mạnh hơn mọi mẹo làm bài.',
    ],
    bottleneck:
      'Điểm phần 3 của bạn luôn thấp hơn phần 1 và phần 2 dù bạn tự thấy chuyên đề phần 3 không khó hơn. Đó là dấu hiệu của mệt, không phải của thiếu kiến thức.',
  },
];

export interface CheckLayer {
  name: string;
  when: string;
  seconds: number;
  actions: readonly string[];
  catches: string;
}

/**
 * QUY TRINH KIEM TRA BA LOP
 *
 * Kiem tra lai ca bai o cuoi gio la cach kem hieu qua nhat: luc do da met,
 * va doc lai loi giai cua chinh minh thi bo nao co xu huong xac nhan chu
 * khong tim loi. Ba lop duoi day dat kiem tra vao dung luc no con re.
 */
export const CHECK_LAYERS: readonly CheckLayer[] = [
  {
    name: 'Lớp 1 — Ngay tại câu',
    when: 'Trước khi chuyển sang câu tiếp theo',
    seconds: 5,
    actions: [
      'Đọc lại đúng câu hỏi cuối cùng của đề bài, xem mình có trả lời đúng thứ được hỏi không.',
      'Kiểm tra đơn vị và dấu của kết quả.',
      'Nhìn lại ô đã tô hoặc ô đã điền, xác nhận nó khớp với đáp án mình định chọn.',
    ],
    catches:
      'Bắt được nhóm lỗi đắt nhất: trả lời đúng một câu hỏi khác với câu đề hỏi, và chọn nhầm ô. Năm giây ở đây rẻ hơn ba phút tìm lại ở cuối giờ.',
  },
  {
    name: 'Lớp 2 — Cuối mỗi phần',
    when: 'Khi vừa xong một phần thi, trước khi sang phần sau',
    seconds: 180,
    actions: [
      'Rà toàn bộ ô trả lời, xác nhận không bỏ trống câu nào.',
      'Quay lại các câu đã đánh dấu nghi ngờ, ưu tiên câu đã có hướng làm.',
      'Với câu tính toán, thử lại bằng một đường khác hoặc ước lượng độ lớn.',
    ],
    catches:
      'Bắt câu bỏ sót và câu làm vội. Kiểm ngay khi vừa xong phần thì đầu vẫn còn ngữ cảnh của phần đó, đọc lại nhanh hơn nhiều so với để tới cuối giờ.',
  },
  {
    name: 'Lớp 3 — Mười phút cuối',
    when: 'Mười phút trước khi hết giờ',
    seconds: 600,
    actions: [
      'Đếm lại số câu đã trả lời, đối chiếu đúng bằng 150.',
      'Điền đáp án cho mọi câu còn trống — không trừ điểm nên bỏ trống không bao giờ lợi hơn đoán.',
      'Chỉ xem lại các câu đã đánh dấu ở mức nghi ngờ cao nhất; không đọc lại bài từ đầu.',
    ],
    catches:
      'Bắt câu trống — nhóm lỗi duy nhất chắc chắn mất điểm mà chắc chắn tránh được. Không đọc lại từ đầu là có chủ đích: lúc này đã mệt, đọc lại dễ đổi một đáp án đúng thành sai hơn là sửa được lỗi.',
  },
];

export interface ErrorClass {
  id: string;
  name: string;
  /** Dau hieu nhan ra loi thuoc nhom nay khi soat bai. */
  tell: string;
  /** Thao tac vat ly chong lai nhom loi nay. */
  guard: string;
  /** Phan thi hay xuat hien nhat. */
  common: readonly SectionId[];
}

/**
 * BON NHOM LOI THUC THI
 *
 * Phan loai duoc thi chong duoc. Mot cuon so ghi "hom nay sai 3 cau" khong
 * dan toi hanh dong nao; mot cuon so ghi "3 cau deu do doc nham tu phu dinh"
 * dan thang toi mot thao tac cu the cho ngay mai.
 */
export const ERROR_CLASSES: readonly ErrorClass[] = [
  {
    id: 'misread',
    name: 'Đọc nhầm đề',
    tell: 'Xem lại thấy mình đã giải một bài khác với bài đề ra — thường vì bỏ qua một từ phủ định hoặc một điều kiện phụ.',
    guard: 'Gạch chân mọi từ phủ định và mọi cụm điều kiện ngay khi đọc đề lần đầu, trước khi bắt tay giải.',
    common: ['qualitative', 'science'],
  },
  {
    id: 'rush',
    name: 'Tính vội',
    tell: 'Đường lối đúng, phép tính sai. Thường xảy ra ở câu mình thấy dễ nên làm nhanh cho xong.',
    guard: 'Với mọi câu tính toán, ước lượng độ lớn của kết quả TRƯỚC khi tính. Kết quả lệch xa ước lượng là dấu hiệu có lỗi.',
    common: ['quantitative', 'science'],
  },
  {
    id: 'mismark',
    name: 'Chọn nhầm ô',
    tell: 'Đáp án trong nháp khác đáp án trên phiếu. Hay xảy ra khi bỏ qua một câu rồi quay lại làm.',
    guard: 'Đọc to trong đầu "câu 47, đáp án C" khi tô, và không bao giờ tô dồn nhiều câu một lúc.',
    common: ['quantitative', 'qualitative', 'science'],
  },
  {
    id: 'condition',
    name: 'Bỏ sót điều kiện',
    tell: 'Ra nghiệm hoặc kết quả không thỏa điều kiện của bài — nghiệm ngoại lai, giá trị âm cho một đại lượng không âm.',
    guard: 'Viết điều kiện ra giấy TRƯỚC khi biến đổi, và đối chiếu lại ngay khi có kết quả, không để tới cuối.',
    common: ['quantitative', 'science'],
  },
];

export interface PerfectPhase {
  order: number;
  name: string;
  /** Ti le quy thoi gian danh cho giai doan nay. */
  share: number;
  goal: string;
  /** Tru cot duoc uu tien trong giai doan. */
  focus: PerfectPillar['id'];
  exit: string;
}

/**
 * BON GIAI DOAN CUA LO TRINH DIEM TUYET DOI
 *
 * Khac voi lo trinh thong thuong o mot cho: hai giai doan cuoi khong con
 * dung de hoc them kien thuc. Chung dung de HA TI LE SAI BAT CAN va GIU
 * PHONG DO — hai viec khong lam duoc bang cach hoc thuoc them.
 */
export const PERFECT_PHASES: readonly PerfectPhase[] = [
  {
    order: 1,
    name: 'Phủ kín — không còn vùng trắng',
    share: 0.3,
    goal: 'Mọi chuyên đề trong chương trình đều được luyện, không chuyên đề nào còn ở mức chưa từng chạm tới.',
    focus: 'knowledge',
    exit: 'Không chuyên đề nào có mức thành thạo dưới 80%.',
  },
  {
    order: 2,
    name: 'Nâng trần — mài tới câu phân loại',
    share: 0.35,
    goal: 'Đưa từng chuyên đề lên ngưỡng câu vận dụng cao và câu phân loại, đo bằng chuyên đề yếu nhất.',
    focus: 'knowledge',
    exit: 'Chuyên đề yếu nhất đạt mức thành thạo từ 99,3% — ngưỡng của mốc 25% cơ hội.',
  },
  {
    order: 3,
    name: 'Triệt lỗi — hạ tỉ lệ sai bất cẩn',
    share: 0.2,
    goal: 'Kéo tỉ lệ sai trên các câu đã thành thạo xuống dưới ngưỡng, bằng sổ lỗi thực thi và các quy tắc chống theo nhóm lỗi.',
    focus: 'execution',
    exit: 'Không quá 6 lỗi thực thi trong 10 đề gần nhất, tức dưới 0,46%.',
  },
  {
    order: 4,
    name: 'Giữ phong độ — bền suốt 195 phút',
    share: 0.15,
    goal: 'Giữ được cả kiến thức lẫn độ chính xác từ câu đầu tới câu cuối, ở đúng khung giờ thi thật.',
    focus: 'endurance',
    exit: 'Chênh lệch tỉ lệ đúng giữa 50 câu đầu và 50 câu cuối dưới 1 điểm phần trăm.',
  },
];

/**
 * Loi noi thang ve muc tieu 150.
 *
 * Xuat hien tren man hinh cung voi lo trinh. Ly do: nguoi hoc co quyen dat
 * muc tieu tuyet doi, nhung ho phai biet minh dang danh cuoc vao mot bien co
 * chu khong phai di theo mot ke hoach chac chan. Giau dieu do la ban mot su
 * that de chiu doi lay mot that vong dung vao ngay thi.
 */
export const PERFECT_DISCLAIMER =
  'Điểm 150 không phải một kỳ vọng, nó là một biến cố. Mọi mô hình năng lực đều cho ra tỉ lệ đúng kỳ vọng, và tỉ lệ đó tiến tới 1 nhưng không bao giờ bằng 1 — nên không hệ thống nào hứa được 150 điểm mà vẫn trung thực. Thứ lộ trình này làm được là nâng xác suất bạn làm đúng cả 150 câu từ gần như bằng không lên mức đáng kể, và nói rõ cho bạn biết con số đó đang là bao nhiêu.';
