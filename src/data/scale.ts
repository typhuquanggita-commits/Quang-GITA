/**
 * CÁC CON SỐ QUY MÔ CỦA HỆ THỐNG
 *
 * Vì sao tồn tại tệp này: những con số dưới đây được dùng ở phần đầu tài liệu
 * của mọi trang và ở trang chủ — tức là ở phần mã luôn được tải đầu tiên. Nếu
 * lấy chúng bằng cách gọi hàm thống kê của kho phiếu, cả kho phiếu sẽ bị kéo
 * vào gói mã khởi động, làm chậm thời gian hiển thị nội dung chính của mọi
 * trang nội dung.
 *
 * Rủi ro của cách làm này là số ở đây lệch với số thật. Rủi ro đó được chặn
 * bằng kiểm tra tự động: `npm run smoke` đối chiếu từng con số với giá trị tính
 * ra từ kho nội dung, và bản dựng bị chặn nếu lệch dù chỉ một đơn vị.
 */
export const SCALE = {
  worksheets: 2000,
  missions: 2000,
  chuyen: 600,
  thpt: 600,
  quocGia: 800,
  items: 16664,
  generators: 77,
  packedTopics: 56,
  topics: 47,
  formulas: 195,
  formulaGroups: 23,
  formulasStarred: 163,
  papers: 7,
  paperItems: 79,
  libraryFolders: 408,
  libraryArtifacts: 1097,
} as const;
