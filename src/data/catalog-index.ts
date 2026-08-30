import type { TrackId } from '@/types';

/**
 * DANH MỤC RÚT GỌN CỦA CHUYÊN ĐỀ VÀ ĐỀ MẪU
 *
 * Bản đồ đường dẫn và trang chủ cần tên của mọi chuyên đề, mọi đề mẫu ngay ở
 * lần tải đầu tiên. Nếu nhập trực tiếp từ kho nội dung đầy đủ thì toàn bộ lời
 * giải, bảng phân tích và bộ sinh đề sẽ bị kéo vào gói mã khởi động của mọi
 * trang, làm chậm thời gian hiển thị nội dung chính — một chỉ số xếp hạng thật.
 *
 * Danh mục dưới đây chỉ giữ phần tối thiểu. `npm run smoke` đối chiếu từng
 * trường với kho nội dung thật và chặn bản dựng nếu lệch, nên không thể sai âm thầm.
 *
 * Tệp này được sinh lại bằng `npm run gen:index` mỗi khi thêm chuyên đề hoặc đề mẫu.
 */

export const TOPIC_INDEX: { id: string; name: string; tracks: TrackId[] }[] = [
  { id: 'ds-can-thuc', name: "Căn thức bậc hai & rút gọn biểu thức", tracks: ["thpt","chuyen","chinh-khoa"] },
  { id: 'ds-pt-hpt', name: "Phương trình & hệ phương trình bậc nhất hai ẩn", tracks: ["thpt","chuyen","chinh-khoa"] },
  { id: 'ds-viete', name: "Phương trình bậc hai, định lí Viète & tương giao parabol", tracks: ["thpt","chuyen","chinh-khoa"] },
  { id: 'ds-toan-loi-van', name: "Giải bài toán bằng cách lập phương trình / hệ phương trình", tracks: ["thpt","chinh-khoa"] },
  { id: 'tt-hinh-khong-gian', name: "Hình trụ – hình nón – hình cầu (toán thực tế)", tracks: ["thpt","chinh-khoa"] },
  { id: 'hh-he-thuc-luong', name: "Hệ thức lượng trong tam giác vuông & tỉ số lượng giác", tracks: ["thpt","chuyen","chinh-khoa"] },
  { id: 'ds-viete-khong-doi-xung', name: "Viète với biểu thức không đối xứng", tracks: ["thpt","chuyen","chinh-khoa"] },
  { id: 'tt-cuc-tri-thuc-te', name: "Bài toán thực tế liên quan cực trị", tracks: ["thpt","chuyen","chinh-khoa"] },
  { id: 'hh-duong-tron-co-ban', name: "Đường tròn & tứ giác nội tiếp", tracks: ["thpt","chuyen","chinh-khoa"] },
  { id: 'hh-cuc-tri-co-dinh', name: "Điểm cố định – quỹ tích – cực trị hình học", tracks: ["thpt","chuyen","chinh-khoa"] },
  { id: 'bdt-co-ban', name: "Bất đẳng thức AM–GM & Cauchy–Schwarz", tracks: ["thpt","chuyen","chinh-khoa"] },
  { id: 'tt-thong-ke-xac-suat', name: "Thống kê & xác suất (Chương trình GDPT 2018)", tracks: ["thpt","chinh-khoa"] },
  { id: 'ds-ptvt', name: "Phương trình vô tỉ & hệ phương trình nâng cao", tracks: ["chuyen"] },
  { id: 'ds-da-thuc', name: "Đa thức & đẳng thức đại số", tracks: ["chuyen"] },
  { id: 'sh-chia-het', name: "Chia hết – ước & bội", tracks: ["chuyen"] },
  { id: 'sh-dong-du', name: "Đồng dư thức & số dư", tracks: ["chuyen"] },
  { id: 'sh-so-nguyen-to', name: "Số nguyên tố & số chính phương", tracks: ["chuyen"] },
  { id: 'sh-nghiem-nguyen', name: "Phương trình nghiệm nguyên", tracks: ["chuyen"] },
  { id: 'sh-phan-nguyen', name: "Phần nguyên & dãy số nguyên", tracks: ["chuyen"] },
  { id: 'hh-phuong-tich', name: "Phương tích & trục đẳng phương", tracks: ["chuyen"] },
  { id: 'hh-ti-so-dong-quy', name: "Tỉ số – thẳng hàng – đồng quy", tracks: ["chuyen"] },
  { id: 'hh-mo-hinh-chuan', name: "Các mô hình hình học chuẩn của đề tuyển sinh", tracks: ["thpt","chuyen","chinh-khoa"] },
  { id: 'th-dirichlet', name: "Nguyên lí Dirichlet (chuồng bồ câu)", tracks: ["chuyen"] },
  { id: 'th-bat-bien', name: "Bất biến & đơn biến", tracks: ["chuyen"] },
  { id: 'th-dem', name: "Kỹ thuật đếm & đếm bằng hai cách", tracks: ["chuyen"] },
  { id: 'th-cuc-han', name: "Nguyên lí cực hạn & phản chứng", tracks: ["chuyen"] },
  { id: 'bdt-nang-cao', name: "Bất đẳng thức nâng cao: dồn biến, SOS, chọn điểm rơi", tracks: ["chuyen"] },
  { id: 'ky-nang-trinh-bay', name: "Kỹ năng trình bày & ăn điểm theo barem", tracks: ["thpt","chuyen","chinh-khoa"] },
  { id: 'ky-nang-quan-ly-thoi-gian', name: "Chiến thuật phòng thi & quản lý thời gian", tracks: ["thpt","chuyen","chinh-khoa"] },
  { id: 'q10-menh-de-tap-hop', name: "Mệnh đề & Tập hợp", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q10-bpt-tam-thuc', name: "Bất phương trình & Dấu tam thức bậc hai", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q10-ham-so-bac-hai', name: "Hàm số & Đồ thị hàm số bậc hai", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q10-he-thuc-luong', name: "Hệ thức lượng trong tam giác", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q10-vecto', name: "Vectơ & Tích vô hướng", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q10-toa-do-phang', name: "Phương pháp toạ độ trong mặt phẳng", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q10-to-hop-newton', name: "Đại số tổ hợp & Nhị thức Newton", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q11-luong-giac', name: "Hàm số lượng giác & Phương trình lượng giác", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q11-day-so', name: "Dãy số, Cấp số cộng & Cấp số nhân", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q11-gioi-han', name: "Giới hạn & Hàm số liên tục", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q11-mu-logarit', name: "Hàm số mũ & Hàm số logarit", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q11-dao-ham', name: "Đạo hàm", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q11-hinh-khong-gian', name: "Quan hệ song song & vuông góc trong không gian", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q11-xac-suat', name: "Xác suất: biến cố hợp, giao và độc lập", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q12-khao-sat-ham-so', name: "Ứng dụng đạo hàm: đơn điệu, cực trị, GTLN–GTNN, tiệm cận", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q12-nguyen-ham-tich-phan', name: "Nguyên hàm & Tích phân", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q12-oxyz', name: "Vectơ & Toạ độ trong không gian Oxyz", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q12-thong-ke', name: "Thống kê mẫu ghép nhóm: phương sai & độ lệch chuẩn", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q12-xac-suat-co-dieu-kien', name: "Xác suất có điều kiện & Công thức Bayes", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q12-ky-nang-de-moi', name: "Kỹ năng làm định dạng đề thi mới (3 phần)", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'q-top1-tong-ket', name: "Chiến lược Top 1 tổng kết môn Toán", tracks: ["thpt-qg","chinh-khoa"] },
  { id: 'l6-phan-so-thap-phan', name: "Phân số, số thập phân & bốn phép tính", tracks: ["lop6"] },
  { id: 'l6-ti-so-phan-tram', name: "Tỉ số & tỉ số phần trăm", tracks: ["lop6"] },
  { id: 'l6-toan-chuyen-dong', name: "Toán chuyển động", tracks: ["lop6"] },
  { id: 'l6-toan-tinh-nguoc', name: "Toán tính ngược & sơ đồ đoạn thẳng", tracks: ["lop6"] },
  { id: 'l6-hinh-hoc-tieu-hoc', name: "Hình học tiểu học & hình ghép", tracks: ["lop6"] },
  { id: 'l6-suy-luan-logic', name: "Suy luận logic & bài toán bảng", tracks: ["lop6"] },
  { id: 'l6-day-so-quy-luat', name: "Dãy số theo quy luật & đếm hình", tracks: ["lop6"] },
  { id: 'l6-doc-hieu-du-lieu', name: "Đọc hiểu bảng biểu & toán có lời văn nhiều bước", tracks: ["lop6"] },
  { id: 'ck6-so-tu-nhien', name: "Số tự nhiên, chia hết, ước và bội", tracks: ["chinh-khoa"] },
  { id: 'ck6-so-nguyen', name: "Số nguyên và quy tắc dấu", tracks: ["chinh-khoa"] },
  { id: 'ck6-phan-so', name: "Phân số, số thập phân và tỉ số phần trăm", tracks: ["chinh-khoa"] },
  { id: 'ck6-hinh-truc-quan', name: "Hình học trực quan: chu vi, diện tích và tính đối xứng", tracks: ["chinh-khoa"] },
  { id: 'ck6-du-lieu-xac-suat', name: "Thu thập dữ liệu và xác suất thực nghiệm", tracks: ["chinh-khoa"] },
  { id: 'ck7-so-huu-ti-so-thuc', name: "Số hữu tỉ, số thực và căn bậc hai số học", tracks: ["chinh-khoa"] },
  { id: 'ck7-ti-le-thuc', name: "Tỉ lệ thức và đại lượng tỉ lệ", tracks: ["chinh-khoa"] },
  { id: 'ck7-bieu-thuc-da-thuc', name: "Biểu thức đại số và đa thức một biến", tracks: ["chinh-khoa"] },
  { id: 'ck7-tam-giac-bang-nhau', name: "Góc, đường thẳng song song và tam giác bằng nhau", tracks: ["chinh-khoa"] },
  { id: 'ck7-thong-ke-xac-suat', name: "Thu thập, phân tích dữ liệu và xác suất của biến cố", tracks: ["chinh-khoa"] },
  { id: 'ck8-hang-dang-thuc', name: "Đa thức nhiều biến, hằng đẳng thức và phân tích nhân tử", tracks: ["chinh-khoa"] },
  { id: 'ck8-phan-thuc', name: "Phân thức đại số", tracks: ["chinh-khoa"] },
  { id: 'ck8-pt-ham-so', name: "Phương trình bậc nhất một ẩn và hàm số bậc nhất", tracks: ["chinh-khoa"] },
  { id: 'ck8-thales-dong-dang', name: "Định lí Thalès, tam giác đồng dạng và định lí Pythagore", tracks: ["chinh-khoa"] },
  { id: 'ck8-hinh-chop-xac-suat', name: "Hình chóp đều và xác suất của biến cố", tracks: ["chinh-khoa"] },
];

export const PAPER_INDEX: { id: string; title: string }[] = [
  { id: 'dm-hanoi-01', title: "Đề mẫu 01 · Toán tuyển sinh lớp 10 THPT Hà Nội" },
  { id: 'dm-hanoi-02', title: "Đề mẫu 10 · Toán tuyển sinh lớp 10 THPT Hà Nội (đề 2)" },
  { id: 'dm-ntt-01', title: "Đề mẫu 06 · Toán — THCS & THPT Nguyễn Tất Thành" },
  { id: 'dm-chuyen-so-01', title: "Đề mẫu 03 · Toán chuyên — khối chuyên Sở Hà Nội" },
  { id: 'dm-khtn-v1-01', title: "Đề mẫu 05 · Toán vòng 1 — Chuyên KHTN" },
  { id: 'dm-khtn-v2-01', title: "Đề mẫu 02 · Toán vòng 2 — Chuyên KHTN" },
  { id: 'dm-su-pham-01', title: "Đề mẫu 07 · Toán chuyên — Chuyên ĐH Sư phạm Hà Nội" },
  { id: 'dm-tn-thpt-01', title: "Đề mẫu 04 · Toán tốt nghiệp THPT" },
  { id: 'dm-lop6-clc-01', title: "Đề mẫu 08 · Toán đánh giá năng lực vào lớp 6 chất lượng cao" },
  { id: 'dm-lop6-nn-01', title: "Đề mẫu 09 · Toán đánh giá năng lực vào lớp 6 THCS Ngoại ngữ" },
];

export const SYLLABUS_INDEX: { id: string; title: string; grade: number; term: string }[] = [
  { id: 'sy-6-gk1', title: "Toán 6 — Đề cương giữa học kỳ I", grade: 6, term: 'giua-ky-1' },
  { id: 'sy-6-ck1', title: "Toán 6 — Đề cương cuối học kỳ I", grade: 6, term: 'cuoi-ky-1' },
  { id: 'sy-6-ck2', title: "Toán 6 — Đề cương cuối học kỳ II và tổng ôn cả năm", grade: 6, term: 'cuoi-ky-2' },
  { id: 'sy-6-he', title: "Toán 6 — Đề cương ôn hè bắc cầu lên lớp 7", grade: 6, term: 'on-he' },
  { id: 'sy-7-gk1', title: "Toán 7 — Đề cương giữa học kỳ I", grade: 7, term: 'giua-ky-1' },
  { id: 'sy-7-ck1', title: "Toán 7 — Đề cương cuối học kỳ I", grade: 7, term: 'cuoi-ky-1' },
  { id: 'sy-7-ck2', title: "Toán 7 — Đề cương cuối học kỳ II và tổng ôn cả năm", grade: 7, term: 'cuoi-ky-2' },
  { id: 'sy-7-he', title: "Toán 7 — Đề cương ôn hè bắc cầu lên lớp 8", grade: 7, term: 'on-he' },
  { id: 'sy-8-gk1', title: "Toán 8 — Đề cương giữa học kỳ I", grade: 8, term: 'giua-ky-1' },
  { id: 'sy-8-ck1', title: "Toán 8 — Đề cương cuối học kỳ I", grade: 8, term: 'cuoi-ky-1' },
  { id: 'sy-8-ck2', title: "Toán 8 — Đề cương cuối học kỳ II và tổng ôn cả năm", grade: 8, term: 'cuoi-ky-2' },
  { id: 'sy-8-he', title: "Toán 8 — Đề cương ôn hè bắc cầu lên lớp 9", grade: 8, term: 'on-he' },
  { id: 'sy-9-gk1', title: "Toán 9 — Đề cương giữa học kỳ I", grade: 9, term: 'giua-ky-1' },
  { id: 'sy-9-ck1', title: "Toán 9 — Đề cương cuối học kỳ I", grade: 9, term: 'cuoi-ky-1' },
  { id: 'sy-9-ck2', title: "Toán 9 — Đề cương cuối học kỳ II và tổng ôn cả năm", grade: 9, term: 'cuoi-ky-2' },
  { id: 'sy-10-gk1', title: "Toán 10 — Đề cương giữa học kỳ I", grade: 10, term: 'giua-ky-1' },
  { id: 'sy-10-ck1', title: "Toán 10 — Đề cương cuối học kỳ I", grade: 10, term: 'cuoi-ky-1' },
  { id: 'sy-10-gk2', title: "Toán 10 — Đề cương giữa học kỳ II", grade: 10, term: 'giua-ky-2' },
  { id: 'sy-10-ck2', title: "Toán 10 — Đề cương cuối học kỳ II và tổng ôn cả năm", grade: 10, term: 'cuoi-ky-2' },
  { id: 'sy-10-he', title: "Toán 10 — Đề cương ôn hè bắc cầu lên lớp 11", grade: 10, term: 'on-he' },
  { id: 'sy-11-gk1', title: "Toán 11 — Đề cương giữa học kỳ I", grade: 11, term: 'giua-ky-1' },
  { id: 'sy-11-ck1', title: "Toán 11 — Đề cương cuối học kỳ I", grade: 11, term: 'cuoi-ky-1' },
  { id: 'sy-11-gk2', title: "Toán 11 — Đề cương giữa học kỳ II", grade: 11, term: 'giua-ky-2' },
  { id: 'sy-11-ck2', title: "Toán 11 — Đề cương cuối học kỳ II và tổng ôn cả năm", grade: 11, term: 'cuoi-ky-2' },
  { id: 'sy-11-he', title: "Toán 11 — Đề cương ôn hè bắc cầu lên lớp 12", grade: 11, term: 'on-he' },
  { id: 'sy-12-gk1', title: "Toán 12 — Đề cương giữa học kỳ I", grade: 12, term: 'giua-ky-1' },
  { id: 'sy-12-ck1', title: "Toán 12 — Đề cương cuối học kỳ I", grade: 12, term: 'cuoi-ky-1' },
  { id: 'sy-12-gk2', title: "Toán 12 — Đề cương giữa học kỳ II", grade: 12, term: 'giua-ky-2' },
  { id: 'sy-12-ck2', title: "Toán 12 — Đề cương cuối học kỳ II và tổng ôn cả năm", grade: 12, term: 'cuoi-ky-2' },
  { id: 'sy-12-he', title: "Toán 12 — Tổng ôn cả năm và bắc cầu sang kỳ thi", grade: 12, term: 'ca-nam' },
];

export interface PaperCard {
  id: string;
  code: string;
  title: string;
  track: TrackId;
  minutes: number;
  totalPoints: number;
  items: number;
  claims: number;
}

export const PAPER_CARDS: PaperCard[] = [
  { id: 'dm-hanoi-01', code: 'M365-V10-DM01', title: "Đề mẫu 01 · Toán tuyển sinh lớp 10 THPT Hà Nội", track: 'thpt', minutes: 90, totalPoints: 10, items: 12, claims: 0 },
  { id: 'dm-hanoi-02', code: 'M365-HN-02', title: "Đề mẫu 10 · Toán tuyển sinh lớp 10 THPT Hà Nội (đề 2)", track: 'thpt', minutes: 90, totalPoints: 10, items: 12, claims: 0 },
  { id: 'dm-ntt-01', code: 'M365-CT-DM06', title: "Đề mẫu 06 · Toán — THCS & THPT Nguyễn Tất Thành", track: 'chuyen', minutes: 90, totalPoints: 10, items: 12, claims: 0 },
  { id: 'dm-chuyen-so-01', code: 'M365-CT-DM03', title: "Đề mẫu 03 · Toán chuyên — khối chuyên Sở Hà Nội", track: 'chuyen', minutes: 150, totalPoints: 10, items: 8, claims: 0 },
  { id: 'dm-khtn-v1-01', code: 'M365-CT-DM05', title: "Đề mẫu 05 · Toán vòng 1 — Chuyên KHTN", track: 'chuyen', minutes: 120, totalPoints: 10, items: 9, claims: 0 },
  { id: 'dm-khtn-v2-01', code: 'M365-CT-DM02', title: "Đề mẫu 02 · Toán vòng 2 — Chuyên KHTN", track: 'chuyen', minutes: 150, totalPoints: 10, items: 7, claims: 0 },
  { id: 'dm-su-pham-01', code: 'M365-CT-DM07', title: "Đề mẫu 07 · Toán chuyên — Chuyên ĐH Sư phạm Hà Nội", track: 'chuyen', minutes: 120, totalPoints: 10, items: 9, claims: 0 },
  { id: 'dm-tn-thpt-01', code: 'M365-QG-DM04', title: "Đề mẫu 04 · Toán tốt nghiệp THPT", track: 'thpt-qg', minutes: 90, totalPoints: 10, items: 22, claims: 16 },
  { id: 'dm-lop6-clc-01', code: 'M365-L6-CLC-01', title: "Đề mẫu 08 · Toán đánh giá năng lực vào lớp 6 chất lượng cao", track: 'lop6', minutes: 45, totalPoints: 10, items: 15, claims: 0 },
  { id: 'dm-lop6-nn-01', code: 'M365-L6-NN-01', title: "Đề mẫu 09 · Toán đánh giá năng lực vào lớp 6 THCS Ngoại ngữ", track: 'lop6', minutes: 45, totalPoints: 10, items: 16, claims: 0 },
];
