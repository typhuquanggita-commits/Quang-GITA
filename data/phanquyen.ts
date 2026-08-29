/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {Quyen, BacQuyen, NhomQuyen} from '../types';
import {LEVELS} from './levels';
import {COACH_LADDER} from './training';

/* ==========================================================================
   PHÂN QUYỀN THEO CẤP ĐỘ HỌC VIÊN VÀ CẤP ĐỘ GIÁO VIÊN

   NÓI TRƯỚC MỘT ĐIỀU, VÌ KHÔNG NÓI THÌ LÀ LỪA NGƯỜI DÙNG
     Bản máy tính và bản web của ENGWIN365 chạy hoàn toàn trên máy người dùng.
     Mọi thứ trong tệp này quyết định GIAO DIỆN NHÌN THẤY GÌ — nó không phải
     một hàng rào an ninh. Ai mở công cụ nhà phát triển đều đổi được vai của
     mình trong bộ nhớ trình duyệt.

     Muốn phân quyền có hiệu lực thật thì phải có máy chủ: vai gắn với phiên
     đăng nhập, và MỌI thao tác đọc ghi đều kiểm lại vai ở phía máy chủ, không
     tin bất cứ điều gì trình duyệt gửi lên. Tệp này là bản thiết kế cho tầng
     đó, đồng thời là bản mô tả cho vận hành học viện ngoài đời — chứ không
     phải bản thay thế nó.

   BA NGUYÊN TẮC
     1. Đặc quyền tối thiểu. Một bậc chỉ nhận đúng những quyền mà công việc
        của bậc đó cần. Thừa một quyền là thừa một cách làm hỏng.
     2. Không ai tự nâng mình. Nâng cấp độ học viên hay nâng bậc giáo viên đều
        do bậc trên quyết, và luôn có số liệu kèm theo.
     3. Việc không đảo ngược cần hai người. Xoá hồ sơ, cấp chứng nhận, đổi
        điểm đã chốt — một người ký thì không đủ.
   ========================================================================== */

export const QUYEN_CREED = {
  name: 'PHÂN QUYỀN ENGWIN365',
  claim:
    'Hai thang song song: học viên lên theo năm tầng năng lực, người dạy lên theo năm nấc nghề. Mỗi nấc mở thêm đúng những quyền mà nấc đó chịu trách nhiệm được.',
  thatThe:
    'Phân quyền ở giao diện KHÔNG phải bảo mật. Nó ngăn nhầm lẫn, không ngăn được người cố ý. Hiệu lực thật chỉ có khi máy chủ kiểm lại vai ở từng thao tác.',
  thuaKe:
    'Quyền thừa kế lên trên trong cùng một thang: bậc trên luôn có đủ mọi quyền của bậc dưới. Có bài kiểm giữ luật này, vì một ngoại lệ là một lỗ hổng.',
  hoiNguoc:
    'Mỗi quyền đều phải trả lời được câu hỏi: vì sao nó bị chặn? Quyền nào không trả lời được thì không đáng tồn tại, và phải mở cho tất cả.',
};

/* ------------------------------ QUYỀN ----------------------------------- */

const Q = (
  id: string, nhom: NhomQuyen, ten: string, lam: string, viSaoChan: string,
  co?: {haiNguoi?: boolean; ghiNhatKy?: boolean},
): Quyen => ({id, nhom, ten, lam, viSaoChan, ...co});

export const QUYEN: Quyen[] = [
  /* --------------------------- HỌC ------------------------------------ */
  Q('q-xem-lo-trinh', 'học', 'Xem lộ trình của mình',
    'Mở cột mốc, hồ sơ ngày, và phiếu luyện thuộc cấp độ hiện tại.',
    'Không chặn ai. Đây là quyền nền, mọi bậc đều có.'),
  Q('q-lam-phieu', 'học', 'Làm phiếu luyện',
    'Nhận phiếu, làm năm phần theo thứ tự, nộp để chấm.',
    'Không chặn ai đang học. Chặn duy nhất ở chỗ: phiếu cũ còn dở thì chưa phát phiếu mới.'),
  Q('q-xem-phieu-tren-tang', 'học', 'Xem phiếu của tầng trên',
    'Mở trước nội dung của tầng mình chưa tới.',
    'Xem trước nội dung quá tầm gây hai hại: nản vì thấy quá khó, và học lệch vì bỏ nền. Mở dần theo tầng.'),
  Q('q-tu-chon-lo-trinh', 'học', 'Tự đổi lộ trình',
    'Đổi giữa tuyến IELTS và tuyến chuyên Anh, đổi nhịp ngày.',
    'Đổi tuyến giữa chừng có cái giá thật. Từ tầng 3 trở lên học viên đã đủ dữ liệu về chính mình để tự quyết.'),
  Q('q-mo-kho-giai-phap', 'học', 'Tra kho 1.000 giải pháp',
    'Tự tra đơn kê theo triệu chứng và cấp độ.',
    'Ở tầng 1–2, tự tra dễ dẫn tới tự kê ba bốn đơn cùng lúc rồi không làm đơn nào. Tầng 3 trở lên tự tra được.'),

  /* --------------------------- CHẤM ----------------------------------- */
  Q('q-tu-cham', 'chấm', 'Tự chấm phiếu của mình',
    'Chấm phần trắc nghiệm và phần có đáp án đóng.',
    'Không chặn. Phần đóng có đáp án nên tự chấm không sai lệch được.'),
  Q('q-cham-ban', 'chấm', 'Chấm chéo bài của bạn cùng nhóm',
    'Chấm phần viết và phần nói của học viên khác trong câu lạc bộ.',
    'Chấm chéo chỉ có ích khi người chấm đủ trình để nhận ra lỗi. Dưới tầng 3 thì chấm chéo lan truyền cái sai.'),
  Q('q-cham-chinh-thuc', 'chấm', 'Chấm bài lấy điểm chính thức',
    'Chấm phần tự luận, phần nói, và ghi điểm vào hồ sơ học viên.',
    'Điểm chính thức quyết định việc nâng cấp độ. Người chấm phải qua kiểm định chấm bài.',
    {ghiNhatKy: true}),
  Q('q-sua-diem-da-chot', 'chấm', 'Sửa điểm đã chốt',
    'Đổi một điểm đã ghi vào hồ sơ.',
    'Sửa điểm đã chốt là sửa lịch sử. Phải có người thứ hai ký và phải ghi lý do.',
    {haiNguoi: true, ghiNhatKy: true}),
  Q('q-cham-thi-cap-do', 'chấm', 'Chấm bài thi cấp độ',
    'Chấm bài thi quyết định nâng cấp độ học viên.',
    'Đây là cửa quyết định cả lộ trình. Chỉ bậc đã tự đứng lớp độc lập mới chấm được.',
    {ghiNhatKy: true}),

  /* -------------------------- HỒ SƠ ----------------------------------- */
  Q('q-xem-ho-so-minh', 'hồ sơ', 'Xem hồ sơ của chính mình',
    'Xem điểm, chuỗi ngày, lịch sử phiếu, nhận xét đã nhận.',
    'Không chặn ai. Học viên phải thấy được toàn bộ dữ liệu về chính mình.'),
  Q('q-xem-ho-so-con', 'hồ sơ', 'Xem hồ sơ của con mình',
    'Phụ huynh xem tiến độ, điểm và chuỗi ngày của con.',
    'Chỉ mở đúng hồ sơ con mình, không mở hồ sơ học viên khác.'),
  Q('q-xem-ho-so-lop', 'hồ sơ', 'Xem hồ sơ cả lớp mình dạy',
    'Xem tiến độ của mọi học viên trong lớp phụ trách.',
    'Chỉ lớp mình phụ trách. Xem lớp người khác không phục vụ việc gì và là rò rỉ dữ liệu.'),
  Q('q-xem-ho-so-toan-truong', 'hồ sơ', 'Xem hồ sơ toàn học viện',
    'Xem tiến độ mọi lớp, mọi giáo viên.',
    'Cần cho điều hành, nhưng là quyền rộng nhất về dữ liệu người học. Phải ghi nhật ký từng lần mở.',
    {ghiNhatKy: true}),
  Q('q-xuat-du-lieu', 'hồ sơ', 'Xuất dữ liệu ra tệp',
    'Kết xuất hồ sơ học viên ra tệp mang ra ngoài hệ thống.',
    'Dữ liệu ra khỏi hệ thống là hết kiểm soát. Cần hai người ký và ghi nhật ký.',
    {haiNguoi: true, ghiNhatKy: true}),
  Q('q-xoa-ho-so', 'hồ sơ', 'Xoá hồ sơ học viên',
    'Xoá vĩnh viễn toàn bộ dữ liệu của một học viên.',
    'Không đảo ngược được. Hai người ký, ghi nhật ký, và chỉ làm khi có yêu cầu bằng văn bản.',
    {haiNguoi: true, ghiNhatKy: true}),

  /* ------------------------- LỘ TRÌNH --------------------------------- */
  Q('q-xep-cap-dau-vao', 'lộ trình', 'Xếp cấp độ đầu vào',
    'Chấm bài test đầu vào và xếp học viên vào bậc.',
    'Xếp sai bậc ở tháng đầu là hỏng cả lộ trình. Người xếp phải được kiểm định.',
    {ghiNhatKy: true}),
  Q('q-nang-cap-do', 'lộ trình', 'Nâng cấp độ học viên',
    'Cho một học viên lên cấp độ tiếp theo sau khi đạt KPI 90%.',
    'Nâng sớm là đẩy học viên vào tầng chưa đủ nền. Phải có số liệu và có bài thi cấp độ.',
    {ghiNhatKy: true}),
  Q('q-ha-cap-do', 'lộ trình', 'Hạ cấp độ học viên',
    'Đưa học viên xuống cấp thấp hơn khi số liệu cho thấy đã nâng sớm.',
    'Hạ cấp chạm tới lòng tự trọng của người học. Phải có số liệu và phải nói chuyện trước.',
    {haiNguoi: true, ghiNhatKy: true}),
  Q('q-doi-tuyen-hoc-vien', 'lộ trình', 'Đổi tuyến cho học viên',
    'Chuyển học viên giữa tuyến IELTS và tuyến chuyên Anh.',
    'Đổi tuyến đổi cả đích và cả cách đo. Phải bàn với gia đình trước, không đổi lặng lẽ.',
    {ghiNhatKy: true}),
  Q('q-mo-khoa-tang', 'lộ trình', 'Mở sớm nội dung tầng trên',
    'Cho một học viên xem nội dung của tầng chưa tới.',
    'Có trường hợp thật cần mở sớm. Nhưng phải là quyết định có người chịu trách nhiệm, không phải mặc định.',
    {ghiNhatKy: true}),

  /* ------------------------- NỘI DUNG --------------------------------- */
  Q('q-tao-phieu-rieng', 'nội dung', 'Tạo phiếu luyện riêng',
    'Soạn phiếu ngoài bộ 2.000 phiếu chuẩn cho một học viên cụ thể.',
    'Phiếu tự soạn không qua kiểm chất lượng. Chỉ bậc đã dạy độc lập mới soạn được.'),
  Q('q-sua-noi-dung-chuan', 'nội dung', 'Sửa nội dung chuẩn',
    'Sửa phiếu, bài giảng, bài luyện trong bộ chuẩn của hệ thống.',
    'Sửa bộ chuẩn là sửa cho mọi học viên cùng lúc. Hai người ký và ghi nhật ký.',
    {haiNguoi: true, ghiNhatKy: true}),
  Q('q-duyet-noi-dung', 'nội dung', 'Duyệt nội dung mới',
    'Phê duyệt phiếu hoặc bài giảng do người khác soạn trước khi đưa vào dùng chung.',
    'Người duyệt phải khác người soạn. Đây là toàn bộ giá trị của bước duyệt.',
    {ghiNhatKy: true}),
  Q('q-quan-ly-kho-giong', 'nội dung', 'Quản lý kho giọng và học liệu âm thanh',
    'Thêm, sửa, gỡ giọng đọc và tệp âm thanh.',
    'Giọng sai chuẩn phát tới mọi học viên và họ bắt chước theo. Phải qua đo chuẩn dẫn.'),

  /* ------------------------ CHỨNG NHẬN -------------------------------- */
  Q('q-de-xuat-chung-nhan', 'chứng nhận', 'Đề xuất cấp chứng nhận',
    'Đề nghị cấp chứng nhận hoàn thành cấp độ hoặc hoàn thành khoá.',
    'Đề xuất thì không chặn nhiều, vì còn một cửa duyệt phía sau.'),
  Q('q-cap-chung-nhan', 'chứng nhận', 'Cấp chứng nhận',
    'Ký và phát hành chứng nhận mang tên học viện.',
    'Chứng nhận là uy tín của học viện đặt lên giấy. Hai người ký.',
    {haiNguoi: true, ghiNhatKy: true}),
  Q('q-thu-hoi-chung-nhan', 'chứng nhận', 'Thu hồi chứng nhận',
    'Huỷ hiệu lực một chứng nhận đã cấp.',
    'Chỉ dùng khi phát hiện gian lận. Hai người ký và phải thông báo cho người bị thu hồi.',
    {haiNguoi: true, ghiNhatKy: true}),
  Q('q-kiem-dinh-nguoi-day', 'chứng nhận', 'Kiểm định người dạy',
    'Chấm bài kiểm định và quyết định nâng bậc nghề cho người dạy.',
    'Đây là cửa quyết định ai được dạy học viên. Chỉ bậc cao nhất của thang nghề mới làm.',
    {haiNguoi: true, ghiNhatKy: true}),

  /* -------------------------- VẬN HÀNH -------------------------------- */
  Q('q-xep-lop', 'vận hành', 'Xếp lớp và phân công giáo viên',
    'Ghép học viên vào lớp, phân giáo viên phụ trách.',
    'Xếp sai lớp thì học viên học lệch trình độ suốt kỳ.'),
  Q('q-quan-ly-tai-khoan', 'vận hành', 'Quản lý tài khoản',
    'Tạo, khoá, mở khoá tài khoản người dùng.',
    'Tạo tài khoản là tạo một cánh cửa vào hệ thống. Ghi nhật ký từng lần.',
    {ghiNhatKy: true}),
  Q('q-gan-quyen', 'vận hành', 'Gán quyền cho người khác',
    'Đặt bậc quyền cho một tài khoản.',
    'Quyền gán quyền là quyền lớn nhất trong mọi hệ thống. Hai người ký, ghi nhật ký, và không ai tự gán cho mình.',
    {haiNguoi: true, ghiNhatKy: true}),
  Q('q-xem-nhat-ky', 'vận hành', 'Xem nhật ký kiểm toán',
    'Đọc lịch sử mọi thao tác có ghi nhật ký.',
    'Nhật ký chứa dấu vết của tất cả mọi người. Chỉ mở cho vai chịu trách nhiệm giám sát.',
    {ghiNhatKy: true}),
  Q('q-doi-cau-hinh-he-thong', 'vận hành', 'Đổi cấu hình hệ thống',
    'Đổi ngưỡng KPI, số phiếu tối thiểu, cấu trúc đề, chính sách sao lưu.',
    'Hạ ngưỡng KPI là làm hỏng thước đo của cả học viện mà không ai thấy ngay.',
    {haiNguoi: true, ghiNhatKy: true}),
];

export const QUYEN_BY_ID = Object.fromEntries(QUYEN.map((q) => [q.id, q])) as Record<string, Quyen>;

/* ---------------------------- BẬC QUYỀN --------------------------------- */

/** Tên tầng năng lực của học viên, lấy đúng thứ tự tầng trong thang 25 cấp. */
const TEN_TANG = ['KHAI NHĨ', 'DỰNG NỀN', 'BẬT TIẾNG', 'HỌC THUẬT', 'TINH LUYỆN'];

const capDauTang = (tang: number): string =>
  LEVELS.find((l) => l.tierId === `tier-${tang}` && l.no === 1)?.name ?? '';

/** Thang học viên: năm bậc, mỗi bậc là một tầng của thang 25 cấp độ. */
const THANG_HOC_VIEN: BacQuyen[] = TEN_TANG.map((ten, i) => {
  const t = i + 1;
  const them =
    t === 1
      ? ['q-xem-lo-trinh', 'q-lam-phieu', 'q-tu-cham', 'q-xem-ho-so-minh']
      : t === 2
        ? ['q-de-xuat-chung-nhan']
        : t === 3
          ? ['q-cham-ban', 'q-mo-kho-giai-phap', 'q-tu-chon-lo-trinh']
          : t === 4
            ? ['q-xem-phieu-tren-tang']
            : ['q-tao-phieu-rieng'];
  return {
    id: `hv-${t}`,
    thang: 'học viên' as const,
    no: t,
    ten: `HỌC VIÊN TẦNG ${t} — ${ten}`,
    ai: `Học viên đang ở cấp ${capDauTang(t)} trở lên trong tầng ${t}.`,
    vao:
      t === 1
        ? 'Vào hệ thống là có ngay. Không yêu cầu gì.'
        : `Đạt KPI 90% trên toàn bộ phiếu của tầng ${t - 1} và qua bài thi cấp độ.`,
    themQuyen: them,
    // Bậc đáy không có bậc dưới để thừa kế. Không ghi khoá này thay vì ghi một
    // giá trị rỗng — bài kiểm rỗng ruột quét mọi trường, và một trường tồn tại
    // mà không có nội dung đúng là thứ nó phải bắt.
    ...(t > 1 ? {keThua: `hv-${t - 1}`} : {}),
    chuaDuoc:
      t === 1
        ? 'Chưa chấm bài người khác, chưa tự tra kho giải pháp, chưa xem nội dung tầng trên.'
        : t === 2
          ? 'Chưa chấm chéo — dưới tầng 3 thì chấm chéo lan truyền cái sai.'
          : t === 3
            ? 'Chưa xem trước nội dung tầng trên, và chưa soạn được phiếu riêng cho mình.'
            : t === 4
              ? 'Chưa soạn phiếu riêng — soạn phiếu ngoài bộ chuẩn cần hiểu cả hệ, không chỉ hiểu bài của mình.'
              : 'Không có quyền nào thuộc nhóm vận hành hay chứng nhận. Học giỏi không phải là được quản lý.',
  };
});

/** Thang nghề dạy: năm nấc, lấy đúng năm nấc của thang coach có sẵn. */
const THEM_NGHE: Record<number, string[]> = {
  1: ['q-xem-lo-trinh', 'q-xem-ho-so-minh', 'q-xem-ho-so-lop', 'q-tu-cham', 'q-de-xuat-chung-nhan'],
  2: ['q-cham-chinh-thuc', 'q-mo-kho-giai-phap'],
  3: ['q-cham-thi-cap-do', 'q-nang-cap-do', 'q-tao-phieu-rieng', 'q-xep-cap-dau-vao', 'q-mo-khoa-tang'],
  4: ['q-doi-tuyen-hoc-vien', 'q-duyet-noi-dung', 'q-ha-cap-do', 'q-quan-ly-kho-giong', 'q-sua-diem-da-chot'],
  5: ['q-kiem-dinh-nguoi-day', 'q-sua-noi-dung-chuan', 'q-cap-chung-nhan', 'q-thu-hoi-chung-nhan', 'q-xem-ho-so-toan-truong'],
};

const THANG_NGHE: BacQuyen[] = COACH_LADDER.map((r) => ({
  id: `gv-${r.no}`,
  thang: 'giảng dạy' as const,
  no: r.no,
  ten: `${r.name} — ${r.epithet}`,
  ai: r.entry,
  vao: r.gate,
  themQuyen: THEM_NGHE[r.no] ?? [],
  ...(r.no > 1 ? {keThua: `gv-${r.no - 1}`} : {}),
  chuaDuoc: r.cannotYet,
}));

/** Ba vai ngoài hai thang trên. */
const VAI_KHAC: BacQuyen[] = [
  {
    id: 'ph-1', thang: 'gia đình', no: 1, ten: 'PHỤ HUYNH',
    ai: 'Cha mẹ hoặc người tài trợ của học viên dưới 18 tuổi.',
    vao: 'Được học viên hoặc học viện xác nhận quan hệ.',
    themQuyen: ['q-xem-ho-so-con', 'q-xem-lo-trinh'],
    chuaDuoc:
      'Không chấm bài, không đổi lộ trình, không nâng hạ cấp độ. Phụ huynh thấy được tiến độ nhưng không đứng vào chỗ của người dạy.',
  },
  {
    id: 'kd-1', thang: 'kinh doanh', no: 1, ten: 'TƯ VẤN VÀ CỘNG TÁC VIÊN',
    ai: 'Người tư vấn lộ trình, chốt chương trình, giới thiệu học viên.',
    vao: 'Qua khoá tư vấn và bài kiểm tra hiểu đúng lộ trình.',
    themQuyen: ['q-xem-lo-trinh', 'q-xep-cap-dau-vao', 'q-xep-lop'],
    chuaDuoc:
      'Không chấm bài, không nâng cấp độ, không xem hồ sơ chi tiết của học viên không do mình phụ trách. Tư vấn bán chương trình, không quyết định chuyên môn.',
  },
  {
    id: 'qt-1', thang: 'vận hành', no: 1, ten: 'QUẢN TRỊ HỌC VỤ',
    ai: 'Người vận hành lớp, tài khoản và lịch.',
    vao: 'Do chủ nhiệm chuyên môn và quản trị hệ thống cùng chỉ định.',
    themQuyen: ['q-xem-lo-trinh', 'q-xep-lop', 'q-quan-ly-tai-khoan', 'q-xem-ho-so-toan-truong', 'q-xuat-du-lieu'],
    chuaDuoc:
      'Không chấm bài, không nâng hạ cấp độ, không sửa nội dung chuẩn. Quản trị học vụ lo đường đi của lớp, không lo chuyên môn của lớp.',
  },
  {
    id: 'qt-2', thang: 'vận hành', no: 2, ten: 'QUẢN TRỊ HỆ THỐNG',
    ai: 'Người chịu trách nhiệm kỹ thuật và an toàn dữ liệu.',
    vao: 'Do chủ sở hữu học viện chỉ định, và chỉ nên có hai người.',
    themQuyen: ['q-gan-quyen', 'q-xem-nhat-ky', 'q-doi-cau-hinh-he-thong', 'q-xoa-ho-so'],
    keThua: 'qt-1',
    chuaDuoc:
      'Không chấm bài, không nâng cấp độ, không cấp chứng nhận. Quyền kỹ thuật lớn nhất KHÔNG kèm theo quyền chuyên môn — trộn hai thứ đó là lỗi thiết kế phổ biến nhất của các hệ quản lý học tập.',
  },
];

export const BAC_QUYEN: BacQuyen[] = [...THANG_HOC_VIEN, ...THANG_NGHE, ...VAI_KHAC];
export const BAC_BY_ID = Object.fromEntries(BAC_QUYEN.map((b) => [b.id, b])) as Record<string, BacQuyen>;

/* ------------------------------ MA TRẬN --------------------------------- */

/**
 * Toàn bộ quyền của một bậc, gồm quyền của chính nó cộng quyền thừa kế.
 *
 * Thừa kế đi theo chuỗi `keThua`, nên không thể có chuyện bậc trên thiếu một
 * quyền mà bậc dưới có — điều đó vừa vô lý vừa là nguồn lỗi kinh điển khi ma
 * trận được gõ tay từng ô.
 */
export function quyenCua(bacId: string): string[] {
  const ra = new Set<string>();
  let b: BacQuyen | undefined = BAC_BY_ID[bacId];
  const daQua = new Set<string>();
  while (b) {
    if (daQua.has(b.id)) throw new Error(`Thừa kế quay vòng tại ${b.id}`);
    daQua.add(b.id);
    for (const q of b.themQuyen) ra.add(q);
    b = b.keThua ? BAC_BY_ID[b.keThua] : undefined;
  }
  return [...ra].sort();
}

export const co = (bacId: string, quyenId: string): boolean =>
  quyenCua(bacId).includes(quyenId);

export const aiCoQuyen = (quyenId: string): string[] =>
  BAC_QUYEN.filter((b) => co(b.id, quyenId)).map((b) => b.id);

/* --------------------------- LUẬT VẬN HÀNH ------------------------------ */

export const LUAT_QUYEN = [
  {
    no: 1,
    ten: 'Đặc quyền tối thiểu',
    noiDung:
      'Một bậc chỉ nhận đúng những quyền mà công việc của bậc đó cần. Mỗi quyền trong hệ thống đều phải trả lời được câu hỏi “vì sao nó bị chặn”; quyền nào không trả lời được thì mở cho tất cả, đừng giữ lại cho oai.',
  },
  {
    no: 2,
    ten: 'Không ai tự nâng mình',
    noiDung:
      'Nâng cấp độ học viên do người dạy từ nấc COACH trở lên quyết. Nâng bậc nghề do chủ nhiệm chuyên môn quyết. Gán quyền do quản trị hệ thống quyết, và không ai gán quyền cho chính tài khoản mình.',
  },
  {
    no: 3,
    ten: 'Việc không đảo ngược cần hai người',
    noiDung:
      'Xoá hồ sơ, cấp và thu hồi chứng nhận, sửa điểm đã chốt, sửa nội dung chuẩn, xuất dữ liệu ra ngoài, đổi cấu hình hệ thống, gán quyền — mỗi việc này cần hai người ký. Một người ký thì hệ thống từ chối.',
  },
  {
    no: 4,
    ten: 'Quyền kỹ thuật không kèm quyền chuyên môn',
    noiDung:
      'Quản trị hệ thống mở được tài khoản và đọc được nhật ký, nhưng không chấm bài, không nâng cấp độ, không cấp chứng nhận. Trộn hai thứ này là lỗi thiết kế phổ biến nhất của các hệ quản lý học tập.',
  },
  {
    no: 5,
    ten: 'Nhật ký không sửa được',
    noiDung:
      'Mọi thao tác có đánh dấu ghi nhật ký đều để lại dấu vết gồm ai, lúc nào, làm gì, và lý do. Nhật ký chỉ thêm, không sửa, không xoá — kể cả quản trị hệ thống.',
  },
  {
    no: 6,
    ten: 'Mở tầng là quyết định có người chịu trách nhiệm',
    noiDung:
      'Học viên chỉ thấy nội dung của tầng mình và tầng dưới. Có trường hợp thật cần mở sớm, và hệ thống cho phép — nhưng phải do một người từ nấc COACH trở lên bấm, có ghi tên và ghi lý do, chứ không mở mặc định.',
  },
];

export const VIEC_HAI_NGUOI = QUYEN.filter((q) => q.haiNguoi).map((q) => q.id);
export const VIEC_GHI_NHAT_KY = QUYEN.filter((q) => q.ghiNhatKy).map((q) => q.id);

export const QUYEN_SO = {
  soQuyen: QUYEN.length,
  soBac: BAC_QUYEN.length,
  soThang: new Set(BAC_QUYEN.map((b) => b.thang)).size,
  soNhom: new Set(QUYEN.map((q) => q.nhom)).size,
  soHaiNguoi: VIEC_HAI_NGUOI.length,
  soGhiNhatKy: VIEC_GHI_NHAT_KY.length,
  soLuat: LUAT_QUYEN.length,
};
