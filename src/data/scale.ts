/**
 * CÁC CON SỐ QUY MÔ CỦA HỆ THỐNG — TỆP ĐƯỢC SINH TỰ ĐỘNG.
 *
 * Sinh lại bằng: npm run gen:scale   (đừng sửa tay)
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
  worksheets: 2400,
  missions: 2400,
  chuyen: 600,
  thpt: 600,
  quocGia: 800,
  lop6: 400,
  items: 19994,
  generators: 105,
  packedTopics: 70,
  topics: 58,
  formulas: 225,
  formulaGroups: 26,
  formulasStarred: 190,
  papers: 9,
  paperItems: 110,
  libraryFolders: 445,
  libraryArtifacts: 1195,
} as const;
