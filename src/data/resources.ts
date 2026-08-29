import type { Resource } from '@/types';

/**
 * Thư viện nguồn tài liệu. Với các nguồn chính thức, hãy luôn vào trang của trường/Sở
 * để lấy thông báo tuyển sinh và đề thi bản gốc của mùa thi hiện tại.
 */
export const RESOURCES: Resource[] = [
  /* --------- NGUỒN CHÍNH THỨC --------- */
  {
    id: 'r-hanoi-edu',
    title: 'Cổng thông tin Sở GD&ĐT Hà Nội',
    type: 'website',
    tracks: ['thpt', 'chuyen'],
    strands: [],
    level: 1,
    official: true,
    url: 'https://hanoi.edu.vn',
    description:
      'Nơi công bố kế hoạch tuyển sinh lớp 10, cấu trúc/định dạng đề thi, lịch thi, chỉ tiêu và điểm chuẩn hằng năm.',
    usage:
      'Kiểm tra mỗi mùa thi: (1) cấu trúc đề chính thức, (2) chỉ tiêu từng trường, (3) mốc thời gian đăng ký nguyện vọng. Mọi thông tin trong app cần được đối chiếu với nguồn này.',
  },
  {
    id: 'r-hus',
    title: 'THPT Chuyên Khoa học Tự nhiên – ĐHQGHN',
    type: 'website',
    tracks: ['chuyen'],
    strands: [],
    level: 1,
    official: true,
    url: 'https://hus.vnu.edu.vn',
    description: 'Thông báo tuyển sinh, đề thi và đáp án Toán vòng 1 – vòng 2 các năm.',
    usage: 'Tải đề gốc các năm để luyện đúng “gu”; đọc kỹ quy định về vòng 1 điều kiện.',
  },
  {
    id: 'r-ams',
    title: 'THPT Chuyên Hà Nội – Amsterdam',
    type: 'website',
    tracks: ['chuyen'],
    strands: [],
    level: 1,
    official: true,
    url: 'https://hn-ams.edu.vn',
    description: 'Thông tin tuyển sinh lớp 10 chuyên, điểm chuẩn các năm.',
    usage: 'Theo dõi điểm chuẩn chuyên Toán các năm để định lượng mục tiêu điểm số.',
  },
  {
    id: 'r-cva',
    title: 'THPT Chu Văn An',
    type: 'website',
    tracks: ['chuyen'],
    strands: [],
    level: 1,
    official: true,
    url: 'https://chuvanan.edu.vn',
    description: 'Thông tin tuyển sinh hệ chuyên và hệ không chuyên.',
    usage: 'Dùng để tính toán chiến lược nguyện vọng khi đặt Chu Văn An làm phương án an toàn.',
  },
  {
    id: 'r-ntt',
    title: 'THCS & THPT Nguyễn Tất Thành – ĐHSP Hà Nội',
    type: 'website',
    tracks: ['chuyen', 'thpt'],
    strands: [],
    level: 1,
    official: true,
    url: 'https://nguyentatthanh.edu.vn',
    description: 'Đề án tuyển sinh riêng, lịch thi và cấu trúc bài thi của trường.',
    usage: 'Xác nhận số môn thi và thời gian làm bài của mùa thi hiện tại trước khi lên lịch ôn.',
  },
  {
    id: 'r-hnue',
    title: 'THPT Chuyên ĐH Sư phạm Hà Nội',
    type: 'website',
    tracks: ['chuyen'],
    strands: [],
    level: 1,
    official: true,
    url: 'https://hnue.edu.vn',
    description: 'Thông báo tuyển sinh và đề thi các năm của khối chuyên Sư phạm.',
    usage: 'Lựa chọn song song với KHTN — phong cách đề gần nhau, ôn chung được phần lớn.',
  },

  /* --------- SÁCH & TÀI LIỆU LUỒNG THPT --------- */
  {
    id: 'r-sgk',
    title: 'SGK & SBT Toán 9 (bộ sách đang dùng)',
    type: 'sach',
    tracks: ['thpt', 'chuyen'],
    strands: ['dai-so', 'hinh-hoc', 'thuc-te'],
    level: 1,
    description:
      'Nền tảng gốc. Đề thi vào 10 bám chuẩn kiến thức – kỹ năng của chương trình, không vượt ngoài.',
    usage:
      'Làm hết bài tập SBT trước khi chuyển sang sách nâng cao. Nhóm Xây nền nên dành 100% giai đoạn 1 cho nguồn này.',
  },
  {
    id: 'r-de-cac-nam',
    title: 'Bộ đề thi tuyển sinh lớp 10 Hà Nội các năm',
    type: 'de-thi',
    tracks: ['thpt'],
    strands: ['dai-so', 'hinh-hoc', 'thuc-te', 'bat-dang-thuc'],
    level: 3,
    description:
      'Nguồn luyện tập giá trị nhất: cấu trúc lặp lại, độ khó chuẩn, có đáp án và barem chính thức.',
    usage:
      'Giai đoạn 4–5: mỗi tuần 1–2 đề, làm đúng 90 phút, chấm theo barem. Lập bảng theo dõi điểm từng bài để thấy xu hướng.',
  },
  {
    id: 'r-de-khao-sat',
    title: 'Đề khảo sát chất lượng của các quận/huyện Hà Nội',
    type: 'de-thi',
    tracks: ['thpt'],
    strands: ['dai-so', 'hinh-hoc', 'thuc-te'],
    level: 3,
    description:
      'Đề thi thử do phòng GD&ĐT các quận (Cầu Giấy, Ba Đình, Thanh Xuân, Hoàng Mai, Hai Bà Trưng…) tổ chức hằng năm.',
    usage:
      'Dùng bổ sung khi đã làm hết đề chính thức. Lưu ý: một số đề khó hơn đề thật, đừng hoang mang nếu điểm thấp hơn kỳ vọng.',
  },
  {
    id: 'r-chuyen-de-cuc-tri',
    title: 'Chuyên đề cực trị & bất đẳng thức cho lớp 9',
    type: 'chuyen-de',
    tracks: ['thpt', 'chuyen'],
    strands: ['bat-dang-thuc'],
    level: 4,
    description:
      'Tài liệu chuyên sâu về AM–GM, Cauchy–Schwarz, kỹ thuật chọn điểm rơi và các bài toán cực trị hình học.',
    usage:
      'Dành riêng cho nhóm Bứt phá 9–10 và các nhóm chuyên. Mục tiêu: xử lý gọn Bài V trong 8 phút.',
  },

  /* --------- SÁCH & TÀI LIỆU LUỒNG CHUYÊN --------- */
  {
    id: 'r-so-hoc',
    title: 'Tài liệu chuyên đề Số học THCS',
    type: 'chuyen-de',
    tracks: ['chuyen'],
    strands: ['so-hoc'],
    level: 4,
    description:
      'Hệ thống từ chia hết – đồng dư – số nguyên tố – số chính phương đến phương trình nghiệm nguyên.',
    usage:
      'Mạch quan trọng nhất của đề KHTN. Học theo thứ tự, mỗi chuyên đề làm tối thiểu 30 bài trước khi chuyển tiếp.',
  },
  {
    id: 'r-to-hop',
    title: 'Tài liệu chuyên đề Tổ hợp & Rời rạc THCS',
    type: 'chuyen-de',
    tracks: ['chuyen'],
    strands: ['to-hop'],
    level: 5,
    description:
      'Dirichlet, bất biến – đơn biến, cực hạn, tô màu, đếm bằng hai cách, trò chơi đối kháng.',
    usage:
      'Câu chốt của đề chuyên. Học ít mà kỹ: mỗi kỹ thuật làm 10 bài mẫu đến khi nhận dạng được ngay từ đề bài.',
  },
  {
    id: 'r-hinh-hoc-chuyen',
    title: 'Hình học phẳng cho học sinh chuyên Toán',
    type: 'sach',
    tracks: ['chuyen'],
    strands: ['hinh-hoc'],
    level: 5,
    description:
      'Phương tích, trục đẳng phương, các bổ đề kinh điển, kỹ thuật chứng minh thẳng hàng – đồng quy.',
    usage:
      'Học song song với việc vẽ hình chính xác bằng thước – compa. Mỗi bổ đề phải tự chứng minh lại được.',
  },
  {
    id: 'r-de-chuyen',
    title: 'Tuyển tập đề thi vào 10 chuyên Toán các tỉnh/thành',
    type: 'de-thi',
    tracks: ['chuyen'],
    strands: ['dai-so', 'so-hoc', 'hinh-hoc', 'to-hop', 'bat-dang-thuc'],
    level: 5,
    description:
      'Kho đề khổng lồ từ các trường chuyên trên cả nước, độ khó và phong cách đa dạng.',
    usage:
      'Giai đoạn 4–5: mỗi tuần 2 đề tính giờ. Ưu tiên đề Hà Nội, KHTN, Sư phạm trước; sau đó mở rộng ra các tỉnh.',
  },
  {
    id: 'r-hsg',
    title: 'Đề thi học sinh giỏi Toán 9 cấp quận / thành phố',
    type: 'de-thi',
    tracks: ['chuyen'],
    strands: ['so-hoc', 'to-hop', 'bat-dang-thuc'],
    level: 5,
    description:
      'Độ khó tương đương hoặc cao hơn đề chuyên, đặc biệt mạnh về số học và tổ hợp.',
    usage:
      'Dùng cho nhóm Đỉnh cao. Không nên dùng cho nhóm mới vào chuyên vì dễ gây mất tự tin.',
  },

  /* --------- CÔNG CỤ --------- */
  {
    id: 'r-geogebra',
    title: 'GeoGebra (vẽ hình động)',
    type: 'cong-cu',
    tracks: ['thpt', 'chuyen'],
    strands: ['hinh-hoc'],
    level: 2,
    url: 'https://www.geogebra.org/geometry',
    description: 'Phần mềm vẽ hình động miễn phí, chạy trực tiếp trên trình duyệt.',
    usage:
      'Cực kỳ hữu ích cho bài “điểm cố định”: cho điểm chạy và quan sát. Nhưng nhớ — quan sát chỉ để dự đoán, bài thi vẫn phải chứng minh.',
  },
  {
    id: 'r-so-tay-loi',
    title: 'Sổ tay lỗi sai cá nhân',
    type: 'cong-cu',
    tracks: ['thpt', 'chuyen'],
    strands: [],
    level: 1,
    description:
      'Một quyển vở A5 chia 3 cột: Đề – Lỗi của tôi – Cách phòng tránh. Công cụ rẻ nhất nhưng hiệu quả nhất.',
    usage:
      'Ghi ngay sau mỗi buổi luyện. Trước mỗi kỳ thi thử, đọc lại toàn bộ sổ trong 15 phút. Nhiều học sinh tăng 0,5–1,0 điểm chỉ nhờ việc này.',
  },
  {
    id: 'r-bang-theo-doi',
    title: 'Bảng theo dõi điểm từng bài của đề',
    type: 'cong-cu',
    tracks: ['thpt'],
    strands: [],
    level: 2,
    description:
      'Bảng ghi điểm Bài I → Bài V của mỗi đề đã làm, kèm thời gian sử dụng cho từng bài.',
    usage:
      'Sau 5 đề, xu hướng sẽ hiện ra rất rõ: bạn mất điểm ở đâu và bạn tốn thời gian ở đâu. Đó là căn cứ để điều chỉnh lộ trình.',
  },
  /* --------- LUỒNG 3: THPT 10 – 12 --------- */
  {
    id: 'r-moet',
    title: 'Cổng thông tin Bộ GD&ĐT — đề tham khảo thi tốt nghiệp THPT',
    type: 'website',
    tracks: ['thpt-qg'],
    strands: [],
    level: 1,
    official: true,
    url: 'https://moet.gov.vn',
    description:
      'Nơi công bố định dạng đề, đề tham khảo và quy chế thi tốt nghiệp THPT hằng năm.',
    usage:
      'Bắt buộc đối chiếu đầu mỗi năm học: định dạng đề có thể điều chỉnh, và đề tham khảo là chuẩn mực đáng tin cậy nhất để định hướng ôn tập.',
  },
  {
    id: 'r-sgk-thpt',
    title: 'SGK & SBT Toán 10, 11, 12 (bộ sách đang dùng)',
    type: 'sach',
    tracks: ['thpt-qg'],
    strands: ['giai-tich', 'toa-do', 'hinh-khong-gian', 'xac-suat'],
    level: 1,
    description:
      'Chương trình GDPT 2018 có ba bộ sách; đề thi bám chuẩn cần đạt chung nên nội dung cốt lõi giống nhau.',
    usage:
      'Làm hết bài tập SBT của chương trước khi luyện đề. Đây cũng là nguồn ra đề chính của các bài kiểm tra trên lớp — trực tiếp phục vụ mục tiêu Top 1 tổng kết.',
  },
  {
    id: 'r-de-tham-khao',
    title: 'Đề tham khảo & đề thi chính thức tốt nghiệp THPT các năm',
    type: 'de-thi',
    tracks: ['thpt-qg'],
    strands: ['giai-tich', 'toa-do', 'xac-suat'],
    level: 4,
    description:
      'Nguồn luyện tập chuẩn xác nhất về độ khó, cách hỏi và tỉ trọng các mạch kiến thức.',
    usage:
      'Giai đoạn 4–5: mỗi tuần 1–2 đề, làm đúng 90 phút. Ghi lại điểm từng phần để biết mình yếu ở Phần I, II hay III.',
  },
  {
    id: 'r-de-thi-thu-so',
    title: 'Đề thi thử của các Sở GD&ĐT và trường chuyên',
    type: 'de-thi',
    tracks: ['thpt-qg'],
    strands: ['giai-tich', 'toa-do', 'hinh-khong-gian', 'xac-suat'],
    level: 4,
    description:
      'Nguồn đề dồi dào, cập nhật sát định dạng mới, độ khó đa dạng.',
    usage:
      'Dùng bổ sung sau khi đã làm hết đề tham khảo. Lưu ý một số đề khó hơn đề thật — đừng lấy điểm thi thử làm thước đo tuyệt đối.',
  },
  {
    id: 'r-hsa-tsa',
    title: 'Tài liệu luyện ĐGNL (HSA) và ĐGTD (TSA)',
    type: 'chuyen-de',
    tracks: ['thpt-qg'],
    strands: ['giai-tich', 'xac-suat'],
    level: 4,
    description:
      'Đề minh hoạ và ngân hàng câu hỏi của hai kỳ thi riêng, nhấn mạnh tốc độ và tư duy định lượng.',
    usage:
      'Chỉ bổ sung nếu bạn thực sự dùng kết quả này để xét tuyển. Luyện tốc độ là ưu tiên số một, không phải luyện độ khó.',
  },
  {
    id: 'r-so-cong-thuc',
    title: 'Sổ công thức viết tay theo chương',
    type: 'cong-cu',
    tracks: ['thpt-qg', 'thpt', 'chuyen'],
    strands: [],
    level: 1,
    description:
      'Một quyển sổ do chính học sinh viết tay, cập nhật sau mỗi chương học.',
    usage:
      'Viết tay tạo trí nhớ vận động — một quyển sổ tự viết có giá trị hơn nhiều tài liệu tải về. Dành 5 phút mỗi ngày đọc lại và tự kiểm tra.',
  },
  {
    id: 'r-may-tinh',
    title: 'Máy tính cầm tay (Casio fx-580VN X / fx-880BTG hoặc tương đương)',
    type: 'cong-cu',
    tracks: ['thpt-qg'],
    strands: ['giai-tich', 'toa-do', 'xac-suat'],
    level: 2,
    description:
      'Công cụ được phép mang vào phòng thi; các chức năng TABLE, CALC, SOLVE, thống kê giúp tiết kiệm nhiều thời gian.',
    usage:
      'Luyện thao tác đến mức thành phản xạ trước kỳ thi. Nhưng nhớ: máy tính là công cụ kiểm tra, không thay được tư duy — lạm dụng sẽ hỏng nền tự luận.',
  },
];

export const resourcesByTrack = (track: string) =>
  RESOURCES.filter((r) => r.tracks.includes(track as never));

export const RESOURCE_TYPE_LABEL: Record<Resource['type'], string> = {
  sach: 'Sách',
  'de-thi': 'Đề thi',
  website: 'Nguồn chính thức',
  video: 'Video',
  'chuyen-de': 'Chuyên đề',
  'cong-cu': 'Công cụ',
};
