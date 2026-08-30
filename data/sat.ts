/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/* ==========================================================================
   TẦNG SAT — BÀI THI SỐ HOÁ, THÍCH ỨNG THEO MÔ-ĐUN

   VÌ SAO CÓ TẦNG NÀY
     Học viên nhắm du học Mỹ cần SAT, và SAT KHÔNG phải một biến thể của
     IELTS. Nó đo thứ khác, chấm theo cách khác, và thưởng cho kỹ năng
     khác. Ai mang thói quen luyện IELTS sang làm SAT thì hỏng ở đúng chỗ
     dễ đoán: đọc kỹ từng chữ trong khi đề tính giờ theo giây, và học từ
     vựng học thuật trong khi đề hỏi từ theo NGỮ CẢNH.

   BA KHÁC BIỆT GỐC SO VỚI IELTS — PHẢI HIỂU TRƯỚC KHI LUYỆN
     1. SAT là bài thi THÍCH ỨNG theo mô-đun. Làm tốt mô-đun 1 thì mô-đun 2
        khó hơn và TRẦN ĐIỂM cao hơn. Làm kém mô-đun 1 thì dù mô-đun 2 đúng
        hết cũng không với tới điểm cao. Không có cơ chế nào tương tự trong
        IELTS, và nó đảo ngược lời khuyên quen thuộc "để dành sức về sau".
     2. SAT không chấm người. Không có bài viết, không có phần nói. Toàn bộ
        điểm đến từ câu trả lời đúng hay sai, nên không có chỗ cho "ấn
        tượng chung" — thứ vẫn cứu được một bài IELTS Writing lệch.
     3. SAT có TOÁN, và toán chiếm một nửa điểm. Học viên tiếng Anh giỏi mà
        bỏ mặc nửa này thì trần điểm chặn ở 800/1600 dù tiếng Anh hoàn hảo.

   KHÔNG CHÉP ĐỀ CỦA AI
     Tầng này KHÔNG chứa đề thi thật hay đoạn văn của College Board, cũng
     không chép lại đề của bất kỳ trung tâm nào. Đề thật có bản quyền. Cái
     ở đây là CẤU TRÚC, DẠNG BÀI, cách đọc vị và quy trình xử lý — phần đó
     là sự kiện và phương pháp, dùng lại được ở mọi đề kể cả đề chưa ra.
   ========================================================================== */

export const SAT_CREED = {
  name: 'TẦNG SAT',
  claim:
    'Cấu trúc đầy đủ bài SAT số hoá, bảng dạng bài theo bảy chiều cho từng miền kiến thức, cơ chế thích ứng và cách khai thác nó, cùng lộ trình gắn vào hệ năm tầng của ENGWIN365.',
  khongPhai:
    'KHÔNG chứa đề thi thật hay đoạn văn của College Board, và không chép đề của trung tâm nào. Đề thật có bản quyền. Ở đây là cấu trúc, dạng bài và phương pháp — phần dùng lại được ở mọi đề.',
  thichUng:
    'Mô-đun 1 quyết định trần điểm của cả phần. Đây là khác biệt lớn nhất so với mọi bài thi khác trong hệ thống, và nó đảo ngược lời khuyên quen thuộc "để dành sức về sau".',
  nuaToan:
    'Toán chiếm đúng một nửa số điểm. Học viên tiếng Anh giỏi mà bỏ nửa này thì trần điểm chặn ở 800/1600 dù tiếng Anh hoàn hảo.',
};

/* ==========================================================================
   CẢNH BÁO NGUỒN — ĐỌC TRƯỚC KHI DÙNG BẤT KỲ CON SỐ NÀO Ở DƯỚI
   ========================================================================== */
export const SAT_NGUON = {
  canhBao:
    'CẢNH BÁO QUAN TRỌNG: lịch thi, lệ phí và cả cấu trúc đề đều do College Board công bố và ĐỔI theo từng năm. Mọi con số dưới đây phải đối chiếu lại với trang chính thức satsuite.collegeboard.org trước mỗi mùa thi, rồi sửa thẳng trong data/sat.ts. Cả lộ trình tự cập nhật theo, không phải sửa chỗ nào khác.',
  ngayTraCuu: '2026-08-30',
  nguonGoc: 'satsuite.collegeboard.org (College Board) — trang chính thức của kỳ thi',
  vinhVien:
    'Phần KHÔNG đổi theo năm: cấu trúc hai phần, bốn mô-đun, cơ chế thích ứng, và bốn miền kiến thức của mỗi phần. Phần ĐỔI theo năm: ngày thi, hạn đăng ký, lệ phí. Tách hai loại ra để biết chỗ nào cần soát lại hằng năm.',
};

/* ==========================================================================
   CẤU TRÚC BÀI THI
   ========================================================================== */

export interface ModunSat {
  phan: 'doc-viet' | 'toan';
  soThuTu: 1 | 2;
  soCau: number;
  phut: number;
}

/*
 * Bốn mô-đun. Con số ở đây là phần ÍT đổi nhất của kỳ thi — nó gắn với
 * thiết kế bài thi chứ không gắn với một mùa thi cụ thể.
 */
export const MODUN: ModunSat[] = [
  {phan: 'doc-viet', soThuTu: 1, soCau: 27, phut: 32},
  {phan: 'doc-viet', soThuTu: 2, soCau: 27, phut: 32},
  {phan: 'toan', soThuTu: 1, soCau: 22, phut: 35},
  {phan: 'toan', soThuTu: 2, soCau: 22, phut: 35},
];

const cong = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const cuaPhan = (p: 'doc-viet' | 'toan') => MODUN.filter((m) => m.phan === p);

export const SAT_SPEC = {
  ten: 'SAT số hoá (Digital SAT)',
  /* Mọi tổng đều TÍNH RA từ bảng mô-đun, không gõ tay. Gõ tay là chỗ con số
     lệch nhau giữa hai đoạn văn trong cùng một tài liệu. */
  soCauDocViet: cong(cuaPhan('doc-viet').map((m) => m.soCau)),
  soCauToan: cong(cuaPhan('toan').map((m) => m.soCau)),
  get tongCau() {
    return this.soCauDocViet + this.soCauToan;
  },
  phutDocViet: cong(cuaPhan('doc-viet').map((m) => m.phut)),
  phutToan: cong(cuaPhan('toan').map((m) => m.phut)),
  get tongPhutLamBai() {
    return this.phutDocViet + this.phutToan;
  },
  phutNghiGiua: 10,
  diemMoiPhan: {min: 200, max: 800},
  diemTong: {min: 400, max: 1600},
  thiTrenMay: true,
  duocDungMayTinh: 'Cả hai mô-đun Toán đều được dùng máy tính. Desmos dựng sẵn trong phần mềm thi, không cần mang máy riêng — nhưng phải luyện Desmos TRƯỚC, vì mò trong phòng thi thì mất nhiều giờ hơn là tiết kiệm được.',
};

/*
 * Thời gian mỗi câu — con số quyết định toàn bộ chiến thuật làm bài, và
 * hầu như không ai tính ra trước khi thi.
 */
export const NHIP_LAM_BAI = MODUN.map((m) => ({
  ...m,
  giayMoiCau: Math.round((m.phut * 60) / m.soCau),
}));

/* ==========================================================================
   CƠ CHẾ THÍCH ỨNG — CHỖ QUYẾT ĐỊNH TRẦN ĐIỂM
   ========================================================================== */
export const THICH_UNG = {
  cachChay:
    'Mỗi phần có hai mô-đun. Mô-đun 1 giống nhau cho mọi thí sinh. Kết quả mô-đun 1 quyết định thí sinh nhận mô-đun 2 dễ hay khó.',
  hauQua:
    'Nhánh dễ có TRẦN ĐIỂM thấp hơn nhánh khó. Nghĩa là làm kém mô-đun 1 thì dù mô-đun 2 đúng hết cũng không với tới điểm cao — không có đường gỡ ở nửa sau.',
  daoNguoc:
    'Điều này đảo ngược lời khuyên quen thuộc "khởi động nhẹ rồi tăng tốc". Ở SAT phải vào hết sức ngay từ câu đầu của mô-đun 1. Đây là sai lầm chiến thuật tốn điểm nhất của người quen thi IELTS và thi THPT.',
  khongLuiDuoc:
    'Trong một mô-đun thì đi tới đi lui thoải mái. Nhưng mô-đun đã đóng là đóng hẳn: không quay lại, và phút thừa không mang sang được. Bốn mô-đun là bốn bài thi riêng, không phải một bài dài.',
  khongDoanBua:
    'Không trừ điểm câu sai. Nên bỏ trống là mất chắc, còn khoanh bừa là còn cơ hội. Quy tắc: hết giờ mô-đun nào thì mô-đun đó không được còn ô trống nào.',
};

/* ==========================================================================
   TÁM MIỀN KIẾN THỨC

   Tỉ lệ lấy theo công bố của College Board. Số câu TÍNH RA từ tỉ lệ chứ
   không gõ tay, và có bài kiểm cộng lại phải đúng bằng số câu của phần —
   nếu không thì hoặc tỉ lệ sai, hoặc số câu sai, và cả hai đều phải biết.
   ========================================================================== */

export interface MienSat {
  id: string;
  phan: 'doc-viet' | 'toan';
  ten: string;
  tenAnh: string;
  tyLe: number;
  moTa: string;
  /** Học viên Việt Nam hay hỏng ở đâu trong miền này. */
  chetODau: string;
}

export const MIEN: MienSat[] = [
  {
    id: 'craft',
    phan: 'doc-viet',
    ten: 'Chữ nghĩa và cấu trúc',
    tenAnh: 'Craft and Structure',
    tyLe: 0.28,
    moTa:
      'Từ theo ngữ cảnh, mục đích của một câu trong đoạn, và nối hai văn bản nói cùng chủ đề nhưng khác quan điểm.',
    chetODau:
      'Học từ theo danh sách rồi chọn nghĩa quen nhất. Đề cố tình chọn những từ có nhiều nghĩa và hỏi nghĩa ÍT quen. Ai học từ rời khỏi câu thì mất gần hết miền này.',
  },
  {
    id: 'info',
    phan: 'doc-viet',
    ten: 'Thông tin và ý',
    tenAnh: 'Information and Ideas',
    tyLe: 0.26,
    moTa:
      'Tìm chi tiết, suy ra kết luận, và đọc số liệu trong bảng hoặc đồ thị để chống hoặc đỡ một luận điểm.',
    chetODau:
      'Suy diễn quá tay. Câu trả lời đúng luôn nằm TRONG văn bản; đáp án sai thường là điều hợp lý ngoài đời nhưng văn bản không nói.',
  },
  {
    id: 'conventions',
    phan: 'doc-viet',
    ten: 'Quy tắc tiếng Anh chuẩn',
    tenAnh: 'Standard English Conventions',
    tyLe: 0.26,
    moTa:
      'Ngữ pháp câu: chấm phẩy, mệnh đề, hoà hợp chủ ngữ động từ, thì, đại từ, dạng song song.',
    chetODau:
      'Chọn theo "nghe xuôi tai". Tai người học tiếng Anh như ngoại ngữ chưa đủ tin; miền này phải làm bằng LUẬT, và luật thì đếm được — đây là miền dễ lên điểm nhất trong cả bài.',
  },
  {
    id: 'expression',
    phan: 'doc-viet',
    ten: 'Diễn đạt ý',
    tenAnh: 'Expression of Ideas',
    tyLe: 0.2,
    moTa:
      'Chọn từ nối đúng quan hệ logic, và gộp một chùm ghi chú thành một câu đạt đúng mục đích cho trước.',
    chetODau:
      'Đọc lướt phần "mục đích" ở cuối đề bài. Ở dạng gộp ghi chú, mục đích mới là thứ loại đáp án — bốn đáp án thường đều đúng ngữ pháp và đều đúng sự thật.',
  },
  {
    id: 'algebra',
    phan: 'toan',
    ten: 'Đại số',
    tenAnh: 'Algebra',
    tyLe: 0.35,
    moTa: 'Phương trình và bất phương trình bậc nhất, hệ phương trình, hàm bậc nhất.',
    chetODau:
      'Giải đúng nhưng trả lời sai câu hỏi. Đề hỏi giá trị của 3x chứ không hỏi x — bẫy này lặp lại ở mọi đề và tốn điểm của cả người giỏi.',
  },
  {
    id: 'advanced',
    phan: 'toan',
    ten: 'Toán nâng cao',
    tenAnh: 'Advanced Math',
    tyLe: 0.35,
    moTa: 'Bậc hai, đa thức, hàm mũ, phương trình chứa căn và chứa ẩn ở mẫu.',
    chetODau:
      'Cố giải bằng đại số thuần khi đề cho phép nhìn đồ thị. Desmos giải xong trong mười giây thứ mà biến đổi tay mất ba phút.',
  },
  {
    id: 'data',
    phan: 'toan',
    ten: 'Giải quyết vấn đề và phân tích số liệu',
    tenAnh: 'Problem-Solving and Data Analysis',
    tyLe: 0.15,
    moTa: 'Tỉ lệ, phần trăm, đơn vị, xác suất, đọc biểu đồ, suy luận từ mẫu khảo sát.',
    chetODau:
      'Đơn vị. Đề trộn phút với giờ, mét với ki-lô-mét, và đáp án sai luôn có sẵn cho người quên đổi.',
  },
  {
    id: 'geo',
    phan: 'toan',
    ten: 'Hình học và lượng giác',
    tenAnh: 'Geometry and Trigonometry',
    tyLe: 0.15,
    moTa: 'Góc, tam giác, đường tròn, thể tích, và lượng giác trong tam giác vuông.',
    chetODau:
      'Tin vào hình vẽ. Hình trong đề SAT không vẽ đúng tỉ lệ trừ khi đề nói rõ, nên đo bằng mắt là hỏng.',
  },
];

/** Số câu ước tính của mỗi miền, tính từ tỉ lệ chứ không gõ tay. */
export const soCauCuaMien = (m: MienSat): number =>
  Math.round(m.tyLe * (m.phan === 'doc-viet' ? SAT_SPEC.soCauDocViet : SAT_SPEC.soCauToan));

export const mienCuaPhan = (p: 'doc-viet' | 'toan') => MIEN.filter((m) => m.phan === p);

/* ==========================================================================
   DẠNG BÀI — BẢY CHIỀU CHO TỪNG DẠNG

   Cùng bảy chiều với bộ 2.000 đề ở data/bode.ts, vì một học viên vừa làm
   xong một câu SAT cần đúng bảy câu trả lời đó. Khác một chỗ: SAT chấm
   bằng máy nên không có barem — thay vào đó mỗi dạng có NGƯỠNG GIÂY, tức
   là quá bấy nhiêu giây thì bỏ câu, vì giữ lại là ăn vào câu sau.
   ========================================================================== */

export interface DangSat {
  id: string;
  mienId: string;
  ten: string;
  /** Dấu hiệu nhận ra dạng này khi gặp trong đề lạ. */
  docVi: string;
  /** Cách tiếp cận tổng thể. */
  phuongPhap: string;
  /** Quy trình nghĩ từng bước. */
  buocGiai: string[];
  /** Chỗ bẫy và cách né. */
  bay: string;
  /** Một câu chốt mang đi được. */
  biKip: string;
  /** Quá bấy nhiêu giây thì bỏ, đánh dấu, đi tiếp. */
  nguongGiay: number;
}

export const DANG_SAT: DangSat[] = [
  /* ------------------------- Chữ nghĩa và cấu trúc ---------------------- */
  {
    id: 'tu-theo-ngu-canh',
    mienId: 'craft',
    ten: 'Điền từ theo ngữ cảnh',
    docVi:
      'Một đoạn ngắn có đúng một chỗ trống, đề hỏi "which choice completes the text with the most logical and precise word or phrase".',
    phuongPhap:
      'Tự nghĩ ra từ của mình TRƯỚC khi đọc bốn đáp án. Đọc đáp án trước là để bốn phương án lái mình, và ba trong bốn phương án được thiết kế để nghe hợp lý.',
    buocGiai: [
      'Đọc cả đoạn, bỏ qua chỗ trống.',
      'Tìm chữ trong đoạn quy định chỗ trống: một từ nối, một dấu hai chấm, một cặp đối lập.',
      'Che bốn đáp án lại. Tự viết ra một từ tiếng Anh hoặc tiếng Việt lấp vào.',
      'Mở đáp án. Chọn cái gần nghĩa mình đã nghĩ nhất.',
      'Nếu hai cái cùng gần: quay lại tìm chữ quy định sắc thái khen hay chê.',
    ],
    bay:
      'Từ quen mà sai sắc thái. Đề rất hay đặt một từ đúng nghĩa đen nhưng mang sắc thái ngược với giọng của đoạn.',
    biKip: 'Chỗ trống không hỏi bạn biết bao nhiêu từ. Nó hỏi bạn có đọc được câu quy định hay không.',
    nguongGiay: 60,
  },
  {
    id: 'muc-dich-cau',
    mienId: 'craft',
    ten: 'Mục đích của một câu trong đoạn',
    docVi: 'Đề hỏi "what is the main purpose of the underlined sentence" hoặc "the function of ... in the text".',
    phuongPhap:
      'Trả lời bằng ĐỘNG TỪ chỉ hành động của câu đó với đoạn: nêu ví dụ, phản bác, giới hạn, chuyển ý. Không trả lời bằng nội dung của câu.',
    buocGiai: [
      'Đọc câu trước và câu sau câu được hỏi — chức năng nằm ở quan hệ, không nằm trong chính câu đó.',
      'Nói thành lời: "câu này ĐANG LÀM GÌ với câu trước".',
      'Loại mọi đáp án chỉ tóm tắt lại nội dung câu.',
      'Trong số còn lại, chọn cái khớp với cả hướng đi của đoạn.',
    ],
    bay:
      'Đáp án tóm tắt đúng nội dung câu. Nó đúng về sự thật nhưng trả lời sai câu hỏi — đây là bẫy phổ biến nhất của dạng này.',
    biKip: 'Câu hỏi là "câu này LÀM GÌ", đừng trả lời "câu này NÓI GÌ" — đó là hai câu khác nhau.',
    nguongGiay: 75,
  },
  {
    id: 'noi-hai-van-ban',
    mienId: 'craft',
    ten: 'Nối hai văn bản',
    docVi: 'Hai đoạn ngắn ghi Text 1 và Text 2, đề hỏi tác giả Text 2 sẽ phản ứng thế nào với Text 1.',
    phuongPhap:
      'Rút mỗi văn bản về đúng một mệnh đề quan điểm, rồi xác định quan hệ giữa hai mệnh đề đó trước khi nhìn đáp án.',
    buocGiai: [
      'Viết ra lề: quan điểm của Text 1 trong một mệnh đề.',
      'Viết ra lề: quan điểm của Text 2 trong một mệnh đề.',
      'Xác định quan hệ: đồng ý, phản bác, giới hạn phạm vi, hay bổ sung một điều kiện.',
      'Chọn đáp án khớp quan hệ đó, không chọn đáp án chỉ nhắc lại một trong hai.',
    ],
    bay:
      'Hai văn bản thường KHÔNG đối lập hoàn toàn. Quan hệ hay gặp nhất là "đồng ý phần lớn nhưng giới hạn lại một điểm", và đáp án "hoàn toàn phản đối" gần như luôn sai.',
    biKip: 'Hai mệnh đề, một quan hệ. Viết ra giấy nháp rồi mới mở đáp án.',
    nguongGiay: 90,
  },

  /* --------------------------- Thông tin và ý --------------------------- */
  {
    id: 'suy-luan-hoan-thanh',
    mienId: 'info',
    ten: 'Hoàn thành suy luận',
    docVi: 'Đoạn kết thúc bằng chỗ trống, đề hỏi "which choice most logically completes the text".',
    phuongPhap:
      'Đây là câu logic đội lốt câu đọc hiểu. Đoạn luôn dựng sẵn một lập luận thiếu đúng một mắt xích, và chỗ trống chính là mắt xích đó.',
    buocGiai: [
      'Tìm từ nối ngay trước chỗ trống: therefore, however, because — nó nói mắt xích thiếu là kết luận, ngoại lệ hay nguyên nhân.',
      'Tóm tắt các dữ kiện đã cho thành một chuỗi.',
      'Tự suy ra mắt xích còn thiếu.',
      'Loại đáp án nói điều đúng nhưng KHÔNG suy ra được từ đoạn.',
    ],
    bay:
      'Đáp án đúng ngoài đời nhưng đoạn văn không cho đủ dữ kiện. SAT chỉ chấp nhận điều suy ra được từ chính văn bản.',
    biKip: 'Câu này không hỏi bạn biết gì. Nó hỏi đoạn văn cho phép kết luận gì.',
    nguongGiay: 80,
  },
  {
    id: 'dan-chung',
    mienId: 'info',
    ten: 'Chọn dẫn chứng đỡ hoặc chống một giả thuyết',
    docVi:
      'Đề mô tả một nghiên cứu rồi hỏi "which finding, if true, would most strongly support/weaken the hypothesis".',
    phuongPhap:
      'Viết giả thuyết thành dạng "nếu A thì B", rồi tìm đáp án chạm đúng vào B — chứ không chạm vào chủ đề chung.',
    buocGiai: [
      'Khoanh đúng giả thuyết đang được hỏi; đoạn thường có hơn một.',
      'Viết nó thành "nếu A thì B".',
      'Với mỗi đáp án hỏi: cái này làm B dễ tin hơn hay khó tin hơn?',
      'Chú ý chiều: đề hỏi ĐỠ hay CHỐNG. Đọc lại đề bài trước khi khoanh.',
    ],
    bay:
      'Đáp án cùng chủ đề nhưng không đụng tới giả thuyết. Cùng chủ đề không phải là dẫn chứng.',
    biKip: 'Không có dẫn chứng chung chung. Chỉ có dẫn chứng cho một mệnh đề cụ thể.',
    nguongGiay: 85,
  },
  {
    id: 'doc-bang-do-thi',
    mienId: 'info',
    ten: 'Đọc bảng hoặc đồ thị',
    docVi: 'Câu hỏi kèm một bảng số liệu hoặc biểu đồ, đề yêu cầu chọn câu hoàn thành đúng theo dữ liệu.',
    phuongPhap:
      'Đọc nhãn trục và đơn vị TRƯỚC khi đọc số. Phần lớn lỗi ở dạng này là lỗi đọc nhãn, không phải lỗi đọc số.',
    buocGiai: [
      'Đọc tiêu đề, nhãn hai trục và đơn vị.',
      'Xác định câu hỏi cần đúng một ô hay cần so sánh hai ô.',
      'Lấy số ra giấy nháp trước khi nhìn đáp án.',
      'Đối chiếu từng đáp án với số đã lấy; loại ngay cái sai chiều tăng giảm.',
    ],
    bay:
      'Đáp án dùng đúng con số nhưng gán sai nhóm, hoặc đảo chiều tăng giảm. Cả hai đều trông rất đúng nếu chỉ liếc.',
    biKip: 'Nhãn trước, số sau. Mọi bẫy của dạng này nằm ở nhãn.',
    nguongGiay: 70,
  },

  /* ----------------------- Quy tắc tiếng Anh chuẩn ---------------------- */
  {
    id: 'ranh-gioi-cau',
    mienId: 'conventions',
    ten: 'Ranh giới câu — chấm, phẩy, chấm phẩy',
    docVi: 'Bốn đáp án chỉ khác nhau ở dấu câu và từ nối quanh một chỗ nối hai mệnh đề.',
    phuongPhap:
      'Đếm mệnh đề độc lập. Hai mệnh đề độc lập KHÔNG được nối bằng một dấu phẩy trần — luật này giải được phần lớn câu của dạng.',
    buocGiai: [
      'Che đáp án. Xác định hai bên chỗ trống, mỗi bên có phải một câu đứng riêng được không.',
      'Độc lập + độc lập: cần dấu chấm, chấm phẩy, hoặc phẩy kèm liên từ (and, but, so...).',
      'Độc lập + phụ thuộc: dấu phẩy là đủ.',
      'Loại mọi đáp án nối hai câu độc lập bằng dấu phẩy trần.',
    ],
    bay:
      'Dấu phẩy trần nối hai câu độc lập nghe rất xuôi trong tiếng Việt, nên tai người Việt không báo động. Phải đếm, không được nghe.',
    biKip: 'Miền này làm bằng luật, không làm bằng tai. Đây là chỗ lên điểm nhanh nhất cả bài.',
    nguongGiay: 45,
  },
  {
    id: 'hoa-hop-dai-tu',
    mienId: 'conventions',
    ten: 'Hoà hợp chủ ngữ động từ và đại từ',
    docVi: 'Đáp án khác nhau ở số ít số nhiều của động từ, hoặc ở đại từ it / they / its / their.',
    phuongPhap:
      'Tìm chủ ngữ THẬT bằng cách gạch bỏ mọi cụm chen giữa. Đề luôn chèn một cụm giới từ dài giữa chủ ngữ và động từ.',
    buocGiai: [
      'Gạch bỏ mọi cụm bắt đầu bằng of, with, along with, as well as, including.',
      'Đọc lại chỉ còn chủ ngữ và động từ.',
      'Với đại từ: chỉ ra danh từ nó thay. Không chỉ ra được thì đáp án đó sai.',
      'Kiểm tra số ít số nhiều lần cuối.',
    ],
    bay:
      'Danh từ gần động từ nhất thường KHÔNG phải chủ ngữ. Đó chính là lý do cụm chen giữa được đặt vào.',
    biKip: 'Gạch cụm chen giữa rồi mới đọc. Câu ngắn lại thì đáp án tự hiện ra.',
    nguongGiay: 45,
  },

  /* ---------------------------- Diễn đạt ý ------------------------------ */
  {
    id: 'tu-noi',
    mienId: 'expression',
    ten: 'Chọn từ nối',
    docVi: 'Chỗ trống ở đầu câu, bốn đáp án đều là trạng từ nối: however, therefore, moreover, for example.',
    phuongPhap:
      'Xác định quan hệ giữa hai câu TRƯỚC, bằng tiếng Việt, rồi mới dịch quan hệ đó sang từ nối. Không thử lần lượt bốn từ.',
    buocGiai: [
      'Đọc câu trước và câu sau, bỏ qua chỗ trống.',
      'Nói bằng tiếng Việt: "ngược lại", "vì thế", "thêm nữa", hay "ví dụ".',
      'Dịch cái tên quan hệ đó sang từ nối tiếng Anh tương ứng, chỉ một từ.',
      'Đọc lại cả hai câu với từ đã chọn để xác nhận.',
    ],
    bay:
      'Bốn đáp án thường có hai từ cùng nhóm nghĩa. Phân biệt được chúng chỉ khi đã gọi tên quan hệ trước, còn thử từng từ thì cả hai đều nghe được.',
    biKip: 'Gọi tên quan hệ bằng tiếng Việt trước. Từ nối chỉ là bản dịch của cái tên đó.',
    nguongGiay: 40,
  },
  {
    id: 'gop-ghi-chu',
    mienId: 'expression',
    ten: 'Gộp ghi chú theo mục đích',
    docVi:
      'Một chùm gạch đầu dòng, rồi đề nói rõ mục đích: "the student wants to emphasize ... Which choice most effectively accomplishes this goal?"',
    phuongPhap:
      'MỤC ĐÍCH là thứ duy nhất loại được đáp án. Bốn đáp án gần như luôn đúng ngữ pháp và đúng sự thật theo ghi chú.',
    buocGiai: [
      'Đọc câu mục đích TRƯỚC, gạch chân động từ chính của nó: emphasize, compare, explain, introduce.',
      'Đọc chùm ghi chú, đánh dấu những ý phục vụ đúng mục đích đó.',
      'Với mỗi đáp án hỏi: nó có làm ĐÚNG việc mục đích yêu cầu không?',
      'Loại mọi đáp án đúng sự thật nhưng làm việc khác.',
    ],
    bay:
      'Đáp án dài nhất và chứa nhiều thông tin nhất thường sai, vì nó gộp cả những ý không phục vụ mục đích.',
    biKip: 'Đọc mục đích trước ghi chú. Ai đọc ghi chú trước là đã mất phương hướng.',
    nguongGiay: 70,
  },

  /* ------------------------------- Đại số ------------------------------- */
  {
    id: 'he-phuong-trinh',
    mienId: 'algebra',
    ten: 'Hệ phương trình bậc nhất',
    docVi: 'Hai phương trình hai ẩn, hoặc một bài toán lời văn dẫn tới hai điều kiện.',
    phuongPhap:
      'Nhập thẳng cả hai phương trình vào Desmos và đọc giao điểm. Chỉ giải tay khi đề hỏi điều kiện để hệ vô nghiệm hoặc vô số nghiệm.',
    buocGiai: [
      'Đọc kỹ đề hỏi x, hỏi y, hay hỏi một biểu thức của cả hai.',
      'Nhập hai phương trình vào Desmos.',
      'Đọc toạ độ giao điểm trên đồ thị, ghi cả x và y ra nháp.',
      'Thay vào ĐÚNG biểu thức đề hỏi trước khi khoanh.',
    ],
    bay:
      'Đề hỏi x + y hoặc 3x chứ không hỏi x. Giải đúng rồi khoanh sai là lỗi tốn điểm nhất của người giỏi toán.',
    biKip: 'Gạch chân câu hỏi trước khi giải. Đọc lại nó trước khi khoanh.',
    nguongGiay: 75,
  },
  {
    id: 'bat-phuong-trinh',
    mienId: 'algebra',
    ten: 'Bất phương trình và miền nghiệm',
    docVi: 'Xuất hiện dấu ≤ ≥ < >, hoặc bài toán về ngân sách, sức chứa, giới hạn.',
    phuongPhap:
      'Dịch từng ràng buộc trong lời văn thành một bất phương trình, giữ nguyên chiều, rồi vẽ miền bằng Desmos.',
    buocGiai: [
      'Đặt tên biến và ghi rõ đơn vị.',
      'Dịch mỗi ràng buộc thành một dòng.',
      'Kiểm tra chiều dấu: "không quá" là ≤, "ít nhất" là ≥.',
      'Vẽ miền, đọc điểm cần tìm.',
    ],
    bay:
      'Nhân hoặc chia cả hai vế cho số âm mà quên đổi chiều dấu. Đáp án cho chiều sai luôn có sẵn.',
    biKip: 'Số âm thì đổi chiều. Viết chữ "âm → đổi chiều" ra nháp ngay từ đầu buổi thi.',
    nguongGiay: 70,
  },

  /* ----------------------------- Toán nâng cao -------------------------- */
  {
    id: 'bac-hai',
    mienId: 'advanced',
    ten: 'Hàm bậc hai — đỉnh, nghiệm, giao điểm',
    docVi: 'Có x², hoặc đề nói tới maximum, minimum, vertex, số nghiệm.',
    phuongPhap:
      'Chọn dạng viết theo thứ đề hỏi: hỏi nghiệm thì dùng dạng tích, hỏi đỉnh thì dùng dạng chính tắc. Đổi dạng nhanh hơn giải mù.',
    buocGiai: [
      'Xác định đề hỏi nghiệm, đỉnh, hay số giao điểm.',
      'Vẽ bằng Desmos để nhìn thấy hình dạng trước.',
      'Đọc thẳng thứ cần: giao trục hoành là nghiệm, điểm cao nhất hoặc thấp nhất là đỉnh.',
      'Với câu hỏi số nghiệm: xét biệt thức, không cần giải ra nghiệm.',
    ],
    bay:
      'Câu hỏi "có bao nhiêu nghiệm thực" không cần giải. Ai giải ra nghiệm là đã mất hai phút không cần thiết.',
    biKip: 'Vẽ trước, giải sau. Đồ thị trả lời được phần lớn câu bậc hai trong mười giây.',
    nguongGiay: 85,
  },
  {
    id: 'ham-mu',
    mienId: 'advanced',
    ten: 'Tăng trưởng và suy giảm theo hàm mũ',
    docVi: 'Lời văn nói "tăng p phần trăm mỗi năm", "giảm một nửa sau mỗi ...", hoặc công thức có biến ở số mũ.',
    phuongPhap:
      'Dựng khung y = a·b^t: a là giá trị ban đầu, b là hệ số mỗi kỳ, t là số kỳ. Ba chỗ đó lấp xong là xong bài.',
    buocGiai: [
      'Tìm a — giá trị lúc t = 0.',
      'Tìm b — tăng p% thì b = 1 + p/100, giảm p% thì b = 1 − p/100.',
      'Kiểm tra đơn vị của t khớp với kỳ của b (năm với năm, tháng với tháng).',
      'Thay t của đề vào công thức đã dựng rồi tính, giữ nguyên đơn vị đã chọn.',
    ],
    bay:
      'Trộn kỳ: hệ số theo năm nhưng t đếm theo tháng. Đây là bẫy hay gặp nhất của dạng, và đáp án cho người trộn kỳ luôn có sẵn.',
    biKip: 'a, b, t — ba ô. Điền xong ba ô thì bài đã giải xong.',
    nguongGiay: 80,
  },

  /* --------------- Giải quyết vấn đề và phân tích số liệu --------------- */
  {
    id: 'ti-le-don-vi',
    mienId: 'data',
    ten: 'Tỉ lệ, tốc độ và đổi đơn vị',
    docVi: 'Đề cho một tốc độ hoặc mật độ rồi hỏi một lượng ở đơn vị khác.',
    phuongPhap:
      'Nhân dây chuyền có kèm đơn vị, gạch đơn vị theo cặp. Đơn vị còn lại phải đúng bằng đơn vị đề hỏi — nếu không thì đã sai ở đâu đó.',
    buocGiai: [
      'Viết đại lượng đầu kèm đơn vị.',
      'Nhân lần lượt các hệ số đổi, mỗi hệ số viết dạng phân số có đơn vị.',
      'Gạch các đơn vị triệt tiêu.',
      'Đối chiếu đơn vị còn lại với đơn vị đề hỏi.',
    ],
    bay:
      'Đề hỏi đơn vị khác đơn vị đã cho — phút với giờ, mét với ki-lô-mét. Đáp án cho người quên đổi luôn nằm sẵn trong bốn lựa chọn.',
    biKip: 'Viết đơn vị vào mọi con số. Đơn vị tự chỉ ra chỗ sai.',
    nguongGiay: 65,
  },
  {
    id: 'mau-khao-sat',
    mienId: 'data',
    ten: 'Suy luận từ mẫu khảo sát',
    docVi: 'Đề mô tả cách chọn mẫu rồi hỏi kết luận nào rút ra được cho tổng thể.',
    phuongPhap:
      'Kiểm tra mẫu có ngẫu nhiên không và lấy từ tổng thể nào. Kết luận chỉ được mở rộng tới đúng tổng thể mà mẫu được lấy ra.',
    buocGiai: [
      'Xác định tổng thể mẫu được lấy từ đó.',
      'Kiểm tra mẫu có ngẫu nhiên không.',
      'Loại đáp án mở rộng ra tổng thể rộng hơn.',
      'Loại đáp án khẳng định nhân quả khi đây chỉ là khảo sát.',
    ],
    bay:
      'Khảo sát không chứng minh được nhân quả. Mọi đáp án nói "A gây ra B" từ một khảo sát đều sai.',
    biKip: 'Mẫu lấy từ tổng thể nào thì kết luận dừng ở đúng tổng thể đó, không đi xa hơn một bước nào.',
    nguongGiay: 70,
  },

  /* --------------------- Hình học và lượng giác ------------------------- */
  {
    id: 'tam-giac-dong-dang',
    mienId: 'geo',
    ten: 'Tam giác đồng dạng và tỉ lệ cạnh',
    docVi: 'Hai tam giác lồng nhau hoặc có hai góc bằng nhau, đề hỏi một cạnh chưa biết.',
    phuongPhap:
      'Viết tỉ lệ theo đúng cặp cạnh tương ứng. Cặp sai là nguồn lỗi duy nhất của dạng này.',
    buocGiai: [
      'Chứng minh đồng dạng: hai góc bằng nhau là đủ.',
      'Viết tên hai tam giác theo đúng thứ tự đỉnh tương ứng.',
      'Lập tỉ lệ theo thứ tự đó.',
      'Giải và kiểm tra kết quả có hợp lý về độ lớn không.',
    ],
    bay:
      'Hình không vẽ đúng tỉ lệ trừ khi đề ghi rõ. Ước lượng bằng mắt là hỏng.',
    biKip: 'Viết đúng thứ tự đỉnh thì tỉ lệ tự đúng.',
    nguongGiay: 80,
  },
  {
    id: 'duong-tron',
    mienId: 'geo',
    ten: 'Đường tròn — cung, góc và phương trình',
    docVi: 'Có tâm, bán kính, cung, hoặc phương trình dạng x² + y² + ... = 0.',
    phuongPhap:
      'Với phương trình: hoàn thành bình phương để đưa về dạng tâm và bán kính. Với cung và góc: dùng quan hệ góc ở tâm gấp đôi góc nội tiếp.',
    buocGiai: [
      'Nhóm các hạng tử theo x và theo y.',
      'Hoàn thành bình phương từng nhóm.',
      'Đọc tâm và bán kính từ dạng chính tắc vừa đưa về, ghi rõ đâu là r.',
      'Trả lời đúng thứ đề hỏi — nhiều câu hỏi bán kính bình phương chứ không hỏi bán kính.',
    ],
    bay:
      'Nhầm r với r². Vế phải của dạng chính tắc là r², và đáp án cho người quên bình phương luôn có sẵn.',
    biKip: 'Vế phải của dạng chính tắc là r bình phương chứ không phải r — kiểm lại chỗ này trước khi khoanh.',
    nguongGiay: 85,
  },

  /* ===== BỔ SUNG ĐỢT HAI — LẤP KÍN TÁM MIỀN ===== */

  {
    id: 'cau-truc-van-ban',
    mienId: 'craft',
    ten: 'Cấu trúc tổng thể của văn bản',
    docVi: 'Đề hỏi "which choice best describes the overall structure of the text" — hỏi về cả đoạn chứ không về một câu.',
    phuongPhap:
      'Chia đoạn thành hai hoặc ba khối theo chức năng rồi mô tả quan hệ giữa các khối. Đáp án đúng luôn mô tả được TOÀN BỘ đoạn, không chỉ mô tả nửa đầu.',
    buocGiai: [
      'Đọc cả đoạn một lượt, đánh dấu chỗ giọng văn hoặc hướng lập luận đổi chiều.',
      'Gán cho mỗi khối một chức năng bằng một động từ: nêu hiện tượng, đưa giả thuyết, phản bác, kết luận.',
      'Ghép các động từ đó thành một câu mô tả cấu trúc của cả đoạn.',
      'Loại đáp án chỉ đúng với một khối mà bỏ qua khối còn lại.',
    ],
    bay:
      'Đáp án mô tả rất đúng phần đầu đoạn rồi sai hẳn ở phần cuối. Đọc hết cả đáp án chứ đừng dừng lại khi thấy nửa đầu khớp.',
    biKip: 'Đáp án phải phủ hết đoạn. Đúng nửa đoạn là sai cả câu, không phải đúng một nửa.',
    nguongGiay: 85,
  },
  {
    id: 'giong-tac-gia',
    mienId: 'craft',
    ten: 'Thái độ và giọng của tác giả',
    docVi: 'Đề hỏi tác giả nhìn nhận điều gì đó ra sao, hoặc từ nào mô tả đúng giọng của đoạn.',
    phuongPhap:
      'Săn TỪ MANG THÁI ĐỘ — tính từ và trạng từ đánh giá — chứ không đọc nội dung sự việc. Thái độ nằm ở lớp từ đánh giá, không nằm ở dữ kiện.',
    buocGiai: [
      'Gạch chân mọi tính từ và trạng từ mang đánh giá trong đoạn.',
      'Xếp chúng thành hai cột: nghiêng khen và nghiêng chê.',
      'Cột nào nặng hơn thì đó là chiều thái độ; cân nhau thì thái độ là trung dung hoặc dè dặt.',
      'Chọn đáp án đúng chiều VÀ đúng cường độ, không chỉ đúng chiều.',
    ],
    bay:
      'Đáp án đúng chiều nhưng quá mạnh. Văn học thuật hiếm khi "ca ngợi" hay "bác bỏ hoàn toàn"; nó thường "dè dặt tán thành" hoặc "hoài nghi có mức độ".',
    biKip: 'Đúng chiều chưa đủ, phải đúng cường độ. Đáp án cực đoan gần như luôn sai ở dạng này.',
    nguongGiay: 70,
  },
  {
    id: 'y-chinh',
    mienId: 'info',
    ten: 'Ý chính của đoạn',
    docVi: 'Đề hỏi "which choice best states the main idea of the text".',
    phuongPhap:
      'Ý chính phải bao được cả đoạn và không được rộng hơn đoạn. Hai phép loại này giải được gần hết câu của dạng.',
    buocGiai: [
      'Tự tóm tắt đoạn thành một câu bằng tiếng Việt trước khi nhìn đáp án.',
      'Loại đáp án chỉ nói về một chi tiết trong đoạn — hẹp hơn đoạn.',
      'Loại đáp án nói về cả lĩnh vực — rộng hơn đoạn.',
      'Trong số còn lại, chọn cái gần câu tóm tắt của mình nhất.',
    ],
    bay:
      'Đáp án chép nguyên một câu ấn tượng trong đoạn. Câu đó có thật trong văn bản nhưng thường là ví dụ chứ không phải ý chính.',
    biKip: 'Ý chính không hẹp hơn đoạn và cũng không rộng hơn đoạn. Loại theo độ rộng trước khi loại theo nội dung.',
    nguongGiay: 70,
  },
  {
    id: 'chi-tiet-truc-tiep',
    mienId: 'info',
    ten: 'Tìm chi tiết nêu trực tiếp',
    docVi: 'Đề hỏi "according to the text" — thứ cần tìm được nói thẳng trong văn bản.',
    phuongPhap:
      'Quay lại văn bản và chỉ đúng dòng đỡ cho đáp án. Không chỉ ra được dòng nào thì đáp án đó sai, dù nghe hợp lý tới đâu.',
    buocGiai: [
      'Khoanh từ khoá trong câu hỏi, ưu tiên danh từ riêng và con số.',
      'Dò văn bản tìm chỗ chứa từ khoá đó.',
      'Đọc trọn câu chứa nó cùng câu liền trước và liền sau.',
      'Với mỗi đáp án, chỉ ra dòng đỡ cho nó; không có dòng thì loại.',
    ],
    bay:
      'Đáp án dùng lại đúng từ ngữ của văn bản nhưng ghép sai quan hệ. Trùng chữ không phải là đỡ; phải trùng cả mệnh đề.',
    biKip: 'Không chỉ được dòng đỡ thì không được khoanh. Quy tắc này cứu phần lớn câu của miền Thông tin và ý.',
    nguongGiay: 60,
  },
  {
    id: 'dau-cau-bo-nghia',
    mienId: 'conventions',
    ten: 'Dấu câu quanh thành phần bổ nghĩa',
    docVi: 'Đáp án khác nhau ở chỗ có hay không cặp phẩy, cặp gạch ngang, hoặc cặp ngoặc quanh một cụm chen giữa.',
    phuongPhap:
      'Thử che cụm chen giữa đi. Che rồi mà câu vẫn đủ nghĩa thì cụm đó là bổ sung và phải có CẶP dấu ở hai đầu — cặp, không phải một.',
    buocGiai: [
      'Xác định cụm chen giữa bắt đầu và kết thúc ở đâu.',
      'Che cụm đó đi rồi đọc lại câu còn lại.',
      'Câu vẫn đủ nghĩa: cụm là bổ sung, cần cặp dấu cùng loại ở cả hai đầu.',
      'Câu mất nghĩa: cụm là thành phần thiết yếu, không được tách bằng dấu nào.',
    ],
    bay:
      'Đáp án mở bằng dấu phẩy nhưng đóng bằng gạch ngang. Trộn hai loại dấu trong một cặp luôn sai, dù mỗi dấu đứng riêng đều hợp lệ.',
    biKip: 'Mở bằng dấu gì thì đóng bằng dấu đó. Cặp lệch là sai, không cần xét gì thêm.',
    nguongGiay: 50,
  },
  {
    id: 'thi-dong-tu',
    mienId: 'conventions',
    ten: 'Thì và dạng động từ',
    docVi: 'Bốn đáp án là bốn thì hoặc bốn dạng của cùng một động từ.',
    phuongPhap:
      'Tìm MỐC THỜI GIAN trong câu hoặc trong câu lân cận, rồi chọn thì theo mốc đó. Không chọn theo cảm giác về câu đang xét một mình.',
    buocGiai: [
      'Tìm trạng ngữ chỉ thời gian: in 1920, currently, since then, by the time.',
      'Tìm thì của các động từ khác trong cùng đoạn — cả đoạn thường thống nhất một trục thời gian.',
      'Chọn thì khớp cả mốc lẫn trục của đoạn.',
      'Kiểm tra dạng động từ có hợp với chủ ngữ đã xác định không.',
    ],
    bay:
      'Mốc thời gian nằm ở câu TRƯỚC chứ không nằm trong câu có chỗ trống. Chỉ đọc câu đang xét là không đủ dữ kiện để chọn.',
    biKip: 'Thì thuộc về cả đoạn, không thuộc về một câu. Đọc rộng ra hai câu rồi mới chọn.',
    nguongGiay: 50,
  },
  {
    id: 'dang-song-song',
    mienId: 'conventions',
    ten: 'Dạng song song trong liệt kê',
    docVi: 'Câu liệt kê từ ba thành phần trở lên, hoặc có cặp cấu trúc như not only … but also.',
    phuongPhap:
      'Xếp các thành phần được liệt kê thành cột dọc rồi so dạng của chúng. Lệch dạng nhìn ra ngay khi xếp cột, còn đọc ngang thì không.',
    buocGiai: [
      'Tìm liên từ nối danh sách và xác định danh sách gồm mấy thành phần.',
      'Viết các thành phần thành cột dọc trên nháp.',
      'So dạng: cùng là danh động từ, cùng là động từ nguyên thể, hay cùng là danh từ.',
      'Chọn đáp án làm thành phần cuối khớp dạng với các thành phần trước.',
    ],
    bay:
      'Hai thành phần đầu cùng dạng, thành phần thứ ba lệch. Đề luôn đặt chỗ lệch ở cuối vì đó là chỗ người đọc đã hết chú ý.',
    biKip: 'Xếp cột dọc rồi so. Lệch dạng là thứ nhìn thấy được, đừng cố nghe ra.',
    nguongGiay: 50,
  },
  {
    id: 'so-huu-cach',
    mienId: 'conventions',
    ten: 'Sở hữu cách và dấu lược',
    docVi: "Đáp án khác nhau ở its / it's, their / they're / there, hoặc ở vị trí dấu lược trong students' và student's.",
    phuongPhap:
      'Bung dạng rút gọn ra đầy đủ rồi đọc lại. Với sở hữu cách, xác định chủ sở hữu là số ít hay số nhiều TRƯỚC khi đặt dấu lược.',
    buocGiai: [
      "Gặp it's hoặc they're thì bung thành it is và they are rồi đọc lại cả câu.",
      'Câu vô nghĩa sau khi bung: chỗ đó cần dạng sở hữu its hoặc their.',
      'Với danh từ: hỏi chủ sở hữu một hay nhiều.',
      "Một thì dấu lược đứng trước s, nhiều thì đứng sau s.",
    ],
    bay:
      "Danh từ số nhiều bất quy tắc như children và women vẫn lấy 's, vì chúng không kết thúc bằng s. Quy tắc là theo chữ cái cuối, không theo số nhiều hay không.",
    biKip: "Bung rút gọn ra rồi đọc. Sai hay đúng tự lộ ra trong một giây, không cần nhớ luật.",
    nguongGiay: 40,
  },
  {
    id: 'bo-ngu-treo',
    mienId: 'conventions',
    ten: 'Bổ ngữ treo đầu câu',
    docVi: 'Câu mở đầu bằng một cụm phân từ rồi dấu phẩy, và bốn đáp án là bốn chủ ngữ khác nhau cho mệnh đề chính.',
    phuongPhap:
      'Danh từ ngay sau dấu phẩy phải là thứ THỰC HIỆN hành động trong cụm mở đầu. Đây là luật cứng, không có ngoại lệ.',
    buocGiai: [
      'Đọc cụm mở đầu và hỏi: ai hoặc cái gì đang làm việc này?',
      'Nhìn danh từ đứng ngay sau dấu phẩy.',
      'Hai thứ đó phải là một. Không phải một thì đáp án sai.',
      'Chọn đáp án đặt đúng chủ thể ngay sau dấu phẩy.',
    ],
    bay:
      'Đáp án sai thường nghe rất xuôi vì người đọc tự hiểu ngầm chủ thể. Nhưng SAT chấm theo luật chứ không theo cái người đọc tự hiểu.',
    biKip: 'Ai làm việc ở cụm đầu thì người đó đứng ngay sau dấu phẩy. Không có ngoại lệ nào.',
    nguongGiay: 50,
  },
  {
    id: 'ham-bac-nhat',
    mienId: 'algebra',
    ten: 'Hàm bậc nhất — hệ số góc và ý nghĩa thực tế',
    docVi: 'Đề cho một mô hình dạng y = mx + b rồi hỏi ý nghĩa của m hoặc của b trong bối cảnh bài toán.',
    phuongPhap:
      'Dịch hệ số ra tiếng Việt kèm ĐƠN VỊ: m là thay đổi của y trên mỗi một đơn vị x, b là giá trị của y khi x bằng không.',
    buocGiai: [
      'Ghi rõ x là gì kèm đơn vị, y là gì kèm đơn vị.',
      'Đọc m thành câu: mỗi khi x tăng một đơn vị thì y thay đổi bấy nhiêu.',
      'Đọc b thành câu: khi x bằng không thì y bằng bấy nhiêu.',
      'Đối chiếu bốn đáp án với hai câu vừa viết, loại cái đảo vai m và b.',
    ],
    bay:
      'Đáp án đảo vai hệ số góc và tung độ gốc. Cả hai đều là câu đúng ngữ pháp và đều nhắc đúng con số, nên chỉ phân biệt được nếu đã viết thành câu trước.',
    biKip: 'Viết m và b thành câu tiếng Việt có đơn vị. Viết xong thì đáp án tự lộ.',
    nguongGiay: 70,
  },
  {
    id: 'loi-van-dung-pt',
    mienId: 'algebra',
    ten: 'Dựng phương trình từ bài toán lời văn',
    docVi: 'Một đoạn mô tả tình huống thực tế, đề hỏi phương trình nào mô tả đúng tình huống đó.',
    phuongPhap:
      'Đặt tên biến kèm đơn vị trước tiên, rồi dịch từng mệnh đề của lời văn thành một dòng toán. Dịch từng mệnh đề chứ không dịch cả đoạn một lần.',
    buocGiai: [
      'Đặt biến và ghi rõ đơn vị của mỗi biến ra nháp.',
      'Chia lời văn thành từng mệnh đề có chứa quan hệ số lượng.',
      'Dịch mỗi mệnh đề thành một dòng toán riêng.',
      'Thử một giá trị dễ vào phương trình đã dựng để kiểm tra nó khớp lời văn.',
    ],
    bay:
      'Nhầm chiều của "nhiều hơn" và "gấp bao nhiêu lần". Thử một con số cụ thể là cách nhanh nhất phát hiện chiều sai.',
    biKip: 'Dựng xong thì thử một số dễ. Ba mươi giây kiểm tra rẻ hơn một câu sai.',
    nguongGiay: 85,
  },
  {
    id: 'da-thuc-nghiem',
    mienId: 'advanced',
    ten: 'Đa thức, nghiệm và nhân tử',
    docVi: 'Đề cho một đa thức bậc ba trở lên, hoặc nói một giá trị là nghiệm, hoặc hỏi về nhân tử.',
    phuongPhap:
      'Dùng quan hệ nghiệm và nhân tử theo cả hai chiều: r là nghiệm khi và chỉ khi (x − r) là nhân tử. Phần lớn câu của dạng chỉ cần đúng quan hệ này.',
    buocGiai: [
      'Đọc kỹ đề cho biết nghiệm hay cho biết nhân tử — hai thứ này chuyển đổi được cho nhau.',
      'Nếu đề cho một điểm thuộc đồ thị thì thay toạ độ vào để tìm hệ số chưa biết.',
      'Vẽ bằng Desmos để đếm số giao điểm với trục hoành khi đề hỏi số nghiệm thực.',
      'Trả lời đúng thứ đề hỏi: nghiệm, nhân tử, hay số lượng nghiệm.',
    ],
    bay:
      'Nhầm dấu khi chuyển giữa nghiệm và nhân tử: nghiệm 3 tương ứng nhân tử (x − 3) chứ không phải (x + 3).',
    biKip: 'Nghiệm r đi với nhân tử (x trừ r). Viết dấu trừ ra nháp mỗi lần chuyển đổi.',
    nguongGiay: 90,
  },
  {
    id: 'ky-hieu-ham',
    mienId: 'advanced',
    ten: 'Ký hiệu hàm số và hàm hợp',
    docVi: 'Xuất hiện f(x), g(x), hoặc f(g(2)), hoặc đề cho bảng giá trị của một hàm.',
    phuongPhap:
      'Đọc f(a) là "thay a vào chỗ x". Với hàm hợp thì làm từ trong ra ngoài, và viết kết quả trung gian ra nháp thay vì giữ trong đầu.',
    buocGiai: [
      'Xác định hàm nào là hàm trong, hàm nào là hàm ngoài.',
      'Tính hàm trong trước, ghi kết quả ra nháp.',
      'Lấy kết quả đó thay vào hàm ngoài.',
      'Với bảng giá trị: tra bảng theo đúng cột, đừng tra nhầm chiều.',
    ],
    bay:
      'Làm từ ngoài vào trong. Thứ tự ngược lại cho ra một con số cũng có trong bốn đáp án, nên sai mà không thấy vô lý.',
    biKip: 'Trong trước, ngoài sau. Ghi kết quả trung gian ra giấy chứ đừng nhẩm.',
    nguongGiay: 75,
  },
  {
    id: 'trung-binh-trung-vi',
    mienId: 'data',
    ten: 'Trung bình, trung vị và ảnh hưởng của giá trị lạ',
    docVi: 'Đề cho một dãy số hoặc một bảng tần số rồi hỏi về mean, median, hoặc hỏi điều gì xảy ra khi thêm bớt một giá trị.',
    phuongPhap:
      'Trung vị chỉ phụ thuộc vị trí giữa, trung bình phụ thuộc mọi giá trị. Nhớ đúng khác biệt đó là trả lời được cả nhóm câu về giá trị lạ.',
    buocGiai: [
      'Sắp xếp dãy theo thứ tự tăng dần trước khi làm bất cứ gì.',
      'Với trung vị: đếm vị trí giữa, dãy chẵn phần tử thì lấy trung bình hai số giữa.',
      'Với trung bình: cộng tất cả rồi chia số phần tử, chú ý bảng tần số phải nhân trọng số.',
      'Với câu thêm bớt giá trị: hỏi giá trị mới nằm trong hay ngoài khoảng hiện có.',
    ],
    bay:
      'Quên nhân tần số khi đọc bảng. Bảng tần số nhìn giống danh sách nhưng mỗi dòng đại diện nhiều giá trị.',
    biKip: 'Sắp xếp trước đã. Một dãy chưa sắp xếp thì mọi câu về trung vị đều sai.',
    nguongGiay: 70,
  },
  {
    id: 'bang-hai-chieu',
    mienId: 'data',
    ten: 'Xác suất từ bảng hai chiều',
    docVi: 'Một bảng có cả hàng tổng và cột tổng, đề hỏi xác suất hoặc tỉ lệ của một nhóm con.',
    phuongPhap:
      'Xác định MẪU SỐ trước tử số. Toàn bộ độ khó của dạng nằm ở chỗ đề giới hạn mẫu số vào một hàng hay một cột chứ không phải toàn bảng.',
    buocGiai: [
      'Đọc kỹ câu hỏi tìm cụm giới hạn: "among those who…", "of the students who…".',
      'Cụm đó quyết định mẫu số là tổng hàng, tổng cột, hay tổng toàn bảng.',
      'Khoanh ô tử số trong bảng.',
      'Lập phân số rồi đổi ra dạng đề hỏi: phân số, phần trăm, hay số thập phân.',
    ],
    bay:
      'Lấy tổng toàn bảng làm mẫu số trong khi đề đã giới hạn vào một nhóm. Đáp án cho người lấy nhầm mẫu số luôn có sẵn.',
    biKip: 'Mẫu số trước, tử số sau. Cụm "among those" là chỗ đề đổi mẫu số.',
    nguongGiay: 70,
  },
  {
    id: 'phan-tram-thay-doi',
    mienId: 'data',
    ten: 'Phần trăm thay đổi và phần trăm của phần trăm',
    docVi: 'Đề nói tăng rồi lại giảm, hoặc hỏi phần trăm thay đổi giữa hai giá trị.',
    phuongPhap:
      'Phần trăm thay đổi luôn tính trên giá trị GỐC, và gốc đổi sau mỗi bước. Chọn một con số cụ thể như 100 để tính thay vì làm bằng chữ.',
    buocGiai: [
      'Đặt giá trị ban đầu bằng 100 cho dễ tính.',
      'Áp dụng từng thay đổi theo đúng thứ tự đề nêu, tính lại giá trị sau mỗi bước.',
      'So giá trị cuối với giá trị ban đầu.',
      'Đổi chênh lệch ra phần trăm trên giá trị GỐC ban đầu.',
    ],
    bay:
      'Tăng 20% rồi giảm 20% KHÔNG trở về chỗ cũ, vì lần giảm tính trên gốc đã lớn hơn. Đáp án "không đổi" luôn có sẵn cho người cộng trừ phần trăm.',
    biKip: 'Đặt gốc bằng 100 rồi tính từng bước. Phần trăm không cộng trừ được với nhau.',
    nguongGiay: 70,
  },
  {
    id: 'luong-giac-vuong',
    mienId: 'geo',
    ten: 'Lượng giác trong tam giác vuông',
    docVi: 'Có tam giác vuông kèm sin, cos, tan, hoặc đề cho một tỉ số và hỏi tỉ số khác.',
    phuongPhap:
      'Vẽ lại tam giác và ghi tên ba cạnh theo góc đang xét: đối, kề, huyền. Ghi tên trước thì mọi tỉ số đọc thẳng ra được.',
    buocGiai: [
      'Vẽ tam giác ra nháp, đánh dấu góc vuông và góc đang xét.',
      'Ghi nhãn ba cạnh: đối, kề, huyền — theo đúng góc đang xét.',
      'Viết tỉ số cần tìm theo ba nhãn đó.',
      'Với hai góc phụ nhau: sin của góc này bằng cos của góc kia.',
    ],
    bay:
      'Đổi góc xét mà quên đổi nhãn cạnh. Cạnh đối của góc này là cạnh kề của góc kia, nên nhãn phải vẽ lại mỗi lần đổi góc.',
    biKip: 'Ghi nhãn đối và kề theo đúng góc đang xét, mỗi lần đổi góc thì ghi lại.',
    nguongGiay: 80,
  },
  {
    id: 'the-tich',
    mienId: 'geo',
    ten: 'Diện tích, thể tích và tỉ lệ đồng dạng',
    docVi: 'Đề cho khối hộp, hình trụ, hình nón, hình cầu, hoặc hỏi thể tích đổi thế nào khi kích thước nhân lên.',
    phuongPhap:
      'Công thức thể tích được cho sẵn ở đầu phần thi, nên đừng học thuộc — hãy nhớ luật TỈ LỆ: nhân kích thước lên k lần thì diện tích nhân k², thể tích nhân k³.',
    buocGiai: [
      'Xác định khối và tra công thức trong bảng cho sẵn của đề.',
      'Kiểm tra mọi kích thước đã cùng một đơn vị chưa.',
      'Với câu về tỉ lệ: dùng luật k², k³ thay vì tính hai thể tích rồi chia.',
      'Đối chiếu đơn vị kết quả với đơn vị đề hỏi.',
    ],
    bay:
      'Nhân đôi bán kính thì thể tích gấp tám lần chứ không gấp đôi. Đáp án "gấp đôi" luôn nằm sẵn trong bốn lựa chọn.',
    biKip: 'Kích thước gấp k thì thể tích gấp k mũ ba. Nhớ luật này thay vì nhớ công thức.',
    nguongGiay: 80,
  },
];

export const dangCuaMien = (mienId: string) => DANG_SAT.filter((d) => d.mienId === mienId);

/* ==========================================================================
   LỊCH THI — PHẦN ĐỔI THEO NĂM, PHẢI SOÁT LẠI HẰNG NĂM
   ========================================================================== */

export interface KyThiSat {
  ngayThi: string;
  hanDangKy: string;
  ghiChu?: string;
}

/*
 * Lịch năm học 2026–2027 theo công bố của College Board. Mọi ngày đều là
 * thứ Bảy. Hạn đăng ký thường trước ngày thi khoảng ba tuần, và hết hạn
 * lúc 23:59 giờ miền Đông nước Mỹ — không phải giờ Việt Nam. Chênh lệch
 * múi giờ đã làm nhiều người trượt hạn đúng vào ngày cuối.
 */
export const LICH_SAT: KyThiSat[] = [
  {ngayThi: '2026-08-22', hanDangKy: '2026-08-07'},
  {ngayThi: '2026-09-12', hanDangKy: '2026-08-28'},
  {ngayThi: '2026-10-03', hanDangKy: '2026-09-18'},
  {ngayThi: '2026-11-07', hanDangKy: '2026-10-23'},
  {ngayThi: '2026-12-05', hanDangKy: '2026-11-20'},
  {ngayThi: '2027-03-06', hanDangKy: '2027-02-19'},
  {ngayThi: '2027-05-01', hanDangKy: '2027-04-16'},
  {ngayThi: '2027-06-05', hanDangKy: '2027-05-21'},
];

export const LE_PHI = {
  coBan: 68,
  phuThuNgoaiMy: 43,
  get tongNgoaiMy() {
    return this.coBan + this.phuThuNgoaiMy;
  },
  tienTe: 'USD',
  ghiChu:
    'Thí sinh thi ngoài nước Mỹ trả lệ phí cơ bản cộng phụ thu khu vực. Đổi hạn đăng ký muộn còn thêm phí nữa, nên đăng ký sớm rẻ hơn thật, không phải lời khuyên suông.',
};

/**
 * Kỳ thi gần nhất còn kịp đăng ký, tính từ một mốc thời gian cho trước.
 * Nhận mốc từ ngoài chứ không tự gọi Date.now(), để hàm thuần và kiểm được.
 */
export function kyThiKeTiep(homNay: string): KyThiSat | null {
  return LICH_SAT.find((k) => k.hanDangKy >= homNay) ?? null;
}

/** Mọi kỳ đã qua hạn đăng ký tính tới mốc cho trước. */
export function kyThiDaQua(homNay: string): KyThiSat[] {
  return LICH_SAT.filter((k) => k.hanDangKy < homNay);
}

/* ==========================================================================
   TỪ ĐIỂM MỤC TIÊU RA YÊU CẦU LÀM BÀI

   NÓI THẲNG VỀ GIỚI HẠN CỦA PHẦN NÀY
     College Board KHÔNG công bố bảng quy đổi từ số câu đúng ra điểm, và
     bảng đó còn thay đổi theo từng đề vì bài thi thích ứng. Nên mọi con số
     "cần đúng bao nhiêu câu" trên mạng đều là ước lượng, kể cả con số ở
     đây.
     Cái CHẮC CHẮN đúng và dùng được: mô-đun 1 quyết định trần điểm. Nên
     ngưỡng dưới đây phát biểu theo ĐỘ CHÍNH XÁC Ở MÔ-ĐUN 1, là thứ học
     viên kiểm soát được, thay vì theo tổng số câu đúng.
   ========================================================================== */

export interface MucTieuSat {
  diem: number;
  ten: string;
  chinhXacModun1: string;
  nghiaLa: string;
  danhCho: string;
}

export const MUC_TIEU_SAT: MucTieuSat[] = [
  {
    diem: 1200,
    ten: 'Ngưỡng nộp hồ sơ được',
    chinhXacModun1: 'đúng khoảng 70% mô-đun 1 của cả hai phần',
    nghiaLa: 'Sai không quá 8 trong 27 câu đọc–viết và không quá 6 trong 22 câu toán ở mô-đun 1.',
    danhCho: 'Trường công bang, và phần lớn trường xét hồ sơ toàn diện.',
  },
  {
    diem: 1400,
    ten: 'Ngưỡng cạnh tranh',
    chinhXacModun1: 'đúng khoảng 85% mô-đun 1 của cả hai phần',
    nghiaLa: 'Sai không quá 4 trong 27 câu đọc–viết và không quá 3 trong 22 câu toán ở mô-đun 1.',
    danhCho: 'Trường tốp giữa và tốp trên, và phần lớn học bổng theo thành tích.',
  },
  {
    diem: 1500,
    ten: 'Ngưỡng trường tốp đầu',
    chinhXacModun1: 'gần như tuyệt đối ở mô-đun 1, và sai rất ít ở mô-đun 2 nhánh khó',
    nghiaLa: 'Sai không quá 2 câu ở mỗi mô-đun 1. Ở mức này, lỗi bất cẩn tốn điểm nhiều hơn lỗi kiến thức.',
    danhCho: 'Nhóm trường tuyển chọn cao. Từ mức này trở lên, điểm không còn là thứ phân biệt hồ sơ.',
  },
];

/* ==========================================================================
   LỘ TRÌNH SAT GẮN VÀO HỆ NĂM TẦNG CỦA ENGWIN365

   Không dựng một lộ trình riêng song song. Học viên đã ở tầng nào của hệ
   thống thì vào SAT ở đúng chỗ tương ứng — dựng lộ trình thứ hai là bắt
   người ta học lại từ đầu những thứ đã biết.
   ========================================================================== */

export interface ChangSat {
  tang: number;
  ten: string;
  vaoKhiNao: string;
  lam: string[];
  raKhiNao: string;
  tuan: number;
}

export const LO_TRINH_SAT: ChangSat[] = [
  {
    tang: 3,
    ten: 'Đặt nền — đọc được đề',
    vaoKhiNao:
      'Đọc hiểu đã ở mức tự đọc được một đoạn 150 chữ về chủ đề lạ mà không tra quá năm từ. Dưới mức đó thì luyện SAT là phí giờ: bài thi đo tốc độ xử lý, không đo vốn từ.',
    lam: [
      'Học 4 miền của phần đọc–viết bằng tên gọi của chúng, để đọc được bảng kết quả sau này.',
      'Làm riêng miền Quy tắc tiếng Anh chuẩn tới khi đúng trên 80% — đây là miền học bằng luật nên lên nhanh nhất.',
      'Ôn lại toán bằng tiếng Anh: đọc đề toán bằng tiếng Anh là kỹ năng riêng, không tự có dù giỏi toán.',
      'Làm quen Desmos: 30 phút mỗi tuần, đủ 6 tuần.',
    ],
    raKhiNao: 'Đúng trên 80% miền Quy tắc, và đọc trôi một đoạn đề mẫu trong dưới 90 giây.',
    tuan: 8,
  },
  {
    tang: 4,
    ten: 'Dựng phương pháp — từng dạng một',
    vaoKhiNao: 'Đã qua chặng nền và biết gọi tên 8 miền.',
    lam: [
      'Mỗi tuần một dạng bài trong bảng dạng: đọc vị, phương pháp, bước giải, bẫy.',
      'Làm chậm có ghi lý do chọn — chưa tính giờ. Bấm giờ trước khi có quy trình là tự dạy mình đoán bừa.',
      'Ghi sổ lỗi theo MIỀN chứ không theo câu, để thấy miền nào đang rò.',
      'Cuối chặng: một mô-đun đơn có tính giờ mỗi tuần.',
    ],
    raKhiNao: 'Mỗi dạng trong bảng đều nói ra được đọc vị và bước giải mà không nhìn tài liệu.',
    tuan: 12,
  },
  {
    tang: 5,
    ten: 'Vào nhịp thi — mô-đun 1 là ưu tiên tuyệt đối',
    vaoKhiNao: 'Đã có quy trình cho mọi dạng.',
    lam: [
      'Mỗi tuần một bài đầy đủ đúng nhịp thi thật, kể cả nghỉ giữa giờ 10 phút.',
      'Sau mỗi bài: chữa mô-đun 1 TRƯỚC và kỹ hơn mô-đun 2, vì mô-đun 1 quyết định trần điểm.',
      'Luyện ngưỡng giây: quá ngưỡng của dạng thì đánh dấu và đi tiếp, không cố.',
      'Quy tắc không ô trống: 60 giây cuối mỗi mô-đun dành để khoanh hết ô còn trống.',
    ],
    raKhiNao: 'Ba bài liên tiếp đạt độ chính xác mục tiêu ở mô-đun 1 mà không vượt giờ.',
    tuan: 10,
  },
];

export const TONG_TUAN_SAT = LO_TRINH_SAT.reduce((s, c) => s + c.tuan, 0);

/* ==========================================================================
   BA TUYẾN — CHỌN SAI THÌ MẤT HÀNG TRĂM GIỜ

   Hệ thống trước đây có hai tuyến: IELTS và chuyên Anh. SAT là tuyến thứ
   ba, và nó KHÔNG thay thế được tuyến nào. Bảng này để chọn, không phải
   để giới thiệu.
   ========================================================================== */

export const BA_TUYEN = [
  {
    tuyen: 'IELTS',
    doGi: 'Năng lực dùng tiếng Anh thật: nghe, nói, đọc, viết.',
    coToan: false,
    chamNguoi: true,
    dungDe: 'Du học Anh, Úc, Canada; định cư; xét tuyển đại học trong nước; miễn thi tốt nghiệp.',
    hopVoi: 'Người cần chứng minh dùng được tiếng Anh, và người cần một chứng chỉ dùng được nhiều việc.',
  },
  {
    tuyen: 'Chuyên Anh vào 10',
    doGi: 'Độ sâu ngữ pháp và từ vựng ở mức thi tuyển chọn, trong một kỳ thi lấy điểm từ cao xuống.',
    coToan: false,
    chamNguoi: true,
    dungDe: 'Vào lớp chuyên Anh cấp ba.',
    hopVoi: 'Học sinh lớp 9 có đích rõ và còn đủ thời gian.',
  },
  {
    tuyen: 'SAT',
    doGi: 'Suy luận trên văn bản và toán, dưới sức ép thời gian, chấm bằng máy.',
    coToan: true,
    chamNguoi: false,
    dungDe: 'Du học Mỹ, và một số trường trong nước có xét chứng chỉ quốc tế.',
    hopVoi: 'Người nhắm Mỹ, và người mạnh toán — vì toán chiếm đúng một nửa điểm.',
  },
];

export const CHON_TUYEN = {
  quyTac:
    'Chọn theo ĐÍCH, không chọn theo cái mình thích học. Nhắm Mỹ thì SAT là bắt buộc ở phần lớn trường tuyển chọn cao; nhắm Anh–Úc–Canada thì IELTS; nhắm lớp 10 chuyên thì tuyến chuyên.',
  hocDuocCaHai:
    'IELTS và SAT chồng nhau ở phần đọc, nhưng KHÔNG chồng ở phần còn lại: SAT không có nói và viết, IELTS không có toán. Học song song hai tuyến chỉ hợp lý khi đã qua tầng 4 ở ít nhất một tuyến.',
  canhBao:
    'Người mạnh tiếng Anh thường đánh giá thấp nửa toán của SAT vì đề toán ở mức lớp 10–11. Nhưng đề toán ra bằng TIẾNG ANH và tính giờ theo giây, nên "biết làm" không đủ — phải làm được trong 95 giây một câu.',
};

/* ==========================================================================
   CON SỐ CỦA TẦNG — TÍNH RA, KHÔNG GÕ TAY
   ========================================================================== */
export const SAT_SO = {
  soModun: MODUN.length,
  tongCau: SAT_SPEC.tongCau,
  tongPhutLamBai: SAT_SPEC.tongPhutLamBai,
  soMien: MIEN.length,
  soDang: DANG_SAT.length,
  soKyThi: LICH_SAT.length,
  soChang: LO_TRINH_SAT.length,
  tongTuan: TONG_TUAN_SAT,
  soMucTieu: MUC_TIEU_SAT.length,
  tongBuocGiai: DANG_SAT.reduce((s, d) => s + d.buocGiai.length, 0),
};
