/**
 * BẢN ĐỒ NGUỒN THAM KHẢO VÀ PHÂN TÍCH KHOẢNG TRỐNG
 *
 * Tệp này ghi lại kết quả khảo sát bối cảnh tài liệu Toán phổ thông Việt Nam,
 * phục vụ việc biên soạn nội dung MATH365.
 *
 * Ba nguyên tắc bắt buộc khi dùng tệp này:
 *
 *   1. KHÔNG SAO CHÉP. Khảo sát để biết thị trường đã phủ gì, tổ chức nội dung
 *      ra sao và người học đang tìm gì — không phải để lấy bài của người khác.
 *      Mọi đề, lời giải, bảng phân tích trong MATH365 đều là nội dung tự biên
 *      soạn hoặc sinh tự động từ bộ sinh đề tham số hoá.
 *
 *   2. GHI RÕ MỨC ĐỘ TIN CẬY. Mỗi mục ghi rõ đã kiểm chứng tới đâu. Thông tin
 *      tuyển sinh thay đổi theo năm, nên phần nào chưa đối chiếu được với công
 *      bố chính thức thì phải nói rõ là chưa.
 *
 *   3. GHI CẢ ĐIỀU KHÔNG LÀM ĐƯỢC. Nguồn nào không truy cập được thì ghi lại lí
 *      do, thay vì im lặng bỏ qua và để người đọc tưởng đã khảo sát đủ.
 */

export type SourceKind = 'kho-tai-lieu' | 'nen-tang-hoc' | 'cong-dong' | 'chinh-thuc';
export type AccessState = 'da-khao-sat' | 'khao-sat-gian-tiep' | 'khong-truy-cap-duoc';

export interface ReferenceSource {
  name: string;
  url: string;
  kind: SourceKind;
  access: AccessState;
  /** Nguồn này là gì và phục vụ ai. */
  what: string;
  /** Nội dung họ phủ — dùng để đối chiếu độ phủ của MATH365. */
  covers: string[];
  /** Điều MATH365 rút ra được, ở mức cấu trúc và độ phủ, không phải nội dung. */
  learned: string[];
  /** Ghi chú trung thực về giới hạn của lần khảo sát này. */
  caveat?: string;
}

export const REFERENCE_SOURCES: ReferenceSource[] = [
  {
    name: 'THCS.TOANMATH.com',
    url: 'https://thcs.toanmath.com/',
    kind: 'kho-tai-lieu',
    access: 'khao-sat-gian-tiep',
    what: 'Kho tài liệu Toán trung học lớn nhất Việt Nam theo dạng tệp tải về: chuyên đề, đề thi tuyển sinh, đề học sinh giỏi, đề khảo sát chất lượng.',
    covers: [
      'Bộ 13 chuyên đề ôn thi tuyển sinh lớp 10 môn Toán, khoảng 685 trang, có lời giải chi tiết.',
      'Đề thi tuyển sinh lớp 10 và đề tham khảo của các Sở GD&ĐT theo từng năm.',
      'Đề thi học sinh giỏi Toán 9 và đề thi vào lớp 10 chuyên Toán các tỉnh.',
      'Đề khảo sát chất lượng Toán 9 của các phòng và trường.',
    ],
    learned: [
      'Danh sách 13 chuyên đề của họ là chuẩn tham chiếu thực tế của thị trường — MATH365 nên phủ đủ 13 chuyên đề đó, rồi mới nói tới phần nâng cao.',
      'Đối chiếu cho thấy MATH365 còn thiếu ba chuyên đề: hệ thức lượng trong tam giác vuông và tỉ số lượng giác, Viète với biểu thức không đối xứng, và bài toán thực tế liên quan cực trị.',
      'Điểm mạnh của họ là độ phủ tệp tải về; điểm yếu là không có chấm bài, không có chẩn đoán lỗi, không có lộ trình cá nhân hoá. Đây đúng là chỗ MATH365 khác biệt.',
    ],
    caveat:
      'Tên miền bị chặn ở tầng mạng của môi trường làm việc nên không mở trực tiếp được; thông tin lấy qua kết quả tìm kiếm và mô tả của chính trang. Cần mở trực tiếp để đối chiếu lại danh sách chuyên đề trước khi coi là chốt.',
  },
  {
    name: 'MathX.vn',
    url: 'https://mathx.vn/',
    kind: 'nen-tang-hoc',
    access: 'khao-sat-gian-tiep',
    what: 'Nền tảng học Toán trực tuyến, mạnh nhất ở mảng tiểu học và ôn thi vào lớp 6 trường chất lượng cao.',
    covers: [
      'Hướng dẫn giải và phân tích đề thi vào lớp 6 của từng trường theo từng năm.',
      'Thông tin tuyển sinh lớp 6 các trường chất lượng cao Hà Nội.',
      'Chuyên đề Toán tiểu học và Toán tư duy.',
    ],
    learned: [
      'Họ phân tích đề theo từng trường, từng năm — đây là mô hình nội dung có giá trị tìm kiếm rất cao mà MATH365 đã làm tương tự với trang Cấu trúc đề thi.',
      'Mảng thi vào lớp 6 là một thị trường riêng, có hệ thống trường và định dạng thi riêng, không phải phần mở rộng của Toán trung học.',
      'Đây là nguồn xác nhận khoảng trống lớn nhất của MATH365: chưa có luồng nào cho thi vào lớp 6.',
    ],
    caveat: 'Tên miền bị chặn ở tầng mạng; thông tin lấy qua kết quả tìm kiếm.',
  },
  {
    name: 'HOCMAI.vn',
    url: 'https://hocmai.vn/',
    kind: 'nen-tang-hoc',
    access: 'khao-sat-gian-tiep',
    what: 'Nền tảng học trực tuyến lâu năm, phủ nhiều môn và nhiều khối lớp, mô hình khoá học có giáo viên giảng.',
    covers: [
      'Khoá học theo khối lớp từ tiểu học tới lớp 12.',
      'Khoá ôn thi vào 10 và ôn thi tốt nghiệp trung học phổ thông.',
      'Bài giảng video kèm hệ thống bài tập.',
    ],
    learned: [
      'Mô hình của họ là bài giảng video theo khoá; MATH365 đi hướng khác là phiếu luyện có chấm và chẩn đoán. Hai mô hình bổ sung nhau chứ không thay thế nhau.',
      'Việc họ phủ từ tiểu học lên lớp 12 cho thấy nhu cầu liền mạch theo cả hành trình học, không đứt đoạn ở từng kỳ thi.',
    ],
    caveat: 'Tên miền bị chặn ở tầng mạng; thông tin lấy qua kết quả tìm kiếm.',
  },
  {
    name: 'Nhóm Facebook ôn thi vào lớp 6',
    url: 'https://www.facebook.com/groups/onthivaolop6/',
    kind: 'cong-dong',
    access: 'khong-truy-cap-duoc',
    what: 'Cộng đồng phụ huynh và giáo viên trao đổi về kỳ thi vào lớp 6.',
    covers: [],
    learned: [
      'Không đọc được nội dung, nhưng chính tên nhóm là một tín hiệu đủ rõ: nhóm người dùng của GITA365 có mảng thi vào lớp 6, mà MATH365 chưa phục vụ.',
    ],
    caveat:
      'Facebook bị chặn ở tầng mạng và nhóm cũng yêu cầu đăng nhập. Không đọc được bài viết nào. Nội dung do thành viên đăng trong nhóm kín cũng không phải nguồn nên dùng lại cho sản phẩm thương mại nếu chưa có sự đồng ý của tác giả.',
  },
  {
    name: 'Nhóm Facebook ôn thi cấp 2 chất lượng cao',
    url: 'https://www.facebook.com/groups/onthicap2chatluongcao/',
    kind: 'cong-dong',
    access: 'khong-truy-cap-duoc',
    what: 'Cộng đồng về kỳ thi vào các trường trung học cơ sở chất lượng cao.',
    covers: [],
    learned: [
      'Xác nhận thêm nhóm người dùng thi vào lớp 6 trường chất lượng cao — cùng hướng với nhóm trên.',
    ],
    caveat: 'Facebook bị chặn ở tầng mạng; không đọc được nội dung.',
  },
  {
    name: 'Ba nhóm Facebook còn lại',
    url: 'https://www.facebook.com/groups/730597382479194/',
    kind: 'cong-dong',
    access: 'khong-truy-cap-duoc',
    what: 'Ba nhóm được cung cấp dưới dạng mã số, chưa xác định được chủ đề.',
    covers: [],
    learned: [
      'Chưa rút ra được gì. Cần anh cho biết tên nhóm hoặc chủ đề để đưa vào phân tích — mã số nhóm không nói lên nội dung.',
    ],
    caveat:
      'Facebook bị chặn ở tầng mạng. Ba nhóm này chỉ có mã số nên không suy ra được chủ đề như hai nhóm kia.',
  },
  {
    name: 'Trường THCS Ngoại ngữ — Đại học Ngoại ngữ, ĐHQG Hà Nội',
    url: 'https://ums.vnu.edu.vn/',
    kind: 'chinh-thuc',
    access: 'khao-sat-gian-tiep',
    what: 'Nguồn công bố chính thức về tuyển sinh lớp 6 và bài đánh giá năng lực tổng hợp học sinh tiểu học.',
    covers: [
      'Thông báo tuyển sinh lớp 6 theo từng năm học.',
      'Cấu trúc bài kiểm tra tuyển sinh.',
    ],
    learned: [
      'Từ năm học 2025–2026, trường xét tuyển dựa trên bài đánh giá năng lực tổng hợp học sinh tiểu học, thi trên máy, thang điểm 100, gồm ba phần: tiếng Anh, khoa học tự nhiên và Toán, khoa học xã hội và tiếng Việt.',
      'Toàn bộ câu hỏi là trắc nghiệm khách quan với nhiều dạng thức: nhiều lựa chọn, điền khuyết, sắp xếp trật tự, ghép nối.',
      'Thí sinh được dự thi nhiều đợt và chọn một kết quả để nộp xét tuyển — khác hẳn cơ chế thi một lần của kỳ thi vào 10.',
    ],
    caveat:
      'Trang chính thức bị chặn ở tầng mạng nên chưa mở được văn bản gốc; thông tin lấy qua kết quả tìm kiếm và báo chí. Phải đối chiếu với thông báo gốc trước mỗi mùa tuyển sinh.',
  },
  {
    name: 'Trường THPT chuyên Hà Nội – Amsterdam',
    url: 'https://hn-ams.edu.vn/',
    kind: 'chinh-thuc',
    access: 'khao-sat-gian-tiep',
    what: 'Nguồn công bố chính thức về tuyển sinh của trường.',
    covers: ['Thông báo tuyển sinh lớp 10 chuyên.'],
    learned: [
      'Đây là điểm cần đính chính so với hiểu biết phổ biến: từ năm học 2024–2025, trường ĐÃ DỪNG tuyển sinh lớp 6, do trường chuyên không được duy trì hệ trung học cơ sở và hệ không chuyên. Mọi nội dung nói về “thi vào 6 Ams” đều đã lỗi thời.',
      'Kỳ thi vào lớp 6 chất lượng cao ở Hà Nội hiện xoay quanh các trường khác: Cầu Giấy, Thanh Xuân, Ngoại ngữ, Nguyễn Tất Thành, Lương Thế Vinh và một số trường tư.',
    ],
    caveat: 'Cần đối chiếu lại với công bố của Sở GD&ĐT Hà Nội trước mỗi mùa tuyển sinh.',
  },
];

/* ============================================================
   PHÂN TÍCH KHOẢNG TRỐNG
   ============================================================ */

export type GapStatus = 'da-lap' | 'dang-lam' | 'chua-lam';

export interface ContentGap {
  title: string;
  /** Khoảng trống này được phát hiện từ đâu. */
  foundVia: string;
  /** Vì sao nó đáng lấp. */
  why: string;
  /** Việc cụ thể đã hoặc sẽ làm. */
  action: string;
  status: GapStatus;
  /** Mức độ ưu tiên, 1 là cao nhất. */
  priority: 1 | 2 | 3;
}

export const CONTENT_GAPS: ContentGap[] = [
  {
    title: 'Chưa có đăng nhập tài khoản và chưa kiểm soát được truy cập theo học phí',
    foundVia:
      'Rà soát chính hệ thống: ứng dụng chạy hoàn toàn trên trình duyệt, dữ liệu nằm trong localStorage của từng máy.',
    why: 'Bảng tám vai trò và mười sáu quyền hiện có chỉ định hình giao diện, không ngăn được ai: bất kỳ ai mở công cụ nhà phát triển đều tự đổi được vai trò. Ranh giới giữa học sinh ngoài và học viên đóng phí vì thế mới ở mức thiết kế. Đồng bộ tiến độ giữa nhiều thiết bị và luồng giáo viên giao bài — học sinh nộp — giáo viên nhận kết quả cũng cần cùng một hạ tầng.',
    action:
      'Đã viết đặc tả đầy đủ tại docs/DANG-NHAP-VA-PHAN-QUYEN.md (mô hình dữ liệu, danh sách API, bảng phân quyền, ba gói học) và dựng sẵn điểm cắm AccountProvider trong src/lib/account.ts để cắm backend vào là chạy. CHƯA có mã máy chủ — phần này nằm ngoài phạm vi một ứng dụng tĩnh và cần đội kỹ thuật dựng riêng.',
    status: 'dang-lam',
    priority: 1,
  },
  {
    title: 'Chưa có luồng Toán thi vào lớp 6 trường chất lượng cao',
    foundVia:
      'Tên hai nhóm cộng đồng được cung cấp (ôn thi vào lớp 6, ôn thi cấp 2 chất lượng cao) và độ phủ của MathX ở mảng này.',
    why: 'Đây là một kỳ thi riêng với hệ thống trường riêng, định dạng đề riêng và nhóm người học riêng — không phải phần mở rộng của Toán trung học. Nhóm người dùng của GITA365 đang có nhu cầu này mà MATH365 chưa phục vụ.',
    action:
      'Đã bổ sung Luồng 4: 8 chuyên đề Toán tiểu học nâng cao, 17 bộ sinh đề, 400 phiếu luyện, 2 trường, 3 nhóm học sinh, 4 giai đoạn, 2 ma trận đề đánh giá năng lực và 2 đề mẫu trọn vẹn (31 câu) kèm lời giải, barem và bảng phân tích. Còn thiếu: bộ đề theo từng trường cụ thể và tài liệu dành riêng cho phụ huynh.',
    status: 'dang-lam',
    priority: 1,
  },
  {
    title: 'Thiếu chuyên đề hệ thức lượng trong tam giác vuông và tỉ số lượng giác',
    foundVia: 'Đối chiếu với bộ 13 chuyên đề chuẩn của THCS.TOANMATH.',
    why: 'Đây là chuyên đề số 7 trong bộ chuẩn, xuất hiện đều trong đề vào 10 dưới dạng bài toán thực tế đo đạc: tính chiều cao, góc nâng, khoảng cách. MATH365 chỉ có công thức trong sổ tay chứ chưa có bộ phiếu riêng.',
    action: 'Bổ sung chuyên đề với bộ sinh đề và hồ sơ phân tích chuyên sâu.',
    status: 'da-lap',
    priority: 1,
  },
  {
    title: 'Thiếu dạng Viète với biểu thức không đối xứng',
    foundVia: 'Đối chiếu với bộ 13 chuyên đề chuẩn của THCS.TOANMATH (chuyên đề số 3).',
    why: 'Hệ thức đối xứng xử lý được bằng tổng và tích. Hệ thức không đối xứng cần kỹ thuật khác hẳn: dùng phương trình nghiệm để hạ bậc, hoặc kết hợp Viète với chính phương trình. Đây là chỗ phân hoá thật trong đề vào 10.',
    action: 'Bổ sung chuyên đề riêng với bộ sinh đề và hồ sơ phân tích.',
    status: 'da-lap',
    priority: 1,
  },
  {
    title: 'Thiếu bài toán thực tế liên quan cực trị',
    foundVia: 'Đối chiếu với bộ 13 chuyên đề chuẩn của THCS.TOANMATH (chuyên đề số 13).',
    why: 'Chương trình giáo dục phổ thông 2018 tăng mạnh tỉ trọng toán thực tế. Dạng tối ưu hoá trong tình huống thực tế đang xuất hiện nhiều hơn trong đề.',
    action: 'Bổ sung chuyên đề với bộ sinh đề và hồ sơ phân tích.',
    status: 'da-lap',
    priority: 1,
  },
  {
    title: 'Chưa có nội dung ôn thi học sinh giỏi Toán 9',
    foundVia: 'Độ phủ của THCS.TOANMATH ở mảng đề học sinh giỏi.',
    why: 'Nhóm học sinh đội tuyển đã có vai trò riêng trong hệ thống phân quyền nhưng chưa có nội dung riêng. Đề học sinh giỏi khác đề chuyên về cả cấu trúc lẫn trọng tâm.',
    action: 'Bổ sung ma trận đề học sinh giỏi cấp quận, huyện, thành phố và bộ phiếu tương ứng.',
    status: 'chua-lam',
    priority: 2,
  },
  {
    title: 'Chưa có đề tuyển sinh lớp 10 của các tỉnh ngoài Hà Nội',
    foundVia: 'Độ phủ của THCS.TOANMATH theo từng Sở GD&ĐT.',
    why: 'MATH365 hiện chỉ phủ Hà Nội. Cấu trúc đề của Thành phố Hồ Chí Minh và nhiều tỉnh khác biệt đáng kể, đặc biệt ở tỉ trọng toán thực tế.',
    action: 'Bổ sung ma trận đề của một số Sở có cấu trúc khác biệt rõ, bắt đầu từ Thành phố Hồ Chí Minh.',
    status: 'chua-lam',
    priority: 3,
  },
];

export const sourceStats = () => ({
  total: REFERENCE_SOURCES.length,
  surveyed: REFERENCE_SOURCES.filter((s) => s.access !== 'khong-truy-cap-duoc').length,
  blocked: REFERENCE_SOURCES.filter((s) => s.access === 'khong-truy-cap-duoc').length,
  gaps: CONTENT_GAPS.length,
  gapsClosed: CONTENT_GAPS.filter((g) => g.status === 'da-lap').length,
});

export const ACCESS_LABEL: Record<AccessState, { label: string; color: string }> = {
  'da-khao-sat': { label: 'Đã khảo sát trực tiếp', color: '#0F766E' },
  'khao-sat-gian-tiep': { label: 'Khảo sát gián tiếp', color: '#F0A21B' },
  'khong-truy-cap-duoc': { label: 'Không truy cập được', color: '#E01B24' },
};

export const KIND_LABEL: Record<SourceKind, string> = {
  'kho-tai-lieu': 'Kho tài liệu',
  'nen-tang-hoc': 'Nền tảng học',
  'cong-dong': 'Cộng đồng',
  'chinh-thuc': 'Nguồn chính thức',
};

export const GAP_STATUS_LABEL: Record<GapStatus, { label: string; color: string }> = {
  'da-lap': { label: 'Đã lấp', color: '#0F766E' },
  'dang-lam': { label: 'Đang làm', color: '#F0A21B' },
  'chua-lam': { label: 'Chưa làm', color: '#94A3B8' },
};
