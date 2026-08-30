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
  { id: 'ds-can-thuc', name: "Căn thức bậc hai & rút gọn biểu thức", tracks: ["thpt","chuyen"] },
  { id: 'ds-pt-hpt', name: "Phương trình & hệ phương trình bậc nhất hai ẩn", tracks: ["thpt","chuyen"] },
  { id: 'ds-viete', name: "Phương trình bậc hai, định lí Viète & tương giao parabol", tracks: ["thpt","chuyen"] },
  { id: 'ds-toan-loi-van', name: "Giải bài toán bằng cách lập phương trình / hệ phương trình", tracks: ["thpt"] },
  { id: 'tt-hinh-khong-gian', name: "Hình trụ – hình nón – hình cầu (toán thực tế)", tracks: ["thpt"] },
  { id: 'hh-duong-tron-co-ban', name: "Đường tròn & tứ giác nội tiếp", tracks: ["thpt","chuyen"] },
  { id: 'hh-cuc-tri-co-dinh', name: "Điểm cố định – quỹ tích – cực trị hình học", tracks: ["thpt","chuyen"] },
  { id: 'bdt-co-ban', name: "Bất đẳng thức AM–GM & Cauchy–Schwarz", tracks: ["thpt","chuyen"] },
  { id: 'tt-thong-ke-xac-suat', name: "Thống kê & xác suất (Chương trình GDPT 2018)", tracks: ["thpt"] },
  { id: 'ds-ptvt', name: "Phương trình vô tỉ & hệ phương trình nâng cao", tracks: ["chuyen"] },
  { id: 'ds-da-thuc', name: "Đa thức & đẳng thức đại số", tracks: ["chuyen"] },
  { id: 'sh-chia-het', name: "Chia hết – ước & bội", tracks: ["chuyen"] },
  { id: 'sh-dong-du', name: "Đồng dư thức & số dư", tracks: ["chuyen"] },
  { id: 'sh-so-nguyen-to', name: "Số nguyên tố & số chính phương", tracks: ["chuyen"] },
  { id: 'sh-nghiem-nguyen', name: "Phương trình nghiệm nguyên", tracks: ["chuyen"] },
  { id: 'sh-phan-nguyen', name: "Phần nguyên & dãy số nguyên", tracks: ["chuyen"] },
  { id: 'hh-phuong-tich', name: "Phương tích & trục đẳng phương", tracks: ["chuyen"] },
  { id: 'hh-ti-so-dong-quy', name: "Tỉ số – thẳng hàng – đồng quy", tracks: ["chuyen"] },
  { id: 'hh-mo-hinh-chuan', name: "Các mô hình hình học chuẩn của đề tuyển sinh", tracks: ["thpt","chuyen"] },
  { id: 'th-dirichlet', name: "Nguyên lí Dirichlet (chuồng bồ câu)", tracks: ["chuyen"] },
  { id: 'th-bat-bien', name: "Bất biến & đơn biến", tracks: ["chuyen"] },
  { id: 'th-dem', name: "Kỹ thuật đếm & đếm bằng hai cách", tracks: ["chuyen"] },
  { id: 'th-cuc-han', name: "Nguyên lí cực hạn & phản chứng", tracks: ["chuyen"] },
  { id: 'bdt-nang-cao', name: "Bất đẳng thức nâng cao: dồn biến, SOS, chọn điểm rơi", tracks: ["chuyen"] },
  { id: 'ky-nang-trinh-bay', name: "Kỹ năng trình bày & ăn điểm theo barem", tracks: ["thpt","chuyen"] },
  { id: 'ky-nang-quan-ly-thoi-gian', name: "Chiến thuật phòng thi & quản lý thời gian", tracks: ["thpt","chuyen"] },
  { id: 'q10-menh-de-tap-hop', name: "Mệnh đề & Tập hợp", tracks: ["thpt-qg"] },
  { id: 'q10-bpt-tam-thuc', name: "Bất phương trình & Dấu tam thức bậc hai", tracks: ["thpt-qg"] },
  { id: 'q10-ham-so-bac-hai', name: "Hàm số & Đồ thị hàm số bậc hai", tracks: ["thpt-qg"] },
  { id: 'q10-he-thuc-luong', name: "Hệ thức lượng trong tam giác", tracks: ["thpt-qg"] },
  { id: 'q10-vecto', name: "Vectơ & Tích vô hướng", tracks: ["thpt-qg"] },
  { id: 'q10-toa-do-phang', name: "Phương pháp toạ độ trong mặt phẳng", tracks: ["thpt-qg"] },
  { id: 'q10-to-hop-newton', name: "Đại số tổ hợp & Nhị thức Newton", tracks: ["thpt-qg"] },
  { id: 'q11-luong-giac', name: "Hàm số lượng giác & Phương trình lượng giác", tracks: ["thpt-qg"] },
  { id: 'q11-day-so', name: "Dãy số, Cấp số cộng & Cấp số nhân", tracks: ["thpt-qg"] },
  { id: 'q11-gioi-han', name: "Giới hạn & Hàm số liên tục", tracks: ["thpt-qg"] },
  { id: 'q11-mu-logarit', name: "Hàm số mũ & Hàm số logarit", tracks: ["thpt-qg"] },
  { id: 'q11-dao-ham', name: "Đạo hàm", tracks: ["thpt-qg"] },
  { id: 'q11-hinh-khong-gian', name: "Quan hệ song song & vuông góc trong không gian", tracks: ["thpt-qg"] },
  { id: 'q11-xac-suat', name: "Xác suất: biến cố hợp, giao và độc lập", tracks: ["thpt-qg"] },
  { id: 'q12-khao-sat-ham-so', name: "Ứng dụng đạo hàm: đơn điệu, cực trị, GTLN–GTNN, tiệm cận", tracks: ["thpt-qg"] },
  { id: 'q12-nguyen-ham-tich-phan', name: "Nguyên hàm & Tích phân", tracks: ["thpt-qg"] },
  { id: 'q12-oxyz', name: "Vectơ & Toạ độ trong không gian Oxyz", tracks: ["thpt-qg"] },
  { id: 'q12-thong-ke', name: "Thống kê mẫu ghép nhóm: phương sai & độ lệch chuẩn", tracks: ["thpt-qg"] },
  { id: 'q12-xac-suat-co-dieu-kien', name: "Xác suất có điều kiện & Công thức Bayes", tracks: ["thpt-qg"] },
  { id: 'q12-ky-nang-de-moi', name: "Kỹ năng làm định dạng đề thi mới (3 phần)", tracks: ["thpt-qg"] },
  { id: 'q-top1-tong-ket', name: "Chiến lược Top 1 tổng kết môn Toán", tracks: ["thpt-qg"] },
];

export const PAPER_INDEX: { id: string; title: string }[] = [
  { id: 'dm-hanoi-01', title: "Đề mẫu 01 · Toán tuyển sinh lớp 10 THPT Hà Nội" },
  { id: 'dm-ntt-01', title: "Đề mẫu 06 · Toán — THCS & THPT Nguyễn Tất Thành" },
  { id: 'dm-chuyen-so-01', title: "Đề mẫu 03 · Toán chuyên — khối chuyên Sở Hà Nội" },
  { id: 'dm-khtn-v1-01', title: "Đề mẫu 05 · Toán vòng 1 — Chuyên KHTN" },
  { id: 'dm-khtn-v2-01', title: "Đề mẫu 02 · Toán vòng 2 — Chuyên KHTN" },
  { id: 'dm-su-pham-01', title: "Đề mẫu 07 · Toán chuyên — Chuyên ĐH Sư phạm Hà Nội" },
  { id: 'dm-tn-thpt-01', title: "Đề mẫu 04 · Toán tốt nghiệp THPT" },
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
  { id: 'dm-ntt-01', code: 'M365-CT-DM06', title: "Đề mẫu 06 · Toán — THCS & THPT Nguyễn Tất Thành", track: 'chuyen', minutes: 90, totalPoints: 10, items: 12, claims: 0 },
  { id: 'dm-chuyen-so-01', code: 'M365-CT-DM03', title: "Đề mẫu 03 · Toán chuyên — khối chuyên Sở Hà Nội", track: 'chuyen', minutes: 150, totalPoints: 10, items: 8, claims: 0 },
  { id: 'dm-khtn-v1-01', code: 'M365-CT-DM05', title: "Đề mẫu 05 · Toán vòng 1 — Chuyên KHTN", track: 'chuyen', minutes: 120, totalPoints: 10, items: 9, claims: 0 },
  { id: 'dm-khtn-v2-01', code: 'M365-CT-DM02', title: "Đề mẫu 02 · Toán vòng 2 — Chuyên KHTN", track: 'chuyen', minutes: 150, totalPoints: 10, items: 7, claims: 0 },
  { id: 'dm-su-pham-01', code: 'M365-CT-DM07', title: "Đề mẫu 07 · Toán chuyên — Chuyên ĐH Sư phạm Hà Nội", track: 'chuyen', minutes: 120, totalPoints: 10, items: 9, claims: 0 },
  { id: 'dm-tn-thpt-01', code: 'M365-QG-DM04', title: "Đề mẫu 04 · Toán tốt nghiệp THPT", track: 'thpt-qg', minutes: 90, totalPoints: 10, items: 22, claims: 16 },
];
