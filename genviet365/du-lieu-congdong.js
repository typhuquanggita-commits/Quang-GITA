/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · KHO CỘNG ĐỒNG VÀ ĐỘI NGŨ
   Đường vào · mạch tư vấn · bốn chân dung gia đình · đại sứ ·
   ngôn ngữ · nghi lễ · hệ ghi nhận · chuỗi WOW ·
   nghề Coach · bảy năng lực · tuyển và thử việc · chuẩn dự giờ.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var GV = window.GV || {};
window.GV = GV;

/* ══════════ ĐƯỜNG VÀO — SÁU BƯỚC ══════════
   Không bước nào được bỏ, và không bước nào được đảo. Bán gói trước khi
   có dữ liệu là cách chắc chắn nhất để ba tháng sau cả hai bên cùng
   thất vọng.                                                          */
GV.DUONG_VAO = [
  { b: 1, t: 'Giới thiệu', ai: 'Một gia đình đang trong hệ, hoặc một đại sứ',
    n: 'Cửa vào chính của Gen Việt là người thật kể chuyện thật. Quảng cáo mở được sự chú ý; chỉ một câu chuyện có tên tuổi mới mở được lòng tin.',
    ra: 'Một cuộc hẹn, không phải một đơn hàng' },
  { b: 2, t: 'Đăng ký và gặp lần đầu', ai: 'Chuyên gia tư vấn',
    n: 'Buổi 60 phút. Không hỏi "anh chị muốn đăng ký gói nào". Hỏi điều gì đang thực sự xảy ra trong nhà.',
    ra: 'Vấn đề được nói bằng hành vi quan sát được, không bằng tính từ' },
  { b: 3, t: 'Bộ test nhận diện', ai: 'Học viên và phụ huynh làm hai bản riêng',
    n: 'Năm bộ, mỗi bộ 30 câu. Chỗ hai bản lệch nhau nhiều nhất là chỗ đáng nói nhất.',
    ra: 'Baseline trung thực · bản đồ bốn trụ' },
  { b: 4, t: 'Dựng hồ sơ', ai: 'Tư vấn + Coach',
    n: 'Ghép dữ liệu test, lời kể, hành vi quan sát được và kết quả học tập thành một bản đồ G–I–T–A duy nhất.',
    ra: 'Bản đồ điểm nghẽn · 1–3 giả thuyết có bằng chứng' },
  { b: 5, t: 'Buổi định hướng', ai: 'Cả nhà cùng dự',
    n: 'Trình bày bản đồ, không trình bày gói. Gia đình nhìn thấy nhà mình trong tấm bản đồ ấy rồi mới bàn tới đường đi.',
    ra: 'Thống nhất tầng dịch vụ, bậc khởi điểm, và ba điều gia đình sẽ đổi' },
  { b: 6, t: 'Thử thách 7 ngày', ai: 'Học viên · phụ huynh · Coach',
    n: 'Bảy ngày đầu tiên không chữa gì cả. Nó tạo dữ liệu thật và cho cả nhà thấy hệ thống này làm việc như thế nào.',
    ra: 'Báo cáo 7 ngày · quyết định đi tiếp hay dừng — quyết định của gia đình' }
];

/* ══════════ MẠCH TƯ VẤN THEO NHU CẦU ══════════ */
GV.MACH_TU_VAN = [
  { nc: 'Chưa hiểu vấn đề', dh: '"Con có vẻ mất tập trung, lười, chán học"',
    ch: 'Điều gì đang thực sự xảy ra?', tang: 'T1 · bậc B1', gt: 'Nhận diện đúng' },
  { nc: 'Biết vấn đề nhưng chưa hiểu vì sao', dh: 'Trì hoãn, mất động lực, xung đột',
    ch: 'Cơ chế nào đang duy trì?', tang: 'T2 · bậc B1–B2', gt: 'Giải mã' },
  { nc: 'Biết cách nhưng chưa duy trì', dh: 'Có kỹ thuật nhưng không ổn định',
    ch: 'Làm sao thành năng lực?', tang: 'T3 · bậc B2', gt: 'Kiến tạo' },
  { nc: 'Muốn tự chủ sâu', dh: 'Phụ huynh vẫn phải nhắc, hỗ trợ nhiều',
    ch: 'Khi nào em tự vận hành?', tang: 'T4 · bậc B2–B3', gt: 'Chuyển hoá' },
  { nc: 'Muốn phát triển tiềm năng', dh: 'Em đã ổn và có điểm mạnh',
    ch: 'Có thể phát triển tới đâu?', tang: 'T5 · bậc B3', gt: 'Bứt phá' },
  { nc: 'Muốn định hướng nghề', dh: 'Mơ hồ về tương lai',
    ch: 'Hiểu mình – hiểu nghề – thiếu ở đâu?', tang: 'T2/T3/T5 · bậc B3–B4', gt: 'Bản đồ nghề' },
  { nc: 'Muốn phát triển tài năng', dh: 'Có dấu hiệu nổi trội',
    ch: 'Điểm mạnh nào đáng đầu tư?', tang: 'T3/T5 · bậc B3', gt: 'Bản đồ tài năng' },
  { nc: 'Muốn có hồ sơ năng lực', dh: 'Có năng lực nhưng chưa có sản phẩm',
    ch: 'Có thể tạo thành tựu nào?', tang: 'T5 · bậc B4', gt: 'Portfolio' }
];

/* ══════════ KỊCH BẢN BUỔI TƯ VẤN ĐẦU TIÊN — 60 PHÚT ══════════ */
GV.BUOI_DAU = [
  { p: '00–05', m: 'Mở và giao ước', y: 'Nói rõ buổi này để làm gì và KHÔNG để làm gì. "Hôm nay mình chưa bàn tới gói nào cả." Câu ấy hạ toàn bộ hàng phòng thủ.' },
  { p: '05–20', m: 'Nghe gia đình kể', y: 'Nghe 70, nói 30. Không cắt lời, không phản biện, không an ủi vội. Ghi lại nguyên văn ba câu đắt nhất phụ huynh nói.' },
  { p: '20–30', m: 'Nghe học viên — riêng nếu cần', y: 'Em nói trước mặt bố mẹ thường khác với em nói riêng. Nếu tách ra thì phải ở nơi mở, nhìn thấy được — xem mục An toàn.' },
  { p: '30–40', m: 'Chuyển ngôn ngữ', y: 'Dịch mọi tính từ thành hành vi quan sát được, ngay trước mặt gia đình: "lười" → "ngồi vào bàn lúc mấy giờ, đứng dậy mấy lần". Đây là khoảnh khắc gia đình lần đầu nhìn thấy sự thật mà không cãi nhau.' },
  { p: '40–50', m: 'Bản đồ G–I–T–A sơ bộ', y: 'Vẽ bốn cửa lên giấy trước mặt họ. Chỉ ra chỗ mình CHƯA biết, không chỉ chỗ mình biết — đó là thứ tạo ra sự tin cậy.' },
  { p: '50–60', m: 'Bước tiếp theo', y: 'Đề nghị bộ test và bảy ngày quan sát. Nếu gia đình chưa sẵn sàng thì dừng ở đây trong danh dự, hẹn lại sau ba tuần. Ép một gia đình chưa sẵn sàng là mất họ vĩnh viễn.' }
];

/* ══════════ BỐN CHÂN DUNG GIA ĐÌNH ══════════ */
GV.CHAN_DUNG = [
  { t: 'NHÀ ĐANG TÌM', mau: '#185AB4',
    dh: 'Con chưa có vấn đề lớn. Ba mẹ đọc nhiều, muốn con có nền tốt hơn mình ngày xưa.',
    can: 'Một bản đồ và một cộng đồng. Không cần chữa gì cả.',
    lam: 'Vào thẳng chi hội và bậc B1. Đừng tạo ra một vấn đề để có việc mà làm.',
    bay: 'Bán tầng cao cho nhà không có vấn đề — ba tháng sau họ không thấy gì đổi và rời đi.' },
  { t: 'NHÀ ĐANG ĐAU', mau: '#BE0E16',
    dh: 'Xung đột, điểm số tụt, con đóng cửa phòng. Ba mẹ mệt và mất phương hướng.',
    can: 'Được nghe trước, được hạ nhiệt trước. Chưa cần giải pháp trong buổi đầu.',
    lam: 'T1 bảy ngày để có dữ liệu thật. Vào nhóm giải pháp 13.7 (phụ huynh) trước, không vào phương pháp học.',
    bay: 'Chữa đứa trẻ trong một vòng lặp gia đình không đổi. Rất nhiều ca hỏng ở đúng chỗ này.' },
  { t: 'NHÀ MUỐN BỨT PHÁ', mau: '#0B7350',
    dh: 'Con đã ổn, có điểm mạnh rõ. Gia đình muốn biết con lớn tới đâu.',
    can: 'Thử thách thật, cố vấn ngoài, và sân chơi ngoài nhà trường.',
    lam: 'Bậc B3 trở lên · tổ mũi nhọn · dự án có người dùng thật · M4 bắt buộc.',
    bay: 'Khen nhiều mà không đưa vào chuẩn ngoài. Một tài năng chỉ được khen trong nhà sẽ vỡ ở lần đầu ra sân.' },
  { t: 'NHÀ ĐÃ MẤT NIỀM TIN', mau: '#5140B4',
    dh: 'Đã qua vài trung tâm, vài khoá học. Ba mẹ nói "thử xem" bằng giọng đã hết hy vọng.',
    can: 'Một thắng lợi nhỏ, thật, trong bảy ngày. Không cần lời hứa lớn.',
    lam: 'Cam kết đúng một thay đổi đo được trong 7 ngày, và làm bằng được. Không hứa gì thêm.',
    bay: 'Hứa lớn để chốt hợp đồng. Nhà này đã nghe lời hứa lớn nhiều lần rồi, và họ nhận ra ngay.' }
];

/* ══════════ HỆ ĐẠI SỨ ══════════ */
GV.DAI_SU = {
  ds: [
    { c: 'Cấp 1 · NGƯỜI KỂ', dk: 'Là phụ huynh hoặc học viên trong hệ, đã qua ít nhất một cổng',
      duoc: 'Mã giới thiệu riêng · bộ câu chuyện mẫu · dự ngày mở cửa' },
    { c: 'Cấp 2 · NGƯỜI DẪN', dk: 'Đã giới thiệu 3 nhà, trong đó ≥ 1 nhà vào hệ',
      duoc: 'Hoa hồng theo bậc · được mời nói ở ngày mở cửa · huy hiệu đại sứ' },
    { c: 'Cấp 3 · NGƯỜI MỞ', dk: 'Đã giới thiệu 10 nhà · ≥ 5 nhà còn trong hệ sau 6 tháng',
      duoc: 'Được bảo trợ mở một điểm sinh hoạt mới · dự đại hội vùng' },
    { c: 'Cấp 4 · NGƯỜI GIỮ LỬA', dk: 'Ba năm liên tục hoạt động · ≥ 20 nhà · không vi phạm luật giới thiệu',
      duoc: 'Ghế trong hội đồng cộng đồng vùng · quyền đề cử học bổng Quỹ Nhân tài' }
  ],
  luat: [
    'Trần hoa hồng 10%, không có ngoại lệ, không có "trường hợp đặc biệt".',
    'Không hứa kết quả. Đại sứ kể chuyện của nhà mình, không cam kết thay Học viện.',
    'Không nói xấu nơi khác. Một câu chuyện thật đủ mạnh thì không cần dìm ai.',
    'Không giới thiệu nhà đang trong khủng hoảng cấp cứu — chuyển thẳng cho chuyên môn, không qua kênh đại sứ.',
    'Mọi nhà được giới thiệu đều đi qua đúng sáu bước đường vào, không có cửa tắt cho người quen.',
    'Đại sứ không được thu tiền hộ Học viện dưới bất kỳ hình thức nào.'
  ]
};

/* ══════════ NGÔN NGỮ — BẢNG THAY VÌ ══════════
   Ngôn ngữ là công cụ can thiệp rẻ nhất và mạnh nhất của hệ. Bảng này
   dán ở phòng Coach và gửi cho mọi phụ huynh trong tuần đầu.          */
GV.NGON_NGU = [
  { x: '"Sao con lười thế?"', o: '"Hôm nay con ngồi vào bàn lúc mấy giờ?"', vi: 'Tính từ đóng cửa; câu hỏi về hành vi mở cửa.' },
  { x: '"Con phải cố lên."', o: '"Chỗ nào đang khó nhất với con?"', vi: '"Cố lên" giả định em chưa cố. Câu hỏi giả định em đang mắc.' },
  { x: '"Bố mẹ đã nói bao nhiêu lần rồi."', o: '"Mình cần đổi cách nhắc thế nào để con không phải nghe lại câu này?"', vi: 'Chuyển từ trách sang cùng sửa hệ thống.' },
  { x: '"Con nhìn bạn A kìa."', o: '"Tháng trước con làm được X, giờ con thấy mình khác gì?"', vi: 'So với chính mình tạo động lực; so với người khác tạo phòng vệ.' },
  { x: '"Không sao đâu, bỏ qua đi."', o: '"Lần này hụt ở đâu, và lần sau mình đổi cái gì?"', vi: 'An ủi vội lấy mất bài học; hỏi đúng giữ lại bài học mà không làm đau.' },
  { x: '"Giỏi lắm con!"', o: '"Con giữ được nhịp mười ngày liền — chỗ khó nhất là ngày thứ mấy?"', vi: 'Khen chung chung nuôi cái tôi; khen đúng việc nuôi năng lực.' },
  { x: '"Con có làm bài chưa?"', o: '"Kế hoạch tối nay của con là gì?"', vi: 'Câu đầu là kiểm tra; câu sau là trao quyền.' },
  { x: '"Để bố mẹ làm cho nhanh."', o: '"Con cần bố mẹ hỗ trợ phần nào?"', vi: 'Làm hộ tiết kiệm mười phút và lấy đi một năng lực.' },
  { x: '"Con lúc nào cũng thế."', o: '"Tuần này việc đó xảy ra mấy lần?"', vi: '"Lúc nào cũng" là một lời buộc tội, không phải một dữ liệu.' },
  { x: '"Học đi rồi sau này khổ."', o: '"Con muốn ba năm nữa mình là người thế nào?"', vi: 'Doạ bằng tương lai xấu tạo lo âu; hỏi về tương lai muốn có tạo hướng.' },
  { x: '"Con làm bố mẹ thất vọng."', o: '"Bố mẹ đang lo. Mình nói chuyện được không?"', vi: 'Câu đầu tấn công bản sắc — thứ khó lành nhất trong cả cuộc đời một đứa trẻ.' },
  { x: '"Ai bảo con làm thế?"', o: '"Lúc đó con nghĩ gì?"', vi: 'Câu đầu tìm người có lỗi; câu sau tìm cơ chế.' }
];

GV.NGON_NGU_LUAT = 'Sáu nhịp cho mọi cuộc nói chuyện khó: *dừng lại* trước khi phản ứng · *mô tả* thay vì đánh giá · *hỏi* thay vì kết luận · *nghe hết* trước khi nói · *nói cảm nhận của mình* thay vì lỗi của con · *chốt một việc nhỏ* thay vì chốt một bài học lớn.';

/* ══════════ NGHI LỄ VÀ BIỂU TƯỢNG ══════════ */
GV.NGHI_LE = [
  { t: 'Tuyên ngôn chi hội', khi: 'Đầu mỗi buổi sinh hoạt',
    n: 'Cả chi hội đứng, đọc to. Mỗi tuần nhấn một câu khác nhau.',
    vi: 'Lặp lại là cách một giá trị đi từ tai vào người. Bỏ nghi thức này thì sau sáu tháng chi hội chỉ còn là một cuộc họp.' },
  { t: 'Huy hiệu và thẻ tên', khi: 'Mọi hoạt động của chi hội',
    n: 'Huy hiệu ở vị trí dễ thấy, thẻ tên ngực trái. Theo đúng bộ quy chuẩn CLB Gen Việt.',
    vi: 'Một đứa trẻ đeo huy hiệu bước vào lớp học của mình mang theo một bản sắc. Đó không phải hình thức.' },
  { t: 'Lễ nhận thành viên', khi: 'Khi V1 lên V2',
    n: 'Người dẫn em vào trao huy hiệu chính thức. Em đọc cam kết trước chi hội.',
    vi: 'Được công nhận trước mặt những người mình nể là một trong vài trải nghiệm hình thành nhân cách mạnh nhất ở tuổi ấy.' },
  { t: 'Lễ trao ghế', khi: 'Đầu mỗi nhiệm kỳ 6 tháng',
    n: 'Người tiền nhiệm trao sổ ghế tận tay người kế nhiệm, nói một câu dặn.',
    vi: 'Nghi thức này dạy hai điều cùng lúc: quyền lực có thời hạn, và bàn giao là một phần của trách nhiệm.' },
  { t: 'Vòng biết ơn', khi: 'Cuối mỗi quý',
    n: 'Mỗi thành viên nói một lời biết ơn có tên và có việc cụ thể với một người trong chi hội.',
    vi: 'Cột "biết ơn" trên bảng số là con số; vòng này là phần con số ấy không đo được.' },
  { t: 'Lễ tốt nghiệp trại', khi: 'Ngày cuối mỗi kỳ trại',
    n: 'Ba mẹ có mặt. Em trình bày. Không ai trình bày hộ.',
    vi: 'Khoảnh khắc phụ huynh nhìn con mình đứng nói trước đám đông thay đổi cách họ đối xử với con nhiều hơn mười buổi tư vấn.' },
  { t: 'Đại hội Gen Việt', khi: 'Tuần 52 hằng năm',
    n: 'Vinh danh · công nhận bậc 5–6 · công bố bảy chỉ số toàn hệ, kể cả chỉ số xấu.',
    vi: 'Công bố chỉ số xấu trước cộng đồng là nghi lễ giữ cho hệ thống trung thực với chính mình.' }
];

/* ══════════ HỆ GHI NHẬN ══════════ */
GV.GHI_NHAN = {
  luat: [
    'Ghi nhận *hành vi và nỗ lực*, không ghi nhận tài năng bẩm sinh. "Con giữ được nhịp mười ngày" chứ không phải "con thông minh".',
    'Không thưởng vật chất cho bậc. Bậc là bằng chứng năng lực; gắn tiền vào đó là phá huỷ giá trị của cả hệ hộ chiếu.',
    'Vinh danh công khai, góp ý riêng tư. Không đảo ngược thứ tự này trong bất cứ hoàn cảnh nào.',
    'Mỗi lần vinh danh phải nói *việc gì*, không chỉ nói tên. Vinh danh không có nội dung là một dạng khen chung chung có sân khấu.'
  ],
  cap: [
    { c: 1, t: 'Người mới', dk: 'Vào chi hội', bieu: 'Thẻ tên' },
    { c: 2, t: 'Người giữ nhịp', dk: '4 tuần liền không băng ĐỎ', bieu: 'Huy hiệu chính thức' },
    { c: 3, t: 'Người cho đi', dk: 'Nhận được 10 thư biết ơn', bieu: 'Dấu Cho Đi Trước' },
    { c: 4, t: 'Người đứng lên', dk: 'Hoàn thành một lượt ghế nóng', bieu: 'Dấu Ghế Nóng' },
    { c: 5, t: 'Người dẫn khách', dk: 'Dẫn 3 khách, ≥ 1 thành thành viên', bieu: 'Dấu Mở Cửa' },
    { c: 6, t: 'Người phụng sự', dk: '30 giờ phụng sự có xác nhận', bieu: 'Dấu Phụng Sự' },
    { c: 7, t: 'Người làm ra', dk: 'Một sản phẩm có người dùng thật', bieu: 'Dấu Sản Phẩm' },
    { c: 8, t: 'Người dẫn nhóm', dk: 'Dẫn một tổ hoặc tiểu ban trọn 6 tháng', bieu: 'Dấu Dẫn Dắt' },
    { c: 9, t: 'Người giữ ghế', dk: 'Hoàn thành một nhiệm kỳ ban điều hành đạt KPI', bieu: 'Dấu Nhiệm Kỳ' },
    { c: 10, t: 'Người rèn người', dk: 'Kèm một bạn qua một cổng bậc', bieu: 'Dấu Người Dẫn' }
  ]
};

/* ══════════ CHUỖI WOW — CHÍN ĐIỂM CHẠM ══════════
   Chín khoảnh khắc quyết định một gia đình ở lại hay rời đi. Mỗi điểm
   chạm có một người chịu trách nhiệm; không có điểm chạm nào "của cả
   đội", vì thứ của cả đội là thứ không ai làm.                        */
GV.WOW = [
  { n: 1, t: 'Lần đầu nghe kể', ai: 'Đại sứ',
    y: 'Một câu chuyện thật, có tên, có số. Không có tờ rơi nào thay được điều này.' },
  { n: 2, t: 'Buổi gặp đầu tiên', ai: 'Tư vấn',
    y: 'Khoảnh khắc gia đình lần đầu nhìn thấy sự thật mà không cãi nhau — khi tính từ được dịch thành hành vi.' },
  { n: 3, t: 'Đọc kết quả test cùng nhau', ai: 'Tư vấn + Coach',
    y: 'Con thấy mình được đọc đúng, không bị chấm điểm. Đây là lúc con quyết định có hợp tác hay không.' },
  { n: 4, t: 'Ngày thứ 7', ai: 'Coach',
    y: 'Một thay đổi nhỏ nhưng thật, đo được. Nhà đã mất niềm tin quay lại chính ở khoảnh khắc này.' },
  { n: 5, t: 'Lần đầu đứng trước chi hội', ai: 'Đội trưởng CLB',
    y: '45 giây đầu tiên trong đời một đứa trẻ đứng nói trước hai mươi người nhìn thẳng vào mình.' },
  { n: 6, t: 'Đêm chủ đề ở trại', ai: 'Trưởng trại',
    y: 'Điều em chưa từng nói với ba mẹ, nói ra được. Đây là điểm chạm mạnh nhất trong cả hành trình.' },
  { n: 7, t: 'Người đầu tiên dùng sản phẩm của em', ai: 'Cố vấn dự án',
    y: 'Khoảnh khắc năng lực rời khỏi vở bài tập và chạm vào một người thật.' },
  { n: 8, t: 'Buổi bảo vệ hồ sơ', ai: 'Assessor',
    y: 'Con trình bày, người lớn ngồi nghe. Nhiều phụ huynh khóc ở buổi này — vì lần đầu họ thấy con mình là một người trưởng thành.' },
  { n: 9, t: 'Ngày em quay lại rèn người khác', ai: 'Quản lý chuyên môn',
    y: 'Điểm chạm cuối cùng và là điểm chạm duy nhất chứng minh cả hệ thống đã làm đúng.' }
];

/* ══════════ NGHỀ COACH — LỘ TRÌNH ══════════ */
GV.NGHE_COACH = [
  { c: 'Trợ giảng', tg: '0–6 tháng', lam: 'Dự buổi, ghi biên bản, chuẩn bị tài liệu, chạy phần lớp',
    dk: 'Hoàn thành khoá nhập môn · dự tối thiểu 30 buổi', ra: 'Biên bản quan sát đạt chuẩn' },
  { c: 'Coach tập sự', tg: '6–18 tháng', lam: 'Kèm 1–2 ca đơn giản, luôn có Coach bảo trợ ngồi cùng hoặc nghe lại băng',
    dk: 'Đạt K1–K4 · qua bài kiểm đọc ca', ra: 'Một ca qua cổng dưới sự dẫn dắt của mình' },
  { c: 'Coach', tg: '18 tháng – 4 năm', lam: 'Kèm 6–10 ca · tự thiết kế phác đồ · làm việc với gia đình',
    dk: 'Đạt K1–K6 · điểm nghiệm thu trung bình ≥ 85 · đường cong hỗ trợ giảm', ra: 'Ca ở cả năm tầng' },
  { c: 'Senior Coach', tg: '4–7 năm', lam: 'Nhận ca khó, ca đã trượt cổng, ca nhiều nhánh · gỡ nút cho Coach khác',
    dk: 'Đạt K1–K7 · gỡ được ≥ 10 ca khó · đóng góp ≥ 5 mục vào kho', ra: 'Ca khó có hồ sơ và bài học viết lại' },
  { c: 'Trưởng nhóm Coach', tg: '7 năm trở lên', lam: 'Tạo ra Coach giỏi, không chỉ làm Coach giỏi · dự giờ · chấm chéo',
    dk: 'Đã đào tạo ≥ 5 Coach đạt chuẩn', ra: 'Chất lượng đội ngũ, không phải chất lượng ca của riêng mình' },
  { c: 'Quản lý chuyên môn', tg: 'Bổ nhiệm', lam: 'Giữ chuẩn nghề toàn hệ · nhận phiếu chuyển tuyến · ngồi Hội đồng Chuẩn',
    dk: 'Hội đồng Chuẩn bổ nhiệm, nhiệm kỳ 3 năm', ra: 'Độ bền chuẩn giữa các vùng' }
];

/* ══════════ BẢY NĂNG LỰC NGHỀ ══════════ */
GV.BAY_NL = [
  { k: 'K1', t: 'Quan sát và ghi dữ liệu',
    n: 'Ghi được hành vi quan sát được thay vì ấn tượng. Phân biệt "em ấy lười" với "em ngồi vào bàn 19:40, đứng dậy ba lần trong 40 phút".',
    kiem: 'Cho một đoạn băng buổi học, hai người ghi độc lập — hai bản phải khớp nhau về dữ kiện.' },
  { k: 'K2', t: 'Lắng nghe và đặt câu hỏi',
    n: 'Giữ tỷ lệ nghe 70 nói 30. Hỏi mở, không hỏi dẫn dắt, không hỏi để chứng minh giả thuyết của mình.',
    kiem: 'Đếm trên băng: tỷ lệ thời gian nói, số câu hỏi đóng, số lần cắt lời.' },
  { k: 'K3', t: 'Đọc bản đồ G – I – T – A',
    n: 'Đặt mọi dữ kiện vào đúng cửa, và nhìn ra cửa nào đang thiếu dữ liệu.',
    kiem: 'Cho một hồ sơ, chỉ ra ba dữ kiện đang bị xếp nhầm cửa.' },
  { k: 'K4', t: 'Lập giả thuyết có bằng chứng',
    n: 'Nêu 1–3 giả thuyết, mỗi giả thuyết kèm bằng chứng ủng hộ VÀ bằng chứng phản bác.',
    kiem: 'Giả thuyết nào không có bằng chứng phản bác đi kèm thì chưa đạt — đó là niềm tin, không phải giả thuyết.' },
  { k: 'K5', t: 'Thiết kế phép thử',
    n: 'Một phép thử đổi ít biến, có thời hạn, có cách đo, và có thể sai. Nếu không thể sai thì không phải phép thử.',
    kiem: 'Trình bày một phép thử và nói trước: kết quả thế nào thì mình biết mình sai.' },
  { k: 'K6', t: 'Giải mã cơ chế và thiết kế phác đồ',
    n: 'Từ dữ liệu ra cơ chế, từ cơ chế ra đòn bẩy, từ đòn bẩy ra phác đồ 1–2–1.',
    kiem: 'Cho một ca thật đã đóng, dựng lại phác đồ và so với phác đồ đã dùng.' },
  { k: 'K7', t: 'Chuyển giao và giảm hỗ trợ',
    n: 'Năng lực khó nhất và là năng lực phân biệt một Coach giỏi với một người dạy giỏi: làm cho mình ngày càng ít cần thiết.',
    kiem: 'Đường cong hỗ trợ của các ca mình phụ trách qua 12 tháng — có giảm mà kết quả không tụt không.' }
];

/* ══════════ TUYỂN VÀ THỬ VIỆC ══════════ */
GV.TUYEN = {
  tim: [
    'Người đã từng tự thay đổi được một thứ khó của chính mình, và kể lại được cơ chế — không chỉ kể lại kết quả.',
    'Người hỏi nhiều hơn khuyên trong buổi phỏng vấn.',
    'Người chịu được việc nói "tôi chưa biết" trước mặt người khác.',
    'Người kể về học trò cũ bằng dữ liệu, không bằng tính từ.'
  ],
  tranh: [
    'Người có sẵn một giải pháp cho mọi ca ngay khi vừa nghe mô tả.',
    'Người nói về học trò như nói về sản phẩm của mình.',
    'Người cần được học trò yêu quý hơn là cần học trò tự lập.',
    'Người không chịu được khi bị hỏi lại về căn cứ.'
  ],
  thu: [
    { m: 'Ngày 1–30', v: 'Dự 20 buổi, ghi biên bản quan sát. Chưa chạm vào ca nào.' },
    { m: 'Ngày 31–60', v: 'Chạy phần lớp và phần chuẩn bị. Nhận một ca có Coach bảo trợ ngồi cùng.' },
    { m: 'Ngày 61–90', v: 'Tự chạy một ca đơn giản, mỗi buổi được nghe lại và gỡ băng.' },
    { m: 'Ngày 90', v: 'Cổng thử việc: kiểm K1–K4 · nếu chưa đạt thì gia hạn 60 ngày một lần duy nhất.' }
  ]
};

/* ══════════ CHUẨN DỰ GIỜ — 20 ĐIỂM ══════════ */
GV.DU_GIO = [
  { t: 'Chuẩn bị trước buổi', d: 3, n: 'Đã đọc dữ liệu trước, không đọc trong buổi. Có một câu hỏi trọng tâm định sẵn.' },
  { t: 'Tỷ lệ nghe / nói', d: 3, n: 'Coach nói dưới 40% thời lượng. Không cắt lời học viên lần nào.' },
  { t: 'Chất lượng câu hỏi', d: 3, n: 'Phần lớn là câu hỏi mở. Không có câu hỏi dẫn dắt tới kết luận có sẵn.' },
  { t: 'Bám dữ liệu', d: 3, n: 'Mọi nhận định đều dẫn được về một dữ kiện cụ thể trong hồ sơ.' },
  { t: 'Một đòn bẩy', d: 3, n: 'Buổi kết thúc với đúng một việc trọng tâm, không phải năm việc.' },
  { t: 'Chuyển quyền', d: 3, n: 'Học viên là người nói ra bước tiếp theo, không phải Coach.' },
  { t: 'Giữ ranh giới', d: 2, n: 'Không vượt phạm vi chuyên môn. Không làm thay. Không hứa kết quả.' }
];
GV.DU_GIO_LUAT = 'Ngưỡng đạt 16/20. Dưới 16 thì Coach được dự giờ lại trong vòng 30 ngày. Dưới 12 hai lần liên tiếp thì tạm dừng nhận ca mới cho tới khi qua. *Dự giờ không phải để chấm điểm con người — nó để giữ cho nghề này còn là một nghề có chuẩn.*';
